import { useState, useRef, useEffect, useCallback } from "react";

const DEG = Math.PI / 180;
const THICKNESS = 4;

function hsl(h, s, l, a = 1) { return `hsla(${h},${s}%,${l}%,${a})`; }
function fhsl(h, s, l) { return `hsl(${h},${s}%,${l}%)`; }

// ─── Leaflet ──────────────────────────────────────────────────────────────────
function drawLeaflet(ctx, x, y, angle, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(size * 0.55, -size * 0.38, size * 1.05, size * 0.18, size, size * 0.65);
  ctx.bezierCurveTo(size * 0.48, size * 0.48, size * 0.08, size * 0.85, 0, 0);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

// ─── Compound leaf ────────────────────────────────────────────────────────────
function drawLeaf(ctx, x, y, angle, size, spreadAngle, numPairs, leafletVar, stemColor, leafColor) {
  const petiole = size * 1.4;
  const leafletSize = size * 0.6;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(petiole, 0);
  ctx.strokeStyle = stemColor;
  ctx.lineWidth = 1.2;
  ctx.lineCap = "round";
  ctx.stroke();
  for (let p = 0; p < numPairs; p++) {
    const t = (p + 1) / (numPairs + 1);
    const px = petiole * t;
    ctx.save();
    ctx.translate(px, 0);
    const lSize = leafletSize * (0.75 + leafletVar * 0.25);
    drawLeaflet(ctx, 0, 0, -spreadAngle, lSize, leafColor);
    drawLeaflet(ctx, 0, 0, Math.PI + spreadAngle, lSize, leafColor);
    ctx.restore();
  }
  drawLeaflet(ctx, petiole, 0, 0, leafletSize * 1.1, leafColor);
  ctx.restore();
}

// ─── Flower drawers (palette = { p: [h,s,l], p2?, center?, stamen? }) ────────

function drawLotus(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;
  const [p2h, p2s, p2l] = palette.p2;
  const [ch, cs, cl] = palette.center;
  ctx.save(); ctx.translate(x, y);
  ctx.translate(0, -size * 0.3);
  const petals = 8, r = size;
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    ctx.save(); ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(r * 0.4, -r * 0.6, r * 0.4, -r * 1.4, 0, -r * 1.5);
    ctx.bezierCurveTo(-r * 0.4, -r * 1.4, -r * 0.4, -r * 0.6, 0, 0);
    const grad = ctx.createLinearGradient(0, 0, 0, -r * 1.5);
    grad.addColorStop(0, fhsl(ph, ps, pl));
    grad.addColorStop(1, fhsl(p2h, p2s, p2l));
    ctx.fillStyle = grad; ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = fhsl(ch, cs, cl); ctx.fill();
  ctx.restore();
}

function drawSunflower(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;
  const [p2h, p2s, p2l] = palette.p2;
  const [ch, cs, cl] = palette.center;
  ctx.save(); ctx.translate(x, y);
  ctx.translate(0, -size * 0.9);
  const r = size;
  const petals = 20;
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    ctx.save(); ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(-r * 0.08, 0);
    ctx.bezierCurveTo(-r * 0.13, -r * 0.5, -r * 0.1, -r * 1.1, 0, -r * 1.4);
    ctx.bezierCurveTo(r * 0.1, -r * 1.1, r * 0.13, -r * 0.5, r * 0.08, 0);
    ctx.closePath();
    ctx.fillStyle = fhsl(ph + (i % 2) * 6, ps, pl);
    ctx.fill();
    ctx.restore();
  }
  for (let i = 0; i < petals; i++) {
    const a = ((i + 0.5) / petals) * Math.PI * 2;
    ctx.save(); ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(-r * 0.06, 0);
    ctx.bezierCurveTo(-r * 0.09, -r * 0.35, -r * 0.07, -r * 0.75, 0, -r * 0.9);
    ctx.bezierCurveTo(r * 0.07, -r * 0.75, r * 0.09, -r * 0.35, r * 0.06, 0);
    ctx.closePath();
    ctx.fillStyle = fhsl(p2h, p2s, p2l);
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath(); ctx.arc(0, 0, r * 0.42, 0, Math.PI * 2);
  ctx.fillStyle = fhsl(ch, cs, cl); ctx.fill();
  for (let ring = 0; ring < 3; ring++) {
    const rr = r * (0.12 + ring * 0.1);
    const dots = 6 + ring * 6;
    for (let d = 0; d < dots; d++) {
      const da = (d / dots) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(da) * rr, Math.sin(da) * rr, r * 0.04, 0, Math.PI * 2);
      ctx.fillStyle = fhsl(ch + ring * 5, cs - 5, cl + ring * 5); ctx.fill();
    }
  }
  ctx.restore();
}

function drawHibiscus(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;
  const [p2h, p2s, p2l] = palette.p2;
  // center/stamen stays yellow — palette.stamen unused here, yellow is structural
  ctx.save(); ctx.translate(x, y);
  const petals = 5, r = size;
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    ctx.save(); ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(r * 0.6, -r * 0.3, r * 0.7, -r * 1.1, 0, -r * 1.4);
    ctx.bezierCurveTo(-r * 0.7, -r * 1.1, -r * 0.6, -r * 0.3, 0, 0);
    const grad = ctx.createLinearGradient(0, 0, 0, -r * 1.4);
    grad.addColorStop(0, fhsl(ph, ps, pl));
    grad.addColorStop(1, fhsl(p2h, p2s, p2l));
    ctx.fillStyle = grad; ctx.fill();
    ctx.restore();
  }
  // stamen column — always yellow
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -r * 0.9);
  ctx.strokeStyle = fhsl(55, 100, 65); ctx.lineWidth = r * 0.12; ctx.stroke();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2, sr = r * 0.35;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * sr * 0.5, -r * 0.9 + Math.sin(a) * sr * 0.5, r * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = fhsl(55, 100, 70); ctx.fill();
  }
  ctx.restore();
}

function drawTulip(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;
  const [p2h, p2s, p2l] = palette.p2;
  const [p3h, p3s, p3l] = palette.p3;
  ctx.save(); ctx.translate(x, y);
  const r = size;
  // outer 3
  [[-0.38, fhsl(ph, ps, pl)], [0.38, fhsl(ph + 4, ps + 3, pl - 2)], [0, fhsl(ph - 3, ps - 2, pl + 4)]].forEach(([off, col]) => {
    const ox = off * r * 0.55;
    ctx.beginPath();
    ctx.moveTo(ox * 0.4, r * 0.05);
    ctx.bezierCurveTo(ox - r * 0.38, -r * 0.4, ox - r * 0.28, -r * 1.1, ox * 0.6, -r * 1.55);
    ctx.bezierCurveTo(ox * 0.6 + r * 0.08, -r * 1.62, ox * 0.6 - r * 0.08, -r * 1.62, ox * 0.6, -r * 1.55);
    ctx.bezierCurveTo(ox + r * 0.28, -r * 1.1, ox + r * 0.38, -r * 0.4, ox * 0.4, r * 0.05);
    ctx.fillStyle = col; ctx.fill();
  });
  // inner 3
  [[-0.18, fhsl(p2h, p2s, p2l)], [0.18, fhsl(p2h - 5, p2s - 3, p2l - 2)], [0, fhsl(p3h, p3s, p3l)]].forEach(([off, col]) => {
    const ox = off * r * 0.4;
    ctx.beginPath();
    ctx.moveTo(ox * 0.5, 0);
    ctx.bezierCurveTo(ox - r * 0.22, -r * 0.5, ox - r * 0.18, -r * 1.15, ox * 0.5, -r * 1.45);
    ctx.bezierCurveTo(ox * 0.5 + r * 0.06, -r * 1.5, ox * 0.5 - r * 0.06, -r * 1.5, ox * 0.5, -r * 1.45);
    ctx.bezierCurveTo(ox + r * 0.18, -r * 1.15, ox + r * 0.22, -r * 0.5, ox * 0.5, 0);
    ctx.fillStyle = col; ctx.fill();
  });
  // stamens — always yellow-ish
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * r * 0.08, -r * 0.9);
    ctx.lineTo(i * r * 0.08, -r * 1.3);
    ctx.strokeStyle = fhsl(50, 80, 45);
    ctx.lineWidth = r * 0.04; ctx.stroke();
    ctx.beginPath();
    ctx.arc(i * r * 0.08, -r * 1.3, r * 0.05, 0, Math.PI * 2);
    ctx.fillStyle = fhsl(55, 90, 55); ctx.fill();
  }
  ctx.restore();
}

function drawAllium(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;
  const [p2h, p2s, p2l] = palette.p2;
  ctx.save(); ctx.translate(x, y);
  ctx.translate(0, -size * 0.9);
  const r = size, count = 40;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const dist = r * (0.6 + Math.sin(i * 2.3) * 0.3);
    const fx = Math.cos(a) * dist, fy = Math.sin(a) * dist;
    ctx.beginPath(); ctx.arc(fx, fy, r * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = fhsl(ph, ps, pl); ctx.fill();
    ctx.beginPath(); ctx.moveTo(fx, fy);
    ctx.lineTo(fx + Math.cos(a) * r * 0.12, fy + Math.sin(a) * r * 0.12);
    ctx.strokeStyle = fhsl(p2h, p2s, p2l); ctx.lineWidth = 0.8; ctx.stroke();
  }
  ctx.restore();
}

function drawOrchid(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;
  const [p2h, p2s, p2l] = palette.p2;
  // lip stays yellow (structural) — palette doesn't override it
  ctx.save(); ctx.translate(x, y);
  ctx.translate(0, -size * 0.3);
  ctx.scale(1, -1);
  const r = size;
  [-1, 1].forEach(side => {
    ctx.save(); ctx.rotate(side * 0.7);
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.bezierCurveTo(r * 0.5 * side, -r * 0.4, r * 0.8 * side, -r * 0.9, r * 0.5 * side, -r * 1.2);
    ctx.bezierCurveTo(r * 0.2 * side, -r * 0.9, r * 0.1 * side, -r * 0.4, 0, 0);
    ctx.fillStyle = fhsl(ph, ps, pl); ctx.fill();
    ctx.restore();
  });
  ctx.beginPath(); ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-r * 0.35, -r * 0.6, -r * 0.35, -r * 1.3, 0, -r * 1.5);
  ctx.bezierCurveTo(r * 0.35, -r * 1.3, r * 0.35, -r * 0.6, 0, 0);
  ctx.fillStyle = fhsl(p2h, p2s, p2l); ctx.fill();
  // lip — always yellow
  ctx.beginPath();
  ctx.moveTo(-r * 0.3, -r * 0.1);
  ctx.bezierCurveTo(-r * 0.5, r * 0.4, -r * 0.3, r * 0.7, 0, r * 0.6);
  ctx.bezierCurveTo(r * 0.3, r * 0.7, r * 0.5, r * 0.4, r * 0.3, -r * 0.1);
  ctx.closePath();
  ctx.fillStyle = fhsl(50, 100, 65); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -r * 0.2, r * 0.12, 0, Math.PI * 2);
  ctx.fillStyle = fhsl(ph + 10, ps - 10, pl - 20); ctx.fill();
  ctx.restore();
}

function drawLavender(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;
  ctx.save(); ctx.translate(x, y);
  const r = size, stemLen = r * 1.8;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -stemLen);
  ctx.strokeStyle = fhsl(120, 30, 45); ctx.lineWidth = 1.5; ctx.stroke();
  const florets = 9;
  for (let i = 0; i < florets; i++) {
    const fy = -(stemLen * 0.25 + (i / (florets - 1)) * stemLen * 0.7);
    const fw = r * 0.22 * (1 - i / florets * 0.4);
    [-1, 1].forEach(side => {
      ctx.beginPath();
      ctx.ellipse(side * fw * 0.6, fy, fw * 0.5, fw * 0.85, side * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = fhsl(ph + i * 3, ps, pl + i * 2); ctx.fill();
    });
  }
  ctx.restore();
}

function drawDaffodil(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;
  const [ch, cs, cl] = palette.center;
  const [rh, rs, rl] = palette.rim;
  ctx.save(); ctx.translate(x, y);
  ctx.translate(0, -size * 0.4);
  const r = size;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    ctx.save(); ctx.rotate(a);
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-r * 0.28, -r * 0.4, -r * 0.28, -r * 1.0, 0, -r * 1.15);
    ctx.bezierCurveTo(r * 0.28, -r * 1.0, r * 0.28, -r * 0.4, 0, 0);
    ctx.fillStyle = fhsl(ph, ps, pl); ctx.fill();
    ctx.restore();
  }
  ctx.beginPath(); ctx.arc(0, 0, r * 0.38, 0, Math.PI * 2);
  ctx.fillStyle = fhsl(ch, cs, cl); ctx.fill();
  ctx.beginPath(); ctx.arc(0, 0, r * 0.38, 0, Math.PI * 2);
  ctx.strokeStyle = fhsl(rh, rs, rl); ctx.lineWidth = r * 0.1; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = fhsl(ch + 7, cs, cl + 12); ctx.fill();
  ctx.restore();
}

function drawBirdOfParadise(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;  // spathe (bract)
  const [p2h, p2s, p2l] = palette.p2; // petals
  const [p3h, p3s, p3l] = palette.p3; // sepals
  ctx.save(); ctx.translate(x, y);
  ctx.translate(0, -size * 0.3);
  const r = size;
  ctx.beginPath();
  ctx.moveTo(0, r * 0.2);
  ctx.bezierCurveTo(-r * 0.3, -r * 0.2, -r * 0.25, -r * 0.9, 0, -r * 1.0);
  ctx.bezierCurveTo(r * 0.25, -r * 0.9, r * 0.3, -r * 0.2, 0, r * 0.2);
  ctx.fillStyle = fhsl(ph, ps, pl); ctx.fill();
  [-30, 0, 30].forEach((deg, idx) => {
    ctx.save(); ctx.rotate(deg * DEG - Math.PI * 0.18);
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-r * 0.18, -r * 0.4, -r * 0.12, -r * 1.1, 0, -r * 1.35);
    ctx.bezierCurveTo(r * 0.12, -r * 1.1, r * 0.18, -r * 0.4, 0, 0);
    ctx.fillStyle = fhsl(p2h + idx * 6, p2s, p2l + idx * 4); ctx.fill();
    ctx.restore();
  });
  [-1, 1].forEach(s => {
    ctx.save(); ctx.rotate(s * 18 * DEG);
    ctx.beginPath(); ctx.moveTo(0, r * 0.05);
    ctx.bezierCurveTo(s * r * 0.5, -r * 0.2, s * r * 0.7, -r * 0.7, s * r * 0.5, -r * 1.0);
    ctx.bezierCurveTo(s * r * 0.2, -r * 0.8, s * r * 0.1, -r * 0.3, 0, r * 0.05);
    ctx.fillStyle = fhsl(p3h, p3s, p3l); ctx.fill();
    ctx.restore();
  });
  ctx.restore();
}

function drawPeriwinkle(ctx, x, y, size, palette) {
  const [ph, ps, pl] = palette.p;
  const [ch, cs, cl] = palette.center;
  ctx.save(); ctx.translate(x, y);
  ctx.translate(0, -size * 0.5);
  const r = size;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    ctx.save(); ctx.rotate(a + 18 * DEG);
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.bezierCurveTo(r * 0.15, -r * 0.3, r * 0.5, -r * 0.6, r * 0.15, -r * 1.05);
    ctx.bezierCurveTo(-r * 0.3, -r * 0.85, -r * 0.45, -r * 0.4, 0, 0);
    ctx.fillStyle = fhsl(ph + i * 5, ps, pl + i * 3); ctx.fill();
    ctx.restore();
  }
  ctx.beginPath(); ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = fhsl(ch, cs, cl); ctx.fill();
  ctx.beginPath(); ctx.arc(0, 0, r * 0.10, 0, Math.PI * 2);
  ctx.fillStyle = fhsl(55, 100, 72); ctx.fill();
  ctx.restore();
}

// ─── Color profiles ───────────────────────────────────────────────────────────
// Each entry: array of 6 palettes. Index 0 = natural (matches original hardcoded colors).
// Keys match what each draw function destructures.
// Constraint: orchid/hibiscus/tulip have yellow structural elements → petal profiles avoid yellow.
const FLOWER_COLORS = {
  lotus: [
    { p: [330, 70, 75], p2: [320, 60, 92], center: [55, 90, 60] },   // 0 natural pink
    { p: [200, 65, 70], p2: [210, 55, 88], center: [55, 90, 60] },   // 1 sky blue
    { p: [270, 60, 72], p2: [280, 50, 90], center: [55, 90, 60] },   // 2 violet
    { p: [350, 80, 68], p2: [355, 65, 88], center: [55, 90, 60] },   // 3 rose red
    { p: [160, 55, 65], p2: [170, 45, 85], center: [55, 90, 60] },   // 4 seafoam
    { p: [25,  75, 72], p2: [30,  60, 90], center: [55, 90, 60] },   // 5 peach
  ],
  sunflower: [
    { p: [44, 100, 58], p2: [40, 95, 50], center: [22, 55, 20] },    // 0 natural yellow
    { p: [340, 90, 62], p2: [345, 85, 52], center: [22, 55, 20] },   // 1 pink
    { p: [270, 70, 65], p2: [275, 65, 55], center: [22, 55, 20] },   // 2 lavender
    { p: [200, 80, 60], p2: [205, 75, 50], center: [22, 55, 20] },   // 3 blue
    { p: [15,  90, 58], p2: [20,  85, 48], center: [22, 55, 20] },   // 4 burnt orange
    { p: [160, 65, 55], p2: [165, 60, 45], center: [22, 55, 20] },   // 5 sage green
  ],
  hibiscus: [
    { p: [0, 90, 45],   p2: [15, 100, 65] },    // 0 natural red-orange
    { p: [310, 85, 50], p2: [320, 90, 68] },    // 1 magenta
    { p: [200, 80, 48], p2: [210, 85, 65] },    // 2 ocean blue
    { p: [270, 75, 52], p2: [280, 80, 70] },    // 3 purple
    { p: [160, 70, 42], p2: [170, 75, 60] },    // 4 teal
    { p: [25,  85, 50], p2: [35,  90, 68] },    // 5 coral
  ],
  tulip: [
    { p: [348, 82, 52], p2: [355, 88, 60], p3: [358, 90, 62] },   // 0 natural red
    { p: [210, 80, 55], p2: [215, 85, 63], p3: [220, 88, 65] },   // 1 periwinkle blue
    { p: [290, 75, 55], p2: [295, 80, 62], p3: [300, 82, 65] },   // 2 orchid purple
    { p: [160, 70, 48], p2: [165, 75, 55], p3: [170, 78, 58] },   // 3 emerald
    { p: [330, 78, 58], p2: [335, 82, 65], p3: [340, 85, 68] },   // 4 hot pink
    { p: [240, 70, 58], p2: [245, 75, 65], p3: [250, 78, 68] },   // 5 indigo
  ],
  allium: [
    { p: [280, 70, 65], p2: [290, 60, 75] },   // 0 natural purple
    { p: [340, 75, 65], p2: [350, 62, 75] },   // 1 rose
    { p: [200, 70, 62], p2: [210, 58, 72] },   // 2 steel blue
    { p: [55,  80, 65], p2: [60,  68, 75] },   // 3 gold
    { p: [160, 65, 60], p2: [170, 55, 70] },   // 4 mint
    { p: [15,  75, 65], p2: [25,  62, 75] },   // 5 peach-coral
  ],
  orchid: [
    { p: [300, 60, 72], p2: [310, 65, 78] },   // 0 natural pink-purple
    { p: [200, 60, 70], p2: [210, 65, 76] },   // 1 ice blue
    { p: [330, 65, 68], p2: [340, 70, 75] },   // 2 deep rose
    { p: [260, 60, 68], p2: [270, 65, 76] },   // 3 grape
    { p: [170, 55, 65], p2: [180, 60, 72] },   // 4 aqua
    { p: [15,  60, 72], p2: [25,  65, 78] },   // 5 blush peach
  ],
  lavender: [
    { p: [270, 65, 62] },   // 0 natural purple
    { p: [340, 65, 65] },   // 1 pink
    { p: [200, 60, 62] },   // 2 sky blue
    { p: [55,  70, 65] },   // 3 gold
    { p: [160, 58, 60] },   // 4 mint
    { p: [20,  65, 65] },   // 5 coral
  ],
  daffodil: [
    { p: [55, 100, 80], center: [38, 100, 58], rim: [28, 100, 45] },   // 0 natural white/gold
    { p: [340, 80, 85], center: [330, 85, 55], rim: [320, 90, 42] },   // 1 pink
    { p: [210, 65, 85], center: [200, 80, 55], rim: [195, 88, 42] },   // 2 blue
    { p: [280, 60, 85], center: [270, 75, 55], rim: [265, 82, 42] },   // 3 lavender
    { p: [160, 55, 85], center: [150, 70, 52], rim: [145, 78, 40] },   // 4 mint
    { p: [25,  80, 88], center: [18,  90, 58], rim: [12,  95, 45] },   // 5 peach-apricot
  ],
  birdofparadise: [
    { p: [130, 55, 32], p2: [28, 100, 55], p3: [240, 75, 58] },   // 0 natural green/orange/blue
    { p: [200, 55, 32], p2: [340, 90, 55], p3: [290, 70, 58] },   // 1 teal/crimson/violet
    { p: [30,  60, 28], p2: [55,  95, 55], p3: [160, 65, 52] },   // 2 brown/gold/sage
    { p: [260, 50, 30], p2: [310, 85, 55], p3: [170, 65, 55] },   // 3 indigo/magenta/teal
    { p: [150, 55, 30], p2: [20,  90, 58], p3: [220, 70, 60] },   // 4 forest/coral/steel
    { p: [340, 45, 30], p2: [200, 80, 55], p3: [60,  75, 55] },   // 5 burgundy/cerulean/gold
  ],
  periwinkle: [
    { p: [240, 65, 62], center: [240, 20, 96] },   // 0 natural blue-violet
    { p: [330, 65, 65], center: [330, 20, 96] },   // 1 rose
    { p: [160, 58, 60], center: [160, 20, 94] },   // 2 seafoam
    { p: [270, 60, 65], center: [270, 20, 96] },   // 3 purple
    { p: [200, 65, 62], center: [200, 20, 95] },   // 4 cornflower
    { p: [20,  65, 68], center: [20,  20, 96] },   // 5 salmon
  ],
  none: [null, null, null, null, null, null],
};

const FLOWERS = {
  lotus:          { draw: drawLotus,          label: "Lotus",            size: 18 },
  sunflower:      { draw: drawSunflower,      label: "Sunflower",        size: 20 },
  hibiscus:       { draw: drawHibiscus,       label: "Hibiscus",         size: 16 },
  tulip:          { draw: drawTulip,          label: "Tulip",            size: 16 },
  allium:         { draw: drawAllium,         label: "Allium",           size: 18 },
  orchid:         { draw: drawOrchid,         label: "Orchid",           size: 16 },
  lavender:       { draw: drawLavender,       label: "Lavender",         size: 14 },
  daffodil:       { draw: drawDaffodil,       label: "Daffodil",         size: 17 },
  birdofparadise: { draw: drawBirdOfParadise, label: "Bird of Paradise", size: 18 },
  periwinkle:     { draw: drawPeriwinkle,     label: "Periwinkle",       size: 15 },
  none:           { draw: null,               label: "None",             size: 0  },
};
const FLOWER_KEYS = Object.keys(FLOWERS);

// ─── VineSegment ──────────────────────────────────────────────────────────────
class VineSegment {
  constructor(x, y, angle, length, age) {
    this.x = x; this.y = y;
    this.angle = angle;
    this.length = length;
    this.age = age;
    this.leaves = [];
    this.flower = null;
  }
  endPoint() {
    return {
      x: this.x + Math.cos(this.angle) * this.length,
      y: this.y + Math.sin(this.angle) * this.length,
    };
  }
}

// ─── SmoothDrift ─────────────────────────────────────────────────────────────
class SmoothDrift {
  constructor() {
    this.table = Array.from({ length: 64 }, () => (Math.random() - 0.5) * 2);
    this.t = Math.random() * 64;
    this.phase = Math.random() * Math.PI * 2;
    this.period = 80 + Math.random() * 120;
    this.waveAmp = 0.55 + Math.random() * 0.35;
  }
  _noise() {
    this.t += 0.012;
    const i = Math.floor(this.t) % 64;
    const j = (i + 1) % 64;
    const f = this.t - Math.floor(this.t);
    const c = (1 - Math.cos(f * Math.PI)) / 2;
    return this.table[i] * (1 - c) + this.table[j] * c;
  }
  delta() {
    this.phase += (Math.PI * 2) / this.period;
    return Math.sin(this.phase) * this.waveAmp + this._noise() * 0.25;
  }
}

// ─── OccupancyGrid ───────────────────────────────────────────────────────────
class OccupancyGrid {
  constructor(cellSize = 40) { this.cell = cellSize; this.grid = new Map(); }
  _key(x, y) { return `${Math.floor(x / this.cell)},${Math.floor(y / this.cell)}`; }
  mark(x, y) { const k = this._key(x, y); this.grid.set(k, (this.grid.get(k) || 0) + 1); }
  density(x, y) {
    let total = 0;
    const cx = Math.floor(x / this.cell), cy = Math.floor(y / this.cell);
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++)
        total += this.grid.get(`${cx + dx},${cy + dy}`) || 0;
    return total;
  }
  clear() { this.grid.clear(); }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function VineScreensaver() {
  const canvasRef = useRef(null);

  const [speed, setSpeed] = useState(0.4);
  const [segLen, setSegLen] = useState(14);
  const [wobble, setWobble] = useState(14);
  const [leafDensity, setLeafDensity] = useState(0.5);
  const [running, setRunning] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeFlower, setActiveFlower] = useState("none");
  const [colorProfile, setColorProfile] = useState(0);

  const segmentsRef = useRef([]);
  const driftRef = useRef(new SmoothDrift());
  const gridRef = useRef(new OccupancyGrid(40));
  const runningRef = useRef(running);
  const darkModeRef = useRef(darkMode);
  const activeFlowerRef = useRef(activeFlower);
  const colorProfileRef = useRef(colorProfile);
  const paramsRef = useRef({ speed, segLen, wobble, leafDensity });
  const accumRef = useRef(0);

  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => { darkModeRef.current = darkMode; }, [darkMode]);
  useEffect(() => { activeFlowerRef.current = activeFlower; }, [activeFlower]);
  useEffect(() => { colorProfileRef.current = colorProfile; }, [colorProfile]);
  useEffect(() => { paramsRef.current = { speed, segLen, wobble, leafDensity }; },
    [speed, segLen, wobble, leafDensity]);

  const addLeaves = useCallback((seg) => {
    const { leafDensity } = paramsRef.current;
    const makeLeaf = (sizeBase, sizeRange, tBase, tRange) => ({
      side: Math.random() < 0.5 ? 1 : -1,
      size: sizeBase + Math.random() * sizeRange,
      t: tBase + Math.random() * tRange,
      spreadAngle: (45 + Math.random() * 20) * DEG,
      numPairs: Math.random() < 0.4 ? 2 : 1,
      leafletVar: Math.random(),
    });

    const flowerKey = activeFlowerRef.current;
    const flowerDef = FLOWERS[flowerKey];

    if (flowerKey !== "none" && flowerDef && Math.random() < 0.18) {
      seg.flower = {
        key: flowerKey,
        colorProfile: colorProfileRef.current,
        side: Math.random() < 0.5 ? 1 : -1,
        t: 0.3 + Math.random() * 0.6,
        size: flowerDef.size * (0.8 + Math.random() * 0.5),
      };
    }

    if (Math.random() < leafDensity)
      seg.leaves.push(makeLeaf(18, 10, 0.45, 0.45));
    if (Math.random() < leafDensity * 0.45)
      seg.leaves.push(makeLeaf(16, 8, 0.2, 0.35));
  }, []);

  const initVine = useCallback((canvas) => {
    const edge = Math.floor(Math.random() * 4);
    let sx, sy, angle;
    const w = canvas.width, h = canvas.height;
    if (edge === 0) { sx = Math.random() * w; sy = 0; angle = 85 * DEG + (Math.random() - 0.5) * 15 * DEG; }
    else if (edge === 1) { sx = w; sy = Math.random() * h; angle = 185 * DEG + (Math.random() - 0.5) * 15 * DEG; }
    else if (edge === 2) { sx = Math.random() * w; sy = h; angle = -85 * DEG + (Math.random() - 0.5) * 15 * DEG; }
    else { sx = 0; sy = Math.random() * h; angle = (Math.random() - 0.5) * 15 * DEG; }
    driftRef.current = new SmoothDrift();
    gridRef.current.clear();
    const first = new VineSegment(sx, sy, angle, paramsRef.current.segLen, 0);
    addLeaves(first);
    gridRef.current.mark(sx, sy);
    segmentsRef.current = [first];
  }, [addLeaves]);

  function edgeNudge(angle, x, y, w, h) {
    const overflow = 100;
    let ax = 0, ay = 0;
    if (x < -overflow) ax = 1;
    if (x > w + overflow) ax = -1;
    if (y < -overflow) ay = 1;
    if (y > h + overflow) ay = -1;
    if (!ax && !ay) return angle;
    const target = Math.atan2(ay, ax);
    let diff = target - angle;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    return angle + diff * 0.1;
  }

  const grow = useCallback(() => {
    const segs = segmentsRef.current;
    if (!segs.length) return;
    const canvas = canvasRef.current;
    const { wobble, segLen } = paramsRef.current;
    const last = segs[segs.length - 1];
    const ep = last.endPoint();
    const w = canvas.width, h = canvas.height;
    const grid = gridRef.current;

    const driftDelta = driftRef.current.delta() * wobble * DEG * 0.5;
    const baseAngle = last.angle + driftDelta;
    const candidates = 7;
    const spread = wobble * DEG * 0.8;
    let bestAngle = baseAngle, bestScore = -Infinity;
    const lookback = Math.min(segs.length, 20);
    const recentAngle = segs[segs.length - lookback].angle;

    for (let i = 0; i < candidates; i++) {
      const t = candidates === 1 ? 0 : (i / (candidates - 1)) - 0.5;
      const candidateAngle = baseAngle + t * spread;
      const tx = ep.x + Math.cos(candidateAngle) * segLen * 2.5;
      const ty = ep.y + Math.sin(candidateAngle) * segLen * 2.5;
      const densityPenalty = grid.density(tx, ty) * 2.5;
      let headingDiff = candidateAngle - recentAngle;
      while (headingDiff > Math.PI) headingDiff -= 2 * Math.PI;
      while (headingDiff < -Math.PI) headingDiff += 2 * Math.PI;
      const loopPenalty = Math.abs(headingDiff) > (110 * DEG) ? 8 : 0;
      const driftBonus = -Math.abs(t) * 0.5;
      const score = driftBonus - densityPenalty - loopPenalty;
      if (score > bestScore) { bestScore = score; bestAngle = candidateAngle; }
    }

    let newAngle = edgeNudge(bestAngle, ep.x, ep.y, w, h);
    const age = last.age + 1;
    const seg = new VineSegment(ep.x, ep.y, newAngle, segLen, age);
    addLeaves(seg);
    grid.mark(ep.x, ep.y);
    segs.push(seg);
  }, [addLeaves]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const isDark = darkModeRef.current;
    const segs = segmentsRef.current;
    const total = segs.length;
    const youngZone = 90;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = isDark ? "#0d1a0f" : "#f0f7e6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    segs.forEach((seg, i) => {
      const ep = seg.endPoint();
      const fromTip = total - 1 - i;
      const freshness = Math.max(0, 1 - fromTip / youngZone);

      let stemH, stemS, stemL, leafH, leafS, leafL, petioleH, petioleS, petioleL;
      if (isDark) {
        stemH = 28 + freshness * 75; stemS = 40 + freshness * 30; stemL = 28 + freshness * 18;
        leafH = 88 + freshness * 32; leafS = 52 + freshness * 32; leafL = 32 + freshness * 33;
        petioleH = stemH + 10; petioleS = stemS + 5; petioleL = stemL + 8;
      } else {
        stemH = 32 + freshness * 70; stemS = 42 + freshness * 30; stemL = 30 + freshness * 26;
        leafH = 92 + freshness * 28; leafS = 56 + freshness * 22; leafL = 34 + freshness * 34;
        petioleH = stemH + 8; petioleS = stemS + 5; petioleL = stemL + 6;
      }

      ctx.beginPath();
      ctx.moveTo(seg.x, seg.y);
      ctx.lineTo(ep.x, ep.y);
      ctx.strokeStyle = hsl(stemH, stemS, stemL);
      ctx.lineWidth = THICKNESS;
      ctx.lineCap = "round";
      ctx.stroke();

      seg.leaves.forEach((leaf) => {
        const { side, size, t, spreadAngle, numPairs, leafletVar } = leaf;
        const lx = seg.x + Math.cos(seg.angle) * seg.length * t;
        const ly = seg.y + Math.sin(seg.angle) * seg.length * t;
        drawLeaf(ctx, lx, ly, seg.angle + side * 55 * DEG, size, spreadAngle, numPairs, leafletVar,
          hsl(petioleH, petioleS, petioleL),
          hsl(leafH, leafS, leafL));
      });

      if (seg.flower) {
        const { key, colorProfile: cp, side, t, size } = seg.flower;
        const def = FLOWERS[key];
        const palette = FLOWER_COLORS[key]?.[cp];
        if (def && def.draw && palette) {
          const ax = seg.x + Math.cos(seg.angle) * seg.length * t;
          const ay = seg.y + Math.sin(seg.angle) * seg.length * t;
          const outAngle = seg.angle + side * Math.PI / 2;
          const stalkLen = size * 1.0;
          const bx = ax + Math.cos(outAngle) * stalkLen;
          const by = ay + Math.sin(outAngle) * stalkLen;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = fhsl(100, 45, 28);
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.stroke();
          ctx.restore();

          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(outAngle + Math.PI / 2);
          def.draw(ctx, 0, 0, size, palette);
          ctx.restore();
        }
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (!segmentsRef.current.length) initVine(canvas);
    };
    resize();
    window.addEventListener("resize", resize);
    let frame;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!runningRef.current) { draw(); return; }
      accumRef.current += paramsRef.current.speed;
      const steps = Math.floor(accumRef.current);
      accumRef.current -= steps;
      for (let i = 0; i < steps; i++) grow();
      draw();
    };
    frame = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [initVine, grow, draw]);

  const handleClear = () => {
    segmentsRef.current = [];
    gridRef.current.clear();
    const canvas = canvasRef.current;
    if (canvas) initVine(canvas);
  };

  const bg = darkMode ? "#0d1a0f" : "#f0f7e6";
  const panel = darkMode ? "#182b1a" : "#d8edbc";
  const text = darkMode ? "#a8d5a2" : "#1a4a1e";
  const accent = darkMode ? "#5ab85a" : "#2e7d32";
  const border = darkMode ? "#2a4a2c" : "#b0d49a";

  const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: text }}>
        <span>{label}</span>
        <span style={{ color: accent, fontFamily: "monospace" }}>{fmt ? fmt(value) : value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ accentColor: accent, width: "100%" }} />
    </div>
  );

  const COLOR_LABELS = ["Natural", "Alt 1", "Alt 2", "Alt 3", "Alt 4", "Alt 5"];

  return (
    <div style={{ width: "100vw", height: "100vh", background: bg, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ flex: 1, width: "100%", display: "block" }} />

      <div style={{
        background: panel, borderTop: `1px solid ${border}`, padding: "12px 20px",
        display: "flex", gap: 20, alignItems: "flex-end", flexWrap: "wrap"
      }}>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <button onClick={handleClear} style={btn(accent)}>Clear</button>
          <button onClick={() => setRunning(r => !r)} style={btn(running ? "#c0392b" : accent)}>
            {running ? "Pause" : "Resume"}
          </button>
          <button onClick={() => setDarkMode(d => !d)} style={btn(darkMode ? "#4a6e4c" : "#4a7a4e")}>
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Flower picker */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: text, letterSpacing: "0.05em", textTransform: "uppercase" }}>Flower</span>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {FLOWER_KEYS.map(key => (
              <button key={key} onClick={() => setActiveFlower(key)}
                style={{
                  ...btn(activeFlower === key ? accent : (darkMode ? "#2a4a2c" : "#b0d49a")),
                  fontSize: 11, padding: "4px 10px",
                  color: activeFlower === key ? "#fff" : text,
                  border: `1px solid ${activeFlower === key ? accent : border}`,
                }}>
                {FLOWERS[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Color profile picker */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: text, letterSpacing: "0.05em", textTransform: "uppercase" }}>Color</span>
          <div style={{ display: "flex", gap: 5 }}>
            {COLOR_LABELS.map((label, i) => (
              <button key={i} onClick={() => setColorProfile(i)}
                style={{
                  ...btn(colorProfile === i ? accent : (darkMode ? "#2a4a2c" : "#b0d49a")),
                  fontSize: 11, padding: "4px 10px",
                  color: colorProfile === i ? "#fff" : text,
                  border: `1px solid ${colorProfile === i ? accent : border}`,
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "10px 20px", flex: 1, minWidth: 260
        }}>
          <SliderRow label="Speed" value={speed} min={0.05} max={4} step={0.05} onChange={setSpeed} fmt={v => `${v.toFixed(2)}x`} />
          <SliderRow label="Seg length" value={segLen} min={6} max={40} step={1} onChange={setSegLen} />
          <SliderRow label="Wobble" value={wobble} min={0} max={50} step={1} onChange={setWobble} fmt={v => `${v}°`} />
          <SliderRow label="Leaf density" value={leafDensity} min={0} max={1} step={0.05} onChange={setLeafDensity} fmt={v => `${Math.round(v * 100)}%`} />
        </div>
      </div>
    </div>
  );
}

function btn(bg) {
  return {
    background: bg, color: "#fff", border: "none", borderRadius: 6,
    padding: "6px 14px", cursor: "pointer", fontWeight: 600, fontSize: 12,
    letterSpacing: "0.02em", whiteSpace: "nowrap"
  };
}
