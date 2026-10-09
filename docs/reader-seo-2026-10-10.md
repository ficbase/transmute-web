# 在线阅读功能 SEO · 2026-10-10

本次为已上线的 TXT / EPUB 在线阅读功能补充搜索内容，保留工具优先的首页布局。

- 新增 `/online-reader.html` 和 `/zh/online-reader.html`，覆盖在线 EPUB 阅读、TXT 阅读、章节导航、主题与字号、续读、中文编码和格式限制。两个语言版本均提供完整静态正文、独立标题与描述、单一 H1、目录、面包屑及 Article 数据。
- 更新首页搜索标题、摘要和分享信息，增加阅读介绍入口与直接阅读的常见问题；指南中心和原有 TXT 转 EPUB、EPUB 转 TXT、章节指南链接到阅读介绍。
- WebApplication 数据补充真实功能列表、语言及阅读帮助链接；语言切换同步内容、规范网址、内链与结构化信息。没有添加虚构评分或承诺富媒体搜索展示。
- sitemap.xml 从 22 增至 24 个规范网址；sitemap-zh.xml 和 baidu-urls.txt 从 11 增至 12 个中文网址。沿用已验证的域名与站点地图地址。本次没有通过账户界面提交新的单页索引请求，不把文件更新表述为收录完成。

验证：6 项打包测试通过；检查全部 24 个静态页面和内部链接；阅读介绍在禁用 JavaScript 的 320、390、1440 像素页面上正文和目录完整、无横向溢出；语言切换正确。中英文首页在 5 种笔记本/手机尺寸下完成 TXT → EPUB → TXT 下载，选择文件前隐藏导出、选择后首屏按钮及移除文件重置行为保持正常。

内容以实际实现为依据：搜索限于章节名称，重新选择同一文件才能续读，没有在线书架或跨设备同步，不支持 DRM 解密。更新指南中旧的“没有固定文件大小限制”说明，与现有 50 MiB 文件上限一致。

搜索内容写作依据：[Google 实用内容指南](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)。应用结构化信息不等于获得富媒体展示；不能为满足搜索展示要求而虚构评分，参见 [Google 软件应用文档](https://developers.google.com/search/docs/appearance/structured-data/software-app)。
