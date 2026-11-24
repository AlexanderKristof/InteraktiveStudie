/* Modell: az emberi szív – sematikus elölnézeti metszet a négy üreggel, a billentyűkkel,
 * a nagyerekkel, a koszorúerekkel és az ingerképző–ingerületvezető rendszerrel.
 * A test jobb oldala a rajz BAL oldalán van (mintha szemben állnánk valakivel). */
(function () {
  var NS = ' pointer-events="none"';
  var BLUE = ['#7fa3ea', '#3d62b3', '#25407e'], RED = ['#f2868a', '#d23a43', '#86161d'];
  var WALL = '#cf7266', WALL_D = '#7b2c27';

  function vessel(d, col, w) {
    return '<path d="' + d + '" fill="none" stroke="' + col[2] + '" stroke-width="' + (w + 4) + '" stroke-linecap="butt" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + col[1] + '" stroke-width="' + w + '" stroke-linecap="butt" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + col[0] + '" stroke-width="' + (w * 0.28).toFixed(1) + '" stroke-linecap="round" stroke-linejoin="round" opacity=".55"' + NS + '/>';
  }
  function chamber(outer, cavity, grad) {
    return '<path d="' + outer + '" fill="' + WALL + '" stroke="' + WALL_D + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="' + cavity + '" fill="url(#' + grad + ')" stroke="' + WALL_D + '" stroke-width="1" stroke-opacity=".6"/>';
  }
  function arrow(x1, y1, x2, y2) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7;
    return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' M' + (x2 - h * Math.cos(a - 0.5)).toFixed(1) + ' ' + (y2 - h * Math.sin(a - 0.5)).toFixed(1) +
      ' L' + x2 + ' ' + y2 + ' L' + (x2 - h * Math.cos(a + 0.5)).toFixed(1) + ' ' + (y2 - h * Math.sin(a + 0.5)).toFixed(1) +
      '" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"' + NS + '/>';
  }
  function txt(x, y, s, cls, extra) {
    return '<text class="' + cls + '" x="' + x + '" y="' + y + '"' + (extra || '') + '>' + s + '</text>';
  }

  var defs = '<defs>' +
    '<linearGradient id="sz-blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + BLUE[0] + '"/><stop offset="1" stop-color="' + BLUE[1] + '"/></linearGradient>' +
    '<linearGradient id="sz-red" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + RED[0] + '"/><stop offset="1" stop-color="' + RED[1] + '"/></linearGradient>' +
    '<linearGradient id="sz-sept" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b85a50"/><stop offset=".5" stop-color="#d98074"/><stop offset="1" stop-color="#b85a50"/></linearGradient>' +
    '</defs>';

  /* Háttér: jelmagyarázat és egy EKG-görbe */
  var ekg = 'M474 524 L488 524 C492 524 493 515 498 515 C503 515 504 524 508 524 L516 524 L519 528 L524 494 L529 534 L532 524 L544 524 C550 524 552 511 559 511 C566 511 568 524 574 524 L588 524';
  var backdrop = defs +
    txt(14, 22, 'Az emberi szív – elölnézet, metszet', 'lbl', ' font-size="15"') +
    '<circle cx="22" cy="39" r="6" fill="url(#sz-red)" stroke="' + RED[2] + '"/>' + txt(34, 43, 'oxigéndús vér', 'lbl-muted') +
    '<circle cx="22" cy="56" r="6" fill="url(#sz-blue)" stroke="' + BLUE[2] + '"/>' + txt(34, 60, 'oxigénszegény vér', 'lbl-muted') +
    txt(14, 78, 'a test jobb oldala = a rajz bal oldala', 'lbl-muted', ' font-size="11"') +
    '<rect x="466" y="474" width="128" height="78" rx="10" fill="rgba(127,141,176,.12)" stroke="#7f8db0" stroke-width="1"/>' +
    txt(530, 490, 'EKG: egy szívverés', 'lbl-muted', ' text-anchor="middle" font-size="11"') +
    '<path d="' + ekg + '" fill="none" stroke="#2fa36b" stroke-width="2" stroke-linejoin="round"/>' +
    txt(498, 508, 'P', 'lbl-muted', ' text-anchor="middle" font-size="10" font-weight="700"') +
    txt(524, 547, 'QRS', 'lbl-muted', ' text-anchor="middle" font-size="10" font-weight="700"') +
    txt(559, 505, 'T', 'lbl-muted', ' text-anchor="middle" font-size="10" font-weight="700"');

  /* Üregek */
  var ra = chamber('M140 262 C138 214 168 196 210 196 C232 196 250 202 260 214 C258 192 280 182 286 198 C290 212 276 220 268 222 L270 316 C240 326 190 326 160 314 C146 302 141 284 140 262 Z',
    'M152 262 C151 222 176 208 210 208 C230 208 246 214 254 226 L258 306 C232 314 192 314 168 304 C157 294 152 280 152 262 Z', 'sz-blue') + arrow(200, 236, 214, 290);
  var la = chamber('M340 236 C344 206 372 196 402 196 C434 196 458 206 462 236 L462 316 C430 326 372 326 340 316 Z',
    'M352 240 C356 216 376 208 402 208 C428 208 446 216 450 240 L450 306 C424 314 372 314 352 306 Z', 'sz-red') + arrow(410, 236, 396, 290);
  var rv = chamber('M160 330 L296 330 L306 476 C294 492 272 496 250 482 C200 450 164 400 160 330 Z',
    'M172 340 L288 340 L297 462 C286 474 268 476 254 466 C212 438 177 393 172 340 Z', 'sz-blue') + arrow(226, 432, 268, 360);
  var lv = chamber('M318 330 L452 330 C470 360 468 420 432 462 C404 494 362 512 336 506 C330 500 328 492 328 480 Z',
    'M334 346 L436 346 C450 372 446 420 418 452 C396 476 366 490 348 488 C342 480 341 470 341 462 Z', 'sz-red') + arrow(392, 456, 340, 366);
  var sept = '<path d="M296 330 L318 330 L328 480 C322 490 312 490 306 476 Z" fill="url(#sz-sept)" stroke="' + WALL_D + '" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M302 350 L322 360 M303 380 L323 390 M304 410 L325 420 M305 440 L326 450" stroke="' + WALL_D + '" stroke-width=".8" opacity=".45"/>';

  /* Billentyűk */
  var CREAM = ' fill="#f4e7c8" stroke="#8c6f3f" stroke-width="1.2" stroke-linejoin="round"';
  function cords(pts, pap) {
    var s = '';
    pts.forEach(function (p) { s += '<path d="M' + p[0] + ' ' + p[1] + ' L' + pap[0] + ' ' + pap[1] + '" stroke="#efe2c4" stroke-width="1" opacity=".9"/>'; });
    return s + '<path d="M' + (pap[0] - 8) + ' ' + (pap[1] + 14) + ' Q' + pap[0] + ' ' + (pap[1] - 8) + ' ' + (pap[0] + 8) + ' ' + (pap[1] + 14) + ' Z" fill="#b8544a" stroke="' + WALL_D + '" stroke-width="1"/>';
  }
  var av = cords([[214, 368], [238, 374]], [220, 414]) + cords([[258, 364]], [262, 418]) +
    '<path d="M200 328 Q204 352 214 368 Q222 350 228 330 Z"' + CREAM + '/>' +
    '<path d="M228 330 Q232 356 238 374 Q246 354 250 330 Z"' + CREAM + '/>' +
    '<path d="M250 330 Q254 350 258 364 Q264 348 268 328 Z"' + CREAM + '/>' +
    cords([[370, 372]], [372, 426]) + cords([[404, 368]], [410, 420]) +
    '<path d="M352 328 Q358 354 370 372 Q378 352 386 330 Z"' + CREAM + '/>' +
    '<path d="M388 330 Q394 352 404 368 Q414 350 422 328 Z"' + CREAM + '/>';

  function cups(x0, y, n, w) {
    var s = '';
    for (var i = 0; i < n; i++) {
      var x = x0 + i * w;
      s += '<path d="M' + x + ' ' + y + ' Q' + (x + w / 2) + ' ' + (y + 13) + ' ' + (x + w) + ' ' + y + ' L' + (x + w - 2) + ' ' + (y - 3) + ' Q' + (x + w / 2) + ' ' + (y + 6) + ' ' + (x + 2) + ' ' + (y - 3) + ' Z"' + CREAM + '/>';
    }
    return s;
  }
  var semi = cups(262, 316, 3, 10) + cups(302, 314, 3, 11.3);

  /* Nagyerek */
  var aorta = vessel('M318 346 L318 140 C318 62 432 58 432 130 L432 300', RED, 34) +
    vessel('M352 72 L346 22', RED, 13) + vessel('M382 66 L382 20', RED, 11) + vessel('M408 72 L418 24', RED, 11);
  var trunk = vessel('M276 340 C274 292 282 262 310 238 C334 218 352 200 368 190', BLUE, 32) +
    vessel('M362 192 C400 176 444 172 520 176', BLUE, 22) +
    vessel('M368 190 L335 190', BLUE, 20) + vessel('M300 190 L228 190', BLUE, 20) + vessel('M197 192 L116 200', BLUE, 20);
  var cavae = vessel('M212 120 L212 206', BLUE, 30) + vessel('M158 296 L158 546', BLUE, 32) +
    txt(212, 112, 'felső', 'lbl-muted', ' text-anchor="middle" font-size="10"' + NS) +
    txt(122, 540, 'alsó', 'lbl-muted', ' text-anchor="middle" font-size="10"' + NS);
  var pvein = vessel('M455 232 L536 214', RED, 14) + vessel('M458 254 L540 248', RED, 14) +
    vessel('M458 282 L540 288', RED, 14) + vessel('M455 302 L534 324', RED, 14);

  /* Koszorúerek */
  function cor(d, w) {
    return '<path d="' + d + '" fill="none" stroke="#5c0d13" stroke-width="' + (w + 3) + '" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="#ff5a62" stroke-width="' + w + '" stroke-linecap="round"/>';
  }
  var coron = cor('M302 320 C282 330 232 330 192 330 C168 332 158 352 162 382 C168 420 198 456 240 478', 4) +
    cor('M334 320 L348 326', 4.5) +
    cor('M348 326 C330 370 316 430 322 498', 4) +
    cor('M348 326 C392 334 440 330 456 346 C472 372 468 408 452 432', 3.6) +
    cor('M328 380 C350 392 372 392 390 388 M326 430 C348 444 370 446 386 444 M462 380 C448 392 440 404 436 418', 2.2) +
    cor('M168 390 C190 392 210 398 226 410 M182 432 C204 432 222 438 236 448', 2);

  /* Ingerképző és ingerületvezető rendszer */
  var Y = '#f6c625', YD = '#7a5a00';
  function cond(d, w, dash) {
    return '<path d="' + d + '" fill="none" stroke="' + YD + '" stroke-width="' + (w + 2.4) + '" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
      '<path d="' + d + '" fill="none" stroke="' + Y + '" stroke-width="' + w + '" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  var condSys = cond('M228 222 C220 250 230 280 250 300 M230 222 C250 240 258 270 252 300', 1.6, '4 4') +
    cond('M252 302 C270 312 290 322 304 336', 3.4) +
    cond('M304 336 L302 470 C300 484 288 486 272 478 C240 460 200 420 186 360', 2.4) +
    cond('M308 336 L322 470 C326 494 350 498 380 486 C420 466 446 420 446 360', 2.4) +
    cond('M212 412 L232 400 M250 456 L262 438 M354 494 L362 470 M414 466 L410 444 M436 410 L420 404', 1.4) +
    '<ellipse cx="228" cy="218" rx="10" ry="7" fill="' + Y + '" stroke="' + YD + '" stroke-width="1.6"/>' +
    '<ellipse cx="252" cy="302" rx="9" ry="6.5" fill="' + Y + '" stroke="' + YD + '" stroke-width="1.6"/>' +
    txt(236, 204, 'SA', 'lbl', ' font-size="10"' + NS) + txt(226, 312, 'AV', 'lbl', ' font-size="10"' + NS);

  STUDIE.addModel({
    id: 'sziv',
    title: 'Az emberi szív',
    icon: '❤️',
    color: '#e5484d',
    category: 'Biológia',
    keywords: 'szív szívizom pitvar kamra sövény billentyű vitorlás zsebes tricuspidalis mitralis aorta tüdőartéria truncus pulmonalis üres visszér tüdővéna koszorúér szinuszcsomó AV-csomó His-köteg Purkinje EKG szívciklus systole diastole vérkeringés Harvey Einthoven Barnard szívátültetés',
    summary: 'Ökölnyi izmos pumpa, amely egy élet alatt kb. 2,5–3 milliárdszor húzódik össze, és percenként kb. 5 liter vért hajt körbe.',
    scale: 'kb. 12 × 9 × 6 cm, kb. 250–350 g (nagyjából egy ökölnyi)',
    viewBox: '0 0 600 560',
    backdrop: backdrop,
    intro: 'A szív valójában **két pumpa egymás mellett**. A **jobb szívfél** (a rajz bal oldalán, kék) a testből visszaérkező, oxigénszegény vért a **tüdőbe** pumpálja (kis vérkör). A **bal szívfél** (piros) a tüdőből érkező, oxigéndús vért az egész **testbe** hajtja (nagy vérkör). Mindkét oldalon egy **pitvar** fogadja a vért, és egy erősebb **kamra** pumpálja tovább. A **billentyűk** szelepként biztosítják, hogy a vér csak egy irányba áramoljon.\n\nLent egy **szívverés** lépéseit követheted, az EKG-görbével együtt. A **Szétszedés** gombbal széthúzhatod az üregeket és az ereket.',
    parts: [
      {
        id: 'jp', z: 3, name: 'Jobb pitvar', svg: ra, explode: [-46, -14], badge: [184, 262], en: 'right atrium', latin: 'atrium dextrum',
        what: 'A szív jobb felső ürege. Ide érkezik a testből visszatérő, **oxigénszegény** vér a felső és az alsó üres visszéren, valamint a szív saját vénás vére a koszorús öblön át. A falában van a **szinuszcsomó**, a szív természetes „karmestere”. A pitvar kifelé egy kis zsákszerű nyúlványban, a **fülcsében** folytatódik.',
        madeOf: 'Vékony, kb. 2 mm-es **szívizomfalból**, amelyet belülről sima hártya (**endocardium**), kívülről a szívburok belső lemeze (**epicardium**) borít. A fülcsében az izom bordázott (fésűs izmok).',
        how: 'Az embrióban a szív kezdetben egyetlen **egyenes cső**, amely a 3. héten már ver. A 4. héttől ez a cső S alakban **meghajlik**, és a pitvari rész a kamrai rész fölé és mögé kerül. Később válaszfalak osztják jobb és bal pitvarra, de a falukban egy nyílás (**ovális ablak**) születésig nyitva marad, mert a magzat még nem a tüdejével lélegzik. Működés: a kamrák elernyedésekor a vér **passzívan** átfolyik rajta a jobb kamrába, a végén pedig a pitvar összehúzódása még kb. 20%-ot „ráprésel”.',
        uni: 'A jobb pitvari nyomás (≈ centrális vénás nyomás, CVP) normálisan 2–6 Hgmm; görbéjén az **a-hullám** (pitvari systole), a **c-hullám** (a tricuspidalis billentyű pitvar felé domborodása) és a **v-hullám** (telődés zárt billentyű mellett) látható, ezek a nyaki vénán is megfigyelhetők. A pitvari falfeszülés **ANP**-t (pitvari natriuretikus peptidet) szabadít fel, amely nátrium- és vízürítést, értágulatot okoz: a szív így **endokrin szerv** is. A pitvarfibrilláció (rendezetlen pitvari aktivitás) során elmarad a pitvari „ráhúzás”, és a pangó vérben, főleg a bal fülcsében, vérrög képződhet (stroke-kockázat).',
        fact: 'Az ovális ablak születés után általában bezáródik, de kb. minden negyedik embernél egy apró rés megmarad (nyitott foramen ovale). Ez legtöbbször nem okoz panaszt.'
      },
      {
        id: 'jk', z: 3, name: 'Jobb kamra', svg: rv, explode: [-40, 22], badge: [214, 384], en: 'right ventricle', latin: 'ventriculus dexter',
        what: 'A jobb pitvar alatti, előre néző kamra. A **tüdőartérián** át a **tüdőbe** pumpálja az oxigénszegény vért, ahol az leadja a szén-dioxidot és oxigént vesz fel. Mivel a tüdő közel van, és az erei tágak, ehhez **kis nyomás** is elég: a jobb kamra fala ezért vékonyabb, mint a balé.',
        madeOf: 'Kb. 3–5 mm vastag **szívizomfalból**. Belső felszínét izomgerendák (trabeculák) teszik egyenetlenné, és innen erednek a **szemölcsizmok** is, amelyekhez inak (ínhúrok) kötik a vitorlás billentyű lemezeit.',
        how: 'Az embrionális szívcső kamrai részéből és a kiáramlási pályából alakul ki; a két kamrát az 5–8. héten növő **kamrai sövény** választja szét. Magzatkorban a jobb kamra legalább annyi munkát végez, mint a bal (a tüdő helyett a vér nagy része a nyitott Botallo-vezetéken át az aortába jut). Születés után a tüdőerek ellenállása hirtelen leesik, és a jobb kamra fala relatíve elvékonyodik.',
        uni: 'Jobb kamrai nyomás: systoléban kb. 25 Hgmm, diastoléban 0–8 Hgmm (a bal kamrának kb. ötöde). Összehúzódása részben „perisztaltikus” (a beáramlási pályától a kiáramlási pálya felé), és nagy részét a szabad fal hosszanti rövidülése és a sövény adja. Mivel nagy a **compliance**-e és kicsi az utóterhelés-tűrése, akut tüdőembóliában (hirtelen nő a tüdőerek ellenállása) gyorsan kitágul és elégtelenné válik (akut **cor pulmonale**).',
        fact: 'Bár a két kamra eltérő erővel dolgozik, **pontosan ugyanannyi** vért pumpálnak percenként, különben a vér az egyik körben felhalmozódna.'
      },
      {
        id: 'bp', z: 3, name: 'Bal pitvar', svg: la, explode: [46, -18], badge: [402, 262], en: 'left atrium', latin: 'atrium sinistrum',
        what: 'A szív bal felső ürege, valójában a szív **leghátsó** része (a rajz egyszerűsít). Ide érkezik a **tüdővénákon** át a tüdőből az **oxigéndús** vér, és innen jut a mitralis billentyűn át a bal kamrába.',
        madeOf: 'Vékony, kb. 2–3 mm-es **szívizomfalból**, belül sima felszínnel; csak a fülcséje bordázott. Közvetlenül a nyelőcső előtt fekszik.',
        how: 'Fejlődéskor a tüdővénák törzse **beépül** a bal pitvar falába: ezért ér be ma négy külön véna. A pitvarokat két, egymásra boruló válaszfal (septum primum és secundum) választja szét, a köztük maradt ovális ablak születéskor a bal pitvari nyomás növekedése miatt „becsukódik”, mint egy lengőajtó. Működése ugyanolyan, mint a jobb pitvaré: tároló, átvezető és rásegítő pumpa.',
        uni: 'A bal pitvari nyomás (6–12 Hgmm) a **tüdőkapilláris éknyomással** (PCWP) becsülhető Swan–Ganz-katéterrel. Mitralis szűkület vagy bal kamrai elégtelenség esetén nő, és tüdőpangást (fulladást) okoz. A tüdővénák torkolatánál lévő szívizom-hüvelyekből indulnak ki a pitvarfibrillációt kiváltó extraszisztolék: ezért **pulmonális vénaizolációval** (katéteres abláció) kezelik.',
        fact: 'Mivel a bal pitvar közvetlenül a nyelőcső előtt van, a nyelőcsövön át is meg lehet ultrahanggal vizsgálni (TEE).'
      },
      {
        id: 'bk', terms: ['anatomia/percterfogat', 'anatomia/vernyomas'], z: 3, name: 'Bal kamra', svg: lv, explode: [36, 16], badge: [398, 410], en: 'left ventricle', latin: 'ventriculus sinister',
        what: 'A szív **legerősebb** ürege, ez alkotja a **szívcsúcsot**. Az aortán át az **egész testbe** pumpálja az oxigéndús vért, ezért nagy nyomást kell létrehoznia (nyugalomban kb. 120 Hgmm-t). Egy összehúzódással kb. **70 ml** vért lök ki (verőtérfogat), percenként kb. 5 litert.',
        madeOf: '10–12 mm vastag **szívizomfalból**, kb. háromszor vastagabbal, mint a jobb kamráé. Az izomrostok spirálisan, több rétegben futnak, ezért összehúzódáskor a kamra egyszerre **rövidül, szűkül és csavarodik**, mint egy kicsavart törölköző.',
        how: 'A szívcső kamrai részének bal oldalából fejlődik. Születés után, amikor a teljes nagy vérkört egyedül kell ellátnia, a fala gyorsan megvastagszik. Felnőttkorban a szívizomsejtek már alig osztódnak: a szív edzésre vagy magas vérnyomásra a sejtek **megnagyobbodásával** (hipertrófia) válaszol. Az elhalt izomsejteket (pl. szívinfarktus után) **heg** pótolja.',
        uni: 'A **Frank–Starling-mechanizmus**: minél jobban megtelik a kamra a diastole végére (előterhelés, végdiastolés térfogat ≈ 120 ml), annál nagyobb erővel húzódik össze, mert a megnyúlt szarkomerekben optimálisabb az aktin–miozin átfedés és nő a troponin C Ca²⁺-érzékenysége. Így a szív automatikusan annyit pumpál ki, amennyi beérkezik. Ejekciós frakció: EF = SV / EDV ≈ 55–70%. A falfeszülés a **Laplace-törvény** szerint T ∝ p · r / (2h): a fal megvastagodása (h↑) csökkenti a feszülést – ez a nyomásterhelés okozta koncentrikus hipertrófia „célja”. A kamra nyomás–térfogat hurka (PV-loop) területe a külső munka (stroke work).',
        fact: 'Nyugalomban a bal kamra teljesítménye kb. **1,3 watt**: egy élet alatt annyi munkát végez, amennyi kb. 40 tonna (egy megrakott kamion) feljuttatásához kellene a Mount Everest tetejére.'
      },
      {
        id: 'sovey', z: 4, name: 'Kamrai sövény', svg: sept, explode: [0, 22], badge: [313, 360], en: 'interventricular septum', latin: 'septum interventriculare',
        what: 'A két kamrát elválasztó izmos fal. Megakadályozza, hogy az oxigénszegény és az oxigéndús vér keveredjen, és **mindkét kamra** összehúzódásában részt vesz. Benne fut az ingerületvezető rendszer **His-kötege** és két szára.',
        madeOf: 'Nagyobb részben vastag **szívizomból** (izmos rész), a tetején egy kis területen vékony, **kötőszövetes hártyából** (hártyás rész), a billentyűk közelében.',
        how: 'Az embrióban a 4–8. hét között alakul ki: alulról az izmos sövény nő felfelé, felülről pedig a kiáramlási pályát kettéosztó, spirálisan csavarodó **aortopulmonális sövény** nő le hozzá; a kettő a hártyás résznél forr össze. Ha ez nem sikerül tökéletesen, **kamrai sövényhiány** (VSD) marad: ez a leggyakoribb veleszületett szívhiba.',
        uni: 'A sövény funkcionálisan főleg a **bal kamrához** tartozik: systoléban a bal kamra felé mozdul, és a jobb kamrai ejekciónak is kb. harmadát adja (ventricularis interdependencia). Ha a jobb kamra nyomás- vagy térfogat-túlterhelt, a sövény a bal kamra felé lapul („D-alakú” bal kamra az ultrahangon). A VSD-n át balról jobbra irányuló sönt keletkezik (Qp/Qs > 1); tartós fennállás esetén a tüdőerek átépülnek, a sönt megfordulhat (Eisenmenger-szindróma).',
        fact: 'A kamrai sövényhiány kb. 1000 újszülöttből 2–3-nál fordul elő; a kis nyílások gyakran maguktól bezáródnak.'
      },
      {
        id: 'vitorlas', terms: ['anatomia/sziv-ciklus'], z: 5, name: 'Vitorlás billentyűk', svg: av, explode: [0, 4], badge: [372, 392], en: 'atrioventricular valves: tricuspid & mitral (bicuspid) valve', latin: 'valva atrioventricularis (tricuspidalis / mitralis)',
        what: 'A pitvarok és a kamrák közti **egyirányú szelepek**. A jobb oldali **háromhegyű (tricuspidalis)**, a bal oldali **kéthegyű (mitralis)** billentyű. Amikor a kamra elernyed, a lemezek lefelé nyílnak, és a vér beáramlik; amikor a kamra összehúzódik, a vér nyomása **becsapja** őket, így a vér nem folyhat vissza a pitvarba. A becsapódásuk adja az **első szívhangot**.',
        madeOf: 'Vékony, erős **kötőszöveti lemezekből** (vitorlákból), amelyeket endocardium borít. A lemezek szélét **ínhúrok** kötik a kamrafalból kiálló **szemölcsizmokhoz**, mint az ejtőernyő zsinórjai: ezek akadályozzák meg, hogy a vitorlák a pitvar felé „kifordulhassanak”.',
        how: 'A pitvar–kamrai nyílás körüli **endocardiális párnákból** fejlődnek, az 5–8. héten: a párnák szövete elvékonyodik, a kamrafal izomgerendái pedig ínhúrokká és szemölcsizmokká alakulnak. Működésük teljesen **passzív**: csak a két oldaluk közti nyomáskülönbség nyitja és zárja őket, idegek vagy izmok nem mozgatják.',
        uni: 'A mitralis billentyű nyílásfelülete normálisan 4–6 cm²; 1,5 cm² alatt jelentős szűkületről (stenosis) beszélünk, amikor a pitvar–kamrai nyomásgrádiens nő. A zárás minőségét a vitorlák **koaptációs zónája** adja. A szemölcsizmok systoléban összehúzódva feszesen tartják az ínhúrokat; ha egy szemölcsizom infarktus miatt elszakad, akut mitralis elégtelenség alakul ki. A szívhangok fonokardiográfiával mérhetők: S1 (AV-billentyűk záródása) a systole, S2 (zsebes billentyűk záródása) a diastole kezdetét jelzi.',
        fact: 'A „mitralis” név onnan ered, hogy a két vitorla egy püspöksüvegre (mitra) emlékeztette a régi anatómusokat.'
      },
      {
        id: 'zsebes', terms: ['anatomia/sziv-ciklus'], z: 5, name: 'Zsebes billentyűk', svg: semi, explode: [0, -4], badge: [318, 300], en: 'semilunar valves: pulmonary & aortic valve', latin: 'valvae semilunares (valva trunci pulmonalis, valva aortae)',
        what: 'A kamrák kiáramlási nyílásainál ülő szelepek: a **tüdőartéria** kezdeténél a **pulmonalis**, az **aorta** kezdeténél az **aortabillentyű**. Mindkettő **három** félhold alakú „zsebből” áll. Kamrai összehúzódáskor a vér a falhoz nyomja őket, és kiáramlik; utána a visszafelé induló vér **megtölti a zsebeket**, azok összezárnak. Ez adja a **második szívhangot**.',
        madeOf: 'Vékony, rugalmas **kötőszöveti** lemezekből, endocardiummal borítva. Nincsenek ínhúrjaik: a zsebek alakja önmagában biztosítja a zárást.',
        how: 'A kiáramlási pálya (truncus arteriosus) falának párnáiból alakulnak ki, ugyanakkor, amikor a közös kiáramlási csövet a spirális sövény **aortára és tüdőartériára** osztja. Működésük passzív, a nyomáskülönbség nyitja és zárja őket.',
        uni: 'Az aortabillentyű nyílása normálisan 3–4 cm²; idős korban a meszesedés miatt szűkülhet (aortastenosis), ilyenkor a bal kamrának nagyobb nyomással kell dolgoznia (systolés grádiens, koncentrikus hipertrófia). Az aortabillentyű zsebei mögötti tágulatokból (**Valsalva-szinuszok**) erednek a **koszorúerek**: diastoléban a zárt billentyű mögötti nyomás tölti meg őket. A súlyos szűkületet ma gyakran katéteres billentyűbeültetéssel (**TAVI**) kezelik, a mellkas megnyitása nélkül.',
        fact: 'A zsebes billentyűk egy élet alatt több mint **2,5 milliárdszor** nyílnak és zárnak.'
      },
      {
        id: 'aorta', z: 1, name: 'Aorta (főverőér)', svg: aorta, explode: [14, -14], badge: [376, 90], en: 'aorta (ascending aorta, aortic arch, descending aorta)', latin: 'aorta (pars ascendens, arcus aortae, pars descendens)',
        what: 'A test **legnagyobb artériája** (kb. 2,5–3 cm átmérőjű). A bal kamrából indul felfelé, **ívben** hátra és balra kanyarodik (aortaív), majd a gerinc előtt lefelé halad. Az ívből erednek a fejet és a karokat ellátó nagy erek, a kezdetéből pedig a szívet ellátó **koszorúerek**.',
        madeOf: 'Háromrétegű falból: belül sima **endothel**, középen vastag, **rugalmas rostokban** gazdag réteg simaizommal, kívül kötőszövet. A rugalmas rostok miatt a fala rugalmas, mint egy gumicső.',
        how: 'Az embrióban a kiáramlási pálya kettéválásából, valamint a kezdetben szimmetrikusan elhelyezkedő **garatívartériák** átalakulásából jön létre; ezek közül a bal 4. ív lesz az aortaív. Működés: systoléban a fala **kitágul** és energiát tárol, diastoléban visszahúzódva továbbnyomja a vért (**szélkazán-hatás**), így a véráramlás a szívverések között sem áll le.',
        uni: 'A **szélkazán (Windkessel) modell**: az aorta compliance-e (C = ΔV/Δp) és a perifériás ellenállás (R) együtt határozza meg a diastolés nyomásesés időállandóját (τ = R·C). Idős korban a fal merevebb (C↓), ezért nő a pulzusnyomás és a pulzushullám terjedési sebessége (PWV, fiatalon kb. 5 m/s, idősen 10 m/s felett), a visszaverődő hullám pedig már systoléban visszaér, ami növeli a bal kamra utóterhelését. Az áramlás a felszálló aortában csúcsáramláskor közel turbulens (Re ≈ 4000).',
        fact: 'Egy átlagos ember aortáján naponta kb. **7000 liter** vér halad át.'
      },
      {
        id: 'truncus', z: 2, name: 'Tüdőartéria (truncus pulmonalis)', svg: trunk, explode: [-10, -16], badge: [312, 232], en: 'pulmonary trunk, pulmonary arteries', latin: 'truncus pulmonalis, arteriae pulmonales',
        what: 'A jobb kamrából induló nagy ér, amely az aorta előtt felfelé haladva **két ágra** (jobb és bal tüdőartériára) oszlik, és a tüdőbe viszi az **oxigénszegény** vért. Ez az egyetlen artéria (az ágaival együtt), amelyben oxigénszegény vér folyik: az artéria szó ugyanis azt jelenti, hogy az ér **a szívtől elvezet**, nem azt, hogy oxigéndús vér van benne.',
        madeOf: 'Az aortához hasonló, rugalmas falú artéria, de vékonyabb fallal, mert benne a nyomás kb. ötöde az aortáénak.',
        how: 'Az embrionális kiáramlási pálya kettéosztódásából jön létre, a két ág a 6. garatívartériából fejlődik. Magzatkorban a tüdőartéria és az aorta között egy összekötő ér, a **Botallo-vezeték** (ductus arteriosus) működik, amely a vért a még nem lélegző tüdő mellett elvezeti. Ez születés után néhány napon belül bezáródik.',
        uni: 'A kis vérkör nagy compliance-ű, kis ellenállású rendszer: a pulmonális vaszkuláris rezisztencia (PVR) a szisztémás kb. **tizede** (kb. 1–2 Wood-egység). Az átlagos pulmonális artériás nyomás normálisan kb. 15 Hgmm; 20 Hgmm felett **pulmonális hipertóniáról** beszélünk. Különlegesség a **hipoxiás pulmonális vazokonstrikció**: a rosszul szellőzött tüdőrészek erei összehúzódnak, így a vér a jól szellőzött területek felé terelődik (ventiláció–perfúzió illesztés).',
        fact: 'A vér egy teljes kis vérköri útja (jobb kamrától bal pitvarig) csak kb. **4–5 másodpercig** tart.'
      },
      {
        id: 'urestvisszer', z: 1, name: 'Felső és alsó üres visszér', svg: cavae, explode: [-46, 0], badge: [212, 150], en: 'superior & inferior vena cava', latin: 'vena cava superior et inferior',
        what: 'A két legnagyobb véna, amelyek a jobb pitvarba torkollnak. A **felső üres visszér** a fejből, a nyakból és a karokból, az **alsó üres visszér** a törzsből és a lábakból hozza vissza az **oxigénszegény** vért. Nincs a torkolatuknál valódi billentyű.',
        madeOf: 'Vékony, kevés izmot tartalmazó falból: a vénákban a nyomás alacsony (néhány Hgmm), ezért falukat nem kell erősnek lenniük, viszont **tágulékonyak**, és sok vért tudnak tárolni.',
        how: 'Az embrióban kezdetben szimmetrikusan, mindkét oldalon futó vénás törzsek (kardinális vénák) közül a **jobb oldaliak** maradnak meg és nagyobbodnak meg, a bal oldaliak nagyrészt visszafejlődnek. A vért a vénákban a belégzéskor kialakuló **szívóhatás**, a lábizmok összehúzódása („izompumpa”) és a vénabillentyűk segítik vissza a szív felé.',
        uni: 'A **vénás visszaáramlás** (venous return) a Guyton-modell szerint VR = (P_ms − P_RA) / R_v, ahol P_ms a középső szisztémás töltőnyomás (kb. 7 Hgmm), P_RA a jobb pitvari nyomás. A vénás rendszer tárolja a vértérfogat kb. **70%-át** (kapacitásérek): a szimpatikus venokonstrikció ebből „mobilizál” vért, ami Frank–Starling-mechanizmuson át növeli a perctérfogatot. Belégzéskor a mellűri nyomás csökken, a vénás beáramlás a jobb szívbe nő (ezért hasad fiziológiásan a második szívhang).',
        fact: 'Az alsó üres visszér a test legnagyobb átmérőjű vénája: kb. 2,5–3 cm.'
      },
      {
        id: 'tudoveak', z: 1, name: 'Tüdővénák', svg: pvein, explode: [56, -18], badge: [520, 268], en: 'pulmonary veins', latin: 'venae pulmonales',
        what: 'Általában **négy** ér (két-két mindkét tüdőből), amelyek a tüdőből a **bal pitvarba** hozzák vissza a vért. Ezek az egyetlen vénák, amelyekben **oxigéndús** vér folyik. (A rajzon egyszerűsítve mind a négy jobbról érkezik; a valóságban a jobb tüdővénák a szív mögött, a test jobb oldala felől futnak be.)',
        madeOf: 'Vékony falú vénák, a bal pitvari torkolatuknál a falukba **szívizom-hüvely** nyúlik be. Billentyűjük nincs.',
        how: 'Az embrióban a bal pitvar hátsó falából egyetlen közös tüdővéna nő a fejlődő tüdő felé. Ez elágazik, majd a törzse fokozatosan **beolvad** a bal pitvar falába, így végül négy külön nyílás marad. Ha ez rosszul sikerül, a tüdővénák rossz helyre (pl. a jobb pitvarba) torkollhatnak.',
        uni: 'A tüdővénás vér oxigénszaturációja kb. 98–100%, parciális O₂-nyomása kb. 100 Hgmm. Az artériás vér szaturációja ennél kicsit alacsonyabb (kb. 97%), mert a bronchiális és a koszorúér-keringés vénás vérének egy része (fiziológiás sönt) közvetlenül a bal szívbe ürül. A tüdővéna-torkolatok szívizom-hüvelyei kóros automáciára hajlamosak (pitvarfibrilláció gócai).',
        fact: 'Az artéria és a véna megkülönböztetése az áramlás irányán múlik: artéria = a szívből el, véna = a szívbe vissza. Ezért van oxigéndús vér a tüdővénákban.'
      },
      {
        id: 'koszorus', terms: ['anatomia/gazcsere'], z: 6, name: 'Koszorúerek', svg: coron, explode: [0, 0], badge: [176, 348], en: 'coronary arteries (RCA, LAD, LCx)', latin: 'arteriae coronariae (dextra et sinistra)',
        what: 'A szívizom **saját vérellátását** biztosító artériák, amelyek koszorúként veszik körül a szívet. Az aorta kezdetéből ered a **jobb** és a **bal koszorúér**. A bal hamar két ágra oszlik: az **elülső leszálló ág** a két kamra közti barázdában fut a szívcsúcs felé, a **körbefutó ág** pedig a bal pitvar és a bal kamra határán kerüli meg a szívet.',
        madeOf: 'Izmos falú artériák, kb. 3–4 mm-es átmérővel. A falukban kórosan **zsíros–meszes lerakódás** (érelmeszesedés, plakk) alakulhat ki, amely szűkíti őket.',
        how: 'Az embrióban a szív felszínén kialakuló érhálózatból fejlődnek, amely csak utólag kapcsolódik be az aortába. Különlegességük, hogy főleg **diastoléban** telnek meg: a szív összehúzódásakor az izom összenyomja a falában futó ereket. Ha egy koszorúér elzáródik (pl. vérrög a plakkon), az általa ellátott izomrész oxigén nélkül marad és elhal: ez a **szívinfarktus**.',
        uni: 'A szívizom nyugalomban is a koszorúér-vér oxigénjének kb. **70–75%-át** kivonja (a test többi szervének átlaga 25%), ezért fokozott igényt szinte csak az **áramlás** növelésével (akár 4–5-szörösére, koronáriarezerv) tud kielégíteni; ennek fő szabályozója a metabolikus értágulat (adenozin, NO, K_ATP-csatornák). A perfúziós nyomás ≈ aorta diastolés nyomás − bal kamrai végdiastolés nyomás, ezért a tachycardia (rövidebb diastole) rontja az ellátást. A szűkületek kezelése: katéteres **ballonos tágítás és stentbeültetés** (PCI) vagy **bypass-műtét** (CABG).',
        fact: 'A szív a test tömegének kb. 0,5%-a, de nyugalomban a perctérfogat kb. **5%-át** kapja a koszorúereken át.'
      },
      {
        id: 'inger', terms: ['anatomia/ekg', 'anatomia/akcios-potencial'], z: 7, name: 'Ingerképző és -vezető rendszer', svg: condSys, explode: [0, 0], badge: [238, 262], en: 'cardiac conduction system: SA node, AV node, bundle of His, bundle branches, Purkinje fibres', latin: 'complexus stimulans cordis (nodus sinuatrialis, nodus atrioventricularis, fasciculus atrioventricularis)',
        what: 'Különleges szívizomsejtek hálózata, amely **elindítja és összehangolja** a szívverést. A **szinuszcsomó** (SA) a jobb pitvar falában percenként kb. 60–80 ingerületet „gyárt”, ezek a pitvarokon át a **pitvar–kamrai (AV) csomóba** jutnak. Az AV-csomó kicsit **késleltet**, hogy a pitvarok előbb kiürülhessenek, majd a **His-köteg**, annak **két szára** és a **Purkinje-rostok** villámgyorsan szétviszik az ingerületet a kamrákban.',
        madeOf: 'Átalakult **szívizomsejtekből**, amelyek kevés összehúzódó fehérjét tartalmaznak, viszont képesek **maguktól** ingerületet keltani (automácia), illetve különösen gyorsan vezetik azt. Nem idegek! Az idegrendszer csak gyorsítja (szimpatikus) vagy lassítja (bolygóideg) a működésüket.',
        how: 'A szívcső már a 3–4. héten ritmusosan húzódik össze; a vezetőrendszer a 4–8. héten specializálódik ki a szívizomsejtekből, a kamrák és a sövény kialakulásával párhuzamosan. Működés: a szinuszcsomó sejtjeinek nyugalmi potenciálja **lassan magától emelkedik**, és ha eléri a küszöböt, akciós potenciál indul; az ingerület a sejtek közti réskapcsolatokon (gap junction) terjed sejtről sejtre. Ha a szinuszcsomó leáll, az AV-csomó (40–60/perc) vagy a kamrai rostok (20–40/perc) veszik át a ritmust, illetve **pacemaker** pótolhatja.',
        uni: 'A szinuszcsomó sejtjeinek **pacemaker-potenciálját** az HCN-csatornákon át folyó „funny” áram (**I_f**, Na⁺-beáramlás hiperpolarizációra), majd a T- és L-típusú Ca²⁺-csatornák hozzák létre; a felszálló szár Ca²⁺-függő (lassú). A munkaizomzat akciós potenciálja ezzel szemben gyors Na⁺-beáramlással indul (0. fázis), majd a **plató** (2. fázis, L-típusú Ca²⁺-be / K⁺-ki egyensúly) kb. 200–300 ms-ig tart – emiatt a szívizom nem tetanizálható. Vezetési sebességek: AV-csomó kb. 0,05 m/s (a PQ-idő ≈ 120–200 ms nagy része), Purkinje-rostok 2–4 m/s. A szimpatikus β₁-hatás a cAMP-n át az I_f-et növeli (pozitív kronotrópia), a vagus az acetilkolin–M₂-receptor–I_K,ACh úton lassít.',
        fact: 'A szív a testből kivéve, megfelelő oldatban még órákig tovább ver: az ütemet saját maga adja, nem az agy.'
      }
    ],
    uni: {
      text: 'A szív egyetemi szemmel **két sorba kapcsolt, ritmikusan működő nyomáspumpa**, amelynek teljesítményét a telődés, a kontraktilitás és az utóterhelés együtt szabja meg.\n\n**Szívciklus:** a kamrai systole az **izovolumetriás kontrakcióval** kezdődik (mind a négy billentyű zárt, a nyomás meredeken nő), majd a zsebes billentyűk nyitásával az **ejekció** következik. A diastole **izovolumetriás relaxációval** indul, a vitorlás billentyűk nyitása után gyors, majd lassú telődés és végül a pitvari systole jön. A folyamatot a kamrai **nyomás–térfogat hurok** szemlélteti, amelynek területe a szív verésenkénti külső munkája.\n\n**Frank–Starling-mechanizmus:** a nagyobb végdiastolés térfogat jobban megnyújtja a szarkomereket, ami az aktin–miozin átfedés optimalizálásával és a troponin C Ca²⁺-érzékenységének növekedésével nagyobb verőtérfogatot eredményez. Így a két kamra kimenete ütésről ütésre kiegyenlítődik.\n\n**Ingerületvezetés:** a szinuszcsomó pacemaker-sejtjei (I_f áram, T- és L-típusú Ca²⁺-csatornák) spontán depolarizálódnak; az ingerület a pitvarokon át az AV-csomóba jut, ahol kb. 0,1 s-ot késik (a pitvarok így a kamrák előtt húzódnak össze), majd a His-köteg, a Tawara-szárak és a Purkinje-rostok gyorsan szétterítik a kamrákban. Ezt követi az EKG P-hulláma, QRS-komplexuma és T-hulláma.\n\n**Perctérfogat:** `CO = HR · SV`, nyugalomban kb. 70/min · 70 ml ≈ 5 l/min; a verőtérfogatot az előterhelés, a kontraktilitás (szimpatikus β₁-hatás) és az utóterhelés határozza meg, az ejekciós frakció `EF = SV / EDV` normálisan 55–70%.',
      terms: ['anatomia/sziv-ciklus', 'anatomia/percterfogat', 'anatomia/vernyomas', 'anatomia/ekg', 'anatomia/akcios-potencial', 'anatomia/szarkomer', 'anatomia/izomosszehuzodas', 'anatomia/gazcsere']
    },
    steps: [
      { icon: '😌', title: 'Elernyedés és telődés (diastole)', when: 'kb. 0,5 s nyugalomban', text: 'A kamrák elernyedtek. A **vitorlás billentyűk nyitva** vannak, a zsebesek zárva. A testből a vér az **üres visszereken** át a jobb pitvarba, a tüdőből a **tüdővénákon** át a bal pitvarba folyik, és onnan **passzívan** tovább a kamrákba: a kamrák kb. 80%-ig megtelnek, mielőtt a pitvarok egyáltalán összehúzódnának. Ilyenkor kapják vérüket a **koszorúerek** is.', parts: ['urestvisszer', 'tudoveak', 'jp', 'bp', 'vitorlas', 'koszorus'] },
      { icon: '⚡', title: 'A szinuszcsomó „tüzel” – P hullám', text: 'A **szinuszcsomó** sejtjeinek feszültsége magától eléri a küszöböt: ingerület indul, és kb. 0,1 s alatt szétterjed **mindkét pitvaron**. Az EKG-n ez a kis **P hullám**.', parts: ['inger', 'jp', 'bp'] },
      { icon: '🫸', title: 'Pitvari összehúzódás (pitvari systole)', text: 'A pitvarok összehúzódnak, és a még bennük lévő vért (a kamrai töltés kb. **20%-át**) „rápréselik” a kamrákra. Ezután a kamrák a lehető legjobban megteltek: ez a **végdiastolés térfogat** (kb. 120 ml kamránként).', parts: ['jp', 'bp', 'vitorlas'] },
      { icon: '⏳', title: 'Késleltetés az AV-csomóban', text: 'Az ingerület a pitvarokból csak egyetlen „kapun”, az **AV-csomón** jut át a kamrákba, és ott kb. **0,1 másodpercig** késik. Így a kamrák csak akkor kezdenek összehúzódni, amikor a pitvarok már kiürültek. Az EKG-n ez a P hullám utáni **egyenes szakasz** (PQ-szakasz).', parts: ['inger'] },
      { icon: '🔀', title: 'Kamrai ingerület – QRS-komplexus', text: 'A **His-köteg**, a két szár és a **Purkinje-rostok** kb. 0,08 s alatt szétviszik az ingerületet a **sövényen** és a két kamra falán, a szívcsúcstól felfelé. Az EKG-n ez a nagy, hegyes **QRS-komplexus**. (A pitvarok ingerülete közben lecseng, de ez a QRS-ben „elbújik”.)', parts: ['inger', 'sovey', 'jk', 'bk'] },
      { icon: '🔒', title: 'Kamrai összehúzódás: a vitorlás billentyűk záródnak', text: 'A kamrák összehúzódnak, a nyomás bennük gyorsan nő, és amint meghaladja a pitvari nyomást, **becsapja a vitorlás billentyűket**: ez az **első szívhang** („tuk”). Egy rövid ideig **minden billentyű zárva** van, a kamra „összeszorítja” a vért anélkül, hogy a térfogata változna (izovolumetriás összehúzódás).', parts: ['vitorlas', 'jk', 'bk'] },
      { icon: '🚀', title: 'Kilökés: a zsebes billentyűk kinyílnak', text: 'Amikor a kamrai nyomás meghaladja az artériákét (balra kb. 80, jobbra kb. 10 Hgmm), a **zsebes billentyűk kinyílnak**, és a vér kiáramlik: a bal kamrából az **aortába**, a jobb kamrából a **tüdőartériába**. Mindkét kamra kb. **70 ml** vért lök ki; a bal kamrai nyomás csúcsa kb. 120 Hgmm. Az aorta fala kitágul és „eltárolja” a nyomást.', parts: ['zsebes', 'aorta', 'truncus', 'bk', 'jk'] },
      { icon: '🌊', title: 'Visszarendeződés – T hullám, második szívhang', text: 'A kamraizom **visszaáll** nyugalmi állapotába (repolarizáció): az EKG-n ez a lekerekített **T hullám**. A kamrák elernyednek, nyomásuk esik, a visszafelé induló vér **becsukja a zsebes billentyűket**: ez a **második szívhang** („tak”). A nyomás tovább esik, a vitorlás billentyűk kinyílnak, és kezdődik az újabb telődés.', parts: ['zsebes', 'aorta', 'truncus', 'inger'] },
      { icon: '🔁', title: 'Egy teljes ciklus', when: 'nyugalomban kb. 0,8 s', text: 'Percenként 70-es pulzusnál egy ciklus kb. **0,8 s**: ebből kb. 0,3 s a kamrai összehúzódás (systole) és kb. 0,5 s az elernyedés (diastole). Gyors szívverésnél főleg a diastole rövidül: ezért kevesebb idő jut a kamrák telődésére és a **koszorúerek** vérellátására.', parts: ['koszorus', 'bk', 'jk'] }
    ],
    history: [
      { year: 'Kr. u. 2. sz.', text: '**Galénosz** görög orvos szerint a vér a májban keletkezik, és a test „elfogyasztja”; a jobb kamrából a sövény láthatatlan pórusain szivárog át a balba. Ezt a nézetet közel 1500 évig tanították.' },
      { year: '1628', text: 'William **Harvey** angol orvos a „De motu cordis” című könyvében bizonyítja a **vérkeringést**: a szív pumpaként a vért körbe hajtja, ugyanaz a vér tér vissza. (Kiszámolta, hogy a szív óránként több vért pumpál, mint a test súlya, tehát a vérnek körben kell mozognia.)' },
      { year: '1661', text: 'Marcello **Malpighi** mikroszkóppal megtalálja a **hajszálereket** a béka tüdejében: ezek kötik össze az artériákat a vénákkal, így teljes lett Harvey elmélete.' },
      { year: '1903', text: 'Willem **Einthoven** holland orvos húros galvanométerrel rögzíti az első megbízható **elektrokardiogramot (EKG)**; a P, Q, R, S, T hullámok elnevezése is tőle származik. 1924-ben Nobel-díjat kapott.' },
      { year: '1938–1953', text: 'Az első **szívműtétek**: 1938-ban Robert Gross lekötött egy nyitott Botallo-vezetéket, 1944-ben Blalock, Taussig és Vivien Thomas „kék csecsemőket” operált, 1953-ban John Gibbon először használt **szív-tüdő gépet** nyitott szívműtétnél.' },
      { year: '1958–1960', text: 'Svédországban beültetik az első teljesen beépíthető **pacemakert** (Senning és Elmqvist, 1958), 1960-ban Albert Starr és Lowell Edwards elkészíti az első tartósan működő **műbillentyűt** (golyós szelep).' },
      { year: '1967', text: 'Christiaan **Barnard** dél-afrikai sebész Fokvárosban elvégzi az első emberi **szívátültetést**. A beteg 18 napig élt; a kilökődést gátló gyógyszerek (ciklosporin) a 80-as évektől tették sikeressé a módszert.' },
      { year: '1992', text: 'Az első sikeres **magyarországi szívátültetést** **Szabó Zoltán** szívsebész vezetésével végzik el Budapesten, a Semmelweis Orvostudományi Egyetemen. Azóta több száz magyar beteg kapott új szívet.' }
    ],
    quiz: [
      { q: 'Melyik üreg pumpálja a vért a nagy vérkörbe (az egész testbe)?', options: ['A bal kamra', 'A jobb kamra', 'A jobb pitvar', 'A bal pitvar'], answer: 0, explain: 'A bal kamra az aortába pumpál, ezért a legvastagabb a fala.' },
      { q: 'Milyen vér folyik a tüdővénákban?', options: ['Oxigéndús', 'Oxigénszegény', 'Kevert', 'Nem folyik bennük vér'], answer: 0, explain: 'A tüdőből térnek vissza a bal pitvarba. Véna = a szív felé vezető ér, függetlenül az oxigéntartalomtól.' },
      { q: 'Mi indítja el normálisan a szívverést?', options: ['A szinuszcsomó a jobb pitvarban', 'Az agy minden egyes szívverésnél', 'Az AV-csomó', 'A koszorúerek'], answer: 0, explain: 'A szinuszcsomó sejtjei maguktól hoznak létre ingerületet; az idegrendszer csak gyorsítja vagy lassítja.' },
      { q: 'Mi okozza az első szívhangot?', options: ['A vitorlás billentyűk záródása', 'A zsebes billentyűk záródása', 'A pitvarok összehúzódása', 'A vér súrlódása az aortában'], answer: 0, explain: 'A kamrai systole elején csapódnak be a vitorlás billentyűk; a második szívhang a zsebes billentyűk záródása.' },
      { q: 'Mit jelez az EKG QRS-komplexusa?', options: ['A kamrák ingerületbe jutását', 'A pitvarok ingerületét', 'A kamrák visszarendeződését', 'A billentyűk nyílását'], answer: 0, explain: 'P = pitvari ingerület, QRS = kamrai ingerület (depolarizáció), T = kamrai repolarizáció.' }
    ]
  });
})();
