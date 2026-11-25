/* Egyetem: Általános kémia (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';
  var BLUE = '#2f7bf6', RED = '#e5484d', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6', TEAL = '#0e9aa7', GOLD = '#d9a520';

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
  function darrow(x1, y1, x2, y2, col, w) { return arrow(x1, y1, x2, y2, col, w) + head(x1, y1, Math.atan2(y1 - y2, x1 - x2), col); }
  function axes(xa, ya, xb, yb, x0, y0) { return arrow(xa, ya, xb, ya, 'var(--fg-2)') + arrow(x0, y0, x0, yb, 'var(--fg-2)'); }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (cls || T)) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  function hline(x1, x2, y, col, w, dash) { return '<line x1="' + r1(x1) + '" y1="' + r1(y) + '" x2="' + r1(x2) + '" y2="' + r1(y) + '" stroke="' + (col || 'var(--fg-2)') + '" stroke-width="' + (w || 1.5) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>'; }
  /* elektron-nyíl (spin fel/le) */
  function spin(x, y, up, col) {
    col = col || 'var(--fg)';
    return up ? '<line x1="' + x + '" y1="' + (y + 8) + '" x2="' + x + '" y2="' + (y - 6) + '" stroke="' + col + '" stroke-width="1.8"/>' + head(x, y - 8, -Math.PI / 2, col, 5)
      : '<line x1="' + x + '" y1="' + (y - 8) + '" x2="' + x + '" y2="' + (y + 6) + '" stroke="' + col + '" stroke-width="1.8"/>' + head(x, y + 8, Math.PI / 2, col, 5);
  }
  /* pályadoboz 0, 1 vagy 2 elektronnal */
  function box(x, y, n, col, stroke) {
    return '<rect x="' + x + '" y="' + (y - 11) + '" width="22" height="22" fill="var(--surface)" stroke="' + (stroke || 'var(--fg-2)') + '" stroke-width="1.5"/>' +
      (n === 1 ? spin(x + 11, y, true, col) : n === 2 ? spin(x + 7, y, true, col) + spin(x + 15, y, false, col) : '');
  }

  /* ---------- 1. Atompályák alakja ---------- */
  function lobe(cx, cy, ang, col, len, wid) {
    len = len || 30; wid = wid || 14;
    var a = ang * Math.PI / 180, ox = cx + Math.cos(a) * len / 2, oy = cy + Math.sin(a) * len / 2;
    return '<ellipse cx="' + r1(ox) + '" cy="' + r1(oy) + '" rx="' + (len / 2) + '" ry="' + wid + '" transform="rotate(' + ang + ' ' + r1(ox) + ' ' + r1(oy) + ')" fill="' + col + '" fill-opacity=".55" stroke="' + col + '" stroke-width="1.5"/>';
  }
  function oaxes(cx, cy) { return '<g stroke="var(--muted)" stroke-dasharray="3 3"><line x1="' + (cx - 46) + '" y1="' + cy + '" x2="' + (cx + 46) + '" y2="' + cy + '"/><line x1="' + cx + '" y1="' + (cy - 46) + '" x2="' + cx + '" y2="' + (cy + 46) + '"/></g>'; }
  var oc = [60, 172, 284, 396, 508], oy = 76;
  var orbSvg = '<svg viewBox="0 0 560 180">' + oc.map(function (x) { return oaxes(x, oy); }).join('') +
    '<circle cx="60" cy="' + oy + '" r="30" fill="' + BLUE + '" fill-opacity=".5" stroke="' + BLUE + '" stroke-width="1.5"/>' +
    lobe(172, oy, 0, BLUE, 42) + lobe(172, oy, 180, RED, 42) +
    lobe(284, oy, -90, BLUE, 42) + lobe(284, oy, 90, RED, 42) +
    lobe(396, oy, -45, BLUE, 38, 11) + lobe(396, oy, 135, BLUE, 38, 11) + lobe(396, oy, 45, RED, 38, 11) + lobe(396, oy, -135, RED, 38, 11) +
    '<ellipse cx="508" cy="' + oy + '" rx="30" ry="9" fill="' + RED + '" fill-opacity=".45" stroke="' + RED + '" stroke-width="1.5"/>' + lobe(508, oy, -90, BLUE, 44, 13) + lobe(508, oy, 90, BLUE, 44, 13) +
    txt(60, 146, 's (l = 0)', T, 13, 'middle', 'font-weight="700"') + txt(60, 162, 'gömb', M, 11, 'middle') +
    txt(172, 146, 'pₓ (l = 1)', T, 13, 'middle', 'font-weight="700"') + txt(172, 162, 'két lebeny, x tengely', M, 11, 'middle') +
    txt(284, 146, 'p_z (l = 1)', T, 13, 'middle', 'font-weight="700"') + txt(284, 162, 'csomósík: xy sík', M, 11, 'middle') +
    txt(396, 146, 'dₓᵧ (l = 2)', T, 13, 'middle', 'font-weight="700"') + txt(396, 162, 'négy lebeny', M, 11, 'middle') +
    txt(508, 146, 'd_z² (l = 2)', T, 13, 'middle', 'font-weight="700"') + txt(508, 162, 'lebenyek + gyűrű', M, 11, 'middle') +
    '<rect x="196" y="172" width="12" height="7" fill="' + BLUE + '" opacity=".6"/>' + txt(212, 179, '+ fázis', M, 10) + '<rect x="270" y="172" width="12" height="7" fill="' + RED + '" opacity=".6"/>' + txt(286, 179, '− fázis', M, 10) + '</svg>';
  orbSvg = orbSvg.replace('p_z (l = 1)', 'p<tspan baseline-shift="sub" font-size="10">z</tspan> (l = 1)').replace('d_z² (l = 2)', 'd<tspan baseline-shift="sub" font-size="10">z²</tspan> (l = 2)');

  /* ---------- 2. Energiadiagram (felépülési elv): vas ---------- */
  var sub = [['1s', 216, 1, 2], ['2s', 184, 1, 2], ['2p', 162, 3, 6], ['3s', 128, 1, 2], ['3p', 106, 3, 6], ['4s', 74, 1, 2], ['3d', 56, 5, 6]];
  var auSvg = '<svg viewBox="0 0 560 240">' + arrow(30, 230, 30, 20, 'var(--fg-2)', 1.8) + txt(38, 26, 'E', T, 13, null, 'font-style="italic"');
  sub.forEach(function (s) {
    var x0 = s[2] === 1 ? 90 : s[2] === 3 ? 170 : 222, e = s[3];
    auSvg += txt(x0 - 8, s[1] + 4, s[0], T, 12, 'end', 'font-weight="700"');
    for (var i = 0; i < s[2]; i++) {
      var n = s[0] === '3d' ? (i === 0 ? 2 : 1) : (e >= 2 * s[2] ? 2 : 0);
      auSvg += box(x0 + i * 24, s[1], n, s[0] === '3d' || s[0] === '4s' ? ORANGE : null, s[0] === '3d' ? ORANGE : null);
    }
  });
  auSvg += txt(468, 40, 'Fe (Z = 26)', T, 15, 'middle', 'font-weight="700"') + txt(468, 66, '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶', T, 12, 'middle') + txt(468, 88, 'röviden: [Ar] 3d⁶ 4s²', T, 12, 'middle', 'fill="' + ORANGE + '"') +
    txt(468, 130, '3d: 4 párosítatlan elektron', M, 11, 'middle') + txt(468, 146, '(Hund-szabály) → paramágneses', M, 11, 'middle') +
    txt(440, 186, 'betöltési sorrend: 1s 2s 2p 3s 3p 4s 3d 4p …', M, 11, 'middle') + txt(440, 202, '(n + l szabály)', M, 11, 'middle') + '</svg>';

  /* ---------- 3. Pauli-elv és Hund-szabály ---------- */
  function trio(x, y, arr) {
    return arr.map(function (c, i) {
      return '<rect x="' + (x + i * 28) + '" y="' + (y - 13) + '" width="26" height="26" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>' + c.map(function (u, j) { return spin(x + i * 28 + (c.length === 2 ? 8 + j * 10 : 13), y, u); }).join('');
    }).join('');
  }
  var phSvg = '<svg viewBox="0 0 560 150">' +
    txt(95, 26, 'helyes (N, 2p³)', T, 13, 'middle', 'fill="' + GREEN + '" font-weight="700"') + trio(54, 70, [[true], [true], [true]]) + txt(95, 118, '3 párosítatlan, azonos spin', M, 11, 'middle') + txt(95, 134, '✓ legkisebb energia', T, 11, 'middle', 'fill="' + GREEN + '"') +
    txt(280, 26, 'sérti a Hund-szabályt', T, 13, 'middle', 'fill="' + ORANGE + '" font-weight="700"') + trio(239, 70, [[true, false], [true], []]) + txt(280, 118, 'lehetséges, de gerjesztett', M, 11, 'middle') + txt(280, 134, 'állapot (nagyobb energia)', M, 11, 'middle') +
    txt(465, 26, 'sérti a Pauli-elvet', T, 13, 'middle', 'fill="' + RED + '" font-weight="700"') + trio(424, 70, [[true, true], [true], []]) + txt(465, 118, 'két azonos spinű elektron', M, 11, 'middle') + txt(465, 134, 'egy pályán: ✕ tilos', T, 11, 'middle', 'fill="' + RED + '"') + '</svg>';

  /* ---------- 4. Első ionizációs energia Z = 1…20 ---------- */
  var ie = [['H', 1312], ['He', 2372], ['Li', 520], ['Be', 900], ['B', 801], ['C', 1086], ['N', 1402], ['O', 1314], ['F', 1681], ['Ne', 2081], ['Na', 496], ['Mg', 738], ['Al', 578], ['Si', 787], ['P', 1012], ['S', 1000], ['Cl', 1251], ['Ar', 1521], ['K', 419], ['Ca', 590]];
  var ief = frame(0, 20, 0, 2500, 60, 14, 480, 190);
  var ieSvg = '<svg viewBox="0 0 560 250">' + [500, 1000, 1500, 2000, 2500].map(function (v) { return hline(60, 540, ief.Y(v), 'var(--line)', 1) + txt(54, ief.Y(v) + 4, v, M, 10, 'end'); }).join('') +
    axes(60, ief.Y(0), 548, 10, 60, ief.Y(0)) + txt(66, 12, 'kJ/mol', M, 11);
  var iep = ie.map(function (e, i) { return [ief.X(i + 0.5), ief.Y(e[1])]; });
  ieSvg += '<path d="' + iep.map(function (p, i) { return (i ? 'L' : 'M') + p[0] + ' ' + p[1]; }).join(' ') + '" fill="none" stroke="var(--muted)" stroke-width="1.5"/>';
  ie.forEach(function (e, i) {
    var col = ['He', 'Ne', 'Ar'].indexOf(e[0]) >= 0 ? PURPLE : ['Li', 'Na', 'K'].indexOf(e[0]) >= 0 ? RED : BLUE;
    ieSvg += '<circle cx="' + iep[i][0] + '" cy="' + iep[i][1] + '" r="5" fill="' + col + '"/>' + txt(iep[i][0], ief.Y(0) + 15, e[0], T, 11, 'middle', col !== BLUE ? 'fill="' + col + '" font-weight="700"' : null);
  });
  ieSvg += txt(300, 240, 'rendszám (Z = 1 … 20)', M, 11, 'middle') + txt(330, 40, 'csúcsok: nemesgázok', T, 12, null, 'fill="' + PURPLE + '"') + txt(330, 56, 'völgyek: alkálifémek', T, 12, null, 'fill="' + RED + '"') +
    txt(330, 72, 'kis letörések: B, O, Al, S', M, 11) + '</svg>';

  /* ---------- 5. VSEPR-alakzatok ---------- */
  var atomCol = { C: '#6b7280', O: RED, H: null, N: BLUE, F: GREEN, B: ORANGE, S: GOLD };
  function atom(x, y, el, r) {
    r = r || (el === 'H' ? 10 : 14);
    var c = atomCol[el];
    return '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="' + r + '" fill="' + (c || 'var(--surface)') + '" stroke="' + (c || 'var(--fg-2)') + '" stroke-width="1.5"/>' + txt(x, y + 4, el, T, el === 'H' ? 10 : 11, 'middle', c ? 'fill="#fff" font-weight="700"' : 'font-weight="700"');
  }
  function bond(cx, cy, dx, dy, type) {
    var x = cx + dx, y = cy + dy;
    if (type === 'w') { var L = Math.sqrt(dx * dx + dy * dy), nx = -dy / L * 6, ny = dx / L * 6; return '<path d="M' + cx + ' ' + cy + ' L' + r1(x + nx) + ' ' + r1(y + ny) + ' L' + r1(x - nx) + ' ' + r1(y - ny) + ' z" style="fill:var(--fg-2)"/>'; }
    if (type === 'd') return '<line x1="' + cx + '" y1="' + cy + '" x2="' + r1(x) + '" y2="' + r1(y) + '" stroke="var(--fg-2)" stroke-width="3" stroke-dasharray="2 3"/>';
    if (type === '2') { var L2 = Math.sqrt(dx * dx + dy * dy), px = -dy / L2 * 3, py = dx / L2 * 3; return '<line x1="' + r1(cx + px) + '" y1="' + r1(cy + py) + '" x2="' + r1(x + px) + '" y2="' + r1(y + py) + '" stroke="var(--fg-2)" stroke-width="2"/><line x1="' + r1(cx - px) + '" y1="' + r1(cy - py) + '" x2="' + r1(x - px) + '" y2="' + r1(y - py) + '" stroke="var(--fg-2)" stroke-width="2"/>'; }
    return '<line x1="' + cx + '" y1="' + cy + '" x2="' + r1(x) + '" y2="' + r1(y) + '" stroke="var(--fg-2)" stroke-width="2.5"/>';
  }
  function lp(cx, cy, ang) {
    var a = ang * Math.PI / 180, ox = cx + Math.cos(a) * 26, oy = cy + Math.sin(a) * 26;
    return '<ellipse cx="' + r1(ox) + '" cy="' + r1(oy) + '" rx="15" ry="9" transform="rotate(' + ang + ' ' + r1(ox) + ' ' + r1(oy) + ')" fill="' + PURPLE + '" fill-opacity=".25" stroke="' + PURPLE + '" stroke-dasharray="3 2"/>' +
      '<circle cx="' + r1(ox + Math.cos(a + 1.57) * 4) + '" cy="' + r1(oy + Math.sin(a + 1.57) * 4) + '" r="2" fill="' + PURPLE + '"/><circle cx="' + r1(ox - Math.cos(a + 1.57) * 4) + '" cy="' + r1(oy - Math.sin(a + 1.57) * 4) + '" r="2" fill="' + PURPLE + '"/>';
  }
  function mol(cx, cy, center, lig, lps, name, shape) {
    var s = (lps || []).map(function (a) { return lp(cx, cy, a); }).join('');
    lig.forEach(function (l) { s += bond(cx, cy, l[0], l[1], l[3]); });
    lig.forEach(function (l) { s += atom(cx + l[0], cy + l[1], l[2]); });
    return s + atom(cx, cy, center, 15) + txt(cx, cy + 70, name, T, 12, 'middle', 'font-weight="700"') + txt(cx, cy + 86, shape, M, 11, 'middle');
  }
  var vsSvg = '<svg viewBox="0 0 560 330">' +
    mol(93, 60, 'C', [[-56, 0, 'O', '2'], [56, 0, 'O', '2']], [], 'CO₂', 'lineáris, 180°') +
    mol(280, 60, 'B', [[0, -46, 'F'], [40, 23, 'F'], [-40, 23, 'F']], [], 'BF₃', 'síkháromszög, 120°') +
    mol(467, 60, 'C', [[0, -46, 'H'], [-44, 18, 'H'], [28, 34, 'H', 'w'], [44, 6, 'H', 'd']], [], 'CH₄', 'tetraéder, 109,5°') +
    mol(93, 225, 'N', [[-44, 18, 'H'], [28, 34, 'H', 'w'], [44, 6, 'H', 'd']], [-90], 'NH₃', 'trigonális piramis, 107°') +
    mol(280, 225, 'O', [[-38, 30, 'H'], [38, 30, 'H']], [-125, -55], 'H₂O', 'V alak, 104,5°') +
    mol(467, 225, 'S', [[0, -48, 'F'], [0, 48, 'F'], [-50, 0, 'F'], [50, 0, 'F'], [-30, 26, 'F', 'w'], [30, -26, 'F', 'd']], [], 'SF₆', 'oktaéder, 90°');
  vsSvg += txt(280, 326, 'ék: felénk mutató kötés · szaggatott: hátrafelé mutató · lila: nemkötő elektronpár', M, 10, 'middle') + '</svg>';

  /* ---------- 6. Az O₂ molekulapálya-diagramja ---------- */
  function lvl(x, y, es, col) {
    return hline(x - 15, x + 15, y, col || 'var(--fg-2)', 2.5) + (es === 1 ? spin(x, y - 10, true, col) : es === 2 ? spin(x - 5, y - 10, true, col) + spin(x + 5, y - 10, false, col) : '');
  }
  var moSvg = '<svg viewBox="0 0 560 270">';
  var aL = 90, aR = 470, mC = 280;
  // atomi szintek
  moSvg += lvl(aL, 220, 2) + lvl(aR, 220, 2) + lvl(aL - 36, 130, 2) + lvl(aL, 130, 1) + lvl(aL + 36, 130, 1) + lvl(aR - 36, 130, 2) + lvl(aR, 130, 1) + lvl(aR + 36, 130, 1) +
    txt(aL, 244, '2s', M, 11, 'middle') + txt(aR, 244, '2s', M, 11, 'middle') + txt(aL, 154, '2p', M, 11, 'middle') + txt(aR, 154, '2p', M, 11, 'middle') +
    txt(aL, 22, 'O atom', T, 13, 'middle', 'font-weight="700"') + txt(aR, 22, 'O atom', T, 13, 'middle', 'font-weight="700"') + txt(mC, 22, 'O₂ molekula', T, 13, 'middle', 'font-weight="700"');
  // MO szintek
  var mos = [[246, 2, 'σ2s', BLUE, 0], [200, 2, 'σ*2s', RED, 0], [160, 2, 'σ2p', BLUE, 0], [138, 2, 'π2p', BLUE, 1], [96, 1, 'π*2p', RED, 1], [56, 0, 'σ*2p', RED, 0]];
  mos.forEach(function (m) {
    if (m[4]) moSvg += lvl(mC - 20, m[0], m[1], m[3]) + lvl(mC + 20, m[0], m[1], m[3]) + txt(mC + 44, m[0] + 4, m[2], T, 11, null, 'fill="' + m[3] + '"');
    else moSvg += lvl(mC, m[0], m[1], m[3]) + txt(mC + 24, m[0] + 4, m[2], T, 11, null, 'fill="' + m[3] + '"');
  });
  [[aL + 15, 220, mC - 15, 246], [aL + 15, 220, mC - 15, 200], [aR - 15, 220, mC + 15, 246], [aR - 15, 220, mC + 15, 200],
    [aL + 51, 130, mC - 35, 160], [aL + 51, 130, mC - 35, 138], [aL + 51, 130, mC - 35, 96], [aL + 51, 130, mC - 15, 56],
    [aR - 51, 130, mC + 35, 160], [aR - 51, 130, mC + 35, 138], [aR - 51, 130, mC + 35, 96], [aR - 51, 130, mC + 15, 56]].forEach(function (l) {
    moSvg += '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '" stroke="var(--muted)" stroke-dasharray="3 3"/>';
  });
  moSvg += txt(mC, 266, 'kötésrend = (8 − 4)/2 = 2 · 2 párosítatlan e⁻ a π* pályákon → paramágneses', M, 11, 'middle') +
    txt(20, 70, 'E', T, 13, null, 'font-style="italic"') + arrow(14, 250, 14, 50, 'var(--fg-2)', 1.5) + '</svg>';

  /* ---------- 7. Hess-tétel: entalpiadiagram ---------- */
  var hk = 0.45, h0 = 40;
  function hy(v) { return r1(h0 - v * hk); }
  var hessSvg = '<svg viewBox="0 0 560 240">' +
    hline(60, 500, hy(0), 'var(--fg-2)', 2.5) + hline(300, 500, hy(-110.5), 'var(--fg-2)', 2.5) + hline(60, 500, hy(-393.5), 'var(--fg-2)', 2.5) +
    txt(64, hy(0) - 8, 'C(grafit) + O₂(g)', T, 12, null, 'font-weight="700"') + txt(292, hy(-110.5) + 4, 'CO(g) + ½ O₂(g)', T, 12, 'end', 'font-weight="700"') + txt(64, hy(-393.5) + 18, 'CO₂(g)', T, 12, null, 'font-weight="700"') +
    arrow(150, hy(0) + 2, 150, hy(-393.5) - 2, BLUE, 3) + txt(160, (hy(0) + hy(-393.5)) / 2 + 4, 'ΔH₁ = −393,5 kJ/mol', T, 12, null, 'fill="' + BLUE + '" font-weight="700"') +
    arrow(400, hy(0) + 2, 400, hy(-110.5) - 2, ORANGE, 3) + txt(410, (hy(0) + hy(-110.5)) / 2 + 4, 'ΔH₂ = ?', T, 12, null, 'fill="' + ORANGE + '" font-weight="700"') +
    arrow(400, hy(-110.5) + 2, 400, hy(-393.5) - 2, GREEN, 3) + txt(410, (hy(-110.5) + hy(-393.5)) / 2 + 4, 'ΔH₃ = −283,0 kJ/mol', T, 12, null, 'fill="' + GREEN + '" font-weight="700"') +
    txt(530, 236, 'ΔH₂ = ΔH₁ − ΔH₃ = −110,5 kJ/mol', T, 12, 'end', 'fill="' + ORANGE + '"') + txt(20, 30, 'H', T, 13, null, 'font-style="italic"') + '</svg>';

  /* ---------- 8. ΔG(T) egyenesek ---------- */
  var gfr = frame(0, 1500, -220, 220, 60, 14, 400, 200);
  var gCases = [[-100, 0.05, BLUE, 'ΔH < 0, ΔS > 0: mindig spontán'], [100, -0.05, RED, 'ΔH > 0, ΔS < 0: soha'], [-150, -0.2, ORANGE, 'ΔH < 0, ΔS < 0: alacsony T-n'], [178, 0.161, GREEN, 'CaCO₃ bomlása: magas T-n']];
  var gSvg = '<svg viewBox="0 0 560 250">' +
    '<rect x="60" y="' + gfr.Y(0) + '" width="400" height="' + r1(gfr.Y(-220) - gfr.Y(0)) + '" fill="' + GREEN + '" opacity=".07"/>' +
    [500, 1000, 1500].map(function (v) { return '<line x1="' + gfr.X(v) + '" y1="14" x2="' + gfr.X(v) + '" y2="214" stroke="var(--line)"/>' + txt(gfr.X(v), 230, v + ' K', M, 10, 'middle'); }).join('') +
    hline(60, 466, gfr.Y(0), 'var(--fg-2)', 1.8) + arrow(60, 214, 60, 8, 'var(--fg-2)') + txt(66, 14, 'ΔG (kJ/mol)', M, 11) + txt(462, gfr.Y(0) - 6, 'T', M, 12, 'end', 'font-style="italic"') +
    txt(54, gfr.Y(0) + 4, '0', M, 10, 'end') + txt(66, 206, 'ΔG < 0: spontán', T, 11, null, 'fill="' + GREEN + '"') + txt(66, gfr.Y(0) - 8, 'ΔG > 0: nem spontán', M, 11);
  gCases.forEach(function (g) {
    gSvg += '<path d="' + curve(gfr, function (t) { return g[0] - t * g[1]; }, 0, 1500, 60, -220, 220) + '" fill="none" stroke="' + g[2] + '" stroke-width="2.6"/>';
  });
  gSvg += '<circle cx="' + gfr.X(1106) + '" cy="' + gfr.Y(0) + '" r="4.5" fill="' + GREEN + '"/>' + txt(gfr.X(1106), gfr.Y(0) + 18, '1106 K', T, 11, 'middle', 'fill="' + GREEN + '" font-weight="700"') +
    '<circle cx="' + gfr.X(750) + '" cy="' + gfr.Y(0) + '" r="4.5" fill="' + ORANGE + '"/>';
  gCases.forEach(function (g, i) { gSvg += '<rect x="472" y="' + (40 + i * 44) + '" width="14" height="4" fill="' + g[2] + '"/>' + txt(472, 58 + i * 44, g[3].split(': ')[0], T, 10, null, 'fill="' + g[2] + '"') + txt(472, 71 + i * 44, g[3].split(': ')[1], M, 10); });
  gSvg += '</svg>';

  /* ---------- 9. Energiaprofil katalizátorral ---------- */
  var epSvg = '<svg viewBox="0 0 560 250">' + arrow(40, 230, 40, 12, 'var(--fg-2)', 1.8) + arrow(40, 230, 540, 230, 'var(--fg-2)', 1.8) +
    txt(48, 20, 'E (potenciális energia)', M, 11) + txt(536, 246, 'reakciókoordináta', M, 11, 'end') +
    '<path d="M60 160 H120 C 190 160, 210 40, 270 40 C 330 40, 360 200, 430 200 H520" fill="none" stroke="' + RED + '" stroke-width="3"/>' +
    '<path d="M120 160 C 160 160, 175 112, 205 112 C 230 112, 235 132, 260 132 C 285 132, 295 104, 320 104 C 360 104, 380 200, 430 200" fill="none" stroke="' + GREEN + '" stroke-width="2.6" stroke-dasharray="7 4"/>' +
    hline(60, 300, 40, 'var(--muted)', 1, '3 3') + hline(120, 330, 104, 'var(--muted)', 1, '3 3') + hline(120, 520, 160, 'var(--muted)', 1, '3 3') +
    darrow(100, 158, 100, 43, RED, 2) + txt(92, 100, 'Eₐ', T, 14, 'end', 'fill="' + RED + '" font-weight="700"') +
    darrow(170, 158, 170, 107, GREEN, 2) + txt(162, 140, 'Eₐ′', T, 13, 'end', 'fill="' + GREEN + '" font-weight="700"') +
    darrow(490, 162, 490, 198, BLUE, 2) + txt(498, 186, 'ΔᵣH', T, 13, null, 'fill="' + BLUE + '" font-weight="700"') +
    txt(70, 180, 'kiindulási anyagok', T, 11) + txt(440, 218, 'termékek', T, 11) + txt(270, 30, 'átmeneti állapot', T, 11, 'middle') +
    txt(392, 70, 'katalizátorral (más reakcióút,', T, 11, null, 'fill="' + GREEN + '"') + txt(392, 84, 'köztitermékkel)', T, 11, null, 'fill="' + GREEN + '"') + '</svg>';

  /* ---------- 10. Titrálási görbe (ecetsav és sósav NaOH-dal) ---------- */
  function phAt(V, Ka) {
    var Va = 25, c = 0.1, Vt = Va + V, Ct = c * Va / Vt, Na = c * V / Vt, lo = -14, hi = 0;
    for (var k = 0; k < 80; k++) {
      var m = (lo + hi) / 2, h = Math.pow(10, m), A = Ka ? Ct * Ka / (Ka + h) : Ct;
      if (h + Na - 1e-14 / h - A > 0) hi = m; else lo = m;
    }
    return -(lo + hi) / 2;
  }
  var tf = frame(0, 50, 0, 14, 56, 12, 400, 200);
  var tiSvg = '<svg viewBox="0 0 560 250">' +
    '<rect x="' + tf.X(2.5) + '" y="' + tf.Y(14) + '" width="' + r1(tf.X(22.5) - tf.X(2.5)) + '" height="200" fill="' + GREEN + '" opacity=".08"/>' +
    [2, 4, 6, 8, 10, 12, 14].map(function (v) { return hline(56, 456, tf.Y(v), 'var(--line)', 1) + txt(50, tf.Y(v) + 4, v, M, 10, 'end'); }).join('') +
    [10, 20, 30, 40, 50].map(function (v) { return txt(tf.X(v), 228, v, M, 10, 'middle'); }).join('') +
    axes(56, tf.Y(0), 464, 6, 56, tf.Y(0)) + txt(62, 10, 'pH', M, 12) + txt(456, 244, 'hozzáadott 0,1 M NaOH (cm³)', M, 11, 'end') +
    '<path d="' + curve(tf, function (v) { return phAt(v, 0); }, 0, 50, 400, 0, 14) + '" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 4"/>' +
    '<path d="' + curve(tf, function (v) { return phAt(v, 1.8e-5); }, 0, 50, 400, 0, 14) + '" fill="none" stroke="' + PURPLE + '" stroke-width="3"/>' +
    '<circle cx="' + tf.X(12.5) + '" cy="' + tf.Y(4.74) + '" r="5" fill="' + GREEN + '"/>' + '<circle cx="' + tf.X(25) + '" cy="' + tf.Y(8.72) + '" r="5" fill="' + RED + '"/>' +
    txt(tf.X(12.5), tf.Y(4.74) - 12, 'pH = pKₐ = 4,74', T, 11, 'middle', 'fill="' + GREEN + '" font-weight="700"') + txt(tf.X(12.5), tf.Y(4.74) + 34, 'pufferzóna', T, 11, 'middle', 'fill="' + GREEN + '"') +
    txt(tf.X(25) + 8, tf.Y(8.72) + 4, 'egyenértékpont, pH ≈ 8,7', T, 11, null, 'fill="' + RED + '"') +
    '<rect x="470" y="40" width="14" height="4" fill="' + PURPLE + '"/>' + txt(470, 58, '0,1 M ecetsav', T, 11, null, 'fill="' + PURPLE + '"') +
    '<rect x="470" y="76" width="14" height="4" fill="var(--muted)"/>' + txt(470, 94, '0,1 M HCl', M, 11) + txt(470, 108, '(összehasonlítás)', M, 10) + txt(470, 140, '25 cm³ sav', M, 10) + '</svg>';

  /* ---------- 11. Daniell-elem ---------- */
  var gvSvg = '<svg viewBox="0 0 560 270">' +
    '<path d="M40 100 V230 H220 V100" fill="none" stroke="var(--fg-2)" stroke-width="2.5"/><rect x="42" y="130" width="176" height="98" fill="#9aa4b8" opacity=".25"/>' +
    '<path d="M340 100 V230 H520 V100" fill="none" stroke="var(--fg-2)" stroke-width="2.5"/><rect x="342" y="130" width="176" height="98" fill="' + BLUE + '" opacity=".25"/>' +
    '<path d="M190 205 V80 H370 V205" fill="none" stroke="' + GOLD + '" stroke-width="16" stroke-opacity=".45"/>' + txt(280, 72, 'sóhíd (KNO₃)', T, 11, 'middle', 'fill="' + GOLD + '" font-weight="700"') +
    arrow(300, 96, 260, 96, 'var(--fg-2)', 1.4) + txt(304, 100, 'NO₃⁻', M, 10) + arrow(260, 112, 300, 112, 'var(--fg-2)', 1.4) + txt(232, 116, 'K⁺', M, 10) +
    '<rect x="92" y="40" width="20" height="160" fill="#8a94ab" stroke="var(--fg-2)"/>' + '<rect x="448" y="40" width="20" height="160" fill="#c8733a" stroke="var(--fg-2)"/>' +
    '<path d="M102 40 V20 H250 M310 20 H458 V40" fill="none" stroke="var(--fg-2)" stroke-width="2"/>' +
    '<circle cx="280" cy="20" r="28" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2"/>' + txt(280, 18, 'V', T, 13, 'middle', 'font-weight="700"') + txt(280, 34, '1,10 V', T, 11, 'middle', 'fill="' + RED + '" font-weight="700"') +
    arrow(150, 12, 220, 12, ORANGE, 2.2) + txt(150, 8, 'e⁻', T, 12, null, 'fill="' + ORANGE + '" font-weight="700"') + arrow(340, 12, 410, 12, ORANGE, 2.2) +
    txt(80, 58, '−', T, 20, 'middle', 'font-weight="700"') + txt(490, 58, '+', T, 20, 'middle', 'font-weight="700"') +
    txt(110, 220, 'ZnSO₄ (1 M)', T, 11, 'middle') + txt(450, 220, 'CuSO₄ (1 M)', T, 11, 'middle') +
    txt(130, 252, 'Zn anód: oxidáció', T, 12, 'middle', 'font-weight="700"') + txt(130, 267, 'Zn → Zn²⁺ + 2e⁻', M, 11, 'middle') +
    txt(430, 252, 'Cu katód: redukció', T, 12, 'middle', 'font-weight="700"') + txt(430, 267, 'Cu²⁺ + 2e⁻ → Cu', M, 11, 'middle') + '</svg>';

  /* ---------- 12. Egyensúly beállása: H₂ + I₂ ⇌ 2 HI ---------- */
  var ef = frame(0, 10, 0, 2, 56, 16, 380, 190), xe = 0.7795;
  var eqSvg = '<svg viewBox="0 0 560 250">' + [0.5, 1, 1.5, 2].map(function (v) { return hline(56, 436, ef.Y(v), 'var(--line)', 1) + txt(50, ef.Y(v) + 4, String(v).replace('.', ','), M, 10, 'end'); }).join('') +
    axes(56, ef.Y(0), 446, 8, 56, ef.Y(0)) + txt(62, 12, 'koncentráció (mol/dm³)', M, 11) + txt(440, 226, 'idő', M, 11, 'end') +
    '<line x1="' + ef.X(4.5) + '" y1="16" x2="' + ef.X(4.5) + '" y2="' + ef.Y(0) + '" stroke="var(--muted)" stroke-dasharray="4 4"/>' +
    '<path d="' + curve(ef, function (t) { return 1 - xe * (1 - Math.exp(-0.9 * t)); }, 0, 10, 120, 0, 2) + '" fill="none" stroke="' + PURPLE + '" stroke-width="3"/>' +
    '<path d="' + curve(ef, function (t) { return 2 * xe * (1 - Math.exp(-0.9 * t)); }, 0, 10, 120, 0, 2) + '" fill="none" stroke="' + ORANGE + '" stroke-width="3"/>' +
    txt(ef.X(10) + 6, ef.Y(2 * xe) + 4, '[HI] = 1,56', T, 12, null, 'fill="' + ORANGE + '" font-weight="700"') + txt(ef.X(10) + 6, ef.Y(1 - xe) + 4, '[H₂] = [I₂] = 0,22', T, 12, null, 'fill="' + PURPLE + '" font-weight="700"') +
    txt(ef.X(2), 40, 'Q < K: oda irányú', T, 11, 'middle') + txt(ef.X(2), 54, 'reakció dominál', T, 11, 'middle') + txt(ef.X(7.3), 40, 'egyensúly: Q = K = 50', T, 11, 'middle', 'fill="' + GREEN + '" font-weight="700"') + txt(ef.X(7.3), 54, 'a koncentrációk állandók', M, 11, 'middle') + '</svg>';

  STUDIE.addCourse({
    id: 'kemia-bsc',
    title: 'Általános kémia (BSc)',
    icon: '⚗️',
    color: '#d9a520',
    level: 'BSc 1. félév (vegyész, vegyészmérnök, biológus, anyagmérnök)',
    description: 'Atomszerkezet, kémiai kötés, termokémia, egyensúly és kinetika, oldatok és elektrokémia – az általános kémia kulcsfogalmai ábrákkal és ellenőrzött számpéldákkal.',
    intro: 'Az általános kémia két kérdésre felel: **milyen az anyag szerkezete** (atomok, elektronok, kötések), és **mi hajtja a változásokat** (energia, entrópia, sebesség). Az első rész kvantummechanikai alapon áll – az elektronfelhőt az [[atom|atom]] modellben is megnézheted –, a második a termodinamikára és a kinetikára épül. Az elektrokémia a kettőt összeköti, és egyben az [[akkucella|akkucella]] működésének kulcsa.',
    topics: [
      { id: 'atom', title: 'Atomszerkezet' },
      { id: 'kotes', title: 'Kémiai kötés' },
      { id: 'termo', title: 'Termokémia' },
      { id: 'egyensuly', title: 'Egyensúly és kinetika' },
      { id: 'oldat', title: 'Oldatok és elektrokémia' },
      { id: 'halmaz', title: 'Halmazállapotok és szilárd anyagok' },
      { id: 'spektro', title: 'Spektroszkópia és magkémia' }
    ],
    formulas: [
      {
        id: 'gibbs-f', title: 'Gibbs–Helmholtz-összefüggés (szabadentalpia-változás)', en: 'Gibbs free energy change',
        parts: [{ t: 'ΔG', d: 'A szabadentalpia megváltozása állandó nyomáson és hőmérsékleten', unit: 'kJ/mol' }, { t: '=' },
          { t: 'ΔH', d: 'Entalpiaváltozás: a nyomáson felvett vagy leadott hő', unit: 'kJ/mol' }, { t: '−' },
          { t: 'T', d: 'Abszolút hőmérséklet', unit: 'K' }, { t: '·' },
          { t: 'ΔS', d: 'A rendszer entrópiaváltozása', unit: 'J/(mol·K)', more: 'Számoláskor váltsd át kJ-ra: ΔS/1000!' }],
        text: 'ΔG < 0: a folyamat önként (spontán) végbemegy; ΔG = 0: egyensúly; ΔG > 0: nem spontán (a fordítottja az). A **−TΔS** tag miatt a hőmérséklet dönthet: ha ΔH és ΔS előjele azonos, van egy fordulási hőmérséklet, `T = ΔH/ΔS`.',
        example: 'CaCO₃ → CaO + CO₂: ΔH = +178 kJ/mol, ΔS = +161 J/(mol·K). 25 °C-on `ΔG = 178 − 298·0,161 ≈ +130 kJ/mol` (a mészkő stabil), a fordulási hőmérséklet `178 000/161 ≈ 1106 K ≈ 833 °C` – a mészégetés ezért 900 °C körül történik.'
      },
      {
        id: 'hess-f', title: 'Reakcióhő képződéshőkből (Hess-tétel)', en: "Hess's law with enthalpies of formation",
        parts: [{ t: 'Δ_r H°', d: 'Standard reakcióentalpia', unit: 'kJ/mol' }, { t: '=' },
          { t: 'Σ ν·Δ_f H°(termékek)', d: 'A termékek standard képződéshőinek összege, a sztöchiometriai számokkal szorozva', unit: 'kJ/mol' }, { t: '−' },
          { t: 'Σ ν·Δ_f H°(kiindulási anyagok)', d: 'Ugyanez a kiindulási anyagokra', more: 'Elemek standard állapotban: Δ_f H° = 0.' }],
        text: 'Azért működik, mert az entalpia **állapotfüggvény**: a reakciót gondolatban elemeire bontjuk, majd az elemekből felépítjük a termékeket – a két lépés összege ugyanaz, mint a közvetlen úté.',
        example: 'Metán égése, CH₄ + 2 O₂ → CO₂ + 2 H₂O(f). Képződéshők: CH₄ −74,8, CO₂ −393,5, H₂O(f) −285,8 kJ/mol. `Δ_r H° = −393,5 + 2·(−285,8) − (−74,8) = −890,3 kJ/mol`.'
      },
      {
        id: 'k-f', title: 'Egyensúlyi állandó (tömeghatás törvénye)', en: 'equilibrium constant, law of mass action',
        parts: [{ t: 'K', d: 'Egyensúlyi állandó az a A + b B ⇌ c C + d D reakcióra; csak a hőmérséklettől függ', unit: '–' }, { t: '=' },
          { t: '[C]^c·[D]^d', d: 'A termékek egyensúlyi koncentrációi (pontosabban: aktivitásai) a sztöchiometriai együtthatók hatványán', unit: 'mol/dm³' }, { t: '/' },
          { t: '[A]^a·[B]^b', d: 'A kiindulási anyagok egyensúlyi koncentrációi a megfelelő hatványon', more: 'Tiszta szilárd anyag és oldószer aktivitása 1: nem szerepel a kifejezésben.' }],
        text: 'Ugyanez a kifejezés tetszőleges (nem egyensúlyi) koncentrációkkal a **reakcióhányados**, Q. Ha Q < K, a reakció oda irányban halad; ha Q > K, visszafelé; ha Q = K, egyensúlyban van.',
        example: 'H₂ + I₂ ⇌ 2 HI, K = 50 (448 °C). Ha [H₂] = [I₂] = 0,1 és [HI] = 0,5 mol/dm³: `Q = 0,5²/(0,1·0,1) = 25 < 50`, tehát még HI képződik.'
      },
      {
        id: 'dgq-f', title: 'Szabadentalpia és reakcióhányados', en: 'ΔG = ΔG° + RT ln Q',
        parts: [{ t: 'ΔG', d: 'Szabadentalpia-változás az adott (nem standard) összetételnél', unit: 'J/mol' }, { t: '=' },
          { t: 'ΔG°', d: 'Standard szabadentalpia-változás (minden anyag 1 bar, illetve 1 mol/dm³)', unit: 'J/mol' }, { t: '+' },
          { t: 'R', d: 'Egyetemes gázállandó', unit: 'J/(mol·K)', more: 'R = 8,314 J/(mol·K)' }, { t: '·' }, { t: 'T', d: 'Abszolút hőmérséklet', unit: 'K' }, { t: '·' },
          { t: 'ln Q', d: 'A reakcióhányados természetes logaritmusa' }],
        text: 'Egyensúlyban ΔG = 0 és Q = K, ebből a termodinamika és az egyensúly kapcsolata: `ΔG° = −RT·ln K`. Negatív ΔG° nagy K-t (termékek felé eltolt egyensúlyt), pozitív ΔG° kis K-t jelent.',
        example: 'ΔG° = −10 kJ/mol 25 °C-on: `K = e^(10 000/(8,314·298)) ≈ 57`. Már −40 kJ/mol is K ≈ 10⁷ – az egyensúly gyakorlatilag teljesen a termékek felé tolódik.'
      },
      {
        id: 'arrhenius-f', title: 'Arrhenius-egyenlet', en: 'Arrhenius equation',
        parts: [{ t: 'k', d: 'Sebességi állandó', unit: 'a rendűségtől függ (elsőrendűnél 1/s)' }, { t: '=' },
          { t: 'A', d: 'Preexponenciális (gyakorisági) tényező: az ütközések gyakorisága és a térbeli orientáció', unit: 'mint k' }, { t: '·' },
          { t: 'e^{−E_a/(RT)}', d: 'Azon ütközések hányada, amelyek energiája eléri az aktiválási energiát', more: 'Boltzmann-eloszlásból.' }],
        text: 'Logaritmálva `ln k = ln A − Eₐ/(RT)`: ln k az 1/T függvényében egyenes, meredeksége −Eₐ/R. Két hőmérsékletre: `ln(k₂/k₁) = (Eₐ/R)·(1/T₁ − 1/T₂)`.',
        example: 'Eₐ = 50 kJ/mol, 25 °C → 35 °C: `k₂/k₁ = exp((50 000/8,314)·(1/298,15 − 1/308,15)) ≈ 1,92`. Ez a „10 fokonként kétszeres sebesség” ökölszabály háttere.'
      },
      {
        id: 'ph-f', title: 'A pH definíciója és a víz ionszorzata', en: 'pH; ion product of water',
        parts: [{ t: 'pH', d: 'Az oldat savasságának mértéke' }, { t: '=' }, { t: '−lg [H_3O^+]', d: 'Az oxóniumion-koncentráció (mol/dm³-ben mért számértékének) negatív tízes alapú logaritmusa' }, { t: ';' },
          { t: 'K_v = [H_3O^+]·[OH^−] = 10^{−14}', d: 'A víz ionszorzata 25 °C-on', more: 'Ebből pH + pOH = 14 (25 °C-on).' }],
        text: 'Tiszta vízben 25 °C-on [H₃O⁺] = [OH⁻] = 10⁻⁷ mol/dm³, pH = 7. Egy pH-egység tízszeres koncentrációkülönbséget jelent.',
        example: '0,01 M HCl (erős sav, teljesen disszociál): pH = 2. 0,01 M NaOH: pOH = 2, pH = 12.'
      },
      {
        id: 'henderson-f', title: 'Henderson–Hasselbalch-egyenlet', en: 'Henderson–Hasselbalch equation',
        parts: [{ t: 'pH', d: 'A pufferoldat pH-ja' }, { t: '=' },
          { t: 'pK_a', d: 'A gyenge sav savi állandójának negatív logaritmusa', more: 'pKₐ = −lg Kₐ; ecetsavra 4,74' }, { t: '+' },
          { t: 'lg([A^−]/[HA])', d: 'A konjugált bázis és a sav koncentrációjának aránya' }],
        text: 'A Kₐ definíciójából közvetlenül következik. Ha a sav és sója egyenlő koncentrációjú, pH = pKₐ. A puffer kb. pKₐ ± 1 tartományban hatékony.',
        example: '0,10 M ecetsav + 0,10 M nátrium-acetát: pH = 4,74. 1 dm³-hez 0,01 mol HCl-t adva: `pH = 4,74 + lg(0,09/0,11) ≈ 4,65` – csak 0,09 egységnyi változás. Ugyanennyi HCl tiszta vízben pH 7-ről 2-re vinné le.'
      },
      {
        id: 'nernst-f', title: 'Nernst-egyenlet', en: 'Nernst equation',
        parts: [{ t: 'E', d: 'Elektródpotenciál vagy cellafeszültség az adott koncentrációknál', unit: 'V' }, { t: '=' },
          { t: 'E°', d: 'Standard érték (1 mol/dm³, 1 bar, 25 °C)', unit: 'V' }, { t: '−' },
          { t: 'RT/(zF)', d: 'z: az átvitt elektronok száma; F = 96 485 C/mol a Faraday-állandó', unit: 'V', more: '25 °C-on RT/F = 0,02569 V; tízes logaritmussal 0,0592 V/z.' }, { t: '·' },
          { t: 'ln Q', d: 'A cellareakció (vagy redukciós félreakció) reakcióhányadosa' }],
        text: 'A `ΔG = −zFE` és a `ΔG = ΔG° + RT·ln Q` összefüggésből adódik. 25 °C-on: `E = E° − (0,0592 V/z)·lg Q`. Egyensúlyban E = 0, ebből `E° = (RT/zF)·ln K`.',
        example: 'Daniell-elem, [Zn²⁺] = 1 M, [Cu²⁺] = 0,01 M: `Q = 1/0,01 = 100`, `E = 1,10 − (0,0592/2)·2 ≈ 1,04 V`.'
      },
      {
        id: 'gaz-f', title: 'Az ideális gáz állapotegyenlete', en: 'ideal gas law',
        parts: [{ t: 'p', d: 'A gáz nyomása', unit: 'Pa' }, { t: '·' }, { t: 'V', d: 'A gáz térfogata', unit: 'm³' }, { t: '=' },
          { t: 'n', d: 'Anyagmennyiség', unit: 'mol' }, { t: '·' },
          { t: 'R', d: 'Egyetemes gázállandó', unit: 'J/(mol·K)', more: 'R = 8,314 J/(mol·K) = 0,08314 bar·dm³/(mol·K).' }, { t: '·' },
          { t: 'T', d: 'Abszolút hőmérséklet', unit: 'K' }],
        text: 'Boyle–Mariotte, Gay-Lussac és Avogadro törvényének összefoglalása. Gázelegyben minden komponensre külön is érvényes: `p_i·V = n_i·R·T` – ebből a **Dalton-törvény**: `p = Σ p_i`, és `p_i = x_i·p`, ahol x_i a móltört.',
        example: '1,00 mol gáz 0 °C-on és 1 bar nyomáson: `V = 1·0,08314·273,15/1 ≈ 22,7 dm³`; 25 °C-on és 1 bar-on ≈ 24,8 dm³. (A régi „22,41 dm³” 0 °C-ra és 1 atm = 1,01325 bar nyomásra vonatkozik.)'
      },
      {
        id: 'vdw-f', title: 'Van der Waals-egyenlet', en: 'van der Waals equation',
        parts: [{ t: '(p + a·n²/V²)', d: 'A mért nyomás, kiegészítve a molekulák közötti vonzás miatti „nyomáshiánnyal”', unit: 'bar', more: 'a: a vonzást jellemző anyagi állandó, bar·dm⁶/mol².' }, { t: '·' },
          { t: '(V − n·b)', d: 'A ténylegesen szabad térfogat: a molekulák saját térfogatát levonjuk', unit: 'dm³', more: 'b: a moláris „kizárt térfogat”, dm³/mol.' }, { t: '=' },
          { t: 'n·R·T', d: 'Ugyanaz, mint az ideális gáznál' }],
        text: 'Kis nyomáson és magas hőmérsékleten (nagy V/n) a korrekciók elhanyagolhatók, és visszakapjuk az ideális gáz egyenletét. Az a és b állandók a kritikus adatokból is kiszámíthatók: `a = 27R²T_c²/(64p_c)`, `b = RT_c/(8p_c)`.',
        example: '1,00 mol CO₂ 1,00 dm³-ben 300 K-en (a ≈ 3,64 bar·dm⁶/mol², b ≈ 0,0427 dm³/mol): ideálisan `p = 0,08314·300/1 ≈ 24,9 bar`, van der Waals szerint `p = 24,94/(1 − 0,0427) − 3,64 ≈ 22,4 bar` – a vonzás miatt kb. 10%-kal kisebb.'
      },
      {
        id: 'clapeyron-f', title: 'Clausius–Clapeyron-egyenlet', en: 'Clausius–Clapeyron equation',
        parts: [{ t: 'ln(p_2/p_1)', d: 'A két hőmérsékleten mért gőznyomás arányának természetes logaritmusa' }, { t: '=' },
          { t: '−Δ_{párolgás}H/R', d: 'A moláris párolgáshő és a gázállandó hányadosa (negatív előjellel)', unit: 'K', more: 'Feltételezi, hogy a párolgáshő a tartományban állandó, és a gőz ideális gáz.' }, { t: '·' },
          { t: '(1/T_2 − 1/T_1)', d: 'Az abszolút hőmérsékletek reciprokainak különbsége', unit: '1/K' }],
        text: 'A folyadék–gőz egyensúlyi görbe (a fázisdiagram egy vonala) meredekségét adja meg. ln p az 1/T függvényében közel egyenes, meredeksége −ΔH/R – ugyanaz a forma, mint az Arrhenius-egyenleté.',
        example: 'Víz, Δ_pH ≈ 40,7 kJ/mol, normál forráspont 373,15 K. Milyen hőmérsékleten forr 70 kPa nyomáson (kb. 3000 m magasan)? `1/T_2 = 1/373,15 + (8,314/40 700)·ln(101,3/70) ≈ 0,002755` → `T_2 ≈ 363 K ≈ 90 °C`. Ezért lassabban fő meg a tojás a hegyen.'
      },
      {
        id: 'kolligativ-f', title: 'Fagyáspontcsökkenés és forráspont-emelkedés', en: 'freezing-point depression, boiling-point elevation',
        parts: [{ t: 'ΔT', d: 'A fagyáspont csökkenése vagy a forráspont emelkedése a tiszta oldószerhez képest', unit: 'K' }, { t: '=' },
          { t: 'i', d: 'Van \'t Hoff-tényező: hány részecskére esik szét egy oldott „képletegység”', unit: '–', more: 'Glükóz 1; NaCl ideálisan 2; CaCl₂ ideálisan 3. A valóságban az ionpárképződés miatt kicsit kisebb.' }, { t: '·' },
          { t: 'K', d: 'Krioszkópos (K_f) vagy ebullioszkópos (K_b) állandó: csak az oldószertől függ', unit: 'K·kg/mol', more: 'Víz: K_f = 1,86; K_b = 0,512 K·kg/mol.' }, { t: '·' },
          { t: 'b', d: 'Molalitás: oldott anyag mólja 1 kg oldószerben', unit: 'mol/kg' }],
        text: 'Híg oldatokra érvényes, és nem függ az oldott anyag minőségétől, csak a részecskék számától – ezért kolligatív (együttes) sajátság. Ismert tömegű anyagból a mért ΔT alapján a **moláris tömeg** meghatározható (krioszkópia).',
        example: '100 g etilénglikol (62,07 g/mol) 500 g vízben: `b = 1,611/0,500 ≈ 3,22 mol/kg`, `ΔT_f = 1,86·3,22 ≈ 6,0 K` → az oldat kb. −6,0 °C-on fagy.'
      },
      {
        id: 'ozmozis-f', title: 'Ozmózisnyomás (van \'t Hoff-törvény)', en: 'osmotic pressure, van \'t Hoff equation',
        parts: [{ t: 'Π', d: 'Ozmózisnyomás: az a többletnyomás, amely megállítja az oldószer beáramlását a féligáteresztő hártyán át', unit: 'Pa' }, { t: '=' },
          { t: 'i', d: 'Van \'t Hoff-tényező (disszociáció)', unit: '–' }, { t: '·' },
          { t: 'c', d: 'Az oldott anyag koncentrációja', unit: 'mol/m³', more: '1 mol/dm³ = 1000 mol/m³.' }, { t: '·' },
          { t: 'R·T', d: 'Gázállandó × abszolút hőmérséklet', unit: 'J/mol' }],
        text: 'Formailag azonos az ideális gáz egyenletével (`Π = (n/V)·R·T`): híg oldatban az oldott részecskék úgy „nyomnak”, mintha gázként töltenék ki a teret. Az i·c szorzat az **ozmolaritás**.',
        example: 'Vérplazma, kb. 0,29 osmol/dm³ = 290 mol/m³, 310 K: `Π = 290·8,314·310 ≈ 7,5·10⁵ Pa ≈ 7,4 bar`. Ezért kell az infúziónak izotóniásnak lennie (0,9%-os NaCl ≈ 0,154 mol/dm³, ideálisan 0,308 osmol/dm³).'
      },
      {
        id: 'lambert-beer-f', title: 'Lambert–Beer-törvény', en: 'Beer–Lambert law',
        parts: [{ t: 'A', d: 'Abszorbancia (fényelnyelés): A = lg(I₀/I) = −lg T', unit: '–', more: 'T = I/I₀ a transzmittancia (áteresztés).' }, { t: '=' },
          { t: 'ε', d: 'Moláris abszorpciós koefficiens: anyagra és hullámhosszra jellemző állandó', unit: 'dm³/(mol·cm)' }, { t: '·' },
          { t: 'l', d: 'A fény útja a mintában (küvettavastagság)', unit: 'cm' }, { t: '·' },
          { t: 'c', d: 'Az elnyelő anyag koncentrációja', unit: 'mol/dm³' }],
        text: 'A fotometriás koncentrációmérés alapja. Minden vékony rétegben a beeső fény ugyanakkora **hányada** nyelődik el, ezért az intenzitás exponenciálisan csökken, a logaritmusa (az abszorbancia) pedig lineárisan nő a rétegvastagsággal és a koncentrációval. A legpontosabb mérési tartomány nagyjából A = 0,1–1.',
        example: 'NADH, ε(340 nm) = 6220 dm³/(mol·cm), l = 1 cm, mért A = 0,311: `c = 0,311/6220 = 5,0·10⁻⁵ mol/dm³`. A = 1 azt jelenti, hogy a fénynek csak 10%-a jut át, A = 2 esetén 1%.'
      },
      {
        id: 'bomlas-f', title: 'Radioaktív bomlástörvény', en: 'radioactive decay law',
        parts: [{ t: 'N(t)', d: 'A t idő múlva még el nem bomlott magok száma' }, { t: '=' },
          { t: 'N_0', d: 'A kezdeti magszám' }, { t: '·' },
          { t: 'e^{−λt}', d: 'λ: bomlási állandó (1/s); elsőrendű kinetika', more: 'Felezési idő: t½ = ln 2/λ ≈ 0,693/λ. Aktivitás: A = λ·N (Bq = bomlás/s).' }],
        text: 'A bomlás elsőrendű folyamat: minden mag a többitől függetlenül, adott valószínűséggel bomlik el időegység alatt, és ez a valószínűség a kémiai környezettől, hőmérséklettől, nyomástól gyakorlatilag független. Egy felezési idő alatt mindig a **meglévő** magok fele bomlik el.',
        example: 'Egy minta ¹⁴C-aktivitása a ma élő szervezetekének 25%-a: ez két felezési idő, `t ≈ 2·5730 ≈ 11 500 év`. Általánosan: `t = (t½/ln 2)·ln(A₀/A)`.'
      },
      {
        id: 'rydberg-f', title: 'Rydberg-formula (a hidrogén színképe)', en: 'Rydberg formula',
        parts: [{ t: '1/λ', d: 'A kibocsátott vagy elnyelt fény hullámszáma', unit: '1/m' }, { t: '=' },
          { t: 'R_H', d: 'Rydberg-állandó a hidrogénre', unit: '1/m', more: 'R_H ≈ 1,0968·10⁷ m⁻¹ (végtelen tömegű magra R∞ ≈ 1,0974·10⁷ m⁻¹).' }, { t: '·' },
          { t: '(1/n_1² − 1/n_2²)', d: 'n₁ < n₂: az alsó és a felső energiaszint főkvantumszáma', more: 'n₁ = 1: Lyman-sorozat (UV), n₁ = 2: Balmer-sorozat (látható), n₁ = 3: Paschen-sorozat (IR).' }],
        text: 'A hidrogénatom energiaszintjei `E_n ≈ −13,6 eV/n²`; két szint közötti átmenetben pontosan `ΔE = h·ν = h·c/λ` energiájú foton nyelődik el vagy keletkezik. Ezért vonalas a színkép.',
        example: 'Balmer-α (n = 3 → 2): `1/λ = 1,0968·10⁷·(1/4 − 1/9) ≈ 1,523·10⁶ m⁻¹` → `λ ≈ 656 nm`, vörös vonal. A fotonenergia `ΔE = 13,6·(1/4 − 1/9) ≈ 1,89 eV`.'
      }
    ],
    terms: [
      /* ----- Atomszerkezet ----- */
      { id: 'kvantumszamok', term: 'Kvantumszámok', en: 'quantum numbers', topic: 'atom',
        short: 'Az atomban kötött elektron állapotát négy kvantumszám jellemzi: a főkvantumszám (n), a mellékkvantumszám (l), a mágneses kvantumszám (m_l) és a spinkvantumszám (m_s).',
        prereq: ['lecke:fizika/atom', 'modell:atom', 'fizika-bsc/hullamfuggveny', 'fizika-bsc/impulzusmomentum'],
        text: 'A Schrödinger-egyenlet megoldásai a hidrogénatomban csak bizonyos, egész számokkal jellemezhető állapotok lehetnek – innen a „kvantum” szó.\n\n- **Főkvantumszám** n = 1, 2, 3, …: a héj; főként ez határozza meg az energiát és a pálya méretét.\n- **Mellékkvantumszám** l = 0, 1, …, n − 1: az alhéj és a pálya **alakja**; jelölése s, p, d, f (l = 0, 1, 2, 3). A pálya-impulzusmomentumot adja meg.\n- **Mágneses kvantumszám** m_l = −l, …, 0, …, +l: a pálya térbeli **irányítottsága**; egy alhéjon 2l + 1 pálya van.\n- **Spinkvantumszám** m_s = +½ vagy −½: az elektron saját impulzusmomentumának iránya („fel” vagy „le”).\n\nEgy héjon n² pálya és legfeljebb 2n² elektron fér el. Többelektronos atomban az energia már l-től is függ (az s-elektronok jobban „behatolnak” a mag közelébe), ezért például a 4s alhéj alacsonyabb energiájú, mint a 3d.',
        example: 'Az n = 3 héjon: l = 0 (3s, 1 pálya), l = 1 (3p, 3 pálya), l = 2 (3d, 5 pálya) – összesen 9 = 3² pálya, legfeljebb 18 elektron. Egy 3p elektron lehetséges kvantumszámai például: n = 3, l = 1, m_l = −1, m_s = +½.',
        pitfall: 'Az l legfeljebb n − 1 lehet: „1p” vagy „2d” alhéj **nincs**. A spin nem valódi forgás, hanem belső kvantumos tulajdonság – a „pörgő golyó” csak szemléltetés.',
        related: ['atompalya', 'pauli-hund', 'elektronkonfiguracio', 'ionizacios-energia'],
        models: ['atom'] },
      { id: 'atompalya', term: 'Atompálya', en: 'atomic orbital', topic: 'atom',
        short: 'Egy elektron hullámfüggvénye az atomban: megadja, hol milyen valószínűséggel található az elektron. Alakját a mellékkvantumszám (s, p, d, f), irányát a mágneses kvantumszám határozza meg.',
        prereq: ['fizika-bsc/hullamfuggveny', 'fizika-bsc/hatarozatlansag', 'modell:atom'],
        visual: orbSvg, caption: 'Az s, p és d atompályák alakja (a 90%-os tartózkodási valószínűség határfelülete, síkmetszetben). A színek a hullámfüggvény előjelét (fázisát) mutatják – ez a kötésképzésnél számít.',
        text: 'A határozatlansági reláció miatt az elektronnak nincs éles pályája, mint a bolygóknak: csak **tartózkodási valószínűséget** tudunk megadni. Ezt a hullámfüggvény abszolút értékének négyzete, |ψ|² adja. A szokásos ábrák azt a felületet mutatják, amelyen belül az elektron 90% valószínűséggel található.\n\n- **s pálya** (l = 0): gömbszimmetrikus.\n- **p pályák** (l = 1): két, ellentétes fázisú lebeny, köztük **csomósík**, ahol a megtalálási valószínűség nulla; három van belőlük (pₓ, p_y, p_z).\n- **d pályák** (l = 2): öt pálya, főként négylebenyes alakúak; az átmenetifémek kémiájának kulcsa.\n- **f pályák** (l = 3): hét pálya, a lantanoidák és aktinoidák.\n\nA csomófelületek száma n − 1 (ebből l szög szerinti, a többi gömb alakú). A hullámfüggvény **előjele** nem mérhető közvetlenül, de két atom pályájának átfedésénél eldönti, hogy erősítik (kötő) vagy gyengítik (lazító) egymást.',
        example: 'A hidrogénatom 1s elektronja a legnagyobb valószínűséggel a magtól a₀ = 52,9 pm távolságban található (Bohr-sugár), pedig maga |ψ|² a mag helyén a legnagyobb – a gömbhéjak térfogata ugyanis a sugárral nő.',
        pitfall: 'A pálya nem az elektron „útvonala”. A p pálya két lebenye között sem „ugrál” az elektron: a csomósík a hullámfüggvény tulajdonsága, és egyetlen elektron is mindkét lebenyhez tartozik.',
        related: ['kvantumszamok', 'elektronkonfiguracio', 'hibridizacio', 'molekulapalya', 'pauli-hund'],
        models: ['atom'] },
      { id: 'pauli-hund', term: 'Pauli-elv és Hund-szabály', en: 'Pauli exclusion principle, Hund\u2019s rule', topic: 'atom',
        short: 'Pauli-elv: egy atomban nem lehet két elektron, amelynek mind a négy kvantumszáma azonos – így egy pályán legfeljebb két, ellentétes spinű elektron fér el. Hund-szabály: azonos energiájú pályákon az elektronok előbb egyenként, párhuzamos spinnel helyezkednek el.',
        visual: phSvg, caption: 'A nitrogén 2p³ elektronjai: a Hund-szabály szerinti alapállapot, egy gerjesztett állapot és egy Pauli-elv által tiltott elrendezés.',
        text: 'A **Pauli-elv** (Wolfgang Pauli, 1925) a kvantummechanika egyik alaptörvénye: azonos fermionok (például elektronok) nem lehetnek ugyanabban a kvantumállapotban. Következménye a periódusos rendszer szerkezete: ha nem így lenne, minden elektron az 1s pályára zuhanna, és nem léteznének eltérő kémiai tulajdonságú elemek. Ugyanez az elv tartja meg a fehér törpecsillagokat az összeomlástól.\n\nA **Hund-szabály** (maximális multiplicitás elve): ha több azonos energiájú (degenerált) pálya áll rendelkezésre, az elektronok előbb külön pályákra kerülnek, párhuzamos spinnel; csak ezután párosodnak. Oka: a külön pályán lévő elektronok kevésbé taszítják egymást, a párhuzamos spinű elektronok pedig kvantummechanikai okból (kicserélődési energia) eleve távolabb maradnak egymástól.\n\nA **párosítatlan elektronok** száma mérhető: az ilyen anyagot a mágneses tér behúzza (**paramágneses**), a csupa párosított elektront tartalmazót kissé kitaszítja (diamágneses).',
        example: 'Szén (2p²): két párosítatlan elektron, ↑ ↑ _. Oxigén (2p⁴): ↑↓ ↑ ↑ – két párosítatlan elektron. Neon (2p⁶): minden pálya tele, nincs párosítatlan elektron, diamágneses.',
        pitfall: 'A Hund-szabály csak **azonos energiájú** pályákra vonatkozik (például a három 2p-re). Nem azt mondja, hogy a 2s-ről „egyesével” kell továbblépni a 2p-re: előbb a 2s telik meg két elektronnal.',
        related: ['kvantumszamok', 'elektronkonfiguracio', 'atompalya', 'molekulapalya'],
        models: ['atom'] },
      { id: 'elektronkonfiguracio', term: 'Elektronkonfiguráció', en: 'electron configuration; aufbau principle', topic: 'atom',
        short: 'Az elektronok eloszlása az atom alhéjain alapállapotban, például Fe: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶. A betöltés a felépülési elv szerint, az energia növekvő sorrendjében történik.',
        prereq: ['modell:atom', 'lecke:fizika/atom'],
        visual: auSvg, caption: 'A vas (Z = 26) elektronjainak energiadiagramja. A 3d alhéj öt pályáján a hat elektron közül négy párosítatlan (Hund-szabály).',
        text: 'A **felépülési elv** (aufbau): az elektronok a legalacsonyabb energiájú szabad helyre kerülnek, a Pauli-elv és a Hund-szabály betartásával. A sorrend többelektronos atomban közelítőleg az **n + l szabályt** követi (kisebb n + l előbb; egyenlőségnél a kisebb n):\n\n1s, 2s, 2p, 3s, 3p, **4s, 3d**, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p …\n\nRövidítésként a megelőző nemesgáz törzsét szögletes zárójelbe írjuk: Na = [Ne] 3s¹. A kémiai viselkedést szinte teljesen a **vegyértékelektronok** (a legkülső héj, illetve átmenetifémeknél a (n−1)d) szabják meg; ezért hasonlítanak egymásra az egy oszlopba tartozó elemek.\n\n**Kivételek**: a félig és teljesen betöltött d alhéj különösen stabil, ezért Cr = [Ar] 3d⁵ 4s¹ (és nem 3d⁴ 4s²), Cu = [Ar] 3d¹⁰ 4s¹.',
        example: 'Vas: `1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ = [Ar] 3d⁶ 4s²`. Ionizáláskor viszont a **4s** elektronok távoznak előbb: Fe²⁺ = [Ar] 3d⁶, Fe³⁺ = [Ar] 3d⁵ (ez utóbbi a félig betöltött d héj miatt különösen stabil).',
        pitfall: 'Az, hogy a 4s **előbb töltődik**, mint a 3d, nem jelenti, hogy a betöltött atomban is mindig alacsonyabb az energiája. Átmenetifém-ionoknál ezért a 4s elektronokat kell először elvenni – gyakori vizsgahiba a Fe²⁺ = [Ar] 3d⁴ 4s² válasz.',
        related: ['kvantumszamok', 'pauli-hund', 'atompalya', 'ionizacios-energia', 'elektronegativitas'],
        models: ['atom'] },
      { id: 'ionizacios-energia', term: 'Ionizációs energia', en: 'ionization energy', topic: 'atom',
        short: 'Az az energia, amely egy gázhalmazállapotú, alapállapotú atomból (vagy ionból) a leglazábban kötött elektron eltávolításához szükséges: X(g) → X⁺(g) + e⁻. Mértékegysége kJ/mol vagy eV.',
        prereq: ['lecke:fizika/energia-munka', 'lecke:fizika/atom'],
        visual: ieSvg, caption: 'Az első ionizációs energia a rendszám függvényében: periódusonként nagyjából nő, a nemesgázoknál csúcsot, az alkálifémeknél mélypontot ér el.',
        text: 'Az ionizációs energia azt méri, mennyire erősen köti a mag a külső elektronokat. Két hatás dönt: az **effektív magtöltés** (a magtöltés, csökkentve a belső elektronok árnyékolásával) és a **távolság** a magtól.\n\nPeriódusos tendenciák:\n\n- egy periódusban balról jobbra **nő** (nő az effektív magtöltés, csökken az atomsugár);\n- egy csoportban lefelé **csökken** (a külső elektron új, távolabbi héjon van).\n\nA „letörések” az elektronszerkezetet tükrözik: a B kisebb, mint a Be (az új elektron a magasabb energiájú 2p alhéjra kerül), az O kisebb, mint az N (a 2p⁴-ben az első párosított elektron taszítást érez).\n\nA **második, harmadik** ionizációs energia mindig nagyobb (pozitív ionból nehezebb elektront kiszakítani). Kiugró növekedés jelzi, ha a nemesgáz-törzsbe kellene „belenyúlni”: ez magyarázza az elemek jellemző oxidációs számait.',
        example: 'Hidrogén: 13,6 eV = `13,6 · 96,485 ≈ 1312 kJ/mol`. Nátrium: első 496 kJ/mol, második 4562 kJ/mol – kilencszeres ugrás, ezért a Na mindig Na⁺ ion. Magnézium: 738, 1451, majd 7733 kJ/mol – ezért Mg²⁺.',
        pitfall: 'Az ionizációs energia **gázfázisú** szabad atomra vonatkozik. Oldatban egy fém „oxidálhatóságát” a standard elektródpotenciál méri, amelybe a hidratáció energiája is beleszól: a lítium ionizációs energiája nagyobb, mint a céziumé, mégis vizes oldatban a Li⁺/Li potenciál a legnegatívabb.',
        related: ['elektronkonfiguracio', 'elektronegativitas', 'kvantumszamok', 'elektrodpotencial'],
        models: ['atom'] },
      { id: 'elektronegativitas', term: 'Elektronegativitás', en: 'electronegativity', topic: 'atom',
        short: 'Egy atom azon képessége, hogy kémiai kötésben a közös elektronpárt magához vonzza. A leggyakoribb a Pauling-skála: a fluor 3,98 (legnagyobb), a cézium 0,79.',
        text: 'Az elektronegativitás nem közvetlenül mérhető, hanem származtatott mennyiség. **Pauling** kötési energiákból, **Mulliken** az ionizációs energia és az elektronaffinitás átlagából számolta. A tendencia ugyanaz, mint az ionizációs energiáé: periódusban jobbra nő, csoportban lefelé csökken; a jobb felső sarokban (F, O, N, Cl) a legnagyobb.\n\nA két atom elektronegativitás-különbsége (ΔEN) jellemzi a kötés **polaritását**:\n\n- ΔEN ≈ 0: apoláris kovalens kötés (H₂, Cl₂, C–H közel ilyen);\n- 0,4 < ΔEN < kb. 1,7: poláris kovalens kötés, a negatívabb atomon parciális negatív töltés (δ−);\n- ΔEN > kb. 1,7–2: túlnyomóan ionos kötés.\n\nA határok önkényesek: a kötés jellege folytonosan változik. Egy **molekula** akkor poláris (van dipólusmomentuma), ha a kötések dipólusai a geometria miatt nem oltják ki egymást.',
        example: 'Pauling-értékek: H 2,20, C 2,55, N 3,04, O 3,44, F 3,98, Na 0,93, Cl 3,16.\n\n- NaCl: ΔEN = 2,23 → ionos.\n- HCl: ΔEN = 0,96 → poláris kovalens.\n- CO₂: a C=O kötés poláris (ΔEN = 0,89), de a lineáris molekula dipólusmomentuma nulla.',
        pitfall: 'A poláris kötésekből nem következik poláris molekula (CO₂, CCl₄, BF₃ apoláris). Fordítva: az elektronegativitás nem a „töltés”, hanem egy viszonyszám – ionos töltést csak az ionokra (és formálisan az oxidációs számra) mondunk.',
        related: ['ionizacios-energia', 'intermolekularis', 'vsepr', 'redoxi', 'elektronkonfiguracio'] },

      /* ----- Kémiai kötés ----- */
      { id: 'vsepr', term: 'VSEPR-elmélet (vegyértékhéj-elektronpár-taszítás)', en: 'VSEPR theory (valence shell electron pair repulsion)', topic: 'kotes',
        short: 'Molekulák térszerkezetét becslő modell: a központi atom körüli kötő és nemkötő elektronpárok (elektrondomének) úgy helyezkednek el, hogy egymástól a lehető legtávolabb legyenek.',
        visual: vsSvg, caption: 'Jellemző VSEPR-alakzatok. A nemkötő elektronpárok (lila) több helyet foglalnak, mint a kötő párok, ezért szűkítik a kötésszöget.',
        text: 'Az eljárás:\n\n1. Felírjuk a Lewis-szerkezetet.\n2. Megszámoljuk a központi atom körüli **elektrondoméneket**: minden kötés (egyszeres, kettős vagy hármas egyaránt) egy domén, minden nemkötő elektronpár egy domén.\n3. A domének száma adja az **elektrongeometriát**: 2 lineáris, 3 síkháromszög, 4 tetraéder, 5 trigonális bipiramis, 6 oktaéder.\n4. A **molekulageometriát** csak az atomok helyzete adja: a nemkötő párokat „nem látjuk”.\n\nA taszítás erőssége: nemkötő–nemkötő > nemkötő–kötő > kötő–kötő. Ezért csökken a szög a CH₄ 109,5°-áról az NH₃ 107°-án át a H₂O 104,5°-áig.\n\nA geometriából következik a molekula **polaritása** is, ami meghatározza az oldhatóságot és a forráspontot.',
        example: 'SO₂: a kén körül 3 domén (két kötés és egy nemkötő pár) → síkháromszög elektrongeometria, **V alakú** molekula, kb. 119°. CO₂: 2 domén → lineáris, apoláris. XeF₄: 6 domén, ebből 2 nemkötő (egymással szemben) → **négyzetes síkalkatú** molekula.',
        pitfall: 'A kettős kötés **egy** domén, nem kettő. Az elektrongeometria és a molekulageometria nem ugyanaz: az NH₃ elektrongeometriája tetraéderes, a molekula alakja viszont trigonális piramis.',
        related: ['hibridizacio', 'elektronegativitas', 'intermolekularis', 'molekulapalya'] },
      { id: 'hibridizacio', term: 'Hibridizáció', en: 'orbital hybridization', topic: 'kotes',
        short: 'A vegyértékkötés-elméletben a központi atom s és p (esetleg d) atompályáinak matematikai kombinációja azonos energiájú, irányított hibridpályákká (sp, sp², sp³), amelyek a megfigyelt kötésszögeket adják.',
        prereq: ['kemia-bsc/atompalya'],
        text: 'Linus Pauling vezette be, hogy megmagyarázza: a szén négy egyenértékű, tetraéderesen álló kötést alkot a CH₄-ben, pedig alapállapotában 2s² 2p² szerkezetű.\n\n- **sp³**: egy s + három p → négy hibridpálya, 109,5° (CH₄, NH₃, H₂O, gyémánt).\n- **sp²**: egy s + két p → három hibridpálya egy síkban, 120°; a maradék p pálya a síkra merőleges, és **π-kötést** alkothat (etén, benzol, grafit).\n- **sp**: egy s + egy p → két hibridpálya, 180°; két p pálya marad két π-kötéshez (etin, CO₂ szénatomja).\n\nA hibridpályák a tengelyük mentén átfedve **σ-kötést** alkotnak; a π-kötés a párhuzamos p pályák oldalirányú átfedése, ezért gátolja a kötés körüli elfordulást (cisz–transz izoméria).\n\nA hibridizáció a VSEPR-rel összhangban álló **leírás**, nem fizikai folyamat; a pontosabb kép a molekulapálya-elmélet.',
        example: 'Etén, H₂C=CH₂: mindkét szén sp² hibridállapotú; a C=C kettős kötés egy σ- és egy π-kötés. Az összes atom egy síkban van, a szögek kb. 120°. Etin, HC≡CH: sp, lineáris; a hármas kötés egy σ és két π.',
        pitfall: 'A hibridizáció a geometriából **következik**, nem fordítva: előbb a VSEPR-rel meghatározzuk az alakot, és ahhoz rendeljük a hibridizációt. A „d-pályás hibridizáció” (sp³d, sp³d²) magyarázata a főcsoportbeli elemekre (SF₆) ma már elavultnak számít.',
        related: ['vsepr', 'atompalya', 'molekulapalya'] },
      { id: 'molekulapalya', term: 'Molekulapálya-elmélet', en: 'molecular orbital (MO) theory', topic: 'kotes',
        short: 'Az elektronok az egész molekulára kiterjedő molekulapályákon helyezkednek el, amelyek az atompályák lineáris kombinációjából (LCAO) keletkeznek: kötő (alacsonyabb energiájú) és lazító (magasabb energiájú) pályák formájában.',
        prereq: ['fizika-bsc/hullamfuggveny'],
        visual: moSvg, caption: 'Az O₂ vegyértékhéjának molekulapálya-diagramja. A két párosítatlan elektron a két π∗ lazító pályán ül – ezért paramágneses az oxigén.',
        text: 'Két atompálya átfedésekor két molekulapálya jön létre: ha a hullámfüggvények azonos fázisban adódnak össze, **kötő** pálya (az elektronsűrűség a magok között nő); ha ellentétes fázisban, **lazító** pálya (csomósík a magok között, jelölése ∗, például σ∗).\n\nA molekulapályákat ugyanúgy töltjük be, mint az atompályákat (felépülési elv, Pauli-elv, Hund-szabály). A **kötésrend**:\n\n`kötésrend = (kötő elektronok − lazító elektronok) / 2`\n\nNagyobb kötésrend erősebb és rövidebb kötést jelent; ha nulla, a molekula nem stabil.\n\nAz elmélet nagy sikere, hogy megmagyarázza az O₂ **paramágnesességét** (a folyékony oxigént a mágnes magához vonzza), amit a Lewis-szerkezet (O=O, minden elektron párosítva) nem tud. A kiterjedt molekulapályák írják le a konjugált rendszereket, a benzol delokalizált π-elektronjait, szilárd testekben pedig a sávszerkezetet (vezetők, félvezetők).',
        example: 'H₂: 2 elektron a σ1s pályán → kötésrend 1. He₂: 2 kötő + 2 lazító → kötésrend 0, nem létezik. N₂: 8 kötő, 2 lazító vegyértékelektron → kötésrend 3 (rendkívül erős, 945 kJ/mol). O₂: (8 − 4)/2 = 2, két párosítatlan elektron.',
        pitfall: 'A második periódus elején (B₂, C₂, N₂) a σ2p pálya a π2p **fölé** kerül az s–p keveredés miatt; az O₂-nél és F₂-nél fordított a sorrend. A párosítatlan elektronok száma ettől függ (például a B₂ paramágneses).',
        related: ['atompalya', 'hibridizacio', 'pauli-hund', 'vsepr'] },
      { id: 'intermolekularis', term: 'Intermolekuláris kölcsönhatások', en: 'intermolecular forces', topic: 'kotes',
        short: 'A molekulák közötti gyenge vonzóerők: diszperziós (London-) erő, dipól–dipól kölcsönhatás és hidrogénkötés. Ezek szabják meg a forráspontot, az oldhatóságot és a felületi feszültséget.',
        text: 'Ezek a kölcsönhatások 1–2 nagyságrenddel gyengébbek a kovalens kötésnél, de a halmazállapotot ők döntik el.\n\n- **Diszperziós (London-) erő**: minden molekula között fellép; a pillanatnyi elektroneloszlás-ingadozások indukált dipólusokat keltenek. Erőssége a molekula méretével (polarizálhatóságával) és érintkezési felületével nő.\n- **Dipól–dipól kölcsönhatás**: poláris molekulák (HCl, aceton) állandó dipólusai között.\n- **Hidrogénkötés**: egy erősen elektronegatív atomhoz (F, O, N) kötött hidrogén és egy másik molekula nemkötő elektronpárja között; kb. 5–30 kJ/mol, a legerősebb a három közül. Ez tartja össze a DNS két szálát és alakítja ki a fehérjék térszerkezetét.\n\nAz oldhatóság ökölszabálya, **„hasonló a hasonlóban oldódik”**, ezen alapul: poláris anyag poláris oldószerben, apoláris apolárisban oldódik jól.',
        example: 'Forráspontok: H₂O +100 °C, H₂S −60 °C – a víz hidrogénkötései nélkül a víz szobahőmérsékleten gáz lenne. n-pentán 36 °C, neopentán (ugyanaz az összegképlet, gömbszerű alak) 9,5 °C: kisebb felület, gyengébb diszperziós erő. A jég sűrűsége kisebb a vízénél, mert a hidrogénkötések laza, hatszöges rácsba rendezik a molekulákat.',
        pitfall: 'A „hidrogénkötés” nem a molekulán belüli O–H kovalens kötés (kb. 460 kJ/mol), hanem a molekulák **közötti**, sokkal gyengébb kölcsönhatás. Forraláskor a molekulák közti erőket győzzük le, a molekulák nem bomlanak fel: a vízgőz is H₂O.',
        related: ['elektronegativitas', 'vsepr', 'entropia', 'ph'] },

      /* ----- Termokémia ----- */
      { id: 'entalpia', term: 'Entalpia és reakcióhő', en: 'enthalpy; heat of reaction', topic: 'termo',
        short: 'Az entalpia (H = U + pV) állapotfüggvény, amelynek megváltozása állandó nyomáson egyenlő a rendszer által felvett hővel: ΔH = Qₚ. Exoterm folyamatnál ΔH < 0, endotermnél ΔH > 0.',
        prereq: ['fizika-bsc/elso-fotetel', 'lecke:fizika/energia-munka'],
        formulas: ['hess-f'],
        text: 'A kémiai reakciók többsége nyitott edényben, állandó (légköri) nyomáson megy végbe. Ilyenkor a rendszer a belső energia változásán felül térfogati munkát is végez (pΔV), ezért kényelmes egy olyan függvényt használni, amelynek változása közvetlenül a mért hő: ez az **entalpia**.\n\n- **Exoterm** reakció (ΔH < 0): hőt ad le a környezetnek (égés, semlegesítés, a legtöbb kötés kialakulása).\n- **Endoterm** reakció (ΔH > 0): hőt vesz fel (vízbontás, mészkő bomlása, sok oldódás – a hideg borogatás).\n\nA **standard képződési entalpia** (Δ_f H°) az 1 mol vegyület elemeiből, standard állapotban (1 bar, rendszerint 25 °C) történő képződésének entalpiaváltozása; az elemek stabil módosulatára definíció szerint nulla.\n\nA reakcióhőt **kaloriméterrel** mérjük: `Q = m·c·ΔT` (víz fajhője c = 4,18 J/(g·K)).',
        example: 'A metán égéshője −890,3 kJ/mol (folyékony vízzé égve). 1,00 g metán (1/16,04 mol) elégetése kb. 55,5 kJ hőt ad, ami 1 kg vizet `55 500 / 4184 ≈ 13,3 °C`-kal melegít fel.',
        pitfall: 'Az előjel a **rendszer** szemszögéből értendő: exoterm reakcióban a rendszer energiája csökken (ΔH < 0), a környezet melegszik. Az égéshő értéke függ attól, hogy a keletkező víz folyadék vagy gőz (a különbség a párolgáshő: CH₄-re 802 kontra 890 kJ/mol).',
        related: ['hess-tetel', 'gibbs', 'entropia', 'aktivalasi-energia'] },
      { id: 'hess-tetel', term: 'Hess-tétel', en: "Hess's law", topic: 'termo',
        short: 'Egy reakció entalpiaváltozása csak a kiindulási és a végállapottól függ, a közbülső lépésektől nem; ezért a reakcióegyenletek összeadhatók, és a reakcióhők ugyanúgy összeadódnak.',
        visual: hessSvg, caption: 'Hess-tétel entalpiadiagramon: a szén közvetlen elégetése szén-dioxiddá ugyanannyi hőt ad, mint a kétlépéses út a szén-monoxidon át. Így a közvetlenül nem mérhető ΔH₂ kiszámítható.',
        text: 'Germain Henri Hess 1840-ben kísérletileg fogalmazta meg; ma az első főtétel következményének tekintjük, hiszen az entalpia **állapotfüggvény**.\n\nGyakorlati szabályok:\n\n- ha egy egyenletet megfordítunk, ΔH előjele megfordul;\n- ha egy egyenletet egy számmal szorzunk, ΔH-t is szorozni kell vele;\n- egyenletek összeadásakor a ΔH-k összeadódnak.\n\nA tétel lehetővé teszi, hogy **közvetlenül mérhetetlen** reakcióhőket számítsunk ki: például a szén tökéletlen égését szén-monoxiddá, mert a gyakorlatban mindig keletkezik mellette CO₂ is. A képződéshőkből számolt reakcióhő és a **Born–Haber-körfolyamat** (ionrácsok rácsenergiája) is a Hess-tételre épül.',
        formulas: ['hess-f'],
        example: '1. C + O₂ → CO₂, ΔH₁ = −393,5 kJ/mol\n2. CO + ½ O₂ → CO₂, ΔH₃ = −283,0 kJ/mol\n\nAz elsőből kivonva a másodikat: C + ½ O₂ → CO, `ΔH₂ = −393,5 − (−283,0) = −110,5 kJ/mol`.',
        pitfall: 'A halmazállapotot mindig fel kell tüntetni: a H₂O(g) és a H₂O(f) képződéshője között 44 kJ/mol a különbség (a párolgáshő). A Hess-tétel csak állapotfüggvényekre igaz – a hőre és a munkára külön-külön nem, csak állandó nyomáson a hőre (mert ekkor Q = ΔH).',
        related: ['entalpia', 'gibbs', 'entropia'] },
      { id: 'entropia', term: 'Entrópia', en: 'entropy', topic: 'termo',
        short: 'Az entrópia (S) állapotfüggvény, amely azt méri, hányféle mikroállapot valósítja meg a rendszer adott makroállapotát (S = k·ln W). A II. főtétel szerint egy elszigetelt rendszer entrópiája spontán folyamatban nő.',
        prereq: ['fizika-bsc/entropia'],
        text: 'Boltzmann képlete, `S = k·ln W` szerint az entrópia a mikroállapotok számának (W) logaritmusa. Szemléletesen: mennyi féleképpen oszolhat el a rendszer energiája és részecskéi. Klasszikus termodinamikában reverzibilis folyamatra `ΔS = Q_rev/T`.\n\nAz entrópia **nő**, ha:\n\n- az anyag olvad vagy párolog (szilárd < folyadék ≪ gáz);\n- nő a gázmolekulák száma egy reakcióban;\n- oldódás, keveredés történik (általában);\n- nő a hőmérséklet.\n\nA **standard moláris entrópia** (S°) abszolút érték: a III. főtétel szerint a tökéletes kristály entrópiája 0 K-en nulla. Ezért – az entalpiával ellentétben – az elemek S°-a sem nulla.\n\nA **II. főtétel**: a rendszer és környezete együttes entrópiája spontán folyamatban nő: `ΔS_összes = ΔS_rendszer + ΔS_környezet > 0`. Állandó nyomáson és hőmérsékleten `ΔS_környezet = −ΔH/T`, ebből lesz a Gibbs-féle szabadentalpia.',
        example: 'A víz párolgása 100 °C-on: ΔH = 40,7 kJ/mol, `ΔS = 40 700/373 ≈ 109 J/(mol·K)`.\n\n2 H₂(g) + O₂(g) → 2 H₂O(f): S° értékek 130,7, 205,2 és 69,9 J/(mol·K), így `ΔS° = 2·69,9 − 2·130,7 − 205,2 ≈ −327 J/K` – 3 mol gázból 2 mol folyadék lesz, az entrópia csökken. A reakció mégis spontán, mert a nagy hőleadás a környezet entrópiáját sokkal jobban növeli.',
        pitfall: 'A „rendezetlenség” csak szemléltetés, néha félrevezető. A rendszer entrópiája **csökkenhet** spontán folyamatban (fagyás 0 °C alatt, kristályosodás, élő szervezetek), ha közben a környezeté jobban nő. A mértékegység J/(mol·K) – ΔG számításakor át kell váltani kJ-ra!',
        related: ['gibbs', 'entalpia', 'hess-tetel', 'intermolekularis', 'egyensulyi-allando'] },
      { id: 'gibbs', term: 'Gibbs-féle szabadentalpia és spontaneitás', en: 'Gibbs free energy; spontaneity', topic: 'termo',
        short: 'G = H − TS állapotfüggvény; állandó nyomáson és hőmérsékleten egy folyamat akkor és csak akkor spontán, ha a szabadentalpia csökken: ΔG = ΔH − TΔS < 0.',
        prereq: ['fizika-bsc/entropia'],
        visual: gSvg, caption: 'ΔG a hőmérséklet függvényében a négy előjel-kombinációra. Ahol a vonal a nulla alá kerül, ott a folyamat spontán; a meredekség −ΔS.',
        text: 'A szabadentalpia egyetlen, a **rendszerre** vonatkozó mennyiségben egyesíti a II. főtételt: `ΔG = −T·ΔS_összes`. Egyben megadja azt a legnagyobb hasznos (nem térfogati) munkát, amelyet a folyamat végezhet – például egy galvánelem elektromos munkáját.\n\nA négy eset:\n\n- ΔH < 0, ΔS > 0: minden hőmérsékleten spontán (égés);\n- ΔH > 0, ΔS < 0: soha nem spontán;\n- ΔH < 0, ΔS < 0: alacsony hőmérsékleten spontán (fagyás, ammóniaszintézis);\n- ΔH > 0, ΔS > 0: magas hőmérsékleten spontán (olvadás, mészégetés).\n\nA **fordulási hőmérséklet** `T = ΔH/ΔS`. A standard szabadentalpia-változás az egyensúlyi állandóval is összefügg: `ΔG° = −RT·ln K`, az elektrokémiában pedig `ΔG = −zFE`.',
        formulas: ['gibbs-f', 'dgq-f'],
        example: 'Jég olvadása: ΔH = +6,01 kJ/mol, ΔS = +22,0 J/(mol·K). `T = 6010/22,0 ≈ 273 K` – pontosan 0 °C: felette spontán az olvadás, alatta a fagyás.',
        pitfall: 'A spontán **nem** jelent gyorsat! A gyémánt grafittá alakulása szobahőmérsékleten spontán (ΔG < 0), mégis évmilliárdokig tart. Hogy egy folyamat milyen gyors, azt a kinetika (az aktiválási energia) dönti el, nem a termodinamika. A ΔG° (standard állapot) és a ΔG (tényleges összetétel) sem ugyanaz.',
        related: ['entalpia', 'entropia', 'egyensulyi-allando', 'elektrodpotencial', 'aktivalasi-energia', 'hess-tetel', 'galvanelem'] },

      /* ----- Egyensúly és kinetika ----- */
      { id: 'egyensulyi-allando', term: 'Egyensúlyi állandó és reakcióhányados', en: 'equilibrium constant K, reaction quotient Q', topic: 'egyensuly',
        short: 'Dinamikus egyensúlyban az oda- és visszaalakulás sebessége egyenlő; az a A + b B ⇌ c C + d D reakcióra K = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ) adott hőmérsékleten állandó. Ugyanez a kifejezés tetszőleges pillanatban a Q reakcióhányados.',
        prereq: ['lecke:matematika/egyenletek', 'lecke:matematika/masodfoku'],
        visual: eqSvg, caption: 'H₂ + I₂ ⇌ 2 HI egyensúly beállása 1–1 mol/dm³ kiindulási koncentrációból, 448 °C-on. Egyensúlyban a koncentrációk már nem változnak, de mindkét irányú reakció tovább folyik.',
        text: 'Az egyensúly **dinamikus**: a molekulák szintjén folyamatosan zajlik az átalakulás oda és vissza, csak a két sebesség kiegyenlítődik. Izotópos jelöléssel ez ki is mutatható.\n\n- **K ≫ 1**: az egyensúly a termékek felé tolódik („a reakció lejátszódik”);\n- **K ≪ 1**: alig keletkezik termék.\n\nA **reakcióhányados**, Q, megmondja, merre halad a rendszer: Q < K esetén oda, Q > K esetén vissza, Q = K esetén egyensúlyban van.\n\nK **csak a hőmérséklettől** függ (a kiindulási koncentrációtól, a nyomástól és a katalizátortól nem). Termodinamikai kapcsolata: `ΔG° = −RT·ln K`.\n\nGázreakciókra parciális nyomásokkal is felírható (Kₚ); a szilárd anyagok és a tiszta oldószer nem szerepelnek a kifejezésben.',
        formulas: ['k-f', 'dgq-f'],
        example: 'H₂ + I₂ ⇌ 2 HI, K = 50. Kiindulás: 1–1 mol/dm³ H₂ és I₂. Ha x mol/dm³ alakul át: `(2x)²/(1 − x)² = 50`, gyököt vonva `2x/(1 − x) = 7,07`, ebből x ≈ 0,78. Egyensúlyban [HI] ≈ 1,56, [H₂] = [I₂] ≈ 0,22 mol/dm³.',
        pitfall: 'K kifejezésében **egyensúlyi** koncentrációk szerepelnek, nem a kiindulásiak. A K értéke függ a reakcióegyenlet felírásától: a 2 HI ⇌ H₂ + I₂ irányra K′ = 1/50 = 0,02, a ½ H₂ + ½ I₂ ⇌ HI alakra √50 ≈ 7,1.',
        related: ['le-chatelier', 'gibbs', 'oldhatosagi-szorzat', 'pka', 'sebessegi-egyenlet', 'entropia'] },
      { id: 'le-chatelier', term: 'Le Chatelier–Braun-elv', en: "Le Chatelier's principle", topic: 'egyensuly',
        short: 'Ha egy egyensúlyban lévő rendszert külső hatás (koncentráció-, nyomás- vagy hőmérséklet-változás) ér, az egyensúly úgy tolódik el, hogy a zavaró hatást csökkentse.',
        text: 'A legkisebb kényszer elve minőségi előrejelzést ad:\n\n- **koncentráció**: ha egy anyag koncentrációját növeljük, az egyensúly annak fogyasztása felé tolódik (Q átmenetileg eltér K-tól, és a rendszer visszatér Q = K-hoz); a termék elvezetése a reakciót „továbbhajtja”;\n- **nyomás** (gázreakciókban): összenyomásra a kevesebb gázmolekulát tartalmazó oldal felé tolódik; azonos molszámnál nincs hatása;\n- **hőmérséklet**: melegítésre az **endoterm** irány felé tolódik. Ez az egyetlen hatás, amely **K értékét is megváltoztatja** (van ’t Hoff-egyenlet);\n- **katalizátor**: nem tolja el az egyensúlyt, csak gyorsabban áll be.\n\nAz elv a vegyipar tervezésének alapja, de a pontos számításhoz mindig a K kifejezés kell.',
        example: 'Ammóniaszintézis (Haber–Bosch): N₂ + 3 H₂ ⇌ 2 NH₃, ΔH = −92 kJ/mol. A termelést növeli a **nagy nyomás** (4 mol gázból 2 lesz: 150–300 bar) és az ammónia folyamatos kifagyasztása. Az **alacsony** hőmérséklet is az ammóniának kedvezne, de akkor a reakció túl lassú – ezért kb. 400–450 °C-on, vaskatalizátorral dolgoznak: kompromisszum az egyensúly és a sebesség között.',
        pitfall: 'Inert gáz hozzáadása **állandó térfogaton** nem tolja el az egyensúlyt (a parciális nyomások nem változnak), csak állandó nyomáson, ha emiatt nő a térfogat. A koncentráció változtatása K-t nem változtatja meg, csak az egyensúlyi összetételt.',
        related: ['egyensulyi-allando', 'aktivalasi-energia', 'oldhatosagi-szorzat', 'puffer'] },
      { id: 'sebessegi-egyenlet', term: 'Reakciósebesség és sebességi egyenlet', en: 'reaction rate; rate law', topic: 'egyensuly',
        short: 'A reakciósebesség a koncentráció időegységre jutó változása; a sebességi egyenlet ennek koncentrációfüggése, például v = k·[A]ᵐ·[B]ⁿ, ahol k a sebességi állandó, m + n a reakció rendűsége.',
        text: 'A sebességet az a A → termékek reakcióra `v = −(1/a)·d[A]/dt` definiálja (mol/(dm³·s)). A **sebességi egyenlet** kitevőit (a részrendeket) **kísérletileg** kell meghatározni – általában nem egyeznek a bruttó egyenlet sztöchiometriai együtthatóival, csak elemi reakciókban.\n\nGyakori esetek:\n\n- **nulladrendű**: v = k, a koncentráció lineárisan fogy (például enzim telítésben, katalizátorfelületen);\n- **elsőrendű**: v = k·[A], exponenciális lecsengés, `[A] = [A]₀·e^(−kt)`; a **felezési idő** `t½ = ln 2/k` független a kezdeti koncentrációtól (radioaktív bomlás, sok bomlási reakció);\n- **másodrendű**: v = k·[A]², `1/[A] = 1/[A]₀ + kt`, a felezési idő a koncentrációval nő.\n\nA **reakciómechanizmus** elemi lépések sorozata; a leglassabb, **sebességmeghatározó lépés** szabja meg a mért sebességi egyenletet.',
        example: '2 NO + O₂ → 2 NO₂, mért sebességi egyenlet: v = k·[NO]²·[O₂] (harmadrendű). Ha [NO]-t megduplázzuk, a sebesség **négyszeresére** nő.\n\nElsőrendű bomlás k = 1,0·10⁻³ 1/s sebességi állandóval: `t½ = 0,693/10⁻³ ≈ 693 s ≈ 11,6 perc`.',
        pitfall: 'A sebességi egyenlet kitevőit nem lehet a reakcióegyenletből „leolvasni”: a H₂ + Br₂ → 2 HBr reakció sebességi egyenlete például törtkitevős, bonyolult kifejezés. A sebességi állandó (k) és az egyensúlyi állandó (K) teljesen különböző mennyiségek.',
        related: ['aktivalasi-energia', 'egyensulyi-allando', 'le-chatelier'] },
      { id: 'aktivalasi-energia', term: 'Aktiválási energia és katalizátor', en: 'activation energy; catalyst', topic: 'egyensuly',
        short: 'Az aktiválási energia (Eₐ) az az energiagát, amelyet az ütköző részecskéknek le kell győzniük, hogy az átmeneti állapoton át termékké alakuljanak. A katalizátor más, kisebb aktiválási energiájú reakcióutat nyit, és közben maga nem fogy el.',
        prereq: ['fizika-bsc/idealis-gaz', 'lecke:fizika/energia-munka'],
        visual: epSvg, caption: 'Energiaprofil katalizátor nélkül (piros) és katalizátorral (zöld, szaggatott). A katalizátor csökkenti a gátat, de a kiindulási anyagok és a termékek energiáját – így ΔᵣH-t és az egyensúlyi állandót – nem változtatja.',
        text: 'Nem minden ütközés vezet reakcióhoz: a részecskéknek megfelelő **orientációval** és legalább Eₐ energiával kell ütközniük. A Boltzmann-eloszlás szerint ilyen ütközések hányada `e^(−Eₐ/RT)` – ezért nő a sebesség a hőmérséklettel exponenciálisan (**Arrhenius-egyenlet**). Az energiaprofil csúcsa az **átmeneti állapot** (aktivált komplex), ahol a régi kötések félig felszakadtak, az újak félig kialakultak.\n\nA **katalizátor**:\n\n- új mechanizmust kínál kisebb aktiválási energiával (gyakran köztitermékkel);\n- az oda- és a visszairányú reakciót **ugyanannyiszor** gyorsítja, ezért az egyensúlyt nem tolja el, csak gyorsabban áll be;\n- a reakció végén változatlanul visszamarad.\n\nFajtái: **homogén** (azonos fázisban, például savkatalízis), **heterogén** (szilárd felület: autók katalizátora Pt/Pd/Rh, Haber–Bosch vaskatalizátor) és **enzimek** (biokatalizátorok, akár 10¹⁷-szeres gyorsítással).',
        formulas: ['arrhenius-f'],
        example: 'Ha egy katalizátor 75-ről 50 kJ/mol-ra csökkenti az aktiválási energiát (változatlan A mellett), 25 °C-on a sebesség `e^(25 000/(8,314·298)) ≈ 2,4·10⁴`-szeresére nő. Ugyanennyi gyorsulást katalizátor nélkül csak jelentős melegítéssel lehetne elérni.',
        pitfall: 'A katalizátor **nem** teszi lehetővé a termodinamikailag tiltott (ΔG > 0) reakciót, és nem növeli az egyensúlyi termékmennyiséget – csak hamarabb érjük el. Az Eₐ nem azonos ΔH-val: egy erősen exoterm reakció is lehet nagyon lassú (a fa szobahőmérsékleten nem gyullad meg).',
        related: ['sebessegi-egyenlet', 'gibbs', 'le-chatelier', 'egyensulyi-allando', 'entalpia'] },

      /* ----- Oldatok és elektrokémia ----- */
      { id: 'ph', term: 'pH és a víz autoprotolízise', en: 'pH; autoionization of water', topic: 'oldat',
        short: 'A pH az oxóniumion-koncentráció negatív tízes alapú logaritmusa: pH = −lg[H₃O⁺]. A víz ionszorzata 25 °C-on Kᵥ = [H₃O⁺][OH⁻] = 10⁻¹⁴, így semleges oldatban pH = 7.',
        prereq: ['lecke:matematika/egyenletek'],
        formulas: ['ph-f'],
        text: 'A **Brønsted–Lowry-elmélet** szerint a sav protont ad le, a bázis protont vesz fel; minden savnak van **konjugált bázisa** (HCl/Cl⁻, NH₄⁺/NH₃). A víz mindkettőre képes (amfoter), ezért kis mértékben önmagával is reagál:\n\n`2 H₂O ⇌ H₃O⁺ + OH⁻`, `Kᵥ = 1,0·10⁻¹⁴` (25 °C).\n\nEbből `pH + pOH = 14`. Savas oldat: pH < 7, lúgos: pH > 7. Egy egységnyi pH-különbség tízszeres oxóniumion-koncentrációt jelent.\n\n**Erős savak** (HCl, HNO₃, H₂SO₄ első lépése) és **erős bázisok** (NaOH, KOH) vizes oldatban gyakorlatilag teljesen disszociálnak: pH-juk közvetlenül a koncentrációból adódik. Gyenge savaknál az egyensúlyt is számolni kell (lásd: savi állandó).\n\nMérése: üvegelektródos pH-mérővel (ez valójában egy Nernst-egyenlet szerint működő elektród) vagy indikátorral.',
        example: '0,01 M HCl: [H₃O⁺] = 10⁻² → pH = 2. 0,001 M NaOH: [OH⁻] = 10⁻³ → pOH = 3, pH = 11. A gyomorsav pH-ja 1–2, a vér 7,35–7,45, a háztartási ammónia kb. 11,5.',
        pitfall: 'A víz ionszorzata hőmérsékletfüggő: 37 °C-on Kᵥ ≈ 2,4·10⁻¹⁴, így a semleges pH ott kb. 6,8 – ez nem savas! Nagyon híg erős savnál (például 10⁻⁸ M HCl) nem szabad pH = 8-at írni: a víz saját oxóniumionjai dominálnak, a pH kicsit 7 alatt van.',
        related: ['pka', 'puffer', 'oldhatosagi-szorzat', 'egyensulyi-allando', 'elektrodpotencial'] },
      { id: 'pka', term: 'Savi állandó (Kₐ, pKₐ)', en: 'acid dissociation constant (Kₐ, pKₐ)', topic: 'oldat',
        short: 'A HA + H₂O ⇌ H₃O⁺ + A⁻ egyensúly állandója, Kₐ = [H₃O⁺][A⁻]/[HA]; logaritmikus alakja pKₐ = −lg Kₐ. Minél kisebb a pKₐ, annál erősebb a sav.',
        prereq: ['lecke:matematika/masodfoku'],
        visual: tiSvg, caption: 'Ecetsav (lila) és sósav (szaggatott) titrálási görbéje nátrium-hidroxiddal. A félig semlegesített pontban pH = pKₐ – így a görbéből a savi állandó leolvasható.',
        text: 'A Kₐ a sav erősségét méri: azt, hogy vízben milyen mértékben adja le protonját. Ugyanígy a bázisokra Kᵦ definiálható, és egy konjugált párra `Kₐ·Kᵦ = Kᵥ`, azaz `pKₐ + pKᵦ = 14` (25 °C). **Erős sav konjugált bázisa gyenge**, és fordítva.\n\nJellemző pKₐ-értékek: HCl ≈ −6, H₃PO₄ 2,15, HF 3,17, ecetsav 4,74, H₂CO₃ 6,35, NH₄⁺ 9,25, fenol 10, víz 14 (illetve definíciótól függően 15,7).\n\nGyenge sav c koncentrációjú oldatára, ha a disszociáció kicsi: `[H₃O⁺] ≈ √(Kₐ·c)`; pontosabban a `x²/(c − x) = Kₐ` másodfokú egyenletet kell megoldani.\n\nA **többértékű savak** (H₃PO₄, H₂CO₃) lépcsőzetesen disszociálnak, mindegyik lépésnek saját pKₐ-ja van; ezek általában 4–5 egységgel követik egymást.',
        formulas: ['henderson-f', 'ph-f'],
        example: '0,10 M ecetsav, Kₐ = 1,8·10⁻⁵: `x²/(0,10 − x) = 1,8·10⁻⁵`, ebből x = [H₃O⁺] ≈ 1,33·10⁻³ mol/dm³, **pH ≈ 2,88**. A disszociációfok csak 1,3% – az azonos koncentrációjú sósav pH-ja 1,0.\n\nAz egyenértékpontban (nátrium-acetát-oldat) az acetát gyenge bázis, ezért ott pH ≈ 8,7, nem 7.',
        pitfall: 'A „gyenge sav” nem „híg sav”: az erősség a disszociáció mértékét (Kₐ), a töménység a koncentrációt jelenti. Tömény ecetsav is gyenge sav, és híg sósav is erős. A √(Kₐ·c) közelítés csak akkor jó, ha a disszociációfok kicsi (kb. 5% alatt).',
        related: ['ph', 'puffer', 'egyensulyi-allando', 'oldhatosagi-szorzat'] },
      { id: 'puffer', term: 'Pufferoldat', en: 'buffer solution', topic: 'oldat',
        short: 'Gyenge sav és konjugált bázisa (vagy gyenge bázis és konjugált sava) keveréke, amelynek pH-ja kis mennyiségű erős sav vagy lúg hozzáadására, illetve hígításra alig változik.',
        formulas: ['henderson-f'],
        text: 'A puffer mindkét irányból „elnyeli” a zavart:\n\n- hozzáadott **sav** (H₃O⁺) protonját a konjugált bázis köti meg: A⁻ + H₃O⁺ → HA + H₂O;\n- hozzáadott **lúg** (OH⁻) a gyenge savval reagál: HA + OH⁻ → A⁻ + H₂O.\n\nÍgy csak az [A⁻]/[HA] arány változik kicsit, és a **Henderson–Hasselbalch-egyenlet** szerint a pH ennek logaritmusától függ. Hígításkor az arány nem változik, így a pH sem.\n\nA **pufferkapacitás** azt adja meg, mennyi erős sav vagy lúg semlegesíthető jelentős pH-változás nélkül; akkor a legnagyobb, ha [A⁻] = [HA] (pH = pKₐ), és a komponensek tömények. A hatékony tartomány kb. **pKₐ ± 1**. A pufferzóna a titrálási görbe lapos szakasza.\n\nFontos pufferek: a vér szénsav–hidrogénkarbonát rendszere (pH 7,4), a sejtek foszfátpuffere (H₂PO₄⁻/HPO₄²⁻, pKₐ 7,2), laboratóriumban acetát-, ammónia- és TRIS-puffer.',
        example: '1 dm³ oldat 0,10 mol ecetsavval és 0,10 mol nátrium-acetáttal: pH = 4,74. 0,010 mol HCl hozzáadása után 0,09 mol acetát és 0,11 mol ecetsav lesz: `pH = 4,74 + lg(0,09/0,11) ≈ 4,65`. Ugyanez a HCl 1 dm³ tiszta vízben pH 7-ről 2-re csökkentené a pH-t.',
        pitfall: 'Erős sav és sója (HCl + NaCl) **nem** puffer, mert a Cl⁻ nem köti meg a protonokat. Ha a hozzáadott sav vagy lúg mennyisége meghaladja a puffer kapacitását (elfogy az egyik komponens), a pH hirtelen megváltozik.',
        related: ['pka', 'ph', 'le-chatelier', 'egyensulyi-allando'] },
      { id: 'oldhatosagi-szorzat', term: 'Oldhatósági szorzat', en: 'solubility product (Kₛₚ)', topic: 'oldat',
        short: 'Rosszul oldódó ionvegyület és telített oldata közötti egyensúly állandója, például AgCl(sz) ⇌ Ag⁺ + Cl⁻ esetén Kₛₚ = [Ag⁺][Cl⁻]. Ha az ionkoncentrációk szorzata meghaladja Kₛₚ-t, csapadék válik ki.',
        text: 'Mivel a szilárd anyag aktivitása 1, a kifejezésben csak az oldott ionok szerepelnek, a sztöchiometria szerinti hatványon: Ca₃(PO₄)₂-re `Kₛₚ = [Ca²⁺]³·[PO₄³⁻]²`.\n\n**Oldhatóság** (s, mol/dm³) tiszta vízben:\n\n- AB típusra (AgCl, BaSO₄): `Kₛₚ = s²`, `s = √Kₛₚ`;\n- AB₂ típusra (CaF₂, PbI₂): `Kₛₚ = s·(2s)² = 4s³`.\n\nKülönböző típusú sók oldhatóságát ezért nem lehet pusztán a Kₛₚ értékek alapján összehasonlítani.\n\n**Csapadékképződés**: ha az ionszorzat (Q) > Kₛₚ, csapadék válik ki; ha Q < Kₛₚ, az oldat telítetlen.\n\n**Saját ion hatás**: közös ion jelenlétében az oldhatóság drámaian csökken (Le Chatelier-elv) – ezt használja a gravimetriás analízis és a vízkezelés.',
        example: 'AgCl, Kₛₚ = 1,8·10⁻¹⁰: tiszta vízben `s = √(1,8·10⁻¹⁰) ≈ 1,34·10⁻⁵ mol/dm³`, azaz kb. **1,9 mg/dm³**. 0,10 M NaCl-oldatban: `s = 1,8·10⁻¹⁰/0,10 = 1,8·10⁻⁹ mol/dm³` – közel tízezerszer kevesebb.\n\nCaF₂ (Kₛₚ = 3,9·10⁻¹¹): `s = ∛(Kₛₚ/4) ≈ 2,1·10⁻⁴ mol/dm³`.',
        pitfall: 'Kisebb Kₛₚ nem mindig jelent kisebb oldhatóságot: a CaF₂ Kₛₚ-ja kisebb, mint az AgCl-é, mégis több mint tízszer jobban oldódik, mert más a képlet típusa. Az ionerősség, komplexképződés és a pH (például karbonátok, hidroxidok) is jelentősen módosítja az oldhatóságot.',
        related: ['egyensulyi-allando', 'le-chatelier', 'ph', 'pka'] },
      { id: 'redoxi', term: 'Redoxireakció és oxidációs szám', en: 'redox reaction; oxidation number', topic: 'oldat',
        short: 'Redoxireakcióban elektronátadás történik: az oxidáció elektronleadás (az oxidációs szám nő), a redukció elektronfelvétel (az oxidációs szám csökken). A kettő mindig együtt jár.',
        text: 'Az **oxidációs szám** formális töltés: az, amelyet az atom akkor kapna, ha minden kötése ionos lenne (a közös elektronpár a nagyobb elektronegativitású atomhoz kerül). Szabályok: elemi állapotban 0; egyatomos ionban az ion töltése; a fluor mindig −1; az oxigén általában −2 (peroxidban −1); a hidrogén általában +1 (fémhidridben −1); a semleges molekulában az összeg 0.\n\n- **Oxidálószer**: elektront vesz fel, maga **redukálódik** (O₂, Cl₂, KMnO₄, K₂Cr₂O₇).\n- **Redukálószer**: elektront ad le, maga **oxidálódik** (fémek, H₂, C, Fe²⁺).\n\nEgyenletrendezés **félreakciókkal**: az oxidációt és a redukciót külön felírjuk, rendezzük az atomokat (savas közegben H₂O-val és H⁺-nal), a töltéseket elektronokkal, majd úgy szorozzuk őket, hogy a leadott és felvett elektronok száma egyezzen.\n\nRedoxireakció az égés, a korrózió, a légzés és a fotoszintézis, az akkumulátorok töltése és kisütése is.',
        example: 'Permanganometriás vas-meghatározás: `MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O`. A mangán oxidációs száma +7-ről +2-re csökken (5 e⁻ felvétel), öt vas(II) adja le egy-egy elektronját. A lila permanganát elszíntelenedése jelzi a végpontot.',
        pitfall: 'Az oxidációs szám **formális**: a KMnO₄-ban nincs Mn⁷⁺ ion. A „LEO the lion says GER” (Loss of Electrons is Oxidation, Gain is Reduction) jellegű segédszabályokkal vigyázni kell: az oxidálószer az, amely **redukálódik**.',
        related: ['elektrodpotencial', 'galvanelem', 'elektrolizis', 'elektronegativitas'],
        models: ['akkucella'] },
      { id: 'elektrodpotencial', term: 'Standard elektródpotenciál', en: 'standard electrode (reduction) potential', topic: 'oldat',
        short: 'Egy redoxipár (például Cu²⁺/Cu) redukciós potenciálja a standard hidrogénelektródhoz képest, standard körülmények között (1 mol/dm³, 1 bar, 25 °C). Minél pozitívabb, annál erősebb oxidálószer a pár oxidált formája.',
        prereq: ['fizika-bsc/potencial', 'lecke:fizika/elektromossag'],
        formulas: ['nernst-f'],
        text: 'Egyetlen elektród potenciálja közvetlenül nem mérhető, csak két elektród közti feszültség. Ezért egy referenciát nullának választunk: a **standard hidrogénelektródot** (platina, 1 bar H₂, a H₃O⁺ aktivitása 1): E°(H⁺/H₂) = 0,000 V.\n\nA **standard redukciós potenciálok** sorba rendezve a **elektrokémiai (feszültségi) sort** adják. Néhány érték (V): Li⁺/Li −3,04; Zn²⁺/Zn −0,76; Fe²⁺/Fe −0,44; H⁺/H₂ 0; Cu²⁺/Cu +0,34; Ag⁺/Ag +0,80; Cl₂/Cl⁻ +1,36; F₂/F⁻ +2,87.\n\nKövetkezmények:\n\n- a negatív potenciálú fémek savakból hidrogént fejlesztenek (Zn, Fe), a pozitívak nem (Cu, Ag);\n- egy fém a nála pozitívabb potenciálú fém ionjait redukálja (vasszög rezet választ ki réz-szulfát-oldatból);\n- a galvánelem feszültsége `E°_cella = E°_katód − E°_anód`, és `ΔG° = −zFE°` – pozitív cellafeszültség spontán reakciót jelent.\n\nNem standard koncentrációknál a **Nernst-egyenlet** adja a potenciált.',
        example: 'Réz-ion-elektród 0,010 M Cu²⁺-oldatban: `E = 0,34 + (0,0592/2)·lg 0,010 = 0,34 − 0,059 ≈ 0,28 V`. Egy tízes faktor koncentrációváltozás kétértékű ionnál csak kb. 30 mV változást okoz.',
        pitfall: 'A potenciál **intenzív** mennyiség: ha egy félreakciót 2-vel szorzunk, E° nem változik (ΔG° viszont igen). A cellafeszültség számításakor nem szabad az anódpotenciál előjelét „megfordítani” és még ki is vonni – a két eljárás közül csak az egyiket kell alkalmazni.',
        related: ['galvanelem', 'redoxi', 'elektrolizis', 'gibbs', 'ionizacios-energia', 'ph'],
        models: ['akkucella'] },
      { id: 'galvanelem', term: 'Galvánelem', en: 'galvanic (voltaic) cell', topic: 'oldat',
        short: 'Olyan elektrokémiai cella, amely spontán redoxireakció kémiai energiáját elektromos energiává alakítja: az anódon oxidáció, a katódon redukció zajlik, az elektronok a külső áramkörön át áramlanak.',
        prereq: ['modell:akkucella', 'lecke:fizika/elektromossag'],
        visual: gvSvg, caption: 'Daniell-elem: a cink anód oldódik, a réz katódon réz válik ki. Az elektronok a külső vezetéken, az ionok a sóhídon át vándorolnak, így zárul az áramkör.',
        formulas: ['nernst-f', 'gibbs-f'],
        text: 'A két félcellát úgy választjuk el, hogy az oxidálószer és a redukálószer ne közvetlenül cseréljen elektront (akkor csak hő keletkezne), hanem a külső áramkörön keresztül.\n\n- **Anód**: itt történik az **oxidáció**; galvánelemben ez a **negatív** pólus.\n- **Katód**: itt történik a **redukció**; galvánelemben ez a **pozitív** pólus.\n- **Sóhíd** vagy porózus fal: ionvezetéssel biztosítja az elektromos semlegességet, de megakadályozza az oldatok keveredését.\n\nCelladiagram (Daniell-elem): `Zn | ZnSO₄(aq) ‖ CuSO₄(aq) | Cu`. A kapocsfeszültség árammentes állapotban (elektromotoros erő) `E = E°_katód − E°_anód`, koncentrációfüggését a Nernst-egyenlet adja. A kinyerhető maximális elektromos munka `W = −ΔG = zFE` (mol reakcióra).\n\nGyakorlati változatok: **primer elemek** (alkáli elem, 1,5 V), **akkumulátorok** (ólom, Li-ion: töltéskor elektrolizáló cellaként működnek), **tüzelőanyag-cellák** (H₂ + O₂, folyamatos betáplálással).',
        example: 'Daniell-elem: `E° = 0,34 − (−0,76) = 1,10 V`. Egy mol cink oxidációjára `ΔG° = −2·96 485·1,10 ≈ −212 kJ`. A cellareakció egyensúlyi állandója `K = e^(212 300/(8,314·298)) ≈ 10³⁷` – a reakció gyakorlatilag teljesen lejátszódik.',
        pitfall: 'Az anód–katód és a pólusok előjele **nem** ugyanaz galvánelemben és elektrolizáló cellában: az anód mindig az oxidáció helye, de galvánelemben negatív, elektrolízisnél pozitív pólus. A terhelt elem kapocsfeszültsége a belső ellenállás miatt kisebb az elektromotoros erőnél.',
        related: ['elektrodpotencial', 'redoxi', 'elektrolizis', 'gibbs'],
        models: ['akkucella'] },
      { id: 'elektrolizis', term: 'Elektrolízis', en: 'electrolysis', topic: 'oldat',
        short: 'Külső áramforrással kikényszerített, önként nem végbemenő redoxireakció egy elektrolitban: a negatív katódon redukció, a pozitív anódon oxidáció zajlik. A leválasztott anyag mennyisége az áthaladt töltéssel arányos (Faraday-törvények).',
        prereq: ['lecke:fizika/elektromossag'],
        text: 'Az elektrolízis a galvánelem „fordítottja”: elektromos energia árán ΔG > 0 reakciót hajtunk végre. A szükséges legkisebb feszültség a **bontási feszültség**, amely az elméleti cellafeszültségből és a **túlfeszültségből** (az elektródreakciók lassúságából adódó többletből) tevődik össze.\n\n**Faraday-törvények**: a leválasztott anyag tömege\n\n`m = M·I·t / (z·F)`,\n\nahol M a moláris tömeg, I az áramerősség, t az idő, z az egy részecskére jutó elektronszám, F = 96 485 C/mol.\n\nVizes oldatban a víz is versenyez: a katódon a nagyon negatív potenciálú fémionok (Na⁺, K⁺) helyett **hidrogén** fejlődik, az anódon sok anion helyett **oxigén** (de tömény kloridoldatból klór).\n\nIpari alkalmazások: alumíniumgyártás (olvadékelektrolízis, Hall–Héroult), klóralkáli-ipar (NaCl-oldatból Cl₂, H₂, NaOH), rézfinomítás, galvanizálás (krómozás, aranyozás), hidrogén előállítása vízbontással, akkumulátorok töltése.',
        example: 'Réz leválasztása CuSO₄-oldatból 2,0 A árammal 1 órán át: `Q = 2,0·3600 = 7200 C`, `n(Cu) = 7200/(2·96 485) ≈ 0,0373 mol`, `m ≈ 0,0373·63,55 ≈ 2,37 g`.\n\nA víz bontásának elméleti feszültsége 1,23 V, a gyakorlatban a túlfeszültség miatt 1,8–2,0 V kell.',
        pitfall: 'Elektrolízisnél a **katód a negatív** pólus (itt redukció történik), fordítva, mint a galvánelemben. Vizes NaCl-oldat elektrolízisekor a katódon nem nátrium, hanem hidrogén keletkezik – nátriumfémet csak olvadékból lehet előállítani.',
        related: ['galvanelem', 'redoxi', 'elektrodpotencial'],
        models: ['akkucella'] },
      /* ----- Halmazállapotok és szilárd anyagok ----- */
      { id: 'idealis-gaz-kem', term: 'Gáztörvények és az ideális gáz', en: 'gas laws; ideal gas; Dalton\u2019s law', topic: 'halmaz',
        short: 'Az ideális gáz modelljében a részecskék pontszerűek és nem vonzzák egymást; állapotát a pV = nRT egyenlet írja le. Gázelegyben a komponensek parciális nyomásai összeadódnak (Dalton-törvény).',
        prereq: ['fizika-bsc/idealis-gaz', 'lecke:kemia/anyagmennyiseg'],
        formulas: ['gaz-f'],
        text: 'A gázok viselkedését négy állapotjelző írja le: nyomás (p), térfogat (V), hőmérséklet (T) és anyagmennyiség (n). A történeti tapasztalati törvények:\n\n- **Boyle–Mariotte**: állandó T-n `p·V = állandó`;\n- **Gay-Lussac / Charles**: állandó p-n `V ∝ T` (abszolút hőmérséklet!);\n- **Avogadro**: azonos p-n és T-n azonos térfogatú gázokban azonos számú molekula van.\n\nEzek összevonása az **egyesített gáztörvény**, `pV = nRT`.\n\nA **kinetikus gázelmélet** megmagyarázza: a nyomás a falnak ütköző molekulák impulzusátadásából ered, a hőmérséklet pedig a molekulák átlagos mozgási energiájával arányos: `E_kin = (3/2)·k·T` molekulánként. A négyzetes középsebesség `v = √(3RT/M)` – ugyanazon a hőmérsékleten a könnyebb molekulák gyorsabbak. Ebből következik **Graham törvénye** is: a kiáramlás (effúzió) sebessége `∝ 1/√M`.\n\n**Dalton-törvény**: egy gázelegy minden komponense úgy viselkedik, mintha egyedül töltené ki a teret; a parciális nyomás `p_i = x_i·p`.\n\nA modell akkor jó, ha a molekulák saját térfogata és a köztük lévő vonzás elhanyagolható: alacsony nyomáson és a forráspontnál jóval magasabb hőmérsékleten.',
        example: 'A levegő kb. 21 térfogat% oxigént tartalmaz, így tengerszinten (≈ 1,013 bar) `p(O₂) ≈ 0,21·1,013 ≈ 0,21 bar`. N₂ négyzetes középsebessége 25 °C-on: `√(3·8,314·298/0,028) ≈ 515 m/s`; a H₂ (M = 2 g/mol) √14 ≈ 3,7-szer gyorsabb.',
        pitfall: 'A hőmérsékletet **mindig kelvinben** kell behelyettesíteni: 20 °C-ról 40 °C-ra melegítve a gáz térfogata nem kétszeresére, hanem csak `313/293 ≈ 1,07`-szeresére nő. Ügyelj a mértékegységek összhangjára is: Pa és m³ mellett R = 8,314, bar és dm³ mellett 0,08314.',
        related: ['realis-gaz', 'fazisdiagram', 'kolligativ', 'entropia'] },
      { id: 'realis-gaz', term: 'Reális gázok (van der Waals-egyenlet)', en: 'real gases; van der Waals equation; compressibility factor', topic: 'halmaz',
        short: 'A valódi gázok nagy nyomáson és alacsony hőmérsékleten eltérnek az ideális viselkedéstől, mert a molekuláknak saját térfogatuk van és vonzzák egymást. A van der Waals-egyenlet két anyagi állandóval (a, b) veszi ezt figyelembe.',
        prereq: ['fizika-bsc/idealis-gaz'],
        formulas: ['vdw-f'],
        text: 'Az eltérést a **kompresszibilitási tényező** méri: `Z = pV/(nRT)`. Ideális gázra Z = 1.\n\n- **Z < 1**: a vonzóerők dominálnak (közepes nyomáson, alacsony hőmérsékleten) – a gáz könnyebben összenyomható, mint az ideális.\n- **Z > 1**: a molekulák saját térfogata dominál (nagyon nagy nyomáson) – a gáz nehezebben nyomható össze.\n\nA **van der Waals-egyenlet** (1873) két korrekciót tesz:\n\n1. a vonzás csökkenti a falra kifejtett nyomást; ez a hatás a részecskesűrűség négyzetével arányos, innen az `a·n²/V²` tag;\n2. a molekulák nem pontszerűek, a szabad térfogat `V − n·b`.\n\nA vonzóerők teszik lehetővé a **cseppfolyósítást**. Minden gáznak van egy **kritikus hőmérséklete** (T_c), amely fölött semmilyen nyomással nem cseppfolyósítható – ott a folyadék és a gőz közötti különbség megszűnik (szuperkritikus fluidum). A van der Waals-egyenlet a kritikus pontot is jól közelíti, ezért az állandók a kritikus adatokból számíthatók.\n\nAz a állandó a vonzás erősségét tükrözi (nagy a poláris és nagy molekuláknál), b a molekula méretét. A **Joule–Thomson-effektus** (fojtáskor a legtöbb gáz lehűl) is a vonzóerők következménye, ezen alapul a levegő cseppfolyósítása.',
        example: '1,00 mol CO₂ 1,00 dm³-ben 300 K-en: az ideális gáztörvény 24,9 bar-t, a van der Waals-egyenlet ≈ 22,4 bar-t ad, `Z ≈ 0,90`. Kritikus adatok: CO₂ T_c ≈ 304 K (31 °C), p_c ≈ 73,8 bar; víz T_c ≈ 647 K (374 °C), p_c ≈ 221 bar. A szén-dioxid ezért szobahőmérsékleten nyomással cseppfolyósítható (szifonpatron), a nitrogén (T_c ≈ 126 K) nem.',
        pitfall: 'A van der Waals-egyenlet is **közelítés**: kvalitatívan jó, de nagy nyomáson számszerűen pontatlan; pontos mérnöki számításhoz más állapotegyenleteket (pl. viriál-, Peng–Robinson-egyenlet) használnak. A „gáz” és a „gőz” nem ugyanaz: gőznek a kritikus hőmérséklet alatti gázfázist nevezzük, amely nyomással cseppfolyósítható.',
        related: ['idealis-gaz-kem', 'intermolekularis', 'fazisdiagram'] },
      { id: 'fazisdiagram', term: 'Fázisdiagram és fázisátalakulások', en: 'phase diagram; triple point; critical point', topic: 'halmaz',
        short: 'A fázisdiagram a nyomás–hőmérséklet síkon mutatja, melyik halmazállapot (fázis) stabil. A görbéken két fázis egyensúlyban van, a hármaspontban mindhárom; a kritikus pont fölött a folyadék és a gőz nem különböztethető meg.',
        prereq: ['fizika-bsc/entropia', 'kemia-bsc/gibbs'],
        formulas: ['clapeyron-f'],
        text: 'Adott p és T mellett az a fázis stabil, amelynek **moláris szabadentalpiája** (kémiai potenciálja) a legkisebb. A határgörbéken két fázis kémiai potenciálja egyenlő – ezek az **egyensúlyi görbék**:\n\n- szilárd–folyadék: **olvadásgörbe**;\n- folyadék–gőz: **gőznyomásgörbe**, a kritikus pontban ér véget;\n- szilárd–gőz: **szublimációs görbe**.\n\nA görbék meredekségét a **Clapeyron-egyenlet** adja: `dp/dT = ΔH/(T·ΔV)`. Mivel a legtöbb anyag olvadáskor kitágul, az olvadásgörbe jobbra dől (nagyobb nyomás → magasabb olvadáspont). A **víz kivétel**: a jég kisebb sűrűségű a folyadéknál (ΔV < 0), ezért olvadásgörbéje balra dől – nyomásra a jég olvadáspontja kissé csökken.\n\n**Gibbs-féle fázisszabály**: `Sz = K − F + 2` (szabadsági fokok = komponensek − fázisok + 2). Tiszta anyagra (K = 1) a hármaspontban F = 3, Sz = 0: a hármaspont egyetlen, rögzített (p, T) pont.\n\nA **forráspont** az a hőmérséklet, amelyen a gőznyomás eléri a külső nyomást; a normál forráspont 1 atm-ra (101,325 kPa) vonatkozik. Fázisátalakuláskor a hőmérséklet állandó, a közölt hő (látens hő) a szerkezet átrendezésére fordítódik.',
        example: 'Víz hármaspontja: 273,16 K, 611,657 Pa; kritikus pontja ≈ 647 K, 22,06 MPa. A CO₂ hármaspontja ≈ 216,6 K és 5,18 bar – mivel ez jóval 1 bar fölött van, a szárazjég légköri nyomáson nem olvad, hanem **szublimál** (−78,5 °C-on). Kuktában (≈ 2 bar) a víz kb. 120 °C-on forr.',
        pitfall: 'A „korcsolya alatt a nyomás olvasztja meg a jeget” magyarázat túlzó: a korcsolya nyomása csak néhány tized fokkal csökkenti az olvadáspontot; a csúszásban a súrlódási hő és a jégfelszín eleve folyadékszerű rétege a fontosabb. A forráspont nem anyagi állandó, hanem a nyomástól függ.',
        related: ['realis-gaz', 'idealis-gaz-kem', 'gibbs', 'entropia', 'kolligativ', 'intermolekularis'] },
      { id: 'kristalyracs', term: 'Kristályrácsok és elemi cella', en: 'crystal lattice; unit cell; packing', topic: 'halmaz',
        short: 'A kristályos szilárd anyagban a részecskék szabályos, térben ismétlődő rendben helyezkednek el. A legkisebb ismétlődő egység az elemi cella; a rácsot összetartó erők szerint ionos, atom- (kovalens), molekula- és fémrácsot különböztetünk meg.',
        prereq: ['lecke:kemia/kemiai-kotesek'],
        text: '**Rácstípusok** a rácspontokon lévő részecskék és a köztük ható erők szerint:\n\n- **ionrács** (NaCl, CaF₂): elektrosztatikus vonzás; magas olvadáspont, rideg, olvadékban és oldatban vezet;\n- **atomrács** (gyémánt, SiO₂, SiC): kovalens kötések hálózata; nagyon kemény, igen magas olvadáspont;\n- **molekularács** (jég, jód, szárazjég): gyenge másodrendű kölcsönhatások; alacsony olvadáspont, puha;\n- **fémrács** (Cu, Fe): fémes kötés; jó vezető, megmunkálható.\n\n**Elemi cella**: a rács legkisebb paralelepipedonja, amelynek eltolásaival az egész kristály felépíthető. Hét kristályrendszer és 14 Bravais-rács létezik.\n\nGyakori fémrácsok (egyforma gömbök):\n\n- **lapcentrált köbös** (fcc, Cu, Al, Au): 4 atom/cella, koordinációs szám 12, térkitöltés 74%;\n- **hexagonális szoros illeszkedés** (hcp, Mg, Zn): szintén 12 és 74%;\n- **tércentrált köbös** (bcc, Fe szobahőmérsékleten, Na): 2 atom/cella, koordinációs szám 8, 68%;\n- egyszerű köbös: 1 atom/cella, 52% (ritka).\n\nAz atomok száma a cellában: a csúcson lévő atom 1/8-ad, a lapon lévő 1/2, az élen lévő 1/4, a belső 1 részben tartozik a cellához.\n\nA **sűrűség** az elemi cellából: `ρ = Z·M/(N_A·a³)`, ahol Z az atomok (képletegységek) száma a cellában, a a rácsállandó. A szerkezetet **röntgendiffrakcióval** határozzák meg (Bragg-egyenlet: `nλ = 2d·sin θ`).',
        example: 'Réz, fcc, a = 361,5 pm, M = 63,55 g/mol: `ρ = 4·63,55/(6,022·10²³·(3,615·10⁻⁸ cm)³) ≈ 8,93 g/cm³` – egyezik a mért értékkel. NaCl-rács: két egymásba tolt fcc rács, mindkét ion koordinációs száma 6; CsCl-ban 8 : 8.',
        pitfall: 'A NaCl-kristályban **nincsenek** NaCl-molekulák: a képlet csak az ionok arányát adja meg (képletegység). Az amorf anyagok (üveg, sok műanyag) nem kristályosak: nincs hosszútávú rendjük és éles olvadáspontjuk, hanem egy tartományban lágyulnak.',
        related: ['racsenergia', 'femes-kotes', 'intermolekularis', 'fazisdiagram'] },
      { id: 'racsenergia', term: 'Ionos kötés és rácsenergia (Born–Haber-körfolyamat)', en: 'ionic bonding; lattice energy; Born–Haber cycle', topic: 'kotes',
        short: 'A rácsenergia az az energia, amely akkor szabadul fel, amikor gázhalmazállapotú ionokból egy mól ionkristály képződik (vagy ellentétes előjellel: amely a kristály szétbontásához kell). Közvetlenül nem mérhető, a Born–Haber-körfolyamatból, a Hess-tétellel számítjuk.',
        prereq: ['kemia-bsc/ionizacios-energia', 'kemia-bsc/hess-tetel'],
        formulas: ['hess-f'],
        text: 'Ionos kötés nagy elektronegativitás-különbségű atomok (tipikusan fém és nemfém) között alakul ki. Önmagában az elektronátadás **energiaigényes**: a Na ionizációja +496 kJ/mol, a Cl elektronfelvétele csak −349 kJ/mol. A vegyület azért stabil, mert az ellentétes töltésű ionok kristályrácsba rendeződése hatalmas energiát szabadít fel – ez a **rácsenergia**.\n\nA **Born–Haber-körfolyamat** a képződéshőt lépésekre bontja (Hess-tétel):\n\n1. a fém szublimációja: Na(s) → Na(g);\n2. ionizáció: Na(g) → Na⁺(g) + e⁻;\n3. a nemfém disszociációja: ½ Cl₂ → Cl(g);\n4. elektronfelvétel: Cl(g) + e⁻ → Cl⁻(g);\n5. rácsképződés: Na⁺(g) + Cl⁻(g) → NaCl(s).\n\nA lépések összege a mérhető képződéshő, így az egyetlen ismeretlen, a rácsenergia kiszámítható.\n\nA rácsenergia nagyságát elsősorban a **Coulomb-törvény** szabja meg: `|U| ∝ z₊·z₋/(r₊ + r₋)`. Nagyobb töltés és kisebb ionok → nagyobb rácsenergia → magasabb olvadáspont, keményebb kristály, gyakran rosszabb oldhatóság. Az oldhatóság a rácsenergia és az ionok **hidratációs energiája** versengésén múlik.\n\nA rácsenergia elméleti becslésére a **Born–Landé-egyenlet** szolgál, amely a Coulomb-vonzás mellett az elektronfelhők közeli taszítását is figyelembe veszi; a számított és a Born–Haber-körfolyamatból kapott érték eltérése a kötés kovalens jellegére utal.',
        example: 'NaCl: Δ_fH° = −411, szublimáció +107, ionizáció +496, ½ D(Cl–Cl) +122, elektronaffinitás −349 kJ/mol. `−411 = 107 + 496 + 122 − 349 + U` → `U ≈ −787 kJ/mol`. A MgO (2+ és 2− ion) rácsenergiája ≈ −3800 kJ/mol, kb. ötszörös: olvadáspontja 2852 °C, szemben a NaCl 801 °C-ával.',
        pitfall: 'A rácsenergia előjele a definíciótól függ: egyes könyvek a képződésre (negatív), mások a szétbontásra (pozitív) adják meg – mindig nézd meg, melyik irányról van szó. Az „ionos” és „kovalens” kötés között folytonos az átmenet; az AgCl vagy az AlCl₃ már jelentős kovalens jellegű.',
        related: ['kristalyracs', 'ionizacios-energia', 'elektronegativitas', 'hess-tetel', 'oldhatosagi-szorzat'] },
      { id: 'femes-kotes', term: 'Fémes kötés és sávelmélet', en: 'metallic bonding; band theory', topic: 'kotes',
        short: 'A fémekben a vegyértékelektronok nem egy-egy atomhoz kötöttek, hanem az egész kristályban delokalizálódnak. A molekulapálya-elmélet szerint a rengeteg atom pályái energiasávokat alkotnak; a sávok betöltöttsége dönti el, hogy az anyag vezető, félvezető vagy szigetelő.',
        prereq: ['kemia-bsc/molekulapalya', 'elektronika/pn-atmenet'],
        text: 'Az egyszerű kép az **elektrongáz-modell**: pozitív atomtörzsek rácsa, amelyet a közös, szabadon mozgó elektronok „tengere” tart össze. Ez magyarázza a fémek jó **elektromos és hővezetését**, **fémes fényét** (a szabad elektronok a látható fény szinte minden hullámhosszát visszaverik) és **megmunkálhatóságát**: a rétegek elcsúszhatnak egymáson anélkül, hogy a kötés megszakadna.\n\nA **sávelmélet** a molekulapálya-elmélet kiterjesztése. N atom N darab atompályájából N molekulapálya lesz; makroszkopikus kristályban (N ≈ 10²³) ezek olyan sűrűn helyezkednek el, hogy folytonos **sávot** alkotnak.\n\n- **Vegyértéksáv**: a legfelső, elektronokkal betöltött sáv.\n- **Vezetési sáv**: a felette lévő, üres vagy részben betöltött sáv.\n- **Tiltott sáv** (sávrés, E_g): a kettő közti energiatartomány.\n\nOsztályozás:\n\n- **fém**: részben betöltött sáv vagy átfedő sávok – az elektronok csekély energiával szabad állapotba juthatnak;\n- **félvezető**: kis sávrés (Si ≈ 1,1 eV, Ge ≈ 0,67 eV) – hőmérséklettel nő a vezetés; adalékolással szabályozható;\n- **szigetelő**: nagy sávrés (gyémánt ≈ 5,5 eV).\n\nA fémek ellenállása a hőmérséklettel **nő** (a rácsrezgések szórják az elektronokat), a félvezetőké **csökken** (több töltéshordozó jut át a sávrésen).',
        example: 'A Na 3s-sávja félig betöltött (atomonként 1 elektron, 2 hely) – kiváló vezető. A Mg 3s-sávja betelne, de átfed az üres 3p-sávval, ezért szintén fém. A Si sávrése 1,1 eV, ami kb. 1100 nm-es fotonnak felel meg: a szilícium napelem ezért a látható fényt és a közeli infravöröset is hasznosítja.',
        pitfall: 'A „szabad elektronok” nem hagyják el a fémet: csak a kristályon belül delokalizáltak. A fémes kötés nem irányított, ellentétben a kovalens kötéssel – ezért alakíthatók a fémek, és ezért nem írható fel rájuk „molekula”.',
        related: ['kristalyracs', 'molekulapalya', 'racsenergia', 'elektronegativitas', 'korrozio'] },
      { id: 'komplex', term: 'Koordinációs vegyületek (komplexek)', en: 'coordination compounds; ligands; chelate effect', topic: 'kotes',
        short: 'A komplexben egy központi fématomhoz vagy -ionhoz ligandumok kapcsolódnak datív (koordinatív) kötéssel: a ligandum nemkötő elektronpárt ad, a fém üres pályát. Lewis-sav–bázis kölcsönhatás.',
        prereq: ['kemia-bsc/elektronkonfiguracio', 'kemia-bsc/egyensulyi-allando'],
        text: 'Alapfogalmak (Werner Alfréd elmélete, 1893):\n\n- **központi atom**: többnyire átmenetifém-ion (Fe²⁺, Cu²⁺, Co³⁺, Pt²⁺), Lewis-sav;\n- **ligandum**: elektronpár-donor (H₂O, NH₃, Cl⁻, CN⁻, CO), Lewis-bázis;\n- **koordinációs szám**: a fémhez kötött donoratomok száma – 6 (oktaéderes), 4 (tetraéderes vagy síknégyzetes), 2 (lineáris) a leggyakoribb;\n- **fogszám**: hány donoratommal kapcsolódik egy ligandum. Az etilén-diamin (en) kétfogú, az EDTA hatfogú.\n\nA többfogú ligandumok gyűrűt képeznek a fémmel (**kelát**, „rákolló”). A **kelát-effektus**: a kelátkomplexek sokkal stabilabbak, mint a megfelelő egyfogú ligandumokkal képzettek, főleg **entrópia**okokból – egy kelátligandum több vízmolekulát szabadít fel.\n\nA komplexképződés **lépcsőzetes egyensúly**; a teljes **stabilitási állandó** (β) a K_f értékek szorzata. Nagy β mellett a szabad fémion-koncentráció rendkívül kicsi lesz.\n\nNevezéktan: először a ligandumok ábécérendben, számnévvel (di-, tri-, tetra-), majd a fém, zárójelben az oxidációs számmal; anionos komplexnél „-át” végződés: K₄[Fe(CN)₆] kálium-hexaciano-ferrát(II).\n\nIzoméria: síknégyzetes [PtCl₂(NH₃)₂] cisz- és transz-formában létezik – a **cisz** forma (ciszplatin) daganatellenes gyógyszer, a transz hatástalan.\n\nJelentőség: hemoglobin (Fe²⁺–porfirin), klorofill (Mg²⁺), B₁₂-vitamin (Co), vízlágyítás és komplexometria (EDTA), fémek extrakciója (arany cianidos kioldása), homogén katalízis.',
        example: 'Vízkeménység mérése: 100,0 cm³ csapvíz titrálására 12,0 cm³ 0,0100 mol/dm³ EDTA fogy (EDTA : Ca²⁺ = 1 : 1). `n(Ca²⁺) = 1,20·10⁻⁴ mol` → `1,20·10⁻³ mol/dm³`, azaz kb. 120 mg CaCO₃/dm³. A Cu²⁺-oldat ammóniával mélykék [Cu(NH₃)₄]²⁺-t ad, lg β₄ ≈ 13.',
        pitfall: 'Az oxidációs szám a központi ionra vonatkozik, nem a komplex töltésére: [Fe(CN)₆]⁴⁻-ben a vas +2, mert a hat cianid −6-ot ad. A koordinációs szám nem mindig egyenlő a ligandumok számával (kelátoknál nagyobb).',
        related: ['kristalyter', 'sav-bazis-elmeletek', 'egyensulyi-allando', 'elektronkonfiguracio', 'oldhatosagi-szorzat'] },
      { id: 'kristalyter', term: 'Kristálytér-elmélet (komplexek színe és mágnessége)', en: 'crystal field theory; ligand field splitting', topic: 'kotes',
        short: 'A kristálytér-elmélet szerint a ligandumok elektromos tere felhasítja a központi ion öt, eredetileg egyenértékű d-pályáját két energiaszintre. A felhasadás (Δ) nagysága szabja meg a komplex színét és azt, hogy hány párosítatlan elektronja van.',
        prereq: ['kemia-bsc/atompalya', 'kemia-bsc/pauli-hund'],
        text: '**Oktaéderes** komplexben a hat ligandum a koordinátatengelyek mentén közelít. A tengelyek felé mutató d_z² és d_x²−y² pályák (**e_g**) jobban taszítódnak, energiájuk nő; a tengelyek közé mutató d_xy, d_xz, d_yz pályák (**t₂g**) energiája csökken. A két szint különbsége az oktaéderes felhasadás, **Δ_o**. Tetraéderes komplexben a sorrend fordított, és a felhasadás kisebb (Δ_t ≈ 4/9 Δ_o).\n\n**Spektrokémiai sor** (növekvő Δ): I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < NO₂⁻ < CN⁻ < CO. Gyenge terű ligandumok bal oldalt, erős terűek jobb oldalt.\n\n**Nagy és kis spinszám** (d⁴–d⁷ ionoknál): ha Δ_o kisebb a párosítási energiánál, az elektronok előbb az e_g pályákra is egyesével kerülnek (**nagy spinszámú**, sok párosítatlan elektron, paramágneses); ha Δ_o nagy, előbb a t₂g pályák telnek be párosan (**kis spinszámú**).\n\n**Szín**: a komplex elnyeli azt a fényt, amelynek fotonenergiája megegyezik Δ-val (d–d átmenet), és a **kiegészítő színt** látjuk. Erősebb ligandum → nagyobb Δ → rövidebb hullámhosszú elnyelés. d⁰ és d¹⁰ ionok (Zn²⁺, Sc³⁺) komplexei ezért többnyire színtelenek.\n\nA modell tisztán elektrosztatikus; a **ligandumtér-elmélet** a molekulapálya-elmélettel finomítja (π-donor és π-akceptor ligandumok).',
        example: '[Ti(H₂O)₆]³⁺ (d¹) kb. 500 nm-en (zöld) nyel el, ezért lila. `Δ_o = h·c·N_A/λ ≈ 6,626·10⁻³⁴·3,00·10⁸·6,022·10²³/(500·10⁻⁹) ≈ 239 kJ/mol`. [Fe(H₂O)₆]²⁺ nagy spinszámú (4 párosítatlan elektron, paramágneses), [Fe(CN)₆]⁴⁻ kis spinszámú (0 párosítatlan, diamágneses).',
        pitfall: 'A látott szín **nem** az elnyelt szín, hanem a kiegészítője: a kék rézkomplexek a vörös-narancs fényt nyelik el. A spektrokémiai sor nem az elektrosztatikus töltés sorrendje: a semleges CO és a CN⁻ a legerősebb ligandum, mert π-akceptorok.',
        related: ['komplex', 'pauli-hund', 'atompalya', 'spektroszkopia', 'molekulapalya'] },
      /* ----- Oldatok (kiegészítés) ----- */
      { id: 'kolligativ', term: 'Kolligatív sajátságok (Raoult-törvény)', en: 'colligative properties; Raoult\u2019s law', topic: 'oldat',
        short: 'Kolligatív az a sajátság, amely csak az oldott részecskék számától függ, a minőségüktől nem: a gőznyomáscsökkenés, a forráspont-emelkedés, a fagyáspontcsökkenés és az ozmózisnyomás.',
        prereq: ['kemia-bsc/entropia', 'lecke:kemia/anyagmennyiseg'],
        formulas: ['kolligativ-f', 'clapeyron-f'],
        text: '**Raoult-törvény**: nem illékony anyag híg oldatában az oldószer gőznyomása arányos az oldószer móltörtjével: `p = x_oldószer·p*`. A gőznyomás relatív csökkenése tehát az oldott anyag móltörtjével egyenlő: `Δp/p* = x_oldott`.\n\nMiért? Termodinamikailag: az oldott anyag **növeli az oldat entrópiáját**, ezzel csökkenti az oldószer kémiai potenciálját a folyadékfázisban. Ezért\n\n- a gőzzel csak magasabb hőmérsékleten tart egyensúlyt → **forráspont-emelkedés**;\n- a (tiszta oldószerből álló) szilárd fázissal csak alacsonyabb hőmérsékleten → **fagyáspontcsökkenés**;\n- a tiszta oldószer a féligáteresztő hártyán át az oldatba áramlik → **ozmózis**.\n\nMindhárom hatás a fázisdiagramon is látszik: az oldat gőznyomásgörbéje lejjebb tolódik.\n\nElektrolitoknál az ionokra disszociáció megsokszorozza a részecskeszámot: ezt a **van \'t Hoff-tényező** (i) veszi figyelembe. A fagyáspontcsökkenés mérése (**krioszkópia**) régi, egyszerű módszer moláris tömeg meghatározására; a fagyáspontcsökkenés nagyobb, mint a forráspont-emelkedés, ezért pontosabb.\n\nIlleékony komponensekből álló **ideális elegyben** mindkét komponensre érvényes a Raoult-törvény; az ettől való eltérés (pozitív vagy negatív) okozza az azeotrópokat (pl. etanol–víz, kb. 95,6 tömeg% etanol).',
        example: 'Útsózás: 1 kg vízben 58,4 g NaCl (1 mol) ideálisan `ΔT = 2·1,86·1 = 3,7 K` fagyáspontcsökkenést okoz. Ismeretlen anyag 2,00 g-ja 100 g vízben −0,207 °C-on fagy: `b = 0,207/1,86 ≈ 0,111 mol/kg`, `n = 0,0111 mol`, `M = 2,00/0,0111 ≈ 180 g/mol` (glükóz).',
        pitfall: 'A képletekben **molalitás** (mol/kg oldószer) szerepel, nem molaritás (mol/dm³ oldat) – híg vizes oldatnál a kettő közel azonos, töményebbnél nem. Az i tényező valódi értéke ionpárképződés miatt kisebb az ideálisnál (0,1 mol/kg NaCl-ra ≈ 1,9). Az összefüggések csak híg oldatokra pontosak.',
        related: ['ozmozis', 'fazisdiagram', 'entropia', 'idealis-gaz-kem'] },
      { id: 'ozmozis', term: 'Ozmózis és ozmózisnyomás', en: 'osmosis; osmotic pressure; tonicity', topic: 'oldat',
        short: 'Ozmózis az oldószer spontán áramlása féligáteresztő hártyán át a hígabb oldatból a töményebb felé. Az ozmózisnyomás az a nyomás, amely ezt az áramlást éppen megállítja; híg oldatban Π = i·c·R·T.',
        prereq: ['lecke:biologia/sejt', 'modell:sejt'],
        formulas: ['ozmozis-f'],
        text: 'A **féligáteresztő hártya** az oldószer (víz) molekuláit átengedi, az oldott részecskéket nem. A víz kémiai potenciálja az oldatban kisebb, mint a tiszta vízben (entrópiahatás), ezért a víz nettó áramlása az oldat felé irányul, amíg a hidrosztatikai nyomáskülönbség ezt ki nem egyenlíti.\n\nAz ozmózisnyomás meglepően nagy: 1 mol/dm³ cukoroldat esetén 25 °C-on kb. 24,8 bar – mintha 250 m magas vízoszlop nyomna. Ezért az **ozmometria** érzékeny módszer nagy molekulák (fehérjék, polimerek) moláris tömegének mérésére: ott a fagyáspontcsökkenés már mérhetetlenül kicsi lenne.\n\n**Tonicitás** sejtekre:\n\n- **izotóniás** oldat: ugyanakkora ozmotikus koncentráció, mint a sejt belsejéé (0,9% NaCl, 5% glükóz) – a sejt térfogata nem változik;\n- **hipotóniás**: víz áramlik a sejtbe, a vörösvértest megduzzad, kipukkadhat (hemolízis);\n- **hipertóniás**: víz áramlik ki, a sejt zsugorodik (plazmolízis növényeknél).\n\n**Fordított ozmózis**: ha az oldatra az ozmózisnyomásnál nagyobb nyomást gyakorolunk, a víz a hártyán át a tiszta oldat felé préselődik – ez a tengervíz-sótalanítás és sok víztisztító alapja.\n\nÉlettani példák: a kapillárisokban a plazmafehérjék **onkotikus** (kolloidozmotikus) nyomása tartja vissza a vizet az érpályában; a vese velőállománya hipertóniás közeget hoz létre a vizelet koncentrálásához.',
        example: 'Tengervíz kb. 1,1 osmol/dm³ (főleg NaCl, kb. 35 g/kg): `Π ≈ 1100·8,314·298 ≈ 2,7·10⁶ Pa ≈ 27 bar` – a fordított ozmózisos sótalanításhoz ennél jóval nagyobb, jellemzően 50–80 bar nyomás kell. 1,00 g fehérje 100 cm³ oldatban 25 °C-on 186 Pa ozmózisnyomást ad: `c = 186/(8,314·298) ≈ 0,0751 mol/m³`, `M = 10 g/dm³ / 7,51·10⁻⁵ mol/dm³ ≈ 133 000 g/mol`.',
        pitfall: 'Az ozmózisban a **víz** mozog, nem az oldott anyag (az a diffúzió). A sejtekre a **hatásos** ozmolaritás számít: a membránon szabadon átjutó anyagok (pl. karbamid) nem tartanak vizet, ezért az izoozmotikus karbamidoldat sem izotóniás.',
        related: ['kolligativ', 'idealis-gaz-kem', 'entropia'] },
      { id: 'sav-bazis-elmeletek', term: 'Sav–bázis elméletek (Arrhenius, Brønsted–Lowry, Lewis)', en: 'acid–base theories: Arrhenius, Brønsted–Lowry, Lewis', topic: 'oldat',
        short: 'Arrhenius szerint a sav vízben H⁺-t, a bázis OH⁻-t ad; Brønsted és Lowry szerint a sav protondonor, a bázis protonakceptor; Lewis szerint a sav elektronpár-akceptor, a bázis elektronpár-donor. Mindegyik a megelőzőt általánosítja.',
        prereq: ['lecke:kemia/savak-bazisok'],
        text: '**Arrhenius** (1887): sav, ami vizes oldatban hidrogéniont, bázis, ami hidroxidiont ad. Egyszerű, de csak vízre érvényes, és nem magyarázza például az ammónia lúgosságát.\n\n**Brønsted–Lowry** (1923): a sav–bázis reakció **protonátadás**. Minden savhoz tartozik egy **konjugált bázis** (amivé a proton leadása után válik), és fordítva:\n\n`HA + B ⇌ A⁻ + HB⁺`\n\nAz egyensúly a **gyengébb sav és gyengébb bázis** irányába tolódik. **Amfoter** anyag mindkét szerepre képes (H₂O, HCO₃⁻, aminosavak). A víz önionizációja (autoprotolízise) is sav–bázis reakció.\n\n**Lewis** (1923): sav az **elektronpár-akceptor**, bázis az **elektronpár-donor**; a reakció eredménye datív kötés (adduktum). Ez protont nem tartalmazó savakra is kiterjed: BF₃, AlCl₃ (Friedel–Crafts-katalizátor), fémionok a komplexekben. Minden Brønsted-bázis egyben Lewis-bázis is.\n\n**Fémionok savassága**: a hidratált kis, nagy töltésű kationok (Al³⁺, Fe³⁺) polarizálják a vízligandumot, amely protont ad le: `[Al(H₂O)₆]³⁺ + H₂O ⇌ [Al(H₂O)₅(OH)]²⁺ + H₃O⁺` (pKₐ ≈ 5). Ezért savas az alumínium- és vas(III)-sók oldata.\n\n**HSAB-elv** (Pearson): a „kemény” (kicsi, nem polarizálható) savak a kemény bázisokkal (F⁻, O-donorok), a „lágy” (nagy, polarizálható) savak a lágy bázisokkal (I⁻, S-donorok) képeznek stabilabb kapcsolatot – ezért fordul elő a higany és az ólom szulfidércként, az alumínium oxidként.',
        example: 'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻: Brønsted szerint a víz a sav, az ammónia a bázis; a konjugált párok NH₄⁺/NH₃ és H₂O/OH⁻. Lewis-reakció proton nélkül: `BF₃ + :NH₃ → F₃B←NH₃`. Al₂(SO₄)₃-oldat pH-ja ezért 3–4 körüli.',
        pitfall: 'A „H⁺” vizes oldatban szabadon nem létezik, mindig hidratált (H₃O⁺ és nagyobb klaszterek). A sav erőssége oldószerfüggő: vízben a HCl és a HClO₄ egyaránt teljesen disszociál (kiegyenlítő hatás), jégecetben már megkülönböztethetők.',
        related: ['ph', 'pka', 'puffer', 'komplex', 'redoxi'] },
      { id: 'korrozio', term: 'Korrózió és korrózióvédelem', en: 'corrosion; corrosion protection', topic: 'oldat',
        short: 'A korrózió a fémek környezetükkel lejátszódó, nem kívánt (többnyire elektrokémiai) oxidációja. A fém felületén helyi galvánelemek jönnek létre: az anódos részen a fém oldódik, a katódos részen oxigén vagy hidrogénion redukálódik.',
        prereq: ['kemia-bsc/galvanelem', 'kemia-bsc/elektrodpotencial'],
        text: 'A vas rozsdásodása nedves levegőn:\n\n- **anód**: `Fe → Fe²⁺ + 2 e⁻`;\n- **katód** (ahol az oxigén hozzáfér, például a vízcsepp szélén): `O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻`;\n- a Fe²⁺ tovább oxidálódik, és hidratált vas(III)-oxid (**rozsda**, Fe₂O₃·xH₂O) válik ki.\n\nAz elektrolit (víz, különösen sós víz) zárja az áramkört, ezért a sózott utak mentén és tengerparton gyorsabb a korrózió. **Galvánkorrózió**: két különböző fém érintkezésénél a kevésbé nemes fém lesz az anód, és gyorsan oldódik (például rézcső acélszerelvénnyel).\n\n**Passziválódás**: egyes fémeken vékony, tömör, jól tapadó oxidréteg képződik, amely megvédi a fémet (Al, Cr, Ti). A rozsdamentes acél legalább kb. 10,5% krómot tartalmaz, amely ilyen réteget alakít ki. A rozsda ezzel szemben laza, porózus, nem véd.\n\n**Védekezés**:\n\n- **bevonat**: festék, műanyag, zománc – elszigetel az elektrolittól;\n- **horganyzás** (cinkbevonat): a cink negatívabb potenciálú, ezért sérülés esetén is ő oldódik a vas helyett (**áldozati anód**);\n- **ónozás** (konzervdoboz): az ón nemesebb, csak ép bevonatként véd – sérüléskor a vas korróziója még gyorsul is;\n- **katódos védelem**: a védendő szerkezetet (hajótest, csővezeték) áldozati Mg- vagy Zn-anóddal vagy külső áramforrással katóddá tesszük;\n- **inhibitorok**, az oxigén és a nedvesség kizárása, ötvözés.',
        example: 'Egy csővezeték katódos védelméhez állandóan 1,0 A áram kell. Ennyi töltés egy év alatt: `Q = 1,0·3,156·10⁷ ≈ 3,16·10⁷ C`, ami cinkanódból `n = Q/(2F) ≈ 164 mol`, azaz kb. **10,7 kg** cinket fogyaszt el (Faraday-törvény) – ezért az áldozati anódokat időnként cserélni kell.',
        pitfall: 'Az alumínium nem azért nem korrodál, mert „nemes fém” – éppen nagyon negatív a standard potenciálja (−1,66 V) –, hanem mert passziválódik. Sérült ónbevonat esetén a vas gyorsabban rozsdásodik, mint bevonat nélkül, mert az ón katódként működik.',
        related: ['galvanelem', 'elektrodpotencial', 'redoxi', 'elektrolizis', 'femes-kotes'],
        models: ['akkucella'] },
      /* ----- Spektroszkópia és magkémia ----- */
      { id: 'spektroszkopia', term: 'A spektroszkópia alapjai (atom- és molekulaszínképek)', en: 'spectroscopy fundamentals; atomic and molecular spectra', topic: 'spektro',
        short: 'A spektroszkópia az anyag és az elektromágneses sugárzás kölcsönhatását vizsgálja. Mivel az energiaszintek kvantáltak, egy atom vagy molekula csak meghatározott energiájú (frekvenciájú) fotonokat nyel el vagy bocsát ki; a színkép így az anyag „ujjlenyomata”.',
        prereq: ['fizika-bsc/fotoeffektus', 'kemia-bsc/kvantumszamok', 'lecke:fizika/hullamok-feny'],
        formulas: ['rydberg-f'],
        text: 'Alapösszefüggés (Bohr-feltétel): `ΔE = h·ν = h·c/λ = h·c·ν̃`, ahol h = 6,626·10⁻³⁴ J·s a Planck-állandó, ν̃ = 1/λ a hullámszám.\n\nAz elektromágneses spektrum tartományai és a hozzájuk tartozó átmenetek:\n\n- **röntgen**: belső elektronhéjak (elemanalízis, kristályszerkezet);\n- **UV–látható**: vegyértékelektronok átmenetei (színes anyagok, konjugált rendszerek, komplexek);\n- **infravörös (IR)**: molekularezgések (funkciós csoportok azonosítása);\n- **mikrohullám**: molekulaforgások;\n- **rádióhullám** mágneses térben: magspin-átmenetek (NMR).\n\n**Atomszínképek** vonalasak: a szabad atom elektronszintjei élesen meghatározottak. **Emissziós** színképben gerjesztett atomok (láng, ív, plazma) fényt bocsátanak ki; **abszorpciós** színképben a folytonos fényből ugyanazok a hullámhosszak hiányoznak (a Nap színképének Fraunhofer-vonalai). Ezen alapul a lángfestés, az atomabszorpciós (AAS) és az ICP-emissziós elemanalízis.\n\n**Molekulaszínképek** sávosak, mert az elektronátmenetekre rezgési és forgási átmenetek is rárakódnak; oldatban a sávok tovább szélesednek.\n\nKiválasztási szabályok döntik el, mely átmenetek „megengedettek” (erős vonalak), és melyek „tiltottak” (gyengék). A színképvonal intenzitása a mennyiséggel arányos – ez teszi lehetővé a mennyiségi analízist (Lambert–Beer-törvény). A spektroszkópiai módszerek többsége roncsolásmentes, kevés mintát igényel, és távoli objektumokra (csillagok, légkör) is alkalmazható.',
        example: 'A nátrium sárga lángfestése 589 nm: `ΔE = 6,626·10⁻³⁴·3,00·10⁸/(589·10⁻⁹) ≈ 3,37·10⁻¹⁹ J ≈ 2,1 eV`. Moláris értékben ez `3,37·10⁻¹⁹·6,022·10²³ ≈ 203 kJ/mol` – kémiai kötési energiák nagyságrendje, ezért képes az UV–látható fény kötéseket gerjeszteni vagy felbontani.',
        pitfall: 'A kibocsátott fény hullámhossza a **két szint különbségétől** függ, nem az egyik szint energiájától. A nagyobb hullámhossz **kisebb** energiát jelent: az infravörös foton gyengébb, mint az ultraibolya.',
        related: ['lambert-beer', 'kvantumszamok', 'atompalya', 'kristalyter', 'ionizacios-energia'] },
      { id: 'lambert-beer', term: 'Fotometria és a Lambert–Beer-törvény', en: 'photometry; Beer–Lambert law; absorbance', topic: 'spektro',
        short: 'Egy oldat fényelnyelése (abszorbanciája) adott hullámhosszon egyenesen arányos az elnyelő anyag koncentrációjával és a fény úthosszával: A = ε·l·c. Ezen alapul a koncentráció fotometriás mérése.',
        prereq: ['lecke:fizika/hullamok-feny'],
        formulas: ['lambert-beer-f'],
        text: 'A **spektrofotométer** részei: fényforrás, monokromátor (rács vagy prizma, ez választja ki a hullámhosszt), küvetta a mintával, detektor. A műszer a mintán áthaladt (I) és a vakmintán (csak oldószer) áthaladt fény (I₀) arányát méri.\n\n- **Transzmittancia**: `T = I/I₀` (0–1, vagy %).\n- **Abszorbancia**: `A = −lg T`.\n\nA törvény levezetése: egy dx vastag réteg a ráeső intenzitás állandó hányadát nyeli el, `dI = −k·c·I·dx`, ebből integrálva exponenciális csökkenés, logaritmusa lineáris.\n\n**Mérési menet**: a legnagyobb elnyelés hullámhosszán (λ_max) mérünk, mert ott a legnagyobb az érzékenység és a legkisebb a hullámhossz-hiba hatása. Ismert koncentrációjú oldatokkal **kalibrációs egyenest** veszünk fel, és ebből olvassuk le az ismeretlen koncentrációt. Színtelen anyagot gyakran színes származékká alakítanak (például a foszfátot molibdénkékké).\n\nTöbb komponens esetén az abszorbanciák **összeadódnak**, így két hullámhosszon mérve két anyag egyszerre is meghatározható.\n\n**Eltérések** a linearitástól: nagy koncentrációnál (kölcsönhatások, törésmutató-változás), kémiai egyensúlyok (disszociáció, dimerizáció a hígítással változik), szórt fény, nem monokromatikus fény, zavaros minta.\n\nAlkalmazások: klinikai labor (vércukor, hemoglobin, enzimaktivitás NADH-val 340 nm-en), vízanalitika, DNS-koncentráció (260 nm), a reakciókinetikában a koncentráció időbeli követése.',
        example: 'Kalibráció: 2,0; 4,0; 6,0 mg/dm³ standardok abszorbanciája 0,150; 0,300; 0,450 (meredekség 0,075 dm³/mg). Az ismeretlen minta A = 0,264 → `c = 0,264/0,075 ≈ 3,5 mg/dm³`. Kétszer vastagabb küvettában ugyanez A = 0,528 lenne.',
        pitfall: 'A **transzmittancia** nem lineáris a koncentrációval, csak az abszorbancia: kétszeres koncentráció nem felezi az áteresztett fényt, hanem négyzetre emeli T-t (50% → 25%). A = 2 fölött a detektorra már csak a fény 1%-a jut, a mérés pontatlan – hígítani kell.',
        related: ['spektroszkopia', 'sebessegi-egyenlet', 'kristalyter'] },
      { id: 'radiokemia', term: 'Radioaktív izotópok a kémiában (radiokémia)', en: 'radiochemistry; radioisotopes; radiometric dating', topic: 'spektro',
        short: 'A radioaktív izotópok atommagja spontán átalakul (α-, β-, γ-bomlás), miközben kémiai viselkedésük megegyezik a stabil izotópokéval. Ezért nyomjelzőként, kormeghatározásra, orvosi diagnosztikára és terápiára használhatók.',
        prereq: ['fizika-bsc/radioaktiv-bomlas', 'lecke:fizika/atom', 'modell:atom'],
        formulas: ['bomlas-f'],
        text: 'Bomlásfajták és hatásuk a rendszámra (Z) és tömegszámra (A):\n\n- **α-bomlás**: ⁴He-mag kilépése, Z − 2, A − 4 (nehéz magok, pl. ²³⁸U, ²²⁶Ra);\n- **β⁻-bomlás**: egy neutron protonná alakul, elektron (és antineutrínó) távozik, Z + 1 (neutronfelesleges magok, pl. ¹⁴C, ¹³¹I);\n- **β⁺-bomlás** és **elektronbefogás**: egy proton neutronná alakul, Z − 1 (protonfelesleges magok, pl. ¹⁸F);\n- **γ-sugárzás**: gerjesztett mag energialeadása, Z és A nem változik (pl. ⁹⁹ᵐTc).\n\nA magstabilitást a neutron/proton arány szabja meg; a stabil magok egy „stabilitási sávban” vannak (könnyű elemeknél n/p ≈ 1, nehezeknél ≈ 1,5).\n\nA bomlás **elsőrendű kinetikát** követ, felezési ideje a kémiai kötésektől gyakorlatilag független – ezért megbízható „óra”.\n\nKémiai alkalmazások:\n\n- **nyomjelzés**: egy atom útja követhető egy reakcióban vagy anyagcsere-folyamatban (például ¹⁴C-gyel a fotoszintézis útjának feltárása; a stabil ¹⁸O izotóppal az észterképződés mechanizmusa);\n- **kormeghatározás**: ¹⁴C (szerves anyag, kb. 50 000 évig), U–Pb, K–Ar (kőzetek, milliárd évek);\n- **orvosi izotópok**: ¹⁸F-FDG a PET-vizsgálatban (t½ ≈ 110 perc), ⁹⁹ᵐTc a szcintigráfiában (t½ ≈ 6 óra), ¹³¹I a pajzsmirigy kezelésében (t½ ≈ 8 nap);\n- **aktivációs analízis**: nyomnyi elemek kimutatása neutronbesugárzással.\n\nA **radiokarbon-módszer** elve: a légkörben a kozmikus sugárzás folyamatosan ¹⁴C-et termel, az élőlények ezt felveszik, így a ¹⁴C/¹²C arány bennük állandó. Halál után a felvétel megszűnik, a ¹⁴C 5730 éves felezési idővel bomlik.',
        example: 'Az ²³⁸U → ²⁰⁶Pb bomlási sor: a tömegszám 32-vel csökken → 8 α-bomlás (Z: −16), a rendszám viszont csak 92 − 82 = 10-zel, tehát 6 β⁻-bomlás is van. ¹³¹I (t½ = 8,0 nap) 24 nap után az eredeti aktivitás `(1/2)³ = 1/8`-a marad.',
        pitfall: 'A felezési idő **nem** a teljes élettartam fele: két felezési idő után nem fogy el az anyag, hanem negyede marad. A radioaktív izotóp nem „más elem”: kémiailag ugyanúgy reagál, ezért épül be például a radioaktív jód is a pajzsmirigybe – erre épül a jódtabletta (stabil jóddal telítés) védő hatása is.',
        related: ['spektroszkopia', 'sebessegi-egyenlet', 'kvantumszamok'] }
    ]
  });
})();
