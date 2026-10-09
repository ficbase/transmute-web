"""Exercise public packaging and dependency cache invalidation without WASM tooling."""
import hashlib
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
        shutil.copy2(Path(__file__).resolve().parents[1] / 'scripts/prepare-site.py', self.root / 'scripts/prepare-site.py')
        for page in ('index.html', 'guide.html', 'about.html', 'contact.html', 'privacy.html'):
            (self.root / page).write_text('<head><!-- site-metadata --><link href="site.css"><link href="favicon.svg"><script src="converter.js"></script><script src="i18n.js"></script></head>')
        for name, text in {'site.css': 'body { color: green; }', 'favicon.svg': '<svg/>', 'i18n.js': 'export function t() {}', 'converter.js': "import './i18n.js'; import './pkg/transmute_web.js';"}.items():
            (self.root / name).write_text(text)
        (self.root / 'pkg').mkdir()
        (self.root / 'pkg/transmute_web.js').write_text("new URL('transmute_web_bg.wasm', import.meta.url)")
        (self.root / 'pkg/transmute_web_bg.wasm').write_bytes(b'test-wasm')
        (self.root / 'examples').mkdir()
        (self.root / 'examples/sample.txt').write_text('sample')
        (self.root / '.key').write_text('private-test-fixture')

    def build(self, publisher=''):
        environment = dict(os.environ, SITE_URL='https://epubloom.com/', ADSENSE_PUBLISHER_ID=publisher)
        subprocess.run([sys.executable, str(self.root / 'scripts/prepare-site.py')], env=environment, check=True, capture_output=True)
        return self.root / 'dist'

    @staticmethod
    def version(path):
        return hashlib.sha256(path.read_bytes()).hexdigest()[:12]

    def test_publishes_only_public_assets_and_optional_adsense_metadata(self):
        output = self.build('ca-pub-1234567890123456')
        public = {str(path.relative_to(output)) for path in output.rglob('*') if path.is_file()}
        self.assertEqual(public, {
            'index.html', 'guide.html', 'about.html', 'contact.html', 'privacy.html',
            'site.css', 'favicon.svg', 'converter.js', 'i18n.js', 'examples/sample.txt',
            'pkg/transmute_web.js', 'pkg/transmute_web_bg.wasm', 'robots.txt',
            'sitemap.xml', '.nojekyll', 'ads.txt',
        })
        for page in ('index.html', 'guide.html', 'about.html', 'contact.html', 'privacy.html'):
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

    def test_translation_and_wasm_changes_propagate_through_module_versions(self):
        output = self.build()
        first_converter = self.version(output / 'converter.js')
        first_module = self.version(output / 'pkg/transmute_web.js')
        first_css = self.version(output / 'site.css')
        self.assertIn(f"./i18n.js?v={self.version(output / 'i18n.js')}", (output / 'converter.js').read_text())
        self.assertIn(f"transmute_web_bg.wasm?v={self.version(output / 'pkg/transmute_web_bg.wasm')}", (output / 'pkg/transmute_web.js').read_text())
        (self.root / 'i18n.js').write_text('export function t() { return "new translation"; }')
        (self.root / 'pkg/transmute_web_bg.wasm').write_bytes(b'new-test-wasm')
        self.build()
        self.assertNotEqual(first_converter, self.version(output / 'converter.js'))
        self.assertNotEqual(first_module, self.version(output / 'pkg/transmute_web.js'))
        self.assertEqual(first_css, self.version(output / 'site.css'))
        self.assertIn(f'converter.js?v={self.version(output / "converter.js")}', (output / 'index.html').read_text())
        self.assertIn(f'./pkg/transmute_web.js?v={self.version(output / "pkg/transmute_web.js")}', (output / 'converter.js').read_text())


if __name__ == '__main__':
    unittest.main()
