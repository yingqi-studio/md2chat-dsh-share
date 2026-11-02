/**
 * Markdown → .docx, in-process.
 *
 * Unlike the old path, nothing here shells out: no headless Chrome, no system
 * `zip`, no macOS-only clipboard helper. Tables stay tables, code stays code,
 * and pictures that the reply already links to are fetched and embedded.
 */
import { parseBlocks, collectImageSources } from './markdown.mjs'
import { renderDocx } from './ooxml.mjs'

const MAX_IMAGE_BYTES = 8 * 1024 * 1024
const MAX_IMAGES = 24
const FETCH_TIMEOUT_MS = 12000

/** Sniff the picture type from its magic bytes; null when Word cannot embed it. */
export function imageFormat(data) {
  if (data.length >= 8 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4E && data[3] === 0x47) return 'png'
  if (data.length >= 3 && data[0] === 0xFF && data[1] === 0xD8 && data[2] === 0xFF) return 'jpeg'
  if (data.length >= 6 && data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46) return 'gif'
  return null
}

/** Width and height in pixels, or a 4:3 guess when the header is unusual. */
export function imageSize(data, format) {
  if (format === 'png' && data.length >= 24) return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) }
  if (format === 'gif' && data.length >= 10) return { width: data.readUInt16LE(6), height: data.readUInt16LE(8) }
  if (format === 'jpeg') {
    let offset = 2
    while (offset + 9 < data.length) {
      if (data[offset] !== 0xFF) { offset += 1; continue }
      const marker = data[offset + 1]
      const size = data.readUInt16BE(offset + 2)
      if (marker >= 0xC0 && marker <= 0xC3) {
        return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) }
      }
      offset += 2 + size
    }
  }
  return { width: 4, height: 3 }
}

function decodeDataUrl(src) {
  const match = /^data:image\/(png|jpe?g|gif);base64,([\s\S]+)$/i.exec(src)
  if (!match) return null
  const data = Buffer.from(match[2], 'base64')
  return { data, format: imageFormat(data) }
}

async function download(src, fetchImpl) {
  const response = await fetchImpl(src, {
    redirect: 'follow',
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: { accept: 'image/png,image/jpeg,image/gif,image/webp;q=0.8,*/*;q=0.5' },
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  if (buffer.length > MAX_IMAGE_BYTES) throw new Error('图片超过 8 MB')
  return buffer
}

/**
 * Fetch the pictures a reply links to, skipping anything Word cannot embed.
 * Failures are silent: the document falls back to the link text.
 */
export async function prepareImages(blocks, { fetchImpl = globalThis.fetch } = {}) {
  const sources = collectImageSources(blocks).slice(0, MAX_IMAGES)
  const images = new Map()
  await Promise.all(sources.map(async (src) => {
    try {
      const decoded = src.startsWith('data:') ? decodeDataUrl(src) : null
      const data = decoded?.data ?? (await download(src, fetchImpl))
      const format = decoded?.format ?? imageFormat(data)
      if (!format) return
      const { width, height } = imageSize(data, format)
      if (!width || !height) return
      images.set(src, { data, extension: format, width, height })
    } catch {
      // Unreachable or unsupported picture: keep the alt text instead.
    }
  }))
  return images
}

/** Filesystem-safe name for the downloaded document. */
export function docxFilename(title) {
  const base = String(title ?? '').trim().replace(/[\\/:*?"<>|\u0000-\u001f]/g, ' ').replace(/\s+/g, ' ').trim()
  return `${base ? base.slice(0, 80) : 'md2chat'}.docx`
}

/**
 * Convert one reply to a Word document.
 * @param {{ markdown: string, title?: string, fetchImpl?: typeof fetch }} input
 * @returns {Promise<{ buffer: Buffer, filename: string }>}
 */
export async function buildDocx({ markdown, title, fetchImpl }) {
  const blocks = parseBlocks(markdown)
  const images = await prepareImages(blocks, { fetchImpl })
  const buffer = renderDocx(blocks, { title, images })
  return { buffer, filename: docxFilename(title || firstLine(blocks)) }
}

function firstLine(blocks) {
  for (const block of blocks) {
    if (block.type === 'heading') return block.spans.map(span => span.text).join('')
    if (block.type === 'paragraph') {
      const text = block.spans.map(span => span.text).join('').trim()
      if (text) return text.slice(0, 60)
    }
  }
  return ''
}
