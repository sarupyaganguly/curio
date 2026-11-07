import { SUBJECTS, IDEAS } from '../data/ideas.js';
import { EXPLAINERS } from './explainers.js';

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const byId = Object.fromEntries(IDEAS.map(i => [i.id, i]));
const subj = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));
const uid = () => Math.random().toString(36).slice(2, 10);

/* ---------- icons ---------- */
const P = {
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
  bookmark: '<path d="M6 4h12v17l-6-4-6 4z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  chev: '<path d="M9 5l7 7-7 7"/>',
  share: '<path d="M12 15V4M8 8l4-4 4 4M6 12v7h12v-7"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  shuffle: '<path d="M4 7h3c4 0 6 10 10 10h3M4 17h3c1.5 0 2.7-1.2 3.6-2.6M13.4 9.6C14.3 8.2 15.5 7 17 7h3M17 4l3 3-3 3M17 14l3 3-3 3"/>',
  folder: '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  chart: '<path d="M4 19V5M4 19h16M8 15l4-5 3 3 5-7"/>',
  column: '<path d="M4 20h16M6 20V10M10 20V10M14 20V10M18 20V10M3 10l9-6 9 6"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3M8 15h8"/>',
  brain: '<path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 006 1V4a3 3 0 00-3 0zM15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-6 1"/>',
  film: '<path d="M4 5h16v14H4zM8 5v14M16 5v14M4 9h4M4 15h4M16 9h4M16 15h4"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  scales: '<path d="M12 4v16M7 20h10M5 8h14M5 8l-3 7a3.5 3.5 0 006 0zM19 8l-3 7a3.5 3.5 0 006 0z"/>',
  orbit: '<circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-25 12 12)"/>',
  sigma: '<path d="M18 5H6l6 7-6 7h12"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  dl: '<path d="M12 4v11M8 11l4 4 4-4M5 20h14"/>',
  ul: '<path d="M12 20V9M8 13l4-4 4 4M5 4h14"/>'
};
const I = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;
const RINGS = '<svg class="rings" viewBox="0 0 150 150" fill="none" stroke="currentColor" stroke-width="1"><circle cx="75" cy="75" r="26"/><circle cx="75" cy="75" r="46"/><circle cx="75" cy="75" r="66"/><path d="M75 6v138M6 75h138"/></svg>';

/* ---------- store (local, private, offline) ---------- */
const KEY = 'curio.v1';
const defaults = () => ({ saved: {}, read: {}, opened: {}, quiz: {}, collections: [], prefs: { theme: 'system', depth: 'balanced' } });
let S = load();
function load() {
  try {
    const j = JSON.parse(localStorage.getItem(KEY));
    const d = defaults();
    return j ? { ...d, ...j, prefs: { ...d.prefs, ...(j.prefs || {}) } } : d;
  } catch { return defaults(); }
}
function persist() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { toast('Could not save on this device'); } }
const isSaved = id => !!S.saved[id];
function toggleSave(id) {
  if (S.saved[id]) {
    delete S.saved[id];
    S.collections.forEach(c => { c.ideas = c.ideas.filter(x => x !== id); });
  } else S.saved[id] = { savedAt: Date.now(), note: '' };
  persist();
}
function markRead(id) { if (!S.read[id]) { S.read[id] = Date.now(); persist(); } }

/* ---------- content helpers ---------- */
const words = i => [i.hook, ...i.body, i.why, i.caveat].join(' ').split(/\s+/).length;
const mins = i => Math.max(1, Math.round(words(i) / 190));
const primary = i => subj[i.subjects[0]];
const subjectsOf = i => i.subjects.map(s => subj[s].short).join(' · ');

function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function dayKey() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
function todaySet(n = 6) {
  const key = dayKey();
  let h = 0; for (const c of key) h = (h * 31 + c.charCodeAt(0)) | 0;
  const r = rng(h);
  const target = { quick: 1, balanced: 2, detailed: 3.5 }[S.prefs.depth] || 2;
  const scored = IDEAS.map(i => ({ i, s: r() + 0.08 * Math.abs(mins(i) - target) })).sort((a, b) => a.s - b.s).map(x => x.i);
  const out = [], seen = new Set();
  for (const i of scored) { if (out.length >= n) break; if (!seen.has(i.subjects[0])) { out.push(i); seen.add(i.subjects[0]); } }
  for (const i of scored) { if (out.length >= n) break; if (!out.includes(i)) out.push(i); }
  return out;
}
function search(q) {
  const t = norm(q).trim().split(/\s+/).filter(Boolean);
  if (!t.length) return [];
  return IDEAS.map(i => {
    const title = norm(i.title), rest = norm([i.hook, ...i.body, i.why, i.caveat, i.subjects.map(s => subj[s].name).join(' '), (S.saved[i.id]?.note) || ''].join(' '));
    let sc = 0;
    for (const w of t) { if (title.includes(w)) sc += 3; else if (rest.includes(w)) sc += 1; else return null; }
    return { i, sc };
  }).filter(Boolean).sort((a, b) => b.sc - a.sc).map(x => x.i);
}

/* ---------- generative cover art (unique per idea, seeded, no images needed) ---------- */
function hashStr(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function coverArt(key, { w = 400, h = 240 } = {}) {
  const r = rng(hashStr(key)), style = Math.floor(r() * 4), f = n => n.toFixed(1); let g = '';
  if (style === 0) { // orbits
    const cx = w * (.35 + r() * .5), cy = h * (.2 + r() * .6), n = 4 + Math.floor(r() * 3);
    for (let k = 0; k < n; k++) g += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(h * (.12 + k * .17 + r() * .05))}" fill="none" stroke="currentColor" stroke-width="${f(1 + r() * 1.5)}" opacity="${f(.25 + .5 * r())}"/>`;
    g += `<circle cx="${f(cx + (r() - .5) * h * .6)}" cy="${f(cy + (r() - .5) * h * .6)}" r="${f(h * .055)}" fill="var(--accent)"/>`;
  } else if (style === 1) { // waves
    const n = 9;
    for (let k = 0; k < n; k++) {
      const y = h * (.08 + .84 * k / (n - 1)), amp = h * (.03 + r() * .1), ph = r() * 6.28, fr = 1.2 + r() * 2; let d = `M0 ${f(y)}`;
      for (let x = 0; x <= w; x += 16) d += ` L${x} ${f(y + Math.sin(x / w * fr * 6.28 + ph) * amp)}`;
      g += `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.4" opacity="${f(.15 + .6 * (k / n))}"/>`;
    }
    g += `<circle cx="${f(w * (.2 + r() * .6))}" cy="${f(h * (.2 + r() * .6))}" r="${f(h * .05)}" fill="var(--accent)"/>`;
  } else if (style === 2) { // dot field
    const px = r() * w, py = r() * h, cols = 15, rows = 9;
    for (let a = 0; a < cols; a++) for (let b = 0; b < rows; b++) {
      const x = (a + .5) * w / cols, y = (b + .5) * h / rows, d = Math.hypot(x - px, y - py) / w, rad = 1 + 5.2 * Math.max(0, 1 - d * 1.7);
      g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="currentColor" opacity="${f(.25 + .65 * Math.max(0, 1 - d * 1.7))}"/>`;
    }
    g += `<circle cx="${f(px)}" cy="${f(py)}" r="${f(h * .04)}" fill="var(--accent)"/>`;
  } else { // facets
    for (let k = 0; k < 8; k++) {
      const p = Array.from({ length: 3 }, () => `${f(r() * w)},${f(r() * h)}`).join(' ');
      g += `<polygon points="${p}" fill="currentColor" fill-opacity="${f(.05 + r() * .22)}" stroke="currentColor" stroke-opacity=".5" stroke-width="1"/>`;
    }
    g += `<line x1="${f(r() * w)}" y1="0" x2="${f(r() * w)}" y2="${h}" stroke="var(--accent)" stroke-width="1.5" opacity=".8"/>`;
  }
  return `<svg class="art" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${g}</svg>`;
}

/* ---------- ui bits ---------- */
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1800); }
function sheet(html) {
  const old = $('#sheet'); const replacing = !!old && old.classList.contains('open'); if (old) old.remove();
  const el = document.createElement('div'); el.className = 'sheet-wrap' + (replacing ? ' open' : ''); el.id = 'sheet';
  el.innerHTML = `<div class="scrim" data-action="closeSheet"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div>`;
  document.body.appendChild(el); if (!replacing) { el.offsetHeight; setTimeout(() => el.classList.add('open'), 30); }
  const inp = $('input.txt', el); if (inp) setTimeout(() => { inp.focus(); inp.select(); }, 250);
  return el;
}
function closeSheet() { const el = $('#sheet'); if (!el) return; el.classList.remove('open'); setTimeout(() => el.remove(), 300); }
function askName({ title, value = '', cta }, cb) {
  const el = sheet(`<h3>${esc(title)}</h3><input class="txt" maxlength="60" value="${esc(value)}" placeholder="Name" aria-label="Name"><div class="row-btns"><button class="btn ghost" data-action="closeSheet">Cancel</button><button class="btn" data-ok>${esc(cta)}</button></div>`);
  const inp = $('input', el), go = () => { const v = inp.value.trim(); if (!v) { inp.focus(); return; } closeSheet(); cb(v); };
  $('[data-ok]', el).onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); };
}
function confirmSheet({ title, text, cta }, cb) {
  const el = sheet(`<h3>${esc(title)}</h3><p class="sub">${esc(text)}</p><div class="row-btns"><button class="btn ghost" data-action="closeSheet">Cancel</button><button class="btn" style="background:var(--bad);color:#fff" data-ok>${esc(cta)}</button></div>`);
  $('[data-ok]', el).onclick = () => { closeSheet(); cb(); };
}

/* ---------- card components ---------- */
const bm = (id, cls = '') => `<button class="bm ${cls} ${isSaved(id) ? 'on' : ''}" data-action="save" data-id="${id}" aria-label="${isSaved(id) ? 'Remove from saved' : 'Save idea'}" aria-pressed="${isSaved(id)}">${I('bookmark')}</button>`;
const doneMark = id => S.read[id] ? `<span class="done-dot">${I('check')}Read</span>` : '';
function hero(i, learn) {
  const s = primary(i);
  return `<a class="hero" href="#/idea/${i.id}${learn ? '?learn=1' : ''}" style="--h:${s.hue}"><div class="artwrap">${coverArt(i.id, { w: 420, h: 300 })}</div><div class="eyebrow">${esc(s.name)}</div>
    <h2>${esc(i.title)}</h2><p>${esc(i.hook)}</p>
    <div class="row"><span>${mins(i)} min read ${S.read[i.id] ? '· ✓ Read' : ''}</span>${bm(i.id)}</div></a>`;
}
function card(i) {
  const s = primary(i);
  return `<a class="card" href="#/idea/${i.id}" style="--h:${s.hue}"><div class="txt"><div class="eyebrow">${esc(subjectsOf(i))}</div><h4>${esc(i.title)}</h4><p>${esc(i.hook)}</p>
    <div class="foot"><span class="meta">${mins(i)} min read</span>${doneMark(i.id)}<span style="margin-left:auto"></span>${bm(i.id)}</div></div><div class="thumb art-t">${coverArt(i.id, { w: 120, h: 120 })}</div></a>`;
}
const cards = a => `<div class="list">${a.map(card).join('')}</div>`;
const emptyState = (icon, title, text, extra = '') => `<div class="empty">${I(icon)}<h4>${esc(title)}</h4><p>${esc(text)}</p>${extra}</div>`;
const backBar = label => `<button class="backlink" data-action="back">${I('back')}${esc(label)}</button>`;

/* ---------- views ---------- */
const views = {};

views.discover = () => {
  const set = todaySet(), done = set.filter(i => S.read[i.id]).length;
  const d = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  return `<div class="head"><div class="date">${d}</div><div class="logo">Curio</div><div class="tag">A little curiosity, every day.</div></div>
  <div class="sect"><h3>Today’s ${set.length}</h3><span class="meta">${done} of ${set.length} read</span></div>
  ${hero(set[0])}<div style="height:14px"></div>${cards(set.slice(1))}
  <div class="end"><h3>${done === set.length ? 'You’re done for today' : 'That’s today’s set'}</h3><p>Curio is finite by design. Read one idea, then go and live your day.</p>
  <div class="row-btns"><button class="btn" data-action="surprise">${I('shuffle')}Surprise me</button><a class="btn ghost" href="#/explore">Explore subjects</a></div></div>`;
};

views.explore = () => `<div class="hdr-row"><div class="title-lg">Explore</div></div>
  <label class="search">${I('search')}<input id="q" type="search" placeholder="Search ideas" autocomplete="off" aria-label="Search ideas"></label>
  <div id="exploreBody">${exploreHome()}</div>`;
function exploreHome() {
  return `<button class="surprise" data-action="surprise">${I('shuffle')}<div><b>Surprise me</b><span>Open a random idea</span></div></button>
  <a class="surprise" href="#/map" style="text-decoration:none;color:inherit"><svg class="ico" viewBox="0 0 24 24"><circle cx="6" cy="7" r="1.6"/><circle cx="17" cy="5" r="1.6"/><circle cx="13" cy="13" r="1.6"/><circle cx="5" cy="18" r="1.6"/><circle cx="19" cy="18" r="1.6"/><path d="M6 7l7 6M17 5l-4 8M13 13l-8 5M13 13l6 5"/></svg><div><b>Constellation</b><span>See how ideas connect across subjects</span></div></a>
  <div class="sect"><h3>Subjects</h3><span class="meta">${SUBJECTS.length}</span></div>
  <div class="grid">${SUBJECTS.map(s => { const n = IDEAS.filter(i => i.subjects.includes(s.id)).length;
    return `<a class="sub-tile" href="#/subject/${s.id}" style="--h:${s.hue}"><div class="thumb">${I(s.icon)}</div><b>${esc(s.name)}</b><span>${n} idea${n === 1 ? '' : 's'}</span></a>`; }).join('')}</div>`;
}
function searchResults(q) {
  const r = search(q);
  if (!q.trim()) return exploreHome();
  if (!r.length) return emptyState('search', 'Nothing found', `No ideas match “${q.trim()}”. Try a simpler word, or browse a subject.`);
  return `<div class="sect"><h3>${r.length} result${r.length === 1 ? '' : 's'}</h3></div>${cards(r)}`;
}

views.map = () => {
  const W = 360, H = 540, pos = {};
  SUBJECTS.forEach((s, k) => { const a = -Math.PI / 2 + k * 2 * Math.PI / SUBJECTS.length; pos[s.id] = { x: W / 2 + Math.cos(a) * W * .37, y: H / 2 + Math.sin(a) * H * .39 }; });
  const nodes = IDEAS.map(i => {
    const pts = i.subjects.map(t => pos[t]), cx = pts.reduce((a, p) => a + p.x, 0) / pts.length, cy = pts.reduce((a, p) => a + p.y, 0) / pts.length;
    const r = rng(hashStr(i.id)), ang = r() * 6.283, dist = (i.subjects.length > 1 ? 10 : 24) + r() * 26;
    const toward = 0.18; // pull singles slightly inward so the ring doesn't hug the labels
    return { i, x: cx + Math.cos(ang) * dist + (W / 2 - cx) * toward, y: cy + Math.sin(ang) * dist + (H / 2 - cy) * toward };
  });
  const edges = nodes.map(n => n.i.subjects.map(t => `<line class="edge" x1="${n.x.toFixed(1)}" y1="${n.y.toFixed(1)}" x2="${pos[t].x.toFixed(1)}" y2="${pos[t].y.toFixed(1)}" stroke="hsl(${subj[t].hue} 60% 62%)"/>`).join('')).join('');
  const anchors = SUBJECTS.map(s => `<a href="#/subject/${s.id}" aria-label="${esc(s.name)}"><circle cx="${pos[s.id].x.toFixed(1)}" cy="${pos[s.id].y.toFixed(1)}" r="13" fill="hsl(${s.hue} 38% 34%)" stroke="hsl(${s.hue} 60% 62%)" stroke-width="1.5"/><text class="anchor-t" x="${pos[s.id].x.toFixed(1)}" y="${(pos[s.id].y + (pos[s.id].y > H / 2 ? 28 : -20)).toFixed(1)}">${esc(s.short)}</text></a>`).join('');
  const dots = nodes.map(n => { const rd = !!S.read[n.i.id], sv = isSaved(n.i.id);
    return `<a href="#/idea/${n.i.id}" aria-label="${esc(n.i.title)}">${sv ? `<circle class="halo" cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="10"/>` : ''}<circle class="${rd ? 'n-read' : 'n-unread'}" cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="5.5"/><circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="14" fill="transparent"/></a>`; }).join('');
  const touched = SUBJECTS.filter(s => IDEAS.some(i => S.read[i.id] && i.subjects.includes(s.id))).length;
  return `${backBar('Explore')}<div class="head" style="margin-top:6px"><div class="title-lg">Constellation</div><div class="tag">Ideas that belong to two subjects sit between them.</div></div>
  <svg class="sky-map" viewBox="0 0 ${W} ${H}" role="group" aria-label="Map of ideas by subject">${edges}${anchors}${dots}</svg>
  <div class="legend"><span><i style="background:var(--accent)"></i>Read</span><span><i style="background:var(--faint)"></i>Not yet</span><span><i style="border:1.5px solid var(--accent)"></i>Saved</span></div>
  <div class="head" style="margin-top:14px;text-align:center"><div class="meta">${touched} of ${SUBJECTS.length} subjects explored · ${Object.keys(S.read).length} of ${IDEAS.length} ideas read. Tap any star to open it.</div></div>`;
};

views.subject = ([id]) => {
  const s = subj[id]; if (!s) return notFound();
  const list = IDEAS.filter(i => i.subjects.includes(id));
  return `${backBar('Explore')}<div class="head" style="margin-top:6px"><div class="thumb" style="--h:${s.hue};width:52px;height:52px;margin-bottom:14px">${I(s.icon)}</div><div class="title-lg">${esc(s.name)}</div><div class="tag">${esc(s.blurb)}</div></div>
  <div style="height:18px"></div>${cards(list)}`;
};

views.learn = () => {
  const set = todaySet(), done = set.filter(i => S.read[i.id]).length, next = set.find(i => !S.read[i.id]);
  const R = 34, C = 2 * Math.PI * R, off = C * (1 - done / set.length);
  const qs = Object.values(S.quiz), right = qs.filter(q => q.correct).length;
  return `<div class="hdr-row"><div class="title-lg">Daily learning</div></div>
  <div class="head"><div class="tag">A short, unhurried session. ${set.length} ideas, about ${set.reduce((a, i) => a + mins(i), 0)} minutes.</div></div>
  <div style="padding:26px 0 6px;text-align:center"><svg class="ring" width="92" height="92" viewBox="0 0 92 92"><circle cx="46" cy="46" r="${R}" fill="none" stroke="var(--line)" stroke-width="6"/>
    <circle cx="46" cy="46" r="${R}" fill="none" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${off}" transform="rotate(-90 46 46)"/>
    <text x="46" y="52" text-anchor="middle" font-family="Newsreader,serif" font-size="22" fill="var(--ink)">${done}/${set.length}</text></svg>
    ${next ? `<a class="btn" href="#/idea/${next.id}?learn=1">${done ? 'Continue' : 'Start'} session</a>` : `<div class="meta">Session complete. Nicely done.</div>`}</div>
  <div class="steps">${set.map((i, n) => `<a class="step ${S.read[i.id] ? 'done' : ''}" href="#/idea/${i.id}?learn=1"><div class="n">${S.read[i.id] ? I('check') : n + 1}</div><div><b>${esc(i.title)}</b><span class="meta">${esc(primary(i).short)} · ${mins(i)} min${i.quiz ? ' · quiz' : ''}</span></div></a>`).join('')}</div>
  <div class="group-title">Knowledge checks</div>
  <div class="cardlist"><div class="item"><div class="grow"><b>${qs.length ? `${right} of ${qs.length} correct` : 'None attempted yet'}</b><span class="s">${IDEAS.filter(i => i.quiz).length} ideas include a one-question check.</span></div></div></div>`;
};

views.stashes = ([sub]) => {
  const tab = sub === 'collections' ? 'collections' : 'saved';
  return `<div class="hdr-row"><div class="title-lg">My Stashes</div>${tab === 'collections' ? `<button class="rbtn" data-action="newCollection" aria-label="New collection">${I('plus')}</button>` : ''}</div>
  <div style="height:14px"></div>
  <div class="seg" role="tablist"><button class="${tab === 'saved' ? 'on' : ''}" data-nav="#/stashes">All saved</button><button class="${tab === 'collections' ? 'on' : ''}" data-nav="#/stashes/collections">Collections</button></div>
  ${tab === 'saved' ? savedTab() : collectionsTab()}`;
};
function savedList() { return Object.keys(S.saved).map(id => byId[id]).filter(Boolean).sort((a, b) => S.saved[b.id].savedAt - S.saved[a.id].savedAt); }
function savedTab() {
  const list = savedList();
  if (!list.length) return emptyState('bookmark', 'Nothing saved yet', 'Tap the bookmark on any idea to keep it here, even offline.', '<a class="btn" href="#/discover">Find something to read</a>');
  return `<label class="search">${I('search')}<input id="sq" type="search" placeholder="Search saved ideas and notes" autocomplete="off" aria-label="Search saved"></label><div style="height:16px"></div><div id="savedBody" class="list">${list.map(card).join('')}</div>`;
}
function collectionsTab() {
  if (!S.collections.length) return emptyState('folder', 'No collections yet', 'Group saved ideas your own way, such as “To investigate” or “Psychology”.', '<button class="btn" data-action="newCollection">Create a collection</button>');
  return `<div class="group-title">${S.collections.length} collection${S.collections.length === 1 ? '' : 's'}</div><div class="cardlist">${S.collections.map(c =>
    `<a class="item" href="#/collection/${c.id}"><div class="thumb" style="--h:42;width:42px;height:42px;border-radius:11px">${I('folder')}</div><div class="grow"><b>${esc(c.name)}</b><span class="s">${c.ideas.length} idea${c.ideas.length === 1 ? '' : 's'}</span></div>${I('chev', 'chev')}</a>`).join('')}</div>`;
}
views.collection = ([id]) => {
  const c = S.collections.find(x => x.id === id); if (!c) return notFound();
  const list = c.ideas.map(x => byId[x]).filter(Boolean);
  return `${backBar('Collections')}<div class="hdr-row" style="margin-top:6px"><div class="title-lg">${esc(c.name)}</div>
    <div style="display:flex;gap:8px"><button class="rbtn" data-action="renameCollection" data-id="${c.id}" aria-label="Rename collection">${I('edit')}</button><button class="rbtn" data-action="deleteCollection" data-id="${c.id}" aria-label="Delete collection">${I('trash')}</button></div></div>
  <div class="head"><div class="meta">${list.length} idea${list.length === 1 ? '' : 's'}. Deleting a collection never deletes the ideas themselves.</div></div><div style="height:16px"></div>
  ${list.length ? cards(list) : emptyState('bookmark', 'This collection is empty', 'Open any saved idea and choose “Add to collection”.')}`;
};

views.idea = ([id], q) => {
  const i = byId[id]; if (!i) return notFound();
  const s = primary(i), learn = q.get('learn') === '1';
  const rec = S.saved[id], related = IDEAS.filter(x => x.id !== id && x.subjects.some(t => i.subjects.includes(t))).slice(0, 3);
  const set = todaySet(), nextL = learn ? set.find(x => !S.read[x.id] && x.id !== id) : null;
  return `<div class="read-prog" id="prog"></div>
  <div class="rnav"><button class="rbtn" data-action="back" aria-label="Back">${I('back')}</button><div class="grp">
    <button class="rbtn" data-action="textSheet" aria-label="Text size" style="font-family:var(--serif);font-size:17px;font-weight:600">Aa</button>
    <button class="rbtn" data-action="share" data-id="${id}" aria-label="Share">${I('share')}</button>
    <button class="rbtn ${isSaved(id) ? 'on' : ''}" data-action="save" data-id="${id}" aria-label="${isSaved(id) ? 'Remove from saved' : 'Save idea'}" aria-pressed="${isSaved(id)}">${I('bookmark')}</button></div></div>
  <div class="cover" style="--h:${s.hue}">${coverArt(id, { w: 440, h: 200 })}</div>
  <article class="rd" style="--h:${s.hue}"><div class="eyebrow">${esc(i.subjects.map(t => subj[t].name).join(' · '))}</div><h1>${esc(i.title)}</h1><div class="hook">${esc(i.hook)}</div>
    <div class="by"><b>${mins(i)} min read</b><span class="dot"></span><span>Original explanation</span><span class="dot"></span><span class="tagdemo" title="Demo copy, not editorially verified">Demo</span></div>
    <div class="body">${i.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <div class="callout"><span class="eyebrow">Why it matters</span><p>${esc(i.why)}</p></div>
    <div class="callout caveat"><span class="eyebrow">Worth knowing</span><p>${esc(i.caveat)}</p></div>
    ${i.explainer && EXPLAINERS[i.explainer] ? `<div class="rsec"><h3>Try it</h3><div id="explainer">${EXPLAINERS[i.explainer].html()}</div></div>` : ''}
    ${i.quiz ? `<div class="rsec"><h3>Check yourself</h3>${quizHtml(i)}</div>` : ''}
    ${i.sources.length ? `<div class="rsec"><h3>Sources</h3>${i.sources.map(x => `<div class="src"><b>${esc(x.title)}</b><span>${esc(x.author)}, ${esc(x.year)}${x.note ? ' · ' + esc(x.note) : ''}</span>${x.verified ? '' : '<br><span class="unv">Citation not yet verified</span>'}</div>`).join('')}</div>`
      : `<div class="rsec"><h3>Sources</h3><div class="src"><span>No sources attached yet. This is demo copy and should be checked before being relied on.</span></div></div>`}
    <div class="rsec"><h3>Your note</h3><textarea class="note" id="note" data-id="${id}" placeholder="An observation, a question, something to look up…" aria-label="Personal note">${esc(rec?.note || '')}</textarea><div class="meta" style="margin-top:6px">Writing a note saves the idea to My Stashes.</div></div>
    ${related.length ? `<div class="rsec" style="margin-left:-26px;margin-right:-26px"><h3 style="padding:0 26px">Related ideas</h3>${cards(related)}</div>` : ''}
  </article>
  <div class="bottom-actions"><button class="btn ghost" data-action="collect" data-id="${id}">${I('folder')}Add to collection</button>
    ${nextL ? `<a class="btn" href="#/idea/${nextL.id}?learn=1">Next idea ${I('chev')}</a>` : learn ? `<a class="btn" href="#/learn">Finish session</a>` : ''}</div>
  <div id="sentinel" style="height:1px"></div>`;
};
function quizHtml(i) {
  const q = i.quiz, a = S.quiz[i.id];
  return `<div class="quiz" data-id="${i.id}"><span class="eyebrow">One question</span><h4>${esc(q.q)}</h4>
    ${q.options.map((o, n) => { const cls = a ? (n === q.answer ? 'right' : (n === a.chosen ? 'wrong' : '')) : '';
      return `<button class="opt ${cls}" data-action="answer" data-id="${i.id}" data-n="${n}" ${a ? 'disabled' : ''}><span class="k">${'ABCD'[n]}</span><span>${esc(o)}</span></button>`; }).join('')}
    ${a ? `<div class="explain"><b style="color:${a.correct ? 'var(--good)' : 'var(--bad)'}">${a.correct ? 'Correct.' : 'Not quite.'}</b> ${esc(q.explain)}</div>` : ''}</div>`;
}

views.profile = () => {
  const t = S.prefs.theme, dp = S.prefs.depth, qs = Object.values(S.quiz);
  const seg = (name, cur, opts) => `<div class="seg">${opts.map(([v, l]) => `<button class="${cur === v ? 'on' : ''}" data-action="${name}" data-v="${v}" aria-pressed="${cur === v}">${l}</button>`).join('')}</div>`;
  return `<div class="hdr-row"><div class="title-lg">Profile</div></div>
  <div class="group-title">Your learning</div>
  <div class="stat-row"><div class="stat"><b>${Object.keys(S.opened).length}</b><span>Opened</span></div><div class="stat"><b>${Object.keys(S.read).length}</b><span>Read</span></div><div class="stat"><b>${Object.keys(S.saved).length}</b><span>Saved</span></div><div class="stat"><b>${qs.filter(x => x.correct).length}/${qs.length}</b><span>Quiz</span></div></div>
  <div class="group-title">Appearance</div>${seg('theme', t, [['system', 'System'], ['dark', 'Dark'], ['light', 'Light']])}
  <div class="group-title">Reading depth</div>${seg('depth', dp, [['quick', 'Quick'], ['balanced', 'Balanced'], ['detailed', 'Detailed']])}
  <div class="meta" style="padding:8px 26px 0">Shapes which ideas appear in today’s set. All ${SUBJECTS.length} subjects stay on.</div>
  <div class="group-title">Your data</div>
  <div class="cardlist"><button class="item" data-action="export">${I('dl')}<div class="grow"><b>Export backup</b><span class="s">Saves a JSON file with your stashes, notes and progress</span></div></button>
  <button class="item" data-action="import">${I('ul')}<div class="grow"><b>Restore from backup</b><span class="s">Replaces what’s on this device</span></div></button>
  <button class="item" data-action="reset">${I('trash')}<div class="grow"><b style="color:var(--bad)">Erase all my data</b><span class="s">Removes saves, notes and progress from this device</span></div></button></div>
  <input type="file" id="file" accept="application/json" hidden>
  <div class="group-title">About</div>
  <div class="cardlist"><div class="item"><div class="grow"><b>Curio 0.1 · prototype</b><span class="s">Everything stays on this device. No accounts, no tracking. The ${IDEAS.length} ideas are demo copy and their citations have not been verified.</span></div></div></div>`;
};
const notFound = () => `${backBar('Back')}${emptyState('search', 'Not found', 'That page doesn’t exist.', '<a class="btn" href="#/discover">Go to Discover</a>')}`;

/* ---------- router ---------- */
const TABS = [['discover', 'Discover', 'compass'], ['explore', 'Explore', 'grid'], ['learn', 'Learn', 'bulb'], ['stashes', 'Stashes', 'bookmark'], ['profile', 'Profile', 'user']];
const tabOf = { discover: 'discover', explore: 'explore', subject: 'explore', map: 'explore', learn: 'learn', stashes: 'stashes', collection: 'stashes', profile: 'profile' };
const scrolls = {}; let io;
function renderTabs(active) {
  $('#tabbar').innerHTML = TABS.map(([k, l, ic]) => `<a class="tab ${k === active ? 'on' : ''}" href="#/${k}" ${k === active ? 'aria-current="page"' : ''}>${I(ic)}<span>${l}</span></a>`).join('');
}
function render() {
  io?.disconnect(); closeSheet();
  const raw = location.hash.slice(1) || '/discover';
  const [path, qs] = raw.split('?'); const parts = path.split('/').filter(Boolean);
  const name = views[parts[0]] ? parts[0] : 'discover';
  const html = views[name](parts.slice(1), new URLSearchParams(qs || ''));
  document.body.classList.toggle('reading', name === 'idea');
  renderTabs(tabOf[name]);
  const v = $('#view'); v.style.animation = 'none'; v.offsetHeight; v.style.animation = '';
  v.innerHTML = html;
  scrollTo(0, name === 'idea' ? 0 : (scrolls[raw] || 0));
  if (name === 'idea') afterIdea(parts[1]);
  if (name === 'explore') { const q = $('#q'); q.oninput = () => { $('#exploreBody').innerHTML = searchResults(q.value); }; }
  if (name === 'stashes') { const q = $('#sq'); if (q) q.oninput = () => { const t = q.value.trim(); const base = savedList(); const r = t ? search(t).filter(x => isSaved(x.id)) : base;
    $('#savedBody').innerHTML = r.length ? r.map(card).join('') : emptyState('search', 'No match', 'None of your saved ideas match that search.'); }; }
  if (name === 'profile') { const f = $('#file'); f.onchange = () => importFile(f.files[0]); }
}
function afterIdea(id) {
  if (!S.opened[id]) { S.opened[id] = Date.now(); persist(); }
  const ex = EXPLAINERS[byId[id].explainer]; if (ex) ex.mount($('#explainer'));
  const note = $('#note'); let t;
  note.oninput = () => { clearTimeout(t); t = setTimeout(() => { if (!S.saved[id]) S.saved[id] = { savedAt: Date.now(), note: '' }; S.saved[id].note = note.value; persist(); refreshSaveButtons(id); }, 400); };
  io = new IntersectionObserver(e => { if (e[0].isIntersecting) markRead(id); }, { rootMargin: '0px 0px 0px 0px' });
  io.observe($('#sentinel'));
  const prog = $('#prog'); const onS = () => { const h = document.documentElement; prog.style.width = Math.min(100, scrollY / Math.max(1, h.scrollHeight - innerHeight) * 100) + '%'; };
  window.onscroll = onS; onS();
}
function refreshSaveButtons(id) {
  document.querySelectorAll(`[data-action="save"][data-id="${id}"]`).forEach(b => { const on = isSaved(id); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? 'Remove from saved' : 'Save idea'); });
}
addEventListener('hashchange', e => { try { scrolls[new URL(e.oldURL).hash.slice(1) || '/discover'] = window._lastY || 0; } catch { } window.onscroll = null; render(); });
addEventListener('scroll', () => { window._lastY = scrollY; }, { passive: true });
const go = h => { location.hash = h; };

/* ---------- actions ---------- */
function importFile(file) {
  if (!file) return;
  const r = new FileReader();
  r.onload = () => { try { const j = JSON.parse(r.result); if (!j || typeof j.saved !== 'object' || !Array.isArray(j.collections)) throw 0; S = { ...defaults(), ...j, prefs: { ...defaults().prefs, ...(j.prefs || {}) } }; persist(); applyTheme(); render(); toast('Backup restored'); } catch { toast('That file isn’t a Curio backup'); } };
  r.readAsText(file);
}
const TEXT_SCALE = [.9, 1, 1.12, 1.26];
function applyTheme() {
  document.documentElement.dataset.theme = S.prefs.theme;
  document.documentElement.style.setProperty('--rs', TEXT_SCALE[S.prefs.textSize ?? 1] || 1);
  const dark = S.prefs.theme === 'dark' || (S.prefs.theme === 'system' && !matchMedia('(prefers-color-scheme: light)').matches);
  $('meta[name=theme-color]').content = dark ? '#0d1220' : '#f5f0e6';
}
const actions = {
  back() { history.length > 1 ? history.back() : go('#/discover'); },
  closeSheet,
  textSheet() {
    const cur = S.prefs.textSize ?? 1;
    sheet(`<h3>Reading text size</h3><p class="sub">Applies to every idea.</p>
      <div class="seg" style="margin:0 0 14px">${['Small', 'Default', 'Large', 'Extra'].map((l, n) => `<button class="${cur === n ? 'on' : ''}" data-action="textSize" data-v="${n}" aria-pressed="${cur === n}" style="font-family:var(--serif);font-size:${14 + n * 3}px">${l}</button>`).join('')}</div>
      <p class="serif" style="font-size:calc(19.5px*var(--rs,1));line-height:1.6;margin-bottom:16px">When a government changes its rules, people and firms do not stand still.</p>
      <div class="row-btns"><button class="btn" data-action="closeSheet">Done</button></div>`);
  },
  textSize(el) { S.prefs.textSize = +el.dataset.v; persist(); applyTheme(); document.querySelectorAll('[data-action=textSize]').forEach(b => { const on = +b.dataset.v === S.prefs.textSize; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); },
  save(el) { const id = el.dataset.id; const was = isSaved(id); toggleSave(id); refreshSaveButtons(id); toast(was ? 'Removed from saved' : 'Saved to My Stashes'); if (location.hash.startsWith('#/stashes') || location.hash.startsWith('#/collection')) { if (was) render(); } },
  surprise() { const pool = IDEAS.filter(i => !S.read[i.id]); const p = pool.length ? pool : IDEAS; go('#/idea/' + p[Math.floor(Math.random() * p.length)].id); },
  async share(el) { const i = byId[el.dataset.id]; const text = `${i.title}: ${i.hook}`; try { if (navigator.share) await navigator.share({ title: i.title, text }); else { await navigator.clipboard.writeText(text); toast('Copied to clipboard'); } } catch { } },
  newCollection() { askName({ title: 'New collection', cta: 'Create' }, v => { S.collections.push({ id: uid(), name: v, ideas: [] }); persist(); toast('Collection created'); render(); }); },
  renameCollection(el) { const c = S.collections.find(x => x.id === el.dataset.id); askName({ title: 'Rename collection', value: c.name, cta: 'Save' }, v => { c.name = v; persist(); render(); }); },
  deleteCollection(el) { const c = S.collections.find(x => x.id === el.dataset.id); confirmSheet({ title: `Delete “${c.name}”?`, text: 'The ideas stay saved. Only this collection is removed.', cta: 'Delete' }, () => { S.collections = S.collections.filter(x => x !== c); persist(); go('#/stashes/collections'); toast('Collection deleted'); }); },
  collect(el) { collectSheet(el.dataset.id); },
  toggleCollect(el) {
    const id = el.dataset.idea, c = S.collections.find(x => x.id === el.dataset.cid);
    if (c.ideas.includes(id)) c.ideas = c.ideas.filter(x => x !== id); else { c.ideas.push(id); if (!S.saved[id]) S.saved[id] = { savedAt: Date.now(), note: '' }; }
    persist(); refreshSaveButtons(id); collectSheet(id);
  },
  newCollectFor(el) { const id = el.dataset.idea; askName({ title: 'New collection', cta: 'Create' }, v => { const c = { id: uid(), name: v, ideas: [id] }; S.collections.push(c); if (!S.saved[id]) S.saved[id] = { savedAt: Date.now(), note: '' }; persist(); refreshSaveButtons(id); collectSheet(id); }); },
  answer(el) { const i = byId[el.dataset.id], n = +el.dataset.n; if (S.quiz[i.id]) return; S.quiz[i.id] = { chosen: n, correct: n === i.quiz.answer, at: Date.now() }; persist(); $('.quiz').outerHTML = quizHtml(i); },
  theme(el) { S.prefs.theme = el.dataset.v; persist(); applyTheme(); render(); },
  depth(el) { S.prefs.depth = el.dataset.v; persist(); render(); },
  export() {
    const blob = new Blob([JSON.stringify({ app: 'curio', exportedAt: new Date().toISOString(), ...S }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `curio-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  },
  import() { $('#file').click(); },
  reset() { confirmSheet({ title: 'Erase all data?', text: 'This removes your saved ideas, notes, collections and progress from this device. It cannot be undone, so export a backup first if unsure.', cta: 'Erase' }, () => { S = defaults(); persist(); applyTheme(); toast('All data erased'); go('#/discover'); render(); }); }
};
function collectSheet(id) {
  const i = byId[id];
  sheet(`<h3>Add to collection</h3><p class="sub">${esc(i.title)}</p>
    ${S.collections.map(c => `<button class="chk ${c.ideas.includes(id) ? 'on' : ''}" data-action="toggleCollect" data-cid="${c.id}" data-idea="${id}" role="checkbox" aria-checked="${c.ideas.includes(id)}"><span class="box">${I('check')}</span>${esc(c.name)}<span class="meta" style="margin-left:auto">${c.ideas.length}</span></button>`).join('')}
    <button class="chk" data-action="newCollectFor" data-idea="${id}"><span class="box" style="border-style:dashed">${I('plus')}</span>New collection…</button>
    <div class="row-btns" style="margin-top:18px"><button class="btn" data-action="closeSheet">Done</button></div>`);
}
document.addEventListener('click', e => {
  const nav = e.target.closest('[data-nav]'); if (nav) { go(nav.dataset.nav); return; }
  const el = e.target.closest('[data-action]'); if (!el) return;
  const fn = actions[el.dataset.action]; if (!fn) return;
  if (el.closest('a')) e.preventDefault();
  e.stopPropagation(); fn(el);
});

/* ---------- boot ---------- */
applyTheme();
matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', applyTheme);
render();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
