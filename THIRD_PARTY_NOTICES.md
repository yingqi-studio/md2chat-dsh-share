# Third-party notices

This plugin bundles code from the projects below. Nothing is fetched at
runtime: every file listed here is shipped inside the package.

## md2chat core

- **md2chat**, Copyright (c) 2026 forgeturl, MIT License.
  - Upstream: https://github.com/forgeturl/md2chat
  - Vendored commit: `a4ed3934a01bfdce55fe30f712e8eac81279e53e` (`vendor/md2chat/UPSTREAM_COMMIT`)
  - Source of the bundled files: `vendor/md2chat/` (`chat-markdown.js`, `chat-payload.js`, `chat-targets.js`, `clipboard-image.js`, `code-images.js`, `renderers.js`, `table-images.js`)
  - License: `vendor/md2chat/LICENSE`
  - The files are unmodified apart from being consumed as CommonJS by the bundle in `lib/client.js`.

## Markdown parser

- **Marked 15.0.12**, Copyright (c) 2011–2025 Christopher Jeffrey and contributors, MIT License.
  - Upstream: https://github.com/markedjs/marked
  - Vendored file: `vendor/md2chat/vendor/marked.js` (UMD build), bundled into `lib/client.js`
  - Distribution source: https://cdn.jsdelivr.net/npm/marked@15.0.12/lib/marked.umd.js

## Renderers served by the host half

The host half serves these files under `/api/md2chat-share/vendor/`, and the
browser half loads them on demand. They are unmodified.

- **MathJax 3.2.2**, Apache License 2.0.
  - Upstream: https://github.com/mathjax/MathJax
  - File: `lib/vendor/mathjax/tex-svg.js`; license: `lib/vendor/mathjax/LICENSE`
  - Source: https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js

- **Mermaid 12.2.0**, MIT License.
  - Upstream: https://github.com/mermaid-js/mermaid
  - File: `lib/vendor/mermaid/mermaid.min.js`; license: `lib/vendor/mermaid/LICENSE`
  - Source: https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.min.js
  - Bundled dependency notices are retained inside the build.

- **highlight.js 11.12.0**, BSD 3-Clause License.
  - Upstream: https://github.com/highlightjs/highlight.js
  - File: `lib/vendor/highlight/highlight.min.js`; license: `lib/vendor/highlight/LICENSE`
  - Source: https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.12.0/highlight.min.js
  - Loaded only when a reply contains a code block.

## Platform names

WeChat, WeCom, DingTalk, Feishu and email are named only to describe where a
converted reply can be pasted. Their names and marks belong to their owners;
this project's license does not license those marks and no endorsement is
implied.
