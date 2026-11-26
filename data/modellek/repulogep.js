/* Modell: keskeny törzsű utasszállító repülőgép (nagyjából Airbus A320 / Boeing 737 méretű) – ¾-es nézet
 * elölről-oldalról, kissé felülről. A gépet méterben adjuk meg (x = távolság az orrtól hátrafelé,
 * y = oldalirány, a néző felé pozitív, z = magasság a talaj fölött), és egy ferde (kabinet-)vetítéssel
 * rajzoljuk ki. A törzs oldala két helyen fel van vágva (utastér, raktér), a közeli szárny áttetsző,
 * hogy látszódjon benne az üzemanyagtartály. A túloldali szárny és vezérsík a háttérben, halványan látszik. */
(function () {
  var S0 = 19, OX = 70, OY = 352, KX = 0.30, KY = 0.55;   // lépték (képpont/m), origó, a ferde vetítés tényezői
  var SC = KY / Math.sqrt(1 + KY * KY), SS = 1 / Math.sqrt(1 + KY * KY);   // a henger körvonalpontjainak iránya
  var NS = ' pointer-events="none"';
  var shade = STUDIE.draw.shade;
  function X(x, y) { return OX + S0 * (x + KX * y); }
  function Y(y, z) { return OY - S0 * z + S0 * KY * y; }
  function P(p) { return X(p[0], p[1]).toFixed(1) + ',' + Y(p[1], p[2]).toFixed(1); }
  function B(x, y, z) { return [Math.round(X(x, y)), Math.round(Y(y, z))]; }
  function poly(pts, fill, stroke, w, extra) {
    return '<polygon points="' + pts.map(P).join(' ') + '" fill="' + fill + '" stroke="' + (stroke || 'rgba(0,0,0,.35)') + '" stroke-width="' + (w == null ? 1 : w) + '" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  function line(pts, color, w, extra) {
    return '<polyline points="' + pts.map(P).join(' ') + '" fill="none" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  function range(a, b, n) { var r = []; for (var i = 0; i <= n; i++) r.push(a + (b - a) * i / n); return r; }

  /* ---------- A törzs alakja: középvonal-magasság (zc) és sugár (r) az orrtól mért x függvényében ---------- */
  var ZC = 3.87, R0 = 2.0, L = 37.6;
  function fr(x) {
    if (x <= 0) return [ZC - 0.55, 0];
    if (x < 6.5) { var u = 1 - x / 6.5; return [ZC - 0.55 * u * u, R0 * Math.sqrt(1 - u * u)]; }
    if (x <= 24) return [ZC, R0];
    var t = Math.min(1, (x - 24) / (L - 24)), top = ZC + R0 - 0.35 * t, bot = ZC - R0 + 3.0 * Math.pow(t, 1.4);
    return [(top + bot) / 2, (top - bot) / 2];
  }
  /* a törzs felszínének pontja: t = szög fokban a vízszinteshez képest (a néző felőli oldalon) */
  function surf(x, t) { var f = fr(x), a = t * Math.PI / 180; return [x, f[1] * Math.cos(a), f[0] + f[1] * Math.sin(a)]; }
  /* felső és alsó körvonal a vetítésben (a kör képének szélső pontjai) */
  function silTop(x) { var f = fr(x); return [x, -SC * f[1], f[0] + SS * f[1]]; }
  function silBot(x) { var f = fr(x); return [x, SC * f[1], f[0] - SS * f[1]]; }
  /* felvágott ablak a törzs oldalán: x0..x1 között, t0..t1 szögek közt */
  function cut(x0, x1, t0, t1) {
    var pts = [];
    range(x0, x1, 24).forEach(function (x) { pts.push(surf(x, t1)); });
    range(t1, t0, 8).forEach(function (t) { pts.push(surf(x1, t)); });
    range(x1, x0, 24).forEach(function (x) { pts.push(surf(x, t0)); });
    range(t0, t1, 8).forEach(function (t) { pts.push(surf(x0, t)); });
    return pts;
  }

  /* ---------- Szárny: belépőél, kilépőél (x) és magasság (z) a fesztáv mentén (|y|) ---------- */
  function LE(y) { return 12.6 + (Math.abs(y) - 2) * 0.51; }
  function TE(y) { var a = Math.abs(y); return a < 6.3 ? 19.6 : 19.6 + (a - 6.3) * 2.2 / 10.8; }
  function WZ(y) { return 2.0 + (Math.abs(y) - 2) * 0.09; }
  function W(y, f) { var s = y < 0 ? -1 : 1, a = Math.abs(y); return [LE(a) + f * (TE(a) - LE(a)), s * a, WZ(a)]; }  // f = a húr hányada
  function wingPoly(sgn, f0, f1, y0, y1) {
    var ys = [y0]; if (y0 < 6.3 && y1 > 6.3) ys.push(6.3); ys.push(y1);
    var a = ys.map(function (y) { return W(sgn * y, f0); }), b = ys.slice().reverse().map(function (y) { return W(sgn * y, f1); });
    return a.concat(b);
  }
  /* Vízszintes vezérsík */
  function HLE(y) { return 31.3 + (Math.abs(y) - 0.9) * 0.58; }
  function HTE(y) { return 35.3 + (Math.abs(y) - 0.9) * 0.7 / 5.3; }
  function HZ(y) { return 4.45 + (Math.abs(y) - 0.9) * 0.105; }
  function H(y, f) { var a = Math.abs(y), s = y < 0 ? -1 : 1; return [HLE(a) + f * (HTE(a) - HLE(a)), s * a, HZ(a)]; }
  function stabPoly(sgn, f0, f1, y0, y1) { return [H(sgn * y0, f0), H(sgn * y1, f0), H(sgn * y1, f1), H(sgn * y0, f1)]; }
  function WB(y, f) { var w = W(y, f); return B(w[0], w[1], w[2]); }
  function sharklet(sgn) {
    var zt = WZ(17.1), s = sgn;
    return [[20.1, s * 17.0, zt], [21.5, s * 17.45, zt + 2.3], [22.25, s * 17.45, zt + 2.3], [21.8, s * 17.05, zt]];
  }

  var defs = '<defs>' +
    '<linearGradient id="rp-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e6ebf1"/><stop offset="1" stop-color="#aab4c2"/></linearGradient>' +
    '<linearGradient id="rp-wing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="rgba(226,232,240,.62)"/><stop offset="1" stop-color="rgba(176,188,204,.58)"/></linearGradient>' +
    '<linearGradient id="rp-tail" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b5fb3"/><stop offset="1" stop-color="#173d7e"/></linearGradient>' +
    '<linearGradient id="rp-cowl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f9"/><stop offset=".6" stop-color="#c7cfda"/><stop offset="1" stop-color="#8b97a8"/></linearGradient>' +
    '<linearGradient id="rp-cabin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f5f8"/><stop offset="1" stop-color="#d4dbe4"/></linearGradient>' +
    '<linearGradient id="rp-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fd2f5"/><stop offset="1" stop-color="#3c7bb4"/></linearGradient>' +
    '<clipPath id="rp-cabclip"><polygon points="' + cut(7.6, 25.4, -16, 62).map(P).join(' ') + '"/></clipPath>' +
    '<clipPath id="rp-ckclip"><polygon points="' + cut(1.7, 5.3, -8, 64).map(P).join(' ') + '"/></clipPath>' +
    '</defs>';

  /* ---------- Háttér: cím, túloldali szárny és vezérsík (halványan), erők ábrája ---------- */
  var FAR = '#cdd4de', FARD = '#97a2b1';
  var farSide = '<g opacity=".9"' + NS + '>' +
    poly(wingPoly(-1, 0, 1, 2, 17.1), FAR, FARD, 1) + poly(sharklet(-1), FAR, FARD, 1) +
    line([W(-12.3, 0.76), W(-16.6, 0.76)], FARD, 0.8) + line([W(-2.2, 0.74), W(-12.1, 0.74)], FARD, 0.8) +
    poly(wingPoly(-1, 0.76, 1, 12.3, 16.6), '#b7c0cc', FARD, 0.8) + poly(wingPoly(-1, 0.74, 1, 2.2, 12.1), '#bcc4cf', FARD, 0.8) +
    poly(stabPoly(-1, 0, 1, 0.9, 6.2), '#2d5496', '#1b3466', 1) + poly(stabPoly(-1, 0.7, 1, 1.1, 6.0), '#3a65ab', '#1b3466', 0.8) +
    '</g>' + '<text class="lbl-muted" font-size="10.5" x="' + (X(19, -15) + 34).toFixed(0) + '" y="' + Y(-15, WZ(15)).toFixed(0) + '">túloldali szárny</text>';
  function arr(x1, y1, x2, y2, col, lbl, lx, ly) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7;
    return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' M' + (x2 - h * Math.cos(a - 0.45)).toFixed(1) + ' ' + (y2 - h * Math.sin(a - 0.45)).toFixed(1) + ' L' + x2 + ' ' + y2 + ' L' +
      (x2 - h * Math.cos(a + 0.45)).toFixed(1) + ' ' + (y2 - h * Math.sin(a + 0.45)).toFixed(1) + '" stroke="' + col + '" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<text class="lbl" x="' + lx + '" y="' + ly + '" font-size="10.5" fill="' + col + '" style="fill:' + col + '">' + lbl + '</text>';
  }
  var fx = 110, fy = 514;
  var forces = '<rect x="14" y="454" width="196" height="118" rx="10" fill="rgba(127,141,176,.10)" stroke="#7f8db0"/>' +
    '<text class="lbl-muted" x="112" y="471" font-size="11" text-anchor="middle">A repülés négy ereje</text>' +
    '<path d="M' + (fx - 34) + ' ' + fy + ' Q' + (fx - 30) + ' ' + (fy - 6) + ' ' + (fx - 18) + ' ' + (fy - 6) + ' L' + (fx + 26) + ' ' + (fy - 5) + ' L' + (fx + 36) + ' ' + (fy - 16) + ' L' + (fx + 40) + ' ' + (fy - 16) + ' L' + (fx + 38) + ' ' + (fy + 2) +
    ' L' + (fx - 20) + ' ' + (fy + 5) + ' Q' + (fx - 32) + ' ' + (fy + 4) + ' ' + (fx - 34) + ' ' + fy + ' Z" fill="#dfe5ee" stroke="#6b7789"/>' +
    '<path d="M' + (fx - 8) + ' ' + fy + ' L' + (fx + 8) + ' ' + (fy + 1) + '" stroke="#6b7789" stroke-width="3"/>' +
    arr(fx, fy - 8, fx, fy - 34, '#2f9e5b', 'felhajtóerő', fx + 6, fy - 26) +
    arr(fx, fy + 8, fx, fy + 36, '#c0392b', 'súly', fx + 6, fy + 34) +
    arr(fx - 38, fy, fx - 76, fy, '#2f6fd6', 'tolóerő', 24, fy - 7) +
    arr(fx + 44, fy, fx + 84, fy, '#d98c1f', 'ellenállás', fx + 40, fy + 16);
  var backdrop = defs +
    '<text class="lbl" x="14" y="24" font-size="16">Utasszállító repülőgép – a törzs és a szárny felvágva</text>' +
    '<text class="lbl-muted" x="14" y="42">keskeny törzsű gép, kb. Airbus A320 / Boeing 737 méret · a közeli szárny áttetsző</text>' +
    '<ellipse cx="' + X(19, 0) + '" cy="' + (Y(0, 0) + 22) + '" rx="330" ry="26" fill="rgba(60,70,90,.10)"/>' +
    farSide + forces;

  /* ---------- 1. Törzs: héj, ablaksor, ajtók, a felvágott részek belseje (bordázat) ---------- */
  var top = [], bot = [];
  range(0, L, 150).forEach(function (x) { top.push(silTop(x)); bot.push(silBot(x)); });
  var shell = top.concat(bot.reverse());
  var fus = poly(shell, 'url(#rp-skin)', '#5b6676', 1.4);
  // szárny–törzs áramvonalazó burkolat (has)
  fus += poly([surf(10.6, -55), surf(12.5, -70), [14, 0.6, 1.45], [21, 0.6, 1.45], surf(23, -70), surf(24.4, -55), surf(20, -40), surf(13, -40)], '#d3dae3', '#6b7789', 1);
  // díszcsík és ablaksor (az utastéren kívül eső ablakokat a felvágás nem takarja)
  fus += line(range(4.5, 33, 40).map(function (x) { return surf(x, 4); }), '#2b5fb3', 3.4, NS) + line(range(5, 31, 40).map(function (x) { return surf(x, -2); }), '#e0a32b', 1.6, NS);
  for (var wx = 7.0; wx < 31; wx += 0.53) {
    var c = surf(wx, 22);
    fus += '<ellipse cx="' + X(c[0], c[1]).toFixed(1) + '" cy="' + Y(c[1], c[2]).toFixed(1) + '" rx="2.6" ry="3.4" fill="#33465f"' + NS + '/>';
  }
  // ajtók
  [[5.7, 6.6], [31.1, 31.9]].forEach(function (d) { fus += poly([surf(d[0], -12), surf(d[1], -12), surf(d[1], 45), surf(d[0], 45)], 'none', '#7b8696', 1.2, NS); });
  // a felvágások belseje: sötét héj, bordák (keretek), padló
  function hollow(x0, x1, t0, t1) {
    var s = poly(cut(x0, x1, t0, t1), '#4a5566', '#2c3440', 1.2);
    for (var fxx = x0 + 0.5; fxx < x1; fxx += 0.53) s += line(range(t0, t1, 6).map(function (t) { var p = surf(fxx, t); return [p[0], -p[1] * 0.85, p[2]]; }), '#6c7889', 1.4, NS);
    return s;
  }
  fus += hollow(7.6, 25.4, -16, 62) + hollow(6.5, 25.2, -56, -20) + hollow(1.7, 5.3, -8, 64);
  fus += line(range(7.6, 25.4, 6).map(function (x) { return surf(x, -18); }), '#8b97a8', 3, NS);   // padlógerendák vonala
  // farok: APU kiömlő
  fus += '<circle cx="' + X(L - 0.05, 0).toFixed(1) + '" cy="' + Y(0, fr(L)[0]).toFixed(1) + '" r="3.4" fill="#3a3f46"' + NS + '/>';

  /* ---------- 2. Pilótafülke ---------- */
  var ck = poly(cut(1.7, 5.3, -8, 64), '#2e3644', '#1c222c', 1.2);
  var ckIn = '';
  // műszerfal képernyőkkel, árnyékoló
  ckIn += poly([[2.35, -1.3, 3.5], [2.35, 1.3, 3.5], [2.35, 1.3, 4.45], [2.35, -1.3, 4.45]], '#3b4352', '#1c222c', 0.8);
  [-1.0, -0.45, 0.1, 0.65].forEach(function (y) { ckIn += poly([[2.36, y, 3.75], [2.36, y + 0.4, 3.75], [2.36, y + 0.4, 4.25], [2.36, y, 4.25]], '#1d5f9c', '#0d2238', 0.5) + poly([[2.37, y + 0.05, 3.85], [2.37, y + 0.35, 3.85], [2.37, y + 0.35, 4.15], [2.37, y + 0.05, 4.15]], '#59b0ea', 'none', 0); });
  ckIn += poly([[2.2, -1.4, 4.45], [2.2, 1.4, 4.45], [2.7, 1.4, 4.6], [2.7, -1.4, 4.6]], '#232a35', '#11151b', 0.8);
  // pilótaülések oldalnézetben
  [[-0.55, '#4b5b74'], [0.75, '#5c6e8b']].forEach(function (s) {
    var y = s[0];
    ckIn += poly([[3.2, y, 3.35], [3.2, y, 3.8], [3.75, y, 3.8], [3.95, y, 4.75], [4.2, y, 4.75], [4.05, y, 3.35]], s[1], '#1c222c', 0.8);
    ckIn += '<circle cx="' + X(3.75, y).toFixed(1) + '" cy="' + Y(y, 4.55).toFixed(1) + '" r="3.2" fill="#e2b48c" stroke="#6b4a2e" stroke-width=".6"/>';
  });
  // oldalkormánybot (sidestick)
  ckIn += line([[3.0, 1.15, 3.9], [3.05, 1.15, 4.15]], '#c9ced6', 2.2);
  ck += '<g clip-path="url(#rp-ckclip)">' + ckIn + '</g>';
  // szélvédő-keret a külső felületen
  ck += poly([surf(1.15, 30), surf(2.4, 30), surf(2.4, 62), surf(1.6, 70)], 'url(#rp-glass)', '#1c222c', 1.2);
  ck += line(range(1.7, 5.3, 6).map(function (x) { return surf(x, 64); }), '#2b5fb3', 1.4, NS);

  /* ---------- 3. Utastér: ülések, csomagtartók, padló (a felvágott ablakban) ---------- */
  var cab = poly(cut(7.6, 25.4, -16, 62), 'url(#rp-cabin)', '#3e4856', 1.3);
  var cin = '';
  var FL = 3.32;                                            // padlószint
  cin += poly([[7.6, -1.95, FL], [25.4, -1.95, FL], [25.4, 1.95, FL], [7.6, 1.95, FL]], '#6f7c8f', 'none', 0);
  cin += poly([[7.6, 0.25, FL + 0.01], [25.4, 0.25, FL + 0.01], [25.4, -0.25, FL + 0.01], [7.6, -0.25, FL + 0.01]], '#2b5fb3', 'none', 0);  // folyosó szőnyege
  cin += poly([[7.6, -1.6, 4.95], [25.4, -1.6, 4.95], [25.4, -1.6, 5.4], [7.6, -1.6, 5.4]], '#e9edf2', '#9aa5b4', 0.8);                // csomagtartók a túloldalon
  for (var bx = 8.6; bx < 25.4; bx += 1.6) cin += line([[bx, -1.6, 4.97], [bx, -1.6, 5.38]], '#9aa5b4', 0.8);
  for (var wwx = 8.0; wwx < 25.4; wwx += 0.53) {               // ablakok a túloldali falon
    cin += '<ellipse cx="' + X(wwx, -1.85).toFixed(1) + '" cy="' + Y(-1.85, 4.55).toFixed(1) + '" rx="2.2" ry="3" fill="#9fc8ea" stroke="#7d8da3" stroke-width=".5"/>';
  }
  var SEATS = [-1.55, -1.05, -0.55, 0.55, 1.05, 1.55], heads = ['#3b2a1e', '#7a5230', '#d9b66b', '#1e1e24', '#a0522d', '#c9c9c9'];
  for (var ri = 0, rx = 25.0; rx > 8.2; rx -= 0.80, ri++) {
    SEATS.forEach(function (y, si) {
      var col = (si < 3 ? '#2f5d9f' : '#3a6fbd');
      var prof = function (yy) { return [[rx - 0.5, yy, FL + 0.02], [rx - 0.5, yy, FL + 0.45], [rx - 0.12, yy, FL + 0.45], [rx - 0.04, yy, FL + 1.2], [rx + 0.12, yy, FL + 1.2], [rx + 0.06, yy, FL + 0.02]]; };
      cin += poly(prof(y - 0.22), shade(col, 0.7), 'none', 0) + poly(prof(y + 0.22), col, shade(col, 0.6), 0.5);
      if ((ri * 7 + si * 3) % 5 < 2) cin += '<circle cx="' + X(rx - 0.18, y).toFixed(1) + '" cy="' + Y(y, FL + 1.32).toFixed(1) + '" r="2.4" fill="' + heads[(ri + si) % heads.length] + '"/>';
    });
  }
  cab += '<g clip-path="url(#rp-cabclip)">' + cin + '</g>';

  /* ---------- 4. Raktér: elülső és hátsó raktér, LD3-as konténerekkel ---------- */
  function hold(x0, x1, n) {
    var s = poly(cut(x0, x1, -56, -20), '#5b4b3a', '#2d241b', 1.2);
    for (var i = 0; i < n; i++) {
      var a = x0 + 0.25 + i * 1.62, yv = 0.9;
      s += poly([[a, yv, 2.15], [a + 1.53, yv, 2.15], [a + 1.53, yv, 3.0], [a + 1.25, yv, 3.15], [a, yv, 3.15]], i % 2 ? '#c4ab7e' : '#b39667', '#5b4b3a', 0.8);
      s += line([[a + 0.1, yv, 2.65], [a + 1.43, yv, 2.65]], '#8b744f', 0.6);
    }
    return s;
  }
  var cargo = hold(6.5, 12.3, 3) + hold(19.2, 25.2, 3);

  /* ---------- 5. Szárny (a közeli, áttetsző) ---------- */
  var wing = poly(wingPoly(1, 0, 1, 2, 17.1), 'url(#rp-wing)', '#55616f', 1.4);
  wing += poly(sharklet(1), '#dfe5ec', '#55616f', 1.2) + poly([[21.5, 17.45, WZ(17.1) + 2.3], [22.25, 17.45, WZ(17.1) + 2.3], [21.95, 17.3, WZ(17.1) + 1.3], [21.2, 17.3, WZ(17.1) + 1.3]], '#2b5fb3', 'none', 0);
  wing += line([W(2, 0.15), W(6.3, 0.15), W(16.5, 0.15)], 'rgba(60,70,85,.45)', 1, ' stroke-dasharray="4 3"' + NS) +       // első főtartó
    line([W(2, 0.62), W(6.3, 0.62), W(16.5, 0.62)], 'rgba(60,70,85,.45)', 1, ' stroke-dasharray="4 3"' + NS);                   // hátsó főtartó
  [[3.2, 6.1], [6.5, 9.0], [9.2, 11.6], [11.8, 14.2], [14.4, 16.8]].forEach(function (s) {                                       // orrsegédszárnyak (slat)
    wing += poly([W(s[0], 0), W(s[1], 0), W(s[1], 0.09), W(s[0], 0.09)], 'rgba(200,208,220,.9)', '#6b7789', 0.6);
  });
  [[6.5, 8.0], [8.1, 9.5], [9.6, 11.0], [11.1, 12.1], [2.6, 4.4]].forEach(function (s) {                                          // spoilerek
    wing += poly([W(s[0], 0.6), W(s[1], 0.6), W(s[1], 0.72), W(s[0], 0.72)], 'rgba(150,162,178,.9)', '#6b7789', 0.6);
  });
  wing += '<circle cx="' + X(W(17.0, 0.05)[0], 17.0).toFixed(1) + '" cy="' + Y(17.0, WZ(17)).toFixed(1) + '" r="2" fill="#2fbf5b"' + NS + '/>';   // jobb oldali navigációs fény (zöld)

  /* ---------- 6. Csűrő ---------- */
  var ail = poly(wingPoly(1, 0.76, 1, 12.3, 16.6), '#9fb3cc', '#3e4b5c', 1.2) + line([W(12.5, 0.9), W(16.4, 0.9)], 'rgba(255,255,255,.55)', 1, NS);

  /* ---------- 7. Fékszárnyak (Fowler-féle, kissé kiengedve) ---------- */
  var flap = poly(wingPoly(1, 0.74, 1.04, 2.2, 6.2), '#b8c6d8', '#3e4b5c', 1.2) + poly(wingPoly(1, 0.74, 1.04, 6.4, 12.1), '#b8c6d8', '#3e4b5c', 1.2);
  [4.2, 8.0, 10.7].forEach(function (y) { flap += poly([W(y - 0.15, 0.8), W(y + 0.15, 0.8), W(y + 0.15, 1.18), W(y - 0.15, 1.18)], '#8b97a8', '#4b5563', 0.7); });   // sínburkolatok („canoe”)

  /* ---------- 8. Üzemanyagtartályok: szárnytartály (a szárnyszekrényben) és középtartály (a törzsben) ---------- */
  var fuel = poly(wingPoly(1, 0.17, 0.6, 2.2, 15.4), 'rgba(242,168,40,.50)', '#b5650f', 1.4, ' stroke-dasharray="5 3"');
  fuel += poly(cut(13.0, 18.6, -55, -22), 'rgba(242,168,40,.80)', '#b5650f', 1.2, ' stroke-dasharray="5 3"');
  for (var ry = 3.5; ry < 15; ry += 1.6) fuel += line([W(ry, 0.17), W(ry, 0.6)], 'rgba(181,101,15,.45)', 0.8, NS);              // bordák
  var fc = W(10.5, 0.4);
  fuel += '<text x="' + X(fc[0], fc[1]).toFixed(1) + '" y="' + (Y(fc[1], fc[2]) + 4).toFixed(1) + '" font-size="10" font-weight="700" fill="#7a3f05" text-anchor="middle" font-family="system-ui, sans-serif"' + NS + '>kerozin</text>';

  /* ---------- 9–12. Vezérsíkok és kormánylapok ---------- */
  function ftop(x) { return fr(x)[0] + fr(x)[1] - 0.12; }
  var fin = poly([[29.2, 0, ftop(29.2)], [33.55, 0, 11.76], [34.8, 0, 11.76], [35.15, 0, ftop(35.2)]], 'url(#rp-tail)', '#0f2a57', 1.4);
  fin += '<path d="M' + X(30.8, 0) + ' ' + Y(0, 7.3) + ' q20 -18 40 -6" fill="none" stroke="#e0a32b" stroke-width="3"' + NS + '/>';
  var rud = poly([[34.8, 0, 11.6], [35.55, 0, 11.6], [36.3, 0, ftop(36.3) + 0.1], [35.15, 0, ftop(35.2)]], '#3b6fc4', '#0f2a57', 1.2) +
    line([[35.4, 0, 11.3], [35.8, 0, 8.0]], 'rgba(255,255,255,.35)', 1, NS);
  var hst = poly(stabPoly(1, 0, 0.7, 0.9, 6.2), 'url(#rp-tail)', '#0f2a57', 1.3);
  var elev = poly(stabPoly(1, 0.7, 1, 1.1, 6.0), '#3b6fc4', '#0f2a57', 1.2);

  /* ---------- 13. Hajtómű (a közeli szárny alatt) ---------- */
  var EY = 5.75, EZ = 1.68, ER = 1.15;
  function ecyl(x0, x1, r, z) {
    var pts = [];
    range(x0, x1, 10).forEach(function (x) { pts.push([x, EY - SC * r, z + SS * r]); });
    range(x1, x0, 10).forEach(function (x) { pts.push([x, EY + SC * r, z - SS * r]); });
    return pts;
  }
  function ering(x, r, z) { return range(0, 360, 36).map(function (t) { var a = t * Math.PI / 180; return [x, EY + r * Math.cos(a), z + r * Math.sin(a)]; }); }
  var eng = poly([[13.4, EY, EZ + 0.9], [16.4, EY, WZ(EY) - 0.05], [17.6, EY, WZ(EY) - 0.05], [15.5, EY, EZ + 0.55]], '#c9d1dc', '#5b6676', 1);   // pilon
  eng += poly(ecyl(14.0, 15.5, 0.6, EZ - 0.05), '#a9b2be', '#4b5563', 1);                               // magburkolat és a meleg áram fúvókája
  eng += poly([[15.5, EY - 0.3, EZ + 0.2], [16.5, EY, EZ - 0.05], [15.5, EY + 0.3, EZ - 0.25]], '#8a7a6c', '#3a3f46', 0.8);   // kiáramlási kúp
  eng += poly(ecyl(9.6, 14.1, ER, EZ), 'url(#rp-cowl)', '#4b5563', 1.3);
  eng += poly(ering(9.6, ER, EZ), '#e9edf2', '#4b5563', 1.2) + poly(ering(9.62, ER * 0.86, EZ), '#1f2a3a', '#0e141d', 0.8);   // beömlőajak, ventilátor
  for (var bl = 0; bl < 360; bl += 22.5) {                      // ventilátorlapátok
    var a1 = bl * Math.PI / 180;
    eng += line([[9.64, EY + 0.25 * Math.cos(a1), EZ + 0.25 * Math.sin(a1)], [9.64, EY + 0.95 * Math.cos(a1 + 0.25), EZ + 0.95 * Math.sin(a1 + 0.25)]], '#7d8ea6', 1.1, NS);
  }
  eng += poly(ering(9.55, 0.24, EZ), '#c3cbd6', '#4b5563', 0.6) + line([[9.55, EY + 0.05, EZ + 0.05], [9.55, EY - 0.12, EZ - 0.16]], '#fff', 1.4, NS);   // orrkúp a spirállal

  /* ---------- 14. Futómű (orrfutó + a közeli főfutó; a túloldali a törzs mögött van) ---------- */
  function wheel(x, y, z, r, fill) {
    return '<circle cx="' + X(x, y).toFixed(1) + '" cy="' + Y(y, z).toFixed(1) + '" r="' + (r * S0).toFixed(1) + '" fill="' + fill + '" stroke="#0d0f12" stroke-width="1"/>' +
      '<circle cx="' + X(x, y).toFixed(1) + '" cy="' + Y(y, z).toFixed(1) + '" r="' + (r * S0 * 0.45).toFixed(1) + '" fill="#9aa3ad" stroke="#4b5563" stroke-width=".8"/>';
  }
  var gear = line([[5.1, 0, 2.05], [5.1, 0, 0.4]], '#5b6470', 4.2) + line([[5.1, 0, 2.05], [5.1, 0, 0.4]], '#c3cad3', 2) +
    line([[5.1, 0, 1.3], [6.2, 0, 2.0]], '#7c8591', 1.8) +
    wheel(5.1, -0.3, 0.38, 0.38, '#2a2e35') + wheel(5.1, 0.3, 0.38, 0.38, '#30353d');
  var GY = 3.8;
  gear += line([[17.7, GY, WZ(GY) - 0.05], [17.7, GY, 0.6]], '#5b6470', 5) + line([[17.7, GY, WZ(GY) - 0.05], [17.7, GY, 0.6]], '#c3cad3', 2.4) +
    line([[17.7, GY, 1.2], [16.6, 1.8, 1.95]], '#7c8591', 2) +
    line([[17.7, GY - 0.45, 0.57], [17.7, GY + 0.45, 0.57]], '#5b6470', 2.4) +
    wheel(17.7, GY - 0.45, 0.57, 0.57, '#2a2e35') + wheel(17.7, GY + 0.45, 0.57, 0.57, '#30353d');

  STUDIE.addModel({
    id: 'repulogep',
    title: 'Utasszállító repülőgép',
    icon: '🛫',
    color: '#2b5fb3',
    category: 'Járművek',
    keywords: 'repülőgép utasszállító Airbus A320 Boeing 737 keskeny törzsű törzs szárny csűrő fékszárny flap orrsegédszárny slat spoiler vezérsík függőleges vezérsík vízszintes vezérsík oldalkormány magassági kormány hajtómű futómű pilótafülke fly-by-wire oldalkormánybot sidestick utastér kabin raktér konténer LD3 üzemanyagtartály kerozin felhajtóerő légellenállás stabilitás súlypont átesés Bernoulli Wright fivérek Adorján János Libelle Comet Boeing 747 Concorde aerodinamika',
    summary: 'Kb. 70 tonnás alumínium „cső” két szárnnyal: 150–190 utast visz 11 km magasan, kb. 830 km/h-val, és egy órán át kb. 2,5 tonna kerozint éget el.',
    scale: 'kb. 37–40 m hosszú, 34–36 m fesztáv, 12 m magas; legnagyobb felszálló tömeg kb. 70–80 t (A320 / 737 nagyság)',
    viewBox: '0 0 900 590',
    backdrop: backdrop,
    intro: 'Egy utasszállító repülőgépet **négy erő** egyensúlya tart a levegőben: a szárnyon keletkező **felhajtóerő** a súlyt, a hajtóművek **tolóereje** a légellenállást egyenlíti ki. A szárny úgy tereli a levegőt, hogy felette kisebb, alatta nagyobb legyen a nyomás: a különbség emeli a gépet.\n\nA gép többi része azért van, hogy ezt az erőt **irányítani** lehessen: a **vezérsíkok** stabilan tartják, a **kormánylapok** (csűrő, magassági és oldalkormány) fordítják, a **fékszárnyak** pedig lassú repüléshez (fel- és leszálláshoz) alakítják át a szárnyat.\n\nA rajzon a törzs oldala fel van vágva, a közeli szárny pedig áttetsző. A **Szétszedés** gombbal szétnyithatod a gépet.',
    parts: [
      {
        id: 'torzs', z: 1, name: 'Törzs', svg: fus, explode: [0, 0], badge: B(29, 0, 4.3), en: 'fuselage (semi-monocoque pressurised fuselage)',
        terms: ['mechanika/feszultseg', 'mechanika/faradas'],
        what: 'A gép hosszú, hengeres „teste”, amely összefogja a többi részt: elöl a **pilótafülke**, középen a **padló** fölött az **utastér**, alatta a **raktér**, középen pedig a törzs alá csatlakozik a szárny. Utazómagasságon (kb. 11 km) a külső levegő nyomása csak a tengerszinti negyede, ezért a törzs egy **túlnyomásos tartály**: belül annyi a nyomás, mintha kb. 2000–2400 m magasan lennénk.',
        madeOf: '**Félhéjszerkezet**: körbefutó **bordák (keretek)**, hosszanti **merevítők (sztringerek)** és rájuk szegecselt, 1,5–2 mm vastag **alumíniumötvözet** lemezek. A lemez a teher egy részét maga viseli, ezért lehet ilyen vékony. Az újabb gépeknél (Boeing 787, Airbus A350) a törzs nagy része már **szénszálas kompozit**.',
        how: 'A törzset **szekciókban** (orr, elülső, középső, hátsó rész, farok) gyártják, sokszor más-más országban. A lemezeket meghajlítják, sajtolják, **vegyi maratással** vékonyítják ott, ahol kevesebb anyag is elég, majd robotok és szerelők a keretekhez és merevítőkhöz szegecselik őket. Az Airbusnál a kész szekciókat a különleges, „bálna” alakú **Beluga** szállítógép viszi a végső összeszerelő csarnokba.',
        uni: 'A túlnyomásos törzs vékony falú nyomástartó: a kerületi (gyűrű-)feszültség `σ = Δp·r / t`. A320-ra Δp ≈ 0,56 bar (8 psi), r ≈ 1,98 m, t ≈ 1,6 mm → `σ ≈ 69 MPa`; a hosszirányú feszültség ennek fele. Minden repülés egy teljes **terhelési ciklus**, egy gép élete alatt 50–60 ezer ciklus: a méretezést ezért a **kifáradás** és a repedésterjedés (kártűrő tervezés, „damage tolerance”) határozza meg, nem a statikus szilárdság. A hajlítást (a szárnyon támaszkodó „gerenda”) a sztringerek és a héj együtt veszik fel.',
        fact: 'Az utasszállítók ablakai azért **lekerekítettek**, mert az első sugárhajtású utasszállító, a de Havilland Comet 1954-es baleseteit a szögletes ablak- és nyílássarkoknál induló **fáradásos repedések** okozták.'
      },
      {
        id: 'pilotafulke', z: 3, name: 'Pilótafülke', svg: ck, explode: [-44, -26], badge: B(3.3, 0, 6.6), en: 'flight deck (cockpit)',
        terms: ['szabalyozas/visszacsatolas'],
        what: 'A gép orrában ül a **két pilóta** (kapitány bal oldalt, első tiszt jobb oldalt). Előttük **képernyők** mutatják a repülési adatokat (sebesség, magasság, irány, térkép, hajtóművek és rendszerek állapota). Az Airbusoknál kormányszarv helyett oldalt egy **oldalkormánybot** (sidestick) van, a gépet számítógépek irányítják a pilóta parancsa szerint (**fly-by-wire**).',
        madeOf: 'A szélvédő több réteg **edzett üvegből és műanyagból** (akril, polikarbonát) áll, köztük **fűtőréteggel**, amely megakadályozza a jegesedést és rugalmasabbá teszi az üveget: így egy nagy madár becsapódását is kibírja. A műszerfalon LCD-kijelzők, alatta, az orr alsó részében az **elektronikai (avionikai) tér** van.',
        how: 'Az orrszekcióval együtt készül; a műszerfal, a kábelkötegek (egy gépben több száz km vezeték!) és a számítógépek a végső szerelésnél kerülnek be. A pilóták jelentős része ma a repülési idő nagy részében **robotpilótával** repül: a gépet programozzák, és felügyelik a repülést.',
        uni: 'Az A320 volt az első **digitális fly-by-wire** utasszállító: a botkitérés nem közvetlenül a kormánylapot mozgatja, hanem egy **kívánt választ** kér (normál üzemmódban terhelési többest, `n_z`-t a bólintásnál, bedöntési szögsebességet az orsózásnál). A vezérlőtörvények (control laws) **burkológörbe-védelmet** adnak: korlátozzák az állásszöget (α-védelem), a terhelési többest (+2,5 / −1 g behúzott fékszárnynál) és a bedöntést. A biztonságot **többszörözés** adja: több, eltérő hardverű és szoftverű számítógép (ELAC, SEC, FAC) és három független hidraulikarendszer.',
        fact: 'Az Airbus A320 (első repülése 1987) volt az első utasszállító, amelyet **digitális fly-by-wire** rendszerrel és oldalkormánybottal építettek. A Concorde már korábban „drótokon” repült, de analóg elektronikával.'
      },
      {
        id: 'utaster', z: 3, name: 'Utastér (kabin)', svg: cab, explode: [0, -64], badge: B(16, 0, 6.8), en: 'passenger cabin',
        what: 'A padló fölötti tér, ahol egy keskeny törzsű gépen **150–190 utas** ül, egy folyosó két oldalán **3–3 ülésben**. Fölöttük a **csomagtartók**, elöl és hátul a **konyhák** (galley) és a mosdók. Az ajtók és a szárny fölötti **vészkijáratok** úgy vannak elhelyezve, hogy mindenki gyorsan kijuthasson.',
        madeOf: 'Az ülések könnyű **alumínium vázból** és égésgátló habból, huzatból készülnek; a falpanelek, csomagtartók **üvegszálas–műgyantás** méhsejtszerkezetek (könnyűek, és nehezen gyulladnak). A padló alumínium- és kompozit panelekből áll, amelyek a **padlógerendákon** fekszenek.',
        how: 'A kabin „bútorait” (üléseket, konyhákat, mosdókat) a légitársaság választja ki, ezek a végső szereléskor kerülnek be. A levegőt a hajtóművek kompresszorából elvett, lehűtött **sűrített levegő** adja, amelyet félig **HEPA-szűrőkön** visszakeringetnek: a kabin teljes levegője kb. 2–3 percenként kicserélődik. A nyomást egy **kiáramlási szelep** szabályozza, amely a kelleténél többet enged ki.',
        uni: 'A kabin „magassága” az előírás szerint legfeljebb 8000 láb (2438 m); itt a légnyomás kb. 75 kPa, az oxigén parciális nyomása a tengerszintinek kb. 75%-a, az egészséges utasok vér-oxigén-telítettsége 90–95%. A tanúsításhoz bizonyítani kell, hogy teljes utastér mellett, a kijáratok **fele** használatával mindenki **90 másodpercen belül** kijut (evakuációs próba). A kabin akusztikája (kb. 80 dB(A) utazáskor) főként a törzs körüli **turbulens határréteg** zajából ered.',
        fact: 'A fedélzeten a levegő nagyon **száraz** (relatív páratartalma gyakran 20% alatt van), mert 11 km magasan a külső levegő szinte egyáltalán nem tartalmaz vizet. Ezért érdemes repülés közben sokat inni.'
      },
      {
        id: 'rakter', z: 3, name: 'Raktér', svg: cargo, explode: [-6, 34], badge: B(9.4, 0, 1.55), en: 'cargo hold (forward and aft hold)',
        what: 'A padló alatti tér, a szárny előtt és mögött egy-egy **raktérrel**. Ide kerülnek a feladott **bőröndök**, a posta és az áru. Az A320-ba **szabványos konténerek** (LD3-45) is beférnek, a Boeing 737-be a csomagokat **ömlesztve**, kézzel rakják be. A két raktér között a **középső szárnyszekrény** és a **középtartály** van, a szárny mögött pedig a főfutó akna.',
        madeOf: 'A falakat és a mennyezetet **tűzálló bélés** borítja, a padlón görgősor segíti a konténerek mozgatását. Füstérzékelők és egy **tűzoltó rendszer** (oltógázzal) védik. A hátsó raktér egy része fűthető, hogy élő állatot is szállíthassanak.',
        how: 'A raktér a törzsszekciókkal együtt készül. A rakodásnak szigorú terve van (rakodási lap): a csomagok, az utasok és az üzemanyag elosztása határozza meg a gép **súlypontját**, amelynek egy megengedett tartományon belül kell lennie.',
        uni: 'Tömeg és súlypont (weight & balance): a súlypont helyét a szárny közepes aerodinamikai húrjának (MAC) százalékában adják meg, egy utasszállítónál jellemzően kb. 15–40% MAC között engedélyezett. Ha túl hátul van, a gép **statikusan instabillá** válhat bólintásban; ha túl elöl, nem lehet a magassági kormánnyal elég nagy állásszöget elérni felszálláskor/leszálláskor, és nő a kiegyensúlyozó (trim-) ellenállás. A rakodási lap ezt minden járat előtt ellenőrzi.',
        fact: 'Egy keskeny törzsű gép raktere kb. **35–40 m³**: nagyjából egy kisebb szoba térfogata. Egy átlagos járaton kb. 2–3 tonna csomag utazik benne.'
      },
      {
        id: 'szarny', z: 5, name: 'Szárny', svg: wing, explode: [20, 34], badge: WB(13.6, 0.5), lesson: 'fiz-alap/nyomas', en: 'wing (wing box, slats, spoilers, sharklet)',
        terms: ['mechanika/hajlitonyomatek', 'mechanika/masodrendu-nyomatek', 'e-mobilitas/legellenallas'],
        what: 'A szárny adja a gép **felhajtóerejét**. A kissé ívelt, elöl lekerekített, hátul elvékonyodó **szárnyprofil** a levegőt lefelé téríti: a szárny fölött **szívás** (kisebb nyomás), alatta kis túlnyomás keletkezik. Egy A320 szárnyainak fesztávja kb. **35,8 m**, felülete kb. **123 m²**, és kb. 25°-kal hátra van nyilazva. A szárny végén a felfelé hajló **szárnyvégi terelőlap** (sharklet, winglet) csökkenti az ellenállást.',
        madeOf: 'A belsejében a **szárnyszekrény**: egy első és egy hátsó **főtartó** (gerenda), köztük **bordák**, és a merevítőkkel erősített felső és alsó **borítólemez** (alumíniumötvözetek, újabban kompozit). Az elülső élen **orrsegédszárnyak** (slatok), a hátsó élen **fékszárnyak**, **csűrők** és **spoilerek** (féklapok) vannak.',
        how: 'Az Airbus szárnyai a walesi **Broughtonban** készülnek, ahol a hosszú főtartókhoz és bordákhoz illesztik a több méteres, egy darabból mart borítólemezeket; a mozgó lapokat Brémában szerelik fel. A szárnyat a törzs alatti **középső szárnyszekrényhez** csatlakoztatják. A tanúsításnál a szárnyat a valaha várható legnagyobb terhelés **1,5-szeresével** is meg kell terhelni a próbapadon, és ki kell bírnia.',
        uni: 'Felhajtóerő: `L = ½·ρ·v²·S·C_L`. Utazáskor (11 km, ρ ≈ 0,36 kg/m³, v ≈ 230 m/s, S = 122,6 m²) egy 65 t-s gépnél `C_L = m·g / (½ρv²S) ≈ 0,54`. Ellenállás: `D = ½·ρ·v²·S·C_D`, `C_D = C_D0 + C_L² / (π·A·e)`; itt az első tag a súrlódási és alaki ellenállás (`C_D0 ≈ 0,02`), a második az **indukált ellenállás**, amely a szárnyvégi örvényekből ered (A = b²/S ≈ 10,5 oldalviszony, e ≈ 0,8 Oswald-tényező). Így `L/D ≈ 17`. A **nyilazás** (Λ = 25°) azért kell, mert a hullámellenállást a profilra merőleges Mach-szám (`M·cos Λ`) szabja meg; a **szuperkritikus profil** tovább tolja a kritikus Mach-számot. A szárnytő hajlítónyomatékát a fesztáv mentén eloszló felhajtóerő adja.',
        fact: 'A felhajtóerő nagyobbik része nem a szárny alá „nyomódó” levegőből, hanem a szárny **felső oldalán kialakuló szívásból** származik. Ezért a szárny tetejére soha nem szabad jeget vagy havat hagyni felszállás előtt: ezt jégtelenítő folyadékkal lemossák.'
      },
      {
        id: 'csuro', z: 6, name: 'Csűrő', svg: ail, explode: [44, 60], badge: B(21.3, 14.5, 3.3), en: 'aileron',
        what: 'A szárnyvég közelében, a hátsó élen lévő mozgó lap. A két szárny csűrője **ellentétesen** tér ki: ahol lefelé hajlik, ott nő a felhajtóerő, ahol felfelé, ott csökken, így a gép a hossztengelye körül **bedől** (orsózik). Kanyarodáskor ezzel döntik meg a gépet; ilyenkor a felhajtóerő egy része oldalra húzza, és a gép kanyarodik.',
        madeOf: 'Könnyű **szénszálas kompozit** vagy alumínium héjból, belül merevítőkkel. Hidraulikus **működtetőhengerek** (aktuátorok) mozgatják, egy csűrőt kettő is, hogy az egyik meghibásodása se okozzon bajt.',
        how: 'A pilóta oldalra mozdítja a botot, a számítógép kiszámolja a szükséges kitérést, és a hidraulika beállítja. Az orsózást a szárny felső oldalán lévő **spoilerek** is segítik: a lefelé forduló oldalon felemelkednek, és ott csökkentik a felhajtóerőt.',
        uni: 'Csűrőkitéréskor `ΔC_l = C_lδa·δa` orsózónyomaték keletkezik, a stacionárius orsózási szögsebesség `p = −(C_lδa / C_lp)·δa·2V/b` (C_lp az orsózási csillapítás). Mellékhatás a **csűrő-ellenállás okozta ellentétes legyezés** (adverse yaw): a lefelé kitérő csűrőn nagyobb az indukált ellenállás, ezért az orr a kanyarral ellentétes irányba fordulna; ezt oldalkormánnyal vagy differenciált csűrőkitéréssel egyenlítik ki. Nagy sebességnél a szárny **csavarodása** miatt a csűrő hatása megfordulhat (**csűrőreverzió**), ezért a nagy gépeken a belső csűrőket vagy spoilereket használják gyors repülésnél.',
        fact: 'A Wright fivérek gépén még nem volt csűrő: ők a szárny **elcsavarásával** (szárnytorzítás) döntötték meg a gépet, drótokkal húzva a vászonborítású szárny végeit.'
      },
      {
        id: 'fekszarny', z: 6, name: 'Fékszárny (flap)', svg: flap, explode: [34, 52], badge: B(19.6, 6.5, 2.6), en: 'trailing-edge flaps (Fowler flaps)',
        what: 'A szárny hátsó élének belső részén lévő, hátra és lefelé **kicsúsztatható** lapok. Fel- és leszálláskor kiengedik őket: a szárny így **nagyobb és erősebben ívelt** lesz, ezért kisebb sebességnél is elég felhajtóerőt ad. A kiengedett fékszárny az **ellenállást** is növeli, ami leszálláskor jól jön. Elöl az **orrsegédszárnyak** (slatok) ugyanezt segítik.',
        madeOf: 'Alumínium és kompozit lapokból, amelyek **síneken** gördülnek hátra; a síneket a szárny alatti áramvonalas burkolatok („kenuk”) takarják. A szárnyban futó **forgatótengelyek** egyszerre mozgatják a két oldal lapjait, hogy mindig szimmetrikusan álljanak.',
        how: 'A pilóta egy karral fokozatokban (pl. 1, 2, 3, FULL) állítja be. Felszálláskor kisebb, leszálláskor teljes kitérést használnak. A **Fowler-fékszárny** először hátracsúszik (nő a szárny felülete), majd lefelé fordul (nő az ívelés), és közben rések nyílnak, amelyeken át a nagy nyomású levegő a felső oldalra áramlik, és ott „életben tartja” az áramlást.',
        uni: 'Az **átesési sebesség**: `V_s = √(2·m·g / (ρ·S·C_L,max))`. Behúzott lapokkal `C_L,max ≈ 1,5`, teljesen kiengedett slattal és fékszárnnyal kb. 2,8–3. Egy 60 t-s A320-ra tengerszinten (ρ = 1,225 kg/m³) ez `V_s ≈ 53 m/s ≈ 190 km/h`, a megközelítési sebesség (kb. 1,23·V_s) így kb. 235 km/h; fékszárny nélkül ez kb. 320 km/h volna. A résen átáramló levegő energiát visz a felső oldal **határrétegébe**, ezért az később válik le (nagyobb állásszögig nem esik át a szárny).',
        fact: 'Egy keskeny törzsű utasszállító kb. **240–260 km/h**-val ér földet: fékszárnyak nélkül ehhez sokkal hosszabb kifutópálya kellene.'
      },
      {
        id: 'uzemanyag', z: 6, name: 'Üzemanyagtartályok', svg: fuel, explode: [10, 16], badge: WB(5.2, 0.4), en: 'fuel tanks (integral wing tanks, centre tank)',
        terms: ['analizis/primitiv-fuggveny'],
        what: 'Az üzemanyag (**kerozin**, Jet A-1) nem külön „kannában”, hanem magában a **szárnyszekrényben** van: a főtartók, bordák és borítólemezek közötti teret tömítették vízzárra. Emellett a törzs alatt, a két szárny között van a **középtartály**. Egy A320 kb. **24–27 ezer liter** kerozint vihet, ez kb. 19–21 tonna.',
        madeOf: 'Az **integrált tartály** fala maga a szárny szerkezete, az illesztéseket speciális **tömítőanyag** zárja le. Benne szivattyúk, mérőszondák, szellőzőcsövek vannak, a bordák pedig megakadályozzák, hogy a kerozin egyszerre átlötyögjön egyik végből a másikba. A középtartályt **nitrogénben dús** levegővel töltik ki (inertizálás), hogy ne alakulhasson ki robbanóképes gőz.',
        how: 'A tartályt a szárny összeszerelésekor tömítik, majd nyomáspróbával ellenőrzik. Tankoláskor a kerozin a szárny alatti csatlakozón, nyomás alatt áramlik be. Repülés közben a gép előbb a **középtartályt** üríti ki, a szárnyakban lévőt a végére hagyja.',
        uni: 'A hatótáv a **Breguet-egyenletből**: `R = (V / (g·c_T))·(L/D)·ln(m₀ / m₁)`, ahol c_T a fajlagos üzemanyag-fogyasztás (kg/(N·s)), m₀ és m₁ a kezdő és a végső tömeg. Az egyenlet a fogyó tömeg miatt egy **integrálásból** jön: dm/dt = −c_T·T, és utazáskor T = D = m·g/(L/D). Egy A320 utazáskor kb. 2,4–2,7 t/h kerozint fogyaszt. A szárnyban tartott üzemanyag **csökkenti a szárnytő hajlítónyomatékát** (a tömeg ott van, ahol a felhajtóerő), ezért ürítik a középtartályt először („bending relief”).',
        fact: 'Az üzemanyag a szárnyban **„tehermentesíti”** is a szárnyat: a súlya ott hat, ahol a felhajtóerő, így a szárnytőnek kevesebbet kell tartania. Ezért fogy el először a törzsbeli középtartály.'
      },
      {
        id: 'fuggoleges', z: 4, name: 'Függőleges vezérsík', svg: fin, explode: [0, -36], badge: B(32.4, 0, 8.6), en: 'vertical stabiliser (fin)',
        terms: ['mechanika/nyomatek', 'mechanika/sulypont'],
        what: 'A gép farkán felálló, nagy, rögzített „uszony”. Úgy működik, mint a **szélzászló** vagy a nyíl tolla: ha a gép orra oldalra fordulna, az oldalról érkező levegő a vezérsíkot visszanyomja, és a gép visszaáll a menetirányba (**iránystabilitás**). A hátsó részén van az **oldalkormány**.',
        madeOf: 'Az Airbus gépeken **szénszálas kompozitból** készül (főtartók, bordák és borítás is), ami könnyebb, és nem korrodál. Belül vezetik a kormánylap hidraulikáját, a csúcsán gyakran antennák és a helyzetjelző fény van.',
        how: 'A kompozit rétegeket formára fektetik, majd **autoklávban** (nagy nyomású kemencében) kikeményítik, végül csavarokkal a törzs farkához rögzítik. A légitársaság **logója** szinte mindig erre a jól látható felületre kerül.',
        uni: 'Statikus iránystabilitás: `C_nβ > 0` (a csúszási szög növekedésével helyreállító legyezőnyomaték keletkezik). A vezérsík hozzájárulása `ΔC_nβ ≈ η_v·V_v·C_Lα,v`, ahol `V_v = S_v·l_v / (S·b)` a függőleges vezérsík **térfogati együtthatója**. A méretezés mértékadó esete gyakran nem a stabilitás, hanem az **egy hajtómű kiesése** kis sebességnél: a vezérsíknak és az oldalkormánynak a minimális irányíthatósági sebességnél (V_MC) is ki kell egyenlítenie az aszimmetrikus tolóerő legyezőnyomatékát.',
        fact: 'Az Airbus már az **A310-esen** (1985) szénszálas kompozitból építette a függőleges vezérsíkot: ez volt az első ilyen elsődleges tartószerkezet egy utasszállítón.'
      },
      {
        id: 'oldalkormany', z: 5, name: 'Oldalkormány', svg: rud, explode: [26, -48], badge: B(35.6, 0, 7.6), en: 'rudder',
        what: 'A függőleges vezérsík hátsó, **jobbra–balra** kitérő lapja. A gép orrát fordítja oldalra (**legyezés**). Nem ezzel kanyarodnak (a kanyart a bedöntés adja), hanem az oldalszeles leszállásnál, a kanyar összehangolásánál és **hajtóműhiba** esetén van rá szükség, amikor az egyik oldali tolóerő kiesése elfordítaná a gépet.',
        madeOf: 'Kompozit héj és merevítők; több hidraulikus aktuátor mozgatja. A pilóták a lábukkal, **pedálokkal** kormányozzák, ugyanezek a pedálok fékezik a kerekeket a földön.',
        how: 'A kitérése sebességfüggő: nagy sebességnél a számítógép **korlátozza**, mert már kis kitérés is nagy erőt ad, és teljes kitérés akár a vezérsíkot is túlterhelhetné. A földön, kis sebességnél az orrkerék kormányzása veszi át a feladatát.',
        uni: 'Az oldalkormány legyezőnyomatéka `ΔC_n = −C_nδr·δr`. Egy hajtómű kiesésekor a kiegyensúlyozáshoz `C_nδr·δr = T·y_e / (q·S·b)` kell (y_e a hajtómű oldaltávolsága); ebből adódik V_MC. Az ismételt, ellentétes irányú teljes pedálkitérések a vezérsíkot a tervezési határ fölé terhelhetik: ez okozta 2001-ben az American Airlines 587-es járatának balesetét, ami után a pilótaképzést és a pedálkorlátozást is módosították.',
        fact: 'Oldalszeles leszállásnál a gép **ferdén**, kissé a szél felé fordult orral közelít („rák-járás”), és a pilóta közvetlenül földet érés előtt az oldalkormánnyal fordítja egyenesbe.'
      },
      {
        id: 'vizszintes', z: 3, name: 'Vízszintes vezérsík', svg: hst, explode: [18, 28], badge: B(33.1, 3.6, 4.8), en: 'horizontal stabiliser (trimmable horizontal stabiliser, THS)',
        terms: ['mechanika/sulypont', 'mechanika/egyensuly'],
        what: 'A farok két kis „szárnya”. A gép **bólintás körüli stabilitását** adja: ha egy széllökés felemelné a gép orrát, a vezérsíkon megváltozó erő visszabillenti. A modern utasszállítókon az egész vízszintes vezérsík **elállítható** (trimmelhető): így egyensúlyozzák ki a gépet, hogy a pilótának ne kelljen folyamatosan húznia vagy nyomnia a botot.',
        madeOf: 'Kompozit vagy alumínium szárnyszekrény, belépőéllel és borítással. A beállítását a törzsben egy erős **csavarorsó** (golyósorsó) végzi, amelyet hidraulikus motorok forgatnak.',
        how: 'Az A320 vízszintes vezérsíkja Spanyolországban (Getafe) készül. A beállítás fokozatosan változik repülés közben, ahogy fogy az üzemanyag és változik a sebesség. A vezérsík jellemzően **lefelé nyom**, mert a súlypont a szárny felhajtóerejének támadáspontja előtt van: így áll össze a nyomatéki egyensúly.',
        uni: 'Hosszstatikus stabilitás: `dC_m/dα < 0`, ami akkor teljesül, ha a súlypont a **semleges pont** előtt van. A kettő távolsága a MAC-ra vonatkoztatva a **statikus tartalék** (static margin), utasszállítón kb. 5–20%. A semleges pont helyét döntően a vízszintes vezérsík **térfogati együtthatója** szabja meg: `V_H = S_H·l_H / (S·c̄)` (A320-nál kb. 1). Minél hátrébb a súlypont, annál kisebb a vezérsík lefelé ható ereje (a trimellenállás), de annál kevésbé stabil a gép.',
        fact: 'Az utasszállítók vízszintes vezérsíkja általában **lefelé** hat: a szárnynak így kicsit több felhajtóerőt kell termelnie, mint a gép súlya. Ezért spórolnak üzemanyagot, ha a súlypont hátrébb van (a megengedett határon belül).'
      },
      {
        id: 'magassagi', z: 3, name: 'Magassági kormány', svg: elev, explode: [36, 44], badge: B(35.6, 4.2, 4.9), en: 'elevator',
        what: 'A vízszintes vezérsík hátsó, **felfelé–lefelé** kitérő lapja. Ezzel emeli vagy süllyeszti a pilóta a gép **orrát** (bólintás). Ha a botot hátrahúzza, a kormánylap felfelé tér ki, a farok lefelé mozdul, az orr felemelkedik, nő a szárny állásszöge és vele a felhajtóerő: a gép emelkedik.',
        madeOf: 'Kompozit héj, merevítők; mindkét oldalon külön lap, mindegyiket két hidraulikus aktuátor mozgatja, különböző hidraulikarendszerről.',
        how: 'Felszálláskor a „rotáció” pillanatában (kb. 250–280 km/h-nál) a pilóta hátrahúzza a botot, a magassági kormány felemeli az orrot, és a gép elemelkedik. A gyors, rövid ideig tartó korrekciókat a magassági kormány, a tartós kiegyensúlyozást a vízszintes vezérsík elállítása végzi.',
        uni: 'A bólintónyomaték: `C_m = C_m0 + C_mα·α + C_mδe·δe`; trimállapotban `C_m = 0`, ebből adódik a szükséges kormánykitérés az állásszög függvényében. A hosszirányú dinamika két lengési módusa a gyors, erősen csillapított **rövid periódusú** lengés (állásszög-változás, néhány másodperc) és a lassú **fugoid** (magasság és sebesség cseréje, kb. egy perc periódussal). A fly-by-wire normál vezérlése a botkitéréssel egy kívánt terhelési többest (ún. C-csillag válasz) parancsol.',
        fact: 'Egy utasszállító a felszálláskor kb. **15°**-ra emeli az orrát; ha többre, a farok hozzáérhet a betonhoz (tail strike). Ezért van sok gép farka alatt egy kis védő „csúszótalp”.'
      },
      {
        id: 'hajtomu', z: 2, name: 'Hajtómű', svg: eng, explode: [-6, 70], badge: B(11.6, 5.75, 1.7), link: 'hajtomu', lesson: 'fizika/newton', en: 'turbofan engine on underwing pylon',
        terms: ['fizika-bsc/impulzus'],
        what: 'A két **sugárhajtómű** a szárnyak alatt, egy-egy **pilonon** függ. A nagy ventilátor rengeteg levegőt hajt hátra, és ennek **ellenereje** tolja előre a gépet (Newton III. törvénye). Egy A320neo hajtóműve felszálláskor kb. **110–150 kN** tolóerőt ad, ez nagyjából 11–15 tonna súlyának felel meg.',
        madeOf: 'Kívül alumínium és kompozit **gondola**, belül titán ventilátor- és kompresszorlapátok, nikkelalapú szuperötvözetből készült turbina. Belülről nézz bele a „Nézz bele” gombbal!',
        how: 'A hajtóművet nem a repülőgépgyártó készíti, hanem egy hajtóműgyártó (pl. CFM, Pratt & Whitney), és a végső szereléskor függesztik fel a pilonra. A szárny alatti elhelyezés előnyei: könnyű hozzáférni karbantartáskor, és a súlya is **tehermentesíti** a szárnyat (ugyanúgy, mint az üzemanyag).',
        uni: 'A szárny alá szerelt hajtómű tolóerővonala a súlypont **alatt** van, ezért a tolóerő növelése **orrfelhúzó** nyomatékot ad; ezt a vezérlőrendszer kompenzálja. A hajtómű a szárny belépőéle **előtt** van, így a szárny **flatter** (aeroelasztikus lengés) elleni ellenállását is javítja (tömegkiegyensúlyozás). A tolóerő `F = ṁ·(v_ki − v₀)`; a nagy kétáramúságú hajtómű sok levegőt kicsit gyorsít, ami a **propulziós hatásfokot** `η_p = 2 / (1 + v_ki/v₀)` növeli.',
        fact: 'A Boeing 737 hajtóművei olyan közel vannak a betonhoz, hogy a nagyobb ventilátorú változatoknál a gondola alját **lelapították** („hörcsögpofa”), a 737 MAX-nál pedig meghosszabbították az orrfutót, hogy a még nagyobb hajtómű elférjen a szárny alatt.'
      },
      {
        id: 'futomu', z: 7, name: 'Futómű', svg: gear, explode: [0, 44], badge: B(17.7, 4.25, 0.57), en: 'landing gear (nose gear, main gear)',
        terms: ['mechanika/csillapitas', 'fizika-bsc/munkatetel'],
        what: 'A gép „lábai”: elöl az **orrfutó** két kerékkel (ezzel kormányozzák a gépet a földön), a szárnyak alatt a két **főfutó** egyenként két kerékkel, ezek viselik a súly nagyobbik részét és fékeznek. Felszállás után a futók **behúzódnak** a törzsbe (a főfutók a has alá), hogy ne okozzanak légellenállást. (A túloldali főfutó a rajzon a törzs mögött van.)',
        madeOf: 'A futószár nagy szilárdságú **acélból** vagy titánból készül, benne **olaj–nitrogén** (olajpneumatikus) lengéscsillapító. A kerekek gumiabroncsait **nitrogénnel** töltik, kb. 13–14 bar nyomásra; a fékek **szénszálas** vagy acél tárcsás fékek.',
        how: 'A futószárakat kovácsolják és megmunkálják, majd hosszú tesztsorozatban (leejtési próbák) ellenőrzik. Földet éréskor a lengéscsillapító nyeli el az ütést, a gép pedig a **tolóerő-fordítóval**, a spoilerekkel és a kerékfékekkel lassul. A blokkolásgátló rendszer (mint az autóban az ABS) itt is működik.',
        uni: 'A futóművet kb. 3 m/s (10 láb/s) süllyedési sebességű földet érésre méretezik a legnagyobb leszállótömegnél: a lengéscsillapítónak kb. `½·m·v_z² ≈ ½·65 000·3² ≈ 290 kJ` energiát kell elnyelnie néhány tized másodperc alatt. A fékeknek ennél sokkal többet: egy megszakított felszállásnál `½·m·v² ≈ ½·78 000·75² ≈ 220 MJ` mozgási energiát kell hővé alakítani, a féktárcsák ilyenkor 1000 °C fölé is felmelegedhetnek. Az olajpneumatikus rugóstag a nitrogén politropikus összenyomásával rugózik, az olaj szűkítőnyíláson való átáramlásával csillapít.',
        fact: 'A Boeing 737 főfutóinak nincs ajtaja: repülés közben alulról **látszanak a kerekek** a törzs aljában. Így a gép könnyebb, és a légellenállás alig nő.'
      }
    ],
    uni: {
      text: 'Egyetemi szemmel a repülőgép a **repülésmechanika** (flight mechanics) és az **aerodinamika** iskolapéldája.\n\n**Felhajtóerő és ellenállás.** `L = ½·ρ·v²·S·C_L`, `D = ½·ρ·v²·S·C_D`, ahol a kis állásszögeknél `C_L ≈ C_Lα·(α − α₀)` (vékony profilelmélet: C_Lα ≈ 2π 1/rad, véges szárnyra kisebb). Az ellenállási poláris `C_D = C_D0 + C_L²/(π·A·e)`: az első tag a súrlódás és az alak, a második az **indukált ellenállás** (a szárnyvégi örvények „ára”). A legjobb siklószám ott van, ahol a két tag egyenlő: `(L/D)_max = ½·√(π·A·e / C_D0)`, A320-ra kb. 17–18.\n\n**Egyenes vonalú, egyenletes repülés.** L = m·g és T = D. Mivel ρ a magassággal csökken, ugyanahhoz a felhajtóerőhöz fent nagyobb valódi sebesség kell; az utazómagasságot a hajtómű, a szárny Mach-határa (hullámellenállás) és az átesés közötti „koporsósarok” szabja meg. Kis sebességnél a **fékszárnyak** növelik `C_L,max`-ot, így csökken az átesési sebesség `V_s = √(2mg / (ρ·S·C_L,max))`.\n\n**Hatótáv.** A Breguet-egyenlet `R = (V/(g·c_T))·(L/D)·ln(m₀/m₁)` mutatja a három „kart”: hajtóműhatásfok (c_T), aerodinamika (L/D) és szerkezeti tömeg (m₁).\n\n**Stabilitás.** Hosszirányban a súlypontnak a semleges pont előtt kell lennie (`C_mα < 0`); a statikus tartalék tipikusan 5–20% MAC. Irányban a függőleges vezérsík adja a `C_nβ > 0` szélzászló-hatást, oldalirányban a szárny **V-állása** és nyilazása a `C_lβ < 0` bedöntés-helyreállítást. A dinamikus módusok: rövid periódus, fugoid, holland orsó (dutch roll, ezt a legyezéscsillapító – yaw damper – csillapítja), orsózási és spirálmódus.\n\n**Szerkezet.** A törzs nyomástartó vékony héj (`σ = Δp·r/t`), a szárny konzolos tartó; a méretezést a kifáradás, a kártűrés és az aeroelasztikus jelenségek (flatter, csűrőreverzió) határozzák meg. A tanúsítási terhelés a határterhelés (limit load) 1,5-szöröse (ultimate load).',
      terms: ['e-mobilitas/legellenallas', 'fizika-bsc/impulzus', 'mechanika/sulypont', 'mechanika/nyomatek', 'mechanika/hajlitonyomatek', 'mechanika/feszultseg', 'mechanika/faradas', 'mechanika/csillapitas', 'szabalyozas/visszacsatolas', 'szabalyozas/stabilitas']
    },
    steps: [
      { icon: '✏️', title: 'Tervezés, szélcsatorna, számítógépes áramlástan', when: 'kb. 5–8 évvel a beállítás előtt', text: 'A mérnökök először a **feladatból** indulnak ki: hány utas, milyen távolság, milyen kifutók. Ebből adódik a **szárny mérete**, a hajtómű tolóereje és a törzs hossza. A szárnyprofilt és a gép alakját **CFD**-vel (számítógépes áramlásszimulációval) és **szélcsatornában** méretarányos modelleken finomítják.', parts: ['szarny', 'torzs'] },
      { icon: '🧱', title: 'Törzsszekciók gyártása', text: 'A törzset darabokban, **szekciókban** gyártják: keretek, sztringerek és alumíniumlemezek szegecselésével. Az Airbusnál ez Hamburgban és Saint-Nazaire-ben történik. Ide kerülnek a **padlógerendák**, a raktér bélése, a pilótafülke váza és a kábelkötegek egy része is.', parts: ['torzs', 'pilotafulke', 'rakter'] },
      { icon: '🪽', title: 'Szárnyak: szárnyszekrény, tartályok, mozgó lapok', text: 'A szárnyszekrényt **főtartókból**, bordákból és egy darabból mart borítólemezekből építik meg (Airbus: Broughton, Wales). A belsejét **tömítik**: ez lesz az **üzemanyagtartály**. Ezután szerelik fel az orrsegédszárnyakat, a **fékszárnyakat**, a spoilereket és a **csűrőket**.', parts: ['szarny', 'uzemanyag', 'fekszarny', 'csuro'] },
      { icon: '🎯', title: 'Vezérsíkok és kormánylapok', text: 'A függőleges vezérsík **szénszálas kompozitból**, autoklávban készül, a vízszintes vezérsík Spanyolországban. Felszerelik rájuk az **oldalkormányt** és a **magassági kormányt**, valamint a működtető hidraulikát.', parts: ['fuggoleges', 'oldalkormany', 'vizszintes', 'magassagi'] },
      { icon: '✈️', title: 'Végső összeszerelés: „egybeházasítás”', text: 'A darabokat (sokszor a Beluga szállítógéppel) a **végső összeszerelő sorra** viszik (Toulouse, Hamburg, Tiencsin, Mobile). Összeillesztik a törzsszekciókat, hozzáillesztik a **szárnyakat** a középső szárnyszekrényhez, felszerelik a vezérsíkokat és a **futóművet**. Ettől a géptől már a saját kerekein gurul tovább.', parts: ['torzs', 'szarny', 'futomu', 'fuggoleges', 'vizszintes'] },
      { icon: '🔌', title: 'Rendszerek, hajtóművek, kabin', text: 'Bekötik a kábeleket, a hidraulikát, az üzemanyag- és légkondicionáló rendszert, felfüggesztik a **hajtóműveket** a pilonokra, és beszerelik a **kabin** berendezését: üléseket, konyhákat, mosdókat, csomagtartókat. Minden rendszert külön, majd együtt is tesztelnek.', parts: ['hajtomu', 'utaster', 'pilotafulke'] },
      { icon: '🎨', title: 'Festés, földi és repülési próbák, átadás', text: 'A gépet a légitársaság színeire **festik** (kb. 200–300 kg festék), majd földi próbák (hajtóművek, kormánylapok, futómű) után a gyári pilóták **berepülik**. A végén a vevő pilótái is kipróbálják, és a gép átrepül a légitársasághoz. Egy keskeny törzsű gép végső összeszerelése néhány hét alatt elkészül.', parts: ['torzs', 'szarny', 'hajtomu', 'futomu'] }
    ],
    history: [
      { year: '1903', text: 'Wilbur és Orville **Wright** az amerikai Kitty Hawkban végrehajtja az első irányított, motoros repülést: 12 másodperc, 37 méter. A gépet a szárny elcsavarásával és egy elülső magassági kormánnyal irányították.' },
      { year: '1910', text: '**Adorján János** a budapesti Rákosmezőn felszáll saját építésű **Libelle** (Szitakötő) nevű gépével: ezt tartják az első sikeres magyar építésű repülőgépnek (a pontos első repülés dátumáról a források eltérnek).' },
      { year: '1914', text: 'Floridában (St. Petersburg – Tampa) elindul a világ első **menetrend szerinti utasszállító** légijárata egy kis repülőcsónakkal, egyszerre egy utassal.' },
      { year: '1936', text: 'Szolgálatba áll a **Douglas DC-3**: az első gép, amellyel a légitársaságok csak utasszállításból is nyereségesek lehettek. Fémépítésű, behúzható futóműves, több mint 16 000 darab készült belőle (katonai változatokkal).' },
      { year: '1952', text: 'A brit **de Havilland Comet** az első **sugárhajtású utasszállító** a menetrend szerinti forgalomban. 1954-es baleseteiből (fáradásos repedések a nyílások sarkainál) tanulta meg a világ a túlnyomásos törzsek tervezését.' },
      { year: '1958', text: 'A **Boeing 707** szolgálatba állásával indul a sugárhajtású utazás „aranykora”: az Atlanti-óceán átrepülése néhány órára rövidül.' },
      { year: '1970', text: 'Szolgálatba áll a **Boeing 747** „Jumbo Jet”, az első szélestörzsű utasszállító (első repülése 1969). 1976-ban a hangsebesség kétszeresével repülő **Concorde** is megkezdi a menetrend szerinti járatokat.' },
      { year: '1988', text: 'Szolgálatba áll az **Airbus A320** (első repülés: 1987), az első digitális **fly-by-wire** utasszállító. Az A320-as család és a Boeing 737 együtt ma a világ utasszállító flottájának legnagyobb részét adja.' },
      { year: '2009–2013', text: 'Felszáll a **Boeing 787** (2009) és az **Airbus A350** (2013): törzsük és szárnyuk nagy része már **szénszálas kompozit**, ami könnyebb és nem fárad úgy, mint az alumínium.' }
    ],
    quiz: [
      { q: 'Mire való a csűrő?', options: ['A gép bedöntésére (orsózás a hossztengely körül)', 'Az orr fel-le mozgatására', 'Az orr jobbra-balra fordítására', 'A gép fékezésére a földön'], answer: 0, explain: 'A két szárny csűrője ellentétesen tér ki: az egyik oldalon nő, a másikon csökken a felhajtóerő, így a gép bedől.' },
      { q: 'Miért engedik ki a fékszárnyakat leszállás előtt?', options: ['Hogy kisebb sebességnél is elég legyen a felhajtóerő', 'Hogy a gép gyorsabban repüljön', 'Hogy kevesebb üzemanyag fogyjon', 'Hogy a hajtómű hűvösebb legyen'], answer: 0, explain: 'A kiengedett fékszárny nagyobb és ívesebb szárnyat ad, nő a legnagyobb felhajtóerő-tényező, csökken az átesési sebesség.' },
      { q: 'Hol tárolja egy utasszállító az üzemanyag nagy részét?', options: ['A szárnyakban', 'A farokban', 'A pilótafülke alatt', 'A hajtóművekben'], answer: 0, explain: 'A szárnyszekrény belsejét tömítik, az a tartály; emellett a törzs alatt van egy középtartály.' },
      { q: 'Ha egy repülőgép sebessége kétszeresére nő (minden más változatlan), hányszorosára nő a felhajtóerő?', options: ['Négyszeresére', 'Kétszeresére', 'Nyolcszorosára', 'Nem változik'], answer: 0, explain: 'L = ½·ρ·v²·S·C_L: a felhajtóerő a sebesség négyzetével arányos.' },
      { q: 'Mi a függőleges vezérsík legfontosabb feladata?', options: ['Iránystabilitás: mint a szélzászló, menetirányba fordítja a gépet', 'Felhajtóerőt termel', 'Üzemanyagot tárol', 'Fékezi a gépet leszálláskor'], answer: 0, explain: 'Ha az orr oldalra fordul, az oldalról érkező levegő a vezérsíkot visszanyomja.' }
    ]
  });
})();
