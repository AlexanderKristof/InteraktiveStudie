/* Tudásműhely – 🔐 Szabadulószoba.
 * Négy rajzolt szoba, mindegyikben 6 egymásra épülő, tananyagra épülő rejtvény (számzár, betűzár),
 * hátizsák kombinálható tárgyakkal, 3 szintű tippek, időmérő, csillagok, mentett legjobb idő.
 * Az iskolai / egyetemi szint (S.level) ugyanazokban a szobákban más (nehezebb) feladatokat ad.
 * Útvonalak: #/szabadulo (szobaválasztó) · #/szabadulo/<szoba>
 * Az adatok a node-os teszthez is elérhetők: STUDIE.szabadulo.rooms */
(function () {
  'use strict';
  var S = window.STUDIE;
  var AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  /* ---------- közös segédadatok ---------- */
  var ELEM = [['H', 'hidrogén', 1], ['He', 'hélium', 2], ['Li', 'lítium', 3], ['C', 'szén', 6], ['N', 'nitrogén', 7], ['O', 'oxigén', 8],
    ['F', 'fluor', 9], ['Ne', 'neon', 10], ['Na', 'nátrium', 11], ['Mg', 'magnézium', 12], ['Al', 'alumínium', 13], ['Si', 'szilícium', 14],
    ['P', 'foszfor', 15], ['S', 'kén', 16], ['Cl', 'klór', 17], ['K', 'kálium', 19], ['Ca', 'kalcium', 20], ['Fe', 'vas', 26],
    ['Cu', 'réz', 29], ['Zn', 'cink', 30], ['Br', 'bróm', 35], ['Ag', 'ezüst', 47], ['Au', 'arany', 79], ['Pb', 'ólom', 82]];
  var COLORS = [['fekete', '#111'], ['barna', '#7a4a1e'], ['piros', '#d62828'], ['narancs', '#f77f00'], ['sárga', '#f6c90e'],
    ['zöld', '#2a9d3f'], ['kék', '#1f5fd1'], ['ibolya', '#7b3fb5'], ['szürke', '#888'], ['fehér', '#f4f4f4']];
  function colorHex(n) { for (var i = 0; i < COLORS.length; i++) if (COLORS[i][0] === n) return COLORS[i][1]; return n === 'arany' ? '#c9a227' : '#999'; }

  function elemTable() {
    return '<div class="sz-pt">' + ELEM.map(function (e) {
      return '<span class="sz-el"><small>' + e[2] + '</small><b>' + e[0] + '</b><i>' + e[1] + '</i></span>'; }).join('') + '</div>';
  }
  function colorTable() {
    return '<table class="sz-cc"><tr><th>Szín</th><th>Számjegy</th><th>Szorzó (3. csík)</th></tr>' + COLORS.map(function (c, i) {
      return '<tr><td><span class="sz-sw" style="background:' + c[1] + '"></span>' + c[0] + '</td><td>' + i + '</td><td>×' + Math.pow(10, i).toLocaleString('hu-HU') + '</td></tr>'; }).join('') +
      '<tr><td><span class="sz-sw" style="background:#c9a227"></span>arany (4. csík)</td><td>–</td><td>tűrés ±5%</td></tr></table>';
  }
  function resistorSvg(bands) {
    var x = 52;
    return '<svg class="sz-res" viewBox="0 0 220 60" role="img" aria-label="Ellenállás: ' + bands.join(', ') + '"><line x1="0" y1="30" x2="220" y2="30" stroke="#999" stroke-width="4"/>' +
      '<rect x="40" y="12" width="140" height="36" rx="16" fill="#e8d2a6" stroke="#b39463"/>' +
      bands.map(function (b, i) { var r = '<rect x="' + (x + i * 26 + (i === 3 ? 20 : 0)) + '" y="12" width="13" height="36" fill="' + colorHex(b) + '"/>'; return r; }).join('') + '</svg>';
  }
  function coordSvg(points) {
    var R = 4, u = 30, o = 140, s = '<svg class="sz-coord" viewBox="0 0 280 280" role="img" aria-label="Koordináta-rendszer bójákkal">';
    s += '<rect width="280" height="280" rx="10" fill="#d8eefc"/>';
    for (var k = -R; k <= R; k++) {
      s += '<line x1="' + (o + k * u) + '" y1="20" x2="' + (o + k * u) + '" y2="260" stroke="#9cc3e0" stroke-width="1"/>';
      s += '<line x1="20" y1="' + (o + k * u) + '" x2="260" y2="' + (o + k * u) + '" stroke="#9cc3e0" stroke-width="1"/>';
      if (k) s += '<text x="' + (o + k * u) + '" y="' + (o + 14) + '" font-size="10" text-anchor="middle" fill="#345">' + k + '</text><text x="' + (o - 6) + '" y="' + (o - k * u + 4) + '" font-size="10" text-anchor="end" fill="#345">' + k + '</text>';
    }
    s += '<line x1="14" y1="' + o + '" x2="268" y2="' + o + '" stroke="#234" stroke-width="2"/><line x1="' + o + '" y1="266" x2="' + o + '" y2="12" stroke="#234" stroke-width="2"/>';
    s += '<text x="266" y="' + (o - 6) + '" font-size="12" fill="#234">x</text><text x="' + (o + 6) + '" y="16" font-size="12" fill="#234">y</text>';
    points.forEach(function (p) {
      var cx = o + p[0] * u, cy = o - p[1] * u;
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="7" fill="#f26b1d" stroke="#fff" stroke-width="2"/><rect x="' + (cx + 6) + '" y="' + (cy - 21) + '" width="22" height="15" rx="4" fill="#fff" stroke="#f26b1d"/><text x="' + (cx + 17) + '" y="' + (cy - 10) + '" font-size="11" font-weight="700" text-anchor="middle" fill="#a3400c">' + p[2] + '</text>';
    });
    return s + '</svg>';
  }
  var BUOYS = [[-3, 2, '58'], [2, -3, '31'], [3, 2, '74'], [-2, 3, '26'], [2, 3, '63'], [-3, -2, '45']];

  /* ---------- SVG-rajz segéd ---------- */
  function obj(id, x, y, w, h, inner) {
    return '<g class="sz-obj" data-obj="' + id + '" tabindex="0" role="button">' + inner +
      '<rect class="sz-hit" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10"/>' +
      '<g class="sz-badge" transform="translate(' + (x + w - 6) + ',' + (y + 6) + ')"><circle r="13"/><text y="5" text-anchor="middle">✓</text></g></g>';
  }
  function books(x, y, w, h, seed) {
    var s = '', cx = x, pal = ['#8e3b46', '#2f5d8a', '#3f7d4e', '#b5842b', '#5b3f7a', '#a4502a', '#25606b'], i = seed || 0;
    while (cx < x + w - 8) { var bw = 9 + (i * 7) % 9, bh = h - (i * 13) % 14; if (cx + bw > x + w) break; s += '<rect x="' + cx + '" y="' + (y + h - bh) + '" width="' + bw + '" height="' + bh + '" fill="' + pal[i % pal.length] + '" stroke="rgba(0,0,0,.25)"/>'; cx += bw + 1; i++; }
    return s;
  }

  /* ================== SZOBÁK ================== */
  var ROOMS = [
    /* ---------------- 1. A bezárt laboratórium ---------------- */
    { id: 'labor', icon: '🧪', title: 'A bezárt laboratórium', tags: 'fizika · kémia · matek', par: { iskolai: 600, egyetem: 900 },
      teaser: 'Áramszünet után bezárult a biztonsági ajtó. Ohm-törvény, színkód, sűrűség, pH…',
      story: { i: 'Kvark professzor laborjában nézelődsz, amikor hirtelen elmegy az áram – és a biztonsági ajtó magától bezárul. A táblán a professzor kézírása: <b>»Aki érti a tudományt, kijut. Minden nyom itt van a szobában.«</b> A professzor ebéd után szundít egyet… nyisd ki az ajtót, mielőtt felébred!',
        e: 'Kvark professzor kutatólaborjában dolgozol, amikor áramkimaradás miatt a biztonsági rendszer zárlatba kapcsol. A táblán az üzenet: <b>»A rendszer csak annak enged ki, aki minden ellenőrző kérdést hibátlanul megold.«</b> Indítsd újra az áramköröket, azonosítsd a mintákat, és jusson ki!' },
      outro: 'Szisszenve kinyílik az ajtó. Kvark professzor épp ekkor ér vissza ásítozva: »Gratulálok! Ilyen gyorsan még az asszisztensem sem jutott ki.«',
      scene: function () {
        var s = '<rect width="800" height="380" fill="#dbe6f0"/><rect y="380" width="800" height="100" fill="#9fb0c2"/><line x1="0" y1="380" x2="800" y2="380" stroke="#7d8fa3" stroke-width="4"/>';
        for (var i = 0; i < 800; i += 80) s += '<line x1="' + i + '" y1="380" x2="' + (i - 40) + '" y2="480" stroke="#8c9db0"/>';
        s += '<circle cx="520" cy="22" r="10" fill="#c9d2dc" data-until="l2"/><circle cx="520" cy="22" r="12" fill="#ffe680" data-after="l2"/><path d="M490 6 h60" stroke="#788" stroke-width="3"/>';
        s += obj('tabla', 30, 28, 210, 146, '<rect x="30" y="28" width="210" height="146" rx="6" fill="#8a9bb0"/><rect x="38" y="36" width="194" height="130" fill="#fdfdfd"/>' +
          '<text x="50" y="66" font-size="20" font-family="Georgia,serif" fill="#1d3557">U = R · I</text>' +
          '<g>' + COLORS.map(function (c, k) { return '<rect x="' + (50 + k * 17) + '" y="84" width="14" height="22" fill="' + c[1] + '" stroke="#999"/>'; }).join('') + '</g>' +
          '<path d="M50 130 q20 -12 40 0 t40 0 t40 0" stroke="#c1121f" fill="none" stroke-width="2"/><text x="50" y="156" font-size="12" fill="#555">Kvark prof.</text>');
        s += obj('poszter', 262, 32, 132, 112, '<rect x="262" y="32" width="132" height="112" fill="#fff" stroke="#9aa"/><text x="328" y="48" font-size="10" text-anchor="middle" fill="#333">Periódusos rendszer</text>' +
          (function () { var g = '', pal = ['#ffb4a2', '#ffd6a5', '#caffbf', '#9bf6ff', '#bdb2ff', '#fdffb6']; for (var r = 0; r < 5; r++) for (var c = 0; c < 9; c++) { if (r === 0 && c > 0 && c < 8) continue; if (r < 3 && c > 1 && c < 7 && r > 0) continue; g += '<rect x="' + (270 + c * 13) + '" y="' + (56 + r * 16) + '" width="11" height="13" fill="' + pal[(r + c) % 6] + '" stroke="#888" stroke-width=".5"/>'; } return g; })());
        s += obj('polc', 420, 40, 200, 160, '<rect x="420" y="110" width="200" height="8" fill="#8b6a4a"/><rect x="420" y="190" width="200" height="8" fill="#8b6a4a"/>' +
          '<rect x="432" y="72" width="26" height="38" rx="4" fill="#7fc8f8" opacity=".85"/><rect x="430" y="66" width="30" height="8" fill="#555"/><rect x="470" y="80" width="22" height="30" rx="4" fill="#90e39a"/><rect x="468" y="74" width="26" height="7" fill="#555"/>' +
          '<rect x="505" y="60" width="30" height="50" rx="5" fill="#f4a261" opacity=".85"/><rect x="503" y="54" width="34" height="8" fill="#555"/><rect x="560" y="150" width="40" height="40" fill="#8d99ae" stroke="#5c677d" stroke-width="2"/><path d="M560 150 l10 -10 h40 l-10 10 z M600 150 l10 -10 v40 l-10 10z" fill="#adb5bd" stroke="#5c677d"/>' +
          '<rect x="440" y="160" width="90" height="30" fill="#fff" stroke="#aaa"/><text x="485" y="179" font-size="11" text-anchor="middle" fill="#333">ρ = m / V</text>' +
          '<rect x="418" y="38" width="206" height="164" fill="#123" opacity=".55" data-until="l2"/>');
        s += '<rect x="40" y="278" width="430" height="14" fill="#8b6a4a"/><rect x="50" y="292" width="12" height="88" fill="#6d5238"/><rect x="290" y="292" width="10" height="88" fill="#6d5238"/>';
        s += obj('panel', 60, 186, 140, 92, '<rect x="64" y="190" width="132" height="78" rx="6" fill="#2b2d42"/><rect x="72" y="198" width="116" height="56" rx="3" fill="#111" data-until="l2"/><rect x="72" y="198" width="116" height="56" rx="3" fill="#06331a" data-after="l2"/>' +
          '<text x="130" y="232" font-size="12" text-anchor="middle" fill="#3ddc84" data-after="l2">ONLINE</text><text x="130" y="232" font-size="11" text-anchor="middle" fill="#666" data-until="l2">NINCS ÁRAM</text><rect x="118" y="268" width="24" height="10" fill="#444"/><circle cx="182" cy="262" r="3" fill="#e63946"/>');
        s += obj('kemcso', 212, 200, 104, 78, '<rect x="216" y="244" width="96" height="10" fill="#6c757d"/><rect x="216" y="270" width="96" height="6" fill="#6c757d"/>' +
          ['#ffd6e0', '#f1f1f1', '#e9f5db', '#f1f1f1'].map(function (c, k) { var x = 228 + k * 22; return '<rect x="' + x + '" y="210" width="12" height="56" rx="6" fill="' + c + '" stroke="#889"/><text x="' + (x + 6) + '" y="237" font-size="10" text-anchor="middle" fill="#333">' + 'ABCD'[k] + '</text>'; }).join(''));
        s += obj('fiok', 312, 292, 150, 84, '<rect x="314" y="292" width="146" height="86" fill="#a3825f" stroke="#6d5238"/><rect x="326" y="304" width="122" height="30" rx="3" fill="#b89470" stroke="#6d5238"/><rect x="370" y="314" width="34" height="10" rx="3" fill="#6d5238"/>' +
          '<rect x="326" y="342" width="122" height="28" rx="3" fill="#b89470" stroke="#6d5238"/><rect x="420" y="348" width="22" height="16" rx="3" fill="#ddd" stroke="#555"/><text x="431" y="360" font-size="9" text-anchor="middle" fill="#333">00</text>');
        s += obj('szef', 492, 252, 130, 128, '<rect x="496" y="256" width="122" height="122" rx="6" fill="#6c757d" stroke="#343a40" stroke-width="3"/><rect x="508" y="268" width="98" height="98" rx="4" fill="#868e96"/>' +
          '<circle cx="557" cy="317" r="26" fill="#adb5bd" stroke="#343a40" stroke-width="3"/><line x1="557" y1="317" x2="557" y2="296" stroke="#343a40" stroke-width="3"/><rect x="590" y="300" width="10" height="34" rx="3" fill="#343a40"/>');
        s += obj('ajto', 648, 54, 132, 326, '<rect x="666" y="54" width="96" height="22" rx="4" fill="#2a9d3f"/><text x="714" y="70" font-size="13" font-weight="700" text-anchor="middle" fill="#fff">KIJÁRAT</text>' +
          '<rect x="652" y="84" width="124" height="296" fill="#ced4da" stroke="#6c757d" stroke-width="4"/><rect x="672" y="104" width="60" height="70" fill="#a9d6e5" stroke="#6c757d" stroke-width="3"/><rect x="744" y="220" width="22" height="34" rx="3" fill="#343a40"/><circle cx="755" cy="230" r="3" fill="#e63946"/><rect x="740" y="268" width="26" height="8" rx="4" fill="#6c757d"/>');
        return s;
      },
      objects: [
        { id: 'tabla', name: 'Tábla', icon: '📋', info: { i: '<p>A táblán Kvark professzor jegyzetei:</p><p class="sz-formula">U = R · I &nbsp;(feszültség = ellenállás · áramerősség)</p><p><b>Ellenállás-színkód:</b> az első két csík két számjegy, a harmadik megmondja, hány nullát kell utánuk írni.</p>' + colorTable(),
          e: '<p>A táblán Kvark professzor jegyzetei:</p><p class="sz-formula">U = R · I &nbsp;·&nbsp; P = U · I = U²/R &nbsp;·&nbsp; τ = R · C</p><p><b>Ellenállás-színkód</b> (4 csíkos): két számjegy, szorzó (10<sup>n</sup>), tűrés.</p>' + colorTable() } },
        { id: 'poszter', name: 'Periódusos rendszer', icon: '🧫', info: { i: '<p>Egy kifakult poszter. A legfontosabb elemek <b>rendszámmal</b> (a rendszám = a protonok száma):</p>', e: '<p>Periódusos rendszer (részlet) – rendszám, vegyjel, név:</p>' }, extra: elemTable },
        { id: 'fiok', name: 'Fiók', icon: '🗄️' }, { id: 'panel', name: 'Vezérlőpult', icon: '🖥️' }, { id: 'polc', name: 'Polc', icon: '🧴' },
        { id: 'szef', name: 'Széf', icon: '🔒' }, { id: 'kemcso', name: 'Kémcsőtartó', icon: '🧪' }, { id: 'ajto', name: 'Biztonsági ajtó', icon: '🚪' }
      ],
      items: {
        ellenallas: { icon: '〰️', name: 'Ellenállás', desc: { i: 'Egy kis alkatrész színes csíkokkal: <b>sárga – ibolya – piros</b>.', e: 'Csíkjai: <b>sárga – ibolya – piros – arany</b>.' }, pic: function (lv) { return resistorSvg(lv === 'egyetem' ? ['sárga', 'ibolya', 'piros', 'arany'] : ['sárga', 'ibolya', 'piros']); } },
        kondenzator: { icon: '🔋', name: 'Kondenzátor', desc: { i: 'Kis henger, a felirata: <b>100 µF</b>. A drótjai pont illenének valamihez…', e: 'Elektrolitkondenzátor, felirata: <b>100 µF, 25 V</b>.' } },
        rctag: { icon: '🔌', name: 'RC-tag', desc: 'Az ellenállás és a kondenzátor összeforrasztva – bedugható csatlakozóval. Hová lehetne bedugni?' },
        kocka: { icon: '🧊', name: 'Fémkocka', desc: { i: 'Nehéz <b>vaskocka</b>. Az alján karcolás: »Széf → periódusos rendszer!«', e: '<b>Aranykocka</b> (ρ ≈ 19,3 g/cm³). Az alján: »Széf → periódusos rendszer!«' } },
        indikator: { icon: '📜', name: 'Indikátorpapír', desc: 'Univerzális indikátorpapír: savban piros, semleges oldatban zöld, lúgban kék–lila lesz.' },
        kartya: { icon: '💳', name: 'Belépőkártya', desc: 'Kvark professzor belépőkártyája. »Csak vészhelyzetben!«' }
      },
      combos: [{ a: 'ellenallas', b: 'kondenzator', make: 'rctag', msg: 'Összeforrasztod a két alkatrészt: kész egy RC-tag!' }],
      steps: [
        { id: 'l1', obj: 'fiok', give: ['ellenallas', 'kondenzator'], msg: 'Kattan a zár! A fiókban egy ellenállás és egy kondenzátor lapul.',
          v: {
            i: { lock: 'num', answer: '24', data: { kind: 'ohm', U: 6, I: 0.25 },
              clue: 'A fiók számzára mellett egy cetli: <b>»Az elemlámpa izzóján 6 V feszültség esik, és 0,25 A erősségű áram folyik át rajta. A kód: az izzó ellenállása ohmban.«</b>',
              hints: ['Ohm törvénye a táblán van: U = R · I.', 'Az ellenállást így kapod: R = U : I.', '6 : 0,25 ugyanaz, mint 6 · 4.'],
              explain: 'R = U : I = 6 V : 0,25 A = 24 Ω.' },
            e: { lock: 'num', answer: '575', data: { kind: 'power-r', U: 230, P: 92 },
              clue: 'Cetli a zár mellett: <b>»Egy 230 V-os hálózatra kapcsolt fűtőszál teljesítménye 92 W. A kód: a fűtőszál ellenállása ohmban.«</b>',
              hints: ['P = U · I és U = R · I – ebből a kettőből kifejezhető R.', 'R = U² / P.', '230² = 52 900 – ezt oszd el 92-vel.'],
              explain: 'P = U²/R, így R = U²/P = 52 900 V² / 92 W = 575 Ω.' } } },
        { id: 'l2', obj: 'panel', need: ['rctag'], locked: 'A vezérlőpult sötét. Az alján egy üres foglalat: <i>»RC-tag helye«</i>. Talán a hátizsákodban lévő alkatrészekből össze tudsz rakni egyet?',
          msg: 'Bzzz… visszajött az áram! A polc fölött kigyullad a lámpa.',
          v: {
            i: { lock: 'num', answer: '4700', data: { kind: 'colorcode', bands: ['sárga', 'ibolya', 'piros'] },
              clue: 'Bedugod az RC-tagot. A kijelző: <b>»ÁRAMKÖR-ELLENŐRZÉS: írd be az ellenállás értékét ohmban!«</b> A csíkok jelentését a táblán találod (és a hátizsákban megnézheted az ellenállást).',
              hints: ['Nézd meg a hátizsákban az ellenállást: sárga – ibolya – piros.', 'Az első két csík két számjegy (sárga = 4, ibolya = 7), a harmadik a szorzó: ennyi nullát írj utána (piros = 2).', '47 után két nulla…'],
              explain: 'sárga (4), ibolya (7), piros (×100) → 47 · 100 = 4700 Ω = 4,7 kΩ.' },
            e: { lock: 'num', answer: '470', data: { kind: 'rc', bands: ['sárga', 'ibolya', 'piros'], C: 100 },
              clue: 'Bedugod az RC-tagot. A kijelző: <b>»IDŐZÍTŐ-KALIBRÁLÁS: add meg a beépített RC-tag időállandóját (τ) milliszekundumban!«</b> (Az alkatrészek adatai a hátizsákban, a színkód a táblán.)',
              hints: ['Az időállandó τ = R · C.', 'R a színkódból: sárga–ibolya–piros = 4,7 kΩ; C = 100 µF = 10⁻⁴ F.', '4700 Ω · 0,0001 F = 0,47 s – ezt váltsd ms-ba.'],
              explain: 'τ = R·C = 4700 Ω · 100·10⁻⁶ F = 0,47 s = 470 ms. Ennyi idő alatt töltődik fel a kondenzátor kb. 63%-ra.' } } },
        { id: 'l3', obj: 'polc', after: 'l2', give: ['kocka'], locked: 'Túl sötét van, nem látod, mi van a polcon. Előbb vissza kellene hozni az áramot…',
          msg: 'A ládika kinyílik. Leveszed a fémkockát – meglepően nehéz!',
          v: {
            i: { lock: 'abc', answer: 'VAS', data: { kind: 'density', m: 790, V: 100, table: { 'ALUMINIUM': 2.7, 'VAS': 7.9, 'REZ': 8.9, 'OLOM': 11.3, 'ARANY': 19.3 } },
              clue: 'A polcon egy fémkocka és egy betűzáras ládika. A kocka tömege <b>790 g</b>, térfogata <b>100 cm³</b>. A ládika a fém nevét kéri (ékezet nélkül).<br>Sűrűségtáblázat: alumínium 2,7 · vas 7,9 · réz 8,9 · ólom 11,3 · arany 19,3 g/cm³',
              hints: ['Sűrűség = tömeg : térfogat.', '790 g : 100 cm³ = 7,9 g/cm³.', 'Keresd meg a táblázatban a 7,9 g/cm³-t!'],
              explain: 'ρ = m / V = 790 g / 100 cm³ = 7,9 g/cm³ → ez a vas.' },
            e: { lock: 'abc', answer: 'ARANY', data: { kind: 'density-cube', a: 2, m: 154.4, table: { 'ALUMINIUM': 2.7, 'TITAN': 4.51, 'VAS': 7.87, 'REZ': 8.96, 'OLOM': 11.34, 'ARANY': 19.32 } },
              clue: 'Egy kocka alakú fémminta: élhossza <b>2 cm</b>, tömege <b>154,4 g</b>. A ládika betűzára a fém nevét kéri (ékezet nélkül).<br>Sűrűségek (g/cm³): alumínium 2,70 · titán 4,51 · vas 7,87 · réz 8,96 · ólom 11,34 · arany 19,32',
              hints: ['Először a térfogat: V = a³.', 'V = 8 cm³, így ρ = 154,4 g / 8 cm³.', 'ρ ≈ 19,3 g/cm³ – melyik fém ez?'],
              explain: 'V = (2 cm)³ = 8 cm³, ρ = 154,4 g / 8 cm³ = 19,3 g/cm³ → arany.' } } },
        { id: 'l4', obj: 'szef', need: ['kocka'], give: ['indikator'], locked: 'Egy nehéz széf. A számzár mellett kocka alakú mélyedés – mintha valamit bele kellene tenni.',
          msg: 'A széf ajtaja kitárul. Benne egy doboz indikátorpapír.',
          v: {
            i: { lock: 'num', answer: '2608', data: { kind: 'elements', syms: ['Fe', 'O'], pad: 2 },
              clue: 'Beteszed a vaskockát a mélyedésbe, és kigyullad a kijelző: <b>»KÓD = a kocka fémének rendszáma, utána az oxigén rendszáma két számjeggyel (pl. 5 → 05).«</b>',
              hints: ['A vas vegyjele Fe. Keresd meg a periódusos rendszer poszterén!', 'A vas rendszáma 26, az oxigéné 8.', 'A 8 két számjeggyel: 08.'],
              explain: 'Fe (vas) = 26, O (oxigén) = 8 → 26 08.' },
            e: { lock: 'num', answer: '791117', data: { kind: 'elements', syms: ['Au', 'Na', 'Cl'] },
              clue: 'Beteszed a kockát a mélyedésbe: <b>»KÓD = a kocka fémének rendszáma, majd a konyhasót alkotó két elem rendszáma (először a fémé).«</b>',
              hints: ['A konyhasó: nátrium-klorid, NaCl.', 'Az arany (Au) rendszáma 79. A Na és a Cl rendszámát a poszteren találod.', 'Na = 11, Cl = 17 – írd egymás után.'],
              explain: 'Au = 79, Na = 11, Cl = 17 → 79 11 17.' } } },
        { id: 'l5', obj: 'kemcso', need: ['indikator'], give: ['kartya'], locked: 'Négy kémcső A, B, C, D betűvel. Színtelen folyadékok – valamivel meg kellene vizsgálni őket.',
          msg: 'A kémcsőtartó alján kinyílik egy rekesz: benne a professzor belépőkártyája!',
          v: {
            i: { lock: 'abc', alpha: 'ABCD', answer: 'BCAD', data: { kind: 'ph-order', tubes: { A: 10, B: 2, C: 7, D: 13 } },
              clue: 'Belemártod az indikátorpapírt: <b>A</b> – sötétkék (szappanos víz), <b>B</b> – piros (citromlé), <b>C</b> – zöld (desztillált víz), <b>D</b> – lila (lefolyótisztító). A tartó zárja: <b>a betűk a legsavasabbtól a leglúgosabbig</b>.',
              hints: ['Savas: kicsi pH (piros), semleges: pH 7 (zöld), lúgos: nagy pH (kék, lila).', 'A citromlé savas, a desztillált víz semleges.', 'Színsorrend: piros → zöld → kék → lila.'],
              explain: 'citromlé (pH ≈ 2) → desztillált víz (pH 7) → szappanos víz (pH ≈ 10) → lefolyótisztító (pH ≈ 13): B, C, A, D.' },
            e: { lock: 'num', answer: '2114', data: { kind: 'ph', list: [['sav', 0.01], ['bazis', 0.001], ['sav', 0.0001]] },
              clue: 'A kémcsövek címkéje (25 °C): <b>A</b> – 0,01 mol/dm³ HCl, <b>B</b> – 0,001 mol/dm³ NaOH, <b>C</b> – 0,0001 mol/dm³ HCl. A zár kódja: <b>a három pH-érték egymás után (A, B, C)</b>.',
              hints: ['Erős savnál pH = −lg[H⁺]; erős bázisnál pOH = −lg[OH⁻] és pH = 14 − pOH.', 'A: −lg 0,01 = 2; C: −lg 0,0001 = 4.', 'B: pOH = 3, tehát pH = 11.'],
              explain: 'A: pH = 2 · B: pOH = 3 → pH = 11 · C: pH = 4 → 2 11 4.' } } },
        { id: 'l6', obj: 'ajto', need: ['kartya'], final: true, locked: 'A biztonsági ajtó zárva. A kártyaolvasó pirosan villog – kellene egy belépőkártya.',
          msg: 'Szisszenve kinyílik az ajtó – szabad vagy!',
          v: {
            i: { lock: 'num', answer: '25', data: { kind: 'linear', a: 3, b: 12, c: 87 },
              clue: 'Lehúzod a kártyát. A kijelző: <b>»Utolsó ellenőrzés! A kód az x, ahol 3x + 12 = 87.«</b>',
              hints: ['Vond ki mindkét oldalból a 12-t.', '3x = 75.', 'Most oszd el mindkét oldalt 3-mal.'],
              explain: '3x + 12 = 87 → 3x = 75 → x = 25.' },
            e: { lock: 'num', answer: '1207', data: { kind: 'system', eq: [[3, -4, 8], [1, 2, 26]] },
              clue: 'Lehúzod a kártyát: <b>»A kód: x és y kétjegyű alakban egymás után, ahol 3x − 4y = 8 és x + 2y = 26.«</b>',
              hints: ['Fejezd ki x-et a második egyenletből: x = 26 − 2y.', 'Behelyettesítve: 3(26 − 2y) − 4y = 8 → 78 − 10y = 8.', 'y = 7, és x = 26 − 14.'],
              explain: 'x = 26 − 2y → 78 − 10y = 8 → y = 7, x = 12 → 12 07.' } } }
      ] },

    /* ---------------- 2. Az elsüllyedt tengeralattjáró ---------------- */
    { id: 'tengeralattjaro', icon: '🌊', title: 'Az elsüllyedt tengeralattjáró', tags: 'informatika · matek · fizika · biológia', par: { iskolai: 600, egyetem: 900 },
      teaser: 'A Delfin-3 leült a tengerfenékre. Caesar-rejtjel, bináris kód, koordináták, felhajtóerő…',
      story: { i: 'A <b>Delfin-3</b> kutató-tengeralattjáró a zátony mellett leült a tengerfenékre. Semmi pánik: levegő van bőven, és a mentőhajó odafent vár. A rendszereket viszont neked kell újraindítanod, hogy kinyíljon a mentőkabin zsilipje. A kapitány utolsó üzenete: <b>»Kezdd a ládával – a jelszót a naplóba írtam!«</b>',
        e: 'A <b>Delfin-3</b> mélytengeri kutató-tengeralattjáró rendszerei zárlat miatt leálltak, a hajó a tengerfenéken pihen. Az életfenntartó rendszer működik, de a felemelkedéshez újra kell kalibrálnod a kommunikációt, a navigációt és a ballasztrendszert. A kapitány üzenete: <b>»A láda jelszavát rejtjeleztem.«</b>' },
      outro: 'A zsilip kinyílik, beszállsz a mentőkabinba, és lassan felemelkedsz a napfényre. A mentőhajón már várnak – forró kakaóval!',
      scene: function () {
        var s = '<rect width="800" height="390" fill="#4a5b6e"/><rect y="390" width="800" height="90" fill="#2b3644"/><line x1="0" y1="390" x2="800" y2="390" stroke="#1c2430" stroke-width="4"/>';
        for (var i = 20; i < 800; i += 60) s += '<circle cx="' + i + '" cy="16" r="3" fill="#7d8ea3"/><circle cx="' + i + '" cy="380" r="3" fill="#7d8ea3"/>';
        [[90, 100, 44], [600, 60, 30]].forEach(function (p) {
          s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (p[2] + 8) + '" fill="#8d99ae" stroke="#2b2d42" stroke-width="3"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="#1d6fa3"/>' +
            '<path d="M' + (p[0] - 18) + ' ' + (p[1] + 4) + ' q10 -10 22 0 q-12 10 -22 0 z m22 0 l8 -6 v12 z" fill="#ffb703"/><circle cx="' + (p[0] + 12) + '" cy="' + (p[1] - 16) + '" r="3" fill="#bde0fe"/>';
        });
        s += obj('radio', 168, 44, 140, 104, '<rect x="172" y="48" width="132" height="96" rx="8" fill="#6b705c" stroke="#3a3d31" stroke-width="3"/>' +
          (function () { var g = ''; for (var k = 0; k < 6; k++) g += '<circle cx="' + (188 + k * 20) + '" cy="68" r="6" fill="' + (k % 2 ? '#333' : '#ffd166') + '" stroke="#222"/>'; return g; })() +
          '<rect x="184" y="86" width="60" height="46" rx="4" fill="#3a3d31"/><path d="M188 96 h52 M188 106 h52 M188 116 h52 M188 126 h52" stroke="#777"/><circle cx="276" cy="108" r="16" fill="#b7b7a4" stroke="#3a3d31" stroke-width="3"/><circle cx="296" cy="58" r="3" fill="#555"/><circle cx="180" cy="58" r="3" fill="#555"/><circle cx="296" cy="136" r="3" fill="#555"/><circle cx="180" cy="136" r="3" fill="#555"/>');
        s += obj('navigacio', 328, 56, 160, 120, '<rect x="332" y="60" width="152" height="112" rx="8" fill="#22333b" stroke="#0b1418" stroke-width="3"/><circle cx="408" cy="116" r="44" fill="#052e1a"/>' +
          '<circle cx="408" cy="116" r="30" fill="none" stroke="#2dc653" stroke-width="1"/><circle cx="408" cy="116" r="15" fill="none" stroke="#2dc653" stroke-width="1"/><line x1="408" y1="116" x2="444" y2="94" stroke="#7cff9b" stroke-width="2"/><circle cx="426" cy="98" r="3" fill="#7cff9b"/>');
        s += obj('szelep', 600, 110, 112, 112, '<rect x="560" y="160" width="240" height="14" fill="#6c757d"/><circle cx="656" cy="166" r="44" fill="none" stroke="#c1121f" stroke-width="10"/><circle cx="656" cy="166" r="9" fill="#780000"/>' +
          '<path d="M656 122 v88 M612 166 h88 M625 135 l62 62 M687 135 l-62 62" stroke="#c1121f" stroke-width="5"/><rect x="700" y="150" width="30" height="8" rx="3" fill="#adb5bd" data-after="t5"/>');
        s += obj('tartaly', 512, 196, 92, 190, '<rect x="520" y="200" width="76" height="180" rx="30" fill="#adb5bd" stroke="#495057" stroke-width="3"/><rect x="530" y="290" width="56" height="80" rx="20" fill="#48cae4" opacity=".75" data-until="t4"/><rect x="530" y="345" width="56" height="25" rx="10" fill="#48cae4" opacity=".75" data-after="t4"/>' +
          '<circle cx="558" cy="240" r="16" fill="#fff" stroke="#495057" stroke-width="2"/><line x1="558" y1="240" x2="568" y2="230" stroke="#c1121f" stroke-width="2"/>');
        s += obj('zsilip', 646, 222, 140, 166, '<rect x="650" y="226" width="132" height="160" rx="20" fill="#8d99ae" stroke="#2b2d42" stroke-width="4"/><circle cx="716" cy="300" r="50" fill="#adb5bd" stroke="#2b2d42" stroke-width="4"/>' +
          '<circle cx="716" cy="300" r="22" fill="none" stroke="#495057" stroke-width="6"/><path d="M716 270 v60 M686 300 h60" stroke="#495057" stroke-width="5"/><text x="716" y="246" font-size="11" text-anchor="middle" fill="#111" font-weight="700">MENTŐKABIN</text>');
        s += '<rect x="20" y="300" width="290" height="14" fill="#5c4033"/><rect x="30" y="314" width="12" height="76" fill="#3e2a20"/><rect x="288" y="314" width="12" height="76" fill="#3e2a20"/>';
        s += obj('naplo', 46, 246, 140, 56, '<path d="M60 296 l50 -6 l50 6 v-38 l-50 -6 l-50 6 z" fill="#f1e3c3" stroke="#8a6d3b" stroke-width="2"/><line x1="110" y1="252" x2="110" y2="290" stroke="#8a6d3b" stroke-width="2"/>' +
          '<path d="M68 268 h34 M68 276 h30 M118 268 h34 M118 276 h28" stroke="#888"/>');
        s += obj('lada', 330, 300, 150, 90, '<rect x="338" y="318" width="134" height="68" rx="6" fill="#9c6644" stroke="#5e3b24" stroke-width="3"/><rect x="338" y="318" width="134" height="20" rx="6" fill="#b07d56" stroke="#5e3b24" stroke-width="3"/>' +
          '<rect x="392" y="330" width="26" height="26" rx="3" fill="#d4a373" stroke="#5e3b24" stroke-width="2"/><path d="M398 330 v-6 a7 7 0 0 1 14 0 v6" stroke="#5e3b24" stroke-width="3" fill="none"/>');
        return s;
      },
      objects: [
        { id: 'naplo', name: 'Hajónapló', icon: '📓', info: { i: '<p>A hajónapló utolsó oldala: <i>»A ládát betűzárral védtem. A jelszót Caesar módszerével titkosítottam: minden betűt ugyanannyival toltam el az ábécében.«</i></p><p>A lap alján egy ábécé-csík (26 betűs, angol ábécé):</p>',
          e: '<p>Napló: <i>»Rejtjelezés: Caesar-féle eltolás az angol (26 betűs) ábécén, mod 26.«</i></p>' }, extra: function () { return '<div class="sz-abc">' + AZ.split('').map(function (c, k) { return '<span><b>' + c + '</b><small>' + (k + 1) + '</small></span>'; }).join('') + '</div>'; } },
        { id: 'lada', name: 'Láda', icon: '🧰' }, { id: 'radio', name: 'Rádió', icon: '📻' }, { id: 'navigacio', name: 'Navigációs képernyő', icon: '🧭' },
        { id: 'tartaly', name: 'Ballaszttartály', icon: '🛢️' }, { id: 'szelep', name: 'Szelepkerék', icon: '☸️' }, { id: 'zsilip', name: 'Zsilipajtó', icon: '🚪' }
      ],
      items: {
        terkep1: { icon: '🗺️', name: 'Térkép (bal fele)', desc: 'Egy tengeri térkép bal fele, rajta számozott bóják. A másik fele hiányzik…' },
        csavarhuzo: { icon: '🪛', name: 'Csavarhúzó', desc: 'Egy kis csillagcsavarhúzó. Valamit biztosan le lehet vele csavarozni.' },
        terkep2: { icon: '📄', name: 'Térkép (jobb fele)', desc: 'A térkép jobb fele, frissen kinyomtatva. Ha a bal felével összeillesztenéd…' },
        terkep: { icon: '🗺️', name: 'Teljes térkép', desc: 'A két fél összeragasztva: egy koordináta-rendszer számozott bójákkal.', pic: function () { return coordSvg(BUOYS); } },
        kar: { icon: '🔧', name: 'Szelepkar', desc: 'Egy hosszú fémkar. Pont illik egy szelepkerékhez.' }
      },
      combos: [{ a: 'terkep1', b: 'terkep2', make: 'terkep', msg: 'Összeilleszted a két térképfelet – most már látod az összes bóját!' }],
      steps: [
        { id: 't1', obj: 'lada', give: ['terkep1', 'csavarhuzo'], msg: 'A láda fedele felpattan: benne egy térkép fele és egy csavarhúzó.',
          v: {
            i: { lock: 'abc', answer: 'RADIO', data: { kind: 'caesar', enc: 'UDGLR', shift: 3 },
              clue: 'A láda betűzáras. A napló szerint a titkosított jelszó: <b class="sz-mono">UDGLR</b>, és <b>minden betűt 3-mal toltak el előre</b> az ábécében. Told vissza őket!',
              hints: ['Caesar-rejtjelnél minden betűt ugyanannyival tolnak el. Most visszafelé kell tolni 3-mal.', 'U → T → S → R. Tehát az első betű R.', 'U→R, D→A, G→D, L→I, R→…'],
              explain: 'Minden betűt 3-mal visszatolva: U→R, D→A, G→D, L→I, R→O → RADIO.' },
            e: { lock: 'abc', answer: 'SONAR', data: { kind: 'caesar', enc: 'ZVUHY', shift: 7 },
              clue: 'A láda betűzáras. A rejtjelezett jelszó: <b class="sz-mono">ZVUHY</b>. A kulcs: <b>ahány napos egy hét</b> (ennyivel toltak el minden betűt előre).',
              hints: ['A kulcs 7: minden betűt 7-tel kell visszatolni (mod 26).', 'Z (25) − 7 = 18 → S; V (21) − 7 = 14 → O.', 'U → N, H → A, Y → R.'],
              explain: 'Eltolás −7 (mod 26): Z→S, V→O, U→N, H→A, Y→R → SONAR (hanggal működő helymeghatározás).' } } },
        { id: 't2', obj: 'radio', need: ['csavarhuzo'], give: ['terkep2'], locked: 'A rádió hátlapja le van csavarozva, a beállítógombok mögé nem férsz hozzá. Kellene egy szerszám…',
          msg: 'Recsegés… megvan a kapcsolat! A rádió nyomtatója kiadja a térkép másik felét.',
          v: {
            i: { lock: 'num', answer: '42', data: { kind: 'binary', bits: '101010' },
              clue: 'Lecsavarozod a hátlapot. A rádión 6 lámpa: <b class="sz-mono">● ○ ● ○ ● ○</b> (● = 1, ○ = 0). Ez a vészfrekvencia <b>kettes számrendszerben</b>. Állítsd be tízes számrendszerben!',
              hints: ['Kettes számrendszerben a helyiértékek jobbról balra: 1, 2, 4, 8, 16, 32.', 'Ahol ● (1) van, azokat a helyiértékeket add össze: a 32-es, a 8-as és a 2-es helyen.', '32 + 8 + 2 = ?'],
              explain: '101010₂ = 32 + 8 + 2 = 42.' },
            e: { lock: 'abc', alpha: 'ABCDEF', answer: 'CAFE', data: { kind: 'hex', bits: '1100101011111110' },
              clue: 'A dekóder <b>hexadecimális</b> hívójelet vár (betűzár: A–F). A lámpasor: <b class="sz-mono">1100 1010 1111 1110</b>.',
              hints: ['Négy bit = egy hexadecimális jegy (0–9, A=10 … F=15).', '1100 = 12 = C, 1010 = 10 = A.', '1111 = 15 = F, 1110 = 14 = E.'],
              explain: '1100|1010|1111|1110 = C|A|F|E → 0xCAFE (= 51 966).' } } },
        { id: 't3', obj: 'navigacio', need: ['terkep'], locked: 'A navigációs képernyő egy bója számát kéri, de nincs teljes térképed – egy fél térkép nem elég.',
          msg: 'A navigációs rendszer betöltötte az útvonalat. Most már csak fel kellene emelkedni…',
          v: {
            i: { lock: 'num', answer: '58', data: { kind: 'coord', target: [-3, 2], points: BUOYS },
              clue: 'A mentőhajó üzenete: <b>»A biztonságos útvonal a (−3; 2) pontban lévő bójánál kezdődik.«</b> Írd be a bója számát!',
              hints: ['Az első szám az x (vízszintes), a második az y (függőleges).', 'x = −3: az origótól menj balra 3-at.', 'Utána y = 2: menj felfelé 2-t.'],
              explain: 'A (−3; 2) pont: balra 3, fel 2 – ott az 58-as bója áll.' },
            e: { lock: 'num', answer: '74', data: { kind: 'rotate', from: [2, -3], deg: 90, points: BUOYS },
              clue: '<b>»A mentőbója a (2; −3) pont origó körüli +90°-os (az óramutató járásával ellentétes) elforgatottjánál van.«</b> Írd be a bója számát!',
              hints: ['Origó körüli +90°-os forgatás: (x; y) → (−y; x).', '(2; −3) → (3; 2).', 'Keresd a (3; 2) pontot a térképen!'],
              explain: 'A forgatási mátrix [[0, −1], [1, 0]]: (2; −3) → (3; 2) – ott a 74-es bója.' } },
          extra: function () { return coordSvg(BUOYS); } },
        { id: 't4', obj: 'tartaly', after: 't3', give: ['kar'], locked: 'A ballaszttartály vezérlője csak akkor indul, ha a navigáció már tudja az útvonalat.',
          msg: 'A szivattyúk kinyomják a vizet a tartályból – a hajó megmozdul! A tartály mellől leesik egy szelepkar.',
          v: {
            i: { lock: 'num', answer: '20000', data: { kind: 'mass', V: 20, rho: 1000 },
              clue: '<b>»Felemelkedési teszt: a tengeralattjáró 20 m³ vizet szorít ki. A víz sűrűsége 1000 kg/m³. Hány kg a kiszorított víz tömege?«</b> (Archimédesz: ennyi víz súlyával egyenlő a felhajtóerő.)',
              hints: ['Tömeg = sűrűség · térfogat.', 'Minden köbméter víz 1000 kg.', '20 · 1000 = ?'],
              explain: 'm = ρ · V = 1000 kg/m³ · 20 m³ = 20 000 kg.' },
            e: { lock: 'num', answer: '123', data: { kind: 'buoyancy', V: 12, rho: 1025, g: 10 },
              clue: '<b>»Számold ki a felhajtóerőt kN-ban: kiszorított térfogat 12 m³, a tengervíz sűrűsége 1025 kg/m³, g = 10 m/s².«</b>',
              hints: ['Archimédesz törvénye: F = ρ · V · g.', 'F = 1025 · 12 · 10 N.', '123 000 N = ? kN'],
              explain: 'F = ρ·V·g = 1025 kg/m³ · 12 m³ · 10 m/s² = 123 000 N = 123 kN.' } } },
        { id: 't5', obj: 'szelep', need: ['kar'], locked: 'A nagy szelepkerékről hiányzik a kar – így nem lehet elforgatni.',
          msg: 'A szelep nyikorogva elfordul. A zsilip felé vezető út szabad!',
          v: {
            i: { lock: 'num', answer: '1619', data: { kind: 'seq', terms: [4, 7, 10, 13], next: 2 },
              clue: 'Felhelyezed a kart. A szelepen számsor: <b>4, 7, 10, 13, …</b> A kód: <b>a következő két tag egymás után</b>.',
              hints: ['Nézd meg, mennyivel nő a sorozat lépésről lépésre!', 'Mindig 3-mal nő.', '13 + 3 = 16, és 16 + 3 = ?'],
              explain: 'Számtani sorozat, d = 3: 4, 7, 10, 13, 16, 19 → 16 19.' },
            e: { lock: 'num', answer: '65129', data: { kind: 'seq-rec', terms: [3, 5, 9, 17, 33], mul: 2, add: -1, next: 2 },
              clue: 'Felhelyezed a kart. A szelepen: <b>3, 5, 9, 17, 33, …</b> A kód: <b>a következő két tag egymás után</b>.',
              hints: ['A különbségek: 2, 4, 8, 16 – mit veszel észre?', 'Rekurzió: a(n+1) = 2·a(n) − 1.', '2·33 − 1 = 65, utána 2·65 − 1.'],
              explain: 'a(n+1) = 2a(n) − 1 (zárt alak: a(n) = 2ⁿ + 1): 65, 129 → 65129.' } } },
        { id: 't6', obj: 'zsilip', after: 't5', final: true, locked: 'A zsilipajtó nem mozdul: amíg a szelep zárva van, a nyomás nem egyenlítődik ki.',
          msg: 'Sziszegés… a zsilip kinyílik!',
          v: {
            i: { lock: 'abc', answer: 'TONHAL', data: { kind: 'fact', q: 'hal' },
              clue: 'A zsilip biztonsági kérdése: <b>»Melyik közülük hal? delfin, bálna, tonhal, fóka«</b> (ékezet nélkül írd be).',
              hints: ['A halak kopoltyúval lélegeznek, egész életükben a vízben.', 'A delfin, a bálna és a fóka emlős: levegőt vesznek, és a kicsinyeiket szoptatják.', 'Csak egy maradt…'],
              explain: 'A tonhal hal (kopoltyúval lélegzik); a delfin, a bálna és a fóka emlős.' },
            e: { lock: 'abc', answer: 'TINTAHAL', data: { kind: 'fact', q: 'gerinctelen' },
              clue: '<b>»Melyik NEM gerinces? makréla, cápa, tintahal, fóka«</b> (ékezet nélkül).',
              hints: ['A gerincesek: halak, kétéltűek, hüllők, madarak, emlősök.', 'A cápa porcos hal, a makréla csontos hal, a fóka emlős.', 'A neve ellenére nem hal…'],
              explain: 'A tintahal puhatestű (lábasfejű) – gerinctelen; a makréla és a cápa hal, a fóka emlős.' } } }
      ] },

    /* ---------------- 3. Az időgép-műhely ---------------- */
    { id: 'idogep', icon: '⏳', title: 'Az időgép-műhely', tags: 'történelem · fizika · matek · biológia', par: { iskolai: 600, egyetem: 900 },
      teaser: 'Megnyomtad a nagy piros gombot… Évszámok, fogaskerekek, óramutatók, komplex számok.',
      story: { i: '<b>Tik-Tak Tódor</b>, a feltaláló, bekapcsolva hagyta az időgépét – te pedig véletlenül megnyomtad a nagy piros gombot. Villanás! A gép leállt, a műhely ajtaja nem nyílik, a kijelző pedig összevissza évszámokat mutat. Javítsd meg az időgépet, és állítsd be a hazautat!',
        e: '<b>Tik-Tak Tódor</b> műhelyében egy kísérleti időgép-prototípust tesztelsz, amikor a vezérlés hibát jelez, és a gép vészleállással megáll. A műhely zárva, a vezérlőrendszer csak akkor indul újra, ha minden modulját kalibrálod. Ideje munkához látni!' },
      outro: 'Villanás, zúgás… és újra a jelenben vagy! A műhely ajtaja kinyílik. Tik-Tak Tódor a fejét vakarja: »Hát te meg honnan kerültél elő?«',
      scene: function () {
        var s = '<rect width="800" height="390" fill="#ead7b7"/><rect y="390" width="800" height="90" fill="#a4764c"/>';
        for (var i = 0; i < 800; i += 70) s += '<line x1="' + i + '" y1="390" x2="' + i + '" y2="480" stroke="#8a5f3a" stroke-width="2"/>';
        for (var j = 40; j < 390; j += 50) s += '<line x1="0" y1="' + j + '" x2="800" y2="' + j + '" stroke="#dcc6a0"/>';
        s += obj('ora', 34, 24, 140, 200, '<rect x="58" y="120" width="92" height="100" fill="#7f5539" stroke="#4a2f1d" stroke-width="3"/><circle cx="104" cy="80" r="54" fill="#7f5539" stroke="#4a2f1d" stroke-width="3"/><circle cx="104" cy="80" r="44" fill="#fffbe9"/>' +
          (function () { var g = ''; for (var k = 0; k < 12; k++) { var a = k * Math.PI / 6; g += '<line x1="' + (104 + 38 * Math.sin(a)).toFixed(1) + '" y1="' + (80 - 38 * Math.cos(a)).toFixed(1) + '" x2="' + (104 + 42 * Math.sin(a)).toFixed(1) + '" y2="' + (80 - 42 * Math.cos(a)).toFixed(1) + '" stroke="#333" stroke-width="2"/>'; } return g; })() +
          '<line x1="104" y1="80" x2="104" y2="48" stroke="#222" stroke-width="3"/><line x1="104" y1="80" x2="126" y2="80" stroke="#222" stroke-width="4"/><line x1="104" y1="130" x2="104" y2="190" stroke="#c9a227" stroke-width="3"/><circle cx="104" cy="196" r="10" fill="#c9a227"/>');
        s += obj('kijelzo', 196, 40, 172, 100, '<rect x="200" y="44" width="164" height="92" rx="8" fill="#2b2d42" stroke="#111" stroke-width="3"/><rect x="212" y="58" width="140" height="44" rx="4" fill="#111"/>' +
          '<text x="282" y="90" font-size="26" font-family="monospace" text-anchor="middle" fill="#ff5d5d" data-until="i1">?!?!</text><text x="282" y="90" font-size="22" font-family="monospace" text-anchor="middle" fill="#3ddc84" data-after="i1">OK</text>' +
          '<circle cx="222" cy="120" r="6" fill="#e63946"/><circle cx="242" cy="120" r="6" fill="#ffd166"/><circle cx="262" cy="120" r="6" fill="#06d6a0"/>');
        s += obj('jegyzet', 392, 52, 100, 110, '<rect x="398" y="58" width="88" height="100" fill="#fffef2" stroke="#c9b37e" transform="rotate(-3 442 108)"/><circle cx="442" cy="62" r="5" fill="#e63946"/>' +
          '<path d="M408 84 h60 M408 98 h52 M408 112 h62 M408 126 h44 M408 140 h56" stroke="#8d99ae" stroke-width="2"/>');
        s += '<rect x="20" y="290" width="350" height="14" fill="#6f4518"/><rect x="30" y="304" width="14" height="86" fill="#4a2f1d"/><rect x="346" y="304" width="14" height="86" fill="#4a2f1d"/>';
        s += obj('szerszamlada', 50, 226, 160, 66, '<rect x="58" y="244" width="144" height="46" rx="4" fill="#c1121f" stroke="#780000" stroke-width="3"/><path d="M100 244 v-12 h60 v12" fill="none" stroke="#333" stroke-width="5"/><rect x="118" y="258" width="24" height="16" rx="3" fill="#ddd" stroke="#555"/>');
        s += obj('mikroszkop', 226, 170, 110, 122, '<rect x="246" y="276" width="70" height="12" rx="3" fill="#343a40"/><path d="M296 276 v-70 l-20 -24" stroke="#495057" stroke-width="10" fill="none" stroke-linecap="round"/>' +
          '<rect x="262" y="172" width="18" height="40" rx="4" fill="#adb5bd" stroke="#343a40" transform="rotate(-30 271 192)"/><rect x="254" y="238" width="44" height="6" fill="#6c757d"/><circle cx="276" cy="230" r="5" fill="#90e0ef"/>');
        s += obj('generator', 378, 264, 130, 120, '<rect x="384" y="282" width="118" height="98" rx="10" fill="#588157" stroke="#344e41" stroke-width="3"/><circle cx="420" cy="331" r="24" fill="#a3b18a" stroke="#344e41" stroke-width="3"/>' +
          '<path d="M408 331 q6 -14 12 0 t12 0" stroke="#344e41" stroke-width="3" fill="none"/><rect x="456" y="300" width="34" height="22" rx="3" fill="#111"/><text x="473" y="316" font-size="11" text-anchor="middle" fill="#ffd166">⚡</text><rect x="456" y="334" width="34" height="34" rx="4" fill="#dad7cd" stroke="#344e41"/>');
        s += obj('idogep', 528, 60, 256, 330, '<ellipse cx="656" cy="378" rx="120" ry="14" fill="#6c757d"/><rect x="566" y="110" width="180" height="262" rx="80" fill="#c0c6cf" stroke="#495057" stroke-width="4"/>' +
          '<rect x="600" y="150" width="112" height="170" rx="56" fill="#90e0ef" opacity=".55" stroke="#495057" stroke-width="3"/><circle cx="656" cy="90" r="24" fill="#ffd166" stroke="#c9a227" stroke-width="4"/><path d="M640 90 l16 -12 l16 12 l-16 12 z" fill="#ff7b00"/>' +
          '<rect x="548" y="250" width="22" height="70" rx="6" fill="#495057"/><rect x="742" y="250" width="22" height="70" rx="6" fill="#495057"/><circle cx="656" cy="340" r="9" fill="#e63946" stroke="#780000" stroke-width="3"/>');
        return s;
      },
      objects: [
        { id: 'jegyzet', name: 'Feltalálói jegyzet', icon: '📝', info: { i: '<p>Tik-Tak Tódor cetlije:</p><ul><li>Fogaskerekek: amennyi fog elhalad az egyik keréken, annyi a másikon is.</li><li>Az óralap 360°-os, 12 óra → egy óra 30°.</li><li>Teljesítmény: P = U · I (watt = volt · amper).</li></ul>',
          e: '<p>Kalibrálási jegyzet:</p><ul><li>Fogaskerék-hajtás: n₁·z₁ = n₂·z₂ (a közbenső kerék csak a forgásirányt fordítja).</li><li>Óramutató: 0,5°/perc, percmutató: 6°/perc.</li><li>Komplex szorzás: (a+bi)(c+di) = (ac−bd) + (ad+bc)i.</li></ul>' } },
        { id: 'kijelzo', name: 'Időkijelző', icon: '📟' }, { id: 'szerszamlada', name: 'Szerszámláda', icon: '🧰' }, { id: 'ora', name: 'Falióra', icon: '🕰️' },
        { id: 'generator', name: 'Generátor', icon: '⚡' }, { id: 'mikroszkop', name: 'Mikroszkóp', icon: '🔬' }, { id: 'idogep', name: 'Időgép', icon: '🚀' }
      ],
      items: {
        fogaskerek: { icon: '⚙️', name: 'Fogaskerék', desc: 'Egy fényes fogaskerék, a közepén lyuk – tengely nélkül nem forog.' },
        tengely: { icon: '📏', name: 'Tengely', desc: 'Egy rövid acéltengely. Valamit rá lehetne húzni…' },
        szerkezet: { icon: '🕰️', name: 'Óraszerkezet', desc: 'A fogaskerék a tengelyen: kész óraszerkezet. Egy álló órába pont beleillene.' },
        kulcs: { icon: '🗝️', name: 'Kis kulcs', desc: 'Egy apró kulcs, rajta villám jel ⚡.' },
        cella: { icon: '🔋', name: 'Energiacella', desc: 'Feltöltött energiacella az időgéphez.' },
        chip: { icon: '💾', name: 'Célévszám-chip', desc: 'Memóriachip, a felirata: »ÚTI CÉL«.' }
      },
      combos: [{ a: 'fogaskerek', b: 'tengely', make: 'szerkezet', msg: 'Ráhúzod a fogaskereket a tengelyre: kész az óraszerkezet!' }],
      steps: [
        { id: 'i1', obj: 'kijelzo', give: ['fogaskerek'], msg: 'A kijelző zölden villan, és a gép oldalából kipottyan egy fogaskerék.',
          v: {
            i: { lock: 'abc', alpha: 'ABCD', answer: 'BDAC', data: { kind: 'history', events: { A: 1526, B: 895, C: 1848, D: 1000 } },
              clue: 'A kijelző négy eseményt mutat. <b>Állítsd időrendbe, a legkorábbitól!</b><br>A – a mohácsi csata<br>B – a honfoglalás<br>C – az 1848-as forradalom kitörése<br>D – Szent István királlyá koronázása',
              hints: ['Melyik történt legelőször? A magyarok megérkezése a Kárpát-medencébe.', 'Honfoglalás: 895 körül; István koronázása: 1000 körül.', 'Mohács: 1526; a forradalom: 1848.'],
              explain: 'honfoglalás (895 körül) → István koronázása (1000/1001) → mohácsi csata (1526) → forradalom (1848): B, D, A, C.' },
            e: { lock: 'abc', alpha: 'ABCDE', answer: 'DBECA', data: { kind: 'history', events: { A: 1867, B: 1241, C: 1703, D: 1222, E: 1458 } },
              clue: '<b>Állítsd időrendbe, a legkorábbitól!</b><br>A – a kiegyezés<br>B – a muhi csata (tatárjárás)<br>C – a Rákóczi-szabadságharc kitörése<br>D – az Aranybulla kiadása<br>E – Mátyás királlyá választása',
              hints: ['Árpád-kor → Hunyadiak kora → Habsburg-kor: ebben a sorrendben gondolkodj.', 'Aranybulla: 1222, muhi csata: 1241.', 'Mátyás: 1458, Rákóczi: 1703, kiegyezés: 1867.'],
              explain: '1222 Aranybulla → 1241 muhi csata → 1458 Mátyás → 1703 Rákóczi → 1867 kiegyezés: D, B, E, C, A.' } } },
        { id: 'i2', obj: 'szerszamlada', give: ['tengely'], msg: 'A szerszámláda kinyílik: benne egy tengely.',
          v: {
            i: { lock: 'num', answer: '28', data: { kind: 'gear', z1: 60, n1: 7, z2: 15 },
              clue: 'A láda zárján két fogaskerék rajza: a nagynak <b>60</b> foga van, a kicsinek <b>15</b>. <b>Ha a nagy kerék 7-et fordul, hányat fordul a kicsi?</b> Ez a kód.',
              hints: ['Amennyi fog elhalad az egyik keréken, ugyanannyi a másikon.', 'A nagy kerék egy fordulata 60 fog = 4 fordulat a kicsin.', '7 · 4 = ?'],
              explain: '7 · 60 = 420 fog → 420 : 15 = 28 fordulat.' },
            e: { lock: 'num', answer: '20', data: { kind: 'gear3', zA: 48, nA: 5, zB: 16, zC: 12 },
              clue: 'Három fogaskerék egy sorban: <b>A (48 fog) → B (16 fog) → C (12 fog)</b>. Az A kerék <b>5-öt</b> fordul. <b>Hányat fordul a C?</b>',
              hints: ['A középső (B) kerék csak közvetítő: a fogszáma nem számít.', 'n_A · z_A = n_C · z_C.', '5 · 48 = 240; 240 : 12 = ?'],
              explain: 'n_C = n_A · z_A / z_C = 5 · 48 / 12 = 20 (a B kerék csak a forgásirányt fordítja meg).' } } },
        { id: 'i3', obj: 'ora', need: ['szerkezet'], give: ['kulcs'], locked: 'A nagy falióra áll. Hátul üres a hely, ahonnan hiányzik az óraszerkezet.',
          msg: 'Az óra kakukkja kiugrik – a csőrében egy kis kulcs!',
          v: {
            i: { lock: 'num', answer: '90', data: { kind: 'clock', h: 3, m: 0 },
              clue: 'Beszereled a szerkezetet, és az óra <b>3:00</b>-ra áll. Az alján felirat: <b>»A kód: hány fokos szöget zár be a két mutató?«</b>',
              hints: ['Az óralap 360°, 12 egyenlő részre osztva.', 'Egy óra = 360° : 12 = 30°.', '3 · 30° = ?'],
              explain: '3:00-kor a mutatók között 3 óraköz van: 3 · 30° = 90°.' },
            e: { lock: 'num', answer: '156', data: { kind: 'clock', h: 2, m: 48 },
              clue: 'Beszereled a szerkezetet, az óra <b>2:48</b>-at mutat. <b>»A kód: a két mutató által bezárt kisebbik szög fokban.«</b>',
              hints: ['A percmutató percenként 6°-ot, az óramutató percenként 0,5°-ot halad.', 'Percmutató: 48 · 6° = 288°; óramutató: 2 · 30° + 48 · 0,5° = 84°.', 'A különbség 204° – de a kisebbik szög kell: 360° − 204°.'],
              explain: '288° − 84° = 204°, a kisebbik szög 360° − 204° = 156°.' } } },
        { id: 'i4', obj: 'generator', need: ['kulcs'], give: ['cella'], locked: 'A generátor burkolatán villám jeles kulcslyuk. Kulcs nélkül nem nyílik.',
          msg: 'A generátor felzúg, és kiad egy feltöltött energiacellát.',
          v: {
            i: { lock: 'num', answer: '1150', data: { kind: 'power', U: 230, I: 5 },
              clue: 'Kinyitod a burkolatot. A kijelző: <b>»Feszültség: 230 V, áramerősség: 5 A. Add meg a teljesítményt wattban!«</b>',
              hints: ['Elektromos teljesítmény: P = U · I.', 'P = 230 · 5', '230 · 5 = 200 · 5 + 30 · 5'],
              explain: 'P = U · I = 230 V · 5 A = 1150 W.' },
            e: { lock: 'num', answer: '1005', data: { kind: 'complex', a: [3, 4], b: [2, -1] },
              clue: '<b>»Fáziskód: z = (3 + 4i) · (2 − i). A kód: z valós része, majd képzetes része, mindkettő kétjegyű alakban.«</b>',
              hints: ['(a + bi)(c + di) = (ac − bd) + (ad + bc)i.', 'i² = −1, ezért 4i · (−i) = +4.', 'Valós rész: 6 + 4; képzetes rész: −3 + 8.'],
              explain: 'z = 6 − 3i + 8i − 4i² = 10 + 5i → 10 05.' } } },
        { id: 'i5', obj: 'mikroszkop', after: 'i1', give: ['chip'], locked: 'A mikroszkóp lámpája nem világít – amíg az időkijelző hibát jelez, a műhely áramköre le van zárva.',
          msg: 'A tárgyasztal alatt egy memóriachip van elrejtve – rajta: »ÚTI CÉL«.',
          v: {
            i: { lock: 'num', answer: '46', data: { kind: 'fact', q: 'kromoszoma' },
              clue: 'A mikroszkóp alatt emberi sejt kromoszómái. A címke: <b>»Hány kromoszóma van egy emberi testi sejtben?«</b>',
              hints: ['A kromoszómák párokban vannak.', 'Az embernek 23 kromoszómapárja van.', '23 · 2 = ?'],
              explain: 'Az emberi testi sejtben 23 pár, azaz 46 kromoszóma van.' },
            e: { lock: 'num', answer: '28', data: { kind: 'chargaff', A: 22 },
              clue: '<b>»Egy kétszálú DNS-mintában az adenin aránya 22%. A kód: a citozin aránya százalékban.«</b>',
              hints: ['Chargaff-szabály: A = T és G = C.', 'A + T = 44%.', 'G + C = 56%, tehát C = ?'],
              explain: 'A = T = 22% → G + C = 100% − 44% = 56% → C = 28%.' } } },
        { id: 'i6', obj: 'idogep', need: ['cella', 'chip'], final: true, locked: 'Az időgép halott. Hiányzik belőle az energiacella és a célévszám-chip.',
          msg: 'A gép felpörög, a kapszula ajtaja becsukódik mögötted…',
          v: {
            i: { lock: 'num', answer: '2000', data: { kind: 'linear', a: 2, b: -1848, c: 2152 },
              clue: 'Bedugod a cellát és a chipet. A kijelző: <b>»Add meg a kalibrációs évet! Év = x, ahol 2x − 1848 = 2152.«</b> (Tódor ebben az évben építette a gépet – innen ugrik vissza a jelenbe.)',
              hints: ['Add hozzá mindkét oldalhoz az 1848-at.', '2x = 4000.', 'Oszd el 2-vel.'],
              explain: '2x − 1848 = 2152 → 2x = 4000 → x = 2000.' },
            e: { lock: 'num', answer: '2000', data: { kind: 'binary', bits: '11111010000' },
              clue: '<b>»Kalibrációs év (kettes számrendszerben): 11111010000.«</b> Írd be tízes számrendszerben!',
              hints: ['Helyiértékek jobbról: 1, 2, 4, …, 1024.', 'Az egyesek helyén: 1024, 512, 256, 128, 64 és 16.', 'Add össze őket!'],
              explain: '1024 + 512 + 256 + 128 + 64 + 16 = 2000.' } } }
      ] },

    /* ---------------- 4. A titkos könyvtár ---------------- */
    { id: 'konyvtar', icon: '📚', title: 'A titkos könyvtár', tags: 'biológia · informatika · matek · kémia', par: { iskolai: 600, egyetem: 900 },
      teaser: 'Bezártak éjszakára a régi könyvtárba. Festmény, könyvjelző-kód, UV-lámpa, rejtett ajtó…',
      story: { i: 'Annyira elmerültél egy kalandregényben a város régi könyvtárában, hogy észre sem vetted: bezártak! Az öreg könyvtáros egyszer elmesélte, hogy a polcok mögött <b>titkos ajtó</b> rejtőzik – de csak az nyithatja ki, aki megfejti a könyvtár rejtvényeit.',
        e: 'Kutatómunka közben a régi könyvtár levéltárában ragadtál éjszakára. A legenda szerint a könyvtár alapítója rejtett kijáratot épített, és a nyitját tudományos rejtvényekbe kódolta. Itt az alkalom, hogy kiderüljön, igaz-e.' },
      outro: 'A könyvespolc halkan elfordul, mögötte keskeny lépcső vezet ki a hajnali utcára. A titkos könyvtár rejtvényeit megfejtetted!',
      scene: function () {
        var s = '<rect width="800" height="390" fill="#efe3cc"/><rect y="300" width="800" height="90" fill="#d8c3a0"/><rect y="390" width="800" height="90" fill="#7a5233"/><line x1="0" y1="300" x2="800" y2="300" stroke="#b89a6c" stroke-width="3"/>';
        s += obj('polc', 20, 30, 190, 360, '<rect x="24" y="34" width="182" height="352" fill="#6f4518" stroke="#3e2410" stroke-width="4"/>' +
          [0, 1, 2, 3].map(function (k) { var y = 44 + k * 84; return '<rect x="32" y="' + (y + 70) + '" width="166" height="8" fill="#3e2410"/>' + books(34, y + 8, 162, 62, k * 3); }).join(''));
        s += obj('festmeny', 232, 40, 160, 128, '<rect x="236" y="44" width="152" height="120" fill="#c9a227" stroke="#8a6d1b" stroke-width="4"/><rect x="248" y="56" width="128" height="96" fill="#a8dadc"/>' +
          '<rect x="248" y="112" width="128" height="40" fill="#74c69d"/><circle cx="352" cy="76" r="11" fill="#ffd166"/><path d="M262 112 q22 -30 44 0" fill="#52b788"/><circle cx="280" cy="132" r="4" fill="#e63946"/><circle cx="300" cy="140" r="4" fill="#ffb703"/><circle cx="330" cy="130" r="4" fill="#e63946"/>');
        s += obj('fal', 410, 54, 116, 170, (function () { var g = ''; for (var r = 0; r < 7; r++) for (var c = 0; c < 4; c++) g += '<rect x="' + (414 + c * 27 + (r % 2 ? 13 : 0)) + '" y="' + (58 + r * 23) + '" width="25" height="20" fill="#d9c7a8" stroke="#c4ae88"/>'; return g; })() +
          '<text x="468" y="150" font-size="20" font-weight="700" text-anchor="middle" fill="#9d4edd" opacity=".85" data-after="k4">✦ ✦ ✦</text>');
        s += '<rect x="226" y="300" width="290" height="14" fill="#5c3b1e"/><rect x="236" y="314" width="12" height="76" fill="#3e2410"/><rect x="494" y="314" width="12" height="76" fill="#3e2410"/>';
        s += obj('lada', 236, 244, 104, 58, '<rect x="246" y="262" width="84" height="38" rx="4" fill="#9c6644" stroke="#5e3b24" stroke-width="3"/><rect x="246" y="262" width="84" height="12" rx="4" fill="#b07d56" stroke="#5e3b24" stroke-width="2"/><rect x="280" y="272" width="16" height="16" rx="2" fill="#d4a373" stroke="#5e3b24"/>');
        s += obj('lexikon', 350, 252, 150, 50, '<path d="M362 298 l62 -8 l62 8 v-34 l-62 -8 l-62 8 z" fill="#fffaf0" stroke="#8a6d3b" stroke-width="2"/><line x1="424" y1="256" x2="424" y2="290" stroke="#8a6d3b" stroke-width="2"/>' +
          '<path d="M372 272 h40 M372 280 h36 M436 272 h40 M436 280 h32" stroke="#999"/>');
        s += obj('foldgomb', 528, 210, 104, 180, '<rect x="560" y="370" width="40" height="12" rx="4" fill="#5e3b24"/><line x1="580" y1="370" x2="580" y2="320" stroke="#5e3b24" stroke-width="6"/><path d="M536 270 a44 44 0 1 0 88 0" fill="none" stroke="#c9a227" stroke-width="4"/>' +
          '<circle cx="580" cy="270" r="40" fill="#4ea8de"/><path d="M556 252 q14 -10 26 4 q-6 14 -20 10 z M586 276 q16 -6 22 8 q-10 14 -24 4 z" fill="#74c69d"/>');
        s += obj('ajto', 644, 30, 140, 360, '<rect x="648" y="34" width="132" height="352" fill="#7f4f24" stroke="#3e2410" stroke-width="4"/>' +
          [0, 1, 2, 3].map(function (k) { var y = 44 + k * 84; return '<rect x="656" y="' + (y + 70) + '" width="116" height="8" fill="#3e2410"/>' + books(658, y + 8, 112, 62, k * 5 + 2); }).join('') +
          '<path d="M786 60 q8 10 0 20 M786 160 q8 10 0 20 M786 260 q8 10 0 20" stroke="#8d99ae" stroke-width="2" fill="none"/><rect x="760" y="200" width="14" height="30" rx="3" fill="#c9a227" data-after="k6"/>');
        return s;
      },
      objects: [
        { id: 'lexikon', name: 'Nyitott lexikon', icon: '📖', info: { i: '<p>A lexikon a <b>periódusos rendszernél</b> van nyitva (rendszám, vegyjel, név):</p>', e: '<p>Lexikon – periódusos rendszer (részlet):</p>' }, extra: elemTable },
        { id: 'festmeny', name: 'Festmény', icon: '🖼️' }, { id: 'lada', name: 'Kis láda', icon: '📦' }, { id: 'polc', name: 'Könyvespolc', icon: '📚' },
        { id: 'fal', name: 'Falrészlet', icon: '🧱' }, { id: 'foldgomb', name: 'Földgömb', icon: '🌍' }, { id: 'ajto', name: 'Sarokpolc', icon: '🚪' }
      ],
      items: {
        konyvjelzo: { icon: '🔖', name: 'Könyvjelző', desc: { i: 'Rajta számok: <b class="sz-mono">11 – 1 – 18 – 4</b>. Alul apró betűkkel: »A = 1, B = 2, …«', e: 'Rajta: <b class="sz-mono">01011 – 00001 – 10010 – 00100</b>. Alul: »A = 1«' } },
        lampa: { icon: '🔦', name: 'UV-lámpa (elem nélkül)', desc: 'Ultraibolya fényű lámpa. Az elemtartója üres.' },
        elem: { icon: '🔋', name: 'Elem', desc: 'Egy ceruzaelem. Vajon mibe kellene?' },
        uvlampa: { icon: '🔦', name: 'Működő UV-lámpa', desc: 'Az UV-fényben láthatóvá válnak a láthatatlan tintával írt jelek.' },
        kulcs: { icon: '🗝️', name: 'Rézkulcs', desc: 'Régi rézkulcs, a fején egy kis földgömb-minta.' },
        kar: { icon: '🦯', name: 'Rejtett kar', desc: 'Faragott fakar, a végén fogazás. Valamilyen nyílásba illik.' }
      },
      combos: [{ a: 'lampa', b: 'elem', make: 'uvlampa', msg: 'Beteszed az elemet: a lámpa lilás fénnyel felvillan!' }],
      steps: [
        { id: 'k1', obj: 'festmeny', give: ['konyvjelzo'], msg: 'A keret mögül kicsúszik egy könyvjelző.',
          v: {
            i: { lock: 'num', answer: '684', data: { kind: 'fact', q: 'labak' },
              clue: 'A festményen egy rét bogarakkal, egy pókkal – és a sarokban egy szív rajza. A keret alján számzár: <b>»egy rovar lábainak száma · egy pók lábainak száma · az emberi szív üregeinek száma«</b>.',
              hints: ['Egy rovarnak 3 pár lába van.', 'A pók nem rovar: 4 pár lába van.', 'Az emberi szív: 2 pitvar + 2 kamra.'],
              explain: 'rovar: 6 láb, pók: 8 láb, emberi szív: 4 üreg (2 pitvar, 2 kamra) → 6 8 4.' },
            e: { lock: 'num', answer: '5025', data: { kind: 'genetics', crosses: [['Aa', 'aa'], ['Aa', 'Aa']] },
              clue: 'A festményen egy szerzetes borsót vizsgál. Felirat: <b>»Kód: Aa × aa keresztezésnél az utódok hány %-a recesszív fenotípusú, majd Aa × Aa keresztezésnél hány % homozigóta recesszív?«</b>',
              hints: ['Rajzolj Punnett-táblát!', 'Aa × aa: Aa, Aa, aa, aa → 50% aa.', 'Aa × Aa: AA, Aa, aA, aa → 25% aa.'],
              explain: 'Aa × aa → ½ aa = 50%; Aa × Aa → ¼ aa = 25% → 50 25 (Mendel szabályai).' } } },
        { id: 'k2', obj: 'lada', need: ['konyvjelzo'], give: ['lampa'], locked: 'Egy kis faláda négybetűs zárral. A jelszó valahol el van rejtve – talán egy könyvjelzőn?',
          msg: 'A ládában egy UV-lámpa – de nincs benne elem.',
          v: {
            i: { lock: 'abc', answer: 'KARD', data: { kind: 'a1z26', nums: [11, 1, 18, 4] },
              clue: 'A könyvjelző számai: <b class="sz-mono">11 – 1 – 18 – 4</b>. Minden szám az angol ábécé egy betűje (A = 1, B = 2, …).',
              hints: ['Számold végig az ábécét: A = 1, B = 2, C = 3…', '11 = K, 1 = A.', '18 = R, 4 = D.'],
              explain: '11 → K, 1 → A, 18 → R, 4 → D: KARD.' },
            e: { lock: 'abc', answer: 'KARD', data: { kind: 'a1z26-bin', bins: ['01011', '00001', '10010', '00100'] },
              clue: 'A könyvjelzőn: <b class="sz-mono">01011 – 00001 – 10010 – 00100</b> (kettes számrendszer, A = 1).',
              hints: ['Először váltsd át a bináris számokat tízes számrendszerbe.', '01011 = 11, 00001 = 1, 10010 = 18, 00100 = 4.', 'Most A = 1, B = 2…: 11 = K.'],
              explain: '01011₂ = 11 → K, 1 → A, 10010₂ = 18 → R, 00100₂ = 4 → D: KARD.' } } },
        { id: 'k3', obj: 'polc', after: 'k1', give: ['elem'], locked: 'Rengeteg könyv… de amíg nincs semmi nyomod, hiába keresgélsz. Talán a festmény elárul valamit.',
          msg: 'A polc egyik könyve mögött rejtett fiók: benne egy elem.',
          v: {
            i: { lock: 'num', answer: '60', data: { kind: 'percent', base: 240, p: 25 },
              clue: 'Egy könyv lapjai közül cetli esik ki: <b>»A könyvtárban 240 könyv van, ezek 25%-a mesekönyv. A rejtett fiók kódja: a mesekönyvek száma.«</b>',
              hints: ['25% = egynegyed rész.', 'Oszd el a 240-et 4-gyel.', '240 : 4 = ?'],
              explain: '240 · 0,25 = 60.' },
            e: { lock: 'num', answer: '5000', data: { kind: 'percent-rev', up: 20, down: 20, final: 4800 },
              clue: 'Cetli egy könyvben: <b>»Egy ritka kötet árát 20%-kal emelték, majd 20%-kal csökkentették; így most 4800 Ft. A kód: az eredeti ár forintban.«</b>',
              hints: ['Az emelés ×1,2; a csökkentés ×0,8 – a kettő nem oltja ki egymást!', 'x · 1,2 · 0,8 = 0,96x = 4800.', 'x = 4800 : 0,96'],
              explain: '0,96x = 4800 → x = 5000 Ft.' } } },
        { id: 'k4', obj: 'fal', need: ['uvlampa'], give: ['kulcs'], locked: 'A fal itt gyanúsan üres. Talán láthatatlan tintával írtak rá valamit? Kellene egy működő UV-lámpa.',
          msg: 'Az egyik tégla kiugrik a falból: mögötte egy régi rézkulcs.',
          v: {
            i: { lock: 'num', answer: '7116', data: { kind: 'elements', syms: ['N', 'Na', 'C'] },
              clue: 'Az UV-fényben vegyjelek tűnnek elő: <b class="sz-mono">N – Na – C</b>. Alattuk: <b>»A kód: a rendszámaik egymás után.«</b> (A nyitott lexikonban megtalálod a periódusos rendszert.)',
              hints: ['A rendszámot a lexikonban minden elem mellett megtalálod.', 'N (nitrogén) = 7.', 'Na = 11, C = 6.'],
              explain: 'N = 7, Na = 11, C = 6 → 7 11 6.' },
            e: { lock: 'num', answer: '202635', data: { kind: 'elements', syms: ['Ca', 'Fe', 'Br'] },
              clue: 'UV-fényben: <b class="sz-mono">Ca – Fe – Br</b>. <b>»A kód: a rendszámok egymás után.«</b>',
              hints: ['Nézd meg a lexikonban a periódusos rendszert.', 'Ca = 20, Fe = 26.', 'Br = 35.'],
              explain: 'Ca = 20, Fe = 26, Br = 35 → 20 26 35.' } } },
        { id: 'k5', obj: 'foldgomb', need: ['kulcs'], give: ['kar'], locked: 'A földgömb tengelyén kis kulcslyuk van.',
          msg: 'A földgömb kettényílik: benne egy faragott kar.',
          v: {
            i: { lock: 'num', answer: '11', data: { kind: 'linear2', eq: [5, -7, 3, 15] },
              clue: 'Elfordítod a kulcsot, és a földgömbön felirat jelenik meg: <b>»5x − 7 = 3x + 15. A kód: x.«</b>',
              hints: ['Gyűjtsd az x-eket az egyik oldalra: vonj ki 3x-et.', '2x − 7 = 15, tehát 2x = 22.', 'Oszd el 2-vel.'],
              explain: '5x − 7 = 3x + 15 → 2x = 22 → x = 11.' },
            e: { lock: 'num', answer: '37', data: { kind: 'quad', a: 1, b: -10, c: 21 },
              clue: '<b>»x² − 10x + 21 = 0. A kód: a két megoldás, növekvő sorrendben.«</b>',
              hints: ['Keress két számot, amelyek szorzata 21, összege 10 (Viète).', '(x − 3)(x − 7) = 0', 'x = 3 vagy x = 7.'],
              explain: 'D = 100 − 84 = 16 → x = (10 ± 4)/2 → 3 és 7 → 37.' } } },
        { id: 'k6', obj: 'ajto', need: ['kar'], final: true, locked: 'A sarokpolc mögül huzat jön… de nem mozdul. Az oldalán egy fogazott nyílás – valami kar kellene bele.',
          msg: 'A könyvespolc halkan elfordul – mögötte a kijárat!',
          v: {
            i: { lock: 'abc', answer: 'KIJARAT', data: { kind: 'caesar', enc: 'LJKBSBU', shift: 1 },
              clue: 'Beilleszted a kart a nyílásba. A polcon betűzár és egy cetli: <b class="sz-mono">LJKBSBU</b> – <b>»minden betű 1-gyel el van tolva előre az ábécében.«</b>',
              hints: ['Minden betűt 1-gyel vissza kell tolni: B → A, C → B…', 'L → K, J → I, K → J.', 'B → A, S → R, B → A, U → T.'],
              explain: 'Minden betűt 1-gyel visszatolva: LJKBSBU → KIJARAT.' },
            e: { lock: 'abc', answer: 'KIJARAT', data: { kind: 'vigenere', enc: 'UIADBAK', key: 'KARD' },
              clue: 'Beilleszted a kart. Cetli: <b class="sz-mono">UIADBAK</b> – <b>»Vigenère-rejtjel. A kulcsszó: az a szó, amely a kis ládát nyitotta.«</b>',
              hints: ['Vigenère: a kulcsszó betűi (A = 0, B = 1, …) mondják meg, mennyivel kell visszatolni az egyes betűket. A kulcs ismétlődik: KARDKAR.', 'U − K(10) = K; I − A(0) = I; A − R(17) = J (mod 26).', 'D − D = A, B − K = R, A − A = A, K − R = T.'],
              explain: 'Kulcs KARDKAR, visszatolás mod 26: U−K=K, I−A=I, A−R=J, D−D=A, B−K=R, A−A=A, K−R=T → KIJARAT.' } } }
      ] }
  ];

  /* ================== játéklogika ================== */
  var runs = {}, timer = null;
  function lv() { return S.level === 'egyetem' ? 'egyetem' : 'iskolai'; }
  function L(x) { return x && typeof x === 'object' && ('i' in x || 'e' in x) ? (lv() === 'egyetem' ? x.e : x.i) : x; }
  function V(step, level) { return step.v[(level || lv()) === 'egyetem' ? 'e' : 'i']; }
  function norm(s) {
    s = String(s || '').toUpperCase();
    if (s.normalize) s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    return s.replace(/[^A-Z0-9]/g, '');
  }
  function roomById(id) { for (var i = 0; i < ROOMS.length; i++) if (ROOMS[i].id === id) return ROOMS[i]; return null; }
  function stepByObj(room, oid) { for (var i = 0; i < room.steps.length; i++) if (room.steps[i].obj === oid) return room.steps[i]; return null; }
  function objById(room, oid) { for (var i = 0; i < room.objects.length; i++) if (room.objects[i].id === oid) return room.objects[i]; return null; }
  function fmt(sec) { sec = Math.max(0, Math.floor(sec)); var m = Math.floor(sec / 60), s = sec % 60; return m + ':' + (s < 10 ? '0' : '') + s; }
  function elapsed(run) { return (run.acc + (run.since ? Date.now() - run.since : 0)) / 1000; }
  function totalHints(run) { var n = 0; for (var k in run.hints) n += run.hints[k]; return n; }
  function stars(room, run, secs) {
    var h = totalHints(run), st = 3;
    if (h > 2) st--; if (h > 6) st--; if (secs > room.par[run.level]) st--;
    return Math.max(1, st);
  }
  function available(room, run, step) {
    if (step.after && !run.solved[step.after]) return false;
    return (step.need || []).every(function (n) { return run.inv.indexOf(n) >= 0; });
  }
  function newRun(room) {
    return { room: room.id, level: lv(), started: false, done: false, acc: 0, since: null, solved: {}, inv: [], hints: {}, wrong: 0, wheels: {}, sel: null, item: null, msg: '' };
  }

  function bestKey(room, level) { return room.id + '.' + level; }
  function getBest(room, level) { var b = S.store.get('szabadulo', {}); return b[bestKey(room, level)] || null; }

  /* ---------- szobaválasztó ---------- */
  function hub(main) {
    var level = lv();
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Szabadulószoba</span></nav>' +
      '<h1>🔐 Szabadulószoba</h1><p class="lead">Bezártak! Fejtsd meg a tananyagra épülő rejtvényeket, nyisd ki a számzárakat és betűzárakat, gyűjtsd és kombináld a tárgyakat – és juss ki minél gyorsabban.</p>' +
      '<div class="card pad sz-lvbar"><div><b>' + (level === 'egyetem' ? '🎓 Egyetemi szint' : '🎒 Iskolai szint') + '</b><br><small class="muted">' +
      (level === 'egyetem' ? 'Ugyanazok a szobák, nehezebb feladatokkal: RC-időállandó, pH-számítás, hexadecimális kód, komplex számok, Vigenère-rejtjel, genetika…' : 'Barátságos számok és rövid magyarázatok. Ha kihívásra vágysz, próbáld ki az egyetemi változatot!') +
      '</small></div><button type="button" class="btn sm" id="sz-lv">' + (level === 'egyetem' ? '🎒 Váltás iskolai szintre' : '🎓 Váltás egyetemi szintre') + '</button></div>' +
      '<div class="sz-hub">' + ROOMS.map(function (r) {
        var b = getBest(r, level), run = runs[r.id + '|' + level];
        return '<a class="card sz-room" href="#/szabadulo/' + r.id + '"><div class="sz-thumb"><svg viewBox="0 0 800 480" aria-hidden="true">' + r.scene() + '</svg></div>' +
          '<div class="sz-rbody"><b>' + r.icon + ' ' + r.title + '</b><small class="muted">' + r.teaser + '</small><small class="sz-tags">' + r.tags + ' · ' + r.steps.length + ' lakat</small>' +
          '<span class="sz-best">' + (b ? '🏆 Legjobb: <b>' + fmt(b.t) + '</b> · ' + '★★★'.slice(0, b.stars) + '<span class="sz-dim">' + '★★★'.slice(b.stars) + '</span>' : (run && run.started && !run.done ? '⏸ Folyamatban…' : 'Még nem jutottál ki')) + '</span></div></a>';
      }).join('') + '</div>' +
      '<div class="card pad sz-how"><h2>Hogyan játssz?</h2><ul><li>Kattints (koppints) a szoba tárgyaira – a rejtvény a jobb oldalon / alatta jelenik meg.</li><li>A <b>számzár</b> és a <b>betűzár</b> kerekeit a ▲ ▼ gombokkal forgathatod, vagy be is gépelheted a kódot.</li>' +
      '<li>A megtalált tárgyak a <b>hátizsákba</b> kerülnek. Néhányat <b>össze kell kombinálnod</b>: válaszd ki az egyiket, majd a „Kombinálás” gombot.</li><li>Elakadtál? Kérj <b>tippet</b> – rejtvényenként 3 szint, egyre többet elárulnak (de csillagba kerülnek).</li>' +
      '<li>⭐⭐⭐: legfeljebb 2 tipp és a szintidőn belül. Több tipp vagy hosszabb idő egy-egy csillagot visz.</li></ul></div>';
    main.querySelector('#sz-lv').addEventListener('click', function () { if (S.setLevel) S.setLevel(level === 'egyetem' ? 'iskolai' : 'egyetem'); });
    return true;
  }

  /* ---------- egy szoba ---------- */
  function play(main, room) {
    var key = room.id + '|' + lv(), run = runs[key];
    if (!run || run.done) run = runs[key] = newRun(room);
    if (!run.started) return intro(main, room, run);
    if (run.done) return result(main, room, run);
    run.since = Date.now();
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/szabadulo">Szabadulószoba</a><span>›</span><span>' + room.title + '</span></nav>' +
      '<div class="sz-bar card"><b class="sz-title">' + room.icon + ' ' + room.title + ' <small class="muted">' + (run.level === 'egyetem' ? '🎓' : '🎒') + '</small></b>' +
      '<span class="sz-stat" title="Eltelt idő">⏱ <b id="sz-time">' + fmt(elapsed(run)) + '</b></span><span class="sz-stat" title="Felhasznált tippek">💡 <b id="sz-hc">0</b></span><span class="sz-stat" title="Kinyitott lakatok">🔓 <b id="sz-prog">0</b>/' + room.steps.length + '</span>' +
      '<button type="button" class="btn sm" data-act="restart">↺ Újrakezdés</button></div>' +
      '<div class="sz-play"><div class="sz-left"><div class="sz-stage card"><svg class="sz-scene" viewBox="0 0 800 480" role="group" aria-label="' + room.title + ' – kattintható tárgyakkal">' + room.scene() + '</svg></div>' +
      '<div class="sz-objs" aria-label="Tárgyak a szobában">' + room.objects.map(function (o) { return '<button type="button" class="chip sz-chip" data-obj="' + o.id + '">' + o.icon + ' ' + o.name + '</button>'; }).join('') + '</div></div>' +
      '<div class="sz-right"><div class="sz-panel card pad" id="sz-panel" aria-live="polite"></div><div class="sz-bag card pad" id="sz-bag"></div></div></div>';
    room.objects.forEach(function (o) { var g = main.querySelector('.sz-scene [data-obj="' + o.id + '"]'); if (g) g.setAttribute('aria-label', o.name); });
    var scene = main.querySelector('.sz-scene');
    function pick(oid) { run.sel = oid; run.msg = ''; paintPanel(); paintScene(); var p = main.querySelector('#sz-panel'); if (window.innerWidth < 900 && p && p.scrollIntoView) p.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    scene.addEventListener('click', function (e) { var g = e.target.closest('[data-obj]'); if (g) pick(g.getAttribute('data-obj')); });
    scene.addEventListener('keydown', function (e) { var g = e.target.closest && e.target.closest('[data-obj]'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pick(g.getAttribute('data-obj')); } });
    main.querySelector('.sz-objs').addEventListener('click', function (e) { var b = e.target.closest('[data-obj]'); if (b) pick(b.getAttribute('data-obj')); });
    main.querySelector('[data-act="restart"]').addEventListener('click', function () { if (confirm('Biztosan elölről kezded? Az idő és a tárgyak elvesznek.')) { runs[key] = newRun(room); play(main, room); } });

    function paintScene() {
      var cls = 'sz-scene';
      room.steps.forEach(function (st) { if (run.solved[st.id]) cls += ' s-' + st.id; });
      scene.setAttribute('class', cls);
      scene.querySelectorAll('[data-until]').forEach(function (el) { el.style.display = run.solved[el.getAttribute('data-until')] ? 'none' : ''; });
      scene.querySelectorAll('[data-after]').forEach(function (el) { el.style.display = run.solved[el.getAttribute('data-after')] ? '' : 'none'; });
      room.objects.forEach(function (o) {
        var st = stepByObj(room, o.id), state = !st ? 'info' : run.solved[st.id] ? 'done' : available(room, run, st) ? 'open' : 'locked';
        [scene.querySelector('[data-obj="' + o.id + '"]'), main.querySelector('.sz-chip[data-obj="' + o.id + '"]')].forEach(function (el) {
          if (!el) return;
          el.setAttribute('data-state', state);
          if (el.classList) { if (run.sel === o.id) el.classList.add('sel'); else el.classList.remove('sel'); }
        });
      });
      var n = 0; for (var k in run.solved) n++;
      main.querySelector('#sz-prog').textContent = n;
      main.querySelector('#sz-hc').textContent = totalHints(run);
    }

    function lockHtml(st, v) {
      var alpha = v.lock === 'num' ? '0123456789' : (v.alpha || AZ), len = v.answer.length, w = run.wheels[st.id];
      if (!w || w.length !== len) w = run.wheels[st.id] = []; for (var i = 0; i < len; i++) if (w[i] == null) w[i] = 0;
      return '<div class="sz-lock ' + (v.lock === 'num' ? 'sz-num' : 'sz-abc') + '" data-alpha="' + alpha + '"><div class="sz-lockhead">' + (v.lock === 'num' ? '🔢 Számzár' : '🔤 Betűzár' + (v.alpha ? ' (' + v.alpha.split('').join(', ') + ')' : '')) + ' · ' + len + ' ' + (v.lock === 'num' ? 'számjegy' : 'betű') + '</div>' +
        '<div class="sz-wheels">' + w.map(function (k, i) {
          return '<div class="sz-wheel"><button type="button" class="sz-up" data-w="' + i + '" data-d="-1" aria-label="' + (i + 1) + '. kerék vissza">▲</button><span class="sz-val" data-v="' + i + '">' + alpha.charAt(k) + '</span><button type="button" class="sz-dn" data-w="' + i + '" data-d="1" aria-label="' + (i + 1) + '. kerék előre">▼</button></div>'; }).join('') + '</div>' +
        '<div class="sz-type"><input type="text" class="sz-input" maxlength="' + len + '" autocomplete="off" autocapitalize="characters" spellcheck="false" inputmode="' + (v.lock === 'num' ? 'numeric' : 'text') + '" aria-label="Kód begépelése" placeholder="vagy írd be…" value="' + w.map(function (k) { return alpha.charAt(k); }).join('') + '">' +
        '<button type="button" class="btn primary sz-open">🔓 Nyitás</button></div></div>';
    }

    function paintPanel() {
      var p = main.querySelector('#sz-panel'), o = run.sel && objById(room, run.sel);
      if (!o) {
        p.innerHTML = '<h2>🔎 Nézz körül!</h2><p>' + L(room.story) + '</p><p class="muted">Kattints a szoba tárgyaira (vagy a lenti gombokra). A ✓ jel a már kinyitott tárgyakat jelöli.</p>';
        return;
      }
      var st = stepByObj(room, o.id), h = '<h2>' + o.icon + ' ' + o.name + '</h2>';
      if (run.msg) h += '<div class="sz-msg">' + run.msg + '</div>';
      if (!st) { h += L(o.info) + (o.extra ? o.extra() : ''); p.innerHTML = h; return; }
      var v = V(st, run.level);
      if (run.solved[st.id]) {
        h += '<p class="sz-ok">✔ Kinyitva! ' + st.msg + '</p><p><b>Megoldás:</b> <span class="sz-mono">' + v.answer + '</span></p><p class="muted">' + v.explain + '</p>';
      } else if (!available(room, run, st)) {
        h += '<p>' + st.locked + '</p><p class="muted sz-lockedtag">🔒 Ezt még nem tudod kinyitni.</p>';
      } else {
        var used = run.hints[st.id] || 0;
        h += '<div class="sz-clue">' + v.clue + '</div>' + (st.extra ? st.extra() : '') + lockHtml(st, v) +
          '<div class="sz-hints">' + v.hints.slice(0, used).map(function (t, k) { return '<div class="sz-hint"><b>💡 ' + (k + 1) + '. tipp:</b> ' + t + '</div>'; }).join('') +
          (used < 3 ? '<button type="button" class="btn sm sz-hintbtn">💡 Tipp kérése (' + (used + 1) + '/3)</button>' : '') + '</div>';
      }
      p.innerHTML = h;
      var lock = p.querySelector('.sz-lock');
      if (!lock) return;
      var alpha = lock.getAttribute('data-alpha'), inp = lock.querySelector('.sz-input'), w = run.wheels[st.id];
      function sync() { w.forEach(function (k, i) { lock.querySelector('[data-v="' + i + '"]').textContent = alpha.charAt(k); }); inp.value = w.map(function (k) { return alpha.charAt(k); }).join(''); }
      lock.querySelectorAll('[data-w]').forEach(function (b) {
        b.addEventListener('click', function () { var i = +b.getAttribute('data-w'); w[i] = (w[i] + (+b.getAttribute('data-d')) + alpha.length) % alpha.length; sync(); });
      });
      inp.addEventListener('input', function () {
        var t = norm(inp.value).split('').filter(function (c) { return alpha.indexOf(c) >= 0; }).join('').slice(0, w.length);
        for (var i = 0; i < t.length; i++) { w[i] = alpha.indexOf(t.charAt(i)); lock.querySelector('[data-v="' + i + '"]').textContent = t.charAt(i); }
        if (inp.value !== t) inp.value = t;
      });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); tryOpen(); } });
      lock.querySelector('.sz-open').addEventListener('click', tryOpen);
      var hb = p.querySelector('.sz-hintbtn');
      if (hb) hb.addEventListener('click', function () { run.hints[st.id] = (run.hints[st.id] || 0) + 1; run.msg = ''; paintPanel(); paintScene(); });
      function tryOpen() {
        var guess = w.map(function (k) { return alpha.charAt(k); }).join('');
        if (norm(guess) === norm(v.answer)) {
          run.solved[st.id] = true;
          (st.need || []).forEach(function (n) { var ix = run.inv.indexOf(n); if (ix >= 0) run.inv.splice(ix, 1); });
          (st.give || []).forEach(function (n) { if (run.inv.indexOf(n) < 0) run.inv.push(n); });
          run.msg = '';
          if (st.final) return finish();
          paintPanel(); paintScene(); paintBag();
          var nb = main.querySelector('#sz-bag'); if (st.give && nb) { nb.classList.remove('sz-flash'); void nb.offsetWidth; nb.classList.add('sz-flash'); }
        } else {
          run.wrong++;
          lock.classList.remove('sz-shake'); void lock.offsetWidth; lock.classList.add('sz-shake');
          var m = p.querySelector('.sz-msg') || document.createElement('div'); m.className = 'sz-msg bad'; m.textContent = '🔒 Nem nyílt ki. Ellenőrizd a számolást – vagy kérj tippet!';
          if (!m.parentNode) p.insertBefore(m, p.children[1]);
        }
      }
    }

    function paintBag() {
      var b = main.querySelector('#sz-bag');
      if (run.item && run.inv.indexOf(run.item) < 0) run.item = null;
      var h = '<h2>🎒 Hátizsák</h2>';
      if (!run.inv.length) h += '<p class="muted">Még üres. A kinyitott zárak mögött talált tárgyak ide kerülnek.</p>';
      else h += '<div class="sz-items">' + run.inv.map(function (id) { var it = room.items[id]; return '<button type="button" class="sz-item' + (run.item === id ? ' sel' : '') + '" data-item="' + id + '"><span>' + it.icon + '</span>' + it.name + '</button>'; }).join('') + '</div>';
      if (run.item) {
        var it = room.items[run.item], others = run.inv.filter(function (x) { return x !== run.item; });
        h += '<div class="sz-itemd"><b>' + it.icon + ' ' + it.name + '</b><p>' + L(it.desc) + '</p>' + (it.pic ? it.pic(run.level) : '') +
          (others.length ? '<p class="sz-combo"><small class="muted">🔗 Kombinálás ezzel:</small> ' + others.map(function (x) { return '<button type="button" class="btn sm" data-combine="' + x + '">' + room.items[x].icon + ' ' + room.items[x].name + '</button>'; }).join(' ') + '</p>' : '') + '<div class="sz-cmsg"></div></div>';
      }
      b.innerHTML = h;
      b.querySelectorAll('[data-item]').forEach(function (x) { x.addEventListener('click', function () { var id = x.getAttribute('data-item'); run.item = run.item === id ? null : id; paintBag(); }); });
      b.querySelectorAll('[data-combine]').forEach(function (x) {
        x.addEventListener('click', function () {
          var o2 = x.getAttribute('data-combine'), a = run.item, c = room.combos.filter(function (c) { return (c.a === a && c.b === o2) || (c.a === o2 && c.b === a); })[0];
          if (!c) { b.querySelector('.sz-cmsg').innerHTML = '<p class="sz-msg bad">Ez a kettő nem illik össze.</p>'; return; }
          run.inv = run.inv.filter(function (q) { return q !== c.a && q !== c.b; }); run.inv.push(c.make); run.item = c.make;
          paintBag(); paintScene(); if (run.sel) paintPanel();
          b.querySelector('.sz-cmsg').innerHTML = '<p class="sz-msg">✨ ' + c.msg + '</p>';
        });
      });
    }

    function finish() {
      run.acc += Date.now() - run.since; run.since = null; run.done = true; run.secs = Math.round(elapsed(run));
      var b = S.store.get('szabadulo', {}), k = bestKey(room, run.level), old = b[k], st = stars(room, run, run.secs);
      run.stars = st; run.record = !old || run.secs < old.t;
      b[k] = { t: Math.round(old && old.t < run.secs ? old.t : run.secs), stars: Math.max(st, old ? old.stars : 0), hints: run.record ? totalHints(run) : old.hints, plays: (old && old.plays || 0) + 1 };
      S.store.set('szabadulo', b);
      if (S.logActivity) S.logActivity('game', 'szabadulo');
      result(main, room, run);
    }

    paintScene(); paintPanel(); paintBag();
    clearInterval(timer);
    timer = setInterval(function () {
      var t = document.getElementById('sz-time');
      if (!t || run.done || location.hash.indexOf('#/szabadulo/' + room.id) !== 0 || lv() !== run.level) { if (run.since) { run.acc += Date.now() - run.since; run.since = null; } clearInterval(timer); return; }
      t.textContent = fmt(elapsed(run));
    }, 500);
    return true;
  }

  function intro(main, room, run) {
    var b = getBest(room, run.level);
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/szabadulo">Szabadulószoba</a><span>›</span><span>' + room.title + '</span></nav>' +
      '<div class="card sz-intro"><svg viewBox="0 0 800 480" aria-hidden="true">' + room.scene() + '</svg><div class="pad"><h1>' + room.icon + ' ' + room.title + '</h1>' +
      '<p class="sz-level">' + (run.level === 'egyetem' ? '🎓 Egyetemi változat' : '🎒 Iskolai változat') + ' · ' + room.steps.length + ' lakat · szintidő: ' + fmt(room.par[run.level]) + (b ? ' · 🏆 legjobb időd: ' + fmt(b.t) : '') + '</p>' +
      '<p class="sz-story">' + L(room.story) + '</p><p><button type="button" class="btn primary" id="sz-go">▶ Indulás – az óra elindul!</button> <a class="btn" href="#/szabadulo">Másik szoba</a></p></div></div>';
    main.querySelector('#sz-go').addEventListener('click', function () { run.started = true; play(main, room); var bar = main.querySelector('.sz-bar'); if (bar && bar.scrollIntoView) bar.scrollIntoView({ block: 'start' }); });
    return true;
  }

  function result(main, room, run) {
    var b = getBest(room, run.level), h = totalHints(run), idx = ROOMS.indexOf(room), next = ROOMS[(idx + 1) % ROOMS.length];
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/szabadulo">Szabadulószoba</a><span>›</span><span>' + room.title + '</span></nav>' +
      '<div class="card pad sz-result"><div class="sz-bigstar" aria-label="' + run.stars + ' csillag">' + '★★★'.slice(0, run.stars) + '<span class="sz-dim">' + '★★★'.slice(run.stars) + '</span></div>' +
      '<h1>🎉 Kijutottál!</h1><p class="sz-story">' + room.outro + '</p>' +
      '<div class="sz-res-grid"><div><small>Idő</small><b>' + fmt(run.secs) + '</b></div><div><small>Felhasznált tippek</small><b>' + h + '</b></div><div><small>Hibás próbálkozás</small><b>' + run.wrong + '</b></div><div><small>Legjobb idő</small><b>' + (b ? fmt(b.t) : '–') + '</b></div></div>' +
      (run.record ? '<p class="sz-ok">🏆 Új egyéni csúcs ezen a szinten!</p>' : '') +
      '<p class="muted">Csillagok: ⭐⭐⭐ ha legfeljebb 2 tippet használsz és a szintidőn (' + fmt(room.par[run.level]) + ') belül végzel; 3 tipp fölött és 6 tipp fölött, valamint szintidő túllépésekor egy-egy csillag elvész.</p>' +
      '<details class="sz-sol"><summary>📘 A rejtvények megoldásai</summary><ol>' + room.steps.map(function (st) { var v = V(st, run.level), o = objById(room, st.obj); return '<li><b>' + o.icon + ' ' + o.name + ':</b> <span class="sz-mono">' + v.answer + '</span> – ' + v.explain + '</li>'; }).join('') + '</ol></details>' +
      '<p class="row" style="justify-content:center"><button type="button" class="btn primary" id="sz-again">🔁 Újra</button><a class="btn" href="#/szabadulo/' + next.id + '">' + next.icon + ' Következő szoba</a><a class="btn" href="#/szabadulo">Szobaválasztó</a></p></div>';
    main.querySelector('#sz-again').addEventListener('click', function () { runs[room.id + '|' + run.level] = newRun(room); play(main, room); });
    return true;
  }

  S.addRoute('szabadulo', { title: 'Szabadulószoba', nav: '', page: function (main, rest) {
    if (!rest || !rest.length) return hub(main);
    var room = roomById(rest[0]);
    if (!room) return false;
    return play(main, room);
  } });

  /* a node-os ellenőrzéshez */
  S.szabadulo = { rooms: ROOMS, norm: norm, elements: ELEM, colors: COLORS };
})();
