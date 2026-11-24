/* Modell: Az atom – egy szilíciumatom (14 proton, 14 neutron, 14 elektron) héjmodellje,
 * jobbra a proton és a neutron nagyított belsejével (kvarkok, gluonok). Nem méretarányos. */
(function () {
  var C = [205, 210];                 // az atom közepe
  var R = [62, 112, 162];             // elektronhéjak sugara (K, L, M)
  function circ(x, y, r, fill, extra) {
    return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r + '" fill="' + fill + '"' + (extra || '') + '/>';
  }
  function txt(x, y, s, cls, extra) {
    return '<text class="' + cls + '" x="' + x + '" y="' + y + '" text-anchor="middle"' + (extra || '') + '>' + s + '</text>';
  }
  var ball = ' stroke="rgba(0,0,0,.35)" stroke-width="0.8"';

  var defs = '<defs>' +
    '<radialGradient id="atm-p" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffb3a8"/><stop offset=".45" stop-color="#e0574f"/><stop offset="1" stop-color="#9c2c26"/></radialGradient>' +
    '<radialGradient id="atm-n" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#eef1f6"/><stop offset=".45" stop-color="#9ea7b8"/><stop offset="1" stop-color="#5d6678"/></radialGradient>' +
    '<radialGradient id="atm-e" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#b9d6ff"/><stop offset=".5" stop-color="#3d8bf0"/><stop offset="1" stop-color="#1b4fa8"/></radialGradient>' +
    '<radialGradient id="atm-v" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff0c2"/><stop offset=".5" stop-color="#f2b134"/><stop offset="1" stop-color="#a86d06"/></radialGradient>' +
    '<radialGradient id="atm-cloud"><stop offset="0" stop-color="#5b8cf0" stop-opacity=".42"/><stop offset=".35" stop-color="#5b8cf0" stop-opacity=".2"/>' +
    '<stop offset=".7" stop-color="#5b8cf0" stop-opacity=".12"/><stop offset="1" stop-color="#5b8cf0" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="atm-core"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".75"/><stop offset=".6" stop-color="#ff9a5a" stop-opacity=".35"/><stop offset="1" stop-color="#ff9a5a" stop-opacity="0"/></radialGradient>' +
    '</defs>';

  /* Háttér: felirat és a nagyítás vonalai (nem kattintható) */
  var backdrop = defs +
    '<text class="lbl" x="14" y="26" font-size="17">Szilícium (Si)</text>' +
    '<text class="lbl-muted" x="14" y="44">14 proton · 14 neutron · 14 elektron</text>' +
    '<text class="lbl-muted" x="14" y="60" font-size="11">(nem méretarányos)</text>' +
    '<line x1="222" y1="196" x2="452" y2="128" stroke="#8a94ab" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/>' +
    '<line x1="222" y1="224" x2="452" y2="292" stroke="#8a94ab" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/>' +
    circ(505, 112, 62, 'rgba(224,87,79,.12)', ' stroke="#e0574f" stroke-width="1.5" stroke-dasharray="5 4"') +
    circ(505, 287, 62, 'rgba(158,167,184,.14)', ' stroke="#8a94ab" stroke-width="1.5" stroke-dasharray="5 4"') +
    txt(505, 40, 'proton nagyítva', 'lbl-muted') + txt(505, 216, 'neutron nagyítva', 'lbl-muted');

  /* 1. Elektronfelhő */
  var cloud = circ(C[0], C[1], 190, 'url(#atm-cloud)');
  for (var k = 0; k < 140; k++) { // a „felhő” pöttyei: ahol nagyobb valószínűséggel lehet elektron
    var a = k * 2.39996, rr = R[k % 3] + Math.sin(k * 7.3) * 16;
    cloud += circ(C[0] + rr * Math.cos(a), C[1] + rr * Math.sin(a), 1.3, 'rgba(91,140,240,.55)');
  }
  /* 2. Elektronhéjak */
  var shells = '';
  R.forEach(function (r, i) {
    shells += circ(C[0], C[1], r, 'none', ' stroke="transparent" stroke-width="12"') +
      circ(C[0], C[1], r, 'none', ' stroke="#7f8db0" stroke-width="1.6" opacity=".85"');
    shells += txt(C[0] + r * 0.707 + 9, C[1] - r * 0.707 - 4, ['K', 'L', 'M'][i], 'lbl-muted', ' font-weight="700"');
  });
  /* 3. Belső elektronok (K: 2, L: 8) és 4. vegyértékelektronok (M: 4) */
  var elec = '', val = '';
  [[0, 2, 0.5], [1, 8, 0.2]].forEach(function (s) {
    for (var i = 0; i < s[1]; i++) {
      var an = s[2] + i * 2 * Math.PI / s[1];
      elec += circ(C[0] + R[s[0]] * Math.cos(an), C[1] + R[s[0]] * Math.sin(an), 6.5, 'url(#atm-e)', ball);
    }
  });
  for (var v = 0; v < 4; v++) {
    var av = Math.PI / 4 + v * Math.PI / 2 + 0.25;
    val += circ(C[0] + R[2] * Math.cos(av), C[1] + R[2] * Math.sin(av), 7.5, 'url(#atm-v)', ball);
  }
  /* 5. Atommag, 6. protonok, 7. neutronok – napraforgó-elrendezés */
  var core = circ(C[0], C[1], 46, 'url(#atm-core)') +
    circ(C[0], C[1], 34, 'none', ' stroke="#e39a3c" stroke-width="1.4" stroke-dasharray="3 3"');
  var prot = '', neut = '';
  var nuc = [];
  for (var n = 27; n >= 0; n--) {
    var r0 = 5.6 * Math.sqrt(n + 0.5), t0 = n * 2.39996;
    nuc.push([C[0] + r0 * Math.cos(t0), C[1] + r0 * Math.sin(t0), n % 2]);
  }
  nuc.forEach(function (q) {
    if (q[2]) neut += circ(q[0], q[1], 6.6, 'url(#atm-n)', ball);
    else prot += circ(q[0], q[1], 6.6, 'url(#atm-p)', ball);
  });
  /* 8. Kvarkok és 9. gluonok a nagyításokban */
  function wave(x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), nx = -dy / L, ny = dx / L, d = 'M' + x1.toFixed(1) + ' ' + y1.toFixed(1);
    for (var s = 1; s <= 40; s++) {
      var f = s / 40, w = Math.sin(f * Math.PI * 12) * 4.5 * Math.sin(f * Math.PI);
      d += ' L' + (x1 + dx * f + nx * w).toFixed(1) + ' ' + (y1 + dy * f + ny * w).toFixed(1);
    }
    return '<path d="' + d + '" fill="none" stroke="#d9a520" stroke-width="2.4" stroke-linecap="round"/>';
  }
  var quarks = '', gluons = '';
  [[[505, 88, 'u'], [480, 130, 'u'], [530, 130, 'd']], [[505, 263, 'u'], [480, 305, 'd'], [530, 305, 'd']]].forEach(function (tri) {
    for (var i = 0; i < 3; i++) {
      var A = tri[i], Bq = tri[(i + 1) % 3];
      gluons += '<path d="M' + A[0] + ' ' + A[1] + ' L' + Bq[0] + ' ' + Bq[1] + '" stroke="transparent" stroke-width="12"/>' + wave(A[0], A[1], Bq[0], Bq[1]);
    }
    tri.forEach(function (q) {
      quarks += circ(q[0], q[1], 14, q[2] === 'u' ? '#f08c3a' : '#2fa39a', ' stroke="rgba(0,0,0,.35)" stroke-width="1"') +
        '<text x="' + q[0] + '" y="' + (q[1] + 5) + '" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#fff">' + q[2] + '</text>';
    });
  });
  quarks += txt(505, 196, 'u u d → +2/3 +2/3 −1/3 = +1', 'lbl-muted', ' font-size="11"') +
    txt(505, 371, 'u d d → +2/3 −1/3 −1/3 = 0', 'lbl-muted', ' font-size="11"');
  /* 10. Üres tér – méretarányok */
  var empty = '<rect x="418" y="386" width="176" height="86" rx="12" fill="rgba(127,141,176,.12)" stroke="#7f8db0" stroke-width="1"/>' +
    '<ellipse cx="506" cy="428" rx="62" ry="20" fill="#4f9a5f" stroke="#2f6b3c" stroke-width="1.2"/>' +
    '<ellipse cx="506" cy="428" rx="50" ry="13" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1"/>' +
    circ(506, 428, 2.2, '#e0574f') +
    txt(506, 402, 'ha a mag egy borsó (•)…', 'lbl-muted', ' font-size="11"') +
    txt(506, 464, '…az atom egy stadion', 'lbl-muted', ' font-size="11"');

  STUDIE.addModel({
    id: 'atom',
    title: 'Az atom',
    icon: '⚛️',
    color: '#e0574f',
    category: 'Természettudomány',
    keywords: 'atom atommag proton neutron elektron elektronhéj elektronfelhő kvark gluon szilícium Rutherford Bohr Dalton Thomson Chadwick ősrobbanás nukleoszintézis szupernóva',
    summary: 'Minden anyag építőköve: egy apró, nehéz mag és körülötte egy hatalmas, szinte üres elektronfelhő.',
    scale: 'kb. 0,2 nm átmérő, a mag több tízezerszer kisebb',
    viewBox: '0 0 600 480',
    backdrop: backdrop,
    intro: 'Az atomok olyan kicsik, hogy egy homokszemben több tíz trillió (10¹⁹ nagyságrendű) van belőlük. A rajzon egy **szilíciumatom** látható, a homok, a kőzetek és a számítógépchipek fő eleme. Középen a **mag** protonokkal és neutronokkal, körülötte héjakba rendeződve az **elektronok**. Jobb oldalt pedig belenézhetsz egy protonba és egy neutronba is: ezek **kvarkokból** állnak.\n\nA **Szétszedés** gombbal kiveheted a magot az atomból, és szétválogathatod a protonokat és a neutronokat.',
    parts: [
      {
        id: 'nucleus', z: 3, name: 'Atommag', svg: core, explode: [0, 215], badge: [C[0] + 4, C[1] - 44],
        what: 'Az atom közepén lévő apró, rendkívül sűrű golyó. Itt van az atom tömegének **99,9%-a**, pedig az átmérője csak tízezred–százezred része az atoménak. A szilícium magjában **14 proton** és (a leggyakoribb változatban) **14 neutron** van. A protonok száma határozza meg, melyik elemről van szó: 14 proton = szilícium, 6 = szén, 8 = oxigén.',
        madeOf: 'Protonokból és neutronokból (közös nevükön **nukleonok**). Ezeket az **erős kölcsönhatás** tartja össze, amely sokkal erősebb, mint a protonok közti elektromos taszítás, de csak nagyon kis (kb. 10⁻¹⁵ m-es) távolságon hat.',
        how: 'A szilícium magja nem a Földön készült: **csillagok belsejében** jött létre, ahol több milliárd fokon könnyebb atommagok olvadtak össze (magfúzió), majd egy **szupernóva-robbanás** szórta szét. A lépéseket lent követheted.',
        fact: 'Ha egy teáskanálnyi anyagot csak atommagokból (üres tér nélkül) raknánk össze, az több száz millió tonnát nyomna. A neutroncsillagok nagyjából ilyen sűrűek.'
      },
      {
        id: 'proton', z: 5, name: 'Proton', svg: prot, explode: [-100, 215], badge: [C[0] - 36, C[1] + 20],
        what: 'A mag **pozitív töltésű** részecskéje (+1 elemi töltés). A számuk, a **rendszám**, adja meg, melyik elemről van szó. A periódusos rendszer is e szerint van sorba rendezve: a szilícium a 14. elem.',
        madeOf: 'Három **kvarkból**: két **u** (fel) és egy **d** (le) kvarkból. A töltéseik összege: +2/3 +2/3 −1/3 = **+1**. A kvarkokat **gluonok** tartják össze.',
        how: 'Az univerzum protonjainak túlnyomó része az **ősrobbanás** utáni első másodperc töredékében keletkezett, amikor a forró kvark–gluon „leves” annyira lehűlt, hogy a kvarkok hármasával összeálltak. Egy proton nagyon stabil: élettartama legalább 10³⁴ év, vagyis gyakorlatilag örök.',
        fact: 'Egy proton kb. **1836-szor nehezebb** egy elektronnál. A hidrogénatom magja egyetlen proton.'
      },
      {
        id: 'neutron', z: 4, name: 'Neutron', svg: neut, explode: [100, 215], badge: [C[0] + 36, C[1] + 22],
        what: 'A mag **semleges** (töltés nélküli) részecskéje, tömege majdnem ugyanannyi, mint a protoné. A neutronok „ragasztóként” is működnek: az erős kölcsönhatásukkal segítenek összetartani a magot, de nem taszítják a protonokat. Ugyanannak az elemnek lehet különböző neutronszámú változata, ezek az **izotópok** (pl. szilícium-28, -29, -30).',
        madeOf: 'Három kvarkból: egy **u** és két **d** kvarkból: +2/3 −1/3 −1/3 = **0** töltés.',
        how: 'Az ősrobbanás után a protonokkal együtt keletkeztek. Egyedül, a magon kívül egy neutron nem stabil: kb. **10 perc** felezési idővel protonra, elektronra és antineutrínóra bomlik. Ezért csak azok maradtak meg, amelyek az első percekben magokba épültek.',
        fact: 'A neutront **James Chadwick** fedezte fel 1932-ben. Mivel nincs töltése, sokáig rejtve maradt: nem térítik el sem elektromos, sem mágneses terek.'
      },
      {
        id: 'electrons', z: 6, name: 'Elektronok (belső héjak)', svg: elec, explode: [0, 0], badge: [C[0] + R[1] * Math.cos(1.77) + 20, C[1] + R[1] * Math.sin(1.77) - 6],
        what: 'Kicsi, **negatív töltésű** részecskék (−1 elemi töltés) a mag körül. Egy semleges atomban annyi elektron van, ahány proton: a szilíciumban 14. A belső héjakon lévő 10 elektron szorosan kötődik a maghoz, a kémiai reakciókban nem vesz részt.',
        madeOf: 'Az elektron (a mai tudásunk szerint) **elemi részecske**: nem áll kisebb részekből. Tömege kb. 9,1 · 10⁻³¹ kg.',
        how: 'Az elektronok is az ősrobbanás első pillanataiban keletkeztek. Kb. **380 000 évig** azonban túl forró volt minden ahhoz, hogy a magok befogják őket. Amikor az univerzum kb. 3000 fokra hűlt, az elektronok a magokhoz kötődtek: ekkor jöttek létre az első semleges atomok.',
        fact: 'Az elektromos áram a fémekben a szabadon mozgó elektronok vándorlása. Egy tranzisztor csatornájában is elektronok áramlanak.'
      },
      {
        id: 'valence', z: 7, name: 'Vegyértékelektronok', svg: val, explode: [0, 0], badge: [C[0] + R[2] * Math.cos(1.035) + 21, C[1] + R[2] * Math.sin(1.035) - 4],
        what: 'A **legkülső héj** elektronjai, a szilíciumnál 4 darab (a rajzon sárgák). Ezek határozzák meg, hogyan kapcsolódik az atom más atomokhoz. A szilíciumkristályban minden atom a 4 vegyértékelektronjával 4 szomszédjához köt: mindegyikkel egy **közös elektronpárt** alkot (kovalens kötés).',
        madeOf: 'Ugyanolyan elektronok, mint a belsők, csak távolabb vannak a magtól, ezért lazábban kötődnek.',
        how: 'A héjak a mag körül a kvantummechanika szabályai szerint töltődnek fel: az első héjra legfeljebb 2, a másodikra 8 elektron fér. A szilícium 14 elektronjából így 2 + 8 után **4 marad** a külső héjra.',
        fact: 'Ezért lesz a szilíciumból **félvezető**. Ha egy 5 vegyértékelektronos foszforatomot teszünk a kristályba, egy elektron „feleslegben” marad (n-típus). Ha 3 elektronos bórt, egy elektron hiányzik: „lyuk” keletkezik (p-típus). Erre épül minden tranzisztor.'
      },
      {
        id: 'shells', z: 2, name: 'Elektronhéjak', svg: shells, explode: [0, 0], badge: [C[0] - R[2] * 0.707, C[1] + R[2] * 0.707],
        what: 'A körök az **energiaszinteket** jelölik: minél távolabb van egy héj a magtól, annál nagyobb az elektron energiája rajta. A héjakat belülről kifelé K, L, M betűkkel (vagy 1, 2, 3 számmal) jelölik. Ez a **Bohr-féle atommodell**, amely jól szemlélteti a héjakat, de egyszerűsítés: az elektronok valójában nem keringenek körpályán, mint a bolygók.',
        madeOf: 'A héj nem tárgy, hanem egy **megengedett energiaállapot**. Az elektron csak meghatározott energiájú állapotokban lehet. Ha egy alacsonyabbra „ugrik”, a különbséget fényként (fotonként) bocsátja ki.',
        how: 'A héjak szerkezetét a kvantummechanika írja le. Az, hogy egy héjra hány elektron fér (2, 8, 18…), a **Pauli-elvből** következik: két elektron nem lehet pontosan ugyanabban az állapotban.',
        fact: 'A tűzijáték színei és a neonreklámok fénye mind elektronok héjak közti ugrásaiból származnak: minden elem a rá jellemző színekben világít.'
      },
      {
        id: 'cloud', z: 0, name: 'Elektronfelhő', svg: cloud, explode: [0, 0], badge: [C[0] + 150, C[1] + 118],
        what: 'A mai, **kvantummechanikai** kép: az elektronnak nincs pontos pályája, csak azt lehet megmondani, hol milyen **valószínűséggel** található. Ezt egy elmosódott felhővel ábrázolják: ahol sűrűbb, ott nagyobb eséllyel van az elektron. A felhő alakja (gömb, súlyzó stb.) az ún. **pályától** (orbitáltól) függ.',
        madeOf: 'Maguk az elektronok, egy különös tulajdonsággal: egyszerre viselkednek részecskeként és **hullámként**. A felhő ennek a hullámnak a „sűrűsége”.',
        how: 'Az elektron hullámtermészetét a **Schrödinger-egyenlet** írja le (1926). Ennek megoldásaiból kapják a fizikusok a felhők alakját.',
        fact: 'Az atom mérete valójában az elektronfelhő mérete. Amikor megérintesz valamit, nem az atommagok érnek össze: az elektronfelhők taszítják egymást.'
      },
      {
        id: 'quarks', z: 9, name: 'Kvarkok (u és d)', svg: quarks, explode: [0, 0], badge: [455, 70],
        what: 'A protonok és a neutronok építőkövei. A közönséges anyagban kétféle kvark van: az **u** („up”, fel) kvark töltése **+2/3**, a **d** („down”, le) kvarké **−1/3**. A proton **uud**, a neutron **udd**.',
        madeOf: 'A mai tudásunk szerint a kvarkok **elemi részecskék**, nincsenek kisebb részeik. Összesen hatféle kvark létezik (u, d, s, c, b, t), de a többi instabil, csak részecskegyorsítókban és a kozmikus sugárzásban jelenik meg.',
        how: 'Az ősrobbanás utáni első milliomod másodpercekben a kvarkok és a gluonok szabadon kavarogtak egy forró „levesben” (**kvark–gluon plazma**). Amikor ez lehűlt, a kvarkok hármasával protonokká és neutronokká álltak össze.',
        fact: 'Kvarkot még soha senki nem látott egyedül: ha megpróbálod kihúzni a protonból, a befektetett energiából új kvarkpár keletkezik. Ezért a **Szétszedés** gomb sem tudja őket szétválasztani!'
      },
      {
        id: 'gluons', z: 8, name: 'Gluonok (erős kölcsönhatás)', svg: gluons, explode: [0, 0], badge: [455, 300],
        what: 'A kvarkokat összetartó „ragasztó” részecskék (az angol glue = ragasztó szóból). Ők közvetítik az **erős kölcsönhatást**, a természet legerősebb alapvető kölcsönhatását. A rajzon rugószerű vonal jelöli őket.',
        madeOf: 'A gluon elemi részecske, nyugalmi tömege nulla, de rengeteg **energiát** hordoz.',
        how: 'A gluonok folyamatosan keletkeznek és elnyelődnek a kvarkok között. Különlegességük, hogy minél jobban távolodnak a kvarkok, annál erősebb köztük a vonzás, mint egy kifeszített gumiszalagban.',
        fact: 'A három kvark tömege a proton tömegének csak kb. **1%-a**! A maradék 99% a kvarkok mozgási és a gluonmező energiájából jön, Einstein E = mc² képlete szerint. A tested tömegének nagy része tehát valójában „befagyott” energia.'
      },
      {
        id: 'empty', z: 1, name: 'Üres tér', svg: empty, explode: [0, 0],
        what: 'Az atom szinte teljesen **üres**. Ha az atommagot egy borsószemre nagyítanánk, az elektronfelhő akkora lenne, mint egy **futballstadion**. A kettő között nincs semmi, csak az elektronok valószínűségi felhője és az elektromos tér.',
        madeOf: 'Semmiből. Pontosabban: nincs benne anyagi részecske, de áthatja a mag és az elektronok **elektromos tere**.',
        how: '1909-ben Geiger és Marsden (**Rutherford** irányításával) alfa-részecskékkel lőtt egy vékony aranyfóliát. A részecskék szinte mind akadálytalanul átmentek, és csak nagyon ritkán pattant vissza egy-egy. Ebből jött rá Rutherford, hogy az atom tömege egy apró magba sűrűsödik, a többi pedig üres.',
        fact: 'Ha az emberiség összes atomjából „kinyomnánk” az üres teret, a teljes emberiség elférne egy kockacukor méretű kockában (igaz, az kb. félmilliárd tonnát nyomna).'
      }
    ],
    steps: [
      { icon: '💥', title: 'Ősrobbanás: kvark–gluon leves', when: '0 – 10⁻⁶ s', text: 'Kb. **13,8 milliárd** éve az univerzum elképesztően forró és sűrű volt. Atomok, sőt protonok sem létezhettek: a **kvarkok** és **gluonok** szabadon kavarogtak, elektronokkal és fotonokkal együtt.', parts: ['quarks', 'gluons'] },
      { icon: '🧊', title: 'Protonok és neutronok', when: 'kb. 10⁻⁶ s – 1 s', text: 'Ahogy a világegyetem tágult és hűlt, a kvarkok hármasával összeálltak: létrejöttek a **protonok** és a **neutronok**. Kezdetben közel ugyanannyi volt belőlük, de a hűlés során a neutronok aránya csökkent.', parts: ['proton', 'neutron'] },
      { icon: '⚛️', title: 'Az első atommagok', when: '3 – 20 perc', text: 'Kb. egymilliárd fokon a protonok és neutronok már összetapadhattak: létrejött a **hélium** magja (2 p + 2 n) és egy kevés lítium. Ezt **ősi nukleoszintézisnek** hívják. Az eredmény (tömeg szerint): kb. 75% hidrogén, 25% hélium. Nehezebb elemek, így a szilícium, még nem voltak.', parts: ['nucleus', 'proton', 'neutron'] },
      { icon: '🌌', title: 'Az első semleges atomok', when: 'kb. 380 000 év', text: 'Az univerzum kb. 3000 fokra hűlt: az **elektronok** végre a magokhoz kötődtek, megszülettek az első semleges hidrogén- és héliumatomok. A fény ettől kezdve szabadon haladhatott: ennek a fénynek a maradványát ma is észleljük **kozmikus mikrohullámú háttérsugárzásként**.', parts: ['electrons', 'shells', 'cloud'] },
      { icon: '⭐', title: 'Csillagok: fúziós kohók', when: 'kb. 100–200 millió évtől', text: 'A gáz gravitáció hatására csomókba húzódott össze, és meggyulladtak az első **csillagok**. A belsejükben a hidrogén héliummá **olvad össze** (magfúzió), ez adja a fényüket. Később a hélium szénné és oxigénné alakul.', parts: ['nucleus'] },
      { icon: '🔥', title: 'A szilícium születése', when: 'nagy tömegű csillagok vége', text: 'A Napnál legalább nyolcszor nagyobb tömegű csillagok magjában a hőmérséklet **milliárd fok** fölé emelkedik. Ekkor oxigénmagok olvadnak össze, és ebből keletkezik a **szilícium** (14 proton). Utána a szilícium is tovább ég, egészen a vasig: a csillag belseje hagymaszerű héjakból áll.', parts: ['nucleus', 'proton', 'neutron'] },
      { icon: '💫', title: 'Szupernóva-robbanás', when: 'másodpercek alatt', text: 'Amikor a csillag magja vassá alakult, nincs több energia, amit fúzióval nyerhetne: a mag összeomlik, a csillag pedig **szupernóvaként** felrobban. A robbanás szétszórja a csillagban keletkezett elemeket (szén, oxigén, szilícium, vas) az űrbe, és közben nehezebb elemek is keletkeznek.' },
      { icon: '🪙', title: 'A legnehezebb elemek', when: 'neutroncsillagok ütközése', text: 'Az arany, a platina és sok más nehéz elem nagy része **neutroncsillagok összeolvadásakor** jön létre, amikor a neutronok záporában a magok gyorsan „meghíznak”, majd béta-bomlással stabil elemekké alakulnak.' },
      { icon: '🌍', title: 'Csillagporból Föld', when: '4,6 milliárd éve', text: 'A korábbi csillagok porából és gázából kialakult a **Naprendszer**. A földkéreg tömegének kb. **28%-a szilícium** (az oxigén után a második leggyakoribb elem), főleg kvarc és más szilikát kőzetek formájában. A homokból kinyert szilíciumból készülnek a chipek: a processzorod atomjai tehát egykor egy csillag belsejében születtek.', parts: ['valence'] }
    ],
    history: [
      { year: 'Kr. e. 5–4. sz.', text: 'Leukipposz és **Démokritosz** görög filozófusok szerint az anyag apró, tovább már nem osztható részecskékből áll. Az „atomosz” szó jelentése: oszthatatlan.' },
      { year: '1803–1808', text: 'John **Dalton** kísérletekre alapozott atomelmélete: minden elem egyforma atomokból áll, és a vegyületekben az atomok meghatározott arányban kapcsolódnak.' },
      { year: '1897', text: 'J. J. **Thomson** felfedezi az **elektront**. A modellje szerint az atom pozitív „tészta”, amelybe elektronok vannak szórva (**mazsolás puding modell**).' },
      { year: '1911', text: 'Ernest **Rutherford** az aranyfóliás kísérlet alapján megállapítja: az atom közepén apró, pozitív, nehéz **mag** van, a többi szinte üres tér.' },
      { year: '1913', text: 'Niels **Bohr** atommodellje: az elektronok csak meghatározott energiájú **héjakon** lehetnek, és a héjak közti ugráskor fényt nyelnek el vagy bocsátanak ki.' },
      { year: '1926', text: 'Erwin **Schrödinger** hullámegyenlete: az elektronnak nincs pontos pályája, csak **valószínűségi felhője**. Ez a mai kvantummechanikai atommodell alapja.' },
      { year: '1932', text: 'James **Chadwick** felfedezi a **neutront**, így teljes lesz a kép a mag felépítéséről.' },
      { year: '1964–1968', text: 'Murray Gell-Mann és George Zweig megalkotja a **kvarkmodellt**. 1968-ban a stanfordi SLAC gyorsítóban kísérletileg is kimutatják, hogy a protonnak belső szerkezete van.' }
    ],
    quiz: [
      { q: 'Mi határozza meg, hogy egy atom melyik elemhez tartozik?', options: ['A protonok száma a magban', 'A neutronok száma', 'Az atom mérete', 'Az elektronhéjak színe'], answer: 0, explain: 'Ez a rendszám: 14 proton mindig szilíciumot jelent, akárhány neutron van mellette.' },
      { q: 'Hol van az atom tömegének szinte teljes része?', options: ['Az atommagban', 'Az elektronfelhőben', 'Egyenletesen eloszlik', 'Az üres térben'], answer: 0, explain: 'A protonok és neutronok kb. 1836-szor nehezebbek az elektronoknál, és mind a magban vannak.' },
      { q: 'Milyen kvarkokból áll a proton?', options: ['Két u és egy d kvarkból', 'Egy u és két d kvarkból', 'Három elektronból', 'Nem áll semmiből'], answer: 0, explain: '+2/3 +2/3 −1/3 = +1, ez a proton töltése. A neutron udd: 0 töltés.' },
      { q: 'Hány vegyértékelektronja van a szilíciumnak?', options: ['4', '2', '8', '14'], answer: 0, explain: '14 = 2 + 8 + 4. A külső 4 elektronnal köt a kristályban a 4 szomszédjához.' },
      { q: 'Hol keletkezett a szilícium, amiből a processzorod készült?', options: ['Egy nagy tömegű csillag belsejében', 'Az ősrobbanás első perceiben', 'A Föld magjában', 'Egy gyárban'], answer: 0, explain: 'Az ősrobbanás csak hidrogént, héliumot és kevés lítiumot adott; a szilícium csillagokban jött létre, és szupernóva szórta szét.' }
    ]
  });
})();
