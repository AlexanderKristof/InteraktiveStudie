/* Modell: Napelem panel (monokristályos, keretes modul) – rétegenként szétszedve, izometrikus nézetben. */
(function () {
  var K = 1, OX = 262, OY = 352;
  var I = STUDIE.draw.iso(OX, OY, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  function f1(n) { return (+n).toFixed(1); }
  // Helyi koordináták a panel síkjában: u = a panel rövidebb iránya, v = a hosszabb iránya, z = felfelé.
  function P(u, v, z) { return I.pt(v, -u, z); }
  function B(u, v, z) { var p = P(u, v, z); return [Math.round(p[0]), Math.round(p[1])]; }
  // Vízszintes sík (u, v) koordinátákkal: ide rajzolunk téglalapot, mintát, szöveget.
  function plane(z, inner, extra) {
    var c = (0.866 * K).toFixed(4), s = (0.5 * K).toFixed(4);
    return '<g transform="matrix(' + c + ',' + (-s) + ',' + c + ',' + s + ',' + OX + ',' + f1(OY - z * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  // Lekerekített téglalap körvonala (u, v) pontokban
  function rr(u0, v0, u1, v1, r, n) {
    n = n || 4; var pts = [];
    [[u1 - r, v0 + r, -90], [u1 - r, v1 - r, 0], [u0 + r, v1 - r, 90], [u0 + r, v0 + r, 180]].forEach(function (c) {
      for (var i = 0; i <= n; i++) { var a = (c[2] + 90 * i / n) * Math.PI / 180; pts.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); }
    });
    return pts;
  }
  function polyP(pts, z, fill, extra) { return I.poly(pts.map(function (q) { return P(q[0], q[1], z); }), fill, extra); }
  // Függőleges falak: csak a néző felé eső oldalak (inner = egy nyílás belső fala)
  function walls(pts, z, h, color, inner) {
    var cu = 0, cv = 0, s = '';
    pts.forEach(function (q) { cu += q[0] / pts.length; cv += q[1] / pts.length; });
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i + 1) % pts.length];
      var nu = b[1] - a[1], nv = -(b[0] - a[0]), L = Math.hypot(nu, nv) || 1; nu /= L; nv /= L;
      if (nu * ((a[0] + b[0]) / 2 - cu) + nv * ((a[1] + b[1]) / 2 - cv) < 0) { nu = -nu; nv = -nv; }
      if (inner) { nu = -nu; nv = -nv; }
      var nx = nv, ny = -nu;
      if (nx + ny <= 0.001) continue;
      var col = shade(color, 0.79 + 0.07 * (nx - ny) / (Math.abs(nx) + Math.abs(ny)));
      s += I.poly([P(a[0], a[1], z), P(b[0], b[1], z), P(b[0], b[1], z + h), P(a[0], a[1], z + h)], col, ' stroke="' + col + '" stroke-width="0.6" stroke-linejoin="round"');
    }
    return s;
  }
  function slab(pts, z, h, color, top, topExtra) {
    return walls(pts, z, h, color) + polyP(pts, z + h, top || color, topExtra || ' stroke="rgba(0,0,0,.35)" stroke-width="0.8" stroke-linejoin="round"');
  }
  function ring(outer, inner, z, h, color) {
    var d = function (pts) { return 'M' + pts.map(function (q) { var p = P(q[0], q[1], z + h); return f1(p[0]) + ' ' + f1(p[1]); }).join(' L') + ' Z'; };
    return walls(inner, z, h, color, true) + walls(outer, z, h, color) +
      '<path d="' + d(outer) + ' ' + d(inner) + '" fill="' + color + '" fill-rule="evenodd" stroke="rgba(0,0,0,.35)" stroke-width="0.8" stroke-linejoin="round"/>';
  }
  function text(p, str, cls, anchor, dy) {
    return '<text class="' + cls + '" x="' + f1(p[0]) + '" y="' + f1(p[1] + (dy || 0)) + '" text-anchor="' + (anchor || 'middle') + '"' + NS + '>' + str + '</text>';
  }

  /* ---------- színátmenetek, minták, háttér ---------- */
  var defs = '<defs>' +
    '<linearGradient id="np-cell" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3d63a6"/><stop offset=".55" stop-color="#25407a"/><stop offset="1" stop-color="#1a2d57"/></linearGradient>' +
    '<pattern id="np-fing" patternUnits="userSpaceOnUse" width="12" height="2.4"><line x1="0" y1="1.2" x2="12" y2="1.2" stroke="#b9c8e6" stroke-width="0.28" stroke-opacity=".75"/></pattern>' +
    '<pattern id="np-eva" patternUnits="userSpaceOnUse" width="6" height="6"><circle cx="1.5" cy="1.5" r="0.7" fill="#8796ab" fill-opacity=".45"/><circle cx="4.5" cy="4.5" r="0.7" fill="#8796ab" fill-opacity=".45"/></pattern>' +
    '<linearGradient id="np-glare" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".18" stop-color="#fff" stop-opacity=".45"/><stop offset=".26" stop-color="#fff" stop-opacity="0"/>' +
    '<stop offset=".34" stop-color="#fff" stop-opacity=".3"/><stop offset=".38" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
    '<radialGradient id="np-sun"><stop offset="0" stop-color="#ffe58a"/><stop offset=".7" stop-color="#f7b733"/><stop offset="1" stop-color="#f08c1a"/></radialGradient>' +
    '<marker id="np-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#f0a020"/></marker>' +
    '</defs>';
  var sun = '<g' + NS + '><circle cx="58" cy="58" r="24" fill="url(#np-sun)" stroke="#d9870f" stroke-width="1.2"/>';
  for (var a = 0; a < 360; a += 30) {
    var ra = a * Math.PI / 180;
    sun += '<line x1="' + f1(58 + 30 * Math.cos(ra)) + '" y1="' + f1(58 + 30 * Math.sin(ra)) + '" x2="' + f1(58 + 38 * Math.cos(ra)) + '" y2="' + f1(58 + 38 * Math.sin(ra)) + '" stroke="#f0a020" stroke-width="2.4" stroke-linecap="round"/>';
  }
  [[94, 78, 236, 300], [80, 98, 176, 330], [104, 60, 290, 268]].forEach(function (r) {
    sun += '<line x1="' + r[0] + '" y1="' + r[1] + '" x2="' + r[2] + '" y2="' + r[3] + '" stroke="#f0a020" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#np-arr)"/>';
  });
  sun += '<text class="lbl-muted" x="58" y="108" text-anchor="middle">napfény</text></g>';
  var backdrop = defs + sun;

  /* ---------- geometria ---------- */
  var OUT = rr(-75, -120, 75, 120, 2.5), IN = rr(-68, -113, 68, 113, 1);
  var SHEET = rr(-71, -116, 71, 116, 1.5);

  // 1. Alumínium keret: négy profil, sarkain összesajtolva
  var frame = ring(OUT, IN, -4, 10.5, '#a9b2bf');
  frame += polyP(rr(-74, -119, -71.5, 119, 1), 6.55, 'rgba(255,255,255,.35)', ' stroke="none"' + NS);
  [[-71.5, 60], [-71.5, -60]].forEach(function (c) { frame += polyP(rr(c[0] - 1.6, c[1] - 6, c[0] + 1.6, c[1] + 6, 1.2), 6.6, '#8b95a3', ' stroke="none"' + NS); });
  // szerelőfurat jelölése a frontoldalon
  frame += I.poly([P(-75, 70, -2), P(-75, 82, -2), P(-75, 82, 2.5), P(-75, 70, 2.5)], '#6b7482', ' stroke="none"');

  // 2. Edzett üveg: áttetsző, a tetején tükröződéssel
  var glass = '<g opacity=".26">' + slab(SHEET, 3, 2.5, '#b5dcef', '#b5dcef', ' stroke="#4f97c4" stroke-width="1.1" stroke-linejoin="round"') + '</g>' +
    plane(5.55, '<rect x="-71" y="-116" width="142" height="232" rx="1.5" fill="url(#np-glare)"/>', NS);

  // 3. és 6. EVA fólia: tejfehér, finoman mintázott (a laminálás után teljesen átlátszó lesz)
  function eva(z) {
    return '<g opacity=".6">' + walls(SHEET, z, 0.8, '#e6ebf1') + '</g>' +
      polyP(SHEET, z + 0.8, 'rgba(236,241,246,.1)', ' stroke="#8c9aae" stroke-width="0.9" stroke-dasharray="5 3"') +
      plane(z + 0.85, '<rect x="-71" y="-116" width="142" height="232" fill="url(#np-eva)"/>', NS);
  }
  var eva1 = eva(2.2), eva2 = eva(1);

  // 4. Napelemcellák: 5 × 8 monokristályos cella, levágott sarkokkal (pszeudo-négyzet)
  var CS = 26, U0 = -69.4, V0 = -112.05, PU = 28.2, PV = 28.3, CH = 4;
  var cellIn = '';
  for (var r = 0; r < 5; r++) for (var c = 0; c < 8; c++) {
    var u = U0 + r * PU, v = V0 + c * PV;
    var oct = [[u + CH, v], [u + CS - CH, v], [u + CS, v + CH], [u + CS, v + CS - CH], [u + CS - CH, v + CS], [u + CH, v + CS], [u, v + CS - CH], [u, v + CH]]
      .map(function (q) { return q[0].toFixed(2) + ',' + q[1].toFixed(2); }).join(' ');
    cellIn += '<polygon points="' + oct + '" fill="url(#np-cell)" stroke="#0f1a33" stroke-width="0.5"/>' +
      '<polygon points="' + oct + '" fill="url(#np-fing)" stroke="none"/>';
  }
  var cells = plane(1.9, cellIn);

  // 5. Cellaösszekötő szalagok (ónozott réz): soronként 3 szalag + gyűjtősínek a végeken + 4 kivezetés a dobozhoz
  var rib = '';
  for (r = 0; r < 5; r++) {
    var uc = U0 + r * PU + CS / 2;
    [-7.5, 0, 7.5].forEach(function (o) {
      rib += '<rect x="' + (uc + o - 0.9).toFixed(2) + '" y="-114" width="1.8" height="228" fill="#dfe3e9" stroke="#6f7887" stroke-width="0.45"/>';
    });
  }
  rib += '<rect x="-66" y="-117.2" width="132" height="3" fill="#dfe3e9" stroke="#6f7887" stroke-width="0.5"/>';
  [[-66, -24], [-10, 10], [24, 66]].forEach(function (s) {
    rib += '<rect x="' + s[0] + '" y="114.2" width="' + (s[1] - s[0]) + '" height="3" fill="#dfe3e9" stroke="#6f7887" stroke-width="0.5"/>';
  });
  [-12, -4, 4, 12].forEach(function (uu, i) {
    var from = [-24, -10, 10, 24][i];
    rib += '<path d="M' + from + ' 115.7 L' + uu + ' 108 L' + uu + ' 96" fill="none" stroke="#6f7887" stroke-width="2.8" stroke-linejoin="round"/>' +
      '<path d="M' + from + ' 115.7 L' + uu + ' 108 L' + uu + ' 96" fill="none" stroke="#e8ebef" stroke-width="1.7" stroke-linejoin="round"/>';
  });
  var ribbons = plane(2.05, rib);

  // 7. Hátlap: fehér, többrétegű műanyag fólia, résszel a kivezetéseknek
  var back = slab(SHEET, 0, 1, '#d9dee5', '#e4e8ee') +
    plane(1.05, '<rect x="-15" y="93" width="30" height="5" rx="1" fill="#59616d"/>' +
      '<rect x="-62" y="-104" width="38" height="22" rx="1.5" fill="none" stroke="#a8b1be" stroke-width="0.8" stroke-dasharray="3 2"/>', NS);

  // 8. Csatlakozódoboz: nyitott fedéllel, benne 3 bypass-dióda és 4 csatlakozókapocs
  var JB = rr(-16, 84, 16, 108, 2.5);
  var jbox = slab(JB, -6.5, 6, '#59606b', '#4a505a') +
    plane(-0.45,
      '<rect x="-14" y="86" width="28" height="20" rx="1.5" fill="#24282e"/>' +
      [-12, -4, 4, 12].map(function (uu) { return '<rect x="' + (uu - 1.5) + '" y="88" width="3" height="16" rx="0.6" fill="#c9ced6" stroke="#7b8391" stroke-width="0.4"/>'; }).join('') +
      [-8, 0, 8].map(function (uu) {
        return '<rect x="' + (uu - 2.6) + '" y="94.2" width="5.2" height="3.6" rx="1.3" fill="#0f1114" stroke="#5d646f" stroke-width="0.3"/>' +
          '<rect x="' + (uu + 1.2) + '" y="94.2" width="0.9" height="3.6" fill="#d7dce3"/>';
      }).join(''), NS);

  // 9. MC4 csatlakozók a kábelekkel
  var cable = '';
  [[-6, 14], [6, 30]].forEach(function (k) {
    var d = 'M' + k[0] + ' 104 C' + k[0] + ' 124 ' + k[1] + ' 118 ' + k[1] + ' 136';
    cable += '<path d="' + d + '" fill="none" stroke="#3c424c" stroke-width="4.6" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="#8a93a0" stroke-width="1.1" stroke-linecap="round" transform="translate(-0.9,0)"/>';
  });
  var mc4 = plane(-8, cable);
  [[14, '#3a3f47', '+'], [30, '#3a3f47', '−']].forEach(function (k) {
    var uu = k[0];
    mc4 += slab(rr(uu - 3.2, 134, uu + 3.2, 160, 2.2), -11, 6.4, k[1]) +
      slab(rr(uu - 3.9, 141, uu + 3.9, 147, 1.2), -11.6, 7.6, '#2b2f36') +
      slab(rr(uu - 2, 160, uu + 2, 164, 1), -9.8, 4, '#c9ced6');
    mc4 += text(P(uu, 174, -7), k[2], 'lbl" style="font-size:15px', 'middle', 5);
  });

  STUDIE.addModel({
    id: 'napelempanel',
    title: 'Napelem panel',
    icon: '☀️',
    color: '#f5a524',
    category: 'Energia',
    keywords: 'napelem napelemes panel modul fotovoltaikus PV szolár szilícium cella monokristályos p–n átmenet EVA laminálás edzett üveg hátlap backsheet bypass dióda csatlakozódoboz MC4 inverter PERC TOPCon wafer ingot háztartási kiserőmű',
    summary: 'Egy háztetőn álló napelem panel 40–60 vékony szilíciumszeletből és néhány gondosan összepréselt rétegből áll – és 25–30 évig termel áramot.',
    scale: 'kb. 1,1 × 1,7–2,3 m, 3–4 cm vastag, 20–28 kg; egy cella 18–21 cm széles és kb. 0,15 mm vastag',
    viewBox: '0 0 560 640',
    backdrop: backdrop,
    intro: 'A napelem panel (szakszóval **fotovoltaikus modul**) a napfényt közvetlenül elektromos árammá alakítja, mozgó alkatrész, zaj és égés nélkül. A munkát a **napelemcellák** végzik: vékony szilíciumszeletek, amelyekben egy **p–n átmenet** szétválasztja a fény által kiszabadított elektronokat és „lyukakat”.\n\nA többi réteg a cellákat védi: elöl **edzett üveg**, a cellák két oldalán **EVA** ragasztófólia, hátul műanyag **hátlap**, körben **alumínium keret**. Hátul a **csatlakozódobozból** két kábel vezet ki, **MC4** dugókkal.\n\nNyomd meg a **Szétszedés** gombot, és nézd meg a rétegeket egyenként!',
    parts: [
      {
        id: 'keret', z: 8, name: 'Alumínium keret', en: 'aluminium frame', svg: frame, explode: [104, -208], badge: B(-71.5, -95, 6.5),
        what: 'A panel „csontváza”. Merevvé teszi a vékony rétegköteget, hogy a szél és a hó súlya se hajlítsa meg, és ennél fogva rögzítik a tartószerkezethez a tetőn vagy a földön.',
        madeOf: '**Eloxált alumínium** profil. Az alumínium könnyű, nem rozsdásodik, az eloxálás (vékony, kemény oxidréteg) pedig még ellenállóbbá teszi az időjárással szemben. Az üveg és a keret közé **szilikon** tömítés kerül.',
        how: 'Felmelegített alumínium tömböt nagy erővel egy formázó szerszámon nyomnak át (**extrudálás**), mint a fogkrémet a tubusból. A hosszú profilt méretre vágják, eloxálják, majd a négy darabot sarokelemekkel összesajtolják a laminált rétegek körül.',
        uni: 'A keret a modul **mechanikai terhelhetőségét** adja: a szabvány (IEC 61215) szerint jellemzően 5400 Pa nyomó (hó) és 2400 Pa szívó (szél) terhelést kell kibírnia. A lehajlás egy kétoldalt alátámasztott lemezként becsülhető, a profil **másodrendű nyomatéka** (I) dönti el a merevséget. A keretet a villámvédelem és az érintésvédelem miatt **földelni** kell. Az utóbbi években terjednek a keret nélküli, kétüveges (glass–glass) modulok is.',
        terms: ['villamosmernoki/foldelesi-rendszerek'],
        fact: 'Egy panel ára egyre nagyobb részét adja a keret: az alumínium előállítása sok energiát igényel, ezért az újrahasznosított alumínium használata sokat javít a panel „szénlábnyomán”.'
      },
      {
        id: 'uveg', z: 7, name: 'Edzett napelemüveg', en: 'tempered low-iron solar glass', svg: glass, explode: [78, -156], badge: B(-55, -68, 5.5),
        what: 'A panel elülső „ablaka”. Átengedi a fényt a cellákhoz, közben megvédi őket a jégesőtől, a portól és a nedvességtől. Ez adja a panel súlyának nagy részét.',
        madeOf: 'Kb. 3,2 mm vastag **alacsony vastartalmú** üveg (a közönséges üveg vasszennyezése zöldes árnyalatot ad és elnyeli a fény egy részét). A felületén vékony, apró pórusú **tükröződésgátló** bevonat van, és gyakran enyhén mintázott, hogy a fény jobban bejusson.',
        how: 'Kvarchomokból, szódából és mészkőből olvasztják kb. 1500 °C-on, hengerek között lapot húznak belőle, méretre vágják, bevonják, majd **edzik**: kb. 650 °C-ra hevítik és hideg levegővel hirtelen lehűtik. Ettől a felülete feszültség alá kerül, és sokkal erősebb lesz.',
        uni: 'Merőleges beesésnél egy üveg–levegő határfelület a fény kb. **4%-át** visszaveri: `R = ((n − 1)/(n + 1))²`, n ≈ 1,5 mellett. A tükröződésgátló réteg ideálisan **negyedhullámú**: vastagsága `d = λ/(4·n_r)`, törésmutatója `n_r ≈ √n`, így a két felületről visszavert hullámok kioltják egymást. Az edzett üveg felülete kb. 90–120 MPa **nyomófeszültség** alatt áll: egy repedés csak akkor indul, ha a húzófeszültség ezt legyőzi. Az áteresztés AR-bevonattal kb. 94% → 96%.',
        terms: ['fizika-bsc/interferencia'],
        fact: 'A szabványos jégesőteszten 25 mm-es jéggolyókat lőnek a panelre kb. 83 km/h sebességgel, 11 különböző pontra – és a cellák nem sérülhetnek meg.'
      },
      {
        id: 'eva1', z: 6, name: 'EVA fólia (felső)', en: 'EVA encapsulant (front)', svg: eva1, explode: [52, -104], badge: B(-55, -40, 3),
        what: 'Ragasztó és párna egyben: a cellákat az üveghez ragasztja, és körbezárja őket, hogy ne érje őket levegő és víz. Kitölti a cellák körüli réseket, és tompítja az ütéseket.',
        madeOf: '**EVA** (etilén-vinil-acetát) műanyag fólia, kb. 0,4–0,5 mm vastag. UV-szűrő és térhálósító adalékokat tartalmaz. Újabban **POE** (poliolefin) fóliát is használnak, mert az kevésbé enged át vizet.',
        how: 'Granulátumból olvasztják meg, és lapos résen át fóliává húzzák (extrudálás). Laminálás előtt tejfehér és rugalmas; a laminálóban kb. 145–150 °C-on megolvad, **térhálósodik**, és üvegtisztává válik.',
        uni: 'A laminálás során peroxidos **térhálósítás** zajlik: a polimerláncok között kovalens kötések alakulnak ki, ezért az EVA többé nem olvad meg. A minőséget a **gélhányaddal** mérik (jellemzően > 75–80%). Az EVA hosszú távon ecetsavat szabadíthat fel, ami korrodálja a fémezést; nagy rendszerfeszültségnél ionok vándorolhatnak benne, ami **PID** (potenciál által okozott degradáció) jelenséghez vezethet. Ezért nő a POE-fóliák aránya.'
      },
      {
        id: 'cellak', z: 4, name: 'Napelemcellák (monokristályos Si)', en: 'monocrystalline silicon solar cells', svg: cells, explode: [0, 0], badge: B(-55, -14, 1.9), link: 'atom',
        terms: ['fizika-bsc/fotoeffektus'],
        what: 'Itt keletkezik az áram. Minden cella egy vékony szilíciumszelet, amelyben **p–n átmenet** van. Amikor egy foton (fényrészecske) elnyelődik a szilíciumban, kiszabadít egy elektront, és hátrahagy egy pozitív „lyukat”. Az átmenet elektromos tere szétválasztja őket: az elektronok az egyik, a lyukak a másik oldal felé sodródnak – így feszültség jön létre.\n\nEgy cella csak kb. **0,6–0,7 V**-ot ad, ezért sok cellát sorba kötnek.',
        madeOf: '**Monokristályos szilícium** szelet, kb. 0,13–0,15 mm vastag. Az alapanyag enyhén **bórral** adalékolt (p-típus), a felső vékony rétege **foszforral** (n-típus) – vagy fordítva az újabb TOPCon cellákban. A kék-fekete színt a **szilícium-nitrid** tükröződésgátló réteg adja. A felszínen vékony **ezüst** vonalak (ujjak) gyűjtik az áramot, hátul **alumínium** vagy ezüst réteg van.',
        how: 'Kvarcból tiszta poliszilíciumot, abból egykristály-hengert (ingotot) gyártanak, ezt drótfűrésszel szeletekre vágják. A szeletek felszínét lúgban mikroszkopikus **piramisokká** marják, majd foszfort diffundáltatnak beléjük (így jön létre a p–n átmenet). Végül tükröződésgátló réteg és szitanyomással felvitt fémezés kerül rájuk. A teljes folyamatot lent, a lépéseknél nézheted végig.',
        uni: 'A cella egy nagy felületű **fotodióda**. Egydiódás modellje: `I = I_L − I_0·(exp(qV/(n·k·T)) − 1) − (V + I·R_s)/R_sh`, ahol I_L a fényáram, I_0 a sötétáram. Fontos jellemzők: **üresjárási feszültség** (U_oc ≈ 0,7 V), **rövidzárási áram** (I_sc, kb. 40 mA/cm²), **kitöltési tényező** `FF = P_max/(U_oc·I_sc)` (≈ 0,8), és a hatásfok `η = P_max/(E·A)`, standard körülmények között (STC: 1000 W/m², 25 °C, AM1,5 spektrum). A szilícium tiltott sávja 1,12 eV: a kisebb energiájú fotonok elnyeletlenül áthaladnak, a nagyobbak többletenergiája hővé válik. Ezért egy szilícium cella elméleti határa kb. **29%** (Shockley–Queisser-határ a rekombinációval együtt). A teljesítmény hőmérsékleti együtthatója kb. −0,3…−0,4 %/K: nyári hőségben a panel kevesebbet termel.',
        fact: 'A legjobb laboratóriumi szilícium cellák hatásfoka ma kb. 27%, a boltban kapható paneleké 20–23%. Egy panel a fény kb. ötödét alakítja árammá – ez meglepően jó egy mozgó alkatrész nélküli eszköztől!'
      },
      {
        id: 'szalag', z: 5, name: 'Cellaösszekötő szalagok (busbar)', en: 'cell interconnect ribbons, busbars', svg: ribbons, explode: [26, -52], badge: B(-55, 12, 2),
        what: 'Ezek a vékony fémszalagok kötik **sorba** a cellákat: az egyik cella elejét (−) a következő cella hátuljához (+) forrasztják. Így a kis cellafeszültségek összeadódnak, és a panel végén kb. 40–50 V jelenik meg. A végeken gyűjtősínek vezetik az áramot a csatlakozódobozhoz.',
        madeOf: '**Ónozott réz** szalag vagy vékony huzal. A réz kitűnően vezet, az ónbevonat pedig lehetővé teszi a forrasztást. A cellán lévő ezüst „ujjak” erre a szalagra vezetik az áramot.',
        how: 'Egy **fűzőgép** (stringer) a cellákat sorba rendezi, a szalagokat rájuk fekteti, és infravörös fénnyel vagy forró levegővel ráforrasztja. Az így kapott cellasorokat (**stringeket**) robot helyezi az üvegre, majd a végeiket gyűjtősínekkel összekötik.',
        uni: 'A soros kapcsolás miatt a stringen ugyanaz az áram folyik át (kb. 10–14 A), a feszültségek összeadódnak (**Kirchhoff II.**). A szalagok ohmos vesztesége `P = I²·R`: ezért vágják ma a cellákat félbe (**half-cut**). Fél cella fél áramot ad, így a veszteség negyedére csökken. A több, vékonyabb szalag (**multi-busbar**, 9–16 db) rövidebb utat jelent az ujjakban, és kevesebb árnyékot vet, de a szalagszélesség és az árnyékolás között optimum van.',
        terms: ['villamosmernoki/kirchhoff-2', 'villamosmernoki/ohm-torveny']
      },
      {
        id: 'eva2', z: 3, name: 'EVA fólia (alsó)', en: 'EVA encapsulant (rear)', svg: eva2, explode: [-26, 52], badge: B(-55, 38, 1.8),
        what: 'Ugyanaz a ragasztófólia, mint a cellák felett, csak alulról: a cellákat a hátlaphoz ragasztja. A két EVA-réteg együtt teljesen körbezárja a cellákat és a szalagokat, mint egy szendvicsben.',
        madeOf: '**EVA** (etilén-vinil-acetát) fólia. Kétoldalas (bifaciális) paneleknél átlátszó, egyébként néha fehér pigmentet tesznek bele, hogy a cellák közötti résekbe eső fényt visszaverje.',
        how: 'Ugyanúgy készül, mint a felső fólia. A rétegrendet (üveg – EVA – cellák – EVA – hátlap) kézzel vagy robottal rakják egymásra, és együtt kerülnek a laminálóba.'
      },
      {
        id: 'hatlap', z: 2, name: 'Hátlap (backsheet)', en: 'backsheet', svg: back, explode: [-52, 104], badge: B(-55, 64, 1),
        what: 'A panel hátoldalát borító, általában fehér fólia. Elektromosan **szigetel** (a panelen akár 1000–1500 V is lehet a rendszerben), és védi a cellákat a nedvességtől és az UV-sugárzástól. A résén keresztül jutnak ki a kivezetések a dobozba.',
        madeOf: 'Többrétegű műanyag fólia: középen **PET** (poliészter, mint az üdítős palackoké) a szilárdság és a szigetelés miatt, kívül **fluortartalmú polimer** (pl. PVF vagy PVDF) az időjárás ellen. Kétüveges paneleknél a hátlap helyett egy második üveglap van.',
        how: 'A rétegeket külön-külön gyártják fóliának, majd ragasztóval összelaminálják. A panelgyárban tekercsről vágják méretre, és kilyukasztják rajta a kivezetések helyét.',
        uni: 'A hátlap kulcsparamétere a **vízgőzáteresztés** (WVTR, g/(m²·nap)) és a **részleges kisülési feszültség**. A cellákba jutó nedvesség korrodálja az ezüst fémezést, és növeli a soros ellenállást. A hátlap repedése (pl. egyes poliamid alapú hátlapoknál tapasztalt hibák) szigetelési hibához vezethet, amit az inverter **szigetelésiellenállás-mérése** jelez.'
      },
      {
        id: 'doboz', z: 1, name: 'Csatlakozódoboz bypass-diódákkal', en: 'junction box with bypass diodes', svg: jbox, explode: [-78, 156], badge: B(-13, 110, -0.5),
        what: 'A panel hátoldalára ragasztott kis műanyag doboz. Ebben csatlakoznak a gyűjtősínek a kivezető kábelekhez, és itt ülnek a **bypass-diódák** (megkerülő diódák). Ha a panel egy részét árnyék éri (pl. falevél vagy kémény), az árnyékolt cellák nem termelnek, sőt ellenállásként felmelegednének (**hot spot**). Ilyenkor a dióda „kerülőutat” nyit az áramnak a cellacsoport körül.',
        madeOf: 'Időjárásálló, UV-stabil **műanyag** ház (IP67/IP68 védettség), benne réz kapcsok és általában **3 Schottky-dióda** – mindegyik a cellák kb. harmadát hidalja át. A doboz belsejét gyakran szilikonnal öntik ki.',
        how: 'A műanyag házat fröccsöntik, a fém kapcsokat és a diódákat beültetik. A panelgyárban szilikonnal ragasztják a hátlapra, a kivezetéseket beforrasztják vagy rugós kapoccsal rögzítik, majd kiöntik és lezárják.',
        uni: 'A bypass-dióda nélkül egy árnyékolt cellára a string többi cellájának feszültsége **záróirányban** kerülne (akár 10–20 V), és a cella a string teljes áramánál hőként disszipálna (`P = U·I`): ez a hot spot. A dióda akkor nyit, amikor az alstring feszültsége kb. −0,4 V alá menne. Részleges árnyékoláskor a modul P–U görbéjén **több lokális maximum** jelenik meg, ezért az inverter MPPT-algoritmusának időnként a teljes görbét végig kell pásztáznia (global MPPT).',
        terms: ['villamosmernoki/kirchhoff-1']
      },
      {
        id: 'mc4', z: 0, name: 'MC4 csatlakozók és szolárkábel', en: 'MC4 connectors, PV cable', svg: mc4, explode: [-48, 170], badge: B(22, 150, -4),
        what: 'A panel két „kimenete”: egy **pozitív** és egy **negatív** kábel, a végükön kattanós, vízálló dugókkal. Ezekkel kötik össze a paneleket egymással (sorba), majd az **inverterrel**, amely a panelek egyenáramát a hálózatba illő váltakozó árammá alakítja.',
        madeOf: 'Duplán szigetelt, UV-álló **szolárkábel** (4–6 mm² ónozott réz ér). A dugók háza műanyag, belül **ezüstözött vagy ónozott réz** érintkező (az „MC4” név a 4 mm-es érintkezőtűre utal), tömítőgyűrűkkel.',
        how: 'A kábelt extrudálással szigetelik. Az érintkezőt préselőfogóval a kábelvégre sajtolják (krimpelik), betolják a házba, majd rácsavarják a tömítőanyát. Fontos, hogy csak azonos gyártótól származó, összeillő dugókat kössenek össze, különben melegedhetnek.',
        uni: 'Egyenáramú körben az ív nem alszik ki magától nullátmenetkor (mint váltakozó áramnál), ezért **terhelés alatt tilos** szétbontani a csatlakozót. A kábel feszültségesése `ΔU = 2·L·I·ρ/A`: 30 m-es (oda-vissza 60 m) 4 mm²-es rézkábelen 12 A mellett kb. 3,2 V, ami egy 400 V-os stringnél kb. 0,8% veszteség. Egy string feszültségét télen kell ellenőrizni: hidegben nő az U_oc, és nem lépheti túl az inverter maximumát.',
        terms: ['villamosmernoki/ohm-torveny']
      }
    ],
    uni: {
      text: 'Egyetemi szemmel a napelem panel **áramgenerátor párhuzamos diódával**, amelyet a sorba kötött cellák stringjei és a bypass-diódák alakítanak modullá. A modul munkapontját nem a panel, hanem a terhelés (az inverter) határozza meg: az **MPPT** (maximum power point tracking) algoritmus folyamatosan úgy állítja a feszültséget, hogy a `P = U·I` szorzat maximális legyen.\n\nA hozamot a besugárzás (Magyarországon évi kb. 1200–1350 kWh/m²), a dőlésszög és tájolás (nálunk kb. 30–35°, déli irány), a hőmérséklet és a veszteségek határozzák meg. Egy 1 kWp-es rendszer hazánkban évente nagyjából **1100–1300 kWh**-t termel. A cellatechnológia fejlődése (Al-BSF → PERC → TOPCon / heteroátmenetes, HJT → tandem perovszkit–szilícium) mind a **rekombinációs veszteségek** csökkentéséről szól.',
      terms: ['fizika-bsc/fotoeffektus', 'villamosmernoki/kirchhoff-2', 'villamosmernoki/hatasos-teljesitmeny']
    },
    steps: [
      { icon: '🏔️', title: 'Kvarcból poliszilícium', text: 'A kiindulási anyag tiszta **kvarc** (SiO₂). Ívkemencében, kb. 1900 °C-on szénnel redukálják: így kb. 98–99%-os „kohászati” szilícium lesz belőle. Ezt sósavval gáz halmazállapotú triklór-szilánná alakítják, desztillálják, majd forró rudakon újra szilíciummá bontják (**Siemens-eljárás**). Az eredmény a 99,9999%-nál tisztább **poliszilícium**.' },
      { icon: '🧪', title: 'Egykristály-henger (ingot)', text: 'A poliszilíciumot kevés **bórral** (vagy n-típusú celláknál foszforral) együtt kb. 1420 °C-on megolvasztják, egy oltókristályt mártanak bele, és lassan forgatva kihúzzák (**Czochralski-eljárás**). Egy 2–4 méter hosszú, több száz kilós egykristály henger nő, amelyben minden atom szabályos rácsban áll.' },
      { icon: '🪚', title: 'Szeletelés: a wafer', text: 'A hengert hasábbá vágják (ezért vannak a cellák sarkai levágva), majd **gyémántszemcsés drótfűrésszel** egyszerre több ezer, kb. 0,13–0,15 mm vastag szeletre (**waferre**) vágják. A fűrészporként elveszett szilícium (vágási veszteség) jelentős, ezért egyre vékonyabb drótot használnak.', parts: ['cellak'] },
      { icon: '⚗️', title: 'Textúrázás és diffúzió (p–n átmenet)', text: 'A szeleteket lúgos oldatban marják: a felületükön mikroszkopikus **piramisok** alakulnak ki, amelyek csapdába ejtik a fényt. Ezután kb. 850 °C-os kemencében **foszfort** diffundáltatnak a p-típusú szelet felső rétegébe: így alakul ki a **p–n átmenet**, a cella „szíve”.', parts: ['cellak'] },
      { icon: '🖨️', title: 'Tükröződésgátló réteg és fémezés', text: 'Plazmás eljárással (PECVD) kb. 75 nm vastag **szilícium-nitrid** réteget visznek fel: ettől lesz a cella sötétkék és alig tükröző. Ezután **szitanyomással** ezüstpasztát nyomtatnak az elejére (vékony ujjak), hátuljára alumíniumot vagy ezüstöt, és kb. 800 °C-on rövid ideig kiégetik.', parts: ['cellak'] },
      { icon: '📊', title: 'Cellatesztelés és válogatás', text: 'Minden cellát egy villanólámpa alatt megmérnek (áram–feszültség görbe), és a teljesítményük szerint osztályokba sorolják. Kamera keresi a mikrorepedéseket. Egy panelbe csak egyforma cellák kerülhetnek, mert a sorba kötött cellák közül a **leggyengébb** határozza meg az áramot.', parts: ['cellak'] },
      { icon: '🔗', title: 'Cellafűzés és rétegrakás', text: 'Fűzőgép forrasztja a cellákat **ónozott réz szalagokkal** sorba (stringekbe). Ezután egymásra rakják a rétegeket: **üveg – EVA – cellasorok – EVA – hátlap**, és a stringek végeit gyűjtősínekkel összekötik. A kivezetések a hátlap résén jönnek ki.', parts: ['uveg', 'eva1', 'szalag', 'cellak', 'eva2', 'hatlap'] },
      { icon: '🔥', title: 'Laminálás', text: 'A rétegköteg a **laminálóba** kerül: vákuumban kiszívják belőle a levegőt, majd kb. 145–150 °C-on 10–15 percig préselik. Az EVA megolvad, **térhálósodik**, átlátszóvá válik, és a rétegeket egyetlen vízzáró egységgé ragasztja.', parts: ['eva1', 'eva2'] },
      { icon: '⚡', title: 'Keretezés, doboz és flash-teszt', text: 'A laminátumot szilikonnal az **alumínium keretbe** illesztik, hátulra felragasztják a **csatlakozódobozt** az **MC4** kábelekkel. Végül egy nagy villanólámpa (**flash-teszt**) egy pillanatra szabványos napfényt utánoz, és megmérik a panel teljesítményét. Elektrolumineszcens felvétellel (a panelt áram alá helyezik, és „világít”) keresik a rejtett repedéseket.', parts: ['keret', 'doboz', 'mc4'] }
    ],
    history: [
      { year: '1839', text: 'A 19 éves **Edmond Becquerel** felfedezi, hogy fény hatására feszültség keletkezik egy elektrolitba merülő két elektróda között: ez a **fotovoltaikus hatás**.' },
      { year: '1883', text: 'Charles Fritts megépíti az első szilárd napelemet szelénből, aranyréteggel. Hatásfoka kb. 1%.' },
      { year: '1905', text: '**Albert Einstein** fotonokkal magyarázza a fényelektromos jelenséget. Ezért kapja 1921-ben a Nobel-díjat.' },
      { year: '1954', text: 'A **Bell Laboratóriumban** Chapin, Fuller és Pearson bemutatja az első gyakorlatban használható **szilícium napelemet**, kb. 6% hatásfokkal.' },
      { year: '1958', text: 'Felbocsátják a **Vanguard 1** műholdat, az első napelemes űreszközt. A napelemek az **űrtechnika** áramforrásai lesznek – ma is ezek táplálják a Nemzetközi Űrállomást.' },
      { year: '1973', text: 'Az **olajválság** után sok ország kutatási programot indít, és a napelemek elkezdenek „lejönni” a Földre: világítótornyok, távoli házak, számológépek.' },
      { year: '1976–2023', text: 'A panelek ára a gyártott mennyiség növekedésével meredeken esik: wattonként kb. 100 dollárról **kevesebb mint 0,2 dollárra**. Minden megduplázódó gyártási mennyiség kb. 20%-os árcsökkenést hozott (**Swanson-szabály**).' },
      { year: '2015–ma', text: 'Tömeggyártásba kerül a **PERC**, majd a 2020-as években a **TOPCon** és a heteroátmenetes cella (kb. 24–26% cellahatásfok). Magyarországon a 2010-es évek végétől robbanásszerűen nő a háztetőkre és naperőmű-parkokba telepített teljesítmény: ma már napos nyári délben az áramtermelés jelentős részét – időnként több mint felét – a napelemek adják.' }
    ],
    quiz: [
      { q: 'Mi választja szét a fény által kiszabadított elektronokat és lyukakat a napelemcellában?', options: ['A p–n átmenet elektromos tere', 'Az alumínium keret', 'Az EVA fólia', 'A bypass-dióda'], answer: 0, explain: 'A p- és n-típusú szilícium határán belső elektromos tér van: ez az elektronokat az n-, a lyukakat a p-oldal felé sodorja, így feszültség keletkezik.' },
      { q: 'Miért kötik sorba a cellákat a panelben?', options: ['Mert egy cella csak kb. 0,6–0,7 V-ot ad, és a feszültségek összeadódnak', 'Hogy kevesebb fény jusson rájuk', 'Hogy a panel könnyebb legyen', 'Mert így nem kell üveg'], answer: 0, explain: 'Soros kapcsolásnál a feszültségek összeadódnak: 60 vagy 120 (fél)cella együtt kb. 40–50 V-ot ad.' },
      { q: 'Mire való a bypass-dióda a csatlakozódobozban?', options: ['Kerülőutat ad az áramnak, ha cellákat árnyék ér, és megelőzi a túlmelegedést', 'Váltakozó árammá alakítja az egyenáramot', 'Tárolja az energiát éjszakára', 'Megméri a napfény erősségét'], answer: 0, explain: 'Árnyékolt cellák nélküle záróirányban terhelődnének és felforrósodnának (hot spot). Az egyen- és váltakozó áram közötti átalakítás az inverter feladata.' },
      { q: 'Mi történik az EVA fóliával a laminálás közben?', options: ['Megolvad, térhálósodik, átlátszóvá válik, és összeragasztja a rétegeket', 'Elpárolog', 'Fekete színűre változik, hogy elnyelje a fényt', 'Áramot kezd vezetni'], answer: 0, explain: 'Kb. 145–150 °C-on az EVA megolvad és térhálósodik: tartós, vízzáró, átlátszó ragasztóréteg lesz belőle.' },
      { q: 'Kb. mekkora a mai boltban kapható szilícium napelem panelek hatásfoka?', options: ['20–23%', '1–2%', '50–60%', '95–99%'], answer: 0, explain: 'A beeső napfény kb. ötödét alakítják árammá. A szilícium elméleti határa kb. 29%.' }
    ]
  });
})();
