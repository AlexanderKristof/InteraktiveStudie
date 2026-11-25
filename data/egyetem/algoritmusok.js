/* Egyetem: Algoritmusok és adatszerkezetek (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';
  var BLUE = '#2f7bf6', RED = '#e5484d', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6', TEAL = '#0e9aa7';

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
    s = s || 8;
    return '<path d="M' + r1(x) + ' ' + r1(y) + ' L' + r1(x - s * Math.cos(ang - 0.4)) + ' ' + r1(y - s * Math.sin(ang - 0.4)) + ' L' + r1(x - s * Math.cos(ang + 0.4)) + ' ' + r1(y - s * Math.sin(ang + 0.4)) + ' z" fill="' + col + '"/>';
  }
  function arrow(x1, y1, x2, y2, col, w, dash) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 1.5) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  function axes(xa, ya, xb, yb, x0, y0) { return arrow(xa, ya, xb, ya, 'var(--fg-2)') + arrow(x0, y0, x0, yb, 'var(--fg-2)'); }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (cls || T)) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  /* körcsúcs: kitöltött (szín) vagy üres (felület) */
  function vtx(x, y, label, col, r) {
    r = r || 17;
    return '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="' + r + '" fill="' + (col || 'var(--surface)') + '" stroke="' + (col ? col : 'var(--fg-2)') + '" stroke-width="2"/>' +
      txt(x, y + 4.5, label, T, 13, 'middle', col ? 'fill="#fff" font-weight="700"' : 'font-weight="700"');
  }
  function edge(x1, y1, x2, y2, col, w, dash) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + (col || 'var(--fg-2)') + '" stroke-width="' + (w || 1.8) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  /* tömbcella */
  function cell(x, y, w, h, label, fill, tcol, stroke) {
    return '<rect x="' + r1(x) + '" y="' + r1(y) + '" width="' + w + '" height="' + h + '" rx="3" fill="' + (fill || 'var(--surface)') + '" stroke="' + (stroke || 'var(--fg-2)') + '" stroke-width="1.5"/>' +
      txt(x + w / 2, y + h / 2 + 4.5, label, T, 12, 'middle', tcol ? 'fill="' + tcol + '" font-weight="700"' : 'font-family="monospace"');
  }

  /* ---------- 1. Növekedési rendek ---------- */
  var gf = frame(0, 16, 0, 70, 52, 14, 440, 200);
  var growth = [
    [function () { return 1; }, '#8a6d1f', '1'],
    [function (n) { return Math.log(n) / Math.LN2; }, GREEN, 'log₂ n'],
    [function (n) { return n; }, BLUE, 'n'],
    [function (n) { return n * Math.log(n) / Math.LN2; }, PURPLE, 'n·log₂ n'],
    [function (n) { return n * n; }, ORANGE, 'n²'],
    [function (n) { return Math.pow(2, n); }, RED, '2ⁿ']
  ];
  var growthSvg = '<svg viewBox="0 0 560 262">' +
    [4, 8, 12, 16].map(function (v) { return '<line x1="' + gf.X(v) + '" y1="' + gf.Y(0) + '" x2="' + gf.X(v) + '" y2="' + gf.Y(70) + '" stroke="var(--line)"/>' + txt(gf.X(v), gf.Y(0) + 16, v, M, 11, 'middle'); }).join('') +
    [20, 40, 60].map(function (v) { return '<line x1="' + gf.X(0) + '" y1="' + gf.Y(v) + '" x2="' + gf.X(16) + '" y2="' + gf.Y(v) + '" stroke="var(--line)"/>' + txt(gf.X(0) - 6, gf.Y(v) + 4, v, M, 11, 'end'); }).join('') +
    axes(52, gf.Y(0), 510, 8, 52, gf.Y(0)) + txt(508, gf.Y(0) + 16, 'n', M, 13, 'end') + txt(60, 12, 'lépésszám', M, 12);
  growth.forEach(function (g) {
    growthSvg += '<path d="' + curve(gf, g[0], 0.5, 16, 300, 0, 70) + '" fill="none" stroke="' + g[1] + '" stroke-width="2.6"/>';
    var lx, ly;
    if (g[0](16) <= 70) { lx = gf.X(16) + 6; ly = gf.Y(g[0](16)) + 4; }
    else { var lo = 1, hi = 16; for (var k = 0; k < 40; k++) { var mid = (lo + hi) / 2; if (g[0](mid) < 70) lo = mid; else hi = mid; } lx = gf.X(lo) + 6; ly = gf.Y(70) + 12; }
    growthSvg += txt(lx, ly, g[2], T, 12, null, 'fill="' + g[1] + '" font-weight="700"');
  });
  growthSvg += txt(300, 254, 'n = 1000 esetén: log₂ n ≈ 10,  n·log₂ n ≈ 10 000,  n² = 10⁶,  2ⁿ ≈ 10³⁰¹', M, 11, 'middle') + '</svg>';

  /* ---------- 2. Láncolt lista beszúrással ---------- */
  function lnode(x, y, v, dashed, col) {
    return '<g stroke="' + (col || 'var(--fg-2)') + '" stroke-width="2" fill="var(--surface)"' + (dashed ? ' stroke-dasharray="5 3"' : '') + '><rect x="' + x + '" y="' + y + '" width="80" height="36" rx="4"/><line x1="' + (x + 52) + '" y1="' + y + '" x2="' + (x + 52) + '" y2="' + (y + 36) + '"/></g>' +
      txt(x + 26, y + 23, v, T, 14, 'middle', 'font-weight="700"') + '<circle cx="' + (x + 66) + '" cy="' + (y + 18) + '" r="4" fill="' + (col || 'var(--fg-2)') + '"/>';
  }
  var lx = [40, 160, 300, 420], lv = ['12', '7', '33', '41'];
  var listSvg = '<svg viewBox="0 0 560 220">' + txt(40, 22, 'fej (head)', M, 12) + arrow(60, 28, 60, 52, 'var(--fg-2)', 2);
  lx.forEach(function (x, i) { listSvg += lnode(x, 56, lv[i]); });
  listSvg += arrow(106, 74, 158, 74, 'var(--fg-2)', 2) +
    edge(226, 74, 270, 74, RED, 2, '5 4') + arrow(270, 74, 298, 74, RED, 2, '5 4') + txt(262, 62, '✕', T, 16, 'middle', 'fill="' + RED + '" font-weight="700"') +
    arrow(366, 74, 418, 74, 'var(--fg-2)', 2) + edge(486, 74, 512, 74, 'var(--fg-2)', 2) + txt(530, 79, '⌀', T, 16, 'middle') + txt(530, 104, 'null', M, 11, 'middle') +
    lnode(200, 150, '25', true, GREEN) +
    '<path d="M226 74 C 236 110, 210 120, 214 146" fill="none" stroke="' + GREEN + '" stroke-width="2.2"/>' + head(214, 148, Math.PI / 2, GREEN) +
    '<path d="M266 168 C 330 168, 330 120, 330 96" fill="none" stroke="' + GREEN + '" stroke-width="2.2"/>' + head(330, 94, -Math.PI / 2, GREEN) +
    txt(40, 160, '1. új.next ← p.next', T, 12, null, 'fill="' + GREEN + '"') + txt(40, 178, '2. p.next ← új', T, 12, null, 'fill="' + GREEN + '"') +
    txt(355, 150, 'adat | következő', M, 11) + txt(355, 168, 'beszúrás O(1), ha p ismert', M, 11) + txt(355, 186, 'az i-edik elem elérése O(n)', M, 11) + '</svg>';

  /* ---------- 3. Verem és sor ---------- */
  var sqSvg = '<svg viewBox="0 0 560 230">' +
    '<path d="M50 60 V210 H150 V60" fill="none" stroke="var(--fg-2)" stroke-width="2.5"/>';
  ['A', 'B', 'C', 'D'].forEach(function (s, i) { sqSvg += cell(56, 176 - i * 34, 88, 30, s, i === 3 ? ORANGE : null, i === 3 ? '#fff' : null); });
  sqSvg += arrow(176, 40, 128, 66, GREEN, 2.2) + txt(180, 40, 'push (betesz)', T, 12, null, 'fill="' + GREEN + '"') +
    arrow(80, 66, 46, 30, RED, 2.2) + txt(10, 22, 'pop (kivesz)', T, 12, null, 'fill="' + RED + '"') +
    txt(160, 82, '← teteje (top)', M, 11) + txt(100, 226, 'VEREM: LIFO', T, 13, 'middle', 'font-weight="700"') +
    '<line x1="290" y1="98" x2="500" y2="98" stroke="var(--fg-2)" stroke-width="2.5"/><line x1="290" y1="144" x2="500" y2="144" stroke="var(--fg-2)" stroke-width="2.5"/>';
  ['A', 'B', 'C', 'D'].forEach(function (s, i) { sqSvg += cell(296 + i * 50, 106, 44, 30, s, i === 0 ? ORANGE : null, i === 0 ? '#fff' : null); });
  sqSvg += arrow(290, 121, 236, 121, RED, 2.2) + txt(236, 172, 'dequeue (kivesz)', T, 12, null, 'fill="' + RED + '"') +
    arrow(552, 121, 506, 121, GREEN, 2.2) + txt(440, 172, 'enqueue (betesz)', T, 12, null, 'fill="' + GREEN + '"') +
    txt(318, 90, 'eleje (front)', M, 11, 'middle') + txt(446, 90, 'vége (back)', M, 11, 'middle') +
    txt(395, 226, 'SOR: FIFO', T, 13, 'middle', 'font-weight="700"') + '</svg>';

  /* ---------- 4. Hasítótábla láncolással ---------- */
  var buckets = [[28], [22, 15], [], [10, 31, 17, 59], [4, 88], [], []];
  var hashSvg = '<svg viewBox="0 0 560 250">' +
    txt(12, 40, 'kulcsok:', M, 12) + txt(12, 58, '10, 22, 31, 4, 15,', T, 12, null, 'font-family="monospace"') + txt(12, 74, '28, 17, 88, 59', T, 12, null, 'font-family="monospace"') +
    '<rect x="20" y="104" width="120" height="44" rx="8" fill="' + PURPLE + '"/>' + txt(80, 124, 'h(k) =', T, 12, 'middle', 'fill="#fff"') + txt(80, 140, 'k mod 7', T, 13, 'middle', 'fill="#fff" font-weight="700"') +
    arrow(140, 126, 176, 126, PURPLE, 2.2) + txt(80, 186, 'm = 7 rekesz', M, 11, 'middle') + txt(80, 202, 'n = 9 kulcs', M, 11, 'middle') + txt(80, 218, 'α = 9/7 ≈ 1,29', M, 11, 'middle');
  buckets.forEach(function (b, i) {
    var y = 14 + i * 32;
    hashSvg += txt(190, y + 19, i, M, 11, 'end') + cell(196, y, 40, 26, b.length ? '•' : '⌀', null, null);
    var x = 236;
    b.forEach(function (k, j) {
      hashSvg += arrow(x, y + 13, x + 26, y + 13, 'var(--fg-2)', 1.6) + cell(x + 28, y, 44, 26, k, j === b.length - 1 && b.length > 2 ? null : null, null, i === 3 ? ORANGE : null);
      x += 72;
    });
  });
  hashSvg += txt(548, 196, 'ütközések: 4 kulcs', T, 11, 'end', 'fill="' + ORANGE + '"') + txt(548, 211, 'a 3-as rekeszben', T, 11, 'end', 'fill="' + ORANGE + '"') + '</svg>';

  /* ---------- 5. Összefésülő rendezés fája ---------- */
  var ms = [38, 27, 43, 3, 9, 82, 10, 15], cw = 26, chh = 22, gapK = [0, 22, 16, 12];
  function msRow(y, k, sorted, fill, tcol) {
    var size = 8 >> k, groups = 1 << k, w = 8 * cw + (groups - 1) * gapK[k], x0 = 330 - w / 2, out = '', centers = [];
    for (var gI = 0; gI < groups; gI++) {
      var part = ms.slice(gI * size, gI * size + size);
      if (sorted) part = part.slice().sort(function (a, b) { return a - b; });
      var gx = x0 + gI * (size * cw + gapK[k]);
      centers.push(gx + size * cw / 2);
      part.forEach(function (v, j) { out += cell(gx + j * cw, y, cw, chh, v, fill, tcol); });
    }
    return { svg: out, c: centers };
  }
  var msY = [8, 42, 76, 110, 150, 184, 218], msSvg = '<svg viewBox="0 0 560 248">', msRows = [];
  [[0, false], [1, false], [2, false], [3, false], [2, true], [1, true], [0, true]].forEach(function (r, i) {
    var fill = i < 3 ? null : i === 3 ? PURPLE : BLUE, tc = i < 3 ? null : '#fff';
    msRows.push(msRow(msY[i], r[0], r[1], fill, tc));
  });
  for (var mi = 0; mi < 6; mi++) {
    var up = msRows[mi], dn = msRows[mi + 1], col = mi < 3 ? 'var(--muted)' : BLUE;
    dn.c.forEach(function (cx, j) {
      var px = mi < 3 ? up.c[j >> 1] : null;
      if (mi < 3) msSvg += edge(px, msY[mi] + chh, cx, msY[mi + 1], col, 1.3);
    });
    if (mi >= 3) up.c.forEach(function (cx, j) { msSvg += edge(cx, msY[mi] + chh, dn.c[j >> 1], msY[mi + 1], col, 1.3); });
  }
  msRows.forEach(function (r) { msSvg += r.svg; });
  msSvg += txt(10, 50, 'felosztás', T, 12, null, 'fill="' + PURPLE + '" font-weight="700"') + txt(10, 66, '(rekurzió)', M, 11) +
    txt(10, 190, 'összefésülés', T, 12, null, 'fill="' + BLUE + '" font-weight="700"') + txt(10, 206, '≤ n − 1 össze-', M, 11) + txt(10, 220, 'hasonlítás/szint', M, 11) +
    txt(548, 125, 'log₂ 8 = 3', M, 11, 'end') + txt(548, 139, 'szint', M, 11, 'end') + '</svg>';

  /* ---------- 6. Bináris keresés ---------- */
  var bsA = [2, 5, 8, 12, 16, 23, 38, 45, 56, 61, 72, 77, 84, 90, 95, 99];
  var bsSteps = [[0, 15, 7, 'A[7] = 45 < 72 → a jobb felében keresünk'], [8, 15, 11, 'A[11] = 77 > 72 → a bal felében keresünk'], [8, 10, 9, 'A[9] = 61 < 72 → jobbra'], [10, 10, 10, 'A[10] = 72 = 72 → megtaláltuk (4 összehasonlítás)']];
  var bsSvg = '<svg viewBox="0 0 560 238">';
  bsA.forEach(function (v, i) { bsSvg += txt(64 + i * 30, 14, i, M, 10, 'middle'); });
  bsSteps.forEach(function (s, r) {
    var y = 20 + r * 54;
    bsSvg += txt(14, y + 18, (r + 1) + '.', T, 13, null, 'font-weight="700"');
    bsA.forEach(function (v, i) {
      var inR = i >= s[0] && i <= s[1], isM = i === s[2];
      bsSvg += '<g opacity="' + (inR ? 1 : 0.28) + '">' + cell(50 + i * 30, y, 28, 26, v, isM ? (r === 3 ? GREEN : ORANGE) : null, isM ? '#fff' : null) + '</g>';
    });
    bsSvg += txt(50, y + 43, s[3], T, 11, null, 'fill="' + (r === 3 ? GREEN : 'var(--fg-2)') + '"');
  });
  bsSvg += '</svg>';

  /* ---------- 7. Bináris keresőfa ---------- */
  var bstN = { 50: [280, 32], 30: [170, 86], 70: [390, 86], 20: [110, 142], 40: [230, 142], 60: [340, 142], 80: [450, 142], 35: [200, 196], 65: [370, 196] };
  var bstE = [[50, 30], [50, 70], [30, 20], [30, 40], [70, 60], [70, 80], [40, 35], [60, 65]], bstPath = { 50: 1, 30: 1, 40: 1, 35: 1 };
  var bstSvg = '<svg viewBox="0 0 560 248">';
  bstE.forEach(function (e) { var a = bstN[e[0]], b = bstN[e[1]], on = bstPath[e[0]] && bstPath[e[1]]; bstSvg += edge(a[0], a[1], b[0], b[1], on ? ORANGE : null, on ? 3.5 : 1.8); });
  Object.keys(bstN).forEach(function (k) { bstSvg += vtx(bstN[k][0], bstN[k][1], k, bstPath[k] ? ORANGE : null); });
  bstSvg += txt(10, 22, 'Keresés: 35', T, 12, null, 'font-weight="700"') + txt(10, 40, '35 < 50 → bal', M, 11) + txt(10, 55, '35 > 30 → jobb', M, 11) + txt(10, 70, '35 < 40 → bal', M, 11) + txt(10, 85, '35 = 35 ✓', T, 11, null, 'fill="' + ORANGE + '"') +
    txt(280, 238, 'inorder bejárás: 20 30 35 40 50 60 65 70 80 – rendezett sorrend', M, 11, 'middle') +
    txt(470, 32, 'bal < csúcs < jobb', T, 12, 'middle', 'fill="' + BLUE + '"') + '</svg>';

  /* ---------- 8. Forgatás (kiegyensúlyozás) ---------- */
  var rotSvg = '<svg viewBox="0 0 560 190">' +
    edge(110, 34, 80, 88) + edge(80, 88, 50, 142) + vtx(110, 34, '30') + vtx(80, 88, '20', ORANGE) + vtx(50, 142, '10') +
    txt(150, 30, 'egyensúly: +2', T, 11, null, 'fill="' + RED + '"') + txt(150, 92, 'magasság: 2', M, 11) +
    arrow(240, 92, 320, 92, BLUE, 3) + txt(280, 80, 'jobbra forgatás', T, 12, 'middle', 'fill="' + BLUE + '"') + txt(280, 114, 'O(1) lépés', M, 11, 'middle') +
    edge(440, 50, 390, 120) + edge(440, 50, 490, 120) + vtx(440, 50, '20', ORANGE) + vtx(390, 120, '10') + vtx(490, 120, '30') +
    txt(440, 162, 'magasság: 1', M, 11, 'middle') + txt(440, 178, 'a keresőfa-tulajdonság megmarad', M, 11, 'middle') + '</svg>';

  /* ---------- 9. Kupac fa- és tömbalakban ---------- */
  var hp = [90, 70, 80, 30, 60, 50, 20], hpPos = [[280, 30], [180, 82], [380, 82], [130, 134], [230, 134], [330, 134], [430, 134]];
  var heapSvg = '<svg viewBox="0 0 560 250">';
  for (var hi = 1; hi < 7; hi++) { var pp = hpPos[(hi - 1) >> 1]; heapSvg += edge(pp[0], pp[1], hpPos[hi][0], hpPos[hi][1], hi === 3 || hi === 4 ? ORANGE : null, hi === 3 || hi === 4 ? 3 : 1.8); }
  hp.forEach(function (v, i) { heapSvg += vtx(hpPos[i][0], hpPos[i][1], v, i === 1 ? ORANGE : i === 0 ? RED : null) + txt(hpPos[i][0] + 22, hpPos[i][1] - 12, i, M, 10); });
  hp.forEach(function (v, i) { heapSvg += cell(140 + i * 40, 186, 40, 28, v, i === 1 ? ORANGE : null, i === 1 ? '#fff' : null) + txt(160 + i * 40, 230, i, M, 10, 'middle'); });
  heapSvg += '<path d="M200 186 C 210 160, 250 160, 260 184" fill="none" stroke="' + ORANGE + '" stroke-width="2"/>' + head(260, 186, 1.2, ORANGE, 7) +
    '<path d="M200 186 C 215 150, 285 150, 300 184" fill="none" stroke="' + ORANGE + '" stroke-width="2"/>' + head(300, 186, 1.2, ORANGE, 7) +
    txt(14, 196, 'tömb:', M, 12) + txt(14, 214, '(index)', M, 10) +
    txt(430, 200, 'i gyerekei: 2i+1, 2i+2', T, 11, null, 'fill="' + ORANGE + '"') + txt(430, 216, 'szülője: ⌊(i−1)/2⌋', M, 11) + txt(470, 26, 'maximum a gyökérben', T, 11, 'middle', 'fill="' + RED + '"') + '</svg>';

  /* ---------- 10. Gráfábrázolás ---------- */
  var gp = { 1: [60, 50], 2: [160, 50], 3: [110, 140], 4: [200, 190] }, ge = [[1, 2], [1, 3], [2, 3], [3, 4]];
  var graphSvg = '<svg viewBox="0 0 560 230">';
  ge.forEach(function (e) { graphSvg += edge(gp[e[0]][0], gp[e[0]][1], gp[e[1]][0], gp[e[1]][1]); });
  Object.keys(gp).forEach(function (k) { graphSvg += vtx(gp[k][0], gp[k][1], k, BLUE); });
  graphSvg += txt(120, 224, 'G: n = 4 csúcs, m = 4 él', M, 11, 'middle') + txt(330, 22, 'szomszédsági mátrix', T, 12, 'middle', 'font-weight="700"');
  var adj = [[0, 1, 1, 0], [1, 0, 1, 0], [1, 1, 0, 1], [0, 0, 1, 0]];
  for (var ar = 0; ar < 4; ar++) {
    graphSvg += txt(272, 62 + ar * 30, ar + 1, M, 11, 'middle') + txt(296 + ar * 30, 40, ar + 1, M, 11, 'middle');
    for (var ac = 0; ac < 4; ac++) graphSvg += cell(282 + ac * 30, 44 + ar * 30, 28, 28, adj[ar][ac], adj[ar][ac] ? BLUE : null, adj[ar][ac] ? '#fff' : null);
  }
  graphSvg += txt(336, 184, 'n² cella', M, 11, 'middle') + txt(470, 22, 'szomszédsági lista', T, 12, 'middle', 'font-weight="700"');
  var lists = [[2, 3], [1, 3], [1, 2, 4], [3]];
  lists.forEach(function (l, i) {
    var y = 44 + i * 30;
    graphSvg += cell(418, y, 26, 26, i + 1, PURPLE, '#fff');
    l.forEach(function (v, j) { graphSvg += arrow(444 + j * 36, y + 13, 456 + j * 36, y + 13, 'var(--fg-2)', 1.4) + cell(458 + j * 36, y + 2, 22, 22, v); });
  });
  graphSvg += txt(470, 184, 'n + 2m bejegyzés', M, 11, 'middle') + '</svg>';

  /* ---------- 11. Szélességi bejárás rétegei ---------- */
  var bP = { s: [60, 130], a: [190, 70], b: [190, 190], c: [320, 44], d: [320, 130], e: [320, 216], f: [450, 130] };
  var bL = { s: 0, a: 1, b: 1, c: 2, d: 2, e: 2, f: 3 }, bCol = [RED, ORANGE, BLUE, PURPLE];
  var bTree = [['s', 'a'], ['s', 'b'], ['a', 'c'], ['a', 'd'], ['b', 'e'], ['c', 'f']], bOther = [['a', 'b'], ['b', 'd'], ['d', 'f'], ['e', 'f'], ['d', 'e']];
  var bfsSvg = '<svg viewBox="0 0 560 262">';
  [60, 190, 320, 450].forEach(function (x, i) { bfsSvg += '<rect x="' + (x - 40) + '" y="18" width="80" height="222" rx="10" fill="' + bCol[i] + '" opacity=".09"/>' + txt(x, 14, 'd = ' + i, T, 12, 'middle', 'fill="' + bCol[i] + '" font-weight="700"'); });
  bOther.forEach(function (e) { bfsSvg += edge(bP[e[0]][0], bP[e[0]][1], bP[e[1]][0], bP[e[1]][1], 'var(--muted)', 1.5, '5 4'); });
  bTree.forEach(function (e) { bfsSvg += edge(bP[e[0]][0], bP[e[0]][1], bP[e[1]][0], bP[e[1]][1], 'var(--fg-2)', 3); });
  Object.keys(bP).forEach(function (k) { bfsSvg += vtx(bP[k][0], bP[k][1], k, bCol[bL[k]], 18); });
  bfsSvg += txt(520, 60, 'vastag:', M, 11, 'middle') + txt(520, 74, 'BFS-fa', M, 11, 'middle') + txt(520, 96, 'szaggatott:', M, 11, 'middle') + txt(520, 110, 'többi él', M, 11, 'middle') +
    txt(280, 256, 'a sor tartalma sorban: s │ a b │ c d e │ f', T, 12, 'middle', 'font-family="monospace"') + '</svg>';

  /* ---------- 12. Dijkstra ---------- */
  var dP = { s: [50, 125], a: [185, 50], b: [185, 200], c: [335, 50], d: [335, 200], t: [470, 125] };
  var dE = [['s', 'a', 4], ['s', 'b', 2], ['a', 'b', 1], ['a', 'c', 5], ['b', 'd', 7], ['c', 'd', 2], ['c', 't', 6], ['d', 't', 2]];
  var dTree = { 'sb': 1, 'ab': 1, 'ac': 1, 'bd': 1, 'dt': 1 }, dist = { s: 0, a: 3, b: 2, c: 8, d: 9, t: 11 };
  var dijSvg = '<svg viewBox="0 0 560 250">';
  dE.forEach(function (e) {
    var p = dP[e[0]], q = dP[e[1]], on = dTree[e[0] + e[1]], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    dijSvg += edge(p[0], p[1], q[0], q[1], on ? BLUE : 'var(--muted)', on ? 3.5 : 1.6) +
      '<rect x="' + (mx - 10) + '" y="' + (my - 10) + '" width="20" height="18" rx="4" fill="var(--surface)"/>' + txt(mx, my + 4, e[2], T, 12, 'middle', 'font-weight="700"');
  });
  Object.keys(dP).forEach(function (k) {
    var p = dP[k], dy = p[1] < 125 ? -26 : p[1] > 125 ? 34 : -26;
    dijSvg += vtx(p[0], p[1], k, k === 's' ? RED : BLUE, 18) + txt(p[0], p[1] + dy, 'd = ' + dist[k], T, 12, 'middle', 'fill="' + ORANGE + '" font-weight="700"');
  });
  dijSvg += txt(470, 226, 'kék: legrövidebb utak fája', T, 11, 'middle', 'fill="' + BLUE + '"') + txt(470, 242, 'sorrend: s, b, a, c, d, t', M, 11, 'middle') + '</svg>';

  /* ---------- 13. Dinamikus programozás: pénzváltás ---------- */
  var opt = [0, 1, 2, 1, 1, 2, 2];
  var dpSvg = '<svg viewBox="0 0 560 190">' + txt(20, 24, 'érmék: {1, 3, 4}, opt[x] = a legkevesebb érme x összeghez', T, 12);
  opt.forEach(function (v, i) {
    dpSvg += txt(110 + i * 56, 62, 'x = ' + i, M, 11, 'middle') + cell(86 + i * 56, 70, 48, 34, v, i === 6 || i === 3 || i === 0 ? GREEN : null, i === 6 || i === 3 || i === 0 ? '#fff' : null);
  });
  dpSvg += '<path d="M446 104 C 430 150, 290 150, 274 106" fill="none" stroke="' + GREEN + '" stroke-width="2.2"/>' + head(274, 106, -1.9, GREEN) + txt(360, 150, '− 3', T, 12, 'middle', 'fill="' + GREEN + '" font-weight="700"') +
    '<path d="M274 104 C 258 150, 122 150, 106 106" fill="none" stroke="' + GREEN + '" stroke-width="2.2"/>' + head(106, 106, -1.9, GREEN) + txt(190, 150, '− 3', T, 12, 'middle', 'fill="' + GREEN + '" font-weight="700"') +
    txt(20, 180, 'opt[x] = 1 + min(opt[x−1], opt[x−3], opt[x−4])  →  opt[6] = 2 (3 + 3)', M, 11) + '</svg>';

  STUDIE.addCourse({
    id: 'algoritmusok',
    title: 'Algoritmusok és adatszerkezetek',
    icon: '🧩',
    color: '#2f7bf6',
    level: 'BSc 1–3. félév (programtervező informatikus, mérnökinformatikus)',
    description: 'Műveletigény és aszimptotika, alap-adatszerkezetek, rendezés és keresés, fák és gráfok, tervezési módszerek – ábrákkal és kézzel követhető példákkal.',
    intro: 'Az algoritmus pontosan leírt, véges lépéssorozat, az adatszerkezet pedig az adatok olyan elrendezése, amely bizonyos műveleteket gyorssá tesz. A kettő mindig együtt jár: a jó adatszerkezet választása gyakran fontosabb, mint a kód „finomhangolása”. A kurzus egyetlen mérőszámmal dolgozik: **hogyan nő a lépésszám a bemenet méretével**. Hogy a „lépés” a valóságban mit jelent, azt a [[processzor|processzor]] modellben láthatod.',
    topics: [
      { id: 'bonyolultsag', title: 'Műveletigény és bonyolultság' },
      { id: 'adatszerk', title: 'Alap-adatszerkezetek' },
      { id: 'rendezes', title: 'Rendezés és keresés' },
      { id: 'fak', title: 'Fák és gráfok' },
      { id: 'modszerek', title: 'Tervezési módszerek' },
      { id: 'grafalg', title: 'Haladó gráfalgoritmusok' },
      { id: 'nehez', title: 'Nehéz problémák kezelése' }
    ],
    formulas: [
      {
        id: 'mester-f', title: 'A mester-tétel rekurziója', en: 'master theorem recurrence',
        parts: [{ t: 'T(n)', d: 'Az n méretű bemenet feldolgozásának futási ideje' }, { t: '=' },
          { t: 'a', d: 'Hány részfeladatra bontunk', unit: 'a ≥ 1' }, { t: '·' },
          { t: 'T(n/b)', d: 'Egy részfeladat futási ideje; a részfeladat mérete n/b', more: 'b > 1: ennyiszer kisebb a részfeladat' }, { t: '+' },
          { t: 'f(n)', d: 'A felbontás és a részeredmények összerakásának költsége' }],
        text: 'Összevetjük f(n)-et a `n^(log_b a)` kritikus függvénnyel (ennyi levele van a rekurziós fának):\n\n1. ha f(n) polinomiálisan kisebb, akkor `T(n) = Θ(n^(log_b a))` – a levelek dominálnak;\n2. ha f(n) = Θ(`n^(log_b a)`), akkor `T(n) = Θ(n^(log_b a) · log n)` – minden szint egyformán sokat dolgozik;\n3. ha f(n) polinomiálisan nagyobb (és teljesül a regularitási feltétel), akkor `T(n) = Θ(f(n))` – a gyökér dominál.',
        example: 'Karatsuba-szorzás: `T(n) = 3T(n/2) + n`. Itt `n^(log₂ 3) ≈ n^1,585`, ami polinomiálisan nagyobb f(n) = n-nél: 1. eset, `T(n) = Θ(n^1,585)` – jobb, mint az iskolai szorzás Θ(n²)-e.'
      },
      {
        id: 'osszefesules-f', title: 'Az összefésülő rendezés rekurziója', en: 'merge sort recurrence',
        parts: [{ t: 'T(n)', d: 'Az összefésülő rendezés lépésszáma n elemre' }, { t: '=' },
          { t: '2·T(n/2)', d: 'A két fél rekurzív rendezése' }, { t: '+' },
          { t: 'c·n', d: 'A két rendezett fél összefésülése: lineáris munka', more: 'Legfeljebb n − 1 összehasonlítás.' }, { t: '⇒' },
          { t: 'T(n) = Θ(n·log n)', d: 'A megoldás: log₂ n szint, mindegyiken összesen c·n munka' }],
        text: 'A rekurziós fa minden szintjén összesen n elemet fésülünk össze, a szintek száma log₂ n. A mester-tétel 2. esete: a = b = 2, `n^(log₂ 2) = n = f(n)`.',
        example: 'n = 1 000 000 elemre `n·log₂ n ≈ 2·10⁷` összehasonlítás – ez egy mai gépen század másodperces nagyságrend. A beszúró rendezés ugyanerre kb. `n²/4 = 2,5·10¹¹` lépést tenne.'
      },
      {
        id: 'binker-f', title: 'A bináris keresés lépésszáma', en: 'binary search comparisons',
        parts: [{ t: 'k_{max}', d: 'Az összehasonlítások legnagyobb száma (legrosszabb eset)', unit: 'db' }, { t: '=' },
          { t: '⌊log_2 n⌋', d: 'Hányszor felezhető n, amíg 1 marad (lefelé kerekítve)' }, { t: '+ 1' }],
        text: 'Minden összehasonlítás legalább a felére szűkíti a keresési tartományt. A rekurzió `T(n) = T(n/2) + 1`, megoldása Θ(log n).',
        example: '`n = 1 000 000` → ⌊19,93⌋ + 1 = **20** összehasonlítás. Egymilliárd elemnél is csak 30. Lineáris kereséssel ez legrosszabb esetben egymilliárd lenne.'
      },
      {
        id: 'also-korlat-f', title: 'Az összehasonlító rendezés alsó korlátja', en: 'comparison sorting lower bound',
        parts: [{ t: 'C(n)', d: 'A legrosszabb esetben szükséges összehasonlítások száma', unit: 'db' }, { t: '≥' },
          { t: '⌈log_2(n!)⌉', d: 'A döntési fa magassága legalább ennyi, hiszen n! levele van', more: 'n elem n! féle sorrendben érkezhet, és mindegyiket meg kell különböztetni.' }, { t: '≈' },
          { t: 'n·log_2 n − 1,44·n', d: 'Stirling-formulából; tehát Ω(n·log n)' }],
        text: 'Egy bináris fában, amelynek h a magassága, legfeljebb 2ʰ levél van. Mivel n! levél kell, `2ʰ ≥ n!`, azaz `h ≥ log₂(n!)`.',
        example: 'n = 10: `log₂(10!) = log₂ 3 628 800 ≈ 21,8`, tehát legalább 22 összehasonlítás kell legrosszabb esetben. A becslés szerint `10·3,32 − 14,4 ≈ 18,8` – kis n-re a közelítés még pontatlan.'
      },
      {
        id: 'osszeg-f', title: 'Számtani sor: 1 + 2 + … + (n − 1)', en: 'arithmetic series',
        parts: [{ t: '1 + 2 + … + (n − 1)', d: 'Például a beszúró rendezés legrosszabb esetben az i-edik elemet i helyen csúsztatja át' }, { t: '=' },
          { t: 'n(n − 1)/2', d: 'Gauss trükkje: az első és utolsó, a második és utolsó előtti … tag összege mindig n' }, { t: '=' }, { t: 'Θ(n²)' }],
        text: 'Az egymásba ágyazott ciklusok elemzésének alapképlete: ha a belső ciklus i-től függően i-szer fut, a teljes munka négyzetes.',
        example: 'n = 1000 elemű, fordítva rendezett tömbre a beszúró rendezés `999·1000/2 = 499 500` összehasonlítást végez.'
      },
      {
        id: 'kitoltesi-f', title: 'Kitöltési tényező és várható keresési idő', en: 'load factor',
        parts: [{ t: 'α', d: 'Kitöltési tényező: átlagosan hány kulcs jut egy rekeszre', unit: '–' }, { t: '=' },
          { t: 'n', d: 'A tárolt kulcsok száma', unit: 'db' }, { t: '/' },
          { t: 'm', d: 'A rekeszek (bucketek) száma', unit: 'db' }, { t: ';' },
          { t: 'E[sikertelen] ≈ 1 + α', d: 'Láncolásnál a sikertelen keresés várható vizsgálatszáma (egyenletes hasítást feltételezve)', more: 'Sikeres keresésnél ≈ 1 + α/2.' }],
        text: 'Ha α korlátos (például a tábla mindig duplázódik, amikor α > 0,75), minden művelet várhatóan O(1). Nyílt címzésnél α < 1 kell, és lineáris próbálásnál a sikertelen keresés kb. `½·(1 + 1/(1 − α)²)` lépés – α → 1 esetén ez gyorsan elszáll.',
        example: 'n = 9, m = 7: α ≈ 1,29, egy sikertelen keresés várhatóan ≈ 2,3 vizsgálat. Nyílt címzés lineáris próbálással α = 0,5-nél ≈ 2,5, α = 0,9-nél már ≈ 50,5 vizsgálat.'
      },
      {
        id: 'gyors-f', title: 'A gyorsrendezés átlagos összehasonlításszáma', en: 'quicksort average comparisons',
        parts: [{ t: 'C_{átl}(n)', d: 'Véletlen sorrendű bemenetre (vagy véletlen vezérelemmel) várható összehasonlításszám' }, { t: '≈' },
          { t: '2n·ln n', d: 'Két elem pontosan akkor kerül összehasonlításra, ha egyikük az első vezérelem a köztük lévő értékek közül' }, { t: '≈' },
          { t: '1,39·n·log_2 n' }],
        text: 'Csak kb. 39%-kal több, mint az elméleti alsó korlát, és a belső ciklus nagyon egyszerű, ezért a gyakorlatban gyakran ez a leggyorsabb. Legrosszabb esetben azonban `n(n − 1)/2`.',
        example: 'n = 1 000 000: `2·10⁶·ln 10⁶ ≈ 2,76·10⁷` összehasonlítás – az összefésülő rendezés kb. `2·10⁷`-jénél valamivel több, mégis gyakran gyorsabb, mert helyben dolgozik és jól használja a cache-t.'
      },
      {
        id: 'potencial-f', title: 'Amortizált költség a potenciálmódszerrel', en: 'potential method (amortized analysis)',
        parts: [{ t: 'ĉ_i', d: 'Az i-edik művelet amortizált költsége' }, { t: '=' },
          { t: 'c_i', d: 'Az i-edik művelet tényleges költsége' }, { t: '+' },
          { t: 'Φ(D_i) − Φ(D_{i−1})', d: 'A potenciál változása: a művelet után és előtt az adatszerkezethez rendelt „megtakarítás”', more: 'Ha Φ(D₀) = 0 és Φ mindig ≥ 0, akkor az amortizált költségek összege felső korlát a tényleges összköltségre.' }],
        text: 'Összegezve a tagok teleszkopikusan kiesnek: `Σ ĉ_i = Σ c_i + Φ(D_n) − Φ(D_0) ≥ Σ c_i`. Az olcsó műveletek „befizetnek” a potenciálba, a drágák ebből „fizetnek”.',
        example: 'Dinamikus tömb duplázással, `Φ = 2·(elemszám) − kapacitás`. Sima hozzáfűzés: c = 1, ΔΦ = 2 → ĉ = 3. Hozzáfűzés teli, k kapacitású tömbbe: c = k + 1 (másolás + beírás), Φ előtte k, utána `2(k + 1) − 2k = 2` → `ĉ = k + 1 + 2 − k = 3`. Minden hozzáfűzés amortizáltan 3 egység: O(1).'
      },
      {
        id: 'floyd-f', title: 'A Floyd–Warshall-algoritmus rekurziója', en: 'Floyd–Warshall recurrence',
        parts: [{ t: 'd_k(i, j)', d: 'Az i-ből j-be vezető legrövidebb út hossza, ha közbülső csúcsként csak az 1, …, k csúcsok használhatók' }, { t: '=' },
          { t: 'min(', d: 'A kisebbik a két lehetőség közül' },
          { t: 'd_{k−1}(i, j)', d: 'A k. csúcsot nem használjuk' }, { t: ',' },
          { t: 'd_{k−1}(i, k) + d_{k−1}(k, j)', d: 'A k. csúcson át megyünk: i → k, majd k → j' }, { t: ')' }],
        text: 'Kezdetben d₀(i, j) az él súlya (∞, ha nincs él, 0, ha i = j). Három egymásba ágyazott ciklus (k kívül!), Θ(n³) idő, Θ(n²) tár. Negatív kör pontosan akkor van, ha a végén valamelyik `d(i, i) < 0`.',
        example: 'Ha d(1, 3) = 10, de d(1, 2) = 3 és d(2, 3) = 4, akkor k = 2-nél `d(1, 3) = min(10, 3 + 4) = 7`.'
      },
      {
        id: 'folyam-f', title: 'Maximális folyam – minimális vágás', en: 'max-flow min-cut theorem',
        parts: [{ t: 'max |f|', d: 'Az s forrásból a t nyelőbe juttatható legnagyobb folyamérték' }, { t: '=' },
          { t: 'min c(S, T)', d: 'A legkisebb kapacitású s–t vágás: a csúcsok olyan S ∋ s, T ∋ t felosztása, amelynél az S-ből T-be menő élek kapacitásösszege minimális', more: 'Csak az S → T irányú élek számítanak a vágás kapacitásába.' }],
        text: 'Bármely folyam értéke legfeljebb bármely vágás kapacitása (minden egységnyi folyamnak át kell kelnie a vágáson). A tétel szerint a maximumban egyenlőség áll – és az utolsó, javítóutat már nem találó keresés által elért csúcsok halmaza egy minimális vágás S oldala.',
        example: 'Ha egy hálózatban az s-ből kiinduló két él kapacitása 3 és 2, akkor `max |f| ≤ 5`; ha találunk 5 értékű folyamot, az optimális, és a {s} | többiek vágás minimális.'
      }
    ],
    terms: [
      /* ----- Bonyolultság ----- */
      { id: 'futasi-ido', term: 'Futási idő (legrosszabb és átlagos eset)', en: 'running time; worst-case and average-case complexity', topic: 'bonyolultsag',
        short: 'Az algoritmus által végzett elemi lépések száma a bemenet n méretének függvényében. Legrosszabb esetben a legkedvezőtlenebb n méretű bemenetre, átlagos esetben egy adott eloszlás szerinti várható értékként számoljuk.',
        prereq: ['modell:processzor', 'digitalis-technika/utasitasciklus'],
        text: 'A futási időt nem másodpercben, hanem **elemi lépésekben** mérjük (értékadás, összehasonlítás, aritmetikai művelet, tömbelem elérése), mert így az eredmény független a géptől, a fordítótól és a programozási nyelvtől. Ez az úgynevezett RAM-modell: minden elemi lépés konstans időbe kerül.\n\nUgyanakkora méretű bemenetek között is nagy lehet a különbség, ezért háromféle esetet vizsgálunk:\n\n- **legrosszabb eset** W(n): a legnagyobb lépésszám az összes n méretű bemenet közül – ez **garancia**, ezért ezt adjuk meg leggyakrabban;\n- **átlagos eset** A(n): a lépésszám várható értéke egy feltételezett bemeneti eloszlás mellett;\n- **legjobb eset**: ritkán informatív, inkább csak határeset.\n\nUgyanígy elemezhető a **tárigény** (memóriaigény) is. Gyakran választanunk kell a kettő között: több memóriával (táblázat, gyorsítótár) gyorsabb lehet az algoritmus.',
        formulas: ['osszeg-f'],
        example: 'Lineáris keresés n elemű tömbben: legjobb eset 1, legrosszabb eset n összehasonlítás; ha a keresett elem biztosan benne van, és minden pozíció egyformán valószínű, az átlag `(n + 1)/2`.\n\nMit jelent ez időben? Másodpercenként 10⁹ elemi lépéssel számolva n = 10⁶ elemre egy n² lépéses algoritmus **1000 s ≈ 17 perc**, egy n·log₂ n lépéses **0,02 s**.',
        pitfall: 'Az „átlagos eset” nem a „tipikus” bemenetet jelenti, hanem egy **feltételezett eloszlás** szerinti átlagot. A gyorsrendezés véletlen sorrendű bemenetre átlagosan gyors, de ha a gyakorlatban sokszor már rendezett adat érkezik, és mindig az első elem a vezérelem, a „ritka” legrosszabb eset rendszeresen előfordul.',
        related: ['aszimptotikus-jeloles', 'rekurzio', 'beszuro-rendezes', 'gyorsrendezes', 'binaris-kereses', 'p-np', 'tomb'],
        models: ['processzor'] },
      { id: 'aszimptotikus-jeloles', term: 'Aszimptotikus jelölések (O, Ω, Θ)', en: 'asymptotic notation: big-O, big-Omega, big-Theta', topic: 'bonyolultsag',
        short: 'f(n) = O(g(n)), ha van olyan c > 0 és n₀, hogy minden n ≥ n₀ esetén f(n) ≤ c·g(n). Az Ω ugyanez alsó korlátként (f(n) ≥ c·g(n)), a Θ pedig azt jelenti, hogy mindkettő teljesül.',
        prereq: ['lecke:matematika/egyenletek'],
        visual: growthSvg, caption: 'A leggyakoribb növekedési rendek. Kis n-nél még közel vannak egymáshoz, de a 2ⁿ már n ≈ 6-nál, az n² n ≈ 8-nál kilép a képből.',
        text: 'A jelölések a futási idő **nagyságrendjét** írják le, a konstans szorzókat és az alacsonyabb rendű tagokat elhagyják. Ez nem hanyagság: nagy n-re a vezető tag dönt, a konstans pedig gépfüggő.\n\n- **O (nagy ordó)**: felső korlát, „legfeljebb ilyen gyorsan nő”.\n- **Ω (omega)**: alsó korlát, „legalább ilyen gyorsan nő”.\n- **Θ (théta)**: pontos nagyságrend: f = O(g) és f = Ω(g) egyszerre.\n\nA szokásos rangsor: `1 ≺ log n ≺ √n ≺ n ≺ n·log n ≺ n² ≺ n³ ≺ 2ⁿ ≺ n!`. A logaritmus alapja nem számít, mert `log_a n = log_b n / log_b a` – csak konstans szorzóban különböznek, ezért írunk egyszerűen log n-t.\n\nSzámolási szabályok: összegnél a nagyobbik tag dönt, `O(f) + O(g) = O(max(f, g))`; egymásba ágyazott ciklusoknál a lépésszámok szorzódnak.',
        formulas: ['osszeg-f'],
        example: '`f(n) = 3n² + 10n + 5 = Θ(n²)`. Bizonyítás: n ≥ 1 esetén `3n² ≤ f(n) ≤ 3n² + 10n² + 5n² = 18n²`, tehát c₁ = 3 és c₂ = 18 megfelel.\n\nn = 1000-nél: log₂ n ≈ 10, n·log₂ n ≈ 10⁴, n² = 10⁶, 2ⁿ ≈ 10³⁰¹ – az utóbbi több, mint a látható univerzum atomjainak száma.',
        pitfall: 'Az O csak **felső** korlát: `n = O(n²)` is igaz állítás. Ha egy algoritmusról azt mondjuk, „O(n²)”, abból még nem következik, hogy lassú – a pontos rendet Θ fejezi ki. Kis n-re pedig a konstans dönthet: ezért vált sok gyors rendezés 16 elem alatt beszúró rendezésre.',
        related: ['futasi-ido', 'mester-tetel', 'also-korlat', 'p-np', 'osszefesulo-rendezes'] },
      { id: 'rekurzio', term: 'Rekurzió', en: 'recursion; recurrence relation', topic: 'bonyolultsag',
        short: 'Rekurzív az az algoritmus, amely a feladatot önmaga kisebb bemenetű hívásaira vezeti vissza; futási idejét rekurzív egyenlet írja le, például T(n) = 2T(n/2) + n.',
        text: 'Minden rekurzív algoritmusnak két része van:\n\n1. **báziseset (alapeset)**: elég kicsi bemenetre a választ közvetlenül adja meg;\n2. **rekurzív lépés**: a feladatot kisebb, azonos típusú feladat(ok)ra vezeti vissza, és azok eredményéből építi fel a választ.\n\nA hívások a **hívási veremben** (call stack) tárolódnak: minden hívás saját keretet (lokális változók, visszatérési cím) kap. Ezért a rekurzió tárigénye a **rekurziós mélységgel** arányos.\n\nA futási idő rekurzív egyenletének megoldására három módszer szokásos: **helyettesítés** (megsejtjük a megoldást és teljes indukcióval igazoljuk), **rekurziós fa** (szintenként összeadjuk a munkát) és a **mester-tétel**.',
        formulas: ['mester-f'],
        example: 'A Fibonacci-számok naiv rekurziója, `fib(n) = fib(n−1) + fib(n−2)`, exponenciális: a hívások száma `2·F(n+1) − 1`, így fib(40)-hez **331 160 281** hívás kell. Ugyanez egy 41 elemű táblázattal 39 összeadás (lásd: dinamikus programozás).',
        pitfall: 'Hiányzó vagy elérhetetlen báziseset végtelen rekurzióhoz és veremtúlcsorduláshoz (stack overflow) vezet. Nagy mélységnél (például egymillió csúcsú láncon futó mélységi bejárásnál) helyes báziseset mellett is betelhet a verem – ilyenkor explicit veremmel kell iteratívan dolgozni.',
        related: ['mester-tetel', 'oszd-meg', 'dinamikus-programozas', 'verem-sor', 'dfs', 'osszefesulo-rendezes', 'futasi-ido'] },
      { id: 'mester-tetel', term: 'Mester-tétel', en: 'master theorem', topic: 'bonyolultsag',
        short: 'A T(n) = a·T(n/b) + f(n) alakú (oszd meg és uralkodj) rekurziók megoldása: az f(n) összevetése az n^(log_b a) kritikus függvénnyel megadja T(n) nagyságrendjét.',
        prereq: ['lecke:matematika/egyenletek'],
        text: 'A rekurziós fa k-adik szintjén aᵏ részfeladat van, mindegyik n/bᵏ méretű, és f(n/bᵏ) munkát végez. A fa mélysége log_b n, a levelek száma `a^(log_b n) = n^(log_b a)`. A tétel azt mondja meg, melyik dominál:\n\n1. **a levelek**: ha f(n) = O(`n^(log_b a − ε)`) valamilyen ε > 0-ra, akkor `T(n) = Θ(n^(log_b a))`;\n2. **egyensúly**: ha f(n) = Θ(`n^(log_b a)`), akkor `T(n) = Θ(n^(log_b a)·log n)`;\n3. **a gyökér**: ha f(n) = Ω(`n^(log_b a + ε)`) és `a·f(n/b) ≤ c·f(n)` valamilyen c < 1-re, akkor `T(n) = Θ(f(n))`.\n\nTipikus esetek:\n\n- összefésülő rendezés: a = 2, b = 2, f = n → 2. eset, Θ(n·log n);\n- bináris keresés: a = 1, b = 2, f = 1 → 2. eset, Θ(log n);\n- naiv mátrixszorzás blokkokkal: a = 8, b = 2, f = n² → 1. eset, Θ(n³);\n- Strassen-algoritmus: a = 7 → Θ(`n^(log₂ 7)`) ≈ Θ(n^2,81).',
        formulas: ['mester-f', 'osszefesules-f'],
        example: '`T(n) = 4T(n/2) + n²`: itt `n^(log₂ 4) = n²` = f(n), tehát 2. eset, `T(n) = Θ(n²·log n)`.\n\n`T(n) = 2T(n/2) + n²`: `n^(log₂ 2) = n`, f(n) = n² polinomiálisan nagyobb, a regularitás teljesül (`2·(n/2)² = n²/2 ≤ ½·n²`), tehát 3. eset, Θ(n²).',
        pitfall: 'Nem minden rekurzióra alkalmazható. `T(n) = T(n − 1) + n` nem a·T(n/b) alakú (megoldása Θ(n²), összegzéssel). `T(n) = 2T(n/2) + n/log n` pedig a „rések” közé esik: f(n) kisebb n-nél, de nem polinomiálisan – a megoldás Θ(n·log log n), és a tétel alapváltozata nem adja meg.',
        related: ['rekurzio', 'oszd-meg', 'osszefesulo-rendezes', 'aszimptotikus-jeloles', 'binaris-kereses'] },

      /* ----- Adatszerkezetek ----- */
      { id: 'tomb', term: 'Tömb és dinamikus tömb', en: 'array; dynamic array', topic: 'adatszerk',
        short: 'Azonos típusú elemek egyetlen összefüggő memóriaterületen; az i-edik elem címe egy szorzással kiszámítható, ezért bármelyik elem O(1) idő alatt elérhető.',
        prereq: ['digitalis-technika/memoriahierarchia', 'digitalis-technika/cache'],
        text: 'Az i-edik elem címe: `kezdőcím + i · elemméret`. Ezért az indexelés konstans idejű, és mivel a szomszédos elemek egymás mellett vannak a memóriában, a tömb bejárása kihasználja a gyorsítótár **térbeli lokalitását** – a gyakorlatban ez a leggyorsabb adatszerkezet.\n\nHátránya: a mérete rögzített, a közepébe szúrni vagy onnan törölni csak a többi elem elcsúsztatásával lehet, ami O(n).\n\nA **dinamikus tömb** (C++ `vector`, Java `ArrayList`, Python `list`) ezt úgy oldja meg, hogy ha betelt, **kétszer akkora** területet foglal, és átmásolja az elemeket. Egy-egy hozzáfűzés így lehet O(n) is, de n hozzáfűzés összes költsége O(n), tehát **amortizáltan** O(1) per művelet.',
        formulas: ['osszeg-f'],
        example: '4 bájtos egészek tömbje az 1000-es címen kezdődik: `A[25]` címe `1000 + 25·4 = 1100`.\n\nDuplázódó dinamikus tömbbe 1000 elemet fűzünk (kezdő kapacitás 1): a másolások száma `1 + 2 + 4 + … + 512 = 1023`, ami kevesebb, mint 2·1000. Átlagosan elemenként kb. egy másolás jut.',
        pitfall: 'Az amortizált O(1) **nem** jelenti, hogy minden egyes művelet gyors: az átméretezés pillanatában egy hozzáfűzés n elemet másol. Valós idejű rendszerekben (hang, vezérlés) ez a kiugró késleltetés gondot okozhat. Ha a kapacitás nem kétszeresére, hanem csak +10 elemmel nő, a költség négyzetessé válik!',
        related: ['lancolt-lista', 'hasitotabla', 'verem-sor', 'binaris-kereses', 'kupac', 'futasi-ido'],
        models: ['processzor'] },
      { id: 'lancolt-lista', term: 'Láncolt lista', en: 'linked list', topic: 'adatszerk',
        short: 'Csúcsok sorozata, amelyben minden csúcs az adat mellett a következő csúcs címét (pointerét) is tárolja; kétirányú listában az előzőét is.',
        visual: listSvg, caption: 'Egyirányú láncolt lista és egy új csúcs beszúrása: elég két pointert átállítani, a többi elemhez nem kell nyúlni.',
        text: 'A csúcsok bárhol lehetnek a memóriában, a sorrendet a pointerek adják. Az utolsó csúcs pointere `null`. Gyakori változatok: **kétirányú lista** (előre és hátra is lehet lépni), **körkörös lista**, illetve **fejelemes (strázsás) lista**, ahol egy üres „strázsa” csúcs miatt nem kell külön kezelni az üres lista és a lista eleje esetét.\n\nÖsszevetés a tömbbel:\n\n- beszúrás/törlés ismert csúcs után: lista O(1), tömb O(n);\n- i-edik elem elérése: lista O(n) (végig kell lépkedni), tömb O(1);\n- memória: a listában csúcsonként plusz egy-két pointer (64 biten 8–16 bájt);\n- gyorsítótár: a lista elemei szétszórtak, ezért bejárása a gyakorlatban sokszor lassabb.\n\nListára épül a verem és a sor egyszerű megvalósítása, a hasítótábla láncolása és a gráfok szomszédsági listája.',
        example: 'Beszúrás a p csúcs után (a ábrán p a 7-et tartalmazó csúcs):\n\n1. `új.next ← p.next` (az új csúcs a 33-ra mutat),\n2. `p.next ← új` (a 7 már az új csúcsra mutat).\n\nKét értékadás, a lista hosszától függetlenül – O(1).',
        pitfall: 'A sorrend számít! Ha előbb `p.next ← új` történik, a lista hátralévő része (33, 41) elérhetetlenné válik – elveszett a rá mutató egyetlen pointer. Egyirányú listában egy csúcs törléséhez az **előző** csúcs kell, ezért a „töröld ezt a csúcsot” művelet ott O(n) is lehet.',
        related: ['tomb', 'verem-sor', 'hasitotabla', 'grafabrazolas', 'osszefesulo-rendezes'] },
      { id: 'verem-sor', term: 'Verem és sor', en: 'stack (LIFO) and queue (FIFO)', topic: 'adatszerk',
        short: 'A verem (stack) LIFO elvű: az utoljára betett elem jön ki először. A sor (queue) FIFO elvű: az elsőként betett elem jön ki először. Mindkettő alapműveletei O(1) idejűek.',
        visual: sqSvg, caption: 'A veremnek csak a teteje, a sornak az eleje (kivétel) és a vége (betétel) érhető el. Narancs: a következő kivehető elem.',
        text: '**Verem** műveletei: `push` (betesz a tetejére), `pop` (kiveszi a tetejét), `top` (megnézi a tetejét). Felhasználás: a függvényhívások **hívási verme**, zárójelek párosítása, kifejezések kiértékelése, visszavonás (undo), mélységi bejárás.\n\n**Sor** műveletei: `enqueue` (a végére tesz), `dequeue` (az elejéről vesz ki). Felhasználás: szélességi bejárás, nyomtatási és üzenetsorok, pufferek a hálózatban és az operációs rendszerben.\n\nMindkettő megvalósítható láncolt listával vagy tömbbel. A sort tömbben **körkörösen** (gyűrűs puffer, ring buffer) tároljuk: az eleje és a vége index `mod N` szerint körbefordul, így nem kell elemeket mozgatni.\n\nA **prioritási sor** nem érkezési sorrendben, hanem a legnagyobb (vagy legkisebb) kulcs szerint ad ki elemet – ezt kupaccal valósítjuk meg.',
        example: 'Lengyelformás (postfix) kifejezés kiértékelése veremmel: `3 4 + 2 ×`.\n\n1. 3 → verem: [3]\n2. 4 → verem: [3, 4]\n3. + → kivesz 4-et és 3-at, betesz 7-et: [7]\n4. 2 → verem: [7, 2]\n5. × → kivesz 2-t és 7-et, betesz 14-et: [14]\n\nAz eredmény 14 = (3 + 4)·2 – zárójel nélkül, egyetlen bejárással.',
        pitfall: 'Üres veremből vagy sorból kivenni hiba (underflow) – mindig ellenőrizni kell. Gyűrűs puffernél „eleje = vége” jelentheti az üres és a tele állapotot is; ezért vagy külön darabszámot tartunk nyilván, vagy egy cellát mindig üresen hagyunk.',
        related: ['lancolt-lista', 'tomb', 'bfs', 'dfs', 'rekurzio', 'kupac'] },
      { id: 'hasitotabla', term: 'Hasítótábla', en: 'hash table', topic: 'adatszerk',
        short: 'Kulcs–érték tároló, amely egy h hasítófüggvénnyel számítja ki, melyik rekeszbe (bucketbe) kerül a kulcs; a keresés, beszúrás és törlés várhatóan O(1) idejű.',
        visual: hashSvg, caption: 'Hasítás láncolással, h(k) = k mod 7. A 3-as rekeszbe négy kulcs is jutott: ezek ütköznek, és láncolt listában sorakoznak.',
        text: 'A `h: kulcs → {0, 1, …, m − 1}` függvény a kulcsot egy tömbindexszé alakítja. Jó hasítófüggvény gyors, és a kulcsokat **egyenletesen** szórja szét. Mivel a lehetséges kulcsok száma sokkal nagyobb, mint m, **ütközések** elkerülhetetlenek (születésnap-paradoxon: már 23 ember között 50% feletti eséllyel van két azonos születésnapú).\n\nÜtközésfeloldás:\n\n- **láncolás**: minden rekesz egy láncolt lista;\n- **nyílt címzés**: ütközéskor egy szabályos próbasorozat szerint (lineáris, négyzetes próbálás, kettős hasítás) másik szabad rekeszt keresünk.\n\nA hatékonyság az α = n/m **kitöltési tényezőn** múlik. Ha α túl nagy lesz, a táblát kétszeresére növeljük és minden kulcsot újrahasítunk (rehash) – ez amortizáltan O(1). Erre épül a Python `dict`, a Java `HashMap` és a C++ `unordered_map`.',
        formulas: ['kitoltesi-f'],
        example: 'm = 7, h(k) = k mod 7. A 10, 22, 31, 4, 15, 28, 17, 88, 59 kulcsok rekeszei: 3, 1, 3, 4, 1, 0, 3, 4, 3. A 3-as rekeszben négy kulcs van, így a 59 megtalálásához ott 4 összehasonlítás kell; a 2-es rekesz üres, ott a sikertelen keresés azonnal véget ér.',
        pitfall: 'A **legrosszabb eset** O(n): ha minden kulcs ugyanabba a rekeszbe esik. Ezt támadók ki is használhatják (hash flooding), ezért a modern nyelvek véletlenített hasítófüggvényt használnak. A hasítótábla **nem rendezett**: legkisebb elemet vagy egy intervallumba eső kulcsokat hatékonyan csak keresőfával lehet lekérdezni.',
        related: ['tomb', 'lancolt-lista', 'binaris-keresofa', 'kiegyensulyozott-fa', 'futasi-ido'] },

      /* ----- Rendezés és keresés ----- */
      { id: 'beszuro-rendezes', term: 'Beszúró rendezés', en: 'insertion sort', topic: 'rendezes',
        short: 'A tömb elejét rendezetten tartja, és minden következő elemet a rendezett részben a helyére csúsztat; legrosszabb és átlagos esetben Θ(n²), majdnem rendezett bemeneten közel lineáris.',
        text: 'Így rendezi kezében a kártyáit a legtöbb ember. Az i-edik lépésben:\n\n1. kivesszük az `A[i]` elemet (ez a kulcs);\n2. a rendezett `A[0..i−1]` részben jobbról balra haladva minden nála nagyobb elemet eggyel jobbra csúsztatunk;\n3. a felszabadult helyre beírjuk a kulcsot.\n\nA csúsztatások száma pontosan a bemenet **inverzióinak** száma (azon párok, amelyek rossz sorrendben vannak). Ebből:\n\n- legjobb eset (már rendezett): n − 1 összehasonlítás, Θ(n);\n- legrosszabb eset (fordítva rendezett): `n(n − 1)/2`, Θ(n²);\n- átlagos eset: kb. n²/4.\n\nTulajdonságai: **stabil**, **helyben** dolgozik (O(1) extra memória) és **online** (az elemeket érkezés közben is rendezheti). Kis tömbökön a legegyszerűbb kódja miatt gyorsabb a „jobb” algoritmusoknál, ezért a gyakorlati rendezők (Timsort, introsort) 16–32 elem alatt erre váltanak.',
        formulas: ['osszeg-f'],
        example: '[5, 2, 4, 6, 1, 3] rendezése, lépésenként:\n\n1. 2 beszúrása: [2, 5, 4, 6, 1, 3]\n2. 4 beszúrása: [2, 4, 5, 6, 1, 3]\n3. 6 beszúrása: [2, 4, 5, 6, 1, 3] (nem mozdul)\n4. 1 beszúrása: [1, 2, 4, 5, 6, 3]\n5. 3 beszúrása: [1, 2, 3, 4, 5, 6]\n\nA bemenetben 9 inverzió volt, így 9 csúsztatás történt.',
        pitfall: 'Kis példákon megtévesztően gyors. 10⁵ véletlen elemnél már kb. 2,5·10⁹ csúsztatás kell, ami másodperces nagyságrend; 10⁶ elemnél ez százszor több.',
        related: ['stabilitas', 'osszefesulo-rendezes', 'gyorsrendezes', 'futasi-ido', 'aszimptotikus-jeloles', 'also-korlat'] },
      { id: 'osszefesulo-rendezes', term: 'Összefésülő rendezés', en: 'merge sort', topic: 'rendezes',
        short: 'Oszd meg és uralkodj elvű rendezés: a tömböt kettévágja, a két felet rekurzívan rendezi, majd a két rendezett felet lineáris időben összefésüli. Minden esetben Θ(n·log n).',
        visual: msSvg, caption: 'Az összefésülő rendezés rekurziós fája 8 elemre: felül a felosztás, alul az összefésülés szintjei. Minden szinten összesen legfeljebb n − 1 összehasonlítás történik.',
        text: 'Az **összefésülés** két rendezett sorozatból egy rendezettet készít: két mutató halad a sorozatokon, és mindig a kisebbik aktuális elemet írjuk ki, majd azt a mutatót léptetjük. Ez legfeljebb n − 1 összehasonlítás.\n\nA rekurzió `T(n) = 2T(n/2) + Θ(n)`, megoldása **Θ(n·log n)** – legjobb, átlagos és legrosszabb esetben egyaránt. Ez aszimptotikusan **optimális** az összehasonlító rendezések között.\n\nTulajdonságai: **stabil** (egyenlőségnél a bal oldali elemet vesszük előbb), de tömbön Θ(n) **extra memóriát** igényel. Láncolt listát viszont extra memória nélkül is rendez, és mivel csak sorosan olvas és ír, alkalmas **külső rendezésre** is: a memóriánál nagyobb fájlokat rendezett darabokra bontják, majd ezeket fésülik össze.',
        formulas: ['osszefesules-f', 'mester-f'],
        example: 'Az ábrán [38, 27, 43, 3, 9, 82, 10, 15] → … → [27, 38] és [3, 43] összefésülése: 3 < 27 → 3; 27 < 43 → 27; 38 < 43 → 38; maradék 43 → [3, 27, 38, 43]. A végeredmény [3, 9, 10, 15, 27, 38, 43, 82], 3 szinten legfeljebb 3·7 = 21 összehasonlítással.\n\nn = 10⁶ elemnél kb. 2·10⁷ összehasonlítás.',
        pitfall: 'A stabilitás azon múlik, hogy egyenlő kulcsoknál a bal félből vesszük-e előbb az elemet (`≤` és nem `<`). A Θ(n) segédtömböt nem érdemes minden rekurzív hívásban újra lefoglalni – ez a gyakorlatban sokszorosára lassítja a kódot.',
        related: ['oszd-meg', 'mester-tetel', 'stabilitas', 'also-korlat', 'gyorsrendezes', 'kupac', 'beszuro-rendezes', 'lancolt-lista'] },
      { id: 'gyorsrendezes', term: 'Gyorsrendezés (quicksort)', en: 'quicksort', topic: 'rendezes',
        short: 'Választ egy vezérelemet (pivot), a tömböt a nála kisebb és nagyobb elemekre particionálja, majd a két részt rekurzívan rendezi. Átlagosan Θ(n·log n), legrosszabb esetben Θ(n²).',
        text: 'C. A. R. Hoare 1960-ban találta ki. A munka nagy része a **particionálásban** van: egyetlen lineáris bejárással helyben átrendezzük a tömböt úgy, hogy a vezérelem a végleges helyére kerüljön, tőle balra a kisebbek, jobbra a nagyobbak legyenek. Összefésülés nem kell: a két rész rendezése után kész a tömb.\n\nHa a vezérelem mindig a közép közelébe esik, a rekurziós fa mélysége log n: **Θ(n·log n)**. Ha mindig a legkisebb vagy legnagyobb elem (például rendezett bemenetnél, ha mindig az első elemet választjuk), a részek mérete n − 1 és 0: **Θ(n²)**.\n\nVédekezés: **véletlen** vezérelem vagy a három elem mediánja. A C++ `std::sort` az **introsort**: gyorsrendezés, amely kupacrendezésre vált, ha a rekurzió mélysége meghaladja kb. 2·log₂ n-t – így a legrosszabb eset is O(n·log n).\n\nNem stabil, de helyben dolgozik (csak O(log n) verem kell), és a gyakorlatban kiválóan használja a gyorsítótárat.',
        formulas: ['gyors-f'],
        example: 'Lomuto-particionálás, vezérelem az utolsó elem (5): [7, 2, 9, 4, 3, 8, 5]. A ≤ 5 elemeket (2, 4, 3) sorban a tömb elejére cseréljük, végül a vezérelemet mögéjük: [2, 4, 3, **5**, 9, 8, 7]. Az 5 a végleges helyén (3. index) van; rekurzívan rendezzük a [2, 4, 3] és a [9, 8, 7] részt.',
        pitfall: 'Rendezett vagy majdnem rendezett bemeneten a „mindig az első elem” vezérelem négyzetes futást és nagyon mély rekurziót okoz. Sok egyenlő kulcsnál a sima kétfelé particionálás is elromolhat – ilyenkor háromfelé (kisebb, egyenlő, nagyobb) érdemes osztani.',
        related: ['oszd-meg', 'osszefesulo-rendezes', 'kupac', 'stabilitas', 'futasi-ido', 'beszuro-rendezes', 'also-korlat'] },
      { id: 'stabilitas', term: 'Stabil rendezés', en: 'stable sorting', topic: 'rendezes',
        short: 'Egy rendezés stabil, ha az egyenlő kulcsú elemek egymáshoz viszonyított sorrendje a rendezés után ugyanaz marad, mint a bemenetben volt.',
        text: 'A stabilitásnak akkor van jelentősége, ha a rendezett elemekhez egyéb adat is tartozik (rekordokat rendezünk egy mező szerint). Ilyenkor több kulcs szerint is rendezhetünk egymás után: ha előbb név, majd **stabil** rendezéssel jegy szerint rendezünk, az azonos jegyűek névsorban maradnak.\n\nStabil: beszúró, összefésülő, leszámoló (counting) rendezés, Timsort (Python `sorted`, Java objektumok rendezése). Nem stabil: gyorsrendezés, kupacrendezés, kiválasztó rendezés.\n\nA **számjegyes (radix) rendezés** kifejezetten épít a stabilitásra: a legkisebb helyiértéktől a legnagyobbig haladva, minden számjegy szerint stabilan rendez.\n\nBármely rendezés stabillá tehető, ha minden elemhez hozzávesszük az eredeti indexét másodlagos kulcsként – ez viszont extra memóriába kerül.',
        example: 'Bemenet: (Anna, 4), (Béla, 5), (Cili, 4), (Dani, 5). Jegy szerint csökkenő, **stabil** rendezés: (Béla, 5), (Dani, 5), (Anna, 4), (Cili, 4) – az egyenlő jegyűek eredeti (itt névsoros) sorrendje megmaradt. Egy nem stabil rendezés adhatná a (Dani, 5), (Béla, 5), … sorrendet is.',
        pitfall: 'Ha a kulcs maga az egész elem (például egészeket rendezünk), a stabilitás nem figyelhető meg és nem is számít. C++-ban a `std::sort` nem stabil, stabil rendezéshez a `std::stable_sort` kell; JavaScriptben az `Array.prototype.sort` csak 2019 óta garantáltan stabil.',
        related: ['beszuro-rendezes', 'osszefesulo-rendezes', 'gyorsrendezes', 'kupac', 'also-korlat'] },
      { id: 'also-korlat', term: 'Az összehasonlító rendezés alsó korlátja', en: 'Ω(n log n) lower bound for comparison sorting', topic: 'rendezes',
        short: 'Minden olyan rendezőalgoritmusnak, amely az elemekről csak páronkénti összehasonlítással szerez információt, legrosszabb esetben legalább ⌈log₂(n!)⌉ = Ω(n·log n) összehasonlítás kell.',
        text: 'A bizonyítás a **döntési fán** alapul. Bármely összehasonlító algoritmus működése egy bináris fával írható le: minden belső csúcs egy „`a_i < a_j`?” kérdés, minden levél egy kimeneti sorrend. Mivel a bemenet n! különböző sorrendben érkezhet, és mindegyikhez más permutáció kell, a fának legalább **n! levele** van. Egy h magasságú bináris fának legfeljebb 2ʰ levele lehet, így `h ≥ log₂(n!)`. A Stirling-formulából `log₂(n!) ≈ n·log₂ n − 1,44·n`.\n\nKövetkezmény: az összefésülő rendezés és a kupacrendezés **aszimptotikusan optimális**.\n\nA korlát megkerülhető, ha nem csak összehasonlítunk, hanem a kulcsok szerkezetét is kihasználjuk:\n\n- **leszámoló rendezés**: k-féle egész kulcsra Θ(n + k);\n- **számjegyes (radix) rendezés**: d jegyű kulcsokra Θ(d·(n + k));\n- **edényrendezés** (bucket sort): egyenletes eloszlásnál átlagosan Θ(n).',
        formulas: ['also-korlat-f'],
        example: 'n = 3: 3! = 6 sorrend, `log₂ 6 ≈ 2,58`, tehát legalább 3 összehasonlítás kell. n = 10: legalább 22.\n\nÉrdekesség: 12 elemhez a korlát 29, de bebizonyították, hogy valójában 30 összehasonlítás kell – a korlát tehát nem mindig érhető el pontosan.',
        pitfall: 'A leszámoló és a radix rendezés **nem cáfolja** a tételt, mert nem összehasonlító algoritmusok. Viszont csak korlátos értékkészletű (például egész vagy fix hosszú) kulcsokra használhatók; tetszőleges valós számokra vagy összetett objektumokra nem.',
        related: ['osszefesulo-rendezes', 'kupac', 'gyorsrendezes', 'aszimptotikus-jeloles', 'stabilitas', 'beszuro-rendezes'] },
      { id: 'binaris-kereses', term: 'Bináris keresés', en: 'binary search', topic: 'rendezes',
        short: 'Rendezett tömbben a középső elemet hasonlítja össze a keresett kulccsal, és a keresést a megfelelő felére szűkíti; legfeljebb ⌊log₂ n⌋ + 1 összehasonlítás, Θ(log n).',
        prereq: ['lecke:matematika/egyenletek'],
        visual: bsSvg, caption: 'A 72 keresése 16 elemű rendezett tömbben: minden lépés felezi a még szóba jöhető tartományt (halványak a kizárt elemek).',
        text: 'Az algoritmus a `[lo, hi]` indextartományt szűkíti; invariáns: ha a kulcs a tömbben van, akkor ebben a tartományban van.\n\n1. Kezdetben `lo = 0`, `hi = n − 1`.\n2. Amíg `lo ≤ hi`: legyen `mid = lo + (hi − lo) / 2` (egészosztás).\n3. Ha `A[mid]` = kulcs, kész; ha kisebb, `lo = mid + 1`; ha nagyobb, `hi = mid − 1`.\n4. Ha a tartomány kiürült, a kulcs nincs a tömbben.\n\nVáltozatai is fontosak: az **alsó határ** (lower bound) keresése az első, a kulcsnál nem kisebb elem helyét adja; a „**keresés a válaszra**” pedig bármely monoton igen/nem kérdésre működik (például: mekkora a legkisebb kapacitás, amellyel a feladat még megoldható?). A numerikus **intervallumfelezés** (egyenlet gyökének keresése) ugyanez a gondolat valós számokon.',
        formulas: ['binker-f'],
        example: 'Egymillió elemű rendezett tömbben legfeljebb **20** összehasonlítás kell, egymilliárdban 30. Az ábrán a 72 a 4. lépésben kerül elő: 45 → 77 → 61 → 72.',
        pitfall: 'A `mid = (lo + hi) / 2` képlet nagy tömbön **túlcsordulhat** (lo + hi nagyobb, mint a legnagyobb ábrázolható egész) – ez a hiba évekig benne volt a Java szabványos könyvtárában. Helyesen: `lo + (hi − lo) / 2`. A bináris keresés csak **rendezett**, közvetlenül indexelhető adaton működik; láncolt listán értelmetlen.',
        related: ['tomb', 'binaris-keresofa', 'oszd-meg', 'mester-tetel', 'aszimptotikus-jeloles', 'futasi-ido'] },

      /* ----- Fák és gráfok ----- */
      { id: 'binaris-keresofa', term: 'Bináris keresőfa', en: 'binary search tree (BST)', topic: 'fak',
        short: 'Bináris fa, amelyben minden csúcsra igaz, hogy bal részfájának kulcsai kisebbek, jobb részfájának kulcsai nagyobbak a csúcs kulcsánál. A keresés, beszúrás és törlés ideje a fa h magasságával arányos.',
        visual: bstSvg, caption: 'Bináris keresőfa; narancs: a 35 keresésének útja a gyökértől. Minden lépésben csak az egyik részfában kell tovább keresni.',
        text: 'A **keresés** a gyökértől indul: ha a kulcs kisebb a csúcsénál, balra, ha nagyobb, jobbra lépünk. A **beszúrás** ugyanezen az úton halad, és az új csúcs levélként kerül oda, ahol a keresés üres helyre futna.\n\nA **törlés** három esete:\n\n1. levél: egyszerűen eltávolítjuk;\n2. egy gyerek: a gyerek a csúcs helyére lép;\n3. két gyerek: a csúcs kulcsát a **rákövetkezőjével** (a jobb részfa legkisebb elemével) helyettesítjük, majd azt töröljük – annak legfeljebb egy gyereke van.\n\nAz **inorder bejárás** (bal részfa, csúcs, jobb részfa) a kulcsokat rendezett sorrendben adja. A hasítótáblával szemben ezért a keresőfa támogatja a minimum/maximum, a rákövetkező és az **intervallum-lekérdezéseket** is.\n\nA magasság ⌊log₂ n⌋ és n − 1 között lehet – minden a beszúrási sorrendtől függ.',
        example: 'Az 50, 30, 70, 20, 40, 60, 80 sorrendű beszúrás 3 szintű, kiegyensúlyozott fát ad: bármely kulcs legfeljebb 3 összehasonlítással megtalálható. Ugyanezek a kulcsok növekvő sorrendben (20, 30, …, 80) beszúrva egyetlen jobbra lógó láncot alkotnak: a 80 keresése 7 összehasonlítás – a fa láncolt listává fajult.',
        pitfall: 'Rendezett vagy majdnem rendezett adatok beszúrásakor a sima keresőfa **elfajul**, és a műveletek O(n)-esek lesznek. Ha a beszúrási sorrend nem véletlen, kiegyensúlyozott fát kell használni.',
        related: ['kiegyensulyozott-fa', 'binaris-kereses', 'hasitotabla', 'kupac', 'rekurzio'] },
      { id: 'kiegyensulyozott-fa', term: 'Kiegyensúlyozott keresőfa (AVL-fa, piros-fekete fa)', en: 'self-balancing search tree (AVL tree, red–black tree)', topic: 'fak',
        short: 'Olyan bináris keresőfa, amely minden beszúrás és törlés után forgatásokkal helyreállítja az egyensúlyát, így magassága O(log n) marad, és minden művelet legrosszabb esetben is O(log n).',
        visual: rotSvg, caption: 'Egyszeres jobbra forgatás: a 10, 20, 30 lánc kiegyensúlyozott fává alakul, az inorder sorrend (10, 20, 30) változatlan.',
        text: 'A **forgatás** néhány pointer átállításával O(1) idő alatt átrendez egy kis részfát úgy, hogy a keresőfa-tulajdonság megmarad, de a magasság csökken. A kiegyensúlyozó fák abban különböznek, milyen „egyensúlyt” tartanak fenn:\n\n- **AVL-fa** (Adelszon-Velszkij és Landisz, 1962): minden csúcsban a két részfa magasságának különbsége legfeljebb 1. Magassága ≤ 1,44·log₂(n + 2). Beszúráskor legfeljebb egy (egyszeres vagy kettős) forgatás kell.\n- **Piros-fekete fa**: a csúcsok színezésére vonatkozó szabályok (piros csúcsnak nincs piros gyereke; minden gyökér–levél úton ugyanannyi fekete csúcs van) biztosítják, hogy magassága ≤ 2·log₂(n + 1). Kevesebbet forgat, ezért ez a C++ `std::map`, a Java `TreeMap` és a Linux ütemező alapja.\n- **B-fa**: csúcsonként sok kulcs és gyerek; az adatbázisok és fájlrendszerek indexe, mert minden csúcs egy lemezblokk, és kevés szint kell.',
        example: 'n = 10⁶ kulcs esetén az AVL-fa magassága legfeljebb ≈ 28, a piros-fekete fáé legfeljebb ≈ 39 – szemben egy elfajult fa 10⁶-os magasságával. Egy 100-as elágazású B-fában 3 szint elég egymillió kulcshoz (100³ = 10⁶), azaz 3 lemezolvasás.',
        pitfall: 'A „kiegyensúlyozott” nem azt jelenti, hogy **tökéletesen** kiegyensúlyozott (az túl drága lenne fenntartani), hanem hogy a magasság a log n konstansszorosa. Forgatáskor a részfák átkötésének sorrendjére ugyanúgy figyelni kell, mint a láncolt listánál.',
        related: ['binaris-keresofa', 'hasitotabla', 'kupac', 'aszimptotikus-jeloles'] },
      { id: 'kupac', term: 'Kupac és kupacrendezés', en: 'binary heap; heapsort', topic: 'fak',
        short: 'A (bináris maximum-)kupac olyan majdnem teljes bináris fa, amelyben minden csúcs kulcsa legalább akkora, mint a gyerekeié. Tömbben tárolható; a maximum O(1) idő alatt olvasható, beszúrás és a maximum törlése O(log n).',
        visual: heapSvg, caption: 'Ugyanaz a maximum-kupac fa- és tömbalakban: a tömbben nincs szükség pointerekre, a gyerekek indexe kiszámítható.',
        text: 'A fa szintenként, balról jobbra van feltöltve, ezért pointerek nélkül, **tömbben** tárolható: 0-tól indexelve az i-edik elem gyerekei a `2i + 1` és `2i + 2`, szülője a `⌊(i − 1)/2⌋` indexen van. A magasság ⌊log₂ n⌋.\n\nAlapműveletek:\n\n- **beszúrás**: az új elem a tömb végére kerül, majd **felfelé szivárog** (amíg nagyobb a szülőjénél, helyet cserél vele);\n- **maximum törlése**: a gyökérre az utolsó elemet tesszük, majd az **lefelé szivárog** (mindig a nagyobbik gyerekkel cserél);\n- **kupacépítés**: a tömb második felétől visszafelé minden elemet lesüllyesztünk – meglepő módon ez csak **O(n)**.\n\nA kupac a **prioritási sor** szokásos megvalósítása (Dijkstra- és Prim-algoritmus, folyamatütemezés, eseményszimuláció).\n\n**Kupacrendezés**: felépítjük a maximum-kupacot, majd n − 1-szer a gyökeret (a maximumot) kicseréljük az utolsó elemmel, a kupacot eggyel rövidebbnek tekintjük, és lesüllyesztjük az új gyökeret. Legrosszabb esetben is **Θ(n·log n)**, helyben dolgozik, de nem stabil.',
        example: 'A [90, 70, 80, 30, 60, 50, 20] kupacba beszúrjuk a 85-öt: a 7-es indexre kerül (szülője a 3-as indexű 30) → csere a 30-cal → a 3-as indexen szülője a 70 → csere → az 1-es indexen szülője a 90, megállunk. Eredmény: [90, 85, 80, 70, 60, 50, 20, 30], 2 cserével.',
        pitfall: 'A kupac **nem rendezett** szerkezet: csak a gyökérről tudjuk biztosan, hogy maximum. Egy tetszőleges kulcs keresése benne O(n), és az inorder bejárás sem rendezett sorrendet ad – ez a bináris keresőfa tulajdonsága, nem a kupacé.',
        related: ['dijkstra', 'feszitofa', 'verem-sor', 'binaris-keresofa', 'also-korlat', 'gyorsrendezes', 'stabilitas', 'tomb'] },
      { id: 'grafabrazolas', term: 'Gráf és ábrázolása', en: 'graph representation: adjacency matrix, adjacency list', topic: 'fak',
        short: 'A G = (V, E) gráf csúcsokból és őket összekötő élekből áll. Számítógépen szomszédsági mátrixszal (Θ(n²) tár) vagy szomszédsági listával (Θ(n + m) tár) ábrázoljuk, ahol n a csúcsok, m az élek száma.',
        visual: graphSvg, caption: 'Egy 4 csúcsú irányítatlan gráf, a szomszédsági mátrixa (szimmetrikus) és a szomszédsági listái.',
        text: 'A gráf lehet **irányított** vagy **irányítatlan**, **súlyozott** (az éleknek költsége, hossza van) vagy súlyozatlan. Egy irányítatlan, egyszerű gráfnak legfeljebb `n(n − 1)/2` éle lehet. Ha m ennél nagyságrenddel kisebb (például m ≈ 3n), a gráf **ritka**, egyébként **sűrű**. A legtöbb valódi hálózat (úthálózat, közösségi háló, weboldalak linkjei) ritka.\n\n**Szomszédsági mátrix**: n × n-es tömb, `A[i][j] = 1` (vagy az él súlya), ha van i → j él.\n\n- „van-e él i és j között?” O(1);\n- egy csúcs szomszédainak felsorolása O(n);\n- tár Θ(n²) – sűrű gráfra jó.\n\n**Szomszédsági lista**: minden csúcshoz a szomszédai listája.\n\n- szomszédok felsorolása O(fokszám);\n- élkeresés O(fokszám);\n- tár Θ(n + m) – ritka gráfra ez a jó választás, és ezzel fut a szélességi és a mélységi bejárás Θ(n + m) idő alatt.',
        example: 'Egy országos úthálózat 10⁶ csomóponttal és kb. 3·10⁶ útszakasszal: a szomszédsági mátrixnak 10¹² cellája lenne (bitenként is 125 GB), a szomszédsági lista néhány tíz megabájt.',
        pitfall: 'Irányítatlan gráf szomszédsági listájában minden él **kétszer** szerepel (mindkét végpontnál), ezért a lista összhossza 2m. Ha egy élt törlünk, mindkét bejegyzést törölni kell.',
        related: ['bfs', 'dfs', 'dijkstra', 'feszitofa', 'lancolt-lista', 'tomb'] },
      { id: 'bfs', term: 'Szélességi bejárás (BFS)', en: 'breadth-first search', topic: 'fak',
        short: 'Gráfbejárás, amely a kezdőcsúcstól rétegenként halad: előbb az összes egy élnyire lévő csúcsot járja be, utána a két élnyire lévőket, és így tovább. Súlyozatlan gráfban legrövidebb utakat talál; ideje Θ(n + m).',
        visual: bfsSvg, caption: 'Szélességi bejárás s-ből: a színek a rétegeket (a kezdőcsúcstól mért élszámot) jelölik, a vastag élek a BFS-fát alkotják.',
        text: 'A BFS egy **sort** használ:\n\n1. Az s kezdőcsúcsot elértnek jelöljük, `d[s] = 0`, és betesszük a sorba.\n2. Amíg a sor nem üres, kivesszük az elején álló u csúcsot.\n3. u minden még el nem ért v szomszédját elértnek jelöljük, `d[v] = d[u] + 1`, `szülő[v] = u`, és a sor végére tesszük.\n\nMivel a sor FIFO, a csúcsok a távolságuk szerinti sorrendben kerülnek ki: előbb mind a d = 1 rétegbeliek, aztán a d = 2-esek. Ezért a `d[v]` érték pontosan a **legkevesebb élből álló út** hossza, a szülő-pointerek pedig a **legrövidebb utak fáját** adják.\n\nMinden csúcs egyszer kerül a sorba, minden élt (irányítatlan gráfban) kétszer vizsgálunk: Θ(n + m).\n\nAlkalmazások: legrövidebb út súlyozatlan gráfban (labirintus, „hány kézfogásnyira van”), összefüggő komponensek, páros gráf felismerése, webes robotok (crawler).',
        example: 'Az ábra gráfjában s-ből: d(a) = d(b) = 1, d(c) = d(d) = d(e) = 2, d(f) = 3. Az f-be vezető legrövidebb út a szülő-pointereken visszafelé: f ← c ← a ← s. Az a–b él egy rétegen belül fut, ezért nem kerül a BFS-fába.',
        pitfall: 'A csúcsot akkor kell elértnek jelölni, amikor **bekerül** a sorba, nem amikor kikerül – különben ugyanaz a csúcs többször is bekerülhet. Súlyozott gráfban a BFS **nem** ad legrövidebb utat (kevesebb él nem jelent kisebb összköltséget) – oda Dijkstra kell.',
        related: ['dfs', 'verem-sor', 'dijkstra', 'grafabrazolas', 'feszitofa'] },
      { id: 'dfs', term: 'Mélységi bejárás (DFS)', en: 'depth-first search', topic: 'fak',
        short: 'Gráfbejárás, amely amíg lehet, mindig egy még nem látott szomszéd felé halad tovább, és csak zsákutcában lép vissza. Rekurzióval vagy veremmel valósítható meg; ideje Θ(n + m).',
        text: 'A DFS olyan, mint a labirintusban a „mindig fordulj jobbra, ha zsákutca, lépj vissza” módszer. Minden csúcshoz két időpontot jegyezhetünk fel: mikor **értük el** (elérési idő) és mikor **fejeztük be** (befejezési idő – ekkorra az összes belőle elérhető csúcsot bejártuk).\n\nA bejárás közben az élek osztályozhatók: **faél**, **visszaél** (egy ősre mutat), előreél és keresztél. Ebből sok algoritmus épül:\n\n- **körkeresés**: irányított gráfban akkor és csak akkor van kör, ha a DFS talál visszaélt;\n- **topologikus rendezés**: körmentes irányított gráf (DAG) csúcsait a befejezési idők szerint csökkenő sorrendbe téve minden él „előre” mutat;\n- **erősen összefüggő komponensek** (Kosaraju, Tarjan algoritmusa);\n- elvágó csúcsok és hidak keresése hálózatokban.',
        example: 'Tantárgyi előfeltételek: Programozás → Algoritmusok, Diszkrét matematika → Algoritmusok, Algoritmusok → Mesterséges intelligencia, Analízis → Valószínűségszámítás → Mesterséges intelligencia. A DFS befejezési időinek fordított sorrendje egy felvehető tárgysorrend, például: Analízis, Valószínűségszámítás, Diszkrét matematika, Programozás, Algoritmusok, Mesterséges intelligencia.',
        pitfall: 'A DFS **nem** legrövidebb utakat talál: egy csúcshoz vezető első DFS-út lehet nagyon hosszú. Nagy gráfon a rekurzív változat túlcsordíthatja a hívási vermet (például egy egymillió csúcsú úton) – ilyenkor explicit veremmel kell megírni.',
        related: ['bfs', 'verem-sor', 'rekurzio', 'grafabrazolas'] },
      { id: 'dijkstra', term: 'Dijkstra-algoritmus', en: "Dijkstra's shortest-path algorithm", topic: 'fak',
        short: 'Nemnegatív élsúlyú gráfban egy kezdőcsúcsból az összes többibe vezető legrövidebb utakat számítja ki: mindig a legkisebb ideiglenes távolságú, még nem végleges csúcsot véglegesíti, és szomszédain javítja (közelíti) a távolságbecslést.',
        visual: dijSvg, caption: 'Dijkstra-algoritmus s-ből: narancs számok a végleges távolságok, kék élek a legrövidebb utak fája.',
        text: 'Edsger W. Dijkstra 1956-ban, állítólag húsz perc alatt találta ki egy amszterdami kávézóban.\n\n1. Kezdetben `d[s] = 0`, minden más csúcsra `d[v] = ∞`.\n2. Válasszuk ki a még nem végleges csúcsok közül a legkisebb d értékűt (u), és véglegesítsük.\n3. **Közelítés** (relaxáció) u minden v szomszédjára: ha `d[u] + w(u, v) < d[v]`, akkor `d[v] ← d[u] + w(u, v)` és `szülő[v] ← u`.\n4. Ismételjük, amíg van nem végleges, elérhető csúcs.\n\nEz **mohó** algoritmus: a legkisebb ideiglenes távolság azért biztosan végleges, mert minden más út egy nagyobb távolságú csúcson át vezetne, és nemnegatív élek mentén a hossz már nem csökkenhet.\n\nA 2. lépéshez **kupac** (prioritási sor) kell: így a futási idő **O((n + m)·log n)**. Az útvonaltervezők ennek gyorsított változatait használják (A-csillag keresés heurisztikával, előfeldolgozással).',
        example: 'Az ábra gráfjában a véglegesítés sorrendje és távolságai: s = 0, b = 2, a = 3 (b-n át, mert 2 + 1 < 4), c = 8, d = 9 (b-n át: 2 + 7, nem c-n át: 8 + 2 = 10), t = 11 (d-n át: 9 + 2; c-n át 14 lenne).',
        pitfall: 'Negatív élsúly esetén hibás eredményt adhat, mert egy már véglegesített távolság később egy negatív élen át csökkenhetne. Ilyenkor a **Bellman–Ford-algoritmus** kell (O(n·m)), amely a negatív kört is felismeri. A legrövidebb utak fája általában **nem** azonos a minimális feszítőfával.',
        related: ['bfs', 'kupac', 'moho', 'feszitofa', 'grafabrazolas', 'dinamikus-programozas'] },
      { id: 'feszitofa', term: 'Minimális feszítőfa (Kruskal, Prim)', en: 'minimum spanning tree (MST)', topic: 'fak',
        short: 'Összefüggő, súlyozott, irányítatlan gráf olyan kört nem tartalmazó részgráfja, amely minden csúcsot összeköt (n − 1 éle van), és élsúlyainak összege a lehető legkisebb.',
        text: 'Mindkét klasszikus algoritmus **mohó**, és a **vágási tulajdonságon** alapul: ha a csúcsokat bármely módon két csoportra osztjuk, a két csoport közötti legolcsóbb él benne van egy minimális feszítőfában.\n\n**Kruskal-algoritmusa**: az éleket súly szerint növekvő sorrendbe rendezzük, és sorban mindegyiket felvesszük, ha nem zár kört. A körfigyeléshez az **unió–holvan** (disjoint set) adatszerkezet kell. Ideje O(m·log m), a rendezés dominál.\n\n**Prim-algoritmusa**: egy csúcsból indulva a fát növeljük, mindig a fából kivezető legolcsóbb éllel. Kupaccal O(m·log n) – szerkezete nagyon hasonlít a Dijkstra-algoritmuséhoz.\n\nAlkalmazások: hálózattervezés (kábel, csővezeték, áramhálózat legolcsóbb kiépítése), klaszterezés (a legdrágább élek elhagyásával), az utazóügynök-probléma közelítése.',
        example: 'A Dijkstra-ábra gráfjára Kruskal: a–b (1) ✓, s–b (2) ✓, c–d (2) ✓, d–t (2) ✓, s–a (4) ✗ (kört zárna), a–c (5) ✓ – kész, 5 él, összsúly **12**. A legrövidebb utak fája (s–b, a–b, a–c, b–d, d–t) súlya 17: a két fa különbözik.',
        pitfall: 'A minimális feszítőfa **nem** a legrövidebb utak fája. Egyszerű ellenpélda: háromszög s–a (3), s–b (3), a–b (2). Az MST az a–b és az egyik s-él (összesen 5), az s-ből induló legrövidebb utak fája viszont s–a és s–b (összesen 6). Irányított gráfra a feladat más (minimális fenyő, Edmonds-algoritmus).',
        related: ['moho', 'dijkstra', 'kupac', 'grafabrazolas', 'p-np', 'bfs'] },

      /* ----- Módszerek ----- */
      { id: 'oszd-meg', term: 'Oszd meg és uralkodj', en: 'divide and conquer', topic: 'modszerek',
        short: 'Algoritmustervezési módszer: a feladatot kisebb, azonos típusú, egymástól független részfeladatokra bontja, ezeket rekurzívan megoldja, majd a részeredményekből összerakja a teljes megoldást.',
        text: 'A módszer három lépése:\n\n1. **Felosztás**: a bemenetet kisebb részekre bontjuk.\n2. **Uralkodás**: a részfeladatokat rekurzívan megoldjuk (elég kicsi méretnél közvetlenül).\n3. **Összevonás**: a részmegoldásokból felépítjük a teljes megoldást.\n\nKlasszikus példák: összefésülő rendezés (a munka az összevonásban van), gyorsrendezés (a munka a felosztásban van), bináris keresés (csak az egyik részfeladatot kell megoldani), Karatsuba-szorzás, Strassen-mátrixszorzás, gyors Fourier-transzformáció (FFT), legközelebbi pontpár.\n\nA futási időt a **mester-tétellel** elemezzük. Mivel a részfeladatok függetlenek, a módszer jól **párhuzamosítható** is.',
        formulas: ['mester-f'],
        example: 'Karatsuba-szorzás: `1234 × 5678`. Bontsuk fel: a = 12, b = 34, c = 56, d = 78. Három szorzás: `ac = 672`, `bd = 2652`, `(a + b)(c + d) = 46·134 = 6164`, ebből `ad + bc = 6164 − 672 − 2652 = 2840`. Összerakva: `672·10⁴ + 2840·10² + 2652 = 7 006 652`. Négy helyett három részszorzás: `T(n) = 3T(n/2) + O(n) = O(n^1,585)`.',
        pitfall: 'Ha a részfeladatok **átfedik** egymást (ugyanaz a részfeladat sokszor előkerül, mint a naiv Fibonacci-rekurzióban), a módszer exponenciálissá válhat. Ilyenkor dinamikus programozás kell, amely minden részfeladatot csak egyszer old meg.',
        related: ['mester-tetel', 'rekurzio', 'osszefesulo-rendezes', 'gyorsrendezes', 'binaris-kereses', 'dinamikus-programozas'] },
      { id: 'dinamikus-programozas', term: 'Dinamikus programozás', en: 'dynamic programming', topic: 'modszerek',
        short: 'Módszer olyan feladatokra, amelyek átfedő részfeladatokra bonthatók és optimális részstruktúrájúak: minden részfeladatot csak egyszer old meg, az eredményt táblázatban tárolja, és abból építi fel a nagyobb részfeladatok megoldását.',
        visual: dpSvg, caption: 'Pénzváltás {1, 3, 4} érmékkel: az opt táblázat balról jobbra töltődik, a zöld nyilak a 6-os összeg optimális felbontását (3 + 3) követik vissza.',
        text: 'Két feltétel kell:\n\n- **optimális részstruktúra**: az optimális megoldás részei maguk is optimális megoldásai a megfelelő részfeladatoknak;\n- **átfedő részfeladatok**: ugyanazok a részfeladatok sokszor előkerülnek.\n\nA tervezés lépései: 1) definiáljuk a részfeladatot (mit jelent egy táblázatcella), 2) írjunk rá rekurzív összefüggést, 3) határozzuk meg a kitöltési sorrendet, 4) a táblázatból olvassuk ki (és szükség esetén visszakövetéssel állítsuk elő) a megoldást.\n\nKét megvalósítás: **feljegyzéses** (memoizálás, felülről lefelé: rekurzió + gyorsítótár) és **táblázatos** (alulról felfelé, ciklusokkal).\n\nKlasszikus feladatok: leghosszabb közös részsorozat (O(n·m), a `diff` program alapja), szerkesztési távolság (helyesírás-ellenőrzés, DNS-összehasonlítás), 0–1 hátizsák (O(n·W)), Bellman–Ford és Floyd–Warshall legrövidebb utak.',
        example: 'Pénzváltás {1, 3, 4} érmékkel 6-ra: `opt[x] = 1 + min(opt[x−1], opt[x−3], opt[x−4])`, `opt[0] = 0`. A táblázat: 0, 1, 2, 1, 1, 2, 2 – tehát **2 érme** (3 + 3). A mohó algoritmus 4 + 1 + 1 = 3 érmét adna.\n\nFibonacci: a naiv rekurzió fib(40)-hez 331 millió hívást tesz, a táblázatos változat 39 összeadást.',
        pitfall: 'A hátizsák-feladat O(n·W) algoritmusa csak **pszeudopolinomiális**: W értéke a bemenetben csak log W biten szerepel, így W-ben „exponenciális”. Optimális részstruktúra nélkül a módszer hibás: például a leghosszabb **egyszerű** út részútjai nem feltétlenül leghosszabbak.',
        related: ['rekurzio', 'oszd-meg', 'moho', 'dijkstra', 'p-np'] },
      { id: 'moho', term: 'Mohó algoritmus', en: 'greedy algorithm', topic: 'modszerek',
        short: 'Minden lépésben a pillanatnyilag legjobbnak látszó választást teszi, és azt soha nem vonja vissza. Csak bizonyos feladatoknál (mohó választási tulajdonság + optimális részstruktúra) ad garantáltan optimális megoldást.',
        text: 'A mohó algoritmus gyors és egyszerű, de a helyességét mindig **bizonyítani** kell. A szokásos bizonyítási technika a **cserélési érvelés**: megmutatjuk, hogy bármely optimális megoldás átalakítható úgy, hogy a mohó első választást tartalmazza, és közben nem romlik.\n\nAhol működik:\n\n- Dijkstra-algoritmus (nemnegatív élekkel);\n- Kruskal- és Prim-algoritmus (minimális feszítőfa);\n- Huffman-kódolás (optimális prefixkód, a ZIP és a JPEG része);\n- tevékenységkiválasztás: mindig a legkorábban **végződő** tevékenységet választjuk;\n- tört hátizsák (a tárgyak darabolhatók): érték/súly arány szerint.\n\nAhol nem: 0–1 hátizsák, általános pénzváltás, utazóügynök-probléma (a „mindig a legközelebbi város” heurisztika akár sokszorosan rosszabb utat adhat).',
        example: 'Forint-érmék (5, 10, 20, 50, 100, 200) esetén a mohó pénzváltás optimális: 385 Ft = 200 + 100 + 50 + 20 + 10 + 5, 6 érme. De ha {1, 3, 4} érméink vannak, 6-ra a mohó 4 + 1 + 1 (3 érme), az optimum 3 + 3 (2 érme).',
        pitfall: 'Az, hogy egy mohó algoritmus néhány példán jó eredményt ad, **nem bizonyíték**. Ha nincs bizonyítás, a mohó algoritmus csak heurisztika: gyors, de esetleg rossz megoldást ad.',
        related: ['dijkstra', 'feszitofa', 'dinamikus-programozas', 'p-np'] },
      { id: 'p-np', term: 'P és NP', en: 'P vs NP; NP-completeness', topic: 'modszerek',
        short: 'P a polinom időben megoldható, NP a polinom időben ellenőrizhető (igen/nem) döntési problémák osztálya. P ⊆ NP; az, hogy P = NP-e, az informatika legnagyobb nyitott kérdése.',
        text: 'Egy probléma **NP**-ben van, ha egy „igen” válaszhoz létezik rövid **tanú** (például egy konkrét útvonal, egy változókiosztás), amelynek helyessége polinom időben ellenőrizhető. Megtalálni a tanút viszont nehéz lehet. Az NP rövidítés a „nemdeterminisztikus polinomiális” kifejezésből jön, **nem** a „nem polinomiális”-ból.\n\nEgy probléma **NP-teljes**, ha NP-ben van, és minden NP-beli probléma polinom időben **visszavezethető** rá. Az első ilyen a logikai kielégíthetőség (SAT) volt (Cook–Levin-tétel, 1971). Azóta ezreket ismerünk: Hamilton-kör, utazóügynök (döntési változat), gráf 3-színezése, hátizsák, órarendkészítés. Ha **egyetlen** NP-teljes problémára polinomiális algoritmust találnának, akkor P = NP lenne. A Clay Intézet egymillió dolláros díjat tűzött ki a kérdés eldöntésére.\n\nA gyakorlatban NP-nehéz feladatoknál: közelítő algoritmusok (garantált hibakorláttal), heurisztikák, kis méretre pontos exponenciális algoritmusok, SAT- és egészértékű programozási megoldók.',
        example: 'Utazóügynök 20 várossal: a lehetséges körutak száma `19!/2 ≈ 6,1·10¹⁶`. Másodpercenként 10⁹ út kiértékelésével ez kb. **1,9 év**. Egy adott körút hosszát (és hogy rövidebb-e egy korlátnál) viszont 20 összeadással ellenőrizzük – a megoldás ellenőrzése könnyű, megtalálása nehéz.',
        pitfall: 'Az NP-teljesség a **legrosszabb esetről** szól: sok konkrét bemenet a gyakorlatban jól megoldható (a modern SAT-megoldók milliónyi változót is kezelnek). Fordítva: a polinomiális sem mindig gyakorlatias, egy n¹⁰⁰ lépéses algoritmus használhatatlan. Az egész számok faktorizálása NP-ben van, de **nem ismert**, hogy NP-teljes-e – a titkosítás nem a P ≠ NP sejtésen, hanem konkrét problémák feltételezett nehézségén alapul.',
        related: ['futasi-ido', 'aszimptotikus-jeloles', 'dinamikus-programozas', 'moho', 'feszitofa'] },
      /* ----- Bonyolultság (kiegészítés) ----- */
      { id: 'amortizalt-elemzes', term: 'Amortizált elemzés', en: 'amortized analysis', topic: 'bonyolultsag',
        short: 'Az amortizált elemzés egy műveletsorozat teljes költségét osztja el a műveletek között: ha a ritka drága műveleteket sok olcsó „kifizeti”, az egy műveletre jutó átlagos költség legrosszabb esetben is kicsi. Nem valószínűségi átlag, hanem garantált felső korlát a sorozatra.',
        prereq: ['algoritmusok/aszimptotikus-jeloles'],
        formulas: ['potencial-f'],
        text: 'Egyetlen művelet legrosszabb esete gyakran túl pesszimista becslés. Például a dinamikus tömb hozzáfűzése néha O(n) (átmásolás), de ez csak minden duplázáskor fordul elő.\n\nHárom módszer:\n\n1. **Összesítéses (aggregate) módszer**: kiszámoljuk n művelet teljes költségét, T(n)-et, és elosztjuk n-nel.\n2. **Könyvelési (accounting) módszer**: minden műveletnek egy rögzített „díjat” számlázunk; az olcsó műveletek a tényleges költségük feletti részt **hitelként** az adatszerkezet elemein tárolják, és ebből fizetjük a későbbi drága műveleteket. A hitel sosem lehet negatív.\n3. **Potenciálmódszer**: a megtakarítást egyetlen Φ függvény írja le az adatszerkezet állapotán; az amortizált költség a tényleges költség plusz a potenciálváltozás.\n\nKlasszikus példák:\n\n- **dinamikus tömb** kétszeres növeléssel: n hozzáfűzés összesen `n + (1 + 2 + 4 + … ) < 3n` lépés → O(1) amortizált;\n- **bináris számláló** növelése: egy növelés akár minden bitet átbillenthet, de a legalsó bit minden alkalommal, a második minden második alkalommal billen… összesen `n·(1 + 1/2 + 1/4 + …) < 2n`;\n- **verem többszörös kivétellel** (multipop): minden elemet legfeljebb egyszer veszünk ki, ahányszor betettük;\n- **unió–holvan** útösszenyomással, **Fibonacci-kupac**, **splay-fa**, hasítótábla újrahasítással.\n\nFontos különbség: az **átlagos eset** egy bemeneti eloszlás feletti várható érték (szerencsétlen bemeneten rosszabb lehet), az **amortizált** korlát viszont **minden** műveletsorozatra garantált – csak az egyes műveletek ideje ingadozik.',
        example: 'Bináris számláló 0-ról 8-szor növelve: a bitátbillenések száma lépésenként 1, 2, 1, 3, 1, 2, 1, 4 – összesen **15 < 2·8 = 16**. Potenciállal: Φ = az 1-es bitek száma; egy növelés t darab 1-est nulláz és egy 0-t egyesre állít: tényleges költség t + 1, ΔΦ = 1 − t, amortizált költség **2**.',
        pitfall: 'Ha a tömböt nem kétszeresére, hanem állandó mennyiséggel (például +10 hellyel) növeljük, a hozzáfűzés amortizált költsége Θ(n) lesz, nem O(1). Valós idejű rendszerekben (ahol egyetlen művelet sem késhet) az amortizált korlát nem elég – ott egyenként garantált legrosszabb esetre kell tervezni.',
        related: ['tomb', 'hasitotabla', 'union-find', 'futasi-ido', 'aszimptotikus-jeloles'] },
      /* ----- Alap-adatszerkezetek (kiegészítés) ----- */
      { id: 'union-find', term: 'Unió–holvan (diszjunkt halmazok)', en: 'union–find; disjoint-set data structure', topic: 'adatszerk',
        short: 'Diszjunkt halmazok családját kezelő adatszerkezet két művelettel: holvan(x) megadja x halmazának képviselőjét, unió(x, y) összevonja két elem halmazát. Rang szerinti egyesítéssel és útösszenyomással a műveletek amortizált ideje gyakorlatilag konstans, O(α(n)).',
        prereq: ['algoritmusok/amortizalt-elemzes'],
        text: '**Ábrázolás**: minden halmaz egy gyökeres fa, az elemek a szülőjükre mutatnak, a gyökér a **képviselő**. Elég egyetlen tömb: `szülő[x]`.\n\n- **holvan(x)**: a szülőmutatókat követve felmegyünk a gyökérig.\n- **unió(x, y)**: megkeressük a két gyökeret, és az egyiket a másik alá kötjük.\n\nNaiv megvalósításban a fák hosszú láncokká fajulhatnak, és a holvan Θ(n) lesz. Két egyszerű javítás:\n\n1. **Rang (vagy méret) szerinti egyesítés**: mindig a kisebb (alacsonyabb) fát kötjük a nagyobb alá. Ettől a fa magassága legfeljebb ⌊log₂ n⌋, mert egy elem mélysége csak akkor nő, ha a fája legalább megduplázódik.\n2. **Útösszenyomás**: holvan közben a bejárt út minden csúcsát közvetlenül a gyökérre irányítjuk, így a későbbi keresések rövidek.\n\nA kettő együtt (Tarjan, 1975) m műveletre `O(m·α(n))` időt ad, ahol α az **inverz Ackermann-függvény**, amely minden gyakorlatban elképzelhető n-re legfeljebb 4 – tehát a műveletek amortizáltan **szinte konstans** idejűek.\n\nAlkalmazások:\n\n- **Kruskal-algoritmus**: zár-e kört egy új él (a két végpont ugyanabban a halmazban van-e?);\n- gráf **összefüggő komponensei** élek beérkezésével folyamatosan;\n- képfeldolgozásban összefüggő régiók címkézése;\n- ekvivalenciaosztályok (például fordítóprogramokban típusegyesítés, Kruskal-féle labirintusgenerálás).\n\nKorlátja: törlés vagy halmaz szétvágása nem támogatott hatékonyan.',
        example: '{1}, {2}, …, {6}. unió(1, 2), unió(3, 4), unió(2, 4): a {1, 2} és {3, 4} fák gyökerei összekapcsolódnak. holvan(1) és holvan(3) ugyanazt a gyökeret adja → „egy halmazban vannak”; holvan(5) ≠ holvan(1). Kruskal ezért elveti a (1, 3) élt: kört zárna.',
        pitfall: 'Az útösszenyomás **nem** a rangot csökkenti: a rang a magasság felső becslése marad, nem pontos érték – ezért nem kell frissíteni. Az O(α(n)) amortizált korlát, nem minden egyes műveletre érvényes: egyetlen holvan lehet O(log n).',
        related: ['feszitofa', 'amortizalt-elemzes', 'grafabrazolas', 'dfs'] },
      { id: 'b-fa', term: 'B-fa', en: 'B-tree', topic: 'adatszerk',
        short: 'A B-fa kiegyensúlyozott, sokágú keresőfa, amelynek csúcsai sok kulcsot tartalmaznak; minden levele azonos mélységben van. Lemezes (blokkos) tárolásra tervezték: a magassága nagyon kicsi, így kevés blokkolvasással találja meg a kulcsot.',
        prereq: ['algoritmusok/kiegyensulyozott-fa', 'adatbazis/index', 'digitalis-technika/memoriahierarchia'],
        text: 'Bayer és McCreight vezette be 1972-ben. A háttértár (lemez, SSD) adatot **blokkokban** olvas, és egy blokk elérése nagyságrendekkel lassabb, mint egy memóriabeli összehasonlítás. Ezért érdemes egy csúcsba annyi kulcsot tenni, amennyi egy blokkba fér.\n\n**t minimális fokszámú** B-fa tulajdonságai:\n\n- a gyökér kivételével minden csúcsban legalább **t − 1**, legfeljebb **2t − 1** kulcs van, rendezve;\n- egy k kulcsú belső csúcsnak **k + 1** gyereke van; a kulcsok a gyerek-részfák értéktartományait választják el (mint a bináris keresőfában);\n- minden levél ugyanazon a mélységen van.\n\nEbből a magasság: `h ≤ log_t((n + 1)/2)`.\n\n**Keresés**: csúcsonként egy blokkot olvasunk, a csúcson belül bináris kereséssel választunk gyereket. Lemezolvasás: O(h) = O(log_t n), processzoridő O(t·log_t n).\n\n**Beszúrás**: mindig levélbe. Ha a csúcs megtelt (2t − 1 kulcs), **kettévágjuk**: a középső kulcs felkerül a szülőbe. Ha a gyökér vágódik, a fa egy szinttel **felfelé** nő – ezért marad minden levél azonos mélységben.\n\n**Törlés**: ha egy csúcs t − 1 alá csökkenne, a testvérétől kölcsönöz kulcsot, vagy összeolvad vele.\n\nVáltozat: a **B⁺-fa** az adatokat csak a levelekben tárolja, a belső csúcsok csak útjelzők, a levelek láncolt listát alkotnak – ez jó **tartománylekérdezésekhez** (`WHERE x BETWEEN a AND b`). A relációs adatbázisok indexeinek és sok fájlrendszernek ez az alapja.',
        example: 't = 100 (egy csúcsban legfeljebb 199 kulcs) és n = 10⁹ kulcs: `h ≤ log₁₀₀(5·10⁸) ≈ 4,35`, tehát h ≤ 4, egy keresés legfeljebb **5 csúcsot** (blokkot) olvas. Egy kiegyensúlyozott bináris keresőfa ugyanennyi kulcsnál kb. 30 szint mély lenne – 30 lemezolvasás.',
        pitfall: 'A B-fa nem „bináris” fa – a „B” betű eredete nem tisztázott (Bayer? kiegyensúlyozott, balanced?), de biztosan nem a „bináris” rövidítése. Memóriában tartott kis adatokra nem feltétlenül jobb a piros-fekete fánál; az előnye ott jelentkezik, ahol a blokkelérés drága (és a cache-sorok miatt részben a memóriában is).',
        related: ['kiegyensulyozott-fa', 'binaris-keresofa', 'binaris-kereses', 'hasitotabla'] },
      /* ----- Rendezés és keresés (kiegészítés) ----- */
      { id: 'linearis-rendezes', term: 'Lineáris idejű rendezések (leszámláló, számjegyes, edényrendezés)', en: 'linear-time sorting: counting sort, radix sort, bucket sort', topic: 'rendezes',
        short: 'Ha a kulcsok nem tetszőlegesek, hanem például kis tartományba eső egész számok, összehasonlítás nélkül, a kulcsok értékét közvetlenül indexként használva lineáris időben lehet rendezni. Ez nem mond ellent az Ω(n·log n) alsó korlátnak, mert az csak az összehasonlító rendezésekre vonatkozik.',
        prereq: ['algoritmusok/also-korlat', 'algoritmusok/stabilitas'],
        text: '**Leszámláló rendezés** (counting sort), kulcsok a {0, …, k} tartományból:\n\n1. megszámoljuk, melyik érték hányszor fordul elő (`db[v]`);\n2. előtag-összeget képezünk: `db[v]` = a v-nél nem nagyobb kulcsok száma – ez megadja, hova kerül v utolsó példánya;\n3. a bemenetet **hátulról** bejárva minden elemet a helyére írunk, és csökkentjük a számlálót.\n\nIdő és tár Θ(n + k); **stabil** (az egyenlő kulcsok sorrendje megmarad – a hátulról bejárás ezt biztosítja). Csak akkor hatékony, ha k = O(n).\n\n**Számjegyes rendezés** (radix sort, LSD): a kulcsokat d jegyű, b alapú számként kezeljük, és a **legkisebb helyiértéktől** kezdve jegyenként rendezünk egy **stabil** rendezéssel (leszámlálással). A stabilitás miatt a korábbi (kisebb helyiértékű) rendezés hatása megmarad. Idő: Θ(d·(n + b)). 32 bites egészeket például 4 menetben, bájtonként (b = 256) lehet rendezni. Rögzített hosszúságú kulcsokra (irányítószám, dátum, IP-cím) kiváló. Történetileg a lyukkártya-rendező gépek így működtek.\n\n**Edényrendezés** (bucket sort): [0, 1) intervallumban **egyenletes eloszlású** valós számokra: n edénybe osztjuk őket érték szerint, edényenként rendezünk (például beszúró rendezéssel), majd összefűzzük. Várható idő Θ(n), de rossz (csomósodó) eloszlásnál a legrosszabb eset Θ(n²) is lehet.\n\nMind a három a kulcsok **szerkezetét** használja ki – ezért nem alkalmazhatók általános, csak összehasonlítással vizsgálható objektumokra.',
        example: 'Számjegyes rendezés: 329, 457, 657, 839, 436, 720, 355. Egyesek szerint: 720, 355, 436, 457, 657, 329, 839. Tízesek szerint (stabilan): 720, 329, 436, 839, 355, 457, 657. Százasok szerint: **329, 355, 436, 457, 657, 720, 839** – rendezett.',
        pitfall: 'A számjegyes rendezés csak akkor helyes, ha a jegyenkénti rendezés **stabil**; instabil belső rendezéssel a korábbi menetek eredménye elveszhet. A leszámláló rendezés nagy kulcstartományra (pl. 64 bites számok) használhatatlan, mert Θ(k) tárat foglal.',
        related: ['also-korlat', 'stabilitas', 'osszefesulo-rendezes', 'kivalasztas'] },
      { id: 'kivalasztas', term: 'Kiválasztás: k-adik legkisebb elem és medián', en: 'selection problem; quickselect; median of medians', topic: 'rendezes',
        short: 'A kiválasztási feladat egy rendezetlen tömb k-adik legkisebb elemének (például a mediánjának) megkeresése. Rendezés nélkül is megoldható lineáris időben: a gyorskiválasztás várhatóan O(n), a mediánok mediánja módszer legrosszabb esetben is O(n).',
        prereq: ['algoritmusok/gyorsrendezes', 'algoritmusok/mester-tetel'],
        text: 'A minimum vagy maximum n − 1 összehasonlítással megkereshető. Az általános k-adik elemre a kézenfekvő megoldás a rendezés, O(n·log n), de ennél jobb is lehetséges.\n\n**Gyorskiválasztás** (quickselect, Hoare): a gyorsrendezés felosztását használja. Választunk egy vezérelemet, és a tömböt „kisebbek | vezérelem | nagyobbak” részekre osztjuk. Ha a vezérelem a k-adik helyre került, kész; különben **csak abban az egy részben** folytatjuk, amelyikben a k-adik elem van.\n\n- Véletlen vezérelemmel a várható idő **Θ(n)**: átlagosan geometrikusan csökkenő méretű részekben dolgozunk (n + n/2 + n/4 + … ≈ 2n nagyságrend).\n- Legrosszabb esetben (mindig a legkisebb vagy legnagyobb a vezérelem) Θ(n²).\n\n**Mediánok mediánja** (Blum, Floyd, Pratt, Rivest, Tarjan, 1973) – determinisztikus lineáris idő:\n\n1. az elemeket ötös csoportokra osztjuk, minden csoport mediánját kiszámoljuk;\n2. rekurzívan megkeressük ezek mediánját – ez lesz a vezérelem;\n3. felosztunk, és a megfelelő részben rekurzívan folytatjuk.\n\nA vezérelem garantáltan „középtájon” van: legalább kb. 3n/10 elem kisebb és legalább ennyi nagyobb nála. A rekurzió `T(n) ≤ T(n/5) + T(7n/10) + O(n)`, és mivel `1/5 + 7/10 < 1`, a megoldás **Θ(n)**.\n\nA gyakorlatban a gyorskiválasztás (vagy annak hibrid változata, például az introselect) gyorsabb, a mediánok mediánja elméleti garanciát ad, és jó vezérelem-választó a gyorsrendezés legrosszabb esetének kiküszöbölésére.',
        example: 'Tömb: 7, 2, 9, 4, 1, 8, 5; keressük a mediánt (k = 4). Vezérelem 5 → kisebbek: 2, 4, 1 (3 elem), nagyobbak: 7, 9, 8. A vezérelem a 4. helyre került → a medián **5**, a jobb oldali részt meg sem kellett vizsgálni.',
        pitfall: 'A k-adik legkisebb elem megtalálásához **nem kell** az egész tömböt rendezni – ez gyakori túlzás. A mediánok mediánja nem adja meg közvetlenül a mediánt; csak egy elég jó vezérelemet, amellyel a rekurzió garantáltan lineáris.',
        related: ['gyorsrendezes', 'mester-tetel', 'oszd-meg', 'linearis-rendezes', 'randomizalt'] },
      { id: 'sztringkereses', term: 'Mintaillesztés szövegben (KMP, Rabin–Karp)', en: 'string matching: Knuth–Morris–Pratt, Rabin–Karp', topic: 'rendezes',
        short: 'A mintaillesztés egy m hosszú minta összes előfordulásának megkeresése egy n hosszú szövegben. A naiv módszer O(n·m) idejű; a Knuth–Morris–Pratt-algoritmus a minta szerkezetéből előre kiszámolt táblázattal O(n + m), a Rabin–Karp-algoritmus gördülő hasítással várhatóan O(n + m) idő alatt dolgozik.',
        prereq: ['algoritmusok/hasitotabla', 'algoritmusok/futasi-ido'],
        text: '**Naiv módszer**: minden lehetséges kezdőpozícióban karakterenként összevetjük a mintát. Legrosszabb eset Θ((n − m + 1)·m), például a „aaaa…a” szövegben „aa…ab” mintát keresve.\n\n**Knuth–Morris–Pratt** (1977): ha egy eltérés után a minta egy részét már egyezőnek láttuk, nem lépünk vissza a szövegben. A minta minden előtagjára előre kiszámítjuk a **hibafüggvényt** (prefixfüggvényt): `π[q]` = a minta első q karakterének leghosszabb olyan valódi előtagja, amely egyben utótagja is. Eltéréskor a mintát úgy toljuk tovább, hogy ez az előtag illeszkedjen. A szöveg minden karakterét amortizáltan konstans sokszor vizsgáljuk: előfeldolgozás Θ(m), keresés Θ(n).\n\n**Rabin–Karp** (1987): a mintát és a szöveg minden m hosszú ablakát egy számmá hasítjuk (például `Σ s_i·bᵐ⁻¹⁻ⁱ mod p`). A **gördülő hasítás** egy ablak értékét a következőből O(1) idő alatt frissíti: kivonjuk a kilépő karakter járulékát, szorzunk b-vel, hozzáadjuk a belépőt. Csak egyező hasítóérték esetén végzünk karakterenkénti ellenőrzést (az ütközés lehet hamis találat). Várható idő O(n + m); különösen jó **több minta** egyidejű keresésére és plágiumkeresésre.\n\nTovábbi módszerek: **Boyer–Moore** (a mintát jobbról balra veti össze, és eltéréskor nagyokat ugrik – természetes szövegre gyakran szublineáris, szövegszerkesztők keresője); **Aho–Corasick** (sok minta egyszerre, automatával); **suffixfa**, **suffixtömb** (egyszer felépítve tetszőleges minta keresése O(m) vagy O(m·log n) idejű – genomikai keresők).',
        example: 'Minta: „ababaca”, a hibafüggvény π = 0, 0, 1, 2, 3, 0, 1. Ha a szövegben „ababa” már egyezett, és a következő karakter nem „c”, a mintát úgy toljuk, hogy az illeszkedő „aba” (π[5] = 3) maradjon a helyén – a szövegben nem lépünk vissza.',
        pitfall: 'A Rabin–Karp hasítóérték-egyezése **nem** bizonyít egyezést: ütközés lehetséges, ezért karakterenként ellenőrizni kell (vagy nagyon kis hibavalószínűséget tudatosan elfogadni). A KMP előnye a garantált legrosszabb eset; átlagos természetes szövegen a Boyer–Moore-típusú módszerek gyakran gyorsabbak.',
        related: ['hasitotabla', 'dinamikus-programozas', 'futasi-ido', 'randomizalt', 'amortizalt-elemzes'] },
      /* ----- Haladó gráfalgoritmusok ----- */
      { id: 'topologikus-rendezes', term: 'Topologikus rendezés és DAG-ok', en: 'topological sort; directed acyclic graph (DAG)', topic: 'grafalg',
        short: 'Egy körmentes irányított gráf (DAG) topologikus rendezése a csúcsok olyan sorrendje, amelyben minden él előre mutat. Akkor és csak akkor létezik, ha a gráfban nincs irányított kör; Θ(n + m) időben előállítható Kahn algoritmusával vagy mélységi bejárással.',
        prereq: ['algoritmusok/dfs', 'algoritmusok/grafabrazolas'],
        text: 'Függőségek ábrázolására szolgál: az u → v él azt jelenti, hogy „u-nak v előtt kell lennie” (tantárgy-előfeltételek, fordítási sorrend, táblázatkezelő cellái, csomagkezelők függőségei, feladatütemezés).\n\n**Kahn algoritmusa** (1962):\n\n1. kiszámoljuk minden csúcs **befokát** (hány él mutat bele);\n2. a 0 befokú csúcsokat sorba tesszük;\n3. amíg a sor nem üres: kiveszünk egy csúcsot, kiírjuk, és minden kimenő élét „töröljük” (a szomszéd befokát csökkentjük); ha egy szomszéd befoka 0 lett, a sorba tesszük.\n\nHa a végén nem írtunk ki minden csúcsot, a gráfban **kör** van – az algoritmus így körfelismerésre is jó.\n\n**DFS-alapú módszer**: a csúcsokat a **befejezési idejük** szerint csökkenő sorrendbe tesszük.\n\nA topologikus sorrend általában **nem egyértelmű**; pontosan akkor egyértelmű, ha a gráfban van egy minden csúcsot érintő irányított út.\n\n**DAG-on dinamikus programozás**: topologikus sorrendben haladva a legrövidebb és a **leghosszabb út** is lineáris időben kiszámítható (negatív élsúlyokkal is!) – általános gráfban a leghosszabb út NP-nehéz. Alkalmazása a projekttervezésben a **kritikus út módszere** (CPM): a projekt minimális átfutási ideje a tevékenységgráf leghosszabb útja, a rajta lévő feladatok késése az egész projektet késlelteti.',
        example: 'Ruhák felvétele: alsónadrág → nadrág → cipő, zokni → cipő, ing → nyakkendő → zakó, nadrág → öv → zakó. Kahn: a kezdetben 0 befokú csúcsok: alsónadrág, zokni, ing. Egy lehetséges sorrend: ing, nyakkendő, zokni, alsónadrág, nadrág, öv, zakó, cipő.',
        pitfall: 'Irányítatlan gráfra vagy kört tartalmazó irányított gráfra topologikus rendezés **nem létezik**. A BFS szintjei szerinti sorrend nem topologikus rendezés (egy csúcs „később” is elérhető lehet egy hosszabb úton).',
        related: ['dfs', 'bfs', 'grafabrazolas', 'dinamikus-programozas', 'bellman-ford'] },
      { id: 'bellman-ford', term: 'Bellman–Ford-algoritmus (negatív élsúlyok)', en: 'Bellman–Ford algorithm', topic: 'grafalg',
        short: 'Egy forrásból induló legrövidebb utakat számol olyan irányított gráfban, amelyben negatív élsúlyok is lehetnek. n − 1 körben minden élt „lazít”; ha ezután még javítható egy távolság, a gráfban a forrásból elérhető negatív kör van. Ideje Θ(n·m).',
        prereq: ['algoritmusok/dijkstra', 'algoritmusok/dinamikus-programozas'],
        text: '**Lazítás** (relaxáció) az (u, v) élen súllyal w: `ha d[u] + w < d[v], akkor d[v] := d[u] + w` (és megjegyezzük, hogy v megelőzője u).\n\n**Algoritmus**:\n\n1. `d[s] = 0`, minden más csúcsra ∞;\n2. **n − 1-szer** egymás után lazítjuk az összes élt;\n3. még egy kör: ha bármely él lazítható, **negatív kör** van.\n\n**Miért n − 1 kör elég?** Negatív kör nélkül minden legrövidebb út egyszerű út, legfeljebb n − 1 éllel. Indukcióval: az i-edik kör után minden olyan csúcs távolsága helyes, amelyhez létezik legfeljebb i élű legrövidebb út. Ez valójában **dinamikus programozás** az utak élszáma szerint.\n\n**Miért nem jó a Dijkstra negatív élekre?** A Dijkstra egy csúcs távolságát véglegesnek tekinti, amikor kiveszi a kupacból; egy később talált negatív él azonban még csökkenthetné – a mohó választás helyessége a nemnegatív élekre épül.\n\nNegatív körrel a legrövidebb út nem értelmezhető (a kört újra és újra bejárva tetszőlegesen kicsi lehet az úthossz) – ezt kell észlelni.\n\n**Alkalmazások**: távolságvektor-alapú útválasztás (az RIP protokoll ezen az elven alapul: a routerek csak szomszédaiknak küldenek becslést); **arbitrázs** keresése devizaárfolyamokban (−log árfolyam élsúlyokkal a nyereséges körbeváltás negatív kör); különbségi korlátrendszerek megoldása; a Johnson-algoritmus első lépése.\n\nGyakorlati gyorsítás: ha egy körben semmi sem változott, korán megállhatunk.',
        example: 'Élek: s→a (4), s→b (5), b→a (−3), a→t (2). 1. kör (s→a, s→b, b→a, a→t sorrendben): d[a] = 4, d[b] = 5, b→a: 5 − 3 = 2 < 4 → d[a] = 2, a→t: d[t] = 4. A további körök nem változtatnak; **d[t] = 4** (s→b→a→t). A Dijkstra a d[a] = 4 értéket véglegesítené, mielőtt b-t feldolgozza, és rossz eredményt adna.',
        pitfall: 'Irányítatlan gráfban egy negatív él önmagában negatív kört alkot (oda-vissza bejárva), ezért ott a Bellman–Ford így nem használható. A negatív kör csak akkor zavar, ha a forrásból **elérhető**; az elérhetetlen negatív kört az algoritmus nem jelzi.',
        related: ['dijkstra', 'floyd-warshall', 'dinamikus-programozas', 'topologikus-rendezes', 'grafabrazolas'] },
      { id: 'floyd-warshall', term: 'Floyd–Warshall-algoritmus (minden pár legrövidebb útja)', en: 'Floyd–Warshall algorithm; all-pairs shortest paths', topic: 'grafalg',
        short: 'Minden csúcspár közötti legrövidebb utat kiszámító dinamikus programozási algoritmus: lépésenként egy-egy újabb csúcsot enged meg közbülső csúcsként. Három egymásba ágyazott ciklus, Θ(n³) idő; negatív élekkel is működik, ha nincs negatív kör.',
        prereq: ['algoritmusok/dinamikus-programozas', 'algoritmusok/grafabrazolas'],
        formulas: ['floyd-f'],
        text: '**Részfeladat**: `d_k(i, j)` = i-ből j-be a legrövidebb út hossza, ha közbülső csúcsként csak az első k csúcs használható. A k-adik lépésben eldöntjük, hogy a k csúcson keresztül rövidebb-e az út.\n\n`for k = 1..n: for i = 1..n: for j = 1..n: d[i][j] = min(d[i][j], d[i][k] + d[k][j])`\n\nA táblázat helyben frissíthető (elég egy n × n mátrix), mert a k-adik sor és oszlop a k-adik lépésben nem változik. Az utak visszakövetéséhez egy **következő-csúcs** (vagy megelőző) mátrixot is vezetünk.\n\n**Mikor melyiket?**\n\n- sűrű gráf, minden pár kell, kis n (néhány ezer csúcsig): Floyd–Warshall – egyszerű, cache-barát;\n- ritka gráf, nemnegatív élek: n-szer Dijkstra, O(n·m·log n);\n- ritka gráf negatív élekkel: Johnson-algoritmus (Bellman–Forddal átsúlyoz, majd n-szer Dijkstra).\n\n**Rokon feladat**: a **tranzitív lezárt** (melyik csúcsból melyik érhető el egyáltalán) – ugyanez a séma logikai műveletekkel (Warshall, 1962): `elér[i][j] = elér[i][j] VAGY (elér[i][k] ÉS elér[k][j])`.\n\n**Negatív kör** felismerése: ha a futás végén valamelyik `d[i][i] < 0`.\n\nA ciklusok sorrendje lényeges: a k-nak kell a **legkülső** ciklusnak lennie, különben az algoritmus hibás.',
        example: 'Három város, közvetlen utak: A–B 5 km, B–C 3 km, A–C 10 km (irányítatlanul). k = B lépésnél `d(A, C) = min(10, 5 + 3) = 8`. A végső távolságmátrix: A–B 5, B–C 3, A–C 8 – ugyanazt adja, mint egy útvonaltervező „távolságtáblázata”.',
        pitfall: 'Ha a k ciklust belülre teszed, az algoritmus csak néhány közbülső csúcsot próbál ki, és hibás eredményt ad. Θ(n³) nagy gráfra (például egy egész ország úthálózatára, milliónyi csúccsal) kivitelezhetetlen – ott egyedi lekérdezésekre Dijkstra-változatokat és előfeldolgozást használnak.',
        related: ['bellman-ford', 'dijkstra', 'dinamikus-programozas', 'grafabrazolas'] },
      { id: 'halozati-folyam', term: 'Hálózati folyam (Ford–Fulkerson, max-flow min-cut)', en: 'network flow; Ford–Fulkerson method; max-flow min-cut', topic: 'grafalg',
        short: 'Egy kapacitásokkal ellátott irányított hálózatban a forrásból a nyelőbe juttatható legnagyobb folyamot keressük. A Ford–Fulkerson-módszer ismételten javítóutat keres a maradékhálózatban; a maximális folyam értéke egyenlő a minimális vágás kapacitásával.',
        prereq: ['algoritmusok/bfs', 'algoritmusok/grafabrazolas'],
        formulas: ['folyam-f'],
        text: '**Folyam**: minden élre egy f(e) érték, amelyre\n\n- **kapacitáskorlát**: `0 ≤ f(e) ≤ c(e)`;\n- **megmaradás**: a forrás (s) és a nyelő (t) kivételével minden csúcsba annyi folyik be, amennyi kifolyik (mint a víz a csőhálózatban, Kirchhoff csomóponti törvénye).\n\n**Maradékhálózat**: minden élre megmutatja, mennyit lehet még **növelni** (c − f, előre irányban), és mennyit lehet **visszavonni** (f, visszafelé irányban). A visszafelé élek teszik lehetővé, hogy egy korábbi rossz döntést kijavítsunk.\n\n**Ford–Fulkerson-módszer** (1956): amíg van s–t út a maradékhálózatban (**javítóút**), növeljük rajta a folyamot az út legszűkebb maradék kapacitásával. Egész kapacitásoknál véges sok lépés után megáll, és az eredmény egész értékű folyam.\n\n**Edmonds–Karp**: a javítóutat **szélességi kereséssel** (legkevesebb élű út) választjuk – ekkor a lépésszám O(n·m), az idő O(n·m²), a kapacitások nagyságától függetlenül. Gyorsabb algoritmusok is vannak (Dinic, előfolyam–emelés).\n\n**Max-flow min-cut tétel**: a maximális folyam értéke egyenlő a minimális s–t vágás kapacitásával. A vágás egyben a hálózat „szűk keresztmetszete”.\n\n**Alkalmazások** (sokszor meglepő módon visszavezetve folyamra):\n\n- **páros gráfok maximális párosítása**: munkák kiosztása dolgozókra, felvételi párosítások;\n- logisztika, csővezeték- és közlekedési hálózatok kapacitása;\n- képszegmentálás (előtér–háttér szétválasztása minimális vágással);\n- él- és csúcsdiszjunkt utak száma (hálózatok megbízhatósága, Menger-tétel).',
        example: 'Páros párosítás folyamként: 3 diák (A, B, C) és 3 projekt (1, 2, 3); A az 1-et vagy 2-t, B csak az 1-et, C a 2-t vagy 3-at vállalja. s → minden diák (kapacitás 1), diák → vállalt projekt (1), projekt → t (1). Ha először A–1-et választjuk, B-nek nem marad semmi; a javítóút s → B → 1 → (vissza) A → 2 → … → t átrendezi: A–2, B–1, C–3, a maximális párosítás **3**.',
        pitfall: 'A „mindig a legnagyobb kapacitású élt választjuk” mohó stratégia visszafelé élek nélkül **nem** adja meg a maximumot – a maradékhálózat visszafelé élei elengedhetetlenek. Irracionális kapacitások esetén a naiv Ford–Fulkerson elvileg nem is áll meg; ezért kell a BFS-alapú (Edmonds–Karp) változat.',
        related: ['bfs', 'grafabrazolas', 'feszitofa', 'moho', 'visszavezetes'] },
      /* ----- Tervezési módszerek (kiegészítés) ----- */
      { id: 'huffman', term: 'Huffman-kódolás', en: 'Huffman coding', topic: 'modszerek',
        short: 'A Huffman-kódolás mohó algoritmus, amely a jelek gyakorisága alapján optimális prefixkódot készít: a gyakori jelek rövid, a ritkák hosszú bitsorozatot kapnak, és egyik kódszó sem előtagja egy másiknak. Veszteségmentes tömörítési eljárások alapeleme.',
        prereq: ['algoritmusok/moho', 'algoritmusok/kupac'],
        text: 'David A. Huffman 1952-ben, egyetemi hallgatóként publikálta.\n\n**Prefixkód**: egyetlen kódszó sem kezdőszelete egy másiknak, ezért a bitfolyam elválasztójelek nélkül, egyértelműen dekódolható. Minden prefixkód egy bináris fának felel meg: a levelek a jelek, a gyökértől a levélig vezető út (bal = 0, jobb = 1) a kódszó.\n\n**Cél**: a `Σ gyakoriság(x) · kódhossz(x)` összes bitszám minimalizálása.\n\n**Algoritmus**:\n\n1. minden jel egy egycsúcsú fa a gyakoriságával; tegyük őket egy **min-kupacba**;\n2. amíg egynél több fa van: vegyük ki a **két legkisebb** gyakoriságú fát, kössük őket egy új gyökér alá (gyakoriság = összegük), és tegyük vissza;\n3. az utolsó fa a kódfa.\n\nIdő: O(n·log n) n különböző jelre.\n\n**Optimalitás** (cserélési érvelés): létezik olyan optimális kódfa, amelyben a két legritkább jel testvér a legmélyebb szinten; ezeket egyetlen „összevont” jellel helyettesítve kisebb, ugyanilyen feladatot kapunk – ez az optimális részstruktúra.\n\n**Elméleti határ**: a forrás **entrópiája**, `H = −Σ p·log₂ p` bit/jel; a Huffman-kód átlagos hossza `H ≤ L < H + 1`. Ha a jelek valószínűségei 2 hatványai, pontosan H-t éri el.\n\nAlkalmazás: a DEFLATE (ZIP, gzip, PNG) és a JPEG tömörítés utolsó lépése. Ha a gyakoriságok nagyon egyenetlenek, az **aritmetikai kódolás** közelebb kerülhet az entrópiához, mert nem kell jelenként egész bitszámot használnia.',
        example: '100 karakter, gyakoriságok: a 45, b 13, c 12, d 16, e 9, f 5. Huffman-kódok: a = 0, b = 101, c = 100, d = 111, e = 1101, f = 1100. Összes bit: `45·1 + 13·3 + 12·3 + 16·3 + 9·4 + 5·4 = 224`, szemben a rögzített 3 bites kód 300 bitjével – kb. 25% megtakarítás.',
        pitfall: 'A Huffman-kód **jelenként** optimális prefixkód, de nem a legjobb tömörítés általában: a jelek közötti összefüggéseket (ismétlődő szavak, minták) nem használja ki – ezt a szótáralapú módszerek (LZ77) teszik meg előtte. Egyforma gyakoriságoknál a fa nem egyértelmű, de minden változat azonos összhosszt ad.',
        related: ['moho', 'kupac', 'feszitofa', 'dinamikus-programozas'] },
      { id: 'randomizalt', term: 'Randomizált algoritmusok', en: 'randomized algorithms; Las Vegas and Monte Carlo', topic: 'modszerek',
        short: 'A randomizált algoritmus futása közben véletlen döntéseket hoz. Las Vegas típusú: mindig helyes, de a futási ideje véletlen (például véletlen vezérelemes gyorsrendezés); Monte Carlo típusú: futási ideje korlátos, de kis valószínűséggel hibázhat (például Miller–Rabin prímteszt).',
        prereq: ['valszam/varhato-ertek', 'valszam/fuggetlenseg', 'algoritmusok/gyorsrendezes'],
        text: 'Miért hasznos a véletlen?\n\n- **Kivédi a rossz bemenetet**: a véletlen vezérelemes gyorsrendezés várható ideje **minden** bemenetre O(n·log n) – nincs „gonosz” bemenet, csak szerencsétlen véletlen, és ennek valószínűsége elhanyagolható.\n- **Egyszerűség**: sokszor sokkal egyszerűbb, mint a legjobb determinisztikus megoldás (pl. gyorskiválasztás a mediánok mediánjával szemben).\n- **Gyorsaság**: egyes feladatokra a legjobb ismert módszer.\n\n**Las Vegas**: a válasz mindig helyes, a **várható** futási időt elemezzük (randomizált gyorsrendezés, gyorskiválasztás, véletlen hasítófüggvény-választás).\n\n**Monte Carlo**: a futási idő korlátos, a hiba valószínűsége kicsi és **ismétléssel exponenciálisan csökkenthető** (független ismétléseknél a hibavalószínűségek szorzódnak).\n\n- **Miller–Rabin prímteszt**: ha a szám prím, mindig „prím”-et mond; összetett számra egy körben legfeljebb 1/4 eséllyel téved. k független kör után a hiba ≤ `4⁻ᵏ`. A nyilvános kulcsú titkosítás nagy prímjeinek előállítása így történik.\n- **Karger-algoritmus** minimális vágásra: véletlen élek összehúzása.\n- **Freivalds-ellenőrzés**: A·B = C mátrixszorzat helyességének ellenőrzése egy véletlen vektorral O(n²) idő alatt Θ(n³) helyett.\n\n**Univerzális hasítás** (Carter–Wegman, 1979): a hasítófüggvényt egy függvénycsaládból véletlenszerűen választjuk, így egy támadó nem tud olyan kulcsokat előállítani, amelyek mind ütköznek.\n\n**Elemzés**: várható érték linearitása, indikátorváltozók, a Markov- és Csernov-egyenlőtlenség. A véletlenszámokat a gyakorlatban álvéletlen-generátor adja; biztonsági alkalmazásokhoz kriptográfiailag biztonságos generátor kell.\n\nA **Monte Carlo-szimuláció** (numerikus becslés véletlen mintavétellel) rokon gondolat, de nem azonos a Monte Carlo algoritmus fogalmával.',
        example: 'Miller–Rabin 20 körrel: a téves „prím” válasz valószínűsége legfeljebb `4⁻²⁰ ≈ 9·10⁻¹³` – kisebb, mint egy hardverhiba esélye a futás alatt. Randomizált gyorsrendezés 10⁶ elemen: a várható ≈ 2,8·10⁷ összehasonlítás bármilyen (akár rendezett) bemenetre.',
        pitfall: 'A „várható idő” nem azonos az átlagos esettel: az átlagos eset a bemenetek eloszlásán, a várható idő az algoritmus saját véletlen döntésein számolt átlag – az utóbbihoz nem kell feltételezni semmit a bemenetről. Monte Carlo algoritmusnál a hibavalószínűség felső korlátját meg kell adni, különben az eredmény nem értékelhető.',
        related: ['gyorsrendezes', 'kivalasztas', 'hasitotabla', 'sztringkereses', 'kozelito-algoritmus'] },
      /* ----- Nehéz problémák kezelése ----- */
      { id: 'visszavezetes', term: 'Visszavezetés, NP-nehézség és NP-teljesség bizonyítása', en: 'polynomial-time reduction; NP-hardness; NP-completeness proofs', topic: 'nehez',
        short: 'Az A probléma polinomiálisan visszavezethető B-re (A ≤ₚ B), ha A minden példánya polinom időben átalakítható B egy példányává, azonos igen/nem válasszal. Ha egy ismert NP-teljes probléma visszavezethető B-re, akkor B NP-nehéz; ha B ráadásul NP-ben van, NP-teljes.',
        prereq: ['algoritmusok/p-np'],
        text: 'A visszavezetés **nehézséget visz át**: ha B-t gyorsan meg tudnánk oldani, akkor A-t is (alakítsd át, majd oldd meg B-ként). Ezért A ≤ₚ B azt jelenti, hogy **B legalább olyan nehéz**, mint A.\n\n**NP-nehéz** probléma: minden NP-beli probléma visszavezethető rá (lehet optimalizálási feladat is, sőt nem is kell NP-ben lennie). **NP-teljes**: NP-nehéz és NP-beli.\n\n**Bizonyítási recept** – B NP-teljességéhez:\n\n1. megmutatjuk, hogy **B ∈ NP** (van polinom időben ellenőrizhető tanú);\n2. kiválasztunk egy **ismert NP-teljes** A problémát;\n3. megadunk egy polinomiális f átalakítást A példányairól B példányaira;\n4. bizonyítjuk: x „igen”-példánya A-nak **akkor és csak akkor**, ha f(x) „igen”-példánya B-nek.\n\nGyakori hiba az irány: az ismert nehéz problémát kell az újra visszavezetni, nem fordítva.\n\n**A lánc**: Cook és Levin (1971, illetve tőle függetlenül) megmutatta, hogy a SAT NP-teljes; Karp 1972-ben 21 további problémát vezetett vissza rá. Néhány klasszikus visszavezetés:\n\n- SAT ≤ₚ **3-SAT** (minden klóz pontosan 3 literálos);\n- 3-SAT ≤ₚ **független csúcshalmaz**;\n- független halmaz ↔ **csúcslefedés**: S független ⇔ V ∖ S lefedi az összes élt;\n- független halmaz ↔ **klikk** a komplementer gráfban;\n- Hamilton-kör ≤ₚ **utazóügynök** (az élek súlya 1, a nem-éleké 2).\n\n**Gyakorlati üzenet**: ha egy feladatról kiderül, hogy NP-nehéz, ne keressünk rá általános, hatékony, pontos algoritmust (hacsak nem akarjuk megoldani a P = NP kérdést). Helyette: kis méretre pontos exponenciális módszer (visszalépés, korlátozás és szétválasztás, egészértékű programozás), közelítő algoritmus garanciával, heurisztika, vagy a probléma **speciális esetének** kihasználása (fák, páros gráfok, kis paraméter).',
        example: 'Csúcslefedés NP-teljessége független halmazból: a G gráfban van legalább k méretű független halmaz ⇔ van legfeljebb n − k méretű csúcslefedés. Az átalakítás (G, k) ↦ (G, n − k) triviálisan polinomiális. Egy 5 csúcsú körben a legnagyobb független halmaz 2, ezért a legkisebb csúcslefedés 3.',
        pitfall: 'Ha egy **könnyű** problémát egy nehézre vezetsz vissza, azzal semmit sem bizonyítasz (bármi visszavezethető a SAT-ra). Az NP-teljesség **nem** jelenti, hogy minden példány nehéz: a gyakorlatban előforduló példányok sokszor jól megoldhatók (a modern SAT-megoldók milliónyi változós feladatokkal is boldogulnak).',
        related: ['p-np', 'kozelito-algoritmus', 'visszalepes', 'halozati-folyam'] },
      { id: 'kozelito-algoritmus', term: 'Közelítő algoritmusok', en: 'approximation algorithms; approximation ratio', topic: 'nehez',
        short: 'NP-nehéz optimalizálási feladatokra a közelítő algoritmus polinom időben olyan megoldást ad, amely bizonyíthatóan legfeljebb egy adott ρ szorzóval rosszabb az optimumnál (ρ a közelítési arány). Így pontos megoldás helyett garantált minőségű megoldást kapunk gyorsan.',
        prereq: ['algoritmusok/p-np', 'algoritmusok/moho', 'algoritmusok/feszitofa'],
        text: '**Közelítési arány**: minimalizálásnál az algoritmus eredménye `ALG ≤ ρ·OPT` minden bemenetre (maximalizálásnál `ALG ≥ OPT/ρ`). A nehézség abban rejlik, hogy OPT-t nem ismerjük – ezért az elemzés egy könnyen számítható **alsó korlátot** használ az optimumra.\n\nKlasszikus példák:\n\n- **Csúcslefedés, 2-közelítés**: keressünk egy maximális (tovább nem bővíthető) párosítást, és vegyük be minden párosítási él mindkét végpontját. Lefedés lesz (különben a párosítás bővíthető lenne), és mivel a párosítás éleit bármely lefedésnek külön-külön le kell fednie, `OPT ≥ |párosítás|`, tehát `ALG = 2·|párosítás| ≤ 2·OPT`.\n- **Metrikus utazóügynök, 2-közelítés**: a minimális feszítőfát kétszer bejárva, majd az ismételt csúcsokat a háromszög-egyenlőtlenség miatt átugorva olyan kört kapunk, amely legfeljebb `2·MST ≤ 2·OPT` (egy körből egy élt elhagyva feszítőfát kapunk, így MST ≤ OPT). **Christofides** algoritmusa (1976) 1,5-ös arányt ér el.\n- **Halmazlefedés, mohó**: mindig azt a halmazt választjuk, amely a legtöbb még fedetlen elemet fedi le – arány ≈ ln n, és ennél lényegesen jobb (P ≠ NP esetén) nem is érhető el.\n- **Hátizsák**: **közelítő séma** (FPTAS) – bármely ε > 0-ra (1 − ε)-közelítés, n-ben és 1/ε-ban polinomiális idővel (az értékek kerekítése + dinamikus programozás).\n\n**Közelíthetetlenség**: nem minden feladat közelíthető jól. Az **általános** (nem metrikus) utazóügynökre semmilyen konstans arány nem érhető el polinom időben, hacsak nem P = NP – mert egy ilyen algoritmus a Hamilton-kör problémát is eldöntené.\n\nA **heurisztikák** (genetikus algoritmus, szimulált hűtés, lokális keresés) a gyakorlatban gyakran jó eredményt adnak, de – szemben a közelítő algoritmusokkal – garanciát nem.',
        example: 'Gráf: egy csillag, középen x, 5 levéllel. A párosításos 2-közelítés egy élt talál (x–a), és mindkét végét beveszi: lefedés {x, a}, mérete 2; az optimum {x}, mérete 1 – éppen a garantált kétszeres. Egy 5 csúcsú körön (OPT = 3) a párosítás 2 élű, a lefedés 4 csúcs ≤ 2·3.',
        pitfall: 'A közelítési arány **legrosszabb esetre** szóló garancia: a gyakorlatban az algoritmus gyakran jóval közelebb kerül az optimumhoz. Ne keverd a közelítő algoritmust a heurisztikával: utóbbinak nincs bizonyított korlátja. A „2-közelítés” minimalizálásnál legfeljebb kétszeres költséget jelent, nem 2 egységnyi eltérést.',
        related: ['visszavezetes', 'p-np', 'moho', 'feszitofa', 'dinamikus-programozas', 'randomizalt'] },
      { id: 'visszalepes', term: 'Visszalépéses keresés és korlátozás és szétválasztás', en: 'backtracking; branch and bound', topic: 'nehez',
        short: 'A visszalépéses keresés a megoldást lépésenként, részleges megoldásokból építi fel, és amint kiderül, hogy egy részmegoldás nem bővíthető érvényes megoldássá, visszalép és másik ágat próbál. A korlátozás és szétválasztás optimalizálási feladatokra korlátok segítségével vágja le a reménytelen ágakat.',
        prereq: ['algoritmusok/rekurzio', 'algoritmusok/dfs'],
        text: 'A keresési tér egy **fa**: a gyökér az üres részmegoldás, minden szint egy újabb döntés (például: hova kerüljön a következő királynő, melyik szám kerüljön a Sudoku következő üres mezőjébe). A visszalépéses keresés ezt a fát **mélységi bejárással** járja be, de **levágja** (nyesi) azokat a részfákat, amelyekben biztosan nincs megoldás.\n\n**Séma**:\n\n1. ha a részmegoldás teljes, rögzítjük (vagy visszaadjuk);\n2. különben sorra vesszük a lehetséges következő döntéseket;\n3. ha a bővített részmegoldás még érvényes lehet, rekurzívan folytatjuk vele;\n4. ha egyik ág sem vezet célra, visszalépünk az előző szintre.\n\nA hatékonyság szinte teljesen a **nyesés** erején múlik: a legrosszabb eset exponenciális marad, de jó feltételekkel a ténylegesen bejárt rész töredéke a teljes fának. Hasznos fogások: a legkevesebb lehetőséget hagyó változó választása először, korai ellentmondás-keresés (**kényszerterjesztés**), szimmetriák kihasználása.\n\n**Korlátozás és szétválasztás** (branch and bound), optimalizáláshoz: minden csomóponthoz egy **korlátot** számolunk (minimalizálásnál alsó korlátot: ennél jobb ebben az ágban nem lehet). Ha ez a korlát nem jobb, mint az eddig talált legjobb megoldás, az ágat levágjuk. A korlát gyakran egy **lazított** feladat megoldása (például tört hátizsák a 0–1 hátizsákhoz, lineáris programozás egészértékű feladatokhoz).\n\nAlkalmazások: n-királynő, Sudoku, rejtvények; logikai kielégíthetőség (a modern SAT-megoldók visszalépéses alapon működnek tanulással); utazóügynök és ütemezési feladatok pontos megoldása; a Prolog nyelv végrehajtási modellje; a reguláris kifejezések egyes illesztőmotorjai.',
        example: '8 királynő: a nyers erő `64·63·…·57 / 8! ≈ 4,4·10⁹` elhelyezést vizsgálna; soronként egy királynővel és azonnali ütésellenőrzéssel csak néhány ezer csomópontot kell bejárni. Összesen **92** megoldás van (szimmetriák nélkül 12). 0–1 hátizsáknál a tört hátizsák értéke felső korlát: ha egy ág korlátja kisebb az eddigi legjobbnál, elhagyjuk.',
        pitfall: 'A visszalépés nem teszi polinomiálissá az NP-nehéz feladatokat – csak a gyakorlatban, jó nyeséssel kezelhetőbbé. Ha a részfeladatok **ismétlődnek**, a puszta visszalépés feleslegesen újraszámol – ilyenkor dinamikus programozás (memoizálás) kell.',
        related: ['dfs', 'rekurzio', 'dinamikus-programozas', 'visszavezetes', 'kozelito-algoritmus', 'p-np'] }
    ]
  });
})();
