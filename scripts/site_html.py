"""Render authored translations into static, crawlable HTML using the stdlib."""
from html import escape
from html.parser import HTMLParser
import json
from urllib.parse import urlsplit

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}


class Element:
    def __init__(self, tag='', attrs=()):
        self.tag = tag
        self.attrs = dict(attrs)
        self.children = []

    def walk(self):
        yield self
        for child in self.children:
            if isinstance(child, Element):
                yield from child.walk()

    def render(self):
        content = ''.join(child.render() if isinstance(child, Element) else child for child in self.children)
        if not self.tag:
            return content
        attrs = ''.join(' ' + name + ('' if value is None else '="' + escape(value, quote=True) + '"')
                        for name, value in self.attrs.items())
        opening = '<' + self.tag + attrs + '>'
        return opening if self.tag in VOID else opening + content + '</' + self.tag + '>'


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.root = Element()
        self.stack = [self.root]
        self.feed(source)
        self.close()

    def handle_starttag(self, tag, attrs):
        node = Element(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if len(self.stack) > 1 and self.stack[-1].tag == tag:
            self.stack.pop()
        else:
            raise ValueError('Unbalanced HTML end tag: ' + tag)

    def handle_data(self, data):
        self.stack[-1].children.append(data)

    def handle_entityref(self, name):
        self.handle_data('&' + name + ';')

    def handle_charref(self, name):
        self.handle_data('&#' + name + ';')

    def handle_comment(self, data):
        self.handle_data('<!--' + data + '-->')

    def handle_decl(self, decl):
        self.handle_data('<!' + decl + '>')


def translations(source):
    # i18n.js deliberately keeps the authored dictionary as a JSON object.
    start = source.index('const messages = ') + len('const messages = ')
    messages, _ = json.JSONDecoder().raw_decode(source[start:])
    if set(messages['en']) != set(messages['zh']):
        raise ValueError('English and Chinese translation keys must match')
    return messages


def page_path(page, language):
    return ('zh/' if language == 'zh' else '') + ('' if page == 'index.html' else page)


def render_page(source, page, language, messages, site_url, pages, versions):
    document = Document(source)
    locale = 'zh-CN' if language == 'zh' else 'en'
    base = urlsplit(site_url).path
    strings = messages[language]
    # Translate whole authored fragments before walking the final tree.
    def localize(node):
        for attr, rich in [('data-i18n', False), ('data-i18n-html', True)]:
            if attr in node.attrs:
                text = strings[node.attrs[attr]]
                node.children = Document(text).root.children if rich else [escape(text)]
        for attr, target in [('data-i18n-content', 'content'), ('data-i18n-label', 'aria-label'),
                             ('data-i18n-placeholder', 'placeholder')]:
            if attr in node.attrs:
                node.attrs[target] = strings[node.attrs[attr]]
        for child in node.children:
            if isinstance(child, Element):
                localize(child)
    localize(document.root)
    nodes = list(document.root.walk())
    for node in nodes:
        if node.tag == 'html':
            node.attrs.update({'lang': locale, 'data-page': page, 'data-site-base': base,
                               'data-language': language})
        if node.tag == 'option' and node.attrs.get('value') in ('en', 'zh'):
            node.attrs.pop('selected', None)
            if node.attrs['value'] == language:
                node.attrs['selected'] = None
        if 'data-sample-link' in node.attrs:
            node.attrs['href'] = 'examples/sample.txt' if language == 'zh' else 'examples/sample-en.txt'
        if node.attrs.get('id') == 'metaLang':
            node.attrs['value'] = language
        for attr in ('href', 'src'):
            value = node.attrs.get(attr, '')
            parts = urlsplit(value)
            if not value or value.startswith(('#', '/')) or parts.scheme or parts.netloc:
                continue
            path = parts.path
            if path in pages:
                node.attrs[attr] = base + page_path(path, language) + ('#' + parts.fragment if parts.fragment else '')
            elif path in versions:
                node.attrs[attr] = base + path + '?v=' + versions[path]
            elif path.startswith('examples/'):
                node.attrs[attr] = base + path
    head = next(node for node in nodes if node.tag == 'head')
    title_node = next(node for node in nodes if node.tag == 'title')
    title = strings[title_node.attrs['data-i18n']]
    description = next(node.attrs['content'] for node in nodes if node.tag == 'meta' and node.attrs.get('name') == 'description')
    canonical = site_url + page_path(page, language)
    en_url = site_url + page_path(page, 'en')
    zh_url = site_url + page_path(page, 'zh')
    meta = f'''<link rel="canonical" href="{escape(canonical, quote=True)}">
<link rel="alternate" hreflang="en" href="{escape(en_url, quote=True)}">
<link rel="alternate" hreflang="zh-Hans" href="{escape(zh_url, quote=True)}">
<link rel="alternate" hreflang="x-default" href="{escape(en_url, quote=True)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="EpuBloom">
<meta property="og:title" data-i18n-content="{title_node.attrs['data-i18n']}" content="{escape(title, quote=True)}">
<meta property="og:description" data-i18n-content="{next(node.attrs['data-i18n-content'] for node in nodes if node.tag == 'meta' and node.attrs.get('name') == 'description')}" content="{escape(description, quote=True)}">
<meta property="og:url" content="{escape(canonical, quote=True)}">
<meta property="og:locale" content="{'zh_CN' if language == 'zh' else 'en_US'}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{escape(title, quote=True)}">
<meta name="twitter:description" content="{escape(description, quote=True)}">'''
    graph = [
        {'@type': 'WebSite', '@id': site_url + '#website', 'url': site_url, 'name': 'EpuBloom', 'inLanguage': ['en', 'zh-CN']},
        {'@type': 'WebPage', '@id': canonical + '#webpage', 'url': canonical, 'name': title,
         'description': description, 'inLanguage': locale, 'isPartOf': {'@id': site_url + '#website'}},
    ]
    if page == 'index.html':
        graph.append({'@type': 'WebApplication', 'name': 'EpuBloom', 'url': canonical,
                      'applicationCategory': 'UtilitiesApplication', 'operatingSystem': 'Any',
                      'browserRequirements': 'Requires JavaScript and WebAssembly',
                      'description': description, 'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'USD'}})
    data = json.dumps({'@context': 'https://schema.org', '@graph': graph}, ensure_ascii=False).replace('<', '\\u003c')
    head.children.extend(Document(meta).root.children)
    head.children.append(f'<script type="application/ld+json" id="site-structured-data">{data}</script>')
    # Ordinary anchors also let visitors and crawlers discover either language without JS.
    footer = next(node for node in nodes if node.tag == 'footer')
    footer.children.extend(Document(f'<div class="locale-links"><a href="{escape(en_url, quote=True)}" lang="en" hreflang="en" data-language-link="en">English</a><a href="{escape(zh_url, quote=True)}" lang="zh-CN" hreflang="zh-Hans" data-language-link="zh">简体中文</a></div>').root.children)
    return document.root.render()
