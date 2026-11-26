/* Modell: Robotporszívó (LiDAR-os) dokkolóval – izometrikus nézet, átlátszó fedéllel.
 * A robot eleje a bal alsó irányba néz (világ +y), a dokkoló mögötte, jobbra fent áll. */
(function () {
  var K = 5.6, OX = 400, OY = 352;
  var I = STUDIE.draw.iso(OX, OY, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  var EDGE = ' stroke="rgba(0,0,0,.3)" stroke-width="0.8" stroke-linejoin="round"';
  function f1(n) { return (+n).toFixed(1); }
  function P(p) { return f1(p[0]) + ',' + f1(p[1]); }
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  function deg(a) { return a * Math.PI / 180; }
  function planeZ(z, inner, extra) {   // vízszintes sík: u = x, v = y
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + (-0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + OX + ',' + f1(OY - z * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function planeY(y, inner, extra) {   // y = állandó sík: u = x, v = −z
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',0,' + K + ',' + f1(OX - y * 0.866 * K) + ',' + f1(OY + y * 0.5 * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function tbox(x, y, z, w, d, h, hex, op, extra) { return '<g opacity="' + op + '">' + I.box(x, y, z, w, d, h, hex, extra) + '</g>'; }
  /* Álló henger (tetszőleges középponttal): látható palást + tetőellipszis. */
  function disc(cx, cy, z, r, h, color, topFill, topExtra) {
    var c = I.pt(cx, cy, z), t = I.pt(cx, cy, z + h), rx = r * 1.2247 * K, ry = r * 0.7071 * K;
    return '<path d="M' + f1(c[0] - rx) + ' ' + f1(c[1]) + ' A' + f1(rx) + ' ' + f1(ry) + ' 0 0 0 ' + f1(c[0] + rx) + ' ' + f1(c[1]) +
      ' L' + f1(t[0] + rx) + ' ' + f1(t[1]) + ' L' + f1(t[0] - rx) + ' ' + f1(t[1]) + ' Z" fill="' + shade(color, 0.76) + '"' + EDGE + '/>' +
      '<ellipse cx="' + f1(t[0]) + '" cy="' + f1(t[1]) + '" rx="' + f1(rx) + '" ry="' + f1(ry) + '" fill="' + (topFill || color) + '"' + (topExtra || EDGE) + '/>';
  }
  function arcPts(cx, cy, r, a0, a1, z, n) {
    var pts = [];
    for (var i = 0; i <= n; i++) { var a = deg(a0 + (a1 - a0) * i / n); pts.push(I.pt(cx + r * Math.cos(a), cy + r * Math.sin(a), z)); }
    return pts;
  }
  /* Hengerfal-szelet (csak a látható, a néző felé forduló rész) + gyűrű alakú tető. */
  function ringWall(r0, r1, a0, a1, z0, z1, color) {
    var lo = Math.max(a0, -45), hi = Math.min(a1, 135), s = '';
    if (hi > lo) {
      var n = Math.ceil((hi - lo) / 6);
      for (var i = 0; i < n; i++) {
        var b0 = lo + (hi - lo) * i / n, b1 = lo + (hi - lo) * (i + 1) / n, m = deg((b0 + b1) / 2);
        var col = shade(color, 0.66 + 0.24 * (Math.cos(m) + Math.sin(m)) / 1.414);
        s += I.poly(arcPts(0, 0, r1, b0, b1, z0, 1).concat(arcPts(0, 0, r1, b1, b0, z1, 1)), col, ' stroke="' + col + '" stroke-width="0.6"');
      }
    }
    var n2 = Math.ceil((a1 - a0) / 5);
    return s + I.poly(arcPts(0, 0, r1, a0, a1, z1, n2).concat(arcPts(0, 0, r0, a1, a0, z1, n2)), color, EDGE);
  }
  /* Fekvő henger x tengellyel (kerék, kefehenger). */
  function cylX(cx, cy, cz, r, len, color, capColor) {
    var n = 24, s = '', i;
    function q(a, t) { return I.pt(cx + t, cy + r * Math.cos(a), cz + r * Math.sin(a)); }
    for (i = 0; i < n; i++) {
      var a0 = i / n * 2 * Math.PI, a1 = (i + 1) / n * 2 * Math.PI, m = (a0 + a1) / 2, f = Math.cos(m) + Math.sin(m);
      if (f <= -0.2) continue;
      var c = shade(color, 0.6 + 0.32 * (f + 0.2) / 1.62);
      s += '<polygon points="' + [q(a0, 0), q(a1, 0), q(a1, len), q(a0, len)].map(P).join(' ') + '" fill="' + c + '" stroke="' + c + '" stroke-width="0.5"/>';
    }
    var cap = [];
    for (i = 0; i < n; i++) cap.push(q(i / n * 2 * Math.PI, len));
    return s + '<polygon points="' + cap.map(P).join(' ') + '" fill="' + (capColor || shade(color, 1.08)) + '" stroke="rgba(0,0,0,.4)" stroke-width="0.7"/>';
  }
  function xDisc(cx, cy, cz, r, n) {
    var pts = [];
    for (var i = 0; i < (n || 24); i++) { var a = i / (n || 24) * 2 * Math.PI; pts.push(I.pt(cx, cy + r * Math.cos(a), cz + r * Math.sin(a))); }
    return pts;
  }

  var R = 17;   // a robot sugara (cm)
  var defs = '<defs>' +
    '<linearGradient id="rp-cover" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6f9" stop-opacity=".42"/><stop offset="1" stop-color="#c9d2dc" stop-opacity=".22"/></linearGradient>' +
    '<radialGradient id="rp-lidar" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#6d7684"/><stop offset="1" stop-color="#1c2027"/></radialGradient>' +
    '<linearGradient id="rp-beam" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#ff3b30" stop-opacity=".85"/><stop offset="1" stop-color="#ff3b30" stop-opacity="0"/></linearGradient>' +
    '<pattern id="rp-pleat" patternUnits="userSpaceOnUse" width="1.2" height="1.2"><rect width="1.2" height="1.2" fill="#eef3f8"/><rect width=".45" height="1.2" fill="#b9c7d6"/></pattern>' +
    '</defs>';
  var floorC = I.pt(0, -4, 0);
  var backdrop = defs +
    '<text class="lbl" x="14" y="26" font-size="17">Robotporszívó dokkolóval</text>' +
    '<text class="lbl-muted" x="14" y="44">átlátszó fedéllel, mögötte a töltő dokkoló</text>' +
    '<ellipse cx="' + f1(floorC[0]) + '" cy="' + f1(floorC[1] + 8) + '" rx="' + f1(25 * 1.2247 * K) + '" ry="' + f1(25 * 0.7071 * K) + '" fill="rgba(0,0,0,.05)"' + NS + '/>';

  /* ---------- Alváz ---------- */
  var chassis = disc(0, 0, 0.7, R, 1.7, '#3d434c', '#4a515b');
  chassis += planeZ(2.42,
    '<rect x="-9.4" y="6.6" width="18.8" height="4.8" rx="1.6" fill="#1b1f25"/>' +          // főkefe nyílása
    '<rect x="-15.6" y="-4.8" width="3.6" height="7.6" rx="1" fill="#1b1f25"/><rect x="12" y="-4.8" width="3.6" height="7.6" rx="1" fill="#1b1f25"/>' +   // kerékdobok
    '<circle cx="0" cy="13.2" r="1.9" fill="#1b1f25"/>' +
    [[-12, 9], [12, -11], [-12, -11], [4, -14], [-4, 13.5]].map(function (s) { return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r=".45" fill="#2a2f36" stroke="#6b7480" stroke-width=".2"/>'; }).join('') +
    '<path d="M-6 -6 L-9 -8" stroke="#6b7480" stroke-width=".3"/>', NS);
  // töltőérintkező lapok a robot hátulján (az alvázon)
  [-3.5, 3.5].forEach(function (x) { chassis += I.box(x - 1.2, -17.1, 0.9, 2.4, 0.6, 1.1, '#d8b25a'); });

  /* ---------- Kerekek (két hajtott kerék rugós felfüggesztéssel + elöl bolygókerék) ---------- */
  function wheel(x0) {
    var s = cylX(x0, -1, 3.6, 3.6, 2.6, '#22262c', '#2d323a');
    s += I.poly(xDisc(x0 + 2.65, -1, 3.6, 2.2), '#9aa3ae', ' stroke="#5d6672" stroke-width=".6"') + I.poly(xDisc(x0 + 2.7, -1, 3.6, 0.8), '#5d6672', ' stroke="none"');
    for (var t = 0; t < 12; t++) {   // futófelület bordái
      var a = deg(t * 30 + 10); if (Math.cos(a) + Math.sin(a) < 0) continue;
      var p = I.pt(x0 + 0.2, -1 + 3.62 * Math.cos(a), 3.6 + 3.62 * Math.sin(a)), q = I.pt(x0 + 2.4, -1 + 3.62 * Math.cos(a), 3.6 + 3.62 * Math.sin(a));
      s += '<line x1="' + f1(p[0]) + '" y1="' + f1(p[1]) + '" x2="' + f1(q[0]) + '" y2="' + f1(q[1]) + '" stroke="#454c56" stroke-width="1.1"' + NS + '/>';
    }
    return s;
  }
  var wheels = wheel(-15.2) + wheel(12.6);
  wheels += disc(0, 13.2, 0, 1.3, 0.6, '#2b3038') + cylX(-0.6, 13.2, 1.3, 1.25, 1.2, '#2d323a', '#7d8792');

  /* ---------- Motorok: két hajtómű a kerekek mellett + szívómotor (ventilátor) ---------- */
  var mot = '';
  [[-12.2, 1], [8.2, 1]].forEach(function (m) {
    mot += I.box(m[0], -3.4, 2.4, 4, 5, 3.2, '#5b6573') + cylX(m[0] + (m[1] > 0 ? 0 : 0), 2.4, 4.2, 1.5, 4, '#b7bfca', '#d0d6de');
  });
  mot += I.box(-12.2, -3.4, 5.6, 4, 5, 0.4, '#e0a43a') + I.box(8.2, -3.4, 5.6, 4, 5, 0.4, '#e0a43a');
  // szívómotor csigaházzal a portartály bal oldalán
  mot += I.box(-14.2, -12.6, 2.4, 6, 6, 4.4, '#4a5260') + disc(-11.2, -9.6, 6.8, 2.4, 1.2, '#6b7584', '#7f8998');
  mot += planeZ(8.02, (function () { var s = '<circle cx="-11.2" cy="-9.6" r="1.9" fill="#2b3038"/>'; for (var i = 0; i < 9; i++) { var a = i * 40 * Math.PI / 180; s += '<path d="M' + f1(-11.2 + 0.5 * Math.cos(a)) + ' ' + f1(-9.6 + 0.5 * Math.sin(a)) + ' Q' + f1(-11.2 + 1.4 * Math.cos(a + 0.5)) + ' ' + f1(-9.6 + 1.4 * Math.sin(a + 0.5)) + ' ' + f1(-11.2 + 1.85 * Math.cos(a + 0.9)) + ' ' + f1(-9.6 + 1.85 * Math.sin(a + 0.9)) + '" stroke="#c3ccd6" stroke-width=".25" fill="none"/>'; } return s + '<circle cx="-11.2" cy="-9.6" r=".45" fill="#c3ccd6"/>'; })(), NS);
  mot += I.box(-8.4, -11.6, 3.2, 1.6, 3.2, 2.2, '#4a5260');   // légcsatorna a portartály felé

  /* ---------- Akkumulátor (4 cellás Li-ion csomag) ---------- */
  var bat = I.box(-7, -5, 2.4, 14, 11, 3.2, '#2f5d9e');
  bat += planeZ(5.62, '<rect x="-6.2" y="-4.2" width="12.4" height="9.4" rx=".6" fill="#3a6db3" stroke="#24497d" stroke-width=".2"/>' +
    '<rect x="-5.4" y="-3.4" width="10.8" height="2.4" rx=".3" fill="#f5a524"/>' +
    '<text x="0" y="-1.65" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="1.7" fill="#3a2a00">Li-ion</text>' +
    '<text x="0" y="1.2" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="1.5" fill="#fff">14,4 V</text>' +
    '<text x="0" y="3.4" text-anchor="middle" font-family="sans-serif" font-size="1.3" fill="#dfe9f7">5200 mAh</text>', NS);
  // a csomag elején a négy hengeres cella végei látszanak
  [-4.6, -1.6, 1.4, 4.4].forEach(function (cx) { var pts = []; for (var k = 0; k < 16; k++) { var a = k / 16 * 2 * Math.PI; pts.push(I.pt(cx + 1.25 * Math.cos(a), 6.03, 4 + 1.25 * Math.sin(a))); } bat += I.poly(pts, '#9fb3c9', ' stroke="#24497d" stroke-width=".6"' + NS); });

  /* ---------- Vezérlőpanel (alaplap) ---------- */
  var board = I.box(-10, -6.4, 6.0, 20, 10.4, 0.45, '#2f7d4f');
  board += planeZ(6.47,
    '<path d="M-8 -5 L-8 2 M-4 -5.4 L6 -5.4 M2 -3 L9 -3 M-9 3 L8 3" stroke="#d6b45a" stroke-width=".18" stroke-opacity=".8" fill="none"/>', NS);
  board += I.box(-3, -2.8, 6.45, 4.6, 4.6, 0.7, '#22262c') + planeZ(7.17, '<text x="-.7" y="-.2" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size="1.2" fill="#c9ced6">SoC</text>', NS);
  board += I.box(-8.5, -4.8, 6.45, 3, 3, 0.6, '#22262c') + planeZ(7.07, '<text x="-7" y="-3.3" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size=".9" fill="#c9ced6">MCU</text>', NS);
  board += I.box(-8.6, 0.2, 6.45, 1.6, 1.6, 0.4, '#30343d');   // IMU (giroszkóp)
  board += I.box(3, -5.6, 6.45, 2.4, 2.4, 0.5, '#30343d') + I.box(6.2, -5.6, 6.45, 2.4, 2.4, 0.5, '#30343d');   // motormeghajtók
  board += I.box(-1, 2.6, 6.45, 6, 1.2, 1.2, '#e9e3cf');   // csatlakozó
  [[8.6, 1.6], [8.6, -0.8]].forEach(function (c) { board += disc(c[0], c[1], 6.45, 0.8, 1.4, '#2a5fa8'); });

  /* ---------- Wi-Fi modul ---------- */
  var wifi = I.box(3.2, -2.6, 6.45, 4.4, 4, 0.3, '#1f6f8b') + I.box(3.5, -2.3, 6.75, 2.6, 2.6, 0.55, '#c9cfd6');
  wifi += planeZ(7.32, '<text x="4.8" y="-1" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="800" font-size=".75" fill="#5d6672">Wi-Fi</text>', NS);
  wifi += planeZ(6.77, '<path d="M6.5 -2.3 v.6 h.6 v-.6 h.3 v.6 h.3 v2.6" stroke="#e2b45c" stroke-width=".22" fill="none"/>', NS);
  // rádióhullámok
  var wc = I.pt(7.2, -2, 7.6);
  wifi += '<g' + NS + ' fill="none" stroke="#1f9bd1" stroke-width="1.6" stroke-linecap="round" opacity=".8">' + [9, 15, 21].map(function (r) {
    return '<path d="M' + f1(wc[0] + r * 0.7) + ' ' + f1(wc[1] - r * 0.7) + ' A' + r + ' ' + r + ' 0 0 0 ' + f1(wc[0] - r * 0.7) + ' ' + f1(wc[1] - r * 0.7) + '"/>';
  }).join('') + '</g>';

  /* ---------- Portartály HEPA-szűrővel ---------- */
  var binC = '#59616e';
  var bin = I.box(-7, -16, 2.4, 14, 8.6, 5.8, binC);
  bin += '<g opacity=".55">' + I.poly([I.pt(-6, -7.38, 3), I.pt(5.5, -7.38, 3), I.pt(5.5, -7.38, 7.6), I.pt(-6, -7.38, 7.6)], '#c7d3df', ' stroke="none"') + '</g>';
  [[-4, 3.8], [-2.6, 4.3], [-1, 3.6], [1.2, 4.1], [3, 3.6], [-3.2, 4.9], [0.4, 4.7], [2.2, 5.0], [4.4, 4.2]].forEach(function (d, i) {
    var p = I.pt(d[0], -7.36, d[1]); bin += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="' + (1.3 + (i % 3) * 0.5) + '" fill="#8a8f98"' + NS + '/>';
  });
  bin += planeZ(8.22, '<rect x="-5.8" y="-15" width="11.6" height="5.6" rx=".5" fill="url(#rp-pleat)" stroke="#8a9bb0" stroke-width=".25"/>' +
    '<text x="0" y="-8.4" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="1.2" fill="#e6ebf1">HEPA</text>', NS);
  bin += I.box(-1.6, -8, 6.6, 3.2, 0.8, 1, '#3a414b');   // nyitófül

  /* ---------- Főkefe (gumilapátos hengerkefe) ---------- */
  var brush = cylX(-9.2, 9, 2.6, 2.1, 18.4, '#e1e5ea', '#9aa3ae');
  for (var bk = 0; bk < 6; bk++) {   // V alakú gumilapátok
    var bx = -8 + bk * 3.1;
    var p1 = I.pt(bx, 9 + 2.1 * Math.cos(deg(70)), 2.6 + 2.1 * Math.sin(deg(70))), p2 = I.pt(bx + 1.5, 9 + 2.1 * Math.cos(deg(5)), 2.6 + 2.1 * Math.sin(deg(5))),
      p3 = I.pt(bx + 3, 9 + 2.1 * Math.cos(deg(70)), 2.6 + 2.1 * Math.sin(deg(70)));
    brush += '<path d="M' + P(p1) + ' L' + P(p2) + ' L' + P(p3) + '" fill="none" stroke="#3f8f5a" stroke-width="1.6" stroke-linejoin="round"/>';
  }
  brush += I.box(9.2, 7.4, 1.4, 1.6, 3.2, 2.6, '#4a5260');   // meghajtás

  /* ---------- Oldalkefe ---------- */
  var SB = [10.4, 11.6];
  var side = planeZ(0.45, (function () {
    var s = '';
    for (var i = 0; i < 3; i++) {
      var a = deg(i * 120 + 25);
      for (var k = -2; k <= 2; k++) {
        var aa = a + k * 0.06, L = 8.2;
        s += '<line x1="' + f1(SB[0] + 0.8 * Math.cos(a)) + '" y1="' + f1(SB[1] + 0.8 * Math.sin(a)) + '" x2="' + f1(SB[0] + L * Math.cos(aa)) + '" y2="' + f1(SB[1] + L * Math.sin(aa)) + '" stroke="' + (k % 2 ? '#3a8ed6' : '#2468a8') + '" stroke-width=".32" stroke-linecap="round"/>';
      }
      s += '<line x1="' + SB[0] + '" y1="' + SB[1] + '" x2="' + f1(SB[0] + 2.4 * Math.cos(a)) + '" y2="' + f1(SB[1] + 2.4 * Math.sin(a)) + '" stroke="#2b3038" stroke-width="1"/>';
    }
    return '<g stroke="transparent">' + s + '</g><circle cx="' + SB[0] + '" cy="' + SB[1] + '" r="1.3" fill="#2b3038"/>';
  })());
  side += disc(SB[0], SB[1], 2.4, 1.3, 1.8, '#5b6573');   // kis motor a tengely fölött

  /* ---------- Leesésérzékelők (cliff szenzorok) ---------- */
  var cliff = '';
  [70, 100, 130, -25, 205].forEach(function (a) {
    var x = 14.6 * Math.cos(deg(a)), y = 14.6 * Math.sin(deg(a));
    cliff += I.box(x - 1.1, y - 1.1, 2.4, 2.2, 2.2, 1.2, '#1f242b');
    var e = I.pt(x, y, 3.62);
    cliff += '<circle cx="' + f1(e[0] - 2.2) + '" cy="' + f1(e[1]) + '" r="1.6" fill="#ff4d3d"/><circle cx="' + f1(e[0] + 2.2) + '" cy="' + f1(e[1]) + '" r="1.6" fill="#8fd0ff"/>';
  });
  // a lefelé néző infravörös sugár az elülső szenzor alatt
  var cf = I.pt(14.6 * Math.cos(deg(100)), 14.6 * Math.sin(deg(100)), 0.7), cf0 = I.pt(14.6 * Math.cos(deg(100)), 14.6 * Math.sin(deg(100)), -2.6);
  cliff += '<path d="M' + f1(cf[0] - 3) + ' ' + f1(cf[1]) + ' L' + f1(cf0[0]) + ' ' + f1(cf0[1]) + ' L' + f1(cf[0] + 3) + ' ' + f1(cf[1]) + '" fill="rgba(255,77,61,.25)" stroke="#ff4d3d" stroke-width=".8" stroke-dasharray="2 1.5"' + NS + '/>';

  /* ---------- Ütközésérzékelő: első lökhárító + mikrokapcsolók ---------- */
  var bump = '';
  [[-9.5, 13], [9.5, 13]].forEach(function (s) { bump += I.box(s[0] - 1, s[1] - 1, 2.4, 2, 1.6, 1.4, '#c33d2f') + I.box(s[0] - 0.4, s[1] + 0.6, 3.2, 0.8, 0.8, 0.5, '#2a2f36'); });
  bump += ringWall(16.9, 17.8, 15, 165, 1.2, 8.3, '#e9ecf0');
  bump += I.poly(arcPts(0, 0, 17.82, 15, 135, 4.2, 20).concat(arcPts(0, 0, 17.82, 135, 15, 6.0, 20)), '#1d2229', ' stroke="none"');   // sötét szenzorablak

  /* ---------- Felső fedél (átlátszó közepű) + gombok ---------- */
  var cover = '';
  cover += ringWall(0, R, -180, 180, 8.4, 9.5, '#f2f4f7').replace(/<polygon[^>]*fill="#f2f4f7"[^>]*\/>$/, '');
  var ct = I.pt(0, 0, 9.5);
  cover += '<ellipse cx="' + f1(ct[0]) + '" cy="' + f1(ct[1]) + '" rx="' + f1(R * 1.2247 * K) + '" ry="' + f1(R * 0.7071 * K) + '" fill="url(#rp-cover)" stroke="#9aa6b5" stroke-width="1"' + NS + '/>';
  cover += '<path d="' + (function () {
    var o = arcPts(0, 0, R, 0, 360, 9.5, 60), i = arcPts(0, 0, 14.8, 360, 0, 9.5, 60);
    return 'M' + o.map(P).join(' L') + ' Z M' + i.map(P).join(' L') + ' Z';
  })() + '" fill="#f2f4f7" fill-opacity=".92" fill-rule="evenodd" stroke="#aab4c0" stroke-width=".8"/>';
  cover += planeZ(9.52, '<ellipse cx="0" cy="-11.2" rx="7.6" ry="4.4" fill="none" stroke="#aab4c0" stroke-width=".25" stroke-dasharray=".8 .5"/>', NS);   // portartály-fedél vonala
  cover += disc(-2.2, 8.4, 9.5, 1.3, 0.4, '#d9dee5') + disc(2.2, 8.4, 9.5, 1.3, 0.4, '#d9dee5');
  cover += planeZ(9.92, '<circle cx="-2.2" cy="8.4" r=".55" fill="none" stroke="#2f9e6a" stroke-width=".22"/><path d="M2.2 7.9 l.6 .5 v.6 h-1.2 v-.6 z" fill="#5d6672"/>', NS);

  /* ---------- LiDAR (lézeres távolságmérő torony) ---------- */
  var LC = [0, -3];
  var lidar = disc(LC[0], LC[1], 9.5, 4.6, 0.9, '#2d323a') + disc(LC[0], LC[1], 10.4, 4.0, 2.3, '#3b424c', 'url(#rp-lidar)');
  var lw = [];
  for (var la = 40; la <= 110; la += 5) lw.push(I.pt(LC[0] + 4.02 * Math.cos(deg(la)), LC[1] + 4.02 * Math.sin(deg(la)), 11.2));
  for (la = 110; la >= 40; la -= 5) lw.push(I.pt(LC[0] + 4.02 * Math.cos(deg(la)), LC[1] + 4.02 * Math.sin(deg(la)), 12.2));
  lidar += I.poly(lw, '#7a1410', ' stroke="#3a0806" stroke-width=".5"');
  // lézersugár és visszavert pontok a falon (díszítés)
  var lo = I.pt(LC[0] + 3.2 * Math.cos(deg(80)), LC[1] + 3.2 * Math.sin(deg(80)), 11.7), lt = I.pt(-5, 30, 11.7);
  lidar += '<path d="M' + P(lo) + ' L' + P(lt) + '" stroke="url(#rp-beam)" stroke-width="1.6"' + NS + '/>';
  lidar += '<circle cx="' + f1(lt[0]) + '" cy="' + f1(lt[1]) + '" r="2.4" fill="#ff3b30" opacity=".6"' + NS + '/>';

  /* ---------- Dokkoló töltőállomás ---------- */
  var dock = I.box(-12, -30, 0, 24, 9, 0.8, '#e3e7ec') + I.box(-12, -35, 0, 24, 5, 12.5, '#f1f3f6');
  dock += planeY(-30.02, '<rect x="-7" y="-10.5" width="14" height="3.2" rx="1.6" fill="#1d2229"/>' +
    '<circle cx="-3" cy="-8.9" r=".7" fill="#7a1410"/><circle cx="3" cy="-8.9" r=".7" fill="#7a1410"/>', NS);
  dock += I.face(-1, -33.5, 12.52, 2, 2, '#30d158', ' stroke="none"');
  [-3.5, 3.5].forEach(function (x) { dock += I.box(x - 1.3, -25, 0.8, 2.6, 2.6, 0.5, '#d8b25a'); });
  var dcab = [[12, -33, 1], [17, -33, 1], [19, -37, 0]];
  dock += '<path d="M' + dcab.map(function (q) { return P(I.pt(q[0], q[1], q[2])); }).join(' L') + '" fill="none" stroke="#3a414b" stroke-width="2.2" stroke-linecap="round"/>';

  STUDIE.addModel({
    id: 'robotporszivo',
    title: 'Robotporszívó',
    icon: '🤖',
    color: '#2f9e6a',
    category: 'Háztartás',
    keywords: 'robotporszívó robot porszívó Roomba Roborock LiDAR lézer kamera SLAM térkép navigáció odometria giroszkóp IMU ütközésérzékelő lökhárító leesésérzékelő cliff szenzor infravörös oldalkefe főkefe portartály HEPA szűrő szívómotor kefe nélküli motor kerék akkumulátor Li-ion BMS dokkoló töltés Wi-Fi mikrokontroller PID',
    summary: 'Egy kerekeken guruló kis számítógép: lézerrel feltérképezi a lakást, kiszámolja, hol jár, és sávonként végigporszívózza a padlót, majd magától hazatalál a töltőre.',
    scale: 'kb. 35 cm átmérő, 10 cm magas, 3–4 kg',
    viewBox: '0 0 820 660',
    backdrop: backdrop,
    intro: 'A robotporszívó három dolgot csinál egyszerre: **takarít** (kefék, szívómotor, portartály), **közlekedik** (kerekek, motorok, akkumulátor) és **tájékozódik** (LiDAR, ütközés- és leesésérzékelők, giroszkóp). Az egészet egy **vezérlőpanel** fogja össze, amelyen egy kis számítógép fut.\n\nA tetején forgó **LiDAR** lézerrel körbe-körbe méri a falak és bútorok távolságát. Ebből és a kerekek elfordulásából a robot **térképet rajzol**, és közben folyamatosan kiszámolja, hol van rajta. Ezt hívják **SLAM**-nek. A térkép alapján rendezett, párhuzamos sávokban halad, nem össze-vissza. Ha lemerül, egyedül visszatalál a **dokkolóhoz**.',
    parts: [
      {
        id: 'fedel', z: 14, name: 'Felső fedél és gombok', svg: cover, explode: [0, -160], badge: B(-15, -4, 9.5), en: 'top cover with buttons',
        what: 'A robot teteje: védi a belső alkatrészeket, és rajta vannak a **gombok** (bekapcsolás, „haza a dokkolóra”) és a visszajelző LED. Alatta nyílik a **portartály** fedele. Mivel a robot bebújik az ágy és a kanapé alá, a fedél és a LiDAR együtt sem lehet magasabb kb. 10 cm-nél. A rajzon a fedél közepe átlátszó, hogy belelássunk.',
        madeOf: 'Ütésálló **ABS** vagy ABS–PC műanyag, gyakran fényes, karcálló bevonattal. A gombok szilikongumiból vagy műanyagból vannak, alattuk kis nyomógombok a panelon.',
        how: 'A fedelet acél **fröccsöntő szerszámban** készítik: a megolvasztott műanyagot nagy nyomással préselik a formába, ahol néhány másodperc alatt megszilárdul. A felületet festik vagy fóliázzák, a gombokat és a fényvezetőket bepattintják.',
        uni: 'A burkolat tervezésének két fő szempontja a **profilmagasság** (bútorok alá) és a **kerek forma**: kör alakú testnél, ha a robot a középpontja körül helyben fordul, a körvonala nem ér hozzá semmihez, amihez korábban nem ért. Így nem tud „beszorulni” egy sarokba (a D alakú robotok ezt a sarkok jobb kitakarításáért cserélik el bonyolultabb mozgásra).',
        fact: 'A robotok többsége azért kerek, mert így helyben megfordulva sosem akad el: a kör minden irányban ugyanakkora.'
      },
      {
        id: 'lidar', z: 15, name: 'LiDAR (lézeres távolságmérő)', svg: lidar, explode: [0, -225], badge: B(0, -3, 13), en: 'LiDAR / laser distance sensor (LDS)',
        terms: ['fizika-bsc/em-hullam', 'msc-iranyitas/kalman-szuro'],
        what: 'A tetején forgó kis „torony” a robot **szeme**. Egy láthatatlan infravörös **lézersugarat** küld ki, és méri, milyen messze van, amibe beleütközik. Közben másodpercenként többször körbefordul, így minden irányban kirajzolja a falak és bútorok körvonalát. Ebből készül a lakás **térképe**. Sötétben is működik, mert saját fényt használ.',
        madeOf: '**Lézerdióda** (kb. 785–905 nm-es infravörös), lencsék, egy **fényérzékelő** (CMOS-sor vagy fotodióda), kis motor a forgatáshoz és vezeték nélküli vagy csúszógyűrűs áramátvitel a forgó részre. Egyes robotok LiDAR helyett vagy mellett **kamerát** használnak.',
        how: 'A lézert, a lencséket és az érzékelőt nagy pontossággal egy tartóba ragasztják, majd minden egyes modult **kalibrálnak**: ismert távolságú céltáblákra mérnek vele, és eltárolják a javítási értékeket.',
        uni: 'Az olcsóbb LDS-ek **lézeres háromszögelést** (triangulációt) használnak: a lézerfolt képe az érzékelőn a távolsággal elmozdul, `d ≈ f · b / x` (f fókusztávolság, b bázistáv, x a folt helyzete), ezért a hiba a távolság négyzetével nő. Drágább modulok **repülési időt** (ToF) mérnek: `d = c · Δt / 2`. Egy körülfordulás egy 2D **pontfelhő** (pásztázás); az egymást követő pásztázásokat **scan matching** (pl. ICP) illeszti össze, ebből adódik a robot elmozdulása.',
        fact: 'A lézeres navigációt 2010-ben a Neato XV-11 hozta be a háztartási robotporszívókba; ma már szinte minden középkategóriás robotban van.'
      },
      {
        id: 'utkozes', z: 12, name: 'Ütközésérzékelő (lökhárító)', svg: bump, explode: [-208, 110], badge: B(-7, 16.2, 5.5), en: 'bumper with bump switches',
        what: 'A robot eleje egy rugózó **lökhárító**. Ha nekimegy valaminek, a lökhárító kicsit benyomódik, és megnyom egy-két **mikrokapcsolót** mögötte. A robot ebből tudja, hogy akadályba ütközött, és azt is, melyik oldalon (bal vagy jobb kapcsoló). A sötét ablak mögött gyakran infravörös közelség- vagy falkövető érzékelő is van.',
        madeOf: 'Rugalmas **ABS** műanyag ív puha gumicsíkkal (hogy ne karcolja a bútort), mögötte rugók és két **mikrokapcsoló** vagy fénykapus (optikai) érzékelő.',
        how: 'A lökhárítót fröccsöntik, és úgy szerelik fel, hogy néhány millimétert szabadon elmozdulhasson. A gyártósoron egy gép többször „megnyomja” minden irányból, és ellenőrzi, hogy a kapcsolók jeleznek-e.',
        uni: 'A mikrokapcsolók jelét a mikrovezérlő **megszakításként** (interrupt) kezeli, és a kapcsolók rezgését (pergését) szoftveresen szűri (debouncing). Az ütközés a navigációban **reaktív viselkedés**: azonnali megállás, hátrálás, elfordulás. A térképre a robot „virtuális akadályként” is bejegyezheti a nem látott tárgyat (pl. a LiDAR síkja alatti alacsony bútor).',
        fact: 'Az első Roomba (2002) szinte csak az ütközésérzékelőjével tájékozódott: véletlenszerű irányokba fordulva járta be a szobát.'
      },
      {
        id: 'vezerlo', z: 10, name: 'Vezérlőpanel (mikrokontroller, processzor)', svg: board, explode: [-272, -150], badge: B(-6, -3, 6.5), link: 'processzor', en: 'main control board (application SoC + microcontroller, IMU)',
        terms: ['msc-beagyazott/mcu-architektura', 'msc-beagyazott/rtos', 'msc-beagyazott/timer-pwm', 'msc-beagyazott/i2c'],
        what: 'A robot **agya**. Gyakran két „számítógép” van rajta: egy **mikrokontroller** (MCU), amely ezredmásodpercre pontosan kezeli a motorokat és az érzékelőket, és egy erősebb **processzor** (SoC), amely a térképet készíti és az utat tervezi. A panelon van a **giroszkóp** (IMU) is, amely érzékeli, ha a robot elfordul.',
        madeOf: 'Többrétegű **nyomtatott áramköri lap** (üvegszálas epoxi rézrétegekkel), rajta a chipek, **motormeghajtók** (tranzisztoros H-hidak), feszültségszabályozók, kondenzátorok és csatlakozók a kábelkötegekhez.',
        how: 'Az alkatrészeket **SMT** technológiával ültetik be: sablonon át forrasztópasztát nyomtatnak, robotok helyezik fel az alkatrészeket, majd kemencében beforrasztják. Ezután automatikus optikai ellenőrzés jön, végül rátöltik a **firmware**-t (a robot szoftverét).',
        uni: 'A kerékmotorok sebességét a mikrokontroller **PID-szabályozóval** tartja: a hiba a kívánt és a kerékjeladókkal mért fordulatszám különbsége, a beavatkozó jel a meghajtó **PWM** kitöltési tényezője. A fordulatszám-hurok tipikusan 1 kHz körül fut. Az MCU **valós idejű operációs rendszert** (RTOS) futtat; a SoC (pl. Linux) végzi a SLAM-et és az útvonaltervezést, a kettő soros vonalon (UART/SPI) kommunikál. A giroszkóp I²C vagy SPI buszon csatlakozik.',
        fact: 'Egy mai robotporszívó processzora erősebb lehet, mint egy 15 évvel ezelőtti asztali számítógépé.'
      },
      {
        id: 'wifi', z: 11, name: 'Wi-Fi modul', svg: wifi, explode: [-194, -88], badge: B(5.4, -0.6, 7.3), en: 'Wi-Fi module (2.4 GHz)',
        terms: ['fizika-bsc/em-hullam'],
        what: 'Ezen át kapcsolódik a robot az otthoni **Wi-Fi hálózathoz** és az interneten keresztül a gyártó **felhőszolgáltatásához**. Így a **telefonos alkalmazásból** el lehet indítani, látni lehet a térképet, és ki lehet jelölni a tiltott zónákat. A legtöbb robot csak a **2,4 GHz-es** Wi-Fi-sávot használja, mert az messzebbre ér és jobban áthatol a falakon.',
        madeOf: 'Egy kis nyomtatott áramköri lap rádiós chippel, árnyékoló **fémburkolattal** (hogy ne zavarja a többi elektronikát) és **antennával**, amely lehet a lapra nyomtatott kanyargó rézcsík vagy egy kis külön antenna.',
        how: 'A modult külön gyártják és tanúsíttatják (rádiós engedély), majd kész egységként forrasztják a fő panelra. Gyártás után a robot szoftvere egyedi azonosítót és titkosítási kulcsot kap a felhőhöz.',
        uni: 'A 2,4 GHz-es IEEE 802.11b/g/n kapcsolat elég a vezérlésre és a térkép feltöltésére (néhány Mbit/s). A biztonság kulcskérdés: a robot térképe a lakás alaprajzát rögzíti, ezért a kapcsolat **TLS**-titkosítással megy a felhőbe, és fontos a firmware rendszeres, aláírt frissítése.',
        link: 'halozat',
        fact: 'A robot térképe valójában a lakásod alaprajza: érdemes megnézni, milyen adatot küld a gyártónak, és frissíteni a szoftverét.'
      },
      {
        id: 'akku', z: 6, name: 'Akkumulátor (Li-ion)', svg: bat, explode: [-297, -27], badge: B(0, 0, 5.6), link: 'akkucella', en: 'lithium-ion battery pack (4S) with BMS',
        terms: ['e-mobilitas/bms', 'e-mobilitas/cc-cv', 'e-mobilitas/soc', 'e-mobilitas/cellakiegyenlites'],
        what: 'Az **energiaforrás**: általában négy sorba kötött lítiumion-cellából álló csomag, **14,4 V** névleges feszültséggel. Egy töltéssel 1,5–3 órát takarít, a szívóerőtől és a padlótól függően. Ha merülni kezd, a robot magától visszamegy a dokkolóra, feltölt, majd ott folytatja a takarítást, ahol abbahagyta.',
        madeOf: 'Négy (vagy nyolc) hengeres **18650-es Li-ion cella** (katód pl. NMC, anód grafit), összehegesztve nikkelszalaggal, és egy kis **akkumulátor-felügyelő áramkör** (BMS), amely védi a túltöltéstől, a mélykisütéstől és a rövidzárlattól. Műanyag tokban van.',
        how: 'A cellákat ellenőrzik, párosítják (hasonló kapacitásúakat tesznek egy csomagba), majd **ponthegesztéssel** összekötik. Rákerül a BMS-panel és a hőmérséklet-érzékelő, végül a tok és a csatlakozó.',
        uni: 'Töltés **CC-CV** módszerrel: állandó árammal 4 × 4,2 V = 16,8 V-ig, majd állandó feszültségen az áram lecsengéséig. A töltöttséget (**SoC**) a BMS főleg áramintegrálással (coulombszámlálás) és a nyugalmi feszültségből becsli. Egy 14,4 V × 5,2 Ah-s csomag ≈ 75 Wh. Átlagosan 25–40 W felvétellel ez 2–3 óra üzemidő. A soros cellák kapacitáskülönbségét **cellakiegyenlítés** (passzív, ellenállásos) kezeli.',
        fact: 'Ha a robot sokáig lemerülve áll, a BMS védelmi okból lekapcsolhat. Ezért érdemes hosszabb távollét előtt félig feltöltve tárolni.'
      },
      {
        id: 'motorok', z: 5, name: 'Motorok (kerékhajtás és szívómotor)', svg: mot, explode: [338, 62], badge: B(-11, -9.6, 8), link: 'villanymotor', en: 'drive gear motors and suction (blower) motor',
        terms: ['elektronika/h-hid', 'e-mobilitas/pwm', 'szabalyozas/pid-szabalyozo'],
        what: 'Egy robotporszívóban négy-öt motor dolgozik. A két **kerékmotor** (kis egyenáramú motor fogaskerék-áttétellel) külön-külön hajtja a bal és a jobb kereket: ha különböző sebességgel forognak, a robot kanyarodik. A **szívómotor** egy nagyon gyorsan pörgő **ventilátort** hajt, amely légritkítást kelt: ez szívja be a port a portartályba. Kisebb motorok forgatják a kefét és az oldalkefét.',
        madeOf: 'A kerékmotorok kefés vagy kefe nélküli egyenáramú motorok **fogaskerék-hajtóművel** és fordulatszám-jeladóval (enkóderrel). A szívómotor **kefe nélküli egyenáramú (BLDC) motor** állandó mágnesekkel, a ventilátorkerék és a csigaház műanyag.',
        how: 'A tekercseket automata gépek tekercselik, a mágneseket a forgórészbe ragasztják. A ventilátorkereket kiegyensúlyozzák, mert nagy fordulatszámon a legkisebb egyenetlenség is erős rezgést és zajt okozna.',
        uni: 'A differenciálhajtás kinematikája: `v = (v_R + v_L)/2`, `ω = (v_R − v_L)/b` (b a keréktáv). A kerékjeladók impulzusaiból ezek összegzésével adódik a helyzet (**odometria**), amely a csúszás miatt idővel elcsúszik, ezért kell a LiDAR-os korrekció. A szívómotor szívóereje a **nyomáskülönbséggel** (Pa) jellemezhető: tipikusan 2000–8000 Pa. A ventilátor teljesítménye `P = Δp · V̇ / η`; a BLDC motort háromfázisú inverter hajtja.',
        fact: 'A gyártók a „szívóerőt” pascalban adják meg: az 5000 Pa azt jelenti, hogy a szívónyílásnál a nyomás kb. 5%-kal kisebb a légköri nyomásnál.'
      },
      {
        id: 'kerekek', z: 4, name: 'Kerekek', svg: wheels, explode: [286, 186], badge: B(15.3, -1, 3.6), en: 'drive wheels with suspension, front caster',
        what: 'Két nagy, **rugós felfüggesztésű** hajtott kerék a robot két oldalán és egy kis szabadon forgó **bolygókerék** elöl. A rugók nyomják a kerekeket a padlóhoz, így a robot átmászik a 1,5–2 cm-es küszöbökön és szőnyegszéleken is. A kerékre szerelt jeladó méri, mennyit fordult: ebből számolja a robot, mennyit haladt.',
        madeOf: 'Műanyag kerékagy és **gumi** vagy TPE (hőre lágyuló elasztomer) futófelület mély bordázattal a jó tapadásért. A felfüggesztés acél rugó, a jeladó egy mágnes és **Hall-érzékelő** vagy optikai tárcsa.',
        how: 'A gumit a kerékagyra fröccsöntik (kétkomponensű fröccsöntés), a kereket a motorral és a hajtóművel együtt egy cserélhető **kerékmodulba** szerelik.',
        uni: 'A kerekek csúszása és a kopással változó kerékátmérő a **szisztematikus odometriahiba** fő forrásai: 1% átmérőhiba 10 m-en 10 cm hibát ad, a keréktáv bizonytalansága pedig az elfordulási szöget torzítja. A szőnyegen bekövetkező csúszást a **giroszkóp** (IMU) és a LiDAR-adatok eltérése alapján lehet észlelni (szenzorfúzió, pl. Kalman-szűrő).',
        fact: 'A kerékjeladó egy fordulat alatt több száz impulzust adhat: a robot milliméteres pontossággal „tudja”, mennyit gurult. Legalábbis amíg meg nem csúszik.'
      },
      {
        id: 'fokefe', z: 7, name: 'Főkefe', svg: brush, explode: [-182, 221], badge: B(0, 9, 4.7), en: 'main brush roll',
        what: 'A robot alján, középen forgó **hengerkefe**. Felveri a port a szőnyeg szálai közül, és a szívónyílás felé söpri, ahonnan a légáram a portartályba viszi. Ma gyakran **gumilapátos**: arra kevésbé tekeredik rá a hajszál, mint a sörtés kefére.',
        madeOf: 'Műanyag tengely, rajta **gumi** (TPE) V alakú lapátok vagy **nejlonsörték**, a végein csapágyak. Egy kis motor szíjjal vagy fogaskerekekkel hajtja.',
        how: 'A gumilapátokat a tengelyre fröccsöntik, a sörtéket gépek fúrt lyukakba „tűzik”. A kefe kivehető, hogy a rátekeredett hajat ki lehessen vágni.',
        uni: 'A kefe a szőnyegből mechanikusan választja le a részecskéket: a szívás egyedül a mélyebbre ült port nem tudja felhozni, mert a szálak között a légáram sebessége kicsi. Ezért a **takarítási hatékonyság** a kefe fordulatszámán, a sörte/lapát geometriáján és a szívónyílás kialakításán (a légáram sebességén a résben) együtt múlik.',
        fact: 'A háztartási hajszálak a kefe legnagyobb ellenségei: ezért kapott sok új robot kúpos, hajvágó pengés vagy hajtekeredés-mentes kefét.'
      },
      {
        id: 'oldalkefe', z: 3, name: 'Oldalkefe', svg: side, explode: [147, 202], badge: B(SB[0], SB[1], 4.2), en: 'side brush (edge sweeping brush)',
        what: 'A robot elejének egyik oldalán forgó, **pókszerű** kis seprű. A falak mentén és a sarkokból söpri ki a port a főkefe útjába, mert a kerek robot magától nem érné el a sarkokat. Ezért forog mindig befelé.',
        madeOf: 'Műanyag agy, rajta 3–5 köteg **nejlon** vagy szilikon sörte, egy kis egyenáramú motorral, amely a robot felső részén ül.',
        how: 'A sörtéket egy szerszámban a műanyag agyba öntik vagy tűzik. Fogyóalkatrész: néhány havonta cserélni kell, mert a sörték elgörbülnek.',
        uni: 'Az oldalkefe a robot **effektív munkaszélességét** növeli a test körvonalán túlra. A pályatervezés ezt figyelembe veszi: a fal menti „szegélytakarítás” során a robot úgy követi a falat (falkövető érzékelő, P vagy PD szabályozás a faltávolságra), hogy az oldalkefe a fal tövét súrolja.',
        fact: 'Ha egy robot egy kis zoknit vagy töltőkábelt „megfog”, gyakran az oldalkefe tekeri fel: ezért ajánlott takarítás előtt felszedni a kábeleket a padlóról.'
      },
      {
        id: 'portartaly', z: 8, name: 'Portartály és HEPA-szűrő', svg: bin, explode: [138, 8], badge: B(0, -11, 8.2), en: 'dust bin with HEPA filter',
        what: 'Ide gyűlik a felszívott por és szösz. A tartály kijáratán egy finom **szűrő** van: a levegő átmegy rajta, mielőtt a szívómotoron át kifújja a robot, a port viszont visszatartja. A **HEPA**-szűrő még a nagyon apró részecskéket (pollen, atkaürülék) is megfogja, ezért fontos allergiásoknak.',
        madeOf: 'Átlátszó vagy színezett **műanyag** tartály (0,3–0,5 liter), harmonikaszerűen hajtogatott **üvegszálas vagy szintetikus szálas** szűrőpapír műanyag keretben, előtte durvább hálós előszűrő.',
        how: 'A tartályt fröccsöntik, a szűrőanyagot hajtogatógép rakja harmonikába (így kis helyen nagy a felülete), majd a keretbe ragasztják. Az önürítő dokkolóknál a tartály alján egy fedél nyílik, és a dokkoló kiszívja belőle a port egy nagy zsákba.',
        uni: 'A szűrőkön a részecskék több mechanizmussal akadnak fenn: **ütközés** (nagy részecskék), **befogás** (interception) és **diffúzió** (nagyon kicsik, Brown-mozgás). Ezek a leggyengébben a ~0,1–0,3 µm-es tartományban hatnak (MPPS, legáthatolóbb részecskeméret). Az EN 1822 szerint a H13-as HEPA ezen a méreten is ≥ 99,95%-ot szűr. A sűrű szűrő nyomásesést okoz, ezért a ventilátornak nagyobb Δp kell. Az eltömődő szűrő csökkenti a légáramot és a szívást.',
        fact: 'A portartályt érdemes minden takarítás után üríteni, a szűrőt pedig kiütögetni: egy eltömődött szűrő a szívóerőt a felére is csökkentheti.'
      },
      {
        id: 'leeses', z: 9, name: 'Leesésérzékelők (cliff szenzorok)', svg: cliff, explode: [-20, 229], badge: B(14.6 * Math.cos(deg(100)), 14.6 * Math.sin(deg(100)), 3.7), en: 'cliff sensors (downward IR sensors)',
        what: 'A robot alján, a peremén körben 4–6 kis **infravörös érzékelő** néz lefelé (a rajzon piros-kék pöttyök). Mindegyik egy fénysugarat küld a padlóra, és figyeli a visszaverődést. Ha a fény nem jön vissza, a padló „eltűnt”: **lépcső** vagy mélység van ott. Ilyenkor a robot azonnal megáll és visszatolat.',
        madeOf: 'Egy **infravörös LED** és egy **fototranzisztor** vagy fotodióda egymás mellett, kis műanyag tokban, átlátszó ablak mögött.',
        how: 'Az érzékelőket a gyártósoron világos és sötét padlón, különböző magasságokon tesztelik, és beállítják a kapcsolási küszöböt.',
        uni: 'Az érzékelő a visszavert fény intenzitását méri, amely a távolsággal és a felület **reflexiójával** is változik. Ezért a nagyon sötét (fekete) szőnyeg vagy csempe „mélységnek” látszhat, és a robot nem megy rá. A szórt környezeti fény ellen a LED-et **modulálják**, és csak a modulált komponenst mérik (szinkron detektálás).',
        fact: 'Egyes robotok azért nem hajlandók rámenni egy fekete szőnyegre, mert a leesésérzékelőjük azt hiszi, ott egy szakadék van.'
      },
      {
        id: 'alvaz', z: 2, name: 'Alváz (és töltőlapok)', svg: chassis, explode: [0, 0], badge: B(12.6, -11.8, 1.5), en: 'chassis / bottom housing',
        what: 'A robot „padlólemeze”, erre épül minden: a kerékmodulok, a kefék, az akkumulátor, a motorok és a panel. Az alján nyílások vannak a kerekeknek, a főkefének és a szívócsatornának, hátul pedig két **fém töltőlap**, amelyekkel a robot a dokkoló érintkezőire áll.',
        madeOf: 'Merev, üvegszállal erősített **műanyag** (ABS vagy PC/ABS), csavarokkal és pattintós rögzítésekkel. A töltőlapok nikkelezett vagy aranyozott réz.',
        how: 'Egy nagy fröccsöntő szerszámban egy darabban készül, a csavaroknak menetes betéteket préselnek bele. A szerelősoron erre építik rá rétegenként a többi alkatrészt.',
        uni: 'Az alváz tervezésénél fontos a **súlypont**: alacsonyan és a kerekek tengelye közelében legyen, hogy a robot ne billegjen, és mindkét kerékre elég terhelés jusson a tapadáshoz. A hasmagasság (kb. 1–2 cm) kompromisszum a küszöbök leküzdése és a szívónyílás hatékonysága között.',
        fact: 'Egy robotporszívó szerelése modulos: a kerekek, a kefék, az akkumulátor és a szűrő külön cserélhető, így sok hiba csavarhúzóval javítható.'
      },
      {
        id: 'dokkolo', z: 1, name: 'Töltőérintkezők és dokkoló', svg: dock, explode: [136, -90], badge: B(0, -33, 12.5), en: 'charging dock with contacts and IR beacon',
        what: 'A robot „garázsa”. A falhoz tolva áll, és **infravörös jeladó** (a sötét ablak mögött) mutatja az utat a robotnak: így a lakás másik végéből is hazatalál. Odaérve a robot az alján lévő fém lapokkal a dokkoló két **rugós érintkezőjére** áll, és elkezd tölteni. A drágább dokkolók a portartályt is kiürítik.',
        madeOf: 'Műanyag ház, benne **tápegység** (a hálózati 230 V-ot alakítja kb. 20 V egyenfeszültséggé), infravörös LED-ek, nikkelezett **rézérintkezők** rugókkal, alul csúszásgátló gumi.',
        how: 'A házat fröccsöntik, a tápegység-panelt SMT-vel szerelik. A kész dokkolót a robottal együtt tesztelik: rááll-e a robot, és elindul-e a töltés.',
        uni: 'A visszatalálás két szintű: nagy távolságból a SLAM-térkép alapján **útvonaltervezés** (pl. `A*` vagy Dijkstra a foglaltsági rácson), közelről a dokkoló **kódolt infravörös jelei** (bal/jobb/közép zónák) alapján finom pozicionálás. A töltés csak akkor indul, ha a robot BMS-e érzékeli a feszültséget az érintkezőkön (biztonsági okból a dokkoló érintkezői alapállapotban gyakran nem feszültség alatt vannak).',
        fact: 'A legtöbb dokkoló érintkezője csak akkor kap feszültséget, ha a robot rááll: így biztonságos, ha a gyerek vagy a kutya hozzáér.'
      }
    ],
    uni: {
      text: 'A robotporszívó a mobil robotika szinte minden alapfeladatát megoldja. **Odometria**: a kerékjeladókból differenciálhajtásnál `v = (v_R + v_L)/2`, `ω = (v_R − v_L)/b`, a helyzetet `x ← x + v·cos θ·Δt`, `y ← y + v·sin θ·Δt`, `θ ← θ + ω·Δt` integrálja, de a hiba korlátlanul nő. **SLAM** (Simultaneous Localization and Mapping): a robot egyszerre építi a térképet (pl. foglaltsági rács) és becsli rajta a saját helyzetét. Ez valószínűségi feladat: `p(x_t, m | z_{1:t}, u_{1:t})`, amit **kiterjesztett Kalman-szűrővel**, **részecskeszűrővel** (pl. GMapping) vagy **gráfoptimalizálással** (pose graph, hurokbezárással) oldanak meg. A LiDAR-pásztázásokat scan matching illeszti. **Szabályozás**: a kerékfordulatszámot PID-hurok tartja, a pályát egy külső hurok követi. **Útvonaltervezés**: a teljes lefedéshez sávos (ökörszántás, boustrophedon) bejárás cellafelbontással, a pontok között `A*` vagy Dijkstra. **Energia**: a BMS CC-CV töltéssel, coulombszámlálással becsült SoC alapján dönt a hazatérésről.',
      terms: ['msc-iranyitas/kalman-szuro', 'szabalyozas/pid-szabalyozo', 'algoritmusok/dijkstra', 'e-mobilitas/bms', 'msc-beagyazott/digitalis-pid']
    },
    steps: [
      { icon: '🧪', title: '1. Műanyag alkatrészek fröccsöntése', text: 'Az alvázat, a fedelet, a lökhárítót, a portartályt és a dokkoló házát acél **fröccsöntő szerszámokban** készítik: a megolvasztott ABS-t nagy nyomással préselik a formába, ahol másodpercek alatt megszilárdul.', parts: ['alvaz', 'fedel', 'utkozes', 'portartaly', 'dokkolo'] },
      { icon: '🔌', title: '2. Elektronika: SMT beültetés', text: 'A vezérlőpanel és a Wi-Fi modul nyomtatott áramköri lapjára forrasztópasztát nyomtatnak, robotok helyezik fel a chipeket, majd kemencében beforrasztják őket. Optikai kamerás ellenőrzés keresi a hibás forrasztásokat.', parts: ['vezerlo', 'wifi'] },
      { icon: '🔋', title: '3. Akkumulátorcsomag', text: 'A Li-ion cellákat kapacitás szerint párosítják, nikkelszalaggal **ponthegesztik** össze, és felszerelik rájuk a BMS védőáramkört. A kész csomagot kisütik-töltik, ellenőrzik.', parts: ['akku'] },
      { icon: '⚙️', title: '4. Motorok, kerékmodulok, kefék', text: 'A kerékmotorokat a hajtóművel, a jeladóval és a rugós felfüggesztéssel együtt kerékmodullá szerelik. A szívómotor ventilátorát kiegyensúlyozzák. Elkészül a főkefe és az oldalkefe meghajtása.', parts: ['motorok', 'kerekek', 'fokefe', 'oldalkefe'] },
      { icon: '🔦', title: '5. Érzékelők és a LiDAR kalibrálása', text: 'A LiDAR-modult ismert távolságú céltáblákon kalibrálják, a leesésérzékelők kapcsolási küszöbét világos és sötét felületen állítják be, az ütközés-kapcsolókat végigtesztelik.', parts: ['lidar', 'leeses', 'utkozes'] },
      { icon: '🔧', title: '6. Végszerelés rétegenként', text: 'Az alvázra kerülnek a kerékmodulok, a kefék, a motorok, az akkumulátor, a portartály, majd a vezérlőpanel és a kábelkötegek. Végül a lökhárító, a LiDAR és a fedél zárja le.', parts: ['alvaz', 'kerekek', 'akku', 'vezerlo', 'fedel', 'lidar'] },
      { icon: '💾', title: '7. Szoftver és tesztpálya', text: 'Rátöltik a firmware-t, a robot egyedi azonosítót kap a felhőhöz. Egy tesztpályán bejárja a „szobát”: ellenőrzik a navigációt, a szívóerőt, a leesésérzékelést és hogy visszatalál-e a **dokkolóra** és tölt-e.', parts: ['vezerlo', 'wifi', 'dokkolo'] },
      { icon: '♻️', title: '8. Javítás és újrahasznosítás', text: 'A kefék, a szűrő, a kerekek és az akkumulátor cserélhetők, így a robot évekig javítható. Élete végén elektronikai hulladékként kell leadni: a Li-ion akkumulátort külön gyűjtik, mert sérülten tüzet okozhat.', parts: ['akku', 'portartaly', 'fokefe'] }
    ],
    history: [
      { year: '1990', text: 'Három MIT-kutató (köztük Rodney Brooks) megalapítja az **iRobot** céget. Kezdetben űrkutatási és katonai robotokat fejlesztenek.' },
      { year: '1996', text: 'Az Electrolux bemutatja a **Trilobite** robotporszívó prototípusát a BBC Tomorrow’s World műsorában.' },
      { year: '2001', text: 'Boltokba kerül az Electrolux **Trilobite**: az első kereskedelmi forgalomban kapható robotporszívó. Ultrahangos érzékelőkkel tájékozódik, és drága, nem lesz sikeres.' },
      { year: '2002', text: 'Megjelenik az iRobot **Roomba**: olcsó, egyszerű, véletlenszerű bejárással és ütközésérzékelővel. Ez lesz az első tömegsiker.' },
      { year: '2010', text: 'A **Neato XV-11** forgó **lézeres távolságmérővel** (LiDAR) térképez, és rendezett sávokban takarít.' },
      { year: '2015–2016', text: 'Elterjed a térképező navigáció: a Roomba 980 kamerás SLAM-et kap, a kínai gyártók (pl. Xiaomi/Roborock) pedig megfizethetővé teszik a LiDAR-os robotokat.' },
      { year: '2018–2020-as évek', text: 'Megjelennek az **önürítő dokkolók**, a mesterséges intelligenciás **kamerás akadályfelismerés** (zokni, kábel, háziállat-ürülék) és a felmosó funkció.' },
      { year: '2024', text: 'Az iRobot bejelenti, hogy összesen több mint **50 millió** robotot adott el. A robotporszívó a legelterjedtebb háztartási robot lett.' }
    ],
    quiz: [
      { q: 'Mire való a robot tetején forgó LiDAR?', options: ['Lézerrel méri a falak és bútorok távolságát, ebből készül a térkép', 'Ez szívja be a port', 'Ezzel tölt a robot', 'Ez hűti az akkumulátort'], answer: 0, explain: 'A LiDAR körbeforogva kirajzolja a környezet körvonalát; ebből és a kerekek mozgásából készül a térkép (SLAM).' },
      { q: 'Miért nem esik le a robotporszívó a lépcsőn?', options: ['Az alján lévő leesésérzékelők észlelik, hogy eltűnt alatta a padló', 'A lökhárító megakadályozza', 'A Wi-Fi jelzi neki', 'A kerekek nem forognak a lépcső szélén'], answer: 0, explain: 'Az infravörös cliff szenzorok a padlóról visszavert fényt figyelik; ha az eltűnik, a robot megáll és visszatolat.' },
      { q: 'Hogyan kanyarodik a robotporszívó?', options: ['A bal és a jobb kereke különböző sebességgel forog', 'Elfordítja az első kerekét, mint egy autó', 'Az oldalkefével fordul', 'A LiDAR forgatja'], answer: 0, explain: 'Ez a differenciálhajtás: ha az egyik kerék gyorsabb, a robot a lassabb felé fordul; ha ellentétesen forognak, helyben fordul.' },
      { q: 'Mit jelent a SLAM?', options: ['Egyszerre készít térképet és határozza meg benne a saját helyzetét', 'Egy szívómotor-típus', 'A töltés módszere', 'A szűrő szabványa'], answer: 0, explain: 'Simultaneous Localization and Mapping: egyidejű helymeghatározás és térképezés.' },
      { q: 'Mi a HEPA-szűrő feladata?', options: ['Visszatartja a nagyon apró porszemcséket is, mielőtt a levegő kijut', 'Méri a por mennyiségét', 'Hűti a szívómotort', 'Szagtalanítja a lakást'], answer: 0, explain: 'A sűrű, harmonikásan hajtott szűrő a mikrométer alatti részecskék szinte mindegyikét megfogja, ezért jó allergiásoknak.' }
    ]
  });
})();
