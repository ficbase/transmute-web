# transmute-web · txt ↔ epub 在线转换器

基于 [transmute](https://github.com/ficbase/transmute) 的纯浏览器端 txt↔epub 转换网站，通过 WebAssembly 运行，文件不会上传到服务器。

## 使用

访问网站后，拖放或选择一个 .txt 或 .epub 文件，点击转换，然后下载结果。

- **txt → epub**: 自动检测章节（支持中英文编号）、提取标题/作者、可选自定义封面
- **epub → txt**: 还原纯文本，保留章节结构

## 本地开发

```bash
# 安装 wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# 构建 WASM
wasm-pack build --target web

# 本地预览
python3 -m http.server -d . 8080
# 访问 http://localhost:8080
```

## 部署

构建后把以下文件上传到任意静态托管：

- `index.html`
- `pkg/` 目录

推荐：GitHub Pages。

## 许可

MIT
