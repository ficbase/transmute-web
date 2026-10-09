import { t } from './i18n.js';

const WIDTH = 1200, HEIGHT = 1800, MARGIN = 48;
const FONT = '"Songti SC", "Noto Serif CJK SC", Georgia, serif';
const defaults = () => ({
  title: { x: .5, y: .79, size: 84, color: '#fffefa' },
  author: { x: .5, y: .9, size: 40, color: '#fffefa' },
});
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// The editor and exported JPEG share this layout and drawing path.
export function drawCoverText(ctx, text, settings) {
  const blocks = {};
  for (const key of ['title', 'author']) {
    const content = text[key].trim().replace(/\s+/g, ' ');
    if (!content) continue;
    const style = settings[key], maxLines = key === 'title' ? 4 : 2;
    const weight = key === 'title' ? 600 : 400;
    const characters = Array.from(content), cropped = characters.slice(0, 600);
    let lines, size;
    for (size = style.size; size >= 16; size -= 2) {
      ctx.font = `${weight} ${size}px ${FONT}`;
      lines = [];
      let line = '';
      for (const character of cropped) {
        if (line && ctx.measureText(line + character).width > 1008) {
          const space = line.lastIndexOf(' ');
          if (space > line.length / 2) { lines.push(line.slice(0, space)); line = line.slice(space + 1) + character; }
          else { lines.push(line.trim()); line = character; }
        } else line += character;
      }
      if (line.trim()) lines.push(line.trim());
      if (lines.length <= maxLines) break;
    }
    size = Math.max(16, size);
    ctx.font = `${weight} ${size}px ${FONT}`;
    if (lines.length > maxLines || cropped.length < characters.length) {
      lines = lines.slice(0, maxLines);
      let last = lines.at(-1) || '';
      while (last && ctx.measureText(last + '…').width > 1008) last = Array.from(last).slice(0, -1).join('');
      lines[lines.length - 1] = last + '…';
    }
    const width = Math.max(...lines.map(line => ctx.measureText(line).width)) + 32;
    const height = lines.length * size * 1.3 + 24;
    const x = clamp(style.x * WIDTH, MARGIN + width / 2, WIDTH - MARGIN - width / 2);
    const y = clamp(style.y * HEIGHT, MARGIN + height / 2, HEIGHT - MARGIN - height / 2);
    blocks[key] = { x: x - width / 2, y: y - height / 2, width, height, size, lines, weight };
  }
  if (!Object.keys(blocks).length) return blocks;
  // A subtle halo follows each text block so colors work anywhere on the image.
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (const [key, block] of Object.entries(blocks)) {
    ctx.font = `${block.weight} ${block.size}px ${FONT}`;
    ctx.fillStyle = settings[key].color;
    const hex = settings[key].color.slice(1);
    const lightness = .2126 * parseInt(hex.slice(0, 2), 16) + .7152 * parseInt(hex.slice(2, 4), 16) + .0722 * parseInt(hex.slice(4, 6), 16);
    ctx.shadowColor = lightness > 140 ? '#000000a0' : '#ffffffb0';
    ctx.shadowBlur = 12;
    for (let i = 0; i < block.lines.length; i++) {
      ctx.fillText(block.lines[i], block.x + block.width / 2, block.y + 12 + i * block.size * 1.3);
    }
  }
  ctx.restore();
  return blocks;
}

function colorPicker(root, onChange) {
  const trigger = root.querySelector('.color-trigger'), menu = root.querySelector('.color-palette');
  const input = root.querySelector('input');
  const colors = ['#fffefa', '#ffffff', '#243e30', '#111111', '#dbb66b', '#a34f43', '#94c7e5', '#e9b6c6'];
  for (const color of colors) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'color-swatch';
    button.style.setProperty('--swatch', color);
    button.setAttribute('aria-label', color);
    button.dataset.color = color;
    button.addEventListener('click', () => { choose(color); close(); trigger.focus(); });
    root.querySelector('.color-swatches').append(button);
  }
  function close() { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }
  function set(color) {
    input.value = color.toUpperCase();
    input.setCustomValidity('');
    trigger.style.setProperty('--swatch', color);
    root.querySelectorAll('[data-color]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.color === color.toLowerCase())));
  }
  function choose(color) { set(color); onChange(color.toLowerCase()); }
  trigger.addEventListener('click', () => {
    const opening = menu.hidden;
    close();
    if (opening) { menu.hidden = false; trigger.setAttribute('aria-expanded', 'true'); input.focus(); }
  });
  input.addEventListener('input', () => {
    const value = input.value.trim();
    const valid = /^#[0-9a-f]{6}$/i.test(value);
    input.setCustomValidity(valid ? '' : t('cover.colorInvalid'));
    if (valid) choose(value);
  });
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { event.preventDefault(); event.stopPropagation(); close(); trigger.focus(); }
  });
  document.addEventListener('pointerdown', event => { if (!root.contains(event.target)) close(); });
  return { set, close, disable(value) { trigger.disabled = value; input.disabled = value; root.querySelectorAll('[data-color]').forEach(button => { button.disabled = value; }); } };
}

export function createCoverEditor({ getText, onChange }) {
  const $ = selector => document.querySelector(selector);
  const dialog = $('#coverEditor'), stage = $('#coverEditorStage'), canvas = $('#coverEditorCanvas');
  const size = $('#coverFontSize'), output = $('#coverFontValue');
  const tabs = [...dialog.querySelectorAll('[data-cover-part]')];
  const boxes = [...dialog.querySelectorAll('[data-text-box]')];
  let settings = defaults(), image = null, blocks = {}, selected = 'title', gesture = null;
  const inlinePicker = colorPicker($('#coverInlineColor'), color => {
    settings.title.color = color; settings.author.color = color; changed();
  });
  const editorPicker = colorPicker($('#coverEditorColor'), color => { settings[selected].color = color; changed(); });
  const snapshot = () => structuredClone(settings);
  function changed() { render(); onChange(); }
  function select(key) { selected = key; render(); }
  function render() {
    const text = getText();
    $('#coverColorRow').hidden = !text.enabled;
    inlinePicker.set(settings.title.color);
    editorPicker.set(settings[selected].color);
    size.value = settings[selected].size;
    output.textContent = settings[selected].size;
    tabs.forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.coverPart === selected)));
    if (!image) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(image, 0, 0);
    blocks = text.enabled ? drawCoverText(ctx, text, settings) : {};
    $('#coverEditorHint').textContent = t(text.enabled ? 'cover.editorHint' : 'cover.previewHint');
    $('#coverEditorTools').hidden = !text.enabled;
    dialog.classList.toggle('preview-only', !text.enabled);
    $('#coverEditorEmpty').hidden = !text.enabled || !!(text.title.trim() || text.author.trim());
    for (const box of boxes) {
      const key = box.dataset.textBox, block = blocks[key];
      box.hidden = !block;
      if (!block) continue;
      box.style.left = `${block.x / WIDTH * 100}%`;
      box.style.top = `${block.y / HEIGHT * 100}%`;
      box.style.width = `${block.width / WIDTH * 100}%`;
      box.style.height = `${block.height / HEIGHT * 100}%`;
      box.classList.toggle('selected', key === selected);
    }
  }
  function open() {
    if (!image) return;
    render();
    inlinePicker.close();
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('cover-editor-open');
  }
  function close() { if (dialog.open) dialog.close(); }
  $('#coverEditorDone').addEventListener('click', close);
  $('#coverEditorClose').addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => {
    if (gesture) onChange();
    gesture = null;
    editorPicker.close();
    document.body.classList.remove('cover-editor-open');
  });
  tabs.forEach(tab => tab.addEventListener('click', () => select(tab.dataset.coverPart)));
  size.addEventListener('input', () => { settings[selected].size = Number(size.value); changed(); });
  $('#coverEditorReset').addEventListener('click', () => { settings = defaults(); changed(); });
  for (const box of boxes) {
    const key = box.dataset.textBox;
    for (const handle of box.querySelectorAll('button')) {
      handle.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;
        event.preventDefault();
        select(key);
        const block = blocks[key], rect = stage.getBoundingClientRect();
        settings[key].x = (block.x + block.width / 2) / WIDTH;
        settings[key].y = (block.y + block.height / 2) / HEIGHT;
        gesture = { pointer: event.pointerId, key, resize: handle.classList.contains('cover-text-resize'),
          clientX: event.clientX, clientY: event.clientY, start: { ...settings[key] }, rect };
        handle.setPointerCapture(event.pointerId);
        handle.focus({ preventScroll: true });
      });
      handle.addEventListener('pointermove', event => {
        if (!gesture || gesture.pointer !== event.pointerId) return;
        const { start, rect, resize } = gesture;
        const dx = (event.clientX - gesture.clientX) / rect.width;
        const dy = (event.clientY - gesture.clientY) / rect.height;
        if (resize) settings[key].size = Math.round(clamp(start.size + (dx + dy) * 220, 16, 180));
        else {
          const block = blocks[key];
          settings[key].x = clamp(start.x + dx, (MARGIN + block.width / 2) / WIDTH, 1 - (MARGIN + block.width / 2) / WIDTH);
          settings[key].y = clamp(start.y + dy, (MARGIN + block.height / 2) / HEIGHT, 1 - (MARGIN + block.height / 2) / HEIGHT);
        }
        render();
      });
      const finish = event => {
        if (!gesture || gesture.pointer !== event.pointerId) return;
        gesture = null;
        onChange();
      };
      handle.addEventListener('pointerup', finish);
      handle.addEventListener('pointercancel', finish);
      handle.addEventListener('lostpointercapture', finish);
      handle.addEventListener('keydown', event => {
        const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
        if (!directions[event.key]) return;
        event.preventDefault();
        selected = key;
        const [dx, dy] = directions[event.key], step = event.shiftKey ? 10 : 2;
        if (handle.classList.contains('cover-text-resize')) settings[key].size = clamp(settings[key].size + (dx - dy) * step, 16, 180);
        else {
          const block = blocks[key];
          settings[key].x = clamp((block.x + block.width / 2 + dx * step) / WIDTH, (MARGIN + block.width / 2) / WIDTH, 1 - (MARGIN + block.width / 2) / WIDTH);
          settings[key].y = clamp((block.y + block.height / 2 + dy * step) / HEIGHT, (MARGIN + block.height / 2) / HEIGHT, 1 - (MARGIN + block.height / 2) / HEIGHT);
        }
        changed();
      });
    }
  }
  window.addEventListener('epubloom:languagechange', render);
  return {
    open, close, render, snapshot,
    setImage(value) { image = value; render(); },
    setBusy(value) { dialog.querySelectorAll('input,button').forEach(control => { control.disabled = value; }); inlinePicker.disable(value); },
    reset() { close(); image = null; settings = defaults(); selected = 'title'; gesture = null; inlinePicker.close(); render(); },
  };
}
