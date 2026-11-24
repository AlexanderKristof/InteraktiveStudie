/* Modell: Okostelefon – rétegekre szétszedve, izometrikus nézetben (képernyővel felfelé fekszik). */
(function () {
  var K = 1.35, OX = 300, OY = 312;
  var I = STUDIE.draw.iso(OX, OY, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  function f1(n) { return (+n).toFixed(1); }
  // Helyi koordináták: u = a telefon szélessége (balról jobbra), v = a hossza (fentről lefelé), z = felfelé.
  function P(u, v, z) { return I.pt(v, -u, z); }
  function B(u, v, z) { var p = P(u, v, z); return [Math.round(p[0]), Math.round(p[1])]; }
  // Vízszintes sík (u, v) koordinátákkal: téglalap, kör, szöveg is rajzolható rá, izometrikusan torzítva.
  function plane(z, inner, extra) {
    var c = (0.866 * K).toFixed(4), s = (0.5 * K).toFixed(4);
    return '<g transform="matrix(' + c + ',' + (-s) + ',' + c + ',' + s + ',' + OX + ',' + f1(OY - z * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function rr(u0, v0, u1, v1, r, n) {
    n = n || 5; var pts = [];
    [[u1 - r, v0 + r, -90], [u1 - r, v1 - r, 0], [u0 + r, v1 - r, 90], [u0 + r, v0 + r, 180]].forEach(function (c) {
      for (var i = 0; i <= n; i++) { var a = (c[2] + 90 * i / n) * Math.PI / 180; pts.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); }
    });
    return pts;
  }
  function polyP(pts, z, fill, extra) { return I.poly(pts.map(function (q) { return P(q[0], q[1], z); }), fill, extra); }
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
  var EDGE = ' stroke="rgba(0,0,0,.4)" stroke-width="0.8" stroke-linejoin="round"';
  function slab(pts, z, h, color, top, topExtra) { return walls(pts, z, h, color) + polyP(pts, z + h, top || color, topExtra || EDGE); }
  function box(u0, v0, u1, v1, r, z, h, color, top) { return slab(rr(u0, v0, u1, v1, r, 3), z, h, color, top); }
  function ring(outer, inner, z, h, color) {
    var d = function (pts) { return 'M' + pts.map(function (q) { var p = P(q[0], q[1], z + h); return f1(p[0]) + ' ' + f1(p[1]); }).join(' L') + ' Z'; };
    return walls(inner, z, h, color, true) + walls(outer, z, h, color) +
      '<path d="' + d(outer) + ' ' + d(inner) + '" fill="' + color + '" fill-rule="evenodd"' + EDGE + '/>';
  }
  function chipText(u, v, z, str, size, fill) {
    return plane(z, '<text x="' + u + '" y="' + v + '" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="700" font-size="' + size + '" fill="' + (fill || '#c9ced6') + '">' + str + '</text>', NS);
  }

  /* ---------- színátmenetek ---------- */
  var defs = '<defs>' +
    '<linearGradient id="ot-wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b3fc4"/><stop offset=".5" stop-color="#3a7bd5"/><stop offset="1" stop-color="#16b3a3"/></linearGradient>' +
    '<linearGradient id="ot-glare" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".22" stop-color="#fff" stop-opacity=".38"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/>' +
    '<stop offset=".4" stop-color="#fff" stop-opacity=".25"/><stop offset=".44" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
    '<radialGradient id="ot-lens" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#6aa8ff"/><stop offset=".35" stop-color="#253a6b"/><stop offset="1" stop-color="#05070d"/></radialGradient>' +
    '<linearGradient id="ot-back" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a89ce0"/><stop offset="1" stop-color="#7464b8"/></linearGradient>' +
    '<pattern id="ot-mesh" patternUnits="userSpaceOnUse" width="2.4" height="2.4"><circle cx="1.2" cy="1.2" r="0.55" fill="#0d0f13"/></pattern>' +
    '</defs>';

  var OUT = rr(-40, -84, 40, 84, 9, 6), IN = rr(-37.5, -81.5, 37.5, 81.5, 7, 6);

  /* 11. Hátlap (belső oldala látszik): kameraablakok, vezeték nélküli töltőtekercs */
  var back = slab(OUT, 0, 1.2, '#8577c4', 'url(#ot-back)');
  var bIn = '<rect x="9" y="-77" width="26" height="26" rx="5" fill="#6b5da8" stroke="#4d4185" stroke-width="0.6"/>';
  [[16, -70], [28, -70], [22, -58]].forEach(function (c) {
    bIn += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="4.6" fill="#3b3f48" stroke="#c9ced6" stroke-width="0.8"/><circle cx="' + c[0] + '" cy="' + c[1] + '" r="3" fill="url(#ot-lens)"/>';
  });
  for (var ci = 0; ci < 7; ci++) bIn += '<circle cx="0" cy="14" r="' + (8 + ci * 1.7) + '" fill="none" stroke="#c8813f" stroke-width="1.15"/>';
  bIn += '<circle cx="0" cy="14" r="6.5" fill="#2b2f36" fill-opacity=".55"/>';
  back += plane(1.25, bIn, NS);

  /* 3. Keret (fémház) antennaréssel, gombokkal, USB-C nyílással */
  var frame = ring(OUT, IN, 0, 7.2, '#a3acb9');
  var fIn = '';
  [[-62, -40, -37.4], [-62, 37.4, 40], [62, -40, -37.4], [62, 37.4, 40]].forEach(function (b) {
    fIn += '<rect x="' + b[1] + '" y="' + (b[0] - 1) + '" width="' + (b[2] - b[1]) + '" height="2" fill="#3a3f48"/>';
  });
  frame += plane(7.25, fIn, NS);
  // antennarés a látható bal oldalon, hangerőgombok, alsó nyílások
  [-62, 62].forEach(function (v) { frame += I.poly([P(-40, v - 1, 0.2), P(-40, v + 1, 0.2), P(-40, v + 1, 7), P(-40, v - 1, 7)], '#3a3f48', ' stroke="none"'); });
  frame += box(-41.3, -52, -39.6, -42, 0.8, 2.8, 2.2, '#9aa3b0') + box(-41.3, -38, -39.6, -28, 0.8, 2.8, 2.2, '#9aa3b0');
  frame += I.poly([P(-4.5, 84.05, 2.3), P(4.5, 84.05, 2.3), P(4.5, 84.05, 5.1), P(-4.5, 84.05, 5.1)], '#1d2026', ' stroke="#5d6470" stroke-width="0.6"');
  for (var gx = 12; gx <= 30; gx += 3) { var gp = P(gx, 84.05, 3.7); frame += '<circle cx="' + f1(gp[0]) + '" cy="' + f1(gp[1]) + '" r="1.15" fill="#1d2026"/>'; }
  for (gx = -30; gx <= -12; gx += 3) { gp = P(gx, 84.05, 3.7); frame += '<circle cx="' + f1(gp[0]) + '" cy="' + f1(gp[1]) + '" r="1.15" fill="#1d2026"/>'; }

  /* 4. Alaplap a SoC-cal */
  var board = slab(rr(-36, -76, 36, -24, 3), 1.3, 1, '#2f7356', '#3a8a67');
  var trIn = '';
  [[-30, -66, -30, -30], [-26, -48, 0, -48], [-2, -52, 14, -52], [-34, -28, 34, -28], [6, -74, 6, -56], [0, -40, 30, -40]].forEach(function (l) {
    trIn += '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '" stroke="#d6b45a" stroke-width="0.5" stroke-opacity=".7"/>';
  });
  board += plane(2.32, trIn, NS);
  board += box(-26, -72, -2, -50, 1.2, 2.3, 1.2, '#4a505c', '#3a3f4a') + chipText(-14, -61, 3.55, 'SoC', 5);
  board += box(-34, -46, -27, -38, 0.8, 2.3, 0.9, '#2a2e36') + box(-10, -30, 4, -26, 0.6, 2.3, 1, '#d7dce3');

  /* 5. Memória: RAM és flash (UFS) */
  var mem = box(-24, -46, -6, -32, 1, 2.3, 1.1, '#30343d', '#262a31') + chipText(-15, -39, 3.45, 'RAM', 3.8) +
    box(-2, -46, 12, -32, 1, 2.3, 1.1, '#30343d', '#262a31') + chipText(5, -39, 3.45, 'UFS', 3.8);

  /* 7. Kameramodul: hátsó hármas kamera + előlapi (szelfi) kamera */
  var cam = box(9, -77, 35, -51, 3, 2.3, 3.4, '#3a3f48', '#2b2f36');
  var cIn = '';
  [[16, -70], [28, -70], [22, -58]].forEach(function (c) {
    cIn += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="5" fill="#59606b" stroke="#9aa3b0" stroke-width="0.7"/><circle cx="' + c[0] + '" cy="' + c[1] + '" r="3.4" fill="url(#ot-lens)"/>';
  });
  cIn += '<rect x="26.5" y="-58.5" width="5" height="3" rx="0.6" fill="#e8d9a8"/>';
  cam += plane(5.72, cIn, NS) + box(-3, -80.5, 3, -75.5, 1.5, 2.3, 3.3, '#3a3f48', '#2b2f36') +
    plane(5.62, '<circle cx="0" cy="-78" r="1.8" fill="url(#ot-lens)" stroke="#9aa3b0" stroke-width="0.4"/>', NS);

  /* 8. Antennák és modem */
  var ant = '';
  function meander(u0, v0, u1, v1) {
    var s = '<rect x="' + u0 + '" y="' + v0 + '" width="' + (u1 - u0) + '" height="' + (v1 - v0) + '" rx="1" fill="#d08a3c" fill-opacity=".9" stroke="#8a5420" stroke-width="0.4"/>', d = 'M' + (u0 + 1.5) + ' ' + (v0 + 1);
    for (var x = u0 + 1.5, up = true; x < u1 - 1.5; x += 2.2, up = !up) d += ' L' + x.toFixed(1) + ' ' + (up ? v1 - 1 : v0 + 1) + ' L' + (x + 2.2).toFixed(1) + ' ' + (up ? v1 - 1 : v0 + 1);
    return s + '<path d="' + d + '" fill="none" stroke="#f3c98b" stroke-width="0.45"/>';
  }
  ant += plane(5.4, meander(-36, -81.2, -5, -76.8) + meander(5, -81.2, 36, -76.8));
  ant += box(16, -48, 32, -30, 1, 2.3, 1.3, '#b9c0ca', '#cdd3db') + chipText(24, -39, 3.65, '5G', 5.5, '#4a505c');

  /* 6. Akkumulátor */
  var bat = box(-35, -20, 35, 58, 3, 1.3, 4.6, '#56627a', '#5f6c86');
  bat += plane(5.95,
    '<rect x="-26" y="-4" width="52" height="40" rx="2" fill="#e9edf2" stroke="#9aa3b0" stroke-width="0.5"/>' +
    '<rect x="-26" y="-4" width="52" height="8" rx="2" fill="#f5a524"/>' +
    '<text x="0" y="1.4" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="5" fill="#3a2a00">Li-ion</text>' +
    '<text x="0" y="13" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="5.2" fill="#33394a">3,87 V</text>' +
    '<text x="0" y="21" text-anchor="middle" font-family="sans-serif" font-size="4.4" fill="#33394a">5000 mAh</text>' +
    '<text x="0" y="29" text-anchor="middle" font-family="sans-serif" font-size="4.4" fill="#33394a">19,4 Wh</text>', NS);
  bat += plane(2.4, '<rect x="-8" y="-25" width="10" height="6" rx="1" fill="#d08a3c" stroke="#8a5420" stroke-width="0.4"/>', NS);

  /* 9. Hangszóró és mikrofon */
  var spk = box(10, 62, 36, 80.5, 2, 1.3, 3.6, '#30343d', '#2b2f36') + plane(4.95, '<rect x="13" y="65" width="20" height="12.5" rx="1.5" fill="url(#ot-mesh)" stroke="#59606b" stroke-width="0.4"/>', NS);
  spk += I.cyl(79, 8, 2.3, 1.9, 1.6, '#9aa3b0');

  /* 10. Rezgőmotor (lineáris) */
  var mot = box(-36, 59, -12, 70, 2, 1.3, 3.4, '#b6bec9', '#c7ced8') + plane(4.75, '<rect x="-32" y="62.5" width="16" height="4" rx="1" fill="#8b95a3"/>', NS);

  /* 12. USB-C csatlakozó */
  var usb = box(-5.5, 71, 5.5, 85, 1.5, 2, 3.4, '#c3c9d2', '#d3d8df') +
    I.poly([P(-3.8, 85.05, 2.7), P(3.8, 85.05, 2.7), P(3.8, 85.05, 4.7), P(-3.8, 85.05, 4.7)], '#1d2026', ' stroke="none"') +
    plane(2.1, '<rect x="-3" y="64" width="6" height="8" fill="#d08a3c" stroke="#8a5420" stroke-width="0.4"/>', NS);

  /* 2. Érintőréteg + OLED kijelző */
  var disp = slab(rr(-38.5, -82.5, 38.5, 82.5, 7.5, 6), 6, 0.9, '#262c38', '#1b202a');
  var dIn = '<rect x="-36.8" y="-80.8" width="73.6" height="161.6" rx="6.4" fill="url(#ot-wall)"/>' +
    '<text x="-29" y="-73" font-family="sans-serif" font-weight="700" font-size="4.6" fill="#fff" dominant-baseline="central">9:41</text>' +
    '<circle cx="0" cy="-74.5" r="2" fill="#05070d"/>' +
    '<rect x="21" y="-74.8" width="8" height="3.6" rx="1" fill="none" stroke="#fff" stroke-width="0.6"/><rect x="22" y="-73.9" width="5" height="1.8" fill="#fff"/>' +
    '<text x="0" y="-56" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="300" fill="#fff" fill-opacity=".92" dominant-baseline="central">12:45</text>';
  var cols = ['#f5a524', '#e5484d', '#30a46c', '#0091ff', '#8e4ec6', '#f76808', '#12a594', '#d6409f', '#ffb224', '#3e63dd', '#46a758', '#e54666', '#05a2c2', '#ab4aba', '#f2b33d', '#6e56cf'];
  for (var rI = 0; rI < 4; rI++) for (var cI = 0; cI < 4; cI++) {
    dIn += '<rect x="' + (-29 + cI * 16) + '" y="' + (-36 + rI * 19) + '" width="10.5" height="10.5" rx="2.8" fill="' + cols[rI * 4 + cI] + '"/>';
  }
  dIn += '<rect x="-33" y="50" width="66" height="18" rx="6" fill="#fff" fill-opacity=".22"/>';
  for (cI = 0; cI < 4; cI++) dIn += '<rect x="' + (-29 + cI * 16) + '" y="53.7" width="10.5" height="10.5" rx="2.8" fill="' + ['#30a46c', '#0091ff', '#f5a524', '#e5484d'][cI] + '"/>';
  dIn += '<rect x="-12" y="75" width="24" height="1.4" rx="0.7" fill="#fff" fill-opacity=".8"/>';
  disp += plane(6.92, dIn, NS);

  /* 1. Fedőüveg */
  var glass = '<g opacity=".3">' + slab(OUT, 6.95, 1.1, '#cfe8f6', '#dff0fa', ' stroke="#4f97c4" stroke-width="1.1" stroke-linejoin="round"') + '</g>' +
    plane(8.07, '<rect x="-40" y="-84" width="80" height="168" rx="9" fill="url(#ot-glare)"/><rect x="-7" y="-82.6" width="14" height="1.2" rx="0.6" fill="#2b2f36" fill-opacity=".8"/>', NS);

  STUDIE.addModel({
    id: 'okostelefon',
    title: 'Okostelefon',
    icon: '📱',
    color: '#7c5cd6',
    category: 'Számítástechnika',
    keywords: 'mobiltelefon mobil telefon okostelefon smartphone iPhone Android kijelző OLED érintőképernyő Gorilla üveg SoC processzor ARM RAM flash UFS akkumulátor akku kamera szenzor antenna 5G modem hangszóró mikrofon rezgőmotor USB-C újrahasznosítás ritkaföldfém kobalt lítium',
    summary: 'Zsebben hordható számítógép, kamera, rádió és navigáció egyben: kb. 200 grammban több mint 60 különböző kémiai elem.',
    scale: 'kb. 7 × 15–16 cm, 0,8 cm vastag, 170–220 g',
    viewBox: '34 2 500 596',
    backdrop: defs,
    intro: 'Az okostelefon belül meglepően rendezett: alul a **hátlap**, körben a fém **keret**, benne egymás mellett az **alaplap** (rajta a processzorral és a memóriával), a nagy lapos **akkumulátor**, a **kamerák**, a **hangszóró**, a **rezgőmotor** és a **töltőcsatlakozó**. Felül az **OLED kijelző** és a védő **fedőüveg** zárja le.\n\nA legnagyobb helyet az akku foglalja el: a telefon belsejének kb. felét. Az igazi „agy” viszont az alaplapon ülő, körömnyi **SoC** (system on a chip), amelyben a processzormagok, a grafikus egység és a mesterséges intelligenciát gyorsító egység is helyet kap.\n\nA **Szétszedés** gombbal kinyithatod a telefont – a valóságban ehhez hőlégfúvó, tapadókorong és sok türelem kell!',
    parts: [
      {
        id: 'uveg', z: 11, name: 'Fedőüveg (kijelzőüveg)', en: 'cover glass (chemically strengthened)', svg: glass, explode: [72, -206], badge: B(24, -20, 8.05),
        what: 'A kijelző fölötti átlátszó védőréteg, amit nap mint nap megérintesz. Meg kell védenie a kijelzőt a karcolástól és az eséstől, közben tökéletesen átlátszónak és sima tapintásúnak kell lennie. A tetején van a hangszórónyílás (hallgató) is.',
        madeOf: '**Alumínium-szilikát üveg** (pl. a Corning Gorilla Glass típusai), kb. 0,5–0,7 mm vastag. A felületén vékony **zsírtaszító (oleofób)** bevonat van, ettől kevésbé ujjlenyomatos.',
        how: 'Az üveget olvadékból vékony lappá húzzák, méretre vágják, a széleit csiszolják. Ezután **kémiailag edzik**: kb. 400 °C-os olvasztott kálium-nitrát fürdőbe merítik, ahol az üveg felszínén a kisebb nátriumionok helyére nagyobb káliumionok lépnek. A „bezsúfolt” nagy ionok összenyomják a felületet, és ettől lesz az üveg sokkal ellenállóbb a repedéssel szemben.',
        uni: 'Az ioncserés edzés a felületen nagy **nyomófeszültséget** (CS, akár 800–900 MPa), alatta egy adott mélységig (DOL, kb. 50–100 µm) nyomott réteget hoz létre; a belsejében ezt húzófeszültség egyenlíti ki. Egy repedés csak akkor terjed, ha a csúcsán a húzófeszültség legyőzi a nyomóréteget: ezért a mélyebb nyomott réteg az éles kövekre eséskor véd. A keménység (karcállóság) és a törésállóság között kompromisszum van: a zafír keményebb, de könnyebben törik.',
        fact: 'Az okostelefonok üvege a legtöbbször nem a képernyő közepén törik el, hanem a sarkánál, mert esés közben az ér először földet.'
      },
      {
        id: 'kijelzo', z: 10, name: 'Érintőréteg + OLED kijelző', en: 'OLED display with touch layer', svg: disp, explode: [46, -136], badge: B(-24, -8, 6.92),
        what: 'Ez rajzolja ki a képet, és ez érzékeli az ujjadat. Az **OLED** kijelzőben minden képpont (pixel) maga világít: egy vörös, egy zöld és egy kék alpixel együtt bármilyen színt kikever. Ahol fekete a kép, ott a pixel egyszerűen ki van kapcsolva – ezért olyan mély a fekete, és ezért spórol az energiával a sötét mód.\n\nA kijelző tetején egy átlátszó **kapacitív érintőréteg** van: finom vezetőhálózat, amely megérzi, hogy az ujjad (ami maga is vezető) hol változtatja meg az elektromos teret.',
        madeOf: 'Egy hajlékony **műanyag (poliimid) vagy üveg hordozón** vékonyréteg-tranzisztorok (TFT) sora, fölöttük néhány tized mikrométeres **szerves (szén alapú) fénykibocsátó rétegek**, köztük elektródák. Fölötte polarizátor és az érintőréteg vezetőhálója (**ITO**, azaz indium-ón-oxid, vagy fém háló). Alul hővezető grafit és réz fólia.',
        how: 'A tranzisztorokat a processzorgyártáshoz hasonlóan, fotolitográfiával készítik nagy üveglapokon. A szerves anyagokat vákuumkamrában **gőzölik fel** egy finom fémmaszkon keresztül, alpixelenként. Mivel a szerves rétegek tönkremennek a levegőtől és a nedvességtől, azonnal légmentesen lezárják őket (vékonyréteg-tokozás).',
        uni: 'Egy OLED alpixel fényereje az átfolyó **árammal** arányos, ezért minden alpixelt egy **aktív mátrix** (AMOLED) vezérel: legalább 2 tranzisztor és 1 kondenzátor (2T1C), a gyakorlatban 7T1C a tranzisztorok küszöbfeszültség-szórásának kompenzálására. Az **LTPO** (alacsony hőmérsékletű polikristályos oxid) hátlap lehetővé teszi, hogy a frissítési frekvencia 1 és 120 Hz között változzon – állóképnél ez sok energiát takarít meg. A kapacitív érintés kölcsönös kapacitás (mutual capacitance) mérésén alapul: a meghajtó- és érzékelővonalak kereszteződéseinek kapacitása az ujj közelében néhány tized pF-dal csökken.',
        terms: ['digitalis-technika/mosfet', 'fizika-bsc/elektromos-terero']
      },
      {
        id: 'keret', z: 1, name: 'Keret (fémház)', en: 'mid-frame / chassis', svg: frame, explode: [-56, 100], badge: B(-38.7, 40, 7.2),
        what: 'A telefon gerince: ez tartja egyben az összes alkatrészt, ide ragasztják a kijelzőt és a hátlapot, és ebben vannak a gombok, a nyílások. A fém keret egyes szakaszai **antennaként** is működnek – ezért látsz rajta vékony műanyag csíkokat (antennaréseket).',
        madeOf: '**Alumínium** ötvözet, drágább típusoknál **rozsdamentes acél** vagy **titán**. Belül gyakran egy fém középlemez is van, amelyre az alkatrészek fekszenek. Az antennarésekben műanyag van.',
        how: 'Egyetlen fémtömbből **CNC marógéppel** munkálják ki, tized milliméter pontossággal. Az antennarésekbe műanyagot fröccsöntenek, majd a felületet homokszórják és **eloxálják** (alumíniumnál) – ettől lesz színes és karcálló.',
        uni: 'A fémkeretes antennák tervezése nehéz: a keret egy része maga a sugárzó elem, amelyet a rések hangolnak megfelelő **elektromos hosszra** (a hullámhossz egynegyede–fele). A kéz ráfogása elhangolja az antennát (a test vezető és nagy permittivitású), ezért a telefon több antenna közül **dinamikusan választ**, és hangolóáramkörrel követi a változást.',
        terms: ['fizika-bsc/hullamegyenlet']
      },
      {
        id: 'alaplap', z: 2, name: 'Alaplap a SoC-cal', en: 'logic board with system-on-chip (SoC)', svg: board, explode: [-78, -40], badge: B(-30, -60, 2.3), link: 'processzor', lesson: 'informatika/szamitogep',
        what: 'A telefon „agya és idegrendszere”. A legfontosabb chip a **SoC** (system on a chip, egylapkás rendszer): egyetlen lapkán van a processzor (CPU) 6–8 magja, a grafikus egység (GPU), a mesterséges intelligenciát gyorsító egység (NPU), a kamerák képét feldolgozó egység (ISP), sokszor a mobilmodem is. Körülötte energiaellátó chipek (PMIC), és csatlakozók, amelyekre a többi alkatrész kábele csatlakozik.',
        madeOf: 'Többrétegű **nyomtatott áramkör** (10–12 réteg üvegszálas műgyanta, köztük vékony **rézvezetékekkel**). A SoC lapkája **szilícium**, ma 3–4 nm-es technológiával, 15–20 milliárd tranzisztorral. A forrasztás ón-ezüst-réz ötvözet (ólommentes), a csatlakozókon arany.',
        how: 'A lapkát a processzoréhoz hasonlóan gyártják. Az alaplapra a chipeket **SMT** (felületszerelési) technológiával ültetik be: forrasztópasztát nyomtatnak rá, robotok másodpercenként több alkatrészt helyeznek a helyére, majd a lap végigmegy egy kemencén, ahol a paszta megolvad. Hogy kisebb legyen, sok telefonban az alaplap két, egymásra forrasztott emeletből áll („szendvics”).',
        uni: 'A telefonos SoC-ok **ARM** utasításkészletű, heterogén („big.LITTLE”) processzorok: néhány nagy teljesítményű, sorrenden kívül végrehajtó mag mellett energiatakarékos kis magok futtatják a háttérfeladatokat. A szűk keresztmetszet a **hő**: egy telefon tartósan csak kb. 4–6 W-ot tud ventilátor nélkül leadni, ezért a dinamikus teljesítmény `P ≈ α·C·U²·f` szerint a feszültség és a frekvencia csökkentése (DVFS) a legfőbb eszköz. Az NPU kis pontosságú (INT8/INT4) mátrixszorzásokat végez nagy párhuzamossággal.',
        terms: ['digitalis-technika/cmos', 'digitalis-technika/risc-cisc', 'digitalis-technika/orajel']
      },
      {
        id: 'memoria', z: 4, name: 'Memória (RAM és flash)', en: 'LPDDR RAM and UFS flash storage', svg: mem, explode: [-86, -98], badge: B(-15, -39, 3.4),
        what: 'Két különböző memória van a telefonban. A **RAM** (munkamemória) a futó alkalmazások adatait tartja – nagyon gyors, de kikapcsoláskor mindent elfelejt. A **flash tároló** (UFS) őrzi a fényképeidet, alkalmazásaidat és a rendszert, kikapcsolva is. Tipikusan 8–16 GB RAM és 128 GB–1 TB tároló van egy mai telefonban.',
        madeOf: 'Mindkettő **szilícium** chip. A RAM (LPDDR, „alacsony fogyasztású DDR”) cellái apró kondenzátorok, amelyek töltése egy bitet jelent. A flash cellái töltéscsapdák, amelyek évekig megőrzik a töltést; a mai **3D NAND** flashben több mint 200 cellaréteg van egymás fölött.',
        how: 'Memóriagyárakban, a processzorhoz hasonló fotolitográfiás eljárással készülnek. Helytakarékosságból több lapkát egymásra rétegeznek egy tokban, a RAM-ot pedig gyakran közvetlenül a SoC tetejére forrasztják (**package-on-package**). A rajzon a jobb láthatóság kedvéért a SoC mellett látszanak.',
        uni: 'A DRAM-cella 1 tranzisztorból és 1 kondenzátorból áll (1T1C), töltése szivárog, ezért néhány tíz milliszekundumonként **frissíteni** kell. A NAND flash lebegő kapus vagy töltéscsapdás tranzisztor: TLC/QLC cellákban 3–4 bitet tárolnak cellánként a küszöbfeszültség 8–16 szintjével, ami lassabb írást és kevesebb újraírási ciklust jelent. A vezérlő **wear leveling** (kopáskiegyenlítés) algoritmussal osztja szét az írásokat.',
        terms: ['digitalis-technika/dram', 'digitalis-technika/memoriahierarchia']
      },
      {
        id: 'akku', z: 3, name: 'Akkumulátor', en: 'lithium-ion polymer battery (pouch cell)', svg: bat, explode: [0, -6], badge: B(0, 28, 5.9), link: 'akkucella',
        what: 'A telefon energiaforrása, és egyben a legnagyobb alkatrésze. Egy lapos **lítiumion-cella** (tasakcella), amely kb. 15–20 wattóra energiát tárol – egy napi használatra elég. A cellához egy kis védőáramkör tartozik, amely megakadályozza a túltöltést, a túlmerülést és a rövidzárat.',
        madeOf: '**Grafit** anód rézfólián, **lítium-kobalt-oxid** (LCO) katód alufólián, közöttük szeparátor és elektrolit, mindez alumíniumfólia tasakban. A telefonokban a kobaltos katód a gyakori, mert kis térfogatban sok energiát tárol.',
        how: 'A cellagyártás ugyanúgy zajlik, mint az autóakkuknál: bevonás, préselés, rétegezés vagy feltekercselés, elektrolit betöltése, első töltés (formázás). A telefonba nyúló ragasztócsíkokkal rögzítik, hogy cserekor sérülés nélkül ki lehessen húzni.',
        uni: 'Telefonokban a töltés **CC–CV** profilú: állandó árammal kb. 4,2–4,45 V-ig, majd állandó feszültséggel, csökkenő árammal. A gyorstöltés (USB PD, 20–100 W) a CC szakasz áramát növeli, ami a **lítiumkiválás** (lithium plating) kockázata miatt csak meleg és alacsony töltöttségű cellánál biztonságos; ezért lassul 80% fölött. Az öregedést (SOH-csökkenés) a magas hőmérséklet és a tartósan 100%-os töltöttség gyorsítja, ezért kínálnak a telefonok „80%-ig töltés” opciót.',
        terms: ['e-mobilitas/cellakemia', 'e-mobilitas/cc-cv', 'e-mobilitas/soh'],
        fact: 'A felirat számai összefüggnek: energia = feszültség × töltés, azaz 3,87 V × 5 Ah ≈ 19,4 Wh. Ennyi energiával egy 10 W-os LED-lámpa kb. két órán át világítana.'
      },
      {
        id: 'kamera', z: 5, name: 'Kameramodul', en: 'camera module (CMOS image sensor)', svg: cam, explode: [-30, -100], badge: B(22, -64, 5.72),
        what: 'A telefonok hátulján ma általában **több kamera** van: egy fő (széles látószögű), egy ultraszéles és sokszor egy teleobjektíves. Mindegyik egy apró lencserendszerből és egy **képérzékelőből** áll. A rajzon a modul felülről látszik; a lencséi valójában hátrafelé, a hátlap ablakain át néznek. Elöl, a kijelző kis lyukában ül a szelfikamera.',
        madeOf: 'A képérzékelő **szilícium** chip, több millió fényérzékeny cellával (pixel), mindegyiken egy apró színszűrővel és mikrolencsével. Az objektív 5–7 nagy pontosságú, **műanyag** (néha üveg) lencséből áll. A fókuszt és a képstabilizálást apró **mágnesek és tekercsek** mozgatják.',
        how: 'Az érzékelőt chipgyárban, a lencséket fröccsöntéssel készítik, mikrométeres pontossággal. A modult tisztatérben szerelik össze, és aktív igazítással – miközben a kamera már képet ad – rögzítik a lencsét a legélesebb helyzetben.',
        uni: 'A telefonos érzékelők **hátulról megvilágított (BSI) CMOS** szenzorok, pixelméretük kb. 0,6–2 µm. Kis pixelnél a jel-zaj viszonyt a fotonzaj korlátozza (`SNR ≈ √N`, N a begyűjtött fotonok száma), ezért **pixel-összevonással** (binning) 4 vagy 9 pixelt egy nagyobbá kombinálnak sötétben. A felbontást a diffrakció is korlátozza: a légfolt átmérője `≈ 2,44·λ·N_f` (N_f a rekeszszám), f/1,8 és 550 nm mellett kb. 2,4 µm. A „számítógépes fényképezés” (több kép összefésülése, HDR, zajszűrés) az ISP és az NPU feladata.',
        terms: ['fizika-bsc/interferencia', 'fizika-bsc/fotoeffektus']
      },
      {
        id: 'antenna', z: 6, name: 'Antennák és modem', en: 'antennas, RF front-end and modem', svg: ant, explode: [-70, -70], badge: B(-22, -79, 5.4),
        what: 'A telefon egyszerre több rádiót használ: **mobilhálózat** (4G/5G), **Wi-Fi**, **Bluetooth**, **GPS**, **NFC** (érintéses fizetés). A rádióhullámokat az **antennák** sugározzák ki és fogják fel – ezek a keret fémsávjai és hajlékony rézcsíkok a telefon két végén. A **modem** chip alakítja a digitális adatokat rádiójellé és vissza.',
        madeOf: 'Az antennák **réz** vezetősávok hajlékony műanyag (poliimid) fólián, illetve a fémkeret szakaszai. A modem és a rádiós előerősítők **szilícium** és **gallium-arzenid** chipek, fém árnyékolóburkolat alatt (ez a rajzon az ezüst doboz).',
        how: 'A hajlékony antennákat rézfóliából maratják, mint egy nyomtatott áramkört. A modem chipet chipgyárban készítik, és az alaplapra forrasztják. Gyártás után minden telefon rádióját mérőkamrában **kalibrálják**.',
        uni: 'Egy egyszerű antenna rezonáns hossza a hullámhossz negyede: 3,5 GHz-en `λ = c/f ≈ 8,6 cm`, így `λ/4 ≈ 2,1 cm`. A telefon 600 MHz-től (λ = 50 cm!) a milliméterhullámú 5G-ig (26–28 GHz) dolgozik, ezért a kis helyen több, hangolható antenna kell. Az 5G **MIMO** (több antenna egyszerre, térbeli multiplexálás) és **nyalábformálás** révén éri el a nagy sebességet: a fáziseltolt antennaelemek jelei egy irányba **interferálnak** erősítően.',
        terms: ['fizika-bsc/hullamegyenlet', 'fizika-bsc/interferencia', 'fizika-bsc/maxwell-egyenletek']
      },
      {
        id: 'hangszoro', z: 7, name: 'Hangszóró és mikrofon', en: 'loudspeaker and MEMS microphone', svg: spk, explode: [66, 28], badge: B(23, 71, 4.9),
        what: 'A **hangszóró** egy kis tokozott doboz, amely a telefon alján, a rácsos nyílások mögött szól. A **mikrofonok** (általában 2–4 db) apró chipek: egy beszédhez, a többi a háttérzaj kiszűréséhez és a videók sztereó hangjához.',
        madeOf: 'A hangszóróban egy erős **neodímium mágnes** (ritkaföldfém!), egy vékony rézhuzal **tekercs** és egy könnyű műanyag membrán van. A mikrofon **MEMS** szilícium chip: egy mikroszkopikus rezgőlemez és egy fix lemez alkot kondenzátort.',
        how: 'A hangszórót automata sorokon ragasztják össze, és egy zárt műanyag „rezonátordobozba” teszik, ami mélyebb hangot ad. A MEMS mikrofonokat chipgyárban, maratással készítik a szilíciumlapkába.',
        uni: 'A dinamikus hangszóró a **Lorentz-erőn** alapul: `F = B·I·l`, a mágneses térben lévő tekercsre ható erő mozgatja a membránt. Fordítva működik a dinamikus mikrofon (**Faraday-indukció**). A MEMS mikrofon kapacitív: a hangnyomás a membrán–ellenlemez távolságot változtatja, így `C = ε·A/d` is változik. A kis hangszóró mélyhang-visszaadását a membránfelület korlátozza, ezért a szoftver dinamikus kiemeléssel és torzításkorlátozással dolgozik.',
        terms: ['fizika-bsc/lorentz-ero', 'fizika-bsc/faraday-indukcio']
      },
      {
        id: 'motor', z: 8, name: 'Rezgőmotor', en: 'linear resonant actuator (haptic motor)', svg: mot, explode: [6, 62], badge: B(-24, 65, 4.7),
        what: 'Ez rezegteti a telefont, amikor hívás vagy üzenet jön, és ez adja azt a finom „koppanást”, amit gépelés közben érzel (**haptikus visszajelzés**). A mai telefonokban nem forgó, hanem **lineáris** motor van: egy kis súly ide-oda mozog benne.',
        madeOf: 'Fémház, benne egy **rézhuzal tekercs**, egy **neodímium mágnes**, egy rugó és egy rugóra függesztett kis tömeg.',
        how: 'Automata sorokon szerelik össze, majd minden motort lemérnek: a telefon szoftvere a pontos rezonanciafrekvenciájára hangolja a meghajtást.',
        uni: 'A lineáris rezonáns aktuátor (LRA) egy **rugó–tömeg rendszer**: sajátfrekvenciája `f₀ = (1/2π)·√(k/m)`, tipikusan 150–240 Hz. A meghajtó áramkör pontosan a rezonancián gerjeszti (kis energiával nagy kitérés), majd ellenfázisú impulzussal gyorsan **lefékezi**, így éles, rövid „kattanás” érzetet kelt. A régebbi **ERM** motor egy excentrikus súlyt forgatott, ez lassabban indult és állt meg.',
        terms: ['fizika-bsc/harmonikus-rezges', 'villamosmernoki/rezonancia']
      },
      {
        id: 'hatlap', z: 0, name: 'Hátlap', en: 'back cover (back glass)', svg: back, explode: [-112, 196], badge: B(-30, 14, 1.25),
        what: 'A telefon hátoldala. Védi a belsejét, és megadja a telefon kinézetét. Rajta vannak a kamerák ablakai. Belül, középen a **vezeték nélküli töltés** tekercse látszik: ezen keresztül a töltőpad mágneses tere energiát juttat a telefonba.',
        madeOf: 'Drágább telefonoknál **edzett üveg** (gyakran matt, maratott felülettel), olcsóbbaknál **műanyag**. Fémből ritkán készül, mert a fém leárnyékolná a rádióhullámokat és a vezeték nélküli töltést. A töltőtekercs vékony **rézhuzal** spirál, alatta mágneses ferritlemez.',
        how: 'Az üveget a fedőüveghez hasonlóan vágják, edzik, majd hátulról festékkel vagy fóliával színezik. A gyárban erős ragasztóval rögzítik a kerethez; ez a ragasztás teszi a telefont **víz- és porállóvá** (pl. IP68).',
        uni: 'A vezeték nélküli töltés (Qi szabvány) két csatolt tekercs közötti **induktív energiaátvitel**, kb. 100–200 kHz-en. A primer és szekunder tekercs rezonáns körbe van hangolva, a csatolási tényező (k ≈ 0,3–0,7) a távolsággal és az elcsúszással gyorsan romlik – ezért segít a mágneses rögzítés. A hatásfok kb. 70–80%, a veszteség hőként jelenik meg.',
        terms: ['fizika-bsc/faraday-indukcio', 'villamosmernoki/transzformator', 'villamosmernoki/rezonancia']
      },
      {
        id: 'usbc', z: 9, name: 'Töltőcsatlakozó (USB-C)', en: 'USB Type-C connector', svg: usb, explode: [104, 52], badge: B(0, 81, 5.4),
        what: 'Ezen keresztül töltöd a telefont, és ezen tudsz adatot átvinni a számítógépre. Az **USB-C** dugót mindkét irányban be lehet dugni. Az Európai Unióban 2024 végétől minden új telefonnak USB-C csatlakozóval kell rendelkeznie, hogy egy töltő mindenhez jó legyen.',
        madeOf: '**Rozsdamentes acél** ház, benne műanyag nyelv 24 aranyozott **réz** érintkezővel (12 felül, 12 alul – ezért mindegy, melyik oldalával dugod be). Hajlékony szalagkábellel csatlakozik az alaplaphoz.',
        how: 'Az érintkezőket fémszalagból kivágják és hajlítják, aranyozzák, majd műanyagot fröccsöntenek köréjük. A kész csatlakozót az alaplapra vagy egy külön kis lapra forrasztják, és vízálló tömítéssel illesztik a keret nyílásába.',
        uni: 'Az USB-C **USB Power Delivery** (PD) protokollal tárgyalja meg a töltési feszültséget (5, 9, 15, 20 V, a PPS-sel 20 mV-os lépésekben is) és áramot. A teljesítmény `P = U·I`: nagyobb feszültséggel ugyanakkora teljesítmény kisebb árammal vihető át, így a kábel `I²·R` vesztesége kisebb. A dugó a CC vonalakon méri, melyik állásban van, és ennek megfelelően kapcsolja a nagy sebességű adatpárokat.',
        terms: ['villamosmernoki/ohm-torveny', 'villamosmernoki/hatasos-teljesitmeny']
      }
    ],
    uni: {
      text: 'Egyetemi szemmel az okostelefon egy **energiakorlátos, hőkorlátos beágyazott rendszer**: minden tervezési döntést a kb. 15–20 Wh-s akku és a ventilátor nélkül leadható néhány watt határoz meg. Ezért van a SoC-ban sok **specializált gyorsító** (GPU, NPU, ISP, videokodek, modem), amelyek egy-egy feladatot nagyságrendekkel kevesebb energiával végeznek el, mint az általános processzormagok.\n\nA rádiós oldalon a telefon egyszerre kb. 20–30 frekvenciasávot és 4–8 antennát kezel; a kommunikáció határát a **Shannon–Hartley-tétel** adja: `C = B·log₂(1 + S/N)`. Ezért nő a sávszélesség (5G-ben 100 MHz-es csatornák) és az antennák száma (MIMO).\n\nAnyagtani szempontból a telefon a periódusos rendszer jó részét tartalmazza: a **kritikus nyersanyagok** (kobalt, lítium, ritkaföldfémek, gallium, indium, tantál) ellátási kockázata és a gyártás karbonlábnyoma (egy telefon élettartama alatti kibocsátásának kb. 80%-a a gyártásból származik) miatt a **hosszabb használat és javíthatóság** a leghatékonyabb környezetvédelmi lépés.',
      terms: ['digitalis-technika/cmos', 'digitalis-technika/memoriahierarchia', 'e-mobilitas/cellakemia', 'fizika-bsc/maxwell-egyenletek']
    },
    steps: [
      { icon: '⛏️', title: 'Kritikus nyersanyagok', text: 'Egy telefonban több mint 60 elem van. A **lítium** sós tavakból és kőzetből, a **kobalt** (az akkuhoz) nagyrészt a Kongói Demokratikus Köztársaságból származik – sokszor rossz munkakörülmények között bányásszák. A hangszóró és a rezgőmotor mágneseihez **ritkaföldfémek** (neodímium, prazeodímium) kellenek, a kijelzőhöz **indium**, a chipekhez **gallium**, a kondenzátorokhoz **tantál**, a csatlakozókhoz **arany**. Az EU ezeket „kritikus nyersanyagoknak” nevezi, mert nehéz őket pótolni, és kevés helyről érkeznek.', parts: ['akku', 'hangszoro', 'motor'] },
      { icon: '🏭', title: 'Chipek gyártása', text: 'A SoC, a memória és a modem chipjei a világ néhány nagy chipgyárában készülnek, **2–3 hónapos**, több száz lépéses fotolitográfiás eljárással (ezt a processzor modelljében részletesen megnézheted). A chipeket tokozzák és tesztelik, majd tekercsre csomagolva szállítják az összeszerelő üzemekbe.', parts: ['alaplap', 'memoria', 'antenna'] },
      { icon: '🧩', title: 'Alkatrészgyártás a beszállítóknál', text: 'Egy telefon több száz beszállító munkájából áll össze: külön gyár készíti a **kijelzőt**, a **fedőüveget**, az **akkut**, a **kameramodulokat**, a hangszórót, a **fémkeretet** (CNC-marással és eloxálással). Minden alkatrészt még a gyárban ellenőriznek, mielőtt továbbküldik.', parts: ['kijelzo', 'uveg', 'akku', 'kamera', 'keret'] },
      { icon: '🤖', title: 'SMT beültetés: az alaplap', text: 'Egy fémsablonon át **forrasztópasztát** nyomtatnak a nyomtatott áramkörre, majd **beültetőrobotok** óránként több tízezer apró alkatrészt helyeznek pontosan a helyére – a legkisebbek kisebbek egy homokszemnél. A lap egy **reflow kemencén** halad át, ahol kb. 240–250 °C-on a paszta megolvad, és minden alkatrész egyszerre beforrad. Kamerák és **röntgen** ellenőrzik a forrasztásokat, még a chipek alatt is.', parts: ['alaplap', 'memoria'] },
      { icon: '🔧', title: 'Összeszerelés', text: 'A végső szerelés nagy részben ma is **kézi munka**, robotokkal segítve: a keretbe kerül az alaplap, az akku, a kamerák, a hangszóró, a rezgőmotor és az USB-C csatlakozó; apró csatlakozókkal és szalagkábelekkel összekötik őket. Végül ráragasztják a **kijelzőt** és a **hátlapot**, és préseléssel vízzáróvá teszik a ragasztást.', parts: ['keret', 'alaplap', 'akku', 'kamera', 'hangszoro', 'motor', 'usbc', 'kijelzo', 'hatlap'] },
      { icon: '🧪', title: 'Tesztelés', text: 'Minden kész telefon több tucat automatikus teszten megy át: érintőképernyő, kijelzőhibák, kamerák **kalibrálása** (élesség, színek), mikrofonok és hangszóró, rádiók mérése zárt kamrában, töltés, szenzorok, és a **vízállóság** légnyomásos tesztje. A hibás darabokat javításra küldik.', parts: ['kijelzo', 'kamera', 'antenna', 'hangszoro'] },
      { icon: '📦', title: 'Szoftver és csomagolás', text: 'A telefonra felkerül az operációs rendszer, egyedi azonosítót (IMEI) kap, majd dobozba csomagolják. Egy nagy gyárban naponta **több százezer** telefon készül el.' },
      { icon: '♻️', title: 'Újrahasznosítás', text: 'A régi telefon **értékes nyersanyagbánya** („városi bányászat”): egymillió telefonból kb. 24 kg arany, 250 kg ezüst és 9 tonna réz nyerhető vissza. Az akkut külön kell kezelni, mert sérülten kigyulladhat – ezért **soha ne dobd a kommunális szemétbe**, hanem vidd elektronikai hulladékgyűjtőbe vagy a boltba. Még jobb, ha a telefont tovább használod, javíttatod, vagy továbbadod: a karbonlábnyom nagy része a gyártásból származik.', parts: ['akku', 'alaplap'] }
    ],
    history: [
      { year: '1973', text: 'Martin Cooper (Motorola) a világon elsőként **kézi mobiltelefonról** telefonál New York egyik utcáján. A készülék kb. 1 kg volt.' },
      { year: '1994', text: 'Megjelenik az **IBM Simon**, amelyet az első okostelefonnak tartanak: érintőképernyő, naptár, e-mail, fax, sőt alkalmazások – de az akkuja kb. 1 óráig bírta.' },
      { year: '2002', text: 'A **BlackBerry** telefonok teljes billentyűzettel és „mindig elérhető” e-maillel az üzleti világ kedvencei lesznek.' },
      { year: '2007', text: 'Az Apple bemutatja az **iPhone**-t: nagy kapacitív **többujjas érintőképernyő**, valódi webböngésző, szinte gombok nélkül. 2008-ban megnyílik az **App Store**.' },
      { year: '2008', text: 'Megjelenik az első **Android** telefon (HTC Dream / T-Mobile G1). A nyílt rendszer miatt ma a telefonok kb. háromnegyede androidos.' },
      { year: '2016', text: 'Terjednek a **többkamerás** rendszerek (kettő, később három-négy kamera): széles, ultraszéles és teleobjektív, a képeket szoftver fésüli össze.' },
      { year: '2019', text: 'Piacra kerülnek a nagy gyártók első **összecsukható** telefonjai hajlékony OLED kijelzővel, és elindulnak az első **5G** hálózatok, Magyarországon is.' },
      { year: 'ma', text: 'Évente kb. **1,2 milliárd** okostelefont adnak el. A fejlesztések fő iránya a beépített **mesterséges intelligencia**, a jobb kamera, a hosszabb akkuidő és a **javíthatóság**.' }
    ],
    quiz: [
      { q: 'Miért olyan mély a fekete szín egy OLED kijelzőn?', options: ['Mert a fekete pixelek egyszerűen ki vannak kapcsolva', 'Mert fekete festék van az üveg alatt', 'Mert a háttérvilágítás nagyon erős', 'Mert a fedőüveg sötétített'], answer: 0, explain: 'Az OLED-ben minden alpixel maga világít; ahol fekete a kép, ott nem világít semmi, és nem is fogyaszt.' },
      { q: 'Mi az a SoC egy telefonban?', options: ['Egyetlen chip, amelyben a CPU, a GPU, az NPU és más egységek is helyet kapnak', 'A töltőcsatlakozó neve', 'Egy fajta akkumulátor', 'A kamera képérzékelője'], answer: 0, explain: 'System on a chip – egylapkás rendszer: a számítógép szinte minden fő része egy lapkán van.' },
      { q: 'Melyik alkatrészhez kell a kobalt nagy része?', options: ['Az akkumulátor katódjához', 'A fedőüveghez', 'A fémkerethez', 'Az antennákhoz'], answer: 0, explain: 'A telefonakkuk katódja általában lítium-kobalt-oxid.' },
      { q: 'Mi történik SMT beültetéskor?', options: ['Robotok helyezik az alkatrészeket a forrasztópasztára, majd kemencében beforrasztják őket', 'Az üveget kálium-nitrát fürdőben edzik', 'A telefont vízállóságra tesztelik', 'A szilíciumot kristályként növesztik'], answer: 0, explain: 'SMT = felületszerelési technológia: paszta, beültetés, reflow kemence.' },
      { q: 'Hogyan érdemes megszabadulni egy régi telefontól?', options: ['Elektronikai hulladékgyűjtőbe vinni, vagy továbbadni, javíttatni', 'A kommunális szemétbe dobni', 'Elégetni', 'Elásni a kertben'], answer: 0, explain: 'A telefon értékes fémeket tartalmaz, a sérült akku pedig tüzet okozhat a szemétszállító autóban.' }
    ]
  });
})();
