# transmute-web · txt ↔ epub 在线转换器

基于 [transmute](https://github.com/ficbase/transmute) 的纯浏览器端 txt↔epub 转换网站，通过 WebAssembly 运行，文件不会上传到服务器。

**网址**: https://ficbase.github.io/transmute-web/

## 功能

- **txt → epub**: 自动检测章节（中英文编号）、提取标题/作者、可编辑元数据（书名/作者/语言/简介/出版社/标识符/日期/版权/标签）、可选自定义封面
- **epub → txt**: 还原纯文本，保留段落分行和全角空格缩进
- **自动编码检测**: BOM → UTF-8 验证 → GBK 回退，兼容旧版中文 txt
- **纯本地处理**: WASM 在浏览器内运行，文件不上传

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

推送至 main 分支后 GitHub Actions 自动构建 WASM 并部署到 GitHub Pages。

## 许可

MIT
