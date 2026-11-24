/* Modell: négyhengeres benzinmotor – izometrikus, „átlátszó” öntvényekkel, függőlegesen szétszedhető. */
(function () {
  var K = 0.72, I = STUDIE.draw.iso(296, 386, K);
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  var CYL = [-96, -32, 32, 96];         // a hengerek középvonala (x)
  var PIN = [22, -22, -22, 22];         // forgattyúcsap magassága: 1. és 4. henger felső holtponton
  var ROD = 90, BORE = 25, DECK = 150;

  function P(p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }
  /* Fekvő henger (x vagy y irányú tengellyel): a látható palástcsíkok és a közeli véglap. */
  function cylH(axis, cx, cy, cz, r, len, color) {
    var n = 28, s = '', i, a0, a1, m, f;
    function q(a, t) {
      return axis === 'x' ? I.pt(cx + t, cy + r * Math.cos(a), cz + r * Math.sin(a))
        : I.pt(cx + r * Math.cos(a), cy + t, cz + r * Math.sin(a));
    }
    for (i = 0; i < n; i++) {
      a0 = i / n * 2 * Math.PI; a1 = (i + 1) / n * 2 * Math.PI; m = (a0 + a1) / 2;
      f = Math.cos(m) + Math.sin(m);
      if (f <= 0) continue;
      var c = shade(color, 0.62 + 0.3 * f / 1.4142);
      s += '<polygon points="' + [q(a0, 0), q(a1, 0), q(a1, len), q(a0, len)].map(P).join(' ') + '" fill="' + c + '" stroke="' + c + '" stroke-width="0.6"/>';
    }
    var cap = [];
    for (i = 0; i < n; i++) cap.push(q(i / n * 2 * Math.PI, len));
    return s + '<polygon points="' + cap.map(P).join(' ') + '" fill="' + color + '" stroke="rgba(0,0,0,.3)" stroke-width="0.8"/>';
  }
  /* Kör egy függőleges síkban (x = állandó vagy y = állandó). */
  function disc(axis, cx, cy, cz, r, fill, extra) {
    var pts = [];
    for (var i = 0; i < 32; i++) {
      var a = i / 32 * 2 * Math.PI;
      pts.push(axis === 'x' ? I.pt(cx, cy + r * Math.cos(a), cz + r * Math.sin(a)) : I.pt(cx + r * Math.cos(a), cy, cz + r * Math.sin(a)));
    }
    return I.poly(pts, fill, extra);
  }
  function ring(x, y, z, r, stroke, w, half) {
    var c = I.pt(x, y, z), rx = r * 1.2247 * K, ry = r * 0.7071 * K;
    if (half) return '<path d="M' + (c[0] - rx).toFixed(1) + ' ' + c[1].toFixed(1) + ' A' + rx + ' ' + ry + ' 0 0 0 ' + (c[0] + rx).toFixed(1) + ' ' + c[1].toFixed(1) + '" fill="none" stroke="' + stroke + '" stroke-width="' + w + '"' + NS + '/>';
    return '<ellipse cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="' + stroke + '" stroke-width="' + w + '"' + NS + '/>';
  }
  /* „Üveg” doboz: átlátszó oldalak, tömör homlokfal (x+w oldal). Az átlátszó lapok nem fogják el a kattintást. */
  function glassBox(x, y, z, w, d, h, color, alpha) {
    var g = ' stroke="' + shade(color, 0.6) + '" stroke-width="1.2" stroke-linejoin="round"';
    return I.poly([I.pt(x, y + d, z), I.pt(x + w, y + d, z), I.pt(x + w, y + d, z + h), I.pt(x, y + d, z + h)], 'rgba(' + rgb(color) + ',' + alpha + ')', g + NS) +
      I.poly([I.pt(x + w, y, z), I.pt(x + w, y + d, z), I.pt(x + w, y + d, z + h), I.pt(x + w, y, z + h)], shade(color, 0.86), g) +
      I.poly([I.pt(x, y, z + h), I.pt(x + w, y, z + h), I.pt(x + w, y + d, z + h), I.pt(x, y + d, z + h)], 'rgba(' + rgb(color) + ',' + (alpha * 0.8).toFixed(2) + ')', g + NS) +
      I.poly([I.pt(x, y, z + h), I.pt(x + w, y, z + h), I.pt(x + w, y, z + h - 6), I.pt(x, y, z + h - 6)], 'rgba(' + rgb(color) + ',.9)', g);
  }
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255); }

  // ---------- Olajteknő ----------
  var pan = I.box(-134, -46, -44, 268, 92, 4, '#7a8597') + I.box(-126, -40, -92, 252, 80, 48, '#7b879b');
  pan += disc('x', 126.2, 0, -80, 5, '#c0c6cf');

  // ---------- Főtengely lendkerékkel ----------
  var crank = disc('x', -160, 0, 0, 58, '#7e8796') + cylH('x', -160, 0, 0, 58, 7, '#8d96a5');
  var segs = [-150];
  CYL.forEach(function (c) { segs.push(c - 14, c + 14); });
  segs.push(150);
  for (var si = 0; si < segs.length; si += 2) {
    crank += cylH('x', segs[si], 0, 0, 9, segs[si + 1] - segs[si], '#9aa3b2');
    var c = CYL[si / 2];
    if (c === undefined) continue;
    var pz = PIN[si / 2], lo = Math.min(0, pz) - 12, hi = Math.max(0, pz) + 12;
    crank += I.box(c - 14, -13, lo, 6, 26, hi - lo, '#8a93a3') + cylH('x', c - 8, 0, pz, 8, 16, '#b3bbc7') + I.box(c + 8, -13, lo, 6, 26, hi - lo, '#8a93a3');
  }

  // ---------- Hajtókarok ----------
  var rods = '';
  CYL.forEach(function (c, i) {
    var pz = PIN[i], tz = pz + ROD;
    rods += disc('y', c, 0, pz, 14, '#a4adba') +
      I.poly([I.pt(c - 8, 0, pz + 6), I.pt(c + 8, 0, pz + 6), I.pt(c + 5, 0, tz), I.pt(c - 5, 0, tz)], '#a4adba') +
      disc('y', c, 0, tz, 8, '#a4adba') + disc('y', c, 0, tz, 3.5, '#5d6573') + disc('y', c, 0, pz, 7, '#6b7482');
  });

  // ---------- Dugattyúk ----------
  var pistons = '';
  CYL.forEach(function (c, i) {
    var bz = PIN[i] + ROD - 14;
    pistons += I.cyl(c, 0, bz, BORE - 1, 40, '#cdd3dc').replace(/rgba\(0,0,0,.25\)/g, 'rgba(0,0,0,.4)') +
      ring(c, 0, bz + 34, BORE - 1, '#7d8592', 1.4, true) + ring(c, 0, bz + 30, BORE - 1, '#7d8592', 1.4, true) + ring(c, 0, bz + 25, BORE - 1, '#7d8592', 1.4, true);
  });

  // ---------- Hengerblokk (átlátszónak rajzolva) ----------
  var block = glassBox(-132, -42, -40, 264, 84, DECK + 40, '#7f8ea6', 0.34);
  CYL.forEach(function (c) { block += ring(c, 0, DECK, BORE + 1, '#55627a', 1.6); });
  // hűtővízjárat és bordák a homlokfalon
  [20, 60, 100].forEach(function (z) {
    block += I.poly([I.pt(132.3, -36, z), I.pt(132.3, 36, z), I.pt(132.3, 36, z + 4), I.pt(132.3, -36, z + 4)], 'rgba(0,0,0,.12)', ' stroke="none"');
  });

  // ---------- Szelepek ----------
  var valves = '', vlist = [];
  CYL.forEach(function (c) { [-11, 11].forEach(function (dx) { vlist.push([c + dx, -14, '#b9c2cf'], [c + dx, 14, '#d0905e']); }); });
  vlist.sort(function (a, b) { return (a[0] + a[1]) - (b[0] + b[1]); }).forEach(function (v) {
    var b = I.pt(v[0], v[1], DECK + 3), t = I.pt(v[0], v[1], DECK + 50);
    valves += I.cyl(v[0], v[1], DECK + 2, 9, 2, v[2]) +
      '<line x1="' + b[0].toFixed(1) + '" y1="' + b[1].toFixed(1) + '" x2="' + t[0].toFixed(1) + '" y2="' + t[1].toFixed(1) + '" stroke="' + shade(v[2], 0.7) + '" stroke-width="3"/>' +
      I.cyl(v[0], v[1], DECK + 30, 5, 14, '#8fa0b5') + I.cyl(v[0], v[1], DECK + 50, 7, 7, '#aab2bf');
  });

  // ---------- Hengerfej ----------
  var head = glassBox(-132, -42, DECK, 264, 84, 52, '#9aa8bd', 0.4);

  // ---------- Vezérműtengelyek ----------
  var cams = '';
  [-14, 14].forEach(function (y) {
    cams += cylH('x', -140, y, DECK + 66, 5, 280, '#7b8798');
    CYL.forEach(function (c) { [-11, 11].forEach(function (dx) { cams += cylH('x', c + dx - 5, y, DECK + 68, 9, 10, '#8c98aa'); }); });
  });

  // ---------- Gyújtógyertyák ----------
  var plugs = '';
  CYL.forEach(function (c) {
    plugs += I.cyl(c, 0, DECK + 28, 4, 24, '#9aa1ab') + I.cyl(c, 0, DECK + 52, 7.5, 8, '#b4bbc5') +
      I.cyl(c, 0, DECK + 60, 4.6, 26, '#f3f1ea') + I.cyl(c, 0, DECK + 86, 2.6, 8, '#8f969f');
  });

  // ---------- Szívócső, befecskendezők, üzemanyag-elosztó cső ----------
  var intake = I.box(-128, -124, DECK + 6, 256, 24, 64, '#71809a');
  CYL.forEach(function (c) { intake += I.box(c - 12, -100, DECK + 22, 24, 58, 22, '#7b8aa3'); });
  intake += I.box(-116, -64, DECK + 66, 232, 9, 9, '#c0c7d1');
  CYL.forEach(function (c) { intake += I.cyl(c, -60, DECK + 44, 3.6, 22, '#3f86d8'); });
  

  // ---------- Vezérműszíj és szíjtárcsák (a motor elején) ----------
  var BX = 140, pul = [[0, 0, 22], [-24, DECK + 66, 20], [24, DECK + 66, 20], [30, 100, 9]];
  var hull = [];
  pul.forEach(function (p) { for (var a = 0; a < 48; a++) hull.push([p[0] + (p[2] + 3) * Math.cos(a / 48 * 6.2832), p[1] + (p[2] + 3) * Math.sin(a / 48 * 6.2832)]); });
  hull.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
  function cross(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
  var lower = [], upper = [];
  hull.forEach(function (p) { while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); });
  hull.slice().reverse().forEach(function (p) { while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); });
  var loop = lower.slice(0, -1).concat(upper.slice(0, -1)).map(function (p) { return I.pt(BX, p[0], p[1]); });
  var belt = '<polygon points="' + loop.map(P).join(' ') + '" fill="none" stroke="#2a2e35" stroke-width="7" stroke-linejoin="round"/>' +
    '<polygon points="' + loop.map(P).join(' ') + '" fill="none" stroke="#4a515c" stroke-width="2" stroke-dasharray="2 3" stroke-linejoin="round"' + NS + '/>';
  pul.forEach(function (p) {
    belt += disc('x', BX, p[0], p[1], p[2], '#b9c0ca', ' stroke="#6b7482" stroke-width="1"') + disc('x', BX + 0.5, p[0], p[1], p[2] * 0.35, '#7d8696', ' stroke="none"');
  });

  STUDIE.addModel({
    id: 'benzinmotor',
    title: 'Benzinmotor',
    icon: '⚙️',
    color: '#d0702e',
    category: 'Járművek',
    keywords: 'motor belső égésű Otto-motor négyütemű négyhengeres soros henger dugattyú hajtókar főtengely vezérműtengely szelep gyújtógyertya befecskendező szívócső olajteknő vezérműszíj lánc hengerfej hengerblokk autó',
    summary: 'Másodpercenként több tucat apró robbanás forgatja meg az autó kerekeit.',
    scale: 'kb. 60 × 60 × 70 cm, kb. 100–130 kg',
    viewBox: '0 0 600 660',
    intro: 'A benzinmotor **hőerőgép**: az üzemanyag elégetésével keletkező hőt alakítja mozgássá. Minden hengerben négy ütem ismétlődik:\n\n1. **Szívás**: a dugattyú lefelé megy, beszívja a levegő–benzin keveréket.\n2. **Sűrítés**: a dugattyú felfelé megy, összenyomja a keveréket.\n3. **Munkaütem**: a gyújtógyertya szikrát ad, a keverék elég, a forró gáz lenyomja a dugattyút.\n4. **Kipufogás**: a dugattyú felfelé tolja ki az égéstermékeket.\n\nA hajtókarok a dugattyúk le-fel mozgását a **főtengely** forgásává alakítják. A rajzon a hengerblokkot és a hengerfejet átlátszónak rajzoltuk, hogy belelásd.',
    parts: [
      {
        id: 'intake', z: 5, name: 'Szívócső és befecskendezők', svg: intake, explode: [130, -40], badge: B(40, -124, DECK + 70),
        en: 'intake manifold and fuel injectors',
        uni: 'A keverék összetételét a **légviszony** jellemzi: `λ = (m_levegő/m_tüzelőanyag)/14,7`, ahol 14,7 a benzin **sztöchiometrikus** levegő–tüzelőanyag tömegaránya. A háromutas katalizátor csak λ ≈ 1 körüli igen szűk ablakban alakítja át egyszerre a CO-t, a HC-t és az NOₓ-ot, ezért a motorvezérlő a **lambdaszonda** jele alapján zárt hurokban szabályozza a befecskendezett mennyiséget. A henger feltöltését a **töltési fok** (volumetrikus hatásfok) méri, szívómotornál kb. 0,8–1,0; a szívócsövek hossza a nyomáshullámok kihasználásával (rezonanciás feltöltés) adott fordulatszámon ezt növelheti. A szívócső-befecskendezés 3–5 bar, a közvetlen befecskendezés (GDI) 200–350 bar nyomással dolgozik.',
        terms: ['kemia-bsc/redoxi'],
        what: 'A szívócső vezeti a levegőt minden hengerhez. Az elején (itt nem rajzoltuk) a **fojtószelep** szabályozza, mennyi levegő menjen be: ezt nyomod a gázpedállal. A kék **befecskendezők** a motorvezérlő parancsára pontosan adagolt, porlasztott benzint fecskendeznek a levegőbe vagy közvetlenül a hengerbe.',
        madeOf: 'A szívócső ma többnyire üvegszálas **műanyag** (poliamid), régebben alumínium. A befecskendező acél test, benne elektromágneses tűszelep. Az üzemanyag-elosztó cső acél vagy alumínium.',
        how: 'A műanyag szívócsövet két félből fröccsöntik, majd összehegesztik. A befecskendezők tűit és fúvókáit mikrométeres pontossággal köszörülik, mert a rés néhány ezred milliméter.',
        fact: 'A közvetlen befecskendezésű motoroknál a benzin akár 200–350 bar nyomással érkezik, ez több mint százszorosa az autógumi nyomásának.'
      },
      {
        id: 'belt', z: 11, name: 'Vezérműszíj és szíjtárcsák', svg: belt, explode: [125, 40],
        en: 'timing belt and pulleys',
        uni: 'A vezérműhajtás áttétele pontosan **i = 2**: a négyütemű ciklus 720° főtengely-elfordulás alatt zajlik le, és ezalatt minden szelepnek egyszer kell nyitnia. A fogazott szíj alakzáró hajtás (HNBR gumi, üvegszálas vagy aramid húzószálakkal), a feszítőgörgő tartja állandó előfeszítésben. **Interferenciás motornál** a szelepek és a dugattyúk pályája átfedi egymást, ezért szíjszakadáskor összeütköznek. A korszerű motorokban **változó szelepvezérlés** (VVT) is van: hidraulikus fázistolók több tíz főtengelyfokkal elforgathatják a vezérműtengelyt a szíjtárcsához képest, így a vezérlési idők a munkapont szerint optimalizálhatók.',
        what: 'Összeköti a főtengelyt a vezérműtengelyekkel, hogy a szelepek mindig pontosan a megfelelő pillanatban nyíljanak. A főtengely **kétszer** fordul, amíg a vezérműtengely egyszer, mert egy teljes négyütemű ciklus két főtengely-fordulat. A kis görgő a **feszítő**.',
        madeOf: 'Fogazott **gumiszíj** (hidrogénezett nitrilkaucsuk), belül üvegszálas vagy aramidszálas erősítéssel. Sok motorban szíj helyett acél **vezérműlánc** van, ami olajban fut, és tovább bírja.',
        how: 'A gumit szálakkal együtt formában vulkanizálják (hővel és nyomással), majd a hosszú csőből gyűrűket vágnak. A szíjtárcsák acélból vagy szinterelt fémporból készülnek.',
        fact: 'Ha a vezérműszíj elszakad, sok motorban a dugattyúk nekiütköznek a nyitva maradt szelepeknek. Ezért kell a gyártó által előírt kilométerenként cserélni.'
      },
      {
        id: 'plugs', z: 10, name: 'Gyújtógyertyák', svg: plugs, explode: [-150, -150], badge: B(-32, 0, DECK + 96),
        en: 'spark plugs (spark ignition)',
        uni: 'Az átütési feszültséget a **Paschen-törvény** adja: a gáz nyomásának és az elektródatávolságnak a szorzatától (p·d) függ. Mivel a sűrített keverék nyomása gyújtáskor 10–20 bar, a kb. 0,7–1,1 mm-es résben 10–30 kV kell. A lángfront turbulens terjedése véges ideig tart, ezért a **gyújtási szög** a felső holtpont (FHP) előtt van (kb. 10–40° főtengelyszög, a fordulatszámtól és a terheléstől függően). Az optimum az a legkisebb előgyújtás, amely a legnagyobb nyomatékot adja (MBT); ilyenkor a nyomáscsúcs kb. 10–15°-kal FHP után alakul ki. A túl korai gyújtás **kopogáshoz** vezet: a még el nem égett véggáz öngyullad. A kopogásérzékelő jele alapján a vezérlő késlelteti a gyújtást; a kopogási hajlamot a benzin **oktánszáma** jellemzi.',
        terms: ['fizika-bsc/elektromos-terero'],
        what: 'Minden henger tetején van egy. A sűrítési ütem végén a gyújtótekercs 20–40 ezer voltos feszültséget ad rá, és a gyertya két elektródája között **szikra** ugrik át, ez gyújtja meg a keveréket.',
        madeOf: 'Fehér **alumínium-oxid kerámia** szigetelő, acél menetes test, a középelektróda csúcsa nikkelötvözet, iridium vagy platina, mert ezek bírják a szikraeróziót és a hőt.',
        how: 'A kerámiaport préselik és kiégetik, beleforrasztják a középelektródát, majd a hidegen sajtolt, menetes acéltestbe szerelik és lezárják.'
      },
      {
        id: 'cams', z: 9, name: 'Vezérműtengelyek', svg: cams, explode: [0, -150], badge: B(-124, -14, DECK + 80),
        en: 'camshafts (DOHC)',
        uni: 'A bütyökprofil határozza meg a szelep **emelési görbéjét** h(φ). A profilt úgy tervezik, hogy a gyorsulás és a rántás korlátos legyen, különben a rugó nem tudja a szelepet a bütykön tartani. A jellemző vezérlési idők: a szívószelep kb. 10–20°-kal FHP előtt nyit, és csak 40–60°-kal az alsó holtpont (AHP) után zár, így kihasználja a beáramló gáz tehetetlenségét. A kipufogás végén a két szelep egyszerre nyitva van (**szelepösszenés**), ez segíti az öblítést. A szívószelep nagyon korai vagy késői zárásával (**Atkinson–Miller-ciklus**) az effektív kompresszióviszony kisebb lesz a tágulási viszonynál, ami javítja a hatásfokot; ezt használják a hibrid autók benzinmotorjai.',
        what: 'A tengelyen lévő tojás alakú **bütykök** forgás közben lenyomják a szelepeket, majd elengedik őket. A bütykök alakja határozza meg, mikor, mennyi ideig és mennyire nyílnak a szelepek. Ennél a motornál kettő van (DOHC): egyik a szívó-, másik a kipufogószelepeket mozgatja.',
        madeOf: 'Kéregöntésű **öntöttvas** vagy kovácsolt **acél**. A bütykök felületét edzik, hogy kemények és kopásállók legyenek.',
        how: 'Öntik vagy kovácsolják, majd a bütyköket számvezérelt köszörűgéppel pontos profilra csiszolják. Újabban csőre préselt, külön gyártott bütykökből is összeállítják.'
      },
      {
        id: 'head', z: 8, name: 'Hengerfej', svg: head, explode: [0, -100], badge: B(-60, 42, DECK + 26),
        en: 'cylinder head (combustion chamber)',
        uni: 'A hengerfejben lévő égéstér térfogata (V_c) határozza meg a **kompresszióviszonyt**: `ε = (V_h + V_c)/V_c`, ahol V_h a lökettérfogat. Benzinmotoroknál ε jellemzően 10–13, közvetlen befecskendezésnél akár 14; a felső korlát a kopogás. A tetőszerű (pent-roof) égéstér és a dugattyúhoz közeli **squish-felületek** örvénylést (tumble) keltenek, ez gyorsítja a lángterjedést. A falakon át távozó hőáram csúcsértéke több MW/m², ezt a hőátadási tényező empirikus összefüggései (pl. Woschni) írják le. A fej jó hővezető Al–Si öntvény, a szelepülékek és vezetők betétjei kopásállóbb anyagból készülnek.',
        what: 'A hengerblokk tetejére csavarozott „tető”. Benne vannak az **égésterek**, a szívó- és kipufogócsatornák, a szelepek, és ebbe csavarják a gyertyákat. A blokk és a fej között a **hengerfejtömítés** zár.',
        madeOf: 'Többnyire **alumíniumötvözet**: könnyű, és jól vezeti a hőt. A szelepülékek és szelepvezetők keményebb fémből vannak, ezeket belesajtolják.',
        how: 'Homokmagokkal öntik, hogy a bonyolult belső csatornák (víz, olaj, gáz) kialakuljanak. Utána marják, fúrják, és beépítik a szelepeket.'
      },
      {
        id: 'valves', z: 7, name: 'Szelepek', svg: valves, explode: [-150, -55], badge: B(-107, 14, DECK + 42),
        en: 'intake and exhaust valves',
        uni: 'A szelep átömlési keresztmetszete kis emelésnél a palástfelület: `A = π·d·h`; a gyakorlatban a h/d ≈ 0,25–0,3 arány felett már nem nő érdemben. A **szívószelepek nagyobbak**, mert a beszíváskor kicsi a hajtó nyomáskülönbség, a kipufogáskor viszont a nagy nyomású gáz a kipufogószelep nyitásakor kritikus (hangsebességű) áramlással is gyorsan távozik. A kipufogószelep tányérja 700–800 °C-ra is felmelegedhet; nagy teljesítményű motorokban üreges, **nátriumtöltésű** szárral vezetik el a hőt. A szeleprugó erejének legnagyobb fordulatszámon is meg kell haladnia a szelep tehetetlenségi erejét (`F > m·a`), különben a szelep „lebeg” (valve float).',
        terms: ['mechanika/ero'],
        what: 'Hengerenként négy szelep: kettő a friss keveréket engedi be (**szívószelepek**, szürke), kettő a kipufogógázt engedi ki (**kipufogószelepek**, vörösesbarna). A rugók zárják őket, a bütykök nyitják. Percenként akár 3000-szer nyílnak és zárnak.',
        madeOf: 'Hőálló **acélötvözet**. A kipufogószelepek 700–800 °C-ra is felmelegednek, ezért ezek különlegesen hőálló ötvözetből (krómos-nikkeles acél) vannak, némelyik belsejében hűtő **nátriumtöltettel**.',
        how: 'Rúdból melegen sajtolják a tányért, majd a szárat és az ülékfelületet köszörülik. Végül a szelepet az ülékébe „becsiszolják”, hogy tökéletesen zárjon.'
      },
      {
        id: 'block', z: 6, name: 'Hengerblokk', svg: block, explode: [0, 0], badge: B(-60, 42, 40),
        en: 'cylinder block (crankcase)',
        uni: 'A **lökettérfogat** `V_H = z · (π/4) · D² · s`; például z = 4, D = 79 mm furat és s = 81,5 mm löket mellett V_H ≈ 1,6 dm³. A blokkot a hengerben fellépő **csúcsnyomás** (benzinmotorban kb. 60–100 bar, turbós motorban több) és a főcsapágyakat terhelő erők méretezik, emellett merevnek kell lennie, hogy a hengerek ne ovalizálódjanak. A **közepes dugattyúsebesség** `c_m = 2·s·n` személyautó-motoroknál jellemzően 20–25 m/s alatt marad. Anyaga szürkeöntvény, vagy könnyebb alumíniumöntvény öntöttvas hengerperselyekkel, illetve termikus szórással felvitt bevonatú hengerfalakkal.',
        terms: ['mechanika/feszultseg'],
        what: 'A motor „váza”. Benne vannak a **hengerek**, amelyekben a dugattyúk mozognak, az alsó részében pedig a főtengely csapágyai. Belsejében víz- és olajcsatornák futnak a hűtéshez és a kenéshez.',
        madeOf: '**Öntöttvas** (erős, olcsó) vagy könnyebb **alumíniumötvözet**. Az alumínium blokkokban a hengerfal öntöttvas betét vagy speciális bevonat, mert az alumínium magában túl puha.',
        how: 'Homokformába vagy fém kokillába öntik. Kihűlés után a hengereket kifúrják, majd **hónolják**: finom kőzettel keresztmintázatot csiszolnak a falba, ami megtartja az olajat.'
      },
      {
        id: 'pistons', terms: ['e-mobilitas/hatasfok'], z: 4, name: 'Dugattyúk', svg: pistons, explode: [0, -42],
        en: 'pistons with piston rings',
        uni: 'A dugattyúra ható gázerő `F = p · A`: 80 bar nyomás egy 79 mm-es furatú dugattyún kb. **39 kN** erőt jelent. A dugattyú gyorsulását a forgattyús hajtómű kinematikája adja: `a ≈ r·ω²·(cos φ + λ_s·cos 2φ)`, ahol λ_s = r/l a forgattyúsugár és a hajtókarhossz aránya (kb. 0,25–0,33). 6000 1/perc-nél és r ≈ 41 mm-nél ez a holtpontban kb. 20 000 m/s², vagyis kb. 2000 g. A dugattyú ezért könnyű, eutektikus vagy hipereutektikus Al–Si ötvözetből készül; a teteje 250–300 °C-ra is felmelegszik. A **gyűrűcsomag** (két kompressziós és egy olajlehúzó gyűrű) tömít; a mellettük a forgattyúházba jutó gáz neve **blow-by**.',
        what: 'A hengerben le-fel mozgó „dugók”. Az égő keverék nyomása ezeket nyomja le. A rajtuk lévő **dugattyúgyűrűk** tömítenek, hogy a gáz ne jusson le a forgattyúházba, és lekaparják az olajat a hengerfalról.',
        madeOf: '**Alumíniumötvözet** (szilíciummal), mert könnyű: percenként akár 6000-szer kell megállnia és irányt váltania. A gyűrűk acélból vagy öntöttvasból vannak.',
        how: 'Kokillába öntik vagy kovácsolják, majd esztergálják. A dugattyú kissé ovális és kúpos, mert melegen úgy tágul, hogy üzem közben pont kerek legyen.',
        fact: 'A rajzon az 1. és a 4. dugattyú fent, a 2. és a 3. lent van. Egy soros négyhengeres motorban mindig így állnak, és a gyújtási sorrend általában 1–3–4–2.'
      },
      {
        id: 'rods', z: 3, name: 'Hajtókarok', svg: rods, explode: [-155, 45], badge: B(-96, 0, 62),
        en: 'connecting rods',
        uni: 'A forgattyús hajtómű dugattyúútja: `x(φ) = r·(1 − cos φ) + l·(1 − √(1 − λ_s²·sin²φ))`. A hajtókart a **gázerő nyomja**, a tehetetlenségi erő viszont húzza: a legnagyobb húzóterhelés a kipufogási ütem végén, FHP-ben lép fel, ahol nincs ellensúlyozó gáznyomás. A méretezés ezért **kifáradásra** (váltakozó húzó–nyomó igénybevétel) és **kihajlásra** (Euler-féle stabilitásvesztés) történik; innen az I-szelvény. Anyaga kovácsolt acél vagy porkohászati acél; a nagy szem fedelét gyakran **töréssel választják le** (fracture split), így a törésfelület egyedi illeszkedése pontos összeállítást ad.',
        terms: ['mechanika/hajlitonyomatek'],
        what: 'Összekötik a dugattyút a főtengellyel. A felső vége (kis szem) a dugattyúcsapon fordul, az alsó (nagy szem) a főtengely forgattyúcsapján. Így lesz az egyenes vonalú mozgásból forgás, mint a kerékpár pedáljánál a lábad.',
        madeOf: 'Kovácsolt **acél**, sportmotorokban titán. A nagy szemben vékony csúszócsapágy-félhéjak vannak.',
        how: 'Izzó acélból kovácsolják, majd a nagy szemet kettétörik (**törve osztás**), hogy a két fél pontosan összeilleszthető legyen. Utána fúrják és köszörülik.'
      },
      {
        id: 'crank', terms: ['e-mobilitas/nyomatek'], z: 2, name: 'Főtengely és lendkerék', svg: crank, explode: [0, 86], badge: B(-148, 0, 0),
        en: 'crankshaft and flywheel',
        uni: 'A forgatónyomaték a hajtókarerő érintő irányú összetevőjéből adódik: `M(φ) = F_g · r · sin(φ + β)/cos β`, ahol β a hajtókar szöge. Ez erősen lüktető; négyhengeres motorban 180° főtengelyszögenként van egy gyújtás. A **lendkerék** a mozgási energia (`E = ½·J·ω²`) tárolásával simítja a szögsebességet: az egyenlőtlenségi fok `δ = (ω_max − ω_min)/ω_k`, és a szükséges tehetetlenségi nyomaték `J = ΔE/(ω_k² · δ)`. A soros négyhengeres motor **másodrendű szabad tömegerőit** (kétszeres fordulatszámú rezgés) kiegyensúlyozó tengelyek (Lanchester-rendszer) kompenzálhatják; a torziós rezgéseket rezgéscsillapító és **kéttömegű lendkerék** mérsékli.',
        what: 'A motor fő forgó része. A **forgattyúcsapok** a tengely vonalán kívül vannak, ezeket nyomják a hajtókarok, így forgatják a tengelyt. A végén lévő nehéz **lendkerék** egyenletesebbé teszi a forgást az égések között, és ehhez kapcsolódik a kuplung.',
        madeOf: 'Kovácsolt **acél** vagy gömbgrafitos öntöttvas. A csapágyfelületeket edzik.',
        how: 'Egy darabból kovácsolják vagy öntik, majd a csapokat nagy pontosságú köszörűgépen csiszolják. Végül **kiegyensúlyozzák**: ahol nehezebb, ott furatokkal anyagot vesznek el, hogy rezgés nélkül forogjon.'
      },
      {
        id: 'pan', z: 1, name: 'Olajteknő', svg: pan, explode: [0, 142],
        en: 'oil pan (sump) and lubrication system',
        uni: 'A főtengely- és hajtókar-csapágyak **hidrodinamikus kenéssel** működnek: a forgó csap ék alakú résbe húzza az olajat, és a kialakuló nyomás néhány mikrométeres olajfilmen „lebegteti” a tengelyt. A súrlódás a **Stribeck-görbe** szerint a sebesség és a viszkozitás függvénye: hidegindításkor és kis fordulaton vegyes kenés van, ilyenkor a legnagyobb a kopás. Az olaj viszkozitását a SAE-osztály adja meg (pl. 0W-20: alacsony hidegviszkozitás, 100 °C-on kb. 7–9 mm²/s). Az üzemi olajnyomás kb. 2–5 bar, a hőmérséklet 90–120 °C. Versenymotorokban **szárazkarteres** kenést alkalmaznak, hogy kanyarban se szívjon levegőt a szivattyú.',
        what: 'A motor alján lévő tartály, itt gyűlik össze a motorolaj. Az olajszivattyú innen szívja fel, és nyomja a csapágyakhoz, a hengerfalakra és a vezérműhöz, majd az olaj visszacsorog ide. Az alján lévő csavar a **leeresztő csavar** az olajcseréhez.',
        madeOf: 'Mélyhúzott **acéllemez** vagy öntött **alumínium**. Egy átlagos motorban 4–5 liter olaj van.',
        how: 'Acéllemezből présgéppel húzzák mélyre, vagy alumíniumból öntik. Tömítőanyaggal csavarozzák a blokk aljára.',
        fact: 'Az olaj nemcsak ken, hanem hűt és tisztít is. Ezért kell rendszeresen cserélni, a szűrővel együtt.'
      }
    ],
    uni: {
      text: 'Egyetemi szinten a benzinmotor működését az ideális **Otto-körfolyamat** közelíti: két adiabatikus (izentropikus) és két izochor állapotváltozás. Termikus hatásfoka csak a **kompresszióviszonytól** (ε) és az adiabatikus kitevőtől (κ) függ: `η = 1 − 1/ε^(κ−1)`. ε = 10 és κ = 1,4 mellett ez kb. 60%, a valós motorok effektív hatásfoka a legjobb munkapontban mégis csak kb. 35–40%: a valódi munkaközeg κ-ja kisebb, hő távozik a falakon át, és veszteséget jelent a fojtás (**töltetcsere-munka**) és a súrlódás is. A motor terhelésének összehasonlítható mérőszáma az **effektív középnyomás**: `p_me = W_e/V_H`. Ebből négyütemű motorra a teljesítmény `P = p_me · V_H · n/2`, a nyomaték `M = p_me · V_H/(4π)`. Szívómotornál p_me ≈ 10–13 bar, turbós motornál 18–25 bar. A fajlagos fogyasztás (b_e) a legjobb pontban kb. 230–250 g/kWh, ebből `η_e = 3600/(b_e · H_a)`, ahol H_a ≈ 42–43 MJ/kg a benzin alsó fűtőértéke.',
      terms: ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/idealis-gaz', 'fizika-bsc/elso-fotetel', 'fizika-bsc/entropia', 'e-mobilitas/hatasfok', 'e-mobilitas/nyomatek', 'kemia-bsc/entalpia']
    },
    steps: [
      { icon: '🔥', title: 'Öntés: blokk és hengerfej', text: 'Homokból formát és belső magokat készítenek, amelyek a víz- és olajcsatornák helyét adják. Ebbe öntik az olvadt **öntöttvasat** (kb. 1400 °C) vagy **alumíniumot** (kb. 700 °C). Kihűlés után kirázzák a homokot.', parts: ['block', 'head'] },
      { icon: '🛠️', title: 'Megmunkálás', text: 'Számvezérelt (CNC) gépsorokon marják a síkfelületeket, kifúrják és **hónolják** a hengereket, menetet vágnak a csavarfuratokba. A hengerek tűrése néhány ezred milliméter.', parts: ['block'] },
      { icon: '⚒️', title: 'Kovácsolás és köszörülés', text: 'A **főtengelyt** és a **hajtókarokat** izzó acélból kovácsolják, majd edzik és köszörülik. A főtengelyt kiegyensúlyozzák.', parts: ['crank', 'rods'] },
      { icon: '🔩', title: 'Alsó rész összeszerelése', text: 'A blokkot fejjel lefelé fordítják, behelyezik a csapágyhéjakat és a **főtengelyt**. A **dugattyúkat** gyűrűkkel és **hajtókarral** felülről beengedik a hengerekbe, és rácsavarozzák a hajtókar-fedeleket a főtengelyre.', parts: ['crank', 'pistons', 'rods', 'block'] },
      { icon: '🧢', title: 'Hengerfej és szelepvezérlés', text: 'A hengerfejbe beépítik a **szelepeket** rugókkal, rátesznek egy új hengerfejtömítést a blokkra, és meghatározott sorrendben, nyomatékkulccsal meghúzzák a fejcsavarokat. Ezután jönnek a **vezérműtengelyek**.', parts: ['head', 'valves', 'cams'] },
      { icon: '⏱️', title: 'Vezérlés beállítása', text: 'A főtengelyt és a vezérműtengelyeket jelölések szerint pontos helyzetbe állítják, és felrakják a **vezérműszíjat** vagy láncot. Ha itt egy fogat is téved a szerelő, a motor rosszul jár, vagy tönkre is mehet.', parts: ['belt', 'crank', 'cams'] },
      { icon: '🧩', title: 'Szerelvények', text: 'Felcsavarozzák az **olajteknőt**, a **szívócsövet** a **befecskendezőkkel**, a gyújtógyertyákat és a tekercseket, a vízpumpát, a generátort és a kábelköteget.', parts: ['pan', 'intake', 'plugs'] },
      { icon: '🧪', title: 'Próbapad', text: 'Minden motort elindítanak vagy villanymotorral megforgatnak („hideg teszt”), mérik az olajnyomást, a kompressziót és a zajokat. Csak a hibátlan motor kerül be az autóba.' }
    ],
    history: [
      { year: '1860', text: 'Étienne Lenoir megépíti az első kereskedelmi forgalomba kerülő **gázmotort**, még sűrítés nélkül.' },
      { year: '1876', text: 'Nikolaus Otto megépíti az első működő **négyütemű** motort. Róla nevezik a benzinmotort **Otto-motornak**.' },
      { year: '1886', text: 'Carl Benz szabadalmaztatja benzinmotoros **autóját**, ugyanebben az évben Gottlieb Daimler is motoros kocsit épít.' },
      { year: '1893', text: '**Bánki Donát** és **Csonka János** feltalálja a **porlasztót** (karburátort), ami egyenletesen keveri a benzint a levegővel.' },
      { year: '1908', text: 'A Ford T-modell (1913-tól futószalagon gyártva) milliók számára teszi elérhetővé a benzinmotoros autót.' },
      { year: '1980-as évek', text: 'A porlasztót felváltja az elektronikus **befecskendezés**, és megjelenik a kipufogógázt tisztító **katalizátor**.' },
      { year: 'ma', text: 'A modern motorok turbófeltöltővel, közvetlen befecskendezéssel és **hibrid** rendszerekkel kevesebbet fogyasztanak. Hatásfokuk a legjobb esetben kb. 40%.' }
    ],
    quiz: [
      { q: 'Mi a négy ütem helyes sorrendje?', options: ['Szívás, sűrítés, munkaütem, kipufogás', 'Sűrítés, szívás, kipufogás, munkaütem', 'Munkaütem, szívás, sűrítés, kipufogás', 'Szívás, kipufogás, sűrítés, munkaütem'], answer: 0, explain: 'Beszívja, összenyomja, meggyújtja (munkaütem), majd kitolja a gázt.' },
      { q: 'Mi alakítja a dugattyúk le-fel mozgását forgássá?', options: ['A hajtókar és a főtengely', 'A vezérműszíj', 'A gyújtógyertya', 'Az olajteknő'], answer: 0, explain: 'A hajtókar a főtengely kiálló forgattyúcsapját nyomja, mint a lábad a pedált.' },
      { q: 'Mit csinál a vezérműtengely?', options: ['Bütykeivel nyitja a szelepeket', 'Szikrát ad', 'Olajat szivattyúz', 'Hűti a motort'], answer: 0, explain: 'A bütykök lenyomják a szelepeket, a rugók pedig visszazárják őket.' },
      { q: 'Kik találták fel a porlasztót?', options: ['Bánki Donát és Csonka János', 'Carl Benz és Gottlieb Daimler', 'Nikolaus Otto és Rudolf Diesel', 'Henry Ford és Thomas Edison'], answer: 0, explain: 'A két magyar mérnök 1893-ban szabadalmaztatta.' }
    ]
  });
})();
