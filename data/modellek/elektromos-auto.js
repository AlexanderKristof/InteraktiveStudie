/* Modell: elektromos autó – izometrikus „üvegautó”: a karosszéria átlátszó, alatta a hajtáslánc. */
(function () {
  var K = 0.95, I = STUDIE.draw.iso(360, 430, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  function P(p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  /* Szétszedéskor ide (képernyő-koordináta) kerüljön az alkatrész (x, y, z) pontja. */
  function T(x, y, z, tx, ty) { var p = I.pt(x, y, z); return [Math.round(tx - p[0]), Math.round(ty - p[1])]; }

  /* Fekvő henger x vagy y irányú tengellyel (látható palástcsíkok + közeli véglap). */
  function cylH(axis, cx, cy, cz, r, len, color) {
    var n = 28, s = '', i;
    function q(a, t) {
      return axis === 'x' ? I.pt(cx + t, cy + r * Math.cos(a), cz + r * Math.sin(a))
        : I.pt(cx + r * Math.cos(a), cy + t, cz + r * Math.sin(a));
    }
    for (i = 0; i < n; i++) {
      var a0 = i / n * 6.2832, a1 = (i + 1) / n * 6.2832, m = (a0 + a1) / 2, f = Math.cos(m) + Math.sin(m);
      if (f <= 0) continue;
      var c = shade(color, 0.62 + 0.3 * f / 1.4142);
      s += '<polygon points="' + [q(a0, 0), q(a1, 0), q(a1, len), q(a0, len)].map(P).join(' ') + '" fill="' + c + '" stroke="' + c + '" stroke-width="0.6"/>';
    }
    var cap = [];
    for (i = 0; i < n; i++) cap.push(q(i / n * 6.2832, len));
    return s + '<polygon points="' + cap.map(P).join(' ') + '" fill="' + color + '" stroke="rgba(0,0,0,.3)" stroke-width="0.8"/>';
  }
  function disc(cx, y, cz, r, fill, extra) {   // kör az x–z síkban (oldalnézetből látszó kerék, csatlakozó)
    var pts = [];
    for (var i = 0; i < 32; i++) { var a = i / 32 * 6.2832; pts.push(I.pt(cx + r * Math.cos(a), y, cz + r * Math.sin(a))); }
    return I.poly(pts, fill, extra);
  }
  function line(pts, color, w, extra) {
    return '<polyline points="' + pts.map(function (p) { return P(I.pt(p[0], p[1], p[2])); }).join(' ') + '" fill="none" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  function cable(pts) { return line(pts, '#7a3a06', 6.5) + line(pts, '#f28a1e', 4.2); }
  function pipe(pts) { return line(pts, '#1d5f99', 5) + line(pts, '#46a6ea', 3); }

  // ---------- Karosszéria: oldalprofil, kihúzva a szélesség mentén ----------
  var prof = [[-228, 22], [-236, 46], [-232, 70], [-218, 82], [-178, 90], [-146, 104], [-110, 125], [-76, 135], [-20, 139], [26, 137], [62, 122], [104, 98], [150, 89], [196, 83], [222, 75], [234, 60], [234, 36], [226, 22]];
  var W = 86, glass = 'rgba(120,175,235,.34)', skin = 'rgba(140,165,205,.13)', edge = ' stroke="#7088b0" stroke-width="1.4" stroke-linejoin="round"';
  function side(y, fill, extra) { return I.poly(prof.map(function (p) { return I.pt(p[0], y, p[1]); }), fill, extra); }
  var body = side(-W, skin, edge);
  for (var i = 0; i < prof.length - 1; i++) {
    var a = prof[i], b = prof[i + 1];
    var isGlass = (a[0] >= -178 && b[0] <= -76) || (a[0] >= 26 && b[0] <= 104);
    body += I.poly([I.pt(a[0], -W, a[1]), I.pt(b[0], -W, b[1]), I.pt(b[0], W, b[1]), I.pt(a[0], W, a[1])], isGlass ? glass : skin, edge);
  }
  body += side(W, skin, edge);
  // oldalablakok és ajtóvonalak a közeli oldalon
  function sidePoly(pts, fill, extra) { return I.poly(pts.map(function (p) { return I.pt(p[0], W, p[1]); }), fill, extra); }
  body += sidePoly([[-160, 92], [-104, 128], [-30, 131], [-30, 92]], glass, edge) +
    sidePoly([[-22, 92], [-22, 131], [24, 132], [92, 96]], glass, edge);
  body += line([[-26, W, 30], [-26, W, 132]], '#7088b0', 1.2) + line([[96, W, 34], [96, W, 92]], '#7088b0', 1.2) + line([[-150, W, 34], [-150, W, 88]], '#7088b0', 1.2, ' stroke-dasharray="0"');
  // lámpák
  body += I.poly([I.pt(232, -70, 56), I.pt(232, -40, 56), I.pt(232, -40, 64), I.pt(226, -70, 66)], '#fff3c4', edge) +
    I.poly([I.pt(232, 40, 56), I.pt(232, 70, 56), I.pt(228, 70, 66), I.pt(232, 40, 64)], '#fff3c4', edge) +
    I.poly([I.pt(-234, 50, 64), I.pt(-234, 80, 64), I.pt(-226, 80, 78), I.pt(-228, 50, 76)], '#e0525a', edge);

  // ---------- Kerekek ----------
  var wheels = '';
  [[150, -90], [-150, -90], [150, 68], [-150, 68]].sort(function (p, q) { return (p[0] + p[1]) - (q[0] + q[1]); }).forEach(function (w) {
    wheels += cylH('y', w[0], w[1], 36, 36, 22, '#3a3f48') + disc(w[0], w[1] + 22.2, 36, 23, '#b8c0cc', ' stroke="#6b7482" stroke-width="1"') +
      disc(w[0], w[1] + 22.4, 36, 8, '#7d8696', ' stroke="none"');
  });

  // ---------- Nagyfeszültségű akkumulátor ----------
  var batt = I.box(-118, -70, 14, 236, 140, 24, '#4a78c2');
  for (var mx = 0; mx < 6; mx++) for (var my = 0; my < 2; my++) {
    batt += I.face(-112 + mx * 38.5, -64 + my * 65, 38.05, 34, 59, '#6f97d8', ' stroke="#3a5f9e" stroke-width="0.8"');
  }

  // ---------- BMS ----------
  var bms = I.box(84, -30, 38, 28, 44, 7, '#2f9e64') + I.box(92, -20, 45, 12, 12, 2, '#20262e') + I.box(92, 0, 45, 8, 8, 2, '#20262e');

  // ---------- Hajtóegység hátul: villanymotor, reduktor, féltengelyek ----------
  var motor = cylH('y', -150, -52, 40, 21, 44, '#aab4c3') + disc(-150, -7.8, 40, 14, '#c9844a', ' stroke="none"') + disc(-150, -7.6, 40, 5, '#6b7482', ' stroke="none"');
  var gear = cylH('y', -150, -66, 36, 4.5, 14, '#8a93a1') + I.box(-170, -8, 18, 40, 26, 42, '#7d8798') +
    cylH('y', -150, 18, 36, 4.5, 50, '#8a93a1');

  // ---------- Inverter (a motor tetején) ----------
  var inverter = I.box(-178, -52, 62, 56, 44, 16, '#9a6fd6');
  for (var f = 0; f < 5; f++) inverter += I.face(-172 + f * 10, -48, 78.05, 5, 36, 'rgba(255,255,255,.22)', ' stroke="none"');

  // ---------- Fedélzeti töltő (OBC) az akku hátsó végén ----------
  var obc = I.box(-112, -62, 38, 30, 40, 18, '#3fb0a5');
  for (var g = 0; g < 4; g++) obc += I.face(-108 + g * 7, -58, 56.05, 3, 32, 'rgba(0,0,0,.18)', ' stroke="none"');

  // ---------- DC-DC átalakító és 12 V-os akku elöl ----------
  var dcdc = I.box(124, -66, 36, 26, 28, 14, '#e0b84a') + I.box(154, -66, 36, 28, 30, 26, '#454b57') +
    I.box(158, -60, 62, 6, 6, 3, '#d64545') + I.box(172, -60, 62, 6, 6, 3, '#20262e');

  // ---------- Töltőcsatlakozó a bal hátsó sárvédőn ----------
  var port = I.box(-202, 80, 62, 26, 8, 24, '#2b3038');
  port += disc(-189, 88.3, 74, 9, '#f28a1e', ' stroke="#7a3a06" stroke-width="1"') + disc(-189, 88.5, 74, 6.5, '#1f2329', ' stroke="none"');
  [[-3, 2], [3, 2], [0, -3]].forEach(function (d) { port += disc(-189 + d[0], 88.7, 74 + d[1], 1.4, '#d8dde5', ' stroke="none"'); });

  // ---------- Hűtőkör és hőszivattyú ----------
  var cool = I.box(204, -64, 22, 8, 128, 50, '#5fa8dc');
  for (var r = 0; r < 12; r++) cool += line([[212.2, -60 + r * 10.5, 24], [212.2, -60 + r * 10.5, 70]], 'rgba(0,0,0,.25)', 1);
  cool += I.box(160, 8, 36, 34, 40, 24, '#4f82b8') + I.cyl(176, 40, 60, 7, 6, '#9aa3b0');
  cool += pipe([[204, -20, 40], [160, -20, 30], [118, -20, 26]]) + pipe([[204, 0, 32], [160, 0, 24], [118, 0, 22]]) +
    pipe([[194, 30, 48], [204, 30, 48]]);

  // ---------- Narancssárga nagyfeszültségű kábelek ----------
  var hv = cable([[-118, -34, 30], [-136, -34, 34], [-140, -34, 62]]) +
    cable([[-118, -46, 26], [-124, -46, 30], [-124, -46, 44], [-112, -46, 46]]) +
    cable([[-189, 80, 70], [-176, 56, 50], [-110, 40, 42], [-96, 20, 42], [-96, -22, 46]]) +
    cable([[118, 30, 28], [140, 30, 30], [160, 30, 40]]) +
    cable([[118, -54, 26], [124, -54, 40]]);

  STUDIE.addModel({
    id: 'elektromos-auto',
    title: 'Elektromos autó',
    icon: '🚗',
    color: '#f28a1e',
    category: 'Járművek',
    keywords: 'villanyautó elektromos autó EV BEV akkumulátor akku nagyfeszültség HV inverter villanymotor reduktor hajtómű töltő OBC DC-DC 12V töltőcsatlakozó Type 2 CCS hőszivattyú BMS narancssárga kábel Tesla',
    summary: 'Benzintank helyett nagy akkumulátor, motor helyett villanymotor: alig van benne mozgó alkatrész.',
    scale: 'kb. 4,5 m hosszú, az akku 400–700 kg',
    viewBox: '0 0 720 600',
    intro: 'Egy elektromos autóban sokkal kevesebb alkatrész mozog, mint egy benzinesben. Az energia egy **nagyfeszültségű akkumulátorban** van, az **inverter** váltakozó árammá alakítja, a **villanymotor** forgássá, a **reduktor** pedig lassítja a fordulatot, és továbbadja a kerekeknek. Fékezéskor a motor **generátorként** visszatölti az akkut.\n\nA rajzon a karosszéria átlátszó, így a padlóba épített „gördeszkát” is látod. A **Szétszedés** gombbal leemelheted a karosszériát.\n\n**Biztonság:** a **narancssárga** kábelekben és alkatrészekben 400–800 V egyenfeszültség van, ami halálos. Ezekhez csak **HV-képesítésű szakember** nyúlhat, aki előtte feszültségmentesíti a rendszert.',
    parts: [
      {
        id: 'body', z: 0, name: 'Karosszéria', svg: body, explode: [0, -185], badge: B(-20, -80, 139),
        what: 'Az autó „héja”: utastér, ajtók, motorháztető, csomagtartó. Elektromos autóknál különösen fontos, hogy **jó légellenállású** legyen, mert autópálya-tempónál az energia nagy része a levegő félretolására megy el.',
        madeOf: 'Nagy szilárdságú **acél** és egyre több **alumínium**, mert a nehéz akku miatt máshol spórolni kell a tömeggel. Szélvédő és ablakok: rétegelt és edzett **üveg**. Lökhárítók: műanyag.',
        how: 'Hatalmas présgépek sajtolják ki a lemezekből a darabokat, majd robotok **ponthegesztéssel** és ragasztással állítják össze a vázat. Utána festőüzembe kerül: korróziógátló fürdő, alapozó, színes festék, lakk. Néhány gyártó a hátsó vázat egyetlen óriási alumíniumöntvényként készíti (**gigaöntés**).',
        fact: 'A villanyautók légellenállási tényezője gyakran 0,23 alatti, ami jobb, mint a legtöbb sportautóé.'
      },
      {
        id: 'battery', terms: ['e-mobilitas/cellakemia', 'e-mobilitas/soc', 'e-mobilitas/soh'], z: 2, name: 'Nagyfeszültségű akkumulátor', svg: batt, explode: [0, 45], link: 'akkucella', badge: B(0, 30, 38),
        what: 'Az autó „üzemanyagtartálya”, a padlóba építve, a két tengely között. Több ezer **lítiumion cella**, modulokba csoportosítva, sorba kötve: így jön ki a 400 vagy 800 V. Egy átlagos akku 50–100 kWh energiát tárol, ez 300–600 km-re elég.',
        madeOf: '**Lítiumion cellák** (NMC vagy LFP), köztük hűtőlapok, réz- és alumínium sínek, szigetelés, és mindez egy ütésálló **alumínium** vagy acél dobozban, alul védőlemezzel.',
        how: 'A cellagyárból érkező cellákat robotok modulokba vagy közvetlenül a pakkba építik (**cell-to-pack**), lézerrel hegesztik össze a gyűjtősíneket, beépítik a hűtést és a BMS-t, majd vízmentesen lezárják, és szivárgás- és szigetelésvizsgálatnak vetik alá.',
        fact: 'Mivel az akku a padlóban van, az autó súlypontja nagyon alacsony. Ezért nehezebb felborulnia, és jól kanyarodik.'
      },
      {
        id: 'bms', terms: ['e-mobilitas/bms', 'e-mobilitas/cellakiegyenlites'], z: 4, name: 'Akkumulátor-felügyelet (BMS)', svg: bms, explode: T(98, -8, 42, 600, 525),
        what: 'A **BMS** (Battery Management System) az akku „agya”. Minden cellacsoport feszültségét és hőmérsékletét figyeli, kiszámolja a töltöttséget, kiegyenlíti a cellákat, és ha valami veszélyes (túlmelegedés, túltöltés), lekapcsolja az akkut a nagyfeszültségű relékkel.',
        madeOf: 'Nyomtatott áramkörök **mikrovezérlőkkel** és mérőchipekkel, vékony mérővezetékekkel a cellákhoz, valamint nagy áramú **mágneskapcsolók** (kontaktorok) és biztosíték.',
        how: 'Elektronikai gyárban automata beültetőgépek rakják az alkatrészeket a panelre, majd forrasztják. A szoftvert a gyártó fejleszti és teszteli, és gyakran távolról (OTA) frissítik.'
      },
      {
        id: 'motor', terms: ['e-mobilitas/pmsm', 'e-mobilitas/aszinkron-motor', 'e-mobilitas/foc'], z: 3, name: 'Villanymotor', svg: motor, explode: T(-150, -30, 40, 82, 292),
        what: 'A forgó mágneses mező „húzza körbe” a forgórészt. Nincs benne robbanás, csak elektromágnesesség, ezért halk, és már álló helyzetből teljes nyomatékot ad. Hatásfoka több mint 90%, a benzinmotoré legfeljebb kb. 40%. **Fékezéskor generátorként** áramot termel (rekuperáció).',
        madeOf: 'Állórész: vékony **elektrotechnikai acéllemezekből** rétegzett vasmag, benne **réz** tekercsekkel. Forgórész: vasmag, sok motorban erős **neodímium** állandó mágnesekkel. Ház: alumínium, hűtőcsatornákkal.',
        how: 'A lemezeket kistanzolják és összepréselik, a rézhuzalt (sokszor lapos réz „hajtűket”) robotok fűzik a hornyokba, majd lakkal impregnálják. A forgórészbe beragasztják a mágneseket, kiegyensúlyozzák, és csapágyakkal a házba szerelik.'
      },
      {
        id: 'gear', z: 3, name: 'Reduktor és féltengelyek', svg: gear, explode: T(-150, 5, 38, 92, 382),
        what: 'A villanymotor akár 15–20 ezer fordulat/perccel forog, a kerekeknek viszont csak kb. 1500 kell autópályán. A **reduktor** fogaskerekekkel kb. 9-szeresére lassít, és ennyivel növeli a nyomatékot. Benne van a **differenciálmű** is, ami kanyarban engedi, hogy a két kerék eltérő sebességgel forogjon. Sebességváltó nem kell.',
        madeOf: 'Edzett **acél** fogaskerekek, alumínium ház, hajtóműolaj. A féltengelyek acélból vannak, a végükön homokinetikus csuklókkal.',
        how: 'A fogaskerekeket kovácsolják, lefogazzák, edzik, majd köszörülik, hogy nagyon halkan fussanak (villanyautóban nincs motorzaj, ami elnyomná a fogaskerekek zúgását).'
      },
      {
        id: 'inverter', terms: ['e-mobilitas/inverter', 'e-mobilitas/pwm'], z: 4, name: 'Inverter (teljesítményelektronika)', svg: inverter, explode: T(-150, -30, 70, 86, 205),
        what: 'Az akku **egyenáramát** háromfázisú **váltakozó árammá** alakítja a motornak. A frekvenciával szabályozza a fordulatszámot, az áramerősséggel a nyomatékot. Rekuperációnál fordítva dolgozik: a motor által termelt váltakozó áramot egyenirányítja és visszatölti az akkuba.',
        madeOf: 'Nagy teljesítményű félvezető kapcsolók (**IGBT** vagy újabban **szilícium-karbid**, SiC tranzisztorok), kondenzátorok, vezérlőpanel, rézsínek, folyadékhűtésű alumínium ház.',
        how: 'A tranzisztorlapkákat kerámia hordozóra forrasztják, vastag huzalokkal bekötik, majd modulba öntik. A modult hűtőlapra szerelik a vezérlőpanellel együtt, és vízzáró házba zárják.',
        fact: 'Másodpercenként több ezerszer kapcsolja ki-be az áramot. A villanyautók jellegzetes, halk „sípolása” induláskor ebből a kapcsolgatásból ered.'
      },
      {
        id: 'obc', terms: ['e-mobilitas/ac-dc-toltes', 'e-mobilitas/cc-cv'], z: 4, name: 'Fedélzeti töltő (OBC)', svg: obc, explode: T(-97, -42, 47, 120, 478),
        what: 'Otthoni vagy közterületi **váltóáramú** (AC) töltéskor ez alakítja a hálózati áramot az akku egyenáramává. Teljesítménye 7–22 kW. Gyors **DC töltéskor** az OBC-t „megkerüli” az áram: a töltőoszlop maga ad egyenáramot, akár 150–350 kW-tal.',
        madeOf: 'Teljesítményelektronika: egyenirányító, tranzisztoros átalakító, **transzformátor** a galvanikus leválasztáshoz, kondenzátorok, hűtött alumínium ház.',
        how: 'Elektronikai gyárban szerelik: a panelre beültetik az alkatrészeket, a nagy alkatrészeket kézzel vagy robottal, majd a házba építik, és nagyfeszültségű szigetelésvizsgálatot végeznek rajta.'
      },
      {
        id: 'dcdc', z: 4, name: 'DC-DC átalakító és 12 V-os akku', svg: dcdc, explode: T(152, -51, 46, 650, 430),
        what: 'A villanyautóban is van egy kis **12 V-os akku**: ez működteti a világítást, az ablakemelőt, a kijelzőket és az autó indításakor a nagyfeszültségű relék vezérlését. Menet közben a **DC-DC átalakító** tölti a nagy akkuból, a benzinesekben lévő generátor helyett.',
        madeOf: 'Az átalakító: tranzisztorok, transzformátor, alumínium ház. A 12 V-os akku ólomakkumulátor vagy egyre gyakrabban kis lítiumion akku.',
        how: 'Az átalakító ugyanúgy készül, mint a többi teljesítményelektronika. A 12 V-os akkut külön gyártják, és a csomagtartóban vagy elöl, a „frunkban” helyezik el.',
        fact: 'Ha a 12 V-os akku lemerül, a villanyautó sem indul, hiába van tele a nagy akku!'
      },
      {
        id: 'port', terms: ['e-mobilitas/ccs', 'e-mobilitas/kw-kwh'], z: 5, name: 'Töltőcsatlakozó', svg: port, explode: T(-189, 84, 74, 48, 300),
        what: 'Ide dugod a töltőkábelt. Európában a **Type 2** dugó a szabványos AC töltéshez, a **CCS2** pedig ennek kiegészítése két vastag DC érintkezővel a gyorstöltéshez. Amíg a kábel be van dugva, az autó reteszeli, és csak a töltő és az autó „kézfogása” után kapcsol rá a feszültség.',
        madeOf: 'Hőálló **műanyag** ház, ezüstözött **réz** érintkezők, hőmérséklet-érzékelők és egy elektromos reteszelő motor.',
        how: 'Az érintkezőket esztergálják és ezüstözik, a házat fröccsöntik. A gyorstöltő csatlakozók érintkezőit néha folyadékkal hűtik, mert több száz amper folyik át rajtuk.'
      },
      {
        id: 'cool', z: 3, name: 'Hűtőkör és hőszivattyú', svg: cool, explode: T(190, 0, 46, 640, 325), badge: B(208, 44, 70),
        what: 'Az akku 20–40 °C között érzi magát jól: hidegben lassan töltődik, melegben gyorsabban öregszik. A **hűtőkör** hűtőfolyadékot (kék csövek) keringet az akku, a motor és az inverter körül. A **hőszivattyú** télen a környezet és a hajtáslánc hulladékhőjét is felhasználja az utastér fűtésére, így kevesebb energiát fogyaszt, mint egy elektromos fűtőszál.',
        madeOf: 'Alumínium **hűtőradiátor**, elektromos **kompresszor** (ez is a nagyfeszültségről megy), hőcserélők, szelepek, gumi- és műanyag csövek, víz–glikol hűtőfolyadék és hűtőközeg.',
        how: 'A radiátor vékony alumíniumlemezekből és csövekből áll, amelyeket kemencében keményforrasztással kötnek össze. A rendszert összeszerelés után vákuumozzák, és feltöltik.'
      },
      {
        id: 'hv', z: 6, name: 'Nagyfeszültségű kábelek', svg: hv, explode: [0, -15], badge: B(-150, 48, 46),
        what: 'A **narancssárga** szín nemzetközi figyelmeztetés: **nagyfeszültség!** Ezek kötik össze az akkut az inverterrel, a töltővel, a DC-DC átalakítóval és a klímakompresszorral. Baleset után a mentők is erről ismerik fel, hová nem szabad vágni.\n\nA HV rendszeren csak **képzett és feljogosított szakember** dolgozhat, aki előtte kikapcsolja és leválasztja (pl. a szervizcsatlakozóval), majd méréssel ellenőrzi a feszültségmentességet.',
        madeOf: 'Vastag, finom elemi szálakból sodort **réz** vagy alumínium vezető, árnyékoló fémfonat (hogy ne zavarja a rádiót), és vastag, narancssárga szilikon vagy speciális műanyag szigetelés.',
        how: 'A sodrott vezetőre extrudálják a szigetelést, ráfonják az árnyékolást, majd a külső köpenyt. A végükre robotok sajtolják a csatlakozókat, és minden kábelt nagyfeszültségű vizsgálatnak vetnek alá.',
        fact: 'A HV rendszer folyamatosan figyeli a saját szigetelését is. Ha szivárgást észlel a karosszéria felé, figyelmeztet, vagy le sem engedi kapcsolni a nagyfeszültséget.'
      },
      {
        id: 'wheels', terms: ['e-mobilitas/menetellenallas', 'e-mobilitas/rekuperacio'], z: 1, name: 'Kerekek és futómű', svg: wheels, explode: [0, 0], badge: B(150, 90, 36),
        what: 'A kerekek adják át a nyomatékot az útnak. Villanyautóknál gyakran **alacsony gördülési ellenállású** gumikat és légellenállásra optimalizált felniket használnak, mert ezek is számítanak a hatótávnál. A fékek ritkábban kopnak, mert a lassítás nagy részét a motor végzi.',
        madeOf: 'Gumiabroncs: természetes és szintetikus **gumi**, korom, szilícium-dioxid, acél- és textilbetétek. Felni: alumíniumötvözet. Fékek: öntöttvas tárcsák.',
        how: 'A gumit rétegekből építik fel egy dobon, majd formában, hővel és nyomással **vulkanizálják**, ekkor kapja meg a mintázatát. A felniket alumíniumból öntik, majd esztergálják és festik.'
      }
    ],
    steps: [
      { icon: '🔋', title: 'Akkupakk építése', text: 'Az akkugyárban a cellákat modulokba, majd a padlólemez méretű dobozba építik a **BMS**-sel és a hűtőlapokkal együtt. Az akku gyakran az autó legdrágább alkatrésze.', parts: ['battery', 'bms'] },
      { icon: '🏭', title: 'Karosszériaépítés', text: 'A préselt lemezeket robotok hegesztik és ragasztják össze a karosszériaüzemben, majd a karosszéria a festőüzembe kerül.', parts: ['body'] },
      { icon: '⚙️', title: 'Hajtóegység', text: 'A **villanymotort**, a **reduktort** és az **invertert** gyakran egyetlen egységbe szerelik (e-tengely). Próbapadon minden egységet megpörgetnek és mérik.', parts: ['motor', 'gear', 'inverter'] },
      { icon: '🔗', title: '„Esküvő”', text: 'A szerelősoron a festett karosszériát alulról összeházasítják a futóművel, a hajtóegységgel és az **akkuval**. A szakzsargon ezt valóban esküvőnek (marriage) hívja.', parts: ['body', 'battery', 'motor', 'gear', 'wheels'] },
      { icon: '🟧', title: 'Nagyfeszültségű bekötés', text: 'Képzett szerelők bekötik a **narancssárga** kábeleket az akku, az inverter, a töltő és a kompresszor között. Minden csatlakozást nyomatékra húznak és ellenőriznek.', parts: ['hv', 'obc', 'dcdc', 'port'] },
      { icon: '💧', title: 'Feltöltés folyadékokkal', text: 'Vákuumozzák és feltöltik a **hűtőkört**, a hőszivattyú hűtőközegét és a fékfolyadékot.', parts: ['cool'] },
      { icon: '💻', title: 'Szoftver és első bekapcsolás', text: 'Feltöltik a vezérlőegységek szoftverét, és először kapcsolják rá a nagyfeszültséget. A rendszer önellenőrzést végez, megméri a **szigetelési ellenállást**.', parts: ['bms', 'inverter'] },
      { icon: '✅', title: 'Végellenőrzés', text: 'Görgős próbapadon tesztelik a gyorsítást és a rekuperációt, esőkamrában a vízzárást, kipróbálják a **töltést** AC-vel és DC-vel, majd próbautat tesznek vele.', parts: ['port', 'wheels'] }
    ],
    history: [
      { year: '1828 körül', text: '**Jedlik Ányos** megépíti az egyik első villanymotort, és egy kis kocsimodellt is hajt vele.' },
      { year: '1881', text: 'Párizsban bemutatják az első akkumulátoros elektromos **háromkerekűt** (Gustave Trouvé).' },
      { year: '1899', text: 'A „La Jamais Contente” nevű villanyautó elsőként lépi át a **100 km/h**-t.' },
      { year: '1900 körül', text: 'Az USA-ban az autók kb. harmada elektromos, de az olcsó benzin és az önindító miatt később eltűnnek.' },
      { year: '1996', text: 'A GM EV1 az első modern, sorozatgyártott villanyautó, de a programot leállítják.' },
      { year: '2008–2010', text: 'Megjelenik a Tesla Roadster és a Nissan Leaf: elsőként használnak **lítiumion akkut** nagy sorozatban.' },
      { year: '2020-as évek', text: 'Terjednek a **800 V-os** rendszerek, a hőszivattyúk és az olcsóbb **LFP** akkuk. Magyarországon is épülnek akkumulátor- és villanyautó-gyárak.' }
    ],
    quiz: [
      { q: 'Mit jelez a narancssárga szín a kábeleken?', options: ['Nagyfeszültséget: csak szakember nyúlhat hozzá', 'Hűtőfolyadékot', 'A 12 V-os rendszert', 'Csak díszítés'], answer: 0, explain: 'A narancssárga a nagyfeszültségű (HV) rendszer nemzetközi jelölése.' },
      { q: 'Mit csinál az inverter?', options: ['Az akku egyenáramát váltakozó árammá alakítja a motornak', 'Tölti a 12 V-os akkut', 'Hűti az akkut', 'Lassítja a motor fordulatát'], answer: 0, explain: 'A frekvenciával és az árammal szabályozza a motor fordulatát és nyomatékát.' },
      { q: 'Miért nincs szükség hagyományos sebességváltóra?', options: ['Mert a villanymotor széles fordulatszám-tartományban erős, elég egy fix áttételű reduktor', 'Mert a kerekekben van a motor', 'Mert az akku vált sebességet', 'Mert csak lassan megy'], answer: 0, explain: 'A villanymotor már álló helyzetből teljes nyomatékot ad, és nagyon magas fordulatig forog.' },
      { q: 'Mi az a rekuperáció?', options: ['Fékezéskor a motor generátorként visszatölti az akkut', 'A töltőkábel reteszelése', 'Az akku cseréje', 'A hűtőfolyadék keringetése'], answer: 0, explain: 'Így a fékezési energia egy része nem hővé válik, hanem visszakerül az akkuba.' },
      { q: 'Melyik alkatrész alakítja a hálózati váltóáramot egyenárammá otthoni töltéskor?', options: ['A fedélzeti töltő (OBC)', 'A BMS', 'A reduktor', 'A villanymotor'], answer: 0, explain: 'DC gyorstöltésnél viszont a töltőoszlop végzi ezt az átalakítást.' }
    ]
  });
})();
