#!/usr/bin/env python3
"""Package only public assets; optionally connect the site to AdSense."""
import html
import hashlib
from site_html import page_path, render_page, translations
import os
from pathlib import Path
import re
import shutil
from urllib.parse import urlsplit
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
PAGES = ("index.html", "guide.html", "about.html", "contact.html", "privacy.html",
         "txt-to-epub.html", "epub-to-txt.html", "fix-text-encoding.html",
         "gbk-to-utf8.html", "epub-cover.html", "txt-chapters.html", "online-reader.html")


def main():
    site_url = os.environ.get("SITE_URL", "https://ficbase.github.io/transmute-web/").strip()
    parts = urlsplit(site_url)
    if (parts.scheme != "https" or not parts.hostname or parts.query or parts.fragment
            or parts.username or parts.password or re.search(r"[\s<>\"']", site_url)):
        raise SystemExit("SITE_URL must be a public HTTPS base URL without query, fragment or credentials")
    site_url = site_url.rstrip("/") + "/"
    publisher = os.environ.get("ADSENSE_PUBLISHER_ID", "").strip()
    noindex = os.environ.get("SITE_NOINDEX", "0") == "1"
    # The public verification code must survive subsequent production builds.
    verification_file = ROOT / "baidu-site-verification.txt"
    baidu_verification = os.environ.get("BAIDU_SITE_VERIFICATION")
    if baidu_verification is None:
        baidu_verification = verification_file.read_text(encoding="utf-8") if verification_file.is_file() else ""
    baidu_verification = baidu_verification.strip()
    if baidu_verification and not re.fullmatch(r"[A-Za-z0-9_-]{1,128}", baidu_verification):
        raise SystemExit("BAIDU_SITE_VERIFICATION must contain only the verification tag's content value")
    if publisher and not re.fullmatch(r"ca-pub-\d{16}", publisher):
        raise SystemExit("ADSENSE_PUBLISHER_ID must have the form ca-pub- followed by 16 digits")
    if publisher and parts.path.strip("/"):
        raise SystemExit("AdSense needs ads.txt at the hostname root; configure a root-domain SITE_URL first")
    wasm = ROOT / "pkg/transmute_web_bg.wasm"
    js = ROOT / "pkg/transmute_web.js"
    if not wasm.is_file() or not js.is_file():
        raise SystemExit("Build WASM first: wasm-pack build --target web")
    output = ROOT / "dist"
    if output.exists():
        shutil.rmtree(output)
    output.mkdir()
    # Fingerprint module dependencies as well as page assets so an existing
    # browser cannot mix the old UI or WASM with a newly deployed page.
    versions = {}
    def write_asset(name, data):
        target = output / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        versions[name] = hashlib.sha256(data).hexdigest()[:12]

    write_asset("pkg/transmute_web_bg.wasm", wasm.read_bytes())
    module = js.read_text(encoding="utf-8").replace(
        "transmute_web_bg.wasm'", f"transmute_web_bg.wasm?v={versions['pkg/transmute_web_bg.wasm']}'")
    write_asset("pkg/transmute_web.js", module.encode("utf-8"))
    for name in ("site.css", "favicon.svg", "i18n.js"):
        write_asset(name, (ROOT / name).read_bytes())
    write_asset("assets/social-card.png", (ROOT / "assets/social-card.png").read_bytes())
    editor = (ROOT / "cover-editor.js").read_text(encoding="utf-8").replace(
        "'./i18n.js'", f"'./i18n.js?v={versions['i18n.js']}'")
    write_asset("cover-editor.js", editor.encode("utf-8"))
    reader = (ROOT / "reader.js").read_text(encoding="utf-8")
    for name in ("i18n.js", "pkg/transmute_web.js"):
        reader = reader.replace(f"'./{name}'", f"'./{name}?v={versions[name]}'")
    write_asset("reader.js", reader.encode("utf-8"))
    converter = (ROOT / "converter.js").read_text(encoding="utf-8")
    for name in ("i18n.js", "cover-editor.js", "reader.js", "pkg/transmute_web.js"):
        converter = converter.replace(f"'./{name}'", f"'./{name}?v={versions[name]}'")
    write_asset("converter.js", converter.encode("utf-8"))
    messages = translations((ROOT / "i18n.js").read_text(encoding="utf-8"))
    for page in PAGES:
        source = (ROOT / page).read_text(encoding="utf-8")
        if source.count("<!-- site-metadata -->") != 1:
            raise SystemExit(f"Missing or duplicate site metadata marker in {page}")
        tags = ''
        if baidu_verification and not noindex:
            tags = f'<meta name="baidu-site-verification" content="{baidu_verification}">'
        if publisher:
            tags += f'<meta name="google-adsense-account" content="{publisher}">'
            tags += (f'\n  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={publisher}"'
                     ' crossorigin="anonymous"></script>')
        source = source.replace("<!-- site-metadata -->", tags)
        for language in ("en", "zh"):
            target = output / (("zh/" if language == "zh" else "") + page)
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(render_page(source, page, language, messages, site_url, PAGES, versions, noindex=noindex), encoding="utf-8")
    shutil.copytree(ROOT / "examples", output / "examples")
    (output / ".nojekyll").touch()
    def write_sitemap(name, languages, alternates):
        entries = ''
        for language in languages:
            for page in PAGES:
                url = site_url + page_path(page, language)
                links = ''.join(f'<xhtml:link rel="alternate" hreflang="{code}" href="{html.escape(site_url + page_path(page, locale), quote=True)}"/>'
                                for code, locale in (("en", "en"), ("zh-Hans", "zh"), ("x-default", "en"))) if alternates else ''
                entries += f"  <url><loc>{escape(url)}</loc>{links}</url>\n"
        namespace = ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' if alternates else ''
        (output / name).write_text(
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' + namespace + '>\n' + entries + '</urlset>\n',
            encoding="utf-8")

    write_sitemap("sitemap.xml", ("en", "zh"), alternates=True)
    write_sitemap("sitemap-zh.xml", ("zh",), alternates=False)
    # A canonical Chinese URL per line, ready for the platform's manual submission.
    (output / "baidu-urls.txt").write_text(
        ''.join(site_url + page_path(page, "zh") + "\n" for page in PAGES), encoding="utf-8")
    (output / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\nSitemap: {site_url}sitemap.xml\nSitemap: {site_url}sitemap-zh.xml\n", encoding="utf-8")
    if publisher:
        (output / "ads.txt").write_text(
            f"google.com, {publisher.removeprefix('ca-')}, DIRECT, f08c47fec0942fa0\n", encoding="utf-8")
    print(f"Public site prepared in {output} ({site_url})")


if __name__ == "__main__":
    main()
