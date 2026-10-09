import { t, getLanguage, createDisclosure } from './i18n.js';
import init, { txt_to_epub, epub_to_txt, encode_text, init_panic_hook, set_timestamp, detect_title, detect_author } from './pkg/transmute_web.js';

// ── State ──────────────────────────────────────────────────────
const state = {
  file: null,
  cover: null,
  coverSource: null,
  coverFit: 'contain',
  coverPreviewUrl: null,
  coverProcessing: false,
  coverPendingSource: null,
  coverPendingFit: null,
  coverTextSnapshot: null,
  coverTextApplied: false,
  result: null,
  mode: null,
  busy: false,
  operation: null,
  sourceEncoding: null,
  encodingInvalid: false,
  encodingReady: Promise.resolve(),
  targetEncoding: 'utf-8',
  loadFailed: false,
  metadataReady: Promise.resolve(),
  statusKey: 'status.loading',
  statusClass: '',
  statusValues: {},
};

// ── DOM refs ───────────────────────────────────────────────────
const $ = (s) => document.querySelector(s);
const dropzone = $('#dropzone');
const fileInput = $('#fileInput');
const fileRow = $('#fileRow');
const fileName = $('#fileName');
const fileFormat = $('#fileFormat');
const fileRemove = $('#fileRemove');
const coverRow = $('#coverRow');
const coverZone = $('#coverZone');
const coverInput = $('#coverInput');
const coverFileName = $('#coverFileName');
const coverRemove = $('#coverRemove');
const coverImage = $('#coverImage');
const coverPlaceholder = $('#coverPlaceholder');
const coverFit = $('#coverFit');
const coverDimensions = $('#coverDimensions');
const coverTextToggle = $('#coverTextToggle');
const coverTextOptions = $('#coverTextOptions');
let coverRequest = 0;
let coverTextTimer;
const exportNameRow = $('#exportNameRow');
const exportName = $('#exportName');
const convertBtn = $('#convertBtn');
const encodingActions = $('#encodingActions');
const encodingBtn = $('#encodingBtn');
const sourceEncoding = $('#sourceEncoding');
const encodingSelect = $('#encodingSelect');
const encodingMenu = $('#encodingMenu');
const encodingOptions = [...document.querySelectorAll('[data-encoding-option]')];
const encodingNames = { 'utf-8': 'UTF-8', gbk: 'GBK', gb18030: 'GB18030', 'utf-16le': 'UTF-16 LE', 'utf-16be': 'UTF-16 BE' };
const downloadBtn = $('#downloadBtn');
const status = $('#status');
const metaSection = $('#metaSection');
const metaToggle = $('#metaToggle');
const metaBody = $('#metaBody');
const metaTitle = $('#metaTitle');
const metaAuthor = $('#metaAuthor');
const metaLang = $('#metaLang');
const metaDesc = $('#metaDesc');
const metaPublisher = $('#metaPublisher');
const metaIdentifier = $('#metaIdentifier');
const metaDate = $('#metaDate');
const metaRights = $('#metaRights');
const metaSubjects = $('#metaSubjects');

// ── Helpers ────────────────────────────────────────────────────
function renderStatus() {
  status.textContent = state.statusKey ? t(state.statusKey, state.statusValues) : '';
  status.className = 'status';
  if (state.statusClass) status.classList.add(state.statusClass);
}

function setStatus(key, cls = '', values = {}) {
  state.statusKey = key;
  state.statusClass = cls;
  state.statusValues = values;
  renderStatus();
}

function getExt(name) {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i + 1).toLowerCase() : '';
}

function outputFilename(extension) {
  const fallback = state.file?.name.replace(/\.(txt|epub)$/i, '') || 'book';
  let base = (exportName.value.trim() || fallback).replace(/\.(txt|epub)$/i, '')
    .replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, '_').replace(/[. ]+$/g, '');
  base = [...base].slice(0, 180).join('').replace(/[. ]+$/g, '') || 'book';
  if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(base)) base = '_' + base;
  return base + '.' + extension;
}

function renderExportName() {
  const extension = state.mode === 'epub2txt' ? 'txt' : 'epub';
  $('#exportExtension').textContent = '.' + extension;
  $('#exportNameHint').textContent = t('export.preview', { name: outputFilename(extension) });
}
exportName.addEventListener('input', renderExportName);

function updateUI() {
  const hasFile = !!state.file;
  fileRow.style.display = hasFile ? 'flex' : 'none';
  dropzone.style.display = hasFile ? 'none' : 'block';

  const isTxt = state.mode === 'txt2epub';
  exportNameRow.hidden = !hasFile;
  exportName.disabled = state.busy;
  renderExportName();
  coverRow.style.display = isTxt ? 'grid' : 'none';
  metaSection.style.display = isTxt ? 'block' : 'none';
  convertBtn.disabled = !state.file || state.busy || state.coverProcessing || state.loadFailed;
  convertBtn.textContent = t(state.busy && state.operation !== 'encoding' ? 'action.converting' : isTxt
    ? 'action.epub' : state.mode === 'epub2txt' ? 'action.txt' : 'action.choose');
  encodingActions.hidden = !isTxt;
  encodingBtn.disabled = !isTxt || state.busy || state.coverProcessing || !state.sourceEncoding || state.loadFailed;
  encodingBtn.textContent = t(state.operation === 'encoding' ? 'action.encodingConverting' : 'action.encoding');
  encodingSelect.disabled = state.busy;
  sourceEncoding.textContent = state.sourceEncoding === 'gb18030' ? t('encoding.legacy')
    : state.sourceEncoding ? encodingNames[state.sourceEncoding] : t(state.encodingInvalid ? 'encoding.unknown' : 'encoding.detecting');
  downloadBtn.textContent = t('action.download');
  fileInput.disabled = state.busy;
  coverInput.disabled = state.busy || state.coverProcessing;
  coverZone.disabled = state.busy || state.coverProcessing;
  coverRemove.disabled = state.busy || state.coverProcessing;
  coverTextToggle.disabled = state.busy || state.coverProcessing;
  coverRow.setAttribute('aria-busy', String(state.coverProcessing));
  $('#coverChooseLabel').textContent = t(state.coverProcessing ? 'cover.processing' : state.cover ? 'cover.change' : 'cover.choose');
  coverFit.querySelectorAll('button').forEach(button => {
    button.disabled = state.busy || state.coverProcessing;
    button.setAttribute('aria-pressed', String(button.dataset.coverFit === state.coverFit));
  });
  coverDimensions.textContent = t(state.coverProcessing ? 'cover.processing' : state.coverFit === 'crop' ? 'cover.readyCrop' : 'cover.readyContain');
  fileRemove.disabled = state.busy;
  dropzone.setAttribute('aria-disabled', String(state.busy));
  coverZone.setAttribute('aria-disabled', String(state.busy));
  metaBody.querySelectorAll('input, textarea').forEach(field => { field.disabled = state.busy; });
}

// ── File selection ─────────────────────────────────────────────
function setFile(file) {
  if (state.busy) return;
  const ext = getExt(file.name);
  const mode = ext === 'txt' ? 'txt2epub' : ext === 'epub' ? 'epub2txt' : null;
  if (!mode) { setStatus('status.unsupported', 'error'); return; }
  state.file = file;
  state.mode = mode;
  state.result = null;
  clearCover();
  exportName.value = file.name.replace(/\.(txt|epub)$/i, '');
  state.sourceEncoding = null;
  state.encodingInvalid = false;
  closeEncodingMenu();
  downloadBtn.classList.remove('show');
  [metaTitle, metaAuthor, metaDesc, metaPublisher, metaIdentifier, metaDate, metaRights, metaSubjects].forEach(field => { field.value = ''; });
  fileName.textContent = file.name;
  fileFormat.textContent = ext.toUpperCase();
  updateUI();
  setStatus(state.loadFailed ? 'status.loadFailed' : '');
  // auto-fill metadata for txt files
  state.metadataReady = mode === 'txt2epub' ? autoFillMeta(file) : Promise.resolve();
  state.encodingReady = mode === 'txt2epub' ? detectSourceEncoding(file) : Promise.resolve();
}

async function detectSourceEncoding(file) {
  try {
    const buf = await file.arrayBuffer();
    const encoding = detectEncoding(buf, 'gb18030');
    decodeBuffer(buf, encoding, true);
    if (state.file !== file) return;
    state.sourceEncoding = encoding;
    updateUI();
  } catch {
    if (state.file !== file) return;
    state.encodingInvalid = true;
    updateUI();
    setStatus('status.encodingInvalid', 'error');
  }
}

function openPicker(zone, input) {
  zone.addEventListener('click', event => { if (event.target !== input && !state.busy) input.click(); });
  zone.addEventListener('keydown', event => {
    if (event.target === zone && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (!state.busy) input.click();
    }
  });
}
openPicker(dropzone, fileInput);
dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag'));
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('drag');
  if (e.dataTransfer.files.length) setFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', () => {
  if (fileInput.files.length) setFile(fileInput.files[0]);
});
fileRemove.addEventListener('click', () => {
  if (state.busy) return;
  state.file = null;
  state.mode = null;
  state.result = null;
  clearCover();
  fileInput.value = '';
  downloadBtn.classList.remove('show');
  updateUI();
  setStatus('');
});

// ── Cover selection ────────────────────────────────────────────
openPicker(coverZone, coverInput);
coverInput.addEventListener('change', () => {
  if (coverInput.files.length && !state.busy && !state.coverProcessing) prepareCover(coverInput.files[0], state.coverFit);
  coverInput.value = ''; // Selecting the same image again also works.
});
coverRemove.addEventListener('click', () => {
  if (state.busy || state.coverProcessing) return;
  clearCover();
  state.result = null;
  downloadBtn.classList.remove('show');
  updateUI();
  setStatus('');
});
coverFit.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  if (state.coverSource && !state.busy && !state.coverProcessing && state.coverFit !== button.dataset.coverFit) {
    prepareCover(state.coverSource, button.dataset.coverFit);
  }
}));

function clearCover() {
  coverRequest++;
  clearTimeout(coverTextTimer);
  if (state.coverPreviewUrl) URL.revokeObjectURL(state.coverPreviewUrl);
  Object.assign(state, { cover: null, coverSource: null, coverPreviewUrl: null, coverProcessing: false, coverFit: 'contain',
    coverPendingSource: null, coverPendingFit: null, coverTextSnapshot: null, coverTextApplied: false });
  coverTextToggle.checked = false;
  coverTextOptions.hidden = true;
  coverInput.value = '';
  coverImage.removeAttribute('src');
  coverImage.hidden = true;
  coverPlaceholder.removeAttribute('hidden');
  coverFileName.hidden = true;
  coverDimensions.hidden = true;
  coverFit.hidden = true;
  coverRemove.hidden = true;
}

async function prepareCover(file, fit) {
  if (!file.type.startsWith('image/')) { setStatus('status.coverType', 'error'); return; }
  if (file.size > 20 * 1024 * 1024) { setStatus('status.coverSize', 'error'); return; }
  const request = ++coverRequest;
  const originalUrl = URL.createObjectURL(file);
  state.coverProcessing = true;
  state.coverPendingSource = file;
  state.coverPendingFit = fit;
  const overlay = coverTextToggle.checked;
  const title = metaTitle.value.trim();
  const author = metaAuthor.value.trim();
  const snapshot = coverTextSignature();
  coverDimensions.hidden = false;
  updateUI();
  try {
    const image = new Image();
    await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; image.src = originalUrl; });
    if (request !== coverRequest) return;
    if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 40000000) throw new Error('IMAGE_SIZE');
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1800;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('CANVAS_UNAVAILABLE');
    ctx.fillStyle = '#f2efe7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingQuality = 'high';
    const fillScale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    function draw(scale, bleed = 0) {
      const width = image.naturalWidth * scale + bleed * 2;
      const height = image.naturalHeight * scale + bleed * 2;
      ctx.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    }
    if (fit === 'contain') {
      ctx.save();
      ctx.filter = 'blur(32px)';
      draw(fillScale, 80);
      ctx.restore();
      ctx.fillStyle = '#f2efe730';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw(Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight));
    } else draw(fillScale);
    if (overlay) drawCoverText(ctx, title, author);
    const blob = await new Promise((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('IMAGE_EXPORT')), 'image/jpeg', .92));
    if (request !== coverRequest) return;
    const previewUrl = URL.createObjectURL(blob);
    const previousUrl = state.coverPreviewUrl;
    Object.assign(state, { cover: new File([blob], 'cover.jpg', { type: 'image/jpeg' }), coverSource: file, coverFit: fit, coverPreviewUrl: previewUrl,
      coverTextSnapshot: snapshot, coverTextApplied: overlay });
    coverImage.src = previewUrl;
    coverImage.hidden = false;
    coverPlaceholder.setAttribute('hidden', '');
    coverFileName.textContent = file.name;
    coverFileName.hidden = false;
    coverFit.hidden = false;
    coverRemove.hidden = false;
    coverTextOptions.hidden = false;
    if (previousUrl) URL.revokeObjectURL(previousUrl);
    state.result = null;
    downloadBtn.classList.remove('show');
    setStatus(state.loadFailed ? 'status.loadFailed' : '');
    return true;
  } catch {
    if (request === coverRequest) {
      coverTextToggle.checked = state.coverTextApplied;
      setStatus('status.coverInvalid', 'error');
    }
  } finally {
    URL.revokeObjectURL(originalUrl);
    if (request === coverRequest) {
      state.coverProcessing = false;
      state.coverPendingSource = null;
      state.coverPendingFit = null;
      coverDimensions.hidden = !state.cover;
      updateUI();
    }
  }
}

function coverTextSignature() {
  return JSON.stringify(coverTextToggle.checked ? [true, metaTitle.value.trim(), metaAuthor.value.trim()] : [false]);
}

function refreshCoverText() {
  const source = state.coverPendingSource || state.coverSource;
  const fit = state.coverPendingFit || state.coverFit;
  if (!source || state.busy) return;
  clearTimeout(coverTextTimer);
  coverRequest++; // Edits invalidate any image still being prepared.
  state.coverProcessing = true;
  state.result = null;
  downloadBtn.classList.remove('show');
  updateUI();
  coverTextTimer = setTimeout(() => prepareCover(source, fit), 160);
}
coverTextToggle.addEventListener('change', refreshCoverText);
for (const input of [metaTitle, metaAuthor]) input.addEventListener('input', () => {
  if (coverTextToggle.checked) refreshCoverText();
});

function drawCoverText(ctx, title, author) {
  if (!title && !author) return;
  const width = 1008;
  const font = '"Songti SC", "Noto Serif CJK SC", Georgia, serif';
  function layout(text, startSize, minSize, maxLines, weight) {
    const normalized = Array.from(text.replace(/\s+/g, ' '));
    const characters = normalized.slice(0, 600);
    let lines, size;
    for (size = startSize; size >= minSize; size -= 4) {
      ctx.font = `${weight} ${size}px ${font}`;
      lines = [];
      let line = '';
      for (const character of characters) {
        if (line && ctx.measureText(line + character).width > width) {
          const space = line.lastIndexOf(' ');
          if (space > line.length / 2) { lines.push(line.slice(0, space)); line = line.slice(space + 1) + character; }
          else { lines.push(line); line = character; }
        } else line += character;
      }
      if (line) lines.push(line.trim());
      if (lines.length <= maxLines) break;
    }
    size = Math.max(size, minSize);
    ctx.font = `${weight} ${size}px ${font}`;
    if (lines.length > maxLines || characters.length < normalized.length) {
      lines = lines.slice(0, maxLines);
      let last = lines.at(-1) || '';
      while (last && ctx.measureText(last + '…').width > width) last = Array.from(last).slice(0, -1).join('');
      lines[lines.length - 1] = last + '…';
    }
    return { lines, size, height: lines.length * size * 1.3 };
  }
  const bookTitle = layout(title, 84, 36, 4, 600);
  const bookAuthor = layout(author, 40, 28, 2, 400);
  const gap = title && author ? 34 : 0;
  const blockHeight = bookTitle.height + bookAuthor.height + gap;
  const top = 1800 - 140 - blockHeight;
  const gradient = ctx.createLinearGradient(0, Math.max(0, top - 240), 0, 1800);
  gradient.addColorStop(0, '#10201b00');
  gradient.addColorStop(.55, '#10201bb8');
  gradient.addColorStop(1, '#10201bf2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 1800);
  ctx.fillStyle = '#fffefa';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.shadowColor = '#00000055';
  ctx.shadowBlur = 6;
  let y = top;
  for (const [block, weight] of [[bookTitle, 600], [bookAuthor, 400]]) {
    ctx.font = `${weight} ${block.size}px ${font}`;
    for (const line of block.lines) { ctx.fillText(line, 600, y); y += block.size * 1.3; }
    if (block === bookTitle) y += gap;
  }
}

// ── Metadata editor ──────────────────────────────────────────────
async function autoFillMeta(file) {
  try {
    await wasmReady;
    const buf = await file.arrayBuffer();
    if (state.file !== file) return;
    const enc = detectEncoding(buf);
    const txt = decodeBuffer(buf, enc);
    if (!metaTitle.value) {
      const detectedTitle = detect_title(txt);
      if (detectedTitle) metaTitle.value = detectedTitle;
    }
    if (!metaAuthor.value) {
      const a = detect_author(txt);
      if (a) metaAuthor.value = a;
    }
    if (coverTextToggle.checked) refreshCoverText();
  } catch (_) { /* ignore read errors */ }
}

createDisclosure(metaToggle, metaBody);

function val(id) { const v = id.value.trim(); return v || null; }

function collectMetadata() {
  const obj = {};
  const title = val(metaTitle);
  const author = val(metaAuthor);
  const lang = val(metaLang);
  const desc = val(metaDesc);
  const pub = val(metaPublisher);
  const ident = val(metaIdentifier);
  const date = val(metaDate);
  const rights = val(metaRights);
  const subjects = val(metaSubjects);
  if (title) obj.title = title;
  if (author) obj.author = author;
  if (lang) obj.language = lang;
  if (desc) obj.description = desc;
  if (pub) obj.publisher = pub;
  if (ident) obj.identifier = ident;
  if (date) obj.date = date;
  if (rights) obj.rights = rights;
  if (subjects) obj.subjects = subjects.split(/[,，]/).map(s => s.trim()).filter(Boolean);
  return Object.keys(obj).length ? JSON.stringify(obj) : null;
}

// ── Encoding detection ───────────────────────────────────────────
function detectEncoding(buf, fallback = 'gbk') {
  const bytes = new Uint8Array(buf);
  if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) return 'utf-8';
  if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) return 'utf-16le';
  if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) return 'utf-16be';
  try { new TextDecoder('utf-8', { fatal: true }).decode(bytes); return 'utf-8'; } catch (_) {}
  return fallback;
}

function decodeBuffer(buf, enc, strict = false) {
  const bytes = new Uint8Array(buf);
  let start = 0;
  if (enc === 'utf-8' && bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) start = 3;
  else if ((enc === 'utf-16le' || enc === 'utf-16') && bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) start = 2;
  else if (enc === 'utf-16be' && bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) start = 2;
  return new TextDecoder(enc, { fatal: strict }).decode(start ? bytes.subarray(start) : bytes);
}

function closeEncodingMenu(restoreFocus = false) {
  encodingMenu.hidden = true;
  encodingSelect.setAttribute('aria-expanded', 'false');
  if (restoreFocus) encodingSelect.focus();
}
function openEncodingMenu(index = encodingOptions.findIndex(option => option.dataset.encodingOption === state.targetEncoding)) {
  encodingMenu.hidden = false;
  encodingSelect.setAttribute('aria-expanded', 'true');
  encodingOptions[index]?.focus();
}
encodingSelect.addEventListener('click', () => encodingMenu.hidden ? openEncodingMenu() : closeEncodingMenu());
encodingSelect.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    openEncodingMenu(event.key === 'ArrowDown' ? 0 : encodingOptions.length - 1);
  }
});
encodingOptions.forEach(option => option.addEventListener('click', () => {
  state.targetEncoding = option.dataset.encodingOption;
  $('#targetEncoding').textContent = encodingNames[state.targetEncoding];
  encodingOptions.forEach(item => item.setAttribute('aria-checked', String(item === option)));
  closeEncodingMenu(true);
}));
encodingMenu.addEventListener('keydown', event => {
  const index = encodingOptions.indexOf(document.activeElement);
  let next;
  if (event.key === 'ArrowDown') next = (index + 1) % encodingOptions.length;
  if (event.key === 'ArrowUp') next = (index - 1 + encodingOptions.length) % encodingOptions.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = encodingOptions.length - 1;
  if (next !== undefined) { event.preventDefault(); encodingOptions[next].focus(); }
  else if (event.key === 'Escape') { event.preventDefault(); closeEncodingMenu(true); }
  else if (event.key === 'Tab') closeEncodingMenu(true);
});
for (const type of ['click', 'focusin']) document.addEventListener(type, event => {
  if (!encodingSelect.closest('.encoding-control').contains(event.target)) closeEncodingMenu();
});

// Export a separate TXT copy without replacing the EPUB conversion result.
encodingBtn.addEventListener('click', async () => {
  if (!state.file || state.mode !== 'txt2epub' || state.busy) return;
  state.busy = true;
  state.operation = 'encoding';
  updateUI();
  closeEncodingMenu();
  setStatus('status.encodingConverting');
  try {
    await wasmReady;
    await state.encodingReady;
    const buf = await state.file.arrayBuffer();
    const enc = state.sourceEncoding;
    if (!enc) { setStatus('status.encodingInvalid', 'error'); return; }
    let text;
    try { text = decodeBuffer(buf, enc, true); }
    catch { setStatus('status.encodingInvalid', 'error'); return; }
    const bytes = encode_text(text, state.targetEncoding);
    const name = outputFilename(state.targetEncoding.replaceAll('-', '') + '.txt');
    downloadFile(bytes, name, 'text/plain;charset=' + state.targetEncoding);
    setStatus('status.encodingSuccess', 'success', { name });
  } catch (e) {
    if (String(e).includes('UNREPRESENTABLE')) setStatus('status.encodingLoss', 'error', { encoding: encodingNames[state.targetEncoding] });
    else setStatus(state.loadFailed ? 'status.loadFailed' : 'status.error', 'error', { message: e.message || String(e) });
  } finally {
    state.busy = false;
    state.operation = null;
    updateUI();
  }
});

// ── Convert ────────────────────────────────────────────────────
convertBtn.addEventListener('click', async () => {
  if (!state.file || state.busy) return;
  state.busy = true;
  state.operation = 'epub';
  updateUI();
  setStatus('status.converting');
  downloadBtn.classList.remove('show');

  try {
    await wasmReady;
    await state.metadataReady;
    if (state.coverSource && coverTextToggle.checked && state.coverTextSnapshot !== coverTextSignature()) {
      clearTimeout(coverTextTimer);
      const prepared = await prepareCover(state.coverSource, state.coverFit);
      if (!prepared || state.coverTextSnapshot !== coverTextSignature()) throw new Error(t('status.coverInvalid'));
    }
    const buf = await state.file.arrayBuffer();

    if (state.mode === 'txt2epub') {
      const txt = decodeBuffer(buf, detectEncoding(buf));
      let coverData, coverType, coverName; // undefined, not null
      if (state.cover) {
        coverData = new Uint8Array(await state.cover.arrayBuffer());
        coverType = state.cover.type || 'image/jpeg';
        coverName = state.cover.name;
      }
      const metaJson = collectMetadata();
      const epubBytes = txt_to_epub(txt, coverData, coverType, coverName, metaJson);
      if (epubBytes.length === 0) {
        setStatus('status.failed', 'error');
        return;
      }
      state.result = new Uint8Array(epubBytes);
    } else {
      const epubData = new Uint8Array(buf);
      const txt = epub_to_txt(epubData);
      if (txt.startsWith('[Error:')) {
        setStatus('status.epubInvalid', 'error');
        return;
      }
      state.result = new TextEncoder().encode(txt);
    }

    setStatus('status.success', 'success');
    downloadBtn.classList.add('show');
  } catch (e) {
    setStatus(state.loadFailed ? 'status.loadFailed' : 'status.error', 'error', { message: e.message });
  } finally {
    state.busy = false;
    state.operation = null;
    updateUI();
  }
});

// ── Download ───────────────────────────────────────────────────
downloadBtn.addEventListener('click', () => {
  if (!state.result) return;
  downloadFile(state.result, outputFilename(state.mode === 'txt2epub' ? 'epub' : 'txt'), state.mode === 'txt2epub' ? 'application/epub+zip' : 'text/plain;charset=utf-8');
});

function downloadFile(bytes, name, type) {
  const blob = new Blob([bytes], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── Init WASM ──────────────────────────────────────────────────
const wasmReady = (async () => {
  await init();
  init_panic_hook();
  set_timestamp(BigInt(Math.floor(Date.now() / 1000)));
})();
wasmReady.then(() => { if (state.statusKey === 'status.loading') setStatus(''); }).catch((e) => {
  state.loadFailed = true;
  setStatus('status.loadFailed', 'error');
  updateUI();
  console.error(e);
});

window.addEventListener('epubloom:languagechange', () => { updateUI(); renderStatus(); });
metaLang.value = getLanguage() === 'zh' ? 'zh' : 'en';
updateUI();
renderStatus();
