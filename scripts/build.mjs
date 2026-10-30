/**
 * Build lib/client.js in the DeepSeek Harness client-bundle format (the
 * shape packages/client/tsdown.client.ts emits): a CommonJS bundle wrapped in
 * window.__ModuleLoader__.load({ id, factory: (require) => … }), whose shared
 * modules (React, cordis, @deepseek-ai/*) resolve through the injected
 * require. md2chat's core files are bundled from ../assets through their
 * CommonJS branch; the lazily loaded vendor renderers are copied to lib/vendor
 * for the Host half to serve, and the native DingTalk/Feishu clipboard writer
 * (native/, md2chat's src-tauri clipboard module) is built for this platform
 * into lib/native. `--no-native` skips cargo.
 */
import { cpSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as esbuild from 'esbuild'
import { VENDOR_FILES } from '../index.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// The md2chat core lives in the md2chat skill's vendored copy; override with
// MD2CHAT_ASSETS when the skill sits somewhere else.
const assets = process.env.MD2CHAT_ASSETS
  ? resolve(process.env.MD2CHAT_ASSETS)
  : resolve(root, '../../skills/md2chat/vendor/md2chat/assets')
const { name: id } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const watch = process.argv.includes('--watch')

mkdirSync(join(root, 'lib/vendor'), { recursive: true })
for (const file of VENDOR_FILES) {
  cpSync(join(assets, 'vendor', file), join(root, 'lib/vendor', file))
  cpSync(join(assets, 'vendor', dirname(file), 'LICENSE'), join(root, 'lib/vendor', dirname(file), 'LICENSE'))
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
  alias: { 'md2chat-core': assets },
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'none',
  logLevel: 'info',
  banner: { js: `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => {\nvar module = { exports: {} }; var exports = module.exports;` },
  footer: { js: 'return module.exports; } });' },
}

if (watch) await (await esbuild.context(options)).watch()
else await esbuild.build(options)
