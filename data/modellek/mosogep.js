/* Modell: elöltöltős mosógép – izometrikus „röntgen” nézet. A ház körvonala felül (overlay) látszik,
 * a műanyag üst áttetsző, így látszik benne a dob, alatta a fűtőszál.
 * Világkoordináták cm-ben: x = szélesség (0..60), y = mélység (0 hátul .. 58 elöl), z = magasság (0..85).
 * Az előlap a y = 58 sík (a képen a bal alsó lap). */
(function () {
  var K = 3.3, OX = 445, OY = 372;
  var I = STUDIE.draw.iso(OX, OY, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  var EDGE = ' stroke="rgba(0,0,0,.32)" stroke-width="0.8" stroke-linejoin="round"';
  function f1(n) { return (+n).toFixed(1); }
  function P(p) { return f1(p[0]) + ',' + f1(p[1]); }
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  function poly(pts, fill, extra) { return '<polygon points="' + pts.map(P).join(' ') + '" fill="' + fill + '"' + (extra == null ? EDGE : extra) + '/>'; }
  function path(pts, color, w, extra) { return '<polyline points="' + pts.map(P).join(' ') + '" fill="none" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '/>'; }
  /* y = állandó sík (előlap): u = x, v = −z */
  function planeY(y, inner, extra) {
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',0,' + K + ',' + f1(OX - y * 0.866 * K) + ',' + f1(OY + y * 0.5 * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  /* henger tetszőleges tengellyel ('x' | 'y' | 'z'): c = az alsó/hátsó véglap közepe */
  function cyl(axis, c, len, r, color, o) {
    o = o || {};
    var n = o.n || 32, s = '', i;
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
    var cap = [];
    for (i = 0; i < n; i++) cap.push(q(i / n * 2 * Math.PI, len));
    if (o.noCap) return s;
    return s + poly(cap, o.cap || shade(color, 1.08), ' stroke="rgba(0,0,0,.38)" stroke-width="0.8"');
  }
  /* kör (vagy körgyűrű-pontsor) a tengelyre merőleges síkban */
  function ring(axis, c, r, n) {
    var pts = [];
    for (var i = 0; i < (n || 40); i++) {
      var a = i / (n || 40) * 2 * Math.PI, u = r * Math.cos(a), v = r * Math.sin(a);
      pts.push(axis === 'y' ? I.pt(c[0] + u, c[1], c[2] + v) : axis === 'x' ? I.pt(c[0], c[1] + u, c[2] + v) : I.pt(c[0] + u, c[1] + v, c[2]));
    }
    return pts;
  }
  function annulus(axis, c, r0, r1, fill, extra) {
    var o = ring(axis, c, r1, 48), i = ring(axis, c, r0, 48).reverse();
    return '<path d="M' + o.map(P).join(' L') + ' Z M' + i.map(P).join(' L') + ' Z" fill="' + fill + '" fill-rule="evenodd"' + (extra || EDGE) + '/>';
  }

  var W = 60, D = 58, H = 85;
  var TX = 30, TZ = 49;            // az üst és a dob tengelye
  var defs = '<defs>' +
    '<radialGradient id="mg-glass" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#e8f3ff" stop-opacity=".75"/><stop offset=".7" stop-color="#9fc3e6" stop-opacity=".45"/><stop offset="1" stop-color="#5a7fa6" stop-opacity=".55"/></radialGradient>' +
    '<linearGradient id="mg-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb7ff" stop-opacity=".55"/><stop offset="1" stop-color="#2f7fd6" stop-opacity=".7"/></linearGradient>' +
    '</defs>';

  /* ---------- Ház: hátsó falak halványan (háttér) ---------- */
  var floorC = I.pt(W / 2, D / 2, 0);
  var backdrop = defs +
    '<text class="lbl" x="14" y="26" font-size="17">Elöltöltős mosógép</text>' +
    '<text class="lbl-muted" x="14" y="44">„röntgenkép”: a ház és a műanyag üst áttetsző</text>' +
    '<ellipse cx="' + f1(floorC[0]) + '" cy="' + f1(floorC[1] + 6) + '" rx="' + f1(52 * K) + '" ry="' + f1(30 * K) + '" fill="rgba(0,0,0,.06)"' + NS + '/>' +
    '<g' + NS + ' opacity=".55">' +
    poly([I.pt(0, 0, 0), I.pt(W, 0, 0), I.pt(W, 0, H), I.pt(0, 0, H)], '#dfe4ea', ' stroke="#b7c0cb" stroke-width="1"') +      // hátfal
    poly([I.pt(0, 0, 0), I.pt(0, D, 0), I.pt(0, D, H), I.pt(0, 0, H)], '#e8ecf1', ' stroke="#b7c0cb" stroke-width="1"') +      // bal oldalfal
    poly([I.pt(0, 0, 0), I.pt(W, 0, 0), I.pt(W, D, 0), I.pt(0, D, 0)], '#cfd6de', ' stroke="#b7c0cb" stroke-width="1"') +      // alaplemez
    '</g>';
  // a ház elülső élei (a részek fölött, kattintást nem fogják el)
  function edge(a, b) { return path([I.pt(a[0], a[1], a[2]), I.pt(b[0], b[1], b[2])], '#7d8894', 1.4); }
  var overlay = '<g' + NS + ' opacity=".8">' +
    edge([0, D, 0], [W, D, 0]) + edge([W, D, 0], [W, 0, 0]) + edge([0, D, H], [W, D, H]) + edge([W, D, H], [W, 0, H]) +
    edge([0, D, H], [0, 0, H]) + edge([0, 0, H], [W, 0, H]) + edge([0, D, 0], [0, D, H]) + edge([W, D, 0], [W, D, H]) + edge([W, 0, 0], [W, 0, H]) +
    edge([0, D, 76], [W, D, 76]) + edge([W, D, 76], [W, 0, 76]) +
    '</g>';

  /* ---------- Dob (rozsdamentes, perforált, bordákkal) ---------- */
  var drum = cyl('y', [TX, 12, TZ], 36, 20.5, '#c4ccd6', { noCap: true });
  // perforáció a látható paláston
  for (var da = -40; da <= 130; da += 13) {
    for (var dy = 15; dy <= 45; dy += 4) {
      var a = da * Math.PI / 180, pp = I.pt(TX + 20.6 * Math.cos(a), dy, TZ + 20.6 * Math.sin(a));
      drum += '<circle cx="' + f1(pp[0]) + '" cy="' + f1(pp[1]) + '" r="0.9" fill="#7f8a97"' + NS + '/>';
    }
  }
  drum += annulus('y', [TX, 48, TZ], 13, 20.5, '#d6dde5');
  // a dob belseje a szájon át: hátfal és egy emelőborda
  drum += poly(ring('y', [TX, 48, TZ], 13), '#8e99a6', ' stroke="#5d6672" stroke-width="0.8"');
  drum += annulus('y', [TX, 48, TZ], 10.5, 13, '#7d8894', ' stroke="none"' + NS);

  /* ---------- Üst (áttetsző műanyag tartály) ---------- */
  var tub = '<g opacity=".5">' + cyl('y', [TX, 9, TZ], 41, 23.5, '#9aa5b3', { noCap: true }) + '</g>';
  tub += annulus('y', [TX, 50, TZ], 17, 23.5, 'rgba(120,132,148,.55)', ' stroke="#5d6672" stroke-width="1"');
  tub += '<g' + NS + '>' + path(ring('y', [TX, 9, TZ], 23.5).concat([ring('y', [TX, 9, TZ], 23.5)[0]]), '#6b7684', 0.9, ' stroke-dasharray="3 2"') + '</g>';
  // ürítőcsonk alul
  tub += cyl('z', [TX - 8, 40, TZ - 30], 6, 2.2, '#8a95a3');

  /* ---------- Csapágyak és tengely (a dob hátulján) ---------- */
  var bear = cyl('y', [TX, 2.6, TZ], 9.6, 1.6, '#b8c0ca', { cap: '#e3e7ec' });   // tengely
  bear += cyl('y', [TX, 6.5, TZ], 2.4, 4.6, '#6d7784') + annulus('y', [TX, 8.9, TZ], 1.7, 4.6, '#aeb7c2');
  bear += cyl('y', [TX, 9.0, TZ], 2.0, 3.8, '#6d7784') + annulus('y', [TX, 11, TZ], 1.7, 3.8, '#c9d0d8');
  // golyók jelzése az első csapágyon
  for (var bi = 0; bi < 10; bi++) {
    var ba = bi / 10 * 2 * Math.PI, bp = I.pt(TX + 3.15 * Math.cos(ba), 11.05, TZ + 3.15 * Math.sin(ba));
    bear += '<circle cx="' + f1(bp[0]) + '" cy="' + f1(bp[1]) + '" r="1.25" fill="#e9edf2" stroke="#5d6672" stroke-width=".4"' + NS + '/>';
  }

  /* ---------- Szíj és szíjtárcsa (hátul) ---------- */
  var MZ = 14, MX = 30;   // motor tengelye
  var belt = cyl('y', [TX, 0.6, TZ], 2.2, 16, '#8b96a3', { cap: '#aab4bf' });
  for (var sp = 0; sp < 3; sp++) {   // küllők
    var sa = (sp * 120 + 30) * Math.PI / 180;
    belt += poly([I.pt(TX + 3 * Math.cos(sa - 0.25), 2.85, TZ + 3 * Math.sin(sa - 0.25)), I.pt(TX + 13 * Math.cos(sa - 0.12), 2.85, TZ + 13 * Math.sin(sa - 0.12)),
      I.pt(TX + 13 * Math.cos(sa + 0.12), 2.85, TZ + 13 * Math.sin(sa + 0.12)), I.pt(TX + 3 * Math.cos(sa + 0.25), 2.85, TZ + 3 * Math.sin(sa + 0.25))], '#7a8592', ' stroke="none"' + NS);
  }
  belt += poly(ring('y', [TX, 2.85, TZ], 3), '#5d6672', ' stroke="none"');
  // bordás szíj: két érintő a nagy tárcsától a motor kis tárcsájáig
  (function () {
    var R1 = 16, R2 = 2.4, th = Math.asin((R1 - R2) / (TZ - MZ)), pts = [], i, a;
    for (i = 0; i <= 40; i++) { a = -th + (Math.PI + 2 * th) * i / 40; pts.push(I.pt(MX + R1 * Math.cos(a), 1.7, TZ + R1 * Math.sin(a))); }
    for (i = 0; i <= 12; i++) { a = Math.PI + th + (Math.PI - 2 * th) * i / 12; pts.push(I.pt(MX + R2 * Math.cos(a), 1.7, MZ + R2 * Math.sin(a))); }
    belt += '<polygon points="' + pts.map(P).join(' ') + '" fill="none" stroke="#2a2f36" stroke-width="2.6" stroke-linejoin="round"/>';
    belt += '<polygon points="' + pts.map(P).join(' ') + '" fill="none" stroke="#4b525c" stroke-width="0.8" stroke-dasharray="1.2 1.4"' + NS + '/>';
  })();

  /* ---------- Motor (inverteres BLDC) ---------- */
  var mot = cyl('y', [MX, 5, MZ], 20, 6.4, '#4f5a68', { cap: '#6c7787' });
  for (var mr = 0; mr < 8; mr++) {   // hűtőbordák a paláston
    var my = 7 + mr * 2.3;
    var mpts = [];
    for (var mi = 0; mi <= 10; mi++) { var ma = (-45 + 180 * mi / 10) * Math.PI / 180; mpts.push(I.pt(MX + 6.45 * Math.cos(ma), my, MZ + 6.45 * Math.sin(ma))); }
    mot += path(mpts, '#3a434f', 0.7, NS);
  }
  mot += cyl('y', [MX, 1.2, MZ], 3.8, 2.4, '#c3cad3');   // kis szíjtárcsa
  mot += I.box(MX - 4, 13, MZ + 6, 8, 6, 2.6, '#2b3138');   // csatlakozó/inverter-doboz

  /* ---------- Ellensúly (beton) ---------- */
  var cw = I.box(10, 37, 72, 40, 15, 8, '#a7a49b');
  cw += planeY(52.02, '<rect x="13" y="-79" width="34" height="5" rx="1" fill="none" stroke="#8a877e" stroke-width=".3"/>' +
    [16, 22, 29, 37, 43].map(function (x, i) { return '<circle cx="' + x + '" cy="' + (-75.5 + (i % 2)) + '" r=".5" fill="#8a877e"/>'; }).join(''), NS);
  cw += I.box(18, 41, 80, 4, 4, 1, '#6d7784') + I.box(38, 41, 80, 4, 4, 1, '#6d7784');

  /* ---------- Felfüggesztés: lengéscsillapítók alul, rugók felül ---------- */
  var sus = '';
  [[13, 30], [47, 30]].forEach(function (s) {
    var top = I.pt(s[0], s[1], TZ - 20), mid = I.pt(s[0] + (s[0] < 30 ? -2 : 2), s[1] + 2, 16), bot = I.pt(s[0] + (s[0] < 30 ? -4 : 4), s[1] + 4, 2);
    sus += '<line x1="' + f1(top[0]) + '" y1="' + f1(top[1]) + '" x2="' + f1(mid[0]) + '" y2="' + f1(mid[1]) + '" stroke="#c9d0d8" stroke-width="3.2" stroke-linecap="round"/>';
    sus += '<line x1="' + f1(mid[0]) + '" y1="' + f1(mid[1]) + '" x2="' + f1(bot[0]) + '" y2="' + f1(bot[1]) + '" stroke="#2f3640" stroke-width="7" stroke-linecap="round"/>';
    sus += '<line x1="' + f1(mid[0]) + '" y1="' + f1(mid[1]) + '" x2="' + f1(bot[0]) + '" y2="' + f1(bot[1]) + '" stroke="#55606d" stroke-width="2.4" stroke-linecap="round"' + NS + '/>';
    sus += '<circle cx="' + f1(bot[0]) + '" cy="' + f1(bot[1]) + '" r="3" fill="#e3e7ec" stroke="#2f3640" stroke-width="1"/>';
  });
  [[12, 22], [48, 22]].forEach(function (s) {   // két húzórugó az üst tetejétől a ház tetejéig
    var pts = [], z0 = TZ + 21, z1 = 84;
    for (var i = 0; i <= 16; i++) { var z = z0 + (z1 - z0) * i / 16, off = (i === 0 || i === 16) ? 0 : (i % 2 ? 1.6 : -1.6); pts.push(I.pt(s[0] + off, s[1], z)); }
    sus += path(pts, '#8a6d3b', 1.6);
  });

  /* ---------- Szivattyú (ürítőszivattyú szűrővel, bal elöl alul) ---------- */
  var pump = I.box(4, 40, 3, 14, 12, 9, '#3f6fb3');
  pump += cyl('y', [10, 52, 7.5], 5, 4, '#e5e8ec', { cap: '#f4f6f8' });   // szűrőfedél az előlap felé
  pump += planeY(57.02, '<rect x="7" y="-8.2" width="6" height="1.4" rx=".4" fill="#9aa4b0"/>', NS);
  pump += cyl('z', [8, 46, 12], 3, 2.6, '#2f5a96');   // motorfej
  pump += path([I.pt(18, 46, 8), I.pt(21, 44, 8)], '#5b6573', 2.4);   // tömlőcsonk az üst felé
  pump += path([I.pt(4, 44, 8), I.pt(2, 38, 9)], '#5b6573', 2.2);   // kifolyócsonk

  /* ---------- Mágnesszelep (vízbevezetés, jobb hátul felül) ---------- */
  var valve = I.box(44, 1, 77, 10, 5, 5, '#e9ecef');
  valve += cyl('y', [47, 6, 79.5], 3, 1.2, '#cfd5dc') + cyl('y', [51, 6, 79.5], 3, 1.2, '#cfd5dc');
  valve += I.box(45, 1.5, 82, 3.4, 3.4, 2.2, '#2b3138') + I.box(49.6, 1.5, 82, 3.4, 3.4, 2.2, '#2b3138');   // tekercsek
  valve += cyl('y', [49, -4, 79.5], 5, 1.3, '#9aa4b0');   // csatlakozó a ház hátulján
  valve += path([I.pt(47, 9, 79.5), I.pt(44, 16, 81)], '#c7d6e6', 2.6);   // tömlő a mosószer-adagolón át az üstbe

  /* ---------- Fűtőszál + NTC (az üst alján, a dob alatt) ---------- */
  var heat = path([I.pt(TX - 4, 14, TZ - 21.5), I.pt(TX - 4, 44, TZ - 21.5), I.pt(TX + 4, 44, TZ - 21.5), I.pt(TX + 4, 14, TZ - 21.5)], '#b2462c', 3.2) +
    path([I.pt(TX - 4, 14, TZ - 21.5), I.pt(TX - 4, 44, TZ - 21.5), I.pt(TX + 4, 44, TZ - 21.5), I.pt(TX + 4, 14, TZ - 21.5)], '#f08a5d', 1, NS);
  heat += I.box(TX - 6, 8, TZ - 24, 12, 3, 5, '#3a3f46');   // rögzítőperem hátul
  heat += cyl('y', [TX, 11, TZ - 21.5], 22, 0.9, '#2e7d4f') + I.box(TX - 0.9, 32.5, TZ - 22.4, 1.8, 1.8, 1.8, '#1f5e3a');   // NTC-hőérzékelő

  /* ---------- Mandzsetta (ajtótömítés) ---------- */
  var gasket = cyl('y', [TX, 50, TZ], 6.5, 17.5, '#3a3f46', { noCap: true });
  gasket += annulus('y', [TX, 56.5, TZ], 14.5, 17.5, '#4a5059');
  [52, 54].forEach(function (gy) {
    var all = ring('y', [TX, gy, TZ], 17.55, 48), rr = [];
    all.forEach(function (p, i) { if (i / 48 * 360 > 310) rr.push(p); });
    all.forEach(function (p, i) { if (i / 48 * 360 < 140) rr.push(p); });
    gasket += path(rr, '#22272d', 0.7, NS);
  });

  /* ---------- Ajtó (üvegablakkal) ---------- */
  var door = annulus('y', [TX, 58.4, TZ], 13.5, 19, '#dfe4ea', ' stroke="#8a95a3" stroke-width="1"');
  door += cyl('y', [TX, 57, TZ], 1.4, 19, '#b9c2cc', { noCap: true });
  door += annulus('y', [TX, 58.4, TZ], 19, 19.01, 'none');
  door += annulus('y', [TX, 58.5, TZ], 13.5, 16, '#2b3138');
  door += poly(ring('y', [TX, 58.5, TZ], 13.5), 'url(#mg-glass)', ' stroke="#5d6672" stroke-width=".8"');
  door += I.box(TX + 15.5, 58.6, TZ - 3, 3, 2, 6, '#9aa4b0');   // fogantyú
  door += I.box(TX - 20.5, 57.5, TZ + 6, 2.5, 1.5, 4, '#7f8a97') + I.box(TX - 20.5, 57.5, TZ - 10, 2.5, 1.5, 4, '#7f8a97');   // zsanérok

  /* ---------- Ajtózár (a nyílás jobb oldalán, a ház mögött) ---------- */
  var lock = I.box(TX + 19.5, 52, TZ - 2.5, 5, 5, 5, '#e8eaed');
  lock += I.box(TX + 20.5, 57, TZ - 1, 2, 1, 2, '#c84a3a');   // a kampó nyílása
  lock += planeY(57.02, '<text x="' + (TX + 22) + '" y="' + (-TZ + 2.1) + '" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="1.4" fill="#5d6672">🔒</text>', NS);

  /* ---------- Vezérlő: kezelőpanel + elektronika ---------- */
  var ctrl = I.box(4, 44, 77.5, 38, 10, 4, '#2f7d4f');   // panel (NYÁK) a ház tetején belül
  ctrl += I.box(10, 46, 81.5, 6, 6, 1, '#22262c') + I.box(22, 47, 81.5, 3, 3, 0.8, '#22262c') + I.box(30, 46, 81.5, 7, 4, 2, '#e9e3cf');
  ctrl += cyl('z', [36, 51, 81.5], 2, 1.2, '#2a5fa8');
  ctrl += I.box(0, 56, 76, W, 2, 9, '#f2f4f7');   // előlap-csík
  ctrl += planeY(58.02,
    '<rect x="3" y="-83.5" width="14" height="5.5" rx="1" fill="#e3e7ec" stroke="#b7c0cb" stroke-width=".25"/>' +    // mosószer-fiók
    '<rect x="21" y="-83" width="15" height="5" rx=".6" fill="#14202c"/>' +
    '<text x="28.5" y="-79.4" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="3.2" fill="#5fe3a1">1:28</text>' +
    '<circle cx="45" cy="-80.5" r="3.4" fill="#d9dee5" stroke="#8a95a3" stroke-width=".35"/><path d="M45 -80.5 L45 -83.4" stroke="#2f3640" stroke-width=".6"/>' +
    '<circle cx="54" cy="-80.5" r="1.5" fill="#2f9e6a"/>', NS);

  STUDIE.addModel({
    id: 'mosogep',
    title: 'Mosógép',
    icon: '🧺',
    color: '#3f6fb3',
    category: 'Háztartás',
    keywords: 'mosógép elöltöltős dob üst motor inverter BLDC kefe nélküli szíj szíjtárcsa csapágy ellensúly beton lengéscsillapító rugó rezgés centrifuga g-szám kiegyensúlyozatlanság szivattyú szűrő mágnesszelep fűtőszál NTC termisztor ajtózár mandzsetta tömítés vezérlő mosószer tenzid energiacímke',
    summary: 'Egy forgó dob vízzel, mosószerrel és mozgással tisztítja a ruhát, majd percenként több mint ezer fordulattal kipörgeti belőle a vizet. Közben rugók, lengéscsillapítók és egy nehéz betontömb tartják vissza a gépet attól, hogy elinduljon a fürdőszobában.',
    scale: 'kb. 60 × 58 × 85 cm, 60–80 kg',
    viewBox: '0 0 900 680',
    backdrop: backdrop,
    overlay: overlay,
    intro: 'A mosógép négy dolgot csinál: **vizet enged be** (mágnesszelep), **felmelegíti** (fűtőszál, hőérzékelő), **mozgatja a ruhát** (motor, szíj, dob), végül **kiszivattyúzza** a vizet és **kicentrifugálja** a ruhát.\n\nA ruha a perforált **dobban** forog, a dob a vízzel teli **üstben** van. Az üst nem a házhoz van csavarozva: **rugókon lóg**, alulról **lengéscsillapítók** tartják, a tetején pedig egy nehéz **betontömb** (ellensúly) ül. Erre azért van szükség, mert centrifugáláskor a ruha sosem oszlik el egyenletesen a dobban, és ez az egyenetlenség erősen rázza a gépet.\n\nAz egészet egy **vezérlő** irányítja: ő dönti el a program alapján, mikor mennyi víz jöjjön, milyen meleg legyen, és milyen gyorsan forogjon a dob.',
    parts: [
      {
        id: 'dob', z: 4, name: 'Dob', svg: drum, explode: [-235, -15], badge: B(TX + 14, 30, TZ + 14), en: 'perforated stainless-steel drum with lifters',
        terms: ['fizika-bsc/tehetetlensegi-nyomatek', 'mechanika/merev-test'],
        lesson: 'fiz-alap/mozgas',
        what: 'A lyukacsos fémhenger, amelyben a ruha forog. Mosáskor lassan, hol az egyik, hol a másik irányba fordul. A belsejében lévő **bordák** (emelők) felviszik a ruhát, ami aztán visszaesik a vízbe. Ez a sok emelés és esés „dörzsöli” ki a szennyet. Centrifugáláskor nagyon gyorsan forog, és a vizet a lyukakon át kipréseli a ruhából.',
        madeOf: '**Rozsdamentes acéllemez** (krómot és nikkelt tartalmazó acél, ami nem rozsdásodik), sok ezer kis lyukkal. Hátul egy erős **öntött alumínium kereszt** (dobcsillag) tartja a tengelyt. A bordák műanyagból vagy acélból vannak.',
        how: 'Az acéltekercsből lemezt vágnak, gépek kilyukasztják (perforálják), majd hengerré hajlítják és a varratot összehegesztik vagy összekorcolják. Rá kerül az elülső perem és a hátsó fal a dobcsillaggal és a tengellyel.',
        uni: 'Centrifugáláskor a ruhára ható gyorsulás a **centripetális gyorsulás**: `a = ω²·r`, ahol `ω = 2π·n/60`. 1400/perc és r ≈ 0,25 m esetén `ω ≈ 147 1/s`, `a ≈ 5400 m/s²`, azaz kb. **550 g** (g-szám = a/g). A víz azért távozik, mert a ruha szálai között tartó kapilláris erő ennél jóval kisebb. A maradék nedvesség a fordulatszámmal csökken, de egyre lassabban: 1000/perc fölött a nyereség már kicsi, a rezgés és a ruha gyűrődése viszont nő. A dob tehetetlenségi nyomatéka a felfutás idejét és a motor szükséges nyomatékát határozza meg.',
        fact: 'Egy 1400-as centrifugánál a dob falán a ruha nagyjából a saját súlyának 500-szorosával nyomódik kifelé.'
      },
      {
        id: 'ust', z: 6, name: 'Üst (tartály)', svg: tub, explode: [150, -60], badge: B(TX + 22, 20, TZ + 8), en: 'outer tub (polypropylene)',
        terms: ['szerves-kemia/polimer'],
        what: 'A dobot körülvevő **zárt tartály**: ebben áll a víz. Mosáskor a dob alja néhány centiméterre belelóg a vízbe. Az üst nem forog: ehhez van rögzítve a csapágy, a motor, a rugók, a lengéscsillapítók és az ellensúly, vagyis ez a „lengő egység” váza.',
        madeOf: 'Ma főleg üvegszállal erősített **polipropilén** (PP) műanyag, régebben zománcozott acél. Két félből áll, amelyeket csavarokkal vagy hegesztéssel kötnek össze. Az alján van a kifolyócsonk és a fűtőszál nyílása.',
        how: 'A két félhéjat **fröccsöntik**. Sok gyártó a két felet a dob köré illesztve **összehegeszti** (hőhegesztés), így a gép olcsóbb és tömítettebb, de a csapágyat csak az egész üsttel együtt lehet cserélni.',
        uni: 'Az üst a lengő rendszer fő tömege: a dobbal, a motorral és az ellensúllyal együtt egy **rugókon és csillapítókon felfüggesztett merev test**, amelynek hat szabadságfoka van. Ennek sajátfrekvenciái néhány Hz körül vannak, ezért centrifuga-felfutáskor a dob fordulatszáma ezeken **áthalad**; ekkor a legnagyobb a kilengés. A PP üst előnye a korrózióállóság és a hangcsillapítás, hátránya, hogy a hőtágulása nagyobb.',
        fact: 'Sok mai gépben az üst két fele össze van hegesztve, ezért egy elkopott csapágy cseréje gyakran gazdaságtalan: ez az egyik leggyakoribb ok, amiért egy mosógépet kidobnak.'
      },
      {
        id: 'csapagy', z: 2, name: 'Csapágyak és tengely', svg: bear, explode: [262, -128], badge: B(TX, 7, TZ + 6), en: 'drum bearings, shaft and shaft seal',
        terms: ['mechanika/surlodas', 'mechanika/faradas'],
        what: 'A dob hátulján egy **tengely** van, amely két **golyóscsapágyban** forog. A csapágy teszi lehetővé, hogy a nehéz, vizes ruhával teli dob könnyedén és csendesen pörögjön. Előtte egy **tengelytömítés** akadályozza meg, hogy a víz a csapágyba jusson.',
        madeOf: 'A csapágy két edzett **acélgyűrű** között gördülő acélgolyókból áll, kenőzsírral, két oldalán gumitömítéssel. A tengely rozsdamentes acél, a tömítés gumi (szimmering).',
        how: 'A gyűrűket és golyókat esztergálják, **edzik** (hevítik és hirtelen lehűtik, hogy kemények legyenek), majd mikrométer pontosságúra **köszörülik**. A csapágyat sajtóval préselik az üst hátsó részébe.',
        uni: 'A csapágy terhelése centrifugáláskor elsősorban a **kiegyensúlyozatlanságból** adódó forgó erő: `F = m_e·e·ω²`. Már 0,3 kg ruha 0,2 m-es excentricitással 1400/percnél `F ≈ 0,3·0,2·147² ≈ 1300 N`. Az élettartamot a **kifáradás** határozza meg (gördülőcsapágyaknál `L ∝ (C/P)³`). Ha a tengelytömítés átenged, a víz kimossa a zsírt, és a csapágy hónapok alatt tönkremegy: ilyenkor centrifugáláskor erős, morajló zaj hallható.',
        fact: 'A „repülőgép felszállására” emlékeztető centrifugazaj szinte mindig a kopott dobcsapágy jele.'
      },
      {
        id: 'szij', z: 1, name: 'Szíj és szíjtárcsa', svg: belt, explode: [312, -40], badge: B(TX - 12, 1, TZ + 10), en: 'poly-V belt and drum pulley',
        terms: ['mechanika/kotelsurlodas', 'mechanika/nyomatek'],
        lesson: 'autoszereles/eroatvitel',
        what: 'A motor kis tárcsája és a dob hátulján lévő nagy tárcsa között egy **bordás gumiszíj** viszi át a forgást. Mivel a nagy tárcsa sokkal nagyobb, a dob kb. 10–15-ször lassabban forog, mint a motor, de cserébe ugyanennyiszer nagyobb erővel (nyomatékkal).',
        madeOf: 'A szíj **gumi** (EPDM) hosszirányú poliészter erősítőszálakkal, belül több hosszanti bordával (poly-V szíj). A nagy tárcsa öntött alumínium, a tengelyre csavarral van rögzítve.',
        how: 'A szíjat egy hengeren rétegesen építik fel (gumi, erősítőszálak, gumi), **vulkanizálják** (hő és nyomás alatt kikeményítik), majd keskeny gyűrűkre vágják, és a bordákat beköszörülik.',
        uni: 'Az áttétel `i = D_nagy / D_kicsi`, a dob nyomatéka `M_dob ≈ i·M_motor·η`. A szíj a súrlódás révén visz át erőt: a feszes és a laza ág erőinek aránya legfeljebb `F₁/F₂ = e^{μβ}` (**Euler–Eytelwein**), ahol β az átfogási szög; a V-bordák az ékhatás miatt a látszólagos súrlódási tényezőt megnövelik. Az ún. **direkt hajtású** gépekben nincs szíj: a motor forgórésze közvetlenül a dob tengelyén ül.',
        fact: 'A direkt hajtású mosógépekben nincs szíj és szíjtárcsa: a motor egy lapos „palacsinta” a dob hátulján.'
      },
      {
        id: 'motor', z: 3, name: 'Motor (inverteres, kefe nélküli)', svg: mot, explode: [250, 118], badge: B(MX + 4, 22, MZ + 5), link: 'villanymotor', en: 'inverter-driven brushless DC (BLDC) motor',
        terms: ['e-mobilitas/pmsm', 'msc-teljesitmenyelektronika/haromfazisu-inverter', 'e-mobilitas/foc', 'e-mobilitas/pwm'],
        what: 'Ez forgatja a dobot. A mai gépek többségében **kefe nélküli (BLDC) motor** van, amelyet egy **inverter** (elektronikus meghajtó) táplál. Az inverter a fordulatszámot nagyon pontosan tudja változtatni: lassan, hol jobbra, hol balra mosáskor, és több mint ezres fordulattal centrifugáláskor. Régebbi gépekben szénkefés **univerzális motor** van, ennek a keféi idővel elkopnak.',
        madeOf: 'Egy vékony acéllemezekből rétegelt **állórész** rézhuzal-tekercsekkel, és egy **állandó mágneses forgórész** (ferrit vagy neodímium mágnesek). Az inverterben teljesítmény-tranzisztorok (MOSFET vagy IGBT) kapcsolnak.',
        how: 'Az állórész-lemezeket kivágják és összepréselik, automata gépek tekercselik a rézhuzalt, a mágneseket a forgórészbe ragasztják. A forgórészt **kiegyensúlyozzák**, a kész motort terhelés alatt próbapadon tesztelik.',
        uni: 'A BLDC/PMSM motor nyomatéka `M = k_t·I`, a fordulatszám a táplálás frekvenciájával arányos. A háromfázisú inverter **PWM**-mel állítja elő a változó frekvenciájú és amplitúdójú feszültséget; a jobb gépek **mezőorientált szabályozást** (FOC) használnak érzékelő nélkül (a forgórész helyzetét a fázisáramokból becslik). Az inverter az áramfelvételből a **ruha tömegét** is becsülni tudja (tehetetlenség a felfutás alatt), és ebből adagolja a vizet. A kefe nélküli kialakítás nem kopik, és nagyobb a hatásfoka, mint az univerzális motoré.',
        fact: 'Sok mosógép a mosás elején a dobot meglökve „megméri” a ruhát: abból, hogy a motor milyen nehezen gyorsul, kiszámolja, mennyi víz kell.'
      },
      {
        id: 'ellensuly', z: 9, name: 'Ellensúly (betontömb)', svg: cw, explode: [60, -175], badge: B(30, 44, 80), en: 'concrete counterweight',
        terms: ['mechanika/sulypont', 'mechanika/tehetetlensegi-nyomatek'],
        what: 'Egy nehéz **betontömb**, amelyet az üstre csavaroznak (gyakran egy az üst tetején, egy elöl vagy alul). Azért kell, hogy a lengő egység **nehéz** legyen: így ugyanaz a rázóerő sokkal kisebb kilengést okoz, és a gép nem „sétál el” centrifugáláskor. Egy mosógépben összesen kb. 25 kg beton is lehet: ezért olyan nehéz egy mosógépet cipelni.',
        madeOf: '**Beton** (cement, homok, kavics), néha vasreszelékkel vagy acélbetétekkel. A furataiba fém perselyeket öntenek a csavaroknak. Kísérleteznek vízzel feltölthető műanyag tartállyal is, amely szállításkor könnyű.',
        how: 'A betont formákba öntik, rázóasztalon tömörítik, és néhány napig kötni hagyják. A kész tömböt nagy csavarokkal szerelik az üstre.',
        uni: 'A kiegyensúlyozatlan tömeg `m_e` keltette forgó erő `F = m_e·e·ω²`. A lengő tömeg (M) növelése a kitérést a rezonancia fölött kb. `x ≈ m_e·e / M` értékre csökkenti; ezért a beton közvetlenül a rezgés **amplitúdóját** csökkenti. Az ellensúly helyével a lengő egység **súlypontját** a csapágy és a felfüggesztési pontok közelébe tolják, így a billegő (forgó) rezgésmódokat is mérsékelik.',
        fact: 'A beton a mosógép legolcsóbb „alkatrésze”, mégis nélküle egy 1400-as centrifuga szó szerint végiggyalogolna a fürdőszobán.'
      },
      {
        id: 'felfugg', z: 5, name: 'Rugók és lengéscsillapítók', svg: sus, explode: [0, 40], badge: B(47, 31, 18), en: 'suspension springs and friction dampers',
        terms: ['mechanika/szabad-rezges', 'mechanika/csillapitas', 'mechanika/rezonancia', 'fizika-bsc/harmonikus-rezges'],
        lesson: 'motorsport/rugozas',
        what: 'A lengő egység (üst, dob, motor, beton) felül két **rugón lóg** a ház tetejéről, alul pedig két-három **lengéscsillapító** tartja. A rugó engedi, hogy az üst kileng­jen, a csillapító pedig **fékezi** a lengést, hogy ne erősödjön fel. Így a rázkódás nagy része nem jut el a házig és a padlóig.',
        madeOf: 'A rugók **acélhuzalból** tekert húzórugók. A lengéscsillapító egy műanyag vagy fém cső, benne egy dugattyúval, amely **súrlódó betéten** (filc vagy habanyag) csúszik; egyes gépekben hidraulikus olajos csillapító van.',
        how: 'A rugót automata tekercselőgép hajlítja, majd hőkezelik. A csillapító csövét fröccsöntik vagy húzzák, a dugattyúra ragasztják a súrlódó betétet, és a két végére rugalmas gumiperselyt szerelnek.',
        uni: 'A lengő egység egyszerű modellje egy **csillapított rezgő rendszer**: `M·x″ + c·x′ + k·x = m_e·e·ω²·cos ωt`. A sajátkörfrekvencia `ω₀ = √(k/M)`, ez néhány Hz. A rezonancián (`ω ≈ ω₀`) a kitérést csak a csillapítás korlátozza, `x_max ≈ m_e·e·ω₀² / (c·ω₀)`; a rezonancia fölött (`ω ≫ ω₀`) a kitérés `m_e·e/M`-hez tart, és a házra jutó erő (**átvitel**) csökken. Ezért a jó felfüggesztés **puha** (alacsony ω₀) és **mérsékelten csillapított**: túl erős csillapítás növelné a nagy fordulatszámon átvitt erőt. A súrlódásos csillapító ereje közel állandó, ami kis kitérésnél „befogja” a rendszert.',
        fact: 'Centrifugálás elején, kb. 200–400-as fordulatnál a gép jobban ráz, mint teljes sebességnél: ekkor halad át a rendszer a rezonancián.'
      },
      {
        id: 'szivattyu', z: 8, name: 'Szivattyú és szűrő', svg: pump, explode: [-170, 150], badge: B(10, 46, 12), en: 'drain pump with lint filter',
        what: 'A mosás és öblítés végén ez **szivattyúzza ki** a szennyes vizet a lefolyóba. Előtte egy kicsavarható **szűrő** fogja meg a zsebben maradt tárgyakat (pénzérme, hajcsat, gomb), hogy ne törjék el a szivattyú lapátkerekét. A szűrő a gép jobb vagy bal alsó sarkában, egy kis fedél mögött van.',
        madeOf: 'Műanyag szivattyúház, benne egy kis **lapátkerék**, amelyet egy **szinkronmotor** forgat (állandó mágneses forgórésszel). A szűrő és a tömlők műanyagból, illetve gumiból vannak.',
        how: 'A házat és a lapátkereket fröccsöntik, a motor tekercsét gép tekercseli. A szivattyút vízzel, tömítettségre és szállított mennyiségre tesztelik.',
        uni: 'Az ürítőszivattyú egy kis **örvényszivattyú** (centrifugálszivattyú): a lapátkerék a víznek mozgási energiát ad, amely a házban nyomássá alakul. Tipikusan kb. 1 m-es emelőmagasságra és percenként néhányszor 10 liter szállításra méretezik. A motor gyakran egyfázisú, kétpólusú **szinkronmotor**, amely mindkét irányba elindulhat: a lapátkerék ezért egyenes (radiális) lapátos, hogy az iránya mindegy legyen.',
        fact: 'A szűrőt évente néhányszor érdemes kitisztítani: meglepően sok aprópénz, hajgumi és zokni gyűlik össze benne.'
      },
      {
        id: 'szelep', z: 10, name: 'Mágnesszelep (vízbevezetés)', svg: valve, explode: [205, -160], badge: B(49, 4, 84), en: 'water inlet solenoid valve',
        terms: ['fizika-bsc/ampere-torveny', 'szabalyozas/vezerles-szabalyozas'],
        what: 'Az elektromos **csap**: a gép hátulján, ide csatlakozik a vízcső. Amikor a vezérlő áramot ad a **tekercsére**, egy kis vasmag elmozdul és kinyitja a szelepet, a víz pedig a mosószer-adagoló fiókon át az üstbe folyik. Áram nélkül a szelep zárva van, így áramszünetkor sem folyik a víz. Két tekercs két ágat nyit: az egyik az előmosó, a másik a főmosó rekeszen át enged vizet.',
        madeOf: 'Műanyag szelepház, rézhuzalból tekercselt **elektromágnes**, vasmag rugóval, gumimembrán, és a bemeneten egy kis **szűrőháló** a homok ellen.',
        how: 'A szelepházat fröccsöntik, a tekercset műanyag tokba öntik (hogy ne érje víz), majd összeszerelik a membránnal és a rugóval. Minden darabot nyomás alatt szivárgásra tesztelnek.',
        uni: 'Ez egy **szervovezérelt** (elővezérelt) membránszelep: a kis mágnes csak egy apró vezérlőnyílást nyit, és a hálózati víznyomás maga emeli fel a nagy membránt. Így kis teljesítményű tekercs is nagy átfolyást kapcsol, de a működéséhez legalább kb. 0,5 bar nyomás kell. A beengedett víz mennyiségét a vezérlő egy **nyomáskapcsolóval** (az üstben lévő vízszintet a légnyomásból méri) vagy átfolyásmérővel ellenőrzi: ez már **szabályozás**, nem csak vezérlés.',
        fact: 'Áramszünetben azért nem árasztja el a lakást a mosógép, mert a mágnesszelep áram nélkül magától bezár.'
      },
      {
        id: 'futes', z: 7, name: 'Fűtőszál és NTC hőérzékelő', svg: heat, explode: [-120, 240], badge: B(TX - 4, 16, TZ - 21.5), en: 'immersion heating element with NTC thermistor',
        terms: ['fizika-bsc/belso-energia', 'msc-beagyazott/adc-periferia', 'szabalyozas/ketallasu'],
        lesson: 'fiz-alap/hotan',
        what: 'Az üst alján, a dob alatt egy U alakú **fűtőszál** melegíti a vizet, ugyanúgy, mint egy vízforraló. Mellette egy kis **hőérzékelő** (NTC termisztor) méri a víz hőmérsékletét, hogy a vezérlő tudja, mikor kell kikapcsolni a fűtést. A mosás energiájának legnagyobb része a víz melegítésére megy el.',
        madeOf: 'Rozsdamentes acélcső, benne egy ellenálláshuzal (nikkel–króm ötvözet), a kettő között szigetelő **magnézium-oxid** por. Az NTC egy fémoxid kerámia kis darabja, amelynek az ellenállása melegben csökken.',
        how: 'A huzalt a cső közepébe húzzák, a csövet magnézium-oxid porral töltik meg, majd a csövet **hengerléssel összenyomják**, hogy a por tömör legyen és jól vezesse a hőt. Végül U alakúra hajlítják, és gumitömítéses peremmel szerelik az üstbe.',
        uni: 'A fűtés energiaszükséglete `Q = m·c·ΔT`: 10 liter víz 15-ről 40 °C-ra `10·4,19·25 ≈ 1050 kJ ≈ 0,29 kWh`. Egy 2 kW-os fűtőszál ezt kb. 9 perc alatt adja le. Az NTC ellenállása `R(T) = R₀·e^{B(1/T − 1/T₀)}`: a vezérlő feszültségosztóval és **ADC**-vel méri, és táblázattal számolja vissza a hőmérsékletet. A fűtést jellemzően **kétállású szabályozással** kapcsolja (be/ki hiszterézissel). Ezért takarékos a 30–40 °C-os program: a melegítés elmarad, a tisztítást a mosószer enzimei végzik.',
        fact: 'Egy 40 °C-os mosás helyett 30 °C-ot választva a mosás energiaigénye jelentősen csökken, mert a gép energiájának nagy része a víz melegítésére megy el.'
      },
      {
        id: 'mandzsetta', z: 12, name: 'Mandzsetta (ajtótömítés)', svg: gasket, explode: [-180, 120], badge: B(TX - 15, 54, TZ + 10), en: 'door boot gasket',
        what: 'A rugalmas **gumigallér** az ajtónyílás és az üst között. Ő zárja el vízmentesen a nyílást, miközben engedi, hogy az üst a házhoz képest kilengjen. A redői miatt tud nyúlni és összehúzódni.',
        madeOf: '**EPDM** vagy szilikongumi, amely bírja a meleg vizet és a mosószereket. Belül gyakran egy-két **fémgyűrű** vagy huzalrugó szorítja az ajtóperemhez és az üst nyakához.',
        how: 'A gumit kétrészes formában **préselve vulkanizálják** (hő és nyomás alatt kikeményítik), majd a sorja eltávolítása után szilárdságra és tömítettségre ellenőrzik.',
        uni: 'A tömítés két ellentétes követelményt teljesít: vízzáró legyen, és közben néhány centiméteres relatív mozgást engedjen az üst és a ház között minimális visszaható erővel, hogy a rezgést ne vezesse át a házra. A redőkben megálló víz és mosószer-maradék a **penészedés** fő helye; ezért tanácsos mosás után nyitva hagyni az ajtót.',
        fact: 'Ha a gép kellemetlen szagú, a mandzsetta redőiben megbújó penész és szösz a leggyakoribb tettes.'
      },
      {
        id: 'ajto', z: 14, name: 'Ajtó üvegablakkal', svg: door, explode: [-300, 178], badge: B(TX - 18, 59, TZ - 6), en: 'door with glass bowl',
        what: 'Az elöltöltős gép **ajtaja**. Belül egy domború **üvegtál** van, amely kissé benyúlik a dobba, így a ruha nem szorul az ajtó és a tömítés közé, és a víz nem folyik ki. Az ajtón keresztül látszik, ahogy a ruha forog.',
        madeOf: 'Edzett, hőálló **üveg**, körülötte műanyag (ABS) keret, fém **zsanér** és egy kis acélkampó, amely a zárba akad.',
        how: 'Az üvegtálat olvadt üvegből préselik, majd hirtelen hűtéssel **edzik**, hogy ütésálló legyen. A keretet fröccsöntik, az üveget belepattintják vagy beragasztják.',
        uni: 'Az üvegtál a víz nyomásának és a dobban zuhanó ruha ütéseinek is ellenáll. Az edzett üvegben a felületen nyomó-, a belsejében húzófeszültség van, ezért nagyon erős, de ha mégis eltörik, apró, tompa szélű darabokra esik szét.',
        fact: 'Az elöltöltős mosógép ajtaja azért domború belül, hogy a ruha ne szoruljon be a tömítés mellé.'
      },
      {
        id: 'ajtozar', z: 13, name: 'Ajtózár', svg: lock, explode: [130, 186], badge: B(TX + 22, 56, TZ + 4), en: 'door interlock',
        what: 'Elektromosan **reteszelt** zár: amíg víz van a gépben vagy forog a dob, nem lehet kinyitni az ajtót. A program végén, ha a dob megállt és a víz kiürült, a zár (gyakran 1–2 perc várakozás után) kioldódik.',
        madeOf: 'Műanyag ház, benne egy kis **elektromágnes** vagy hőre táguló (bimetál/PTC) elem, amely a reteszt mozgatja, és egy kapcsoló, amely jelzi a vezérlőnek, hogy az ajtó zárva van.',
        how: 'A műanyag alkatrészeket fröccsöntik, a kapcsolót és a működtető elemet összeszerelik, majd sok ezer nyitás-zárás ciklussal tartóssági tesztet végeznek rajta.',
        uni: 'Ez **biztonsági reteszelés**: a vezérlő csak akkor indíthatja a motort és a vízbeengedést, ha a zár kapcsolója a zárt állapotot visszaigazolja. A régebbi zárak PTC fűtőelemmel működnek: ez melegszik fel és tolja be a reteszt, és lehűlés után enged; ezért a program vége után kell rá egy kicsit várni.',
        fact: 'Azért kell a program végén egy-két percet várni az ajtónyitásra, mert a régebbi zárak egy kis fűtött elemmel működnek, amelynek ki kell hűlnie.'
      },
      {
        id: 'vezerlo', z: 11, name: 'Vezérlő (kezelőpanel és elektronika)', svg: ctrl, explode: [-185, -95], badge: B(6, 57, 80), link: 'processzor', en: 'control board with microcontroller and user interface',
        terms: ['msc-beagyazott/mcu-architektura', 'szabalyozas/vezerles-szabalyozas', 'msc-beagyazott/watchdog'],
        what: 'A gép **agya**: egy nyomtatott áramköri lap egy kis számítógéppel (mikrokontrollerrel), és elöl a **kezelőpanel** a programválasztó gombbal és a kijelzővel. A kiválasztott program alapján lépésről lépésre irányítja a vízbeengedést, a fűtést, a dob forgatását, az ürítést és a centrifugálást. Közben figyeli az érzékelőket: hőmérséklet, vízszint, ajtózár, motorfordulat.',
        madeOf: '**Üvegszálas epoxi** nyomtatott áramköri lap rézvezetékekkel, rajta mikrokontroller, relék és triakok (a szivattyú, a szelep és a fűtés kapcsolására), tápegység, kijelző. Elöl műanyag előlap fóliával.',
        how: 'A lapra **SMT** technológiával ültetik be az alkatrészeket (forrasztópaszta, beültetőrobot, kemence), majd rátöltik a programot (firmware). A kész gépen a gyár egy rövid tesztprogramot futtat le.',
        uni: 'A mosóprogram egy **állapotgép** (előmosás → mosás → öblítések → centrifuga), amelynek az átmeneteit érzékelőjelek és időzítők vezérlik. A centrifuga előtt a vezérlő **kiegyensúlyozatlanság-érzékelést** végez: alacsony fordulaton a motor áramának (nyomatékának) ingadozásából becsli a ruha egyenetlen eloszlását; ha túl nagy, újra eloszlatja a ruhát, vagy csökkentett fordulattal centrifugál. A meghibásodások ellen **watchdog** és redundáns biztonsági lánc (ajtózár, túlfűtésvédelem) véd.',
        fact: 'Ha a gép centrifugálás előtt többször elindul és megáll, nem rossz: épp a ruhát próbálja egyenletesen eloszlatni a dobban.'
      }
    ],
    uni: {
      text: 'A mosógép három klasszikus mérnöki problémát old meg. **1. Centrifugális gyorsulás:** `a = ω²·r`, a g-szám `a/g = r·(2πn/60)²/g`; r = 0,25 m és n = 1400/perc esetén kb. **550 g**. A ruhában maradó víz mennyiségét a g-szám és az idő határozza meg. **2. Kiegyensúlyozatlanság és rezgés:** a ruha egyenetlen eloszlása excentrikus tömeget (`m_e·e`) jelent, ennek forgó ereje `F = m_e·e·ω²` a fordulatszám négyzetével nő. A lengő egység (M tömeg, k rugómerevség, c csillapítás) mozgásegyenlete `M·x″ + c·x′ + k·x = m_e·e·ω²·cos ωt`. A sajátfrekvencia néhány Hz, ezért a felfutás áthalad a rezonancián; a nagy fordulaton a kitérés `≈ m_e·e/M` – ezért kell a **beton ellensúly**. A vezérlő a motoráram ingadozásából becsli az egyenetlenséget, és csak akkor gyorsít, ha az elég kicsi. **3. A mosás kémiája:** a **tenzidek** (felületaktív anyagok) molekulájának egyik vége vízkedvelő (poláris), a másik zsírkedvelő (apoláris szénlánc). Csökkentik a víz felületi feszültségét, így a víz jobban nedvesíti a szálakat, a zsíros szennyeződést pedig **micellákba** zárják és a vízben lebegve tartják. Az **enzimek** (proteáz, amiláz, lipáz) a fehérje-, keményítő- és zsírfoltokat bontják, már alacsony hőmérsékleten is. A vízlágyítók (pl. foszfonátok, zeolitok) a kalcium- és magnéziumionokat kötik meg, hogy ne csapják ki a tenzideket. A tisztítás a **Sinner-kör** négy tényezőjének összjátéka: kémia, hőmérséklet, mechanika és idő.',
      terms: ['mechanika/szabad-rezges', 'mechanika/csillapitas', 'mechanika/rezonancia', 'fizika-bsc/harmonikus-rezges', 'kemia-bsc/intermolekularis', 'szerves-kemia/lipid', 'e-mobilitas/foc']
    },
    steps: [
      { icon: '🚪', title: '1. Ajtó bezárva, zár reteszel', text: 'Bekapcsolás és programválasztás után a vezérlő **reteszeli az ajtózárat**, és csak a visszajelzés után indul tovább. Közben a dob néhány fordulattal „megméri” a ruha tömegét.', parts: ['ajtozar', 'vezerlo', 'ajto'] },
      { icon: '🚰', title: '2. Vízbeengedés', text: 'A **mágnesszelep** kinyit, a víz a mosószer-adagoló rekeszen át az **üstbe** folyik, és magával viszi a mosószert. Egy nyomásérzékelő figyeli a vízszintet; ha elég, a szelep bezár.', parts: ['szelep', 'ust'] },
      { icon: '🔥', title: '3. Melegítés', text: 'A **fűtőszál** felmelegíti a vizet a beállított hőmérsékletre, az **NTC** érzékelő folyamatosan méri. Közben a dob lassan forog, hogy a mosószer feloldódjon és a ruha átázzon.', parts: ['futes', 'dob'] },
      { icon: '🔄', title: '4. Mosás', text: 'A **motor** a **szíjon** át percenként kb. 40–60 fordulattal forgatja a **dobot**, hol jobbra, hol balra. A bordák felemelik és visszaejtik a ruhát: a mechanikus mozgás és a mosószer együtt oldja ki a szennyet.', parts: ['motor', 'szij', 'dob', 'csapagy'] },
      { icon: '💧', title: '5. Ürítés és öblítés', text: 'A **szivattyú** a **szűrőn** át kiszivattyúzza a szennyes vizet. Friss víz jön, a dob forog, majd megint ürítés: ezt 2–3-szor ismétli, hogy a mosószer kiöblítődjön.', parts: ['szivattyu', 'szelep', 'dob'] },
      { icon: '⚖️', title: '6. A ruha eloszlatása', text: 'Centrifugálás előtt a dob lassan gyorsul, hogy a ruha egyenletesen a falra tapadjon. A **vezérlő** a motor áramából becsli, mennyire egyenetlen a ruha eloszlása; ha túlságosan, újrakezdi.', parts: ['vezerlo', 'motor', 'dob'] },
      { icon: '🌀', title: '7. Centrifugálás', text: 'A dob 1000–1400-as fordulatra gyorsul, a víz a lyukakon át kirepül a ruhából. Felfutás közben a gép áthalad a **rezonancián**; a **rugók**, a **lengéscsillapítók** és az **ellensúly** tartják kordában a rázkódást.', parts: ['dob', 'felfugg', 'ellensuly', 'csapagy'] },
      { icon: '🔓', title: '8. Vége: lassítás és kioldás', text: 'A motor fékez, a szivattyú kiüríti a maradék vizet, a dob megáll. Ha a vízszint nulla és a dob áll, az **ajtózár** kiold. Tipp: hagyd résnyire nyitva az ajtót, hogy a **mandzsetta** kiszáradjon.', parts: ['ajtozar', 'mandzsetta', 'szivattyu'] }
    ],
    history: [
      { year: '1767', text: 'Jacob Christian **Schäffer** német tudós leírást közöl egy kézzel hajtott mosógépről; Európában ez az egyik első részletesen dokumentált mosógép-terv.' },
      { year: '1851', text: 'James **King** (USA) szabadalmaztat egy kézi hajtású, **forgódobos** mosógépet: a mai dobos gépek őse.' },
      { year: '1907', text: 'A Henkel piacra dobja a **Persilt**, amelyet „önműködő” mosószerként reklámoznak: perborátot és szilikátot is tartalmaz, a ruhát dörzsölés nélkül is fehéríti.' },
      { year: '1908', text: 'Az amerikai Hurley Machine Company forgalomba hozza a **Thor** elektromos mosógépet, az első tömegesen árusított elektromos mosógépek egyikét.' },
      { year: '1937', text: 'A Bendix bemutatja az első **automata elöltöltős** háztartási mosógépet. Mivel még nem volt rugós felfüggesztése, a padlóhoz kellett csavarozni, hogy centrifugáláskor el ne vándoroljon.' },
      { year: '1940-es évek', text: 'Megjelennek a szintetikus **tenzides** mosószerek, amelyek kemény vízben is jól mosnak, szemben a szappannal, amely a kalciummal oldhatatlan „szappanmészt” képez.' },
      { year: '1990-es évek', text: 'A mosógépek vezérlését egyre inkább **mikrokontrolleres** elektronika végzi a mechanikus programkapcsolók helyett: elterjed a ruhatömeg-érzékelés és a kiegyensúlyozatlanság-figyelés.' },
      { year: '1995', text: 'Az Európai Unióban bevezetik a mosógépek **energiacímkéjét**; a vásárlók azóta össze tudják hasonlítani a gépek energia- és vízfogyasztását.' },
      { year: '2000-es évek', text: 'Terjednek az **inverteres, kefe nélküli** motorok és a szíj nélküli **direkt hajtás**: csendesebb, takarékosabb és tartósabb gépek.' },
      { year: '2021', text: 'Az EU **új, átskálázott energiacímkét** vezet be (A–G skála, „+” jelek nélkül), amely a mosógépek vízfogyasztását és egy tipikus program időtartamát is feltünteti.' }
    ],
    quiz: [
      { q: 'Miért van betontömb a mosógépben?', options: ['Hogy a nehezebb lengő egység kevésbé rázkódjon centrifugáláskor', 'Hogy a víz gyorsabban felmelegedjen', 'Hogy a motor hűvös maradjon', 'Csak a szállítás miatt, használat előtt ki kell venni'], answer: 0, explain: 'Ugyanaz a kiegyensúlyozatlansági erő egy nehezebb testet kevésbé mozdít meg: a kitérés nagy fordulaton kb. m_e·e/M, ezért a nagy M (a beton) kis rezgést jelent.' },
      { q: 'Kb. hány g-s gyorsulás hat a ruhára 1400/perc centrifugánál egy kb. 50 cm átmérőjű dobban?', options: ['kb. 550 g', 'kb. 5 g', 'kb. 50 g', 'kb. 50 000 g'], answer: 0, explain: 'a = ω²·r, ω = 2π·1400/60 ≈ 147 1/s, r = 0,25 m: a ≈ 5400 m/s², ez kb. 550-szerese a nehézségi gyorsulásnak.' },
      { q: 'Miért ráz a gép jobban centrifugálás elején, mint teljes sebességnél?', options: ['Mert felfutás közben a fordulatszám áthalad a felfüggesztés sajátfrekvenciáján (rezonancia)', 'Mert a motor ilyenkor a leggyengébb', 'Mert ilyenkor van a legtöbb víz a dobban', 'Mert az ajtózár ilyenkor old ki'], answer: 0, explain: 'A rugós felfüggesztés sajátfrekvenciája néhány Hz; amikor a dob forgási frekvenciája ezzel egyezik, a kitérés megnő. Nagyobb fordulaton a rendszer már a rezonancia fölött van, és nyugodtabb.' },
      { q: 'Mit csinálnak a tenzidek a mosószerben?', options: ['Egyik végükkel a vízhez, másikkal a zsírhoz kötődnek, így a zsíros szennyet a vízben lebegő micellákba zárják', 'Felmelegítik a vizet', 'Fehérre festik a ruhát', 'Megkötik a dobban a fémet'], answer: 0, explain: 'A tenzid molekulája kettős természetű: poláris feje vízkedvelő, apoláris szénlánca zsírkedvelő. Csökkenti a felületi feszültséget, és a zsírt micellákba zárja.' },
      { q: 'Mi a mágnesszelep feladata?', options: ['Elektromos jelre kinyitja és elzárja a vízbevezetést', 'Kiszivattyúzza a szennyes vizet', 'Reteszeli az ajtót', 'Méri a víz hőmérsékletét'], answer: 0, explain: 'A tekercsen átfolyó áram elmozdítja a vasmagot, és a szelep kinyit; áram nélkül zárva van, ezért áramszünetkor sem folyik be a víz.' }
    ]
  });
})();
