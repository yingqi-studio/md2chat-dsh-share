import assert from 'node:assert/strict'
import { test } from 'node:test'
import { inflateRawSync } from 'node:zlib'
import { buildDocx, docxFilename, imageFormat, imageSize } from '../src/docx/index.mjs'
import { parseBlocks, parseInline } from '../src/docx/markdown.mjs'

/** Read a ZIP archive the way an Office consumer would: by local file headers. */
function unzip(buffer) {
  const entries = new Map()
  let offset = 0
  while (offset + 30 <= buffer.length && buffer.readUInt32LE(offset) === 0x04034b50) {
    const method = buffer.readUInt16LE(offset + 8)
    const compressedSize = buffer.readUInt32LE(offset + 18)
    const size = buffer.readUInt32LE(offset + 22)
    const nameLength = buffer.readUInt16LE(offset + 26)
    const extraLength = buffer.readUInt16LE(offset + 28)
    const name = buffer.subarray(offset + 30, offset + 30 + nameLength).toString('utf8')
    const start = offset + 30 + nameLength + extraLength
    const body = buffer.subarray(start, start + compressedSize)
    entries.set(name, { size, data: method === 8 ? inflateRawSync(body) : body })
    offset = start + compressedSize
  }
  return entries
}

const SAMPLE = `# 分享说明

这是一段**粗体**、*斜体*、\`inline code\` 和 [链接](https://example.com)。

## 对比

| 变化 | 之前 | 现在 |
| --- | --- | --- |
| 入口 | 打开 App | 对话里说一句 |
| 表格 | 手动转图 | 自动渲染 |

- 第一项
- 第二项
  - 嵌套项

1. 甲
2. 乙

\`\`\`js
const a = 1
\`\`\`

> 引用一句

---

结尾。
`

test('docx: package contains the Office parts and every block survives', async () => {
  const { buffer, filename } = await buildDocx({ markdown: SAMPLE })
  assert.equal(filename, '分享说明.docx')
  assert.equal(buffer.subarray(0, 2).toString('latin1'), 'PK')

  const parts = unzip(buffer)
  for (const name of ['[Content_Types].xml', '_rels/.rels', 'word/document.xml', 'word/styles.xml', 'word/numbering.xml', 'word/_rels/document.xml.rels']) {
    assert(parts.has(name), name)
  }
  const document = parts.get('word/document.xml').data.toString('utf8')
  assert.match(document, /<w:pStyle w:val="Heading1"\/>/)
  assert.match(document, /<w:pStyle w:val="Heading2"\/>/)
  assert.match(document, /<w:b\/>/)
  assert.match(document, /<w:i\/>/)
  assert.match(document, /<w:hyperlink r:id="/)
  assert.match(document, /<w:tbl>/)
  assert.match(document, /<w:tblHeader\/>/)
  assert.match(document, /<w:pStyle w:val="Code"\/>/)
  assert.match(document, /<w:numPr>/)

  const grid = [...document.matchAll(/<w:gridCol w:w="(\d+)"\/>/g)].map(match => Number(match[1]))
  assert.equal(grid.reduce((sum, width) => sum + width, 0), 9360)

  const styles = parts.get('word/styles.xml').data.toString('utf8')
  for (const style of ['heading 1', 'Code', 'Quote', 'TableGrid']) assert(styles.includes(style), style)
})

test('docx: remote pictures are fetched and embedded, failures fall back to text', async () => {
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR42mP8z8BQz0AEYBxVSFUAANMAC/9n0o0dAAAAAElFTkSuQmCC', 'base64')
  const fetchImpl = async () => new Response(png, { headers: { 'content-type': 'image/png' } })
  const embedded = await buildDocx({ markdown: '![图标](https://example.com/icon.png)', fetchImpl })
  const parts = unzip(embedded.buffer)
  assert(parts.has('word/media/image1.png'))
  assert.match(parts.get('word/document.xml').data.toString('utf8'), /<w:drawing>/)

  const missing = await buildDocx({
    markdown: '![图标](https://example.com/gone.png)',
    fetchImpl: async () => new Response('nope', { status: 404 }),
  })
  assert(![...unzip(missing.buffer).keys()].some(name => name.startsWith('word/media/')))
  assert.match(unzip(missing.buffer).get('word/document.xml').data.toString('utf8'), /图标/)
})

test('docx: images are only embedded when Word can read the bytes', () => {
  assert.equal(imageFormat(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0k', 'base64')), 'png')
  assert.equal(imageFormat(Buffer.from([0xFF, 0xD8, 0xFF, 0xE0])), 'jpeg')
  assert.equal(imageFormat(Buffer.from('GIF89a', 'latin1')), 'gif')
  assert.equal(imageFormat(Buffer.from('RIFF0000WEBP', 'latin1')), null)
  assert.deepEqual(imageSize(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0k', 'base64'), 'png'), { width: 2, height: 2 })
})

test('docx: the download name is filesystem safe', () => {
  assert.equal(docxFilename('a/b:c*?"<>|'), 'a b c.docx')
  assert.equal(docxFilename('   '), 'md2chat.docx')
  assert.equal(docxFilename('x'.repeat(200)).length, 85)
})

test('markdown: block and inline parsing keeps the structure Word needs', () => {
  const blocks = parseBlocks(SAMPLE)
  assert.deepEqual(blocks.map(block => block.type), ['heading', 'paragraph', 'heading', 'table', 'list', 'list', 'code', 'quote', 'rule', 'paragraph'])
  assert.equal(blocks[3].header[0][0].text, '变化')
  assert.equal(blocks[3].align[2], null)
  assert.deepEqual(blocks[4].items.map(item => [item.spans[0].text, item.level]), [['第一项', 0], ['第二项', 0], ['嵌套项', 1]])
  assert.equal(blocks[5].ordered, true)
  assert.equal(blocks[6].text, 'const a = 1')

  const spans = parseInline('a **b** `c` ~~d~~ [e](https://x.y)')
  assert.deepEqual(spans.map(span => [span.text, Boolean(span.bold), Boolean(span.code), Boolean(span.strike), span.link ?? null]), [
    ['a ', false, false, false, null],
    ['b', true, false, false, null],
    [' ', false, false, false, null],
    ['c', false, true, false, null],
    [' ', false, false, false, null],
    ['d', false, false, true, null],
    [' ', false, false, false, null],
    ['e', false, false, false, 'https://x.y'],
  ])
  assert.equal(parseInline('snake_case_name').map(span => span.text).join(''), 'snake_case_name')
})
