# EpuBloom · TXT ↔ EPUB converter

基于 [transmute](https://github.com/ficbase/transmute) 的纯浏览器端 txt↔epub 转换网站，通过 WebAssembly 运行，文件不会上传到服务器。

**正式网站**: https://epubloom.com/

## 功能

- **txt → epub**: 自动检测章节（中英文编号）、提取标题/作者、可编辑元数据（书名/作者/语言/简介/出版社/标识符/日期/版权/标签）、可选自定义封面
- **epub → txt**: 还原纯文本，保留段落分行和全角空格缩进
- **自动编码检测**: BOM → UTF-8 严格验证 → GB18030 严格解码，兼容旧版中文 txt
- **纯本地处理**: WASM 在浏览器内运行，文件不上传

## 界面与语言

正式网站 `/` 默认英语，`/zh/` 使用简体中文；明确的语言网址优先于浏览器中保存的偏好。语言选择保存在 localStorage，用于无语言标记的源码预览；存储被禁用时仍可在当前页面切换。切换语言不会清除所选文件、封面、转换结果或已编辑的书籍信息。书籍语言与界面语言独立设置。

页面文案、标题、描述、按钮和状态提示统一维护在 `i18n.js`。HTML 保留默认英文正文，让说明页面在 JavaScript 不可用时也能阅读。`converter.js` 管理转换交互，`site.css` 提供所有页面的响应式样式。英文示例位于 `examples/sample-en.txt`，中文示例位于 `examples/sample.txt`。

封面区提供即时预览、更换与移除操作。选择图片后，在浏览器内生成 1200 × 1800（2:3）的 JPEG 封面；默认完整保留画面，并用原图补齐背景，也可选“铺满封面”居中裁剪。预览与 EPUB 内嵌封面使用同一份图片，不拉伸正文画面。更换封面会清除旧的 EPUB 下载结果，需要重新转换；损坏图片不会替换已选的有效封面。

上传封面后，可开启“加入书名和作者”，使用书籍信息中的文字，并选择预设色或输入六位颜色值。点击封面打开大图编辑器，可分别拖动书名、作者，拖动右下角调整大小，也可使用字号滑杆或方向键微调。文字自动换行、适应长书名，位置受限于封面内；可一键重置排版和颜色。调整实时预览并自动保存到本次转换，关闭文字开关恢复原图，再开启会保留排版。预览与 EPUB 使用相同绘制逻辑，导出的 JPEG 不包含编辑框。

导出文件名默认跟随书籍信息中的书名，无书名时使用原文件名；手动修改后不再被书名更新覆盖，清空可恢复自动命名。自动补齐 EPUB / TXT 后缀；编码转换副本沿用该名称，并加目标编码后缀。转换完成后仍可修改下载名称，无需重新转换。

TXT 支持识别前 20 行中的 `Title:` / `Author:` 和中文《书名》/作者标记。EPUB 转 TXT 时，书名、作者前缀和默认章节名按书籍语言确定，界面切换不会翻译正文。

选择 TXT 后，“转换为 EPUB”下方显示当前编码、目标编码选择器和“转换编码”按钮。可下载 UTF-8、GBK、GB18030、带 BOM 的 UTF-16 LE / BE 副本，保留文字与换行，不改原文件或已有 EPUB 结果。读取时优先识别 UTF-8 / UTF-16 BOM，其次严格验证 UTF-8，最后严格尝试 GB18030；无 BOM 的 GBK / GB2312 / GB18030 文件无法可靠细分，界面标为“GBK / GB18030（推测）”。无效输入或目标编码无法表示的字符会报错，不静默替换字符；下载后仍应核对正文。

## 本地开发

```bash
# 安装 wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# 构建 WASM
wasm-pack build --target web --locked

# 生成仅包含公开页面、示例与 WASM 的发布目录
python3 scripts/prepare-site.py

# 本地预览
python3 -m http.server -d dist 8080
# 访问 http://localhost:8080
```

## 部署

正式网站运行在独立服务器上。现有 GitHub Actions 会检查构建和中英文转换测试，并继续发布 GitHub Pages 预览；它不会自动更新独立服务器。服务器发布时，用 `SITE_URL=https://epubloom.com/` 生成 `dist/`，把完整目录放入新的发布目录，再切换网站目录。Nginx 与证书配置保留在服务器上。不要发布项目根目录或 `.key` 等连接信息。

发布脚本为样式、脚本、图标和 WASM 依赖生成内容版本号，避免浏览器把新页面与旧资源混用。更改页面或翻译后，也需要重新生成 `dist/`。

PR 会检查构建；推送至 main 分支后 GitHub Actions 自动构建 WASM，生成 `dist/` 并部署到 GitHub Pages。部署目录只包含公开页面、样式、示例、转换模块和搜索引擎文件，不发布 Rust 源码、构建缓存或项目文档。

网站包含转换器、使用指南、关于、联系与反馈、隐私说明。指南中的示例文字可以用于验证章节和中文处理。联系渠道为公开的 GitHub Issues，不应在反馈中提交私人文稿。

### 独立域名与 Cloudflare

默认 GitHub Pages 预览网址含 `/transmute-web/` 项目路径。用于广告运营时建议先确定独立域名，把网站部署到该域名根目录，便于管理所有权验证、`ads.txt` 和搜索收录。域名需要单独注册，不由本仓库购买。

这是纯静态 WASM 网站，可使用 [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) 托管。仓库提供 `wrangler.jsonc`，只发布 `dist/`，不需要后端 Worker 脚本。部署流程：

1. 在 Cloudflare 账号中准备域名及 DNS；没有域名时可先验证平台预览网址。
2. 先构建 WASM，再用实际网站地址生成发布目录：

   ```bash
   wasm-pack build --target web --locked
   SITE_URL=https://your-domain.example/ python3 scripts/prepare-site.py
   ```

   示例地址必须替换为实际域名。`SITE_URL` 决定 canonical、sitemap 和 robots 中的地址，不会自动绑定域名。

3. 按 [Cloudflare 部署说明](https://developers.cloudflare.com/workers/static-assets/get-started/) 安装 Wrangler 并登录自己的账号，运行 `npx wrangler deploy` 上传静态产物。首次生成目录时，应使用平台实际分配的网址；得到正式域名后重新生成并部署。
4. 在 Workers 设置里添加自己的 Custom Domain，检查 HTTPS、转换模块和页面可访问。只有实际部署到 Cloudflare 的版本才使用 Cloudflare 托管。
5. 在 Google Search Console 验证域名并提交 `/sitemap.xml`，检查收录和用户实际使用情况。

继续使用 GitHub Pages 也可以绑定自己的域名：先在仓库 Pages 设置中配置 Custom domain 与 DNS，再把仓库变量 `SITE_URL` 设置为正式 HTTPS 根地址。修改变量后重新运行部署工作流。GitHub Pages 用途受 [GitHub 服务条款](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#pages) 约束；用于广告运营前应确认用途符合平台要求。

### 搜索收录与内容维护

正式构建为 11 个页面生成英文版本与 `/zh/` 简体中文版本，共 22 个可独立访问的页面。正文在打包时写入 HTML，不需要搜索引擎执行语言切换；每页包含自己的 canonical、双向 hreflang（en / zh-Hans / x-default）、分享标题与描述，以及与可见内容一致的 JSON-LD。明确的英文与中文网址保持对应语言；切换时同步地址与内部链接，并保留当前文件和转换结果。

- 实用指南：`txt-to-epub.html`、`epub-to-txt.html`、`fix-text-encoding.html`、`gbk-to-utf8.html`、`epub-cover.html`、`txt-chapters.html`，从首页和完整指南链接进入。编码、封面与目录指南根据实际功能编写，目录指南提供可下载示例。
- 文章提供可见面包屑、正文目录与 EpuBloom 署名，结构化数据与正文一致。分享卡使用 1200 × 630 PNG，支持大图预览。
- GitHub Pages 预览构建设置 `SITE_NOINDEX=1`；正式服务器构建使用 `SITE_NOINDEX=0`。预览页面允许抓取以读取 noindex，正式站点保持可索引。
- 服务器配置参考 `deploy/nginx/epubloom.conf`：HTTP/www 与首页别名永久跳转、真实 404、CSS/JS/WASM 压缩及一小时缓存。页面需重新验证缓存；替换配置前备份并检查 Nginx 语法，保留其他站点和证书续期。
- `i18n.js` 顶部的 `messages` 保持标准 JSON 对象，打包脚本和浏览器共用这份文案。新增页面时同时更新 `PAGES`、浏览器 `pageNames`、中英文文案及内部链接。
- 所有页面使用完整、真实的功能说明，不填写虚构评分或评论。WebApplication 数据描述免费工具，并不保证获得 Google 富媒体结果。
- 在 Google Search Console 验证 `epubloom.com` 网域资源后，提交 `https://epubloom.com/sitemap.xml`。保留验证用 DNS TXT 记录。站点地图和提交收录请求均不保证索引或排名。
- 后续根据 Search Console 的真实展示、点击与搜索词完善内容；更改内容后重新打包并部署，避免只改浏览器文案而未更新静态页面。

本次发布及 Search Console 的实际检查结果见 [2026-10-09 SEO 发布记录](docs/seo-audit-2026-10-09.md)。

### Google AdSense 申请与接入

正式网站已配置 AdSense 连接代码，实际展示需等待网站审核通过及账号配置完成。补充说明页面不保证通过审核；Google 评估原创内容、使用体验及政策符合情况，见 [AdSense 资格要求](https://support.google.com/adsense/answer/9724) 和 [网站准备要求](https://support.google.com/adsense/answer/7299563)。应先确认真实文件转换可用、指南准确、正式域名和公开联系渠道正常。

1. 通过 [AdSense 官网](https://adsense.google.com/start/) 注册自己的账号，按真实身份、国家或地区与收款资料填写；在 Sites 中添加正式网站。
2. 获取账号的发布商 ID（`ca-pub-` 加 16 位数字）。这个 ID 是公开配置，不是密码。
3. 用真实根域名和真实 ID 重新打包：

   ```bash
   SITE_URL=https://your-domain.example/ ADSENSE_PUBLISHER_ID=ca-pub-1234567890123456 python3 scripts/prepare-site.py
   ```

   上面的域名和 ID 仅为格式示例，必须替换。配置发布商 ID 后，脚本在所有页面的 `<head>` 中加入 AdSense 异步脚本与 `google-adsense-account` 元标签，并生成 `dist/ads.txt`；未配置 ID 的构建不加载 AdSense。若使用 GitHub Pages，可设置同名仓库变量后重新部署。仅放在 `/transmute-web/ads.txt` 的文件不满足根目录要求，因此带路径的 `SITE_URL` 配合发布商 ID 会被拒绝。

4. 部署后检查 `https://正式域名/ads.txt` 以及页面源码里的发布商 ID，在 AdSense 后台验证并提交审核。参考 [连接网站说明](https://support.google.com/adsense/answer/7584263)；网站状态为 Ready 后才能展示广告。
5. 隐私说明已披露 AdSense、广告 Cookie 及退出方式；实际展示前应按后台配置确认同意管理入口。参考 [Google 隐私披露要求](https://support.google.com/adsense/answer/1348695)。面向 EEA、英国和瑞士用户投放个性化广告，需要 [Google 认证的 CMP](https://support.google.com/adsense/answer/13554116)，可在 AdSense 的 Privacy & messaging 中配置。
6. 连接脚本已支持自动注入。完成实际账号和同意管理配置后，在 AdSense 后台配置自动广告或添加广告位。首次可在指南正文后设置一个清晰标明「广告」的独立区域；转换、文件选择、下载按钮附近应留足距离。不要用广告模拟下载按钮或引导用户点击广告，见 [AdSense 政策](https://support.google.com/adsense/answer/48182)。

发布商 ID 通过构建环境变量配置，GitHub Actions 使用同名仓库变量。服务器手动部署时也必须提供该变量，避免下一次发布丢失连接代码。本仓库不会代替用户提交 AdSense 申请或填写付款资料。收入取决于真实流量、访客地区、广告需求等因素；接入代码和审核通过均不保证收入。

## 许可

MIT
