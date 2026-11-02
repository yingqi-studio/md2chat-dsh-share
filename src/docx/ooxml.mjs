/**
 * Markdown blocks → WordprocessingML parts.
 *
 * Everything here is plain string building: the document body, the style and
 * numbering tables, and the relationship files that tie images and hyperlinks
 * to their parts. No browser, no Office install, no platform-specific binary.
 */
import { zip } from './zip.mjs'
import { parseBlocks } from './markdown.mjs'

const NS = {
  w: 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
  r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
  wp: 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing',
  a: 'http://schemas.openxmlformats.org/drawingml/2006/main',
  pic: 'http://schemas.openxmlformats.org/drawingml/2006/picture',
}

const EMU_PER_PIXEL = 9525
const CONTENT_EMU = 5486400 // 6.0in at 96dpi, inside 1in margins
const HEADING_HALF_POINTS = { 1: 32, 2: 28, 3: 25, 4: 23, 5: 22, 6: 21 }

const emit = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

const HEADER = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'

const BULLETS = ['•', '•', '•']
/** Text column width in twips: A4 minus 1-inch margins. */
const TEXT_WIDTH_TWIPS = 9360

/**
 * East Asian body font. Word substitutes missing fonts, but LibreOffice and
 * some viewers fall back to the Latin face, which has no CJK glyphs at all, so
 * name a font that ships with the platform the document was generated on.
 */
const CJK_FONT = process.platform === 'darwin' ? 'PingFang SC'
  : process.platform === 'win32' ? 'Microsoft YaHei'
  : 'Noto Sans CJK SC'

const STYLES = HEADER + `<w:styles xmlns:w="${NS.w}">
<w:docDefaults>
<w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="${CJK_FONT}" w:cs="Calibri"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-US" w:eastAsia="zh-CN"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="140" w:line="300" w:lineRule="auto"/></w:pPr></w:pPrDefault>
</w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="0" w:after="240"/></w:pPr><w:rPr><w:b/><w:sz w:val="40"/><w:szCs w:val="40"/><w:color w:val="1F2328"/></w:rPr></w:style>
${[1, 2, 3, 4, 5, 6].map(level => `<w:style w:type="paragraph" w:styleId="Heading${level}"><w:name w:val="heading ${level}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="${level === 1 ? 360 : 280}" w:after="140"/><w:outlineLvl w:val="${level - 1}"/></w:pPr><w:rPr><w:b/><w:sz w:val="${HEADING_HALF_POINTS[level]}"/><w:szCs w:val="${HEADING_HALF_POINTS[level]}"/><w:color w:val="1F2328"/></w:rPr></w:style>`).join('\n')}
<w:style w:type="paragraph" w:styleId="Quote"><w:name w:val="Quote"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="60" w:after="140"/><w:ind w:left="420"/><w:pBdr><w:left w:val="single" w:sz="18" w:space="10" w:color="D0D7DE"/></w:pBdr></w:pPr><w:rPr><w:color w:val="57606A"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Code"><w:name w:val="Code"/><w:basedOn w:val="Normal"/><w:pPr><w:shd w:val="clear" w:color="auto" w:fill="F6F8FA"/><w:spacing w:before="0" w:after="0" w:line="260" w:lineRule="auto"/><w:ind w:left="120" w:right="120"/></w:pPr><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:eastAsia="${CJK_FONT}" w:cs="Consolas"/><w:sz w:val="19"/><w:szCs w:val="19"/><w:color w:val="24292F"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="TableText"><w:name w:val="Table Text"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="20" w:after="20" w:line="260" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="19"/><w:szCs w:val="19"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Caption"><w:name w:val="caption"/><w:basedOn w:val="Normal"/><w:pPr><w:jc w:val="center"/><w:spacing w:before="40" w:after="200"/></w:pPr><w:rPr><w:i/><w:sz w:val="18"/><w:szCs w:val="18"/><w:color w:val="57606A"/></w:rPr></w:style>
<w:style w:type="table" w:styleId="TableGrid"><w:name w:val="Table Grid"/><w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="D0D7DE"/><w:left w:val="single" w:sz="4" w:space="0" w:color="D0D7DE"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="D0D7DE"/><w:right w:val="single" w:sz="4" w:space="0" w:color="D0D7DE"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="D0D7DE"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="D0D7DE"/></w:tblBorders></w:tblPr></w:style>
</w:styles>`

const NUMBERING = HEADER + `<w:numbering xmlns:w="${NS.w}">
<w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/>
${[0, 1, 2].map(level => `<w:lvl w:ilvl="${level}"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="${BULLETS[level]}"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="${420 + level * 420}" w:hanging="300"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="${CJK_FONT}"/></w:rPr></w:lvl>`).join('')}
</w:abstractNum>
<w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="hybridMultilevel"/>
${[0, 1, 2].map(level => `<w:lvl w:ilvl="${level}"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%${level + 1}."/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="${420 + level * 420}" w:hanging="360"/></w:pPr></w:lvl>`).join('')}
</w:abstractNum>
<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
<w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>
</w:numbering>`

/** Accumulates relationships and media parts while the body is rendered. */
function createContext(images) {
  return {
    images,
    relationships: [],
    media: [],
    paragraphId: 0,
    addRelationship(type, target, external = false) {
      const id = `rId${this.relationships.length + 1}`
      this.relationships.push({ id, type, target, external })
      return id
    },
    addImage(src) {
      const image = this.images?.get(src)
      if (!image) return null
      const existing = this.media.find(entry => entry.src === src)
      if (existing) return existing
      const index = this.media.length + 1
      const entry = { ...image, name: `image${index}.${image.extension}`, src }
      this.media.push(entry)
      entry.relationshipId = this.addRelationship(
        'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
        `media/${entry.name}`,
      )
      return entry
    },
  }
}

function runProperties(run, style = {}) {
  const properties = []
  const bold = run.bold || style.bold
  const italic = run.italic || style.italic
  const code = run.code
  if (code) properties.push('<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:eastAsia="${CJK_FONT}" w:cs="Consolas"/><w:shd w:val="clear" w:color="auto" w:fill="EFF1F3"/>')
  if (bold) properties.push('<w:b/><w:bCs/>')
  if (italic) properties.push('<w:i/><w:iCs/>')
  if (run.strike) properties.push('<w:strike/>')
  if (run.link) properties.push('<w:color w:val="0969DA"/>', '<w:u w:val="single"/>')
  return properties.length ? `<w:rPr>${properties.join('')}</w:rPr>` : ''
}

function runXml(run, style, context) {
  const pieces = String(run.text ?? '').split('\n')
  const body = pieces.map((piece, index) => (index === 0 ? '' : '<w:br/>') +
    (piece ? `<w:t xml:space="preserve">${emit(piece)}</w:t>` : '')).join('')
  const runEl = `<w:r>${runProperties(run, style)}${body}</w:r>`
  if (!run.link) return runEl
  const id = context.addRelationship(
    'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink',
    run.link,
    true,
  )
  return `<w:hyperlink r:id="${id}" w:history="1">${runEl}</w:hyperlink>`
}

function paragraphXml(spans, { style = 'Normal', context, ...paragraph }) {
  const properties = [`<w:pStyle w:val="${style}"/>`]
  if (paragraph.alignment) properties.push(`<w:jc w:val="${paragraph.alignment}"/>`)
  if (paragraph.numbering) {
    const { numId, level } = paragraph.numbering
    properties.push(`<w:numPr><w:ilvl w:val="${level}"/><w:numId w:val="${numId}"/></w:numPr>`)
  }
  if (paragraph.indent) properties.push(`<w:ind w:left="${paragraph.indent}"/>`)
  if (paragraph.border) {
    properties.push(`<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="6" w:color="D8DEE4"/></w:pBdr>`)
  }
  if (paragraph.keepNext) properties.push('<w:keepNext/>')
  if (paragraph.shading) properties.push(`<w:shd w:val="clear" w:color="auto" w:fill="${paragraph.shading}"/>`)
  const runs = spans.map(span => runXml(span, paragraph.runStyle ?? {}, context)).join('')
  return `<w:p><w:pPr>${properties.join('')}</w:pPr>${runs}</w:p>`
}

/**
 * Share the text column between the columns by content length: a table of
 * "环节 | 说明" reads badly when both sides get the same width, and Word has no
 * auto-fit worth relying on once tblLayout is fixed.
 */
function columnWidthsFor(block, columns) {
  const measure = spans => [...spans.reduce((text, span) => text + span.text, '')]
    .reduce((width, char) => width + (char.charCodeAt(0) > 0x2e80 ? 2 : 1), 0)
  const natural = Array.from({ length: columns }, (_, index) => {
    const cells = [block.header[index] ?? [], ...block.rows.map(row => row[index] ?? [])]
    return Math.max(4, ...cells.map(measure))
  })
  const total = natural.reduce((sum, width) => sum + width, 0)
  const minimum = Math.floor(TEXT_WIDTH_TWIPS * 0.12)
  return natural.map(width => Math.max(minimum, Math.round((TEXT_WIDTH_TWIPS * width) / total)))
}

function tableXml(block, context) {
  const columns = Math.max(block.header.length, ...block.rows.map(row => row.length), 1)
  const columnWidths = columnWidthsFor(block, columns)
  const grid = columnWidths.map(width => `<w:gridCol w:w="${width}"/>`).join('')
  const cell = (spans, { header = false, align = null } = {}, index = 0) => {
    const alignment = align ?? null
    const paragraph = paragraphXml(spans.length ? spans : [{ text: '' }], {
      style: 'TableText',
      context,
      alignment,
      runStyle: header ? { bold: true } : {},
    })
    return `<w:tc><w:tcPr><w:tcW w:w="${columnWidths[index]}" w:type="dxa"/>${header ? '<w:shd w:val="clear" w:color="auto" w:fill="DCE7F5"/>' : ''}<w:vAlign w:val="center"/></w:tcPr>${paragraph}</w:tc>`
  }
  const headerRow = `<w:tr><w:trPr><w:tblHeader/></w:trPr>${block.header.map((spans, index) => cell(spans, { header: true, align: block.align[index] }, index)).join('')}</w:tr>`
  const bodyRows = block.rows.map(row => `<w:tr>${Array.from({ length: columns }, (_, index) => cell(row[index] ?? [], { align: block.align[index] }, index)).join('')}</w:tr>`).join('')
  const borders = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV']
    .map(side => `<w:${side} w:val="single" w:sz="4" w:space="0" w:color="D0D7DE"/>`).join('')
  return `<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="9360" w:type="dxa"/><w:tblBorders>${borders}</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="120" w:type="dxa"/><w:right w:w="120" w:type="dxa"/><w:top w:w="60" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${grid}</w:tblGrid>${headerRow}${bodyRows}</w:tbl><w:p><w:pPr><w:spacing w:after="120"/></w:pPr></w:p>`
}

function drawingXml(image, context) {
  const scale = Math.min(1, CONTENT_EMU / (image.width * EMU_PER_PIXEL))
  const cx = Math.round(image.width * EMU_PER_PIXEL * scale)
  const cy = Math.round(image.height * EMU_PER_PIXEL * scale)
  context.paragraphId += 1
  const id = context.paragraphId
  return `<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${id}" name="Picture ${id}"/><a:graphic><a:graphicData uri="${NS.pic}"><pic:pic><pic:nvPicPr><pic:cNvPr id="${id}" name="${emit(image.name)}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${image.relationshipId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`
}

function renderBlock(block, context, style = {}) {
  switch (block.type) {
    case 'heading': {
      const level = Math.min(block.level, 6)
      const runs = block.spans.map(span => ({ ...span, bold: true }))
      return paragraphXml(runs, { style: `Heading${level}`, context, keepNext: true, ...style })
    }
    case 'paragraph':
      return paragraphXml(block.spans, { style: style.paragraphStyle ?? 'Normal', context, ...style })
    case 'code': {
      const lines = block.text.split('\n')
      const paragraphs = lines.map(line => paragraphXml([{ text: line === '' ? ' ' : line.replace(/\t/g, '  ') }], {
        style: 'Code',
        context,
        shading: 'F6F8FA',
        runStyle: { code: true },
      })).join('')
      // A slim spacer keeps the shaded block from touching the next paragraph.
      return paragraphs + '<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="120" w:lineRule="exact"/></w:pPr></w:p>'
    }
    case 'list': {
      const numId = block.ordered ? 2 : 1
      return block.items.map(item => {
        const spans = item.checked === null
          ? item.spans
          : [{ text: item.checked ? '☑ ' : '☐ ' }, ...item.spans]
        return paragraphXml(spans, {
          style: style.paragraphStyle ?? 'Normal',
          context,
          numbering: { numId, level: item.level },
          ...(style.paragraphStyle ? {} : {}),
        })
      }).join('')
    }
    case 'table':
      return tableXml(block, context)
    case 'quote': {
      const inner = block.blocks.map(child => renderBlock(child, context, {
        paragraphStyle: 'Quote',
        style: 'Quote',
      })).join('')
      return inner || paragraphXml([{ text: '' }], { style: 'Quote', context })
    }
    case 'rule':
      return paragraphXml([], { style: 'Normal', context, border: true })
    case 'image': {
      const image = context.addImage(block.src)
      if (image) return `<w:p><w:pPr><w:spacing w:before="80" w:after="80"/><w:jc w:val="center"/></w:pPr>${drawingXml(image, context)}</w:p>`
      const alt = block.alt || block.src
      return paragraphXml([{ text: alt, link: block.src }], { style: 'Caption', context })
    }
    default:
      return ''
  }
}

/**
 * Render Markdown into a .docx package.
 * @param {string} markdown - the reply's Markdown.
 * @param {{ title?: string, images?: Map<string, {data: Buffer, extension: string, width: number, height: number}> }} [options]
 * @returns {Buffer} the .docx bytes.
 */
export function renderDocx(markdown, options = {}) {
  const blocks = Array.isArray(markdown) ? markdown : parseBlocks(markdown)
  const title = options.title || titleOf(blocks) || 'md2chat'
  const context = createContext(options.images)
  const body = blocks.map(block => renderBlock(block, context)).join('')

  const section = '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="851" w:footer="992" w:gutter="0"/></w:sectPr>'
  const document = HEADER + `<w:document xmlns:w="${NS.w}" xmlns:r="${NS.r}" xmlns:wp="${NS.wp}" xmlns:a="${NS.a}" xmlns:pic="${NS.pic}"><w:body>${body}${section}</w:body></w:document>`

  const relationships = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
    '<Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>',
    '<Relationship Id="rIdNumbering" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>',
    ...context.relationships.map(relationship => `<Relationship Id="${relationship.id}" Type="${relationship.type}" Target="${emit(relationship.target)}"${relationship.external ? ' TargetMode="External"' : ''}/>`),
    '</Relationships>',
  ].join('')

  const types = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
    '<Default Extension="xml" ContentType="application/xml"/>',
    ...['png', 'jpeg', 'gif'].map(extension => `<Default Extension="${extension}" ContentType="image/${extension}"/>`),
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>',
    '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>',
    '<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>',
    '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>',
    '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>',
    '</Types>',
  ].join('')

  const rootRels = HEADER + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
    '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>' +
    '</Relationships>'

  const core = HEADER + '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    `<dc:title>${emit(title)}</dc:title><dc:creator>md2chat</dc:creator><cp:lastModifiedBy>md2chat</cp:lastModifiedBy>` +
    `<dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created>` +
    `<dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:modified>` +
    '</cp:coreProperties>'

  const app = HEADER + '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>md2chat</Application></Properties>'

  return zip([
    { name: '[Content_Types].xml', data: types },
    { name: '_rels/.rels', data: rootRels },
    { name: 'docProps/core.xml', data: core },
    { name: 'docProps/app.xml', data: app },
    { name: 'word/document.xml', data: document },
    { name: 'word/styles.xml', data: STYLES },
    { name: 'word/numbering.xml', data: NUMBERING },
    { name: 'word/_rels/document.xml.rels', data: relationships },
    ...context.media.map(image => ({ name: `word/media/${image.name}`, data: image.data })),
  ])
}

/** First heading, or the first non-empty line, used as the document title. */
function titleOf(blocks) {
  for (const block of blocks) {
    if (block.type === 'heading') return block.spans.map(span => span.text).join('').trim()
    if (block.type === 'paragraph') {
      const text = block.spans.map(span => span.text).join('').trim()
      if (text) return text.length > 60 ? text.slice(0, 60) : text
    }
  }
  return ''
}
