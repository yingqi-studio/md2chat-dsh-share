import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { replyMarkdown } from '../src/client/reply.ts'

const snapshot = nodes => ({ nodes: { values: () => nodes } })
const tail = (messageId, blocks) => ({ kind: 'turn-tail', data: { closing: { blocks, finalNode: { messageId } } } })

test('reply Markdown joins only the matching turn closing text blocks', () => {
  const nodes = [
    { kind: 'assistant', data: {} },
    tail('m1', [{ kind: 'text', text: '旧回复' }]),
    tail('m2', [{ kind: 'text', text: '## 标题\n\n' }, { kind: 'image', attachment: {} }, { kind: 'text', text: '| a |\n|---|\n| 1 |' }]),
  ]
  assert.equal(replyMarkdown(snapshot(nodes), 'm2'), '## 标题\n\n| a |\n|---|\n| 1 |')
  assert.equal(replyMarkdown(snapshot(nodes), 'm1'), '旧回复')
})

test('unknown messages, interrupted turns and missing snapshots yield empty Markdown', () => {
  assert.equal(replyMarkdown(snapshot([tail('m1', [{ kind: 'text', text: 'x' }])]), 'other'), '')
  assert.equal(replyMarkdown(snapshot([{ kind: 'turn-tail', data: { closing: null } }]), 'm1'), '')
  assert.equal(replyMarkdown(undefined, 'm1'), '')
})

test('client bundle uses the Harness module-loader handoff and only shell-provided externals', () => {
  const bundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  assert.match(bundle, /^window\.__ModuleLoader__\.load\(\{ id: "md2chat-dsh-share", factory: \(require\) => \{/)
  assert.match(bundle.trimEnd(), /return module\.exports; \} \}\);$/)
  const externals = new Set([...bundle.matchAll(/require\("([^"]+)"\)/g)].map(match => match[1]))
  assert.deepEqual([...externals].sort(), ['@deepseek-ai/dsh-client-ui-primitives', 'react', 'react/jsx-runtime'])
})

test('host half serves vendor files and the Word route', async () => {
  const { VENDOR_FILES, VENDOR_ROUTE, WORD_ROUTE, apply, inject } = await import('../index.js')
  assert.deepEqual(inject, ['connection'])
  const routes = []
  apply({ effect: fn => fn(), connection: { fetch: { register: route => { routes.push(route); return async () => {} } } } })
  assert.deepEqual(routes.map(route => route.path), [...VENDOR_FILES.map(file => VENDOR_ROUTE + file), WORD_ROUTE])
  const response = await routes.find(route => route.path.endsWith('highlight.min.js')).fetch(new Request('http://x/'))
  assert.equal(response.headers.get('content-type'), 'text/javascript; charset=utf-8')
  assert.match(await response.text(), /hljs/)

  const renderers = readFileSync(new URL('../../../skills/md2chat/vendor/md2chat/assets/renderers.js', import.meta.url), 'utf8')
  for (const file of VENDOR_FILES) assert(renderers.includes(`'${file}'`), file)

  const word = routes.at(-1)
  assert.deepEqual(word.methods, ['POST'])
  const rejected = await word.fetch(new Request('http://x/', { method: 'POST', body: JSON.stringify({}) }))
  assert.equal(rejected.status, 400)
  assert.equal((await rejected.json()).ok, false)
})
