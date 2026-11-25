/* Egyetem: Szerves kémia (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"';
  var BLUE = '#2f7bf6', RED = '#e5484d', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6', TEAL = '#0e9aa7', GOLD = '#d9a520';

  /* ---------- rajzsegédek (sk-) ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function head(x, y, ang, col, s) {
    s = s || 8;
    return '<path d="M' + r1(x) + ' ' + r1(y) + ' L' + r1(x - s * Math.cos(ang - 0.4)) + ' ' + r1(y - s * Math.sin(ang - 0.4)) + ' L' + r1(x - s * Math.cos(ang + 0.4)) + ' ' + r1(y - s * Math.sin(ang + 0.4)) + ' z" fill="' + col + '"/>';
  }
  function arrow(x1, y1, x2, y2, col, w, dash) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 1.5) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  /* görbe (elektronpár-mozgást jelző) nyíl: kvadratikus Bézier, nyílhegy a végén */
  function carr(x1, y1, cx, cy, x2, y2, col) {
    col = col || RED;
    return '<path d="M' + x1 + ' ' + y1 + ' Q' + cx + ' ' + cy + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="' + col + '" stroke-width="1.8"/>' + head(x2, y2, Math.atan2(y2 - cy, x2 - cx), col, 7);
  }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (cls || T)) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  function seg(x1, y1, x2, y2, col, w, dash) { return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + (col || 'var(--fg-2)') + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>'; }
  /* kötés két pont között; sa/sb: a vég rövidítése (címkézett atomnál) */
  function bond(x1, y1, x2, y2, type, col, sa, sb) {
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
    x1 += ux * (sa || 0); y1 += uy * (sa || 0); x2 -= ux * (sb || 0); y2 -= uy * (sb || 0);
    var nx = -uy, ny = ux, c = col || 'var(--fg-2)';
    if (type === '2') return seg(x1 + nx * 2.6, y1 + ny * 2.6, x2 + nx * 2.6, y2 + ny * 2.6, c) + seg(x1 - nx * 2.6, y1 - ny * 2.6, x2 - nx * 2.6, y2 - ny * 2.6, c);
    if (type === '3') return seg(x1, y1, x2, y2, c) + seg(x1 + nx * 4, y1 + ny * 4, x2 + nx * 4, y2 + ny * 4, c) + seg(x1 - nx * 4, y1 - ny * 4, x2 - nx * 4, y2 - ny * 4, c);
    if (type === 'w') return '<path d="M' + r1(x1) + ' ' + r1(y1) + ' L' + r1(x2 + nx * 5) + ' ' + r1(y2 + ny * 5) + ' L' + r1(x2 - nx * 5) + ' ' + r1(y2 - ny * 5) + ' z" fill="' + c + '"/>';
    if (type === 'h') {
      var s = '';
      for (var i = 1; i <= 6; i++) { var f = i / 6, w = 5 * f, px = x1 + dx * f * (L - (sa || 0) - (sb || 0)) / L, py = y1 + dy * f * (L - (sa || 0) - (sb || 0)) / L; s += seg(px + nx * w, py + ny * w, px - nx * w, py - ny * w, c, 1.5); }
      return s;
    }
    if (type === 'd') return seg(x1, y1, x2, y2, c, 2, '3 3');
    return seg(x1, y1, x2, y2, c);
  }
  /* atomcímke: az első betű kerül az (x, y) pontra */
  function atomL(x, y, s, col, size) {
    return txt(x - 4.6, y + 4.6, s, T, size || 14, null, (col ? 'fill="' + col + '" ' : '') + 'font-weight="700"');
  }
  function atomC(x, y, s, col, size) { return txt(x, y + 4.6, s, T, size || 14, 'middle', (col ? 'fill="' + col + '" ' : '') + 'font-weight="700"'); }
  /* molekula: atoms [[x, y, címke, szín, mód]], bonds [[i, j, típus, szín]] – eltolva (ox, oy)-nal */
  function molecule(ox, oy, atoms, bonds) {
    var s = '';
    bonds.forEach(function (b) {
      var a = atoms[b[0]], c = atoms[b[1]];
      s += bond(ox + a[0], oy + a[1], ox + c[0], oy + c[1], b[2], b[3], a[2] ? 9 : 0, c[2] ? 9 : 0);
    });
    atoms.forEach(function (a) { if (a[2]) s += (a[4] === 'c' ? atomC : atomL)(ox + a[0], oy + a[1], a[2], a[3]); });
    return s;
  }

  /* ---------- 1. Funkciós csoportok vonalképlettel ---------- */
  var fgs = [
    ['alkohol', 'R–OH', 'etanol', [[-34, 8], [-11, -5], [12, 8, 'OH', RED]], [[0, 1], [1, 2]]],
    ['éter', 'R–O–R′', 'dietil-éter', [[-46, 8], [-23, -5], [0, 8, 'O', RED, 'c'], [23, -5], [46, 8]], [[0, 1], [1, 2], [2, 3], [3, 4]]],
    ['aldehid', 'R–CHO', 'propanal', [[-34, 8], [-11, -5], [12, 8], [35, -5, 'O', RED, 'c']], [[0, 1], [1, 2], [2, 3, '2', RED]]],
    ['keton', 'R–CO–R′', 'aceton', [[-23, 8], [0, -5], [23, 8], [0, -31, 'O', RED, 'c']], [[0, 1], [1, 2], [1, 3, '2', RED]]],
    ['karbonsav', 'R–COOH', 'ecetsav', [[-23, 8], [0, -5], [0, -31, 'O', RED, 'c'], [23, 8, 'OH', RED]], [[0, 1], [1, 2, '2', RED], [1, 3]]],
    ['észter', 'R–COO–R′', 'metil-acetát', [[-34, 8], [-11, -5], [-11, -31, 'O', RED, 'c'], [12, 8, 'O', RED, 'c'], [35, -5]], [[0, 1], [1, 2, '2', RED], [1, 3], [3, 4]]],
    ['amin', 'R–NH₂', 'etil-amin', [[-34, 8], [-11, -5], [12, 8, 'NH₂', BLUE]], [[0, 1], [1, 2]]],
    ['amid', 'R–CO–NH₂', 'acetamid', [[-23, 8], [0, -5], [0, -31, 'O', RED, 'c'], [23, 8, 'NH₂', BLUE]], [[0, 1], [1, 2, '2', RED], [1, 3]]]
  ];
  var skFg = '<svg viewBox="0 0 560 270">';
  fgs.forEach(function (f, i) {
    var cx = 70 + (i % 4) * 140, cy = 62 + Math.floor(i / 4) * 130;
    skFg += '<rect x="' + (cx - 66) + '" y="' + (cy - 54) + '" width="132" height="122" rx="10" fill="var(--surface)" stroke="var(--line)"/>' +
      molecule(cx, cy, f[3], f[4]) + txt(cx, cy + 46, f[0], T, 13, 'middle', 'font-weight="700"') + txt(cx, cy + 61, f[1] + ' · ' + f[2], M, 10, 'middle');
  });
  skFg += '</svg>';

  /* ---------- 2. Királis szénatom és tükörképe ---------- */
  var ballCol = { Br: '#b5651d', Cl: GREEN, F: TEAL, H: null, C: '#6b7280' };
  function ball(x, y, el, r) {
    var c = ballCol[el];
    return '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="' + (r || 15) + '" fill="' + (c || 'var(--surface)') + '" stroke="' + (c || 'var(--fg-2)') + '" stroke-width="1.5"/>' + txt(x, y + 4.5, el, T, 12, 'middle', c ? 'fill="#fff" font-weight="700"' : 'font-weight="700"');
  }
  function chiral(cx, cy, s) {
    var sub = [[0, -66, 'Br', '1'], [-58 * s, 34, 'F', '1'], [52 * s, 44, 'Cl', 'w'], [60 * s, -22, 'H', 'h']];
    var out = '';
    sub.forEach(function (p) { out += bond(cx, cy, cx + p[0], cy + p[1], p[3], null, 12, 14); });
    sub.forEach(function (p) { out += ball(cx + p[0], cy + p[1], p[2], p[2] === 'H' ? 11 : 15); });
    return out + ball(cx, cy, 'C', 13);
  }
  var skChiral = '<svg viewBox="0 0 560 250">' + chiral(150, 110, 1) + chiral(410, 110, -1) +
    seg(280, 20, 280, 190, PURPLE, 2, '6 5') + txt(280, 208, 'tükörsík', T, 12, 'middle', 'fill="' + PURPLE + '"') +
    txt(150, 196, '(R)-bróm-klór-fluor-metán', T, 12, 'middle', 'font-weight="700"') + txt(410, 196, '(S)-bróm-klór-fluor-metán', T, 12, 'middle', 'font-weight="700"') +
    txt(150, 214, 'Br → Cl → F: óramutató szerint', M, 11, 'middle') + txt(410, 214, 'Br → Cl → F: óramutatóval szemben', M, 11, 'middle') +
    txt(280, 240, 'ék: felénk · szaggatott ék: tőlünk el (itt a H) · a két molekula nem hozható fedésbe → enantiomerek', M, 10.5, 'middle') + '</svg>';

  /* ---------- 3. SN2: hátoldali támadás, Walden-inverzió ---------- */
  function methyl(cx, cy, dir) {
    /* három H, az ernyő a dir irányába nyílik (−1: balra, +1: jobbra) */
    var hs = [[16 * dir, -34, '1'], [24 * dir, 22, 'w'], [4 * dir, 38, 'h']], s = '';
    hs.forEach(function (h) { s += bond(cx, cy, cx + h[0], cy + h[1], h[2], null, 7, 8) + atomC(cx + h[0], cy + h[1], 'H', null, 12); });
    return s;
  }
  var skSn2 = '<svg viewBox="0 0 570 220">' +
    /* 1. kiindulás */
    txt(16, 105, 'HO⁻', T, 15, null, 'fill="' + BLUE + '" font-weight="700"') +
    methyl(110, 100, -1) + bond(110, 100, 160, 100, '1', null, 8, 10) + atomC(110, 100, 'C') + atomL(160, 100, 'Br', ORANGE) +
    carr(52, 92, 76, 66, 98, 92, BLUE) + carr(134, 96, 146, 74, 162, 86, RED) +
    arrow(192, 100, 222, 100, 'var(--fg-2)', 2) +
    /* 2. átmeneti állapot */
    '<path d="M240 42 h-8 v122 h8 M372 42 h8 v122 h-8" fill="none" stroke="var(--fg-2)" stroke-width="1.6"/>' + txt(384, 46, '‡', T, 16) +
    bond(254, 100, 300, 100, 'd', BLUE, 10, 8) + bond(300, 100, 346, 100, 'd', ORANGE, 8, 10) +
    bond(300, 100, 300, 60, '1', null, 8, 8) + atomC(300, 58, 'H', null, 12) + bond(300, 100, 284, 134, 'w', null, 8, 8) + atomC(284, 138, 'H', null, 12) + bond(300, 100, 318, 132, 'h', null, 8, 8) + atomC(320, 136, 'H', null, 12) +
    atomC(300, 100, 'C') + atomC(250, 100, 'HO', BLUE) + atomL(346, 100, 'Br', ORANGE) +
    txt(250, 82, 'δ−', T, 11, 'middle', 'fill="' + BLUE + '"') + txt(354, 82, 'δ−', T, 11, 'middle', 'fill="' + ORANGE + '"') +
    arrow(396, 100, 424, 100, 'var(--fg-2)', 2) +
    /* 3. termék */
    atomC(446, 100, 'HO', BLUE) + bond(446, 100, 482, 100, '1', null, 12, 8) + methyl(482, 100, 1) + atomC(482, 100, 'C') +
    txt(522, 105, '+ Br⁻', T, 14, null, 'fill="' + ORANGE + '" font-weight="700"') +
    txt(110, 184, 'nukleofil + szubsztrát', M, 11, 'middle') + txt(306, 184, 'átmeneti állapot (öt ligandum)', M, 11, 'middle') + txt(500, 184, 'termék: inverzió', M, 11, 'middle') +
    txt(285, 210, 'egy lépés · hátoldali támadás 180°-ból · v = k·[CH₃Br]·[OH⁻]', T, 12, 'middle') + '</svg>';

  /* ---------- 4. Energiaprofil: SN2 vs SN1 ---------- */
  function eAxes(x0) { return arrow(x0, 210, x0, 20, 'var(--fg-2)', 1.6) + arrow(x0, 210, x0 + 240, 210, 'var(--fg-2)', 1.6) + txt(x0 + 6, 28, 'E', T, 12, null, 'font-style="italic"') + txt(x0 + 238, 226, 'reakciókoordináta', M, 10, 'end'); }
  var skEnergy = '<svg viewBox="0 0 560 250">' + eAxes(24) + eAxes(300) +
    '<path d="M34 150 H64 C104 150 112 52 140 52 C168 52 178 176 220 176 H256" fill="none" stroke="' + BLUE + '" stroke-width="3"/>' +
    seg(34, 52, 140, 52, 'var(--muted)', 1, '3 3') + arrow(70, 148, 70, 56, RED, 1.8) + txt(76, 104, 'Eₐ', T, 13, null, 'fill="' + RED + '" font-weight="700"') +
    txt(140, 42, '‡ átmeneti állapot', T, 11, 'middle') + txt(40, 168, 'Nu⁻ + RX', M, 11) + txt(256, 194, 'RNu + X⁻', M, 11, 'end') +
    txt(150, 246, 'S<tspan baseline-shift="sub" font-size="9">N</tspan>2: egy lépés, v = k·[RX]·[Nu⁻]', T, 12, 'middle', 'font-weight="700"') +
    '<path d="M310 150 H330 C360 150 366 44 388 44 C410 44 412 116 428 116 C442 116 448 88 462 88 C478 88 490 176 532 176 H546" fill="none" stroke="' + PURPLE + '" stroke-width="3"/>' +
    seg(310, 44, 388, 44, 'var(--muted)', 1, '3 3') + arrow(338, 148, 338, 48, RED, 1.8) + txt(344, 100, 'Eₐ₁', T, 13, null, 'fill="' + RED + '" font-weight="700"') +
    txt(388, 34, '‡₁ (lassú)', T, 11, 'middle') + txt(470, 78, '‡₂ (gyors)', T, 11, 'middle') + '<circle cx="428" cy="116" r="4.5" fill="' + PURPLE + '"/>' +
    txt(428, 136, 'karbokation', T, 11, 'middle', 'fill="' + PURPLE + '" font-weight="700"') + txt(428, 150, '(köztitermék)', M, 10, 'middle') +
    txt(312, 168, 'RX', M, 11) + txt(546, 194, 'RNu + X⁻', M, 11, 'end') +
    txt(428, 246, 'S<tspan baseline-shift="sub" font-size="9">N</tspan>1: két lépés, v = k·[RX]', T, 12, 'middle', 'font-weight="700"') + '</svg>';

  /* ---------- 5. E2 elimináció ---------- */
  var skE2 = '<svg viewBox="0 0 560 230">' +
    txt(40, 46, 'EtO⁻', T, 15, null, 'fill="' + BLUE + '" font-weight="700"') +
    bond(150, 100, 210, 100, '1') + bond(150, 100, 150, 58, '1', null, 0, 8) + atomC(150, 52, 'H') + bond(210, 100, 210, 144, '1', null, 0, 10) + atomL(210, 150, 'Br', ORANGE) +
    bond(150, 100, 122, 116, '1') + bond(150, 100, 124, 82, '1') + bond(210, 100, 238, 84, '1') + bond(210, 100, 238, 118, '1') +
    txt(156, 118, 'C<tspan baseline-shift="sub" font-size="9">β</tspan>', M, 11) + txt(204, 118, 'C<tspan baseline-shift="sub" font-size="9">α</tspan>', M, 11, 'end') +
    carr(82, 38, 112, 22, 140, 46, BLUE) + carr(156, 74, 186, 66, 180, 94, RED) + carr(214, 122, 236, 128, 226, 142, RED) +
    txt(250, 62, 'H és Br anti-periplanáris', M, 11) + txt(250, 76, '(egy síkban, 180°)', M, 11) +
    arrow(290, 110, 330, 110, 'var(--fg-2)', 2) +
    bond(370, 110, 430, 110, '2') + bond(370, 110, 344, 94, '1') + bond(370, 110, 344, 126, '1') + bond(430, 110, 456, 94, '1') + bond(430, 110, 456, 126, '1') +
    txt(474, 115, '+ EtOH + Br⁻', T, 13, null, 'font-weight="700"') + txt(400, 150, 'alkén (C=C)', T, 12, 'middle', 'fill="' + GREEN + '" font-weight="700"') +
    txt(280, 190, 'E2: a C–H felszakadása, a π-kötés kialakulása és a Br⁻ távozása egyszerre történik', T, 12, 'middle') +
    txt(280, 210, 'v = k·[RX]·[B⁻] · erős, térigényes bázis és magas hőmérséklet kedvez neki', M, 11, 'middle') + '</svg>';

  /* ---------- 6. Benzol: rezonancia ---------- */
  function hexPts(cx, cy, r) { var p = []; for (var i = 0; i < 6; i++) { var a = (i * 60 - 90) * Math.PI / 180; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }
  function benzene(cx, cy, r, dbl, circle) {
    var p = hexPts(cx, cy, r), s = '<polygon points="' + p.map(function (q) { return r1(q[0]) + ',' + r1(q[1]); }).join(' ') + '" fill="none" stroke="var(--fg-2)" stroke-width="2"/>';
    (dbl || []).forEach(function (i) {
      var a = p[i], b = p[(i + 1) % 6], k = 0.76, m = function (q) { return [cx + (q[0] - cx) * k, cy + (q[1] - cy) * k]; }, A = m(a), B = m(b);
      var sx = (B[0] - A[0]) * 0.12, sy = (B[1] - A[1]) * 0.12;
      s += seg(A[0] + sx, A[1] + sy, B[0] - sx, B[1] - sy, RED, 2);
    });
    if (circle) s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r1(r * 0.55) + '" fill="none" stroke="' + RED + '" stroke-width="2"/>';
    return s;
  }
  var skBenz = '<svg viewBox="0 0 560 230">' + benzene(90, 90, 46, [0, 2, 4]) +
    '<line x1="160" y1="90" x2="214" y2="90" stroke="var(--fg-2)" stroke-width="2"/>' + head(218, 90, 0, 'var(--fg-2)') + head(156, 90, Math.PI, 'var(--fg-2)') +
    benzene(284, 90, 46, [1, 3, 5]) + txt(380, 98, '≡', T, 26, 'middle') + benzene(470, 90, 46, [], true) +
    txt(90, 160, 'Kekulé-szerkezet I.', T, 12, 'middle') + txt(284, 160, 'Kekulé-szerkezet II.', T, 12, 'middle') + txt(470, 160, 'valós szerkezet (hibrid)', T, 12, 'middle', 'font-weight="700"') +
    txt(187, 78, 'rezonancia', M, 10, 'middle') +
    txt(280, 192, 'mind a hat C–C kötés 139 pm (C–C: 154 pm, C=C: 134 pm) · 6 delokalizált π-elektron (4n + 2, n = 1)', M, 11, 'middle') +
    txt(280, 212, 'aromás stabilizáció ≈ 150 kJ/mol a három „elszigetelt” kettős kötéshez képest', M, 11, 'middle') + '</svg>';

  /* ---------- 7. Peptidkötés kialakulása ---------- */
  var skPep = '<svg viewBox="0 0 560 280">' +
    /* első aminosav */
    bond(52, 80, 82, 62) + bond(82, 62, 82, 34, '1', null, 0, 9) + bond(82, 62, 112, 80) + bond(112, 80, 112, 110, '2', RED, 0, 9) + bond(112, 80, 142, 62, '1', null, 0, 9) +
    txt(56, 85, 'H₂N', T, 14, 'end', 'fill="' + BLUE + '" font-weight="700"') + atomC(82, 26, 'R₁', PURPLE) + atomC(112, 116, 'O', RED) + atomL(142, 62, 'OH', RED) +
    /* második aminosav */
    bond(196, 80, 222, 80, '1', null, 8, 9) + bond(222, 80, 222, 108, '1', null, 9, 8) + bond(222, 80, 252, 62, '1', null, 9, 0) + bond(252, 62, 252, 34, '1', null, 0, 9) + bond(252, 62, 282, 80) + bond(282, 80, 282, 110, '2', RED, 0, 9) + bond(282, 80, 312, 62, '1', null, 0, 9) +
    atomC(192, 80, 'H') + atomC(222, 80, 'N', BLUE) + atomC(222, 114, 'H') + atomC(252, 26, 'R₂', PURPLE) + atomC(282, 116, 'O', RED) + atomL(312, 62, 'OH', RED) +
    '<ellipse cx="170" cy="72" rx="38" ry="22" fill="' + ORANGE + '" fill-opacity=".14" stroke="' + ORANGE + '" stroke-width="1.6" stroke-dasharray="5 3"/>' + txt(170, 42, '− H₂O', T, 12, 'middle', 'fill="' + ORANGE + '" font-weight="700"') +
    arrow(180, 140, 180, 170, 'var(--fg-2)', 2) + txt(190, 160, 'kondenzáció', M, 11) +
    /* dipeptid */
    '<rect x="96" y="176" width="66" height="78" rx="8" fill="' + GREEN + '" fill-opacity=".14" stroke="' + GREEN + '" stroke-dasharray="4 3"/>' +
    bond(52, 230, 82, 212) + bond(82, 212, 82, 186, '1', null, 0, 9) + bond(82, 212, 112, 230) + bond(112, 230, 112, 258, '2', RED, 0, 8) + bond(112, 230, 146, 212, '1', GREEN, 0, 9) +
    bond(146, 212, 146, 186, '1', null, 9, 9) + bond(146, 212, 176, 230, '1', null, 9, 0) + bond(176, 230, 176, 256, '1', null, 0, 9) + bond(176, 230, 206, 212) + bond(206, 212, 206, 184, '2', RED, 0, 9) + bond(206, 212, 236, 230, '1', null, 0, 9) +
    txt(56, 235, 'H₂N', T, 14, 'end', 'fill="' + BLUE + '" font-weight="700"') + atomC(82, 180, 'R₁', PURPLE) + atomC(112, 266, 'O', RED, 13) + atomC(146, 212, 'N', BLUE) + atomC(146, 180, 'H') +
    atomC(176, 264, 'R₂', PURPLE) + atomC(206, 178, 'O', RED) + atomL(236, 230, 'OH', RED) +
    txt(345, 32, 'aminosav + aminosav →', T, 12, null, 'font-weight="700"') + txt(345, 48, 'dipeptid + H₂O', T, 12, null, 'font-weight="700"') +
    txt(345, 70, 'a karboxilcsoport és az aminocsoport', M, 11) + txt(345, 85, 'amidkötéssé kapcsolódik', M, 11) +
    txt(345, 180, 'zöld keret: peptidkötés', T, 12, null, 'fill="' + GREEN + '" font-weight="700"') + txt(345, 197, 'C–N: részleges kettőskötés-jelleg', T, 11, null, 'fill="' + GREEN + '"') + txt(345, 212, '(rezonancia: O=C–N ↔ ⁻O–C=N⁺)', M, 11) +
    txt(345, 232, '→ a peptidcsoport sík, nem forog,', M, 11) + txt(345, 247, 'szinte mindig transz állású', M, 11) +
    txt(345, 270, 'N-terminális (bal) → C-terminális (jobb)', M, 11) + '</svg>';

  /* ---------- 8. Polimerizáció és polikondenzáció ---------- */
  var chain = '', zx = 196, zy = 66;
  for (var zi = 0; zi < 10; zi++) {
    var x1 = zx + zi * 24, y1 = zy + (zi % 2 ? -12 : 12), x2 = zx + (zi + 1) * 24, y2 = zy + (zi % 2 ? 12 : -12);
    chain += seg(x1, y1, x2, y2, zi === 4 || zi === 5 ? BLUE : 'var(--fg-2)', zi === 4 || zi === 5 ? 3 : 2);
  }
  var skPoly = '<svg viewBox="0 0 560 250">' +
    txt(20, 28, 'Addíciós polimerizáció (láncpolimerizáció) – melléktermék nélkül', T, 12, null, 'font-weight="700"') +
    txt(20, 72, 'n', T, 14, null, 'font-style="italic"') + bond(40, 66, 70, 66, '2', BLUE) +
    txt(55, 96, 'etén', M, 11, 'middle') + arrow(100, 66, 160, 66, 'var(--fg-2)', 2) + txt(130, 56, 'iniciátor', M, 10, 'middle') +
    txt(186, 72, '···', T, 14, 'end') + chain + txt(444, 72, '···', T, 14) +
    '<path d="M' + (zx + 4 * 24 - 4) + ' 46 v40 M' + (zx + 6 * 24 + 4) + ' 46 v40" stroke="' + BLUE + '" stroke-width="1.6"/>' + txt(zx + 6 * 24 + 8, 92, 'n', T, 13, null, 'fill="' + BLUE + '" font-style="italic" font-weight="700"') +
    txt(320, 112, '–[CH₂–CH₂]ₙ– polietilén (PE), ismétlődő egység: 28 g/mol', M, 11, 'middle') +
    seg(20, 130, 540, 130, 'var(--line)', 1) +
    txt(20, 154, 'Polikondenzáció (lépcsős polimerizáció) – minden kötésnél kis molekula (H₂O) lép ki', T, 12, null, 'font-weight="700"');
  for (var bi = 0; bi < 8; bi++) {
    var bx = 40 + bi * 62, col = bi % 2 ? ORANGE : BLUE;
    skPoly += (bi ? seg(bx - 40, 192, bx - 22, 192, GREEN, 3) : '') +
      (bi % 2 ? '<circle cx="' + (bx - 2) + '" cy="192" r="18" fill="' + col + '" fill-opacity=".25" stroke="' + col + '" stroke-width="2"/>' : '<rect x="' + (bx - 22) + '" y="176" width="40" height="32" rx="6" fill="' + col + '" fill-opacity=".25" stroke="' + col + '" stroke-width="2"/>') +
      txt(bx - 2, 197, bi % 2 ? 'diol' : 'sav', T, 10, 'middle') + (bi ? txt(bx - 31, 176, 'H₂O↑', T, 9, 'middle', 'fill="' + TEAL + '"') : '');
  }
  skPoly += txt(280, 232, 'dikarbonsav + diol → poliészter (pl. PET) · dikarbonsav + diamin → poliamid (pl. nylon-6,6)', M, 11, 'middle') + '</svg>';

  /* ---------- 9. Bután konformációi (Newman-projekció) ---------- */
  function newman(cx, cy, front, back, fMe, bMe) {
    var s = '', i;
    for (i = 0; i < 3; i++) {
      var ab = back[i] * Math.PI / 180, me = i === bMe;
      s += seg(cx + 26 * Math.cos(ab), cy + 26 * Math.sin(ab), cx + 46 * Math.cos(ab), cy + 46 * Math.sin(ab), me ? ORANGE : 'var(--fg-2)', 2) +
        txt(cx + 58 * Math.cos(ab), cy + 58 * Math.sin(ab) + 4, me ? 'CH₃' : 'H', T, me ? 11 : 11, 'middle', me ? 'fill="' + ORANGE + '" font-weight="700"' : null);
    }
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="26" fill="var(--stage)" stroke="var(--fg-2)" stroke-width="2"/>';
    for (i = 0; i < 3; i++) {
      var af = front[i] * Math.PI / 180, mf = i === fMe;
      s += seg(cx, cy, cx + 46 * Math.cos(af), cy + 46 * Math.sin(af), mf ? BLUE : 'var(--fg-2)', 2.4) +
        txt(cx + 58 * Math.cos(af), cy + 58 * Math.sin(af) + 4, mf ? 'CH₃' : 'H', T, 11, 'middle', mf ? 'fill="' + BLUE + '" font-weight="700"' : null);
    }
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="var(--fg-2)"/>';
  }
  var skNewman = '<svg viewBox="0 0 560 230">' +
    newman(95, 92, [90, 210, 330], [270, 30, 150], 0, 0) + newman(280, 92, [90, 210, 330], [30, 150, 270], 0, 0) + newman(465, 92, [90, 210, 330], [114, 234, 354], 0, 0) +
    txt(95, 178, 'anti (180°)', T, 13, 'middle', 'font-weight="700"') + txt(95, 196, '0 kJ/mol – legstabilabb', T, 11, 'middle', 'fill="' + GREEN + '"') +
    txt(280, 178, 'gauche (60°)', T, 13, 'middle', 'font-weight="700"') + txt(280, 196, '+3,8 kJ/mol', T, 11, 'middle', 'fill="' + ORANGE + '"') +
    txt(465, 178, 'fedő (0°)', T, 13, 'middle', 'font-weight="700"') + txt(465, 196, '≈ +19 kJ/mol – legkevésbé stabil', T, 11, 'middle', 'fill="' + RED + '"') +
    txt(280, 222, 'C2–C3 kötés mentén nézve · kék: elülső szén szubsztituensei · narancs: hátsó szén (kör mögött)', M, 10.5, 'middle') + '</svg>';

  /* ---------- 10. Markovnyikov-szabály: karbokation-stabilitás ---------- */
  var skMark = '<svg viewBox="0 0 560 220">' +
    txt(14, 104, 'CH₃–CH=CH₂', T, 14, null, 'font-weight="700"') + txt(14, 124, '+ HBr', T, 13) + txt(14, 142, 'propén', M, 11) +
    arrow(118, 92, 172, 58, GREEN, 2.6) + arrow(118, 114, 172, 150, RED, 1.6, '5 4') + txt(150, 104, 'H⁺', T, 12, 'middle', 'fill="var(--muted)"') +
    txt(180, 52, 'CH₃–C⁺H–CH₃', T, 14, null, 'fill="' + GREEN + '" font-weight="700"') + txt(180, 70, 'szekunder karbokation', M, 11) + txt(180, 84, '(stabilabb: 2 alkilcsoport)', M, 11) +
    txt(180, 156, 'CH₃–CH₂–CH₂⁺', T, 14, null, 'fill="' + RED + '" font-weight="700"') + txt(180, 174, 'primer karbokation', M, 11) + txt(180, 188, '(instabil, alig képződik)', M, 11) +
    arrow(320, 48, 372, 48, GREEN, 2.6) + txt(346, 40, 'Br⁻', T, 11, 'middle', 'fill="var(--muted)"') + arrow(320, 152, 372, 152, RED, 1.6, '5 4') +
    txt(380, 52, 'CH₃–CHBr–CH₃', T, 14, null, 'font-weight="700"') + txt(380, 70, '2-brómpropán: főtermék', T, 11, null, 'fill="' + GREEN + '"') +
    txt(380, 156, 'CH₃CH₂CH₂Br', T, 14, null, 'font-weight="700"') + txt(380, 174, '1-brómpropán: nyomokban', T, 11, null, 'fill="' + RED + '"') +
    txt(280, 212, 'A H a több H-t hordozó szénre, a Br a szubsztituáltabb szénre kerül.', M, 11, 'middle') + '</svg>';

  STUDIE.addCourse({
    id: 'szerves-kemia',
    title: 'Szerves kémia',
    icon: '🧫',
    color: '#d9a520',
    level: 'BSc 1–3. félév (vegyész, gyógyszerész, biológus, vegyészmérnök)',
    description: 'Szerkezet, nevezéktan és sztereokémia, szénhidrogének, reakciómechanizmusok (SN1/SN2, E1/E2, addíció, aromás szubsztitúció), oxigén- és nitrogéntartalmú vegyületek, biomolekulák és polimerek – vonalképletekkel és ellenőrzött számpéldákkal.',
    intro: 'A szerves kémia a **szénvegyületek** kémiája. Bár elemkészlete kicsi (C, H, O, N, S, P, halogének), a szén négy stabil kovalens kötése, láncképző hajlama és a többszörös kötések miatt több tízmillió ismert vegyületet ölel fel – a gyógyszerektől a műanyagokon át az élő sejt molekuláiig.\n\nA tárgy kulcsa, hogy a reakciókat ne bemagolt listaként, hanem **mechanizmusokként** lássuk: hol van elektronban gazdag (**nukleofil**) és elektronszegény (**elektrofil**) centrum, milyen köztitermék képződik, és mi szabja meg a sebességet. Az általános kémiai alapokat (hibridizáció, savállandó, aktiválási energia) az általános kémia szakszótár tárgyalja; a biomolekulák kapcsolatát az élővilággal a [[dns|DNS]] és a [[sejt|sejt]] modellben is felfedezheted.',
    topics: [
      { id: 'szerkezet', title: 'Szerkezet, elnevezés, izoméria' },
      { id: 'szenhidrogen', title: 'Szénhidrogének' },
      { id: 'mechanizmus', title: 'Reakciómechanizmusok' },
      { id: 'heteroatom', title: 'Oxigén- és nitrogéntartalmú vegyületek' },
      { id: 'bio', title: 'Biomolekulák és polimerek' },
      { id: 'spektro', title: 'Szerkezetmeghatározás és elválasztás' },
      { id: 'szintezis', title: 'Szintézis: C–C kötések és tervezés' }
    ],
    formulas: [
      {
        id: 'dbe-f', title: 'Telítetlenségi fok (kettőskötés-egyenérték)', en: 'degree of unsaturation (double bond equivalent, DBE)',
        parts: [{ t: 'DBE', d: 'A gyűrűk és a π-kötések együttes száma a molekulában', unit: '–' }, { t: '=' },
          { t: 'C', d: 'Szénatomok száma (és más négyvegyértékű atomoké, pl. Si)' }, { t: '−' },
          { t: '(H + X)/2', d: 'Hidrogén- és halogénatomok számának fele', more: 'Az oxigén és a kén nem számít (két vegyértékük „beékelődik” a láncba).' }, { t: '+' },
          { t: 'N/2', d: 'Nitrogénatomok számának fele (háromvegyértékű atomok)' }, { t: '+' },
          { t: '1' }],
        text: 'Összegképletből gyorsan megmutatja, hány gyűrű és többszörös kötés van a molekulában: egy kettős kötés vagy egy gyűrű 1, egy hármas kötés 2, egy benzolgyűrű 4 egységet jelent. Szerkezetfelderítésnél (NMR, IR, MS mellett) az első lépés.',
        example: 'Benzol, C₆H₆: `DBE = 6 − 6/2 + 1 = 4` (egy gyűrű + három C=C). Koffein, C₈H₁₀N₄O₂: `DBE = 8 − 10/2 + 4/2 + 1 = 6`. Hexán, C₆H₁₄: `6 − 7 + 1 = 0`.'
      },
      {
        id: 'sn2-f', title: 'SN2 sebességi egyenlete', en: 'SN2 rate law (second order)',
        parts: [{ t: 'v', d: 'Reakciósebesség', unit: 'mol/(dm³·s)' }, { t: '=' },
          { t: 'k', d: 'Másodrendű sebességi állandó', unit: 'dm³/(mol·s)' }, { t: '·' },
          { t: '[RX]', d: 'A szubsztrát (alkil-halogenid) koncentrációja', unit: 'mol/dm³' }, { t: '·' },
          { t: '[Nu⁻]', d: 'A nukleofil koncentrációja', unit: 'mol/dm³', more: 'Mindkét részecske részt vesz az egyetlen, sebességmeghatározó lépésben (bimolekuláris).' }],
        text: 'Az SN2 elsőrendű a szubsztrátra és elsőrendű a nukleofilre nézve, összesen másodrendű. Ezzel szemben az SN1 sebessége `v = k·[RX]`, a nukleofil koncentrációjától független, mert a lassú lépés az ionizáció.',
        example: 'CH₃Br + OH⁻ → CH₃OH + Br⁻. Ha mindkét koncentrációt kétszeresére növeljük, a sebesség **négyszeres** lesz; ha csak [OH⁻]-t, kétszeres. Tercier-butil-bromid hidrolízisénél (SN1) az [OH⁻] növelése nem gyorsít.'
      },
      {
        id: 'fajlagos-forgatas-f', title: 'Fajlagos forgatóképesség', en: 'specific rotation',
        parts: [{ t: '[α]_D^{20}', d: 'Fajlagos forgatás 20 °C-on, a nátrium D-vonalán (589 nm); anyagi állandó', unit: '°·cm³/(g·dm)', more: 'Gyakorlatban mértékegység nélkül, fokban adják meg; + jobbra forgató (dextrorotatory), − balra forgató.' }, { t: '=' },
          { t: 'α', d: 'A polariméteren mért elforgatási szög', unit: '°' }, { t: '/' },
          { t: '(l · c)', d: 'l: a küvetta hossza dm-ben; c: koncentráció g/cm³-ben (g/mL)' }],
        text: 'A királis vegyületek oldata a lineárisan polarizált fény síkját elforgatja (optikai aktivitás). Az enantiomerek azonos nagyságú, ellentétes előjelű [α]-val rendelkeznek, a racém elegy nem forgat. A forgatás előjele és az R/S konfiguráció között **nincs** egyszerű összefüggés. Az enantiomerfelesleg: `ee = α_mért/α_tiszta · 100%`.',
        example: 'Szacharóz oldat, c = 0,100 g/mL, l = 1,00 dm, mért α = +6,65° → `[α] = 6,65/(1·0,1) = +66,5°`. Ha egy (S)-anyag tiszta [α]-ja +66,5°, és egy minta +3,3°-ot mutat ugyanilyen körülmények között, `ee ≈ 3,3/66,5 ≈ 5%`.'
      },
      {
        id: 'pi-f', title: 'Izoelektromos pont (aminosavak)', en: 'isoelectric point of amino acids',
        parts: [{ t: 'pI', d: 'Az a pH, amelyen az aminosav nettó töltése nulla (ikerion túlsúlyban)', unit: '–' }, { t: '≈' },
          { t: '(pK_{a1} + pK_{a2}) / 2', d: 'A semleges ikeriont közrefogó két savi állandó negatív logaritmusának átlaga', more: 'Semleges oldalláncú aminosavnál pK_{a1} (α-COOH) és pK_{a2} (α-NH₃⁺). Savas oldalláncnál a két legkisebb, bázikusnál a két legnagyobb pKₐ átlaga.' }],
        text: 'A Henderson–Hasselbalch-egyenletből következik: pI-n a kationos és az anionos forma koncentrációja egyenlő. Ennél kisebb pH-n az aminosav (fehérje) pozitív, nagyobbnál negatív töltésű – ezen alapul az **elektroforézis** és az **izoelektromos fókuszálás**; a fehérjék oldhatósága is pI-n a legkisebb.',
        example: 'Glicin: pKₐ₁ = 2,34, pKₐ₂ = 9,60 → `pI = (2,34 + 9,60)/2 = 5,97`. Aszparaginsav (oldallánc pKₐ = 3,65): `pI = (1,88 + 3,65)/2 ≈ 2,77`. Lizin: `(8,95 + 10,53)/2 = 9,74`.'
      },
      {
        id: 'polimerizacios-fok-f', title: 'Polimerizációfok', en: 'degree of polymerization',
        parts: [{ t: 'DP', d: 'Átlagos polimerizációfok: az egy láncban lévő ismétlődő egységek átlagos száma', unit: '–' }, { t: '=' },
          { t: 'M_n', d: 'Számátlag-moláris tömeg', unit: 'g/mol' }, { t: '/' },
          { t: 'M_0', d: 'Az ismétlődő egység moláris tömege', unit: 'g/mol', more: 'Lépcsős (kondenzációs) polimerizációnál a Carothers-egyenlet: X_n = 1/(1 − p), ahol p a funkciós csoportok átalakulási hányada.' }],
        text: 'A polimerek nem egyforma hosszú láncokból állnak, ezért a moláris tömeg átlag: a **számátlag** (M_n) és a **tömegátlag** (M_w) hányadosa, a **diszperzitás** (Đ = M_w/M_n ≥ 1) a láncszeloszlás szélességét méri. A Carothers-egyenlet szerint polikondenzációnál csak nagyon nagy konverziónál kapunk hosszú láncot – ezért kell a monomereket pontosan sztöchiometrikus arányban és nagy tisztaságban adagolni.',
        example: 'Polietilén, M_n = 280 000 g/mol, M₀(C₂H₄) = 28,05 g/mol: `DP = 280 000/28,05 ≈ 9982 ≈ 10⁴`. Poliészter-szintézis: p = 0,99 → `X_n = 1/0,01 = 100`; p = 0,995 → 200.'
      },
      {
        id: 'huckel-f', title: 'Hückel-szabály (aromaticitás)', en: "Hückel's rule (4n + 2 π-electrons)",
        parts: [{ t: 'N_π', d: 'A gyűrűs, sík, teljesen konjugált rendszer π-elektronjainak száma' }, { t: '=' },
          { t: '4n + 2', d: 'n = 0, 1, 2, … egész szám', more: '4n π-elektron esetén a sík, konjugált gyűrű antiaromás (destabilizált), pl. ciklobutadién.' }],
        text: 'Egy molekula akkor aromás, ha (1) gyűrűs, (2) sík, (3) minden gyűrűatomján van p-pálya, amely részt vesz a konjugációban, és (4) a π-elektronok száma 4n + 2. Ekkor a molekulapálya-elmélet szerint minden kötő π-pálya pontosan betelik – ez a különleges stabilitás forrása.',
        example: 'Benzol: 6 π-e⁻ (n = 1) → aromás. Ciklopentadienil-anion: 6 π-e⁻ → aromás (ezért a ciklopentadién szokatlanul savas, pKₐ ≈ 16). Naftalin: 10 π-e⁻ (n = 2). Ciklooktatetraén: 8 π-e⁻, de nem sík (kád alakú) → nem aromás.'
      },
      {
        id: 'ee-f', title: 'Enantiomerfelesleg', en: 'enantiomeric excess (ee)',
        parts: [{ t: 'ee', d: 'Enantiomerfelesleg', unit: '%' }, { t: '=' },
          { t: '|n_R − n_S| / (n_R + n_S)', d: 'A két enantiomer mennyiségének különbsége az összeshez viszonyítva' }, { t: '· 100%' }],
        text: 'Az ee a királis szintézisek (aszimmetrikus katalízis) hatékonyságának mérőszáma. Racém elegyre 0%, tiszta enantiomerre 100%. Polarimetriával becsülhető: `ee ≈ [α]_mért/[α]_tiszta`; pontos mérése királis HPLC-vel vagy GC-vel történik.',
        example: '75% (S) és 25% (R) elegy: `ee = (75 − 25)/100 = 50%`. Ennek fajlagos forgatása a tiszta (S) érték fele.'
      },
      {
        id: 'ir-f', title: 'Rezgési hullámszám (harmonikus oszcillátor)', en: 'vibrational wavenumber, Hooke’s law model',
        parts: [{ t: 'ν̃', d: 'A rezgés hullámszáma, ahol az IR-elnyelés várható', unit: 'cm⁻¹' }, { t: '=' },
          { t: '1/(2π·c)', d: 'c: a fénysebesség cm/s-ban (2,998·10¹⁰ cm/s), így az eredmény cm⁻¹' }, { t: '·' },
          { t: '√(k/μ)', d: 'k: a kötés erőállandója (rugóállandója), N/m; μ = m₁·m₂/(m₁ + m₂): a két atom redukált tömege, kg', more: 'Erősebb kötés (nagyobb k) → nagyobb hullámszám; nehezebb atomok (nagyobb μ) → kisebb hullámszám.' }],
        text: 'A kötést két golyót összekötő rugóként modellezzük. A modell megmagyarázza az IR-színkép fő tendenciáit: C≡C (≈ 2200) > C=C (≈ 1650) > C–C (≈ 1000 cm⁻¹), illetve hogy a hidrogént tartalmazó kötések (C–H, O–H, N–H) a kis redukált tömeg miatt 2800 cm⁻¹ fölött nyelnek el.',
        example: 'C–H, k ≈ 500 N/m, μ = 12·1/13 u ≈ 1,53·10⁻²⁷ kg: `ν̃ ≈ √(500/1,53·10⁻²⁷)/(2π·2,998·10¹⁰) ≈ 3030 cm⁻¹`. Deuterálva (C–D, μ ≈ 1,71 u) a sáv `√(1,71/0,923) ≈ 1,36`-szor kisebb hullámszámra, kb. 2230 cm⁻¹-re tolódik.'
      },
      {
        id: 'nmr-f', title: 'Kémiai eltolódás (NMR)', en: 'chemical shift',
        parts: [{ t: 'δ', d: 'Kémiai eltolódás: a jel helye a spektrumban, a térerőtől független egységben', unit: 'ppm' }, { t: '=' },
          { t: '(ν − ν_{TMS})', d: 'A mag rezonanciafrekvenciájának eltérése a tetrametil-szilán (TMS) referenciajeltől', unit: 'Hz' }, { t: '/' },
          { t: 'ν_0', d: 'A spektrométer működési frekvenciája', unit: 'MHz', more: 'Hz/MHz hányadosként közvetlenül ppm-et kapunk (10⁶-os szorzó).' }],
        text: 'A rezonanciafrekvencia arányos a mágneses térrel (`ν = γ·B₀/2π`; ¹H-ra 42,58 MHz/T), ezért Hz-ben a jelek helye minden műszeren más lenne. A δ skála ezt kiküszöböli: ugyanaz a vegyület minden készüléken ugyanott ad jelet. A csatolási állandó (J) viszont Hz-ben állandó.',
        example: '400 MHz-es műszeren egy jel a TMS-től 1480 Hz-re: `δ = 1480/400 = 3,70 ppm` (például etanol CH₂-csoportja). 600 MHz-en ugyanez a jel 2220 Hz-nél jelenik meg, de δ ugyanúgy 3,70 ppm.'
      },
      {
        id: 'rf-f', title: 'Retenciós faktor (vékonyréteg-kromatográfia)', en: 'retention factor, Rf',
        parts: [{ t: 'R_f', d: 'Retenciós faktor: 0 és 1 közötti szám', unit: '–' }, { t: '=' },
          { t: 'a folt útja', d: 'A startvonaltól a folt közepéig mért távolság', unit: 'cm' }, { t: '/' },
          { t: 'az oldószerfront útja', d: 'A startvonaltól az oldószer legmagasabb pontjáig mért távolság', unit: 'cm' }],
        text: 'Adott álló fázis, eluens és hőmérséklet mellett az anyagra jellemző szám. Poláris szilikagél-rétegen a polárisabb vegyület erősebben kötődik, kisebb az Rf-je; polárisabb eluens minden foltot feljebb visz.',
        example: 'Az oldószerfront 8,0 cm-t, a folt 3,2 cm-t tett meg: `R_f = 3,2/8,0 = 0,40`. Ha egy alkohol és a belőle oxidált keton együtt fut, a kevésbé poláris keton Rf-je a nagyobb.'
      }
    ],
    terms: [
      /* ----- Szerkezet ----- */
      { id: 'szenvaz', term: 'Szénváz és hibridizáció', en: 'carbon skeleton; hybridization of carbon', topic: 'szerkezet',
        short: 'A szerves molekulák vázát egymáshoz kovalensen kötött szénatomok alkotják (nyílt lánc, elágazó lánc, gyűrű). A szén hibridállapota (sp³, sp², sp) szabja meg a kötésszögeket és a geometriát.',
        prereq: ['kemia-bsc/hibridizacio', 'kemia-bsc/vsepr', 'lecke:kemia/szerves-elektrokemia', 'modell:atom'],
        text: 'A szén négy vegyértékelektronja négy kovalens kötést alkot, a C–C kötés erős (≈ 350 kJ/mol), ezért a szén hosszú láncokat és gyűrűket képez – ez a **katenáció**.\n\nA hibridállapot összefoglalása:\n\n- **sp³**: négy σ-kötés, tetraéder, 109,5°; C–C kötéshossz 154 pm (alkánok);\n- **sp²**: három σ + egy π, síkháromszög, 120°; C=C 134 pm (alkének, karbonilcsoport, benzol);\n- **sp**: két σ + két π, lineáris, 180°; C≡C 120 pm (alkinek, nitrilek).\n\nA nagyobb s-jelleg rövidebb, erősebb kötést és elektronegatívabb szenet jelent: ezért savasabb az etin C–H-ja (pKₐ ≈ 25), mint az etán C–H-ja (pKₐ ≈ 50).\n\nA szénatomokat rendűség szerint is osztályozzuk: **primer** (1°, egy másik szénhez kötött), **szekunder** (2°), **tercier** (3°) és **kvaterner** (4°). A rendűség meghatározza a reakciókészséget (karbokation- és gyökstabilitás, SN1/SN2).\n\nÁbrázolás: összegképlet (C₄H₁₀), félig szerkezeti (CH₃CH₂CH₂CH₃), és **vonalképlet** (cikcakk vonal, ahol minden csúcs és végpont egy szénatom, a hidrogéneket nem írjuk ki).',
        example: 'Propén, CH₂=CH–CH₃: C1 és C2 sp², C3 sp³. A molekula 8 σ- és 1 π-kötést tartalmaz. Az izobután (2-metilpropán) központi szene tercier, a három metil-szén primer.',
        pitfall: 'A vonalképletben a hidrogének nincsenek feltüntetve, de ott vannak: minden szén négy kötést visel, a hiányzókat H egészíti ki. A heteroatomokat (O, N) és a hozzájuk kötött H-t mindig kiírjuk.',
        related: ['funkcios-csoport', 'alkanok', 'alkenek', 'alkinek', 'aromas', 'izomeria'],
        models: ['atom'] },
      { id: 'funkcios-csoport', term: 'Funkciós csoport', en: 'functional group', topic: 'szerkezet',
        short: 'Az az atomcsoport (pl. –OH, –CHO, –COOH, –NH₂), amely egy szerves vegyület jellemző kémiai tulajdonságait meghatározza. Azonos funkciós csoportú vegyületek egy vegyületcsaládot alkotnak.',
        prereq: ['lecke:kemia/szerves-elektrokemia', 'kemia-bsc/elektronegativitas'],
        visual: skFg, caption: 'A legfontosabb oxigén- és nitrogéntartalmú funkciós csoportok vonalképlettel. A cikcakk vonal minden töréspontja szénatom; a heteroatomokat színnel jelöltük.',
        text: 'A szénváz viszonylag reakcióképtelen; a kémia a funkciós csoportokon „történik”. Ezért a szerves kémiát vegyületcsaládok szerint tanuljuk, és egy családon belül az új vegyület viselkedése is jósolható.\n\nFontosabb csoportok (növekvő **oxidációs szint** szerint a szénen):\n\n- **szénhidrogén-részek**: C–C, C=C (alkén), C≡C (alkin), aromás gyűrű;\n- **egy heteroatomhoz kötött szén**: alkohol (R–OH), éter (R–O–R′), amin (R–NH₂), halogénszármazék (R–X);\n- **két kötéssel heteroatomhoz kötött szén**: aldehid (R–CHO), keton (R–CO–R′);\n- **három kötéssel**: karbonsav (R–COOH) és származékai: észter, amid, savhalogenid, anhidrid, nitril.\n\nA heteroatomok (O, N, halogének) elektronegatívabbak a szénnél, így a kötések **polárisak**: a szénen parciális pozitív töltés (δ+, elektrofil centrum), a heteroatomon parciális negatív (δ−) és gyakran nemkötő elektronpár (nukleofil, bázikus centrum). Ez dönti el, mi támadja meg a molekulát.\n\nA funkciós csoportok azonosítása spektroszkópiával: az **IR-spektrum** jellemző sávjai (C=O ≈ 1700 cm⁻¹, O–H ≈ 3300 cm⁻¹ széles).',
        example: 'A tejsav (2-hidroxipropánsav), CH₃–CH(OH)–COOH, két funkciós csoportot tartalmaz: egy szekunder alkoholos –OH-t és egy karboxilcsoportot. A paracetamol egy fenolos –OH-t és egy amidcsoportot.',
        pitfall: 'Az észter (R–COO–R′) nem azonos az éterrel (R–O–R′), és az amid (R–CO–NH₂) nem amin: a karbonilcsoport mellett a nitrogén nemkötő párja delokalizálódik, ezért az amidok gyakorlatilag nem bázisosak.',
        related: ['iupac', 'alkohol-eter', 'karbonil', 'karbonsav-eszter', 'amin-amid', 'szenvaz'] },
      { id: 'iupac', term: 'IUPAC-nevezéktan alapjai', en: 'IUPAC nomenclature', topic: 'szerkezet',
        short: 'A szerves vegyületek szisztematikus elnevezésének szabályrendszere: a leghosszabb (főcsoportot tartalmazó) szénlánc adja a törzsnevet, a funkciós csoport az utótagot, a szubsztituensek előtagként, helyzetszámmal szerepelnek.',
        prereq: ['lecke:kemia/szerves-elektrokemia'],
        text: 'Az elnevezés lépései:\n\n1. Meghatározzuk a **főcsoportot** (prioritás: karbonsav > észter > amid > nitril > aldehid > keton > alkohol > amin > alkén, alkin…). Ez adja az **utótagot**: -sav, -oát (észter), -amid, -al, -on, -ol, -amin.\n2. Kiválasztjuk a **főláncot**: a főcsoportot tartalmazó leghosszabb lánc (gyűrű). Törzsnevek: met-, et-, prop-, but-, pent-, hex-, hept-, okt-, non-, dek-.\n3. **Számozás**: a főcsoport kapja a lehető legkisebb helyzetszámot, majd a többszörös kötések, végül a szubsztituensek.\n4. A szubsztituenseket (metil-, etil-, klór-, hidroxi- stb.) ábécérendben, helyzetszámmal, előtagként írjuk; azonos csoportoknál di-, tri-, tetra-.\n5. Sztereodeszkriptorok (R/S, E/Z) a név elején, zárójelben.\n\nA magyar helyesírásban a helyzetszámot kötőjellel kapcsoljuk: **propán-2-ol**, **but-2-én**, **2-metilbután**. Sok vegyületnek elfogadott **triviális neve** is van: aceton (propanon), ecetsav (etánsav), formaldehid (metanal), toluol (metilbenzol), anilin (fenilamin).',
        example: 'CH₃–CH₂–CH(CH₃)–CH₂–OH: a leghosszabb, OH-t tartalmazó lánc 4 szénatomos, az OH szénje az 1-es, a metil a 2-es helyen → **2-metilbután-1-ol**. CH₃–CO–CH₂–CH₃: **bután-2-on** (metil-etil-keton). CH₃–CH=CH–COOH: **but-2-énsav** (krotonsav).',
        pitfall: 'Nem mindig a leghosszabb szénlánc a főlánc: a főcsoportot tartalmazó lánc élvez elsőbbséget. A számozás iránya a főcsoporttól függ, nem a szubsztituensek ábécérendjétől.',
        related: ['funkcios-csoport', 'izomeria', 'r-s', 'alkanok', 'szenvaz'] },
      { id: 'izomeria', term: 'Izoméria (konstitúciós és sztereoizoméria)', en: 'isomerism: constitutional isomers and stereoisomers', topic: 'szerkezet',
        short: 'Az izomerek azonos összegképletű, de eltérő szerkezetű vegyületek. Konstitúciós izomerekben az atomok kapcsolódási sorrendje más; sztereoizomerekben a kapcsolódás azonos, csak a térbeli elrendeződés különbözik.',
        prereq: ['kemia-bsc/hibridizacio'],
        text: '**Konstitúciós (szerkezeti) izoméria**:\n\n- **láncizoméria**: n-bután és izobután (2-metilpropán), C₄H₁₀;\n- **helyzeti izoméria**: propán-1-ol és propán-2-ol;\n- **funkciós csoport izoméria**: etanol és dimetil-éter (C₂H₆O); propanal és aceton (C₃H₆O).\n\n**Sztereoizoméria**:\n\n- **enantiomerek**: egymás nem fedésbe hozható tükörképei (királis molekulák);\n- **diasztereomerek**: nem tükörképi viszonyban lévő sztereoizomerek – ide tartozik a **geometriai (cisz–transz, E/Z) izoméria** kettős kötésnél és gyűrűknél, valamint a több kiralitáscentrumú molekulák nem tükörképi párjai.\n\nA **konformerek** (a σ-kötések körüli elfordulással egymásba alakuló alakok) szobahőmérsékleten gyorsan átalakulnak, ezért általában nem tekintjük őket külön izomereknek.\n\nAz enantiomerek fizikai tulajdonságai (olvadáspont, oldhatóság) azonosak, csak a polarizált fény síkját forgatják ellenkező irányba, és királis környezetben (enzimek, receptorok) viselkednek eltérően. A diasztereomerek fizikai és kémiai tulajdonságai különböznek, ezért például kristályosítással vagy kromatográfiával elválaszthatók.\n\nAz **E/Z** jelölés a CIP-prioritásokon alapul: Z (zusammen), ha a két nagyobb prioritású csoport azonos oldalon van; E (entgegen), ha ellentétesen.',
        example: 'C₅H₁₂-nek 3 konstitúciós izomerje van: pentán, 2-metilbután, 2,2-dimetilpropán (forráspontjuk 36, 28, 9,5 °C). But-2-én: (Z)- és (E)-izomer, forráspontjuk 3,7 és 0,9 °C. A borkősavnak két kiralitáscentruma miatt legfeljebb 2² = 4 sztereoizomere lehetne, de csak 3 van: (R,R), (S,S) és a szimmetrikus, optikailag inaktív **mezo**-forma.',
        pitfall: 'A cisz/transz jelölés nem mindig egyezik az E/Z-vel: az E/Z a prioritásokon alapul, a cisz/transz az azonos csoportokon. Ugyanannak a molekulának két, csak σ-kötés körül elforgatott rajza (konformáció) nem két izomer.',
        related: ['kiralitas', 'r-s', 'alkenek', 'alkanok', 'iupac', 'szenhidrat'] },
      { id: 'kiralitas', term: 'Kiralitás és enantiomerek', en: 'chirality; enantiomers', topic: 'szerkezet',
        short: 'Királis az a molekula, amely nem hozható fedésbe a tükörképével, mint a jobb és a bal kéz. Leggyakoribb oka egy négy különböző szubsztituenst hordozó (aszimmetrikus) szénatom. A molekula és tükörképe egy enantiomerpár.',
        prereq: ['kemia-bsc/vsepr'],
        visual: skChiral, caption: 'A bróm-klór-fluor-metán két enantiomere: a tükörsík két oldalán álló molekulák semmilyen forgatással nem hozhatók fedésbe.',
        text: 'A **kiralitáscentrum** (sztereocentrum) leggyakrabban egy sp³ szénatom négy különböző csoporttal. Egy molekula akkor **akirális**, ha van tükörsíkja vagy inverziós centruma – ilyenkor tükörképe önmaga.\n\nAz enantiomerek:\n\n- akirális környezetben azonos fizikai és kémiai tulajdonságúak (olvadáspont, forráspont, oldhatóság, reakciósebesség akirális reagenssel);\n- a lineárisan polarizált fény síkját azonos mértékben, de **ellentétes irányba** forgatják (optikai aktivitás);\n- királis környezetben – enzimek, receptorok, királis reagensek – eltérően viselkednek.\n\nA két enantiomer 1 : 1 arányú elegye a **racém elegy**, amely nem forgat. Szétválasztásuk (**rezolválás**) királis segédanyaggal képzett diasztereomerek elválasztásával vagy királis kromatográfiával történik.\n\nAz élővilág homokirális: a fehérjék szinte kizárólag L-aminosavakból, a nukleinsavak D-cukrokból épülnek fel. A gyógyszerek esetében ezért a két enantiomer hatása eltérhet: az (S)-ibuprofen a hatásos forma; a talidomid tragédiája rámutatott a sztereokémia jelentőségére (ennél a molekulánál az enantiomerek a szervezetben egymásba is alakulnak).\n\nn kiralitáscentrum esetén legfeljebb **2ⁿ** sztereoizomer létezhet.',
        example: 'Bután-2-ol, CH₃–CH(OH)–CH₂CH₃: a C2 szénhez H, OH, CH₃ és C₂H₅ kapcsolódik – négy különböző csoport, tehát királis. Propán-2-ol, (CH₃)₂CHOH: két azonos metilcsoport, akirális. A glükóz nyílt láncú formájában 4 kiralitáscentrum van → 2⁴ = 16 aldohexóz sztereoizomer.',
        pitfall: 'A forgatás iránya (+/−) és az abszolút konfiguráció (R/S) független egymástól: egy (R)-vegyület lehet jobbra és balra forgató is. Az is előfordul, hogy egy molekulában van kiralitáscentrum, mégis akirális (mezo-vegyület).',
        formulas: ['fajlagos-forgatas-f', 'ee-f'],
        related: ['r-s', 'izomeria', 'sn1', 'sn2', 'aminosav', 'szenhidrat'] },
      { id: 'r-s', term: 'R/S konfiguráció (CIP-szabályok)', en: 'R/S configuration; Cahn–Ingold–Prelog priority rules', topic: 'szerkezet',
        short: 'A kiralitáscentrum abszolút konfigurációjának jelölése: a négy szubsztituenst a Cahn–Ingold–Prelog-szabályok szerint rangsoroljuk, a legkisebb prioritásút hátra fordítjuk, és ha a maradék 1 → 2 → 3 sorrend az óramutató járásával egyező, R, ha ellentétes, S.',
        text: '**Prioritási szabályok** (CIP):\n\n1. A kiralitáscentrumhoz közvetlenül kapcsolódó atomok **rendszáma** dönt: nagyobb rendszám = nagyobb prioritás (Br > Cl > S > F > O > N > C > H).\n2. Egyezés esetén a következő atomokat hasonlítjuk össze (az első eltérési pontig haladva, a halmazokat csökkenő sorrendbe rendezve).\n3. A többszörös kötéseket **megkettőzött** (megháromszorozott) atomként számoljuk: –CH=O úgy számít, mint ha a szén két O-hoz kapcsolódna.\n4. Izotópoknál a nagyobb tömegszámú előbbre való (D > H).\n\n**Hozzárendelés**: úgy nézzük a molekulát, hogy a 4. prioritású csoport tőlünk elfelé mutasson; ha 1 → 2 → 3 óramutató szerinti, **R** (rectus), ha ellentétes, **S** (sinister).\n\nTrükk vonalképleteken: ha a legkisebb prioritású csoport felénk mutat (ék), a kapott eredményt meg kell fordítani. Ha két szubsztituenst felcserélünk, a konfiguráció megfordul.\n\nA régi **D/L** jelölés (Fischer-projekció, a glicerinaldehidhez viszonyítva) cukroknál és aminosavaknál ma is használatos; nem egyezik meg szükségszerűen az R/S-sel. A természetes aminosavak L-konfigurációjúak, ami a cisztein kivételével S-nek felel meg.',
        example: 'Bróm-klór-fluor-metán (ábra a kiralitásnál): prioritás Br (35) > Cl (17) > F (9) > H (1). H hátra mutat; Br → Cl → F óramutató szerint → **R**. Alanin (L): NH₂ > COOH > CH₃ > H → **S**. Cisztein (L): a CH₂SH csoport a kén miatt megelőzi a COOH-t → **R**.',
        pitfall: 'A prioritást nem a csoport tömege vagy mérete, hanem az első eltérő atom rendszáma dönti el: –CH₂Br > –C(CH₃)₃, mert az első összehasonlított halmaz (Br, H, H) > (C, C, C). Az R/S nem jósolja meg a forgatás irányát.',
        related: ['kiralitas', 'izomeria', 'iupac', 'aminosav', 'szenhidrat'] },

      /* ----- Szénhidrogének ----- */
      { id: 'alkanok', term: 'Alkánok és konformáció', en: 'alkanes; conformation', topic: 'szenhidrogen',
        short: 'Telített, nyílt láncú szénhidrogének, általános képletük CₙH₂ₙ₊₂ (gyűrűs változatuk, a cikloalkánok: CₙH₂ₙ). Apolárisak, kevéssé reakcióképesek; a C–C kötések körüli elfordulással különböző konformációkat vehetnek fel.',
        prereq: ['kemia-bsc/intermolekularis', 'kemia-bsc/entalpia'],
        visual: skNewman, caption: 'A bután három jellegzetes konformációja Newman-projekcióban. Az anti alakban a két metilcsoport a legtávolabb van egymástól; a fedő állás a legkedvezőtlenebb.',
        text: 'Az alkánok homológ sort alkotnak (metán, etán, propán, bután…). Forráspontjuk a lánc hosszával nő (erősebb diszperziós kölcsönhatás), az elágazás csökkenti. Vízben nem oldódnak, sűrűségük kisebb a vízénél.\n\nReakcióik:\n\n- **égés**: erősen exoterm (földgáz, benzin, gázolaj energiatartalma);\n- **gyökös halogénezés** fény vagy hő hatására;\n- **krakkolás**: hosszú láncok hasítása (petrolkémia).\n\n**Konformáció**: a σ-kötés körül a molekularészek elfordulhatnak; a különböző térbeli helyzetek (konformerek) energiája eltér. A **Newman-projekcióban** a kötés tengelye mentén nézünk: az elülső szén a középpont, a hátsó a kör.\n\n- Etánnál a **nyitott** (staggered) állás kb. 12 kJ/mol-lal stabilabb, mint a **fedő** (eclipsed) – ez a torziós feszültség.\n- Butánnál (C2–C3): **anti** (0) < **gauche** (+3,8 kJ/mol, sztérikus taszítás) < **fedő** metil–metil állás (≈ +19 kJ/mol).\n\n**Ciklohexán**: a **szék** konformáció feszültségmentes (minden szög ≈ 109,5°, minden kötés nyitott állású). A szubsztituensek **ekvatoriális** helyzetben stabilabbak, mint axiálisban (1,3-diaxiális kölcsönhatás). A szék-szék átfordulás szobahőmérsékleten másodpercenként sokezerszer lejátszódik.',
        example: 'Metán égése: CH₄ + 2 O₂ → CO₂ + 2 H₂O, ΔH = −890 kJ/mol. Forráspontok: pentán 36 °C, hexán 69 °C, heptán 98 °C. Metil-ciklohexánban szobahőmérsékleten a molekulák kb. 95%-a ekvatoriális metilcsoportú konformációban van.',
        pitfall: 'A konformerek nem izomerek a szokásos értelemben: nem különíthetők el, mert gyorsan átalakulnak. A Newman-projekció és a vonalképlet ugyanazt a molekulát mutatja más nézőpontból – a gauche és az anti bután ugyanaz a vegyület.',
        related: ['szenvaz', 'gyokos', 'izomeria', 'alkenek', 'iupac'] },
      { id: 'alkenek', term: 'Alkének', en: 'alkenes (olefins)', topic: 'szenhidrogen',
        short: 'Egy vagy több szén–szén kettős kötést tartalmazó szénhidrogének (nyílt láncú, egy kettős kötéssel: CₙH₂ₙ). A kettős kötés egy σ- és egy π-kötésből áll; a π-elektronok miatt jellemző reakciójuk az elektrofil addíció.',
        prereq: ['kemia-bsc/hibridizacio', 'kemia-bsc/molekulapalya'],
        text: 'A kettős kötés két sp² szénatom között jön létre: a hibridpályák átfedése σ-kötést, a párhuzamos p-pályák oldalirányú átfedése **π-kötést** ad. A π-kötés gyengébb (≈ 270 kJ/mol a σ ≈ 350-hez képest), és elektronfelhője a molekula síkja fölött és alatt helyezkedik el – könnyen hozzáférhető az elektrofilek számára.\n\nA π-kötés megakadályozza a kötés körüli szabad elfordulást, ezért lehetséges a **cisz–transz (E/Z) izoméria**, ha mindkét szénatomon két különböző csoport van.\n\nAz alkének **stabilitása** a szubsztituáltsággal nő (hiperkonjugáció): tetraszubsztituált > triszubsztituált > diszubsztituált > monoszubsztituált; a transz izomer stabilabb a cisznél. Ezt a hidrogénezési hő méri.\n\nFontos reakciók:\n\n- **elektrofil addíció**: H–X, H₂O (savkatalízissel), X₂ – Markovnyikov-szabály szerint;\n- **katalitikus hidrogénezés** (Pt, Pd, Ni) → alkán;\n- **oxidáció**: KMnO₄-tal diol (a lila szín eltűnése a telítetlenség próbája), ózonolízissel hasítás aldehidekké/ketonokká;\n- **polimerizáció**: polietilén, polipropilén, PVC.\n\nElőállítás: alkoholok dehidratálása, alkil-halogenidek eliminációja, ipari léptékben a kőolaj krakkolása.',
        example: 'Eténből (etilén) évente több mint 150 millió tonna készül; ennek fele polietilénné alakul. A brómos víz elszíntelenedése: CH₂=CH₂ + Br₂ → BrCH₂–CH₂Br (1,2-dibrómetán). Hidrogénezési hők: but-1-én −126, (Z)-but-2-én −119, (E)-but-2-én −115 kJ/mol → a transz a legstabilabb.',
        pitfall: 'A kettős kötés nem „kétszer olyan erős”, mint az egyszeres: a π-komponens gyengébb a σ-nál, ezért reakcióképesebb. A C=C szénatomjai sp², nem sp³ hibridállapotúak – ezért a hozzájuk kapcsolódó atomok egy síkban vannak.',
        related: ['elektrofil-addicio', 'eliminacio', 'izomeria', 'alkinek', 'polimer', 'aromas'] },
      { id: 'alkinek', term: 'Alkinek', en: 'alkynes', topic: 'szenhidrogen',
        short: 'Szén–szén hármas kötést tartalmazó szénhidrogének (egy hármas kötéssel: CₙH₂ₙ₋₂). A hármas kötés egy σ- és két π-kötés, a szénatomok sp hibridállapotúak, a molekularész lineáris.',
        prereq: ['kemia-bsc/hibridizacio', 'kemia-bsc/pka'],
        text: 'A legegyszerűbb alkin az **etin** (acetilén), HC≡CH. A hármas kötés rövid (120 pm) és erős (≈ 835 kJ/mol), a két π-kötés egymásra merőleges síkban helyezkedik el, hengerszimmetrikus elektronfelhőt alkotva.\n\nJellemzők:\n\n- **terminális alkinek** (R–C≡C–H) C–H kötése szokatlanul savas (pKₐ ≈ 25), mert az sp pálya 50% s-jellege miatt a keletkező acetilid-anion stabilabb. Erős bázissal (NaNH₂) deprotonálható; az acetilidion jó nukleofil, C–C kötés kialakítására használják.\n- **addíciós reakciók**: két lépésben két mól reagens addícionálódhat. H₂-vel Lindlar-katalizátoron **cisz-alkénné**, Na/NH₃-ban **transz-alkénné** redukálható; teljes hidrogénezéssel alkán.\n- **vízaddíció** (Hg²⁺ katalízissel): enol keletkezik, amely **keto–enol tautomériával** ketonná (etinből acetaldehiddé) alakul.\n\nAz acetilén oxigénnel égve kb. 3100 °C-os lángot ad (hegesztés, vágás). Régebben kalcium-karbidból állították elő: CaC₂ + 2 H₂O → C₂H₂ + Ca(OH)₂.',
        example: 'Propin (CH₃–C≡CH) + 2 HBr → 2,2-dibrómpropán (mindkét lépés Markovnyikov-szabály szerinti). But-2-in + H₂ (Lindlar-Pd) → (Z)-but-2-én. DBE: C₃H₄ → `3 − 2 + 1 = 2` (egy hármas kötés).',
        pitfall: 'Az etin savassága relatív: a víznél (pKₐ ≈ 15,7) sokkal gyengébb sav, tehát NaOH nem deprotonálja jelentős mértékben – ehhez NaNH₂ (NH₃ pKₐ ≈ 38) kell.',
        formulas: ['dbe-f'],
        related: ['alkenek', 'szenvaz', 'elektrofil-addicio', 'karbonil'] },
      { id: 'aromas', term: 'Aromás vegyületek (benzol)', en: 'aromatic compounds; benzene', topic: 'szenhidrogen',
        short: 'Gyűrűs, sík, teljesen konjugált molekulák 4n + 2 delokalizált π-elektronnal (Hückel-szabály). Kiemelkedően stabilak; jellemző reakciójuk nem az addíció, hanem az elektrofil szubsztitúció. Alapvegyületük a benzol, C₆H₆.',
        prereq: ['kemia-bsc/molekulapalya', 'kemia-bsc/hibridizacio'],
        visual: skBenz, caption: 'A benzol két Kekulé-féle határszerkezete és a valós, delokalizált szerkezet. A kettős nyíl rezonanciát jelöl, nem egyensúlyt: a molekula egyik határszerkezetben sem létezik.',
        text: 'A benzol hat sp² szénatomja szabályos hatszöget alkot, mind a hat p-pálya merőleges a síkra, és egyetlen, a gyűrű fölött és alatt húzódó **delokalizált π-rendszert** alkot. Mind a hat C–C kötés egyforma hosszú (139 pm), a C–C és C=C között.\n\nA **rezonanciastabilizáció** mérhető: a ciklohexén hidrogénezési hője −120 kJ/mol; ha a benzolban három „elszigetelt” kettős kötés lenne, −360 kJ/mol-t várnánk, a mért érték viszont csak −208 kJ/mol. A különbség, kb. 150 kJ/mol, az **aromás stabilizáció**.\n\nEzért a benzol a brómos vizet nem színteleníti el, a KMnO₄ nem oxidálja; reakcióiban a gyűrű megmarad: **elektrofil aromás szubsztitúció** (nitrálás, halogénezés, szulfonálás, Friedel–Crafts-reakciók).\n\nAz aromaticitás feltételei: gyűrűs, sík, folytonos konjugáció, 4n + 2 π-elektron. Aromás heterociklusok: piridin, pirrol, furán, imidazol, a nukleinsav-bázisok (purinok, pirimidinek). Kondenzált aromás rendszerek: naftalin, antracén, grafén.\n\nFontos származékok: toluol (metilbenzol), fenol, anilin, benzoesav, sztirol.',
        example: 'Hückel-szabály: benzol 6 π-e⁻ (n = 1), naftalin 10 π-e⁻ (n = 2) – aromás. Piridinben a N nemkötő párja a síkban van, nem része a π-rendszernek (ezért bázis); pirrolban a N párja a π-rendszer része (6 π-e⁻), ezért a pirrol gyakorlatilag nem bázisos. Stabilizáció: `3·(−120) − (−208) = −152` → ≈ 150 kJ/mol.',
        pitfall: 'A rezonanciaszerkezetek nem egymásba alakuló molekulák (a kettős nyíl ↔ nem egyensúlyi ⇌ jel): a valós molekula egyetlen, átlagos szerkezet. Az „aromás” szó itt nem az illatra utal (sok aromás vegyület szagtalan).',
        formulas: ['huckel-f', 'dbe-f'],
        related: ['sear', 'alkenek', 'nukleotid', 'szenvaz', 'amin-amid'] },

      /* ----- Reakciómechanizmusok ----- */
      { id: 'sn2', term: 'Nukleofil szubsztitúció: SN2', en: 'bimolecular nucleophilic substitution (SN2)', topic: 'mechanizmus',
        short: 'Egylépéses mechanizmus: a nukleofil a távozó csoporttal szemközti oldalról támadja az elektrofil szénatomot, miközben a távozó csoport kilép. Sebessége mindkét reaktánstól függ, a konfiguráció megfordul (Walden-inverzió).',
        prereq: ['kemia-bsc/sebessegi-egyenlet', 'kemia-bsc/aktivalasi-energia'],
        visual: skSn2, caption: 'SN2: a hidroxidion a C–Br kötéssel szemközt támad. Az átmeneti állapotban a szén öt csoporthoz kapcsolódik, a három H egy síkban; a végén a molekula „kifordul”, mint a szélben az esernyő.',
        text: '**Nukleofil** (magkedvelő): elektronpárral rendelkező, elektronszegény centrumot támadó részecske (OH⁻, CN⁻, I⁻, NH₃, RO⁻). **Elektrofil**: elektronszegény centrum, itt a halogénhez kötött, δ+ töltésű szén. **Távozó csoport**: annál jobb, minél stabilabb anionként (minél gyengébb bázisként) távozik: I⁻ > Br⁻ > Cl⁻ ≫ F⁻; OH⁻ rossz távozó csoport, protonálva (H₂O) már jó.\n\nAz SN2 jellemzői:\n\n- **egy lépés**, egyetlen átmeneti állapot (nincs köztitermék);\n- **másodrendű** kinetika: `v = k·[RX]·[Nu⁻]`;\n- **sztereospecifikus**: királis szubsztrátnál teljes **inverzió** – (R)-ból (S) lesz (ha a prioritások nem változnak);\n- erősen érzékeny a **térgátlásra**: metil > primer > szekunder ≫ tercier (tercier szénen gyakorlatilag nem megy végbe);\n- kedvez neki az erős nukleofil és a **poláris aprotikus oldószer** (aceton, DMSO, DMF), amely nem szolvatálja erősen az aniont.\n\nAz SN2 a szintetikus kémia egyik leggyakrabban használt C–C és C–heteroatom kötésképző reakciója, és a biokémiában is előfordul (metiltranszferázok).',
        example: '(R)-2-brómbután + OH⁻ → (S)-bután-2-ol. CH₃Br + OH⁻ reakciójában, ha [CH₃Br] = 0,01 M és [OH⁻] = 0,02 M-ról 0,04 M-ra nő, a sebesség kétszeres lesz. Relatív sebességek (Br⁻ távozó csoport): CH₃ ≈ 30, primer ≈ 1, szekunder ≈ 0,02, tercier ≈ 0.',
        pitfall: 'A „hátoldali támadás” a távozó csoporthoz képest értendő, nem a molekula „hátához”. Ha a nukleofil a távozó csoporthoz képest kisebb prioritású, a betű (R/S) nem feltétlenül változik meg, pedig a térbeli inverzió megtörtént.',
        formulas: ['sn2-f'],
        related: ['sn1', 'eliminacio', 'kiralitas', 'r-s', 'alkohol-eter', 'amin-amid'] },
      { id: 'sn1', term: 'Nukleofil szubsztitúció: SN1', en: 'unimolecular nucleophilic substitution (SN1)', topic: 'mechanizmus',
        short: 'Kétlépéses mechanizmus: először a távozó csoport lassan leválik, és sík karbokation keletkezik, majd ezt a nukleofil gyorsan megtámadja. Sebessége csak a szubsztrát koncentrációjától függ; királis centrumon (rész)racemizációt okoz.',
        prereq: ['kemia-bsc/sebessegi-egyenlet', 'kemia-bsc/aktivalasi-energia'],
        visual: skEnergy, caption: 'Energiaprofil: az SN2 egyetlen átmeneti állapoton át zajlik, az SN1 egy karbokation-köztiterméken keresztül. Az SN1-ben az első (ionizációs) lépés gátja a nagyobb – ez a sebességmeghatározó lépés.',
        text: 'Lépések:\n\n1. **Ionizáció** (lassú, sebességmeghatározó): R–X → R⁺ + X⁻.\n2. **Nukleofil támadás** (gyors): R⁺ + Nu⁻ → R–Nu.\n\nKövetkezmények:\n\n- **elsőrendű** kinetika: `v = k·[RX]`, a nukleofil koncentrációja és erőssége nem befolyásolja a sebességet;\n- a karbokation **sík** (sp²), mindkét oldalról támadható, ezért királis szubsztrátból **racemizáció** (gyakran kis inverziós többlettel, mert a távozó ion átmenetileg árnyékolja az egyik oldalt);\n- **átrendeződés** lehetséges: a karbokation hidrid- vagy alkilvándorlással stabilabbá alakulhat;\n- versengő reakció az **E1** elimináció (ugyanaz a köztitermék).\n\nKedvező feltételek:\n\n- **tercier**, allil- vagy benzilhelyzetű szubsztrát (stabil karbokation: hiperkonjugáció, rezonancia). Stabilitási sor: 3° > 2° ≫ 1° > metil;\n- **poláris protikus oldószer** (víz, alkoholok, hangyasav), amely szolvatálja a kationt és az aniont is;\n- gyenge nukleofil (gyakran maga az oldószer: **szolvolízis**).',
        example: 'Terc-butil-bromid hidrolízise: (CH₃)₃C–Br + H₂O → (CH₃)₃C–OH + HBr. A szubsztrát koncentrációjának kétszerezése kétszeres sebességet ad, a víz (vagy OH⁻) mennyiségének növelése nem gyorsít. Optikailag tiszta (S)-3-bróm-3-metilhexán szolvolízise nagyrészt racém alkoholt ad.',
        pitfall: 'A karbokation köztitermék, nem átmeneti állapot: az energiaprofil völgyében van, rövid ideig létezik, akár spektroszkópiailag is kimutatható. Primer alkil-halogenidek nem reagálnak SN1 szerint (kivéve allil, benzil): a primer karbokation túl instabil.',
        formulas: ['sn2-f'],
        related: ['sn2', 'eliminacio', 'elektrofil-addicio', 'kiralitas', 'alkohol-eter'] },
      { id: 'eliminacio', term: 'Elimináció (E1, E2) és Zajcev-szabály', en: 'elimination reactions (E1, E2); Zaitsev\u2019s rule', topic: 'mechanizmus',
        short: 'Olyan reakció, amelyben egy molekula két szomszédos atomjáról egy-egy csoport (pl. H és Br) lehasad, és kettős kötés alakul ki. E2: egylépéses, bázis vonja el a protont; E1: kétlépéses, karbokationon át. Általában a stabilabb, szubsztituáltabb alkén a fő termék (Zajcev-szabály).',
        prereq: ['kemia-bsc/aktivalasi-energia', 'kemia-bsc/entropia'],
        visual: skE2, caption: 'E2-elimináció: a bázis a β-hidrogént vonja el, a C–H kötés elektronpárja π-kötéssé alakul, a bromid távozik – egyetlen, összehangolt lépésben.',
        text: 'A szubsztitúció és az elimináció **versengő** folyamatok – a reagens nukleofilként (szénatomot támad) vagy bázisként (protont von el) is viselkedhet.\n\n**E2** (bimolekuláris):\n\n- `v = k·[RX]·[B⁻]`, egyetlen lépés;\n- **anti-periplanáris** geometria szükséges: a lehasadó H és X egy síkban, ellentétes oldalon (180°) áll – sztereospecifikus;\n- erős bázis (RO⁻, OH⁻), magas hőmérséklet kedvez neki;\n- tercier szubsztrátnál erős bázissal szinte csak E2 megy.\n\n**E1** (monomolekuláris):\n\n- `v = k·[RX]`, a karbokation képződése a lassú lépés, utána protonvesztés;\n- SN1-gyel versenyez; magasabb hőmérséklet az eliminációnak kedvez (ΔS > 0, mert több részecske keletkezik).\n\n**Regiokémia**: a **Zajcev-szabály** szerint általában a szubsztituáltabb (stabilabb) alkén a főtermék. Nagy térigényű bázissal (terc-butoxid) a kevésbé szubsztituált, ún. **Hofmann-termék** kerül túlsúlyba.\n\nAz alkoholok savkatalizált **dehidratálása** (tömény H₂SO₄, melegítés) szintén elimináció, jellemzően E1 mechanizmussal.',
        example: '2-brómbután + EtO⁻/EtOH (melegítés): főtermék a but-2-én (kb. 80%, zömmel E), melléktermék a but-1-én (kb. 20%). Ugyanez terc-butoxiddal: a but-1-én a főtermék (Hofmann). Etanol + tömény H₂SO₄, 170 °C → etén + H₂O (140 °C-on inkább dietil-éter képződik).',
        pitfall: 'A Zajcev-szabály tapasztalati szabály, nem törvény: térigényes bázis vagy speciális távozó csoport (pl. –N(CH₃)₃⁺) esetén a Hofmann-termék dominál. Ciklohexán-származékokon E2 csak akkor megy, ha a H és a X **transz-diaxiális** helyzetbe kerülhet.',
        related: ['sn1', 'sn2', 'alkenek', 'alkohol-eter', 'elektrofil-addicio'] },
      { id: 'elektrofil-addicio', term: 'Elektrofil addíció és Markovnyikov-szabály', en: 'electrophilic addition; Markovnikov\u2019s rule', topic: 'mechanizmus',
        short: 'Az alkének jellemző reakciója: az elektrofil (pl. H⁺) a π-elektronpárhoz kapcsolódik, majd a keletkező karbokationt a nukleofil megköti. Markovnyikov-szabály: H–X addíciójakor a hidrogén a több hidrogént hordozó szénatomra kerül, mert így a stabilabb karbokation keletkezik.',
        prereq: ['kemia-bsc/aktivalasi-energia'],
        visual: skMark, caption: 'Propén és HBr reakciója: a proton úgy kapcsolódik, hogy a stabilabb, szekunder karbokation keletkezzen; így a 2-brómpropán a főtermék.',
        text: 'Mechanizmus (HX addíció):\n\n1. A C=C π-elektronpárja megköti a H⁺-t → **karbokation** (lassú lépés).\n2. A halogenidion a karbokationhoz kapcsolódik (gyors).\n\nA **Markovnyikov-szabály** mai, mechanisztikus megfogalmazása: az elektrofil úgy addícionálódik, hogy a **stabilabb karbokation** keletkezzen (tercier > szekunder > primer, a hiperkonjugáció és az induktív hatás miatt). Az ilyen reakció **regioszelektív**.\n\nFontos változatok:\n\n- **vízaddíció** savkatalízissel (H₂SO₄, H₃PO₄): Markovnyikov-alkohol – ipari etanol- és propán-2-ol-gyártás;\n- **halogénaddíció** (Br₂): gyűrűs bromóniumion köztiterméken át **anti** addíció (transz-1,2-dibromid);\n- **anti-Markovnyikov** termék: HBr peroxid jelenlétében **gyökös** mechanizmussal (a Br-gyök a kevésbé szubsztituált szénre lép), illetve **hidroborálás–oxidáció** (BH₃, majd H₂O₂/OH⁻) → primer alkohol.\n\nA karbokation-köztitermék miatt **átrendeződés** is előfordulhat (hidrid- vagy metilvándorlás stabilabb kation felé).',
        example: 'CH₃–CH=CH₂ + HBr → CH₃–CHBr–CH₃ (2-brómpropán, főtermék). Ugyanez peroxiddal: CH₃–CH₂–CH₂Br (1-brómpropán). 2-metilpropén + H₂O (H⁺) → terc-butil-alkohol (tercier karbokationon át). Ciklohexén + Br₂ → transz-1,2-dibrómciklohexán.',
        pitfall: 'Szimmetrikus alkénnél (etén, but-2-én) vagy szimmetrikus reagensnél (Br₂, H₂) a Markovnyikov-szabálynak nincs értelme – csak egy termék lehet. Az „anti-Markovnyikov” nem kivétel a szabály mögötti elv alól: a gyökös úton is a stabilabb köztitermék (itt gyök) képződik.',
        related: ['alkenek', 'sn1', 'gyokos', 'eliminacio', 'alkohol-eter', 'alkinek'] },
      { id: 'sear', term: 'Elektrofil aromás szubsztitúció', en: 'electrophilic aromatic substitution (SEAr)', topic: 'mechanizmus',
        short: 'Az aromás gyűrű jellemző reakciója: egy erős elektrofil a π-rendszerhez kapcsolódik (σ-komplex, arénium-ion), majd egy proton lehasadásával az aromás rendszer helyreáll. Így a gyűrű H-atomja más csoportra cserélődik.',
        prereq: ['kemia-bsc/aktivalasi-energia'],
        text: 'Mechanizmus:\n\n1. Az erős elektrofil (E⁺) képződése, gyakran katalizátorral.\n2. Az aromás π-rendszer megtámadja E⁺-t → **σ-komplex** (Wheland-intermedier, arénium-ion), amelyben az aromaticitás ideiglenesen megszűnik (lassú, sebességmeghatározó lépés).\n3. Protonvesztés (gyors) → az aromás gyűrű helyreáll.\n\nAz addíció helyett azért szubsztitúció történik, mert így az aromás stabilizáció megmarad.\n\nFontosabb reakciók:\n\n- **nitrálás**: HNO₃ + H₂SO₄ → NO₂⁺ (nitróniumion);\n- **halogénezés**: Br₂ + FeBr₃ (Lewis-sav) → „Br⁺”;\n- **szulfonálás**: SO₃/H₂SO₄ (megfordítható);\n- **Friedel–Crafts-alkilezés** (R–Cl + AlCl₃) és **-acilezés** (RCOCl + AlCl₃).\n\n**Irányító hatás** a második szubsztituens belépésekor:\n\n- **aktiváló, orto/para-irányító**: –OH, –NH₂, –OR, alkilcsoportok (elektronküldők);\n- **dezaktiváló, meta-irányító**: –NO₂, –CN, –COOH, –CHO, –SO₃H (elektronszívók);\n- a **halogének** különlegesek: dezaktiválnak, de orto/para-irányítók.\n\nAz irányítás oka a σ-komplex határszerkezeteinek stabilitása: elektronküldő csoport orto/para támadásnál közvetlenül stabilizálja a pozitív töltést.',
        example: 'Benzol + HNO₃/H₂SO₄ → nitrobenzol (majd redukcióval anilin, a festékipar alapanyaga). Toluol nitrálása: kb. 59% orto-, 37% para-, 4% meta-nitrotoluol. Nitrobenzol további nitrálása nagyrészt meta-dinitrobenzolt ad, és sokkal lassabb, mint a benzolé.',
        pitfall: 'A benzol nem addícionál brómot, mint az alkének: Lewis-sav katalizátor nélkül a bróm nem elég erős elektrofil, katalizátorral pedig szubsztitúció történik, nem addíció. A Friedel–Crafts-alkilezésnél a termék aktiváltabb a kiindulási anyagnál, ezért többszörös alkileződés és karbokation-átrendeződés zavarhat.',
        related: ['aromas', 'elektrofil-addicio', 'amin-amid', 'alkohol-eter'] },
      { id: 'gyokos', term: 'Gyökös reakciók', en: 'radical reactions', topic: 'mechanizmus',
        short: 'Párosítatlan elektronú részecskék (gyökök) részvételével lejátszódó láncreakciók, három szakasszal: láncindítás, láncvivő lépések és lánczárás. Jellemző példa az alkánok fény hatására lejátszódó halogénezése.',
        prereq: ['kemia-bsc/pauli-hund', 'kemia-bsc/aktivalasi-energia'],
        text: 'Gyök homolitikus kötéshasadással keletkezik: a kötés elektronpárja egyenlően oszlik meg (X–X → 2 X•). Ehhez energia kell: fény (hν), hő vagy iniciátor (peroxidok, AIBN).\n\nA **metán klórozásának** lépései:\n\n1. **Láncindítás**: Cl₂ → 2 Cl• (UV-fény).\n2. **Láncvivő lépések**: Cl• + CH₄ → HCl + CH₃•; CH₃• + Cl₂ → CH₃Cl + Cl•. Minden lépés újra termel gyököt, így egyetlen indítás több ezer termékmolekulát ad.\n3. **Lánczárás**: két gyök egyesül (Cl• + Cl•, CH₃• + Cl•, 2 CH₃•).\n\nA gyökök **stabilitása**: tercier > szekunder > primer > metil (hiperkonjugáció), az allil- és benzilgyökök rezonancia miatt különösen stabilak. Ezért a halogénezés **szelektív**: a klórgyök kevéssé válogat (reaktív), a brómgyök sokkal inkább (Hammond-elv).\n\nJelentőség:\n\n- **gyökös polimerizáció**: polietilén (nagynyomású), polisztirol, PVC;\n- **égés** és **autooxidáció** (zsírok avasodása);\n- a sztratoszférikus **ózonbontás** freonokból származó Cl• gyökkel;\n- élő szervezetben a reaktív oxigénformák (ROS) – az antioxidánsok (C- és E-vitamin) gyökfogók.',
        example: 'Propán monoklórozása 25 °C-on: 6 primer és 2 szekunder H, a szekunder H egyenként kb. 3,8-szor reaktívabb. Várható arány: `6·1 : 2·3,8 = 6 : 7,6` → kb. **44% 1-klórpropán és 56% 2-klórpropán** (a mért érték 45 : 55 körül van). Brómozásnál a szekunder termék aránya 97% fölötti.',
        pitfall: 'A gyök nem ion: töltése nincs, párosítatlan elektronja van. A gyökös halogénezés nem alkalmas tiszta termék előállítására olyan alkánból, amelyben többféle H van – a láncreakció termékelegyet és többszörösen halogénezett termékeket is ad.',
        related: ['alkanok', 'elektrofil-addicio', 'polimer', 'lipid'] },

      /* ----- Oxigén- és nitrogéntartalmú vegyületek ----- */
      { id: 'alkohol-eter', term: 'Alkoholok és éterek', en: 'alcohols and ethers', topic: 'heteroatom',
        short: 'Az alkoholokban hidroxilcsoport (–OH) kapcsolódik sp³ szénatomhoz (R–OH); az éterekben az oxigén két szénhidrogén-csoportot köt össze (R–O–R′). Az alkoholok hidrogénkötést képeznek, ezért forráspontjuk jóval magasabb az azonos méretű étereknél.',
        prereq: ['kemia-bsc/intermolekularis', 'kemia-bsc/pka'],
        text: '**Alkoholok** rendűség szerint: primer (RCH₂OH), szekunder (R₂CHOH), tercier (R₃COH); értékűség szerint egy- és többértékűek (etilén-glikol, glicerin). Ha az OH aromás gyűrűhöz kapcsolódik, **fenol** a neve – ez jóval savasabb (pKₐ ≈ 10), mint az alkoholok (pKₐ ≈ 16–18), mert a fenolátion rezonanciával stabilizálódik.\n\nAz alkoholok reakciói:\n\n- **sav–bázis**: gyenge savak; Na-mal alkoholát + H₂;\n- **oxidáció**: primer → aldehid → karbonsav; szekunder → keton; tercier alkohol nem oxidálható könnyen (nincs H a karbinol-szénen);\n- **szubsztitúció**: HX-szel alkil-halogenid (az OH⁻ rossz, a protonált H₂O jó távozó csoport);\n- **dehidratálás**: alkén (elimináció) vagy éter (két molekula között);\n- **észteresítés** karbonsavval.\n\n**Éterek**: az O–C kötés poláris, de nincs O–H, ezért a molekulák között nincs hidrogénkötés; vízzel viszont akceptorként képezhetnek. Kémiailag meglehetősen inertek, ezért jó oldószerek (dietil-éter, THF). Tömény HI vagy HBr hasítja őket. A gyűrűs **epoxidok** a gyűrűfeszültség miatt nagyon reakcióképesek. A **koronaéterek** fémionokat kötnek meg.',
        example: 'Etanol (C₂H₆O) forráspontja 78 °C, a vele izomer dimetil-éteré −24 °C – a különbséget a hidrogénkötés adja. Etanol oxidációja a szervezetben: etanol → acetaldehid (alkohol-dehidrogenáz) → ecetsav. Propán-2-ol + K₂Cr₂O₇/H⁺ → aceton.',
        pitfall: 'Az alkoholok vizes oldata gyakorlatilag semleges: az etanol gyengébb sav a víznél, nem disszociál mérhetően. A fenol nem alkohol a szó szoros értelmében: a sav–bázis és oxidációs viselkedése eltér.',
        related: ['karbonil', 'karbonsav-eszter', 'eliminacio', 'sn1', 'sn2', 'szenhidrat'] },
      { id: 'karbonil', term: 'Aldehidek és ketonok (karbonilvegyületek)', en: 'aldehydes and ketones (carbonyl compounds)', topic: 'heteroatom',
        short: 'A karbonilcsoportot (C=O) tartalmazó vegyületek: aldehidben a karbonil-szénhez legalább egy H kapcsolódik (R–CHO), ketonban két szénhidrogén-csoport (R–CO–R′). Jellemző reakciójuk a nukleofil addíció a poláris C=O kötésre.',
        prereq: ['kemia-bsc/elektronegativitas', 'kemia-bsc/redoxi'],
        text: 'A C=O kötés erősen poláris: a szén δ+ (elektrofil), az oxigén δ− és két nemkötő elektronpárral bázikus. A karbonil-szén sp², a csoport sík, 120°-os szögekkel.\n\n**Nukleofil addíció**: a nukleofil a karbonil-szénhez kapcsolódik, az oxigén alkoxiddá, majd protonálva OH-vá alakul:\n\n- H₂O → hidrát (geminális diol);\n- alkohol → **félacetál**, majd savkatalízissel **acetál** (a cukrok gyűrűzárása félacetál-képzés!);\n- HCN → cianohidrin;\n- Grignard-reagens (RMgX) → alkohol új C–C kötéssel;\n- hidrid (NaBH₄, LiAlH₄) → redukció alkohollá;\n- primer amin → **imin** (Schiff-bázis), a biokémiában gyakori.\n\nAz **aldehidek reakcióképesebbek** a ketonoknál (kisebb térgátlás, egy elektronküldő alkillal kevesebb), és könnyen **oxidálhatók** karbonsavvá. Ezen alapulnak a kimutatási próbák: **Tollens-próba** (ezüsttükör), **Fehling-próba** (vörös Cu₂O csapadék).\n\nAz α-szénatom H-jai savasak (pKₐ ≈ 19–20), mert az **enolát** rezonanciával stabilizálódik → **keto–enol tautoméria**, **aldolreakció** (C–C kötés kialakítása).',
        example: 'Formaldehid (metanal): vizes oldata a formalin, fertőtlenítő, műgyanták alapanyaga. Aceton: oldószer, a szervezetben ketontestként is keletkezik. Glükóz + Fehling-oldat → Cu₂O (vörös csapadék), mert nyílt láncú formája aldehid.',
        pitfall: 'A ketonok a Tollens- és Fehling-próbát nem adják (kivétel: az α-hidroxi-ketonok, pl. a fruktóz, amelyek lúgos közegben aldehiddé izomerizálódhatnak). A karbonil-oxigén nem nukleofil támadáspont az addícióban: a nukleofil a **szenet** támadja.',
        related: ['alkohol-eter', 'karbonsav-eszter', 'szenhidrat', 'funkcios-csoport', 'amin-amid'] },
      { id: 'karbonsav-eszter', term: 'Karbonsavak és észterek', en: 'carboxylic acids and esters', topic: 'heteroatom',
        short: 'A karbonsavak karboxilcsoportot (–COOH) tartalmaznak, gyenge savak (pKₐ ≈ 4–5). Alkoholokkal savkatalizált, megfordítható reakcióban észterekké (R–COO–R′) alakulnak; az észterek lúgos hidrolízise az elszappanosítás.',
        prereq: ['kemia-bsc/pka', 'kemia-bsc/egyensulyi-allando', 'kemia-bsc/le-chatelier'],
        text: '**Karbonsavak**: a karboxilátion (R–COO⁻) negatív töltése a két oxigén között **delokalizált** (rezonancia), ezért a karbonsavak sokkal savasabbak az alkoholoknál. Elektronszívó szubsztituens (pl. Cl az α-szénen) növeli a savasságot: ecetsav pKₐ 4,76, klórecetsav 2,86, triklórecetsav 0,65. Erős hidrogénkötéseik miatt gőzfázisban is dimereket alkotnak, forráspontjuk magas.\n\nA **karbonsav-származékok** reakcióképessége (nukleofil acil-szubsztitúcióban): savklorid > anhidrid > észter > amid > karboxilát. A reakció **addíció–elimináció** mechanizmusú: a nukleofil a karbonil-szénhez kapcsolódik (tetraéderes köztitermék), majd a távozó csoport kilép.\n\n**Észteresítés** (Fischer):\n\n`R–COOH + R′–OH ⇌ R–COO–R′ + H₂O`  (H⁺ katalízis)\n\nEgyensúlyi reakció (K ≈ 4), a hozam a Le Chatelier-elv alapján javítható (alkoholfelesleg, víz eltávolítása).\n\n**Hidrolízis**: savas közegben megfordítható; lúgos közegben (**elszappanosítás**) teljes, mert a karboxilát már nem reagál vissza.\n\nAz észterek jellegzetes, gyakran gyümölcsillatú vegyületek (aromaanyagok); a zsírok és olajok a glicerin zsírsav-észterei, a poliészterek (PET) műanyagok.',
        example: 'Ecetsav + etanol ⇌ etil-acetát + víz, K ≈ 4. Ekvimoláris kiindulásnál: `x²/(1 − x)² = 4` → `x = 2/3` → **67%-os** átalakulás. 0,10 M ecetsav pH-ja: `pH ≈ ½·(4,76 − lg 0,10) ≈ 2,88`. Etil-acetát moláris tömege: 88,1 g/mol.',
        pitfall: 'A karbonsavak OH-ja nem viselkedik alkoholos OH-ként: a karboxilcsoport egységes funkciós csoport. A Fischer-észteresítésnél a vízmolekula oxigénje a **savból** származik (izotópjelzéssel igazolták), nem az alkoholból.',
        related: ['alkohol-eter', 'karbonil', 'lipid', 'polimer', 'amin-amid', 'aminosav'] },
      { id: 'amin-amid', term: 'Aminok és amidok', en: 'amines and amides', topic: 'heteroatom',
        short: 'Az aminok az ammónia szerves származékai (R–NH₂, R₂NH, R₃N): nemkötő elektronpárjuk miatt bázisok és nukleofilek. Az amidokban a nitrogén karbonilcsoporthoz kötődik (R–CO–NR′₂): a delokalizáció miatt gyakorlatilag nem bázisosak, és nagyon stabilak – ilyen a peptidkötés is.',
        prereq: ['kemia-bsc/pka', 'kemia-bsc/puffer'],
        text: '**Aminok** rendűsége a N-hez kapcsolódó szénatomok száma szerint: primer (RNH₂), szekunder (R₂NH), tercier (R₃N); négy csoporttal **kvaterner ammóniumsó** (R₄N⁺). A N sp³, a molekula trigonális piramis alakú.\n\n**Bázicitás** – a konjugált sav pKₐ-jával (pK_aH) jellemezzük, nagyobb érték erősebb bázist jelent:\n\n- alkil-aminok pK_aH ≈ 10–11 (erősebb bázisok az ammóniánál, 9,25 – az alkilcsoportok elektronküldők);\n- **anilin** pK_aH ≈ 4,6 – a N párja delokalizálódik a benzolgyűrűre;\n- **amidok** pK_aH ≈ −0,5 – a pár a C=O csoporttal konjugált.\n\nAz aminok **nukleofilként** alkileződnek (SN2), karbonilvegyületekkel **iminné**, savszármazékokkal **amiddá** alakulnak. Savval vízoldható sót képeznek – a gyógyszereket gyakran hidroklorid-só formájában forgalmazzák.\n\n**Amidok**: a C–N kötés **részleges kettőskötés-jellegű** (rezonancia: O=C–N ↔ ⁻O–C=N⁺), ezért rövidebb (≈ 133 pm) a szokásosnál, sík és nem forog szabadon. Az amidok hidrolízise lassú, erős sav vagy lúg és melegítés, élő szervezetben enzimek (proteázok) kellenek hozzá. A primer és szekunder amidok erős hidrogénkötéseket képeznek – ez adja a fehérjék másodlagos szerkezetét és a poliamidok (nylon, kevlár) szilárdságát.',
        example: 'Metil-amin pK_aH = 10,64; 0,1 M oldatának pH-ja ≈ 11,8. Anilin pK_aH = 4,6: 10¹⁰-szer kevésbé bázisos az alkil-aminoknál. Acetamid, CH₃CONH₂: vízben semleges kémhatású. Gly-Ala dipeptid moláris tömege: `75,07 + 89,09 − 18,02 = 146,14` g/mol.',
        pitfall: 'Az amid nem amin, hanem karbonsav-származék: a nitrogén nem bázikus és gyenge nukleofil. Az aminok rendűsége (a N szubsztituenseinek száma) más, mint az alkoholoké (ott a karbinol-szén szubsztituenseit számoljuk): a terc-butil-amin primer amin.',
        related: ['peptidkotes', 'aminosav', 'karbonsav-eszter', 'karbonil', 'polimer', 'nukleotid'] },

      /* ----- Biomolekulák és polimerek ----- */
      { id: 'szenhidrat', term: 'Szénhidrátok', en: 'carbohydrates (saccharides)', topic: 'bio',
        short: 'Polihidroxi-aldehidek (aldózok) vagy -ketonok (ketózok), illetve ezek kondenzációs termékei, általános képletük gyakran Cₙ(H₂O)ₙ. Monoszacharidok (glükóz, fruktóz), diszacharidok (szacharóz, laktóz) és poliszacharidok (keményítő, cellulóz, glikogén).',
        prereq: ['modell:sejt', 'lecke:biologia/sejt'],
        text: 'A **monoszacharidok** vízben a nyílt láncú forma és a gyűrűs **félacetál** forma egyensúlyában vannak: az egyik OH-csoport a karbonil-szénre addícionálódik. A glükóz főként hattagú gyűrűs (**piranóz**) alakban, a fruktóz részben ötös (**furanóz**) gyűrűben fordul elő.\n\nA gyűrűzáráskor a karbonil-szénből új kiralitáscentrum, az **anomer szénatom** keletkezik: **α** és **β** anomer. Vízben az anomerek egymásba alakulnak (**mutarotáció**): a glükóz egyensúlyi elegye kb. 36% α és 64% β.\n\nKonfiguráció: a **D/L** jelölés a karbonilcsoporttól legtávolabbi kiralitáscentrum alapján (Fischer-projekció) – a természetes cukrok D-sorúak.\n\n**Glikozidos kötés**: egy cukor anomer OH-ja egy másik molekula OH-jával (víz kilépésével) acetált képez.\n\n- **szacharóz**: glükóz + fruktóz (α1→β2), **nem redukáló** (mindkét anomer szén lekötött);\n- **laktóz**, **maltóz**: redukáló diszacharidok;\n- **keményítő** (amilóz, amilopektin) és **glikogén**: α-1,4 (és α-1,6 elágazás) kötések – energiatárolás;\n- **cellulóz**: β-1,4 kötések, egyenes láncok, hidrogénkötéses rostok – vázanyag; az emberi emésztőenzimek nem bontják.\n\nAz élettani jelentőség: energiaforrás (glükóz-oxidáció), szerkezeti anyag, sejtfelszíni felismerés (glikoproteinek, vércsoport-antigének), nukleinsavak cukorkomponense (ribóz, dezoxiribóz).',
        example: 'Mutarotáció: α-D-glükóz [α] = +112,2°, β-D-glükóz +18,7°. Egyensúlyban `0,36·112,2 + 0,64·18,7 ≈ 52,4°` – a mért érték +52,7°. A D-glükóz 4 kiralitáscentruma miatt 2⁴ = 16 aldohexóz sztereoizomer létezik (8 D és 8 L).',
        pitfall: 'A keményítő és a cellulóz egyaránt glükózpolimer – csak a glikozidos kötés konfigurációja (α vagy β) tér el, mégis egészen más a tulajdonságuk. A „szénhidrát” név félrevezető: nem a szén hidrátjai, a víz nem molekulaként van bennük.',
        formulas: ['fajlagos-forgatas-f'],
        related: ['karbonil', 'alkohol-eter', 'kiralitas', 'izomeria', 'nukleotid', 'polimer'],
        models: ['sejt'] },
      { id: 'aminosav', term: 'Aminosavak', en: 'amino acids', topic: 'bio',
        short: 'Amino- és karboxilcsoportot egyaránt tartalmazó vegyületek. A fehérjéket felépítő 20 α-aminosavban mindkét csoport ugyanahhoz a szénatomhoz kapcsolódik; oldalláncuk (R) szabja meg tulajdonságaikat. Vizes oldatban ikerionként vannak jelen.',
        prereq: ['kemia-bsc/puffer', 'kemia-bsc/pka', 'modell:sejt'],
        text: 'Általános szerkezet: H₂N–CH(R)–COOH. A glicin (R = H) kivételével az α-szén kiralitáscentrum; a fehérjealkotó aminosavak **L-konfigurációjúak** (CIP szerint a cisztein kivételével S).\n\n**Ikerion** (zwitterion): semleges pH közelében a karboxilcsoport deprotonált, az aminocsoport protonált: ⁺H₃N–CH(R)–COO⁻. Ezért az aminosavak sószerű, magas olvadáspontú (bomlás 200 °C fölött), vízben jól oldódó kristályos anyagok.\n\nA pH függvényében:\n\n- erősen savas közegben: kation (⁺H₃N–CHR–COOH);\n- az **izoelektromos ponton** (pI): ikerion, nettó töltés nulla;\n- lúgos közegben: anion (H₂N–CHR–COO⁻).\n\nAz oldalláncok szerinti csoportosítás: **apoláris** (Ala, Val, Leu, Ile, Phe, Met, Pro, Trp), **poláris semleges** (Ser, Thr, Asn, Gln, Cys, Tyr), **savas** (Asp, Glu), **bázikus** (Lys, Arg, His). A hisztidin oldallánca (pKₐ ≈ 6) fiziológiás pH-n pufferként és enzimek aktív centrumában működik.\n\nAz ember számára 9 aminosav **esszenciális** (a táplálékkal kell bevinni). Az aminosavak a fehérjék építőkövei mellett neurotranszmitterek (glutamát, GABA) és hormonok előanyagai.',
        example: 'Glicin: pKₐ₁ = 2,34, pKₐ₂ = 9,60 → `pI = 5,97`. pH 2,34-en a glicin fele kation, fele ikerion; pH 7,4-en szinte teljesen ikerion. Lizin: `pI = (8,95 + 10,53)/2 = 9,74`, ezért pH 7-en pozitív töltésű, elektroforézisben a katód felé vándorol.',
        pitfall: 'Az aminosav „semleges” pH-ja nem 7: az izoelektromos pont aminosavanként eltér (Asp ≈ 2,8, Arg ≈ 10,8). A semleges töltés nem azt jelenti, hogy nincsenek töltött csoportok – az ikerionban kettő is van.',
        formulas: ['pi-f'],
        related: ['peptidkotes', 'amin-amid', 'karbonsav-eszter', 'kiralitas', 'r-s'],
        models: ['sejt'] },
      { id: 'peptidkotes', term: 'Peptidkötés és fehérjék', en: 'peptide bond; proteins', topic: 'bio',
        short: 'Két aminosav között, az egyik karboxil- és a másik aminocsoportjából víz kilépésével kialakuló amidkötés (–CO–NH–). Aminosavak ezzel összekapcsolt láncai a peptidek, a nagy, meghatározott térszerkezetű polipeptidek a fehérjék.',
        prereq: ['modell:sejt', 'modell:dns', 'kemia-bsc/intermolekularis'],
        visual: skPep, caption: 'Két aminosav kondenzációja: az első aminosav OH-ja és a második aminocsoportjának egy H-ja vízként lép ki. A peptidcsoport (zöld keret) sík és merev.',
        text: 'A peptidkötés **amidkötés**; a C–N kötés részleges kettőskötés-jellege miatt a peptidcsoport hat atomja (Cα, C, O, N, H, Cα) egy síkban van, és szinte mindig **transz** konfigurációjú. A lánc rugalmasságát csak a Cα körüli két kötés elfordulása (φ, ψ szögek) adja.\n\nA peptidlánc irányított: **N-terminális** (szabad aminocsoport) → **C-terminális** (szabad karboxilcsoport); a sorrendet ebben az irányban írjuk (pl. Gly-Ala ≠ Ala-Gly).\n\nA **fehérjék szerkezeti szintjei**:\n\n- **elsődleges**: az aminosav-sorrend (a génben kódolva);\n- **másodlagos**: α-hélix és β-redő a gerinc C=O és N–H csoportjai közötti hidrogénkötésekkel;\n- **harmadlagos**: a teljes lánc térszerkezete (hidrofób kölcsönhatás, H-kötés, ionos kötés, diszulfidhidak);\n- **negyedleges**: több alegység kapcsolódása (pl. hemoglobin: 4 lánc).\n\nA szerkezet szabja meg a funkciót (enzim, transzport, szerkezeti, jelátviteli, immunfehérjék). **Denaturáció** (hő, pH, nehézfémsók, szerves oldószerek) a másod-, harmad- és negyedleges szerkezetet bontja, a peptidkötéseket nem.\n\nA sejtben a peptidkötés a **riboszómán** képződik, a mRNS kódja szerint; a reakció energiáját a tRNS-hez kapcsolt aktivált aminosav (észter) adja.',
        example: '20-féle aminosavból `20³ = 8000` különböző tripeptid képezhető, egy 100 aminosavas fehérjénél 20¹⁰⁰ ≈ 10¹³⁰ sorrend lehetséges. Gly + Ala → Gly-Ala + H₂O; moláris tömeg `75,07 + 89,09 − 18,02 = 146,14` g/mol. Egy 300 aminosavas fehérje moláris tömege ≈ 300·110 ≈ 33 000 g/mol (33 kDa).',
        pitfall: 'A peptidkötés C–N kötése nem forog szabadon (részleges kettős kötés), a gerinc többi kötése igen. A denaturált fehérje aminosav-sorrendje változatlan – csak a térszerkezet bomlik fel (a főtt tojás fehérjéje is ugyanazokból a láncokból áll).',
        related: ['aminosav', 'amin-amid', 'polimer', 'nukleotid', 'karbonsav-eszter'],
        models: ['sejt', 'dns'] },
      { id: 'lipid', term: 'Lipidek', en: 'lipids', topic: 'bio',
        short: 'Vízben rosszul, apoláris oldószerekben jól oldódó biomolekulák változatos csoportja: zsírok és olajok (triacil-glicerinek), foszfolipidek, szteroidok (koleszterin), viaszok. Energiatárolók, sejthártya-alkotók és jelmolekulák.',
        prereq: ['modell:sejt', 'kemia-bsc/intermolekularis'],
        text: '**Zsírsavak**: hosszú (jellemzően 12–20 C, páros szénatomszámú), el nem ágazó láncú karbonsavak. **Telített** (palmitinsav C16, sztearinsav C18) vagy **telítetlen** (olajsav C18:1, linolsav C18:2) – a természetes telítetlen zsírsavak kettős kötései **cisz** állásúak, ami „megtöri” a láncot, és csökkenti az olvadáspontot.\n\n**Triacil-glicerinek** (zsírok, olajok): a glicerin három zsírsavval képzett észterei. Szobahőmérsékleten szilárdak (zsírok, főként telített) vagy folyékonyak (olajok, főként telítetlen). Az olajok katalitikus hidrogénezése (margaringyártás) mellékreakcióként **transz-zsírsavakat** is adhat.\n\n**Elszappanosítás**: lúgos hidrolízis → glicerin + zsírsav-sók (**szappanok**). A szappan amfipatikus: apoláris „farok” és ionos „fej” – vízben micellákat képez, és így oldja a zsíros szennyeződést.\n\n**Foszfolipidek**: glicerin + két zsírsav + foszfátcsoport (+ poláris fej, pl. kolin). Amfipatikus jellegük miatt vízben spontán **lipid kettősréteget** alkotnak – ez a sejthártya alapja (a hidrofób hatás hajtja, entrópiavezérelten).\n\n**Szteroidok**: négy kondenzált gyűrűből álló váz – koleszterin (membrán-alkotó, a hormonok előanyaga), nemi hormonok, kortizol, D-vitamin, epesavak.',
        example: 'Tristearin (M = 891,5 g/mol) elszappanosításához 3 mol KOH kell: az **elszappanosítási szám** `3·56,11·1000/891,5 ≈ 189` mg KOH/g zsír. Olvadáspontok: sztearinsav (C18:0) 69 °C, olajsav (C18:1 cisz) 13 °C. A zsírok energiatartalma ≈ 37 kJ/g, a szénhidrátoké és fehérjéké ≈ 17 kJ/g.',
        pitfall: 'A lipidek nem egy funkciós csoport szerint, hanem oldhatóságuk alapján alkotnak csoportot – a koleszterin például nem észter és nem zsírsav. A sejthártya kettősrétegét nem kovalens kötések, hanem a hidrofób hatás tartja össze.',
        related: ['karbonsav-eszter', 'alkenek', 'izomeria', 'gyokos', 'szenhidrat'],
        models: ['sejt'] },
      { id: 'nukleotid', term: 'Nukleotidok és nukleinsavak', en: 'nucleotides; nucleic acids', topic: 'bio',
        short: 'A nukleotid egy nitrogéntartalmú heterociklusos bázisból, egy pentózból (ribóz vagy 2-dezoxiribóz) és egy vagy több foszfátcsoportból áll. Foszfodiészter-kötésekkel összekapcsolódva nukleinsavakat (DNS, RNS) alkotnak; az ATP a sejt energiavalutája.',
        prereq: ['modell:dns', 'lecke:biologia/genetika'],
        text: '**Bázisok** – aromás heterociklusok:\n\n- **purinok** (kettős gyűrű): adenin (A), guanin (G);\n- **pirimidinek** (egy gyűrű): citozin (C), timin (T, csak DNS-ben), uracil (U, csak RNS-ben).\n\n**Nukleozid** = bázis + cukor (N-glikozidos kötés az 1′-szénen); **nukleotid** = nukleozid + foszfát (az 5′-OH észtereként).\n\nA nukleinsav gerince a cukor–foszfát lánc: a **foszfodiészter-kötés** az egyik nukleotid 3′-OH-ja és a következő 5′-foszfátja között jön létre. A lánc irányított (5′ → 3′), és a foszfátok miatt fiziológiás pH-n erősen **negatív töltésű**.\n\nA **DNS kettős hélix** (Watson–Crick, 1953): két ellentétes irányú (antiparallel) lánc, a bázisok a hélix belsejében **komplementer párokat** alkotnak hidrogénkötésekkel: A=T (2 H-kötés), G≡C (3 H-kötés). A szerkezetet a bázisok közötti **stacking** (halmozási) kölcsönhatás is stabilizálja. A G–C-ben gazdag DNS olvadási hőmérséklete magasabb.\n\nAz **RNS** egyszálú, 2′-OH-ja miatt kémiailag kevésbé stabil (a 2′-OH intramolekulárisan hasíthatja a gerincet).\n\nEgyéb szerepek: **ATP** (adenozin-trifoszfát; a foszfoanhidrid-kötések hidrolízise ΔG°′ ≈ −30,5 kJ/mol), NAD⁺, FAD, koenzim-A, cAMP (másodlagos hírvivő).',
        example: 'Chargaff-szabály: ha egy kettős szálú DNS-ben az adenin aránya 30%, akkor T = 30%, G = C = 20%. Egy 1000 bázispáros DNS-szakasz moláris tömege ≈ 1000·650 ≈ 650 000 g/mol. Az emberi genom kb. 3,1·10⁹ bázispár.',
        pitfall: 'A „nukleozid” és a „nukleotid” nem szinonima: a nukleozidból hiányzik a foszfát. A DNS nevében a „dezoxi” a 2′-szénatomról hiányzó oxigénre utal, nem az egész cukorról.',
        related: ['aromas', 'szenhidrat', 'peptidkotes', 'amin-amid', 'polimer'],
        models: ['dns', 'sejt'] },
      { id: 'polimer', term: 'Polimerizáció, polikondenzáció és műanyagok', en: 'polymerization, polycondensation and plastics', topic: 'bio',
        short: 'A polimerek sok ismétlődő egységből (monomerből) felépülő makromolekulák. Addíciós (lánc-) polimerizációban telítetlen monomerek kapcsolódnak melléktermék nélkül (PE, PP, PVC); polikondenzációban kétfunkciós monomerek kis molekula (víz) kilépésével (poliészterek, poliamidok).',
        prereq: ['lecke:kemia/szerves-elektrokemia'],
        visual: skPoly, caption: 'Fent: az etén addíciós polimerizációja polietilénné – az ismétlődő egység a kék szakasz. Lent: polikondenzáció – a sav- és diolegységek között minden kötésnél egy vízmolekula lép ki.',
        text: '**Láncpolimerizáció** (addíciós): egy iniciátor (gyök, kation, anion vagy fémkomplex-katalizátor) aktív láncvéget hoz létre, amelyhez a monomerek gyorsan, egyesével kapcsolódnak. Már a reakció elején hosszú láncok keletkeznek. Példák:\n\n- **polietilén** (PE): fóliák, palackok; LDPE (elágazó, gyökös, nagynyomású) és HDPE (lineáris, Ziegler–Natta-katalizátor);\n- **polipropilén** (PP), **polivinil-klorid** (PVC), **polisztirol** (PS), **teflon** (PTFE), **PMMA** (plexi).\n\n**Lépcsős polimerizáció** (polikondenzáció): bármely két funkciós csoport reagálhat egymással; a lánchossz lassan nő, hosszú láncok csak nagyon nagy konverziónál keletkeznek (Carothers-egyenlet). Példák:\n\n- **poliészterek**: PET (tereftálsav + etilén-glikol) – italos palack, textilszál;\n- **poliamidok**: nylon-6,6 (adipinsav + hexametilén-diamin), aramidok (kevlár);\n- **poliuretánok**, fenolgyanták, polikarbonátok.\n\nA biopolimerek (fehérjék, poliszacharidok, nukleinsavak) mind kondenzációs típusúak.\n\nSzerkezet és tulajdonság: a **hőre lágyuló** (termoplasztikus) polimerek lineáris vagy elágazó láncúak, újraolvaszthatók; a **hőre keményedők** térhálósak, nem olvaszthatók; az **elasztomerek** enyhén térhálósak, rugalmasak (gumi vulkanizálása). Fontos jellemző a kristályosság és az üvegesedési hőmérséklet (T_g).\n\nKörnyezeti szempontok: a legtöbb szintetikus polimer biológiailag nehezen bomlik; a mechanikai és kémiai újrahasznosítás, valamint a biológiailag lebomló polimerek (PLA) fejlesztése ezért kiemelt terület.',
        example: 'Polietilén M_n = 280 000 g/mol → `DP = 280 000/28,05 ≈ 10⁴` etilénegység. PET-szintézisnél 99%-os konverzió esetén `X_n = 1/(1 − 0,99) = 100`, 99,5%-osnál 200 – ezért kell a monomereket pontosan 1 : 1 arányban adagolni. PVC: a monomer (vinil-klorid, CH₂=CHCl) moláris tömege 62,5 g/mol.',
        pitfall: 'A „műanyag” nem egyetlen anyag: a PE és a PET kémiailag teljesen eltér, ezért külön kell gyűjteni őket újrahasznosításhoz. A polikondenzáció nem „lassabb polimerizáció”, hanem más mechanizmus: itt a monomerek gyorsan elfogynak, de a hosszú láncok csak a végén alakulnak ki.',
        formulas: ['polimerizacios-fok-f'],
        related: ['alkenek', 'gyokos', 'karbonsav-eszter', 'amin-amid', 'peptidkotes', 'szenhidrat'] },
      /* ----- Szerkezetmeghatározás és elválasztás ----- */
      { id: 'ir-spektroszkopia', term: 'Infravörös (IR) spektroszkópia', en: 'infrared spectroscopy', topic: 'spektro',
        short: 'A molekulák kötései meghatározott frekvenciákon rezegnek; az ezekkel egyező energiájú infravörös fényt elnyelik. Az IR-színkép jellegzetes sávjaiból a funkciós csoportok azonosíthatók.',
        prereq: ['kemia-bsc/spektroszkopia', 'kemia-bsc/intermolekularis'],
        formulas: ['ir-f'],
        text: 'Az IR-színkép vízszintes tengelye a **hullámszám** (ν̃, jellemzően 4000–400 cm⁻¹), függőleges tengelye az áteresztés; az elnyelési sávok „lefelé” mutatnak. Egy rezgés akkor IR-aktív, ha közben a molekula **dipólusmomentuma változik** – ezért erősek a poláris kötések (C=O, O–H) sávjai, és ezért nem ad IR-sávot a N₂ vagy az O₂.\n\nA legfontosabb tartományok:\n\n- **3200–3550 cm⁻¹**: O–H (alkohol; hidrogénkötés miatt széles, lekerekített sáv); N–H 3300–3500 (primer amin: két csúcs);\n- **2500–3300 cm⁻¹**: karbonsav O–H, nagyon széles;\n- **≈ 3300** (≡C–H), **3000–3100** (=C–H, aromás C–H), **2850–2960** (alkil C–H) – a 3000 cm⁻¹ jó választóvonal a telített és a telítetlen C–H között;\n- **2100–2260**: C≡C és C≡N;\n- **1650–1800**: **C=O**, a színkép legerősebb, legmegbízhatóbb sávja: észter ≈ 1735–1750, aldehid ≈ 1725 (plusz két gyenge C–H sáv 2720 és 2820 körül), keton ≈ 1715, karbonsav ≈ 1710, amid ≈ 1650–1690;\n- **1600–1680**: C=C; aromás gyűrű ≈ 1600 és 1500;\n- **1500 alatt**: az **ujjlenyomat-tartomány**, sok csatolt rezgéssel – egyedi az adott molekulára, összevetésre jó, egyedi sávok kijelölésére kevésbé.\n\nKonjugáció (C=C vagy aromás gyűrű a C=O mellett) gyengíti a kettős kötést, így kb. 20–30 cm⁻¹-rel csökkenti a C=O hullámszámát.\n\nAz IR gyors, olcsó, kevés mintát igényel; **mit tartalmaz** a molekula (funkciós csoportok), azt jól mutatja, a teljes szerkezetet azonban az NMR adja meg.',
        example: 'Egy C₃H₆O összegképletű ismeretlen anyagnak erős sávja van 1715 cm⁻¹-nél, és nincs sávja 2720 cm⁻¹ körül, sem 3200–3550 között → keton, tehát **aceton** (propanon), nem propanal (aldehid) és nem allil-alkohol. A DBE = 1 is egyetlen C=O kötéssel összhangban van.',
        pitfall: 'A sáv hiánya gyakran beszédesebb, mint a jelenléte: ha nincs erős elnyelés 1650–1800 cm⁻¹ között, nincs C=O. A minta nedvessége (víz) széles O–H sávot ad, és alkoholt „színlelhet”. Az ujjlenyomat-tartomány egyes sávjait ne próbáld egyenként funkciós csoporthoz rendelni.',
        related: ['nmr-spektroszkopia', 'tomegspektrometria', 'funkcios-csoport', 'karbonil', 'alkohol-eter'] },
      { id: 'nmr-spektroszkopia', term: 'NMR-spektroszkópia (¹H és ¹³C)', en: 'nuclear magnetic resonance (NMR) spectroscopy', topic: 'spektro',
        short: 'Erős mágneses térben a ¹H és ¹³C atommagok spinállapotai között rádiófrekvenciás átmenetek gerjeszthetők. A jelek helye (kémiai eltolódás), területe (integrál) és felhasadása (csatolás) együtt a molekula szénvázát és a hidrogének környezetét mutatja meg.',
        prereq: ['kemia-bsc/spektroszkopia', 'kemia-bsc/elektronegativitas'],
        formulas: ['nmr-f'],
        text: 'A páratlan spinű magok (¹H, ¹³C, ¹⁹F, ³¹P) mágneses térben két energiaszintre hasadnak; a köztük lévő különbség a rádiófrekvenciás tartományba esik. A mag körüli elektronfelhő **árnyékolja** a külső teret, ezért a különböző kémiai környezetű magok kissé eltérő frekvencián rezonálnak.\n\nAz ¹H-NMR spektrum négy információja:\n\n1. **Jelek száma**: hányféle kémiailag nem egyenértékű H van.\n2. **Kémiai eltolódás (δ)**: elektronszívó szomszéd (O, N, halogén, C=O) **leárnyékol**, nagyobb δ felé tol. Tájékoztató értékek: alkil-H 0,9–1,5; C=O vagy aromás gyűrű melletti CH 2–2,5; O–CH 3,3–4,5; vinil-H 4,5–6,5; aromás H 6,5–8; aldehid-H 9–10; karbonsav-OH 10–13 ppm.\n3. **Integrál**: a jel alatti terület az adott H-ok **számával** arányos.\n4. **Spin–spin csatolás**: n egyenértékű szomszédos (három kötésnyire lévő) H a jelet **n + 1** csúcsra hasítja (dublett, triplett, kvartett), a csúcsok intenzitásaránya a Pascal-háromszög szerint alakul. Az egymással csatoló jelek csatolási állandója (J, Hz) azonos.\n\nAz O–H és N–H protonok gyorsan cserélődnek, jelük gyakran széles szingulett, változó helyű; D₂O-val összerázva eltűnik.\n\nA **¹³C-NMR** (a szén 1,1%-a ¹³C) a különböző szénatomokat mutatja, 0–220 ppm-es tartományban; a C=O szén 160–220 ppm-nél van. Rutinszerűen protonlecsatolva mérik, ezért minden szén egyetlen csúcs.\n\nAz NMR ugyanazon a fizikai elven működik, mint az orvosi MRI (ott a víz protonjainak jelét képezik le).',
        example: 'Etil-acetát, CH₃–CO–O–CH₂–CH₃ ¹H-NMR: δ 2,0 (szingulett, 3H, acetil-CH₃ – nincs szomszédos H), 4,1 (kvartett, 2H, O–CH₂ – három szomszédos H, az O leárnyékol), 1,3 (triplett, 3H, CH₂ melletti CH₃); a kvartett és a triplett J ≈ 7 Hz-cel csatol. Integrálarány 3 : 2 : 3.',
        pitfall: 'Az n + 1 szabály csak **egyenértékű** szomszédokra és elsőrendű spektrumra igaz; különböző szomszédok esetén a felhasadások szorzódnak (például dublettek dublettje). Az egyenértékű H-ok egymással nem okoznak felhasadást: az etán vagy a benzol egyetlen szingulettet ad.',
        related: ['ir-spektroszkopia', 'tomegspektrometria', 'kiralitas', 'aromas', 'alkohol-eter'] },
      { id: 'tomegspektrometria', term: 'Tömegspektrometria (MS)', en: 'mass spectrometry', topic: 'spektro',
        short: 'A tömegspektrometria a molekulákat ionizálja, majd az ionokat tömeg/töltés (m/z) arányuk szerint szétválasztja és megszámolja. A molekulaion a moláris tömeget, a fragmensek és az izotópmintázat a szerkezet részleteit árulja el.',
        prereq: ['kemia-bsc/ionizacios-energia', 'fizika-bsc/lorentz-ero'],
        text: 'A műszer három fő része:\n\n- **ionforrás**: klasszikusan **elektronütközéses ionizáció** (EI, 70 eV-os elektronok), amely egy elektront kilökve **molekulaiont** (M⁺•, gyökkation) hoz létre, és sokféle fragmentációt okoz; kíméletesebb módszerek (elektrospray, ESI; MALDI) nagy biomolekulákat is épen hagynak, ezek jellemzően [M+H]⁺ iont adnak;\n- **analizátor**: az ionokat m/z szerint választja szét (mágneses tér, kvadrupól, repülési idő, ioncsapda);\n- **detektor**.\n\nA színképben a vízszintes tengely az m/z, a függőleges a relatív gyakoriság. A legnagyobb csúcs a **báziscsúcs** (100%).\n\nÉrtelmezési fogások:\n\n- **molekulaion** → moláris tömeg; **nitrogénszabály**: páratlan molekulatömeg páratlan számú N-atomra utal;\n- **izotópmintázat**: a klór ³⁵Cl : ³⁷Cl ≈ 3 : 1, a bróm ⁷⁹Br : ⁸¹Br ≈ 1 : 1 arányú M és M+2 csúcspárt ad; a ¹³C miatt az M+1 csúcs kb. 1,1%-a a szénatomszámnak;\n- **fragmensek**: a molekula a legstabilabb kationt adó helyeken hasad – tercier vagy benzilkation, **acíliumion** (R–C≡O⁺), heteroatom melletti α-hasítás; m/z 91 (C₇H₇⁺, tropíliumion) benzilcsoportra jellemző, m/z 43 gyakran CH₃CO⁺ vagy C₃H₇⁺.\n\n**Nagy felbontású MS** (HRMS) a tömeget négy-öt tizedesjegyre méri, és ebből egyértelmű **összegképlet** adódik: a CO (27,9949) és az N₂ (28,0061) is megkülönböztethető, holott névleges tömegük egyaránt 28.\n\nGáz- vagy folyadékkromatográffal kapcsolva (GC–MS, LC–MS) a keverékek komponenseit egyenként azonosítja – ez a doppingvizsgálat, a környezetanalitika és a proteomika alapja.',
        example: 'Brómetán, C₂H₅Br: két közel egyforma csúcs m/z 108 és 110-nél (⁷⁹Br és ⁸¹Br), valamint m/z 29 (C₂H₅⁺, a C–Br kötés hasadása). Egy klórtartalmú vegyület M : M+2 aránya kb. 3 : 1. Aceton (M = 58): báziscsúcs m/z 43, a CH₃CO⁺ acíliumion.',
        pitfall: 'A legnagyobb csúcs (báziscsúcs) **nem** mindig a molekulaion: sok vegyületnél (például alkoholoknál, elágazó alkánoknál) a molekulaion gyenge vagy hiányzik. A tömegspektrometria tömeget mér, nem kapcsolódási sorrendet: izomereket gyakran csak a fragmentáció vagy más módszer (NMR) különböztet meg.',
        related: ['nmr-spektroszkopia', 'ir-spektroszkopia', 'kromatografia', 'reaktiv-intermedier'] },
      { id: 'kromatografia', term: 'Kromatográfia és elválasztási módszerek', en: 'chromatography; separation and purification', topic: 'spektro',
        short: 'A kromatográfia a keverék komponenseit aszerint választja szét, hogy milyen erősen kötődnek egy álló fázishoz, miközben a mozgó fázis (oldószer vagy gáz) végigsodorja őket. Mellette a desztilláció, az extrakció és az átkristályosítás a szerves kémia alapvető tisztítási módszerei.',
        prereq: ['kemia-bsc/intermolekularis', 'kemia-bsc/egyensulyi-allando'],
        formulas: ['rf-f'],
        text: 'Elve: a komponensek folyamatosan **megoszlanak** az álló és a mozgó fázis között (egyensúly, megoszlási hányados). Ami erősebben kötődik az álló fázishoz, az lassabban halad. Az első kromatográfiás elválasztást Mihail Cvet orosz botanikus végezte az 1900-as évek elején növényi színanyagokkal – innen a név („színírás”).\n\nFő változatok:\n\n- **vékonyréteg-kromatográfia (VRK, TLC)**: szilikagél-réteg lemezen; gyors reakciókövetésre és tisztaságvizsgálatra, jellemzője az **Rf**;\n- **oszlopkromatográfia**: szilikagéllel töltött oszlopon preparatív tisztítás;\n- **gázkromatográfia (GC)**: illékony anyagok, gáz a mozgó fázis, a forráspont és a polaritás dönt;\n- **nagyhatékonyságú folyadékkromatográfia (HPLC)**: nagy nyomással, finom szemcséjű töltettel; leggyakoribb a **fordított fázisú** változat (apoláris C18 álló fázis, víz–acetonitril vagy víz–metanol eluens), ahol a poláris anyagok érnek ki elsőként;\n- **királis kromatográfia**: enantiomerek elválasztása királis álló fázison.\n\nA kromatogramon minden komponens egy csúcs; a **retenciós idő** azonosít, a csúcs területe mennyiséget mér.\n\nKlasszikus tisztítási módszerek:\n\n- **desztilláció**: forráspont-különbség alapján (frakcionált desztilláció közeli forráspontoknál, vákuumdesztilláció hőérzékeny anyagokra);\n- **extrakció**: két nem elegyedő oldószer között; savas vagy bázikus vegyületek pH-változtatással vihetők át a vizes fázisba (sav–bázis extrakció);\n- **átkristályosítás**: forrón oldjuk, lehűtve a tiszta anyag kristályosodik, a szennyezés oldatban marad; tisztaságát az éles **olvadáspont** jelzi.',
        example: 'Benzoesav és naftalin keveréke éterben: NaHCO₃-oldattal kirázva a benzoesav nátrium-benzoátként a vizes fázisba kerül, a naftalin az éterben marad. A vizes fázist megsavanyítva a benzoesav kicsapódik. Egy VRK-lemezen a fenol (poláris) Rf-je hexán–etil-acetát eluenssel kisebb, mint a toluolé.',
        pitfall: 'Ha a VRK-n egyetlen foltot látsz, az még nem bizonyítja a tisztaságot: két anyag Rf-je véletlenül egybeeshet – próbálj ki másik eluenst is. A fordított fázisú HPLC-n a polaritási sorrend **megfordul** a szilikagélhez képest.',
        related: ['tomegspektrometria', 'kiralitas', 'szerves-savassag', 'funkcios-csoport'] },
      /* ----- Reakciómechanizmusok (kiegészítés) ----- */
      { id: 'rezonancia', term: 'Rezonancia és elektroneffektusok (induktív, mezomer)', en: 'resonance; inductive and mesomeric effects', topic: 'mechanizmus',
        short: 'Ha egy molekula elektronszerkezete egyetlen vegyértékvonalas képlettel nem írható le, több határszerkezet „keverékeként” ábrázoljuk (rezonancia). A szubsztituensek σ-kötéseken át (induktív effektus) és π-rendszeren át (mezomer effektus) tolják el az elektronsűrűséget.',
        prereq: ['kemia-bsc/elektronegativitas', 'kemia-bsc/molekulapalya'],
        text: '**Rezonancia** (mezoméria): a valódi szerkezet a határszerkezetek **súlyozott átlaga**; a molekula nem „ugrál” közöttük. A határszerkezetekben csak az elektronok (π-kötések, nemkötő párok) helye különbözik, az atomoké soha. A jelölés kétfejű nyíl (↔), nem egyensúlyi nyíl.\n\nSzabályok a határszerkezetek súlyához: kedvezőbb, ha\n\n- minden atomnak teljes oktettje van;\n- kevesebb a töltésszétválás;\n- a negatív töltés az elektronegatívabb atomon van.\n\nA delokalizáció **stabilizál**: a töltés vagy a π-elektronok nagyobb térben oszlanak el. Ezért stabil a karboxilátion, az allil- és benzilkation, a benzol.\n\n**Induktív effektus** (I): az elektronegativitás-különbség miatti polarizáció a σ-kötések mentén, a távolsággal gyorsan csökken (2–3 kötés után alig érezhető).\n\n- −I (elektronszívó): halogének, –OH, –NO₂, –C=O, –NR₃⁺;\n- +I (elektronküldő): alkilcsoportok, –O⁻.\n\n**Mezomer effektus** (M): a π-rendszerrel konjugált csoportok elektronátadása vagy -elvonása.\n\n- +M (elektronküldő): nemkötő párral rendelkező atomok: –OH, –OR, –NH₂, halogének;\n- −M (elektronszívó): π-kötéssel elektronegatív atomhoz kötött csoportok: –NO₂, –C=O, –C≡N, –SO₃H.\n\nA két hatás ellentétes is lehet: az –OH erősen −I, de még erősebben +M, ezért aromás gyűrűt aktivál; a halogéneknél a −I a nagyobb, ezért dezaktiválnak, mégis orto/para irányítók (a +M a köztitermék kationt stabilizálja).',
        example: 'Az acetátion két C–O kötése egyforma hosszú (≈ 127 pm), a C–O és a C=O között – a negatív töltés a két oxigén között megoszlik. Az amidok C–N kötése részleges kettőskötés-jellegű (N nemkötő párjának delokalizációja): ezért sík a peptidcsoport, és ezért alig bázikus az amid-nitrogén.',
        pitfall: 'A határszerkezetek **nem** léteznek külön-külön, és nem is alakulnak egymásba – a rezonancia nem tautoméria (ott atom, H vándorol). A „+M” és „−I” nem összeadandó számok: hogy melyik dominál, azt kísérlet (pKₐ, reakciósebesség) dönti el.',
        related: ['aromas', 'sear', 'szerves-savassag', 'reaktiv-intermedier', 'karbonsav-eszter', 'peptidkotes'] },
      { id: 'szerves-savassag', term: 'Savasság és bázicitás szerves vegyületekben', en: 'acidity and basicity of organic compounds', topic: 'mechanizmus',
        short: 'Egy szerves sav annál erősebb (pKₐ annál kisebb), minél stabilabb a proton leadása után keletkező konjugált bázis. Ezt négy tényező szabja meg: melyik atomon van a negatív töltés, rezonancia, induktív hatás és a pálya hibridizációja.',
        prereq: ['kemia-bsc/pka', 'kemia-bsc/sav-bazis-elmeletek'],
        text: 'A stabilitást befolyásoló tényezők, nagyjából fontossági sorrendben:\n\n1. **Atom**: egy perióduson belül az elektronegativitás dönt (C–H < N–H < O–H < F–H savasság); egy csoporton belül az atomméret (HF < HCl < HBr < HI – a nagyobb ionon a töltés jobban szétoszlik).\n2. **Rezonancia**: ha a negatív töltés delokalizálódhat, a sav erősebb. Etanol pKₐ ≈ 16, fenol ≈ 10 (a fenoxidion töltése a gyűrűre is kiterjed), ecetsav ≈ 4,8 (két egyenértékű oxigén).\n3. **Induktív hatás**: közeli elektronszívó csoport stabilizálja az aniont: ecetsav 4,76, klórecetsav 2,86, triklórecetsav 0,65.\n4. **Hibridizáció (pálya)**: minél nagyobb az s-jelleg, annál közelebb van a maghoz az elektronpár: etán ≈ 50, etén ≈ 44, etin ≈ 25.\n\n**Bázicitást** a konjugált sav pKₐ-jával (pKₐH) adjuk meg: minél nagyobb, annál erősebb a bázis. Ammónia 9,25; metil-amin 10,6 (+I hatás); anilin 4,6 (a N nemkötő párja a gyűrűvel konjugál); piridin 5,2 (sp² N); amid ≈ −0,5 (gyakorlatilag nem bázikus).\n\n**Sav–bázis egyensúly iránya**: a reakció a **gyengébb sav** (nagyobb pKₐ) képződése felé tolódik; `K = 10^(pKₐ(termék sav) − pKₐ(kiindulási sav))`.\n\nGyakorlati következmények: a gyógyszerek ionizáltsága a pH-tól függ (felszívódás, oldhatóság); a sav–bázis extrakció; a megfelelő bázis kiválasztása egy deprotonáláshoz (a bázis konjugált savának pKₐ-ja nagyobb legyen, mint a deprotonálandó vegyületé).',
        example: 'Ecetsav + NaHCO₃: a szénsav pKₐ-ja 6,35, az ecetsavé 4,76 → `K = 10^(6,35 − 4,76) ≈ 39`, a reakció lejátszódik (pezsgés). Fenol (pKₐ 10) + NaHCO₃: `K = 10^(6,35 − 10) ≈ 2·10⁻⁴` – a fenol nem oldódik szódabikarbóna-oldatban, NaOH-ban (víz pKₐ ≈ 15,7) viszont igen. Így választható szét a benzoesav és a fenol.',
        pitfall: 'Erős bázis nem azonos a jó nukleofillel: a terc-butoxid erős bázis, de térigényes, ezért gyenge nukleofil. A pKₐ-értékek oldószerfüggők; a vízben mért (illetve becsült) értékek nem vihetők át változatlanul DMSO-ra vagy gázfázisra.',
        related: ['rezonancia', 'karbonsav-eszter', 'amin-amid', 'alkohol-eter', 'kromatografia', 'enolat-aldol'] },
      { id: 'reaktiv-intermedier', term: 'Reaktív köztitermékek (karbokation, karbanion, gyök)', en: 'reactive intermediates: carbocations, carbanions, radicals', topic: 'mechanizmus',
        short: 'A többlépéses reakciókban rövid életű, nagy energiájú köztitermékek keletkeznek: elektronhiányos karbokationok, elektronfelesleges karbanionok és párosítatlan elektronú gyökök. Stabilitásuk dönti el, merre és milyen gyorsan halad a reakció.',
        prereq: ['kemia-bsc/aktivalasi-energia', 'kemia-bsc/hibridizacio'],
        text: '**Karbokation** (R₃C⁺): sp², sík, üres p-pályával; hat elektronja van, elektrofil. Stabilitás: **tercier > szekunder > primer > metil**, mert az alkilcsoportok a szomszédos C–H kötések elektronjaival stabilizálnak (hiperkonjugáció, +I). Az **allil- és benzilkation** rezonanciával is stabilizált. A karbokationok **átrendeződhetnek**: 1,2-hidrid- vagy 1,2-alkilvándorlással stabilabb kationná alakulnak. SN1, E1, elektrofil addíció és Friedel–Crafts-alkilezés köztiterméke.\n\n**Karbanion** (R₃C:⁻): nemkötő elektronpárral, nukleofil és bázikus. Stabilitási sorrend fordított: metil > primer > szekunder > tercier; nagyon stabilizálja a szomszédos C=O vagy C≡N (enolát, rezonancia) és a nagy s-jelleg (acetilidion). A Grignard-reagensek és az enolátok karbanion-jellegű nukleofilek.\n\n**Gyök** (R₃C•): hét vegyértékelektron, párosítatlan elektronnal; semleges, de elektronhiányos. Stabilitás: tercier > szekunder > primer > metil (ugyanaz, mint a kationoké), allil- és benzilgyök különösen stabil. Ezt a C–H kötések disszociációs energiája tükrözi: CH₃–H ≈ 439, primer ≈ 423, szekunder ≈ 413, tercier ≈ 404 kJ/mol.\n\n**Karbének** (R₂C:): semleges, két nemkötő elektronú szén, ciklopropánképzésben fontos.\n\n**Hammond-posztulátum**: egy endoterm lépés átmeneti állapota szerkezetében és energiájában a (magas energiájú) köztitermékhez hasonlít. Ezért ami stabilizálja a köztiterméket, az csökkenti az odavezető lépés aktiválási energiáját is – így magyarázható a Markovnyikov-szabály és az SN1 szubsztrátsorrendje.',
        example: '3,3-Dimetilbután-2-ol + HBr: a vízvesztés után keletkező szekunder kation **metilvándorlással** tercier kationná rendeződik át, így a fő termék a 2-bróm-2,3-dimetilbután, nem a „várt” 2-bróm-3,3-dimetilbután. Propán gyökös brómozásakor a szekunder gyök stabilabb, ezért a 2-brómpropán a fő termék (≈ 97%).',
        pitfall: 'A köztitermék és az átmeneti állapot nem ugyanaz: a köztitermék energiaminimum (elvileg kimutatható), az átmeneti állapot energiamaximum, élettartama nincs. Primer karbokation oldatban gyakorlatilag nem képződik – a primer szubsztrátok SN2-vel vagy E2-vel reagálnak.',
        related: ['sn1', 'eliminacio', 'elektrofil-addicio', 'gyokos', 'rezonancia', 'konjugalt-dien'] },
      { id: 'konjugalt-dien', term: 'Konjugált diének; kinetikai és termodinamikai kontroll', en: 'conjugated dienes; kinetic vs thermodynamic control', topic: 'szenhidrogen',
        short: 'A konjugált diénekben a két C=C kettős kötést egyetlen egyes kötés választja el, ezért π-rendszerük delokalizált. Elektrofil addíciónál 1,2- és 1,4-termék keletkezhet; alacsony hőmérsékleten a gyorsabban képződő (kinetikai), magasabbon a stabilabb (termodinamikai) termék dominál.',
        prereq: ['kemia-bsc/molekulapalya', 'kemia-bsc/aktivalasi-energia'],
        text: 'A buta-1,3-dién négy p-pályája egyetlen, négy centrumra kiterjedő π-rendszert alkot. A konjugáció **stabilizál** (a hidrogénezési hő kisebb, mint két izolált kettős kötésé), a C2–C3 kötés pedig rövidebb egy közönséges egyes kötésnél. A molekula főleg két konformációban van: s-transz (stabilabb) és s-cisz (ez kell a Diels–Alder-reakcióhoz).\n\n**Elektrofil addíció** (pl. HBr): a proton a terminális szénre lép, és **allilkation** keletkezik, amelynek pozitív töltése a C2 és C4 atomon oszlik meg. A bromid mindkét helyre beléphet:\n\n- **1,2-addíció**: 3-brómbut-1-én;\n- **1,4-addíció** (konjugált addíció): 1-brómbut-2-én.\n\n**Kinetikai kontroll** (alacsony hőmérséklet, irreverzibilis körülmények): a termékarányt az aktiválási energiák aránya szabja meg; az 1,2-termék gyorsabban képződik (a bromid a töltéshez és a távozó ionpárhoz közelebbi C2-t támadja).\n\n**Termodinamikai kontroll** (magasabb hőmérséklet, reverzibilis reakció, elegendő idő): beáll az egyensúly, és a stabilabb termék dominál – az 1,4-termék belső, kétszeresen szubsztituált kettős kötése stabilabb.\n\nAz elv általános: ha két termék közül az egyik gyorsabban képződik, a másik pedig stabilabb, a körülmények (hőmérséklet, idő, reverzibilitás) választanak közöttük.\n\nA konjugáció a **színt** is befolyásolja: minél hosszabb a konjugált rendszer, annál kisebb a HOMO–LUMO energiakülönbség, annál nagyobb hullámhosszon nyel el a molekula (buta-1,3-dién ≈ 217 nm az UV-ben; a 11 konjugált kettős kötést tartalmazó β-karotin a kék fényt nyeli el, ezért narancssárga).',
        example: 'Buta-1,3-dién + HBr: 0 °C-on kb. **71 : 29** az 1,2- és 1,4-termék aránya, 40 °C-on kb. **15 : 85**. Ha a 0 °C-on kapott elegyet HBr jelenlétében melegítjük, az arány lassan a 15 : 85 felé tolódik – bizonyíték, hogy magasabb hőmérsékleten a termékek egymásba alakulnak.',
        pitfall: 'A „kinetikai termék” nem feltétlenül instabil, csak **gyorsabban** képződik; a „termodinamikai termék” lassabban, de alacsonyabb energiájú. Kumulált (C=C=C, allének) és izolált diének nem mutatnak 1,4-addíciót – ehhez konjugáció kell.',
        related: ['alkenek', 'elektrofil-addicio', 'reaktiv-intermedier', 'diels-alder', 'rezonancia'] },
      /* ----- Oxigén- és nitrogéntartalmú vegyületek (kiegészítés) ----- */
      { id: 'acil-szubsztitucio', term: 'Nukleofil acil-szubsztitúció (karbonsav-származékok)', en: 'nucleophilic acyl substitution', topic: 'heteroatom',
        short: 'A karbonsav-származékok (savklorid, anhidrid, észter, amid) jellemző reakciója: a nukleofil a karbonil-szénhez kapcsolódik, tetraéderes köztitermék keletkezik, majd a távozó csoport kilép, és visszaáll a C=O. Az eredmény egy másik karbonsav-származék.',
        prereq: ['kemia-bsc/pka'],
        text: 'Mechanizmus: **addíció–elimináció**.\n\n1. A nukleofil (víz, alkohol, amin, hidroxid) megtámadja a δ+ karbonil-szenet; a π-elektronok az oxigénre kerülnek → **tetraéderes köztitermék** (sp³ szén).\n2. Az oxigén elektronpárja visszaalakítja a C=O kötést, és kilép a **távozó csoport** (Cl⁻, karboxilát, alkoxid, amid).\n\nSav katalizálhatja (a protonált C=O elektrofilebb), bázis pedig a nukleofilt teheti erősebbé.\n\n**Reakcióképességi sorrend**: savklorid > savanhidrid > észter (tioészter az észternél reaktívabb) > amid > karboxilátion.\n\nKét tényező magyarázza:\n\n- a **távozó csoport** minősége: annál jobb, minél gyengébb bázis, azaz minél erősebb a konjugált sava (HCl pKₐ ≈ −7, karbonsav ≈ 4,8, alkohol ≈ 16, amin ≈ 38);\n- a **rezonancia**: a szomszédos heteroatom nemkötő párja (az amidban a N a legerősebben) stabilizálja a C=O-t és csökkenti a karbonil-szén elektrofilitását.\n\nEbből szabály következik: egy származék **reaktívabból kevésbé reaktívvá** alakítható közvetlenül („lefelé a lépcsőn”): savkloridból észter és amid, észterből amid; fordítva nem.\n\nA biokémia ugyanezt a logikát követi: a sejt **aktivált acilszármazékokat** használ – tioésztereket (acetil-KoA), acil-foszfátokat, aminoacil-tRNS-észtereket –, mert a karbonsav maga nem elég reaktív. A peptidkötés amidként olyan stabil, hogy hidrolíziséhez enzimek (proteázok) kellenek.',
        example: 'Aszpirin előállítása: szalicilsav + ecetsavanhidrid → acetilszalicilsav + ecetsav (a fenolos OH a nukleofil, az acetátion a távozó csoport). Nejlon-6,6 laborszintézise: hexándioil-diklorid + hexán-1,6-diamin → poliamid + HCl (gyors, a két fázis határán).',
        pitfall: 'Aldehidek és ketonok **nem** adnak acil-szubsztitúciót: nincs megfelelő távozó csoportjuk (H⁻ és R⁻ nagyon rossz távozó csoport), ezért náluk nukleofil addíció történik. Az észter lúgos hidrolízise nem katalitikus: a hidroxid elfogy (karboxiláttá alakul).',
        related: ['karbonsav-eszter', 'amin-amid', 'peptidkotes', 'karbonil', 'polimer', 'szerves-savassag'] },
      { id: 'szerves-redox', term: 'Oxidáció és redukció a szerves kémiában', en: 'oxidation and reduction in organic chemistry', topic: 'heteroatom',
        short: 'Szerves vegyületben oxidáció, ha a szénatom több kötést létesít oxigénnel (vagy más elektronegatív atommal), illetve kevesebbet hidrogénnel; redukció a fordítottja. Az oxidációs fokok sora: alkán < alkohol < aldehid, keton < karbonsav < CO₂.',
        prereq: ['kemia-bsc/redoxi'],
        text: 'Gyakorlati számolás: minden C–O, C–N, C–halogén kötés +1, minden C–H kötés −1 az adott szén oxidációs számához (C–C 0). Metán −4, metanol −2, formaldehid 0, hangyasav +2, CO₂ +4.\n\n**Alkoholok oxidációja**:\n\n- **primer** alkohol → aldehid (enyhe oxidálószerrel, például piridínium-klórkromát, PCC, vízmentesen), erős vizes oxidálószerrel (K₂Cr₂O₇/H₂SO₄, KMnO₄) tovább karbonsav;\n- **szekunder** alkohol → keton;\n- **tercier** alkohol enyhe körülmények között nem oxidálódik (nincs H a karbinol-szénen).\n\nAz aldehidek könnyen tovább oxidálódnak – ezen alapul a Tollens- és a Fehling-próba.\n\n**Redukciók**:\n\n- **katalitikus hidrogénezés** (H₂, Pd/Pt/Ni): C=C, C≡C → alkán; **Lindlar-katalizátorral** alkin → **cisz**-alkén; Na/folyékony NH₃-val alkin → **transz**-alkén;\n- **komplex fémhidridek** (H⁻-donorok): **NaBH₄** enyhe, aldehidet és ketont alkohollá redukál, észtert általában nem; **LiAlH₄** erős, észtert és karbonsavat is primer alkohollá, amidot aminná redukál (vízmentes közegben);\n- C=C **oxidatív hasítása**: ózonolízis (aldehidek/ketonok), forró KMnO₄; diol képzése hideg, híg KMnO₄-tal vagy OsO₄-dal; **epoxidálás** persavval.\n\n**Biokémiai megfelelők**: a NAD⁺/NADH koenzimpár hidridiont ad át vagy vesz fel – a NaBH₄ „biológiai rokona”. Az alkohol-dehidrogenáz az etanolt acetaldehiddé, az aldehid-dehidrogenáz ecetsavvá oxidálja. A zsírsavak lebontása és a citrátkör lépései is szerves redoxireakciók.',
        example: 'Régi alkoholszondák: a narancssárga dikromát (Cr +6) az etanolt acetaldehiddé/ecetsavvá oxidálja, maga zöld Cr³⁺-ná redukálódik – a színváltozás mértéke az alkoholtartalommal arányos. Ciklohexanon + NaBH₄ → ciklohexanol; etil-benzoát + LiAlH₄ → benzil-alkohol (+ etanol).',
        pitfall: 'A „hidrogénfelvétel = redukció” és „oxigénfelvétel = oxidáció” szabály jó kiindulás, de nem minden: HBr addíciója alkénre egyik szénen oxidáció, a másikon redukció, összességében nem redoxireakció. A LiAlH₄ vízzel hevesen reagál – sosem használható vizes vagy alkoholos oldatban.',
        related: ['alkohol-eter', 'karbonil', 'karbonsav-eszter', 'alkenek', 'alkinek', 'femorganikus'] },
      /* ----- Szintézis ----- */
      { id: 'enolat-aldol', term: 'Enolátok, aldol- és Claisen-kondenzáció', en: 'enolates; aldol reaction; Claisen condensation', topic: 'szintezis',
        short: 'A karbonilvegyületek α-szénatomján lévő hidrogén savas, bázissal eltávolítható; a keletkező enolát rezonancia-stabilizált szénnukleofil. Ha egy másik karbonilvegyületet támad, új C–C kötés jön létre: ez az aldolreakció (aldehidekre, ketonokra) és a Claisen-kondenzáció (észterekre).',
        prereq: ['kemia-bsc/pka', 'kemia-bsc/egyensulyi-allando'],
        text: '**Savasság**: aldehidek, ketonok α-H-ja pKₐ ≈ 17–20, észtereké ≈ 25, β-dikarbonil-vegyületeké (két C=O között) ≈ 9–13. Az **enolátion** negatív töltése a szén és az oxigén között delokalizált; a szénen reagálva C–C kötést képez.\n\n- Hidroxiddal vagy alkoxiddal csak kis egyensúlyi enolátkoncentráció keletkezik;\n- erős, térigényes bázissal (például LDA, lítium-diizopropilamid; konjugált sav pKₐ ≈ 36) teljes és szabályozott az enolátképzés.\n\n**Aldoladdíció**: az enolát nukleofil addícióval egy másik karbonilvegyület C=O-jára lép, β-hidroxi-karbonil-vegyület (**aldol**) keletkezik. Melegítéssel vízvesztés történik (**aldolkondenzáció**), és α,β-telítetlen karbonilvegyület lesz, amelyet konjugáció stabilizál.\n\n**Vegyes (keresztezett) aldol**: akkor tiszta, ha az egyik partnernek nincs α-H-ja (benzaldehid, formaldehid), így csak elektrofil lehet (Claisen–Schmidt-reakció).\n\n**Claisen-kondenzáció**: észterenolát egy másik észtert acilez (nukleofil acil-szubsztitúció), **β-ketoészter** keletkezik. A hajtóerő, hogy a termék savas α-H-ját a bázis deprotonálja – ezért egy teljes ekvivalens bázis kell.\n\nKapcsolódó reakciók: **Michael-addíció** (enolát 1,4-addíciója α,β-telítetlen karbonilvegyületre), **Robinson-anellálás** (Michael + intramolekuláris aldol, gyűrűépítés), alkilezés alkil-halogeniddel.\n\n**Biokémia**: a glikolízis aldoláz enzime a fruktóz-1,6-biszfoszfátot retro-aldolreakcióval bontja két triózra; a citrátkör első lépése (citrát-szintáz) és a zsírsavszintézis is enolát-típusú C–C kötésképzés.',
        example: 'Két acetaldehid NaOH-dal: 3-hidroxibutanal (aldol), melegítve but-2-enál (krotonaldehid) + víz. Benzaldehid + aceton bázissal: (E)-4-fenilbut-3-én-2-on (benzálaceton); benzaldehid-felesleggel dibenzálaceton. Etil-acetát + NaOEt → etil-acetoacetát (acetecetészter) + etanol.',
        pitfall: 'Két különböző, egyaránt enolizálható karbonilvegyület vegyes aldolja **négy** termék keverékét adhatja – ezért kell olyan partner, amelynek nincs α-H-ja, vagy előre, kvantitatívan képzett enolát. Az alkoxid bázis egyezzen az észter alkoxicsoportjával, különben átészterezés történik.',
        related: ['karbonil', 'karbonsav-eszter', 'acil-szubsztitucio', 'szerves-savassag', 'femorganikus', 'retroszintezis'] },
      { id: 'femorganikus', term: 'Fémorganikus reagensek (Grignard-reagens)', en: 'organometallic reagents; Grignard reagents', topic: 'szintezis',
        short: 'A fémorganikus vegyületekben szén–fém kötés van; mivel a fém elektropozitív, a szén részlegesen negatív, erős nukleofil és erős bázis. A Grignard-reagens (R–MgX) karbonilvegyületekre addícionálva új C–C kötést és alkoholt ad.',
        prereq: ['kemia-bsc/elektronegativitas'],
        text: '**Előállítás**: alkil- vagy aril-halogenid + magnéziumforgács **vízmentes** éterben (dietil-éter, THF): `R–X + Mg → R–MgX`. Az éter oxigénje koordinálja és stabilizálja a magnéziumot. Victor Grignard 1912-ben kémiai Nobel-díjat kapott a felfedezésért.\n\nA C–Mg kötés poláris (C ≈ 2,55, Mg ≈ 1,31 elektronegativitás), a reagens úgy viselkedik, mint egy **karbanion**: a szén „polaritása megfordul” (a halogénezett szén elektrofil volt, a Grignard-szén nukleofil).\n\n**Reakciók karbonilvegyületekkel** (savas feldolgozás után):\n\n- formaldehid → **primer** alkohol (egy szénnel hosszabb lánc);\n- egyéb aldehid → **szekunder** alkohol;\n- keton → **tercier** alkohol;\n- **észter** → tercier alkohol, mert két ekvivalens reagál (a köztes keton reaktívabb az észternél);\n- **CO₂** → karbonsav;\n- epoxid → alkohol (két szénnel hosszabb lánc).\n\n**Erős bázis**: minden savas hidrogént (víz, alkohol, karbonsav, amin N–H, terminális alkin) azonnal deprotonál, maga alkánná alakul. Ezért a reagens és a szubsztrát sem tartalmazhat OH-, NH- vagy COOH-csoportot (illetve ezeket védeni kell).\n\nRokon reagensek: **szerves lítiumvegyületek** (RLi, még reaktívabbak); **kuprátok** (R₂CuLi, Gilman-reagensek): lágyabb nukleofilek, α,β-telítetlen ketonokra **1,4-addícióval** lépnek. Az átmenetifém-katalizált **keresztkapcsolások** (Suzuki-, Heck-, Negishi-reakció; Nobel-díj 2010) a modern C–C kötésképzés alapjai, a gyógyszeripar egyik legfontosabb eszközei.',
        example: 'Brómbenzol + Mg → fenil-magnézium-bromid; ezt szárazjégre öntve, majd megsavanyítva **benzoesav** keletkezik. Metil-magnézium-bromid + aceton → savas feldolgozás után **2-metilpropán-2-ol** (terc-butanol). Ha a lombik nedves volt, a fenil-Grignardból benzol lesz.',
        pitfall: 'A legtöbb sikertelen Grignard-reakció oka a **nedvesség**: egy csepp víz elbontja a reagenst. Hidroxicsoportot tartalmazó halogenidből (pl. 4-brómbutan-1-ol) közvetlenül nem készíthető Grignard-reagens – az OH-t előbb védőcsoporttal kell blokkolni.',
        related: ['karbonil', 'alkohol-eter', 'szerves-savassag', 'reaktiv-intermedier', 'retroszintezis', 'szerves-redox'] },
      { id: 'diels-alder', term: 'Diels–Alder-reakció (periciklusos reakciók)', en: 'Diels–Alder reaction; pericyclic reactions', topic: 'szintezis',
        short: 'Konjugált dién és egy alkén (dienofil) egyetlen, összehangolt lépésben hattagú gyűrűvé egyesül: két új σ-kötés és egy új π-kötés keletkezik. A [4+2] cikloaddíció sztereospecifikus, és egy lépésben két C–C kötést és akár négy sztereocentrumot épít ki.',
        prereq: ['kemia-bsc/molekulapalya'],
        text: 'Otto Diels és Kurt Alder írta le 1928-ban (Nobel-díj 1950). **Periciklusos** reakció: a kötések egy gyűrű alakú átmeneti állapotban, egyszerre (koncertikusan) alakulnak át, köztitermék nélkül – nincs ion vagy gyök.\n\nFeltételek és szabályok:\n\n- a diénnek **s-cisz** konformációt kell felvennie (a ciklopentadién eleve ilyen, ezért nagyon reaktív);\n- a reakció akkor gyors, ha a dién **elektronban gazdag** (alkil-, alkoxicsoport), a dienofil **elektronszegény** (C=O, C≡N, NO₂ a kettős kötésen) – a dién HOMO-ja és a dienofil LUMO-ja között kicsi az energiakülönbség (határpálya-elmélet);\n- **sztereospecifikus**: a dienofil geometriája megmarad – cisz-dienofilből cisz-szubsztituált, transz-ból transz-szubsztituált gyűrű lesz (szuprafaciális addíció mindkét komponensen);\n- **endo-szabály**: gyűrűs diénnél a dienofil elektronszívó csoportja a dién alá fordul az átmeneti állapotban (másodlagos pályakölcsönhatás), így többnyire az endo termék a kinetikai termék.\n\nA **Woodward–Hoffmann-szabályok** (pályaszimmetria megmaradása) magyarázzák, miért megy a [4+2] cikloaddíció melegítésre könnyen, a [2+2] (két alkénből ciklobután) viszont csak fény hatására.\n\nVisszafelé is lejátszódhat (**retro-Diels–Alder**) magas hőmérsékleten: a diciklopentadiént „krakkolva” állítják elő a ciklopentadiént.\n\nJelentőség: természetes anyagok (szteroidok, terpének) és gyógyszerek totálszintézise, mert hattagú gyűrűt építenek fel jól kiszámítható sztereokémiával.',
        example: 'Buta-1,3-dién + etén → ciklohexén (lassú, nagy hőmérséklet kell). Ciklopentadién + maleinsavanhidrid szobahőmérsékleten gyorsan és nagy hozammal adja az **endo** biciklusos anhidridet. Ciklopentadién önmagával is reagál: néhány óra alatt diciklopentadiénné dimerizálódik.',
        pitfall: 'Az s-transz rögzített diének (például ha egy gyűrű „kifelé” rögzíti a két kettős kötést) nem adnak Diels–Alder-reakciót. Az endo termék a gyorsabban képződő, de nem mindig a stabilabb: hosszú melegítés az exo termék felé tolhatja az elegyet (termodinamikai kontroll).',
        related: ['konjugalt-dien', 'alkenek', 'izomeria', 'retroszintezis', 'karbonil'] },
      { id: 'retroszintezis', term: 'Retroszintézis és szintézistervezés', en: 'retrosynthetic analysis; protecting groups', topic: 'szintezis',
        short: 'A retroszintetikus elemzés a célmolekulából visszafelé gondolkodik: képzeletben ismert reakcióknak megfelelő kötéseket bont (diszkonnekció), amíg egyszerű, beszerezhető kiindulási anyagokig nem jut. Ezután a szintézist előre, a valódi reakciókkal hajtjuk végre.',
        prereq: ['kemia-bsc/hess-tetel'],
        text: 'A módszert E. J. Corey rendszerezte (Nobel-díj 1990). Jelölése a **retroszintetikus nyíl** (⇒), amely „ebből készíthető” értelmű.\n\nFogalmak:\n\n- **diszkonnekció**: egy kötés gondolati elbontása, amely egy ismert reakció fordítottja;\n- **szinton**: az így kapott idealizált (gyakran töltéssel ábrázolt) részlet;\n- **szintetikus ekvivalens**: a valódi reagens, amely a szintonnak megfelel (például „R⁻” szinton → R–MgBr; „⁺CH₂OH” → formaldehid);\n- **funkciós csoport átalakítás (FGI)**: például alkohol ⇒ keton, hogy egy kedvező diszkonnekció elérhető legyen.\n\nJó diszkonnekciók: **heteroatom melletti** kötések (C–O, C–N: észter, amid, éter), és olyan C–C kötések, amelyek **megbízható reakcióknak** felelnek meg (Grignard-addíció, aldol, Diels–Alder, Wittig-reakció). Előnyös, ha a molekulát középen, nagyjából két egyforma részre bontja.\n\n**Védőcsoportok**: ha egy reagens a molekula több csoportjával is reagálna, az egyiket ideiglenesen blokkoljuk, majd a végén eltávolítjuk. Ketonhoz acetál, alkoholhoz szilil-éter, aminhoz karbamát (Boc). Minden védés és eltávolítás plusz két lépés, ezért a jó terv takarékos velük.\n\n**Lineáris és konvergens szintézis**: a lépésenkénti hozamok szorzódnak, ezért a hosszú lineáris sorozat gyorsan veszít. Konvergens tervben két részt külön állítunk elő, és csak a végén kapcsoljuk össze – a leghosszabb lineáris szakasz rövidebb.\n\nModern szempontok: atomhatékonyság (a reagensek atomjainak mekkora része kerül a termékbe), kevesebb hulladék, biztonságos oldószerek (**zöld kémia**).',
        example: 'Cél: 2-fenilbután-2-ol (tercier alkohol). Három lehetséges diszkonnekció a karbinol-szén körül: fenil-MgBr + bután-2-on; etil-MgBr + acetofenon; metil-MgBr + propiofenon. Hozamok: 10 lineáris lépés 90%-kal `0,9¹⁰ ≈ 35%`; ha két 5 lépéses ágat egy kapcsolással egyesítünk, a leghosszabb ág 6 lépés, `0,9⁶ ≈ 53%`.',
        pitfall: 'A retroszintézis „papírmunka”: minden diszkonnekciónak egy **valóban működő** reakciónak kell megfelelnie, a többi funkciós csoport jelenlétében is (kemoszelektivitás). Ne felejtsd el a sztereokémiát: ha a cél egy adott enantiomer, a tervnek ezt is biztosítania kell.',
        related: ['femorganikus', 'enolat-aldol', 'diels-alder', 'acil-szubsztitucio', 'szerves-redox', 'funkcios-csoport'] }
    ]
  });
})();
