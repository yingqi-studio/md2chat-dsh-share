# md2chat share — DeepSeek Harness plugin

Adds a **Share to chat** button under each finished reply in [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (Web and Desktop). Clicking it opens a dialog where you pick a destination. The plugin converts the reply's Markdown with md2chat's own pipeline and writes the result to the system clipboard in the format that suits each chat app.

| Destination | Behavior |
|---|---|
| WeChat, WeCom | **Long image**: a single `image/png` with no text (their chat inputs can't keep a mixed text-and-image layout). md2chat's `ClipboardImage.renderPages` handles a reply that exceeds one image's pixel limit by splitting it at line breaks into several long images. The first is copied automatically; the rest can be copied one by one, in order, from the dialog |
| DingTalk | md2chat desktop's native format: `com.dingtalk.richTextAttributedString` on Mac, the Chromium-compatible CF_HTML on Windows. Text stays editable |
| Feishu | md2chat desktop's native format: an `org.chromium.web-custom-data` editor-kit fragment. Expand the rich-text input first, then paste |
| Email | Same HTML as the md2chat editor; tables stay editable |

## How it works

- `index.js`: the Host (Node) half. Inside the Harness connection authentication fence it registers:
  - `/api/md2chat-share/vendor/*`, which serves md2chat's lazily loaded MathJax, Mermaid and highlight.js files;
  - `POST /api/md2chat-share/copy`, which sends the converted segments to `lib/native/md2chat-clipboard` to write the DingTalk/Feishu native clipboard. The PNG cache lives in the system cache directory (`~/Library/Caches/md2chat-dsh-share` on Mac) and is pruned after 7 days.
- `native/`: a Rust CLI. It compiles md2chat desktop's `src-tauri/src/clipboard/` and `images.rs` directly via `#[path]`, with no Tauri dependency, so the format logic exists in only one place.
- `src/client/`: the browser half.
  - `index.ts` registers an entry in the `conversation.chat.assistant-actions` slot.
  - `reply.ts` reads the reply's text blocks from the Chat snapshot.
  - `convert.ts` calls md2chat's core files from `../assets` without modifying them: `chat-payload.js`, `chat-markdown.js`, `renderers.js`, `table-images.js`, `chat-targets.js`, `chat-clipboard.js` and `clipboard-image.js`.
  - `ShareAction.tsx` is the button and dialog.
- `scripts/build.mjs` uses esbuild to produce `lib/client.js` in the Harness client-bundle format: `window.__ModuleLoader__.load({ id, factory })`. React, `@deepseek-ai/*` and similar modules come from the shell's module table.

Conversion starts as soon as the dialog opens. Clicking a destination writes the clipboard immediately; a `ClipboardItem` takes a Promise, which keeps the click's user activation alive.

## Develop

```sh
cd harness-plugin
npm install
npm run build        # lib/client.js + lib/vendor + lib/native (requires Rust/cargo)
npm test             # build, then unit tests
npm run typecheck
npm run dev:patch    # writes lib/dev.cordis.yml (an overlay with an absolute path)
```

Load it in a Harness source checkout:

```sh
# Web
cd ~/project/github/deepseek-harness
pnpm dsh web --patch ~/project/github/md2chat/harness-plugin/lib/dev.cordis.yml

# Desktop (development build): copy the overlay to the home-level patch, then start
mkdir -p apps/desktop/.desktop-build/development/home
cp ~/project/github/md2chat/harness-plugin/lib/dev.cordis.yml apps/desktop/.desktop-build/development/home/cordis.patch.yml
pnpm run start:desktop
```

`npm run watch` rebuilds `lib/client.js` continuously, and the Harness Web host hot-replaces it. Without a model key, you can produce a test reply with the Harness `pnpm run mock:llm --success-text "<markdown>"` together with `DEEPSEEK_BASE_URL=http://127.0.0.1:<port>/v1 DEEPSEEK_API_KEY=<key>`.

## TODO

- **Distribution**: `lib/native` is built only for the current platform. A published package needs prebuilt binaries for macOS (universal) and Windows x64.
- **Image attachments in replies**: the plugin currently converts only text blocks, the same as the built-in Copy. Remote `![](https://…)` images in the Markdown are fetched; local paths are not supported yet.


## 本机安装状态

这份副本通过 `link:` 装进了 `~/.dsh/profiles/desktop`，并由 DSH 的插件命令写入了
`dsh.profile.bundles`。改动 `lib/client.js` 后重启应用即可生效。

- 构建：`npm install && npm run build -- --no-native`（`--no-native` 跳过 Rust；
  转换内核取自 `../../skills/md2chat/vendor/md2chat/assets`，可用 `MD2CHAT_ASSETS` 覆盖）。
- 没有 Rust 时钉钉/飞书的原生剪贴板格式不可用，对话框里选择它们会提示改用长图。
- 卸载：`dsh plugin --profile desktop remove md2chat-dsh-share`，或在「设置 → 插件」里移除，
  然后重启；安装前的 profile 文件备份在 `~/.dsh/profiles/desktop/backup-*`。

## 本机改动（2026-10-21）

- **移除钉钉 / 飞书**：原生私有格式依赖 Rust 组件，本机没有工具链，且用户不需要。`native/`、`/api/md2chat-share/copy`、`NATIVE_TARGETS` 一并删除。
- **微信 / 企业微信改为按内容选择交付**（`src/client/convert.ts` 的 `chooseMode`）：
  - `text`：只有文字 → 复制纯文本；
  - `segments`：文字为主 + 少量图文块 → 微信复制成一份 HTML 图文，一次粘贴；企微切换成分段列表，逐段复制；
  - `image`：图文块 ≥ 3 或短卡片 → 一张长图。
- **新增 Word 目标**：Host 半 `POST /api/md2chat-share/word` 调用 `~/.dsh/skills/md2chat/scripts/lib/share-core.mjs`，用同一套管线生成真正的 .docx（可编辑表格 + 图片），完成后在 Finder 中显示。
- 聊天目标仍在页面内转换；Word 走 Node/headless Chrome，约 1–2 秒。

重新构建：`npm install && npm run build`（已不再需要 `--no-native`，也没有 Rust 步骤）。改动 `lib/client.js` 后重启应用生效；`index.js` 的 Host 路由同样在启动时加载。
