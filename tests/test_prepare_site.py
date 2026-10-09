"""Exercise public packaging and dependency cache invalidation without WASM tooling."""
import hashlib
import json
import re
import xml.etree.ElementTree as ET
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest


class PrepareSiteTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / 'scripts').mkdir()
        repo = Path(__file__).resolve().parents[1]
        for script in ('prepare-site.py', 'site_html.py'):
            shutil.copy2(repo / 'scripts' / script, self.root / 'scripts' / script)
        self.pages = ('index.html', 'guide.html', 'about.html', 'contact.html', 'privacy.html',
                      'txt-to-epub.html', 'epub-to-txt.html', 'fix-text-encoding.html',
                      'gbk-to-utf8.html', 'epub-cover.html', 'txt-chapters.html', 'online-reader.html')
        for page in self.pages:
            shutil.copy2(repo / page, self.root / page)
        shutil.copy2(repo / 'i18n.js', self.root / 'i18n.js')
        for name, text in {'site.css': 'body { color: green; }', 'favicon.svg': '<svg/>',
                           'cover-editor.js': "import './i18n.js';",
                           'reader.js': "import './i18n.js'; import './pkg/transmute_web.js';",
                           'converter.js': "import './i18n.js'; import './cover-editor.js'; import './reader.js'; import './pkg/transmute_web.js';"}.items():
            (self.root / name).write_text(text)
        (self.root / 'pkg').mkdir()
        (self.root / 'pkg/transmute_web.js').write_text("new URL('transmute_web_bg.wasm', import.meta.url)")
        (self.root / 'pkg/transmute_web_bg.wasm').write_bytes(b'test-wasm')
        (self.root / 'examples').mkdir()
        (self.root / 'examples/sample.txt').write_text('示例')
        (self.root / 'examples/sample-en.txt').write_text('sample')
        (self.root / 'assets').mkdir()
        shutil.copy2(repo / 'assets/social-card.png', self.root / 'assets/social-card.png')
        (self.root / '.key').write_text('private-test-fixture')

    def build(self, publisher='', site_url='https://epubloom.com/', noindex=False, baidu_verification=None):
        environment = dict(os.environ, SITE_URL=site_url, ADSENSE_PUBLISHER_ID=publisher, SITE_NOINDEX='1' if noindex else '0')
        environment.pop('BAIDU_SITE_VERIFICATION', None)
        if baidu_verification is not None:
            environment['BAIDU_SITE_VERIFICATION'] = baidu_verification
        subprocess.run([sys.executable, str(self.root / 'scripts/prepare-site.py')], env=environment, check=True, capture_output=True)
        return self.root / 'dist'

    @staticmethod
    def version(path):
        return hashlib.sha256(path.read_bytes()).hexdigest()[:12]

    def test_publishes_only_public_assets_and_optional_adsense_metadata(self):
        output = self.build('ca-pub-1234567890123456')
        public = {str(path.relative_to(output)) for path in output.rglob('*') if path.is_file()}
        self.assertEqual(public, {
            *self.pages, *('zh/' + page for page in self.pages),
            'site.css', 'favicon.svg', 'converter.js', 'cover-editor.js', 'reader.js', 'i18n.js', 'examples/sample.txt', 'examples/sample-en.txt',
            'assets/social-card.png',
            'pkg/transmute_web.js', 'pkg/transmute_web_bg.wasm', 'robots.txt',
            'sitemap.xml', 'sitemap-zh.xml', 'baidu-urls.txt', '.nojekyll', 'ads.txt',
        })
        for page in (*self.pages, *('zh/' + p for p in self.pages)):
            head = (output / page).read_text().split('</head>')[0]
            self.assertIn('google-adsense-account', head)
            self.assertEqual(head.count('adsbygoogle.js?client=ca-pub-1234567890123456'), 1)
            self.assertIn('<script async src="https://pagead2.googlesyndication.com/', head)
            self.assertIn('crossorigin="anonymous"', head)
        self.assertIn('pub-1234567890123456', (output / 'ads.txt').read_text())
        self.build()
        self.assertFalse((output / 'ads.txt').exists())
        self.assertNotIn('google-adsense-account', (output / 'index.html').read_text())
        self.assertNotIn('adsbygoogle.js', (output / 'index.html').read_text())
        self.assertNotIn('content="noindex', (output / 'index.html').read_text())
        self.build(site_url='https://ficbase.github.io/transmute-web/', noindex=True)
        for page in ('index.html', 'zh/index.html', 'gbk-to-utf8.html'):
            self.assertIn('content="noindex, follow, max-image-preview:large"', (output / page).read_text())

    def test_baidu_submission_files_and_verification_are_scoped_to_the_build(self):
        for site_url in ('https://epubloom.com/', 'https://ficbase.github.io/transmute-web/'):
            output = self.build(site_url=site_url, baidu_verification='code-Test_123')
            expected = [site_url + 'zh/' + ('' if page == 'index.html' else page) for page in self.pages]
            urls = [node.text for node in ET.parse(output / 'sitemap-zh.xml').findall('.//{*}loc')]
            self.assertEqual(urls, expected)
            self.assertEqual((output / 'baidu-urls.txt').read_text().splitlines(), expected)
            self.assertEqual(len(urls), len(set(urls)))
            self.assertIn('Sitemap: ' + site_url + 'sitemap-zh.xml', (output / 'robots.txt').read_text())
            for page in (*self.pages, *('zh/' + p for p in self.pages)):
                head = (output / page).read_text().split('</head>')[0]
                self.assertEqual(head.count('<meta name="baidu-site-verification" content="code-Test_123">'), 1)
            self.build(site_url=site_url, noindex=True, baidu_verification='code-Test_123')
            self.assertNotIn('baidu-site-verification', (output / 'index.html').read_text())
            self.build(site_url=site_url)
            self.assertNotIn('baidu-site-verification', (output / 'index.html').read_text())
        with self.assertRaises(subprocess.CalledProcessError):
            self.build(baidu_verification='"><script>invalid</script>')

    def test_persisted_public_verification_survives_builds_and_can_be_overridden(self):
        verification = self.root / 'baidu-site-verification.txt'
        verification.write_text('code-Persisted_123\n')
        output = self.build()
        for page in (*self.pages, *('zh/' + p for p in self.pages)):
            self.assertIn('name="baidu-site-verification" content="code-Persisted_123"', (output / page).read_text().split('</head>')[0])
        self.assertFalse((output / verification.name).exists())
        self.build(baidu_verification='code-Override')
        self.assertIn('content="code-Override"', (output / 'index.html').read_text())
        self.build(baidu_verification='')
        self.assertNotIn('baidu-site-verification', (output / 'index.html').read_text())
        self.build(site_url='https://ficbase.github.io/transmute-web/', noindex=True)
        for page in (*self.pages, *('zh/' + p for p in self.pages)):
            self.assertNotIn('baidu-site-verification', (output / page).read_text())
        verification.write_text('<invalid>')
        with self.assertRaises(subprocess.CalledProcessError):
            self.build()

    def test_translation_and_wasm_changes_propagate_through_module_versions(self):
        output = self.build()
        first_converter = self.version(output / 'converter.js')
        first_module = self.version(output / 'pkg/transmute_web.js')
        first_css = self.version(output / 'site.css')
        self.assertIn(f"./i18n.js?v={self.version(output / 'i18n.js')}", (output / 'converter.js').read_text())
        self.assertIn(f"./i18n.js?v={self.version(output / 'i18n.js')}", (output / 'cover-editor.js').read_text())
        self.assertIn(f"./cover-editor.js?v={self.version(output / 'cover-editor.js')}", (output / 'converter.js').read_text())
        self.assertIn(f"transmute_web_bg.wasm?v={self.version(output / 'pkg/transmute_web_bg.wasm')}", (output / 'pkg/transmute_web.js').read_text())
        translation = self.root / 'i18n.js'
        translation.write_text(translation.read_text().replace('Free TXT to EPUB', 'Updated free TXT to EPUB', 1))
        (self.root / 'pkg/transmute_web_bg.wasm').write_bytes(b'new-test-wasm')
        self.build()
        self.assertNotEqual(first_converter, self.version(output / 'converter.js'))
        self.assertNotEqual(first_module, self.version(output / 'pkg/transmute_web.js'))
        self.assertEqual(first_css, self.version(output / 'site.css'))
        self.assertIn(f'converter.js?v={self.version(output / "converter.js")}', (output / 'index.html').read_text())
        self.assertIn(f'./pkg/transmute_web.js?v={self.version(output / "pkg/transmute_web.js")}', (output / 'converter.js').read_text())
        self.assertIn(f"./reader.js?v={self.version(output / 'reader.js')}", (output / 'converter.js').read_text())
        self.assertIn(f"./pkg/transmute_web.js?v={self.version(output / 'pkg/transmute_web.js')}", (output / 'reader.js').read_text())
        previous_reader = self.version(output / 'reader.js')
        previous_converter = self.version(output / 'converter.js')
        (self.root / 'reader.js').write_text("import './i18n.js'; import './pkg/transmute_web.js'; // updated reader")
        self.build()
        self.assertNotEqual(previous_reader, self.version(output / 'reader.js'))
        self.assertNotEqual(previous_converter, self.version(output / 'converter.js'))

        previous_converter = self.version(output / 'converter.js')
        (self.root / 'cover-editor.js').write_text("import './i18n.js'; // updated editor")
        self.build()
        self.assertNotEqual(previous_converter, self.version(output / 'converter.js'))

    def test_localized_static_pages_have_consistent_search_metadata(self):
        for site_url in ('https://epubloom.com/', 'https://ficbase.github.io/transmute-web/'):
            output = self.build(site_url=site_url)
            locations = {node.text for node in ET.parse(output / 'sitemap.xml').findall('.//{*}loc')}
            self.assertEqual(len(locations), 24)
            sitemap = ET.parse(output / 'sitemap.xml')
            for node in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url'):
                alternates = node.findall('{http://www.w3.org/1999/xhtml}link')
                self.assertEqual({link.attrib['hreflang'] for link in alternates}, {'en', 'zh-Hans', 'x-default'})
            titles = set()
            for language, prefix in (('en', ''), ('zh', 'zh/')):
                for page in self.pages:
                    path = prefix + ('' if page == 'index.html' else page)
                    canonical = site_url + path
                    source = (output / (prefix + page)).read_text()
                    self.assertIn(canonical, locations)
                    self.assertIn(f'<link rel="canonical" href="{canonical}">', source)
                    self.assertIn('hreflang="en"', source)
                    self.assertIn('hreflang="zh-Hans"', source)
                    self.assertIn('hreflang="x-default"', source)
                    self.assertEqual(source.count('<h1 '), 1)
                    self.assertEqual(source.count('<meta name="applicable-device" content="pc,mobile">'), 1)
                    self.assertIn(f'data-language="{language}"', source)
                    title = re.search(r'<title[^>]*>(.*?)</title>', source).group(1)
                    self.assertNotIn(title, titles)
                    titles.add(title)
                    schema = json.loads(re.search(r'id="site-structured-data">(.*?)</script>', source).group(1))
                    webpage = next(item for item in schema['@graph'] if item['@type'] == 'WebPage')
                    self.assertEqual(webpage['url'], canonical)
                    self.assertEqual(webpage['inLanguage'], 'zh-CN' if language == 'zh' else 'en')
                    self.assertIn(f'content="{site_url}assets/social-card.png?v=', source)
                    if page != 'index.html':
                        breadcrumb = next(item for item in schema['@graph'] if item['@type'] == 'BreadcrumbList')
                        self.assertEqual(breadcrumb['itemListElement'][-1]['item'], canonical)
                        self.assertIn('class="breadcrumbs"', source)
                    if page in ('gbk-to-utf8.html', 'epub-cover.html', 'txt-chapters.html', 'online-reader.html'):
                        article = next(item for item in schema['@graph'] if item['@type'] == 'Article')
                        self.assertEqual(article['mainEntityOfPage']['@id'], canonical + '#webpage')
                        self.assertNotIn('aggregateRating', source)
                        self.assertIn('class="article-toc"', source)
                        self.assertIn('href="#section-1"', source)
                    self.assertIn(f'Sitemap: {site_url}sitemap.xml', (output / 'robots.txt').read_text())
            chinese = (output / 'zh/txt-to-epub.html').read_text()
            self.assertIn('如何将 TXT 转为 EPUB', chinese)
            self.assertIn('章节标题独立成行', chinese)
            base = '/' + site_url.split('/', 3)[3]
            self.assertIn(f'href="{base}zh/#converter"', chinese)
            self.assertIn(f'href="{base}site.css?v=', chinese)

    def test_reader_is_discoverable_without_javascript_in_both_languages(self):
        output = self.build()
        for prefix, locale, heading in (('', 'en', 'Read EPUB and TXT online'),
                                         ('zh/', 'zh-CN', '在线阅读 EPUB 与 TXT')):
            reader_url = f'https://epubloom.com/{prefix}online-reader.html'
            reader = (output / prefix / 'online-reader.html').read_text()
            self.assertIn(heading, reader)
            self.assertEqual(reader.count('<h2 id="section-'), 6)
            self.assertIn(f'href="/{prefix}#converter"', reader)
            for destination in ('gbk-to-utf8.html', 'txt-chapters.html', 'privacy.html'):
                self.assertIn(f'href="/{prefix}{destination}"', reader)
            for entry in ('index.html', 'guide.html', 'txt-to-epub.html', 'epub-to-txt.html', 'txt-chapters.html'):
                self.assertIn(f'href="/{prefix}online-reader.html"', (output / prefix / entry).read_text())
            home = (output / prefix / 'index.html').read_text()
            graph = json.loads(re.search(r'id="site-structured-data">(.*?)</script>', home).group(1))['@graph']
            app = next(item for item in graph if item['@type'] == 'WebApplication')
            self.assertEqual(app['softwareHelp'], reader_url)
            self.assertEqual(app['inLanguage'], locale)
            self.assertEqual(len(app['featureList']), 5)
            self.assertNotIn('aggregateRating', app)
            self.assertIn(reader_url, (output / 'sitemap.xml').read_text())
        self.assertIn('https://epubloom.com/zh/online-reader.html', (output / 'baidu-urls.txt').read_text())


if __name__ == '__main__':
    unittest.main()
