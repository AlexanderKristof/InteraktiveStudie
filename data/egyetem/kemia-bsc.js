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
      { id: 'oldat', title: 'Oldatok és elektrokémia' }
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
        models: ['akkucella'] }
    ]
  });
})();
