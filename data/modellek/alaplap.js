/* Modell: Alaplap (ATX) – izometrikus nézet, a szétszedésnél az alkatrészek felemelkednek a lapról. */
(function () {
  var D = STUDIE.draw;
  var I = D.iso(327, 160, 1.05);
  var thin = ' stroke="rgba(0,0,0,.35)" stroke-width="0.5"';
  var none = ' stroke="none"';

  // Függőleges téglalap az x = állandó síkon (a jobbra-le néző oldalfalakra rajzoláshoz)
  function sideX(x, y, z, d, h, fill, extra) {
    return I.poly([I.pt(x, y, z), I.pt(x, y + d, z), I.pt(x, y + d, z + h), I.pt(x, y, z + h)], fill, extra || none);
  }
  // Függőleges téglalap az y = állandó síkon (a balra-le néző oldalfalakra)
  function sideY(x, y, z, w, h, fill, extra) {
    return I.poly([I.pt(x, y, z), I.pt(x + w, y, z), I.pt(x + w, y, z + h), I.pt(x, y, z + h)], fill, extra || none);
  }
  function line(pts, color, w) {
    return '<polyline points="' + pts.map(function (p) { var q = I.pt(p[0], p[1], p[2]); return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ') +
      '" fill="none" stroke="' + color + '" stroke-width="' + (w || 1) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  var B = 6; // a nyák vastagsága (rajzi egységben)

  /* ---------- 1. NYÁK (nyomtatott áramköri lap) ---------- */
  var pcb = I.box(0, 0, 0, 244, 305, B, '#2f7556');
  // rétegek az oldalfalon: réz és üvegszál váltakozva
  [1.2, 2.4, 3.6, 4.8].forEach(function (z, i) {
    var c = i % 2 ? 'rgba(232,160,80,.9)' : 'rgba(232,160,80,.55)';
    pcb += line([[0, 305, z], [244, 305, z]], c, 0.7) + line([[244, 0, z], [244, 305, z]], c, 0.7);
  });
  pcb += I.face(4, 4, B + 0.05, 236, 297, 'rgba(255,255,255,.04)', ' stroke="rgba(255,255,255,.12)" stroke-width="0.6"');
  // rézvezetékek (a valóságban a zöld lakk alatt futnak)
  var tr = 'rgba(150,225,180,.55)';
  for (var i = 0; i < 6; i++) { // CPU → RAM
    pcb += line([[131, 60 + i * 9, B], [138, 60 + i * 9, B], [141, 63 + i * 9, B], [148, 63 + i * 9, B]], tr, 0.8);
  }
  for (i = 0; i < 5; i++) { // CPU → PCIe (kanyargó, hosszkiegyenlítő vezetékek)
    var xx = 76 + i * 8;
    pcb += line([[xx, 121, B], [xx, 140, B], [xx + 2, 142, B], [xx, 144, B], [xx + 2, 146, B], [xx, 148, B], [xx, 170, B]], tr, 0.8);
  }
  for (i = 0; i < 4; i++) { // lapkakészlet → SATA
    pcb += line([[206, 214 + i * 9, B], [216, 214 + i * 9, B], [223, 208 + i * 9, B]], tr, 0.8);
  }
  for (i = 0; i < 4; i++) { // CPU → lapkakészlet
    pcb += line([[124, 121, B], [124 + i * 3, 150, B], [150 + i * 3, 176, B], [160 + i * 3, 205, B]].map(function (p, k) { return k ? p : [p[0] + i * 2, p[1], p[2]]; }), tr, 0.7);
  }
  for (i = 0; i < 4; i++) { // CPU → hátlapi csatlakozók
    pcb += line([[59, 70 + i * 10, B], [40, 70 + i * 10, B], [36, 66 + i * 10, B], [24, 66 + i * 10, B]], tr, 0.7);
  }
  // rögzítőfuratok
  [[8, 10], [8, 165], [8, 296], [150, 10], [150, 165], [236, 10], [236, 165], [236, 296], [150, 296]].forEach(function (h) {
    var c = I.pt(h[0], h[1], B);
    pcb += '<ellipse cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" rx="6" ry="3.4" fill="#d6c38a" stroke="rgba(0,0,0,.3)" stroke-width="0.6"/>' +
      '<ellipse cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" rx="3" ry="1.7" fill="#1e2a24"/>';
  });

  /* ---------- 2. Hátlapi csatlakozók (I/O) ---------- */
  var io = '';
  [[14, 16, 18, '#c0c6cf'], [34, 15, 13, '#b3bac5'], [53, 16, 18, '#c0c6cf'], [73, 22, 24, '#aeb5c0'], [99, 17, 16, '#c0c6cf'], [120, 42, 24, '#3f4552']].forEach(function (b) {
    io += I.box(-4, b[0], B, 24, b[1], b[2], b[3]);
  });
  // USB-nyelvek (kék), HDMI-, hálózati-, hangcsatlakozók jelzése a tetőn és az oldalon
  [[14, 18], [53, 18], [99, 16]].forEach(function (b) {
    io += sideY(2, b[0] + b[1] / 2 + 8, B + 3, 14, 4, '#2f6fd6') + sideY(2, b[0] + b[1] / 2 + 8, B + b[1] - 8, 14, 4, '#2f6fd6');
  });
  io += sideY(1, 95, B + 6, 16, 12, '#5d636e');
  [['#58b368', 128], ['#e6c23a', 136], ['#e07aa5', 144], ['#4aa3df', 152]].forEach(function (j) {
    var c = I.pt(10, j[1], B + 24.1);
    io += '<ellipse cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" rx="4.2" ry="2.4" fill="' + j[0] + '" stroke="rgba(0,0,0,.35)" stroke-width="0.5"/>';
  });

  /* ---------- 3. VRM / tápellátás ---------- */
  var vrm = I.box(30, 3, B, 22, 10, 12, '#3f4552') + I.face(32, 4, B + 12.05, 18, 8, '#262a33', none); // 8 pines EPS
  for (i = 0; i < 4; i++) for (var j = 0; j < 2; j++) vrm += I.face(33 + i * 4.3, 4.6 + j * 3.6, B + 12.1, 3, 2.6, '#14171d', none);
  for (i = 0; i < 7; i++) { // tekercsek a foglalat bal oldalán
    vrm += I.box(44, 128 - i * 11 - 8, B, 6, 9, 3, '#2b2f38') + I.box(36, 128 - i * 11 - 8, B, 8, 9, 9, '#6b717d') +
      I.face(37.5, 128 - i * 11 - 6.5, B + 9.05, 5, 6, '#8a909b', none);
  }
  for (i = 0; i < 6; i++) { // tekercsek a foglalat fölött
    vrm += I.box(60 + i * 12, 34, B, 9, 5, 3, '#2b2f38') + I.box(60 + i * 12, 24, B, 9, 9, 9, '#6b717d') +
      I.face(61.5 + i * 12, 25.5, B + 9.05, 6, 6, '#8a909b', none);
  }
  [[28, 40], [28, 70], [28, 100], [128, 22], [140, 22]].forEach(function (c) { vrm += I.cyl(c[0], c[1], B, 3, 9, '#8f6bc4'); });

  /* ---------- 4. CPU-foglalat ---------- */
  var sock = I.box(60, 45, B, 70, 76, 4, '#3a3f4b');
  sock += I.face(68, 54, B + 4.05, 54, 58, '#c99b3a', thin);
  for (var px = 70; px < 120; px += 6) for (var py = 56; py < 110; py += 6) {
    if (px > 86 && px < 102 && py > 74 && py < 92) continue;
    sock += I.face(px, py, B + 4.1, 2.4, 2.4, '#f1d27a', none);
  }
  // fém rögzítőkeret és kar
  sock += I.box(60, 45, B + 4, 70, 5, 2, '#b8bec8') + I.box(60, 116, B + 4, 70, 5, 2, '#b8bec8') +
    I.box(60, 50, B + 4, 5, 66, 2, '#b8bec8') + I.box(125, 50, B + 4, 5, 66, 2, '#b8bec8');
  sock += I.box(133, 48, B, 3, 72, 3, '#c9ced6') + I.box(133, 118, B, 9, 3, 3, '#c9ced6');

  /* ---------- 5. RAM-foglalatok ---------- */
  var ram = '';
  [148, 158, 168, 178].forEach(function (x, k) {
    var col = k % 2 ? '#7a8192' : '#3f4552';
    ram += I.box(x, 22, B, 6, 136, 8, col) + I.face(x + 2, 26, B + 8.05, 2, 128, '#1c1f26', none);
    ram += I.box(x - 0.5, 18, B, 7, 5, 10, '#d9dde4') + I.box(x - 0.5, 157, B, 7, 5, 10, '#d9dde4');
  });

  /* ---------- 6. 24 pines tápcsatlakozó ---------- */
  var atx = I.box(222, 80, B, 15, 58, 13, '#d8d3c4');
  for (i = 0; i < 12; i++) for (j = 0; j < 2; j++) atx += I.face(224.5 + j * 6, 82.5 + i * 4.6, B + 13.05, 4, 3.4, '#5d584b', none);

  /* ---------- 7. PCIe-bővítőhelyek ---------- */
  var pcie = I.box(30, 172, B, 89, 9, 11, '#c3c9d3') + I.face(32, 175.5, B + 11.05, 85, 2, '#262a33', none) +
    I.box(118, 170, B, 6, 13, 12, '#9aa1ad');
  pcie += I.box(30, 240, B, 25, 8, 10, '#3f4552') + I.face(32, 243, B + 10.05, 21, 2, '#14171d', none);
  pcie += I.box(30, 272, B, 89, 8, 10, '#3f4552') + I.face(32, 275, B + 10.05, 85, 2, '#14171d', none);
  [172, 272].forEach(function (y) { pcie += I.face(52, y + 0.2, B + 11.1, 2, y === 172 ? 8.6 : 7.6, '#8b929e', none); });

  /* ---------- 8. M.2 SSD ---------- */
  var m2 = I.box(34, 198, B, 6, 22, 4, '#3f4552'); // foglalat
  m2 += I.box(38, 199, B + 2, 80, 20, 1.2, '#2c3a4e');
  m2 += I.box(46, 201.5, B + 3.2, 14, 15, 1.4, '#22262e') + I.box(64, 201.5, B + 3.2, 20, 15, 1.4, '#22262e') + I.box(88, 201.5, B + 3.2, 20, 15, 1.4, '#22262e');
  m2 += I.face(66, 203.5, B + 4.65, 16, 11, '#d0d5de', none) + I.face(90, 203.5, B + 4.65, 16, 11, '#d0d5de', none);
  m2 += I.cyl(118, 209, B, 2.5, 3.5, '#d6c38a');

  /* ---------- 9. Lapkakészlet (chipset) hűtővel ---------- */
  var chip = I.box(160, 205, B, 46, 46, 9, '#8a93a3');
  for (i = 0; i < 6; i++) chip += I.face(163, 209 + i * 7, B + 9.05, 40, 2.5, 'rgba(0,0,0,.16)', none);
  chip += I.face(176, 221, B + 9.1, 14, 14, '#e4572e', ' stroke="#9e3517" stroke-width="0.6"');

  /* ---------- 10. CMOS-elem ---------- */
  var cmos = I.cyl(140, 236, B, 13, 2.5, '#2b2f38') + I.cyl(140, 236, B + 2.5, 10, 2.2, '#cdd2da');
  var cc = I.pt(140, 236, B + 4.8);
  cmos += '<text x="' + cc[0].toFixed(1) + '" y="' + (cc[1] + 2).toFixed(1) + '" text-anchor="middle" font-size="6" font-family="sans-serif" font-weight="700" fill="#6b717d">+</text>';

  /* ---------- 11. BIOS/UEFI chip ---------- */
  var bios = I.box(192, 270, B, 20, 14, 3.5, '#353a45');
  for (i = 0; i < 4; i++) bios += I.box(194 + i * 4.6, 284, B, 2, 2.5, 1.2, '#d3d8df') + I.box(194 + i * 4.6, 267.5, B, 2, 2.5, 1.2, '#d3d8df');
  bios += I.face(194, 272, B + 3.55, 3, 3, '#aab1bd', none) + I.face(199, 276, B + 3.55, 11, 2, 'rgba(255,255,255,.25)', none);

  /* ---------- 12. SATA-csatlakozók ---------- */
  var sata = '';
  [206, 222].forEach(function (y) {
    [0, 7].forEach(function (z) {
      sata += I.box(226, y, B + z, 13, 13, 7, '#4b6a9b') + sideX(239, y + 2, B + z + 2, 9, 3, '#1b2433');
    });
  });

  STUDIE.addModel({
    id: 'alaplap',
    title: 'Alaplap',
    icon: '🧩',
    color: '#2f7556',
    category: 'Számítástechnika',
    keywords: 'alaplap motherboard mainboard ATX NYÁK PCB foglalat socket RAM DIMM PCIe M.2 SSD SATA chipset BIOS UEFI CMOS VRM tápcsatlakozó',
    summary: 'A számítógép „gerince”: ezen a lapon találkozik a processzor, a memória, a tároló és minden bővítőkártya.',
    scale: 'ATX: 30,5 × 24,4 cm, kb. 1,6 mm vastag',
    viewBox: '0 0 600 490',
    intro: 'Az alaplap egy nagy **nyomtatott áramköri lap** (NYÁK), amely összeköti a számítógép részeit: tápot ad nekik, és vezetékek ezrein szállítja köztük az adatot. Ő maga nem számol, de nélküle semmi nem tudna egymással „beszélgetni”.\n\nNyomd meg a **Szétszedés** gombot: az alkatrészek felemelkednek, és látszanak a lapon futó rézvezetékek. A CPU-foglalatnál pedig **belenézhetsz a processzorba**.',
    parts: [
      {
        id: 'pcb', z: 0, name: 'Nyomtatott áramköri lap (NYÁK)', svg: pcb, explode: [0, 30], badge: I.pt(205, 150, B),
        what: 'Maga a lap, amire minden rá van forrasztva. Kívülről csak egy zöld (vagy fekete) lemez, de valójában **6–12 rétegből** áll: a rétegekben vékony **rézvezetékek** futnak, összesen több száz méter hosszan. A rétegeket apró, rézzel bevont furatok (**via**-k) kötik össze.',
        madeOf: '- **Üvegszálas szövet + epoxigyanta** (FR-4): ez a szigetelő, merev alap.\n- **Réz**: a vezetékek és a táp-/földsíkok, rétegenként kb. 0,035 mm vastag fóliából.\n- **Forrasztásgátló lakk**: ettől zöld vagy fekete a felület, és védi a rezet.\n- A forrasztási pontokon vékony **ón** vagy **arany** bevonat.',
        how: 'A rézzel bevont üvegszál-epoxi lapokra fényérzékeny lakkal „lefényképezik” a vezetékek mintáját, majd a felesleges rezet kimarják. A kész rétegeket hővel és nyomással összepréselik, a furatokat kifúrják és belülről rézzel bevonják. A részleteket a lenti gyártási lépéseknél nézheted meg.',
        fact: 'A memória és a PCIe vezetékei néha kanyarognak, mint egy kígyó. Nem tervezési hiba: a jelek fénysebesség közelében haladnak, és ha az egyik vezeték rövidebb, a bitek **nem egyszerre** érkeznének meg. A kanyarokkal egyforma hosszúra húzzák őket.'
      },
      {
        id: 'socket', z: 4, name: 'CPU-foglalat', svg: sock, explode: [0, -130], link: 'processzor',
        what: 'Ide kerül a **processzor**. A foglalat aljában több mint 1700 apró, rugós tűs érintkező van (LGA-foglalat), ezek nyomódnak rá a processzor alján lévő aranyozott pontokra. A fém keret és a kar szorítja le egyenletesen a processzort.',
        madeOf: '- Hőálló **műanyag** (folyadékkristályos polimer, LCP) ház.\n- **Rézötvözet** rugós tűk, **arany** bevonattal.\n- **Acél** rögzítőkeret és kar.',
        how: 'A műanyag házat fröccsöntik, a tűket külön sajtolják és aranyozzák, majd gépek ültetik be őket a házba. A kész foglalat alján apró **forrasztógolyók** vannak: a lapra helyezik, és kemencében (reflow) ráforrasztják, ugyanúgy, mint a többi felületszerelt alkatrészt.',
        fact: 'A foglalat tűi olyan finomak, hogy egy leejtett processzor egy pillanat alatt elgörbítheti őket. Ezért kapsz hozzá műanyag védősapkát, amit csak a beszereléskor veszel le.'
      },
      {
        id: 'vrm', z: 3, name: 'Tápellátás (VRM)', svg: vrm, explode: [0, -110], badge: I.pt(40, 92, B + 9),
        what: 'A tápegység 12 V-ot ad, de a processzornak kb. **1,0–1,4 V** kell, viszont nagyon nagy áramerősséggel: terhelés alatt akár **200 A** felett! A VRM (feszültségszabályzó modul) ezt az átalakítást végzi, több párhuzamos „fázisban”. A szürke kockák a **tekercsek**, mellettük a kapcsoló **MOSFET-ek** és a **kondenzátorok**. Ide tartozik a bal felső sarokban lévő 8 pines **CPU-tápcsatlakozó** is.',
        madeOf: '- Tekercsek: **ferrit** mag köré tekert vastag **réz**.\n- Teljesítmény-MOSFET-ek: szilícium tranzisztorok műanyag tokban.\n- Szilárd polimer **kondenzátorok** alumíniumházban.\n- Egy vezérlő chip (PWM-vezérlő), amely a fázisokat összehangolja.',
        how: 'Mindegyik alkatrészt külön gyárban készítik, majd felületszerelési technológiával (SMT) ültetik a lapra és forrasztják. A drágább alaplapokon fém hűtőborda kerül rájuk, mert a sok amper melegít.',
        fact: 'A VRM másodpercenként több százezerszer kapcsolja ki-be a 12 V-ot. A tekercs és a kondenzátor ezt a „szaggatott” áramot simítja egyenletes, alacsony feszültséggé. Ezt **kapcsolóüzemű feszültségátalakítónak** (buck konverternek) hívják.'
      },
      {
        id: 'ram', z: 4, name: 'RAM-foglalatok', svg: ram, explode: [0, -130],
        what: 'Négy hosszú foglalat a **memóriamodulok** (RAM) számára. A RAM a processzor „munkaasztala”: itt vannak a futó programok és adataik. A foglalatok párban dolgoznak (kétcsatornás mód), ezért vannak felváltva színezve: a párokat érdemes ugyanolyan színű helyekre tenni.',
        madeOf: 'Hőálló **műanyag** ház, benne 288 **rézötvözet** érintkező (DDR5 esetén) **arany** bevonattal, a végein pattintható reteszekkel.',
        how: 'A házat fröccsöntik, az érintkezőket beültetik, majd a foglalatot a lapra forrasztják. A foglalatok a processzorhoz a lehető legközelebb vannak, mert a memória jelei nagyon gyorsak, és minden centiméter számít.',
        fact: 'A RAM áram nélkül mindent elfelejt. Ezért kell a dokumentumot elmenteni: a mentés a RAM-ból a háttértárra (pl. az SSD-re) másolja az adatot.'
      },
      {
        id: 'atx24', z: 5, name: '24 pines tápcsatlakozó', svg: atx, explode: [0, -130],
        what: 'Itt kapja az alaplap a tápegységtől a **+12 V**, **+5 V** és **+3,3 V** feszültséget, valamint a földet. Néhány érintkező jelzésre szolgál: például a tápegység ezen keresztül kapja meg a „bekapcsolás” parancsot, amikor megnyomod a gépen a gombot.',
        madeOf: '**Nejlon** (poliamid) ház, benne ónozott **sárgaréz** vagy rézötvözet hüvelyek.',
        how: 'A házat fröccsöntik, a fém érintkezőket sajtolják és belepattintják. Ez **furatszerelt** alkatrész: a lábai átmennek a lapon, és alul forrasztják be, hogy bírja a dugó ki-be húzogatását.',
        fact: 'A gép bekapcsológombja nem kapcsol nagy áramot. Csak az alaplapnak szól, az pedig ezen a csatlakozón földre húzza a PS_ON jelet, és erre indul el a tápegység.'
      },
      {
        id: 'pcie', z: 5, name: 'PCIe-bővítőhelyek', svg: pcie, explode: [0, -120], badge: I.pt(80, 176, B + 11),
        what: 'Hosszú résekbe kerülnek a **bővítőkártyák**: leggyakrabban a **videokártya**, de lehet hálózati, hang- vagy rögzítőkártya is. A PCI Express soros kapcsolat: az adat „sávokon” (lane) halad, egy x16-os hely 16 sávot jelent. A felső, fémmel megerősített hely a videokártyáé, mert az nehéz.',
        madeOf: '**Műanyag** ház, **arany** bevonatú rézötvözet érintkezők (x16-nál 164 darab), a megerősített helyen **acél** borítás.',
        how: 'Fröccsöntés, érintkezők beültetése, majd forrasztás a lapra. A fémborítást utólag pattintják vagy forrasztják rá.',
        fact: 'Egy PCIe 5.0 x16-os hely irányonként kb. **64 GB/s**-ot visz át: ez nagyjából egy teljes 4K filmnyi adat egy másodperc alatt.'
      },
      {
        id: 'm2', z: 6, name: 'M.2 SSD', svg: m2, explode: [0, -130],
        what: 'Rágógumi-méretű **háttértár**, közvetlenül az alaplapra csavarozva. Itt van az operációs rendszer, a programjaid és a fájljaid. Áram nélkül is megőrzi az adatot. PCIe-sávokon csatlakozik, ezért nagyon gyors: akár **7000 MB/s**, ami tízszer több, mint a SATA SSD-ké.',
        madeOf: '- Kis NYÁK, rajta **NAND flash** memóriachipek (szilícium, akár 200-nál is több rétegben egymásra épített tárolócellákkal).\n- Egy **vezérlő chip**, ami a kopást is elosztja a cellák között.\n- A fehér címke alatt gyakran hővezető réteg.',
        how: 'A memóriachipeket ugyanúgy gyártják, mint a processzort, csak itt cellákat építenek egymás fölé (3D NAND). A kész chipeket a kis lapra forrasztják, az SSD-t teszt után dobozolják. Az alaplapon csak a foglalat és a rögzítőcsavar-helye van.',
        fact: 'A 2280-as típusjelzés a méret: **22 mm** széles és **80 mm** hosszú.'
      },
      {
        id: 'chipset', z: 6, name: 'Lapkakészlet (chipset)', svg: chip, explode: [0, -130],
        what: 'A processzor „titkára”. A processzor nem tud közvetlenül minden eszközzel foglalkozni, ezért a lapkakészlet (PCH) intézi a lassabb kapcsolatokat: **USB**-portok, **SATA**, további PCIe-helyek, hálózat, hang. Egy gyors kapcsolattal kötődik a processzorhoz, és ő gyűjti össze neki ezek forgalmát.',
        madeOf: 'Egy **szilícium** lapka (a processzorhoz hasonló, de egyszerűbb chip), a tetején **alumínium** hűtőborda.',
        how: 'A chipet egy félvezetőgyárban készítik, gyakran egy kicsit régebbi, olcsóbb gyártástechnológiával, mint a processzort. A kész tokot BGA-forrasztással (golyóforrasztás) rögzítik a lapra, majd ráragasztják a hűtőt.'
      },
      {
        id: 'cmos', z: 6, name: 'CMOS-elem', svg: cmos, explode: [0, -130],
        what: 'Egy kis gombelem, amely akkor is táplálja a **valós idejű órát** (RTC), amikor a gép ki van kapcsolva, sőt ki van húzva a konnektorból. Ezért tudja a gép bekapcsoláskor a pontos időt. Ha lemerül, a gép minden indításkor rossz dátumot mutat, és elfelejthet egyes beállításokat.',
        madeOf: 'Egy **CR2032** típusú, 3 V-os **lítium** gombelem: lítium anód, mangán-dioxid katód, acél ház.',
        how: 'Az elemgyárban préselik és zárják le. Az alaplapon csak a tartója van beforrasztva, az elemet kézzel pattintják be, így cserélhető.',
        fact: 'A neve onnan ered, hogy régen egy kis **CMOS** technológiájú memóriát (és benne a BIOS-beállításokat) is ez tartott életben. Egy ilyen elem általában 3–10 évig bírja.'
      },
      {
        id: 'bios', z: 6, name: 'BIOS/UEFI chip', svg: bios, explode: [0, -130], badge: I.pt(226, 292, B),
        what: 'Egy apró, nyolclábú **flash memória**chip. Benne van a gép legelső programja, a **UEFI** (régebben BIOS). Bekapcsoláskor ez fut le először: ellenőrzi a hardvert (POST), beállítja a memóriát és a processzort, majd elindítja az operációs rendszert a háttértárról.',
        madeOf: 'Szilícium flash-memória lapka (általában 16–32 MB), fekete **epoxi** tokban, ónozott réz lábakkal.',
        how: 'A chipet félvezetőgyárban készítik, és vagy előre beírják a programot, vagy az alaplapgyárban az utolsó teszt előtt „égetik” rá. Később te is frissítheted a UEFI-t a gyártó honlapjáról.',
        fact: 'A BIOS jelentése Basic Input/Output System, vagyis alapvető be- és kimeneti rendszer. Sokan ma is BIOS-nak hívják a UEFI-t.'
      },
      {
        id: 'sata', z: 7, name: 'SATA-csatlakozók', svg: sata, explode: [0, -130],
        what: 'Ide csatlakoztathatók kábellel a régebbi típusú háttértárak: **merevlemez** (HDD), 2,5 colos **SSD** és optikai meghajtó. A SATA III legfeljebb kb. **600 MB/s** sebességű, a nagy kapacitású, olcsó merevlemezekhez ma is jól jön.',
        madeOf: '**Műanyag** L alakú ház, benne 7 **rézötvözet** érintkező (2 adatpár + 3 föld).',
        how: 'Fröccsöntés és érintkező-beültetés után a lap szélére forrasztják. Oldalra néznek, hogy a kábel ne akadjon bele a videokártyába.'
      },
      {
        id: 'io', z: 2, name: 'Hátlapi csatlakozók (I/O)', svg: io, explode: [-40, -100],
        what: 'A gép hátulján kilógó csatlakozók: **USB**, **HDMI**/DisplayPort a beépített grafikához, **Ethernet** (hálózat) és **hang**csatlakozók. Ezeket látod, amikor hátulról bedugod a kábeleket.',
        madeOf: '- **Ónozott acél** vagy rézötvözet burkolat (árnyékolás a zavarok ellen).\n- **Műanyag** szigetelő nyelvek (a kék szín az USB 3-at jelzi).\n- **Aranyozott** érintkezők.\n- A hálózati aljzatban kis **transzformátorok** a leválasztáshoz.',
        how: 'Az aljzatokat külön gyártják, és **furatszerelt** módon forrasztják be, hogy a kábel dugdosását is kibírják. Elé kerül egy fém takarólemez (I/O shield), amely a ház nyílásához illeszkedik.',
        fact: 'Az USB-aljzat belseje színkódos: fekete az USB 2.0, kék az USB 3.0, piros vagy sárga gyakran az, amelyik kikapcsolt gépnél is tölt.'
      }
    ],
    steps: [
      { icon: '🧵', title: 'Az alapanyag: üvegszál és réz', text: 'Az alap az **FR-4**: üvegszálas szövet, amelyet epoxigyantával itatnak át, és mindkét oldalára vékony **rézfóliát** préselnek. A gyanta tűzálló adalékot is kap (az FR a flame retardant, vagyis lángálló rövidítése). Ebből a táblából készülnek a belső rétegek.', parts: ['pcb'] },
      { icon: '💡', title: 'A belső rétegek mintázata', text: 'A rezet fényérzékeny lakkal vonják be, és egy filmen keresztül UV-fénnyel megvilágítják, ahol vezeték lesz. Előhívás után vegyszerrel **kimarják** a fölösleges rezet: csak a vezetékek maradnak. Kamerás gép (AOI) ellenőrzi, nincs-e szakadás vagy zárlat.', parts: ['pcb'] },
      { icon: '🥪', title: 'Préselés (laminálás)', text: 'A kész belső rétegeket ragasztó gyantarétegekkel (prepreg) felváltva egymásra rakják, és hő alatt, nagy **nyomással** egyetlen kemény lappá préselik. Egy alaplap így általában **6–12 rétegű**, ennek ellenére csak kb. 1,6 mm vastag.', parts: ['pcb'] },
      { icon: '🕳️', title: 'Fúrás és furatgalvanizálás', text: 'Számítógép-vezérelt gépek több tízezer lyukat fúrnak (a legkisebbeket lézerrel). A furatok falát vegyi úton, majd galvanizálással **rézzel bevonják**: így lesznek a rétegeket összekötő **via**-k. Ezután a külső rétegek mintázatát is kialakítják.', parts: ['pcb'] },
      { icon: '🎨', title: 'Lakk, felirat, felületkezelés', text: 'A lapot **forrasztásgátló lakkal** vonják be (ettől zöld vagy fekete), csak a forrasztási pontok maradnak szabadon. Ezekre vékony ón vagy **arany** réteg kerül, hogy jól forrasztható legyen és ne oxidálódjon. Végül fehér festékkel ráírják a feliratokat és jelöléseket.', parts: ['pcb'] },
      { icon: '🤖', title: 'Beültetés robotokkal (SMT)', text: 'Egy fémsablonon át **forrasztópasztát** (ónpor és folyasztószer) nyomnak a forrasztási pontokra. Ezután beültetőgépek óránként több tízezer alkatrészt helyeznek a helyére: ellenállásokat, kondenzátorokat, chipeket, a CPU- és RAM-foglalatokat. A lap ezután egy **reflow kemencén** halad át, ahol kb. 240 °C-on a paszta megolvad, és minden alkatrész egyszerre beforrad.', parts: ['socket', 'vrm', 'ram', 'chipset', 'bios', 'm2'] },
      { icon: '🔩', title: 'Furatszerelt alkatrészek', text: 'A nagy igénybevételnek kitett csatlakozók (hátlapi I/O, 24 pines táp, PCIe-helyek) lábai átmennek a lapon. Ezeket **hullámforrasztással** vagy szelektív forrasztással rögzítik alulról, így sokkal erősebben tartanak.', parts: ['io', 'atx24', 'pcie', 'sata'] },
      { icon: '🧪', title: 'Tesztelés és UEFI-feltöltés', text: 'Tűágyas tesztelő ellenőrzi az összeköttetéseket, majd a lapot processzorral, memóriával elindítják (funkcionális teszt). Ilyenkor kerül fel vagy frissül a **UEFI** a flash chipen. A hibás lapokat javítják vagy selejtezik.', parts: ['bios', 'cmos'] },
      { icon: '📦', title: 'Csomagolás', text: 'A kész alaplap **antisztatikus tasakba** kerül, mert egy apró sztatikus kisülés (amit te nem is érzel) is tönkreteheti a chipeket. Mellé kerülnek a kábelek, csavarok és a hátlapi takarólemez.' }
    ],
    history: [
      { year: '1981', text: 'Az **IBM PC** „rendszerlapja”: a processzor, a memória és a bővítőhelyek egyetlen lapon vannak. Ez lesz a mai alaplapok őse.' },
      { year: '1984', text: 'Az IBM PC/AT 16 bites **ISA** bővítőhelyei hosszú időre szabvánnyá válnak.' },
      { year: '1992', text: 'Az Intel bemutatja a **PCI** buszt, amely gyorsabb és automatikusan felismeri a kártyákat (plug and play).' },
      { year: '1995', text: 'Megjelenik az **ATX** szabvány: meghatározza az alaplap méretét, a csatlakozók helyét és a tápcsatlakozót. A mai asztali gépek nagy része is ezt követi.' },
      { year: '2003–04', text: 'Megjelenik a **SATA** a háttértárakhoz és a **PCI Express** a bővítőkártyákhoz: mindkettő soros, gyors kapcsolat.' },
      { year: '2010-es évek', text: 'A régi BIOS helyét átveszi a **UEFI**: grafikus beállítómenü, egeres kezelés, nagy lemezek támogatása, biztonságos rendszerindítás.' },
      { year: '2013 körül', text: 'Megjelenik az **M.2** csatlakozó: az SSD kábel nélkül, közvetlenül az alaplapra kerül.' },
      { year: 'ma', text: 'DDR5 memória, PCIe 5.0, USB4: egyre több réteg és egyre pontosabb vezetékezés kell, hogy a jelek épségben átérjenek.' }
    ],
    quiz: [
      { q: 'Miért kanyarognak egyes rézvezetékek az alaplapon?', options: ['Hogy egyforma hosszúak legyenek, és a jelek egyszerre érkezzenek', 'Díszítésnek', 'Hogy több áramot bírjanak', 'Gyártási hiba miatt'], answer: 0, explain: 'A gyors jeleknél számít a pár milliméteres különbség is, ezért kiegyenlítik a vezetékek hosszát.' },
      { q: 'Mit csinál a VRM?', options: ['A 12 V-ot a processzornak kellő kb. 1 V-ra alakítja', 'Tárolja a programokat', 'Hűti a videokártyát', 'Hálózati kapcsolatot ad'], answer: 0, explain: 'A VRM kapcsolóüzemű átalakító: nagy áramot ad alacsony feszültségen.' },
      { q: 'Mire való a CMOS-elem?', options: ['Kikapcsolt állapotban is járatja az órát', 'Ebből kap áramot a processzor', 'Ez indítja a tápegységet', 'Ez tölti a telefonodat'], answer: 0, explain: 'A kis gombelem a valós idejű órát (és egyes beállításokat) tartja életben.' },
      { q: 'Hány rétegből áll általában egy alaplap?', options: ['6–12 rétegből', 'Mindig 1 rétegből', 'Kb. 100 rétegből', '2 rétegből, a két oldalából'], answer: 0, explain: 'A belső rétegekben futnak a vezetékek és a táp-/földsíkok, ezeket préselik egybe.' },
      { q: 'Melyik program fut le először, amikor bekapcsolod a gépet?', options: ['A UEFI (BIOS) a flash chipről', 'A böngésző', 'Az operációs rendszer a RAM-ból', 'A videokártya illesztőprogramja'], answer: 0, explain: 'A UEFI ellenőrzi a hardvert, és ő tölti be az operációs rendszert.' }
    ]
  });
})();
