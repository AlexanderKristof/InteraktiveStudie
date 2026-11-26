/* Modell: rétegvulkán egy alábukási (szubdukciós) zóna fölött – függőleges metszet, nem méretarányos.
 * Balról az óceáni lemez a kontinentális lemez alá bukik; a lemezből felszabaduló víz megolvasztja a
 * fölötte lévő köpenyt, a magma a kéregben magmakamrában gyűlik össze, és a kürtőn át tör a felszínre.
 * A felszín y = 330-nál van; a kúp metszetén a láva- és hamurétegek látszanak. */
(function () {
  var NS = ' pointer-events="none"';
  var G = 330, CX = 450;
  function txt(x, y, s, cls, extra) { return '<text class="' + cls + '" x="' + x + '" y="' + y + '"' + (extra || '') + NS + '>' + s + '</text>'; }
  function bez(p, t) {
    var u = 1 - t;
    return [u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0],
      u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]];
  }
  function arrow(x1, y1, x2, y2, col, w) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7;
    return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' M' + (x2 - h * Math.cos(a - 0.45)).toFixed(1) + ' ' + (y2 - h * Math.sin(a - 0.45)).toFixed(1) + ' L' + x2 + ' ' + y2 + ' L' +
      (x2 - h * Math.cos(a + 0.45)).toFixed(1) + ' ' + (y2 - h * Math.sin(a + 0.45)).toFixed(1) + '" stroke="' + col + '" stroke-width="' + (w || 2.4) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"' + NS + '/>';
  }
  /* a kúp két oldala (Bézier-görbék) */
  var LF = [[190, G], [290, 318], [380, 240], [418, 128]], RF = [[482, 128], [520, 240], [610, 318], [710, G]];
  var CONE = 'M190 ' + G + ' C290 318 380 240 418 128 L482 128 C520 240 610 318 710 ' + G + ' Z';

  var defs = '<defs>' +
    '<linearGradient id="vk-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe3f4"/><stop offset="1" stop-color="#eef5fb"/></linearGradient>' +
    '<linearGradient id="vk-mantle" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9774a"/><stop offset="1" stop-color="#a24a2c"/></linearGradient>' +
    '<linearGradient id="vk-crust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a88b6d"/><stop offset="1" stop-color="#8a6c52"/></linearGradient>' +
    '<radialGradient id="vk-magma" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#ffe27a"/><stop offset=".45" stop-color="#ff9a2e"/><stop offset="1" stop-color="#c8361b"/></radialGradient>' +
    '<linearGradient id="vk-conduit" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e2431d"/><stop offset=".6" stop-color="#ff8a2a"/><stop offset="1" stop-color="#ffd25e"/></linearGradient>' +
    '<linearGradient id="vk-lava" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd25e"/><stop offset=".5" stop-color="#ff7a1e"/><stop offset="1" stop-color="#d8401c"/></linearGradient>' +
    '<linearGradient id="vk-slab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d4a5c"/><stop offset=".25" stop-color="#55657a"/><stop offset="1" stop-color="#6c7b8f"/></linearGradient>' +
    '<pattern id="vk-ash" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#a6907a"/><circle cx="2" cy="2" r=".9" fill="#7d6a58"/><circle cx="5.5" cy="5" r=".7" fill="#c7b39c"/></pattern>' +
    '<pattern id="vk-lavalayer" width="10" height="6" patternUnits="userSpaceOnUse"><rect width="10" height="6" fill="#55504f"/><path d="M0 3 L10 3" stroke="#655f5d" stroke-width=".8"/></pattern>' +
    '</defs>';

  /* ---------- Háttér: ég, tenger, kontinentális kéreg, köpeny ---------- */
  var crustLines = '';
  for (var cy = 352; cy < 480; cy += 22) crustLines += '<path d="M' + (175 + (cy - 380) / 0.6 > 175 ? 175 + (cy - 380) / 0.6 : 168) + ' ' + cy + ' C 400 ' + (cy - 6) + ' 640 ' + (cy + 6) + ' 900 ' + (cy - 2) + '" stroke="rgba(70,50,35,.25)" stroke-width="1" fill="none"/>';
  var backdrop = defs +
    '<rect x="0" y="0" width="900" height="' + G + '" fill="url(#vk-sky)"/>' +
    '<rect x="0" y="' + G + '" width="900" height="320" fill="url(#vk-mantle)"/>' +
    '<path d="M165 ' + G + ' L900 ' + G + ' L900 480 C760 486 560 474 342 480 L175 380 L165 340 Z" fill="url(#vk-crust)"/>' + crustLines +
    '<path d="M342 480 C560 474 760 486 900 480" stroke="#6b4a33" stroke-width="1.4" stroke-dasharray="6 4" fill="none"/>' +
    '<path d="M0 ' + G + ' L168 ' + G + ' L175 380 L150 362 L0 352 Z" fill="#5d9fd6"/>' +
    '<path d="M0 ' + G + ' L168 ' + G + '" stroke="#2f6fa8" stroke-width="2"/>' +
    '<path d="M168 ' + G + ' L900 ' + G + '" stroke="#5b4634" stroke-width="2"/>' +
    txt(14, 24, 'Rétegvulkán alábukási zóna fölött', 'lbl', ' font-size="16"') +
    txt(14, 42, 'nem méretarányos: a valóságban a magmakamra', 'lbl-muted') + txt(14, 58, 'több km, az olvadási zóna kb. 100 km mélyen van', 'lbl-muted') +
    txt(20, 322, 'óceán', 'lbl-muted', ' font-size="11"') +
    txt(596, 378, 'kontinentális kéreg', 'lbl-muted', ' font-size="11" style="fill:#f3e7da"') +
    txt(700, 520, 'köpeny (asztenoszféra)', 'lbl-muted', ' font-size="11" style="fill:#fde3d2"') +
    txt(600, 496, 'kéreg alja (Moho)', 'lbl-muted', ' font-size="10" style="fill:#fde3d2"');

  /* ---------- 11. Kőzetlemez-határ: alábukó óceáni lemez, olvadási zóna ---------- */
  var slabTop = [[0, 352], [150, 362], [175, 380], [660, 671]], slabBot = [[0, 404], [130, 412], [150, 426], [620, 708]];
  var plate = '<path d="M' + slabTop.map(function (p) { return p.join(' '); }).join(' L') + ' L' + slabBot.slice().reverse().map(function (p) { return p.join(' '); }).join(' L') + ' Z" fill="url(#vk-slab)" stroke="#27313e" stroke-width="1.4"/>' +
    '<path d="M0 360 L150 370 L172 388 L640 668" stroke="#2b3542" stroke-width="7" fill="none" opacity=".55"' + NS + '/>' +
    arrow(30, 386, 104, 390, '#fff', 2.6) + arrow(300, 486, 350, 517, '#fff', 2.6) +
    txt(28, 380, 'óceáni lemez', 'lbl', ' font-size="11" style="fill:#fff"') +
    txt(186, 404, 'mélytengeri árok', 'lbl-muted', ' font-size="10" style="fill:#e7eef7"') +
    '<text x="0" y="0" font-size="11" font-weight="700" fill="#e7eef7" font-family="system-ui, sans-serif" transform="translate(372 552) rotate(31)"' + NS + '>alábukás (szubdukció)</text>';
  // a lemezből felszabaduló víz és a fölötte olvadó köpeny
  [[408, 534], [432, 548], [456, 562]].forEach(function (p) { plate += arrow(p[0], p[1], p[0] - 4, p[1] - 22, '#9fd6ff', 1.8); });
  plate += txt(388, 504, 'H₂O', 'lbl', ' font-size="10" style="fill:#cfeaff"');
  [[470, 530, 6], [488, 512, 5], [458, 506, 4.5], [500, 540, 5.5], [478, 494, 4], [512, 520, 4.5], [494, 478, 3.6]].forEach(function (d) {
    plate += '<path d="M' + d[0] + ' ' + (d[1] - d[2] * 1.9) + ' C' + (d[0] + d[2] * 0.4) + ' ' + (d[1] - d[2]) + ' ' + (d[0] + d[2]) + ' ' + (d[1] - d[2] * 0.3) + ' ' + (d[0] + d[2]) + ' ' + (d[1] + d[2] * 0.2) +
      ' A' + d[2] + ' ' + d[2] + ' 0 0 1 ' + (d[0] - d[2]) + ' ' + (d[1] + d[2] * 0.2) + ' C' + (d[0] - d[2]) + ' ' + (d[1] - d[2] * 0.3) + ' ' + (d[0] - d[2] * 0.4) + ' ' + (d[1] - d[2]) + ' ' + d[0] + ' ' + (d[1] - d[2] * 1.9) + ' Z" fill="url(#vk-magma)" stroke="#9c2a14" stroke-width=".8"/>';
  });
  plate += '<path d="M478 488 C476 476 470 468 466 460 M492 474 C494 468 492 462 488 458" stroke="#ff8a2a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    txt(520, 548, 'olvadási zóna', 'lbl', ' font-size="10.5" style="fill:#fff3d6"');

  /* ---------- 1. Magmakamra ---------- */
  var chamber = '<path d="M346 430 C344 410 392 398 450 398 C512 398 560 410 556 432 C552 452 508 462 452 462 C396 462 348 452 346 430 Z" fill="url(#vk-magma)" stroke="#8e2412" stroke-width="1.6"/>';
  [[380, 432], [402, 446], [420, 424], [474, 448], [500, 428], [526, 440], [440, 452], [462, 418], [392, 418], [536, 426]].forEach(function (c, k) {
    chamber += '<path d="M' + c[0] + ' ' + (c[1] - 3) + ' L' + (c[0] + 3) + ' ' + c[1] + ' L' + c[0] + ' ' + (c[1] + 3) + ' L' + (c[0] - 3) + ' ' + c[1] + ' Z" fill="' + (k % 2 ? '#3d3a36' : '#f4f0e4') + '" opacity=".8"' + NS + '/>';
  });
  [[430, 410], [458, 436], [508, 414], [372, 444]].forEach(function (c) { chamber += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="2.4" fill="none" stroke="#fff6d8" stroke-width="1"' + NS + '/>'; });

  /* ---------- 5. A kúp rétegei (láva és vulkáni hamu váltakozva) ---------- */
  var layers = '';
  [1, 0.88, 0.76, 0.64, 0.52, 0.40, 0.28].forEach(function (f, k) {
    var sx = function (x) { return (CX + (x - CX) * f).toFixed(1); }, sy = function (y) { return (G - (G - y) * f).toFixed(1); };
    var d = 'M' + sx(190) + ' ' + G + ' C' + sx(290) + ' ' + sy(318) + ' ' + sx(380) + ' ' + sy(240) + ' ' + sx(418) + ' ' + sy(128) + ' L' + sx(482) + ' ' + sy(128) + ' C' + sx(520) + ' ' + sy(240) + ' ' + sx(610) + ' ' + sy(318) + ' ' + sx(710) + ' ' + G + ' Z';
    layers += '<path d="' + d + '" fill="' + (k % 2 ? 'url(#vk-lavalayer)' : 'url(#vk-ash)') + '" stroke="' + (k % 2 ? '#3b3736' : '#7a6452') + '" stroke-width="' + (k ? 0.9 : 1.6) + '"/>';
  });
  layers += '<path d="' + CONE + '" fill="none" stroke="#4a3a2c" stroke-width="1.8"' + NS + '/>';

  /* ---------- 2. Kürtő ---------- */
  var conduit = '<path d="M442 402 C445 330 440 250 444 140 L456 140 C460 250 455 330 458 402 Z" fill="url(#vk-conduit)" stroke="#8e2412" stroke-width="1.4"/>' +
    '<path d="M450 392 C451 330 448 250 450 150" stroke="#ffe8a0" stroke-width="2" fill="none" stroke-dasharray="5 7"' + NS + '/>';
  [[449, 360], [452, 300], [448, 240], [451, 190]].forEach(function (c) { conduit += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="2.6" fill="#fff2c2" opacity=".85"' + NS + '/>'; });

  /* ---------- 3. Mellékkürtő és oldalkúp ---------- */
  var pc = bez(LF, 0.5);           // az oldalkúp helye a bal lejtőn (kb. 327, 266)
  var side = '<path d="M444 318 C410 306 376 290 ' + (pc[0] + 6) + ' ' + (pc[1] + 2) + ' L' + (pc[0] - 2) + ' ' + (pc[1] - 8) + ' C372 280 408 296 445 306 Z" fill="url(#vk-conduit)" stroke="#8e2412" stroke-width="1.2"/>' +
    '<path d="M' + (pc[0] - 30) + ' ' + (pc[1] + 18) + ' L' + (pc[0] - 8) + ' ' + (pc[1] - 14) + ' L' + (pc[0] + 6) + ' ' + (pc[1] - 14) + ' L' + (pc[0] + 26) + ' ' + (pc[1] + 4) + ' Z" fill="#6b5a4c" stroke="#3b2f26" stroke-width="1.3"/>' +
    '<path d="M' + (pc[0] - 8) + ' ' + (pc[1] - 14) + ' Q' + (pc[0] - 1) + ' ' + (pc[1] - 8) + ' ' + (pc[0] + 6) + ' ' + (pc[1] - 14) + '" fill="#ff8a2a" stroke="#8e2412" stroke-width="1"/>' +
    '<path d="M' + (pc[0] - 1) + ' ' + (pc[1] - 14) + ' L' + (pc[0] - 8) + ' ' + (pc[1] - 32) + ' M' + (pc[0] - 1) + ' ' + (pc[1] - 14) + ' L' + (pc[0] + 3) + ' ' + (pc[1] - 36) + ' M' + (pc[0] - 1) + ' ' + (pc[1] - 14) + ' L' + (pc[0] + 10) + ' ' + (pc[1] - 28) + '" stroke="#ff9a2e" stroke-width="2.4" stroke-linecap="round"/>' +
    '<circle cx="' + (pc[0] - 9) + '" cy="' + (pc[1] - 35) + '" r="2.4" fill="#ffb347"/><circle cx="' + (pc[0] + 4) + '" cy="' + (pc[1] - 40) + '" r="2.2" fill="#ffd25e"/><circle cx="' + (pc[0] + 12) + '" cy="' + (pc[1] - 31) + '" r="2" fill="#ff8a2a"/>';

  /* ---------- 6. Lávafolyás (az oldalkúpból le a lejtőn, majd szét a síkságon) ---------- */
  var lavaPts = [[pc[0] - 10, pc[1] - 6]];
  [0.42, 0.34, 0.26, 0.18, 0.1, 0.03].forEach(function (t) { var p = bez(LF, t); lavaPts.push([p[0], p[1] - 4]); });
  var lavaPath = 'M' + lavaPts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L');
  var lava = '<path d="' + lavaPath + ' L176 ' + (G - 3) + '" stroke="#5a2a1a" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="' + lavaPath + ' L176 ' + (G - 3) + '" stroke="url(#vk-lava)" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="' + lavaPath + '" stroke="#ffe38a" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-dasharray="7 9"' + NS + '/>' +
    '<path d="M168 ' + (G - 2) + ' C170 ' + (G - 12) + ' 196 ' + (G - 13) + ' 212 ' + (G - 10) + ' L236 ' + (G - 7) + ' L236 ' + G + ' L170 ' + G + ' Z" fill="url(#vk-lava)" stroke="#5a2a1a" stroke-width="1.6"/>' +
    '<path d="M178 ' + (G - 6) + ' l8 -2 m6 3 l9 -2 m6 2 l8 -1" stroke="#3b2018" stroke-width="1.6" stroke-linecap="round"' + NS + '/>';

  /* ---------- 4. Kráter (a csúcson, lávatóval) ---------- */
  var crater = '<path d="M404 152 L416 126 L426 124 L436 138 C442 146 458 146 464 138 L474 124 L484 126 L496 152 C478 146 470 150 450 150 C430 150 422 146 404 152 Z" fill="#5e4e42" stroke="#33281f" stroke-width="1.4"/>' +
    '<ellipse cx="450" cy="141" rx="13" ry="4" fill="#ffb347" stroke="#c8361b" stroke-width="1"/>' +
    '<path d="M418 128 L424 132 M480 128 L474 132" stroke="#8a7a6c" stroke-width="1.2"' + NS + '/>';

  /* ---------- 7. Hamufelhő (kitörési oszlop + ernyő) és vulkáni bombák ---------- */
  var ash = '';
  var puffs = [[450, 118, 14], [447, 100, 17], [455, 82, 19], [450, 64, 21], [458, 48, 22],
    [418, 40, 18], [498, 40, 22], [540, 46, 21], [582, 52, 19], [622, 58, 17], [660, 64, 14], [692, 70, 10], [440, 24, 17], [486, 20, 19], [530, 24, 18], [574, 30, 16], [614, 38, 13]];
  puffs.forEach(function (p, k) {
    ash += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="' + (k % 3 ? '#8a8a8e' : '#9c9ca0') + '" stroke="#5f5f64" stroke-width="1"/>';
  });
  puffs.forEach(function (p) { ash += '<circle cx="' + (p[0] - p[2] * 0.3) + '" cy="' + (p[1] - p[2] * 0.3) + '" r="' + (p[2] * 0.55) + '" fill="#b3b3b7" opacity=".55"' + NS + '/>'; });
  ash += '<path d="M470 52 L462 70 L472 70 L460 92" stroke="#ffe14d" stroke-width="2.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>';
  [[404, 98, -1], [384, 120, -1], [508, 96, 1], [530, 120, 1]].forEach(function (b) {
    ash += '<path d="M' + (450 + b[2] * 6) + ' 120 Q' + (b[0] - b[2] * 10) + ' ' + (b[1] - 30) + ' ' + b[0] + ' ' + b[1] + '" stroke="#7a7a80" stroke-width="1.2" stroke-dasharray="3 3" fill="none"' + NS + '/>' +
      '<ellipse cx="' + b[0] + '" cy="' + b[1] + '" rx="4.5" ry="3.4" fill="#3a302a" stroke="#c8361b" stroke-width="1"/>';
  });

  /* ---------- 8. Piroklasztikus ár (forró hamu- és gázlavina a jobb lejtőn) ---------- */
  var pyro = '';
  [0.16, 0.28, 0.4, 0.52, 0.64, 0.76, 0.88].forEach(function (t, k) {
    var p = bez(RF, t), r = 9 + k * 3.2, nx = 0.55, ny = -0.6;
    pyro += '<circle cx="' + (p[0] + nx * r * 0.6).toFixed(1) + '" cy="' + (p[1] + ny * r * 0.6).toFixed(1) + '" r="' + r.toFixed(1) + '" fill="' + (k % 2 ? '#8f7f73' : '#9e8f83') + '" stroke="#5b4d43" stroke-width="1"/>';
    pyro += '<circle cx="' + (p[0] + nx * r * 0.6 + r * 0.35).toFixed(1) + '" cy="' + (p[1] + ny * r * 0.6 - r * 0.5).toFixed(1) + '" r="' + (r * 0.6).toFixed(1) + '" fill="#a99b90" stroke="#5b4d43" stroke-width=".8"/>';
  });
  var pf = bez(RF, 0.98);
  pyro += '<path d="M' + bez(RF, 0.14).map(function (v) { return v.toFixed(1); }).join(' ') + ' C540 250 620 320 ' + (pf[0] + 10).toFixed(1) + ' ' + (G - 1) + '" stroke="#ff7a1e" stroke-width="3" fill="none" opacity=".75" stroke-linecap="round"/>' +
    arrow(596, 266, 628, 292, '#fff', 2.2) + arrow(660, 300, 694, 318, '#fff', 2.2);

  /* ---------- 9. Gejzír és fumarola ---------- */
  var gx = 800;
  var geo = '<path d="M' + (gx - 4) + ' ' + G + ' C' + (gx - 6) + ' 380 ' + (gx - 14) + ' 400 ' + (gx - 30) + ' 410" stroke="#4f86c6" stroke-width="5" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="' + (gx - 40) + '" cy="416" rx="26" ry="11" fill="#6aa6de" stroke="#2f5f94" stroke-width="1.2"/>' +
    '<path d="M' + (gx - 62) + ' 432 C' + (gx - 50) + ' 444 ' + (gx - 30) + ' 444 ' + (gx - 18) + ' 432" stroke="#ff8a2a" stroke-width="2" fill="none" stroke-dasharray="3 3"/>' +
    '<path d="M' + (gx - 22) + ' ' + G + ' Q' + gx + ' ' + (G - 12) + ' ' + (gx + 22) + ' ' + G + ' Z" fill="#e9e4d8" stroke="#9a907c" stroke-width="1"/>' +
    '<path d="M' + (gx - 5) + ' ' + (G - 6) + ' C' + (gx - 8) + ' 290 ' + (gx - 4) + ' 260 ' + (gx - 2) + ' 236 L' + (gx + 2) + ' 236 C' + (gx + 4) + ' 260 ' + (gx + 8) + ' 290 ' + (gx + 5) + ' ' + (G - 6) + ' Z" fill="#cfe8fb" stroke="#6aa6de" stroke-width="1"/>';
  [[gx - 12, 236, 12], [gx + 10, 228, 13], [gx, 216, 15], [gx - 18, 222, 9], [gx + 20, 242, 8]].forEach(function (p) { geo += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="#f4f8fb" stroke="#b9c9d6" stroke-width="1"/>'; });
  [[gx - 22, 260], [gx + 22, 266], [gx - 16, 286], [gx + 16, 292]].forEach(function (p) { geo += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.8" fill="#6aa6de"/>'; });
  var fx = 862;
  geo += '<path d="M' + (fx - 12) + ' ' + G + ' L' + (fx - 4) + ' ' + (G - 6) + ' L' + (fx + 4) + ' ' + (G - 6) + ' L' + (fx + 12) + ' ' + G + ' Z" fill="#e8d24a" stroke="#9c8a1e" stroke-width="1"/>' +
    '<circle cx="' + fx + '" cy="' + (G - 18) + '" r="7" fill="#f2f2f2" stroke="#c9c9c9"/><circle cx="' + (fx - 4) + '" cy="' + (G - 32) + '" r="9" fill="#f6f6f6" stroke="#cfcfcf"/><circle cx="' + (fx + 3) + '" cy="' + (G - 50) + '" r="11" fill="#fafafa" stroke="#d6d6d6"/>' +
    '<path d="M' + fx + ' ' + (G + 2) + ' L' + (fx - 6) + ' 372" stroke="#c9b57a" stroke-width="2.4" fill="none"/>';

  /* ---------- 10. Telér és teleptelér ---------- */
  var dike = '<path d="M520 410 L546 330 L560 262 L566 262 L553 330 L527 412 Z" fill="#e0561f" stroke="#8e2412" stroke-width="1.1"/>' +
    '<path d="M392 404 L372 352 L376 350 L398 402 Z" fill="#e0561f" stroke="#8e2412" stroke-width="1"/>' +
    '<path d="M374 352 C350 349 320 352 290 350 L290 356 C320 358 350 356 375 358 Z" fill="#e0561f" stroke="#8e2412" stroke-width="1"/>';

  STUDIE.addModel({
    id: 'vulkan',
    title: 'Vulkán',
    icon: '🌋',
    color: '#d8401c',
    category: 'Természettudomány',
    keywords: 'vulkán tűzhányó rétegvulkán sztratovulkán pajzsvulkán magma láva magmakamra kürtő mellékkürtő oldalkúp kráter kaldera lávafolyás hamufelhő tefra vulkáni bomba piroklasztikus ár gejzír fumarola telér teleptelér kőzetlemez lemeztektonika szubdukció alábukás Tűzgyűrű viszkozitás szilícium-dioxid bazalt andezit riolit VEI kitörési index Vezúv Pompeji Krakatau Tambora Pinatubo Mount St. Helens Eyjafjallajökull Csomád Szent Anna-tó Badacsony tanúhegy',
    summary: 'A Föld belsejéből feltörő olvadt kőzet kapuja: a magma gázai hajtják, a kőzetlemezek mozgása táplálja, és egyetlen kitörése az egész Föld időjárását is megváltoztathatja.',
    scale: 'rétegvulkán: 1–4 km magas, 10–30 km átmérőjű kúp; a magmakamra kb. 2–10 km, az olvadási zóna kb. 100 km mélyen',
    viewBox: '0 0 900 640',
    backdrop: backdrop,
    intro: 'A vulkán ott van, ahol a Föld belsejéből **olvadt kőzet** (magma) jut a felszínre. A legtöbb vulkán a **kőzetlemezek határán** keletkezik: a rajzon balról egy **óceáni lemez** bukik a kontinens alá. A mélybe jutó lemezből víz szabadul fel, ettől a fölötte lévő forró köpeny részben **megolvad**, a könnyebb magma felemelkedik, és a kéregben egy **magmakamrában** gyűlik össze.\n\nHa a magmában oldott **gázok** nyomása elég nagy lesz, a magma a **kürtőn** át feltör: lávaként folyik, vagy **hamuvá** robbanva tör ki. A rajzon egy **rétegvulkán** látható, amelynek kúpját sok kitörés **láva- és hamurétegei** építették fel. A **Szétszedés** gombbal szétnyithatod.',
    parts: [
      {
        id: 'magmakamra', z: 3, name: 'Magmakamra', svg: chamber, explode: [0, 36], badge: [520, 444], en: 'magma chamber (magma reservoir)',
        terms: ['kemia-bsc/fazisdiagram', 'kemia-bsc/kristalyracs'],
        what: 'A vulkán alatt, a kéregben, néhány kilométer mélyen lévő **magmatároló**. Itt gyűlik össze a mélyből feláramló magma, és itt „érik” a kitörés előtt: lassan hűl, kristályok válnak ki belőle, és gázai feldúsulnak. Ha új magma érkezik alulról, a kamra **felfúvódik**, a felszín kissé megemelkedik: ezt a vulkánkutatók GPS-szel és műholdas radarral mérik.',
        madeOf: '**Magmából**: ez szilikátolvadék (főleg szilícium-, alumínium-, vas-, magnézium- és kalcium-oxidokból), benne lebegő **kristályokkal** (pl. földpát, piroxén, olivin) és oldott **gázokkal** (vízgőz, szén-dioxid, kén-dioxid). Hőmérséklete kb. **700–1200 °C**. A valódi kamra nem egy nagy „lávató”, hanem inkább kristályos kása, amelynek csak egy része olvadt.',
        how: 'A köpenyből felszálló magma addig emelkedik, amíg könnyebb a környező kőzetnél. A kéregben, ahol a sűrűsége már hasonló a környezetéhez, **megreked** és felhalmozódik. Hűlés közben először a sok vasat és magnéziumot tartalmazó kristályok válnak ki és süllyednek le, így a maradék olvadék egyre **több szilícium-dioxidot** tartalmaz, sűrűbben folyó és robbanékonyabb lesz (**differenciáció**).',
        uni: 'A kamra modern képe a **kristálykása** (crystal mush): túlnyomórészt szilárd kristályváz, a pórusaiban kevés (gyakran < 50%) olvadékkal; kitörésképes, olvadékban gazdag lencsék csak időszakosan alakulnak ki. A **frakcionált kristályosodás** (Bowen-féle reakciósor) bazaltos szülőmagmából andezites–dácitos–riolitos maradékolvadékot hoz létre. A kamra túlnyomása `Δp` a friss magma-utánpótlással és a gázok kiválásával (második forráspont: a kristályosodás miatt a maradék olvadék gázzal túltelítődik) nő; ha meghaladja a mellékkőzet szakítószilárdságát (néhány–tíz MPa), telér indul, és megkezdődhet a kitörés. A deformációt a **Mogi-modell** írja le: egy mélyen lévő pontszerű nyomásforrás fölött a felszín emelkedése `u_z ∝ ΔV·d / (d² + r²)^(3/2)`.',
        fact: 'A Yellowstone alatti hatalmas magmatároló kutatók szerint nagyrészt **szilárd** kristálykása: csak kb. 5–15%-a olvadt, ezért egy „szuperkitörés” a közeljövőben nem valószínű.'
      },
      {
        id: 'kurto', z: 4, name: 'Kürtő', svg: conduit, explode: [0, -8], badge: [470, 360], en: 'volcanic conduit (main vent)',
        terms: ['fizika-bsc/idealis-gaz'],
        what: 'A magmakamrát a **kráterrel** összekötő fő csatorna, amelyen át a magma a felszínre jut. Átmérője néhány métertől néhány tíz méterig terjed. Ahogy a magma felfelé halad, csökken a nyomás, és az oldott gázok **buborékokká** válnak ki, mint a szódásüveg kinyitásakor: ez hajtja felfelé a magmát.',
        madeOf: 'Kitöréskor olvadt **magmával**, gázbuborékokkal és kőzetdarabokkal telik meg. Kitörések között a kürtőben a magma **megszilárdul**, és „dugót” képez, ami alatt újra nőhet a nyomás.',
        how: 'A kürtő az első kitöréskor egy repedésből (telérből) tágul ki, amelyet a feltörő magma a hőjével és nyomásával kiszélesít. Ha a vulkán kialszik, és a puhább kúp lepusztul, a kürtőben megszilárdult kemény magma **vulkáni nyakként** (kürtőkitöltésként) magasodhat ki a tájból.',
        uni: 'A kürtőben a magma emelkedésekor a nyomás csökken, a vízoldékonyság közelítőleg `c_H₂O ∝ √p` szerint esik, ezért a gáz kiválik és a buborékok tágulnak (`pV = nRT`, közelítőleg). Amikor a gáz térfogataránya kb. **70–80%**-ot ér el, vagy a nyúlási sebesség túl nagy a viszkózus olvadékhoz képest, a hab **fragmentálódik**: az olvadék hamuszemcsékre szakad, és a gáz–részecske keverék szuperszonikus közeli sebességgel (100–400 m/s) lép ki. Alacsony viszkozitású bazaltnál a gáz szétválik és elszökik: ilyenkor lávaszökőkút vagy lávafolyás lesz robbanás helyett.',
        fact: 'A Balaton-felvidéki **Hegyestű** kőfejtőjében egy egykori vulkán kürtőjének belsejét láthatod: a megszilárdult bazalt hatszögletű **oszlopokká** repedezett össze hűlés közben.'
      },
      {
        id: 'mellekkurto', z: 4, name: 'Mellékkürtő és oldalkúp', svg: side, explode: [-26, -12], badge: [300, 236], en: 'parasitic (flank) vent and cone',
        what: 'A fő kürtőből elágazó **oldalsó csatorna**, amely a vulkán lejtőjén ér a felszínre. A kitörés helyén egy kisebb **oldalkúp** (parazita kúp) épül fel a fő kúp oldalán. Az oldalkitörések gyakran csendesebbek, inkább lávát öntenek ki, de mivel közelebb lehetnek a falvakhoz, veszélyesek is lehetnek.',
        madeOf: 'A csatornában magma, a kis kúp a kidobott **salakból**, lávarögökből (a lehulló, félig megszilárdult lávacafatokból) áll.',
        how: 'Ha a fő kürtő eltömődik, vagy a kúp megrepedezik, a magma **telérként** oldalra tör utat magának. Ahol egy ilyen repedés eléri a lejtőt, ott nyílik az oldalkitörés. A kidobott salak a nyílás körül halmozódik fel, kis kúpot építve.',
        uni: 'Az oldalkitöréseket a kúpban kialakuló **feszültségtér** irányítja: a telérek a legkisebb főfeszültségre merőlegesen nyílnak, ezért egy nagy vulkán terhe és a lejtők instabilitása kedvezményezett irányokat (riftzónákat) jelöl ki. Az Etnán és a hawaii vulkánokon a mellékkitörések a fő kitörési forma; a kúp oldalának megcsúszása hirtelen nyomáscsökkenést okozhat a kürtőben (mint 1980-ban a Mount St. Helensen).',
        fact: 'Az **Etna** oldalán több mint **300** kisebb mellékkráter és oldalkúp található: a vulkán sok kitörése nem a csúcsán, hanem az oldalán történik.'
      },
      {
        id: 'krater', z: 6, name: 'Kráter', svg: crater, explode: [0, -26], badge: [450, 160], en: 'summit crater',
        what: 'A vulkán csúcsán lévő **tölcsér alakú mélyedés**, ahol a kürtő a felszínre nyílik. Kitöréskor innen lövell ki a láva, a hamu és a gáz. Néha az alján **lávató** fortyog, kialudt vulkánoknál pedig víz gyűlhet össze benne (**krátertó**). A nagyon nagy, néhány km-es, beszakadással keletkezett mélyedés neve **kaldera**.',
        madeOf: 'A kráter falát megszilárdult láva, salak és hamu alkotja; a peremét a kitörések mindig újraépítik vagy lerombolják.',
        how: 'A kitörések a kürtő tetején lévő kőzetet szétrobbantják és kidobják, így kialakul a tölcsér. Egy nagy kitörés után, ha a magmakamra kiürül, a vulkán teteje **beszakadhat** a kamrába: így születik a kaldera.',
        uni: 'A kráter morfológiája a kitörés energiájától és a kürtő mélységétől függ; a **maar**-típusú kráterek a feltörő magma és a talajvíz robbanásszerű (freatomagmás) találkozásakor jönnek létre, a felszín alá vágódva. **Kaldera** akkor keletkezik, ha a kamra térfogatának nagy része gyorsan kiürül (VEI 6–8 kitörések), és a tető gyűrűs törések mentén lesüllyed; példa: Crater Lake (Mazama, kb. 7700 éve), Santorini, a Campi Flegrei. A krátertavak vize gyakran savas (kén- és sósav a vulkáni gázokból).',
        fact: 'A székelyföldi **Szent Anna-tó** a Kárpát-medence legfiatalabb vulkánja, a **Csomád** egyik kráterében van. A Csomád utoljára kb. 30 000 éve tört ki, és a kutatók szerint alatta ma is van még részben olvadt magma.'
      },
      {
        id: 'retegek', z: 2, name: 'A kúp rétegei (láva és hamu)', svg: layers, explode: [0, 0], badge: [380, 300], en: 'stratovolcano cone: alternating lava flows and tephra layers',
        terms: ['mechanika/surlodas'],
        what: 'A rétegvulkán (sztratovulkán) kúpját a sok-sok kitörés anyaga építi fel: **lávarétegek** (sötétszürke) és **hamu-, salakrétegek** (barnás, pöttyös) váltakoznak, mint egy torta rétegei. Ezért nevezik **rétegvulkánnak**. Tipikus szép, meredek, szabályos kúpjuk van, mint a japán Fudzsinak vagy az olasz Vezúvnak.',
        madeOf: 'A lávarétegek **andezitből** vagy dácitból (közepes–magas szilícium-dioxid-tartalmú kőzetből), a hamurétegek apró üvegszilánkokból, kristálytörmelékből és horzsakőből (**tufa**) állnak. A kúp lejtője a csúcs közelében 30–35° is lehet.',
        how: 'Minden kitörés egy újabb réteget tesz rá a kúpra: a robbanásos szakaszok hamut és salakot szórnak szét, a csendesebb szakaszok lávát folyatnak le a lejtőn. Egy nagy rétegvulkán **tízezrektől százezer évekig** épül. Ha a vulkán kialszik, az erózió lebontja a puhább hamurétegeket, a keményebb lávák és kürtőkitöltések maradnak meg.',
        uni: 'A vulkántípust a magma összetétele és viszkozitása szabja meg: a híg **bazalt** lapos **pajzsvulkánokat** épít (Mauna Loa, lejtő kb. 5–10°), a közepes **andezit** rétegvulkánokat, a nagyon viszkózus **dácit–riolit** lávadómokat és kalderákat. A törmelékes hamurétegek a laza szemcsés anyagok **rézsűszögénél** (kb. 30–35°, a belső súrlódás szögénél) meredekebbek nem lehetnek, ezért alakul ki a jellegzetes lejtő. A kúp a laza rétegek miatt instabil: hegyomlások, oldalcsuszamlások és **lahar**ok (vulkáni iszapárak) gyakoriak.',
        fact: 'A Föld legnagyobb térfogatú aktív vulkánja nem rétegvulkán, hanem a hawaii **Mauna Loa** pajzsvulkán: a tengerfenékről mérve kb. 9 km magas, de olyan lapos, hogy a lejtője alig látszik meredeknek.'
      },
      {
        id: 'lava', z: 5, name: 'Lávafolyás', svg: lava, explode: [-40, 14], badge: [232, 304], en: 'lava flow',
        terms: ['kemia-bsc/aktivalasi-energia'],
        what: 'A felszínre kiömlő, olvadt kőzet a **láva**. A lejtőn lefolyik, mint egy nagyon sűrű, izzó folyó, aztán szétterül a síkságon. A híg **bazaltláva** gyors és messzire folyhat, a sűrű, sok szilícium-dioxidot tartalmazó láva inkább lassan nyomul, vagy a kürtő fölött dómmá púposodik.',
        madeOf: 'Olvadt **szilikátkőzetből**, 700–1200 °C-on (a bazaltláva a legforróbb, kb. 1100–1200 °C). Felszínén gyorsan sötét, megszilárdult **kéreg** képződik, alatta az izzó belső rész még sokáig folyik.',
        how: 'A felszínen a láva gyorsan hűl: a felülete néhány perc alatt megszilárdul, belül azonban napokig, hetekig izzó maradhat. A megszilárdulás során gyakran **bazaltoszlopok** keletkeznek: a hűlő kőzet összehúzódik, és hatszögletű oszlopokra reped. Ha a kéreg alatt tovább folyik az olvadék, **lávacsövek** (barlangok) jöhetnek létre.',
        uni: 'A láva **nem newtoni** folyadék: kristály- és buboréktartalma miatt folyáshatárral rendelkező (Bingham-) testként viselkedik. Egyszerű becslés lejtőn folyó lemezes áramlásra a **Jeffreys-egyenlet**: `v = ρ·g·h²·sin α / (3η)`. A viszkozitás hőmérsékletfüggése Arrhenius-típusú: `η = η₀·exp(E_a / RT)`, ezért néhányszor tíz fokos hűlés is nagyságrendekkel növelheti. A bazalt viszkozitása kb. 10–1000 Pa·s, egy riolitos lávaé 10⁸ Pa·s fölötti is lehet. Felszíni formák: **pāhoehoe** (sima, kötélszerű) és **ʻaʻā** (darabos, éles) láva.',
        fact: 'A Badacsony, a Szent György-hegy és a Balaton-felvidék többi **tanúhegyének** bazaltoszlopai néhány millió éve kiömlött és lassan kihűlt lávából keletkeztek; a környező puhább kőzetet azóta lehordta az erózió.'
      },
      {
        id: 'hamufelho', z: 7, name: 'Hamufelhő és vulkáni bombák', svg: ash, explode: [0, -30], badge: [612, 92], en: 'eruption column and ash cloud (tephra, volcanic bombs)',
        terms: ['fizika-bsc/idealis-gaz'],
        what: 'Robbanásos kitöréskor a gáz a magmát apró darabokra tépi, és egy forró **kitörési oszlop** száll fel, akár 20–40 km magasra. Fent a felhő ernyőként szétterül, és a szél több száz, ezer kilométerre is elviheti a **vulkáni hamut**. A nagyobb, izzó lávadarabok **vulkáni bombákként** röppályán zuhannak vissza a vulkán közelében. A felhőben a súrlódó részecskék miatt gyakran **villámlik**.',
        madeOf: 'A kidobott anyag (**tefra**) mérete szerint: **hamu** (2 mm alatt, valójában apró **üvegszilánkok** és kristálytörmelék), **lapilli** (2–64 mm) és **bombák** (64 mm fölött). Mellette rengeteg **vízgőz**, szén-dioxid és **kén-dioxid**; ez utóbbi a sztratoszférában kénsavcseppekké alakulva hűti a Földet.',
        how: 'A kürtőből kilépő gáz–hamu keverék először a lendületétől emelkedik, majd mivel forró, a felhajtóerő viszi tovább (mint a meleg levegő egy hőlégballonban), közben levegőt szív be és felmelegíti. Ott terül szét ernyőként, ahol a sűrűsége megegyezik a környező levegőével.',
        uni: 'A kitörési oszlop magassága a tömegáramtól függ: empirikusan `H ≈ 2,0·V̇^0,241` (H km-ben, V̇ m³/s magmaegyenértékben, Mastin és mtsai 2009), összhangban a **turbulens felhajtóerős csóva** elméletével (`H ∝ Q^(1/4)`). A **vulkáni robbanási index (VEI)** logaritmikus skála 0-tól 8-ig: VEI 2-től kezdve minden fokozat **tízszer** több kidobott tefrát jelent (VEI 2: ≥ 0,001 km³, VEI 5: ≥ 1 km³, VEI 8: ≥ 1000 km³). A hamu a sugárhajtóművekben veszélyes: az égőtérben (kb. 1100 °C fölött) megolvad, és üvegként rakódik le a turbinalapátokon.',
        fact: '1982-ben egy British Airways Boeing 747 Jáva fölött a Galunggung vulkán hamufelhőjébe repült, és **mind a négy hajtóműve leállt**. A gép siklott, amíg a tisztább levegőben a hajtóműveket újra be tudták indítani, és épségben leszállt.'
      },
      {
        id: 'piroklaszt', z: 6, name: 'Piroklasztikus ár', svg: pyro, explode: [36, -6], badge: [604, 230], en: 'pyroclastic density current (pyroclastic flow)',
        what: 'A vulkánok legveszélyesebb jelensége: **forró gáz, hamu és kőzettörmelék** lavinája, amely a talajhoz simulva száguld le a lejtőn. Akkor keletkezik, ha a kitörési oszlop összeomlik, vagy egy lávadóm szétesik. Sebessége gyakran **100 km/h fölötti** (akár több száz km/h), hőmérséklete több száz °C: elől nem lehet elfutni.',
        madeOf: 'Izzó **hamuból**, horzsakőből, kőzettömbökből és forró vulkáni gázokból álló sűrű keverék; nehezebb a levegőnél, ezért folyik le a lejtőn, mint egy lavina vagy egy sűrű, forró köd.',
        how: 'A nehéz, forró felhő a gravitáció hatására gyorsul a lejtőn, a völgyekbe terelődik, és akár dombokon, sőt tengeren át is továbbhaladhat. Ahol megáll, vastag **ignimbrit** (hamuár-tufa) réteget rak le, amely forró állapotban össze is sülhet.',
        uni: 'A piroklasztikus ár **sűrűségáram** (gravity current): a hajtóerő a keverék és a levegő sűrűségkülönbsége. Az alsó, sűrű rész szemcsés folyásként, a felső, híg rész turbulens szuszpenzióként viselkedik; a részecskék közti gáz **fluidizálja** a keveréket, csökkentve a súrlódást, ezért tud kis lejtőn is messzire jutni. Hőmérséklete tipikusan 200–700 °C. A frontsebesség becslése `v ≈ Fr·√(g′·h)` (g′ = g·Δρ/ρ a redukált nehézségi gyorsulás, Fr ≈ 1 a Froude-szám).',
        fact: '1902-ben a martinique-i **Mont Pelée** piroklasztikus ára néhány perc alatt elpusztította Saint-Pierre városát, kb. 28 000 ember halt meg. Az egyik kevés túlélő egy fogoly volt, akit a vastag falú börtöncellája mentett meg.'
      },
      {
        id: 'gejzir', z: 5, name: 'Gejzír és fumarola', svg: geo, explode: [12, -10], badge: [838, 278], en: 'geyser and fumarole (hydrothermal activity)',
        terms: ['kemia-bsc/fazisdiagram'],
        what: 'A vulkáni területeken a felszín alatti hő a talajvizet is felforrósítja. A **gejzír** olyan forrás, amely időnként **forró víz- és gőzoszlopot** lövell a magasba. A **fumarola** a földből szivárgó **forró gőz és vulkáni gázok** kis nyílása; a nyílás körül gyakran sárga **kénkiválás** látszik. Ezek a vulkáni működés csendes jelei, akár kitörések között is.',
        madeOf: 'Gejzírnél: **forró víz és vízgőz**, a kiömlő víz oldott ásványi anyagaiból fehér **gejzirit** (kovasav) kéreg rakódik le. Fumarolánál: vízgőz, szén-dioxid, kén-dioxid, kén-hidrogén (záptojásszag), a kiváló kén sárga kristályai.',
        how: 'A gejzír csatornájában a víz alulról melegszik. Mivel a fölötte lévő vízoszlop nyomást gyakorol rá, a mélyben 100 °C fölé is melegedhet anélkül, hogy felforrna (**túlhevítés**). Ha a tetején kevés víz kibuggyan, a nyomás csökken, és a túlhevített víz **egyszerre gőzzé válik**: a kitörés kilöki a vízoszlopot. Utána a csatorna újratelik, és a ciklus újraindul.',
        uni: 'A víz forráspontja a nyomással nő (Clausius–Clapeyron-egyenlet: `dp/dT = L / (T·Δv)`), 10 m vízoszlop alatt kb. 120 °C. A gejzír kitörése a fázisdiagram forrásgörbéjének átlépése nyomáscsökkenés miatt (**flash boiling**). A hidrotermális rendszerek **geotermikus energiát** szolgáltatnak: Izland áramtermelésének kb. negyede, épületfűtésének kb. 90%-a ebből származik. A fumarolagázok összetétele (pl. SO₂/CO₂ arány) változása a kitörések előrejelzésének egyik eszköze.',
        fact: 'A **gejzír** szó az izlandi **Geysir** nevű forrásból ered (jelentése: „feltörő”). A szomszédos Strokkur gejzír ma is néhány percenként kitör, 15–20 m magasra.'
      },
      {
        id: 'teler', z: 3, name: 'Telér és teleptelér', svg: dike, explode: [0, 18], badge: [326, 370], en: 'dike (dyke) and sill',
        what: 'A magma nemcsak a kürtőben mozog: a kőzetek repedéseibe **lapszerűen** nyomul be. Ha a magmalap a rétegeket **átvágja** (gyakran közel függőlegesen), **telérnek** nevezzük; ha a rétegek közé **vízszintesen** nyomul be, **teleptelérnek**. Ezekben a magma megszilárdul, és kemény kőzetfalak maradnak utána.',
        madeOf: 'Megszilárdult magmás kőzetből (gyakran bazaltból vagy doleritből), amely keményebb a környező üledékes rétegeknél vagy hamunál.',
        how: 'A magma nyomása szétfeszíti a kőzetet, és a repedés csúcsa előrehalad, a magma pedig utánanyomul: a telér naponta akár kilométereket is haladhat. Egy kitörés előtt gyakran telérek szállítják a magmát a felszín közelébe; ilyenkor sok kis **földrengés** kíséri a mozgásukat, ami figyelmeztető jel.',
        uni: 'A telérek a **törésmechanika** szerint terjednek: a nyílás a legkisebb főfeszültségre (σ₃) merőlegesen történik, és akkor halad, ha a csúcsnál a feszültségintenzitási tényező eléri a kőzet törési szívósságát (K_I ≥ K_IC). A telérek felhajtóereje a magma és a mellékkőzet sűrűségkülönbségéből adódik; a **semleges felhajtóerő szintjén** inkább oldalirányba terjednek, vagy teleptelérré fordulnak. A magmamozgás az InSAR-felvételeken jellegzetes deformációs mintázatot és a földrengések vándorlását mutatja.',
        fact: '2023 novemberében Izlandon, a Grindavík város alatt néhány óra alatt egy kb. **15 km hosszú** magmatelér nyomult be: a város utcáin méteres repedések nyíltak, a lakókat ki kellett telepíteni.'
      },
      {
        id: 'lemezhatar', z: 1, name: 'Kőzetlemez-határ (alábukás)', svg: plate, explode: [0, 50], badge: [262, 452], link: 'fold', lesson: 'foldrajz/fold-szerkezete', en: 'convergent plate boundary (subduction zone)',
        terms: ['kemia-bsc/fazisdiagram', 'fizika-bsc/radioaktiv-bomlas'],
        what: 'A Föld kérge **kőzetlemezekre** tagolódik, amelyek évente néhány centiméterrel mozognak. Ahol egy nehezebb **óceáni lemez** egy másik lemezzel ütközik, alábukik (**szubdukció**), és a köpenybe süllyed; a felszínen **mélytengeri árok** jelzi a helyét. Kb. 100 km mélyen a lemezből **víz** szabadul fel, amely a fölötte lévő forró köpenyt részben **megolvasztja**: ez a magma táplálja a vulkánok láncát. A Csendes-óceán körüli **Tűzgyűrű** vulkánjai így születnek.',
        madeOf: 'Az óceáni lemez felül **bazaltos óceáni kéregből**, alatta a köpeny merev felső részéből áll; víztartalmú ásványokat (pl. szerpentint) és vizes üledéket is visz magával a mélybe. A köpeny főként **peridotit** nevű kőzet, amely szilárd, de lassan „folyik”.',
        how: 'Az óceáni lemez a hátságokon születik, és ahogy távolodik, kihűl, nehezebb lesz, végül alábukik. Lefelé haladva nő a nyomás és a hőmérséklet, a víztartalmú ásványok **elbomlanak**, a felszabaduló víz felszáll a köpenybe. A víz **csökkenti a kőzet olvadáspontját** (mint a só a jég olvadáspontját), ezért a köpeny egy része megolvad, és a könnyebb magma cseppekben, csatornákban felfelé szivárog. Vulkánok a **hátságokon** (pl. Izland) és a forró pontok fölött (pl. Hawaii) is keletkeznek.',
        uni: 'Az alábukási zónák magmatizmusa **fluxusolvadás** (flux melting): a lemezből 80–120 km mélyen kiszabaduló H₂O több száz °C-kal csökkenti a köpenyperidotit szolidusz-hőmérsékletét; a vulkáni front ezért nagyjából ott jelenik meg, ahol a lemez teteje kb. 100 km mélyen van. A hátságokon ezzel szemben **nyomáscsökkenéses (dekompressziós) olvadás** zajlik: a felszálló köpenyanyag adiabatikusan alig hűl, közben a szolidusza csökkenő nyomással esik, így átlépi azt. A kőzetek korát (és a lemezmozgás ütemét) radiometrikus kormeghatározással (pl. K–Ar, Ar–Ar) mérik.',
        fact: 'A kőzetlemezek évente kb. **2–10 cm**-t mozdulnak el: nagyjából olyan gyorsan, ahogy a körmöd nő. Nézz bele a Föld szerkezetébe is a „Nézz bele” gombbal!'
      }
    ],
    uni: {
      text: 'Egyetemi szemmel a vulkán egy **termodinamikai és reológiai** rendszer, amelynek viselkedését a magma kémiai összetétele, gáztartalma és a lemeztektonikai környezet együtt határozza meg.\n\n**Viszkozitás és szilícium-dioxid.** A szilikátolvadékban az SiO₄-tetraéderek közös oxigénatomokon át **polimerizálódnak**; minél több a SiO₂ (bazalt kb. 45–52%, andezit 52–63%, dácit 63–68%, riolit > 68%), annál összefüggőbb a hálózat, annál nagyobb a viszkozitás. Nagyságrendek: bazalt kb. 10–10³ Pa·s, andezit 10³–10⁶ Pa·s, riolit 10⁶–10¹¹ Pa·s. A hőmérsékletfüggés Arrhenius-típusú: `η = η₀·exp(E_a / RT)`, és a bazalt melegebb is (1100–1250 °C), mint a riolit (700–850 °C). Az oldott víz depolimerizál és csökkenti a viszkozitást, a kristályok és buborékok növelik.\n\n**Gázok és robbanékonyság.** A magma víztartalma (0,5–6 tömeg%) a nyomás csökkenésével kiválik. Kis viszkozitásnál a buborékok szétválnak és elszöknek (**effuzív**, lávát öntő kitörés, pl. Hawaii, Izland); nagy viszkozitásnál a gáz bennreked, a hab fragmentálódik (**explozív**, pliniusi kitörés). A robbanás erejét a **VEI** skála jellemzi: VEI 2-től minden lépés tízszeres tefratérfogat (VEI 4 ≥ 0,1 km³, VEI 6 ≥ 10 km³, VEI 8 ≥ 1000 km³). A nagy kén-dioxid-kibocsátás a sztratoszférában szulfát-aeroszolt képez, amely 1–3 évre **hűti** a Földet (Pinatubo 1991: kb. 0,5 °C).\n\n**Lemeztektonika.** A Föld vulkánjainak nagy része lemezhatárokon van: **alábukási zónák** (fluxusolvadás, andezites–dácitos magmák, robbanásos rétegvulkánok), **hátságok** (dekompressziós olvadás, bazalt, többnyire a tenger alatt), valamint lemezen belüli **forró pontok** (köpenycsóvák, pl. Hawaii, Yellowstone).\n\n**Előrejelzés.** Szeizmikus monitorozás (földrengésrajok, vulkáni tremor), felszíndeformáció (GPS, InSAR, dőlésmérők), gázmérések (SO₂, CO₂) és hőkamera együtt adják a riasztási szinteket; a pontos időpont előrejelzése ma sem lehetséges, de a veszélyeztetett területek kiürítése sok ezer életet mentett meg (pl. Pinatubo 1991).',
      terms: ['kemia-bsc/aktivalasi-energia', 'kemia-bsc/fazisdiagram', 'kemia-bsc/kristalyracs', 'kemia-bsc/idealis-gaz-kem', 'fizika-bsc/idealis-gaz', 'fizika-bsc/radioaktiv-bomlas', 'fizika-bsc/hullamegyenlet']
    },
    steps: [
      { icon: '↘️', title: 'A lemezek ütköznek, az óceáni lemez alábukik', when: 'évmilliók óta, évi néhány cm', text: 'Az óceáni lemez nehezebb a kontinentálisnál, ezért az ütközéskor **alábukik**, és ferdén lesüllyed a köpenybe. A felszínen ott, ahol lebukik, mélytengeri **árok** húzódik.', parts: ['lemezhatar'] },
      { icon: '💧', title: 'Víz szabadul fel, a köpeny megolvad', when: 'kb. 100 km mélyen', text: 'A mélyben a lemez víztartalmú ásványai a nagy nyomáson és hőmérsékleten elbomlanak, és **víz** szabadul fel. A víz a fölötte lévő forró köpenybe jut, és **csökkenti az olvadáspontját**: a kőzet néhány százaléka megolvad, apró **magmacseppek** keletkeznek.', parts: ['lemezhatar'] },
      { icon: '⬆️', title: 'A magma felszáll, és a magmakamrában gyűlik', text: 'A magma könnyebb a szilárd kőzetnél, ezért **felfelé szivárog**, majd repedéseken, **teléreken** át halad tovább. A kéregben, néhány km mélyen megreked, és **magmakamrában** gyűlik össze. Itt hűl, kristályosodik, és egyre több szilícium-dioxid és gáz dúsul fel benne.', parts: ['magmakamra', 'teler', 'lemezhatar'] },
      { icon: '🫧', title: 'Nő a nyomás: a gázok buborékokká válnak', text: 'Ahogy új magma érkezik, és a gázok kiválnak, a kamrában **nő a nyomás**, a vulkán kissé felpúposodik, és sok kis **földrengés** jelzi a mozgást. Amikor a nyomás meghaladja a fölötte lévő kőzet szilárdságát, a magma utat tör a **kürtőn** át.', parts: ['magmakamra', 'kurto'] },
      { icon: '🌋', title: 'Kitörés: hamufelhő és vulkáni bombák', text: 'A felszálló magmában a gázbuborékok hirtelen kitágulnak, és a magmát apró darabokra **tépik**: a **kráterből** forró hamuoszlop tör a magasba, izzó **bombák** repülnek szét, a felhőben villámlik.', parts: ['kurto', 'krater', 'hamufelho'] },
      { icon: '🔥', title: 'Piroklasztikus ár és lávafolyás', text: 'Ha a kitörési oszlop összeroskad, **piroklasztikus ár** zúdul le a lejtőn. Az oldalsó **mellékkürtőn** át kiömlő, gázát már elvesztett magma **lávaként** folyik le, és szétterül a síkságon.', parts: ['piroklaszt', 'mellekkurto', 'lava'] },
      { icon: '🎂', title: 'Rétegről rétegre épül a kúp', when: 'tízezrek–százezrek év', text: 'Minden kitörés egy újabb **hamu-** vagy **lávaréteget** rak a kúpra. Sok ezer év alatt így épül fel a magas, meredek **rétegvulkán**.', parts: ['retegek', 'lava', 'hamufelho'] },
      { icon: '♨️', title: 'Szunnyadás és kialvás', text: 'A kitörések között a vulkán **szunnyad**, de a mélyben még forró: **gejzírek** és **fumarolák** jelzik. Ha a magmautánpótlás végleg megszűnik, a vulkán kialszik, az erózió lebontja a kúpot, és csak a kemény kürtőkitöltések, telérek, lávatakarók maradnak meg – mint a Balaton-felvidék **tanúhegyei**.', parts: ['gejzir', 'kurto', 'teler'] }
    ],
    history: [
      { year: 'Kr. u. 79', text: 'A **Vezúv** kitörése betemeti **Pompejit** és Herculaneumot. Ifjabb Plinius levélben írja le a kitörést, amelyben nagybátyja, idősebb Plinius is meghalt: róla nevezik **pliniusinak** az ilyen hatalmas, hamuoszlopos kitöréseket.' },
      { year: 'kb. 30 000 éve', text: 'Utoljára tör ki a Kárpát-medence legfiatalabb vulkánja, a székelyföldi **Csomád**; egyik kráterében ma a **Szent Anna-tó** van.' },
      { year: '1783', text: 'Izlandon a **Laki** hasadékvulkán 8 hónapon át ont lávát és kén-dioxidot. A mérgező gázok és az éhínség miatt Izland lakosságának kb. ötöde meghalt, Európa-szerte kénes köd és rossz termés volt.' },
      { year: '1815', text: 'Indonéziában kitör a **Tambora** (VEI 7), az emberi történelem egyik legnagyobb kitörése. A sztratoszférába jutott kén-aeroszol miatt **1816** Európában és Észak-Amerikában az **„év nyár nélkül”** lett: fagyok, éhínség.' },
      { year: '1883', text: 'A **Krakatau** kitörése és az általa keltett szökőárak kb. 36 000 ember halálát okozzák. A robbanás hangját kb. 4800 km-re is hallották, a nyomáshullám többször megkerülte a Földet.' },
      { year: '1902', text: 'A martinique-i **Mont Pelée** piroklasztikus ára néhány perc alatt elpusztítja Saint-Pierre városát. Ez a katasztrófa indította el a modern vulkanológiát és a vulkánmegfigyelő állomások építését.' },
      { year: '1980', text: 'Május 18-án az amerikai **Mount St. Helens** északi oldala hatalmas földcsuszamlásban leomlik, és oldalirányú robbanás következik. A hegy kb. 400 m-t veszített a magasságából; a kitörés a vulkáni deformáció mérésének mintapéldája lett.' },
      { year: '1991', text: 'A Fülöp-szigeteki **Pinatubo** kitörése (VEI 6) előtt a vulkanológusok időben riasztottak, több tízezer embert telepítettek ki. A kén-aeroszol a következő évben kb. **0,5 °C-kal** hűtötte a Föld átlaghőmérsékletét.' },
      { year: '2010', text: 'Az izlandi **Eyjafjallajökull** hamufelhője miatt napokra lezárják Európa légterének nagy részét: kb. 100 000 járat marad el, a II. világháború óta a legnagyobb légiforgalmi fennakadás.' },
      { year: '2022', text: 'A tenger alatti **Hunga Tonga–Hunga Haʻapai** vulkán kitörése a műholdas mérések szerint kb. 57 km magas, a mezoszféráig érő felhőt emel, a légköri nyomáshullám többször megkerüli a Földet. A kitörés hatalmas mennyiségű vízgőzt juttatott a sztratoszférába.' }
    ],
    quiz: [
      { q: 'Mitől függ leginkább, hogy egy vulkán csendesen lávát önt, vagy hevesen robban?', options: ['A magma szilícium-dioxid-tartalmától (viszkozitásától) és gáztartalmától', 'A vulkán földrajzi szélességétől', 'Az évszaktól', 'A kráter méretétől'], answer: 0, explain: 'A sok SiO₂-t tartalmazó, sűrűn folyó magmából a gáz nem tud elszökni, ezért robbanásosan szabadul ki; a híg bazaltból könnyen elszökik.' },
      { q: 'Mi a piroklasztikus ár?', options: ['Forró gáz, hamu és kőzettörmelék lejtőn lezúduló lavinája', 'Lassan folyó lávapatak', 'Egy vulkáni tó vize', 'A kitörés után lehulló eső'], answer: 0, explain: 'Akár több száz km/h-val és több száz °C-kal száguld: a vulkánok legveszélyesebb jelensége.' },
      { q: 'Hol keletkezik a Föld vulkánjainak nagy része?', options: ['A kőzetlemezek határain (pl. a Csendes-óceáni Tűzgyűrű mentén)', 'A kontinensek közepén, véletlenszerűen', 'Csak a sarkvidékeken', 'A sivatagokban'], answer: 0, explain: 'Alábukási zónák és óceáni hátságok mentén; kivétel a forró pontok fölötti vulkánok (pl. Hawaii).' },
      { q: 'A VEI (vulkáni robbanási index) skálán eggyel nagyobb érték kb. hányszor több kidobott anyagot jelent?', options: ['Tízszer többet', 'Kétszer többet', 'Ugyanannyit', 'Százszor kevesebbet'], answer: 0, explain: 'A skála logaritmikus: VEI 2-től minden fokozat tízszeres tefratérfogat.' },
      { q: 'Miért „rétegvulkán” a rétegvulkán neve?', options: ['Mert kúpját váltakozó láva- és hamurétegek építik fel', 'Mert több kürtője van', 'Mert rétegesen jégtakaró borítja', 'Mert mindig tengerben van'], answer: 0, explain: 'Sok kitörés váltakozó láva- és tefrarétegei építik fel a meredek kúpot (pl. Fudzsi, Vezúv).' }
    ]
  });
})();
