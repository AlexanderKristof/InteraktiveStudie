/* Egyetem: Szabályozástechnika (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';
  var FG = 'var(--fg-2)', BG = 'var(--stage)';
  var RED = '#e5484d', BLUE = '#2f7bf6', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6', TEAL = '#0e9aa7';

  /* ---------- rajzsegédek ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  // x_1 → alsó index, ^(…) → felső index az SVG-szövegben
  function sub(s) {
    return String(s).replace(/\^\(([^)]*)\)/g, '<tspan baseline-shift="super" font-size="72%">$1</tspan>')
      .replace(/_([A-Za-z0-9áéíóöőúüű]+)/g, '<tspan baseline-shift="sub" font-size="75%">$1</tspan>');
  }
  function txt(x, y, s, size, anchor, extra) {
    var muted = extra && extra.indexOf('muted') === 0;
    if (muted) extra = extra.slice(5);
    var cls = extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (muted ? M : T);
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + cls + (extra ? ' ' + extra : '') + '>' + sub(s) + '</text>';
  }
  function head(x, y, ang, col, s) {
    s = s || 8;
    return '<path d="M' + r1(x) + ' ' + r1(y) + ' L' + r1(x - s * Math.cos(ang - 0.4)) + ' ' + r1(y - s * Math.sin(ang - 0.4)) + ' L' + r1(x - s * Math.cos(ang + 0.4)) + ' ' + r1(y - s * Math.sin(ang + 0.4)) + ' z" fill="' + col + '"/>';
  }
  function arrow(x1, y1, x2, y2, col, w) {
    col = col || FG;
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 2) + '"/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  // nyíl töréspontokkal: az utolsó szakasz végén nyílhegy
  function path(p, col, w, noHead) {
    col = col || FG;
    var n = p.length, s = '<path d="' + p.map(function (q, i) { return (i ? 'L' : 'M') + r1(q[0]) + ' ' + r1(q[1]); }).join(' ') + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2) + '" stroke-linejoin="round"/>';
    return noHead ? s : s + head(p[n - 1][0], p[n - 1][1], Math.atan2(p[n - 1][1] - p[n - 2][1], p[n - 1][0] - p[n - 2][0]), col);
  }
  function box(x, y, w, h, label, col, label2) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="7" fill="' + BG + '" stroke="' + (col || FG) + '" stroke-width="2.2"/>' +
      txt(x + w / 2, y + h / 2 + (label2 ? -3 : 5), label, 13, 'middle', 'font-weight="700"') + (label2 ? txt(x + w / 2, y + h / 2 + 14, label2, 11, 'middle', 'muted') : '');
  }
  function sumj(x, y) {
    return '<circle cx="' + x + '" cy="' + y + '" r="13" fill="' + BG + '" stroke="' + FG + '" stroke-width="2.2"/>' +
      '<line x1="' + (x - 9) + '" y1="' + (y - 9) + '" x2="' + (x + 9) + '" y2="' + (y + 9) + '" stroke="' + FG + '" stroke-width="1.5"/>' +
      '<line x1="' + (x - 9) + '" y1="' + (y + 9) + '" x2="' + (x + 9) + '" y2="' + (y - 9) + '" stroke="' + FG + '" stroke-width="1.5"/>';
  }
  function poly(pts, X, Y, col, w, dash) {
    return '<path d="' + pts.map(function (p, i) { return (i ? 'L' : 'M') + r1(X(p[0])) + ' ' + r1(Y(p[1])); }).join(' ') + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2.5) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' stroke-linejoin="round"/>';
  }
  function fn(f, a, b, n) { var out = []; for (var i = 0; i <= n; i++) { var t = a + (b - a) * i / n; out.push([t, f(t)]); } return out; }
  function axes(x0, y0, x1, y1, xl, yl) {
    return arrow(x0, y0, x1, y0, FG, 1.5) + arrow(x0, y0, x0, y1, FG, 1.5) + (xl ? txt(x1, y0 + 16, xl, 11, 'end', 'muted') : '') + (yl ? txt(x0 + 6, y1 + 4, yl, 11, null, 'muted') : '');
  }

  /* ---------- szimulációk (a rajzok valódi számításból készülnek) ---------- */
  // Szakasz: három sorba kötött PT1-tag (T = 1 s), azaz G(s) = 1/(1+s)³; PID-szabályozó egységugrás alapjelre.
  function simPid(Kp, Ti, Td, tEnd, umax, antiWindup) {
    var dt = 0.005, x1 = 0, x2 = 0, x3 = 0, I = 0, yPrev = 0, out = [];
    for (var k = 0; k * dt <= tEnd; k++) {
      var e = 1 - x3, D = Td ? -Kp * Td * (x3 - yPrev) / dt : 0; // D-hatás a mért jelre
      var u = Kp * e + (Ti ? Kp / Ti * I : 0) + D, us = umax ? Math.max(-umax, Math.min(umax, u)) : u;
      if (!(antiWindup && us !== u && e * u > 0)) I += e * dt; // feltételes integrálás
      yPrev = x3;
      x1 += dt * (us - x1); x2 += dt * (x1 - x2); x3 += dt * (x2 - x3);
      if (k % 10 === 0) out.push([k * dt, x3, us]);
    }
    return out;
  }
  // PI-szabályozó PT1-szakaszon (K = 1, T = 2 s), korlátozott beavatkozó jellel
  function simWindup(Kp, Ti, umax, antiWindup, tEnd) {
    var dt = 0.002, y = 0, I = 0, out = [];
    for (var k = 0; k * dt <= tEnd; k++) {
      var e = 1 - y, u = Kp * e + Kp / Ti * I, us = Math.max(-umax, Math.min(umax, u));
      if (!(antiWindup && us !== u && e * u > 0)) I += e * dt;
      y += dt * (us - y) / 2;
      if (k % 20 === 0) out.push([k * dt, y, us]);
    }
    return out;
  }
  function col(arr, j) { return arr.map(function (p) { return [p[0], p[j]]; }); }

  /* ---------- 1. Hatásvázlat visszacsatolással ---------- */
  var loopSvg = '<svg viewBox="0 0 600 240">' +
    arrow(16, 100, 95, 100) + txt(18, 90, 'alapjel r', 12) +
    sumj(110, 100) + txt(90, 92, '+', 14, 'middle', 'font-weight="700"') + txt(124, 132, '−', 16, null, 'font-weight="700"') +
    arrow(123, 100, 178, 100) + txt(150, 90, 'e', 13, 'middle', 'font-weight="700" fill="' + RED + '"') +
    box(178, 76, 112, 48, 'Szabályozó', PURPLE, 'C(s)') +
    arrow(290, 100, 350, 100) + txt(320, 90, 'u', 13, 'middle', 'font-weight="700" fill="' + ORANGE + '"') +
    box(350, 76, 130, 48, 'Szakasz', BLUE, 'G(s)') +
    arrow(415, 24, 415, 74, RED) + txt(424, 34, 'zavarás d', 12, null, 'fill="' + RED + '"') +
    arrow(480, 100, 588, 100) + txt(500, 90, 'y', 13, null, 'font-weight="700" fill="' + GREEN + '"') + txt(586, 120, 'szabályozott', 11, 'end', 'muted') + txt(586, 134, 'jellemző', 11, 'end', 'muted') +
    '<circle cx="530" cy="100" r="3.5" fill="' + FG + '"/>' +
    path([[530, 100], [530, 196], [390, 196]]) + box(270, 172, 120, 48, 'Érzékelő', TEAL, 'H(s)') +
    path([[270, 196], [110, 196], [110, 114]]) + txt(118, 182, 'y_m (mért érték)', 11, null, 'muted') +
    txt(152, 146, 'hibajel', 10, 'middle', 'muted') + txt(320, 146, 'beavatkozó jel', 10, 'middle', 'muted') +
    txt(460, 186, 'visszacsatoló ág', 11, 'middle', 'muted') + '</svg>';

  /* ---------- 2. Vezérlés kontra szabályozás ---------- */
  var openSvg = '<svg viewBox="0 0 600 250">' +
    txt(16, 22, 'Vezérlés (nyitott hatáslánc)', 13, null, 'font-weight="700"') +
    arrow(16, 70, 90, 70) + txt(18, 60, 'r', 12) + box(90, 48, 120, 44, 'Vezérlő') + arrow(210, 70, 280, 70) + box(280, 48, 130, 44, 'Szakasz') + arrow(410, 70, 500, 70) + txt(506, 75, 'y = ?', 13, null, 'font-weight="700"') +
    arrow(345, 22, 345, 46, RED) + txt(354, 30, 'd', 12, null, 'fill="' + RED + '"') + txt(440, 112, 'a zavarás hatása nem derül ki', 11, 'middle', 'muted') +
    '<line x1="10" y1="128" x2="590" y2="128" stroke="var(--line)" stroke-dasharray="4 4"/>' +
    txt(16, 152, 'Szabályozás (zárt hatáslánc)', 13, null, 'font-weight="700"') +
    arrow(16, 192, 76, 192) + txt(18, 182, 'r', 12) + sumj(90, 192) + arrow(103, 192, 140, 192) + box(140, 170, 110, 44, 'Szabályozó') + arrow(250, 192, 300, 192) + box(300, 170, 130, 44, 'Szakasz') + arrow(430, 192, 520, 192) + txt(526, 197, 'y', 13, null, 'font-weight="700"') +
    arrow(365, 146, 365, 168, RED) + txt(374, 156, 'd', 12, null, 'fill="' + RED + '"') +
    path([[480, 192], [480, 236], [90, 236], [90, 206]], GREEN) + txt(285, 231, 'mérés és visszacsatolás', 11, 'middle', 'fill="' + GREEN + '"') + '</svg>';

  /* ---------- 3. Alaptagok ugrásválasza ---------- */
  var tagSvg = '<svg viewBox="0 0 600 190">';
  [['P-tag', 'G = K'], ['I-tag', 'G = 1/(sT_I)'], ['D-tag', 'G = sT_D'], ['PT1-tag', 'G = K/(1+sT)'], ['holtidős tag', 'G = e^(−sT_h)']].forEach(function (lab, i) {
    var x0 = 14 + i * 118, y0 = 140, W = 100;
    var X = function (t) { return x0 + 6 + t * (W - 10); }, Y = function (v) { return y0 - v * 60; };
    tagSvg += '<rect x="' + x0 + '" y="20" width="' + W + '" height="140" rx="8" fill="none" stroke="var(--line)"/>' +
      txt(x0 + W / 2, 40, lab[0], 12, 'middle', 'font-weight="700"') + txt(x0 + W / 2, 180, lab[1], 11, 'middle') +
      '<line x1="' + X(0) + '" y1="' + y0 + '" x2="' + X(1) + '" y2="' + y0 + '" stroke="var(--line)"/>' +
      poly([[0, 0], [0.15, 0], [0.15, 1], [1, 1]], X, Y, 'var(--muted)', 1.5, '4 3');
    var resp;
    if (i === 0) resp = poly([[0, 0], [0.15, 0], [0.15, 1.35], [1, 1.35]], X, Y, BLUE);
    if (i === 1) resp = poly([[0, 0], [0.15, 0], [1, 1.4]], X, Y, BLUE);
    if (i === 2) resp = poly([[0, 0], [0.15, 0], [0.15, 1.45], [0.17, 0], [1, 0]], X, Y, BLUE) + head(X(0.15), Y(1.5), -Math.PI / 2, BLUE, 7);
    if (i === 3) resp = poly(fn(function (t) { return t < 0.15 ? 0 : 1.2 * (1 - Math.exp(-(t - 0.15) / 0.18)); }, 0, 1, 60), X, Y, BLUE);
    if (i === 4) resp = poly([[0, 0], [0.45, 0], [0.45, 1], [1, 1]], X, Y, BLUE) + arrow(X(0.17), Y(0.5), X(0.43), Y(0.5), ORANGE, 1.5) + txt(X(0.3), Y(0.5) - 6, 'T_h', 10, 'middle', 'fill="' + ORANGE + '"');
    tagSvg += resp;
  });
  tagSvg += '</svg>';

  /* ---------- 4. PT1 ugrásválasz ---------- */
  var p1X = function (t) { return 60 + t * 75; }, p1Y = function (v) { return 200 - v * 160; };
  var pt1Svg = '<svg viewBox="0 0 560 240">' + axes(60, 200, 540, 20, 't', 'y(t)') +
    [1, 2, 3, 4, 5, 6].map(function (k) { return '<line x1="' + p1X(k) + '" y1="200" x2="' + p1X(k) + '" y2="204" ' + LN + '/>' + txt(p1X(k), 218, k + 'T', 11, 'middle', 'muted'); }).join('') +
    '<line x1="60" y1="' + p1Y(1) + '" x2="530" y2="' + p1Y(1) + '" stroke="var(--muted)" stroke-dasharray="5 4"/>' + txt(54, p1Y(1) + 4, 'K', 12, 'end') +
    '<line x1="60" y1="' + p1Y(0.632) + '" x2="' + p1X(1) + '" y2="' + p1Y(0.632) + '" stroke="' + ORANGE + '" stroke-dasharray="4 3"/>' +
    '<line x1="' + p1X(1) + '" y1="200" x2="' + p1X(1) + '" y2="' + p1Y(1) + '" stroke="' + ORANGE + '" stroke-dasharray="4 3"/>' + txt(54, p1Y(0.632) + 4, '0,63K', 11, 'end', 'fill="' + ORANGE + '"') +
    '<line x1="' + p1X(0) + '" y1="' + p1Y(0) + '" x2="' + p1X(1.15) + '" y2="' + p1Y(1.15) + '" stroke="' + RED + '" stroke-width="1.5"/>' + txt(p1X(1.2) + 4, p1Y(1.12), 'érintő az origóban', 11, null, 'fill="' + RED + '"') +
    poly(fn(function (t) { return 1 - Math.exp(-t); }, 0, 6.2, 120), p1X, p1Y, BLUE, 3) +
    '<circle cx="' + p1X(3) + '" cy="' + p1Y(0.950) + '" r="4.5" fill="' + GREEN + '"/>' + txt(p1X(3), p1Y(0.95) + 22, '95% (3T)', 11, 'middle', 'fill="' + GREEN + '"') +
    '<circle cx="' + p1X(5) + '" cy="' + p1Y(0.993) + '" r="4.5" fill="' + GREEN + '"/>' + txt(p1X(5), p1Y(0.993) + 22, '99,3% (5T)', 11, 'middle', 'fill="' + GREEN + '"') + '</svg>';

  /* ---------- 5. PT2 ugrásválaszok különböző csillapítással ---------- */
  function pt2(z) {
    var dt = 0.01, y = 0, v = 0, out = [];
    for (var k = 0; k * dt <= 14; k++) { if (k % 5 === 0) out.push([k * dt, y]); var a = 1 - 2 * z * v - y; v += a * dt; y += v * dt; }
    return out;
  }
  var p2X = function (t) { return 50 + t * 34; }, p2Y = function (v) { return 210 - v * 100; };
  var pt2Svg = '<svg viewBox="0 0 560 240">' + axes(50, 210, 540, 16, 'ω_n·t', 'y(t)') +
    '<line x1="50" y1="' + p2Y(1) + '" x2="530" y2="' + p2Y(1) + '" stroke="var(--muted)" stroke-dasharray="5 4"/>' + txt(44, p2Y(1) + 4, '1', 11, 'end') +
    '<rect x="50" y="' + p2Y(1.02) + '" width="480" height="' + (p2Y(0.98) - p2Y(1.02)) + '" fill="' + GREEN + '" opacity=".15"/>' +
    [0, 2, 4, 6, 8, 10, 12].map(function (k) { return txt(p2X(k), 226, String(k), 10, 'middle', 'muted'); }).join('');
  [[0.2, RED], [0.5, ORANGE], [0.7, GREEN], [1, BLUE], [2, PURPLE]].forEach(function (z, i) {
    pt2Svg += poly(pt2(z[0]), p2X, p2Y, z[1], 2.5) + txt(470, 26 + i * 15, 'ζ = ' + String(z[0]).replace('.', ','), 12, null, 'fill="' + z[1] + '" font-weight="700"');
  });
  pt2Svg += txt(p2X(3.6) + 6, p2Y(1.53) + 4, '53% túllendülés', 11, null, 'fill="' + RED + '"') + txt(p2X(3.63), p2Y(1.163) - 7, '16%', 11, 'middle', 'fill="' + ORANGE + '"') + '</svg>';

  /* ---------- 6. Pólustérkép ---------- */
  var pmX = function (re) { return 165 + re * 55; }, pmY = function (im) { return 120 - im * 40; };
  function cross(x, y, c) { return '<path d="M' + (x - 7) + ' ' + (y - 7) + ' L' + (x + 7) + ' ' + (y + 7) + ' M' + (x - 7) + ' ' + (y + 7) + ' L' + (x + 7) + ' ' + (y - 7) + '" stroke="' + c + '" stroke-width="3"/>'; }
  var poleSvg = '<svg viewBox="0 0 600 240">' +
    '<rect x="10" y="10" width="' + (pmX(0) - 10) + '" height="220" fill="' + GREEN + '" opacity=".10"/><rect x="' + pmX(0) + '" y="10" width="' + (300 - pmX(0)) + '" height="220" fill="' + RED + '" opacity=".10"/>' +
    arrow(14, 120, 300, 120, FG, 1.5) + arrow(pmX(0), 228, pmX(0), 12, FG, 1.5) + txt(296, 136, 'Re s = σ', 11, 'end', 'muted') + txt(pmX(0) + 6, 22, 'Im s = jω', 11, null, 'muted') +
    txt(70, 222, 'stabil', 12, 'middle', 'fill="' + GREEN + '" font-weight="700"') + txt(258, 222, 'instabil', 12, 'middle', 'fill="' + RED + '" font-weight="700"');
  var poles = [[[-2.2, 0]], [[-1, 1.8], [-1, -1.8]], [[0, 1.2], [0, -1.2]], [[1.1, 1.6], [1.1, -1.6]]];
  var pcols = [BLUE, GREEN, ORANGE, RED];
  var resp = [function (t) { return Math.exp(-3 * t); }, function (t) { return Math.exp(-1.6 * t) * Math.cos(16 * t); }, function (t) { return 0.8 * Math.cos(14 * t); }, function (t) { return 0.1 * Math.exp(2.6 * t) * Math.cos(14 * t); }];
  var rlab = ['egyetlen negatív valós pólus: lecsengés', 'komplex pár a bal félsíkon: csillapodó lengés', 'pár a képzetes tengelyen: állandó lengés', 'jobb félsík: egyre nagyobb lengés'];
  poles.forEach(function (pp, i) {
    pp.forEach(function (p) { poleSvg += cross(pmX(p[0]), pmY(p[1]), pcols[i]); });
    var y0 = 34 + i * 54;
    poleSvg += '<line x1="330" y1="' + y0 + '" x2="590" y2="' + y0 + '" stroke="var(--line)"/>' +
      poly(fn(resp[i], 0, 1, 160), function (t) { return 330 + t * 260; }, function (v) { return y0 - Math.max(-1.25, Math.min(1.25, v)) * 18; }, pcols[i], 2) +
      txt(330, y0 + 31, rlab[i], 10, null, 'fill="' + pcols[i] + '"');
  });
  poleSvg += '</svg>';

  /* ---------- 7. Bode-diagram (felnyitott kör: L = 2/(1+s)³) ---------- */
  var bdX = function (lw) { return 80 + (lw + 1.5) * 160; }; // log10 ω: −1,5 … 1,5
  var bdA = function (db) { return 20 + (10 - db) * 1.6; };      // +10 … −50 dB → 20 … 116
  var bdP = function (deg) { return 140 + (-deg) * 0.36; };      // 0 … −270° → 140 … 237
  var L = function (w) { return 2 / Math.pow(1 + w * w, 1.5); }, Lph = function (w) { return -3 * Math.atan(w) * 180 / Math.PI; };
  var wc = Math.sqrt(Math.pow(2, 2 / 3) - 1), w180 = Math.sqrt(3);
  var bodeSvg = '<svg viewBox="0 0 600 260">';
  [-1, 0, 1].forEach(function (e) { bodeSvg += '<line x1="' + bdX(e) + '" y1="16" x2="' + bdX(e) + '" y2="240" stroke="var(--line)"/>' + txt(bdX(e), 254, { '-1': '0,1', 0: '1', 1: '10' }[e], 10, 'middle', 'muted'); });
  bodeSvg += txt(590, 254, 'ω (rad/s)', 11, 'end', 'muted') +
    '<line x1="80" y1="' + bdA(0) + '" x2="560" y2="' + bdA(0) + '" ' + LN + ' stroke-width="1"/>' +
    [0, -20, -40].map(function (d) { return txt(74, bdA(d) + 4, d + ' dB', 10, 'end', 'muted'); }).join('') +
    poly(fn(function (lw) { return 20 * Math.log10(L(Math.pow(10, lw))); }, -1.5, 1.07, 200), bdX, bdA, BLUE, 3) +
    '<line x1="80" y1="' + bdP(-180) + '" x2="560" y2="' + bdP(-180) + '" stroke="var(--muted)" stroke-dasharray="5 4"/>' +
    [0, -90, -180, -270].map(function (d) { return txt(74, bdP(d) + 4, d + '°', 10, 'end', 'muted'); }).join('') +
    poly(fn(function (lw) { return Lph(Math.pow(10, lw)); }, -1.5, 1.5, 200), bdX, bdP, PURPLE, 3) +
    // vágási körfrekvencia és fázistartalék
    '<line x1="' + bdX(Math.log10(wc)) + '" y1="' + bdA(0) + '" x2="' + bdX(Math.log10(wc)) + '" y2="' + bdP(-180) + '" stroke="' + GREEN + '" stroke-dasharray="3 3"/>' +
    '<circle cx="' + bdX(Math.log10(wc)) + '" cy="' + bdA(0) + '" r="4.5" fill="' + GREEN + '"/>' +
    arrow(bdX(Math.log10(wc)), bdP(-180), bdX(Math.log10(wc)), bdP(Lph(wc)) + 3, GREEN, 2.5) + txt(bdX(Math.log10(wc)) - 8, bdP(-150), 'φ_t ≈ 68°', 12, 'end', 'fill="' + GREEN + '" font-weight="700"') +
    txt(bdX(Math.log10(wc)) - 6, bdA(0) + 16, 'ω_c ≈ 0,77', 11, 'end', 'fill="' + GREEN + '"') +
    // erősítéstartalék
    '<line x1="' + bdX(Math.log10(w180)) + '" y1="' + bdA(0) + '" x2="' + bdX(Math.log10(w180)) + '" y2="' + bdP(-180) + '" stroke="' + RED + '" stroke-dasharray="3 3"/>' +
    '<circle cx="' + bdX(Math.log10(w180)) + '" cy="' + bdP(-180) + '" r="4.5" fill="' + RED + '"/>' +
    arrow(bdX(Math.log10(w180)), bdA(0), bdX(Math.log10(w180)), bdA(20 * Math.log10(L(w180))) - 3, RED, 2.5) + txt(bdX(Math.log10(w180)) + 8, bdA(-6), 'e_t ≈ 12 dB', 12, null, 'fill="' + RED + '" font-weight="700"') +
    txt(86, 14, 'amplitúdó |L(jω)| dB-ben', 11, null, 'fill="' + BLUE + '"') + txt(86, bdP(0) - 6, 'fázis φ(ω)', 11, null, 'fill="' + PURPLE + '"') + '</svg>';

  /* ---------- 8. Nyquist-diagram ---------- */
  var nqX = function (re) { return 250 + re * 80; }, nqY = function (im) { return 130 - im * 80; };
  function Lc(w, K) { // K/(1+jω)³ valós és képzetes része
    var m = K / Math.pow(1 + w * w, 1.5), ph = -3 * Math.atan(w);
    return [m * Math.cos(ph), m * Math.sin(ph)];
  }
  var nqPts = [], nqMir = [];
  for (var nw = 0; nw <= 400; nw++) { var ww = Math.pow(10, -2 + nw / 100), c = Lc(ww, 2); nqPts.push(c); nqMir.push([c[0], -c[1]]); }
  var nqSvg = '<svg viewBox="0 0 600 260">' + arrow(20, 130, 590, 130, FG, 1.5) + arrow(250, 250, 250, 10, FG, 1.5) + txt(586, 146, 'Re L', 11, 'end', 'muted') + txt(256, 20, 'Im L', 11, null, 'muted') +
    '<circle cx="250" cy="130" r="80" fill="none" stroke="var(--muted)" stroke-dasharray="4 4"/>' + txt(nqX(-0.95), nqY(-0.78), 'egységkör', 10, 'end', 'muted') +
    '<g opacity=".55">' + poly(nqMir, nqX, nqY, BLUE, 1.5, '6 4') + '</g>' + poly(nqPts, nqX, nqY, BLUE, 3) +
    head(nqX(Lc(0.5, 2)[0]), nqY(Lc(0.5, 2)[1]), Math.atan2(nqY(Lc(0.52, 2)[1]) - nqY(Lc(0.5, 2)[1]), nqX(Lc(0.52, 2)[0]) - nqX(Lc(0.5, 2)[0])), BLUE, 10) +
    '<circle cx="' + nqX(-1) + '" cy="130" r="6" fill="' + RED + '"/>' + txt(nqX(-1) + 6, 152, '−1 (kritikus pont)', 12, 'end', 'fill="' + RED + '" font-weight="700"') +
    '<circle cx="' + nqX(-0.25) + '" cy="130" r="4.5" fill="' + ORANGE + '"/>' + txt(nqX(-0.25) + 4, 116, '−0,25', 11, null, 'fill="' + ORANGE + '"') +
    txt(nqX(2) + 6, 148, 'ω = 0: L = 2', 11) + txt(nqX(1.15), nqY(-1.2), '↙ ω nő', 11, null, 'fill="' + BLUE + '"') +
    txt(24, 36, 'A görbe a −1 pontot nem öleli körbe:', 11, null, 'muted') + txt(24, 52, 'a zárt kör stabil.', 11, null, 'muted') + '</svg>';

  /* ---------- 9. P, PI, PID ugrásválasz (szimuláció) ---------- */
  var sP = simPid(2, 0, 0, 20), sPI = simPid(1.2, 2.2, 0, 20), sPID = simPid(1.8, 2.6, 0.6, 20);
  var pdX = function (t) { return 50 + t * 25; }, pdY = function (v) { return 220 - v * 150; };
  var pidSvg = '<svg viewBox="0 0 600 250">' + axes(50, 220, 570, 14, 't (s)', 'y(t)') +
    '<line x1="50" y1="' + pdY(1) + '" x2="560" y2="' + pdY(1) + '" stroke="var(--muted)" stroke-dasharray="5 4"/>' + txt(44, pdY(1) + 4, 'r = 1', 11, 'end') +
    '<rect x="50" y="' + pdY(1.02) + '" width="510" height="' + (pdY(0.98) - pdY(1.02)) + '" fill="' + GREEN + '" opacity=".15"/>' +
    [0, 5, 10, 15].map(function (k) { return txt(pdX(k), 236, String(k), 10, 'middle', 'muted'); }).join('') +
    poly(col(sP, 1), pdX, pdY, ORANGE, 2.8) + poly(col(sPI, 1), pdX, pdY, BLUE, 2.8) + poly(col(sPID, 1), pdX, pdY, GREEN, 2.8) +
    arrow(pdX(17), pdY(1) + 2, pdX(17), pdY(2 / 3) - 2, RED, 1.5) + arrow(pdX(17), pdY(2 / 3) - 2, pdX(17), pdY(1) + 2, RED, 1.5) + txt(pdX(17) + 6, pdY(0.83) + 4, 'maradó hiba 1/3', 11, null, 'fill="' + RED + '"') +
    txt(300, 164, 'P (K_P = 2)', 12, null, 'fill="' + ORANGE + '" font-weight="700"') + txt(300, 182, 'PI (K_P = 1,2; T_I = 2,2 s)', 12, null, 'fill="' + BLUE + '" font-weight="700"') + txt(300, 200, 'PID (K_P = 1,8; T_I = 2,6 s; T_D = 0,6 s)', 12, null, 'fill="' + GREEN + '" font-weight="700"') +
    txt(120, 26, 'szakasz: 1/(1+s)^(3)', 11, null, 'muted') + '</svg>';

  /* ---------- 10. Integrátor-telítődés (szimuláció) ---------- */
  var wNo = simWindup(4, 1.5, 1.25, false, 20), wYes = simWindup(4, 1.5, 1.25, true, 20);
  var awX = function (t) { return 50 + t * 25; }, awY = function (v) { return 130 - v * 85; }, awU = function (v) { return 240 - v * 55; };
  var awSvg = '<svg viewBox="0 0 600 260">' + axes(50, 130, 570, 10, '', 'y(t)') + arrow(50, 240, 570, 240, FG, 1.5) + txt(566, 256, 't (s)', 11, 'end', 'muted') +
    '<line x1="50" y1="' + awY(1) + '" x2="560" y2="' + awY(1) + '" stroke="var(--muted)" stroke-dasharray="5 4"/>' + txt(44, awY(1) + 4, '1', 11, 'end') +
    poly(col(wNo, 1), awX, awY, RED, 2.8) + poly(col(wYes, 1), awX, awY, GREEN, 2.8) +
    txt(56, 152, 'beavatkozó jel u(t), korlát: 1,25', 11, null, 'muted') +
    '<line x1="50" y1="' + awU(1.25) + '" x2="560" y2="' + awU(1.25) + '" stroke="var(--muted)" stroke-dasharray="3 3"/>' +
    poly(col(wNo, 2), awX, awU, RED, 2, '6 3') + poly(col(wYes, 2), awX, awU, GREEN, 2) +
    txt(330, 96, 'telítődés kezelése nélkül', 12, null, 'fill="' + RED + '" font-weight="700"') + txt(330, 114, 'anti-winduppal', 12, null, 'fill="' + GREEN + '" font-weight="700"') + [0, 5, 10, 15].map(function (k) { return txt(awX(k), 256, String(k), 10, 'middle', 'muted'); }).join('') + '</svg>';

  /* ---------- 11. Kétállású szabályozás hiszterézissel ---------- */
  var thPts = [], heat = [], Tc = 19, on = true;
  for (var tk = 0; tk <= 1200; tk++) {
    var tm = tk * 0.1; // perc
    if (on && Tc >= 21.5) on = false; else if (!on && Tc <= 20.5) on = true;
    Tc += 0.1 * ((on ? 26 : 12) - Tc) / 60;
    if (tk % 4 === 0) { thPts.push([tm, Tc]); heat.push([tm, on ? 1 : 0]); }
  }
  var thX = function (t) { return 230 + t * 2.8; }, thY = function (v) { return 170 - (v - 18.5) * 40; };
  var thSvg = '<svg viewBox="0 0 600 250">' +
    // relé-karakterisztika
    arrow(20, 170, 190, 170, FG, 1.5) + arrow(30, 180, 30, 40, FG, 1.5) + txt(188, 200, 'ϑ (°C)', 11, 'end', 'muted') + txt(36, 46, 'fűtés', 11, null, 'muted') +
    path([[40, 80], [140, 80], [140, 160]], RED, 2.5) + path([[180, 160], [80, 160], [80, 80]], BLUE, 2.5) +
    txt(80, 186 - 4, '20,5', 10, 'middle', 'muted') + txt(140, 186 - 4, '21,5', 10, 'middle', 'muted') + txt(24, 84, 'BE', 10, 'end', 'muted') + txt(24, 164, 'KI', 10, 'end', 'muted') +
    txt(110, 66, 'hiszterézis 1 °C', 11, 'middle', 'fill="' + ORANGE + '"') + '<line x1="80" y1="72" x2="140" y2="72" stroke="' + ORANGE + '" stroke-width="2"/>' +
    // időfüggvény
    axes(230, 210, 590, 20, '', 'ϑ (°C)') +
    '<rect x="230" y="' + thY(21.5) + '" width="350" height="' + (thY(20.5) - thY(21.5)) + '" fill="' + ORANGE + '" opacity=".12"/>' +
    [20.5, 21, 21.5].map(function (v) { return '<line x1="230" y1="' + thY(v) + '" x2="580" y2="' + thY(v) + '" stroke="var(--muted)" stroke-dasharray="' + (v === 21 ? '2 4' : '5 4') + '"/>' + txt(226, thY(v) + 4, String(v).replace('.', ','), 10, 'end', 'muted'); }).join('') +
    poly(thPts, thX, thY, RED, 2.5) +
    heat.map(function (h, i) { // összefüggő BE-szakaszok
      if (!h[1] || (i && heat[i - 1][1])) return '';
      for (var j = i; j < heat.length - 1 && heat[j + 1][1]; j++);
      return '<rect x="' + r1(thX(h[0])) + '" y="222" width="' + r1(thX(heat[j][0]) - thX(h[0])) + '" height="12" rx="2" fill="' + RED + '" opacity=".8"/>';
    }).join('') +
    txt(226, 232, 'fűtés BE', 10, 'end', 'muted') + [0, 30, 60, 90].map(function (k) { return txt(thX(k), 248, String(k), 10, 'middle', 'muted'); }).join('') + txt(thX(120), 248, '120 perc', 10, 'middle', 'muted') + '</svg>';

  /* ---------- 12. Mintavételezés és tartószerv ---------- */
  var msX = function (t) { return 40 + t * 50; }, msY = function (v) { return 120 - v * 80; };
  var sig = function (t) { return 0.7 * Math.sin(0.9 * t) + 0.3 * Math.sin(2.1 * t + 0.6); };
  var stair = [], smp = '';
  for (var ks = 0; ks <= 10; ks++) {
    stair.push([ks, sig(ks)]); stair.push([Math.min(ks + 1, 10.6), sig(ks)]);
    smp += '<line x1="' + r1(msX(ks)) + '" y1="' + msY(0) + '" x2="' + r1(msX(ks)) + '" y2="' + r1(msY(sig(ks))) + '" stroke="' + ORANGE + '" stroke-width="1.5"/><circle cx="' + r1(msX(ks)) + '" cy="' + r1(msY(sig(ks))) + '" r="4.5" fill="' + ORANGE + '"/>';
  }
  var sampSvg = '<svg viewBox="0 0 600 230">' + arrow(30, 120, 590, 120, FG, 1.5) + txt(586, 136, 't', 11, 'end', 'muted') +
    poly(stair, msX, msY, GREEN, 2.2) + poly(fn(sig, 0, 10.8, 200), msX, msY, BLUE, 2.5, '7 4') + smp +
    arrow(msX(3), 214, msX(4), 214, FG, 1.5) + arrow(msX(4), 214, msX(3), 214, FG, 1.5) + txt(msX(3.5), 206, 'T_s', 12, 'middle') +
    txt(60, 22, 'folytonos jel', 12, null, 'fill="' + BLUE + '" font-weight="700"') + txt(190, 22, 'minták (A/D)', 12, null, 'fill="' + ORANGE + '" font-weight="700"') + txt(320, 22, 'nulladrendű tartás (D/A)', 12, null, 'fill="' + GREEN + '" font-weight="700"') + '</svg>';

  STUDIE.addCourse({
    id: 'szabalyozas',
    title: 'Szabályozástechnika',
    icon: '🎛️',
    color: '#7c5cd6',
    level: 'BSc 3–5. félév (villamosmérnök, gépész, mechatronika)',
    description: 'Visszacsatolás, átviteli függvény, stabilitás, PID-szabályozó és digitális megvalósítás: a termosztáttól a drónig.',
    intro: 'A szabályozástechnika arról szól, hogyan lehet egy folyamatot mérés és visszacsatolás segítségével a kívánt állapotban tartani, akkor is, ha zavarások érik. A fogalmak mögött álló matematikát az [[#/egyetem/analizis|analízis]] adja (differenciálegyenletek, exponenciális függvény). Kézzelfogható példákért nézz bele a [[hoszivattyu|hőszivattyú]] és az [[elektromos-auto|elektromos autó]] modellbe.',
    topics: [
      { id: 'alap', title: 'Alapfogalmak' },
      { id: 'leiras', title: 'Rendszerek leírása' },
      { id: 'stab', title: 'Stabilitás és frekvenciatartomány' },
      { id: 'pid', title: 'PID-szabályozó' },
      { id: 'digit', title: 'Digitális szabályozás és alkalmazások' },
      { id: 'allapot', title: 'Állapottér-módszerek' }
    ],
    formulas: [
      {
        id: 'zart-kor', title: 'Zárt szabályozási kör átviteli függvénye', en: 'closed-loop transfer function',
        parts: [{ t: 'W(s)', d: 'Az alapjeltől a szabályozott jellemzőig tartó eredő átviteli függvény', unit: '–', more: 'W(s) = Y(s)/R(s)' }, { t: '=' },
          { t: 'G(s)', d: 'Az előremenő ág átviteli függvénye (szabályozó és szakasz szorzata: C(s)·G_p(s))', unit: '–' }, { t: '/ (1 +' },
          { t: 'G(s)', d: 'Az előremenő ág átviteli függvénye', unit: '–' }, { t: '·' },
          { t: 'H(s)', d: 'A visszacsatoló ág (érzékelő) átviteli függvénye; ideális méréskor H = 1', unit: '–' }, { t: ')' }],
        text: 'Negatív visszacsatolás esetén érvényes. A nevezőben álló `G·H` a **felnyitott kör** átviteli függvénye: ennek a vizsgálatából derül ki a zárt kör stabilitása. Ha a hurokerősítés nagy (`|G·H| ≫ 1`), akkor `W ≈ 1/H`: a zárt kör viselkedését szinte csak az érzékelő határozza meg, a szakasz pontatlansága kiesik.',
        example: 'Statikus esetben G = 9, H = 1: `W = 9/(1+9) = 0,9`. Ha a szakasz erősítése 20%-kal csökken (G = 7,2), akkor `W = 7,2/8,2 ≈ 0,878`: a kimenet csak kb. 2,4%-kal változik.'
      },
      {
        id: 'pt1-ugras', title: 'PT1-tag ugrásválasza', en: 'first-order step response',
        parts: [{ t: 'y(t)', d: 'A kimenet időfüggvénye egységugrás bemenetre', unit: 'a kimenet egysége' }, { t: '=' },
          { t: 'K', d: 'Arányossági (statikus) erősítés: a végérték és a bemeneti ugrás aránya', unit: 'kimenet/bemenet' }, { t: '· (1 − e^{−t/' },
          { t: 'T', d: 'Időállandó: ennyi idő alatt éri el a kimenet a végérték 63,2%-át', unit: 's', more: 'Átviteli függvény: G(s) = K/(1 + sT).' }, { t: '})' }],
        text: 'Egytárolós (egy energiatárolót tartalmazó) rendszerek válasza: RC-kör, vízmelegítő, egyenáramú motor fordulatszáma (az induktivitást elhanyagolva). Jellemző pontok: `t = T`-nél 63,2%, `3T`-nél 95%, `5T`-nél 99,3%.',
        example: 'K = 3, T = 4 s: `y(4 s) = 3·(1 − e^(−1)) ≈ 1,90`, `y(12 s) = 3·(1 − e^(−3)) ≈ 2,85`. A végérték 3, amelyet a gyakorlatban kb. 20 s (5T) után tekintünk elértnek.'
      },
      {
        id: 'marado-hiba', title: 'Maradó hiba P-szabályozással', en: 'steady-state error with proportional control',
        parts: [{ t: 'e_{∞}', d: 'Az állandósult hibajel egységugrás alapjel esetén', unit: 'a jel egysége' }, { t: '= 1 / (1 +' },
          { t: 'K', d: 'A felnyitott kör statikus erősítése: K = K_P·K_S (szabályozó és szakasz erősítésének szorzata)', unit: '–' }, { t: ')' }],
        text: 'Ha a felnyitott körben nincs integráló tag (0-típusú rendszer), a hiba nem tűnik el, csak a hurokerősítéssel arányosan csökken. A végértéktételből: `e_∞ = lim s·E(s) = 1/(1 + G(0))`. Integráló tag (I-hatás) esetén `G(0) → ∞`, így a maradó hiba nulla.',
        example: 'K_P = 2, K_S = 1: `e_∞ = 1/3 ≈ 0,33`, a kimenet csak 0,67-ig jut. K_P = 9 esetén a hiba 0,1, de közben a kör lengékenyebbé válik.'
      },
      {
        id: 'pid-torveny', title: 'A PID-szabályozó törvénye', en: 'PID control law',
        parts: [{ t: 'u(t)', d: 'Beavatkozó jel (a szabályozó kimenete)', unit: 'pl. %, V' }, { t: '=' },
          { t: 'K_P', d: 'Arányos erősítés: a jelenlegi hibára reagál', unit: 'u/e' }, { t: '· e(t) +' },
          { t: 'K_I', d: 'Integráló erősítés: a múltbeli hibák összegére reagál; K_I = K_P/T_I', unit: 'u/(e·s)', more: 'T_I az integrálási (utánállítási) idő.' }, { t: '∫ e dt +' },
          { t: 'K_D', d: 'Deriváló erősítés: a hiba változási sebességére, azaz a várható jövőre reagál; K_D = K_P·T_D', unit: 'u·s/e', more: 'T_D a deriválási (előretartási) idő.' }, { t: '· de/dt' }],
        text: 'Párhuzamos alakban írva. Ipari szabályozókban gyakoribb a „soros” vagy szabványos alak: `u = K_P·(e + (1/T_I)∫e dt + T_D·de/dt)`. Átviteli függvénye: `C(s) = K_P + K_I/s + K_D·s`.',
        example: 'K_P = 2, K_I = 0,5 1/s, K_D = 0,3 s. Egy pillanatban e = 1,5, ∫e dt = 4, de/dt = −0,8: `u = 3 + 2 − 0,24 = 4,76`.'
      },
      {
        id: 'tullendules', title: 'Túllendülés és csillapítási tényező', en: 'overshoot and damping ratio',
        parts: [{ t: 'M_p', d: 'Százalékos túllendülés: mennyivel lépi túl a válasz a végértéket', unit: '%' }, { t: '= 100 · exp( −π ·' },
          { t: 'ζ', d: 'Csillapítási tényező (0 < ζ < 1 esetén lengő válasz)', unit: '–' }, { t: '/ √(1 − ζ^2) )' }],
        text: 'Csak egy tiszta PT2-tagra (két komplex pólus, zérus nélkül) pontos, de egy zárt kör domináns póluspárjára jó közelítés. Kapcsolódó gyorsképletek (ω_n a csillapítatlan sajátkörfrekvencia): csúcsidő `t_p = π/(ω_n·√(1−ζ²))`, 2%-os beállási idő `t_s ≈ 4/(ζ·ω_n)`.',
        example: 'ζ = 0,5: `M_p = 100·e^(−1,814) ≈ 16,3%`. ζ = 0,7: kb. 4,6%. Ha ω_n = 2 rad/s és ζ = 0,5, a beállási idő `t_s ≈ 4/(0,5·2) = 4 s`.'
      },
      {
        id: 'fazistartalek', title: 'Fázistartalék és erősítéstartalék', en: 'phase margin and gain margin',
        parts: [{ t: 'φ_t', d: 'Fázistartalék: ennyi többlet fáziskésés vinné a zárt kört a stabilitás határára', unit: '°' }, { t: '= 180° +' },
          { t: 'φ(ω_c)', d: 'A felnyitott kör fázisa a vágási körfrekvencián, ahol |L(jω_c)| = 1 (0 dB)', unit: '°' }, { t: ';' },
          { t: 'e_t', d: 'Erősítéstartalék: ennyiszeresére növelhető a hurokerősítés a stabilitás határáig', unit: '– vagy dB' }, { t: '= 1 / |L(jω_{180})|' }],
        text: 'ω_180 az a körfrekvencia, ahol a felnyitott kör fázisa −180°. Szokásos tervezési célok: `φ_t ≈ 45…60°`, `e_t ≥ 2` (6 dB). A fázistartalék és a zárt kör csillapítása között durva összefüggés: `ζ ≈ φ_t / 100°` (kb. 70°-ig).',
        example: 'L(s) = 2/(1+s)³: |L| = 1 ott, ahol `(1+ω²)^1,5 = 2`, azaz ω_c ≈ 0,766 rad/s; ott a fázis `−3·arctg 0,766 ≈ −112,4°`, így `φ_t ≈ 67,6°`. A −180°-os pont ω_180 = √3 ≈ 1,73 rad/s, ott |L| = 2/8 = 0,25, tehát `e_t = 4` (≈ 12 dB).'
      },
      {
        id: 'ziegler-nichols-keplet', title: 'Ziegler–Nichols-beállítás (lengéspróba)', en: 'Ziegler–Nichols ultimate gain method',
        parts: [{ t: 'K_P', d: 'Ajánlott arányos erősítés', unit: '–' }, { t: '= 0,6 ·' },
          { t: 'K_{krit}', d: 'Kritikus erősítés: tisztán P-szabályozással ennél az erősítésnél leng állandó amplitúdóval a kör', unit: '–' }, { t: ';' },
          { t: 'T_I', d: 'Integrálási idő', unit: 's' }, { t: '= 0,5 ·' },
          { t: 'T_{krit}', d: 'A kritikus lengés periódusideje', unit: 's' }, { t: ';' },
          { t: 'T_D', d: 'Deriválási idő', unit: 's' }, { t: '= 0,125 · T_{krit}' }],
        text: 'PID-re vonatkozó értékek. P-szabályozóhoz `K_P = 0,5·K_krit`, PI-hez `K_P = 0,45·K_krit` és `T_I = T_krit/1,2`. A módszer kb. 25%-os túllendülést (negyedcsillapítást) céloz: gyakran túl agresszív, ezért kiindulópontnak tekintjük.',
        example: 'A 1/(1+s)³ szakasznál `K_krit = 8`, `T_krit = 2π/√3 ≈ 3,63 s`. PID: `K_P = 4,8`, `T_I ≈ 1,81 s`, `T_D ≈ 0,45 s`.'
      },
      {
        id: 'shannon', title: 'Mintavételi tétel (Shannon–Nyquist)', en: 'Nyquist–Shannon sampling theorem',
        parts: [{ t: 'f_s', d: 'Mintavételi frekvencia: másodpercenként ennyi mintát veszünk', unit: 'Hz', more: 'T_s = 1/f_s a mintavételi idő.' }, { t: '>' }, { t: '2 ·' },
          { t: 'f_{max}', d: 'A jelben előforduló legnagyobb frekvencia', unit: 'Hz' }],
        text: 'Ha a feltétel teljesül, a sávkorlátozott jel a mintáiból elvileg tökéletesen visszaállítható. Ha nem, **átlapolódás** (aliasing) lép fel: a nagyfrekvenciás összetevők hamis, alacsony frekvenciaként jelennek meg. Ezért az A/D átalakító elé **anti-aliasing szűrőt** tesznek. Szabályozásnál a tétel csak alsó korlát: ökölszabály, hogy a zárt kör sávszélességének 10–30-szorosával mintavételezzünk.',
        example: 'A hallható hang 20 kHz-ig terjed, ezért a CD 44,1 kHz-cel mintavételez. Egy 2 Hz sávszélességű pozíciószabályozásnál 20–60 Hz elméletben elég volna, a gyakorlatban mégis 1 kHz körül mintavételeznek, hogy a késleltetés kicsi maradjon.'
      },
      {
        id: 'vegertek', title: 'Végértéktétel', en: 'final value theorem',
        parts: [{ t: 'lim_{t→∞} y(t)', d: 'Az időfüggvény állandósult (végső) értéke', unit: 'a jel egysége' }, { t: '=' },
          { t: 'lim_{s→0}', d: 'Határérték a komplex frekvencia nullához tartásakor (egyenáramú, „lassú” határeset)', unit: '–' }, { t: 's ·' },
          { t: 'Y(s)', d: 'Az y(t) jel Laplace-transzformáltja', unit: '–' }],
        text: 'Csak akkor alkalmazható, ha a végérték létezik: `s · Y(s)` minden pólusa a bal félsíkon van. A párja a **kezdetiérték-tétel**: `y(0⁺) = lim_(s→∞) s · Y(s)`. Egységugrásra (`1/s`) adott válasz végértéke egyszerűen `G(0)`, a statikus erősítés.',
        example: '`G(s) = 5/(s² + 3s + 2)` ugrásválaszának végértéke `lim s · G(s)/s = G(0) = 5/2 = 2,5`. Instabil `1/(s − 1)`-re a tétel formálisan 0-t adna, pedig a válasz minden határon túl nő.'
      },
      {
        id: 'allapotegyenlet', title: 'Lineáris állapotegyenlet', en: 'state-space equations',
        parts: [{ t: 'ẋ', d: 'Az állapotvektor időderiváltja', unit: 'n elemű vektor' }, { t: '=' },
          { t: 'A', d: 'Rendszermátrix (n × n): az állapotok egymásra hatása; sajátértékei a rendszer pólusai', unit: '–' }, { t: '· x +' },
          { t: 'B', d: 'Bemeneti mátrix (n × m): hogyan hat a bemenet az állapotokra', unit: '–' }, { t: '· u;   y =' },
          { t: 'C', d: 'Kimeneti mátrix (p × n): mely állapotkombinációkat mérjük', unit: '–' }, { t: '· x +' },
          { t: 'D', d: 'Közvetlen átvezetés (p × m), fizikai rendszereknél gyakran nulla', unit: '–' }, { t: '· u' }],
        text: 'Az átviteli függvény ebből: `G(s) = C · (sI − A)⁻¹ · B + D`. A nevező `det(sI − A)`, ezért a pólusok A sajátértékei. Az állapotválasztás nem egyértelmű: `x = T · z` hasonlósági transzformációval ugyanannak a rendszernek végtelen sok állapottér-alakja van, de a sajátértékek nem változnak.',
        example: 'Rugó–tömeg–csillapító (m, c, k), x_1 = elmozdulás, x_2 = sebesség: `A = [[0, 1], [−k/m, −c/m]]`, `B = [0; 1/m]`, `C = [1, 0]`. m = 1, c = 3, k = 2 esetén a sajátértékek −1 és −2.'
      },
      {
        id: 'tustin', title: 'Tustin-közelítés (bilineáris transzformáció)', en: 'Tustin (bilinear) transformation',
        parts: [{ t: 's', d: 'A folytonos idejű átviteli függvény változója', unit: '1/s' }, { t: '≈' }, { t: '2 /' },
          { t: 'T', d: 'Mintavételi idő', unit: 's' }, { t: '·' }, { t: '(z − 1)/(z + 1)', d: 'A z-tartománybeli megfelelő; z⁻¹ egy mintavételnyi késleltetés', unit: '–' }],
        text: 'A trapézszabályos integrálásból adódik. A bal félsíkot pontosan az egységkör belsejébe képezi le, így stabil folytonos szabályozóból stabil diszkrét lesz. A frekvenciatengely torzul (`ω_d = (2/T) · arctg(ω · T/2)`), ami a Nyquist-frekvencia közelében jelentős.',
        example: 'Integrátor `1/s`, T = 0,01 s: `0,005 · (z + 1)/(z − 1)`, vagyis `y[k] = y[k−1] + 0,005 · (u[k] + u[k−1])` – a trapézszabály.'
      },
      {
        id: 'simc', title: 'SIMC PI-hangolás holtidős PT1 szakaszra', en: 'SIMC PI tuning rule',
        parts: [{ t: 'K_c', d: 'A PI-szabályozó erősítése', unit: '–' }, { t: '= (1/' },
          { t: 'k', d: 'A szakasz statikus erősítése', unit: '–' }, { t: ') ·' }, { t: 'τ_1', d: 'A szakasz időállandója', unit: 's' }, { t: '/ (' },
          { t: 'τ_c', d: 'A kívánt zárt köri időállandó – az egyetlen hangolási paraméter', unit: 's', more: 'Szoros, de robusztus szabályozáshoz τ_c = θ ajánlott.' }, { t: '+' },
          { t: 'θ', d: 'A szakasz (effektív) holtideje', unit: 's' }, { t: ');   T_I = min(τ_1, 4 · (τ_c + θ))' }],
        text: 'Skogestad (2003) szabálya a belső modellen alapuló (IMC) tervezés egyszerűsítése. Az eredeti IMC/lambda-hangolás `T_I = τ_1`-et ad; a minimum-feltétel nagy időállandójú (közel integráló) szakaszoknál gyorsítja a zavarelhárítást.',
        example: 'k = 2, τ_1 = 10 s, θ = 2 s, τ_c = θ = 2 s: `K_c = (1/2) · 10/4 = 1,25`, `T_I = min(10, 16) = 10 s`.'
      }
    ],
    terms: [
      /* ----- Alapfogalmak ----- */
      { id: 'vezerles-szabalyozas', term: 'Vezérlés és szabályozás', en: 'open-loop vs. closed-loop control', topic: 'alap',
        short: 'Vezérlésnél a beavatkozás nem függ a tényleges eredménytől (nyitott hatáslánc); szabályozásnál mérjük a kimenetet és a hiba alapján avatkozunk be (zárt hatáslánc).',
        prereq: ['lecke:informatika/algoritmusok'],
        visual: openSvg, caption: 'A vezérlés „vakon” dolgozik; a szabályozás a mért kimenetet visszavezeti és összeveti a kívánt értékkel.',
        text: '**Vezérlés** (nyitott hatáslánc): a vezérlő egy előre megadott szabály szerint állítja a beavatkozó jelet. Ha a folyamatot zavarás éri, vagy a modell pontatlan, a kimenet eltér, és ezt senki nem veszi észre. Példa: időzítős mosógép, közlekedési lámpa fix ciklussal, kenyérpirító.\n\n**Szabályozás** (zárt hatáslánc): a kimenetet **folyamatosan mérjük**, összehasonlítjuk az alapjellel, és a különbség (hibajel) alapján avatkozunk be. Így a zavarások hatása automatikusan csökken. Ára: érzékelő kell, és a visszacsatolt rendszer instabillá is válhat.\n\nA gyakorlatban gyakran kombinálják őket: a **előrecsatolás** (feedforward) a mérhető zavarást előre kompenzálja, a visszacsatolás pedig a maradékot javítja.',
        example: 'Fűtés: a kazán 2 órán át fix teljesítménnyel megy (vezérlés). Ha kint hirtelen lehűl, a lakás is hűvösebb lesz. Szobatermosztáttal (szabályozás) a hőmérséklet-csökkenést a termosztát érzékeli, és tovább fűt.',
        pitfall: 'A mindennapi nyelv a „vezérlés” szót mindkettőre használja (pl. „vezérlőpult”). Szakmailag a döntő kérdés: van-e visszacsatolás a **ténylegesen elért** értékről? A PLC-t „vezérlőnek” hívják, pedig gyakran szabályoz.',
        related: ['visszacsatolas', 'hatasvazlat', 'zavaras', 'ketallasu', 'plc'] },
      { id: 'hatasvazlat', term: 'Hatásvázlat (blokkdiagram)', en: 'block diagram', topic: 'alap',
        short: 'A rendszer grafikus leírása, ahol a tagokat dobozok, a jeleket nyilak, az összegzést körök jelölik.',
        prereq: ['lecke:matematika/linearis-fuggveny'],
        visual: loopSvg, caption: 'Egy hurkos szabályozási kör hatásvázlata: alapjel, hibajel, szabályozó, szakasz, zavarás és visszacsatolás.',
        text: 'Minden doboz egy **tag**: bemenő jelből kimenő jelet állít elő, a kapcsolatot az átviteli függvénye írja le. A jelek csak a nyíl irányában hatnak (a tag „nem terheli vissza” az előzőt).\n\nAz összevonási szabályok:\n\n- **soros** kapcsolás: `G = G_1·G_2`;\n- **párhuzamos** kapcsolás: `G = G_1 + G_2`;\n- **negatív visszacsatolás**: `W = G/(1 + G·H)`.\n\nA szabályozási kör szokásos részei: alapjel-képző, különbségképző (összegzőpont), szabályozó, beavatkozó szerv (pl. szelep, motor), szakasz (a szabályozott folyamat), érzékelő (mérőátalakító).',
        example: 'Szabályozó C = 5, szakasz G = 2, érzékelő H = 1 (statikus értékek): soros ág `5·2 = 10`, zárt kör `W = 10/11 ≈ 0,91`. 1 V alapjelre a kimenet 0,91 V.',
        pitfall: 'Az összegzőpont előjeleit mindig ki kell írni. Ha a visszacsatolt jel „+” jellel érkezik (pozitív visszacsatolás), a képlet `G/(1 − GH)`, és a kör könnyen instabil lesz.',
        formulas: ['zart-kor'],
        related: ['visszacsatolas', 'atviteli-fuggveny', 'alapjel-hibajel', 'zavaras', 'vezerles-szabalyozas'] },
      { id: 'visszacsatolas', term: 'Visszacsatolás', en: 'feedback', topic: 'alap',
        short: 'A kimenet (mért) értékének visszavezetése a bemenetre; negatív visszacsatolásnál a különbség alapján avatkozunk be.',
        prereq: ['elektronika/negativ-visszacsatolas', 'lecke:fizika/newton'],
        text: '**Negatív visszacsatolás**: a visszavezetett jelet levonjuk az alapjelből. Előnyei:\n\n- csökkenti a zavarások hatását (`1/(1+GH)`-szorosára);\n- csökkenti az érzékenységet a szakasz paramétereinek változására;\n- gyorsíthatja a rendszert, és instabil szakaszt is stabilizálhat.\n\nHátránya, hogy a hurokban lévő késleltetések miatt **túl nagy erősítésnél lengésbe jöhet**: a késve érkező javítás ráerősít a hibára.\n\n**Pozitív visszacsatolás** a jelet hozzáadja: önmagát erősítő folyamat. Szabályozásban kerülendő, de hasznos például oszcillátorokban és hiszterézises komparátorokban.',
        example: 'Ha a zárt kör hurokerősítése GH = 19, egy a kimenetre ható zavarás hatása `1/(1+19) = 5%`-ra csökken a szabályozás nélküli esethez képest.',
        pitfall: 'A „negatív” nem rosszat jelent, hanem az előjelet: ez a stabilizáló fajta. A visszacsatolás nem csodaszer: a mérés hibáját (érzékelő pontatlanság, zaj) nem tudja javítani, azt hűen „lekövetni” fogja.',
        formulas: ['zart-kor'],
        related: ['hatasvazlat', 'alapjel-hibajel', 'zavaras', 'stabilitas', 'vezerles-szabalyozas'], models: ['hoszivattyu'] },
      { id: 'alapjel-hibajel', term: 'Alapjel, hibajel, beavatkozó jel', en: 'setpoint, error signal, control signal', topic: 'alap',
        short: 'Az alapjel (r) a kívánt érték, a hibajel (e = r − y) az eltérés tőle, a beavatkozó jel (u) a szabályozó kimenete.',
        text: 'A szabályozási kör jelei:\n\n- **alapjel** (r, setpoint, SP): a kívánt érték, pl. 21 °C;\n- **szabályozott jellemző** (y, process value, PV): a ténylegesen mért érték;\n- **hibajel** vagy rendelkező jel (e = r − y);\n- **beavatkozó jel** (u, controller output): pl. szelepnyitás %-ban, motorfeszültség;\n- **zavarás** (d): kívülről, akaratunktól függetlenül ható jel.\n\nKét feladattípus van: **alapjelkövetés** (az r változik, pl. pályakövetés), illetve **értéktartás** (r állandó, a zavarásokat kell kivédeni). A jó szabályozó mindkettőben jól teljesít, de a hangolás gyakran kompromisszum.',
        example: 'Tempomat: alapjel 110 km/h, mért sebesség 104 km/h, a hibajel +6 km/h. Egy P-szabályozó K_P = 2 %/(km/h) erősítéssel `u = 12%`-kal nyitja tovább a „gázt” a munkaponthoz képest.',
        pitfall: 'Előjel-konvenció: `e = r − y`. Ha a beavatkozás fordított hatású (pl. hűtésnél a nagyobb u csökkenti y-t), a szabályozó irányát is meg kell fordítani („direkt/reverz” beállítás), különben a kör elszabadul.',
        related: ['hatasvazlat', 'zavaras', 'p-hatas', 'visszacsatolas', 'tempomat'] },
      { id: 'zavaras', term: 'Zavarás', en: 'disturbance', topic: 'alap',
        short: 'A szabályozott folyamatra kívülről ható, nem befolyásolható jel, amely eltéríti a kimenetet az alapjeltől.',
        text: 'Példák: fűtésnél a külső hőmérséklet és a nyitott ablak, tempomatnál az emelkedő és a szél, drónnál a széllökés, villamos hálózatnál a terhelés változása.\n\nA zavarás hatását háromféleképpen csökkenthetjük:\n\n1. **visszacsatolással**: a hatás csak a kimeneten jelentkezik, onnan javítunk (mindig késve);\n2. **előrecsatolással**: ha a zavarás mérhető, még a kimenet eltérése előtt kompenzálunk;\n3. **integráló hatással**: állandó zavarás hatását az I-tag teljesen eltünteti.\n\nA **mérési zaj** is zavarás, de az érzékelőnél lép be. Ezt a szabályozó nem tudja megkülönböztetni a valódi eltéréstől, ezért túl gyors (nagy sávszélességű) szabályozás a zajt is továbbítja a beavatkozóra.',
        example: 'Szobahőmérséklet-szabályozás P-szabályozóval: egy ablaknyitás, amely szabályozás nélkül 4 °C-os lehűlést okozna, K = 7 hurokerősítés mellett állandósult állapotban csak `4/(1+7) = 0,5 °C`-os eltérést hagy. PI-szabályozóval ez is eltűnik.',
        pitfall: 'A zavarás nem azonos az alapjel-változással: egy jól követő szabályozó lehet rossz zavarelhárító (és fordítva), ha a zavarás a szakasz belsejében, nagy késéssel hat.',
        related: ['alapjel-hibajel', 'visszacsatolas', 'i-hatas', 'tempomat', 'hatasvazlat'] },

      /* ----- Rendszerek leírása ----- */
      { id: 'differencialegyenlet', term: 'Dinamikus modell (differenciálegyenlet)', en: 'dynamic model, ordinary differential equation', topic: 'leiras',
        short: 'A rendszer időbeli viselkedését leíró, a kimenet és a bemenet deriváltjait összekapcsoló egyenlet.',
        prereq: ['analizis/linearis-de', 'analizis/derivalt', 'mechanika/szabad-rezges'],
        text: 'A fizikai törvényekből (Newton, Kirchhoff, energiamérleg) felírt modell. A szabályozástechnika főként **lineáris, időinvariáns** (LTI) rendszerekkel dolgozik:\n\n`a_n·y⁽ⁿ⁾ + … + a_1·y\' + a_0·y = b_m·u⁽ᵐ⁾ + … + b_0·u`\n\nA rendszer **rendje** a legmagasabb derivált foka, ez az energiatárolók (tömeg, rugó, kondenzátor, tekercs, hőkapacitás) számával egyezik meg.\n\nA nemlineáris rendszereket (pl. inga, tartály kifolyással) egy **munkapont** körül linearizáljuk: kis eltérésekre a Taylor-sor lineáris tagját tartjuk meg. A többváltozós rendszereket **állapottér-modellel** írják le: `x\' = A·x + B·u`, `y = C·x + D·u`.',
        example: 'Rugó–tömeg–csillapító: `m·y\'\' + c·y\' + k·y = F`. m = 1 kg, c = 2 N·s/m, k = 4 N/m esetén `ω_n = √(k/m) = 2 rad/s`, `ζ = c/(2√(k·m)) = 0,5`: lengő, kb. 16%-os túllendüléssel beálló rendszer.',
        pitfall: 'A linearizált modell csak a munkapont közelében érvényes. Nagy jeleknél (telítődés, holtjáték, súrlódás) a valódi rendszer eltér tőle, ez a hangolásban meglepetéseket okozhat.',
        related: ['laplace', 'atviteli-fuggveny', 'pt1-tag', 'pt2-tag'] },
      { id: 'laplace', term: 'Laplace-transzformáció', en: 'Laplace transform', topic: 'leiras',
        short: 'Integráltranszformáció, amely az időfüggvényt az s komplex változó függvényévé alakítja; a deriválásból s-sel való szorzás lesz.',
        prereq: ['analizis/improprius-integral', 'analizis/linearis-de', 'villamosmernoki/fazor'],
        text: 'Definíció: `F(s) = ∫₀^∞ f(t)·e^(−st) dt`, ahol `s = σ + jω`.\n\nA legfontosabb szabályok (nulla kezdeti feltételekkel):\n\n- deriválás: `f\'(t) → s·F(s)`;\n- integrálás: `∫f dt → F(s)/s`;\n- késleltetés T_h idővel: `f(t − T_h) → e^(−sT_h)·F(s)`;\n- egységugrás: `1(t) → 1/s`; exponenciális: `e^(−at) → 1/(s + a)`.\n\nÍgy a differenciálegyenletből **algebrai egyenlet** lesz, amelyet törtként rendezhetünk, majd részlettörtekre bontás után táblázatból visszatranszformálunk.\n\n**Végértéktétel**: `lim(t→∞) f(t) = lim(s→0) s·F(s)`, ha a határérték létezik (a rendszer stabil). Ezzel a maradó hiba közvetlenül számolható.',
        example: '`y\' + 2y = u`, u egységugrás, y(0) = 0: `s·Y + 2Y = 1/s`, így `Y = 1/(s·(s+2)) = 0,5/s − 0,5/(s+2)`. Visszatranszformálva `y(t) = 0,5·(1 − e^(−2t))`. A végértéktétel ugyanezt adja: `lim s·Y = 1/2`.',
        pitfall: 'A végértéktétel instabil rendszerre hamis eredményt ad: például `1/(s−1)` ugrásválaszára „−1” jönne ki, pedig a válasz a végtelenbe tart. Előbb mindig a stabilitást kell ellenőrizni.',
        related: ['differencialegyenlet', 'atviteli-fuggveny', 'stabilitas', 'holtido'] },
      { id: 'atviteli-fuggveny', term: 'Átviteli függvény', en: 'transfer function', topic: 'leiras',
        short: 'A kimenet és a bemenet Laplace-transzformáltjának hányadosa nulla kezdeti feltételek mellett: G(s) = Y(s)/U(s).',
        prereq: ['villamosmernoki/impedancia', 'elektronika/rc-szuro'],
        text: 'LTI rendszernél a G(s) két polinom hányadosa: `G(s) = (b_m·s^m + … + b_0)/(a_n·s^n + … + a_0)`.\n\n- A **nevező gyökei** a **pólusok**: ezek szabják meg a sajátmozgást és a stabilitást.\n- A **számláló gyökei** a **zérusok**: ezek az összetevők súlyát befolyásolják.\n- `G(0)` a **statikus erősítés** (állandósult állapotbeli arány).\n- s helyére jω-t írva kapjuk a **frekvenciaátvitelt**: `G(jω)`, ennek abszolút értéke és fázisa a Bode-diagram.\n\nAz átviteli függvény a hatásvázlat dobozainak „tartalma”: soros tagoknál szorzódnak, a visszacsatolt kört a `G/(1+GH)` képlet adja.',
        example: 'RC aluláteresztő szűrő, R = 10 kΩ, C = 100 µF: `G(s) = 1/(1 + s·RC) = 1/(1 + s·1 s)`. Pólus: s = −1 1/s, statikus erősítés 1. Ez egy PT1-tag T = 1 s időállandóval.',
        pitfall: 'Az átviteli függvény csak a bemenet–kimenet kapcsolatot írja le. Ha egy instabil pólus és egy zérus „kiejti” egymást, a G(s)-ben nem látszik, de a belső állapot mégis elszabadulhat.',
        formulas: ['zart-kor'],
        related: ['laplace', 'hatasvazlat', 'alaptagok', 'stabilitas', 'bode-diagram', 'pt1-tag'] },
      { id: 'alaptagok', term: 'Alaptagok: P, I, D', en: 'basic elements: proportional, integral, derivative', topic: 'leiras',
        short: 'A legegyszerűbb tagok: az arányos (P) a bemenet K-szorosát adja, az integráló (I) összegzi, a deriváló (D) a változási sebességére reagál.',
        prereq: ['analizis/riemann-integral', 'analizis/derivalt'],
        visual: tagSvg, caption: 'Az alaptagok ugrásválasza (szaggatott: a bemeneti egységugrás). A D-tag elméleti válasza egy Dirac-impulzus.',
        text: '- **P-tag**: `y = K·u`, `G = K`. Pl. emelőkar, ideális erősítő, áttétel.\n- **I-tag**: `y = (1/T_I)·∫u dt`, `G = 1/(s·T_I)`. Pl. tartály (befolyó víz → szint), motor (szögsebesség → szög). Ugrásra rámpával válaszol, állandó bemenetre sosem áll meg.\n- **D-tag**: `y = T_D·du/dt`, `G = s·T_D`. Pl. tekercs (áram → feszültség). Ideális formában fizikailag nem valósítható meg; a valóságban mindig van mellette egy szűrő (DT1-tag).\n\nEzekből és a tárolós tagokból (PT1, PT2) és a holtidőből bármilyen lineáris szakasz összerakható. Az **ugrásválasz** (a kimenet egységugrásra) a tagok legszemléletesebb „ujjlenyomata”: méréssel is könnyen felvehető.',
        example: 'Egy tartályba Q = 2 l/s víz folyik, a keresztmetszet A = 0,5 m²: a szint `h\' = Q/A = 0,004 m/s` sebességgel nő, 60 s alatt 24 cm-t. A tartály integráló tag: ha nincs kifolyás, a szint sosem áll be.',
        pitfall: 'Integráló szakaszt (pl. szintszabályozás, pozícionálás) önmagában nem lehet „magára hagyni”: egy kis állandó hiba is korlátlan elmozdulást okoz. Ezért ezek nyitott hurokban nem stabilak (határstabilak).',
        related: ['atviteli-fuggveny', 'pt1-tag', 'pt2-tag', 'holtido', 'p-hatas', 'i-hatas', 'd-hatas'] },
      { id: 'pt1-tag', term: 'PT1-tag és időállandó', en: 'first-order lag, time constant', topic: 'leiras',
        short: 'Egytárolós arányos tag, G(s) = K/(1 + sT); ugrásválasza exponenciálisan, T időállandóval közelít a K végértékhez.',
        prereq: ['analizis/exponencialis-novekedes', 'elektronika/rc-szuro'],
        visual: pt1Svg, caption: 'PT1-tag ugrásválasza: T idő alatt 63,2%, 3T alatt 95%, 5T alatt 99,3%. Az origóbeli érintő éppen T-nél éri el a végértéket.',
        text: 'Differenciálegyenlete: `T·y\' + y = K·u`. Az **időállandó** a tag „lomhaságát” méri: minél nagyobb a tárolt energia (hőkapacitás, kapacitás, tömeg) a disszipációhoz képest, annál nagyobb T.\n\nAz ugrásválaszból a paraméterek leolvashatók: K a végérték és az ugrás aránya, T pedig az az idő, ahol a válasz a végérték 63%-át eléri (vagy ahol az origóbeli érintő eléri a végértéket).\n\nFrekvenciatartományban a **töréspont** `ω = 1/T`: efölött az erősítés −20 dB/dekáddal csökken, a fázis 0°-ról −90°-ra fordul.',
        example: 'Egy vízmelegítőt 2 kW-tal fűtünk, a végső hőmérséklet-emelkedés 40 °C, T = 30 perc. 30 perc után `40·0,632 ≈ 25 °C`-kal, 90 perc után `40·0,95 = 38 °C`-kal melegebb a víz.',
        pitfall: 'Nem 5T után „ér célba” a válasz, elméletileg soha. Az 5T csak megállapodás (99,3%). Másrészt: a T nem a felfutási idő; a 10%→90% felfutási idő PT1-nél kb. 2,2·T.',
        formulas: ['pt1-ugras'],
        related: ['alaptagok', 'pt2-tag', 'atviteli-fuggveny', 'bode-diagram', 'holtido'] },
      { id: 'pt2-tag', term: 'PT2-tag (lengő tag)', en: 'second-order system', topic: 'leiras',
        short: 'Kéttárolós arányos tag, G(s) = K·ω_n²/(s² + 2ζω_n·s + ω_n²); ζ < 1 esetén túllendüléssel, lengve áll be.',
        prereq: ['mechanika/csillapitas', 'mechanika/szabad-rezges', 'villamosmernoki/rezonancia'],
        visual: pt2Svg, caption: 'PT2-tag egységugrás-válasza különböző ζ csillapítási tényezőkkel. A zöld sáv a ±2%-os beállási tartomány.',
        text: 'Két paraméter jellemzi: a **csillapítatlan sajátkörfrekvencia** (ω_n) és a **csillapítási tényező** (ζ, zéta).\n\n- `ζ = 0`: csillapítatlan, állandó lengés;\n- `0 < ζ < 1`: **alulcsillapított**, komplex póluspár, túllendülés;\n- `ζ = 1`: **aperiodikus határeset**, a leggyorsabb túllendülés nélküli válasz;\n- `ζ > 1`: túlcsillapított, két valós pólus (két PT1 sorba kötve).\n\nSok zárt szabályozási kör jól közelíthető egy domináns PT2-vel. Ezért a minőségi jellemzők (túllendülés, csúcsidő, beállási idő) képletei ebből származnak. A gyakorlatban kedvelt `ζ ≈ 0,7`: kb. 5% túllendülés, gyors beállás.',
        example: 'Lengéscsillapított autókerék: m = 1 kg, c = 2 N·s/m, k = 4 N/m modellnél ω_n = 2 rad/s, ζ = 0,5. Túllendülés `≈ 16,3%`, a csúcs `t_p = π/(2·√0,75) ≈ 1,81 s`-nál, 2%-os beállás kb. `4/(0,5·2) = 4 s` alatt.',
        pitfall: 'A túllendülés-képlet csak tiszta PT2-re pontos. Ha a zárt körben zérus is van (pl. PI- vagy PID-szabályozó miatt), a valódi túllendülés nagyobb lehet a ζ alapján számoltnál.',
        formulas: ['tullendules'],
        related: ['pt1-tag', 'differencialegyenlet', 'stabilitas', 'p-hatas', 'd-hatas', 'alaptagok'] },
      { id: 'holtido', term: 'Holtidő', en: 'dead time, transport delay', topic: 'leiras',
        short: 'Tiszta késleltetés: a kimenet a bemenet T_h idővel eltolt mása, G(s) = e^(−sT_h).',
        text: 'Holtidőt anyag- vagy információszállítás okoz: szállítószalag, csővezeték, a meleg víz útja a kazántól a csapig, hálózati kommunikáció, mintavételezés.\n\nAmplitúdóját nem változtatja (`|e^(−jωT_h)| = 1`), de fáziskésése a frekvenciával **korlátlanul nő**: `φ = −ω·T_h`. Ez rontja legjobban a szabályozhatóságot: a fázistartalékot elfogyasztja, ezért holtidős szakasznál a szabályozót lassabbra kell hangolni.\n\nÖkölszabály: ha a holtidő és a domináns időállandó aránya `T_h/T > 1`, a szokásos PID-szabályozó nehezen boldogul; ilyenkor **Smith-prediktor** vagy modellalapú prediktív szabályozás (MPC) segíthet.',
        example: 'Szállítószalag: L = 2 m, v = 0,5 m/s, így `T_h = 4 s`. ω = 0,2 rad/s körfrekvencián a fáziskésés `0,2·4 = 0,8 rad ≈ 46°`: önmagában is a fázistartalék nagy részét elviszi.',
        pitfall: 'A zuhany: aki 2 másodperces holtidő mellett gyorsan tekergeti a csapot, a forró és hideg víz között ingadozik. A holtidős kört csak „türelmesen” (kis erősítéssel) lehet szabályozni.',
        related: ['alaptagok', 'pt1-tag', 'stabilitasi-tartalek', 'ziegler-nichols', 'mintavetelezes'] },

      /* ----- Stabilitás és frekvenciatartomány ----- */
      { id: 'stabilitas', term: 'Stabilitás és pólusok', en: 'stability and poles', topic: 'stab',
        short: 'Egy LTI rendszer akkor (aszimptotikusan) stabil, ha minden pólusa a komplex sík bal félsíkján van (negatív valós részű).',
        prereq: ['linearis-algebra/sajatertek', 'analizis/exponencialis-novekedes'],
        visual: poleSvg, caption: 'A pólusok helye és a hozzájuk tartozó sajátmozgás: a valós rész a lecsengés (vagy felfutás) sebessége, a képzetes rész a lengés körfrekvenciája.',
        text: 'Minden p pólushoz `e^(p·t)` alakú összetevő tartozik a válaszban. `p = σ + jω` esetén ez `e^(σt)·cos(ωt)` jellegű: ha σ < 0, lecseng; ha σ > 0, korlátlanul nő.\n\n- **Stabil**: minden pólus bal félsíkon (σ < 0).\n- **Határstabil**: egyszeres pólus(ok) a képzetes tengelyen (pl. integrátor, csillapítatlan lengés).\n- **Instabil**: van jobb félsíkbeli pólus.\n\nA zárt kör pólusai a `1 + G(s)H(s) = 0` **karakterisztikus egyenlet** gyökei. Ezek a hurokerősítéssel vándorolnak (gyökhelygörbe). Magasabb fokszámnál a gyököket kiszámolni sem kell: a **Routh–Hurwitz-kritérium** a polinom együtthatóiból dönt.\n\nA pólusok helye a minőségről is szól: a képzetes tengelytől való távolság a gyorsaságot, a pólus szöge a csillapítást adja.',
        example: 'Szakasz: `1/(1+s)³`, P-szabályozó K-val. Karakterisztikus egyenlet `(s+1)³ + K = 0`, gyökei `s = −1 + K^(1/3)·e^(±jπ/3)` és `−1 − K^(1/3)`. K = 8 esetén `s = ±j·√3` és −3: a kör a stabilitás határán leng, ω = 1,73 rad/s-mal. K > 8 esetén instabil.',
        pitfall: 'Egy stabil szakasz zárt körben is lehet instabil (túl nagy erősítésnél), és fordítva: instabil szakasz (pl. fordított inga, drón) visszacsatolással stabilizálható. A stabilitás a teljes kör tulajdonsága, nem az egyes tagoké.',
        related: ['atviteli-fuggveny', 'pt2-tag', 'nyquist', 'stabilitasi-tartalek', 'laplace', 'p-hatas'] },
      { id: 'bode-diagram', term: 'Bode-diagram', en: 'Bode plot', topic: 'stab',
        short: 'A frekvenciaátvitel két görbéje logaritmikus frekvenciatengelyen: az amplitúdó decibelben és a fázis fokban.',
        prereq: ['elektronika/bode', 'elektronika/torespont'],
        visual: bodeSvg, caption: 'A felnyitott kör L(s) = 2/(1+s)³ Bode-diagramja: a vágási körfrekvencián leolvasható a fázistartalék, a −180°-os pontnál az erősítéstartalék.',
        text: 'Az amplitúdó `20·log₁₀|G(jω)|` dB-ben, a fázis `arg G(jω)` fokban. Előnye, hogy a soros tagok görbéi egyszerűen **összeadódnak** (a szorzásból a logaritmus összeadást csinál).\n\nKézzel az **aszimptotikus** közelítéssel rajzoljuk: minden PT1-tag a töréspontja után −20 dB/dekád meredekséget és −90° fázist ad, az integrátor végig −20 dB/dekádot és −90°-ot, a holtidő 0 dB-t, de növekvő fáziskésést.\n\nSzabályozásnál a **felnyitott kör** `L = C·G·H` Bode-diagramját vizsgáljuk: a vágási körfrekvencia (ahol |L| = 0 dB) nagyjából a zárt kör sávszélessége, a fázistartalék pedig a csillapítást jelzi.',
        example: 'L(s) = 2/(1+s)³: kis frekvencián 20·log 2 ≈ 6 dB, ω = 1 töréspont felett −60 dB/dekád. 0 dB-t ω_c ≈ 0,77 rad/s-nál metsz, itt a fázis −112°: a fázistartalék kb. 68°.',
        pitfall: 'A Bode-alapú stabilitásvizsgálat (fázistartalék > 0) csak akkor megbízható, ha a felnyitott kör stabil és a 0 dB-t egyszer metszi. Bonyolultabb esetben a Nyquist-kritérium a biztos eszköz.',
        formulas: ['fazistartalek'],
        related: ['stabilitasi-tartalek', 'nyquist', 'pt1-tag', 'atviteli-fuggveny', 'holtido'] },
      { id: 'nyquist', term: 'Nyquist-kritérium (szemléletesen)', en: 'Nyquist stability criterion', topic: 'stab',
        short: 'A zárt kör stabilitása a felnyitott kör frekvenciagörbéjéből dönthető el: stabil felnyitott kör esetén a görbe nem kerülheti meg a −1 pontot.',
        prereq: ['villamosmernoki/fazor'],
        visual: nqSvg, caption: 'L(s) = 2/(1+s)³ Nyquist-görbéje: a −0,25 pontban metszi a negatív valós tengelyt, messze a −1-től.',
        text: 'A Nyquist-diagram az `L(jω)` komplex számot rajzolja a komplex síkon, ahogy ω 0-tól végtelenig nő (a negatív ω-khoz tartozó tükörkép szaggatott).\n\nSzemléletes jelentés: a −1 pont az a hely, ahol a hurokban körbefutó jel **erősítése 1 és fázisa −180°**, vagyis a negatív visszacsatolás pozitívvá válik, és a jel önmagát tartja fenn. Ha a görbe ezt a pontot körbeöleli, a zárt kör instabil.\n\nÁltalános alak: `Z = N + P`, ahol P a felnyitott kör jobb félsíkbeli pólusainak száma, N a −1 pont óramutató szerinti körülfordulásainak száma, Z a zárt kör instabil pólusainak száma. Stabilitáshoz Z = 0 kell.\n\nA **tartalékok** is itt látszanak a legszebben: az erősítéstartalék a negatív valós tengely metszéspontjának távolsága a −1-től, a fázistartalék az egységkörrel vett metszéspont szöge a negatív valós tengelytől.',
        example: 'K/(1+s)³ a negatív valós tengelyt ω = √3-nál, `−K/8`-ban metszi. K = 2: −0,25 (stabil, 4-szeres tartalék). K = 8: pont a −1-en megy át (határstabil). K = 12: −1,5, a görbe körbeöleli a −1-et, a zárt kör instabil.',
        pitfall: 'Instabil felnyitott körnél (P > 0) a görbének éppen **körbe kell ölelnie** a −1-et (ellenkező irányban, P-szer) a stabilitáshoz. A „ne kerülje meg” szabály csak stabil felnyitott körre érvényes.',
        related: ['stabilitas', 'bode-diagram', 'stabilitasi-tartalek', 'atviteli-fuggveny'] },
      { id: 'stabilitasi-tartalek', term: 'Fázistartalék és erősítéstartalék', en: 'phase margin, gain margin', topic: 'stab',
        short: 'Megmutatják, mennyi többlet fáziskésést, illetve hányszoros erősítésnövekedést visel el a kör, mielőtt instabillá válna.',
        text: 'A modell sosem pontos: a szakasz paraméterei változnak, a mérés késik, a beavatkozó lassabb. A tartalékok ezért a **robusztusság** mérőszámai.\n\n- **Fázistartalék** (φ_t): a vágási körfrekvencián `180° + φ(ω_c)`. Szokásos cél: 45–60°. Kis fázistartalék nagy túllendülést és lassan lecsengő lengést jelent.\n- **Erősítéstartalék** (e_t): a −180°-os körfrekvencián `1/|L|`. Szokásos cél: legalább 2 (6 dB).\n\nA holtidő a fázistartalékot fogyasztja: `T_h` késés a vágási körfrekvencián `ω_c·T_h` radián fázist visz el. Ebből adódik a **holtidő-tartalék**: `φ_t/ω_c` (radiánban számolva).',
        example: 'L = 2/(1+s)³: φ_t ≈ 67,6° = 1,18 rad, ω_c ≈ 0,766 rad/s. A holtidő-tartalék `1,18/0,766 ≈ 1,54 s`: ennél nagyobb mérési késésnél a kör lengésbe jön. Az erősítéstartalék 4 (12 dB): K_P 2-ről 8-ra növelve határstabil.',
        pitfall: 'A két tartalék közül önmagában egyik sem elég: lehet nagy az erősítéstartalék, miközben a fázistartalék kicsi (vagy fordítva). Mindkettőt ellenőrizni kell, és érdemes a Nyquist-görbe −1 ponttól mért legkisebb távolságát is.',
        formulas: ['fazistartalek'],
        related: ['bode-diagram', 'nyquist', 'holtido', 'stabilitas', 'ziegler-nichols'] },

      /* ----- PID-szabályozó ----- */
      { id: 'pid-szabalyozo', term: 'PID-szabályozó', en: 'PID controller', topic: 'pid',
        short: 'Az ipar legelterjedtebb szabályozója: a beavatkozó jel a hiba arányos (P), integrált (I) és deriválált (D) részének súlyozott összege.',
        prereq: ['lecke:informatika/programozas', 'analizis/derivalt', 'analizis/riemann-integral'],
        visual: pidSvg, caption: 'Ugrásválasz egy 1/(1+s)³ szakaszon. A P-szabályozó maradó hibát hagy, a PI eltünteti, a PID gyorsabban és kisebb túllendüléssel áll be.',
        text: 'A három tag „időbeli” szerepe:\n\n- **P**: a **jelen** hibára reagál (minél nagyobb az eltérés, annál erősebben);\n- **I**: a **múlt** hibáit összegzi: addig nő, amíg hiba van, így megszünteti a maradó hibát;\n- **D**: a hiba változási sebességéből a **jövőre** következtet, fékez, csillapít.\n\nA szabályozási körök becslések szerint több mint 90%-a PI vagy PID. A D-tagot sokszor elhagyják, mert felerősíti a mérési zajt.\n\nGyakorlati kiegészítések: a D-tagot a **mért jelre** (nem a hibára) alkalmazzák, hogy alapjelugráskor ne adjon „rúgást” (derivative kick); a D-taghoz szűrőt tesznek; az I-taghoz **anti-windup** kell; a beavatkozó jelet korlátozzák.',
        example: 'A fenti szimulációban (1/(1+s)³ szakasz): P (K_P = 2) maradó hibája 1/3; PI (1,2; 2,2 s) kb. 16% túllendüléssel, 10,5 s alatt áll be ±2%-ra; PID (1,8; 2,6 s; 0,6 s) kb. 12% túllendüléssel 7,4 s alatt.',
        pitfall: 'A „több tag = jobb” nem igaz automatikusan. Rosszul hangolt PID rosszabb, mint egy jól hangolt PI. Hangolás nélkül a gyári alapértékek ritkán jók.',
        formulas: ['pid-torveny'],
        related: ['p-hatas', 'i-hatas', 'd-hatas', 'ziegler-nichols', 'anti-windup', 'mintavetelezes'], models: ['hoszivattyu'] },
      { id: 'p-hatas', term: 'P-hatás és maradó hiba', en: 'proportional action, steady-state error', topic: 'pid',
        short: 'A P-szabályozó a hibával arányos beavatkozást ad; integráló tag nélküli szakaszon állandósult állapotban is marad hiba.',
        text: 'Az arányos szabályozó `u = K_P·e`. A maradó hiba oka egyszerű: a szakasz kimenetének fenntartásához valamekkora **beavatkozó jel kell** (pl. fűtési teljesítmény), ezt a P-szabályozó csak akkor adja, ha van hiba.\n\nA K_P növelése:\n\n- csökkenti a maradó hibát (`1/(1+K)`),\n- gyorsítja a választ,\n- de csökkenti a stabilitási tartalékot: nő a túllendülés, végül lengésbe jön a kör.\n\nIntegráló szakasznál (pl. pozícionálás motorral) a P-szabályozó is nulla maradó hibát ad alapjelugrásra, mert az integrátor a szakaszban van. Állandó zavarásra viszont ilyenkor is marad hiba.\n\nIparban gyakran az **arányossági sáv** (proportional band) a megadott paraméter: `PB = 100% / K_P`.',
        example: 'Hurokerősítés K = 2: `e_∞ = 1/3`, a kimenet a kívánt érték 67%-áig jut. K = 9: 10% hiba. Egy 1/(1+s)³ szakasznál azonban K ≥ 8 már instabil, így P-szabályozóval 11% alá nem lehet menni.',
        pitfall: 'A maradó hibát nem lehet a K_P „végtelenre” növelésével eltüntetni: előbb jön a lengés és az instabilitás. Erre az I-tag a megoldás.',
        formulas: ['marado-hiba'],
        related: ['pid-szabalyozo', 'i-hatas', 'stabilitas', 'alapjel-hibajel', 'pt2-tag', 'alaptagok'] },
      { id: 'i-hatas', term: 'I-hatás (integráló hatás)', en: 'integral action', topic: 'pid',
        short: 'A hiba időbeli integráljával arányos beavatkozás; amíg hiba van, a beavatkozó jel változik, így a maradó hiba megszűnik.',
        prereq: ['analizis/riemann-integral'],
        text: 'Az integrátor állandósult állapotban csak akkor áll meg, ha a bemenete (a hiba) nulla. Ezért egy stabil kör I-taggal **nulla maradó hibát** ad állandó alapjelre és állandó zavarásra.\n\nÁra: az integrátor 90° fáziskésést visz a körbe, ez csökkenti a fázistartalékot, lassítja és lengékenyebbé teszi a választ. Kis T_I (erős I-hatás) túllendüléshez vezet.\n\nAz **integrálási idő** (T_I, utánállítási idő) szemléletesen: állandó hibánál ennyi idő alatt ad az I-tag annyi beavatkozást, mint a P-tag egyetlen pillanat alatt.',
        example: 'K_P = 2, T_I = 10 s, állandó e = 1 °C hiba: a P-rész azonnal 2%-ot ad, az I-rész 10 s alatt további 2%-ot, 60 s alatt 12%-ot, és tovább nő, amíg a hiba meg nem szűnik.',
        pitfall: 'Ha a beavatkozó szerv telítődik (a szelep már 100%-on van), az integrátor tovább gyűjti a hibát. Ez a **windup**: a kör később nagyot lő túl. Anti-windup nélküli PI-szabályozót nem szabad üzembe helyezni.',
        related: ['pid-szabalyozo', 'p-hatas', 'anti-windup', 'zavaras', 'alaptagok', 'tempomat'] },
      { id: 'd-hatas', term: 'D-hatás (differenciáló hatás)', en: 'derivative action', topic: 'pid',
        short: 'A hiba (vagy a mért jel) változási sebességével arányos beavatkozás: előre fékez, csillapítja a lengéseket.',
        text: 'A D-tag fázissiettetést ad (+90°-ig), ezzel **növeli a fázistartalékot**: csökken a túllendülés, és nagyobb K_P is megengedhető, tehát a szabályozás gyorsabb lehet.\n\nHátrányai:\n\n- nagyfrekvencián nagy erősítés, ezért **felerősíti a mérési zajt** (mindig szűrővel: `K_D·s/(1 + s·T_D/N)`, N ≈ 5…20);\n- az alapjelugrás deriváltja elméletileg végtelen: ezért a mért jelet deriválják, nem a hibát;\n- holtidős szakasznál keveset segít.\n\nTipikus alkalmazás: mechanikai pozícionálás, motorok, **drónok** helyzetszabályozása, ahol a sebesség jól mérhető (a giroszkóp közvetlenül a szögsebességet adja, ami a szög deriváltja).',
        example: 'Drón dőlésszög-szabályozása PD-vel: K_P = 4 %/°, K_D = 0,8 %·s/°. Ha a drón 5°-ra dőlt, de már 10 °/s-mal tér vissza, `u = 4·5 − 0,8·10 = 12%` (a D-rész a mért szögsebességből fékez); a D-tag nélkül 20% lenne, és a drón túllendülne.',
        pitfall: 'Zajos méréshez (pl. áramlásmérés, kevés bites jeladó) a D-tagot nem érdemes bekapcsolni: a beavatkozó szerv „rángatni” fog, és hamar elkopik.',
        related: ['pid-szabalyozo', 'p-hatas', 'stabilitasi-tartalek', 'pt2-tag', 'alaptagok', 'mintavetelezes'] },
      { id: 'ziegler-nichols', term: 'Ziegler–Nichols-hangolás', en: 'Ziegler–Nichols tuning', topic: 'pid',
        short: 'Tapasztalati PID-hangolási szabályok a kritikus erősítés és lengési periódus (vagy az ugrásválasz) alapján.',
        text: 'Két klasszikus változat (1942):\n\n1. **Lengéspróba** (zárt körben): csak P-szabályozással addig növeljük K_P-t, amíg a kör állandó amplitúdóval leng. Ez a **K_krit**, a lengés periódusa a **T_krit**. Ebből a táblázat adja a paramétereket (PID: `0,6·K_krit`, `0,5·T_krit`, `0,125·T_krit`).\n2. **Ugrásválasz-módszer** (nyitott körben): a szakasz ugrásválaszának inflexiós érintőjéből a látszólagos holtidő (L) és meredekség alapján.\n\nMindkettő agresszív, kb. negyedelő csillapításra (egymás utáni csúcsok aránya 1:4) hangol. Ma inkább kiindulópontnak használják, és finomhangolják (pl. a K_P csökkentésével), vagy modellalapú szabályokat (SIMC, IMC, Cohen–Coon) alkalmaznak. Sok ipari szabályozó automatikus hangolása (relé-próba, Åström–Hägglund) a lengéspróba biztonságos változata.',
        example: 'A 1/(1+s)³ szakasznál `K_krit = 8`, `T_krit = 3,63 s`. Ziegler–Nichols PID: K_P = 4,8; T_I = 1,81 s; T_D = 0,45 s. Szimulációban így kb. 52% a túllendülés: az ajánlás valóban csak kiindulás, K_P-t érdemes kb. a felére csökkenteni.',
        pitfall: 'Éles berendezésen a lengéspróba veszélyes lehet (kazán, vegyi reaktor): a kör a stabilitás határára kerül. Ilyenkor relés autotune-t vagy nyitott körű ugrásválasz-mérést használnak.',
        formulas: ['ziegler-nichols-keplet'],
        related: ['pid-szabalyozo', 'stabilitas', 'stabilitasi-tartalek', 'holtido', 'p-hatas'] },
      { id: 'anti-windup', term: 'Integrátor-telítődés és anti-windup', en: 'integrator windup, anti-windup', topic: 'pid',
        short: 'Ha a beavatkozó szerv korláton van, az I-tag tovább integrál, ami nagy túllendülést okoz; az anti-windup ezt megakadályozza.',
        visual: awSvg, caption: 'PI-szabályozó (K_P = 4, T_I = 1,5 s) PT1-szakaszon (T = 2 s), a beavatkozó jel legfeljebb 1,25. Telítődés kezelése nélkül az integrátor „felhúzza magát”: kb. 20% túllendülés és kétszer hosszabb beállás.',
        text: 'Minden valódi beavatkozónak van korlátja: a szelep 0 és 100% között nyit, a motor feszültsége korlátos. Nagy alapjelugrásnál a szabályozó telítődik, a kör ilyenkor **nyitott hurokként** működik. Az I-tag azonban ezt nem tudja, és tovább gyűjti a hibát. Mire a kimenet eléri az alapjelet, az integrátorban hatalmas érték van, ezt csak ellentétes előjelű hibával (túllendüléssel) tudja „leépíteni”.\n\nMegoldások:\n\n- **feltételes integrálás** (clamping): telítődéskor, ha a hiba a telítődés irányába hajt, nem integrálunk;\n- **visszaszámolás** (back-calculation): a korlátozott és a számolt u különbségét visszavezetjük az integrátor bemenetére;\n- **inkrementális (sebesség) algoritmus**: a szabályozó a beavatkozó jel változását számolja, és azt korlátozza.',
        example: 'Egy kemence-szabályozó 15 percig telítésben fűt, miközben a hiba átlagosan 50 °C. K_I = 0,02 %/(°C·s) mellett anti-windup nélkül az integrátor `0,02·50·900 = 900%`-nyi beavatkozást gyűjtene. Ezt csak hosszú túlfűtéssel lehetne leépíteni.',
        pitfall: 'Az anti-windup nem csak elméleti finomság: kézi–automata átkapcsolásnál, indításkor és a kör megszakadásakor (pl. érzékelőhiba) is fontos. Ilyenkor a „bumpless” (ugrásmentes) átkapcsolás is gondot igényel.',
        related: ['i-hatas', 'pid-szabalyozo', 'tempomat', 'plc'] },

      /* ----- Digitális szabályozás és alkalmazások ----- */
      { id: 'mintavetelezes', term: 'Mintavételezés és digitális szabályozás', en: 'sampling, digital control', topic: 'digit',
        short: 'A digitális szabályozó a jelet T_s időközönként méri (A/D), kiszámolja a beavatkozást, és a következő mintáig tartja (D/A).',
        prereq: ['lecke:informatika/szamrendszerek', 'digitalis-technika/orajel', 'lecke:informatika/programozas'],
        visual: sampSvg, caption: 'Mintavételezés T_s időközönként, majd nulladrendű tartás: a beavatkozó jel lépcsős. A lépcsőzés átlagosan T_s/2 késést jelent.',
        text: 'A digitális szabályozási ciklus: **mérés (A/D) → számítás → kiadás (D/A vagy PWM) → várakozás a következő mintavételig**. A folytonos PID-ből differenciaegyenlet lesz:\n\n`u_k = K_P·e_k + K_I·T_s·Σe_i + K_D·(e_k − e_(k−1))/T_s`\n\nA tervezés két útja: folytonos szabályozót tervezünk, és **diszkretizáljuk** (Euler, Tustin-módszer), vagy közvetlenül a **z-tartományban** tervezünk (z-transzformáció; ott a stabilitás feltétele, hogy a pólusok az egységkörön belül legyenek).\n\nA mintavételezés **késleltetést** okoz (a tartás miatt átlagosan T_s/2, plusz a számítási idő), ez fázistartalékot fogyaszt. A mintavételi idő ökölszabálya: a domináns időállandó tizede vagy kisebb, illetve a zárt kör sávszélességének 10–30-szorosa.',
        example: 'Egy PT1-szakasz T = 2 s időállandóval: T_s ≤ 0,2 s ajánlott. Egy drón motorszabályozása 1–8 kHz-en, a helyzetszabályozása 250–1000 Hz-en fut; egy épületfűtés szabályozója 1–10 s-onként is elég.',
        pitfall: 'A túl gyors mintavételezés sem jó: a D-tag számításában `(e_k − e_(k−1))/T_s` kis T_s esetén a kvantálási zajt erősíti fel. Az A/D előtt anti-aliasing szűrő kell, különben a zaj alacsony frekvenciás hibának látszik.',
        formulas: ['shannon', 'pid-torveny'],
        related: ['pid-szabalyozo', 'plc', 'holtido', 'd-hatas', 'ketallasu'], models: ['processzor'] },
      { id: 'ketallasu', term: 'Kétállású szabályozás hiszterézissel', en: 'on–off (bang-bang) control with hysteresis', topic: 'digit',
        short: 'A beavatkozó szerv csak BE vagy KI állapotban lehet; a hiszterézis megakadályozza a túl gyakori kapcsolgatást.',
        prereq: ['elektronika/komparator', 'lecke:fiz-alap/hotan'],
        visual: thSvg, caption: 'Termosztát 21 °C alapjellel és ±0,5 °C kapcsolási különbséggel: a hőmérséklet a két kapcsolási pont között ingadozik.',
        text: 'A legegyszerűbb, mégis nagyon elterjedt szabályozás: szobatermosztát, hűtőszekrény, vízforraló, vasaló, bojler. Nem kell hozzá folyamatosan állítható beavatkozó (elég egy relé).\n\nHiszterézis nélkül az alapjel körül a relé a mérési zaj miatt másodpercenként kapcsolgatna (**pergés**), ami tönkreteszi a kontaktusokat, a kompresszort. A **kapcsolási különbség** (hiszterézis) miatt bekapcsolás 20,5 °C-on, kikapcsolás 21,5 °C-on történik.\n\nA kimenet ezért **mindig leng** (állandósult határciklus). A lengés amplitúdója a hiszterézisből és a szakasz holtidejéből adódik, periódusa a fűtési és hűlési sebességtől függ. Kisebb hiszterézis kisebb ingadozást, de gyakoribb kapcsolást jelent.',
        example: 'Ha a szoba fűtéskor 0,25 °C/perc sebességgel melegszik, kikapcsolt fűtésnél 0,1 °C/perc sebességgel hűl, 1 °C-os hiszterézisnél egy fűtési szakasz kb. 4 perc, egy hűlés 10 perc: kb. 14 perces ciklusidő, óránként kb. 4 kapcsolás.',
        pitfall: 'A termosztát „feltekerése” 26 °C-ra nem fűt gyorsabban, ha a kazán kétállású: a fűtés már 21 °C-nál is teljes teljesítménnyel megy. Csak a kikapcsolási pont kerül feljebb, így túlfűtés lesz.',
        related: ['vezerles-szabalyozas', 'plc', 'mintavetelezes', 'holtido', 'zavaras'], models: ['hoszivattyu'] },
      { id: 'plc', term: 'PLC és folyamatirányítás', en: 'programmable logic controller, process control', topic: 'digit',
        short: 'A PLC ipari, ciklikusan futó vezérlő számítógép; a folyamatirányító rendszerek (DCS, SCADA) sok szabályozási kört fognak össze.',
        prereq: ['lecke:informatika/programozas', 'digitalis-technika/logikai-kapu', 'lecke:rendszeruzem/halozatok'],
        text: 'A **PLC** (programozható logikai vezérlő) ipari környezetre (rezgés, por, hőmérséklet) tervezett számítógép, digitális és analóg be/kimenetekkel. Működése **ciklikus**: bemenetek beolvasása → program futtatása → kimenetek frissítése, tipikusan 1–100 ms ciklusidővel. Programozási nyelveit az **IEC 61131-3** szabvány rögzíti: létradiagram (LD), funkcióblokk-diagram (FBD), strukturált szöveg (ST), sorrendi folyamatábra (SFC). A PID-szabályozó itt kész funkcióblokk.\n\nA **folyamatirányítás** szintjei (automatizálási piramis):\n\n- terepszint: érzékelők, beavatkozók;\n- szabályozási szint: PLC-k, szabályozók;\n- felügyeleti szint: **SCADA** (adatgyűjtés, kezelői felület, riasztás), illetve **DCS** (elosztott irányítás, pl. vegyipar, erőmű);\n- vállalati szint: termelésirányítás (MES), ERP.\n\nGyakori szabályozási struktúrák: **kaszkád** (külső kör alapjelet ad a gyors belső körnek, pl. hőmérséklet → gőzáram; drón: pozíció → szög → szögsebesség), **arányszabályozás** (pl. levegő/gáz aránya égőben), előrecsatolás.',
        example: 'Egy vegyipari reaktornál a hőmérséklet-szabályozó (külső kör, lassú) a hűtővíz-áram alapjelét adja a gyors áramlásszabályozónak (belső kör). A belső kör 1 s, a külső 1 perc körüli időállandóval dolgozik: a hűtővíz nyomásingadozását a belső kör kiszabályozza, mielőtt a hőmérsékletre hatna.',
        pitfall: 'A PLC-programban a ciklusidő a szabályozás mintavételi ideje is: ha a PID-blokkot egy lassú programrészben vagy változó időközönként hívják, a hangolás nem a várt módon működik. Ipari hálózatokban (Modbus, Profinet) a kiberbiztonság is komoly kérdés.',
        related: ['mintavetelezes', 'pid-szabalyozo', 'ketallasu', 'vezerles-szabalyozas', 'anti-windup'] },
      { id: 'tempomat', term: 'Tempomat (sebességszabályozás)', en: 'cruise control', topic: 'digit',
        short: 'Járművek sebességszabályozása: a mért sebesség és az alapjel különbsége alapján állítja a hajtás nyomatékát; az emelkedő zavarásként hat.',
        prereq: ['lecke:fizika/newton', 'mechanika/ero'],
        text: 'A szakasz modellje Newton II. törvényéből: `m·v\' = F_hajtás − F_légellenállás − F_gördülés − m·g·sin α`. A sebességváltozás a hajtóerő integrálja, a légellenállás „visszahúzza”, így a munkapont körül jó közelítéssel PT1-tag. Időállandója `T = m/b` (b a linearizált menetellenállási tényező), személyautónál 20–60 s.\n\nA szabályozó jellemzően **PI**: az I-tag biztosítja, hogy hosszú emelkedőn se maradjon le a sebesség. A beavatkozás korlátos (maximális nyomaték, fék), ezért anti-windup kell. Az **adaptív tempomat** (ACC) kaszkád szerkezetű: a radar által mért követési távolságból számol sebesség-alapjelet.\n\nElektromos autóban a motor nyomatéka ms-os időállandóval állítható, és a rekuperáció fékezni is tud, ezért pontosabb szabályozás érhető el.',
        example: 'Egy emelkedő szabályozás nélkül 12 km/h-s sebességcsökkenést okozna. P-szabályozóval, K = 5 hurokerősítéssel a maradó lemaradás `12/(1+5) = 2 km/h`. PI-szabályozóval néhány másodperc után eltűnik.',
        pitfall: 'Lejtőn a tempomat motorféket vagy fékezést igényel: ha a beavatkozó csak gyorsítani tud, a sebesség az alapjel fölé nő, és az I-tag eközben „lefelé” telítődik (windup). Visszaemelkedéskor ez késést okoz.',
        related: ['zavaras', 'i-hatas', 'anti-windup', 'alapjel-hibajel', 'pid-szabalyozo'], models: ['elektromos-auto'] },
      /* ---------- Bővítés: időtartománybeli jellemzők, stabilitásvizsgálat, robusztusság, állapottér ---------- */
      { id: 'ugrasvalasz-jellemzok', term: 'Az ugrásválasz minőségi jellemzői', en: 'step response specifications', topic: 'alap', prereq: ['szabalyozas/pt2-tag', 'szabalyozas/alapjel-hibajel'],
        short: 'A szabályozási kör minőségét az alapjel egységugrására adott válasz néhány számával írjuk le: felfutási idő, csúcsidő, túllendülés, beállási idő és maradó hiba.',
        text: 'A szabályozás követelményeit általában időtartományban fogalmazzuk meg, a zárt kör **egységugrás-válaszán**:\n\n- **Felfutási idő** (t_r): amíg a válasz a végérték 10%-áról 90%-ára nő – a gyorsaság mértéke.\n- **Csúcsidő** (t_p): az első maximumig eltelt idő.\n- **Túllendülés** (M_p): mennyivel lépi túl a válasz a végértéket, százalékban – a lengékenység (csillapítás) mértéke.\n- **Beállási idő** (t_s): amely után a válasz már végleg a végérték ±2%-os (vagy ±5%-os) sávjában marad.\n- **Maradó hiba** (e_∞): az alapjel és a végérték különbsége – a pontosság mértéke.\n\nEgy **domináns komplex póluspárral** (csillapítási tényező ζ, sajátkörfrekvencia ω_n) jellemezhető körre a közelítő összefüggések:\n\n- `M_p = e^(−πζ/√(1−ζ²))`,\n- `t_p = π / (ω_n · √(1 − ζ²))`,\n- `t_s ≈ 4 / (ζ · ω_n)` (2%-os sáv),\n- `t_r ≈ 1,8 / ω_n` (ζ ≈ 0,5 körül).\n\nEbből a **tervezési fordítás**: a túllendülés a ζ-t (a pólusok szögét a negatív valós tengelyhez képest), a beállási idő a `ζ · ω_n` szorzatot (a pólusok valós részét) határozza meg. A követelmények tehát tartományt jelölnek ki a komplex síkon, ahová a zárt kör pólusainak kell kerülniük.\n\nA jellemzők **ellentmondanak egymásnak**: a gyorsabb válasz nagyobb beavatkozó jelet, általában nagyobb túllendülést és kisebb robusztusságot jelent. Fontos kiegészítő szempontok: a beavatkozó jel nagysága (telítés!), a **zavarelhárítás** (amely más átviteli függvényen múlik, mint az alapjelkövetés) és a mérési zajra való érzékenység.',
        formulas: ['tullendules'],
        example: 'Követelmény: legfeljebb 10% túllendülés és 2 s beállási idő. A túllendülésből `ζ ≥ 0,59`, a beállási időből `ζ · ω_n ≥ 2 1/s`. ζ = 0,6 választással `ω_n ≥ 3,33 rad/s`, a pólusok például `−2 ± j2,67`-ben.',
        pitfall: 'A képletek csak tiszta, zérus nélküli PT2-re pontosak. Egy zárt köri zérus (például a PI-szabályozóé) jelentősen megnövelheti a túllendülést, és a holtidő vagy a harmadik, lassú pólus elronthatja a közelítést – ezért a tervet mindig szimulációval ellenőrizni kell.',
        related: ['pt2-tag', 'stabilitas', 'alapjel-hibajel', 'gyokhelygorbe', 'vegertektetel'], tags: ['minőség', 'időtartomány'] },
      { id: 'vegertektetel', term: 'Végértéktétel és a rendszer típusszáma', en: 'final value theorem and system type', topic: 'leiras', prereq: ['szabalyozas/laplace', 'szabalyozas/atviteli-fuggveny', 'analizis/fuggveny-hatarertek'],
        short: 'A végértéktétel az állandósult értéket közvetlenül a Laplace-transzformáltból adja meg; ebből következik, hogy a felnyitott kör integrátorainak száma (a típusszám) határozza meg, milyen alakú alapjelet tud a kör maradó hiba nélkül követni.',
        text: 'A **végértéktétel**: `lim_(t→∞) y(t) = lim_(s→0) s · Y(s)`, feltéve, hogy a végérték létezik (s · Y(s) pólusai mind a bal félsíkon vannak). Az `s → 0` határátmenet a „nagyon lassú”, egyenáramú viselkedésnek felel meg.\n\nEgységnyi negatív visszacsatolású kör hibajele: `E(s) = R(s) / (1 + L(s))`, ahol L a felnyitott kör átviteli függvénye. Írjuk fel L-t így:\n\n`L(s) = K · (…) / (s^N · (…))`,\n\nahol a számláló és nevező többi tényezője s = 0-ban 1. Az **N típusszám** a felnyitott kör tiszta integrátorainak száma.\n\n**Maradó hiba** a tipikus alapjelekre:\n\n- **egységugrás** (R = 1/s): `e_∞ = 1/(1 + K_p)`, ahol `K_p = lim_(s→0) L(s)`. 0-típusnál véges, 1-típustól nulla.\n- **egységnyi sebességugrás, rámpa** (R = 1/s²): `e_∞ = 1/K_v`, `K_v = lim s · L(s)`. 0-típusnál végtelen, 1-típusnál véges, 2-típustól nulla.\n- **parabola** (R = 1/s³): `e_∞ = 1/K_a`, `K_a = lim s² · L(s)`.\n\nAz elv a **belső modell elve** speciális esete: a kör akkor követ egy jelet hiba nélkül, ha a felnyitott kör tartalmazza a jel „generátorát” (ugráshoz egy integrátort, rámpához kettőt, szinuszhoz egy rezonáns tagot).\n\nAz integrátor lehet a szakaszban (például motor pozíciója a sebesség integrálja) vagy a szabályozóban (I-hatás). Minden további integrátor azonban −90° fázistolást jelent, ami rontja a stabilitási tartalékot.\n\nUgyanez a gondolatmenet a **zavarásra**: az állandó zavarást csak akkor hárítja el teljesen a kör, ha a zavarás belépési pontja előtt (a szabályozóban) van integrátor.',
        formulas: ['vegertek', 'marado-hiba'],
        example: '`L(s) = 10 / (s · (s + 2))` egytípusú: ugrásra `e_∞ = 0`. Rámpára `K_v = lim s · L(s) = 10/2 = 5`, így `e_∞ = 0,2`: egy 1 m/s-mal mozgó célt állandósult állapotban 0,2 m lemaradással követ.',
        pitfall: 'A végértéktételt instabil vagy lengő (a képzetes tengelyen pólussal bíró) rendszerre alkalmazva értelmetlen eredményt kapunk – előbb mindig a stabilitást kell ellenőrizni. A típusszám a **felnyitott** körre vonatkozik, nem a zárt körre.',
        related: ['p-hatas', 'i-hatas', 'laplace', 'atviteli-fuggveny', 'ugrasvalasz-jellemzok'], tags: ['pontosság', 'Laplace'] },

      { id: 'routh-hurwitz', term: 'Routh–Hurwitz-kritérium', en: 'Routh–Hurwitz stability criterion', topic: 'stab', prereq: ['szabalyozas/stabilitas', 'linearis-algebra/determinans'],
        short: 'Algebrai eljárás, amely a karakterisztikus polinom együtthatóiból – a gyökök kiszámítása nélkül – eldönti, hány gyök van a jobb félsíkon, így paraméterfüggő stabilitási tartományok is meghatározhatók.',
        text: 'Egy zárt kör stabil, ha a karakterisztikus polinom `a_n · s^n + a_(n−1) · s^(n−1) + … + a_0` minden gyöke negatív valós részű. Magas fokszámnál a gyököket nem lehet zárt alakban kiszámítani, és ha egy paraméter (például erősítés) betűként szerepel, numerikusan sem kényelmes. Routh (1877) és Hurwitz (1895) módszere ezt kerüli meg.\n\n**Szükséges feltétel:** minden együttható létezik (nem nulla) és azonos előjelű. Másod- és elsőfokú polinomra ez elégséges is.\n\n**A Routh-táblázat:**\n\n1. Az első sorba a páros, a másodikba a páratlan indexű együtthatók kerülnek (a legmagasabb fokútól kezdve).\n2. Minden további elem a fölötte lévő két sor elemeiből számított 2×2-es „kereszt-determináns” osztva az előző sor első elemével: `b_1 = (a_(n−1) · a_(n−2) − a_n · a_(n−3)) / a_(n−1)`, és így tovább.\n3. Összesen n + 1 sor lesz.\n\n**Kritérium:** a jobb félsíkú gyökök száma egyenlő az **első oszlop előjelváltásainak számával**. A rendszer akkor és csak akkor stabil, ha az első oszlop minden eleme pozitív.\n\n**Különleges esetek:** ha az első oszlopban nulla jelenik meg, kis ε-nal helyettesítjük; ha egy teljes sor nulla, a polinomnak a tengelyre szimmetrikus gyökpárjai vannak (például a képzetes tengelyen – ez a **stabilitás határa**), ilyenkor az előző sorból képzett segédpolinom deriváltjával folytatjuk.\n\nA módszer különösen arra jó, hogy egy **paraméter stabilitási tartományát** határozzuk meg, és megkapjuk a határon a lengés frekvenciáját (a segédpolinom gyökeiből) – ez a Ziegler–Nichols-féle kritikus erősítés analitikus megfelelője.',
        example: 'Karakterisztikus egyenlet: `s³ + 2s² + 3s + K = 0`. Routh-táblázat: s³: 1, 3; s²: 2, K; s¹: (6 − K)/2; s⁰: K. Stabil, ha `0 < K < 6`. K = 6-nál a segédpolinom `2s² + 6 = 0`, a kör `ω = √3 ≈ 1,73 rad/s`-mal leng.',
        pitfall: 'A kritérium csak polinomra érvényes: holtidős (`e^(−sθ)`) tagot tartalmazó kört csak közelítéssel (Padé) lehet így vizsgálni – a Nyquist-kritérium a holtidőt pontosan kezeli. A Routh-kritérium csak a stabil/instabil kérdésre felel, a stabilitási **tartalékról** nem mond semmit.',
        related: ['stabilitas', 'nyquist', 'gyokhelygorbe', 'ziegler-nichols'], tags: ['stabilitás', 'algebra'] },
      { id: 'gyokhelygorbe', term: 'Gyökhelygörbe (root locus)', en: 'root locus', topic: 'stab', prereq: ['szabalyozas/stabilitas', 'szabalyozas/atviteli-fuggveny'],
        short: 'A zárt kör pólusainak pályája a komplex síkon, miközben egy paraméter – jellemzően a hurokerősítés K – nulláról végtelenig változik; szerkesztési szabályai alapján kézzel is vázolható, és szemléletes tervezést tesz lehetővé.',
        text: 'Egységnyi visszacsatolásnál a zárt kör pólusai az `1 + K · G(s) = 0` egyenlet gyökei, ahol `G(s) = Z(s)/P(s)` m zérussal és n pólussal. Egy s pont akkor van a görbén, ha `G(s)` **fázisa ±180°** (szögfeltétel); az ott szükséges erősítést az abszolútérték-feltétel adja: `K = 1/|G(s)|`.\n\nW. R. Evans (1948) szerkesztési szabályai:\n\n1. A görbe n ágból áll; az ágak K = 0-nál a felnyitott kör **pólusaiból indulnak**, és K → ∞ esetén a **zérusokba** vagy a végtelenbe tartanak.\n2. A valós tengely egy pontja akkor tartozik a görbéhez, ha tőle jobbra a valós pólusok és zérusok száma **páratlan**.\n3. A végtelenbe tartó n − m ág **aszimptotái** a valós tengellyel `(2k + 1) · 180° / (n − m)` szöget zárnak be, és a `σ_a = (Σ pólusok − Σ zérusok) / (n − m)` pontból indulnak.\n4. Kiválási és becsatlakozási pontok a valós tengelyen: `dK/ds = 0`.\n5. A görbe a valós tengelyre szimmetrikus; a képzetes tengely metszéspontjai (a stabilitás határa) a Routh-táblázatból is kiszámíthatók.\n\n**Tervezési használat:** az ugrásválasz-követelményekből kijelöljük a komplex sík kívánt tartományát (ζ- és beállási idő-feltétel), és megnézzük, átmegy-e rajta a görbe. Ha nem, **kompenzálóval** (szabályozóval) új pólusokat és zérusokat adunk a hurokhoz: egy bal félsíkú zérus (PD-, lead-tag) maga felé „húzza” a görbét, így stabilizál és gyorsít; az origó közelében elhelyezett pólus–zérus pár (PI-, lag-tag) a dinamikát alig változtatja, de növeli a statikus erősítést.\n\nA módszer megmutatja, hogyan **mozdulnak** a pólusok a paraméter változtatásakor – ez szemléletesebb, mint egyetlen erősítéshez tartozó pólusok kiszámítása.',
        example: '`G(s) = 1/(s · (s + 2))`. A pólusok 0-ban és −2-ben, zérus nincs. A karakterisztikus egyenlet `s² + 2s + K = 0`, gyökei `−1 ± √(1 − K)`. 0 < K < 1: két valós pólus (−1 felé közelednek); K = 1: kiválási pont −1-ben; K > 1: a görbe függőlegesen halad a `Re = −1` egyenesen. ζ = 0,707-hez (45°-os egyenes) K = 2 tartozik: pólusok `−1 ± j`.',
        pitfall: 'A gyökhelygörbe a pólusokat mutatja, a zérusokat nem: a zárt kör zérusai a felnyitott kör zérusai, és ezek a válasz alakját (túllendülést) jelentősen befolyásolhatják. Holtidős rendszerre a klasszikus szerkesztési szabályok nem érvényesek.',
        related: ['stabilitas', 'routh-hurwitz', 'ugrasvalasz-jellemzok', 'pid-szabalyozo', 'allapotvisszacsatolas'], tags: ['stabilitás', 'tervezés'] },
      { id: 'robusztussag', term: 'Robusztusság és érzékenységi függvény', en: 'robustness and sensitivity function', topic: 'stab', prereq: ['szabalyozas/stabilitasi-tartalek', 'szabalyozas/nyquist'],
        short: 'A robusztusság azt jelenti, hogy a szabályozási kör a modell pontatlansága és a szakasz paramétereinek megváltozása mellett is stabil marad és elfogadható minőségű; mérőszáma az érzékenységi függvény legnagyobb értéke, M_s.',
        text: 'Minden modell közelítés: a szakasz erősítése, időállandói, holtideje változik a munkaponttal, az öregedéssel, a terheléssel, és a nagyfrekvenciás dinamika rendszerint ismeretlen. A tervezésnek ezért nemcsak a névleges modellre kell jónak lennie.\n\nAz alapvető átviteli függvények (L a felnyitott kör):\n\n- **érzékenységi függvény:** `S = 1/(1 + L)` – ez viszi át a kimeneti zavarást a kimenetre, és ez adja a zárt kör relatív érzékenységét a szakasz relatív megváltozására;\n- **komplementer érzékenység:** `T = L/(1 + L)` – az alapjelkövetés és a mérési zaj átvitele.\n\nMinden frekvencián `S + T = 1`: nem lehet mindkettő egyszerre kicsi. Kis frekvencián S-t akarjuk kicsinek (zavarelhárítás, pontosság), nagy frekvencián T-t (zajelnyomás, robusztusság a modellezetlen dinamikával szemben).\n\n**Robusztussági mérték:** `M_s = max_ω |S(jω)|`. Geometriailag `1/M_s` a Nyquist-görbe **legkisebb távolsága a −1 ponttól** – egyetlen számban fogja össze az erősítés- és a fázistartalékot. Belőle garantált tartalékok következnek:\n\n- erősítéstartalék `≥ M_s / (M_s − 1)`,\n- fázistartalék `≥ 2 · arcsin(1/(2M_s))`.\n\nJellemző tervezési érték: M_s = 1,2…2 (kisebb = robusztusabb, de lassabb).\n\n**Alapvető korlátok** (fizikai „megmaradási törvény”): a Bode-féle érzékenységi integrál szerint stabil felnyitott körre (legalább kettővel nagyobb nevezőfokszámmal) `∫ ln|S(jω)| dω = 0` – ha valahol csökkentjük az érzékenységet, máshol nőnie kell (**vízágy-hatás**). A holtidő és a jobb félsíkú zérusok tovább szűkítik az elérhető sávszélességet.\n\nA modern robusztus szabályozás (H∞-tervezés, μ-analízis) ezeket a korlátokat frekvenciafüggő súlyokkal, optimalizálással kezeli.',
        example: 'Ha M_s = 2, a Nyquist-görbe legalább 0,5 távolságra kerüli a −1 pontot, így garantáltan `GM ≥ 2` (6 dB) és `PM ≥ 2 · arcsin(0,25) ≈ 29°`. M_s = 1,4 esetén `GM ≥ 3,5` (≈ 11 dB) és `PM ≥ 41°`.',
        pitfall: 'A jó fázis- és erősítéstartalék külön-külön nem garantál robusztusságot: a Nyquist-görbe a két mérési pont között is megközelítheti a −1 pontot. A modell bizonytalanságát a tervezésben explicit figyelembe kell venni, nem a névleges modellt kell „tökéletesen” szabályozni.',
        related: ['stabilitasi-tartalek', 'nyquist', 'bode-diagram', 'zavaras', 'imc-hangolas'], tags: ['robusztusság', 'frekvenciatartomány'] },

      { id: 'kaszkad', term: 'Kaszkádszabályozás', en: 'cascade control', topic: 'pid', prereq: ['szabalyozas/pid-szabalyozo', 'szabalyozas/zavaras'],
        short: 'Egymásba ágyazott szabályozási körök: a külső (fő) szabályozó kimenete a belső (segéd) szabályozó alapjele; a gyors belső kör a hozzá közel belépő zavarásokat még azelőtt elhárítja, hogy a fő szabályozott jellemzőre hatnának.',
        text: 'Ha a szakaszon belül van egy **mérhető közbenső jellemző**, amely gyorsabban reagál a beavatkozásra, mint a fő szabályozott jellemző, akkor érdemes rá külön kört zárni.\n\n**Felépítés:** a külső szabályozó (például hőmérséklet) a hibajeléből nem közvetlenül a beavatkozó szervet állítja, hanem a belső kör alapjelét (például a fűtőgőz áramlását). A belső szabályozó gondoskodik róla, hogy ez az érték ténylegesen beálljon.\n\n**Előnyök:**\n\n1. A belső körbe belépő zavarásokat (például a gőznyomás ingadozását) a belső szabályozó gyorsan elhárítja, a külső jellemző alig érzi meg.\n2. A belső kör „linearizálja” és gyorsítja a szakaszt: a szelep nemlinearitása, hiszterézise, a paraméterek változása a belső körön belül marad.\n3. A belső jellemző **korlátozható** (például a motoráram vagy a gyorsulás), ami védelmet és jobb telítéskezelést ad.\n\n**Hangolási szabályok:**\n\n- a belső kör legyen lényegesen (jellemzően 3–10-szer) **gyorsabb**, mint a külső;\n- először a belső kört hangoljuk (a külső kör nyitva, kézi üzemben), majd a belső zárt kört a külső kör szakaszának részeként kezelve hangoljuk a külsőt;\n- a belső szabályozó gyakran elég P vagy PI, a külső jellemzően PI vagy PID;\n- anti-windup: ha a belső kör telítődik, a külső szabályozó integrátorát is meg kell állítani.\n\n**Klasszikus példa – villamos hajtás:** pozíció → sebesség → áram (nyomaték) háromszintű kaszkád; a legbelső áramszabályozó a leggyorsabb, és egyben áramkorlátot is ad. Hasonlóan: kazán dob-vízszint és tápvízáram, reaktorhőmérséklet és köpenyhőmérséklet.',
        example: 'Szobahőmérséklet-szabályozás padlófűtéssel: a fő jellemző a szobahőmérséklet (időállandója órák), a segédjellemző az előremenő víz hőmérséklete (percek). Ha a kazán teljesítménye ingadozik, a belső kör néhány perc alatt korrigál, a szoba ebből semmit nem vesz észre.',
        pitfall: 'Ha a belső kör nem elég gyors a külsőhöz képest, a két kör egymás ellen dolgozik, és a rendszer lengésbe jöhet. Kaszkád csak akkor ér valamit, ha a belső jellemző valóban mérhető és a zavarások jelentős része a belső körbe lép be.',
        related: ['pid-szabalyozo', 'zavaras', 'elorecsatolas', 'anti-windup', 'tempomat'], tags: ['szabályozási struktúra', 'zavarelhárítás'] },
      { id: 'elorecsatolas', term: 'Előrecsatolás (zavarkompenzáció és alapjel-előrecsatolás)', en: 'feedforward control', topic: 'pid', prereq: ['szabalyozas/zavaras', 'szabalyozas/atviteli-fuggveny', 'szabalyozas/vezerles-szabalyozas'],
        short: 'Olyan vezérlési ág, amely a mért zavarásból vagy az alapjelből – a hibajel megvárása nélkül – modell alapján előre kiszámítja a szükséges beavatkozást; a visszacsatolással kombinálva gyorsabb és pontosabb, és nem befolyásolja a kör stabilitását.',
        text: 'A visszacsatolás csak a már kialakult hibára reagál – az előrecsatolás megelőzi a hibát. Két fajtája:\n\n**1. Zavarás-előrecsatolás.** Ha a zavarás (d) mérhető, és ismerjük, hogyan hat a kimenetre (`G_d(s)`) és hogyan hat a beavatkozás (`G_p(s)`), akkor az\n\n`u_ff = −(G_d / G_p) · d`\n\nbeavatkozás elméletileg teljesen kioltja a zavarás hatását. A gyakorlatban `G_d/G_p` gyakran nem valósítható meg pontosan (holtidő, nem megfordítható dinamika), ezért **statikus** (`−G_d(0)/G_p(0)`) vagy egyszerű lead–lag közelítést használnak. A maradék hibát a visszacsatolás javítja.\n\n**2. Alapjel-előrecsatolás.** Az alapjel változásához szükséges beavatkozást előre kiadjuk (ideálisan `u_ff = G_p⁻¹ · r`), így a visszacsatoló szabályozónak csak a modellhibát kell korrigálnia. Mozgásvezérlésben például az előírt gyorsulásból a szükséges nyomaték (`M = J · α`), a sebességből a súrlódás kompenzálása. A „kétszabadságfokú” szabályozó ugyanígy választja szét az alapjelkövetés és a zavarelhárítás tervezését.\n\n**Fontos tulajdonság:** az előrecsatolás nem része a zárt huroknak, ezért **nem változtatja meg a kör pólusait és stabilitását** – csak a válasz minőségét. Egy pontatlan előrecsatolás rontja a teljesítményt, de nem okoz instabilitást.\n\n**Mikor érdemes?** Ha a zavarás mérhető, nagy és gyakori; ha a szakasz lassú (nagy holtidő) és a visszacsatolás önmagában késve reagálna; ha a pályakövetés pontossága fontos.',
        example: 'Hőcserélő: a kimenő hőmérséklet a fűtőgőztől (`G_p = 2/(10s + 1)`) és a bejövő folyadék hőmérsékletétől (`G_d = 0,5/(10s + 1)`) függ. A statikus előrecsatolás `u_ff = −0,5/2 · d = −0,25 · d`: ha a bejövő folyadék 4 °C-kal melegebb, azonnal 1 egységgel csökkentjük a gőzt. Mivel a két dinamika azonos, itt ez dinamikusan is pontos kompenzáció.',
        pitfall: 'Előrecsatolás visszacsatolás nélkül csak vezérlés: modellhiba és nem mért zavarás esetén maradó hiba lesz. Mérési zajos zavarásjelet közvetlenül előrecsatolva a beavatkozó jel is zajos lesz – szűrés kell.',
        related: ['zavaras', 'vezerles-szabalyozas', 'kaszkad', 'pid-szabalyozo', 'tempomat'], tags: ['szabályozási struktúra', 'modell'] },
      { id: 'imc-hangolas', term: 'Modellalapú PID-hangolás (IMC, lambda, SIMC) és relés önhangolás', en: 'model-based PID tuning (IMC, lambda, SIMC) and relay autotuning', topic: 'pid', prereq: ['szabalyozas/ziegler-nichols', 'szabalyozas/pt1-tag', 'szabalyozas/holtido'],
        short: 'Hangolási eljárások, amelyek a szakasz egyszerű modelljéből (statikus erősítés, időállandó, holtidő) egyetlen, szemléletes paraméterrel – a kívánt zárt köri időállandóval – adják meg a PI(D) beállításokat; a modell paraméterei relés kísérlettel automatikusan is meghatározhatók.',
        text: 'A Ziegler–Nichols-szabályok (1942) gyorsak, de lengékeny, kis robusztusságú beállítást adnak. A **belső modell elvén (IMC)** alapuló módszerek ehelyett a kívánt zárt köri viselkedést írják elő.\n\n**1. Modellillesztés:** sok ipari szakasz jól közelíthető **holtidős PT1** modellel: `G(s) = k · e^(−θs) / (τ_1 · s + 1)` – egy ugrásválasz-kísérletből k (végérték/ugrás), θ (a válasz kezdetéig eltelt idő) és τ_1 (a 63%-os értékig további idő) leolvasható.\n\n**2. Lambda (IMC) hangolás PI-re:** `K_c = τ_1 / (k · (λ + θ))`, `T_I = τ_1`. A **λ** a kívánt zárt köri időállandó: nagy λ lassú, nagyon robusztus, kis λ gyors, de érzékeny kör. Szemléletes, és a kezelő is érti, mit állít.\n\n**3. SIMC-szabály** (Skogestad): ugyanez `T_I = min(τ_1, 4 · (τ_c + θ))` módosítással, amely a lassú, közel integráló szakaszoknál javítja a zavarelhárítást. Ajánlott kiindulás: `τ_c = θ` – ez jó egyensúly a gyorsaság és a robusztusság (M_s ≈ 1,6–1,7) között.\n\nA közös tanulság: **a holtidő szabja meg az elérhető sebességet**. A zárt kör nem lehet lényegesen gyorsabb, mint a holtidő.\n\n**4. Relés önhangolás** (Åström és Hägglund): a szabályozót ideiglenesen egy ±d amplitúdójú relé (kétállású kapcsoló) helyettesíti. A kör stabil határciklusba kerül, amelynek frekvenciája közel a –180°-os fázisú frekvencia. Az a lengésamplitúdóból és a T_u periódusból a kritikus erősítés **leíró függvény** közelítéssel: `K_u ≈ 4d / (π · a)`. Ebből Ziegler–Nichols-típusú vagy finomabb szabályokkal adódik a beállítás. Előnye, hogy szabályozott körülmények között, korlátozott amplitúdóval, a kör instabilitásba vitele nélkül fut – ezért sok ipari szabályozó „autotune” funkciója így működik.',
        formulas: ['simc'],
        example: 'Ugrásválasz-kísérlet: a beavatkozó jelet 10%-kal emeljük, a kimenet 20%-kal nő (k = 2), 2 s után kezd mozogni (θ = 2 s), és további 10 s alatt éri el a változás 63%-át (τ_1 = 10 s). λ = 2 s választással: `K_c = 10 / (2 · 4) = 1,25`, `T_I = 10 s`. Relés kísérletben d = 5% reléamplitúdónál a = 2% lengés: `K_u ≈ 20 / (π · 2) ≈ 3,2`.',
        pitfall: 'A holtidős PT1 modell csak közelítés: lengő vagy integráló szakaszra más modell és más szabály kell. Ha az ugrásválasz-kísérlet közben zavarás éri a folyamatot, a modell – és vele a hangolás – hibás lesz; a kísérletet nyugodt üzemben, többször kell elvégezni.',
        related: ['ziegler-nichols', 'pid-szabalyozo', 'pt1-tag', 'holtido', 'robusztussag'], tags: ['hangolás', 'ipari gyakorlat'] },

      { id: 'z-transzformacio', term: 'Z-transzformáció', en: 'Z-transform', topic: 'digit', prereq: ['szabalyozas/mintavetelezes', 'szabalyozas/laplace', 'analizis/hatvanysor'],
        short: 'A mintavételezett (diszkrét idejű) jelek és rendszerek „Laplace-transzformációja”: egy x[k] mintasorozathoz a X(z) = Σ x[k] · z^(−k) függvényt rendeli, amelyben z⁻¹ egy mintavételnyi késleltetést jelent.',
        text: 'Definíció (egyoldalú): `X(z) = Σ_(k=0)^∞ x[k] · z^(−k)`. A kapcsolat a folytonos idővel: a mintavételezett jel Laplace-transzformáltjában `z = e^(sT)`.\n\n**Legfontosabb tulajdonságok:**\n\n- linearitás;\n- **eltolási tétel:** `x[k − 1] ↔ z⁻¹ · X(z)` (nulla kezdeti feltétel mellett) – ezért a **differenciaegyenletek** (a digitális szabályozó programja) algebrai egyenletekké válnak, mint a Laplace-nál a differenciálegyenletek;\n- konvolúció → szorzat, tehát létezik **diszkrét átviteli függvény**: `G(z) = Y(z)/U(z)`;\n- végértéktétel: `lim x[k] = lim_(z→1) (z − 1) · X(z)`.\n\nNéhány transzformáltpár: egységimpulzus → 1; egységugrás → `z/(z − 1)`; `a^k` → `z/(z − a)`.\n\n**Stabilitás:** az `s = σ + jω` sík bal fele a `z = e^(sT)` leképezéssel az **egységkör belsejébe** kerül. A diszkrét rendszer stabil, ha minden pólusa az egységkörön belül van (`|z| < 1`). A pólus helye és a viselkedés kapcsolata: pozitív valós pólus a (0, 1) szakaszon → exponenciális lecsengés; negatív valós pólus → minden lépésben előjelet váltó „csengés” (ennek nincs folytonos megfelelője); a körhöz közeli pólus → lassú; az origóban lévő pólus → egy lépésnyi késleltetés (véges beállás, „deadbeat”).\n\n**Gyakorlati jelentősége:** egy átviteli függvényből közvetlenül kódolható algoritmus lesz: `Y(z)(1 − a z⁻¹) = b z⁻¹ U(z)` ↔ `y[k] = a · y[k−1] + b · u[k−1]`.',
        example: 'PT1-szakasz (τ = 1 s) nulladrendű tartóval, T = 0,1 s mintavétellel pontosan: `y[k] = 0,905 · y[k−1] + 0,095 · u[k−1]`, mert `a = e^(−T/τ) = e^(−0,1) ≈ 0,905`. A diszkrét pólus z = 0,905, az egységkörön belül: stabil.',
        pitfall: 'A z-tartománybeli pólusok helyét nem szabad az s-sík szabályaival értelmezni: a z = 0,9 pólus stabil, a z = 1,1 instabil, a z = −0,5 stabil, de előjelváltó. A diszkrét átviteli függvény a mintavételi időtől függ: ugyanaz a szakasz más T-vel más G(z)-t ad.',
        related: ['mintavetelezes', 'laplace', 'diszkretizalas', 'stabilitas', 'atviteli-fuggveny'], tags: ['diszkrét idő', 'transzformáció'] },
      { id: 'diszkretizalas', term: 'Diszkretizálás: folytonos szabályozó digitális megvalósítása', en: 'discretization of continuous controllers', topic: 'digit', prereq: ['szabalyozas/z-transzformacio', 'szabalyozas/pid-szabalyozo', 'analizis/riemann-integral'],
        short: 'Eljárások, amelyekkel egy folytonos időben tervezett szabályozó (például PID) differenciaegyenletté, azaz programmá alakítható: Euler-, Tustin- és tartószerv-ekvivalens módszer; a választás és a mintavételi idő a pontosságot és a stabilitást is befolyásolja.',
        text: 'A szabályozókat gyakran folytonos időben tervezzük, majd mikrovezérlőn, PLC-n valósítjuk meg. Ehhez a deriválást és integrálást mintavételes közelítéssel kell helyettesíteni:\n\n- **előre Euler:** `s ≈ (z − 1)/T` (téglalapszabály, az integrál a régi mintából): egyszerű, de egy stabil folytonos rendszert **instabillá** tehet, ha T nem elég kicsi.\n- **hátra Euler:** `s ≈ (z − 1)/(T · z)`: mindig stabil leképezés, de csillapítóbb, mint az eredeti.\n- **Tustin (bilineáris, trapézszabály):** `s ≈ (2/T) · (z − 1)/(z + 1)`: a bal félsíkot pontosan az egységkörbe képezi, a frekvenciamenet jó, csak a Nyquist-frekvencia közelében torzul (előtorzítással egy kiválasztott frekvencián pontosítható).\n- **Tartószerv-ekvivalens (ZOH):** a szakasz diszkretizálására a természetes választás, mert pontosan azt írja le, ami történik: a D/A-átalakító a beavatkozó jelet a következő mintáig tartja.\n- **Pólus–zérus illesztés:** minden pólust és zérust `z = e^(sT)` szerint képez le.\n\n**Diszkrét PID** (párhuzamos alak, hátra Euler az I-re, szűrt D):\n\n`u[k] = K_P · e[k] + K_I · T · Σ e[i] + K_D · (e[k] − e[k−1]) / T`.\n\nA **sebességalak** (inkrementális alak) csak a változást számolja: `Δu[k] = u[k] − u[k−1]`; ez egyszerűsíti a kézi–automatikus átkapcsolást és az anti-windupot.\n\n**A mintavételi idő megválasztása:** ökölszabályként a zárt kör sávszélességének 10–30-szorosa, illetve a domináns időállandó tizede–huszada. Túl nagy T: a nulladrendű tartás kb. T/2 effektív holtidőt visz a körbe, ami fázistartalékot fogyaszt. Túl kicsi T: a D-tag a kvantálási zajt erősíti, és a numerikus pontosság romlik (a pólusok z = 1-hez tolódnak).\n\nMinden esetben szükséges az A/D előtti **antialiasing szűrő**, és a D-tag mindig **szűrt** legyen.',
        formulas: ['tustin'],
        example: 'PI-szabályozó: K_P = 2, T_I = 5 s, T = 0,1 s. Hátra Euler-rel az integrátor: `I[k] = I[k−1] + (K_P/T_I) · T · e[k] = I[k−1] + 0,04 · e[k]`, és `u[k] = 2 · e[k] + I[k]`. Ha a zárt kör sávszélessége kb. 0,5 rad/s, a 0,1 s-os mintavétel (≈ 63 rad/s mintavételi körfrekvencia) bőven megfelelő.',
        pitfall: 'Gyakori programozási hiba, hogy a mintavételi idő nem állandó (a szabályozó egy változó hosszúságú főciklusban fut): ilyenkor az I- és D-tag erősítése is ingadozik. A szabályozót időzítő-megszakításból, rögzített T-vel kell futtatni.',
        related: ['z-transzformacio', 'mintavetelezes', 'pid-szabalyozo', 'anti-windup', 'holtido'], tags: ['digitális szabályozás', 'megvalósítás'] },

      { id: 'allapotter', term: 'Állapottér-modell', en: 'state-space model', topic: 'allapot', prereq: ['szabalyozas/differencialegyenlet', 'linearis-algebra/matrixszorzas', 'linearis-algebra/sajatertek'],
        short: 'A dinamikus rendszer leírása elsőrendű differenciálegyenletek rendszerével, az állapotváltozók vektorával: ẋ = A·x + B·u, y = C·x + D·u; több bemenetű, több kimenetű és nemlineáris rendszerekre is természetesen alkalmazható.',
        text: 'Az **állapot** az a legkisebb adathalmaz, amely a jelenben ismert bemenettel együtt egyértelműen meghatározza a rendszer jövőbeli viselkedését – vagyis a rendszer „memóriája”. Fizikailag jellemzően az energiatárolók változói: tömegek sebessége és helyzete, kondenzátorok feszültsége, tekercsek árama, tartályok szintje. Egy n-edrendű differenciálegyenlet mindig átírható n elsőrendű egyenletre.\n\n**Lineáris, időinvariáns alak:**\n\n`ẋ = A · x + B · u`, `y = C · x + D · u`.\n\nKapcsolat az átviteli függvénnyel: `G(s) = C · (sI − A)⁻¹ · B + D`. A karakterisztikus polinom `det(sI − A)`, így a **pólusok A sajátértékei**. A megoldás: `x(t) = e^(At) · x(0) + ∫ e^(A(t−τ)) · B · u(τ) dτ`, ahol `e^(At)` a mátrixexponenciális (az állapotátmeneti mátrix).\n\n**Miért jobb, mint az átviteli függvény?**\n\n- több bemenet és kimenet (MIMO) egyetlen keretben;\n- kezdeti feltételek közvetlenül szerepelnek;\n- a belső viselkedés is látszik (nem csak a be–ki kapcsolat), így kiderül, ha egy instabil belső mód a kimeneten „nem látszik”;\n- nemlineáris rendszer: `ẋ = f(x, u)`, amely egy munkapont körül **linearizálható** (A és B a Jacobi-mátrixok);\n- közvetlen alapja az állapot-visszacsatolásnak, a megfigyelőknek, az optimális szabályozásnak (LQR) és a Kálmán-szűrőnek;\n- numerikusan jól kezelhető, mintavételesen `x[k+1] = Φ · x[k] + Γ · u[k]`.\n\nAz állapottér-leírás nem egyértelmű: bármely invertálható T mátrixszal `x = T · z` új, egyenértékű modellt ad (például szabályozható vagy megfigyelhető kanonikus alakot), a sajátértékek viszont változatlanok.',
        formulas: ['allapotegyenlet'],
        example: 'Egyenáramú motor: állapotok az armatúraáram (i) és a szögsebesség (ω), bemenet a kapocsfeszültség. `L · di/dt = −R · i − k · ω + u`, `J · dω/dt = k · i − b · ω`. Így `A = [[−R/L, −k/L], [k/J, −b/J]]`, `B = [1/L; 0]`, és ha a sebességet mérjük, `C = [0, 1]`.',
        pitfall: 'Az állapotváltozók nem feltétlenül mérhetők, és nem is kell, hogy fizikailag szemléletesek legyenek. Az átviteli függvényből számolt állapottér-modell a pólus–zérus kiejtések miatt kevesebb állapotot tartalmazhat, mint a valódi rendszer – a „rejtett” módok így elveszhetnek.',
        related: ['differencialegyenlet', 'atviteli-fuggveny', 'stabilitas', 'iranyithatosag', 'allapotvisszacsatolas', 'allapotmegfigyelo'], tags: ['modell', 'lineáris algebra'] },
      { id: 'iranyithatosag', term: 'Irányíthatóság és megfigyelhetőség', en: 'controllability and observability', topic: 'allapot', prereq: ['szabalyozas/allapotter', 'linearis-algebra/rang'],
        short: 'Egy rendszer irányítható, ha a bemenettel bármely kezdeti állapotból bármely állapotba véges idő alatt eljuttatható; megfigyelhető, ha a kimenet és a bemenet véges ideig tartó méréséből a kezdeti állapot egyértelműen meghatározható.',
        text: 'Kálmán Rudolf (1960) két alapfogalma az állapottér-módszerek alapkövei.\n\n**Irányíthatóság (szabályozhatóság).** Kalman-féle rangfeltétel n-edrendű rendszerre:\n\n`rang [B, AB, A²B, …, A^(n−1)B] = n`.\n\nHa a rang kisebb, van olyan állapotirány (mód), amelyre a bemenet semmilyen módon nem hat. Ha ez a mód instabil, a rendszer semmilyen szabályozóval nem stabilizálható; ha stabil, a rendszer **stabilizálható**, de azt a módot nem tudjuk gyorsítani.\n\n**Megfigyelhetőség.** Rangfeltétel:\n\n`rang [C; CA; CA²; …; CA^(n−1)] = n` (a mátrixok egymás alá írva).\n\nHa nem teljesül, van olyan belső mozgás, amely a kimeneten nem látszik. Ha ez instabil, a mérések alapján nem vehető észre, mielőtt baj lenne (**detektálhatóság** a gyengébb feltétel: minden nem megfigyelhető mód stabil).\n\n**Dualitás:** (A, B) irányíthatósága ugyanaz a matematikai feltétel, mint (Aᵀ, Bᵀ) megfigyelhetősége – ezért az állapot-visszacsatolás és a megfigyelő tervezése ugyanaz a feladat.\n\n**Kapcsolat az átviteli függvénnyel:** egy irányítható és megfigyelhető állapottér-modell **minimális realizáció**: az átviteli függvény nevezőjének fokszáma egyenlő az állapotok számával. Ha az átviteli függvény számításakor egy pólus és egy zérus kiejti egymást, az egy nem irányítható vagy nem megfigyelhető módot jelez – a pólus nem tűnt el, csak a be–ki kapcsolatból nem látszik.\n\n**Gyakorlati jelentés:** van-e elég beavatkozó szerv és jó helyen (irányíthatóság), van-e elég érzékelő és jó helyen (megfigyelhetőség). A rangfeltétel igen/nem választ ad; a gyakorlatban a „majdnem nem irányítható” eset (rosszul kondicionált mátrix) is gond, mert óriási beavatkozó jelet igényelne.',
        example: '`A = [[−1, 0], [0, 2]]`, `B = [1; 0]`: `[B, AB] = [[1, −1], [0, 0]]`, rangja 1 < 2 – a második, **instabil** állapotra (sajátérték +2) a bemenet nem hat, a rendszer nem stabilizálható. Ha `B = [1; 1]`: `[B, AB] = [[1, −1], [1, 2]]`, determinánsa 3 ≠ 0, a rendszer irányítható.',
        pitfall: 'Egy stabilnak látszó átviteli függvény mögött is lehet instabil belső mód, ha egy instabil pólust egy zérus kiejt: a kimenet egy darabig rendben van, miközben egy belső jel minden határon túl nő. Instabil pólust zérussal (szabályozóval) „kiejteni” soha nem szabad.',
        related: ['allapotter', 'allapotvisszacsatolas', 'allapotmegfigyelo', 'stabilitas'], tags: ['állapottér', 'Kálmán'] },
      { id: 'allapotvisszacsatolas', term: 'Állapot-visszacsatolás és pólusáthelyezés', en: 'state feedback and pole placement', topic: 'allapot', prereq: ['szabalyozas/iranyithatosag', 'szabalyozas/ugrasvalasz-jellemzok'],
        short: 'Szabályozási módszer, amelyben a beavatkozó jel az összes állapotváltozó súlyozott összege (u = −K·x + N·r); irányítható rendszerben a K erősítésvektor megválasztásával a zárt kör pólusai tetszőleges helyre tehetők.',
        text: 'Ha minden állapot mérhető (vagy becsülhető), a `u = −K · x + N · r` törvénnyel a zárt kör egyenlete:\n\n`ẋ = (A − B · K) · x + B · N · r`.\n\nA zárt kör pólusai tehát az `A − BK` mátrix sajátértékei. **Pólusáthelyezési tétel:** ha (A, B) irányítható, akkor bármely (valós együtthatós polinomhoz tartozó) kívánt pólushalmazhoz létezik ilyen K. Egy bemenet esetén K egyértelmű.\n\n**Tervezés lépései:**\n\n1. A követelményekből (túllendülés, beállási idő) a kívánt domináns pólusok, a többit ezeknél gyorsabbra választjuk.\n2. A kívánt karakterisztikus polinom: `(s − p_1)(s − p_2)…`.\n3. Együttható-összehasonlítás `det(sI − A + BK)`-val, vagy az **Ackermann-képlet**: `K = [0 … 0 1] · M_c⁻¹ · φ(A)`, ahol M_c az irányíthatósági mátrix, φ a kívánt karakterisztikus polinom.\n4. Az N előszűrő-erősítés úgy, hogy a statikus erősítés 1 legyen (`N = −1/(C · (A − BK)⁻¹ · B)`), vagy maradó hiba ellen **integráló állapot** hozzáadása (a hibajel integrálja mint új állapot).\n\n**Hogyan válasszuk a pólusokat?** A túl gyors pólusok nagy erősítést, nagy beavatkozó jelet és zajérzékenységet jelentenek, és a telítés miatt a valóságban nem is érhetők el. Ezt a kompromisszumot rendszerezi az **optimális (LQR) szabályozás**: a `J = ∫ (xᵀQx + uᵀRu) dt` költség minimalizálása – Q az állapothibák, R a beavatkozás „ára” – egy Riccati-egyenlet megoldásaként adja K-t, garantált robusztussági tartalékokkal (teljes állapot-visszacsatolás esetén legalább 60° fázistartalék).\n\nAz állapot-visszacsatolás a PD-szabályozó általánosítása: a magasabb deriváltak helyett a fizikai állapotokat csatolja vissza.',
        example: 'Kettős integrátor (`ÿ = u`, például súrlódásmentes kocsi): `A = [[0, 1], [0, 0]]`, `B = [0; 1]`. `u = −k_1 · x_1 − k_2 · x_2` mellett a karakterisztikus polinom `s² + k_2 · s + k_1`. A `−2 ± j2` pólusokhoz (`s² + 4s + 8`): `k_1 = 8`, `k_2 = 4`. Ez a pozíció és a sebesség visszacsatolása – egy PD-szabályozó.',
        pitfall: 'A módszer minden állapot ismeretét feltételezi; ha nem mérhetők, megfigyelő kell, és a megfigyelővel együtt a garantált robusztusság elveszhet. A pólusok önmagukban nem határozzák meg teljesen a választ – a zérusok és a beavatkozó jel nagysága is számít.',
        related: ['iranyithatosag', 'allapotter', 'allapotmegfigyelo', 'gyokhelygorbe', 'd-hatas'], tags: ['állapottér', 'tervezés'] },
      { id: 'allapotmegfigyelo', term: 'Állapotmegfigyelő (Luenberger-megfigyelő)', en: 'state observer (Luenberger observer)', topic: 'allapot', prereq: ['szabalyozas/iranyithatosag', 'szabalyozas/allapotvisszacsatolas'],
        short: 'Olyan algoritmus, amely a rendszer modelljét a bemenettel párhuzamosan futtatja, és a mért és becsült kimenet különbségével folyamatosan korrigálja, így a nem mért állapotváltozókat is megbecsüli.',
        text: 'Gyakran nem minden állapot mérhető: drága vagy nem létező érzékelő, zajos jel (sebesség a pozíció deriválásával). A **megfigyelő** egy „szoftveres érzékelő” (soft sensor):\n\n`x̂̇ = A · x̂ + B · u + L · (y − C · x̂)`.\n\nAz első két tag a modell szimulációja, a harmadik a **korrekció**: ha a becsült kimenet `C · x̂` eltér a mérttől, az L erősítésmátrix ennek arányában visszahúzza a becslést.\n\nA becslési hiba `e = x − x̂` dinamikája:\n\n`ė = (A − L · C) · e`.\n\nHa a rendszer **megfigyelhető**, az `A − LC` sajátértékei L-lel tetszőlegesen elhelyezhetők (a pólusáthelyezés duális feladata: (Aᵀ, Cᵀ) párra), így a hiba tetszőleges gyorsasággal lecseng, a kezdeti állapot ismerete nélkül is. David Luenberger (1964) nevéhez fűződik.\n\n**A pólusok megválasztása:** a megfigyelő pólusait jellemzően 2–5-ször gyorsabbra választják, mint a szabályozó pólusait, hogy a becslés lépést tartson. Túl gyors megfigyelő viszont a mérési zajt erősíti. Ezt a kompromisszumot optimálisan – a folyamat- és a mérési zaj statisztikája alapján – a **Kálmán-szűrő** oldja meg, amely szerkezetében ugyanilyen megfigyelő, időben változó optimális L-lel.\n\n**Szeparációs elv:** lineáris rendszernél az állapot-visszacsatolás (K) és a megfigyelő (L) egymástól függetlenül tervezhető: a zárt kör pólusai az `A − BK` és az `A − LC` sajátértékeinek uniója. A `u = −K · x̂` szabályozó a megfigyelővel együtt egy dinamikus kimeneti visszacsatolás.\n\nAlkalmazások: villamos hajtások érzékelő nélküli (sensorless) szabályozása – a forgórész helyzetének becslése az áramokból és feszültségekből; akkumulátor töltöttségi állapotának becslése; hibadetektálás (a „maradék” `y − Cx̂` hirtelen megnövekedése hibát jelez).',
        example: 'Kocsi pozíciójának mérése mellett a sebesség becslése (`A = [[0, 1], [0, 0]]`, `C = [1, 0]`): `L = [l_1; l_2]`, a hiba karakterisztikus polinomja `s² + l_1 · s + l_2`. Ha a szabályozó pólusai `−2 ± j2`, a megfigyelőé legyen például `−10, −10`: `s² + 20s + 100` → `l_1 = 20`, `l_2 = 100`.',
        pitfall: 'A megfigyelő csak annyira jó, amennyire a modell: a modellhiba és az ismeretlen, nem modellezett zavarás állandósult becslési hibát okoz (ez ellen a zavarás is felvehető állapotként – zavarásmegfigyelő). A szeparációs elv nem garantálja a robusztusságot.',
        related: ['allapotter', 'iranyithatosag', 'allapotvisszacsatolas', 'elorecsatolas'], tags: ['állapottér', 'becslés'] }
    ]
  });
})();
