/* Egyetem: Járműmérnöki és e-mobilitás – menetdinamika, villamos hajtás, akkumulátor, töltés. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"';
  var RED = '#e5484d', BLUE = '#2f7bf6', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6';

  function r1(v) { return Math.round(v * 10) / 10; }
  function tx(x, y, s, size, attr) { return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 13) + '" ' + (attr || T) + '>' + s + '</text>'; }
  function mid(attr) { return (attr || T) + ' text-anchor="middle"'; }
  function end(attr) { return (attr || T) + ' text-anchor="end"'; }
  function sub(main, s, rest) { return main + '<tspan font-size="0.75em" dy="4">' + s + '</tspan><tspan dy="-4">' + (rest || '') + '</tspan>'; }
  function ln(x1, y1, x2, y2, col, w, extra) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + (col || 'var(--fg-2)') + '" stroke-width="' + (w || 2) + '"' + (extra ? ' ' + extra : '') + '/>';
  }
  function arr(x1, y1, x2, y2, col, w) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 11, s = 5, bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a);
    return ln(x1, y1, bx, by, col, w || 2.5) + '<polygon points="' + r1(x2) + ',' + r1(y2) + ' ' + r1(bx + s * Math.sin(a)) + ',' + r1(by - s * Math.cos(a)) + ' ' + r1(bx - s * Math.sin(a)) + ',' + r1(by + s * Math.cos(a)) + '" fill="' + col + '"/>';
  }
  function pts(p) { return p.map(function (q, i) { return (i ? 'L' : 'M') + r1(q[0]) + ' ' + r1(q[1]); }).join(' '); }
  function path(p, col, w, extra) { return '<path d="' + pts(p) + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2.5) + '"' + (extra ? ' ' + extra : '') + '/>'; }
  function sample(a, b, n, fn) { var out = []; for (var i = 0; i <= n; i++) out.push(fn(a + (b - a) * i / n)); return out; }
  function dot(x, y, col) { return '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="4" fill="' + (col || 'var(--fg-2)') + '"/>'; }
  var D2R = Math.PI / 180;

  // 1. Menetellenállások lejtőn álló járművön
  var roadSvg = (function () {
    var al = 12 * D2R, ca = Math.cos(al), sa = Math.sin(al), cx = 284.5, cy = 158;
    function G(u, w) { return [cx + u * ca - w * sa, cy - u * sa - w * ca]; }
    function poly(list) { return list.map(function (p) { var g = G(p[0], p[1]); return r1(g[0]) + ',' + r1(g[1]); }).join(' '); }
    function F(u1, w1, u2, w2, col) { var a = G(u1, w1), b = G(u2, w2); return arr(a[0], a[1], b[0], b[1], col, 3); }
    var s0 = G(-260, 0), s1 = G(260, 0);
    var s = '<svg viewBox="0 0 560 240">' +
      '<polygon points="' + r1(s0[0]) + ',' + r1(s0[1]) + ' ' + r1(s1[0]) + ',' + r1(s1[1]) + ' ' + r1(s1[0]) + ',236 ' + r1(s0[0]) + ',236" fill="var(--line)" opacity=".7"/>' +
      ln(s0[0], s0[1], s1[0], s1[1], 'var(--fg-2)', 2.5) + ln(s0[0], s0[1], s0[0] + 170, s0[1], 'var(--muted)', 1.5, 'stroke-dasharray="4 4"') +
      '<path d="M' + r1(s0[0] + 60) + ' ' + r1(s0[1]) + ' A60 60 0 0 0 ' + r1(s0[0] + 60 * ca) + ' ' + r1(s0[1] - 60 * sa) + '" fill="none" stroke="var(--fg-2)" stroke-width="1.5"/>' +
      tx(s0[0] + 68, s0[1] - 3, 'α', 13, T + ' font-weight="700"') +
      '<polygon points="' + poly([[-92, 12], [-92, 46], [-60, 50], [-32, 76], [38, 76], [66, 50], [96, 44], [96, 12]]) + '" fill="#8a94ab" stroke="var(--fg-2)" stroke-width="2"/>' +
      '<polygon points="' + poly([[-50, 50], [-28, 70], [32, 70], [54, 50]]) + '" fill="var(--surface)" opacity=".85"/>';
    [[-55, 14], [60, 14]].forEach(function (w) { var g = G(w[0], w[1]); s += '<circle cx="' + r1(g[0]) + '" cy="' + r1(g[1]) + '" r="14" fill="var(--fg-2)"/><circle cx="' + r1(g[0]) + '" cy="' + r1(g[1]) + '" r="5" fill="var(--surface)"/>'; });
    var fk = G(178, 30), fl = G(-160, 60), fg = G(-145, 30), fe = G(-172, 8), c0 = G(4, 40), v0 = G(-20, 96);
    s += F(98, 30, 178, 30, GREEN) + F(-94, 60, -160, 60, BLUE) + F(-94, 30, -145, 30, ORANGE) + F(-94, 8, -172, 8, RED) +
      arr(c0[0], c0[1], c0[0], c0[1] + 74, 'var(--fg)', 2) + tx(c0[0] + 6, c0[1] + 66, 'm·g', 12, T) +
      F(-20, 96, 40, 96, 'var(--muted)') + tx(v0[0] - 6, v0[1] + 4, 'v', 13, end(M)) +
      tx(fk[0] + 6, fk[1] + 4, sub('F', 'k') + ' hajtóerő', 12, 'fill="' + GREEN + '" font-weight="700"') +
      tx(fl[0] - 6, fl[1] + 4, sub('F', 'l') + ' (lég)', 12, end('fill="' + BLUE + '" font-weight="700"')) +
      tx(fg[0] - 6, fg[1] + 4, sub('F', 'g') + ' (gördülési)', 12, end('fill="' + ORANGE + '" font-weight="700"')) +
      tx(fe[0] - 6, fe[1] + 4, sub('F', 'e') + ' (emelkedési)', 12, end('fill="' + RED + '" font-weight="700"'));
    return s + '</svg>';
  })();

  // 2. Menetellenállás és teljesítményigény a sebesség függvényében
  var dragSvg = (function () {
    var Fg = 177, k = 0.345;
    function px(v) { return 60 + v / 160 * 370; }
    function py(F) { return 200 - F / 900 * 170; }
    function pp(P) { return 200 - P / 60 * 170; }
    function ms(v) { return v / 3.6; }
    function Fl(v) { return k * ms(v) * ms(v); }
    var s = '<svg viewBox="0 0 560 230">';
    [200, 400, 600, 800].forEach(function (F) { s += ln(60, py(F), 430, py(F), 'var(--line)', 1) + tx(54, py(F) + 4, F, 10, end(M)); });
    [0, 40, 80, 120, 160].forEach(function (v) { s += tx(px(v), 216, v, 10, mid(M)); });
    s += ln(60, 200, 432, 200, 'var(--fg-2)', 1.5) + ln(60, 200, 60, 20, 'var(--fg-2)', 1.5) +
      path([[px(0), py(Fg)], [px(160), py(Fg)]], ORANGE, 2.5) +
      path(sample(0, 160, 60, function (v) { return [px(v), py(Fl(v))]; }), BLUE, 2.5) +
      path(sample(0, 160, 60, function (v) { return [px(v), py(Fg + Fl(v))]; }), RED, 3) +
      path(sample(0, 160, 60, function (v) { return [px(v), pp((Fg + Fl(v)) * ms(v) / 1000)]; }), PURPLE, 2.5, 'stroke-dasharray="7 5"') +
      tx(438, py(Fg + Fl(160)) + 4, 'összes erő', 12, 'fill="' + RED + '" font-weight="700"') +
      tx(438, py(Fl(160)) + 4, sub('F', 'l') + ': lég ∝ v²', 12, 'fill="' + BLUE + '" font-weight="700"') +
      tx(438, pp((Fg + Fl(160)) * ms(160) / 1000) + 8, 'P ∝ v³ (teljesítmény)', 12, 'fill="' + PURPLE + '" font-weight="700"') +
      tx(438, py(Fg) + 4, sub('F', 'g') + ': gördülési', 12, 'fill="' + ORANGE + '" font-weight="700"') +
      tx(66, 22, 'F [N]', 11, M) + tx(430, 228, 'v [km/h]', 11, end(M)) + '</svg>';
    return s;
  })();

  // 3. Szinuszos PWM: vivőjel, referencia, kapcsolt kimenet, alapharmonikus
  var pwmSvg = (function () {
    var x0 = 40, x1 = 540, N = 12, m = 0.8;
    function car(t) { var f = (t / (2 * Math.PI) * N) % 1; return 1 - 4 * Math.abs(f - 0.5); }
    function ref(t) { return m * Math.sin(t); }
    function X(t) { return x0 + t / (2 * Math.PI) * (x1 - x0); }
    var yc = 66, A = 42, hi = 130, lo = 174, st = ref(0) > car(0), d = 'M' + x0 + ' ' + (st ? hi : lo);
    for (var i = 1; i <= 2000; i++) {
      var t = i / 2000 * 2 * Math.PI, ns = ref(t) > car(t);
      if (ns !== st) { d += ' H' + r1(X(t)) + ' V' + (ns ? hi : lo); st = ns; }
    }
    d += ' H' + x1;
    return '<svg viewBox="0 0 560 215">' +
      ln(x0, yc, x1, yc, 'var(--line)', 1) + ln(x0, 152, x1, 152, 'var(--line)', 1) +
      path(sample(0, 2 * Math.PI, N * 2, function (t) { return [X(t), yc - A * car(t)]; }), 'var(--muted)', 1.5) +
      path(sample(0, 2 * Math.PI, 100, function (t) { return [X(t), yc - A * ref(t)]; }), RED, 2.5) +
      '<path d="' + d + '" fill="none" stroke="' + BLUE + '" stroke-width="2"/>' +
      path(sample(0, 2 * Math.PI, 100, function (t) { return [X(t), 152 - 22 * ref(t)]; }), ORANGE, 3, 'stroke-dasharray="6 4"') +
      tx(x0, 14, 'vivőjel (háromszög)', 11, M) + tx(190, 14, 'referencia (szinusz)', 11, 'fill="' + RED + '"') +
      tx(350, 14, 'PWM kimenet', 11, 'fill="' + BLUE + '"') + tx(440, 14, 'alapharmonikus', 11, 'fill="' + ORANGE + '"') +
      tx(34, hi + 4, '+U/2', 10, end(M)) + tx(34, lo + 4, '−U/2', 10, end(M)) +
      tx(290, 204, 'Ahol a referencia a vivőjel fölött van, a felső kapcsoló vezet.', 11, mid(M)) + '</svg>';
  })();

  // 4. Villamos hajtás jelleggörbéje: állandó nyomaték, majd mezőgyengítés
  var fwSvg = (function () {
    function px(n) { return 60 + n / 3 * 440; }
    function py(v) { return 190 - v * 130; }
    return '<svg viewBox="0 0 560 230">' +
      '<rect x="60" y="40" width="' + r1(px(1) - 60) + '" height="150" fill="' + BLUE + '" opacity=".1"/>' +
      '<rect x="' + r1(px(1)) + '" y="40" width="' + r1(px(3) - px(1)) + '" height="150" fill="' + ORANGE + '" opacity=".1"/>' +
      tx((60 + px(1)) / 2, 32, 'állandó nyomaték', 12, mid(T + ' font-weight="700"')) + tx((px(1) + px(3)) / 2, 32, 'mezőgyengítés: közel állandó teljesítmény', 12, mid(T + ' font-weight="700"')) +
      ln(60, 190, 520, 190, 'var(--fg-2)', 1.5) + ln(60, 190, 60, 22, 'var(--fg-2)', 1.5) + ln(px(1), 190, px(1), 40, 'var(--muted)', 1.5, 'stroke-dasharray="4 4"') +
      path([[px(0), py(1)], [px(1), py(1)]].concat(sample(1, 3, 60, function (n) { return [px(n), py(1 / n)]; })), BLUE, 3) +
      path([[px(0), py(0)], [px(1), py(0.85)], [px(3), py(0.85)]], ORANGE, 3, 'stroke-dasharray="8 5"') +
      tx(70, py(1) - 8, sub('M', 'max'), 13, 'fill="' + BLUE + '" font-weight="700"') + tx(px(3) - 4, py(1 / 3) - 8, 'M ∝ 1/n', 13, end('fill="' + BLUE + '" font-weight="700"')) +
      tx(px(3) - 4, py(0.85) - 8, sub('P', 'max'), 13, end('fill="' + ORANGE + '" font-weight="700"')) + tx(px(0.5) + 6, py(0.42), 'P ∝ n', 12, 'fill="' + ORANGE + '"') +
      tx(px(1) + 6, 150, 'az indukált feszültség', 11, M) + tx(px(1) + 6, 164, 'elérte az inverter határát', 11, M) +
      tx(60, 206, '0', 11, mid(M)) + tx(px(1), 206, sub('n', 'b') + ' (alap-fordulatszám)', 11, mid()) + tx(px(3), 206, sub('n', 'max'), 11, mid()) + tx(520, 222, 'n', 13, end()) + '</svg>';
  })();

  // 5. Mezőorientált szabályozás: d–q koordináta-rendszer
  var focSvg = (function () {
    var ox = 150, oy = 140, th = 30;
    function pol(r, deg) { return [ox + r * Math.cos(deg * D2R), oy - r * Math.sin(deg * D2R)]; }
    var dA = pol(60, th + 180), dB = pol(150, th), qA = pol(50, th + 270), qB = pol(130, th + 90);
    var is = pol(115, th + 105), idT = pol(115 * Math.cos(105 * D2R), th), iqT = pol(115 * Math.sin(105 * D2R), th + 90), psi = pol(78, th), a0 = pol(36, 0), a1 = pol(36, th), lb = pol(50, th / 2);
    var lines = ['abc → αβ: Clarke-transzformáció', 'αβ → dq: Park-transzformáció (θ)', sub('i', 'd') + ': fluxusképző összetevő', sub('i', 'q') + ': nyomatékképző összetevő',
      'M ∝ ' + sub('Ψ', 'PM') + ' · ' + sub('i', 'q') + ' (felületi mágnes)', sub('i', 'd') + ' < 0: mezőgyengítés'];
    return '<svg viewBox="0 0 560 240">' +
      ln(35, oy, 290, oy, 'var(--muted)', 1.5) + ln(ox, 232, ox, 15, 'var(--muted)', 1.5) + tx(292, oy + 4, 'α', 13, M) + tx(ox + 6, 22, 'β', 13, M) +
      ln(dA[0], dA[1], dB[0], dB[1], PURPLE, 2, 'stroke-dasharray="6 4"') + ln(qA[0], qA[1], qB[0], qB[1], PURPLE, 2, 'stroke-dasharray="6 4"') +
      tx(dB[0] + 4, dB[1] - 2, 'd', 14, 'fill="' + PURPLE + '" font-weight="700"') + tx(qB[0] - 8, qB[1] - 2, 'q', 14, end('fill="' + PURPLE + '" font-weight="700"')) +
      '<path d="M' + r1(a0[0]) + ' ' + r1(a0[1]) + ' A36 36 0 0 0 ' + r1(a1[0]) + ' ' + r1(a1[1]) + '" fill="none" stroke="var(--fg-2)" stroke-width="1.5"/>' + tx(lb[0] + 2, lb[1] + 5, 'θ', 13, T) +
      arr(ox, oy, psi[0], psi[1], GREEN, 4) + tx(psi[0] - 4, psi[1] + 22, sub('Ψ', 'PM'), 13, 'fill="' + GREEN + '" font-weight="700"') +
      ln(is[0], is[1], idT[0], idT[1], 'var(--muted)', 1.2, 'stroke-dasharray="3 3"') + ln(is[0], is[1], iqT[0], iqT[1], 'var(--muted)', 1.2, 'stroke-dasharray="3 3"') +
      arr(ox, oy, idT[0], idT[1], RED, 3) + arr(ox, oy, iqT[0], iqT[1], ORANGE, 3) + arr(ox, oy, is[0], is[1], BLUE, 3.5) +
      tx(is[0] - 6, is[1] - 4, sub('i', 's'), 14, end('fill="' + BLUE + '" font-weight="700"')) + tx(iqT[0] + 8, iqT[1] + 4, sub('i', 'q'), 13, 'fill="' + ORANGE + '" font-weight="700"') +
      tx(idT[0] - 4, idT[1] + 18, sub('i', 'd'), 13, end('fill="' + RED + '" font-weight="700"')) +
      lines.map(function (l, i) { return tx(318, 48 + i * 28, l, 12, T); }).join('') + '</svg>';
  })();

  // 6. CC-CV töltési görbe
  var ccSvg = (function () {
    var tb = 0.55;
    function px(t) { return 50 + t * 460; }
    function U(t) { return t < tb ? 3.5 + 0.7 * (1 - Math.exp(-t / 0.18)) / (1 - Math.exp(-tb / 0.18)) : 4.2; }
    function I(t) { return t < tb ? 1 : Math.exp(-(t - tb) / 0.13); }
    function SOC(t) { return t < tb ? 0.8 * t / tb : 0.8 + 0.2 * (1 - Math.exp(-(t - tb) / 0.13)) / (1 - Math.exp(-(1 - tb) / 0.13)); }
    function yU(u) { return 196 - (u - 3.0) / 1.3 * 160; }
    function yI(i) { return 196 - i * 90; }
    function yS(s) { return 196 - s * 130; }
    return '<svg viewBox="0 0 560 230">' +
      '<rect x="50" y="26" width="' + r1(px(tb) - 50) + '" height="170" fill="' + BLUE + '" opacity=".08"/>' +
      tx((50 + px(tb)) / 2, 20, 'CC: állandó áram', 12, mid(T + ' font-weight="700"')) + tx((px(tb) + px(1)) / 2, 20, 'CV: állandó feszültség', 12, mid(T + ' font-weight="700"')) +
      ln(50, 196, 520, 196, 'var(--fg-2)', 1.5) + ln(50, 196, 50, 26, 'var(--fg-2)', 1.5) + ln(px(tb), 196, px(tb), 26, 'var(--muted)', 1.5, 'stroke-dasharray="4 4"') +
      ln(50, yU(4.2), 510, yU(4.2), RED, 1, 'stroke-dasharray="2 4"') +
      path(sample(0, 1, 120, function (t) { return [px(t), yU(U(t))]; }), RED, 3) +
      path(sample(0, 1, 120, function (t) { return [px(t), yI(I(t))]; }), BLUE, 3) +
      path(sample(0, 1, 120, function (t) { return [px(t), yS(SOC(t))]; }), GREEN, 2.5, 'stroke-dasharray="7 5"') +
      tx(60, yU(4.2) - 6, 'cellafeszültség → 4,2 V (NMC)', 12, 'fill="' + RED + '" font-weight="700"') +
      tx(60, yI(1) - 6, 'töltőáram (pl. 1C)', 12, 'fill="' + BLUE + '" font-weight="700"') +
      tx(px(0.3), yS(SOC(0.3)) + 20, 'SOC', 12, 'fill="' + GREEN + '" font-weight="700"') + tx(px(tb) - 6, yS(0.8) - 6, '≈ 80%', 11, end('fill="' + GREEN + '"')) +
      tx(px(1), yI(I(1)) - 8, 'lezárási áram', 11, end(M)) + tx(520, 214, 'idő', 11, end(M)) + '</svg>';
  })();

  // 7. Nyugalmi feszültség (OCV) a töltöttség függvényében: NMC és LFP
  var socSvg = (function () {
    function px(s) { return 60 + s / 100 * 440; }
    function py(v) { return 200 - (v - 2.5) / 1.8 * 170; }
    var nmc = [[0, 3.0], [3, 3.3], [8, 3.45], [15, 3.55], [30, 3.65], [50, 3.75], [70, 3.9], [85, 4.02], [100, 4.2]];
    var lfp = [[0, 2.5], [3, 2.95], [7, 3.15], [15, 3.22], [30, 3.26], [50, 3.29], [70, 3.31], [85, 3.33], [95, 3.38], [98, 3.45], [100, 3.6]];
    function P(a) { return a.map(function (p) { return [px(p[0]), py(p[1])]; }); }
    var s = '<svg viewBox="0 0 560 230">';
    [3.0, 3.5, 4.0].forEach(function (v) { s += ln(60, py(v), 500, py(v), 'var(--line)', 1) + tx(54, py(v) + 4, String(v).replace('.', ',') + ' V', 10, end(M)); });
    [0, 20, 40, 60, 80, 100].forEach(function (x) { s += tx(px(x), 216, x + '%', 10, mid(M)); });
    s += '<rect x="' + r1(px(20)) + '" y="' + r1(py(3.36)) + '" width="' + r1(px(80) - px(20)) + '" height="' + r1(py(3.2) - py(3.36)) + '" fill="' + ORANGE + '" opacity=".15"/>' +
      ln(60, 200, 505, 200, 'var(--fg-2)', 1.5) + ln(60, 200, 60, 20, 'var(--fg-2)', 1.5) +
      path(P(nmc), BLUE, 3) + path(P(lfp), ORANGE, 3) +
      tx(px(32), py(4.1), 'NMC: jól mérhető meredekség', 12, mid('fill="' + BLUE + '" font-weight="700"')) +
      tx(px(50), py(3.2) + 22, 'LFP: lapos plató (20–80% között csak ~50–80 mV)', 12, mid('fill="' + ORANGE + '" font-weight="700"')) +
      tx(66, 22, 'nyugalmi feszültség', 11, M) + tx(505, 228, 'SOC', 11, end(M)) + '</svg>';
    return s;
  })();

  // 8. Cellakiegyenlítés: sorba kötött cellák eltérő töltöttsége
  var balSvg = (function () {
    var soc = [86, 90, 88, 100, 87, 93], s = '<svg viewBox="0 0 560 240">' +
      ln(50, 40, 470, 40, RED, 1.5, 'stroke-dasharray="5 4"') + tx(476, 38, sub('U', 'max'), 12, 'fill="' + RED + '" font-weight="700"') + tx(476, 54, 'a töltés leáll', 11, M);
    soc.forEach(function (v, i) {
      var x = 60 + i * 70, h = v * 1.4;
      s += '<rect x="' + x + '" y="' + r1(180 - h) + '" width="46" height="' + r1(h) + '" rx="3" fill="' + (v === 100 ? ORANGE : GREEN) + '" opacity=".9"/>' +
        '<rect x="' + x + '" y="40" width="46" height="140" rx="3" fill="none" stroke="var(--fg-2)" stroke-width="2"/>' +
        '<rect x="' + (x + 16) + '" y="33" width="14" height="7" fill="var(--fg-2)"/>' +
        tx(x + 23, r1(180 - h) + 20, v + '%', 12, mid('fill="#fff" font-weight="700"')) + tx(x + 23, 198, (i + 1) + '. cella', 11, mid(M));
    });
    s += tx(270, 220, 'A legmagasabb töltöttségű cella szabja meg a töltés végét,', 12, mid()) +
      tx(270, 236, 'a legalacsonyabb a kisütés végét: ennyi kapacitás veszik el.', 12, mid()) + '</svg>';
    return s;
  })();

  // 9. Háromfázisú hajtásinverter (B6-híd)
  var invSvg = (function () {
    var legs = [[220, 'S1', 'S4', 'U'], [310, 'S3', 'S6', 'V'], [400, 'S5', 'S2', 'W']];
    function sw(x, y, l) { return '<rect x="' + (x - 15) + '" y="' + y + '" width="30" height="44" rx="4" fill="var(--surface)" stroke="' + BLUE + '" stroke-width="2.5"/>' + tx(x, y + 27, l, 12, mid('fill="' + BLUE + '" font-weight="700"')); }
    var s = '<svg viewBox="0 0 560 235">' + ln(60, 40, 400, 40, RED, 3) + ln(60, 200, 400, 200, 'var(--fg-2)', 3) +
      tx(408, 44, 'DC+', 11, 'fill="' + RED + '"') + tx(408, 204, 'DC−', 11, M) +
      ln(60, 40, 60, 112) + ln(42, 112, 78, 112, 'var(--fg-2)', 3) + ln(50, 126, 70, 126, 'var(--fg-2)', 5) + ln(60, 126, 60, 200) +
      tx(84, 116, 'akku', 12, T) + tx(84, 132, sub('U', 'DC'), 12, M) +
      ln(140, 40, 140, 112) + ln(125, 112, 155, 112, 'var(--fg-2)', 3) + ln(125, 124, 155, 124, 'var(--fg-2)', 3) + ln(140, 124, 140, 200) + tx(160, 122, sub('C', 'DC'), 12, M);
    legs.forEach(function (g) {
      var x = g[0];
      s += ln(x, 40, x, 52) + sw(x, 52, g[1]) + ln(x, 96, x, 142) + sw(x, 142, g[2]) + ln(x, 186, x, 200) +
        ln(x, 119, x + 40, 119, 'var(--fg-2)', 2.5) + dot(x, 119) + '<circle cx="' + (x + 40) + '" cy="119" r="5" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2"/>' +
        tx(x + 40, 108, g[3], 13, mid(T + ' font-weight="700"')) + dot(x, 40, RED) + dot(x, 200);
    });
    s += '<circle cx="505" cy="119" r="32" fill="var(--surface)" stroke="' + GREEN + '" stroke-width="3"/>' + tx(505, 116, 'M', 16, mid('fill="' + GREEN + '" font-weight="700"')) + tx(505, 134, '3~', 12, mid('fill="' + GREEN + '"')) +
      tx(505, 170, 'U, V, W a', 11, mid(M)) + tx(505, 184, 'motorkapcsokra', 11, mid(M)) +
      tx(310, 226, 'egy hídág két kapcsolója sosem vezet egyszerre (holtidő)', 11, mid(M)) + '</svg>';
    return s;
  })();

  STUDIE.addCourse({
    id: 'e-mobilitas',
    title: 'Járműmérnöki és e-mobilitás',
    icon: '🚗',
    color: '#2f9e6a',
    level: 'BSc 3–7. félév (járműmérnök, villamosmérnök, mechatronika)',
    description: 'Menetellenállások és hajtáslánc, villamos hajtómotorok és inverter, lítiumion-akkumulátor és BMS, töltési technológiák.',
    intro: 'Az elektromos jármű mérnöki fogalmai a kerék és az út kapcsolatától a cellakémiáig. A rendszer egészét az [[elektromos-auto|elektromos autó]], az akkumulátor belsejét az [[akkucella|akkucella]] modellben is megnézheted; összehasonlításként ott a [[benzinmotor|benzinmotor]] is.',
    topics: [
      { id: 'hajtaslanc', title: 'Hajtáslánc és menetdinamika' },
      { id: 'hajtas', title: 'Villamos hajtás' },
      { id: 'akku', title: 'Akkumulátor' },
      { id: 'toltes', title: 'Töltés és energiamenedzsment' },
      { id: 'rendszer', title: 'Hő, energiamérleg és életciklus' }
    ],
    formulas: [
      {
        id: 'menetellenallas-ero', title: 'Menetellenállás (a jármű mozgásegyenlete)', en: 'road load equation',
        parts: [{ t: 'F_m', d: 'A kerekeken szükséges vonóerő', unit: 'N' }, { t: '=' },
          { t: 'f_g', d: 'Gördülési ellenállási tényező', unit: '–', more: 'Személyautó-abroncson aszfalton 0,007–0,012.' }, { t: '·' },
          { t: 'm', d: 'A jármű tömege (utasokkal, rakománnyal)', unit: 'kg' }, { t: '· g · cos α + ½ ·' },
          { t: 'ρ', d: 'A levegő sűrűsége', unit: 'kg/m³', more: 'Kb. 1,2 kg/m³ 20 °C-on, tengerszinten.' }, { t: '·' },
          { t: 'c_w', d: 'Légellenállási tényező (alaktényező)', unit: '–', more: 'Modern elektromos autóknál 0,20–0,30.' }, { t: '·' },
          { t: 'A', d: 'Homlokfelület', unit: 'm²' }, { t: '·' }, { t: 'v^2', d: 'A jármű sebességének négyzete (szélcsendben)', unit: 'm²/s²' },
          { t: '+ m · g · sin' }, { t: 'α', d: 'Az út emelkedési szöge', unit: '°', more: 'p% emelkedő: tg α = p/100.' }, { t: '+' },
          { t: 'k_m', d: 'Forgó tömegek tényezője: a forgó részek (kerék, motor forgórésze) gyorsítását is figyelembe veszi', unit: '–', more: 'Jellemzően 1,03–1,15.' }, { t: '· m ·' },
          { t: 'a', d: 'Gyorsulás', unit: 'm/s²' }],
        text: 'A négy tag sorban: **gördülési**, **lég-**, **emelkedési** és **gyorsítási** ellenállás. A szükséges teljesítmény a keréken `P = F_m · v`, a motornál ehhez még a hajtáslánc veszteségei adódnak.',
        example: 'm = 1800 kg, f_g = 0,01, c_w = 0,25, A = 2,3 m², sík úton 100 km/h-val (27,8 m/s) egyenletesen: `F_m = 177 + 266 = 443 N`, `P = 443 · 27,8 ≈ 12,3 kW`.'
      },
      {
        id: 'kerekero', title: 'Kerékerő a motornyomatékból', en: 'tractive force',
        parts: [{ t: 'F_k', d: 'A kerék és az út között átadott hajtóerő', unit: 'N' }, { t: '=' },
          { t: 'M_m', d: 'Motornyomaték', unit: 'N·m' }, { t: '·' }, { t: 'i', d: 'A hajtáslánc teljes áttétele (motor-fordulatszám / kerék-fordulatszám)', unit: '–', more: 'Elektromos autók egyfokozatú reduktoránál jellemzően 8–11.' }, { t: '·' },
          { t: 'η', d: 'A hajtáslánc mechanikai hatásfoka', unit: '–' }, { t: '/' }, { t: 'r_d', d: 'A kerék dinamikus gördülési sugara', unit: 'm' }],
        text: 'Az áttétel a nyomatékot `i`-szeresére növeli, a fordulatszámot `i`-ed részére csökkenti; a teljesítmény (a veszteségektől eltekintve) változatlan. A kerékerő felső korlátja a tapadás: `F_k ≤ μ · F_z`, ahol F_z a hajtott tengely terhelése.',
        example: 'M_m = 300 N·m, i = 9, η = 0,95, r_d = 0,33 m: `F_k = 300 · 9 · 0,95 / 0,33 ≈ 7770 N`. 1900 kg-os autónál ez kb. `4,1 m/s²` gyorsulást enged (az ellenállások levonása előtt).'
      },
      {
        id: 'hajtasteljesitmeny', title: 'Teljesítmény, nyomaték és fordulatszám', en: 'mechanical power',
        parts: [{ t: 'P', d: 'Mechanikai teljesítmény', unit: 'W' }, { t: '=' }, { t: 'M', d: 'Nyomaték', unit: 'N·m' }, { t: '·' },
          { t: 'ω', d: 'Szögsebesség', unit: 'rad/s', more: 'ω = 2π · n / 60, ha n fordulat/perc (1/min).' }],
        text: 'Ugyanaz a teljesítmény kis fordulatszámon nagy nyomatékkal vagy nagy fordulatszámon kis nyomatékkal is előállhat. A villamos motor alapfordulatszám alatt a maximális nyomatékot, felette (mezőgyengítésben) közel állandó teljesítményt ad.',
        example: '300 N·m 6000 1/min-en: `ω = 2π · 6000 / 60 ≈ 628 rad/s`, `P = 300 · 628 ≈ 188 kW`. Lóerőben (1 LE = 0,7355 kW): ≈ 256 LE.'
      },
      {
        id: 'akku-energia', title: 'Az akkumulátor energiatartalma', en: 'battery energy',
        parts: [{ t: 'E', d: 'Tárolt energia', unit: 'Wh (kWh)' }, { t: '=' }, { t: 'U_n', d: 'Névleges (átlagos) feszültség', unit: 'V', more: 'Cellánként NMC ≈ 3,6–3,7 V, LFP ≈ 3,2 V; a csomagé a soros cellák számával szorozva.' }, { t: '·' },
          { t: 'Q_n', d: 'Névleges töltéskapacitás', unit: 'Ah' }],
        text: 'A hatótáv becslése: `s ≈ E_hasznos / e`, ahol e a fogyasztás (kWh/km). A **bruttó** kapacitásnak csak egy része használható (puffer a cellák védelmére), és a hasznos energia a hőmérséklettől és a kisütőáramtól is függ.',
        example: '96 sorba kötött NMC-cellasor (96s), 3,65 V, 200 Ah: `E = 96 · 3,65 · 200 ≈ 70 kWh`. 16 kWh/100 km fogyasztással kb. `437 km`.'
      },
      {
        id: 'c-rata', title: 'C-ráta', en: 'C-rate',
        parts: [{ t: 'C', d: 'C-ráta: a névleges kapacitásra vonatkoztatott áram', unit: '1/h' }, { t: '=' }, { t: 'I', d: 'Töltő- vagy kisütőáram', unit: 'A' }, { t: '/' },
          { t: 'Q_n', d: 'A cella (cellasor) névleges kapacitása', unit: 'Ah' }],
        text: 'Az 1C áramerősség egy óra alatt töltené vagy sütné ki a teljes kapacitást, a 2C fél óra, a C/2 két óra alatt. Csomagszinten jó közelítéssel `C ≈ P / E` (kW / kWh).',
        example: '5 Ah-s cella 10 A-rel: `2C`. 77 kWh-s akkumulátor 175 kW-os DC-töltéssel: `175 / 77 ≈ 2,3C`.'
      },
      {
        id: 'akku-kapocsfeszultseg', title: 'Az akkumulátor kapocsfeszültsége terheléskor', en: 'terminal voltage under load',
        parts: [{ t: 'U_k', d: 'Kapocsfeszültség terhelés alatt', unit: 'V' }, { t: '=' }, { t: 'U_0', d: 'Nyugalmi (üresjárási) feszültség, az SOC függvénye', unit: 'V' }, { t: '−' },
          { t: 'I', d: 'Kisütőáram (töltéskor negatív előjellel: ekkor a kapocsfeszültség nagyobb U_0-nál)', unit: 'A' }, { t: '·' },
          { t: 'R_b', d: 'Belső ellenállás', unit: 'Ω', more: 'Hidegben és öregedéssel nő.' }],
        text: 'Ez az egyszerű Thévenin-modell. A pontosabb modellek egy vagy több párhuzamos RC-taggal is számolnak (töltésátadás, diffúzió), így a feszültség terheléskor nem egyszerre, hanem fokozatosan esik le. A belső ellenálláson hővé alakuló teljesítmény `P_v = I² · R_b`.',
        example: 'U_0 = 380 V, R_b = 0,1 Ω, I = 300 A: `U_k = 350 V`, a belső veszteség `300² · 0,1 = 9 kW`.'
      },
      {
        id: 'toltesi-ido', title: 'Töltési idő becslése', en: 'charging time',
        parts: [{ t: 't', d: 'Töltési idő', unit: 'h' }, { t: '≈' }, { t: 'ΔE', d: 'A betöltendő energia (az akkumulátorba)', unit: 'kWh' }, { t: '/ (' },
          { t: 'P_t', d: 'Átlagos töltőteljesítmény: a töltő, a fedélzeti töltő és a BMS által engedett érték közül a legkisebb', unit: 'kW' }, { t: '·' },
          { t: 'η_t', d: 'Töltési hatásfok (töltő, kábel, akkumulátor, hűtés)', unit: '–', more: 'AC-töltésnél jellemzően 0,85–0,92.' }, { t: ')' }],
        text: 'A becslés a CC-szakaszra jó. DC-gyorstöltéskor a teljesítmény a töltöttséggel és a hőmérséklettel változik, 80% fölött erősen csökken, ezért a gyártók a 10→80%-os időt adják meg.',
        example: '60 kWh-s akkumulátor 20 → 80% (36 kWh) 11 kW-os AC-töltéssel, 90%-os hatásfokkal: `t ≈ 36 / (11 · 0,9) ≈ 3,6 h`.'
      },
      {
        id: 'arrhenius', title: 'Arrhenius-összefüggés (hőmérsékletfüggő öregedési sebesség)', en: 'Arrhenius equation',
        parts: [{ t: 'k', d: 'Az öregedést okozó (mellék)reakció sebességi állandója', unit: '1/s vagy relatív' }, { t: '=' },
          { t: 'A', d: 'Preexponenciális tényező (a folyamatra jellemző állandó)', unit: 'mint k' }, { t: '· e^{−' },
          { t: 'E_a', d: 'Aktiválási energia', unit: 'J/mol' }, { t: '/ (' }, { t: 'R', d: 'Egyetemes gázállandó', unit: '8,314 J/(mol·K)' }, { t: '·' },
          { t: 'T', d: 'Abszolút hőmérséklet', unit: 'K' }, { t: ')}' }],
        text: 'Két hőmérséklet sebességaránya: `k_2/k_1 = e^((E_a/R) · (1/T_1 − 1/T_2))`. Az akkumulátorok naptári öregedésének hőmérsékletfüggése gyakran jól közelíthető így – de csak egy adott hőmérséklet-tartományon belül, mert más hőmérsékleten más mechanizmus (például hidegben a lítiumkiválás) válhat uralkodóvá.',
        example: 'E_a = 50 kJ/mol, 25 °C → 35 °C: `k_2/k_1 = e^(6014 · (1/298,15 − 1/308,15)) ≈ e^0,65 ≈ 1,9` – 10 °C-kal melegebben közel kétszer gyorsabb öregedés.'
      },
      {
        id: 'naptari-oregedes', title: 'Naptári kapacitásvesztés gyökös közelítése', en: 'square-root-of-time calendar ageing',
        parts: [{ t: 'Q_{veszt}(t)', d: 'A t idő alatt elvesztett kapacitás a névlegeshez viszonyítva', unit: '%' }, { t: '≈' },
          { t: 'b(T, SOC)', d: 'Öregedési tényező: a tárolási hőmérséklettől és töltöttségtől függ (méréssel illesztett)', unit: '%/√év' }, { t: '·' },
          { t: '√t', d: 'Az eltelt idő négyzetgyöke', unit: '√év' }],
        text: 'A gyökös időfüggés a SEI-réteg diffúzióval korlátozott növekedéséből adódik: a vastagodó réteg egyre lassabban engedi át a reagáló anyagokat. Empirikus közelítés: hosszú távon, vagy ha más mechanizmus (lítiumkiválás, aktív anyag elvesztése) belép, a görbe gyorsulhat („könyök”).',
        example: 'Ha egy cella adott körülmények között az első évben 4%-ot veszít, a modell szerint 4 év után `4 · √4 = 8%`, 9 év után `4 · 3 = 12%` a naptári veszteség.'
      },
      {
        id: 'pilot-aram', title: 'Megengedett töltőáram a vezérlőjel kitöltési tényezőjéből', en: 'control pilot duty cycle to current',
        parts: [{ t: 'I_{max}', d: 'A töltőállomás által megengedett legnagyobb fázisáram', unit: 'A' }, { t: '=' },
          { t: 'D', d: 'A vezérlőjel (CP, 1 kHz-es PWM) kitöltési tényezője százalékban', unit: '%', more: 'Az összefüggés a 10–85% tartományra érvényes.' }, { t: '·' },
          { t: '0,6 A', d: 'Arányossági tényező (IEC 61851-1)', unit: 'A/%' }],
        text: '85% fölött (legfeljebb 96%-ig) a szabvány más összefüggést ad: `I = (D − 64) · 2,5 A`. 10% alatt nincs AC-töltés; az 5% körüli kitöltés azt jelzi, hogy az áramot digitális (magas szintű) kommunikációval egyeztetik.',
        example: 'D = 26,7% → `I_max ≈ 16 A`; D = 53,3% → `I_max ≈ 32 A`. Háromfázisú 16 A-en ez `3 · 230 · 16 ≈ 11 kW`.'
      },
      {
        id: 'reduktor-fordulatszam', title: 'Motorfordulatszám a járműsebességből', en: 'motor speed from vehicle speed',
        parts: [{ t: 'n_m', d: 'A motor fordulatszáma', unit: '1/min' }, { t: '=' },
          { t: 'i', d: 'A teljes hajtásáttétel (reduktor + differenciálmű)', unit: '–', more: 'Egyfokozatú villamos hajtásnál jellemzően 8–12.' }, { t: '·' },
          { t: 'v', d: 'A jármű sebessége', unit: 'm/s' }, { t: '· 60 / (2π ·' }, { t: 'r_d', d: 'A kerék dinamikus gördülési sugara', unit: 'm' }, { t: ')' }],
        text: 'A nyomatékra fordítva érvényes: `M_kerék = i · η_h · M_motor`, ahol η_h a hajtómű hatásfoka. Nagy áttétel nagy kerékerőt, de nagy motorfordulatszámot jelent; a legnagyobb sebességet a motor megengedett fordulatszáma határolja.',
        example: 'r_d = 0,33 m, i = 9, v = 130 km/h = 36,1 m/s: `n_m = 9 · 36,1 · 60 / (2π · 0,33) ≈ 9400 1/min`. 300 Nm motornyomatékból 97%-os hatásfokkal `M_kerék ≈ 2620 Nm`.'
      }
    ],
    terms: [
      /* ---------- Hajtáslánc és menetdinamika ---------- */
      { id: 'nyomatek', prereq: ['lecke:autoszereles/eroatvitel', 'lecke:fizika/newton'], term: 'Nyomaték (forgatónyomaték)', en: 'torque', topic: 'hajtaslanc', short: 'Az erő forgató hatásának mértéke: M = F · r, mértékegysége N·m; a hajtásban a motornyomaték az áttételen át a kerékerőt, így a gyorsítóképességet határozza meg.',
        text: 'A motor nyomatéka a reduktoron (elektromos autóban többnyire egyfokozatú, i ≈ 8–11) és a differenciálművön át jut a kerekekre: `M_kerék = M_m · i · η`, a kerékerő pedig `F_k = M_kerék / r_d`.\n\nA villamos motor a maximális nyomatékát **álló helyzetből** is le tudja adni, a belső égésű motor viszont csak egy fordulatszám-tartományban; ezért kell neki többfokozatú sebességváltó és tengelykapcsoló.',
        formulas: ['kerekero', 'hajtasteljesitmeny'],
        pitfall: 'Az áttétel a nyomatékot megsokszorozza, de a **teljesítményt nem** növeli (csak csökkenti a veszteségekkel). Nagy nyomaték nem jelent automatikusan nagy végsebességet: az a teljesítménytől és a légellenállástól függ.',
        related: ['hatasfok', 'menetellenallas', 'pmsm', 'mezogyengites'], models: ['elektromos-auto', 'benzinmotor'] },
      { id: 'hatasfok', prereq: ['lecke:fizika/energia-munka'], term: 'Hatásfok', en: 'efficiency', topic: 'hajtaslanc', short: 'A hasznos kimenő és a befektetett teljesítmény hányadosa: η = P_ki / P_be < 1; láncba kapcsolt elemeknél a részhatásfokok összeszorzódnak.',
        text: 'Egy elektromos autó hajtásláncának jellemző részhatásfokai: akkumulátor kisütése 95–98%, inverter 97–99%, motor 90–97% (a munkapont szerint), reduktor 97–98%. Az eredő „akkumulátortól a kerékig” hatásfok így kb. 85–90%. A benzinmotor legjobb pontja kb. 35–40%, átlagos városi üzemben 20% körüli.\n\nA motor hatásfoka munkapontfüggő, ezt a **hatásfoktérkép** (nyomaték–fordulatszám síkon) mutatja.',
        example: '`η = 0,97 · 0,98 · 0,94 · 0,97 ≈ 0,87`. Ha a kerékhez 12,3 kW kell, az akkumulátorból `12,3 / 0,87 ≈ 14,1 kW` fogy.',
        pitfall: 'A részhatásfokokat nem összeadni vagy átlagolni kell, hanem **összeszorozni**. Az összehasonlításnál a töltési veszteséget (kb. 10%) és az energia előállítását (well-to-wheel) is figyelembe kell venni.',
        related: ['nyomatek', 'pmsm', 'inverter', 'rekuperacio', 'belso-ellenallas'], models: ['elektromos-auto', 'benzinmotor'] },
      { id: 'menetellenallas', prereq: ['lecke:fizika/newton'], term: 'Menetellenállás', en: 'road load (driving resistance)', topic: 'hajtaslanc', short: 'A jármű haladását akadályozó erők összege: gördülési, lég-, emelkedési és gyorsítási ellenállás; a hajtásnak ezt kell legyőznie.',
        visual: roadSvg, caption: 'Emelkedőn haladó jármű: a hajtóerő a gördülési, a lég- és az emelkedési ellenállást győzi le.',
        text: 'Állandó sebességnél a hajtóerő éppen egyensúlyt tart a menetellenállásokkal, gyorsításkor ezen felül a tömeg (és a forgó részek) gyorsításához is erő kell. A szükséges teljesítmény `P = F · v`.\n\nA homologizációs méréseknél (WLTP) a menetellenállást kigurulási próbából határozzák meg, és `F = A + B · v + C · v²` alakban adják meg: az A tag főleg a gördülési ellenállás, a C tag a légellenállás.',
        formulas: ['menetellenallas-ero'],
        related: ['gordulesi-ellenallas', 'legellenallas', 'emelkedesi-ellenallas', 'nyomatek', 'hatasfok', 'rekuperacio'], models: ['elektromos-auto'] },
      { id: 'gordulesi-ellenallas', term: 'Gördülési ellenállás', en: 'rolling resistance', topic: 'hajtaslanc', short: 'A gumiabroncs gördülés közbeni deformációjának hiszterézisveszteségéből eredő, a sebességtől közel független ellenállóerő: F_g = f_g · m · g · cos α.',
        text: 'A gördülési ellenállási tényező (f_g) személyautó-abroncsnál aszfalton 0,007–0,012; az EU-s abroncscímke „A” osztálya 6,5 kg/t, vagyis f_g ≤ 0,0065. Növeli a kis abroncsnyomás, a nagy terhelés, a széles abroncs és a rossz útburkolat. Kis sebességnél, városban ez a legnagyobb menetellenállás.',
        example: '1800 kg, f_g = 0,01: `F_g = 0,01 · 1800 · 9,81 ≈ 177 N`. 100 km-en ez `177 · 10⁵ J ≈ 17,7 MJ ≈ 4,9 kWh` energia a kerékre vetítve.',
        pitfall: 'A gördülési ellenállási tényező nem azonos a tapadási (súrlódási) tényezővel: száraz aszfalton μ ≈ 0,8–1,0, míg f_g ≈ 0,01, vagyis két nagyságrenddel kisebb.',
        formulas: ['menetellenallas-ero'],
        related: ['menetellenallas', 'legellenallas', 'emelkedesi-ellenallas'] },
      { id: 'legellenallas', term: 'Légellenállás', en: 'aerodynamic drag', topic: 'hajtaslanc', short: 'A jármű körüli levegőáramlásból eredő ellenállóerő: F_l = ½ · ρ · c_w · A · v²; a sebesség négyzetével, a leküzdéséhez szükséges teljesítmény a sebesség köbével nő.',
        visual: dragSvg, caption: 'Egy 1800 kg-os, cw · A = 0,575 m² értékű autó menetellenállása sík úton. Kb. 70 km/h felett a légellenállás dominál. A teljesítményigény 100 km/h-nál ≈ 12 kW, 130 km/h-nál ≈ 23 kW, 160 km/h-nál ≈ 38 kW.',
        text: 'A `c_w` a karosszéria alakját jellemző dimenzió nélküli szám (modern elektromos autóknál 0,20–0,30), **A** a homlokfelület (2,0–2,6 m²). A két tényező szorzata, a `c_w · A` jellemzi az autót igazán: egy nagy, de áramvonalas SUV légellenállása is lehet nagyobb egy kicsi, de szögletes autóénál. Szembeszélben a levegőhöz viszonyított sebességgel kell számolni.',
        example: 'c_w = 0,25, A = 2,3 m²: 100 km/h-nál `F_l ≈ 266 N`, `P_l ≈ 7,4 kW`; 130 km/h-nál `F_l ≈ 450 N`, `P_l ≈ 16,2 kW`. 30%-kal nagyobb sebességhez 2,2-szer akkora teljesítmény kell.',
        pitfall: '„Kétszer gyorsabban, kétszer annyi fogyasztás” – nem: kétszeres sebességnél a légellenállási erő és így a km-enkénti energiaigény **négyszeres**, a teljesítményigény **nyolcszoros**.',
        formulas: ['menetellenallas-ero'],
        related: ['menetellenallas', 'gordulesi-ellenallas'] },
      { id: 'emelkedesi-ellenallas', term: 'Emelkedési ellenállás', en: 'gradient (climbing) resistance', topic: 'hajtaslanc', short: 'A nehézségi erő útpályával párhuzamos összetevője: F_e = m · g · sin α; emelkedőn akadályozza, lejtőn segíti a haladást.',
        text: 'Az emelkedőt százalékban adják meg: `p% = 100 · tg α`. Kis szögekre `sin α ≈ tg α`, így 6%-os emelkedőn `F_e ≈ 0,06 · m · g`. A felfelé befektetett munka helyzeti energiaként tárolódik, amelynek egy része lejtmenetben **rekuperációval** visszanyerhető.',
        example: '1800 kg, 6%-os emelkedő: `F_e ≈ 1060 N`, ez 100 km/h-nál önmagában 29 kW. 500 m szintemelkedés energiaigénye `m · g · h ≈ 8,8 MJ ≈ 2,45 kWh`.',
        pitfall: 'A 100%-os emelkedő nem függőleges fal, hanem 45°-os lejtő (tg 45° = 1).',
        formulas: ['menetellenallas-ero'],
        related: ['menetellenallas', 'rekuperacio', 'gordulesi-ellenallas'] },

      /* ---------- Villamos hajtás ---------- */
      { id: 'pmsm', prereq: ['lecke:elektromos-auto/motor-inverter'], term: 'Állandó mágneses szinkronmotor (PMSM)', en: 'permanent magnet synchronous motor', topic: 'hajtas', short: 'Háromfázisú szinkronmotor, amelynek forgórész-mezőjét állandó mágnesek (jellemzően NdFeB) adják; a forgórész a frekvenciaváltó által létrehozott forgó mezővel szinkron forog.',
        text: 'A forgórészben nem folyik gerjesztőáram, ezért nincs forgórész-tekercsveszteség: a hatásfok a legjobb munkapontban 96–97%, a teljesítménysűrűség nagy. A **beágyazott mágneses** (IPM) kivitel a mágneses nyomaték mellett reluktancianyomatékot is hasznosít, és jobban bírja a mezőgyengítést. A szabályozáshoz pontos forgórész-helyzet kell (rezolver vagy jeladó).\n\nHátrányai: ritkaföldfém-függőség, a mágnesek hőérzékenysége (lemágneseződés), és hogy forgás közben mindig feszültséget indukál.',
        pitfall: '„Szinkronmotor = állandó fordulatszám.” Csak állandó frekvenciájú hálózaton; a járműben az inverter a frekvenciát folyamatosan változtatja, így a fordulatszám nulla és a maximum között bármekkora lehet.',
        related: ['aszinkron-motor', 'inverter', 'foc', 'mezogyengites', 'hatasfok', 'nyomatek'], models: ['elektromos-auto'] },
      { id: 'aszinkron-motor', term: 'Aszinkron (indukciós) hajtómotor', en: 'induction motor (traction)', topic: 'hajtas', short: 'Kalickás forgórészű háromfázisú motor, amelyben a forgórészáramot a forgó mező indukálja, így nyomatékot csak szlippel fejt ki; mágnes nélküli, robusztus hajtómotor.',
        text: 'Nem tartalmaz ritkaföldfém-mágnest, nagy túlterhelést és magas hőmérsékletet is elvisel. Mivel árammentes állapotban nem indukál feszültséget, kikapcsolva szinte nincs vonszolási vesztesége: ezért gyakori a kéttengelyes hajtások **másodlagos tengelyén**, amely csak nagy teljesítményigénynél kapcsol be.\n\nA forgórész-tekercsveszteség miatt részterhelésen a hatásfoka elmarad a PMSM-étől. Szabályozása szintén mezőorientált, a fluxus helyzetét azonban becsülni kell (szlipfrekvencia-számítás).',
        pitfall: 'A „szlip” itt nem a kerék megcsúszása, hanem a forgórész lemaradása a forgó mezőhöz képest.',
        related: ['pmsm', 'inverter', 'foc', 'hatasfok'], models: ['elektromos-auto'] },
      { id: 'inverter', prereq: ['lecke:elektromos-auto/motor-inverter', 'modell:tranzisztor'], term: 'Hajtásinverter', en: 'traction inverter', topic: 'hajtas', short: 'Teljesítményelektronikai átalakító, amely az akkumulátor egyenfeszültségéből változtatható frekvenciájú és amplitúdójú háromfázisú feszültséget állít elő a motornak; fékezéskor fordított irányban működik.',
        visual: invSvg, caption: 'B6-híd: három hídág, hídáganként két kapcsoló (IGBT vagy SiC MOSFET, antiparalel diódával), a DC-oldalon puffer-kondenzátorral.',
        text: 'A hat félvezető kapcsolót PWM-mel vezérlik, jellemzően 8–20 kHz-en. A régebbi 400 V-os rendszerekben főleg **szilícium IGBT**, a 800 V-os rendszerekben egyre inkább **szilícium-karbid (SiC) MOSFET** dolgozik, amelynek kisebbek a kapcsolási veszteségei. Az inverter hatásfoka 97–99%.\n\nAz inverter kétirányú: motoros üzemben a DC-oldalról a motorba, generátoros üzemben (rekuperáció) a motorból az akkumulátorba viszi az energiát.',
        pitfall: 'Ha egy hídág felső és alsó kapcsolója egyszerre vezet, a DC-kör rövidre záródik (átvezetés, angolul shoot-through). Ezért a kapcsolások közé **holtidőt** iktatnak, ami viszont kis feszültségtorzítást okoz.',
        related: ['pwm', 'foc', 'pmsm', 'aszinkron-motor', 'rekuperacio', 'hatasfok'], models: ['tranzisztor', 'elektromos-auto'] },
      { id: 'pwm', term: 'Impulzusszélesség-moduláció (PWM)', en: 'pulse-width modulation', topic: 'hajtas', short: 'Kapcsolóüzemű vezérlési eljárás: állandó kapcsolási frekvencián az impulzusok kitöltési tényezőjét változtatva állítjuk be a kimenet átlagos (alapharmonikus) feszültségét.',
        visual: pwmSvg, caption: 'Szinuszos PWM: a referencia és a háromszög vivőjel összehasonlítása adja a kapcsolási pillanatokat.',
        text: 'A **kitöltési tényező** `D = t_be / T`. Egy hídág kimenetének átlagfeszültsége a kapcsolási periódusra `D · U_DC` (a negatív sínhez képest). Ha D-t szinuszosan változtatjuk, a kimenet alapharmonikusa szinuszos lesz; a motor tekercseinek induktivitása kisimítja az áramot.\n\nA járműinverterek többnyire **térvektor-modulációt** (SVPWM) használnak, amellyel a szinuszos PWM-hez képest kb. 15%-kal nagyobb kimenő feszültség érhető el ugyanabból a DC-feszültségből.',
        example: 'U_DC = 400 V, D = 0,6: az átlagfeszültség `240 V`. 10 kHz-es kapcsolásnál a periódusidő `100 µs`.',
        pitfall: 'Nagyobb kapcsolási frekvencia simább áramot és csendesebb motort ad, de a kapcsolási veszteség a frekvenciával arányosan nő. A választás mindig kompromisszum.',
        related: ['inverter', 'foc'], models: ['tranzisztor'] },
      { id: 'foc', term: 'Mezőorientált szabályozás (FOC)', en: 'field-oriented control (vector control)', topic: 'hajtas', short: 'Motorszabályozási eljárás, amely a háromfázisú állórész-áramokat a forgórész fluxusához kötött, vele együtt forgó d–q koordináta-rendszerbe transzformálja, így a fluxusképző (i_d) és a nyomatékképző (i_q) áramösszetevő külön szabályozható.',
        visual: focSvg, caption: 'A d tengely a forgórész fluxusának irányába mutat, a q tengely erre merőleges. Az ábrán a fluxusképző áramösszetevő negatív: ez a mezőgyengítés.',
        text: 'Lépései:\n1. a mért fázisáramokat a **Clarke-transzformáció** két tengelyre (α, β) vetíti;\n2. a **Park-transzformáció** a forgórész θ szöghelyzetével átviszi őket a forgó d–q rendszerbe, ahol állandósult állapotban egyenmennyiségek lesznek;\n3. két PI-szabályozó beállítja i_d-t és i_q-t;\n4. a kimenetet visszatranszformálják, és PWM-mel az inverter előállítja.\n\nÍgy a váltakozó áramú motor úgy szabályozható, mint egy külső gerjesztésű egyenáramú motor. PMSM nyomatéka: `M = 3/2 · p · (Ψ_PM · i_q + (L_d − L_q) · i_d · i_q)`.',
        pitfall: 'A d–q transzformációhoz a forgórész pontos szöghelyzete kell. Ha a rezolver nullpontja (offsetje) pontatlan, a nyomaték kisebb és a veszteség nagyobb lesz, mint amit a szabályozó „gondol”.',
        related: ['pwm', 'inverter', 'pmsm', 'aszinkron-motor', 'mezogyengites'] },
      { id: 'mezogyengites', term: 'Mezőgyengítés', en: 'field weakening', topic: 'hajtas', short: 'Az alapfordulatszám feletti üzemmód, amelyben a gép eredő fluxusát csökkentve a motorban indukált feszültség az inverter által kiadható feszültség alatt tartható; ekkor a nyomaték csökken, a teljesítmény közel állandó.',
        visual: fwSvg, caption: 'Villamos hajtás burkológörbéje: az alapfordulatszámig a nyomaték, felette a teljesítmény a korlát.',
        text: 'A motorban indukált feszültség a fluxussal és a fordulatszámmal arányos (`U_i ∝ Ψ · ω`). Az **alapfordulatszámon** ez eléri az akkumulátor-feszültségből kiadható maximumot. Afölött a fluxust csökkenteni kell: aszinkron motornál a mágnesező áramot csökkentik, PMSM-nél **negatív i_d árammal** ellensúlyozzák a mágnes fluxusát.\n\nA széles állandó teljesítményű tartomány miatt elegendő egyetlen áttételi fokozat. Nagyon nagy fordulatszámon a teljesítmény is csökkenni kezd.',
        pitfall: 'Mezőgyengítéskor a mágnes nem gyengül, csak az állórész-áram egy része a mágnes fluxusa ellen dolgozik. Ha nagy fordulatszámon az inverter hirtelen leáll, a mágnes indukált feszültsége meghaladhatja a DC-feszültséget, és nem szabályozott visszatáplálás jön létre: ezt a védelmeknek kezelniük kell.',
        formulas: ['hajtasteljesitmeny'],
        related: ['foc', 'pmsm', 'nyomatek', 'inverter'] },

      /* ---------- Akkumulátor ---------- */
      { id: 'cellakemia', prereq: ['lecke:fizika/atom', 'modell:akkucella'], term: 'Cellakémia: NMC és LFP', en: 'cell chemistry: NMC vs LFP', topic: 'akku', short: 'A lítiumion-cellák katódanyag szerinti fő típusai: az NMC (nikkel-mangán-kobalt-oxid) nagy energiasűrűségű, az LFP (lítium-vas-foszfát) olcsóbb, ciklusállóbb és termikusan stabilabb, de kisebb energiasűrűségű.',
        text: 'Mindkettőben az anód többnyire grafit; töltéskor a lítiumionok a katódból az anódba vándorolnak.\n\n- **NMC**: névleges feszültség ≈ 3,6–3,7 V, cellaszinten kb. 200–280 Wh/kg, nikkelt és kobaltot tartalmaz.\n- **LFP**: névleges feszültség ≈ 3,2 V, kb. 150–200 Wh/kg, több ezer teljes ciklus, nincs benne nikkel és kobalt, a hőmegfutás kockázata kisebb, de hidegben gyengébb, és lapos feszültséggörbéje nehezíti a töltöttség becslését.\n\nCellaformák: **hengeres** (21700, 4680), **prizmatikus** és **tasakos** (pouch).',
        pitfall: 'Az ajánlott töltési szokás kémiánként eltér: NMC-nél a mindennapokban gyakran 80% a javasolt felső határ, LFP-nél a gyártók rendszeres 100%-os töltést is javasolnak, hogy a BMS kalibrálni tudja a töltöttségi becslést.',
        related: ['soc', 'hofutas', 'bms', 'soh', 'belso-ellenallas', 'cc-cv'], models: ['akkucella'] },
      { id: 'soc', term: 'Töltöttségi állapot (SOC)', en: 'state of charge', topic: 'akku', short: 'Az akkumulátorban aktuálisan tárolt, kivehető töltés a pillanatnyi teljes kapacitáshoz viszonyítva, százalékban: SOC = Q_akt / Q_max.',
        visual: socSvg, caption: 'Nyugalmi cellafeszültség a töltöttség függvényében. Az LFP lapos platóján a feszültségből nehéz a töltöttségre következtetni.',
        text: 'Az SOC közvetlenül nem mérhető, becsülni kell:\n- **áramintegrálás** (coulombszámlálás): pontos rövid távon, de a mérési hiba felhalmozódik;\n- **nyugalmi feszültség** (OCV) alapján: pihentetés után pontos, de terhelés alatt és az LFP platóján nem használható;\n- **modellalapú becslés** (például Kálmán-szűrő), amely a kettőt egyesíti.\n\nA kijelzett SOC általában a **nettó** (felhasználható) kapacitásra vonatkozik; a gyártó alul és felül puffert hagy.',
        example: '60 kWh nettó kapacitás, 20% → 80%: `0,6 · 60 = 36 kWh` töltődik be.',
        pitfall: 'Az SOC és a hátralévő hatótáv nem arányos egymással: a fogyasztás a sebességtől, a hőmérséklettől és a domborzattól függ. Az SOC-t ne keverd össze az SOH-val sem: egy 100%-ra töltött öreg akkumulátor is „100%-os” SOC-jú.',
        formulas: ['akku-energia'],
        related: ['soh', 'bms', 'cellakemia', 'cc-cv', 'c-rata', 'cellakiegyenlites'] },
      { id: 'soh', term: 'Egészségi állapot (SOH)', en: 'state of health', topic: 'akku', short: 'Az akkumulátor öregedését jellemző mutató, jellemzően a jelenlegi és a névleges kapacitás aránya, néha a belső ellenállás növekedése alapján.',
        text: 'Az öregedés két fő formája:\n- **naptári öregedés**: tárolás közben is zajlik, gyorsítja a magas SOC és a magas hőmérséklet;\n- **ciklusos öregedés**: használat közben; gyorsítja a nagy kisütési mélység (DoD), a nagy C-ráta és főleg a **hidegben, nagy árammal végzett töltés**, amely lítiumkiválást okozhat.\n\nA fő mechanizmus az anód felületén növekvő SEI-réteg, amely aktív lítiumot köt meg. Járművekben a SOH 70–80% körül éri el az élettartam végét; ezután az akkumulátor helyhez kötött tárolóként (második élet) még használható. A gyártói garancia jellemzően 8 év vagy 160 000 km, 70% SOH-ra.',
        example: 'Egy 75 kWh-s új akkumulátor mért kapacitása 67,5 kWh: `SOH = 90%`.',
        pitfall: 'Az SOH-t nem lehet a kijelzett töltöttségből leolvasni: megállapításához teljes kapacitásmérés vagy a BMS modellalapú becslése kell.',
        related: ['soc', 'belso-ellenallas', 'c-rata', 'bms', 'cellakemia', 'v2g'] },
      { id: 'c-rata', term: 'C-ráta', en: 'C-rate', topic: 'akku', short: 'A töltő- vagy kisütőáram a cella névleges kapacitására vonatkoztatva: 1C az az áram, amely egy óra alatt töltené vagy sütné ki a teljes kapacitást.',
        text: 'A C-ráta teszi összehasonlíthatóvá a különböző méretű cellák terhelését. Az energiacellák (nagy kapacitás) jellemzően 1–3C-t, a teljesítménycellák (hibrid autók) akár 20–30C-t is elviselnek rövid ideig. Nagy C-rátánál nő a belső ellenálláson fejlődő hő, töltésnél (különösen hidegben) a lítiumkiválás veszélye.',
        formulas: ['c-rata'],
        example: '77 kWh-s akkumulátor 175 kW-os csúcsteljesítménnyel töltve: kb. `2,3C`. Ugyanez 11 kW-os AC-töltéssel: `0,14C`.',
        pitfall: 'A C-ráta áram/kapacitás (A/Ah) arány. Csomagszinten a kW/kWh közelítés csak akkor jó, ha a feszültség közel a névleges értéken van.',
        related: ['belso-ellenallas', 'cc-cv', 'soh', 'kw-kwh', 'ccs'] },
      { id: 'belso-ellenallas', term: 'Belső ellenállás', en: 'internal resistance', topic: 'akku', short: 'A cella kapocsfeszültségének terhelés hatására bekövetkező esését okozó, ohmos, töltésátadási és diffúziós összetevőkből álló ellenállás; meghatározza a hőfejlődést és a leadható teljesítményt.',
        text: 'Kisütéskor a kapocsfeszültség a nyugalmi feszültség alá esik, töltéskor fölé emelkedik. A belső ellenálláson `I² · R_b` hő fejlődik, ezért a nagy áramú töltéshez hatékony hűtés kell.\n\nA belső ellenállás **hidegben** erősen nő (−10 °C-on akár a szobahőmérsékleti többszöröse), és az öregedéssel is növekszik. Ezért ad télen kisebb teljesítményt és tölt lassabban az elektromos autó: a BMS korlátozza az áramot, amíg az akkumulátor fel nem melegszik.',
        formulas: ['akku-kapocsfeszultseg'],
        pitfall: 'Hidegben az akkumulátorban nem „kevesebb az energia”: a cellák kapacitása kissé csökken, de a fő ok a megnövekedett belső ellenállás miatti feszültségesés és veszteség, valamint a fűtés energiaigénye.',
        related: ['c-rata', 'soh', 'hofutas', 'hatasfok', 'cellakemia'] },
      { id: 'bms', prereq: ['lecke:elektromos-auto/akkumulator-bms', 'modell:akkucella'], term: 'Akkumulátor-felügyeleti rendszer (BMS)', en: 'battery management system', topic: 'akku', short: 'Elektronikai és szoftveres rendszer, amely méri a cellák feszültségét, áramát és hőmérsékletét, becsli az SOC-t és SOH-t, korlátozza a töltést és kisütést, kiegyenlíti a cellákat, és veszély esetén leválasztja az akkumulátort.',
        text: 'Fő feladatai:\n- cellafeszültségek és hőmérsékletek mérése (modulonként egy-egy mérőegység, központi vezérlővel);\n- SOC-, SOH- és teljesítménybecslés, a megengedett töltő- és kisütőáram kiszámítása és közlése a töltővel és a hajtással;\n- cellakiegyenlítés;\n- a fő kontaktorok és az előtöltő kör vezérlése, szigetelésfelügyelet;\n- hibakezelés és naplózás.\n\nA BMS biztonságkritikus rendszer: fejlesztése az ISO 26262 funkcionális biztonsági szabvány szerint történik.',
        related: ['soc', 'soh', 'cellakiegyenlites', 'hofutas', 'cc-cv', 'v2g'], models: ['akkucella', 'elektromos-auto'] },
      { id: 'cellakiegyenlites', term: 'Cellakiegyenlítés (balanszolás)', en: 'cell balancing', topic: 'akku', short: 'A sorba kapcsolt cellák töltöttségének kiegyenlítése, hogy a legjobban vagy legkevésbé feltöltött cella ne korlátozza a teljes csomag használható kapacitását.',
        visual: balSvg, caption: 'A 4. cella elérte a felső feszültséghatárt, ezért a töltés leáll, pedig a többi cella még nincs tele.',
        text: 'A sorba kötött cellákon ugyanaz az áram folyik, de az önkisülésük, a kapacitásuk és a hőmérsékletük kissé eltér, így a töltöttségük idővel szétválik.\n\n- **Passzív kiegyenlítés**: a magasabb töltöttségű cellákat egy-egy ellenálláson kisütik (hővé alakítják a többletet), jellemzően a töltés végén. Egyszerű és olcsó, de lassú (50–200 mA) és veszteséges.\n- **Aktív kiegyenlítés**: kondenzátoros, induktív vagy DC-DC átalakítós áramkör viszi át az energiát a magasabb töltöttségű cellákból az alacsonyabbakba.',
        pitfall: 'A kiegyenlítés a töltöttségi különbséget szünteti meg, a kisebb **kapacitású** (gyengébb) cellát nem javítja meg; ilyenkor a csomag kapacitását a leggyengébb cella szabja meg.',
        related: ['bms', 'soc', 'cc-cv'] },
      { id: 'hofutas', term: 'Hőmegfutás', en: 'thermal runaway', topic: 'akku', short: 'Önfenntartó, gyorsuló hőtermelő folyamat a cellában: a hőmérséklet-emelkedés további bomlási reakciókat indít, amelyek még több hőt termelnek; tűzhöz, mérgező gázok kibocsátásához, akár robbanáshoz vezethet.',
        text: 'Kiváltó okok: **belső zárlat** (gyártási szennyeződés, dendritképződés), mechanikai sérülés (ütközés, átszúrás), túltöltés, külső hő. A folyamat jellemző lépcsői: a SEI-réteg bomlása (kb. 80–120 °C), a szeparátor megolvadása (kb. 130 °C), a katód bomlása oxigénfelszabadulással. NMC-nél ez kisebb hőmérsékleten és hevesebben indul, mint LFP-nél.\n\nA legnagyobb veszély a **továbbterjedés** a szomszédos cellákra. Védekezés: hűtés, hőgátló rétegek a cellák között, nyomáskiegyenlítő szelepek, BMS-felügyelet, és a jogszabályi előírás szerint az utasokat figyelmeztetni kell, mielőtt veszélyes helyzet állna elő.',
        pitfall: 'Az eloltottnak látszó akkumulátortűz órák vagy napok múlva újra fellángolhat, mert a sérült cellákban a reakció tovább folyik. Az égő akkumulátort nagy mennyiségű vízzel kell tartósan hűteni.',
        related: ['cellakemia', 'bms', 'belso-ellenallas', 'c-rata'], models: ['akkucella'] },

      /* ---------- Töltés és energiamenedzsment ---------- */
      { id: 'cc-cv', term: 'CC-CV töltés', en: 'constant current – constant voltage charging', topic: 'toltes', short: 'A lítiumion-cellák szabványos töltési eljárása: először állandó árammal (CC) töltünk a töltési végfeszültségig, majd azon a feszültségen tartva (CV) az áram fokozatosan csökken a lezárási küszöbig.',
        visual: ccSvg, caption: 'CC-CV töltés: a CC-szakasz végére kb. 80%-os a töltöttség, a maradékhoz csökkenő árammal hosszabb idő kell.',
        text: 'A töltési végfeszültség NMC-nél jellemzően 4,2 V, LFP-nél 3,65 V cellánként; ennek túllépése gyorsítja az öregedést és veszélyes. A CV-szakaszban a feszültség állandó, az áram a belső ellenálláson eső feszültség csökkenésével exponenciálisan fogy.\n\nJárműben a DC-gyorstöltés valójában **többlépcsős**: a BMS a hőmérséklettől és az SOC-tól függően folyamatosan előírja a megengedett áramot (töltési görbe), a CV-szakasz csak a legvégén jelenik meg.',
        pitfall: 'Az, hogy 80% fölött lelassul a töltés, nem a töltőoszlop hibája, hanem a cellák védelme. Hosszú úton ezért gyakran gyorsabb kétszer 10→70%-ig tölteni, mint egyszer 10→100%-ig.',
        related: ['c-rata', 'soc', 'bms', 'ac-dc-toltes', 'ccs', 'belso-ellenallas', 'cellakiegyenlites'] },
      { id: 'ac-dc-toltes', term: 'AC és DC töltés', en: 'AC vs DC charging', topic: 'toltes', short: 'AC-töltéskor a jármű fedélzeti töltője (OBC) alakítja egyenárammá a hálózati váltakozó áramot; DC- (gyors)töltéskor a töltőállomás végzi az átalakítást, és közvetlenül az akkumulátorra ad egyenáramot.',
        text: '- **AC**: egyfázisú 3,7–7,4 kW, háromfázisú 11 kW (16 A) vagy 22 kW (32 A). A sebességet a töltő, a hálózati csatlakozás és a fedélzeti töltő közül a leggyengébb határozza meg.\n- **DC**: 50–400 kW; a töltőállomás a BMS-től kapott áram- és feszültségigényt valósítja meg.\n\nTöltési módok (IEC 61851): **Mode 2** – háztartási dugaljról, kábelbe épített védőegységgel; **Mode 3** – AC-töltőoszlop vagy fali töltő (wallbox) vezérlőjellel; **Mode 4** – DC-töltés.',
        example: 'Háromfázisú 16 A-es csatlakozás: `P = 3 · 230 · 16 ≈ 11 kW`. Egyfázisú 16 A: `3,7 kW`.',
        pitfall: 'A 22 kW-os fali töltő önmagában nem gyorsít: ha az autó fedélzeti töltője 11 kW-os (vagy csak egyfázisú), annyival tölt. A háztartási dugalj tartós 10–16 A-es terhelésre gyakran nincs méretezve: a melegedés tüzet okozhat.',
        formulas: ['toltesi-ido'],
        related: ['ccs', 'kw-kwh', 'cc-cv', 'v2g', 'c-rata'] },
      { id: 'ccs', term: 'CCS (Combined Charging System)', en: 'Combined Charging System', topic: 'toltes', short: 'Az Európában szabványos töltőcsatlakozó-rendszer, amely a Type 2 AC-csatlakozót két nagyáramú DC-érintkezővel egészíti ki (CCS2), így ugyanazon az aljzaton AC- és DC-töltés is lehetséges.',
        text: 'A jármű és a töltő a vezérlő érintkezőn (CP) keresztül, a DC-töltésnél nagyfrekvenciás vivőjelen (PLC, HomePlug Green PHY) kommunikál a **DIN 70121** vagy az **ISO 15118** szabvány szerint. Utóbbi lehetővé teszi a kártya nélküli azonosítást és fizetést (Plug & Charge).\n\nA nagy teljesítményű töltők 500 A-ig és 1000 V-ig dolgoznak, ehhez folyadékhűtésű kábel kell. Más rendszerek: CHAdeMO (Japán), NACS / SAE J3400 (Észak-Amerika), GB/T (Kína).',
        pitfall: 'A CCS1 (észak-amerikai, Type 1 alapú) és a CCS2 (európai, Type 2 alapú) mechanikailag nem kompatibilis. A töltés megkezdése előtt a töltő szigetelésvizsgálatot végez, ezért telik el néhány másodperc a csatlakoztatás és az áramfelvétel között.',
        related: ['ac-dc-toltes', 'cc-cv', 'v2g', 'c-rata', 'kw-kwh'] },
      { id: 'kw-kwh', prereq: ['lecke:elektromos-auto/toltes', 'lecke:fizika/energia-munka'], term: 'Teljesítmény és energia: kW és kWh', en: 'power vs energy (kW vs kWh)', topic: 'toltes', short: 'A kW a teljesítmény (az energiaátalakítás sebessége), a kWh az energia mennyiségének mértékegysége: 1 kWh = 1 kW teljesítmény egy órán át = 3,6 MJ.',
        text: '- **kWh**: az akkumulátor energiatartalma (például 60 kWh), a fogyasztás (kWh/100 km), a töltés díja.\n- **kW**: a motor teljesítménye (150 kW), a töltő teljesítménye (11 kW, 150 kW).\n\nA kettő kapcsolata az idő: `energia = teljesítmény · idő`, ebből adódik a töltési idő és a hatótáv becslése.',
        formulas: ['akku-energia', 'toltesi-ido'],
        example: '15 kWh/100 km fogyasztásnál 60 kWh-val `400 km` tehető meg. 11 kW-os AC-töltéssel 36 kWh betöltése kb. `3,6 h` (90%-os hatásfokkal).',
        pitfall: 'A „kW/h” jelölés hibás (ez a teljesítmény változási sebessége lenne). A kWh nem teljesítmény, hanem energia: a „100 kWh-s motor” értelmetlen kifejezés.',
        related: ['ac-dc-toltes', 'c-rata', 'hatasfok', 'ccs'] },
      { id: 'v2g', term: 'V2G (jármű–hálózat kapcsolat)', en: 'vehicle-to-grid', topic: 'toltes', short: 'Kétirányú töltés, amelyben a jármű akkumulátora a hálózat igénye szerint energiát táplálhat vissza a villamosenergia-rendszerbe (csúcsidőszaki kiegyenlítés, rendszerszintű szolgáltatások).',
        text: 'Rokon fogalmak: **V2H** (az autó a háztartást táplálja), **V2L** (az autó 230 V-os aljzatán fogyasztó működtethető). V2G-hez kétirányú töltő kell: DC-oldalon a töltőoszlopban, AC-oldalon kétirányú fedélzeti töltővel; a kommunikációt az ISO 15118-20 szabvány írja le. A visszatáplálónak meg kell felelnie a hálózati csatlakozási előírásoknak (például szigetüzem elleni védelem).\n\nAz autók nagy része idejének túlnyomó részében áll, így sok jármű együtt (aggregátoron keresztül) jelentős rugalmas tárolókapacitást jelenthet a megújuló energiaforrások ingadozásának kiegyenlítésére.',
        example: '1000 csatlakoztatott autó egyenként 10 kW-tal `10 MW` szabályozási teljesítményt adhat, ami egy kisebb erőmű nagyságrendje.',
        pitfall: 'A V2L nem V2G: a V2L csak helyi fogyasztót táplál, nem kapcsolódik párhuzamosan a hálózattal. A többlet ciklusok öregítik az akkumulátort, ezért a BMS és a szerződés korlátozza a V2G-ben felhasználható SOC-tartományt.',
        related: ['ac-dc-toltes', 'ccs', 'bms', 'rekuperacio', 'soh', 'inverter'] },
      { id: 'rekuperacio', term: 'Rekuperáció (energia-visszanyerő fékezés)', en: 'regenerative braking', topic: 'toltes', short: 'Fékezéskor és lejtmenetben a villamos gép generátorként működik: a jármű mozgási és helyzeti energiáját villamos energiává alakítja, és visszatölti az akkumulátorba.',
        text: 'A hajtásinverter ilyenkor fordított irányban dolgozik, a motor negatív nyomatékot ad. A visszanyerhető teljesítményt korlátozza:\n- az akkumulátor töltőteljesítmény-korlátja (hidegen és teli akkumulátornál kicsi);\n- kis sebességnél a gép csökkenő hatásfoka;\n- hogy csak a hajtott tengely fékezhető vele, és a menetstabilitás.\n\nA fékrendszer a súrlódó és a villamos fékezést összehangolja (**brake blending**). Egypedálos vezetésnél a gázpedál felengedése már erős rekuperációs fékezést ad.',
        example: '1800 kg-os autó 90 km/h-ról (25 m/s) megállva: `E_kin = ½ · 1800 · 25² ≈ 563 kJ ≈ 0,16 kWh`. Kb. 65%-os oda-vissza hatásfokkal ebből kb. 0,1 kWh hasznosul újra.',
        pitfall: 'A rekuperáció nem „termel” energiát: csak a korábban befektetett mozgási vagy helyzeti energia egy részét nyeri vissza. Teljesen feltöltött akkumulátorral induló lejtmenetnél a rekuperáció korlátozott, ilyenkor a súrlódó fék dolgozik.',
        related: ['inverter', 'menetellenallas', 'emelkedesi-ellenallas', 'hatasfok', 'bms', 'pmsm', 'v2g'], models: ['elektromos-auto'] },
      /* ---------- Bővítés: öregedés, töltési kommunikáció, hő, rendszerszint ---------- */
      { id: 'akku-oregedes', term: 'Akkumulátor-öregedés mechanizmusai', en: 'battery degradation mechanisms', topic: 'akku', prereq: ['e-mobilitas/soh', 'e-mobilitas/cellakemia', 'kemia-bsc/aktivalasi-energia'], models: ['akkucella'],
        short: 'A lítiumion-cellák kapacitásvesztését és ellenállás-növekedését okozó fizikai-kémiai folyamatok összessége: a használható lítium elvesztése, az aktív anyag elvesztése és a vezetőképesség romlása.',
        text: 'A degradációt három **következménycsoportba** sorolják, amelyekhez különböző mechanizmusok vezetnek:\n\n1. **Ciklizálható lítium elvesztése (LLI):** a legfontosabb a **SEI-réteg** (szilárd elektrolit-határfelület) növekedése az anód felületén. A SEI az első töltéskor keletkezik és védi az anódot, de lassan tovább vastagszik, közben lítiumot és elektrolitot köt meg. Ide tartozik a **lítiumkiválás** is.\n2. **Aktív anyag elvesztése (LAM):** a részecskék a lítium be- és kiépülésekor tágulnak és zsugorodnak; a mechanikai feszültség **repedéseket** okoz, a részecskék elveszíthetik elektromos kapcsolatukat. A katódból átmenetifém-ionok oldódhatnak ki, magas feszültségen a katód szerkezete átrendeződhet.\n3. **Ellenállás-növekedés:** vastagabb SEI, elektrolitbomlás, kontaktusromlás → kisebb teljesítmény, több hő.\n\n**Naptári öregedés** (használat nélkül is) – fő gyorsítói: magas **hőmérséklet** (Arrhenius-jellegű függés) és magas **töltöttség** (a nagy anódpotenciál-különbség gyorsítja a mellékreakciókat). Időfüggése gyakran közel `√t`-s.\n\n**Ciklikus öregedés** – fő gyorsítói: nagy **kisütési mélység** és nagy SOC-ablak, nagy **C-ráta**, töltés **hidegben**, magas felső feszültséghatár.\n\nAz öregedés jellemző lefutása: kezdeti gyorsabb szakasz (SEI kialakulása), hosszú, közel lineáris szakasz, majd egyes celláknál a lítiumkiválás vagy az aktív anyag fogyása miatt gyorsuló „könyök”.\n\n**Gyakorlati következmények:** tartós parkolás közepes töltöttségen, árnyékban; a napi használatban nem szükséges 100%-ig tölteni; a gyorstöltés előtti akkumulátor-előmelegítés; a gyártó által hagyott pufferkapacitás a cellák szélső tartományainak elkerülésére. Az öregedés mértékét a cellakémia is erősen befolyásolja (például az LFP általában több ciklust bír, mint az NMC).',
        formulas: ['arrhenius', 'naptari-oregedes'],
        example: 'Két egyforma autó: az egyik egész nyáron 100%-on áll napon (akkuhőmérséklet 40 °C), a másik 50%-on, garázsban (20 °C). A hőmérséklet önmagában – kb. 50 kJ/mol aktiválási energiával számolva – nagyjából 3,7-szeres naptári öregedési sebességet ad, a magas SOC ezt tovább növeli.',
        pitfall: 'Nem egyetlen „ciklusszám” határozza meg az élettartamot: két 50%-os részciklus kevésbé öregít, mint egy 100%-os teljes ciklus, és a hőmérséklet gyakran fontosabb, mint a ciklusok száma. A kijelzett hatótáv csökkenése nem mindig öregedés – hidegben a pillanatnyi kapacitás és teljesítmény is visszafordíthatóan csökken.',
        related: ['soh', 'litium-kivalas', 'cellakemia', 'c-rata', 'hokezeles', 'belso-ellenallas'], tags: ['akkumulátor', 'élettartam'] },
      { id: 'litium-kivalas', term: 'Lítiumkiválás (lithium plating)', en: 'lithium plating', topic: 'akku', prereq: ['e-mobilitas/akku-oregedes', 'kemia-bsc/elektrodpotencial'],
        short: 'Töltés közben a lítiumionok nem épülnek be a grafitanódba, hanem fémes lítiumként válnak ki annak felületén; kapacitásvesztést és dendritnövekedés esetén belső zárlatveszélyt okoz.',
        text: 'Töltéskor a lítiumionok az anód grafitrétegei közé épülnek be (interkaláció). Ha a beépülés nem tud lépést tartani az érkező ionárammal, az anód potenciálja a **Li/Li⁺ referenciához képest 0 V alá** csökken, és termodinamikailag kedvezőbbé válik a fémes lítium kiválása a felületen.\n\n**Kockázatot növelő tényezők:**\n\n- **alacsony hőmérséklet:** lassul a diffúzió a grafitban és az ionvezetés az elektrolitban, nő a töltésátadási ellenállás;\n- **nagy töltőáram** (C-ráta);\n- **magas töltöttség:** a teli anód nehezebben fogad lítiumot;\n- cellán belüli egyenetlenségek (helyi túlterhelés a cellák szélein, rossz anód–katód kapacitásarány), öregedés miatt csökkenő anódkapacitás.\n\n**Következmények:**\n\n- a kivált lítium egy része pihentetéskor visszaoldódik (reverzibilis rész), egy része azonban elveszíti kapcsolatát (**„halott lítium”**), vagy új SEI képződésével megkötődik → végleges kapacitásvesztés;\n- tűszerű **dendritek** nőhetnek, amelyek átszúrhatják a szeparátort → belső zárlat, hőmegfutás;\n- a fémes lítium reakcióképes, rontja a cella biztonsági viselkedését ütközéskor vagy túlmelegedéskor.\n\n**Védekezés:** a BMS hőmérséklet- és SOC-függő **töltőáram-korlátokat** alkalmaz (hidegben erősen csökkentett töltés), az akkumulátort gyorstöltés előtt **előmelegítik**, a töltési profilokat (CC-CV, többlépcsős CC) a lítiumkiválás határán belül tervezik. Diagnosztika: töltés utáni pihentetéskor a feszültséggörbén megjelenő „platóból” vagy a dV/dt alakjából lehet a visszaoldódásra következtetni.',
        example: 'Ugyanaz az autó 25 °C-on 2C-vel tölthető, –10 °C-on viszont a BMS jellemzően csak töredék áramot enged, amíg az akkumulátor fel nem melegszik. Ezért tart télen előmelegítés nélkül sokkal tovább a gyorstöltés.',
        pitfall: 'Nem a hideg **kisütés**, hanem a hideg **töltés** veszélyes a lítiumkiválás szempontjából. Hidegben a rekuperáció is töltés: ezért korlátozza azt a jármű, amíg az akkumulátor hideg.',
        related: ['akku-oregedes', 'hofutas', 'cc-cv', 'c-rata', 'hokezeles', 'bms'], tags: ['akkumulátor', 'biztonság'] },
      { id: 'cellaformatum', term: 'Cellaformátumok és akkumulátorcsomag-felépítés', en: 'cell formats and battery pack architecture', topic: 'akku', prereq: ['e-mobilitas/cellakemia', 'villamosmernoki/kirchhoff-2'], models: ['akkucella', 'elektromos-auto'],
        short: 'A lítiumion-cellák hengeres, hasáb (prizmatikus) vagy tasakos kivitelben készülnek; a cellákat sorosan és párhuzamosan kapcsolva (nSmP) modulokká és csomaggá szervezik, amely a jármű feszültségét, kapacitását és teljesítményét adja.',
        text: '**Cellaformátumok:**\n\n- **Hengeres:** feltekercselt elektródok fémházban. Gyártása nagyon kiforrott, egyenletes minőségű, mechanikailag stabil; sok kis cella → sok kötés és nagyobb felügyeleti igény, a hő a cella tengelye mentén nehezebben távozik. Jelölése a méretet adja: például a 18650 18 mm átmérőjű, 65 mm hosszú.\n- **Prizmatikus (hasáb):** hajtogatott vagy tekercselt elektródok merev, szögletes házban; jó térkitöltés, kevesebb, nagyobb cella.\n- **Tasakos (pouch):** rugalmas, alumínium-laminált fólia ház; könnyű, jó hőleadás nagy felületen, de a duzzadást és a mechanikai védelmet a modulnak kell biztosítania.\n\n**Kapcsolás – nSmP:** n cella **sorosan** adja a feszültséget, m cella **párhuzamosan** a kapacitást és az áramterhelhetőséget:\n\n`U_csomag = n · U_cella`, `Q_csomag = m · Q_cella`, `E = n · m · U_cella · Q_cella`.\n\nA párhuzamos cellák egymást kiegyenlítik, ezért egy „párhuzamos csoport” egy nagyobb cellaként viselkedik; a soros csoportok feszültségét viszont a BMS-nek egyenként kell mérnie és kiegyenlítenie.\n\n**Hierarchia:** cella → modul (mechanikai egység, hőelvezetés, cellafelügyelet) → csomag (ház, hűtés, kontaktorok, biztosíték, BMS). Az újabb „cella–csomag” (cell-to-pack) és „cella–karosszéria” megoldások a modulszintet elhagyják a jobb térkitöltésért.\n\n**A leggyengébb cella elve:** soros láncban a csomag akkor üres, ha az **első** cella eléri az alsó, és akkor teli, ha az első eléri a felső feszültséghatárt. A cellák közti eltérés így a teljes csomag használható kapacitását csökkenti.',
        example: '96S2P elrendezés 60 Ah-s, 3,65 V névleges feszültségű cellákból: `U ≈ 96 · 3,65 ≈ 350 V`, `Q = 2 · 60 = 120 Ah`, `E ≈ 350 · 120 ≈ 42 kWh`. 4,2 V-os cellánkénti töltési végfeszültségnél a csomag teljesen feltöltve ≈ 403 V.',
        pitfall: 'A párhuzamos kapcsolás nem helyettesíti a cellánkénti felügyeletet a soros irányban. Különböző állapotú vagy kémiájú cellák közvetlen párhuzamos összekötése nagy kiegyenlítő áramokat okozhat.',
        related: ['cellakemia', 'bms', 'cellakiegyenlites', 'hokezeles', 'akku-oregedes'], tags: ['akkumulátor', 'konstrukció'] },

      { id: 'control-pilot', term: 'Töltési kommunikáció: vezérlőjel (CP) és közelségérzékelés (PP)', en: 'charging communication: control pilot and proximity pilot', topic: 'toltes', prereq: ['e-mobilitas/ac-dc-toltes', 'e-mobilitas/pwm', 'villamosmernoki/ohm-torveny'],
        short: 'Az AC-töltés alapszintű kommunikációja egyetlen vezetéken zajlik: a töltőállomás egy ±12 V-os, 1 kHz-es négyszögjellel jelzi a megengedett áramot, a jármű ellenállásokkal terheli ezt a jelet, és így jelzi a saját állapotát; a közelségérzékelő ellenállás a kábel terhelhetőségét kódolja.',
        text: 'Az IEC 61851-1 szabvány szerinti **vezérlő vezeték (control pilot, CP)** egyszerű analóg „protokoll” – minden AC-töltés alapja:\n\n- A töltőállomás 1 kΩ-os ellenálláson át +12 V-ot ad a CP-vezetékre.\n- A jármű egy dióda után **ellenállásokat** kapcsol a CP és a védővezető közé; ezek a feszültséget meghatározott szintekre húzzák le:\n- **A állapot**, +12 V: nincs jármű csatlakoztatva;\n- **B állapot**, +9 V (2,74 kΩ): jármű csatlakoztatva, nem kér töltést;\n- **C állapot**, +6 V (további 1,3 kΩ párhuzamosan): töltés kérése;\n- **D állapot**, +3 V: töltés szellőztetést igénylő akkumulátorral;\n- **E, F állapot**: hiba (0 V, −12 V).\n- Amint jármű csatlakozik, az állomás a jelet **1 kHz-es PWM-re** váltja; a **kitöltési tényező** jelzi a megengedett maximális áramot. Az autó fedélzeti töltője legfeljebb ennyit vehet fel.\n- A dióda miatt a negatív félhullám –12 V marad; ha nem, az állomás hibát (rövidzárt, hiányzó diódát) érzékel.\n- A teljesítményt a kontaktor csak C (vagy D) állapotban kapcsolja; ha a kapcsolat megszakad, az állomás azonnal leold – a dugót így feszültségmentesen lehet kihúzni.\n\n**Proximity (PP):** a csatlakozóban a PP és a PE között ellenállás kódolja a **kábel áramterhelhetőségét** (például 1,5 kΩ: 13 A; 680 Ω: 20 A; 220 Ω: 32 A; 100 Ω: 63 A). A töltés áramát az állomás, a kábel és a fedélzeti töltő közül a legkisebb korlátozza.\n\n**Magas szintű kommunikáció:** DC-töltéshez és fejlett AC-funkciókhoz (automatikus azonosítás és fizetés, ütemezett töltés, kétirányú energiaáramlás) a CP-vezetéken nagyfrekvenciás, vivőfrekvenciás adatkapcsolat (powerline communication) működik, amelyet az ISO 15118 szabványcsalád ír le; erre az ~5%-os kitöltési tényező utal. Más DC-rendszerek CAN-buszt használnak. Az elv minden esetben azonos: a **jármű** (BMS) kéri a feszültséget és áramot, a **töltő** valósítja meg, és mindkét fél folyamatosan figyeli a biztonsági feltételeket.',
        formulas: ['pilot-aram'],
        example: 'A töltőállomás 50%-os kitöltésű PWM-et ad: `I_max = 50 · 0,6 = 30 A`. A csatlakoztatott kábel PP-ellenállása 680 Ω (20 A-es kábel), az autó fedélzeti töltője 16 A-es: a tényleges áram 16 A, a legkisebb korlát.',
        pitfall: 'A PWM kitöltése nem a töltési teljesítményt adja, hanem egy **felső korlátot**: az autó ennél kevesebbet is felvehet. Mode 2-es (kábelbe épített vezérlős) töltésnél a háztartási dugalj és vezeték állapota a szűk keresztmetszet, nem a jelzett áram.',
        related: ['ac-dc-toltes', 'ccs', 'pwm', 'fedelzeti-tolto', 'v2g', 'okos-toltes'], tags: ['töltés', 'kommunikáció', 'szabvány'] },
      { id: 'fedelzeti-tolto', term: 'Fedélzeti töltő (OBC) és teljesítménytényező-javítás', en: 'on-board charger and power factor correction', topic: 'toltes', prereq: ['e-mobilitas/ac-dc-toltes', 'elektronika/egyeniranyito', 'elektronika/kapcsolouzemu-tap'], models: ['elektromos-auto'],
        short: 'A jármű beépített teljesítményelektronikai átalakítója, amely AC-töltéskor a hálózati váltakozó áramot szabályozott egyenárammá alakítja az akkumulátor számára; jellemzően aktív PFC-fokozatból és galvanikusan leválasztott DC–DC átalakítóból áll.',
        text: 'Felépítése két fő fokozat:\n\n1. **Egyenirányító + aktív teljesítménytényező-javító (PFC):** egy egyszerű diódás egyenirányító pufferkondenzátorral csak a feszültségcsúcsok közelében, csúcsos impulzusokban venne fel áramot – sok felharmonikussal és rossz teljesítménytényezővel. A PFC egy gyorsan kapcsoló **boost-átalakító**, amelynek szabályozója úgy formálja a bemeneti áramot, hogy az a hálózati feszültséggel **arányos, szinuszos és fázisban** lévő legyen (λ ≈ 1). Kimenete egy szabályozott köztes egyenfeszültség (DC-link).\n2. **Galvanikusan leválasztott DC–DC átalakító:** nagyfrekvenciás transzformátorral (például rezonáns LLC vagy fázistolásos teljes híd) a köztes feszültségből az akkumulátor aktuális feszültségét és a BMS által kért áramot állítja elő (CC-CV). A leválasztás biztonsági követelmény: a nagyfeszültségű akkumulátor nincs közvetlen kapcsolatban a hálózattal. A nagy kapcsolási frekvencia miatt a transzformátor kicsi és könnyű.\n\n**Fázisszám és teljesítmény:** az OBC lehet egy- vagy háromfázisú; AC-töltéskor a teljesítményt az OBC névleges teljesítménye, a fázisok száma, a töltőállomás és a hálózati csatlakozás közül a legkisebb határozza meg.\n\n**Kétirányú OBC:** a fokozatok fordított irányban is működhetnek (az egyenirányító inverterként) – ez teszi lehetővé a V2L, V2H és AC-oldali V2G üzemet.\n\n**Hatásfok:** két átalakítási fokozat veszteségei, a hűtőkör és a segédüzemek miatt az AC-töltés hatásfoka kisebb áramnál (egyfázisú, kis teljesítményű töltés) rosszabb lehet, mert az állandó veszteségek (vezérlés, BMS, szivattyúk) hosszabb ideig terhelnek.\n\nDC-töltéskor az OBC-t megkerülik: az átalakítás a töltőoszlopban történik.',
        example: 'Háromfázisú, 16 A-es csatlakozás: `3 · 230 · 16 ≈ 11 kW`. Ha a jármű OBC-je csak egyfázisú, ugyanott `230 · 16 ≈ 3,7 kW` lesz a töltés. 7 kW-os töltés 92%-os hatásfokkal: 560 W hőveszteség, amit a jármű hűtőköre elvisz.',
        pitfall: 'A „hány kW-os a fali töltőm” kérdés önmagában félrevezető: a tényleges AC-töltési teljesítményt a jármű OBC-je is korlátozza. A PFC nem a meddő teljesítményt „kompenzálja” kondenzátorral, hanem aktívan formálja az áram alakját.',
        related: ['ac-dc-toltes', 'control-pilot', 'cc-cv', 'v2g', 'inverter', 'hatasfok'], tags: ['töltés', 'teljesítményelektronika'] },
      { id: 'okos-toltes', term: 'Okos töltés és terhelésmenedzsment', en: 'smart charging and load management', topic: 'toltes', prereq: ['e-mobilitas/control-pilot', 'e-mobilitas/kw-kwh'],
        short: 'A töltési teljesítmény időbeli ütemezése és dinamikus korlátozása a hálózati csatlakozás terhelhetősége, az energiaár, a megújuló termelés és a felhasználói igény (indulási idő, kívánt töltöttség) alapján.',
        text: 'Egy elektromos autó napi energiaigénye általában jóval kisebb annál, amit egy éjszakai parkolás alatt fel tudna venni, ezért a töltés **időben rugalmas**. Az okos töltés ezt a rugalmasságot használja ki, anélkül hogy a felhasználó célja (például „reggel 7-re 80%”) sérülne.\n\n**Szintjei:**\n\n1. **Statikus korlátozás:** a töltő maximális áramának beállítása a ház csatlakozási teljesítményéhez.\n2. **Dinamikus terhelésmenedzsment:** a töltő méri (vagy megkapja) a ház többi fogyasztásának áramát, és a CP-jel kitöltési tényezőjével valós időben úgy állítja a töltőáramot, hogy a főbiztosíték soha ne legyen túlterhelve. Több töltőpontnál (társasház, telephely) a rendelkezésre álló teljesítményt **elosztja** a járművek között.\n3. **Ütemezés:** a töltést az alacsonyabb díjú vagy kisebb hálózati terhelésű időszakokra, illetve a saját napelemes termelés idejére teszi.\n4. **Rendszerszintű szolgáltatás:** aggregált járműflotta a hálózat igényeire reagálva növeli vagy csökkenti a fogyasztását (keresletoldali szabályozás); kétirányú töltéssel ez V2G-vé bővül.\n\n**Matematikai alap:** optimalizálási feladat – minimalizálni a költséget vagy a csúcsterhelést, korlátok: a csatlakozási teljesítmény, a jármű maximális töltőárama, és az, hogy az indulási időpontig az előírt energiát meg kell kapnia.\n\n**Kommunikáció:** a töltő és a háttérrendszer között nyílt protokollok (például az OCPP családja), a töltő és a jármű között a CP-jel vagy az ISO 15118.\n\nAz elv lényege: a hálózatot nem a **napi energiaigény**, hanem az **egyidejű csúcsteljesítmény** terheli; az ütemezés ugyanazt az energiát kisebb csúccsal szállítja.',
        example: 'Egy háztartás 3 × 25 A-es csatlakozással rendelkezik; este a főzés 18 A-t vesz fel az egyik fázison. A dinamikus terhelésmenedzsment a töltést arra a fázisra 25 − 18 = 7 A-re csökkenti (a CP-jel kitöltését ennek megfelelően kb. 11,7%-ra állítva), majd a főzés után visszaemeli 16 A-re. A napi 10 kWh éjszaka 8 óra alatt átlagosan csak 1,25 kW-tal is betölthető.',
        pitfall: 'Ha az áram 6 A alá kellene, hogy csökkenjen, a szabványos AC-töltés nem tud tovább lassulni (a 10%-os minimum kitöltés ≈ 6 A): ilyenkor szüneteltetni kell. Sok autó a gyakori, kis lépésű áramváltást nem kezeli egyformán – a szabályozásnak lassúnak és stabilnak kell lennie.',
        related: ['control-pilot', 'v2g', 'kw-kwh', 'ac-dc-toltes', 'energiamerleg'], tags: ['töltés', 'hálózat', 'optimalizálás'] },

      { id: 'motortipusok', term: 'Hajtómotor-típusok összevetése', en: 'comparison of traction motor types', topic: 'hajtas', prereq: ['e-mobilitas/pmsm', 'e-mobilitas/aszinkron-motor', 'villamosmernoki/forgo-mezo'], models: ['elektromos-auto'],
        short: 'Az elektromos járművek forgómezős hajtómotorjai – állandó mágneses szinkron, aszinkron, külső gerjesztésű szinkron és kapcsolt reluktancia motor – a forgórész mágnesezésének módjában különböznek, és ez határozza meg hatásfokukat, költségüket és viselkedésüket.',
        text: 'Mindegyiket inverter táplálja, és mindegyik forgó mágneses mezővel működik; a különbség az, **honnan kapja a forgórész a mágneses terét**:\n\n- **Állandó mágneses szinkronmotor (PMSM):** a forgórészben állandó mágnesek (gyakran ritkaföldfém-tartalmúak). Nincs forgórész-gerjesztési veszteség → a legjobb hatásfok és teljesítménysűrűség, különösen részterhelésen. Hátrányok: drága, ellátási kockázattal járó mágnesanyag; nagy fordulaton **mezőgyengítés** kell; a mágnesek forgáskor mindig indukálnak feszültséget (hibakor veszélyes, vontatáskor fékez); a mágnesek hőérzékenyek.\n- **Aszinkron (indukciós) motor (ASM):** a forgórész kalitkájában a szlip indukál áramot. Robusztus, olcsó, mágnesmentes; árammentes állapotban szabadon forog (nincs vontatási veszteség), ezért gyakori „kisegítő” tengelyen. Hátrány: a forgórészveszteség miatt rosszabb hatásfok, különösen kis terhelésen, és a forgórész hűtése nehezebb.\n- **Külső gerjesztésű szinkronmotor (EESM):** a forgórész tekercselt, a gerjesztőáramot csúszógyűrűk vagy érintkezés nélküli (induktív) átvitel adja. Mágnesmentes, a gerjesztés szabadon állítható (egyszerű mezőgyengítés, jó hatásfok nagy fordulaton), és árammentesen nem indukál. Hátrány: gerjesztési veszteség, bonyolultabb forgórész.\n- **Kapcsolt reluktancia motor (SRM):** a forgórész csak fogazott vaslemezköteg, se mágnes, se tekercs; a nyomatékot az okozza, hogy a vas a legkisebb mágneses ellenállású helyzetbe áll. Rendkívül robusztus és olcsó, de nagy a nyomatéklüktetés és a zaj, egyedi inverter kell.\n\nKonstrukciós változatok: belső vagy felületi mágnesek (IPM – a reluktancianyomatékot is kihasználja), radiális vagy **axiális fluxusú** kivitel (lapos, nagy nyomatéksűrűség), hajtotengely-motor vagy kerékagymotor.\n\nA választás mindig rendszerszintű: a hatásfok a jellemző **vezetési ciklus** munkapontjaiban, a költség, a nyersanyagok, a hűtés és a gyárthatóság együtt dönt.',
        example: 'Kéttengelyes összkerékhajtásnál gyakori kombináció: hátul PMSM (a folyamatos, részterhelésű haladást ez végzi jó hatásfokkal), elöl ASM vagy EESM, amely csak erős gyorsításkor dolgozik, és egyébként árammentesen, szinte veszteség nélkül forog.',
        pitfall: 'A „legjobb motor” a csúcshatásfok alapján nem választható ki: egy jármű ideje nagy részében részterhelésen halad, és ott a motorok hatásfokának sorrendje eltérhet a csúcsértékekétől. A motortípus az inverter és a hűtés tervezését is meghatározza.',
        related: ['pmsm', 'aszinkron-motor', 'mezogyengites', 'inverter', 'foc', 'hatasfok'], tags: ['hajtás', 'összehasonlítás'] },
      { id: 'hv-biztonsag', term: 'Nagyfeszültségű rendszer biztonsága (szigetelésfelügyelet, előtöltés, HVIL)', en: 'high-voltage system safety', topic: 'hajtas', prereq: ['villamosmernoki/erintesvedelem', 'villamosmernoki/foldelesi-rendszerek', 'villamosmernoki/rc-tranziens'], models: ['elektromos-auto'],
        short: 'Az elektromos jármű nagyfeszültségű (B feszültségosztályú) körének védelmi elvei: a földtől és a karosszériától elszigetelt (IT-jellegű) rendszer, folyamatos szigetelésfelügyelet, kontaktorok előtöltő körrel, reteszelő hurok és aktív kisütés.',
        text: 'Járműben a 60 V DC (30 V AC) fölötti áramköröket nagyfeszültségűként kezelik (narancssárga kábelek, külön biztonsági követelmények). A védelem rétegei:\n\n1. **Elszigetelt rendszer:** az akkumulátor egyik pólusa sincs a karosszériához kötve (a villamos hálózatok **IT-rendszerének** megfelelője). Egyetlen szigetelési hiba így még nem okoz veszélyes áramkört – a test és a karosszéria érintése nem zár áramkört. A karosszéria-elemek egymással potenciálkiegyenlítéssel vannak összekötve.\n2. **Szigetelésfelügyelet:** mivel az első hiba „csendes”, folyamatosan mérni kell mindkét pólus szigetelési ellenállását a karosszériához képest. Az előírt minimumokat jellemzően a rendszerfeszültségre vetítve, **Ω/V**-ban adják meg. Ha a szigetelés romlik, a jármű figyelmeztet, majd korlátoz – még mielőtt egy második hiba veszélyes helyzetet teremtene.\n3. **Kontaktorok és előtöltés:** kikapcsolt állapotban mindkét pólus mechanikus kontaktora nyitva van. Az inverter bemenetén nagy **köztesköri kondenzátor** (DC-link) van; ha a kontaktort közvetlenül zárnák, a kisütött kondenzátor rövidzárként viselkedne, és hatalmas áramlökés hegesztené össze az érintkezőket. Ezért előbb egy **előtöltő ellenálláson** át töltik fel (RC-tranziens), és csak közel azonos feszültségnél zár a főkontaktor.\n4. **HVIL (nagyfeszültségű reteszelő hurok):** minden nagyfeszültségű csatlakozón és fedélen átfut egy kisfeszültségű jelhurok. Ha egy csatlakozót kihúznak vagy fedelet nyitnak, a hurok megszakad, és a rendszer azonnal nyitja a kontaktorokat.\n5. **Aktív kisütés:** lekapcsoláskor (és ütközésérzékeléskor) a köztesköri kondenzátort néhány másodperc alatt biztonságos feszültség alá sütik.\n6. **Szervizleválasztó és biztosíték:** a csomag kézzel, szerszámmal megbontható; pirotechnikai leválasztó ütközéskor.\n\nA BMS és a járművezérlő az összes feltételt egy biztonsági állapotgépben kezeli: csak minden ellenőrzés sikeres lefutása után engedélyezi a nagyfeszültséget.',
        example: 'DC-link: C = 1000 µF, akkumulátor 400 V, előtöltő ellenállás 50 Ω. `τ = 50 · 10⁻³ = 50 ms`, a kezdeti áram `400/50 = 8 A`, 5τ = 250 ms után a kondenzátor feszültsége a 400 V-hoz 1%-on belül közelít. Előtöltés nélkül a kezdeti áramot csak néhány milliohm korlátozná – ez több tízezer amperes lökés lenne.',
        pitfall: 'Kikapcsolt jármű nagyfeszültségű akkumulátora **továbbra is feltöltött**: a kontaktorok csak a csomag kapcsait választják le, a cellák belsejében a feszültség megmarad. Nagyfeszültségű rendszeren csak arra kiképzett személy dolgozhat, a feszültségmentesség ellenőrzése után.',
        related: ['inverter', 'bms', 'hofutas', 'cellaformatum'], tags: ['biztonság', 'nagyfeszültség'] },

      { id: 'reduktor', term: 'Egyfokozatú reduktor és differenciálmű', en: 'single-speed reduction gear and differential', topic: 'hajtaslanc', prereq: ['e-mobilitas/nyomatek', 'mechanika/nyomatek'], models: ['elektromos-auto'],
        short: 'Az elektromos jármű hajtásláncában a motor nagy fordulatszámát egy rögzített áttételű fogaskerék-hajtómű csökkenti, és ugyanennyiszeresére növeli a nyomatékot; a differenciálmű kanyarban eltérő fordulatszámot enged a két keréknek.',
        text: 'A belsőégésű motor csak szűk fordulatszám-tartományban ad elegendő nyomatékot, ezért többfokozatú sebességváltó kell. A villamos motor viszont nyugalomból is teljes nyomatékot ad, és széles fordulatszám-tartományban (az **állandó teljesítményű** mezőgyengítéses tartományban is) jól működik – így legtöbbször **egyetlen áttétel** elegendő.\n\nAz áttétel (`i = n_motor / n_kerék`) kompromisszum:\n\n- **nagyobb i:** nagyobb kerékerő (gyorsítás, emelkedő, vontatás), kisebb motornyomaték és így kisebb, könnyebb motor elegendő; de a végsebességnél a motor nagyon nagy fordulaton jár (súrlódás, vasveszteség, mechanikai igénybevétel);\n- **kisebb i:** jobb végsebesség és nagy sebességű hatásfok, de gyengébb gyorsítás.\n\nA nagy fordulatszámú, kompakt motorok miatt az áttétel jellemzően 8–12 közötti, gyakran **két fokozatban** (két fogaskerékpár) megvalósítva, ferde fogazással a zaj csökkentésére. Kétfokozatú váltót akkor használnak, ha széles sebességtartományban (például nagy végsebesség és erős gyorsítás) kell jó hatásfokot elérni.\n\nA **differenciálmű** (bolygókerekes) a nyomatékot egyenlően osztja a két kerék között, miközben kanyarban a külső kerék gyorsabban foroghat. Hátránya, hogy a kisebb tapadású kerék korlátozza a nyomatékot – ezt mechanikus zár vagy a két motorral (keréknként külön hajtással) megvalósított **nyomatékvektorálás** oldja meg.\n\nA reduktor hatásfoka magas (jellemzően 95–98%), veszteségei a fogsúrlódásból, a csapágyakból és az olajkeverésből adódnak. A rekuperáció során a hajtómű visszafelé is ugyanezzel a hatásfokkal visz át energiát.',
        formulas: ['reduktor-fordulatszam'],
        example: 'Egy motor legnagyobb fordulatszáma 16 000 1/min, a kerék dinamikus sugara 0,34 m. i = 10 esetén a végsebesség `v = 16 000 · 2π · 0,34 / (60 · 10) ≈ 57 m/s ≈ 205 km/h`. i = 12-vel 171 km/h, de a kerékerő 20%-kal nagyobb.',
        pitfall: 'Az áttétel a teljesítményt nem növeli, csak a nyomaték és a fordulatszám arányát cseréli (mínusz a veszteségek). Az elektromos autó „azonnali nyomatéka” sem korlátlan: kis sebességen a gumiabroncs tapadása szab határt, amit a kipörgésgátló felügyel.',
        related: ['nyomatek', 'mezogyengites', 'hatasfok', 'menetellenallas', 'motortipusok'], tags: ['hajtáslánc', 'mechanika'] },

      { id: 'hokezeles', term: 'Akkumulátor-hőmenedzsment', en: 'battery thermal management', topic: 'rendszer', prereq: ['e-mobilitas/belso-ellenallas', 'e-mobilitas/hofutas', 'fizika-bsc/elso-fotetel'], models: ['akkucella', 'elektromos-auto'],
        short: 'Az akkumulátor hőmérsékletének szabályozása hűtéssel és fűtéssel úgy, hogy a cellák egy optimális tartományban és egymáshoz képest kis hőmérséklet-különbséggel működjenek – a teljesítmény, az élettartam és a biztonság érdekében.',
        text: '**Miért kell?** A lítiumion-cella egy viszonylag szűk tartományban működik a legjobban:\n\n- **hidegben** nő a belső ellenállás, csökken a leadható teljesítmény és a pillanatnyi kapacitás, és a töltés lítiumkiválást okozhat;\n- **melegben** gyorsul a naptári és ciklikus öregedés, szélsőséges esetben hőmegfutás indulhat;\n- a cellák közti **hőmérséklet-különbség** eltérő öregedést és ezzel kiegyensúlyozatlanságot okoz – a tervezés célja jellemzően néhány fokos egyenletesség.\n\n**Hőforrások:** a Joule-hő `P = I² · R_b`, amely nagy áramnál (gyorstöltés, erős gyorsítás) a legfontosabb, valamint a reverzibilis (entropikus) reakcióhő, amely töltéskor és kisütéskor ellentétes előjelű.\n\n**Hűtési megoldások:**\n\n- **levegős** (passzív vagy ventilátoros): egyszerű, de kis hőátadás – kis teljesítményű járművekben;\n- **folyadékhűtés** hűtőlemezekkel (cold plate) a cellák alatt vagy között, víz–glikol keverékkel – a legelterjedtebb;\n- **közvetlen hűtőközeges** hűtés (a klíma hűtőköréből), illetve **merülő hűtés** dielektromos folyadékban.\n\n**Fűtés:** PTC-fűtőelem, hőszivattyú, a motor és az inverter hulladékhőjének hasznosítása, egyes rendszerekben a cellák belső fűtése nagyfrekvenciás váltakozó árammal.\n\n**Integrált hőmenedzsment:** az akkumulátor, a hajtás és az utastér körei szelepekkel összekapcsolhatók, hőszivattyúval a hő oda vihető, ahol szükség van rá. **Előkondicionálás:** gyorstöltés előtt az akkumulátort a navigáció alapján célhőmérsékletre melegítik, hogy a töltés a teljes áramerősséggel indulhasson.\n\nA hőmenedzsment energiát fogyaszt – hidegben ez a hatótáv-csökkenés jelentős része –, ezért a szabályozás a pillanatnyi és a várható igényt (útvonal, töltés, külső hőmérséklet) együtt mérlegeli.',
        example: 'Gyorstöltés 200 A-rel, az akkumulátorcsomag belső ellenállása 0,1 Ω: `P = 200² · 0,1 = 4 kW` hő. Ha a csomag hőkapacitása 400 kg · 1 kJ/(kg·K) = 400 kJ/K, hűtés nélkül a hőmérséklet `4 / 400 = 0,01 K/s`, azaz 30 perc alatt kb. 18 °C-kal emelkedne.',
        pitfall: 'A hőmérséklet nem csak „ne legyen túl meleg” kérdés: a hideg akkumulátor gyorstöltése legalább annyira káros. A cellák közti nagy hőmérséklet-különbség akkor is gond, ha az átlaghőmérséklet ideális.',
        related: ['belso-ellenallas', 'hofutas', 'litium-kivalas', 'akku-oregedes', 'bms', 'energiamerleg'], tags: ['hő', 'akkumulátor', 'rendszer'] },
      { id: 'energiamerleg', term: 'A jármű energiamérlege', en: 'vehicle energy balance', topic: 'rendszer', prereq: ['e-mobilitas/menetellenallas', 'e-mobilitas/hatasfok', 'e-mobilitas/kw-kwh'], models: ['elektromos-auto'],
        short: 'Annak számbavétele, hogy a hálózatból felvett energia mely átalakítási lépéseken át, milyen veszteségekkel jut el a kerekekhez, és hová kerül: menetellenállás legyőzése, segédüzemek, hőveszteségek, visszanyert fékenergia.',
        text: 'Az energia útja és a jellemző veszteséghelyek:\n\n1. **Hálózat → akkumulátor:** töltő (AC-nél a fedélzeti töltő), kábelek, akkumulátor belső ellenállása, a töltés közbeni hőmenedzsment.\n2. **Akkumulátor → kerék:** akkumulátor kisütési veszteség, inverter (kapcsolási és vezetési veszteség), motor (réz-, vas-, mechanikai veszteség), reduktor.\n3. **Kerék → környezet:** a menetellenállás legyőzése: gördülési ellenállás és légellenállás állandó sebességnél hővé alakul a gumiban és a levegőben; az emelkedési és a gyorsítási munka **helyzeti és mozgási energiaként** tárolódik, és részben visszanyerhető (rekuperáció).\n4. **Segédüzemek:** fűtés, klíma, világítás, vezérlőelektronika – időarányos, nem út-arányos fogyasztás.\n\nA szokásos mérőszám a **fajlagos fogyasztás**, Wh/km vagy kWh/100 km, de fontos megkülönböztetni, hogy honnan mérjük: **hálózatból** (töltési veszteséggel) vagy **akkumulátorból**.\n\nTanulságok a fizikából:\n\n- a légellenállás ereje `v²`-tel, teljesítménye `v³`-nel nő – autópályán ez a döntő tag;\n- városban a gyorsítás a fő energiaigény, amelynek jelentős része fékezéskor visszanyerhető, ezért az elektromos jármű városban arányaiban takarékos;\n- kis sebességnél és hidegben a **segédüzemek** időarányos fogyasztása (például fűtés) km-re vetítve nagy, mert sok idő telik el egy km megtételéig;\n- a hajtáslánc részterhelési hatásfoka számít, nem a csúcshatásfok.\n\nAz energiamérleg modellje (menetellenállás + hatásfoktérképek + segédüzemek) a hatótáv-becslés és a jármű-optimalizálás alapja.',
        formulas: ['menetellenallas-ero'],
        example: '1800 kg, f_g = 0,01, c_w · A = 0,6 m², 100 km/h (27,8 m/s), sík út: `F_gördülés ≈ 177 N`, `F_lég ≈ 0,5 · 1,2 · 0,6 · 27,8² ≈ 278 N`. Összesen 455 N, vagyis a keréken 455 kJ/km ≈ **126 Wh/km**. 88%-os hajtáslánc-hatásfokkal az akkumulátorból ≈ 144 Wh/km, 1 kW segédüzemmel (óránként 100 km) +10 Wh/km, 90%-os töltési hatásfokkal a hálózatból ≈ 171 Wh/km.',
        pitfall: 'A kWh/100 km érték önmagában nem összevethető, ha nem tudjuk, hálózati vagy akkumulátoroldali mérés, milyen sebességen, hőmérsékleten és milyen vezetési ciklusban készült. A rekuperáció nem hoz vissza 100%-ot: oda-vissza több átalakítási veszteség is terheli.',
        related: ['menetellenallas', 'legellenallas', 'hatasfok', 'rekuperacio', 'hokezeles', 'kw-kwh', 'eletciklus'], tags: ['energia', 'hatásfok', 'rendszer'] },
      { id: 'eletciklus', term: 'Életciklus-elemzés (LCA)', en: 'life cycle assessment', topic: 'rendszer', prereq: ['e-mobilitas/energiamerleg'],
        short: 'Szabványosított módszer egy termék teljes életútja – nyersanyag-kitermelés, gyártás, használat, életciklus végi kezelés – során fellépő környezeti hatások (például üvegházhatású gázkibocsátás) számszerű összegzésére és összehasonlítására.',
        text: 'Az LCA (ISO 14040/14044 módszertan) négy lépése:\n\n1. **Cél és vizsgálati keret:** mit hasonlítunk össze, és mire vetítve. A **funkcionális egység** például „1 km utasszállítás” vagy „a jármű teljes élettartama alatti 200 000 km”. A **rendszerhatár** dönti el, mi számít bele (például az akkumulátor gyártása, az áramtermelés, az úthálózat).\n2. **Leltárelemzés:** az összes anyag- és energiaáram, kibocsátás összegyűjtése az életút minden szakaszára.\n3. **Hatásértékelés:** a kibocsátások hatáskategóriákba sorolása (klímaváltozás CO₂-egyenértékben, savasodás, erőforrás-kimerülés, toxicitás, vízhasználat).\n4. **Értelmezés,** érzékenységvizsgálat: mely feltételezések változtatják meg a következtetést.\n\n**Járművekre alkalmazva** az életút: gyártás (karosszéria, akkumulátor) → használat → életciklus vége. Szokásos részmérlegek: **well-to-tank** (az energiahordozó előállítása), **tank-to-wheel** (a járműben), együtt **well-to-wheel**; a teljes, gyártást is tartalmazó a **cradle-to-grave** („bölcsőtől a sírig”).\n\nAz elektromos jármű jellegzetessége: a **gyártási** szakasz kibocsátása (főként az akkumulátor miatt) jellemzően nagyobb, a **használati** szakaszé kisebb, és erősen függ az áramtermelés összetételétől. Ebből adódik a **megtérülési pont** fogalma: hány km után kompenzálja a kisebb használati kibocsátás a nagyobb gyártási kibocsátást. Ennek értéke a feltételezésektől függ: az áramszerkezet (és annak jövőbeli változása), az akkumulátor mérete és gyártási helye, az élettartam, a vezetési szokások, és az, hogy az életciklus végén mennyi anyag kerül vissza a körforgásba.\n\nAz LCA ereje az **összehasonlíthatóság**, gyengéje az adatok és feltételezések iránti érzékenység: két tanulmány csak akkor vethető össze, ha a funkcionális egység és a rendszerhatár azonos.',
        example: 'Egyszerűsített számpélda (csak a módszert szemlélteti, az értékek feltételezések): ha egy jármű gyártása 4 t CO₂-egyenértékkel többet bocsát ki, de km-enként 100 g-mal kevesebbet, a megtérülési pont `4 000 000 g / 100 g/km = 40 000 km`. Ha a használati előny csak 50 g/km, a megtérülés 80 000 km.',
        pitfall: 'Egyetlen szám („X km után zöldebb”) mindig feltételezések következménye; ha az áramszerkezet, az élettartam vagy a rendszerhatár más, más az eredmény. Gyakori hiba az összehasonlításban az eltérő funkcionális egység (például eltérő méretű járművek vagy élettartamok).',
        related: ['energiamerleg', 'ujrahasznositas', 'akku-oregedes', 'hatasfok'], tags: ['környezet', 'módszertan'] },
      { id: 'ujrahasznositas', term: 'Akkumulátor újrahasznosítása és második élete', en: 'battery recycling and second life', topic: 'rendszer', prereq: ['e-mobilitas/cellakemia', 'e-mobilitas/soh', 'kemia-bsc/redoxi'], models: ['akkucella'],
        short: 'A járműből kikerült akkumulátorok kezelése: ha még elég jó állapotú, helyhez kötött energiatárolóként tovább használható (második élet); a végén a cellákból mechanikai, hő- és vegyi eljárásokkal visszanyerik az értékes anyagokat.',
        text: 'A kezelés **hierarchiája** (a körforgásos gazdaság elve szerint): ismételt felhasználás → átalakítás más célra → anyagában újrahasznosítás → ártalmatlanítás.\n\n**Második élet (second life):** egy járműakkumulátort jellemzően akkor cserélnek, amikor a kapacitása már nem elég a jármű igényeihez, de még jelentős tárolóképessége van. Helyhez kötött alkalmazásban (napelemes tároló, töltőállomás pufferje, hálózati szolgáltatás) a kisebb teljesítmény- és tömegigény mellett évekig hasznos lehet. Feltétele a modulok állapotának megbízható diagnosztikája (SOH, belső ellenállás, biztonság), és az, hogy a modulok gazdaságosan szétszerelhetők, illeszthetők legyenek.\n\n**Anyagában újrahasznosítás – lépései:**\n\n1. **Kisütés és szétszerelés** (csomag → modul → cella); a maradék energia veszélyes, ezért biztonságos kisütés vagy inert közegű aprítás kell.\n2. **Mechanikai előkezelés:** aprítás, szitálás, mágneses és sűrűség szerinti szétválasztás. Az alumínium, réz, acél külön kinyerhető; a katód- és anódanyag finom porkeveréke a **„fekete massza”** (black mass).\n3. **Pirometallurgia:** nagy hőmérsékletű olvasztás. Robusztus, sokféle bemenetet elfogad, a kobaltot, nikkelt, rezet ötvözetként nyeri ki; a lítium és az alumínium jellemzően a salakba kerül, és csak további kezeléssel nyerhető vissza; energiaigényes.\n4. **Hidrometallurgia:** a fekete massza savas kioldása, majd oldószeres extrakció és kicsapás – a fémek (Li, Ni, Co, Mn) külön, nagy tisztaságú vegyületként nyerhetők vissza, alacsonyabb hőmérsékleten.\n5. **Közvetlen (direkt) újrahasznosítás:** a katódanyag kristályszerkezetének megtartása és „regenerálása” (lítiumpótlás) – kevesebb energia, de érzékeny a bemenő anyag tisztaságára és összetételére.\n\nA gazdaságosságot a cellakémia erősen befolyásolja: a nikkel- és kobalttartalmú katódokból értékesebb anyag nyerhető vissza, mint a vas-foszfát alapúakból. Az újrahasznosítást segíti az **újrahasznosításra tervezés**: oldható kötések, egységes cellaformátumok, címkézés és az akkumulátor adatainak (összetétel, előélet) nyomon követhetősége.',
        example: 'Egy akkumulátor 70%-os SOH-val kerül ki a járműből. Napelemes tárolóként napi egy, kis C-rátájú ciklussal még sok évig üzemelhet; amikor kapacitása tovább csökken, a cellákat aprítják, és a fekete masszából hidrometallurgiai úton a lítium, a nikkel és a kobalt újra akkumulátorgyártásra alkalmas vegyületté alakítható.',
        pitfall: 'A második élet nem ingyenes: a diagnosztika, az átalakítás és a felelősség (garancia, biztonság) költséges, és egy erősen, egyenetlenül öregedett csomag nem alkalmas rá. Sérült vagy hőmegfutáson átesett cellákat nem szabad második életre szánni.',
        related: ['eletciklus', 'cellakemia', 'soh', 'akku-oregedes', 'hofutas'], tags: ['körforgás', 'környezet', 'akkumulátor'] }
    ]
  });
})();
