import { t, getLanguage } from './i18n.js';
import init, { txt_to_epub, epub_to_txt, init_panic_hook, set_timestamp, detect_title, detect_author } from './pkg/transmute_web.js';

// ── State ──────────────────────────────────────────────────────
const state = {
  file: null,
  cover: null,
  result: null,
  resultName: null,
  mode: null,
  busy: false,
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
const coverFileRow = $('#coverFileRow');
const coverFileName = $('#coverFileName');
const coverRemove = $('#coverRemove');
const convertBtn = $('#convertBtn');
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

function updateUI() {
  const hasFile = !!state.file;
  fileRow.style.display = hasFile ? 'flex' : 'none';
  dropzone.style.display = hasFile ? 'none' : 'block';

  const isTxt = state.mode === 'txt2epub';
  coverRow.style.display = isTxt ? 'block' : 'none';
  metaSection.style.display = isTxt ? 'block' : 'none';
  convertBtn.disabled = !state.file || state.busy || state.loadFailed;
  convertBtn.textContent = t(state.busy ? 'action.converting' : isTxt
    ? 'action.epub' : state.mode === 'epub2txt' ? 'action.txt' : 'action.choose');
  downloadBtn.textContent = t('action.download');
  fileInput.disabled = state.busy;
  coverInput.disabled = state.busy;
  fileRemove.disabled = state.busy;
  coverRemove.disabled = state.busy;
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
  state.cover = null;
  coverInput.value = '';
  downloadBtn.classList.remove('show');
  [metaTitle, metaAuthor, metaDesc, metaPublisher, metaIdentifier, metaDate, metaRights, metaSubjects].forEach(field => { field.value = ''; });
  fileName.textContent = file.name;
  fileFormat.textContent = ext.toUpperCase();
  coverFileRow.style.display = 'none';
  coverZone.style.display = 'block';
  updateUI();
  setStatus(state.loadFailed ? 'status.loadFailed' : '');
  // auto-fill metadata for txt files
  state.metadataReady = mode === 'txt2epub' ? autoFillMeta(file) : Promise.resolve();
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
  fileInput.value = '';
  downloadBtn.classList.remove('show');
  updateUI();
  setStatus('');
});

// ── Cover selection ────────────────────────────────────────────
openPicker(coverZone, coverInput);
coverInput.addEventListener('change', () => {
  if (coverInput.files.length) {
    if (state.busy) return;
    if (!coverInput.files[0].type.startsWith('image/')) {
      setStatus('status.coverType', 'error');
      coverInput.value = '';
      return;
    }
    state.cover = coverInput.files[0];
    coverFileName.textContent = state.cover.name;
    coverFileRow.style.display = 'flex';
    coverZone.style.display = 'none';
  }
});
coverRemove.addEventListener('click', () => {
  if (state.busy) return;
  state.cover = null;
  coverInput.value = '';
  coverFileRow.style.display = 'none';
  coverZone.style.display = 'block';
});

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
  } catch (_) { /* ignore read errors */ }
}

metaToggle.addEventListener('click', () => {
  const open = metaBody.classList.toggle('show');
  metaToggle.classList.toggle('open', open);
  metaToggle.setAttribute('aria-expanded', String(open));
});

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
function detectEncoding(buf) {
  const bytes = new Uint8Array(buf);
  if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) return 'utf-8';
  if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) return 'utf-16le';
  if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) return 'utf-16be';
  try { new TextDecoder('utf-8', { fatal: true }).decode(bytes); return 'utf-8'; } catch (_) {}
  return 'gbk';
}

function decodeBuffer(buf, enc) {
  const bytes = new Uint8Array(buf);
  let start = 0;
  if (enc === 'utf-8' && bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) start = 3;
  else if ((enc === 'utf-16le' || enc === 'utf-16') && bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) start = 2;
  else if (enc === 'utf-16be' && bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) start = 2;
  return new TextDecoder(enc).decode(start ? bytes.subarray(start) : bytes);
}

// ── Convert ────────────────────────────────────────────────────
convertBtn.addEventListener('click', async () => {
  if (!state.file || state.busy) return;
  state.busy = true;
  updateUI();
  setStatus('status.converting');
  downloadBtn.classList.remove('show');

  try {
    await wasmReady;
    await state.metadataReady;
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
      state.resultName = state.file.name.replace(/\.txt$/i, '') + '.epub';
    } else {
      const epubData = new Uint8Array(buf);
      const txt = epub_to_txt(epubData);
      if (txt.startsWith('[Error:')) {
        setStatus('status.epubInvalid', 'error');
        return;
      }
      state.result = new TextEncoder().encode(txt);
      state.resultName = state.file.name.replace(/\.epub$/i, '') + '.txt';
    }

    setStatus('status.success', 'success');
    downloadBtn.classList.add('show');
  } catch (e) {
    setStatus(state.loadFailed ? 'status.loadFailed' : 'status.error', 'error', { message: e.message });
  } finally {
    state.busy = false;
    updateUI();
  }
});

// ── Download ───────────────────────────────────────────────────
downloadBtn.addEventListener('click', () => {
  if (!state.result) return;
  const blob = new Blob([state.result], { type: state.mode === 'txt2epub' ? 'application/epub+zip' : 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = state.resultName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

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
