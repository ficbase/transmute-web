// Page translations contain only trusted, static markup authored with the site.
const messages = {
  "en": {
    "home.title": "Free TXT to EPUB & EPUB to TXT Converter | EpuBloom",
    "home.description": "Convert TXT to EPUB with a cover and table of contents, or extract EPUB to TXT. Free online converter. Your book files are processed in your browser.",
    "upload.label": "Choose a TXT or EPUB file",
    "file.remove": "Remove selected file",
    "cover.remove": "Remove cover image",
    "cover.label": "Choose a cover image",
    "field.title": "Book title",
    "placeholder.title": "Detected when available",
    "field.author": "Author",
    "placeholder.author": "Author name",
    "field.language": "Book language",
    "placeholder.language": "en, zh, fr…",
    "field.publisher": "Publisher",
    "placeholder.publisher": "Optional",
    "field.date": "Publication date",
    "placeholder.date": "YYYY-MM-DD",
    "field.identifier": "Identifier",
    "placeholder.identifier": "ISBN or your own identifier",
    "field.rights": "Rights",
    "placeholder.rights": "Copyright statement",
    "field.description": "Description",
    "placeholder.description": "A few words about this book",
    "field.subjects": "Subjects",
    "placeholder.subjects": "Fiction, travel, notes…",
    "nav.converter": "Converter",
    "nav.guide": "Guide",
    "nav.about": "About",
    "language.label": "Website language",
    "nav.label": "Main navigation",
    "skip": "Skip to content",
    "hero.eyebrow": "FREE ONLINE TXT & EPUB CONVERTER",
    "hero.title": "TXT to EPUB<br><em>and back again.</em>",
    "hero.description": "Convert TXT to EPUB with chapters and a cover, or extract EPUB to TXT for editing. Free, with no account needed. Your book files are processed in your browser.",
    "hero.private": "Your files stay yours",
    "hero.signup": "No account needed",
    "art.caption": "Good words deserve a good home.",
    "converter.eyebrow": "THE CONVERTER",
    "converter.title": "Start with your file",
    "upload.title": "Drop a TXT or EPUB file here",
    "upload.or": "or choose one from your device",
    "upload.browse": "Choose a file",
    "cover.title": "Book cover",
    "cover.hint": "Preview your cover, automatically fitted to a 2:3 book format.",
    "cover.preview": "Cover preview",
    "cover.choose": "Choose image",
    "cover.change": "Change image",
    "cover.processing": "Preparing cover…",
    "cover.fit": "Cover image fit",
    "cover.contain": "Keep full image",
    "cover.crop": "Fill cover",
    "cover.readyContain": "1200 × 1800 · Full image with a matching background",
    "cover.readyCrop": "1200 × 1800 · Center cropped to fill",
    "status.coverSize": "Please choose a cover image smaller than 20 MB.",
    "status.coverInvalid": "This image could not be opened or is too large. Try a JPG, PNG or WebP under 40 megapixels.",
    "cover.badge": "Cover",
    "metadata.title": "Book details",
    "metadata.optional": "Optional",
    "metadata.languageHint": "Book language describes the text, independently of the website language.",
    "converter.private": "Converted on your device. Never uploaded.",
    "steps.eyebrow": "A FEW EASY STEPS",
    "steps.title": "Less fuss. More reading.",
    "steps.one.title": "Bring your words",
    "steps.one.body": "Pick a TXT or EPUB. We’ll find the right direction.",
    "steps.two.title": "Make it yours",
    "steps.two.body": "Creating an EPUB? Add a title, author, and cover.",
    "steps.three.title": "Take it with you",
    "steps.three.body": "Download your file, open it, and keep the original.",
    "sample.eyebrow": "JUST EXPLORING?",
    "sample.title": "Try a little story.",
    "sample.body": "Our sample text is a good place to start.",
    "sample.download": "Download sample TXT",
    "feature.chapters.title": "Chapters, neatly in place",
    "feature.chapters.body": "Turn chapter headings into an EPUB table of contents, ready for your reader.",
    "feature.details.title": "Your book, your details",
    "feature.details.body": "A title, a cover, a few finishing touches. Make your ebook feel like your own.",
    "feature.privacy.title": "A more private workspace",
    "feature.privacy.body": "Files are processed in your browser. No upload, no account, no file library.",
    "faq.eyebrow": "GOOD TO KNOW",
    "faq.title": "Before you turn the page.",
    "faq.guide": "Read the full guide",
    "faq.upload.question": "Does my file leave my device?",
    "faq.upload.answer": "No. Your text, ebook, and cover are read and converted in your browser. The site still needs a connection to load its pages and converter.",
    "faq.epub.question": "What changes when I convert an EPUB to TXT?",
    "faq.epub.answer": "You get the readable text. Images, fonts, links, and page layouts aren’t preserved. Image-only and DRM-protected books aren’t supported.",
    "faq.check.question": "Should I check the result?",
    "faq.check.answer": "Yes. Open the result in your text editor or ebook reader, check the chapter order and content, and keep your original file.",
    "nav.contact": "Contact",
    "nav.privacy": "Privacy",
    "footer.tagline": "A little less formatting. A little more reading.",
    "footer.powered": "Built with",
    "footer.local": "Made to stay on your device",
    "about.purpose.title": "A quieter way to work with words.",
    "about.purpose.body": "EpuBloom is a free TXT and EPUB converter maintained by ficbase. It brings the open-source <a href=\"https://github.com/ficbase/transmute\">Transmute</a> project to your browser, so you can turn your writing into an ebook or extract editable text from an EPUB.",
    "about.use.body": "Start with your own writing, notes, or text you have permission to use. Add book details and a cover, then download the result. The <a href=\"guide.html\">guide</a> explains chapter detection, encodings, and the limits of conversion.",
    "about.local.title": "Your files stay on your device.",
    "about.local.body": "The converter is written in Rust and runs as WebAssembly in your browser. Your text, ebook, and cover aren’t sent to a conversion server. Loading the website and converter still creates ordinary web requests.",
    "about.limits.title": "A format converter, with a clear purpose.",
    "about.limits.body": "EpuBloom doesn’t host a book library, remove DRM, or recognize text in images. EPUBs made by different tools may extract differently. Keep your original and check the result, especially when completeness matters.",
    "about.open.title": "Open source, open to feedback.",
    "about.open.body": "Explore the code at <a href=\"https://github.com/ficbase/transmute-web\">ficbase/transmute-web</a>, or visit <a href=\"contact.html\">Contact</a> to report a problem. Our <a href=\"privacy.html\">privacy notice</a> explains file handling, access logs, and language preferences.",
    "about.title": "About EpuBloom — Free Browser-Based Ebook Converter",
    "about.description": "Learn about EpuBloom, the free browser-based TXT and EPUB converter maintained by ficbase.",
    "about.eyebrow": "ABOUT EPUBLOOM",
    "about.heading": "Made for your next read.",
    "contact.channel.title": "Talk to us on GitHub.",
    "contact.channel.body": "EpuBloom is maintained by ficbase. Our public contact channel is <a href=\"https://github.com/ficbase/transmute-web/issues\">GitHub Issues</a>. Search existing reports, or sign in to GitHub and <a href=\"https://github.com/ficbase/transmute-web/issues/new\">open a new issue</a>.",
    "contact.include.title": "A useful report includes…",
    "contact.include.list": "<li>The conversion direction: TXT to EPUB, or EPUB to TXT.</li><li>Your browser version, device operating system, and approximate file size.</li><li>The error message, or what you expected and what actually happened.</li><li>A short example you may share publicly, and the original encoding if known.</li>",
    "contact.public.body": "Issues are public. Please use a small example you wrote yourself, rather than private drafts, complete copyrighted books, account details, or screenshots with personal information.",
    "contact.other.title": "Questions, privacy, or a better idea?",
    "contact.other.body": "Use the same channel for questions about this site, its privacy notice, or improvements you’d like to see. Maintainers can follow up in the issue. We don’t promise a fixed response time.",
    "contact.links": "You may find an answer in the <a href=\"guide.html\">guide and FAQ</a>. Ready to continue? <a href=\"index.html\">Return to the converter</a>.",
    "contact.title": "Contact & Support | EpuBloom",
    "contact.description": "Report conversion problems, ask a question, or share an idea with EpuBloom through GitHub Issues.",
    "contact.eyebrow": "CONTACT & FEEDBACK",
    "contact.heading": "A little help, when you need it.",
    "privacy.updated": "Last updated: October 9, 2026",
    "privacy.files.title": "Your files and book details",
    "privacy.files.body": "Selected TXT files, EPUBs, and cover images are read and converted in your browser. The site doesn’t upload their contents, book titles, authors, or other book details to our server. There is no online account or library for storing your files.",
    "privacy.download.body": "Results remain in browser memory until you download them to your device. We don’t persist your selected files or book details in cookies, localStorage, or IndexedDB. Reloading or leaving the page requires you to select a file again. You control the files you download.",
    "privacy.language.title": "Your language preference",
    "privacy.language.body": "When you choose English or Simplified Chinese, we save that preference in this browser’s localStorage so it applies on your next visit and across the site. No file contents are included. You can clear the preference by clearing this site’s browser data. If storage is unavailable, switching languages still works for the current page.",
    "privacy.hosting.title": "Website requests and access logs",
    "privacy.hosting.body": "Local conversion still requires ordinary requests to load pages, styles, scripts, and WebAssembly. The public site at epubloom.com runs on a server managed by ficbase. Its web access logs may record IP addresses, request times, browser information, paths, and referrers. These requests don’t include the selected book or cover contents.",
    "privacy.ads.title": "Cookies, analytics, and advertising",
    "privacy.ads.current": "The public site at epubloom.com loads Google AdSense code to connect this website to our publisher account and support advertising after approval. Requests to Google may include your IP address, browser information, and the page URL. We don’t send your selected files or book details to AdSense. We don’t use a separate analytics service.",
    "privacy.ads.future": "Google and other third-party advertising vendors may use cookies or similar identifiers to serve and measure ads based on your visits to this and other websites, including personalized ads. You can opt out of personalized advertising using the links below. Where consent is required, advertising must follow your consent choices; the site’s language preference is stored separately from advertising cookies.",
    "privacy.ads.controls": "Manage personalized advertising in <a href=\"https://myadcenter.google.com/\">Google My Ad Center</a>. You can also explore <a href=\"https://www.aboutads.info/choices/\">AboutAds choices</a> and <a href=\"https://policies.google.com/technologies/ads\">Google’s advertising information</a>.",
    "privacy.external.title": "External links and public feedback",
    "privacy.external.body": "Links to GitHub and other websites lead to services with their own privacy policies. Feedback submitted through GitHub Issues is public. See the <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\">GitHub privacy statement</a> for information about that service.",
    "privacy.contact.title": "Questions and updates",
    "privacy.contact.body": "Please use our <a href=\"contact.html\">contact channel</a> for questions about this notice or data handling. We’ll update this page and its date if hosting, language storage, or advertising practices change.",
    "privacy.title": "Privacy Policy | EpuBloom",
    "privacy.description": "How EpuBloom handles files, language preferences, website access logs, and advertising.",
    "privacy.eyebrow": "PRIVACY NOTICE",
    "privacy.heading": "Your words stay yours.",
    "guide.txt.title": "TXT to EPUB: give your text a home.",
    "guide.txt.intro": "TXT keeps things simple. EPUB adds book details, a cover, and a navigable table of contents in one file. Use EpuBloom for your own writing, notes, or text you have permission to use. It won’t proofread or repair mistakes in the source.",
    "guide.txt.steps": "<li>Choose or drop a .txt file in the converter. The extension determines the conversion direction.</li><li>Expand “Book details” and check the title and author. The first 20 lines are checked for Title: and Author: headers, as well as Chinese title and author markers. You can edit the fields yourself.</li><li>Set the book’s language code, such as en or zh. Website language and book language are separate. Other optional fields include description, publisher, identifier, date, rights, and subjects.</li><li>Add a cover if you’d like. JPEG and PNG are good choices for reader compatibility. Without an image, a simple SVG cover is generated from the title and author.</li><li>Convert to EPUB and download. Open it in your reader and check the chapters, text, cover, and book details. Keep the original TXT.</li>",
    "guide.chapters.title": "Make chapter headings easy to spot.",
    "guide.chapters.body": "Put each heading on its own line. Lines beginning with “Chapter ”, “CHAPTER ”, or “# ” are recognized, along with numbered Chinese chapter headings such as 第一章. For example:",
    "guide.example": "Title: The Little Journey\nAuthor: EpuBloom\n\nChapter 1 — A quiet morning\nThe notebook was still empty.\nThere was a whole day to fill it.\n\nChapter 2 — Along the river\nA little wandering brought a fresh perspective.",
    "guide.chapters.note": "If the table of contents doesn’t look right, check that headings are on separate lines and match one of these patterns. Text with no recognized heading uses a default chapter. Introductory text may become part of the first chapter, so check the result.",
    "guide.sample": "<a href=\"examples/sample-en.txt\" data-sample-link download>Download a sample TXT</a> and try the whole process before converting a long manuscript.",
    "guide.encoding.title": "When text looks garbled.",
    "guide.encoding.body": "The converter checks BOM markers for UTF-8, UTF-16LE, and UTF-16BE. Without a BOM, it tries valid UTF-8 first, then GBK. This can’t cover every legacy encoding. If text looks wrong, check the original in a text editor, save a copy as UTF-8, and select it again. Conversion can’t restore characters already lost through an incorrect save.",
    "guide.epub.title": "EPUB to TXT: back to the words.",
    "guide.epub.body": "Choose an EPUB, convert to TXT, and download its readable title, author, headings, and text. Plain text doesn’t preserve images, fonts, links, tables, or page layouts. Use it for editing and organizing words, rather than as a faithful ebook backup.",
    "guide.epub.limits": "EPUB structures vary. Books from different tools may have missing text, unusual entity characters, or unexpected chapter ordering. Image-only pages aren’t recognized as text. There’s no OCR or DRM removal. Compare with the original chapter by chapter when completeness matters.",
    "guide.faq.title": "A few common questions.",
    "guide.private.title": "Are files uploaded?",
    "guide.private.body": "No. The converter runs locally in your browser using WebAssembly. Ordinary website requests are still handled by the server; see the <a href=\"privacy.html\">privacy notice</a>.",
    "guide.large.title": "Why does a large file slow the page down?",
    "guide.large.body": "Reading, parsing, and creating a file use your device’s memory. The page may pause during conversion. Start small and close unneeded tabs before working on a long text. There’s no guaranteed file-size limit; capacity depends on your browser, device, and content.",
    "guide.loading.title": "What if the converter doesn’t load?",
    "guide.loading.body": "Use a modern browser with WebAssembly support, check your connection, and refresh. The first visit needs to download the converter. If resources are blocked or the network is unavailable, it can’t start. If the problem continues, <a href=\"contact.html\">send a report</a> with the browser version and error message.",
    "guide.check.title": "How do I check the download?",
    "guide.check.body": "Open TXT in a text editor to check characters, paragraph breaks, and chapter order. Open EPUB in the reader you actually use to check its cover, contents links, and text. Keep the original and the converted file separately.",
    "guide.back": "<a href=\"index.html\">Back to the converter ↗</a>",
    "guide.title": "TXT & EPUB Conversion Guide: Chapters, Covers & Encoding | EpuBloom",
    "guide.description": "How to convert TXT and EPUB, prepare chapter headings, edit book details, and troubleshoot encoding or file problems.",
    "guide.eyebrow": "GUIDE & FAQ",
    "guide.heading": "TXT & EPUB conversion guide.",
    "action.choose": "Choose a file to start",
    "action.epub": "Convert to EPUB",
    "action.txt": "Convert to TXT",
    "action.converting": "Converting your file…",
    "action.download": "Download your file",
    "encoding.current": "Current TXT encoding",
    "encoding.target": "Convert to",
    "encoding.detecting": "Detecting…",
    "encoding.unknown": "Not recognized",
    "encoding.legacy": "GBK / GB18030 (estimated)",
    "status.encodingLoss": "Some characters cannot be saved as {encoding}. Choose UTF-8 or GB18030 instead. No copy was downloaded.",
    "action.encoding": "Convert encoding",
    "action.encodingConverting": "Converting encoding…",
    "encoding.hint": "Download a separate TXT copy. The original stays unchanged.",
    "status.encodingConverting": "Converting the TXT encoding on your device…",
    "status.encodingSuccess": "TXT copy downloaded: {name}",
    "status.encodingInvalid": "This TXT could not be read as UTF-8, BOM-marked UTF-16, or GBK/GB18030. Check the original encoding; no copy was downloaded.",
    "status.loading": "Getting the converter ready…",
    "status.unsupported": "Please choose a .txt or .epub file.",
    "status.coverType": "Please choose an image for the cover.",
    "status.converting": "Giving your words a new home…",
    "status.success": "All done. Your file is ready to download.",
    "status.failed": "We couldn’t convert this file. Please check the original and try again.",
    "status.error": "Conversion failed: {message}",
    "status.epubInvalid": "This EPUB couldn’t be read. Check that it is a valid, unencrypted ebook.",
    "status.loadFailed": "The converter couldn’t load. Check your connection and refresh the page.",
    "brand.home": "EpuBloom home",
    "nav.footer": "Footer navigation",
    "section.converter": "File converter",
    "section.features": "Features",
    "guides.title": "Make the most of your next conversion.",
    "guides.eyebrow": "PRACTICAL CONVERSION GUIDES",
    "guides.txt.title": "TXT to EPUB",
    "guides.txt.body": "Prepare chapter headings, add book details, and build an ebook with a cover.",
    "guides.epub.title": "EPUB to TXT",
    "guides.epub.body": "Extract editable text and understand what changes when formatting is removed.",
    "guides.encoding.title": "Fix garbled text",
    "guides.encoding.body": "Check UTF-8, UTF-16, and GBK text before turning it into an ebook.",
    "guides.read": "Read the guide ↗",
    "article.eyebrow": "THE READING ROOM",
    "article.back": "All conversion guides ↗",
    "article.txt.title": "How to Convert TXT to EPUB with Chapters & a Cover | EpuBloom",
    "article.txt.description": "Turn a text file into an EPUB ebook in your browser. Learn how to format chapter headings, set a title and author, add a cover, and check your ebook.",
    "article.txt.heading": "How to convert TXT to EPUB.",
    "article.txt.action": "Convert a TXT file ↗",
    "article.txt.body": "<p class=\"note\">For your own writing, notes, and text you have permission to convert. No account or file upload is needed.</p>\n<p>A TXT file contains plain text. An EPUB adds book information, navigation, and a cover so the same writing is easier to read in an ebook reader. EpuBloom creates EPUB 3.3 files in your browser.</p>\n<h2>1. Prepare a readable text file</h2><p>Open the original in a text editor first. If letters look wrong, follow the <a href=\"fix-text-encoding.html\">text encoding guide</a> before converting. UTF-8 is a useful format for a new copy.</p>\n<p>Put the title and author near the top. EpuBloom checks the first 20 lines for these English headers (case-insensitive), as well as Chinese title and author markers:</p>\n<pre>Title: The Little Journey\nAuthor: EpuBloom\n\nChapter 1 — A quiet morning\nThe notebook was still empty.\n\nChapter 2 — Along the river\nA little wandering brought a fresh perspective.</pre>\n<h2>2. Put chapter headings on separate lines</h2><p>Headings starting with <code>Chapter </code>, <code>CHAPTER </code>, or <code># </code> are recognized, along with numbered Chinese headings such as 第一章. Avoid using these patterns for ordinary body text.</p><p>Recognized headings become table-of-contents entries. If there are no headings, the text goes into a default chapter. Title lines and introductions may remain in the body, so check the opening pages.</p>\n<h2>3. Choose your TXT and check book details</h2><p>Open the <a href=\"index.html#converter\">converter</a> and select the .txt file. Expand “Book details” to edit the detected title and author. Set the book language to <code>en</code> for English or <code>zh</code> for Chinese. This describes the book, independently of the website’s language switch.</p><p>You can also enter a description, publisher, identifier, publication date, rights statement, and subjects. These are optional; an identifier does not need to be an ISBN.</p>\n<h2>4. Add a cover and download</h2><p>Choose a cover image if you have one. JPEG or PNG is a practical choice for reader compatibility. Without a cover, EpuBloom generates a simple SVG cover from the title and author.</p><p>Click “Convert to EPUB,” then download the result. Open it in your intended reader and check the cover, table of contents, chapter order, and text. Keep the source TXT: conversion does not proofread your writing or guarantee identical layout in every reader.</p>\n<h2>Try it with a short sample</h2><p><a href=\"examples/sample-en.txt\" data-sample-link download>Download our sample TXT</a> before converting a long manuscript. If you need to get text back out of an ebook, see <a href=\"epub-to-txt.html\">EPUB to TXT</a>. The <a href=\"guide.html\">full guide</a> covers file size, browser requirements, and common problems.</p>",
    "article.epub.title": "How to Convert EPUB to TXT: Extract Editable Ebook Text | EpuBloom",
    "article.epub.description": "Extract readable text from an EPUB in your browser. Learn what TXT preserves, what formatting is lost, and how to check chapters, DRM, and image-only books.",
    "article.epub.heading": "How to convert EPUB to TXT.",
    "article.epub.action": "Convert an EPUB file ↗",
    "article.epub.body": "<p class=\"note\">Use an EPUB you own or have permission to process. EpuBloom does not remove DRM or recognize text inside images.</p>\n<p>EPUB bundles text, images, navigation, and styling into an ebook. TXT is useful when you need editable words in a text editor. Extracting text is a change of format: it is not a complete backup of the ebook.</p>\n<h2>Convert an EPUB in three steps</h2><ol><li>Open the <a href=\"index.html#converter\">converter</a> and select a file ending in .epub.</li><li>Click “Convert to TXT.” The ebook is read and processed in your browser.</li><li>Download the .txt file and open it in a text editor. Keep the original EPUB.</li></ol><p>The tool uses the file extension to choose the direction. There is no need to edit the book-details form when extracting text.</p>\n<h2>What the TXT result contains</h2><p>The result includes the readable book title, author, chapter headings, and body text that the parser can extract. For an English-language EPUB, title and author headers use <code>Title:</code> and <code>Author:</code>. Books whose language metadata begins with <code>zh</code> use Chinese header formatting.</p>\n<pre>Title: The Little Journey\nAuthor: EpuBloom\n\nChapter 1 — A quiet morning\nThe notebook was still empty.</pre>\n<h2>What plain text leaves behind</h2><ul><li>Cover images, illustrations, and other pictures.</li><li>Fonts, colors, margins, and page layouts.</li><li>Clickable links and a navigable table of contents.</li><li>Table layout and other visual relationships.</li></ul><p>Line breaks and extracted reading order can vary with the EPUB’s structure. Compare important passages and chapter order against the original instead of assuming every element has been preserved.</p>\n<h2>If conversion fails or text is missing</h2><p>A DRM-protected ebook may not be readable by this tool. Image-only pages contain no ordinary text to extract, and this converter does not provide OCR. A damaged or unsupported EPUB structure can also cause errors or missing content.</p><p>Check that the original opens in an ebook reader. If it does but conversion still fails, report the browser version and error through <a href=\"contact.html\">support</a>. Don’t post a private or copyrighted ebook in a public issue.</p>\n<h2>Can I turn the TXT back into an EPUB?</h2><p>Yes. Follow the <a href=\"txt-to-epub.html\">TXT to EPUB guide</a> to prepare chapter headings, book details, and a new cover. This creates a new ebook; the original images and layout cannot be recovered from the text alone.</p>",
    "article.encoding.title": "Fix Garbled TXT Before EPUB Conversion: UTF-8, UTF-16 & GBK | EpuBloom",
    "article.encoding.description": "Troubleshoot unreadable TXT files before EPUB conversion. Understand UTF-8, UTF-16, and GBK detection, preserve the original, and save a readable UTF-8 copy.",
    "article.encoding.heading": "Fix garbled text before converting.",
    "article.encoding.action": "Open the converter ↗",
    "article.encoding.body": "<p class=\"note\">Keep an untouched copy of the original file. Repeatedly saving unreadable text can permanently lose characters.</p>\n<p>A text file stores bytes. An encoding tells your editor how to turn those bytes into letters. If a file written with one encoding is read using another, you may see nonsense characters or replacement symbols such as �.</p>\n<h2>How EpuBloom reads a TXT file</h2><ol><li>If the file has a byte-order mark (BOM), the converter recognizes UTF-8, UTF-16LE, or UTF-16BE.</li><li>Without a BOM, it checks whether the bytes are valid UTF-8.</li><li>If that check fails, it tries GBK, which is used by some older Chinese text files.</li></ol><p>This is a fallback sequence, not a guarantee that every encoding can be detected. Other legacy encodings and UTF-16 files without a BOM may need to be opened and resaved in an editor first.</p>\n<h2>Make a readable UTF-8 copy</h2><ol><li>Open the original TXT in a text editor that lets you choose the encoding used to read a file.</li><li>If it looks wrong, reopen the untouched original with the likely source encoding. Older Chinese TXT files may use GBK; use the source application’s information when available.</li><li>Check several paragraphs, punctuation marks, and chapter headings. Make sure the text is readable before saving.</li><li>Use “Save As” or the editor’s encoding controls to save a separate UTF-8 copy.</li><li>Select the new copy in the <a href=\"index.html#converter\">converter</a>, create the EPUB, and inspect it in a reader.</li></ol>\n<h2>Reopen and convert are different operations</h2><p>Reopening with an encoding changes how existing bytes are interpreted. Saving as UTF-8 writes the characters currently shown by the editor into a new file. Saving an already garbled display as UTF-8 can preserve the damage rather than fix it.</p><p>If the only available copy already contains lost characters or replacement symbols, changing the encoding cannot reliably restore the original. Look for a backup or obtain a fresh source file.</p>\n<h2>When the text is readable but the ebook looks wrong</h2><p>If characters are correct but chapters are missing from the contents, check the <a href=\"txt-to-epub.html\">chapter-heading formats</a>. If you extracted an EPUB and lost images or table layout, those are <a href=\"epub-to-txt.html\">plain-text conversion limits</a>, rather than necessarily an encoding problem.</p><p>For help, describe the source encoding, browser, and visible error through <a href=\"contact.html\">support</a>. A short non-private example is more useful than sharing a full personal manuscript.</p>"
  },
  "zh": {
    "home.title": "TXT 转 EPUB / EPUB 转 TXT 在线转换器 | EpuBloom",
    "home.description": "免费在线将 TXT 转成带封面和目录的 EPUB，或从 EPUB 提取 TXT。文件在浏览器本地处理，无需上传书籍或注册账号。",
    "upload.label": "选择 TXT 或 EPUB 文件",
    "file.remove": "移除所选文件",
    "cover.remove": "移除封面图片",
    "cover.label": "选择封面图片",
    "field.title": "书名",
    "placeholder.title": "自动识别，或手动填写",
    "field.author": "作者",
    "placeholder.author": "作者姓名",
    "field.language": "书籍语言",
    "placeholder.language": "en、zh、fr…",
    "field.publisher": "出版社",
    "placeholder.publisher": "选填",
    "field.date": "出版日期",
    "placeholder.date": "YYYY-MM-DD",
    "field.identifier": "标识符",
    "placeholder.identifier": "ISBN 或自定义标识符",
    "field.rights": "版权",
    "placeholder.rights": "版权声明",
    "field.description": "简介",
    "placeholder.description": "简单介绍这本书",
    "field.subjects": "标签",
    "placeholder.subjects": "小说、旅行、笔记……",
    "nav.converter": "转换器",
    "nav.guide": "指南",
    "nav.about": "关于",
    "language.label": "网站语言",
    "nav.label": "主导航",
    "skip": "跳到正文",
    "hero.eyebrow": "免费在线 TXT 与 EPUB 转换器",
    "hero.title": "TXT 转 EPUB<br><em>也能回到纯文字。</em>",
    "hero.description": "将 TXT 转为带章节与封面的 EPUB，或从 EPUB 提取 TXT 便于编辑。免费、无需注册，书籍文件在浏览器本地处理。",
    "hero.private": "文件留在你的设备",
    "hero.signup": "无需注册",
    "art.caption": "让好文字，有个好归宿。",
    "converter.eyebrow": "文件转换",
    "converter.title": "从一个文件开始",
    "upload.title": "把 TXT 或 EPUB 文件拖到这里",
    "upload.or": "或从你的设备中选择",
    "upload.browse": "选择文件",
    "cover.title": "书籍封面",
    "cover.hint": "即时预览，自动适配 2:3 竖版书籍比例。",
    "cover.preview": "封面预览",
    "cover.choose": "选择图片",
    "cover.change": "更换图片",
    "cover.processing": "正在整理封面……",
    "cover.fit": "封面图片适配方式",
    "cover.contain": "完整保留",
    "cover.crop": "铺满封面",
    "cover.readyContain": "1200 × 1800 · 保留完整画面，自动补背景",
    "cover.readyCrop": "1200 × 1800 · 居中裁剪，铺满封面",
    "status.coverSize": "请选择小于 20 MB 的封面图片。",
    "status.coverInvalid": "无法读取此图片，或图片尺寸过大。请尝试不超过 4000 万像素的 JPG、PNG 或 WebP。",
    "cover.badge": "封面",
    "metadata.title": "书籍信息",
    "metadata.optional": "选填",
    "metadata.languageHint": "书籍语言用于描述正文，与网站界面语言相互独立。",
    "converter.private": "在你的设备上转换，文件不会上传。",
    "steps.eyebrow": "简单三步",
    "steps.title": "少些繁琐，多些阅读。",
    "steps.one.title": "选择文字",
    "steps.one.body": "选择 TXT 或 EPUB，自动识别转换方向。",
    "steps.two.title": "整理书籍信息",
    "steps.two.body": "生成 EPUB 时，可以编辑书名、作者和封面。",
    "steps.three.title": "带走你的作品",
    "steps.three.body": "下载后打开检查，并保留原始文件。",
    "sample.eyebrow": "想先试试看？",
    "sample.title": "从一个小故事开始。",
    "sample.body": "用示例文字体验完整的转换过程。",
    "sample.download": "下载示例 TXT",
    "feature.chapters.title": "章节井然有序",
    "feature.chapters.body": "识别章节标题，整理成可在阅读器中跳转的 EPUB 目录。",
    "feature.details.title": "书籍信息，由你决定",
    "feature.details.body": "补上书名、作者和封面，让电子书呈现你的风格。",
    "feature.privacy.title": "更安心的转换空间",
    "feature.privacy.body": "文件在浏览器内处理，无需上传、注册，也不会建立在线文件库。",
    "faq.eyebrow": "使用小提示",
    "faq.title": "开始之前，了解这些。",
    "faq.guide": "阅读完整指南",
    "faq.upload.question": "文件会离开我的设备吗？",
    "faq.upload.answer": "不会。正文、电子书和封面都在浏览器中读取和转换；加载网页和转换模块仍需要网络连接。",
    "faq.epub.question": "EPUB 转成 TXT 会有什么变化？",
    "faq.epub.answer": "会提取可解析的文字，但不保留图片、字体、链接和页面布局。不支持纯图片书籍或 DRM 加密文件。",
    "faq.check.question": "转换后需要检查吗？",
    "faq.check.answer": "需要。请用文本编辑器或电子书阅读器检查章节顺序与正文，并保留原始文件。",
    "nav.contact": "联系",
    "nav.privacy": "隐私说明",
    "footer.tagline": "少一点格式整理，多一点阅读时光。",
    "footer.powered": "基于",
    "footer.local": "文件始终留在你的设备上",
    "about.purpose.title": "让文字整理与阅读更从容。",
    "about.purpose.body": "EpuBloom 是 ficbase 维护的免费 TXT 与 EPUB 转换工具，把开源 <a href=\"https://github.com/ficbase/transmute\">Transmute</a> 项目带到浏览器中。你可以把自己的写作整理成电子书，也可以从 EPUB 中提取便于编辑的文字。",
    "about.use.body": "你可以处理自己的写作、笔记，或已获许可的文字。补充书籍信息与封面后下载结果。<a href=\"guide.html\">使用指南</a>介绍了章节识别、编码和转换限制。",
    "about.local.title": "文件始终留在你的设备。",
    "about.local.body": "转换器使用 Rust 编写，通过 WebAssembly 在浏览器内运行。正文、电子书与封面不会发送给转换服务器；加载网页和转换模块仍会产生常规网络请求。",
    "about.limits.title": "专注格式转换，也有明确边界。",
    "about.limits.body": "EpuBloom 不提供电子书下载库，不解除 DRM，也不识别图片中的文字。不同制作工具生成的 EPUB，提取效果可能不同。请保留原文件，尤其在完整性重要时逐章检查结果。",
    "about.open.title": "开源，也欢迎反馈。",
    "about.open.body": "源代码位于 <a href=\"https://github.com/ficbase/transmute-web\">ficbase/transmute-web</a>。遇到问题可以通过<a href=\"contact.html\">联系页面</a>反馈。<a href=\"privacy.html\">隐私说明</a>介绍了文件处理、访问日志与语言偏好。",
    "about.title": "关于 EpuBloom — 免费浏览器电子书转换器",
    "about.description": "了解 ficbase 维护的免费浏览器 TXT 与 EPUB 转换工具 EpuBloom。",
    "about.eyebrow": "关于 EPUBLOOM",
    "about.heading": "为下一次阅读而做。",
    "contact.channel.title": "通过 GitHub 联系我们。",
    "contact.channel.body": "EpuBloom 由 ficbase 维护。公开联系渠道为 <a href=\"https://github.com/ficbase/transmute-web/issues\">GitHub Issues</a>。可以先搜索已有反馈，或登录 GitHub 后<a href=\"https://github.com/ficbase/transmute-web/issues/new\">提交新问题</a>。",
    "contact.include.title": "这些信息有助于排查……",
    "contact.include.list": "<li>转换方向：TXT 转 EPUB，或 EPUB 转 TXT。</li><li>浏览器版本、设备系统，以及文件的大致大小。</li><li>错误提示，或预期结果与实际结果。</li><li>一小段可以公开的示例，以及已知的原始编码。</li>",
    "contact.public.body": "Issue 是公开的。建议用自己编写的几行示例复现问题，不要提交私人文稿、完整的受版权保护书籍、账号资料或带有个人信息的截图。",
    "contact.other.title": "有疑问、隐私问题，或改进建议？",
    "contact.other.body": "有关网站、隐私说明或功能改进的问题，也可以通过同一渠道提出。维护者可在 Issue 中进一步沟通；本站不承诺固定的响应时间。",
    "contact.links": "也可以先查看<a href=\"guide.html\">指南与常见问题</a>，或<a href=\"index.html\">返回转换器</a>。",
    "contact.title": "联系与帮助 | EpuBloom",
    "contact.description": "通过 GitHub Issues 反馈转换问题、提出疑问或分享对 EpuBloom 的建议。",
    "contact.eyebrow": "联系与反馈",
    "contact.heading": "需要时，找到帮助。",
    "privacy.updated": "更新日期：2026 年 10 月 9 日",
    "privacy.files.title": "文件和书籍信息",
    "privacy.files.body": "所选 TXT、EPUB 与封面图片在浏览器中读取和转换。网站不会将文件内容、书名、作者或其他书籍信息上传到服务器，也没有用于保存这些内容的在线账号或文件库。",
    "privacy.download.body": "结果保存在浏览器内存中，下载后写入你的设备。网站不会通过 Cookie、localStorage 或 IndexedDB 持久保存所选文件或书籍信息。刷新或离开页面后，需要重新选择文件；下载文件由你管理。",
    "privacy.language.title": "语言偏好",
    "privacy.language.body": "当你选择英语或简体中文时，我们会把这一偏好保存在当前浏览器的 localStorage 中，便于跨页面和下次访问时使用。它不包含文件内容。清除本站的浏览器数据即可清除该偏好；存储不可用时，仍可在当前页面切换语言。",
    "privacy.hosting.title": "访问请求与日志",
    "privacy.hosting.body": "本地转换仍需要常规请求来加载页面、样式、脚本与 WebAssembly。epubloom.com 运行在 ficbase 管理的服务器上，访问日志可能记录 IP 地址、请求时间、浏览器信息、访问路径和来源，但这些请求不包含所选书籍或封面内容。",
    "privacy.ads.title": "Cookie、统计与广告",
    "privacy.ads.current": "正式网站 epubloom.com 加载 Google AdSense 代码，用于连接发布商账号，并在审核通过后支持广告。发往 Google 的请求可能包含 IP 地址、浏览器信息及页面网址。我们不会把你选择的文件或书籍信息发送给 AdSense，也未使用独立的访问统计服务。",
    "privacy.ads.future": "Google 及其他第三方广告服务商可能使用 Cookie 或类似标识符，根据你访问本站及其他网站的记录投放和衡量广告，包括个性化广告。你可以通过下方链接退出个性化广告。在需要同意的地区，广告应遵循你的同意选择；网站的语言偏好与广告 Cookie 分开存储。",
    "privacy.ads.controls": "你可以在 <a href=\"https://myadcenter.google.com/\">Google 我的广告中心</a>管理个性化广告，也可以查看 <a href=\"https://www.aboutads.info/choices/\">AboutAds 选择页面</a>与 <a href=\"https://policies.google.com/technologies/ads\">Google 广告说明</a>。",
    "privacy.external.title": "外部链接与公开反馈",
    "privacy.external.body": "GitHub 等外部网站按照各自的隐私政策处理访问和提交的信息。GitHub Issues 中的反馈是公开的；相关处理可查阅 <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\">GitHub 隐私声明</a>。",
    "privacy.contact.title": "联系与更新",
    "privacy.contact.body": "有关本说明或数据处理的问题，请通过<a href=\"contact.html\">联系渠道</a>反馈。托管、语言存储或广告做法发生变化时，我们会更新本页及其日期。",
    "privacy.title": "隐私政策 | EpuBloom",
    "privacy.description": "了解 EpuBloom 如何处理文件、语言偏好、网站访问日志和广告。",
    "privacy.eyebrow": "隐私说明",
    "privacy.heading": "你的文字，始终属于你。",
    "guide.txt.title": "TXT 转 EPUB：让文字成为电子书。",
    "guide.txt.intro": "TXT 适合保存文字；EPUB 则把书籍信息、封面和可跳转目录放进同一个文件。请处理自己的写作、笔记或已获授权的文字。EpuBloom 不会替你校对或修复原文错误。",
    "guide.txt.steps": "<li>在转换器中选择或拖入 .txt 文件，根据扩展名自动确定转换方向。</li><li>展开“书籍信息”，检查书名和作者。程序会在前 20 行中查找 Title:、Author:、中文《书名》和“作者：”标记，也可以手动填写。</li><li>设置书籍语言代码，例如 en 或 zh。界面语言与书籍语言相互独立。还可以填写简介、出版社、标识符、日期、版权和标签。</li><li>按需添加封面。建议使用 JPEG 或 PNG，以兼容常见阅读器；不添加时会根据书名与作者生成简洁的 SVG 封面。</li><li>转换为 EPUB 后下载，用阅读器检查章节、正文、封面和书籍信息，并保留原始 TXT。</li>",
    "guide.chapters.title": "让章节标题更容易识别。",
    "guide.chapters.body": "把每个章节标题单独放在一行。转换器识别以“Chapter ”、“CHAPTER ”或“# ”开头的行，也识别“第一章”等带编号的中文章节标题。例如：",
    "guide.example": "《一次小小的出发》\n作者：EpuBloom\n\n第一章 清晨\n　　窗边放着一本空白笔记。\n　　新的一天，等待新的故事。\n\n第二章 河岸\n　　走一段路，记下沿途的风景。",
    "guide.chapters.note": "如果目录不符合预期，请检查标题是否独立成行、是否符合这些格式。没有可识别标题的内容会使用默认章节，章前信息或前言也可能进入正文，因此需要检查结果。",
    "guide.sample": "先<a href=\"examples/sample.txt\" data-sample-link download>下载示例 TXT</a>体验完整流程，再转换长文。",
    "guide.encoding.title": "文字乱码时怎么办？",
    "guide.encoding.body": "转换器根据 BOM 识别 UTF-8、UTF-16LE 与 UTF-16BE；没有 BOM 时，先验证 UTF-8，失败后尝试 GBK。自动识别无法覆盖所有历史编码。出现乱码时，请用编辑器确认原始编码，另存为 UTF-8 后重新选择。已经错误保存丢失的字符，转换无法还原。",
    "guide.epub.title": "EPUB 转 TXT：回到文字本身。",
    "guide.epub.body": "选择 EPUB 后转换为 TXT，下载可解析的书名、作者、章节标题和正文。纯文本不保留图片、字体、链接、表格与页面布局，适合文字整理，不适合作为电子书的保真备份。",
    "guide.epub.limits": "不同 EPUB 的结构可能导致文字缺失、实体字符异常或章节顺序不符。纯图片页面无法识别成文字，本工具不提供 OCR 或 DRM 解密。对完整性有要求时，请与原书逐章核对。",
    "guide.faq.title": "常见问题。",
    "guide.private.title": "文件会被上传吗？",
    "guide.private.body": "不会。转换器通过 WebAssembly 在浏览器本地运行。常规网站访问请求仍由服务器处理，详见<a href=\"privacy.html\">隐私说明</a>。",
    "guide.large.title": "为什么大文件会让页面卡顿？",
    "guide.large.body": "文件读取、解析与输出会占用设备内存，转换期间页面可能暂时没有响应。建议先用小文件测试，处理长文前关闭不需要的标签页。实际容量取决于浏览器、设备与内容，本站不承诺固定大小上限。",
    "guide.loading.title": "转换器无法加载怎么办？",
    "guide.loading.body": "请使用支持 WebAssembly 的现代浏览器，检查网络后刷新。首次访问需要下载转换模块，断网或资源被拦截都会影响加载。仍有问题时，可以通过<a href=\"contact.html\">联系页面</a>提供浏览器版本和错误提示。",
    "guide.check.title": "怎样检查下载结果？",
    "guide.check.body": "用文本编辑器检查 TXT 的字符、段落和章节顺序；用实际阅读器检查 EPUB 的封面、目录链接和正文。原始文件与转换结果应分别保存。",
    "guide.back": "<a href=\"index.html\">返回转换器 ↗</a>",
    "guide.title": "TXT 与 EPUB 转换指南：章节、封面与编码 | EpuBloom",
    "guide.description": "了解 TXT 与 EPUB 转换、章节标题准备、书籍信息编辑和文件问题排查。",
    "guide.eyebrow": "指南与常见问题",
    "guide.heading": "TXT 与 EPUB 转换指南。",
    "action.choose": "选择文件开始转换",
    "action.epub": "转换为 EPUB",
    "action.txt": "转换为 TXT",
    "action.converting": "正在转换文件……",
    "action.download": "下载转换结果",
    "encoding.current": "当前 TXT 编码",
    "encoding.target": "转换为",
    "encoding.detecting": "正在识别……",
    "encoding.unknown": "无法识别",
    "encoding.legacy": "GBK / GB18030（推测）",
    "status.encodingLoss": "部分字符无法保存为 {encoding}，请选择 UTF-8 或 GB18030。本次未下载文件。",
    "action.encoding": "转换编码",
    "action.encodingConverting": "正在转换编码……",
    "encoding.hint": "下载新的 TXT 副本，保留原始文件。",
    "status.encodingConverting": "正在本地转换 TXT 编码……",
    "status.encodingSuccess": "已下载 TXT 副本：{name}",
    "status.encodingInvalid": "无法按 UTF-8、带 BOM 的 UTF-16 或 GBK/GB18030 读取此 TXT。请确认原始编码，本次未下载文件。",
    "status.loading": "正在加载转换器……",
    "status.unsupported": "请选择 .txt 或 .epub 文件。",
    "status.coverType": "请选择图片作为封面。",
    "status.converting": "正在为文字整理新格式……",
    "status.success": "转换完成，可以下载了。",
    "status.failed": "无法转换这个文件，请检查原文件后重试。",
    "status.error": "转换失败：{message}",
    "status.epubInvalid": "无法读取 EPUB，请确认文件有效且未加密。",
    "status.loadFailed": "转换器加载失败，请检查网络后刷新页面。",
    "brand.home": "EpuBloom 首页",
    "nav.footer": "页脚导航",
    "section.converter": "文件转换器",
    "section.features": "功能特点",
    "guides.title": "让下一次转换更顺利。",
    "guides.eyebrow": "实用转换指南",
    "guides.txt.title": "TXT 转 EPUB",
    "guides.txt.body": "准备章节标题、填写书籍信息，为文字添加封面与目录。",
    "guides.epub.title": "EPUB 转 TXT",
    "guides.epub.body": "提取可编辑文字，了解转为纯文本后会保留和丢失什么。",
    "guides.encoding.title": "解决文字乱码",
    "guides.encoding.body": "转换电子书前，检查 UTF-8、UTF-16 和 GBK 文本编码。",
    "guides.read": "阅读指南 ↗",
    "article.eyebrow": "阅读与转换",
    "article.back": "全部转换指南 ↗",
    "article.txt.title": "如何将 TXT 转为带目录和封面的 EPUB | EpuBloom",
    "article.txt.description": "在浏览器中把 TXT 转为 EPUB 电子书，了解章节标题格式、书名与作者识别、封面设置及转换结果检查方法。",
    "article.txt.heading": "如何将 TXT 转为 EPUB。",
    "article.txt.action": "开始转换 TXT ↗",
    "article.txt.body": "<p class=\"note\">适用于自己的写作、笔记或已获授权的文字。无需注册，也无需上传文件。</p><p>TXT 只保存纯文字，EPUB 则增加书籍信息、导航目录和封面，便于在电子书阅读器中阅读。EpuBloom 在浏览器中生成 EPUB 3.3 文件。</p>\n<h2>1. 准备可正常阅读的文本</h2><p>先用文本编辑器打开原文件。如果字符显示异常，请先按照<a href=\"fix-text-encoding.html\">乱码处理指南</a>检查编码，再保存一份 UTF-8 副本用于转换。</p><p>建议将书名与作者放在开头。EpuBloom 在前 20 行中识别中文《书名》、“作者：”，也识别不区分大小写的英文 Title: 和 Author: 标记：</p><pre>《一次小小的出发》\n作者：EpuBloom\n\n第一章 清晨\n窗边放着一本空白笔记。\n\n第二章 河岸\n走一段路，记下沿途的风景。</pre>\n<h2>2. 将章节标题独立成行</h2><p>转换器识别“第一章”等带编号的中文标题，以及以 <code>Chapter </code>、<code>CHAPTER </code> 或 <code># </code> 开头的行。普通正文应避免使用这些开头，以免被误认为章节。</p><p>识别出的标题会成为目录条目。没有可识别标题时，正文放入默认章节；书名、作者行或前言也可能留在正文中，因此需要检查开头页面。</p>\n<h2>3. 选择 TXT 并核对书籍信息</h2><p>打开<a href=\"index.html#converter\">转换器</a>，选择 .txt 文件。展开“书籍信息”，检查自动识别的书名与作者，也可以自行修改。中文书籍的语言代码可填 <code>zh</code>，英文可填 <code>en</code>；它描述的是书籍内容，与网站界面语言相互独立。</p><p>简介、出版社、标识符、出版日期、版权与标签均为选填。标识符可以自行指定，不要求必须是 ISBN。</p>\n<h2>4. 添加封面并下载</h2><p>按需选择封面图片，JPEG 或 PNG 通常便于常见阅读器兼容。如果不提供图片，EpuBloom 会根据书名与作者生成简洁的 SVG 封面。</p><p>点击“转换为 EPUB”后下载，在实际阅读器中检查封面、目录链接、章节顺序和正文。保留原始 TXT：格式转换不会替你校对文字，也不能保证各阅读器中的排版完全一致。</p>\n<h2>先用短示例体验</h2><p>处理长文前，可以<a href=\"examples/sample.txt\" data-sample-link download>下载示例 TXT</a>试用完整流程。需要从电子书提取文字时，查看<a href=\"epub-to-txt.html\">EPUB 转 TXT 指南</a>。文件大小、浏览器要求与常见问题见<a href=\"guide.html\">完整指南</a>。</p>",
    "article.epub.title": "如何将 EPUB 转为 TXT 并提取电子书文字 | EpuBloom",
    "article.epub.description": "在浏览器本地从 EPUB 提取可编辑的 TXT，了解保留内容、排版损失、章节检查，以及 DRM 与纯图片电子书的限制。",
    "article.epub.heading": "如何将 EPUB 转为 TXT。",
    "article.epub.action": "开始转换 EPUB ↗",
    "article.epub.body": "<p class=\"note\">请处理自己拥有或获准使用的 EPUB。本工具不提供 DRM 解密，也不能识别图片中的文字。</p><p>EPUB 将文字、图片、导航和样式打包成电子书，TXT 则适合在文本编辑器中整理内容。提取文字是一种格式转换，不能替代原书的完整备份。</p>\n<h2>三步提取 EPUB 文字</h2><ol><li>打开<a href=\"index.html#converter\">转换器</a>，选择扩展名为 .epub 的文件。</li><li>点击“转换为 TXT”，文件在浏览器本地读取与处理。</li><li>下载 .txt，用文本编辑器打开检查，并保留原始 EPUB。</li></ol><p>转换方向由扩展名自动确定，提取文字时无需填写书籍信息表单。</p>\n<h2>TXT 中包含什么？</h2><p>输出包括解析器能够提取的书名、作者、章节标题与正文。书籍语言元数据以 <code>zh</code> 开头时，使用中文书名和作者格式；其他语言使用 <code>Title:</code> 与 <code>Author:</code> 标记。</p><pre>《一次小小的出发》\n作者：EpuBloom\n\n第一章 清晨\n窗边放着一本空白笔记。</pre>\n<h2>纯文本会丢失什么？</h2><ul><li>封面、插图及其他图片。</li><li>字体、颜色、页边距和页面布局。</li><li>可点击的链接与可跳转目录。</li><li>表格排版和依赖视觉位置表达的关系。</li></ul><p>换行与提取顺序会受到 EPUB 内部结构影响。对于重要内容，请与原书逐章核对，不能假定所有信息均已保留。</p>\n<h2>转换失败或缺少文字时</h2><p>受 DRM 保护的电子书可能无法读取。纯图片页面没有可直接提取的文本，本工具也不提供 OCR。文件损坏或暂不支持的 EPUB 结构，同样可能造成错误或内容缺失。</p><p>先检查原书能否在阅读器中正常打开。如果原书正常而转换失败，可以通过<a href=\"contact.html\">帮助渠道</a>提供浏览器版本和错误提示。不要把私人电子书或未获授权的完整作品上传到公开问题区。</p>\n<h2>能把 TXT 再转回 EPUB 吗？</h2><p>可以按照<a href=\"txt-to-epub.html\">TXT 转 EPUB 指南</a>重新准备章节、书籍信息和封面。这会生成一本新的电子书，无法只凭纯文本恢复原来的图片与排版。</p>",
    "article.encoding.title": "TXT 转 EPUB 前如何解决乱码：UTF-8、UTF-16 与 GBK | EpuBloom",
    "article.encoding.description": "排查 TXT 转 EPUB 时的文字乱码，了解 UTF-8、UTF-16 与 GBK 检测方式，保留原文件，并另存可读的 UTF-8 副本。",
    "article.encoding.heading": "先解决乱码，再转换电子书。",
    "article.encoding.action": "打开转换器 ↗",
    "article.encoding.body": "<p class=\"note\">始终保留一份未修改的原文件。反复保存乱码文本，可能造成无法恢复的字符丢失。</p><p>文本文件保存的是字节，编码规则决定编辑器如何把字节还原成文字。用错误编码读取文件时，可能看到无意义字符或 � 这样的替换符号。</p>\n<h2>EpuBloom 如何读取 TXT？</h2><ol><li>文件存在字节顺序标记（BOM）时，识别 UTF-8、UTF-16LE 和 UTF-16BE。</li><li>没有 BOM 时，先检查字节是否为有效的 UTF-8。</li><li>UTF-8 校验失败时尝试 GBK，一些较早的中文 TXT 文件采用这种编码。</li></ol><p>这是按顺序尝试的处理方式，不能保证识别所有编码。其他历史编码，以及不带 BOM 的 UTF-16 文件，可能需要先用编辑器正确打开并另存。</p>\n<h2>保存一份可读的 UTF-8 副本</h2><ol><li>用支持指定读取编码的文本编辑器打开原始 TXT。</li><li>如果乱码，重新打开未修改的原文件，尝试来源对应的编码。较早的中文文件可能使用 GBK；如果知道来源软件的编码设置，以实际来源为准。</li><li>检查多个段落、标点和章节标题，确保文字可正常阅读后再保存。</li><li>使用“另存为”或编辑器的编码设置，保存一份新的 UTF-8 文件。</li><li>在<a href=\"index.html#converter\">转换器</a>中选择新文件，生成 EPUB，再用阅读器检查。</li></ol>\n<h2>“重新打开”和“转换编码”不同</h2><p>使用指定编码重新打开，是换一种规则解释原始字节；另存为 UTF-8，则把编辑器当前显示的字符写入新文件。如果当前显示已经乱码，直接保存为 UTF-8 可能把乱码固定下来，而不是修复它。</p><p>如果唯一副本中的字符已经丢失，或被保存成替换符号，切换编码也无法可靠还原。请查找备份，或重新获取原始文件。</p>\n<h2>文字正常，但电子书效果不对？</h2><p>如果字符正确、目录缺少章节，请检查<a href=\"txt-to-epub.html\">章节标题格式</a>。如果从 EPUB 提取文字后丢失图片或表格排版，这是<a href=\"epub-to-txt.html\">纯文本格式的限制</a>，不一定是编码错误。</p><p>需要帮助时，通过<a href=\"contact.html\">联系渠道</a>说明来源编码、浏览器和可见错误。可公开的简短示例比完整的私人稿件更合适。</p>"
  }
};

// Animate real content heights so long translations and resized forms stay unclipped.
export function createDisclosure(trigger, panel, { initialOpen = false, setVisible = () => {} } = {}) {
  let expanded = initialOpen;
  let animation = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  panel.hidden = !expanded;
  panel.inert = !expanded;
  trigger.setAttribute('aria-expanded', String(expanded));

  function settle() {
    panel.hidden = !expanded;
    panel.style.overflow = '';
    setVisible(expanded);
    animation?.cancel();
    animation = null;
  }

  function setExpanded(next) {
    const height = panel.hidden ? 0 : panel.getBoundingClientRect().height;
    const opacity = panel.hidden ? 0 : Number(getComputedStyle(panel).opacity);
    animation?.cancel();
    animation = null;
    expanded = next;
    trigger.setAttribute('aria-expanded', String(expanded));
    if (!expanded && panel.contains(document.activeElement)) trigger.focus();
    panel.inert = !expanded;
    if (reducedMotion.matches || !panel.animate) { settle(); return; }
    // Native details must remain open until their closing animation finishes.
    setVisible(true);
    panel.hidden = false;
    panel.style.overflow = 'hidden';
    const current = panel.animate([
      { height: height + 'px', opacity },
      { height: (expanded ? panel.scrollHeight : 0) + 'px', opacity: expanded ? 1 : 0 },
    ], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' });
    animation = current;
    current.onfinish = () => { if (animation === current) settle(); };
  }

  trigger.addEventListener('click', event => {
    event.preventDefault();
    setExpanded(!expanded);
  });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches && animation) settle(); });
  return { setExpanded };
}

document.querySelectorAll('details').forEach((details, index) => {
  const summary = details.querySelector(':scope > summary');
  if (!summary) return;
  const panel = document.createElement('div');
  panel.className = 'disclosure-panel';
  panel.id = 'faq-panel-' + index;
  const content = document.createElement('div');
  content.className = 'disclosure-content';
  [...details.childNodes].filter(node => node !== summary).forEach(node => content.appendChild(node));
  panel.appendChild(content);
  details.appendChild(panel);
  details.dataset.animatedDisclosure = '';
  summary.setAttribute('aria-controls', panel.id);
  createDisclosure(summary, panel, { initialOpen: details.open, setVisible: open => { details.open = open; } });
});

const supported = ['en', 'zh'];
let language = document.documentElement.dataset.language || 'en';
try { const saved = localStorage.getItem('epubloom.language'); if (language !== 'zh' && supported.includes(saved)) language = saved; } catch { /* The language switch also works without storage. */ }

export function getLanguage() { return language; }
export function t(key, values = {}) {
  const message = messages[language][key] ?? messages.en[key] ?? key;
  return message.replace(/\{(\w+)\}/g, (match, name) => Object.hasOwn(values, name) ? String(values[name]) : match);
}


const pageNames = ['index.html', 'guide.html', 'about.html', 'contact.html', 'privacy.html', 'txt-to-epub.html', 'epub-to-txt.html', 'fix-text-encoding.html'];

function syncPageLanguage() {
  if (!document.documentElement.dataset.siteBase) {
    document.querySelectorAll('[data-sample-link]').forEach(link => {
      link.href = language === 'zh' ? 'examples/sample.txt' : 'examples/sample-en.txt';
    });
    return;
  }
  const base = document.documentElement.dataset.siteBase || new URL('.', location.href).pathname;
  const prefix = base + (language === 'zh' ? 'zh/' : '');
  document.querySelectorAll('a[href]:not([data-language-link])').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const url = new URL(href, location.origin + base);
    if (url.origin !== location.origin || !url.pathname.startsWith(base)) return;
    const path = url.pathname.slice(base.length).replace(/^zh\//, '') || 'index.html';
    if (pageNames.includes(path)) link.href = prefix + (path === 'index.html' ? '' : path) + url.hash;
  });
  document.querySelectorAll('[data-sample-link]').forEach(link => {
    link.href = base + (language === 'zh' ? 'examples/sample.txt' : 'examples/sample-en.txt');
  });
  const alternate = document.querySelector(`link[rel="alternate"][hreflang="${language === 'zh' ? 'zh-Hans' : 'en'}"]`);
  if (!alternate) return; // The authored source also works before packaging.
  const canonical = alternate.href;
  document.querySelector('link[rel="canonical"]').href = canonical;
  document.querySelector('meta[property="og:url"]').content = canonical;
  document.querySelector('meta[property="og:locale"]').content = language === 'zh' ? 'zh_CN' : 'en_US';
  const description = document.querySelector('meta[name="description"]').content;
  document.querySelector('meta[name="twitter:title"]').content = document.title;
  document.querySelector('meta[name="twitter:description"]').content = description;
  const schema = document.querySelector('#site-structured-data');
  const structured = JSON.parse(schema.textContent);
  structured['@graph'].forEach(item => {
    if (item['@type'] === 'WebPage') Object.assign(item, {
      '@id': canonical + '#webpage', url: canonical, name: document.title,
      description, inLanguage: language === 'zh' ? 'zh-CN' : 'en',
    });
    if (item['@type'] === 'WebApplication') Object.assign(item, { url: canonical, description });
  });
  schema.textContent = JSON.stringify(structured);
  // Keep the current file and result in memory while giving each language its own URL.
  const next = new URL(canonical);
  if (location.pathname !== next.pathname) {
    history.replaceState(null, '', next.pathname + location.search + location.hash);
  }
}

function renderLanguage() {
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  for (const [attribute, target] of [['data-i18n', 'textContent'], ['data-i18n-html', 'innerHTML']]) {
    document.querySelectorAll(`[${attribute}]`).forEach(element => { element[target] = t(element.getAttribute(attribute)); });
  }
  for (const [attribute, target] of [['data-i18n-placeholder', 'placeholder'], ['data-i18n-label', 'aria-label'], ['data-i18n-content', 'content'], ['data-i18n-alt', 'alt']]) {
    document.querySelectorAll(`[${attribute}]`).forEach(element => element.setAttribute(target, t(element.getAttribute(attribute))));
  }
  syncPageLanguage();
  document.querySelectorAll('[data-language-current]').forEach(label => {
    label.textContent = language === 'zh' ? '简体中文' : 'English';
  });
  document.querySelectorAll('[data-language-option]').forEach(option => {
    option.setAttribute('aria-checked', String(option.dataset.languageOption === language));
  });
}

export function setLanguage(next) {
  if (!supported.includes(next)) return;
  language = next;
  try { localStorage.setItem('epubloom.language', language); } catch { /* No storage is required to use the converter. */ }
  renderLanguage();
  window.dispatchEvent(new CustomEvent('epubloom:languagechange'));
}

renderLanguage();
const languageTrigger = document.querySelector('#languageSelect');
const languageMenu = document.querySelector('#languageMenu');
const languageOptions = [...document.querySelectorAll('[data-language-option]')];
function closeLanguageMenu(restoreFocus = false) {
  if (!languageMenu) return;
  languageMenu.hidden = true;
  languageTrigger.setAttribute('aria-expanded', 'false');
  if (restoreFocus) languageTrigger.focus();
}
function openLanguageMenu(index = languageOptions.findIndex(option => option.dataset.languageOption === language)) {
  languageMenu.hidden = false;
  languageTrigger.setAttribute('aria-expanded', 'true');
  languageOptions[index]?.focus();
}
languageTrigger?.addEventListener('click', () => {
  if (languageMenu.hidden) openLanguageMenu();
  else closeLanguageMenu();
});
languageTrigger?.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    openLanguageMenu(event.key === 'ArrowDown' ? 0 : languageOptions.length - 1);
  }
});
languageOptions.forEach(option => option.addEventListener('click', () => {
  setLanguage(option.dataset.languageOption);
  closeLanguageMenu(true);
}));
languageMenu?.addEventListener('keydown', event => {
  const index = languageOptions.indexOf(document.activeElement);
  let next;
  if (event.key === 'ArrowDown') next = (index + 1) % languageOptions.length;
  if (event.key === 'ArrowUp') next = (index - 1 + languageOptions.length) % languageOptions.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = languageOptions.length - 1;
  if (next !== undefined) {
    event.preventDefault();
    languageOptions[next].focus();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    closeLanguageMenu(true);
  } else if (event.key === 'Tab') closeLanguageMenu(true);
});
const languageControl = languageTrigger?.closest('.language-control');
document.addEventListener('click', event => {
  if (!languageControl?.contains(event.target)) closeLanguageMenu();
});
document.addEventListener('focusin', event => {
  if (!languageControl?.contains(event.target)) closeLanguageMenu();
});
document.querySelectorAll('[data-language-link]').forEach(link => link.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  setLanguage(link.dataset.languageLink);
}));

// Enable the switch only after its listeners and translations are ready.
document.querySelector('#languageSelect')?.removeAttribute('disabled');
