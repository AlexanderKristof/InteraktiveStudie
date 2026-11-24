/* Modell: nagy kétáramúságú sugárhajtómű (turbofan) – hosszmetszet a tengely mentén.
 * A rajz tükörszimmetrikus: minden alkatrész felső felét rajzoljuk meg (x = hossz, r = sugár),
 * az alsót tükrözéssel kapjuk. Balról áramlik be a levegő, jobbra lép ki.
 * Színkód: hideg levegő világoskék, a forró gáz sárga–narancs–vörös. */
(function () {
  var C = 272;                              // a tengely képernyő-y koordinátája
  var NS = ' pointer-events="none"';
  var shade = STUDIE.draw.shade;
  function Y(r) { return C - r; }
  function pts(a) { return a.map(function (p) { return p[0].toFixed(1) + ',' + Y(p[1]).toFixed(1); }).join(' '); }
  function pg(a, fill, stroke, w, extra) {
    return '<polygon points="' + pts(a) + '" fill="' + fill + '" stroke="' + (stroke || 'rgba(0,0,0,.35)') + '" stroke-width="' + (w == null ? 1 : w) + '" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  function band(x0, x1, r0, r1, fill, stroke, w, extra) { return pg([[x0, r0], [x1, r0], [x1, r1], [x0, r1]], fill, stroke, w, extra); }
  /* tükrözés a tengelyre: a felső fél + ugyanaz fejjel lefelé */
  function mir(s) { return s + '<g transform="translate(0 ' + (2 * C) + ') scale(1 -1)">' + s + '</g>'; }
  function arrow(x1, y1, x2, y2, col, w) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7;
    return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" stroke="' + col + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="round" fill="none"/>' +
      '<path d="M' + (x2 - h * Math.cos(a - 0.45)).toFixed(1) + ' ' + (y2 - h * Math.sin(a - 0.45)).toFixed(1) + ' L' + x2 + ' ' + y2 + ' L' +
      (x2 - h * Math.cos(a + 0.45)).toFixed(1) + ' ' + (y2 - h * Math.sin(a + 0.45)).toFixed(1) + '" stroke="' + col + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  }
  /* Kompresszor- vagy turbinafokozatok: forgó lapát (rotor) és álló terelőlapát (sztátor) párok. */
  function stages(x0, n, pitch, wr, ws, hub, tip, rot, stat, statorFirst) {
    var s = '';
    for (var i = 0; i < n; i++) {
      var xa = x0 + i * pitch, xb = xa + (statorFirst ? ws : wr) + 1.5;
      var rx = statorFirst ? xb : xa, sx = statorFirst ? xa : xb;
      var hr = hub(rx), tr = tip(rx), hs = hub(sx), ts = tip(sx);
      s += pg([[rx, hr], [rx + wr * 0.55, hr], [rx + wr, tr - 1.5], [rx + wr * 0.35, tr - 1.5]], rot, shade(rot, 0.55), 0.8);
      s += pg([[sx, hs + 1.5], [sx + ws * 0.4, hs + 1.5], [sx + ws, ts], [sx + ws * 0.5, ts]], stat, shade(stat, 0.55), 0.8);
    }
    return s;
  }
  function lerp(a, b) { return function (x) { return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); }; }

  var defs = '<defs>' +
    '<linearGradient id="hj-cowl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3dbe4"/><stop offset=".55" stop-color="#aab6c4"/><stop offset="1" stop-color="#7f8c9c"/></linearGradient>' +
    '<linearGradient id="hj-fan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5f7a99"/><stop offset=".45" stop-color="#9db4cc"/><stop offset="1" stop-color="#4c637d"/></linearGradient>' +
    '<radialGradient id="hj-spin" cx="65%" cy="30%" r="80%"><stop offset="0" stop-color="#eef2f6"/><stop offset=".6" stop-color="#aab5c2"/><stop offset="1" stop-color="#6c7886"/></radialGradient>' +
    '<radialGradient id="hj-flame" cx="35%" cy="50%" r="70%"><stop offset="0" stop-color="#fff2a8"/><stop offset=".35" stop-color="#ffc247"/><stop offset=".75" stop-color="#f2702a"/><stop offset="1" stop-color="#c8401c"/></radialGradient>' +
    '<linearGradient id="hj-hpt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6a24e"/><stop offset="1" stop-color="#f3b36b"/></linearGradient>' +
    '<linearGradient id="hj-lpt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f4b978"/><stop offset="1" stop-color="#f6d2a2"/></linearGradient>' +
    '<linearGradient id="hj-hpc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfe4f4"/><stop offset="1" stop-color="#f1dcb8"/></linearGradient>' +
    '<linearGradient id="hj-plug" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b48d6a"/><stop offset=".5" stop-color="#9a8a80"/><stop offset="1" stop-color="#6d6a6a"/></linearGradient>' +
    '<linearGradient id="hj-lp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93acd0"/><stop offset=".5" stop-color="#4f6d9a"/><stop offset="1" stop-color="#2f4466"/></linearGradient>' +
    '</defs>';

  /* ---------- háttér: cím, folyamatsáv, áramlási nyilak ---------- */
  var COLD = '#3f8fd8', HOT = '#e8592a';
  function seg(x0, x1, col, txt) {
    return '<rect x="' + x0 + '" y="52" width="' + (x1 - x0 - 2) + '" height="16" rx="4" fill="' + col + '" stroke="rgba(0,0,0,.25)"/>' +
      '<text x="' + ((x0 + x1 - 2) / 2) + '" y="64" font-size="10.5" font-weight="700" fill="#1c2430" text-anchor="middle">' + txt + '</text>';
  }
  var backdrop = defs +
    '<text class="lbl" x="14" y="22" font-size="16">Kétáramú sugárhajtómű (turbofan) – hosszmetszet</text>' +
    '<text class="lbl-muted" x="14" y="40">balról jön a levegő · a felső és az alsó fél tükörképe egymásnak · a színek a hőmérsékletet jelzik</text>' +
    seg(40, 186, '#a9d2f2', '1. szívás') + seg(186, 360, '#c9dcc0', '2. sűrítés') + seg(360, 416, '#ffc46b', '3. égés') +
    seg(416, 536, '#f6a37a', '4. tágulás') + seg(536, 640, '#d9c2b0', 'kiáramlás') +
    arrow(6, Y(118), 30, Y(118), COLD) + arrow(6, Y(40), 30, Y(40), COLD) + arrow(6, C + 118, 30, C + 118, COLD) + arrow(6, C + 40, 30, C + 40, COLD) +
    arrow(268, Y(118), 330, Y(118), COLD, 2.6) + arrow(268, C + 118, 330, C + 118, COLD, 2.6) +
    arrow(476, Y(104), 540, Y(104), COLD, 2.6) + arrow(476, C + 104, 540, C + 104, COLD, 2.6) +
    arrow(648, Y(30), 712, Y(30), HOT, 3) + arrow(648, C + 30, 712, C + 30, HOT, 3) + arrow(660, C, 730, C, HOT, 3) +
    '<text class="lbl-muted" x="250" y="' + Y(129) + '" font-size="11">hideg (megkerülő) áram</text>' +
    '<text class="lbl-muted" x="250" y="' + (C + 137) + '" font-size="11">≈ 90% a levegőnek</text>' +
    '<text class="lbl-muted" x="660" y="' + Y(44) + '" font-size="11">meleg áram</text>' +
    '<text class="lbl-muted" x="660" y="' + (C + 54) + '" font-size="11">kb. 500 °C</text>' +
    '<text class="lbl-muted" x="546" y="' + Y(120) + '" font-size="11">hideg sugár</text>';

  /* ---------- 1. Gondola: beömlő, ventilátorház, terelőlapátok, magburkolat eleje ---------- */
  var nacelle = pg([[40, 146], [43, 156], [52, 166], [70, 175], [98, 182], [140, 185], [350, 185], [410, 176], [455, 140],
    [455, 134], [390, 143], [230, 148], [110, 148], [75, 144], [50, 141], [42, 142]], 'url(#hj-cowl)', '#4b5563', 1.4);
  nacelle += band(100, 205, 148, 158, '#6b7787', '#465160', 0.8);                       // kevlár/kompozit védőgyűrű
  for (var hx = 106; hx < 200; hx += 8) nacelle += '<path d="M' + hx + ' ' + Y(148.5) + ' L' + (hx + 6) + ' ' + Y(157.5) + '" stroke="rgba(255,255,255,.28)" stroke-width="1"' + NS + '/>';
  nacelle += pg([[177, 71], [183, 78], [205, 83], [250, 86], [450, 86], [450, 70], [186, 70]], 'url(#hj-cowl)', '#4b5563', 1.2);   // osztóél + magburkolat
  nacelle += pg([[212, 86], [222, 86], [236, 148], [225, 148]], '#8796a8', '#3f4a58', 1);                                          // kilépő terelőlapát (OGV)
  nacelle += pg([[40, 146], [43, 156], [52, 166], [47, 150], [42, 142]], '#e3e8ee', '#4b5563', 0.8);                              // beömlőajak (jégtelenített)
  nacelle = mir(nacelle);

  /* ---------- 2. Ventilátor és orrkúp ---------- */
  var fanHalf = band(138, 172, 24, 36, '#55677c', '#2f3e50', 1) +
    pg([[138, 35], [150, 146], [178, 146], [169, 35]], 'url(#hj-fan)', '#2f3e50', 1.3) +
    '<path d="M148 ' + Y(40) + ' Q156 ' + Y(95) + ' 166 ' + Y(143) + '" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.2"' + NS + '/>' +
    pg([[170, 40], [176, 40], [182, 140], [178, 146]], '#43566c', '#2f3e50', 0.8) +
    '<path d="M140 ' + Y(36) + ' Q104 ' + Y(30) + ' 84 ' + C + ' L140 ' + C + ' Z" fill="url(#hj-spin)" stroke="#4c5a6a" stroke-width="1.2"/>';
  var fan = mir(fanHalf) +
    '<path d="M92 ' + (C - 3) + ' C104 ' + (C - 22) + ' 120 ' + (C - 20) + ' 124 ' + (C - 4) + ' S136 ' + (C + 22) + ' 140 ' + (C + 30) + '" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"' + NS + '/>';

  /* ---------- 3. Kisnyomású kompresszor (booster) ---------- */
  var lHub = function () { return 42; }, lTip = lerp([188, 66], [240, 63]);
  var lpc = mir(band(188, 240, 30, 42, '#5f7ea6', '#33496a', 1) +
    pg([[188, 42], [240, 42], [240, 63], [188, 66]], '#cfe6f7', 'none', 0) +
    pg([[188, 66], [240, 63], [240, 70], [188, 70]], '#6d8cb3', '#33496a', 1) +
    stages(190, 3, 17, 7, 5, lHub, lTip, '#7c9cc6', '#9aa6b4'));

  /* ---------- 4. Nagynyomású kompresszor ---------- */
  var hHub = lerp([246, 36], [356, 46]), hTip = lerp([246, 62], [356, 52]);
  var hpcHalf = pg([[246, 20], [356, 20], [356, 46], [246, 36]], '#7d828c', '#454a52', 1) +
    pg([[246, 36], [356, 46], [356, 52], [246, 62]], 'url(#hj-hpc)', 'none', 0) +
    pg([[246, 62], [356, 52], [356, 70], [246, 70]], '#8f949d', '#454a52', 1) +
    stages(248, 9, 12, 5, 4, hHub, hTip, '#b9bfc8', '#8a96a4');
  for (var dx = 252; dx < 356; dx += 12) hpcHalf += '<path d="M' + dx + ' ' + Y(20) + ' L' + dx + ' ' + Y(hHub(dx) - 2) + '" stroke="rgba(0,0,0,.25)" stroke-width="1"' + NS + '/>';
  var hpc = mir(hpcHalf);

  /* ---------- 5. Égőtér ---------- */
  var combHalf = band(360, 414, 66, 70, '#7b6f63', '#463e36', 1) + band(360, 414, 26, 30, '#7b6f63', '#463e36', 1) +
    band(360, 414, 30, 66, '#f1dfc0', 'none', 0) +
    '<path d="M370 ' + Y(50) + ' Q370 ' + Y(62) + ' 381 ' + Y(62) + ' L408 ' + Y(60) + ' L414 ' + Y(58) + ' L414 ' + Y(42) + ' L408 ' + Y(40) + ' L381 ' + Y(36) + ' Q370 ' + Y(37) + ' 370 ' + Y(46) + ' Z" fill="url(#hj-flame)" stroke="#8a6a52" stroke-width="2"/>' +
    '<path d="M366 ' + Y(70) + ' L368 ' + Y(56) + ' L372 ' + Y(50) + '" fill="none" stroke="#5a4a3a" stroke-width="3.4" stroke-linecap="round"/>' +
    '<path d="M366 ' + Y(70) + ' L368 ' + Y(56) + ' L372 ' + Y(50) + '" fill="none" stroke="#d6aa4a" stroke-width="1.8" stroke-linecap="round"/>' +
    '<circle cx="372" cy="' + Y(48) + '" r="2.6" fill="#d6aa4a" stroke="#5a4a3a"/>' +
    '<path d="M394 ' + Y(70) + ' L394 ' + Y(62.5) + '" stroke="#3a3f46" stroke-width="2.6"/>';
  [386, 398].forEach(function (x) { combHalf += '<circle cx="' + x + '" cy="' + Y(61.2) + '" r="1.5" fill="#fff6d0" stroke="#8a6a52" stroke-width=".6"' + NS + '/><circle cx="' + x + '" cy="' + Y(36.6) + '" r="1.5" fill="#fff6d0" stroke="#8a6a52" stroke-width=".6"' + NS + '/>'; });
  var comb = mir(combHalf);

  /* ---------- 6. Nagynyomású turbina ---------- */
  var tHub = function () { return 42; }, tTip = function () { return 58; };
  var hptHalf = band(418, 446, 18, 42, '#6e5f55', '#3d332c', 1) + band(418, 446, 42, 58, 'url(#hj-hpt)', 'none', 0) +
    band(418, 446, 58, 70, '#857463', '#3d332c', 1) +
    stages(418, 2, 14, 6, 5, tHub, tTip, '#d4ab6a', '#b88b6a', true);
  [[426, 46], [426.8, 50], [427.6, 54]].forEach(function (c) { hptHalf += '<circle cx="' + c[0] + '" cy="' + Y(c[1]) + '" r=".9" fill="#fff"' + NS + '/>'; });
  var hpt = mir(hptHalf);

  /* ---------- 7. Kisnyomású turbina ---------- */
  var pHub = lerp([450, 40], [534, 36]), pTip = lerp([450, 58], [534, 66]);
  var lpt = mir(pg([[450, 20], [534, 20], [534, 36], [450, 40]], '#7a6d62', '#3d332c', 1) +
    pg([[450, 40], [534, 36], [534, 66], [450, 58]], 'url(#hj-lpt)', 'none', 0) +
    pg([[450, 58], [534, 66], [534, 70], [450, 70]], '#8d8073', '#3d332c', 1) +
    stages(450, 5, 17, 6, 5, pHub, pTip, '#a99683', '#8d8f94', true));

  /* ---------- 8. Tengelyek: kisnyomású (belső) és nagynyomású (külső, üreges) orsó ---------- */
  var shafts = '<rect x="140" y="' + (C - 5) + '" width="402" height="10" rx="3" fill="url(#hj-lp)" stroke="#24344f" stroke-width="1"/>' +
    mir(band(246, 446, 9, 14, '#c99a3c', '#6d5216', 1) +
      pg([[246, 14], [252, 14], [256, 21], [250, 21]], '#c99a3c', '#6d5216', 0.8) + pg([[440, 14], [446, 14], [442, 19], [436, 19]], '#c99a3c', '#6d5216', 0.8) +
      band(150, 160, 5, 9, '#3a3f46', '#1f2328', 0.6) + band(530, 538, 5, 9, '#3a3f46', '#1f2328', 0.6) + band(250, 258, 14, 17, '#3a3f46', '#1f2328', 0.6));

  /* ---------- 9. Kiáramló fúvóka: a magáram fúvókája és a kiáramlási kúp ---------- */
  var nozzle = mir(pg([[450, 86], [490, 83], [530, 76], [568, 63], [568, 59], [534, 70], [450, 70]], 'url(#hj-cowl)', '#4b5563', 1.2) +
    '<path d="M534 ' + Y(36) + ' Q582 ' + Y(30) + ' 632 ' + C + ' L534 ' + C + ' Z" fill="url(#hj-plug)" stroke="#4a3f38" stroke-width="1.2"/>' +
    pg([[537, 36], [543, 36], [546, 69], [540, 69]], '#8d8f94', '#45484d', 0.8));

  /* ---------- 10. Segédberendezések és FADEC (az alsó gondolában) ---------- */
  var B = C + 150;
  var acc = '<path d="M262 ' + (C + 15) + ' L250 ' + (B + 2) + '" stroke="#5a4a2a" stroke-width="4" stroke-linecap="round"/><path d="M262 ' + (C + 15) + ' L250 ' + (B + 2) + '" stroke="#d6aa4a" stroke-width="2" stroke-linecap="round"/>' +
    '<rect x="188" y="' + (B + 2) + '" width="104" height="15" rx="5" fill="#7d8b69" stroke="#3e4632" stroke-width="1.2"/>' +
    '<rect x="194" y="' + (B + 17) + '" width="18" height="12" rx="3" fill="#a7b18f" stroke="#3e4632"/>' +
    '<rect x="216" y="' + (B + 17) + '" width="30" height="16" rx="5" fill="#6a7a8c" stroke="#33404e"/>' +
    '<rect x="250" y="' + (B + 17) + '" width="14" height="11" rx="3" fill="#c49a52" stroke="#5b4420"/>' +
    '<rect x="268" y="' + (B + 17) + '" width="20" height="13" rx="4" fill="#8f99a6" stroke="#3f4752"/>' +
    '<rect x="302" y="' + (B + 4) + '" width="44" height="24" rx="3" fill="#2f6b57" stroke="#173a2e" stroke-width="1.2"/>';
  for (var fy = 0; fy < 4; fy++) acc += '<rect x="304" y="' + (B + 7 + fy * 5) + '" width="6" height="2.5" fill="#6fae96"' + NS + '/>';
  acc += '<text x="327" y="' + (B + 19.5) + '" font-size="8.5" font-weight="700" fill="#e6f4ee" text-anchor="middle"' + NS + '>FADEC</text>' +
    '<path d="M346 ' + (B + 10) + ' C360 ' + (B + 10) + ' 362 ' + (B - 12) + ' 380 ' + (B - 14) + '" fill="none" stroke="#2f6b57" stroke-width="1.6" stroke-dasharray="3 2"/>';

  /* ---------- 11. Tolóerő-fordító (rácsos kivitel, csúszó burkolattal) ---------- */
  var revHalf = band(342, 418, 151, 181, '#53647a', '#27313f', 1.2);
  for (var sx = 346; sx < 414; sx += 6) revHalf += '<path d="M' + sx + ' ' + Y(153) + ' Q' + (sx + 2) + ' ' + Y(166) + ' ' + (sx + 6) + ' ' + Y(179) + '" fill="none" stroke="#b9c7d8" stroke-width="1.4"' + NS + '/>';
  revHalf += band(352, 410, 144.5, 148.5, '#3b4656', '#1f2731', 0.8) +
    '<circle cx="353" cy="' + Y(146.5) + '" r="2" fill="#c9d2dc" stroke="#1f2731" stroke-width=".6"' + NS + '/>';
  var rev = mir(revHalf);

  STUDIE.addModel({
    id: 'hajtomu',
    title: 'Sugárhajtómű (turbofan)',
    icon: '✈️',
    color: '#596275',
    category: 'Járművek',
    keywords: 'sugárhajtómű gázturbina turbofan kétáramú hajtómű ventilátor fan kompresszor booster égőtér turbina tengely orsó kettős orsó fúvóka tolóerő tolóerő-fordító FADEC segédberendezés gondola beömlő megkerülő áram bypass arány Brayton-körfolyamat Joule-körfolyamat egykristály turbinalapát hűtőfurat hőszigetelő bevonat kerozin repülőgép Whittle von Ohain Jendrassik Cs-1 turbólégcsavaros Me 262 Comet Boeing 747 geared turbofan',
    summary: 'Egy repülőgép-hajtómű másodpercenként egy tonnányi levegőt gyorsít hátrafelé, és a „visszarúgás” tolja előre a gépet.',
    scale: 'kb. 3–5 m hosszú, ventilátorátmérő 1,5–3,4 m, tömege 2–9 t',
    viewBox: '0 0 800 510',
    backdrop: backdrop,
    intro: 'A sugárhajtómű egy **gázturbina**: levegőt szív be, összenyomja, üzemanyagot éget el benne, majd a forró gáz egy **turbinát** pörget, ez hajtja meg elöl a kompresszort és a nagy **ventilátort**. A gép előre haladását a hátrafelé kilökött levegő **ellenereje** adja (Newton III. törvénye), ugyanúgy, ahogy egy elengedett lufi is elrepül.\n\nA mai utasszállítókon **kétáramú (turbofan)** hajtóművek vannak: a ventilátor által beszívott levegő kb. **90%-a** megkerüli a forró magot, és „hidegen” fúj hátra. Ez a **megkerülő (hideg) áram** adja a tolóerő nagyobbik részét, és ettől halkabb és takarékosabb a hajtómű.',
    parts: [
      {
        id: 'gondola', z: 1, name: 'Gondola és beömlő', svg: nacelle, explode: [44, 0], badge: [128, Y(170)], en: 'nacelle, air inlet, fan case and outlet guide vanes',
        what: 'A hajtómű áramvonalas „burkolata”. Elöl a lekerekített **beömlőajak** egyenletesen, örvénymentesen vezeti a levegőt a ventilátorhoz, akár oldalszélben is. Belül van a **ventilátorház**, mögötte a **kilépő terelőlapátok** (OGV), amelyek kiegyenesítik a ventilátor által megpörgetett levegőt. A középső, a magot takaró burkolat **osztóéle** választja szét a hideg és a meleg áramot.',
        madeOf: 'Az ajak **alumínium** (télen a kompresszorból elvett forró levegővel jégtelenítik), a burkolatlapok **szénszálas kompozit** szendvicsszerkezetek. A ventilátorházat **kevlár** vagy szénszálas **védőgyűrű** veszi körbe: ha egy lapát letörne, ez fogja meg. A belső falakat **hangelnyelő** méhsejtpanelek borítják.',
        how: 'A kompozit lapokat szénszálas szövetből rétegezik, majd **autoklávban** (nagy nyomású kemencében) kikeményítik. A hangelnyelő panelek apró lyukakkal perforált fedőlapja mögött méhsejt-üregek vannak, amelyek egy-egy zajfrekvenciára „hangolt” rezonátorként nyelik el a ventilátor zúgását. A gondolát a szárny alatti **pilonra** szerelik, a burkolatok szervizeléskor felnyithatók, mint egy kagylóhéj.',
        uni: 'A beömlő **szubszonikus diffúzor**: utazómagasságon (M ≈ 0,8) a levegőt a ventilátor elé kb. M ≈ 0,5–0,6-ra lassítja, közben a sztatikus nyomás nő (**torlónyomás-visszanyerés**, `p₂/p₀,t ≈ 0,99`). A kilépő terelőlapátok a ventilátor után maradó **perdületet** (kerületi sebességkomponenst) alakítják vissza nyomássá, így a hideg sugár tengelyirányban, veszteség nélkül lép ki. A hangelnyelő bélés **Helmholtz-rezonátorok** rácsa: `f = (c/2π)·√(A/(V·l))`, ahol A a nyílás keresztmetszete, V az üreg térfogata, l a nyak effektív hossza.',
        fact: 'A legnagyobb hajtómű (GE9X) ventilátorának átmérője kb. 3,4 m: majdnem akkora, mint egy Boeing 737 törzsének szélessége (kb. 3,8 m).'
      },
      {
        id: 'ventilator', z: 6, name: 'Ventilátor (fan) és orrkúp', svg: fan, explode: [-56, 0], badge: [158, Y(108)], lesson: 'fizika/newton', en: 'fan (wide-chord fan blades) and spinner',
        terms: ['fizika-bsc/impulzus', 'mechanika/feszultseg'],
        what: 'A hajtómű elején forgó, 16–24 széles, csavart lapátból álló **óriás légcsavar**. Ez szívja be a levegőt, és kb. 1,5-szörös nyomásra hajtja. A levegő nagyobbik része innen **egyenesen hátrafelé** fúj a megkerülő csatornában: egy modern hajtómű tolóerejének **kb. 75–80%-át** a ventilátor adja. Az orrkúpon látható fehér **spirál** jelzi a földi személyzetnek, hogy forog-e a ventilátor.',
        madeOf: 'Régebben tömör, ma inkább **üreges titán** lapátok (belül merevítő bordákkal), vagy **szénszálas kompozit** lapátok titán élvédővel (GE90, GEnx, GE9X, LEAP). A lapátok egy **titán tárcsába** csúsznak fecskefarkas hornyokkal. Az orrkúp kompozit vagy alumínium.',
        how: 'A Rolls-Royce-féle üreges titánlapátnál három titánlemezt **diffúziós hegesztéssel** egyesítenek, majd forró gázzal **felfújják** és csavarják, így belül merevítő bordás üreg keletkezik (szuperképlékeny alakítás). A kompozit lapátot több száz réteg szénszálas prepregből rakják össze robotokkal, majd sajtóban kikeményítik. Minden lapátot lemérnek, és a tárcsán úgy osztják el őket, hogy a kerék **tökéletesen kiegyensúlyozott** legyen.',
        uni: 'A ventilátor nyomásviszonya `π_fan ≈ 1,4–1,6`; a lapátcsúcs kerületi sebessége kb. 400–450 m/s, a relatív áramlás a csúcsnál **szuperszonikus** (innen a felszálláskori „fűrészes” hang). A tolóerő az **impulzustételből**: `F = ṁ_h·(v_h − v₀) + ṁ_m·(v_m − v₀)`, ahol h a hideg, m a meleg áram. A lapátokban a centrifugális feszültség `σ ≈ ρ·ω²·(R²−r²)/2` nagyságrendű: a lapát tövében a húzóerő egy ventilátorlapátnál több tíz tonna, ezért a fecskefarkas rögzítés kritikus. Tanúsításkor **lapátkiszakadási próbát** végeznek: egy lapátot teljes fordulaton robbanótöltettel leszakítanak, és a háznak meg kell tartania.',
        fact: 'Felszálláskor egy nagy ventilátor másodpercenként kb. **1–1,4 tonna** levegőt szív be: ennyi levegő van nagyjából egy tornaterem negyedében.'
      },
      {
        id: 'kisnyomasu-kompresszor', z: 5, name: 'Kisnyomású kompresszor (booster)', svg: lpc, explode: [-26, 0], badge: [214, Y(54)], link: 'benzinmotor', en: 'low-pressure compressor (booster)',
        terms: ['fizika-bsc/idealis-gaz', 'fizika-bsc/elso-fotetel'],
        what: 'A ventilátor mögötti, kisebb átmérőjű kompresszor, amely csak a **mag felé** (a meleg áramba) jutó levegőt sűríti tovább, kb. 1,5–3-szorosára. Ugyanarra a **kisnyomású tengelyre** ül, mint a ventilátor, ezért azzal együtt, lassabban forog. A rajzon a sötétebb lapátok **forognak** (rotor), a világosabb szürkék **állnak** (sztátor).',
        madeOf: '**Titán** vagy alumínium lapátok, egy közös dobra (forgórész) erősítve; a terelőlapátok a házhoz vannak rögzítve. Egy fokozat = egy forgó lapátsor + egy álló terelőlapát-sor.',
        how: 'A lapátokat kovácsolják és marják, majd a dob hornyaiba illesztik. Egyes gyártók egy darabból mart **„blisk”**-et (lapátos tárcsát) használnak: a lapátok és a tárcsa egyetlen fémdarab, ami könnyebb és kevesebb a rés. A booster és a mag között **leeresztőszelepek** vannak, amelyek alacsony fordulaton levegőt engednek ki, hogy a kompresszor ne „fulladjon be”.',
        uni: 'Az axiális kompresszor fokozatonként csak kis nyomásviszonyt (1,1–1,4) tud, mert a lapátok közti diffúzorszerű áramlásban a határréteg leválik, ha túl nagy a nyomásnövekedés (**átesés**, „stall”). Egy fokozat munkája az **Euler-turbinaegyenletből**: `w = u·Δc_u` (u a kerületi sebesség, Δc_u a perdület változása). A **jelleggörbe** (nyomásviszony–tömegáram) bal határa a **pompázs-határ** (surge line): ezen túl az áramlás periodikusan visszafordul, ami durranásszerű, veszélyes jelenség.',
        fact: 'A benzinmotor egyszerre csak egy hengernyi levegőt sűrít (ütemesen), a sugárhajtómű kompresszora viszont **folyamatosan** áramló levegőt. Hasonlítsd össze a benzinmotorral!'
      },
      {
        id: 'nagynyomasu-kompresszor', z: 5, name: 'Nagynyomású kompresszor', svg: hpc, explode: [4, 0], badge: [302, Y(49)], en: 'high-pressure compressor (HPC)',
        terms: ['fizika-bsc/idealis-gaz', 'fizika-bsc/carnot-korfolyamat'],
        what: 'A mag sok fokozatú „szivattyúja”: 9–11 egymás mögötti lapátsorral a levegőt a beszívottnak **40–60-szoros** nyomására sűríti. Közben a levegő **600–700 °C-ra** forrósodik, pusztán az összenyomástól. Hátrafelé a csatorna egyre **szűkül**, mert a sűrűbb levegő kisebb helyen fér el.',
        madeOf: 'Elöl **titánötvözet**, a hátsó, forró fokozatokban **nikkelalapú szuperötvözet** lapátok és tárcsák. Az első néhány terelőlapát-sor **állítható szögű**, hogy alacsony fordulaton se essen át az áramlás.',
        how: 'A tárcsákat por- vagy tuskókovácsolással készítik, majd ultrahanggal és örvényárammal vizsgálják, nincs-e bennük hiba. A lapátokat precíziós kovácsolás után ötengelyes CNC-vel marják, a csúcsuk és a ház közti rés csak néhány tized milliméter. Ma sokszor **bliskeket** gyártanak, és a tárcsákat elektronsugaras vagy dörzshegesztéssel egy dobbá egyesítik.',
        uni: 'Ideális (izentrópikus) sűrítésnél `T₂/T₁ = (p₂/p₁)^((κ−1)/κ)`: π = 40 esetén, κ = 1,4-gyel ≈ 2,87, azaz 288 K-ről kb. 830 K-re, a valóságban (η_is ≈ 0,9) még melegebbre. A nagyobb **össznyomásviszony** (OPR) a Brayton-körfolyamat termikus hatásfokát növeli: `η_th = 1 − 1/π^((κ−1)/κ)`. Az OPR határát a kompresszor kilépő hőmérséklete szabja meg, mert e fölött a tárcsák anyaga nem bírja.',
        fact: 'A GE9X nagynyomású kompresszora 11 fokozattal 27-szeresére sűríti a levegőt, a teljes hajtómű össznyomásviszonya kb. 60.'
      },
      {
        id: 'egoter', z: 5, name: 'Égőtér', svg: comb, explode: [26, 0], badge: [392, Y(49)], lesson: 'fizika/energia-munka', en: 'annular combustor (combustion chamber) with fuel nozzles',
        terms: ['kemia-bsc/entalpia', 'fizika-bsc/elso-fotetel'],
        what: 'Itt ég el a **kerozin** a sűrített levegőben, **folyamatosan**, mint egy fáklya (nem ütemesen, mint a benzinmotorban). Gyűrű alakú (annuláris) kamra, körben kb. 20 **üzemanyag-porlasztóval**. A láng közepe **2000 °C** fölötti, de a falon lévő lyukakon beáramló hidegebb levegő lehűti és összekeveri a gázt, mielőtt a turbinához ér. Indításkor egy **gyújtógyertya** szikrája gyújtja be.',
        madeOf: 'A lángcső **nikkel- vagy kobaltalapú szuperötvözet** lemezből vagy csempékből készül, belül **kerámia hőszigetelő bevonattal**. Az üzemanyag-porlasztók rozsdamentes acélból készülnek, apró örvénykeltő (swirler) csatornákkal.',
        how: 'A lángcső falában ezernyi apró **effúziós hűtőfuratot** fúrnak lézerrel: ezeken a hideg levegő hártyaként (filmként) végigfolyik a belső falon, és megvédi a lángtól. Az új porlasztókat gyakran **3D-nyomtatással** (fémporos lézeres olvasztással) gyártják, mert így a bonyolult belső csatornák egy darabban elkészíthetők.',
        uni: 'Termodinamikailag a 2→3 állapotváltozás közel **izobár hőközlés**: `q = c_p·(T₃ − T₂)`, a hőt a kerozin fűtőértéke adja (`H_u ≈ 43 MJ/kg`). Az égés szegény keverékkel megy: a teljes levegő-üzemanyag arány kb. 40–60 (sztöchiometrikus ≈ 14,7), mert csak így tartható a turbinabelépő hőmérséklet. A fő tervezési szempont a **károsanyag-kibocsátás**: a NOx a hőmérséklettel exponenciálisan nő (Zeldovics-mechanizmus), ezért terjednek a **szegény, előkeveréses** (lean burn, pl. TAPS) és a **gazdag–gyors hűtés–szegény** (RQL) égőterek. Az égéskamra nyomásvesztesége 3–5%.',
        fact: 'Utazómagasságon egy nagy kétmotoros gép óránként kb. 5–7 tonna kerozint éget el, ami utaskilométerenként nagyjából egy kisautó fogyasztásával egyenlő.'
      },
      {
        id: 'nagynyomasu-turbina', z: 5, name: 'Nagynyomású turbina', svg: hpt, explode: [46, 0], badge: [432, Y(50)], link: 'benzinmotor', en: 'high-pressure turbine (HPT) with single-crystal blades',
        terms: ['fizika-bsc/entropia', 'mechanika/folyashatar'],
        what: 'Az égőtérből kiáramló, kb. **1500–1700 °C**-os gáz itt pörgeti meg az 1–2 sor turbinalapátot. A turbina a **nagynyomású tengelyen** keresztül hajtja a nagynyomású kompresszort. Ez a hajtómű **legforróbb és legjobban igénybe vett** része: a gáz melegebb, mint amit a lapátok fémje olvadás nélkül elviselne!',
        madeOf: '**Egykristály nikkelalapú szuperötvözet** lapátok (pl. CMSX-4, réniummal), belül kígyózó **hűtőcsatornákkal**, a felületen apró **hűtőfuratokkal** (a rajzon fehér pöttyök), kívül **kerámia hőszigetelő bevonattal** (ittriummal stabilizált cirkónium-dioxid). A tárcsa porkohászati nikkelötvözet.',
        how: 'A lapátokat **viaszmintás precíziós öntéssel** készítik: a viaszmodell köré kerámiahéjat öntenek, a viaszt kiolvasztják, és vákuumban folyékony fémet öntenek a helyére. A formát lassan húzzák ki a kemencéből (Bridgman-eljárás), és egy spirál alakú **kristályválasztó** csak egyetlen kristályt enged továbbnőni: így az egész lapát **egyetlen kristály**, nincsenek benne szemcsehatárok. Ezután lézerrel vagy szikraforgácsolással száznál több hűtőfuratot fúrnak bele, végül plazmaszórással vagy elektronsugaras gőzfázisú leválasztással felviszik a kerámiabevonatot.',
        uni: 'A turbinában a gáz **adiabatikusan tágul**: a fajlagos munka `w_t = c_p·(T₄ − T₅)`, és ennek pontosan fedeznie kell a kompresszor munkáját (`w_t·η_m = w_k`). A lapátanyag határa a **kúszás** (creep): magas hőmérsékleten tartós terhelés alatt a fém lassan megnyúlik. A szemcsehatárok mentén indul meg leginkább, ezért az egykristály lapát (γ/γ′ mikroszerkezettel) sokkal tovább bírja. A hűtés hatékonyságát a `φ = (T_gáz − T_fal)/(T_gáz − T_hűtő)` hűtési tényezővel jellemzik (0,6–0,7); a kerámiabevonat még 100–200 °C-ot „levesz” a fém hőmérsékletéből.',
        fact: 'A Rolls-Royce szerint egyetlen nagynyomású turbinalapát nagyjából annyi teljesítményt vesz fel a gázból, mint egy Forma–1-es autó motorja, miközben percenként kb. 10 000-et fordul.'
      },
      {
        id: 'kisnyomasu-turbina', z: 5, name: 'Kisnyomású turbina', svg: lpt, explode: [70, 0], badge: [492, Y(51)], en: 'low-pressure turbine (LPT)',
        terms: ['fizika-bsc/impulzusmomentum', 'fizika-bsc/entropia'],
        what: 'A nagynyomású turbina után a még mindig forró (kb. 900 °C-os) gáz itt adja le energiája nagy részét 4–7 fokozaton át. A kisnyomású turbina a **belső, hosszú tengelyen** keresztül a **ventilátort** és a boostert hajtja. A gáz közben tágul, ezért a csatorna hátrafelé **bővül**, a lapátok egyre hosszabbak.',
        madeOf: 'Nikkelalapú ötvözet lapátok; a hátsó fokozatokban egyre többször **titán-alumínid** (TiAl), amely feleakkora sűrűségű, mint a nikkelötvözet. A lapátokat nem kell belülről hűteni, mert a gáz itt már hűvösebb.',
        how: 'A lapátokat precíziós öntéssel vagy (TiAl esetén) **elektronsugaras 3D-nyomtatással** gyártják. A lapátcsúcsokon **koszorú** (shroud) köti össze őket, amely csökkenti a rezgést és a csúcson átszökő gázt. Hosszú, karcsú lapátok, ezért a rezonanciájukat gondosan elhangolják a fordulatszámtól.',
        uni: 'A probléma: a nagy ventilátornak **lassan** kell forognia (különben a csúcsa túl gyorsan haladna), a turbina viszont **gyorsan** forogva hatékony (`w = u·Δc_u`, kis u-nál sok fokozat kell). Ez a kompromisszum adja a sok kisnyomású turbinafokozatot. A **hajtóműves (geared) turbofanban** egy bolygóműves fogaskerékhajtás kb. 3:1 áttétellel választja el a ventilátort a turbinától, így a turbina gyorsabban foroghat, és 3 fokozat elég neki.',
        fact: 'A ventilátort hajtó kisnyomású turbina tengelyteljesítménye egy nagy hajtóműben felszálláskor kb. 60–80 MW: ennyi egy kisebb erőmű teljesítménye.'
      },
      {
        id: 'tengelyek', z: 3, name: 'Tengelyek (kettős orsó)', svg: shafts, explode: [0, 0], badge: [380, C], en: 'twin-spool shafts: LP (inner) and HP (outer) spools with bearings',
        terms: ['mechanika/csavaras', 'mechanika/rezonancia', 'mechanika/tehetetlensegi-nyomatek'],
        what: 'Két, egymásba dugott tengely. A **belső, hosszú** (kék) a **kisnyomású orsó**: a kisnyomású turbina ezzel hajtja a ventilátort és a boostert. A **külső, rövid és üreges** (arany) a **nagynyomású orsó**: a nagynyomású turbina ezzel hajtja a nagynyomású kompresszort. A két orsó **egymástól függetlenül**, eltérő fordulaton forog, így mindkettő a saját ideális sebességén dolgozhat.',
        madeOf: 'Nagy szilárdságú **acél**- vagy nikkelötvözet csövek. A tengelyeket **golyós és görgős csapágyak** tartják, amelyeket olajköd ken és hűt; a csapágyakat **labirinttömítések** választják el a forró gáztól.',
        how: 'A hosszú, karcsú kisnyomású tengelyt kovácsolják, esztergálják, majd nagyon pontosan **kiegyensúlyozzák**. Az orsókat úgy tervezik, hogy kritikus fordulatszámuk (amikor saját rezgésükkel rezonálnának) ne essen az üzemi tartományba. Indításkor egy légindító turbina a segédhajtóművön keresztül a **nagynyomású orsót** pörgeti fel.',
        uni: 'A tengelyek a turbina által leadott teljesítményt viszik előre: `P = M·ω`, így a nagy teljesítményhez kis ω-nál nagy **csavarónyomaték** tartozik; a csőtengely csavarófeszültsége `τ = M·r/I_p`. Tipikus fordulatszámok nagy turbofanoknál: kisnyomású orsó 2500–3500 1/min, nagynyomású 9000–15 000 1/min. Egyes hajtóműveknek (Rolls-Royce Trent) **három orsója** van: a ventilátort, a közép- és a nagynyomású kompresszort három külön tengely hajtja.',
        fact: 'A két orsó általában **ellentétes irányban** is foroghat (ellenforgású), így a pörgettyűhatásuk részben kioltja egymást.'
      },
      {
        id: 'fuvoka', z: 4, name: 'Kiáramló fúvóka (hideg és meleg áram)', svg: nozzle, explode: [124, 0], badge: [592, C - 14], en: 'exhaust nozzles (core nozzle and exhaust plug; bypass nozzle)',
        terms: ['fizika-bsc/impulzus', 'fizika-bsc/munkatetel'],
        what: 'A hajtómű hátsó vége. A **meleg (mag)áram** a középső burkolat és a **kiáramlási kúp** közötti gyűrűs fúvókán lép ki, kb. 400–500 m/s-mal. A **hideg (megkerülő) áram** a külső gondola kilépő éle és a magburkolat között fúj ki, lassabban (kb. 250–300 m/s). A fúvókák szűkülő formája **felgyorsítja** a gázt: a tolóerő a kilépő és a belépő sebesség különbségéből adódik.',
        madeOf: 'A forró részek **titán-** és **nikkelötvözetből**, újabban **kerámiamátrixú kompozitból** (CMC) készülnek. A kiáramlási kúp gyakran hangelnyelő perforált lemez. Egyes gépeken a kilépő élen fogazott **„chevronok”** keverik a sugarat a külső levegővel, így halkabb.',
        how: 'A lemezeket hidegen alakítják, majd hegesztik és hőkezelik. A hátsó turbinakeret radiális merevítő lapátjai (a rajzon a kúp előtti szürke borda) tartják a hátsó csapágyat és kiegyenesítik a turbinából kilépő perdületes gázt. A chevronok formáját számítógépes áramlástani szimulációval és zajméréssel tervezik.',
        uni: 'A teljes tolóerő: `F = ṁ_h·(v_h − v₀) + ṁ_m·(v_m − v₀) + (p_ki − p₀)·A_ki` (az utolsó tag csak alulexpandált, „fojtott” fúvókánál számít). A **propulzív hatásfok** `η_p = 2/(1 + v_ki/v₀)`: minél közelebb van a kilépő sebesség a repülési sebességhez, annál kevesebb mozgási energia „vész el” a sugárban. Ezért jobb **sok levegőt kicsit** gyorsítani, mint keveset nagyon: ez a nagy kétáramúság lényege. A sugárzaj a kilépő sebesség kb. **8. hatványával** nő (Lighthill-törvény), ezért a lassabb sugár sokkal halkabb.',
        fact: 'A régi egyáramú sugárhajtóművek (pl. a Boeing 707 első motorjai) 600 m/s fölötti sugara olyan hangos volt, hogy repülőterek mellett ma már nem lehetne velük felszállni.'
      },
      {
        id: 'fadec', z: 2, name: 'Segédberendezések és FADEC', svg: acc, explode: [0, 44], badge: [240, C + 170], link: 'processzor', en: 'accessory gearbox and FADEC (full authority digital engine control)',
        terms: ['e-mobilitas/hatasfok'],
        what: 'A gondola alján, a ventilátorház alatt ül a **segédhajtómű-ház** (gearbox): egy ferde **toronytengely** (a rajzon arany) viszi le hozzá a forgást a nagynyomású orsóról. Ez hajtja az **üzemanyag-szivattyút**, az **olajszivattyút**, a **generátort** (áram a repülőgépnek), a hidraulikaszivattyút és az **indítót**. Mellette a zöld doboz a **FADEC**, a hajtómű „agya”: egy számítógép, amely a pilóta gázkarállása alapján másodpercenként sokszor kiszámolja, mennyi üzemanyag kell.',
        madeOf: 'A hajtóműház **alumínium**- vagy magnéziumöntvény fogaskerekekkel. A FADEC két teljesen független **számítógép-csatornából** áll (ha az egyik meghibásodik, a másik veszi át), rezgés- és hőálló dobozban, sok érzékelővel összekötve: hőmérséklet-, nyomás- és fordulatszám-érzékelők.',
        how: 'A fogaskerekeket edzett acélból marják és köszörülik. A FADEC elektronikáját a repüléstechnikai szabványok szerint tervezik és tesztelik (rázás, hő, villámcsapás), a szoftverét a legszigorúbb, DO-178 „A” szint szerint ellenőrzik. A dobozt gyakran maga az **üzemanyag hűti**.',
        uni: 'A FADEC zárt hurkú szabályzó: a beavatkozó jel az **üzemanyag-tömegáram** (adagolószelep), az állítható kompresszor-terelőlapátok szöge és a leeresztőszelepek; a szabályozott jellemző a tolóerővel arányos **ventilátorfordulat (N1)** vagy **hajtómű-nyomásviszony (EPR)**. Korlátozó hurkok védik a hajtóművet: maximális turbinahőmérséklet (EGT), maximális fordulat, pompázs-határtól való távolság. Ezek közül mindig a legszigorúbb érvényesül (min–max választó logika). A FADEC az állapotfelügyeleti adatokat a földre is elküldi (rezgés, hőmérséklet-trendek), így a karbantartást előre lehet tervezni.',
        fact: 'A FADEC miatt a pilóta nem tudja „túlhajtani” a hajtóművet: akárhogy tolja előre a gázkart, a számítógép nem enged a biztonságos határ fölé menni.'
      },
      {
        id: 'tolerofordito', z: 2, name: 'Tolóerő-fordító', svg: rev, explode: [150, 0], badge: [380, Y(166)], en: 'cascade thrust reverser (translating sleeve, blocker doors)',
        terms: ['fizika-bsc/impulzus'],
        what: 'Leszálláskor a fékezést segíti. A gondola hátsó része (**csúszó burkolat**) hátracsúszik, a megkerülő csatornába **elzáró ajtók** (a rajzon a csatorna falán fekvő sötét lapok) fordulnak be, és a hideg áramot kifelé–előre terelik a szabaddá vált **terelőrácsokon** (a ferde lécek) át. Így a levegő **előrefelé** fúj, és fékezi a gépet.',
        madeOf: 'A terelőrácsok **kompozit** vagy alumínium öntvények ívelt lapátkákkal, a csúszó burkolat szénszálas kompozit. Mozgatásukat **hidraulikus** vagy újabban **elektromos** munkahengerek végzik, többszörös reteszeléssel.',
        how: 'A rácsokat egy darabban öntik vagy kompozitból sajtolják, az ívelt lécek pontos szögben terelik ki a levegőt. A reteszelésre különösen ügyelnek: repülés közben véletlenül nem nyílhat ki, ezért több, egymástól független zár és érzékelő tartja. A rendszert minden leszállásnál használják, ezért sok ezer ciklusra méretezik.',
        uni: 'A fordított tolóerő az impulzustételből: ha a kiáramló levegő sebességének iránya θ szöget zár be a repülés irányával, a hasznos (fékező) erő `F ≈ ṁ_h·(v·cos θ + v₀)`. A gyakorlatban a kifúvás csak részben fordul előre (θ ≈ 45° az előre mutató irányhoz), így a fordított tolóerő a normál tolóerő kb. 20–40%-a. Kis sebességnél (kb. 60 csomó alatt) kikapcsolják, mert a forró gáz és a felvert por visszajutna a beömlőbe.',
        fact: 'A tolóerő-fordító főleg csúszós, nedves vagy jeges pályán fontos, ahol a kerékfékek kevésbé hatékonyak.'
      }
    ],
    uni: {
      text: 'A gázturbina a **Brayton- (Joule-) körfolyamat** szerint dolgozik: 1→2 izentrópikus sűrítés (beömlő, ventilátor, kompresszorok), 2→3 izobár hőközlés (égőtér), 3→4 izentrópikus tágulás (turbinák, fúvóka), 4→1 izobár hőleadás (a környezetben). Ideális esetben a termikus hatásfok csak a nyomásviszonytól függ:\n\n`η_th = 1 − 1/π^((κ−1)/κ)`\n\nπ = 40 és κ = 1,4 mellett ez ≈ 65%; a valóságban a veszteségek miatt kb. 50–55%. A repülőgép-hajtóműnél azonban nem tengelymunka, hanem **tolóerő** kell, ezért a teljes hatásfok két tényező szorzata: `η_ö = η_th · η_p`, ahol a propulzív hatásfok `η_p = 2/(1 + v_ki/v₀)`. A tolóerő az impulzustételből `F = ṁ·(v_ki − v₀)`: ugyanakkora tolóerőt adhat sok levegő kis gyorsítása vagy kevés levegő nagy gyorsítása, de a sugárban elvesző mozgási energia `½·ṁ·(v_ki − v₀)²` az utóbbinál sokkal nagyobb. Ezért nőtt a **kétáramúsági arány** (BPR = ṁ_hideg/ṁ_meleg) az 1960-as évek 0,3-ától a mai 10–12-ig. A korlátot a ventilátor átmérője (földtől való távolság, tömeg, gondola légellenállása) és a lassan forgó ventilátor–gyors turbina ellentmondása szabja meg: erre válasz a **hajtóműves turbofan** és a jövőben a burkolat nélküli **nyitott rotor**. A fajlagos üzemanyag-fogyasztás (TSFC) utazáskor ma kb. 14–15 g/(kN·s).',
      terms: ['fizika-bsc/impulzus', 'fizika-bsc/carnot-korfolyamat', 'fizika-bsc/idealis-gaz', 'fizika-bsc/entropia', 'fizika-bsc/elso-fotetel', 'e-mobilitas/hatasfok']
    },
    steps: [
      { icon: '🌬️', title: '1. Szívás: a ventilátor beszívja a levegőt', text: 'A **beömlő** egyenletesen vezeti a levegőt a **ventilátorhoz**. A ventilátor megnöveli a nyomását, és a levegőt két részre osztja: kb. 90% a **megkerülő csatornába** megy (hideg áram), kb. 10% a **magba** (meleg áram).', parts: ['gondola', 'ventilator'] },
      { icon: '🗜️', title: '2. Sűrítés: 40–60-szoros nyomás', text: 'A magba jutó levegőt a **kisnyomású** (booster), majd a **nagynyomású kompresszor** lapátsorai fokozatonként összenyomják. A nyomás a beszívottnak 40–60-szorosa lesz, a levegő 600 °C fölé melegszik, pusztán a sűrítéstől. (Pont ezért melegszik a pumpa is, ha kerékpárt pumpálsz.)', parts: ['kisnyomasu-kompresszor', 'nagynyomasu-kompresszor'] },
      { icon: '🔥', title: '3. Égés: folyamatos láng', text: 'Az **égőtérben** a porlasztók kerozint fecskendeznek a sűrített levegőbe, és az folyamatosan ég. A gáz **1500–1700 °C**-ra hevül és kitágulna, de a nyomás közel állandó marad: a gáz nagy sebességgel áramlik tovább hátrafelé.', parts: ['egoter'] },
      { icon: '🌀', title: '4. Tágulás: a turbinák hajtják a gépet', text: 'A forró gáz először a **nagynyomású turbinát** pörgeti meg (ez hajtja a nagynyomású kompresszort), majd a **kisnyomású turbinát** (ez hajtja a ventilátort). A két turbinát a **két, egymásba dugott tengely** köti össze a „saját” kompresszorával. A gáz közben lehűl és tágul.', parts: ['nagynyomasu-turbina', 'kisnyomasu-turbina', 'tengelyek'] },
      { icon: '🚀', title: '5. Tolóerő: F = ṁ·(v_ki − v_be)', text: 'A **fúvókákból** a hideg és a meleg áram is gyorsabban lép ki, mint ahogy a levegő belépett. Ha másodpercenként `ṁ` tömegű levegőt `v_be`-ről `v_ki`-re gyorsítunk, a hajtóműre `F = ṁ·(v_ki − v_be)` erő hat előre (Newton III. törvénye). Példa: 1000 kg/s levegőt 70 m/s-mal gyorsítva 70 000 N, azaz kb. **7 tonna súlyának megfelelő** tolóerő keletkezik.', parts: ['fuvoka', 'ventilator'] },
      { icon: '⚖️', title: '6. A kétáramúsági arány: sok levegőt kicsit', text: 'A **bypass arány** a hideg és a meleg áram tömegének aránya. Ugyanaz a tolóerő elérhető kevés levegő nagy gyorsításával (régi, hangos, „fogyasztó” sugárhajtóművek) vagy **sok levegő kis gyorsításával**. Az utóbbi takarékosabb és halkabb, mert kevesebb energia megy el a sugár „felesleges” mozgási energiájára. A mai hajtóművek bypass aránya **9–12**, ezért ilyen nagy a ventilátoruk.', parts: ['ventilator', 'gondola', 'fuvoka'] },
      { icon: '💎', title: '7. Gyártás: egykristály turbinalapát', text: 'A nagynyomású turbinalapátot viaszmintás **precíziós öntéssel** készítik, vákuumban. A kerámiaformát lassan húzzák ki a kemencéből, és egy spirális **kristályválasztó** csak egyetlen kristálynak enged utat: a kész lapát egyetlen fémkristály, szemcsehatárok nélkül, ezért magas hőmérsékleten sem „folyik meg” (nem kúszik).', parts: ['nagynyomasu-turbina'] },
      { icon: '❄️', title: '8. Gyártás: hűtőfuratok és hőszigetelő bevonat', text: 'A lapát belsejében kígyózó csatornákon a kompresszorból elvett, „csak” 600–700 °C-os levegő áramlik, és a felület **több száz lézerrel fúrt furatán** kilépve hűtő légpárnát (filmet) képez. Végül egy vékony **kerámia hőszigetelő bevonatot** visznek fel rá. Így a fém 1000–1100 °C körül marad, pedig a gáz több mint 1500 °C-os.', parts: ['nagynyomasu-turbina', 'egoter'] },
      { icon: '🛬', title: '9. Leszállás és vezérlés', text: 'Minden üzemállapotot a **FADEC** számítógép felügyel: a gázkar állásából kiszámolja az üzemanyag-mennyiséget, és figyel a hőmérsékleti és fordulatszám-határokra. Leszálláskor a **tolóerő-fordító** előrefelé tereli a hideg áramot, és segít lefékezni a gépet.', parts: ['fadec', 'tolerofordito'] }
    ],
    history: [
      { year: '1930–1937', text: '**Frank Whittle** brit pilóta 1930-ban szabadalmaztatja a gázturbinás sugárhajtást; első kísérleti hajtóműve 1937 áprilisában jár először a próbapadon.' },
      { year: '1939', text: '**Hans von Ohain** HeS 3 hajtóművével augusztus 27-én felszáll a **Heinkel He 178**, a világ első sugárhajtású repülőgépe. Whittle hajtóművével 1941-ben repül a brit Gloster E.28/39.' },
      { year: '1940', text: '**Jendrassik György** magyar gépészmérnök a budapesti **Ganz** gyárban megépíti a **Cs-1**-et, a világ első működő **turbólégcsavaros** (légcsavart hajtó gázturbinás) hajtóművét. Próbapadi futásai bizonyították az elvet, de a háború miatt sorozatgyártásba nem került.' },
      { year: '1944', text: 'Hadrendbe áll a **Messerschmitt Me 262**, az első bevetett sugárhajtású vadászgép, két **Jumo 004** axiálkompresszoros hajtóművel. A hajtóművek élettartama a hőálló anyagok hiánya miatt csak néhány tíz óra volt.' },
      { year: '1952', text: 'Menetrendszerű szolgálatba áll a **de Havilland Comet**, az első sugárhajtású utasszállító. Megkezdődik a „jet-korszak”: a repülési idő a felére csökken.' },
      { year: '1958–1960', text: 'A **Boeing 707** sikere elterjeszti a sugárhajtású utazást. A **Rolls-Royce Conway** az első sorozatgyártott **kétáramú** (turbofan) hajtómű, még kis (0,3 körüli) bypass aránnyal.' },
      { year: '1970', text: 'A **Boeing 747** „Jumbo” a Pratt & Whitney JT9D-vel, majd a **General Electric CF6**-tal megnyitja a **nagy kétáramúságú** (bypass arány ≈ 5) hajtóművek korát: sokkal halkabbak és takarékosabbak.' },
      { year: '2016–ma', text: 'Szolgálatba áll a **hajtóműves turbofan** (Pratt & Whitney PW1000G, bypass arány ≈ 12), amelyben egy bolygómű lassítja a ventilátort. A legnagyobb hajtómű a **GE9X** (Boeing 777X), 3,4 m-es ventilátorral. A kutatás a nyitott rotoros, hibrid-elektromos és hidrogénes hajtás felé halad.' }
    ],
    quiz: [
      { q: 'Mi hajtja meg a turbofan hajtómű ventilátorát?', options: ['A kisnyomású turbina a belső tengelyen át', 'Egy villanymotor', 'A beáramló menetszél', 'A nagynyomású kompresszor'], answer: 0, explain: 'A forró gáz a kisnyomású turbinát pörgeti, az a belső, hosszú tengellyel hajtja előre a ventilátort.' },
      { q: 'Egy modern turbofanban a levegő nagy része hová jut?', options: ['A megkerülő csatornába, és hidegen fúj hátra', 'Az égőtérbe', 'A turbinákra', 'Az utastérbe'], answer: 0, explain: 'A bypass arány ma 9–12, azaz a levegő kb. 90%-a megkerüli a magot, és ez adja a tolóerő nagyobbik részét.' },
      { q: 'Miért takarékosabb a nagy kétáramúságú hajtómű?', options: ['Mert sok levegőt kicsit gyorsít, így kevesebb energia vész el a sugárban', 'Mert kisebb a ventilátora', 'Mert nincs benne égőtér', 'Mert gyorsabb a kiáramló gáz'], answer: 0, explain: 'A tolóerő ṁ·Δv, a sugárban elvesző energia ½·ṁ·Δv². Nagy ṁ és kis Δv mellett ugyanaz a tolóerő kevesebb energiából jön ki.' },
      { q: 'Miért készítik egykristályból a nagynyomású turbinalapátokat?', options: ['Mert szemcsehatárok nélkül magas hőmérsékleten sokkal kevésbé kúszik (nyúlik meg)', 'Mert olcsóbb', 'Mert átlátszó', 'Mert könnyebb kiegyensúlyozni'], answer: 0, explain: 'A kúszás főleg a szemcsehatárok mentén indul. Az egykristály lapát hűtőfuratokkal és kerámiabevonattal 1500 °C feletti gázban is kibírja.' },
      { q: 'Ki építette meg 1940-ben a világ első működő turbólégcsavaros hajtóművét?', options: ['Jendrassik György', 'Frank Whittle', 'Bánki Donát', 'Hans von Ohain'], answer: 0, explain: 'Jendrassik György Cs-1 hajtóműve a budapesti Ganz gyárban készült, és 1940-ben járt a próbapadon.' }
    ]
  });
})();
