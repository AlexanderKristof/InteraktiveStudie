/* Modell: az emberi szem – vízszintes metszet (bal szem, felülről nézve; a fény balról érkezik).
 * Fent az orr felőli (nazális), lent a halánték felőli (temporális) oldal.
 * Kiegészítő nagyítás: az ideghártya rétegei a csapokkal és a pálcikákkal. */
(function () {
  var NS = ' pointer-events="none"';
  var CX = 320, CY = 270;
  function f(n) { return (+n).toFixed(1); }
  function p(r, deg) { var a = deg * Math.PI / 180; return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; }
  function P(q) { return f(q[0]) + ' ' + f(q[1]); }
  function mirror(d) { // y → 2·CY − y tükrözés egy egyszerű (M/L/Q/C/Z, abszolút) útvonalon
    return d.replace(/(-?\d+(?:\.\d+)?)[ ,](-?\d+(?:\.\d+)?)/g, function (m, x, y) { return x + ' ' + f(2 * CY - y); });
  }
  /* Körgyűrű-szelet a0 → a1 fok között (pozitív irányban) */
  function band(r1, r2, a0, a1) {
    var big = (a1 - a0) > 180 ? 1 : 0;
    return 'M' + P(p(r2, a0)) + ' A' + r2 + ' ' + r2 + ' 0 ' + big + ' 1 ' + P(p(r2, a1)) +
      ' L' + P(p(r1, a1)) + ' A' + r1 + ' ' + r1 + ' 0 ' + big + ' 0 ' + P(p(r1, a0)) + ' Z';
  }
  function txt(x, y, s, cls, extra) {
    // a .lbl/.lbl-muted osztály CSS-ből adja a betűméretet, ezért a méretet stílusként kell megadni
    extra = (extra || '').replace(/font-size="([\d.]+)"/, 'style="font-size:$1px"');
    return '<text class="' + cls + '" x="' + x + '" y="' + y + '"' + extra + NS + '>' + s + '</text>';
  }

  var defs = '<defs>' +
    '<radialGradient id="sm-vit" cx="45%" cy="50%" r="60%"><stop offset="0" stop-color="#d9ecf8" stop-opacity=".30"/><stop offset="1" stop-color="#9ccbe6" stop-opacity=".38"/></radialGradient>' +
    '<radialGradient id="sm-lens" cx="40%" cy="40%" r="65%"><stop offset="0" stop-color="#fffbea"/><stop offset=".7" stop-color="#f5e3a4"/><stop offset="1" stop-color="#e3c46a"/></radialGradient>' +
    '<linearGradient id="sm-iris" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7fa6d6"/><stop offset="1" stop-color="#3b6aa8"/></linearGradient>' +
    '<linearGradient id="sm-scl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d7dce4"/></linearGradient>' +
    '<linearGradient id="sm-nerve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e6c2"/><stop offset="1" stop-color="#e0c792"/></linearGradient>' +
    '<linearGradient id="sm-musc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e07a6e"/><stop offset="1" stop-color="#b8453b"/></linearGradient>' +
    '</defs>';

  /* Háttér: cím, oldaljelölések, a tárgy és a fénysugarak, a fordított kép */
  var RAY = ' fill="none" stroke="#e8a908" stroke-width="1.6" stroke-linejoin="round" opacity=".9"' + NS;
  var backdrop = defs +
    txt(14, 26, 'Az emberi szem – vízszintes metszet', 'lbl', ' font-size="16"') +
    txt(14, 44, 'bal szem felülről nézve · a fény balról érkezik', 'lbl-muted') +
    txt(14, 84, '▲ orr felőli oldal', 'lbl-muted', ' font-size="11"') +
    txt(14, 526, '▼ halánték felőli oldal', 'lbl-muted', ' font-size="11"') +
    // tárgy (álló nyíl)
    '<path d="M40 270 L40 238 M34 246 L40 236 L46 246" fill="none" stroke="#e5484d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"' + NS + '/>' +
    txt(40, 290, 'tárgy', 'lbl-muted', ' text-anchor="middle" font-size="11"') +
    '<path d="M40 236 L144 240 L211 252 L457 292"' + RAY + '/>' +
    '<path d="M40 236 L140 262 L209 270 L457 292"' + RAY + '/>' +
    '<path d="M40 236 L141 288 L211 286 L457 292"' + RAY + '/>' +
    '<path d="M40 270 L457 270" stroke="#8b96a6" stroke-width="1" stroke-dasharray="3 5"' + NS + '/>' +
    // fordított kép a retinán
    '<path d="M452 270 L452 291 M447 284 L452 292 L457 284" fill="none" stroke="#e5484d" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"' + NS + '/>' +
    txt(404, 318, 'fordított kép', 'lbl-muted', ' text-anchor="middle" font-size="11"');

  /* 1. Szaruhártya */
  var cornea = '<path d="M189 178.2 A110 110 0 0 0 189 361.8 L196.3 356.6 A101.4 101.4 0 0 1 196.3 183.4 Z" fill="rgba(150,205,240,.55)" stroke="#3f86b5" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M150 214 A104 104 0 0 0 146 262" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="2" stroke-linecap="round"' + NS + '/>';

  /* 2. Csarnokvíz (elülső szemcsarnok) */
  var aqueous = '<path d="M196.3 183.4 A101.4 101.4 0 0 0 196.3 356.6 L204 352 L210 292 Q207 270 210 248 L204 188 Z" fill="rgba(110,200,225,.30)" stroke="#4aa3c8" stroke-width="1.2" stroke-dasharray="4 3"/>' +
    '<circle cx="176" cy="300" r="1.6" fill="#4aa3c8"' + NS + '/><circle cx="168" cy="240" r="1.3" fill="#4aa3c8"' + NS + '/><circle cx="184" cy="330" r="1.3" fill="#4aa3c8"' + NS + '/>';

  /* 3. Szivárványhártya a pupillával */
  var irisTop = 'M196 189 Q203 184 207 188 Q211 218 212 247 Q208 252 204 249 Q200 218 196 189 Z';
  var iris = '<path d="' + irisTop + '" fill="url(#sm-iris)" stroke="#23426e" stroke-width="1.3" stroke-linejoin="round"/>' +
    '<path d="' + mirror(irisTop) + '" fill="url(#sm-iris)" stroke="#23426e" stroke-width="1.3" stroke-linejoin="round"/>' +
    '<path d="M205 236 L207 248 M205 304 L207 292" stroke="#6b3d1f" stroke-width="2.4"' + NS + '/>' +
    txt(222, 272, 'pupilla', 'lbl-muted', ' font-size="9"');

  /* 4. Szemlencse */
  var lens = '<path d="M234 214 C214 214 209 250 209 270 C209 290 214 326 234 326 C258 326 262 290 262 270 C262 250 258 214 234 214 Z" fill="url(#sm-lens)" stroke="#a8862e" stroke-width="1.6"/>' +
    '<path d="M236 226 C222 228 218 252 218 270 C218 288 222 312 236 314 C252 312 254 288 254 270 C254 252 252 228 236 226 Z" fill="none" stroke="#c9a74a" stroke-width=".8" opacity=".7"' + NS + '/>' +
    '<path d="M236 240 C228 242 226 258 226 270 C226 282 228 298 236 300 C246 298 247 282 247 270 C247 258 246 242 236 240 Z" fill="none" stroke="#c9a74a" stroke-width=".8" opacity=".6"' + NS + '/>';

  /* 5. Sugártest és lencsefüggesztő rostok */
  var ciliTop = 'M196.3 183.4 L235.6 144.8 Q238 172 224 194 Q212 197 196.3 183.4 Z';
  var cili = '<path d="' + ciliTop + '" fill="#c86a64" stroke="#7a2e2a" stroke-width="1.3" stroke-linejoin="round"/>' +
    '<path d="' + mirror(ciliTop) + '" fill="#c86a64" stroke="#7a2e2a" stroke-width="1.3" stroke-linejoin="round"/>' +
    '<path d="M206 186 q4 6 8 2 q4 6 8 2 M206 354 q4 -6 8 -2 q4 -6 8 -2" fill="none" stroke="#7a2e2a" stroke-width="1"' + NS + '/>';
  var zon = 'M216 194 L229 215 M220 194 L234 214 M224 193 L239 215 M227 190 L244 217';
  cili += '<path d="' + zon + ' ' + mirror(zon) + '" stroke="#b49650" stroke-width="1.1"/>';

  /* 6. Üvegtest */
  var vitreous = '<path d="M' + P(p(137.5, -124)) + ' A137.5 137.5 0 1 1 ' + P(p(137.5, 124)) +
    ' L222 346 L234 326 C258 326 262 290 262 270 C262 250 258 214 234 214 L222 194 Z" fill="url(#sm-vit)" stroke="#86b6d4" stroke-width="1"/>' +
    '<path d="M268 270 Q340 262 440 270" fill="none" stroke="#86b6d4" stroke-width="1" stroke-dasharray="2 4" opacity=".7"' + NS + '/>';

  /* 7. Ideghártya (retina) + nagyított részlet a csapokkal és a pálcikákkal */
  var retina = '<path d="' + band(138, 145, -124, -24) + '" fill="#ec9a7c" stroke="#a4553e" stroke-width="1"/>' +
    '<path d="' + band(138, 145, -8, 124) + '" fill="#ec9a7c" stroke="#a4553e" stroke-width="1"/>';
  var ip = p(141, -42);
  retina += '<path d="M' + P(ip) + ' L452 132" stroke="#a4553e" stroke-width="1.2" stroke-dasharray="3 3"' + NS + '/>' +
    '<circle cx="' + f(ip[0]) + '" cy="' + f(ip[1]) + '" r="6" fill="none" stroke="#a4553e" stroke-width="1.4"' + NS + '/>' +
    '<rect x="446" y="8" width="214" height="124" rx="10" fill="rgba(236,154,124,.16)" stroke="#a4553e" stroke-width="1.4"/>' +
    txt(456, 24, 'az ideghártya rétegei – nagyítva', 'lbl-muted', ' font-size="10"') +
    '<path d="M454 66 L474 66 M468 61 L474 66 L468 71" fill="none" stroke="#e8a908" stroke-width="2" stroke-linecap="round"' + NS + '/>' +
    txt(456, 56, 'fény', 'lbl-muted', ' font-size="9"');
  // dúcsejtek (látóideg-rostokkal), bipoláris sejtek
  [42, 66, 90].forEach(function (y) {
    retina += '<path d="M490 ' + y + ' L522 ' + (y + 2) + '" stroke="#5c8a4a" stroke-width="1"' + NS + '/>' +
      '<circle cx="490" cy="' + y + '" r="5.5" fill="#8fc27a" stroke="#3f6a30" stroke-width="1"/>';
  });
  [48, 74, 98].forEach(function (y) {
    retina += '<path d="M523 ' + y + ' L548 ' + y + '" stroke="#a08ad0" stroke-width="1"' + NS + '/>' +
      '<ellipse cx="530" cy="' + y + '" rx="5" ry="3.4" fill="#c7b6ee" stroke="#6a54a3" stroke-width="1"/>';
  });
  // fotoreceptorok: pálcikák (lila) és csapok (piros/zöld/kék), külső szegmensük a pigmenthám felé néz
  var CONE = ['#e0533f', '#3fa35b', '#3d6fd0'], ci = 0;
  for (var ry = 38; ry <= 108; ry += 7) {
    var isCone = (ry - 38) % 21 === 7;
    if (isCone) {
      retina += '<path d="M552 ' + ry + ' L586 ' + ry + '" stroke="#8b96a6" stroke-width="1"' + NS + '/>' +
        '<path d="M586 ' + (ry - 4) + ' L612 ' + (ry - 1.5) + ' L612 ' + (ry + 1.5) + ' L586 ' + (ry + 4) + ' Z" fill="' + CONE[ci++ % 3] + '" stroke="#333b46" stroke-width=".8"/>';
    } else {
      retina += '<path d="M552 ' + ry + ' L578 ' + ry + '" stroke="#8b96a6" stroke-width="1"' + NS + '/>' +
        '<rect x="578" y="' + (ry - 2) + '" width="52" height="4" rx="2" fill="#9c7fd6" stroke="#4f3a86" stroke-width=".8"/>';
    }
  }
  retina += '<rect x="634" y="32" width="18" height="82" rx="3" fill="#7a4a2a" stroke="#4a2a14" stroke-width="1"/>' +
    '<text x="646" y="73" font-size="8.5" fill="#f6e7d6" text-anchor="middle" transform="rotate(-90 646 73)"' + NS + '>pigmenthám</text>' +
    txt(490, 126, 'dúcsejt', 'lbl-muted', ' font-size="8.5" text-anchor="middle"') +
    txt(533, 126, 'bipoláris', 'lbl-muted', ' font-size="8.5" text-anchor="middle"') +
    txt(596, 126, 'csap / pálcika', 'lbl-muted', ' font-size="8.5" text-anchor="middle"') +
    '';

  /* 8. Sárgafolt (macula) a látógödörrel (fovea) */
  var pit0 = p(137.5, -4), pit1 = p(137.5, 4);
  var macula = '<path d="' + band(137, 145.5, -8, 8) + '" fill="#f2c230" stroke="#9a7400" stroke-width="1.2"/>' +
    '<path d="M' + P(pit0) + ' Q' + f(CX + 147) + ' ' + CY + ' ' + P(pit1) + ' Z" fill="#cfe4f2" stroke="#9a7400" stroke-width="1"/>';

  /* 9. Látóideg a vakfolttal (látóidegfő) */
  var U = [Math.cos(-16 * Math.PI / 180), Math.sin(-16 * Math.PI / 180)], N = [-U[1], U[0]];
  function Q(r, w) { return [CX + r * U[0] + w * N[0], CY + r * U[1] + w * N[1]]; }
  var nerve = '<path d="M' + P(Q(150, -27)) + ' L' + P(Q(250, -25)) + ' Q' + P(Q(262, 0)) + ' ' + P(Q(250, 25)) + ' L' + P(Q(150, 27)) + ' Z" fill="#d7bd84" stroke="#8d7340" stroke-width="1.3"/>' +
    '<path d="M' + P(Q(137, -19)) + ' L' + P(Q(252, -18)) + ' Q' + P(Q(259, 0)) + ' ' + P(Q(252, 18)) + ' L' + P(Q(137, 19)) + ' Z" fill="url(#sm-nerve)" stroke="#a88b4f" stroke-width="1.1"/>';
  [-12, -7, 7, 12].forEach(function (w) { nerve += '<path d="M' + P(Q(140, w)) + ' L' + P(Q(250, w)) + '" stroke="#c9ad74" stroke-width=".8"' + NS + '/>'; });
  nerve += '<path d="M' + P(Q(140, -2.5)) + ' L' + P(Q(254, -2.5)) + '" stroke="#d23a43" stroke-width="2.4"/>' +
    '<path d="M' + P(Q(140, 2.5)) + ' L' + P(Q(254, 2.5)) + '" stroke="#3d62b3" stroke-width="2.4"/>' +
    // a látóidegfő bemélyedése (vakfolt)
    '<path d="M' + P(Q(137, -16)) + ' Q' + P(Q(146, 0)) + ' ' + P(Q(137, 16)) + ' Z" fill="#fff3d6" stroke="#a88b4f" stroke-width="1"/>' +
    txt(436, 228, 'vakfolt', 'lbl-muted', ' font-size="10" text-anchor="end"');

  /* 10. Érhártya */
  var choroid = '<path d="' + band(145, 151, -128, -24) + '" fill="#8e3b3b" stroke="#5a1f22" stroke-width="1"/>' +
    '<path d="' + band(145, 151, -8, 128) + '" fill="#8e3b3b" stroke="#5a1f22" stroke-width="1"/>';
  [-100, -60, 30, 70, 110].forEach(function (a) {
    var q = p(148, a); choroid += '<circle cx="' + f(q[0]) + '" cy="' + f(q[1]) + '" r="1.6" fill="#e5484d"' + NS + '/>';
  });

  /* 11. Ínhártya */
  var sclera = '<path d="' + band(151, 160, -145, -24) + '" fill="url(#sm-scl)" stroke="#7d8898" stroke-width="1.3"/>' +
    '<path d="' + band(151, 160, -8, 145) + '" fill="url(#sm-scl)" stroke="#7d8898" stroke-width="1.3"/>';

  /* 12. Külső szemizmok (a vízszintes metszetben a belső és a külső egyenes izom látszik) */
  function muscle(a0, a1, end) {
    var s0 = p(170, a0), s1 = p(170, a1);
    var d = 'M' + P(s0) + ' A170 170 0 0 ' + (a1 > a0 ? 1 : 0) + ' ' + P(s1) + ' L' + end[0] + ' ' + end[1];
    return '<path d="' + d + '" fill="none" stroke="#7a2620" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="url(#sm-musc)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="10" stroke-dasharray="1 4"' + NS + '/>' +
      '<path d="M' + P(p(158, a0 - 2)) + ' L' + P(p(171, a0 - 2)) + '" stroke="#d7dce4" stroke-width="3" stroke-linecap="round"' + NS + '/>';
  }
  var muscles = muscle(-100, -48, [600, 140]) + muscle(100, 48, [600, 400]) +
    txt(528, 168, 'belső egyenes izom', 'lbl-muted', ' font-size="10" text-anchor="middle"') +
    txt(528, 382, 'külső egyenes izom', 'lbl-muted', ' font-size="10" text-anchor="middle"');

  STUDIE.addModel({
    id: 'szem',
    title: 'Az emberi szem',
    icon: '👁️',
    color: '#7c5cd6',
    category: 'Biológia',
    keywords: 'szem látás szaruhártya cornea csarnokvíz szivárványhártya írisz pupilla szemlencse akkomodáció sugártest Zinn-rostok üvegtest ideghártya retina csap pálcika rodopszin sárgafolt fovea vakfolt látóideg érhártya ínhártya szemizom rövidlátás távollátás dioptria szemüveg kontaktlencse lézeres szemműtét szürke hályog zöld hályog Kepler Helmholtz Gullstrand',
    summary: 'Kb. 2,4 cm-es, folyadékkal töltött gömb: elöl egy kétlencsés optika képet vetít, hátul kb. 125 millió fényérzékelő sejt alakítja ezt idegi jelekké.',
    scale: 'szemgolyó átmérője kb. 24 mm, tömege kb. 7–8 g; a pupilla 2–8 mm',
    viewBox: '0 0 700 540',
    backdrop: backdrop,
    intro: 'A szem olyan, mint egy **fényképezőgép**: elöl a **szaruhártya** és a **szemlencse** együtt gyűjtőlencseként működik, a **pupilla** a blende, hátul az **ideghártya** (retina) a képérzékelő. A rajzon egy tárgy (piros nyíl) fénysugarait követheted: a kép a retinán **fordított és kicsinyített**, az agy „fordítja vissza”. A lencsét a **sugártest** izma élesíti közelre és távolra.\n\nA **Szétszedés** gombbal rétegenként széthúzhatod a szemet: elöl az optikai részeket, hátul a három burkot (ideghártya, érhártya, ínhártya).',
    parts: [
      {
        id: 'szaruhartya', z: 6, name: 'Szaruhártya', svg: cornea, explode: [-62, 0], badge: [150, 212], en: 'cornea', latin: 'cornea',
        lesson: 'fizika/hullamok-feny',
        what: 'A szem elülső, átlátszó, domború „ablaka”, az ínhártya folytatása. Ez a szem **legerősebb fénytörő része**: a teljes törőerő kb. **kétharmadát** adja, mert itt lép a fény a levegőből egy sokkal sűrűbb közegbe. Nincsenek benne erek, de rendkívül sok idegvégződés van benne: ezért fáj annyira, ha valami a szemünkbe megy.',
        madeOf: 'Kb. 0,5 mm vastag, öt rétegből áll: kívül néhány sejtsor vastag **hám** (gyorsan megújul), alatta egy vékony hártya, majd a vastag **alapállomány** (stroma), amely **szabályosan rendezett kollagénrostok** kb. 200 rétegéből áll, ezután egy rugalmas hártya, legbelül pedig egyetlen sejtsor, a **belhám** (endotél). Oxigént a levegőből, tápanyagot a csarnokvízből és a könnyből kap.',
        how: 'Az embrióban a fejlődő szemlencse fölötti **külső csíralemezből** (a hám) és a köré vándorló **mezenchimából** (stroma, endotél) alakul ki, a 6–7. héttől. Átlátszóságának titka, hogy a kollagénrostok egyforma vastagok és szabályos távolságra vannak egymástól, így a szórt fény kioltja egymást, és hogy az endotél sejtjei folyamatosan **kiszivattyúzzák a vizet** a stromából. Ha ez a pumpa nem működik, a szaruhártya megduzzad és homályossá válik.',
        uni: 'A szaruhártya törőereje a görbületi sugárból: `D = (n₂ − n₁)/r`. Az elülső felszínre (n: 1,000 → 1,376, r ≈ 7,8 mm) `D ≈ +48 dpt`, a hátsó felszín (1,376 → 1,336, r ≈ 6,5 mm) kb. −6 dpt, összesen kb. **+42–43 dpt** a szem kb. 60 dpt-jából. Ha a görbület két, egymásra merőleges síkban eltér, a szem **asztigmiás** (tórikus lencsével korrigálható). A lézeres refraktív sebészet (PRK, LASIK, SMILE) a stromából vesz el anyagot, így megváltoztatja a görbületet: 1 dpt korrekció a 6 mm-es optikai zónában kb. 12–15 µm szövet eltávolítását jelenti (Munnerlyn-képlet). A szaruhártya **víz alatt** szinte hatástalan (víz: n = 1,333), ezért látunk homályosan úszás közben búvárszemüveg nélkül.',
        fact: 'A szaruhártya a leggyakrabban átültetett szövet: mivel nincsenek benne erek, a szervezet ritkán löki ki.'
      },
      {
        id: 'csarnokviz', z: 3, name: 'Csarnokvíz', svg: aqueous, explode: [-42, 0], badge: [180, 330], en: 'aqueous humour (anterior chamber)', latin: 'humor aquosus (camera anterior bulbi)',
        what: 'A szaruhártya és a szivárványhártya, illetve a lencse közötti tér (szemcsarnok) víztiszta folyadéka. **Táplálja** az ereket nem tartalmazó szaruhártyát és lencsét, elszállítja a salakanyagokat, és a nyomásával **feszesen tartja** a szemgolyó alakját, mint a levegő a labdát.',
        madeOf: 'Kb. 99%-ban **víz**, benne sók, glükóz, aminosavak, sok **C-vitamin** (védelem az UV-fény ellen) és nagyon kevés fehérje. Térfogata csak kb. 0,2–0,3 ml.',
        how: 'A **sugártest** nyúlványai folyamatosan termelik (kb. 2–3 µl percenként), a hátsó csarnokból a pupillán át az elülső csarnokba áramlik, majd a szaruhártya és a szivárványhártya találkozásánál (csarnokzug) egy szivacsos szűrőn át a **Schlemm-csatornába**, onnan a vénákba szivárog el. Kb. 1,5–2 óránként teljesen kicserélődik.',
        uni: 'A szemnyomás (IOP, normálisan kb. 10–21 Hgmm) a termelés és az elfolyás egyensúlyán múlik (Goldmann-egyenlet: `IOP = F/C + P_v`, ahol F a termelés, C az elfolyási könnyűség, P_v az episcleralis vénás nyomás). Ha az elfolyás akadályozott, a nyomás nő, és hosszú távon károsítja a látóidegfő rostjait: ez a **glaukóma (zöld hályog)**, az egyik vezető vakságot okozó betegség. Kezelése a termelést csökkentő (béta-blokkoló, karboanhidráz-gátló) vagy az elfolyást javító (prosztaglandin-analóg) szemcseppekkel, lézerrel vagy műtéttel történik.',
        fact: 'A zöld hályog sokáig semmilyen tünetet nem okoz: ezért fontos 40 év felett rendszeresen mérni a szemnyomást.'
      },
      {
        id: 'szivarvany', z: 5, name: 'Szivárványhártya és pupilla', svg: iris, explode: [-26, 0], badge: [203, 214], en: 'iris and pupil', latin: 'iris, pupilla',
        lesson: 'biologia/ideg-hormon-emesztes',
        what: 'A szem **színes** része. A közepén lévő kerek nyílás a **pupilla**, amely a fényképezőgép blendéjéhez hasonlóan szabályozza, mennyi fény jut be: erős fényben 2 mm-re szűkül, sötétben 7–8 mm-re tágul. Ez a **pupillareflex** másodperc tört része alatt, akaratunktól függetlenül működik. Közelre nézéskor is szűkül, ami növeli a mélységélességet.',
        madeOf: 'Kötőszövetes alapból, erekből, **festéksejtekből** (melanin) és két **simaizomból**: a pupilla szélén körben futó **szűkítő** izomból (paraszimpatikus idegek irányítják) és a sugarasan futó **tágító** izomból (szimpatikus idegek irányítják). A hátsó felszínét sötét pigmentréteg borítja, hogy csak a pupillán jusson át fény.',
        how: 'Az embrionális **szemserleg** peremének két rétegéből (hátsó pigmentréteg és izmok) és a köré vándorló mezenchimából (alapállomány) fejlődik ki. A szem színe a pigment mennyiségétől függ: a **barna** szemben az elülső rétegben is sok a melanin, a **kék** szemben kevés, és a kék szín a fény **szóródásából** adódik (mint az ég kékje). Csecsemőkorban a pigment még gyűlhet, ezért sok baba szeme később sötétebb lesz.',
        uni: 'A pupillareflex útvonala: retina → látóideg → (a corpus geniculatum laterale megkerülésével) a középagyi **pretectalis mag** → mindkét oldali **Edinger–Westphal-mag** → III. agyideg (n. oculomotorius) paraszimpatikus rostjai → ganglion ciliare → m. sphincter pupillae. Ezért mindkét pupilla együtt szűkül (direkt és konszenzuális reakció). A reflexet nagyrészt a fényérzékeny **melanopszint** tartalmazó dúcsejtek (ipRGC) indítják. Optikailag a pupilla az **apertúra**: kisebb pupilla nagyobb mélységélesség, de erősebb diffrakció (`θ ≈ 1,22·λ/D`); kb. 2,5–3 mm-es pupillánál a legjobb a felbontás.',
        fact: 'Az írisz mintázata egyénenként annyira különböző (még egypetéjű ikreknél is), hogy biometrikus azonosításra használják.'
      },
      {
        id: 'lencse', z: 4, name: 'Szemlencse', svg: lens, explode: [-8, 0], badge: [238, 308], en: 'crystalline lens', latin: 'lens',
        what: 'A pupilla mögötti, kétszer domború, átlátszó, **rugalmas** lencse. A szaruhártya után ez a második gyűjtőlencse, és ez **finomhangolja az élességet**: közelre nézéskor domborúbbá válik, távolra nézéskor ellaposodik. Ez az **alkalmazkodás** (akkomodáció). A kor előrehaladtával a lencse merevebb lesz: 40–45 év felett ezért kell sokaknak **olvasószemüveg**.',
        madeOf: 'Hosszú, átlátszó **lencserostokból** (sejtekből), amelyek hagymahéjszerűen, rétegesen helyezkednek el; ezek kb. 1/3 részben **krisztallin** nevű fehérjéből, 2/3 részben vízből állnak. Nincs benne sem ér, sem ideg. Kívül rugalmas **tok** veszi körül, ehhez tapadnak a függesztőrostok. Kb. 9–10 mm átmérőjű és 4 mm vastag.',
        how: 'Az embrióban a 4. héten a fejlődő szemhólyag „megérinti” a bőr külső csíralemezét, amely ettől megvastagszik, bemélyed, és **lefűződik**: ez a lencsehólyag. Hátsó sejtjei hosszú rostokká nyúlnak, és **elveszítik sejtmagjukat**, sőt minden fényt szóró sejtszervecskéjüket. A lencse egész életen át növekszik: új rostok rakódnak a régiekre, a legbelső rostok a születés előttiek. Ha a fehérjék kicsapódnak, a lencse homályossá válik: ez a **szürke hályog**, amit a lencse műlencsére cserélésével gyógyítanak.',
        uni: 'A lencse törésmutatója nem állandó (**gradiens-index** lencse): a magban kb. 1,406, a kéregben kb. 1,386, ami csökkenti a gömbi hibát. Nyugalmi törőereje kb. +19–20 dpt. **Helmholtz** elmélete szerint a sugárizom összehúzódásakor a sugártest gyűrűje szűkül, a Zinn-rostok elernyednek, és a lencse a tokjának rugalmassága miatt **domborúbbá** válik. Az **akkomodációs szélesség** a korral csökken (Donders: 10 évesen kb. 14 dpt, 40 évesen kb. 5–6 dpt, 60 évesen kb. 1 dpt): ez a **presbyopia**, mert a lencse anyaga merevebbé válik. A szürke hályog műtétje ma ultrahangos lencsezúzás (fakoemulzifikáció) és összehajtható műlencse (IOL) beültetése, amelynek törőerejét a szem hosszából és a szaruhártya görbületéből számítják (pl. SRK-képlet).',
        fact: 'A szürke hályog műtét a világ egyik leggyakrabban végzett műtétje: ma kb. 15–20 perc, és a beteg még aznap hazamehet.'
      },
      {
        id: 'sugartest', z: 5, name: 'Sugártest és lencsefüggesztő rostok', svg: cili, explode: [8, 0], badge: [218, 168], en: 'ciliary body and zonular fibres (zonules of Zinn)', latin: 'corpus ciliare, zonula ciliaris (fibrae zonulares)',
        what: 'A szivárványhártya mögötti, gyűrű alakú izmos képlet, amelyről vékony **lencsefüggesztő (Zinn-) rostok** tartják a lencsét, mint egy trambulin rugói a vásznat. A sugártest **izma** szabályozza a lencse domborúságát, a **nyúlványai** pedig termelik a csarnokvizet.',
        madeOf: 'A **sugárizom** (simaizom), erekben gazdag kötőszövet és kb. 70 redőzött **nyúlvány**, amelyeket kétrétegű hám fed; ez a hám választja ki a csarnokvizet. A függesztőrostok vékony, rugalmas **fibrillin** fehérjeszálak.',
        how: 'A szemserleg pereméből és a környező mezenchimából fejlődik, az érhártya elülső folytatásaként. Működés: **távolra** nézéskor az izom elernyed, a gyűrű tágas, a rostok **megfeszülnek**, és laposra húzzák a lencsét. **Közelre** nézéskor az izom összehúzódik, a gyűrű szűkül, a rostok **elernyednek**, és a lencse a saját rugalmasságától domborúbbá válik. Ezért fárad el a szem a sok közeli munkától: közben a sugárizom folyamatosan dolgozik.',
        uni: 'A sugárizom paraszimpatikus (III. agyideg, M₃-muszkarin-receptor) beidegzésű; az atropin-típusú szemcseppek ezért bénítják az akkomodációt (cycloplegia), ami a gyermekek szemüvegének pontos meghatározásához kell. Az akkomodáció a **közeli triász** része: akkomodáció + pupillaszűkület + a két szem befelé fordulása (konvergencia), amelyek idegrendszerileg csatolva vannak (AC/A arány). A fibrillin-1 gén mutációja (**Marfan-szindróma**) esetén a függesztőrostok gyengék, és a lencse elmozdulhat (ectopia lentis).',
        fact: 'A sugárizom a szervezet egyik legtöbbet dolgozó izma: minden pillantásváltáskor finoman utánaállít.'
      },
      {
        id: 'uvegtest', z: 1, name: 'Üvegtest', svg: vitreous, explode: [22, 0], badge: [352, 222], en: 'vitreous body (vitreous humour)', latin: 'corpus vitreum',
        what: 'A lencse mögötti nagy teret kitöltő, átlátszó, **kocsonyás** anyag: a szemgolyó térfogatának kb. **80%-a**. Megtartja a szem gömb alakját, és belülről a helyén tartja az ideghártyát. A fény akadálytalanul halad át rajta.',
        madeOf: 'Kb. **99%-ban víz**, amelyet egy finom **kollagénrost**-háló és a sok vizet megkötő **hialuronsav** tesz géllé. Térfogata kb. 4 ml. Sejt alig van benne.',
        how: 'Az embrióban a lencse és a retina közötti térben kezdetben egy ér (a **hialoid artéria**) halad át, amely a fejlődő lencsét táplálja. Ez a születés előtt visszafejlődik, helyén egy finom csatorna marad. Az üvegtest gélje élete során nem cserélődik ki, ezért idősebb korban folyósabbá válik, és a rostok összecsapzódhatnak: ezeket látjuk **„úszkáló legyecskéknek”**, főleg világos háttér előtt.',
        uni: 'Törésmutatója 1,336, gyakorlatilag megegyezik a csarnokvízével, ezért a lencse hátsó felszínén is csak kicsi a törés. Az idős korban gyakori **hátsó üvegtest-leválás** (PVD) során a gél elválik a retinától; ahol erősen tapad, a húzás **retinaszakadást** okozhat, amelyen át folyadék kerül a retina alá: ez a **retinaleválás**, amely sürgős ellátást igényel. Szemfenéki műtétnél (vitrectomia) az üvegtestet eltávolítják, és sóoldattal, gázzal vagy szilikonolajjal pótolják.',
        fact: 'Ha hirtelen sok új „legyecske” vagy villanás jelenik meg a látótérben, azonnal szemorvoshoz kell menni: ez retinaszakadás jele lehet.'
      },
      {
        id: 'retina', terms: ['anatomia/latas', 'anatomia/neuron'], z: 3, name: 'Ideghártya (retina): csapok és pálcikák', svg: retina, explode: [36, 0], badge: [392, 394], link: 'sejt', en: 'retina: rods and cones, bipolar and ganglion cells, RPE', latin: 'retina',
        lesson: 'biologia/ideg-hormon-emesztes',
        what: 'A szem belső, vékony hártyája, a szem **képérzékelője**. Kb. **120 millió pálcikát** és **6 millió csapot** tartalmaz. A **pálcikák** nagyon érzékenyek, gyenge fényben (szürkületben, éjszaka) dolgoznak, de színeket nem látnak. A **csapok** erős fényben működnek, és háromféle (kékre, zöldre, vörösre legérzékenyebb) típusuk adja a **színlátást**. Meglepő módon a fényérzékelő sejtek a retina **legkülső** rétegében vannak: a fénynek előbb a többi sejtrétegen kell áthaladnia (lásd a nagyított rajzot).',
        madeOf: 'Kb. 0,2–0,5 mm vastag, tíz rétegű **idegszövet**: belülről kifelé a látóidegrostok és a **dúcsejtek**, a **bipoláris sejtek** (és összekötő sejtek), majd a **csapok** és a **pálcikák**, végül a sötét **pigmenthám**, amely elnyeli a szórt fényt, és táplálja, „karbantartja” a fotoreceptorokat. A pálcikákban a **rodopszin** (látóbíbor), a csapokban hasonló **opszin** festékek nyelik el a fényt; ezek az **A-vitaminból** készülő retinált tartalmazzák.',
        how: 'A retina valójában az **agy kitüremkedése**: az embrió köztiagyából a 4. héten szemhólyag nő ki, amely a lencse hatására **szemserleggé** türemkedik be. A serleg belső rétegéből lesz az idegi retina, a külsőből a pigmenthám. Működés: egy foton a rodopszinban a **retinált** átfordítja (11-cisz → teljesen transz alak), ez egy jelátviteli láncot indít, és a sejt elektromos állapota megváltozik. A jel a bipoláris sejteken át a dúcsejtekhez jut, amelyek már **akciós potenciálokat** küldenek a látóidegen.',
        uni: 'A **fototranszdukció**: fény → rodopszin aktiválódik (metarodopszin II) → **transzducin** G-fehérje → foszfodiészteráz (PDE6) bontja a **cGMP**-t → a cGMP-függő kationcsatornák bezárulnak → a sötétben folyó Na⁺/Ca²⁺ „sötétáram” megszűnik → a fotoreceptor **hiperpolarizálódik**, és kevesebb glutamátot ad le. A lánc óriási erősítésű: egy pálcika **egyetlen fotonra** is mérhető választ ad. A retina már előfeldolgoz: a dúcsejtek koncentrikus „ON-center / OFF-center” **receptív mezői** kontrasztot (laterális gátlás) jeleznek, így kb. 125 millió fotoreceptor jelét kb. 1,2 millió idegrost viszi el (kb. 100 : 1 tömörítés). A csapok érzékenységi maximuma kb. 420 nm (S), 530 nm (M) és 560 nm (L), a rodopszinnak kb. 500 nm.',
        fact: 'Sötétben a szem kb. 30–40 perc alatt alkalmazkodik teljesen: ennyi idő kell, hogy a pálcikákban újra felhalmozódjon a rodopszin.'
      },
      {
        id: 'sargafolt', z: 7, name: 'Sárgafolt (látógödör)', svg: macula, explode: [36, 0], badge: [438, 256], en: 'macula lutea and fovea centralis', latin: 'macula lutea, fovea centralis',
        what: 'A retina közepén, a látótengelyben lévő kb. 5 mm-es sárgás terület, közepén egy kis bemélyedéssel, a **látógödörrel** (fovea). Itt a **legélesebb a látás**: ide vetül, amire éppen nézünk, például az a betű, amit most olvasol. A látógödörben csak **csapok** vannak, nagyon sűrűn, ezért gyenge fényben itt rosszabbul látunk (a halvány csillagot érdemes kicsit mellé nézve figyelni).',
        madeOf: 'Sűrűn álló, különösen vékony **csapokból**, a látógödör közepén pálcikák nélkül. A felette lévő sejtrétegek és az erek **oldalra tolódnak**, ezért mélyed be: így a fény szinte akadály nélkül éri a csapokat. Sárga színét a növényi eredetű **lutein** és **zeaxantin** festékanyagok adják, amelyek a kék fényt szűrik.',
        how: 'A látógödör a magzati kor második felében kezd kialakulni, de csak **születés után**, kb. 4 éves korig érik be teljesen, ahogy a csapok összetömörödnek és a belső rétegek oldalra húzódnak. Ezért fejlődik a gyerekek látásélessége évekig. A festékanyagokat táplálékkal (zöld leveles zöldségek, tojássárgája) vesszük fel.',
        uni: 'A látógödör közepén a csapok közti távolság kb. 2–2,5 µm, ami kb. 0,5 szögpercnek felel meg; a **Nyquist-határ** szerint ez kb. 60 ciklus/fok térbeli frekvencia feloldását teszi lehetővé, ami jó egyezésben van az optika diffrakciós határával. A foveális csapok kb. 1 : 1 arányban kapcsolódnak a „midget” bipoláris és dúcsejtekhez, a periférián akár több száz pálcika jele is egy dúcsejtre fut össze (nagy érzékenység, kis felbontás). Az **időskori makuladegeneráció** (AMD) a fejlett országokban a vakság vezető oka; nedves formáját az érújdonképződést gátló (anti-VEGF) injekciókkal kezelik.',
        fact: 'A látótér közepén csak kb. 2 fokos, nagyjából hüvelykujjköröm-nyi területen látunk igazán élesen; a szemünk ezért ugrál másodpercenként többször (szakkádok).'
      },
      {
        id: 'latoideg', terms: ['anatomia/latas'], z: 6, name: 'Látóideg és vakfolt', svg: nerve, explode: [92, 0], badge: [532, 205], en: 'optic nerve and optic disc (blind spot)', latin: 'nervus opticus, discus nervi optici',
        lesson: 'biologia/ideg-hormon-emesztes',
        what: 'A látóideg viszi a retina jeleit az agyba. Kb. **1,2 millió idegrostból** áll, amelyek a retina dúcsejtjeiből indulnak, és a szem hátsó részén, egy pontban, a **látóidegfőben** lépnek ki. Ezen a helyen nincsenek fényérzékelő sejtek: ez a **vakfolt**. Azért nem vesszük észre, mert a két szem látótere fedi egymást, és az agy a hiányt a környezet alapján „kitölti”.',
        madeOf: '**Velőshüvelyes idegrostokból** (a dúcsejtek nyúlványai), támasztó sejtekből és három agyburokból álló hüvelyből. A közepén fut a retinát ellátó **központi artéria és véna**, amelyek a látóidegfőben ágaznak szét a retinán (a szemtükörrel ezeket látja az orvos).',
        how: 'A fejlődő szemhólyagot az agyhoz kötő **szemnyél** mentén nőnek az idegrostok az agy felé, a 7. héttől. A két látóideg a koponyában a **látóideg-kereszteződésben** találkozik: ott a retinák orr felőli feléből jövő rostok átkereszteződnek. A jelek a köztiagy átkapcsoló magján át a **nyakszirti lebeny** látókérgébe jutnak.',
        uni: 'A látóideg valójában a **központi idegrendszer** része (rostjait oligodendrociták szigetelik, nem Schwann-sejtek), ezért sérülés után nem regenerálódik. A látópálya: retina → n. opticus → **chiasma opticum** (a nazális rostok kereszteződnek, így a bal látótér mindkét szemből a jobb agyféltekébe kerül) → tractus opticus → **corpus geniculatum laterale** → látósugárzás → elsődleges látókéreg (**V1**, area striata). A látóidegfő (papilla) kb. 1,5–1,8 mm átmérőjű, a látótérben kb. 15°-kal a fixációs ponttól halánték felé eső vakfoltnak felel meg (Mariotte, 1660). A glaukómás károsodás a papilla „kivájulásaként” (cupping) látható.',
        fact: 'Megtalálhatod a vakfoltodat: rajzolj egy papírra egymástól 8 cm-re egy keresztet és egy pöttyöt, csukd be a bal szemed, nézd a jobb szemeddel a keresztet, és lassan közelítsd a papírt: egy ponton a pötty eltűnik.'
      },
      {
        id: 'erhartya', z: 2, name: 'Érhártya', svg: choroid, explode: [58, 0], badge: [292, 416], en: 'choroid', latin: 'choroidea',
        what: 'Az ideghártya és az ínhártya közötti, **erekben rendkívül gazdag**, sötét réteg, a szem középső burkának hátsó része. **Táplálja** a retina külső rétegeit (főleg a sok energiát fogyasztó fotoreceptorokat), és sötét festékével **elnyeli** a retinán áthaladt fényt, hogy az ne verődjön vissza és ne rontsa a kép élességét.',
        madeOf: 'Sűrű **érhálózatból** (a legbelső rétege egy különösen tágas hajszálér-réteg), kötőszövetből és sok **melanint** tartalmazó festéksejtből. Elöl a sugártestben és a szivárványhártyában folytatódik (ezek együtt az **érhártyás burok**).',
        how: 'Az embrióban a szemserleget körülvevő **mezenchimából** alakul ki, a 6. héttől. Egyes állatoknál (macska, kutya) az érhártyában egy fényvisszaverő réteg (**tapetum lucidum**) is van: ez javítja a sötétben látást, és ezért világít a szemük a reflektor fényében. Az embernek ilyen rétege nincs.',
        uni: 'Az érhártya véráramlása tömegegységre vetítve az egyik legnagyobb a szervezetben, és oxigénkivonása kicsi (a vénás vér is oxigéndús marad): a nagy áramlás a fotoreceptorok anyagcseréjének ellátása mellett **hőelvezetést** is szolgál a fény elnyelésekor. A fényképeken látható **„vörös szem”** effektust a vakuból a pupillán át bejutó fény okozza, amely az érhártya és a retina vérben gazdag rétegeiről verődik vissza. Az OCT (optikai koherencia tomográfia) a retina és az érhártya rétegeit mikrométeres felbontással képezi le.',
        fact: 'A „vörös szem” effektus ellen a fényképezőgépek elővillantanak: ettől a pupilla összeszűkül, mielőtt a kép elkészülne.'
      },
      {
        id: 'inhartya', z: 1, name: 'Ínhártya', svg: sclera, explode: [74, 0], badge: [218, 392], en: 'sclera', latin: 'sclera',
        what: 'A szemgolyó kemény, fehér **külső burka**, ez a „szemfehérje”. Védi a szem belsejét, megtartja az alakját, és ehhez tapadnak a **szemmozgató izmok**. Elöl az átlátszó szaruhártyában folytatódik, hátul a látóideg hüvelyébe megy át.',
        madeOf: 'Sűrű, **rendezetlenül** szövődő **kollagénrostokból** álló kötőszövet, kevés érrel. Kb. 0,5–1 mm vastag. Ugyanaz az anyag, mint a szaruhártyáé, de mivel a rostok vastagsága és elrendeződése szabálytalan, **fehér** és nem átlátszó. Kívül a vékony, átlátszó kötőhártya borítja.',
        how: 'Az embrióban a szemserleget körülvevő mezenchima külső, tömörödő rétegéből alakul ki. Csecsemőknél még vékonyabb, ezért kékes árnyalatú lehet (átsejlik rajta az érhártya). Ha a szemgolyó gyerekkorban túl hosszúra nő, az ínhártya megnyúlik: ez okozza a leggyakoribb, ún. **tengelyrövidlátást**.',
        uni: 'Az ínhártya biomechanikája határozza meg a szemgolyó méretét: a rövidlátás kialakulása (emmetropizációs zavar) az ínhártya extracelluláris mátrixának átépülésével jár. Kimutatták, hogy a **sok szabadban töltött idő** (erős nappali fény, dopamin-felszabadulás a retinában) csökkenti a gyermekkori rövidlátás kialakulásának kockázatát; a progresszió lassítására alacsony dózisú atropint és speciális (defókuszáló) szemüveg- vagy kontaktlencséket alkalmaznak. A látóideg kilépésénél az ínhártya rostacsontszerű lemezzé (**lamina cribrosa**) alakul, amelyen a rostok áthaladnak: ez a glaukóma fő károsodási helye.',
        fact: 'Az emberi szem fehérje a többi főemlőshöz képest feltűnően nagy és fehér: ez segít látni, hová néz a másik ember.'
      },
      {
        id: 'szemizmok', z: 2, name: 'Szemmozgató izmok', svg: muscles, explode: [84, 0], badge: [520, 398], en: 'extraocular muscles (medial and lateral rectus shown)', latin: 'musculi externi bulbi oculi (musculus rectus medialis et lateralis)',
        what: 'Minden szemet **hat** harántcsíkolt izom mozgat: négy egyenes (felső, alsó, belső, külső) és két ferde izom. A vízszintes metszetben a **belső** és a **külső egyenes izom** látszik: ezek fordítják a szemet az orr, illetve a halánték felé. A két szem izmai tökéletes összhangban dolgoznak, hogy mindkét szem ugyanoda nézzen; ha ez nem sikerül, **kancsalság** alakul ki.',
        madeOf: '**Harántcsíkolt izomrostokból**, amelyek a szemgödör hátsó csúcsán egy közös ín-gyűrűből erednek, és lapos **inakkal** tapadnak az ínhártyához. A szervezet legpontosabb izmai közé tartoznak: egy idegrost csak kevés izomrostot irányít, így nagyon finoman szabályozhatók.',
        how: 'A fej **mezodermájából** fejlődnek, és három agyideg idegzi be őket: a külső egyenes izmot a VI. (n. abducens), a felső ferde izmot a IV. (n. trochlearis), az összes többit a III. (n. oculomotorius). A szem gyors ugrásai (**szakkádok**) alatt az agy egy pillanatra „kikapcsolja” a látást, ezért nem látjuk elmosódottnak a világot.',
        uni: 'A szemmozgások típusai: **szakkád** (akár 500–700 °/s, 20–200 ms), **sima követés** (mozgó tárgy követése, kb. 30–100 °/s-ig), **vergencia** (a két szem ellentétes irányú mozgása közelre-távolra nézéskor), a **vesztibulo-okuláris reflex** (fejmozgáskor a szem ellenkező irányba fordul, így a kép stabil marad) és az **optokinetikus nisztagmus**. Az agonista–antagonista izmok együttműködését a **Sherrington-féle** reciprok beidegzés (egy szemen belül) és a **Hering-törvény** (a két szem társizmai egyforma beidegzést kapnak) írja le.',
        fact: 'A szem naponta több mint százezer szakkádot végez: olvasás közben is kb. 3–4-szer ugrik másodpercenként.'
      }
    ],
    uni: {
      text: 'Optikai szempontból a szem egy **vastag lencserendszer**, amelyet gyakran egyszerűsítenek a **redukált szemmé** (egyetlen törőfelület, n = 1,336). A teljes törőerő nyugalomban kb. **60 dpt** (szaruhártya ≈ 43 dpt, lencse ≈ 19–20 dpt, a kettő távolsága miatt nem egyszerűen összeadódnak: `D = D₁ + D₂ − (d/n)·D₁·D₂`). A törőerő a fókusztávolság reciproka: `D = 1/f` (méterben). Egy normálisan látó (emmetróp) szem kb. 24 mm hosszú, és nyugalomban a végtelen távoli tárgy képét pontosan a retinára vetíti.\n\nA **leképezési egyenlet** `1/t + 1/k = 1/f` szerint közeli tárgynál a képtávolság nőne; mivel a szem hossza állandó, a lencsének kell erősebbé válnia (**akkomodáció**). Egy 25 cm-re lévő tárgyhoz `1/0,25 = +4 dpt` többlet kell. **Rövidlátásnál** (myopia) a szem a törőerőhöz képest túl hosszú (vagy túl erős az optikája), a kép a retina **előtt** keletkezik: **szórólencsével** (negatív dioptria) javítjuk. **Távollátásnál** (hypermetropia) túl rövid, a kép a retina **mögé** esne: **gyűjtőlencse** (pozitív dioptria) kell. Ökölszabály: 1 mm tengelyhossz-eltérés kb. 2,7–3 dpt fénytörési hibát okoz. A **távolpont** rövidlátónál véges: −2 dpt-s szem 50 cm-nél messzebb nem lát élesen. A felbontás határa a csapok sűrűségén és a pupilla diffrakcióján múlik: `θ_min ≈ 1,22·λ/D` (D = 3 mm, λ = 550 nm → kb. 0,8 szögperc), ez nagyjából megfelel az 1,0-es látásélességnek (1 szögperc).'
    },
    steps: [
      { icon: '🔆', title: '1. Fénytörés a szaruhártyán', text: 'A tárgyról visszaverődő fény először a **szaruhártyára** érkezik. Mivel a fény itt a levegőből egy sűrűbb közegbe lép, és a felület erősen domború, a sugarak **megtörnek** és egymás felé hajlanak. A szem teljes törőerejének kb. **kétharmada** itt keletkezik. A fény ezután a **csarnokvízen** halad át.', parts: ['szaruhartya', 'csarnokviz'] },
      { icon: '⚫', title: '2. A pupilla adagolja a fényt', text: 'A **szivárványhártya** izmai a fény erősségéhez igazítják a **pupilla** méretét: erős fényben kicsi (kb. 2 mm), sötétben nagy (kb. 8 mm). Ez a **pupillareflex**, amely másodperc tört része alatt, akaratunktól függetlenül működik, és mindkét szemen egyszerre.', parts: ['szivarvany'] },
      { icon: '🔍', title: '3. Élesítés: akkomodáció', text: 'A **szemlencse** finomhangolja az élességet. Távolra nézve a **sugártest** izma elernyed, a **Zinn-rostok** megfeszülnek, a lencse **lapos**. Közelre nézve az izom összehúzódik, a rostok elernyednek, a lencse **domborúbb**, így erősebben töri a fényt. Mintha a fényképezőgépen állítanánk az élességet, csak itt a lencse alakja változik, nem a helye.', parts: ['lencse', 'sugartest'] },
      { icon: '🙃', title: '4. Fordított kép a retinán', text: 'A fény az átlátszó **üvegtesten** át éri el a **retinát**. A gyűjtőlencseként működő optika **fordított, kicsinyített, valódi** képet vetít rá (Kepler fedezte fel 1604-ben). A legélesebb kép a **sárgafolt** közepén, a látógödörben keletkezik, ide fordítjuk a szemünket, amikor valamit megnézünk.', parts: ['uvegtest', 'retina', 'sargafolt'] },
      { icon: '🧪', title: '5. Fényérzékelés: rodopszin és társai', text: 'A retina külső rétegében a **pálcikák** és a **csapok** elnyelik a fotonokat. A pálcikákban a **rodopszin** (látóbíbor) molekula fény hatására alakot vált, és egy vegyi láncreakció megváltoztatja a sejt elektromos feszültségét. A háromféle **csap** különböző színekre érzékeny: arányaikból „számolja ki” az agy a színt. Az elhasznált festéket a **pigmenthám** segítségével a sejtek újratermelik (ehhez kell az **A-vitamin**).', parts: ['retina', 'sargafolt', 'erhartya'] },
      { icon: '📡', title: '6. Jel a látóidegen', text: 'A fotoreceptorok jelét a **bipoláris sejtek** a **dúcsejtekhez** adják tovább, amelyek idegimpulzusokat küldenek. A retina már **előfeldolgozza** a képet (pl. a kontrasztokat, mozgást kiemeli), és kb. 125 millió érzékelő jelét kb. 1,2 millió rostba sűríti. Ezek a rostok a **látóidegben** hagyják el a szemet; a kilépési helyen nincs érzékelő: ez a **vakfolt**.', parts: ['retina', 'latoideg'] },
      { icon: '🧠', title: '7. Az agy „látja” a képet', text: 'A két látóideg a koponyában találkozik (**látóideg-kereszteződés**): a jobb oldali látótér képe a bal, a bal oldalié a jobb agyféltekébe kerül. Átkapcsolás után a jel a **nyakszirti lebeny** látókérgébe jut. Az agy itt rakja össze a formát, a színt, a mozgást és a mélységet, a két szem kissé eltérő képéből **térlátást** számol, és a fordított képet „helyesen” értelmezi. Közben a **szemmozgató izmok** folyamatosan oda irányítják a tekintetet, ahová figyelünk.', parts: ['latoideg', 'szemizmok'] },
      { icon: '👓', title: '8. Rövidlátás és korrekciója', text: 'A **rövidlátó** (myop) szem általában **túl hosszú**, ezért a távoli tárgyak képe a retina **előtt** jön létre, a retinán pedig elmosódott. Közelre jól lát. Javítása **szórólencsével** (homorú lencse, negatív dioptria, pl. −2,5), amely kissé széttartóvá teszi a sugarakat, így a kép hátrébb, a retinára kerül. Szemüveg helyett kontaktlencse vagy **lézeres műtét** is szóba jöhet, amely a szaruhártyát laposabbá formálja.', parts: ['inhartya', 'szaruhartya', 'retina'] },
      { icon: '🔎', title: '9. Távollátás és időskori olvasózavar', text: 'A **távollátó** (hypermetrop) szem **túl rövid**, a kép a retina **mögé** esne. Fiatalon a lencse akkomodációval ezt kiegyenlíti, de ez fárasztó, főleg közelre. Javítása **gyűjtőlencsével** (domború lencse, pozitív dioptria). Ettől eltérő az **időskori távollátás** (presbyopia): 40–45 év felett a lencse merevebbé válik, és nem tud elég domborúvá válni, ezért közelre (olvasáshoz) szintén **gyűjtőlencse** kell.', parts: ['lencse', 'sugartest', 'szaruhartya'] }
    ],
    history: [
      { year: 'kb. 1021', text: '**Alhazen** (Ibn al-Haytham) arab tudós „Az optika könyve” című művében kísérletekkel igazolja, hogy a látás során a fény a **tárgyakról jut a szembe**, és nem a szemből indulnak ki „látósugarak”, ahogy az ókorban sokan gondolták.' },
      { year: '1604', text: 'Johannes **Kepler** német csillagász megmagyarázza, hogy a szem optikája egy **fordított, kicsinyített képet** vetít a retinára, és hogy a látás valójában a retinán kezdődik. Rövid- és távollátás szemüveges javítását is helyesen írja le.' },
      { year: '1851', text: 'Hermann von **Helmholtz** feltalálja a **szemtükröt** (oftalmoszkóp), amellyel először lehet élő emberben a szemfenékre, a retinára és a látóidegfőre nézni. Később kidolgozza az **akkomodáció** máig elfogadott elméletét.' },
      { year: '1888', text: 'Adolf Eugen **Fick** német orvos elkészíti az első, a szemre helyezett **üveg kontaktlencsét**. Az első **puha (hidrogél) lencse** anyagát Otto **Wichterle** cseh kémikus fejleszti ki az 1950–60-as években.' },
      { year: '1911', text: 'Allvar **Gullstrand** svéd szemorvos **Nobel-díjat** kap a szem fénytörésének (dioptrikájának) kutatásáért: pontos matematikai modellt (sematikus szemet) ad a szem optikájára, és feltalálja a réslámpát is.' },
      { year: '1949', text: 'Harold **Ridley** angol szemsebész beülteti az első **műlencsét** szürke hályog miatt eltávolított lencse helyére. Ötlete pilóták szemében talált, sérülést nem okozó plexiüveg-szilánkokból született.' },
      { year: '1967', text: 'George **Wald** (Ragnar Granittal és Haldan Keffer Hartlinnal megosztva) Nobel-díjat kap a látás vegyi és élettani folyamatainak, köztük a **rodopszin** és az **A-vitamin** szerepének felderítéséért.' },
      { year: '1987–1990', text: 'Megjelenik a **lézeres szemműtét**: az excimer lézerrel végzett **PRK**, majd a szaruhártya lebenye alatt dolgozó **LASIK** (Ioannis Pallikaris, 1990). Ma évente milliók szabadulnak meg így a szemüvegtől.' }
    ],
    quiz: [
      { q: 'Melyik rész adja a szem fénytörő erejének nagyobb részét?', options: ['A szaruhártya', 'A szemlencse', 'Az üvegtest', 'A pupilla'], answer: 0, explain: 'A szaruhártya kb. 43 dioptriát ad a kb. 60-ból; a lencse a kisebb részt, de ez állítható.' },
      { q: 'Mi történik közelre nézéskor?', options: ['A sugárizom összehúzódik, és a lencse domborúbb lesz', 'A sugárizom elernyed, és a lencse laposabb lesz', 'A pupilla kitágul', 'A retina előrébb mozdul'], answer: 0, explain: 'Összehúzódó sugárizom → elernyedő Zinn-rostok → a rugalmas lencse domborúbbá válik, erősebben töri a fényt.' },
      { q: 'Milyen kép keletkezik a retinán?', options: ['Fordított, kicsinyített, valódi kép', 'Egyenes állású, nagyított kép', 'Egyenes állású, kicsinyített látszólagos kép', 'Nem keletkezik kép, csak fényfoltok'], answer: 0, explain: 'A szem gyűjtőlencse-rendszere fordított valódi képet vetít; az agy értelmezi „helyesen”.' },
      { q: 'Miért van a szemünkben vakfolt?', options: ['Mert ahol a látóideg kilép, ott nincsenek fényérzékelő sejtek', 'Mert ott van a legtöbb csap', 'Mert a szemlencse ott átlátszatlan', 'Mert ott tapadnak a szemizmok'], answer: 0, explain: 'A látóidegfőben a rostok hagyják el a szemet, ott nincs csap és pálcika.' },
      { q: 'Milyen lencse javítja a rövidlátást?', options: ['Szórólencse (negatív dioptria)', 'Gyűjtőlencse (pozitív dioptria)', 'Síküveg', 'Prizma'], answer: 0, explain: 'A rövidlátó szemben a kép a retina előtt keletkezik; a szórólencse hátrébb, a retinára tolja.' }
    ]
  });
})();
