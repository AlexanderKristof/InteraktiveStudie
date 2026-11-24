/* Modell: lakás elosztószekrénye – szemből nézve, DIN sínes készülékekkel. */
(function () {
  var M = 26;                      // egy modul (17,5 mm) szélessége a rajzon
  var R1 = 95, R2 = 265, H = 110;  // a két készüléksor teteje és a készülékek magassága
  var NS = ' pointer-events="none"';

  function rect(x, y, w, h, fill, stroke, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"' +
      (stroke ? ' stroke="' + stroke + '" stroke-width="1.2"' : '') + (extra || '') + '/>';
  }
  function txt(x, y, s, size, fill, weight) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="sans-serif" font-size="' + size + '" font-weight="' + (weight || 700) + '" fill="' + fill + '"' + NS + '>' + s + '</text>';
  }
  function screw(x, y) {
    return '<circle cx="' + x + '" cy="' + y + '" r="5" fill="#b9c0ca" stroke="#6b7482" stroke-width="1"/>' +
      '<path d="M' + (x - 3) + ' ' + (y + 2) + 'L' + (x + 3) + ' ' + (y - 2) + '" stroke="#555d69" stroke-width="1.4"/>';
  }
  /* Egy moduláris készülék: fehér test, középen a kiemelt előlap, felül-alul csavaros kapcsok. */
  function device(x, y, mods, o) {
    var w = mods * M - 2, s = '';
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + H + '" rx="4" fill="#e9ecf0" stroke="#7b8494" stroke-width="1.2"/>';
    s += '<rect x="' + (x + 2) + '" y="' + (y + 22) + '" width="' + (w - 4) + '" height="' + (H - 44) + '" rx="3" fill="#f7f8fa" stroke="#b3bac5" stroke-width="1"/>';
    (o.top || []).forEach(function (cx) { s += screw(x + cx, y + 11); });
    (o.bot || []).forEach(function (cx) { s += screw(x + cx, y + H - 11); });
    return s;
  }
  function lever(x, y, w, color, on) {
    // a kapcsolókar: sötét ablak, benne a színes kar (bekapcsolva felfelé áll)
    return '<rect x="' + (x + w / 2 - 7) + '" y="' + (y + 40) + '" width="14" height="30" rx="3" fill="#3a3f48"/>' +
      '<rect x="' + (x + w / 2 - 5) + '" y="' + (y + (on ? 42 : 54)) + '" width="10" height="14" rx="2" fill="' + color + '"/>';
  }

  // ---------- Elosztódoboz (hátsó rész) ----------
  var box = '<rect x="170" y="40" width="300" height="470" rx="10" fill="#cdd2da" stroke="#7d8696" stroke-width="1.5"/>' +
    '<rect x="182" y="52" width="276" height="446" rx="6" fill="#b9c0ca" stroke="#97a0ae" stroke-width="1"/>';
  [[249, 46], [275, 46], [205, 46], [320, 504], [300, 504], [340, 504]].forEach(function (k) {
    box += '<ellipse cx="' + k[0] + '" cy="' + k[1] + '" rx="9" ry="4" fill="#9aa3b0" stroke="#7d8696"/>';
  });

  // ---------- DIN sínek ----------
  var din = '';
  [R1 + H / 2, R2 + H / 2].forEach(function (cy) {
    din += '<rect x="188" y="' + (cy - 17) + '" width="264" height="34" rx="2" fill="#a7afbb" stroke="#6f7887" stroke-width="1.2"/>' +
      '<rect x="188" y="' + (cy - 12) + '" width="264" height="24" fill="#bcc3cd" stroke="none"/>';
    for (var sx = 194; sx < 446; sx += 24) din += '<rect x="' + sx + '" y="' + (cy - 3) + '" width="14" height="6" rx="3" fill="#7d8696"/>';
  });

  // ---------- Készülékek ----------
  var MS = 236, SPD = 294, FI = 352, MCB0 = 242;   // bal szélük x koordinátája
  var main = device(MS, R1, 2, { top: [13, 39], bot: [13, 39] }) + lever(MS, R1, 50, '#d64545', true) +
    txt(MS + 25, R1 + 34, 'FŐKAPCSOLÓ', 6.5, '#3a3f48') + txt(MS + 25, R1 + 82, '0 / I  40 A', 7, '#3a3f48');
  var spd = device(SPD, R1, 2, { top: [25], bot: [13, 39] }) +
    '<rect x="' + (SPD + 13) + '" y="' + (R1 + 42) + '" width="24" height="12" rx="2" fill="#3fbf6b" stroke="#2a8a4b"/>' +
    txt(SPD + 25, R1 + 34, 'T2 SPD', 7.5, '#3a3f48') + txt(SPD + 25, R1 + 68, 'Uc 275 V', 6.5, '#555d69', 600) + txt(SPD + 25, R1 + 82, '⚡ 20 kA', 7, '#3a3f48');
  var fi = device(FI, R1, 2, { top: [13, 39], bot: [13, 39] }) + lever(FI - 9, R1, 50, '#2f6fd6', true) +
    '<circle cx="' + (FI + 37) + '" cy="' + (R1 + 55) + '" r="6" fill="#f2c14e" stroke="#a77d12"/>' + txt(FI + 37, R1 + 58, 'T', 8, '#5a3d00') +
    txt(FI + 25, R1 + 34, 'FI  40 A', 7.5, '#3a3f48') + txt(FI + 25, R1 + 82, 'IΔn 30 mA', 7, '#c23b3b');
  var labels = ['B10', 'B10', 'B16', 'B16', 'B16', 'B16'];
  var mcb = '';
  labels.forEach(function (l, i) {
    var x = MCB0 + i * M;
    mcb += device(x, R2, 1, { top: [12], bot: [12] }) + lever(x, R2, 24, '#f2f3f5', true) +
      txt(x + 12, R2 + 34, l, 8, '#3a3f48');
  });
  // Fésűs sín: rézfésű a kismegszakítók felső kapcsain, szigetelő burkolattal
  mcb += '<rect x="' + (MCB0 + 2) + '" y="' + (R2 + 4) + '" width="' + (labels.length * M - 6) + '" height="9" rx="2" fill="#e0a25a" stroke="#9a6420" stroke-width="1"/>' +
    '<rect x="' + (MCB0 + 2) + '" y="' + (R2 + 4) + '" width="' + (labels.length * M - 6) + '" height="4" rx="2" fill="rgba(255,255,255,.35)"' + NS + '/>';

  // ---------- Gyűjtősínek ----------
  function bus(x, base, stripe, n) {
    var s = '<rect x="' + x + '" y="448" width="106" height="24" rx="4" fill="' + base + '" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/>';
    if (stripe) for (var k = 0; k < 106; k += 14) s += '<rect x="' + (x + k) + '" y="448" width="7" height="24" fill="' + stripe + '"' + NS + '/>';
    s += '<rect x="' + (x + 4) + '" y="453" width="98" height="10" rx="2" fill="#d9b24a" stroke="#9a7a1c" stroke-width="1"/>';
    for (var j = 0; j < n; j++) s += screw(x + 11 + j * 14, 458).replace('r="5"', 'r="4"');
    return s;
  }
  var nbus = bus(340, '#2f6fd6', null, 7);
  var pebus = bus(194, '#2e9d4f', '#f2d23c', 7);

  // ---------- Vezetékek ----------
  function wire(d, color, stripe) {
    var s = '<path d="' + d + '" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
    if (stripe) s += '<path d="' + d + '" fill="none" stroke="' + stripe + '" stroke-width="4" stroke-dasharray="7 7"' + NS + '/>';
    return s;
  }
  var BR = '#8a5a2b', BK = '#262a30', BL = '#2f6fd6', GN = '#2e9d4f', YE = '#f2d23c';
  var tL1 = MS + 13, tN1 = MS + 39, fL = FI + 13, fN = FI + 39;
  var phase = '', neutral = '', pe = '';
  // Betáp a mérőóra felől
  phase += wire('M' + tL1 + ' 4 V' + (R1 + 11), BR);
  neutral += wire('M' + tN1 + ' 4 V' + (R1 + 11), BL);
  pe += wire('M205 4 V448', GN, YE);
  // Főkapcsoló → túlfeszültség-levezető (alsó kapcsok)
  phase += wire('M' + tL1 + ' ' + (R1 + 99) + ' V214 H' + (SPD + 13) + ' V' + (R1 + 99), BR);
  neutral += wire('M' + tN1 + ' ' + (R1 + 99) + ' V220 H' + (SPD + 39) + ' V' + (R1 + 99), BL);
  // Túlfeszültség-levezető → PE sín (a felső kapocsról)
  pe += wire('M' + (SPD + 25) + ' ' + (R1 + 11) + ' V80 H215 V448', GN, YE);
  // Főkapcsoló → FI relé (felülről, a jobb oldalon kerülve)
  phase += wire('M' + tL1 + ' ' + (R1 + 99) + ' V226 H424 V76 H' + fL + ' V' + (R1 + 11), BR);
  neutral += wire('M' + tN1 + ' ' + (R1 + 99) + ' V232 H432 V70 H' + fN + ' V' + (R1 + 11), BL);
  // FI → fésűs sín (fázis) és FI → N sín
  phase += wire('M' + fL + ' ' + (R1 + 99) + ' V244 H' + (MCB0 + 12) + ' V' + (R2 + 8), BR);
  neutral += wire('M' + fN + ' ' + (R1 + 99) + ' V238 H444 V458 H' + (340 + 11 + 6 * 14), BL);
  // Kimenő áramkörök: fázis a kismegszakítókból, N és PE a sínekről
  labels.forEach(function (l, i) {
    var x = MCB0 + 12 + i * M, gx = 306 + i * 5.6;
    phase += wire('M' + x + ' ' + (R2 + H - 11) + ' V' + (392 + i * 6) + ' H' + gx + ' V556', l === 'B10' ? BK : BR);
    neutral += wire('M' + (351 + i * 14) + ' 458 V' + (486 + (i % 2) * 6) + ' L' + (351 + i * 14) + ' 556', BL);
    pe += wire('M' + (219 + i * 14) + ' 458 V556', GN, YE);
  });
  phase += '<text class="lbl-muted" x="' + (tN1 + 10) + '" y="22">betáp a mérőóra felől</text>';

  // ---------- Fedél (takarólemez) ----------
  var cover = '<path fill-rule="evenodd" fill="rgba(236,239,243,.7)" stroke="#8d97a6" stroke-width="1.5" d="' +
    'M174 44 H466 V506 H174 Z M190 ' + (R1 + 22) + ' H450 V' + (R1 + H - 22) + ' H190 Z M190 ' + (R2 + 22) + ' H450 V' + (R2 + H - 22) + ' H190 Z"/>' +
    '<rect x="174" y="44" width="292" height="462" rx="8" fill="none" stroke="#a7b0bd" stroke-width="3"' + NS + '/>';
  ['Világítás', 'Világítás', 'Szobák', 'Konyha', 'Fürdő', 'Mosógép'].forEach(function (n, i) {
    var cx = MCB0 + 12 + i * M;
    cover += '<rect x="' + (cx - 11) + '" y="' + (R2 + H - 16) + '" width="22" height="30" rx="2" fill="#fff" stroke="#b3bac5"/>' +
      '<text x="' + cx + '" y="' + (R2 + H + 1) + '" transform="rotate(-90 ' + cx + ' ' + (R2 + H - 1) + ')" text-anchor="middle" font-family="sans-serif" font-size="6.5" fill="#3a3f48"' + NS + '>' + n + '</text>';
  });
  cover += '<path d="M300 40 l20 -18 l20 18 z" fill="#f2c14e" stroke="#a77d12" stroke-width="1.2" transform="translate(0 440)"/>' +
    txt(320, 476, '!', 13, '#3a3f48') + txt(320, 494, '230 V', 9, '#3a3f48');

  var L = -140; // szétszedéskor minden balra csúszik, a fedél jobbra
  STUDIE.addModel({
    id: 'elosztoszekreny',
    title: 'Lakás elosztószekrénye',
    icon: '🗄️',
    color: '#2f6fd6',
    category: 'Villamosság',
    keywords: 'elosztó elosztószekrény elosztódoboz kiselosztó lakáselosztó főkapcsoló kismegszakító biztosíték FI relé ÁVK áram-védőkapcsoló túlfeszültség-levezető SPD DIN sín nulla védőföld PE N fázis vezeték szín villanyszerelés',
    summary: 'Ide érkezik a lakás áramellátása, és innen indul szét minden áramkör, védelmekkel felszerelve.',
    scale: 'kb. 30 × 45 cm, egy modul 17,5 mm széles',
    viewBox: '0 0 640 560',
    intro: 'A mérőóra után minden vezeték az **elosztószekrénybe** fut. Itt van a lakás **főkapcsolója**, itt osztják szét az áramot a szobák, a konyha, a fürdő áramköreire, és itt ülnek a **védelmek**, amelyek leoldanak, ha baj van.\n\nA készülékek szabványos, 35 mm-es **DIN sínre** pattannak, és mind ugyanolyan „modul” szélességűek, ezért bármilyen gyártóét össze lehet építeni.\n\n**Fontos:** az elosztóban 230 V van, ami életveszélyes. Kinyitni, bekötni, javítani csak **szakképzett villanyszerelő** szabad. Neked annyi a dolgod, hogy tudd, hol van, és hogyan kapcsold vissza a leoldott kismegszakítót.',
    parts: [
      {
        id: 'fedel', z: 9, name: 'Fedél (takarólemez)', svg: cover, explode: [168, 0], badge: [186, 485],
        what: 'A fedél eltakarja a feszültség alatt lévő vezetékeket és kapcsokat. Csak a készülékek kapcsolókarja látszik ki a nyílásokon, így biztonságosan lehet kapcsolni őket. A kismegszakítók alatt kis **feliratcsíkok** mutatják, melyik áramkört védik.',
        madeOf: 'Lángálló, ütésálló **műanyag** (pl. polikarbonát vagy ABS), sok szekrénynél fém, porfestett acél. A rajzon áttetszőnek rajzoltuk, hogy lásd mögötte a vezetékeket.',
        how: 'Fröccsöntéssel készül. A villanyszerelő a modulok helyét kitöri vagy vakfedéllel zárja le, hogy sehol ne maradjon rés, ahol be lehetne nyúlni.',
        fact: 'Ha a fedelet leveszed, az elosztó **„érintésvédelme”** megszűnik. Ezért fedél nélkül soha nem szabad üzemeltetni.'
      },
      {
        id: 'fokapcsolo', terms: ['villamosmernoki/haromfazisu-rendszer'], z: 4, name: 'Főkapcsoló', svg: main, explode: [L, -22], badge: [MS + 25, R1 + 100], lesson: 'villanyszereles/biztonsag',
        what: 'Ezzel lehet az egész lakást egyszerre áramtalanítani. Kétpólusú: a fázist és a nullát is bontja. Javítás előtt ezt kapcsolják le, és **lakattal vagy táblával** jelzik, hogy senki ne kapcsolja vissza.',
        madeOf: 'Műanyag ház, benne **ezüstötvözet bevonatú réz érintkezők**, rugós kapcsolómechanika és ívoltó kamra.',
        how: 'Az érintkezőket sajtolják és ezüstözik, a mechanikát automata gépsoron szerelik össze a fröccsöntött házba. Minden darabot próbapadon kapcsolgatnak és mérnek.'
      },
      {
        id: 'spd', z: 4, name: 'Túlfeszültség-levezető', svg: spd, explode: [L, -22], badge: [SPD + 25, R1 + 100],
        what: 'Villámcsapáskor vagy hálózati kapcsolásnál a vezetékekben egy pillanatra több ezer voltos feszültségcsúcs futhat végig. A levezető ezt a „löketet” a **védőföld** felé vezeti el, mielőtt tönkretenné a tévét vagy a hűtőt. A zöld ablak azt jelzi, hogy még működőképes.',
        madeOf: 'A lelke egy **varisztor**: cink-oxid kerámia tárcsa, ami normál feszültségen szigetel, túlfeszültségnél viszont hirtelen vezetni kezd. Mellette hőkioldó, ami a kiégett varisztort lekapcsolja.',
        how: 'A cink-oxid port kis tárcsákká préselik, kiégetik (szinterelik), fém elektródákat visznek fel rá, és betokozzák. A cserélhető betétet egy talpba dugják.'
      },
      {
        id: 'fi', terms: ['villamosmernoki/aram-vedokapcsolo', 'villamosmernoki/erintesvedelem'], z: 4, name: 'FI relé (ÁVK, 30 mA)', svg: fi, explode: [L, -22], badge: [FI + 25, R1 + 100], lesson: 'villanyszereles/vedelmek',
        what: 'Az **áram-védőkapcsoló** az embert védi az áramütéstől. Folyamatosan összehasonlítja a fázison bemenő és a nullán visszajövő áramot. Ha a kettő között **30 mA-nél** nagyobb a különbség, az áram valahol máshol folyik el, például egy ember testén át a föld felé, és ekkor a másodperc töredéke alatt (jellemzően 20–40 ezredmásodperc alatt) lekapcsol.\n\nA sárga **T** (teszt) gombbal félévente érdemes kipróbálni: ha működik, azonnal leold.',
        madeOf: 'Egy gyűrű alakú **vasmag** (összegző áramváltó), amin a fázis és a nulla is átmegy, egy érzékeny kioldórelé, rugós kapcsolómechanika és ezüstözött réz érintkezők.',
        how: 'A nagyon érzékeny, nagy permeabilitású ötvözetből készült gyűrűmagot feltekercselik, a relét pontosan beállítják. Minden FI relét gyári próbán ellenőriznek, hogy a megadott hibaáramnál és időn belül leoldjon.',
        fact: 'A 30 mA-es FI relé kötelező a lakások aljzatos áramköreiben. Egy bekapcsolva maradt hajszárító kádba esésekor is életet menthet.'
      },
      {
        id: 'mcb', terms: ['villamosmernoki/zarlati-aram'], z: 4, name: 'Kismegszakítók és fésűs sín', svg: mcb, explode: [L, -16], lesson: 'villanyszereles/vedelmek',
        what: 'Minden áramkörnek saját kismegszakítója van. **Túlterheléskor** (túl sok fogyasztó egy körön) egy hőre hajló ikerfém, **rövidzárlatkor** egy gyors mágneses tekercs oldja le. A kismegszakító elsősorban a **vezetéket** védi a túlmelegedéstől.\n\n- **B10**: 10 A, világítás (1,5 mm² vezeték)\n- **B16**: 16 A, aljzatok (2,5 mm² vezeték)\n\nA „B” betű a kioldási jelleggörbe: a névleges áram 3–5-szörösénél azonnal old.\n\nA tetejükön futó rézfésű, a **fésűs sín** osztja el a fázist az összes kismegszakító között.',
        madeOf: 'Műanyag ház, **ikerfém** (két különböző hőtágulású fém összehengerelve), rézhuzal tekercs vasmaggal, ezüstözött érintkezők és egy **ívoltó kamra** acéllemezekből, amely szétszakítja a lekapcsoláskor keletkező szikrát. A fésűs sín rézből van, műanyag szigeteléssel.',
        how: 'Évente százmilliókat gyártanak teljesen automatizált gépsorokon. Minden kész darabon ellenőrzik a kioldást: adott áramra adott időn belül le kell kapcsolnia.',
        fact: 'Ha egy kismegszakító leold, először húzd ki az utoljára bekapcsolt készüléket, és csak utána kapcsold vissza. Ha újra és újra leold, hívj villanyszerelőt.'
      },
      {
        id: 'din', z: 1, name: 'DIN sínek', svg: din, explode: [L, 0],
        what: 'A szabványos, kalap alakú fémsín, amelyre a készülékek rápattannak. A szélessége 35 mm, ezért bármelyik gyártó készüléke felfér rá.',
        madeOf: 'Horganyzott **acél** (ritkábban alumínium) szalag.',
        how: 'Acélszalagból hengerléssel hajlítják kalap profilúra, a hosszú réseket kistanzolják, majd horganyozzák, hogy ne rozsdásodjon. A szekrény hátlapjára csavarozzák.'
      },
      {
        id: 'nsin', z: 2, name: 'N gyűjtősín (kék)', svg: nbus, explode: [L, 14],
        what: 'Ide fut be az FI relé után a **nullavezető**, és innen indul ki minden áramkör kék nullavezetője. Csak a saját FI relé utáni körök nullái kerülhetnek ide, különben az FI relé tévesen oldana le.',
        madeOf: '**Sárgaréz** (réz–cink ötvözet) sín csavaros kapcsokkal, kék műanyag szigetelő talpon.',
        how: 'A sárgaréz rudat darabolják, kifúrják, menetet vágnak bele, a csavarokat behajtják, és a szigetelő talpba pattintják.'
      },
      {
        id: 'pesin', terms: ['villamosmernoki/foldelesi-rendszerek', 'villamosmernoki/erintesvedelem'], z: 2, name: 'PE gyűjtősín (zöld-sárga)', svg: pebus, explode: [L, 14],
        what: 'A **védőföld** gyűjtőpontja. Ide fut a betáp védővezetője, és innen kap védőföldet minden áramkör, a túlfeszültség-levezető és a fémházas készülékek. Ha egy hibás gép háza feszültség alá kerül, az áram a védővezetőn át folyik el, és a védelem lekapcsol.',
        madeOf: 'Sárgaréz sín csavaros kapcsokkal, zöld-sárga jelölésű talpon. A szekrény fém részeit is ide kötik.',
        how: 'Ugyanúgy készül, mint az N sín, csak a színjelölése más. A szerelő minden védővezetőt külön kapocsba köt, hogy egy laza csavar ne szakíthasson meg több kört egyszerre.'
      },
      {
        id: 'fazis', z: 3, name: 'Fázisvezetők (barna, fekete)', svg: phase, explode: [L, 0], badge: [300, 405], lesson: 'villanyszereles/vezetekek',
        what: 'A fázis hozza az áramot: ez van 230 V-on a földhöz képest. Szabványos színe **barna, fekete vagy szürke**. Egyfázisú lakásban a betáp általában barna, a rajzon a világítási körök fekete erekkel indulnak. Háromfázisú bekötésnél L1 barna, L2 fekete, L3 szürke.',
        madeOf: '**Rézvezető** PVC szigeteléssel. Világításhoz 1,5 mm², aljzatokhoz 2,5 mm², a betáphoz 6–10 mm² keresztmetszet szokásos.',
        how: 'A rézhuzalt egyre kisebb lyukakon húzzák át, amíg el nem éri a kívánt vastagságot, majd lágyítják. A szigetelést extrúderrel, színezett műanyagból „húzzák rá”. A szerelő a végeket pontos hosszon csupaszítja, és sodrott erénél érvéghüvelyt sajtol rá.'
      },
      {
        id: 'nulla', z: 3, name: 'Nullavezetők (kék)', svg: neutral, explode: [L, 0], badge: [432, 150], lesson: 'villanyszereles/vezetekek',
        what: 'A nullavezető (N) viszi vissza az áramot. Színe mindig **kék**. Bár normál esetben közel 0 V-on van, hibánál feszültség alá kerülhet, ezért ugyanúgy veszélyesnek kell tekinteni, mint a fázist.',
        madeOf: 'Réz ér kék PVC szigeteléssel, ugyanakkora keresztmetszettel, mint a hozzá tartozó fázis.',
        how: 'Ugyanúgy készül, mint a fázisvezető, csak kék színezékkel. A kék színt más célra nem szabad használni.'
      },
      {
        id: 'vedo', z: 3, name: 'Védővezetők (zöld-sárga)', svg: pe, explode: [L, 0], badge: [205, 300], lesson: 'villanyszereles/vezetekek',
        what: 'A védővezető (PE) normál üzemben nem visz áramot. Csak hiba esetén dolgozik: elvezeti a hibaáramot, hogy a védelem lekapcsolhasson, mielőtt valakit áramütés érne. Színe kizárólag **zöld-sárga**, és ezt a színt semmi másra nem szabad használni.',
        madeOf: 'Réz ér zöld-sárga csíkos PVC szigeteléssel.',
        how: 'A két színt egyszerre extrudálják, így hosszanti csíkok lesznek a szigetelésen. A rajzon ferde csíkozással jelöltük.'
      },
      {
        id: 'doboz', z: 0, name: 'Elosztódoboz', svg: box, explode: [L, 0], badge: [196, 64],
        what: 'A szekrény háza, amelyet a falba süllyesztve vagy a falra szerelve rögzítenek. A tetején és az alján lévő kitörhető nyílásokon jönnek be és mennek ki a kábelek.',
        madeOf: 'Lángálló **műanyag** vagy porfestett **acéllemez**. A fém dobozt a PE sínre kell kötni.',
        how: 'A műanyag dobozt fröccsöntik, a fémet lemezből lézerrel kivágják, hajlítják, hegesztik és porfestik.'
      }
    ],
    steps: [
      { icon: '📝', title: 'Tervezés', text: 'A villanyszerelő felméri, milyen áramkörök kellenek: világítás, aljzatok szobánként, külön kör a konyhai nagy fogyasztóknak, a mosógépnek, a fürdőnek. Ebből számolja ki, hány **modul** hely kell (plusz tartalék), és mekkora szekrény.' },
      { icon: '🔒', title: 'Feszültségmentesítés', text: 'Mielőtt bármihez hozzányúl, a mérőóra előtti szolgáltatói biztosítékot kikapcsoltatja, vagy a saját főkapcsolót bontja, **lezárja** és táblát tesz ki. Ezután műszerrel **ellenőrzi a feszültségmentességet**. Ez az öt biztonsági szabály lényege.' },
      { icon: '🧱', title: 'Doboz és sínek', text: 'Beépíti a **dobozt** a falba vagy a falra, bevezeti a kábeleket, és felszereli a **DIN síneket** és a **gyűjtősíneket**.', parts: ['doboz', 'din', 'nsin', 'pesin'] },
      { icon: '🧩', title: 'Készülékek felpattintása', text: 'Balról jobbra rápattintja a **főkapcsolót**, a **túlfeszültség-levezetőt**, az **FI relét** és a **kismegszakítókat**. A kismegszakítók tetejére a **fésűs sín** kerül.', parts: ['fokapcsolo', 'spd', 'fi', 'mcb'] },
      { icon: '🟫', title: 'Fázisok bekötése', text: 'A betáp barna erét a főkapcsoló felső kapcsába köti. Onnan halad tovább az áram az FI relén át a fésűs sínre. Minden kapocsnál a **gyártó által előírt nyomatékkal** húzza meg a csavart: a laza kötés melegszik, és tüzet okozhat.', parts: ['fazis'] },
      { icon: '🟦', title: 'Nullák és védőföld', text: 'A kék nullavezetők az N sínre, a zöld-sárga védővezetők a PE sínre kerülnek. Fontos, hogy minden kör nullája a saját FI relé utáni sínre jusson.', parts: ['nulla', 'vedo', 'nsin', 'pesin'] },
      { icon: '🏷️', title: 'Feliratozás és fedél', text: 'Minden kismegszakító alá felírja, melyik áramkört védi, majd felteszi a **fedelet**, a szabadon maradt nyílásokat vakfedéllel zárja.', parts: ['fedel'] },
      { icon: '📏', title: 'Mérés és átadás', text: 'Műszerrel megméri a védővezető folytonosságát, a szigetelési ellenállást, a hurokimpedanciát, és kipróbálja, hogy az FI relé 30 mA-nél időben leold-e. Az eredményeket jegyzőkönyvbe írja: e nélkül nem szabad átadni a rendszert.', parts: ['fi'] }
    ],
    history: [
      { year: '1880-as évek', text: 'Az első villanyvilágítású lakásokban **olvadóbiztosítók** védték a vezetékeket: egy vékony drót, ami túl nagy áramnál elolvad.' },
      { year: '1924', text: 'Hugo Stotz cége szabadalmaztatja a **kismegszakítót**, amit nem kell kicserélni, csak visszakapcsolni.' },
      { year: '1950-es évek', text: 'Magyarországon is a csavaros (Diazed) **„dugós” biztosítók** az általánosak, sok régi házban ma is megvannak.' },
      { year: '1960-as évek', text: 'Megjelennek az első **áram-védőkapcsolók** (FI relék) a lakásokban, előbb Ausztriában és Németországban.' },
      { year: '1970-es évek', text: 'Elterjed a szabványos 35 mm-es **DIN sín** és a moduláris készülékek rendszere.' },
      { year: '2000-es évek', text: 'Az előírások egyre több helyen teszik **kötelezővé** a 30 mA-es FI relét, majd a túlfeszültség-védelmet is.' },
      { year: 'ma', text: 'Megjelennek az **okos elosztók**: távolról lekérdezhető fogyasztásmérők, ívhiba-érzékelők (AFDD) és napelemes rendszerek bekötése.' }
    ],
    quiz: [
      { q: 'Mit véd elsősorban a kismegszakító?', options: ['A vezetéket a túlmelegedéstől', 'Az embert az áramütéstől', 'A tévét a villámcsapástól', 'A mérőórát'], answer: 0, explain: 'A kismegszakító túlterhelésnél és rövidzárnál old le. Az embert elsősorban az FI relé védi.' },
      { q: 'Mikor old le a 30 mA-es FI relé?', options: ['Ha a bemenő és a visszajövő áram között 30 mA-nél nagyobb a különbség', 'Ha a lakás 30 A-nél többet fogyaszt', 'Ha 30 percig nem használják', 'Minden este automatikusan'], answer: 0, explain: 'A különbség azt jelenti, hogy az áram egy része máshol (pl. egy emberen át) folyik el.' },
      { q: 'Milyen színű a védővezető?', options: ['Zöld-sárga', 'Kék', 'Barna', 'Fekete'], answer: 0, explain: 'A zöld-sárga szín kizárólag a védővezetőé. A kék a nulla, a barna, fekete, szürke a fázis.' },
      { q: 'Ki dolgozhat az elosztószekrény belsejében?', options: ['Csak szakképzett villanyszerelő', 'Bárki, ha lekapcsolta a kismegszakítót', 'Bárki, aki 18 éves elmúlt', 'Bárki, ha gumikesztyűt húz'], answer: 0, explain: 'A 230 V életveszélyes. Visszakapcsolni egy leoldott kismegszakítót szabad, de szerelni csak szakember.' }
    ]
  });
})();
