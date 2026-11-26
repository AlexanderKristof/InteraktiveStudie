#!/usr/bin/env node
/* A Fizikai játéktér motorjának tesztjei (js/jatekter.js → STUDIE.jatekter.Motor).
 * Használat:  node tools/jatekter-teszt.js      (hiba esetén 1-es kilépési kóddal áll le) */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { console, setTimeout, clearTimeout };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['js/core.js', 'js/jatekter.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const J = ctx.STUDIE.jatekter, M = J.Motor;

let fails = 0, n = 0;
function ok(cond, name, info) {
  n++;
  if (cond) console.log('  ✔ ' + name + (info ? '  (' + info + ')' : ''));
  else { fails++; console.log('  ✘ ' + name + (info ? '  (' + info + ')' : '')); }
}
const pct = x => (x * 100).toFixed(3) + ' %';
function run(W, t, dt, cb) { dt = dt || 1 / 120; const N = Math.round(t / dt); for (let i = 0; i < N; i++) { W.step(dt); if (cb) cb(W, i); } }

console.log('Rugalmas ütközés');
{
  const W = new M.World({ gy: 0, restThresh: 0.01 });
  const a = W.add(new M.Body({ shape: 'circle', r: 0.3, x: 0, y: 0, vx: 2, m: 1, e: 1, mu: 0 }));
  const b = W.add(new M.Body({ shape: 'circle', r: 0.5, x: 3, y: 0, vx: -1, m: 3, e: 1, mu: 0 }));
  const E0 = W.energy().ek, p0 = W.momentum()[0];
  run(W, 3);
  const E1 = W.energy().ek, p1 = W.momentum()[0];
  ok(Math.abs(E1 - E0) / E0 < 0.005, 'két golyó, frontális: mozgási energia megmarad', 'eltérés ' + pct(Math.abs(E1 - E0) / E0));
  ok(Math.abs(p1 - p0) < 1e-9, 'lendület megmarad', p0.toFixed(6) + ' → ' + p1.toFixed(6));
  const v1 = (1 * 2 + 3 * -1 + 3 * (-1 - 2)) / 4, v2 = (1 * 2 + 3 * -1 + 1 * (2 + 1)) / 4;
  ok(Math.abs(a.vx - v1) < 0.01 && Math.abs(b.vx - v2) < 0.01, 'sebességek az elmélet szerint', a.vx.toFixed(4) + ' / ' + v1 + ', ' + b.vx.toFixed(4) + ' / ' + v2);
}
{
  const W = new M.World({ gy: 0, restThresh: 0.01 });
  const a = W.add(new M.Body({ shape: 'box', w: 0.6, h: 0.3, x: 1, y: 0, vx: 1.5, m: 2, e: 1, mu: 0, noRot: true }));
  const b = W.add(new M.Body({ shape: 'box', w: 0.6, h: 0.3, x: 4, y: 0, vx: -0.5, m: 1, e: 1, mu: 0, noRot: true }));
  const E0 = W.energy().ek; run(W, 4); const E1 = W.energy().ek;
  ok(Math.abs(E1 - E0) / E0 < 0.005, 'két kocsi (téglalapok, 2 érintkezési pont): energia megmarad', 'eltérés ' + pct(Math.abs(E1 - E0) / E0));
  const v1 = (2 * 1.5 + 1 * -0.5 + 1 * (-0.5 - 1.5)) / 3;
  ok(Math.abs(a.vx - v1) < 0.01, 'kocsi végsebessége', a.vx.toFixed(4) + ' / ' + v1.toFixed(4));
}
{
  /* „gáz” dobozban: 24 golyó, rugalmas falak, 20 s */
  const W = new M.World({ gy: 0, restThresh: 0.01 });
  [[0, -5.5, 12, 1], [0, 5.5, 12, 1], [-5.5, 0, 1, 12], [5.5, 0, 1, 12]].forEach(w => W.add(new M.Body({ shape: 'box', x: w[0], y: w[1], w: w[2], h: w[3], static: true, e: 1, mu: 0 })));
  let s = 7;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 24; i++) W.add(new M.Body({ shape: 'circle', r: 0.3, x: -4 + (i % 6) * 1.6, y: -3.5 + Math.floor(i / 6) * 2, vx: rnd() * 6 - 3, vy: rnd() * 6 - 3, m: 1, e: 1, mu: 0 }));
  const E0 = W.energy().ek; run(W, 20); const E1 = W.energy().ek;
  ok(Math.abs(E1 - E0) / E0 < 0.03, '24 golyó zárt dobozban 20 s: energiaeltérés < 3 %', pct((E1 - E0) / E0));
}
console.log('Rugalmatlan ütközés');
{
  const W = new M.World({ gy: 0, restThresh: 0.01 });
  const a = W.add(new M.Body({ shape: 'box', w: 0.6, h: 0.3, x: 1, y: 0, vx: 2, m: 1, e: 0, mu: 0, noRot: true }));
  const b = W.add(new M.Body({ shape: 'box', w: 0.6, h: 0.3, x: 3, y: 0, vx: 0, m: 3, e: 0, mu: 0, noRot: true }));
  run(W, 3);
  ok(Math.abs(a.vx - 0.5) < 0.01 && Math.abs(b.vx - 0.5) < 0.01, 'közös sebesség m₁v₁/(m₁+m₂) = 0,5 m/s', a.vx.toFixed(4) + ', ' + b.vx.toFixed(4));
  ok(Math.abs(W.momentum()[0] - 2) < 1e-9, 'lendület megmarad', W.momentum()[0].toFixed(6));
}
console.log('Nyugvó halmok stabilitása');
function stackTest(name, build, t) {
  const W = new M.World({ iter: 12 });
  W.add(new M.Body({ shape: 'box', x: 0, y: -0.5, w: 40, h: 1, static: true, mu: 0.6 }));
  const bs = build(W), start = bs.map(b => [b.x, b.y, b.a]);
  let maxV = 0;
  run(W, t, 1 / 120, (W, i) => { if (i > 120) bs.forEach(b => { maxV = Math.max(maxV, Math.hypot(b.vx, b.vy)); }); });
  let maxD = 0, maxA = 0;
  bs.forEach((b, i) => { maxD = Math.max(maxD, Math.hypot(b.x - start[i][0], b.y - start[i][1])); maxA = Math.max(maxA, Math.abs(b.a - start[i][2])); });
  ok(maxD < 0.03 && maxA < 0.02 && maxV < 0.05, name, 'max elmozdulás ' + (maxD * 100).toFixed(2) + ' cm, max elfordulás ' + (maxA * 180 / Math.PI).toFixed(2) + '°, max sebesség ' + maxV.toFixed(4) + ' m/s');
}
stackTest('10 dobozos torony 10 s', W => { const a = []; for (let i = 0; i < 10; i++) a.push(W.add(new M.Body({ shape: 'box', x: 0, y: 0.5 + i * 1.0, w: 1, h: 1, m: 1 }))); return a; }, 10);
stackTest('15 dobozos piramis 10 s', W => { const a = []; for (let r = 0; r < 5; r++) for (let i = 0; i < 5 - r; i++) a.push(W.add(new M.Body({ shape: 'box', x: (i - (4 - r) / 2) * 1.05, y: 0.5 + r, w: 1, h: 1, m: 1 }))); return a; }, 10);
stackTest('golyók egy dobozban (kör–téglalap) 8 s', W => {
  const a = [W.add(new M.Body({ shape: 'box', x: 0, y: 0.25, w: 4, h: 0.5, m: 4 }))];
  for (let i = 0; i < 4; i++) a.push(W.add(new M.Body({ shape: 'circle', x: -1.5 + i, y: 1.0, r: 0.5, m: 1 })));
  return a;
}, 8);
console.log('Kényszerek és pályák');
{
  /* kis kitérésű inga periódusa: T = 2π√(L/g) */
  const W = new M.World({ iter: 10 }), L = 2, th = 0.05;
  const b = W.add(new M.Body({ shape: 'circle', r: 0.1, x: L * Math.sin(th), y: -L * Math.cos(th), m: 1, nc: true }));
  W.addJoint(new M.DistJ(W.ground, b, { la: [0, 0], L: L }));
  let last = null, cross = [], prev = b.vx;
  run(W, 12, 1 / 240, (W, i) => { if (prev > 0 && b.vx <= 0) cross.push(W.time); prev = b.vx; });
  const T = (cross[cross.length - 1] - cross[0]) / (cross.length - 1), T0 = 2 * Math.PI * Math.sqrt(L / 9.81);
  ok(Math.abs(T - T0) / T0 < 0.01, 'inga periódusa', T.toFixed(4) + ' s / elmélet ' + T0.toFixed(4) + ' s');
}
{
  const W = new M.World({}); const v = 20, al = 40 * Math.PI / 180, h = 1;
  const b = W.add(new M.Body({ shape: 'circle', r: 0.1, x: 0, y: h, vx: v * Math.cos(al), vy: v * Math.sin(al), m: 1, nc: true }));
  let px = 0, py = h, land = null;
  run(W, 4, 1 / 120, () => { if (land == null && b.y <= 0 && py > 0) land = px + (b.x - px) * py / (py - b.y); px = b.x; py = b.y; });
  const g = 9.81, tf = (v * Math.sin(al) + Math.sqrt(Math.pow(v * Math.sin(al), 2) + 2 * g * h)) / g, R = v * Math.cos(al) * tf;
  ok(Math.abs(land - R) / R < 0.005, 'ferde hajítás vákuumban: hatótáv', land.toFixed(3) + ' m / elmélet ' + R.toFixed(3) + ' m');
}
{
  /* rugó: harmonikus rezgés periódusa T = 2π√(m/k) */
  const W = new M.World({ gy: 0 }), m = 2, k = 50;
  const b = W.add(new M.Body({ shape: 'circle', r: 0.1, x: 1.3, y: 0, m: m, nc: true }));
  W.addJoint(new M.Spring(W.ground, b, { L: 1, k: k, d: 0 }));
  let prev = b.vx, cr = [];
  run(W, 10, 1 / 240, W => { if (prev > 0 && b.vx <= 0) cr.push(W.time); prev = b.vx; });
  const T = (cr[cr.length - 1] - cr[0]) / (cr.length - 1), T0 = 2 * Math.PI * Math.sqrt(m / k);
  ok(Math.abs(T - T0) / T0 < 0.01, 'rugó periódusa', T.toFixed(4) + ' s / elmélet ' + T0.toFixed(4) + ' s');
}
{
  /* Newton-bölcső: 1 golyó be → 1 golyó ki */
  if (J.newtonTest) {
    const r = J.newtonTest(1);
    ok(r.ok, 'Newton-bölcső: egy golyót elengedve a túloldalon egy lendül ki', r.info);
    const r2 = J.newtonTest(2);
    ok(r2.ok, 'Newton-bölcső: két golyót elengedve kettő lendül ki', r2.info);
  }
}
if (J.bridgeTest) {
  console.log('Hídépítő: minden szintnek van költségkereten belüli megoldása');
  J.hidSzintek.forEach((L, i) => {
    const r = J.bridgeTest(i);
    ok(r.ok, (i + 1) + '. szint (' + L.nev + ')', r.info);
  });
}
console.log('\n' + (fails ? '✘ ' + fails + ' hiba / ' + n + ' teszt' : '✔ Mind a ' + n + ' teszt sikeres.'));
process.exit(fails ? 1 : 0);
