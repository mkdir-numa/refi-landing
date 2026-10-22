/* ReFi Hub energy motif: square dots on a grid, light that travels and fills (docs/style-guide.md §7).
     sun    Sunfield, the lead: a halftone sun with dotted rays over rows of solar panels
     sweep  Daylight sweep, for section backgrounds: a dot-matrix array with a band of light crossing it
   On the page:  <canvas data-energy="sun" aria-hidden="true"></canvas>
                 optional: data-dark (for ink bands), data-seed="8" (another variation)
   The canvas takes its size from CSS. With prefers-reduced-motion each one draws a single still frame.
   Grid lines, the parked third direction, lives in docs/style-guide/specimen.html. */

const TAU = Math.PI * 2;
const REDUCE = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

const PAL = {
  light: { dot: '#7489AD', pulse: '#E9A93A' },
  dark: { dot: '#9AA9C4', pulse: '#F5C76A' },
};

function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function sq(ctx, x, y, r) { ctx.rect(x - r, y - r, r * 2, r * 2); }
// 0..1: how close a point is to the pointer
function near(x, y, m, rad) {
  if (m.on < 0.01) return 0;
  const dx = x - m.x, dy = y - m.y, d = Math.sqrt(dx * dx + dy * dy);
  return d < rad ? (1 - d / rad) * m.on : 0;
}

const EXPR = {};

/* Sunfield: a disc of square dots, largest at the centre, rays carrying a slow wave outwards,
   and panel rows along the bottom with light sliding across them */
EXPR.sun = {
  build(w, h) {
    const u = Math.min(w, h), g = Math.max(6, u / 40), S = { g, disc: [], rays: [], panels: [], w };
    // in a wide band the sun is cropped into the top right corner so it never sits behind text
    const wide = w > h * 1.8;
    const cx = wide ? w * 0.97 : w * 0.62, cy = wide ? h * 0.06 : h * 0.36, r = u * (wide ? 0.26 : 0.2);
    for (let y = -r; y <= r; y += g) for (let x = -r; x <= r; x += g) {
      const d = Math.hypot(x, y);
      if (d <= r) S.disc.push(cx + x, cy + y, 1 - d / r);
    }
    for (let i = 0, n = 18; i < n; i++) {
      const a = i / n * TAU + 0.08, pts = [], len = u * (0.16 + (i % 2) * 0.08);
      for (let s = r * 1.25; s < r * 1.25 + len; s += g * 0.9) {
        const yy = cy + Math.sin(a) * s;
        if (yy > h * 0.62) break;
        pts.push(cx + Math.cos(a) * s, yy);
      }
      S.rays.push(pts);
    }
    const pw = g * 6, ph = g * 3, top = h * 0.68;
    for (let row = 0; row < 3; row++) {
      const y0 = top + row * (ph + g * 1.4), shift = row * g * 1.5;
      for (let x0 = -pw + shift; x0 < w; x0 += pw + g) {
        for (let yy = 0; yy < ph; yy += g * 0.75) for (let xx = 0; xx < pw; xx += g * 0.75) S.panels.push(x0 + xx, y0 + yy);
      }
    }
    return S;
  },
  draw(ctx, S, t, m, pal) {
    const g = S.g;
    ctx.fillStyle = pal.pulse; ctx.globalAlpha = 0.95; ctx.beginPath();
    for (let i = 0; i < S.disc.length; i += 3) {
      const k = S.disc[i + 2], nr = near(S.disc[i], S.disc[i + 1], m, 90);
      sq(ctx, S.disc[i], S.disc[i + 1], g * 0.42 * (0.2 + 0.8 * k) * (1 + 0.06 * Math.sin(t * 0.9 + k * 4) + nr * 0.5));
    }
    ctx.fill();
    for (let r = 0; r < S.rays.length; r++) {
      const R = S.rays[r];
      for (let j = 0; j < R.length; j += 2) {
        let ph = ((j / 2) / 8 - t * 0.45 + r * 0.13) % 1; if (ph < 0) ph += 1;
        const lit = ph < 0.2 ? 1 - ph / 0.2 : 0;
        ctx.fillStyle = lit ? pal.pulse : pal.dot; ctx.globalAlpha = lit ? 0.4 + lit * 0.6 : 0.4;
        ctx.beginPath(); sq(ctx, R[j], R[j + 1], g * 0.11 * (1 + lit)); ctx.fill();
      }
    }
    const sx = (((t * 0.07) % 1.3) - 0.15) * S.w, p = S.panels, lit = [];
    ctx.fillStyle = pal.dot; ctx.globalAlpha = 0.45; ctx.beginPath();
    for (let i = 0; i < p.length; i += 2) {
      let k = Math.max(0, 1 - Math.abs(p[i] - sx) / (g * 7));
      k = Math.max(k, near(p[i], p[i + 1], m, 70));
      if (k > 0.08) lit.push(p[i], p[i + 1], k); else sq(ctx, p[i], p[i + 1], g * 0.1);
    }
    ctx.fill();
    ctx.fillStyle = pal.pulse;
    for (let i = 0; i < lit.length; i += 3) {
      ctx.globalAlpha = 0.35 + lit[i + 2] * 0.65; ctx.beginPath(); sq(ctx, lit[i], lit[i + 1], g * 0.1 * (1 + lit[i + 2] * 1.2)); ctx.fill();
    }
    ctx.globalAlpha = 1;
  },
};

/* Daylight sweep: square dots grouped into panels by thin gutters, a soft diagonal band of light crossing */
EXPR.sweep = {
  build(w, h, R) {
    const g = w < 500 ? 9 : 11, p = [];
    const cols = Math.ceil(w / g) + 1, rows = Math.ceil(h / g) + 1;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      if (c % 8 === 7 || r % 5 === 4) continue; // gutters between panels
      p.push(c * g + g * 0.5, r * g + g * 0.5);
    }
    return { g, p, w, h, off: R() };
  },
  draw(ctx, S, t, m, pal) {
    const p = S.p, base = S.g * 0.13, span = S.w + S.h * 0.6;
    const c = ((t * 0.085 + S.off) % 1.5) - 0.25;
    const buckets = [[], [], []];
    ctx.fillStyle = pal.dot; ctx.globalAlpha = 0.28; ctx.beginPath();
    for (let i = 0; i < p.length; i += 2) {
      let k = Math.max(0, 1 - Math.abs((p[i] + p[i + 1] * 0.6) / span - c) / 0.11);
      k = Math.max(k, near(p[i], p[i + 1], m, 80));
      if (k > 0.05) buckets[k < 0.4 ? 0 : k < 0.75 ? 1 : 2].push(p[i], p[i + 1], k);
      else sq(ctx, p[i], p[i + 1], base);
    }
    ctx.fill();
    ctx.fillStyle = pal.pulse;
    for (let b = 0; b < 3; b++) {
      ctx.globalAlpha = [0.45, 0.75, 1][b]; ctx.beginPath();
      for (let j = 0; j < buckets[b].length; j += 3) sq(ctx, buckets[b][j], buckets[b][j + 1], base * (1 + buckets[b][j + 2] * 1.6));
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  },
};

/* ---------- stage: sizing, visibility, pointer ---------- */
const stages = [];
let rafOn = false;

const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.target.__st) e.target.__st.visible = e.isIntersecting; });
  kick();
}, { rootMargin: '100px' }) : null;

let rt;
const ro = 'ResizeObserver' in window ? new ResizeObserver((es) => {
  clearTimeout(rt);
  rt = setTimeout(() => {
    es.forEach((e) => {
      const s = e.target.__st;
      if (s && (Math.round(e.contentRect.width) !== Math.round(s.w) || Math.round(e.contentRect.height) !== Math.round(s.h))) s.setup();
    });
    kick();
  }, 150);
}) : null;

class Stage {
  constructor(cv) {
    this.cv = cv; this.key = cv.dataset.energy; this.pal = cv.hasAttribute('data-dark') ? PAL.dark : PAL.light;
    this.seed = +cv.dataset.seed || 7;
    this.m = { x: 0, y: 0, tx: 0, ty: 0, on: 0, ton: 0 }; this.visible = !io; this.w = 0; this.h = 0;
    cv.__st = this;
    if (io) io.observe(cv);
    if (ro) ro.observe(cv);
    this.setup();
  }
  setup() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), w = this.cv.clientWidth, h = this.cv.clientHeight;
    if (!w || !h) { this.ctx = null; return; }
    this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(h * dpr);
    this.ctx = this.cv.getContext('2d'); this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = w; this.h = h;
    this.S = EXPR[this.key].build(w, h, rng(this.seed * 7919 + this.key.length));
    this.frame(REDUCE ? 2.4 : 1.5);
  }
  frame(t) {
    const m = this.m;
    m.x += (m.tx - m.x) * 0.2; m.y += (m.ty - m.y) * 0.2; m.on += (m.ton - m.on) * 0.08;
    this.ctx.clearRect(0, 0, this.w, this.h);
    EXPR[this.key].draw(this.ctx, this.S, t, m, this.pal);
  }
}

function loop(now) {
  const t = now / 1000;
  let any = false;
  stages.forEach((s) => { if (s.visible && s.ctx) { s.frame(t); any = true; } });
  if (any && !document.hidden) requestAnimationFrame(loop); else rafOn = false;
}
function kick() { if (!REDUCE && !rafOn) { rafOn = true; requestAnimationFrame(loop); } }
document.addEventListener('visibilitychange', kick);

if (!REDUCE) {
  window.addEventListener('pointermove', (e) => {
    stages.forEach((s) => {
      const r = s.cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, m = s.m;
      const inside = x > -20 && y > -20 && x < r.width + 20 && y < r.height + 20;
      if (inside && m.on < 0.02) { m.x = x; m.y = y; }
      m.tx = x; m.ty = y; m.ton = inside ? 1 : 0;
    });
  }, { passive: true });
}

document.querySelectorAll('canvas[data-energy]').forEach((cv) => { if (EXPR[cv.dataset.energy]) stages.push(new Stage(cv)); });
kick();
