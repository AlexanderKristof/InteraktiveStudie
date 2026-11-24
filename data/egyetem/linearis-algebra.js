/* Egyetem: Lineáris algebra – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';

  /* ---------- rajzsegédek ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function frame(x0, x1, y0, y1, L, Tp, W, H) {
    return {
      X: function (x) { return r1(L + (x - x0) / (x1 - x0) * W); },
      Y: function (y) { return r1(Tp + (y1 - y) / (y1 - y0) * H); }
    };
  }
  function arrow(x1, y1, x2, y2, col, w, dash) {
    var a = Math.atan2(y2 - y1, x2 - x1), s = 9;
    var p1 = [x2 - s * Math.cos(a - 0.38), y2 - s * Math.sin(a - 0.38)], p2 = [x2 - s * Math.cos(a + 0.38), y2 - s * Math.sin(a + 0.38)];
    var ex = x2 - 6 * Math.cos(a), ey = y2 - 6 * Math.sin(a);
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(ex) + '" y2="' + r1(ey) + '" stroke="' + col + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
      '<path d="M' + r1(x2) + ' ' + r1(y2) + ' L' + r1(p1[0]) + ' ' + r1(p1[1]) + ' L' + r1(p2[0]) + ' ' + r1(p2[1]) + ' z" fill="' + col + '"/>';
  }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (cls || T)) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  // Koordináta-rács egész értékeknél + tengelyek.
  function grid(fr, x0, x1, y0, y1) {
    var s = '';
    for (var x = Math.ceil(x0); x <= x1; x++) s += '<line x1="' + fr.X(x) + '" y1="' + fr.Y(y0) + '" x2="' + fr.X(x) + '" y2="' + fr.Y(y1) + '" stroke="var(--line)"/>';
    for (var y = Math.ceil(y0); y <= y1; y++) s += '<line x1="' + fr.X(x0) + '" y1="' + fr.Y(y) + '" x2="' + fr.X(x1) + '" y2="' + fr.Y(y) + '" stroke="var(--line)"/>';
    return s + '<line x1="' + fr.X(x0) + '" y1="' + fr.Y(0) + '" x2="' + fr.X(x1) + '" y2="' + fr.Y(0) + '" ' + LN + ' stroke-width="1.5"/>' +
      '<line x1="' + fr.X(0) + '" y1="' + fr.Y(y0) + '" x2="' + fr.X(0) + '" y2="' + fr.Y(y1) + '" ' + LN + ' stroke-width="1.5"/>';
  }
  function vec(fr, ax, ay, bx, by, col, w, dash) { return arrow(fr.X(ax), fr.Y(ay), fr.X(bx), fr.Y(by), col, w || 3, dash); }
  // Mátrix szögletes zárójellel. hl(i, j) → kitöltőszín vagy null; aug: függőleges vonal ennyi oszlop után.
  function mat(x, y, rows, hl, aug, cw) {
    cw = cw || 30;
    var h = 24, nr = rows.length, nc = rows[0].length, W = nc * cw + 12, H = nr * h + 6, s = '';
    rows.forEach(function (row, i) {
      row.forEach(function (v, j) {
        var cx = x + 6 + j * cw, cy = y + 3 + i * h, col = hl && hl(i, j);
        if (col) s += '<rect x="' + (cx + 2) + '" y="' + (cy + 1) + '" width="' + (cw - 4) + '" height="' + (h - 2) + '" rx="4" fill="' + col + '" opacity=".28"/>';
        s += txt(cx + cw / 2, cy + 17, v, T, 13, 'middle', 'font-family="monospace"');
      });
    });
    if (aug) s += '<line x1="' + (x + 6 + aug * cw) + '" y1="' + (y + 4) + '" x2="' + (x + 6 + aug * cw) + '" y2="' + (y + H - 4) + '" ' + LN + ' stroke-dasharray="3 3"/>';
    s += '<path d="M' + (x + 6) + ' ' + y + ' h-6 v' + H + ' h6 M' + (x + W - 6) + ' ' + y + ' h6 v' + H + ' h-6" fill="none" ' + LN + ' stroke-width="1.8"/>';
    return s;
  }
  var BL = '#2f7bf6', OR = '#f08c2e', PU = '#7c5cd6', GR = '#2f9e6a', RE = '#e5484d';

  /* ---------- 1. Vektorok összeadása (paralelogramma-szabály) ---------- */
  var va = frame(-0.5, 6.5, -0.5, 4, 30, 15, 350, 225);
  var vecSvg = '<svg viewBox="0 0 560 255">' + grid(va, -0.5, 6.5, -0.5, 4) +
    vec(va, 3, 1, 4, 3, OR, 2, '6 4') + vec(va, 1, 2, 4, 3, BL, 2, '6 4') +
    vec(va, 0, 0, 3, 1, BL) + vec(va, 0, 0, 1, 2, OR) + vec(va, 0, 0, 4, 3, PU, 3.5) +
    txt(va.X(1.6), va.Y(0.45) + 14, 'a', T, 15, 'middle', 'font-weight="700" fill="' + BL + '"') +
    txt(va.X(0.35), va.Y(1.2), 'b', T, 15, 'middle', 'font-weight="700" fill="' + OR + '"') +
    txt(va.X(2.2), va.Y(1.8) - 6, 'a + b', T, 14, 'end', 'font-weight="700" fill="' + PU + '"') +
    txt(va.X(0) - 6, va.Y(0) + 15, '0', M, 11, 'end') +
    txt(395, 50, 'a = (3; 1)', T, 14, null, 'fill="' + BL + '"') + txt(395, 74, 'b = (1; 2)', T, 14, null, 'fill="' + OR + '"') +
    txt(395, 104, 'a + b = (4; 3)', T, 14, null, 'font-weight="700" fill="' + PU + '"') +
    txt(395, 134, '|a + b| = √(4² + 3²) = 5', T, 13) + txt(395, 164, 'koordinátánként', M, 12) +
    txt(395, 182, 'adunk össze; a szaggatott', M, 12) + txt(395, 200, 'oldalak paralelogrammát', M, 12) + txt(395, 218, 'zárnak be', M, 12) + '</svg>';

  /* ---------- 2. Merőleges vetület ---------- */
  var pj = frame(-0.5, 5.8, -0.5, 3.6, 20, 12, 340, 221);
  var projSvg = '<svg viewBox="0 0 560 248">' + grid(pj, -0.5, 5.8, -0.5, 3.6) +
    '<line x1="' + pj.X(2) + '" y1="' + pj.Y(3) + '" x2="' + pj.X(2.5) + '" y2="' + pj.Y(0.5) + '" stroke="var(--fg-2)" stroke-width="1.8" stroke-dasharray="5 4"/>' +
    vec(pj, 0, 0, 5, 1, OR) + vec(pj, 0, 0, 2, 3, BL) + vec(pj, 0, 0, 2.5, 0.5, GR, 5);
  (function () { // derékszög-jel a vetület talppontjában
    var ux = 5 / Math.sqrt(26), uy = 1 / Math.sqrt(26), px = -1 / Math.sqrt(26), py = 5 / Math.sqrt(26), s = 0.22;
    var p0 = [2.5 - ux * s, 0.5 - uy * s], p1 = [p0[0] + px * s, p0[1] + py * s], p2 = [2.5 + px * s, 0.5 + py * s];
    projSvg += '<path d="M' + pj.X(p0[0]) + ' ' + pj.Y(p0[1]) + ' L' + pj.X(p1[0]) + ' ' + pj.Y(p1[1]) + ' L' + pj.X(p2[0]) + ' ' + pj.Y(p2[1]) + '" fill="none" stroke="var(--fg-2)" stroke-width="1.5"/>';
    var R = 0.7, a1 = Math.atan2(1, 5), a2 = Math.atan2(3, 2);
    projSvg += '<path d="M' + pj.X(R * Math.cos(a1)) + ' ' + pj.Y(R * Math.sin(a1)) + ' A' + r1(R * 54) + ' ' + r1(R * 54) + ' 0 0 0 ' + pj.X(R * Math.cos(a2)) + ' ' + pj.Y(R * Math.sin(a2)) + '" fill="none" stroke="' + PU + '" stroke-width="2"/>';
  })();
  projSvg += txt(pj.X(0.95), pj.Y(0.5) + 2, 'φ', T, 14, 'middle', 'font-weight="700" fill="' + PU + '"') +
    txt(pj.X(1.15), pj.Y(2), 'a', T, 15, 'end', 'font-weight="700" fill="' + BL + '"') +
    txt(pj.X(4.6), pj.Y(1) - 8, 'b', T, 15, 'middle', 'font-weight="700" fill="' + OR + '"') +
    txt(pj.X(1.6), pj.Y(0.3) + 18, 'vetület', T, 12, 'middle', 'font-weight="700" fill="' + GR + '"') +
    txt(385, 44, 'a = (2; 3), b = (5; 1)', T, 13) + txt(385, 72, 'a·b = 2·5 + 3·1 = 13', T, 13) +
    txt(385, 100, 'cos φ = 13 / (√13·√26)', T, 13) + txt(385, 120, '≈ 0,707 → φ = 45°', T, 13) +
    txt(385, 152, 'vetület = (13/26)·b', T, 13, null, 'fill="' + GR + '"') + txt(385, 172, '= (2,5; 0,5)', T, 13, null, 'fill="' + GR + '"') +
    txt(385, 204, 'a maradék ⊥ b', M, 12) + '</svg>';

  /* ---------- 3. Ferde bázis és koordináták ---------- */
  var bs = frame(-0.6, 5.4, -0.6, 4.6, 16, 12, 300, 260);
  var basisSvg = '<svg viewBox="0 0 560 290"><defs><clipPath id="la-clip-basis"><rect x="' + bs.X(-0.6) + '" y="' + bs.Y(4.6) + '" width="300" height="260"/></clipPath></defs>' +
    '<g clip-path="url(#la-clip-basis)">';
  for (var bk = -6; bk <= 8; bk++) { // b1 = (2;1), b2 = (1;2) által kifeszített ferde rács
    basisSvg += '<line x1="' + bs.X(2 * bk - 10) + '" y1="' + bs.Y(bk - 20) + '" x2="' + bs.X(2 * bk + 10) + '" y2="' + bs.Y(bk + 20) + '" stroke="' + PU + '" stroke-opacity=".35"/>' +
      '<line x1="' + bs.X(bk - 20) + '" y1="' + bs.Y(2 * bk - 10) + '" x2="' + bs.X(bk + 20) + '" y2="' + bs.Y(2 * bk + 10) + '" stroke="' + PU + '" stroke-opacity=".35"/>';
  }
  basisSvg += '</g>' +
    '<line x1="' + bs.X(-0.6) + '" y1="' + bs.Y(0) + '" x2="' + bs.X(5.4) + '" y2="' + bs.Y(0) + '" ' + LN + '/><line x1="' + bs.X(0) + '" y1="' + bs.Y(-0.6) + '" x2="' + bs.X(0) + '" y2="' + bs.Y(4.6) + '" ' + LN + '/>' +
    vec(bs, 2, 1, 4, 2, BL, 2.5, '6 4') + vec(bs, 4, 2, 5, 4, OR, 2.5, '6 4') +
    vec(bs, 0, 0, 2, 1, BL) + vec(bs, 0, 0, 1, 2, OR) + vec(bs, 0, 0, 5, 4, GR, 3.5) +
    txt(bs.X(1.2), bs.Y(0.6) + 16, 'b₁', T, 14, 'middle', 'font-weight="700" fill="' + BL + '"') +
    txt(bs.X(0.4), bs.Y(1.4), 'b₂', T, 14, 'end', 'font-weight="700" fill="' + OR + '"') +
    txt(bs.X(5) + 6, bs.Y(4) - 6, 'v', T, 15, null, 'font-weight="700" fill="' + GR + '"') +
    txt(340, 44, 'B bázis: b₁ = (2; 1), b₂ = (1; 2)', T, 13) +
    txt(340, 76, 'standard koordináták: v = (5; 4)', T, 13) + txt(340, 104, 'v = 2·b₁ + 1·b₂', T, 13, null, 'fill="' + GR + '"') +
    txt(340, 130, 'B szerinti koordináták: (2; 1)', T, 13, null, 'font-weight="700" fill="' + GR + '"') +
    txt(340, 166, 'Ugyanaz a vektor, más bázisban', M, 12) + txt(340, 184, 'más koordinátákkal.', M, 12) +
    txt(340, 214, 'lila rács: a B bázis „vonalzója”', M, 12) + '</svg>';

  /* ---------- 4. Mátrixszorzás: sor · oszlop ---------- */
  var hlA = function (i) { return i === 0 ? BL : null; }, hlB = function (i, j) { return j === 1 ? OR : null; }, hlC = function (i, j) { return i === 0 && j === 1 ? PU : null; };
  var mmulSvg = '<svg viewBox="0 0 560 200">' +
    txt(30, 30, 'A (2×3)', M, 12) + mat(20, 40, [['1', '2', '3'], ['4', '5', '6']], hlA) +
    txt(141, 74, '·', T, 24, 'middle') +
    txt(170, 30, 'B (3×2)', M, 12) + mat(160, 40, [['1', '0'], ['2', '1'], ['0', '3']], hlB) +
    txt(253, 76, '=', T, 20, 'middle') +
    txt(280, 30, 'C = AB (2×2)', M, 12) + mat(272, 40, [['5', '11'], ['14', '23']], hlC, null, 36) +
    txt(375, 56, 'c₁₂ = (1. sor) · (2. oszlop)', T, 13) +
    txt(375, 80, '= 1·0 + 2·1 + 3·3 = 11', T, 13, null, 'font-weight="700" fill="' + PU + '"') +
    txt(20, 160, 'Feltétel: A oszlopainak száma = B sorainak száma (itt 3 = 3).', T, 13) +
    txt(20, 182, 'Az eredmény mérete: (A sorai) × (B oszlopai).', M, 12) + '</svg>';

  /* ---------- 5. Gauss-elimináció lépései ---------- */
  var G0 = [['1', '1', '1', '6'], ['2', '1', '−1', '1'], ['1', '−1', '2', '5']];
  var G1 = [['1', '1', '1', '6'], ['0', '−1', '−3', '−11'], ['0', '−2', '1', '−1']];
  var G2 = [['1', '1', '1', '6'], ['0', '−1', '−3', '−11'], ['0', '0', '7', '21']];
  function piv(P) { return function (i, j) { return P[i] === j ? PU : (P.zero && P.zero(i, j) ? GR : null); }; }
  var p1 = [0], p2 = [0, 1], p3 = [0, 1, 2];
  p2.zero = function (i, j) { return j === 0 && i > 0; };
  p3.zero = function (i, j) { return j < i; };
  var gaussSvg = '<svg viewBox="0 0 560 210">' +
    mat(10, 30, G0, piv(p1), 3, 30) + arrow(150, 66, 186, 66, 'var(--fg-2)', 1.8) +
    txt(168, 52, 'II − 2·I', M, 11, 'middle') + txt(168, 92, 'III − I', M, 11, 'middle') +
    mat(192, 30, G1, piv(p2), 3, 32) + arrow(340, 66, 376, 66, 'var(--fg-2)', 1.8) +
    txt(358, 52, 'III − 2·II', M, 11, 'middle') +
    mat(382, 30, G2, piv(p3), 3, 32) +
    txt(80, 20, 'kibővített mátrix', M, 11, 'middle') + txt(450, 20, 'lépcsős alak', M, 11, 'middle', 'font-weight="700"') +
    txt(20, 150, 'Visszahelyettesítés (alulról felfelé):', T, 13, null, 'font-weight="700"') +
    txt(20, 174, '7z = 21 → z = 3;   −y − 3·3 = −11 → y = 2;   x + 2 + 3 = 6 → x = 1', T, 13) +
    txt(20, 198, 'lila: főelem (pivot), zöld: kinullázott elem', M, 11) + '</svg>';

  /* ---------- 6. Determináns = előjeles terület ---------- */
  var dt = frame(-0.5, 5, -0.5, 3.6, 30, 12, 268, 200);
  var detSvg = '<svg viewBox="0 0 560 235">' + grid(dt, -0.5, 5, -0.5, 3.6) +
    '<path d="M' + dt.X(0) + ' ' + dt.Y(0) + ' L' + dt.X(3) + ' ' + dt.Y(1) + ' L' + dt.X(4) + ' ' + dt.Y(3) + ' L' + dt.X(1) + ' ' + dt.Y(2) + ' z" fill="' + PU + '" fill-opacity=".25" stroke="' + PU + '" stroke-width="1.5"/>' +
    '<rect x="' + dt.X(0) + '" y="' + dt.Y(1) + '" width="' + r1(dt.X(1) - dt.X(0)) + '" height="' + r1(dt.Y(0) - dt.Y(1)) + '" fill="' + GR + '" fill-opacity=".35"/>' +
    vec(dt, 0, 0, 3, 1, BL) + vec(dt, 0, 0, 1, 2, OR) +
    txt(dt.X(0.5), dt.Y(0.5) + 4, '1', T, 12, 'middle', 'font-weight="700"') +
    txt(dt.X(2.1), dt.Y(1.6) + 5, 'T = 5', T, 15, 'middle', 'font-weight="700" fill="' + PU + '"') +
    txt(dt.X(3), dt.Y(1) + 18, '(3; 1)', T, 12, 'middle', 'fill="' + BL + '"') + txt(dt.X(1) - 6, dt.Y(2) - 6, '(1; 2)', T, 12, 'end', 'fill="' + OR + '"') +
    txt(340, 50, 'A = [3 1; 1 2]', T, 13, null, 'font-family="monospace"') + txt(340, 70, '(oszlopai: (3; 1) és (1; 2))', M, 11) +
    txt(340, 100, 'det A = 3·2 − 1·1 = 5', T, 13, null, 'font-weight="700"') +
    txt(340, 132, 'A zöld egységnégyzet képe', M, 12) + txt(340, 150, 'a lila paralelogramma:', M, 12) +
    txt(340, 168, 'a terület 5-szörösére nő.', M, 12) +
    txt(340, 200, 'det < 0: tükröz (irányt vált)', M, 12) + txt(340, 218, 'det = 0: síkot egyenesre lapít', M, 12) + '</svg>';

  /* ---------- 7. Lineáris leképezés a rácson ---------- */
  var LA = [[1.5, 0.5], [0, 1]];
  function lmap(p) { return [LA[0][0] * p[0] + LA[0][1] * p[1], LA[1][0] * p[0] + LA[1][1] * p[1]]; }
  function panel(cx, cy, id, f) {
    var u = 38, P = function (p) { var q = f(p); return [r1(cx + q[0] * u), r1(cy - q[1] * u)]; }, s = '<defs><clipPath id="' + id + '"><rect x="' + (cx - 118) + '" y="' + (cy - 98) + '" width="236" height="196" rx="8"/></clipPath></defs><g clip-path="url(#' + id + ')">';
    for (var k = -5; k <= 5; k++) {
      var a = P([k, -6]), b = P([k, 6]), c = P([-6, k]), d = P([6, k]);
      s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="var(--fg-2)" stroke-opacity="' + (k ? 0.22 : 0.9) + '" stroke-width="' + (k ? 1 : 1.5) + '"/>' +
        '<line x1="' + c[0] + '" y1="' + c[1] + '" x2="' + d[0] + '" y2="' + d[1] + '" stroke="var(--fg-2)" stroke-opacity="' + (k ? 0.22 : 0.9) + '" stroke-width="' + (k ? 1 : 1.5) + '"/>';
    }
    var house = [[0.4, 0.3], [1.6, 0.3], [1.6, 1.3], [1, 2], [0.4, 1.3]].map(P);
    s += '<path d="M' + house.map(function (q) { return q.join(' '); }).join(' L') + ' z" fill="' + PU + '" fill-opacity=".3" stroke="' + PU + '" stroke-width="2"/>';
    var o = P([0, 0]), e1 = P([1, 0]), e2 = P([0, 1]);
    s += arrow(o[0], o[1], e1[0], e1[1], BL, 3.5) + arrow(o[0], o[1], e2[0], e2[1], OR, 3.5) + '</g>' +
      '<rect x="' + (cx - 118) + '" y="' + (cy - 98) + '" width="236" height="196" rx="8" fill="none" ' + LN + ' stroke-opacity=".5"/>';
    return s;
  }
  var mapSvg = '<svg viewBox="0 0 560 262">' + panel(130, 112, 'la-clip-mapL', function (p) { return p; }) +
    panel(430, 112, 'la-clip-mapR', lmap) + arrow(258, 112, 302, 112, 'var(--fg-2)', 2.5) +
    txt(280, 98, 'A', T, 15, 'middle', 'font-weight="700"') +
    txt(130, 228, 'e₁ = (1; 0), e₂ = (0; 1)', M, 12, 'middle') +
    txt(430, 228, 'A·e₁ = (1,5; 0),  A·e₂ = (0,5; 1)', M, 12, 'middle') +
    txt(280, 254, 'A = [1,5 0,5; 0 1] – oszlopai a bázisvektorok képei', T, 12, 'middle') + '</svg>';

  /* ---------- 8. Sajátvektorok: kör → ellipszis ---------- */
  var ex = 175, ey = 140, eu = 38;
  function EP(x, y) { return [r1(ex + x * eu), r1(ey - y * eu)]; }
  var eigSvg = '<svg viewBox="0 0 560 280">' +
    '<line x1="10" y1="' + ey + '" x2="340" y2="' + ey + '" ' + LN + ' stroke-opacity=".5"/><line x1="' + ex + '" y1="10" x2="' + ex + '" y2="272" ' + LN + ' stroke-opacity=".5"/>' +
    '<circle cx="' + ex + '" cy="' + ey + '" r="' + eu + '" fill="none" stroke="var(--fg-2)" stroke-dasharray="4 4"/>' +
    '<ellipse cx="' + ex + '" cy="' + ey + '" rx="' + 3 * eu + '" ry="' + eu + '" transform="rotate(-45 ' + ex + ' ' + ey + ')" fill="' + PU + '" fill-opacity=".12" stroke="' + PU + '" stroke-width="2"/>' +
    '<line x1="' + EP(-3.2, -3.2).join('" y1="') + '" x2="' + EP(3.2, 3.2).join('" y2="') + '" stroke="' + GR + '" stroke-dasharray="2 4"/>' +
    '<line x1="' + EP(-2, 2).join('" y1="') + '" x2="' + EP(2, -2).join('" y2="') + '" stroke="' + OR + '" stroke-dasharray="2 4"/>';
  var s2 = Math.SQRT1_2, q;
  q = EP(0, 0); var qa = EP(3 * s2, 3 * s2), qb = EP(s2, s2), qc = EP(s2, -s2), qd = EP(1, 0), qe = EP(2, 1);
  eigSvg += arrow(q[0], q[1], qa[0], qa[1], GR, 4) + arrow(q[0], q[1], qb[0], qb[1], 'var(--fg)', 2) +
    arrow(q[0], q[1], qc[0], qc[1], OR, 4) +
    arrow(q[0], q[1], qd[0], qd[1], 'var(--muted)', 1.8) + arrow(q[0], q[1], qe[0], qe[1], 'var(--muted)', 1.8, '4 3') +
    txt(qa[0] + 6, qa[1] - 4, 'A·v₁ = 3·v₁', T, 12, null, 'font-weight="700" fill="' + GR + '"') +
    txt(qc[0] + 8, qc[1] + 14, 'A·v₂ = 1·v₂', T, 12, null, 'font-weight="700" fill="' + OR + '"') +
    txt(qe[0] + 6, qe[1] + 4, 'A·e₁ = (2; 1)', M, 11) +
    txt(370, 40, 'A = [2 1; 1 2]', T, 14, null, 'font-family="monospace" font-weight="700"') +
    txt(370, 70, 'szaggatott kör: egységvektorok', M, 12) + txt(370, 88, 'lila ellipszis: a képük', M, 12) +
    txt(370, 120, 'v₁ = (1; 1)/√2, λ₁ = 3', T, 13, null, 'fill="' + GR + '"') + txt(370, 140, 'irány marad, 3× nyúlik', M, 12) +
    txt(370, 170, 'v₂ = (1; −1)/√2, λ₂ = 1', T, 13, null, 'fill="' + OR + '"') + txt(370, 190, 'változatlan marad', M, 12) +
    txt(370, 222, 'szürke: e₁ = (1; 0) iránya', M, 12) + txt(370, 240, 'elfordul → nem sajátvektor', M, 12) + '</svg>';

  /* ---------- 9. Gram–Schmidt ---------- */
  var gs = frame(-1.2, 3.6, -0.5, 2.8, 16, 14, 300, 206);
  var gsSvg = '<svg viewBox="0 0 560 240">' + grid(gs, -1.2, 3.6, -0.5, 2.8) +
    '<line x1="' + gs.X(1) + '" y1="' + gs.Y(2) + '" x2="' + gs.X(1.5) + '" y2="' + gs.Y(0.5) + '" stroke="var(--fg-2)" stroke-dasharray="5 4" stroke-width="1.5"/>' +
    vec(gs, 0, 0, 3, 1, BL) + vec(gs, 0, 0, 1.5, 0.5, GR, 2, '5 3') + vec(gs, 0, 0, 1, 2, OR) + vec(gs, 0, 0, -0.5, 1.5, PU, 3.5) +
    txt(gs.X(3) + 4, gs.Y(1) + 16, 'v₁ = u₁', T, 13, 'middle', 'font-weight="700" fill="' + BL + '"') +
    txt(gs.X(1) + 6, gs.Y(2) - 4, 'v₂', T, 14, null, 'font-weight="700" fill="' + OR + '"') +
    txt(gs.X(-0.5) - 4, gs.Y(1.5) - 6, 'u₂', T, 14, 'end', 'font-weight="700" fill="' + PU + '"') +
    txt(gs.X(1.6), gs.Y(0.5) + 20, 'vetület', T, 11, 'middle', 'fill="' + GR + '"') +
    txt(340, 44, 'u₁ = v₁ = (3; 1)', T, 13, null, 'fill="' + BL + '"') +
    txt(340, 74, 'u₂ = v₂ − (v₂·u₁ / u₁·u₁)·u₁', T, 13) +
    txt(340, 96, '    = (1; 2) − (5/10)·(3; 1)', T, 13) +
    txt(340, 118, '    = (−0,5; 1,5)', T, 13, null, 'font-weight="700" fill="' + PU + '"') +
    txt(340, 150, 'ellenőrzés: u₁·u₂ = −1,5 + 1,5 = 0', M, 12) +
    txt(340, 180, 'normálás után ortonormált bázis:', M, 12) +
    txt(340, 200, 'e₁ = (3; 1)/√10, e₂ = (−1; 3)/√10', T, 12) + '</svg>';

  /* ---------- 10. PCA: korrelált pontfelhő főtengelyekkel ---------- */
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var rnd = rng(7), pc = frame(-6, 6, -4.5, 4.5, 20, 10, 320, 240), pcaPts = '';
  var c11 = 4, c12 = 2, c22 = 3, L11 = 2, L21 = c12 / L11, L22 = Math.sqrt(c22 - L21 * L21);
  for (var pi = 0; pi < 90; pi++) {
    var u1 = rnd() || 1e-9, u2 = rnd(), z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2), z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
    var px0 = L11 * z1, py0 = L21 * z1 + L22 * z2;
    if (Math.abs(px0) < 5.8 && Math.abs(py0) < 4.4) pcaPts += '<circle cx="' + pc.X(px0) + '" cy="' + pc.Y(py0) + '" r="3.2" fill="' + BL + '" fill-opacity=".55"/>';
  }
  var lam1 = (7 + Math.sqrt(17)) / 2, lam2 = (7 - Math.sqrt(17)) / 2, ang = Math.atan2(lam1 - c11, c12);
  var pcaSvg = '<svg viewBox="0 0 560 260">' +
    '<line x1="' + pc.X(-6) + '" y1="' + pc.Y(0) + '" x2="' + pc.X(6) + '" y2="' + pc.Y(0) + '" ' + LN + ' stroke-opacity=".4"/><line x1="' + pc.X(0) + '" y1="' + pc.Y(-4.5) + '" x2="' + pc.X(0) + '" y2="' + pc.Y(4.5) + '" ' + LN + ' stroke-opacity=".4"/>' +
    pcaPts +
    vec(pc, 0, 0, 2 * Math.sqrt(lam1) * Math.cos(ang), 2 * Math.sqrt(lam1) * Math.sin(ang), PU, 4) +
    vec(pc, 0, 0, -2 * Math.sqrt(lam2) * Math.sin(ang), 2 * Math.sqrt(lam2) * Math.cos(ang), OR, 4) +
    txt(pc.X(2 * Math.sqrt(lam1) * Math.cos(ang)) - 12, pc.Y(2 * Math.sqrt(lam1) * Math.sin(ang)) - 14, '1. főkomponens', T, 12, 'end', 'font-weight="700" fill="' + PU + '"') +
    txt(pc.X(-2 * Math.sqrt(lam2) * Math.sin(ang)) - 4, pc.Y(2 * Math.sqrt(lam2) * Math.cos(ang)) - 6, '2. főkomponens', T, 12, 'end', 'font-weight="700" fill="' + OR + '"') +
    txt(365, 40, 'kovarianciamátrix:', M, 12) + txt(365, 62, 'C = [4 2; 2 3]', T, 13, null, 'font-family="monospace" font-weight="700"') +
    txt(365, 94, 'λ₁ ≈ 5,56   λ₂ ≈ 1,44', T, 13) +
    txt(365, 124, 'az 1. főkomponens a teljes', M, 12) + txt(365, 142, 'szórásnégyzet 79%-át hordozza', M, 12) +
    txt(365, 174, 'nyilak: sajátvektorok,', M, 12) + txt(365, 192, 'hosszuk ∝ √λ (szórás)', M, 12) + '</svg>';

  /* ---------- 11. PageRank kis gráfon ---------- */
  var nodes = { A: [90, 72], B: [250, 48], C: [200, 182], D: [50, 200] }, outL = { A: ['B', 'C'], B: ['C'], C: ['A'], D: ['C'] }, keys = ['A', 'B', 'C', 'D'];
  var pr = { A: 0.25, B: 0.25, C: 0.25, D: 0.25 };
  for (var it = 0; it < 100; it++) {
    var nx = {}; keys.forEach(function (k) { nx[k] = 0.15 / 4; });
    keys.forEach(function (k) { outL[k].forEach(function (j) { nx[j] += 0.85 * pr[k] / outL[k].length; }); });
    pr = nx;
  }
  function rad(k) { return 12 + 40 * Math.sqrt(pr[k]); }
  var prSvg = '<svg viewBox="0 0 560 250">';
  keys.forEach(function (k) {
    outL[k].forEach(function (j) {
      var a = nodes[k], b = nodes[j], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
      var off = (k === 'C' && j === 'A') || (k === 'A' && j === 'C') ? 7 : 0, nxo = -uy * off, nyo = ux * off;
      prSvg += arrow(a[0] + ux * rad(k) + nxo, a[1] + uy * rad(k) + nyo, b[0] - ux * (rad(j) + 2) + nxo, b[1] - uy * (rad(j) + 2) + nyo, 'var(--fg-2)', 2);
    });
  });
  keys.forEach(function (k) {
    prSvg += '<circle cx="' + nodes[k][0] + '" cy="' + nodes[k][1] + '" r="' + r1(rad(k)) + '" fill="' + PU + '" fill-opacity="' + r1(0.35 + pr[k]) + '" stroke="' + PU + '" stroke-width="2"/>' +
      txt(nodes[k][0], nodes[k][1] - 1, k, T, 15, 'middle', 'font-weight="700"') +
      txt(nodes[k][0], nodes[k][1] + 14, pr[k].toFixed(3).replace('.', ','), T, 11, 'middle');
  });
  prSvg += txt(310, 46, 'Linkek: A→B, A→C, B→C, C→A, D→C', T, 12) +
    txt(310, 76, 'r = 0,15/4 · 1 + 0,85 · M·r', T, 13, null, 'font-weight="700"') +
    txt(310, 106, 'Az r rangvektor a „Google-mátrix”', M, 12) + txt(310, 124, '1 sajátértékhez tartozó sajátvektora.', M, 12) +
    txt(310, 156, 'A kör területe ∝ PageRank.', M, 12) +
    txt(310, 186, 'C-re hárman mutatnak → legnagyobb;', M, 12) + txt(310, 204, 'A-ra csak C, de C „súlyos” →', M, 12) +
    txt(310, 222, 'A is magas rangot kap.', M, 12) + '</svg>';

  STUDIE.addCourse({
    id: 'linearis-algebra',
    title: 'Lineáris algebra',
    icon: '🧮',
    color: '#7c5cd6',
    level: 'BSc 1–2. félév (mérnök, informatikus, matematikus)',
    description: 'Vektorok, mátrixok, egyenletrendszerek, determináns, lineáris leképezések és sajátértékek – ábrákkal, kidolgozott számpéldákkal és alkalmazásokkal (PCA, PageRank).',
    intro: 'A lineáris algebra a **vektorok** és a rajtuk ható **lineáris leképezések** nyelve. Ugyanaz az eszköztár írja le a háromdimenziós geometriát, a több ezer ismeretlenes egyenletrendszereket, a számítógépes grafika transzformációit, a gépi tanulás adattábláit és a keresőmotorok rangsorát. A kulcs: minden lineáris leképezést egy **mátrix** ad meg, és a mátrix szerkezetét – rangját, determinánsát, sajátértékeit – megértve az egész leképezést megértjük. Jelölés: a szövegben a vektorokat `(3; 1)` alakban, a mátrixokat soronként, pontosvesszővel tagolva írjuk: `[2 1; 5 3]`.',
    topics: [
      { id: 'vektor', title: 'Vektorok és vektorterek' },
      { id: 'matrix', title: 'Mátrixok' },
      { id: 'egyenlet', title: 'Egyenletrendszerek és determináns' },
      { id: 'lekepezes', title: 'Lineáris leképezések és ortogonalitás' },
      { id: 'sajat', title: 'Sajátértékek és alkalmazások' }
    ],
    formulas: [
      {
        id: 'skalaris-f', title: 'Skaláris szorzat', en: 'dot product',
        parts: [{ t: 'a · b', d: 'Két vektor skaláris szorzata: egy szám (skalár), nem vektor' }, { t: '=' },
          { t: 'Σ_{i=1}^{n} a_i b_i', d: 'Koordinátás alak: az azonos indexű koordináták szorzatainak összege', more: 'Síkban: a₁b₁ + a₂b₂, térben: a₁b₁ + a₂b₂ + a₃b₃.' }, { t: '=' },
          { t: '|a|', d: 'Az a vektor hossza (normája): √(a·a)' }, { t: '·' }, { t: '|b|', d: 'A b vektor hossza' }, { t: '·' },
          { t: 'cos φ', d: 'A két vektor által bezárt szög koszinusza', unit: '−1 … 1', more: 'cos φ = 0 ⟺ a ⊥ b (merőlegesek).' }],
        text: 'A két alak egyenlősége a koszinusztételből következik. Az első alakkal számolunk, a másodikkal értelmezünk: a skaláris szorzat előjele megmondja, hegyes-, derék- vagy tompaszöget zárnak-e be a vektorok.',
        example: 'a = (2; 3), b = (5; 1): `a·b = 2·5 + 3·1 = 13`, `|a| = √13`, `|b| = √26`, így `cos φ = 13/√338 ≈ 0,7071`, azaz φ = 45°.'
      },
      {
        id: 'vetites-f', title: 'Merőleges vetület', en: 'orthogonal projection',
        parts: [{ t: 'proj_b a', d: 'Az a vektor merőleges vetülete a b vektor egyenesére' }, { t: '=' },
          { t: '(a · b)', d: 'A két vektor skaláris szorzata' }, { t: '/' },
          { t: '(b · b)', d: 'b hosszának négyzete, |b|²', more: 'Ha b egységvektor, ez 1, és a vetület egyszerűen (a·b)·b.' }, { t: '·' },
          { t: 'b', d: 'Az irányt adó vektor (b ≠ 0)' }],
        text: 'A vetület b-vel párhuzamos, és a maradék, `a − proj_b a`, merőleges b-re. Ez a felbontás a Gram–Schmidt-eljárás és a legkisebb négyzetes közelítés alapja.',
        example: 'a = (2; 3), b = (5; 1): `proj = (13/26)·(5; 1) = (2,5; 0,5)`. A maradék `(−0,5; 2,5)`, és valóban `(−0,5)·5 + 2,5·1 = 0`.'
      },
      {
        id: 'matrixszorzas-f', title: 'Mátrixszorzás elemenként', en: 'matrix multiplication',
        parts: [{ t: 'c_{ij}', d: 'A C = AB szorzatmátrix i-edik sorának j-edik eleme' }, { t: '=' },
          { t: 'Σ_{k=1}^{n}', d: 'Összegzés a „belső” index szerint; n = A oszlopainak száma = B sorainak száma' },
          { t: 'a_{ik}', d: 'A i-edik sorának k-adik eleme' }, { t: '·' }, { t: 'b_{kj}', d: 'B j-edik oszlopának k-adik eleme' }],
        text: 'Röviden: „sor szorozva oszloppal” – c_ij az A i-edik sorának és a B j-edik oszlopának skaláris szorzata. Ha A mérete m×n, B-é n×p, akkor AB mérete m×p.',
        example: 'A = [1 2 3; 4 5 6], B = [1 0; 2 1; 0 3]: `c₁₂ = 1·0 + 2·1 + 3·3 = 11`, a teljes szorzat `AB = [5 11; 14 23]`.'
      },
      {
        id: 'inverz-f', title: '2×2-es mátrix inverze', en: 'inverse of a 2×2 matrix',
        parts: [{ t: 'A^{−1}', d: 'Az A = [a b; c d] mátrix inverze: A·A⁻¹ = A⁻¹·A = E' }, { t: '=' },
          { t: '1 / (ad − bc)', d: 'A determináns reciproka', more: 'Ha ad − bc = 0, a mátrix szinguláris, nincs inverze.' }, { t: '·' },
          { t: '[d −b; −c a]', d: 'Az adjungált mátrix: a főátló elemeit felcseréljük, a mellékátlóét ellentettjére váltjuk' }],
        text: 'Nagyobb mátrixoknál az inverzet Gauss–Jordan-eliminációval számoljuk: az [A | E] kibővített mátrixot sorműveletekkel [E | A⁻¹] alakra hozzuk.',
        example: 'A = [2 1; 5 3]: det A = 6 − 5 = 1, tehát `A⁻¹ = [3 −1; −5 2]`. Ellenőrzés: `[2 1; 5 3]·[3 −1; −5 2] = [1 0; 0 1]`.'
      },
      {
        id: 'cramer-f', title: 'Cramer-szabály', en: "Cramer's rule",
        parts: [{ t: 'x_i', d: 'Az Ax = b egyenletrendszer megoldásának i-edik ismeretlene' }, { t: '=' },
          { t: 'det A_i', d: 'Annak a mátrixnak a determinánsa, amelyet A-ból úgy kapunk, hogy i-edik oszlopát a b jobb oldallal cseréljük' }, { t: '/' },
          { t: 'det A', d: 'Az együtthatómátrix determinánsa', more: 'Csak det A ≠ 0 esetén alkalmazható (ekkor egyértelmű a megoldás).' }],
        text: 'Elméletileg elegáns zárt képlet, de n ismeretlenre n + 1 darab n×n-es determinánst kell kiszámolni, ezért nagy rendszerekre a Gauss-elimináció sokkal gyorsabb.',
        example: '2x + y = 5, x + 3y = 10: `det A = 2·3 − 1·1 = 5`, `det A₁ = 5·3 − 1·10 = 5`, `det A₂ = 2·10 − 5·1 = 15`, tehát x = 1, y = 3.'
      },
      {
        id: 'kifejtes-f', title: 'Determináns kifejtése sor szerint (Laplace)', en: 'Laplace (cofactor) expansion',
        parts: [{ t: 'det A', d: 'Az n×n-es A mátrix determinánsa' }, { t: '=' },
          { t: 'Σ_{j=1}^{n}', d: 'Összegzés a rögzített i-edik sor elemein' },
          { t: '(−1)^{i+j}', d: 'Sakktábla-előjel: a bal felső sarokban +, majd váltakozik', more: '+ − +\n− + −\n+ − +' }, { t: '·' },
          { t: 'a_{ij}', d: 'Az i-edik sor j-edik eleme' }, { t: '·' },
          { t: 'det A_{ij}', d: 'Aldetermináns: az i-edik sor és a j-edik oszlop elhagyásával kapott (n−1)×(n−1)-es mátrix determinánsa', more: 'Az előjellel együtt ez az a_ij elemhez tartozó adjungált aldetermináns (kofaktor).' }],
        text: 'Bármelyik sor vagy oszlop szerint kifejthetünk – érdemes azt választani, amelyikben a legtöbb nulla van. 2×2-es esetben: `det [a b; c d] = ad − bc`.',
        example: '`det [2 0 1; 1 3 2; 1 1 4]` az első sor szerint: `2·(3·4 − 2·1) − 0·(…) + 1·(1·1 − 3·1) = 20 − 2 = 18`.'
      },
      {
        id: 'dimenzio-tetel', title: 'Dimenziótétel (rang–nullitás tétel)', en: 'rank–nullity theorem',
        parts: [{ t: 'dim Ker φ', d: 'A magtér dimenziója (nullitás): hány „irány” képződik a nullvektorba' }, { t: '+' },
          { t: 'dim Im φ', d: 'A képtér dimenziója: a leképezés (mátrix) rangja' }, { t: '=' },
          { t: 'dim V', d: 'Az értelmezési tartomány (kiindulási tér) dimenziója; mátrixnál az oszlopok száma' }],
        text: 'Ami „elveszik” (a magtér) és ami „megmarad” (a képtér), együtt kiadja a kiindulási tér dimenzióját. Egyenletrendszerekre: a homogén Ax = 0 megoldásainak szabad paraméterei = ismeretlenek száma − rang.',
        example: 'A = [1 2; 2 4]: a második sor az első kétszerese, rang A = 1, ezért a magtér dimenziója 2 − 1 = 1: `Ker A = {t·(2; −1)}`.'
      },
      {
        id: 'karakterisztikus-f', title: 'Karakterisztikus egyenlet', en: 'characteristic equation',
        parts: [{ t: 'det(' }, { t: 'A', d: 'Négyzetes (n×n-es) mátrix' }, { t: '−' },
          { t: 'λ', d: 'Ismeretlen skalár: a keresett sajátérték' }, { t: 'E', d: 'Egységmátrix (angolul I)' }, { t: ')' }, { t: '=' }, { t: '0', d: 'A mátrix szinguláris: van nemnulla x, amelyre (A − λE)x = 0' }],
        text: 'A bal oldal λ-nak n-edfokú polinomja, a **karakterisztikus polinom**; gyökei a sajátértékek. Hasznos ellenőrzés: a sajátértékek összege a főátló összege (nyom), szorzatuk a determináns.',
        example: 'A = [2 1; 1 2]: `det(A − λE) = (2 − λ)² − 1 = λ² − 4λ + 3 = (λ − 1)(λ − 3)`, tehát λ₁ = 3, λ₂ = 1. Ellenőrzés: 3 + 1 = 4 = 2 + 2, 3·1 = 3 = det A.'
      }
    ],
    terms: [
      /* ----- Vektorok és vektorterek ----- */
      { id: 'vektor', term: 'Vektor', en: 'vector', topic: 'vektor',
        short: 'Iránnyal és nagysággal rendelkező mennyiség; koordinátákkal megadva rendezett számn-es, pl. (3; 1) ∈ ℝ².',
        prereq: ['lecke:matematika/pitagorasz', 'lecke:fizika/newton'],
        visual: vecSvg, caption: 'Vektorok összeadása: a paralelogramma átlója, koordinátánként (3; 1) + (1; 2) = (4; 3).',
        text: 'Geometriailag a vektor irányított szakasz, amelyet szabadon eltolhatunk: csak az iránya és a hossza számít. Koordinátarendszerben a vektor számok rendezett n-ese, ℝⁿ eleme.\n\nAlapműveletek koordinátánként:\n\n- **összeadás**: `(a₁; a₂) + (b₁; b₂) = (a₁ + b₁; a₂ + b₂)` – geometriailag paralelogramma- vagy háromszögszabály;\n- **skalárral szorzás**: `λ·(a₁; a₂) = (λa₁; λa₂)` – nyújtás, zsugorítás, negatív λ-nál irányfordítás.\n\nA **hossz** (euklideszi norma) a Pitagorasz-tételből: `|a| = √(a₁² + a₂² + … + aₙ²)`. Az 1 hosszú vektor **egységvektor**; bármely nemnulla a-ból `a/|a|` egységvektort készít.\n\nAbsztrakt szinten **vektortér** minden olyan halmaz, amelyben értelmes az összeadás és a skalárral szorzás a megszokott szabályokkal (kommutativitás, asszociativitás, disztributivitás, nullvektor, ellentett). Így vektorok a polinomok, a mátrixok vagy a függvények is.',
        example: 'a = (3; 1), b = (1; 2): `a + b = (4; 3)`, `|a + b| = √(16 + 9) = 5`, `2a − b = (5; 0)`. Fizikában: két erő eredője a vektori összegük.',
        pitfall: 'A hosszak nem adódnak össze: |a + b| ≤ |a| + |b| (háromszög-egyenlőtlenség). Itt |a| + |b| = √10 + √5 ≈ 5,40, de |a + b| = 5.',
        related: ['skalaris-szorzat', 'linearis-kombinacio', 'bazis', 'alter', 'matrix'] },
      { id: 'skalaris-szorzat', term: 'Skaláris szorzat', en: 'dot product, scalar product, inner product', topic: 'vektor',
        short: 'Két vektorhoz egy számot rendelő művelet: a·b = Σ aᵢbᵢ = |a|·|b|·cos φ.',
        prereq: ['linearis-algebra/vektor'],
        visual: projSvg, caption: 'A skaláris szorzat a vetülettel kapcsolatos: a·b = |b| · (a vetületének előjeles hossza b irányában).',
        text: 'A skaláris szorzatból kapjuk meg a geometria két alapmennyiségét:\n\n- **hossz**: `|a| = √(a·a)`;\n- **szög**: `cos φ = a·b / (|a|·|b|)`.\n\nKét vektor **merőleges** (ortogonális), ha skaláris szorzatuk 0. Tulajdonságai: szimmetrikus (a·b = b·a), mindkét tényezőjében lineáris, és a·a ≥ 0, egyenlőség csak a nullvektorra.\n\nFizikai jelentés: a munka az erő és az elmozdulás skaláris szorzata, `W = F·s = |F|·|s|·cos φ`. Adatelemzésben a **koszinusz-hasonlóság** (pl. szöveges dokumentumok összevetésére) ugyanez a képlet.\n\nÁltalánosítás: **belső szorzat** bármilyen művelet, amely szimmetrikus, lineáris és pozitív definit – például függvényekre `⟨f, g⟩ = ∫ f(x)g(x) dx`.',
        formulas: ['skalaris-f', 'vetites-f'],
        example: 'a = (2; 3), b = (5; 1): `a·b = 13`, cos φ ≈ 0,707, φ = 45°. Merőlegesség-próba: (1; 2)·(2; −1) = 2 − 2 = 0, tehát merőlegesek.',
        pitfall: 'A skaláris szorzat eredménye **szám**, nem vektor, ezért (a·b)·c és a·(b·c) teljesen más (az egyik c, a másik a irányú). „Osztani” sem lehet vele: a·b = a·c-ből nem következik b = c.',
        related: ['vektor', 'vektorialis-szorzat', 'ortogonalitas', 'gram-schmidt', 'matrixszorzas'] },
      { id: 'vektorialis-szorzat', term: 'Vektoriális szorzat', en: 'cross product, vector product', topic: 'vektor',
        short: 'Két térbeli vektorhoz egy mindkettőre merőleges vektort rendelő művelet; hossza a kifeszített paralelogramma területe: |a × b| = |a|·|b|·sin φ.',
        text: 'Csak **háromdimenziós** térben értelmezett. Koordinátákkal:\n\n`a × b = (a₂b₃ − a₃b₂; a₃b₁ − a₁b₃; a₁b₂ − a₂b₁)`.\n\nEz megjegyezhető egy formális 3×3-as determinánsként, amelynek első sora az i, j, k egységvektorok.\n\nTulajdonságai:\n\n- iránya merőleges a-ra és b-re, a **jobbkéz-szabály** szerint (a: hüvelykujj, b: mutatóujj, a × b: középső ujj);\n- **antikommutatív**: b × a = −(a × b);\n- párhuzamos vektorok vektoriális szorzata a nullvektor.\n\nFizikai alkalmazások: forgatónyomaték `M = r × F`, Lorentz-erő `F = q·v × B`, impulzusmomentum `L = r × p`. A **vegyes szorzat** `(a × b)·c` a három vektor által kifeszített paralelepipedon előjeles térfogata – ez egyenlő a három vektorból képzett 3×3-as determinánssal.',
        example: 'a = (1; 2; 3), b = (4; 5; 6): `a × b = (2·6 − 3·5; 3·4 − 1·6; 1·5 − 2·4) = (−3; 6; −3)`. Ellenőrzés: a·(a × b) = −3 + 12 − 9 = 0 ✓. A paralelogramma területe `√(9 + 36 + 9) = √54 ≈ 7,35`.',
        pitfall: 'A vektoriális szorzat nem asszociatív: (a × b) × c ≠ a × (b × c) általában. A tényezők sorrendje az előjelet is megfordítja.',
        related: ['skalaris-szorzat', 'determinans', 'vektor'] },
      { id: 'linearis-kombinacio', term: 'Lineáris kombináció és kifeszített altér', en: 'linear combination, span', topic: 'vektor',
        short: 'A v₁, …, vₖ vektorok lineáris kombinációja a λ₁v₁ + λ₂v₂ + … + λₖvₖ alakú vektor; az összes ilyen vektor halmaza a vektorok által kifeszített (generált) altér.',
        text: 'A lineáris kombináció a lineáris algebra alapművelete: skalárszorosok összege. A **kifeszített altér** (jelölés: span{v₁, …, vₖ} vagy ⟨v₁, …, vₖ⟩) azokból a vektorokból áll, amelyek előállnak így.\n\n- Egy nemnulla vektor egy origón átmenő **egyenest** feszít ki.\n- Két nem párhuzamos vektor egy origón átmenő **síkot**.\n- Ha egy vektor kifejezhető a többivel, akkor elhagyható: nem növeli a kifeszített alteret.\n\nAz a kérdés, hogy egy b vektor előáll-e v₁, …, vₖ lineáris kombinációjaként, egy **lineáris egyenletrendszer** megoldhatóságát jelenti: az együtthatómátrix oszlopai a vᵢ vektorok, az ismeretlenek a λᵢ együtthatók. Az Ax szorzat is pontosan ez: A oszlopainak x koordinátáival vett lineáris kombinációja.',
        example: 'Előáll-e (5; 5) az a = (3; 1) és b = (1; 2) kombinációjaként? `3x + y = 5`, `x + 2y = 5` ⟹ x = 1, y = 2. Tehát `(5; 5) = a + 2b`. Mivel a és b nem párhuzamos, az egész síkot kifeszítik.',
        pitfall: 'A kifeszített altér mindig tartalmazza a nullvektort (minden együttható 0). Ezért az origón át nem menő egyenes vagy sík semmilyen vektorrendszer kifeszített altere sem lehet.',
        related: ['linearis-fuggetlenseg', 'bazis', 'alter', 'linearis-egyenletrendszer', 'vektor'] },
      { id: 'linearis-fuggetlenseg', term: 'Lineáris függetlenség', en: 'linear independence', topic: 'vektor',
        short: 'A v₁, …, vₖ vektorok lineárisan függetlenek, ha λ₁v₁ + … + λₖvₖ = 0 csak a λ₁ = … = λₖ = 0 triviális választással teljesül.',
        text: 'Ekvivalens megfogalmazás: egyik vektor sem fejezhető ki a többi lineáris kombinációjaként – nincs „fölösleges” vektor a rendszerben. Ha van nemtriviális előállítás, a rendszer **lineárisan összefüggő**.\n\nGyakorlati vizsgálat: a vektorokat egy mátrix oszlopaiba írjuk, és Gauss-eliminációval meghatározzuk a **rangot**. A rendszer pontosan akkor független, ha a rang a vektorok számával egyenlő. n darab ℝⁿ-beli vektornál ez azzal ekvivalens, hogy a determináns nem 0.\n\nGyors szabályok:\n\n- a nullvektort tartalmazó rendszer mindig összefüggő;\n- két vektor pontosan akkor összefüggő, ha párhuzamosak;\n- ℝⁿ-ben n-nél több vektor mindig összefüggő.',
        example: '(1; 2; 3), (4; 5; 6), (7; 8; 9) összefüggők, mert `(7; 8; 9) = 2·(4; 5; 6) − (1; 2; 3)`. A determinánsuk 0, a rangjuk 2: csak egy síkot feszítenek ki a térben.',
        pitfall: 'Páronként nem párhuzamos vektorok még lehetnek összefüggők: a fenti három vektor közül semelyik kettő nem párhuzamos, mégis egy síkban fekszenek.',
        related: ['linearis-kombinacio', 'bazis', 'rang', 'determinans', 'dimenzio'] },
      { id: 'bazis', term: 'Bázis és koordináták', en: 'basis, coordinates', topic: 'vektor',
        short: 'Lineárisan független generátorrendszer: a tér minden vektora egyértelműen előáll a bázisvektorok lineáris kombinációjaként; az együtthatók a koordináták.',
        prereq: ['linearis-algebra/linearis-fuggetlenseg'],
        visual: basisSvg, caption: 'A v = (5; 4) vektor koordinátái a B = {(2; 1), (1; 2)} bázisban (2; 1).',
        text: 'A bázis két feltétele:\n\n1. **generátorrendszer**: kifeszíti az egész teret (minden vektor előáll);\n2. **lineárisan független**: az előállítás egyértelmű.\n\nA **standard bázis** ℝⁿ-ben az e₁ = (1; 0; …; 0), …, eₙ = (0; …; 0; 1) egységvektorokból áll; ebben a koordináták egyszerűen a vektor komponensei. Más bázisban ugyanannak a vektornak más koordinátái vannak – ez a **bázistranszformáció**.\n\nHa P a mátrix, amelynek oszlopai az új bázis vektorai, akkor `v = P·[v]_B`, vagyis `[v]_B = P⁻¹·v`. A jól választott bázis egyszerűsíti a problémát: sajátvektor-bázisban a mátrix diagonális, ortonormált bázisban a koordináták egyszerű skaláris szorzatok.',
        example: 'B = {(2; 1), (1; 2)}, v = (5; 4): `2x + y = 5`, `x + 2y = 4` ⟹ x = 2, y = 1. Tehát `[v]_B = (2; 1)` (ábra).',
        pitfall: 'A bázis nem egyértelmű – egy térnek végtelen sok bázisa van. Ami egyértelmű, az a bázisvektorok **száma**: ez a dimenzió.',
        related: ['linearis-fuggetlenseg', 'dimenzio', 'linearis-kombinacio', 'diagonalizalas', 'gram-schmidt', 'ortogonalitas'] },
      { id: 'dimenzio', term: 'Dimenzió', en: 'dimension', topic: 'vektor',
        short: 'Egy vektortér bármely bázisának elemszáma (ez minden bázisra ugyanannyi); jelölés: dim V.',
        text: 'A dimenzió a tér „szabadsági fokainak” száma: ennyi független irány van benne, ennyi koordináta kell egy vektor megadásához. Példák:\n\n- dim ℝⁿ = n;\n- a legfeljebb másodfokú polinomok tere 3 dimenziós (bázis: 1, x, x²);\n- a 2×2-es mátrixok tere 4 dimenziós;\n- az origón átmenő sík a térben 2 dimenziós altér.\n\nHasznos következmények n dimenziós térben: n-nél több vektor mindig összefüggő; n-nél kevesebb vektor nem generálja a teret; n darab vektorra a függetlenség és a generálás **ekvivalens** – elég az egyiket ellenőrizni.\n\nA lineáris leképezések dimenzióit a **dimenziótétel** köti össze: dim Ker + dim Im = a kiindulási tér dimenziója.',
        formulas: ['dimenzio-tetel'],
        example: 'Az x + y + z = 0 sík ℝ³-ban: egy egyenlet egy feltételt jelent, így a dimenzió 3 − 1 = 2. Egy bázis: (1; −1; 0) és (1; 0; −1).',
        pitfall: 'A ℝ³-beli sík 2 dimenziós, de a vektorainak 3 koordinátája van. A dimenzió nem a koordináták száma, hanem a független irányoké.',
        related: ['bazis', 'alter', 'rang', 'magter-kepter', 'linearis-fuggetlenseg'] },
      { id: 'alter', term: 'Altér', en: 'subspace', topic: 'vektor',
        short: 'Egy vektortér nem üres részhalmaza, amely zárt az összeadásra és a skalárral szorzásra – így maga is vektortér.',
        text: 'Az altér-feltétel ellenőrzése három lépés: (1) a **nullvektor** benne van; (2) két elemének összege is benne van; (3) bármely elemének skalárszorosa is benne van.\n\nℝ³ alterei: a {0}, az origón átmenő egyenesek, az origón átmenő síkok és maga ℝ³. Fontos alterek mátrixokhoz:\n\n- **magtér** (nulltér): Ker A = {x : Ax = 0};\n- **oszloptér** (képtér): Im A = {Ax}, A oszlopai által kifeszített altér;\n- **sajátaltér**: egy λ sajátértékhez tartozó sajátvektorok és a nullvektor.\n\nHomogén lineáris egyenletrendszer megoldáshalmaza mindig altér; inhomogéné soha (nem tartalmazza a 0-t).',
        example: 'Az x + y + z = 0 sík altér: ha két vektorra teljesül, összegükre és skalárszorosukra is. Az x + y + z = 1 sík nem altér, mert a (0; 0; 0) nincs rajta.',
        pitfall: 'Két altér **uniója** általában nem altér: az x és az y tengely uniójában benne van (1; 0) és (0; 1), de összegük, (1; 1) nincs. A **metszet** viszont mindig altér.',
        related: ['linearis-kombinacio', 'dimenzio', 'magter-kepter', 'sajatertek', 'vektor'] },

      /* ----- Mátrixok ----- */
      { id: 'matrix', term: 'Mátrix', en: 'matrix', topic: 'matrix',
        short: 'Számok téglalap alakú táblázata m sorral és n oszloppal (m×n-es mátrix); aᵢⱼ az i-edik sor j-edik eleme.',
        text: 'A mátrix egyszerre adattábla és leképezés: minden m×n-es A mátrix egy ℝⁿ → ℝᵐ lineáris leképezést ad (x ↦ Ax), és fordítva.\n\nMűveletek:\n\n- **összeadás**: azonos méretű mátrixok elemenként;\n- **skalárral szorzás**: minden elemet szorzunk;\n- **mátrixszorzás**: „sor · oszlop”, ez a leképezések egymás utáni alkalmazása.\n\nNevezetes mátrixok: **négyzetes** (n×n), **egységmátrix** E (vagy I: főátlóban 1, máshol 0; AE = EA = A), **diagonális** (csak a főátlóban van nemnulla), **felső háromszög** (a főátló alatt csupa 0), **szimmetrikus** (Aᵀ = A).\n\nA szövegben a mátrixokat soronként írjuk, a sorokat pontosvessző választja el: `[1 2; 3 4]` az a 2×2-es mátrix, amelynek első sora 1, 2, második sora 3, 4.',
        example: '`[1 2; 3 4] + [0 1; 1 0] = [1 3; 4 4]`, `3·[1 2; 3 4] = [3 6; 9 12]`. A [1 2; 3 4] mátrix az (1; 0) vektort (1; 3)-ba, a (0; 1) vektort (2; 4)-be viszi: az oszlopok a bázisvektorok képei.',
        pitfall: 'A méret sorrendje: **sor × oszlop**. Egy 2×3-as mátrixnak 2 sora és 3 oszlopa van; aᵢⱼ-ben is mindig a sorindex áll elöl.',
        related: ['matrixszorzas', 'transzponalt', 'inverz-matrix', 'linearis-lekepezes', 'rang', 'vektor'] },
      { id: 'matrixszorzas', term: 'Mátrixszorzás', en: 'matrix multiplication', topic: 'matrix',
        short: 'Az m×n-es A és az n×p-s B szorzata az m×p-s C = AB mátrix, amelynek cᵢⱼ eleme A i-edik sorának és B j-edik oszlopának skaláris szorzata.',
        prereq: ['linearis-algebra/matrix', 'linearis-algebra/skalaris-szorzat'],
        visual: mmulSvg, caption: 'A c₁₂ elem: A első sora szorozva B második oszlopával.',
        text: 'A mátrixszorzás definíciója azért ilyen „furcsa”, mert a **leképezések kompozíciója**: ha x-re előbb B-t, aztán A-t alkalmazzuk, az eredmény `A(Bx) = (AB)x`. Ezért a szorzat jobbról balra olvasandó.\n\nTulajdonságok:\n\n- **asszociatív**: (AB)C = A(BC);\n- **disztributív**: A(B + C) = AB + AC;\n- **nem kommutatív**: AB ≠ BA általában (sőt, BA nem is mindig értelmezett);\n- AB = 0-ból nem következik, hogy A = 0 vagy B = 0.\n\nn×n-es mátrixok szorzása a definíció szerint n³ szorzás; ennél gyorsabb algoritmusok is vannak (Strassen: ~n^2,81). A grafikus kártyák és a neurális hálózatok számításainak nagy része mátrixszorzás.',
        formulas: ['matrixszorzas-f'],
        example: 'A = [1 2; 3 4], B = [0 1; 1 0]: `AB = [2 1; 4 3]` (A oszlopai felcserélődnek), de `BA = [3 4; 1 2]` (A sorai cserélődnek). Tehát AB ≠ BA.',
        pitfall: '(A + B)² ≠ A² + 2AB + B², mert a kifejtés A² + AB + BA + B², és AB ≠ BA. Az iskolai azonosságok mátrixokra csak felcserélhető tényezőknél érvényesek.',
        related: ['matrix', 'skalaris-szorzat', 'linearis-lekepezes', 'inverz-matrix', 'transzponalt'] },
      { id: 'transzponalt', term: 'Transzponált mátrix', en: 'transpose', topic: 'matrix',
        short: 'Az A mátrix sorainak és oszlopainak felcserélésével kapott Aᵀ mátrix: (Aᵀ)ᵢⱼ = aⱼᵢ.',
        text: 'Egy m×n-es mátrix transzponáltja n×m-es; a főátlóra tükrözzük. Szabályok:\n\n- (Aᵀ)ᵀ = A, (A + B)ᵀ = Aᵀ + Bᵀ;\n- **(AB)ᵀ = BᵀAᵀ** – a sorrend megfordul;\n- det Aᵀ = det A, rang Aᵀ = rang A.\n\nA skaláris szorzat mátrixalakja: `a·b = aᵀb` (sorvektor szorozva oszlopvektorral). Az **AᵀA** mátrix mindig szimmetrikus és pozitív szemidefinit – ez jelenik meg a legkisebb négyzetek módszerében (`AᵀA x = Aᵀb`, normálegyenlet) és a kovarianciamátrixban.\n\n**Szimmetrikus** mátrix: Aᵀ = A. Ezeknek minden sajátértéke valós, és van ortonormált sajátvektor-bázisuk (spektráltétel).',
        example: 'A = [1 2 3; 4 5 6] (2×3) ⟹ `Aᵀ = [1 4; 2 5; 3 6]` (3×2). `AAᵀ = [14 32; 32 77]` – szimmetrikus, ahogy várható.',
        pitfall: '(AB)ᵀ ≠ AᵀBᵀ: a méretek sem stimmelnének (ha A 2×3-as és B 3×4-es, akkor Aᵀ 3×2-es, Bᵀ 4×3-as, így AᵀBᵀ nem is értelmezett).',
        related: ['matrix', 'matrixszorzas', 'ortogonalitas', 'determinans', 'pca'] },
      { id: 'inverz-matrix', term: 'Inverz mátrix', en: 'inverse matrix', topic: 'matrix',
        short: 'Az n×n-es A mátrix inverze az az A⁻¹, amelyre AA⁻¹ = A⁻¹A = E; pontosan akkor létezik, ha det A ≠ 0 (A reguláris).',
        text: 'Az inverz a leképezés „visszacsinálása”. Ha létezik, az Ax = b egyenletrendszer egyetlen megoldása `x = A⁻¹b`.\n\nEgyenértékű feltételek n×n-es A-ra (**invertálhatósági tétel**): A invertálható ⟺ det A ≠ 0 ⟺ rang A = n ⟺ oszlopai lineárisan függetlenek ⟺ Ax = 0-nak csak a triviális megoldása van ⟺ 0 nem sajátérték.\n\nKiszámítás: 2×2-esre zárt képlet; nagyobbra Gauss–Jordan-eliminációval: `[A | E] → [E | A⁻¹]`.\n\nSzabályok: `(AB)⁻¹ = B⁻¹A⁻¹` (a sorrend megfordul, mint a „zokni–cipő” elvnél: amit utoljára vettél fel, azt veszed le először), `(Aᵀ)⁻¹ = (A⁻¹)ᵀ`, `det A⁻¹ = 1/det A`.',
        formulas: ['inverz-f'],
        example: 'A = [2 1; 5 3], det A = 1 ⟹ `A⁻¹ = [3 −1; −5 2]`. A 2x + y = 4, 5x + 3y = 11 rendszer megoldása: `x = A⁻¹·(4; 11) = (12 − 11; −20 + 22) = (1; 2)`.',
        pitfall: 'Numerikus számításban az inverzet szinte soha nem számoljuk ki ténylegesen az Ax = b megoldásához: a Gauss-elimináció (LU-felbontás) gyorsabb és pontosabb. Mátrixokkal „osztani” sem lehet: A/B értelmetlen, AB⁻¹ és B⁻¹A különbözik.',
        related: ['determinans', 'matrix', 'gauss-eliminacio', 'rang', 'linearis-egyenletrendszer', 'cramer-szabaly'] },
      { id: 'rang', term: 'Rang', en: 'rank', topic: 'matrix',
        short: 'Egy mátrix lineárisan független oszlopainak (vagy ugyanannyi: sorainak) maximális száma; egyenlő az oszloptér dimenziójával.',
        text: 'A rang megmutatja, hány „valódi” információt hordoz a mátrix. Meghatározása: Gauss-eliminációval lépcsős alakra hozzuk, a **nemnulla sorok száma** a rang. A sorműveletek nem változtatják meg a rangot.\n\nAlaptény: **sorrang = oszloprang**, vagyis rang A = rang Aᵀ. Egy m×n-es mátrixra rang A ≤ min(m, n); ha egyenlőség áll, a mátrix **teljes rangú**.\n\nA rang szerepe:\n\n- **megoldhatóság** (Kronecker–Capelli-tétel): Ax = b pontosan akkor oldható meg, ha rang A = rang [A | b];\n- a szabad paraméterek száma: n − rang A;\n- a leképezés képterének dimenziója (dimenziótétel).\n\nAlkalmazás: az **alacsony rangú közelítés** (szinguláris érték szerinti felbontással) a képtömörítés és az ajánlórendszerek alapja.',
        example: 'A = [1 2 3; 2 4 6; 1 0 1]: a második sor az első kétszerese. Eliminálva `[1 2 3; 0 −2 −2; 0 0 0]`, két nemnulla sor, rang A = 2. Ezért det A = 0, és A nem invertálható.',
        pitfall: 'A rangot nem a nemnulla elemek vagy a nemnulla sorok száma adja az **eredeti** mátrixban – csak lépcsős alakban olvasható le így.',
        related: ['linearis-fuggetlenseg', 'gauss-eliminacio', 'linearis-egyenletrendszer', 'dimenzio', 'magter-kepter', 'inverz-matrix'] },

      /* ----- Egyenletrendszerek és determináns ----- */
      { id: 'linearis-egyenletrendszer', term: 'Lineáris egyenletrendszer és megoldhatósága', en: 'system of linear equations, solvability', topic: 'egyenlet',
        short: 'Elsőfokú egyenletek rendszere, mátrixalakban Ax = b; megoldható, ha rang A = rang [A | b] (Kronecker–Capelli-tétel).',
        prereq: ['lecke:matematika/egyenletek', 'lecke:matematika/linearis-fuggveny'],
        text: 'Az m egyenletből álló, n ismeretlenes rendszer mátrixalakja `Ax = b`, ahol A az m×n-es **együtthatómátrix**, b a jobb oldal. A megoldások száma csak háromféle lehet:\n\n1. **nincs megoldás** (ellentmondásos): rang A < rang [A | b];\n2. **pontosan egy**: rang A = rang [A | b] = n;\n3. **végtelen sok**: rang A = rang [A | b] < n; ekkor n − rang A szabad paraméter van.\n\nGeometriailag két ismeretlennél minden egyenlet egy egyenes: a megoldás a metszéspontjuk (egy pont, nincs – párhuzamosak –, vagy egybeesnek).\n\n**Szerkezet**: ha xₚ egy partikuláris megoldás, akkor az összes megoldás `x = xₚ + x_h`, ahol x_h a **homogén** Ax = 0 rendszer tetszőleges megoldása (a magtér eleme). A homogén rendszernek mindig van megoldása (x = 0).',
        example: 'x + y = 2, 2x + 2y = 5: rang A = 1, de rang [A | b] = 2 (a második egyenlet bal oldala az első kétszerese, a jobb oldal nem) – nincs megoldás, a két egyenes párhuzamos. Ha a jobb oldal 4 lenne, végtelen sok megoldás volna: (t; 2 − t).',
        pitfall: 'Az, hogy ugyanannyi egyenlet van, mint ismeretlen, nem garantálja az egyértelmű megoldást: ehhez det A ≠ 0 is kell.',
        related: ['gauss-eliminacio', 'cramer-szabaly', 'rang', 'inverz-matrix', 'magter-kepter', 'linearis-kombinacio'] },
      { id: 'gauss-eliminacio', term: 'Gauss-elimináció', en: 'Gaussian elimination', topic: 'egyenlet',
        short: 'Egyenletrendszerek megoldó algoritmusa: elemi sorműveletekkel a kibővített mátrixot lépcsős alakra hozzuk, majd visszahelyettesítünk.',
        prereq: ['lecke:matematika/egyenletek'],
        visual: gaussSvg, caption: 'Az x + y + z = 6, 2x + y − z = 1, x − y + 2z = 5 rendszer megoldása: (x; y; z) = (1; 2; 3).',
        text: 'Az **elemi sorműveletek** nem változtatják meg a megoldáshalmazt:\n\n1. sor szorzása nemnulla számmal;\n2. egy sor számszorosának hozzáadása egy másik sorhoz;\n3. két sor cseréje.\n\nAz algoritmus oszlopról oszlopra halad: kiválaszt egy nemnulla **főelemet** (pivot), és alatta minden elemet kinulláz. Az eredmény a **lépcsős alak**, amelyből a rang és a megoldhatóság leolvasható, a megoldás pedig alulról felfelé visszahelyettesítéssel adódik.\n\n**Gauss–Jordan-elimináció**: a főelemek fölött is nullázunk és 1-re normálunk – ez a **redukált lépcsős alak**, amelyből a megoldás közvetlenül leolvasható; így számoljuk az inverzet is.\n\nMűveletigény n×n-es rendszerre kb. 2n³/3 művelet. Numerikusan a **részleges főelemkiválasztás** (az oszlop legnagyobb abszolút értékű elemét választjuk pivotnak) csökkenti a kerekítési hibákat.',
        example: 'Az ábra rendszere: II − 2·I és III − I után `[0 −1 −3 | −11]` és `[0 −2 1 | −1]`, majd III − 2·II után `[0 0 7 | 21]`. Innen z = 3, y = 2, x = 1. Ellenőrzés: 1 − 2 + 6 = 5 ✓.',
        pitfall: 'Ha eliminálás közben `[0 0 0 | c]` sor jön ki c ≠ 0-val, a rendszer **ellentmondásos** (0 = c). Ha c = 0, a sor elhagyható, és szabad paraméter jelenik meg – ezt nem szabad „hibaként” kezelni.',
        related: ['linearis-egyenletrendszer', 'rang', 'inverz-matrix', 'determinans', 'cramer-szabaly'] },
      { id: 'cramer-szabaly', term: 'Cramer-szabály', en: "Cramer's rule", topic: 'egyenlet',
        short: 'Négyzetes, det A ≠ 0 együtthatómátrixú rendszer megoldása determinánsokkal: xᵢ = det Aᵢ / det A.',
        prereq: ['linearis-algebra/determinans'],
        text: 'Aᵢ az a mátrix, amelyet A-ból az i-edik oszlop b-re cserélésével kapunk. A szabály a determináns linearitásából következik.\n\nElőnyei: zárt képletet ad, így jól használható **elméleti** vizsgálatokra (pl. hogyan függ a megoldás egy paramétertől), és kis (2×2-es, 3×3-as) rendszereknél kézi számolásra.\n\nHátránya: n ismeretlennél n + 1 darab n×n-es determináns kell, ami nagy n-re sokkal lassabb a Gauss-eliminációnál. Ha det A = 0, a szabály nem alkalmazható – a rendszernek ilyenkor vagy nincs, vagy végtelen sok megoldása van.',
        formulas: ['cramer-f'],
        example: '2x + y = 5, x + 3y = 10: `det A = 5`, `det A₁ = det [5 1; 10 3] = 5`, `det A₂ = det [2 5; 1 10] = 15`, tehát x = 5/5 = 1, y = 15/5 = 3.',
        pitfall: 'Az i-edik **oszlopot** kell b-re cserélni, nem a sort. És a nevező mindig az eredeti det A.',
        related: ['determinans', 'linearis-egyenletrendszer', 'gauss-eliminacio', 'inverz-matrix'] },
      { id: 'determinans', term: 'Determináns', en: 'determinant', topic: 'egyenlet',
        short: 'Négyzetes mátrixhoz rendelt szám, amely megadja, hányszorosára változtatja a leképezés az (előjeles) területet/térfogatot; det A ≠ 0 ⟺ A invertálható.',
        visual: detSvg, caption: 'det [3 1; 1 2] = 5: az egységnégyzet képének területe 5.',
        text: '2×2-es mátrixra `det [a b; c d] = ad − bc`; 3×3-asra a Sarrus-szabállyal vagy kifejtéssel számolunk. Geometriai jelentés: az oszlopvektorok által kifeszített paralelogramma (paralelepipedon) **előjeles** területe (térfogata). Negatív előjel: a leképezés megfordítja az irányítást (tükröz).\n\nTulajdonságok:\n\n- két sor cseréje −1-gyel szoroz; egy sor λ-szorosa λ-val szorozza a determinánst;\n- egy sor számszorosának hozzáadása egy másikhoz **nem változtat** – ezért Gauss-eliminációval gyorsan számolható: háromszögmátrix determinánsa a főátló szorzata;\n- **det(AB) = det A · det B**, det Aᵀ = det A;\n- det(λA) = λⁿ·det A n×n-es mátrixra;\n- ha két sor egyenlő vagy van csupa nulla sor, a determináns 0.',
        formulas: ['kifejtes-f', 'cramer-f'],
        example: 'det [3 1; 1 2] = 3·2 − 1·1 = 5 (ábra). Az ábrán szereplő Gauss-példa lépcsős alakjából: det = 1·(−1)·7 = −7 (sorcsere nem volt, a hozzáadások nem változtatnak).',
        pitfall: 'det(A + B) ≠ det A + det B általában, és det(2A) nem 2·det A, hanem 2ⁿ·det A (n×n-es esetben). A determináns csak **négyzetes** mátrixra értelmezett.',
        related: ['kifejtesi-tetel', 'inverz-matrix', 'cramer-szabaly', 'linearis-lekepezes', 'sajatertek', 'vektorialis-szorzat', 'gauss-eliminacio'] },
      { id: 'kifejtesi-tetel', term: 'Kifejtési tétel (Laplace-kifejtés)', en: 'Laplace expansion, cofactor expansion', topic: 'egyenlet',
        short: 'Az n×n-es determináns kiszámítható egy sor (vagy oszlop) elemeinek és a hozzájuk tartozó előjeles aldeterminánsoknak a szorzatösszegeként.',
        text: 'Az aᵢⱼ elemhez tartozó **aldetermináns** az i-edik sor és j-edik oszlop elhagyásával kapott (n−1)×(n−1)-es mátrix determinánsa; `(−1)^(i+j)`-vel szorozva **előjeles aldeterminánsnak** (kofaktornak) nevezzük. Az előjelek sakktábla-mintázatot követnek.\n\nA kifejtés rekurzív: egy n×n-es determinánst n darab (n−1)×(n−1)-esre vezet vissza. Kézzel érdemes a **legtöbb nullát** tartalmazó sort vagy oszlopot választani, vagy előtte sorműveletekkel nullákat csinálni.\n\nMűveletigénye a teljes rekurzióval n! nagyságrendű – egy 20×20-as mátrixra ez reménytelen, ezért számítógépen eliminációval (n³) számolunk. Az előjeles aldeterminánsokból álló mátrix transzponáltja az **adjungált mátrix**: `A⁻¹ = adj A / det A`.',
        formulas: ['kifejtes-f'],
        example: 'det [2 0 1; 1 3 2; 1 1 4] az első sor szerint: `2·det [3 2; 1 4] − 0 + 1·det [1 3; 1 1] = 2·10 + (−2) = 18`. A középső tag a 0 miatt kiesett.',
        pitfall: 'Az előjelet a **pozíció** határozza meg, nem az elem előjele: az (1; 2) helyen álló elem kofaktora mindig −1-szeres, akkor is, ha maga az elem negatív.',
        related: ['determinans', 'inverz-matrix', 'cramer-szabaly'] },

      /* ----- Lineáris leképezések és ortogonalitás ----- */
      { id: 'linearis-lekepezes', term: 'Lineáris leképezés', en: 'linear map, linear transformation', topic: 'lekepezes',
        short: 'Olyan φ: V → W függvény, amely megőrzi az összeadást és a skalárral szorzást: φ(u + v) = φ(u) + φ(v), φ(λv) = λφ(v).',
        prereq: ['lecke:matematika/linearis-fuggveny', 'linearis-algebra/matrix'],
        visual: mapSvg, caption: 'Egy lineáris leképezés a rácsot paralelogramma-rácsba viszi: az egyenesek egyenesek maradnak, az origó helyben marad.',
        text: 'A linearitás következménye, hogy a leképezést **teljesen meghatározzák a bázisvektorok képei**. Ha ezeket a képeket egy mátrix oszlopaiba írjuk, `φ(x) = Ax` – minden ℝⁿ → ℝᵐ lineáris leképezés mátrixszorzás, és fordítva.\n\nSíkbeli példák:\n\n- **forgatás** φ szöggel: `[cos φ −sin φ; sin φ cos φ]`;\n- **tükrözés** az x tengelyre: `[1 0; 0 −1]`;\n- **nyújtás**: `[a 0; 0 d]`;\n- **nyírás**: `[1 k; 0 1]`;\n- **vetítés** az x tengelyre: `[1 0; 0 0]`.\n\nA leképezések egymás után alkalmazása a mátrixok szorzata. Geometriailag a lineáris leképezés az origót helyben hagyja, egyeneseket egyenesbe, párhuzamosakat párhuzamosba visz, a területeket pedig |det A|-szorosára változtatja.\n\nA számítógépes grafika minden forgatása, skálázása és vetítése lineáris (vagy homogén koordinátákkal lineárissá tett) leképezés.',
        example: 'A 90°-os forgatás mátrixa `[0 −1; 1 0]`: az (1; 0) vektort (0; 1)-be, a (2; 1)-et (−1; 2)-be viszi. A determinánsa 1: a terület nem változik.',
        pitfall: 'Az iskolai „lineáris függvény”, f(x) = mx + b, b ≠ 0 esetén **nem** lineáris leképezés ebben az értelemben, mert f(0) ≠ 0. Ez **affin** leképezés: lineáris + eltolás.',
        related: ['matrix', 'matrixszorzas', 'magter-kepter', 'sajatertek', 'determinans', 'ortogonalitas', 'bazis'] },
      { id: 'magter-kepter', term: 'Magtér és képtér', en: 'kernel (null space) and image (range)', topic: 'lekepezes',
        short: 'A φ leképezés magtere a nullvektorba képződő vektorok altere (Ker φ), képtere a felvett értékek altere (Im φ).',
        text: 'Mátrixra: `Ker A = {x : Ax = 0}` (a homogén egyenletrendszer megoldásai) és `Im A = {Ax : x ∈ ℝⁿ}` (A oszlopai által kifeszített **oszloptér**).\n\nA két altér a leképezés „veszteségét” és „hatókörét” írja le:\n\n- φ **injektív** ⟺ Ker φ = {0} (semmi sem vész el);\n- φ **szürjektív** ⟺ Im φ = W (mindent elér);\n- dim Im φ = rang A.\n\nA **dimenziótétel** szerint `dim Ker φ + dim Im φ = dim V`. Következmény: négyzetes mátrixnál az injektivitás és a szürjektivitás ekvivalens – mindkettő az invertálhatóságot jelenti.\n\nAz Ax = b egyenlet pontosan akkor oldható meg, ha b ∈ Im A; a megoldás pedig pontosan akkor egyértelmű, ha Ker A = {0}.',
        formulas: ['dimenzio-tetel'],
        example: 'A = [1 2; 2 4]: `Ker A = {t·(2; −1)}` (egy egyenes), `Im A = {s·(1; 2)}` (egy másik egyenes). 1 + 1 = 2 = dim ℝ² ✓. Az Ax = (3; 6) megoldható, az Ax = (3; 5) nem, mert (3; 5) nem (1; 2) többszöröse.',
        pitfall: 'A magtér a **kiindulási** térben, a képtér a **cél**térben van. m×n-es mátrixnál Ker A ⊆ ℝⁿ, Im A ⊆ ℝᵐ.',
        related: ['linearis-lekepezes', 'rang', 'dimenzio', 'alter', 'linearis-egyenletrendszer'] },
      { id: 'ortogonalitas', term: 'Ortogonalitás, ortonormált bázis', en: 'orthogonality, orthonormal basis, orthogonal matrix', topic: 'lekepezes',
        short: 'Vektorok ortogonálisak, ha skaláris szorzatuk 0; ortonormált bázis páronként merőleges egységvektorokból áll; ortogonális mátrix oszlopai ortonormáltak (QᵀQ = E).',
        prereq: ['linearis-algebra/skalaris-szorzat'],
        text: 'Ortonormált bázisban (e₁, …, eₙ) a koordináták számolása triviális: `v = Σ (v·eᵢ)·eᵢ` – nem kell egyenletrendszert megoldani, elég skaláris szorzatokat venni. Ez teszi kényelmessé a Fourier-sorokat, a jelfeldolgozást és a kvantummechanikát.\n\n**Ortogonális mátrix**: Q négyzetes, oszlopai ortonormáltak. Ekvivalensen `QᵀQ = E`, azaz **Q⁻¹ = Qᵀ**. Ezek a leképezések **hossz- és szögtartók** (|Qx| = |x|): forgatások és tükrözések. Determinánsuk ±1.\n\n**Ortogonális komplementer**: egy U altér összes vektorára merőleges vektorok altere, U^⊥. Fontos összefüggés: `Ker A = (sorok tere)^⊥`, és dim U + dim U^⊥ = n.\n\nA **legkisebb négyzetek módszere** azt használja ki, hogy egy b vektorhoz egy altér legközelebbi pontja a merőleges vetület.',
        formulas: ['vetites-f'],
        example: 'A forgatásmátrix ortogonális: `Q = [cos φ −sin φ; sin φ cos φ]`, `QᵀQ = [cos²φ + sin²φ 0; 0 sin²φ + cos²φ] = [1 0; 0 1] = E`. A (3; 4) vektort 90°-kal elforgatva (−4; 3), a hossz mindkét esetben 5.',
        pitfall: 'Az „ortogonális mátrix” elnevezés félrevezető: oszlopainak nemcsak merőlegesnek, hanem **egységnyi hosszúnak** is kell lenniük. A [2 0; 0 2] oszlopai merőlegesek, de a mátrix nem ortogonális.',
        related: ['skalaris-szorzat', 'gram-schmidt', 'bazis', 'transzponalt', 'diagonalizalas', 'linearis-lekepezes'] },
      { id: 'gram-schmidt', term: 'Gram–Schmidt-ortogonalizáció', en: 'Gram–Schmidt process', topic: 'lekepezes',
        short: 'Eljárás, amely lineárisan független vektorokból ugyanazt az alteret kifeszítő ortogonális (normálás után ortonormált) rendszert készít.',
        prereq: ['linearis-algebra/skalaris-szorzat'],
        visual: gsSvg, caption: 'v₂-ből levonjuk a v₁ irányú vetületét: a maradék, u₂ merőleges v₁-re.',
        text: 'Lépései:\n\n1. `u₁ = v₁`;\n2. `u₂ = v₂ − proj_{u₁} v₂`;\n3. `u₃ = v₃ − proj_{u₁} v₃ − proj_{u₂} v₃`, és így tovább: minden új vektorból levonjuk a már elkészült irányokba eső vetületeit;\n4. végül normálunk: `eᵢ = uᵢ / |uᵢ|`.\n\nMinden lépés után span{u₁, …, uₖ} = span{v₁, …, vₖ}. Ha valamelyik uₖ = 0 jön ki, az azt jelenti, hogy vₖ az előzőek lineáris kombinációja volt.\n\nMátrixnyelven az eljárás a **QR-felbontás**: A = QR, ahol Q oszlopai ortonormáltak, R felső háromszögmátrix. Ez a legkisebb négyzetes feladatok és a sajátérték-számító QR-algoritmus alapja. Numerikusan a „módosított” Gram–Schmidt vagy a Householder-tükrözések stabilabbak.',
        formulas: ['vetites-f'],
        example: 'v₁ = (3; 1), v₂ = (1; 2): `u₂ = (1; 2) − (5/10)·(3; 1) = (−0,5; 1,5)`. Normálva: `e₁ = (3; 1)/√10`, `e₂ = (−1; 3)/√10`, és e₁·e₂ = (−3 + 3)/10 = 0.',
        pitfall: 'A vetületet mindig a már **ortogonalizált** uᵢ vektorokra kell venni, nem az eredeti vᵢ-kre – különben a harmadik lépéstől már nem kapunk merőleges vektorokat.',
        related: ['ortogonalitas', 'skalaris-szorzat', 'bazis', 'linearis-kombinacio'] },

      /* ----- Sajátértékek és alkalmazások ----- */
      { id: 'sajatertek', term: 'Sajátérték és sajátvektor', en: 'eigenvalue, eigenvector', topic: 'sajat',
        short: 'A négyzetes A mátrix sajátvektora olyan v ≠ 0 vektor, amelynek iránya a leképezéskor nem változik: Av = λv; a λ szám a hozzá tartozó sajátérték.',
        prereq: ['lecke:matematika/masodfoku', 'linearis-algebra/determinans'],
        visual: eigSvg, caption: 'Az A = [2 1; 1 2] a kört ellipszisbe viszi; a sajátvektorok az ellipszis tengelyei mentén fekszenek.',
        text: 'A sajátvektorok a leképezés „természetes irányai”: mentük a bonyolult leképezés egyszerű nyújtás λ-szorosra (λ < 0: irányfordítással).\n\n**Kiszámítás**: Av = λv ⟺ (A − λE)v = 0. Ennek nemtriviális megoldása pontosan akkor van, ha A − λE szinguláris:\n\n1. megoldjuk a **karakterisztikus egyenletet**, det(A − λE) = 0 – ez λ-ban n-edfokú polinomegyenlet;\n2. minden λ gyökre megoldjuk az (A − λE)v = 0 homogén rendszert: a megoldások (a 0 kivételével) a sajátvektorok, a 0-val együtt a **sajátalteret** alkotják.\n\nHasznos tények: a sajátértékek összege a nyom (főátló összege), szorzatuk a determináns; háromszögmátrix sajátértékei a főátló elemei; valós szimmetrikus mátrix sajátértékei valósak, sajátvektorai merőlegesek egymásra.\n\nAlkalmazások: rezgések sajátfrekvenciái, stabilitásvizsgálat (differenciálegyenletek), kvantummechanika (energiaszintek), PCA, PageRank, Markov-láncok stacionárius eloszlása.',
        formulas: ['karakterisztikus-f'],
        example: 'A = [2 1; 1 2]: λ² − 4λ + 3 = 0 ⟹ λ₁ = 3, λ₂ = 1. λ = 3-ra (A − 3E)v = 0: `−x + y = 0`, sajátvektor (1; 1). λ = 1-re `x + y = 0`, sajátvektor (1; −1). Ellenőrzés: `A·(1; 1) = (3; 3) = 3·(1; 1)` ✓.',
        pitfall: 'A sajátvektor nem lehet a nullvektor (A·0 = λ·0 minden λ-ra igaz lenne), de a sajátérték lehet 0 – ez pontosan azt jelenti, hogy A szinguláris. Valós mátrixnak is lehetnek komplex sajátértékei: a 90°-os forgatásnak ±i (nincs helyben maradó irány).',
        related: ['diagonalizalas', 'determinans', 'linearis-lekepezes', 'pca', 'pagerank', 'alter'] },
      { id: 'diagonalizalas', term: 'Diagonalizálás', en: 'diagonalization, eigendecomposition', topic: 'sajat',
        short: 'Az A mátrix felírása A = PDP⁻¹ alakban, ahol D diagonális (főátlójában a sajátértékek), P oszlopai a sajátvektorok.',
        prereq: ['linearis-algebra/sajatertek', 'linearis-algebra/bazis'],
        text: 'A diagonalizálás **bázisváltás a sajátvektorok bázisára**: ebben a bázisban a leképezés minden koordinátát külön-külön szoroz a megfelelő sajátértékkel.\n\nFeltétel: n×n-es A pontosan akkor diagonalizálható, ha van **n lineárisan független sajátvektora**. Elégséges feltételek:\n\n- n különböző sajátérték;\n- A valós szimmetrikus – ekkor **ortogonálisan** diagonalizálható: `A = QDQᵀ` (spektráltétel).\n\nNagy haszna a **mátrixhatvány**: `Aᵏ = P·Dᵏ·P⁻¹`, és Dᵏ csak a főátló hatványozása. Ezzel oldhatók meg a lineáris rekurziók (pl. Fibonacci-számok zárt képlete) és a lineáris differenciálegyenlet-rendszerek (`x′ = Ax` megoldása `e^(At)x₀`).\n\nAz Aᵏx viselkedését nagy k-ra a **legnagyobb abszolút értékű sajátérték** dominálja – ezen alapul a hatványiteráció (és a PageRank kiszámítása).',
        example: 'A = [2 1; 1 2] = P·[3 0; 0 1]·P⁻¹, P = [1 1; 1 −1]. Ezért `A¹⁰ = P·[3¹⁰ 0; 0 1]·P⁻¹ = [29525 29524; 29524 29525]` – tíz mátrixszorzás helyett egyetlen hatványozás.',
        pitfall: 'Nem minden mátrix diagonalizálható: a nyírás, [1 1; 0 1] egyetlen sajátértéke 1 (kétszeres), de csak egy független sajátvektora van, (1; 0). Ilyenkor a Jordan-normálalak a legjobb, amit elérhetünk.',
        related: ['sajatertek', 'bazis', 'ortogonalitas', 'pca', 'pagerank', 'inverz-matrix'] },
      { id: 'pca', term: 'Főkomponens-analízis (PCA)', en: 'principal component analysis', topic: 'sajat',
        short: 'Dimenziócsökkentő módszer: az adatok kovarianciamátrixának sajátvektorai adják azokat az új, egymásra merőleges irányokat, amelyek mentén az adatok szórása a legnagyobb.',
        prereq: ['linearis-algebra/sajatertek', 'valszam/kovariancia'],
        visual: pcaSvg, caption: 'Korrelált kétdimenziós adatok: az első főkomponens a „pontfelhő hossztengelye”.',
        text: 'Lépések:\n\n1. az adatokat **centráljuk** (minden változóból kivonjuk az átlagát), szükség esetén standardizáljuk;\n2. kiszámoljuk a **kovarianciamátrixot**, C = XᵀX/(n − 1) – ez szimmetrikus, ezért ortogonálisan diagonalizálható;\n3. sajátértékeit csökkenő sorrendbe rendezzük: λ₁ ≥ λ₂ ≥ …; a hozzájuk tartozó sajátvektorok a **főkomponensek**;\n4. az adatokat az első k főkomponensre vetítjük.\n\nA λᵢ sajátérték az i-edik főkomponens menti **szórásnégyzet**, ezért `λ₁/(λ₁ + … + λₙ)` a „magyarázott variancia” aránya. Gyakran néhány komponens a variancia 90%-át is hordozza, így száz változó helyett néhánnyal dolgozhatunk.\n\nAlkalmazás: adatvizualizáció (2D-s vetület), zajszűrés, arcfelismerés („sajátarcok”), génexpressziós adatok elemzése. A gyakorlatban a szinguláris érték szerinti felbontással (SVD) számolják.',
        example: 'C = [4 2; 2 3]: λ² − 7λ + 8 = 0 ⟹ λ₁ = (7 + √17)/2 ≈ 5,56, λ₂ ≈ 1,44. Az első főkomponens a variancia 5,56/7 ≈ 79%-át magyarázza; iránya kb. 38°-os szöget zár be az x tengellyel.',
        pitfall: 'A PCA érzékeny a mértékegységekre: ha az egyik változó méterben, a másik milliméterben van, az utóbbi „uralja” a kovarianciát. Eltérő skálájú változóknál előbb standardizálni kell (korrelációs mátrixszal dolgozni). A PCA csak **lineáris** összefüggéseket talál meg.',
        related: ['sajatertek', 'diagonalizalas', 'transzponalt', 'ortogonalitas'] },
      { id: 'pagerank', term: 'Google PageRank', en: 'PageRank', topic: 'sajat',
        short: 'Weboldalak fontossági rangsora: a „véletlen szörföző” stacionárius eloszlása, vagyis a Google-mátrix 1 sajátértékhez tartozó sajátvektora.',
        prereq: ['linearis-algebra/sajatertek'],
        visual: prSvg, caption: 'Négy oldal linkgráfja d = 0,85 csillapítással; a számok az oldalak PageRank-értékei (összegük 1).',
        text: 'Az ötlet (Brin és Page, 1998): egy oldal fontos, ha **fontos oldalak** linkelnek rá. Képzeljünk el egy szörfözőt, aki minden lépésben véletlenszerűen követ egy linket az aktuális oldalról. Az M **linkmátrix** j-edik oszlopában a j-edik oldal kimenő linkjei egyenlő, 1/(linkek száma) súllyal szerepelnek – így M oszlopainak összege 1 (oszlopsztochasztikus).\n\nA rangvektor az `r = M·r` egyenlet megoldása: **sajátvektor az 1 sajátértékhez**. Hogy a megoldás egyértelmű legyen és a zsákutcák ne okozzanak gondot, a szörföző d ≈ 0,85 valószínűséggel linket követ, 1 − d valószínűséggel véletlen oldalra ugrik:\n\n`r = (1 − d)/N · 1 + d·M·r`.\n\nA milliárdnyi oldalra a sajátvektort **hatványiterációval** számolják: egyenletes kezdővektorból indulva ismételten alkalmazzák a fenti lépést, amíg r nem változik. A konvergencia sebességét a második legnagyobb sajátérték (≤ d) szabja meg.',
        example: 'Csillapítás nélkül, három oldallal (A → B, A → C, B → C, C → A): `r_A = r_C`, `r_B = r_A/2`, `r_C = r_A/2 + r_B` ⟹ r = (0,4; 0,2; 0,4). Az ábrán a negyedik, D oldalra senki sem linkel, ezért csak (1 − d)/4 = 0,0375 rangot kap; a többi: A ≈ 0,373, B ≈ 0,196, C ≈ 0,394.',
        pitfall: 'A PageRank nem a bejövő linkek **számát** méri: egyetlen link egy fontos oldalról többet érhet, mint sok link jelentéktelen oldalakról. Ráadásul egy oldal a szavazatát szétosztja a kimenő linkjei között.',
        related: ['sajatertek', 'diagonalizalas', 'matrixszorzas'] }
    ]
  });
})();
