/* Modell: a növényi levél és a fotoszintézis – egy kétszikű lomblevél keresztmetszete
 * (a levél felső oldala fent), nagyításokkal: zöld színtest (kloroplasztisz), klorofill-molekula,
 * egy levélsejt a sejtfallal és a vakuólummal. Sematikus, nem méretarányos. */
(function () {
  var NS = ' pointer-events="none"';
  var INK = '#1b2230';
  var X0 = 122, X1 = 528;
  function f(n) { return (+n).toFixed(1); }
  function rnd(i) { var x = Math.sin(i * 12.9898 + 3.7) * 43758.5453; return x - Math.floor(x); }
  function txt(x, y, s, cls, extra) { return '<text class="' + cls + '" x="' + x + '" y="' + y + '"' + (extra || '') + NS + '>' + s + '</text>'; }
  /* sötét felirat világos „glóriával”: színes rajz fölött is olvasható, mindkét témában */
  function dl(x, y, s, size, extra) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" fill="' + INK + '" stroke="rgba(255,255,255,.85)" stroke-width="2.6" paint-order="stroke" stroke-linejoin="round" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif"' + (extra || '') + NS + '>' + s + '</text>';
  }
  function lead(x1, y1, x2, y2) { return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" stroke="#7f8db0" stroke-width="1" fill="none"' + NS + '/>'; }
  function box(x, y, w, h) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="rgba(127,141,176,.10)" stroke="#7f8db0" stroke-width="1.2"/>'; }
  function arrow(x1, y1, x2, y2, col, w) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7;
    return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' M' + f(x2 - h * Math.cos(a - 0.5)) + ' ' + f(y2 - h * Math.sin(a - 0.5)) +
      ' L' + x2 + ' ' + y2 + ' L' + f(x2 - h * Math.cos(a + 0.5)) + ' ' + f(y2 - h * Math.sin(a + 0.5)) +
      '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2.2) + '" stroke-linecap="round" stroke-linejoin="round"' + NS + '/>';
  }
  function chl(x, y, rx, ry, rot) {
    return '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + rx + '" ry="' + ry + '"' + (rot ? ' transform="rotate(' + f(rot) + ' ' + f(x) + ' ' + f(y) + ')"' : '') + ' fill="#2f8f3c" stroke="#174f1f" stroke-width=".7"/>';
  }

  var defs = '<defs>' +
    '<linearGradient id="lv-cut" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8e08a"/><stop offset="1" stop-color="#e2b93c"/></linearGradient>' +
    '<linearGradient id="lv-pal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7cc466"/><stop offset=".5" stop-color="#9ad683"/><stop offset="1" stop-color="#7cc466"/></linearGradient>' +
    '<radialGradient id="lv-spo" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#c3e8ad"/><stop offset="1" stop-color="#94cc79"/></radialGradient>' +
    '<radialGradient id="lv-cp" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#d9f0b8"/><stop offset="1" stop-color="#a9d77e"/></radialGradient>' +
    '<radialGradient id="lv-mg" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#b9f09a"/><stop offset="1" stop-color="#3f9a2c"/></radialGradient>' +
    '<linearGradient id="lv-spec" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a3cc8"/><stop offset=".18" stop-color="#3060e0"/><stop offset=".38" stop-color="#20b0c0"/><stop offset=".5" stop-color="#3cbf4a"/><stop offset=".64" stop-color="#e8e030"/><stop offset=".78" stop-color="#f08a24"/><stop offset="1" stop-color="#d62828"/></linearGradient>' +
    '<linearGradient id="lv-leaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fcb6c"/><stop offset="1" stop-color="#4d9e45"/></linearGradient>' +
    '</defs>';

  /* ---------- háttér ---------- */
  var sun = '<g' + NS + '><circle cx="100" cy="74" r="13" fill="#ffd23f" stroke="#d99a00" stroke-width="1.6"/>' +
    [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) {
      var r = a * Math.PI / 180; return '<path d="M' + f(100 + 17 * Math.cos(r)) + ' ' + f(74 + 17 * Math.sin(r)) + ' L' + f(100 + 23 * Math.cos(r)) + ' ' + f(74 + 23 * Math.sin(r)) + '" stroke="#e0a800" stroke-width="2" stroke-linecap="round"/>';
    }).join('') + '</g>';
  var backdrop = defs +
    txt(14, 26, 'A növényi levél – keresztmetszet', 'lbl', ' font-size="15"') +
    txt(14, 44, 'a levél felső oldala fent · sematikus, nem méretarányos', 'lbl-muted', ' font-size="11"') +
    sun + arrow(118, 88, 168, 124, '#e0a800', 2) + arrow(124, 80, 238, 124, '#e0a800', 2) + arrow(126, 72, 318, 124, '#e0a800', 2) +
    txt(100, 112, 'fény', 'lbl-muted', ' font-size="10" text-anchor="middle"') +
    // gázcsere a gázcserenyílásnál
    arrow(184, 446, 184, 408, '#7f8db0', 2) + txt(178, 442, 'CO₂', 'lbl-muted', ' font-size="10.5" text-anchor="end" font-weight="700"') +
    arrow(196, 408, 196, 446, '#2f8fd0', 2) + txt(202, 432, 'O₂, vízgőz', 'lbl-muted', ' font-size="10.5" font-weight="700"') +
    // nagyítások keretei
    box(548, 40, 244, 190) + txt(558, 58, 'zöld színtest (kloroplasztisz) – nagyítva', 'lbl-muted', ' font-size="10"') +
    box(548, 240, 244, 180) + txt(558, 258, 'klorofill-a molekula', 'lbl-muted', ' font-size="10"') +
    box(118, 462, 216, 130) + txt(128, 478, 'egy levélsejt – nagyítva', 'lbl-muted', ' font-size="10"') +
    box(344, 462, 196, 130) +
    txt(442, 482, 'a fotoszintézis összesített egyenlete', 'lbl-muted', ' font-size="9.5" text-anchor="middle"') +
    txt(442, 506, 'fényenergia, klorofill', 'lbl-muted', ' font-size="9" text-anchor="middle"') +
    txt(442, 526, '6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂', 'lbl', ' font-size="11.5" text-anchor="middle"') +
    txt(442, 548, 'szén-dioxid + víz → szőlőcukor + oxigén', 'lbl-muted', ' font-size="9" text-anchor="middle"') +
    txt(442, 570, 'a cukor kémiai energiája = a napfény energiája', 'lbl-muted', ' font-size="8.5" text-anchor="middle"') +
    box(548, 430, 244, 162) + txt(558, 448, 'a levél és a metszet helye', 'lbl-muted', ' font-size="10"');
  // egész levél sziluettje
  var LEAF = 'M584 516 C612 484 676 466 774 502 C690 548 620 548 584 516 Z';
  backdrop += '<path d="M584 516 L556 546" stroke="#3d7f33" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="' + LEAF + '" fill="url(#lv-leaf)" stroke="#2c6b2a" stroke-width="1.6"/>' +
    '<path d="M584 516 Q680 506 774 502" fill="none" stroke="#d9efc2" stroke-width="2"/>' +
    [620, 650, 680, 710, 740].map(function (x, i) {
      var y = 516 - (x - 584) * 0.075;
      return '<path d="M' + x + ' ' + f(y) + ' Q' + (x + 14) + ' ' + f(y - 14) + ' ' + (x + 26) + ' ' + f(y - 22 + i * 2) + ' M' + x + ' ' + f(y) + ' Q' + (x + 14) + ' ' + f(y + 12) + ' ' + (x + 24) + ' ' + f(y + 20 - i * 2.4) + '" fill="none" stroke="#b9e09c" stroke-width="1.1"/>';
    }).join('') +
    '<path d="M690 466 L690 560" stroke="#e5484d" stroke-width="2" stroke-dasharray="5 3"/>' +
    txt(696, 572, 'metszet helye', 'lbl-muted', ' font-size="9.5"') +
    txt(640, 476, 'levéllemez', 'lbl-muted', ' font-size="9" text-anchor="middle"') +
    txt(744, 528, 'főér', 'lbl-muted', ' font-size="9"') +
    txt(560, 566, 'levélnyél', 'lbl-muted', ' font-size="9"');

  /* ---------- 1. kutikula ---------- */
  var cutTop = 'M' + X0 + ' 131'; for (var cx = X0 + 14; cx <= X1; cx += 14) cutTop += ' Q' + (cx - 7) + ' ' + (cx % 28 ? 129 : 132) + ' ' + cx + ' 131';
  var kutikula = '<path d="' + cutTop + ' L' + X1 + ' 138 L' + X0 + ' 138 Z" fill="url(#lv-cut)" stroke="#a07c12" stroke-width="1.2" stroke-linejoin="round"/>' +
    lead(64, 133, 120, 133) + txt(10, 136, 'kutikula', 'lbl-muted', ' font-size="10.5"');

  /* ---------- 2. felső bőrszövet ---------- */
  var felso = '', cw = (X1 - X0) / 14;
  for (var i = 0; i < 14; i++) felso += '<rect x="' + f(X0 + i * cw + 0.8) + '" y="138.5" width="' + f(cw - 1.6) + '" height="22" rx="5" fill="#d7eec6" stroke="#5f8a3a" stroke-width="1.2"/>';
  felso += lead(98, 150, 120, 150) + txt(10, 153, 'felső bőrszövet', 'lbl-muted', ' font-size="10.5"');

  /* ---------- 3. oszlopos alapszövet ---------- */
  var oszlopos = '';
  for (i = 0; i < 15; i++) {
    var px = X0 + 2 + i * 27;
    oszlopos += '<rect x="' + px + '" y="163" width="24" height="79" rx="9" fill="url(#lv-pal)" stroke="#2f6b25" stroke-width="1.3"/>' +
      '<rect x="' + (px + 6) + '" y="171" width="12" height="63" rx="5" fill="rgba(236,250,224,.55)"' + NS + '/>';
    for (var cy = 172; cy <= 232; cy += 10) oszlopos += chl(px + 4, cy + (i % 2) * 3, 2.4, 4) + chl(px + 20, cy + 5 - (i % 2) * 3, 2.4, 4);
  }
  oszlopos += lead(64, 202, 120, 202) + txt(10, 199, 'oszlopos', 'lbl-muted', ' font-size="10.5"') + txt(10, 212, 'alapszövet', 'lbl-muted', ' font-size="10.5"');

  /* ---------- 4. szivacsos alapszövet (a nyalábhüvellyel) ---------- */
  var VB = { x: 330, y: 302, rx: 56, ry: 47 }, STO = [190, 452];
  var szivacsos = '<rect x="' + X0 + '" y="244" width="' + (X1 - X0) + '" height="128" fill="rgba(140,200,235,.32)" stroke="none"/>';
  var k = 0;
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 14; col++) {
      k++;
      var sx = X0 + 16 + col * 29.5 + (row % 2) * 13 + (rnd(k) - 0.5) * 6, sy = 260 + row * 30 + (rnd(k + 50) - 0.5) * 6;
      if (sx > X1 - 10) continue;
      var dx = (sx - VB.x) / (VB.rx + 16), dy = (sy - VB.y) / (VB.ry + 14);
      if (dx * dx + dy * dy < 1) continue;
      if (STO.some(function (s) { return Math.abs(sx - s) < 24 && sy > 330; })) continue;
      var rx = 12 + rnd(k + 9) * 3, ry = 9 + rnd(k + 19) * 3, rot = (rnd(k + 29) - 0.5) * 70;
      szivacsos += '<ellipse cx="' + f(sx) + '" cy="' + f(sy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" transform="rotate(' + f(rot) + ' ' + f(sx) + ' ' + f(sy) + ')" fill="url(#lv-spo)" stroke="#3f7a2c" stroke-width="1.2"/>' +
        chl(sx - 6, sy - 2, 2.2, 3.4, rot) + chl(sx + 5, sy + 3, 2.2, 3.4, rot + 40) + chl(sx + 1, sy - 5, 2.2, 3.4, rot - 30);
    }
  }
  // nyalábhüvely: sejtgyűrű a szállítónyaláb körül
  for (i = 0; i < 18; i++) {
    var t = i / 18 * 2 * Math.PI;
    szivacsos += '<circle cx="' + f(VB.x + VB.rx * Math.cos(t)) + '" cy="' + f(VB.y + VB.ry * Math.sin(t)) + '" r="8" fill="#cbe8ad" stroke="#4f8a34" stroke-width="1.1"/>';
  }
  szivacsos += lead(64, 302, 120, 302) + txt(10, 299, 'szivacsos', 'lbl-muted', ' font-size="10.5"') + txt(10, 312, 'alapszövet', 'lbl-muted', ' font-size="10.5"') +
    dl(248, 362, 'sejtközötti járatok', 8.5) +
    '<ellipse cx="' + STO[0] + '" cy="356" rx="20" ry="13" fill="rgba(140,200,235,.25)" stroke="#5a9cc4" stroke-width="1" stroke-dasharray="3 2"/>' +
    '<ellipse cx="' + STO[1] + '" cy="356" rx="20" ry="13" fill="rgba(140,200,235,.25)" stroke="#5a9cc4" stroke-width="1" stroke-dasharray="3 2"/>' +
    dl(STO[1], 359, 'légudvar', 8);


  /* ---------- 5. farész (xilém) ---------- */
  var faresz = '<path d="M282 300 C282 270 304 262 330 262 C356 262 378 270 378 300 Z" fill="rgba(214,170,110,.35)" stroke="none"/>';
  [[306, 282, 9], [330, 276, 10.5], [354, 282, 9], [318, 296, 6], [342, 296, 6], [294, 294, 4.5], [366, 294, 4.5], [330, 293, 4]].forEach(function (c) {
    faresz += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="#f5ead4" stroke="#8a5a24" stroke-width="' + (c[2] > 7 ? 3 : 2.2) + '"/>';
  });
  faresz += '<circle cx="330" cy="276" r="3" fill="#2f8fd0"' + NS + '/><circle cx="306" cy="282" r="2.4" fill="#2f8fd0"' + NS + '/><circle cx="354" cy="282" r="2.4" fill="#2f8fd0"' + NS + '/>' +
    lead(372, 274, 402, 262) + dl(426, 260, 'farész (víz ↑)', 9);

  /* ---------- 6. háncsrész (floém) ---------- */
  var hancsresz = '<path d="M282 302 L378 302 C378 330 356 342 330 342 C304 342 282 330 282 302 Z" fill="rgba(240,180,80,.30)" stroke="none"/>';
  [[300, 312], [316, 310], [332, 310], [348, 310], [362, 312], [306, 326], [322, 326], [338, 326], [354, 326], [318, 338], [338, 338]].forEach(function (c, j) {
    hancsresz += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + (j % 3 === 2 ? 4.5 : 6.2) + '" fill="#f3c66c" stroke="#9c6a12" stroke-width="1.2"/>';
    if (j % 2 === 0) hancsresz += '<circle cx="' + (c[0] + 6) + '" cy="' + (c[1] + 5) + '" r="2.4" fill="#c97d1c" stroke="#7a4a0a" stroke-width=".6"/>';
  });
  hancsresz += '<path d="M290 303 L370 303" stroke="#8a6a2a" stroke-width="1" stroke-dasharray="2 2"' + NS + '/>' +
    lead(372, 330, 402, 342) + dl(430, 346, 'háncsrész (cukor →)', 9);

  /* ---------- 7. alsó bőrszövet ---------- */
  var also = '', edges = [X0];
  // a sejthatárok a gázcserenyílások körül kihagyják a zárósejtek helyét
  for (var ex = X0 + 29; ex < X1; ex += 29) {
    if (STO.some(function (s) { return Math.abs(ex - s) < 30; })) continue;
    edges.push(ex);
  }
  edges.push(X1);
  var segs = [];
  for (i = 0; i < edges.length - 1; i++) {
    var a = edges[i], b = edges[i + 1];
    STO.forEach(function (s) { if (a < s && b > s) { segs.push([a, s - 17]); a = s + 17; } });
    if (b - a > 34) { segs.push([a, (a + b) / 2]); segs.push([(a + b) / 2, b]); } else segs.push([a, b]);
  }
  segs.forEach(function (sg) {
    if (sg[1] - sg[0] > 4) also += '<rect x="' + f(sg[0] + 0.8) + '" y="373" width="' + f(sg[1] - sg[0] - 1.6) + '" height="21" rx="5" fill="#d7eec6" stroke="#5f8a3a" stroke-width="1.2"/>';
  });
  also += '<path d="M' + X0 + ' 394.5 L' + (STO[0] - 3) + ' 394.5 L' + (STO[0] - 3) + ' 398 L' + X0 + ' 398 Z M' + (STO[0] + 3) + ' 394.5 L' + (STO[1] - 3) + ' 394.5 L' + (STO[1] - 3) + ' 398 L' + (STO[0] + 3) + ' 398 Z M' + (STO[1] + 3) + ' 394.5 L' + X1 + ' 394.5 L' + X1 + ' 398 L' + (STO[1] + 3) + ' 398 Z" fill="url(#lv-cut)" stroke="#a07c12" stroke-width=".8"/>' +
    lead(92, 384, 120, 384) + txt(10, 387, 'alsó bőrszövet', 'lbl-muted', ' font-size="10.5"');

  /* ---------- 8. gázcserenyílás és zárósejtek ---------- */
  function guard(s) {
    return '<path d="M' + (s - 16) + ' 384 C' + (s - 16) + ' 372 ' + (s - 3) + ' 370 ' + (s - 2) + ' 378 L' + (s - 2) + ' 390 C' + (s - 3) + ' 398 ' + (s - 16) + ' 396 ' + (s - 16) + ' 384 Z" fill="#8fd07a" stroke="#2f6b25" stroke-width="1.3"/>' +
      '<path d="M' + (s + 16) + ' 384 C' + (s + 16) + ' 372 ' + (s + 3) + ' 370 ' + (s + 2) + ' 378 L' + (s + 2) + ' 390 C' + (s + 3) + ' 398 ' + (s + 16) + ' 396 ' + (s + 16) + ' 384 Z" fill="#8fd07a" stroke="#2f6b25" stroke-width="1.3"/>' +
      '<path d="M' + (s - 2.5) + ' 377 L' + (s - 2.5) + ' 391 M' + (s + 2.5) + ' 377 L' + (s + 2.5) + ' 391" stroke="#2f6b25" stroke-width="2.4"' + NS + '/>' +
      chl(s - 10, 381, 1.8, 2.6) + chl(s - 9, 389, 1.8, 2.6) + chl(s + 10, 381, 1.8, 2.6) + chl(s + 9, 389, 1.8, 2.6);
  }
  var sztoma = guard(STO[0]) + guard(STO[1]) +
    // felülnézet: két vese alakú zárósejt a nyitott rés körül
    '<rect x="20" y="410" width="80" height="40" rx="6" fill="#d7eec6" stroke="#5f8a3a" stroke-width="1"/>' +
    '<path d="M40 410 L44 424 M80 410 L76 424 M40 450 L44 436 M80 450 L76 436" stroke="#5f8a3a" stroke-width="1"/>' +
    '<path d="M60 418 C44 418 42 442 60 442 C54 436 54 424 60 418 Z" fill="#8fd07a" stroke="#2f6b25" stroke-width="1.2"/>' +
    '<path d="M60 418 C76 418 78 442 60 442 C66 436 66 424 60 418 Z" fill="#8fd07a" stroke="#2f6b25" stroke-width="1.2"/>' +
    '<path d="M60 420 C56 426 56 434 60 440 C64 434 64 426 60 420 Z" fill="#3a4250"/>' +
    txt(60, 462, 'felülnézet: nyitott rés', 'lbl-muted', ' font-size="9" text-anchor="middle"');

  /* ---------- 9. kloroplasztisz (nagyítás) ---------- */
  var CP = { x: 668, y: 140 };
  var kloro = '<circle cx="522" cy="203" r="7" fill="none" stroke="#2f6b25" stroke-width="1.4"/>' +
    '<path d="M529 200 L566 156" stroke="#2f6b25" stroke-width="1.2" stroke-dasharray="3 3"/>' +
    '<ellipse cx="' + CP.x + '" cy="' + CP.y + '" rx="104" ry="56" fill="#8ccb62" stroke="#2f7a2a" stroke-width="2"/>' +
    '<ellipse cx="' + CP.x + '" cy="' + CP.y + '" rx="98" ry="50.5" fill="url(#lv-cp)" stroke="#2f7a2a" stroke-width="1.2"/>';
  var GRANA = [[602, 136], [638, 116], [640, 166], [680, 134], [716, 112], [720, 164], [752, 140]];
  // sztrómatilakoidok: a gránumokat összekötő lemezek
  kloro += '<path d="' + [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]].map(function (e) {
    var p = GRANA[e[0]], q = GRANA[e[1]]; return 'M' + p[0] + ' ' + p[1] + ' L' + q[0] + ' ' + q[1];
  }).join(' ') + '" stroke="#3c9a46" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  GRANA.forEach(function (g, j) {
    var n = j % 2 ? 5 : 6;
    for (var d = 0; d < n; d++) {
      kloro += '<rect x="' + (g[0] - 13) + '" y="' + f(g[1] - n * 3 + d * 6) + '" width="26" height="5" rx="2.5" fill="#3c9a46" stroke="#1d5c25" stroke-width=".9"/>';
    }
  });
  kloro += '<ellipse cx="694" cy="176" rx="15" ry="7" fill="#f6f2e2" stroke="#9c8f60" stroke-width="1"/>' +
    '<path d="M600 168 c6 -6 14 2 8 8 c-6 6 -14 -2 -8 -8 Z" fill="none" stroke="#8a4fb8" stroke-width="1.2"/>' +
    [[620, 100], [660, 98], [700, 96], [610, 154], [662, 186], [742, 116], [744, 170], [586, 120]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.6" fill="#6a4a2a"/>'; }).join('') +
    lead(716, 94, 742, 76) + txt(744, 76, 'gránum', 'lbl-muted', ' font-size="9.5"') +
    lead(652, 118, 640, 74) + txt(636, 72, 'tilakoid', 'lbl-muted', ' font-size="9.5" text-anchor="end"') +
    dl(660, 150, 'sztróma', 8.5) +
    lead(694, 183, 700, 212) + txt(702, 220, 'keményítő', 'lbl-muted', ' font-size="9.5"') +
    lead(600, 186, 590, 212) + txt(560, 220, 'kettős hártya', 'lbl-muted', ' font-size="9.5"') +
    txt(604, 162, 'DNS', 'lbl-muted', ' font-size="7.5" text-anchor="middle"');

  /* ---------- 10. klorofill-molekula ---------- */
  var MC = { x: 616, y: 330 };
  function pyrrole(ang) {
    var a = ang * Math.PI / 180, c = [MC.x + 33 * Math.cos(a), MC.y + 33 * Math.sin(a)], pts = [];
    for (var j = 0; j < 5; j++) { var b = a + Math.PI + j * 2 * Math.PI / 5; pts.push([c[0] + 12 * Math.cos(b), c[1] + 12 * Math.sin(b)]); }
    return { c: c, pts: pts };
  }
  var rings = [0, 90, 180, 270].map(pyrrole), klorofill = '';
  // metinhidak a szomszédos gyűrűk között (konjugált „nagygyűrű”)
  rings.forEach(function (r, j) {
    var nx = rings[(j + 1) % 4], a = (j * 90 + 45) * Math.PI / 180, br = [MC.x + 44 * Math.cos(a), MC.y + 44 * Math.sin(a)];
    klorofill += '<path d="M' + f(r.pts[4][0]) + ' ' + f(r.pts[4][1]) + ' L' + f(br[0]) + ' ' + f(br[1]) + ' L' + f(nx.pts[1][0]) + ' ' + f(nx.pts[1][1]) + '" fill="none" stroke="#3a8f35" stroke-width="2.2" stroke-linejoin="round"/>';
  });
  rings.forEach(function (r, ri) {
    klorofill += '<path d="M' + r.pts.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join(' L') + ' Z" fill="rgba(95,185,80,.35)" stroke="#3a8f35" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<path d="M' + f(MC.x + (r.pts[0][0] - MC.x) * 0.55) + ' ' + f(MC.y + (r.pts[0][1] - MC.y) * 0.55) + ' L' + f(r.pts[0][0]) + ' ' + f(r.pts[0][1]) + '" stroke="#5a6a8a" stroke-width="1.6" stroke-dasharray="2.5 2"/>';
    // oldallánc-csonkok
    [2, 3].forEach(function (q) {
      if ((ri === 0 && q === 3) || ri === 1) return;
      var p = r.pts[q], v = [p[0] - r.c[0], p[1] - r.c[1]];
      klorofill += '<path d="M' + f(p[0]) + ' ' + f(p[1]) + ' l' + f(v[0] * 0.7) + ' ' + f(v[1] * 0.7) + '" stroke="#3a8f35" stroke-width="1.6"/>';
    });
  });
  // V. gyűrű (ciklopentanon) a klorofillra jellemző: a 45°-os metinhídhoz kapcsolódik
  var B45 = [MC.x + 44 * Math.cos(Math.PI / 4), MC.y + 44 * Math.sin(Math.PI / 4)], V5 = [MC.x + 56 * Math.cos(Math.PI / 4), MC.y + 56 * Math.sin(Math.PI / 4)], v5 = [];
  for (i = 0; i < 5; i++) { var bb = Math.PI * 5 / 4 + i * 2 * Math.PI / 5; v5.push([V5[0] + 12 * Math.cos(bb), V5[1] + 12 * Math.sin(bb)]); }
  klorofill += '<path d="M' + v5.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join(' L') + ' Z" fill="rgba(95,185,80,.2)" stroke="#3a8f35" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M' + f(v5[2][0]) + ' ' + f(v5[2][1]) + ' l7 -5" stroke="#c0392b" stroke-width="2"/>';
  // fitol-farok
  var tail = [[606, 372], [606, 386]], tx = 606;
  for (i = 0; i < 13; i++) { tx += 12; tail.push([tx, i % 2 ? 386 : 396]); }
  klorofill += '<path d="M' + f(rings[1].pts[3][0]) + ' ' + f(rings[1].pts[3][1]) + ' L606 372 L606 386 ' + tail.slice(2).map(function (p) { return 'L' + p[0] + ' ' + p[1]; }).join(' ') + '" fill="none" stroke="#b08a3a" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>' +
    [3, 7, 11].map(function (q) { var p = tail[q + 2]; return '<path d="M' + p[0] + ' ' + p[1] + ' l0 ' + (q % 2 ? 8 : -8) + '" stroke="#b08a3a" stroke-width="2"/>'; }).join('') +
    rings.map(function (r) { return '<circle cx="' + f(r.pts[0][0]) + '" cy="' + f(r.pts[0][1]) + '" r="5" fill="#5b82d8" stroke="#24457e" stroke-width="1"/><text x="' + f(r.pts[0][0]) + '" y="' + f(r.pts[0][1] + 2.4) + '" font-size="6.5" font-weight="700" fill="#fff" text-anchor="middle" font-family="system-ui, sans-serif"' + NS + '>N</text>'; }).join('') +
    '<circle cx="' + MC.x + '" cy="' + MC.y + '" r="9" fill="url(#lv-mg)" stroke="#3a8f35" stroke-width="1.4"/>' +
    '<text x="' + MC.x + '" y="' + (MC.y + 3) + '" font-size="8" font-weight="700" fill="' + INK + '" text-anchor="middle" font-family="system-ui, sans-serif"' + NS + '>Mg</text>' +
    txt(560, 280, 'porfirinváz', 'lbl-muted', ' font-size="9"') +
    txt(784, 404, 'fitol „farok”', 'lbl-muted', ' font-size="9" text-anchor="end"') + txt(784, 414, '(a hártyába horgonyoz)', 'lbl-muted', ' font-size="8" text-anchor="end"') +
    // elnyelési színkép
    '<rect x="694" y="272" width="88" height="62" rx="6" fill="rgba(255,255,255,.55)" stroke="#7f8db0" stroke-width=".8"/>' +
    '<rect x="700" y="318" width="76" height="6" fill="url(#lv-spec)"/>' +
    '<path d="M700 314 C704 314 706 284 712 282 C718 280 722 306 728 312 C734 316 740 316 746 314 C752 312 756 298 762 290 C766 286 768 312 776 314" fill="none" stroke="#1b2230" stroke-width="1.6"/>' +
    '<text x="738" y="283" font-size="7" fill="' + INK + '" text-anchor="middle" font-family="system-ui, sans-serif"' + NS + '>elnyelés</text>' +
    '<text x="738" y="331" font-size="6.5" fill="' + INK + '" text-anchor="middle" font-family="system-ui, sans-serif"' + NS + '>kék · zöld · vörös</text>' +
    txt(738, 348, 'a zöldet alig nyeli el,', 'lbl-muted', ' font-size="8.5" text-anchor="middle"') + txt(738, 359, 'ezért zöld a levél', 'lbl-muted', ' font-size="8.5" text-anchor="middle"');

  /* ---------- 11. sejtfal és vakuólum (egy sejt nagyítva) ---------- */
  var sejt = '<rect x="134" y="488" width="186" height="94" rx="14" fill="#b7dc84" stroke="#4d7a22" stroke-width="2"/>' +
    '<rect x="141" y="495" width="172" height="80" rx="10" fill="#eef7df" stroke="#c05a8a" stroke-width="1.2"/>' +
    [[180, 488], [262, 488], [180, 582], [262, 582]].map(function (p) { return '<path d="M' + p[0] + ' ' + (p[1] - 1) + ' l0 8 M' + (p[0] + 4) + ' ' + (p[1] - 1) + ' l0 8" stroke="#eef7df" stroke-width="1.4"' + NS + '/>'; }).join('') +
    '<rect x="172" y="502" width="134" height="66" rx="18" fill="rgba(110,185,235,.55)" stroke="#2f7fb5" stroke-width="1.4"/>' +
    '<circle cx="156" cy="535" r="10" fill="#c0a6ec" stroke="#6a4aa8" stroke-width="1.3"/><circle cx="158" cy="533" r="3" fill="#6a3fb5"/>';
  [[184, 498.5, 0], [210, 498.5, 0], [236, 498.5, 0], [262, 498.5, 0], [288, 498.5, 0], [184, 571.5, 0], [210, 571.5, 0], [236, 571.5, 0], [262, 571.5, 0], [288, 571.5, 0], [309.5, 520, 90], [309.5, 548, 90], [150, 510, 60], [150, 560, 120]].forEach(function (p) {
    sejt += chl(p[0], p[1], 7, 2.8, p[2]);
  });
  sejt += dl(239, 539, 'vakuólum', 10) +
    lead(300, 489, 302, 482) + txt(296, 478, 'sejtfal', 'lbl-muted', ' font-size="9.5"') +
    dl(158, 557, 'sejtmag', 7.5);

  STUDIE.addModel({
    id: 'level',
    title: 'A növényi levél és a fotoszintézis',
    icon: '🍃',
    color: '#2f9e6a',
    category: 'Biológia',
    keywords: 'levél levélszerkezet fotoszintézis kutikula bőrszövet epidermisz oszlopos alapszövet paliszád szivacsos alapszövet sejtközötti járat gázcserenyílás sztóma zárósejt légudvar levélér szállítónyaláb farész xilém háncsrész floém kloroplasztisz zöld színtest tilakoid gránum sztróma klorofill magnézium porfirin fényszakasz Calvin-ciklus RuBisCO ATP NADPH glükóz szőlőcukor keményítő szacharóz párologtatás transzspiráció sejtfal cellulóz vakuólum van Helmont Priestley Ingenhousz Sachs Calvin Mitchell kemiozmózis',
    summary: 'Egy kb. 0,2–0,3 mm vastag, napelemnél is ügyesebb „gyár”: napfényből, vízből és szén-dioxidból cukrot és oxigént állít elő, és közben vizet párologtat.',
    scale: 'levélvastagság kb. 0,2–0,3 mm; egy sejt kb. 20–80 µm; egy kloroplasztisz kb. 5–10 µm',
    viewBox: '0 0 800 600',
    backdrop: backdrop,
    intro: 'A rajz egy lomblevél **keresztmetszete**, mintha egy borotvapengével keresztbe vágtuk volna (jobbra lent látod, hol). Felülről lefelé: a viaszos **kutikula**, a **felső bőrszövet**, a sűrű, zöld **oszlopos alapszövet**, a lazább, légjáratos **szivacsos alapszövet** a **levéllérrel**, végül az **alsó bőrszövet** a **gázcserenyílásokkal**.\n\nA levél a **fotoszintézis** helye: a sejtek **zöld színtestjeiben** (kloroplasztiszaiban) a **klorofill** elnyeli a napfényt, és energiájával **vízből és szén-dioxidból cukrot** készít, melléktermékként **oxigén** szabadul fel. A nagyításokon a színtest belseje, a klorofill-molekula és egy levélsejt látszik. A **Szétszedés** gombbal a rétegeket széthúzhatod.',
    parts: [
      {
        id: 'kutikula', z: 6, name: 'Kutikula', svg: kutikula, explode: [0, -34], badge: [150, 126], en: 'cuticle (cutin and epicuticular wax)', latin: 'cuticula',
        lesson: 'termeszet/novenyek',
        what: 'A levél felszínét borító vékony, **viaszos, vízhatlan bevonat**, mint egy átlátszó lakkréteg. Megakadályozza, hogy a levél **kiszáradjon**, lepergeti a vizet és a port, védi a levelet a kórokozóktól és részben az UV-sugárzástól. Mivel **átlátszó**, a fény akadálytalanul átjut rajta. A levél alsó oldalán is van, de ott általában vékonyabb.',
        madeOf: 'A **kutin** nevű, zsírsavakból felépülő, hálózatos anyagból, amelybe és amelyre **viaszok** rakódnak. Sok növényen a viasz parányi kristálykákat, pikkelyeket alkot: ettől lesz pl. a káposztalevél vagy a szilva „hamvas”.',
        how: 'Nem sejtekből áll: a **felső bőrszövet sejtjei választják ki** magukból, és a sejtfaluk külső felszínén rakódik le. Száraz, napos helyen élő növényeken (pl. a leander, a fikusz vagy a kaktuszok) sokkal vastagabb, mint az árnyékban vagy vízben élőkén.',
        uni: 'A kutin C₁₆ és C₁₈ **hidroxi-zsírsavak** észterkötésekkel térhálósított poliésztere; az **epikutikuláris viasz** hosszú szénláncú alkánokból, alkoholokból, észterekből áll. A kutikuláris párologtatás zárt gázcserenyílások mellett is a teljes vízvesztés néhány százalékát adja. A mikro- és nanoméretű viaszkristályok **szuperhidrofób** felületet hoznak létre (érintkezési szög > 150°): a vízcseppek legördülnek, és magukkal viszik a szennyeződést (**lótuszhatás**, Barthlott, 1997), amit önmagát tisztító festékek, textilek is utánoznak. A kutikula a növényvédő szerek felvételének fő akadálya is: a permetszerekhez ezért nedvesítőszert adnak.',
        fact: 'A lótuszvirág levelén a víz gyöngyként gurul le, és magával viszi a sarat: a növény a mocsárban is tiszta marad.'
      },
      {
        id: 'felso', z: 5, name: 'Felső bőrszövet', svg: felso, explode: [0, -20], badge: [214, 150], en: 'upper epidermis', latin: 'epidermis superior',
        lesson: 'termeszet/novenyek',
        what: 'A levél felső felszínén egyetlen sejtsorból álló **határoló réteg**. Védi a belső szöveteket a sérüléstől, a kiszáradástól és a kórokozóktól, közben **átengedi a fényt**. A sejtjei általában **nem tartalmaznak** zöld színtestet: olyanok, mint egy átlátszó ablaksor a zöld „gyár” fölött.',
        madeOf: 'Szorosan, hézag nélkül illeszkedő, lapos **élő sejtekből**, amelyek felszíne felé eső fala vastagabb, és a **kutikulát** választja ki. Sok növényen a bőrszövetből **szőrök** nőnek ki, amelyek árnyékolnak, csökkentik a párologtatást, vagy (mint a csalánon) védekeznek.',
        how: 'A hajtáscsúcs legkülső sejtrétegéből osztódással alakul ki, és a levél növekedése közben is követi a felület gyarapodását. A felső bőrszövetben **kevés vagy semmi** gázcserenyílás van (a legtöbb fás és lágy szárú szárazföldi növénynél), így a napsütötte felszínen kevesebb víz párolog el.',
        uni: 'Az epidermiszsejtek domború külső fala **mikrolencseként** a mezofillumba fókuszálja a fényt. A vakuólumukban lévő **flavonoidok** és antociánok az UV-B sugárzás nagy részét elnyelik, mielőtt az a fotoszintetizáló sejtek DNS-ét és a II. fotokémiai rendszert károsítaná. A bőrszövet sejtjeinek alakja és elrendeződése (pl. a kirakósszerű, hullámos falú sejtek) a levél mechanikai szilárdságát is növeli. Az epidermisz-sejtek kölcsönös jelzései (pl. EPF-peptidek) szabályozzák, hogy a gázcserenyílások ne kerüljenek egymás mellé (egysejtnyi távolság-szabály).',
        fact: 'A csalán szőrei apró üvegampullák: a hegyük letörik, és a bőrbe hangyasavat és hisztamint tartalmazó nedvet fecskendeznek.'
      },
      {
        id: 'oszlopos', z: 4, name: 'Oszlopos alapszövet (paliszád)', svg: oszlopos, explode: [0, -6], badge: [258, 204], en: 'palisade mesophyll (palisade parenchyma)', latin: 'mesophyllum palisadicum',
        lesson: 'termeszet/novenyek',
        what: 'A felső bőrszövet alatt, a levél felszínére merőlegesen, sűrűn álló, hosszúkás sejtek sora: a levél **fő fotoszintetizáló rétege**. Itt van a legtöbb **zöld színtest** (sejtenként akár 30–50), és ide érkezik a legtöbb fény. Az oszlopos elrendezés olyan, mint sok egymás mellé állított kémcső: a fény mélyen behatol a sejtekbe, és útja során több színtesten is áthalad.',
        madeOf: 'Vékony falú, élő **alapszöveti** (parenchima) sejtekből. Minden sejt közepét egy nagy **vakuólum** tölti ki, a sejtplazma és benne a **színtestek** vékony rétegben a sejtfal mentén helyezkednek el. A sejtek között keskeny **légjáratok** futnak, amelyeken a szén-dioxid eljut hozzájuk.',
        how: 'A fiatal levél belső szövetéből osztódással és **megnyúlással** alakul ki. Fontos, hogy a levél fejlődése a fényviszonyokhoz igazodik: a napos helyen fejlődő **fénylevelekben** két-három sor oszlopos sejt is lehet, az árnyékban fejlődő **árnyéklevelek** vékonyabbak, csak egy sor oszlopos sejtjük van, de nagyobb a felületük.',
        uni: 'A mezofillumban erős **fénygradiens** alakul ki: a kék és vörös fény néhány sejtrétegen belül elnyelődik, a zöld mélyebbre jut. Az oszlopos sejtek „fényvezetőként” is működnek, csökkentve a **szitahatást** (azt, hogy a fény a színtestek közötti réseken elnyelés nélkül haladjon át). A színtestek **kék fény** hatására (fototropin receptorokon át) mozognak: gyenge fényben a fény felé fordulnak (akkumuláció), erős fényben a sejt oldalfalaihoz húzódnak (elkerülő mozgás), csökkentve a fénykárosodást (fotoinhibíciót). A fotoszintézis fényintenzitás-görbéje telítődik: a kompenzációs pont alatt a légzés felülmúlja a CO₂-megkötést.',
        fact: 'Egy négyzetmilliméternyi levélfelület alatt kb. félmillió zöld színtest dolgozik.'
      },
      {
        id: 'szivacsos', z: 2, name: 'Szivacsos alapszövet és sejtközötti járatok', svg: szivacsos, explode: [0, 10], badge: [232, 336], en: 'spongy mesophyll, intercellular air spaces, bundle sheath', latin: 'mesophyllum spongiosum',
        lesson: 'termeszet/novenyek',
        what: 'Az oszlopos réteg alatti, lazán elhelyezkedő, szabálytalan alakú sejtek rétege, köztük nagy **sejtközötti járatokkal** (légjáratokkal). Olyan, mint egy szivacs: a gázcserenyílásokon beáramló **szén-dioxid** a járatokban szétterjed, és minden sejthez eljut; az **oxigén** és a **vízpára** ugyanitt távozik. Sejtjei is fotoszintetizálnak, de kevesebb színtestük van. A levélér körül a sejtek szoros gyűrűt (**nyalábhüvelyt**) alkotnak.',
        madeOf: 'Vékony falú, élő **alapszöveti** sejtekből, kevesebb színtesttel; a levél térfogatának akár harmadát-felét **levegő** tölti ki. A sejtek nedves fala felé nyílnak a járatok: a gázok a falon lévő vízhártyában oldódva jutnak be a sejtekbe.',
        how: 'A levél fejlődésekor a sejtek közötti **középlemezek** egyes helyeken szétválnak, a sejtek pedig karcsú nyúlványokkal kapcsolódnak egymáshoz: így alakul ki a levegővel teli, összefüggő járathálózat. A gázcserenyílások fölött egy-egy nagyobb üreg, a **légudvar** marad szabadon.',
        uni: 'A CO₂ útja a légköri levegőtől a karboxilációs helyig: határréteg → **sztómakonduktancia** (g_s) → sejtközötti járatok → **mezofillumkonduktancia** (g_m: sejtfal, plazmamembrán, citoszol, színtesthártyák). A belső CO₂-koncentráció (C_i) egy C₃-növény levelében kb. a légköri érték 70%-a. A szivacsos szövet sok határfelülete erősen **szórja** a fényt (ezért világosabb a levél fonákja), ami növeli a fény úthosszát a levélben. A **C₄-növényekben** (pl. kukorica) a nyalábhüvely sejtjei külön feladatot kapnak („Kranz-anatómia”): a mezofillum a CO₂-t először 4 szénatomos savba köti (PEP-karboxiláz), és a hüvelyben szabadítja fel a RuBisCO számára, ami csökkenti a fotorespirációt.',
        fact: 'A levél belső felülete (a járatok falának összterülete) a külső felület 10–40-szerese is lehet.'
      },
      {
        id: 'sztoma', z: 8, name: 'Gázcserenyílás (sztóma) és zárósejtek', svg: sztoma, explode: [0, 34], badge: [470, 406], en: 'stoma (pl. stomata) and guard cells', latin: 'stoma (pl. stomata)',
        lesson: 'termeszet/novenyek',
        what: 'Az alsó bőrszövet apró, **nyitható-zárható résnyílásai**, amelyeket két bab (vese) alakú **zárósejt** fog közre. Ezeken át lép be a fotoszintézishez szükséges **szén-dioxid**, és itt távozik az **oxigén** és a **vízpára**. A zárósejtek a növény **„szelepei”**: fényben és ha van elég víz, kinyitnak; sötétben vagy szárazságban bezárnak, hogy a növény ne veszítsen túl sok vizet.',
        madeOf: 'Két **élő, színtestet tartalmazó** zárósejtből (a többi bőrszöveti sejtben általában nincs színtest), amelyek fala **egyenetlenül vastag**: a rés felé eső fal vastag és merev, a külső vékony és rugalmas. A nyílás fölött egy nagyobb légüreg, a **légudvar** található.',
        how: 'A bőrszövet egyes sejtjei aszimmetrikus osztódással **zárósejt-anyasejtté** alakulnak, amely egyszer osztódik, és a két utódsejt között a fal középen szétválik: így nyílik meg a rés. **Nyitás:** fény hatására a zárósejtek **kálium-ionokat** vesznek fel, emiatt víz áramlik beléjük ozmózissal, megduzzadnak (nő a **turgor**), és mivel a rés felőli faluk merevebb, **meggörbülnek**, a rés kinyílik. **Zárás:** szárazságban az **abszcizinsav** nevű hormon hatására ionok és víz lép ki, a sejtek elernyednek, a rés bezárul.',
        uni: 'A nyitás motorja a zárósejt-plazmamembrán **H⁺-ATPáza** (kék fény → fototropin → aktiválás), amely hiperpolarizálja a membránt; ezután befelé egyenirányító **K⁺-csatornákon** K⁺, és Cl⁻/malát²⁻ halmozódik fel, csökken az ozmotikus potenciál (Ψ_π), víz lép be. A cellulóz-mikrofibrillumok **radiális elrendeződése** miatt a sejt csak hosszában nyúlhat meg, ezért görbül. Az **ABA** a PYR/PYL receptorokon át gátolja a PP2C foszfatázokat, felszabadítja az OST1 kinázt, amely az **SLAC1** anioncsatornát nyitja: anionok, majd K⁺ távozik, a turgor összeomlik. A sztómák sűrűsége (alsó oldalon kb. 100–300/mm²) a légköri CO₂-szinttel fordítottan változik: fosszilis leveleken a sztómaindexből a múltbeli CO₂-koncentráció becsülhető. A **CAM-növények** (pl. kaktuszok) éjjel nyitják sztómáikat, és a CO₂-t savak formájában tárolják.',
        fact: 'A napraforgó egyetlen levelén több millió gázcserenyílás van, és egy nyári napon egy nagyobb fa több száz liter vizet párologtat el rajtuk keresztül.'
      },
      {
        id: 'also', z: 7, name: 'Alsó bőrszövet', svg: also, explode: [0, 24], badge: [330, 384], en: 'lower epidermis', latin: 'epidermis inferior',
        lesson: 'termeszet/novenyek',
        what: 'A levél fonákát borító egysejtrétegű bőrszövet, rajta vékonyabb **kutikulával**. Abban különbözik a felsőtől, hogy itt van a **gázcserenyílások** többsége: az árnyékos, hűvösebb alsó oldalon kevesebb víz párolog el a nyílásokon át. Gyakran szőrös, ami a felszín közelében „álló” párás levegőréteget tart meg.',
        madeOf: 'Hézag nélkül illeszkedő, színtelen, élő **bőrszöveti sejtekből**, köztük elszórtan a **zárósejtpárokkal**. Felülnézetben a sejtek gyakran hullámos falúak, és kirakós játékként kapcsolódnak egymásba.',
        how: 'A felső bőrszövettel együtt a hajtáscsúcs legkülső sejtrétegéből fejlődik. A zárósejtek egyenletes eloszlását a sejtek egymásnak küldött kémiai jelei biztosítják: két gázcserenyílás szinte sosem kerül közvetlenül egymás mellé. A vízen úszó levelű növényeknél (pl. tavirózsa) fordított a helyzet: ott a gázcserenyílások a **felső** oldalon vannak.',
        uni: 'A bőrszövet feletti **határréteg** (néhány mm vastag, nyugvó levegőréteg) ellenállása a szélsebességgel és a levél méretével változik, és a sztómák mellett a párologtatás másik fő szabályozója: a szőrök és a besüllyesztett sztómák (pl. a leander „sztómakriptái”) ezt a réteget vastagítják, így csökkentik a vízvesztést (xeromorf levelek). A párologtatás hajtóereje a levél belseje (kb. 100% relatív páratartalom) és a külső levegő közötti **vízgőznyomás-különbség** (VPD); a fluxus Fick-törvény szerint E = g · ΔVPD/P alakban írható fel.',
        fact: 'Ha egy levelet a fonákjával felfelé ragasztunk vazelinnel befestett üveglapra, jóval lassabban hervad el, mint ha a színét kenjük be: a víz főként az alsó oldalon párolog.'
      },
      {
        id: 'faresz', z: 3, name: 'Levélér: farész (xilém)', svg: faresz, explode: [0, 4], badge: [330, 264], en: 'xylem of the vascular bundle (leaf vein)', latin: 'xylema',
        lesson: 'termeszet/novenyek', terms: ['kemia-bsc/intermolekularis'],
        what: 'A levélerek (szállítónyalábok) **felső**, a levél színe felé eső része. A **vizet és az oldott ásványi sókat** szállítja a gyökértől a száron át a levélbe. A víz egy részét a fotoszintézis használja fel, a nagyobb része a levélből **elpárolog**, és ez a párolgás **szívja** fel a vizet egészen a gyökerekből.',
        madeOf: '**Elhalt**, üres, csőszerű sejtekből: a **vízszállító csövek** (tracheák) és a **vízszállító sejtek** (tracheidák) faluk vastag és **fásodott** (lignin), sokszor gyűrűs vagy csavarvonalas megvastagodással, ami megakadályozza, hogy a cső összelapuljon. A csöveket élő faparenchima-sejtek kísérik.',
        how: 'A fejlődő nyalábban a leendő vízszállító sejtek megnyúlnak, vastag, fásodott falat építenek, majd **programozott sejthalállal** elpusztulnak, a tartalmuk lebomlik: így marad vissza az üres csőfal. A vízszállító csövekben az egymás fölötti sejtek közötti harántfalak is feloldódnak, így hosszú, összefüggő cső jön létre. A **fa** túlnyomórészt ilyen, évről évre lerakódó farészből áll.',
        uni: 'A vízszállítás a **kohéziós–tenziós elmélet** (Dixon és Joly, 1894) szerint passzív: a párologtatás a levélben **negatív nyomást** (húzófeszültséget) kelt, amely a hidrogénkötésekkel összetartott vízoszlopot a vízpotenciál-gradiens mentén felhúzza (talaj kb. −0,3 MPa → levél kb. −1,5 MPa → levegő 50% páratartalomnál kb. −95 MPa). A víz **kohéziója** (H-kötések) és a falhoz tapadása (adhézió) teszi lehetővé, hogy a vízoszlop ne szakadjon el. Az áramlás a **Hagen–Poiseuille-törvény** szerint a cső sugarának 4. hatványával arányos, ezért a széles csövek sokkal jobban vezetnek, de könnyebben **kavitálnak** (légbuborék-embólia) szárazságban vagy fagyban.',
        fact: 'A legmagasabb fák (kb. 115 m-es mamutfenyők) tetejére a víz egyetlen szivattyú nélkül, pusztán a párolgás „szívóerejével” jut fel.'
      },
      {
        id: 'hancsresz', z: 3, name: 'Levélér: háncsrész (floém)', svg: hancsresz, explode: [0, 20], badge: [330, 324], en: 'phloem of the vascular bundle (sieve tubes, companion cells)', latin: 'phloema',
        lesson: 'termeszet/novenyek', terms: ['szerves-kemia/szenhidrat'],
        what: 'A levélerek **alsó**, a fonák felé eső része. A levélben készült **cukrot** (főként **szacharózt**, azaz répacukrot) oldat formájában szállítja oda, ahol szükség van rá, vagy ahol a növény raktároz: a növekvő hajtáscsúcsba, a gyökerekbe, a termésekbe, a gumókba. A víz a farészben jellemzően egy irányba (felfelé), a cukoroldat a háncsban **bármely irányba** áramolhat.',
        madeOf: '**Élő** sejtekből: a cukoroldatot a **rostacsövek** vezetik, amelyek egymás fölötti sejtjeit szitaszerűen átlyuggatott harántfalak (**rostalemezek**) kötik össze. A rostacsősejtekből hiányzik a sejtmag; az életműködésüket a mellettük lévő kis, sűrű plazmájú **kísérősejtek** tartják fenn.',
        how: 'A szállítónyaláb osztódó sejtjeiből alakul ki: egy anyasejt egyenlőtlenül osztódik, a nagyobb utódsejt rostacsősejtté, a kisebb kísérősejtté válik. A rostacsősejt elveszíti sejtmagját és a legtöbb sejtalkotóját, hogy szabad legyen az út. Ha a háncs megsérül, a rostalemezek pórusait **kallóz** nevű szénhidrát és fehérjedugók gyorsan elzárják, mint egy vérzéscsillapítás. A levéltetvek szájszervüket éppen a rostacsövekbe szúrják, és a cukros nedvet szívják.',
        uni: 'A szállítás a **Münch-féle nyomásáramlás** (1930) szerint történik: a **forrásban** (levél) a szacharóz aktív berakodása (apoplasztikus úton H⁺–szacharóz **szimporterrel**, SUC/SUT) csökkenti az ozmotikus potenciált, víz lép be a farészből, nő a turgornyomás (akár 1–2 MPa); a **nyelőben** (gyökér, termés) a cukor kiürül, a víz kilép, a nyomás csökken. A nyomáskülönbség tömegáramlást hajt, kb. 0,5–1 m/óra sebességgel. A szacharóz (glükóz és fruktóz α-1,β-2 glikozidkötéssel) **nem redukáló** cukor, ezért szállítás közben kémiailag stabil.',
        fact: 'A juharszirup a cukorjuhar törzsében tavasszal felfelé áramló cukros nedvből készül: kb. 40 liter nedvből lesz 1 liter szirup.'
      },
      {
        id: 'kloroplasztisz', z: 5, name: 'Zöld színtest (kloroplasztisz)', svg: kloro, explode: [0, 0], badge: [580, 100], en: 'chloroplast: thylakoid, granum, stroma', latin: 'chloroplastus (thylakoidum, granum, stroma)',
        lesson: 'biologia/sejt', terms: ['kemia-bsc/redoxi', 'kemia-bsc/elektrodpotencial', 'kemia-bsc/ph'],
        what: 'A fotoszintézis **„üzeme”**: a levélsejtekben lévő, kb. 5–10 µm-es, lencse alakú sejtalkotó. Belsejében lapos, zsákszerű hártyák, a **tilakoidok** vannak, amelyek pénzérmékhez hasonló oszlopokba, **gránumokba** rendeződnek. A tilakoidhártyában ül a **klorofill**: itt zajlik a **fényszakasz** (fényelnyelés, a víz bontása, energiatárolás). A tilakoidokat körülvevő folyadékban, a **sztrómában** épül fel a cukor a **Calvin-ciklusban**.',
        madeOf: '**Kettős hártya** határolja. Belül a tilakoidhártyákban a fényelnyelő festékek (klorofillok, karotinoidok) fehérjékhez kötve, nagy **fotokémiai rendszerekbe** (fotoszisztémákba) rendeződnek, mellettük elektronszállító fehérjék és az **ATP-szintáz** „turbinái”. A sztrómában enzimek (köztük a **RuBisCO**), saját **DNS**, riboszómák és **keményítőszemcsék** vannak.',
        how: 'A színtestek nem keletkeznek újonnan: **kettéosztódással** szaporodnak, mint a baktériumok, és a sejt osztódásakor az utódsejtek között oszlanak meg. Ez az ősi eredetükre utal: kb. 1,5 milliárd éve egy **kékbaktériumot** (cianobaktériumot) bekebelezett egy sejt, de nem emésztette meg, hanem együtt élt vele (**endoszimbiózis**). Ezért van saját DNS-ük és kettős hártyájuk. Sötétben nevelt csíranövényben a színtestek nem zöldülnek ki (sárgák maradnak), csak fény hatására épül fel a tilakoidrendszer és a klorofill.',
        uni: 'A **fényszakasz** a tilakoidhártyában (Z-séma): **PSII** (P680) → plasztokinon → **citokróm b₆f** → plasztocianin → **PSI** (P700) → ferredoxin → FNR → **NADPH**. A PSII vízbontó komplexe (Mn₄CaO₅-klaszter) négy egymást követő fotonelnyeléssel oxidál két vízmolekulát: 2 H₂O → O₂ + 4 H⁺ + 4 e⁻. Az elektrontranszport protonokat pumpál a **lumenbe** (pH kb. 5) a sztrómából (pH kb. 8): ΔpH ≈ 3. Ezt a protongradienst (**proton-mozgatóerő**) használja az ATP-szintáz (CF₀CF₁): a forgó c-gyűrű kb. 14 alegysége miatt kb. 4,7 H⁺ jut egy ATP-re (**kemiozmózis**, Mitchell). A **Calvin-ciklus** a sztrómában: a RuBisCO a CO₂-t ribulóz-1,5-biszfoszfátra köti (2 × 3-foszfoglicerát), amely ATP és NADPH felhasználásával glicerinaldehid-3-foszfáttá redukálódik; CO₂-molekulánként 3 ATP és 2 NADPH fogy.',
        fact: 'A RuBisCO valószínűleg a Föld leggyakoribb fehérjéje, mégis lassú enzim: másodpercenként csak kb. 3 CO₂-molekulát köt meg, ezért kell belőle ennyi.'
      },
      {
        id: 'klorofill', z: 5, name: 'Klorofill-molekula', svg: klorofill, explode: [0, 0], badge: [572, 372], en: 'chlorophyll a (porphyrin ring with Mg²⁺, phytol tail)', latin: 'chlorophyllum a',
        link: 'atom', lesson: 'biologia/sejt', terms: ['fizika-bsc/fotoeffektus', 'kemia-bsc/molekulapalya'],
        what: 'A növények **zöld festékanyaga**, amely **elnyeli a napfényt**, és energiáját a fotoszintézis számára hasznosítja. Főleg a **kék** és a **vörös** fényt nyeli el; a **zöld** fényt alig, azt visszaveri és átengedi: ezért látjuk zöldnek a leveleket. Ősszel, amikor a klorofill lebomlik, előtűnnek a mellette lévő **sárga és narancs** színű karotinoidok.',
        madeOf: 'Egy lapos, négy kis gyűrűből összekapcsolódó **porfirinvázból** („fej”) és egy hosszú, 20 szénatomos **fitol-láncból** („farok”) áll. A fej közepén egy **magnéziumion** ül, amelyet négy **nitrogénatom** fog közre. Képlete (klorofill-a): C₅₅H₇₂O₅N₄Mg. A fej sok **váltakozó egyszeres és kettős kötése** (konjugált rendszere) miatt képes a látható fény elnyelésére.',
        how: 'A növény **glutaminsavból** (egy aminosavból) állítja elő a színtestben, több mint tíz enzimes lépésben; az utolsó lépések egyikéhez a zárvatermőknél **fény** kell, ezért sárgák a sötétben csírázó hajtások. A magnéziumot a talajból veszi fel: magnéziumhiányban a levelek erek közötti része **sárgul** (klorózis). Működés: egy foton elnyelésekor a molekula egyik elektronja **magasabb energiájú pályára** ugrik (gerjesztés); ezt az energiát a szomszédos klorofillok egymásnak adják tovább, amíg el nem jut a reakciócentrumhoz.',
        uni: 'A klorofill-a elnyelési maximumai kb. **430 nm** (Soret-sáv) és **662 nm** (Q-sáv); a klorofill-b-é kb. 453 és 642 nm. A gerjesztés a delokalizált π-rendszer **HOMO→LUMO** átmenete. Egy foton energiája `E = h·c/λ`: 680 nm-en kb. 1,82 eV, azaz kb. 176 kJ/mol fotonra. A fénygyűjtő **antennakomplexekben** (LHCII) a gerjesztési energia rezonanciaenergia-átadással (**Förster-mechanizmus**, ~1/R⁶ távolságfüggés) pikoszekundumok alatt jut a reakciócentrum **különleges klorofillpárjához** (P680, P700), ahol **töltésszétválás** történik: a gerjesztett klorofill elektront ad le (erős redukálószer lesz), majd a P680⁺ a legerősebb biológiai oxidálószerként (kb. +1,2 V) a víztől veszi vissza az elektront.',
        fact: 'A klorofill szerkezete feltűnően hasonlít a vér hemjére: ott a gyűrű közepén magnézium helyett vas ül.'
      },
      {
        id: 'sejtfal', z: 5, name: 'Sejtfal és vakuólum (egy levélsejt)', svg: sejt, explode: [0, 0], badge: [140, 494], en: 'plant cell wall (cellulose) and central vacuole (tonoplast)', latin: 'paries cellularis, vacuola centralis (tonoplastus)',
        link: 'sejt', lesson: 'biologia/sejt', terms: ['szerves-kemia/szenhidrat', 'szerves-kemia/polimer'],
        what: 'A növényi sejteket – az állati sejtekkel ellentétben – szilárd **sejtfal** veszi körül, a belsejük nagy részét pedig egy hatalmas, folyadékkal teli **vakuólum** (sejtnedvűr) tölti ki. A kettő együtt adja a sejtek **feszességét**: a vakuólum vizet szív magába, és belülről a falnak nyomódik, mint a felfújt belső gumi a köpenynek. Ettől áll ki a levél; ha a növény vizet veszít, a nyomás csökken, és a levél **lekonyul** (hervad).',
        madeOf: 'A sejtfal fő anyaga a **cellulóz**: hosszú szőlőcukor-láncok, amelyek erős rostokba (mikrofibrillumokba) állnak össze, és amelyeket **hemicellulóz** és **pektin** ragaszt össze. A szomszédos sejtek falán apró csatornák (**plazmodezmák**) vezetnek át. A vakuólumot saját hártya határolja; benne víz, sók, cukrok, savak, festékek (pl. a vörös antociánok) és tartalékanyagok vannak.',
        how: 'Osztódáskor az utódsejtek között egy **sejtlemez** épül fel, erre rakódnak rétegesen a cellulózrostok; a fiatal fal még nyújtható, így a sejt nőhet. A cellulózt a sejthártyában ülő **enzimkomplexek** „fonják” közvetlenül a falba, glükózból. A fiatal sejtben sok kis vakuólum van, amelyek a sejt növekedésekor **egyetlen nagy vakuólummá** olvadnak össze: a sejt így olcsón, főleg vízzel „növeli” a térfogatát.',
        uni: 'A cellulóz **β-1,4-glikozidkötéssel** kapcsolódó glükózegységekből álló lineáris polimer; a láncok közötti kiterjedt **hidrogénkötés-hálózat** kristályos, nagy szakítószilárdságú mikrofibrillumokat hoz létre (fajlagosan az acélhoz mérhető). A sejt vízforgalmát a **vízpotenciál** írja le: Ψ = Ψ_π + Ψ_p; a vakuólum oldott anyagai negatív ozmotikus potenciált (Ψ_π) adnak, a fal ellennyomása pozitív turgort (Ψ_p, kb. 0,5–1 MPa). A tonoplaszt **V-ATPáza** protonokat pumpál a vakuólumba (pH kb. 5), ez hajtja az ionok és cukrok antiport-felvételét. Hipertóniás oldatban a protoplaszt elválik a faltól (**plazmolízis**).',
        fact: 'A cellulóz a Föld leggyakoribb szerves anyaga: a pamut szinte tiszta cellulóz, és a papír is ebből készül.'
      }
    ],
    uni: {
      text: 'A fotoszintézis energetikailag egy **fényhajtotta redoxifolyamat**: elektronokat visz a vízből (redoxipotenciál: O₂/H₂O ≈ +0,82 V) a NADP⁺-ra (NADP⁺/NADPH ≈ −0,32 V), azaz „hegynek felfelé”. Két elektronra ez `ΔG = −n·F·ΔE ≈ 2 · 96 485 · 1,14 ≈ +220 kJ/mol` befektetést jelent, amit a két fotokémiai rendszer egy-egy fotonja fedez (Z-séma). Az összesített reakció 6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂ szabadentalpia-változása kb. **+2870 kJ/mol**, ez pontosan a glükóz égésének (és sejtlégzésének) fordítottja.\n\n**Fotonmérleg:** egy O₂ felszabadításához (4 elektron, két fotorendszeren át) legalább **8 foton** kell, a mért érték 9–10; egy glükózhoz tehát kb. 48–60 foton. 680 nm-en egy mol foton energiája kb. 176 kJ, így 48 mol foton kb. 8450 kJ: a fotonenergia kb. egyharmada kerül a cukorba. A szántóföldi hatásfok (beeső napenergia → biomassza) mégis csak kb. **1–2%**, mert a napfény fele a 400–700 nm-es tartományon kívül esik, a fény egy része visszaverődik, telítődés, légzés és **fotorespiráció** is csökkenti (a RuBisCO CO₂ helyett O₂-t is megköthet). A C₄- és CAM-növények ezt CO₂-koncentráló mechanizmusokkal csökkentik.\n\nA CO₂ megkötésére a **Calvin–Benson-ciklus** szolgál: 3 CO₂ + 9 ATP + 6 NADPH → 1 glicerinaldehid-3-foszfát (+ 8 Pᵢ, 9 ADP, 6 NADP⁺). Az ATP a kemiozmotikus elv szerint a tilakoidhártyán felépülő **proton-mozgatóerőből** (Δp = Δψ − 2,3·(RT/F)·ΔpH) készül.',
      terms: ['fizika-bsc/fotoeffektus', 'kemia-bsc/redoxi', 'kemia-bsc/elektrodpotencial', 'kemia-bsc/gibbs', 'kemia-bsc/ph', 'szerves-kemia/szenhidrat']
    },
    steps: [
      { icon: '☀️', title: '1. Fényelnyelés', text: 'A napfény átjut az átlátszó **kutikulán** és a **felső bőrszöveten**, és az **oszlopos alapszövet** sejtjeibe ér. A **zöld színtestekben** a **klorofill**-molekulák elnyelik a kék és a vörös fényt. Egy foton elnyelésekor a klorofill egyik elektronja **gerjesztett** (magasabb energiájú) állapotba kerül; ezt az energiát a molekulák egymásnak adják tovább, mint egy labdát, amíg el nem jut a reakciócentrumhoz.', parts: ['kutikula', 'felso', 'oszlopos', 'klorofill'] },
      { icon: '💧', title: '2. Víz érkezik a farészen', text: 'A gyökerek által felvett víz a szár és a levélerek **farészén** át jut a levélbe, onnan pedig sejtről sejtre a fotoszintetizáló sejtekhez. A vízre két okból is szükség van: ez lesz az **elektronok és a hidrogén forrása**, és ez tartja feszesen a sejteket.', parts: ['faresz', 'oszlopos', 'szivacsos'] },
      { icon: '⚡', title: '3. A víz bontása – oxigén szabadul fel', text: 'A tilakoidhártyában a gerjesztett klorofill elektront ad le. A hiányzó elektront a **vízből** pótolja: a vízmolekulák felbomlanak, **oxigén**, hidrogénionok (H⁺) és elektronok keletkeznek (2 H₂O → O₂ + 4 H⁺ + 4 e⁻). A belélegzett **oxigén tehát a vízből származik**, nem a szén-dioxidból! Az oxigén a sejtközötti járatokon és a gázcserenyílásokon át távozik.', parts: ['kloroplasztisz', 'klorofill'] },
      { icon: '🔋', title: '4. Energiatárolás: ATP és NADPH', text: 'Az elektronok fehérjék láncán haladnak tovább, és közben **hidrogénionokat pumpálnak** a tilakoidok belsejébe. Egy második fényelnyelés (a másik fotokémiai rendszerben) újra „megemeli” az energiájukat, és végül a **NADPH** nevű molekulára kerülnek. A felgyűlt hidrogénionok az **ATP-szintáz** „turbináján” át áramlanak vissza, amely közben **ATP**-t (a sejtek „energiapénzét”) gyárt. Ez a **kemiozmózis**.', parts: ['kloroplasztisz'] },
      { icon: '🌬️', title: '5. Szén-dioxid jut a levélbe', text: 'A levegő **szén-dioxidja** a nyitott **gázcserenyílásokon** át a **légudvarba**, majd a **szivacsos alapszövet** sejtközötti járataiba áramlik, és a nedves sejtfalakon át beoldódik a sejtekbe, egészen a színtestek **sztrómájáig**.', parts: ['sztoma', 'szivacsos', 'also'] },
      { icon: '🔄', title: '6. Calvin-ciklus: a szén-dioxid megkötése', text: 'A sztrómában a **RuBisCO** enzim a szén-dioxidot egy 5 szénatomos cukorhoz köti. A keletkező vegyületeket a fényszakaszban készült **ATP** és **NADPH** energiájával 3 szénatomos cukorrá (glicerinaldehid-foszfáttá) **redukálja** a sejt. A körfolyamat végén az 5 szénatomos „kezdő” molekula újra előáll, így a ciklus folyamatosan forog. Ezt a szakaszt nevezték régen „sötétszakasznak”, de nappal, fényben működik.', parts: ['kloroplasztisz'] },
      { icon: '🍬', title: '7. Cukor készül', text: 'A 3 szénatomos cukrokból **szőlőcukor** (glükóz), majd ebből **keményítő** (raktározás a színtestben) vagy **szacharóz** (szállítás) épül. Hat körből (hat megkötött CO₂-ből) lesz egy glükóz: **6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂**. A cukor egy részéből **cellulóz** lesz a sejtfalakhoz, más részét a sejt saját **légzésére** használja.', parts: ['kloroplasztisz', 'oszlopos', 'sejtfal'] },
      { icon: '🚚', title: '8. Szállítás a háncsban', text: 'A szacharózt a sejtek a levélerek **háncsrészébe** pumpálják. A cukoroldat a **rostacsövekben** oda áramlik, ahol szükség van rá: a növekvő hajtásba, a gyökerekbe, a virágokba, a termésekbe és a raktározó szervekbe (pl. a burgonyagumóba, ahol újra keményítővé alakul).', parts: ['hancsresz'] },
      { icon: '💨', title: '9. Párologtatás és a gázcserenyílás nyitása–zárása', text: 'A nyitott gázcserenyílásokon nemcsak CO₂ lép be, hanem **vízpára is távozik** (párologtatás, transzspiráció): ez hűti a levelet, és „szívja” fel a vizet a farészben a gyökerektől. Fényben a **zárósejtek** kálium-ionokat vesznek fel, vizet szívnak magukba, meggörbülnek, és a rés **kinyílik**. Szárazságban az abszcizinsav hormon hatására a zárósejtek vizet veszítenek, és a rés **bezárul**: a növény ilyenkor vizet spórol, de a fotoszintézis is lelassul.', parts: ['sztoma', 'faresz', 'also'] }
    ],
    history: [
      { year: 'kb. 1640', text: 'Jan Baptist **van Helmont** flamand tudós egy fűzfacsemetét ültetett egy dézsányi lemért földbe, és öt évig csak vízzel öntözte. A fa kb. 74 kg-ot gyarapodott, a föld tömege alig változott. Arra következtetett, hogy a növény anyaga a **vízből** származik. (A levegő szerepére még nem gondolt.)' },
      { year: '1771', text: 'Joseph **Priestley** angol lelkész és kémikus lezárt üvegbúra alá égő gyertyát tett: az elaludt, és egy egér sem élt meg a „megrontott” levegőben. Ha viszont egy **mentaágat** tett a búra alá, a növény néhány nap alatt **„helyreállította” a levegőt**: a gyertya újra égett, az egér életben maradt. (Később, 1774-ben ő fedezte fel az oxigént.)' },
      { year: '1779', text: 'Jan **Ingenhousz** holland orvos (a bécsi császári udvar orvosa) kimutatja, hogy a növények csak **fényben** és csak **zöld részeikkel** termelnek „javított” levegőt (oxigént), sötétben pedig, mint az állatok, „rontják” a levegőt.' },
      { year: '1804', text: 'Nicolas-Théodore de **Saussure** svájci kémikus pontos mérésekkel igazolja, hogy a növény a tömeggyarapodását a levegő **szén-dioxidjából** és a **vízből** együtt nyeri: így áll össze a fotoszintézis egyenletének két kiindulási anyaga.' },
      { year: '1862–1864', text: 'Julius **Sachs** német növényfiziológus kimutatja, hogy fény hatására a **színtestekben keményítő** keletkezik: a levél egy részét letakarta, majd jódoldattal megfestette, és csak a megvilágított részek kékültek meg. Ezzel a fotoszintézist a kloroplasztiszokhoz kötötte.' },
      { year: '1882', text: 'Theodor Wilhelm **Engelmann** német biológus prizmával színeire bontott fénnyel világít meg egy fonalas zöldalgát, és oxigénkedvelő baktériumokat tesz mellé: a baktériumok a **vörös és a kék** fénnyel megvilágított szakaszok köré gyűlnek. Ez volt a fotoszintézis első **hatásspektruma**.' },
      { year: '1946–1961', text: 'Melvin **Calvin** Andrew Bensonnal és James Basshammal radioaktív **szén-14-gyel** jelölt CO₂-t adott algáknak, és papírkromatográfiával másodpercről másodpercre követte, mely vegyületekbe épül be a szén. Így felderítették a **Calvin-ciklust**. Calvin **1961-ben** kémiai Nobel-díjat kapott.' },
      { year: '1961–1978', text: 'Peter **Mitchell** angol biokémikus felveti a **kemiozmotikus elméletet**: az ATP-t a hártyán át kialakuló **protongradiens** energiája hajtja, nem egy közvetlen kémiai köztitermék. Kezdetben sokan kételkedtek, de a kísérletek (pl. Jagendorf savfürdős kísérlete színtestekkel, 1966) igazolták. Mitchell **1978-ban** kapott kémiai Nobel-díjat.' }
    ],
    quiz: [
      { q: 'Melyik levélrétegben van a legtöbb zöld színtest?', options: ['Az oszlopos alapszövetben', 'A felső bőrszövetben', 'A kutikulában', 'A farészben'], answer: 0, explain: 'Az oszlopos alapszövet a levél fő fotoszintetizáló rétege; a bőrszövet sejtjeiben (a zárósejtek kivételével) általában nincs színtest.' },
      { q: 'Honnan származik a fotoszintézis során felszabaduló oxigén?', options: ['A vízből', 'A szén-dioxidból', 'A glükózból', 'A klorofillból'], answer: 0, explain: 'A fényszakaszban a víz bomlik el (2 H₂O → O₂ + 4 H⁺ + 4 e⁻); ezt nehéz oxigénizotóppal (¹⁸O) jelölt vízzel igazolták.' },
      { q: 'Mi történik, amikor a zárósejtek vizet vesznek fel?', options: ['Megduzzadnak, meggörbülnek, és a rés kinyílik', 'Összezsugorodnak, és a rés bezárul', 'Cukrot kezdenek szállítani', 'Elhalnak, és üres csővé alakulnak'], answer: 0, explain: 'Nő a turgor, és mivel a rés felőli fal vastagabb, a zárósejtek meggörbülnek, a rés kinyílik.' },
      { q: 'Melyik szállítja a levélben készült cukrot a növény többi részébe?', options: ['A háncsrész rostacsövei', 'A farész vízszállító csövei', 'A gázcserenyílások', 'A sejtközötti járatok'], answer: 0, explain: 'A cukor (főleg szacharóz) a háncsrészben, élő rostacsövekben áramlik; a farész vizet és ásványi sókat szállít.' },
      { q: 'Miért zöld a legtöbb levél?', options: ['Mert a klorofill a zöld fényt alig nyeli el, hanem visszaveri', 'Mert a klorofill a zöld fényt nyeli el a legjobban', 'Mert a sejtfal zöld színű', 'Mert a vakuólum zöld festéket tartalmaz'], answer: 0, explain: 'A klorofill főleg a kék és a vörös fényt nyeli el; a visszavert és átengedett zöld fényt látjuk.' }
    ]
  });
})();
