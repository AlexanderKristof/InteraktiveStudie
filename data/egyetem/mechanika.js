/* Egyetem: Műszaki mechanika (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';
  var RED = '#e5484d', BLUE = '#2f7bf6', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6', GOLD = '#8a6d1f';

  /* ---------- rajzsegédek ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function frame(x0, x1, y0, y1, L, Tp, W, H) {
    return {
      X: function (x) { return r1(L + (x - x0) / (x1 - x0) * W); },
      Y: function (y) { return r1(Tp + (y1 - y) / (y1 - y0) * H); }
    };
  }
  function curve(fr, fn, a, b, n, ylo, yhi) {
    var d = '', pen = false;
    for (var i = 0; i <= n; i++) {
      var x = a + (b - a) * i / n, y = fn(x);
      if (!isFinite(y) || y < ylo || y > yhi) { pen = false; continue; }
      d += (pen ? 'L' : 'M') + fr.X(x) + ' ' + fr.Y(y) + ' ';
      pen = true;
    }
    return d;
  }
  function head(x, y, ang, col, s) {
    s = s || 9;
    return '<path d="M' + r1(x) + ' ' + r1(y) + ' L' + r1(x - s * Math.cos(ang - 0.4)) + ' ' + r1(y - s * Math.sin(ang - 0.4)) + ' L' + r1(x - s * Math.cos(ang + 0.4)) + ' ' + r1(y - s * Math.sin(ang + 0.4)) + ' z" fill="' + col + '"/>';
  }
  function arrow(x1, y1, x2, y2, col, w) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 2.5) + '"/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (cls || T) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  function ctxt(x, y, s, col, size, anchor, bold) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + (bold ? ' font-weight="700"' : '') + ' fill="' + col + '" style="font-family:var(--font)">' + s + '</text>';
  }
  function SUB(t) { return '<tspan dy="4" font-size="9">' + t + '</tspan><tspan dy="-4">\u200b</tspan>'; }
  function axes(xa, ya, xb, yb) { return arrow(xa, ya, xb, ya, 'var(--fg-2)', 1.5) + arrow(xa, ya, xa, yb, 'var(--fg-2)', 1.5); }
  // csukló és görgős támasz (a csúcs a megadott ponton van)
  function pin(x, y) {
    return '<path d="M' + x + ' ' + y + ' l-13 22 h26 z" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2"/><circle cx="' + x + '" cy="' + y + '" r="3.5" fill="var(--fg-2)"/>' +
      '<line x1="' + (x - 20) + '" y1="' + (y + 22) + '" x2="' + (x + 20) + '" y2="' + (y + 22) + '" stroke="var(--fg-2)" stroke-width="2"/>' + hatch(x - 20, y + 22, 40);
  }
  function roller(x, y) {
    return '<path d="M' + x + ' ' + y + ' l-13 18 h26 z" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2"/><circle cx="' + x + '" cy="' + y + '" r="3.5" fill="var(--fg-2)"/>' +
      '<circle cx="' + (x - 7) + '" cy="' + (y + 22) + '" r="4" fill="none" stroke="var(--fg-2)" stroke-width="1.8"/><circle cx="' + (x + 7) + '" cy="' + (y + 22) + '" r="4" fill="none" stroke="var(--fg-2)" stroke-width="1.8"/>' +
      '<line x1="' + (x - 20) + '" y1="' + (y + 26) + '" x2="' + (x + 20) + '" y2="' + (y + 26) + '" stroke="var(--fg-2)" stroke-width="2"/>' + hatch(x - 20, y + 26, 40);
  }
  function hatch(x, y, w) {
    var s = '';
    for (var i = 4; i <= w; i += 7) s += '<line x1="' + (x + i) + '" y1="' + y + '" x2="' + (x + i - 6) + '" y2="' + (y + 7) + '" stroke="var(--muted)" stroke-width="1.2"/>';
    return s;
  }
  function dim(x1, x2, y, label) {
    return '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="var(--muted)" stroke-width="1.2"/>' +
      '<line x1="' + x1 + '" y1="' + (y - 6) + '" x2="' + x1 + '" y2="' + (y + 6) + '" stroke="var(--muted)" stroke-width="1.2"/><line x1="' + x2 + '" y1="' + (y - 6) + '" x2="' + x2 + '" y2="' + (y + 6) + '" stroke="var(--muted)" stroke-width="1.2"/>' +
      txt((x1 + x2) / 2, y - 5, label, M, 12, 'middle');
  }
  function spring(x1, x2, y, n, amp) {
    var d = 'M' + x1 + ' ' + y + ' h12', step = (x2 - x1 - 24) / n;
    for (var i = 0; i < n; i++) d += ' l' + r1(step / 2) + ' ' + (i % 2 ? amp : -amp) + ' l' + r1(step / 2) + ' ' + (i % 2 ? -amp : amp);
    return '<path d="' + d + ' h12" fill="none" stroke="var(--fg-2)" stroke-width="2"/>';
  }

  /* ---------- 1. Erő nyomatéka: villáskulcs, erőkar ---------- */
  var nyO = [110, 120], nyP = [400, 120], nyD = [-0.5, 0.866], nyT = (nyO[0] - nyP[0]) * nyD[0] + (nyO[1] - nyP[1]) * nyD[1];
  var nyFoot = [nyP[0] + nyT * nyD[0], nyP[1] + nyT * nyD[1]];
  var nyomSvg = '<svg viewBox="0 0 560 290">' +
    '<path d="M' + nyO[0] + ' ' + (nyO[1] - 16) + ' L' + (nyP[0] + 20) + ' ' + (nyO[1] - 9) + ' a9 9 0 0 1 0 18 L' + nyO[0] + ' ' + (nyO[1] + 16) + ' z" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2"/>' +
    '<circle cx="' + nyO[0] + '" cy="' + nyO[1] + '" r="26" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2"/>' +
    '<path d="M' + (nyO[0] - 11) + ' ' + (nyO[1] - 6) + ' l11 -7 l11 7 v12 l-11 7 l-11 -7 z" fill="var(--line)" stroke="var(--fg-2)" stroke-width="1.5"/>' +
    '<circle cx="' + nyO[0] + '" cy="' + nyO[1] + '" r="3" fill="' + RED + '"/>' + txt(nyO[0] - 34, nyO[1] - 30, 'O (forgáspont)', M, 12) +
    '<line x1="' + r1(nyP[0] - 45 * nyD[0]) + '" y1="' + r1(nyP[1] - 45 * nyD[1]) + '" x2="' + r1(nyFoot[0] + 25 * nyD[0]) + '" y2="' + r1(nyFoot[1] + 25 * nyD[1]) + '" stroke="var(--muted)" stroke-dasharray="6 5" stroke-width="1.5"/>' +
    arrow(nyP[0], nyP[1], nyP[0] + 95 * nyD[0], nyP[1] + 95 * nyD[1], RED, 3.5) + ctxt(nyP[0] + 10, nyP[1] + 60, 'F', RED, 16, null, true) +
    '<line x1="' + nyO[0] + '" y1="' + nyO[1] + '" x2="' + r1(nyFoot[0]) + '" y2="' + r1(nyFoot[1]) + '" stroke="' + BLUE + '" stroke-width="2.5"/>' +
    '<path d="M' + r1(nyFoot[0] - 12 * nyD[0]) + ' ' + r1(nyFoot[1] - 12 * nyD[1]) + ' l' + r1(-12 * 0.866) + ' ' + r1(-12 * 0.5) + ' l' + r1(12 * nyD[0]) + ' ' + r1(12 * nyD[1]) + '" fill="none" stroke="' + BLUE + '" stroke-width="1.5"/>' +
    ctxt((nyO[0] + nyFoot[0]) / 2 - 22, (nyO[1] + nyFoot[1]) / 2 + 22, 'k (erőkar)', BLUE, 14, 'middle', true) +
    txt(nyFoot[0] + 20, nyFoot[1] - 6, 'az erő hatásvonala', M, 12) +
    txt(30, 30, 'M = F · k', T, 16, null, 'font-weight="700"') + txt(130, 30, 'k: a forgáspont merőleges távolsága a hatásvonaltól', M, 12) + '</svg>';

  /* ---------- 2. Szabadtest-ábra: láda a lejtőn ---------- */
  var lj = (function () {
    var a = Math.PI / 6, c = Math.cos(a), s = Math.sin(a), x0 = 40, y0 = 230, Lx = 330, top = y0 - Lx * Math.tan(a);
    var t = 0.5, px = x0 + Lx * t, py = y0 - Lx * t * Math.tan(a), nx = -s, ny = -c, cx = px + 22 * nx, cy = py + 22 * ny;
    var out = '<svg viewBox="0 0 560 260"><path d="M' + x0 + ' ' + y0 + ' L' + (x0 + Lx) + ' ' + y0 + ' L' + (x0 + Lx) + ' ' + r1(top) + ' z" fill="var(--line)" opacity=".55" stroke="var(--muted)" stroke-dasharray="5 4"/>' +
      txt(x0 + 62, y0 - 8, '30°', M, 12) + txt(x0 + Lx - 6, y0 + 18, 'a lejtőt „elvágjuk”', M, 11, 'end') +
      '<rect x="' + r1(cx - 32) + '" y="' + r1(cy - 22) + '" width="64" height="44" rx="3" fill="' + GOLD + '" opacity=".85" transform="rotate(-30 ' + r1(cx) + ' ' + r1(cy) + ')"/>' +
      '<circle cx="' + r1(cx) + '" cy="' + r1(cy) + '" r="3.5" fill="var(--fg)"/>' +
      arrow(cx, cy, cx, cy + 95, RED, 3) + ctxt(cx + 8, cy + 92, 'G = m·g', RED, 13, null, true) +
      arrow(px, py, px + 85 * nx, py + 85 * ny, BLUE, 3) + ctxt(px + 85 * nx - 6, py + 85 * ny - 6, 'N', BLUE, 15, 'end', true) +
      arrow(px + 14 * c, py - 14 * s, px + 14 * c + 70 * c, py - 14 * s - 70 * s, GREEN, 3) + ctxt(px + 84 * c + 4, py - 84 * s - 6, 'S', GREEN, 15, null, true) +
      arrow(cx, cy, cx - 47.5 * c, cy + 47.5 * s, RED, 1.6).replace('stroke-width="1.6"', 'stroke-width="1.6" stroke-dasharray="4 3"') +
      arrow(cx, cy, cx + 82.3 * s, cy + 82.3 * c, RED, 1.6).replace('stroke-width="1.6"', 'stroke-width="1.6" stroke-dasharray="4 3"') +
      '<path d="M' + r1(cx - 47.5 * c) + ' ' + r1(cy + 47.5 * s) + ' L' + r1(cx) + ' ' + r1(cy + 95) + ' L' + r1(cx + 82.3 * s) + ' ' + r1(cy + 82.3 * c) + '" fill="none" stroke="var(--muted)" stroke-dasharray="2 3"/>';
    out += txt(400, 70, 'Egyensúlyi egyenletek', T, 13, null, 'font-weight="700"') +
      txt(400, 94, 'lejtővel párhuzamosan:', M, 12) + txt(400, 112, 'S − G·sin 30° = 0', T, 13) +
      txt(400, 138, 'lejtőre merőlegesen:', M, 12) + txt(400, 156, 'N − G·cos 30° = 0', T, 13) +
      ctxt(400, 190, 'S: tapadási súrlódás', GREEN, 12) + ctxt(400, 208, 'N: nyomóerő (a lejtőre ⟂)', BLUE, 12) + txt(400, 226, 'szaggatott: G összetevői', M, 11) + '</svg>';
    return out;
  })();

  /* ---------- 3. Kéttámaszú tartó koncentrált erővel ---------- */
  var bx0 = 70, bx1 = 490, bxF = bx0 + (bx1 - bx0) * 2 / 6;
  var beamSvg = '<svg viewBox="0 0 560 250">' +
    '<rect x="' + bx0 + '" y="96" width="' + (bx1 - bx0) + '" height="14" fill="' + GOLD + '" opacity=".8"/>' +
    pin(bx0, 110) + roller(bx1, 110) +
    arrow(bxF, 22, bxF, 93, RED, 3.5) + ctxt(bxF + 9, 40, 'F = 12 kN', RED, 13, null, true) +
    arrow(bx0, 205, bx0, 146, BLUE, 3) + ctxt(bx0 + 8, 196, 'A = 8 kN', BLUE, 13, null, true) +
    arrow(bx0 - 4, 103, bx0 - 50, 103, PURPLE, 2) + ctxt(bx0 - 56, 92, 'A' + SUB('x') + ' = 0', PURPLE, 11, null) +
    arrow(bx1, 205, bx1, 146, BLUE, 3) + ctxt(bx1 - 8, 196, 'B = 4 kN', BLUE, 13, 'end', true) +
    dim(bx0, bxF, 222, 'a = 2 m') + dim(bxF, bx1, 222, 'b = 4 m') + dim(bx0, bx1, 244, 'L = 6 m') +
    txt(bx0 + 26, 134, 'csukló', M, 11) + txt(bx1 - 26, 134, 'görgő', M, 11, 'end') + '</svg>';

  /* ---------- 4. Nyíróerő- és nyomatéki ábra ---------- */
  var vScale = 4.5, mScale = 3.5;
  var vmSvg = '<svg viewBox="0 0 560 300">' +
    '<rect x="' + bx0 + '" y="26" width="' + (bx1 - bx0) + '" height="8" fill="' + GOLD + '" opacity=".8"/>' +
    arrow(bxF, 0, bxF, 24, RED, 2.5) + arrow(bx0, 60, bx0, 37, BLUE, 2.5) + arrow(bx1, 60, bx1, 37, BLUE, 2.5) +
    ctxt(bxF + 6, 14, '12 kN', RED, 11) + ctxt(bx0 + 6, 58, '8 kN', BLUE, 11) + ctxt(bx1 - 6, 58, '4 kN', BLUE, 11, 'end') +
    // V ábra
    '<line x1="' + bx0 + '" y1="115" x2="' + bx1 + '" y2="115" ' + LN + ' stroke-width="1.5"/>' +
    '<path d="M' + bx0 + ' 115 V' + (115 - 8 * vScale) + ' H' + r1(bxF) + ' V' + (115 + 4 * vScale) + ' H' + bx1 + ' V115 z" fill="' + BLUE + '" fill-opacity=".22" stroke="' + BLUE + '" stroke-width="2"/>' +
    txt(30, 119, 'V', T, 15, 'middle', 'font-weight="700"') + ctxt(bx0 + 50, 106 - 8 * vScale + 20, '+8 kN', BLUE, 12, null, true) + ctxt(bx1 - 60, 115 + 4 * vScale + 16, '−4 kN', BLUE, 12, null, true) +
    // M ábra (a húzott oldalra, lefelé)
    '<line x1="' + bx0 + '" y1="185" x2="' + bx1 + '" y2="185" ' + LN + ' stroke-width="1.5"/>' +
    '<path d="M' + bx0 + ' 185 L' + r1(bxF) + ' ' + (185 + 16 * mScale) + ' L' + bx1 + ' 185 z" fill="' + RED + '" fill-opacity=".2" stroke="' + RED + '" stroke-width="2"/>' +
    txt(30, 189, 'M', T, 15, 'middle', 'font-weight="700"') + ctxt(bxF + 14, 185 + 16 * mScale + 4, 'M' + SUB('max') + ' = 16 kN·m', RED, 12, null, true) +
    '<line x1="' + r1(bxF) + '" y1="40" x2="' + r1(bxF) + '" y2="' + (185 + 16 * mScale) + '" stroke="var(--muted)" stroke-dasharray="3 4"/>' +
    txt(280, 282, 'Ahol V előjelet vált (x = 2 m), ott M maximális. Az M ábra a húzott oldalra rajzolva.', M, 11, 'middle') + '</svg>';

  /* ---------- 5. Rácsos tartó (Warren-rendszer) ---------- */
  var tb = [[70, 210], [210, 210], [350, 210], [490, 210]], tt = [[140, 100], [280, 100], [420, 100]];
  function mem(p, q, col, w) { return '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="' + col + '" stroke-width="' + (w || 5) + '" stroke-linecap="round"/>'; }
  var trussSvg = '<svg viewBox="0 0 560 280">' +
    mem(tb[0], tb[1], BLUE) + mem(tb[1], tb[2], BLUE) + mem(tb[2], tb[3], BLUE) +
    mem(tt[0], tt[1], RED) + mem(tt[1], tt[2], RED) +
    mem(tb[0], tt[0], RED) + mem(tt[0], tb[1], BLUE) + mem(tb[1], tt[1], RED) + mem(tt[1], tb[2], RED) + mem(tb[2], tt[2], BLUE) + mem(tt[2], tb[3], RED) +
    tb.concat(tt).map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="var(--surface)" stroke="var(--fg)" stroke-width="2"/>'; }).join('') +
    pin(70, 216) + roller(490, 216) +
    arrow(280, 30, 280, 90, ORANGE, 3.5) + ctxt(290, 46, 'F', ORANGE, 15, null, true) +
    ctxt(40, 26, '━ nyomott rúd', RED, 12, null, true) + ctxt(40, 44, '━ húzott rúd', BLUE, 12, null, true) +
    txt(430, 32, '○ csukló (csomópont)', M, 12) +
    txt(280, 270, 'A rudak csak húzást vagy nyomást viselnek: a terhelés a csomópontokba jut.', M, 11, 'middle') + '</svg>';

  /* ---------- 6. Szakítódiagram (lágyacél, nem méretarányos) ---------- */
  var ssSvg = (function () {
    var O = [60, 230];
    var path = 'M60 230 L100 110 L104 112 L110 106 L116 113 L122 107 L128 112 L150 110 C200 80 260 58 330 56 C380 56 420 72 470 120';
    return '<svg viewBox="0 0 560 270">' + axes(O[0], O[1], 530, 18) +
      txt(526, 250, 'ε (fajlagos nyúlás)', M, 12, 'end') + txt(68, 26, 'σ (feszültség)', M, 12) +
      '<path d="' + path + '" fill="none" stroke="' + GOLD + '" stroke-width="3.5"/>' +
      '<path d="M470 120 l-7 -7 l14 14 m0 -14 l-14 14" stroke="' + RED + '" stroke-width="2.5"/>' +
      '<line x1="290" y1="60" x2="' + r1(290 - (230 - 60) * 40 / 120) + '" y2="230" stroke="' + PURPLE + '" stroke-dasharray="6 4" stroke-width="2"/>' +
      '<line x1="60" y1="110" x2="100" y2="110" stroke="var(--muted)" stroke-dasharray="3 4"/><line x1="60" y1="56" x2="330" y2="56" stroke="var(--muted)" stroke-dasharray="3 4"/>' +
      ctxt(54, 114, 'R' + SUB('eH'), BLUE, 12, 'end', true) + ctxt(54, 60, 'R' + SUB('m'), RED, 12, 'end', true) +
      txt(100, 190, 'rugalmas', T, 11) + txt(100, 204, '(Hooke)', M, 11) +
      txt(110, 96, 'folyás', T, 11) + txt(160, 140, 'felkeményedés', T, 11) + txt(405, 150, 'kontrakció', T, 11) + txt(405, 164, '(nyakképződés)', M, 11) +
      ctxt(480, 116, 'szakadás', RED, 11) +
      ctxt(r1(290 - (230 - 60) * 40 / 120) + 4, 248, 'maradó nyúlás', PURPLE, 11) + ctxt(285, 160, 'tehermentesítés', PURPLE, 11) +
      txt(530, 200, 'vázlat, nem méretarányos', M, 10, 'end') + '</svg>';
  })();

  /* ---------- 7. Keresztmetszetek másodrendű nyomatéka ---------- */
  function na(x1, x2, y) { return '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="' + RED + '" stroke-dasharray="6 4" stroke-width="1.5"/>'; }
  var csSvg = '<svg viewBox="0 0 560 250">' +
    '<rect x="50" y="40" width="40" height="120" fill="' + GOLD + '" opacity=".8"/>' + na(30, 110, 100) +
    '<rect x="150" y="80" width="120" height="40" fill="' + GOLD + '" opacity=".8"/>' + na(130, 290, 100) +
    '<path d="M320 40 h80 v12 h-34 v96 h34 v12 h-80 v-12 h34 v-96 h-34 z" fill="' + GOLD + '" opacity=".8"/>' + na(305, 415, 100) +
    '<circle cx="490" cy="100" r="45" fill="' + GOLD + '" opacity=".8"/><circle cx="490" cy="100" r="35" fill="var(--stage)"/>' + na(435, 545, 100) +
    txt(70, 186, 'álló téglalap', T, 12, 'middle') + txt(70, 204, '40 × 120 mm', M, 11, 'middle') + txt(70, 222, 'I = 5,76·10⁶ mm⁴', T, 11, 'middle', 'font-weight="700"') +
    txt(210, 186, 'fekvő téglalap', T, 12, 'middle') + txt(210, 204, '120 × 40 mm', M, 11, 'middle') + txt(210, 222, 'I = 0,64·10⁶ mm⁴', T, 11, 'middle', 'font-weight="700"') +
    txt(360, 186, 'I-szelvény', T, 12, 'middle') + txt(360, 204, 'anyag az övekben', M, 11, 'middle') + txt(360, 222, 'nagy I, kis tömeg', T, 11, 'middle', 'font-weight="700"') +
    txt(490, 186, 'cső', T, 12, 'middle') + txt(490, 204, 'hajlításra és', M, 11, 'middle') + txt(490, 222, 'csavarásra is jó', T, 11, 'middle', 'font-weight="700"') +
    ctxt(20, 24, '- - - semleges tengely (hajlítás e körül)', RED, 11) + '</svg>';

  /* ---------- 8. Tömeg–rugó rezgő rendszer és kitérés ---------- */
  var osc = frame(0, 4, -1.3, 1.3, 270, 40, 270, 160);
  var oscSvg = '<svg viewBox="0 0 560 250">' +
    '<line x1="30" y1="40" x2="30" y2="140" stroke="var(--fg-2)" stroke-width="3"/>' + [44, 58, 72, 86, 100, 114, 128].map(function (y) { return '<line x1="30" y1="' + y + '" x2="22" y2="' + (y + 8) + '" stroke="var(--muted)" stroke-width="1.2"/>'; }).join('') +
    spring(30, 150, 75, 8, 12) +
    '<path d="M30 112 h45 m0 -10 v20 m0 -14 h30 v8 h-30 m30 -4 h45" fill="none" stroke="var(--fg-2)" stroke-width="2"/>' +
    '<rect x="150" y="55" width="70" height="75" rx="4" fill="' + GOLD + '" opacity=".85"/>' + ctxt(185, 98, 'm', '#fff', 18, 'middle', true) +
    '<line x1="140" y1="140" x2="235" y2="140" stroke="var(--fg-2)" stroke-width="2"/>' + hatch(140, 140, 95) +
    txt(90, 48, 's (rugó)', M, 12, 'middle') + txt(90, 140, 'k (csillapító)', M, 11, 'middle') +
    arrow(185, 175, 240, 175, PURPLE, 2) + ctxt(214, 194, 'x', PURPLE, 14, 'middle', true) +
    '<line x1="270" y1="120" x2="545" y2="120" ' + LN + ' stroke-width="1.2"/><line x1="270" y1="30" x2="270" y2="210" ' + LN + ' stroke-width="1.2"/>' +
    '<path d="' + curve(osc, function (t) { return Math.cos(2 * Math.PI * t); }, 0, 4, 200, -2, 2) + '" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-dasharray="5 4"/>' +
    '<path d="' + curve(osc, function (t) { return Math.exp(-0.45 * t) * Math.cos(2 * Math.PI * t); }, 0, 4, 200, -2, 2) + '" fill="none" stroke="' + BLUE + '" stroke-width="2.5"/>' +
    txt(540, 136, 't', M, 12, 'end') + txt(276, 34, 'x(t)', M, 12) +
    txt(410, 228, 'szaggatott: csillapítatlan, kék: csillapított', M, 11, 'middle') + '</svg>';

  /* ---------- 9. Csillapítási esetek ---------- */
  var dmp = frame(0, 3, -1.1, 1.1, 60, 20, 460, 190);
  function dampResp(z) {
    var w = 2 * Math.PI;
    return function (t) {
      if (z < 1) { var wd = w * Math.sqrt(1 - z * z); return Math.exp(-z * w * t) * (Math.cos(wd * t) + z * w / wd * Math.sin(wd * t)); }
      if (z === 1) return Math.exp(-w * t) * (1 + w * t);
      var a = Math.sqrt(z * z - 1), s1 = -w * (z - a), s2 = -w * (z + a);
      return (s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s2 - s1);
    };
  }
  var dampSvg = '<svg viewBox="0 0 560 270">' +
    '<line x1="60" y1="' + dmp.Y(0) + '" x2="525" y2="' + dmp.Y(0) + '" ' + LN + ' stroke-width="1.2"/><line x1="60" y1="15" x2="60" y2="215" ' + LN + ' stroke-width="1.2"/>' +
    [[0.08, BLUE, 'ζ = 0,08 (gyengén csillapított)'], [0.3, GREEN, 'ζ = 0,3 (gépjármű-futómű)'], [1, RED, 'ζ = 1 (kritikus)'], [2.5, PURPLE, 'ζ = 2,5 (túlcsillapított)']].map(function (c, i) {
      return '<path d="' + curve(dmp, dampResp(c[0]), 0, 3, 300, -2, 2) + '" fill="none" stroke="' + c[1] + '" stroke-width="2.5"/>' +
        ctxt(70 + (i % 2) * 240, 238 + Math.floor(i / 2) * 20, c[2], c[1], 12, null, true);
    }).join('') +
    txt(522, dmp.Y(0) - 6, 't', M, 12, 'end') + txt(66, 22, 'x(t) / x₀', M, 12) + '</svg>';

  /* ---------- 10. Rezonanciagörbék ---------- */
  var rz = frame(0, 3, 0, 6, 60, 15, 460, 200);
  var resSvg = '<svg viewBox="0 0 560 262">' + axes(60, rz.Y(0), 535, 10) +
    [1, 2, 3].map(function (e) { return txt(rz.X(e), rz.Y(0) + 16, e, M, 11, 'middle'); }).join('') +
    [1, 2, 4, 6].map(function (v) { return txt(54, rz.Y(v) + 4, v, M, 11, 'end'); }).join('') +
    '<line x1="' + rz.X(1) + '" y1="' + rz.Y(0) + '" x2="' + rz.X(1) + '" y2="12" stroke="var(--muted)" stroke-dasharray="4 4"/>' +
    '<line x1="60" y1="' + rz.Y(1) + '" x2="520" y2="' + rz.Y(1) + '" stroke="var(--muted)" stroke-dasharray="2 4"/>' +
    [[0.05, RED, 'ζ = 0,05'], [0.1, ORANGE, 'ζ = 0,1'], [0.3, GREEN, 'ζ = 0,3'], [0.7, BLUE, 'ζ = 0,7']].map(function (c, i) {
      return '<path d="' + curve(rz, function (h) { return 1 / Math.sqrt(Math.pow(1 - h * h, 2) + Math.pow(2 * c[0] * h, 2)); }, 0, 3, 600, 0, 6) + '" fill="none" stroke="' + c[1] + '" stroke-width="2.5"/>' +
        ctxt(400, 50 + i * 18, c[2], c[1], 12, null, true);
    }).join('') +
    txt(530, rz.Y(0) + 36, 'η = ω / ω₀ (gerjesztő / saját körfrekvencia)', M, 12, 'end') + txt(68, 22, 'nagyítás: x' + SUB('max') + ' / x' + SUB('st'), M, 12) +
    txt(rz.X(1), rz.Y(0) + 32, 'rezonancia (η = 1)', T, 12, 'middle') + '</svg>';

  STUDIE.addCourse({
    id: 'mechanika',
    title: 'Műszaki mechanika',
    icon: '🏗️',
    color: '#8a6d1f',
    level: 'BSc 1–3. félév (gépész-, építő-, mechatronikai mérnök)',
    description: 'Statika, szilárdságtan, hajlítás és csavarás, merev testek mozgása, rezgések: a mérnöki méretezés alapjai.',
    intro: 'A műszaki mechanika a fizika mechanikáját fordítja le a mérnök nyelvére: **mekkora erők** hatnak egy szerkezetben, **mekkora feszültség** keletkezik bennük, és **elég erős-e** az alkatrész. A gondolatmenet mindig ugyanaz: szabadtest-ábra → egyensúlyi egyenletek → igénybevételek → feszültség → összevetés az anyag határértékével. A forgó és rezgő gépalkatrészek a [[benzinmotor|benzinmotor]] és az [[elektromos-auto|elektromos autó]] modellben is megfigyelhetők.',
    topics: [
      { id: 'statika', title: 'Statika' },
      { id: 'szilardsag', title: 'Szilárdságtan' },
      { id: 'hajlitas', title: 'Hajlítás és csavarás' },
      { id: 'kinetika', title: 'Kinematika és kinetika' },
      { id: 'rezges', title: 'Rezgések' }
    ],
    formulas: [
      {
        id: 'nyomatek-f', title: 'Az erő nyomatéka', en: 'moment of a force',
        parts: [{ t: 'M', d: 'Az erő nyomatéka egy pontra', unit: 'N·m', more: 'Előjeles: általában az óramutatóval ellentétes forgatás pozitív.' }, { t: '=' },
          { t: 'F', d: 'Az erő nagysága', unit: 'N' }, { t: '·' }, { t: 'k', d: 'Erőkar: a pont merőleges távolsága az erő hatásvonalától', unit: 'm' }],
        text: 'Térben vektoriálisan: `M = r × F`, ahol r a forgásponttól az erő bármely pontjáig mutató helyvektor. A nyomaték nem változik, ha az erőt a hatásvonala mentén eltoljuk.',
        example: '0,25 m-es kulcs végén merőlegesen ható 200 N: `M = 200 · 0,25 = 50 N·m`. Ha az erő 30°-os szöget zár be a kulccsal, a kar csak `0,25 · sin 30° = 0,125 m`, a nyomaték 25 N·m.'
      },
      {
        id: 'feszultseg-f', title: 'Normálfeszültség húzásnál és nyomásnál', en: 'normal stress',
        parts: [{ t: 'σ', d: 'Normálfeszültség', unit: 'Pa = N/m², a gyakorlatban MPa = N/mm²' }, { t: '=' },
          { t: 'F', d: 'A keresztmetszetre merőleges (normál) rúderő', unit: 'N' }, { t: '/' }, { t: 'A', d: 'A keresztmetszet területe', unit: 'mm²', more: 'Kör esetén A = π·d²/4.' }],
        text: 'A képlet egyenletes feszültségeloszlást feltételez: ez a rúd hossztengelyében ható erőnél, a befogásoktól és furatoktól távol igaz. Húzásnál σ > 0, nyomásnál σ < 0.',
        example: 'd = 20 mm-es acélrúd, F = 30 kN húzóerő: `A = π · 20² / 4 = 314,2 mm²`, `σ = 30 000 / 314,2 = 95,5 MPa`.'
      },
      {
        id: 'hooke-f', title: 'Hooke-törvény (egytengelyű)', en: "Hooke's law",
        parts: [{ t: 'σ', d: 'Normálfeszültség', unit: 'MPa' }, { t: '=' },
          { t: 'E', d: 'Rugalmassági (Young-) modulus, anyagjellemző', unit: 'MPa vagy GPa', more: 'Acél ≈ 210 GPa, alumínium ≈ 70 GPa, beton ≈ 30 GPa.' }, { t: '·' },
          { t: 'ε', d: 'Fajlagos nyúlás: ΔL / L₀', unit: '– (dimenzió nélküli)' }],
        text: 'Csak a **rugalmas** (lineáris) tartományban érvényes, a folyáshatár alatt. A rúd megnyúlása ebből: `ΔL = F·L₀ / (E·A)`. Nyírásra a megfelelője `τ = G·γ`, ahol G a csúsztató rugalmassági modulus (acélnál ≈ 81 GPa).',
        example: 'σ = 95,5 MPa acélban: `ε = 95,5 / 210 000 = 4,55·10⁻⁴`. Egy 2 m-es rúd tehát `ΔL = 4,55·10⁻⁴ · 2000 mm ≈ 0,91 mm`-t nyúlik.'
      },
      {
        id: 'hajlitas-f', title: 'Legnagyobb hajlítófeszültség', en: 'maximum bending stress',
        parts: [{ t: 'σ_{max}', d: 'A szélső szálban ébredő legnagyobb normálfeszültség', unit: 'MPa' }, { t: '=' },
          { t: 'M_h', d: 'Hajlítónyomaték a vizsgált keresztmetszetben', unit: 'N·mm' }, { t: '/' },
          { t: 'K', d: 'Keresztmetszeti tényező: K = I / e_max', unit: 'mm³', more: 'Téglalapra K = b·h²/6, tömör körre K = π·d³/32.' }],
        text: 'Az általános alak `σ(y) = M_h·y / I`: a feszültség a semleges tengelytől mért y távolsággal lineárisan nő. A legnagyobb a legtávolabbi szálban, y = e_max-nál.',
        example: 'M = 16 kN·m = 16·10⁶ N·mm, IPE 160 szelvény (K ≈ 108,7·10³ mm³): `σ = 16·10⁶ / 108 700 ≈ 147 MPa`.'
      },
      {
        id: 'csavaras-f', title: 'Csavarófeszültség körszelvényű tengelyben', en: 'torsional shear stress',
        parts: [{ t: 'τ_{max}', d: 'Legnagyobb csúsztatófeszültség (a palástnál)', unit: 'MPa' }, { t: '=' },
          { t: 'T', d: 'Csavarónyomaték', unit: 'N·mm' }, { t: '/' },
          { t: 'K_p', d: 'Poláris keresztmetszeti tényező', unit: 'mm³', more: 'Tömör körre K_p = π·d³/16, ami a hajlítási K kétszerese.' }],
        text: 'A tengely által átvitt teljesítményből: `T = P / ω`. Az elcsavarodási szög `φ = T·L / (G·I_p)`, ahol `I_p = π·d⁴/32` a poláris másodrendű nyomaték.',
        example: 'd = 40 mm, T = 500 N·m: `K_p = π · 40³ / 16 = 12 566 mm³`, `τ = 500 000 / 12 566 ≈ 39,8 MPa`.'
      },
      {
        id: 'tehetetlenseg-f', title: 'Tehetetlenségi nyomaték', en: 'mass moment of inertia',
        parts: [{ t: 'Θ', d: 'Tehetetlenségi nyomaték a forgástengelyre', unit: 'kg·m²' }, { t: '=' }, { t: 'Σ' },
          { t: 'm_i', d: 'Az i-edik tömegpont tömege', unit: 'kg' }, { t: '·' },
          { t: 'r_i^2', d: 'Az i-edik tömegpont távolsága a tengelytől, négyzetre emelve', unit: 'm²' }],
        text: 'Folytonos testre integrál: `Θ = ∫ r² dm`. Nevezetes értékek: tárcsa ½·m·r², vékony gyűrű m·r², rúd a közepén átmenő tengelyre m·L²/12. **Steiner-tétel**: párhuzamos tengelyre `Θ = Θ_S + m·d²`.',
        example: 'm = 10 kg, r = 0,2 m-es lendkerék-tárcsa: `Θ = ½ · 10 · 0,2² = 0,2 kg·m²`.'
      },
      {
        id: 'sajatfrekvencia-f', title: 'Csillapítatlan sajátkörfrekvencia', en: 'undamped natural frequency',
        parts: [{ t: 'ω_0', d: 'Saját körfrekvencia', unit: 'rad/s = 1/s', more: 'A frekvencia f₀ = ω₀ / 2π (Hz).' }, { t: '=' }, { t: '√(' },
          { t: 's', d: 'Rugómerevség (rugóállandó)', unit: 'N/m' }, { t: '/' }, { t: 'm', d: 'A rezgő tömeg', unit: 'kg' }, { t: ')' }],
        text: 'A mozgásegyenlet `m·ẍ + s·x = 0`, megoldása `x(t) = A·cos(ω₀t + φ)`. Ha a tömeg a saját súlya alatt δ_st-t süllyed a rugón, akkor `ω₀ = √(g / δ_st)` is igaz: a statikus behajlásból a sajátfrekvencia azonnal becsülhető.',
        example: 'm = 2 kg, s = 800 N/m: `ω₀ = √400 = 20 1/s`, `f₀ = 20 / 2π ≈ 3,18 Hz`.'
      },
      {
        id: 'munkatetel-f', title: 'Munkatétel (munka–energia tétel)', en: 'work–energy theorem',
        parts: [{ t: 'W', d: 'Az összes erő (és nyomaték) munkája az 1→2 szakaszon', unit: 'J' }, { t: '=' },
          { t: 'E_{k2}', d: 'Mozgási energia a végállapotban', unit: 'J', more: 'Merev testre E_k = ½·m·v_S² + ½·Θ_S·ω².' }, { t: '−' }, { t: 'E_{k1}', d: 'Mozgási energia a kezdőállapotban', unit: 'J' }],
        text: 'Állandó erő munkája `W = F·s·cos α`, állandó nyomatéké `W = M·Δφ`. Előnye, hogy a gyorsulások és az idő ismerete nélkül ad sebességet vagy utat.',
        example: '1200 kg-os autó 20 m/s-ról áll meg, átlagos fékerő 6000 N: `E_k = ½ · 1200 · 20² = 240 kJ`, a fékút `s = 240 000 / 6000 = 40 m`.'
      }
    ],
    terms: [
      /* ----- Statika ----- */
      { id: 'ero', term: 'Erő', en: 'force', topic: 'statika',
        short: 'Két test kölcsönhatásának mértéke: vektormennyiség, amelyet nagysága, iránya és támadáspontja (hatásvonala) jellemez.',
        prereq: ['lecke:fizika/newton', 'linearis-algebra/vektor'],
        text: 'Mértékegysége a **newton**: `1 N = 1 kg·m/s²`. A statikában az erőt **csúszó vektornak** tekintjük: merev testen a hatásvonala mentén szabadon eltolható, a hatás nem változik. Megkülönböztetünk **koncentrált** erőt (egy pontban, N) és **megoszló** terhelést (vonal mentén N/m, felületen N/m² = Pa).\n\nTöbb erő **eredője** a vektoriális összegük. Síkban az összetevőkre bontás a legkényelmesebb: `F_x = F·cos α`, `F_y = F·sin α`, az eredő `R = √(ΣF_x² + ΣF_y²)`.',
        example: 'Egy 5 kN-os erő 30°-ot zár be a vízszintessel: `F_x = 5 · cos 30° = 4,33 kN`, `F_y = 5 · sin 30° = 2,5 kN`.',
        pitfall: 'A tömeg (kg) nem erő! Egy 100 kg-os gép súlyereje `G = m·g ≈ 981 N`. A régi „kilopond” (kp) kb. 9,81 N, régi táblázatokban még előfordul.',
        related: ['nyomatek', 'egyensuly', 'szabadtest', 'feszultseg'] },
      { id: 'nyomatek', term: 'Erő nyomatéka', en: 'moment of a force (torque)', topic: 'statika',
        short: 'Az erő forgató hatása egy pontra vagy tengelyre: az erő és az erőkar szorzata, M = F·k.',
        prereq: ['lecke:autoszereles/eroatvitel', 'linearis-algebra/vektorialis-szorzat'],
        visual: nyomSvg, caption: 'Az erőkar (k) nem a kulcs hossza, hanem a forgáspont merőleges távolsága az erő hatásvonalától.',
        text: 'Térben a nyomaték vektor: `M = r × F`; iránya a forgástengely, értelme a jobbkéz-szabály szerinti. Síkfeladatban elég az előjeles skalár: az óramutatóval ellentétes forgatás pozitív.\n\nA **Varignon-tétel** szerint az eredő nyomatéka egyenlő az összetevők nyomatékainak összegével, ezért egy ferde erőt gyakran egyszerűbb összetevőire bontva nyomatékozni: `M = F_x·y − F_y·x`.',
        example: 'Villáskulcs: 0,25 m-es karon merőlegesen 200 N → `M = 50 N·m`. Egy autókerék csavarjainak meghúzási nyomatéka tipikusan 100–120 N·m, ehhez 0,4 m-es kulccsal kb. 280 N kell.',
        pitfall: 'Gyakori hiba a kulcs hosszát vagy a támadáspont távolságát szorozni, holott a **merőleges** távolság számít. Ha az erő hatásvonala átmegy a ponton, a nyomaték nulla, akármekkora is az erő.',
        formulas: ['nyomatek-f'],
        related: ['ero', 'eropar', 'egyensuly', 'hajlitonyomatek', 'csavaras'], models: ['benzinmotor'] },
      { id: 'eropar', term: 'Erőpár', en: 'couple', topic: 'statika',
        short: 'Két egyenlő nagyságú, párhuzamos, ellentétes irányú, de nem közös hatásvonalú erő; eredője nulla, csak forgató hatása van.',
        text: 'Az erőpár nyomatéka `M = F·d`, ahol d a két hatásvonal távolsága. Különlegessége, hogy ez a nyomaték **bármely pontra ugyanakkora**, ezért az erőpár „szabad vektor”: a test síkjában bárhová áthelyezhető.\n\nFontos következmény: egy erő eltolható egy másik pontba, ha mellé egy erőpárt (az eltolás nyomatékát) is odaírunk. Így redukálható bármilyen erőrendszer egy pontba **egy erőre és egy nyomatékra** (erőcsavar, redukált vektorkettős).',
        example: 'Kormánykerék: két kézzel 40-40 N-t fejtünk ki ellentétes irányba, a kezek távolsága 0,3 m: `M = 40 · 0,3 = 12 N·m`. A kormányoszlopra nem jut eredő erő, csak forgatónyomaték.',
        pitfall: 'Erőpárt nem lehet egyetlen erővel egyensúlyozni, csak egy ellentétes erőpárral (nyomatékkal).',
        related: ['nyomatek', 'egyensuly', 'csavaras'] },
      { id: 'egyensuly', term: 'Az egyensúly feltételei', en: 'equilibrium conditions', topic: 'statika',
        short: 'Egy merev test akkor van egyensúlyban, ha a rá ható erők eredője és bármely pontra számított eredő nyomatéka is nulla.',
        prereq: ['lecke:matematika/egyenletek', 'linearis-algebra/linearis-egyenletrendszer'],
        text: 'Síkbeli erőrendszerre **3 független egyenlet** írható fel:\n\n- `ΣF_x = 0`\n- `ΣF_y = 0`\n- `ΣM_A = 0` (tetszőleges A pontra)\n\nTérben 6 egyenlet van (3 erő- és 3 nyomatéki). Ha az ismeretlenek száma egyenlő a független egyenletek számával, a szerkezet **statikailag határozott**; ha több, **határozatlan**, és csak az alakváltozások figyelembevételével oldható meg.\n\nPraktikus fogás: a nyomatéki pontot úgy választjuk, hogy minél több ismeretlen hatásvonala átmenjen rajta, így egy egyenletben csak egy ismeretlen marad.',
        example: 'Kéttámaszú tartó, L = 6 m, F = 12 kN az A-tól 2 m-re. `ΣM_A = 0`: `B · 6 − 12 · 2 = 0` → `B = 4 kN`. `ΣF_y = 0`: `A + B − 12 = 0` → `A = 8 kN`. Ellenőrzés: `ΣM_B = −A · 6 + 12 · 4 = 0` ✓.',
        pitfall: 'Három nyomatéki egyenlet is használható két erőegyenlet helyett, de csak ha a három pont **nem esik egy egyenesre**, különben az egyenletek nem függetlenek.',
        related: ['szabadtest', 'tamasz', 'ero', 'nyomatek', 'eropar', 'racsos-tarto'] },
      { id: 'szabadtest', term: 'Szabadtest-ábra', en: 'free-body diagram', topic: 'statika',
        short: 'A vizsgált test „kivágott” rajza, amelyen a környezet minden hatását erőkkel és nyomatékokkal helyettesítjük.',
        prereq: ['lecke:fizika/newton'],
        visual: lj, caption: 'A lejtőn nyugvó láda szabadtest-ábrája: a lejtő hatását a nyomóerő (N) és a tapadási súrlódás (S) helyettesíti.',
        text: 'A mechanikai feladatmegoldás első és legfontosabb lépése. Menete:\n\n1. Válaszd ki a testet (vagy testcsoportot), és képzeletben vágd ki a környezetéből.\n2. Rajzold fel az ismert terheléseket (súlyerő, külső erők).\n3. Minden elvágott kapcsolat helyére rajzold be a **kényszererőket** a kapcsolat típusa szerint (támasz, kötél, érintkezés).\n4. Vegyél fel koordináta-rendszert, és írd fel az egyensúlyi (vagy mozgás-) egyenleteket.\n\nAz ismeretlen erők irányát tetszőlegesen felvehetjük: ha az eredmény negatív, a valódi irány ellentétes.',
        example: 'm = 50 kg láda 30°-os lejtőn: `G = 490,5 N`, `N = G·cos 30° = 424,8 N`, a megtartáshoz szükséges súrlódás `S = G·sin 30° = 245,3 N`. A láda akkor nem csúszik meg, ha `S ≤ μ₀·N`, azaz `μ₀ ≥ tan 30° = 0,577`.',
        pitfall: 'A belső erők (pl. két összeszerelt alkatrész között) nem kerülnek a szabadtest-ábrára, amíg a két részt együtt vizsgáljuk. És fordítva: az elvágott kapcsolatból egyetlen kényszererő sem maradhat le.',
        related: ['egyensuly', 'tamasz', 'ero'] },
      { id: 'tamasz', term: 'Támaszok és reakcióerők', en: 'supports and reaction forces', topic: 'statika',
        short: 'A támasz a test mozgását akadályozó kényszer; az általa kifejtett erő (és nyomaték) a reakció, amelyet az egyensúlyi egyenletekből számolunk.',
        visual: beamSvg, caption: 'Kéttámaszú tartó: bal oldalon csukló (két reakció-összetevő), jobb oldalon görgő (egy, a pályára merőleges reakció).',
        text: 'A támasz annyi reakció-összetevőt ad, ahány mozgáslehetőséget megakadályoz:\n\n- **görgős támasz** (mozgó saru): 1 ismeretlen, a gördülési pályára merőleges erő;\n- **csukló** (álló saru): 2 ismeretlen, tetszőleges irányú erő (A_x, A_y), elfordulni enged;\n- **befogás**: 3 ismeretlen (A_x, A_y és M_A nyomaték), semmilyen mozgást nem enged;\n- **kötél, rúd**: 1 ismeretlen, a kötél irányába eső erő (kötél csak húzni tud).\n\nA klasszikus kéttámaszú tartó csukló + görgő: 2 + 1 = 3 ismeretlen, 3 egyenlet, tehát statikailag határozott. A görgő azért kell, hogy a tartó a hőtágulás miatt szabadon nyúlhasson.',
        example: 'Az ábrán `B = F·a / L = 12 · 2 / 6 = 4 kN`, `A = F·b / L = 12 · 4 / 6 = 8 kN`. A közelebbi támasz kapja a nagyobb részt. Mivel nincs vízszintes teher, `A_x = 0`.',
        pitfall: 'Ha mindkét végére csuklót teszünk, 4 ismeretlen lesz: a szerkezet egyszer határozatlan, és melegedéskor nagy belső nyomóerő ébred benne.',
        formulas: ['nyomatek-f'],
        related: ['egyensuly', 'szabadtest', 'igenybevetel-abra', 'racsos-tarto', 'hajlitonyomatek'] },
      { id: 'racsos-tarto', term: 'Rácsos tartó', en: 'truss', topic: 'statika',
        short: 'Egyenes rudakból csuklós csomópontokkal összeállított, háromszögekből felépülő szerkezet, amelynek rúdjai csak húzást vagy nyomást kapnak.',
        visual: trussSvg, caption: 'Warren-rendszerű rácsos tartó középen ható teherrel: a felső öv nyomott, az alsó öv húzott, a rácsrudak váltakoznak.',
        text: 'Feltételezések: a rudak súlytalanok, a csomópontok súrlódásmentes csuklók, terhelés csak a csomópontokban hat. Ekkor minden rúd **kéttámaszú rúd**, így a rúderő a rúd tengelyébe esik.\n\nSíkbeli rácsos tartó statikailag határozott, ha `r = 2c − 3` (r: rudak, c: csomópontok száma). Számítási módszerek:\n\n- **csomóponti módszer**: csomópontonként `ΣF_x = 0`, `ΣF_y = 0`; olyan csomóponttal kezdünk, ahol legfeljebb 2 ismeretlen van;\n- **átmetszés (Ritter-módszer)**: legfeljebb 3 rudat elvágunk, és olyan pontra nyomatékozunk, ahol két ismeretlen rúd hatásvonala metszi egymást.',
        example: 'Egyszerű háromszög: fesztáv 4 m, magasság 1,5 m, a csúcson F = 10 kN. A reakciók 5-5 kN. A ferde rúd hajlása: `sin α = 1,5 / 2,5 = 0,6`. A ferde rúderő `S = 5 / 0,6 = 8,33 kN` (nyomás), az alsó öv `8,33 · 0,8 = 6,67 kN` (húzás). Ellenőrzés: `r = 3`, `c = 3`, `2 · 3 − 3 = 3` ✓.',
        pitfall: 'A nyomott rudaknál nem elég a σ = F/A ellenőrzés: a karcsú nyomott rúd jóval a folyáshatár alatt **kihajolhat** (Euler-féle kihajlás).',
        related: ['egyensuly', 'tamasz', 'feszultseg', 'szabadtest'] },

      /* ----- Szilárdságtan ----- */
      { id: 'feszultseg', term: 'Feszültség', en: 'stress', topic: 'szilardsag',
        short: 'Az anyag belsejében egységnyi felületre jutó belső erő; normálfeszültség (σ) a felületre merőleges, csúsztatófeszültség (τ) a felülettel párhuzamos összetevő.',
        prereq: ['lecke:fizika/mertekegysegek-mozgas'],
        text: 'Mértékegysége a pascal, de a gépészetben szinte mindig **MPa**-t használunk, mert `1 MPa = 1 N/mm²`: ha az erőt N-ban, a területet mm²-ben írjuk, az eredmény közvetlenül MPa.\n\nEgy pontban a feszültségállapotot egy 3×3-as szimmetrikus mátrix, a **feszültségtenzor** írja le. Mindig létezik három egymásra merőleges irány (főirányok), amelyekben csak normálfeszültség van: ezek a **főfeszültségek** (a tenzor sajátértékei). Összetett igénybevételnél **redukált (egyenértékű) feszültséggel** hasonlítunk az anyagjellemzőhöz, pl. Huber–Mises–Hencky szerint `σ_red = √(σ² + 3τ²)`.',
        example: 'd = 20 mm-es rúd, F = 30 kN: `σ = 30 000 N / 314,2 mm² = 95,5 MPa`. Ugyanez a rúd egy mindössze 300 N·m-es hajlítónyomatéktól (K = π·20³/32 = 785 mm³) már `300 000 / 785 ≈ 382 MPa`-t kapna: a hajlítás sokkal veszélyesebb, mint a húzás.',
        pitfall: 'A feszültség nem nyomás, és nem erő: két azonos anyagú, de eltérő vastagságú rúd ugyanazon erőtől eltérő feszültséget kap. Furatoknál, hornyoknál a feszültség helyileg többszörösére nőhet (**feszültséggyűjtő hely**, alaktényező α_k).',
        formulas: ['feszultseg-f'],
        related: ['alakvaltozas', 'hooke', 'folyashatar', 'biztonsagi-tenyezo', 'hajlitonyomatek', 'csavaras', 'ero', 'racsos-tarto'] },
      { id: 'alakvaltozas', term: 'Alakváltozás', en: 'strain (deformation)', topic: 'szilardsag',
        short: 'A test méretének és alakjának megváltozása terhelés hatására; fajlagos nyúlással (ε) és szögtorzulással (γ) mérjük.',
        text: 'A **fajlagos nyúlás** `ε = ΔL / L₀` dimenzió nélküli, gyakran %-ban vagy µm/m-ben adjuk meg. A **szögtorzulás** γ egy eredetileg derékszög megváltozása (radiánban), a csúsztatófeszültség okozza.\n\nHúzott rúd nemcsak megnyúlik, hanem keresztirányban **el is vékonyodik**: `ε_ker = −ν·ε`, ahol ν a **Poisson-tényező** (acélnál ≈ 0,3, gumiban ≈ 0,5, ami térfogatállandóságot jelent).\n\nAz alakváltozás lehet **rugalmas** (tehermentesítés után eltűnik) vagy **maradó (képlékeny)**. A mérnöki gyakorlatban nyúlásmérő bélyeggel (strain gauge) mérik: ez egy vékony fémfólia, amelynek ellenállása a nyúlással arányosan változik.',
        example: '2 m-es rúd 1 mm-t nyúlik: `ε = 1 / 2000 = 0,0005 = 0,05% = 500 µm/m`. Ha ν = 0,3, a 20 mm-es átmérő `20 · 0,3 · 0,0005 = 0,003 mm`-rel csökken.',
        pitfall: 'A fajlagos nyúlás nem a megnyúlás milliméterben! Két különböző hosszú, azonos feszültségű rúd ε-ja azonos, ΔL-je eltérő.',
        related: ['feszultseg', 'hooke', 'rugalmassagi-modulus', 'szakitodiagram'] },
      { id: 'hooke', term: 'Hooke-törvény', en: "Hooke's law", topic: 'szilardsag',
        short: 'Rugalmas tartományban a feszültség egyenesen arányos a fajlagos nyúlással: σ = E·ε.',
        prereq: ['fizika-bsc/harmonikus-rezges'],
        text: 'Robert Hooke 1676-ban „ut tensio, sic vis” (amilyen a nyúlás, olyan az erő) formában írta le rugókra. Rúdra átírva: `ΔL = F·L₀ / (E·A)`, ami egy rugó: a rúd **húzómerevsége** `s = E·A / L₀`.\n\nAz általánosított Hooke-törvény térbeli feszültségállapotra a Poisson-hatást is tartalmazza, pl. `ε_x = (σ_x − ν·(σ_y + σ_z)) / E`. Nyírásra `τ = G·γ`, ahol izotróp anyagra `G = E / (2·(1 + ν))`.',
        example: 'd = 20 mm, L = 2 m-es acélrúd, F = 30 kN: `ΔL = 30 000 · 2000 / (210 000 · 314,2) ≈ 0,91 mm`. A rúd merevsége `s = 210 000 · 314,2 / 2000 ≈ 33 000 N/mm`.',
        pitfall: 'A törvény csak az arányossági határig érvényes. A folyáshatár felett a σ–ε kapcsolat nemlineáris, és tehermentesítéskor maradó alakváltozás marad. Öntöttvas, beton, gumi már alacsony feszültségnél is eltér a lineáristól.',
        formulas: ['hooke-f'],
        related: ['rugalmassagi-modulus', 'feszultseg', 'alakvaltozas', 'szakitodiagram', 'szabad-rezges'] },
      { id: 'rugalmassagi-modulus', term: 'Rugalmassági modulus (Young-modulus)', en: "Young's modulus (modulus of elasticity)", topic: 'szilardsag',
        short: 'Az anyag merevségét jellemző állandó: a σ–ε diagram rugalmas szakaszának meredeksége.',
        text: 'Az E a **merevséget** méri, nem a szilárdságot. Jellemző értékek:\n\n- acél: 200–210 GPa (gyakorlatilag ötvözettől függetlenül!)\n- titán: ≈ 110 GPa\n- alumíniumötvözet: ≈ 70 GPa\n- beton: 25–40 GPa\n- fa (rostirányban): 10–15 GPa\n- polietilén: ≈ 1 GPa\n- gumi: ≈ 0,01 GPa\n\nMivel E az atomi kötések merevségéből adódik, hőkezeléssel, ötvözéssel alig változtatható. Ha egy acél alkatrész túl nagyot hajlik, a drágább, nagyobb szilárdságú acél **nem segít**: nagyobb keresztmetszet (másodrendű nyomaték) kell.',
        example: 'Azonos méretű acél és alumínium rúd ugyanattól az erőtől: az alumínium `210 / 70 = 3`-szor annyit nyúlik. Ezért kell egy alumíniumvázas kerékpárhoz vastagabb cső.',
        pitfall: 'Ne keverd össze a szilárdsággal (folyáshatár, R_m): egy nagy szilárdságú rugóacél és egy lágy szerkezeti acél E-je ugyanaz, csak az egyik sokkal tovább marad rugalmas.',
        formulas: ['hooke-f'],
        related: ['hooke', 'alakvaltozas', 'szakitodiagram', 'masodrendu-nyomatek'] },
      { id: 'folyashatar', term: 'Folyáshatár', en: 'yield strength', topic: 'szilardsag',
        short: 'Az a feszültség, amelynél az anyagban jelentős maradó (képlékeny) alakváltozás kezdődik.',
        text: 'Lágyacélnál a szakítódiagramon jól látható „lépcső”: ez a **felső folyáshatár (R_eH)**. Sok anyagnál (alumínium, nemesített acél) nincs ilyen lépcső, ezért az **egyezményes folyáshatárt** használjuk: R_{p0,2} az a feszültség, amelynél 0,2% maradó nyúlás marad.\n\nSzívós anyagoknál ez a méretezés alapja, mert az alkatrész a folyás után már maradandóan deformálódik, vagyis használhatatlan. A szerkezeti acélok jelölése is erre utal: **S235** (R_eH = 235 MPa), **S355** (355 MPa).',
        example: 'd = 20 mm-es S235 rúd a folyáshatárt `F = 235 · 314,2 ≈ 73,8 kN` erőnél éri el. 30 kN-nal terhelve tehát `73,8 / 30 ≈ 2,46`-szoros a tartalék.',
        pitfall: 'Rideg anyagnak (öntöttvas, kerámia, üveg) nincs folyáshatára: maradó alakváltozás nélkül törik. Ilyenkor a szakítószilárdság a határ, nagyobb biztonsági tényezővel.',
        related: ['szakitodiagram', 'biztonsagi-tenyezo', 'feszultseg', 'hooke'] },
      { id: 'szakitodiagram', term: 'Szakítódiagram', en: 'stress–strain curve (tensile test diagram)', topic: 'szilardsag',
        short: 'A szakítóvizsgálat eredménye: a próbatestben ébredő feszültség a fajlagos nyúlás függvényében, a terheléstől a szakadásig.',
        visual: ssSvg, caption: 'Lágyacél szakítódiagramja: rugalmas szakasz, folyás, felkeményedés, kontrakció és szakadás. Tehermentesítéskor a visszaút párhuzamos a rugalmas egyenessel.',
        text: 'A szabványos próbatestet (pl. MSZ EN ISO 6892-1) lassan, egyenletesen húzzák, közben mérik az erőt és a megnyúlást. Leolvasható jellemzők:\n\n- **E**: a kezdeti egyenes meredeksége;\n- **R_eH** vagy **R_{p0,2}**: folyáshatár;\n- **R_m**: szakítószilárdság, a legnagyobb erő osztva az **eredeti** keresztmetszettel;\n- **A%**: szakadási nyúlás, a szívósság mérőszáma;\n- **Z%**: kontrakció, a keresztmetszet-csökkenés a szakadás helyén.\n\nA diagram a végén azért esik le, mert a mérnöki feszültséget az eredeti A₀-lal számoljuk, a nyakban viszont a valódi keresztmetszet már sokkal kisebb. A **valódi** feszültség egészen a szakadásig nő.',
        example: 'S235 acél: R_eH ≥ 235 MPa, R_m = 360–510 MPa, A ≥ 26%. Egy 50 mm-es mérőhossz tehát szakadásig legalább 13 mm-t nyúlik: ez a szívósság a földrengésálló acélszerkezetek alapja.',
        pitfall: 'A diagram görbe alatti területe az egységnyi térfogatban elnyelhető energia (szívósság). A legnagyobb R_m-ű anyag nem feltétlenül a legjobb: ha A% kicsi, ridegen, figyelmeztetés nélkül törik.',
        related: ['folyashatar', 'hooke', 'rugalmassagi-modulus', 'alakvaltozas', 'biztonsagi-tenyezo'] },
      { id: 'biztonsagi-tenyezo', term: 'Biztonsági tényező', en: 'safety factor (factor of safety)', topic: 'szilardsag',
        short: 'A határfeszültség és a megengedett (vagy a ténylegesen ébredő) feszültség hányadosa; az bizonytalanságok fedezésére szolgáló tartalék.',
        text: 'A **megengedett feszültség**: `σ_meg = R_eH / n` (szívós anyag) vagy `R_m / n` (rideg anyag). Az n fedezi a terhelés, az anyagjellemzők, a gyártás és a számítási modell bizonytalanságait. Tipikus értékek: szívós acél statikus terhelésnél 1,5–2, rideg anyagnál 3–5, emelőgépek kötelénél 5 felett.\n\nAz építőipari Eurocode a **parciális tényezők** módszerét használja: a terheket növeli (pl. γ_G = 1,35 állandó, γ_Q = 1,5 esetleges teherre), az anyag szilárdságát pedig csökkenti (γ_M). A gépészetben fárasztó (váltakozó) terhelésnél a kifáradási határral kell számolni, ami jóval kisebb a folyáshatárnál.',
        example: 'S235, n = 1,5: `σ_meg = 235 / 1,5 = 156,7 MPa`. 30 kN húzóerőhöz szükséges keresztmetszet `A = 30 000 / 156,7 = 191,5 mm²`, azaz `d = √(4A/π) = 15,6 mm` → a következő szabványos méret: **d = 16 mm**.',
        pitfall: 'A nagy biztonsági tényező nem „ingyen” biztonság: nehéz, drága szerkezetet ad, és elfedheti a rossz modellt. A kifáradás és a kihajlás n = 2 mellett is tönkreteheti az alkatrészt, ha nem ellenőrizzük külön.',
        formulas: ['feszultseg-f'],
        related: ['folyashatar', 'feszultseg', 'szakitodiagram', 'keresztmetszeti-tenyezo'] },

      /* ----- Hajlítás és csavarás ----- */
      { id: 'hajlitonyomatek', term: 'Hajlítónyomaték és hajlítófeszültség', en: 'bending moment and bending stress', topic: 'hajlitas',
        short: 'A rúd egy keresztmetszetében a rúdtengelyre merőleges tengely körül forgató belső nyomaték; a keresztmetszet egyik oldalán húzó-, a másikon nyomófeszültséget kelt.',
        prereq: ['analizis/derivalt'],
        text: 'Hajlításkor a keresztmetszetek síkok maradnak és elfordulnak (**Bernoulli–Navier-hipotézis**). Az egyik oldali szálak megnyúlnak, a másikak megrövidülnek, köztük van a feszültségmentes **semleges réteg**, amely a súlyponton megy át.\n\nA normálfeszültség a semleges tengelytől mért y távolsággal lineárisan nő: `σ(y) = M_h·y / I`. Ebből a legnagyobb érték `σ_max = M_h / K`.\n\nA rúd tengelyének görbülete `1/ρ = M_h / (I·E)`, ebből integrálással jön a **lehajlás**. Kéttámaszú tartó közepén ható F erőnél a legnagyobb lehajlás `f = F·L³ / (48·I·E)`.',
        example: 'A 6 m-es, F = 12 kN-nal terhelt tartónál M_max = 16 kN·m. Ha σ_meg = 156,7 MPa, a szükséges `K = 16·10⁶ / 156,7 ≈ 102·10³ mm³` → **IPE 160** (K = 108,7·10³ mm³) megfelel, benne `σ ≈ 147 MPa`.',
        pitfall: 'A hajlítónyomaték belső erő: egy adott keresztmetszetre vonatkozik, és egy tartó mentén pontról pontra változik. Ne keverd össze egy külső koncentrált nyomatékkal! A méretezés a **legnagyobb** |M| helyén történik.',
        formulas: ['hajlitas-f'],
        related: ['igenybevetel-abra', 'masodrendu-nyomatek', 'keresztmetszeti-tenyezo', 'nyomatek', 'tamasz', 'feszultseg'] },
      { id: 'igenybevetel-abra', term: 'Nyíróerő- és nyomatéki ábra', en: 'shear force and bending moment diagram', topic: 'hajlitas',
        short: 'A tartó mentén a belső nyíróerő (V) és a hajlítónyomaték (M) változását mutató grafikon; megmutatja a veszélyes keresztmetszetet.',
        prereq: ['analizis/riemann-integral'],
        visual: vmSvg, caption: 'Az előző kéttámaszú tartó (L = 6 m, F = 12 kN az A-tól 2 m-re) igénybevételi ábrái.',
        text: 'Egy x helyen képzeletben elvágjuk a tartót, és az egyik részre felírjuk az egyensúlyt: ebből jön V(x) és M(x). A három összefüggés (Zsuravszkij-tétel):\n\n- `dV/dx = −q(x)`: a nyíróerő meredeksége a megoszló teher;\n- `dM/dx = V(x)`: a nyomaték meredeksége a nyíróerő;\n- koncentrált erőnél V ugrik, koncentrált nyomatéknál M ugrik.\n\nKövetkezmény: ahol **V előjelet vált (átmegy nullán)**, ott M-nek szélsőértéke van. Teher nélküli szakaszon V állandó és M lineáris; egyenletes megoszló teher alatt V lineáris és M parabola.',
        example: '0 < x < 2 m: `V = +8 kN`, `M = 8x`. 2 < x < 6 m: `V = 8 − 12 = −4 kN`, `M = 8x − 12(x − 2)`. A legnagyobb nyomaték x = 2 m-nél: `M = 16 kN·m`. Egyenletes q-val terhelt kéttámaszú tartónál: `M_max = q·L² / 8` a közepén.',
        pitfall: 'Az előjelkonvenció tankönyvenként eltér (melyik oldalra rajzoljuk M-et). A lényeg a következetesség, és hogy az ábráról leolvasható legyen, melyik szál húzott.',
        related: ['hajlitonyomatek', 'tamasz', 'egyensuly', 'keresztmetszeti-tenyezo'] },
      { id: 'masodrendu-nyomatek', term: 'Másodrendű nyomaték (keresztmetszeti tehetetlenségi nyomaték)', en: 'second moment of area (area moment of inertia)', topic: 'hajlitas',
        short: 'A keresztmetszet hajlítással szembeni merevségét jellemző geometriai mennyiség: I = ∫ y² dA.',
        prereq: ['analizis/riemann-integral'],
        visual: csSvg, caption: 'Ugyanannyi anyag, más elrendezés: az élére állított téglalap másodrendű nyomatéka 9-szerese a fektetettnek.',
        text: 'Mértékegysége mm⁴ (vagy cm⁴). Azt méri, milyen messze van az anyag a semleges tengelytől, **négyzetesen** súlyozva. Nevezetes képletek:\n\n- téglalap (b széles, h magas): `I = b·h³ / 12`\n- tömör kör: `I = π·d⁴ / 64`\n- cső: `I = π·(D⁴ − d⁴) / 64`\n\nÖsszetett keresztmetszetnél a **Steiner-tétel**: `I = I_S + A·t²`, ahol t a rész saját súlypontjának távolsága a közös tengelytől. Ezért hatékony az I-szelvény: az anyag zöme az övekben, messze a tengelytől van.',
        example: '40 × 120 mm-es léc élére állítva: `I = 40 · 120³ / 12 = 5,76·10⁶ mm⁴`; fektetve: `I = 120 · 40³ / 12 = 0,64·10⁶ mm⁴`. Arányuk `(120/40)² = 9`: álló helyzetben 9-szer kisebb a lehajlás.',
        pitfall: 'Nem tévesztendő össze a tömegre vonatkozó tehetetlenségi nyomatékkal (Θ, kg·m²), amely a forgómozgás tehetetlenségét méri. A két fogalom matematikailag rokon, fizikailag más.',
        related: ['keresztmetszeti-tenyezo', 'hajlitonyomatek', 'rugalmassagi-modulus', 'tehetetlensegi-nyomatek', 'csavaras'] },
      { id: 'keresztmetszeti-tenyezo', term: 'Keresztmetszeti tényező', en: 'section modulus', topic: 'hajlitas',
        short: 'A másodrendű nyomaték és a legtávolabbi szál távolságának hányadosa, K = I / e_max; ez határozza meg a hajlítási szilárdságot.',
        text: 'Mértékegysége mm³. A szelvénytáblázatok (IPE, HEA, U-acél, zártszelvény) közvetlenül megadják, a jelölése a szabványokban gyakran **W_el** (rugalmas) vagy **W_pl** (képlékeny). Nevezetes értékek:\n\n- téglalap: `K = b·h² / 6`\n- tömör kör: `K = π·d³ / 32`\n\nMéretezéskor a **szükséges** keresztmetszeti tényezőből indulunk: `K_szüks = M_max / σ_meg`, majd a táblázatból kiválasztjuk az első megfelelő szelvényt.',
        example: 'A 40 × 120-as léc élére állítva: `K = 5,76·10⁶ / 60 = 96·10³ mm³`, fektetve: `K = 0,64·10⁶ / 20 = 32·10³ mm³`. A szilárdság aránya így 3 (a merevségé 9).',
        pitfall: 'Aszimmetrikus szelvénynél (pl. T, U) a két szélső szál távolsága eltér, így két K érték van: a húzott és a nyomott oldalé. Öntöttvasnál, amely nyomásra sokkal erősebb, ez döntő.',
        formulas: ['hajlitas-f'],
        related: ['masodrendu-nyomatek', 'hajlitonyomatek', 'biztonsagi-tenyezo', 'igenybevetel-abra'] },
      { id: 'csavaras', term: 'Csavarás', en: 'torsion', topic: 'hajlitas',
        short: 'Igénybevétel, amelyben a rúdra a tengelye körül forgató nyomaték hat; a keresztmetszetben csúsztatófeszültség ébred, a rúd elcsavarodik.',
        prereq: ['lecke:autoszereles/eroatvitel'],
        text: 'Körszelvényű tengelyben a csúsztatófeszültség a középponttól mért távolsággal lineárisan nő, a palástnál a legnagyobb: `τ_max = T / K_p`, ahol `K_p = π·d³ / 16`. Az elcsavarodás szöge `φ = T·L / (G·I_p)`, `I_p = π·d⁴ / 32`.\n\nA hajtótengelyek méretezésének alapja a teljesítmény: `P = T·ω`. Kis fordulatszámon ugyanakkora teljesítményhez nagy nyomaték kell, ezért a sebességváltó utáni tengelyek vastagabbak.\n\nA **cső** csavarásra különösen hatékony, mert a belső, alig terhelt anyagot spóroljuk meg. Nyitott szelvények (I, U, L) csavarómerevsége viszont nagyon kicsi.',
        example: '50 kW-os motor 1000 1/min-en: `ω = 104,7 1/s`, `T = 50 000 / 104,7 ≈ 477 N·m`. Egy 40 mm-es tömör tengelyben ez `τ = 477 000 / 12 566 ≈ 38 MPa`.',
        pitfall: 'Nem kör keresztmetszetnél (téglalap, nyitott szelvény) a keresztmetszetek **vetemednek**, és a fenti képletek nem érvényesek; ilyenkor korrekciós tényezős táblázatok kellenek.',
        formulas: ['csavaras-f'],
        related: ['nyomatek', 'eropar', 'masodrendu-nyomatek', 'feszultseg', 'merev-test'], models: ['benzinmotor', 'elektromos-auto'] },

      /* ----- Kinematika és kinetika ----- */
      { id: 'merev-test', term: 'Merev test mozgása és szögsebesség', en: 'rigid-body motion, angular velocity and acceleration', topic: 'kinetika',
        short: 'Olyan test mozgása, amelynek pontjai közti távolságok nem változnak; síkban egy pont haladó mozgására és egy körülötte történő, ω szögsebességű forgásra bontható.',
        prereq: ['lecke:fizika/mertekegysegek-mozgas', 'analizis/derivalt'],
        text: 'A merev test síkban **3 szabadságfokú** (x, y, φ). Bármely két pontjának sebessége között fennáll:\n\n`v_B = v_A + ω × r_AB`\n\nMinden pillanatban létezik egy **pillanatnyi forgáspont (sebességpólus)**, amelynek sebessége nulla; a test pillanatnyilag e körül tisztán forog. Csúszás nélkül gördülő keréknél ez a talajjal érintkező pont.\n\nA kinetikai alapegyenletek (síkban): `m·a_S = ΣF` (a súlypont úgy mozog, mintha ott lenne az egész tömeg) és `Θ_S·ε = ΣM_S` (forgás a súlypont körül).\n\n**Szögsebesség és szöggyorsulás.** `ω = dφ/dt` (rad/s), `ε = dω/dt` (rad/s²). A gépészetben a fordulatszámot n-nel jelöljük 1/min-ben: `ω = 2π·n / 60`.\n\nA test egy r sugarú pontjának\n\n- kerületi sebessége: `v = r·ω`\n- érintőirányú gyorsulása: `a_t = r·ε`\n- normális (centripetális) gyorsulása: `a_n = r·ω² = v² / r`, a forgástengely felé mutat.\n\nTérben ω vektor, iránya a forgástengely (jobbkéz-szabály).',
        example: 'Autókerék, r = 0,3 m, v = 20 m/s (72 km/h): `ω = v / r = 66,7 1/s`. A kerék legfelső pontja `2v = 40 m/s`-mal halad, a talajjal érintkező pont pillanatnyi sebessége 0. Motortengely, n = 3000 1/min: `ω = 2π · 3000 / 60 = 314,2 1/s`. Egy r = 0,1 m sugarú pont kerületi sebessége `v = 31,4 m/s`, centripetális gyorsulása `a_n = 0,1 · 314,2² ≈ 9870 m/s²`, vagyis kb. 1000 g!',
        pitfall: 'A forgómozgás egyenletét (Θ·ε = ΣM) gyorsuló testnél csak a **súlypontra** vagy egy álló tengelyre szabad felírni; tetszőleges pontra további tagok kellenek. A rad/s és az 1/min nem cserélhető fel egy 2π/60 ≈ 0,105 szorzó nélkül. A radián „dimenzió nélküli”, ezért ω mértékegysége 1/s is lehet, de nem Hz: `ω = 2π·f`.',
        related: ['tehetetlensegi-nyomatek', 'perdulet', 'munka-energia', 'csavaras', 'szabad-rezges'], models: ['benzinmotor'] },
      { id: 'tehetetlensegi-nyomatek', term: 'Tehetetlenségi nyomaték', en: 'mass moment of inertia', topic: 'kinetika',
        short: 'A test forgómozgással szembeni tehetetlenségének mértéke: Θ = Σ m·r², azaz minél messzebb van a tömeg a tengelytől, annál nehezebb felpörgetni.',
        prereq: ['fizika-bsc/tehetetlensegi-nyomatek', 'analizis/riemann-integral'],
        text: 'A forgómozgás „tömege”: `ΣM = Θ·ε` a Newton-törvény (`ΣF = m·a`) forgómozgásbeli párja. Néhány test a saját súlypontján átmenő tengelyre:\n\n- tömör tárcsa, henger: `½·m·r²`\n- vékony gyűrű: `m·r²`\n- vékony rúd, merőleges tengely: `m·L² / 12`\n- tömör gömb: `2/5·m·r²`\n\n**Steiner-tétel**: párhuzamos, d távolságú tengelyre `Θ = Θ_S + m·d²`. A **tehetetlenségi sugár** i, amelyre `Θ = m·i²`.',
        example: 'Lendkerék-tárcsa: m = 10 kg, r = 0,2 m → `Θ = 0,2 kg·m²`. Ha ugyanennyi tömeg egy gyűrűben a peremen van: `Θ = 0,4 kg·m²`, kétszeres. Rúd a végpontja körül (Steiner): `m·L²/12 + m·(L/2)² = m·L²/3`.',
        pitfall: 'A tehetetlenségi nyomaték mindig egy **adott tengelyre** vonatkozik; a „test tehetetlenségi nyomatéka” tengely megadása nélkül értelmetlen.',
        formulas: ['tehetetlenseg-f'],
        related: ['perdulet', 'munka-energia', 'merev-test', 'masodrendu-nyomatek'], models: ['benzinmotor'] },
      { id: 'perdulet', term: 'Perdület (impulzusnyomaték)', en: 'angular momentum', topic: 'kinetika',
        short: 'A forgómozgás „lendülete”: tengely körül forgó merev testre L = Θ·ω; megváltozását a külső erők nyomatéka okozza.',
        prereq: ['fizika-bsc/impulzusmomentum'],
        text: 'A **perdülettétel**: `dL/dt = ΣM_külső`. Ha a külső nyomatékok összege nulla, a perdület **állandó** (perdületmegmaradás).\n\nMérnöki következmények:\n\n- A **giroszkóp** forgástengelye megtartja irányát; a tengelyre ható nyomaték nem billenti, hanem **precesszióra** kényszeríti (ezért stabil a gyorsan guruló kerékpár).\n- Ha egy forgó rendszer Θ-ja csökken, ω nő: a műkorcsolyázó behúzza a karját.\n- Impulzusszerű fékezésnél `M·Δt = Θ·Δω` (perdület-impulzus).',
        example: 'A 0,2 kg·m²-es lendkerék 3000 1/min-en: `L = 0,2 · 314,2 = 62,8 kg·m²/s`. Ha 2 s alatt kell megállítani, átlagosan `M = 62,8 / 2 = 31,4 N·m` fékezőnyomaték kell.',
        pitfall: 'A perdület vektor; egy tengely irányának megváltoztatása is nyomatékot igényel, még ha ω nagysága állandó is. Ez okozza a forgó alkatrészek csapágyaiban a giroszkópos terhelést.',
        related: ['tehetetlensegi-nyomatek', 'merev-test', 'munka-energia'] },
      { id: 'munka-energia', term: 'Munka–energia tétel merev testre', en: 'work–energy principle for rigid bodies', topic: 'kinetika',
        short: 'A testre ható erők és nyomatékok munkájának összege egyenlő a mozgási energia megváltozásával: W = E_k2 − E_k1.',
        prereq: ['lecke:fizika/energia-munka', 'fizika-bsc/munkatetel'],
        text: 'Merev test mozgási energiája a súlyponti haladó és a súlypont körüli forgó rész összege:\n\n`E_k = ½·m·v_S² + ½·Θ_S·ω²`\n\nA munka erőre `W = ∫ F·ds`, nyomatékra `W = ∫ M dφ`. Konzervatív erők (súlyerő, rugóerő) munkája helyett potenciális energiával is számolhatunk: `E_k1 + E_p1 + W_nem-konz = E_k2 + E_p2`.\n\nA teljesítmény `P = F·v` haladó, illetve `P = M·ω` forgó mozgásnál.',
        example: 'A 0,2 kg·m²-es lendkerék energiája 3000 1/min-en: `E = ½ · 0,2 · 314,2² ≈ 9,87 kJ`. Egy henger lejtőn legördülve: az energia `m·g·h = ½·m·v² + ½·(½·m·r²)·(v/r)²` → `v = √(4gh/3)`, kisebb, mint csúszó testnél `√(2gh)`.',
        pitfall: 'Gördülő testnél nem szabad elfelejteni a forgási energiát: egy kerék vagy lendkerék felgyorsítása több energiát igényel, mint a tömege alapján gondolnánk (járműveknél ez a „redukált tömeg”).',
        formulas: ['munkatetel-f'],
        related: ['tehetetlensegi-nyomatek', 'perdulet', 'merev-test', 'szabad-rezges'], models: ['elektromos-auto'] },

      /* ----- Rezgések ----- */
      { id: 'szabad-rezges', term: 'Szabad rezgés és sajátfrekvencia', en: 'free vibration and natural frequency', topic: 'rezges',
        short: 'Külső gerjesztés nélküli rezgés, amelyet egy kezdeti kitérés vagy sebesség indít el; a rendszer a sajátfrekvenciáján rezeg, tömeg–rugó rendszerre ω₀ = √(s/m).',
        prereq: ['fizika-bsc/harmonikus-rezges', 'analizis/linearis-de', 'linearis-algebra/sajatertek'],
        visual: oscSvg, caption: 'Egy szabadságfokú tömeg–rugó–csillapító rendszer és szabad rezgése.',
        formulas: ['sajatfrekvencia-f'],
        text: 'A legegyszerűbb modell az **egy szabadságfokú** tömeg–rugó rendszer. Mozgásegyenlete (Newton II. a szabadtest-ábrából):\n\n`m·ẍ + k·ẋ + s·x = 0`\n\nahol s a rugómerevség, k a csillapítási tényező. Csillapítás nélkül (k = 0) a megoldás harmonikus: `x(t) = A·cos(ω₀t + φ)`, ahol A és φ a kezdeti feltételekből adódik.\n\nValós gépek **több szabadságfokúak**: n szabadságfokhoz n sajátfrekvencia és n **rezgésalak (módus)** tartozik. Ezeket a `(S − ω²·M)·x = 0` sajátérték-feladat adja (S: merevségi, M: tömegmátrix).\n\n**Sajátfrekvencia.** A sajátfrekvencia csak a rendszer **merevségétől és tömegétől** függ, a kitérés nagyságától nem. Merevebb rendszer → magasabb, nehezebb → alacsonyabb sajátfrekvencia.\n\nForgó rendszerre (pl. tengely + tárcsa csavarólengése): `ω₀ = √(s_t / Θ)`, ahol s_t a csavarómerevség (N·m/rad).\n\nGyakorlati becslés a statikus behajlásból: `f₀ ≈ 15,8 / √(δ_st [mm])` Hz. A mérnöki tervezés egyik fő szabálya, hogy az üzemi gerjesztés frekvenciája **ne essen** a sajátfrekvencia közelébe.',
        example: 'Egy 2 kg-os tömeget 800 N/m-es rugón 1 cm-re kitérítünk és elengedünk: `x(t) = 0,01·cos(20t)` m, a legnagyobb sebesség `0,01 · 20 = 0,2 m/s`. Személyautó egy kerékre jutó felépítménytömege 300 kg, rugómerevsége 30 000 N/m: `ω₀ = √100 = 10 1/s`, `f₀ ≈ 1,6 Hz`. A kényelmes futóművek 1–1,5 Hz körül vannak, mert ez az emberi járás ritmusához közeli, megszokott tartomány.',
        pitfall: 'A súlyerő függőleges rugónál csak az egyensúlyi helyzetet tolja el (δ_st = m·g / s), a rezgés frekvenciáját nem változtatja meg, ha a kitérést az új egyensúlyi helyzettől mérjük. ω₀ (rad/s) és f₀ (Hz) között 2π a szorzó; ennek elhagyása 6-szoros hibát okoz. Csillapított rendszer valódi rezgési frekvenciája kicsit kisebb: `ω_d = ω₀·√(1 − ζ²)`.',
        related: ['csillapitas', 'rezonancia', 'hooke', 'munka-energia', 'merev-test'] },
      { id: 'csillapitas', term: 'Csillapítás', en: 'damping', topic: 'rezges',
        short: 'A rezgés energiájának disszipációja (általában hővé alakulása), amely miatt a szabad rezgés amplitúdója idővel csökken.',
        visual: dampSvg, caption: 'Kezdeti kitérésből elengedett rendszer válasza különböző csillapítási tényezőknél.',
        text: 'A leggyakoribb modell a sebességgel arányos (**viszkózus**) csillapítás: `F_cs = −k·ẋ`. Jellemzője a dimenzió nélküli **csillapítási tényező (Lehr-féle csillapítás)**:\n\n`ζ = k / (2·√(s·m))`\n\n- ζ < 1: **gyengén csillapított**, lecsengő rezgés;\n- ζ = 1: **kritikus csillapítás**, a leggyorsabb visszatérés túllendülés nélkül;\n- ζ > 1: **túlcsillapított**, lassú, kúszó visszatérés.\n\nA csillapítás mérhető két egymást követő amplitúdó arányából (**logaritmikus dekrementum**): `δ = ln(x_n / x_(n+1)) ≈ 2π·ζ`. Acélszerkezetek ζ-ja csak 0,5–2%, ezért hajlamosak a rezonanciára.',
        example: 'Az autó futóműve (s = 30 000 N/m, m = 300 kg) ζ = 0,3-hoz `k = 0,3 · 2 · √(30 000 · 300) = 1800 N·s/m` lengéscsillapítót igényel. A csillapított frekvencia `ω_d = 10 · √(1 − 0,09) ≈ 9,54 1/s`.',
        pitfall: 'A lengéscsillapító nem rugó: nem tartja meg a kocsit, csak a sebességgel arányos erőt fejt ki. Kopott lengéscsillapítónál az autó egy úthiba után többször „ugrál”: ζ lecsökkent.',
        related: ['szabad-rezges', 'rezonancia'], models: ['elektromos-auto'] },
      { id: 'rezonancia', term: 'Rezonancia', en: 'resonance', topic: 'rezges',
        short: 'Kényszerrezgésnél fellépő jelenség: ha a gerjesztés frekvenciája megközelíti a sajátfrekvenciát, a rezgés amplitúdója erősen megnő.',
        visual: resSvg, caption: 'Harmonikus erőgerjesztés nagyítási görbéi: kis csillapításnál a rezonanciacsúcs nagyon magas.',
        text: 'Harmonikus gerjesztésnél (`F(t) = F₀·cos ωt`) az állandósult rezgés amplitúdója a statikus kitérés (`x_st = F₀ / s`) V-szerese:\n\n`V = 1 / √((1 − η²)² + (2ζη)²)`, ahol `η = ω / ω₀`.\n\n- η ≪ 1: a rendszer „követi” a terhelést, V ≈ 1;\n- η ≈ 1: **rezonancia**, `V ≈ 1 / (2ζ)`;\n- η > √2: **rezgésszigetelés**, V < 1, a rendszer „nem éri utol” a gerjesztést.\n\nAz utóbbit használják ki a gépek rugalmas alátámasztásánál: a sajátfrekvenciát a gerjesztés alá hangolják.',
        example: 'ζ = 0,3 mellett a rezonanciacsúcs `V ≈ 1 / 0,6 ≈ 1,7`, ζ = 0,05-nél már `V ≈ 10`. Egy 4 hengeres négyütemű motor fő gerjesztése a fordulatszám kétszerese: 3000 1/min-en `2 · 50 = 100 Hz`, a motortartó bakok sajátfrekvenciáját ettől távol kell tartani.',
        pitfall: 'Egy rezgésszigetelt gép felfutáskor **áthalad** a rezonancián; ha ez lassan történik, rövid ideig nagy kitérés lép fel. Ezért kell némi csillapítás a rugalmas ágyazásba is.',
        related: ['szabad-rezges', 'csillapitas'], models: ['benzinmotor'] }
    ]
  });
})();
