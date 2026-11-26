/* Modell: kétlépcsős, kerozin–folyékony oxigén hajtású hordozórakéta visszatérő első lépcsővel
 * (felépítése a Falcon 9-hez hasonló; a számpéldák a Falcon 9 Block 5 nyilvános adataihoz igazodnak).
 * Oldalnézet, függőlegesen; a rakétát méterben adjuk meg az orrcsúcstól lefelé (m), a hossz léptéke 11 képpont/m.
 * A vastagságot kb. kétszeresére nagyítottuk, hogy a belső részek látszódjanak. A tartályok jobb oldalán „kivágott ablak”. */
(function () {
  var K = 11, Y0 = 40, CX = 170, HW = 40, FW = 56;   // lépték, felső szél, tengely, törzs- és burkolat-félszélesség (képpont)
  var NS = ' pointer-events="none"';
  function Y(m) { return Y0 + m * K; }
  function n1(v) { return Math.round(v * 10) / 10; }
  function rect(x, y, w, h, fill, extra) { return '<rect x="' + n1(x) + '" y="' + n1(y) + '" width="' + n1(w) + '" height="' + n1(h) + '" fill="' + fill + '"' + (extra || '') + '/>'; }
  function line(x1, y1, x2, y2, col, w, extra) { return '<line x1="' + n1(x1) + '" y1="' + n1(y1) + '" x2="' + n1(x2) + '" y2="' + n1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 1) + '"' + (extra || '') + '/>'; }
  function path(d, fill, stroke, w, extra) { return '<path d="' + d + '" fill="' + fill + '" stroke="' + (stroke || 'none') + '" stroke-width="' + (w || 1) + '" stroke-linejoin="round"' + (extra || '') + '/>'; }
  /* henger-héj m0..m1 között, hw félszélességgel */
  function shell(m0, m1, hw, fill, stroke) { return rect(CX - hw, Y(m0), 2 * hw, (m1 - m0) * K, fill, ' stroke="' + (stroke || '#4b5563') + '" stroke-width="1.2"'); }
  /* kivágott ablak a héj jobb oldalán */
  var WX0 = CX - 14, WX1 = CX + HW - 5;
  function win(m0, m1) { return rect(WX0, Y(m0), WX1 - WX0, (m1 - m0) * K, '#1f2733', ' stroke="#111827" stroke-width="1.2"'); }
  /* folyadék a kivágásban, kupolás tetővel */
  function liquid(m0, m1, fill) {
    var y0 = Y(m0), y1 = Y(m1);
    return path('M' + WX0 + ' ' + n1(y0 + 6) + ' Q' + CX + ' ' + n1(y0 - 3) + ' ' + WX1 + ' ' + n1(y0 + 6) + ' L' + WX1 + ' ' + n1(y1) + ' L' + WX0 + ' ' + n1(y1) + ' Z', fill, 'none', 0, NS);
  }

  var defs = '<defs>' +
    '<linearGradient id="rk-white" x1="0" x2="1"><stop offset="0" stop-color="#8f98a3"/><stop offset=".32" stop-color="#ffffff"/><stop offset=".7" stop-color="#d7dbe0"/><stop offset="1" stop-color="#7b838d"/></linearGradient>' +
    '<linearGradient id="rk-black" x1="0" x2="1"><stop offset="0" stop-color="#0e1013"/><stop offset=".35" stop-color="#4a4f58"/><stop offset="1" stop-color="#15171b"/></linearGradient>' +
    '<linearGradient id="rk-metal" x1="0" x2="1"><stop offset="0" stop-color="#6b7280"/><stop offset=".4" stop-color="#e5e7eb"/><stop offset="1" stop-color="#6b7280"/></linearGradient>' +
    '<linearGradient id="rk-niob" x1="0" x2="1"><stop offset="0" stop-color="#2a2d33"/><stop offset=".4" stop-color="#6c707a"/><stop offset="1" stop-color="#25282d"/></linearGradient>' +
    '<linearGradient id="rk-lox" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0ff"/><stop offset="1" stop-color="#5aa2f0"/></linearGradient>' +
    '<linearGradient id="rk-rp1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe29a"/><stop offset="1" stop-color="#e0a530"/></linearGradient>' +
    '<linearGradient id="rk-gold" x1="0" x2="1"><stop offset="0" stop-color="#b8860b"/><stop offset=".5" stop-color="#ffd76a"/><stop offset="1" stop-color="#a8770a"/></linearGradient>' +
    '<linearGradient id="rk-copper" x1="0" x2="1"><stop offset="0" stop-color="#8a4b25"/><stop offset=".45" stop-color="#e09a62"/><stop offset="1" stop-color="#7a3f1f"/></linearGradient>' +
    '</defs>';

  /* ---------- Háttér: cím, lépték, repülési profil ---------- */
  function profile() {
    var x0 = 600, y0 = 712, s = '';
    s += rect(x0, y0, 288, 220, 'rgba(99,102,241,.08)', ' stroke="#7f8db0" rx="10"');
    s += '<text class="lbl-muted" x="' + (x0 + 144) + '" y="' + (y0 + 18) + '" font-size="11" text-anchor="middle">Egy repülés útvonala (nem méretarányos)</text>';
    var gy = y0 + 196;
    s += line(x0 + 10, gy, x0 + 278, gy, '#7f8db0', 1.2);
    s += path('M' + (x0 + 24) + ' ' + gy + ' Q' + (x0 + 40) + ' ' + (y0 + 110) + ' ' + (x0 + 110) + ' ' + (y0 + 78), 'none', '#2f6fd6', 2.4);   // első lépcső
    s += path('M' + (x0 + 110) + ' ' + (y0 + 78) + ' Q' + (x0 + 190) + ' ' + (y0 + 40) + ' ' + (x0 + 274) + ' ' + (y0 + 40), 'none', '#16a34a', 2.4);   // második lépcső
    s += path('M' + (x0 + 110) + ' ' + (y0 + 78) + ' Q' + (x0 + 140) + ' ' + (y0 + 50) + ' ' + (x0 + 150) + ' ' + (y0 + 90) + ' Q' + (x0 + 158) + ' ' + (y0 + 150) + ' ' + (x0 + 150) + ' ' + gy, 'none', '#d97706', 2, ' stroke-dasharray="5 3"');
    s += rect(x0 + 140, gy - 4, 22, 4, '#64748b');
    s += '<circle cx="' + (x0 + 110) + '" cy="' + (y0 + 78) + '" r="3.5" fill="#dc2626"/>';
    s += '<text class="lbl-muted" x="' + (x0 + 14) + '" y="' + (gy + 14) + '" font-size="10">indítás</text>';
    s += '<text class="lbl-muted" x="' + (x0 + 104) + '" y="' + (y0 + 70) + '" font-size="10" text-anchor="end">lépcsőelválás</text>';
    s += '<text class="lbl-muted" x="' + (x0 + 104) + '" y="' + (y0 + 82) + '" font-size="10" text-anchor="end">kb. 2,5 perc</text>';
    s += '<text class="lbl-muted" x="' + (x0 + 200) + '" y="' + (y0 + 34) + '" font-size="10">pályára állás</text>';
    s += '<text class="lbl-muted" x="' + (x0 + 168) + '" y="' + (y0 + 130) + '" font-size="10">az első lépcső</text>';
    s += '<text class="lbl-muted" x="' + (x0 + 168) + '" y="' + (y0 + 142) + '" font-size="10">visszatér és</text>';
    s += '<text class="lbl-muted" x="' + (x0 + 168) + '" y="' + (y0 + 154) + '" font-size="10">leszáll (uszály)</text>';
    return s;
  }
  var scaleBar = line(30, Y(60), 30, Y(70), '#7f8db0', 2) + line(24, Y(60), 36, Y(60), '#7f8db0', 2) + line(24, Y(70), 36, Y(70), '#7f8db0', 2) +
    '<text class="lbl-muted" x="40" y="' + (Y(65) + 4) + '" font-size="11">10 m</text>';
  var backdrop = defs +
    '<text class="lbl" x="300" y="34" font-size="16">Kétlépcsős hordozórakéta – felvágva</text>' +
    '<text class="lbl-muted" x="300" y="52">kerozin + folyékony oxigén, visszatérő első lépcső (kb. Falcon 9 felépítés)</text>' +
    '<text class="lbl-muted" x="300" y="68">kb. 70 m magas, 3,7 m átmérőjű · a vastagság kb. kétszeresére nagyítva</text>' +
    scaleBar + profile() +
    '<text class="lbl-muted" x="' + (CX + 62) + '" y="' + Y(20) + '" font-size="11">2. lépcső</text>' +
    '<text class="lbl-muted" x="' + (CX + 62) + '" y="' + Y(50) + '" font-size="11">1. lépcső</text>' +
    '<text class="lbl-muted" x="' + (CX + 62) + '" y="' + (Y(50) + 14) + '" font-size="11">(visszatér)</text>';

  /* ---------- 1. Hasznos teher (műhold) a burkolat alatt ---------- */
  var sx = CX + 12, sat = '';
  sat += path('M' + (sx - 20) + ' ' + Y(10.3) + ' L' + (sx + 20) + ' ' + Y(10.3) + ' L' + (sx + 30) + ' ' + Y(13) + ' L' + (sx - 30) + ' ' + Y(13) + ' Z', '#9ca3af', '#374151', 1);   // hasznosteher-adapter
  sat += rect(sx - 20, Y(4.6), 40, (10.3 - 4.6) * K, 'url(#rk-gold)', ' stroke="#7c5a05" stroke-width="1"');                                  // műholdtest aranyfóliával
  for (var sp = 0; sp < 4; sp++) sat += rect(sx - 26, Y(5.0 + sp * 1.35), 5, 1.25 * K, '#1e3a8a', ' stroke="#93c5fd" stroke-width=".6"');      // összecsukott napelemtábla
  sat += path('M' + (sx - 14) + ' ' + Y(4.6) + ' Q' + sx + ' ' + Y(2.6) + ' ' + (sx + 14) + ' ' + Y(4.6) + ' Z', '#e5e7eb', '#6b7280', 1);       // antennatányér
  sat += line(sx, Y(3.9), sx, Y(3.0), '#6b7280', 1.4);
  sat += '<text x="' + sx + '" y="' + (Y(7.6) + 4) + '" font-size="9" text-anchor="middle" fill="#3b2a00"' + NS + '>MŰHOLD</text>';

  /* ---------- 2. Orrkúp / burkolat (két fél) ---------- */
  var fair = '', fp = 'M' + CX + ' ' + Y(0);
  for (var i = 1; i <= 12; i++) { var m = i / 2, u = 1 - m / 6; fp += ' L' + n1(CX + FW * Math.sqrt(1 - u * u)) + ' ' + n1(Y(m)); }
  fp += ' L' + (CX + FW) + ' ' + Y(12.3) + ' L' + (CX + HW) + ' ' + Y(13.8) + ' L' + (CX - HW) + ' ' + Y(13.8) + ' L' + (CX - FW) + ' ' + Y(12.3) + ' L' + (CX - FW) + ' ' + Y(6);
  for (i = 11; i >= 0; i--) { var m2 = i / 2, u2 = 1 - m2 / 6; fp += ' L' + n1(CX - FW * Math.sqrt(1 - u2 * u2)) + ' ' + n1(Y(m2)); }
  fair += path(fp + ' Z', 'url(#rk-white)', '#4b5563', 1.3);
  fair += rect(CX - 8, Y(2.4), FW + 3, (11.9 - 2.4) * K, '#1f2733', ' stroke="#111827" stroke-width="1.2" rx="3"');   // kivágás
  fair += line(CX - 9, Y(0.6), CX - 9, Y(12.3), 'rgba(55,65,81,.55)', 1, ' stroke-dasharray="3 3"');                   // a két fél illesztése
  fair += '<text x="' + (CX - 34) + '" y="' + Y(9.5) + '" font-size="8" fill="#6b7280" transform="rotate(-90 ' + (CX - 34) + ' ' + Y(9.5) + ')"' + NS + '>BURKOLAT</text>';

  /* ---------- 3. Avionika és adaptergyűrű a 2. lépcső tetején ---------- */
  var av = shell(13.8, 15.2, HW, 'url(#rk-black)', '#111');
  [[-30, '#22c55e'], [-8, '#22c55e'], [14, '#f59e0b']].forEach(function (b) {
    av += rect(CX + b[0], Y(14.0), 18, 1.0 * K, '#374151', ' stroke="#9ca3af" stroke-width=".6"');
    av += '<circle cx="' + (CX + b[0] + 14) + '" cy="' + n1(Y(14.5)) + '" r="1.6" fill="' + b[1] + '"' + NS + '/>';
  });
  av += rect(CX + HW - 6, Y(13.4), 5, 0.5 * K, '#d1d5db');   // GPS-antenna

  /* ---------- 4. Második lépcső tartályai ---------- */
  var s2 = shell(15.2, 27, HW, 'url(#rk-white)') + win(15.8, 26.4) + liquid(16.6, 21.2, 'url(#rk-lox)') + liquid(21.8, 26.4, 'url(#rk-rp1)');
  s2 += path('M' + WX0 + ' ' + n1(Y(21.5) + 4) + ' Q' + CX + ' ' + n1(Y(21.5) - 6) + ' ' + WX1 + ' ' + n1(Y(21.5) + 4), 'none', '#cbd5e1', 2, NS);   // közös válaszfal
  s2 += '<text x="' + (CX + 4) + '" y="' + (Y(19) + 3) + '" font-size="9" fill="#0b3b75"' + NS + '>LOX</text><text x="' + (CX + 2) + '" y="' + (Y(24.3) + 3) + '" font-size="9" fill="#6b4400"' + NS + '>RP-1</text>';

  /* ---------- 5. Második lépcső hajtóműve (vákuumváltozat, hosszú fúvókával) ---------- */
  var mv = rect(CX - 9, Y(27), 18, 1.6 * K, 'url(#rk-metal)', ' stroke="#374151" stroke-width="1"') +
    rect(CX + 9, Y(27.2), 9, 0.9 * K, '#9ca3af', ' stroke="#374151" stroke-width=".8"') +
    path('M' + (CX - 9) + ' ' + Y(28.6) + ' L' + (CX - 33) + ' ' + Y(34.3) + ' L' + (CX + 33) + ' ' + Y(34.3) + ' L' + (CX + 9) + ' ' + Y(28.6) + ' Z', 'url(#rk-niob)', '#111', 1) +
    line(CX - 14, Y(29.8), CX + 14, Y(29.8), 'rgba(255,255,255,.18)', 1, NS) + line(CX - 22, Y(31.8), CX + 22, Y(31.8), 'rgba(255,255,255,.14)', 1, NS);

  /* ---------- 6. Lépcsőközi gyűrű (interstage) ---------- */
  var inter = shell(27, 34.5, HW, 'url(#rk-black)', '#000') + rect(CX - HW + 5, Y(27.5), 2 * HW - 10, 6.5 * K, '#0b0d10', ' opacity=".85"') +
    '<text x="' + (CX - 28) + '" y="' + Y(33.6) + '" font-size="7.5" fill="#9ca3af"' + NS + '>lépcsőközi gyűrű</text>';

  /* ---------- 7. Rácsos kormányfelületek ---------- */
  function lattice(x, y, w, h, n) {
    var s = rect(x, y, w, h, '#a8aeb6', ' stroke="#4b5563" stroke-width="1.2"');
    for (var a = 1; a < n; a++) { s += line(x + w * a / n, y, x + w * a / n, y + h, '#4b5563', 0.8, NS); }
    for (var b = 1; b < 4; b++) { s += line(x, y + h * b / 4, x + w, y + h * b / 4, '#4b5563', 0.8, NS); }
    return s;
  }
  var fins = lattice(CX - HW - 28, Y(27.6), 28, 1.5 * K, 6) + lattice(CX + HW, Y(27.6), 28, 1.5 * K, 6) + lattice(CX - 14, Y(27.4), 28, 1.8 * K, 6);

  /* ---------- 8. Első lépcső: oxigéntartály ---------- */
  var lox = shell(34.5, 51, HW, 'url(#rk-white)') + win(35.3, 50.6) + liquid(36.6, 50.6, 'url(#rk-lox)') +
    '<text x="' + (CX + 8) + '" y="' + Y(48.5) + '" font-size="9" fill="#0b3b75"' + NS + '>folyékony O₂</text>' +
    '<text x="' + (CX - 30) + '" y="' + Y(44) + '" font-size="8" fill="#6b7280" transform="rotate(-90 ' + (CX - 30) + ' ' + Y(44) + ')"' + NS + '>ELSŐ LÉPCSŐ</text>';

  /* ---------- 9. Héliumos nyomástartó palackok (COPV) az oxigéntartályban ---------- */
  var copv = '';
  [[CX - 4, 37.6], [CX + 16, 39.8], [CX - 4, 42.0]].forEach(function (c) {
    copv += rect(c[0] - 7, Y(c[1]), 14, 1.9 * K, '#3f3f46', ' stroke="#d4d4d8" stroke-width="1" rx="7"');
    copv += line(c[0] - 4, Y(c[1]) + 4, c[0] - 4, Y(c[1] + 1.9) - 4, 'rgba(255,255,255,.35)', 1, NS);
  });

  /* ---------- 10. Első lépcső: kerozintartály (RP-1), benne az oxigén-átvezető cső ---------- */
  var rp1 = shell(51, 64, HW, 'url(#rk-white)') + win(51.6, 63.6) + liquid(52.6, 63.6, 'url(#rk-rp1)') +
    path('M' + WX0 + ' ' + n1(Y(51.2) + 4) + ' Q' + CX + ' ' + n1(Y(51.2) - 6) + ' ' + WX1 + ' ' + n1(Y(51.2) + 4), 'none', '#cbd5e1', 2, NS) +
    rect(CX + 16, Y(51.3), 7, 12.3 * K, 'url(#rk-lox)', ' stroke="#1e3a8a" stroke-width=".8"') +
    '<text x="' + (CX - 10) + '" y="' + Y(58) + '" font-size="9" fill="#6b4400"' + NS + '>kerozin</text>' +
    '<text x="' + (CX - 10) + '" y="' + (Y(58) + 11) + '" font-size="9" fill="#6b4400"' + NS + '>(RP-1)</text>';

  /* ---------- 11. Leszállólábak (összecsukva) ---------- */
  function leg(side) {
    var x = side < 0 ? CX - HW - 5 : CX + HW - 1;
    return rect(x, Y(57.2), 6, 10.4 * K, 'url(#rk-black)', ' stroke="#000" stroke-width="1" rx="2"') +
      line(x + 3, Y(57.6), x + 3, Y(67.2), 'rgba(255,255,255,.18)', 1, NS) + rect(x - 1, Y(67.3), 8, 0.5 * K, '#6b7280');
  }
  var legs = leg(-1) + leg(1);

  /* ---------- 12. Hajtóműtér: 9 hajtómű égéskamrája az „oktaweb” tartószerkezeten ---------- */
  var eng = shell(64, 68.6, HW, 'url(#rk-black)', '#111') + rect(CX - HW + 4, Y(64.4), 2 * HW - 8, 3.9 * K, '#111827');
  eng += line(CX - HW + 4, Y(65), CX + HW - 4, Y(65), '#6b7280', 2.2) + line(CX - HW + 4, Y(65), CX, Y(66.4), '#6b7280', 1.6) + line(CX + HW - 4, Y(65), CX, Y(66.4), '#6b7280', 1.6);  // oktaweb
  [-26, 0, 26].forEach(function (dx) {
    eng += rect(CX + dx - 6, Y(66.0), 12, 1.6 * K, 'url(#rk-metal)', ' stroke="#374151" stroke-width=".8" rx="3"');   // égéskamra
    eng += rect(CX + dx - 3, Y(67.6), 6, 1.0 * K, '#9ca3af', ' stroke="#374151" stroke-width=".6"');                 // torok
  });

  /* ---------- 13. Turbópumpa (a hajtóműtér kivágásában) ---------- */
  var tx = CX + 13, tp = '';
  tp += rect(tx - 2, Y(64.7), 10, 1.3 * K, '#94a3b8', ' stroke="#1f2937" stroke-width=".8" rx="2"');        // oxigénszivattyú
  tp += rect(tx + 8, Y(64.9), 7, 1.0 * K, '#c2410c', ' stroke="#1f2937" stroke-width=".8" rx="2"');         // turbina (gázgenerátor-hajtás)
  tp += rect(tx - 2, Y(66.0), 10, 0.8 * K, '#d6a756', ' stroke="#1f2937" stroke-width=".8" rx="2"');        // kerozinszivattyú
  tp += path('M' + (tx + 15) + ' ' + n1(Y(65.4)) + ' L' + (tx + 19) + ' ' + n1(Y(65.6)) + ' L' + (tx + 19) + ' ' + Y(68.4), 'none', '#78716c', 2.2);   // turbina kipufogója

  /* ---------- 14. Fúvókák ---------- */
  function bell(dx, col, op) {
    var t = Y(68.6), b = Y(71.2);
    return path('M' + (CX + dx - 4) + ' ' + t + ' Q' + (CX + dx - 6) + ' ' + n1(t + 12) + ' ' + (CX + dx - 12) + ' ' + b + ' L' + (CX + dx + 12) + ' ' + b + ' Q' + (CX + dx + 6) + ' ' + n1(t + 12) + ' ' + (CX + dx + 4) + ' ' + t + ' Z', col, '#1f2937', 1, op ? ' opacity="' + op + '"' : '');
  }
  var noz = bell(-13, 'url(#rk-copper)', 0.7) + bell(13, 'url(#rk-copper)', 0.7) + bell(-26, 'url(#rk-copper)') + bell(0, 'url(#rk-copper)') + bell(26, 'url(#rk-copper)');

  function BG(m, dx) { return [CX + (dx || -HW - 16), Math.round(Y(m))]; }

  STUDIE.addModel({
    id: 'raketa',
    title: 'Többlépcsős hordozórakéta',
    icon: '🚀',
    color: '#4b4fc4',
    category: 'Járművek',
    keywords: 'rakéta hordozórakéta űrrakéta Falcon 9 SpaceX lépcső első lépcső második lépcső lépcsőelválás hajtómű rakétahajtómű Merlin turbópumpa gázgenerátor fúvóka Laval-fúvóka tolóerő fajlagos impulzus kerozin RP-1 folyékony oxigén LOX hélium COPV nyomástartó tartály burkolat orrkúp hasznos teher műhold adapter avionika repülésvezérlő IMU GPS rácsos kormányfelület grid fin leszállóláb újrafelhasználható visszatérő lépcső leszállás uszály Ciolkovszkij-egyenlet delta-v pályára állás űrrepülés',
    summary: 'Két egymásra épített rakéta: az első lépcső kilenc hajtóművel kb. két és fél perc alatt kiviszi a légkör sűrűjéből, aztán leválik és visszarepül leszállni; a második egyetlen hajtóművel pályára állítja a műholdat.',
    scale: 'kb. 70 m magas, 3,7 m átmérő, induláskor kb. 550 tonna',
    viewBox: '0 0 900 940',
    backdrop: backdrop,
    intro: 'A hordozórakéta lényegében **két rakéta egymás tetején**. Induláskor a tömege kb. **90%-a hajtóanyag**: kerozin és −183 °C-os (sőt még jobban lehűtött) **folyékony oxigén**. Az **első lépcső** kilenc hajtóművével kb. két és fél percig gyorsít, aztán kiürülve **leválik**. A **második lépcső** egyetlen, hosszú fúvókás hajtóművel folytatja, és a burkolat ledobása után pályára állítja a **műholdat**.\n\nA különlegesség: az első lépcső **nem vész el**. Hajtóműveit újragyújtva visszafordul, **rácsos kormányfelületekkel** kormányozza magát a légkörben, végül **leszállólábakra** ereszkedik egy uszályon vagy a szárazföldön – és újra felhasználható. A működés alapja Newton III. törvénye: a hátrafelé kilőtt gáz előre löki a rakétát. Kattints az alkatrészekre, vagy szedd szét a rakétát!',
    parts: [
      {
        id: 'hasznos-teher', z: 6, name: 'Hasznos teher (műhold)', svg: sat, explode: [200, 0], badge: [sx, Math.round(Y(7.6)) - 16], en: 'payload (satellite) on payload adapter',
        lesson: 'csillagaszat/gravitacio-palyak',
        what: 'Ezért repül az egész rakéta: a **műhold** (vagy űrhajó, űrszonda). Egy **adaptergyűrűn** ül, és pályán rugós szerkezet löki el a második lépcsőtől. A rajzon egy távközlési műhold látszik összecsukott napelemtáblákkal és antennatányérral.',
        madeOf: 'Alumínium és szénszálas váz, **aranyszínű többrétegű szigetelőfólia** (poliimid alumíniumgőzöléssel), napelemek, elektronika, hajtóanyag a saját kis hajtóműveihez.',
        how: 'Tisztatérben szerelik és tesztelik: rázópadon kipróbálják az indítás rezgéseit, vákuumkamrában a világűr hidegét és melegét. Az indítóhelyen tankolják fel, majd a burkolat alá zárják.',
        uni: 'Egy Falcon 9 alacsony Föld körüli pályára (LEO) kb. **22,8 tonnát** visz, ha a lépcsőt nem hozzák vissza; visszatéréssel kevesebbet, mert az első lépcsőnek hajtóanyag-tartalékot kell megtartania. Geostacionárius átmeneti pályára (GTO) a hasznos teher több tonnával kisebb, mert ott sokkal nagyobb sebességváltozás kell. A pályára állítás feltétele kb. `7,8 km/s` vízszintes sebesség 200–400 km magasan.',
        fact: 'Egyetlen indítással akár több tucat kis műholdat is pályára állítanak egyszerre (pl. Starlink-műholdak, vagy közös „telekocsi” indítások egyetemi kisműholdakkal).'
      },
      {
        id: 'burkolat', z: 5, name: 'Orrkúp (hasznosteher-burkolat)', svg: fair, explode: [380, 110], badge: BG(6, -FW - 16), en: 'payload fairing',
        terms: ['mechanika/feszultseg', 'fizika-bsc/idealis-gaz'],
        what: 'A **burkolat** a rakéta orra: két félből álló héj, amely a műholdat védi a légköri repülés alatt a **légellenállástól, a melegedéstől és a zajtól**. Kb. 110 km magasan, ahol már alig van levegő, **pirotechnikai vagy pneumatikus** zárak oldják, és a két fél szétnyílik.',
        madeOf: 'Szénszálas kompozit borítás alumínium méhsejtmaggal: nagyon könnyű és merev. Belül hangelnyelő takarók.',
        how: 'A két félhéjat formában rétegezik és autoklávban kikeményítik. A Falcon 9 burkolatfelei a ledobás után kis hajtóművekkel és irányítható ejtőernyővel ereszkednek a tengerre, ahonnan kihalásszák és újra felhasználják őket.',
        uni: 'A Falcon 9 burkolata kb. **13 m** magas és **5,2 m** átmérőjű. A legnagyobb aerodinamikai terhelés a **max Q** pontban éri (dinamikus nyomás `q = ½·ρ·v²` maximuma, kb. 1 perccel az indítás után, 11–14 km magasan). A burkolat belső nyomását szellőzők egyenlítik ki; a ledobás időpontját úgy választják, hogy a molekuláris hőáram már elhanyagolható legyen a műholdra.',
        fact: 'Egy burkolatpár ára néhány millió dollár – ezért éri meg a tengerből kihalászni.'
      },
      {
        id: 'avionika', z: 7, name: 'Avionika és adaptergyűrű', svg: av, explode: [200, 30], badge: BG(14.5), link: 'processzor', en: 'avionics (flight computers, IMU, GPS)',
        terms: ['szabalyozas/pid-szabalyozo', 'msc-iranyitas/kalman-szuro'],
        what: 'A rakéta **„agya”**: repülésvezérlő számítógépek, **inerciális mérőegység** (giroszkópok és gyorsulásmérők), **GPS-vevő** és rádiók. Másodpercenként sokszor kiszámolja, hol van a rakéta, és merre kell billenteni a hajtóműveket. Ugyanilyen egység van az első lépcsőn is a visszatéréshez.',
        madeOf: 'Hőálló, rázkódásálló dobozokban lévő áramköri lapok, csatlakozók, kábelkötegek; a gyűrű alumíniumból vagy kompozitból.',
        how: 'A számítógépek **háromszoros redundanciával** működnek: három gép számol egyszerre, és ha egyikük eltér, a másik kettő „leszavazza”. Indítás előtt minden egységet szimulált repülésen tesztelnek.',
        uni: 'A navigáció inerciális és GNSS-mérések **Kalman-szűrős** fúziója. A vezérlés a hajtóművek **kardánfelfüggesztését** (gimbal) mozgatja, az irányítás tipikusan kaszkád: külső hurok a pályát, belső a szöghelyzetet szabályozza. A pályát a repülés közben „zárt hurokban” újratervezik, hogy a második lépcső a célpályát minimális hajtóanyaggal érje el.',
        fact: 'A Falcon 9 repülésvezérlő szoftvere a hibatűrést nem különleges űrchipekkel, hanem több, egymást ellenőrző hagyományos processzorral éri el.'
      },
      {
        id: 'masodik-lepcso', z: 4, name: 'Második lépcső (tartályok)', svg: s2, explode: [200, 50], badge: BG(21), en: 'second stage tanks (LOX and RP-1)',
        lesson: 'csillagaszat/raketak',
        what: 'A második lépcső a rakéta felső része: két tartály (**folyékony oxigén** és **kerozin**, köztük közös válaszfal) és alatta egy hajtómű. A légkör fölött, kb. 70–80 km magasan gyújt, és ő gyorsítja fel a műholdat a pályasebességre, kb. **7,8 km/s**-ra.',
        madeOf: 'A tartályok falát **alumínium–lítium ötvözetből** hegesztik: könnyű és erős. Kívül hőszigetelő festék.',
        how: 'A hengeres tartálygyűrűket és a kupolákat **súrlódó keveréses hegesztéssel** (friction stir welding) illesztik, amely nem olvasztja meg a fémet, ezért erősebb a varrat. Utána nyomáspróbának vetik alá.',
        uni: 'A második lépcső tömegaránya döntő: minden kilogramm, amit itt megspórolnak, közvetlenül hasznos teherként jelentkezik. A Ciolkovszkij-egyenlet szerint `Δv = v_e · ln(m₀/m₁)`; a vákuumváltozatú hajtómű nagyobb kiáramlási sebessége (fajlagos impulzus kb. 348 s) itt különösen sokat ér.',
        fact: 'A második lépcső többször újragyújtható: egy indítás során akár több különböző pályára is kiteheti a műholdakat.'
      },
      {
        id: 'masodik-hajtomu', z: 6, name: 'Második lépcső hajtóműve (vákuumfúvókával)', svg: mv, explode: [200, 70], badge: BG(31), en: 'vacuum-optimised upper-stage engine',
        terms: ['fizika-bsc/idealis-gaz', 'fizika-bsc/elso-fotetel'],
        what: 'Egyetlen hajtómű **hatalmas, sötét fúvókával**. A légüres térben a gáz jobban ki tud tágulni, ezért a hosszabb fúvóka több tolóerőt ad ugyanannyi hajtóanyagból. A földön ez a fúvóka nem működne jól, mert a külső légnyomás „visszanyomná” a gázsugarat.',
        madeOf: 'Az égéskamra rézötvözetből készül, a fúvókahosszabbítás vékony, hőálló **nióbiumötvözetből**: ez sugárzással hűl, vörösen izzik működés közben.',
        how: 'A nióbiumlemezt alakra hengerlik, hegesztik és hőálló bevonattal látják el. A hajtóművet próbapadon tesztelik, mielőtt a lépcsőre szerelik.',
        uni: 'A fúvóka tágulási aránya (kilépő és torok-keresztmetszet aránya) a vákuumváltozatnál sokszorosa a tengerszintinek. A tolóerő `F = ṁ·v_e + (p_e − p_a)·A_e`: vákuumban `p_a = 0`, ezért érdemes a gázt nagyon kis nyomásig tágítani. A Falcon 9 második lépcsőjének tolóereje kb. **981 kN** vákuumban.',
        fact: 'A vákuumfúvóka olyan hosszú, hogy a lépcsőközi gyűrű takarja el – a rajzon a gyűrű „átlátszó”, hogy látszódjon.'
      },
      {
        id: 'lepcsokozi', z: 3, name: 'Lépcsőközi gyűrű és lépcsőelválasztó', svg: inter, explode: [0, 0], badge: BG(33), en: 'interstage with stage separation system',
        terms: ['mechanika/kihajlas'],
        what: 'Az első és a második lépcsőt összekötő **gyűrű**, amely eltakarja a második lépcső fúvókáját. Lépcsőelváláskor zárak oldanak, és **pneumatikus tolórudak** finoman eltolják egymástól a két lépcsőt; csak ezután gyújt a második lépcső hajtóműve.',
        madeOf: 'Szénszálas kompozit alumínium méhsejtmaggal (a Falcon 9-en feltűnően fekete).',
        how: 'Kompozit rétegekből laminálják, a tetejére szerelik a rácsos kormányfelületek mozgató egységeit és az elválasztó szerkezetet.',
        uni: 'A gyűrű főleg **nyomóterhelést** visel (a második lépcső és a hasznos teher súlya és tehetetlensége gyorsuláskor), ezért a méretezés kulcsa a **stabilitás** (horpadás, kihajlás), nem a szilárdság. A pneumatikus elválasztás előnye, hogy nem keletkezik törmelék, és a mechanizmus újrahasználható.',
        fact: 'A lépcsőelválás után néhány másodpercig mindkét lépcső szinte súlytalanul „lebeg” egymás mellett, mielőtt a második lépcső begyújt.'
      },
      {
        id: 'racsos-kormany', z: 8, name: 'Rácsos kormányfelületek', svg: fins, explode: [370, 0], badge: BG(28.4, -HW - 44), en: 'grid fins',
        lesson: 'csillagaszat/raketak',
        what: 'Négy **rács alakú kormánylap** az első lépcső tetején. Felszálláskor be vannak hajtva, visszatéréskor kinyílnak, és elforgatásukkal a lépcső „kormányoz” a légkörben, egészen a leszállóhelyig – kicsit mint egy tollaslabda tollai.',
        madeOf: 'Egy darabból **öntött és megmunkált titán**: kibírja a visszatéréskor fellépő erős felmelegedést, ezért nem kell cserélni.',
        how: 'A titán kormánylapokat öntik, majd marással alakítják ki a rácsot. Hidraulikus működtetők forgatják őket.',
        uni: 'A rácsos kormány a nagy szuperszonikus sebességen is hatásos, kicsi a csuklónyomatéka (kis erővel forgatható), és összecsukva alig foglal helyet. Szubszonikus-transzonikus tartományban viszont a rácscellákban lökéshullámok „fojthatnak” (choking), ami csökkenti a hatékonyságot.',
        fact: 'A Falcon 9 korai rácsos kormányai alumíniumból voltak, és a visszatérés hevében meg-megégtek – ezért tértek át a titánra.'
      },
      {
        id: 'lox-tartaly', z: 2, name: 'Oxigéntartály (első lépcső)', svg: lox, explode: [0, 0], badge: BG(42), en: 'liquid oxygen (LOX) tank',
        terms: ['fizika-bsc/idealis-gaz', 'mechanika/feszultseg'],
        what: 'Az első lépcső felső, nagyobbik tartálya **folyékony oxigénnel** (LOX). Az oxigén csak nagyon hidegen, kb. **−183 °C** alatt folyékony; a Falcon 9 még ennél is jobban lehűti („szuperhűtött” oxigén), mert a hidegebb folyadék sűrűbb, így több fér a tartályba.',
        madeOf: '**Alumínium–lítium ötvözet**, vékony fallal; belül merevítő bordák. A falat a belső **túlnyomás** is merevíti, mint egy felfújt léggömböt.',
        how: 'Hengeres gyűrűkből és kupolákból súrlódó keveréses hegesztéssel állítják össze, majd nyomáspróba következik. A tankolás az indítás előtti utolsó fél órában történik, mert az oxigén folyamatosan párolog.',
        uni: 'A kerozin és az oxigén keverési aránya kb. **2,3–2,6 : 1** (tömegben oxigén : kerozin), ezért nagyobb az oxigéntartály. A tartály falvastagságát a belső nyomás okozta **kerületi feszültség** (`σ = p·r / t`) és a repülési terhelés együtt határozza meg.',
        fact: 'A rakéta oldalán látható fehér „füst” induláskor a hideg tartályon lecsapódó és megfagyó levegőpára, és a szellőzőkön elengedett oxigéngőz.'
      },
      {
        id: 'helium', z: 5, name: 'Héliumos nyomástartó palackok (COPV)', svg: copv, explode: [380, 0], badge: BG(39.8, HW + 18), en: 'composite overwrapped pressure vessels (helium)',
        terms: ['fizika-bsc/idealis-gaz'],
        what: 'Kis, nagynyomású **héliumpalackok** az oxigéntartály belsejében. A hélium a fogyó hajtóanyag helyére áramlik, és **nyomás alatt tartja a tartályokat**: így a folyadék biztosan eljut a szivattyúkig, és a tartály fala sem horpad be.',
        madeOf: 'Alumínium bélés, kívül **szénszálas** tekercseléssel erősítve (COPV: kompozittal tekercselt nyomástartó edény).',
        how: 'Az alumínium bélésre gyantás szénszálat tekercselnek, kikeményítik, majd a normálisnál nagyobb nyomáson bevizsgálják.',
        uni: 'A hélium azért jó, mert −183 °C-on sem cseppfolyósodik és nem lép reakcióba. A hideg oxigénben tárolva sűrűbb, így ugyanakkora palackba több fér (ideális gáz: `p·V = n·R·T`). A palackok tönkremenetele két Falcon 9 balesetben is szerepet játszott (2015, 2016) – azóta módosították a kialakításukat és a tankolás menetét.',
        fact: 'A hélium a második legkönnyebb elem; a rakétákban azért is használják, mert alig növeli a tömeget.'
      },
      {
        id: 'kerozin-tartaly', z: 2, name: 'Kerozintartály (RP-1)', svg: rp1, explode: [0, 0], badge: BG(57), en: 'RP-1 (rocket-grade kerosene) tank with LOX downcomer',
        lesson: 'csillagaszat/raketak',
        what: 'Az első lépcső alsó tartálya **rakétakerozinnal** (RP-1), egy nagyon tisztára finomított kerozinnal. A tartályon egy cső vezet át: ez viszi le a felső tartályból az oxigént a hajtóművekhez.',
        madeOf: 'Alumínium–lítium ötvözet, mint az oxigéntartály. A két tartály egy közös hengeres törzset alkot.',
        how: 'A tartályt hegesztik, nyomáspróbázzák, és kívülről hőálló festéket kap. Tankoláskor a kerozint is lehűtik, hogy több férjen el.',
        uni: 'Az RP-1 előnye a hidrogénhez képest a **nagy sűrűség** (kb. 0,8 kg/l): kisebb, könnyebb tartály kell, és szobahőmérsékleten tárolható. Hátránya a kisebb fajlagos impulzus és a koromképződés (kokszosodás), amely nehezíti a hajtómű újrafelhasználását – ezért az új rakéták egy része metánra vált.',
        fact: 'A rakétakerozin a repülőgépek kerozinjánál jóval tisztább: a kéntartalmát és az aromás vegyületeket szinte teljesen eltávolítják, hogy ne rakódjon le a hűtőcsatornákban.'
      },
      {
        id: 'leszallolabak', z: 3, name: 'Leszállólábak', svg: legs, explode: [400, -80], badge: BG(62, -HW - 22), en: 'landing legs',
        lesson: 'csillagaszat/raketak',
        what: 'Négy **összecsukható láb** az első lépcső alján. Repülés közben a törzshöz simulnak, a leszállás előtti utolsó másodpercekben **pneumatikus** (sűrített héliumos) működtetők kinyitják őket, és egy kb. 18 m-es „lábtávú” állványt alkotnak.',
        madeOf: 'Szénszálas kompozit, alumínium méhsejtmaggal; a lábak végén ütéselnyelő elem.',
        how: 'Kompozitból laminálják és kikeményítik. Az ütéselnyelő egy összenyomódó méhsejtbetét, amelyet minden kemény leszállás után ellenőriznek.',
        uni: 'Leszálláskor a lépcső szinte üres (kb. 25–30 tonna), a hajtómű minimális tolóereje mégis nagyobb a súlyánál, ezért nem tud lebegni: a leszállóégetést úgy kell időzíteni, hogy a sebesség pont a talajnál legyen nulla („hoverslam”). Ez valós idejű, konvex optimalizálással számolt pályavezetést igényel.',
        fact: 'Az első sikeres függőleges leszállás egy orbitális indítás után 2015. december 21-én volt Floridában.'
      },
      {
        id: 'turbopumpa', z: 7, name: 'Turbópumpa', svg: tp, explode: [230, 0], badge: BG(65.4, HW + 20), en: 'turbopump (gas-generator cycle)',
        terms: ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/elso-fotetel'],
        what: 'A hajtómű **szíve**: egy közös tengelyen forgó **turbina és két szivattyú**. Óriási mennyiségű kerozint és oxigént nyom az égéskamrába nagy nyomáson. A turbinát egy kis „előégető” (gázgenerátor) hajtja, amely kevés hajtóanyagot éget el; a kipufogó gázát egy külön csövön engedi ki.',
        madeOf: 'Hőálló **nikkelötvözetek** a turbinához, rozsdamentes acél és alumínium a szivattyúházakhoz, különleges csapágyak és tömítések, amelyek elválasztják a kerozint az oxigéntől.',
        how: 'A lapátkerekeket precíziós öntéssel vagy marással gyártják, kiegyensúlyozzák. Az összeszerelt turbópumpát próbapadon járatják.',
        uni: 'A **gázgenerátoros ciklus** egyszerű, de a turbinát hajtó gázt nem hasznosítja tolóerőként, ezért kissé gyengébb, mint a **fokozatos égésű** ciklus. A turbópumpa teljesítménye egy hajtóműnél több megawatt; a szivattyú a hajtóanyag nyomását a tartálybeli néhány bar-ról jóval 100 bar fölé emeli.',
        fact: 'Egy nagy rakétahajtómű turbópumpája néhány másodperc alatt egy fürdőkádnyi hajtóanyagot is átpumpál.'
      },
      {
        id: 'hajtomuvek', z: 4, name: 'Hajtóművek (9 db) és hajtóműtér', svg: eng, explode: [0, 40], badge: BG(66.4), link: 'hajtomu', en: 'nine first-stage engines on the octaweb thrust structure',
        lesson: 'fizika/newton',
        terms: ['fizika-bsc/impulzus'],
        what: 'Az első lépcső **kilenc hajtóművel** indul: nyolc körben, egy középen (ez az „oktaweb” elrendezés). Az **égéskamrában** a kerozin elég az oxigénben, a gáz kb. 3000 °C-os. A hajtóműveket a vezérlés kis szögben billenti (**kardánfelfüggesztés**), így kormányoz a rakéta.',
        madeOf: 'Az égéskamra belső fala **rézötvözet**, amelyben csatornák futnak: rajtuk a hideg kerozin áramlik, és így hűti a falat (regeneratív hűtés). A tartószerkezet alumínium és titán.',
        how: 'A hűtőcsatornás kamrát marással és forrasztással vagy galvanikus eljárással készítik; egyes alkatrészek ma már **3D-nyomtatással** (fémporos lézeres olvasztással) készülnek.',
        uni: 'A tolóerő a kiáramló gáz **impulzusváltozásából** ered: `F = ṁ·v_e + (p_e − p_a)·A_e`. A Falcon 9 első lépcsője induláskor kb. **7,6 MN** tolóerőt ad (kb. 775 tonnasúly). Kilenc kisebb hajtómű előnye, hogy egy kiesése után is elérhető lehet a pálya („engine-out” képesség), és visszatéréskor egy vagy három hajtómű is újragyújtható.',
        fact: 'A Falcon 9 egyes első lépcsői már több mint 30-szor repültek (2025): a hajtóművek két repülés között csak átvizsgálást kapnak.'
      },
      {
        id: 'fuvoka', z: 5, name: 'Fúvókák', svg: noz, explode: [0, 95], badge: BG(70, -HW - 6), en: 'de Laval nozzles (bells)',
        lesson: 'csillagaszat/raketak',
        what: 'A **harang alakú fúvókák** a hajtóművek legalsó részei. Bennük a forró gáz először összeszűkül (**torok**), majd kitágul, és közben **hangsebesség fölé gyorsul**, akár 3 km/s fölé. Minél gyorsabban áramlik ki a gáz, annál nagyobb a tolóerő ugyanannyi hajtóanyagból.',
        madeOf: 'Hőálló ötvözetek; a felső, legforróbb részt a kerozin hűti, az alsó részt az áramló gáz.',
        how: 'Lemezből alakítják és hegesztik, vagy hűtőcsövekből forrasztják össze. A torok méretét nagyon pontosan kell gyártani.',
        uni: 'Ez a **de Laval-fúvóka**: szubszonikus áramlásban a szűkülő, szuperszonikusban a bővülő keresztmetszet gyorsít; a torokban a Mach-szám 1. A tengerszinti fúvóka tágulási aránya kisebb, hogy a légnyomás ne okozzon áramlásleválást; ezért gyengébb a vákuumban, mint a második lépcső hosszú fúvókája.',
        fact: 'Svéd mérnökről, Gustaf de Lavalról nevezték el, aki gőzturbinákhoz találta ki a 19. század végén – jóval a rakéták előtt.'
      }
    ],
    uni: {
      text: 'A rakéta mozgását a **Ciolkovszkij-egyenlet** írja le: `Δv = v_e · ln(m₀ / m₁)`, ahol `v_e` az effektív kiáramlási sebesség (`v_e = I_sp · g₀`), `m₀` a kezdeti, `m₁` a végső tömeg. A logaritmus miatt a sebességnövelés „drága”: kétszer akkora Δv-hez a tömegarányt **négyzetre** kell emelni. Föld körüli pályához a gravitációs és légköri veszteségekkel együtt kb. **9,3–10 km/s** Δv kell, kerozin–oxigén hajtással (`v_e ≈ 3 km/s`) ez egylépcsős rakétával kb. 20-szoros tömegarányt igényelne, amit a szerkezeti tömeg miatt szinte lehetetlen elérni. A **lépcsőzés** úgy segít, hogy a Δv-k összeadódnak, miközben minden lépcső a saját kiürült szerkezetét dobja le.\n\nA visszatérő első lépcső hajtóanyag-tartalékot igényel a visszafordító (boostback), a légkörbe lépéskori fékező (entry) és a leszálló égetéshez, ami a hasznos terhet nagyjából negyedével-harmadával csökkenti; cserébe a legdrágább rész újrahasznosul. A pályát a repülés közben optimalizálják: a gravitációs fordulóval (gravity turn) a rakéta fokozatosan vízszintes irányba dől, így a gravitációs veszteség (`∫ g·sin γ dt`) és a légköri terhelés (max Q) is kordában tartható.',
      terms: ['fizika-bsc/impulzus', 'fizika-bsc/gravitacio', 'fizika-bsc/idealis-gaz', 'szabalyozas/pid-szabalyozo', 'msc-iranyitas/kalman-szuro', 'mechanika/kihajlas']
    },
    steps: [
      { icon: '❄️', title: '1. Tankolás', text: 'Az indítás előtti kb. 35 percben feltöltik a **kerozintartályokat** és a lehűtött **oxigéntartályokat**. A **héliumos palackok** nyomás alá helyezik a tartályokat. A hideg oxigén miatt a rakéta oldalán dér és pára jelenik meg.', parts: ['lox-tartaly', 'kerozin-tartaly', 'helium', 'masodik-lepcso'] },
      { icon: '🔥', title: '2. Gyújtás és felszállás', text: 'A **turbópumpák** felpörögnek, és a kilenc **hajtómű** begyújt. A vezérlés ellenőrzi, hogy mind rendben működik-e; csak ezután oldják a rögzítőket. A **fúvókákból** kiáramló gáz felfelé löki a kb. 550 tonnás rakétát.', parts: ['turbopumpa', 'hajtomuvek', 'fuvoka'] },
      { icon: '🌪️', title: '3. Max Q', text: 'Kb. egy perc múlva a rakéta átlépi a hangsebességet, és eléri a **legnagyobb aerodinamikai terhelést** (max Q). Ilyenkor kicsit visszafogják a tolóerőt. Az **orrkúp** védi a műholdat.', parts: ['burkolat', 'hajtomuvek'] },
      { icon: '✂️', title: '4. Lépcsőelválás', text: 'Kb. 2,5 perc után a kilenc hajtómű leáll (MECO), a **lépcsőközi gyűrű** zárai oldanak, és a két lépcső szétválik, kb. 60–80 km magasan.', parts: ['lepcsokozi', 'masodik-hajtomu'] },
      { icon: '🛰️', title: '5. Második lépcső és burkolatledobás', text: 'A **második lépcső hajtóműve** begyújt. A légkör fölé érve a **burkolat** két fele leválik, mert már nincs mitől védeni a műholdat. Az **avionika** vezeti a lépcsőt a célpálya felé.', parts: ['masodik-hajtomu', 'masodik-lepcso', 'burkolat', 'avionika'] },
      { icon: '↩️', title: '6. Az első lépcső visszafordul', text: 'Az első lépcső megfordul, és néhány hajtóművet újragyújtva lefékez, illetve visszaindul. A légkörbe lépve kinyílnak a **rácsos kormányfelületek**, és a leszállóhely felé kormányozzák.', parts: ['racsos-kormany', 'hajtomuvek'] },
      { icon: '🦵', title: '7. Leszállás', text: 'Az utolsó égetésnél egyetlen hajtómű fékez, kinyílnak a **leszállólábak**, és a lépcső pontosan célba ér egy uszályon vagy a leszállópályán. Pár hét átvizsgálás után újra repülhet.', parts: ['leszallolabak', 'hajtomuvek', 'fuvoka'] },
      { icon: '🎯', title: '8. Pályára állás', text: 'A második lépcső eléri a kb. 7,8 km/s-os pályasebességet, leáll, majd a **műhold** egy rugós szerkezettel leválik az adapterről. Ezután a műhold kinyitja a napelemtábláit.', parts: ['hasznos-teher', 'avionika'] }
    ],
    history: [
      { year: '1903', text: '**Konsztantyin Ciolkovszkij** orosz tanár felírja a rakétaegyenletet, és megmutatja, hogy folyékony hajtóanyagú, többlépcsős rakétával el lehet jutni a világűrbe.' },
      { year: '1926', text: '**Robert Goddard** az Egyesült Államokban fellövi az első folyékony hajtóanyagú rakétát (benzin és folyékony oxigén). Az út 2,5 másodpercig tart, 12 m magasra jut.' },
      { year: '1942–1944', text: 'Németországban kifejlesztik a **V–2** rakétát. 1944-ben egy függőlegesen indított példány elsőként lépi át a 100 km-es magasságot. A háború után mérnökeit és technikáját az USA és a Szovjetunió is felhasználja.' },
      { year: '1957', text: 'A szovjet **R–7** rakéta pályára állítja a **Szputnyik–1**-et, az első műholdat (október 4.). Az R–7 továbbfejlesztett változatai, a Szojuz-rakéták ma is repülnek.' },
      { year: '1961', text: 'Egy R–7 alapú Vosztok rakéta viszi a világűrbe **Jurij Gagarint** (április 12.).' },
      { year: '1967–1973', text: 'A háromlépcsős **Saturn V** (kb. 110 m) a valaha megépített egyik legerősebb rakéta. Ezzel jutnak el az Apollo-űrhajósok a Holdra (1969–1972).' },
      { year: '1981', text: 'Felszáll az első **űrrepülőgép** (Columbia, április 12.): részben újrafelhasználható rendszer, amely 2011-ig 135 küldetést teljesít.' },
      { year: '2015', text: 'December 21-én a **Falcon 9** első lépcsője egy orbitális indítás után először száll le függőlegesen. Ezzel kezdődik az újrafelhasználható rakéták korszaka.' },
      { year: '2024', text: 'Október 13-án a Starship **Super Heavy** első lépcsőjét maga az indítótorony kapja el a „karjaival” visszatéréskor.' },
      { year: '2026', text: 'Április 1-jén az **SLS** rakéta indítja az **Artemis II** küldetést: négy űrhajós 1972 óta először repül a Hold körül.' }
    ],
    quiz: [
      { q: 'Miért van a rakétának több lépcsője?', options: ['Hogy a kiürült tartályokat és hajtóműveket ledobva könnyebb legyen a maradék', 'Hogy több űrhajós férjen el', 'Hogy könnyebb legyen szállítani', 'Mert egy tartályba nem fér oxigén és kerozin'], answer: 0, explain: 'A lépcsőzés miatt a fölösleges szerkezeti tömeget nem kell végig gyorsítani; a Δv-k összeadódnak.' },
      { q: 'Mi a turbópumpa feladata?', options: ['Nagy nyomással az égéskamrába juttatja a hajtóanyagot', 'Lehűti az oxigént', 'Kinyitja a leszállólábakat', 'Áramot termel a műholdnak'], answer: 0, explain: 'A turbina hajtja a szivattyúkat, amelyek a kerozint és az oxigént az égéskamrába nyomják.' },
      { q: 'Mire valók a rácsos kormányfelületek?', options: ['A visszatérő első lépcső kormányzására a légkörben', 'A burkolat ledobására', 'A műhold napelemeinek kinyitására', 'A hajtóművek hűtésére'], answer: 0, explain: 'Visszatéréskor kinyílnak, és elforgatásukkal irányítják a lépcsőt a leszállóhely felé.' },
      { q: 'Miért hosszabb a második lépcső hajtóművének fúvókája?', options: ['Mert vákuumban a gáz jobban kitágulhat, így több tolóerőt ad', 'Hogy hangosabb legyen', 'Mert több hajtóanyagot fogyaszt', 'Hogy a lépcső szebben nézzen ki'], answer: 0, explain: 'Légüres térben nincs külső nyomás, ezért érdemes a gázt erősebben tágítani; a földön ez áramlásleválást okozna.' },
      { q: 'A Ciolkovszkij-egyenlet szerint mitől függ a rakéta sebességváltozása?', options: ['A kiáramlási sebességtől és a kezdeti/végső tömeg arányától', 'Csak a hajtóművek számától', 'A rakéta színétől és alakjától', 'Csak az indítás helyének földrajzi szélességétől'], answer: 0, explain: 'Δv = v_e · ln(m₀/m₁).' }
    ]
  });
})();
