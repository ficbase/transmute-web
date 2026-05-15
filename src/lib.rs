//! transmute-web — browser-side txt↔epub converter via WebAssembly
//!
//! Based on [transmute](https://github.com/ficbase/transmute).

use std::collections::HashMap;
use std::io::{self, Read, Write};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;
use zip::read::ZipArchive;
use zip::write::SimpleFileOptions;
use zip::{CompressionMethod, ZipWriter};

// ── EPUB document model ──────────────────────────────────────────────

#[derive(Debug, Clone, Default)]
pub struct Metadata {
    pub title: String,
    pub author: String,
    pub language: String,
    pub identifier: String,
    pub extra: HashMap<String, String>,
}

#[derive(Debug, Clone)]
pub struct CoverImage {
    pub data: Vec<u8>,
    pub media_type: String,
    pub file_name: String,
}

#[derive(Debug, Clone)]
pub struct Chapter {
    pub title: String,
    pub body: String,
}

#[derive(Debug, Clone)]
pub struct Book {
    pub metadata: Metadata,
    pub chapters: Vec<Chapter>,
    pub cover: Option<CoverImage>,
}

// ── EPUB 3.3 constants ───────────────────────────────────────────────

const MIMETYPE: &str = "application/epub+zip";
const CONTAINER_XML: &str = "\
<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<container version=\"1.0\" xmlns=\"urn:oasis:names:tc:opendocument:xmlns:container\">
  <rootfiles>
    <rootfile full-path=\"OEBPS/content.opf\" media-type=\"application/oebps-package+xml\"/>
  </rootfiles>
</container>";

// ── WASM exports ─────────────────────────────────────────────────────

/// Test: create a minimal 1-chapter EPUB to verify WASM infrastructure.
#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub fn wasm_test() -> Vec<u8> {
    let book = Book {
        metadata: Metadata {
            title: "Test".into(),
            author: "Author".into(),
            language: "en".into(),
            ..Default::default()
        },
        chapters: vec![Chapter {
            title: "Chapter 1".into(),
            body: "Hello, world!".into(),
        }],
        cover: None,
    };
    let mut buf = io::Cursor::new(Vec::new());
    match write_epub(&book, &mut buf) {
        Ok(()) => buf.into_inner(),
        Err(e) => {
            #[cfg(target_arch = "wasm32")]
            wasm_bindgen::throw_str(&format!("wasm_test failed: {e}"));
            #[cfg(not(target_arch = "wasm32"))]
            panic!("wasm_test failed: {e}");
        }
    }
}

/// Return version string to verify correct WASM loaded.
#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub fn version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

/// Initialize panic hook for better error messages in browser console.
#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub fn init_panic_hook() {
    #[cfg(target_arch = "wasm32")]
    console_error_panic_hook::set_once();
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub fn txt_to_epub(
    txt: &str,
    cover_data: Option<Vec<u8>>,
    cover_type: Option<String>,
    cover_name: Option<String>,
) -> Vec<u8> {
    let author = extract_author(txt);
    let title = extract_title(txt).unwrap_or_else(|| "untitled".into());
    let chapters = split_into_chapters(txt);

    let cover = cover_data.map(|data| CoverImage {
        data,
        media_type: cover_type.unwrap_or_else(|| "image/jpeg".into()),
        file_name: cover_name.unwrap_or_else(|| "cover.jpg".into()),
    });

    let book = Book {
        metadata: Metadata {
            title,
            author,
            language: "zh".into(),
            ..Default::default()
        },
        chapters,
        cover,
    };

    let mut buf = io::Cursor::new(Vec::new());
    match write_epub(&book, &mut buf) {
        Ok(()) => buf.into_inner(),
        Err(e) => {
            #[cfg(target_arch = "wasm32")]
            wasm_bindgen::throw_str(&format!("EPUB generation failed: {e}"));
            #[cfg(not(target_arch = "wasm32"))]
            panic!("EPUB generation failed: {e}");
        }
    }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub fn epub_to_txt(epub_data: &[u8]) -> String {
    let cursor = io::Cursor::new(epub_data.to_vec());
    match parse_epub(cursor) {
        Ok(book) => {
            let mut txt = String::new();
            if !book.metadata.title.is_empty() {
                txt.push_str(&format!("《{}》\n", book.metadata.title));
            }
            if !book.metadata.author.is_empty() {
                txt.push_str(&format!("作者：{}\n", book.metadata.author));
            }
            txt.push('\n');

            for ch in &book.chapters {
                txt.push_str(&format!("{}\n\n", ch.title));
                let body = strip_html(&ch.body);
                txt.push_str(body.trim());
                txt.push_str("\n\n");
            }
            txt
        }
        Err(_) => String::from("[Error: 无法解析 EPUB 文件]"),
    }
}

// ── EPUB writer ──────────────────────────────────────────────────────

fn write_epub<W: Write + io::Seek>(book: &Book, writer: W) -> Result<(), Error> {
    let metadata = &book.metadata;
    let chapters = &book.chapters;

    let uid = if metadata.identifier.is_empty() {
        uuid_v4()
    } else {
        metadata.identifier.clone()
    };

    let chapter_ids: Vec<String> = (0..chapters.len())
        .map(|i| format!("chapter{}", i + 1))
        .collect();

    let cover = book.cover.clone().or_else(|| {
        Some(CoverImage {
            data: generate_cover_svg(&metadata.title, &metadata.author).into_bytes(),
            media_type: "image/svg+xml".into(),
            file_name: "cover.svg".into(),
        })
    });

    let opf = make_opf(metadata, &uid, &chapter_ids, cover.as_ref());
    let nav = make_nav(metadata, chapters, &chapter_ids);

    let mut xhtmls: Vec<(String, String)> = Vec::new();
    for (i, ch) in chapters.iter().enumerate() {
        let id = &chapter_ids[i];
        let body_html = text_to_html(&ch.body);
        let xhtml = make_chapter_xhtml(&ch.title, &body_html);
        xhtmls.push((format!("OEBPS/{}.xhtml", id), xhtml));
    }

    let cover_xhtml = cover.as_ref().map(|c| {
        let cover_path = format!("images/{}", c.file_name);
        make_cover_xhtml(&metadata.title, &cover_path)
    });

    let mut zip = ZipWriter::new(writer);

    let store_opts = SimpleFileOptions::default().compression_method(CompressionMethod::Stored);
    zip.start_file("mimetype", store_opts)?;
    zip.write_all(MIMETYPE.as_bytes())?;

    let deflate_opts = SimpleFileOptions::default().compression_method(CompressionMethod::Deflated);
    zip.start_file("META-INF/container.xml", deflate_opts)?;
    zip.write_all(CONTAINER_XML.as_bytes())?;

    if let Some(ref c) = cover {
        let cover_path = format!("OEBPS/images/{}", c.file_name);
        zip.start_file(&cover_path, store_opts)?;
        zip.write_all(&c.data)?;
    }

    if let Some(ref cx) = cover_xhtml {
        zip.start_file("OEBPS/cover.xhtml", deflate_opts)?;
        zip.write_all(cx.as_bytes())?;
    }

    zip.start_file("OEBPS/content.opf", deflate_opts)?;
    zip.write_all(opf.as_bytes())?;

    zip.start_file("OEBPS/nav.xhtml", deflate_opts)?;
    zip.write_all(nav.as_bytes())?;

    for (path, content) in &xhtmls {
        zip.start_file(path.as_str(), deflate_opts)?;
        zip.write_all(content.as_bytes())?;
    }

    zip.finish()?;
    Ok(())
}

// ── EPUB → Book parser ───────────────────────────────────────────────

fn parse_epub<R: Read + io::Seek>(reader: R) -> Result<Book, Error> {
    let mut zip = ZipArchive::new(reader)?;

    let opf_path = {
        let container = read_zip_entry(&mut zip, "META-INF/container.xml")?;
        find_opf_path(&container)
    };

    let opf_xml = read_zip_entry(&mut zip, &opf_path)?;
    let (metadata, spine, manifest) = parse_opf(&opf_xml);

    let mut chapters = Vec::new();
    for idref in &spine {
        let href = manifest.get(idref).cloned().unwrap_or_default();
        let xhtml = read_zip_entry(&mut zip, &href).ok().unwrap_or_default();
        let (title, body) = parse_xhtml(&xhtml);
        chapters.push(Chapter { title, body });
    }

    Ok(Book {
        metadata,
        chapters,
        cover: None,
    })
}

fn read_zip_entry(zip: &mut ZipArchive<impl Read + io::Seek>, name: &str) -> Result<String, Error> {
    let candidates = [
        name.to_string(),
        format!("OEBPS/{}", name.trim_start_matches("OEBPS/")),
    ];
    for c in &candidates {
        if let Ok(mut f) = zip.by_name(c) {
            let mut buf = String::new();
            f.read_to_string(&mut buf)?;
            return Ok(buf);
        }
    }
    Err(Error::Io(io::Error::new(
        io::ErrorKind::NotFound,
        format!("entry not found: {}", name),
    )))
}

fn find_opf_path(container_xml: &str) -> String {
    for line in container_xml.lines() {
        if let Some(start) = line.find("full-path=\"") {
            let rest = &line[start + 11..];
            if let Some(end) = rest.find('"') {
                return rest[..end].to_string();
            }
        }
    }
    "OEBPS/content.opf".to_string()
}

fn parse_opf(xml: &str) -> (Metadata, Vec<String>, HashMap<String, String>) {
    let mut meta = Metadata::default();
    let mut spine = Vec::new();
    let mut manifest: HashMap<String, String> = HashMap::new();

    for line in xml.lines() {
        let t = line.trim();
        if let Some(val) = extract_xml_content(t, "dc:title") {
            meta.title = val;
        } else if let Some(val) = extract_xml_content(t, "dc:creator") {
            meta.author = val;
        } else if let Some(val) = extract_xml_content(t, "dc:language") {
            meta.language = val;
        } else if let Some(val) = extract_xml_content(t, "dc:identifier") {
            meta.identifier = val;
        } else if let Some(idref) = extract_attr(t, "itemref", "idref") {
            if idref != "cover" && idref != "nav" {
                spine.push(idref);
            }
        } else if let Some(id) = extract_attr(t, "item", "id") {
            if let Some(href) = extract_attr(t, "item", "href") {
                manifest.insert(id, format!("OEBPS/{}", href));
            }
        }
    }
    (meta, spine, manifest)
}

fn extract_xml_content(line: &str, tag: &str) -> Option<String> {
    let open = format!("<{}", tag);
    let close = format!("</{}>", tag);
    let line = line.trim();
    if let Some(open_pos) = line.find(&open) {
        let after_open = &line[open_pos..];
        let tag_end = after_open.find('>')?;
        let content_start = open_pos + tag_end + 1;
        if let Some(close_pos) = line[content_start..].find(&close) {
            let content = line[content_start..content_start + close_pos].trim();
            if !content.is_empty() {
                return Some(content.to_string());
            }
        }
    }
    None
}

fn extract_attr(line: &str, tag: &str, attr: &str) -> Option<String> {
    let line = line.trim();
    let tag_start = format!("<{} ", tag);
    if !line.starts_with(&tag_start) && !line.starts_with(&format!("<{tag}>")) {
        if !line.starts_with(&format!("<{tag} ")) {
            return None;
        }
    }
    let search = format!("{}=\"", attr);
    if let Some(pos) = line.find(&search) {
        let rest = &line[pos + search.len()..];
        if let Some(end) = rest.find('"') {
            return Some(rest[..end].to_string());
        }
    }
    None
}

fn parse_xhtml(xhtml: &str) -> (String, String) {
    let title = extract_xml_content(xhtml, "title").or_else(|| {
        xhtml
            .find("<h1>")
            .and_then(|s| {
                let rest = &xhtml[s + 4..];
                rest.find("</h1>").map(|e| rest[..e].to_string())
            })
    }).unwrap_or_default();

    let body = html_to_text(xhtml);
    (title, body)
}

fn html_to_text(html: &str) -> String {
    let squashed = html.replace('\n', " ");
    let mut out = String::with_capacity(squashed.len());
    let mut skip = 0u32;
    for c in squashed.chars() {
        if c == '<' { skip += 1; }
        if skip == 0 { out.push(c); }
        if c == '>' && skip > 0 { skip -= 1; }
    }
    let mut result = String::with_capacity(out.len());
    let mut prev = '\0';
    for c in out.chars() {
        if c == ' ' && prev == ' ' { continue; }
        result.push(c);
        prev = c;
    }
    collapse_newlines(result.trim())
}

fn collapse_newlines(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    let mut newlines = 0;
    for c in s.chars() {
        if c == '\n' {
            newlines += 1;
            if newlines <= 2 { out.push(c); }
        } else {
            newlines = 0;
            out.push(c);
        }
    }
    out.trim().to_string()
}

// ── Text → HTML helpers ──────────────────────────────────────────────

fn text_to_html(text: &str) -> String {
    let mut out = String::with_capacity(text.len() + text.len() / 5);
    let paragraphs: Vec<&str> = text.split("\n\n").collect();
    let last = paragraphs.len().saturating_sub(1);
    for (i, p) in paragraphs.iter().enumerate() {
        let body = p.trim_end_matches(|c: char| c == '\n' || c == '\r');
        if body.is_empty() { continue; }
        out.push_str("<p>");
        let lines: Vec<&str> = body.split('\n').collect();
        let ll = lines.len().saturating_sub(1);
        for (j, line) in lines.iter().enumerate() {
            out.push_str(&escape_xml(line));
            if j < ll { out.push_str("<br/>\n"); }
        }
        out.push_str("</p>");
        if i < last { out.push('\n'); }
    }
    out
}

fn escape_xml(s: &str) -> String {
    let mut escaped = String::with_capacity(s.len());
    for c in s.chars() {
        match c {
            '&' => escaped.push_str("&amp;"),
            '<' => escaped.push_str("&lt;"),
            '>' => escaped.push_str("&gt;"),
            _ => escaped.push(c),
        }
    }
    escaped
}

// ── EPUB 3 XML generators ───────────────────────────────────────────

fn make_opf(meta: &Metadata, uid: &str, chapter_ids: &[String], cover: Option<&CoverImage>) -> String {
    let lang = if meta.language.is_empty() { "en" } else { &meta.language };
    let title = escape_xml(&meta.title);
    let author = escape_xml(&meta.author);

    let mut manifest = String::new();
    let mut spine = String::new();

    if let Some(ci) = cover {
        let img_href = format!("images/{}", ci.file_name);
        let mime = escape_xml(&ci.media_type);
        manifest.push_str(&format!(
            "    <item id=\"cover-image\" href=\"{img_href}\" media-type=\"{mime}\" properties=\"cover-image\"/>\n"
        ));
        manifest.push_str(
            "    <item id=\"cover\" href=\"cover.xhtml\" media-type=\"application/xhtml+xml\"/>\n",
        );
    }
    manifest.push_str(
        "    <item id=\"nav\" href=\"nav.xhtml\" media-type=\"application/xhtml+xml\" properties=\"nav\"/>\n",
    );
    for id in chapter_ids {
        manifest.push_str(&format!(
            "    <item id=\"{}\" href=\"{}.xhtml\" media-type=\"application/xhtml+xml\"/>\n", id, id
        ));
        spine.push_str(&format!("    <itemref idref=\"{}\" linear=\"yes\"/>\n", id));
    }

    if cover.is_some() {
        let mut new_spine = String::from("    <itemref idref=\"cover\" linear=\"no\"/>\n");
        new_spine.push_str(&spine);
        spine = new_spine;
    }

    let extra_meta: String = meta.extra.iter()
        .map(|(k, v)| format!("    <meta property=\"{k}\">{v}</meta>\n", k = k, v = escape_xml(v)))
        .collect();

    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
<package version="3.0" unique-identifier="BookId"
         xmlns="http://www.idpf.org/2007/opf"
         prefix="rendition: http://www.idpf.org/vocab/rendition/#">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="BookId">{uid}</dc:identifier>
    <dc:title>{title}</dc:title>
    <dc:creator id="author">{author}</dc:creator>
    <dc:language>{lang}</dc:language>
    <meta property="dcterms:modified">{modified}</meta>
{extra_meta}  </metadata>
  <manifest>
{manifest}  </manifest>
  <spine>
{spine}  </spine>
</package>"#,
        modified = iso8601_now()
    )
}

fn make_nav(meta: &Metadata, chapters: &[Chapter], chapter_ids: &[String]) -> String {
    let title = escape_xml(&meta.title);
    let mut ol = String::from("    <ol>\n");
    for (i, ch) in chapters.iter().enumerate() {
        let id = &chapter_ids[i];
        let ch_title = escape_xml(&ch.title);
        ol.push_str(&format!("      <li><a href=\"{id}.xhtml\">{ch_title}</a></li>\n"));
    }
    ol.push_str("    </ol>");
    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>{title}</title>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>{title}</h1>
{ol}
  </nav>
</body>
</html>"#
    )
}

fn make_cover_xhtml(title: &str, img_path: &str) -> String {
    let title = escape_xml(title);
    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>Cover</title>
</head>
<body>
  <div style="text-align:center;">
    <img src="{img_path}" alt="{title}" style="max-width:100%;"/>
  </div>
</body>
</html>"#
    )
}

fn make_chapter_xhtml(title: &str, body: &str) -> String {
    let title = escape_xml(title);
    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>{title}</title>
</head>
<body>
  <h1>{title}</h1>
{body}
</body>
</html>"#
    )
}

// ── Auto-generated SVG cover ─────────────────────────────────────────

fn generate_cover_svg(title: &str, author: &str) -> String {
    let t = escape_xml(title);
    let a = escape_xml(author);
    let bg = "#1a1a2e";
    let fg = "#e8e8e8";
    let sub = "#999999";
    let author_block = if author.is_empty() {
        String::new()
    } else {
        format!("  <text x=\"400\" y=\"530\" font-family=\"serif\" font-size=\"24\" fill=\"{sub}\" text-anchor=\"middle\">{a}</text>")
    };
    format!(
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"800\" height=\"1200\"\n\
     viewBox=\"0 0 800 1200\">\n\
  <rect width=\"800\" height=\"1200\" fill=\"{bg}\"/>\n\
  <text x=\"400\" y=\"450\" font-family=\"serif\" font-size=\"36\"\n\
        fill=\"{fg}\" text-anchor=\"middle\">{t}</text>\n\
{author_block}\n\
</svg>"
    )
}

// ── ISO 8601 timestamp ───────────────────────────────────────────────

fn iso8601_now() -> String {
    #[cfg(target_arch = "wasm32")]
    let secs: u64 = {
        let ms = js_sys::Date::new_0().get_time() as u64;
        ms / 1000
    };
    #[cfg(not(target_arch = "wasm32"))]
    let secs: u64 = {
        use std::time::SystemTime;
        SystemTime::now()
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap_or_default()
            .as_secs()
    };
    let days = secs / 86400;
    let time = secs % 86400;
    let h = time / 3600;
    let m = (time % 3600) / 60;
    let s = time % 60;
    let (y, mo, d) = days_to_ymd(days);
    format!("{y:04}-{mo:02}-{d:02}T{h:02}:{m:02}:{s:02}Z")
}

fn days_to_ymd(mut days: u64) -> (u64, u8, u8) {
    days += 719_162;
    let era = days / 146_097;
    let doe = days - era * 146_097;
    let yoe = (doe - doe / 1460 + doe / 36524 - doe / 146_096) / 365;
    let y = yoe + era * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = doy - (153 * mp + 2) / 5 + 1;
    let m = if mp < 10 { mp + 3 } else { mp - 9 };
    let y = if m <= 2 { y + 1 } else { y };
    (y, m as u8, d as u8)
}

// ── UUID v4 ──────────────────────────────────────────────────────────

fn uuid_v4() -> String {
    let mut rng = Lcg::new();
    let bytes: [u8; 16] = std::array::from_fn(|_| rng.next());
    let mut s = String::with_capacity(36);
    for (idx, &b) in bytes.iter().enumerate() {
        if idx == 4 || idx == 6 || idx == 8 || idx == 10 { s.push('-'); }
        if idx == 6 {
            s.push(HEX[((0x40 | (b & 0x0f)) >> 4) as usize] as char);
            s.push(HEX[((0x40 | (b & 0x0f)) & 0x0f) as usize] as char);
        } else if idx == 8 {
            s.push(HEX[((0x80 | (b & 0x3f)) >> 4) as usize] as char);
            s.push(HEX[((0x80 | (b & 0x3f)) & 0x0f) as usize] as char);
        } else {
            s.push(HEX[(b >> 4) as usize] as char);
            s.push(HEX[(b & 0x0f) as usize] as char);
        }
    }
    s
}

const HEX: &[u8; 16] = b"0123456789abcdef";

struct Lcg { state: u64 }
impl Lcg {
    fn new() -> Self {
        #[cfg(target_arch = "wasm32")]
        let seed = (js_sys::Math::random() * u64::MAX as f64) as u64;
        #[cfg(not(target_arch = "wasm32"))]
        let seed = {
            use std::time::{SystemTime, UNIX_EPOCH};
            SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .map(|d| d.as_nanos() as u64)
                .unwrap_or(42)
        };
        Self { state: seed ^ 0xDEADBEEFCAFE0000 }
    }
    fn next(&mut self) -> u8 {
        self.state = self.state.wrapping_mul(6364136223846793005).wrapping_add(1);
        (self.state >> 32) as u8
    }
}

// ── Error ────────────────────────────────────────────────────────────

#[derive(Debug)]
enum Error {
    Io(io::Error),
    Zip(zip::result::ZipError),
}

impl From<io::Error> for Error { fn from(e: io::Error) -> Self { Error::Io(e) } }
impl From<zip::result::ZipError> for Error { fn from(e: zip::result::ZipError) -> Self { Error::Zip(e) } }

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Error::Io(e) => write!(f, "I/O error: {}", e),
            Error::Zip(e) => write!(f, "ZIP error: {}", e),
        }
    }
}

impl std::error::Error for Error {}

// ── Chapter detection (from transmute CLI) ───────────────────────────

fn split_into_chapters(text: &str) -> Vec<Chapter> {
    let mut chapters: Vec<Chapter> = Vec::new();
    let mut current_title = String::from("第1章");
    let mut current_body = String::new();
    let mut first = true;

    for line in text.lines() {
        let trimmed = line.trim();
        if is_chapter_heading(trimmed) {
            if !first {
                chapters.push(Chapter {
                    title: current_title.clone(),
                    body: std::mem::take(&mut current_body),
                });
            }
            current_title = trimmed.to_string();
            first = false;
        } else {
            if !current_body.is_empty() { current_body.push('\n'); }
            current_body.push_str(line);
        }
    }

    if !first || !current_body.is_empty() {
        if current_title.is_empty() { current_title = "第1章".into(); }
        chapters.push(Chapter { title: current_title, body: current_body });
    }
    chapters
}

fn is_chapter_heading(line: &str) -> bool {
    if line.starts_with("# ") { return true; }
    if line.starts_with("Chapter ") || line.starts_with("CHAPTER ") { return true; }
    let mut chars = line.chars();
    if chars.next() != Some('第') { return false; }
    let mut skipped = false;
    for c in chars.by_ref() {
        if c.is_ascii_digit() {
            skipped = true;
        } else if is_cn_digit(c) {
            skipped = true;
        } else if skipped
            && (c == '章' || c == '节' || c == '部' || c == '卷' || c == '篇' || c == '集')
        {
            let next = chars.next();
            return next != Some('分');
        } else {
            return false;
        }
    }
    false
}

fn is_cn_digit(c: char) -> bool {
    matches!(c, '零'|'一'|'二'|'三'|'四'|'五'|'六'|'七'|'八'|'九'|'十'|'百'|'千'|'万'|'两'|'〇')
}

fn extract_author(text: &str) -> String {
    for line in text.lines().take(20) {
        for sep in ["作者：", "作者:"] {
            if let Some(pos) = line.find(sep) {
                let author = line[pos + sep.len()..].trim();
                if !author.is_empty() { return author.to_string(); }
            }
        }
    }
    String::new()
}

fn extract_title(text: &str) -> Option<String> {
    for line in text.lines().take(20) {
        let trimmed = line.trim();
        if let Some(rest) = trimmed.strip_prefix('《') {
            if let Some(title) = rest.split('》').next() {
                if !title.is_empty() { return Some(title.to_string()); }
            }
        }
    }
    None
}

fn strip_html(html: &str) -> String {
    let mut out = String::with_capacity(html.len());
    let mut skip = 0u32;
    for c in html.chars() {
        if c == '<' { skip += 1; }
        if skip == 0 { out.push(c); }
        if c == '>' && skip > 0 { skip -= 1; }
    }
    let mut result = String::with_capacity(out.len());
    let mut prev = '\0';
    for c in out.chars() {
        if c == ' ' && prev == ' ' { continue; }
        result.push(c);
        prev = c;
    }
    result.trim().to_string()
}
