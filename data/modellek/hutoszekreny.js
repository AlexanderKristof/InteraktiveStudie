/* Modell: Hűtőszekrény (felül fagyasztós, no-frost kombi) – izometrikus nézet, kinyitott ajtókkal.
 * Az oldalfal és a tető átlátszó, hogy a hátoldali hűtőkör (kompresszor, kondenzátor, kapilláris) látható legyen;
 * a homlokperemen metszetben látszik a PUR hab. Színkód: piros = forró gáz, narancs = meleg folyadék,
 * vörösréz = kapilláris cső, kék = hideg (elpárolgó) hűtőközeg, világoskék = szívóoldali hideg gőz. */
(function () {
  var K = 2.0, OX = 378, OY = 448;
  var I = STUDIE.draw.iso(OX, OY, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  function f1(n) { return (+n).toFixed(1); }
  function P(p) { return f1(p[0]) + ',' + f1(p[1]); }
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  /* Rajzsíkok: a belső koordináták (u, v) a sík „saját” rendszerében, v lefelé nő (v = −z). */
  function planeY(y, inner, extra) {   // y = állandó sík (balra-le néző lap): u = x
    return '<g transform="matrix(' + f1(0.866 * K * 1000 / 1000) + ',' + (0.5 * K).toFixed(4) + ',0,' + K + ',' + f1(OX - y * 0.866 * K) + ',' + f1(OY + y * 0.5 * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function planeX(x, inner, extra) {   // x = állandó sík (jobbra-le néző lap): u = −y
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (-0.5 * K).toFixed(4) + ',0,' + K + ',' + f1(OX + x * 0.866 * K) + ',' + f1(OY + x * 0.5 * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function planeZ(z, inner, extra) {   // vízszintes sík: u = x, v = y
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + (-0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + OX + ',' + f1(OY - z * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function line(a, b, stroke, w, extra) {
    var p = I.pt(a[0], a[1], a[2]), q = I.pt(b[0], b[1], b[2]);
    return '<line x1="' + f1(p[0]) + '" y1="' + f1(p[1]) + '" x2="' + f1(q[0]) + '" y2="' + f1(q[1]) + '" stroke="' + stroke + '" stroke-width="' + w + '"' + (extra || '') + '/>';
  }
  function pathD(pts) { return pts.map(function (p, i) { var s = I.pt(p[0], p[1], p[2]); return (i ? 'L' : 'M') + f1(s[0]) + ' ' + f1(s[1]); }).join(' '); }
  /* Cső: sötét kontúr, színes mag, csillanás + széles átlátszó „fogó” sáv a kattintáshoz. */
  function pipe(pts, color, w) {
    var d = pathD(pts), j = '" fill="none" stroke-linejoin="round" stroke-linecap="round"';
    return '<path d="' + d + j + ' stroke="transparent" stroke-width="' + (w + 7) + '"/>' +
      '<path d="' + d + j + ' stroke="' + shade(color, 0.55) + '" stroke-width="' + (w + 1.6) + '"/>' +
      '<path d="' + d + j + ' stroke="' + color + '" stroke-width="' + w + '"/>' +
      '<path d="' + d + j + ' stroke="rgba(255,255,255,.45)" stroke-width="' + f1(w * 0.3) + '" transform="translate(-0.5 -0.7)"' + NS + '/>';
  }
  function arrowAt(a, b, color) {
    var p = I.pt(a[0], a[1], a[2]), q = I.pt(b[0], b[1], b[2]);
    var ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI, m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    return '<path d="M-5 -4.5 L5 0 L-5 4.5 Z" transform="translate(' + f1(m[0]) + ' ' + f1(m[1]) + ') rotate(' + f1(ang) + ')" fill="' + color + '" stroke="#fff" stroke-width="1"' + NS + '/>';
  }
  /* Fekvő henger x tengellyel. */
  function cylX(cx, cy, cz, r, len, color) {
    var n = 20, s = '', i;
    function q(a, t) { return I.pt(cx + t, cy + r * Math.cos(a), cz + r * Math.sin(a)); }
    for (i = 0; i < n; i++) {
      var a0 = i / n * 2 * Math.PI, a1 = (i + 1) / n * 2 * Math.PI, m = (a0 + a1) / 2, f = Math.cos(m) + Math.sin(m);
      if (f <= -0.2) continue;
      var c = shade(color, 0.6 + 0.32 * (f + 0.2) / 1.62);
      s += '<polygon points="' + [q(a0, 0), q(a1, 0), q(a1, len), q(a0, len)].map(P).join(' ') + '" fill="' + c + '" stroke="' + c + '" stroke-width="0.5"/>';
    }
    var cap = [];
    for (i = 0; i < n; i++) cap.push(q(i / n * 2 * Math.PI, len));
    return s + '<polygon points="' + cap.map(P).join(' ') + '" fill="' + shade(color, 1.08) + '" stroke="rgba(0,0,0,.35)" stroke-width="0.6"/>';
  }
  /* Áttetsző doboz (a shade() csak hex színt ismer, ezért az átlátszóságot csoportra tesszük). */
  function tbox(x, y, z, w, d, h, hex, op, extra) { return '<g opacity="' + op + '">' + I.box(x, y, z, w, d, h, hex, extra) + '</g>'; }
  function yDisc(cx, cy, cz, r, n) {
    var pts = [];
    for (var i = 0; i < (n || 32); i++) { var a = i / (n || 32) * 2 * Math.PI; pts.push(I.pt(cx + r * Math.cos(a), cy, cz + r * Math.sin(a))); }
    return pts;
  }

  var defs = '<defs>' +
    '<linearGradient id="hu-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9e9f5" stop-opacity=".34"/><stop offset="1" stop-color="#a9c2d6" stop-opacity=".16"/></linearGradient>' +
    '<pattern id="hu-foam" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="#f3cf5b"/><circle cx="1" cy="1.2" r=".55" fill="#d9a92c"/><circle cx="3" cy="3" r=".4" fill="#e3b843"/></pattern>' +
    '<linearGradient id="hu-dome" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1f252d"/><stop offset=".55" stop-color="#4d5664"/><stop offset="1" stop-color="#1b2027"/></linearGradient>' +
    '<radialGradient id="hu-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff8dc" stop-opacity=".95"/><stop offset=".45" stop-color="#fff3c4" stop-opacity=".45"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="hu-ice" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9f5fd"/><stop offset="1" stop-color="#cfe5f6"/></linearGradient>' +
    '</defs>';
  var backdrop = defs +
    '<text class="lbl" x="14" y="26" font-size="17">Hűtőszekrény – felül fagyasztós, no-frost kombi</text>' +
    '<text class="lbl-muted" x="14" y="44">kinyitott ajtókkal, átlátszó oldalfallal</text>' +
    '<ellipse cx="358" cy="592" rx="260" ry="22" fill="rgba(0,0,0,.06)"' + NS + '/>' +
    '<g transform="translate(606 24)">' +
    '<rect x="0" y="-9" width="22" height="6" rx="3" fill="#e0402e"/><text class="lbl-muted" x="28" y="-2">forró gáz (50–70 °C)</text>' +
    '<rect x="0" y="7" width="22" height="6" rx="3" fill="#f08a24"/><text class="lbl-muted" x="28" y="14">meleg folyadék</text>' +
    '<rect x="0" y="23" width="22" height="6" rx="3" fill="#2f6fd6"/><text class="lbl-muted" x="28" y="30">hideg, forrásban (−25 °C)</text>' +
    '<rect x="0" y="39" width="22" height="6" rx="3" fill="#4fc0e8"/><text class="lbl-muted" x="28" y="46">hideg gőz (szívóoldal)</text></g>';

  /* Méretek (rajzi egység ≈ 1 cm): szélesség x 0…60, mélység y 0…64 (elöl y = 64), magasság z 0…182. */
  var W = 60, D = 64, H = 182;
  var LINER = '#f4f7fa';

  /* ---------- Szekrény: külső burkolat, belső bélés, lábazati rács ---------- */
  var cab = '';
  // gépház-mélyedés hátul lent + hűtőtér belső falai (bal fal, padló, lépcső)
  cab += I.poly([I.pt(5, 6, 8), I.pt(5, D, 8), I.pt(5, D, 120), I.pt(5, 6, 120)], shade(LINER, 0.84));            // bal belső fal (x = 5)
  cab += I.poly([I.pt(5, 6, 24), I.pt(55, 6, 24), I.pt(55, 22, 24), I.pt(5, 22, 24)], shade(LINER, 0.97));       // lépcső teteje
  cab += I.poly([I.pt(5, 22, 8), I.pt(55, 22, 8), I.pt(55, 22, 24), I.pt(5, 22, 24)], shade(LINER, 0.78));       // lépcső homloka
  cab += I.poly([I.pt(5, 22, 8), I.pt(55, 22, 8), I.pt(55, D, 8), I.pt(5, D, 8)], shade(LINER, 0.95));           // padló
  // hátfal (bélés) – félig áttetsző, mögötte a kondenzátor sejlik át
  cab += I.poly([I.pt(5, 6, 24), I.pt(55, 6, 24), I.pt(55, 6, 120), I.pt(5, 6, 120)], 'rgba(236,241,246,.62)', ' stroke="rgba(120,135,155,.45)" stroke-width=".8"' + NS);
  // légbefúvó nyílások a hátfal tetején (a no-frost rendszer hideg levegője itt érkezik)
  for (var vs = 0; vs < 5; vs++) cab += I.poly([I.pt(36 + vs * 3.2, 6.1, 113), I.pt(37.8 + vs * 3.2, 6.1, 113), I.pt(37.8 + vs * 3.2, 6.1, 117), I.pt(36 + vs * 3.2, 6.1, 117)], '#9fb0c2', ' stroke="none"');
  // fagyasztótér-szint padlója (válaszfal teteje) – a fagyasztótérhez tartozó bélés külön alkatrész
  // lábazat: rács elöl
  cab += I.box(0, 22, 0, W, D - 22, 8, '#d5dbe2');
  for (var gx = 6; gx < 54; gx += 3) cab += line([gx, D + 0.05, 1.8], [gx, D + 0.05, 6.4], '#5b6573', 1.6, ' stroke-linecap="round"');
  // átlátszó jobb oldalfal és tető (nem kattinthatók, hogy mögöttük a hűtőkör elérhető legyen)
  cab += I.poly([I.pt(W, 0, 8), I.pt(W, D, 8), I.pt(W, D, H), I.pt(W, 0, H)], 'url(#hu-glass)', ' stroke="#8b9bb0" stroke-width="1"' + NS);
  cab += I.poly([I.pt(0, 0, H), I.pt(W, 0, H), I.pt(W, D, H), I.pt(0, D, H)], 'url(#hu-glass)', ' stroke="#8b9bb0" stroke-width="1"' + NS);
  // tömör élek (ezekre is lehet kattintani)
  [[[0, 0, H], [W, 0, H]], [[W, 0, H], [W, D, H]], [[0, 0, H], [0, D, H]], [[W, 0, 8], [W, 0, H]], [[W, D, 8], [W, D, H]], [[0, D, H], [W, D, H]]].forEach(function (e) {
    cab += line(e[0], e[1], 'transparent', 8) + line(e[0], e[1], '#9aa7b7', 2.4, ' stroke-linecap="round"');
  });
  // állítható lábak
  [[4, D - 4], [W - 4, D - 4]].forEach(function (f) { cab += I.cyl(f[0], f[1], -3, 2.2, 3, '#4a525e'); });

  /* ---------- Homlokperem metszetben: PUR hab acél burkolat és műanyag bélés között ---------- */
  var rimPath = 'M0 -8 H60 V-182 H0 Z M5 -8 H55 V-120 H5 Z M5 -126 H55 V-177 H5 Z';
  var foam = planeY(D, '<path d="' + rimPath + '" fill="url(#hu-foam)" fill-rule="evenodd" stroke="#e9edf2" stroke-width="1.1"/>' +
    '<path d="M1.1 -8 V-180.9 H58.9 V-8" fill="none" stroke="#c2cad4" stroke-width=".7"/>' +
    '<path d="M3.9 -8 V-121.1 H56.1 V-8 M3.9 -124.9 H56.1 V-178.1 H3.9 Z" fill="none" stroke="#dfe5ec" stroke-width="1.1"/>' +
    '<text x="57.5" y="-150" font-size="2.6" font-family="sans-serif" font-weight="700" fill="#8a6412" transform="rotate(-90 57.5 -150)">PUR hab · 5 cm</text>');
  // a hab a válaszfalban is ott van (vastagabb csík a két tér között)
  foam += planeY(D + 0.02, '<rect x="5" y="-126" width="50" height="6" fill="url(#hu-foam)" stroke="#e9edf2" stroke-width=".8"/>');

  /* ---------- Fagyasztótér: jeges bélés, rácspolc, jégkockatartó, fagyasztott áru ---------- */
  var ICE = '#dcecf8';
  var frz = I.poly([I.pt(5, 6, 126), I.pt(5, D, 126), I.pt(5, D, 177), I.pt(5, 6, 177)], shade(ICE, 0.86)) +
    I.poly([I.pt(5, 6, 126), I.pt(55, 6, 126), I.pt(55, D, 126), I.pt(5, D, 126)], shade(ICE, 0.98)) +
    I.poly([I.pt(5, 6, 126), I.pt(55, 6, 126), I.pt(55, 6, 177), I.pt(5, 6, 177)], 'rgba(214,232,247,.62)', ' stroke="rgba(110,140,170,.45)" stroke-width=".8"' + NS);
  // dércsillagok a bal falon
  [[20, 168], [40, 140], [52, 172], [30, 133]].forEach(function (c) {
    var p = I.pt(5.1, c[0], c[1]);
    frz += '<path d="M' + f1(p[0] - 3) + ' ' + f1(p[1]) + ' h6 M' + f1(p[0]) + ' ' + f1(p[1] - 3) + ' v6 M' + f1(p[0] - 2) + ' ' + f1(p[1] - 2) + ' l4 4 M' + f1(p[0] + 2) + ' ' + f1(p[1] - 2) + ' l-4 4" stroke="#ffffff" stroke-width="1" stroke-linecap="round"' + NS + '/>';
  });
  frz += planeX(5.1, '<text x="-36" y="-166" font-size="6.5" font-family="sans-serif" font-weight="800" fill="#2f6fd6">−18 °C</text>', NS);
  // rácspolc a fagyasztó első felében
  var shelfZ = 150;
  for (var wy = 30; wy <= 62; wy += 4) frz += line([6, wy, shelfZ], [54, wy, shelfZ], '#b9c4d0', 1.1);
  frz += line([6, 30, shelfZ], [6, 62, shelfZ], '#97a3b1', 1.6) + line([54, 30, shelfZ], [54, 62, shelfZ], '#97a3b1', 1.6) + line([6, 62, shelfZ], [54, 62, shelfZ], '#97a3b1', 2);
  // fagyasztott áru a polcon (pizzásdoboz, zöldborsó-zacskó) és jégkockatartó alul
  frz += I.box(12, 36, shelfZ, 26, 22, 4, '#d9493b') + planeZ(shelfZ + 4.05, '<text x="16" y="49" font-size="5" font-weight="800" font-family="sans-serif" fill="#fff">PIZZA</text>', NS);
  frz += I.box(40, 40, shelfZ, 12, 16, 7, '#3f9b52');
  frz += I.box(12, 30, 126, 30, 16, 4, '#bfe0f5');
  for (var ix = 0; ix < 5; ix++) for (var iy = 0; iy < 2; iy++) frz += I.face(13.5 + ix * 5.6, 31.5 + iy * 7, 130.05, 4.4, 5.8, '#eaf6ff', ' stroke="#8fbfe0" stroke-width=".5"');
  frz += I.box(30, 50, 126, 18, 12, 9, '#f2f2f2') + planeY(62.05, '<text x="31.5" y="-130" font-size="3.6" font-weight="800" font-family="sans-serif" fill="#c0392b">FAGYI</text>', NS);

  /* ---------- Elpárologtató (lamellás, a fagyasztó hátfala előtt) ---------- */
  var EV = { x: 8, y: 7, z: 134, w: 34, d: 4, h: 30 };
  var evap = I.box(EV.x, EV.y, EV.z, EV.w, EV.d, EV.h, '#c9d3dd');
  for (var fx = EV.x + 1.5; fx < EV.x + EV.w; fx += 1.6) evap += line([fx, EV.y + EV.d + 0.02, EV.z + 0.6], [fx, EV.y + EV.d + 0.02, EV.z + EV.h - 0.6], 'rgba(80,100,125,.55)', 0.6, NS);
  for (var tz = EV.z + 4; tz < EV.z + EV.h; tz += 6) evap += line([EV.x - 1, EV.y + EV.d + 0.3, tz], [EV.x + EV.w + 1, EV.y + EV.d + 0.3, tz], '#2f6fd6', 2.2, ' stroke-linecap="round"');
  for (tz = EV.z + 4; tz < EV.z + EV.h - 6; tz += 12) {   // csőívek a jobb oldalon
    var a1 = I.pt(EV.x + EV.w + 1, EV.y + EV.d + 0.3, tz), a2 = I.pt(EV.x + EV.w + 1, EV.y + EV.d + 0.3, tz + 6);
    evap += '<path d="M' + P(a1) + ' Q' + f1(a1[0] + 7) + ' ' + f1((a1[1] + a2[1]) / 2) + ' ' + P(a2) + '" fill="none" stroke="#2f6fd6" stroke-width="2.2"/>';
  }
  for (tz = EV.z + 10; tz < EV.z + EV.h; tz += 12) {
    var b1 = I.pt(EV.x - 1, EV.y + EV.d + 0.3, tz), b2 = I.pt(EV.x - 1, EV.y + EV.d + 0.3, tz + 6);
    evap += '<path d="M' + P(b1) + ' Q' + f1(b1[0] - 7) + ' ' + f1((b1[1] + b2[1]) / 2) + ' ' + P(b2) + '" fill="none" stroke="#2f6fd6" stroke-width="2.2"/>';
  }
  // dérréteg a lamellák tetején
  evap += I.face(EV.x, EV.y, EV.z + EV.h + 0.05, EV.w, EV.d, 'rgba(255,255,255,.85)', ' stroke="none"');

  /* ---------- No-frost ventilátor, leolvasztó fűtőszál, levegőcsatorna ---------- */
  var nf = I.box(45, 6.5, 142, 9, 3, 18, '#5b6573');
  var FC = [49.5, 9.6, 151];
  nf += I.poly(yDisc(FC[0], FC[1], FC[2], 4, 24), '#2e353f', ' stroke="#1d2229" stroke-width=".6"');
  for (var bl = 0; bl < 4; bl++) {
    var ba = bl * Math.PI / 2 + 0.4, bp = [];
    for (var t = 0; t <= 1.001; t += 0.25) bp.push(I.pt(FC[0] + (0.8 + 2.8 * t) * Math.cos(ba + 0.3 * t), FC[1] + 0.1, FC[2] + (0.8 + 2.8 * t) * Math.sin(ba + 0.3 * t)));
    for (t = 1; t >= -0.001; t -= 0.25) bp.push(I.pt(FC[0] + (0.8 + 2.8 * t) * Math.cos(ba + 0.3 * t + 0.9), FC[1] + 0.1, FC[2] + (0.8 + 2.8 * t) * Math.sin(ba + 0.3 * t + 0.9)));
    nf += I.poly(bp, '#8fc6ec', ' stroke="#3d7fb0" stroke-width=".5"');
  }
  nf += I.poly(yDisc(FC[0], FC[1] + 0.2, FC[2], 0.9, 12), '#c3ccd6', ' stroke="none"');
  // leolvasztó fűtőszál (cikcakk az elpárologtató alatt) és olvadékvíz-gyűjtő tölcsér
  var hz = [];
  for (var hx = 0; hx <= 16; hx++) hz.push([EV.x + hx * EV.w / 16, EV.y + EV.d + 0.6, EV.z - (hx % 2 ? 3 : 1)]);
  nf += '<path d="' + pathD(hz) + '" fill="none" stroke="transparent" stroke-width="6"/>' +
    '<path d="' + pathD(hz) + '" fill="none" stroke="#7a1f14" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<path d="' + pathD(hz) + '" fill="none" stroke="#ff6a3d" stroke-width="1.3" stroke-linejoin="round"/>';
  nf += I.poly([I.pt(20, 7, 128), I.pt(30, 7, 128), I.pt(30, 12, 128), I.pt(20, 12, 128)], '#9aa6b5') + I.cyl(25, 9, 126, 1.3, 2, '#7d8896');
  // hideg levegő útja: a ventilátortól lefelé a hűtőtérbe (szaggatott nyíl)
  var air = [[51, 7.4, 142], [51, 7.4, 124], [44, 7.4, 118]];
  nf += '<path d="' + pathD(air) + '" fill="none" stroke="#4fa3e0" stroke-width="2" stroke-dasharray="4 3"' + NS + '/>' + arrowAt(air[1], air[2], '#4fa3e0');
  nf += I.box(49, 6.2, 121, 5, 1.6, 4, '#7d8896');   // légcsappantyú (damper)

  /* ---------- Polcok és zöldségtartó (a hűtőtérben) + némi élelmiszer ---------- */
  var shelves = '';
  // zöldségtartó fiók alul
  shelves += tbox(6, 24, 8.5, 48, 38, 20, '#c8e2f2', .55, ' stroke="#46698f" stroke-width=".8" stroke-linejoin="round"');
  [[14, 40, 13, 4.2, '#d63b2f'], [22, 46, 13, 4.2, '#e04a33'], [36, 36, 13, 5, '#5aa33d'], [44, 48, 12.5, 4, '#f08a24'], [30, 52, 12.5, 3.6, '#d63b2f']].forEach(function (v) {
    var p = I.pt(v[0], v[1], v[2]);
    shelves += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="' + f1(v[3] * K) + '" fill="' + v[4] + '" stroke="' + shade(v[4], 0.6) + '" stroke-width=".8"/>' +
      '<circle cx="' + f1(p[0] - v[3] * 0.35 * K) + '" cy="' + f1(p[1] - v[3] * 0.4 * K) + '" r="' + f1(v[3] * 0.28 * K) + '" fill="rgba(255,255,255,.45)"' + NS + '/>';
  });
  shelves += tbox(6, 60.5, 8.5, 48, 1.5, 20, '#c8e2f2', .6, ' stroke="#46698f" stroke-width=".8"') +
    I.poly([I.pt(22, 62.05, 24), I.pt(38, 62.05, 24), I.pt(38, 62.05, 26.4), I.pt(22, 62.05, 26.4)], '#8aa1b8', ' stroke="none"');
  // üvegpolcok
  [30, 58, 86].forEach(function (z) {
    shelves += tbox(5, 8, z, 50, 54, 1.2, '#c4e4f6', .6, ' stroke="#467aa0" stroke-width=".7" stroke-linejoin="round"') +
      I.box(5, 61, z - 0.8, 50, 1.6, 2.8, '#9aa7b7');
  });
  // élelmiszer a polcokon: tej, befőttes üveg, sajt, tojástartó, tál
  shelves += I.box(12, 30, 31.2, 9, 9, 20, '#f6f7f9') + I.poly([I.pt(12, 39, 51.2), I.pt(21, 39, 51.2), I.pt(16.5, 39, 55)], '#e6e8ec') +
    planeY(39.05, '<rect x="12.6" y="-46" width="7.8" height="6" fill="#3b82d6"/><text x="13.3" y="-41.6" font-size="3.3" font-weight="800" font-family="sans-serif" fill="#fff">TEJ</text>', NS);
  shelves += I.cyl(36, 40, 31.2, 5, 11, '#b8553a') + I.cyl(36, 40, 42.2, 5.3, 2, '#d9b13b');
  shelves += I.box(26, 34, 59.2, 16, 12, 6, '#f2d16b');
  [[30, 39], [35, 41], [39, 37]].forEach(function (h) { var p = I.pt(h[0], h[1], 65.25); shelves += '<ellipse cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" rx="2.2" ry="1.3" fill="#d6ae3f"' + NS + '/>'; });
  shelves += I.cyl(18, 44, 87.2, 9, 5, '#e8eef4') + I.cyl(18, 44, 92.2, 8, 0.4, '#7cc36a');
  shelves += I.box(32, 26, 87.2, 16, 22, 5, '#d8c4a4');
  for (var ex = 0; ex < 3; ex++) for (var ey = 0; ey < 2; ey++) { var ep = I.pt(35 + ex * 5, 31 + ey * 9, 92.6); shelves += '<ellipse cx="' + f1(ep[0]) + '" cy="' + f1(ep[1]) + '" rx="3.6" ry="2.6" fill="#f7ead3" stroke="#c8b08a" stroke-width=".5"/>'; }

  /* ---------- Világítás: LED-panel a hűtőtér tetején + ajtókapcsoló ---------- */
  var lc = I.pt(22, 6.2, 113);
  var light = '<ellipse cx="' + f1(lc[0]) + '" cy="' + f1(lc[1] + 22) + '" rx="62" ry="40" fill="url(#hu-glow)" opacity=".75"' + NS + '/>' +
    I.box(12, 6.2, 110, 20, 2.4, 6, '#e8ecf1') + planeY(8.65, '<rect x="13.2" y="-115" width="17.6" height="4" rx="1.4" fill="#fffbe6" stroke="#f3d77a" stroke-width=".5"/>' +
      [15, 18.5, 22, 25.5, 29].map(function (u) { return '<circle cx="' + u + '" cy="-113" r=".9" fill="#ffd34d"/>'; }).join(''));
  light += I.box(1.6, D, 108, 2, 1.6, 4, '#c3ccd6') + I.box(2.1, D + 1.6, 109, 1, 1.2, 2, '#e05a4b');

  /* ---------- Termosztát / hőérzékelő a bal belső falon ---------- */
  var th = I.box(5, 36, 94, 3.5, 22, 14, '#e9edf2');
  th += planeX(8.55, '<circle cx="-47" cy="-101" r="5" fill="#ffffff" stroke="#8a96a6" stroke-width=".8"/>' +
    '<path d="M-47 -101 L-47 -105.2" stroke="#2f6fd6" stroke-width="1.4" stroke-linecap="round"/>' +
    [0, 1, 2, 3, 4, 5, 6].map(function (i) { var a = (-215 + i * 41.7) * Math.PI / 180; return '<line x1="' + f1(-47 + 5.8 * Math.cos(a)) + '" y1="' + f1(-101 + 5.8 * Math.sin(a)) + '" x2="' + f1(-47 + 6.8 * Math.cos(a)) + '" y2="' + f1(-101 + 6.8 * Math.sin(a)) + '" stroke="#8a96a6" stroke-width=".6"/>'; }).join('') +
    '<rect x="-57" y="-105" width="8" height="6" rx="1" fill="#1f2a36"/><text x="-53" y="-100.6" text-anchor="middle" font-size="3.4" font-family="monospace" font-weight="700" fill="#7ee0ff">+4°</text>');
  // érzékelő (NTC) a falon, vezetékkel
  th += '<path d="' + pathD([[5.3, 36, 100], [5.3, 22, 100], [5.3, 18, 96]]) + '" fill="none" stroke="#5b6573" stroke-width="1.1"/>' + I.cyl(5.8, 17, 92, 1.1, 4, '#3b4350');

  /* ---------- Kompresszor (a hátsó, alsó gépházban) ---------- */
  var C = [40, 10];
  var comp = I.box(28, 1, 0.5, 24, 18, 1.5, '#59636f');
  [[31, 4], [49, 4], [31, 16], [49, 16]].forEach(function (g) { comp += I.cyl(g[0], g[1], 2, 1.6, 1.6, '#2a2f36'); });
  var cb = I.pt(C[0], C[1], 3.5), ct = I.pt(C[0], C[1], 16), crx = 8 * 1.2247 * K, cry = 8 * 0.7071 * K;
  comp += '<path d="M' + f1(cb[0] - crx) + ' ' + f1(cb[1]) + ' A' + f1(crx) + ' ' + f1(cry) + ' 0 0 0 ' + f1(cb[0] + crx) + ' ' + f1(cb[1]) +
    ' L' + f1(ct[0] + crx) + ' ' + f1(ct[1]) + ' A' + f1(crx) + ' ' + f1(cry * 1.9) + ' 0 0 0 ' + f1(ct[0] - crx) + ' ' + f1(ct[1]) + ' Z" fill="url(#hu-dome)" stroke="#14181d" stroke-width="1"/>';
  comp += '<path d="M' + f1(cb[0] - crx) + ' ' + f1(cb[1] - 9 * K) + ' A' + f1(crx) + ' ' + f1(cry) + ' 0 0 0 ' + f1(cb[0] + crx) + ' ' + f1(cb[1] - 9 * K) + '" fill="none" stroke="#14181d" stroke-width="1.2"' + NS + '/>';
  comp += I.box(46.5, 12, 5, 4, 5, 6, '#2b2f36');   // indítórelé + hővédő
  // párologtató tálca a kompresszor tetején (ide folyik a leolvasztott víz)
  comp += I.box(31, 4, 21.5, 15, 12, 1.6, 'rgba(210,225,240,.9)');
  var ccl = I.pt(C[0] + 2, C[1] + 8, 9);
  comp += '<text x="' + f1(ccl[0]) + '" y="' + f1(ccl[1]) + '" font-size="7" font-weight="700" fill="#c9d1dc" text-anchor="middle"' + NS + '>R600a</text>';

  /* ---------- Kondenzátor: drótbordás csőkígyó a hátlapon ---------- */
  var CY = -3, cond = '';
  var serp = 'M56 -176';
  for (var sz = 176, dir = -1; sz > 34; sz -= 9, dir = -dir) serp += ' H' + (dir < 0 ? 6 : 56) + ' a4.5 4.5 0 0 ' + (dir < 0 ? 0 : 1) + ' 0 9';
  cond += planeY(CY, '<rect x="2" y="-180" width="56" height="150" fill="transparent"/>' +
    (function () { var s = ''; for (var wx = 3; wx <= 57; wx += 2.4) s += '<line x1="' + wx.toFixed(1) + '" y1="-179" x2="' + wx.toFixed(1) + '" y2="-30" stroke="#3a4049" stroke-width=".55"/>'; return s; })() +
    '<path d="' + serp + '" fill="none" stroke="#14181d" stroke-width="2.6"/>' +
    '<path d="' + serp + '" fill="none" stroke="#4a525e" stroke-width="1.3"/>');
  cond += line([2, CY, 180], [58, CY, 180], '#2e343c', 2.2) + line([2, CY, 30], [58, CY, 30], '#2e343c', 2.2) +
    line([2, CY, 30], [2, CY, 180], '#2e343c', 2.2) + line([58, CY, 30], [58, CY, 180], '#2e343c', 2.2);
  [[2, 176], [58, 176], [2, 34], [58, 34]].forEach(function (b) { cond += line([b[0], CY, b[1]], [b[0], 0, b[1]], '#2e343c', 2); });

  /* ---------- Szárítószűrő + kapilláris cső (a fojtóelem) ---------- */
  var cap = cylX(12, 4, 13, 2.2, 11, '#9aa6b5') + I.cyl(12, 4, 11.5, 0.9, 1, '#c8763a');
  var capPts = [[23, 4, 13], [26, 3, 13], [26, 3, 30]];
  for (var cl = 0; cl < 5; cl++) { capPts.push([22, 3, 34 + cl * 6], [30, 3, 37 + cl * 6]); }
  capPts.push([26, 3, 66], [26, 3, 128], [12, 8.5, 128], [12, 8.5, 135]);
  var cd = pathD(capPts);
  cap += '<path d="' + cd + '" fill="none" stroke="transparent" stroke-width="7" stroke-linejoin="round"/>' +
    '<path d="' + cd + '" fill="none" stroke="#6e3a14" stroke-width="2.3" stroke-linejoin="round"/>' +
    '<path d="' + cd + '" fill="none" stroke="#d9874a" stroke-width="1.2" stroke-linejoin="round"/>';

  /* ---------- Hűtőközeg-vezetékek (R600a) ---------- */
  var HOT = '#e0402e', WARM = '#f08a24', COLD = '#2f6fd6', SUCT = '#4fc0e8';
  var dis = [[44, 8, 17], [44, 8, 26], [44, -1, 26], [60, -1, 26], [60, CY, 30], [60, CY, 176], [56, CY, 176]];
  var liq = [[6, CY, 34], [2, CY, 34], [2, CY, 13], [2, 4, 13], [12, 4, 13]];
  var suc = [[42, 8.5, 158], [46, 3.5, 158], [46, 3.5, 26], [36, 3.5, 26], [36, 10, 26], [36, 10, 16]];
  var pipes = pipe(dis, HOT, 2.6) + pipe(liq, WARM, 2.3) + pipe(suc, SUCT, 3);
  pipes += arrowAt(dis[4], dis[5], HOT) + arrowAt(liq[1], liq[2], WARM) + arrowAt(suc[1], suc[2], SUCT) + arrowAt(suc[3], suc[4], SUCT);

  /* ---------- Ajtók (kinyitva, a belső oldaluk látszik) ---------- */
  var DOOR = '#f1f3f6';
  function door(z0, h, balcs) {
    var s = I.box(0, 71, z0, 7, 60, h, DOOR);
    s += planeX(7.04, '<rect x="-127" y="' + (-(z0 + h - 4)) + '" width="52" height="' + (h - 8) + '" rx="2" fill="#e6eaef" stroke="#cfd6de" stroke-width=".6"/>');
    // a szabad él metszetben: hab a lemezek között
    s += planeY(131.03, '<rect x=".6" y="' + (-(z0 + h - 0.6)) + '" width="5.8" height="' + (h - 1.2) + '" fill="url(#hu-foam)" stroke="#e9edf2" stroke-width=".6"/>');
    s += planeY(131.06, '<rect x="-.5" y="' + (-(z0 + h * 0.7)) + '" width="1.6" height="' + (h * 0.35) + '" rx=".8" fill="#5b6573"/>');
    balcs.forEach(function (bz) {
      s += tbox(7, 76, bz, 8, 50, 9, '#cde4f4', .6, ' stroke="#46698f" stroke-width=".7" stroke-linejoin="round"');
    });
    return s;
  }
  var doors = door(2, 120, [16, 46, 78]) + door(124, 58, [140]);
  // palackok, üvegek az ajtópolcokon
  [[11, 82, 17, 2.8, 18, '#2f8fd6'], [11, 90, 17, 2.8, 20, '#7cc36a'], [11, 100, 17, 3.2, 16, '#f08a24'], [11, 112, 17, 2.4, 22, '#e9eef3'],
    [11, 84, 47, 2.6, 10, '#c0392b'], [11, 96, 47, 2.6, 9, '#f2c94c'], [11, 106, 47, 2.4, 12, '#8e5a2b'], [11, 118, 47, 2.6, 8, '#e05a9a']].forEach(function (b) {
    doors += I.cyl(b[0], b[1], b[2], b[3], b[4], b[5]) + I.cyl(b[0], b[1], b[2] + b[4], b[3] * 0.45, 2.2, shade(b[5], 0.7));
  });
  for (var eg = 0; eg < 6; eg++) { var gp = I.pt(11, 80 + eg * 7.5, 81); doors += '<ellipse cx="' + f1(gp[0]) + '" cy="' + f1(gp[1]) + '" rx="3.4" ry="4.2" fill="#f7ead3" stroke="#c8b08a" stroke-width=".5"/>'; }
  doors += I.box(9, 80, 141, 5, 18, 7, '#e8eef4') + I.box(9, 104, 141, 5, 18, 5, '#ffd9a8');
  // zsanérok
  [[71, 121], [71, 181], [71, 3]].forEach(function (h) { doors += I.box(-1, h[0] - 3, h[1] - 2, 3, 4, 3, '#9aa7b7'); });

  /* ---------- Mágneses ajtótömítés ---------- */
  function gasket(z0, z1) {
    var r = '<rect x="-129.5" y="' + (-z1) + '" width="57" height="' + (z1 - z0) + '" rx="3" fill="none"';
    return planeX(8.8, r + ' stroke="transparent" stroke-width="6"/>' + r + ' stroke="#6d7684" stroke-width="3.2"/>' +
      r + ' stroke="#a9b2bd" stroke-width="1.3" transform="translate(-.4 -.4)"/>' +
      '<rect x="-128.2" y="' + (-z1 + 1.3) + '" width="54.4" height="' + (z1 - z0 - 2.6) + '" rx="2" fill="none" stroke="#3a414b" stroke-width=".6" stroke-dasharray="2 1.2"' + NS + '/>');
  }
  var gask = gasket(4, 120) + gasket(126, 180);

  STUDIE.addModel({
    id: 'hutoszekreny',
    title: 'Hűtőszekrény',
    icon: '🧊',
    color: '#3d9ad6',
    category: 'Háztartás',
    keywords: 'hűtő hűtőszekrény fagyasztó kombi hűtő-fagyasztó no-frost kompresszor kondenzátor elpárologtató kapilláris cső fojtás expanziós szelep hűtőközeg R600a izobután freon R134a termosztát PUR hab szigetelés ajtótömítés mágnes leolvasztás jégmentesítés energiacímke COP log p-h hűtőkörfolyamat Einstein Szilárd Lehel',
    summary: 'Nem „hideget termel”, hanem kiszivattyúzza a hőt a belsejéből, és a hátoldalán leadja a konyhának. Ugyanaz a körfolyamat, mint a hőszivattyúban, csak a hideg oldalt használjuk.',
    scale: 'kb. 60 × 65 × 185 cm, 55–75 kg',
    viewBox: '0 0 800 640',
    backdrop: backdrop,
    intro: 'A hűtőszekrény egy **hőszivattyú**: a belsejéből elvonja a hőt, és a hátulján lévő rácson leadja a konyha levegőjének. Ezért meleg a hűtő hátulja!\n\nA hőt a **hűtőközeg** (ma szinte mindig **R600a, izobután**) szállítja egy zárt csőkörben. Bent, az **elpárologtatóban** nagyon alacsony nyomáson **elforr** (közben hőt nyel el), a **kompresszor** összesűríti és felforrósítja, a hátsó **kondenzátorban** lecsapódik (leadja a hőt), végül a vékony **kapilláris csőben** a nyomása leesik, és lehűl. A **vastag hőszigetelés** és a **mágneses ajtótömítés** pedig azért kell, hogy a kiszivattyúzott hő ne szivárogjon vissza.',
    parts: [
      {
        id: 'kompresszor', z: 1, name: 'Kompresszor', svg: comp, explode: [236, 104], badge: B(C[0], C[1], 12), en: 'hermetic reciprocating compressor', lesson: 'hoszivattyu/hutokor',
        terms: ['fizika-bsc/idealis-gaz', 'fizika-bsc/elso-fotetel'],
        what: 'A hűtő „szíve”: a hátsó, alsó **gépházban** ülő fekete, gömbölyű tartály. Beszívja az elpárologtatóból érkező hideg, kis nyomású hűtőközeg-gőzt, és **összenyomja**: ettől a gőz nyomása többszörösére nő, és **felforrósodik** (50–70 °C). Ez az egyetlen alkatrész, amely jelentős áramot fogyaszt. Ezt hallod, amikor a hűtő halkan „zümmög”.',
        madeOf: '**Hermetikusan** (légmentesen) lehegesztett acélbúra, benne egy kis **villanymotor** és egy **dugattyús** (újabban fordulatszám-szabályozott, inverteres) sűrítő. Alul **kenőolaj**, a búra gumibakokon áll, hogy ne rezegjen. Az oldalán az **indítórelé** és a túlmelegedés elleni **hővédő**, a tetején a leolvasztott víz párologtató tálcája.',
        how: 'A hengert, dugattyút és szelepeket mikrométer-pontossággal megmunkálják, a motor tekercselését automata gépek végzik. Az összeszerelt motor-sűrítő egységet olajjal töltik, a két acél félbúrát **összehegesztik**, majd szivárgásvizsgálat és teljesítménymérés következik. Egy háztartási hűtőkompresszor elektromos teljesítménye kb. **50–150 W**.',
        uni: 'A sűrítés a log p–h diagramon az 1→2 szakasz: ideálisan izentrópikus, `w = h₂ − h₁`. A nyomásviszony R600a-nál −25 °C-os párolgás (≈ 0,6 bar) és +40 °C-os kondenzáció (≈ 5,3 bar) mellett kb. **9**, ami nagy; ezért a kisméretű dugattyús kompresszor **volumetrikus hatásfoka** (holttér-visszatágulás) és izentrópikus hatásfoka (≈ 0,5–0,65) korlátozza a COP-t. A hagyományos gép **két­állású (be/ki)** üzemben jár, a termosztát kapcsolgatja; az inverteres kompresszor fordulatszám-szabályozással a kapcsolási (ciklikus) veszteségeket csökkenti.',
        fact: 'A régi hűtők akár 30–40 évig is elzümmögnek ugyanazzal a kompresszorral: mivel légmentesen le van zárva, nem kerül bele por és nedvesség.'
      },
      {
        id: 'kondenzator', z: 0, name: 'Kondenzátor (hátoldali hőleadó)', svg: cond, explode: [196, 18], badge: B(30, CY, 150), en: 'condenser (wire-on-tube)',
        what: 'A hűtő hátulján lévő fekete, rácsos **csőkígyó**. Ide érkezik a kompresszorból a forró hűtőközeg-gőz, és itt adja le a hőt a konyha levegőjének. Miközben lehűl, **lecsapódik** (folyadékká kondenzálódik), ahogy a pára a hideg ablakon. Ezért **meleg** a hűtő háta, és ezért kell mögötte néhány centi szabad hely a levegőnek.',
        madeOf: '**Acélcső** (bundy-cső: rézzel bevont, feltekert acélszalagból forrasztott cső), amelyre mindkét oldalról vékony **acélhuzalokat** hegesztenek bordának, fekete festékkel. Sok mai hűtőben nem látszik: a hátfal vagy az oldalfal **lemeze mögé** ragasztják („skin condenser”).',
        how: 'A csövet hajlítógép formálja kígyóvá, a huzalokat ellenállás-hegesztéssel ponthegesztik rá, majd az egészet festik és szárítják. A kész hőcserélőt a hűtő hátoldalára pattintják, a csővégeket a körhöz forrasztják.',
        uni: 'A leadott hőáram `Q̇_k = Q̇₀ + P_el` (első főtétel): a kondenzátornak a bentről elvont hőt **és** a kompresszor munkáját is le kell adnia. A huzalbordás kondenzátor szabad (természetes) konvekcióval és sugárzással ad le hőt, a hőátadási tényező kicsi (≈ 5–10 W/(m²·K)), ezért kell nagy felület. A kondenzációs hőmérséklet tipikusan 10–15 K-nel magasabb a környezetinél: rossz szellőzés vagy porréteg esetén nő a kondenzációs nyomás, ezzel a kompresszor munkája, és romlik a COP.',
        fact: 'Ha a hűtőt túl szorosan tolod a falhoz vagy a kondenzátor poros, akár 10–25%-kal többet is fogyaszthat.'
      },
      {
        id: 'kapillaris', z: 3, name: 'Kapilláris cső (fojtás) és szárítószűrő', svg: cap, explode: [104, -40], badge: B(26, 3, 50), en: 'capillary tube and filter drier',
        what: 'A háztartási hűtő „expanziós szelepe” nem is szelep, hanem egy **hajszálvékony**, több méter hosszú rézcső. A kondenzátorból érkező meleg folyadék csak nagy ellenállással préselődik át rajta, így a végén a **nyomása leesik**, egy része azonnal felforr, és ettől az egész **nagyon lehűl** (−25 °C körülire). Előtte a **szárítószűrő** kiszűri a nedvességet és a szennyeződést, amely eltömíthetné.',
        madeOf: '**Vörösréz** kapilláris cső: belső átmérője kb. **0,6–0,8 mm**, hossza 2–4 m. A szárítószűrő réz- vagy acélhenger, benne **molekulaszita** (zeolit) szemcsék, amelyek megkötik a vízmolekulákat.',
        how: 'A kapilláris csövet húzással állítják elő, és hosszát az adott hűtőtípushoz grammra és méterre pontosan méretezik. A gyártósoron a **szívócsőhöz forrasztják** (hogy a hideg gőz előhűtse benne a folyadékot), majd a kettőt együtt a hátfal habjába ágyazzák.',
        uni: 'A kapilláris **rögzített keresztmetszetű fojtóelem**: a fojtás izentalpikus (`h₃ = h₄`). Áramlása részben „fojtott” (choked), a tömegáram főleg a kondenzációs nyomástól és a belépő folyadék alulhűtésétől függ, nem szabályozható. Ezért a hűtőközeg-töltetet pontosan kell méretezni (kritikus töltet). A szívócsővel alkotott **belső hőcserélő** (suction-line heat exchanger) alulhűti a folyadékot, ami növeli a fajlagos hűtőteljesítményt (`q₀ = h₁ − h₄`) és megakadályozza, hogy a szívócső bepárásodjon.',
        fact: 'A kapilláris ellenállása olyan nagy, hogy a kompresszor leállása után még percekig tart, mire a két oldal nyomása kiegyenlítődik. Ezért nem szabad a hűtőt kihúzás után azonnal újra bekapcsolni.'
      },
      {
        id: 'hutokozeg', z: 2, name: 'Hűtőközeg (R600a, izobután) és csővezetékek', svg: pipes, explode: [0, 0], badge: B(46, 3.5, 70), link: 'hoszivattyu', en: 'refrigerant R600a (isobutane) and piping',
        terms: ['kemia-bsc/fazisdiagram', 'kemia-bsc/entalpia'],
        what: 'A hő „szállítóeszköze”, amely zárt körben kering. A rajzon a cső színe a hűtőközeg állapotát mutatja: **piros** a kompresszorból jövő forró gőz, **narancs** a lecsapódott meleg folyadék, **kék** az elpárologtatóban forrásban lévő hideg keverék, **világoskék** a kompresszorhoz visszatérő hideg gőz. A mai hűtőkben **izobután** (R600a) kering: ez légköri nyomáson már **−12 °C-on forr**.',
        madeOf: 'Egy háztartási hűtőben mindössze kb. **20–80 gramm** izobután van (a biztonsági szabvány legfeljebb 150 g-ot enged), hozzá kevés kenőolaj. A csövek réz és acél. Régen **freont** (CFC-12, R12), majd **R134a**-t használtak. Az első az ózonréteget bontotta, a második erős üvegházgáz.',
        how: 'A kész hűtőkört nitrogénnel vagy héliummal **tömörségvizsgálják**, majd **vákuumszivattyúval** légtelenítik (a levegő és a nedvesség tönkretenné), végül adagológép juttat bele grammra pontosan hűtőközeget. A töltőcsonkot ezután **lecsípik és leforrasztják**: a kör élete végéig zárt marad.',
        uni: 'Az R600a **természetes** hűtőközeg: ózonlebontó potenciálja (ODP) 0, globális felmelegítő potenciálja (GWP₁₀₀) ≈ 3, szemben az R134a ≈ 1430-as értékével. Hátránya, hogy **gyúlékony** (A3 biztonsági osztály), ezért kicsi a töltet, és a belső elektromos alkatrészek szikramentesek. Kisebb a térfogati hűtőteljesítménye, mint az R134a-é, ezért nagyobb lökettérfogatú kompresszor kell. A körfolyamat a **log p–h** diagramon: 1→2 sűrítés, 2→3 hőleadás és kondenzáció, 3→4 fojtás (függőleges), 4→1 elpárolgás.',
        fact: 'Az izobután ugyanaz a gáz, ami az öngyújtókban is van. 1993-ban a Greenpeace és egy keletnémet gyár (Foron) „Greenfreeze” nevű hűtője mutatta meg, hogy biztonságosan használható. Ma Európában szinte minden új háztartási hűtő ezzel működik.'
      },
      {
        id: 'haz', z: 4, name: 'Szekrény (ház, belső bélés, lábazat)', svg: cab, explode: [0, 0], badge: B(5, 40, 60), en: 'cabinet (steel outer shell, plastic inner liner)',
        what: 'A hűtő „doboza”: kívül festett **acéllemez** burkolat, belül sima, könnyen tisztítható **műanyag bélés**. A kettő között van a hőszigetelő hab. Hátul, alul egy mélyedésben, a **gépházban** kap helyet a kompresszor; elöl, a lábazaton **szellőzőrács**. A rajzon a jobb oldalfal és a tető átlátszó, hogy a hűtőkör látható legyen.',
        madeOf: 'Kívül horganyzott, porfestett vagy rozsdamentes **acéllemez**, belül vákuumformázott **HIPS** vagy **ABS** műanyag (ütésálló polisztirol). Állítható műanyag lábak, hátul görgők.',
        how: 'Az acéllemezt tekercsről letekerik, kivágják, U alakúra hajlítják. A belső bélést egy nagy műanyag lemezből **vákuumformázással** egyetlen darabban húzzák ki egy szerszám fölött (mint egy óriási joghurtospoharat). A kettőt egymásba illesztik, és befecskendezik közéjük a habot, amely összeragasztja őket: ettől lesz a szekrény merev.',
        uni: 'A szekrény hőveszteségét a falakon át `Q̇ = Σ U_i · A_i · ΔT` adja, plusz az ajtótömítés menti hőhidak és az ajtónyitások. Egy kombi hűtő teljes fal- és tömítésveszteségének nagyságrendje 20–40 W; ezt kell a hűtőkörnek folyamatosan „kiszivattyúznia”. Az átlagos teljesítményfelvétel `P̄ ≈ Q̇_veszt / COP`; az **éves energiafogyasztás** és a belső térfogat alapján sorolják be az EU **energiacímkén** (2021 óta A–G skála).',
        lesson: 'haztartas/energiatakarekossag',
        fact: 'Egy mai, jó energiaosztályú hűtő-fagyasztó egy év alatt nagyjából 100–250 kWh-t fogyaszt: kevesebbet, mint egy 30 évvel ezelőtti modell harmada.'
      },
      {
        id: 'szigeteles', z: 11, name: 'Hőszigetelés (PUR hab)', svg: foam, explode: [-34, 26], badge: B(57.5, D, 160), en: 'polyurethane (PUR) foam insulation',
        terms: ['fizika-bsc/entropia'],
        what: 'A falakban, az ajtókban és a két tér közötti válaszfalban kb. **4–7 cm** vastag, kemény, sárgás **poliuretánhab** van. Ez akadályozza meg, hogy a konyha hője visszaszivárogjon. A rajzon a homlokperemen „elvágva” látszik. Minél jobb a szigetelés, annál ritkábban kell járnia a kompresszornak.',
        madeOf: 'Zárt cellás **poliuretán (PUR)** hab: két folyékony alapanyag (poliol és izocianát) reakciójából keletkezik. A cellákat egy habosítógáz, ma **ciklopentán** fújja fel. A buborékokba zárt gáz rosszabbul vezeti a hőt, mint a levegő. Néhány prémium hűtőben a hab mellett **vákuumszigetelő panelek** is vannak.',
        how: 'Az egymásba illesztett burkolatot és bélést egy fűtött **habosítószerszámba** (sablonba) teszik, és a két folyadékot nagy nyomással a résbe keverik. A keverék másodpercek alatt felhabzik, kitölti a teljes üreget, és pár perc alatt megkeményedik. Közben összeragasztja a lemezt és a bélést.',
        uni: 'A PUR hab hővezetési tényezője `λ ≈ 0,020–0,022 W/(m·K)` (a nyugvó levegőé 0,026): ezt főleg a cellagáz hővezetése, kisebb részben a cellafalak vezetése és a sugárzás adja. Egy 5 cm-es fal hőátbocsátása `U ≈ λ/d ≈ 0,4 W/(m²·K)`. A vákuumszigetelő panel (VIP, `λ ≈ 0,004–0,008`) ugyanazt a szigetelést sokkal vékonyabban adja. Az évek alatt a cellákba levegő diffundál, a habosítógáz kiszökik, ezért a hab λ-ja lassan romlik („öregedés”).',
        fact: 'A régi, freonnal habosított hűtők szigetelése is tartalmazott ózonbontó gázt. Ezért kell a kiselejtezett hűtőt szakszerűen újrahasznosítani, nem a lomtalanításra kitenni.'
      },
      {
        id: 'fagyaszto', z: 6, name: 'Fagyasztótér (−18 °C)', svg: frz, explode: [-14, -54], badge: B(5, 46, 168), en: 'freezer compartment (−18 °C)',
        what: 'A felső, külön ajtós tér, ahol **−18 °C** van. Ilyen hidegben a baktériumok és a penészgombák nem tudnak szaporodni, az ételek hónapokig elállnak. A no-frost fagyasztóban a falakon nem rakódik vastag jégréteg, mert a nedvességet a ventilátoros levegő az elpárologtatón „lefagyasztja”, és onnan rendszeresen leolvasztják.',
        madeOf: 'Ugyanolyan műanyag bélés, mint a hűtőtérben, de vastagabb habréteggel körülvéve. Benne rácspolc, jégkockatartó, gyakran átlátszó fiókok. Egy négycsillagos fagyasztó 24 óra alatt meghatározott mennyiségű friss élelmiszert képes −18 °C-ra lefagyasztani.',
        how: 'A fagyasztóteret a hűtőtértől a **habbal töltött válaszfal** választja el. A gyárban a két tér hőmérsékletét több órás hőkamrás próbán ellenőrzik: a jól működő gép ezen a vizsgálaton belül eléri a −18 °C-ot.',
        uni: 'A fagyasztás minősége a **jégkristály-képződésen** múlik: lassú fagyasztáskor nagy kristályok nőnek a sejtek között, és felszakítják a sejtfalakat (az étel kiolvasztva „levet ereszt”). Gyorsfagyasztásnál a hőelvonás gyors, a kristályok aprók. A −18 °C-on is van lassú minőségromlás: oxidáció, **szublimáció** („fagyasztási égés”: a jég a felületről közvetlenül gőzzé válik, ha a csomagolás nem légmentes).',
        fact: 'A −18 °C nem véletlen szám: ez kerekítve 0 °F (Fahrenheit-fok), az amerikai fagyasztószabványból maradt meg.'
      },
      {
        id: 'elparologtato', z: 5, name: 'Elpárologtató', svg: evap, explode: [24, -104], badge: B(EV.x + 17, EV.y + EV.d, 150), en: 'evaporator (finned-tube, no-frost)',
        terms: ['fizika-bsc/elso-fotetel', 'kemia-bsc/entalpia'],
        what: 'Itt történik a hűtés! A kapillárisból érkező nagyon hideg hűtőközeg ebben a lamellás hőcserélőben **elforr**, és ehhez hőt von el a körülötte lévő levegőtől. A no-frost hűtőben a fagyasztó hátfala mögött, burkolat alatt rejtőzik, és egy ventilátor fújja át rajta a levegőt. Egyszerűbb hűtőkben a hűtőtér hátfalába vagy egy fémlemezbe épített csőkígyó.',
        madeOf: '**Alumínium** lamellák és alumínium vagy rézcsövek. Az egyszerű (statikus) hűtőkben „roll-bond” elpárologtató van: két alumíniumlemez, amelyek közé csatornákat fújnak fel.',
        how: 'A lamellákat sajtolják, a csöveket átfűzik rajtuk, majd belülről kitágítják, hogy szorosan érintkezzenek. A roll-bond lemeznél a csatornák helyére grafitos mintát nyomtatnak, a két lemezt összehengerlik, és a mintázat mentén nagy nyomású levegővel felfújják a csatornákat.',
        uni: 'A hűtőközeg itt állandó nyomáson és (kétfázisú tartományban) közel állandó hőmérsékleten párolog: a log p–h diagram 4→1 vízszintes szakasza, a fajlagos hűtőteljesítmény `q₀ = h₁ − h₄`. Fagyasztónál a párolgási hőmérséklet kb. −25…−30 °C. A levegő nedvessége a hideg lamellákon **dér** formájában kifagy, ez szigetel és szűkíti a légutat, ezért kell a periodikus leolvasztás.',
        fact: 'A hűtőközeg úgy hűt, mint a bőrödről elpárolgó izzadság: a párolgáshoz szükséges energiát a környezetéből „szívja el”.'
      },
      {
        id: 'nofrost', z: 7, name: 'Leolvasztó fűtés és no-frost ventilátor', svg: nf, explode: [118, -84], badge: B(50, 8, 158), en: 'defrost heater and evaporator fan (no-frost)',
        terms: ['szabalyozas/ketallasu'],
        what: 'A **ventilátor** átfújja a levegőt a hideg elpárologtatón, és csatornákon át a fagyasztóba, illetve egy **csappantyún** keresztül a hűtőtérbe is hideg levegőt juttat (szaggatott kék nyíl). A **fűtőszál** naponta néhányszor pár percre bekapcsol, és leolvasztja az elpárologtatóra fagyott deret. Az olvadékvíz a tölcséren át lefolyik a kompresszoron ülő tálcába, ahol a meleg elpárologtatja.',
        madeOf: 'Kis teljesítményű (néhány wattos) **egyenáramú ventilátor** műanyag lapátokkal, **fűtőszál** (fém ellenálláshuzal üveg- vagy alumíniumcsőben, kb. 100–200 W), olvadó biztosíték és egy hőmérséklet-érzékelő, amely leállítja a fűtést, ha a jég elolvadt.',
        how: 'A ventilátort és a fűtőszálat az elpárologtatóval együtt egy egységként szerelik be, és műanyag burkolattal takarják. A leolvasztást régen egy **időzítő** indította (pl. 8–12 óránként), a mai elektronika „adaptívan” indítja: csak akkor, ha a működési adatokból jegesedésre következtet.',
        uni: 'A no-frost rendszer **kényszerkonvekciós** hőcserélő: nagyobb hőátadási tényező (≈ 20–40 W/(m²·K)), egyenletesebb belső hőmérséklet. Ára a ventilátor és a leolvasztás energiája: a leolvasztó fűtés hője részben a fagyasztóba kerül, ezt is ki kell később szivattyúzni. A hűtőtér hőmérsékletét a **csappantyú** (damper) két­állású szabályozással tartja: ha a hűtőtér túl meleg, kinyit, és hideg levegőt enged be.',
        fact: 'A „no-frost” szó szerint „dér nélkül”: a régi hűtőkben a jeget hetente-havonta kézzel kellett leolvasztani, tálakkal és rongyokkal.'
      },
      {
        id: 'polcok', z: 8, name: 'Polcok és zöldségtartó', svg: shelves, explode: [92, 64], badge: B(52, 30, 60), en: 'glass shelves and crisper drawer',
        what: 'Az állítható **üvegpolcok** tartják az ételeket, alul a **zöldségtartó fiók** van. A hűtőtérben nem mindenhol ugyanolyan hideg: legalul, a fiók fölötti polcon a leghidegebb (ide való a hús, a hal), feljebb melegebb (tejtermékek, maradék étel), a fiókban párásabb a levegő, így a zöldség nem fonnyad meg olyan gyorsan.',
        madeOf: 'A polcok **edzett biztonsági üvegből** készülnek, műanyag vagy fém szegéllyel; ha mégis eltörnek, apró, tompa szilánkokra esnek szét. A fiók átlátszó **polisztirol** vagy SAN műanyag.',
        how: 'Az üveglapot méretre vágják, élét csiszolják, majd 600 °C fölé hevítik és hideg levegővel hirtelen lehűtik (**edzés**): a felülete így nyomófeszültség alá kerül, és sokkal erősebb lesz. A fiókot fröccsöntik.',
        uni: 'A belső hőmérséklet-eloszlást a **természetes konvekció** (a hideg levegő lesüllyed) és a no-frost légáram alakítja. A zöldségtartóban a kisebb légcsere miatt magasabb a relatív páratartalom (85–95%): ez csökkenti a zöldségek párolgási vízvesztését (a vízgőz parciális nyomásának különbsége hajtja). Az élelmiszerbiztonsági ajánlás a hűtőtérre 0…+5 °C, ahol a legtöbb kórokozó szaporodása drasztikusan lelassul.',
        fact: 'Az ajtó a hűtő legmelegebb része, mert minden nyitáskor ide jut először a meleg levegő. A tej ezért jobb helyen van a polcon, mint az ajtóban.'
      },
      {
        id: 'vilagitas', z: 9, name: 'Világítás és ajtókapcsoló', svg: light, explode: [34, -60], badge: B(22, 7, 120), en: 'LED interior light and door switch',
        what: 'A **LED-lámpa** akkor kapcsol fel, amikor kinyitod az ajtót. Ezt egy kis **ajtókapcsoló** (nyomógomb vagy mágneses érzékelő) intézi a peremen: csukott ajtónál az ajtó benyomja, és a lámpa kialszik. Sok hűtő hangjelzéssel figyelmeztet, ha az ajtó túl sokáig nyitva marad.',
        madeOf: 'Fehér fényű **LED-ek** (félvezető fényforrások) egy kis nyomtatott áramköri lapon, átlátszó műanyag búra alatt. Az ajtókapcsoló egy rugós mikrokapcsoló vagy egy mágnes által működtetett **reed-relé**.',
        how: 'A LED-eket automata beültetőgép forrasztja a lapra, a búrát fröccsöntik. A régi hűtőkben 15–25 W-os **izzó** volt, ez melegítette is a hűtőteret. A LED csak 1–2 W-ot fogyaszt, és alig termel hőt.',
        uni: 'A világítás energiája kétszer jelentkezik: egyszer közvetlenül, egyszer pedig a hűtőtérbe jutó hőként, amit a hűtőkörnek kell eltávolítania (`P_össz = P_lámpa · (1 + 1/COP)`). LED-nél a fényhasznosítás 100–150 lm/W, izzónál ≈ 10–15 lm/W, így azonos fényhez kb. tizedannyi hő keletkezik.',
        fact: 'Honnan tudod, hogy tényleg kialszik a lámpa, ha becsukod az ajtót? Nyomd be ujjal az ajtókapcsolót nyitott ajtónál!'
      },
      {
        id: 'termosztat', z: 10, name: 'Termosztát és hőérzékelő', svg: th, explode: [-4, -44], badge: B(6, 47, 110), en: 'thermostat / temperature sensor (NTC)',
        terms: ['szabalyozas/ketallasu', 'szabalyozas/visszacsatolas'],
        what: 'A hűtő „agya”: figyeli a belső hőmérsékletet, és **be- vagy kikapcsolja** a kompresszort. Ha a hűtőtér felmelegszik (pl. +6 °C-ra), bekapcsol, ha eléri a beállított értéket (pl. +4 °C), kikapcsol. Ezért jár a hűtő szakaszosan: pár percig zümmög, aztán csend.',
        madeOf: 'A régi hűtőkben **mechanikus termosztát** van: egy gázzal töltött kapilláris és egy kis harmonika (fémmembrán), amely a hőmérséklettel tágul és egy kapcsolót nyit-zár. A mai gépekben **NTC termisztor** (hőmérséklettel változó ellenállású félvezető) méri a hőmérsékletet, és egy **mikrovezérlős** panel dönt.',
        how: 'Az NTC-érzékelőt műanyag tokba öntik, és a bélés egy jellemző pontjára rögzítik. A vezérlőpanelt automata gépek forrasztják. Gyártás után minden hűtő elektronikáját „kalibrálják”, és több órás próbán ellenőrzik, hogy tartja-e a beállított hőmérsékletet.',
        uni: 'Klasszikus **két­állású (on/off) szabályozás hiszterézissel**: a kapcsolási különbség (pl. 2 K) határozza meg a ciklusidőt és a hőmérséklet-ingadozást. Kisebb hiszterézis egyenletesebb hőmérsékletet, de több indítást jelent (indítási veszteségek, kopás). Az NTC ellenállása `R(T) = R₂₅ · exp(B(1/T − 1/T₂₅))` szerint változik; a mikrovezérlő ADC-vel méri. Inverteres gépeknél a vezérlés már folytonos (PI-jellegű) fordulatszám-szabályozás.',
        lesson: 'haztartas/energiatakarekossag',
        fact: 'Minden fok, amivel hidegebbre állítod a hűtőt, nagyjából 5%-kal növeli az áramfogyasztását. Az ajánlott beállítás +4…+5 °C a hűtőtérben és −18 °C a fagyasztóban.'
      },
      {
        id: 'ajto', z: 12, name: 'Ajtók ajtópolcokkal', svg: doors, explode: [-74, 18], badge: B(3.5, 131, 60), en: 'doors with door balconies',
        what: 'A két külön ajtó a hűtőteret és a fagyasztót zárja. Belül **ajtópolcok** vannak az italoknak, tojásnak, szószoknak. Az ajtók is hőszigeteltek: belül ugyanolyan PUR hab van bennük, mint a falakban (a rajzon a szabad élükön látszik). Az ajtók oldala gyakran **megfordítható**, hogy jobbról vagy balról is nyíljanak.',
        madeOf: 'Kívül festett acél- vagy rozsdamentes lemez, belül vákuumformázott műanyag béléslemez, közöttük PUR hab. Az ajtópolcok átlátszó műanyagból vannak, a zsanérok acélból.',
        how: 'Az ajtókat a szekrényhez hasonlóan egy sablonban habosítják. Ezután felkerül a tömítés, a fogantyú és a zsanér. A gyártósor végén az ajtók illeszkedését és záródását ellenőrzik.',
        uni: 'Minden ajtónyitáskor a hideg, nehezebb levegő „kifolyik” alul, helyére meleg, párás konyhai levegő áramlik be. Ennek **érzékelhető hője** és a pára kicsapódásának/kifagyásának **látens hője** is terheli a hűtőkört. Egy ajtónyitás energiavesztesége kicsi, de naponta több tucat nyitás az éves fogyasztás érezhető része lehet.',
        fact: 'A hűtőajtót nyitáskor sokszor nehezebb rögtön újra kinyitni: a beengedett meleg levegő lehűl, a nyomása lecsökken, és a külső légnyomás kicsit „rászívja” az ajtót.'
      },
      {
        id: 'ajtotomites', z: 13, name: 'Mágneses ajtótömítés', svg: gask, explode: [-24, -16], badge: B(8.8, 74, 170), en: 'magnetic door gasket',
        what: 'Az ajtó belső szélén körbefutó puha gumiprofil. Becsukáskor **mágnes** húzza a szekrény acél pereméhez, így légmentesen zár, mégis könnyű kinyitni. Ha a tömítés elöregszik vagy beszakad, meleg levegő szivárog be, a hűtő többet jár és jegesedik.',
        madeOf: 'Lágy **PVC** vagy TPE (hőre lágyuló elasztomer) profil, amelynek egyik kamrájában **mágnescsík** van: műanyag kötőanyagba kevert **ferritpor** (bárium- vagy stroncium-ferrit), amelyet felmágneseznek.',
        how: 'A profilt extrudálják (préselik egy formázószerszámon át, mint a tésztát), a mágnescsíkot befűzik, majd a sarkoknál 45°-ban levágják és összehegesztik. A kész keretet az ajtó bélésének hornyába pattintják.',
        uni: 'A mágnescsík **többpólusú** (váltakozó polaritású sávokkal mágnesezett), így a tér rövid távon erős, de gyorsan lecseng: szorosan tart, nyitáskor viszont kis erő elég. A tömítés mentén a hőhíd (vonalmenti hőátbocsátás, W/(m·K)) a hűtő hőveszteségének jelentős része lehet.',
        fact: 'Az USA-ban 1958-tól előírás, hogy a hűtőajtót belülről is ki lehessen nyitni, mert régen gyerekek rekedtek be kiselejtezett, kilinccsel záródó hűtőkbe. A megoldás a mágneses zár lett. Teszt: csípj be egy papírlapot az ajtóba. Ha könnyen kihúzható, cserélni kell a tömítést.'
      }
    ],
    uni: {
      text: 'A hűtőszekrény **gőzkompressziós hűtőkörfolyamattal** működik, amely a **fordított Carnot-körfolyamatot** közelíti. A hő magától csak a melegebb helyről a hidegebbre áramlik (második főtétel), a „hegynek felfelé” szállításhoz munka kell. Hűtőgépnél a hasznos hatás az elvont hő, ezért a **hűtési teljesítménytényező**\n\n`COP_h = Q̇₀ / P_el`, ideális határa `COP_C = T₀ / (T_k − T₀)`.\n\nFagyasztónál −25 °C-os párolgással és +40 °C-os kondenzációval `COP_C = 248 / 65 ≈ 3,8`, a valós háztartási gépek ennek kb. 40–50%-át érik el (COP ≈ 1,5–2). A folyamatot a **log p–h diagramon** követik: 1→2 sűrítés (kompresszor), 2→3 hűtés és kondenzáció (kondenzátor), 3→4 izentalpikus fojtás (kapilláris), 4→1 elpárolgás (elpárologtató). Így `COP_h = (h₁ − h₄)/(h₂ − h₁)`. Az energiamérleg: `Q̇_k = Q̇₀ + P_el`, ezért a hűtő **fűti a konyhát**: többet ad le hátul, mint amennyit bentről elvon. Az éves fogyasztást a szekrény hőveszteségei (`U·A·ΔT`, tömítés, ajtónyitás) és a COP együtt határozzák meg.',
      terms: ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/entropia', 'fizika-bsc/elso-fotetel', 'kemia-bsc/fazisdiagram', 'szabalyozas/ketallasu']
    },
    steps: [
      { icon: '🔩', title: '1. Lemezek és ház', text: 'Tekercsből érkező, előfestett **acéllemezt** vágnak, hajlítanak és sajtolnak: ebből lesz a szekrény oldala, teteje és az ajtók külső lapja. A lemezeket robotok illesztik U alakú dobozzá.', parts: ['haz', 'ajto'] },
      { icon: '🫙', title: '2. Belső bélés vákuumformázással', text: 'Egy vastag műanyag (HIPS) lemezt felmelegítenek, majd vákuum szívja rá egy szerszámra: egyetlen darabban kialakul a teljes belső tér a polctartó bordákkal együtt. Ugyanígy készül az ajtók belső béléslemeze is.', parts: ['haz', 'fagyaszto'] },
      { icon: '🧯', title: '3. Csövek a falakban, majd habosítás', text: 'A bélés hátára rögzítik a kapillárist, a szívócsövet és a vezetékeket, majd a bélést és a burkolatot egymásba illesztve egy fűtött **habosítószerszámba** teszik. Befecskendezik a **poliuretánt**: másodpercek alatt felhabzik, kitölti a falakat, és összeragasztja a szekrényt egy merev egésszé.', parts: ['szigeteles', 'kapillaris', 'haz'] },
      { icon: '⚙️', title: '4. A hűtőkör összeszerelése', text: 'Beépítik az **elpárologtatót**, a ventilátort, a fűtőszálat, hátra felszerelik a **kondenzátort**, a gépházba a **kompresszort** és a **szárítószűrőt**. A csővégeket gépi lánggal, nitrogénáram alatt forrasztják össze.', parts: ['elparologtato', 'nofrost', 'kondenzator', 'kompresszor', 'kapillaris'] },
      { icon: '🧪', title: '5. Szivárgásvizsgálat, vákuum, töltés', text: 'A kört héliummal vagy nitrogénnel nyomás alá helyezik, és érzékelővel keresik a legkisebb szivárgást is. Ezután vákuumszivattyú szívja ki a levegőt és a nedvességet, majd az adagológép grammra pontosan **beletölti az izobutánt**. A töltőcsonkot lezárják.', parts: ['hutokozeg', 'kompresszor'] },
      { icon: '🚪', title: '6. Ajtók, tömítés, belső felszerelés', text: 'Felkerülnek az ajtók a **mágneses tömítéssel**, a zsanérok, a fogantyú, bent a **termosztát**, a **világítás**, a **polcok** és a fiókok.', parts: ['ajto', 'ajtotomites', 'termosztat', 'vilagitas', 'polcok'] },
      { icon: '🌡️', title: '7. Működési próba', text: 'Minden kész hűtőt bekapcsolnak egy tesztpályán: mérik a teljesítményfelvételt, ellenőrzik, hogy a kompresszor elindul, a hűtőkör lehűl, a ventilátor, a lámpa és az elektronika működik. Mintavétellel néhány gépet napokig hőkamrában járatnak az energiacímke ellenőrzéséhez.', parts: ['kompresszor', 'termosztat', 'elparologtato'] },
      { icon: '♻️', title: '8. Élet vége: szakszerű újrahasznosítás', text: 'Egy kiselejtezett hűtőt nem szabad egyszerűen összetörni: először leszívják belőle a hűtőközeget és az olajat, majd zárt berendezésben aprítják, és a habból a habosítógázt is összegyűjtik. Az acél, a réz, az alumínium és a műanyagok újra felhasználhatók.', parts: ['hutokozeg', 'szigeteles'] }
    ],
    history: [
      { year: '1750-es évek', text: '**William Cullen** skót orvos megmutatja, hogy a vákuumban elpárolgó éter jéggé hűti a környezetét: ez az elpárologtatásos hűtés első tudományos bemutatása.' },
      { year: '1834', text: '**Jacob Perkins** szabadalmat kap az első gőzkompressziós hűtőgépre: zárt körben, éterrel. Lényegében ma is ugyanez az elv működik.' },
      { year: '1870-es évek', text: '**Carl von Linde** megépíti hatékony, ammóniás kompresszoros hűtőgépeit sörgyáraknak. Megindul az ipari hűtés.' },
      { year: '1913–1927', text: 'Megjelennek az első háztartási elektromos hűtők (DOMELRE, 1913). 1927-ben a General Electric **„Monitor Top”** típusa hermetikusan zárt kompresszort kap a szekrény tetején, és tömegtermékké válik.' },
      { year: '1930', text: '**Szilárd Leó** és **Albert Einstein** szabadalmat kap egy mozgó alkatrész nélküli, abszorpciós hűtőre, amelyet a korabeli mérgező hűtőközegek okozta balesetek ösztönöztek. Ugyanebben az időben jelenik meg a nem mérgező, nem gyúlékony **freon** (CFC-12).' },
      { year: '1950–1960-as évek', text: 'Elterjed a kombinált hűtő-fagyasztó és a mágneses ajtótömítés. Magyarországon a jászberényi **Lehel** hűtőgépgyár hűtői kerülnek milliószámra a háztartásokba.' },
      { year: '1987', text: 'A **Montreali jegyzőkönyv** elrendeli az ózonréteget bontó freonok kivezetését: a hűtőkben előbb az R134a, majd a természetes izobután veszi át a helyüket.' },
      { year: '1993', text: 'A Greenpeace és a keletnémet Foron cég bemutatja a **Greenfreeze** hűtőt: izobután hűtőközeggel és ciklopentánnal habosított szigeteléssel. Ma ez a világ legelterjedtebb háztartási hűtőtechnológiája.' },
      { year: '2021', text: 'Az EU **új, szigorúbb energiacímkét** vezet be (A–G): a korábbi „A+++” hűtők zöme ma C–E osztályba kerül, az „A” a jövő leghatékonyabb gépeinek van fenntartva.' }
    ],
    quiz: [
      { q: 'Miért meleg a hűtőszekrény hátulja?', options: ['Ott adja le a kondenzátor a bentről kiszivattyúzott hőt', 'Ott van a világítás', 'Mert ott melegíti egy fűtőszál a hűtőközeget', 'Mert a falak nincsenek szigetelve'], answer: 0, explain: 'A hűtő hőt szállít ki a belsejéből: a kondenzátorban a hűtőközeg lecsapódik, és a konyha levegőjének adja a hőt (plusz a kompresszor munkáját).' },
      { q: 'Mi a kapilláris cső feladata?', options: ['Lecsökkenti a hűtőközeg nyomását, ettől az lehűl', 'Összenyomja a gőzt', 'Kiszűri a port a levegőből', 'Világítást biztosít'], answer: 0, explain: 'A hajszálvékony cső fojtóelem: a végén a nyomás leesik, a folyadék egy része felforr, és az egész nagyon lehűl.' },
      { q: 'Milyen hűtőközeg van a mai európai háztartási hűtők többségében?', options: ['Izobután (R600a)', 'Ammónia', 'Freon (CFC-12)', 'Szén-dioxid'], answer: 0, explain: 'Az izobután természetes gáz, nem bontja az ózonréteget, és GWP-je kb. 3; csak néhány tucat gramm van egy hűtőben.' },
      { q: 'Miért van mágnes az ajtótömítésben?', options: ['Hogy légmentesen zárjon, de belülről is könnyen nyitható legyen', 'Hogy a hűtőközeg ne szivárogjon el', 'Hogy hűtse az ajtót', 'Hogy a lámpát kapcsolja'], answer: 0, explain: 'A mágnes szorosan a peremhez húzza a tömítést, mégis kis erővel nyitható. A régi kilincses zárakat ezért váltották ki.' },
      { q: 'Mit csinál a no-frost hűtőben a leolvasztó fűtőszál?', options: ['Időnként leolvasztja az elpárologtatóra fagyott deret', 'Felmelegíti a zöldségtartót', 'Fűti a kompresszort indulás előtt', 'Megakadályozza, hogy a fagyasztó −18 °C alá hűljön'], answer: 0, explain: 'A levegő nedvessége a hideg elpárologtatón kifagy. A fűtőszál ezt rendszeresen leolvasztja, a víz a kompresszoron lévő tálcában elpárolog.' }
    ]
  });
})();
