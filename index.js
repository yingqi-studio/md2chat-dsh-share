/**
 * md2chat share plugin, Host half.
 *
 * The browser half (lib/client.js) converts replies and copies chat targets.
 * This half serves md2chat's lazily loaded renderers (MathJax, Mermaid,
 * highlight.js) and builds Word documents through the md2chat skill's Node
 * pipeline, all inside Connection's authentication fence.
 */
import { readFile, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const name = 'md2chat-share'
export const inject = ['connection']

/** Route prefix the client points `md2chatVendorBase` at; keep in sync with src/client/convert.ts. */
export const VENDOR_ROUTE = '/api/md2chat-share/vendor/'
export const VENDOR_FILES = ['mathjax/tex-svg.js', 'mermaid/mermaid.min.js', 'highlight/highlight.min.js']
/** GET → {word}; keep in sync with src/client/convert.ts. */
export const HEALTH_ROUTE = '/api/md2chat-share/health'
/** POST {markdown} → {ok, path, message}; keep in sync with src/client/convert.ts. */
export const WORD_ROUTE = '/api/md2chat-share/word'

const vendorDir = new URL('./lib/vendor/', import.meta.url)

/** Same skill the conversation uses; override with MD2CHAT_SKILL_DIR when it lives elsewhere. */
export const skillDir = process.env.MD2CHAT_SKILL_DIR ?? join(homedir(), '.dsh/skills/md2chat')

let shareCore

async function loadShareCore() {
  if (shareCore === undefined) {
    shareCore = import(pathToFileURL(join(skillDir, 'scripts/lib/share-core.mjs')).href).catch((error) => {
      shareCore = undefined
      throw new Error(`找不到 md2chat skill（${skillDir}）：${error.message}`)
    })
  }
  return shareCore
}

/** Word export needs the skill's Node pipeline; hide the target instead of failing at click time. */
export async function wordAvailable() {
  try {
    await stat(join(skillDir, 'scripts/lib/share-core.mjs'))
    return true
  } catch {
    return false
  }
}

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
    const { share } = await loadShareCore()
    const result = await share({
      source: body.markdown,
      target: 'word',
      copy: false,
      reveal: true,
      title: typeof body.title === 'string' ? body.title : undefined,
    })
    return Response.json({ ok: true, path: result.files.docx, message: result.message })
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
    path: HEALTH_ROUTE,
    methods: ['GET'],
    requestBody: 'buffered',
    fetch: async () => Response.json({ word: await wordAvailable() }),
  }), 'md2chat-share: health')
  ctx.effect(() => ctx.connection.fetch.register({
    path: WORD_ROUTE,
    methods: ['POST'],
    requestBody: 'buffered',
    fetch: handleWord,
  }), 'md2chat-share: word')
}
