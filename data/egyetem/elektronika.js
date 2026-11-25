/* Egyetem: Analóg elektronika (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';
  var FG = 'var(--fg-2)', BG = 'var(--stage)';
  var RED = '#e5484d', BLUE = '#2f7bf6', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6';

  /* ---------- rajzsegédek ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function txt(x, y, s, size, anchor, extra) {
    var cls = extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (extra && extra.indexOf('muted') === 0 ? M : T);
    if (extra && extra.indexOf('muted') === 0) extra = extra.slice(5);
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + cls + (extra ? ' ' + extra : '') + '>' + sub(s) + '</text>';
  }
  // x_1 → alsó index az SVG-szövegben
  function sub(s) { return String(s).replace(/_([A-Za-z0-9áéíóöőúüű]+(?:\([a-z]+\))?)/g, '<tspan baseline-shift="sub" font-size="75%">$1</tspan>'); }
  function head(x, y, ang, col, s) {
    s = s || 8;
    return '<path d="M' + r1(x) + ' ' + r1(y) + ' L' + r1(x - s * Math.cos(ang - 0.4)) + ' ' + r1(y - s * Math.sin(ang - 0.4)) + ' L' + r1(x - s * Math.cos(ang + 0.4)) + ' ' + r1(y - s * Math.sin(ang + 0.4)) + ' z" fill="' + col + '"/>';
  }
  function arrow(x1, y1, x2, y2, col, w) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 1.5) + '"/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  // vezeték: pontok listája [[x,y],...]
  function wire(p, col, w) {
    return '<path d="' + p.map(function (q, i) { return (i ? 'L' : 'M') + q[0] + ' ' + q[1]; }).join(' ') + '" fill="none" stroke="' + (col || FG) + '" stroke-width="' + (w || 2) + '" stroke-linejoin="round"/>';
  }
  function dot(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="3.5" fill="' + FG + '"/>'; }
  function term(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="' + BG + '" stroke="' + FG + '" stroke-width="2"/>'; }
  // IEC ellenállás (téglalap) a vezeték fölé rajzolva
  function res(x, y, vert, col) {
    return vert ? '<rect x="' + (x - 7) + '" y="' + (y - 20) + '" width="14" height="40" fill="' + BG + '" stroke="' + (col || FG) + '" stroke-width="2"/>'
      : '<rect x="' + (x - 20) + '" y="' + (y - 7) + '" width="40" height="14" fill="' + BG + '" stroke="' + (col || FG) + '" stroke-width="2"/>';
  }
  function cap(x, y, vert, pol) {
    var s = '<g transform="translate(' + x + ' ' + y + ')' + (vert ? '' : ' rotate(90)') + '"><rect x="-14" y="-5" width="28" height="10" fill="' + BG + '"/>' +
      '<line x1="-13" y1="-5" x2="13" y2="-5" stroke="' + FG + '" stroke-width="2.5"/><line x1="-13" y1="5" x2="13" y2="5" stroke="' + FG + '" stroke-width="2.5"/></g>';
    if (pol) s += txt(x + (vert ? 14 : -4), y + (vert ? -6 : -12), '+', 11);
    return s;
  }
  function ind(x, y) { // vízszintes tekercs
    var d = 'M' + (x - 24) + ' ' + y;
    for (var i = 0; i < 4; i++) d += ' a6 6 0 0 1 12 0';
    return '<rect x="' + (x - 24) + '" y="' + (y - 4) + '" width="48" height="8" fill="' + BG + '"/><path d="' + d + '" fill="none" stroke="' + FG + '" stroke-width="2.2"/>';
  }
  // dióda: ang = 0 → anód balra, katód jobbra (áram balról jobbra)
  function diode(x, y, ang, col, zener) {
    col = col || FG;
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (ang || 0) + ')"><rect x="-10" y="-11" width="20" height="22" fill="' + BG + '"/>' +
      '<path d="M-8 -9 L8 0 L-8 9 z" fill="' + col + '" stroke="' + col + '" stroke-width="1.5"/>' +
      (zener ? '<path d="M4 -12 L8 -9 L8 9 L12 12" fill="none" stroke="' + col + '" stroke-width="2.2"/>' : '<line x1="8" y1="-10" x2="8" y2="10" stroke="' + col + '" stroke-width="2.5"/>') + '</g>';
  }
  function gnd(x, y) {
    return '<line x1="' + x + '" y1="' + (y - 8) + '" x2="' + x + '" y2="' + y + '" stroke="' + FG + '" stroke-width="2"/>' +
      '<line x1="' + (x - 11) + '" y1="' + y + '" x2="' + (x + 11) + '" y2="' + y + '" stroke="' + FG + '" stroke-width="2.5"/>' +
      '<line x1="' + (x - 7) + '" y1="' + (y + 4) + '" x2="' + (x + 7) + '" y2="' + (y + 4) + '" stroke="' + FG + '" stroke-width="2"/>' +
      '<line x1="' + (x - 3) + '" y1="' + (y + 8) + '" x2="' + (x + 3) + '" y2="' + (y + 8) + '" stroke="' + FG + '" stroke-width="2"/>';
  }
  // műveleti erősítő: bal oldal x, közép y; invertáló bemenet felül (y−20), nem invertáló alul (y+20), kimenet (x+80, y)
  function opamp(x, y) {
    return '<path d="M' + x + ' ' + (y - 42) + ' L' + (x + 80) + ' ' + y + ' L' + x + ' ' + (y + 42) + ' z" fill="' + BG + '" stroke="' + FG + '" stroke-width="2.5"/>' +
      txt(x + 10, y - 15, '−', 16, null, 'font-weight="700"') + txt(x + 10, y + 26, '+', 16, null, 'font-weight="700"');
  }
  // NPN tranzisztor: bázis bal (x−30,y), kollektor fent (x, y−30), emitter lent (x, y+30)
  function npn(x, y, col) {
    col = col || FG;
    return '<circle cx="' + (x - 6) + '" cy="' + y + '" r="24" fill="' + BG + '" stroke="' + col + '" stroke-width="1.5"/>' +
      '<line x1="' + (x - 30) + '" y1="' + y + '" x2="' + (x - 14) + '" y2="' + y + '" stroke="' + col + '" stroke-width="2"/>' +
      '<line x1="' + (x - 14) + '" y1="' + (y - 14) + '" x2="' + (x - 14) + '" y2="' + (y + 14) + '" stroke="' + col + '" stroke-width="3"/>' +
      '<path d="M' + (x - 14) + ' ' + (y - 6) + ' L' + x + ' ' + (y - 18) + ' L' + x + ' ' + (y - 30) + '" fill="none" stroke="' + col + '" stroke-width="2"/>' +
      '<path d="M' + (x - 14) + ' ' + (y + 6) + ' L' + x + ' ' + (y + 18) + ' L' + x + ' ' + (y + 30) + '" fill="none" stroke="' + col + '" stroke-width="2"/>' +
      head(x - 1, y + 17, Math.atan2(12, 14), col, 9);
  }
  // n-csatornás MOSFET: gate bal (x−30, y), drain fent (x, y−30), source lent (x, y+30)
  function nmos(x, y, col) {
    col = col || FG;
    return '<line x1="' + (x - 30) + '" y1="' + y + '" x2="' + (x - 16) + '" y2="' + y + '" stroke="' + col + '" stroke-width="2"/>' +
      '<line x1="' + (x - 16) + '" y1="' + (y - 14) + '" x2="' + (x - 16) + '" y2="' + (y + 14) + '" stroke="' + col + '" stroke-width="2.5"/>' +
      '<line x1="' + (x - 10) + '" y1="' + (y - 16) + '" x2="' + (x - 10) + '" y2="' + (y + 16) + '" stroke="' + col + '" stroke-width="3" stroke-dasharray="7 4"/>' +
      '<path d="M' + x + ' ' + (y - 30) + ' L' + x + ' ' + (y - 12) + ' L' + (x - 10) + ' ' + (y - 12) + ' M' + (x - 10) + ' ' + (y + 12) + ' L' + x + ' ' + (y + 12) + ' L' + x + ' ' + (y + 30) + '" fill="none" stroke="' + col + '" stroke-width="2"/>' +
      '<path d="M' + (x - 10) + ' ' + y + ' L' + x + ' ' + y + ' L' + x + ' ' + (y + 12) + '" fill="none" stroke="' + col + '" stroke-width="2"/>' + head(x - 9, y, Math.PI, col, 7);
  }
  function plot(fn, a, b, n, X, Y, ylo, yhi) {
    var d = '', pen = false;
    for (var i = 0; i <= n; i++) {
      var u = a + (b - a) * i / n, v = fn(u), yy = Y(v);
      if (!isFinite(yy) || yy < ylo || yy > yhi) { pen = false; continue; }
      d += (pen ? 'L' : 'M') + r1(X(u)) + ' ' + r1(yy) + ' ';
      pen = true;
    }
    return d;
  }

  /* ---------- 1. p–n átmenet ---------- */
  var pnSvg = '<svg viewBox="0 0 560 240">' +
    '<rect x="60" y="20" width="220" height="110" fill="' + RED + '" opacity=".13"/><rect x="280" y="20" width="220" height="110" fill="' + BLUE + '" opacity=".13"/>' +
    '<rect x="236" y="20" width="88" height="110" fill="' + BG + '" opacity=".75" stroke="var(--muted)" stroke-dasharray="4 3"/>' +
    '<line x1="280" y1="20" x2="280" y2="130" stroke="var(--muted)"/>';
  [[80, 40], [120, 60], [160, 40], [200, 62], [95, 90], [140, 105], [185, 95], [215, 112], [110, 120]].forEach(function (p) {
    pnSvg += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="8" fill="none" stroke="' + RED + '" stroke-width="2"/>' + txt(p[0], p[1] + 4, '+', 11, 'middle', 'fill="' + RED + '" font-weight="700"');
  });
  [[345, 42], [385, 62], [425, 40], [465, 60], [360, 95], [405, 108], [450, 92], [480, 116], [340, 120]].forEach(function (p) {
    pnSvg += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="8" fill="' + BLUE + '"/>' + txt(p[0], p[1] + 4, '−', 12, 'middle', 'fill="#fff" font-weight="700"');
  });
  [40, 72, 104].forEach(function (y) {
    pnSvg += '<rect x="248" y="' + (y - 8) + '" width="16" height="16" rx="2" fill="none" stroke="' + RED + '" stroke-width="1.5"/>' + txt(256, y + 5, '−', 12, 'middle', 'fill="' + RED + '" font-weight="700"') +
      '<rect x="296" y="' + (y - 8) + '" width="16" height="16" rx="2" fill="none" stroke="' + BLUE + '" stroke-width="1.5"/>' + txt(304, y + 5, '+', 12, 'middle', 'fill="' + BLUE + '" font-weight="700"');
  });
  pnSvg += txt(30, 80, 'p', 22, 'middle', 'font-weight="700" fill="' + RED + '"') + txt(530, 80, 'n', 22, 'middle', 'font-weight="700" fill="' + BLUE + '"') +
    arrow(318, 146, 242, 146, ORANGE, 2.2) + txt(280, 162, 'belső tér E', 11, 'middle') + txt(280, 14, 'kiürített réteg', 11, 'middle', 'muted') +
    txt(150, 150, '○ lyukak (többségi)', 11, 'middle', 'muted') + txt(410, 150, '● elektronok (többségi)', 11, 'middle', 'muted') +
    '<line x1="60" y1="178" x2="500" y2="178" stroke="var(--line)"/>' +
    '<path d="M60 222 L236 222 C 268 222, 292 178, 324 178 L500 178" fill="none" stroke="' + PURPLE + '" stroke-width="2.5"/>' +
    '<line x1="510" y1="178" x2="510" y2="222" stroke="var(--muted)"/>' + head(510, 178, -Math.PI / 2, 'var(--muted)', 6) + head(510, 222, Math.PI / 2, 'var(--muted)', 6) +
    txt(516, 204, 'U_D', 11, null) + txt(60, 216, 'potenciál φ(x)', 11, null, 'muted') + '</svg>';

  /* ---------- 2. Dióda I–U karakterisztika ---------- */
  function ivFrame() {
    var x0 = 330, y0 = 140;
    return { x0: x0, y0: y0, X: function (u) { return u >= 0 ? x0 + u * 230 : x0 + u * 34; } };
  }
  var iv = ivFrame();
  var diodeIvSvg = '<svg viewBox="0 0 560 270">' +
    '<rect x="' + iv.X(0) + '" y="10" width="' + (550 - iv.X(0)) + '" height="130" fill="' + GREEN + '" opacity=".07"/>' +
    '<rect x="' + iv.X(-6.3) + '" y="140" width="' + (iv.X(0) - iv.X(-6.3)) + '" height="120" fill="' + BLUE + '" opacity=".07"/>' +
    arrow(20, iv.y0, 548, iv.y0, FG) + arrow(iv.x0, 262, iv.x0, 8, FG) +
    txt(546, iv.y0 + 18, 'U', 13, 'end') + txt(iv.x0 + 8, 18, 'I', 13) +
    '<path d="' + plot(function (u) { return u >= -6.6 ? 2.5 * (1 - Math.exp(u / 0.3)) : 2.5 + 115 * Math.exp((-6.6 - u) / 0.18) - 1; }, -7.8, 0, 300, iv.X, function (v) { return iv.y0 + v; }, 0, 262) + '" fill="none" stroke="' + RED + '" stroke-width="3"/>' +
    '<path d="' + plot(function (u) { return 100 * (Math.exp((u - 0.7) / 0.045) - Math.exp(-0.7 / 0.045)); }, 0, 0.9, 300, iv.X, function (v) { return iv.y0 - v; }, 8, 262) + '" fill="none" stroke="' + RED + '" stroke-width="3"/>' +
    '<line x1="' + iv.X(0.7) + '" y1="' + iv.y0 + '" x2="' + iv.X(0.7) + '" y2="30" stroke="var(--muted)" stroke-dasharray="4 4"/>' +
    txt(iv.X(0.7), iv.y0 + 16, '≈ 0,7 V', 11, 'middle') + txt(iv.X(0.35), iv.y0 + 16, '0,35', 10, 'middle', 'muted') +
    txt(470, 40, 'nyitóirány', 13, 'middle', 'font-weight="700" fill="' + GREEN + '"') + txt(470, 58, 'exponenciális áram', 11, 'middle', 'muted') +
    txt(200, 128, 'záróirány: I ≈ −I_S (nA)', 12, 'middle', 'fill="' + BLUE + '"') +
    txt(iv.X(-6.6) - 6, 230, 'letörés', 12, 'end', 'font-weight="700" fill="' + RED + '"') + txt(iv.X(-6.6) - 6, 246, '−U_BR', 11, 'end', 'muted') +
    txt(iv.X(-3), iv.y0 + 34, 'a negatív U-tengely összenyomva', 10, 'middle', 'muted') + '</svg>';

  /* ---------- 3. Zener-stabilizátor ---------- */
  var zenerSvg = '<svg viewBox="0 0 560 245">' +
    wire([[40, 50], [250, 50], [250, 180], [40, 180]]) + wire([[250, 50], [330, 50], [330, 180], [250, 180]]) +
    res(140, 50) + diode(250, 115, -90, PURPLE, true) + res(330, 115, true) +
    term(40, 50) + term(40, 180) + dot(250, 50) + dot(250, 180) +
    txt(140, 36, 'R_s (soros)', 12, 'middle') + txt(268, 120, 'Z', 13, null, 'fill="' + PURPLE + '" font-weight="700"') + txt(346, 120, 'R_t', 12) +
    txt(30, 120, 'U_be', 13, 'middle') + txt(30, 136, '(ingadozó)', 10, 'middle', 'muted') + txt(346, 160, 'U_ki = U_Z', 12, null, 'font-weight="700"') +
    arrow(80, 66, 120, 66, ORANGE) + txt(76, 80, 'I = I_Z + I_t', 11) +
    // mini karakterisztika
    arrow(400, 70, 550, 70, FG, 1.2) + arrow(530, 205, 530, 20, FG, 1.2) +
    '<path d="M548 30 L 534 70 L 470 72 C 455 74, 452 90, 448 205" fill="none" stroke="' + PURPLE + '" stroke-width="2.5"/>' +
    '<line x1="452" y1="70" x2="452" y2="205" stroke="var(--muted)" stroke-dasharray="3 4"/>' + txt(452, 64, '−U_Z', 11, 'middle') +
    txt(470, 222, 'meredek: U alig változik,', 10, 'middle', 'muted') + txt(470, 236, 'I széles tartományban', 10, 'middle', 'muted') + txt(548, 86, 'U', 11, 'end') + '</svg>';

  /* ---------- 4. Egyenirányító hullámformák ---------- */
  function wave(y0, amp, fn, col, dash, w) {
    return '<path d="' + plot(fn, 0, 2, 400, function (t) { return 140 + t * 200; }, function (v) { return y0 - v * amp; }, 0, 400) + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2.5) + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>';
  }
  function sinT(t) { return Math.sin(2 * Math.PI * t); }
  var rectSvg = '<svg viewBox="0 0 560 275">';
  [[60, 'U_be (váltakozó)'], [150, 'egyutas'], [240, 'kétutas (Graetz)']].forEach(function (r) {
    rectSvg += '<line x1="140" y1="' + r[0] + '" x2="540" y2="' + r[0] + '" ' + LN + ' stroke-width="1"/>' + txt(130, r[0] - 4, r[1], 12, 'end');
  });
  rectSvg += wave(60, 36, sinT, BLUE) +
    wave(150, 36, sinT, 'var(--muted)', true, 1.2) + wave(150, 36, function (t) { return Math.max(0, sinT(t) - 0.08); }, RED) +
    wave(240, 36, function (t) { return Math.max(0, Math.abs(sinT(t)) - 0.16); }, GREEN) +
    txt(130, 162, 'f = 50 Hz', 10, 'end', 'muted') + txt(130, 252, 'f = 100 Hz', 10, 'end', 'muted') +
    txt(130, 176, 'negatív félhullám elvész', 10, 'end', 'muted') + txt(130, 266, 'negatív félhullám átfordul', 10, 'end', 'muted') + '</svg>';

  /* ---------- 5. Szűrőkondenzátor: hullámosság ---------- */
  var capSvg = '<svg viewBox="0 0 560 220">', vc = 0.98, dPath = '', rPath = '';
  for (var si = 0; si <= 600; si++) {
    var st = si / 600 * 3, rv = Math.max(0, Math.abs(Math.sin(Math.PI * st)) - 0.02);
    vc = Math.max(rv, vc - 0.3 * (3 / 600));
    dPath += (si ? 'L' : 'M') + r1(60 + st * 160) + ' ' + r1(190 - vc * 150) + ' ';
    rPath += (si ? 'L' : 'M') + r1(60 + st * 160) + ' ' + r1(190 - rv * 150) + ' ';
  }
  capSvg += '<line x1="60" y1="190" x2="545" y2="190" ' + LN + '/>' +
    '<path d="' + rPath + '" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4"/>' +
    '<path d="' + dPath + '" fill="none" stroke="' + GREEN + '" stroke-width="3"/>' +
    '<line x1="380" y1="43" x2="540" y2="43" stroke="' + RED + '" stroke-dasharray="3 3"/><line x1="380" y1="88" x2="540" y2="88" stroke="' + RED + '" stroke-dasharray="3 3"/>' +
    arrow(530, 70, 530, 45, RED) + arrow(530, 62, 530, 86, RED) + txt(524, 70, 'ΔU', 12, 'end', 'fill="' + RED + '" font-weight="700"') +
    txt(60, 210, 'szaggatott: kétutasan egyenirányított feszültség · zöld: a kondenzátoron mérhető U_ki', 11, null, 'muted') +
    txt(185, 30, 'tölt a csúcson', 11, 'middle') + txt(250, 112, 'kisül a terhelésen', 11, 'middle') + '</svg>';

  /* ---------- 6. NPN tranzisztor: rétegek és áramok ---------- */
  var bjtSvg = '<svg viewBox="0 0 560 230">' +
    '<rect x="40" y="40" width="90" height="140" fill="' + BLUE + '" opacity=".18" stroke="' + BLUE + '"/><rect x="130" y="40" width="30" height="140" fill="' + RED + '" opacity=".2" stroke="' + RED + '"/><rect x="160" y="40" width="110" height="140" fill="' + BLUE + '" opacity=".12" stroke="' + BLUE + '"/>' +
    txt(85, 115, 'n⁺', 18, 'middle', 'font-weight="700" fill="' + BLUE + '"') + txt(145, 115, 'p', 16, 'middle', 'font-weight="700" fill="' + RED + '"') + txt(215, 115, 'n', 18, 'middle', 'font-weight="700" fill="' + BLUE + '"') +
    txt(85, 32, 'emitter', 11, 'middle') + txt(145, 200, 'bázis (vékony!)', 11, 'middle') + txt(215, 32, 'kollektor', 11, 'middle') +
    arrow(60, 76, 250, 76, ORANGE, 2.2) + txt(155, 68, 'elektronok: E → C', 11, 'middle', 'fill="' + ORANGE + '"') +
    '<path d="M70 150 C 110 150, 130 150, 140 168" fill="none" stroke="' + ORANGE + '" stroke-width="1.5" stroke-dasharray="3 3"/>' + txt(85, 172, 'kevés rekombinál', 9, 'middle', 'muted') +
    // kapcsolási jel
    wire([[420, 30], [420, 70]]) + wire([[420, 130], [420, 170]]) + wire([[340, 100], [390, 100]]) + npn(420, 100) +
    txt(432, 36, 'C (kollektor)', 12) + txt(432, 172, 'E (emitter)', 12) + txt(340, 92, 'B (bázis)', 12) +
    arrow(420, 6, 420, 26, RED, 2) + txt(430, 18, 'I_C = β·I_B', 12, null, 'fill="' + RED + '" font-weight="700"') +
    arrow(320, 112, 360, 112, BLUE, 2) + txt(320, 128, 'I_B', 12, null, 'fill="' + BLUE + '" font-weight="700"') +
    arrow(420, 176, 420, 200, GREEN, 2) + txt(430, 200, 'I_E = I_B + I_C', 12, null, 'fill="' + GREEN + '" font-weight="700"') + '</svg>';

  /* ---------- 7. Kimeneti karakterisztika + munkaegyenes ---------- */
  var oc = { X: function (u) { return 60 + u / 12 * 400; }, Y: function (i) { return 200 - i / 6 * 180; } };
  function icOf(ic, u) { return ic * (1 - Math.exp(-u / 0.25)) * (1 + u / 200); }
  var outSvg = '<svg viewBox="0 0 560 240">' + arrow(60, 200, 548, 200, FG) + arrow(60, 200, 60, 10, FG) +
    txt(546, 222, 'U_CE (V)', 11, 'end') + txt(66, 18, 'I_C (mA)', 11) +
    [0, 3, 6, 9, 12].map(function (u) { return txt(oc.X(u), 216, u, 10, 'middle', 'muted'); }).join('') +
    [1, 2, 3, 4, 5, 6].map(function (i) { return txt(54, oc.Y(i) + 4, i, 10, 'end', 'muted'); }).join('');
  [6, 12, 18, 24].forEach(function (ib, k) {
    var ic = ib * 0.2; // β = 200, µA → mA
    outSvg += '<path d="' + plot(function (u) { return icOf(ic, u); }, 0, 13, 200, oc.X, oc.Y, 0, 400) + '" fill="none" stroke="' + BLUE + '" stroke-width="2" opacity="' + (0.55 + k * 0.15) + '"/>' +
      txt(oc.X(13) + 6, oc.Y(icOf(ic, 13)) + 4, 'I_B = ' + ib + ' µA', 10, null, 'fill="' + BLUE + '"');
  });
  // munkapont: a 12 µA-es görbe és a munkaegyenes metszéspontja (bisectio)
  var qa = 0.5, qb = 12;
  for (var qi = 0; qi < 40; qi++) { var qm = (qa + qb) / 2; if (icOf(2.4, qm) > (12 - qm) / 2.4) qb = qm; else qa = qm; }
  outSvg += '<line x1="' + oc.X(0) + '" y1="' + oc.Y(12 / 2.4) + '" x2="' + oc.X(12) + '" y2="' + oc.Y(0) + '" stroke="' + RED + '" stroke-width="2.5"/>' +
    '<circle cx="' + r1(oc.X(qa)) + '" cy="' + r1(oc.Y(icOf(2.4, qa))) + '" r="6.5" fill="' + ORANGE + '"/>' + txt(oc.X(qa) + 14, oc.Y(icOf(2.4, qa)) - 10, 'Q munkapont', 12, null, 'font-weight="700"') +
    txt(oc.X(0.6), oc.Y(0.4), 'munkaegyenes: I_C = (U_t − U_CE) / R_C', 11, null, 'fill="' + RED + '"') +
    txt(70, 40, 'telítés', 10, null, 'muted') + txt(oc.X(11), 194, 'lezárás', 10, 'middle', 'muted') + '</svg>';

  /* ---------- 8. Közös emitteres erősítő ---------- */
  var ceSvg = '<svg viewBox="0 0 560 270">' +
    wire([[100, 30], [380, 30]]) + wire([[180, 30], [180, 240]]) + wire([[300, 30], [300, 98]]) + wire([[300, 158], [300, 240]]) + wire([[80, 240], [400, 240]]) +
    wire([[60, 128], [270, 128]]) + wire([[300, 80], [440, 80]]) + wire([[300, 190], [360, 190], [360, 240]]) +
    res(180, 75, true) + res(180, 195, true) + res(300, 55, true) + res(300, 205, true) + cap(120, 128, false) + cap(390, 80, false) + cap(360, 215, true, true) +
    npn(300, 128) + term(60, 128) + term(440, 80) + dot(180, 128) + dot(300, 80) + dot(300, 190) + dot(180, 240) + dot(300, 240) + dot(360, 240) + dot(180, 30) + dot(300, 30) +
    gnd(240, 262) + wire([[240, 240], [240, 254]]) +
    txt(380, 24, '+U_t (12 V)', 12) + txt(160, 80, 'R_1', 12, 'end') + txt(160, 200, 'R_2', 12, 'end') + txt(316, 60, 'R_C', 12) + txt(316, 212, 'R_E', 12) +
    txt(120, 112, 'C_be', 11, 'middle') + txt(390, 64, 'C_ki', 11, 'middle') + txt(376, 220, 'C_E', 11) +
    txt(50, 152, 'u_be', 12, 'middle', 'fill="' + BLUE + '"') + txt(452, 100, 'u_ki', 12, 'middle', 'fill="' + RED + '"') +
    '<path d="' + plot(function (t) { return Math.sin(2 * Math.PI * t); }, 0, 2, 80, function (t) { return 20 + t * 25; }, function (v) { return 180 - v * 8; }, 0, 400) + '" fill="none" stroke="' + BLUE + '" stroke-width="2"/>' +
    '<path d="' + plot(function (t) { return -Math.sin(2 * Math.PI * t); }, 0, 2, 80, function (t) { return 460 + t * 40; }, function (v) { return 140 - v * 26; }, 0, 400) + '" fill="none" stroke="' + RED + '" stroke-width="2"/>' +
    txt(480, 186, 'nagyobb és', 10, 'middle', 'muted') + txt(480, 199, 'ellenfázisú', 10, 'middle', 'muted') + txt(100, 260, 'osztó: munkapont', 10, null, 'muted') + '</svg>';

  /* ---------- 9. MOSFET alsó oldali kapcsoló ---------- */
  var mosSvg = '<svg viewBox="0 0 560 250">' +
    wire([[260, 20], [260, 108]]) + wire([[260, 168], [260, 220]]) + wire([[150, 138], [230, 138]]) +
    wire([[260, 20], [340, 20], [340, 50]]) + wire([[340, 90], [340, 108], [260, 108]]) +
    '<circle cx="260" cy="64" r="20" fill="' + BG + '" stroke="' + FG + '" stroke-width="2"/>' + txt(260, 69, 'M', 14, 'middle', 'font-weight="700"') +
    diode(340, 70, -90, PURPLE) + res(190, 138) + nmos(260, 138) + gnd(260, 228) + dot(260, 20) + dot(260, 108) + term(110, 138) + wire([[110, 138], [150, 138]]) +
    txt(260, 14, '+24 V', 12, 'middle') + txt(356, 74, 'szabadonfutó dióda', 11, null, 'fill="' + PURPLE + '"') + txt(190, 124, 'R_G', 11, 'middle') +
    txt(272, 120, 'D', 11) + txt(272, 166, 'S', 11) + txt(100, 128, 'PWM', 11, 'end', 'fill="' + BLUE + '"') + txt(100, 144, '(0/10 V)', 10, 'end', 'muted') +
    txt(300, 186, 'bekapcsolva: U_DS = I·R_DS(on) ≈ 0', 11) + txt(300, 204, 'kikapcsolva: I ≈ 0, U_DS ≈ U_t', 11) + txt(300, 222, '→ mindkét állapotban P ≈ 0', 11, null, 'font-weight="700"') + '</svg>';

  /* ---------- 10. Kapcsolási veszteség ---------- */
  var swSvg = '<svg viewBox="0 0 560 230">' + '<line x1="40" y1="110" x2="545" y2="110" ' + LN + ' stroke-width="1"/><line x1="40" y1="210" x2="545" y2="210" ' + LN + ' stroke-width="1"/>' +
    wire([[40, 30], [150, 30], [210, 100], [350, 100], [410, 30], [545, 30]], RED, 2.5) +
    wire([[40, 100], [150, 100], [210, 40], [350, 40], [410, 100], [545, 100]], BLUE, 2.5) +
    '<path d="M150 210 Q180 150 210 210 z M350 210 Q380 150 410 210 z" fill="' + ORANGE + '" opacity=".85"/>' +
    '<path d="M210 210 L210 200 L350 200 L350 210 z" fill="' + ORANGE + '" opacity=".35"/>' +
    txt(36, 34, 'u_DS', 12, 'end', 'fill="' + RED + '"') + txt(36, 104, 'i_D', 12, 'end', 'fill="' + BLUE + '"') + txt(36, 204, 'p = u·i', 12, 'end') +
    txt(180, 132, 'bekapcsolás (t_r)', 11, 'middle', 'muted') + txt(380, 132, 'kikapcsolás (t_f)', 11, 'middle', 'muted') +
    txt(280, 192, 'vezetési veszteség (I²·R_DS(on))', 10, 'middle', 'muted') + txt(180, 226, 'kapcsolási', 10, 'middle', 'fill="' + ORANGE + '"') + txt(380, 226, 'kapcsolási', 10, 'middle', 'fill="' + ORANGE + '"') +
    '</svg>';

  /* ---------- 11. H-híd ---------- */
  function hsw(x, y, on, lbl) {
    var c = on ? GREEN : 'var(--muted)';
    return '<rect x="' + (x - 22) + '" y="' + (y - 18) + '" width="44" height="36" rx="6" fill="' + BG + '" stroke="' + c + '" stroke-width="2.5"/>' + txt(x, y + 5, lbl, 13, 'middle', 'font-weight="700" fill="' + c + '"');
  }
  var hSvg = '<svg viewBox="0 0 560 250">' +
    wire([[140, 25], [420, 25]]) + wire([[140, 225], [420, 225]]) + wire([[180, 25], [180, 225]]) + wire([[380, 25], [380, 225]]) + wire([[180, 125], [250, 125]]) + wire([[310, 125], [380, 125]]) +
    wire([[180, 25], [180, 125], [252, 125]], GREEN, 4) + wire([[308, 125], [380, 125], [380, 225]], GREEN, 4) +
    '<circle cx="280" cy="125" r="28" fill="' + BG + '" stroke="' + FG + '" stroke-width="2.5"/>' + txt(280, 131, 'M', 16, 'middle', 'font-weight="700"') +
    hsw(180, 70, true, 'Q1') + hsw(380, 70, false, 'Q2') + hsw(180, 180, false, 'Q3') + hsw(380, 180, true, 'Q4') +
    arrow(232, 104, 252, 104, GREEN, 2) + txt(134, 29, '+U_t', 12, 'end') + gnd(280, 242) + wire([[280, 225], [280, 234]]) +
    txt(440, 80, 'Q1 + Q4 be: előre', 12, null, 'fill="' + GREEN + '"') + txt(440, 100, 'Q2 + Q3 be: hátra', 12, null, 'muted') +
    txt(440, 150, 'TILOS: Q1 + Q3', 12, null, 'fill="' + RED + '" font-weight="700"') + txt(440, 168, '(átlövés, rövidzár)', 11, null, 'muted') + '</svg>';

  /* ---------- 12. Ideális műveleti erősítő: jelkép + átviteli görbe ---------- */
  var opaSvg = '<svg viewBox="0 0 560 230">' + wire([[40, 95], [120, 95]]) + wire([[40, 135], [120, 135]]) + wire([[200, 115], [250, 115]]) + wire([[160, 50], [160, 96]]) + wire([[160, 134], [160, 180]]) +
    opamp(120, 115) + term(40, 95) + term(40, 135) + term(250, 115) +
    txt(34, 99, 'U−', 12, 'end') + txt(34, 139, 'U+', 12, 'end') + txt(256, 108, 'U_ki', 12) + txt(166, 52, '+U_táp', 11) + txt(166, 186, '−U_táp', 11) +
    txt(40, 214, 'U_ki = A_0·(U+ − U−),  A_0 ≈ 10⁵…10⁶', 11, null, 'muted') +
    arrow(300, 115, 548, 115, FG, 1.2) + arrow(420, 215, 420, 15, FG, 1.2) +
    '<path d="M305 190 L405 190 L435 40 L540 40" fill="none" stroke="' + RED + '" stroke-width="2.8"/>' +
    '<line x1="300" y1="40" x2="548" y2="40" stroke="var(--muted)" stroke-dasharray="3 4"/><line x1="300" y1="190" x2="548" y2="190" stroke="var(--muted)" stroke-dasharray="3 4"/>' +
    txt(546, 132, 'U_d = U+ − U−', 10, 'end') + txt(426, 24, 'U_ki', 11) + txt(540, 34, '+U_sat', 10, 'end', 'muted') + txt(306, 206, '−U_sat', 10, null, 'muted') +
    txt(444, 96, 'lineáris tartomány:', 10, null, 'muted') + txt(444, 108, 'csak néhány µV széles!', 10, null, 'muted') + '</svg>';

  /* ---------- 13. Invertáló erősítő ---------- */
  var invSvg = '<svg viewBox="0 0 560 230">' +
    wire([[50, 110], [230, 110], [260, 110]]) + wire([[210, 110], [210, 50], [400, 50], [400, 130]]) + wire([[340, 130], [480, 130]]) + wire([[260, 150], [230, 150], [230, 190]]) +
    res(130, 110) + res(305, 50) + opamp(260, 130) + term(50, 110) + term(480, 130) + dot(210, 110) + dot(400, 130) + gnd(230, 198) +
    txt(130, 96, 'R_1', 13, 'middle') + txt(305, 36, 'R_f', 13, 'middle') + txt(44, 96, 'U_be', 13) + txt(474, 116, 'U_ki', 13) +
    txt(210, 132, 'X', 12, 'middle', 'fill="' + PURPLE + '" font-weight="700"') + txt(120, 160, 'X: virtuális föld (U ≈ 0)', 11, 'middle', 'fill="' + PURPLE + '"') +
    arrow(100, 124, 160, 124, ORANGE) + txt(130, 140, 'I = U_be/R_1', 11, 'middle', 'fill="' + ORANGE + '"') + arrow(270, 64, 340, 64, ORANGE) +
    txt(410, 212, 'U_ki = −(R_f / R_1)·U_be', 14, 'middle', 'font-weight="700"') + '</svg>';

  /* ---------- 14. Neminvertáló erősítő és feszültségkövető ---------- */
  var nonSvg = '<svg viewBox="0 0 560 240">' +
    wire([[40, 200], [125, 200], [125, 150], [140, 150]]) + wire([[140, 110], [70, 110], [70, 165]]) + wire([[110, 110], [110, 40], [250, 40], [250, 130]]) + wire([[220, 130], [290, 130]]) +
    res(70, 140, true) + gnd(70, 173) + res(180, 40) + opamp(140, 130) + term(40, 200) + term(290, 130) + dot(110, 110) + dot(250, 130) +
    txt(54, 146, 'R_1', 12, 'end') + txt(180, 28, 'R_f', 12, 'middle') + txt(36, 190, 'U_be', 12) + txt(284, 118, 'U_ki', 12) +
    txt(200, 232, 'A = 1 + R_f / R_1', 13, 'middle', 'font-weight="700"') +
    '<line x1="330" y1="10" x2="330" y2="230" stroke="var(--line)"/>' +
    wire([[360, 150], [430, 150]]) + wire([[430, 110], [410, 110], [410, 60], [530, 60], [530, 130]]) + wire([[510, 130], [545, 130]]) +
    opamp(430, 130) + term(360, 150) + dot(530, 130) + txt(356, 140, 'U_be', 12) + txt(470, 52, 'közvetlen visszacsatolás', 10, 'middle', 'muted') +
    txt(450, 210, 'feszültségkövető: A = 1', 13, 'middle', 'font-weight="700"') + txt(450, 228, 'nagy R_be, kis R_ki', 11, 'middle', 'muted') + '</svg>';

  /* ---------- 15. Összegző ---------- */
  var sumSvg = '<svg viewBox="0 0 560 220">';
  [60, 110, 160].forEach(function (y, k) {
    sumSvg += wire([[50, y], [190, y], [190, 110]]) + res(120, y) + term(50, y) + txt(38, y + 4, 'U_' + (k + 1), 12, 'end') + txt(120, y - 12, 'R_' + (k + 1), 11, 'middle');
  });
  sumSvg += wire([[190, 110], [260, 110]]) + wire([[220, 110], [220, 30], [400, 30], [400, 130]]) + wire([[340, 130], [480, 130]]) + wire([[260, 150], [240, 150], [240, 190]]) +
    res(310, 30) + opamp(260, 130) + dot(190, 110) + dot(220, 110) + dot(400, 130) + term(480, 130) + gnd(240, 198) +
    txt(310, 18, 'R_f', 12, 'middle') + txt(486, 134, 'U_ki', 12) +
    txt(380, 196, 'U_ki = −R_f·(U_1/R_1 + U_2/R_2 + U_3/R_3)', 12, 'middle', 'font-weight="700"') + '</svg>';

  /* ---------- 16. Komparátor és Schmitt-trigger ---------- */
  var cmpSvg = '<svg viewBox="0 0 560 240">' + '<line x1="40" y1="80" x2="545" y2="80" ' + LN + ' stroke-width="1"/><line x1="40" y1="190" x2="545" y2="190" ' + LN + ' stroke-width="1"/>';
  function noisy(t) { return Math.sin(2 * Math.PI * t) + 0.12 * Math.sin(2 * Math.PI * 23 * t) ; }
  cmpSvg += '<path d="' + plot(noisy, 0, 2, 600, function (t) { return 40 + t * 250; }, function (v) { return 80 - v * 55; }, 0, 400) + '" fill="none" stroke="' + BLUE + '" stroke-width="2"/>' +
    '<line x1="40" y1="' + (80 - 0.35 * 55) + '" x2="545" y2="' + (80 - 0.35 * 55) + '" stroke="' + RED + '" stroke-dasharray="5 4"/>' +
    '<line x1="40" y1="' + (80 + 0.35 * 55) + '" x2="545" y2="' + (80 + 0.35 * 55) + '" stroke="' + RED + '" stroke-dasharray="5 4"/>' +
    txt(548, 80 - 0.35 * 55 - 4, '+U_H', 10, 'end', 'fill="' + RED + '"') + txt(548, 80 + 0.35 * 55 + 12, '−U_H', 10, 'end', 'fill="' + RED + '"') + txt(36, 84, 'U_be', 12, 'end', 'fill="' + BLUE + '"');
  // Schmitt-kimenet szimulációval
  var sp = '', st2 = -1, lastY = 205, tt, v, xx, yy;
  for (var ci = 0; ci <= 600; ci++) {
    tt = ci / 600 * 2; v = noisy(tt);
    if (st2 < 0 && v > 0.35) st2 = 1; else if (st2 > 0 && v < -0.35) st2 = -1;
    xx = r1(40 + tt * 250); yy = st2 > 0 ? 150 : 205;
    sp += ci ? 'L' + xx + ' ' + lastY + ' L' + xx + ' ' + yy + ' ' : 'M' + xx + ' ' + yy + ' ';
    lastY = yy;
  }
  cmpSvg += '<path d="' + sp + '" fill="none" stroke="' + GREEN + '" stroke-width="2.5"/>' + txt(36, 180, 'U_ki', 12, 'end', 'fill="' + GREEN + '"') +
    txt(290, 232, 'hiszterézis: a zaj nem okoz többszörös átbillenést', 11, 'middle', 'muted') + txt(548, 146, '+U_sat', 10, 'end', 'muted') + txt(548, 220, '−U_sat', 10, 'end', 'muted') + '</svg>';

  /* ---------- 17. RC alul- és felüláteresztő ---------- */
  function rcCircuit(x, lp) {
    var s = wire([[x, 60], [x + 200, 60]]) + wire([[x, 170], [x + 200, 170]]) + wire([[x + 130, 60], [x + 130, 170]]) +
      term(x, 60) + term(x, 170) + term(x + 200, 60) + term(x + 200, 170) + dot(x + 130, 60) + dot(x + 130, 170);
    if (lp) s += res(x + 65, 60) + cap(x + 130, 115, true) + txt(x + 65, 46, 'R', 12, 'middle') + txt(x + 148, 120, 'C', 12);
    else s += cap(x + 65, 60, false) + res(x + 130, 115, true) + txt(x + 65, 42, 'C', 12, 'middle') + txt(x + 146, 120, 'R', 12);
    return s + txt(x - 6, 120, 'U_be', 12, 'middle') + txt(x + 210, 120, 'U_ki', 12, 'middle') +
      txt(x + 100, 205, lp ? 'aluláteresztő' : 'felüláteresztő', 13, 'middle', 'font-weight="700" fill="' + (lp ? BLUE : RED) + '"') +
      txt(x + 100, 222, lp ? 'magas f-en C rövidzár → U_ki → 0' : 'alacsony f-en C szakadás → U_ki → 0', 10, 'middle', 'muted');
  }
  var rcSvg = '<svg viewBox="0 0 560 235">' + rcCircuit(40, true) + rcCircuit(320, false) + '</svg>';

  /* ---------- 18. Bode-diagram (elsőrendű aluláteresztő) ---------- */
  var bd = { X: function (lf) { return 70 + (lf + 2) / 4 * 430; }, Ya: function (db) { return 20 - db / 50 * 120 + 0; }, Yp: function (ph) { return 175 - ph / 90 * 60; } };
  bd.Ya = function (db) { return 22 - db * 2.4; };
  var bodeSvg = '<svg viewBox="0 0 560 260">';
  [-2, -1, 0, 1, 2].forEach(function (e) {
    bodeSvg += '<line x1="' + bd.X(e) + '" y1="14" x2="' + bd.X(e) + '" y2="240" stroke="var(--line)"/>' + txt(bd.X(e), 254, { '-2': '0,01', '-1': '0,1', 0: '1', 1: '10', 2: '100' }[e], 10, 'middle', 'muted');
  });
  bodeSvg += txt(548, 254, 'f / f_c', 11, 'end') +
    '<line x1="70" y1="' + bd.Ya(0) + '" x2="500" y2="' + bd.Ya(0) + '" ' + LN + ' stroke-width="1"/>' +
    [0, -20, -40].map(function (d) { return txt(64, bd.Ya(d) + 4, d + ' dB', 10, 'end', 'muted'); }).join('') +
    '<path d="M' + bd.X(-2) + ' ' + bd.Ya(0) + ' L' + bd.X(0) + ' ' + bd.Ya(0) + ' L' + bd.X(2) + ' ' + bd.Ya(-40) + '" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4"/>' +
    '<path d="' + plot(function (lf) { return -10 * Math.log10(1 + Math.pow(10, 2 * lf)); }, -2, 2, 200, bd.X, bd.Ya, 0, 400) + '" fill="none" stroke="' + BLUE + '" stroke-width="3"/>' +
    '<circle cx="' + bd.X(0) + '" cy="' + bd.Ya(-3.01) + '" r="5" fill="' + RED + '"/>' + txt(bd.X(0) + 10, bd.Ya(-3) + 18, '−3 dB a törésponton', 11, null, 'fill="' + RED + '"') +
    txt(bd.X(1.5), bd.Ya(-22), '−20 dB/dekád', 11, 'middle', 'muted') +
    '<line x1="70" y1="' + bd.Yp(0) + '" x2="500" y2="' + bd.Yp(0) + '" ' + LN + ' stroke-width="1"/>' +
    [0, -45, -90].map(function (d) { return txt(64, bd.Yp(d) + 4, d + '°', 10, 'end', 'muted'); }).join('') +
    '<path d="' + plot(function (lf) { return -Math.atan(Math.pow(10, lf)) * 180 / Math.PI; }, -2, 2, 200, bd.X, bd.Yp, 0, 400) + '" fill="none" stroke="' + PURPLE + '" stroke-width="3"/>' +
    '<circle cx="' + bd.X(0) + '" cy="' + bd.Yp(-45) + '" r="5" fill="' + RED + '"/>' + txt(bd.X(0) + 8, bd.Yp(-45) - 6, '−45°', 11, null, 'fill="' + RED + '"') +
    txt(76, 12, 'amplitúdó |H| (dB)', 11, null, 'fill="' + BLUE + '"') + txt(76, bd.Yp(0) - 10, 'fázis φ', 11, null, 'fill="' + PURPLE + '"') + '</svg>';

  /* ---------- 19. Lineáris stabilizátor ---------- */
  var linSvg = '<svg viewBox="0 0 560 200">' +
    wire([[40, 60], [480, 60]]) + wire([[40, 160], [480, 160]]) + wire([[110, 60], [110, 160]]) + wire([[380, 60], [380, 160]]) + wire([[260, 90], [260, 160]]) +
    '<rect x="200" y="36" width="120" height="54" rx="6" fill="' + BG + '" stroke="' + FG + '" stroke-width="2.5"/>' + txt(260, 60, '7805', 14, 'middle', 'font-weight="700"') + txt(260, 78, 'soros tranzisztor', 10, 'middle', 'muted') +
    cap(110, 110, true) + cap(380, 110, true) + term(40, 60) + term(40, 160) + term(480, 60) + term(480, 160) + dot(110, 60) + dot(110, 160) + dot(380, 60) + dot(380, 160) + dot(260, 160) +
    txt(126, 114, '330 nF', 10) + txt(396, 114, '100 nF', 10) + txt(36, 52, 'U_be = 12 V', 12) + txt(484, 52, 'U_ki = 5 V', 12, 'end') + txt(200, 30, 'IN', 10, null, 'muted') + txt(320, 30, 'OUT', 10, 'end', 'muted') + txt(268, 130, 'GND', 10, null, 'muted') +
    '<rect x="150" y="176" width="' + (5 / 12 * 260) + '" height="16" fill="' + GREEN + '"/><rect x="' + (150 + 5 / 12 * 260) + '" y="176" width="' + (7 / 12 * 260) + '" height="16" fill="' + RED + '"/>' +
    txt(146, 189, 'P_be:', 11, 'end') + txt(150 + 5 / 24 * 260, 189, 'terhelésé 42%', 10, 'middle', 'fill="#fff"') + txt(150 + (5 / 12 + 7 / 24) * 260, 189, 'hővé alakul 58%', 10, 'middle', 'fill="#fff"') + '</svg>';

  /* ---------- 20. Buck konverter ---------- */
  var buckSvg = '<svg viewBox="0 0 560 290">' +
    wire([[40, 50], [260, 50], [360, 50]]) + wire([[40, 150], [400, 150]]) + wire([[200, 50], [200, 150]]) + wire([[300, 50], [300, 150]]) + wire([[360, 50], [400, 50], [400, 150]]) +
    '<line x1="80" y1="50" x2="140" y2="50" stroke="' + BG + '" stroke-width="5"/><line x1="86" y1="50" x2="128" y2="34" stroke="' + FG + '" stroke-width="2.5"/>' + dot(86, 50) + dot(134, 50) +
    diode(200, 100, -90, PURPLE) + ind(250, 50) + cap(300, 100, true) + res(400, 100, true) + term(40, 50) + term(40, 150) + dot(200, 50) + dot(200, 150) + dot(300, 50) + dot(300, 150) +
    txt(110, 26, 'S (MOSFET)', 11, 'middle') + txt(250, 36, 'L', 12, 'middle') + txt(316, 104, 'C', 12) + txt(416, 104, 'R_t', 12) + txt(184, 104, 'D', 12, 'end', 'fill="' + PURPLE + '"') +
    txt(34, 104, 'U_be', 12, 'middle') + txt(440, 104, 'U_ki = D·U_be', 12, null, 'font-weight="700"') +
    // hullámformák
    '<line x1="60" y1="225" x2="545" y2="225" ' + LN + ' stroke-width="1"/><line x1="60" y1="280" x2="545" y2="280" ' + LN + ' stroke-width="1"/>';
  var sw = 'M60 225', il = 'M60 268';
  for (var bk = 0; bk < 4; bk++) {
    var x0 = 60 + bk * 120;
    sw += ' L' + x0 + ' 185 L' + (x0 + 50) + ' 185 L' + (x0 + 50) + ' 225 L' + (x0 + 120) + ' 225';
    il += ' L' + (x0 + 50) + ' 246 L' + (x0 + 120) + ' 268';
  }
  buckSvg += '<path d="' + sw + '" fill="none" stroke="' + RED + '" stroke-width="2.2"/><path d="' + il + '" fill="none" stroke="' + BLUE + '" stroke-width="2.5"/>' +
    '<line x1="60" y1="257" x2="545" y2="257" stroke="' + BLUE + '" stroke-dasharray="3 4" opacity=".7"/>' +
    txt(54, 200, 'u_SW', 11, 'end', 'fill="' + RED + '"') + txt(54, 262, 'i_L', 11, 'end', 'fill="' + BLUE + '"') +
    '<line x1="60" y1="178" x2="110" y2="178" stroke="var(--muted)"/>' + txt(85, 174, 'D·T', 10, 'middle', 'muted') + 
    txt(548, 254, 'átlag = I_ki', 10, 'end', 'fill="' + BLUE + '"') + '</svg>';

  STUDIE.addCourse({
    id: 'elektronika',
    title: 'Analóg elektronika',
    icon: '📟',
    color: '#e5484d',
    level: 'BSc 2–4. félév (villamosmérnök, mechatronika)',
    description: 'A p–n átmenettől a kapcsolóüzemű tápig: dióda, tranzisztor, műveleti erősítő, szűrők.',
    intro: 'Az analóg elektronika a félvezető alkatrészek viselkedését és az ezekből épített alapkapcsolásokat tárgyalja. Ha a tranzisztor belsejét is látni szeretnéd, nézz bele a [[tranzisztor|tranzisztor]] modellbe; a hálózatszámítási alapokat (Ohm, Kirchhoff, impedancia) a Villamosmérnöki alapok kurzus gyűjti össze.',
    topics: [
      { id: 'dioda', title: 'Félvezetők és dióda' },
      { id: 'bjt', title: 'Bipoláris tranzisztor' },
      { id: 'fet', title: 'Térvezérlésű tranzisztor és kapcsolóüzem' },
      { id: 'opa', title: 'Műveleti erősítő' },
      { id: 'szuro', title: 'Szűrők és tápegységek' },
      { id: 'jel', title: 'Oszcillátorok, zaj, átalakítók és NYÁK' }
    ],
    formulas: [
      {
        id: 'shockley', title: 'Shockley-féle diódaegyenlet', en: 'Shockley diode equation',
        parts: [{ t: 'I_D', d: 'A diódán átfolyó áram', unit: 'A' }, { t: '=' }, { t: 'I_S', d: 'Záróirányú telítési áram: anyag- és hőmérsékletfüggő, nagyon kicsi', unit: 'A', more: 'Kisjelű Si diódánál 10⁻¹⁴…10⁻¹² A; kb. 10 °C-onként duplázódik.' },
          { t: '· ( exp(' }, { t: 'U_D', d: 'A diódára kapcsolt feszültség (anód − katód)', unit: 'V' }, { t: '/ (' }, { t: 'n', d: 'Idealitási tényező', unit: '–', more: 'Ideális diódánál 1, valódiaknál 1…2.' }, { t: '·' },
          { t: 'U_T', d: 'Termikus feszültség: k·T/q', unit: 'V', more: '300 K-en ≈ 25,85 mV (szobahőmérsékleten kerekítve 26 mV).' }, { t: ') − 1 )' }],
        text: 'Nyitóirányban (U_D ≫ U_T) a −1 elhanyagolható, az áram **exponenciálisan** nő: n = 1 esetén **minden 60 mV feszültségnövekedés tízszerezi** az áramot (`U_T·ln 10 ≈ 59,5 mV`). Záróirányban az exponenciális tag eltűnik, és `I_D ≈ −I_S`. A letörést az egyenlet nem írja le.',
        example: 'I_S = 10⁻¹⁴ A, n = 1, U_T = 25,85 mV. U_D = 0,65 V-nál `I_D ≈ 10⁻¹⁴ · e^25,15 ≈ 0,83 mA`, U_D = 0,70 V-nál már `≈ 5,8 mA`: 50 mV hétszeres áramot ad.'
      },
      {
        id: 'bjt-aram', title: 'A bipoláris tranzisztor áramai', en: 'BJT current relations',
        parts: [{ t: 'I_C', d: 'Kollektoráram', unit: 'A' }, { t: '=' }, { t: 'β', d: 'Egyenáramú áramerősítési tényező (h_FE)', unit: '–', more: 'Kisjelű tranzisztoroknál tipikusan 100…500, erősen szór és hőmérsékletfüggő.' }, { t: '·' }, { t: 'I_B', d: 'Bázisáram', unit: 'A' },
          { t: ',  ' }, { t: 'I_E', d: 'Emitteráram: a két áram összege (Kirchhoff-féle csomóponti törvény)', unit: 'A' }, { t: '= I_B + I_C' }],
        text: 'Csak az aktív (normál) tartományban igaz: a bázis–emitter átmenet nyitva, a bázis–kollektor átmenet zárva van. Telítésben `I_C < β·I_B`, mert a kollektoráramot már a külső kör korlátozza. Gyakran használt még `α = I_C/I_E = β/(β+1)`, ami 1-hez nagyon közeli.',
        example: 'β = 150, I_B = 20 µA: `I_C = 3 mA`, `I_E = 3,02 mA`, `α = 150/151 ≈ 0,993`.'
      },
      {
        id: 'invertalo-erosites', title: 'Invertáló erősítő feszültségerősítése', en: 'inverting amplifier gain',
        parts: [{ t: 'A_u', d: 'Zárt hurkú feszültségerősítés: U_ki/U_be', unit: '–' }, { t: '=' }, { t: '−' }, { t: 'R_f', d: 'Visszacsatoló ellenállás (kimenet és invertáló bemenet között)', unit: 'Ω' }, { t: '/' }, { t: 'R_1', d: 'Bemeneti ellenállás', unit: 'Ω', more: 'Egyben a kapcsolás bemeneti ellenállása is, mert az invertáló bemenet virtuális föld.' }],
        text: 'Az ideális műveleti erősítő két szabályából (a bemenetek közti feszültség nulla, a bemenetekbe nem folyik áram) vezethető le: `U_be/R_1 = −U_ki/R_f`. A negatív előjel 180°-os fázisfordítást jelent. Az erősítés csak az ellenállások arányától függ, a műveleti erősítő paramétereitől gyakorlatilag nem.',
        example: 'R_1 = 10 kΩ, R_f = 47 kΩ: `A_u = −4,7`. U_be = 0,5 V esetén `U_ki = −2,35 V`.'
      },
      {
        id: 'neminvertalo-erosites', title: 'Neminvertáló erősítő feszültségerősítése', en: 'non-inverting amplifier gain',
        parts: [{ t: 'A_u', d: 'Zárt hurkú feszültségerősítés', unit: '–' }, { t: '=' }, { t: '1 +' }, { t: 'R_f', d: 'Visszacsatoló ellenállás (kimenet és invertáló bemenet között)', unit: 'Ω' }, { t: '/' }, { t: 'R_1', d: 'Az invertáló bemenet és a föld közti ellenállás', unit: 'Ω' }],
        text: 'A kimenet R_f és R_1 osztóján át csatol vissza: az invertáló bemeneten `U_ki·R_1/(R_1+R_f)` jelenik meg, és ennek egyenlőnek kell lennie U_be-vel. Az erősítés mindig ≥ 1, és nincs fázisfordítás. R_f = 0 (vagy R_1 = ∞) esetén a kapcsolás **feszültségkövető**.',
        example: 'R_1 = 10 kΩ, R_f = 90 kΩ: `A_u = 1 + 9 = 10`. U_be = 0,3 V → `U_ki = 3 V`.'
      },
      {
        id: 'torespont', title: 'Az RC-tag törésponti frekvenciája', en: 'RC cutoff (corner) frequency',
        parts: [{ t: 'f_c', d: 'Törésponti (határ-) frekvencia: itt esik az átvitel −3 dB-re', unit: 'Hz' }, { t: '=' }, { t: '1 / (2π ·' }, { t: 'R', d: 'Ellenállás', unit: 'Ω' }, { t: '·' }, { t: 'C', d: 'Kapacitás', unit: 'F' }, { t: ')' }],
        text: 'Az `R·C = τ` szorzat az időállandó. Elsőrendű aluláteresztőre `|H(f)| = 1/√(1 + (f/f_c)²)`, a fázis `φ = −arctg(f/f_c)`. A törésponton a kimenet amplitúdója a bemenet `1/√2 ≈ 70,7%`-a, a teljesítmény a fele.',
        example: 'R = 1,6 kΩ, C = 100 nF: `f_c = 1/(2π · 1600 · 10⁻⁷) ≈ 995 Hz ≈ 1 kHz`. 10 kHz-en `|H| = 1/√101 ≈ 0,0995`, azaz kb. −20 dB.'
      },
      {
        id: 'linearis-veszteseg', title: 'Lineáris stabilizátor vesztesége és hatásfoka', en: 'linear regulator dissipation',
        parts: [{ t: 'P_v', d: 'A stabilizátorban hővé alakuló teljesítmény', unit: 'W' }, { t: '=' }, { t: '(' }, { t: 'U_be', d: 'Bemeneti feszültség', unit: 'V' }, { t: '−' }, { t: 'U_ki', d: 'Stabilizált kimeneti feszültség', unit: 'V' }, { t: ') ·' }, { t: 'I_t', d: 'Terhelőáram', unit: 'A' }],
        text: 'A soros tranzisztoron a teljes terhelőáram átfolyik, és a teljes feszültségkülönbség rajta esik. A hatásfok ezért legfeljebb `η = U_ki/U_be`, a terheléstől függetlenül (a saját nyugalmi áramot elhanyagolva).',
        example: '12 V → 5 V, 0,5 A: `P_v = 7 · 0,5 = 3,5 W`, `η = 5/12 ≈ 42%`. 3,5 W-hoz már hűtőborda kell.'
      },
      {
        id: 'buck', title: 'Feszültségcsökkentő (buck) konverter kimenete', en: 'buck converter conversion ratio',
        parts: [{ t: 'U_ki', d: 'Kimeneti (átlag)feszültség', unit: 'V' }, { t: '=' }, { t: 'D', d: 'Kitöltési tényező: a bekapcsolt idő és a periódusidő aránya, t_be/T', unit: '0…1' }, { t: '·' }, { t: 'U_be', d: 'Bemeneti feszültség', unit: 'V' }],
        text: 'Folyamatos tekercsáramú üzemben (CCM) érvényes, veszteségmentes alkatrészeket feltételezve. Levezetés: a tekercs átlagfeszültsége egy periódusra nulla, így `(U_be − U_ki)·D·T = U_ki·(1−D)·T`. A tekercsáram hullámossága `ΔI_L = (U_be − U_ki)·D/(L·f)`.',
        example: '12 V → 5 V: `D = 5/12 ≈ 0,417`. L = 22 µH, f = 500 kHz mellett `ΔI_L = 7 · 0,417 / (22·10⁻⁶ · 5·10⁵) ≈ 0,27 A` csúcstól csúcsig.'
      },
      {
        id: 'boost', title: 'Feszültségnövelő (boost) konverter kimenete', en: 'boost converter conversion ratio',
        parts: [{ t: 'U_ki', d: 'Kimeneti feszültség', unit: 'V' }, { t: '=' }, { t: 'U_be', d: 'Bemeneti feszültség', unit: 'V' }, { t: '/ (1 −' }, { t: 'D', d: 'Kitöltési tényező', unit: '0…1' }, { t: ')' }],
        text: 'Bekapcsolt kapcsolónál a tekercs a bemenetről energiát vesz fel, kikapcsoláskor a bemeneti feszültséghez hozzáadódva a diódán át a kimenetre adja. Ideálisan `U_ki ≥ U_be`; a gyakorlatban D ≈ 0,8–0,9 fölött a veszteségek miatt a kimenet már nem nő tovább.',
        example: 'Li-ion cella (3,7 V) → USB 5 V: `D = 1 − 3,7/5 = 0,26`. A bemeneti áram (veszteség nélkül) `I_be = I_ki · U_ki/U_be`: 1 A kimenethez kb. 1,35 A.'
      },
      {
        id: 'hurokerosites', title: 'Visszacsatolt erősítő erősítése (Black-képlet)', en: 'closed-loop gain with feedback',
        parts: [{ t: 'A_f', d: 'A visszacsatolt (zárt hurkú) erősítés', unit: '–' }, { t: '=' },
          { t: 'A', d: 'A nyílt hurkú erősítés (az erősítő saját erősítése)', unit: '–', more: 'Műveleti erősítőnél egyenáramon 10⁵–10⁶ nagyságrendű.' }, { t: '/ (1 +' },
          { t: 'A', d: 'Nyílt hurkú erősítés', unit: '–' }, { t: '·' }, { t: 'β', d: 'Visszacsatolási tényező: a kimenet ekkora hányada jut vissza a bemenetre', unit: '–' }, { t: ')' }],
        text: 'Az `A · β` szorzat a **hurokerősítés**. Ha `A · β ≫ 1`, akkor `A_f ≈ 1/β`: az erősítés csak a (pontos, stabil) visszacsatoló hálózattól függ. Az `1 + A · β` mennyiség a **visszacsatolás mértéke**: ennyiszeresére csökken az erősítés, nő a sávszélesség, és csökken az erősítésváltozás és a torzítás.',
        example: 'A = 100 000, β = 0,01: `A_f = 100 000 / 1001 ≈ 99,9`. Ha A felére esik (50 000), `A_f = 50 000 / 501 ≈ 99,8` – mindössze 0,1% változás.'
      },
      {
        id: 'integralo', title: 'Invertáló integrátor kimenete', en: 'inverting integrator',
        parts: [{ t: 'u_{ki}(t)', d: 'A kimeneti feszültség', unit: 'V' }, { t: '= −' },
          { t: '1/(R·C)', d: 'Az integrálási időállandó reciproka (R a bemeneti ellenállás, C a visszacsatoló kondenzátor)', unit: '1/s' }, { t: '· ∫' },
          { t: 'u_{be}', d: 'A bemeneti feszültség', unit: 'V' }, { t: 'dt + ' }, { t: 'u_{ki}(0)', d: 'A kezdeti kimeneti feszültség (a kondenzátor kezdeti töltéséből)', unit: 'V' }],
        text: 'A virtuális föld miatt a bemeneti áram `i = u_be/R`, és ez teljes egészében a kondenzátort tölti: `u_C = (1/C) · ∫ i dt`. Frekvenciatartományban `A(jω) = −1/(jωRC)`: az erősítés −20 dB/dekáddal csökken, a fázis állandóan +90° (az invertálás −180°-ával együtt).',
        example: 'R = 10 kΩ, C = 1 µF (RC = 10 ms), u_be = 1 V állandó: a kimenet `1/0,01 = 100 V/s` sebességgel csökken, 50 ms alatt −5 V-ig.'
      },
      {
        id: 'termikus-zaj', title: 'Termikus zaj (Johnson–Nyquist)', en: 'thermal (Johnson–Nyquist) noise',
        parts: [{ t: 'U_n', d: 'Az ellenálláson mérhető zajfeszültség effektív értéke', unit: 'V' }, { t: '= √(4 ·' },
          { t: 'k', d: 'Boltzmann-állandó', unit: '1,380649 · 10⁻²³ J/K' }, { t: '·' }, { t: 'T', d: 'Abszolút hőmérséklet', unit: 'K' }, { t: '·' },
          { t: 'R', d: 'Ellenállás', unit: 'Ω' }, { t: '·' }, { t: 'B', d: 'A vizsgált (zaj)sávszélesség', unit: 'Hz' }, { t: ')' }],
        text: 'A zaj fehér (frekvenciafüggetlen spektrumú), ezért a sávszélesség gyökével nő. A zajfeszültség-sűrűség `√(4kTR)`, egysége V/√Hz: szobahőmérsékleten 1 kΩ-ra ≈ 4 nV/√Hz. A sörétzaj árama hasonlóan `I_n = √(2 · q · I · B)`.',
        example: 'R = 1 kΩ, T = 300 K, B = 20 kHz (hangfrekvenciás sáv): `U_n = √(4 · 1,38 · 10⁻²³ · 300 · 1000 · 20 000) ≈ 0,58 µV`.'
      },
      {
        id: 'adc-snr', title: 'Ideális A/D-átalakító jel-zaj viszonya', en: 'ideal ADC signal-to-noise ratio',
        parts: [{ t: 'SNR', d: 'Jel-zaj viszony teljes kivezérlésű szinuszjelre, csak a kvantálási zajt figyelembe véve', unit: 'dB' }, { t: '=' },
          { t: '6,02', d: 'Bitenként ennyi dB: 20 · lg 2', unit: 'dB/bit' }, { t: '·' }, { t: 'N', d: 'A felbontás bitszáma', unit: 'bit' }, { t: '+' },
          { t: '1,76', d: 'A szinusz effektív értékének és a kvantálási zaj effektív értékének (LSB/√12) arányából adódó tag: 10 · lg 1,5', unit: 'dB' }],
        text: 'A kvantálási lépés `LSB = U_ref / 2^N`, a kvantálási hiba ±LSB/2 között egyenletes eloszlású, effektív értéke `LSB/√12`. Valós átalakítóra a mért SNR-ből (pontosabban SINAD-ból) visszaszámolt **effektív bitszám**: `ENOB = (SINAD − 1,76) / 6,02`.',
        example: '12 bites ADC: `SNR = 6,02 · 12 + 1,76 ≈ 74 dB`. 3,3 V-os referencia mellett `LSB = 3,3 / 4096 ≈ 0,81 mV`.'
      }
    ],
    terms: [
      /* ----- Félvezetők és dióda ----- */
      { id: 'pn-atmenet', term: 'p–n átmenet', en: 'p–n junction', topic: 'dioda',
        short: 'Egy félvezető kristályon belül a p- és n-típusú tartomány határa; a diódák, tranzisztorok és napelemek alapeleme.',
        prereq: ['lecke:fizika/atom', 'lecke:kemia/kemiai-kotesek', 'fizika-bsc/potencial'],
        visual: pnSvg, caption: 'A határon a többségi töltéshordozók átdiffundálnak és rekombinálódnak: visszamarad a helyhez kötött ionok kiürített rétege és a belső tér.',
        text: 'A tiszta szilícium rossz vezető. **Adalékolással** vezetőképessége nagyságrendekkel nő: ötvegyértékű atom (P, As) többletelektront ad (**n-típus**), háromvegyértékű (B) lyukat (**p-típus**).\n\nHa a két réteg egy kristályban találkozik, a lyukak az n-, az elektronok a p-oldal felé **diffundálnak** és rekombinálódnak. A határ közelében így csak a helyhez kötött, töltött adalékionok maradnak: ez a **kiürített réteg** (tértöltési tartomány). Ionjai belső elektromos teret hoznak létre, amely a további diffúziót megállítja; a két oldal közti potenciálkülönbség a **diffúziós feszültség** (Si-ban kb. 0,6–0,8 V).\n\nA diffúziós feszültség közvetlenül nem mérhető: egy rövidre zárt dióda kapcsain 0 V van, mert a fém–félvezető kontaktusokon ellentétes potenciálugrások lépnek fel.',
        example: 'N_A = N_D = 10¹⁶ cm⁻³ adalékolás, n_i = 10¹⁰ cm⁻³ (Si, 300 K): `U_D = U_T · ln(N_A·N_D/n_i²) = 0,02585 · ln(10¹²) ≈ 0,71 V`.',
        pitfall: 'A kiürített réteg **nem** üres: töltött ionok vannak benne, csak mozgó töltéshordozó nincs. Éppen ezek az ionok adják a belső teret és az átmenet kapacitását (záróréteg-kapacitás).',
        related: ['nyito-zaro-irany', 'dioda-karakterisztika', 'led', 'bjt', 'zener-dioda'],
        models: ['tranzisztor', 'napelempanel'] },
      { id: 'nyito-zaro-irany', term: 'Nyitóirány és záróirány', en: 'forward and reverse bias', topic: 'dioda',
        short: 'Nyitóirányban (anód pozitívabb) a dióda vezet; záróirányban (katód pozitívabb) csak elhanyagolható szivárgási áram folyik.',
        prereq: ['villamosmernoki/ohm-torveny', 'elektronika/pn-atmenet'],
        text: '**Nyitóirányú** előfeszítésnél a külső feszültség a belső térrel szemben hat: a kiürített réteg vékonyodik, a potenciálgát csökken, és a többségi töltéshordozók tömegesen átjutnak. Szilíciumdiódánál kb. 0,6–0,7 V felett az áram meredeken nő; Schottky-diódánál ez 0,2–0,4 V, LED-nél 1,8–3,3 V.\n\n**Záróirányban** a külső feszültség erősíti a belső teret, a kiürített réteg kiszélesedik. Csak a kisebbségi töltéshordozók kis **záróárama** folyik (nA–µA), egészen a **letörési feszültségig**.\n\nAz egyszerű számításokhoz a dióda helyettesíthető **állandó feszültségű modellel**: nyitva 0,7 V-os feszültségforrás, zárva szakadás.',
        example: '5 V-os tápról 1 kΩ-os ellenálláson át nyitóirányban: `I = (5 − 0,7)/1000 = 4,3 mA`. Megfordítva a diódát az áram néhány nA, az ellenálláson gyakorlatilag nem esik feszültség, a teljes 5 V a diódán van.',
        pitfall: 'A 0,7 V nem állandó: a nyitófeszültség az árammal logaritmikusan nő, a hőmérséklettel pedig kb. −2 mV/°C-kal csökken. Ezért nem szabad diódákat (és bipoláris tranzisztorokat) egyszerűen párhuzamosan kötni: a melegebb több áramot vesz fel.',
        formulas: ['shockley'],
        related: ['pn-atmenet', 'dioda-karakterisztika', 'egyeniranyito', 'led', 'zener-dioda'] },
      { id: 'dioda-karakterisztika', term: 'Dióda-karakterisztika (Shockley-egyenlet)', en: 'diode I–V characteristic, Shockley equation', topic: 'dioda',
        short: 'A dióda áram–feszültség jelleggörbéje: nyitóirányban exponenciális, záróirányban közel nulla, a letörésnél ismét meredek.',
        prereq: ['analizis/exponencialis-novekedes', 'elektronika/nyito-zaro-irany'],
        visual: diodeIvSvg, caption: 'A dióda I–U görbéje. A záróirányú szakaszt a jobb láthatóság kedvéért összenyomott léptékben rajzoltuk.',
        text: 'A Shockley-egyenlet `I_D = I_S·(e^(U_D/(n·U_T)) − 1)` a p–n átmenet ideális modellje. Három tartomány:\n\n- **nyitóirány**: exponenciális növekedés, 60 mV-onként tízszeres áram;\n- **záróirány**: `I_D ≈ −I_S`, gyakorlatilag szakadás;\n- **letörés**: a zárófeszültség egy határon túl lavina- vagy Zener-effektus miatt nagy áramot enged (az egyenlet ezt nem tartalmazza).\n\nA munkapont körüli kis változásokra a dióda **differenciális ellenállással** helyettesíthető: `r_d = n·U_T / I_D`. 1 mA-nél ez kb. 26 Ω.',
        formulas: ['shockley'],
        example: 'Mekkora feszültség kell 10 mA-hez, ha 1 mA-nél 0,65 V? Tízszeres áram → `+U_T·ln 10 ≈ +60 mV`, azaz kb. **0,71 V**. A differenciális ellenállás 10 mA-nél `26 mV / 10 mA ≈ 2,6 Ω`.',
        pitfall: 'Diódát feszültséggenerátorra közvetlenül kötni hiba: a meredek exponenciális miatt néhány tized V többlet is óriási áramot hajt át. A diódát mindig **árammal** kell vezérelni, vagyis soros ellenállás vagy áramgenerátor kell elé.',
        related: ['nyito-zaro-irany', 'zener-dioda', 'led', 'pn-atmenet', 'bjt'] },
      { id: 'zener-dioda', term: 'Zener-dióda', en: 'Zener diode', topic: 'dioda',
        short: 'Záróirányú letörésre tervezett dióda, amelynek feszültsége a letörési tartományban széles áramtartományon közel állandó (U_Z).',
        prereq: ['elektronika/dioda-karakterisztika', 'villamosmernoki/kirchhoff-1'],
        visual: zenerSvg, caption: 'Zener-diódás stabilizátor: a soros ellenálláson eső feszültség veszi fel a bemenet ingadozását.',
        text: 'Erősen adalékolt átmenet, amelynek letörési feszültségét (2,4…200 V) gyártáskor pontosan beállítják. 5–6 V alatt a kvantummechanikai **Zener-effektus** (alagutazás), felette a **lavinaeffektus** dominál; a kettő hőmérsékleti együtthatója ellentétes előjelű, ezért kb. 5,6 V-os diódák a legstabilabbak.\n\nFő alkalmazásai: egyszerű **feszültségstabilizátor** kis áramokhoz, **referenciafeszültség**, túlfeszültség-védelem.\n\nA soros ellenállás méretezése: `R_s = (U_be,min − U_Z) / (I_Z,min + I_t,max)`. A diódát a legrosszabb esetre (legnagyobb bemenet, nulla terhelés) kell teljesítményre ellenőrizni.',
        example: '12 V-ról 5,1 V-os Zenerrel, 20 mA terhelés és 10 mA minimális Zener-áram mellett: `R_s = (12 − 5,1)/0,03 = 230 Ω` (szabványos 220 Ω). Terhelés nélkül a teljes 30 mA a diódán folyik: `P_Z = 5,1 · 0,03 ≈ 153 mW`.',
        pitfall: 'A Zener-diódát **záróirányban** kell bekötni (katód a pozitívabb ponton). Nyitóirányban egyszerű diódaként 0,7 V-ot ad.',
        related: ['dioda-karakterisztika', 'linearis-stabilizator', 'nyito-zaro-irany'] },
      { id: 'led', term: 'LED (fénykibocsátó dióda)', en: 'light-emitting diode', topic: 'dioda',
        short: 'Direkt sávszerkezetű félvezetőből készült dióda, amelyben nyitóirányban a rekombinálódó töltéshordozók fotont bocsátanak ki.',
        prereq: ['fizika-bsc/fotoeffektus', 'elektronika/nyito-zaro-irany'],
        text: 'Az elektron–lyuk rekombinációkor felszabaduló energia a szilíciumban hővé alakul (indirekt sáv), de GaAs, GaP, InGaN típusú vegyület-félvezetőkben **fotonként** távozik. A foton energiája közel a tiltott sáv szélessége: `E = h·f ≈ E_g`, ezért a szín az anyagtól függ, és a nyitófeszültség is ezzel nő: vörös kb. 1,8–2,1 V, zöld/kék 2,8–3,3 V.\n\nA fehér LED valójában kék LED sárga fénypor (foszfor) bevonattal.\n\nA LED fényerejét az **áram** határozza meg, ezért áramkorlátozás kell: kis LED-nél soros ellenállás, teljesítmény-LED-nél áramgenerátoros meghajtó. A fényerő szabályozása PWM-mel történik.',
        example: '5 V-ról vörös LED (U_F = 2,0 V) 10 mA-rel: `R = (5 − 2)/0,01 = 300 Ω`. A közeli 330 Ω-mal `I ≈ 9,1 mA`, az ellenálláson `P = 3²/330 ≈ 27 mW` hő keletkezik.',
        pitfall: 'A LED záróirányú letörési feszültsége kicsi (kb. 5 V): váltakozó feszültségről vagy fordított bekötéssel könnyen tönkremegy.',
        related: ['pn-atmenet', 'nyito-zaro-irany', 'dioda-karakterisztika', 'mosfet-kapcsolo'] },
      { id: 'egyeniranyito', term: 'Egyenirányító', en: 'rectifier', topic: 'dioda',
        short: 'Diódás kapcsolás, amely a váltakozó feszültségből egyirányú (lüktető) feszültséget állít elő.',
        prereq: ['villamosmernoki/effektiv-ertek', 'villamosmernoki/transzformator', 'elektronika/nyito-zaro-irany'],
        visual: rectSvg, caption: 'Egyutas egyenirányítás egy diódával; kétutas a négydiódás Graetz-híddal: a lüktetés frekvenciája a hálózati kétszerese.',
        text: '**Egyutas** egyenirányító: egyetlen dióda csak a pozitív félhullámokat engedi át. Egyszerű, de rossz kihasználású, és a transzformátort egyenáramú összetevővel terheli.\n\n**Kétutas** egyenirányító: a **Graetz-híd** (4 dióda) mindkét félhullámot azonos irányba fordítja, így 50 Hz-es hálózatból 100 Hz-es lüktetés lesz. Félhullámonként két dióda vezet, ezért a csúcsfeszültségből kb. 2 × 0,7 V vész el.\n\nA kimeneti csúcsfeszültség: `U_csúcs = √2 · U_eff − n·U_F`, ahol n a sorba kapcsolt vezető diódák száma. A diódák záróirányú igénybevétele (PIV) Graetz-hídnál kb. a csúcsfeszültség.',
        example: '12 V effektív értékű transzformátor + Graetz-híd: `U_csúcs = 12 · √2 − 2 · 0,7 ≈ 16,97 − 1,4 ≈ 15,6 V`. Szűrés nélkül az átlagérték `2·U_csúcs/π ≈ 9,9 V`.',
        pitfall: 'A „12 V-os” transzformátor feszültsége **effektív érték**: szűrőkondenzátorral a kimenet közel a csúcsértékre, kb. 15–16 V-ra töltődik, terheletlenül pedig még ennél is magasabbra.',
        related: ['szurokondenzator', 'nyito-zaro-irany', 'linearis-stabilizator', 'kapcsolouzemu-tap'] },
      { id: 'szurokondenzator', term: 'Szűrőkondenzátor (pufferkondenzátor)', en: 'smoothing (reservoir) capacitor', topic: 'dioda',
        short: 'Az egyenirányító kimenetén lévő nagy kapacitású kondenzátor, amely a csúcsokon feltöltődik, közben a terhelést táplálja, és így kisimítja a feszültséget.',
        prereq: ['elektronika/egyeniranyito', 'fizika-bsc/elektromos-terero'],
        visual: capSvg, caption: 'A kondenzátor csak a csúcsok közelében töltődik (ekkor vezetnek a diódák), közte lineárisan kisül: ΔU a maradék hullámosság (brumm).',
        text: 'A diódák csak a feszültségcsúcsok környékén vezetnek, rövid, nagy **áramimpulzusokkal**. A két csúcs között a kondenzátor egyedül adja a terhelőáramot, így a feszültsége csökken.\n\nKözelítő méretezés (állandó terhelőáram, a kisülés a teljes periódusig tart): `ΔU ≈ I_t / (f_r · C)`, ahol f_r a lüktetés frekvenciája (egyutasnál 50 Hz, kétutasnál 100 Hz). Ebből `C ≈ I_t / (f_r · ΔU)`.\n\nA maradék **hullámosságot** (brumm) egy utána kötött stabilizátor szünteti meg; ehhez a hullámvölgy is maradjon a stabilizátor bemeneti minimuma felett.',
        example: '0,5 A terhelés, Graetz-híd (100 Hz), C = 2200 µF: `ΔU ≈ 0,5/(100 · 2,2·10⁻³) ≈ 2,3 V`. 1 V hullámossághoz `C ≈ 0,5/(100·1) = 5000 µF` kell, a következő szabványos érték 6800 µF.',
        pitfall: 'Nagyobb kondenzátor kisebb hullámosságot ad, de rövidebbek és nagyobbak lesznek a töltőáram-impulzusok: a diódákat, a transzformátort és a kondenzátor hullámossági áramát (ripple current) is erre kell méretezni. Az elektrolitkondenzátor polaritása nem cserélhető fel.',
        related: ['egyeniranyito', 'linearis-stabilizator', 'rc-szuro', 'kapcsolouzemu-tap'] },

      /* ----- Bipoláris tranzisztor ----- */
      { id: 'bjt', term: 'Bipoláris tranzisztor (BJT)', en: 'bipolar junction transistor', topic: 'bjt',
        short: 'Két p–n átmenetből (npn vagy pnp) álló háromkivezetéses félvezető, amelyben a kis bázisáram a nagy kollektoráramot vezérli.',
        prereq: ['modell:tranzisztor', 'elektronika/pn-atmenet', 'villamosmernoki/kirchhoff-1'],
        visual: bjtSvg, caption: 'npn tranzisztor: az emitterből injektált elektronok többsége átjut a vékony bázison, és a kollektor gyűjti össze őket.',
        text: 'Az **npn** tranzisztorban erősen adalékolt emitter, nagyon vékony, gyengén adalékolt p-bázis és n-kollektor követi egymást. **Aktív tartományban** a bázis–emitter átmenet nyitva (U_BE ≈ 0,6–0,7 V), a bázis–kollektor átmenet zárva van.\n\nAz emitterből a bázisba injektált elektronoknak csak töredéke rekombinálódik a vékony bázisban (ez a bázisáram), a túlnyomó többség átdiffundál, és a záróirányú kollektor-átmenet tere „beszippantja” őket. Így `I_C = β·I_B`.\n\nPontosabban a BJT **feszültségvezérelt**: `I_C ≈ I_S·e^(U_BE/U_T)`, a bázisáram ennek mellékterméke. Működési tartományok: **lezárás**, **aktív** (erősítő), **telítés** (zárt kapcsoló, U_CE,sat ≈ 0,1–0,3 V).',
        formulas: ['bjt-aram'],
        example: 'β = 100 és I_B = 20 µA esetén `I_C = 2 mA` és `I_E = 2,02 mA`. A bázis–emitter feszültség 1 mA-ről 2 mA-re növeléséhez `U_T·ln 2 ≈ 18 mV`-tal kell nagyobb U_BE.',
        pitfall: 'A tranzisztor nem két egymással szembe kötött dióda: két diszkrét diódából nem lehet tranzisztort építeni, mert a hatás a **vékony közös bázison** múlik.',
        related: ['aramerosites', 'munkapont', 'kozos-emitteres', 'pn-atmenet', 'mosfet-kapcsolo'],
        models: ['tranzisztor'] },
      { id: 'aramerosites', term: 'Áramerősítési tényező (β, h_FE)', en: 'current gain (beta, hFE)', topic: 'bjt',
        short: 'Aktív tartományban a kollektoráram és a bázisáram hányadosa: β = I_C/I_B, tipikusan 100–500.',
        prereq: ['elektronika/bjt'],
        text: 'Az egyenáramú értéket **h_FE**, a kisjelű (váltakozó áramú) értéket **h_fe** vagy β jelöli; a kettő közel azonos. A β értéke:\n\n- **erősen szór**: egy típuson belül akár 2–3-szoros eltérés (ezért vannak BC547**A/B/C** csoportok);\n- **hőmérsékletfüggő**: kb. +0,5…1%/°C;\n- **áramfüggő**: kis és nagy kollektoráramnál csökken.\n\nA jó kapcsolás ezért **nem támaszkodik a β pontos értékére**: a munkapontot és az erősítést külső ellenállások (emitter-ellenállás, negatív visszacsatolás) határozzák meg. Nagy β-hoz két tranzisztor **Darlington-kapcsolásba** köthető: `β ≈ β_1·β_2`.',
        formulas: ['bjt-aram'],
        example: 'Teljesítménytranzisztor (β = 20) 3 A-es motort kapcsol. Telítéshez legalább `I_B = 3/20 = 150 mA` kell, ezt egy mikrokontroller lába nem tudja adni. Darlingtonnal (β ≈ 20·100 = 2000) már 1,5 mA is elég, de a telítési feszültség kb. 1 V-ra nő – ezért ide inkább MOSFET való.',
        pitfall: 'Kapcsolóüzemben szándékosan **túlvezérlik** a bázist (pl. `I_B ≈ I_C/10`), hogy a tranzisztor biztosan telítésbe kerüljön; a `I_C = β·I_B` összefüggés itt már nem érvényes.',
        related: ['bjt', 'munkapont', 'kozos-emitteres', 'mosfet-kapcsolo'] },
      { id: 'munkapont', term: 'Munkapont', en: 'operating point, quiescent point (Q-point)', topic: 'bjt',
        short: 'Az erősítő elem egyenáramú nyugalmi állapota (pl. I_C, U_CE), amely körül a váltakozó jel ingadozik.',
        prereq: ['elektronika/aramerosites', 'villamosmernoki/thevenin'],
        visual: outSvg, caption: 'Kimeneti karakterisztikák (β = 200) és a 12 V-os tápról 2,4 kΩ-os R_C-n át húzott munkaegyenes. A munkapont a lineáris tartomány közepén van.',
        text: 'A munkapont a **munkaegyenes** és a tranzisztor karakterisztikájának metszéspontja. A munkaegyenest a külső kör adja: `U_CE = U_t − I_C·R_C` (emitter-ellenállással `− I_E·R_E` is).\n\nJó munkapont: a tranzisztor a teljes jelkivezérlés alatt **aktív tartományban** marad, se lezárásba, se telítésbe nem kerül. Kis jelre ez általában `U_CE ≈ U_t/2` környéke.\n\nA **munkapont-beállítás** (biasing) legjobb egyszerű módja a **bázisosztó + emitter-ellenállás**: az osztó állandó bázisfeszültséget ad, R_E pedig negatívan visszacsatol: ha I_C nőne, nő U_E is, csökken U_BE, ami visszafogja az áramot. Így I_C ≈ (U_B − 0,7)/R_E, a β-tól szinte független.',
        example: 'U_t = 12 V, R_C = 2,4 kΩ, I_C = 2,4 mA: `U_CE = 12 − 2,4·10⁻³ · 2400 = 6,24 V`, épp a középen. Bázisosztó + R_E méretezés: U_B = 2,0 V, R_E = 560 Ω → `I_C ≈ (2,0 − 0,7)/560 ≈ 2,3 mA`, β = 100 és β = 300 esetén is.',
        pitfall: 'A „bázisellenállásos” beállítás (R_B közvetlenül a tápról) a β szórása miatt használhatatlan: β = 100 helyett 300 esetén háromszoros I_C adódik, és a tranzisztor telítésbe kerül.',
        related: ['aramerosites', 'kozos-emitteres', 'bjt', 'negativ-visszacsatolas'] },
      { id: 'kozos-emitteres', term: 'Közös emitteres erősítő', en: 'common-emitter amplifier', topic: 'bjt',
        short: 'Az alapvető bipoláris feszültségerősítő: a jel a bázisra érkezik, a kollektorról vesszük le, az emitter a közös (váltakozó áramú föld) pont.',
        prereq: ['elektronika/munkapont', 'villamosmernoki/impedancia'],
        visual: ceSvg, caption: 'Közös emitteres fokozat bázisosztóval, emitter-ellenállással és csatolókondenzátorokkal. A kimenet ellenfázisú.',
        text: 'Kisjelű helyettesítéssel a tranzisztor egy `g_m·u_be` áramgenerátor, ahol a **meredekség** `g_m = I_C / U_T` (1 mA-nél kb. 38,7 mS).\n\n- **Feszültségerősítés** (R_E hidegítve, C_E-vel): `A_u ≈ −g_m·R_C` – nagy, de a munkaponttól és a hőmérséklettől függ.\n- Hidegítetlen R_E-vel: `A_u ≈ −R_C / (R_E + 1/g_m) ≈ −R_C/R_E` – kisebb, de stabil és lineárisabb (soros áram-visszacsatolás).\n- **Bemeneti ellenállás**: kb. `R_1 ∥ R_2 ∥ β/g_m`; **kimeneti**: kb. R_C.\n- **Fázisfordítás**: 180°.\n\nA C_be és C_ki **csatolókondenzátorok** a jelet átengedik, de az egyenáramú munkapontot elválasztják a forrástól és a terheléstől; ezek miatt a fokozat alsó határfrekvenciával rendelkezik.',
        example: 'I_C = 2,5 mA, R_C = 2,2 kΩ: `g_m = 2,5 mA / 25,85 mV ≈ 96,7 mS`, hidegített R_E-vel `A_u ≈ −213`. 220 Ω hidegítetlen R_E-vel: `A_u ≈ −2200/(220 + 10,3) ≈ −9,6` (≈ −R_C/R_E = −10).',
        pitfall: 'Nagy erősítéshez nem elég R_C-t növelni: a munkapont lecsúszik a telítés felé, és a kivezérelhetőség elfogy. Az erősítés helyett gyakran jobb két fokozat vagy egy műveleti erősítő.',
        related: ['munkapont', 'aramerosites', 'bjt', 'invertalo', 'rc-szuro', 'negativ-visszacsatolas'] },

      /* ----- Térvezérlésű tranzisztor és kapcsolóüzem ----- */
      { id: 'mosfet-kapcsolo', term: 'MOSFET mint kapcsoló', en: 'MOSFET as a power switch', topic: 'fet',
        short: 'Teljesen nyitott (kis R_DS(on)) vagy teljesen zárt állapotban üzemeltetett térvezérlésű tranzisztor, amely kis veszteséggel kapcsol nagy áramot.',
        prereq: ['digitalis-technika/mosfet', 'e-mobilitas/pwm', 'modell:tranzisztor'],
        widget: { type: 'mosfet-iv' },
        visual: mosSvg, caption: 'Alsó oldali (low-side) n-csatornás MOSFET kapcsoló induktív terheléssel és szabadonfutó diódával.',
        text: 'A MOSFET-et a **gate–source feszültség** (U_GS) vezérli; a szigetelt gate-be statikusan nem folyik áram. A **küszöbfeszültség** (U_GS(th), 1–4 V) felett csatorna alakul ki; teljesen nyitva a drain–source szakasz egy kis ellenállás: **R_DS(on)** (néhány mΩ…Ω).\n\nKapcsolóüzemben a cél, hogy a tranzisztor gyorsan haladjon át a lineáris tartományon. A gate valójában egy **kondenzátor** (Q_g gate-töltés): gyors kapcsoláshoz amperes csúcsáramú **gate-meghajtó** kell.\n\nA testdióda (body diode) miatt a MOSFET csak egy irányban zár. Induktív terhelésnél (motor, relé, tekercs) kikapcsoláskor a tekercs árama nem szakadhat meg hirtelen: ezt **szabadonfutó dióda** vezeti el, különben a feszültségcsúcs átüti a tranzisztort.',
        example: 'R_DS(on) = 10 mΩ, I = 20 A: vezetési veszteség `P = I²·R = 400 · 0,01 = 4 W`, a feszültségesés csak 0,2 V. Ugyanez egy 1 V telítési feszültségű Darlington tranzisztorral 20 W lenne.',
        pitfall: 'Az R_DS(on) adatlapi értéke adott U_GS-re vonatkozik (pl. 10 V). 3,3 V-os mikrokontrollerről közvetlenül csak **logikai szintű** (logic-level) MOSFET vezérelhető jól; egyébként félig nyitva marad és túlmelegszik. R_DS(on) a hőmérséklettel nő.',
        related: ['kapcsolasi-veszteseg', 'h-hid', 'bjt', 'aramerosites', 'kapcsolouzemu-tap', 'led'],
        models: ['tranzisztor'] },
      { id: 'kapcsolasi-veszteseg', term: 'Kapcsolási veszteség', en: 'switching loss', topic: 'fet',
        short: 'A be- és kikapcsolás átmeneti ideje alatt a kapcsolón egyszerre van feszültség és folyik áram; az ebből adódó, frekvenciával arányos veszteség.',
        prereq: ['elektronika/mosfet-kapcsolo', 'e-mobilitas/hatasfok'],
        visual: swSvg, caption: 'Átkapcsoláskor u_DS és i_D átfedése veszteségi impulzust okoz; bekapcsolt állapotban csak a kis vezetési veszteség marad.',
        text: 'Egy félvezető kapcsoló teljes vesztesége két részből áll:\n\n- **vezetési veszteség**: `P_vez = I²·R_DS(on)·D` (D a bekapcsolt időarány);\n- **kapcsolási veszteség**: lineáris közelítéssel `P_sw ≈ ½·U·I·(t_r + t_f)·f_sw`, ahol t_r és t_f a fel- és lefutási idő, f_sw a kapcsolási frekvencia.\n\nA kapcsolási frekvencia emelése kisebb tekercset és kondenzátort tesz lehetővé, de a kapcsolási veszteség vele arányosan nő. Ezért keresik a gyorsabb kapcsolókat: **SiC** és **GaN** tranzisztorokkal nagyságrendekkel rövidebb átkapcsolás érhető el. A **lágy kapcsolás** (ZVS, ZCS) technikái úgy kapcsolnak, hogy közben a feszültség vagy az áram nulla legyen.',
        example: 'U = 48 V, I = 10 A, t_r + t_f = 100 ns, f_sw = 100 kHz: `P_sw = 0,5 · 48 · 10 · 10⁻⁷ · 10⁵ = 2,4 W`. A vezetési veszteség R_DS(on) = 10 mΩ, D = 0,5 mellett csak `100 · 0,01 · 0,5 = 0,5 W`.',
        pitfall: 'A kapcsolási veszteség nem csökken a jobb (kisebb R_DS(on)-ú) MOSFET-tel, sőt: a nagyobb chip nagyobb gate-kapacitással lassabban kapcsol. A két veszteség között kompromisszum van.',
        related: ['mosfet-kapcsolo', 'h-hid', 'kapcsolouzemu-tap'] },
      { id: 'h-hid', term: 'H-híd', en: 'H-bridge', topic: 'fet',
        short: 'Négy kapcsolóból álló hídkapcsolás, amely a terhelésre (pl. egyenáramú motorra) mindkét polaritású feszültséget kapcsolni tud.',
        prereq: ['elektronika/mosfet-kapcsolo', 'e-mobilitas/inverter', 'e-mobilitas/pwm'],
        visual: hSvg, caption: 'H-híd: az átlósan szemközti kapcsolópár határozza meg az áram irányát a motoron.',
        text: 'Két **félhíd** (egy felső és egy alsó kapcsoló egy-egy ágban), a terhelés a két félhíd középpontja közé kerül. Kapcsolási állapotok:\n\n- Q1 + Q4: **előre**, Q2 + Q3: **hátra**;\n- Q3 + Q4 (vagy Q1 + Q2): a motor rövidre zárva, **fékezés**;\n- mind kikapcsolva: **szabadonfutás** a testdiódákon át.\n\nA fordulatszámot **PWM** szabályozza: az átlagos motorfeszültség `D·U_t`. Az egy ágban lévő két kapcsoló soha nem lehet egyszerre bekapcsolva (**átlövés**, shoot-through): ezt a meghajtó **holtidővel** (dead time) akadályozza meg. Három félhíd együtt a háromfázisú motorok **inverterét** adja.',
        example: '12 V-os motor PWM-mel, D = 0,75: átlagos feszültség `0,75 · 12 = 9 V`. 20 kHz-en a periódus 50 µs; 200 ns holtidő élenként a periódus `0,2/50 = 0,4%`-a.',
        pitfall: 'A felső oldali n-csatornás MOSFET gate-jét a tápfeszültség **fölé** kell vezérelni (bootstrap vagy töltéspumpa). Ha csak a tápra húzzuk, a tranzisztor sosem nyit ki teljesen.',
        related: ['mosfet-kapcsolo', 'kapcsolasi-veszteseg', 'kapcsolouzemu-tap'] },

      /* ----- Műveleti erősítő ----- */
      { id: 'idealis-opa', term: 'Ideális műveleti erősítő', en: 'ideal operational amplifier (op-amp)', topic: 'opa',
        short: 'Végtelen erősítésű, végtelen bemeneti és nulla kimeneti ellenállású differenciálerősítő-modell; a valódi műveleti erősítők jó közelítése.',
        prereq: ['elektronika/kozos-emitteres', 'villamosmernoki/kirchhoff-1'],
        visual: opaSvg, caption: 'A műveleti erősítő jelképe és átviteli görbéje: a hatalmas erősítés miatt visszacsatolás nélkül szinte mindig telítésben van.',
        text: 'A műveleti erősítő (OPA, op-amp) két bemenet **különbségét** erősíti: `U_ki = A_0·(U+ − U−)`. Az ideális modell: `A_0 → ∞`, `R_be → ∞`, `R_ki → 0`, végtelen sávszélesség.\n\nNegatív visszacsatolású kapcsolásokban ebből két **aranyszabály** következik:\n\n1. **A bemenetekbe nem folyik áram.**\n2. **A két bemenet feszültsége egyenlő** (U+ = U−), mert véges kimenethez végtelen erősítés mellett nulla bemeneti különbség tartozik.\n\nValódi paraméterek (pl. általános célú OPA): A_0 ≈ 10⁵–10⁶, bemeneti ofszetfeszültség µV–mV, **erősítés–sávszélesség szorzat** (GBW) 1–100 MHz, **jelváltozási sebesség** (slew rate) 0,5–20 V/µs. A kimenet nem lépheti túl a tápfeszültséget (rail-to-rail típusok közelítik meg).',
        example: 'A_0 = 10⁵ mellett U_ki = 10 V-hoz csak `U_d = 10/10⁵ = 100 µV` bemeneti különbség kell – ezért mondhatjuk, hogy U+ ≈ U−. 1 MHz GBW-jű OPA 100-szoros erősítéssel már csak kb. 10 kHz-ig erősít jól.',
        pitfall: 'A második aranyszabály (U+ = U−) **csak működő negatív visszacsatolásnál** igaz. Komparátorként vagy pozitív visszacsatolásnál a bemenetek feszültsége nagyon különböző lehet.',
        related: ['negativ-visszacsatolas', 'invertalo', 'neminvertalo', 'komparator', 'feszultsegkoveto', 'osszegzo'] },
      { id: 'negativ-visszacsatolas', term: 'Negatív visszacsatolás', en: 'negative feedback', topic: 'opa',
        short: 'A kimenet egy részének ellentétes előjellel a bemenetre való visszavezetése; csökkenti és stabilizálja az erősítést, javítja a linearitást és a sávszélességet.',
        prereq: ['elektronika/idealis-opa'],
        text: 'Ha a nyílt hurkú erősítés A, a visszacsatolási tényező β (a kimenet ekkora hányada jut vissza), a **zárt hurkú erősítés**:\n\n`A_z = A / (1 + A·β)`.\n\nHa a **hurokerősítés** `A·β ≫ 1`, akkor `A_z ≈ 1/β`: az erősítés csak a visszacsatoló hálózattól (pontos ellenállásoktól) függ, a tranzisztorok szórásától, hőfokától nem. Ez minden precíziós analóg áramkör alapja.\n\nAz ár: az erősítés csökken. Cserébe `(1 + A·β)`-szorosára csökken a torzítás és (feszültség-visszacsatolásnál) a kimeneti ellenállás, és ugyanennyivel nő a sávszélesség.\n\nA **pozitív** visszacsatolás ezzel szemben öngerjesztést (oszcillátor) vagy kétállapotú működést (Schmitt-trigger) okoz.',
        example: 'A = 10⁵, β = 0,01 (célérték: 100-szoros erősítés): `A_z = 10⁵/(1 + 1000) ≈ 99,90`. Ha A felére esik (5·10⁴): `A_z ≈ 99,80` – az erősítés 50%-os változásából 0,1%-os lett.',
        pitfall: 'A visszacsatolás a frekvencia függvényében fázist forgat. Ha a hurokerősítés 1-nél még 180° fázistolás jön létre, a negatív visszacsatolás pozitívvá válik és a kapcsolás **begerjed**. Ezért fontos a fázistartalék, és ezért belsőleg kompenzáltak az OPA-k.',
        related: ['idealis-opa', 'invertalo', 'neminvertalo', 'munkapont', 'kozos-emitteres', 'komparator', 'linearis-stabilizator'] },
      { id: 'invertalo', term: 'Invertáló erősítő', en: 'inverting amplifier', topic: 'opa',
        short: 'Műveleti erősítős alapkapcsolás, amelynek erősítése −R_f/R_1: a kimenet ellenfázisú és az ellenállásarány szerint skálázott.',
        prereq: ['elektronika/negativ-visszacsatolas', 'villamosmernoki/kirchhoff-1'],
        visual: invSvg, caption: 'Invertáló erősítő. A nem invertáló bemenet földelt, ezért a negatív visszacsatolás az invertáló bemenetet is 0 V-on tartja (virtuális föld).',
        text: 'Levezetés az aranyszabályokkal: U− = U+ = 0 (**virtuális föld**), ezért R_1-en `I = U_be/R_1` folyik. Ez az áram nem mehet be az OPA-ba, így teljes egészében R_f-en folyik tovább: `U_ki = −I·R_f`. Tehát\n\n`U_ki = −(R_f/R_1)·U_be`.\n\nTulajdonságai:\n\n- erősítése 1-nél kisebb is lehet (csillapító);\n- **bemeneti ellenállása R_1** (nem végtelen!);\n- a virtuális föld miatt több bemenet is összeköthető: **összegző**;\n- R_f helyére kondenzátort téve **integrátor**, R_1 helyére **differenciáló** lesz.',
        formulas: ['invertalo-erosites'],
        example: 'R_1 = 10 kΩ, R_f = 47 kΩ, U_be = 0,5 V: `U_ki = −4,7 · 0,5 = −2,35 V`. A meghajtó forrás 10 kΩ-ot lát, és `0,5/10⁴ = 50 µA` áramot ad.',
        pitfall: 'Ha a jelforrásnak belső ellenállása van (R_g), az R_1-gyel sorba kerül: az erősítés `−R_f/(R_1 + R_g)` lesz. Nagy belső ellenállású érzékelő elé ezért feszültségkövető vagy neminvertáló erősítő való.',
        related: ['idealis-opa', 'negativ-visszacsatolas', 'neminvertalo', 'osszegzo', 'kozos-emitteres'] },
      { id: 'neminvertalo', term: 'Neminvertáló erősítő', en: 'non-inverting amplifier', topic: 'opa',
        short: 'A jelet a nem invertáló bemenetre kapcsoló OPA-kapcsolás; erősítése 1 + R_f/R_1, fázist nem fordít, bemeneti ellenállása igen nagy.',
        prereq: ['elektronika/negativ-visszacsatolas', 'villamosmernoki/thevenin'],
        visual: nonSvg, caption: 'Balra a neminvertáló erősítő, jobbra határesete, a feszültségkövető.',
        text: 'A kimenet R_f–R_1 feszültségosztóján át jut vissza az invertáló bemenetre: `U− = U_ki·R_1/(R_1 + R_f)`. Mivel U− = U+ = U_be:\n\n`U_ki = (1 + R_f/R_1)·U_be`.\n\nElőnyei az invertálóval szemben: a jelforrás egy OPA-bemenetet lát, ezért a **bemeneti ellenállás gyakorlatilag végtelen** (MΩ–TΩ), és nincs fázisfordítás. Hátránya, hogy 1-nél kisebb erősítés nem állítható be, és a bemeneteken a teljes **közös módusú** jel megjelenik, aminek az OPA megengedett bemeneti tartományán belül kell maradnia.',
        formulas: ['neminvertalo-erosites'],
        example: 'Hőelem jele 0–40 mV, az A/D átalakító bemeneti tartománya 0–4 V → 100-szoros erősítés kell. R_1 = 1 kΩ, R_f = 99 kΩ (vagy 100 kΩ, ekkor 101): `U_ki = 100 · 40 mV = 4 V`.',
        pitfall: 'A neminvertáló erősítő erősítése R_f/R_1 + 1, nem R_f/R_1. Gyakori hiba 10-szeres erősítéshez R_f = 10·R_1-et választani (ez 11-szeres).',
        related: ['invertalo', 'feszultsegkoveto', 'negativ-visszacsatolas', 'idealis-opa'] },
      { id: 'feszultsegkoveto', term: 'Feszültségkövető (puffer)', en: 'voltage follower, unity-gain buffer', topic: 'opa',
        short: 'Egységnyi erősítésű OPA-kapcsolás (kimenet közvetlenül az invertáló bemenetre kötve), amely nagy bemeneti és kis kimeneti ellenállásával illeszt.',
        prereq: ['elektronika/neminvertalo', 'villamosmernoki/thevenin'],
        text: 'A neminvertáló erősítő határesete (R_f = 0, R_1 = ∞): `U_ki = U_be`. Feszültséget nem erősít, de **áramot és teljesítményt** igen: a forrást gyakorlatilag nem terheli, a kimenet pedig a terhelés változásától függetlenül tartja a feszültséget.\n\nTipikus felhasználás: nagy belső ellenállású érzékelő vagy osztó leválasztása (pl. A/D bemenet elé), referenciafeszültség puffere, aktív szűrők fokozatainak elválasztása.\n\nA hurokerősítés itt a legnagyobb (β = 1), ezért ez a **stabilitás szempontjából legkényesebb** konfiguráció: csak egységnyi erősítésre stabil (unity-gain stable) OPA használható, és nagy kapacitív terhelés begerjesztheti.',
        example: '100 kΩ belső ellenállású érzékelő 1 kΩ-os terhelésre közvetlenül csak `1/(100 + 1) ≈ 1%` feszültséget adna át. Feszültségkövetővel közbeiktatva a teljes feszültség megjelenik a terhelésen (az OPA kimeneti áram-határáig).',
        pitfall: 'A kimenet nem mehet túl a táp határain, és nem rail-to-rail OPA-nál a bemenet sem: egy 0–5 V-os jelet 5 V-os tápról sima OPA-val nem lehet hibátlanul követni.',
        related: ['neminvertalo', 'idealis-opa', 'negativ-visszacsatolas', 'rc-szuro'] },
      { id: 'osszegzo', term: 'Összegző erősítő', en: 'summing amplifier', topic: 'opa',
        short: 'Több bemeneti ellenállással bővített invertáló erősítő, amelynek kimenete a bemeneti feszültségek súlyozott összegének ellentettje.',
        prereq: ['elektronika/invertalo', 'villamosmernoki/kirchhoff-1'],
        visual: sumSvg, caption: 'Az invertáló bemenet virtuális föld, ezért a bemeneti áramok egymástól függetlenül adódnak össze.',
        text: 'Mivel az invertáló bemenet virtuális föld, minden bemenet áramát csak a saját feszültsége és ellenállása határozza meg: `I_k = U_k / R_k`. Az áramok a csomópontban összeadódnak (Kirchhoff I.), és együtt folynak R_f-en:\n\n`U_ki = −R_f·(U_1/R_1 + U_2/R_2 + … )`.\n\nEgyforma ellenállásokkal egyszerű összegző, különbözőekkel **súlyozott** összegző. Alkalmazások: hangkeverő pult, egyenfeszültségű eltolás (ofszet) hozzáadása, **bináris súlyozású D/A átalakító** (R, 2R, 4R, 8R ellenállásokkal).',
        example: 'U_1 = 1 V (R_1 = 10 kΩ), U_2 = 0,5 V (R_2 = 20 kΩ), R_f = 20 kΩ: `U_ki = −(20/10 · 1 + 20/20 · 0,5) = −2,5 V`.',
        pitfall: 'A kimenet negatív, ezért egytápos (pl. 0–5 V) rendszerben az invertáló összegzőt egy megemelt „virtuális földre” (pl. U_t/2) kell vonatkoztatni, vagy utána még egy invertálót kell kötni.',
        related: ['invertalo', 'idealis-opa', 'negativ-visszacsatolas'] },
      { id: 'komparator', term: 'Komparátor és Schmitt-trigger', en: 'comparator, Schmitt trigger', topic: 'opa',
        short: 'Visszacsatolás nélküli (vagy pozitívan visszacsatolt) erősítő, amely két feszültséget összehasonlít, és a kimenetét a nagyobb szerint a felső vagy alsó szintre billenti.',
        prereq: ['elektronika/idealis-opa', 'digitalis-technika/bit'],
        visual: cmpSvg, caption: 'Zajos bemenet és a Schmitt-trigger kimenete: két küszöb (±U_H) között a kimenet megtartja az előző állapotát.',
        text: 'Az egyszerű komparátor kimenete: `U_ki = +U_sat`, ha `U+ > U−`, különben `−U_sat`. Ez az **analóg–digitális határ**: így lesz egy érzékelő jeléből logikai szint (pl. alkonykapcsoló, túláramvédelem, PWM-generátor).\n\nZajos, lassan változó bemenetnél a küszöb körül a kimenet sokszor ide-oda billen. A **Schmitt-trigger** ezt **pozitív visszacsatolással** szünteti meg: a kimenet állapotától függően két különböző küszöb érvényes, a köztük lévő sáv a **hiszterézis**.\n\nNeminvertáló Schmitt-triggernél (R_1 a bemenet és a + bemenet között, R_2 a visszacsatoló ág) a küszöbök: `±U_sat·R_1/R_2`.\n\nDedikált komparátor IC-k (pl. LM393) gyorsabbak, és gyakran nyitott kollektoros kimenetük van.',
        example: 'U_sat = ±12 V, R_1 = 10 kΩ, R_2 = 100 kΩ: küszöbök `±12 · 10/100 = ±1,2 V`, a hiszterézis szélessége 2,4 V. Egy ±0,3 V-os zajjal terhelt jel így csak egyszer billenti át a kimenetet.',
        pitfall: 'Műveleti erősítőt komparátornak használni lehet, de nem ideális: telítésből lassan tér vissza, és a bemeneti fokozata nagy differenciális feszültséget nem mindig visel el. Komparátort pedig erősítőnek nem lehet használni (nincs frekvenciakompenzálva).',
        related: ['idealis-opa', 'negativ-visszacsatolas', 'mosfet-kapcsolo'] },

      /* ----- Szűrők és tápegységek ----- */
      { id: 'rc-szuro', term: 'RC alul- és felüláteresztő szűrő', en: 'RC low-pass and high-pass filter', topic: 'szuro',
        short: 'Egy ellenállásból és egy kondenzátorból álló elsőrendű szűrő, amely a törésponti frekvencia alatti (aluláteresztő) vagy feletti (felüláteresztő) jeleket engedi át.',
        prereq: ['villamosmernoki/reaktancia', 'villamosmernoki/impedancia', 'villamosmernoki/fazor'],
        visual: rcSvg, caption: 'Ugyanaz a két alkatrész kétféleképpen: a kimenetet a kondenzátorról (balra) vagy az ellenállásról (jobbra) vesszük le.',
        text: 'A kondenzátor reaktanciája `X_C = 1/(2π·f·C)` frekvenciafüggő: alacsony frekvencián szakadás, magas frekvencián rövidzár. Az R–C feszültségosztó ezért frekvenciafüggő átvitelt ad:\n\n- **Aluláteresztő** (kimenet a C-n): `H(jω) = 1/(1 + jωRC)` – zajszűrés, A/D átalakító előtti **antialiasing** szűrő, PWM-jel átlagolása.\n- **Felüláteresztő** (kimenet az R-en): `H(jω) = jωRC/(1 + jωRC)` – egyenáramú összetevő leválasztása (csatolókondenzátor), brummszűrés.\n\nIdőtartományban az aluláteresztő **integráló** jellegű (ugrásválasza `1 − e^(−t/τ)`), a felüláteresztő **differenciáló** jellegű. Meredekebb levágáshoz több fokozat vagy aktív (OPA-s) szűrő kell, pl. Sallen–Key.',
        formulas: ['torespont'],
        example: 'PWM-jel (20 kHz) átlagolása RC aluláteresztővel, f_c = 200 Hz: R = 8,2 kΩ esetén `C = 1/(2π · 8200 · 200) ≈ 97 nF` → 100 nF. A 20 kHz-es összetevő kb. `20000/200 = 100`-adára (−40 dB) csillapodik.',
        pitfall: 'A passzív RC szűrő kimenetét a következő fokozat bemeneti ellenállása terheli, ami eltolja a töréspontot. Két passzív RC tagot sorba kötve sem kapunk két független elsőrendű szűrőt: közéjük puffer (feszültségkövető) kell.',
        related: ['torespont', 'bode', 'feszultsegkoveto', 'szurokondenzator', 'kozos-emitteres'] },
      { id: 'torespont', term: 'Törésponti frekvencia', en: 'cutoff frequency, corner frequency (−3 dB)', topic: 'szuro',
        short: 'Az a frekvencia, ahol a szűrő átvitele az áteresztő tartományhoz képest 1/√2-re (−3 dB-re) csökken; RC-tagnál f_c = 1/(2πRC).',
        prereq: ['elektronika/rc-szuro', 'analizis/exponencialis-novekedes'],
        text: 'A törésponton az RC-tagban `X_C = R`: az ellenállás és a reaktancia egyenlő, ezért\n\n- az amplitúdó `1/√2 ≈ 0,707`-szeres (**−3 dB**);\n- a teljesítmény a felére esik (**félteljesítményű pont**);\n- a fázistolás **−45°** (aluláteresztő) vagy **+45°** (felüláteresztő).\n\nKapcsolat az időállandóval: `τ = R·C = 1/(2π·f_c)`. Ugrásválasznál a kimenet egy τ alatt a végérték 63%-át, 5τ alatt gyakorlatilag (99,3%) a végértéket éri el.\n\nAz erősítők **sávszélessége** is a −3 dB-es pontok közti tartomány; a csatolókondenzátorok alsó, a tranzisztorkapacitások felső határfrekvenciát okoznak.',
        formulas: ['torespont'],
        example: 'R = 10 kΩ, C = 10 nF: `τ = 100 µs`, `f_c = 1/(2π · 10⁻⁴) ≈ 1592 Hz`. Ugrásra a kimenet `5τ = 0,5 ms` alatt áll be.',
        pitfall: 'A ω körfrekvencia és az f frekvencia 2π-ben különbözik: `ω_c = 1/(RC)`, de `f_c = 1/(2πRC)`. A kettő összekeverése 6,28-szoros hibát okoz.',
        related: ['rc-szuro', 'bode'] },
      { id: 'bode', term: 'Bode-diagram', en: 'Bode plot', topic: 'szuro',
        short: 'Az átviteli függvény amplitúdóját (dB-ben) és fázisát a frekvencia logaritmusa függvényében ábrázoló diagrampár.',
        prereq: ['elektronika/torespont', 'villamosmernoki/fazor'],
        visual: bodeSvg, caption: 'Elsőrendű aluláteresztő Bode-diagramja. Szaggatott: aszimptotikus közelítés (vízszintes, majd −20 dB/dekád).',
        text: 'A decibel: `A_dB = 20·lg|H|`. A logaritmikus skálák miatt a sorba kapcsolt fokozatok **dB-ben összeadódnak**, és a görbék egyenes szakaszokkal (**aszimptotákkal**) jól közelíthetők:\n\n- egy pólus (pl. RC aluláteresztő) a töréspont után **−20 dB/dekád** (−6 dB/oktáv) meredekséget és összesen −90° fázist ad;\n- egy zérus +20 dB/dekádot és +90°-ot;\n- az aszimptotás közelítés legnagyobb hibája a törésponton 3 dB.\n\nHasznos értékek: −3 dB ≈ 0,707×, −6 dB ≈ 0,5×, −20 dB = 0,1×, −40 dB = 0,01×.\n\nA Bode-diagramról olvasható le a visszacsatolt rendszerek **stabilitása** is: a **fázistartalék** az a szög, amennyivel a fázis a 0 dB-es hurokerősítésnél −180° felett van.',
        formulas: ['torespont'],
        example: 'f_c = 1 kHz-es aluláteresztő 100 kHz-en: két dekád a töréspont felett, `−40 dB`, azaz `1/100`-as amplitúdó. 10 kHz-en a pontos fázis `−arctg 10 ≈ −84,3°`.',
        pitfall: 'A teljesítményarányok decibelje `10·lg(P_2/P_1)`, a feszültség- és áramarányoké `20·lg(U_2/U_1)`. Kétszeres feszültség +6 dB, kétszeres teljesítmény +3 dB.',
        related: ['torespont', 'rc-szuro', 'negativ-visszacsatolas'] },
      { id: 'linearis-stabilizator', term: 'Lineáris feszültségstabilizátor', en: 'linear voltage regulator (LDO)', topic: 'szuro',
        short: 'Szabályozott soros tranzisztorral a felesleges feszültséget hővé alakítva állandó kimeneti feszültséget adó tápegység-áramkör (pl. 78xx, LDO).',
        prereq: ['elektronika/zener-dioda', 'elektronika/negativ-visszacsatolas', 'elektronika/szurokondenzator'],
        visual: linSvg, caption: '7805 típusú stabilizátor: 12 V-ról 5 V-ot előállítva a bemenő teljesítmény 58%-a hővé válik.',
        text: 'Felépítése: **referenciafeszültség** (Zener- vagy band-gap referencia), **hibaerősítő**, és a terhelőárammal sorban álló **áteresztő tranzisztor**. A hibaerősítő negatív visszacsatolással addig vezérli a tranzisztort, amíg a leosztott kimenet egyenlő a referenciával.\n\nElőnyei: **zajmentes**, nincs kapcsolási zavar, kiváló hullámosság-elnyomás (PSRR), olcsó, kevés alkatrész. Hátránya a **hatásfok**: legfeljebb `U_ki/U_be`.\n\nA **dropout feszültség** az a legkisebb `U_be − U_ki`, amelynél még szabályoz: a klasszikus 78xx sorozatnál kb. 2 V, az **LDO** (low-dropout) típusoknál 0,1–0,3 V.\n\nKis áramú, zajérzékeny (analóg, RF) részek táplálására, illetve kapcsolóüzemű táp után „utószűrőnek” ideális.',
        formulas: ['linearis-veszteseg'],
        example: '7805: 12 V → 5 V, 0,5 A. `P_v = (12 − 5) · 0,5 = 3,5 W`, `η ≈ 42%`. 50 °C/W hőellenállású TO-220 tokon hűtőborda nélkül a melegedés `3,5 · 50 = 175 °C` lenne – hűtőborda vagy kapcsolóüzemű táp kell.',
        pitfall: 'Az LDO-k egy része csak bizonyos **kimeneti kondenzátorral** (adott ESR-tartományban) stabil; kerámiakondenzátorral (túl kicsi ESR) a régebbi típusok begerjedhetnek. Mindig az adatlap szerinti kondenzátort kell használni.',
        related: ['zener-dioda', 'kapcsolouzemu-tap', 'szurokondenzator', 'egyeniranyito', 'negativ-visszacsatolas'] },
      { id: 'kapcsolouzemu-tap', term: 'Kapcsolóüzemű tápegység (buck, boost)', en: 'switched-mode power supply, buck and boost converter', topic: 'szuro',
        short: 'Tranzisztort nagy frekvencián kapcsolgató, tekercsben és kondenzátorban energiát tároló átalakító, amely nagy (80–95%) hatásfokkal csökkenti vagy növeli a feszültséget.',
        prereq: ['elektronika/mosfet-kapcsolo', 'fizika-bsc/faraday-indukcio', 'e-mobilitas/pwm'],
        visual: buckSvg, caption: 'Buck (feszültségcsökkentő) konverter. A kapcsolócsomópont négyszögjelet ad, a tekercs árama háromszög alakú; az LC szűrő a kitöltési tényezőnek megfelelő átlagot adja ki.',
        text: 'A lineáris stabilizátorral szemben a kapcsoló vagy teljesen be-, vagy teljesen kikapcsolt állapotban van, így (ideálisan) nem disszipál. Az energiát a **tekercs** tárolja és adja át, a kimenetet **PWM kitöltési tényező** (D) szabályozza visszacsatolással.\n\n- **Buck** (feszültségcsökkentő, step-down): `U_ki = D·U_be`. Bekapcsoláskor a tekercs a bemenetről töltődik, kikapcsoláskor a dióda (vagy egy második MOSFET – **szinkron egyenirányítás**) vezeti tovább az áramát.\n- **Boost** (feszültségnövelő, step-up): `U_ki = U_be/(1 − D)`. A tekercs feszültsége a bemenetéhez adódik.\n- **Buck-boost**, **flyback** (transzformátoros, galvanikus leválasztással), **SEPIC** stb.\n\nKapcsolási frekvencia 100 kHz – néhány MHz: minél nagyobb, annál kisebb L és C kell, de annál nagyobb a kapcsolási veszteség és az elektromágneses zavar (**EMI**).',
        formulas: ['buck', 'boost'],
        example: '12 V → 5 V, 2 A buck konverter, 90% hatásfok: a bemenő áram `5 · 2/(12 · 0,9) ≈ 0,93 A`, a veszteség `10/0,9 − 10 ≈ 1,1 W`. Lineáris stabilizátorral ugyanez 14 W veszteség lenne.',
        pitfall: 'A kapcsolóüzemű táp NYÁK-terve kritikus: a nagy di/dt-jű áramhurkokat (bemeneti kondenzátor – kapcsoló – dióda) a lehető legkisebbre kell rajzolni, különben a táp zavar és instabil lesz. A tekercs telítődése hirtelen áramcsúcsot okoz.',
        related: ['linearis-stabilizator', 'mosfet-kapcsolo', 'kapcsolasi-veszteseg', 'h-hid', 'szurokondenzator', 'egyeniranyito'],
        models: ['napelempanel', 'alaplap'] },
      /* ---------- Bővítés: erősítőkapcsolások, valós műveleti erősítő, jelfeldolgozás ---------- */
      { id: 'emitterkoveto', term: 'Emitterkövető (közös kollektoros kapcsolás)', en: 'emitter follower (common collector)', topic: 'bjt', prereq: ['elektronika/bjt', 'elektronika/munkapont', 'villamosmernoki/thevenin'],
        short: 'Bipoláris tranzisztoros alapkapcsolás, amelyben a kimenet az emitterről van levéve: feszültségerősítése közel 1, bemeneti ellenállása nagy, kimeneti ellenállása kicsi – áramerősítő és impedanciaillesztő fokozat.',
        text: 'A bázisra adott jelet az emitter `U_BE ≈ 0,6–0,7 V`-tal lejjebb „követi”: `u_E ≈ u_B − U_BE`. A kis jelű feszültségerősítés\n\n`A_u = R_E / (R_E + r_e) ≈ 1`, ahol `r_e = U_T / I_E ≈ 26 mV / I_E` (szobahőmérsékleten).\n\n**Bemeneti ellenállás:** az emitterellenálláson a báziséram (β + 1)-szerese folyik, ezért a bázis felől nézve az emitterköri ellenállás felnagyítva látszik: `R_be ≈ (β + 1) · (r_e + R_E)` (ezzel párhuzamosan a báziskör ellenállásai).\n\n**Kimeneti ellenállás:** a meghajtó forrás R_g belső ellenállása a (β + 1)-gyel osztva látszik az emitter felől: `R_ki ≈ r_e + R_g / (β + 1)` (párhuzamosan R_E-vel).\n\nVagyis a kapcsolás feszültséget nem, de áramot és teljesítményt erősít, és „átalakítja” a nagy belső ellenállású forrást kis belső ellenállásúvá. Tipikus helye: erősítők kimeneti fokozata, nagy impedanciájú érzékelő után puffer, lineáris stabilizátor áteresztő tranzisztora (a Zener-diódára kötött emitterkövető).\n\n**Darlington-kapcsolás:** két emitterkövető egymás után, az eredő áramerősítés `≈ β_1 · β_2`, de a bázis–emitter feszültség kétszeres.\n\nA MOSFET megfelelője a **source-követő** (közös drain), ahol a bemeneti áram egyenáramon gyakorlatilag nulla.',
        example: 'I_E = 2 mA → `r_e ≈ 13 Ω`; R_E = 1 kΩ, β = 100: `A_u ≈ 1000/1013 ≈ 0,99`, `R_be ≈ 101 · 1013 Ω ≈ 102 kΩ`. 10 kΩ belső ellenállású forrásról `R_ki ≈ 13 + 10 000/101 ≈ 112 Ω`.',
        pitfall: 'A kimenet a negatív félhullámban nem tud tetszőleges áramot nyelni: kapacitív vagy kis ellenállású terhelésnél, ha az emitteráram nullára csökken, a tranzisztor lezár, és a kimenet levágja a jelet. A kapacitív terhelés ráadásul gerjedést is okozhat.',
        related: ['bjt', 'kozos-emitteres', 'feszultsegkoveto', 'linearis-stabilizator', 'erosito-osztalyok'], tags: ['tranzisztoros kapcsolás', 'impedanciaillesztés'] },
      { id: 'aramtukor', term: 'Áramtükör', en: 'current mirror', topic: 'bjt', prereq: ['elektronika/bjt', 'elektronika/aramerosites'],
        short: 'Két egyforma tranzisztorból álló kapcsolás, amely az egyik ágban beállított referenciaáramot a másik ágba „lemásolja”, a terhelés feszültségétől közel függetlenül.',
        text: 'Az alapkapcsolásban T1 diódaként van bekötve (bázis és kollektor összekötve), T2 bázisa T1 bázisára kapcsolódik. A két tranzisztor U_BE feszültsége így azonos. Mivel a kollektoráram exponenciálisan függ U_BE-től (`I_C = I_S · e^(U_BE/U_T)`), azonos felépítésű és hőmérsékletű tranzisztoroknál **a kollektoráramok is azonosak**.\n\nA két bázisáram a referenciaágból fogy, ezért a pontos arány:\n\n`I_ki = I_ref · β / (β + 2)`,\n\nami β = 100 esetén ≈ 2% hiba. Javítások:\n\n- **bázisáram-kompenzáció** egy harmadik tranzisztorral (hiba ≈ 2/β²);\n- **Wilson- és kaszkód áramtükör**: a kimeneti ellenállás többszörösére nő;\n- **emitterellenállások** (degeneráció): csökkentik a tranzisztorok eltérésének hatását;\n- **arány**: eltérő emitterfelületű (vagy MOSFET-nél eltérő W/L arányú) tranzisztorokkal a kimeneti áram a referencia többszöröse vagy tört része.\n\nA valós áramtükör kimeneti ellenállása véges: a **Early-hatás** miatt a kollektoráram kissé nő a kollektor–emitter feszültséggel; `r_ki ≈ U_A / I_ki`, ahol U_A az Early-feszültség.\n\nAz áramtükör az integrált áramkörök alapeleme: munkaponti áramok beállítása, differenciálerősítők aktív terhelése, áramgenerátorok, D/A-átalakítók. Diszkrét áramkörben csak egy tokban lévő, illesztett tranzisztorpárral működik jól, mert a két tranzisztornak azonos hőmérsékletűnek kell lennie.',
        example: 'I_ref-et egy 12 V-ról táplált ellenállás állítja be: `I_ref = (12 − 0,65) / 11,3 kΩ ≈ 1 mA`. β = 100 mellett `I_ki ≈ 1 · 100/102 ≈ 0,98 mA`, bármely terhelésen, amíg T2 aktív tartományban marad. U_A = 100 V esetén `r_ki ≈ 100 kΩ`.',
        pitfall: 'Az U_BE hőmérsékleti együtthatója kb. −2 mV/K: ha a két tranzisztor hőmérséklete néhány fokkal eltér, az áramarány már jelentősen elcsúszik. A kimeneti tranzisztornak aktív tartományban kell maradnia, telítésben a tükrözés megszűnik.',
        related: ['bjt', 'aramerosites', 'differencialerosito', 'munkapont', 'da-atalakito'], tags: ['integrált áramkör', 'áramforrás'] },
      { id: 'erosito-osztalyok', term: 'Teljesítményerősítő-osztályok (A, B, AB, D)', en: 'power amplifier classes', topic: 'bjt', prereq: ['elektronika/emitterkoveto', 'e-mobilitas/hatasfok'],
        short: 'A teljesítményerősítőket aszerint osztályozzuk, hogy a jelperiódus mekkora részében vezetnek a kimeneti tranzisztorok; ez határozza meg a hatásfokot és a torzítást.',
        text: '- **A osztály:** a tranzisztor a teljes periódusban (360°) vezet, a munkapont a karakterisztika közepén van. Nagyon lineáris, de nyugalmi állapotban is folyik a teljes munkaponti áram. Elméleti maximális hatásfok ohmos terheléssel 25%, induktív (transzformátoros) csatolással 50%.\n- **B osztály:** két komplementer tranzisztor (ellenütemű, push-pull) felváltva vezet, mindegyik egy-egy félperiódusban (180°). Jel nélkül nincs áram. Elméleti maximális hatásfok `π/4 ≈ 78,5%`. Hátránya a **keresztezési (átvételi) torzítás**: a nullátmenet körül, amíg egyik tranzisztor U_BE-je sem éri el a nyitófeszültséget, a kimenet „lépcsős”.\n- **AB osztály:** kis előfeszítéssel (két dióda vagy U_BE-sokszorozó) mindkét tranzisztor kicsit vezet a nullátmenetnél, így eltűnik a keresztezési torzítás, a hatásfok alig rosszabb a B-nél. A legelterjedtebb lineáris hangfrekvenciás végfok.\n- **C osztály:** 180°-nál rövidebb vezetés, erős torzítás; csak hangolt (rezgőkörös) rádiófrekvenciás adókban használható.\n- **D osztály:** a tranzisztorok **kapcsolóként** működnek, a jelet impulzusszélesség-modulációval (PWM) kódolják, majd LC aluláteresztő szűrő állítja vissza. Mivel a kapcsoló vagy teljesen nyitott, vagy teljesen zárt, a veszteség kicsi, a hatásfok gyakran 90% fölötti.\n\nA hatásfok nemcsak energetikai kérdés: a disszipált hő határozza meg a hűtőborda méretét. A B és AB osztály elméleti hatásfoka csak teljes kivezérlésnél érvényes; kis jelszinten sokkal rosszabb.',
        example: 'Egy 50 W kimenő teljesítményű erősítő disszipációja 78%-os hatásfoknál `50/0,78 − 50 ≈ 14 W`, A osztályban (25%) `200 − 50 = 150 W`, D osztályban (92%) ≈ 4,3 W.',
        pitfall: 'AB osztályban a nyugalmi áramot hőkompenzálni kell (a hűtőbordára szerelt érzékelő tranzisztorral): a melegedő tranzisztor U_BE-je csökken, a nyugalmi áram nő, ami további melegedést okoz – **termikus megfutás**.',
        related: ['emitterkoveto', 'mosfet-kapcsolo', 'h-hid', 'kapcsolasi-veszteseg'], tags: ['hatásfok', 'végfok'] },

      { id: 'integralo-differencialo', term: 'Integráló és differenciáló kapcsolás', en: 'op-amp integrator and differentiator', topic: 'opa', prereq: ['elektronika/invertalo', 'villamosmernoki/energiatarolok', 'analizis/riemann-integral'],
        short: 'Műveleti erősítős kapcsolások, amelyek kimenete a bemeneti jel időbeli integráljával, illetve deriváltjával arányos: az invertáló erősítő egyik ellenállását kondenzátorra cseréljük.',
        text: '**Integrátor:** az invertáló erősítő visszacsatoló ellenállása helyett kondenzátor áll. A virtuális föld miatt `i = u_be / R`, ez az áram tölti C-t, így `u_ki = −(1/RC) · ∫ u_be dt`. Négyszögjelből háromszögjelet, állandó feszültségből egyenletesen változó (lineáris) feszültséget állít elő. Frekvenciatartományban `A = −1/(jωRC)`: aluláteresztő jellegű, −20 dB/dekád.\n\nA gyakorlati gond: egyenáramon a kondenzátor szakadás, a nyílt hurkú erősítés érvényesül, így a legkisebb bemeneti offset is a tápfeszültségig integrálódik (telítés). Megoldás: a kondenzátorral **párhuzamos nagy ellenállás** (R_p), amely az egyenáramú erősítést −R_p/R-re korlátozza – ez már egy aluláteresztő szűrő, amely `f > 1/(2πR_pC)` fölött integrál. Pontos integrátornál időnként nullázó kapcsoló süti ki C-t.\n\n**Differenciáló:** a bemeneti ellenállás helyére kerül a kondenzátor: `u_ki = −R · C · du_be/dt`. Az erősítés a frekvenciával nő (+20 dB/dekád), ezért a nagyfrekvenciás zajt felerősíti, és a műveleti erősítő fázistolásával együtt hajlamos a gerjedésre. Gyakorlatban a kondenzátorral **soros ellenállás** és a visszacsatoló ellenállással párhuzamos kis kondenzátor korlátozza a nagyfrekvenciás erősítést.\n\nAlkalmazás: analóg számítógépek (differenciálegyenletek megoldása), PID-szabályozók I- és D-tagja, függvénygenerátorok, töltésmérés, ADC-k (kettős meredekségű és szigma-delta átalakító).',
        formulas: ['integralo'],
        example: 'Differenciáló: R = 10 kΩ, C = 100 nF (RC = 1 ms). 1 V amplitúdójú, 100 Hz-es háromszögjel meredeksége `±2 V / 5 ms = ±400 V/s`, a kimeneten `∓0,4 V`-os négyszögjel jelenik meg.',
        pitfall: 'Az integrátor offset miatti „elmászása” nem hiba a kapcsolásban, hanem az integrálás természetes következménye: a bemeneti hibafeszültség is integrálódik. A differenciálót ideális alakjában szinte soha nem lehet stabilan megépíteni.',
        related: ['invertalo', 'idealis-opa', 'valos-opa', 'aktiv-szuro', 'rc-szuro'], tags: ['analóg számítás', 'műveleti erősítő'] },
      { id: 'differencialerosito', term: 'Különbségi erősítő és közös módusú elnyomás (CMRR)', en: 'difference amplifier and common-mode rejection ratio', topic: 'opa', prereq: ['elektronika/invertalo', 'elektronika/neminvertalo', 'villamosmernoki/szuperpozicio'],
        short: 'Olyan erősítő, amely két bemenet feszültségének különbségét erősíti, a mindkét bemeneten azonosan megjelenő (közös módusú) feszültséget pedig elnyomja.',
        text: 'Egy bemeneti jelpár felbontható **különbségi** (`u_d = u_2 − u_1`) és **közös módusú** (`u_k = (u_1 + u_2)/2`) összetevőre. A hasznos jel általában a különbségben van (híd­kapcsolású érzékelő, söntellenállás, hosszú kábel két ere), a zavar viszont – például a hálózati brumm vagy a földpotenciál-eltérés – mindkét vezetéken azonos.\n\n**Négyellenállásos kapcsolás:** egy műveleti erősítő, a negatív bemenetén R_1 és R_2 (invertáló ág), a pozitív bemenetén R_1 és R_2 osztó. Szuperpozícióval: ha az arányok pontosan egyeznek, `u_ki = (R_2/R_1) · (u_2 − u_1)`.\n\nA közös módusú elnyomás mérőszáma:\n\n`CMRR = 20 · lg(A_d / A_k)` dB,\n\nahol A_d a különbségi, A_k a közös módusú erősítés. Az ellenállások eltérése rontja: 1%-os tűréssel és egységnyi erősítéssel csak ≈ 34 dB érhető el, ezért precíziós, illesztett ellenálláshálózatot használnak.\n\n**Műszererősítő** (instrumentation amplifier): két neminvertáló bemeneti fokozat + egy különbségi erősítő. Előnyei: nagyon nagy bemeneti ellenállás mindkét bemeneten, az erősítés egyetlen ellenállással (R_G) állítható: `G = (1 + 2R/R_G) · (R_2/R_1)`, és a CMRR nagy erősítésnél tovább javul. Ez a mérlegek, nyúlásmérő bélyegek, orvosi (EKG) erősítők alapkapcsolása.\n\nA tranzisztoros **differenciálerősítő** (hosszúfarkú pár: két emittercsatolt tranzisztor áramgenerátorral) minden műveleti erősítő bemeneti fokozata.',
        example: 'Wheatstone-híd 5 V tápról, 1 mV különbségi jel 2,5 V közös módusú feszültségen. 80 dB CMRR-rel és 100-as erősítéssel: hasznos kimenet 100 mV; a közös módusú jelből `2,5 V · 100 / 10 000 = 25 mV` hibajel adódik.',
        pitfall: 'A négyellenállásos különbségi erősítő bemeneti ellenállása kicsi és a két bemeneten különböző, ezért nagy belső ellenállású forrás (érzékelő) esetén maga a forrás rontja el az illesztést és a CMRR-t – ilyenkor műszererősítő kell.',
        related: ['invertalo', 'neminvertalo', 'valos-opa', 'aramtukor', 'zaj'], tags: ['mérőerősítő', 'zavarelnyomás'] },
      { id: 'valos-opa', term: 'Valós műveleti erősítő korlátai', en: 'non-ideal op-amp parameters', topic: 'opa', prereq: ['elektronika/idealis-opa', 'elektronika/bode', 'elektronika/negativ-visszacsatolas'],
        short: 'A valós műveleti erősítő erősítése véges és frekvenciafüggő, kimenete véges sebességgel változik, bemenetei offsetfeszültséggel és bázisárammal terheltek – ezek határozzák meg a kapcsolások pontosságát és sávszélességét.',
        text: 'A legfontosabb eltérések az ideálistól:\n\n- **Erősítés–sávszélesség szorzat (GBW):** a belső kompenzáció miatt a nyílt hurkú erősítés már néhány Hz-től −20 dB/dekáddal csökken, így az erősítés és a frekvencia szorzata állandó. Visszacsatolt erősítőnél a határfrekvencia `f_h ≈ GBW / G_zaj`, ahol `G_zaj = 1 + R_2/R_1` (a „zajerősítés”, neminvertáló erősítésnek felel meg – invertáló kapcsolásban is ez számít).\n- **Jelváltozási sebesség (slew rate, SR):** a kimenet legfeljebb SR (V/µs) meredekséggel változhat. Û amplitúdójú szinusz torzítatlan átviteléhez `2π · f · Û ≤ SR`. Ez nagy jelnél a GBW-nél szigorúbb korlát lehet (teljesítmény-sávszélesség).\n- **Bemeneti offsetfeszültség (U_off):** a kimenet nullázásához szükséges bemeneti különbség; a kimeneten a zajerősítéssel szorozva jelenik meg. Hőmérsékletfüggő (drift).\n- **Bemeneti nyugalmi áram (I_B) és offsetáram:** a bemeneti ellenállásokon feszültséget ejt; bipoláris bemenetnél nA, FET-bemenetnél pA nagyságrendű. Kiegyenlítés: azonos ellenállás mindkét bemenet felé.\n- **Kimeneti feszültségtartomány:** a kimenet nem éri el a tápfeszültséget (kivéve a „rail-to-rail” típusokat); a kimeneti áram korlátozott.\n- **CMRR, PSRR:** a közös módusú, illetve a tápfeszültség-ingadozás elnyomása véges és a frekvenciával romlik.\n- **Zaj:** bemeneti zajfeszültség- és zajáram-sűrűség.\n\nA kiválasztás mindig kompromisszum: a gyors erősítő zajosabb vagy többet fogyaszt, a precíziós (kis offsetű) lassabb.',
        example: 'GBW = 1 MHz, SR = 0,5 V/µs. 20-szoros neminvertáló erősítőként `f_h ≈ 50 kHz`. 10 V csúcsértékű kimenetnél a slew rate korlátja `f ≤ 0,5 · 10⁶ / (2π · 10) ≈ 8 kHz` – nagy jelnél tehát ez a szűkebb. U_off = 2 mV a kimeneten `20 · 2 = 40 mV` hibát okoz.',
        pitfall: 'A „GBW / erősítés” szabály a −3 dB-es pontot adja: ott az erősítés már 30%-kal kisebb. Ha 1%-os pontosság kell, a jel frekvenciájának a határfrekvencia töredékének (kb. hetedének) kell lennie. Kapacitív terhelés a kimeneten fázistartalék-csökkenést és gerjedést okozhat.',
        related: ['idealis-opa', 'negativ-visszacsatolas', 'hurokerosites', 'bode', 'integralo-differencialo', 'differencialerosito'], tags: ['műveleti erősítő', 'adatlap'] },
      { id: 'hurokerosites', term: 'Hurokerősítés és a visszacsatolás hatásai', en: 'loop gain and effects of feedback', topic: 'opa', prereq: ['elektronika/negativ-visszacsatolas', 'szabalyozas/visszacsatolas'],
        short: 'A visszacsatolt kör körbejárásakor kapott A · β erősítés; ennek nagysága határozza meg, mennyire csökkenti a negatív visszacsatolás az erősítés bizonytalanságát, a torzítást és a zajt, és mennyire változtatja meg a be- és kimeneti ellenállást.',
        text: 'Harold Black (1927) felismerése szerint egy pontatlan, nagy erősítésű erősítőből pontos erősítő építhető: `A_f = A / (1 + Aβ)`. Ha a **hurokerősítés** `T = Aβ ≫ 1`, `A_f ≈ 1/β`. A visszacsatolás „árat” kér – erősítést –, cserébe:\n\n1. **Érzékenységcsökkentés:** `(dA_f/A_f) = (1/(1 + T)) · (dA/A)`. Az erősítő paramétereinek szórása, öregedése, hőfüggése (1 + T)-szer kevésbé számít.\n2. **Torzításcsökkentés:** a kimeneten keletkező torzítás és zavar szintén (1 + T)-szeresen csökken.\n3. **Sávszélesség-növelés:** egypólusú erősítőnél a határfrekvencia (1 + T)-szeresére nő, az erősítés–sávszélesség szorzat állandó.\n4. **Impedanciaváltozás** a topológiától függően: soros bemeneti visszacsatolás (a visszacsatolt jel feszültségként vonódik ki) a bemeneti ellenállást (1 + T)-szeresére **növeli**, párhuzamos **csökkenti**; feszültségmintavétel a kimeneten a kimeneti ellenállást **csökkenti**, árammintavétel **növeli**. A neminvertáló erősítő soros-feszültség (bemenete nagyon nagy, kimenete nagyon kicsi impedanciájú), az invertáló párhuzamos-feszültség visszacsatolású.\n\n**Ára:** a hurokban lévő fázistolás miatt a negatív visszacsatolás nagy frekvencián pozitívvá válhat. Ha ott |T| ≥ 1, a kör gerjed. A stabilitást a hurokerősítés Bode-diagramján a **fázistartalék** jellemzi – pontosan ugyanaz a kérdés, mint a szabályozástechnikában. A műveleti erősítők belső kompenzációja ezért teszi egypólusúvá a nyílt hurkú átvitelt.\n\nA hurokerősítés mérése: a hurkot egy alkalmas ponton felbontva (vagy kis jelet injektálva) körbemérjük az átvitelt.',
        formulas: ['hurokerosites'],
        example: 'Egy erősítő nyílt hurkú torzítása 10%, A = 1000. β = 0,1 visszacsatolással `T = 100`, az erősítés `1000/101 ≈ 9,9`, a torzítás `10% / 101 ≈ 0,1%`. A bemeneti ellenállás (soros visszacsatolásnál) 101-szeresére nő.',
        pitfall: 'A visszacsatolás csak a hurkon **belül** keletkező hibákat csökkenti: a visszacsatoló hálózat (β) pontatlansága és a bemenetre érkező zaj teljes mértékben megjelenik a kimeneten.',
        related: ['negativ-visszacsatolas', 'valos-opa', 'neminvertalo', 'invertalo', 'oszcillator', 'bode'], tags: ['visszacsatolás', 'stabilitás'] },

      { id: 'aktiv-szuro', term: 'Aktív szűrők (Butterworth, Csebisev, Bessel)', en: 'active filters', topic: 'szuro', prereq: ['elektronika/rc-szuro', 'elektronika/torespont', 'elektronika/feszultsegkoveto'],
        short: 'Műveleti erősítőből és RC-elemekből felépített szűrők, amelyek tekercs nélkül valósítanak meg meredek, előírt alakú frekvenciamenetet; a jellegüket a pólusok elhelyezése (Butterworth, Csebisev, Bessel) határozza meg.',
        text: 'Egy passzív RC-tag csak −20 dB/dekád meredekséget ad, és több tag egymás után kötve terheli egymást. Az aktív szűrő a műveleti erősítővel **leválasztja** a fokozatokat, és visszacsatolással komplex pólusokat hoz létre, amilyeneket egyébként csak LC-körrel lehetne. Az n-edrendű szűrő levágási meredeksége `−20 · n dB/dekád` (≈ −6n dB/oktáv); a magasabb rendű szűrőt másodrendű (és egy elsőrendű) fokozatokból építik.\n\nA leggyakoribb másodrendű fokozat a **Sallen–Key** kapcsolás (feszültségkövetővel): aluláteresztőnél `f_0 = 1 / (2π · √(R_1 · R_2 · C_1 · C_2))`, egyenlő ellenállásoknál a jósági tényező `Q = ½ · √(C_1/C_2)` (C_1 a kimenetre visszacsatolt, C_2 a földre kötött kondenzátor). A másik elterjedt fokozat a **többszörös visszacsatolású** (MFB) szűrő.\n\nA szűrő **jellegét** a pólusok helye adja – ugyanaz a rend sokféle görbét adhat:\n\n- **Butterworth:** maximálisan sima áteresztő sáv, hullámosság nélkül; másodrendű fokozatnál `Q = 1/√2 ≈ 0,707`. Jó általános választás.\n- **Csebisev:** az áteresztő sávban megengedett hullámosság fejében meredekebb átmenet ugyanakkora rendnél.\n- **Bessel:** közel lineáris fázismenet, vagyis állandó csoportkésleltetés – az impulzusok (négyszögjelek) túllendülés nélkül, alakhűen jutnak át, de az átmenet lankás.\n- **Elliptikus (Cauer):** hullámosság mindkét sávban, a legmeredekebb átmenet.\n\nTipikus alkalmazás: A/D-átalakító előtti **antialiasing** szűrő, hangtechnikai keresztváltó, érzékelőjelek zajszűrése.',
        example: 'Butterworth aluláteresztő, f_0 = 1 kHz, Sallen–Key, R_1 = R_2 = 10 kΩ: Q = 0,707 → `C_1/C_2 = 2`; `√(C_1 · C_2) = 1/(2π · 1000 · 10⁴) ≈ 15,9 nF`, ebből `C_2 ≈ 11,3 nF`, `C_1 ≈ 22,5 nF`. 10 kHz-en a csillapítás ≈ 40 dB.',
        pitfall: 'A műveleti erősítő véges GBW-je a szűrő Q-ját és f_0-ját is elhangolja; nagy Q-jú fokozathoz a szűrő frekvenciájánál sokkal (legalább 10–100-szor) nagyobb GBW kell. A Sallen–Key aluláteresztő nagyon nagy frekvencián „visszaenged”, mert a műveleti erősítő kimeneti ellenállása ott nem elhanyagolható.',
        related: ['rc-szuro', 'torespont', 'bode', 'feszultsegkoveto', 'ad-atalakito', 'integralo-differencialo'], tags: ['szűrő', 'frekvenciamenet'] },

      { id: 'oszcillator', term: 'Oszcillátor és a Barkhausen-feltétel', en: 'oscillator and Barkhausen criterion', topic: 'jel', prereq: ['elektronika/hurokerosites', 'villamosmernoki/rezonancia'],
        short: 'Olyan áramkör, amely bemenő jel nélkül, pozitív visszacsatolással önmaga állít elő periodikus jelet; szinuszos rezgés ott alakul ki, ahol a hurokerősítés abszolút értéke 1, fázisa 0° (360°).',
        text: 'Az oszcillátor egy erősítő és egy frekvenciaszelektív visszacsatoló hálózat. A **Barkhausen-feltétel** állandósult rezgésre:\n\n`|A · β(jω_0)| = 1` és `arg(A · β(jω_0)) = 0° (± k · 360°)`.\n\nA rezgésnek a bekapcsolási zajból kell felépülnie, ezért induláskor a hurokerősítésnek **kicsit nagyobbnak** kell lennie 1-nél; ezután egy nemlinearitás (a kimenet telítődése vagy egy erősítésszabályozó elem) állítja vissza pontosan 1-re. Ha ez nem finom, a szinusz torzul.\n\nFontos típusok:\n\n- **Wien-hidas oszcillátor:** soros és párhuzamos RC-tag; `f_0 = 1/(2πRC)` frekvencián a hálózat fázistolása 0°, átvitele 1/3, tehát az erősítőnek 3-szoros (neminvertáló) erősítés kell. Amplitúdóstabilizálás: izzólámpa, diódák vagy JFET a visszacsatolásban. Hangfrekvenciás, kis torzítású generátor.\n- **RC fázistoló:** invertáló erősítő + három RC-tag, amelyek együtt 180°-ot tolnak. Három azonos, terheletlenül láncolt CR (felüláteresztő) tagnál `f_0 = 1/(2π · √6 · RC)`, a szükséges erősítés 29.\n- **LC oszcillátorok** (Colpitts, Hartley): rezgőkör határozza meg a frekvenciát, rádiófrekvencián.\n- **Kvarcoszcillátor:** a piezoelektromos kvarckristály rendkívül nagy jósági tényezőjű rezonátor (Q akár 10⁴–10⁶), így a frekvencia nagyon pontos és stabil – ez adja a digitális áramkörök órajelét.\n- **Relaxációs oszcillátorok:** komparátor/Schmitt-trigger + RC töltés-kisütés; négyszög- és háromszögjelet adnak (például 555-ös időzítő, multivibrátor).\n\nA pontosság a rezonátor jósági tényezőjén múlik: minél élesebb a fázisgörbe a rezgési frekvenciánál, annál kevésbé tolja el a frekvenciát az erősítő fázistolásának változása.',
        example: 'Wien-hidas oszcillátor R = 10 kΩ, C = 10 nF elemekkel: `f_0 = 1/(2π · 10⁴ · 10⁻⁸) ≈ 1,59 kHz`. Az erősítő: R_f = 2 · R_g (például 20 kΩ és 10 kΩ), az indításhoz R_f kicsit nagyobb, és diódapár korlátozza az amplitúdót.',
        pitfall: 'Nem szándékos oszcillátor bármely erősítőből lehet: ha a hurok fázistolása valamely frekvencián eléri a 180°-ot, és ott a hurokerősítés ≥ 1, az erősítő **gerjed**. A Barkhausen-feltétel szükséges, de önmagában nem elégséges a stabil indulás biztosításához.',
        related: ['hurokerosites', 'komparator', 'rc-szuro', 'aktiv-szuro', 'neminvertalo'], tags: ['jelgenerálás', 'rezgés'] },
      { id: 'zaj', term: 'Elektronikus zaj', en: 'electronic noise', topic: 'jel', prereq: ['villamosmernoki/effektiv-ertek', 'fizika-bsc/belso-energia', 'valszam/normalis-eloszlas'],
        short: 'Az áramkörök fizikai folyamataiból (a töltéshordozók hőmozgásából, diszkrét voltából) eredő véletlenszerű ingadozás, amely a mérhető legkisebb jelet korlátozza.',
        text: 'A zaj nem tervezési hiba, hanem természeti korlát. A főbb fajtái:\n\n- **Termikus (Johnson–Nyquist) zaj:** minden ellenálláson a töltéshordozók hőmozgása miatt `U_n = √(4kTRB)` effektív értékű zajfeszültség jelenik meg (Johnson mérte, Nyquist magyarázta, 1928). Spektruma fehér, amplitúdóeloszlása normális.\n- **Sörétzaj:** az áram diszkrét töltésekből áll, ezért potenciálgáton (p–n átmeneten) átfolyó áram ingadozik: `I_n = √(2qIB)`. Szintén fehér.\n- **1/f (villódzási, flicker) zaj:** teljesítménysűrűsége a frekvenciával fordítottan arányos, alacsony frekvencián dominál; oka főként anyaghibák, felületi csapdák. A határ a fehér zajjal a **töréspont** (corner frequency).\n- **Kvantálási zaj** digitalizáláskor.\n\nA független zajforrások **teljesítményei** adódnak össze, ezért az effektív értékek négyzetösszeg gyökét kell venni.\n\nMérőszámok:\n\n- **jel-zaj viszony:** `SNR = 20 · lg(U_jel / U_zaj)` dB;\n- **zajtényező** (noise figure): mennyivel rontja egy fokozat az SNR-t; több fokozat láncában a **Friis-képlet** szerint az első fokozat zaja a döntő – ezért kerül a kis zajú előerősítő közvetlenül az érzékelő vagy az antenna mellé.\n\nCsökkentés: kisebb sávszélesség (csak a szükséges sávot engedjük át), kisebb forrásellenállás, hűtés (érzékeny mérésekben), kis zajú erősítő, átlagolás (N mérés átlaga √N-szer jobb SNR-t ad). A kívülről becsatolódó **zavar** (brumm, rádióadók) nem zaj ebben az értelemben, és árnyékolással, csavart érpárral, földeléssel kezelendő.',
        formulas: ['termikus-zaj'],
        example: 'Egy mikrofon-előerősítő bemenetén 600 Ω forrásellenállás, 20 kHz sávszélesség, 300 K: `U_n = √(4 · 1,38 · 10⁻²³ · 300 · 600 · 2 · 10⁴) ≈ 0,45 µV`. Ha az erősítő saját zaja 0,6 µV, az eredő `√(0,45² + 0,6²) = 0,75 µV`.',
        pitfall: 'A zajfeszültségeket nem szabad egyszerűen összeadni (0,45 + 0,6 = 1,05 µV hibás); csak korrelálatlan források esetén érvényes a négyzetes összegzés. A nagyobb erősítés önmagában nem javítja az SNR-t, mert a zajt is erősíti.',
        related: ['ad-atalakito', 'valos-opa', 'differencialerosito', 'aktiv-szuro', 'pcb-tervezes'], tags: ['mérés', 'jel-zaj viszony'] },
      { id: 'ad-atalakito', term: 'Analóg–digitális átalakító (ADC)', en: 'analog-to-digital converter', topic: 'jel', prereq: ['szabalyozas/mintavetelezes', 'digitalis-technika/bit', 'elektronika/komparator'],
        short: 'Olyan áramkör, amely egy folytonos feszültséget meghatározott időpontokban mintavételez, és egy referenciafeszültséghez viszonyítva N bites egész számmá alakít.',
        text: 'Az átalakítás két, egymástól független lépés:\n\n1. **Mintavételezés** (időbeli diszkretizálás): a mintavételi tétel szerint a jel csak akkor állítható vissza, ha `f_s > 2 · f_max`. Az ennél nagyobb frekvenciájú összetevők alacsonyabb frekvenciára „tükröződnek” (**aliasing**), és utólag nem választhatók le – ezért az ADC elé **antialiasing aluláteresztő szűrő** kell. A mintavevő–tartó (S/H) áramkör a mintát az átalakítás idejére állandón tartja.\n2. **Kvantálás** (amplitúdó-diszkretizálás): `D = round(U_be / U_ref · 2^N)`. A legkisebb lépés `LSB = U_ref / 2^N`. A kvantálási hiba ±½ LSB, ami zajként jelenik meg: ideális SNR ≈ 6,02 · N + 1,76 dB.\n\n**Architektúrák** (kompromisszum sebesség, felbontás, fogyasztás között):\n\n- **Flash (párhuzamos):** 2^N − 1 komparátor egyszerre – a leggyorsabb, de a komparátorok száma bitenként duplázódik; kis felbontásra (6–8 bit).\n- **Fokozatos közelítés (SAR):** bináris keresés egy belső D/A-átalakítóval és egy komparátorral, N lépésben. Közepes sebesség, 8–18 bit: a mikrovezérlők tipikus ADC-je.\n- **Szigma-delta (ΣΔ):** 1 bites (vagy kevés bites) átalakítás nagyon nagy túlmintavételezéssel; a **zajformálás** a kvantálási zajt a magas frekvenciákra tolja, amit digitális szűrő eltávolít. Nagy felbontás (16–24 bit), kis sávszélesség: hang, mérleg, precíziós mérés.\n- **Integráló (kettős meredekségű):** lassú, de nagyon pontos és zajelnyomó – digitális multiméterek.\n- **Pipeline:** több alacsony felbontású fokozat láncban, nagy sebesség.\n\nValós ADC jellemzői: offset- és erősítéshiba, integrális és differenciális nemlinearitás (INL, DNL), effektív bitszám (ENOB). A referenciafeszültség pontossága közvetlenül az eredmény pontossága.',
        formulas: ['adc-snr'],
        example: '10 bites ADC, U_ref = 5 V: `LSB = 5/1024 ≈ 4,9 mV`. Egy 1,8 V-os bemenetre `D = round(1,8/5 · 1024) = 369`. Ha a jel legfeljebb 1 kHz-es, legalább 2 kHz-cel kell mintavételezni; a gyakorlatban a szűrő véges meredeksége miatt 5–10 kHz-cel.',
        pitfall: 'A bitszám nem egyenlő a pontossággal: egy 16 bites ADC zajos referenciával és rossz NYÁK-kal lehet, hogy csak 11–12 effektív bitet ad. Az aliasing ellen a digitális szűrés nem véd – a szűrőnek a mintavételezés **előtt**, analóg módon kell lennie.',
        related: ['da-atalakito', 'zaj', 'aktiv-szuro', 'komparator', 'pcb-tervezes'], tags: ['jelfeldolgozás', 'mintavételezés'] },
      { id: 'da-atalakito', term: 'Digitális–analóg átalakító (DAC)', en: 'digital-to-analog converter', topic: 'jel', prereq: ['elektronika/osszegzo', 'digitalis-technika/bit', 'villamosmernoki/thevenin'],
        short: 'Olyan áramkör, amely egy N bites számot a referenciafeszültséggel arányos analóg feszültséggé vagy árammá alakít: U_ki = U_ref · D / 2^N.',
        text: 'A legegyszerűbb elv a **súlyozott ellenállásos** DAC: egy összegző erősítő bemeneteire R, 2R, 4R, … ellenállásokon keresztül kapcsolódnak a bitek, így a legnagyobb helyi értékű bit árama a legnagyobb. Hátránya, hogy N bitnél 2^(N−1) arányú, egymáshoz pontosan illesztett ellenállások kellenek.\n\nAz **R–2R létrahálózat** ezt csak kétféle ellenállással oldja meg. Minden csomópontból „hátrafelé” nézve az eredő ellenállás R (vagy 2R), ezért minden csomópontban az áram pontosan **felére** oszlik. A bitek kapcsolói a 2R ágakat a referenciára vagy a földre (virtuális földre) kapcsolják; a kimeneti áram vagy feszültség a bináris súlyok összege. Integrált áramkörben könnyű sok egyforma ellenállást illesztetten gyártani – ez az R–2R népszerűségének oka.\n\nTovábbi megoldások: **áramforrás-mátrix** (sok egyforma, áramtükörrel beállított áramforrás – gyors, video- és rádiófrekvenciás DAC-ok), **ellenállás-lánc (string)** – 2^N egyforma ellenállás, eleve **monoton**; **PWM-DAC**: impulzusszélesség-modulált kimenet + aluláteresztő szűrő (mikrovezérlőkben olcsó megoldás); **szigma-delta DAC** (hangtechnika).\n\nJellemzők:\n\n- **felbontás** (LSB = U_ref / 2^N), **beállási idő**;\n- **monotonitás:** nagyobb kódhoz soha nem tartozhat kisebb kimenet – szabályozókörben ennek hiánya instabilitást okozhat;\n- **INL, DNL;**\n- **glitch:** kódváltáskor (például 0111…1 → 1000…0) a bitek nem egyszerre váltanak, rövid tüske jelenik meg.\n\nA DAC kimenete lépcsős (nulladrendű tartás), ezért a mintavételi frekvencia képeit **rekonstrukciós szűrő** távolítja el.',
        example: '8 bites DAC, U_ref = 2,56 V: `LSB = 10 mV`. A 0b10110100 = 180 kód kimenete `2,56 · 180/256 = 1,80 V`. R–2R létrában a legnagyobb helyi értékű bit a referenciaáram felét, a következő a negyedét adja, és így tovább.',
        pitfall: 'A legnagyobb helyi értékű bit ellenállásának 1/2^N-nél kisebb relatív hibával kell illeszkednie, különben a középső kódváltásnál (0111…1 → 1000…0) a kimenet visszaléphet: a DAC nem monoton.',
        related: ['ad-atalakito', 'osszegzo', 'aramtukor', 'aktiv-szuro'], tags: ['jelfeldolgozás', 'átalakító'] },
      { id: 'hidegito-kondenzator', term: 'Hidegítő (blokkoló) kondenzátor', en: 'decoupling (bypass) capacitor', topic: 'jel', prereq: ['villamosmernoki/energiatarolok', 'villamosmernoki/reaktancia', 'digitalis-technika/cmos'],
        short: 'Az integrált áramkör tápcsatlakozójához a lehető legközelebb kötött kondenzátor, amely a hirtelen áramigényt helyben fedezi, így a tápvezeték induktivitásán nem keletkezik zavaró feszültségesés.',
        text: 'Egy digitális áramkör (CMOS) minden órajelélnél rövid, meredek áramimpulzust vesz fel. A tápfeszültséget szállító vezetékeknek és furatoknak induktivitásuk van (nagyságrendileg 1 nH/mm), és ezen `ΔU = L · di/dt` feszültség esik. Néhány nanoszekundumos felfutásnál ez akár volt nagyságrendű tápfeszültség-beesés vagy földtüske lehet („ground bounce”), ami hibás logikai szinteket, zajt és sugárzott zavart okoz.\n\nA hidegítő kondenzátor **helyi energiatároló**: a gyors áramimpulzust ő adja, a tápvezetékből csak az átlagos, lassan változó áram folyik. Fontos szempontok:\n\n- **Elhelyezés:** a kondenzátor–IC–kondenzátor hurok területe (és így induktivitása) legyen minimális: közvetlenül a tápláb mellé, rövid, vastag bekötéssel, furattal azonnal a földsíkra.\n- **Önrezonancia:** a valós kondenzátornak soros induktivitása (ESL) és ellenállása (ESR) is van; `f_r = 1/(2π · √(ESL · C))` fölött már induktívan viselkedik. Ezért a kis tokozású kerámiakondenzátor (kis ESL) a jó nagyfrekvenciás hidegítő.\n- **Lépcsőzés:** IC-nként 100 nF kerámia (gyors tranziensek), áramkörcsoportonként néhány µF–tíz µF (közepes frekvencia), a tápbemenetnél nagyobb puffer (lassú változások). A NYÁK tápsík–földsík párja maga is kis induktivitású kondenzátor.\n- **Analóg áramköröknél** a hidegítés a műveleti erősítő stabilitásához is kell: a tápvezeték induktivitásán keresztül a kimeneti áram visszacsatolódhat.\n\nA hidegítő kondenzátor a **tápelosztó hálózat** (PDN) része: célja, hogy a tápforrás impedanciája a teljes érintett frekvenciatartományban egy célérték alatt maradjon.',
        example: 'Egy kimenet 1 ns alatt 100 mA áramot kapcsol, a tápvezeték induktivitása 10 nH: `ΔU = 10⁻⁸ · 0,1 / 10⁻⁹ = 1 V` – 3,3 V-os tápnál ez elfogadhatatlan. Egy 100 nF-os, 1 nH ESL-ű kondenzátor önrezonanciája `1/(2π · √(10⁻⁹ · 10⁻⁷)) ≈ 16 MHz`.',
        pitfall: 'A legtöbb hiba az elhelyezésben van: a táp­lábtól 2–3 cm-re, vékony vezetőn bekötött kondenzátor szinte hatástalan. Nagy kapacitású kerámiakondenzátor kapacitása az egyenfeszültség hatására jelentősen (akár felére) csökkenhet – az adatlap DC-bias görbéjét is nézni kell.',
        related: ['pcb-tervezes', 'szurokondenzator', 'linearis-stabilizator', 'kapcsolouzemu-tap'], tags: ['NYÁK', 'tápellátás'] },
      { id: 'pcb-tervezes', term: 'Nyomtatott áramkör (NYÁK) tervezésének alapelvei', en: 'printed circuit board (PCB) design principles', topic: 'jel', prereq: ['elektronika/hidegito-kondenzator', 'villamosmernoki/ohm-torveny', 'fizika-bsc/faraday-indukcio'],
        short: 'Azok a fizikai elvek és bevált szabályok, amelyekkel a kapcsolási rajzból működő, zavarvédett, megbízható és gyártható nyomtatott huzalozású lap lesz: áramutak, visszatérő áram, földsík, hidegítés, hőelvezetés, szigetelési távolságok.',
        text: 'A NYÁK nem „ideális vezetékek” halmaza: minden vezetőnek ellenállása, induktivitása és kapacitása van. Az alapelvek:\n\n1. **Minden áram körben folyik.** A visszatérő áram nagy frekvencián a legkisebb **impedanciájú** (= legkisebb induktivitású) úton, vagyis közvetlenül a jelvezető **alatt**, a földsíkban folyik. Ezért a földsíkot nem szabad a jelvezetők alatt hasítékokkal megszakítani, különben a hurok területe – és vele a sugárzás és a zavarérzékenység – megnő.\n2. **Kis hurokterület:** a kapcsolóüzemű tápok nagy di/dt-jű hurkait (kapcsolótranzisztor, dióda, bemeneti kondenzátor) a lehető legkisebbre kell rajzolni.\n3. **Folytonos földsík** (többrétegű lapon egy teljes réteg): kis impedanciájú referencia, árnyékolás. Analóg és digitális részt térben válasszuk el, de jellemzően **közös** földsíkon, egy pontban vagy a határvonalon érintkezve.\n4. **Hidegítés** minden IC tápjánál, közel, rövid bekötéssel.\n5. **Vezetőszélesség a terheléshez:** `R = ρ · l / (w · t)`; a melegedés az áramtól, a rézvastagságtól és a hűlési lehetőségtől függ (szabványos táblázatok és kalkulátorok alapján).\n6. **Nagy sebességű jelek:** ha a jel felfutási ideje összemérhető a vezetéken való terjedési idővel, a vezetőt **tápvonalként** kell kezelni (szabályozott hullámimpedancia, lezárás) a visszaverődések elkerülésére.\n7. **Hőelvezetés:** rézfelületek, termikus furatok, alkatrész-elhelyezés.\n8. **Szigetelési távolságok:** nagyfeszültségű részeknél a légköz (clearance) és a felületi kúszóút (creepage) a feszültségtől és a környezettől függő szabványos minimumokat kell teljesítse – ez érintésvédelmi kérdés.\n9. **Gyárthatóság és tesztelhetőség:** mérőpontok, egyértelmű jelölés, a gyártó technológiai határainak betartása.',
        example: 'Egy 35 µm vastag, 0,5 mm széles, 100 mm hosszú rézvezető ellenállása `1,72 · 10⁻⁸ · 0,1 / (0,5 · 10⁻³ · 35 · 10⁻⁶) ≈ 0,1 Ω`. 2 A áramnál ezen 0,2 V esik és 0,4 W hő keletkezik – egy érzékeny analóg föld ugyanezen a vezetőn 0,2 V-os hibát kapna.',
        pitfall: 'Az „analóg és digitális föld szétvágása” gyakran többet árt, mint használ: ha egy jel átível a hasítékon, a visszatérő áram kerülőútra kényszerül, és nagy hurokantenna jön létre. A föld nem egyetlen potenciál: a nagy áramú és az érzékeny áramkörök földáramainak nem szabad közös vezetőszakaszon osztozniuk.',
        related: ['hidegito-kondenzator', 'zaj', 'kapcsolouzemu-tap', 'ad-atalakito', 'kapcsolasi-veszteseg'], tags: ['NYÁK', 'EMC', 'tervezés'] }
    ]
  });
})();
