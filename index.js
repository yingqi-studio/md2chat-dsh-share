/**
 * md2chat share plugin, Host half.
 *
 * The browser half (lib/client.js) converts replies and copies chat targets.
 * This half does two things inside Connection's authentication fence: serve
 * md2chat's lazily loaded renderers (MathJax, Mermaid, highlight.js), and build
 * Word documents in-process. Word export used to depend on a local md2chat
 * skill (macOS + Chrome); the built-in OOXML writer removed both, so the same
 * plugin works on macOS, Windows and Linux.
 */
import { readFile } from 'node:fs/promises'
import { buildDocx } from './lib/docx/index.mjs'

export const name = 'md2chat-share'
export const inject = ['connection']

/** Route prefix the client points `md2chatVendorBase` at; keep in sync with src/client/convert.ts. */
export const VENDOR_ROUTE = '/api/md2chat-share/vendor/'
export const VENDOR_FILES = ['mathjax/tex-svg.js', 'mermaid/mermaid.min.js', 'highlight/highlight.min.js']
/** POST {markdown, title?} → .docx bytes; keep in sync with src/client/convert.ts. */
export const WORD_ROUTE = '/api/md2chat-share/word'

const DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

const vendorDir = new URL('./lib/vendor/', import.meta.url)

async function handleWord(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: '请求不是有效 JSON' }, { status: 400 })
  }
  if (typeof body?.markdown !== 'string' || body.markdown.trim() === '') {
    return Response.json({ ok: false, error: '缺少 Markdown 内容' }, { status: 400 })
  }
  try {
    const { buffer, filename } = await buildDocx({
      markdown: body.markdown,
      title: typeof body.title === 'string' ? body.title : undefined,
    })
    return new Response(buffer, {
      headers: {
        'content-type': DOCX_TYPE,
        'content-length': String(buffer.length),
        'content-disposition': `attachment; filename="md2chat.docx"; filename*=UTF-8''${encodeURIComponent(filename)}`,
        'cache-control': 'no-store',
      },
    })
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}

export function apply(ctx) {
  for (const file of VENDOR_FILES) {
    ctx.effect(() => ctx.connection.fetch.register({
      path: VENDOR_ROUTE + file,
      methods: ['GET'],
      requestBody: 'buffered',
      fetch: async () => new Response(await readFile(new URL(file, vendorDir)), {
        headers: { 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'no-cache' },
      }),
    }), `md2chat-share: ${file}`)
  }
  ctx.effect(() => ctx.connection.fetch.register({
    path: WORD_ROUTE,
    methods: ['POST'],
    requestBody: 'buffered',
    fetch: handleWord,
  }), 'md2chat-share: word')
}
