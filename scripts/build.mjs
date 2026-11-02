/**
 * Build lib/client.js in the DeepSeek Harness client-bundle format (the
 * shape packages/client/tsdown.client.ts emits): a CommonJS bundle wrapped in
 * window.__ModuleLoader__.load({ id, factory: (require) => … }), whose shared
 * modules (React, cordis, @deepseek-ai/*) resolve through the injected
 * require. md2chat's core files are bundled from ../assets through their
 * CommonJS branch; the lazily loaded vendor renderers are copied to lib/vendor
 * for the Host half to serve, and the Word writer in src/docx is copied to
 * lib/docx so the Host can import it without a build step.
 */
import { cpSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as esbuild from 'esbuild'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// Keep in sync with index.js VENDOR_FILES; not imported so the build still runs
// before lib/docx exists (the host imports the Word writer statically).
const VENDOR_FILES = ['mathjax/tex-svg.js', 'mermaid/mermaid.min.js', 'highlight/highlight.min.js']
// The md2chat core lives in the md2chat skill's vendored copy; override with
// MD2CHAT_ASSETS when the skill sits somewhere else.
// The md2chat core files this bundle links against are vendored in the repo,
// so a clone builds without the md2chat app checkout.
const core = join(root, 'vendor/md2chat')
// Only refreshing lib/vendor needs the upstream app (MD2CHAT_ASSETS); a plain
// build keeps the committed copies.
const upstream = process.env.MD2CHAT_ASSETS ? resolve(process.env.MD2CHAT_ASSETS) : null
const { name: id } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const watch = process.argv.includes('--watch')

// Host-side Word writer: plain ESM, copied as-is next to the client bundle.
cpSync(join(root, 'src/docx'), join(root, 'lib/docx'), { recursive: true })

if (upstream !== null) {
  for (const file of VENDOR_FILES) {
    cpSync(join(upstream, 'vendor', file), join(root, 'lib/vendor', file))
    cpSync(join(upstream, 'vendor', dirname(file), 'LICENSE'), join(root, 'lib/vendor', dirname(file), 'LICENSE'))
  }
}

const options = {
  entryPoints: [join(root, 'src/client/index.ts')],
  outfile: join(root, 'lib/client.js'),
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'chrome120',
  jsx: 'automatic',
  // Shell module table rows (packages/client/web/src/platform.ts PLATFORM_MODULES and dsh.client.inject packages).
  external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', 'zod', '@deepseek-ai/*'],
  alias: { 'md2chat-core': core },
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'none',
  logLevel: 'info',
  banner: { js: `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => {\nvar module = { exports: {} }; var exports = module.exports;` },
  footer: { js: 'return module.exports; } });' },
}

if (watch) await (await esbuild.context(options)).watch()
else await esbuild.build(options)
