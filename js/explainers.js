// Interactive explainers. All numbers are ILLUSTRATIVE / stylised and labelled as such in the UI.
const $ = (s, r) => r.querySelector(s);
const seg = (opts) => `<div class="seg xp-seg">${opts.map(([v, l], n) => `<button class="${n === 0 ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div>`;
const wire = (el, fn) => { const bs = el.querySelectorAll('.xp-seg button'); bs.forEach(b => b.onclick = () => { bs.forEach(x => x.classList.toggle('on', x === b)); fn(b.dataset.v); }); };

export const EXPLAINERS = {
  /* ---------- Simpson's paradox ---------- */
  simpson: {
    html: () => `<div class="xp-card"><p class="xp-lead">Two treatments, A and B. Which one works better? Flip between the views.</p>
      ${seg([['pooled', 'All patients'], ['split', 'By case severity']])}<div class="xp-body"></div><div class="xp-cap"></div>
      <div class="xp-foot">Illustrative numbers, modelled on a well-known medical example.</div></div>`,
    mount(el) {
      const D = { mild: { A: [81, 87], B: [234, 270] }, severe: { A: [192, 263], B: [55, 80] } };
      const pct = ([a, b]) => Math.round(a / b * 100);
      const sum = t => [D.mild[t][0] + D.severe[t][0], D.mild[t][1] + D.severe[t][1]];
      const bar = (label, v, cls) => `<div class="xp-row"><span class="xp-l">${label}</span><div class="xp-track"><div class="xp-fill ${cls}" data-w="${pct(v)}"></div></div><b>${pct(v)}%</b><span class="xp-n">${v[0]}/${v[1]}</span></div>`;
      const show = mode => {
        const body = $('.xp-body', el), cap = $('.xp-cap', el);
        if (mode === 'pooled') {
          body.innerHTML = `<div class="xp-grp"><div class="xp-gt">All patients</div>${bar('A', sum('A'), 'a')}${bar('B', sum('B'), 'b')}</div>`;
          cap.innerHTML = '<b>B looks better overall</b> (83% vs 78%). It seems clear. But look at the next view.';
        } else {
          body.innerHTML = `<div class="xp-grp"><div class="xp-gt">Mild cases</div>${bar('A', D.mild.A, 'a')}${bar('B', D.mild.B, 'b')}</div><div class="xp-grp"><div class="xp-gt">Severe cases</div>${bar('A', D.severe.A, 'a')}${bar('B', D.severe.B, 'b')}</div>`;
          cap.innerHTML = '<b>A wins in both groups.</b> A was given mostly to severe cases, which are harder to treat, so the pooled average hides that. The mix of the groups flipped the story.';
        }
        setTimeout(() => body.querySelectorAll('.xp-fill').forEach(f => f.style.width = f.dataset.w + '%'), 30);
      };
      wire(el, show); show('pooled');
    }
  },

  /* ---------- Olbers' paradox ---------- */
  olbers: {
    html: () => `<div class="xp-card"><p class="xp-lead">Light takes time to travel. See what the sky would look like in two different universes.</p>
      ${seg([['real', 'Our universe'], ['eternal', 'Eternal and static']])}
      <canvas class="sky" width="640" height="340" role="img" aria-label="Simulated night sky"></canvas>
      <div class="xp-range"><label>Light-travel time so far: <b class="xp-val">12</b> billion years</label><input type="range" min="1" max="100" value="12" aria-label="Light-travel time in billions of years"></div>
      <div class="xp-cap"></div><div class="xp-foot">Schematic, not to scale.</div></div>`,
    mount(el) {
      const cv = $('canvas', el), g = cv.getContext('2d'), W = cv.width, H = cv.height;
      const rng = (() => { let a = 7; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; })();
      const stars = Array.from({ length: 1400 }, () => ({ x: rng() * W, y: rng() * H, d: Math.cbrt(rng()), m: rng() }));
      const range = $('input', el), val = $('.xp-val', el), cap = $('.xp-cap', el);
      let mode = 'real';
      const draw = () => {
        g.clearRect(0, 0, W, H);
        g.fillStyle = '#05070f'; g.fillRect(0, 0, W, H);
        if (mode === 'eternal') {
          const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#f6e7bd'); gr.addColorStop(1, '#ffd98a');
          g.fillStyle = gr; g.fillRect(0, 0, W, H);
          g.fillStyle = 'rgba(40,20,0,.12)'; stars.forEach(s => g.fillRect(s.x, s.y, 1, 1));
          cap.innerHTML = '<b>Every line of sight ends on a star,</b> so the whole sky would blaze like a star’s surface. That is what Olbers expected from an infinite, eternal, unchanging universe.';
          return;
        }
        const reach = range.value / 100;
        let n = 0;
        stars.forEach(s => { if (s.d <= reach) { n++; const r = 0.5 + (1 - s.d) * 1.5; g.fillStyle = `rgba(255,244,214,${0.35 + 0.6 * (1 - s.d)})`; g.beginPath(); g.arc(s.x, s.y, r, 0, 6.283); g.fill(); } });
        cap.innerHTML = `<b>${n} of ${stars.length} stars</b> in this patch have had time to send light to us. The rest are still out of reach, so the sky stays mostly dark. A finite age (plus expanding space dimming the light) is why night is dark.`;
      };
      range.oninput = () => { val.textContent = range.value; draw(); };
      wire(el, v => { mode = v; range.disabled = v === 'eternal'; el.querySelector('.xp-range').style.opacity = v === 'eternal' ? .35 : 1; draw(); });
      draw();
    }
  },

  /* ---------- Lucas critique ---------- */
  lucas: {
    html: () => `<div class="xp-card"><p class="xp-lead">Before the policy change, higher inflation seems to come with lower unemployment. Can policymakers rely on that line?</p>
      ${seg([['before', 'Before the change'], ['after', 'After people adjust']])}
      <svg class="xp-svg" viewBox="0 0 340 230" role="img" aria-label="Stylised inflation versus unemployment scatter plot"></svg>
      <div class="xp-cap"></div><div class="xp-foot">Stylised illustration, not real data.</div></div>`,
    mount(el) {
      const svg = $('svg', el), cap = $('.xp-cap', el);
      const noise = [.3, -.4, .2, -.1, .45, -.3, .1, -.5, .35, -.2, .15, -.35];
      const sx = x => 44 + x / 9 * 280, sy = y => 196 - y / 10 * 170;
      const line = (f, cls, dash) => `<line x1="${sx(0.5)}" y1="${sy(f(0.5))}" x2="${sx(8.5)}" y2="${sy(f(8.5))}" class="${cls}" ${dash ? 'stroke-dasharray="6 5"' : ''}/>`;
      const oldF = x => 8 - 0.9 * x, newF = x => 8 - 0.9 * (x - 3.5);
      const axes = `<path d="M44 26V196H324" class="xp-ax"/><text x="184" y="222" text-anchor="middle" class="xp-t">Inflation (%)</text><text x="12" y="110" transform="rotate(-90 12 110)" text-anchor="middle" class="xp-t">Unemployment (%)</text>` +
        [0, 2, 4, 6, 8].map(v => `<text x="${sx(v)}" y="210" text-anchor="middle" class="xp-tt">${v}</text>`).join('');
      const pts = (xs, f, cls) => xs.map((x, k) => `<circle cx="${sx(x)}" cy="${sy(f(x) + noise[k % noise.length])}" r="5" class="${cls}"/>`).join('');
      const before = [1, 1.4, 1.9, 2.3, 2.8, 3.1, 3.6, 4, 4.4, 4.8];
      const after = [4.4, 4.9, 5.3, 5.8, 6.2, 6.6, 7, 7.4, 7.8, 8.2];
      const show = mode => {
        if (mode === 'before') {
          svg.innerHTML = axes + line(oldF, 'xp-old') + pts(before, oldF, 'xp-pt');
          cap.innerHTML = '<b>A neat downward trend.</b> Using it, a government might think: “raise inflation to about 6% and unemployment will fall to about 2.6%.”';
        } else {
          const px = sx(6), py1 = sy(oldF(6)), py2 = sy(newF(6));
          svg.innerHTML = axes + line(oldF, 'xp-old', true) + pts(before, oldF, 'xp-pt ghost') + pts(after, newF, 'xp-pt hot') +
            `<line x1="${px}" y1="${py1}" x2="${px}" y2="${py2}" class="xp-gap"/><circle cx="${px}" cy="${py1}" r="4" class="xp-pred"/>`;
          cap.innerHTML = '<b>The old line fails.</b> Once people expect higher inflation they adjust, and the relationship shifts. At 6% inflation the old line predicted about 2.6% unemployment; this stylised world shows about 5.8%.';
        }
      };
      wire(el, show); show('before');
    }
  }
};
