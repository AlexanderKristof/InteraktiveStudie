/* Egyetem: Anatómia és élettan (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';
  var FG = 'var(--fg-2)', BG = 'var(--stage)';
  var RED = '#e5484d', BLUE = '#2f7bf6', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6', TEAL = '#0e9aa7', PINK = '#c2417a';

  /* ---------- rajzsegédek ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function sub(s) { return String(s).replace(/_([A-Za-z0-9áéíóöőúüű]+)/g, '<tspan baseline-shift="sub" font-size="75%">$1</tspan>'); }
  function txt(x, y, s, size, anchor, extra) {
    var muted = extra && extra.indexOf('muted') === 0;
    if (muted) extra = extra.slice(5);
    var cls = extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (muted ? M : T);
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + cls + (extra ? ' ' + extra : '') + '>' + sub(s) + '</text>';
  }
  function head(x, y, ang, col, s) {
    s = s || 8;
    return '<path d="M' + r1(x) + ' ' + r1(y) + ' L' + r1(x - s * Math.cos(ang - 0.4)) + ' ' + r1(y - s * Math.sin(ang - 0.4)) + ' L' + r1(x - s * Math.cos(ang + 0.4)) + ' ' + r1(y - s * Math.sin(ang + 0.4)) + ' z" fill="' + col + '"/>';
  }
  function arrow(x1, y1, x2, y2, col, w) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 1.5) + '"/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  function plot(fn, a, b, n, X, Y) {
    var d = '';
    for (var i = 0; i <= n; i++) { var u = a + (b - a) * i / n; d += (i ? 'L' : 'M') + r1(X(u)) + ' ' + r1(Y(fn(u))) + ' '; }
    return d;
  }
  // Catmull–Rom spline pontokon át (sima élettani görbékhez)
  function spline(pts, X, Y) {
    var d = 'M' + r1(X(pts[0][0])) + ' ' + r1(Y(pts[0][1]));
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      for (var k = 1; k <= 12; k++) {
        var t = k / 12, t2 = t * t, t3 = t2 * t;
        var f = function (a, b, c, e) { return 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - e) * t2 + (-a + 3 * b - 3 * c + e) * t3); };
        d += ' L' + r1(X(f(p0[0], p1[0], p2[0], p3[0]))) + ' ' + r1(Y(f(p0[1], p1[1], p2[1], p3[1])));
      }
    }
    return d;
  }
  function axes(x0, y0, x1, y1) { return arrow(x0, y0, x1, y0, FG) + arrow(x0, y0, x0, y1, FG); }

  /* ---------- 1. Membránpotenciál: ionkoncentrációk ---------- */
  var memSvg = '<svg viewBox="0 0 560 250">' +
    '<rect x="20" y="10" width="520" height="92" rx="8" fill="' + BLUE + '" opacity=".08"/><rect x="20" y="148" width="520" height="92" rx="8" fill="' + ORANGE + '" opacity=".1"/>' +
    '<rect x="20" y="104" width="520" height="42" fill="' + ORANGE + '" opacity=".25"/>';
  for (var mi = 0; mi < 26; mi++) memSvg += '<circle cx="' + (30 + mi * 20) + '" cy="110" r="5" fill="' + ORANGE + '" opacity=".7"/><circle cx="' + (30 + mi * 20) + '" cy="140" r="5" fill="' + ORANGE + '" opacity=".7"/>';
  memSvg += txt(30, 28, 'sejten kívül (extracelluláris)', 12, null, 'font-weight="700"') + txt(30, 236, 'sejten belül (intracelluláris)', 12, null, 'font-weight="700"') +
    [[100, 'Na⁺', '145', '12', RED, '+67 mV'], [210, 'K⁺', '5', '140', BLUE, '−89 mV'], [320, 'Cl⁻', '110', '10', GREEN, '−64 mV']].map(function (r) {
      return txt(r[0], 62, r[1] + ' ' + r[2], 16, 'middle', 'font-weight="700" fill="' + r[4] + '"') + txt(r[0], 190, r[1] + ' ' + r[3], 16, 'middle', 'font-weight="700" fill="' + r[4] + '"') +
        txt(r[0], 82, 'mmol/L', 10, 'middle', 'muted') + txt(r[0], 210, 'E = ' + r[5], 11, 'middle');
    }).join('') +
    '<rect x="423" y="92" width="44" height="66" rx="20" fill="' + PURPLE + '"/>' + txt(445, 122, 'Na⁺/K⁺', 9, 'middle', 'fill="#fff" font-weight="700"') + txt(445, 134, 'ATPáz', 9, 'middle', 'fill="#fff" font-weight="700"') +
    arrow(412, 166, 412, 84, RED, 2) + arrow(478, 84, 478, 166, BLUE, 2) + txt(406, 80, '3 Na⁺ ki', 11, 'end', 'fill="' + RED + '"') + txt(484, 214, '2 K⁺ be', 11, null, 'fill="' + BLUE + '"') +
    txt(522, 62, '+ + +', 14, 'middle', 'fill="' + RED + '"') + txt(522, 196, '− − −', 14, 'middle', 'fill="' + BLUE + '"') +
    '<rect x="496" y="116" width="54" height="20" rx="4" fill="' + BG + '"/>' + txt(523, 131, '−70 mV', 12, 'middle', 'font-weight="700"') + '</svg>';

  /* ---------- 2. Akciós potenciál ---------- */
  var ap = { X: function (t) { return 70 + t / 5 * 440; }, Y: function (v) { return 30 + (40 - v) / 130 * 190; } };
  var apPts = [[0, -70], [0.9, -70], [1.2, -63], [1.45, -56], [1.6, -30], [1.75, 10], [1.88, 32], [2.02, 18], [2.3, -25], [2.6, -62], [2.9, -80], [3.3, -79], [4.0, -73], [5, -70]];
  var apSvg = '<svg viewBox="0 0 560 270">' +
    '<rect x="' + ap.X(1.55) + '" y="18" width="' + (ap.X(2.65) - ap.X(1.55)) + '" height="10" fill="' + RED + '" opacity=".75"/>' + '<rect x="' + ap.X(2.65) + '" y="18" width="' + (ap.X(4.0) - ap.X(2.65)) + '" height="10" fill="' + ORANGE + '" opacity=".6"/>' +
    txt(ap.X(2.1), 14, 'abszolút refrakter', 10, 'middle', 'fill="' + RED + '"') + txt(ap.X(3.33), 14, 'relatív refrakter', 10, 'middle', 'fill="' + ORANGE + '"') +
    axes(70, 235, 548, 36) + txt(546, 252, 't (ms)', 11, 'end') + txt(64, 44, 'U (mV)', 11, 'end') +
    [40, 0, -55, -70].map(function (v) { return txt(64, ap.Y(v) + 4, v, 10, 'end', 'muted'); }).join('') +
    [0, 1, 2, 3, 4, 5].map(function (t) { return txt(ap.X(t), 250, t, 10, 'middle', 'muted'); }).join('') +
    '<line x1="70" y1="' + ap.Y(0) + '" x2="540" y2="' + ap.Y(0) + '" stroke="var(--line)"/>' +
    '<line x1="70" y1="' + ap.Y(-55) + '" x2="540" y2="' + ap.Y(-55) + '" stroke="' + RED + '" stroke-dasharray="5 4"/>' + txt(540, ap.Y(-55) - 5, 'küszöb', 11, 'end', 'fill="' + RED + '"') +
    '<path d="' + spline(apPts, ap.X, ap.Y) + '" fill="none" stroke="' + PURPLE + '" stroke-width="3"/>' +
    txt(ap.X(1.62) - 6, ap.Y(0) - 18, 'depolarizáció', 11, 'end', 'font-weight="700"') + txt(ap.X(1.62) - 6, ap.Y(0) - 4, 'Na⁺ be', 11, 'end', 'fill="' + RED + '"') +
    txt(ap.X(2.4) + 8, ap.Y(-10), 'repolarizáció', 11, null, 'font-weight="700"') + txt(ap.X(2.4) + 8, ap.Y(-10) + 14, 'K⁺ ki', 11, null, 'fill="' + BLUE + '"') +
    txt(ap.X(3.1), ap.Y(-80) + 18, 'hiperpolarizáció', 11, 'middle', 'muted') + txt(ap.X(0.5), ap.Y(-70) - 8, 'nyugalmi', 11, 'middle', 'muted') +
    txt(ap.X(1.88) + 8, ap.Y(32) + 4, '+30', 11) + '</svg>';

  /* ---------- 3. Neuron ---------- */
  var neuSvg = '<svg viewBox="0 0 560 216">';
  [[-2.5, 70], [-1.9, 62], [-1.2, 66], [1.3, 64], [2.0, 70], [2.6, 60], [3.3, 55]].forEach(function (d) {
    var a = d[0], L = d[1], x1 = 110 + 26 * Math.cos(a), y1 = 105 + 26 * Math.sin(a), x2 = 110 + L * Math.cos(a), y2 = 105 + L * Math.sin(a);
    neuSvg += '<path d="M' + r1(x1) + ' ' + r1(y1) + ' L' + r1(x2) + ' ' + r1(y2) + ' M' + r1(x2) + ' ' + r1(y2) + ' l' + r1(16 * Math.cos(a - 0.5)) + ' ' + r1(16 * Math.sin(a - 0.5)) + ' M' + r1(x2) + ' ' + r1(y2) + ' l' + r1(16 * Math.cos(a + 0.5)) + ' ' + r1(16 * Math.sin(a + 0.5)) + '" stroke="' + PURPLE + '" stroke-width="3" stroke-linecap="round" fill="none"/>';
  });
  neuSvg += '<path d="M134 96 L160 101 L160 109 L134 114 z" fill="' + PURPLE + '"/><line x1="160" y1="105" x2="470" y2="105" stroke="' + PURPLE + '" stroke-width="3"/>' +
    '<circle cx="110" cy="105" r="28" fill="' + PURPLE + '" opacity=".9"/><circle cx="106" cy="101" r="10" fill="#fff" opacity=".85"/>';
  for (var my = 0; my < 6; my++) neuSvg += '<rect x="' + (182 + my * 46) + '" y="95" width="38" height="20" rx="9" fill="' + ORANGE + '" stroke="' + BG + '" stroke-width="1"/>';
  [[-0.6], [-0.2], [0.25], [0.6]].forEach(function (d) {
    var a = d[0], x2 = 470 + 50 * Math.cos(a), y2 = 105 + 50 * Math.sin(a);
    neuSvg += '<line x1="470" y1="105" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + PURPLE + '" stroke-width="2.5"/><circle cx="' + r1(x2 + 5) + '" cy="' + r1(y2) + '" r="7" fill="' + TEAL + '"/>';
  });
  neuSvg += txt(60, 24, 'dendritek', 12, 'middle') + txt(110, 196, 'sejttest', 12, 'middle') + txt(110, 209, '(szóma, sejtmag)', 10, 'middle', 'muted') +
    arrow(160, 150, 148, 116, 'var(--muted)', 1.2) + txt(166, 162, 'axondomb', 11) + txt(166, 175, '(itt indul az AP)', 10, null, 'muted') +
    txt(272, 84, 'mielinhüvely', 12, 'middle', 'fill="' + ORANGE + '"') + arrow(316, 136, 314, 110, 'var(--muted)', 1.2) + txt(316, 150, 'Ranvier-befűződés', 11, 'middle') +
    txt(495, 44, 'axonvégződések', 11, 'middle') + txt(495, 172, '(szinapszisok)', 10, 'middle', 'muted') +
    arrow(260, 204, 470, 204, RED, 2) + txt(365, 198, 'az ingerület iránya', 10, 'middle', 'fill="' + RED + '"') + '</svg>';

  /* ---------- 4. Szarkomer: elernyedt és összehúzódott ---------- */
  function sarc(y, z1, z2, label) {
    var mid = (z1 + z2) / 2, s = '', act = 110;
    s += '<line x1="' + (mid - 100) + '" y1="' + y + '" x2="' + (mid + 100) + '" y2="' + y + '" stroke="' + RED + '" stroke-width="9" stroke-linecap="round"/>';
    for (var k = -90; k <= 90; k += 15) if (Math.abs(k) > 12) s += '<line x1="' + (mid + k) + '" y1="' + (y - 5) + '" x2="' + (mid + k + (k < 0 ? -6 : 6)) + '" y2="' + (y - 12) + '" stroke="' + RED + '" stroke-width="2"/><line x1="' + (mid + k) + '" y1="' + (y + 5) + '" x2="' + (mid + k + (k < 0 ? -6 : 6)) + '" y2="' + (y + 12) + '" stroke="' + RED + '" stroke-width="2"/>';
    [-16, 16].forEach(function (o) {
      s += '<line x1="' + z1 + '" y1="' + (y + o) + '" x2="' + (z1 + act) + '" y2="' + (y + o) + '" stroke="' + BLUE + '" stroke-width="4"/>' +
        '<line x1="' + z2 + '" y1="' + (y + o) + '" x2="' + (z2 - act) + '" y2="' + (y + o) + '" stroke="' + BLUE + '" stroke-width="4"/>';
    });
    s += '<line x1="' + z1 + '" y1="' + (y - 30) + '" x2="' + z1 + '" y2="' + (y + 30) + '" stroke="' + FG + '" stroke-width="4"/><line x1="' + z2 + '" y1="' + (y - 30) + '" x2="' + z2 + '" y2="' + (y + 30) + '" stroke="' + FG + '" stroke-width="4"/>' +
      '<line x1="' + mid + '" y1="' + (y - 22) + '" x2="' + mid + '" y2="' + (y + 22) + '" stroke="' + FG + '" stroke-width="1.5" stroke-dasharray="3 3"/>' +
      txt(z1, y - 36, 'Z', 12, 'middle', 'font-weight="700"') + txt(z2, y - 36, 'Z', 12, 'middle', 'font-weight="700"') + txt(mid + 6, y - 26, 'M', 10, null, 'muted') +
      txt(18, y + 4, label, 12, null, 'font-weight="700"');
    // sávok
    var yb = y + 44;
    function br(a, b, t, col) { return '<path d="M' + a + ' ' + (yb - 5) + ' L' + a + ' ' + yb + ' L' + b + ' ' + yb + ' L' + b + ' ' + (yb - 5) + '" fill="none" stroke="' + col + '" stroke-width="1.5"/>' + txt((a + b) / 2, yb + 14, t, 10, 'middle', 'fill="' + col + '"'); }
    s += br(mid - 100, mid + 100, 'A-sáv', RED) + br(z1, mid - 100, 'I', BLUE) + br(mid + 100, z2, 'I', BLUE);
    var h1 = z1 + act, h2 = z2 - act;
    if (h2 > h1 + 4) s += '<path d="M' + h1 + ' ' + (y + 26) + ' L' + h2 + ' ' + (y + 26) + '" stroke="' + GREEN + '" stroke-width="3"/>';
    return s;
  }
  var sarcSvg = '<svg viewBox="0 0 560 300">' + sarc(60, 140, 480, 'elernyedt') + sarc(200, 190, 430, 'összehúzódott') +
    txt(548, 64, '≈ 2,5 µm', 11, 'end', 'muted') + txt(548, 204, '≈ 1,8 µm', 11, 'end', 'muted') +
    '<line x1="130" y1="290" x2="150" y2="290" stroke="' + BLUE + '" stroke-width="4"/>' + txt(156, 294, 'aktin (vékony)', 11) +
    '<line x1="270" y1="290" x2="290" y2="290" stroke="' + RED + '" stroke-width="7"/>' + txt(296, 294, 'miozin (vastag)', 11) +
    '<line x1="410" y1="290" x2="430" y2="290" stroke="' + GREEN + '" stroke-width="3"/>' + txt(436, 294, 'H-zóna', 11) + '</svg>';

  /* ---------- 5. Szívciklus nyomásgörbéi (Wiggers-diagram) ---------- */
  var wg = { X: function (t) { return 70 + t / 0.8 * 430; }, Y: function (p) { return 220 - p / 130 * 190; } };
  var lv = [[0, 5], [0.05, 7], [0.09, 9], [0.12, 30], [0.15, 78], [0.2, 112], [0.26, 121], [0.32, 114], [0.38, 100], [0.41, 72], [0.44, 30], [0.47, 7], [0.55, 3], [0.7, 4], [0.8, 5]];
  var ao = [[0, 82], [0.08, 80], [0.15, 78], [0.2, 106], [0.26, 118], [0.32, 112], [0.38, 99], [0.405, 95], [0.415, 99], [0.45, 97], [0.6, 89], [0.8, 82]];
  var la = [[0, 4], [0.05, 9], [0.09, 5], [0.12, 8], [0.16, 2], [0.3, 6], [0.41, 10], [0.47, 8], [0.55, 4], [0.7, 4], [0.8, 4]];
  var wigSvg = '<svg viewBox="0 0 560 270">' +
    '<rect x="' + wg.X(0.12) + '" y="20" width="' + (wg.X(0.41) - wg.X(0.12)) + '" height="200" fill="' + RED + '" opacity=".06"/>' +
    txt((wg.X(0.12) + wg.X(0.41)) / 2, 16, 'szisztolé', 12, 'middle', 'font-weight="700" fill="' + RED + '"') + txt((wg.X(0.41) + wg.X(0.8)) / 2, 16, 'diasztolé', 12, 'middle', 'font-weight="700" fill="' + BLUE + '"') +
    axes(70, 220, 548, 22) + txt(546, 238, 't (s)', 11, 'end') + txt(64, 30, 'p (mmHg)', 11, 'end') +
    [0, 40, 80, 120].map(function (p) { return txt(64, wg.Y(p) + 4, p, 10, 'end', 'muted'); }).join('') +
    [0, 0.2, 0.4, 0.6, 0.8].map(function (t) { return txt(wg.X(t), 236, String(t).replace('.', ','), 10, 'middle', 'muted'); }).join('') +
    [[0.12, 'mitrális zár'], [0.15, 'aorta nyit'], [0.41, 'aorta zár'], [0.47, 'mitrális nyit']].map(function (e, i) {
      return '<line x1="' + wg.X(e[0]) + '" y1="24" x2="' + wg.X(e[0]) + '" y2="220" stroke="var(--muted)" stroke-dasharray="3 4"/>' + txt(wg.X(e[0]) + (i % 2 ? 3 : -3), 258 - (i % 2) * 0, e[1], 9.5, i % 2 ? 'start' : 'end', 'muted');
    }).join('') +
    '<path d="' + spline(ao, wg.X, wg.Y) + '" fill="none" stroke="' + RED + '" stroke-width="2.5"/>' +
    '<path d="' + spline(lv, wg.X, wg.Y) + '" fill="none" stroke="' + PURPLE + '" stroke-width="3"/>' +
    '<path d="' + spline(la, wg.X, wg.Y) + '" fill="none" stroke="' + BLUE + '" stroke-width="2.2"/>' +
    txt(wg.X(0.62), wg.Y(92) - 4, 'aorta', 11, 'middle', 'fill="' + RED + '"') + txt(wg.X(0.3), wg.Y(60), 'bal kamra', 11, 'middle', 'fill="' + PURPLE + '"') + txt(wg.X(0.64), wg.Y(4) - 8, 'bal pitvar', 11, 'middle', 'fill="' + BLUE + '"') +
    txt(wg.X(0.415) + 6, wg.Y(99) - 8, 'incisura', 9, null, 'muted') + '</svg>';

  /* ---------- 6. EKG ---------- */
  function g(t, m, a, w) { return a * Math.exp(-Math.pow((t - m) / w, 2)); }
  function ecg(t) { t = t % 0.8; return g(t, 0.1, 0.15, 0.025) + g(t, 0.19, -0.1, 0.008) + g(t, 0.21, 1.0, 0.01) + g(t, 0.232, -0.25, 0.01) + g(t, 0.45, 0.3, 0.04); }
  var eX = function (t) { return 30 + t / 1.65 * 510; }, eY = function (v) { return 150 - v * 110; };
  var ekgSvg = '<svg viewBox="0 0 560 252">';
  for (var gx = 30; gx <= 540; gx += 15.45) ekgSvg += '<line x1="' + r1(gx) + '" y1="20" x2="' + r1(gx) + '" y2="190" stroke="' + RED + '" stroke-opacity=".15"/>';
  for (var gy = 20; gy <= 190; gy += 15.45) ekgSvg += '<line x1="30" y1="' + r1(gy) + '" x2="540" y2="' + r1(gy) + '" stroke="' + RED + '" stroke-opacity=".15"/>';
  ekgSvg += '<path d="' + plot(ecg, 0, 1.65, 700, eX, eY) + '" fill="none" stroke="var(--fg)" stroke-width="2.2"/>' +
    txt(eX(0.1), eY(0.15) - 8, 'P', 13, 'middle', 'font-weight="700" fill="' + BLUE + '"') + txt(eX(0.19) - 4, eY(-0.1) + 18, 'Q', 12, 'middle', 'font-weight="700"') +
    txt(eX(0.21) + 12, eY(1.0) + 10, 'R', 13, 'middle', 'font-weight="700" fill="' + RED + '"') + txt(eX(0.235) + 4, eY(-0.25) + 16, 'S', 12, 'middle', 'font-weight="700"') + txt(eX(0.45), eY(0.3) - 8, 'T', 13, 'middle', 'font-weight="700" fill="' + GREEN + '"');
  function span(a, b, y, t, col) { return arrow(eX(a) + 8, y, eX(a), y, col, 1.3) + arrow(eX(b) - 8, y, eX(b), y, col, 1.3) + '<line x1="' + eX(a) + '" y1="' + y + '" x2="' + eX(b) + '" y2="' + y + '" stroke="' + col + '" stroke-width="1.3"/>' + txt((eX(a) + eX(b)) / 2, y + 14, t, 10, 'middle', 'fill="' + col + '"'); }
  ekgSvg += span(0.075, 0.185, 196, 'PQ', BLUE) + span(0.185, 0.245, 212, 'QRS', RED) + span(0.185, 0.5, 230, 'QT', GREEN) + span(0.21, 1.01, 8, 'RR = 0,8 s → 75/perc', PURPLE).replace(/y="22"/, 'y="22"') +
    txt(540, 246, '1 kis négyzet = 1 mm = 0,04 s (25 mm/s)', 10, 'end', 'muted') + '</svg>';

  /* ---------- 7. Oxigén-disszociációs görbe ---------- */
  function hill(p, p50) { return p <= 0 ? 0 : 100 / (1 + Math.pow(p50 / p, 2.7)); }
  var oX = function (p) { return 70 + p / 110 * 460; }, oY = function (s) { return 220 - s / 100 * 190; };
  var o2Svg = '<svg viewBox="0 0 560 260">' + axes(70, 220, 548, 20) + txt(546, 252, 'P_O2 (mmHg)', 11, 'end') + txt(76, 26, 'S_O2 (%)', 11) +
    [0, 20, 40, 60, 80, 100].map(function (p) { return txt(oX(p), 236, p, 10, 'middle', 'muted') + '<line x1="' + oX(p) + '" y1="30" x2="' + oX(p) + '" y2="220" stroke="var(--line)"/>'; }).join('') +
    [0, 25, 50, 75, 100].map(function (s) { return txt(64, oY(s) + 4, s, 10, 'end', 'muted'); }).join('') +
    '<path d="' + plot(function (p) { return hill(p, 32); }, 0.5, 110, 200, oX, oY) + '" fill="none" stroke="' + ORANGE + '" stroke-width="2.2" stroke-dasharray="6 4"/>' +
    '<path d="' + plot(function (p) { return hill(p, 26.8); }, 0.5, 110, 200, oX, oY) + '" fill="none" stroke="' + RED + '" stroke-width="3"/>' +
    '<line x1="70" y1="' + oY(50) + '" x2="' + oX(26.8) + '" y2="' + oY(50) + '" stroke="var(--muted)" stroke-dasharray="3 3"/><line x1="' + oX(26.8) + '" y1="' + oY(50) + '" x2="' + oX(26.8) + '" y2="220" stroke="var(--muted)" stroke-dasharray="3 3"/>' +
    txt(oX(26.8) + 4, 214, 'P50 ≈ 27', 10, null, 'muted') +
    '<circle cx="' + oX(100) + '" cy="' + oY(hill(100, 26.8)) + '" r="6" fill="' + RED + '"/>' + txt(oX(100), oY(hill(100, 26.8)) + 42, 'artériás: 100 mmHg, 97%', 11, 'end', 'fill="' + RED + '"') +
    '<circle cx="' + oX(40) + '" cy="' + oY(hill(40, 26.8)) + '" r="6" fill="' + BLUE + '"/>' + txt(oX(40) + 14, oY(hill(40, 26.8)) + 34, 'vénás: 40 mmHg, 75%', 11, null, 'fill="' + BLUE + '"') +
    txt(oX(52), oY(40), 'jobbra tolódás (szaggatott):', 11, null, 'fill="' + ORANGE + '"') + txt(oX(52), oY(40) + 15, '↑CO₂, ↑H⁺ (↓pH), ↑hőmérséklet, ↑2,3-BPG', 10, null, 'muted') +
    txt(oX(52), oY(40) + 29, '→ a szövetekben több O₂ szabadul fel', 10, null, 'muted') + '</svg>';

  /* ---------- 8. Nefron ---------- */
  var nephSvg = '<svg viewBox="0 -36 560 336">' +
    '<circle cx="80" cy="70" r="30" fill="none" stroke="' + TEAL + '" stroke-width="5"/>' +
    '<path d="M66 60 q8 -12 16 0 t16 0 M64 74 q8 10 16 0 t16 0 M70 86 q8 -8 14 0" fill="none" stroke="' + RED + '" stroke-width="3"/>' +
    arrow(20, 52, 58, 62, RED, 2.5) + arrow(60, 82, 22, 92, RED, 2.5) +
    '<path d="M110 70 C 140 40, 160 100, 185 66 S 220 40, 235 80 L 235 250 Q 250 275 265 250 L 265 120 C 270 95, 300 120, 310 92 S 340 70, 360 90 L 400 90" fill="none" stroke-width="7" stroke-linecap="round" stroke="' + ORANGE + '"/>' +
    '<path d="M235 110 L 235 250 Q 250 275 265 250 L 265 140" fill="none" stroke-width="7" stroke="' + BLUE + '"/>' +
    '<path d="M265 140 L 265 120 C 270 95, 300 120, 310 92 S 340 70, 360 90 L 400 90" fill="none" stroke-width="7" stroke-linecap="round" stroke="' + GREEN + '"/>' +
    '<path d="M400 40 L 400 285" fill="none" stroke-width="10" stroke-linecap="round" stroke="' + PURPLE + '"/>' + arrow(400, 260, 400, 296, PURPLE, 3) +
    txt(80, 120, 'glomerulus +', 11, 'middle', 'font-weight="700" fill="' + TEAL + '"') + txt(80, 134, 'Bowman-tok', 11, 'middle', 'font-weight="700" fill="' + TEAL + '"') +
    txt(80, 150, 'szűrés: 180 L/nap', 10, 'middle', 'muted') + txt(18, 44, 'afferens', 9, null, 'muted') + txt(18, 108, 'efferens', 9, null, 'muted') +
    txt(175, -20, 'proximális kanyarulatos csatorna', 11, 'middle', 'font-weight="700" fill="' + ORANGE + '"') + txt(175, -6, 'kb. 65% Na⁺ és víz, a glükóz és aminosav ~100%-a vissza', 10, 'middle', 'muted') +
    txt(225, 200, 'Henle-kacs', 11, 'end', 'font-weight="700" fill="' + BLUE + '"') + txt(225, 214, 'ellenáramú', 10, 'end', 'muted') + txt(225, 227, 'koncentráló', 10, 'end', 'muted') +
    txt(320, 64, 'disztális csatorna', 11, 'middle', 'font-weight="700" fill="' + GREEN + '"') + txt(336, 140, 'aldoszteron: Na⁺ vissza,', 10, 'middle', 'muted') + txt(336, 153, 'K⁺ ki', 10, 'middle', 'muted') +
    txt(414, 160, 'gyűjtőcsatorna', 11, null, 'font-weight="700" fill="' + PURPLE + '"') + txt(414, 174, 'ADH: vízvisszaszívás', 10, null, 'muted') + txt(414, 288, 'vizelet ~1,5 L/nap', 10, null, 'muted') +
    '<line x1="20" y1="180" x2="380" y2="180" stroke="var(--muted)" stroke-dasharray="6 5"/>' + txt(20, 172, 'kéreg', 10, null, 'muted') + txt(20, 194, 'velő', 10, null, 'muted') + '</svg>';

  /* ---------- 9. Reflexív ---------- */
  var refSvg = '<svg viewBox="0 0 560 240">' +
    '<ellipse cx="450" cy="115" rx="80" ry="62" fill="' + BG + '" stroke="' + FG + '" stroke-width="2"/>' +
    '<path d="M450 70 C 420 60, 405 80, 418 100 C 400 130, 410 160, 440 158 L 450 140 L 460 158 C 490 160, 500 130, 482 100 C 495 80, 480 60, 450 70 z" fill="' + FG + '" opacity=".25"/>' +
    txt(450, 196, 'gerincvelő (keresztmetszet)', 11, 'middle', 'muted') + txt(450, 64, 'hátsó szarv', 9, 'middle', 'muted') + txt(450, 172, 'mellső szarv', 9, 'middle', 'muted') +
    '<path d="M80 60 C 200 30, 330 40, 400 60 C 430 70, 440 85, 445 105" fill="none" stroke="' + BLUE + '" stroke-width="3"/>' + '<circle cx="350" cy="48" r="9" fill="' + BLUE + '"/>' +
    txt(350, 30, 'hátsó gyöki ganglion', 10, 'middle', 'fill="' + BLUE + '"') + head(445, 105, Math.PI / 2.4, BLUE, 9) +
    '<circle cx="447" cy="125" r="5" fill="' + ORANGE + '"/>' + txt(470, 128, 'szinapszis', 10, null, 'fill="' + ORANGE + '"') +
    '<path d="M445 132 C 440 150, 420 165, 380 172 C 280 190, 180 185, 110 170" fill="none" stroke="' + RED + '" stroke-width="3"/>' + head(110, 170, Math.atan2(-15, -70), RED, 10) +
    '<ellipse cx="80" cy="110" rx="34" ry="70" fill="' + PINK + '" opacity=".25" stroke="' + PINK + '" stroke-width="2"/>' + txt(80, 114, 'izom', 12, 'middle', 'font-weight="700" fill="' + PINK + '"') +
    '<path d="M70 52 l10 6 l-10 6 l10 6" fill="none" stroke="' + BLUE + '" stroke-width="2"/>' +
    txt(80, 30, '① receptor (izomorsó)', 11, 'middle', 'fill="' + BLUE + '"') + txt(220, 30, '② érző (afferens) rost', 11, 'middle', 'fill="' + BLUE + '"') +
    txt(470, 112, '③', 11, null, 'fill="' + ORANGE + '"') + txt(250, 204, '④ mozgató (efferens) rost – α-motoneuron', 11, 'middle', 'fill="' + RED + '"') +
    txt(80, 200, '⑤ effektor', 11, 'middle', 'fill="' + PINK + '"') + '</svg>';

  /* ---------- 10. Vércukor-szabályozás ---------- */
  function box(x, y, w, h, t1, t2, col) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + col + '" opacity=".14" stroke="' + col + '" stroke-width="1.5"/>' +
      txt(x + w / 2, y + (t2 ? h / 2 - 3 : h / 2 + 4), t1, 12, 'middle', 'font-weight="700" fill="' + col + '"') + (t2 ? txt(x + w / 2, y + h / 2 + 13, t2, 10, 'middle', 'muted') : '');
  }
  var gluSvg = '<svg viewBox="0 0 560 250">' +
    box(195, 100, 170, 50, 'vércukor', '3,9–5,6 mmol/L (éhgyomor)', PURPLE) +
    box(20, 20, 160, 46, 'étkezés után ↑', '', ORANGE) + box(20, 184, 160, 46, 'éhezés, terhelés ↓', '', BLUE) +
    box(380, 20, 165, 46, 'β-sejtek → inzulin', 'Langerhans-szigetek', GREEN) + box(380, 184, 165, 46, 'α-sejtek → glukagon', 'Langerhans-szigetek', RED) +
    arrow(180, 43, 380, 43, ORANGE, 2) + arrow(180, 207, 380, 207, BLUE, 2) +
    arrow(410, 66, 367, 110, GREEN, 2) + arrow(410, 184, 367, 140, RED, 2) +
    txt(420, 94, 'GLUT4-felvétel (izom, zsír),', 10, null, 'fill="' + GREEN + '"') + txt(420, 106, 'glikogénszintézis → ↓', 10, null, 'fill="' + GREEN + '"') +
    txt(420, 152, 'máj: glikogenolízis,', 10, null, 'fill="' + RED + '"') + txt(420, 164, 'glükoneogenezis → ↑', 10, null, 'fill="' + RED + '"') +
    txt(100, 125, 'negatív', 11, 'middle', 'font-weight="700"') + txt(100, 140, 'visszacsatolás', 11, 'middle', 'font-weight="700"') + '</svg>';

  STUDIE.addCourse({
    id: 'anatomia',
    title: 'Anatómia és élettan',
    icon: '🫀',
    color: '#c2417a',
    level: 'BSc 1–2. félév (orvos-, egészségtudomány, biológus, sporttudomány)',
    description: 'Szövetektől a szervrendszerekig: ingerület, izomműködés, keringés, légzés, idegrendszer, anyagcsere és vese.',
    intro: 'Ez a kurzus az emberi szervezet felépítésének (anatómia) és működésének (élettan) alapfogalmait gyűjti egy helyre, mennyiségi szemlélettel: a képletek a mérhető élettani adatokat kötik össze. A [[sziv|szív]] és a [[sejt|sejt]] modellben kézzelfoghatóan is körbejárhatod a szerveket.',
    topics: [
      { id: 'sejt', title: 'Sejtek és szövetek' },
      { id: 'mozgas', title: 'Mozgásrendszer' },
      { id: 'keringes', title: 'Keringés és légzés' },
      { id: 'ideg', title: 'Idegrendszer és érzékszervek' },
      { id: 'anyagcsere', title: 'Anyagcsere, hormonok és kiválasztás' }
    ],
    formulas: [
      {
        id: 'percterfogat', title: 'Perctérfogat', en: 'cardiac output',
        parts: [{ t: 'CO', d: 'Perctérfogat: a bal kamra által percenként kilökött vér térfogata', unit: 'L/perc' }, { t: '=' }, { t: 'HR', d: 'Szívfrekvencia (pulzusszám)', unit: '1/perc' }, { t: '·' },
          { t: 'SV', d: 'Verőtérfogat: egy összehúzódással kilökött vér', unit: 'mL', more: 'SV = EDV − ESV (végdiasztolés mínusz végszisztolés térfogat); nyugalomban kb. 70 mL.' }],
        text: 'A perctérfogat a keringés „teljesítménye”: nyugalomban kb. 5 L/perc, azaz percenként egyszer a teljes vértérfogat körbefordul. Terheléskor mindkét tényező nő: a pulzus a szimpatikus hatásra, a verőtérfogat a fokozott kontraktilitás és a nagyobb vénás visszaáramlás (Frank–Starling-mechanizmus) miatt. Testfelületre vonatkoztatva **szívindex** (kb. 3 L/perc/m²).',
        example: 'Nyugalomban 70/perc × 70 mL = `4,9 L/perc`. Edzett állóképességi sportoló maximális terhelésen 190/perc × 180 mL = `34,2 L/perc`.'
      },
      {
        id: 'ejekcios-frakcio', title: 'Ejekciós frakció', en: 'ejection fraction',
        parts: [{ t: 'EF', d: 'Ejekciós frakció: a kamra telődési térfogatának kilökött hányada', unit: '%' }, { t: '=' }, { t: 'SV', d: 'Verőtérfogat', unit: 'mL' }, { t: '/' }, { t: 'EDV', d: 'Végdiasztolés térfogat: a kamra térfogata a telődés végén', unit: 'mL' }],
        text: 'A kamrai pumpafunkció legfontosabb klinikai mérőszáma, szívultrahanggal mérik. Normálisan **55–70%**; 40% alatt csökkent ejekciós frakciójú szívelégtelenségről beszélünk.',
        example: 'EDV = 120 mL, ESV = 50 mL: `SV = 70 mL`, `EF = 70/120 ≈ 58%`.'
      },
      {
        id: 'nernst', title: 'Nernst-egyenlet', en: 'Nernst equation',
        parts: [{ t: 'E_{ion}', d: 'Az ion egyensúlyi (Nernst-) potenciálja: az a membránpotenciál, amelynél az ion nettó árama nulla', unit: 'mV' }, { t: '=' }, { t: '(' }, { t: 'R', d: 'Egyetemes gázállandó', unit: '8,314 J/(mol·K)' }, { t: '·' }, { t: 'T', d: 'Abszolút hőmérséklet', unit: 'K', more: 'Testhőmérsékleten 310 K.' },
          { t: ') / (' }, { t: 'z', d: 'Az ion töltésszáma (előjelesen)', unit: '–', more: 'Na⁺, K⁺: +1; Ca²⁺: +2; Cl⁻: −1.' }, { t: '·' }, { t: 'F', d: 'Faraday-állandó', unit: '96 485 C/mol' }, { t: ') · ln (' }, { t: 'c_{kint}', d: 'Extracelluláris koncentráció', unit: 'mmol/L' }, { t: '/' }, { t: 'c_{bent}', d: 'Intracelluláris koncentráció', unit: 'mmol/L' }, { t: ')' }],
        text: 'Az egyensúlyi potenciálon a koncentrációkülönbségből adódó diffúziós „hajtóerő” és az elektromos erő éppen kiegyenlíti egymást. 37 °C-on, tízes alapú logaritmussal: `E = (61,5 mV / z) · lg(c_kint / c_bent)`. Több ion együttes hatását a **Goldman–Hodgkin–Katz-egyenlet** írja le, amelyben az egyes ionok a membrán rájuk vonatkozó permeabilitásával súlyozva szerepelnek.',
        example: 'K⁺: kívül 5, belül 140 mmol/L → `E_K = 61,5 · lg(5/140) ≈ −89 mV`. Na⁺: kívül 145, belül 12 mmol/L → `E_Na = 61,5 · lg(145/12) ≈ +67 mV`.'
      },
      {
        id: 'kozepnyomas', title: 'Artériás középnyomás', en: 'mean arterial pressure (MAP)',
        parts: [{ t: 'MAP', d: 'Artériás középnyomás: a vérnyomás időbeli átlaga egy szívciklusra', unit: 'mmHg' }, { t: '≈' }, { t: 'P_d', d: 'Diasztolés nyomás', unit: 'mmHg' }, { t: '+ (' }, { t: 'P_s', d: 'Szisztolés nyomás', unit: 'mmHg' }, { t: '−' }, { t: 'P_d', d: 'Diasztolés nyomás', unit: 'mmHg' }, { t: ') / 3' }],
        text: 'A `P_s − P_d` különbség a **pulzusnyomás**. Nyugalmi pulzusnál a ciklus kb. kétharmada diasztolé, ezért a középnyomás közelebb van a diasztolés értékhez (az 1/3-os szorzó ezt közelíti). A szervek perfúzióját a középnyomás határozza meg; 60–65 mmHg alatt a szervek vérellátása veszélybe kerül.',
        example: '120/80 mmHg: `MAP ≈ 80 + 40/3 ≈ 93 mmHg`, a pulzusnyomás 40 mmHg.'
      },
      {
        id: 'keringesi-ellenallas', title: 'A keringés „Ohm-törvénye”', en: 'haemodynamic Ohm’s law',
        parts: [{ t: 'ΔP', d: 'Nyomáskülönbség: artériás középnyomás − jobb pitvari nyomás (≈ MAP)', unit: 'mmHg' }, { t: '=' }, { t: 'CO', d: 'Perctérfogat (áramlás)', unit: 'L/perc' }, { t: '·' }, { t: 'TPR', d: 'Teljes perifériás ellenállás', unit: 'mmHg·perc/L', more: 'Elsősorban az arteriolák átmérője határozza meg (Hagen–Poiseuille: R ∝ 1/r⁴).' }],
        text: 'Az elektromos `U = I·R` keringési megfelelője. A vérnyomás tehát kétféleképpen nőhet: nagyobb perctérfogattal vagy nagyobb perifériás ellenállással (érszűkülettel). A Hagen–Poiseuille-törvény szerint az ellenállás az érsugár **negyedik hatványával** fordítottan arányos, ezért az arteriolák kis átmérőváltozása is nagy hatású.',
        example: 'MAP = 93 mmHg, CO = 5 L/perc: `TPR ≈ 93/5 ≈ 18,7 mmHg·perc/L`. Ha az arteriolák sugara 19%-kal csökken, az ellenállás `1/0,81⁴ ≈ 2,3`-szorosára nő.'
      },
      {
        id: 'fick', title: 'Fick-elv', en: 'Fick principle',
        parts: [{ t: 'V̇_{O2}', d: 'Oxigénfogyasztás', unit: 'mL/perc' }, { t: '=' }, { t: 'CO', d: 'Perctérfogat', unit: 'L/perc' }, { t: '· (' }, { t: 'C_{aO2}', d: 'Artériás vér oxigéntartalma', unit: 'mL O₂/L vér' }, { t: '−' }, { t: 'C_{vO2}', d: 'Kevert vénás vér oxigéntartalma (arteria pulmonalisból)', unit: 'mL O₂/L vér' }, { t: ')' }],
        text: 'Tömegmegmaradás: amennyi oxigént a szervezet felvesz, annyival kevesebb távozik a vénás vérrel. Átrendezve a perctérfogat mérésének klasszikus módszere: `CO = V̇O₂ / (C_aO₂ − C_vO₂)`. Ugyanez az elv érvényes bármely szervre és anyagra (pl. a vese clearance-e is Fick-elv).',
        example: 'V̇O₂ = 250 mL/perc, C_aO₂ = 200 mL/L, C_vO₂ = 150 mL/L: `CO = 250/50 = 5 L/perc`.'
      },
      {
        id: 'oxigentartalom', title: 'A vér oxigéntartalma', en: 'arterial oxygen content',
        parts: [{ t: 'C_{aO2}', d: 'A vér oxigéntartalma', unit: 'mL O₂/dL' }, { t: '=' }, { t: '1,34 ·' }, { t: 'Hb', d: 'Hemoglobin-koncentráció', unit: 'g/dL', more: '1,34 mL O₂ köthető grammonként (Hüfner-szám).' }, { t: '·' }, { t: 'S_{aO2}', d: 'Hemoglobin oxigénszaturációja', unit: '0…1' }, { t: '+ 0,003 ·' }, { t: 'P_{aO2}', d: 'Artériás oxigén-parciális nyomás (fizikailag oldott rész)', unit: 'mmHg' }],
        text: 'Az oxigén több mint 98%-a hemoglobinhoz kötve szállítódik, a fizikailag oldott rész elhanyagolható (kivéve túlnyomásos oxigénterápiát). Ezért vérszegénységben az oxigénszállítás akkor is csökken, ha a szaturáció és a P_aO₂ normális.',
        example: 'Hb = 15 g/dL, S_aO₂ = 0,975, P_aO₂ = 100 mmHg: `1,34 · 15 · 0,975 + 0,3 ≈ 19,9 mL/dL` (≈ 200 mL/L). Vénás vérben (S = 0,75, P = 40): `≈ 15,2 mL/dL`.'
      },
      {
        id: 'clearance', title: 'Renális clearance és GFR', en: 'renal clearance, GFR',
        parts: [{ t: 'C_x', d: 'Az x anyag clearance-e: az a plazmatérfogat, amelyet a vese időegység alatt az anyagtól teljesen megtisztít', unit: 'mL/perc' }, { t: '=' }, { t: '(' }, { t: 'U_x', d: 'Az anyag koncentrációja a vizeletben', unit: 'mg/mL' }, { t: '·' }, { t: 'V̇', d: 'Vizeletáramlás (perc-diurézis)', unit: 'mL/perc' }, { t: ') /' }, { t: 'P_x', d: 'Az anyag plazmakoncentrációja', unit: 'mg/mL' }],
        text: 'Ha egy anyag szabadon filtrálódik, de nem szívódik vissza és nem is szekretálódik (inulin, közelítőleg a kreatinin), a clearance-e egyenlő a **glomeruláris filtrációs rátával (GFR)**, egészséges felnőttben kb. 125 mL/perc. Ha egy anyag clearance-e < GFR, visszaszívódik (pl. glükóz: 0); ha > GFR, szekretálódik is (pl. PAH, amelynek clearance-e a vese plazmaátáramlását közelíti).',
        example: 'Kreatinin: vizeletben 100 mg/dL, plazmában 1 mg/dL, vizeletáramlás 1,25 mL/perc: `C = 100 · 1,25 / 1 = 125 mL/perc` – ez napi `125 · 1440 ≈ 180 L` szűrlet.'
      }
    ],
    terms: [
      /* ----- Sejtek és szövetek ----- */
      { id: 'hamszovet', term: 'Hámszövet', en: 'epithelial tissue, epithelium', latin: 'textus epithelialis (epithelium)', topic: 'sejt',
        short: 'Szorosan illeszkedő sejtekből álló, alaphártyán ülő, ér nélküli szövet, amely a test külső és belső felszíneit borítja, illetve mirigyeket alkot.',
        prereq: ['lecke:biologia/sejt', 'modell:sejt'],
        text: 'Jellemzői: kevés sejtközötti állomány, a sejtek **sejtkapcsoló struktúrákkal** (zárókapcsolat, deszmoszóma, réskapcsolat) kötődnek, egyik oldaluk szabad felszín (apikális), a másik a **bazális membránon** ül. Erei nincsenek: táplálása az alatta fekvő kötőszövetből diffúzióval történik. Gyorsan megújul.\n\nOsztályozás a rétegek száma és a sejtalak szerint:\n\n- **egyrétegű laphám**: érbelhártya (endotél), tüdőléghólyagok – gyors diffúzió;\n- **egyrétegű köbhám / hengerhám**: vesecsatornák, bélhám (mikrobolyhokkal) – felszívás, kiválasztás;\n- **többmagsoros csillós hengerhám**: légutak – nyák szállítása;\n- **többrétegű laphám**: bőr (elszarusodó), szájüreg, nyelőcső (el nem szarusodó) – mechanikai védelem;\n- **átmeneti hám**: húgyhólyag – nyúlékony.\n\nA **mirigyhám** váladékot termel: exokrin (kivezetőcsővel) vagy endokrin (a vérbe).',
        example: 'A légzőfelszín egyrétegű laphámja a kapilláris endotéllel együtt csak kb. 0,5 µm vastag – ezért gyors a gázcsere. A bőr többrétegű elszarusodó laphámja (epidermisz) ezzel szemben 0,05–1,5 mm, kb. 4 hét alatt újul meg; a vékonybél hámja 3–5 nap alatt.',
        pitfall: 'A „többmagsoros” hám **egyrétegű**: minden sejt eléri az alaphártyát, csak a sejtmagok vannak különböző magasságban, ezért látszik többrétegűnek.',
        related: ['kotoszovet', 'gazcsere', 'emesztes', 'nefron'],
        models: ['sejt'] },
      { id: 'kotoszovet', term: 'Kötőszövet', en: 'connective tissue', latin: 'textus connectivus', topic: 'sejt',
        short: 'Sejtekből és bőséges sejtközötti állományból (rostok + alapállomány) álló szövetcsoport, amely összeköt, támaszt, véd és szállít.',
        prereq: ['lecke:biologia/sejt', 'anatomia/hamszovet'],
        text: 'A tulajdonságait elsősorban a **sejtközötti állomány** (extracelluláris mátrix) adja:\n\n- **kollagénrostok** (I-es típus): nagy húzószilárdság;\n- **rugalmas rostok** (elasztin): nyújthatóság, visszarugózás (aorta, tüdő);\n- **retikuláris rostok**: finom váz (nyirokszervek, máj);\n- **alapállomány**: proteoglikánok, hialuronsav, víz.\n\nFő típusai: **laza rostos** (szervek közti kitöltés), **tömött rostos** (inak, szalagok, ízületi tok), **zsírszövet**, **porc** (üvegporc, rugalmas porc, rostos porc), **csont**, valamint a folyékony sejtközötti állományú **vér** és **nyirok**. Kialakítói a fibroblasztok, porcban a kondrociták, csontban az oszteociták.\n\nA porcnak nincs ere, ezért sérülése után nagyon lassan, rosszul gyógyul.',
        example: 'Az Achilles-ín keresztmetszete kb. 60 mm², szakítószilárdsága 50–100 N/mm², így `3000–6000 N`-t bír el. Futáskor a terhelés a testsúly 6–8-szorosa: 70 kg-os embernél `4100–5500 N` – az ín a teherbírása határához közel dolgozik.',
        pitfall: 'A vér is kötőszövet: sejtjei folyékony sejtközötti állományban (plazmában) vannak, és ugyanabból a csíralemezből (mezodermából) származik, mint a többi kötőszövet.',
        related: ['hamszovet', 'csont', 'izulet', 'izomszovet'] },
      { id: 'izomszovet', term: 'Izomszövet', en: 'muscle tissue', latin: 'textus muscularis', topic: 'sejt',
        short: 'Összehúzódásra specializált szövet; három típusa a vázizom (harántcsíkolt), a szívizom és a simaizom.',
        prereq: ['lecke:termeszet/emberi-test', 'anatomia/kotoszovet'],
        text: 'Mindhárom típus aktin–miozin rendszerrel húzódik össze, de felépítésük és vezérlésük eltér:\n\n- **Vázizom**: sokmagvú, akár több cm hosszú izomrostok; harántcsíkolt; akaratlagos, szomatikus mozgatóideg vezérli; a Ca²⁺ a szarkoplazmatikus retikulumból jön; gyors ingersorozattal tetanizálható.\n- **Szívizom**: egy-két magvú, elágazó sejtek, interkaláris lemezekkel kapcsolva; harántcsíkolt; önműködő (a szinuszcsomó indítja), a vegetatív idegrendszer csak módosítja; a Ca²⁺ részben kívülről, részben az SR-ből jön; nem tetanizálható.\n- **Simaizom**: egymagvú, orsó alakú sejtek; nincs harántcsíkolat; akaratlan (vegetatív ideg, hormonok, helyi tényezők); Ca²⁺ főként kívülről, a kalmodulinon át hat; lassú, tartós (tónusos) összehúzódásra képes.\n\nA **szívizom** sejtjei réskapcsolatokkal funkcionális szincíciumot alkotnak: az ingerület sejtről sejtre terjed, a kamra egy egységként húzódik össze.',
        example: 'A szívizom akciós potenciálja kb. 250–300 ms hosszú platófázissal, a refrakter szakasz ezért majdnem a teljes összehúzódás alatt tart. Így a szív nem tetanizálható: két összehúzódás között mindig van ernyedés és telődés – ellentétben a vázizommal, amely 50–100 Hz-es ingerléssel tartós (tetanuszos) összehúzódásba vihető.',
        pitfall: 'A simaizom is tud nagy erőt kifejteni, sőt tartósan és kevés ATP-vel: a „retesz” (latch) állapotban a kereszthidak lassan válnak le. A „gyenge” jelző csak a sebességére igaz.',
        related: ['szarkomer', 'izomosszehuzodas', 'sziv-ciklus', 'idegszovet', 'kotoszovet'],
        models: ['sziv'] },
      { id: 'idegszovet', term: 'Idegszövet', en: 'nervous tissue', latin: 'textus nervosus', topic: 'sejt',
        short: 'Ingerület keletkezésére, vezetésére és feldolgozására specializált szövet, amely idegsejtekből (neuronok) és gliasejtekből áll.',
        prereq: ['lecke:biologia/ideg-hormon-emesztes', 'anatomia/hamszovet'],
        text: 'Az emberi agyban kb. 86 milliárd **neuron** és nagyjából ugyanennyi **gliasejt** van. A neuronok ingerelhetők és ingerületet vezetnek; a gliák támasztanak, táplálnak, szigetelnek és védenek:\n\n- **asztrociták**: ionösszetétel és neurotranszmitterek eltakarítása, vér–agy gát fenntartása;\n- **oligodendrociták** (központi idegrendszer) és **Schwann-sejtek** (környéki idegrendszer): **mielinhüvely**;\n- **mikroglia**: az idegrendszer immunsejtjei (fagocitózis);\n- **ependimasejtek**: az agykamrák bélése, agy-gerincvelői folyadék termelése.\n\nAz agyban a sejttestek a **szürkeállományban**, a mielinhüvelyes rostok a **fehérállományban** csoportosulnak. A felnőtt neuronok gyakorlatilag nem osztódnak.',
        example: 'A mielinhüvely hatása: a mielinizált motoros rostok (Aα) 70–120 m/s-mal, a vékony velőtlen fájdalomrostok (C) 0,5–2 m/s-mal vezetnek. Egy 1 m-es pályán ez kb. 10 ms, illetve fél–két másodperc: ezért érezzük a „második”, tompa fájdalmat később.',
        pitfall: 'A környéki idegrendszerben a Schwann-sejt egyetlen axonszakaszt burkol, a központi idegrendszerben egy oligodendrocita több axont is. Ezért mást érint a sclerosis multiplex (központi) és a Guillain–Barré-szindróma (környéki).',
        related: ['neuron', 'akcios-potencial', 'szinapszis', 'kozponti-kornyeki', 'izomszovet'] },
      { id: 'membranpotencial', term: 'Nyugalmi membránpotenciál', en: 'resting membrane potential', topic: 'sejt',
        short: 'A sejt belseje és külseje közötti nyugalmi feszültségkülönbség (idegsejtben kb. −70 mV), amelyet az ionok egyenlőtlen eloszlása és a membrán szelektív áteresztőképessége hoz létre.',
        prereq: ['lecke:biologia/sejt', 'kemia-bsc/elektrodpotencial', 'fizika-bsc/potencial'],
        visual: memSvg, caption: 'Tipikus ionkoncentrációk az emlős idegsejt két oldalán, az egyes ionok Nernst-potenciáljával. A Na⁺/K⁺-pumpa tartja fenn a koncentrációkülönbségeket.',
        text: 'Két feltétele van:\n\n1. **Koncentráció-grádiens**: a **Na⁺/K⁺-ATPáz** egy ATP elhasználásával 3 Na⁺-ot visz ki és 2 K⁺-ot be. Így belül sok a K⁺, kívül sok a Na⁺.\n2. **Szelektív permeabilitás**: nyugalomban a membrán főként K⁺-ra átjárható (szivárgó csatornák). A K⁺ kiáramlik a koncentrációkülönbség irányában, és pozitív töltést visz ki, amíg a kialakuló elektromos tér meg nem állítja.\n\nA nyugalmi potenciál ezért közel van a K⁺ egyensúlyi potenciáljához (−89 mV), de a kis Na⁺-permeabilitás a pozitív irányba húzza (−70 mV). A pontos értéket a **Goldman–Hodgkin–Katz-egyenlet** adja. A potenciál a membrán közvetlen közelében lévő igen kevés töltésen múlik: a koncentrációk ettől gyakorlatilag nem változnak.',
        formulas: ['nernst'],
        example: 'Ha az extracelluláris K⁺ 5-ről 10 mmol/L-re nő (hiperkalémia), az E_K `61,5 · lg(10/140) ≈ −70 mV`-ra emelkedik: a sejtek depolarizálódnak. A szívben ez ritmuszavart, súlyos esetben szívmegállást okozhat.',
        pitfall: 'A Na⁺/K⁺-pumpa közvetlen (elektrogén) hozzájárulása a nyugalmi potenciálhoz csak néhány mV. A fő szerepe a koncentráció-grádiensek fenntartása; a potenciált elsősorban a K⁺ kiáramlása hozza létre.',
        related: ['akcios-potencial', 'neuron', 'idegszovet', 'szinapszis', 'homeosztazis'],
        models: ['sejt'] },
      { id: 'akcios-potencial', term: 'Akciós potenciál', en: 'action potential', topic: 'sejt',
        short: 'Az ingerlékeny sejtek membránpotenciáljának gyors, sztereotip, „mindent vagy semmit” jellegű átfordulása, amely továbbterjedve az ingerületet hordozza.',
        prereq: ['anatomia/membranpotencial', 'elektronika/komparator'],
        visual: apSvg, caption: 'Az idegsejt akciós potenciálja. A küszöb elérésekor feszültségfüggő Na⁺-csatornák nyílnak; a csúcs után a Na⁺-csatornák inaktiválódnak, a K⁺-csatornák repolarizálnak.',
        text: 'Lépései:\n\n1. **Küszöb** (kb. −55 mV): elegendő depolarizáció hatására feszültségfüggő **Na⁺-csatornák** nyílnak. A beáramló Na⁺ tovább depolarizál: **pozitív visszacsatolás**.\n2. **Csúcs** (kb. +30 mV): a Na⁺-csatornák **inaktiválódnak**.\n3. **Repolarizáció**: késve nyíló feszültségfüggő **K⁺-csatornák** a K⁺ kiáramlásával visszaállítják a negatív potenciált.\n4. **Utóhiperpolarizáció**: a K⁺-csatornák lassan zárnak, ezért a potenciál átmenetileg a nyugalmi érték alá esik.\n\nAz **abszolút refrakter** szakaszban (inaktivált Na⁺-csatornák) új AP nem váltható ki, a **relatív refrakter** szakaszban csak erősebb ingerrel. Ez szabja meg a maximális tüzelési frekvenciát, és ezért terjed az AP egy irányba.\n\nAz inger erősségét nem az AP nagysága, hanem a **frekvenciája** kódolja. Mielinhüvelyes rostban az AP csak a Ranvier-befűződéseken keletkezik: **szaltatórikus** (ugráló) vezetés.',
        example: 'Ha az abszolút refrakter idő 1 ms, a neuron legfeljebb kb. 1000 AP-t adhat másodpercenként; a gyakorlatban a legtöbb neuron 100–500 Hz alatt marad. Egy AP alatt beáramló Na⁺ olyan kevés, hogy egy nagy axon belső Na⁺-koncentrációja több ezer AP után is alig változik.',
        pitfall: 'A „mindent vagy semmit” elv egyetlen sejt egyetlen AP-jára igaz. Egy ideg (sok rost kötege) összegzett válasza viszont fokozatosan nő az ingererősséggel, mert egyre több rost kerül küszöb fölé.',
        related: ['membranpotencial', 'neuron', 'szinapszis', 'idegszovet', 'izomosszehuzodas', 'ekg'] },

      /* ----- Mozgásrendszer ----- */
      { id: 'csont', term: 'A csont szerkezete', en: 'bone structure (compact and spongy bone)', latin: 'os (substantia compacta, substantia spongiosa)', topic: 'mozgas',
        short: 'A csont élő, folyamatosan átépülő kötőszövet: kollagénváz, amelyet hidroxiapatit-kristályok mineralizálnak; makroszkóposan tömör és szivacsos állományból épül fel.',
        prereq: ['anatomia/kotoszovet', 'lecke:termeszet/emberi-test'],
        text: '**Anyaga**: tömegének kb. 60–70%-a ásványi anyag (főként **hidroxiapatit**, Ca₁₀(PO₄)₆(OH)₂), ez adja a nyomószilárdságot; kb. 30% szerves anyag (főként I-es típusú kollagén), ez a hajlékonyságot és a húzószilárdságot.\n\n**Sejtjei**: **oszteoblaszt** (csontépítő), **oszteocita** (a lakúnákba zárt, mechanikai terhelést érzékelő sejt), **oszteoklaszt** (csontbontó, a monocita–makrofág vonalból).\n\n**Szerkezete**:\n\n- **tömör (kompakt) állomány**: koncentrikus lemezekből álló **oszteonok** (Havers-rendszerek), közepükön érrel és ideggel;\n- **szivacsos állomány**: gerendák (trabekulák) hálózata a terhelés fővonalai mentén, közöttük **vörös csontvelő**.\n\nCsöves csont: **diafízis** (velőüreggel), **epifízisek**, köztük gyermekkorban a **növekedési porclemez**; kívül a **csonthártya** (periosteum), amely a vastagodásért és a törések gyógyulásáért felel.',
        example: 'A csontváz évente kb. 10%-a épül át, így nagyjából 10 év alatt „kicserélődik”. A szervezet kb. 1–1,2 kg kalciumának 99%-a a csontokban van: a csont a vér Ca²⁺-szintjének raktára is (parathormon, kalcitonin, D-vitamin).',
        pitfall: 'A csont nem „halott” vázanyag: terhelés nélkül (űrrepülés, ágyhoz kötöttség) havonta 1–2% ásványi anyagot is veszíthet, rendszeres terhelésre viszont erősödik (Wolff-törvény).',
        related: ['kotoszovet', 'izulet', 'homeosztazis'] },
      { id: 'izulet', term: 'Ízület', en: 'joint (synovial joint)', latin: 'articulatio (articulatio synovialis)', topic: 'mozgas',
        short: 'Csontok közötti mozgékony összeköttetés; a valódi (szinoviális) ízületben porccal borított ízfelszínek, ízületi tok, ízületi rés és ízületi folyadék található.',
        prereq: ['anatomia/csont', 'mechanika/nyomatek'],
        text: 'A csontok összeköttetése lehet **folytonos** (kötőszövetes varrat, porcos symphysis, csontos) vagy **ízületi** (diarthrosis). A valódi ízület részei:\n\n- **ízfelszínek** üvegporccal borítva (súrlódási együttható kb. 0,001–0,01 – jobb, mint bármely műszaki csapágy);\n- **ízületi tok**: külső rostos réteg és belső **szinoviális hártya**, amely az **ízületi folyadékot** (kenés, porctáplálás) termeli;\n- erősítő **szalagok**, egyes ízületekben **porckorong** (meniszkusz) és ízületi ajak.\n\nAlak és szabadságfok szerint: **gömbízület** (váll, csípő: 3 tengely), **tojásdad** és **nyeregízület** (csukló, hüvelykujj tőízülete: 2 tengely), **csuklóízület** (könyök humeroulnaris része, ujjpercek: 1 tengely), **forgóízület** (proximális radioulnaris, atlas–axis), **síkízület**.',
        example: 'Lépcsőzéskor a térdre a testsúly kb. 3–4-szerese hat: 70 kg-os embernél `70 · 9,81 · 3,5 ≈ 2400 N`. A porc ezt azért viseli el, mert a terhelés–tehermentesítés ciklusa szivattyúként „pumpálja” bele a tápanyagot az ízületi folyadékból.',
        pitfall: 'A porcnak nincs ere és idege: kopása sokáig fájdalmatlan, és nem regenerálódik. A fájdalmat az artrózisban a csonthártya, a tok és a csont alatti réteg okozza.',
        related: ['csont', 'kotoszovet', 'izomosszehuzodas'] },
      { id: 'szarkomer', term: 'Szarkomer és a csúszófilamentum-elmélet', en: 'sarcomere, sliding filament theory', topic: 'mozgas',
        short: 'A harántcsíkolt izom legkisebb összehúzódó egysége két Z-lemez között; összehúzódáskor az aktin- és miozinfonalak egymás mellett elcsúsznak, a hosszuk nem változik.',
        prereq: ['anatomia/izomszovet', 'lecke:biologia/sejt'],
        visual: sarcSvg, caption: 'Összehúzódáskor a Z-lemezek közelednek: az I-sáv és a H-zóna rövidül, az A-sáv (a miozinfonal hossza) változatlan.',
        text: 'Az izomrostban (izomsejt) hosszanti **miofibrillumok** futnak, ezek sorba kapcsolt szarkomerekből állnak. Egy szarkomer:\n\n- **Z-lemez**: ide rögzülnek a vékony **aktin**fonalak (troponinnal és tropomiozinnal);\n- **A-sáv** (anizotróp, sötét): a vastag **miozin**fonalak teljes hossza, kb. 1,6 µm;\n- **I-sáv** (izotróp, világos): csak aktin; a Z-lemez két oldalán;\n- **H-zóna**: az A-sáv közepe, ahol csak miozin van; közepén az **M-vonal**.\n\nA **csúszófilamentum-elmélet** (Huxley és Huxley, 1954) szerint a miozinfejek kereszthidakat képeznek az aktinnal, és evezőcsapásszerűen a szarkomer közepe felé húzzák. Az I-sáv és a H-zóna rövidül, az A-sáv nem.\n\nA kifejthető erő a szarkomerhossztól függ (**hossz–feszülés görbe**): optimum kb. 2,0–2,2 µm, ahol a legtöbb kereszthíd tud kapcsolódni.',
        example: 'Egy 10 cm-es izomrostban 2,5 µm-es szarkomerhossznál `0,1 / 2,5·10⁻⁶ = 40 000` szarkomer van sorba kötve. Ha mindegyik 2,0 µm-re rövidül, a rost 8 cm lesz: 0,5 µm-es egyedi elmozdulásokból 2 cm-es (20%-os) rövidülés.',
        pitfall: 'Az izom összehúzódáskor nem a fonalak rövidülnek, hanem az átfedésük nő. Túlnyújtott izomban (kevés átfedés) és túlzottan rövid izomban (a fonalak ütköznek) egyaránt kisebb az erő.',
        related: ['izomosszehuzodas', 'izomszovet', 'izulet'] },
      { id: 'izomosszehuzodas', term: 'Az izomösszehúzódás mechanizmusa (aktin–miozin, ATP)', en: 'excitation–contraction coupling, cross-bridge cycle', topic: 'mozgas',
        short: 'Az ingerülettől az erőkifejtésig vezető folyamat: az akciós potenciál Ca²⁺-felszabadulást okoz, a Ca²⁺ szabaddá teszi az aktint, a miozinfejek pedig ATP-t bontva ciklikusan húzzák.',
        prereq: ['anatomia/szarkomer', 'anatomia/akcios-potencial', 'kemia-bsc/gibbs'],
        text: '**Elektromechanikai kapcsolás**:\n\n1. A motoros véglemezen felszabaduló acetilkolin akciós potenciált indít az izomrost membránján.\n2. Az AP a **T-tubulusokon** a rost belsejébe terjed; a feszültségérzékelő (DHP-) receptor mechanikusan megnyitja a **szarkoplazmatikus retikulum** (SR) Ca²⁺-csatornáit (rianodin-receptor).\n3. A Ca²⁺ a **troponin C**-hez kötődik; a **tropomiozin** elmozdul, és szabaddá válnak a miozinkötő helyek az aktinon.\n\n**Kereszthíd-ciklus**:\n\n1. A „felhúzott” (ADP + Pᵢ kötött) miozinfej az aktinhoz kötődik.\n2. **Erőkifejtő csapás**: a Pᵢ leválik, a fej elfordul és kb. 10 nm-rel húzza az aktint; az ADP leválik.\n3. **Új ATP kötődése** leválasztja a fejet az aktinról.\n4. Az ATP hidrolízise újra „felhúzza” a fejet.\n\nElernyedéskor a **SERCA-pumpa** ATP-t használva visszapumpálja a Ca²⁺-ot az SR-be. Az ATP tehát kétszer is kell: a leváláshoz és a Ca²⁺ visszapumpálásához.',
        example: 'Az izom ATP-készlete maximális erőkifejtésnél csak 2–3 s-ra elég, a kreatin-foszfát további kb. 8–10 s-ra pótolja. Ezután az anaerob glikolízis, majd az aerob lebontás termeli az ATP-t – ezért nem lehet 400 m-t 100 m-es sebességgel futni.',
        pitfall: 'Halál után az ATP elfogy, a miozinfejek nem tudnak leválni az aktinról: ez a **hullamerevség** (rigor mortis). Vagyis az ATP nem az összehúzódás, hanem az **elernyedés** feltétele is.',
        related: ['szarkomer', 'izomszovet', 'akcios-potencial', 'szinapszis', 'izulet'] },

      /* ----- Keringés és légzés ----- */
      { id: 'sziv-ciklus', term: 'Szívciklus', en: 'cardiac cycle', topic: 'keringes',
        short: 'Egy szívverés eseménysora: a kamrák összehúzódása és kilökése (szisztolé), majd elernyedése és telődése (diasztolé), a billentyűk nyomáskülönbség vezérelte nyitásával és zárásával.',
        prereq: ['modell:sziv', 'lecke:biologia/keringes-legzes'],
        visual: wigSvg, caption: 'A bal szívfél nyomásai egy szívciklus alatt (Wiggers-diagram, 75/perc). A billentyűk mindig a nyomáskülönbség irányában nyílnak és zárnak.',
        text: 'A szívciklus fázisai (bal szívfél):\n\n1. **Izovolumetriás kontrakció**: a kamra húzódik össze, a mitrális billentyű már zárt (első szívhang), az aortabillentyű még zárt – a nyomás meredeken nő, a térfogat nem változik.\n2. **Ejekció**: amikor a kamranyomás meghaladja az aortanyomást (~80 mmHg), az aortabillentyű kinyílik; a verőtérfogat kilökődik.\n3. **Izovolumetriás relaxáció**: a kamra elernyed, az aortabillentyű zár (második szívhang, az aortagörbén **incisura**), mindkét billentyű zárt.\n4. **Telődés**: a kamranyomás a pitvari alá esik, a mitrális billentyű kinyílik; először gyors passzív telődés, végül a **pitvari összehúzódás** még kb. 20%-ot hozzáad.\n\nA jobb szívfél ciklusa ugyanilyen, csak kb. ötödakkora nyomásokkal (tüdőartéria: kb. 25/10 mmHg).',
        example: '75/perc pulzusnál egy ciklus `60/75 = 0,8 s`: kb. 0,3 s szisztolé és 0,5 s diasztolé. 150/percnél a ciklus 0,4 s, de a szisztolé alig rövidül (kb. 0,25 s), a diasztolé viszont 0,15 s-ra zsugorodik. Mivel a koszorúerek főleg diasztoléban telnek, nagyon magas pulzus rontja a szívizom vérellátását és a kamratelődést.',
        pitfall: 'A billentyűk nem izommal mozognak: passzívan, a két oldaluk közti nyomáskülönbség nyitja és zárja őket. A papilláris izmok csak a visszacsapódásukat akadályozzák meg.',
        related: ['percterfogat', 'vernyomas', 'ekg', 'izomszovet'],
        models: ['sziv'] },
      { id: 'percterfogat', term: 'Perctérfogat és verőtérfogat', en: 'cardiac output, stroke volume', topic: 'keringes',
        short: 'A perctérfogat a szív által percenként kilökött vér mennyisége (nyugalomban kb. 5 L/perc), a pulzusszám és a verőtérfogat szorzata.',
        prereq: ['anatomia/sziv-ciklus'],
        text: 'A **verőtérfogatot** (SV) három tényező határozza meg:\n\n- **előterhelés** (preload): a kamra végdiasztolés feszülése, lényegében a vénás visszaáramlás. A **Frank–Starling-mechanizmus** szerint a jobban telődő kamra (a szarkomerek optimálisabb hossza miatt) erősebben húzódik össze: a szív automatikusan kilöki, ami beérkezik;\n- **utóterhelés** (afterload): a nyomás, amellyel szemben ki kell löknie (aortanyomás);\n- **kontraktilitás**: a szívizom erőkifejtő képessége (szimpatikus hatás, adrenalin növeli).\n\nA **pulzusszámot** a szinuszcsomó spontán ritmusa (kb. 100/perc) és a vegetatív beidegzés szabja meg: nyugalomban a vagus (paraszimpatikus) lassítja 60–80/percre.\n\nA perctérfogat terheléskor 4–7-szeresére nőhet; ez az **állóképesség** egyik fő korlátja.',
        formulas: ['percterfogat', 'ejekcios-frakcio', 'fick'],
        example: 'Edzetlen ember maximális perctérfogata 200/perc × 100 mL = 20 L/perc. Állóképességi sportolónál a nagyobb szív miatt a nyugalmi pulzus 45/perc is lehet: ugyanaz az 5 L/perc `5000/45 ≈ 111 mL`-es verőtérfogattal jön ki.',
        pitfall: 'A pulzusszám korlátlan emelése nem növeli korlátlanul a perctérfogatot: kb. 180–200/perc felett a diasztolé annyira megrövidül, hogy a kamra nem tud eléggé telődni, és a verőtérfogat csökken.',
        related: ['sziv-ciklus', 'vernyomas', 'gazcsere', 'homeosztazis'],
        models: ['sziv'] },
      { id: 'vernyomas', term: 'Vérnyomás', en: 'blood pressure', topic: 'keringes',
        short: 'A vér által az érfalra kifejtett nyomás; az artériás vérnyomás szisztolés és diasztolés értékét (pl. 120/80 mmHg) mérjük, szabályozott változója az artériás középnyomás.',
        prereq: ['anatomia/percterfogat', 'villamosmernoki/ohm-torveny', 'lecke:biologia/keringes-legzes'],
        text: '- **Szisztolés nyomás**: a kilökéskor kialakuló csúcsnyomás (kb. 120 mmHg);\n- **diasztolés nyomás**: a legalacsonyabb érték a következő kilökés előtt (kb. 80 mmHg); az aorta rugalmas fala (**szélkazán-funkció**) tartja fenn;\n- **pulzusnyomás**: a kettő különbsége; idős korban, merevebb aortánál nő.\n\nA középnyomás a perctérfogat és a teljes perifériás ellenállás szorzata. **Rövid távú** szabályozás: a **baroreceptor-reflex** (aortaív, carotis sinus) másodperceken belül változtat a pulzuson, a kontraktilitáson és az érátmérőn. **Hosszú távú** szabályozás: a vese a só- és vízürítéssel (renin–angiotenzin–aldoszteron rendszer, ADH).\n\nA nyomás az érrendszerben a legnagyobb ellenállású szakaszon, az **arteriolákban** esik a legjobban: a kapillárisokban már csak kb. 35→15 mmHg.\n\nKategóriák (felnőtt, rendelői mérés): optimális < 120/80, **hipertónia** ≥ 140/90 mmHg.',
        formulas: ['kozepnyomas', 'keringesi-ellenallas'],
        example: '140/95 mmHg esetén `MAP ≈ 95 + 45/3 = 110 mmHg`. Ha a perctérfogat 5 L/perc, a perifériás ellenállás `110/5 = 22 mmHg·perc/L` – kb. 18%-kal több a 120/80-as normálisnál (≈ 18,7).',
        pitfall: 'A „mmHg” nyomás a légköri nyomáshoz képest értendő (túlnyomás). A vérnyomásmérés eredménye függ a mandzsetta méretétől és a kar magasságától: a szív szintje alatt tartott karon a hidrosztatikai nyomás miatt magasabb értéket mérünk (kb. 0,77 mmHg/cm).',
        related: ['percterfogat', 'sziv-ciklus', 'homeosztazis', 'nefron', 'kozponti-kornyeki'] },
      { id: 'ekg', term: 'EKG (elektrokardiogram)', en: 'electrocardiogram (ECG)', topic: 'keringes',
        short: 'A szív elektromos aktivitásának a testfelszínről elvezetett, idő szerinti görbéje; hullámai (P, QRS, T) a pitvari és kamrai depolarizációt és repolarizációt tükrözik.',
        prereq: ['anatomia/sziv-ciklus', 'anatomia/akcios-potencial', 'fizika-bsc/potencial'],
        visual: ekgSvg, caption: 'Normál EKG két szívciklusa szabványos papírsebességgel (25 mm/s) a jellemző szakaszokkal.',
        text: 'Az ingerület a **szinuszcsomóban** keletkezik, a pitvarokon át az **AV-csomóba** jut (ahol kb. 0,1 s-ot késik, hogy a kamrák telődni tudjanak), majd a **His-köteg**, a Tawara-szárak és a **Purkinje-rostok** gyorsan szétviszik a kamrákban.\n\n- **P-hullám**: pitvari depolarizáció;\n- **PQ-szakasz** (0,12–0,20 s): átvezetés az AV-csomón;\n- **QRS-komplexus** (< 0,12 s): kamrai depolarizáció (a pitvari repolarizáció ebbe olvad);\n- **ST-szakasz**: a kamrák teljes depolarizáltsága (plató); eltérése szívizom-ischaemia jele;\n- **T-hullám**: kamrai repolarizáció.\n\nA standard 12 elvezetés: 3 végtag- (Einthoven), 3 kiegészített végtag- (Goldberger) és 6 mellkasi (Wilson) elvezetés; mindegyik más szögből „nézi” a szív elektromos tengelyét.',
        example: 'Szabványos papíron (25 mm/s) két R-csúcs távolsága 20 mm, azaz `20 · 0,04 = 0,8 s` → `60/0,8 = 75/perc`. Gyors szabály: pulzus = 1500 / RR (mm-ben) = 1500/20 = 75.',
        pitfall: 'Az EKG elektromos, nem mechanikai jel: normál EKG mellett is lehet a szív pumpafunkciója rossz (pl. elektromechanikai disszociáció), és a QRS nem azonos a kamrai összehúzódással – az csak utána kezdődik.',
        related: ['sziv-ciklus', 'akcios-potencial', 'percterfogat'],
        models: ['sziv'] },
      { id: 'gazcsere', term: 'Gázcsere a tüdőben', en: 'pulmonary gas exchange', topic: 'keringes',
        short: 'Az O₂ és a CO₂ passzív diffúziója az alveolusok légtere és a tüdőkapillárisok vére között, a parciális nyomások különbsége szerint.',
        prereq: ['lecke:biologia/keringes-legzes', 'fizika-bsc/idealis-gaz', 'anatomia/hamszovet'],
        text: 'A gázok mindig a **nagyobb parciális nyomás** felől a kisebb felé diffundálnak. Tipikus parciális nyomások (mmHg):\n\n- alveolus: P_O₂ = 100, P_CO₂ = 40;\n- artériás vér: P_O₂ = 95–100, P_CO₂ = 40;\n- kevert vénás vér: P_O₂ = 40, P_CO₂ = 46.\n\nA diffúziót a **Fick-féle diffúziós törvény** írja le: a gázáram arányos a felülettel (kb. 70 m²), a parciálisnyomás-különbséggel és a gáz oldékonyságával, fordítottan a membrán vastagságával (kb. 0,5 µm). A CO₂ kisebb nyomáskülönbség mellett is könnyen átjut, mert kb. 20-szor jobban oldódik.\n\nA vér kb. 0,75 s-ig tartózkodik a kapillárisban, de az egyensúly már kb. 0,25 s alatt beáll: ez a tartalék teszi lehetővé a gázcserét terheléskor is. A hatékonyság feltétele a **ventiláció és a perfúzió illeszkedése** (V/Q ≈ 0,8–1).',
        example: 'Belégzett, párával telített levegő: `P_IO₂ = 0,21 · (760 − 47) ≈ 150 mmHg`. Az alveoláris gázegyenlettel (RQ = 0,8): `P_AO₂ ≈ 150 − 40/0,8 = 100 mmHg`.',
        pitfall: 'A légzést nyugalomban a CO₂ (illetve a vér pH-ja) vezérli, nem az O₂-hiány. Ezért hiperventiláció után a víz alatti lélegzetvisszatartás veszélyes: a CO₂ lecsökken, és az ájulás előbb jön el, mint a légszomj.',
        related: ['oxigen-disszociacio', 'percterfogat', 'hamszovet', 'homeosztazis'] },
      { id: 'oxigen-disszociacio', term: 'Oxigén-disszociációs görbe', en: 'oxygen–haemoglobin dissociation curve', topic: 'keringes',
        short: 'A hemoglobin oxigénszaturációja az oxigén parciális nyomásának függvényében; a kooperatív kötés miatt szigmoid alakú.',
        prereq: ['anatomia/gazcsere', 'kemia-bsc/le-chatelier', 'kemia-bsc/ph'],
        visual: o2Svg, caption: 'A hemoglobin oxigénkötési görbéje (folytonos) és jobbra tolódása (szaggatott). A felső lapos szakasz a tüdőben, a meredek szakasz a szövetekben működik.',
        text: 'A hemoglobin négy alegységből áll, mindegyik egy O₂-t köt. A kötés **kooperatív**: egy O₂ megkötése növeli a többi kötőhely affinitását. Ezért a görbe **szigmoid**:\n\n- a **felső, lapos** szakaszon (60–100 mmHg) a szaturáció alig változik: a tüdőben a P_O₂ kisebb csökkenése (magaslat, enyhe tüdőbetegség) is még szinte teljes telítést enged;\n- a **meredek** szakaszon (10–40 mmHg) kis P_O₂-csökkenés sok oxigént szabadít fel: ez a szövetek oxigénellátása.\n\nA **P50** az a parciális nyomás, ahol a szaturáció 50% (felnőttben kb. 27 mmHg). **Jobbra tolódás** (kisebb affinitás, könnyebb leadás): nagyobb CO₂, kisebb pH (**Bohr-effektus**), magasabb hőmérséklet, több 2,3-BPG – mind a dolgozó izomra jellemző. **Balra tolódás**: magzati hemoglobin, szén-monoxid.',
        formulas: ['oxigentartalom', 'fick'],
        example: 'A Hill-egyenlettel (P50 = 26,8 mmHg, n = 2,7): 100 mmHg-nél `S ≈ 97%`, 40 mmHg-nél `S ≈ 75%` – nyugalomban az oxigénnek csak kb. negyedét adja le a vér. Dolgozó izomban (20 mmHg) `S ≈ 31%`: kétharmadot.',
        pitfall: 'A pulzoximéter a szaturációt méri, nem a vér oxigéntartalmát. Szén-monoxid-mérgezésben (a COHb-t is oxihemoglobinnak méri) vagy vérszegénységben normális érték mellett is súlyos lehet az oxigénhiány.',
        related: ['gazcsere', 'percterfogat', 'homeosztazis'] },

      /* ----- Idegrendszer és érzékszervek ----- */
      { id: 'neuron', term: 'Neuron (idegsejt)', en: 'neuron, nerve cell', latin: 'neuron', topic: 'ideg',
        short: 'Az idegrendszer alapegysége: dendritjein és sejttestén információt fogad, axonján akciós potenciál formájában továbbítja, szinapszisain átadja.',
        prereq: ['anatomia/idegszovet', 'modell:sejt'],
        visual: neuSvg, caption: 'Egy motoros neuron vázlata. A bejövő jeleket a dendritek és a sejttest gyűjtik, az akciós potenciál az axondombon indul.',
        text: 'Részei:\n\n- **dendritek**: elágazó nyúlványok, a bejövő szinapszisok nagy részét fogadják;\n- **sejttest** (szóma, perikarion): sejtmag és fehérjeszintézis (Nissl-rögök = durva felszínű ER);\n- **axondomb** és kezdeti szegmens: itt a legnagyobb a feszültségfüggő Na⁺-csatornák sűrűsége, itt **összegződnek** a bemenetek és indul az AP;\n- **axon**: egyetlen, akár 1 m hosszú nyúlvány, gyakran **mielinhüvellyel** és **Ranvier-befűződésekkel**;\n- **axonvégződések** (terminális boutonok): szinapszisok.\n\nA fehérjéket a sejttest szintetizálja, ezért az **axonális transzport** (kinezin előre, dinein visszafelé, mikrotubulusok mentén) szállítja őket a végződésekig.\n\nTípusai funkció szerint: **érző** (afferens), **mozgató** (efferens) és **interneuron** (a neuronok túlnyomó többsége); alak szerint multipoláris, bipoláris, pszeudounipoláris.',
        example: 'A gyors axonális transzport kb. 200–400 mm/nap. Egy 1 m-es axon végére a sejttestben készült fehérje 400 mm/nappal is `1000/400 = 2,5` nap alatt ér el – ezért ilyen lassú a hosszú idegek regenerációja (kb. 1 mm/nap).',
        pitfall: 'Nem minden neuron ad akciós potenciált: például a retina fotoreceptorai és bipoláris sejtjei fokozatos (graduális) potenciálváltozásokkal dolgoznak.',
        related: ['idegszovet', 'akcios-potencial', 'szinapszis', 'reflexiv', 'membranpotencial'] },
      { id: 'szinapszis', term: 'Szinapszis', en: 'synapse', latin: 'synapsis', topic: 'ideg',
        short: 'Két idegsejt (vagy ideg- és izomsejt) közötti kapcsolat, ahol az ingerület kémiai ingerületátvivő anyag (neurotranszmitter) vagy közvetlen elektromos kapcsolat révén adódik át.',
        prereq: ['anatomia/neuron', 'anatomia/akcios-potencial'],
        text: '**Kémiai szinapszis** lépései:\n\n1. Az AP eléri a preszinaptikus végződést, feszültségfüggő **Ca²⁺-csatornák** nyílnak.\n2. A Ca²⁺ hatására a neurotranszmittert tartalmazó **vezikulák** a membránnal összeolvadnak (exocitózis).\n3. A transzmitter átdiffundál a kb. 20 nm-es **szinaptikus résen**, és a posztszinaptikus **receptorokhoz** kötődik.\n4. **Ionotróp** receptor: azonnal ioncsatornát nyit; **metabotróp**: G-fehérjén keresztül, lassabban hat.\n5. A transzmitter hatását lebontás (pl. **acetilkolin-észteráz**) vagy visszavétel (reuptake) szünteti meg.\n\nA posztszinaptikus sejtben **serkentő** (EPSP, pl. glutamát) vagy **gátló** (IPSP, pl. GABA, glicin) potenciál jön létre. Egy neuron ezernyi szinapszis bemenetét **térben és időben összegzi**.\n\nAz **elektromos szinapszis** (réskapcsolat) gyorsabb és kétirányú, de nem módosítható úgy, mint a kémiai.',
        example: 'A szinaptikus késés kb. 0,5 ms. Egy öt szinapszisból álló láncban ez kb. 2,5 ms-ot ad a vezetési időhöz. A szerves foszfátészterek (rovarirtók, harci gázok) gátolják az acetilkolin-észterázt: az ACh felhalmozódik, izomrángás, majd bénulás jön létre.',
        pitfall: 'A neurotranszmitter hatását a **receptor** határozza meg, nem maga az anyag: az acetilkolin a vázizmon serkent (nikotinos receptor), a szíven lassít (muszkarinos M2 receptor).',
        related: ['neuron', 'akcios-potencial', 'reflexiv', 'izomosszehuzodas', 'kozponti-kornyeki'] },
      { id: 'reflexiv', term: 'Reflexív', en: 'reflex arc', latin: 'arcus reflexus', topic: 'ideg',
        short: 'Egy reflex anatómiai útja: receptor → érző (afferens) neuron → központ → mozgató (efferens) neuron → végrehajtó szerv (effektor).',
        prereq: ['anatomia/szinapszis', 'anatomia/neuron'],
        visual: refSvg, caption: 'Monoszinaptikus nyújtási reflex (pl. térdreflex): az izomorsó érző rostja közvetlenül a gerincvelő mellső szarvának motoneuronján végződik.',
        text: 'A **reflex** ingerre adott, akaratunktól független, sztereotip válasz. Öt eleme a **receptor**, az **afferens** pálya, a **reflexközpont** (gerincvelő vagy agytörzs), az **efferens** pálya és az **effektor** (izom vagy mirigy).\n\n- **Monoszinaptikus** reflex: egyetlen szinapszis, például a **térdreflex** (patellareflex): a térdkalács alatti ín megütése megnyújtja a combfeszítő izom izomorsóit, és az izom reflexesen összehúzódik. Közben interneuronon át a hajlító izom gátlódik (**reciprok beidegzés**).\n- **Poliszinaptikus** reflex: interneuronokon át, például a **védekező (flexor) reflex**: forró tárgyról a kéz visszarántása, a másik oldali láb **keresztezett** feszítésével.\n\nA reflexek vizsgálata a neurológiai diagnosztika alapja: kiesésük vagy fokozódásuk megmutatja a sérülés helyét.',
        example: 'Térdreflex: kb. 0,5 m afferens és 0,5 m efferens út 60 m/s-mal `1/60 ≈ 16,7 ms`, ehhez jön kb. 1 ms szinaptikus késés és az izom aktiválódása – a mért reflexidő kb. 20 ms. Akaratlagos reakció (látott jelre gombnyomás) 150–250 ms.',
        pitfall: 'Attól, hogy egy reflex gerincvelői szinten zárul, az agy tud róla: a jel felfelé is továbbmegy (ezért érezzük a fájdalmat), és a magasabb központok a reflexeket gátolhatják vagy fokozhatják.',
        related: ['szinapszis', 'neuron', 'kozponti-kornyeki', 'homeosztazis'] },
      { id: 'kozponti-kornyeki', term: 'Központi és környéki idegrendszer', en: 'central and peripheral nervous system', latin: 'systema nervosum centrale et periphericum', topic: 'ideg',
        short: 'A központi idegrendszer (KIR) az agyvelő és a gerincvelő; a környéki (perifériás) idegrendszer az ezeket a testtel összekötő agyi és gerincvelői idegek és dúcok összessége.',
        prereq: ['lecke:biologia/ideg-hormon-emesztes', 'anatomia/idegszovet'],
        text: '**Központi idegrendszer**: **nagyagy** (kéreg: érzékelés, mozgatás, gondolkodás), **köztiagy** (talamusz: érzőátkapcsolás; hipotalamusz: hőszabályozás, éhség, hormonok), **kisagy** (mozgáskoordináció), **agytörzs** (légzés- és keringésszabályozó központok), **gerincvelő**. Csontos tok, agyhártyák és agy-gerincvelői folyadék védi; a **vér–agy gát** szelektíven szűri a bejutó anyagokat.\n\n**Környéki idegrendszer**: 12 pár agyideg és 31 pár gerincvelői ideg, valamint a dúcok. Funkció szerint:\n\n- **szomatikus**: vázizmok, bőr, tudatos érzékelés;\n- **vegetatív (autonóm)**: belső szervek, akarattól független; két fő ága az ellentétesen ható **szimpatikus** („üss vagy fuss”: pulzus ↑, hörgőtágulat, pupillatágulat, bélműködés ↓) és **paraszimpatikus** („pihenj és eméssz”: vagus) rendszer, valamint a **bélidegrendszer**.\n\nA vegetatív efferens pálya **két neuronból** áll, köztük dúcbeli átkapcsolással.',
        example: 'A 31 pár gerincvelői ideg: 8 nyaki, 12 háti, 5 ágyéki, 5 keresztcsonti és 1 farokcsonti (`8 + 12 + 5 + 5 + 1 = 31`). Gerincvelő-sérüléskor a sérülés szintje alatti szelvények érző- és mozgatóműködése esik ki: a C4 feletti sérülés a rekeszizmot beidegző n. phrenicust is érinti, ezért lélegeztetést igényelhet.',
        pitfall: 'A „vegetatív” nem azt jelenti, hogy „alvó” vagy „egyszerű”: folyamatosan, finoman szabályoz. A szimpatikus és paraszimpatikus rendszer sem mindig ellentétes – a nyálelválasztást például mindkettő fokozza.',
        related: ['reflexiv', 'neuron', 'idegszovet', 'latas', 'homeosztazis', 'vernyomas', 'szinapszis'] },
      { id: 'latas', term: 'Látás', en: 'vision (visual system)', latin: 'organum visus', topic: 'ideg',
        short: 'A szem optikai rendszere éles képet vetít a retinára, ahol a fotoreceptorok (pálcikák, csapok) a fényt idegi jellé alakítják; a jel a látópályán a nyakszirti lebeny látókérgébe jut.',
        prereq: ['lecke:fizika/hullamok-feny', 'anatomia/neuron'],
        text: '**Optika**: a szem fénytörő ereje kb. 60 dioptria; ennek kb. kétharmadát a **szaruhártya** adja (~43 D), a **szemlencse** kb. 20 D-t, ami **alkalmazkodással** (akkomodáció: a sugárizom összehúzódik, a lencse domborodik) növelhető. A **pupilla** blendeként szabályozza a beeső fényt.\n\n**Retina**: kb. 120 millió **pálcika** (érzékeny, szürkületi, fekete-fehér látás) és 6 millió **csap** (színlátás három típussal: S, M, L; éleslátás). A **sárgafolt** közepén (fovea) csak csapok vannak – itt a legélesebb a látás. A **vakfoltban** (látóidegfő) nincs receptor.\n\n**Fototranszdukció**: a fény a rodopszin retinál részét átalakítja (11-cisz → transz), G-fehérje-kaszkád csökkenti a cGMP-t, a Na⁺-csatornák zárnak: a receptor fény hatására **hiperpolarizálódik**.\n\nA látópályán a két szem orrfelőli (nazális) rostjai a **látóideg-kereszteződésben** átkereszteződnek, így a jobb látótér a bal agyféltekébe jut.',
        example: 'A közelpont 25 cm-re hozásához `1/0,25 = 4 D` alkalmazkodás kell. 60 éves korban a lencse már csak kb. 1 D-t alkalmazkodik (közelpont 1 m – időskori távollátás), ezért olvasáshoz kb. `4 − 1 = +3 D`-s szemüveg szükséges.',
        pitfall: 'Az időskori távollátás (presbyopia) nem azonos a fénytörési hibából eredő távollátással (hypermetropia): az előbbi a lencse rugalmasságának elvesztése, és ép szemű embert is érint.',
        related: ['neuron', 'kozponti-kornyeki', 'szinapszis'] },

      /* ----- Anyagcsere, hormonok és kiválasztás ----- */
      { id: 'emesztes', term: 'Emésztés és felszívódás', en: 'digestion and absorption', topic: 'anyagcsere',
        short: 'A táplálék makromolekuláinak enzimatikus lebontása felszívódni képes kis molekulákra (monoszacharid, aminosav, zsírsav), majd ezek felvétele a bélhámon át a vérbe vagy nyirokba.',
        prereq: ['lecke:biologia/ideg-hormon-emesztes', 'kemia-bsc/aktivalasi-energia', 'anatomia/hamszovet'],
        text: 'Szakaszai:\n\n- **szájüreg**: aprítás, nyál-amiláz (keményítő), nyálka;\n- **gyomor**: sósav (pH 1,5–3,5; fertőtlenít, denaturál), **pepszin** (fehérjebontás), keverés; a gyomor ürülését hormonok és idegi reflexek szabályozzák;\n- **patkóbél**: a **hasnyálmirigy** lúgos (HCO₃⁻) nedve semlegesít, és szállítja a fő enzimeket: amiláz, tripszin, kimotripszin, **lipáz**; az **epe** epesói a zsírokat **emulgeálják** (micellák);\n- **vékonybél**: a kefeszegély enzimjei befejezik a bontást; itt történik a **felszívódás** nagy része (redők, bolyhok, mikrobolyhok miatt kb. 30 m² felszínen);\n- **vastagbél**: víz és elektrolitok visszaszívása, bélflóra (K-vitamin, rövid szénláncú zsírsavak).\n\nA felszívódott monoszacharidok és aminosavak a **vena portae**-n át a **májba** jutnak; a zsírok kilomikronként a **nyirokba**.\n\nSzabályozás: **gasztrin** (gyomorsav ↑), **szekretin** (HCO₃⁻ ↑), **kolecisztokinin** (epehólyag-ürülés, enzimek ↑).',
        example: 'Egy étkezés 60 g szénhidrátot, 25 g fehérjét és 20 g zsírt tartalmaz. Energiatartalma `60 · 17 + 25 · 17 + 20 · 38 = 2205 kJ` (kb. 527 kcal) – a zsír a tömegének csak ötöde, de az energia egyharmadát adja.',
        pitfall: 'Az emésztés kémiailag **hidrolízis**: az enzimek vízmolekula beépítésével bontják a kötéseket. A „zsíremésztés” első lépése, az epés emulgeálás viszont fizikai folyamat – az epe nem tartalmaz emésztőenzimet.',
        related: ['inzulin-glukagon', 'hamszovet', 'homeosztazis'] },
      { id: 'inzulin-glukagon', term: 'Inzulin és glukagon (vércukorszabályozás)', en: 'insulin and glucagon, blood glucose regulation', topic: 'anyagcsere',
        short: 'A hasnyálmirigy Langerhans-szigeteinek két ellentétes hatású hormonja: az inzulin csökkenti, a glukagon növeli a vércukorszintet.',
        prereq: ['lecke:biologia/ideg-hormon-emesztes', 'anatomia/emesztes', 'lecke:kemia/anyagmennyiseg'],
        visual: gluSvg, caption: 'A vércukorszint kettős, negatív visszacsatolású hormonális szabályozása.',
        text: '**Inzulin** (β-sejtek): étkezés után, emelkedő glükózszintre szabadul fel. A szervezet egyetlen vércukorcsökkentő hormonja:\n\n- izom- és zsírsejtekben a **GLUT4** transzportereket a membránba juttatja (glükózfelvétel ↑);\n- májban és izomban **glikogénszintézist**, zsírszövetben zsírraktározást és fehérjeszintézist serkent – „raktározó” hormon.\n\n**Glukagon** (α-sejtek): éhezéskor, alacsony glükózszintnél. Főként a **májra** hat: **glikogenolízis** (glikogénbontás) és **glükoneogenezis** (új glükóz aminosavakból, laktátból, glicerinből). Az adrenalin, a kortizol és a növekedési hormon is emeli a vércukrot.\n\n**Diabetes mellitus**: 1-es típus – az autoimmun folyamat elpusztítja a β-sejteket, abszolút inzulinhiány; 2-es típus – **inzulinrezisztencia** és relatív elégtelen inzulintermelés. Diagnosztikus határ: éhomi vércukor ≥ 7,0 mmol/L vagy HbA1c ≥ 6,5%.',
        example: 'Az 5,5 mmol/L-es vércukor `5,5 · 180 g/mol = 990 mg/L ≈ 99 mg/dL`. A kb. 5 L vérben ez összesen csak `5 · 5 · 0,18 ≈ 4,5 g` glükóz – kb. egy teáskanálnyi, ezért kell a szabályozásnak percről percre működnie.',
        pitfall: 'Az agy glükózfelvétele **nem** inzulinfüggő (GLUT1/GLUT3). Ezért veszélyes az inzulin-túladagolás: a vércukor esése elsőként az agyműködést zavarja (hipoglikémiás kóma).',
        related: ['homeosztazis', 'emesztes', 'vizeletkepzes'] },
      { id: 'homeosztazis', term: 'Homeosztázis', en: 'homeostasis', topic: 'anyagcsere',
        short: 'A belső környezet (hőmérséklet, pH, ionösszetétel, vércukor, vérnyomás stb.) viszonylagos állandóságának fenntartása, főként negatív visszacsatolású szabályozókörökkel.',
        prereq: ['lecke:biologia/ideg-hormon-emesztes', 'kemia-bsc/puffer', 'elektronika/negativ-visszacsatolas'],
        text: 'Claude Bernard „belső környezet” (milieu intérieur) fogalmára építve Walter Cannon nevezte el. Egy szabályozókör elemei:\n\n- **érzékelő** (receptor): méri a szabályozott változót;\n- **központ**: összeveti az alapértékkel (set point);\n- **végrehajtó** (effektor): ellentétes irányba módosítja a változót.\n\nEz a **negatív visszacsatolás**: például testhőmérséklet-emelkedésre a hipotalamusz izzadást és bőrér-tágulatot indít. A szabályozás eszközei az **idegrendszer** (gyors) és a **hormonrendszer** (lassabb, tartósabb), amelyeket a hipotalamusz–hipofízis tengely köt össze.\n\nA **pozitív visszacsatolás** ritka, és mindig egy folyamat gyors „lefuttatására” szolgál: szülés (oxitocin), véralvadás, az akciós potenciál Na⁺-beáramlása, ovuláció (LH-csúcs).\n\nNormális értékek (példák): maghőmérséklet 36,5–37,5 °C, artériás pH 7,35–7,45, plazma Na⁺ 135–145 mmol/L, K⁺ 3,5–5,0 mmol/L.',
        example: 'A pH 7,4-nél a H⁺-koncentráció `10^(−7,4) mol/L ≈ 40 nmol/L`. pH 7,0-nál 100 nmol/L: a kis pH-változás a H⁺ `10^0,4 ≈ 2,5`-szeresét jelenti – ezért életveszélyes már 0,4 egységnyi eltérés is.',
        pitfall: 'A homeosztázis nem merev állandóság: az alapérték is változhat (láz, cirkadián ritmus, edzettség). Lázban a „termosztát” feljebb áll, ezért fázunk és didergünk, miközben emelkedik a hőmérsékletünk.',
        related: ['inzulin-glukagon', 'vizeletkepzes', 'vernyomas', 'nefron', 'membranpotencial', 'reflexiv', 'gazcsere'] },
      { id: 'nefron', term: 'Nefron', en: 'nephron', latin: 'nephron', topic: 'anyagcsere',
        short: 'A vese működési egysége (veséként kb. egymillió): a vérplazmát szűrő vesetestecskéből és a szűrletet átalakító csatornarendszerből áll.',
        prereq: ['anatomia/hamszovet', 'anatomia/vernyomas', 'lecke:termeszet/emberi-test'],
        visual: nephSvg, caption: 'A nefron szakaszai és fő feladataik. A Henle-kacs a velőállományba nyúlik le, ahol a koncentrált vizelet kialakul.',
        text: 'Részei a szűrlet útja mentén:\n\n1. **Vesetestecske**: a **glomerulus** (kapillárisgomolyag az afferens és efferens arteriola között) és az azt körülvevő **Bowman-tok**. A szűrőmembrán (fenesztrált endotél, alaphártya, podociták) a fehérjéket és a sejteket visszatartja.\n2. **Proximális kanyarulatos csatorna**: a szűrlet kb. **65%-át** (Na⁺, víz) és gyakorlatilag az összes glükózt és aminosavat visszaszívja; kefeszegélyes köbhám, sok mitokondrium.\n3. **Henle-kacs**: leszálló szára vizet enged át, felszálló szára aktívan sót pumpál ki, de vízzáró – az **ellenáramú sokszorozó** rendszer a velőben magas ozmolaritást hoz létre.\n4. **Disztális kanyarulatos csatorna**: finomhangolás; **aldoszteron** hatására Na⁺-visszaszívás és K⁺-kiválasztás.\n5. **Gyűjtőcsatorna**: **ADH** (antidiuretikus hormon) hatására akvaporinok épülnek be, és víz szívódik vissza a velő koncentrált közegébe.\n\nA **juxtaglomeruláris apparátus** a vérnyomást és a sóterhelést érzékelve **renint** szabadít fel.',
        formulas: ['clearance'],
        example: 'A GFR 125 mL/perc, azaz `125 · 1440 = 180 L` szűrlet naponta, miközben a vizelet csak kb. 1,5 L: a szűrlet `1 − 1,5/180 ≈ 99,2%`-a visszaszívódik. A teljes plazmatérfogat (kb. 3 L) naponta mintegy 60-szor szűrődik át.',
        pitfall: 'A glomerulus nem „szűri ki” a mérgező anyagokat a jó anyagok közül: mindent átenged, ami elég kicsi, és a csatornarendszer szívja vissza, ami kell. Ami nem kell, az egyszerűen nem szívódik vissza, vagy aktívan még szekretálódik is.',
        related: ['vizeletkepzes', 'homeosztazis', 'vernyomas', 'hamszovet'] },
      { id: 'vizeletkepzes', term: 'Vizeletképzés', en: 'urine formation', topic: 'anyagcsere',
        short: 'A vese három alapfolyamata: glomeruláris filtráció, tubuláris visszaszívás (reabszorpció) és tubuláris kiválasztás (szekréció), amelyet a vizelet koncentrálása egészít ki.',
        prereq: ['anatomia/nefron', 'kemia-bsc/oldhatosagi-szorzat'],
        text: '**Kiválasztott mennyiség = filtrált − visszaszívott + szekretált.**\n\n1. **Filtráció**: a glomeruláris kapillárisok magas nyomása (kb. 55 mmHg) hajtja; ellene hat a Bowman-tok nyomása és a plazmafehérjék onkotikus nyomása. Az eredő kb. 10 mmHg. A **GFR**-t a vese saját **autoregulációja** 80–180 mmHg középnyomás között közel állandó szinten tartja.\n2. **Reabszorpció**: aktív (Na⁺/K⁺-ATPáz hajtja) és passzív transzport. Egyes anyagoknak **transzportmaximuma** van: a glükóz kb. 10 mmol/L plazmaszint felett (vesei küszöb) megjelenik a vizeletben.\n3. **Szekréció**: H⁺, K⁺, NH₄⁺, gyógyszerek, PAH aktív kiválasztása – a sav–bázis egyensúly szabályozásának fontos része.\n4. **Koncentrálás**: ADH jelenlétében a vizelet akár 1200 mOsm/L-re (a plazma négyszeresére) koncentrálódhat, hiányában híg (50–100 mOsm/L).\n\nA vese így szabályozza a víz- és sóháztartást, a vérnyomást, a pH-t, kiválasztja a nitrogéntartalmú anyagcseretermékeket (karbamid, kreatinin, húgysav), és hormonokat termel (renin, eritropoetin, aktív D-vitamin).',
        formulas: ['clearance'],
        example: 'Kreatinin-clearance: vizelet-kreatinin 100 mg/dL, plazma-kreatinin 1 mg/dL, vizeletáramlás 1,25 mL/perc → `C = 100 · 1,25 / 1 = 125 mL/perc` – ez közelíti a GFR-t. Ha a plazma-kreatinin 2 mg/dL-re nő (változatlan termelés mellett), a GFR kb. a felére csökkent.',
        pitfall: 'Cukorbetegségben a glükózürítés nem azért indul, mert a vese „rossz”, hanem mert a filtrált glükóz meghaladja a tubulusok transzportkapacitását; a glükóz ozmotikusan vizet visz magával (sok vizelet, szomjúság).',
        related: ['nefron', 'homeosztazis', 'inzulin-glukagon', 'vernyomas'] }
    ]
  });
})();
