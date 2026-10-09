#!/usr/bin/env python3
"""Package only public assets; optionally add AdSense ownership verification."""
import html
import os
from pathlib import Path
import re
import shutil
from urllib.parse import urlsplit
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
PAGES = ("index.html", "guide.html", "about.html", "contact.html", "privacy.html")


def main():
    site_url = os.environ.get("SITE_URL", "https://ficbase.github.io/transmute-web/").strip()
    parts = urlsplit(site_url)
    if (parts.scheme != "https" or not parts.hostname or parts.query or parts.fragment
            or parts.username or parts.password or re.search(r"[\s<>\"']", site_url)):
        raise SystemExit("SITE_URL must be a public HTTPS base URL without query, fragment or credentials")
    site_url = site_url.rstrip("/") + "/"
    publisher = os.environ.get("ADSENSE_PUBLISHER_ID", "").strip()
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
    for page in PAGES:
        canonical = site_url if page == "index.html" else site_url + page
        tags = f'<link rel="canonical" href="{html.escape(canonical, quote=True)}">'
        if publisher:
            tags += f'\n  <meta name="google-adsense-account" content="{publisher}">'
        source = (ROOT / page).read_text(encoding="utf-8")
        if source.count("<!-- site-metadata -->") != 1:
            raise SystemExit(f"Missing or duplicate site metadata marker in {page}")
        (output / page).write_text(source.replace("<!-- site-metadata -->", tags), encoding="utf-8")
    shutil.copy2(ROOT / "site.css", output / "site.css")
    shutil.copytree(ROOT / "examples", output / "examples")
    (output / "pkg").mkdir()
    for file in (js, wasm):
        shutil.copy2(file, output / "pkg" / file.name)
    (output / ".nojekyll").touch()
    locations = [site_url if p == "index.html" else site_url + p for p in PAGES]
    entries = "".join(f"  <url><loc>{escape(url)}</loc></url>\n" for url in locations)
    (output / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries + '</urlset>\n',
        encoding="utf-8")
    (output / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\nSitemap: {site_url}sitemap.xml\n", encoding="utf-8")
    if publisher:
        (output / "ads.txt").write_text(
            f"google.com, {publisher.removeprefix('ca-')}, DIRECT, f08c47fec0942fa0\n", encoding="utf-8")
    print(f"Public site prepared in {output} ({site_url})")


if __name__ == "__main__":
    main()
