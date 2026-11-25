/* Egyetem: Villamosmérnöki alapok – egyenáramú és váltakozó áramú hálózatok, háromfázisú rendszerek, villamos gépek, érintésvédelem. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"';
  var RED = '#e5484d', BLUE = '#2f7bf6', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6';

  function r1(v) { return Math.round(v * 10) / 10; }
  function tx(x, y, s, size, attr) { return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 13) + '" ' + (attr || T) + '>' + s + '</text>'; }
  function mid(attr) { return (attr || T) + ' text-anchor="middle"'; }
  function end(attr) { return (attr || T) + ' text-anchor="end"'; }
  // Alsó index SVG-szövegben: sub('U', 'f') → U_f
  function sub(main, s, rest) { return main + '<tspan font-size="0.75em" dy="4">' + s + '</tspan>' + (rest ? '<tspan dy="-4">' + rest + '</tspan>' : '<tspan dy="-4"></tspan>'); }
  function ln(x1, y1, x2, y2, col, w, extra) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + (col || 'var(--fg-2)') + '" stroke-width="' + (w || 2) + '"' + (extra ? ' ' + extra : '') + '/>';
  }
  function arr(x1, y1, x2, y2, col, w) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 11, s = 5, bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a);
    return ln(x1, y1, bx, by, col, w || 2.5) + '<polygon points="' + r1(x2) + ',' + r1(y2) + ' ' + r1(bx + s * Math.sin(a)) + ',' + r1(by - s * Math.cos(a)) + ' ' + r1(bx - s * Math.sin(a)) + ',' + r1(by + s * Math.cos(a)) + '" fill="' + col + '"/>';
  }
  function path(pts, col, w, extra) {
    return '<path d="' + pts.map(function (p, i) { return (i ? 'L' : 'M') + r1(p[0]) + ' ' + r1(p[1]); }).join(' ') + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2.5) + '"' + (extra ? ' ' + extra : '') + '/>';
  }
  function sample(a, b, n, fn) { var out = []; for (var i = 0; i <= n; i++) out.push(fn(a + (b - a) * i / n)); return out; }
  function dot(x, y, col) { return '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="4" fill="' + (col || 'var(--fg-2)') + '"/>'; }
  function term(x, y) { return '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="5" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2"/>'; }
  var D2R = Math.PI / 180;

  // 1. Fázorábra és a hozzá tartozó időfüggvények
  var phasorSvg = (function () {
    var ox = 110, oy = 125, phU = 35, phI = -15;
    function pol(r, deg) { return [ox + r * Math.cos(deg * D2R), oy - r * Math.sin(deg * D2R)]; }
    var uT = pol(120, phU), iT = pol(85, phI), a0 = pol(42, phI), a1 = pol(42, phU), lb = pol(58, (phU + phI) / 2);
    var s = '<svg viewBox="0 0 560 230">' +
      ln(20, oy, 245, oy, 'var(--muted)', 1.5, 'stroke-dasharray="4 4"') + ln(ox, 215, ox, 20, 'var(--muted)', 1.5, 'stroke-dasharray="4 4"') +
      tx(240, oy + 18, 'Re', 11, M) + tx(ox + 6, 30, 'Im', 11, M) +
      arr(ox, oy, uT[0], uT[1], RED, 3) + arr(ox, oy, iT[0], iT[1], BLUE, 3) +
      '<path d="M' + r1(a0[0]) + ' ' + r1(a0[1]) + ' A42 42 0 0 0 ' + r1(a1[0]) + ' ' + r1(a1[1]) + '" fill="none" stroke="var(--fg-2)" stroke-width="1.5"/>' +
      tx(lb[0] + 4, lb[1] + 5, 'φ', 15, T + ' font-weight="700"') +
      tx(uT[0] + 6, uT[1] - 4, 'U', 15, 'fill="' + RED + '" font-weight="700"') + tx(iT[0] + 6, iT[1] + 14, 'I', 15, 'fill="' + BLUE + '" font-weight="700"') +
      tx(30, 46, '↺ ω', 15, T) + tx(30, 64, 'forgásirány', 11, M);
    // időfüggvények: u(t) és i(t), egy periódus
    var x0 = 285, x1 = 520, yc = 125;
    s += ln(x0, yc, 545, yc, 'var(--muted)', 1.5) + ln(x0, 215, x0, 30, 'var(--muted)', 1.5) +
      path(sample(0, 2 * Math.PI, 90, function (t) { return [x0 + t / (2 * Math.PI) * (x1 - x0), yc - 75 * Math.sin(t + phU * D2R)]; }), RED, 2.5) +
      path(sample(0, 2 * Math.PI, 90, function (t) { return [x0 + t / (2 * Math.PI) * (x1 - x0), yc - 52 * Math.sin(t + phI * D2R)]; }), BLUE, 2.5) +
      tx(440, 24, 'u(t)', 13, 'fill="' + RED + '" font-weight="700"') + tx(490, 24, 'i(t)', 13, 'fill="' + BLUE + '" font-weight="700"') +
      tx(550, yc + 18, 'ωt', 12, end(M)) + tx(x0 + 6, 30, 'pillanatérték', 11, M);
    return s + '</svg>';
  })();

  // 2–3. Derékszögű háromszög: impedancia- és teljesítményháromszög
  function triSvg(hLab, vLab, cLab, cols, lines) {
    var ang = Math.atan2(130, 240), ex = 50 + 55 * Math.cos(ang), ey = 180 - 55 * Math.sin(ang), deg = -ang / D2R;
    return '<svg viewBox="0 0 560 220">' +
      ln(50, 180, 290, 180, cols[0], 4) + ln(290, 180, 290, 50, cols[1], 4) + ln(50, 180, 290, 50, cols[2], 4) +
      '<path d="M276 180 V166 H290" fill="none" stroke="var(--muted)" stroke-width="1.5"/>' +
      '<path d="M105 180 A55 55 0 0 0 ' + r1(ex) + ' ' + r1(ey) + '" fill="none" stroke="var(--fg-2)" stroke-width="1.5"/>' +
      tx(114, 172, 'φ', 15, T + ' font-weight="700"') +
      tx(170, 204, hLab, 14, mid('fill="' + cols[0] + '" font-weight="700"')) +
      tx(300, 120, vLab, 14, 'fill="' + cols[1] + '" font-weight="700"') +
      '<text x="155" y="100" font-size="14" text-anchor="middle" fill="' + cols[2] + '" font-weight="700" transform="rotate(' + r1(deg) + ' 155 100)">' + cLab + '</text>' +
      lines.map(function (l, i) { return tx(394, 62 + i * 26, l, 13, T); }).join('') + '</svg>';
  }
  var impTriSvg = triSvg('R (rezisztencia)', sub('X = X', 'L', ' − X') + '<tspan font-size="0.75em" dy="4">C</tspan>', '|Z| (impedancia)', [ORANGE, PURPLE, BLUE],
    ['Z = R + jX', '|Z| = √(R² + X²)', 'cos φ = R / |Z|', 'X > 0: induktív jelleg', 'X < 0: kapacitív jelleg']);
  var powTriSvg = triSvg('P hatásos [W]', 'Q meddő [var]', 'S látszólagos [VA]', [GREEN, RED, BLUE],
    ['S = U · I', 'P = S · cos φ', 'Q = S · sin φ', 'S² = P² + Q²', 'cos φ = P / S']);

  // 4. Rezonanciagörbe: soros RLC kör árama a frekvencia függvényében
  var resSvg = (function () {
    function px(x) { return 50 + (x - 0.25) / 2.25 * 480; }
    function py(v) { return 190 - 150 * v; }
    function curve(Q) { return sample(0.25, 2.5, 160, function (x) { return [px(x), py(1 / Math.sqrt(1 + Q * Q * Math.pow(x - 1 / x, 2)))]; }); }
    var q = 6, xa = -1 / (2 * q) + Math.sqrt(1 + 1 / (4 * q * q)), xb = 1 / (2 * q) + Math.sqrt(1 + 1 / (4 * q * q));
    return '<svg viewBox="0 0 560 220">' + ln(50, 190, 545, 190, 'var(--fg-2)', 1.5) + ln(50, 190, 50, 22, 'var(--fg-2)', 1.5) +
      ln(px(1), 190, px(1), 32, 'var(--muted)', 1.5, 'stroke-dasharray="4 4"') +
      path(curve(2), BLUE, 2.5) + path(curve(q), RED, 2.5) +
      ln(px(xa), py(Math.SQRT1_2), px(xb), py(Math.SQRT1_2), 'var(--fg-2)', 1.5) +
      tx(px(xb) + 8, py(Math.SQRT1_2) + 4, 'B = f₀ / Q', 12, T) +
      tx(410, 160, 'Q = 6 (kis R: éles)', 12, 'fill="' + RED + '"') + tx(345, 112, 'Q = 2 (nagy R: lapos)', 12, 'fill="' + BLUE + '"') +
      tx(px(1), 206, 'f₀', 13, mid()) + tx(545, 206, 'f', 13, end()) + tx(44, 30, 'I', 13, end()) +
      tx(44, py(1) + 4, sub('I', 'max'), 10, end(M)) + tx(44, py(Math.SQRT1_2) + 4, '0,707', 10, end(M)) + '</svg>';
  })();

  // 5. Háromfázisú feszültségek időben és fázorként
  var c3 = ['#b0673a', 'var(--fg-2)', '#8a94ab'];
  var threeSvg = (function () {
    var x0 = 40, x1 = 330, yc = 100, s = '<svg viewBox="0 0 560 200">' + ln(x0, yc, 340, yc, 'var(--muted)', 1.5) + ln(x0, 175, x0, 25, 'var(--muted)', 1.5);
    [0, -120, 120].forEach(function (ph, k) {
      s += path(sample(0, 2 * Math.PI, 100, function (t) { return [x0 + t / (2 * Math.PI) * (x1 - x0), yc - 62 * Math.sin(t + ph * D2R)]; }), c3[k], 2.5);
      s += tx(338, yc - 62 * Math.sin(2 * Math.PI + ph * D2R) + 5, 'L' + (k + 1), 13, 'fill="' + c3[k] + '" font-weight="700"');
    });
    s += tx(338, yc + 20, 'ωt', 11, M);
    var cx = 455, cy = 108, tips = [];
    [90, -30, 210].forEach(function (a, k) {
      var x = cx + 72 * Math.cos(a * D2R), y = cy - 72 * Math.sin(a * D2R); tips.push([x, y]);
      s += arr(cx, cy, x, y, c3[k], 3) + tx(cx + 88 * Math.cos(a * D2R), cy - 88 * Math.sin(a * D2R) + 5, sub('U', String(k + 1)), 13, mid('fill="' + c3[k] + '" font-weight="700"'));
    });
    s += ln(tips[0][0], tips[0][1], tips[1][0], tips[1][1], PURPLE, 2, 'stroke-dasharray="5 4"') +
      tx((tips[0][0] + tips[1][0]) / 2 + 8, (tips[0][1] + tips[1][1]) / 2 - 6, sub('U', '12'), 13, 'fill="' + PURPLE + '" font-weight="700"') + dot(cx, cy);
    return s + '</svg>';
  })();

  // 6. Csillag- és háromszögkapcsolás
  function zbox(x1, y1, x2, y2) {
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2, deg = Math.atan2(y2 - y1, x2 - x1) / D2R;
    return ln(x1, y1, x2, y2, 'var(--fg-2)', 2.5) + '<rect x="' + r1(mx - 20) + '" y="' + r1(my - 8) + '" width="40" height="16" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2.5" transform="rotate(' + r1(deg) + ' ' + r1(mx) + ' ' + r1(my) + ')"/>';
  }
  var starDeltaSvg = (function () {
    var C = [130, 130], P = [[130, 50], [130 + 80 * Math.cos(210 * D2R), 130 + 40], [130 + 80 * Math.cos(-30 * D2R), 130 + 40]];
    var s = '<svg viewBox="0 0 560 250">' + tx(130, 18, 'Csillagkapcsolás (Y)', 14, mid(T + ' font-weight="700"')) + tx(420, 18, 'Háromszögkapcsolás (Δ)', 14, mid(T + ' font-weight="700"'));
    P.forEach(function (p) { s += zbox(C[0], C[1], p[0], p[1]); });
    s += ln(C[0], C[1], 130, 192, BLUE, 2.5) + dot(C[0], C[1]) + term(130, 195) + tx(140, 200, 'N (nullavezető)', 12, 'fill="' + BLUE + '"');
    P.forEach(function (p) { s += term(p[0], p[1]); });
    s += tx(130, 38, 'L1', 12, mid()) + tx(52, 175, 'L2', 12, end()) + tx(208, 175, 'L3', 12) + tx(142, 96, sub('U', 'f'), 12, M);
    s += tx(130, 226, sub('U', 'v', ' = √3 · U') + '<tspan font-size="0.75em" dy="4">f</tspan>', 13, mid()) + tx(130, 244, sub('I', 'v', ' = I') + '<tspan font-size="0.75em" dy="4">f</tspan>', 13, mid());
    var A = [420, 60], B = [345, 190], Cc = [495, 190];
    s += zbox(A[0], A[1], B[0], B[1]) + zbox(B[0], B[1], Cc[0], Cc[1]) + zbox(Cc[0], Cc[1], A[0], A[1]) + term(A[0], A[1]) + term(B[0], B[1]) + term(Cc[0], Cc[1]) +
      tx(420, 46, 'L1', 12, mid()) + tx(334, 195, 'L2', 12, end()) + tx(506, 195, 'L3', 12) + tx(470, 118, sub('U', 'f', ' = U') + '<tspan font-size="0.75em" dy="4">v</tspan>', 12, M);
    s += tx(420, 226, sub('U', 'v', ' = U') + '<tspan font-size="0.75em" dy="4">f</tspan>', 13, mid()) + tx(420, 244, sub('I', 'v', ' = √3 · I') + '<tspan font-size="0.75em" dy="4">f</tspan>', 13, mid());
    return s + '</svg>';
  })();

  // 7. Transzformátor
  var trafoSvg = (function () {
    var s = '<svg viewBox="0 0 560 230">' + tx(280, 18, 'U₁ / U₂ = N₁ / N₂ = I₂ / I₁', 13, mid(T + ' font-weight="700"')) +
      '<path d="M180 30 H380 V200 H180 Z M220 70 V160 H340 V70 Z" fill="#8a94ab" fill-opacity=".45" fill-rule="evenodd" stroke="var(--fg-2)" stroke-width="2"/>' +
      '<path d="M200 50 H360 V180 H200 Z" fill="none" stroke="' + PURPLE + '" stroke-width="2" stroke-dasharray="6 4"/>' + arr(262, 50, 300, 50, PURPLE, 2) +
      tx(280, 112, 'Φ', 18, mid('fill="' + PURPLE + '" font-weight="700"')) + tx(280, 132, 'közös fluxus', 11, mid(M));
    for (var i = 0; i < 8; i++) s += ln(172, 82 + i * 9, 228, 87 + i * 9, RED, 3.5);
    for (var j = 0; j < 4; j++) s += ln(332, 95 + j * 13, 388, 100 + j * 13, BLUE, 3.5);
    s += ln(172, 82, 100, 82, RED, 2.5) + ln(172, 145, 100, 145, RED, 2.5) + term(100, 82) + term(100, 145) +
      ln(388, 100, 460, 100, BLUE, 2.5) + ln(388, 139, 460, 139, BLUE, 2.5) + term(460, 100) + term(460, 139) +
      tx(60, 112, 'U₁', 15, mid('fill="' + RED + '" font-weight="700"')) + tx(60, 132, '230 V', 12, mid(M)) +
      tx(500, 116, 'U₂', 15, mid('fill="' + BLUE + '" font-weight="700"')) + tx(500, 136, '23 V', 12, mid(M)) +
      tx(200, 220, 'primer: N₁ = 400', 12, mid('fill="' + RED + '"')) + tx(360, 220, 'szekunder: N₂ = 40', 12, mid('fill="' + BLUE + '"'));
    return s + '</svg>';
  })();

  // 8. Aszinkron motor nyomaték–fordulatszám jelleggörbéje (Kloss-képlet)
  var asyncSvg = (function () {
    var sb = 0.2;
    function Mm(n) { var s = Math.max(1e-4, 1 - n); return 2 / (s / sb + sb / s); }
    function Ml(n) { return 0.12 + 0.5 * n * n; }
    function px(n) { return 60 + n * 420; }
    function py(m) { return 200 - m * 150; }
    var wp = 0.9; for (var n = 0.8; n < 1; n += 0.0005) { if (Mm(n) <= Ml(n)) { wp = n; break; } }
    return '<svg viewBox="0 0 560 240">' + ln(60, 200, 540, 200, 'var(--fg-2)', 1.5) + ln(60, 200, 60, 25, 'var(--fg-2)', 1.5) +
      ln(px(1), 200, px(1), 40, 'var(--muted)', 1.5, 'stroke-dasharray="4 4"') +
      path(sample(0, 0.999, 160, function (n) { return [px(n), py(Mm(n))]; }).concat([[px(1), py(0)]]), RED, 3) +
      path(sample(0, 1.06, 60, function (n) { return [px(n), py(Ml(n))]; }), BLUE, 2, 'stroke-dasharray="7 5"') +
      dot(px(0.8), py(1), RED) + tx(px(0.8) - 8, py(1) - 6, sub('M', 'b', ' billenőnyomaték'), 12, end('fill="' + RED + '"')) +
      dot(px(0), py(Mm(0)), RED) + tx(68, py(Mm(0)) + 20, sub('M', 'i', ' indítónyomaték'), 12, 'fill="' + RED + '"') +
      ln(px(wp) - 4, py(Mm(wp)) + 4, 400, 172, 'var(--fg)', 1) + dot(px(wp), py(Mm(wp)), 'var(--fg)') + tx(396, 182, 'munkapont', 12, end(T + ' font-weight="700"')) +
      tx(190, py(Ml(0.3)) + 15, 'terhelőnyomaték (ventilátor)', 11, mid('fill="' + BLUE + '"')) +
      tx(50, 30, 'M', 13, end()) + tx(540, 216, 'n', 13, end()) + tx(60, 216, '0', 11, mid(M)) + tx(px(1), 216, sub('n', 's'), 12, mid()) +
      tx(60, 232, 's = 1', 11, mid(M)) + tx(px(1), 232, 's = 0', 11, mid(M)) + tx(px(0.9), 32, 'stabil szakasz', 11, mid(M)) + '</svg>';
  })();

  // 9. Thévenin-helyettesítés
  var thevSvg = '<svg viewBox="0 0 560 220">' +
    '<rect x="20" y="40" width="160" height="130" rx="10" fill="none" stroke="var(--fg-2)" stroke-width="2" stroke-dasharray="6 4"/>' +
    tx(100, 92, 'lineáris hálózat', 13, mid()) + tx(100, 112, '(források és', 12, mid(M)) + tx(100, 128, 'ellenállások)', 12, mid(M)) +
    ln(180, 70, 220, 70) + ln(180, 150, 220, 150) + term(220, 70) + term(220, 150) + tx(220, 58, 'A', 13, mid()) + tx(220, 175, 'B', 13, mid()) +
    tx(250, 120, '≡', 30, mid()) +
    ln(310, 50, 310, 170, 'var(--fg-2)', 2) + '<circle cx="310" cy="110" r="18" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2.5"/>' + ln(310, 92, 310, 128, 'var(--fg-2)', 2) +
    tx(322, 92, '+', 13) + tx(334, 134, sub('U', '0'), 14, ('fill="' + RED + '" font-weight="700"')) +
    ln(310, 50, 460, 50) + '<rect x="360" y="41" width="50" height="18" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2.5"/>' + tx(385, 33, sub('R', 'b'), 14, mid('fill="' + BLUE + '" font-weight="700"')) +
    ln(310, 170, 460, 170) +
    ln(460, 50, 510, 50, 'var(--fg-2)', 2, 'stroke-dasharray="4 3"') + ln(510, 50, 510, 88, 'var(--fg-2)', 2, 'stroke-dasharray="4 3"') + ln(510, 132, 510, 170, 'var(--fg-2)', 2, 'stroke-dasharray="4 3"') + ln(460, 170, 510, 170, 'var(--fg-2)', 2, 'stroke-dasharray="4 3"') +
    '<rect x="501" y="88" width="18" height="44" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2" stroke-dasharray="4 3"/>' + tx(525, 115, sub('R', 't'), 13) +
    term(460, 50) + term(460, 170) + tx(460, 38, 'A', 13, mid()) + tx(460, 192, 'B', 13, mid()) +
    tx(390, 212, sub('U', '0', ' = üresjárási feszültség;  R') + '<tspan font-size="0.75em" dy="4">b</tspan><tspan dy="-4"> = U₀ / I</tspan><tspan font-size="0.75em" dy="4">z</tspan>', 12, mid(M)) + '</svg>';

  // 10. Földelési rendszerek: TN-S, TN-C-S, TT
  var earthSvg = (function () {
    var BR = '#a0522d';
    function earth(x, y) { return ln(x, y, x, y + 8) + ln(x - 12, y + 8, x + 12, y + 8) + ln(x - 8, y + 13, x + 8, y + 13) + ln(x - 4, y + 18, x + 4, y + 18); }
    function pe(x1, y1, x2, y2) { return ln(x1, y1, x2, y2, '#4f9a3a', 4) + ln(x1, y1, x2, y2, '#e0b000', 4, 'stroke-dasharray="7 7"'); }
    function panel(x0, kind) {
      var sx = x0 + 40, s = tx(x0 + 95, 22, kind, 14, mid(T + ' font-weight="700"'));
      s += ln(sx, 75, sx, 190) + earth(sx, 190) + tx(sx + 6, 182, 'táppont', 10, M);
      s += ln(sx, 50, x0 + 128, 50, BR, 3) + ln(x0 + 128, 50, x0 + 128, 140, BR, 3) + tx(x0 + 2, 54, 'L', 12, 'fill="' + BR + '" font-weight="700"');
      if (kind === 'TN-S') {
        s += ln(sx, 75, x0 + 143, 75, BLUE, 3) + ln(x0 + 143, 75, x0 + 143, 140, BLUE, 3) + pe(sx, 100, x0 + 160, 100) + pe(x0 + 160, 100, x0 + 160, 140) +
          dot(sx, 75) + dot(sx, 100) + tx(x0 + 2, 79, 'N', 12, 'fill="' + BLUE + '" font-weight="700"') + tx(x0 + 2, 104, 'PE', 12, 'fill="#4f9a3a" font-weight="700"');
      } else if (kind === 'TN-C-S') {
        s += pe(sx, 75, x0 + 90, 75) + ln(x0 + 90, 75, x0 + 143, 75, BLUE, 3) + ln(x0 + 143, 75, x0 + 143, 140, BLUE, 3) + pe(x0 + 90, 75, x0 + 90, 100) + pe(x0 + 90, 100, x0 + 160, 100) + pe(x0 + 160, 100, x0 + 160, 140) +
          dot(sx, 75) + dot(x0 + 90, 75) + tx(x0 + 2, 79, 'PEN', 11, 'fill="#4f9a3a" font-weight="700"') + tx(x0 + 48, 128, 'szétválasztás', 10, M);
      } else {
        s += ln(sx, 75, x0 + 143, 75, BLUE, 3) + ln(x0 + 143, 75, x0 + 143, 140, BLUE, 3) + dot(sx, 75) + tx(x0 + 2, 79, 'N', 12, 'fill="' + BLUE + '" font-weight="700"') +
          pe(x0 + 160, 175, x0 + 160, 190) + earth(x0 + 160, 190) + tx(x0 + 132, 204, sub('R', 'A'), 11, end(M));
      }
      s += '<rect x="' + (x0 + 118) + '" y="140" width="56" height="35" rx="4" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2"/>' + tx(x0 + 146, 162, 'test', 11, mid(M));
      return s;
    }
    return '<svg viewBox="0 0 560 230">' + panel(5, 'TN-S') + panel(190, 'TN-C-S') + panel(375, 'TT') + '</svg>';
  })();

  STUDIE.addCourse({
    id: 'villamosmernoki',
    title: 'Villamosmérnöki alapok',
    icon: '⚡',
    color: '#f5a524',
    level: 'BSc 1–4. félév (villamosmérnök, mechatronika)',
    description: 'Hálózatszámítás, váltakozó áram fázorokkal, háromfázisú rendszerek, transzformátor és forgógépek, érintésvédelem.',
    intro: 'A villamosmérnöki alaptárgyak (Elektrotechnika, Villamos gépek, Villamos energetika) fogalmai egy helyen. A védelmi fogalmakat kézzelfoghatóan az [[elosztoszekreny|elosztószekrény]] modellben, a hajtásokat az [[elektromos-auto|elektromos autó]] modellben is megnézheted.',
    topics: [
      { id: 'dc', title: 'Egyenáramú hálózatok' },
      { id: 'ac', title: 'Váltakozó áram' },
      { id: 'harom', title: 'Háromfázisú rendszerek' },
      { id: 'gepek', title: 'Villamos gépek' },
      { id: 'vedelem', title: 'Érintés- és hálózatvédelem' },
      { id: 'tranziens', title: 'Tranziensek és energiatárolók' }
    ],
    formulas: [
      {
        id: 'impedancia-soros', title: 'Soros RLC-kör impedanciája', en: 'impedance of a series RLC circuit',
        parts: [{ t: '|Z|', d: 'Az impedancia abszolút értéke: a feszültség és az áram effektív értékének hányadosa', unit: 'Ω' }, { t: '=' }, { t: '√(' },
          { t: 'R', d: 'Rezisztencia (ohmos ellenállás): a hatásos teljesítményt felvevő rész', unit: 'Ω' }, { t: '^2 + (' },
          { t: 'X_L', d: 'Induktív reaktancia: X_L = ωL = 2πfL', unit: 'Ω', more: 'A frekvenciával egyenesen arányosan nő.' }, { t: '−' },
          { t: 'X_C', d: 'Kapacitív reaktancia: X_C = 1/(ωC)', unit: 'Ω', more: 'A frekvenciával fordítottan arányos: egyenáramon végtelen (szakadás).' }, { t: ')^2)' }],
        text: 'Komplex alakban `Z = R + j(X_L − X_C)`. A fázisszög `φ = arctg((X_L − X_C)/R)`: pozitív φ esetén induktív, negatív esetén kapacitív a kör, és az áram ennyivel késik (siet) a feszültséghez képest.',
        example: 'R = 30 Ω, X_L = 60 Ω, X_C = 20 Ω: `|Z| = √(30² + 40²) = 50 Ω`, `φ = arctg(40/30) = 53,1°`. 230 V-on `I = 230/50 = 4,6 A`.'
      },
      {
        id: 'rezonancia-frekvencia', title: 'Thomson-képlet (rezonanciafrekvencia)', en: 'resonant frequency',
        parts: [{ t: 'f_0', d: 'Rezonanciafrekvencia: ezen a frekvencián X_L = X_C', unit: 'Hz' }, { t: '=' }, { t: '1 / (2π · √(' },
          { t: 'L', d: 'Induktivitás', unit: 'H (henry)' }, { t: '·' }, { t: 'C', d: 'Kapacitás', unit: 'F (farad)' }, { t: '))' }],
        text: 'Az `ω₀L = 1/(ω₀C)` feltételből következik. A rezonancia élességét a **jósági tényező** adja meg: soros körre `Q = ω₀L/R`, a sávszélesség `B = f₀/Q`.',
        example: 'L = 10 mH, C = 1 µF: `f₀ = 1 / (2π · √(10⁻² · 10⁻⁶)) = 1 / (2π · 10⁻⁴) ≈ 1592 Hz`.'
      },
      {
        id: 'ac-teljesitmeny', title: 'Hatásos teljesítmény szinuszos áramkörben', en: 'active power',
        parts: [{ t: 'P', d: 'Hatásos teljesítmény: a pillanatnyi teljesítmény időbeli átlaga', unit: 'W' }, { t: '=' },
          { t: 'U', d: 'A feszültség effektív értéke', unit: 'V' }, { t: '·' }, { t: 'I', d: 'Az áram effektív értéke', unit: 'A' }, { t: '·' },
          { t: 'cos φ', d: 'Teljesítménytényező (szinuszos esetben): φ a feszültség és az áram közti fázisszög', unit: '–', more: 'Ohmos fogyasztónál 1, ideális tekercsnél vagy kondenzátornál 0.' }],
        text: 'A másik két teljesítmény ugyanebből a háromszögből: meddő `Q = U · I · sin φ` (var), látszólagos `S = U · I` (VA), és `S² = P² + Q²`.',
        example: '230 V, 10 A, cos φ = 0,8: `P = 1840 W`, `S = 2300 VA`, `Q = 2300 · 0,6 = 1380 var`.'
      },
      {
        id: 'haromfazisu-teljesitmeny', title: 'Szimmetrikus háromfázisú teljesítmény', en: 'three-phase power',
        parts: [{ t: 'P', d: 'A háromfázisú fogyasztó teljes hatásos teljesítménye', unit: 'W' }, { t: '=' }, { t: '√3', d: 'A vonali és a fázismennyiségek közti arányszám (csillagban a feszültségekre, háromszögben az áramokra)', unit: '≈ 1,732' }, { t: '·' },
          { t: 'U_v', d: 'Vonali feszültség (két fázisvezető között)', unit: 'V', more: 'Magyar kisfeszültségű hálózatban 400 V.' }, { t: '·' },
          { t: 'I_v', d: 'Vonali áram (a fázisvezetőben folyó áram)', unit: 'A' }, { t: '·' }, { t: 'cos φ', d: 'Egy fázis teljesítménytényezője', unit: '–' }],
        text: 'Ugyanez fázismennyiségekkel: `P = 3 · U_f · I_f · cos φ`. A vonali alak előnye, hogy csillag- és háromszögkapcsolásra **egyaránt** érvényes, és a vonali mennyiségek közvetlenül mérhetők.',
        example: '400 V, 20 A, cos φ = 0,85: `P = 1,732 · 400 · 20 · 0,85 ≈ 11,8 kW`.'
      },
      {
        id: 'transzformator-attetel', title: 'Ideális transzformátor áttétele', en: 'transformer turns ratio',
        parts: [{ t: 'U_1 / U_2', d: 'Primer és szekunder feszültség aránya', unit: '–' }, { t: '=' },
          { t: 'N_1 / N_2', d: 'A primer és a szekunder menetszám aránya: az áttétel (a)', unit: '–' }, { t: '=' },
          { t: 'I_2 / I_1', d: 'Az áramok fordított aránya: ami feszültségben nő, az áramban csökken', unit: '–', more: 'Ideális esetben S₁ = S₂, vagyis a látszólagos teljesítmény megmarad.' }],
        text: 'Az indukció törvényéből: `U = 4,44 · f · N · Φ_max`. Mivel a fluxus közös, a menetenkénti feszültség mindkét tekercsben ugyanakkora. A valódi transzformátor szekunder feszültsége terheléskor a szórási reaktancia és a tekercsellenállás miatt valamivel kisebb.',
        example: 'N₁ = 400, N₂ = 40, U₁ = 230 V: `U₂ = 23 V`. Ha a szekunder áram 10 A, a primer áram (a mágnesező áramtól eltekintve) `1 A`.'
      },
      {
        id: 'szinkron-fordulatszam', title: 'Szinkron fordulatszám és szlip', en: 'synchronous speed and slip',
        parts: [{ t: 'n_s', d: 'Szinkron fordulatszám: a forgó mágneses mező fordulatszáma', unit: '1/min' }, { t: '=' }, { t: '60', d: 'Átváltás: 1/s → 1/min', unit: 's/min' }, { t: '·' },
          { t: 'f', d: 'A táphálózat frekvenciája', unit: 'Hz' }, { t: '/' }, { t: 'p', d: 'Póluspárok száma (nem a pólusok száma!)', unit: '–', more: 'Egy 4 pólusú gépben p = 2.' }],
        text: 'Az aszinkron motor forgórésze ennél lassabban forog. A **szlip** a relatív lemaradás: `s = (n_s − n) / n_s`. Névleges üzemben jellemzően 2–6%.',
        example: '50 Hz, 4 pólusú motor (p = 2): `n_s = 60 · 50 / 2 = 1500 1/min`. Ha n = 1440 1/min, akkor `s = 60/1500 = 4%`.'
      },
      {
        id: 'hurokimpedancia', title: 'Önműködő lekapcsolás feltétele TN-rendszerben', en: 'automatic disconnection condition',
        parts: [{ t: 'Z_s', d: 'A hibahurok impedanciája: táppont tekercse + fázisvezető + védővezető vissza', unit: 'Ω' }, { t: '·' },
          { t: 'I_a', d: 'Az az áram, amely a védelmet az előírt időn belül működteti', unit: 'A', more: 'B karakterisztikájú kismegszakítónál 5 · I_n, C-nél 10 · I_n.' }, { t: '≤' },
          { t: 'U_0', d: 'A fázisvezető földhöz mért névleges feszültsége', unit: 'V', more: 'Magyarországon 230 V.' }],
        text: 'Ha a feltétel teljesül, testzárlatkor a zárlati áram `I_z = U_0 / Z_s ≥ I_a`, így a védelem elég gyorsan (230 V-os végáramkörben legfeljebb 0,4 s alatt) lekapcsol, mielőtt a testen tartósan veszélyes érintési feszültség maradna.',
        example: 'B16 kismegszakító: `I_a = 5 · 16 = 80 A`, ezért `Z_s ≤ 230 / 80 ≈ 2,88 Ω`. Ha a mért hurokimpedancia 1,2 Ω, a zárlati áram ≈ 192 A, a feltétel teljesül.'
      },
      {
        id: 'rc-tranziens', title: 'Kondenzátor feltöltődése (RC-kör bekapcsolási tranziense)', en: 'RC charging transient',
        parts: [{ t: 'u_C(t)', d: 'A kondenzátor feszültsége a bekapcsolás után t idővel', unit: 'V' }, { t: '=' },
          { t: 'U_0', d: 'A tápfeszültség (a végérték)', unit: 'V' }, { t: '· (1 − e^{−' }, { t: 't', d: 'A bekapcsolás óta eltelt idő', unit: 's' }, { t: '/' },
          { t: 'τ', d: 'Időállandó: τ = R · C', unit: 's', more: 'RL-körben τ = L / R.' }, { t: '})' }],
        text: 'Kezdetben üres kondenzátorra érvényes. Általánosan minden elsőrendű kör bármely mennyisége: `x(t) = x(∞) + (x(0⁺) − x(∞)) · e^(−t/τ)`. Egy τ alatt a változás 63,2%-a, 3τ alatt 95%-a, 5τ alatt 99,3%-a zajlik le.',
        example: 'R = 10 kΩ, C = 100 µF: `τ = 10⁴ · 10⁻⁴ = 1 s`. 12 V-ra kapcsolva 1 s után `u_C ≈ 7,6 V`, 5 s után ≈ 11,9 V.'
      },
      {
        id: 'tarolt-energia', title: 'Kondenzátorban és tekercsben tárolt energia', en: 'stored energy in C and L',
        parts: [{ t: 'W_C', d: 'A kondenzátor elektromos terében tárolt energia', unit: 'J' }, { t: '=' }, { t: '½ ·' },
          { t: 'C', d: 'Kapacitás', unit: 'F' }, { t: '·' }, { t: 'U^2', d: 'A kondenzátor feszültségének négyzete', unit: 'V²' }, { t: ';  W_L =' }, { t: '½ ·' },
          { t: 'L', d: 'Induktivitás', unit: 'H' }, { t: '·' }, { t: 'I^2', d: 'A tekercs áramának négyzete', unit: 'A²' }],
        text: 'Mindkettő a `W = ∫ u · i dt` integrálból következik: kondenzátornál `i = C · du/dt`, tekercsnél `u = L · di/dt` behelyettesítésével. Ezért nem ugorhat a kondenzátor feszültsége és a tekercs árama: ugráshoz végtelen teljesítmény kellene.',
        example: 'C = 1000 µF, U = 400 V: `W_C = 0,5 · 10⁻³ · 400² = 80 J`. L = 10 mH, I = 20 A: `W_L = 0,5 · 0,01 · 400 = 2 J`.'
      },
      {
        id: 'max-teljesitmeny', title: 'Maximális teljesítményátvitel', en: 'maximum power transfer',
        parts: [{ t: 'P_{max}', d: 'A terhelésre jutó legnagyobb hatásos teljesítmény', unit: 'W' }, { t: '=' },
          { t: 'U_0', d: 'A generátor (Thévenin-helyettesítő) üresjárási feszültsége', unit: 'V' }, { t: '^2 / (4 ·' },
          { t: 'R_b', d: 'A generátor belső ellenállása', unit: 'Ω', more: 'A maximum az R_t = R_b illesztésnél áll elő.' }, { t: ')' }],
        text: 'A terhelés teljesítménye `P = U_0² · R_t / (R_b + R_t)²`; deriválva R_t szerint a maximum `R_t = R_b`-nél van. Ekkor a hatásfok csak 50%, mert a belső ellenálláson ugyanannyi teljesítmény vész el. Váltakozó áramon a feltétel `Z_t = Z_b` konjugáltja (konjugált illesztés).',
        example: 'U_0 = 12 V, R_b = 2 Ω: illesztett terhelésnél (2 Ω) `P_max = 144 / 8 = 18 W`, a forrás összesen 36 W-ot ad le.'
      },
      {
        id: 'fazisjavito-kondenzator', title: 'Fázisjavító kondenzátor meddő teljesítménye', en: 'power factor correction capacitor',
        parts: [{ t: 'Q_C', d: 'A szükséges kapacitív meddő teljesítmény', unit: 'var' }, { t: '=' },
          { t: 'P', d: 'A fogyasztó hatásos teljesítménye (a fázisjavítás nem változtatja meg)', unit: 'W' }, { t: '· (tg' },
          { t: 'φ_1', d: 'Fázisszög fázisjavítás előtt', unit: '°' }, { t: '− tg' }, { t: 'φ_2', d: 'A kívánt fázisszög fázisjavítás után', unit: '°' }, { t: ')' }],
        text: 'Egyfázisú, U effektív feszültségű hálózatra kötött kondenzátor meddő teljesítménye `Q_C = U² · ω · C`, ebből `C = Q_C / (ω · U²)`. Háromfázisú telepnél a három kondenzátor együtt adja Q_C-t; háromszögkapcsolásban mindegyik a vonali feszültséget kapja, ezért harmadakkora kapacitás elég, mint csillagban.',
        example: 'P = 10 kW, cos φ₁ = 0,7 (tg φ₁ = 1,02), cél cos φ₂ = 0,95 (tg φ₂ = 0,33): `Q_C = 10 · 0,69 ≈ 6,9 kvar`. 230 V, 50 Hz egyfázison `C = 6900 / (314 · 230²) ≈ 415 µF`.'
      },
      {
        id: 'thd', title: 'Teljes harmonikus torzítás (THD)', en: 'total harmonic distortion',
        parts: [{ t: 'THD', d: 'A felharmonikusok eredő effektív értéke az alapharmonikushoz viszonyítva', unit: '% vagy –' }, { t: '= √(' },
          { t: 'I_2^2 + I_3^2 + …', d: 'A 2., 3., … felharmonikus effektív értékeinek négyzetösszege', unit: 'A²' }, { t: ') /' },
          { t: 'I_1', d: 'Az alapharmonikus (hálózati frekvenciájú) összetevő effektív értéke', unit: 'A' }],
        text: 'A teljes effektív érték a komponensekből: `I = I_1 · √(1 + THD²)`. Ugyanez a definíció feszültségre is érvényes (THD_U). Torzított áramnál a teljesítménytényező `λ = P / S` kisebb, mint cos φ₁, mert a felharmonikusok növelik S-t, de hatásos teljesítményt (szinuszos feszültség mellett) nem szállítanak.',
        example: 'I_1 = 10 A, I_3 = 6 A, I_5 = 3 A: `THD = √(36 + 9) / 10 ≈ 67%`, `I = √(100 + 36 + 9) ≈ 12,0 A`.'
      }
    ],
    terms: [
      /* ---------- Egyenáramú hálózatok ---------- */
      { id: 'ohm-torveny', prereq: ['lecke:villanyszereles/alapfogalmak', 'lecke:fizika/elektromossag'], term: 'Ohm-törvény', en: "Ohm's law", topic: 'dc', short: 'Lineáris (ohmos) ellenálláson a feszültség és az áram egyenesen arányos: U = R · I.',
        text: 'Az arányossági tényező az **ellenállás** (R, ohm), reciproka a **vezetés** (G = 1/R, siemens). Vezetékre `R = ρ · l / A`, ahol ρ a fajlagos ellenállás (rézre ≈ 0,0175 Ω·mm²/m).\n\nSzinuszos állandósult állapotban a törvény fázorokkal általánosítható: `U = Z · I`, ahol Z a komplex impedancia.',
        example: '230 V-os, 2 kW-os vízmelegítő: `I = P/U = 8,7 A`, `R = U/I ≈ 26,5 Ω`. 10 m hosszú, 1,5 mm²-es rézvezeték ellenállása oda-vissza `0,0175 · 20 / 1,5 ≈ 0,23 Ω`.',
        pitfall: 'Az Ohm-törvény nem „minden elemre” igaz: dióda, izzólámpa, varisztor nemlineáris. A hideg izzószál ellenállása a működésinek kb. tizede, ezért bekapcsoláskor nagy áramlökés lép fel.',
        related: ['kirchhoff-1', 'kirchhoff-2', 'impedancia', 'thevenin'] },
      { id: 'kirchhoff-1', prereq: ['lecke:villanyszereles/kapcsolasok'], term: 'Kirchhoff I. törvénye (csomóponti törvény)', en: "Kirchhoff's current law (KCL)", topic: 'dc', short: 'Bármely csomópontba befolyó áramok előjeles összege minden pillanatban nulla: ΣI = 0.',
        text: 'A töltésmegmaradás következménye: a csomópontban töltés nem halmozódhat fel. Egy n csomópontú hálózatban **n − 1** független csomóponti egyenlet írható fel.\n\nVáltakozó áramon a törvény a **pillanatértékekre** és a **fázorokra** érvényes, az effektív értékekre nem.',
        example: 'Egy csomópontba 3 A és 2 A folyik be, egy ágon 4 A folyik ki: a negyedik ágban `3 + 2 − 4 = 1 A` folyik **kifelé**.',
        pitfall: 'Váltakozó áramon nem szabad az effektív értékeket összeadni: két 10 A-es, egymáshoz képest 90°-kal eltolt áram eredője 14,1 A, nem 20 A.',
        related: ['kirchhoff-2', 'csomoponti-potencial', 'fazor', 'aram-vedokapcsolo'] },
      { id: 'kirchhoff-2', term: 'Kirchhoff II. törvénye (huroktörvény)', en: "Kirchhoff's voltage law (KVL)", topic: 'dc', short: 'Bármely zárt hurok mentén a feszültségek előjeles összege nulla: ΣU = 0.',
        text: 'A villamos tér potenciálos (konzervatív) voltából következik: ha egy pontból körbejárva ugyanoda érünk vissza, a potenciál nem változhatott. Egy b ágú, n csomópontú hálózatban **b − n + 1** független hurokegyenlet írható fel; ezt használja a **hurokáramok módszere**.\n\nA feszültségek előjelét a körüljárási iránnyal egyező (+) vagy ellentétes (−) referenciairány dönti el.',
        pitfall: 'Gyakori hiba, hogy a feszültségforrás és az ellenálláson eső feszültség előjelét „érzésre” választják. Mindig rögzíts referenciairányokat (áram és feszültség), és ehhez tartsd magad következetesen.',
        related: ['kirchhoff-1', 'ohm-torveny', 'thevenin'] },
      { id: 'thevenin', term: 'Thévenin-tétel', en: "Thévenin's theorem", topic: 'dc', short: 'Bármely lineáris aktív kétpólus két kapocs felől helyettesíthető egy ideális feszültségforrás (U₀) és egy vele sorba kötött belső ellenállás (R_b) kapcsolásával.',
        visual: thevSvg, caption: 'A tetszőleges lineáris hálózat a kapcsok felől egy forrással és egy ellenállással egyenértékű.',
        text: '- **U₀** az A–B kapcsokon mérhető üresjárási feszültség.\n- **R_b** a belső ellenállás: a független forrásokat dezaktiválva (feszültségforrás → rövidzár, áramforrás → szakadás) a kapcsok felől látott eredő ellenállás, vagy `R_b = U₀ / I_z`, ahol I_z a rövidzárási áram.\n\nA tétel különösen akkor hasznos, ha egyetlen terhelő ellenállás változik: a hálózat többi részét csak egyszer kell kiszámolni. **Teljesítményillesztés**: a terhelés teljesítménye `R_t = R_b` esetén maximális, `P_max = U₀² / (4R_b)`, de ekkor a hatásfok csak 50%.',
        example: 'U₀ = 12 V, R_b = 2 Ω: rövidzárási áram 6 A. R_t = 2 Ω esetén `I = 3 A`, `P_t = 18 W`. R_t = 10 Ω esetén `I = 1 A`, `P_t = 10 W`, de a hatásfok 83%.',
        pitfall: 'A dezaktiválás felcserélése: a feszültségforrást **rövidzárral**, az áramforrást **szakadással** kell helyettesíteni. Vezérelt (függő) forrásokat nem szabad dezaktiválni.',
        related: ['norton', 'kirchhoff-2', 'csomoponti-potencial', 'zarlati-aram'] },
      { id: 'norton', term: 'Norton-tétel', en: "Norton's theorem", topic: 'dc', short: 'Bármely lineáris aktív kétpólus helyettesíthető egy ideális áramforrás (I_z) és egy vele párhuzamosan kapcsolt belső ellenállás (R_b) kapcsolásával.',
        text: 'Az áramforrás árama a kapcsok **rövidzárási árama**, a belső ellenállás ugyanaz, mint a Thévenin-helyettesítésben. A két kép egymásba átszámolható: `U₀ = I_z · R_b`.\n\nPárhuzamos kapcsolásoknál és a csomóponti potenciálok módszerénél kényelmesebb, mert az áramforrások közvetlenül beírhatók a csomóponti egyenletekbe.',
        example: 'U₀ = 12 V, R_b = 2 Ω Thévenin-kép → Norton-kép: `I_z = 6 A` áramforrás, vele párhuzamosan 2 Ω.',
        related: ['thevenin', 'csomoponti-potencial'] },
      { id: 'csomoponti-potencial', term: 'Csomóponti potenciálok módszere', en: 'nodal analysis', topic: 'dc', short: 'Hálózatszámítási módszer, amelyben egy kiválasztott referencia-csomóponthoz mért csomóponti potenciálok az ismeretlenek, és minden további csomópontra Kirchhoff I. törvényét írjuk fel.',
        text: 'Az ágáramokat a potenciálkülönbségekből fejezzük ki (`I = (φ_a − φ_b)/R`), így n csomópontra n − 1 egyenletet kapunk, mátrixalakban `G · φ = I_forrás`. Ezt a módszert (módosított változatát, MNA) használják a SPICE-szerű áramköri szimulátorok is.',
        example: '12 V-os forrás 4 Ω-on át táplál egy csomópontot, amelyből 6 Ω és 12 Ω megy a földre: `(φ − 12)/4 + φ/6 + φ/12 = 0` → 12-vel szorozva `6φ = 36`, tehát `φ = 6 V`. Ellenőrzés: befolyik 1,5 A, kifolyik 1 A + 0,5 A.',
        pitfall: 'Ha egy ideális feszültségforrás két nem földelt csomópont között van, az áramát nem lehet ellenállással kifejezni: ilyenkor a két csomópontot **szupercsomópontként** kell kezelni.',
        related: ['kirchhoff-1', 'norton', 'thevenin'] },

      /* ---------- Váltakozó áram ---------- */
      { id: 'fazor', prereq: ['lecke:fizika/hullamok-feny'], term: 'Fázor', en: 'phasor', topic: 'ac', short: 'Szinuszos mennyiséget ábrázoló komplex szám: abszolút értéke az amplitúdó (vagy az effektív érték), szöge a kezdőfázis; az ω szögsebességgel forgó vektor t = 0 pillanatbeli képe.',
        visual: phasorSvg, caption: 'Induktív fogyasztó: az I áramfázor φ szöggel késik az U feszültségfázorhoz képest. A forgó fázor képzetes tengelyre vett vetülete adja a pillanatértéket.',
        text: 'Az `u(t) = Û · sin(ωt + φ_u)` függvényhez az `U = U · e^(jφ_u)` komplex számot rendeljük. Ennek nagy előnye, hogy az időbeli deriválásból **jω-val való szorzás** lesz, így a differenciálegyenletekből algebrai egyenletek lesznek. Az elektrotechnikában a fázor hossza többnyire az **effektív érték**.\n\nA módszer feltételei: lineáris hálózat, szinuszos gerjesztés, egyetlen frekvencia, állandósult állapot.',
        pitfall: 'Különböző frekvenciájú mennyiségek (például alapharmonikus és felharmonikus) fázorai nem adhatók össze, és bekapcsolási (tranziens) jelenségekre a fázoros számítás nem alkalmazható.',
        related: ['impedancia', 'effektiv-ertek', 'reaktancia', 'teljesitmenytenyezo', 'haromfazisu-rendszer', 'kirchhoff-1'] },
      { id: 'effektiv-ertek', term: 'Effektív érték (RMS)', en: 'root mean square (RMS) value', topic: 'ac', short: 'Egy periodikus áram effektív értéke az az egyenáram, amely ugyanazon az ellenálláson ugyanakkora átlagteljesítményt (hőt) fejleszt; matematikailag a négyzetes középérték.',
        text: '`I = √( (1/T) · ∫ i²(t) dt )`. Szinuszos jelre `I = Î / √2 ≈ 0,707 · Î`. A hálózati 230 V is effektív érték, a csúcsérték `230 · √2 ≈ 325 V`.\n\nA mérőműszerek egy része az egyenirányított középértéket méri és szinuszra kalibrált; torzult jelalaknál csak a **True RMS** műszer mutat helyes értéket.',
        example: '400 V-os vonali feszültség csúcsértéke `400 · √2 ≈ 566 V`. Egy 16 A effektív értékű szinuszos áram csúcsértéke ≈ 22,6 A.',
        pitfall: 'A √2-es szorzó csak szinuszos jelre igaz. Kapcsolóüzemű tápegységek csúcsos áramánál a csúcstényező 2–3 is lehet. A szigeteléseket és a félvezetőket a **csúcsértékre** kell méretezni, a melegedést az effektív érték szabja meg.',
        related: ['fazor', 'hatasos-teljesitmeny'] },
      { id: 'impedancia', prereq: ['lecke:matematika/pitagorasz'], term: 'Impedancia', en: 'impedance', topic: 'ac', short: 'Szinuszos állandósult állapotban a feszültség- és az áramfázor hányadosa: Z = U / I = R + jX, mértékegysége ohm.',
        visual: impTriSvg, caption: 'Impedanciaháromszög: a valós rész a rezisztencia, a képzetes rész a reaktancia, a szög a fázisszög.',
        text: 'Az impedancia valós része a **rezisztencia** (R), képzetes része a **reaktancia** (X). Abszolút értéke `|Z| = √(R² + X²)` megadja az effektív értékek arányát, szöge (φ) pedig azt, mennyivel késik az áram a feszültség mögött. Reciproka az **admittancia**: `Y = 1/Z = G + jB` (siemens).\n\nSoros elemek impedanciái, párhuzamos elemek admittanciái összeadódnak, akárcsak egyenáramon az ellenállások és a vezetések.',
        formulas: ['impedancia-soros'],
        pitfall: 'Az ellenállás és a reaktancia nem adható össze számtanilag: R = 30 Ω és X = 40 Ω eredője 50 Ω, nem 70 Ω.',
        related: ['fazor', 'reaktancia', 'ohm-torveny', 'rezonancia', 'teljesitmenytenyezo'] },
      { id: 'reaktancia', term: 'Reaktancia (induktív és kapacitív)', en: 'reactance', topic: 'ac', short: 'Az impedancia képzetes része: tekercsnél X_L = ωL, kondenzátornál X_C = 1/(ωC); energiát tárol, de átlagosan nem fogyaszt.',
        text: 'Ideális tekercsen a feszültség **90°-kal siet** az áramhoz képest (`Z_L = jωL`), ideális kondenzátoron **90°-kal késik** (`Z_C = 1/(jωC) = −j/(ωC)`). A reaktancia frekvenciafüggő: a tekercs a nagy, a kondenzátor a kis frekvenciákat „fogja vissza”; ezen alapulnak a szűrők.',
        example: 'L = 100 mH, 50 Hz: `X_L = 2π · 50 · 0,1 ≈ 31,4 Ω`. C = 10 µF, 50 Hz: `X_C = 1 / (2π · 50 · 10⁻⁵) ≈ 318 Ω`.',
        pitfall: 'Egyenáramon (f = 0) a kondenzátor szakadás, az ideális tekercs rövidzár. Egy 230 V AC-re tervezett tekercset egyenfeszültségre kapcsolva csak a kis rézellenállás korlátozza az áramot, és leég.',
        related: ['impedancia', 'rezonancia', 'meddo-teljesitmeny'] },
      { id: 'rezonancia', term: 'Rezonancia', en: 'resonance', topic: 'ac', short: 'Egy RLC-kör azon állapota, amelyben az induktív és a kapacitív reaktancia kiegyenlíti egymást (X_L = X_C), így a kör impedanciája tisztán ohmos.',
        visual: resSvg, caption: 'Soros rezgőkör áramának frekvenciafüggése két jósági tényezőnél. B a 0,707-es szinthez tartozó sávszélesség.',
        text: '- **Soros rezonancia** (feszültségrezonancia): az impedancia minimális (= R), az áram maximális, a tekercsen és a kondenzátoron a tápfeszültség Q-szorosa jelenhet meg.\n- **Párhuzamos rezonancia** (áramrezonancia): az impedancia maximális, a felvett áram minimális, a két ágban viszont nagy áram kering.\n\nAlkalmazás: rádióvevők hangolása, szűrők, rezonáns tápegységek. Az energetikában gyakran **nem kívánt**: a meddőkompenzáló kondenzátorok a hálózat induktivitásával valamelyik felharmonikus frekvencián rezonanciába kerülhetnek.',
        formulas: ['rezonancia-frekvencia'],
        pitfall: 'Soros rezonanciánál a részfeszültségek sokszorosan meghaladhatják a tápfeszültséget: Q = 10 esetén 230 V-ról 2300 V a kondenzátoron. Ez nem ellentmond Kirchhoff II. törvényének, mert U_L és U_C ellentétes fázisú.',
        related: ['reaktancia', 'impedancia', 'teljesitmenytenyezo'] },
      { id: 'hatasos-teljesitmeny', term: 'Hatásos teljesítmény', en: 'active (real) power', topic: 'ac', short: 'A pillanatnyi teljesítmény egy periódusra vett átlaga, vagyis a ténylegesen hővé, mechanikai munkává vagy más energiává alakuló teljesítmény: P = U · I · cos φ, mértékegysége watt.',
        text: 'Szinuszos áramkörben a pillanatnyi teljesítmény `p(t) = u(t) · i(t)` a hálózati frekvencia kétszeresével lüktet, és φ ≠ 0 esetén időnként negatív is: ilyenkor a fogyasztó energiát ad vissza. Az átlaga a hatásos teljesítmény. Csak a rezisztencia vesz fel hatásos teljesítményt: `P = I² · R`.\n\nA háztartási fogyasztásmérő hatásos energiát mér (kWh).',
        formulas: ['ac-teljesitmeny'],
        related: ['meddo-teljesitmeny', 'latszolagos-teljesitmeny', 'teljesitmenytenyezo', 'effektiv-ertek'] },
      { id: 'meddo-teljesitmeny', term: 'Meddő teljesítmény', en: 'reactive power', topic: 'ac', short: 'A tekercsek mágneses és a kondenzátorok villamos tere között periodikusan ide-oda lengő energia mértéke: Q = U · I · sin φ, mértékegysége var (voltamper reaktív).',
        text: 'A meddő teljesítmény átlagosan nem végez munkát, mégis **áramot igényel**, amely a vezetékeken, transzformátorokon veszteséget okoz és lefoglalja azok terhelhetőségét. Megállapodás szerint az induktív fogyasztó (motor, fojtó) meddőt **vesz fel**, a kondenzátor meddőt **ad le**. A szinkron generátorok gerjesztésük változtatásával meddőt termelhetnek vagy fogyaszthatnak, ezzel tartják a hálózati feszültséget.',
        pitfall: '„A meddő ingyen van, hiszen nem végez munkát.” Nem: a hozzá tartozó áram I²R veszteséget okoz, ezért az ipari fogyasztók a meddő energiáért (kvarh) is fizetnek, ha a teljesítménytényezőjük kicsi.',
        related: ['hatasos-teljesitmeny', 'latszolagos-teljesitmeny', 'reaktancia', 'teljesitmenytenyezo', 'szinkron-gep'] },
      { id: 'latszolagos-teljesitmeny', term: 'Látszólagos teljesítmény', en: 'apparent power', topic: 'ac', short: 'A feszültség és az áram effektív értékének szorzata: S = U · I = √(P² + Q²), mértékegysége VA; a berendezések méretezési alapja.',
        visual: powTriSvg, caption: 'Teljesítményháromszög: a látszólagos teljesítmény a hatásos és a meddő teljesítmény vektoriális összege.',
        text: 'A komplex teljesítmény `S = U · Ī = P + jQ` (Ī az áramfázor konjugáltja). A transzformátorok, generátorok és kábelek terhelhetőségét az áram (melegedés) és a feszültség (szigetelés) korlátozza, a fázisszög nem, ezért adattáblájukon **kVA** szerepel, nem kW.',
        example: 'Egy 630 kVA-es transzformátor cos φ = 0,8 mellett csak 504 kW hatásos teljesítményt tud kiadni, cos φ = 0,95 mellett 598 kW-ot.',
        formulas: ['ac-teljesitmeny'],
        related: ['hatasos-teljesitmeny', 'meddo-teljesitmeny', 'teljesitmenytenyezo', 'transzformator'] },
      { id: 'teljesitmenytenyezo', prereq: ['lecke:villanyszereles/alapfogalmak'], term: 'Teljesítménytényező (cos φ)', en: 'power factor', topic: 'ac', short: 'A hatásos és a látszólagos teljesítmény hányadosa: λ = P / S; tisztán szinuszos feszültség és áram esetén λ = cos φ.',
        text: 'Ugyanakkora hatásos teljesítményhez kisebb teljesítménytényező mellett nagyobb áram kell (`I = P / (U · cos φ)`), ami négyzetesen növeli a veszteségeket. Az aszinkron motorok cos φ-je névleges terhelésen 0,8–0,9, részterhelésen jóval rosszabb.\n\n**Meddőkompenzáció**: a fogyasztóval párhuzamosan kapcsolt kondenzátor fedezi helyben az induktív meddőt: `Q_C = P · (tg φ₁ − tg φ₂)`. Nem szinuszos áramoknál (egyenirányítós fogyasztók) a torzítás miatt λ < cos φ; ezt aktív PFC-áramkörrel javítják.',
        example: '10 kW-os motor, cos φ₁ = 0,7 → cos φ₂ = 0,95: `Q_C = 10 · (1,020 − 0,329) ≈ 6,9 kvar`. A hálózati áram 26%-kal csökken.',
        pitfall: 'Túlkompenzálás: ha a kondenzátor a szükségesnél nagyobb, a fogyasztó kapacitív lesz, a feszültség megemelkedhet, és rezonanciaveszély lép fel. Ezért szabályozott, fokozatokban kapcsolt kompenzáló berendezést használnak.',
        formulas: ['ac-teljesitmeny'],
        related: ['hatasos-teljesitmeny', 'meddo-teljesitmeny', 'latszolagos-teljesitmeny', 'impedancia', 'rezonancia', 'aszinkron-motor'] },

      /* ---------- Háromfázisú rendszerek ---------- */
      { id: 'haromfazisu-rendszer', term: 'Háromfázisú rendszer', en: 'three-phase system', topic: 'harom', short: 'Három azonos frekvenciájú és amplitúdójú, egymáshoz képest 120°-kal eltolt szinuszos feszültségből álló energiaátviteli rendszer.',
        visual: threeSvg, caption: 'A három fázisfeszültség időben és fázorként (érvényes vezetékszínek: L1 barna, L2 fekete, L3 szürke). A szaggatott vonal az U₁₂ vonali feszültség.',
        text: 'Előnyei az egyfázisú rendszerrel szemben:\n- szimmetrikus terhelésnél a **pillanatnyi összteljesítmény állandó**, így a motorok nyomatéka nem lüktet;\n- egyszerűen létrehozható vele **forgó mágneses mező**;\n- ugyanakkora teljesítmény átviteléhez kevesebb vezetőanyag kell;\n- két feszültségszint áll rendelkezésre: Magyarországon `3 × 230/400 V, 50 Hz`.\n\nSzimmetrikus terhelésnél a három fázisáram fázorösszege nulla, így a nullavezetőben nem folyik áram.',
        formulas: ['haromfazisu-teljesitmeny'],
        pitfall: 'A nullavezető árama nem mindig kicsi: aszimmetrikus terhelésnél, és főleg ha sok egyenirányítós fogyasztó (LED-tápegység, számítógép) van a hálózaton, a 3. felharmonikus áramok a nullavezetőben **összeadódnak**, és az N-áram a fázisáramnál is nagyobb lehet.',
        related: ['csillag-kapcsolas', 'haromszog-kapcsolas', 'forgo-mezo', 'fazor', 'kirchhoff-1', 'foldelesi-rendszerek'] },
      { id: 'csillag-kapcsolas', term: 'Csillagkapcsolás (Y)', en: 'star (wye) connection', topic: 'harom', short: 'A három fázistekercs (fogyasztó) egyik végét közös pontba, a csillagpontba kötjük; a vonali feszültség a fázisfeszültség √3-szorosa, a vonali áram a fázisárammal egyenlő.',
        visual: starDeltaSvg, caption: 'Bal oldalon csillag-, jobb oldalon háromszögkapcsolás. v: vonali, f: fázismennyiség.',
        text: 'A csillagpont kivezethető **nullavezetőként** (N), ezért a csillagba kötött transzformátor-szekunder egyszerre ad 230 V-os (fázis–nulla) és 400 V-os (fázis–fázis) feszültséget. A vonali feszültség fázora 30°-kal siet a hozzá tartozó fázisfeszültséghez képest.\n\n**Csillag-háromszög indítás**: a háromszögben 400 V-ra tervezett motort indításkor csillagba kötik, így a tekercsekre csak 230 V jut; az indítóáram és az indítónyomaték is **harmadára** csökken.',
        example: 'U_v = 400 V → `U_f = 400 / √3 ≈ 231 V`. Fázisonként 23 Ω ohmos terhelés: `I = 10 A`, `P = 3 · 230 · 10 ≈ 6,9 kW`.',
        formulas: ['haromfazisu-teljesitmeny'],
        related: ['haromszog-kapcsolas', 'haromfazisu-rendszer', 'aszinkron-motor', 'transzformator'] },
      { id: 'haromszog-kapcsolas', term: 'Háromszögkapcsolás (Δ, delta)', en: 'delta connection', topic: 'harom', short: 'A három fázistekercs (fogyasztó) zárt háromszögbe kötve; a fázisfeszültség megegyezik a vonali feszültséggel, a vonali áram a fázisáram √3-szorosa.',
        text: 'Háromszögkapcsolásnál nincs csillagpont, így nullavezető sem. Az elosztótranszformátorok primer oldala jellemzően háromszög, szekundere csillag kivezetett csillagponttal (például `Dyn5` vagy `Dyn11` kapcsolási csoport): a háromszögben záródnak a 3. felharmonikus áramok.\n\nUgyanaz a három impedancia háromszögben **háromszor akkora** teljesítményt vesz fel, mint csillagban, mert mindegyikre √3-szor nagyobb feszültség jut.',
        example: 'Fázisonként 40 Ω ohmos terhelés 400 V-on, Δ: `I_f = 10 A`, `I_v ≈ 17,3 A`, `P = 12 kW`. Ugyanez Y-ban: `I = 5,77 A`, `P = 4 kW`.',
        pitfall: 'A motor adattábláján a „Δ 400 V / Y 690 V” azt jelenti, hogy a 400 V-os hálózaton **háromszögben** kell üzemeltetni. Ha egy „Δ 230 V / Y 400 V” motort 400 V-on háromszögbe kötnek, a tekercsek túlfeszültséget kapnak és leégnek.',
        formulas: ['haromfazisu-teljesitmeny'],
        related: ['csillag-kapcsolas', 'haromfazisu-rendszer', 'aszinkron-motor'] },

      /* ---------- Villamos gépek ---------- */
      { id: 'forgo-mezo', term: 'Forgó mágneses mező', en: 'rotating magnetic field', topic: 'gepek', short: 'Térben 120°-kal eltolt három tekercsben folyó, időben 120°-kal eltolt háromfázisú áramok által létrehozott, állandó nagyságú, szinkron fordulatszámmal forgó mágneses mező.',
        text: 'A három lüktető mező eredője egy állandó amplitúdójú, egyenletesen forgó mező (Ferraris és Tesla, 1880-as évek). Ez a háromfázisú gépek működésének alapja: az aszinkron motor forgórésze „lemaradva” követi, a szinkron gépé pontosan együtt forog vele.\n\nKét fázisvezető felcserélésével a forgásirány megfordul.',
        example: '50 Hz-en egy 2 pólusú (p = 1) mező 3000 1/min, egy 4 pólusú (p = 2) 1500 1/min, egy 6 pólusú 1000 1/min fordulatszámmal forog.',
        pitfall: 'A képletben p a **póluspárok** száma. Egy „4 pólusú motor” esetén p = 2, nem 4.',
        formulas: ['szinkron-fordulatszam'],
        related: ['haromfazisu-rendszer', 'aszinkron-motor', 'szinkron-gep'] },
      { id: 'transzformator', term: 'Transzformátor', en: 'transformer', topic: 'gepek', short: 'Közös vasmagon elhelyezett, mágnesesen csatolt tekercsekből álló statikus villamos gép, amely a váltakozó feszültséget azonos frekvencián más feszültségszintre alakítja, galvanikus leválasztással.',
        visual: trafoSvg, caption: 'A primer tekercs árama a vasmagban váltakozó fluxust kelt, amely a szekunder tekercsben feszültséget indukál.',
        text: 'Veszteségei:\n- **vasveszteség** (hiszterézis és örvényáram) – közel állandó, üresjárási méréssel határozható meg; csökkentésére a vasmag szigetelt lemezekből készül;\n- **tekercsveszteség** (rézveszteség) – az áram négyzetével nő, rövidzárási méréssel határozható meg.\n\nNagy transzformátorok hatásfoka 99% feletti. A **drop** (rövidzárási feszültség, u_k, jellemzően 4–6%) megmutatja, mekkora primer feszültség hajtja át a névleges áramot rövidre zárt szekunder mellett; ez korlátozza a zárlati áramot is.',
        formulas: ['transzformator-attetel'],
        pitfall: 'A transzformátor egyenfeszültséget nem alakít át: egyenáramra kapcsolva csak a tekercsellenállás korlátozza az áramot. Áramváltó szekunder körét üzem közben nem szabad megszakítani, mert veszélyesen nagy feszültség indukálódik.',
        related: ['latszolagos-teljesitmeny', 'csillag-kapcsolas', 'zarlati-aram', 'forgo-mezo'] },
      { id: 'aszinkron-motor', term: 'Aszinkron (indukciós) motor', en: 'induction motor', topic: 'gepek', short: 'Háromfázisú motor, amelynek forgórészében a forgó mező indukál áramot; nyomatékot csak a szinkronnál kisebb fordulatszámon, vagyis szlippel fejt ki.',
        visual: asyncSvg, caption: 'Nyomaték–fordulatszám jelleggörbe (Kloss-képlet) ventilátorjellegű terheléssel. A stabil munkapont a billenőnyomaték és a szinkron fordulatszám között van.',
        text: 'A legelterjedtebb ipari motor: a **kalickás forgórész** (rövidre zárt alumínium vagy réz rudak) egyszerű, olcsó, kefe nélküli. Ha a forgórész szinkron fordulatszámmal forogna, nem metszené a mező, nem indukálódna benne áram, és nyomaték sem keletkezne.\n\nJellemzők: indítóáram a névleges 5–8-szorosa, névleges szlip 2–6%, cos φ 0,8–0,88. Fordulatszáma **frekvenciaváltóval** (U/f vagy vektorszabályozással) folyamatosan állítható.',
        formulas: ['szinkron-fordulatszam'],
        example: '4 pólusú, 50 Hz-es motor adattábláján n = 1440 1/min: `n_s = 1500 1/min`, `s = 4%`. A forgórészáram frekvenciája `s · f = 2 Hz`.',
        pitfall: 'Az aszinkron motor fordulatszáma nem „hálózati frekvencia · 60”: a pólusszámot és a szlipet is figyelembe kell venni. Az indítóáram miatt motorkörbe C vagy D karakterisztikájú kismegszakító vagy motorvédő kapcsoló kell.',
        related: ['forgo-mezo', 'szinkron-gep', 'csillag-kapcsolas', 'haromszog-kapcsolas', 'teljesitmenytenyezo'], models: ['elektromos-auto'] },
      { id: 'szinkron-gep', term: 'Szinkron gép', en: 'synchronous machine', topic: 'gepek', short: 'Váltakozó áramú gép, amelynek egyenárammal gerjesztett vagy állandó mágneses forgórésze pontosan a forgó mező szinkron fordulatszámával forog.',
        text: 'Az erőművek generátorai szinkron gépek: a gőzturbinás **turbógenerátor** 2 pólusú (3000 1/min), a vízerőművi gépek sokpólusúak és lassúak. Terheléskor a forgórész a mezőhöz képest egy **terhelési szöggel** (ϑ) elfordul; a leadott teljesítmény ennek szinuszával arányos.\n\nA gerjesztőáram változtatásával a gép **meddő teljesítményt** ad vagy vesz fel: túlgerjesztve kapacitív fogyasztóként viselkedik (szinkron kompenzátor). Az elektromos autók többségében állandó mágneses szinkronmotor (PMSM) dolgozik, frekvenciaváltóról táplálva.',
        pitfall: 'Hálózatra kapcsolt szinkron gép magától nem indul el, és ha a terhelési szög túllépi a 90°-ot (statikus stabilitási határ), a gép „kiesik a szinkronizmusból”.',
        related: ['forgo-mezo', 'aszinkron-motor', 'meddo-teljesitmeny'], models: ['elektromos-auto'] },

      /* ---------- Érintés- és hálózatvédelem ---------- */
      { id: 'foldelesi-rendszerek', term: 'Földelési rendszerek (TN-S, TN-C-S, TT)', en: 'earthing systems', topic: 'vedelem', short: 'A kisfeszültségű hálózatok osztályozása: az első betű a táppont földhöz való viszonyát, a második a fogyasztói testek bekötését, az utána álló S vagy C a nulla- és védővezető különválasztását (S) vagy egyesítését (C) jelöli.',
        visual: earthSvg, caption: 'L fázisvezető (barna), N nullavezető (kék), PE védővezető, PEN egyesített nulla- és védővezető (zöld-sárga).',
        text: '- **TN-S**: a táppont földelt, a testek külön védővezetőn (PE) át csatlakoznak hozzá, N és PE végig külön fut.\n- **TN-C-S**: a hálózaton egyesített PEN-vezető fut, amelyet az épület csatlakozási pontján (főelosztó) szétválasztanak N-re és PE-re. Magyarországon ez a leggyakoribb (a korábbi „nullázás”).\n- **TT**: a táppont földelt, a fogyasztói testek **saját földelőhöz** kapcsolódnak; a hibaáram a földön keresztül záródik, ezért kicsi, így áram-védőkapcsoló kell.\n- **IT**: a táppont szigetelt (kórházi műtők, ipar); az első testzárlat nem okoz lekapcsolást.',
        pitfall: 'A szétválasztás után a nulla- és a védővezetőt **tilos** újra összekötni (például a dugaljban). A PEN-vezető szakadása TN-C szakaszon azt okozhatja, hogy a testek a fázisfeszültségre kerülnek.',
        related: ['erintesvedelem', 'aram-vedokapcsolo', 'zarlati-aram', 'haromfazisu-rendszer'], models: ['elosztoszekreny'] },
      { id: 'erintesvedelem', prereq: ['lecke:villanyszereles/biztonsag'], term: 'Érintésvédelem (áramütés elleni védelem)', en: 'protection against electric shock', topic: 'vedelem', short: 'Műszaki intézkedések összessége, amelyek megakadályozzák, hogy ember vagy állat veszélyes testáramot kapjon: alapvédelem a közvetlen és hibavédelem a közvetett érintés ellen.',
        text: '- **Alapvédelem** (közvetlen érintés ellen): az aktív részek szigetelése, burkolat, elzárás.\n- **Hibavédelem** (közvetett érintés ellen, ha a szigetelés meghibásodik): önműködő tápleválasztás védővezetővel és túláram- vagy áram-védőkapcsolóval; kettős vagy megerősített szigetelés (II. érintésvédelmi osztály); villamos elválasztás.\n- **Törpefeszültség** (SELV, PELV): legfeljebb 50 V AC vagy 120 V DC.\n- **Kiegészítő védelem**: 30 mA-es áram-védőkapcsoló.\n\nA tartósan megengedett érintési feszültség 50 V AC. 230 V-os TN-végáramkörben a lekapcsolás ideje legfeljebb 0,4 s, TT-rendszerben 0,2 s. A testáram hatásai: kb. 0,5 mA érzékelhető, 10 mA körül már nem lehet elengedni a vezetőt, néhányszor 10 mA felett, idővel növekvő valószínűséggel szívkamra-fibrilláció léphet fel.',
        formulas: ['hurokimpedancia'],
        pitfall: 'A védőföldelés önmagában nem véd: csak akkor hatásos, ha hiba esetén **a védelem lekapcsol**, vagy az érintési feszültség 50 V alatt marad. Bekötetlen védővezető mellett a fém ház testzárlatkor a teljes 230 V-ot kapja.',
        related: ['foldelesi-rendszerek', 'aram-vedokapcsolo', 'zarlati-aram'], models: ['elosztoszekreny'] },
      { id: 'zarlati-aram', prereq: ['lecke:villanyszereles/vedelmek'], term: 'Zárlati áram és hurokimpedancia', en: 'short-circuit current, fault loop impedance', topic: 'vedelem', short: 'Zárlatkor a hibahelyen át, kis impedancián folyó, a névlegesnél sokszorosan nagyobb áram; nagyságát a táppont feszültsége és a hibahurok impedanciája határozza meg: I_z = U₀ / Z_s.',
        text: 'A hibahurok a transzformátor tekercséből, a fázisvezetőből és a visszavezető PE- vagy PEN-vezetőből áll; a hálózat a hibahely felől nézve tulajdonképpen egy **Thévenin-helyettesítés**. Két követelményt kell ellenőrizni:\n1. a zárlati áram legyen **elég nagy** ahhoz, hogy a védelem az előírt időn belül lekapcsoljon (`Z_s · I_a ≤ U_0`);\n2. a legnagyobb zárlati áram ne haladja meg a védőkészülék **zárlati megszakítóképességét** (például 6 kA vagy 10 kA).\n\nA hurokimpedanciát a felülvizsgálat során hurokimpedancia-mérővel mérik.',
        formulas: ['hurokimpedancia'],
        example: 'B16 kismegszakító mögött `Z_s ≤ 2,88 Ω` kell. Mért érték 1,2 Ω → `I_z ≈ 192 A`, ami a 80 A-es mágneses kioldási küszöb fölött van: megfelel.',
        pitfall: 'Hosszú, kis keresztmetszetű kábel végén a hurokimpedancia nagy, ezért zárlatkor a kismegszakító nem a gyors (mágneses), hanem csak a lassú (termikus) kioldóval old ki. Megoldás: nagyobb keresztmetszet, kisebb névleges áram vagy áram-védőkapcsoló. Ne feledd: üzemmeleg vezető ellenállása nagyobb, mint a hidegen mért érték.',
        related: ['thevenin', 'erintesvedelem', 'foldelesi-rendszerek', 'transzformator', 'aram-vedokapcsolo'], models: ['elosztoszekreny'] },
      { id: 'aram-vedokapcsolo', prereq: ['lecke:villanyszereles/vedelmek', 'modell:elosztoszekreny'], term: 'Áram-védőkapcsoló (ÁVK, RCD, „Fi-relé”)', en: 'residual current device (RCD)', topic: 'vedelem', short: 'Védőkészülék, amely a fázis- és nullavezető(k) áramának különbségét, vagyis a föld felé elfolyó hibaáramot méri, és az I_Δn névleges különbözeti áram túllépésekor lekapcsol.',
        text: 'Működése Kirchhoff I. törvényén alapul: ép áramkörben az odafolyó és a visszafolyó áram összege nulla. Az összegáram-transzformátoron átvezetett vezetők árama hiba esetén nem egyenlíti ki egymást, és a különbség működteti a kioldót.\n\n- 30 mA: személyvédelem (kiegészítő védelem dugaljkörökben, fürdőszobában);\n- 100–300 mA: tűzvédelem;\n- típusok: **AC** (csak szinuszos), **A** (lüktető egyenáramú hibaáramra is), **F**, **B** (sima egyenáramú hibaáramra is; például elektromos autó töltőjéhez A típus + 6 mA DC-érzékelés vagy B típus).\n\nTT-rendszerben a feltétel: `R_A · I_Δn ≤ 50 V`.',
        example: 'R_A = 100 Ω földelési ellenállás, I_Δn = 30 mA: `100 · 0,03 = 3 V`, ami jóval 50 V alatt van.',
        pitfall: 'Az áram-védőkapcsoló **nem véd** a fázis és a nulla egyidejű érintése ellen, ha a test el van szigetelve a földtől (ilyenkor nincs különbözeti áram). PEN-vezetős (TN-C) szakaszon nem használható, és a védett kör nullavezetőjét tilos más körökével közösíteni.',
        related: ['erintesvedelem', 'foldelesi-rendszerek', 'zarlati-aram', 'kirchhoff-1'], models: ['elosztoszekreny'] },
      /* ---------- Bővítés: hálózatszámítás, tranziensek, energiatechnika ---------- */
      { id: 'hurokaramok', term: 'Hurokáramok módszere', en: 'mesh current method', topic: 'dc', prereq: ['villamosmernoki/kirchhoff-2', 'linearis-algebra/linearis-egyenletrendszer'],
        short: 'Hálózatszámítási eljárás, amelyben minden független hurokhoz egy fiktív körbefolyó áramot rendelünk, és a huroktörvényből annyi egyenletet írunk fel, ahány hurok van.',
        text: 'Egy b ágú, n csomópontú, összefüggő hálózatban a független hurkok száma `h = b − n + 1`. Síkba rajzolható hálózatnál ezek egyszerűen a „szemek” (ablakok). Minden szemhez egy **hurokáramot** rendelünk (például mind óramutató irányában); egy ág tényleges árama a rajta átfolyó hurokáramok előjeles összege. Így Kirchhoff I. törvénye automatikusan teljesül, és csak a huroktörvényt kell felírni.\n\nA lépések:\n\n1. Hurokáramok kijelölése (I_1, I_2, …).\n2. Minden hurokra: a hurok saját ellenállásainak összege szorozva a saját hurokárammal, mínusz a közös ellenállások szorozva a szomszédos hurokárammal, egyenlő a hurokban lévő forrásfeszültségek előjeles összegével.\n3. A kapott lineáris egyenletrendszer megoldása (Gauss-elimináció, Cramer-szabály).\n4. Ágáramok, majd feszültségek visszaszámolása.\n\nMátrixos alakban `R · I = U`, ahol R szimmetrikus: a főátlóban a hurkok saját ellenállásai, a főátlón kívül a közös ellenállások negatív előjellel. Ez a **csomóponti potenciálok módszerének** duális párja: ott a csomópontok, itt a hurkok száma adja az ismeretlenekét, ezért azt érdemes választani, amelyikből kevesebb van.',
        example: 'Két szem: U_1 = 10 V forrás, R_1 = 2 Ω a bal szemben, R_2 = 4 Ω közös ág, R_3 = 4 Ω a jobb szemben (forrás nélkül).\n\n- bal: `(2 + 4) · I_1 − 4 · I_2 = 10`\n- jobb: `−4 · I_1 + (4 + 4) · I_2 = 0` → `I_1 = 2 · I_2`\n\nBehelyettesítve `12 · I_2 − 4 · I_2 = 10`, `I_2 = 1,25 A`, `I_1 = 2,5 A`; a közös ágban `I_1 − I_2 = 1,25 A` folyik.',
        pitfall: 'Áramgenerátort tartalmazó ágnál a hurokáram nem szabad ismeretlen: ha az áramforrás csak egy hurokhoz tartozik, az a hurokáram egyszerűen ismert; ha két hurok közös ágában van, **szuperhurkot** kell képezni. A közös ellenállás tagjának előjele azonos körüljárási irányoknál mindig negatív.',
        related: ['kirchhoff-2', 'kirchhoff-1', 'csomoponti-potencial', 'szuperpozicio'], tags: ['hálózatszámítás', 'módszer'] },
      { id: 'szuperpozicio', term: 'Szuperpozíció tétele', en: 'superposition theorem', topic: 'dc', prereq: ['villamosmernoki/ohm-torveny', 'linearis-algebra/linearis-lekepezes'],
        short: 'Lineáris hálózatban bármely ág árama (feszültsége) egyenlő az egyes független források által külön-külön létrehozott áramok (feszültségek) előjeles összegével.',
        text: 'A tétel a linearitás közvetlen következménye: ha a hálózat elemei (R, L, C, vezérelt források) lineárisak, akkor a válasz a gerjesztések lineáris függvénye. Számításkor egyszerre **egy** független forrást hagyunk meg, a többit „kikapcsoljuk”:\n\n- az ideális **feszültségforrást rövidzárral** helyettesítjük (U = 0),\n- az ideális **áramforrást szakadással** helyettesítjük (I = 0),\n- a vezérelt (függő) forrásokat **bent hagyjuk**, mert azok a hálózat részei, nem gerjesztések.\n\nAz egyes részeredményeket előjelhelyesen összeadjuk. A módszer különösen hasznos, ha a források különböző jellegűek: például egyenáramú munkaponti és kis váltakozó jel egy erősítőben, vagy különböző frekvenciájú szinuszos források. Ilyenkor minden frekvencián külön fázoros számítást végzünk, és az **időfüggvényeket** adjuk össze, a fázorokat nem.\n\nA szuperpozíció a Thévenin- és a Norton-tétel bizonyításának alapja is, és ezen nyugszik a jelek Fourier-összetevőkre bontása is (felharmonikus-számítás).\n\n**Mikor érdemes használni?** Ha kevés forrás van, de a hálózat bonyolult, a szuperpozíció gyakran kevesebb számolást igényel, mint egy teljes egyenletrendszer, mert minden részfeladat egyszerű soros–párhuzamos összevonásra vezet. Sok forrás esetén viszont a csomóponti potenciálok vagy a hurokáramok módszere hatékonyabb. A módszer ellenőrzésre is kiváló: egy bonyolult számítás eredményét a részeredmények összegével vethetjük össze.',
        example: 'U_1 = 12 V és R_1 = 4 Ω soros ág, párhuzamosan vele R_2 = 4 Ω terhelés, és ugyanerre a csomópontra egy I = 2 A-es áramforrás.\n\n- Csak U_1: `U_R2 = 12 · 4/(4 + 4) = 6 V`.\n- Csak I (U_1 rövidzár): R_1 ∥ R_2 = 2 Ω, `U_R2 = 2 · 2 = 4 V`.\n\nÖsszesen `U_R2 = 10 V`.',
        pitfall: 'A **teljesítmény nem szuperponálható**, mert az áram négyzetével arányos: az egyes forrásokból számolt teljesítmények összege általában nem a valódi teljesítmény. Nemlineáris elemet (diódát, telítődő vasmagot) tartalmazó hálózatra a tétel nem alkalmazható, legfeljebb egy munkapont körül linearizálva.',
        related: ['thevenin', 'norton', 'hurokaramok', 'felharmonikusok'], tags: ['hálózatszámítás', 'linearitás'] },
      { id: 'max-teljesitmeny-atvitel', term: 'Maximális teljesítményátvitel (illesztés)', en: 'maximum power transfer theorem', topic: 'dc', prereq: ['villamosmernoki/thevenin', 'analizis/szelsoertek'],
        short: 'Egy belső ellenállású forrás akkor ad le a legnagyobb teljesítményt a terhelésnek, ha a terhelés ellenállása megegyezik a forrás belső ellenállásával; ekkor a hatásfok 50%.',
        text: 'Bármely lineáris kétpólus helyettesíthető Thévenin-generátorral (U_0, R_b). R_t terhelésen az áram `I = U_0 / (R_b + R_t)`, a teljesítmény\n\n`P(R_t) = U_0² · R_t / (R_b + R_t)²`.\n\nHa R_t nagyon kicsi, az áram nagy, de a feszültség kicsi; ha R_t nagyon nagy, a feszültség nagy, de az áram kicsi – mindkét szélső esetben P → 0. A derivált `dP/dR_t = 0` feltételből `R_t = R_b` adódik, és ekkor `P_max = U_0² / (4 · R_b)`.\n\nVáltakozó áramon (Z_b = R_b + jX_b) a teljesítmény a terhelés **konjugált illesztésével** maximális: `Z_t = R_b − jX_b`, vagyis a reaktanciák rezonanciában kioltják egymást.\n\nHol fontos? Ahol a **jel** a drága és kicsi: antennák, rádiófrekvenciás erősítők, távvezetékek (itt a hullámimpedanciára illesztés a visszaverődést is megszünteti), érzékelők. Ahol viszont az **energia** a fontos (erőmű, hálózat, akkumulátor), ott soha nem illesztünk: ott `R_t ≫ R_b`, mert a cél a nagy hatásfok, és a forrás belső vesztesége hő formájában még károsítaná is a forrást.',
        formulas: ['max-teljesitmeny'],
        example: 'Egy 1,5 V-os, 0,5 Ω belső ellenállású elemből legfeljebb `1,5² / (4 · 0,5) ≈ 1,1 W` vehető ki (0,5 Ω terheléssel). 10 Ω-os terhelésnél csak ≈ 0,2 W, de a hatásfok ≈ 95%.',
        pitfall: 'Az illesztés a **terhelést** választja a forráshoz, nem fordítva: adott terheléshez a forrás belső ellenállását mindig a lehető legkisebbre érdemes választani. Az 50%-os hatásfokú illesztett állapot energetikai rendszerekben hiba, nem cél.',
        related: ['thevenin', 'norton', 'ohm-torveny', 'hatasos-teljesitmeny'], tags: ['illesztés', 'hatásfok'] },

      { id: 'energiatarolok', term: 'Kondenzátor és tekercs mint energiatároló', en: 'capacitor and inductor as energy storage elements', topic: 'tranziens', prereq: ['fizika-bsc/elektromos-terero', 'fizika-bsc/faraday-indukcio', 'analizis/derivalt'],
        short: 'A kondenzátor az elektromos térben, a tekercs a mágneses térben tárol energiát; ezért a kondenzátor feszültsége és a tekercs árama nem változhat ugrásszerűen.',
        text: 'A két reaktív elem időtartománybeli egyenlete:\n\n- kondenzátor: `i = C · du/dt` (a töltés `q = C · u`),\n- tekercs: `u = L · di/dt` (a fluxuskapcsolódás `Ψ = L · i`).\n\nA beléjük áramló teljesítmény `p = u · i`, ennek integrálja a tárolt energia: `W_C = ½ · C · U²` és `W_L = ½ · L · I²`. Ideális esetben ez az energia nem alakul hővé, hanem visszanyerhető – ezért nevezzük őket **reaktív**, a rezisztenciát pedig **disszipatív** elemnek.\n\nA legfontosabb következmény a **folytonossági feltétel**: mivel véges teljesítménnyel az energia nem változhat ugrásszerűen, `u_C(0⁺) = u_C(0⁻)` és `i_L(0⁺) = i_L(0⁻)`. A kondenzátor áramja és a tekercs feszültsége viszont ugorhat. Bekapcsoláskor az üres kondenzátor tehát pillanatnyilag **rövidzárként**, az áramtalan tekercs **szakadásként** viselkedik; állandósult egyenáramú állapotban fordítva: a kondenzátor szakadás, a tekercs rövidzár.\n\nA dualitás teljes: u ↔ i, C ↔ L, soros ↔ párhuzamos. Gyakorlati alkalmazások: pufferkondenzátor, kapcsolóüzemű tápegységek tekercsei, gyújtótekercs, fényképezőgép-vaku, ultrakondenzátoros energiatárolás.',
        formulas: ['tarolt-energia'],
        example: 'Egy kapcsolóüzemű táp 10 µH-s tekercsén 5 A folyik: `W_L = 0,5 · 10⁻⁵ · 25 = 125 µJ`. Ha a táp 500 kHz-en kapcsol, és minden periódusban ennyi energiát ad át, az `125 µJ · 500 000 1/s ≈ 62 W` átvitt teljesítmény.',
        pitfall: 'Induktív kör (relétekercs, motor) áramát hirtelen megszakítva `u = L · di/dt` igen nagy lesz: ez ív, szikra, tönkrement tranzisztor. Ezért kell a tekercs mellé **szabadonfutó dióda** vagy túlfeszültség-levezető. A feltöltött kondenzátor a lekapcsolás után is veszélyes feszültséget tarthat: kisütő ellenállás kell.',
        related: ['rc-tranziens', 'rl-tranziens', 'reaktancia', 'rezonancia'], tags: ['energia', 'tranziens'] },
      { id: 'rc-tranziens', term: 'RC-kör tranziense (fel- és kisütés)', en: 'RC circuit transient', topic: 'tranziens', prereq: ['villamosmernoki/energiatarolok', 'analizis/linearis-de', 'analizis/exponencialis-novekedes'],
        short: 'Soros RC-kör be- vagy kikapcsolásakor a kondenzátor feszültsége exponenciálisan, τ = R · C időállandóval közelít az új állandósult értékhez.',
        text: 'Kapcsoljunk U_0 egyenfeszültséget egy soros R–C körre t = 0-ban. Kirchhoff II. törvénye és `i = C · du_C/dt` alapján\n\n`R · C · du_C/dt + u_C = U_0`,\n\nami elsőrendű, állandó együtthatós lineáris differenciálegyenlet. Kezdetben üres kondenzátorral (u_C(0) = 0) a megoldás\n\n`u_C(t) = U_0 · (1 − e^(−t/τ))`, `i(t) = (U_0/R) · e^(−t/τ)`, ahol `τ = R · C`.\n\nAz áram a bekapcsolás pillanatában ugrik U_0/R-re (a kondenzátor ekkor rövidzár), majd exponenciálisan csökken. Kisütéskor `u_C(t) = U_0 · e^(−t/τ)`.\n\n**Általános recept** minden elsőrendű körre (háromérték-módszer):\n\n1. kezdeti érték `x(0⁺)` a folytonossági feltételből,\n2. végérték `x(∞)` az állandósult állapotból (C szakadás),\n3. időállandó `τ = R_e · C`, ahol R_e a kondenzátor felől látott Thévenin-ellenállás (források kikapcsolva),\n4. `x(t) = x(∞) + (x(0⁺) − x(∞)) · e^(−t/τ)`.\n\nAz exponenciális görbe érintője t = 0-ban éppen τ-nál metszi a végértéket. Gyakorlati ökölszabály: **5τ** után a jelenség lezajlottnak tekinthető. Alkalmazás: időzítők, reset-késleltetés, nyomógomb-pergésmentesítés, aluláteresztő szűrő.',
        formulas: ['rc-tranziens'],
        example: '5 V-os mikrovezérlő reset-bemenetén R = 10 kΩ, C = 10 µF: `τ = 0,1 s`. A bemenet a 0,7 · 5 = 3,5 V-os szintet `t = −τ · ln(1 − 0,7) ≈ 1,2 · τ = 0,12 s` múlva éri el – addig a processzor reset-ben marad.',
        pitfall: 'Az időállandóban nem feltétlenül a látható soros ellenállás szerepel, hanem a kondenzátor kapcsai felől nézett **eredő** ellenállás. Feszültségosztóról táplált kondenzátornál például `R_e = R_1 ∥ R_2`, a végérték pedig az osztott feszültség.',
        related: ['energiatarolok', 'rl-tranziens', 'thevenin', 'kirchhoff-2'], tags: ['tranziens', 'időállandó'] },
      { id: 'rl-tranziens', term: 'RL-kör tranziense (be- és kikapcsolás)', en: 'RL circuit transient', topic: 'tranziens', prereq: ['villamosmernoki/energiatarolok', 'analizis/linearis-de'],
        short: 'Soros RL-kör bekapcsolásakor az áram τ = L / R időállandóval exponenciálisan nő az U/R végértékig; kikapcsoláskor a tekercs a megszakításon nagy feszültséget hoz létre.',
        text: 'U_0 egyenfeszültségre kapcsolt soros R–L körre: `L · di/dt + R · i = U_0`. Áramtalan kezdőállapotból\n\n`i(t) = (U_0/R) · (1 − e^(−t/τ))`, `u_L(t) = U_0 · e^(−t/τ)`, `τ = L / R`.\n\nA tekercs bekapcsoláskor **szakadásként** viselkedik (a teljes feszültség rajta esik), állandósult állapotban rövidzár. Ez a kondenzátoros eset duális párja.\n\n**Kikapcsolás – a veszélyes rész.** Ha az I áramú kört egy kapcsoló hirtelen megszakítja, a tekercs árama nem tud nullára ugrani, ezért `u_L = L · di/dt` addig nő, amíg az áram valamerre utat nem talál: átüt a kapcsoló érintkezői között (ív), vagy tönkreteszi a kapcsoló tranzisztort. Védekezés:\n\n- **szabadonfutó dióda** a tekercsel párhuzamosan (záróirányban): az áram a diódán át kering tovább, és `τ = L / (R + R_dióda)` szerint lecseng;\n- RC-tag (snubber), Zener-dióda vagy varisztor, ha gyorsabb lecsengés kell (a lecsengési idő a megengedett feszültséggel fordítottan arányos).\n\nUgyanez a jelenség hasznos is lehet: így működik a gyújtótekercs és a boost konverter.\n\nVáltakozó áramú bekapcsoláskor a tranziens a kapcsolási pillanat fázisától függ: transzformátor bekapcsolásakor a vasmag telítődése miatt a névleges áram sokszorosa (**bekapcsolási áramlökés**) is folyhat, amit a védelmek kiválasztásánál figyelembe kell venni.',
        example: 'Relétekercs: L = 0,5 H, R = 100 Ω, 24 V. `τ = 5 ms`, a végérték 0,24 A, a meghúzáshoz szükséges 0,15 A-t `t = −τ · ln(1 − 0,625) ≈ 4,9 ms` után éri el. Szabadonfutó dióda nélkül 0,24 A megszakítása 1 µs alatt `≈ 0,5 · 0,24 / 10⁻⁶ = 120 kV` nagyságrendű feszültséget „akarna” – ez ív vagy átütés.',
        pitfall: 'A szabadonfutó dióda **lassítja** a relé elengedését (az áram lassan cseng le). Ha gyors elengedés kell, diódával sorba Zener-diódát tesznek. A dióda polaritása fordított a tápfeszültséghez képest – fordított bekötéssel rövidzárat okoz.',
        related: ['energiatarolok', 'rc-tranziens', 'transzformator', 'reaktancia'], tags: ['tranziens', 'induktivitás'] },

      { id: 'komplex-teljesitmeny', term: 'Komplex teljesítmény', en: 'complex power', topic: 'ac', prereq: ['villamosmernoki/fazor', 'villamosmernoki/latszolagos-teljesitmeny'],
        short: 'A feszültségfázor és az áramfázor konjugáltjának szorzata: `S = U · I* = P + jQ`; valós része a hatásos, képzetes része a meddő teljesítmény, abszolút értéke a látszólagos teljesítmény.',
        text: 'Ha `U = U · e^(jφ_u)` és `I = I · e^(jφ_i)` effektív értékű fázorok, akkor\n\n`S = U · I* = U · I · e^(j(φ_u − φ_i)) = U · I · cos φ + j · U · I · sin φ = P + jQ`.\n\nAz áram **konjugáltja** azért kell, hogy a kitevőben a két fázisszög **különbsége** (φ = φ_u − φ_i) jelenjen meg, ne az összege. Előjelkonvenció (fogyasztói irányrendszerben): induktív fogyasztónál Q > 0 (meddőt „fogyaszt”), kapacitívnál Q < 0 (meddőt „termel”).\n\nImpedanciával kifejezve `S = I² · Z = I² · R + j · I² · X`, így P a rezisztenciákon, Q a reaktanciákon jelentkezik. A komplex teljesítmény legfontosabb tulajdonsága a **megmaradás** (Tellegen-tétel következménye): egy hálózatban a források által leadott komplex teljesítmények összege egyenlő a fogyasztók által felvett komplex teljesítmények összegével. Ezért P és Q **külön-külön** összeadható, a látszólagos teljesítmény (S abszolút értéke) viszont nem!\n\nEz a hálózatelemzés alapja: a teljesítményáramlás-számítás (load flow) minden csomópontra P és Q egyensúlyát írja fel.',
        formulas: ['ac-teljesitmeny'],
        example: 'Két fogyasztó párhuzamosan: (1) P = 3 kW, Q = 4 kvar (S = 5 kVA), (2) P = 3 kW, Q = −4 kvar (S = 5 kVA). Összesen `S = 6 + j0 kVA`, vagyis 6 kVA – nem 10 kVA. A tápvezetékben csak 6 kVA-nek megfelelő áram folyik.',
        pitfall: 'Az `U · I` (konjugálás nélküli) szorzatnak nincs fizikai jelentése. A látszólagos teljesítmények számtani összeadása (kVA + kVA) csak azonos fázisszögű fogyasztóknál ad helyes eredményt.',
        related: ['hatasos-teljesitmeny', 'meddo-teljesitmeny', 'latszolagos-teljesitmeny', 'fazisjavitas', 'fazor'], tags: ['teljesítmény', 'komplex számítás'] },
      { id: 'fazisjavitas', term: 'Fázisjavítás (meddőkompenzáció)', en: 'power factor correction', topic: 'ac', prereq: ['villamosmernoki/teljesitmenytenyezo', 'villamosmernoki/meddo-teljesitmeny'],
        short: 'Az induktív fogyasztók meddő teljesítményének helyi ellensúlyozása (jellemzően kondenzátorokkal), hogy a hálózatból felvett áram és a vele járó veszteség csökkenjen.',
        text: 'Az aszinkron motorok, transzformátorok, fojtók mágnesezéshez meddő teljesítményt igényelnek. Ha ezt a hálózat szállítja, a vezetékekben a hatásos teljesítményhez szükségesnél nagyobb áram folyik: `I = P / (U · cos φ)`. Ennek következményei: nagyobb vezetékveszteség (`I² · R`), nagyobb feszültségesés, a transzformátorok és kábelek kapacitásának lekötése. Ezért a szolgáltatók a túlzott meddőfelvételt jellemzően külön elszámolják.\n\n**Megoldás:** a fogyasztóval párhuzamosan kondenzátort kapcsolunk, amely kapacitív (negatív) meddő teljesítményt ad. A meddő energia ettől kezdve a motor és a kondenzátor között „ingázik”, a hálózatból csak a maradék meddő folyik. A hatásos teljesítmény nem változik.\n\nFajták:\n\n- **egyedi** kompenzáció: közvetlenül a nagy motor mellett, a motorral együtt kapcsolva;\n- **csoportos** és **központi** kompenzáció: fokozatokra bontott kondenzátortelep, amelyet egy meddőteljesítmény-szabályozó kapcsolgat a pillanatnyi cos φ szerint;\n- **aktív** kompenzáció: teljesítményelektronikai átalakító, amely a meddőt és a felharmonikusokat is kezeli.\n\nA cél jellemzően cos φ ≈ 0,9–0,95 induktív; a túlkompenzálás (kapacitív üzem) feszültségemelkedést okoz. Felharmonikusokkal terhelt hálózaton a kondenzátor és a hálózati induktivitás rezonanciába kerülhet, ezért ott **fojtott** (soros fojtóval hangolt) kondenzátortelep kell.',
        formulas: ['fazisjavito-kondenzator'],
        example: 'Egy 400 V-os, 50 kW-os üzem cos φ = 0,75 mellett `I = 50000 / (√3 · 400 · 0,75) ≈ 96 A` áramot vesz fel. cos φ = 0,95-re javítva ≈ 76 A, a vezetékveszteség `(76/96)² ≈ 0,63`-szorosára, vagyis kb. 37%-kal csökken. A szükséges `Q_C = 50 · (0,882 − 0,329) ≈ 28 kvar`.',
        pitfall: 'A fázisjavítás nem csökkenti a fogyasztó hatásos energiafelhasználását (a kWh-t), csak a hálózati áramot és veszteségeket. Nemlineáris (egyenirányítós) fogyasztók rossz teljesítménytényezőjét kondenzátor nem javítja, mert ott a felharmonikusok okozzák, nem a fáziseltolás.',
        related: ['teljesitmenytenyezo', 'meddo-teljesitmeny', 'komplex-teljesitmeny', 'rezonancia', 'felharmonikusok', 'aszinkron-motor'], tags: ['energiatakarékosság', 'meddő'] },
      { id: 'felharmonikusok', term: 'Felharmonikusok és torzítás', en: 'harmonics and distortion', topic: 'ac', prereq: ['villamosmernoki/effektiv-ertek', 'analizis/vegtelen-sor'],
        short: 'Egy periodikus, de nem szinuszos áram vagy feszültség felbontható az alapfrekvencia egész számú többszöröseivel rezgő szinuszos összetevőkre; ezek a felharmonikusok.',
        text: 'Fourier tétele szerint minden (elég sima) T periódusú jel előáll szinuszos összetevők összegeként: `i(t) = I_0 + Σ Î_k · sin(kω₁t + φ_k)`, ahol ω₁ = 2π/T az alapharmonikus körfrekvenciája. **Félhullám-szimmetrikus** jelekben (a pozitív és negatív félperiódus tükörképei) csak páratlan felharmonikusok vannak – ez a hálózatokban a tipikus eset.\n\n**Forrásuk** a nemlineáris fogyasztók: egyenirányító + pufferkondenzátor (tápegységek, LED-meghajtók, frekvenciaváltók), ívkemencék, telítődő vasmagok. Ezek a szinuszos feszültségből csúcsos áramot vesznek fel.\n\n**Hatásaik:**\n\n- többletmelegedés vezetékekben, transzformátorokban (örvényáram), motorokban;\n- a felharmonikus áramok a hálózat impedanciáján a feszültséget is torzítják;\n- a 3. (és 3 többszörösei) felharmonikus a háromfázisú rendszer három fázisában **azonos fázisú**, ezért a nullavezetőben nem kioltják, hanem **összeadódnak**;\n- kondenzátortelepekkel rezonancia, elektronikus eszközök hibás működése.\n\n**Mérőszám:** a THD (teljes harmonikus torzítás). Csökkentés: passzív szűrő (hangolt LC-kör), fojtó, aktív szűrő, aktív teljesítménytényező-javítás (PFC) a tápegységekben, illetve több impulzusú (12, 18 ütemű) egyenirányító.\n\nA felharmonikusok rendűsége a háromfázisú rendszerben sorrendet is jelent: az 5., 11., … harmonikus negatív sorrendű (a motorokban fékező nyomatékot ad), a 7., 13., … pozitív sorrendű, a 3. és többszörösei zérus sorrendűek. A hálózati feszültség torzítására a szabványok határértékeket írnak elő, és a nagy fogyasztók felharmonikus-kibocsátását is korlátozzák.',
        formulas: ['thd'],
        example: 'Irodaépület, sok számítógéppel: minden fázisban 30 A effektív áram, ebből a 3. harmonikus 15 A. A nullavezetőben az alapharmonikusok kioltják egymást, de a 3. harmonikusok összeadódnak: `I_N ≈ 3 · 15 = 45 A` – nagyobb, mint egy fázisáram.',
        pitfall: 'A felharmonikusokkal terhelt áramot csak **valódi effektív értéket mérő** (true RMS) műszer méri helyesen; az átlagértéket mérő, szinuszra kalibrált műszer akár 30–40%-kal kevesebbet mutat. A nullavezető keresztmetszetét ilyen hálózaton nem szabad csökkenteni.',
        related: ['effektiv-ertek', 'teljesitmenytenyezo', 'fazisjavitas', 'aszimmetrikus-terheles', 'szuperpozicio'], tags: ['hálózati minőség', 'Fourier'] },

      { id: 'aszimmetrikus-terheles', term: 'Aszimmetrikus terhelés és a nullavezető', en: 'unbalanced three-phase load and neutral conductor', topic: 'harom', prereq: ['villamosmernoki/csillag-kapcsolas', 'villamosmernoki/fazor', 'villamosmernoki/kirchhoff-1'],
        short: 'Ha a három fázis terhelése nem egyforma, a fázisáramok összege nem nulla: a különbség a nullavezetőn folyik vissza; nullavezető hiányában a csillagpont eltolódik.',
        text: 'Szimmetrikus csillag-terhelésnél a három, egymáshoz képest 120°-kal eltolt, egyenlő nagyságú áramfázor összege nulla, ezért a nullavezető árammentes. A háztartási és kereskedelmi fogyasztók azonban egyfázisúak, így a valóságban a terhelés szinte mindig **aszimmetrikus**. Kirchhoff I. törvénye a csillagpontra:\n\n`I_N = I_L1 + I_L2 + I_L3` (fázorosan!).\n\n**Négyvezetős rendszerben** (nullavezetővel) a nullavezető rögzíti a csillagpont potenciálját, így minden fogyasztó a saját fázisfeszültségét (230 V) kapja, a terhelésektől függetlenül; a különbségi áram a nullavezetőn folyik.\n\n**Nullavezető nélkül** (vagy nullaszakadáskor) a fogyasztói csillagpont a terhelésektől függő helyre tolódik el. A kis impedanciájú (nagy teljesítményű) fázison lecsökken, a nagy impedanciájú (kis teljesítményű) fázison megnő a feszültség – akár a vonali feszültség (400 V) közelébe. Ez a **nullavezető-szakadás** veszélye: tönkremennek az érzékeny készülékek. Ezért tilos a nullavezetőbe biztosítót vagy önálló kapcsolót tenni (TN-C rendszerben a PEN-vezetőbe különösen).\n\nAz aszimmetria elemzésének általános eszköze a **szimmetrikus összetevők** módszere (Fortescue, 1918): bármely aszimmetrikus fázorhármas felbontható pozitív, negatív és zérus sorrendű szimmetrikus hármasokra. A nullavezető árama a zérus sorrendű áram háromszorosa.',
        example: 'Ohmos terhelések: L1-en 10 A, L2-n 10 A, L3-on 0 A. Két egyenlő, 120°-ra lévő fázor összege ugyanakkora nagyságú: `I_N = 10 A`. Ha L1 = 10 A, L2 = 5 A, L3 = 0: `|I_N| = √(10² + 5² − 10 · 5) = √75 ≈ 8,7 A`.',
        pitfall: 'A nullavezető árama **nem** a fázisáramok számtani különbsége (10 − 5 = 5 A), hanem fázoros összeg. Felharmonikusokkal terhelt rendszerben szimmetrikus terhelésnél is folyhat jelentős nullavezető-áram (3. harmonikus).',
        related: ['csillag-kapcsolas', 'haromfazisu-rendszer', 'felharmonikusok', 'foldelesi-rendszerek', 'kirchhoff-1'], tags: ['háromfázis', 'biztonság'] },

      { id: 'transzformator-helyettesito', term: 'Transzformátor helyettesítő kapcsolása és veszteségei', en: 'transformer equivalent circuit and losses', topic: 'gepek', prereq: ['villamosmernoki/transzformator', 'villamosmernoki/impedancia'],
        short: 'A valós transzformátor egy ideális transzformátor plusz soros (tekercsellenállás, szórási reaktancia) és párhuzamos (vasveszteség, mágnesező reaktancia) elemek; paramétereit az üresjárási és a rövidzárási mérés adja.',
        text: 'Az ideális transzformátort (`U_1/U_2 = N_1/N_2`, nincs veszteség) négy elemmel egészítjük ki:\n\n- **R_1, R_2** – a tekercsek rézellenállása → **rézveszteség** `P_Cu = I² · R`, a terhelés négyzetével nő;\n- **X_s1, X_s2** – szórási reaktancia: a fluxus egy része nem kapcsolódik mindkét tekercshez → terhelésfüggő feszültségesés;\n- **R_v** – a vasveszteséget (hiszterézis + örvényáram) modellező párhuzamos ellenállás → **vasveszteség**, közel állandó, a feszültségtől és a frekvenciától függ, a terheléstől nem;\n- **X_m** – mágnesező reaktancia: a vasmag felmágnesezéséhez szükséges meddő áram.\n\nA szekunder mennyiségeket az áttétellel a primer oldalra **redukáljuk** (impedanciák az áttétel négyzetével szorzódnak), így egyetlen T-kapcsolás adódik.\n\n**Mérések:**\n\n1. **Üresjárási mérés** (névleges feszültség, szekunder nyitott): a felvett teljesítmény ≈ vasveszteség, az áram a mágnesező áram → R_v, X_m.\n2. **Rövidzárási mérés** (szekunder rövidre zárva, a primer feszültséget a névleges áram eléréséig növeljük): a felvett teljesítmény ≈ rézveszteség. A szükséges feszültség a névlegeshez viszonyítva a **drop**, `ε` (rövidzárási feszültség, %) – ez adja a soros impedanciát és meghatározza a zárlati áramot is: `I_z ≈ I_n / ε`.\n\nA hatásfok ott maximális, ahol a rézveszteség egyenlő a vasveszteséggel. Nagy transzformátorok hatásfoka 99% fölötti.',
        example: '100 kVA-es transzformátor: vasveszteség 0,3 kW, névleges rézveszteség 1,2 kW, ε = 4%. A maximális hatásfok `√(0,3/1,2) = 0,5`-ös, azaz 50%-os terhelésnél van. A szekunder oldali zárlati áram a névleges `1/0,04 = 25`-szöröse.',
        pitfall: 'Az üresjárásban járó transzformátor is fogyaszt (vasveszteség) – egész évben, terheléstől függetlenül. A rövidzárási mérést **csökkentett** feszültséggel kell végezni; névleges feszültségen a rövidzár a transzformátor zárlata.',
        related: ['transzformator', 'zarlati-aram', 'impedancia', 'rl-tranziens'], tags: ['gépek', 'mérés'] },
      { id: 'nyomatek-jelleggorbe', term: 'Aszinkron motor nyomaték–fordulatszám jelleggörbéje', en: 'torque–speed characteristic of the induction motor', topic: 'gepek', prereq: ['villamosmernoki/aszinkron-motor', 'villamosmernoki/forgo-mezo'],
        short: 'Az aszinkron motor nyomatéka a szliptől függ: indításkor az indítónyomaték, egy közepes szlipnél a billenőnyomaték (maximum) lép fel, a szinkron fordulatszám felé haladva a nyomaték nullára csökken.',
        text: 'A forgórészben indukált feszültség és frekvencia a szlippel arányos (`f_2 = s · f_1`). Kis szlipnél a forgórész ohmos jellegű, az áram és a nyomaték a szlippel közel **arányos** – ez a stabil üzemi szakasz. Nagy szlipnél a forgórész szórási reaktanciája dominál, az áram fáziskésése nő, a nyomaték csökken. A kettő között van a **billenőnyomaték** (M_b) a **billenőszlipnél** (egyszerűsítve s_b ≈ R_2 / X_2, a forgórész redukált ellenállásának és szórási reaktanciájának hányadosa).\n\nKözelítő összefüggés a **Kloss-képlet**:\n\n`M / M_b = 2 / (s/s_b + s_b/s)`.\n\nJellemző pontok:\n\n- **indítás** (s = 1): indítónyomaték, és az áram a névleges 5–8-szorosa lehet;\n- **névleges pont**: kis szlip, M_n; a billenőnyomaték jellemzően 2–3 · M_n;\n- **szinkron fordulatszám** (s = 0): nincs relatív mozgás, nincs indukció, nincs nyomaték.\n\nA munkapont a motor és a terhelés nyomatékgörbéjének metszéspontja. A billenőszlip alatti szakaszon a munkapont stabil (ha a terhelés nő, a motor kissé lassul, és nagyobb nyomatékot ad), a billenőnyomaték fölötti terhelés esetén a motor **megbillen** és leáll.\n\nA görbe alakítható: a forgórész-ellenállás növelése (csúszógyűrűs motor) nagyobb indítónyomatékot ad; a frekvenciaváltó a teljes görbét eltolja, mert a szinkron fordulatszám f-fel arányos, így a motor minden fordulatszámon kis szlippel dolgozhat.',
        formulas: ['szinkron-fordulatszam'],
        example: 'M_b = 60 Nm, s_b = 0,2. s = 0,04 szlipnél a Kloss-képlet szerint `M = 60 · 2 / (0,2 + 5) ≈ 23 Nm`; s = 0,1-nél `M = 60 · 2 / (0,5 + 2) = 48 Nm`. Ha a terhelés 60 Nm fölé nő, a motor megáll.',
        pitfall: 'Indításkor a nagy áramhoz nem tartozik arányosan nagy nyomaték (rossz a teljesítménytényező). A csillag–delta indítás az áramot és a nyomatékot is harmadára csökkenti, ezért terhelt indításra alkalmatlan lehet.',
        related: ['aszinkron-motor', 'forgo-mezo', 'szinkron-gep', 'egyenaramu-gep'], tags: ['motor', 'jelleggörbe'] },
      { id: 'egyenaramu-gep', term: 'Egyenáramú gép', en: 'DC machine', topic: 'gepek', prereq: ['fizika-bsc/lorentz-ero', 'fizika-bsc/faraday-indukcio', 'villamosmernoki/kirchhoff-2'],
        short: 'Olyan forgó villamos gép, amelyben a kommutátor (vagy elektronikus kapcsolás) gondoskodik arról, hogy a forgórész vezetőiben az áram mindig a mágneses térhez igazodó irányban folyjon; nyomatéka az árammal, belső feszültsége a fordulatszámmal arányos.',
        text: 'Az állórész (gerjesztő tekercs vagy állandó mágnes) állandó Φ fluxust hoz létre. A forgórész (armatúra) áramot vivő vezetőire Lorentz-erő hat, ezekből nyomaték keletkezik; a **kommutátor** – szegmensekre osztott gyűrű és rajta csúszó kefék – fél fordulatonként megfordítja a vezetők áramát, így a nyomaték iránya állandó marad.\n\nA két alapegyenlet:\n\n- nyomaték: `M = k · Φ · I_a`,\n- indukált (belső) feszültség: `U_i = k · Φ · ω`,\n- feszültségegyenlet: `U = U_i + R_a · I_a`.\n\nEbből a fordulatszám: `ω = (U − R_a · I_a) / (k · Φ)`. A fordulatszám tehát a **kapocsfeszültséggel** arányosan, a terheléssel kissé csökkenve változik – ezért volt az egyenáramú motor évtizedekig a szabályozott hajtások alapja. A fluxus csökkentésével (mezőgyengítés) a fordulatszám a névleges fölé emelhető, csökkenő nyomaték mellett.\n\n**Gerjesztési módok:** külső (független), sönt (párhuzamos), soros (nagy indítónyomaték, terhelés nélkül megszalad – vontatás, önindító), vegyes.\n\nA gép **reverzibilis**: generátorként a forgatás U_i-t indukál. Ha a motor a hálózatnál gyorsabban forog (U_i > U), az áram megfordul, és fékezve energiát táplál vissza.\n\nA kefés kommutátor kopik és szikrázik; a modern **kefe nélküli egyenáramú motor** (BLDC) ugyanezt elektronikus kapcsolással (inverterrel) és helyzetérzékeléssel valósítja meg.',
        example: 'Állandó mágneses motor: k · Φ = 0,1 V·s, R_a = 0,5 Ω, U = 24 V. Üresjárásban `ω ≈ 240 rad/s` (≈ 2290 1/min). 10 A terhelőáramnál `ω = (24 − 5) / 0,1 = 190 rad/s`, a nyomaték `M = 0,1 · 10 = 1 Nm`. Indításkor (ω = 0) az áram `24 / 0,5 = 48 A` lenne – ezért kell áramkorlátozás.',
        pitfall: 'Soros gerjesztésű motort tilos terhelés nélkül járatni: a fluxus a kis árammal csökken, a fordulatszám veszélyesen megnő. Külső gerjesztésű motornál a gerjesztés kimaradása ugyanezt okozhatja.',
        related: ['aszinkron-motor', 'szinkron-gep', 'nyomatek-jelleggorbe', 'forgo-mezo'], tags: ['motor', 'generátor'] },

      { id: 'kismegszakito', term: 'Kismegszakító és túláramvédelem', en: 'miniature circuit breaker (MCB) and overcurrent protection', topic: 'vedelem', prereq: ['villamosmernoki/zarlati-aram', 'lecke:villanyszereles/vedelmek'],
        short: 'Kétféle kioldóval működő önműködő kapcsoló: a hőkioldó a tartós túlterhelést, az elektromágneses gyorskioldó a zárlatot kapcsolja le; kioldási jelleggörbéje (B, C, D) a gyorskioldó tartományát adja meg.',
        text: 'A túláramvédelem célja a **vezeték** védelme: ne melegedjen a szigetelését károsító hőmérsékletre, és zárlatkor gyorsan szakadjon meg az áram. A kismegszakító két, egymást kiegészítő elvet egyesít:\n\n1. **Hőkioldó (termikus)**: ikerfém, amely az `I² · t`-vel arányos hőtől meghajlik. Lassú, fordítottan időfüggő: kis túlterhelést hosszú idő után, nagyobbat gyorsabban old ki. Így a rövid ideig tartó indítási áramot átengedi.\n2. **Elektromágneses (gyors) kioldó**: tekercs, amely egy küszöbáram fölött ezredmásodpercek alatt kiold.\n\nA kioldási **jelleggörbe** a gyorskioldás áramtartományát adja meg a névleges áram (I_n) többszörösében (EN 60898):\n\n- **B**: 3–5 · I_n – lakóépületi dugalj- és világítási körök;\n- **C**: 5–10 · I_n – motorok, nagyobb bekapcsolási áramú fogyasztók;\n- **D**: 10–20 · I_n – transzformátorok, nagy áramlökések.\n\nA kioldáshoz arra van szükség, hogy a hurokimpedancián át folyó zárlati áram nagyobb legyen a gyorskioldás felső határánál: így teljesül az érintésvédelem önműködő lekapcsolásra vonatkozó időfeltétele is. A **megszakítóképesség** (például 6 kA) azt mondja meg, mekkora zárlati áramot tud még biztonságosan megszakítani.\n\n**Szelektivitás:** egymás után kapcsolt védelmeknél mindig a hibához legközelebbinek kell kioldania, ezért a felsőbb szintű védelem névleges árama és/vagy késleltetése nagyobb.',
        formulas: ['hurokimpedancia'],
        example: 'B16-os kismegszakító: a gyorskioldás legkésőbb `5 · 16 = 80 A`-nél biztosan működik. 230 V-on ehhez a hurokimpedancia legfeljebb `230 / 80 ≈ 2,9 Ω` lehet. C16-nál ez `230 / 160 ≈ 1,4 Ω` – hosszú vezetéken C helyett B jelleggörbét választanak.',
        pitfall: 'A kismegszakító a vezetéket védi, nem az embert: az áramütéshez szükséges néhányszor tíz milliamper meg sem közelíti a kioldási áramot – személyvédelemre az áram-védőkapcsoló szolgál. A névleges áramot a vezeték terhelhetőségéhez kell választani, nem a fogyasztóhoz: vékony vezetékre nagyobb kismegszakítót tenni tűzveszélyes.',
        related: ['zarlati-aram', 'erintesvedelem', 'aram-vedokapcsolo', 'foldelesi-rendszerek'], models: ['elosztoszekreny'], tags: ['védelem', 'biztonság'] }
    ]
  });
})();
