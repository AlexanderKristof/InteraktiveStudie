/* Modell: Lítiumion akkucella (tasakcella / pouch) – rétegenként, izometrikus nézetben. */
(function () {
  var I = STUDIE.draw.iso(300, 300, 1);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1]) + 8]; }

  // Egy vékony „lap” a helper box()-ával, és egy kis fül (lug), ami kilóg a jobb első élen.
  function sheet(x, y, w, d, z, h, color, extra) { return I.box(x, y, z, w, d, h, color, extra); }
  function dots(x0, y0, w, d, z, step, fill, r) {
    var s = '';
    for (var x = x0 + step / 2; x < x0 + w; x += step) for (var y = y0 + step / 2; y < y0 + d; y += step) {
      var p = I.pt(x + ((y * 7) % 5) - 2, y + ((x * 3) % 5) - 2, z);
      s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + r + '" fill="' + fill + '"' + NS + '/>';
    }
    return s;
  }
  function text(p, str, cls, anchor, dy) {
    return '<text class="' + cls + '" x="' + p[0].toFixed(1) + '" y="' + (p[1] + (dy || 0)).toFixed(1) + '" text-anchor="' + (anchor || 'middle') + '">' + str + '</text>';
  }

  // Tasak alsó fele: mélyhúzott „tálca” peremmel
  var bottom = sheet(-122, -82, 244, 164, 0, 12, '#aeb7c4') +
    I.face(-112, -72, 12.05, 224, 144, '#7f8999', ' stroke="rgba(0,0,0,.3)" stroke-width="0.8"') +
    I.face(-122, -82, 12.1, 244, 10, 'rgba(255,255,255,.25)', ' stroke="none"');

  // Alumíniumfólia (+ áramgyűjtő) a fülcsonkkal
  var al = sheet(-104, -66, 208, 132, 3, 1.5, '#d7dce4') + sheet(104, -50, 16, 26, 3, 1.5, '#d7dce4');

  // Katód: fekete-szürke NMC bevonat, apró szemcsékkel
  var cathode = sheet(-100, -62, 200, 124, 4.5, 3, '#4f5d7e') + dots(-100, -62, 200, 124, 7.6, 14, '#8a98bd', 1.6);

  // Elektrolit: átlátszó kék „folyadék” lítiumionokkal
  var elec = I.face(-100, -62, 8, 200, 124, 'rgba(64,166,226,.38)', ' stroke="#3d9ad6" stroke-width="1" stroke-dasharray="5 3"');
  [[60, 48], [85, 18], [22, 54], [-28, 56], [90, -22], [48, 12], [-62, 48], [-88, 34], [5, 30], [-40, 20]].forEach(function (c) {
    var p = I.pt(c[0], c[1], 8);
    elec += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="5.5" fill="#f2c14e" stroke="#b07f10" stroke-width="1"/>' +
      '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 3).toFixed(1) + '" text-anchor="middle" font-size="8" font-weight="700" font-family="sans-serif" fill="#5a3d00">+</text>';
  });

  // Szeparátor: fehér, likacsos műanyag fólia
  var sep = sheet(-106, -68, 212, 136, 9, 1, '#e6e9ee') + dots(-106, -68, 212, 136, 10.05, 12, 'rgba(120,130,150,.45)', 1);

  // Anód: grafit bevonat
  var anode = sheet(-102, -64, 204, 128, 10, 3, '#6a6f78');
  for (var gx = -96; gx < 100; gx += 16) anode += I.poly([I.pt(gx, -64, 13.05), I.pt(gx + 8, -64, 13.05), I.pt(gx + 8, 64, 13.05), I.pt(gx, 64, 13.05)], 'rgba(255,255,255,.08)', NS + ' stroke="none"');

  // Rézfólia (− áramgyűjtő) a fülcsonkkal
  var cu = sheet(-104, -66, 208, 132, 13, 1.5, '#c97a45') + sheet(104, 24, 16, 26, 13, 1.5, '#c97a45');

  // Pólusfülek: + alumínium, − nikkelezett réz, rajtuk a tömítő műanyag csík
  var tabs = sheet(112, -50, 58, 26, 8, 2, '#cfd5de') + I.box(118, -53, 7.5, 9, 32, 3.5, '#e8c35a') +
    sheet(112, 24, 58, 26, 8, 2, '#b9bec6') + I.box(118, 21, 7.5, 9, 32, 3.5, '#e8c35a');
  tabs += text(I.pt(176, -37, 10), '+', 'lbl" style="font-size:20px', 'start', 7) + text(I.pt(176, 37, 10), '−', 'lbl" style="font-size:20px', 'start', 7);

  // Tasak felső fele: átlátszónak rajzolva, hogy lásd, mi van alatta
  var lid = I.box(-122, -82, 15, 244, 164, 3, 'rgba(190,200,214,.42)', ' stroke="#8d99ab" stroke-width="1.2" stroke-linejoin="round"') +
    I.face(-112, -72, 18.05, 224, 144, 'rgba(255,255,255,.18)', ' stroke="#8d99ab" stroke-width="0.8" stroke-dasharray="4 3"');
  var lp = I.pt(-20, 0, 18);
  lid += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] + 4).toFixed(1) + '" text-anchor="middle" font-size="13" font-family="sans-serif" font-weight="700" fill="#6b7686" transform="rotate(0)">Li-ion 3,7 V</text>';

  STUDIE.addModel({
    id: 'akkucella',
    title: 'Lítiumion akkucella',
    icon: '🔋',
    color: '#3d9ad6',
    category: 'Energia',
    keywords: 'akkumulátor akku cella lítium Li-ion ion tasakcella pouch 21700 18650 hengeres anód katód grafit NMC LFP elektrolit szeparátor töltés kisütés elektromos autó',
    summary: 'Egy villanyautó akkujában több ezer ilyen cella van: vékony rétegek, köztük vándorló lítiumionokkal.',
    scale: 'tasakcella kb. 10 × 30 cm, 1 cm vastag; egy réteg vékonyabb egy hajszálnál',
    viewBox: '0 -70 640 600',
    intro: 'Az akkucella kémiai energiát tárol, és elektromos áramként adja vissza. Belül egyszerű a felépítése: két elektróda (**anód** és **katód**), köztük egy szigetelő **szeparátor**, és minden át van itatva **elektrolittal**.\n\n**Töltéskor** a töltő „áttolja” a lítiumionokat a katódból a grafit anódba. **Használat (kisütés) közben** az ionok maguktól visszavándorolnak a katódba, az elektronok pedig közben a külső áramkörön keresztül mennek át: ez az áram hajtja a motort vagy a telefonodat.\n\nA rajzon egyetlen rétegsort látsz. Egy valódi cellában ez a „szendvics” több tucatszor ismétlődik egymás fölött.',
    parts: [
      {
        id: 'lid', z: 8, name: 'Tasak (felső fólia)', svg: lid, explode: [110, -235], badge: B(-70, -50, 18),
        what: 'A cella „csomagolása”. Légmentesen zár, hogy se nedvesség ne jusson be, se elektrolit ki. A tasakcella onnan kapta a nevét, hogy a rétegeket egy hajlékony tasakba hegesztik.',
        madeOf: 'Többrétegű **laminált fólia**: kívül nejlon (mechanikai védelem), középen vékony **alumínium** réteg (ez a vízzáró gát), belül polipropilén, ami hőre olvad, így össze lehet hegeszteni.',
        how: 'A fóliát tekercsből vágják, az alsó felébe szerszámmal mélyedést húznak, belerakják a rétegköteget, majd három oldalon hővel összehegesztik. Az elektrolit betöltése után vákuumban zárják le a negyedik oldalt is.',
        fact: 'A hengeres celláknak (pl. 18650, 21700) acél házuk van, a tetejükön **biztonsági szeleppel**: ha túlhevül a cella, és nő benne a nyomás, a szelep kinyit, és megszakítja az áramot. A tasakcellánál ezt a modul és a BMS védelme pótolja.'
      },
      {
        id: 'cu', z: 6, name: 'Rézfólia (− áramgyűjtő)', svg: cu, explode: [88, -180], badge: B(-80, 66, 14),
        what: 'Erre a nagyon vékony fémfóliára viszik fel az anód grafitját. Ez gyűjti össze az elektronokat, és vezeti el őket a negatív pólusig.',
        madeOf: 'Tiszta **réz**, mindössze kb. 6–10 mikrométer vastag (egy hajszál kb. 70 µm).',
        how: 'Elektrolitikus úton gyártják: egy forgó hengerre rezet választanak le oldatból, majd lehúzzák róla a vékony fóliát, és tekercsre csévélik.',
        fact: 'Az anódhoz rezet használnak, mert az alumínium az anód alacsony feszültségén ötvözetet képezne a lítiummal, és tönkremenne.'
      },
      {
        id: 'anode', terms: ['e-mobilitas/cellakemia'], z: 5, name: 'Anód (grafit)', svg: anode, explode: [66, -128], badge: B(-50, 64, 13),
        what: 'A negatív elektróda. **Töltéskor** ide vándorolnak be a lítiumionok, és a grafit rétegei közé „bújnak” be, mint könyvek közé tett lapok. Minél több ion fér el itt, annál több energiát tud tárolni a cella.',
        madeOf: '**Grafit** (természetes vagy mesterséges szén) por, kevés kötőanyaggal és vezetőképes korommal. Újabb cellákban egy kis **szilícium** is van benne, mert az még több lítiumot tud befogadni.',
        how: 'A grafitport vízzel és kötőanyaggal sűrű pasztává keverik, vékony rétegben a rézfóliára kenik (mindkét oldalára), kiszárítják, majd hengerek között tömörre préselik (kalanderezés).'
      },
      {
        id: 'sep', z: 4, name: 'Szeparátor', svg: sep, explode: [44, -82], badge: B(-20, 68, 10),
        what: 'Vékony szigetelő hártya az anód és a katód között. Az ionokat átengedi, az elektronokat nem. Ha a két elektróda összeérne, rövidzár lenne, és a cella felforrósodhatna.',
        madeOf: 'Mikroszkopikus **lyukacsos műanyag fólia** (polietilén vagy polipropilén), gyakran vékony kerámia bevonattal, ami hőállóbbá teszi.',
        how: 'Megolvasztott műanyagból fóliát húznak, majd nyújtással vagy oldószerrel milliónyi apró pórust alakítanak ki benne. Kb. 10–25 µm vastag.',
        fact: 'Sok szeparátor „biztosítékként” is működik: ha kb. 130 °C fölé melegszik, a pórusai összezáródnak, és leáll az ionok áramlása.'
      },
      {
        id: 'elec', terms: ['e-mobilitas/belso-ellenallas', 'e-mobilitas/c-rata'], z: 3, name: 'Elektrolit', svg: elec, explode: [22, -40], badge: B(10, 62, 8),
        what: 'Az a folyadék, amelyben a lítiumionok úsznak az elektródák között. Valójában mindent átitat: a pórusokat, a szeparátort és az elektródák belsejét is. Itt külön rétegként rajzoltuk, hogy látszódjon.',
        madeOf: 'Szerves oldószerek keveréke (pl. etilén-karbonát, dimetil-karbonát), benne oldott **lítiumsó** (LiPF₆). Ez gyúlékony, ezért fontos, hogy a cella ne sérüljön meg.',
        how: 'Vegyi üzemben keverik, nagyon száraz környezetben, mert a víz tönkretenné. A cellába vákuumban töltik be, hogy minden pórusba beszivárogjon.',
        fact: 'A kutatók **szilárdtest-akkumulátorokon** dolgoznak, amelyekben a folyadék helyett szilárd elektrolit van. Ez biztonságosabb lehet, és több energiát tárolhat.'
      },
      {
        id: 'cathode', terms: ['e-mobilitas/cellakemia', 'e-mobilitas/hofutas'], z: 2, name: 'Katód (NMC vagy LFP)', svg: cathode, explode: [0, 2], badge: B(40, 62, 7), link: 'atom',
        what: 'A pozitív elektróda: ez határozza meg leginkább a cella feszültségét és kapacitását. Kisütött állapotban itt vannak a lítiumatomok. **Használat közben** a lítiumionok ide térnek vissza az anódból, az elektronok pedig a külső áramkörön (a motoron) keresztül érkeznek meg.',
        madeOf: 'Lítium-fémoxid por, kötőanyaggal és korommal:\n\n- **NMC**: lítium-nikkel-mangán-kobalt-oxid, sok energia kis tömegben (nagy hatótávú autók)\n- **LFP**: lítium-vas-foszfát, olcsóbb, tartósabb és biztonságosabb, de nehezebb\n\nEzek a fémek bányákból érkeznek, ezért fontos az akkuk **újrahasznosítása**.',
        how: 'A fémsókból kicsapással és több száz fokos hevítéssel apró kristályos szemcséket gyártanak. Ezt pasztává keverik, az alufólia mindkét oldalára kenik, szárítják és préselik, akárcsak az anódot.'
      },
      {
        id: 'al', z: 1, name: 'Alumíniumfólia (+ áramgyűjtő)', svg: al, explode: [-22, 48], badge: B(70, 66, 4),
        what: 'A katód hordozója és áramgyűjtője. Ezen keresztül jut el az áram a pozitív pólusig.',
        madeOf: '**Alumínium** fólia, kb. 10–15 µm vastag. A katód magas feszültségén az alumínium nem korrodálódik, és könnyű.',
        how: 'Alumínium tömbökből sok lépésben, egyre vékonyabbra hengerlik, akárcsak a konyhai alufóliát, csak sokkal tisztább anyagból és pontosabb vastagságra.'
      },
      {
        id: 'tabs', z: 7, name: 'Pólusfülek (+ és −)', svg: tabs, explode: [95, 60], badge: B(160, 37, 8),
        what: 'A cella két kivezetése. A **pozitív** fül az alufóliákhoz, a **negatív** a rézfóliákhoz csatlakozik. Ezeket hegesztik össze a szomszédos cellák füleivel a modulban.',
        madeOf: 'Pozitív: **alumínium**. Negatív: **nikkelezett réz** vagy nikkel. A sárga csík műanyag tömítés, ezen keresztül hegesztik bele a fület a tasak szélébe.',
        how: 'A sok fólia kilógó csonkját egy kötegbe fogják, és **ultrahangos hegesztéssel** a fülhöz hegesztik: a rezgés hőt termel, és összeolvasztja a fémeket.'
      },
      {
        id: 'bottom', z: 0, name: 'Tasak (alsó, mélyhúzott rész)', svg: bottom, explode: [-44, 108], badge: B(-118, 60, 12),
        what: 'A tasak alsó fele, amelybe mélyedést húztak. Ebbe kerül a rétegköteg. A széle (perem) körben össze van hegesztve a felső fóliával.',
        madeOf: 'Ugyanaz a nejlon–alumínium–polipropilén laminált fólia, mint a felső rész.',
        how: 'Hideg mélyhúzással formázzák: egy bélyeg belenyomja a fóliát egy szerszámüregbe, de úgy, hogy az alumíniumréteg ne repedjen meg.'
      }
    ],
    steps: [
      { icon: '⛏️', title: 'Nyersanyagok', text: 'A lítiumot sós tavak vizéből (Dél-Amerika) vagy kőzetből (Ausztrália) nyerik, a nikkel, kobalt, mangán és grafit is bányákból érkezik. Vegyi üzemekben tisztítják őket **akkuminőségűre**, ami nagyon tiszta anyagot jelent.' },
      { icon: '🥣', title: 'Keverés és bevonás', text: 'Az elektróda-porokat kötőanyaggal és oldószerrel sűrű, festékszerű **pasztává** keverik. Hosszú, gyorsan futó fóliákra kenik: a grafitot a **rézfóliára**, a katódanyagot az **alufóliára**, mindkét oldalukra. Egy hosszú kemencében szárítják.', parts: ['anode', 'cu', 'cathode', 'al'] },
      { icon: '🗜️', title: 'Préselés és vágás', text: 'A bevont fóliákat acélhengerek között egyenletes vastagságúra préselik (**kalanderezés**), majd lapokra vágják, a kilógó fülcsonkokkal együtt.', parts: ['anode', 'cathode'] },
      { icon: '🥪', title: 'Rétegezés', text: 'Robotok rakják egymásra: katód, **szeparátor**, anód, szeparátor, katód… akár 30–60 rétegpárt. A rétegek közé soha nem kerülhet por vagy fémszilánk, mert az átszúrhatja a szeparátort. Ezért **száraz, tiszta teremben** dolgoznak.', parts: ['sep', 'anode', 'cathode'] },
      { icon: '🔩', title: 'Fülek hegesztése és tasakolás', text: 'A fóliacsonkokat ultrahanggal a **pólusfülekhez** hegesztik. A köteget a mélyhúzott **tasakba** teszik, és három oldalát lehegesztik.', parts: ['tabs', 'bottom', 'lid'] },
      { icon: '💧', title: 'Elektrolit betöltése', text: 'Vákuumban betöltik az **elektrolitot**, hagyják beszívódni, majd lezárják az utolsó oldalt is.', parts: ['elec'] },
      { icon: '⚡', title: 'Formázás (első töltés)', text: 'Az első, lassú töltéskor az anód felületén vékony védőréteg (**SEI**) alakul ki. Ez nélkülözhetetlen a hosszú élettartamhoz. A formázás és pihentetés **napokig** is tarthat, és közben gáz keletkezik, amit kiszívnak, mielőtt végleg lezárják a tasakot.' },
      { icon: '🏷️', title: 'Mérés és válogatás', text: 'Minden cellát megmérnek (kapacitás, belső ellenállás, önkisülés), és a nagyon hasonlóakat csoportosítják. Egy akkupakkba csak egymáshoz illő cellák kerülhetnek, különben a leggyengébb cella határozná meg az egészet.' }
    ],
    history: [
      { year: '1800', text: 'Alessandro Volta megépíti az első **elemet** (Volta-oszlop) cink- és rézlemezekből.' },
      { year: '1859', text: 'Gaston Planté feltalálja az **ólomakkumulátort**: ez az első újratölthető akku, ma is ott van a legtöbb autóban.' },
      { year: '1976', text: 'Stanley Whittingham bemutatja az első lítiumos akkut, amelyben az ionok rétegek közé „bújnak”.' },
      { year: '1980', text: 'John Goodenough rájön, hogy a **lítium-kobalt-oxid** katód sokkal nagyobb feszültséget ad.' },
      { year: '1985', text: 'Josino Akira (Akira Yoshino) a lítiumfém helyett **szén anódot** használ: ettől lesz biztonságos az akku.' },
      { year: '1991', text: 'A Sony piacra dobja az első **lítiumion-akkut** egy videokamerában.' },
      { year: '2019', text: 'Goodenough, Whittingham és Yoshino **kémiai Nobel-díjat** kap a lítiumion-akkumulátorért.' },
      { year: 'ma', text: 'A cellák ára 1991 óta több mint **97%-kal** csökkent. Terjednek az olcsóbb **LFP** cellák, és fejlesztik a nátriumion- és a szilárdtest-akkukat.' }
    ],
    quiz: [
      { q: 'Merre mozognak a lítiumionok töltés közben?', options: ['A katódból az anódba', 'Az anódból a katódba', 'A pólusfülekből a tasakba', 'Sehova, csak az elektronok mozognak'], answer: 0, explain: 'Töltéskor a töltő az ionokat a grafit anódba „tolja”, kisütéskor maguktól visszavándorolnak a katódba.' },
      { q: 'Mi a szeparátor feladata?', options: ['Átengedi az ionokat, de megakadályozza, hogy az elektródák összeérjenek', 'Elektromos áramot termel', 'Hűti a cellát', 'Tárolja a lítiumot'], answer: 0, explain: 'Ha az anód és a katód összeérne, rövidzár lenne. A szeparátor likacsos, így az ionok átjutnak rajta.' },
      { q: 'Melyik fémfóliára kerül az anód grafitja?', options: ['Rézfóliára', 'Alumíniumfóliára', 'Aranyfóliára', 'Acéllemezre'], answer: 0, explain: 'Az anód a rézfólián, a katód az alufólián van.' },
      { q: 'Miben különbözik az LFP katód az NMC-től?', options: ['Olcsóbb és tartósabb, de kevesebb energiát tárol egy kilogrammban', 'Csak telefonokban használják', 'Nincs benne lítium', 'Sokkal gyorsabban lemerül'], answer: 0, explain: 'Az LFP-ben vas és foszfát van, nincs benne drága kobalt és nikkel.' }
    ]
  });
})();
