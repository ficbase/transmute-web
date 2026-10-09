// Page translations contain only trusted, static markup authored with the site.
const messages = {
  "en": {
    "home.title": "Free TXT to EPUB Converter & Online EPUB Reader | EpuBloom",
    "home.description": "Read EPUB and TXT online with chapter navigation, font controls and dark mode. Convert TXT to EPUB, EPUB to TXT or GBK to UTF-8. No book uploads or signup.",
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
    "hero.title": "TXT to EPUB <em>&amp; back.</em>",
    "hero.description": "Read TXT and EPUB, create ebooks, or change TXT encoding. Free, right in your browser.",
    "hero.private": "Your files stay yours",
    "hero.signup": "No account needed",
    "art.caption": "Good words deserve a good home.",
    "converter.eyebrow": "THE CONVERTER",
    "converter.title": "Start with your file",
    "converter.export": "Convert & download",
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
    "cover.addText": "Add book title and author",
    "cover.textHint": "Edit Book details below; click the cover to move and resize text.",
    "cover.enlarge": "Enlarge and edit cover",
    "cover.textColor": "Text color",
    "cover.chooseColor": "Choose color",
    "cover.hexColor": "Custom color",
    "cover.hexHint": "#RRGGBB",
    "cover.colorInvalid": "Enter a color as #RRGGBB, for example #FFFFFF.",
    "cover.editorTitle": "Cover preview & layout",
    "cover.close": "Close preview",
    "cover.editorHint": "Select the title or author, then drag to arrange your cover.",
    "cover.previewHint": "Enable title and author on the main page to arrange text here.",
    "cover.moveTitle": "Move book title. Use arrow keys for precise adjustment.",
    "cover.resizeTitle": "Resize book title. Use arrow keys to adjust size.",
    "cover.moveAuthor": "Move author name. Use arrow keys for precise adjustment.",
    "cover.resizeAuthor": "Resize author name. Use arrow keys to adjust size.",
    "cover.editText": "Edit text",
    "cover.emptyText": "Add a title or author in Book details to start arranging text.",
    "cover.fontSize": "Text size",
    "cover.resetLayout": "Reset layout & colors",
    "cover.editorHelp": "Drag text to move it; drag its corner to resize. Changes are saved automatically.",
    "cover.done": "Done",
    "export.name": "Export filename",
    "export.preview": "Exports as {name}",
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
    "privacy.language.title": "Language and reading preferences",
    "privacy.language.body": "When you choose a language, we save that preference in localStorage. The reader also saves your text size, theme, and up to 20 reading positions, identified by a one-way file fingerprint with a chapter number and scroll position. Book contents, titles, authors and filenames are not saved. Select the same file again to resume. Clear this site’s browser data to remove these preferences; reading and conversion still work when storage is unavailable.",
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
    "guide.encoding.body": "Below Convert to EPUB, check the detected TXT encoding, choose UTF-8, GBK, GB18030, or BOM-marked UTF-16 LE / BE, and use Convert encoding to download a separate TXT copy. Legacy Chinese detection is estimated. See the <a href=\"gbk-to-utf8.html\">GBK to UTF-8 steps</a> or <a href=\"fix-text-encoding.html\">garbled-text troubleshooting</a> before saving unreadable text.",
    "guide.epub.title": "EPUB to TXT: back to the words.",
    "guide.epub.body": "Choose an EPUB, convert to TXT, and download its readable title, author, headings, and text. Plain text doesn’t preserve images, fonts, links, tables, or page layouts. Use it for editing and organizing words, rather than as a faithful ebook backup.",
    "guide.epub.limits": "EPUB structures vary. Books from different tools may have missing text, unusual entity characters, or unexpected chapter ordering. Image-only pages aren’t recognized as text. There’s no OCR or DRM removal. Compare with the original chapter by chapter when completeness matters.",
    "guide.faq.title": "A few common questions.",
    "guide.private.title": "Are files uploaded?",
    "guide.private.body": "No. The converter runs locally in your browser using WebAssembly. Ordinary website requests are still handled by the server; see the <a href=\"privacy.html\">privacy notice</a>.",
    "guide.large.title": "Why does a large file slow the page down?",
    "guide.large.body": "Files may be up to 50 MiB (shown as 50 MB). EPUBs also have limits on expanded archive content, so some compressed books below this size cannot be opened. Parsing and conversion use device memory and may pause the page. Start with a small file; see the <a href=\"online-reader.html\">reader guide</a> for supported formats and restrictions.",
    "guide.loading.title": "What if the converter doesn’t load?",
    "guide.loading.body": "Use a modern browser with WebAssembly support, check your connection, and refresh. The first visit needs to download the converter. If resources are blocked or the network is unavailable, it can’t start. If the problem continues, <a href=\"contact.html\">send a report</a> with the browser version and error message.",
    "guide.check.title": "How do I check the download?",
    "guide.check.body": "Open TXT in a text editor to check characters, paragraph breaks, and chapter order. Open EPUB in the reader you actually use to check its cover, contents links, and text. Keep the original and the converted file separately.",
    "guide.back": "<a href=\"index.html\">Back to the converter ↗</a>",
    "guide.title": "TXT & EPUB Guide: Online Reading, Conversion & Encoding | EpuBloom",
    "guide.description": "Read TXT and EPUB online, navigate chapters, resume reading, convert ebooks, edit covers, and fix text encoding in your browser.",
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
    "guides.title": "Read comfortably. Convert with confidence.",
    "guides.eyebrow": "READING & CONVERSION GUIDES",
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
    "article.txt.body": "<p class=\"note\">For your own writing, notes, and text you have permission to convert. No account or file upload is needed.</p>\n<p>A TXT file contains plain text. An EPUB adds book information, navigation, and a cover so the same writing is easier to read in an ebook reader. EpuBloom creates EPUB 3.3 files in your browser.</p>\n<h2>1. Prepare a readable text file</h2><p>Open the original in a text editor first. If letters look wrong, follow the <a href=\"fix-text-encoding.html\">text encoding guide</a> before converting. UTF-8 is a useful format for a new copy.</p>\n<p>Put the title and author near the top. EpuBloom checks the first 20 lines for these English headers (case-insensitive), as well as Chinese title and author markers:</p>\n<pre>Title: The Little Journey\nAuthor: EpuBloom\n\nChapter 1 — A quiet morning\nThe notebook was still empty.\n\nChapter 2 — Along the river\nA little wandering brought a fresh perspective.</pre>\n<h2>2. Put chapter headings on separate lines</h2><p>Headings starting with <code>Chapter </code>, <code>CHAPTER </code>, or <code># </code> are recognized, along with numbered Chinese headings such as 第一章. Avoid using these patterns for ordinary body text.</p><p>Recognized headings become table-of-contents entries. If there are no headings, the text goes into a default chapter. Title lines and introductions may remain in the body, so check the opening pages.</p>\n<h2>3. Choose your TXT and check book details</h2><p>Open the <a href=\"index.html#converter\">converter</a> and select the .txt file. Expand “Book details” to edit the detected title and author. Set the book language to <code>en</code> for English or <code>zh</code> for Chinese. This describes the book, independently of the website’s language switch.</p><p>You can also enter a description, publisher, identifier, publication date, rights statement, and subjects. These are optional; an identifier does not need to be an ISBN.</p>\n<h2>4. Add a cover and download</h2><p>Choose a cover image if you have one. JPEG or PNG is a practical choice for reader compatibility. Without a cover, EpuBloom generates a simple SVG cover from the title and author.</p><p>Click “Convert to EPUB,” then download the result. Open it in your intended reader and check the cover, table of contents, chapter order, and text. Keep the source TXT: conversion does not proofread your writing or guarantee identical layout in every reader.</p>\n<p>Uploaded images are fitted to a 2:3 JPEG cover. Enable title and author text, choose colors, and click the image to drag and resize each text block. See the <a href=\"epub-cover.html\">cover layout guide</a>. The export filename follows Book details until you edit it yourself. For a reliable contents page, check the <a href=\"txt-chapters.html\">chapter-formatting examples</a>.</p><h2>Try it with a short sample</h2><p><a href=\"examples/sample-en.txt\" data-sample-link download>Download our sample TXT</a> before converting a long manuscript. If you need to get text back out of an ebook, see <a href=\"epub-to-txt.html\">EPUB to TXT</a>. The <a href=\"guide.html\">full guide</a> covers file size, browser requirements, and common problems.</p><p>To check the selected source before converting, use Read online. For chapter navigation, themes, and saved positions, see the <a href=\"online-reader.html\">EPUB and TXT online reader guide</a>.</p>",
    "article.epub.title": "How to Convert EPUB to TXT: Extract Editable Ebook Text | EpuBloom",
    "article.epub.description": "Extract readable text from an EPUB in your browser. Learn what TXT preserves, what formatting is lost, and how to check chapters, DRM, and image-only books.",
    "article.epub.heading": "How to convert EPUB to TXT.",
    "article.epub.action": "Convert an EPUB file ↗",
    "article.epub.body": "<p class=\"note\">Use an EPUB you own or have permission to process. EpuBloom does not remove DRM or recognize text inside images.</p>\n<p>EPUB bundles text, images, navigation, and styling into an ebook. TXT is useful when you need editable words in a text editor. Extracting text is a change of format: it is not a complete backup of the ebook.</p>\n<h2>Convert an EPUB in three steps</h2><ol><li>Open the <a href=\"index.html#converter\">converter</a> and select a file ending in .epub.</li><li>Click “Convert to TXT.” The ebook is read and processed in your browser.</li><li>Download the .txt file and open it in a text editor. Keep the original EPUB.</li></ol><p>The tool uses the file extension to choose the direction. There is no need to edit the book-details form when extracting text.</p>\n<h2>What the TXT result contains</h2><p>The result includes the readable book title, author, chapter headings, and body text that the parser can extract. For an English-language EPUB, title and author headers use <code>Title:</code> and <code>Author:</code>. Books whose language metadata begins with <code>zh</code> use Chinese header formatting.</p>\n<pre>Title: The Little Journey\nAuthor: EpuBloom\n\nChapter 1 — A quiet morning\nThe notebook was still empty.</pre>\n<h2>What plain text leaves behind</h2><ul><li>Cover images, illustrations, and other pictures.</li><li>Fonts, colors, margins, and page layouts.</li><li>Clickable links and a navigable table of contents.</li><li>Table layout and other visual relationships.</li></ul><p>Line breaks and extracted reading order can vary with the EPUB’s structure. Compare important passages and chapter order against the original instead of assuming every element has been preserved.</p>\n<h2>If conversion fails or text is missing</h2><p>A DRM-protected ebook may not be readable by this tool. Image-only pages contain no ordinary text to extract, and this converter does not provide OCR. A damaged or unsupported EPUB structure can also cause errors or missing content.</p><p>Check that the original opens in an ebook reader. If it does but conversion still fails, report the browser version and error through <a href=\"contact.html\">support</a>. Don’t post a private or copyrighted ebook in a public issue.</p>\n<h2>Can I turn the TXT back into an EPUB?</h2><p>Yes. Follow the <a href=\"txt-to-epub.html\">TXT to EPUB guide</a> to prepare chapter headings, book details, and a new cover. This creates a new ebook; the original images and layout cannot be recovered from the text alone.</p><p>To check the selected source before converting, use Read online. For chapter navigation, themes, and saved positions, see the <a href=\"online-reader.html\">EPUB and TXT online reader guide</a>.</p>",
    "article.encoding.title": "Fix Garbled TXT Before EPUB Conversion: UTF-8, UTF-16 & GBK | EpuBloom",
    "article.encoding.description": "Troubleshoot unreadable TXT files before EPUB conversion. Understand UTF-8, UTF-16, and GBK detection, preserve the original, and save a readable UTF-8 copy.",
    "article.encoding.heading": "Fix garbled text before converting.",
    "article.encoding.action": "Open the converter ↗",
    "article.encoding.body": "<p class=\"note\">Keep an untouched copy of the original file. Repeatedly saving unreadable text can permanently lose characters.</p>\n<p>A text file stores bytes. An encoding tells your editor how to turn those bytes into letters. If a file written with one encoding is read using another, you may see nonsense characters or replacement symbols such as �.</p>\n<h2>How EpuBloom reads a TXT file</h2><ol><li>If the file has a byte-order mark (BOM), the converter recognizes UTF-8, UTF-16LE, or UTF-16BE.</li><li>Without a BOM, it checks whether the bytes are valid UTF-8.</li><li>If that check fails, it strictly tries GB18030 for legacy Chinese text, shown as GBK / GB18030 (estimated).</li></ol><p>This is a fallback sequence, not a guarantee that every encoding can be detected. Other legacy encodings and UTF-16 files without a BOM may need to be opened and resaved in an editor first.</p>\n<h2>Use the built-in encoding converter</h2><p>If the detected source encoding is appropriate, choose UTF-8 in the target selector below Convert to EPUB, then click Convert encoding. A separate TXT copy downloads immediately. Follow the <a href=\"gbk-to-utf8.html\">GBK to UTF-8 guide</a> for filenames, byte examples, and unsupported characters. If the source is not supported or the result is wrong, use the editor workflow below.</p><h2>Make a readable UTF-8 copy</h2><ol><li>Open the original TXT in a text editor that lets you choose the encoding used to read a file.</li><li>If it looks wrong, reopen the untouched original with the likely source encoding. Older Chinese TXT files may use GBK; use the source application’s information when available.</li><li>Check several paragraphs, punctuation marks, and chapter headings. Make sure the text is readable before saving.</li><li>Use “Save As” or the editor’s encoding controls to save a separate UTF-8 copy.</li><li>Select the new copy in the <a href=\"index.html#converter\">converter</a>, create the EPUB, and inspect it in a reader.</li></ol>\n<h2>Reopen and convert are different operations</h2><p>Reopening with an encoding changes how existing bytes are interpreted. Saving as UTF-8 writes the characters currently shown by the editor into a new file. Saving an already garbled display as UTF-8 can preserve the damage rather than fix it.</p><p>If the only available copy already contains lost characters or replacement symbols, changing the encoding cannot reliably restore the original. Look for a backup or obtain a fresh source file.</p>\n<h2>When the text is readable but the ebook looks wrong</h2><p>If characters are correct but chapters are missing from the contents, check the <a href=\"txt-to-epub.html\">chapter-heading formats</a>. If you extracted an EPUB and lost images or table layout, those are <a href=\"epub-to-txt.html\">plain-text conversion limits</a>, rather than necessarily an encoding problem.</p><p>For help, describe the source encoding, browser, and visible error through <a href=\"contact.html\">support</a>. A short non-private example is more useful than sharing a full personal manuscript.</p>",
    "breadcrumb.label": "Breadcrumbs",
    "breadcrumb.home": "Home",
    "article.byline": "Written by EpuBloom",
    "article.contents": "On this page",
    "related.title": "More conversion guides",
    "share.alt": "EpuBloom — read TXT and EPUB and convert ebooks in your browser",
    "article.gbk.title": "Convert GBK to UTF-8 Online: Keep Chinese TXT Readable | EpuBloom",
    "article.gbk.description": "Convert a GBK or GB18030 TXT file to UTF-8 in your browser. Follow the encoding selector, check Chinese characters, and download a separate text copy.",
    "article.gbk.heading": "Convert GBK to UTF-8 without changing your text.",
    "article.gbk.action": "Convert TXT encoding ↗",
    "article.gbk.body": "<p class=\"note\">This changes how a TXT file stores characters. It does not translate the text or turn it into an EPUB. Keep the original file.</p>\n<p>Some older Chinese text files use GBK, GB2312, or GB18030. UTF-8 is a useful choice when moving text between current editors and devices. EpuBloom can read supported TXT encodings and write a separate UTF-8 copy locally in your browser.</p>\n<h2>Convert a Chinese TXT file in four steps</h2><ol><li>Open the <a href=\"index.html#converter\">TXT converter</a> and choose your original <code>.txt</code> file.</li><li>Look below “Convert to EPUB” for “Current TXT encoding.” Older Chinese files may appear as “GBK / GB18030 (estimated).”</li><li>Choose <strong>UTF-8</strong> in “Convert to,” then click <strong>Convert encoding</strong>.</li><li>Open the downloaded <code>.utf8.txt</code> copy and check the title, several paragraphs, punctuation, and the last page against the original.</li></ol>\n<p>The export filename field also names this copy. For example, an export name of <code>My Notes</code> produces <code>My Notes.utf8.txt</code>. Encoding conversion downloads the TXT directly; it does not replace an EPUB conversion you already made.</p>\n<h2>What actually changes?</h2><p>The characters should stay the same, while the bytes change. For the text <strong>中文</strong>, these are the bytes in hexadecimal:</p><div class=\"table-scroll\"><table><thead><tr><th>Encoding</th><th>Bytes for 中文</th></tr></thead><tbody><tr><td>GBK</td><td><code>D6 D0 CE C4</code></td></tr><tr><td>UTF-8</td><td><code>E4 B8 AD E6 96 87</code></td></tr></tbody></table></div>\n<p>Renaming <code>book.txt</code> to <code>book.utf8.txt</code> changes only the name. The conversion button reads the characters and writes the new bytes. The UTF-8 copy uses no BOM; UTF-16 LE and BE copies include a BOM.</p>\n<h2>Why is the current encoding only an estimate?</h2><p>EpuBloom checks a UTF-8 or UTF-16 BOM first, then validates UTF-8, then tries GB18030 for legacy Chinese text. GBK and GB2312 data can also be valid GB18030, so a file without a BOM does not reliably identify which of these was intended. Even valid decoding cannot prove that every character was interpreted as the author intended.</p>\n<p>If the original uses another encoding, such as Big5 or Shift-JIS, use an editor with an explicit source-encoding setting. This converter does not offer those encodings. The <a href=\"fix-text-encoding.html\">garbled-text troubleshooting guide</a> explains the difference between reopening bytes and saving already garbled text.</p>\n<h2>Can I convert UTF-8 back to GBK?</h2><p>Yes: choose GBK as the target. Some characters, including many emoji, cannot be represented in GBK. EpuBloom stops instead of silently replacing them; choose UTF-8 or GB18030 when needed. A successful download still deserves a quick visual check.</p>\n<h2>When conversion cannot repair the file</h2><p>If an earlier save replaced missing characters with <code>?</code> or <code>�</code>, encoding conversion cannot reconstruct the lost original. Return to an untouched backup. If the tool rejects the bytes, confirm the source encoding before trying again.</p>\n<h2>Next: make a readable ebook</h2><p>Once your text is correct, follow the <a href=\"txt-to-epub.html\">TXT to EPUB guide</a>. Use the <a href=\"txt-chapters.html\">chapter heading examples</a> to build a navigable table of contents. Encoding conversion alone does not add chapters, metadata, or a cover.</p>",
    "guides.gbk.title": "GBK to UTF-8",
    "guides.gbk.body": "Download a UTF-8 copy of older Chinese TXT files, with examples and checks.",
    "article.coverGuide.title": "Make an EPUB Cover with a Title and Author | EpuBloom",
    "article.coverGuide.description": "Create a 2:3 EPUB cover while converting TXT. Preview the image, choose fit and text colors, then drag and resize the title and author before downloading.",
    "article.coverGuide.heading": "Make an EPUB cover with your title and author.",
    "article.coverGuide.action": "Create an EPUB cover ↗",
    "article.coverGuide.body": "<p class=\"note\">This cover editor is part of TXT to EPUB conversion. It creates the cover for a new EPUB; it does not replace a cover inside an existing EPUB.</p><p>A square image can look unusually short beside other books in a library. EpuBloom fits uploaded images to a consistent 2:3 portrait canvas and lets you add movable title and author text before exporting.</p>\n<h2>1. Choose a TXT and fill in Book details</h2><p>Open the <a href=\"index.html#converter\">converter</a>, choose a TXT, and expand “Book details.” Check the title and author, including any automatically detected text. These fields supply the cover text and the EPUB metadata. The export filename follows the title until you edit the filename yourself.</p>\n<h2>2. Add your image and choose its fit</h2><p>Use “Choose image” in the Book cover card. JPG, PNG, and WebP are practical source formats. Choose an image no larger than 20 MB or 40 megapixels. The browser generates a 1200 × 1800 JPEG.</p><div class=\"table-scroll\"><table><thead><tr><th>Fit</th><th>Result</th><th>Use it when</th></tr></thead><tbody><tr><td>Keep full image</td><td>The full image remains visible; a matching blurred background fills extra space.</td><td>The original contains details or existing text near its edges.</td></tr><tr><td>Fill cover</td><td>The image fills the portrait canvas with a centered crop.</td><td>The subject is centered and cropping the edges is acceptable.</td></tr></tbody></table></div><p>Neither mode stretches the original image out of proportion. Check the preview before choosing a crop.</p>\n<h2>3. Add title and author text</h2><p>Enable “Add book title and author.” The text comes from Book details. If the image already has a title printed on it, you can leave this switch off to avoid duplicate lettering. The main card’s color palette sets both text elements; its custom field accepts a six-digit color such as <code>#243E30</code>.</p>\n<h2>4. Click the cover to arrange the text</h2><ol><li>Click the thumbnail to open the enlarged preview.</li><li>Select Book title or Author, or click the corresponding text box.</li><li>Drag the text to move it. Drag the bottom-right corner to resize it, or use the Text size slider.</li><li>Choose a color for the selected text. Title and author can have different colors.</li><li>Click Done to return to the converter. Changes are kept for this conversion.</li></ol><p>You can also focus a text box and use arrow keys to move it, or focus its corner and use arrow keys to resize it. Hold Shift for larger steps. Text wraps automatically and stays inside the canvas; very long text may shrink or end with an ellipsis.</p>\n<h2>5. Export and check the actual ebook</h2><p>Click Convert to EPUB and download the book. The exported JPEG contains the text, positions, sizes, and colors from the preview, without selection boxes. After changing the cover, convert again to update the EPUB. Open it in your intended reader to check the cover at library-thumbnail size as well as full size.</p>\n<h2>Common cover problems</h2><ul><li><strong>Text is hard to read:</strong> use a color that contrasts with the image and move it away from busy details.</li><li><strong>The image is cropped too much:</strong> switch to Keep full image.</li><li><strong>No text appears:</strong> fill in the title or author in Book details and enable the switch.</li><li><strong>The arrangement needs a fresh start:</strong> use Reset layout &amp; colors in the preview.</li><li><strong>You want the image alone:</strong> disable the text switch. Turning it on again keeps the arrangement during this conversion.</li></ul><p>Without an uploaded image, the tool generates a simple SVG cover from the title and author. For the rest of the book, see <a href=\"txt-chapters.html\">chapter formatting</a> and the <a href=\"txt-to-epub.html\">complete TXT to EPUB guide</a>.</p>",
    "guides.coverGuide.title": "EPUB cover layout",
    "guides.coverGuide.body": "Fit an image, choose colors, and place the title and author before exporting.",
    "article.chapters.title": "TXT to EPUB Chapters: Format a Working Table of Contents | EpuBloom",
    "article.chapters.description": "Prepare TXT chapter headings for an EPUB table of contents. See recognized English and Chinese formats, sample text, and fixes for missing or extra chapters.",
    "article.chapters.heading": "Format TXT chapters for a working EPUB contents page.",
    "article.chapters.action": "Build an EPUB table of contents ↗",
    "article.chapters.body": "<p class=\"note\">The table of contents is built from headings in your TXT, not from page numbers. Put each chapter heading on a separate line.</p><p>Plain text has no built-in chapter structure. EpuBloom checks each trimmed line for supported heading patterns, splits the book into chapters, and uses those headings in the EPUB navigation.</p>\n<h2>Heading formats the converter recognizes</h2><div class=\"table-scroll\"><table><thead><tr><th>TXT line</th><th>Recognized?</th><th>Reason</th></tr></thead><tbody><tr><td><code>Chapter 1 — A quiet morning</code></td><td>Yes</td><td>Begins with <code>Chapter </code>, including the space.</td></tr><tr><td><code>CHAPTER 2 — The river</code></td><td>Yes</td><td>The uppercase prefix is supported.</td></tr><tr><td><code># Afterword</code></td><td>Yes</td><td>Begins with a hash followed by a space.</td></tr><tr><td><code>第一章 清晨</code> / <code>第2节 河岸</code></td><td>Yes</td><td>Numbered Chinese chapter or section markers.</td></tr><tr><td><code>chapter 1</code> / <code>Chapter1</code></td><td>No</td><td>Lowercase or missing the required space.</td></tr><tr><td><code>1. A quiet morning</code></td><td>No</td><td>A numbered paragraph alone is not a chapter marker.</td></tr></tbody></table></div>\n<p>Chinese markers can use Arabic digits or supported Chinese numerals, followed by 章、节、部、卷、篇 or 集. Ordinary prose beginning with these patterns can also be mistaken for a heading. The tool detects patterns; it does not understand the meaning of the sentence.</p>\n<h2>A small example you can copy</h2><pre>Title: River Notes\nAuthor: EpuBloom\n\nChapter 1 — A quiet morning\nThe notebook was still empty.\n\nChapter 2 — Along the river\nWe stopped beside the bridge.\n\n# Afterword\nThere was more to write tomorrow.</pre><p><a href=\"examples/chapters-en.txt\" download>Download this chapter-formatting sample</a>, select it in the <a href=\"index.html#converter\">converter</a>, and set the book language to <code>en</code>. Check the detected title and author before exporting.</p>\n<h2>Why is a chapter missing from the contents?</h2><p>Check the exact heading prefix, capitalization, and spaces. A heading placed at the end of a body paragraph is not a separate line. Use a supported prefix rather than expecting a bare number, a decorative separator, or a bold-looking Unicode font to create a chapter.</p><p>A book with no recognized headings uses a default chapter. English books use “Chapter 1”; books with a language code beginning with <code>zh</code> use “第1章.” Changing the website language does not translate your headings.</p>\n<h2>Why is there an unexpected first chapter?</h2><p>Text before the first recognized heading may become an opening chapter. Title and author lines can remain in the body even after they have filled Book details. Review the first pages and remove an unwanted duplicate title block from a copy of the source, while keeping the desired metadata in the form.</p>\n<h2>Check the EPUB in a reader</h2><ol><li>Open the downloaded book in your intended reader.</li><li>Open its table of contents and check chapter titles and order.</li><li>Follow several links and confirm each lands at the correct heading.</li><li>Check the beginning, middle, and end of the body against the TXT.</li></ol><p>For image and text styling on the first page, use the <a href=\"epub-cover.html\">cover layout guide</a>. If chapter names themselves are garbled, fix the <a href=\"fix-text-encoding.html\">text encoding</a> first. The <a href=\"txt-to-epub.html\">TXT to EPUB guide</a> covers the complete conversion.</p><p>To check the selected source before converting, use Read online. For chapter navigation, themes, and saved positions, see the <a href=\"online-reader.html\">EPUB and TXT online reader guide</a>.</p>",
    "guides.chapters.title": "Chapters & contents",
    "guides.chapters.body": "Use recognized headings and fix missing or unexpected table-of-contents entries.",
    "reader.open": "Read online",
    "reader.title": "Online reader",
    "reader.toc": "Contents",
    "reader.font": "Text size",
    "reader.smaller": "Smaller text",
    "reader.larger": "Larger text",
    "reader.theme": "Reading theme",
    "reader.paper": "Paper",
    "reader.light": "Light",
    "reader.dark": "Dark",
    "reader.fullscreen": "Toggle fullscreen",
    "reader.close": "Exit reading mode",
    "reader.content": "Book content",
    "reader.keys": "← → Chapters · Scroll at chapter edges to continue · Esc to exit",
    "reader.search": "Find a chapter",
    "reader.chapters": "Chapters",
    "reader.noMatches": "No matching chapters.",
    "reader.previous": "← Previous",
    "reader.next": "Next →",
    "reader.progress": "Reading progress",
    "reader.chapter": "Chapter {current} of {total}",
    "reader.chapterTitle": "Chapter {number}",
    "reader.loading": "Opening your book…",
    "reader.error": "This book could not be opened. Try a valid, unencrypted EPUB or a readable TXT file.",
    "reader.size": "Choose a book under 50 MB. EPUB resources must each be under 8 MB.",
    "reader.empty": "This file has no readable chapters.",
    "reader.image": "Book illustration",
    "reader.imageUnavailable": "Image unavailable",
    "guides.reader.title": "Online EPUB & TXT reader",
    "guides.reader.body": "Open a book, browse chapters, adjust the reading view, and return to your place.",
    "feature.reader.title": "A little more reading",
    "feature.reader.body": "Read TXT and EPUB with a searchable chapter list, adjustable type, and dark mode. <a href=\"online-reader.html\">Explore the online reader ↗</a>",
    "faq.reader.question": "Can I read without converting?",
    "faq.reader.answer": "Yes. Select a TXT or EPUB, then click Read online above the file workspace. Choose a theme and font size, navigate chapters, and reselect the same file later to resume. <a href=\"online-reader.html\">See how online reading works</a>.",
    "guide.reader.title": "Read TXT and EPUB online.",
    "guide.reader.body": "Select a TXT or EPUB, then click Read online at the top of the workspace. Use Contents to browse or search chapter names, adjust the font, and choose Paper, Light, or Dark. You can read without converting first. On the same browser, reselect the same file to resume your last position. See the <a href=\"online-reader.html\">online reader guide</a> for shortcuts, supported content, and limitations.",
    "app.features": "Online EPUB and TXT reading|Chapter navigation and search|Adjustable font size and reading themes|TXT to EPUB and EPUB to TXT conversion|TXT encoding conversion and editable ebook covers",
    "article.reader.title": "Free Online EPUB & TXT Reader: Chapters & Dark Mode | EpuBloom",
    "article.reader.heading": "Read EPUB and TXT online, in your browser.",
    "article.reader.description": "Open EPUB and TXT without uploading your book. Learn to use chapters, font controls, dark mode, saved reading positions, and Chinese TXT encoding support.",
    "article.reader.action": "Open the online reader ↗",
    "article.reader.body": "<p class=\"note\">Open your own TXT or DRM-free EPUB in your browser. No account is needed, and your book is processed on your device.</p>\n<p>EpuBloom is a free online EPUB and TXT reader as well as an ebook converter. You can read an existing book without converting it, or check your text before creating an EPUB. The reading view offers a chapter list, adjustable type, three themes, and a remembered position on the same browser.</p>\n<h2>1. Open a TXT or EPUB and start reading</h2><ol><li>Go to the <a href=\"index.html#converter\">EpuBloom reader and converter</a>.</li><li>Choose a <code>.txt</code> or <code>.epub</code> file from your device. The maximum file size is 50 MiB, shown as 50 MB in the tool.</li><li>After the file loads, click <strong>Read online</strong> at the top of the file workspace. There is no need to click Convert first.</li><li>Use <strong>Contents</strong> to open the chapter list. Close the reading view to return to the same file and conversion options.</li></ol><p>For a first try, <a href=\"examples/sample-en.txt\" data-sample-link download>download the sample TXT</a>, select it in the tool, and open the reader. Downloading the sample alone does not load it into the workspace.</p>\n<h2>2. Navigate chapters and adjust the reading view</h2><p>Move the pointer to the right edge to reveal chapter contents, or use Contents in the title bar. The panel floats over the page and hides when the pointer leaves. On a phone, tap the right edge or Contents to show it, then tap the text to dismiss it. Search filters chapter names; it is not a full-book text search. Select a result to jump to that chapter.</p><p>Previous and Next move between chapters. On a keyboard, the left and right arrow keys do the same, and Escape closes the reader. Increase or decrease the font size from 14 to 32 pixels, and choose Paper, Light, or Dark to suit your screen. Use the fullscreen button in supported browsers. Collapse the title bar to hide it completely. Move the pointer to the top edge, or tap that edge on a phone, to reveal the controls temporarily. Moving away hides them again; the arrow can keep the title bar visible. Keyboard users can Tab to either edge control to reveal its panel. At the end of a chapter, keep scrolling down to open the next chapter. At its beginning, scroll up to return to the end of the previous chapter. Pause briefly between gestures to avoid skipping chapters with trackpad momentum.</p><p>The progress indicator combines your chapter position and scrolling within that chapter. It is an approximate reading position, rather than the page number in a printed edition.</p>\n<h2>3. Read Chinese TXT and fix encoding problems</h2><p>The reader handles UTF-8, BOM-marked UTF-16 LE and BE, and common legacy Chinese text through GB18030 decoding. GBK and GB2312 overlap with GB18030, so a detected legacy encoding is an estimate rather than a definitive label.</p><p>If the text looks wrong, close the reader and inspect the detected encoding. For a readable legacy Chinese file, use <strong>Convert encoding</strong> to save a separate UTF-8 copy, then select that copy to read it. See the <a href=\"gbk-to-utf8.html\">GBK to UTF-8 instructions</a>. If the source is already garbled or uses another encoding, follow <a href=\"fix-text-encoding.html\">garbled-text troubleshooting</a> and keep the original.</p><p>TXT chapter headings beginning with <code>Chapter </code>, <code>CHAPTER </code>, or <code># </code>, and numbered Chinese chapter headings such as 第一章, become contents entries. Put each heading on its own line. See <a href=\"txt-chapters.html\">chapter-formatting examples</a> if the contents list is missing entries.</p>\n<h2>4. What the EPUB reader preserves</h2><p>EPUB chapters follow the book’s declared reading order. The view displays supported text, headings, emphasis, lists, tables, internal links, and embedded illustrations with consistent reader typography. Publisher fonts, custom styles, and exact page layouts are not reproduced. Image-only books have no selectable text, and there is no OCR or DRM removal.</p><p>Scripts and external images in the book are not loaded. A malformed, encrypted, or unusually large expanded EPUB may be rejected even when the compressed file is below 50 MB. For fixed-layout publications or complex formatting, also check the book in a dedicated ebook reader.</p>\n<h2>5. Resume on the same browser</h2><p>The browser can remember the last position for up to 20 books and your font and theme preferences. After closing or reloading the site, select the same file again to resume. EpuBloom does not keep an online bookshelf, sync between devices, or store the book for later access.</p><p>Saved positions contain a file fingerprint and numeric chapter and scroll values, not the filename, title, author, or book text. Clearing browser site data removes them. Reading still works when storage is unavailable, but the position cannot be remembered. See the <a href=\"privacy.html\">privacy notice</a> for website requests and advertising.</p>\n<h2>Questions about reading and conversion</h2><h3>Do I need to convert TXT to EPUB before reading?</h3><p>No. Choose either supported file type and use Read online directly. To create an ebook for another app, follow the <a href=\"txt-to-epub.html\">TXT to EPUB guide</a>.</p><h3>Does the reader upload my book?</h3><p>No. Book parsing and display happen in your browser. Loading the website and its advertising still makes network requests, as explained in the privacy notice.</p><h3>Can I edit a book in the reading view?</h3><p>The reading view displays the selected source file. Book details and cover edits apply to a later conversion; they do not rewrite the source shown in the reader. Download your converted EPUB and select that file to check the exported result. For editable plain text, use <a href=\"epub-to-txt.html\">EPUB to TXT</a>.</p><h3>Why will my EPUB not open?</h3><p>Check that it is a valid, DRM-free EPUB rather than a renamed ZIP or another format. If it exceeds the file or expanded archive limits, use a smaller edition. Keep the error message and browser version when <a href=\"contact.html\">reporting a problem</a>.</p>",
    "reader.enterFullscreen": "Enter fullscreen",
    "reader.exitFullscreen": "Exit fullscreen",
    "reader.fullscreenUnavailable": "Your browser could not enter fullscreen. You can keep reading here or use the browser’s fullscreen command.",
    "reader.collapseToolbar": "Auto-hide title bar",
    "reader.expandToolbar": "Keep title bar visible",
    "reader.showToolbar": "Show title bar",
    "reader.showToc": "Show chapter contents"
  },
  "zh": {
    "home.title": "TXT 转 EPUB 与 EPUB / TXT 在线阅读器 | EpuBloom",
    "home.description": "免费在线阅读 EPUB、TXT，支持章节目录、字号调整、深色模式与阅读进度记忆。也可 TXT 转 EPUB、EPUB 转 TXT、GBK 转 UTF-8，无需上传书籍或注册。",
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
    "hero.title": "TXT 与 EPUB <em>轻松互转。</em>",
    "hero.description": "在线阅读 TXT 和 EPUB，制作电子书或转换编码，免费在浏览器中完成。",
    "hero.private": "文件留在你的设备",
    "hero.signup": "无需注册",
    "art.caption": "让好文字，有个好归宿。",
    "converter.eyebrow": "文件转换",
    "converter.title": "从一个文件开始",
    "converter.export": "转换与导出",
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
    "cover.addText": "加入书名和作者",
    "cover.textHint": "使用下方书籍信息，点击封面可调整文字位置和大小。",
    "cover.enlarge": "放大预览并编辑封面",
    "cover.textColor": "文字颜色",
    "cover.chooseColor": "选择颜色",
    "cover.hexColor": "自定义颜色",
    "cover.hexHint": "#RRGGBB（六位色值）",
    "cover.colorInvalid": "请输入 #RRGGBB 格式的颜色，例如 #FFFFFF。",
    "cover.editorTitle": "封面预览与排版",
    "cover.close": "关闭预览",
    "cover.editorHint": "选中书名或作者，拖动文字来调整封面排版。",
    "cover.previewHint": "在主页面开启“加入书名和作者”，即可在这里调整文字。",
    "cover.moveTitle": "移动书名。可用方向键精细调整。",
    "cover.resizeTitle": "调整书名字号。可用方向键调整大小。",
    "cover.moveAuthor": "移动作者名。可用方向键精细调整。",
    "cover.resizeAuthor": "调整作者名字号。可用方向键调整大小。",
    "cover.editText": "编辑文字",
    "cover.emptyText": "请先在书籍信息中填写书名或作者，再调整文字排版。",
    "cover.fontSize": "文字大小",
    "cover.resetLayout": "重置排版与颜色",
    "cover.editorHelp": "拖动文字调整位置，拖动右下角调整大小。修改会自动保存。",
    "cover.done": "完成",
    "export.name": "导出文件名",
    "export.preview": "导出：{name}",
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
    "privacy.language.title": "语言与阅读偏好",
    "privacy.language.body": "语言偏好保存在当前浏览器的 localStorage 中。阅读器还会保存字号、主题及最近 20 本书的阅读位置，仅使用文件的单向指纹、章节序号和滚动位置，不保存正文、书名、作者或文件名。重新选择同一文件即可继续阅读；清除本站浏览器数据可删除这些记录。存储不可用时仍可阅读和转换。",
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
    "guide.encoding.body": "在“转换为 EPUB”下方查看当前 TXT 编码，可选择 UTF-8、GBK、GB18030 或带 BOM 的 UTF-16 LE / BE，点击“转换编码”下载独立副本。旧版中文编码显示的是推测结果。可参考<a href=\"gbk-to-utf8.html\">GBK 转 UTF-8 步骤</a>；文字异常时先看<a href=\"fix-text-encoding.html\">乱码排查</a>，不要直接保存乱码。",
    "guide.epub.title": "EPUB 转 TXT：回到文字本身。",
    "guide.epub.body": "选择 EPUB 后转换为 TXT，下载可解析的书名、作者、章节标题和正文。纯文本不保留图片、字体、链接、表格与页面布局，适合文字整理，不适合作为电子书的保真备份。",
    "guide.epub.limits": "不同 EPUB 的结构可能导致文字缺失、实体字符异常或章节顺序不符。纯图片页面无法识别成文字，本工具不提供 OCR 或 DRM 解密。对完整性有要求时，请与原书逐章核对。",
    "guide.faq.title": "常见问题。",
    "guide.private.title": "文件会被上传吗？",
    "guide.private.body": "不会。转换器通过 WebAssembly 在浏览器本地运行。常规网站访问请求仍由服务器处理，详见<a href=\"privacy.html\">隐私说明</a>。",
    "guide.large.title": "为什么大文件会让页面卡顿？",
    "guide.large.body": "最大支持 50 MiB（界面标注为 50 MB）的文件。EPUB 还受解压内容大小限制，因此部分压缩后小于此大小的书籍也可能无法打开。解析与转换会占用设备内存，页面可能短暂停顿，建议先用小文件尝试。支持格式与限制见<a href=\"online-reader.html\">在线阅读指南</a>。",
    "guide.loading.title": "转换器无法加载怎么办？",
    "guide.loading.body": "请使用支持 WebAssembly 的现代浏览器，检查网络后刷新。首次访问需要下载转换模块，断网或资源被拦截都会影响加载。仍有问题时，可以通过<a href=\"contact.html\">联系页面</a>提供浏览器版本和错误提示。",
    "guide.check.title": "怎样检查下载结果？",
    "guide.check.body": "用文本编辑器检查 TXT 的字符、段落和章节顺序；用实际阅读器检查 EPUB 的封面、目录链接和正文。原始文件与转换结果应分别保存。",
    "guide.back": "<a href=\"index.html\">返回转换器 ↗</a>",
    "guide.title": "TXT 与 EPUB 使用指南：在线阅读、转换与编码 | EpuBloom",
    "guide.description": "在浏览器中在线阅读 TXT 与 EPUB，使用章节目录和阅读进度记忆，转换电子书、编辑封面并处理文字编码。",
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
    "guides.title": "阅读更舒适，转换更顺利。",
    "guides.eyebrow": "阅读与转换指南",
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
    "article.txt.body": "<p class=\"note\">适用于自己的写作、笔记或已获授权的文字。无需注册，也无需上传文件。</p><p>TXT 只保存纯文字，EPUB 则增加书籍信息、导航目录和封面，便于在电子书阅读器中阅读。EpuBloom 在浏览器中生成 EPUB 3.3 文件。</p>\n<h2>1. 准备可正常阅读的文本</h2><p>先用文本编辑器打开原文件。如果字符显示异常，请先按照<a href=\"fix-text-encoding.html\">乱码处理指南</a>检查编码，再保存一份 UTF-8 副本用于转换。</p><p>建议将书名与作者放在开头。EpuBloom 在前 20 行中识别中文《书名》、“作者：”，也识别不区分大小写的英文 Title: 和 Author: 标记：</p><pre>《一次小小的出发》\n作者：EpuBloom\n\n第一章 清晨\n窗边放着一本空白笔记。\n\n第二章 河岸\n走一段路，记下沿途的风景。</pre>\n<h2>2. 将章节标题独立成行</h2><p>转换器识别“第一章”等带编号的中文标题，以及以 <code>Chapter </code>、<code>CHAPTER </code> 或 <code># </code> 开头的行。普通正文应避免使用这些开头，以免被误认为章节。</p><p>识别出的标题会成为目录条目。没有可识别标题时，正文放入默认章节；书名、作者行或前言也可能留在正文中，因此需要检查开头页面。</p>\n<h2>3. 选择 TXT 并核对书籍信息</h2><p>打开<a href=\"index.html#converter\">转换器</a>，选择 .txt 文件。展开“书籍信息”，检查自动识别的书名与作者，也可以自行修改。中文书籍的语言代码可填 <code>zh</code>，英文可填 <code>en</code>；它描述的是书籍内容，与网站界面语言相互独立。</p><p>简介、出版社、标识符、出版日期、版权与标签均为选填。标识符可以自行指定，不要求必须是 ISBN。</p>\n<h2>4. 添加封面并下载</h2><p>按需选择封面图片，JPEG 或 PNG 通常便于常见阅读器兼容。如果不提供图片，EpuBloom 会根据书名与作者生成简洁的 SVG 封面。</p><p>点击“转换为 EPUB”后下载，在实际阅读器中检查封面、目录链接、章节顺序和正文。保留原始 TXT：格式转换不会替你校对文字，也不能保证各阅读器中的排版完全一致。</p>\n<p>上传图片会自动适配为 2:3 的 JPEG 封面。可加入书名与作者、选择颜色，再点击图片放大，分别拖动文字调整位置和大小，详见<a href=\"epub-cover.html\">封面排版指南</a>。导出文件名默认跟随书籍信息中的书名，手动修改后保留。目录格式可参考<a href=\"txt-chapters.html\">章节标题示例</a>。</p><h2>先用短示例体验</h2><p>处理长文前，可以<a href=\"examples/sample.txt\" data-sample-link download>下载示例 TXT</a>试用完整流程。需要从电子书提取文字时，查看<a href=\"epub-to-txt.html\">EPUB 转 TXT 指南</a>。文件大小、浏览器要求与常见问题见<a href=\"guide.html\">完整指南</a>。</p><p>转换前可先点击“在线阅读”检查所选原文件。章节跳转、阅读主题与位置记忆的用法见 <a href=\"online-reader.html\">EPUB 与 TXT 在线阅读指南</a>。</p>",
    "article.epub.title": "如何将 EPUB 转为 TXT 并提取电子书文字 | EpuBloom",
    "article.epub.description": "在浏览器本地从 EPUB 提取可编辑的 TXT，了解保留内容、排版损失、章节检查，以及 DRM 与纯图片电子书的限制。",
    "article.epub.heading": "如何将 EPUB 转为 TXT。",
    "article.epub.action": "开始转换 EPUB ↗",
    "article.epub.body": "<p class=\"note\">请处理自己拥有或获准使用的 EPUB。本工具不提供 DRM 解密，也不能识别图片中的文字。</p><p>EPUB 将文字、图片、导航和样式打包成电子书，TXT 则适合在文本编辑器中整理内容。提取文字是一种格式转换，不能替代原书的完整备份。</p>\n<h2>三步提取 EPUB 文字</h2><ol><li>打开<a href=\"index.html#converter\">转换器</a>，选择扩展名为 .epub 的文件。</li><li>点击“转换为 TXT”，文件在浏览器本地读取与处理。</li><li>下载 .txt，用文本编辑器打开检查，并保留原始 EPUB。</li></ol><p>转换方向由扩展名自动确定，提取文字时无需填写书籍信息表单。</p>\n<h2>TXT 中包含什么？</h2><p>输出包括解析器能够提取的书名、作者、章节标题与正文。书籍语言元数据以 <code>zh</code> 开头时，使用中文书名和作者格式；其他语言使用 <code>Title:</code> 与 <code>Author:</code> 标记。</p><pre>《一次小小的出发》\n作者：EpuBloom\n\n第一章 清晨\n窗边放着一本空白笔记。</pre>\n<h2>纯文本会丢失什么？</h2><ul><li>封面、插图及其他图片。</li><li>字体、颜色、页边距和页面布局。</li><li>可点击的链接与可跳转目录。</li><li>表格排版和依赖视觉位置表达的关系。</li></ul><p>换行与提取顺序会受到 EPUB 内部结构影响。对于重要内容，请与原书逐章核对，不能假定所有信息均已保留。</p>\n<h2>转换失败或缺少文字时</h2><p>受 DRM 保护的电子书可能无法读取。纯图片页面没有可直接提取的文本，本工具也不提供 OCR。文件损坏或暂不支持的 EPUB 结构，同样可能造成错误或内容缺失。</p><p>先检查原书能否在阅读器中正常打开。如果原书正常而转换失败，可以通过<a href=\"contact.html\">帮助渠道</a>提供浏览器版本和错误提示。不要把私人电子书或未获授权的完整作品上传到公开问题区。</p>\n<h2>能把 TXT 再转回 EPUB 吗？</h2><p>可以按照<a href=\"txt-to-epub.html\">TXT 转 EPUB 指南</a>重新准备章节、书籍信息和封面。这会生成一本新的电子书，无法只凭纯文本恢复原来的图片与排版。</p><p>转换前可先点击“在线阅读”检查所选原文件。章节跳转、阅读主题与位置记忆的用法见 <a href=\"online-reader.html\">EPUB 与 TXT 在线阅读指南</a>。</p>",
    "article.encoding.title": "TXT 转 EPUB 前如何解决乱码：UTF-8、UTF-16 与 GBK | EpuBloom",
    "article.encoding.description": "排查 TXT 转 EPUB 时的文字乱码，了解 UTF-8、UTF-16 与 GBK 检测方式，保留原文件，并另存可读的 UTF-8 副本。",
    "article.encoding.heading": "先解决乱码，再转换电子书。",
    "article.encoding.action": "打开转换器 ↗",
    "article.encoding.body": "<p class=\"note\">始终保留一份未修改的原文件。反复保存乱码文本，可能造成无法恢复的字符丢失。</p><p>文本文件保存的是字节，编码规则决定编辑器如何把字节还原成文字。用错误编码读取文件时，可能看到无意义字符或 � 这样的替换符号。</p>\n<h2>EpuBloom 如何读取 TXT？</h2><ol><li>文件存在字节顺序标记（BOM）时，识别 UTF-8、UTF-16LE 和 UTF-16BE。</li><li>没有 BOM 时，先检查字节是否为有效的 UTF-8。</li><li>UTF-8 校验失败时严格尝试 GB18030，界面显示为 GBK / GB18030（推测）。</li></ol><p>这是按顺序尝试的处理方式，不能保证识别所有编码。其他历史编码，以及不带 BOM 的 UTF-16 文件，可能需要先用编辑器正确打开并另存。</p>\n<h2>使用内置编码转换器</h2><p>如果检测到的来源编码正确，可在“转换为 EPUB”下方的目标编码中选择 UTF-8，点击“转换编码”，立即下载独立的 TXT 副本。<a href=\"gbk-to-utf8.html\">GBK 转 UTF-8 指南</a>提供命名规则、字节示例与无法表示的字符说明。来源编码不受支持或结果不对时，再按下方编辑器流程处理。</p><h2>保存一份可读的 UTF-8 副本</h2><ol><li>用支持指定读取编码的文本编辑器打开原始 TXT。</li><li>如果乱码，重新打开未修改的原文件，尝试来源对应的编码。较早的中文文件可能使用 GBK；如果知道来源软件的编码设置，以实际来源为准。</li><li>检查多个段落、标点和章节标题，确保文字可正常阅读后再保存。</li><li>使用“另存为”或编辑器的编码设置，保存一份新的 UTF-8 文件。</li><li>在<a href=\"index.html#converter\">转换器</a>中选择新文件，生成 EPUB，再用阅读器检查。</li></ol>\n<h2>“重新打开”和“转换编码”不同</h2><p>使用指定编码重新打开，是换一种规则解释原始字节；另存为 UTF-8，则把编辑器当前显示的字符写入新文件。如果当前显示已经乱码，直接保存为 UTF-8 可能把乱码固定下来，而不是修复它。</p><p>如果唯一副本中的字符已经丢失，或被保存成替换符号，切换编码也无法可靠还原。请查找备份，或重新获取原始文件。</p>\n<h2>文字正常，但电子书效果不对？</h2><p>如果字符正确、目录缺少章节，请检查<a href=\"txt-to-epub.html\">章节标题格式</a>。如果从 EPUB 提取文字后丢失图片或表格排版，这是<a href=\"epub-to-txt.html\">纯文本格式的限制</a>，不一定是编码错误。</p><p>需要帮助时，通过<a href=\"contact.html\">联系渠道</a>说明来源编码、浏览器和可见错误。可公开的简短示例比完整的私人稿件更合适。</p>",
    "breadcrumb.label": "当前位置",
    "breadcrumb.home": "首页",
    "article.byline": "由 EpuBloom 编写",
    "article.contents": "本页内容",
    "related.title": "继续阅读转换指南",
    "share.alt": "EpuBloom：在浏览器中阅读 TXT、EPUB 与转换电子书",
    "article.gbk.title": "GBK 转 UTF-8 在线工具：转换中文 TXT 编码 | EpuBloom",
    "article.gbk.description": "在浏览器本地将 GBK、GB18030 中文 TXT 转为 UTF-8，了解当前编码提示、目标编码选择、下载命名和乱码检查方法。无需上传文件。",
    "article.gbk.heading": "将 GBK 转为 UTF-8，保留原来的文字。",
    "article.gbk.action": "开始转换 TXT 编码 ↗",
    "article.gbk.body": "<p class=\"note\">这里转换的是 TXT 的字符编码，不是翻译正文，也不是生成 EPUB。请保留原始文件。</p><p>较早的中文文本可能使用 GBK、GB2312 或 GB18030。需要在不同编辑器与设备间使用时，可以另存一份 UTF-8。EpuBloom 在浏览器本地读取支持的编码，下载新的文本副本。</p>\n<h2>四步将中文 TXT 转为 UTF-8</h2><ol><li>打开<a href=\"index.html#converter\">TXT 转换器</a>，选择原始 <code>.txt</code> 文件。</li><li>在“转换为 EPUB”下方查看“当前 TXT 编码”。旧版中文文件可能显示“GBK / GB18030（推测）”。</li><li>在“转换为”中选择 <strong>UTF-8</strong>，点击<strong>转换编码</strong>。</li><li>打开下载的 <code>.utf8.txt</code> 副本，对照原文件检查书名、多个段落、标点和末尾内容。</li></ol>\n<p>副本沿用“导出文件名”。例如名称填写“阅读笔记”，会得到 <code>阅读笔记.utf8.txt</code>。编码转换会直接下载 TXT，不会覆盖已经生成的 EPUB 转换结果。</p>\n<h2>编码转换到底改变了什么？</h2><p>正常情况下，文字不变，保存文字的字节发生变化。以<strong>中文</strong>二字为例，十六进制字节如下：</p><div class=\"table-scroll\"><table><thead><tr><th>编码</th><th>“中文”的字节</th></tr></thead><tbody><tr><td>GBK</td><td><code>D6 D0 CE C4</code></td></tr><tr><td>UTF-8</td><td><code>E4 B8 AD E6 96 87</code></td></tr></tbody></table></div>\n<p>把 <code>书籍.txt</code> 重命名为 <code>书籍.utf8.txt</code> 只改文件名，不会转换编码。转换按钮会先读取字符，再写入目标字节。UTF-8 副本不带 BOM；UTF-16 LE / BE 副本会带 BOM。</p>\n<h2>为什么当前编码显示“推测”？</h2><p>工具优先识别 UTF-8、UTF-16 的 BOM，然后严格验证 UTF-8，最后尝试 GB18030。GBK 与 GB2312 的字节也可能符合 GB18030，因此没有 BOM 时无法可靠细分这几种编码。即使字节可以解码，也不代表每个字符一定符合原作者的意图。</p><p>如果来源是 Big5、Shift-JIS 等其他编码，请先用能指定读取编码的编辑器处理，本工具没有提供这些目标编码。<a href=\"fix-text-encoding.html\">乱码排查指南</a>说明了“重新打开原始字节”与“保存已经乱码的文字”的区别。</p>\n<h2>UTF-8 能反向转为 GBK 吗？</h2><p>可以，目标编码选择 GBK 即可。但 GBK 无法表示一些字符，例如许多 emoji。遇到这种情况，工具会停止下载，不会静默替换；可改选 UTF-8 或 GB18030。下载成功后仍应核对实际内容。</p>\n<h2>哪些乱码无法通过转换恢复？</h2><p>如果此前保存时已经把缺失字符变成 <code>?</code> 或 <code>�</code>，编码转换无法还原原文，需要找未修改的备份。若工具提示无法读取，请先确认来源编码，不要反复保存乱码副本。</p>\n<h2>下一步：制作可阅读的电子书</h2><p>文字正确后，可以按照<a href=\"txt-to-epub.html\">TXT 转 EPUB 指南</a>制作电子书，并参考<a href=\"txt-chapters.html\">章节标题示例</a>生成可跳转目录。单独转换编码不会增加目录、书籍信息或封面。</p>",
    "guides.gbk.title": "GBK 转 UTF-8",
    "guides.gbk.body": "把旧版中文 TXT 另存为 UTF-8，了解编码提示、字节变化和检查方法。",
    "article.coverGuide.title": "EPUB 封面制作：添加书名作者、调整文字位置与颜色 | EpuBloom",
    "article.coverGuide.description": "TXT 转 EPUB 时制作 2:3 电子书封面，自动适配图片，放大预览，拖动书名和作者调整位置、字号与颜色，再导出 EPUB。",
    "article.coverGuide.heading": "制作带书名和作者的 EPUB 封面。",
    "article.coverGuide.action": "开始制作 EPUB 封面 ↗",
    "article.coverGuide.body": "<p class=\"note\">封面编辑用于 TXT 转 EPUB 的过程，为新生成的电子书制作封面，不直接替换已有 EPUB 内的封面。</p><p>方形图片放进书库后，可能比旁边的竖版书籍明显矮一截。EpuBloom 将上传图片适配为统一的 2:3 竖版画布，并允许在导出前加入可移动的书名与作者文字。</p>\n<h2>1. 选择 TXT，填写书籍信息</h2><p>打开<a href=\"index.html#converter\">转换器</a>，选择 TXT，展开“书籍信息”。核对书名和作者，包括自动识别的内容。这两个字段同时用于封面文字和 EPUB 元数据。导出文件名默认跟随书名；自行修改文件名后会保留手动命名。</p>\n<h2>2. 添加图片，选择适配方式</h2><p>在书籍封面卡片点击“选择图片”。可使用 JPG、PNG、WebP 等浏览器能读取的图片，大小不超过 20 MB、像素不超过 4000 万。工具在浏览器内生成 1200 × 1800 的 JPEG。</p><div class=\"table-scroll\"><table><thead><tr><th>方式</th><th>效果</th><th>适合情况</th></tr></thead><tbody><tr><td>完整保留</td><td>保留全部画面，空白区域用原图的模糊背景补齐。</td><td>边缘包含人物、细节或已有文字。</td></tr><tr><td>铺满封面</td><td>居中裁剪，让图片填满竖版画布。</td><td>主体在中央，能够接受裁掉边缘。</td></tr></tbody></table></div><p>两种方式均不会将原图拉伸变形。选择裁剪方式前，先检查预览中的主体是否完整。</p>\n<h2>3. 加入书名和作者，选择颜色</h2><p>开启“加入书名和作者”，文字取自书籍信息。如果原图已经印有书名，可保持关闭，避免重复。主卡片的颜色选择器会同时设置两段文字；自定义颜色可填写六位色值，例如 <code>#243E30</code>。</p>\n<h2>4. 点击封面，放大调整排版</h2><ol><li>点击封面缩略图，打开大图预览。</li><li>选择“书名”或“作者”，也可以点击对应的文字框。</li><li>拖动文字调整位置；拖动右下角调整大小，或使用“文字大小”滑杆。</li><li>为当前选中的文字选择颜色。书名和作者可以使用不同颜色。</li><li>点击“完成”回到转换器，排版保留到本次转换。</li></ol><p>也可聚焦文字框后用方向键移动，聚焦右下角后用方向键调整大小；按住 Shift 可加大步幅。文字会自动换行并限制在画布内，特别长的文字可能缩小或以省略号结尾。</p>\n<h2>5. 导出后检查实际电子书</h2><p>点击“转换为 EPUB”并下载。导出的 JPEG 保留预览中的文字、位置、字号与颜色，不包含编辑框。封面变化后需要重新转换，才能更新 EPUB。建议在实际阅读器中同时查看书库缩略图和完整封面。</p>\n<h2>常见封面问题</h2><ul><li><strong>文字不够清晰：</strong>选择与背景对比明显的颜色，避开纹理复杂的位置。</li><li><strong>图片被裁掉太多：</strong>改选“完整保留”。</li><li><strong>没有显示文字：</strong>填写书名或作者，并开启文字开关。</li><li><strong>想重新排版：</strong>在大图预览中点击“重置排版与颜色”。</li><li><strong>只想保留图片：</strong>关闭文字开关；在同一次转换中重新开启，会保留此前排版。</li></ul><p>不添加图片时，工具会根据书名和作者生成简洁的 SVG 封面。正文部分可继续参考<a href=\"txt-chapters.html\">章节格式指南</a>和<a href=\"txt-to-epub.html\">完整的 TXT 转 EPUB 指南</a>。</p>",
    "guides.coverGuide.title": "EPUB 封面排版",
    "guides.coverGuide.body": "适配封面图片，选择文字颜色，拖动调整书名、作者的位置和大小。",
    "article.chapters.title": "TXT 转 EPUB 自动分章与目录：章节标题格式示例 | EpuBloom",
    "article.chapters.description": "为 TXT 转 EPUB 准备可识别的中英文章节标题，查看自动分章格式、下载示例，排查目录缺少章节或多出开头章节的问题。",
    "article.chapters.heading": "整理 TXT 章节标题，生成可跳转的 EPUB 目录。",
    "article.chapters.action": "开始生成 EPUB 目录 ↗",
    "article.chapters.body": "<p class=\"note\">目录来自 TXT 中的章节标题，不是页码列表。每个章节标题应单独占一行。</p><p>纯文本没有内置章节结构。EpuBloom 会检查去掉首尾空白后的每一行，按支持的标题格式分章，再将标题写入 EPUB 导航目录。</p>\n<h2>转换器能识别哪些标题？</h2><div class=\"table-scroll\"><table><thead><tr><th>TXT 中的一行</th><th>是否识别</th><th>原因</th></tr></thead><tbody><tr><td><code>第一章 清晨</code></td><td>是</td><td>中文编号加“章”。</td></tr><tr><td><code>第2节 河岸</code></td><td>是</td><td>阿拉伯数字加“节”。</td></tr><tr><td><code>Chapter 1 — Morning</code></td><td>是</td><td>以 <code>Chapter </code> 开头，包含空格。</td></tr><tr><td><code>CHAPTER 2 — River</code></td><td>是</td><td>支持全大写前缀。</td></tr><tr><td><code># 后记</code></td><td>是</td><td>井号后紧跟空格。</td></tr><tr><td><code>chapter 1</code> / <code>Chapter1</code></td><td>否</td><td>全小写或缺少空格。</td></tr><tr><td><code>1. 清晨</code></td><td>否</td><td>单纯编号不属于章节标记。</td></tr></tbody></table></div>\n<p>中文编号可使用阿拉伯数字或支持的中文数字，后接“章、节、部、卷、篇、集”。正文如果也以相同格式开头，可能被误认为标题；工具按规则识别，不理解句子含义。为避免误分章，不要把这些开头用于普通正文。</p>\n<h2>可以直接复制的小示例</h2><pre>《河岸笔记》\n作者：EpuBloom\n\n第一章 清晨\n窗边放着一本空白笔记。\n\n第二章 河岸\n我们在桥边停下脚步。\n\n# 后记\n明天还有新的故事。</pre><p>可<a href=\"examples/chapters-zh.txt\" download>下载章节格式示例</a>，在<a href=\"index.html#converter\">转换器</a>中选择它，将书籍语言设为 <code>zh</code>，核对书名与作者后生成 EPUB。</p>\n<h2>目录为什么缺少某章？</h2><p>检查标题开头、大小写和空格。标题如果接在正文段落末尾，就不是独立的一行。请使用明确支持的格式；普通数字、装饰分隔线或看似加粗的特殊字符都不会自动产生章节。</p><p>完全没有可识别标题时，工具会使用默认章节。书籍语言以 <code>zh</code> 开头时为“第1章”，其他语言为“Chapter 1”。网站界面语言不会翻译原来的章节名。</p>\n<h2>为什么开头多出一个章节？</h2><p>第一个明确标题之前的文字可能成为开头章节。用于识别书籍信息的书名与作者行，也可能继续保留在正文中。检查开头页面；若不需要重复的书名块，可在 TXT 副本中移除，并在表单里保留所需的书名与作者。</p>\n<h2>导出后怎样核对目录？</h2><ol><li>用实际阅读器打开 EPUB。</li><li>查看目录中的章节标题与先后顺序。</li><li>点击多个目录链接，确认跳转到对应的标题。</li><li>对照 TXT 检查正文开头、中间和末尾。</li></ol><p>封面的图片和文字排版可参考<a href=\"epub-cover.html\">封面制作指南</a>。如果章节名称本身乱码，请先处理<a href=\"fix-text-encoding.html\">文本编码</a>。完整流程见<a href=\"txt-to-epub.html\">TXT 转 EPUB 指南</a>。</p><p>转换前可先点击“在线阅读”检查所选原文件。章节跳转、阅读主题与位置记忆的用法见 <a href=\"online-reader.html\">EPUB 与 TXT 在线阅读指南</a>。</p>",
    "guides.chapters.title": "自动分章与目录",
    "guides.chapters.body": "使用可识别的章节标题，排查目录缺项、误识别和多出的开头章节。",
    "reader.open": "在线阅读",
    "reader.title": "在线阅读",
    "reader.toc": "章节目录",
    "reader.font": "正文字号",
    "reader.smaller": "缩小字号",
    "reader.larger": "放大字号",
    "reader.theme": "阅读主题",
    "reader.paper": "纸张",
    "reader.light": "明亮",
    "reader.dark": "夜间",
    "reader.fullscreen": "切换全屏",
    "reader.close": "退出阅读模式",
    "reader.content": "书籍正文",
    "reader.keys": "← → 切换章节 · 章末/章首继续滚动可跨章 · Esc 退出",
    "reader.search": "查找章节",
    "reader.chapters": "章节",
    "reader.noMatches": "没有匹配的章节。",
    "reader.previous": "← 上一章",
    "reader.next": "下一章 →",
    "reader.progress": "阅读进度",
    "reader.chapter": "第 {current} / {total} 章",
    "reader.chapterTitle": "第 {number} 章",
    "reader.loading": "正在打开书籍……",
    "reader.error": "无法打开这本书，请选择有效、未加密的 EPUB 或编码可识别的 TXT 文件。",
    "reader.size": "请选择小于 50 MB 的书籍；EPUB 中每个资源须小于 8 MB。",
    "reader.empty": "文件中没有可阅读的章节。",
    "reader.image": "书籍插图",
    "reader.imageUnavailable": "图片暂不可用",
    "guides.reader.title": "EPUB 与 TXT 在线阅读",
    "guides.reader.body": "打开书籍、浏览章节、调整字号与主题，了解如何继续上次阅读。",
    "feature.reader.title": "打开就能读",
    "feature.reader.body": "在线阅读 TXT 与 EPUB，搜索章节目录、调整字号或切换深色主题。<a href=\"online-reader.html\">了解在线阅读 ↗</a>",
    "faq.reader.question": "不转换也能直接阅读吗？",
    "faq.reader.answer": "可以。选择 TXT 或 EPUB 后，点击文件工作区上方的“在线阅读”，即可调整主题和字号、跳转章节；下次重新选择同一文件可继续阅读。<a href=\"online-reader.html\">查看在线阅读说明</a>。",
    "guide.reader.title": "在线阅读 TXT 与 EPUB。",
    "guide.reader.body": "选择 TXT 或 EPUB 后，点击工作区上方的“在线阅读”。通过目录浏览或搜索章节名称，调整字号，选择纸张、明亮或深色主题，不用先转换文件。同一浏览器中重新选择同一文件，可继续上次阅读。快捷键、内容支持和限制见<a href=\"online-reader.html\">在线阅读指南</a>。",
    "app.features": "EPUB 与 TXT 在线阅读|章节目录与章节搜索|字号调整与阅读主题|TXT 转 EPUB 与 EPUB 转 TXT|TXT 编码转换与电子书封面编辑",
    "article.reader.title": "EPUB / TXT 在线阅读器：目录、深色模式与进度 | EpuBloom",
    "article.reader.heading": "在浏览器中在线阅读 EPUB 与 TXT。",
    "article.reader.description": "免费打开 EPUB 与 TXT，无需上传书籍。了解章节目录、字号调整、深色模式、阅读进度记忆和中文 TXT 编码支持。",
    "article.reader.action": "打开在线阅读器 ↗",
    "article.reader.body": "<p class=\"note\">直接在浏览器中打开自己的 TXT 或无 DRM 保护的 EPUB。无需注册，书籍文件在你的设备上处理。</p>\n<p>EpuBloom 既是免费 TXT 与 EPUB 在线阅读器，也能转换电子书。已有电子书可以直接阅读，TXT 也可以先检查内容再制作 EPUB。阅读模式提供章节目录、字体大小、三种主题和同一浏览器内的阅读位置记忆。</p>\n<h2>1. 选择 TXT 或 EPUB，开始在线阅读</h2><ol><li>打开 <a href=\"index.html#converter\">EpuBloom 在线阅读与转换工具</a>。</li><li>从设备中选择 <code>.txt</code> 或 <code>.epub</code> 文件，最大支持 50 MiB，界面标注为 50 MB。</li><li>文件加载后，点击文件工作区上方的<strong>在线阅读</strong>，不用先点击转换。</li><li>通过<strong>目录</strong>展开章节列表。关闭阅读模式后，仍可继续处理当前文件和转换选项。</li></ol><p>第一次使用可以先<a href=\"examples/sample-en.txt\" data-sample-link download>下载示例 TXT</a>，在工具中选择它，再打开阅读模式。下载示例本身不会自动载入文件。</p>\n<h2>2. 使用目录，调整字体和阅读主题</h2><p>鼠标移到最右侧边缘即可呼出章节目录，也可点击标题栏的“目录”。目录浮在正文上方，移开鼠标后收回，不挤占正文宽度。手机上可轻点右侧边缘或“目录”呼出，再轻点正文收回。搜索框筛选的是章节名称，不是全文搜索。点击章节即可跳转。</p><p>“上一章”和“下一章”用于切换章节。键盘左右方向键也可以翻章，Esc 退出阅读。字号可在 14 至 32 像素之间调整，并可选择纸张、明亮或深色主题。支持全屏功能的浏览器可以点击全屏按钮。收起后整条标题栏会完全隐藏，鼠标移到顶部边缘或在手机上轻点顶部边缘可临时呼出，移开后再次隐藏；点击箭头可恢复固定显示。键盘用户可通过 Tab 聚焦边缘入口来呼出面板。在章末继续向下滚动可进入下一章；在章首继续向上滚动可回到上一章末尾。两次手势间短暂停顿，可以避免触控板惯性连续跳章。</p><p>阅读进度结合当前章节和章内滚动位置估算，不对应纸质书页码。</p>\n<h2>3. 阅读中文 TXT，处理 GBK 与乱码</h2><p>阅读器支持 UTF-8、带 BOM 的 UTF-16 LE / BE，并通过 GB18030 解码兼容常见旧版中文文本。GBK、GB2312 与 GB18030 的字节范围存在重叠，因此旧版中文编码提示是估计值，不能精确区分所有文件。</p><p>如果文字不正常，先退出阅读模式，检查检测到的编码。对于能正确显示的旧版中文 TXT，可以通过<strong>转换编码</strong>另存为 UTF-8，再选择新文件阅读。具体操作见 <a href=\"gbk-to-utf8.html\">GBK 转 UTF-8 教程</a>。如果原文件已经乱码或使用其他编码，先按<a href=\"fix-text-encoding.html\">乱码排查指南</a>检查，并保留原文件。</p><p>以 <code>Chapter </code>、<code>CHAPTER </code>、<code># </code> 开头，以及“第一章”等可识别的中文章节标题会形成目录。每个标题应单独占一行。如果目录有缺项，可以参考 <a href=\"txt-chapters.html\">TXT 自动分章与目录示例</a>。</p>\n<h2>4. EPUB 在线阅读保留哪些内容</h2><p>EPUB 按书籍声明的阅读顺序展示章节，支持文字、标题、强调、列表、表格、内部链接和书内插图，采用统一的阅读排版。原书的字体、自定义样式和精确页面布局不会完整复现。纯图片页面没有可选择的文字，也不提供 OCR 或 DRM 解密。</p><p>书内脚本和外部图片不会加载。损坏、加密或解压体积过大的 EPUB，即使压缩文件小于 50 MB，也可能无法打开。固定版式出版物或复杂排版书籍，建议同时在专用电子书阅读器中核对。</p>\n<h2>5. 在同一浏览器继续上次阅读</h2><p>浏览器可以记住最多 20 本书的阅读位置，以及字体与主题偏好。关闭或刷新网站后，需要重新选择同一个文件才能继续阅读。EpuBloom 不会建立在线书架、跨设备同步，也不会替你保存书籍文件。</p><p>位置记录只包含文件指纹、章节序号和滚动比例等信息，不保存文件名、书名、作者或正文。清除浏览器网站数据会删除这些记录。浏览器存储不可用时仍可阅读，但无法记住位置。网站请求和广告说明见<a href=\"privacy.html\">隐私说明</a>。</p>\n<h2>关于在线阅读与转换的常见问题</h2><h3>TXT 必须转成 EPUB 才能阅读吗？</h3><p>不用。选择 TXT 或 EPUB 后都可以直接点击“在线阅读”。如果要制作供其他软件阅读的电子书，可以按 <a href=\"txt-to-epub.html\">TXT 转 EPUB 教程</a>导出。</p><h3>在线阅读会上传我的书吗？</h3><p>不会。书籍解析和展示在浏览器本地完成。网站页面及广告资源加载仍会产生网络请求，具体见隐私说明。</p><h3>阅读模式能编辑书籍吗？</h3><p>阅读模式展示的是所选原文件。书籍信息与封面修改用于之后的转换，不会改写阅读器中的原文。下载转换后的 EPUB，再选择该文件，就能检查实际导出结果。需要可编辑的纯文本时，可以使用 <a href=\"epub-to-txt.html\">EPUB 转 TXT</a>。</p><h3>为什么有些 EPUB 打不开？</h3><p>请确认文件是有效、无 DRM 保护的 EPUB，而不是改了后缀的 ZIP 或其他格式。文件或解压内容超过限制时，可尝试较小的版本。向我们<a href=\"contact.html\">反馈问题</a>时，请保留错误提示和浏览器版本。</p>",
    "reader.enterFullscreen": "进入全屏",
    "reader.exitFullscreen": "退出全屏",
    "reader.fullscreenUnavailable": "浏览器暂时无法进入全屏，你可以继续阅读，或使用浏览器菜单中的全屏功能。",
    "reader.collapseToolbar": "自动隐藏标题栏",
    "reader.expandToolbar": "固定显示标题栏",
    "reader.showToolbar": "显示标题栏",
    "reader.showToc": "显示章节目录"
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
try { const saved = localStorage.getItem('epubloom.language'); if (!document.documentElement.dataset.language && supported.includes(saved)) language = saved; } catch { /* Published language URLs take precedence over stored preferences. */ }

export function getLanguage() { return language; }
export function t(key, values = {}) {
  const message = messages[language][key] ?? messages.en[key] ?? key;
  return message.replace(/\{(\w+)\}/g, (match, name) => Object.hasOwn(values, name) ? String(values[name]) : match);
}


const pageNames = ['index.html', 'guide.html', 'about.html', 'contact.html', 'privacy.html', 'txt-to-epub.html', 'epub-to-txt.html', 'fix-text-encoding.html', 'gbk-to-utf8.html', 'epub-cover.html', 'txt-chapters.html', 'online-reader.html'];

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
    if (item['@type'] === 'WebPage' && item.breadcrumb) item.breadcrumb = { '@id': canonical + '#breadcrumb' };
    if (item['@type'] === 'Article') Object.assign(item, {
      '@id': canonical + '#article', headline: document.querySelector('main h1').textContent,
      description, inLanguage: language === 'zh' ? 'zh-CN' : 'en', mainEntityOfPage: { '@id': canonical + '#webpage' },
    });
    if (item['@type'] === 'BreadcrumbList') Object.assign(item, {
      '@id': canonical + '#breadcrumb', itemListElement: [...document.querySelectorAll('[data-breadcrumb-item]')].map((node, index) => ({
        '@type': 'ListItem', position: index + 1, name: node.textContent,
        item: node.tagName === 'A' ? node.href : canonical,
      })),
    });
    if (item['@type'] === 'WebApplication') Object.assign(item, { url: canonical, description, inLanguage: language === 'zh' ? 'zh-CN' : 'en', featureList: t('app.features').split('|'), softwareHelp: new URL(prefix + 'online-reader.html', location.origin).href });
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
  const toc = document.querySelector('.article-toc ol');
  if (toc) {
    toc.replaceChildren();
    document.querySelectorAll('main article h2').forEach((heading, index) => {
      heading.id = 'section-' + (index + 1);
      const item = document.createElement('li'), link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      item.append(link);
      toc.append(item);
    });
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
