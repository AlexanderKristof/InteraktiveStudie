/* Modell: nyomottvizes atomerőmű (PWR / VVER) – sematikus keresztmetszet.
 * Balra a védőépület (konténment) a reaktorral és a primer körrel, középen a gépház
 * (turbina, generátor, kondenzátor), jobbra a transzformátor, a távvezeték és a hűtőtorony.
 * Színkód: piros = forró primer víz, kék = hidegebb primer víz, szürke = gőz,
 * türkiz = tápvíz, narancs/világoskék = hűtővíz (meleg / hideg). */
(function () {
  var NS = ' pointer-events="none"';
  var shade = STUDIE.draw.shade;
  var GROUND = 480;
  function f(n) { return (+n).toFixed(1); }
  function rect(x, y, w, h, fill, stroke, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '" stroke="' + (stroke || 'rgba(0,0,0,.35)') + '" stroke-width="1"' + (extra || '') + '/>';
  }
  function poly(pts, fill, stroke, w, extra) {
    return '<polygon points="' + pts.map(function (p) { return f(p[0]) + ',' + f(p[1]); }).join(' ') + '" fill="' + fill + '" stroke="' + (stroke || 'rgba(0,0,0,.35)') + '" stroke-width="' + (w == null ? 1 : w) + '" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  function path(d, fill, stroke, w, extra) {
    return '<path d="' + d + '" fill="' + fill + '" stroke="' + (stroke || 'none') + '" stroke-width="' + (w == null ? 1 : w) + '" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  /* Cső töréspontokon át: átlátszó „kattintási” sáv, sötét kontúr, színes mag, csillanás. */
  function pipe(pts, color, w) {
    var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0] + ' ' + p[1]; }).join(' ');
    return '<path d="' + d + '" fill="none" stroke="transparent" stroke-width="' + (w + 8) + '" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + shade(color, 0.5) + '" stroke-width="' + (w + 2.4) + '" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + w + '" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="' + (w * 0.3).toFixed(1) + '" stroke-linejoin="round" stroke-linecap="round" transform="translate(-0.5 -0.7)"' + NS + '/>';
  }
  /* kis nyílhegy két pont között félúton (a → b irány) */
  function arrowAt(a, b, color) {
    var ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI, m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    return '<path d="M-5 -4.5 L5 0 L-5 4.5 Z" transform="translate(' + f(m[0]) + ' ' + f(m[1]) + ') rotate(' + f(ang) + ')" fill="' + color + '" stroke="#fff" stroke-width="1"' + NS + '/>';
  }
  function txt(x, y, s, cls, size, extra) {
    return '<text class="' + (cls || 'lbl-muted') + '" x="' + x + '" y="' + y + '"' + (size ? ' font-size="' + size + '"' : '') + (extra || '') + NS + '>' + s + '</text>';
  }

  var HOT = '#e0402e', COLD = '#2f6fd6', STEAM = '#a9b4c2', FEED = '#1fa39a', CW_WARM = '#f08a24', CW_COLD = '#4fb8e6';

  var defs = '<defs>' +
    '<linearGradient id="ae-concrete" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9c978c"/><stop offset=".5" stop-color="#c4bfb3"/><stop offset="1" stop-color="#8f8a80"/></linearGradient>' +
    '<linearGradient id="ae-steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5d6773"/><stop offset=".45" stop-color="#a9b3bf"/><stop offset="1" stop-color="#4f5864"/></linearGradient>' +
    '<linearGradient id="ae-core" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd36b"/><stop offset=".5" stop-color="#ff9a3c"/><stop offset="1" stop-color="#e8622c"/></linearGradient>' +
    '<linearGradient id="ae-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc3ee" stop-opacity=".85"/><stop offset="1" stop-color="#3f84cf" stop-opacity=".85"/></linearGradient>' +
    '<linearGradient id="ae-sg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6f7b8a"/><stop offset=".5" stop-color="#c3ccd6"/><stop offset="1" stop-color="#66717f"/></linearGradient>' +
    '<linearGradient id="ae-turb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d1db"/><stop offset=".5" stop-color="#8d99a8"/><stop offset="1" stop-color="#5e6a79"/></linearGradient>' +
    '<linearGradient id="ae-gen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fa6d8"/><stop offset=".5" stop-color="#3f6fae"/><stop offset="1" stop-color="#284b7d"/></linearGradient>' +
    '<linearGradient id="ae-tower" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8a49b"/><stop offset=".4" stop-color="#d9d5cc"/><stop offset="1" stop-color="#9a968d"/></linearGradient>' +
    '<radialGradient id="ae-glow" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#7fd6ff" stop-opacity=".55"/><stop offset="1" stop-color="#7fd6ff" stop-opacity="0"/></radialGradient>' +
    '</defs>';

  /* ---------- háttér: cím, talaj, jelmagyarázat ---------- */
  var backdrop = defs +
    '<text class="lbl" x="14" y="24" font-size="17">Nyomottvizes atomerőmű – sematikus metszet</text>' +
    '<text class="lbl-muted" x="14" y="42">három külön vízkör: a radioaktív primer kör sosem keveredik a turbina gőzével és a hűtővízzel</text>' +
    '<rect x="0" y="' + GROUND + '" width="1000" height="120" fill="rgba(140,120,90,.13)"' + NS + '/>' +
    '<line x1="0" y1="' + GROUND + '" x2="1000" y2="' + GROUND + '" stroke="rgba(120,100,70,.55)" stroke-width="1.5"' + NS + '/>' +
    '<rect x="356" y="150" width="372" height="330" rx="4" fill="rgba(140,155,175,.07)" stroke="rgba(120,135,155,.45)" stroke-dasharray="5 4"' + NS + '/>' +
    txt(720, 166, 'gépház', 'lbl-muted', 11, ' text-anchor="end"') +
    '<g transform="translate(372 566)"' + NS + '>' +
    '<rect x="0" y="-9" width="22" height="6" rx="3" fill="' + HOT + '"/><text class="lbl-muted" x="28" y="-2" font-size="11">forró primer víz (~300 °C)</text>' +
    '<rect x="180" y="-9" width="22" height="6" rx="3" fill="' + COLD + '"/><text class="lbl-muted" x="208" y="-2" font-size="11">visszatérő primer víz</text>' +
    '<rect x="360" y="-9" width="22" height="6" rx="3" fill="' + STEAM + '"/><text class="lbl-muted" x="388" y="-2" font-size="11">gőz</text>' +
    '<rect x="0" y="9" width="22" height="6" rx="3" fill="' + FEED + '"/><text class="lbl-muted" x="28" y="16" font-size="11">tápvíz (szekunder kör)</text>' +
    '<rect x="180" y="9" width="22" height="6" rx="3" fill="' + CW_WARM + '"/><text class="lbl-muted" x="208" y="16" font-size="11">felmelegedett hűtővíz</text>' +
    '<rect x="360" y="9" width="22" height="6" rx="3" fill="' + CW_COLD + '"/><text class="lbl-muted" x="388" y="16" font-size="11">lehűlt hűtővíz</text></g>';

  /* ---------- 1. Konténment (védőépület): vasbeton fal acélbéléssel ---------- */
  var CX = 175;
  var shellOut = 'M30 ' + GROUND + ' L30 260 A145 145 0 0 1 320 260 L320 ' + GROUND + ' Z';
  var shellIn = 'M44 ' + GROUND + ' L44 260 A131 131 0 0 1 306 260 L306 ' + GROUND + ' Z';
  var cont = path(shellIn, 'rgba(150,170,195,.10)', 'none', 0, NS) +
    path(shellOut + ' ' + shellIn, 'url(#ae-concrete)', '#5f5a52', 1.4, ' fill-rule="evenodd"') +
    path('M46 ' + GROUND + ' L46 260 A129 129 0 0 1 304 260 L304 ' + GROUND, 'none', '#5b6470', 2.2, NS) +
    rect(22, GROUND, 306, 14, '#8f8a80', '#5f5a52');
  for (var ry = 300; ry < GROUND; ry += 30) cont += '<line x1="31" y1="' + ry + '" x2="43" y2="' + ry + '" stroke="rgba(60,55,50,.35)" stroke-width="1"' + NS + '/><line x1="307" y1="' + ry + '" x2="319" y2="' + ry + '" stroke="rgba(60,55,50,.35)" stroke-width="1"' + NS + '/>';
  cont += txt(CX, 150, 'védőépület', 'lbl-muted', 11, ' text-anchor="middle"');

  /* ---------- 2. Reaktortartály ---------- */
  var VX = 115;
  var vessel = path('M80 312 L80 440 A35 35 0 0 0 150 440 L150 312 Z', 'url(#ae-steel)', '#3b434d', 1.2) +
    path('M87 312 L87 440 A28 28 0 0 0 143 440 L143 312 Z', 'url(#ae-water)', '#2f4e73', 0.8) +
    path('M93 330 L93 458 M137 330 L137 458', 'none', 'rgba(40,60,90,.55)', 1.4, NS) +        // zónakosár
    rect(74, 300, 82, 12, '#6f7a87', '#3b434d') +                                                 // karima
    path('M80 300 A35 20 0 0 1 150 300 Z', 'url(#ae-steel)', '#3b434d', 1.2) +                    // fedél
    rect(150, 330, 9, 10, '#6f7a87', '#3b434d') + rect(150, 355, 9, 10, '#6f7a87', '#3b434d');   // csonkok
  // áramlás a tartályban: a gyűrűs résben le, a zónán át fel
  vessel += '<path d="M90 345 L90 430" stroke="#2f6fd6" stroke-width="1.6" stroke-dasharray="4 3" fill="none"' + NS + '/>' +
    arrowAt([90, 400], [90, 430], COLD) + arrowAt([115, 372], [115, 340], HOT);

  /* ---------- 3. Fűtőelem-kazetták (aktív zóna) ---------- */
  var fuel = '<ellipse cx="' + VX + '" cy="418" rx="34" ry="40" fill="url(#ae-glow)"' + NS + '/>';
  for (var k = 0; k < 7; k++) {
    var fx = 95.5 + k * 6.4;
    fuel += rect(fx, 382, 5.4, 72, 'url(#ae-core)', '#9a4a1c', ' rx="1"') +
      '<line x1="' + f(fx + 2.7) + '" y1="384" x2="' + f(fx + 2.7) + '" y2="452" stroke="rgba(120,50,10,.45)" stroke-width=".7"' + NS + '/>';
  }
  fuel += rect(94, 378, 42, 4, '#8a94a0', '#4b5560') + rect(94, 454, 42, 4, '#8a94a0', '#4b5560');

  /* ---------- 4. Szabályozórudak és hajtásaik ---------- */
  var rods = '';
  [100, 115, 130].forEach(function (x, i) {
    rods += rect(x - 4, 236, 8, 48, '#7d8794', '#3b434d') +                 // hajtás-csőház a fedélen
      rect(x - 6, 224, 12, 13, '#4a525d', '#2b3138') +                     // motor / elektromágnes
      rect(x - 1.6, 284, 3.2, 112 - i * 6, '#2d333b', '#15191e', ' rx="1"');   // elnyelő rúd
  });
  rods += '<line x1="94" y1="224" x2="136" y2="224" stroke="#2b3138" stroke-width="2"' + NS + '/>';

  /* ---------- 5. Primer kör: melegág, hidegág, főkeringtető szivattyú, nyomástartó ---------- */
  var hotLeg = [[159, 335], [205, 335], [205, 428], [236, 428]];
  var coldLeg = [[268, 446], [268, 468], [190, 468]];
  var coldLeg2 = [[166, 468], [160, 468], [160, 360], [159, 360]];
  var primary = pipe(hotLeg, HOT, 6) + pipe(coldLeg, COLD, 6) + pipe(coldLeg2, COLD, 6) +
    pipe([[187, 296], [187, 335]], HOT, 3) +                                                                 // kiegyenlítő vezeték
    arrowAt(hotLeg[0], hotLeg[1], HOT) + arrowAt(hotLeg[1], hotLeg[2], HOT) + arrowAt(coldLeg[1], coldLeg[2], COLD) + arrowAt(coldLeg2[1], coldLeg2[2], COLD);
  // főkeringtető szivattyú
  primary += '<circle cx="178" cy="468" r="12" fill="#5b6b7c" stroke="#2c3540" stroke-width="1.2"/>' +
    '<circle cx="178" cy="468" r="4" fill="#9aa7b6" stroke="#2c3540" stroke-width=".8"' + NS + '/>' +
    rect(170, 436, 16, 21, '#2f7d8c', '#1d4e57', ' rx="2"');
  for (var pf = 440; pf < 456; pf += 4) primary += '<line x1="171" y1="' + pf + '" x2="185" y2="' + pf + '" stroke="rgba(255,255,255,.3)" stroke-width="1"' + NS + '/>';
  // nyomástartó edény: gőzpárna felül, víz alul, fűtőpálcák, permetező
  primary += path('M173 205 A14 14 0 0 1 201 205 L201 282 A14 14 0 0 1 173 282 Z', 'url(#ae-sg)', '#3b434d', 1.2) +
    path('M177 242 L197 242 L197 282 A10 10 0 0 1 177 282 Z', 'rgba(70,140,215,.75)', 'none', 0, NS) +
    path('M177 242 L197 242', 'none', '#cfe6ff', 1.2, NS) +
    path('M181 268 L181 290 M187 268 L187 292 M193 268 L193 290', 'none', '#ff8a3c', 1.6, NS) +
    path('M180 212 L194 212 M183 216 L183 222 M187 216 L187 223 M191 216 L191 222', 'none', '#cfe6ff', 1, NS);

  /* ---------- 6. Gőzfejlesztő (függőleges, U-csöves) ---------- */
  var sg = path('M232 206 A27 14 0 0 1 286 206 L286 252 L280 268 L280 432 A21 16 0 0 1 238 432 L238 268 L232 252 Z', 'url(#ae-sg)', '#3b434d', 1.3) +
    path('M243 300 L275 300 L275 410 L243 410 Z', 'rgba(110,170,230,.55)', 'none', 0, NS) +            // szekunder víz
    path('M238 232 L280 232', 'none', 'rgba(255,255,255,.55)', 1, NS) +                                 // nedvességleválasztó
    path('M240 412 L278 412', 'none', '#3b434d', 2.4, NS) +                                              // csőfal
    path('M259 412 L259 446', 'none', '#3b434d', 1.6, NS);                                               // osztófal a kamrában
  [6, 11, 16].forEach(function (d) {   // U-csövek: a forró ág balra, a lehűlt ág jobbra
    sg += path('M' + (259 - d) + ' 412 L' + (259 - d) + ' ' + (300 - d * 1.5) + ' A' + d + ' ' + d + ' 0 0 1 ' + (259 + d) + ' ' + (300 - d * 1.5) + ' L' + (259 + d) + ' 412', 'none', '#e06a3a', 1.6, NS);
  });
  sg += txt(259, 196, 'gőz', 'lbl-muted', 10, ' text-anchor="middle"');

  /* ---------- 7. Szekunder kör: gőzvezeték, tápvíz, tápszivattyú ---------- */
  var steamL = [[259, 193], [259, 178], [405, 178], [405, 278]];
  var crossL = [[440, 270], [440, 236], [525, 236], [525, 247]];
  var feedL = [[480, 431], [480, 452], [432, 452]];
  var feedL2 = [[408, 452], [340, 452], [340, 382], [281, 382]];
  var secondary = pipe(steamL, STEAM, 7) + pipe(crossL, STEAM, 8) + pipe(feedL, FEED, 5) + pipe(feedL2, FEED, 5) +
    arrowAt(steamL[1], steamL[2], '#6b7889') + arrowAt(crossL[1], crossL[2], '#6b7889') + arrowAt(feedL2[2], feedL2[3], FEED) + arrowAt(feedL2[0], feedL2[1], FEED);
  secondary += '<circle cx="420" cy="452" r="12" fill="#3b8f86" stroke="#1f5a54" stroke-width="1.2"/>' +
    '<path d="M413 452 L427 452 M420 445 L420 459" stroke="#d9f3ef" stroke-width="1.6"' + NS + '/>' +
    rect(484, 222, 34, 12, '#8d99a8', '#4b5560', ' rx="3"') + txt(501, 216, 'cseppleválasztó', 'lbl-muted', 9, ' text-anchor="middle"') +
    txt(296, 170, '~260–290 °C, 45–70 bar', 'lbl-muted', 10);

  /* ---------- 8. Gőzturbina (nagy- és kisnyomású ház, közös tengely) ---------- */
  var turb = '<line x1="380" y1="300" x2="612" y2="300" stroke="#3b434d" stroke-width="6" stroke-linecap="round"/>' +
    poly([[390, 278], [450, 266], [450, 334], [390, 322]], 'url(#ae-turb)', '#3b434d', 1.3) +
    poly([[460, 254], [525, 247], [590, 254], [590, 346], [525, 353], [460, 346]], 'url(#ae-turb)', '#3b434d', 1.3);
  for (var bx = 396; bx < 448; bx += 8) {   // lapátsorok (kicsi → nagy)
    var hh = 12 + (bx - 396) * 0.35;
    turb += '<line x1="' + bx + '" y1="' + f(300 - hh) + '" x2="' + bx + '" y2="' + f(300 + hh) + '" stroke="rgba(40,48,58,.55)" stroke-width="2"' + NS + '/>';
  }
  for (var lb = 0; lb < 5; lb++) {
    var h2 = 18 + lb * 6;
    turb += '<line x1="' + (530 + lb * 12) + '" y1="' + (300 - h2) + '" x2="' + (530 + lb * 12) + '" y2="' + (300 + h2) + '" stroke="rgba(40,48,58,.55)" stroke-width="2.2"' + NS + '/>' +
      '<line x1="' + (520 - lb * 12) + '" y1="' + (300 - h2) + '" x2="' + (520 - lb * 12) + '" y2="' + (300 + h2) + '" stroke="rgba(40,48,58,.55)" stroke-width="2.2"' + NS + '/>';
  }
  turb += txt(420, 352, 'NNY', 'lbl-muted', 10, ' text-anchor="middle"') + txt(525, 268, 'KNY', 'lbl-muted', 10, ' text-anchor="middle"');

  /* ---------- 9. Generátor (szinkrongenerátor gerjesztővel) ---------- */
  var gen = '<line x1="600" y1="300" x2="716" y2="300" stroke="#3b434d" stroke-width="6" stroke-linecap="round"/>' +
    rect(610, 262, 82, 76, 'url(#ae-gen)', '#1f3a60', ' rx="10"') +
    rect(694, 286, 18, 28, '#5d7fae', '#1f3a60', ' rx="3"');
  for (var gx = 620; gx < 686; gx += 8) gen += '<line x1="' + gx + '" y1="266" x2="' + gx + '" y2="334" stroke="rgba(255,255,255,.18)" stroke-width="2"' + NS + '/>';
  gen += '<text x="651" y="304" font-size="12" font-weight="700" fill="#e8f0fb" text-anchor="middle"' + NS + '>G ~</text>' +
    path('M700 286 L700 270 L748 270 L748 384', 'none', '#c99a3c', 3.2) + txt(704, 262, '~16–24 kV', 'lbl-muted', 10);

  /* ---------- 10. Kondenzátor ---------- */
  var cond = poly([[470, 352], [580, 352], [598, 372], [452, 372]], '#7f8b9a', '#3b434d', 1.1) +
    rect(452, 372, 146, 58, '#9aa6b5', '#3b434d', ' rx="4"') + rect(468, 430, 24, 6, '#7f8b9a', '#3b434d');
  for (var ty = 382; ty < 424; ty += 6) cond += '<line x1="458" y1="' + ty + '" x2="592" y2="' + ty + '" stroke="' + (ty < 402 ? '#e8a25a' : '#6fb7e0') + '" stroke-width="2"' + NS + '/>';
  cond += rect(592, 380, 10, 44, '#7f8b9a', '#3b434d');
  cond += txt(525, 446, 'vákuum ~0,05 bar', 'lbl-muted', 9.5, ' text-anchor="middle"');

  /* ---------- 11. Hűtőtorony és hűtővízkör ---------- */
  var warmL = [[602, 390], [616, 390], [616, 506], [904, 506], [904, 440]];
  var coldL = [[868, 476], [868, 524], [632, 524], [632, 418], [602, 418]];
  var tower = pipe(warmL, CW_WARM, 6) + pipe(coldL, CW_COLD, 6) +
    arrowAt(warmL[2], warmL[3], CW_WARM) + arrowAt(coldL[2], coldL[3], CW_COLD);
  tower += path('M834 480 Q872 360 852 226 L948 226 Q928 360 966 480 Z', 'url(#ae-tower)', '#6d6960', 1.4) +
    path('M846 226 L954 226', 'none', '#6d6960', 3) +
    path('M842 480 L850 462 L858 480 M866 480 L874 462 L882 480 M918 480 L926 462 L934 480 M942 480 L950 462 L958 480', 'none', '#6d6960', 1.4, NS) +
    rect(840, 470, 120, 10, 'rgba(79,184,230,.8)', '#2f6f99') +
    path('M874 440 L934 440', 'none', '#4a5560', 2.4, NS);
  for (var dr = 878; dr < 934; dr += 8) tower += '<line x1="' + dr + '" y1="444" x2="' + (dr - 2) + '" y2="466" stroke="#4fb8e6" stroke-width="1.2" stroke-dasharray="2 3"' + NS + '/>';
  // vízgőz-csóva (nem füst!)
  tower += '<g fill="#eef2f6" stroke="#b9c2cc" stroke-width="1" opacity=".95">' +
    '<circle cx="884" cy="212" r="18"/><circle cx="912" cy="200" r="22"/><circle cx="940" cy="208" r="16"/><circle cx="902" cy="180" r="16"/><circle cx="928" cy="174" r="13"/></g>' +
    txt(900, 340, 'hűtőtorony', 'lbl', 11, ' text-anchor="middle"') +
    txt(760, 545, 'vagy folyóvíz (Paks: Duna)', 'lbl-muted', 10.5, ' text-anchor="middle"');

  /* ---------- 12. Főtranszformátor és távvezeték ---------- */
  var trafo = rect(718, 408, 62, 70, '#6c7b6a', '#36402f', ' rx="3"');
  for (var fn = 0; fn < 5; fn++) trafo += rect(706, 414 + fn * 12, 12, 8, '#56634f', '#36402f') + rect(780, 414 + fn * 12, 12, 8, '#56634f', '#36402f');
  [732, 749, 766].forEach(function (x) {
    trafo += rect(x - 3, 388, 6, 20, '#d9d4c3', '#7a7462', ' rx="2"');
    for (var r = 392; r < 406; r += 4) trafo += '<line x1="' + (x - 5) + '" y1="' + r + '" x2="' + (x + 5) + '" y2="' + r + '" stroke="#a49e8a" stroke-width="1.6"' + NS + '/>';
  });
  trafo += '<text x="749" y="450" font-size="10" font-weight="700" fill="#e6eee0" text-anchor="middle"' + NS + '>400 kV</text>';
  // távvezeték-oszlop
  trafo += path('M790 480 L804 190 L818 480 M795 380 L813 380 M798 300 L810 300 M792 440 L816 440 M796 380 L812 440 M812 380 L796 440 M798 300 L812 380 M810 300 L796 380', 'none', '#5d6670', 1.8) +
    path('M786 214 L822 214 M790 236 L818 236', 'none', '#5d6670', 2.4) +
    path('M732 388 Q760 300 788 214 M749 388 Q776 310 790 236 M766 388 Q790 330 822 236', 'none', '#3d4650', 1, NS) +
    path('M822 214 Q890 222 1000 196 M818 236 Q890 244 1000 220', 'none', '#3d4650', 1, NS) +
    txt(828, 190, 'országos hálózat →', 'lbl-muted', 10);

  STUDIE.addModel({
    id: 'atomeromu',
    title: 'Atomerőmű (nyomottvizes reaktor)',
    icon: '☢️',
    color: '#2f9e6a',
    category: 'Energia',
    keywords: 'atomerőmű nukleáris erőmű nyomottvizes reaktor PWR VVER Paks Paksi Atomerőmű maghasadás láncreakció urán urán-dioxid fűtőelem kazetta neutron moderátor szabályozórúd bór konténment védőépület reaktortartály primer kör szekunder kör gőzfejlesztő főkeringtető szivattyú nyomástartó gőzturbina generátor kondenzátor hűtőtorony Duna transzformátor kiégett üzemanyag radioaktív hulladék Csernobil Fukusima Fermi',
    summary: 'Uránatomok hasadásának hőjével gőzt fejleszt, a gőz turbinát forgat, a turbina generátort: így lesz az atommagok energiájából áram.',
    scale: 'egy blokk: reaktortartály kb. 12 m magas, a hűtőtorony 100–200 m; 500–1600 MW villamos teljesítmény',
    viewBox: '0 0 1000 600',
    backdrop: backdrop,
    intro: 'Az atomerőmű lényegében egy **hőerőmű**: vizet forral, a gőz turbinát hajt, a turbina generátort. A különbség a **hőforrás**: szén vagy gáz égetése helyett **uránatommagok hasadása** termeli a hőt, szén-dioxid-kibocsátás nélkül.\n\nA nyomottvizes reaktorban **három különálló vízkör** van: a **primer kör** forró, nagy nyomású vize hűti a reaktort, de nem forr fel; a **gőzfejlesztőben** átadja a hőt a **szekunder kör** vizének, amely gőzzé válik és a turbinát hajtja; végül a **hűtővíz** (folyó vagy hűtőtorony) csapatja le a fáradt gőzt. Így a radioaktív víz sosem jut a turbinához. Magyarországon a **Paksi Atomerőmű** adja a hazai áramtermelés közel felét.',
    parts: [
      {
        id: 'kontenment', z: 0, name: 'Konténment (védőépület)', svg: cont, explode: [0, -50], badge: [60, 270], en: 'containment building (reinforced concrete with steel liner)',
        terms: ['mechanika/feszultseg', 'mechanika/biztonsagi-tenyezo'],
        what: 'Vastag falú, légmentesen zárt épület a reaktor és a teljes primer kör körül. Ez az utolsó **gát** a radioaktív anyagok és a környezet között: ha a primer kör egy csöve eltörne, a kiáramló gőzt és a radioaktív anyagot az épület bent tartja. Kívülről is véd: földrengés, árvíz, akár egy rázuhanó repülőgép ellen.',
        madeOf: '1–1,5 m vastag **vasbeton**, sok helyen **feszített** acélkábelekkel megerősítve, belül néhány milliméteres **acélbéléssel**, amely gáztömörré teszi. Benne **zsilipek** a személyeknek és az anyagszállításnak, és rengeteg szigetelt **átvezetés** a csöveknek és kábeleknek.',
        how: 'Helyben, csúszózsalus vagy szakaszos betonozással építik, az acélbélést darabokban hegesztik össze és betonozzák be. Átadás előtt **nyomáspróbát** tesznek vele: túlnyomásra fújják fel, és mérik, mennyi levegő szivárog el. Üzem közben is rendszeresen ellenőrzik a tömörségét.',
        uni: 'A tervezési alapot a legsúlyosabb feltételezett csőtörés (**LOCA**, loss-of-coolant accident) adja: a kiáramló víz gőzzé válik, a nyomás a konténmentben 3–5 bar túlnyomásig nőhet. A hengeres falban a gyűrűirányú feszültség `σ = p · r / t`, ezt a feszítőkábelek előfeszítése ellensúlyozza (a beton nyomásra jó, húzásra rossz). A belső tér hűtését **sprinkler-rendszer** és passzív hőelvezetés végzi; súlyos baleseti helyzetre **hidrogén-rekombinátorok** kerültek be (a cirkónium és a gőz reakciójából keletkező H₂ ne robbanhasson). A konténment a **mélységben tagolt védelem** utolsó fizikai gátja.',
        fact: 'A paksi VVER-440/213 blokkoknál nincs ilyen kupola: ott hermetikus helyiségrendszer és egy **buborékoltató kondenzátor** („lokalizációs torony”) fogja fel és csapatja le a kiáramló gőzt.'
      },
      {
        id: 'reaktortartaly', z: 2, name: 'Reaktortartály', svg: vessel, explode: [0, 0], badge: [64, 400], lesson: 'fizika/atom', en: 'reactor pressure vessel (RPV)',
        terms: ['mechanika/folyashatar', 'mechanika/feszultseg'],
        what: 'Óriási acél „kukta”, benne az **aktív zóna** a fűtőelemekkel. A víz alulról felfelé áramlik át a zónán, közben kb. 30 °C-ot melegszik. A nagy nyomás (120–155 bar) miatt a víz kb. 300 °C-on **sem forr fel**. A víz itt egyszerre **hűtőközeg** és **moderátor**: lelassítja a neutronokat.',
        madeOf: 'Kovácsolt, alacsonyan ötvözött **acél** gyűrűkből hegesztve, 14–25 cm vastag fallal, belül 5–10 mm-es **rozsdamentes acél** felrakóhegesztéssel (ez nem rozsdásodik a forró vízben). A fedelet több tucat óriási csavar szorítja le. Benne a **zónakosár** és a fűtőelem-kazetták tartószerkezete.',
        how: 'Néhány gyár képes a világon ekkora darabokat kovácsolni: több száz tonnás acéltömbökből préselik a gyűrűket, majd megmunkálják és összehegesztik őket. Minden varratot ultrahanggal és röntgennel vizsgálnak. Kb. 12 m magas, 4 m átmérőjű, több száz tonnás: vasúton vagy hajón szállítják az erőműbe.',
        uni: 'A tartály élettartamát a **neutronsugárzás okozta ridegedés** szabja meg: a gyors neutronok rácshibákat keltenek, emiatt a **rideg–szívós átmeneti hőmérséklet** (DBTT) idővel nő. Ezt a zóna mellé helyezett **próbatestekkel** (Charpy-ütővizsgálat) követik. Veszélyes helyzet a **nyomás alatti hősokk** (PTS): ha a forró, nagy nyomású tartályba hirtelen hideg víz kerül, a belső falban nagy húzófeszültség ébred. A hengeres héj falvastagságát a `σ = p · r / t` összefüggés közelíti: 155 bar, 2 m sugár és 200 MPa megengedett feszültség mellett `t ≈ 15–16 cm`. A paksi blokkok üzemidejét 50 évre hosszabbították, és folyik a további hosszabbítás előkészítése.',
        fact: 'A víz azért nem forr fel 300 °C-on, mert 155 bar nyomáson a forráspontja kb. 345 °C. Ugyanez az elv a kuktában, csak ott 1–2 bar és 120 °C.'
      },
      {
        id: 'futoelemek', z: 3, name: 'Fűtőelem-kazetták (urán-dioxid)', svg: fuel, explode: [0, 105], badge: [115, 418], link: 'atom', lesson: 'fizika/atom', en: 'fuel assemblies (UO₂ pellets in zirconium-alloy cladding)',
        terms: ['fizika-bsc/tomeg-energia', 'fizika-bsc/radioaktiv-bomlas'],
        what: 'Itt termelődik a hő. Az urán-235 atommagja egy lassú **neutront** elnyelve **kettéhasad**: két kisebb atommag, 2–3 új neutron és rengeteg energia keletkezik. Az új neutronok újabb magokat hasítanak: ez a **láncreakció**. A hasadási termékek szétrepülnek, és a pasztillában lefékeződve **hővé** alakul a mozgási energiájuk.',
        madeOf: 'Kb. 1 cm-es **urán-dioxid (UO₂) kerámia pasztillák**, amelyekben az urán-235 aránya 3–5%-ra van **dúsítva** (a természetes uránban csak 0,7%). A pasztillákat 3–4 m hosszú, vékony **cirkóniumötvözet** csövekbe töltik és lezárják: ez a **fűtőelem-pálca**. Több száz pálcát rácsokkal **kazettává** fognak össze (Pakson hatszög keresztmetszetű kazettákká).',
        how: 'Az uránércből sárga uránkoncentrátum („yellowcake”) lesz, ezt gázzá (UF₆) alakítják, és **centrifugákkal dúsítják**. A dúsított anyagból UO₂ port gyártanak, pasztillákká préselik, 1700 °C körül kerámiává **szinterelik**, majd pontos méretre köszörülik. A pálcákat héliummal töltik és hegesztéssel zárják. Egy kazetta 3–5 évig van a reaktorban; évente a zóna egy részét cserélik.',
        uni: 'Egy hasadásban kb. **200 MeV** szabadul fel, ennek kb. 80%-a a hasadványok mozgási energiája. A tömeghiányból: `E = Δm · c²`; 1 g U-235 teljes elhasadása kb. `8 · 10¹⁰ J ≈ 23 MWh` hő, azaz kb. 1 MW·nap. A láncreakció állapotát a **sokszorozási tényező** írja le: `k = n_(i+1) / n_i`. `k = 1` kritikus (állandó teljesítmény), `k > 1` szuperkritikus, `k < 1` szubkritikus. A négyfaktor-képlet szerint végtelen rácsra `k∞ = η · ε · p · f` (neutronhozam, gyorshasadási, rezonanciaszökési és termikus hasznosítási tényező). Az üzemanyag-kihasználtság (kiégés) tipikusan 40–60 MW·nap/kg urán.',
        fact: 'Egy cukorkocka méretű urán-dioxid pasztilla kb. annyi energiát ad, mint 1 tonna szén.'
      },
      {
        id: 'szabalyozorudak', z: 4, name: 'Szabályozórudak', svg: rods, explode: [0, -95], badge: [115, 230], en: 'control rods and control rod drive mechanisms (CRDM)',
        terms: ['fizika-bsc/radioaktiv-bomlas'],
        what: 'Neutronelnyelő anyagból készült rudak, amelyeket felülről lehet a zónába engedni. Ha **mélyebbre** engedik őket, több neutront nyelnek el, és a láncreakció lassul; ha **kihúzzák**, gyorsul. Vészhelyzetben (**reaktorleállítás**) az összes rúd néhány másodperc alatt, a saját súlyától **beesik**, és leállítja a láncreakciót.',
        madeOf: 'Neutronelnyelő **bór-karbid** (B₄C), **ezüst–indium–kadmium** ötvözet vagy **bóracél**, rozsdamentes acél burkolatban. A fedélen ülnek a **hajtások**: elektromágnesek vagy léptetőmotorok, amelyek fogják és mozgatják a rudakat.',
        how: 'Az elnyelő anyagot porból préselik vagy öntik, és acélcsövekbe zárják. A hajtások úgy vannak kialakítva, hogy áramszünet esetén **elengedjék** a rudakat: a hiba a biztonságos irányba hat („fail-safe”). A finom, hosszú távú szabályozáshoz a hűtővízbe oldott **bórsav** koncentrációját is változtatják.',
        uni: 'A reaktivitás `ρ = (k − 1) / k`. A szabályozhatóságot a **késő neutronok** teszik lehetővé: a hasadási neutronok kb. 0,65%-a (`β ≈ 0,0065` U-235-re) csak másodpercekkel később, a hasadványok bomlásából lép ki. Amíg `ρ < β` (**késő kritikus** állapot), a teljesítmény periódusideje másodperces–perces, így a mechanikus szabályozás bőven elég gyors. `ρ ≥ β` esetén a reaktor már a prompt neutronokkal is kritikus lenne (**prompt kritikus**), ezt minden üzemmódban el kell kerülni. Leállítás után sem szűnik meg a hőtermelés: a **remanens hő** kezdetben a névleges teljesítmény kb. 6–7%-a, egy nap múlva kb. 0,5%-a.',
        fact: 'A bór-10 izotóp kb. 3800 barn hatáskeresztmetszettel nyeli el a termikus neutronokat: több ezerszer jobban, mint a legtöbb szerkezeti anyag.'
      },
      {
        id: 'primer', z: 5, name: 'Primer kör: főkeringtető szivattyú és nyomástartó', svg: primary, explode: [0, 0], badge: [205, 380], en: 'primary loop: hot leg, cold leg, reactor coolant pump, pressurizer',
        terms: ['fizika-bsc/elso-fotetel', 'fizika-bsc/belso-energia'],
        what: 'Zárt csőkör, amelyben a reaktort hűtő víz kering. A **melegágon** (piros) a kb. 300 °C-os víz a gőzfejlesztőbe megy, a **hidegágon** (kék) kb. 270 °C-on tér vissza. A **főkeringtető szivattyú** hajtja körbe, a **nyomástartó edény** pedig állandó nyomáson tartja: felső részében gőzpárna van, alul elektromos fűtőpálcák, felül vízpermetező.',
        madeOf: 'Vastag falú, **rozsdamentes** vagy rozsdamentes béléses **acélcsövek** (50–80 cm belső átmérő). A szivattyú nagy teljesítményű villanymotorral hajtott **centrifugálszivattyú**, a nyomástartó kb. 10–15 m magas acéltartály. A víz nagyon tiszta, bórsavat és pH-állító vegyszert tartalmaz.',
        how: 'A csöveket kovácsolják vagy öntik, és a helyszínen hegesztik össze; minden varratot ellenőriznek. Indításkor a fűtőpálcák felforralják a nyomástartó felső részének vizét, így jön létre a gőzpárna. Ha a nyomás nő, a permetező hideg vizet fecskendez a gőzbe (az lecsapódik, a nyomás csökken); ha csökken, a fűtőpálcák kapcsolnak be.',
        uni: 'A szállított hőteljesítmény `Q̇ = ṁ · c_p · ΔT`: kb. 1400 MW hőhöz és 30 K melegedéshez (`c_p ≈ 5,4 kJ/(kg·K)` 300 °C-on) kb. 8–9 t/s tömegáram kell. Paks VVER-440 blokkjaiban **hat** hurok van, mindegyikben főkeringtető szivattyúval és vízszintes gőzfejlesztővel; a nyugati PWR-ekben 2–4 hurok. A nyomástartóban a víz és a gőz **telítési állapotban** van: a nyomást a gőzpárna hőmérséklete szabja meg, ezért fűtéssel és permetezéssel szabályozható. A szivattyúk nagy forgó tömege **lendkerékként** működik: áramkimaradáskor a víz még percekig áramlik, közben beindul a természetes cirkuláció.',
        fact: 'Egy főkeringtető szivattyú óránként több ezer köbméter vizet mozgat: egy olimpiai medencét néhány perc alatt átforgatna.'
      },
      {
        id: 'gozfejleszto', z: 3, name: 'Gőzfejlesztő', svg: sg, explode: [45, -25], badge: [259, 340], en: 'steam generator (U-tube heat exchanger)',
        terms: ['fizika-bsc/elso-fotetel', 'fizika-bsc/entropia'],
        what: 'Óriási hőcserélő, a primer és a szekunder kör határa. A forró primer víz több ezer vékony **U alakú csőben** áramlik, a csövek külső oldalán a szekunder kör vize **felforr**. A keletkező gőz felül, **cseppleválasztókon** át távozik a turbina felé. A két víz sosem keveredik: a csőfal választja el őket.',
        madeOf: 'Acél köpeny, benne 3–10 ezer korrózióálló **nikkelötvözet** (pl. Inconel) vagy rozsdamentes acél cső, kb. 2 cm átmérővel. A csövek egy vastag **csőfalba** vannak behengerelve és hegesztve. Felül ciklonos **nedvességleválasztók** és szárítók.',
        how: 'A csöveket egyesével hajlítják U alakúra, támasztólemezeken fűzik át, és a csőfal furataiba hegesztik. Üzem közben időnként örvényáramos szondával minden csövet átvizsgálnak; a sérült csövet **dugóval lezárják**. Pakson a VVER-440 típusnak megfelelően **vízszintes** gőzfejlesztők vannak, a nyugati PWR-ekben többnyire függőlegesek, mint a rajzon.',
        uni: 'A hőátadás `Q̇ = k · A · ΔT_m`; a primer oldal 300 → 270 °C-ra hűl, a szekunder oldal közel állandó, kb. 260–285 °C-os telítési hőmérsékleten forr (Pakson ~46 bar, nyugati PWR-ekben 60–70 bar). Mivel a gőz hőmérséklete jóval kisebb, mint egy szénerőműé (500–600 °C), az atomerőmű **hatásfoka** is kisebb: kb. 33–37%. A Carnot-határ `η_C = 1 − T_h / T_m` (kelvinben) kb. 0,45 lenne. A gőzfejlesztő csöveinek épsége kiemelt biztonsági kérdés, mert egy csőtörésnél primer víz jutna a szekunder körbe.',
        fact: 'Egy nagy gőzfejlesztő csöveit egymás után fektetve több tíz kilométer hosszú csövet kapnánk.'
      },
      {
        id: 'szekunder', z: 6, name: 'Szekunder kör: gőzvezeték és tápvíz', svg: secondary, explode: [0, 0], badge: [405, 232], en: 'secondary loop: main steam line, feedwater line and feedwater pump',
        terms: ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/elso-fotetel'],
        what: 'A gőzfejlesztőből a **gőzvezeték** (szürke) viszi a gőzt a turbinához. A kondenzátorban visszaalakult vizet a **tápszivattyú** nagy nyomáson visszanyomja a gőzfejlesztőbe (türkiz). Ez a kör **nem radioaktív**, mert csak a csőfalon át érintkezik a primer vízzel.',
        madeOf: 'Szénacél és ötvözött acél csövek, gyorszáró **gőzszelepek**, biztonsági szelepek, **tápvíz-előmelegítők** és a gőz nedvességét eltávolító **cseppleválasztó–újrahevítő** a nagy- és kisnyomású turbina között. A vizet sómentesítik és vegyszerezik, hogy ne okozzon korróziót.',
        how: 'A gőzvezetéket vastag falú csőből hegesztik, rugalmas tartókra függesztik, mert melegen több centimétert tágul. Az előmelegítőkbe a turbinából megcsapolt gőz kerül: így a tápvíz már melegen érkezik a gőzfejlesztőbe, ami javítja a hatásfokot.',
        uni: 'A szekunder kör a **Rankine-körfolyamatot** valósítja meg: szivattyúzás (közel izentrópikus nyomásnövelés folyadékban, kis munka), izobár hőfelvétel és elgőzölögtetés, adiabatikus expanzió a turbinában, izobár kondenzáció. A hatásfok `η = (w_turbina − w_szivattyú) / q_be`. Mivel a gőz telített, a turbinában gyorsan **nedvessé** válik; a cseppek erodálják a lapátokat, ezért kell a cseppleválasztás és az újrahevítés. A tápvíz-előmelegítés (regeneráció) a hőközlés átlaghőmérsékletét emeli, ez a Carnot-elv szerint javítja a hatásfokot.',
        fact: 'A gőzvezetékekben a gőz kb. 30–50 m/s sebességgel áramlik: autópályás tempóval.'
      },
      {
        id: 'turbina', z: 7, name: 'Gőzturbina', svg: turb, explode: [0, -80], badge: [450, 300], lesson: 'fizika/energia-munka', en: 'steam turbine (high-pressure and low-pressure casings)',
        terms: ['fizika-bsc/entropia', 'fizika-bsc/carnot-korfolyamat', 'mechanika/tehetetlensegi-nyomatek'],
        what: 'A gőz itt adja át az energiáját a forgó tengelynek. A gőz nagy sebességgel áramlik át lapátsorokon: az **álló** lapátok irányítják és gyorsítják, a **forgó** lapátokat pedig meglöki. Először a **nagynyomású** (NNY), majd a **kisnyomású** (KNY) házba jut; ahogy tágul, egyre nagyobb lapátokra van szükség.',
        madeOf: 'Kovácsolt **acél** forgórész (több tíz, akár 100+ tonna), krómacél és titán lapátok (a leghosszabb kisnyomású lapátok 1,5–1,8 m-esek), öntött acél házak, siklócsapágyak olajkenéssel, tömítések.',
        how: 'A tárcsákat és a tengelyt egyetlen kovácsolt tömbből vagy összehegesztve készítik, a lapátokat egyenként marják és a tárcsák hornyaiba illesztik. Összeszerelés után a forgórészt nagy pontossággal **kiegyensúlyozzák**, mert percenként 1500 vagy 3000 fordulatnál a legkisebb tömegeltérés is rezgést okozna.',
        uni: 'A turbina fokozataiban a gőz entalpiája csökken: a fajlagos munka `w = h_be − h_ki`. Valós expanziónál az entrópia nő; a **belső hatásfok** `η_i = (h_be − h_ki) / (h_be − h_ki,s)` kb. 0,85–0,9. A fordulatszám a hálózati frekvenciához kötött: kétpólusú generátorral `n = 60 · f / p = 3000 1/perc` 50 Hz-en, a nagy (1000+ MW-os) atomerőművi gépek gyakran négypólusúak, 1500 1/perc-cel. A kisnyomású ház kilépésénél a gőz fajtérfogata óriási (vákuumban kb. 30 m³/kg), ezért kell az utolsó fokozatban a hosszú lapát; a lapátcsúcsok kerületi sebessége megközelíti a hangsebességet.',
        fact: 'A paksi VVER-440 blokkok mindegyike két turbinát hajt, így egy blokkból két generátor termel áramot.'
      },
      {
        id: 'generator', z: 8, name: 'Generátor', svg: gen, explode: [45, -80], badge: [651, 280], link: 'villanymotor', lesson: 'fizika/elektromossag', en: 'turbo-generator (synchronous generator with exciter)',
        terms: ['fizika-bsc/faraday-indukcio', 'villamosmernoki/szinkron-gep', 'villamosmernoki/haromfazisu-rendszer'],
        what: 'A turbina tengelye forgatja. A forgórészen egy erős **elektromágnes** van, amely a forgással változó mágneses teret kelt az állórész tekercseiben: ez **feszültséget indukál** (elektromágneses indukció). Az eredmény **háromfázisú váltakozó áram**, pontosan 50 Hz-es frekvenciával.',
        madeOf: 'Acél forgórész tekercseléssel (ez az elektromágnes), körülötte vastag **lemezelt vasmag** az állórész rézrudas tekercselésével. A melegedés miatt **hidrogénnel** és/vagy vízzel hűtik (a hidrogén jól vezeti a hőt, és kicsi a súrlódása). A végén a **gerjesztő**, amely az elektromágnes egyenáramát adja.',
        how: 'A forgórész egy darabból kovácsolt acéltengely, amelybe hornyokat marnak a tekercseknek. Az állórész vékony, szigetelt elektrotechnikai acéllemezekből rétegezve készül. A kész gépet hónapokig tartó tesztekkel ellenőrzik, mielőtt a hálózatra kapcsolják.',
        uni: 'A generátor **szinkrongép**: a forgórész fordulatszáma szigorúan a hálózati frekvenciához kötött (`f = p · n / 60`). Az indukált feszültség effektív értéke `U_i = 4,44 · f · N · Φ · k_w` (N menetszám, Φ pólusfluxus, k_w tekercselési tényező). Hatásfoka 98–99%. A **gerjesztőáram** változtatásával a meddő teljesítményt, a turbinára jutó gőz mennyiségével a hatásos teljesítményt szabályozzák. A hálózatra kapcsoláskor **szinkronozni** kell: a feszültség, a frekvencia és a fázishelyzet is egyezzen.',
        fact: 'Ugyanaz a fizika működteti, mint egy villanymotort, csak „fordítva”: mozgásból áram lesz.'
      },
      {
        id: 'kondenzator', z: 6, name: 'Kondenzátor', svg: cond, explode: [0, 45], badge: [525, 392], en: 'condenser (shell-and-tube, under vacuum)',
        terms: ['fizika-bsc/entropia', 'fizika-bsc/carnot-korfolyamat'],
        what: 'A turbina alatti nagy hőcserélő. A fáradt gőz a hideg csövekre **lecsapódik**, újra vízzé válik, amit a tápszivattyú visszavisz a gőzfejlesztőbe. A csövekben a **hűtővíz** áramlik (folyóvíz vagy a hűtőtorony vize). A lecsapódáskor a gőz térfogata ezredrészére csökken: ettől lesz a kondenzátorban **vákuum**, ami „szívja” a gőzt a turbinán át.',
        madeOf: 'Acél köpeny, benne több tízezer **titán**, rozsdamentes acél vagy rézötvözet cső. Alul a **forróvíztartály** (hotwell) gyűjti a vizet. Vákuumszivattyúk távolítják el a bejutott levegőt.',
        how: 'A csöveket csőfalakba hengerelik, a köpenyt a helyszínen hegesztik össze, mert vasúton nem szállítható ekkora darab. A csöveket üzem közben szivacsgolyókkal tisztítják, amelyeket a hűtővíz végigsodor rajtuk.',
        uni: 'A kondenzátor nyomása a hűtővíz hőmérsékletétől függ: 25–35 °C-os telítési hőmérséklethez kb. 0,03–0,06 bar tartozik. A Carnot-elv szerint a **hideg oldali hőmérséklet** csökkentése javítja a hatásfokot, ezért nyáron, meleg folyóvíz mellett az erőmű kevesebb áramot termel. A leadott hő a beérkező hőteljesítmény kb. **kétharmada**: egy 1000 MW villamos teljesítményű blokk kb. 2000 MW hőt ad át a környezetnek. A hűtővíz szükséges tömegárama `ṁ = Q̇ / (c_p · ΔT)`: 2000 MW-hoz és 10 K melegedéshez kb. 48 t/s.',
        fact: 'A kondenzátor nélkül a turbina ellen kellene dolgoznia a gőznek: a vákuum adja a turbina teljesítményének jelentős részét.'
      },
      {
        id: 'hutotorony', z: 1, name: 'Hűtőtorony és hűtővízkör', svg: tower, explode: [25, 0], badge: [900, 300], en: 'natural-draught cooling tower and circulating water system',
        terms: ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/elso-fotetel'],
        what: 'A kondenzátorban felmelegedett hűtővizet (narancs) hűti vissza. A víz a torony alsó részében **permetként** hullik alá, miközben alulról hideg levegő áramlik be, és a meleg, párás levegő a kéményhatás miatt felfelé száll. A víz kis része **elpárolog**, ez viszi el a hő zömét. A felszálló „füst” valójában **vízgőzből** lecsapódott **köd**, nem szennyezés.',
        madeOf: 'Vékony falú, hiperboloid alakú **vasbeton** héj (100–200 m magas), alul lábakon áll, hogy a levegő beáramolhasson. Belül csepegtető töltet (műanyag lemezek), elosztó csövek és fúvókák, alul a hideg vizet gyűjtő **medence**. **Folyóvizes hűtésnél** nincs torony: a vizet egy nagy folyóból szivattyúzzák, és felmelegedve visszaengedik.',
        how: 'A héjat csúszózsaluzattal, gyűrűről gyűrűre betonozzák. A hiperboloid alak egyenes vasbeton elemekből is kirakható, és nagyon merev, így kevés anyaggal is ellenáll a szélnek. A **Paksi Atomerőmű** nem használ hűtőtornyot: a **Duna** vizével hűt, amelynek felmelegedését szigorú környezetvédelmi határértékek korlátozzák.',
        uni: 'A torony a **párolgáshőt** használja: `Q̇ ≈ ṁ_párolgó · r`, ahol r ≈ 2,4 MJ/kg. Így a keringtetett víz kb. 1,5–2%-ának elpárologtatása elég a hő elvitelére. A huzatot a meleg és a hideg levegő sűrűségkülönbsége adja: `Δp ≈ (ρ_kint − ρ_bent) · g · H`. A folyóvizes (frissvizes) hűtés hidegebb vizet ad, ezért jobb a hatásfoka, de a folyó hőterhelését korlátozni kell; kánikulában, alacsony vízállásnál ezért egyes erőművek teljesítményt csökkentenek.',
        fact: 'A hűtőtorony csóvája tiszta vízgőz: ugyanaz, mint ami egy forró teáscsésze fölött látszik, csak óriásban.'
      },
      {
        id: 'transzformator', z: 9, name: 'Főtranszformátor és hálózat', svg: trafo, explode: [0, 0], badge: [749, 432], link: 'elosztoszekreny', en: 'generator step-up transformer and transmission line',
        terms: ['villamosmernoki/transzformator', 'villamosmernoki/haromfazisu-rendszer', 'villamosmernoki/hatasos-teljesitmeny'],
        what: 'A generátor kb. 16–24 kV-os feszültségét **400 kV**-ra emeli. Nagy feszültségen ugyanakkora teljesítményhez sokkal kisebb áram kell, így a távvezetékeken kevesebb energia vész el hő formájában. A távvezeték az **országos hálózatba** viszi az áramot, onnan alállomások és transzformátorok juttatják el egészen a lakások konnektoráig.',
        madeOf: '**Lemezelt vasmag**, rajta réz tekercsek, az egész **transzformátorolajjal** töltött acéltartályban, amely szigetel és hűt. Oldalt hűtőradiátorok és ventilátorok, felül porcelán vagy kompozit **átvezető szigetelők**.',
        how: 'A vasmagot szigetelt, szemcseorientált acéllemezekből rakják össze, a tekercseket papír- és olajszigeteléssel tekercselik. Összeszerelés után vákuumban szárítják és olajjal töltik fel. Egy nagy blokktranszformátor több száz tonnás, különleges szállítójárművel viszik a helyére.',
        uni: 'Ideális transzformátornál `U₁ / U₂ = N₁ / N₂` és `U₁ · I₁ ≈ U₂ · I₂`. A vezetékveszteség `P_v = I² · R`; ha a feszültséget 20-szorosára emeljük, az áram 20-ad részére, a veszteség **400-ad részére** csökken. Háromfázisú rendszerben a teljesítmény `P = √3 · U_v · I · cos φ`. A blokktranszformátor hatásfoka 99,5% fölötti, de 1000 MVA-nál a 0,5% is 5 MW hőveszteség, ezért kell az erőteljes olajhűtés.',
        fact: 'Az atomerőművek egyenletesen, éjjel-nappal termelnek: ezek adják az áramrendszer „alapterhelését”.'
      }
    ],
    uni: {
      text: 'Az atomerőmű energiaforrása a **maghasadás**: az U-235 mag egy termikus neutron befogása után gerjesztett U-236 maggá alakul, amely két közepes tömegű hasadványra (pl. Ba és Kr, vagy Cs és Rb) és 2–3 gyors neutronra bomlik. A felszabaduló energia a **kötési energia** különbségéből ered: a közepes tömegű magok nukleononkénti kötési energiája kb. 8,5 MeV, az uráné kb. 7,6 MeV, a különbség nukleononként kb. 0,9 MeV, 236 nukleonra kb. 200 MeV.\n\nA láncreakció fenntartásához a gyors (~2 MeV) neutronokat **termikus** (~0,025 eV) energiára kell lassítani, mert ott az U-235 hasadási hatáskeresztmetszete több száz barn. A **moderátor** (könnyűvíz) hidrogénjein átlagosan kb. 18–20 ütközés kell ehhez: `n ≈ ln(E₀/E) / ξ`, hidrogénre `ξ ≈ 1`. A könnyűvizes reaktor fontos tulajdonsága a **negatív üregtényező és hőmérsékleti tényező**: ha a víz felmelegszik vagy buborékok keletkeznek, gyengül a moderálás, és a reaktivitás magától csökken. (Csernobil RBMK reaktorában grafit moderált, és az üregtényező pozitív volt.)\n\nA hőkörfolyamat **Rankine-ciklus** telített gőzzel; a nettó hatásfok kb. 33–37%. A **remanens hő** (a hasadványok bomlásából) leállítás után is jelentős, ezért kell hosszú távú hűtés, és ezért kell a kiégett üzemanyagot évekig pihentető medencében tartani.',
      terms: ['fizika-bsc/tomeg-energia', 'fizika-bsc/radioaktiv-bomlas', 'fizika-bsc/carnot-korfolyamat', 'fizika-bsc/entropia', 'fizika-bsc/faraday-indukcio', 'villamosmernoki/transzformator', 'villamosmernoki/szinkron-gep']
    },
    steps: [
      { icon: '⚛️', title: '1. Maghasadás és láncreakció', text: 'Egy lassú **neutron** eltalál egy **urán-235** atommagot. A mag kettéhasad: két kisebb atommag, **2–3 új neutron** és sok energia keletkezik. Az új neutronok újabb magokat hasítanak, így a folyamat önfenntartó **láncreakcióvá** válik. A reaktorban pontosan úgy szabályozzák, hogy minden hasadás átlagosan **egy** újabbat okozzon: így a teljesítmény állandó.', parts: ['futoelemek'] },
      { icon: '💧', title: '2. A víz mint moderátor', text: 'A hasadásból kirepülő neutronok **túl gyorsak**, a gyors neutront az urán-235 ritkán fogja be. A fűtőelemek közötti **víz** hidrogénatomjaival ütközve a neutronok lelassulnak, mint a biliárdgolyó, amely egy ugyanakkora golyónak ütközik. A víz tehát egyszerre **moderátor** és **hűtőközeg**. Ha túlmelegszik vagy buborékos lesz, rosszabbul lassít, és a láncreakció magától gyengül: ez beépített biztonság.', parts: ['futoelemek', 'reaktortartaly'] },
      { icon: '🎚️', title: '3. Szabályozás: rudak és bór', text: 'A **szabályozórudak** neutronelnyelő anyagból vannak. Mélyebbre engedve több neutront nyelnek el, és a teljesítmény csökken; kihúzva nő. A lassú, hosszú távú szabályozásra a hűtővízbe oldott **bórsavat** használják. Vészhelyzetben minden rúd a saját súlyától, néhány másodperc alatt beesik.', parts: ['szabalyozorudak', 'futoelemek'] },
      { icon: '🔁', title: '4. Hőátadás a primer körben', text: 'A **főkeringtető szivattyú** nagy sebességgel hajtja át a vizet a zónán, ahol kb. 270 °C-ról **300 °C** körülire melegszik. A **nyomástartó** 120–155 bar nyomáson tartja a kört, ezért a víz nem forr fel. A melegágon a forró víz a gőzfejlesztőbe áramlik, majd lehűlve visszatér.', parts: ['primer', 'reaktortartaly'] },
      { icon: '♨️', title: '5. Gőzfejlesztés', text: 'A **gőzfejlesztő** csöveiben áramló forró primer víz átadja a hőjét a csövek külső oldalán lévő szekunder víznek, amely **felforr**. A két kör vize sosem keveredik, ezért a turbinához jutó gőz **nem radioaktív**.', parts: ['gozfejleszto', 'primer', 'szekunder'] },
      { icon: '⚙️', title: '6. Gőz → turbina → generátor → hálózat', text: 'A gőz a **gőzvezetéken** át a **turbinába** jut, ahol lapátsorokon tágul és forgásba hozza a tengelyt. A közös tengelyen forgó **generátor** elektromágneses indukcióval 50 Hz-es váltakozó áramot termel. A **transzformátor** 400 kV-ra emeli a feszültséget, és az áram a távvezetéken az országos hálózatba kerül.', parts: ['szekunder', 'turbina', 'generator', 'transzformator'] },
      { icon: '🌊', title: '7. Kondenzáció és hűtés', text: 'A turbinából kilépő fáradt gőz a **kondenzátorban** a hideg csövekre csapódik, és újra vízzé válik; ezt a tápszivattyú visszanyomja a gőzfejlesztőbe. A csövekben áramló **hűtővíz** elviszi a hőt: Pakson a **Dunába**, máshol a **hűtőtoronyba**. A bejutó hő kb. kétharmada így távozik; ez nem „pazarlás”, hanem a hőerőművek fizikai korlátja (Carnot-elv).', parts: ['kondenzator', 'hutotorony'] },
      { icon: '🛡️', title: '8. Biztonsági rendszerek: gátak és vészhűtés', text: 'A radioaktív anyagokat **egymásba ágyazott gátak** tartják vissza: maga a kerámia **pasztilla**, a fűtőelem gáztömör **burkolata**, a zárt **primer kör** a reaktortartállyal, végül a **konténment**. Minden fontos rendszer **többszörözve** van, egymástól függetlenül. Baleset esetén **üzemzavari zónahűtő rendszerek** fecskendeznek bórsavas vizet a reaktorba, dízelgenerátorok és akkumulátorok adják az áramot; az újabb típusokban **passzív** (szivattyú nélküli) hűtés is van.', parts: ['kontenment', 'reaktortartaly', 'futoelemek', 'primer'] },
      { icon: '📦', title: '9. A kiégett üzemanyag kezelése', text: 'A 3–5 év után kivett kazetták még erősen sugároznak és **melegszenek** (remanens hő). Először évekig a reaktor melletti **pihentető medencében** hűlnek a víz alatt, majd **száraz tárolóba** kerülnek (Pakson a kiégett kazetták átmeneti tárolójába, a KKÁT-ba). Hosszú távon **mélységi geológiai tárolóban** helyezik el őket; Finnországban (Onkalo) már épül ilyen. A kis és közepes aktivitású hulladékot Magyarországon **Bátaapáti** mélyében helyezik el.', parts: ['futoelemek'] }
    ],
    history: [
      { year: '1938–39', text: '**Otto Hahn** és **Fritz Strassmann** kimutatja, hogy a neutronnal besugárzott urán báriumot „termel”; **Lise Meitner** és **Otto Frisch** megmagyarázza: az atommag **kettéhasad**. A láncreakció lehetőségét már 1933-ban felismerte és szabadalmaztatta **Szilárd Leó**.' },
      { year: '1942', text: 'Chicagóban **Enrico Fermi** és csapata (köztük **Szilárd Leó**) elindítja a **Chicago Pile-1** (CP-1) grafitmoderált reaktort: december 2-án jön létre az első mesterséges, szabályozott, önfenntartó láncreakció.' },
      { year: '1954', text: 'A Szovjetunióban, **Obnyinszkban** üzembe áll az első atomerőmű, amely áramot ad a hálózatra (kb. 5 MW villamos teljesítménnyel).' },
      { year: '1956', text: 'Angliában megnyílik a **Calder Hall** atomerőmű, az első ipari méretű, a hálózatot folyamatosan ellátó atomerőmű. 1957-ben az USA-ban Shippingportban indul az első nyomottvizes erőművi reaktor.' },
      { year: '1979', text: 'Az amerikai **Three Mile Island** erőmű 2. blokkjában (nyomottvizes reaktor) hűtőközeg-vesztés és kezelési hibák miatt a zóna részben megolvad. A konténment a radioaktív anyagok zömét bent tartja, de a baleset a biztonsági kultúra és a kezelőképzés átalakítását hozza.' },
      { year: '1982–1987', text: 'Megépül a **Paksi Atomerőmű** négy VVER-440 típusú blokkja: az 1. blokk 1982 végén kapcsolódik a hálózatra, és 1983-ban kezdi meg a kereskedelmi üzemet, a 4. blokk 1987-ben. Ma a hazai villamosenergia-termelés **közel felét** adja.' },
      { year: '1986', text: '**Csernobilban** (Ukrajna, akkor Szovjetunió) egy RBMK típusú, grafitmoderált reaktor egy rosszul végrehajtott kísérlet közben felrobban. Az RBMK pozitív üregtényezője és konténment hiánya miatt nagy mennyiségű radioaktív anyag jut a légkörbe: ez minden idők legsúlyosabb atomerőmű-balesete.' },
      { year: '2011', text: 'Japánban a **fukusimai** erőműben a földrengést követő cunami elárasztja a tartalék áramforrásokat: a hűtés leáll, három reaktorban megolvad a zóna, hidrogénrobbanások történnek. A világon mindenhol felülvizsgálják az erőműveket („stressztesztek”), és megerősítik az áramkimaradás elleni védelmet.' }
    ],
    quiz: [
      { q: 'Miért nem forr fel a primer kör vize 300 °C-on?', options: ['Mert nagy (120–155 bar) nyomáson van', 'Mert bórsav van benne', 'Mert nagyon gyorsan áramlik', 'Mert a reaktor vákuumban van'], answer: 0, explain: 'A forráspont a nyomással nő: 155 bar nyomáson kb. 345 °C. Ezt a nyomást a nyomástartó edény tartja fenn.' },
      { q: 'Mi a moderátor szerepe a nyomottvizes reaktorban?', options: ['Lelassítja a neutronokat, hogy az urán-235 befoghassa őket', 'Elnyeli a neutronokat, és leállítja a reaktort', 'Hűti a turbinát', 'Növeli a nyomást'], answer: 0, explain: 'A víz hidrogénatomjain ütközve lassulnak le a neutronok; a lassú neutronokat az U-235 sokkal nagyobb eséllyel fogja be és hasad.' },
      { q: 'Miért nem radioaktív a turbinát hajtó gőz?', options: ['Mert a gőzfejlesztőben a primer és a szekunder kör vize nem keveredik', 'Mert a gőz túl forró a sugárzáshoz', 'Mert a turbina elnyeli a sugárzást', 'Mert a gőz a hűtőtoronyból jön'], answer: 0, explain: 'A primer víz csak a gőzfejlesztő csőfalán át adja át a hőt; a szekunder kör külön, zárt kör.' },
      { q: 'Mi a fehér „füst”, amely egy hűtőtoronyból száll fel?', options: ['Lecsapódott vízgőz (köd)', 'Radioaktív gáz', 'Szén-dioxid', 'Égéstermék'], answer: 0, explain: 'A hűtőtoronyban a meleg víz kis része elpárolog; a felszálló párás levegőből a hidegben apró vízcseppek csapódnak ki, ezt látjuk.' },
      { q: 'Mit csinálnak a szabályozórudak, ha mélyebbre engedik őket a zónába?', options: ['Több neutront nyelnek el, a láncreakció lassul', 'Gyorsítják a láncreakciót', 'Felmelegítik a vizet', 'Üzemanyagot juttatnak a zónába'], answer: 0, explain: 'A rudak neutronelnyelő anyagból (pl. bór-karbid) vannak; vészleállításkor teljesen beesnek, és leállítják a láncreakciót.' }
    ]
  });
})();
