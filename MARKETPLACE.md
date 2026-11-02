# 上架材料（DSH 插件市场）

市场是索引，不是托管。上架 = 公开 npm 包 + 向
[awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)
提一个 PR，新增 `data/plugins/yingqi-studio__md2chat-dsh-share.yml`。合并后 dshmarket.com 与
DSH 的 Discover 页会自动收录。

## 卡片文案

**中文**

> 在每条回复下加「分享到聊天」：把回答转成微信/企微可直接粘贴的文本、分段或长图，并支持邮件 HTML 与 Word 导出。

**英文**

> Adds a Share to chat action under each reply: converts the answer to WeChat/WeCom-ready text, ordered segments or a long image, plus email HTML and Word export.

## 详情页介绍

> 把每条回复下面的「分享到聊天」接上微信、企业微信、邮件和 Word。
>
> DSH 的回答里常有表格、代码、公式和 Mermaid。直接复制进聊天框，表格会散、代码会串行。这个插件在回复下方加一个按钮，用 md2chat 的渲染管线把表格、代码、公式、流程图转成图片，正文保持文字，再按目标写入剪贴板：
>
> - **微信 / 企业微信**：按内容自动决定交付方式。没有图文块时复制纯文本；图文块 ≥ 3 或内容很短时生成一张长图；其余情况微信复制成一份 HTML 图文、一次粘贴，企微输出有序分段、逐段复制（企微聊天框不能图文混排）。
> - **邮件**：复制可编辑表格的 HTML + 纯文本。
> - **Word**：直接下载 .docx，表格、列表、代码块都是 Word 原生可编辑结构，不经过浏览器渲染，Windows / Linux 同样可用。
>
> 长图超过 md2chat 的像素上限时会按行拆成多张，第一张自动复制，其余按顺序在对话框里复制。
>
> 转换在本机完成：只有 Markdown 里的远程图片会联网，不上传正文。
>
> 要求：DSH Web 或 Desktop；聊天目标走浏览器剪贴板。已知限制：回复里的本地图片附件暂不转换；不支持钉钉/飞书的原生私有格式。

## 投稿条目

`data/plugins/yingqi-studio__md2chat-dsh-share.yml`：

```yaml
url: https://github.com/yingqi-studio/md2chat-dsh-share
name: yingqi-studio/md2chat-dsh-share
category: ui
description:
  en: 'Adds a Share to chat action under each reply: converts the answer to WeChat/WeCom-ready text, ordered segments or a long image, plus email HTML and Word export.'
  zh: '在每条回复下加「分享到聊天」：把回答转成微信/企微可直接粘贴的文本、分段或长图，并支持邮件 HTML 与 Word。'
icon: https://raw.githubusercontent.com/yingqi-studio/md2chat-dsh-share/main/assets/icon-180.png
```

- `category` 取 `ui`（在回复操作区加入口）。其他候选：`tools`、`workflow`。
- 描述不能带营销词；收录审核会拿描述对照代码。
- 仓库需要打 `dsh-plugin` topic，且创建满 1 天。

## 发布步骤

```sh
# 1. 发布 npm 包（需要 npm 账号）
npm publish

# 2. 仓库推上去，打 topic
git remote add origin git@github.com:yingqi-studio/md2chat-dsh-share.git
git push -u origin main

# 3. fork awesome-dsh-plugin，加一个 YAML，提 PR
```

发布前自检：

```sh
npm pack --dry-run     # 应包含 index.js、lib/client.js、lib/vendor/**、cordis.patch.yml
npm test
```

## 商店素材

- 图标：`assets/icon-180.png`（180×180 PNG，GitHub raw 直链）。
- 截图：分享对话框一张、长图结果一张；registry 的 `icon` 字段只收 GitHub 托管的位图。
