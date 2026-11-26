/* Modell: kvadkopter (négyrotoros drón) kamerával – izometrikus nézet.
 * Világkoordináták cm-ben: a törzs középpontja az origó, a motorok az átlókon (±12, ±12) ülnek.
 * Az orr a +x irányba néz (a képen jobbra le), ott lóg a kamera a gimbalon. A talaj z = −7. */
(function () {
  var K = 8.2, OX = 450, OY = 420;
  var I = STUDIE.draw.iso(OX, OY, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  var EDGE = ' stroke="rgba(0,0,0,.32)" stroke-width="0.8" stroke-linejoin="round"';
  function f1(n) { return (+n).toFixed(1); }
  function P(p) { return f1(p[0]) + ',' + f1(p[1]); }
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  function poly(pts, fill, extra) { return '<polygon points="' + pts.map(P).join(' ') + '" fill="' + fill + '"' + (extra == null ? EDGE : extra) + '/>'; }
  function path(pts, color, w, extra) { return '<polyline points="' + pts.map(P).join(' ') + '" fill="none" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '/>'; }
  /* vízszintes sík (u = x, v = y) */
  function planeZ(z, inner, extra) {
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + (-0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + OX + ',' + f1(OY - z * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function cyl(axis, c, len, r, color, o) {
    o = o || {};
    var n = o.n || 28, s = '', i;
    function q(a, t) {
      var u = r * Math.cos(a), v = r * Math.sin(a);
      if (axis === 'y') return I.pt(c[0] + u, c[1] + t, c[2] + v);
      if (axis === 'x') return I.pt(c[0] + t, c[1] + u, c[2] + v);
      return I.pt(c[0] + u, c[1] + v, c[2] + t);
    }
    for (i = 0; i < n; i++) {
      var a0 = i / n * 2 * Math.PI, a1 = (i + 1) / n * 2 * Math.PI, m = (a0 + a1) / 2, f = Math.cos(m) + Math.sin(m);
      if (f <= -0.05) continue;
      var col = shade(color, 0.62 + 0.3 * (f + 0.05) / 1.47);
      s += '<polygon points="' + [q(a0, 0), q(a1, 0), q(a1, len), q(a0, len)].map(P).join(' ') + '" fill="' + col + '" stroke="' + col + '" stroke-width="0.5"/>';
    }
    if (o.noCap) return s;
    var cap = [];
    for (i = 0; i < n; i++) cap.push(q(i / n * 2 * Math.PI, len));
    return s + poly(cap, o.cap || shade(color, 1.08), ' stroke="rgba(0,0,0,.38)" stroke-width="0.7"');
  }
  /* lapos rúd két pont között (a karokhoz): oldalfalak + tető */
  function bar(x0, y0, x1, y1, w, z, h, color) {
    var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), nx = -dy / L * w / 2, ny = dx / L * w / 2, s = '';
    var c = [[x0 + nx, y0 + ny], [x1 + nx, y1 + ny], [x1 - nx, y1 - ny], [x0 - nx, y0 - ny]];
    var gx = (x0 + x1) / 2, gy = (y0 + y1) / 2;
    function side(a, b) {
      var vx = b[1] - a[1], vy = -(b[0] - a[0]), mx = (a[0] + b[0]) / 2 - gx, my = (a[1] + b[1]) / 2 - gy;
      if (vx * mx + vy * my < 0) { vx = -vx; vy = -vy; }
      if (vx + vy <= 0.01) return '';
      return poly([I.pt(a[0], a[1], z), I.pt(b[0], b[1], z), I.pt(b[0], b[1], z + h), I.pt(a[0], a[1], z + h)], shade(color, vx > vy ? 0.86 : 0.72));
    }
    for (var i = 0; i < 4; i++) s += side(c[i], c[(i + 1) % 4]);
    return s + poly(c.map(function (p) { return I.pt(p[0], p[1], z + h); }), color);
  }

  var M = 12.5;                                     // a motorok helye: (±M, ±M)
  var MOT = [[M, -M, 'CW'], [M, M, 'CCW'], [-M, M, 'CW'], [-M, -M, 'CCW']];   // elöl jobb/bal, hátul bal/jobb
  var ZM = 7.4, ZP = 11.6;                          // motoralap, propellersík
  var defs = '<defs>' +
    '<radialGradient id="dr-disc" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#9fb4cc" stop-opacity=".08"/><stop offset=".85" stop-color="#9fb4cc" stop-opacity=".22"/><stop offset="1" stop-color="#9fb4cc" stop-opacity=".05"/></radialGradient>' +
    '<radialGradient id="dr-lens" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="#6c7fb0"/><stop offset=".6" stop-color="#1b2140"/><stop offset="1" stop-color="#05070d"/></radialGradient>' +
    '</defs>';
  var gC = I.pt(0, 0, -7);
  var backdrop = defs +
    '<text class="lbl" x="14" y="26" font-size="17">Kvadkopter (négyrotoros drón)</text>' +
    '<text class="lbl-muted" x="14" y="44">a felső fedlap átlátszó; elöl (jobbra lent) a kamera</text>' +
    '<ellipse cx="' + f1(gC[0]) + '" cy="' + f1(gC[1]) + '" rx="' + f1(15 * 1.2247 * K) + '" ry="' + f1(15 * 0.7071 * K) + '" fill="rgba(0,0,0,.06)"' + NS + '/>';

  /* ---------- Váz: alsó lap, karok, oszlopok, átlátszó felső fedlap ---------- */
  var frame = I.box(-6.5, -6.5, 3.6, 13, 13, 0.4, '#2b2e34');
  MOT.forEach(function (m) {
    var sx = m[0] > 0 ? 1 : -1, sy = m[1] > 0 ? 1 : -1;
    frame += bar(sx * 4.5, sy * 4.5, m[0], m[1], 2.2, 4.0, 1.1, '#33373e');
    frame += cyl('z', [m[0], m[1], 4.0], 1.1, 2.6, '#33373e', { cap: '#3d424a' });   // motortartó tányér
  });
  [[-5.6, -5.6], [5.6, -5.6], [5.6, 5.6], [-5.6, 5.6]].forEach(function (s) { frame += cyl('z', [s[0], s[1], 4.0], 4.6, 0.35, '#b9a26a'); });
  frame += '<g opacity=".32">' + I.box(-6.5, -6.5, 8.6, 13, 13, 0.4, '#3a3f47') + '</g>';
  frame += planeZ(9.02, '<rect x="-6.5" y="-6.5" width="13" height="13" rx="1.2" fill="none" stroke="#1e2126" stroke-width=".18"/>', NS);
  // orrjelzés (előre néző nyíl) a felső lapon
  frame += planeZ(9.03, '<path d="M3.2 -1.2 L5.6 0 L3.2 1.2 Z" fill="#e8553d"/>', NS);

  /* ---------- Futómű: négy láb a karok alatt ---------- */
  var legs = '';
  MOT.forEach(function (m) {
    var sx = m[0] > 0 ? 1 : -1, sy = m[1] > 0 ? 1 : -1, x = sx * 8.2, y = sy * 8.2;
    var top = I.pt(x, y, 4.0), bot = I.pt(x + sx * 1.6, y + sy * 1.6, -6.4);
    legs += '<line x1="' + f1(top[0]) + '" y1="' + f1(top[1]) + '" x2="' + f1(bot[0]) + '" y2="' + f1(bot[1]) + '" stroke="#3a3f47" stroke-width="4.5" stroke-linecap="round"/>';
    legs += '<line x1="' + f1(top[0]) + '" y1="' + f1(top[1]) + '" x2="' + f1(bot[0]) + '" y2="' + f1(bot[1]) + '" stroke="#9aa3ae" stroke-width="1.4" stroke-linecap="round"' + NS + '/>';
    legs += cyl('z', [x + sx * 1.6, y + sy * 1.6, -7], 0.7, 1.1, '#3a3f47');
  });

  /* ---------- 4 BLDC motor ---------- */
  var mots = '';
  MOT.forEach(function (m) {
    mots += cyl('z', [m[0], m[1], 5.1], 0.6, 1.7, '#7c8590');   // állórész-talp
    mots += cyl('z', [m[0], m[1], 5.7], 2.6, 2.1, '#c4363a', { cap: '#d6474b' });   // forgó harang (külső forgórész)
    mots += planeZ(8.32, '<circle cx="' + m[0] + '" cy="' + m[1] + '" r="1.35" fill="#2a2d33"/>' +
      [0, 60, 120, 180, 240, 300].map(function (a) { var r = a * Math.PI / 180; return '<circle cx="' + f1(m[0] + 1.0 * Math.cos(r)) + '" cy="' + f1(m[1] + 1.0 * Math.sin(r)) + '" r=".25" fill="#7c8590"/>'; }).join(''), NS);
    mots += cyl('z', [m[0], m[1], 8.3], 1.0, 0.35, '#d9dde3');   // tengely
  });

  /* ---------- 4 ESC (motorvezérlő) a karokon + kábelek ---------- */
  var esc = '';
  MOT.forEach(function (m) {
    var sx = m[0] > 0 ? 1 : -1, sy = m[1] > 0 ? 1 : -1, cx = sx * 8.2, cy = sy * 8.2;
    esc += bar(cx - sx * 1.6, cy - sy * 1.6, cx + sx * 1.6, cy + sy * 1.6, 1.9, 5.1, 0.5, '#2f6db3');
    esc += planeZ(5.62, '<rect x="' + f1(cx - 0.55) + '" y="' + f1(cy - 0.55) + '" width="1.1" height="1.1" fill="#1c2027"/>', NS);
    // három fázisvezeték a motorhoz
    [-0.4, 0, 0.4].forEach(function (o, i) {
      var col = ['#e04848', '#e8b43a', '#3d424a'][i];
      esc += path([I.pt(cx + sx * 1.6 + o, cy + sy * 1.6 - o, 5.4), I.pt(m[0] - sx * 1.8 + o, m[1] - sy * 1.8 - o, 5.5)], col, 0.9, NS);
    });
  });

  /* ---------- Propellerek (CW / CCW) ---------- */
  var props = '';
  MOT.forEach(function (m, k) {
    var c = I.pt(m[0], m[1], ZP);
    props += '<ellipse cx="' + f1(c[0]) + '" cy="' + f1(c[1]) + '" rx="' + f1(6.6 * 1.2247 * K) + '" ry="' + f1(6.6 * 0.7071 * K) + '" fill="url(#dr-disc)" stroke="#8aa0b8" stroke-width=".7" stroke-dasharray="3 3"/>';
    var cw = m[2] === 'CW', a0 = (k * 37 + 20) * Math.PI / 180;
    var blades = '';
    [0, Math.PI].forEach(function (off) {
      var a = a0 + off, ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca, tw = cw ? 1 : -1;
      blades += '<path d="M' + f1(m[0] + 0.6 * px) + ' ' + f1(m[1] + 0.6 * py) + ' C' + f1(m[0] + 2.5 * ca + 1.3 * px * tw) + ' ' + f1(m[1] + 2.5 * sa + 1.3 * py * tw) + ' ' +
        f1(m[0] + 5.6 * ca + 0.9 * px) + ' ' + f1(m[1] + 5.6 * sa + 0.9 * py) + ' ' + f1(m[0] + 6.4 * ca) + ' ' + f1(m[1] + 6.4 * sa) +
        ' C' + f1(m[0] + 5.6 * ca - 0.5 * px) + ' ' + f1(m[1] + 5.6 * sa - 0.5 * py) + ' ' + f1(m[0] + 2.5 * ca - 0.5 * px * tw) + ' ' + f1(m[1] + 2.5 * sa - 0.5 * py * tw) + ' ' +
        f1(m[0] - 0.6 * px) + ' ' + f1(m[1] - 0.6 * py) + ' Z" fill="' + (cw ? '#20242b' : '#3c4350') + '" stroke="#0e1014" stroke-width=".08"/>' +
        '<circle cx="' + f1(m[0] + 6.0 * ca) + '" cy="' + f1(m[1] + 6.0 * sa) + '" r=".35" fill="' + (cw ? '#e8553d' : '#e9ecef') + '"/>';
    });
    // forgásirány-nyíl a tárcsa szélén
    var ar = '', r = 7.3, s0 = cw ? -0.5 : 0.5, s1 = cw ? 0.5 : -0.5, base = Math.PI * 0.25;
    ar = '<path d="M' + f1(m[0] + r * Math.cos(base + s0)) + ' ' + f1(m[1] + r * Math.sin(base + s0)) + ' A' + r + ' ' + r + ' 0 0 ' + (cw ? 1 : 0) + ' ' + f1(m[0] + r * Math.cos(base + s1)) + ' ' + f1(m[1] + r * Math.sin(base + s1)) + '" fill="none" stroke="' + (cw ? '#e8553d' : '#4c8fd6') + '" stroke-width=".28" marker-end="none"/>';
    var tip = [m[0] + r * Math.cos(base + s1), m[1] + r * Math.sin(base + s1)], tg = base + s1 + (cw ? Math.PI / 2 : -Math.PI / 2);
    ar += '<path d="M' + f1(tip[0] + 0.7 * Math.cos(tg)) + ' ' + f1(tip[1] + 0.7 * Math.sin(tg)) + ' L' + f1(tip[0] + 0.5 * Math.cos(tg + 2.3)) + ' ' + f1(tip[1] + 0.5 * Math.sin(tg + 2.3)) + ' L' + f1(tip[0] + 0.5 * Math.cos(tg - 2.3)) + ' ' + f1(tip[1] + 0.5 * Math.sin(tg - 2.3)) + ' Z" fill="' + (cw ? '#e8553d' : '#4c8fd6') + '"/>';
    props += planeZ(ZP, blades + ar);
    props += cyl('z', [m[0], m[1], ZP - 0.1], 0.6, 0.7, '#c9ced6');
  });
  // CW / CCW feliratok a tárcsák mellett
  MOT.forEach(function (m) {
    var t = I.pt(m[0] * 1.62, m[1] * 1.62, ZP);
    props += '<text x="' + f1(t[0]) + '" y="' + f1(t[1]) + '" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size="11" fill="' + (m[2] === 'CW' ? '#d2452f' : '#3577c4') + '">' + m[2] + '</text>';
  });

  /* ---------- LiPo akkumulátor (a felső lapon) ---------- */
  var bat = I.box(-5.6, -4.6, 9.0, 10.8, 4.4, 3.0, '#2f3a4a');
  bat += planeZ(12.02, '<rect x="-5" y="-4" width="9.6" height="3.2" rx=".3" fill="#f2c230"/>' +
    '<text x="-.2" y="-2.4" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size="1.1" fill="#2b2200">LiPo 4S · 14,8 V</text>', NS);
  bat += I.box(-1.0, -4.68, 8.98, 0.9, 4.56, 3.07, '#454b55');   // tépőzár-szíj
  bat += path([I.pt(5.2, -1.2, 10.5), I.pt(6.6, -0.6, 10.2), I.pt(6.6, 1.0, 9.6)], '#d23a3a', 1.6) + path([I.pt(5.2, -1.8, 10.5), I.pt(6.9, -1.2, 10.2), I.pt(6.9, 0.6, 9.6)], '#1d2026', 1.6);
  bat += I.box(5.8, 0.4, 9.0, 1.6, 1.0, 1.0, '#e8b43a');   // XT60 csatlakozó

  /* ---------- Repülésvezérlő (IMU-val) ---------- */
  var fc = I.box(-3, -3, 6.2, 6, 6, 0.3, '#1d5f3b');
  fc += I.box(-1.0, -1.0, 6.5, 2, 2, 0.45, '#1c2027');   // MCU
  fc += planeZ(6.97, '<text x="0" y="0" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size=".5" fill="#c9ced6">MCU</text>', NS);
  fc += I.box(1.6, -2.4, 6.5, 1.0, 1.0, 0.3, '#30343d');   // IMU (giroszkóp + gyorsulásmérő)
  fc += planeZ(6.82, '<text x="2.1" y="-1.9" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size=".32" fill="#e7c86a">IMU</text>', NS);
  fc += planeZ(6.52, '<path d="M-2.6 -2.6 h5.2 M-2.6 2.6 h5.2 M-2.6 -2.6 v5.2" stroke="#d6b45a" stroke-width=".08" fill="none"/>', NS);
  [[-2.6, -2.6], [2.6, -2.6], [2.6, 2.6], [-2.6, 2.6]].forEach(function (s) { fc += cyl('z', [s[0], s[1], 6.1], 0.5, 0.35, '#7c3aed'); });   // rezgéscsillapító gumibakok
  fc += I.box(-2.8, 1.4, 6.5, 1.2, 1.2, 0.5, '#e9e3cf');   // csatlakozó

  /* ---------- Barométer (habszivacs-sapkával) ---------- */
  var baro = I.box(-0.2, 1.6, 6.5, 1.4, 1.4, 0.35, '#3a3f47') + I.box(-0.4, 1.4, 6.85, 1.8, 1.8, 0.7, '#f2eee4');
  baro += planeZ(7.57, '<circle cx=".5" cy="2.3" r=".16" fill="#c9c2b0"/><circle cx=".1" cy="2" r=".12" fill="#c9c2b0"/><circle cx=".9" cy="2.6" r=".12" fill="#c9c2b0"/>', NS);

  /* ---------- Rádióvevő antennákkal ---------- */
  var rx = I.box(-5.4, 2.0, 4.0, 2.4, 3.2, 0.9, '#5b3fa0');
  rx += planeZ(4.92, '<text x="-4.2" y="3.6" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size=".55" fill="#e9e2ff">RX</text>', NS);
  [[-6.4, 6.0, 1], [-3.0, 6.6, -1]].forEach(function (a) {
    rx += path([I.pt(-4.4, 4.8, 4.6), I.pt(a[0], a[1], 5.2), I.pt(a[0] - 1.2 * a[2], a[1] + 2.4, 6.4)], '#1d2026', 1.4);
    rx += path([I.pt(a[0], a[1], 5.2), I.pt(a[0] - 1.2 * a[2], a[1] + 2.4, 6.4)], '#e8b43a', 0.9, NS);
  });

  /* ---------- GPS-modul (árbocon, hátul) ---------- */
  var gps = cyl('z', [-4.6, 3.6, 9.0], 4.0, 0.3, '#9aa3ae', { cap: '#b9c0c9' });   // árboc
  gps += cyl('z', [-4.6, 3.6, 13.0], 0.9, 2.2, '#dfe3e8', { cap: '#f3f5f7' });
  gps += planeZ(13.92, '<rect x="-5.4" y="2.8" width="1.6" height="1.6" rx=".15" fill="#c79a4a"/><path d="M-4.6 2.95 v1.3" stroke="#8a6630" stroke-width=".1"/>' +
    '<path d="M-4.6 1.75 L-4.25 2.25 L-4.95 2.25 Z" fill="#e8553d"/>', NS);

  /* ---------- Kamera + 3 tengelyes gimbal (elöl, alul) ---------- */
  var cam = I.box(4.0, -1.6, 2.6, 3.2, 3.2, 1.0, '#2b2e34');   // rezgéscsillapított tartólap
  cam += cyl('z', [5.6, 0, 1.4], 1.2, 1.0, '#555c66', { cap: '#6b7380' });    // yaw motor
  cam += I.box(5.0, -2.4, -1.4, 1.2, 0.5, 3.0, '#6b7380') + I.box(5.0, -2.4, -1.4, 3.2, 0.5, 0.6, '#6b7380');   // roll/pitch kar
  cam += cyl('y', [7.0, -2.0, -0.2], 0.5, 0.9, '#555c66', { cap: '#7d8590' });
  cam += I.box(6.0, -1.5, -1.5, 3.2, 3.0, 2.6, '#22262c');   // kameratest
  cam += cyl('x', [9.2, 0, -0.2], 0.9, 1.15, '#1c2027', { cap: 'url(#dr-lens)' });
  var lc = I.pt(10.1, 0, -0.2);
  cam += '<circle cx="' + f1(lc[0] - 2) + '" cy="' + f1(lc[1] - 2) + '" r="1.6" fill="#fff" opacity=".55"' + NS + '/>';

  STUDIE.addModel({
    id: 'dron',
    title: 'Drón (kvadkopter)',
    icon: '🚁',
    color: '#d2452f',
    category: 'Járművek',
    keywords: 'drón kvadkopter quadcopter multikopter UAV pilóta nélküli légijármű BLDC motor ESC propeller légcsavar CW CCW LiPo akkumulátor C-érték repülésvezérlő IMU giroszkóp gyorsulásmérő MEMS GPS GNSS barométer légnyomás rádióvevő távirányító kamera gimbal futómű PID szabályozás yaw pitch roll tolóerő EASA drónszabályok A1 A2 A3 C0 C1 Remote ID',
    summary: 'Négy villanymotor, négy propeller és egy pici számítógép, amely másodpercenként ezerszer is újraszámolja, melyik motor mennyivel pörögjön, hogy a drón egy helyben lebegjen, előre repüljön vagy forduljon.',
    scale: 'kb. 35 cm motortáv (átlósan), 0,9–1,4 kg',
    viewBox: '0 0 900 700',
    backdrop: backdrop,
    intro: 'A kvadkopternek nincs kormánya és nincsenek szárnyai: **mindent a négy motor fordulatszámával irányít**. Ha mind a négy egyformán gyorsabban pörög, emelkedik. Ha a hátsó kettő gyorsabb, előredől, és előre repül. Ha az egyik átlós pár gyorsabb, mint a másik, helyben elfordul.\n\nA szomszédos propellerek **ellentétes irányba forognak** (CW és CCW), így a forgatónyomatékaik kiegyenlítik egymást. A **repülésvezérlő** egy **giroszkóppal** és **gyorsulásmérővel** érzékeli a dőlést, és másodpercenként több százszor-ezerszer korrigál. A **GPS** és a **barométer** megmondja, hol van és milyen magasan. A kamera egy **gimbalon** (motoros stabilizátoron) lóg, ezért a kép akkor is nyugodt, ha a drón billeg.',
    parts: [
      {
        id: 'vaz', z: 2, name: 'Váz', svg: frame, explode: [0, 0], badge: B(-6.5, 6.5, 8.8), en: 'frame (carbon fibre plates and arms)',
        terms: ['mechanika/hajlitonyomatek', 'mechanika/szabad-rezges'],
        what: 'A drón **csontváza**: egy alsó és egy felső lap, köztük oszlopok, és a négy **kar**, amelyeknek a végén a motorok ülnek. A rajzon a felső lap átlátszó, hogy belelássunk. Az orr felőli részt egy kis nyíl jelzi: elöl van a kamera.',
        madeOf: 'Versenydrónoknál **szénszálas** lemez (könnyű és nagyon merev), gyári kameradrónoknál üvegszállal vagy szénszállal erősített **műanyag** (pl. PA, PC) fröccsöntött ház. Az oszlopok alumíniumból vannak.',
        how: 'A szénszálas lapokat gyantával átitatott szénszövet rétegekből préselik és kikeményítik, majd **CNC-maróval** vágják ki az alakot és a furatokat. A műanyag vázakat acél szerszámban fröccsöntik.',
        uni: 'A karok terhelése főleg **hajlítás**: a motor tolóereje a kar végén hajlítónyomatékot ad, `M = T·L`. A tervezés kulcsa azonban a **merevség** és a **sajátfrekvencia**: ha a váz rezgése a motorok fordulatszámával (100–400 Hz) vagy annak felharmonikusaival rezonál, a zaj belekerül a giroszkóp jelébe, és a szabályozás remegni kezd. Ezért kell merev, rövid kar és a repülésvezérlő rezgéscsillapított rögzítése.',
        fact: 'A versenydrónok szénszálas váza gyakran kevesebb mint 100 grammos, mégis kibír egy falnak csapódást 100 km/h körüli sebességgel.'
      },
      {
        id: 'motorok', z: 8, name: 'Motorok (4 db, kefe nélküli)', svg: mots, explode: [0, -55], badge: B(M, -M, 8.6), link: 'villanymotor', en: 'brushless outrunner motors (BLDC)',
        terms: ['e-mobilitas/pmsm', 'e-mobilitas/nyomatek', 'fizika-bsc/lorentz-ero'],
        what: 'Négy kis **kefe nélküli (BLDC) motor**, mindegyik egy propellert forgat. Különlegességük, hogy **kívül forog** a ház (a piros „harang”), benne az álló tekercsekkel. Percenként több ezer, kis drónoknál több tízezer fordulattal pörögnek, és nagyon gyorsan tudnak gyorsítani és lassítani: erre épül az egész irányítás.',
        madeOf: 'Állórész: vékony szilíciumacél lemezekből rétegelt mag **rézhuzal-tekercsekkel**. Forgórész: alumínium harang, belül **neodímium állandó mágnesekkel**, acél tengely és két kis golyóscsapágy.',
        how: 'Az állórészlemezeket kivágják és összepréselik, gép tekercseli a huzalt. A harangot alumíniumból esztergálják vagy marják, a mágneseket beragasztják, végül a forgórészt **kiegyensúlyozzák**, hogy ne rezegjen.',
        uni: 'A motorok jelölése pl. „2306 1700KV”: 23 mm állórész-átmérő, 6 mm magasság, és kb. 1700 fordulat/perc/volt üresjárásban. A KV és a nyomatékállandó fordítottan arányos (`k_t ≈ 60 / (2π·KV)` N·m/A). A tolóerő a fordulatszám négyzetével nő (`T ≈ c_T·ω²`), a felvett teljesítmény kb. a köbével. A **kis tehetetlenségű** forgórész teszi lehetővé, hogy a fordulatszám néhány tized másodperc alatt változzon: a kvadkopter irányíthatóságának ez az alapja.',
        fact: 'A drónmotorok azért „kifordítottak” (a ház forog), mert így a mágnesek nagyobb sugáron vannak, és ugyanakkora motor nagyobb nyomatékot ad.'
      },
      {
        id: 'esc', z: 5, name: 'ESC (motorvezérlők)', svg: esc, explode: [0, 18], badge: B(-8.2, 8.2, 5.6), en: 'electronic speed controllers (ESC)',
        terms: ['msc-teljesitmenyelektronika/haromfazisu-inverter', 'e-mobilitas/pwm', 'elektronika/mosfet-kapcsolo'],
        what: 'Az **ESC** (elektronikus fordulatszám-szabályzó) az akkumulátor egyenáramából **háromfázisú** váltakozó áramot csinál a motornak. A repülésvezérlő megmondja neki, milyen gyorsan forogjon a motor, és az ESC a tranzisztorait ehhez igazodva kapcsolgatja másodpercenként több tízezerszer. Négy motorhoz négy ESC kell; a rajzon a karokon ülnek (sok drónban egyetlen „4 az 1-ben” lapon vannak).',
        madeOf: 'Kis nyomtatott áramköri lap **MOSFET** teljesítménytranzisztorokkal (motoronként 6 db), egy kis mikrokontrollerrel és kondenzátorokkal. Rézvezetékek viszik a nagy áramot.',
        how: 'SMT-technológiával szerelik (forrasztópaszta, beültetőgép, kemence), majd rátöltik a firmware-t (pl. BLHeli vagy AM32). Hőzsugor-csőbe vagy a vázba építve kerül a drónba.',
        uni: 'Az ESC egy **háromfázisú B6-inverter**: hat MOSFET, amelyek **PWM**-mel kapcsolnak 24–96 kHz-en. A kommutációt (melyik tekercs kapjon áramot) érzékelő nélkül, a nem táplált fázisban indukált **visszahatási feszültség** (back-EMF) nullátmenetéből határozza meg. A vezérlő digitálisan küldi a parancsot (pl. **DShot** protokoll), és a „bidirectional DShot” visszaküldi a fordulatszámot is, amivel a repülésvezérlő motorzaj-szűrést végezhet.',
        fact: 'Egy versenydrón ESC-je rövid ideig motoronként több mint 50 A-t is kapcsol, miközben kisebb, mint egy postabélyeg.'
      },
      {
        id: 'propeller', z: 14, name: 'Propellerek (CW és CCW)', svg: props, explode: [0, -125], badge: B(-M, M, ZP + 1), en: 'propellers (clockwise and counter-clockwise)',
        terms: ['mechanika/perdulet', 'fizika-bsc/impulzusmomentum', 'fizika-bsc/impulzus'],
        lesson: 'fizika/newton',
        what: 'A propellerek **levegőt tolnak lefelé**, és a visszaható erő (Newton III. törvénye) **felfelé** tolja a drónt. Két propeller az óramutató járásával megegyezően (**CW**), kettő ellentétesen (**CCW**) forog, átlósan párban. Ezért kétféle propeller van: a lapátjaik tükörképei egymásnak. Ha rosszul szereled fel őket, a drón fel sem száll, vagy azonnal felborul.',
        madeOf: 'Üvegszállal erősített **műanyag** (PC, nejlon) vagy szénszál. A kameradrónok propellerei gyorsan cserélhetők (bepattintósak).',
        how: 'Fröccsöntéssel készülnek, majd minden egyes darabot **kiegyensúlyoznak**: a nehezebb lapátból egy kicsit lecsiszolnak, mert a legkisebb egyenetlenség is erős rezgést okozna a több ezres fordulaton.',
        uni: 'A **lendületelmélet** (impulzustétel) szerint lebegéskor a tolóerő `T = 2ρ·A·v_i²`, ahol A a propeller által súrolt terület, v_i a lefelé indukált légsebesség. Az ideális lebegési teljesítmény `P = T^{3/2} / √(2ρA)`: **nagyobb propeller kevesebb energiával** tart meg ugyanakkora súlyt, ezért hosszabb a nagy propelleres drónok repülési ideje. A forgó propeller a levegőt is forgatja; a reakció-**nyomaték** a motor tengelyén ellentétes irányban hat a vázra. Ha CW és CCW pár azonos fordulattal forog, ezek kioltják egymást. A **yaw** (függőleges tengely körüli fordulás) éppen ezen alapul: ha a CW pár gyorsabb, a váz a CCW irányba fordul.',
        fact: 'A helikopternek ezért kell farokrotor: egyetlen nagy rotor forgatónyomatékát ki kell egyenlíteni. A kvadkopter ezt a két ellentétesen forgó propellerpárral oldja meg.'
      },
      {
        id: 'akku', z: 12, name: 'LiPo akkumulátor', svg: bat, explode: [300, 20], badge: B(-1, -4.6, 12), link: 'akkucella', en: 'lithium-polymer battery pack (4S)',
        terms: ['e-mobilitas/belso-ellenallas', 'e-mobilitas/bms', 'e-mobilitas/cellaformatum'],
        lesson: 'elektromos-auto/akkumulator-bms',
        what: 'A drón energiaforrása: **lítium-polimer (LiPo)** akkumulátor. Egy cella 3,7 V névleges (tele 4,2 V); a „4S” csomagban négy cella van sorba kötve, ez 14,8 V. A LiPo azért jó drónba, mert **könnyű**, és nagyon nagy áramot tud adni rövid idő alatt. Egy töltéssel egy kameradrón kb. 20–45 percet repül, egy versenydrón csak néhány percet.',
        madeOf: 'Lapos, „tasakos” cellák: grafit anód, lítium-fém-oxid katód, köztük szeparátor és gél állapotú elektrolit, alumíniumfólia tasakba zárva. A csomagon vastag tápkábel (XT60 csatlakozó) és egy vékony **balanszkábel** van a cellánkénti töltéshez.',
        how: 'Az elektródfóliákat bevonják, rétegezik (vagy feltekercselik), tasakba zárják, elektrolittal töltik, majd **formázzák** (az első, lassú töltési ciklusok). A cellákat párosítják, sorba hegesztik, és zsugorfóliába csomagolják.',
        uni: 'A **C-érték** a terhelhetőséget adja meg a kapacitáshoz viszonyítva: `I_max = C · Q`. Egy 1500 mAh-s, 100C-s akku elméletileg 150 A-t adhat (a gyári számok gyakran túlzók). A valódi korlát a **belső ellenállás**: nagy áramnál a feszültség `U = U₀ − I·R_b` szerint leesik („feszültségesés”, voltage sag), és a cella melegszik (`P = I²·R_b`). A LiPo-t nem szabad cellánként kb. 3,0–3,3 V alá meríteni, és tároláskor kb. 3,8 V-on (félig töltve) érdemes tartani. A sérült, felfúvódott cella tűzveszélyes.',
        fact: 'Egy felfúvódott („pocakos”) LiPo akku belsejében gáz keletkezett: ilyet már nem szabad tölteni, hanem biztonságosan le kell adni.'
      },
      {
        id: 'fc', z: 9, name: 'Repülésvezérlő (IMU-val)', svg: fc, explode: [-230, 60], badge: B(-2.6, -2.6, 6.8), link: 'processzor', en: 'flight controller with IMU (gyroscope + accelerometer)',
        terms: ['msc-iranyitas/dron', 'szabalyozas/pid-szabalyozo', 'szabalyozas/kaszkad', 'msc-iranyitas/kalman-szuro', 'msc-beagyazott/digitalis-szuro', 'msc-beagyazott/spi'],
        what: 'A drón **agya**. Rajta van az **IMU**: egy giroszkóp (méri, milyen gyorsan fordul a drón) és egy gyorsulásmérő (méri, merre van „lefelé”). A mikrokontroller ezekből másodpercenként több százszor-ezerszer kiszámolja, mennyire dől a drón, összeveti azzal, amit a pilóta (vagy az autopilóta) szeretne, és ennek alapján utasítja a négy motort. Nélküle a kvadkopter egy másodpercig sem maradna a levegőben.',
        madeOf: 'Kis nyomtatott áramköri lap egy 32 bites **mikrokontrollerrel** (pl. ARM Cortex-M), egy **MEMS** IMU-chippel, memóriával és csatlakozókkal. Puha **gumibakokon** ül, hogy a motorok rezgése ne zavarja az érzékelőt.',
        how: 'SMT-technológiával szerelik. A MEMS érzékelő a szilíciumlapkába maratott, apró rezgő tömegekből áll, amelyeket a félvezetőgyártás eljárásaival (fotolitográfia, maratás) készítenek. A kész lapra a repülésvezérlő szoftvert (firmware) töltik.',
        uni: 'A szabályozás **kaszkád**: a külső hurok a kívánt **szöghelyzetből** (attitude) szögsebesség-alapjelet képez, a belső, gyors hurok **PID-szabályozóval** a giroszkóp mért szögsebességét követi (a versenydrónoknál 1–8 kHz-en). A beavatkozó jeleket (tolóerő, roll, pitch, yaw nyomaték) a **motorkeverő** (mixer) osztja szét a négy motorra. A szöghelyzetet a giroszkóp integrálásából becsli, a sodródást a gyorsulásmérő (gravitációs irány) javítja: **komplementer szűrő** vagy **kiterjesztett Kalman-szűrő**. A motorrezgés ellen alul áteresztő és dinamikus lyukszűrők (notch) dolgoznak a giroszkópjelen.',
        fact: 'Egy kvadkopter alapvetően instabil: ha a vezérlő egy pillanatra „lefagy”, a drón másodperceken belül felborul. Ezért a szoftvere valós idejű és rendkívül gondosan tesztelt.'
      },
      {
        id: 'baro', z: 10, name: 'Barométer (légnyomásmérő)', svg: baro, explode: [-123, -267], badge: B(0.5, 2.3, 7.6), en: 'barometric pressure sensor (barometer)',
        terms: ['msc-beagyazott/i2c', 'msc-beagyazott/digitalis-szuro'],
        lesson: 'fiz-alap/nyomas',
        what: 'Egy apró **légnyomásmérő** chip a repülésvezérlőn. Ahogy a drón emelkedik, a légnyomás csökken: a tengerszint közelében méterenként kb. 12 pascallal. Ebből tudja a drón, milyen magasan van, és ezért tud **magasságtartással** lebegni. Egy kis habszivacs-sapka védi a propellerek keltette széllökésektől.',
        madeOf: 'Egy szilíciumlapkába maratott vékony **membrán**, amely a nyomás hatására behajlik; a behajlást nyúlásmérő ellenállások (piezorezisztív elv) vagy kapacitás mérik. Fém vagy műanyag tokban, apró nyílással.',
        how: 'MEMS-technológiával gyártják, ugyanúgy, mint a mikrochipeket: a membránt a szilícium hátoldalából maratják ki. Minden darabot gyárilag **kalibrálnak** különböző nyomásokon és hőmérsékleteken, és az együtthatókat a chipben tárolják.',
        uni: 'A magasság a **barometrikus magasságképletből** jön: `h ≈ (RT/(Mg))·ln(p₀/p)`, ami kis magasságkülönbségre `Δh ≈ −Δp/(ρg)`; ρ ≈ 1,2 kg/m³ mellett `Δp ≈ 12 Pa/m`. A felbontás néhány centiméter, de az időjárás (p₀ változása) és a propellerek légárama lassú hibát okoz, ezért a vezérlő a barométert a gyorsulásmérővel és a GPS-magassággal **szenzorfúzióban** használja.',
        fact: 'Egy jó drón-barométer akár egy lépcsőfoknyi magasságkülönbséget is érzékel.'
      },
      {
        id: 'gps', z: 13, name: 'GPS-modul (iránytűvel)', svg: gps, explode: [-280, -120], badge: B(-4.6, 3.6, 15.4), en: 'GNSS receiver with magnetometer (compass)',
        terms: ['fizika-bsc/em-hullam', 'fizika-bsc/specialis-relativitas', 'msc-iranyitas/kalman-szuro'],
        what: 'A **GPS-vevő** a műholdak jeléből kiszámolja, hol van a drón a Földön. Ezzel tud egy helyben lebegni szélben is, útvonalat repülni, és ha megszakad a kapcsolat, **hazarepülni** a felszállás helyére. Általában egy **iránytű** (magnetométer) is van benne, hogy a drón tudja, merre néz. Egy kis árbocon áll, távol a motorok és kábelek mágneses zavarától.',
        madeOf: 'Egy négyzetes **kerámia antenna** (patch antenna), egy GNSS-vevőchip (GPS, Galileo, GLONASS, BeiDou), egy magnetométer chip és egy kis tartalékelem a gyorsabb induláshoz. Műanyag „gomba” burkolatban.',
        how: 'Az antennát kerámiából sajtolják és ezüstözik, a lapot SMT-vel szerelik. A modult kész egységként veszik meg a drónépítők; a drónban az iránytűt kalibrálni kell (a drónt minden irányba körbe kell forgatni).',
        uni: 'A vevő legalább **négy műhold** jeléből a futási időket méri, és ebből a háromdimenziós helyet és a saját órája hibáját számolja ki (négy ismeretlen). Az L1 sávú GPS-jel 1575,42 MHz-en érkezik, a vízszintes pontosság néhány méter, RTK-korrekcióval centiméteres. A műholdak óráinál a **relativisztikus hatások** naponta kb. 38 mikroszekundumos eltérést okoznának, ami korrekció nélkül napi több kilométeres hibát jelentene. A drón a GPS-t, az IMU-t és a barométert **Kalman-szűrővel** egyesíti.',
        fact: 'A GPS-műholdak órái a relativitáselmélet miatt naponta kb. 38 mikroszekundummal sietnének: ezt a rendszer tervezésekor be kellett számítani.'
      },
      {
        id: 'radio', z: 6, name: 'Rádióvevő', svg: rx, explode: [-285, 30], badge: B(-4.2, 3.6, 5), en: 'radio control receiver',
        terms: ['fizika-bsc/em-hullam', 'msc-beagyazott/uart'],
        lesson: 'fizika/hullamok-feny',
        what: 'Ez fogadja a **távirányító** parancsait (gáz, dőlés, fordulás, kapcsolók), és továbbítja a repülésvezérlőnek. A két antennája **merőlegesen** áll egymásra, hogy a drón bármilyen helyzetében jó legyen a vétel. Ha a jel megszakad, a vezérlő **failsafe** (biztonsági) üzemmódba kapcsol: lebeg, leszáll, vagy GPS-szel hazarepül.',
        madeOf: 'Kis lap rádióchippel, kvarc-oszcillátorral és két dipólantennával (koaxiális kábel végén egy szabadon hagyott, negyed hullámhossznyi vezetődarab).',
        how: 'SMT-vel szerelik, az antennákat forrasztják. A vevőt a távirányítóval **párosítani** (bind) kell, hogy csak a saját adóra hallgasson.',
        uni: 'A mai rendszerek többsége a **2,4 GHz-es** ISM-sávban **frekvenciaugratással** (FHSS) működik, hogy zavarok és más felhasználók mellett is megbízható legyen; nagy hatótávolságú rendszerek 868/915 MHz-et is használnak. A 2,4 GHz-es hullámhossz kb. 12,5 cm, ezért a negyedhullámú antenna kb. 31 mm. A vevő soros vonalon (**UART**, pl. CRSF vagy SBUS protokoll) adja tovább a csatornákat, és visszafelé telemetriát (akkufeszültség, jelerősség) küld.',
        fact: 'A vevő antennáinak 90°-os állása nem dísz: egy dipólantenna a saját tengelye irányában szinte semmit sem vesz, a másik antenna ilyenkor átveszi a szerepét.'
      },
      {
        id: 'kamera', z: 7, name: 'Kamera és gimbal', svg: cam, explode: [175, 125], badge: B(7.6, -1.5, 1.3), en: 'camera on a 3-axis gimbal',
        terms: ['szabalyozas/pid-szabalyozo', 'msc-iranyitas/villamos-hajtas'],
        what: 'A kamera egy **gimbalon** lóg: ez egy motoros, háromtengelyes felfüggesztés, amely a drón billegése ellenére is vízszintesen tartja a kamerát. Ha a drón előredől, hogy előre repüljön, a gimbal hátrabillenti a kamerát, így a kép nyugodt marad. A gimbal saját giroszkóppal és három kis kefe nélküli motorral dolgozik.',
        madeOf: 'Kamera: lencserendszer (üveg- és műanyag lencsék), **CMOS képérzékelő**, képfeldolgozó processzor. Gimbal: alumínium vagy műanyag karok, három lapos BLDC motor, gumi rezgéscsillapítók a tartólapnál.',
        how: 'A képérzékelőt félvezető-technológiával gyártják, a lencséket tisztatérben szerelik és állítják be. A gimbal motorjait és karjait úgy szerelik össze, hogy a kamera súlypontja a forgástengelyekbe essen (kiegyensúlyozás), és a gyárban kalibrálják.',
        uni: 'A gimbal tengelyenként egy **zárt szabályozási kör**: a kamera mögötti IMU a tényleges szöghelyzetet méri, a szabályozó (PID vagy FOC-alapú áramszabályozással) a motor nyomatékát úgy állítja, hogy a hiba nulla legyen. A jó **mechanikai kiegyensúlyozás** miatt a motoroknak csak a zavarásokat kell kompenzálniuk, ezért kis motorok elegendők. A nagyfrekvenciás rezgést a gumibakok szűrik (passzív izoláció), a lassú billegést a motorok (aktív stabilizálás).',
        fact: 'Egy jó gimbal a kamerát néhány század foknyi pontossággal tartja vízszintesen, miközben maga a drón akár 30°-ot is dől.'
      },
      {
        id: 'futomu', z: 1, name: 'Futómű (lábak)', svg: legs, explode: [0, 70], badge: B(9.8, 9.8, -6.4), en: 'landing gear',
        what: 'A négy **láb** emeli meg a drónt annyira, hogy leszálláskor a kamera és a gimbal ne érjen a földhöz. Rugalmasak, így tompítják a kemény leszállást. A végükön gumitalp van, hogy a drón ne csússzon el.',
        madeOf: 'Műanyag (PA, PC) vagy szénszálas cső, gumi talpakkal. Nagyobb drónoknál a lábak **behúzhatók**, hogy repülés közben ne lógjanak a kamera képébe.',
        how: 'A műanyag lábakat fröccsöntik, a szénszálas csöveket tekercseléssel vagy húzással (pultrúzió) készítik. A talpakat ráragasztják vagy rápattintják.',
        uni: 'Leszálláskor a futómű a mozgási energiát rugalmas alakváltozással nyeli el: a lábak rugómerevsége és a talp csillapítása határozza meg, mekkora erőcsúcs éri a vázat és az elektronikát. Ugyanakkor a futómű a teljes tömeghez ad, és légellenállást is okoz, ezért könnyű és karcsú.',
        fact: 'Sok kis drónnak egyáltalán nincs külön lába: a motorok alja vagy a váz pereme ér földet.'
      }
    ],
    uni: {
      text: 'A kvadkopter négy bemenettel (a négy motor fordulatszáma) hat szabadságfokot irányít, ezért **alulaktuált** rendszer: vízszintesen csak úgy tud gyorsulni, hogy megdől. Minden propeller tolóereje `T_i = c_T·ω_i²`, reakciónyomatéka `Q_i = c_Q·ω_i²`. A teljes tolóerő `T = ΣT_i`; a roll- és pitch-nyomaték a szemközti motorok tolóerő-különbségéből adódik (`τ = L·ΔT`, ahol L a kar hossza); a **yaw-nyomaték** a CW és CCW pár reakciónyomatékainak különbsége: `τ_z = c_Q·(ω_CCW² − ω_CW²)` (előjel a konvenciótól függ). Lebegéskor `T = m·g`, motoronként tehát a súly negyede. Jó irányíthatósághoz a **tolóerő/súly arány** legalább kb. 2 legyen. A **lendületelmélet** szerint `T = 2ρ·A·v_i²`, az ideális lebegési teljesítmény `P = T^{3/2}/√(2ρA)`. A szabályozás **kaszkád**: belső szögsebesség-hurok (PID, 1–8 kHz), rá épül a szöghelyzet-, a sebesség- és a pozícióhurok. A szöghelyzetet giroszkóp + gyorsulásmérő **szenzorfúziója** (komplementer vagy Kalman-szűrő) adja, a pozíciót GPS + barométer + IMU. Az energiaforrás **LiPo**: `I_max = C·Q`, a kapocsfeszültség `U = U₀ − I·R_b`. **Szabályozási környezet (EU):** a 2019/947/EU rendelet 2020. december 31. óta alkalmazandó. A „nyílt” (open) kategóriában legfeljebb 25 kg-os drón, látótávolságon belül és általában legfeljebb 120 m magasan repülhet; alkategóriái az **A1** (emberek fölött, de nem tömeg fölött; C0/C1 osztály vagy 250 g alatti drón), az **A2** (emberek közelében, C2 osztály, vizsgával) és az **A3** (emberektől és lakott területtől távol). A 250 g-os vagy nehezebb, illetve a kamerás drónok üzemeltetőjének regisztrálnia kell magát a lakóhelye szerinti nemzeti hatóságnál; 2024. január 1. óta a C1–C3 osztályú drónoknál kötelező a távoli azonosítás (**Remote ID**). Repülés előtt mindig nézd meg a nemzeti hatóság aktuális szabályait és a légtér-korlátozásokat: az egyes országok, köztük Magyarország, további előírásokat is alkalmazhatnak.',
      terms: ['msc-iranyitas/dron', 'szabalyozas/pid-szabalyozo', 'szabalyozas/kaszkad', 'msc-iranyitas/kalman-szuro', 'mechanika/perdulet', 'e-mobilitas/belso-ellenallas', 'msc-iranyitas/lqr']
    },
    steps: [
      { icon: '🔋', title: '1. Bekapcsolás és önteszt', text: 'Az **akkumulátor** csatlakoztatása után a **repülésvezérlő** elindul, és pár másodpercig mozdulatlanul méri a **giroszkóp** nullpontját (ezért nem szabad ilyenkor mozgatni a drónt). Ellenőrzi az **ESC-ket**, a **rádióvevőt** és az akkufeszültséget.', parts: ['akku', 'fc', 'esc', 'radio'] },
      { icon: '🛰️', title: '2. Műholdak keresése', text: 'A **GPS** megkeresi a műholdakat; ha elég van (jó pozíció), a drón elmenti a felszállás helyét **kezdőpontként** (home point). Az **iránytű** megmondja, merre néz az orra, a **barométer** nullázza a magasságot.', parts: ['gps', 'baro'] },
      { icon: '🔓', title: '3. Élesítés', text: 'A pilóta a távirányítón **élesíti** a motorokat: az ESC-k lassú alapjáratra pörgetik őket. Ez biztonsági lépés: élesítés előtt a motorok semmilyen gázra nem indulnak el.', parts: ['motorok', 'esc', 'radio'] },
      { icon: '⬆️', title: '4. Felszállás', text: 'Gázadásra mind a négy **motor** gyorsul. Amikor a **propellerek** együttes tolóereje nagyobb a drón súlyánál, a drón felemelkedik.', parts: ['motorok', 'propeller'] },
      { icon: '🎯', title: '5. Lebegés: a szabályozás munkában', text: 'A repülésvezérlő másodpercenként több százszor-ezerszer méri a dőlést és a forgást, és **PID-szabályozóval** apró fordulatszám-változtatásokkal korrigál. A GPS és a barométer segítségével a drón szélben is egy helyben marad.', parts: ['fc', 'gps', 'baro', 'motorok'] },
      { icon: '➡️', title: '6. Előre repülés: dőlés', text: 'Előre repüléshez a **hátsó** motorok gyorsabban, az **elsők** lassabban forognak: a drón előredől, és a ferde tolóerő vízszintes része előre gyorsítja. A **gimbal** közben hátrabillenti a **kamerát**, így a kép vízszintes marad.', parts: ['motorok', 'kamera'] },
      { icon: '🔄', title: '7. Fordulás (yaw)', text: 'Helyben forduláshoz az egyik átlós pár (pl. a CW propellerek) gyorsabban, a másik lassabban forog. A tolóerő összesen ugyanannyi marad, de a forgatónyomatékok már nem egyenlítik ki egymást, és a váz elfordul.', parts: ['propeller', 'motorok'] },
      { icon: '🏠', title: '8. Hazatérés és leszállás', text: 'Ha az akku merül, vagy megszakad a rádiókapcsolat, a drón **failsafe** módban felemelkedik egy biztonságos magasságra, GPS-szel visszarepül a kezdőponthoz, és leszáll a **futóművére**.', parts: ['gps', 'radio', 'akku', 'futomu'] }
    ],
    history: [
      { year: '1907', text: 'A Breguet testvérek és Charles Richet francia tudós megépítik a négyrotoros **Gyroplane No. 1**-et. Kipányvázva, embert szállítva néhány tíz centiméterre emelkedik, de irányíthatatlanul instabil.' },
      { year: '1922', text: 'Az amerikai hadsereg megbízásából elkészül a **de Bothezat-helikopter**, egy nagy négyrotoros gép. Repül, de bonyolult és lassú, a programot leállítják.' },
      { year: '1924', text: 'Étienne **Oehmichen** francia mérnök négyrotoros gépe több száz méteres távot tesz meg zárt pályán; a négyrotoros elrendezés azonban évtizedekre háttérbe szorul a helikopterrel szemben.' },
      { year: '1990-es évek', text: 'Elterjednek az olcsó **MEMS** giroszkópok és gyorsulásmérők, és a mikrokontrollerek elég gyorsak lesznek a valós idejű szabályozáshoz: ez teszi lehetővé a kicsi, elektronikusan stabilizált kvadkoptereket.' },
      { year: '1995', text: 'A **GPS** rendszer eléri a teljes működőképességet: a műholdas helymeghatározás később a drónok önálló navigációjának alapja lesz.' },
      { year: '2006', text: 'Frank Wang Sencsenben megalapítja a **DJI**-t; a cég kezdetben repülésvezérlőket gyárt, később a világ legnagyobb polgári drónkészítője lesz.' },
      { year: '2010', text: 'A francia Parrot bemutatja az **AR.Drone**-t, az első tömegesen sikeres, okostelefonról Wi-Fi-n irányítható játékdrónt.' },
      { year: '2013', text: 'Megjelenik a **DJI Phantom**: összeszerelve, kamerával árult, GPS-es kvadkopter, amely a légifotózást a nagyközönség számára is elérhetővé teszi.' },
      { year: '2020', text: 'December 31-től az EU-ban egységes **drónszabályok** (2019/947/EU rendelet) érvényesek: nyílt, speciális és tanúsított kategória, üzemeltetői regisztráció, online pilótaképzés.' },
      { year: '2024', text: 'Lejár az átmeneti időszak: január 1-től az új drónok a nyílt kategóriában osztályjelöléssel (C0–C4) kerülnek forgalomba, és a C1–C3 osztályúaknál kötelező a **Remote ID** (távoli azonosítás).' }
    ],
    quiz: [
      { q: 'Miért forog két propeller az óramutató járásával megegyezően, kettő pedig ellentétesen?', options: ['Hogy a forgatónyomatékaik kiegyenlítsék egymást, és a drón ne pörögjön magától', 'Hogy kevesebb zajt csapjanak', 'Csak gyártási okból, mindegy lenne', 'Hogy a drón gyorsabban emelkedjen'], answer: 0, explain: 'Minden propeller a reakció miatt ellentétes irányba próbálja forgatni a vázat. A két ellentétes pár ezt kiegyenlíti; a különbségük szándékos változtatásával fordul a drón (yaw).' },
      { q: 'Hogyan repül előre egy kvadkopter?', options: ['A hátsó motorok gyorsabban forognak, a drón előredől, és a ferde tolóerő előre gyorsítja', 'Egy külön, előre toló propellerrel', 'Az első motorok gyorsabban forognak, és húzzák a drónt', 'A kamera gimbalja fordítja előre'], answer: 0, explain: 'A kvadkopter csak a négy motor fordulatszámával irányít: előrebillentéshez a hátsó pár tolóereje nagyobb, a megdöntött tolóerő vízszintes összetevője gyorsít előre.' },
      { q: 'Mit mér a giroszkóp a repülésvezérlőn?', options: ['A drón szögsebességét, vagyis hogy milyen gyorsan fordul a tengelyei körül', 'A légnyomást', 'A drón földrajzi helyét', 'Az akkumulátor töltöttségét'], answer: 0, explain: 'A MEMS giroszkóp a három tengely körüli forgás sebességét méri; ebből és a gyorsulásmérőből számolja a vezérlő a dőlésszöget.' },
      { q: 'Egy 1500 mAh-s, 100C-s LiPo akku elméletileg mekkora áramot adhat?', options: ['150 A', '15 A', '1,5 A', '1500 A'], answer: 0, explain: 'I_max = C · Q = 100 · 1,5 Ah = 150 A. A valóságban a belső ellenállás és a melegedés ennél kisebb tartós áramot enged.' },
      { q: 'Az EU szabályai szerint mikor kell regisztrálnia magát a drón üzemeltetőjének a nyílt kategóriában?', options: ['Ha a drón legalább 250 g-os, vagy ha kamera van rajta (kivéve a játéknak minősülő drónokat)', 'Soha, ha csak hobbiból repül', 'Csak ha a drón 25 kg-nál nehezebb', 'Csak ha éjszaka repül'], answer: 0, explain: 'A 2019/947/EU rendelet szerint a 250 g-os vagy nehezebb, illetve a személyes adatok rögzítésére alkalmas (pl. kamerás) drónok üzemeltetőinek regisztrálniuk kell a nemzeti hatóságnál.' }
    ]
  });
})();
