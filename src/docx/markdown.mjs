/**
 * CommonMark-subset parser for Word export.
 *
 * The chat renderer draws tables, code and diagrams as images through a
 * headless browser. A Word document does not need that: headings, lists and
 * tables can stay native and editable, so this parser keeps the structure and
 * leaves the rendering to OOXML.
 */

const FENCE = /^\s{0,3}(`{3,}|~{3,})\s*([^`\s]*)/
const HEADING = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/
const RULE = /^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/
const QUOTE = /^\s{0,3}>\s?(.*)$/
const LIST_ITEM = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/
const TABLE_DIVIDER = /^\s*\|?\s*:?-{2,}:?\s*(?:\|\s*:?-{2,}:?\s*)*\|?\s*$/
const STANDALONE_IMAGE = /^\s*!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/

const isBlank = (line) => line.trim() === ''

/** Every picture source referenced by the blocks, in document order. */
export function collectImageSources(blocks) {
  const sources = []
  for (const block of blocks) {
    if (block.type === 'image') sources.push(block.src)
    else if (block.type === 'quote') sources.push(...collectImageSources(block.blocks))
  }
  return sources
}

/** Split a pipe-table row, honouring escaped pipes. */
function splitRow(line) {
  const text = line.trim().replace(/^\|/, '').replace(/\|$/, '').replace(/\\\|/g, '\u0000')
  return text.split('|').map(cell => cell.replace(/\u0000/g, '|').trim())
}

function alignmentOf(cell) {
  const left = cell.startsWith(':')
  const right = cell.endsWith(':')
  if (left && right) return 'center'
  if (right) return 'right'
  if (left) return 'left'
  return null
}

function isTableStart(lines, index) {
  const head = lines[index]
  const divider = lines[index + 1]
  if (head === undefined || divider === undefined) return false
  if (!head.includes('|') || !divider.includes('|')) return false
  if (!TABLE_DIVIDER.test(divider)) return false
  return splitRow(head).length === splitRow(divider).length
}

function isBlockStart(lines, index) {
  const line = lines[index]
  if (line === undefined || isBlank(line)) return true
  return FENCE.test(line) || HEADING.test(line) || RULE.test(line) || QUOTE.test(line) ||
    LIST_ITEM.test(line) || STANDALONE_IMAGE.test(line) || isTableStart(lines, index)
}

/**
 * Parse Markdown into block nodes.
 * @param {string} source - Markdown text.
 * @returns {object[]} block list consumed by the OOXML builder.
 */
export function parseBlocks(source) {
  const lines = String(source ?? '').replace(/\r\n?/g, '\n').split('\n')
  const blocks = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    if (isBlank(line)) { index += 1; continue }

    const fence = line.match(FENCE)
    if (fence) {
      const marker = fence[1][0]
      const size = fence[1].length
      const body = []
      index += 1
      while (index < lines.length) {
        const closing = lines[index].match(new RegExp(`^\\s{0,3}${marker === '`' ? '`' : '~'}{${size},}\\s*$`))
        if (closing) { index += 1; break }
        body.push(lines[index])
        index += 1
      }
      blocks.push({ type: 'code', lang: fence[2] || '', text: body.join('\n') })
      continue
    }

    const heading = line.match(HEADING)
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, spans: parseInline(heading[2]) })
      index += 1
      continue
    }

    if (RULE.test(line)) { blocks.push({ type: 'rule' }); index += 1; continue }

    if (QUOTE.test(line)) {
      const inner = []
      while (index < lines.length) {
        const quoted = lines[index].match(QUOTE)
        if (!quoted) break
        inner.push(quoted[1])
        index += 1
      }
      // Each quoted line is its own paragraph: a CJK soft break must not glue
      // the lines into one run-on sentence.
      blocks.push({ type: 'quote', blocks: inner.flatMap(line => parseBlocks(line)) })
      continue
    }

    if (isTableStart(lines, index)) {
      const header = splitRow(lines[index])
      const align = splitRow(lines[index + 1]).map(alignmentOf)
      const rows = []
      index += 2
      while (index < lines.length && lines[index].includes('|') && !isBlank(lines[index])) {
        const cells = splitRow(lines[index])
        if (cells.length === 1 && cells[0] === '') break
        rows.push(cells.map(parseInline))
        index += 1
      }
      blocks.push({ type: 'table', align, header: header.map(parseInline), rows })
      continue
    }

    if (LIST_ITEM.test(line)) {
      const items = []
      const first = line.match(LIST_ITEM)
      const ordered = /\d/.test(first[2])
      while (index < lines.length) {
        // A blank line between items keeps the list going, but only while the
        // marker type stays the same: "1." after "-" starts a new list.
        if (isBlank(lines[index])) {
          const next = LIST_ITEM.exec(lines[index + 1] ?? '')
          if (!next || /\d/.test(next[2]) !== ordered) break
          index += 1
          continue
        }
        const item = lines[index].match(LIST_ITEM)
        if (!item || /\d/.test(item[2]) !== ordered) break
        const indent = item[1].replace(/\t/g, '  ').length
        let text = item[3]
        index += 1
        // Continuation lines belong to the item until a blank line or a new block.
        while (index < lines.length && !isBlank(lines[index]) && !LIST_ITEM.test(lines[index]) && !isBlockStart(lines, index)) {
          text += ' ' + lines[index].trim()
          index += 1
        }
        const task = text.match(/^\[( |x|X)\]\s+(.*)$/)
        items.push({
          level: Math.min(Math.floor(indent / 2), 2),
          checked: task ? task[1].toLowerCase() === 'x' : null,
          spans: parseInline(task ? task[2] : text),
        })
      }
      blocks.push({ type: 'list', ordered, items })
      continue
    }

    const image = line.match(STANDALONE_IMAGE)
    if (image) {
      blocks.push({ type: 'image', alt: image[1], src: image[2], title: image[3] ?? '' })
      index += 1
      continue
    }

    const paragraph = []
    while (index < lines.length && !isBlockStart(lines, index)) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    blocks.push({ type: 'paragraph', spans: parseInline(joinLines(paragraph)) })
  }

  return blocks
}

/** Join wrapped paragraph lines; CJK pairs join without a space. */
function joinLines(lines) {
  let text = ''
  for (const line of lines) {
    if (text === '') { text = line; continue }
    const previous = text[text.length - 1]
    const next = line[0] ?? ''
    text += /[\u3000-\u9fff\uff00-\uffef]/.test(previous) && /[\u3000-\u9fff\uff00-\uffef]/.test(next) ? line : ' ' + line
  }
  return text
}

const ESCAPABLE = '\\`*_{}[]()#+-.!|>~'

/**
 * Parse inline Markdown into styled runs.
 * @param {string} text - inline Markdown.
 * @returns {{ text: string, bold?: boolean, italic?: boolean, code?: boolean, strike?: boolean, link?: string }[]}
 */
export function parseInline(text) {
  const runs = []
  walk(String(text ?? ''), {}, runs)
  return mergeRuns(runs)
}

function mergeRuns(runs) {
  const merged = []
  for (const run of runs) {
    if (!run.text) continue
    const previous = merged[merged.length - 1]
    if (previous && sameStyle(previous, run)) previous.text += run.text
    else merged.push({ ...run })
  }
  return merged
}

function sameStyle(a, b) {
  return Boolean(a.bold) === Boolean(b.bold) && Boolean(a.italic) === Boolean(b.italic) &&
    Boolean(a.code) === Boolean(b.code) && Boolean(a.strike) === Boolean(b.strike) && a.link === b.link
}

const EMPHASIS = [
  { token: '**', style: { bold: true } },
  { token: '__', style: { bold: true } },
  { token: '~~', style: { strike: true } },
  { token: '*', style: { italic: true } },
  { token: '_', style: { italic: true } },
]

function walk(text, style, out) {
  let buffer = ''
  const flush = () => { if (buffer) { out.push({ ...style, text: buffer }); buffer = '' } }
  let index = 0

  while (index < text.length) {
    const char = text[index]

    if (char === '\\' && index + 1 < text.length && ESCAPABLE.includes(text[index + 1])) {
      buffer += text[index + 1]
      index += 2
      continue
    }

    if (char === '`') {
      const run = /^`+/.exec(text.slice(index))[0]
      const closing = text.indexOf(run, index + run.length)
      if (closing !== -1) {
        flush()
        const inner = text.slice(index + run.length, closing)
        out.push({ ...style, code: true, text: inner === '' ? ' ' : inner })
        index = closing + run.length
        continue
      }
      buffer += run
      index += run.length
      continue
    }

    if (char === '!' && text[index + 1] === '[') {
      const image = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/.exec(text.slice(index))
      if (image) {
        flush()
        out.push({ ...style, italic: true, link: image[2], text: image[1] || image[2] })
        index += image[0].length
        continue
      }
    }

    if (char === '[') {
      const link = /^\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/.exec(text.slice(index))
      if (link) {
        flush()
        walk(link[1], { ...style, link: link[2] }, out)
        index += link[0].length
        continue
      }
    }

    if (char === '<') {
      const auto = /^<((?:https?|mailto):[^>\s]+)>/.exec(text.slice(index))
      if (auto) {
        flush()
        out.push({ ...style, link: auto[1], text: auto[1] })
        index += auto[0].length
        continue
      }
      const br = /^<br\s*\/?>/i.exec(text.slice(index))
      if (br) {
        flush()
        out.push({ kind: 'break', ...style, text: '\n' })
        index += br[0].length
        continue
      }
    }

    const emphasis = EMPHASIS.find(rule => text.startsWith(rule.token, index) && isValidEmphasis(text, index, rule.token))
    if (emphasis) {
      const closing = findClosing(text, index + emphasis.token.length, emphasis.token)
      if (closing !== -1) {
        flush()
        walk(text.slice(index + emphasis.token.length, closing), { ...style, ...emphasis.style }, out)
        index = closing + emphasis.token.length
        continue
      }
    }

    buffer += char
    index += 1
  }

  flush()
}

function isValidEmphasis(text, index, token) {
  const next = text[index + token.length]
  if (next === undefined || /\s/.test(next)) return false
  if (token[0] === '_') {
    const previous = text[index - 1]
    if (previous !== undefined && /[\w]/.test(previous)) return false
  }
  return true
}

function findClosing(text, from, token) {
  let index = text.indexOf(token, from)
  while (index !== -1) {
    const before = text[index - 1]
    if (before !== undefined && !/\s/.test(before)) {
      if (token[0] !== '_' || !/[\w]/.test(text[index + token.length] ?? '')) return index
    }
    index = text.indexOf(token, index + token.length)
  }
  return -1
}
