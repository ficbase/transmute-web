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


def render_page(source, page, language, messages, site_url, pages, versions, noindex=False):
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
                             ('data-i18n-placeholder', 'placeholder'), ('data-i18n-alt', 'alt')]:
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
        if node.attrs.get('id') == 'languageSelect':
            node.attrs['disabled'] = None
        if 'data-language-current' in node.attrs:
            node.children = ['简体中文' if language == 'zh' else 'English']
        if 'data-language-option' in node.attrs:
            node.attrs['aria-checked'] = str(node.attrs['data-language-option'] == language).lower()
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
    social_image = site_url + 'assets/social-card.png?v=' + versions['assets/social-card.png']
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
<meta property="og:image" content="{escape(social_image, quote=True)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/png">
<meta property="og:image:alt" data-i18n-content="share.alt" content="{escape(strings['share.alt'], quote=True)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{escape(social_image, quote=True)}">
<meta name="robots" content="{'noindex, follow, ' if noindex else ''}max-image-preview:large">
<meta name="twitter:title" content="{escape(title, quote=True)}">
<meta name="twitter:description" content="{escape(description, quote=True)}">'''
    graph = [
        {'@type': 'WebSite', '@id': site_url + '#website', 'url': site_url, 'name': 'EpuBloom', 'inLanguage': ['en', 'zh-CN']},
        {'@type': 'Organization', '@id': site_url + '#organization', 'name': 'EpuBloom', 'url': site_url},
        {'@type': 'WebPage', '@id': canonical + '#webpage', 'url': canonical, 'name': title,
         'description': description, 'inLanguage': locale, 'isPartOf': {'@id': site_url + '#website'}},
    ]
    if page != 'index.html':
        main = next(node for node in nodes if node.tag == 'main')
        heading = next(node for node in nodes if node.tag == 'h1')
        heading_key = heading.attrs['data-i18n']
        items = [(strings['breadcrumb.home'], site_url + page_path('index.html', language), 'breadcrumb.home')]
        is_article = any(node.tag == 'article' and node.attrs.get('data-i18n-html', '').startswith('article.') for node in nodes)
        if is_article:
            items.append((strings['nav.guide'], site_url + page_path('guide.html', language), 'nav.guide'))
        items.append((strings[heading_key], canonical, heading_key))
        links = ''.join(f'<li>' + (f'<span aria-current="page" data-breadcrumb-item data-i18n="{key}">{escape(name)}</span>' if index == len(items) - 1 else
                                  f'<a href="{escape(url, quote=True)}" data-breadcrumb-item data-i18n="{key}">{escape(name)}</a>') + '</li>'
                        for index, (name, url, key) in enumerate(items))
        main.children[0:0] = Document(f'<nav class="breadcrumbs" aria-label="{escape(strings["breadcrumb.label"], quote=True)}" data-i18n-label="breadcrumb.label"><ol>{links}</ol></nav>').root.children
        graph[2]['breadcrumb'] = {'@id': canonical + '#breadcrumb'}
        graph.append({'@type': 'BreadcrumbList', '@id': canonical + '#breadcrumb', 'itemListElement': [
            {'@type': 'ListItem', 'position': index + 1, 'name': name, 'item': url} for index, (name, url, key) in enumerate(items)]})
        if is_article:
            graph.append({'@type': 'Article', '@id': canonical + '#article', 'headline': strings[heading_key],
                          'description': description, 'inLanguage': locale, 'mainEntityOfPage': {'@id': canonical + '#webpage'},
                          'author': {'@id': site_url + '#organization'}, 'publisher': {'@id': site_url + '#organization'}})
            article = next(node for node in main.walk() if node.tag == 'article')
            position = main.children.index(article)
            main.children[position:position] = Document(f'<p class="article-byline"><a href="{escape(site_url + page_path("about.html", language), quote=True)}" data-i18n="article.byline">{escape(strings["article.byline"])}</a></p>').root.children
            headings = [node for node in article.walk() if node.tag == 'h2']
            for index, node in enumerate(headings, 1):
                node.attrs['id'] = f'section-{index}'
            items = ''.join(f'<li><a href="#section-{index}">{"".join(child.render() if isinstance(child, Element) else child for child in node.children)}</a></li>' for index, node in enumerate(headings, 1))
            position = main.children.index(article)
            main.children[position:position] = Document(f'<nav class="article-toc" aria-label="{escape(strings["article.contents"], quote=True)}" data-i18n-label="article.contents"><p data-i18n="article.contents">{escape(strings["article.contents"])}</p><ol>{items}</ol></nav>').root.children
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
