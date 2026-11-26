/* Modell: az emberi csontváz – elölnézet, anatómiai alaphelyzetben (tenyér előre, hüvelykujj kifelé).
 * A páros csontokat a rajz JOBB felére rajzoljuk meg (x > 320), a bal felet tükrözéssel kapjuk.
 * A test bal oldala a rajz jobb oldala (szemben állunk vele). Kb. 175 cm magas felnőtt, 1 cm ≈ 4,3 képpont.
 * Szétszedéskor a csontok függőlegesen, az ízületeknél nyílnak szét (a páros csontok mindkét oldalon egyformán). */
(function () {
  var CX = 320;
  var NS = ' pointer-events="none"';
  var BONE = 'url(#cv-bone)', BD = '#8a7653', CART = '#cfe2ec', CARTD = '#7d9db2';
  function path(d, fill, stroke, w, extra) {
    return '<path d="' + d + '" fill="' + (fill || BONE) + '" stroke="' + (stroke || BD) + '" stroke-width="' + (w == null ? 1.3 : w) + '" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  /* „kapszula” alakú kis csont (ujjperc, kézközépcsont) */
  function cap(x1, y1, x2, y2, w) {
    var d = 'M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L' + x2.toFixed(1) + ' ' + y2.toFixed(1);
    return '<path d="' + d + '" stroke="' + BD + '" stroke-width="' + (w + 2) + '" stroke-linecap="round" fill="none"/>' +
      '<path d="' + d + '" stroke="#f1e8d4" stroke-width="' + w + '" stroke-linecap="round" fill="none"/>';
  }
  /* görbe „szalag” (borda, porc): sötét körvonal + világos belső */
  function band(d, w, col, colD) {
    return '<path d="' + d + '" stroke="' + (colD || BD) + '" stroke-width="' + (w + 2.2) + '" stroke-linecap="round" fill="none"/>' +
      '<path d="' + d + '" stroke="' + (col || '#efe5cf') + '" stroke-width="' + w + '" stroke-linecap="round" fill="none"/>';
  }
  /* a jobb oldalra rajzolt páros csont + tükörképe */
  function pair(s) { return s + '<g transform="translate(' + (2 * CX) + ' 0) scale(-1 1)">' + s + '</g>'; }
  /* csont elhelyezése: lokális rajz (y lefelé a csont tengelye) a (x1,y1) pontból a (x2,y2) felé */
  function place(s, x1, y1, x2, y2) {
    var a = Math.atan2(-(x2 - x1), y2 - y1) * 180 / Math.PI;
    return '<g transform="translate(' + x1 + ' ' + y1 + ') rotate(' + a.toFixed(2) + ')">' + s + '</g>';
  }
  function txt(x, y, s, cls, extra) { return '<text class="' + cls + '" x="' + x + '" y="' + y + '"' + (extra || '') + '>' + s + '</text>'; }

  var defs = '<defs>' +
    '<linearGradient id="cv-bone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e6d6b4"/><stop offset=".45" stop-color="#f8f1e0"/><stop offset="1" stop-color="#dccaa4"/></linearGradient>' +
    '<radialGradient id="cv-spongy" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#e9c9a6"/><stop offset="1" stop-color="#c98e6a"/></radialGradient>' +
    '<pattern id="cv-trab" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#f3e4c6"/><path d="M0 6 L6 0 M-1 1 L1 -1 M5 7 L7 5" stroke="#c9a77a" stroke-width="1"/><circle cx="3" cy="3" r="1.1" fill="#d98f6d"/></pattern>' +
    '</defs>';

  /* ---------- Háttér: cím, csontszám-táblázat, egy hosszú csöves csont metszete ---------- */
  var tbl = [['koponya', '22'], ['hallócsontocskák', '6'], ['nyelvcsont', '1'], ['gerinc (felnőtt)', '26'], ['bordák + szegycsont', '25'],
    ['vállöv', '4'], ['két kar és kéz', '60'], ['két medencecsont', '2'], ['két láb és lábfej', '60']];
  var tb = '<rect x="8" y="560" width="168" height="250" rx="10" fill="rgba(127,141,176,.10)" stroke="#7f8db0"/>' +
    txt(92, 580, 'Hány csontunk van?', 'lbl', ' font-size="12.5" text-anchor="middle"');
  tbl.forEach(function (r, i) {
    var y = 602 + i * 20;
    tb += txt(18, y, r[0], 'lbl-muted', ' font-size="11.5"') + txt(166, y, r[1], 'lbl', ' font-size="12" text-anchor="end"');
  });
  tb += '<line x1="18" y1="784" x2="166" y2="784" stroke="#7f8db0"/>' + txt(18, 801, 'összesen', 'lbl', ' font-size="12.5"') + txt(166, 801, '206', 'lbl', ' font-size="14" text-anchor="end"');

  /* hosszú csöves csont metszete (combcsont vége) */
  var bx = 540, by = 600;
  var inset = '<rect x="452" y="560" width="180" height="300" rx="10" fill="rgba(127,141,176,.10)" stroke="#7f8db0"/>' +
    txt(542, 580, 'Egy csöves csont belseje', 'lbl', ' font-size="12" text-anchor="middle"') +
    path('M' + (bx - 40) + ' ' + (by + 18) + ' C' + (bx - 44) + ' ' + (by - 2) + ' ' + (bx + 44) + ' ' + (by - 2) + ' ' + (bx + 40) + ' ' + (by + 18) + ' C' + (bx + 38) + ' ' + (by + 46) + ' ' + (bx + 22) + ' ' + (by + 60) + ' ' + (bx + 20) + ' ' + (by + 80) +
      ' L' + (bx + 20) + ' ' + (by + 236) + ' L' + (bx - 20) + ' ' + (by + 236) + ' L' + (bx - 20) + ' ' + (by + 80) + ' C' + (bx - 22) + ' ' + (by + 60) + ' ' + (bx - 38) + ' ' + (by + 46) + ' ' + (bx - 40) + ' ' + (by + 18) + ' Z', '#f1e6cc', BD, 1.4, NS) +
    path('M' + (bx - 36) + ' ' + (by + 18) + ' C' + (bx - 38) + ' ' + (by + 2) + ' ' + (bx + 38) + ' ' + (by + 2) + ' ' + (bx + 36) + ' ' + (by + 18) + ' C' + (bx + 34) + ' ' + (by + 44) + ' ' + (bx + 18) + ' ' + (by + 60) + ' ' + (bx + 15) + ' ' + (by + 84) +
      ' L' + (bx - 15) + ' ' + (by + 84) + ' C' + (bx - 18) + ' ' + (by + 60) + ' ' + (bx - 34) + ' ' + (by + 44) + ' ' + (bx - 36) + ' ' + (by + 18) + ' Z', 'url(#cv-trab)', 'none', 0, NS) +
    '<path d="M' + (bx - 33) + ' ' + (by + 30) + ' Q' + bx + ' ' + (by + 38) + ' ' + (bx + 33) + ' ' + (by + 30) + '" stroke="#7fb0cf" stroke-width="4" fill="none"' + NS + '/>' +
    '<rect x="' + (bx - 11) + '" y="' + (by + 84) + '" width="22" height="152" fill="#f2d16b" stroke="#b8952c" stroke-width=".8"' + NS + '/>' +
    '<path d="M' + (bx - 20) + ' ' + (by + 70) + ' L' + (bx - 20) + ' ' + (by + 236) + ' M' + (bx + 20) + ' ' + (by + 70) + ' L' + (bx + 20) + ' ' + (by + 236) + '" stroke="#8a7653" stroke-width="1.4"' + NS + '/>' +
    txt(bx - 62, by + 248, 'szivacsos állomány a végeken', 'lbl-muted', ' font-size="10"') +
    txt(bx - 84, by + 30, 'növekedési', 'lbl-muted', ' font-size="9.5"') + txt(bx - 84, by + 41, 'porckorong', 'lbl-muted', ' font-size="9.5"') +
    txt(bx - 84, by + 140, 'tömör', 'lbl-muted', ' font-size="9.5"') + txt(bx - 84, by + 151, 'kéreg', 'lbl-muted', ' font-size="9.5"') +
    txt(bx + 24, by + 160, 'velőüreg', 'lbl-muted', ' font-size="9.5"') + txt(bx + 24, by + 171, '(sárga', 'lbl-muted', ' font-size="9.5"') + txt(bx + 24, by + 182, 'csontvelő)', 'lbl-muted', ' font-size="9.5"');

  var backdrop = defs +
    txt(14, -8, 'Az emberi csontváz – elölnézet', 'lbl', ' font-size="16"') +
    txt(14, 10, 'a test bal oldala a rajz jobb oldala', 'lbl-muted') +
    '<rect x="14" y="22" width="16" height="10" rx="3" fill="#efe5cf" stroke="' + BD + '"/>' + txt(36, 31, 'csont', 'lbl-muted', ' font-size="11"') +
    '<rect x="80" y="22" width="16" height="10" rx="3" fill="' + CART + '" stroke="' + CARTD + '"/>' + txt(102, 31, 'porc', 'lbl-muted', ' font-size="11"') +
    tb + inset;

  /* ---------- 1. Koponya ---------- */
  var skull = path('M320 14 C347 14 365 34 365 62 C365 75 361 83 357 89 C354 94 350 97 345 99 L295 99 C290 97 286 94 283 89 C279 83 275 75 275 62 C275 34 293 14 320 14 Z') +
    '<path d="M288 36 C302 29 338 29 352 36 M320 15 L320 30" stroke="' + BD + '" stroke-width=".9" fill="none" stroke-dasharray="2.5 2"' + NS + '/>' +
    '<path d="M279 70 C283 76 287 80 293 82 M361 70 C357 76 353 80 347 82" stroke="' + BD + '" stroke-width="1" fill="none"' + NS + '/>' +
    '<ellipse cx="303" cy="65" rx="11.5" ry="9.5" fill="#3d3427" stroke="' + BD + '"/><ellipse cx="337" cy="65" rx="11.5" ry="9.5" fill="#3d3427" stroke="' + BD + '"/>' +
    '<ellipse cx="300" cy="62" rx="4" ry="3" fill="#5b4f3c"' + NS + '/><ellipse cx="334" cy="62" rx="4" ry="3" fill="#5b4f3c"' + NS + '/>' +
    '<path d="M320 74 C315 78 311 87 314 91 L326 91 C329 87 325 78 320 74 Z" fill="#3d3427" stroke="' + BD + '"/>' +
    '<path d="M320 79 L320 90" stroke="#a99474" stroke-width="1.2"' + NS + '/>' +
    // felső fogsor
    '<path d="M298 94 L342 94 L340 101 L300 101 Z" fill="#fbf7ec" stroke="' + BD + '" stroke-width="1"/>' +
    // állkapocs
    path('M286 90 C286 104 291 113 300 117 C308 121 332 121 340 117 C349 113 354 104 354 90 L346 94 C345 105 337 111 320 111 C303 111 295 105 294 94 Z') +
    '<path d="M301 102 L339 102 L337 108 L303 108 Z" fill="#fbf7ec" stroke="' + BD + '" stroke-width="1"/>';
  for (var tx = 303; tx < 340; tx += 4.7) skull += '<path d="M' + tx.toFixed(1) + ' 94 L' + tx.toFixed(1) + ' 101 M' + (tx + 1).toFixed(1) + ' 102 L' + (tx + 1).toFixed(1) + ' 108" stroke="#b8a888" stroke-width=".7"' + NS + '/>';

  /* ---------- 2. Gerinc: 7 nyaki, 12 háti, 5 ágyéki csigolya, keresztcsont, farokcsont ---------- */
  var spine = '<rect x="' + (CX - 7) + '" y="104" width="14" height="242" rx="5" fill="' + CART + '" stroke="' + CARTD + '" stroke-width="1"/>';
  function vert(y, h, w, proc) {
    var s = '<rect x="' + (CX - w / 2).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + (h - 2).toFixed(1) + '" rx="' + Math.min(4, h / 3).toFixed(1) + '" fill="' + BONE + '" stroke="' + BD + '" stroke-width="1.1"/>';
    if (proc) s += '<ellipse cx="' + (CX - w / 2 - proc / 2).toFixed(1) + '" cy="' + (y + h / 2 - 1).toFixed(1) + '" rx="' + (proc / 2 + 1).toFixed(1) + '" ry="2.6" fill="#ece0c4" stroke="' + BD + '" stroke-width=".9"/>' +
      '<ellipse cx="' + (CX + w / 2 + proc / 2).toFixed(1) + '" cy="' + (y + h / 2 - 1).toFixed(1) + '" rx="' + (proc / 2 + 1).toFixed(1) + '" ry="2.6" fill="#ece0c4" stroke="' + BD + '" stroke-width=".9"/>';
    return s;
  }
  var i;
  for (i = 0; i < 7; i++) spine += vert(106 + i * 8.6, 8.6, 15 + i * 0.9, 5);
  for (i = 0; i < 12; i++) spine += vert(166.5 + i * 9.45, 9.45, 18 + i * 0.7, 6);
  for (i = 0; i < 5; i++) spine += vert(280 + i * 13, 13, 28 + i * 1.6, 9);
  spine += path('M296 346 C306 344 334 344 344 346 C344 362 336 384 326 398 L314 398 C304 384 296 362 296 346 Z') +
    '<circle cx="311" cy="356" r="2.2" fill="#8a7653"' + NS + '/><circle cx="329" cy="356" r="2.2" fill="#8a7653"' + NS + '/><circle cx="313" cy="368" r="2" fill="#8a7653"' + NS + '/><circle cx="327" cy="368" r="2" fill="#8a7653"' + NS + '/><circle cx="315" cy="380" r="1.7" fill="#8a7653"' + NS + '/><circle cx="325" cy="380" r="1.7" fill="#8a7653"' + NS + '/>' +
    '<path d="M302 354 L338 354 M304 366 L336 366 M307 378 L333 378 M311 389 L329 389" stroke="' + BD + '" stroke-width=".7" opacity=".6"' + NS + '/>' +
    path('M315 400 L325 400 L323 408 L321 414 L319 414 L317 408 Z', BONE, BD, 1);

  /* ---------- 3. Bordák és szegycsont ---------- */
  var W = [0, 40, 52, 60, 66, 70, 72, 73, 73, 72, 69, 62, 50];
  var sternAt = [0, 180, 196, 207, 218, 229, 240, 250];
  function ribR(n) {                       // a jobb oldali n. borda
    var yp = 170 + (n - 1) * 9.4, w = W[n], s = '';
    if (n === 1) return band('M' + (CX + 9) + ' ' + yp + ' C' + (CX + 30) + ' ' + (yp - 4) + ' ' + (CX + w) + ' ' + (yp + 2) + ' ' + (CX + w - 6) + ' ' + (yp + 12) + ' C' + (CX + w - 10) + ' ' + (yp + 16) + ' ' + (CX + 36) + ' ' + (yp + 16) + ' ' + (CX + 30) + ' ' + (yp + 16), 4.2) +
      band('M' + (CX + 30) + ' ' + (yp + 16) + ' L' + (CX + 13) + ' ' + sternAt[1], 3.6, CART, CARTD);
    var ax = 26 + n * 4.2, ae = yp + 30;
    if (n >= 11) return band('M' + (CX + 9) + ' ' + yp.toFixed(1) + ' C' + (CX + w * 0.5).toFixed(1) + ' ' + (yp - 5).toFixed(1) + ' ' + (CX + w * 0.9).toFixed(1) + ' ' + (yp + 3).toFixed(1) + ' ' + (CX + w).toFixed(1) + ' ' + (yp + 20).toFixed(1), 4);
    s += band('M' + (CX + 9) + ' ' + yp.toFixed(1) + ' C' + (CX + w * 0.55).toFixed(1) + ' ' + (yp - 7).toFixed(1) + ' ' + (CX + w).toFixed(1) + ' ' + (yp - 1).toFixed(1) + ' ' + (CX + w).toFixed(1) + ' ' + (yp + 14).toFixed(1) +
      ' C' + (CX + w).toFixed(1) + ' ' + (yp + 24).toFixed(1) + ' ' + (CX + ax + 10).toFixed(1) + ' ' + (ae - 2).toFixed(1) + ' ' + (CX + ax).toFixed(1) + ' ' + ae.toFixed(1), 4.6);
    if (n <= 7) s += band('M' + (CX + ax) + ' ' + ae.toFixed(1) + ' C' + (CX + ax - 12) + ' ' + (ae - 1).toFixed(1) + ' ' + (CX + 20) + ' ' + (sternAt[n] + 1) + ' ' + (CX + 11) + ' ' + sternAt[n], 3.8, CART, CARTD);
    else if (n <= 10) {
      var jx = [0, 0, 0, 0, 0, 0, 0, 0, 40, 52, 60][n], jy = [0, 0, 0, 0, 0, 0, 0, 0, 254, 262, 271][n];
      s += band('M' + (CX + ax) + ' ' + ae.toFixed(1) + ' C' + (CX + ax - 6) + ' ' + (ae - 3).toFixed(1) + ' ' + (CX + jx + 6) + ' ' + (jy + 3) + ' ' + (CX + jx) + ' ' + jy, 3.4, CART, CARTD);
    }
    return s;
  }
  var ribsR = '';
  for (var n = 12; n >= 1; n--) ribsR += ribR(n);
  var ribs = pair(ribsR) +
    path('M306 173 C312 170 328 170 334 173 L332 194 C326 198 314 198 308 194 Z') +                 // markolat
    path('M309 197 C315 195 325 195 331 197 L330 250 C328 254 312 254 310 250 Z') +                 // test
    path('M314 253 L326 253 L323 264 L320 268 L317 264 Z', '#e6ebe6', CARTD, 1) +                    // kardnyúlvány (sokáig porcos)
    '<path d="M310 212 L330 212 M310 224 L330 224 M310 236 L330 236" stroke="' + BD + '" stroke-width=".6" opacity=".5"' + NS + '/>';

  /* ---------- 4. Vállöv: kulcscsont és lapocka ---------- */
  var girdleR = path('M378 168 C390 166 400 162 406 158 C414 156 420 162 418 170 C414 178 404 182 398 186 C394 210 386 240 372 262 C366 266 362 262 362 256 C362 230 362 200 364 176 Z', 'rgba(232,218,188,.62)', BD, 1.2) +   // lapocka (a bordák mögött, áttetszően)
    '<path d="M370 186 C380 200 384 216 382 230" stroke="' + BD + '" stroke-width=".8" fill="none" opacity=".6"' + NS + '/>' +
    path('M398 176 C404 172 410 176 408 184 C406 190 398 192 396 186 Z', '#e8dcc0', BD, 1) +                                                          // ízületi árok (cavitas glenoidalis)
    path('M386 170 C390 176 388 182 382 182 C380 178 382 174 386 170 Z', '#efe5cf', BD, 1) +                                                         // hollócsőrnyúlvány
    band('M333 174 C348 182 364 164 384 166 C396 167 404 161 412 159', 6.2);                                                                         // kulcscsont
  var girdle = pair(girdleR);

  /* ---------- 5. Felkarcsont ---------- */
  function humerus(L) {
    return path('M-6 -5 C4 -9 14 -2 13 10 L6 22 L5 ' + (L - 26) + ' C6 ' + (L - 16) + ' 14 ' + (L - 12) + ' 14 ' + (L - 6) + ' C14 ' + (L + 1) + ' 8 ' + (L + 2) + ' 4 ' + L +
      ' C2 ' + (L + 3) + ' -4 ' + (L + 3) + ' -6 ' + L + ' C-10 ' + (L + 2) + ' -15 ' + (L + 1) + ' -15 ' + (L - 6) + ' C-15 ' + (L - 12) + ' -7 ' + (L - 16) + ' -5 ' + (L - 26) +
      ' L-6 22 C-14 20 -17 12 -15 4 C-13 -2 -10 -4 -6 -5 Z') +
      '<path d="M0 30 L0 ' + (L - 30) + '" stroke="rgba(138,118,83,.35)" stroke-width="2"' + NS + '/>';
  }
  var hum = pair(place(humerus(118), 404, 178, 426, 296));

  /* ---------- 6. Alkar: orsócsont (kívül, hüvelykujj felől) és singcsont (belül) ---------- */
  function forearm(L) {
    return path('M-10 -6 C-4 -11 2 -7 2 2 L-2 12 L-5 ' + (L - 8) + ' C-4 ' + (L - 4) + ' -6 ' + L + ' -9 ' + L + ' C-12 ' + L + ' -13 ' + (L - 4) + ' -11 ' + (L - 8) + ' L-12 14 C-16 8 -15 -2 -10 -6 Z') +     // singcsont
      path('M4 2 C8 0 12 2 11 6 L8 12 C9 40 14 70 15 ' + (L - 10) + ' C17 ' + (L - 6) + ' 18 ' + (L - 2) + ' 15 ' + (L + 1) + ' L1 ' + (L + 1) + ' C-1 ' + (L - 2) + ' 2 ' + (L - 8) + ' 5 ' + (L - 12) + ' C6 60 4 30 3 12 C0 8 0 3 4 2 Z');   // orsócsont
  }
  var fore = pair(place(forearm(104), 428, 301, 450, 405));

  /* ---------- 7. Kéz: 8 kéztőcsont, 5 kézközépcsont, 14 ujjperc ---------- */
  function hand() {
    var s = '';
    [[-8, 2], [-2.5, 1], [3, 1], [8.5, 3], [-9, 9], [-3.5, 9], [2, 9], [7.5, 10]].forEach(function (c) {
      s += '<ellipse cx="' + c[0] + '" cy="' + c[1] + '" rx="4" ry="4" fill="#efe5cf" stroke="' + BD + '" stroke-width="1"/>';
    });
    var mc = [[-9, 15, -12, 38], [-4, 15, -5, 41], [1, 15, 1, 42], [6, 15, 7, 40]];   // kisujj … mutatóujj kézközépcsontjai
    var ph = [[12, 8, 7], [15, 10, 8], [16, 11, 8], [14, 10, 7]];
    mc.forEach(function (m, k) {
      s += cap(m[0], m[1], m[2], m[3], 4.4);
      var dx = (m[2] - m[0]) / (m[3] - m[1]), y = m[3] + 2.4, x = m[2];
      ph[k].forEach(function (len) { var x2 = x + dx * len * 1.2, y2 = y + len; s += cap(x, y, x2, y2, 3.6); x = x2; y = y2 + 2.2; });
    });
    s += cap(11, 12, 18, 29, 4.6) + cap(19, 32, 23, 42, 4) + cap(24, 45, 26.5, 52, 3.6);    // hüvelykujj (2 ujjperc)
    return s;
  }
  var hnd = pair(place(hand(), 449, 405, 458, 485));

  /* ---------- 8. Medence (két medencecsont: csípő-, ülő- és szeméremcsont összenőve) ---------- */
  var pelR = path('M342 344 C350 326 372 316 392 320 C405 323 412 336 405 350 C401 357 399 363 402 372 C406 384 402 396 393 401 C387 412 383 424 375 430 C367 434 359 431 357 425 C351 419 337 419 323 421 L323 400 C336 398 350 394 361 387 C369 381 366 370 356 366 C347 362 341 357 340 351 Z' +
    ' M343 412 a10.5 8 0 1 0 21 0 a10.5 8 0 1 0 -21 0 Z', BONE, BD, 1.3, ' fill-rule="evenodd"') +
    '<path d="M352 344 C360 334 380 330 394 334" stroke="rgba(138,118,83,.45)" stroke-width="1.2" fill="none"' + NS + '/>' +
    '<circle cx="391" cy="381" r="11" fill="#d9c7a0" stroke="' + BD + '" stroke-width="1"/>' +
    '<rect x="319" y="400" width="5" height="21" rx="2" fill="' + CART + '" stroke="' + CARTD + '" stroke-width=".8"/>';
  var pelvis = pair(pelR);

  /* ---------- 9. Combcsont ---------- */
  var femR = path('M380 372 C384 365 396 365 400 371 C410 374 414 371 418 378 C422 386 419 396 413 402 C405 450 381 500 367 530 C371 538 371 548 365 556 C361 560 355 560 352 556 C349 560 341 560 337 556 C333 548 335 538 341 530 C351 500 381 450 394 405 C390 409 384 407 386 400 C388 396 386 392 382 390 C376 387 374 378 380 372 Z') +
    '<path d="M402 410 C392 450 372 500 356 530" stroke="rgba(138,118,83,.35)" stroke-width="2" fill="none"' + NS + '/>';
  var femur = pair(femR);

  /* ---------- 10. Térdkalács ---------- */
  var patella = pair(path('M352 532 C360 532 364 540 362 548 C360 556 355 559 352 559 C348 559 343 555 342 548 C341 540 345 532 352 532 Z', '#f3ead6', BD, 1.3) +
    '<path d="M346 540 Q352 536 358 540" stroke="rgba(138,118,83,.5)" stroke-width="1" fill="none"' + NS + '/>');

  /* ---------- 11. Lábszár: sípcsont (belül) és szárkapocscsont (kívül) ---------- */
  var legR = path('M367 572 C371 567 380 569 380 576 C380 582 376 584 374 586 L370 720 C374 730 376 744 372 754 C368 758 363 754 363 748 L366 724 L367 588 C365 584 363 576 367 572 Z') +
    path('M332 562 C340 558 362 558 370 562 C372 570 366 578 362 582 C358 640 356 700 358 728 C360 736 360 742 356 745 L344 745 C340 751 336 751 335 743 C334 730 340 700 342 640 C343 600 336 580 334 574 C330 570 330 566 332 562 Z') +
    '<path d="M347 590 C348 650 348 700 349 726" stroke="rgba(138,118,83,.35)" stroke-width="2" fill="none"' + NS + '/>';
  var leg = pair(legR);

  /* ---------- 12. Lábfej (felülről-elölről): 7 lábtőcsont, 5 lábközépcsont, 14 ujjperc ---------- */
  function footR() {
    var s = path('M340 748 C346 744 362 744 368 749 C370 756 366 762 354 763 C344 763 338 756 340 748 Z') +                      // ugrócsont
      path('M368 752 C374 752 378 760 375 768 L368 770 C366 762 366 756 368 752 Z', '#e9dcbf', BD, 1) +                               // sarokcsont (oldalról kilátszik)
      path('M336 764 C342 762 352 762 356 765 L355 772 L336 772 Z', '#efe5cf', BD, 1) +                                                 // sajkacsont
      path('M357 765 C364 764 372 765 375 770 L373 777 L357 776 Z', '#efe5cf', BD, 1) +                                                 // kockacsont
      path('M333 773 L341 773 L341 781 L332 781 Z M342 773 L349 773 L349 780 L342 780 Z M350 773 L356 773 L356 779 L350 779 Z', '#efe5cf', BD, 0.9);   // ékcsontok
    var mt = [[336, 782, 330, 804, 4.4], [345, 781, 342, 805, 3.6], [352, 780, 352, 804, 3.4], [360, 778, 362, 801, 3.3], [368, 777, 371, 797, 3.3]];
    mt.forEach(function (m, k) {
      s += cap(m[0], m[1], m[2], m[3], m[4]);
      var dx = (m[2] - m[0]) / (m[3] - m[1]), x = m[2], y = m[3] + 2.8, segs = k === 0 ? [8, 6] : [6, 4, 3];
      segs.forEach(function (len) { var x2 = x + dx * len, y2 = y + len; s += cap(x, y, x2, y2, k === 0 ? 4.2 : 3); x = x2; y = y2 + 2.4; });
    });
    return s;
  }
  var foot = pair(footR());

  STUDIE.addModel({
    id: 'csontvaz',
    title: 'Az emberi csontváz',
    icon: '🦴',
    color: '#b8955a',
    category: 'Biológia',
    keywords: 'csontváz csont 206 csont koponya állkapocs gerinc gerincoszlop csigolya nyakcsigolya hátcsigolya ágyékcsigolya keresztcsont farokcsont borda szegycsont mellkas vállöv kulcscsont lapocka felkarcsont humerus alkar orsócsont singcsont radius ulna kéz kéztőcsont kézközépcsont ujjperc medence medencecsont csípőcsont combcsont femur térd térdkalács patella lábszár sípcsont szárkapocscsont tibia fibula lábfej lábtőcsont sarokcsont ízület porc növekedési porckorong csontvelő csontritkulás csonttörés röntgen Vesalius Röntgen anatómia',
    summary: 'Egy felnőtt embert 206 csont tart, véd és mozgat; a csontváz élő szövet, amely egész életünkben folyamatosan átépül.',
    scale: 'kb. 175 cm magas felnőtt; a csontváz a testtömeg kb. 15%-a (70 kg-os embernél kb. 10 kg)',
    viewBox: '0 -34 640 944',
    backdrop: backdrop,
    intro: 'A csontváz a test **váza**: tartja a testet, a csontokhoz tapadó izmok **mozgatják** (a csontok emelőként működnek), és **védi** a belső szerveket (a koponya az agyat, a mellkas a szívet és a tüdőt). Emellett a csontok belsejében, a **vörös csontvelőben** készülnek a vérsejtek, és a csont a test **kalcium- és foszfátraktára** is.\n\nEgy felnőttnek **206 csontja** van, egy újszülöttnek több (kb. 270–300), mert sok csont csak később nő össze. A csontokat **ízületek** kötik össze. A **Szétszedés** gombbal az ízületeknél szétnyithatod a csontvázat.',
    parts: [
      {
        id: 'koponya', z: 3, name: 'Koponya', svg: skull, explode: [0, -40], badge: [372, 40], latin: 'cranium', en: 'skull (cranium)', lesson: 'bio-alap/emberi-test-1',
        terms: ['anatomia/izulet', 'anatomia/csont'],
        what: 'A fej csontos váza, amely az **agyat** és az érzékszerveket (szem, fül, orr) védi. **22 csontból** áll: 8 csont alkotja az agyat körülvevő **agykoponyát**, 14 az **arckoponyát**. A csontok fűrészes szélű **varratokkal** illeszkednek egymáshoz, mozdíthatatlanul. Egyetlen mozgatható csontja az **állkapocs**, amely ízülettel kapcsolódik a halántékcsonthoz (rágás, beszéd). A középfülben még 3–3 parányi **hallócsontocska** is van.',
        madeOf: 'Az agykoponya **lapos csontokból** áll: két vékony, tömör csontlemez között **szivacsos állomány** van (diploë). Az arckoponya egyes csontjaiban levegővel telt üregek (**orrmelléküregek**) vannak, ettől könnyebb a fej és ezek adják a hangunk zengését. A fogak nem csontok: zománcból és dentinből állnak, a fogmederben ülnek.',
        how: 'Az agykoponya lapos csontjai **közvetlenül kötőszövetből** csontosodnak el (nem porcból). Születéskor a csontok még nem nőttek össze: köztük puha, hártyás részek, **kutacsok** vannak, így a koponya a szülés közben kicsit összenyomódhat, utána pedig az agy nőhet. A hátsó kutacs néhány hónap alatt, a nagy (homloki) kutacs kb. **1,5–2 éves korra** záródik be. A varratok csak felnőttkorban, sokszor idős korban csontosodnak el teljesen.',
        uni: 'Az **agykoponya** (neurocranium) boltozata desmalis (intramembranosus) csontosodással, a koponyaalap viszont nagyrészt **porcos előképből** (chondrocranium, endochondralis csontosodás) fejlődik; az **arckoponya** (viscerocranium) főként a garatívekből ered. A varratok (suturae) rostos ízületek (synarthrosis): növekedési zónaként működnek, és a korai összecsontosodásuk (**craniosynostosis**) torz koponyaformát okoz. Az állkapocsízület (articulatio temporomandibularis) **ízületi porckoronggal** két részre osztott ízület, amely forgó és csúszó mozgást is végez. A koponyaalap nyílásain (pl. foramen magnum) lépnek ki az agyidegek és a gerincvelő.',
        fact: 'A test legkisebb csontja a középfülben lévő **kengyel** (stapes): kb. 3 mm-es, nagyjából akkora, mint egy rizsszem.'
      },
      {
        id: 'gerinc', z: 1, name: 'Gerinc (csigolyák)', svg: spine, explode: [0, -4], badge: [320, 312], latin: 'columna vertebralis', en: 'vertebral column (spine)', lesson: 'bio-alap/emberi-test-1',
        terms: ['anatomia/izulet', 'mechanika/kihajlas'],
        what: 'A test „tengelye”, amely a fejet és a törzset tartja, és a csatornájában a **gerincvelőt** védi. Gyerekkorban **33–34 csigolyából** áll: **7 nyaki**, **12 háti**, **5 ágyéki**, 5 keresztcsonti és 3–5 farokcsonti. Felnőttkorra a keresztcsonti csigolyák **keresztcsonttá**, a farokcsigolyák **farokcsonttá** nőnek össze, így 24 mozgatható csigolya + 2 csont = **26 csont** marad. Oldalról nézve **kettős S alakú**, ami rugóként tompítja a lépések rázkódását.',
        madeOf: 'Minden csigolya egy vaskos **csigolyatestből** (belül szivacsos csontból) és egy **csigolyaívből** áll, amelyből nyúlványok erednek az izmok és szalagok tapadására. A testek között **porckorongok** vannak: kívül rostos **gyűrű**, belül kocsonyás **mag**. A rajzon a halványkék sáv a porckorongokat jelzi.',
        how: 'Az embrióban a gerincvelőt kísérő **gerinchúr** (chorda dorsalis) körül szelvényesen elrendezett sejtcsomókból (ősszelvények) fejlődnek a csigolyák; a gerinchúr maradványa a porckorongok kocsonyás magja. Újszülöttkorban a gerinc egyetlen **C alakú** ív. Amikor a csecsemő kb. 3 hónaposan tartani kezdi a fejét, kialakul a **nyaki görbület**, amikor pedig áll és jár (kb. 1 éves kortól), az **ágyéki görbület** is.',
        uni: 'A gerinc görbületei: nyaki és ágyéki **lordosis**, háti és keresztcsonti **kyphosis**. A porckorong **hidrosztatikus** teherviselő: a mag folyadéknyomása a rostos gyűrűt körkörösen feszíti (mint egy nyomástartó edény falát). A porckorongon belüli nyomás testhelyzetfüggő (Nachemson és Wilke mérései szerint előrehajolva ülve sokszorosa a fekvésben mértnek), és nappal a magból víz préselődik ki: ezért vagyunk este kb. 1 cm-rel alacsonyabbak. A leggyakoribb **porckorongsérv** az L4–L5 és L5–S1 szinten jön létre, ahol a legnagyobb a terhelés. A gerincet merevítő mélyhátizmok nélkül a csontos oszlop már néhány kg-nyi terhelésre **kihajlana**.',
        fact: 'A **zsiráfnak** is csak **7 nyakcsigolyája** van, ugyanannyi, mint nekünk: szinte minden emlősnél ennyi, a zsiráf csigolyái egyszerűen sokkal hosszabbak.'
      },
      {
        id: 'mellkas', z: 2, name: 'Bordák és szegycsont', svg: ribs, explode: [0, -12], badge: [372, 236], latin: 'costae et sternum', en: 'ribs and sternum (thoracic cage)',
        terms: ['anatomia/legzesmechanika'],
        what: 'A **12 pár borda**, a **szegycsont** és a háti csigolyák alkotják a **mellkast**, amely a szívet és a tüdőt védi. Az **1–7.** bordák porcukkal közvetlenül a szegycsonthoz kapcsolódnak (**valódi bordák**), a **8–10.** bordák a felettük lévő borda porcához (**álbordák**), a **11–12.** bordák elülső vége szabad (**lengőbordák**). A szegycsont három része: a **markolat**, a **test** és a **kardnyúlvány**.',
        madeOf: 'A bordák vékony, ívelt **lapos csontok**, elülső végükön rugalmas **üvegporccal** (bordaporc). A szegycsontban és a bordákban felnőttkorban is **vörös csontvelő** van, amely vérsejteket termel.',
        how: 'A bordák a háti csigolyák kezdetleges nyúlványaiból nőnek ki az embrióban, a szegycsont két, egymás felé növő porcos lécből forr össze a középvonalban; ha ez nem teljes, a szegycsonton rés maradhat. A csontosodás porcos előképben indul. A **kardnyúlvány** sokáig porcos marad, gyakran csak 40 éves kor körül csontosodik el. **Légzéskor** a bordaközi izmok a bordákat felemelik és kifelé fordítják (mint egy vödör fülét), így nő a mellkas térfogata.',
        uni: 'Belégzéskor két mozgás tágítja a mellkast: a felső bordák a szegycsonttal együtt előre-felfelé mozdulnak („szivattyúkar”, a mellkas elülső–hátulsó átmérője nő), az alsó bordák oldalra emelkednek („vödörfül”, a harántátmérő nő). A fő belégzőizom mégis a **rekeszizom**. A bordaporcok rugalmassága miatt a mellkas a gyermekeknél nagyon rugalmas; idős korban a porcok elmeszesednek, a mellkas merevebbé válik. Újraélesztéskor a szegycsontot felnőttnél **5–6 cm** mélyen kell lenyomni, percenként 100–120-szor; ilyenkor bordatörés is előfordulhat, de az életmentés fontosabb.',
        fact: 'Az emberek kis részénél (1%-nál kevesebbnél) a 7. nyakcsigolyából is nő egy kis plusz borda, az ún. **nyaki borda**. Általában semmi bajt nem okoz.'
      },
      {
        id: 'vallov', z: 4, name: 'Vállöv (kulcscsont, lapocka)', svg: girdle, explode: [0, -24], badge: [252, 170], latin: 'cingulum pectorale (clavicula, scapula)', en: 'shoulder girdle: clavicle and scapula',
        terms: ['anatomia/izulet'],
        what: 'A vállöv köti a kart a törzshöz. Két csontja van mindkét oldalon: elöl a vízszintes, enyhén S alakú **kulcscsont**, hátul a háromszög alakú **lapocka** (a rajzon áttetszően, mert a bordák mögött van). A lapockán lévő sekély **ízületi árokba** illeszkedik a felkarcsont feje: ez a **vállízület**, testünk legmozgékonyabb ízülete.',
        madeOf: 'A kulcscsont vaskos, rövid csöves csont. A lapocka vékony, lapos csont, a hátsó felszínén egy taraj fut, amely a váll csúcsán a **vállcsúcsnyúlványban** végződik; ide kapcsolódik a kulcscsont. A lapockát szinte csak izmok tartják a mellkason.',
        how: 'A **kulcscsont** a legelső csont, amely az embrióban elkezd csontosodni (kb. az 5–6. héten), és a szegycsonti vége az utolsó, amely összenő (kb. 25 éves korban). A lapocka porcos előképből csontosodik. Mivel a vállövnek a törzshöz csak egy kis ízülete van (a kulcscsont és a szegycsont között), a vállunk nagyon mozgékony, de könnyebben sérül is (pl. vállficam, kulcscsonttörés eséskor).',
        uni: 'A kar felemelésekor a vállízület (articulatio humeri) és a lapocka mellkasfalon való elfordulása kb. **2 : 1** arányban osztozik a mozgáson (**scapulohumeralis ritmus**): 180°-os emelésből kb. 120° a vállízületé, 60° a lapocka forgásáé. A vállízület ízületi árka kicsi a fejhez képest, stabilitását főleg az **izmok** (rotátorköpeny) és a porcos ajak (labrum) adják: ezért itt fordul elő a legtöbb ficam. A kulcscsont merevítő „támasztórúdként” tartja távol a vállat a mellkastól; törése jellemzően a középső harmadban, kinyújtott karra eséskor jön létre.',
        fact: 'A kulcscsont az első csont, amely csontosodni kezd, és az utolsó, amely teljesen „elkészül”: a szegycsont felőli vége kb. **25 éves korban** nő össze.'
      },
      {
        id: 'felkar', z: 5, name: 'Felkarcsont', svg: hum, explode: [0, -10], badge: [194, 236], latin: 'humerus', en: 'humerus (upper arm bone)',
        terms: ['anatomia/csont', 'mechanika/masodrendu-nyomatek', 'mechanika/hajlitonyomatek'],
        what: 'A felkar egyetlen, hosszú **csöves csontja**. Felső, gömb alakú **feje** a lapocka ízületi árkába illeszkedik (vállízület), alsó, kiszélesedő vége az alkar két csontjával alkotja a **könyökízületet**. Rajta tapad sok erős izom, pl. a kétfejű és a háromfejű karizom.',
        madeOf: 'Mint minden csöves csont: a középső része (**csontszár**) vastag falú **tömör csontból** álló cső, belül **velőüreggel** (felnőttben sárga, zsíros csontvelővel); a két vége (**csontvégek**) **szivacsos csontból** áll, amelyet ízületi porc borít. A csontot kívül a **csonthártya** borítja, ebben futnak az erek és az idegek.',
        how: 'Porcos előképből fejlődik (**porcos csontosodás**): az embrióban a 8. hét körül a csontszár közepén indul a csontosodás, a csontvégekben csak születés után. A szár és a vég között gyerekkorban **növekedési porckorong** van, ebben hosszabbodik a csont. A felkarcsont hosszanti növekedésének nagy része a **felső** porckorongban történik.',
        uni: 'A csöves forma mechanikailag optimális: a hajlításkor fellépő feszültség `σ = M·y / I`, ahol az üreges keresztmetszet másodrendű nyomatéka `I = π·(R⁴ − r⁴)/4`. Mivel I a sugár negyedik hatványával nő, a középen lévő anyag alig vesz részt a hajlítás felvételében: egy r = 0,6·R belső sugarú cső a tömör rúd tömegének 64%-ával az inercia 87%-át adja. A **Wolff-törvény** szerint a csont a terheléshez igazodva épül át: teniszezők ütőkarjának felkarcsontja kérge vastagabb lehet, mint a másik karé.',
        fact: 'Amikor „beütöd a könyöködet” és bizsereg a kisujjad, valójában a felkarcsont belső bütyke mögött, közvetlenül a bőr alatt futó **singideget** ütötted meg.'
      },
      {
        id: 'alkar', z: 5, name: 'Alkar (orsó- és singcsont)', svg: fore, explode: [0, 12], badge: [182, 350], latin: 'radius et ulna', en: 'forearm bones: radius and ulna',
        terms: ['anatomia/izulet'],
        what: 'Az alkarban két csont fut egymás mellett: a hüvelykujj felőli (kifelé eső) **orsócsont** és a kisujj felőli (befelé eső) **singcsont**. A singcsont vaskos felső vége (a **könyökcsúcs**) alkotja a könyök hegyét. Amikor a tenyeredet lefelé fordítod, az orsócsont a singcsont körül **átfordul**, a két csont keresztezi egymást: így tudsz csavarhúzót forgatni vagy kulcsot fordítani.',
        madeOf: 'Két csöves csont, amelyeket a teljes hosszukon egy erős kötőszöveti hártya (**csontközti hártya**) köt össze. Felül és alul is ízület kapcsolja őket egymáshoz.',
        how: 'Porcos csontosodással fejlődnek, mindkettőben két-két növekedési porckoronggal. A csuklóhoz közeli orsócsontvég nagyon gyakran törik: ha valaki **kinyújtott kézre esik**, az erő itt koncentrálódik. Ez a felnőttek egyik leggyakoribb törése, főleg idős, csontritkulásos embereknél.',
        uni: 'A felső és az alsó orsó–sing ízület (articulatio radioulnaris proximalis és distalis) együtt egy **forgótengelyt** alkot, amely a kis fejtől a singcsont fejéig fut: ez teszi lehetővé a kb. 150–160°-os **pronatio–supinatio** mozgást. A kézre ható erőt főleg az orsócsont veszi át (ez kapcsolódik a kéztőhöz), a csontközti hártya rostjai pedig ennek egy részét a singcsontra vezetik át, amely a könyökízületben a felkarcsontra adja tovább. A supinatio erősebb a pronatiónál (a kétfejű karizom is supinál), ezért a csavarok „jobbos” menetűek.',
        fact: 'Az orsócsont alsó végének törése (Colles-törés) az egyik leggyakoribb csonttörés: tipikusan akkor történik, amikor valaki megcsúszik a jégen, és kinyújtott kézzel próbálja tompítani az esést.'
      },
      {
        id: 'kez', z: 5, name: 'Kéz csontjai', svg: hnd, explode: [0, 36], badge: [170, 455], latin: 'ossa manus (ossa carpi, ossa metacarpi, phalanges)', en: 'bones of the hand: carpals, metacarpals, phalanges',
        terms: ['anatomia/izulet'],
        what: 'Egy kézben **27 csont** van: **8 kéztőcsont** két sorban (a csukló), **5 kézközépcsont** (a tenyér) és **14 ujjperc** (a hüvelykujjban 2, a többi ujjban 3–3). A hüvelykujj tövében lévő különleges **nyeregízület** teszi lehetővé, hogy a hüvelykujjat szembefordítsuk a többi ujjal: így tudunk finoman fogni, írni.',
        madeOf: 'A kéztőcsontok kicsi, szabálytalan alakú, szivacsos belsejű **rövid csontok**; a kézközépcsontok és az ujjpercek kis **csöves csontok**. Közöttük sok apró ízület és szalag van, a csontokat az ínak mozgatják, az alkarban lévő izmok húzzák őket (mint a marionettbábut a zsinórok).',
        how: 'Újszülöttben a kéztőcsontok még porcosak, és egymás után, jól ismert sorrendben csontosodnak el: az első néhány hónapos korban, az utolsó (a borsócsont) csak kb. 9–12 éves korban. Ezért a kézről készült **röntgenkép** alapján az orvosok meg tudják becsülni egy gyerek **csontéletkorát**, és azt, hogy mennyit fog még nőni.',
        uni: 'A **csontkor**-meghatározás (pl. Greulich–Pyle-atlasz vagy Tanner–Whitehouse-módszer) a bal kéz és csukló röntgenképén a csontosodási magok megjelenését, alakját és a növekedési porckorongok záródását veti össze standardokkal; a növekedési zavarok és a pubertás időzítésének megítélésére használják. A kéztőcsontok a tenyér felé nyitott árkot alkotnak, amelyet egy harántszalag hidal át: ez a **kéztőalagút**, benne fut a középideg és az ujjhajlító inak; beszűkülése okozza a kéztőalagút-szindrómát.',
        fact: 'A két kezünkben 54, a két lábfejünkben 52 csont van: a test 206 csontjának **több mint a fele** a kezekben és a lábakban található.'
      },
      {
        id: 'medence', z: 3, name: 'Medence', svg: pelvis, explode: [0, 6], badge: [380, 344], latin: 'pelvis (ossa coxae)', en: 'pelvis (hip bones)', lesson: 'bio-alap/emberi-test-1',
        terms: ['anatomia/izulet', 'mechanika/sulypont'],
        what: 'A két **medencecsont** hátul a **keresztcsonttal**, elöl egymással (a **szeméremcsonti összeköttetésnél**) egy erős **csontgyűrűt** alkot. Ez adja át a törzs súlyát a lábaknak, védi a kismedence szerveit (húgyhólyag, belek, méh), és rajta tapadnak a csípő és a has nagy izmai. Oldalt egy-egy mély gödör (**vápa**) fogadja a combcsont fejét: ez a **csípőízület**.',
        madeOf: 'Minden medencecsont **három csont** összenövéséből jön létre: felül a széles, lapátszerű **csípőcsont**, alul-hátul az **ülőcsont** (ezen ülünk), elöl a **szeméremcsont**. A rajz közepén látható keresztcsont a gerinc része. A medencecsont belseje szivacsos, és felnőttkorban is sok **vörös csontvelőt** tartalmaz.',
        how: 'A három csont gyerekkorban külön-külön csontosodik, és a vápában egy **Y alakú porc** köti össze őket; ez kb. 15–17 éves korra csontosodik el. A női medence a kamaszkor alatt **szélesebbé és kerekebbé** alakul, mert a szülőcsatornát kell alkotnia: a medence a legmegbízhatóbb csontos nemi jelleg.',
        uni: 'A medencegyűrű a test súlyát két ívben vezeti: állva a keresztcsonttól a vápákon át a combcsontok felé, ülve az ülőgumók felé. A keresztcsont–csípőcsonti ízület (articulatio sacroiliaca) erős szalagokkal rögzített, alig mozgó ízület. Nemi különbségek: nőknél a medencebemenet ovális, a **szeméremcsonti szög** 90° fölötti (férfiaknál kb. 60–70°), a kismedence tágasabb. Az igazságügyi antropológiában a medence alapján a nem kb. 95% feletti biztonsággal megállapítható.',
        fact: 'A **csípőcsont taraját** a derekunkon kitapinthatjuk: ez az a „csontos perem”, amelyen a kezünket megtámasztjuk, amikor csípőre tesszük.'
      },
      {
        id: 'combcsont', z: 4, name: 'Combcsont', svg: femur, explode: [0, 20], badge: [384, 456], latin: 'femur', en: 'femur (thigh bone)',
        terms: ['anatomia/csont', 'mechanika/rugalmassagi-modulus', 'mechanika/feszultseg'],
        what: 'A test **leghosszabb és legerősebb** csontja, hossza a testmagasság kb. **negyede** (175 cm-es embernél kb. 45 cm). Felső végén a gömb alakú **fej** egy ferde **nyakon** ül, és a medence vápájába illeszkedik; mellette a **nagy tompor** (a csípőn kitapintható dudor). Alsó vége két bütyökkel a **térdízületet** alkotja. A combcsontok lefelé befelé tartanak, így a térdek közel kerülnek egymáshoz.',
        madeOf: 'Vastag falú **csöves csont**. A fejében és nyakában a szivacsos csont gerendái (trabekulái) pontosan a terhelés irányában rendeződnek, mint egy daru rácsos szerkezetének rúdjai. Felnőttnél a velőüregében sárga, zsíros velő van.',
        how: 'Porcos előképből csontosodik; a szár közepén már a 7. embrionális héten megjelenik a csontosodási központ. A combcsont hosszanti növekedésének nagyobbik része az **alsó** (térd feletti) növekedési porckorongban zajlik; ezek a lányoknál kb. 14–16, a fiúknál kb. 16–19 éves korban záródnak be, ekkor áll le a magasságnövekedés.',
        uni: 'A tömör csontkéreg rugalmassági modulusa kb. **17–20 GPa**, nyomószilárdsága kb. 170–190 MPa, húzószilárdsága kb. 110–130 MPa (anizotrop: hosszirányban a legerősebb). A combnyak és a szár által bezárt **nyak–szár szög** felnőttben kb. 125–135°; ennek változása (coxa vara / valga) megváltoztatja a nyakat terhelő hajlítónyomatékot. A trabekulák elrendezésének és a feszültségi trajektóriáknak a hasonlóságát **Karl Culmann** mérnök és **Hermann von Meyer** anatómus írta le az 1860-as években; erre épült Julius Wolff „átépülési törvénye” (1892). Idős korban a **combnyaktörés** a csontritkulás egyik legsúlyosabb következménye.',
        fact: 'Járás közben a combcsont fejét a testsúly kb. **2,5–3-szorosa** terheli, mert a csípőizmoknak is húzniuk kell, hogy a medence ne billenjen el: futáskor ez még nagyobb.'
      },
      {
        id: 'terdkalacs', z: 6, name: 'Térdkalács', svg: patella, explode: [0, 36], badge: [378, 528], latin: 'patella', en: 'kneecap (patella)',
        terms: ['anatomia/izulet', 'mechanika/nyomatek'],
        what: 'Lapos, háromszögletű csont a **térd elején**, amely a combfeszítő (négyfejű combizom) **inába ágyazódva** csúszik a combcsont bütykei közötti árokban. Védi a térdízületet, és **emelőként** megnöveli a combizom erőkarját, így könnyebben nyújtjuk ki a térdet (lépcsőn felfelé, felálláskor). A térdízület a test **legnagyobb** ízülete, benne két porcos **meniszkusszal** és a keresztszalagokkal.',
        madeOf: 'Belül szivacsos csont, a hátsó felszínét a testben az egyik **legvastagabb ízületi porc** (akár 4–5 mm) borítja, mert itt nagy erők hatnak. A térdkalács egy **szezámcsont**: ínba ágyazott csont.',
        how: 'Újszülöttben a térdkalács még teljesen **porcos**, a röntgenképen nem is látszik. Kb. 3–6 éves korban kezd elcsontosodni, és a kamaszkor végére lesz teljesen csontos.',
        uni: 'A térdkalács a négyfejű combizom ínjának hatásvonalát eltolja a forgástengelytől, így **megnöveli az erőkart** és vele a nyújtónyomatékot (a térdkalács eltávolítása után jelentős nyújtóerő-csökkenés mérhető). Ennek ára a nagy **patellofemorális kompressziós erő**: lépcsőn járáskor a testsúly kb. 3-szorosa, mély guggolásnál ennek többszöröse is lehet. A térdkalácsot a szalagok és a combizmok egyensúlya tartja a vályúban; ennek zavara a kificamodás.',
        fact: 'A kisbabáknak is van térdkalácsa, csak még **porcból**: ezért nem látszik a röntgenen, és ezért gondolják sokan tévesen, hogy térdkalács nélkül születünk.'
      },
      {
        id: 'labszar', z: 4, name: 'Lábszár (sípcsont, szárkapocscsont)', svg: leg, explode: [0, 54], badge: [394, 652], latin: 'tibia et fibula', en: 'lower leg bones: tibia and fibula',
        terms: ['anatomia/csont'],
        what: 'A lábszárban két csont van. A belső, vaskos **sípcsont** viseli a súly döntő részét: felső, lapos vége a térdízület alsó része, alsó vége a **belső bokát** alkotja. A sípcsont elülső éle közvetlenül a bőr alatt van, ezért fáj annyira, ha megütjük. A külső, vékony **szárkapocscsont** főleg izomtapadási hely, és alul a **külső bokát** adja; a két csont együtt villaként fogja közre az ugrócsontot.',
        madeOf: 'Két csöves csont, köztük csontközti hártyával. A sípcsont keresztmetszete háromszögletű, kérge vastag. A szárkapocscsont vékony, de hosszú.',
        how: 'Porcos csontosodással fejlődnek, a felső és az alsó végükön növekedési porckoronggal. A szárkapocscsont annyira „pótolható”, hogy a sebészek egy darabját kivehetik, és például az **állkapocs** pótlására használhatják fel, a lábszár ettől még működik.',
        uni: 'A tengelyirányú terhelés kb. 85–90%-át a sípcsont, kb. 10–15%-át a szárkapocscsont viseli. A sípcsont elülső–belső felszínét csak bőr fedi, ezért törései gyakran **nyílt** törések, és a gyenge lágyrész-borítás miatt lassabban gyógyulnak. A csonthosszabbítás (**distractiós osteogenesis**) módszerét Gavriil **Ilizarov** dolgozta ki az 1950-es években: a kettévágott csontot külső rögzítővel naponta kb. 1 mm-rel távolítják, és a résben új csont képződik.',
        fact: 'A sípcsont elülső éle olyan közel van a bőrhöz, hogy a focisták **sípcsontvédőt** viselnek: egy rúgás itt könnyen csonthártya-sérülést vagy akár törést okozhat.'
      },
      {
        id: 'labfej', z: 5, name: 'Lábfej csontjai', svg: foot, explode: [0, 80], badge: [394, 792], latin: 'ossa pedis (ossa tarsi, ossa metatarsi, phalanges)', en: 'bones of the foot: tarsals, metatarsals, phalanges',
        terms: ['anatomia/izulet', 'mechanika/egyensuly'],
        what: 'Egy lábfejben **26 csont** van: **7 lábtőcsont** (köztük az ugrócsont, amelyre a lábszár támaszkodik, és a legnagyobb, a **sarokcsont**), **5 lábközépcsont** és **14 ujjperc**. A csontok **boltozatot** alkotnak (hosszanti és haránt boltozat), ezért a láb nem teljes talpával, hanem főleg a sarkán és az ujjpercek tövén áll. A boltozat rugóként nyeli el a lépések erejét. (A rajz a lábfejet elölről-felülről mutatja, ezért rövidült.)',
        madeOf: 'A lábtőcsontok vaskos, szivacsos **rövid csontok**, a lábközépcsontok és ujjpercek kis csöves csontok. A boltozatot nem csak a csontok alakja, hanem az erős talpi **szalagok** és a lábizmok is tartják.',
        how: 'A sarokcsont és az ugrócsont már magzatkorban kezd csontosodni, a többi lábtőcsont születés után. A kisgyerekek talpa **laposnak** látszik: a boltozat csak az első években, a járással és az izmok erősödésével alakul ki, ezért kisgyerekkorban a lúdtalp még többnyire nem betegség.',
        uni: 'Járáskor a talajreakció-erő csúcsa kb. a testsúly 1,1–1,3-szorosa, futáskor 2–3-szorosa. A hosszanti boltozatot a talpi bőnye feszíti, mint egy íj húrja; az ujjak felfeszítésekor (elrugaszkodás) a bőnye a lábközépcsontfejek körül feltekeredik, és **megemeli a boltozatot** („csörlőmechanizmus”, windlass mechanism). A sarokcsonthoz tapadó **Achilles-ín** a lábfej emelőjén a bokaízület körül forgatónyomatékot ad: lábujjhegyre álláskor a láb kétkarú emelőként működik.',
        fact: 'A test **legerősebb ina**, az Achilles-ín a sarokcsonthoz tapad: futáskor a testsúly többszörösét bírja, és rugóként energiát tárol és ad vissza.'
      }
    ],
    uni: {
      text: 'Egyetemi szemmel a csont egy **hierarchikus kompozit anyag** és egy **élő, folyamatosan átépülő szerv**.\n\n**Anyag.** A csont tömegének kb. 60–70%-a ásványi anyag (főként **hidroxiapatit**, `Ca₁₀(PO₄)₆(OH)₂`, nanométeres lemezkék formájában), kb. 20–30%-a szerves (főként I-es típusú **kollagén**), a többi víz. A kollagén hajlékonyságot és húzószilárdságot, az ásvány merevséget és nyomószilárdságot ad: együtt erősebbek és szívósabbak, mint külön. A test kalciumának kb. **99%-a** a csontokban van.\n\n**Felépítés.** A tömör (kortikális) csontot osteonok (Havers-rendszerek) építik fel, a szivacsos (trabekuláris) csont gerendái a feszültségi trajektóriák mentén rendeződnek. Alak szerint csöves (hosszú), rövid, lapos, szabálytalan és szezámcsontokat különböztetünk meg.\n\n**Fejlődés.** Kétféle csontosodás van: a **desmalis** (kötőszövetből, pl. koponyatető, kulcscsont nagy része) és az **endochondralis** (porcos előképből, a legtöbb csont). A hosszanti növekedés a **növekedési porckorongban** (epiphysealis lemez) zajlik: nyugvó → osztódó (oszloposan rendeződő) → hipertrófiás → meszesedő porcsejt-zónák, majd a porcot csont váltja fel.\n\n**Átépülés.** Az **oszteoklasztok** lebontják, az **oszteoblasztok** felépítik a csontot (bazális többsejtű egységekben, BMU); felnőttben évente a csontváz kb. **10%-a** cserélődik ki. Frost **mechanosztát**-elmélete szerint a csont a megszokott alakváltozáshoz (néhány száz–ezer mikrostrain) igazítja tömegét: tartós terhelés felett épül, tehermentesítéskor (ágynyugalom, űrrepülés) leépül.\n\n**Szabályozás.** A vér kalciumszintjét a **parathormon** (növeli: csontlebontás, kalcium-visszaszívás a vesében, D-vitamin aktiválás), a **kalcitriol** (aktív D-vitamin: bélből való felszívás) és a **kalcitonin** (csökkenti) állítja be.\n\n**Klinikum.** A **csontritkulás** (osteoporosis) diagnózisa DXA-méréssel: T-érték ≤ −2,5. Csonttörés gyógyulása: haematoma → gyulladás → lágy (porcos) callus → kemény callus → átépülés, összesen hetektől hónapokig.',
      terms: ['anatomia/csont', 'anatomia/izulet', 'anatomia/kotoszovet', 'anatomia/izomosszehuzodas', 'mechanika/rugalmassagi-modulus', 'mechanika/masodrendu-nyomatek', 'mechanika/hajlitonyomatek', 'mechanika/feszultseg', 'mechanika/faradas', 'mechanika/kihajlas', 'msc-elettan/hormon-hatasmechanizmus']
    },
    steps: [
      { icon: '🧬', title: 'Porcmodell az embrióban', when: '5–8. embrionális hét', text: 'Az embrió végtagbimbóiban és törzsében először **porcból** készül el a leendő csontok kicsinyített „makettje”. A koponyatető és a kulcscsont nagy része viszont porc nélkül, közvetlenül **kötőszövetből** csontosodik majd el. A kulcscsont már az 5–6. héten elkezd csontosodni: ez az első.', parts: ['vallov', 'koponya'] },
      { icon: '🦴', title: 'Elsődleges csontosodási központok', when: 'kb. 7–12. hét', text: 'A csöves csontok **szárának közepén** a porcot erek nőnek át, a porcsejtek elhalnak, és **csontképző sejtek** (oszteoblasztok) raknak le helyette csontot. A csontosodás a közepétől a végek felé halad, a szár belsejében pedig kialakul a **velőüreg**.', parts: ['combcsont', 'felkar', 'labszar', 'alkar'] },
      { icon: '👶', title: 'Születés: kb. 270–300 csont', text: 'Az újszülöttnek **több csontja** van, mint a felnőttnek, mert sok csont még több darabból áll (pl. a medencecsont, a keresztcsont), a koponya csontjai között pedig puha **kutacsok** vannak. A térdkalács és a kéztőcsontok még porcosak.', parts: ['koponya', 'medence', 'terdkalacs', 'kez'] },
      { icon: '📏', title: 'Hosszanti növekedés a növekedési porckorongban', text: 'A csontvégekben is megjelennek a **másodlagos csontosodási központok**, de a vég és a szár között egy vékony **porclemez** megmarad. Ebben a porcsejtek osztódnak, a szár felőli oldalon pedig a porcot folyamatosan csont váltja fel: így **hosszabbodik** a csont. Vastagodni a csonthártya alatt, kívülről rakódó csonttal tud.', parts: ['combcsont', 'labszar', 'felkar'] },
      { icon: '🚀', title: 'Kamaszkori növekedési ugrás és lezáródás', when: 'lányok kb. 10–16, fiúk kb. 12–19 év', text: 'A nemi hormonok hatására a csontok gyorsan nőnek (évente akár 8–10 cm), majd ugyanezek a hormonok **lezárják** a növekedési porckorongokat: a porc elcsontosodik, a magasság végleges lesz. A medence nemre jellemző alakja ekkor alakul ki. Utolsóként a kulcscsont szegycsonti vége nő össze, kb. 25 éves korban.', parts: ['combcsont', 'labszar', 'medence', 'vallov'] },
      { icon: '🔄', title: 'Átépülés egész életen át', text: 'A csont nem „kész”: **csontbontó** (oszteoklaszt) és **csontépítő** (oszteoblaszt) sejtek folyamatosan cserélik, évente a csontváz kb. 10%-át. A csont a terheléshez igazodik: mozgással, ugrással erősödik, mozdulatlanságban (vagy az űrben) gyengül. A legnagyobb **csonttömeg** kb. 30 éves korra alakul ki.', parts: ['gerinc', 'combcsont', 'mellkas'] },
      { icon: '🩹', title: 'Ha eltörik: a csont meggyógyítja magát', text: 'A törés helyén először **vérömleny** keletkezik, majd néhány nap alatt kötőszövetből és porcból puha „ragasztó”, ún. **csontheg** (callus) nő, amely hetek alatt **elcsontosodik**. Ezt a csont hónapok alatt eredeti alakjára építi át. A gipsz vagy a fémrögzítő csak azt biztosítja, hogy a végek közben ne mozduljanak el.', parts: ['alkar', 'labszar'] },
      { icon: '👵', title: 'Idős kor: csontritkulás', when: 'főként 50 év felett', text: 'Idősebb korban a bontás felülmúlja az építést, a szivacsos csont gerendái elvékonyodnak (**csontritkulás**), különösen a nőknél a változókor után. Ilyenkor kis esésre is eltörhet a **combnyak**, a csukló vagy egy **csigolya**. Megelőzés: mozgás, elég kalcium és D-vitamin, a dohányzás kerülése.', parts: ['combcsont', 'gerinc', 'alkar'] }
    ],
    history: [
      { year: 'Kr. e. 3. sz.', text: 'Az egyiptomi **Alexandriában** Hérophilosz és Eraszisztratosz orvosok emberi holttesteket boncolnak: ez az anatómia első tudományos korszaka.' },
      { year: 'Kr. u. 2. sz.', text: '**Galénosz** görög orvos könyvet ír a csontokról, de főként majmok és más állatok boncolása alapján. Néhány tévedése (pl. hogy az ember állkapcsa két csontból áll) 1300 évig tartotta magát.' },
      { year: '1543', text: 'Andreas **Vesalius** németalföldi orvos kiadja a „De humani corporis fabrica” (Az emberi test felépítéséről) című művét, gyönyörű fametszetekkel. Saját boncolásai alapján kijavítja Galénosz tévedéseit: ez a modern anatómia születése.' },
      { year: '1866–1892', text: 'Karl **Culmann** mérnök és Hermann von **Meyer** anatómus felfedezi, hogy a combcsont szivacsos gerendái a daruk feszültségvonalai szerint futnak; Julius **Wolff** ebből fogalmazza meg, hogy a csont a terheléshez igazodva épül át (Wolff-törvény).' },
      { year: '1895', text: 'Wilhelm Conrad **Röntgen** felfedezi az X-sugarakat, és elkészíti az első röntgenképet felesége kezéről: először lehetett élő emberben a csontokat látni. 1901-ben ő kapta az első fizikai Nobel-díjat.' },
      { year: '1896', text: 'Néhány héttel Röntgen bejelentése után **Eötvös Loránd** és **Klupáthy Jenő** Budapesten már röntgenfelvételeket készít (többek közt Eötvös kezéről): ezek az első magyarországi röntgenképek.' },
      { year: '1950-es évek', text: 'Gavriil **Ilizarov** szovjet orvos kifejleszti a csontot kívülről, gyűrűkkel és tűkkel rögzítő eszközét, és felfedezi, hogy a lassan széthúzott csontvégek között új csont nő (csonthosszabbítás).' },
      { year: '1962', text: 'John **Charnley** angol sebész bevezeti a modern, kis súrlódású **csípőprotézist** (fém fej, műanyag vápa, csontcement). Ma évente milliónyi csípő- és térdprotézist ültetnek be a világon.' },
      { year: '1974', text: 'Etiópiában megtalálják **„Lucy”** csontvázát: egy kb. 3,2 millió éves előember (Australopithecus afarensis) csontjainak kb. 40%-át. A medencéje és a combcsontja bizonyítja, hogy már két lábon járt.' }
    ],
    quiz: [
      { q: 'Hány csontja van egy felnőtt embernek?', options: ['206', '106', '300', '412'], answer: 0, explain: 'Felnőttnek 206 csontja van; az újszülöttnek kb. 270–300, mert sok csont később nő össze.' },
      { q: 'Melyik a test leghosszabb és legerősebb csontja?', options: ['A combcsont', 'A sípcsont', 'A felkarcsont', 'A gerinc'], answer: 0, explain: 'A combcsont hossza a testmagasság kb. negyede.' },
      { q: 'Hány nyakcsigolyája van az embernek?', options: ['7', '5', '12', '3'], answer: 0, explain: '7 nyaki, 12 háti és 5 ágyéki csigolyánk van; a zsiráfnak is 7 nyakcsigolyája van.' },
      { q: 'Hol hosszabbodik egy gyerek csöves csontja?', options: ['A növekedési porckorongban, a csont vége és a szára között', 'A csont közepén, a velőüregben', 'A csonthártyán kívül', 'Az ízületi porcban'], answer: 0, explain: 'A növekedési porckorongban a porcsejtek osztódnak, a szár felőli oldalon pedig csont váltja fel a porcot.' },
      { q: 'Melyik alkarcsont van a hüvelykujj felőli oldalon?', options: ['Az orsócsont', 'A singcsont', 'A felkarcsont', 'A szárkapocscsont'], answer: 0, explain: 'Az orsócsont (radius) a hüvelykujj, a singcsont (ulna) a kisujj felőli oldalon van; tenyérfordításkor az orsócsont átfordul a singcsont körül.' }
    ]
  });
})();
