/* Modell: vízszintes tengelyű szélturbina – oldalnézet, a gondola metszetben (nagyítva, nem méretarányos).
 * A szél balról fúj, a rotor a torony előtt (szél felőli oldalon) forog.
 * A lapátokat enyhén elforgatott rotorsíkkal rajzoljuk, hogy mindhárom látsszon. */
(function () {
  var NS = ' pointer-events="none"';
  var HX = 170, HY = 230;              // a rotoragy középpontja
  function f(n) { return (+n).toFixed(1); }
  function txt(x, y, s, cls, extra) {
    // a .lbl/.lbl-muted osztály CSS-ből adja a betűméretet, ezért a méretet stílusként kell megadni
    extra = (extra || '').replace(/font-size="([\d.]+)"/, 'style="font-size:$1px"');
    return '<text class="' + cls + '" x="' + x + '" y="' + y + '"' + extra + NS + '>' + s + '</text>';
  }
  function rect(x, y, w, h, fill, stroke, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '" stroke="' + stroke + '"' + (extra || ' stroke-width="1.4"') + '/>';
  }
  function arrow(x1, y1, x2, y2, col, w) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7;
    return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' M' + f(x2 - h * Math.cos(a - 0.5)) + ' ' + f(y2 - h * Math.sin(a - 0.5)) +
      ' L' + x2 + ' ' + y2 + ' L' + f(x2 - h * Math.cos(a + 0.5)) + ' ' + f(y2 - h * Math.sin(a + 0.5)) +
      '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + NS + '/>';
  }

  var defs = '<defs>' +
    '<linearGradient id="sz-t-blade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e3e8ee"/><stop offset="1" stop-color="#b9c3cf"/></linearGradient>' +
    '<linearGradient id="sz-t-tower" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#aab4c0"/><stop offset=".45" stop-color="#f1f4f7"/><stop offset="1" stop-color="#b3bdc8"/></linearGradient>' +
    '<linearGradient id="sz-t-steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d0d8"/><stop offset=".5" stop-color="#8e99a6"/><stop offset="1" stop-color="#5b6672"/></linearGradient>' +
    '<linearGradient id="sz-t-gen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb0ec"/><stop offset=".5" stop-color="#3d78c9"/><stop offset="1" stop-color="#244f8f"/></linearGradient>' +
    '<linearGradient id="sz-t-gear" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9c27f"/><stop offset=".55" stop-color="#6f8f4a"/><stop offset="1" stop-color="#4b6630"/></linearGradient>' +
    '<linearGradient id="sz-t-spin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#dde3ea"/><stop offset="1" stop-color="#a9b4c1"/></linearGradient>' +
    '<linearGradient id="sz-t-conc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7c2b8"/><stop offset="1" stop-color="#948e83"/></linearGradient>' +
    '<linearGradient id="sz-t-shell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6dde6" stop-opacity=".55"/><stop offset="1" stop-color="#aeb9c6" stop-opacity=".35"/></linearGradient>' +
    '</defs>';

  /* Háttér: cím, szélnyilak, talaj, agymagasság-jelölés, hálózat */
  var backdrop = defs +
    txt(626, 24, 'Vízszintes tengelyű szélturbina', 'lbl', ' text-anchor="end" font-size="16"') +
    txt(626, 42, 'oldalnézet · a gondola metszetben, nagyítva', 'lbl-muted', ' text-anchor="end"') +
    '<rect x="0" y="540" width="640" height="80" fill="rgba(150,118,78,.20)"' + NS + '/>' +
    '<path d="M0 540 L640 540" stroke="#5f9a4a" stroke-width="3"' + NS + '/>' +
    txt(14, 610, 'talaj', 'lbl-muted', ' font-size="11"');
  [150, 230, 310, 390].forEach(function (y, i) {
    backdrop += arrow(14, y, 72 + (i % 2) * 8, y, '#5aa9d6', 2.2) +
      '<path d="M18 ' + (y - 9) + ' Q34 ' + (y - 14) + ' 50 ' + (y - 9) + '" fill="none" stroke="#5aa9d6" stroke-width="1.2" opacity=".55"' + NS + '/>';
  });
  backdrop += txt(16, 128, 'szél  v', 'lbl', ' font-size="13" fill="#3d8fc0"') +
    // agymagasság
    '<path d="M620 230 L620 540 M614 230 L626 230 M614 540 L626 540" stroke="#8b96a6" stroke-width="1.2"' + NS + '/>' +
    txt(633, 330, 'agymagasság 100–170 m', 'lbl-muted', ' font-size="11" transform="rotate(-90 633 330)" text-anchor="middle"') +
    // hálózat felé
    '<path d="M566 540 L566 476 M554 484 L578 484 M556 494 L576 494" stroke="#7c8794" stroke-width="2"' + NS + '/>' +
    '<path d="M566 476 L640 470" stroke="#7c8794" stroke-width="1.2"' + NS + '/>' +
    txt(572, 464, 'hálózat →', 'lbl-muted', ' font-size="11"');

  /* 1. Lapátok: a rotorsík kissé elfordítva (x-irányban összenyomva) */
  function blade(theta, len, tipCol) {
    var th = theta * Math.PI / 180, dx = Math.sin(th) * 0.45, dy = -Math.cos(th);
    var L = Math.sqrt(dx * dx + dy * dy); dx /= L; dy /= L;
    var sl = len * L, nx = -dy, ny = dx;
    var left = [], right = [];
    for (var i = 0; i <= 24; i++) {
      var t = 0.13 + 0.87 * i / 24;
      var w = t < 0.28 ? 7 + 12 * (t - 0.13) / 0.15 : 19 - 16 * (t - 0.28) / 0.72;
      var cx = HX + dx * sl * t, cy = HY + dy * sl * t;
      left.push([cx + nx * w * 0.62, cy + ny * w * 0.62]);
      right.push([cx - nx * w * 0.38, cy - ny * w * 0.38]);
    }
    var pts = left.concat(right.reverse());
    var d = 'M' + pts.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join(' L') + ' Z';
    var tipA = [HX + dx * sl * 0.9, HY + dy * sl * 0.9], tipB = [HX + dx * sl * 0.97, HY + dy * sl * 0.97];
    return '<path d="' + d + '" fill="url(#sz-t-blade)" stroke="#6f7b89" stroke-width="1.4" stroke-linejoin="round"/>' +
      // főtartó (spar) vonala
      '<path d="M' + f(HX + dx * sl * 0.18) + ' ' + f(HY + dy * sl * 0.18) + ' L' + f(HX + dx * sl * 0.93) + ' ' + f(HY + dy * sl * 0.93) + '" stroke="#9aa6b4" stroke-width="1.2" stroke-dasharray="6 4"' + NS + '/>' +
      '<path d="M' + f(tipA[0]) + ' ' + f(tipA[1]) + ' L' + f(tipB[0]) + ' ' + f(tipB[1]) + '" stroke="' + tipCol + '" stroke-width="5" stroke-linecap="butt" opacity=".85"' + NS + '/>' +
      // villámlevezető a lapát belsejében és a receptor a lapátvégen
      '<path d="M' + f(HX + dx * sl * 0.2) + ' ' + f(HY + dy * sl * 0.2) + ' L' + f(HX + dx * sl * 0.98) + ' ' + f(HY + dy * sl * 0.98) + '" stroke="#c9a10f" stroke-width="1.3" stroke-dasharray="2 3"' + NS + '/>' +
      '<circle cx="' + f(HX + dx * sl * 0.985) + '" cy="' + f(HY + dy * sl * 0.985) + '" r="3.2" fill="#f6c625" stroke="#7a5a00" stroke-width="1.1"/>';
  }
  var blades = blade(240, 150, '#e0533f') + blade(0, 168, '#e0533f') + blade(120, 150, '#e0533f');

  /* 2. Rotoragy, kúpos burkolattal (spinner) és a lapátszög-állító hajtásokkal */
  var hub = '<path d="M206 190 C176 190 130 204 122 230 C130 256 176 270 206 270 Z" fill="url(#sz-t-spin)" stroke="#6f7b89" stroke-width="1.6"/>' +
    // kivágás: öntött agy belül
    '<path d="M150 214 L198 206 L198 254 L150 246 Z" fill="#5b6672" stroke="#38414c" stroke-width="1.2"/>' +
    // lapátcsapágy-gyűrűk
    '<ellipse cx="172" cy="210" rx="16" ry="4" fill="#c9a14a" stroke="#7a5d1c" stroke-width="1.2"/>' +
    '<ellipse cx="172" cy="250" rx="16" ry="4" fill="#c9a14a" stroke="#7a5d1c" stroke-width="1.2"/>' +
    // pitch-motorok (narancs)
    rect(176, 214, 12, 14, '#f08a24', '#8a4a0c', ' stroke-width="1" rx="2"') +
    rect(176, 232, 12, 14, '#f08a24', '#8a4a0c', ' stroke-width="1" rx="2"') +
    rect(156, 225, 10, 10, '#f6c625', '#7a5a00', ' stroke-width="1" rx="2"') +
    txt(161, 233, '⚡', 'lbl-muted', ' font-size="8" text-anchor="middle"');

  /* 3. Főtengely és főcsapágy */
  var shaft = '<rect x="198" y="219" width="98" height="22" rx="3" fill="url(#sz-t-steel)" stroke="#47515c" stroke-width="1.3"/>' +
    '<rect x="203" y="208" width="8" height="44" rx="2" fill="#8e99a6" stroke="#47515c" stroke-width="1.2"/>' +
    // főcsapágyház állvánnyal
    '<path d="M228 204 L262 204 L266 214 L266 246 L262 256 L228 256 L224 246 L224 214 Z" fill="#5f7da0" stroke="#33465c" stroke-width="1.4"/>' +
    '<path d="M222 256 L268 256 L272 276 L218 276 Z" fill="#4f6886" stroke="#33465c" stroke-width="1.2"/>' +
    '<circle cx="245" cy="230" r="15" fill="none" stroke="#c9d6e4" stroke-width="1.5" stroke-dasharray="3 2.5"' + NS + '/>';

  /* 4. Hajtómű (multiplikátor): bolygókerekes + két homlokkerekes fokozat, metszetben */
  var gear = '<path d="M296 196 Q296 186 306 186 L362 186 Q372 186 372 196 L372 266 Q372 276 362 276 L306 276 Q296 276 296 266 Z" fill="url(#sz-t-gear)" stroke="#3a4f24" stroke-width="1.5"/>' +
    rect(302, 194, 64, 76, 'rgba(30,40,20,.30)', '#3a4f24', ' stroke-width="1" rx="4"');
  // 1. fokozat: bolygókerekes (belső fogazású koszorú, bolygók, napkerék)
  gear += rect(304, 198, 20, 70, '#d7c48a', '#7a6526', ' stroke-width="1.1" rx="2"') +
    rect(308, 204, 12, 58, '#4b6630', '#7a6526', ' stroke-width=".8"') +
    rect(309, 206, 10, 16, '#e8d8a6', '#7a6526', ' stroke-width="1" rx="2"') + rect(309, 248, 10, 12, '#e8d8a6', '#7a6526', ' stroke-width="1" rx="2"') +
    rect(309, 225, 10, 18, '#f0e4bc', '#7a6526', ' stroke-width="1" rx="2"');
  // 2–3. fokozat: homlokkerekek (nagy kerék + kis fogaskerék)
  [[330, 202, 10, 60], [342, 222, 7, 22], [352, 212, 9, 44], [362, 230, 5, 16]].forEach(function (g) {
    gear += rect(g[0], g[1], g[2], g[3], '#d7c48a', '#7a6526', ' stroke-width="1" rx="1.5"');
    for (var yy = g[1] + 4; yy < g[1] + g[3]; yy += 5) gear += '<path d="M' + g[0] + ' ' + yy + ' l' + g[2] + ' -2" stroke="#7a6526" stroke-width=".7"' + NS + '/>';
  });
  gear += '<path d="M296 230 L304 230 M324 233 L330 233 M340 233 L342 233 M349 233 L352 233 M361 238 L372 238" stroke="#3a4f24" stroke-width="3"' + NS + '/>';
  gear += '<text x="334" y="183" font-size="9" font-weight="700" text-anchor="middle" fill="#4b6630"' + NS + '>1 : ~100</text>';

  /* 5. Tárcsafék a gyors tengelyen */
  var brake = rect(372, 236, 42, 10, '#9aa5b2', '#47515c', ' stroke-width="1.1" rx="2"') +
    rect(386, 210, 7, 62, '#cfd6de', '#5b6672', ' stroke-width="1.2" rx="2"') +
    '<path d="M381 206 L398 206 L398 224 L393 224 L393 214 L386 214 L386 224 L381 224 Z" fill="#e5484d" stroke="#86161d" stroke-width="1.2"/>';

  /* 6. Generátor */
  var gen = '<rect x="414" y="196" width="86" height="88" rx="10" fill="url(#sz-t-gen)" stroke="#1d3c6b" stroke-width="1.6"/>';
  for (var gx = 424; gx < 496; gx += 8) gen += '<path d="M' + gx + ' 200 L' + gx + ' 280" stroke="#1d3c6b" stroke-width="1" opacity=".45"' + NS + '/>';
  gen += '<ellipse cx="500" cy="240" rx="8" ry="44" fill="#2f5fa6" stroke="#1d3c6b" stroke-width="1.4"/>' +
    rect(440, 184, 30, 12, '#3d4652', '#1f252d', ' stroke-width="1" rx="2"') +
    // tekercsek jelzése
    '<path d="M428 222 q6 -8 12 0 q6 8 12 0 q6 -8 12 0 q6 8 12 0 q6 -8 12 0 M428 258 q6 -8 12 0 q6 8 12 0 q6 -8 12 0 q6 8 12 0 q6 -8 12 0" fill="none" stroke="#f0b35a" stroke-width="2"' + NS + '/>';

  /* 7. Gondola: burkolat (metszetben), alapkeret, hűtő és az irányállító (yaw) rendszer */
  var nac = '<path d="M206 180 Q210 168 228 168 L516 168 Q542 168 546 192 L550 262 Q550 292 522 292 L206 292 Z" fill="url(#sz-t-shell)" stroke="#6b7a8f" stroke-width="2.6" stroke-linejoin="round"/>' +
    // alapkeret (öntött gépalap)
    '<path d="M210 276 L500 276 L500 292 L210 292 Z" fill="#59636f" stroke="#353c46" stroke-width="1.2"/>' +
    // hűtő a hátsó falon
    rect(520, 196, 18, 62, 'rgba(200,210,222,.6)', '#6b7a8f', ' stroke-width="1" rx="2"');
  for (var vy = 202; vy < 256; vy += 6) nac += '<path d="M522 ' + vy + ' L536 ' + vy + '" stroke="#6b7a8f" stroke-width="1"' + NS + '/>';
  nac += // yaw-csapágy gyűrű és a hajtások
    '<rect x="296" y="292" width="68" height="9" rx="2" fill="#3d4652" stroke="#1f252d" stroke-width="1.2"/>';
  for (var tx = 299; tx < 362; tx += 5) nac += '<path d="M' + tx + ' 293 l0 7" stroke="#8b96a6" stroke-width="1"' + NS + '/>';
  [[282, 258], [370, 258]].forEach(function (m) {
    nac += rect(m[0] - 7, m[1], 14, 18, '#f08a24', '#8a4a0c', ' stroke-width="1" rx="2"') +
      rect(m[0] - 4, m[1] + 18, 8, 20, '#8a96a6', '#47515c', ' stroke-width="1"');
  });

  /* 8. Szélmérő (kanalas anemométer) és szélirányjelző */
  var wind = '<path d="M486 168 L486 126 M516 168 L516 132" stroke="#3d4652" stroke-width="3"/>' +
    '<path d="M472 126 L500 126" stroke="#3d4652" stroke-width="2"/>' +
    '<path d="M466 122 a6 6 0 0 0 12 0 Z M494 122 a6 6 0 0 0 12 0 Z" fill="#3d4652" stroke="#1f252d" stroke-width="1"/>' +
    '<circle cx="486" cy="122" r="3" fill="#3d4652"/>' +
    '<path d="M500 132 L516 132 L532 124 L532 140 Z" fill="#e5484d" stroke="#86161d" stroke-width="1.2" stroke-linejoin="round"/>' +
    '<path d="M500 132 l6 -4 l0 8 Z" fill="#3d4652"/>';

  /* 9. Villámvédelem: lapátvég-receptorok, levezetők, felfogórúd, földelés */
  var Y = '#f6c625', YD = '#7a5a00';
  function cond(d, dash) {
    return '<path d="' + d + '" fill="none" stroke="' + YD + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
      '<path d="' + d + '" fill="none" stroke="' + Y + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  var lightning =     cond('M538 168 L538 106') + '<path d="M534 108 L538 96 L542 108 Z" fill="' + Y + '" stroke="' + YD + '" stroke-width="1"/>' +
    cond('M542 170 L542 286 L366 300 L372 540 L372 586') +
    cond('M250 592 L410 592 M262 592 L262 610 M398 592 L398 610');

  /* 10. Torony: kúpos acélcső, karimás szakaszokkal, belül kábellel és létrával */
  var tower = '<path d="M305 301 L355 301 L368 540 L292 540 Z" fill="url(#sz-t-tower)" stroke="#7c8794" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M301 380 L359 380 M297 460 L363 460" stroke="#7c8794" stroke-width="2"' + NS + '/>' +
    '<path d="M322 304 L319 468 M338 304 L341 468" stroke="#9aa5b2" stroke-width="1" stroke-dasharray="2 3"' + NS + '/>' +
    '<path d="M330 304 L330 470" stroke="#3d4652" stroke-width="2" opacity=".6"' + NS + '/>' +
    // a torony aljának kivágása (ide kerül az átalakítószekrény)
    '<rect x="302" y="472" width="56" height="66" rx="3" fill="#2b323c" stroke="#7c8794" stroke-width="1"/>';

  /* 11. Alapozás: vasbeton gravitációs alap, horgonykosárral */
  var found = '<path d="M296 540 L364 540 L364 550 L436 570 L436 590 L224 590 L224 570 L296 550 Z" fill="url(#sz-t-conc)" stroke="#6a655c" stroke-width="1.6" stroke-linejoin="round"/>';
  for (var bx = 302; bx <= 358; bx += 8) found += '<path d="M' + bx + ' 534 L' + bx + ' 584" stroke="#4d4a45" stroke-width="1.4"/>';
  found += '<path d="M232 584 L428 584 M240 576 L420 576" stroke="#c0622b" stroke-width="1.3" stroke-dasharray="5 3"' + NS + '/>';

  /* 12. Átalakító (inverter) a toronyban és transzformátor-állomás */
  var conv = rect(308, 478, 44, 56, '#9fb4c8', '#3e5468', ' stroke-width="1.3" rx="2"') +
    '<path d="M330 480 L330 532" stroke="#3e5468" stroke-width="1"' + NS + '/>';
  [[316, 488], [338, 488]].forEach(function (p) {
    conv += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.2" fill="#2fa36b"' + NS + '/>' + rect(p[0] - 4, p[1] + 8, 12, 4, '#3e5468', 'none', '');
  });
  conv += '<path d="M352 528 L380 528 L380 552 L456 552 L456 532" fill="none" stroke="#2b323c" stroke-width="3" stroke-linejoin="round"/>' +
    // transzformátorállomás
    '<path d="M444 488 L528 488 L534 496 L534 540 L438 540 L438 496 Z" fill="#88a998" stroke="#3f5f4f" stroke-width="1.5" stroke-linejoin="round"/>' +
    rect(452, 500, 68, 34, '#2b323c', '#3f5f4f', ' stroke-width="1" rx="2"') +
    rect(464, 504, 8, 26, '#6b7a8f', '#2b323c', ' stroke-width=".8"') + rect(500, 504, 8, 26, '#6b7a8f', '#2b323c', ' stroke-width=".8"') +
    rect(472, 508, 28, 18, '#c8763a', '#7a4218', ' stroke-width="1" rx="3"') +
    '<path d="M476 512 L496 512 M476 517 L496 517 M476 522 L496 522" stroke="#7a4218" stroke-width="1"' + NS + '/>' +
    '<path d="M534 520 L566 520" fill="none" stroke="#2b323c" stroke-width="2"/>' +
    txt(486, 482, '690 V → 20–33 kV', 'lbl-muted', ' font-size="9.5" text-anchor="middle"');

  STUDIE.addModel({
    id: 'szelturbina',
    title: 'Szélturbina',
    icon: '🌬️',
    color: '#0e9aa7',
    category: 'Energia',
    keywords: 'szélturbina szélerőmű szélkerék szélenergia megújuló energia rotor lapát gondola nacelle hajtómű multiplikátor generátor pitch lapátszög yaw irányállítás szélmérő anemométer torony alapozás inverter transzformátor Betz-határ offshore szélpark Blyth Brush la Cour Gedser dán modell',
    summary: 'A szél mozgási energiáját a lapátok forgássá, a generátor elektromos energiává alakítja: egy mai szárazföldi turbina 4–6 MW, egy tengeri 15 MW körüli teljesítményű.',
    scale: 'tengeri turbina: rotorátmérő 220–240 m, agymagasság kb. 150 m; szárazföldi: 120–170 m rotor',
    viewBox: '0 0 640 620',
    backdrop: backdrop,
    intro: 'A szélturbina egy **„fordított ventilátor”**: nem árammal hajt meg légcsavart, hanem a szél forgatja meg a lapátokat, és a forgásból **generátor** termel áramot. A **lapátok** a szél energiájának egy részét veszik át, a **gondolában** (a torony tetején ülő „gépházban”) a **főtengely**, a **hajtómű** és a **generátor** alakítja ezt elektromos energiává, az **átalakító** és a **transzformátor** pedig a hálózatnak megfelelő feszültségre hozza.\n\nA rajzon a gondola **metszetben és felnagyítva** látszik (valójában egy busznyi méretű). A **Szétszedés** gombbal kiemelheted a gépház belsejét.',
    parts: [
      {
        id: 'lapatok', z: 2, name: 'Rotorlapátok', svg: blades, explode: [-66, -24], badge: [148, 112], en: 'rotor blades (airfoil, spar caps, shear web)',
        lesson: 'fizika/energia-munka',
        terms: ['mechanika/hajlitonyomatek', 'mechanika/rugalmassagi-modulus', 'mechanika/szabad-rezges'],
        what: 'A három, akár **100 m-nél is hosszabb** lapát a turbina „szárnya”. A keresztmetszetük olyan, mint egy repülőgép szárnyáé: a körülöttük áramló levegő **felhajtóerőt** kelt, és ez forgatja a rotort. A lapátvég jóval gyorsabban halad, mint a szél: kb. **80–90 m/s**-mal (300 km/h), miközben a rotor percenként csak 6–15-öt fordul. A lapát a tövénél széles és erősen el van csavarva, a vége felé keskeny és lapos, mert ott más szögben „látja” a szelet.',
        madeOf: '**Üvegszálas** (néha **szénszálas**) **kompozitból**: a szálakat **epoxigyanta** ragasztja össze. Belül egy hosszanti „gerinc” (főtartó-övek és nyírófal) viszi a terhelést, a héj két rétege közé **balsafa** vagy műanyaghab kerül a merevségért. A lapát elülső élét kopásálló bevonat védi az esőcseppek és a homok ellen, a végén piros sáv jelzi a repülőknek.',
        how: 'Két hatalmas **félformában** készül. Az üvegszövet-rétegeket kézzel és robotokkal fektetik be, lefedik fóliával, kiszívják alóla a levegőt, majd a vákuum beszívja a gyantát (**vákuuminfúzió**). Felmelegítve a gyanta megkeményedik. A két félhéjat összeragasztják, csiszolják, festik, és fárasztópadon is tesztelik. Szállításuk külön kihívás: speciális kamionok éjszaka, rendőri kísérettel viszik őket.',
        uni: 'A lapátelem-elmélet (BEM) szerint a lapát minden szeleténél a **relatív szélsebesség** a szél (v(1−a)) és a kerületi sebesség (ωr(1+a′)) eredője; ennek szöge adja az állásszöget, amelyből a profil `C_L(α)` és `C_D(α)` görbéi a felhajtó- és a közegellenállási erőt adják. A lapát csavarodását úgy tervezik, hogy minden szelet közel az optimális siklószámon (`C_L/C_D` maximumán) dolgozzon. A tervezési **gyorsjárási tényező** `λ = ωR/v ≈ 7–9`. A lapát gyökénél a hajlítónyomaték több tízezer kN·m; a főtartó-övek a hajlításból eredő húzó–nyomó feszültséget viselik (`σ = M·y/I`), ezért ide kerül a nagy rugalmassági modulusú szénszál. A lapát sajátfrekvenciáit el kell hangolni a rotor 1P és 3P gerjesztésétől.',
        fact: 'A világ leghosszabb lapátjai már 115–120 m-esek: egy ilyen lapát hosszabb, mint egy focipálya, és mégis kb. 50–60 tonna.'
      },
      {
        id: 'agy', z: 4, name: 'Rotoragy és lapátszög-állító (pitch)', svg: hub, explode: [-46, -18], badge: [140, 230], en: 'hub, spinner and pitch system',
        terms: ['mechanika/nyomatek', 'fizika-bsc/impulzusmomentum'],
        what: 'A rotoragy köti össze a három lapátot a főtengellyel. Kívülről egy áramvonalas **kúpos burkolat** (spinner) takarja. Benne ülnek a **lapátszög-állító (pitch) hajtások**: ezek a lapátokat a saját tengelyük körül forgatják. Gyenge szélben a lapátok „teljes szélben” állnak, erős szélben kissé **elfordulnak**, hogy a turbina ne kapjon túl sok energiát; viharban **élükkel a szél felé** fordulnak (zászlóállás), és a rotor leáll. Ez a turbina legfontosabb fékje.',
        madeOf: 'Az agy egyetlen hatalmas **gömbgrafitos öntöttvas** darab (több tíz tonna). Minden lapát egy nagy **gördülőcsapágy-gyűrűn** ül. A pitch-hajtás vagy **villanymotor + fogaskerék**, vagy **hidraulikus munkahenger**; mindegyikhez tartalék energiatároló (akkumulátor, ultrakondenzátor vagy hidraulikus tároló) tartozik, hogy áramszünetben is le tudja állítani a rotort. A burkolat üvegszálas műanyag.',
        how: 'Az agyat homokformába öntik, majd hatalmas szerszámgépeken megmunkálják a csapágyfelületeket és a furatokat. A gyárban beépítik a pitch-hajtásokat és a vezérlőszekrényeket. A helyszínen a lapátokat vagy a földön szerelik fel az agyra, és a teljes rotort egyben emelik fel, vagy egyenként emelik fel a lapátokat.',
        uni: 'A teljesítmény szabályozása két tartományban történik: **névleges szélsebesség alatt** a lapátszög állandó, és a generátor nyomatékával a rotor fordulatszámát úgy állítják, hogy a gyorsjárási tényező optimális (`c_p` maximális) maradjon (`M_gen = k·ω²`). **Névleges szél fölött** a pitch-szabályozó (PI-szabályozó, ütemezett erősítéssel) a lapátszög növelésével csökkenti az állásszöget, így a teljesítmény állandó marad. Modern gépeken **egyedi lapátszög-szabályozás** (IPC) is van: a lapátok körbefordulás közben is kicsit állítgatják a szögüket, hogy kiegyenlítsék a magassággal növekvő szél okozta fárasztó terhelést.',
        fact: 'A pitch-rendszer másodpercenként kb. 5–10 fokot tud fordítani egy több tíz tonnás lapáton.'
      },
      {
        id: 'fotengely', z: 5, name: 'Főtengely és főcsapágy', svg: shaft, explode: [-14, -86], badge: [245, 230], en: 'main shaft and main bearing (low-speed shaft)',
        terms: ['mechanika/nyomatek', 'mechanika/csavaras'],
        what: 'A rotoragyhoz csatlakozó, vastag, lassan forgó tengely. Ez viszi át a rotor óriási **forgatónyomatékát** a hajtóműre (vagy direkt hajtásnál a generátorra). A **főcsapágy** tartja a rotor súlyát, és felveszi a szél tolóerejét, hogy az ne a hajtóművet terhelje.',
        madeOf: 'Kovácsolt, nemesített **acél** tengely (átmérője akár 1 m), egy vagy két nagy **gördülőcsapágy** (görgős csapágy), öntöttvas csapágyházban, olajjal vagy zsírral kenve.',
        how: 'Acéltömbből kovácsolják, majd esztergálják, hőkezelik és csiszolják. A csapágyakat felmelegítve húzzák rá a tengelyre (hőzsugorkötés), majd a csapágyházzal együtt a gondola alapkeretére szerelik.',
        uni: 'Egy 5 MW-os, 12 1/perc fordulatú rotor nyomatéka `M = P/ω = 5·10⁶ / (2π·12/60) ≈ 4·10⁶ N·m` (4 MN·m): ezt kell a tengelynek csavarásra elviselnie (`τ_max = M·r/I_p`). A tengelyre ezen felül a rotor súlyából és a szél aszimmetriájából hajlítás, a tolóerőből axiális erő hat: a főcsapágy kiválasztásakor a dinamikus egyenértékű terhelés és a kifáradás (L10-élettartam) a döntő.',
        fact: 'Míg a lapátvég 300 km/h-val száguld, a főtengely csak kb. 10–15-öt fordul percenként: lassabban, mint egy kerékpár kereke tekeréskor.'
      },
      {
        id: 'hajtomu', z: 5, name: 'Hajtómű (multiplikátor)', svg: gear, explode: [6, -104], badge: [334, 210], en: 'gearbox (planetary + helical stages); direct drive alternative',
        terms: ['mechanika/nyomatek', 'e-mobilitas/hatasfok'],
        what: 'A rotor lassan forog (10–15 1/perc), a hagyományos generátornak viszont kb. **1000–1800 1/perc** kell. A hajtómű ezt a fordulatszámot kb. **százszorosára** növeli (ezért „multiplikátor”), a nyomatékot pedig ugyanennyiszer csökkenti. Egyes turbinák **direkt hajtásúak**: nincs bennük hajtómű, a rotor közvetlenül egy nagy átmérőjű, lassú járású generátort forgat.',
        madeOf: 'Nagy szilárdságú, edzett **acél fogaskerekek**: általában egy vagy két **bolygókerekes** fokozat és egy **homlokkerekes** fokozat, öntöttvas házban. Saját olajkeringtető, -szűrő és -hűtő rendszere van, és rezgésérzékelők figyelik.',
        how: 'A fogaskerekeket kovácsolt acélból marják, majd betétedzik és köszörülik, hogy a fogfelület mikrométer pontosságú legyen. Összeszerelés után próbapadon, teljes terhelésen járatják be. A hajtómű a turbina egyik legdrágább és leginkább meghibásodó része: ezért fejlesztették ki a direkt hajtást.',
        uni: 'Egy bolygókerekes fokozat áttétele (álló fogaskoszorúval, a bolygókerék-tartót hajtva) `i = 1 + z_k/z_n` (z_k: belső fogaskoszorú, z_n: napkerék fogszáma), tipikusan 4–7, így két bolygó- és egy homlokfokozattal i ≈ 90–120 érhető el. A teljesítmény megmarad (veszteségektől eltekintve): `P = M₁ω₁ = M₂ω₂`, a hatásfok fokozatonként kb. 98–99%. A direkt hajtás elhagyja a hajtóművet, de a kis fordulatszám miatt nagy nyomatékú, nagy átmérőjű (5–10 m), sokpólusú **szinkrongenerátor** kell, gyakran ritkaföldfém-mágnesekkel. A közbülső megoldás a közepes sebességű (medium-speed) hajtás.',
        fact: 'Egy nagy turbina hajtóműve 50–100 tonnás is lehet, és több száz liter olaj van benne.'
      },
      {
        id: 'fek', z: 6, name: 'Mechanikus tárcsafék', svg: brake, explode: [30, -86], badge: [389, 196], en: 'mechanical (parking) disc brake on the high-speed shaft',
        what: 'A hajtómű és a generátor közötti **gyors tengelyen** ülő tárcsafék. A rotort elsősorban a **lapátok elforgatása** lassítja le; ez a fék csak a már majdnem álló rotort állítja meg végleg, illetve **rögzíti** karbantartáskor és vészhelyzetben.',
        madeOf: 'Acél **féktárcsa** és hidraulikus **féknyereg** súrlódó betétekkel, mint egy autóban, csak sokkal nagyobb. A fék alapállapotban zárt (rugó nyomja), és hidraulika nyitja: így áramszünetben is fog.',
        how: 'A tárcsát acélból esztergálják és kiegyensúlyozzák, a féknyereg hidraulikus egységgel együtt a hajtómű házára szerelődik. Karbantartáskor a rotort ezen kívül mechanikus **reteszcsappal** is rögzítik, mielőtt bárki az agyba mászik.',
        uni: 'A fék a gyors tengelyen van, mert ott a nyomaték kb. százszor kisebb (`M_gyors = M_lassú / i`), így kisebb fék is elég. Vészfékezéskor az aerodinamikai fékezés (zászlóállás) és a mechanikus fék együttes hatását úgy kell hangolni, hogy a hajtóművet ne érje túl nagy nyomatéklökés: a fékező nyomaték fokozatosan nő (soft braking). A fék által elnyelt energia a rotor forgási energiája: `E = ½·Θ·ω²`.',
        fact: 'Egy turbinának két független fékrendszerrel kell rendelkeznie (szabvány szerint): a lapátszög-állítás és a mechanikus fék ezt adja.'
      },
      {
        id: 'generator', z: 5, name: 'Generátor', svg: gen, explode: [28, -100], badge: [457, 240], en: 'generator (DFIG or permanent-magnet synchronous)',
        lesson: 'fizika/elektromossag',
        terms: ['fizika-bsc/faraday-indukcio', 'villamosmernoki/szinkron-gep', 'villamosmernoki/aszinkron-motor', 'villamosmernoki/haromfazisu-rendszer'],
        what: 'A generátor alakítja a forgást **elektromos energiává**, az **elektromágneses indukció** elvén: a forgó mágneses tér feszültséget kelt a tekercsekben. Egy szárazföldi turbinánál ez 3–6 MW, egy tengerinél 15 MW is lehet. A generátor **háromfázisú váltakozó áramot** ad, általában 690 V körüli feszültséggel.',
        madeOf: 'Egy álló részből (**állórész**, sztátor) és egy forgó részből (**forgórész**, rotor). Mindkettő vékony, egymástól szigetelt **villamos acéllemezekből** (lemezelt vasmag) és **réztekercsekből** áll. Az állandó mágneses generátorok forgórészében **neodímium–vas–bór** mágnesek vannak. Levegővel vagy vízzel hűtik.',
        how: 'A vasmaglemezeket kistancolják, köteggé préselik, a hornyokba gépek és kézi munka teszik be a szigetelt réztekercseket, majd gyantával átitatják (vákuumos impregnálás). Az összeszerelt generátort próbapadon terhelik, és mérik a hatásfokát.',
        uni: 'Két fő típus: (1) **kétoldalról táplált aszinkron generátor** (DFIG): az állórész közvetlenül a hálózatra kapcsolódik, a csúszógyűrűs forgórészt egy kb. 30%-os teljesítményű átalakító táplálja, így ±30% fordulatszám-tartomány érhető el; (2) **állandó mágneses szinkrongenerátor** (PMSG) **teljes teljesítményű átalakítóval**: a generátor frekvenciája szabadon változhat, mert minden teljesítmény átmegy az inverteren. Az indukált feszültség `U_i = k·Φ·ω` (Faraday-törvény), a frekvencia szinkron gépnél `f = p·n/60`. A hatásfok 96–98%.',
        fact: 'Egy 15 MW-os direkt hajtású tengeri generátorban több tonna ritkaföldfém-mágnes is lehet.'
      },
      {
        id: 'gondola', z: 1, name: 'Gondola és irányállítás (yaw)', svg: nac, explode: [0, 0], badge: [524, 280], en: 'nacelle (cover, bedplate) and yaw system',
        terms: ['mechanika/nyomatek', 'mechanika/feszultseg'],
        what: 'A gondola (angolul nacelle) a torony tetején ülő gépház: ebben van a hajtáslánc, a hűtés, a vezérlés, és gyakran egy kis daru is a karbantartáshoz. Az **irányállító (yaw) rendszer** a gondola alján lévő nagy **fogaskoszorún** és az azt hajtó **motorokon** keresztül mindig **szembe fordítja a rotort a széllel**, a szélirányjelző adatai alapján. Ha a gép már 2–3 teljes kört fordult egy irányba, visszatekeri magát, hogy a toronyba lelógó kábelek ne csavarodjanak meg.',
        madeOf: 'A burkolat **üvegszálas műanyag** héj, belül egy öntöttvas vagy hegesztett acél **alapkeret** (gépalap) hordoz mindent. Az irányállító egy nagy **gördülőcsapágy-gyűrű** fogazással, 4–10 villanymotoros **hajtóművel**, és hidraulikus **fékekkel**, amelyek a gondolát a kívánt irányban rögzítik.',
        how: 'A gondolát a gyárban komplett egységként szerelik össze és tesztelik, kamionon vagy hajón szállítják. A helyszínen egy nagy daru (akár 150–200 m-es gémmel) emeli fel a torony tetejére, ahol a yaw-csapágyat a toronykarimához csavarozzák. Egy tengeri gondola akár 400–700 tonnás is lehet.',
        uni: 'A gondola kb. **50–70%-ban** a teljes rotor + gépház tömegét viseli a torony tetején, ami a torony sajátfrekvenciáját is meghatározza. Az irányállítás lassú (kb. 0,3–0,5 °/s), mert a gyors forgatás a forgó rotor **giroszkópos nyomatéka** miatt nagy terhelést okozna (`M_gir = Θ·ω_rotor·ω_yaw`). Az irányhiba (yaw misalignment) γ szöge esetén a teljesítmény kb. `cos²γ`–`cos³γ` szerint csökken, ezért a szélmérők pontos kalibrálása fontos.',
        fact: 'Egy nagy tengeri turbina gondolájának a tetején helikopter-leszállóhely is lehet a szerelők számára.'
      },
      {
        id: 'szelmero', z: 7, name: 'Szélmérő és szélirányjelző', svg: wind, explode: [84, -8], badge: [500, 106], en: 'cup anemometer and wind vane (or ultrasonic sensor)',
        what: 'A gondola tetején mérik a **szélsebességet** (kanalas **anemométer**) és a **szélirányt** (**szélzászló**). A vezérlés ezek alapján dönt: kb. **3 m/s** szélnél indul a turbina, kb. 11–13 m/s-nál éri el a teljes teljesítményt, és kb. **25 m/s** felett biztonsági okból leáll. A szélirány alapján fordítja a gondolát a szélbe.',
        madeOf: 'Fémből vagy műanyagból készült kanalak és zászló, csapágyazott tengelyen, alatta impulzusadó elektronika. Ma gyakran **ultrahangos szélmérőt** használnak, amelyben nincs mozgó alkatrész: a hang terjedési idejéből számolja a szelet. A mérőárbocon fűtés (jegesedés ellen) és repülésjelző fény is van.',
        how: 'A szélmérőket szélcsatornában kalibrálják. Mivel a gondolán a rotor mögött mérnek, ahol a szél kavargó és lassabb, a vezérlés átszámítja az értékeket (gondola-átviteli függvény). Új szélparkok tervezése előtt egy-két évig mérőárbocokkal vagy lézeres (LiDAR) szélméréssel vizsgálják a helyszínt.',
        uni: 'A kanalas anemométer fordulatszáma jó közelítéssel arányos a szélsebességgel; a mérés átlagolási ideje szabványosan 10 perc. A turbinák egyre gyakrabban kapnak **gondolára szerelt LiDAR-t**, amely a rotor előtt több száz méterrel méri a közeledő szelet, így a pitch-szabályozás **előrecsatolással** (feedforward) még a széllökés megérkezése előtt reagálhat, csökkentve a terheléseket.',
        fact: 'A szélmérők adataiból egy egész szélpark „látja” a közeledő széllökéseket: a hátsó gépek az első sor méréseiből előre felkészülhetnek.'
      },
      {
        id: 'villam', z: 8, name: 'Villámvédelem', svg: lightning, explode: [0, 0], badge: [370, 360], en: 'lightning protection system (receptors, down conductors, earthing)',
        terms: ['villamosmernoki/foldelesi-rendszerek'],
        what: 'A magas, gyakran dombtetőn álló turbinába **sokszor csap villám**, és a lapát végét éri a legtöbb. Ezért a lapátvégeken fém **villámfelfogók** (receptorok) vannak, ahonnan egy vastag vezető a lapát belsejében az agyig vezeti a villámáramot. Onnan csúszóérintkezőkön és szikraközökön át a gondolán, majd a tornyon keresztül a **földelésbe** jut. A gondola tetején külön **felfogórúd** védi a szélmérőket.',
        madeOf: 'Réz vagy alumínium **receptorok** és **levezetők** a lapátokban, szénkefék és csúszógyűrűk a forgó részeken, maga az **acéltorony** mint levezető, és az alapozásban réz vagy horganyzott acél **földelőgyűrű** és földelőrudak. Az elektronikát túlfeszültség-levezetők védik.',
        how: 'A levezetőt a lapát gyártásakor építik be a félformába. Az elkészült lapátokat nagyfeszültségű laborban mesterséges villámmal is tesztelik. A földelőhálót az alapozással együtt, a betonozás előtt fektetik le, és a földelési ellenállást mérik.',
        uni: 'A villámáram csúcsértéke elérheti a 200 kA-t, meredeksége a 100 kA/µs-ot; a levezetőnek az **I²t** (fajlagos energia) okozta melegedést és az elektrodinamikus erőket is el kell viselnie. A lapáton belül a levezető és a szénszálas főtartó között **potenciálkiegyenlítés** kell, különben átütés (belső ívkisülés) roncsolná a kompozitot. A szabvány (IEC 61400-24) a turbinát a legszigorúbb, I. villámvédelmi osztályba sorolja.',
        fact: 'Egy szélturbinába egy év alatt akár többször is belecsaphat a villám, és a lapátkárok jelentős része villámcsapásból ered.'
      },
      {
        id: 'torony', z: 0, name: 'Torony', svg: tower, explode: [0, 10], badge: [330, 420], en: 'tubular steel tower (flanged sections)',
        terms: ['mechanika/rezonancia', 'mechanika/biztonsagi-tenyezo', 'mechanika/masodrendu-nyomatek'],
        what: 'A torony emeli a rotort a magasba, ahol **erősebb és egyenletesebb a szél** (a talaj közelében a fák, épületek, dombok lelassítják). Belül **létra** vagy **lift** visz fel a gondolába, és itt futnak le a **kábelek**. Egy mai szárazföldi turbina tornya 100–170 m magas.',
        madeOf: 'Leggyakrabban kúpos **acélcső**, 20–30 m-es szakaszokból, amelyeket belül **karimák** és több száz nagy csavar köt össze. Alul kb. 4–4,5 m átmérőjű (a közúti szállítás miatt nem lehet szélesebb). A nagyon magas tornyok alja gyakran **előregyártott vasbeton** (hibrid torony), de vannak fa- és rácsos tornyok is.',
        how: 'Acéllemezeket hengerelnek kúppá, hosszanti és körvarratokkal hegesztik, a végükre karimát hegesztenek, majd több rétegben festik (korrózióvédelem). A helyszínen daru emeli egymásra a szakaszokat, és a karimacsavarokat előírt nyomatékkal húzzák meg.',
        uni: 'A torony méretezésének kulcsa a **dinamika**: a torony első sajátfrekvenciája nem eshet egybe a rotor fordulatszámával (**1P**) és a lapátáthaladási frekvenciával (**3P**). A legtöbb modern acéltorony „**soft-stiff**” kialakítású: sajátfrekvenciája 1P és 3P közé esik. A tolóerőből a torony tövénél hatalmas hajlítónyomaték keletkezik; a feszültség `σ = M/K` (K a keresztmetszeti tényező), így a cső átmérője és falvastagsága lefelé nő. A karimacsavarok és a varratok **kifáradása** (20–25 év alatt kb. 10⁸–10⁹ terhelési ciklus) a mértékadó.',
        fact: 'Egy 150 m-es acéltorony tömege több száz tonna; a szerelők liften akár 10 percig utaznak fel a gondoláig.'
      },
      {
        id: 'alapozas', z: 0, name: 'Alapozás', svg: found, explode: [0, 24], badge: [262, 576], en: 'gravity foundation (reinforced concrete, anchor cage)',
        terms: ['mechanika/egyensuly', 'mechanika/nyomatek'],
        what: 'A föld alatti vasbeton talp, amely a turbinát állva tartja: az óriási szélerő **feldönteni** próbálja a tornyot, az alap súlya és szélessége ezt ellensúlyozza. A tengeren a tengerfenékbe vert acélcső (**monopile**), rácsos acélszerkezet (**jacket**), vagy mélyebb vízben **úszó** alapozás tartja a turbinát.',
        madeOf: 'Kb. 20–25 m átmérőjű, 3 m körüli vastagságú **vasbeton** tömb: több száz köbméter beton és sok tonna **betonacél**. Közepén a torony aljához csavarozott **horgonykosár** (hosszú acélcsavarok gyűrűje) ül.',
        how: 'Kiássák a gödröt, betonnal kiegyenlítik az alját, majd a vasszerelők összeállítják a betonacél-hálót és beállítják a horgonykosarat. Egyetlen nap alatt, megszakítás nélkül betonozzák be (sok betonkeverő kocsi egymás után), utána hetekig szilárdul. Végül visszatöltik földdel, ami tovább növeli a súlyát.',
        uni: 'A gravitációs alap méretezése a **borulás** elleni biztonságon alapul: a talajreakció eredője nem kerülhet túlságosan ki a talp magjából (a talp nem „emelkedhet el” túl nagy felületen). A borítónyomaték `M ≈ F_toló·h_agy` (pl. 1 MN · 150 m = 150 MN·m) és a szélnyomás a toronyra; ezt az alap + földtakarás súlyának nyomatéka (`G·D/2`) ellensúlyozza. Gyenge talajon cölöpalapot alkalmaznak. A beton hidratációs hője miatt a nagy tömeg belsejének hőmérsékletét figyelik, hogy ne repedjen meg.',
        fact: 'Egy nagy szárazföldi turbina alapjába 600–1000 m³ beton kerülhet: ez nagyjából 100 betonkeverő autónyi.'
      },
      {
        id: 'atalakito', z: 3, name: 'Átalakító és transzformátor', svg: conv, explode: [40, 0], badge: [330, 506], link: 'tranzisztor', en: 'power converter (back-to-back inverter) and step-up transformer',
        terms: ['e-mobilitas/inverter', 'e-mobilitas/pwm', 'villamosmernoki/transzformator', 'villamosmernoki/meddo-teljesitmeny'],
        what: 'A generátor árama még nem „hálózatképes”: a feszültsége és a frekvenciája a széllel együtt ingadozik. Az **átalakító** (frekvenciaváltó, inverter) ezt először **egyenárammá** alakítja, majd pontosan **50 Hz-es** váltakozó árammá. A **transzformátor** a kb. 690 V-os feszültséget a szélpark belső hálózatának **20–33 kV**-jára emeli, egy alállomás pedig a nagyfeszültségű távvezeték (pl. 120 kV) szintjére.',
        madeOf: 'Az átalakító szekrényekben **IGBT** teljesítménytranzisztorok, nagy **kondenzátorok**, fojtótekercsek, szűrők és vízhűtés vannak. A transzformátor **lemezelt vasmagból** és réz- vagy alumínium **tekercsekből** áll, olajjal vagy műgyantával szigetelve, acél vagy beton állomásházban (néha a gondolában vagy a torony aljában).',
        how: 'Az átalakítót elektronikai gyárban szerelik és tesztelik, a toronyba a toronyszakaszok felhúzása előtt beemelik. A transzformátor tekercseit tekercselőgépen készítik, a vasmagot rétegről rétegre rakják össze, majd vákuumban szárítják és olajjal töltik fel. A szélparkot földkábelek kötik össze az alállomással.',
        uni: 'A **back-to-back** (két, egyenáramú köztes körrel összekötött) átalakító generátoroldali hídja a generátor nyomatékát szabályozza (mezőorientált szabályozás), a hálózatoldali híd pedig a köztes kör feszültségét tartja és **PWM**-mel szinuszos áramot ad a hálózatba. Mivel a teljesítmény-elektronika független a hálózati frekvenciától, a turbina **meddő teljesítményt** is tud szabályozni (feszültségtartás), és a hálózati előírások szerint feszültségletörést is át kell vészelnie (**fault ride-through**). A transzformátor áttétele `U₁/U₂ ≈ N₁/N₂`, például 0,69/33 kV.',
        fact: 'Egy szélpark teljesítménye az átalakítók miatt nagyon gyorsan szabályozható: akár másodpercek alatt is segíthet a hálózat frekvenciájának stabilizálásában.'
      }
    ],
    uni: {
      text: 'A szél teljesítménye egy `A` felületen át: `P_szél = ½·ρ·A·v³`. A turbina ennek a `c_p` (teljesítménytényező) hányadát veszi ki: `P = ½·ρ·A·v³·c_p`. Az **aktuátorkorong-modell** (Rankine–Froude) szerint, ha a rotor a szelet a síkjában `a` arányban lassítja (indukciós tényező), akkor az impulzus- és energiamérlegből `c_p = 4a(1−a)²`. Ennek maximuma `a = 1/3`-nál van: `c_p,max = 16/27 ≈ 0,593` – ez a **Betz-határ**. (Ha a turbina teljesen megállítaná a levegőt, az nem tudna továbbáramlani; ha nem lassítaná, nem venne ki energiát.) A modern háromlapátos rotorok `c_p ≈ 0,45–0,50`-et érnek el.\n\nA teljesítménygörbe négy tartománya: indulás (cut-in, ~3 m/s) alatt áll; utána `P ∝ v³`; a **névleges** szélsebességtől (~11–13 m/s) a pitch-szabályozás állandó teljesítményt tart; ~25 m/s felett (cut-out) leáll. A szélsebesség eloszlása egy helyszínen jól közelíthető **Weibull-eloszlással**, és mivel `P ∝ v³`, az átlagos teljesítményt a ritka, erős szelek erősen növelik. A **kihasználtsági tényező** (capacity factor) szárazföldön kb. 25–35%, tengeren 40–50%. A szél profilja a magassággal közelítőleg `v(h) = v_ref·(h/h_ref)^α` (α ≈ 0,1–0,3 a felszín érdességétől függően), ezért érdemes magasra építeni.',
      terms: ['fizika-bsc/impulzus', 'fizika-bsc/munkatetel', 'fizika-bsc/faraday-indukcio', 'villamosmernoki/szinkron-gep', 'villamosmernoki/transzformator', 'e-mobilitas/inverter', 'mechanika/rezonancia']
    },
    steps: [
      { icon: '🌬️', title: '1. A szél energiája', text: 'A mozgó levegőnek **mozgási energiája** van. Egy turbina által „lesöpört” körlapon átáramló szél teljesítménye: **P = ½·ρ·A·v³**, ahol ρ ≈ 1,2 kg/m³ a levegő sűrűsége, A a rotor által súrolt terület, v a szélsebesség. A **v³** miatt kétszer erősebb szélben **nyolcszor** annyi energia érkezik, ezért olyan fontos a jó, szeles helyszín és a magas torony. Példa: 120 m-es rotor, 10 m/s szél: a szélben kb. 7 MW teljesítmény van.', parts: ['lapatok', 'szelmero', 'torony'] },
      { icon: '📐', title: '2. A Betz-határ: miért nem 100%?', text: 'A turbina nem állíthatja meg teljesen a szelet, mert akkor a levegő nem tudna továbbhaladni a rotoron. Albert **Betz** 1919-ben kiszámolta, hogy legfeljebb a szél energiájának **59,3%-a** (16/27) nyerhető ki; ezt a hányadot jelöli a **c_p** teljesítménytényező. A legjobb mai turbinák c_p ≈ 0,45–0,5-öt érnek el, így a fenti példában kb. **3 MW** marad.', parts: ['lapatok', 'agy'] },
      { icon: '🧭', title: '3. Szélbe fordulás és lapátszög', text: 'A **szélirányjelző** jelzi, ha a szél iránya megváltozik: ekkor az **irányállító motorok** lassan a szél felé forgatják a gondolát. A **szélmérő** alapján a vezérlés kb. 3 m/s-nál elindítja a gépet. A **pitch-hajtások** úgy állítják a lapátokat, hogy gyenge szélben a lehető legtöbb energiát kapják, erős szélben pedig ne terheljék túl a gépet.', parts: ['szelmero', 'gondola', 'agy'] },
      { icon: '🔄', title: '4. Forgás: felhajtóerő a lapátokon', text: 'A lapátok körül áramló levegő a szárnyprofil miatt az egyik oldalon gyorsabban áramlik, mint a másikon: **nyomáskülönbség**, azaz **felhajtóerő** keletkezik, amely a rotort körbe húzza. A rotor lassan, percenként **6–15**-öt fordul, de óriási nyomatékkal. A **főtengely** és a **főcsapágy** adja tovább ezt a nyomatékot.', parts: ['lapatok', 'agy', 'fotengely'] },
      { icon: '⚙️', title: '5. Gyorsítás a hajtóműben', text: 'A **hajtómű** a lassú forgást kb. **százszorosára** gyorsítja, kb. 1000–1800 1/percre, hogy a generátor hatékonyan működjön. (Direkt hajtású turbinákban nincs hajtómű: ott egy óriási átmérőjű, sok pólusú generátor forog lassan.) A gyors tengelyen ül a **tárcsafék**.', parts: ['fotengely', 'hajtomu', 'fek'] },
      { icon: '⚡', title: '6. Áramtermelés és hálózatra adás', text: 'A **generátorban** a forgó mágneses tér **elektromágneses indukcióval** feszültséget kelt a tekercsekben. Az **átalakító** a változó frekvenciájú áramot pontos 50 Hz-es váltakozó árammá alakítja, a **transzformátor** pedig 690 V-ról 20–33 kV-ra emeli. A szélpark alállomásán még egyszer feltranszformálják, és a távvezeték elviszi a fogyasztókhoz.', parts: ['generator', 'atalakito'] },
      { icon: '⛈️', title: '7. Viharban és zivatarban', text: 'Kb. **25 m/s** (90 km/h) fölötti szélnél a vezérlés leállítja a turbinát: a lapátok **zászlóállásba** (élükkel a szél felé) fordulnak, a rotor lelassul, és a **mechanikus fék** rögzíti. A gondola tovább követi a szélirányt, hogy a terhelés a legkisebb legyen. Villámcsapáskor a **villámvédelmi rendszer** a lapátvégtől a földig elvezeti az áramot.', parts: ['agy', 'fek', 'villam', 'gondola'] },
      { icon: '🏭', title: '8. Gyártás: lapátok, gondola, torony', text: 'A **lapátokat** két félformában, üvegszálas szövetből és epoxigyantából **vákuuminfúzióval** készítik, majd összeragasztják. A **gondolát** (főtengely, hajtómű, generátor, fék, vezérlés) gyárban szerelik össze és próbapadon tesztelik. A **torony** szakaszait acéllemezekből hengerelik és hegesztik. Mindent külön kamionokon, tengeri turbinánál hajón szállítanak a helyszínre.', parts: ['lapatok', 'gondola', 'torony', 'hajtomu', 'generator'] },
      { icon: '🏗️', title: '9. Telepítés a helyszínen', text: 'Először utat és darupályát építenek, majd elkészül a vasbeton **alapozás** a földelőhálóval. Hetekkel később egy hatalmas **daru** egymásra emeli a **toronyszakaszokat**, felteszi a **gondolát**, végül a **rotort** (egyben vagy lapátonként). Bekötik a kábeleket az **átalakítóhoz** és a **transzformátorhoz**, majd próbaüzem következik. Egy turbina felállítása jó időben néhány nap.', parts: ['alapozas', 'torony', 'gondola', 'lapatok', 'atalakito'] }
    ],
    history: [
      { year: '1887', text: 'James **Blyth** skót mérnök a skóciai Marykirkben vitorlavásznas szélkereket épít, amely akkumulátorokat tölt, és a nyaralója világítását adja: ez az egyik első áramtermelő szélgép.' },
      { year: '1888', text: 'Charles F. **Brush** az amerikai Clevelandben megépíti a 17 m átmérőjű, **144 lapátos** szélkerekét, amely egy 12 kW-os egyenáramú dinamót hajt. Kb. 20 évig látta el árammal a házát.' },
      { year: '1891', text: 'Poul **la Cour** dán tanár Askovban kísérleti szélturbinákat épít, szélcsatornában vizsgálja őket, és rájön, hogy a **kevés lapátú, gyorsan forgó** rotor hatékonyabb. Árammal vizet bont, és a hidrogénnel világít; szélvillamossági tanfolyamokat is indít.' },
      { year: '1957', text: 'Johannes **Juul** megépíti a dán **Gedser** szélturbinát: 200 kW, **három lapát**, szél felőli rotor, aszinkron generátor, lapátvég-fékek. 1967-ig üzemelt, és a modern turbinák mintája lett.' },
      { year: '1980-as évek', text: 'Az olajválságok után Dániában és Kaliforniában szélturbina-gyártás indul. A háromlapátos, szél felé néző, hálózatra kapcsolt **„dán modell”** válik szabvánnyá; a turbinák teljesítménye 50–100 kW-ról évtizedenként sokszorosára nő.' },
      { year: '1991', text: 'Dániában, **Vindeby** mellett felépül a világ első **tengeri (offshore) szélparkja**: tizenegy 450 kW-os turbina. A tengeren erősebb és egyenletesebb a szél.' },
      { year: '2000-es évek', text: 'Megépülnek az első **magyarországi** szélturbinák, majd szélparkok, főleg a szelesebb **Kisalföldön** (Győr-Moson-Sopron megye). A hazai beépített szélerőmű-teljesítmény kb. **330 MW**-ra nőtt, de a 2016-tól érvényes szigorú telepítési szabályok miatt sokáig alig változott.' },
      { year: 'ma', text: 'A tengeri turbinák **15 MW** körüliek (és még nagyobbak is épülnek), rotorátmérőjük 220–260 m. A szélenergia az EU villamosenergia-termelésének kb. ötödét adja; Dániában a felénél is többet.' }
    ],
    quiz: [
      { q: 'Hányszorosára nő a szél teljesítménye, ha a szélsebesség kétszeresére nő?', options: ['Nyolcszorosára', 'Kétszeresére', 'Négyszeresére', 'Nem változik'], answer: 0, explain: 'P = ½·ρ·A·v³: a teljesítmény a szélsebesség köbével arányos, 2³ = 8.' },
      { q: 'Mit mond ki a Betz-határ?', options: ['A szél energiájának legfeljebb kb. 59%-a nyerhető ki', 'A turbina legfeljebb 25 m/s szélben működhet', 'A rotor legfeljebb 3 lapátú lehet', 'A generátor hatásfoka legfeljebb 59%'], answer: 0, explain: 'c_p,max = 16/27 ≈ 0,593: a levegőnek tovább kell áramolnia, ezért nem lehet minden energiáját elvenni.' },
      { q: 'Mi a hajtómű (multiplikátor) feladata?', options: ['A rotor lassú forgását a generátornak megfelelő gyors forgássá alakítja', 'A szélbe fordítja a gondolát', 'A feszültséget emeli', 'Leállítja a rotort viharban'], answer: 0, explain: 'Kb. 10–15 1/percről kb. 1000–1800 1/percre gyorsít. A feszültséget a transzformátor emeli.' },
      { q: 'Hogyan állítja le elsősorban a turbina a rotort viharban?', options: ['A lapátokat élükkel a szél felé fordítja (zászlóállás)', 'Csak a tárcsafékkel', 'A gondolát a széllel háttal fordítja', 'Lekapcsolja a transzformátort'], answer: 0, explain: 'A pitch-rendszer aerodinamikailag fékez; a mechanikus fék csak rögzíti a majdnem álló rotort.' },
      { q: 'Miért építik a turbinákat ilyen magas toronyra?', options: ['Mert a magasban erősebb és egyenletesebb a szél', 'Hogy messziről látszódjanak', 'Hogy a madarak ne érjék el', 'Mert a lapátok így könnyebbek'], answer: 0, explain: 'A talaj közelében a felszín érdessége lassítja a szelet; a v³ miatt kis sebességnövekedés is sok többletenergiát jelent.' }
    ]
  });
})();
