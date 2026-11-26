/* Modell: FDM 3D nyomtató („ágyrázós”, Prusa i3 / Ender-3 jellegű) – izometrikus nézet.
 * Világkoordináták cm-ben: x = szélesség (0..40), y = mélység (0 hátul .. 40 elöl), z = magasság.
 * A portál (két oszlop + felső híd) a y = 20..23 síkban áll, a fűtött tálca előre-hátra (y) mozog,
 * az X-híd a nyomtatófejjel a Z-orsón fel-le jár. Az előlap a képen a bal alsó irányba néz. */
(function () {
  var K = 5.3, OX = 440, OY = 360;
  var I = STUDIE.draw.iso(OX, OY, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  var EDGE = ' stroke="rgba(0,0,0,.3)" stroke-width="0.8" stroke-linejoin="round"';
  function f1(n) { return (+n).toFixed(1); }
  function P(p) { return f1(p[0]) + ',' + f1(p[1]); }
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  function poly(pts, fill, extra) { return '<polygon points="' + pts.map(P).join(' ') + '" fill="' + fill + '"' + (extra == null ? EDGE : extra) + '/>'; }
  function path(pts, color, w, extra) { return '<polyline points="' + pts.map(P).join(' ') + '" fill="none" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '/>'; }
  function box(x, y, z, w, d, h, c) { return I.box(x, y, z, w, d, h, c, EDGE); }
  function planeZ(z, inner, extra) {
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + (-0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + OX + ',' + f1(OY - z * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function planeY(y, inner, extra) {
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',0,' + K + ',' + f1(OX - y * 0.866 * K) + ',' + f1(OY + y * 0.5 * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function cyl(axis, c, len, r, color, o) {
    o = o || {};
    var n = o.n || 24, s = '', i;
    function q(a, t) {
      var u = r * Math.cos(a), v = r * Math.sin(a);
      if (axis === 'y') return I.pt(c[0] + u, c[1] + t, c[2] + v);
      if (axis === 'x') return I.pt(c[0] + t, c[1] + u, c[2] + v);
      return I.pt(c[0] + u, c[1] + v, c[2] + t);
    }
    for (i = 0; i < n; i++) {
      var a0 = i / n * 2 * Math.PI, a1 = (i + 1) / n * 2 * Math.PI, m = (a0 + a1) / 2, f = Math.cos(m) + Math.sin(m);
      if (f <= -0.05) continue;
      var col = shade(color, 0.62 + 0.3 * (f + 0.05) / 1.47);
      s += '<polygon points="' + [q(a0, 0), q(a1, 0), q(a1, len), q(a0, len)].map(P).join(' ') + '" fill="' + col + '" stroke="' + col + '" stroke-width="0.5"/>';
    }
    if (o.noCap) return s;
    var cap = [];
    for (i = 0; i < n; i++) cap.push(q(i / n * 2 * Math.PI, len));
    return s + poly(cap, o.cap || shade(color, 1.08), ' stroke="rgba(0,0,0,.38)" stroke-width="0.7"');
  }
  /* NEMA 17 léptetőmotor (4,2 cm-es kocka) – a tengely iránya: axis, az előoldal felé */
  function stepper(x, y, z, axis) {
    var s = box(x, y, z, 4.2, 4.2, 0.9, '#2b2e34') + box(x, y, z + 0.9, 4.2, 4.2, 2.4, '#1c1f24') + box(x, y, z + 3.3, 4.2, 4.2, 0.9, '#2b2e34');
    if (axis === 'z') s += cyl('z', [x + 2.1, y + 2.1, z + 4.2], 0.4, 1.1, '#3a3f47') + cyl('z', [x + 2.1, y + 2.1, z + 4.6], 1.4, 0.25, '#c9ced6');
    if (axis === 'y') s += cyl('y', [x + 2.1, y + 4.2, z + 2.1], 1.4, 0.25, '#c9ced6');
    if (axis === 'x') s += cyl('x', [x + 4.2, y + 2.1, z + 2.1], 1.4, 0.25, '#c9ced6');
    return s;
  }

  var ZG = 17.5;          // az X-híd (gantry) magassága
  var NX = 20.5, NY = 27.5, NZ = 9.2;   // a fúvóka hegye
  var defs = '<defs>' +
    '<linearGradient id="n3-pei" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2b866"/><stop offset="1" stop-color="#b8893a"/></linearGradient>' +
    '<pattern id="n3-vent" patternUnits="userSpaceOnUse" width="1" height="1"><rect width="1" height="1" fill="#c9ced6"/><rect y=".55" width="1" height=".3" fill="#7d8590"/></pattern>' +
    '</defs>';
  var fC = I.pt(20, 20, 0);
  var backdrop = defs +
    '<text class="lbl" x="14" y="26" font-size="17">FDM 3D nyomtató</text>' +
    '<text class="lbl-muted" x="14" y="44">a tálca előre-hátra (Y), a fej jobbra-balra (X), a híd fel-le (Z) mozog</text>' +
    '<ellipse cx="' + f1(fC[0]) + '" cy="' + f1(fC[1] + 4) + '" rx="' + f1(36 * K) + '" ry="' + f1(21 * K) + '" fill="rgba(0,0,0,.05)"' + NS + '/>';

  /* ---------- Keret: alumínium profilok ---------- */
  var AL = '#aab3bf';
  var frame = box(2, 0, 0, 3, 40, 3, AL) + box(35, 0, 0, 3, 40, 3, AL) + box(5, 2, 0, 30, 3, 3, AL) + box(5, 35, 0, 30, 3, 3, AL);
  frame += box(2, 20, 3, 3, 3, 43, AL) + box(35, 20, 3, 3, 3, 43, AL) + box(2, 20, 46, 36, 3, 3, AL);
  // profilhornyok jelzése az előlapon
  frame += planeY(23.02, '<path d="M3.5 -4 V-45 M36.5 -4 V-45 M5.5 -47.5 H34.5" stroke="#7d8794" stroke-width=".25"/>', NS);
  frame += planeY(40.02, '<path d="M5.5 -1.5 H34.5" stroke="#7d8794" stroke-width=".25"/>', NS);
  // két Y-vezetősín a tálca alatt
  frame += box(11, 5, 3, 1, 30, 0.6, '#d9dde3') + box(28, 5, 3, 1, 30, 0.6, '#d9dde3');

  /* ---------- Léptetőmotorok: X, Y, Z ---------- */
  var motors = stepper(17.9, -4.4, 0.2, 'y');            // Y – hátul, a tálca szíját húzza
  motors += stepper(1.4, 23.4, 3.0, 'z');                // Z – a bal oszlop tövében, felfelé a trapézorsóval
  motors += stepper(38.2, 23.6, ZG - 1.6, 'x');          // X – a híd jobb végén
  motors += planeY(27.82, '<text x="40.3" y="' + (-(ZG + 0.5)) + '" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size="1.2" fill="#c9ced6">X</text>', NS);

  /* ---------- Szíjak (GT2) és szíjtárcsák ---------- */
  var belts = cyl('y', [20, -0.2, 2.3], 1.4, 0.8, '#d0a64a') + cyl('y', [20, 36.5, 2.3], 1.0, 0.8, '#c9ced6');   // Y szíjtárcsa + feszítő
  belts += path([I.pt(20, 0, 3.1), I.pt(20, 37, 3.1)], '#1c1f24', 1.6) + path([I.pt(20, 0, 1.5), I.pt(20, 37, 1.5)], '#1c1f24', 1.6);
  belts += cyl('x', [36.9, 25.7, ZG + 0.5], 1.3, 0.8, '#d0a64a') + cyl('x', [4.2, 25.7, ZG + 0.5], 1.0, 0.8, '#c9ced6');   // X szíjtárcsa + feszítő
  belts += path([I.pt(4.6, 26.5, ZG + 1.3), I.pt(37.2, 26.5, ZG + 1.3)], '#1c1f24', 1.6) + path([I.pt(4.6, 26.5, ZG - 0.3), I.pt(17, 26.5, ZG - 0.3)], '#1c1f24', 1.6) + path([I.pt(24, 26.5, ZG - 0.3), I.pt(37.2, 26.5, ZG - 0.3)], '#1c1f24', 1.6);

  /* ---------- Trapézorsó (Z) tengelykapcsolóval és anyával ---------- */
  var screw = cyl('z', [3.5, 25.5, 7.6], 1.6, 0.75, '#9aa3ae');   // tengelykapcsoló
  screw += cyl('z', [3.5, 25.5, 9.2], 36, 0.4, '#c9a86a', { cap: '#d8bb80' });
  var thr = []; for (var tz = 9.6; tz < 45; tz += 0.8) thr.push(I.pt(3.9, 25.5, tz)), thr.push(I.pt(3.1, 25.5, tz + 0.4));
  screw += path(thr, '#8e7240', 0.5, NS);
  screw += cyl('z', [3.5, 25.5, ZG - 1.4], 1.1, 1.1, '#c08a2c', { cap: '#d6a04a' });   // sárgaréz anya

  /* ---------- X-kocsi: a híd profilja és a fejet vivő kocsi ---------- */
  var xcar = box(1.2, 23.4, ZG - 1, 37, 2, 2, '#c3cad3');   // X-profil (a híd)
  xcar += box(0.6, 23.2, ZG - 2.4, 5, 3.2, 4.6, '#3a3f47');  // bal oldali vezetőkocsi a Z-orsóhoz
  xcar += box(17, 25.4, ZG - 2.5, 7.2, 0.6, 6.4, '#4a5260');  // a fej kocsilapja
  [[18.2, ZG + 2.6], [23, ZG + 2.6], [20.6, ZG - 1.8]].forEach(function (w) { xcar += cyl('y', [w[0], 25.2, w[1]], 0.3, 0.75, '#22262c'); });   // görgők

  /* ---------- Extruder (direkt hajtású, saját motorral) ---------- */
  var extr = box(18, 26.0, ZG + 3.5, 5, 3.6, 2.4, '#e46a2e');
  extr += stepper(18.4, 26.1, ZG + 5.9, 'none').replace(/#1c1f24/g, '#23262c');
  extr += cyl('z', [20.5, 27.8, ZG + 10.1], 0.6, 0.45, '#9aa3ae');   // betöltőnyílás
  extr += planeY(29.62, '<circle cx="21.8" cy="' + (-(ZG + 4.7)) + '" r=".7" fill="#22262c"/><circle cx="21.8" cy="' + (-(ZG + 4.7)) + '" r=".35" fill="#c08a2c"/><path d="M18.6 ' + (-(ZG + 3.9)) + ' h2" stroke="#8a3a14" stroke-width=".2"/>', NS);

  /* ---------- Hotend: hűtőborda, ventilátor, fűtőblokk, fúvóka, termisztor ---------- */
  var hot = '';
  for (var fz = ZG - 1.2; fz <= ZG + 3.0; fz += 0.7) hot += cyl('z', [NX, NY, fz], 0.3, 1.25, '#bcc4ce', { cap: '#d4dae1' });   // bordák
  hot += cyl('z', [NX, NY, ZG - 3.8], 2.6, 0.35, '#d9dde3');   // torok (heatbreak)
  hot += box(NX - 1.5, NY - 1.0, ZG - 6.3, 3.0, 2.0, 1.6, '#c7ccd3');   // fűtőblokk (alumínium)
  hot += cyl('y', [NX - 0.6, NY + 1.0, ZG - 5.5], 0.08, 0.45, '#b2462c', { cap: '#d9603f' });   // fűtőpatron vége
  hot += path([I.pt(NX - 0.6, NY + 1.1, ZG - 5.5), I.pt(NX - 2.6, NY + 2.6, ZG - 4.6), I.pt(NX - 3.4, NY + 2.6, ZG - 1)], '#d23a3a', 0.8, NS);
  hot += cyl('y', [NX + 0.8, NY + 1.0, ZG - 5.2], 0.08, 0.22, '#e8e2d0');   // termisztor
  hot += path([I.pt(NX + 0.8, NY + 1.1, ZG - 5.2), I.pt(NX + 2.4, NY + 2.4, ZG - 4.2), I.pt(NX + 3.2, NY + 2.4, ZG - 1)], '#f2f2f2', 0.7, NS);
  // sárgaréz fúvóka
  var n1 = I.pt(NX - 0.6, NY, ZG - 6.3), n2 = I.pt(NX + 0.6, NY, ZG - 6.3), n3 = I.pt(NX, NY, NZ);
  hot += '<polygon points="' + P(n1) + ' ' + P(n2) + ' ' + P(n3) + '" fill="#d6a04a" stroke="#8a6630" stroke-width=".6"/>';
  // ventilátor a bordák előtt, kissé balra
  hot += box(NX - 5.8, NY - 1.6, ZG - 2.1, 0.8, 3.2, 3.6, '#22262c');
  hot += '<g' + NS + '>' + (function () { var c = I.pt(NX - 5.0, NY, ZG - 0.3), s = ''; for (var i = 0; i < 5; i++) { s += '<ellipse cx="' + f1(c[0] + 0.3) + '" cy="' + f1(c[1]) + '" rx="' + f1(0.5 * K) + '" ry="' + f1(1.25 * K) + '" transform="rotate(' + (i * 36 - 30) + ' ' + f1(c[0] + 0.3) + ' ' + f1(c[1]) + ')" fill="none" stroke="#5d6672" stroke-width=".5"/>'; } return s; })() + '</g>';

  /* ---------- Fűtött tálca (PEI-lappal) ---------- */
  var bed = box(8, 8, 3.8, 24, 24, 0.5, '#7d8590');   // kocsi
  bed += box(8, 8, 4.6, 24, 24, 0.6, '#c84a3a');      // alumínium fűtőlap (vörös szigetelés alatta)
  bed += box(8, 8, 5.2, 24, 24, 0.25, '#2b2e34') + I.face(8, 8, 5.45, 24, 24, 'url(#n3-pei)', ' stroke="#8a6630" stroke-width=".8"');
  bed += planeZ(5.47, '<text x="12" y="10.8" font-family="sans-serif" font-weight="800" font-size="1.3" fill="#7a5a26" opacity=".7">PEI</text>' +
    '<path d="M9 31 h3 M9 31 v-3" stroke="#7a5a26" stroke-width=".25"/>', NS);
  [[9, 9], [31, 9], [31, 31], [9, 31]].forEach(function (s) { bed += cyl('z', [s[0], s[1], 4.6], 1.0, 0.55, '#d9dde3'); });   // szintezőcsavarok
  bed += path([I.pt(32, 12, 5), I.pt(36, 13, 3), I.pt(39, 13, 2)], '#d23a3a', 1.4, NS);

  /* ---------- Alaplap ---------- */
  var mb = box(39.5, 24, 0, 6, 12, 1.2, '#3a3f47');   // tok alja
  mb += box(40, 24.5, 1.2, 5, 11, 0.25, '#1d5f3b');
  mb += box(41.2, 27, 1.45, 1.8, 1.8, 0.35, '#1c2027');   // MCU
  [25.2, 31.0, 33.2].forEach(function (y) { mb += box(40.6, y, 1.45, 1.2, 1.2, 0.6, '#5d2fa0'); });   // léptetőmotor-meghajtók hűtővel
  mb += box(43.4, 25.0, 1.45, 1.0, 2.4, 0.9, '#e9e3cf') + box(43.4, 30.4, 1.45, 1.0, 4.0, 0.9, '#e9e3cf');   // csatlakozók
  mb += box(40.6, 29.2, 1.45, 0.8, 1.0, 0.5, '#2a2d33');   // MOSFET a tálcafűtéshez
  mb += planeZ(1.81, '<text x="42.1" y="27.9" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size=".4" fill="#c9ced6">MCU</text>', NS);
  mb += box(30, 40.4, 0, 9, 1.4, 5.4, '#1c1f24');   // kijelzőegység elöl
  mb += planeY(41.82, '<rect x="30.8" y="-4.8" width="5.4" height="3.2" fill="#2f6db3"/><text x="33.5" y="-3.2" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-size=".75" fill="#e6f1ff">210/60°</text><circle cx="37.6" cy="-2.7" r="1" fill="#5d6672"/>', NS);

  /* ---------- Tápegység ---------- */
  var psu = box(39.5, 4, 0, 6, 14, 7, '#b4bcc6');
  psu += planeY(18.02, '<rect x="40.2" y="-6.4" width="4.6" height="5.6" fill="url(#n3-vent)"/>', NS);
  psu += planeZ(7.02, '<text x="42.5" y="9.6" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size="1.3" fill="#5d6672">24 V</text><text x="42.5" y="11.6" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="700" font-size="1.1" fill="#5d6672">350 W</text>', NS);
  psu += path([I.pt(42.5, 18, 3), I.pt(42.5, 23.5, 1)], '#d23a3a', 1.2) + path([I.pt(43.5, 18, 3), I.pt(43.5, 23.5, 1)], '#1c1f24', 1.2);

  /* ---------- Végálláskapcsolók és szintezőszenzor ---------- */
  var sens = box(5.4, 23.4, ZG + 1, 1.6, 1.0, 1.2, '#d23a3a');   // X végállás a híd bal végén
  sens += box(13.5, 2.0, 3.0, 1.6, 1.2, 1.2, '#d23a3a');   // Y végállás hátul
  sens += box(4.6, 22.0, 4.2, 1.0, 1.6, 1.2, '#d23a3a');   // Z végállás a bal oszlopon
  sens += cyl('z', [24.6, 27.0, ZG - 4.2], 3.4, 0.55, '#2b2e34', { cap: '#3a3f47' }) + cyl('z', [24.6, 27.0, ZG - 4.7], 0.5, 0.3, '#e46a2e');   // induktív/BLTouch-szerű szonda
  sens += I.box(24.0, 26.3, ZG - 0.8, 1.4, 1.4, 0.8, '#2f6db3');

  /* ---------- Filament: tekercs + szál + a készülő tárgy ---------- */
  var fil = box(19.2, 21.0, 49, 1.6, 1.6, 2.5, '#3a3f47');   // tartó
  fil += cyl('x', [16.8, 21.8, 56], 6.4, 7, '#2f9e6a', { cap: '#3bb57c' });
  fil += poly((function () { var p = []; for (var i = 0; i < 24; i++) { var a = i / 24 * 2 * Math.PI; p.push(I.pt(23.25, 21.8 + 2.2 * Math.cos(a), 56 + 2.2 * Math.sin(a))); } return p; })(), '#2b2e34', ' stroke="none"' + NS);
  fil += path([I.pt(20, 28.6, 52), I.pt(20.4, 28.8, 40), I.pt(20.5, 27.8, ZG + 10.5)], '#3bb57c', 1.3);
  // a félig kész nyomat a tálcán (rétegekkel)
  fil += box(14, 21, 5.47, 7, 7, 3.6, '#3bb57c');
  for (var lz = 5.9; lz < 9; lz += 0.45) fil += path([I.pt(14, 28, lz), I.pt(21, 28, lz), I.pt(21, 21, lz)], '#2a8a5c', 0.6, NS);
  fil += box(16.2, 23.2, 9.07, 2.6, 2.6, 0.1, '#5fd39b');

  STUDIE.addModel({
    id: 'nyomtato3d',
    title: '3D nyomtató (FDM)',
    icon: '🖨️',
    color: '#e46a2e',
    category: 'Számítástechnika',
    keywords: '3D nyomtató 3D nyomtatás FDM FFF additív gyártás filament PLA PETG ABS extruder hotend fúvóka fűtőblokk termisztor fűtött tálca PEI léptetőmotor NEMA 17 mikrolépés GT2 szíj trapézorsó alaplap tápegység végálláskapcsoló szintező szenzor BLTouch G-code szeletelő slicer rétegvastagság üvegesedési hőmérséklet Marlin Klipper RepRap Prusa',
    summary: 'Egy számítógép-vezérelt ragasztópisztoly: megolvaszt egy műanyag szálat, és tized milliméteres rétegekben, vonalról vonalra „rajzolja” egymásra a tárgyat, amíg a semmiből kézzelfogható alkatrész lesz.',
    scale: 'kb. 45 × 45 × 60 cm, 7–9 kg; a nyomtatható tér kb. 22 × 22 × 25 cm',
    viewBox: '0 0 900 700',
    backdrop: backdrop,
    intro: 'Az FDM-nyomtató (fused deposition modeling, olvasztott anyagrétegzés) egy **műanyag szálat** (filamentet) tol egy forró **fúvókába**, ahol az megolvad, és vékony csíkban kifolyik. A fúvóka a **fűtött tálca** fölött mozog: jobbra-balra (**X**), a tálca előre-hátra (**Y**), és minden réteg után a fej egy kicsit feljebb lép (**Z**). Így épül fel a tárgy alulról felfelé, **rétegről rétegre**.\n\nA mozgásokat **léptetőmotorok** végzik **szíjakon** és egy **trapézorsón** keresztül. Mindent az **alaplap** irányít: egy szöveges utasításlistát, a **G-code**-ot hajtja végre. Ezt a listát a számítógépen egy **szeletelő** (slicer) program készíti a 3D modellből.',
    parts: [
      {
        id: 'keret', z: 1, name: 'Keret (alumíniumprofilok)', svg: frame, explode: [0, 0], badge: B(3.5, 21.5, 40), en: 'frame (aluminium extrusions)',
        terms: ['mechanika/lehajlas', 'mechanika/szabad-rezges'],
        what: 'A nyomtató **váza**: egy alsó téglalap és egy kapu alakú **portál** (két oszlop és egy felső híd). Ehhez van rögzítve minden más. Minél **merevebb**, annál pontosabb a nyomat, mert a gyorsan mozgó fej nem rázza meg a gépet.',
        madeOf: '**Alumínium** zártszelvények (extrudált profilok) hosszanti hornyokkal, amelyekbe csavarok és anyák csúsztathatók. A sarkokban acél vagy öntött alumínium sarokelemek és csavarok.',
        how: 'A profilokat **extrudálással** készítik: a felmelegített alumínium tömböt egy formázó nyíláson préselik át, mint a fogkrémet. Utána méretre vágják, a végükbe menetet fúrnak, és a gépet csavarokkal szerelik össze.',
        uni: 'A nyomtatási sebességet a mozgó tömegek gyorsulásakor fellépő erők és a keret **rezgései** korlátozzák: a fej hirtelen irányváltása rezgést gerjeszt, amely a falakon hullámos mintaként (**ringing**, „szellemkép”) jelenik meg. A merevség (`k`) növelése és a mozgó tömeg (`m`) csökkentése a sajátfrekvenciát (`f = √(k/m)/2π`) emeli. A modern firmware-ek ezt **bemeneti jelformálással** (input shaping) is kompenzálják: a gyorsulásmérővel megmért rezonanciákat a mozgásprofilból kiszűrik.',
        fact: 'Sok nyomtató ma gyorsulásmérővel „megméri” a saját rezgéseit, és úgy torzítja a mozgást, hogy a rezgések kioltsák egymást.'
      },
      {
        id: 'motorok', z: 4, name: 'Léptetőmotorok (X, Y, Z)', svg: motors, explode: [-30, 95], badge: B(3.5, 25.5, 7.2), link: 'villanymotor', en: 'stepper motors (NEMA 17)',
        terms: ['msc-beagyazott/timer-pwm', 'msc-beagyazott/gpio', 'szabalyozas/vezerles-szabalyozas'],
        what: 'A **léptetőmotor** nem folyamatosan forog, hanem pontos kis **lépésekben**: egy fordulat általában 200 lépés, azaz lépésenként 1,8°. Így az alaplap pontosan tudja, hová mozgott a fej, anélkül hogy mérné. Három motor mozgatja a három tengelyt: az **X** a fejet jobbra-balra, az **Y** a tálcát előre-hátra, a **Z** a hidat fel-le.',
        madeOf: 'Acéllemezből rétegelt, sok foggal ellátott állórész **rézhuzal-tekercsekkel**, és egy fogazott forgórész **állandó mágnessel**. Alumínium ház, golyóscsapágyak. A szabványos „NEMA 17” méret 42 × 42 mm-es homlokfelületet jelent.',
        how: 'A fogazott lemezeket kivágják és összepréselik, a tekercseket gép tekercseli, a forgórészt felmágnesezik. Összeszerelés után mérik a tartónyomatékot és a lépéspontosságot.',
        uni: 'Az alaplap **léptetőmotor-meghajtói** lépés- (STEP) és irányjelet (DIR) kapnak, és a két tekercs áramát szinuszosan osztják el: ez a **mikrolépés** (pl. 1/16 → 3200 mikrolépés/fordulat). Egy 20 fogas GT2 szíjtárcsánál (40 mm/fordulat) ez **80 lépés/mm**. A rendszer **nyílt hurkú** (vezérlés, nem szabályozás): ha a terhelés túl nagy, a motor **lépést veszít**, és a nyomat elcsúszik („layer shift”), mert erről a vezérlő nem tud. A lépésimpulzusokat időzítő-megszakítások generálják, gyorsulási (trapéz- vagy S-) profil szerint.',
        fact: 'A léptetőmotor álló helyzetben is áramot vesz fel: így tartja meg a pozícióját. Ezért melegszik akkor is, ha a nyomtató épp nem mozog.'
      },
      {
        id: 'szijak', z: 3, name: 'Szíjak és szíjtárcsák (GT2)', svg: belts, explode: [-215, 170], badge: B(20, 34, 3.1), en: 'GT2 timing belts and pulleys',
        terms: ['mechanika/hooke', 'mechanika/rugalmassagi-modulus'],
        what: 'A **fogas szíjak** alakítják a motor forgását egyenes vonalú mozgássá: az X-szíj a fejet húzza jobbra-balra, az Y-szíj a tálcát előre-hátra. A szíj fogai pontosan illeszkednek a motor tengelyén lévő **fogaskerékszerű szíjtárcsába**, így nem csúszik meg. A szíj másik vége egy szabadon forgó **feszítőgörgőn** fordul vissza.',
        madeOf: '**Gumi** vagy poliuretán, belül **üvegszálas** vagy acélhuzal erősítéssel, hogy ne nyúljon. A „GT2” jelölés 2 mm-es fogosztást jelent. A szíjtárcsák alumíniumból vannak.',
        how: 'A szíjat egy fogazott hengeren öntik vagy vulkanizálják az erősítőszálak köré, majd keskeny csíkokra vágják. A szíjtárcsákat esztergálják és marják, a tengelyre hernyócsavarral rögzítik.',
        uni: 'A szíj egy **rugó**: merevsége `k = E·A / L` arányában csökken a szabad hosszal, ezért a hosszú szíj és a nagy mozgó tömeg alacsony sajátfrekvenciát ad (ez a „ringing” egyik oka). A túl laza szíj holtjátékot (backlash) okoz, a túl feszes a csapágyakat terheli. A szíjfeszességet a szíj rezgési frekvenciájából lehet megmérni, ahogy a gitárhúrt hangolják: `f = (1/2L)·√(F/μ)`.',
        fact: 'A szíj feszességét egy telefonos hangológéppel is beállíthatod: pengesd meg, mint egy húrt, és mérd a hangmagasságát.'
      },
      {
        id: 'orso', z: 2, name: 'Trapézorsó (Z-tengely)', svg: screw, explode: [-215, -60], badge: B(3.5, 25.5, 36), en: 'trapezoidal lead screw (T8) with brass nut',
        terms: ['mechanika/surlodas', 'mechanika/nyomatek'],
        what: 'Egy hosszú **menetes rúd**, amelyet a Z-motor forgat. Rajta egy **sárgaréz anya** ül, amely a hidat (a fejjel együtt) viszi: ha a rúd forog, az anya fel- vagy lecsavarodik rajta. Így a forgásból nagyon pontos, lassú függőleges mozgás lesz. A tipikus T8-as orsón egy fordulat 8 mm-t emel.',
        madeOf: '**Rozsdamentes acél** rúd trapéz alakú menettel, **sárgaréz** (réz–cink ötvözet) anya. A motortengelyhez egy rugalmas alumínium **tengelykapcsoló** köti.',
        how: 'A menetet **hengerléssel** készítik: a rudat edzett, menetprofilos görgők között gördítik, így az anyag nem forgácsolódik le, hanem alakot vált, és erősebb lesz. Az anyát esztergálják és menetet vágnak bele.',
        uni: 'A trapézorsó **önzáró**: a menet emelkedési szöge kisebb a súrlódási szögnél (`tan α < μ`), ezért a híd a motor kikapcsolásakor sem csúszik le. A hatásfok emiatt alacsony (kb. 30–40%). Egy 8 mm emelkedésű orsónál 1/16 mikrolépéssel 3200/8 = **400 lépés/mm** a felbontás, így a rétegvastagság pontosan beállítható. A tengelykapcsoló a motor és az orsó tengelyének kis eltérését nyeli el; ha az orsó nem egyenes, a falon szabályos hullámzás („Z-wobble”) jelenik meg.',
        fact: 'A trapézorsó miatt nem zuhan le a nyomtatófej, amikor kikapcsolod a gépet: a súrlódás „befogja” a menetet.'
      },
      {
        id: 'xkocsi', z: 6, name: 'X-híd és fejkocsi (vezetés)', svg: xcar, explode: [-40, -70], badge: B(9, 24.4, ZG + 1), en: 'X gantry and print-head carriage with V-wheels',
        terms: ['mechanika/surlodas', 'mechanika/lehajlas'],
        what: 'A vízszintes **híd** (X-profil) és a rajta guruló **kocsi**, amely a nyomtatófejet viszi. A kocsi kis **görgői** a profil hornyában futnak, így a fej simán és lötyögés nélkül mozog jobbra-balra. A híd a két oszlopon fel-le csúszik, a bal oldalán a trapézorsó anyája emeli.',
        madeOf: 'Alumíniumprofil, alumínium vagy műanyag kocsilap, **POM** (poliacetál) műanyag görgők golyóscsapágyakkal. Más gépeken a görgők helyett edzett acélrudak és lineáris golyóscsapágyak vagy **lineáris sínek** vannak.',
        how: 'A kocsilapot alumíniumból marják vagy lézervágják, a görgőket fröccsöntik, a csapágyakat beléjük préselik. A görgőket excentrikus csavarral állítják be: épp annyira, hogy ne lötyögjenek, de könnyen guruljanak.',
        uni: 'A vezetésnek a mozgás irányán kívül minden irányban **merevnek** kell lennie. A V-görgős megoldás olcsó, de a görgők idővel kopnak és laposodnak; a lineáris sín előfeszített golyói nagyobb merevséget és pontosságot adnak. A hídon lévő fej tömege a gyorsulásokkal (`F = m·a`) dinamikus terhelést ad, ezért a nagy sebességű gépeknél (pl. CoreXY elrendezés) a motorok nem mozognak a fejjel.',
        fact: 'Az „ágyrázós” nyomtatóknál a tálca a tárggyal együtt előre-hátra mozog; a magas, vékony tárgyak ezért a nyomtatás végére kissé meginoghatnak.'
      },
      {
        id: 'extruder', z: 9, name: 'Extruder', svg: extr, explode: [95, -150], badge: B(18, 28, ZG + 7.5), en: 'direct-drive extruder',
        terms: ['mechanika/surlodas', 'mechanika/nyomatek'],
        what: 'Az extruder **tolja** a filamentet a forró fúvókába. Egy kis léptetőmotor egy **fogazott kereket** forgat, amely egy rugós görgővel összeszorítja a szálat, és milliméterre pontosan előre (vagy visszafelé) tolja. Ha a szálat visszahúzza (**retrakció**), a fúvókából nem csöpög az anyag, amikor a fej üresen átmegy egyik helyről a másikra.',
        madeOf: 'Léptetőmotor, **edzett acél** vagy sárgaréz fogazott hajtókerék (gyakran két kerék és fogaskerék-áttétel), rugós szorítókar, műanyag vagy alumínium ház.',
        how: 'A hajtókerék fogait marják vagy hengerlik, majd edzik, hogy a kemény (pl. szénszállal töltött) filament se koptassa. A házat fröccsöntik, marják vagy akár 3D nyomtatják.',
        uni: 'A tolt anyagmennyiség a szál keresztmetszetéből adódik: 1,75 mm-es szálnál `A = π·(0,875 mm)² ≈ 2,4 mm²`, így 1 mm szál ≈ 2,4 mm³ műanyag. A szeletelő az extrudálandó hosszt (E-tengely) úgy számolja, hogy a lerakott vonal térfogata (rétegvastagság × vonalszélesség × hossz) egyezzen. A legnagyobb **térfogatáram** (mm³/s) a hotend olvasztóképességétől függ: e fölött a szál nem olvad meg elég gyorsan, és az extruder kereke „megeszi” a szálat. A **direkt** extruder a fejen ül (jobb a retrakció, rugalmas szálat is tud), a **Bowden** a vázon (könnyebb a fej).',
        fact: 'Egy 1 kg-os PLA tekercsen kb. 330 méter 1,75 mm-es szál van.'
      },
      {
        id: 'hotend', z: 8, name: 'Hotend (fűtőblokk, fúvóka, termisztor)', svg: hot, explode: [-235, 0], badge: B(NX - 1.5, NY + 1, ZG - 5.5), en: 'hotend: heat sink, heat break, heater block, nozzle, thermistor',
        terms: ['szabalyozas/pid-szabalyozo', 'msc-beagyazott/adc-periferia', 'fizika-bsc/belso-energia'],
        lesson: 'fiz-alap/hotan',
        what: 'A nyomtató „forró vége”. Az **alumínium fűtőblokkba** egy **fűtőpatron** és egy **termisztor** (hőérzékelő) van bedugva; a fűtőblokk 190–260 °C-ra melegíti a **sárgaréz fúvókát**, amelyen át a megolvadt műanyag kifolyik. A fúvóka nyílása általában **0,4 mm**. Felette egy **hűtőborda** és egy ventilátor gondoskodik róla, hogy a szál csak a fúvókában olvadjon meg, feljebb ne.',
        madeOf: 'Alumínium fűtőblokk, **sárgaréz** (vagy edzett acél) fúvóka, vékony falú acél vagy titán **hőhíd** (heatbreak), alumínium hűtőborda, kerámia fűtőpatron (24 V, kb. 40–60 W), üveggyöngybe öntött **NTC termisztor**.',
        how: 'A fúvókát sárgaréz rúdból esztergálják, a pici furatot fúrással készítik és polírozzák. A fűtőblokkot alumíniumból marják. A hőhidat nagyon vékony falúra esztergálják, hogy kevés hőt vezessen.',
        uni: 'A hőmérsékletet **PID-szabályozó** tartja: a termisztor ellenállásából (feszültségosztó + **ADC**, Steinhart–Hart vagy táblázat) számolt hőmérséklet és az alapjel különbségéből a fűtés **PWM**-kitöltését állítja. A PID-paramétereket önhangolással (autotune) lehet beállítani. A **hőhíd** a hőáramot `Q̇ = λ·A·ΔT / L` szerint korlátozza: vékony fal (kis A), rossz hővezető anyag (kis λ). Ha a hűtés kevés, a szál a hőhídban meglágyul és eltömődik (heat creep). Biztonsági funkció a **hőfutás-védelem** (thermal runaway): ha a hőmérséklet nem követi a fűtést (pl. kiesett a termisztor), a firmware leállítja a gépet.',
        fact: 'A fúvóka nyílása mindössze 0,4 mm: körülbelül négy emberi hajszál vastagsága.'
      },
      {
        id: 'talca', z: 5, name: 'Fűtött tálca', svg: bed, explode: [40, 190], badge: B(12, 30, 5.5), en: 'heated bed with PEI build plate',
        terms: ['mechanika/hofeszultseg', 'elektronika/mosfet-kapcsolo', 'szabalyozas/ketallasu'],
        what: 'Erre nyomtat a gép. A tálca **fűtött** (PLA-hoz kb. 60 °C, ABS-hez 100 °C körül), hogy az első réteg jól **megtapadjon**, és a tárgy széle hűlés közben ne **vetemedjen** fel. A felületén gyakran egy rugalmas, mágnessel tartott acéllap van **PEI** bevonattal: ha a lapot meghajlítod, a kész tárgy lepattan róla.',
        madeOf: '**Alumíniumlap**, alatta öntapadós **szilikon fűtőfólia** vagy nyomtatott áramköri fűtőpálya és termisztor, alul hőszigetelés. Felül mágneses fólia és rugóacél lap PEI (polieterimid) bevonattal, vagy üveglap.',
        how: 'Az alumíniumlapot síkra marják vagy hengerelt lemezből vágják, a fűtőfóliát felragasztják. A PEI-t porszórással vagy fóliaként viszik fel az acéllapra, és kiégetik.',
        uni: 'A **vetemedés** oka a **hőfeszültség**: a már lerakott, kihűlő réteg zsugorodik (`ε = α·ΔT`), és a felette lévő, még melegebb rétegek húzzák. A tálca az alsó rétegeket az anyag **üvegesedési hőmérséklete** (Tg) közelében tartja, ahol a polimer még kissé rugalmas, így a feszültség részben leépül. A fűtést az alaplap egy **MOSFET**-tel kapcsolja, a hőmérsékletet PID vagy kétállású (bang-bang) szabályozással tartja. A tálca **síkhibáját** a szintezőszenzor méri, a firmware a Z-mozgással kompenzálja.',
        fact: 'A kész nyomatot érdemes megvárni, amíg a tálca kihűl: sok anyag ilyenkor magától leválik, mert a tálca és a műanyag másképp zsugorodik.'
      },
      {
        id: 'alaplap', z: 7, name: 'Alaplap (vezérlő) és kijelző', svg: mb, explode: [200, 100], badge: B(42, 33, 2), link: 'processzor', en: 'mainboard with microcontroller and stepper drivers',
        terms: ['msc-beagyazott/mcu-architektura', 'msc-beagyazott/timer-pwm', 'msc-beagyazott/megszakitas-nvic', 'msc-beagyazott/valos-ideju'],
        lesson: 'informatika/programozas',
        what: 'A nyomtató **agya**. Soronként beolvassa a **G-code** fájlt (memóriakártyáról vagy hálózatról), és végrehajtja: lépésimpulzusokat küld a motoroknak, fűti a hotendet és a tálcát, figyeli a hőérzékelőket és a végállásokat. Elöl egy **kijelző** és egy forgatógomb van a kezeléshez.',
        madeOf: 'Nyomtatott áramköri lap egy 32 bites **mikrokontrollerrel** (pl. ARM Cortex-M), négy-öt **léptetőmotor-meghajtó** chippel, a fűtések kapcsolására **MOSFET**-ekkel, memóriakártya-olvasóval és sok csatlakozóval.',
        how: 'SMT-technológiával szerelik (forrasztópaszta, beültetőgép, kemence), a léptetőmeghajtókra kis hűtőbordát ragasztanak. A firmware (pl. **Marlin**, **Klipper**, **RepRapFirmware**) nyílt forrású; a felhasználó maga is lefordíthatja és feltöltheti.',
        uni: 'A firmware **valós idejű** feladata a mozgástervezés: a G-code szakaszokat egy előretekintő pufferben (look-ahead) gyűjti, kiszámolja a csatlakozási sebességeket és a gyorsulási profilokat, majd **időzítő-megszakításokból** adja ki a lépésimpulzusokat (akár több tízezret másodpercenként). A Klipper ezt megosztja: egy erősebb gép (pl. Raspberry Pi) tervez, a mikrokontroller csak pontos időbélyegek szerint lép. A léptetőmeghajtók (pl. TMC) mikrolépéssel, csendes áramszabályozással dolgoznak, és érzékelni tudják a motor elakadását is.',
        fact: 'A legtöbb hobbinyomtató firmware-je nyílt forráskódú: bárki megnézheti és módosíthatja, ahogy a RepRap mozgalom indulásakor elképzelték.'
      },
      {
        id: 'tap', z: 4.5, name: 'Tápegység', svg: psu, explode: [190, 10], badge: B(42.5, 11, 7), en: 'switch-mode power supply (24 V)',
        terms: ['elektronika/kapcsolouzemu-tap', 'villamosmernoki/transzformator'],
        lesson: 'villanyszereles/biztonsag',
        what: 'A hálózati **230 V-os** váltakozó feszültséget **24 V** (régebbi gépeknél 12 V) egyenfeszültséggé alakítja. A legtöbb áramot a fűtött tálca és a hotend fűtése veszi fel; a motorok és az elektronika ehhez képest keveset.',
        madeOf: 'Fém ház szellőzőnyílásokkal, benne **kapcsolóüzemű** tápegység: egyenirányító, nagyfeszültségű kondenzátorok, gyorsan kapcsoló tranzisztorok, kis **nagyfrekvenciás transzformátor**, kimeneti szűrő, és gyakran egy hűtőventilátor.',
        how: 'A panelt részben furatszerelt, részben SMT-alkatrészekkel szerelik, a transzformátort tekercselik. Minden darabot nagyfeszültségű szigetelési próbán és terhelési teszten visznek át.',
        uni: 'A kapcsolóüzemű táp a hálózati feszültséget egyenirányítja, majd több tíz kHz-en kapcsolgatva egy kis, nagyfrekvenciás transzformátoron viszi át. A nagy frekvencia miatt a transzformátor sokkal kisebb lehet, mint egy hálózati (50 Hz-es) transzformátor, a hatásfok pedig 85–90%. A 24 V előnye a 12 V-hoz képest, hogy ugyanakkora teljesítményhez fele akkora áram kell (`P = U·I`), így a vezetékek és csatlakozók kevésbé melegszenek.',
        fact: 'A 3D nyomtatók tűzeseteinek egy része nem a hotendből, hanem a túlmelegedett, rosszul bekötött tápcsatlakozókból indult. Ezért fontos a jó csatlakozás és a hőfutás-védelem.'
      },
      {
        id: 'szenzorok', z: 10, name: 'Végálláskapcsolók és szintezőszenzor', svg: sens, explode: [70, 55], badge: B(24.6, 27, ZG - 1), en: 'endstops and bed-levelling probe',
        terms: ['msc-beagyazott/gpio', 'msc-beagyazott/megszakitas-nvic', 'elektronika/komparator'],
        what: 'A léptetőmotorok nem tudják, hol vannak bekapcsoláskor. Ezért a gép először minden tengelyt a végére mozgat, amíg egy kis **végálláskapcsoló** (piros dobozok) be nem kattan: ez a **nullpont** (homing). A fej melletti **szintezőszenzor** (szonda) a tálca sok pontján megméri, milyen messze van a felület, és a gép ebből térképet készít a tálca egyenetlenségeiről.',
        madeOf: 'A végállás egy egyszerű **mikrokapcsoló** vagy egy optikai (fénykapus) érzékelő. A szonda lehet **induktív** (fémet érzékel), kapacitív, vagy egy kis kitolható tűs, mechanikus érintőszonda (BLTouch-típusú).',
        how: 'A mikrokapcsolókat tömegesen gyártják, a szondákban tekercs, oszcillátor vagy mágnes és Hall-érzékelő van. A nyomtatóba szerelve egyszer kalibrálni kell a szonda és a fúvóka közötti eltolást (Z-offset).',
        uni: 'A végállás jele a mikrokontroller egy **GPIO** bemenetére érkezik, általában **megszakítást** vált ki, hogy a motor azonnal megálljon. A pontosabb nullponthoz a gép kétszer közelít: gyorsan, majd visszahúzódva lassan. Az automatikus tálcaszintezés a mért pontokra **felületet illeszt** (bilineáris vagy háló), és nyomtatás közben a Z-t az aktuális (x, y) helyhez korrigálja; néhány mm után a korrekciót fokozatosan kivezeti (fade height). Egyes léptetőmeghajtók végállás nélkül, a motor elakadásából (**sensorless homing**) is érzékelik a tengely végét.',
        fact: 'A sikeres nyomtatás legfontosabb lépése az első réteg: ha a fúvóka egy hajszállal is túl magasan van, a műanyag nem tapad meg.'
      },
      {
        id: 'filament', z: 12, name: 'Filament (és a készülő tárgy)', svg: fil, explode: [235, -100], badge: B(20, 25, 50), en: 'filament spool and the printed part',
        terms: ['szerves-kemia/polimer', 'mechanika/hofeszultseg'],
        lesson: 'fiz-alap/hotan',
        what: 'A nyomtató „tintája”: egy tekercsre csévélt, általában **1,75 mm** vastag **műanyag szál**. A legnépszerűbb a **PLA** (könnyen nyomtatható, kukoricakeményítőből vagy cukornádból készül), a **PETG** (szívósabb, vízálló) és az **ABS** (hőálló, de nyomtatás közben vetemedik és szagos). A tálcán a félig kész tárgy látszik: jól láthatók a vékony **rétegek**.',
        madeOf: '**Hőre lágyuló műanyagok** (termoplasztok): PLA (politejsav), PETG (glikollal módosított poliészter), ABS (akrilnitril–butadién–sztirol), és sok más (TPU rugalmas szál, nejlon, szénszállal töltött anyagok). Színezékkel keverik.',
        how: 'A műanyag granulátumot szárítják, színezékkel összekeverik, egy **extruderben** megolvasztják és egy kerek nyíláson kipréselik. A szálat vízfürdőben hűtik, **lézerrel mérik** az átmérőjét (±0,02–0,05 mm), és tekercsre csévélik. A nedvszívó anyagokat szárítóanyaggal, légmentesen csomagolják.',
        uni: 'Az amorf termoplasztok a hevítéskor nem egy éles pontban olvadnak, hanem az **üvegesedési hőmérséklet** (Tg) fölött fokozatosan lágyulnak. Tg nagyjából: **PLA ≈ 55–60 °C**, **PETG ≈ 80 °C**, **ABS ≈ 100–105 °C**; a nyomtatási hőmérséklet ennél jóval magasabb (PLA kb. 190–220 °C, PETG kb. 220–250 °C, ABS kb. 230–250 °C), mert a megfelelő folyáshoz alacsony viszkozitás kell. Ugyanezért egy PLA alkatrész egy forró autóban már deformálódhat. A rétegek közti tapadás a polimerláncok **diffúziójától** függ a még meleg felületen, ezért a nyomat a rétegekre merőlegesen (Z-irányban) gyengébb. A nedvesség (főleg nejlon, PETG) a fúvókában gőzzé válik és buborékot, szálhúzást okoz.',
        fact: 'A PLA a forró autóban felejtve is eldeformálódhat, mert már 55–60 °C körül meglágyul.'
      }
    ],
    uni: {
      text: 'Az FDM-nyomtatás folyamata: **3D modell** (pl. STL háromszöghálóként vagy 3MF) → **szeletelés** → **G-code** → mozgásvezérlés. A **szeletelő** (slicer) a modellt vízszintes síkokkal metszi el: minden síkban a háromszögek metszésvonalaiból zárt **kontúrokat** (poligonokat) állít elő, ezek a **falak** (perimeters); a belsejüket ritkább **kitöltéssel** (infill, pl. 15–20% rács vagy gyroid) tölti ki; a kiálló részek alá **támaszt** generál. Ezután megtervezi a fej útvonalát, és minden szakaszhoz kiszámolja az extrudálandó szálhosszt: `E = (h·w·L) / A_szál`, ahol h a rétegvastagság, w a vonalszélesség, L a szakasz hossza. A **G-code** egyszerű soronkénti utasításnyelv, a számjegyvezérlésű (NC) szerszámgépek világából: `G28` (nullpontkeresés), `G1 X50 Y40 E2.3 F1800` (egyenes mozgás extrudálással, F = előtolás mm/perc), `M104/M109` (hotend hőmérséklet), `M140/M190` (tálca hőmérséklet). A **rétegvastagság** a felbontás és az idő közti kompromisszum: tipikusan 0,1–0,3 mm egy 0,4 mm-es fúvókánál (ökölszabály: legfeljebb kb. a fúvókaátmérő 75–80%-a). Fele akkora réteghez kétszer annyi réteg, tehát kb. kétszer annyi idő kell; a ferde felületeken a „lépcsőzés” (staircase effect) arányos a rétegvastagsággal. **Anyagok és üvegesedési hőmérséklet:** PLA Tg ≈ 55–60 °C (fúvóka kb. 190–220 °C, tálca 50–60 °C), PETG Tg ≈ 80 °C (220–250 °C, 70–80 °C), ABS Tg ≈ 100–105 °C (230–250 °C, 90–110 °C, zárt gépházzal). Az ABS-t a nagy hőtágulása és a vetemedési hajlama miatt zárt, meleg térben érdemes nyomtatni.',
      terms: ['szerves-kemia/polimer', 'mechanika/hofeszultseg', 'szabalyozas/pid-szabalyozo', 'msc-beagyazott/timer-pwm', 'msc-beagyazott/valos-ideju', 'linearis-algebra/homogen-koordinatak']
    },
    steps: [
      { icon: '💻', title: '1. 3D modell', text: 'Minden egy számítógépes **3D modellel** kezdődik: megtervezed egy CAD-programban, vagy letöltöd egy modellgyűjteményből. A modellt általában **STL** vagy **3MF** fájlként mented: ez a tárgy felületét apró háromszögekből írja le.' },
      { icon: '🔪', title: '2. Szeletelés', text: 'A **szeletelő** program vékony vízszintes rétegekre „szeleteli” a modellt, megtervezi a falakat, a belső **kitöltést** és a szükséges **támaszokat**, és mindezt **G-code**-dá alakítja: a gép számára érthető utasítások százezreivé.' },
      { icon: '🏠', title: '3. Nullpontkeresés és szintezés', text: 'Indításkor a gép minden tengelyt a **végálláskapcsolóig** mozgat (homing), majd a **szintezőszenzorral** letapogatja a tálca felületét.', parts: ['szenzorok', 'motorok', 'xkocsi'] },
      { icon: '🔥', title: '4. Felfűtés', text: 'A **tápegység** árama felfűti a **tálcát** (pl. 60 °C) és a **hotendet** (pl. 210 °C). Az **alaplap** PID-szabályozással tartja a hőmérsékleteket, amelyeket a termisztorok mérnek.', parts: ['tap', 'talca', 'hotend', 'alaplap'] },
      { icon: '🧵', title: '5. Az első réteg', text: 'Az **extruder** a **filamentet** a fúvókába tolja, a megolvadt műanyag vékony csíkban a tálcára kerül, és rátapad. Ez a legkényesebb lépés: a fúvóka és a tálca távolsága egy papírlap vastagságú.', parts: ['extruder', 'hotend', 'filament', 'talca'] },
      { icon: '↔️', title: '6. Rajzolás X–Y irányban', text: 'A **léptetőmotorok** a **szíjakon** keresztül mozgatják a fejet jobbra-balra és a tálcát előre-hátra, miközben az extruder pontosan adagolja az anyagot: így „rajzolódik” ki egy réteg körvonala és kitöltése.', parts: ['motorok', 'szijak', 'xkocsi', 'talca'] },
      { icon: '⬆️', title: '7. Rétegről rétegre', text: 'Egy réteg után a Z-motor a **trapézorsón** keresztül egy rétegvastagságnyit (pl. 0,2 mm) emeli a hidat, és jön a következő réteg. Egy közepes tárgy több száz rétegből áll, és órákig is készülhet.', parts: ['orso', 'motorok', 'xkocsi'] },
      { icon: '✅', title: '8. Kész: hűlés és leválasztás', text: 'A gép kikapcsolja a fűtéseket, félrehúzza a fejet. Amikor a tálca kihűlt, a rugalmas **PEI-lapot** meghajlítva a tárgy lepattan. Utána jöhet a támaszok eltávolítása és a csiszolás.', parts: ['talca', 'filament'] }
    ],
    history: [
      { year: '1950-es évek', text: 'Az MIT-n kifejlesztik a **számjegyvezérlésű** (NC) szerszámgépeket. Ebből a világból ered a **G-code** utasításnyelv, amelyet ma a 3D nyomtatók is használnak.' },
      { year: '1981', text: 'Kodama Hideo japán kutató publikálja, hogyan lehet fénnyel rétegenként keményedő gyantából háromdimenziós tárgyat építeni: a rétegenkénti gyártás egyik korai leírása.' },
      { year: '1984', text: 'Chuck **Hull** (USA) kifejleszti a **sztereolitográfiát** (SLA), és megalkotja a nevet; később megalapítja a 3D Systems céget. Ez az első kereskedelmi 3D nyomtatási eljárás.' },
      { year: '1989', text: 'S. Scott **Crump** szabadalmi bejelentést tesz az **FDM**-re (olvasztott anyagrétegzés), és feleségével megalapítja a Stratasys céget. A szabadalmat 1992-ben adják meg.' },
      { year: '2005', text: 'Adrian **Bowyer** a Bathi Egyetemen elindítja a nyílt forrású **RepRap** projektet: egy olyan 3D nyomtatót akar, amely a saját alkatrészeinek nagy részét ki tudja nyomtatni.' },
      { year: '2008', text: 'Elkészül a RepRap **Darwin**, az első működő RepRap-nyomtató; a tervek mindenki számára szabadon elérhetők.' },
      { year: '2009', text: 'Lejár az FDM alapszabadalma; megjelennek az első olcsó, készletben árult otthoni nyomtatók (pl. MakerBot Cupcake), és a technológia elkezd terjedni a hobbisták körében.' },
      { year: '2012', text: 'Josef **Průša** cseh fejlesztő bemutatja a **Prusa i3**-at: egyszerű, könnyen megépíthető nyílt forrású tervét a világ egyik legtöbbet másolt 3D nyomtatójává válik.' },
      { year: '2018', text: 'A Creality kiadja az **Ender-3**-at: nagyon olcsó, mégis jól használható nyomtató, amely milliók számára teszi elérhetővé a 3D nyomtatást otthon és az iskolákban.' }
    ],
    quiz: [
      { q: 'Mit csinál a szeletelő (slicer) program?', options: ['A 3D modellt vékony rétegekre bontja, és G-code utasításokká alakítja', 'Felvágja a kész nyomatot', 'Megolvasztja a filamentet', 'Kiegyenesíti a tálcát'], answer: 0, explain: 'A szeletelő minden rétegre megtervezi a falakat, a kitöltést és a támaszokat, majd a fej útvonalát és az extrudálandó anyag mennyiségét G-code-ként írja ki.' },
      { q: 'Miért fűtött a tálca?', options: ['Hogy az első réteg jobban tapadjon, és a tárgy ne vetemedjen fel hűlés közben', 'Hogy a filament gyorsabban megolvadjon a fúvókában', 'Hogy a motorok ne fagyjanak le', 'Hogy a kész tárgyat könnyebb legyen kivágni'], answer: 0, explain: 'A meleg tálca az alsó rétegeket az anyag üvegesedési hőmérséklete közelében tartja, így kisebb a zsugorodásból adódó feszültség, és a tárgy széle nem hajlik fel.' },
      { q: 'Melyik anyagnak a legalacsonyabb az üvegesedési hőmérséklete a három közül?', options: ['PLA (kb. 55–60 °C)', 'PETG (kb. 80 °C)', 'ABS (kb. 100–105 °C)', 'Mindháromnak ugyanannyi'], answer: 0, explain: 'A PLA már 55–60 °C körül meglágyul, ezért könnyen nyomtatható, de egy nyári autóban deformálódhat. Az ABS bírja a legjobban a meleget.' },
      { q: 'Mi történik, ha egy léptetőmotor „lépést veszít”?', options: ['A nyomat rétegei elcsúsznak, mert a vezérlő nem tud róla, hogy a fej nem ott van, ahol hinné', 'A motor automatikusan visszalép', 'A nyomtató azonnal leáll és hibát jelez', 'Semmi, a szíj kiegyenlíti'], answer: 0, explain: 'A hobbinyomtatók léptetőmotorjai nyílt hurokban működnek: nincs helyzetvisszajelzés, ezért az elvesztett lépések elcsúszott rétegeket (layer shift) okoznak.' },
      { q: 'Miért nem csúszik le a nyomtatófej hídja, amikor kikapcsolod a gépet?', options: ['Mert a trapézorsó önzáró: a menet súrlódása megtartja a terhet', 'Mert a szíj tartja', 'Mert a végálláskapcsoló megfogja', 'Mert a tápegység tovább működik'], answer: 0, explain: 'A trapézmenet emelkedési szöge kisebb a súrlódási szögnél, ezért a teher nem tudja visszaforgatni az orsót.' }
    ]
  });
})();
