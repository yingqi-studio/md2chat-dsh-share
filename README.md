# md2chat share — DeepSeek Harness plugin

Adds a **Share to chat** button under each finished reply in
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (Web and
Desktop). The reply's Markdown is converted with md2chat's own pipeline — tables,
code, formulas and Mermaid diagrams become images, prose stays text — and the
result is written to the clipboard in the shape each destination needs.

| Destination | What lands on the clipboard |
|---|---|
| WeChat | Depends on the reply: plain text when there is nothing to rasterise; one HTML rich-text paste (text + images) for prose with a few blocks; a long image when the reply is structured or short |
| WeCom | The same policy, but text and images are delivered as ordered segments — the WeCom input cannot mix them in one paste. The first segment is copied on click, the rest one by one from the dialog |
| Image | Always one long `image/png`, split at line breaks into several images when it exceeds md2chat's pixel limit |
| Email | Editable-table HTML plus the plain-text alternative |
| Word | A `.docx` built by the local md2chat skill; the target is hidden when that skill is not installed |

## Install

```sh
dsh plugin --profile web add md2chat-dsh-share
```

Until the package is on npm, install from the repository:

```sh
dsh plugin --profile web add github:yingqi-studio/md2chat-dsh-share
```

## How it works

- `index.js` — the Host (Node) half. Inside the Harness connection
  authentication fence it registers:
  - `GET /api/md2chat-share/vendor/*`, serving md2chat's lazily loaded MathJax,
    Mermaid and highlight.js bundles;
  - `GET /api/md2chat-share/health`, reporting whether Word export is available;
  - `POST /api/md2chat-share/word`, which imports the md2chat skill's
    `scripts/lib/share-core.mjs` (`MD2CHAT_SKILL_DIR` overrides the default
    `~/.dsh/skills/md2chat`) and returns the generated `.docx` path.
- `src/client/` — the browser half.
  - `index.ts` registers an entry in the `conversation.chat.assistant-actions` slot.
  - `reply.ts` reads the reply's text blocks from the Chat snapshot.
  - `convert.ts` calls md2chat's core files without modifying them
    (`chat-payload.js`, `chat-markdown.js`, `renderers.js`, `table-images.js`,
    `chat-targets.js`, `clipboard-image.js`) and owns the delivery policy.
  - `ShareAction.tsx` is the button and the dialog.
- `scripts/build.mjs` uses esbuild to produce `lib/client.js` in the Harness
  client-bundle format `window.__ModuleLoader__.load({ id, factory })`; React and
  `@deepseek-ai/*` come from the shell's module table. The lazily loaded vendor
  renderers are copied to `lib/vendor/` for the Host half to serve.

The conversion reuses the same core files as the md2chat desktop app, so output
matches it. Conversion starts when the dialog opens; clicking a destination writes
the clipboard immediately, and a `ClipboardItem` promise keeps the click's user
activation alive across slow Mermaid/MathJax renders.

## Develop

```sh
npm install
npm run build        # lib/client.js + lib/vendor
npm test             # build, then unit tests
npm run typecheck
```

## Limitations

- Only text blocks are converted, the same as the Harness's built-in Copy.
  Remote `![](https://…)` images in the Markdown are fetched; local paths and
  image attachments are not supported yet.
- DingTalk and Feishu native clipboard formats are not part of this plugin.
- Word export needs macOS, Chrome and the md2chat skill on the same machine;
  without it the target is hidden.
