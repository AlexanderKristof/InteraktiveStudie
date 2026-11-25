/* Egyetem: Közgazdaságtan (mikro- és makroökonómia alapjai, BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"';
  var BLUE = '#2f7bf6', RED = '#e5484d', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6', TEAL = '#0e9aa7';

  /* ---------- rajzsegédek (kg-) ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function frame(x0, x1, y0, y1, L, Tp, W, H) {
    return {
      X: function (x) { return r1(L + (x - x0) / (x1 - x0) * W); },
      Y: function (y) { return r1(Tp + (y1 - y) / (y1 - y0) * H); }
    };
  }
  function curve(fr, fn, a, b, n, ylo, yhi) {
    var d = '', pen = false;
    for (var i = 0; i <= n; i++) {
      var x = a + (b - a) * i / n, y = fn(x);
      if (!isFinite(y) || y < ylo || y > yhi) { pen = false; continue; }
      d += (pen ? 'L' : 'M') + fr.X(x) + ' ' + fr.Y(y) + ' ';
      pen = true;
    }
    return d;
  }
  function head(x, y, ang, col, s) {
    s = s || 8;
    return '<path d="M' + r1(x) + ' ' + r1(y) + ' L' + r1(x - s * Math.cos(ang - 0.4)) + ' ' + r1(y - s * Math.sin(ang - 0.4)) + ' L' + r1(x - s * Math.cos(ang + 0.4)) + ' ' + r1(y - s * Math.sin(ang + 0.4)) + ' z" fill="' + col + '"/>';
  }
  function arrow(x1, y1, x2, y2, col, w, dash) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 1.5) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (cls || T)) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  function seg(x1, y1, x2, y2, col, w, dash) { return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + (col || 'var(--fg-2)') + '" stroke-width="' + (w || 1.5) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>'; }
  function poly(fr, pts, col, op) {
    return '<polygon points="' + pts.map(function (p) { return fr.X(p[0]) + ',' + fr.Y(p[1]); }).join(' ') + '" fill="' + col + '" fill-opacity="' + (op || 0.22) + '"/>';
  }
  function dot(x, y, col, r) { return '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="' + (r || 4.5) + '" fill="' + (col || 'var(--fg)') + '"/>'; }
  /* tengelykereszt: x0..x1 vízszintes, y0..y1 függőleges koordináták a fr keretben */
  function plotAxes(fr, x0, x1, y0, y1, xl, yl) {
    return arrow(fr.X(x0), fr.Y(y0), fr.X(x1) + 10, fr.Y(y0), 'var(--fg-2)') + arrow(fr.X(x0), fr.Y(y0), fr.X(x0), fr.Y(y1) - 10, 'var(--fg-2)') +
      txt(fr.X(x1) + 10, fr.Y(y0) + 31, xl, M, 11, 'end') + txt(fr.X(x0) + 6, fr.Y(y1) - 6, yl, M, 11);
  }
  /* szaggatott vetítővonalak a tengelyekre egy pontból */
  function drop(fr, x, y, xl, yl, col) {
    return seg(fr.X(x), fr.Y(y), fr.X(x), fr.Y(0), 'var(--muted)', 1, '3 3') + seg(fr.X(0), fr.Y(y), fr.X(x), fr.Y(y), 'var(--muted)', 1, '3 3') +
      (xl ? txt(fr.X(x), fr.Y(0) + 15, xl, T, 11, 'middle', col ? 'fill="' + col + '"' : null) : '') +
      (yl ? txt(fr.X(0) - 5, fr.Y(y) + 4, yl, T, 11, 'end', col ? 'fill="' + col + '"' : null) : '');
  }

  /* ---------- 1. Termelési lehetőségek határa ---------- */
  var ppf = frame(0, 60, 0, 120, 60, 20, 300, 220);
  var ppfY = function (x) { return 100 * Math.sqrt(Math.max(0, 1 - (x / 50) * (x / 50))); };
  var kgPpf = '<svg viewBox="0 0 560 280">' + plotAxes(ppf, 0, 60, 0, 120, 'gabona (ezer t)', 'gépek (db)') +
    poly(ppf, [[0, 0], [0, 100]].concat([5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 50].map(function (x) { return [x, ppfY(x)]; })), GREEN, 0.10) +
    '<path d="' + curve(ppf, ppfY, 0, 50, 80, -1, 130) + 'L' + ppf.X(50) + ' ' + ppf.Y(0) + '" fill="none" stroke="' + GREEN + '" stroke-width="3"/>';
  [[20, 30], [30, 40]].forEach(function (s, i) {
    var a = ppfY(s[0]), b = ppfY(s[1]), col = i ? RED : ORANGE;
    kgPpf += seg(ppf.X(s[0]), ppf.Y(a), ppf.X(s[1]), ppf.Y(a), col, 1.6, '4 3') + seg(ppf.X(s[1]), ppf.Y(a), ppf.X(s[1]), ppf.Y(b), col, 2.4) +
      txt(ppf.X(s[1]) + 5, (ppf.Y(a) + ppf.Y(b)) / 2 + 4, '−' + (a - b).toFixed(1).replace('.', ','), T, 11, null, 'fill="' + col + '" font-weight="700"');
  });
  kgPpf += dot(ppf.X(10), ppf.Y(ppfY(10)), GREEN) + txt(ppf.X(10) + 2, ppf.Y(ppfY(10)) - 10, 'A', T, 13, null, 'font-weight="700"') +
    dot(ppf.X(18), ppf.Y(50), ORANGE) + txt(ppf.X(18) + 8, ppf.Y(50) + 4, 'B', T, 13, null, 'font-weight="700"') +
    dot(ppf.X(42), ppf.Y(88), RED) + txt(ppf.X(42) + 8, ppf.Y(88) + 4, 'C', T, 13, null, 'font-weight="700"') +
    txt(390, 50, 'A: hatékony (a görbén)', T, 12, null, 'fill="' + GREEN + '"') +
    txt(390, 72, 'B: nem hatékony –', T, 12, null, 'fill="' + ORANGE + '"') + txt(390, 88, 'kihasználatlan erőforrás', M, 11) +
    txt(390, 110, 'C: elérhetetlen', T, 12, null, 'fill="' + RED + '"') + txt(390, 126, '(növekedéssel válik elérhetővé)', M, 11) +
    txt(390, 160, '+10 ezer t gabona ára:', T, 12) + txt(390, 178, '20→30: 11,7 gép', T, 11, null, 'fill="' + ORANGE + '"') + txt(390, 194, '30→40: 20,0 gép', T, 11, null, 'fill="' + RED + '"') +
    txt(390, 214, 'növekvő alternatívaköltség', M, 11) + txt(390, 230, '→ a görbe kifelé domború', M, 11) + '</svg>';

  /* ---------- 2. Kereslet–kínálat: fogyasztói és termelői többlet ---------- */
  var sd = frame(0, 110, 0, 56, 60, 16, 300, 220);
  var dP = function (q) { return 50 - q / 2; }, sP = function (q) { return 5 + q / 4; };
  var kgSurplus = '<svg viewBox="0 0 600 272">' + plotAxes(sd, 0, 110, 0, 56, 'mennyiség (Q)', 'ár (P)') +
    poly(sd, [[0, 50], [0, 20], [60, 20]], BLUE, 0.28) + poly(sd, [[0, 20], [0, 5], [60, 20]], GREEN, 0.28) +
    '<path d="' + curve(sd, dP, 0, 100, 2, 0, 60) + '" stroke="' + BLUE + '" stroke-width="3" fill="none"/>' +
    '<path d="' + curve(sd, sP, 0, 108, 2, 0, 60) + '" stroke="' + RED + '" stroke-width="3" fill="none"/>' +
    drop(sd, 60, 20, 'Q* = 60', 'P* = 20') + dot(sd.X(60), sd.Y(20), 'var(--fg)') +
    txt(sd.X(100) + 4, sd.Y(2) - 4, 'D', T, 14, null, 'fill="' + BLUE + '" font-weight="700"') + txt(sd.X(106), sd.Y(sP(106)) - 8, 'S', T, 14, 'middle', 'fill="' + RED + '" font-weight="700"') +
    txt(sd.X(16), sd.Y(26), 'FT', T, 13, 'middle', 'fill="' + BLUE + '" font-weight="700"') + txt(sd.X(16), sd.Y(14.5), 'TT', T, 13, 'middle', 'fill="' + GREEN + '" font-weight="700"') +
    txt(410, 40, 'D: Q = 100 − 2P', T, 12, null, 'fill="' + BLUE + '"') + txt(410, 58, 'S: Q = −20 + 4P', T, 12, null, 'fill="' + RED + '"') +
    txt(410, 92, 'fogyasztói többlet (FT)', T, 12, null, 'fill="' + BLUE + '"') + txt(410, 108, '½ · 60 · (50 − 20) = 900', M, 11) +
    txt(410, 136, 'termelői többlet (TT)', T, 12, null, 'fill="' + GREEN + '"') + txt(410, 152, '½ · 60 · (20 − 5) = 450', M, 11) +
    txt(410, 182, 'teljes többlet: 1350', T, 12, null, 'font-weight="700"') + txt(410, 200, 'egyensúlyban maximális', M, 11) + '</svg>';

  /* ---------- 3. Keresletnövekedés: az egyensúly elmozdul ---------- */
  var kgShift = '<svg viewBox="0 0 600 272">' + plotAxes(sd, 0, 110, 0, 56, 'mennyiség (Q)', 'ár (P)') +
    '<path d="' + curve(sd, dP, 0, 100, 2, 0, 60) + '" stroke="' + BLUE + '" stroke-width="2.6" fill="none" stroke-dasharray="7 4"/>' +
    '<path d="' + curve(sd, function (q) { return 65 - q / 2; }, 18, 110, 2, 0, 60) + '" stroke="' + BLUE + '" stroke-width="3" fill="none"/>' +
    '<path d="' + curve(sd, sP, 0, 108, 2, 0, 60) + '" stroke="' + RED + '" stroke-width="3" fill="none"/>' +
    drop(sd, 60, 20, '60', '20') + drop(sd, 80, 25, '80', '25', PURPLE) +
    dot(sd.X(60), sd.Y(20)) + dot(sd.X(80), sd.Y(25), PURPLE) + txt(sd.X(60) - 6, sd.Y(20) - 9, 'E₁', T, 12, 'end', 'font-weight="700"') + txt(sd.X(80) + 2, sd.Y(25) - 10, 'E₂', T, 12, null, 'fill="' + PURPLE + '" font-weight="700"') +
    arrow(sd.X(30), sd.Y(35), sd.X(50), sd.Y(35), BLUE, 2) +
    txt(sd.X(98), sd.Y(2) + 2, 'D₁', T, 13, null, 'fill="' + BLUE + '"') + txt(sd.X(26), sd.Y(55) + 4, 'D₂', T, 13, null, 'fill="' + BLUE + '" font-weight="700"') + txt(sd.X(106), sd.Y(sP(106)) - 8, 'S', T, 14, 'middle', 'fill="' + RED + '" font-weight="700"') +
    txt(410, 40, 'D₁: Q = 100 − 2P', T, 12, null, 'fill="' + BLUE + '"') + txt(410, 58, 'D₂: Q = 130 − 2P', T, 12, null, 'fill="' + BLUE + '" font-weight="700"') +
    txt(410, 88, 'a keresleti görbe', T, 12) + txt(410, 104, 'jobbra tolódik', T, 12) + txt(410, 120, '(pl. nő a jövedelem)', M, 11) +
    txt(410, 150, 'új egyensúly (E₂):', T, 12, null, 'fill="' + PURPLE + '"') + txt(410, 166, 'P = 25, Q = 80', T, 12, null, 'fill="' + PURPLE + '"') + txt(410, 192, 'mozgás a kínálati görbén', M, 11) + txt(410, 208, '(nem a kínálat nőtt!)', M, 11) + '</svg>';

  /* ---------- 4. Árplafon: hiány és holtteher-veszteség ---------- */
  var kgCeil = '<svg viewBox="0 0 600 272">' + plotAxes(sd, 0, 110, 0, 56, 'mennyiség (Q)', 'ár (P)') +
    poly(sd, [[40, 30], [40, 15], [60, 20]], ORANGE, 0.35) +
    '<path d="' + curve(sd, dP, 0, 100, 2, 0, 60) + '" stroke="' + BLUE + '" stroke-width="3" fill="none"/>' +
    '<path d="' + curve(sd, sP, 0, 108, 2, 0, 60) + '" stroke="' + RED + '" stroke-width="3" fill="none"/>' +
    seg(sd.X(0), sd.Y(15), sd.X(110), sd.Y(15), PURPLE, 2.4) + txt(sd.X(110), sd.Y(15) - 6, 'árplafon P = 15', T, 11, 'end', 'fill="' + PURPLE + '" font-weight="700"') +
    dot(sd.X(60), sd.Y(20), 'var(--muted)', 3.5) + seg(sd.X(40), sd.Y(15), sd.X(40), sd.Y(0), 'var(--muted)', 1, '3 3') + seg(sd.X(70), sd.Y(15), sd.X(70), sd.Y(0), 'var(--muted)', 1, '3 3') +
    txt(sd.X(40), sd.Y(0) + 15, 'Qs = 40', T, 11, 'middle', 'fill="' + RED + '"') + txt(sd.X(70), sd.Y(0) + 15, 'Qd = 70', T, 11, 'middle', 'fill="' + BLUE + '"') +
    '<path d="M' + sd.X(40) + ' ' + (sd.Y(15) + 14) + ' v6 H' + sd.X(70) + ' v-6" fill="none" stroke="' + PURPLE + '" stroke-width="1.6"/>' + txt((sd.X(40) + sd.X(70)) / 2, sd.Y(15) + 32, 'hiány: 30', T, 11, 'middle', 'fill="' + PURPLE + '" font-weight="700"') +
    txt(sd.X(98), sd.Y(2) + 2, 'D', T, 14, null, 'fill="' + BLUE + '" font-weight="700"') + txt(sd.X(106), sd.Y(sP(106)) - 8, 'S', T, 14, 'middle', 'fill="' + RED + '" font-weight="700"') +
    txt(410, 40, 'eredeti egyensúly: P = 20, Q = 60', M, 11) +
    txt(410, 70, 'árplafon (maximált ár)', T, 12, null, 'fill="' + PURPLE + '" font-weight="700"') + txt(410, 86, 'az egyensúlyi ár alatt köt', M, 11) +
    txt(410, 116, 'eladott mennyiség: 40', T, 12) + txt(410, 132, '(a rövidebb oldal dönt)', M, 11) +
    txt(410, 162, 'holtteher-veszteség:', T, 12, null, 'fill="' + ORANGE + '" font-weight="700"') + txt(410, 178, '½ · 20 · (30 − 15) = 150', M, 11) +
    txt(410, 208, 'árpadló (P = 25 felett):', T, 12) + txt(410, 224, 'fölösleg: 80 − 50 = 30', M, 11) + '</svg>';

  /* ---------- 5. Költséggörbék (MC, ATC, AVC) ---------- */
  var cf = frame(0, 20, 0, 60, 60, 16, 300, 220);
  var MCf = function (q) { return 0.3 * q * q - 4 * q + 20; }, AVCf = function (q) { return 0.1 * q * q - 2 * q + 20; }, ATCf = function (q) { return AVCf(q) + 100 / q; };
  function costBase() {
    return plotAxes(cf, 0, 20, 0, 60, 'kibocsátás (Q)', 'Ft / db') +
      '<path d="' + curve(cf, ATCf, 2, 20, 90, 0, 60) + '" stroke="' + BLUE + '" stroke-width="3" fill="none"/>' +
      '<path d="' + curve(cf, AVCf, 0, 20, 90, 0, 60) + '" stroke="' + GREEN + '" stroke-width="3" fill="none"/>' +
      '<path d="' + curve(cf, MCf, 0, 18.6, 90, 0, 60) + '" stroke="' + RED + '" stroke-width="3" fill="none"/>' +
      txt(cf.X(18.6) + 4, cf.Y(58), 'MC', T, 13, null, 'fill="' + RED + '" font-weight="700"') +
      txt(cf.X(4.2) + 8, cf.Y(ATCf(4.2)) + 4, 'ATC', T, 13, null, 'fill="' + BLUE + '" font-weight="700"') +
      txt(cf.X(20) + 4, cf.Y(AVCf(20)) + 4, 'AVC', T, 13, null, 'fill="' + GREEN + '" font-weight="700"');
  }
  var kgCost = '<svg viewBox="0 0 600 272">' + costBase() +
    dot(cf.X(10), cf.Y(10), GREEN) + dot(cf.X(12.97), cf.Y(18.59), BLUE) +
    seg(cf.X(10), cf.Y(10), cf.X(10), cf.Y(0), 'var(--muted)', 1, '3 3') + txt(cf.X(10), cf.Y(0) + 15, '10', M, 11, 'middle') +
    seg(cf.X(12.97), cf.Y(18.59), cf.X(12.97), cf.Y(0), 'var(--muted)', 1, '3 3') + txt(cf.X(12.97), cf.Y(0) + 15, '13', M, 11, 'middle') +
    '<path d="M' + cf.X(14.2) + ' ' + cf.Y(ATCf(14.2)) + ' L' + cf.X(14.2) + ' ' + cf.Y(AVCf(14.2)) + '" stroke="var(--muted)" stroke-width="1.2"/>' +
    txt(cf.X(14.2) + 5, (cf.Y(ATCf(14.2)) + cf.Y(AVCf(14.2))) / 2 + 4, 'AFC', M, 10) +
    txt(410, 36, 'FC = 100', T, 12) + txt(410, 54, 'VC = 0,1Q³ − 2Q² + 20Q', T, 12) +
    txt(410, 84, 'MC = dTC/dQ', T, 12, null, 'fill="' + RED + '"') + txt(410, 102, 'AVC = VC/Q', T, 12, null, 'fill="' + GREEN + '"') + txt(410, 120, 'ATC = TC/Q = AVC + FC/Q', T, 12, null, 'fill="' + BLUE + '"') +
    txt(410, 152, 'Az MC az AVC és az ATC', T, 12) + txt(410, 168, 'görbét a minimumpontjukban', T, 12) + txt(410, 184, 'metszi alulról.', T, 12) +
    txt(410, 214, 'min AVC: Q = 10, 10 Ft', M, 11) + txt(410, 230, 'min ATC: Q ≈ 13, ≈ 18,6 Ft', M, 11) + '</svg>';

  /* ---------- 6. Tökéletes verseny: profitmaximum P = MC ---------- */
  var q30 = 15.49, a30 = ATCf(q30);
  var kgPc = '<svg viewBox="0 0 600 272">' +
    '<rect x="' + cf.X(0) + '" y="' + cf.Y(30) + '" width="' + r1(cf.X(q30) - cf.X(0)) + '" height="' + r1(cf.Y(a30) - cf.Y(30)) + '" fill="' + GREEN + '" fill-opacity=".25"/>' +
    costBase() + seg(cf.X(0), cf.Y(30), cf.X(20), cf.Y(30), PURPLE, 2.6) + txt(cf.X(11), cf.Y(30) - 6, 'P = MR = 30', T, 11, 'middle', 'fill="' + PURPLE + '" font-weight="700"') +
    dot(cf.X(q30), cf.Y(30), PURPLE) + seg(cf.X(q30), cf.Y(30), cf.X(q30), cf.Y(0), 'var(--muted)', 1, '3 3') + txt(cf.X(q30), cf.Y(0) + 15, 'Q* ≈ 15,5', T, 11, 'middle', 'fill="' + PURPLE + '"') +
    seg(cf.X(0), cf.Y(a30), cf.X(q30), cf.Y(a30), 'var(--muted)', 1, '3 3') + txt(cf.X(0) - 5, cf.Y(a30) + 4, '19,5', M, 10, 'end') + txt(cf.X(0) - 5, cf.Y(30) + 4, '30', M, 10, 'end') +
    txt(cf.X(6), (cf.Y(30) + cf.Y(a30)) / 2 + 4, 'profit', T, 12, 'middle', 'fill="' + GREEN + '" font-weight="700"') +
    txt(410, 36, 'árelfogadó vállalat:', T, 12, null, 'font-weight="700"') + txt(410, 54, 'vízszintes keresleti görbe', M, 11) +
    txt(410, 84, 'optimum: P = MC', T, 12, null, 'fill="' + PURPLE + '"') + txt(410, 100, '0,3Q² − 4Q + 20 = 30', M, 11) + txt(410, 116, '→ Q* ≈ 15,5', M, 11) +
    txt(410, 146, 'profit = (P − ATC) · Q', T, 12, null, 'fill="' + GREEN + '"') + txt(410, 162, '≈ (30 − 19,5) · 15,5 ≈ 163', M, 11) +
    txt(410, 192, 'hosszú távon belépés →', T, 12) + txt(410, 208, 'P leesik min ATC-ig,', T, 12) + txt(410, 224, 'a gazdasági profit 0', T, 12) + '</svg>';

  /* ---------- 7. Monopólium: MR = MC, holtteher-veszteség ---------- */
  var mf = frame(0, 110, 0, 110, 60, 16, 300, 220);
  var kgMono = '<svg viewBox="0 0 600 272">' + plotAxes(mf, 0, 110, 0, 110, 'mennyiség (Q)', 'ár, költség') +
    poly(mf, [[0, 60], [40, 60], [40, 20], [0, 20]], GREEN, 0.22) + poly(mf, [[40, 60], [80, 20], [40, 20]], ORANGE, 0.35) +
    '<path d="' + curve(mf, function (q) { return 100 - q; }, 0, 100, 2, 0, 120) + '" stroke="' + BLUE + '" stroke-width="3" fill="none"/>' +
    '<path d="' + curve(mf, function (q) { return 100 - 2 * q; }, 0, 50, 2, 0, 120) + '" stroke="' + TEAL + '" stroke-width="2.6" fill="none" stroke-dasharray="7 4"/>' +
    seg(mf.X(0), mf.Y(20), mf.X(106), mf.Y(20), RED, 2.6) +
    drop(mf, 40, 60, 'Qm = 40', 'Pm = 60', PURPLE) + seg(mf.X(80), mf.Y(20), mf.X(80), mf.Y(0), 'var(--muted)', 1, '3 3') + txt(mf.X(80), mf.Y(0) + 15, 'Qc = 80', M, 11, 'middle') +
    dot(mf.X(40), mf.Y(60), PURPLE) + dot(mf.X(40), mf.Y(20), TEAL) + txt(mf.X(0) - 5, mf.Y(20) + 4, '20', M, 10, 'end') +
    txt(mf.X(100), mf.Y(0) - 6, 'D', T, 14, 'middle', 'fill="' + BLUE + '" font-weight="700"') + txt(mf.X(50) + 6, mf.Y(0) - 6, 'MR', T, 13, null, 'fill="' + TEAL + '" font-weight="700"') +
    txt(mf.X(106), mf.Y(20) - 6, 'MC', T, 13, 'end', 'fill="' + RED + '" font-weight="700"') +
    txt(mf.X(20), mf.Y(40) + 4, 'profit', T, 12, 'middle', 'fill="' + GREEN + '" font-weight="700"') + txt(mf.X(51), mf.Y(31), 'HV', T, 11, 'middle', 'fill="' + ORANGE + '" font-weight="700"') +
    txt(410, 36, 'D: P = 100 − Q', T, 12, null, 'fill="' + BLUE + '"') + txt(410, 54, 'MR = 100 − 2Q', T, 12, null, 'fill="' + TEAL + '"') + txt(410, 72, 'MC = 20 (állandó)', T, 12, null, 'fill="' + RED + '"') +
    txt(410, 102, 'MR = MC → Q = 40', T, 12, null, 'fill="' + PURPLE + '"') + txt(410, 118, 'ár a keresletről: P = 60', T, 12, null, 'fill="' + PURPLE + '"') +
    txt(410, 148, 'profit = (60 − 20) · 40 = 1600', T, 11, null, 'fill="' + GREEN + '"') +
    txt(410, 170, 'holtteher-veszteség (HV):', T, 11, null, 'fill="' + ORANGE + '"') + txt(410, 186, '½ · (80 − 40) · (60 − 20) = 800', M, 11) +
    txt(410, 214, 'verseny esetén: P = MC = 20,', M, 11) + txt(410, 230, 'Q = 80', M, 11) + '</svg>';

  /* ---------- 8. Negatív externália: MSC > MPC ---------- */
  var xf = frame(0, 110, 0, 90, 60, 16, 300, 220);
  var kgExt = '<svg viewBox="0 0 600 272">' + plotAxes(xf, 0, 110, 0, 90, 'mennyiség (Q)', 'ár, költség') +
    poly(xf, [[55, 52.5], [70, 60], [70, 45]], ORANGE, 0.4) +
    '<path d="' + curve(xf, function (q) { return 80 - q / 2; }, 0, 110, 2, 0, 95) + '" stroke="' + BLUE + '" stroke-width="3" fill="none"/>' +
    '<path d="' + curve(xf, function (q) { return 10 + q / 2; }, 0, 110, 2, 0, 95) + '" stroke="' + RED + '" stroke-width="3" fill="none"/>' +
    '<path d="' + curve(xf, function (q) { return 25 + q / 2; }, 0, 110, 2, 0, 95) + '" stroke="' + PURPLE + '" stroke-width="3" fill="none" stroke-dasharray="7 4"/>' +
    drop(xf, 70, 45, '70', null, RED) + drop(xf, 55, 52.5, '55', null, PURPLE) + dot(xf.X(70), xf.Y(45), RED) + dot(xf.X(55), xf.Y(52.5), PURPLE) +
    arrow(xf.X(100), xf.Y(60), xf.X(100), xf.Y(74), 'var(--fg-2)', 1.6) + txt(xf.X(100) + 5, xf.Y(67) + 4, '+15', T, 11, null, 'font-weight="700"') +
    txt(xf.X(3), xf.Y(84), 'D (MSB)', T, 12, null, 'fill="' + BLUE + '" font-weight="700"') + txt(xf.X(104), xf.Y(50), 'MPC (S)', T, 12, 'end', 'fill="' + RED + '" font-weight="700"') +
    txt(xf.X(110), xf.Y(80) - 8, 'MSC', T, 12, 'end', 'fill="' + PURPLE + '" font-weight="700"') +
    txt(410, 40, 'MPC: magánköltség', T, 12, null, 'fill="' + RED + '"') + txt(410, 58, 'MSC = MPC + 15', T, 12, null, 'fill="' + PURPLE + '"') + txt(410, 74, '(pl. szennyezés kára)', M, 11) +
    txt(410, 104, 'a piac túltermel:', T, 12) + txt(410, 120, 'Qpiac = 70 a társadalmilag', M, 11) + txt(410, 136, 'optimális Qopt = 55 helyett', M, 11) +
    txt(410, 166, 'holtteher-veszteség:', T, 12, null, 'fill="' + ORANGE + '"') + txt(410, 182, '½ · 15 · 15 = 112,5', M, 11) +
    txt(410, 212, 'Pigou-adó = 15 / egység', T, 12, null, 'fill="' + GREEN + '" font-weight="700"') + txt(410, 228, '„belsővé teszi” a kárt', M, 11) + '</svg>';

  /* ---------- 9. Gazdasági ciklus ---------- */
  var gc = frame(0, 100, 0, 100, 50, 20, 480, 190);
  var trend = function (t) { return 25 + 0.5 * t; }, gdp = function (t) { return trend(t) + 9 * Math.sin((t - 6) / 100 * 2 * Math.PI * 2.2); };
  var pk = 6 + 25 / 2.2, tr = 6 + 75 / 2.2;
  var kgCycle = '<svg viewBox="0 0 560 258">' + arrow(50, 210, 540, 210, 'var(--fg-2)') + arrow(50, 210, 50, 10, 'var(--fg-2)') +
    txt(536, 226, 'idő', M, 11, 'end') + txt(56, 16, 'reál-GDP', M, 11) +
    '<rect x="' + gc.X(pk) + '" y="20" width="' + r1(gc.X(tr) - gc.X(pk)) + '" height="190" fill="' + RED + '" fill-opacity=".08"/>' +
    '<rect x="' + gc.X(tr) + '" y="20" width="' + r1(gc.X(pk + 100 / 2.2) - gc.X(tr)) + '" height="190" fill="' + GREEN + '" fill-opacity=".08"/>' +
    '<path d="' + curve(gc, trend, 0, 100, 2, -10, 200) + '" stroke="var(--muted)" stroke-width="2" stroke-dasharray="7 5" fill="none"/>' +
    '<path d="' + curve(gc, gdp, 0, 100, 120, -10, 200) + '" stroke="' + BLUE + '" stroke-width="3" fill="none"/>' +
    dot(gc.X(pk), gc.Y(gdp(pk)), RED) + txt(gc.X(pk), gc.Y(gdp(pk)) - 10, 'csúcs', T, 12, 'middle', 'fill="' + RED + '" font-weight="700"') +
    dot(gc.X(tr), gc.Y(gdp(tr)), GREEN) + txt(gc.X(tr), gc.Y(gdp(tr)) + 20, 'mélypont', T, 12, 'middle', 'fill="' + GREEN + '" font-weight="700"') +
    txt((gc.X(pk) + gc.X(tr)) / 2, 40, 'recesszió', T, 12, 'middle', 'fill="' + RED + '"') + txt((gc.X(pk) + gc.X(tr)) / 2, 54, '(visszaesés)', M, 10, 'middle') +
    txt((gc.X(tr) + gc.X(pk + 100 / 2.2)) / 2, 40, 'expanzió', T, 12, 'middle', 'fill="' + GREEN + '"') + txt((gc.X(tr) + gc.X(pk + 100 / 2.2)) / 2, 54, '(fellendülés)', M, 10, 'middle') +
    
    seg(gc.X(tr), gc.Y(gdp(tr)), gc.X(tr), gc.Y(trend(tr)), ORANGE, 2)  +
    seg(gc.X(pk), gc.Y(gdp(pk)), gc.X(pk), gc.Y(trend(pk)), ORANGE, 2) + seg(20, 246, 40, 246, BLUE, 3) + txt(46, 250, 'tényleges reál-GDP', M, 11) + seg(160, 246, 180, 246, 'var(--muted)', 2, '7 5') + txt(186, 250, 'potenciális GDP (trend)', M, 11) + seg(318, 240, 318, 252, ORANGE, 2) + txt(325, 250, 'kibocsátási rés (csúcson +, mélyponton −)', M, 11) + '</svg>';

  /* ---------- 10. Komparatív előny: munkaóra-táblázat ---------- */
  function cell(x, y, w, h, s, cls, fill, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (fill || 'var(--surface)') + '"' + (fill ? ' fill-opacity=".22"' : '') + ' stroke="var(--line)" stroke-width="1.5"/>' + txt(x + w / 2, y + h / 2 + 5, s, cls || T, 13, 'middle', extra);
  }
  var cx0 = 20, cw = [110, 130, 130, 170], ch = 40, cy0 = 20;
  function row(y, vals, fills, extras) {
    var x = cx0, s = '';
    vals.forEach(function (v, i) { s += cell(x, y, cw[i], ch, v, i ? T : T, fills && fills[i], extras && extras[i]); x += cw[i]; });
    return s;
  }
  var kgComp = '<svg viewBox="0 0 560 250">' +
    row(cy0, ['', '1 t búza', '1 vég szövet', '1 szövet ára búzában'], null, [null, 'font-weight="700"', 'font-weight="700"', 'font-weight="700"']) +
    row(cy0 + ch, ['A ország', '1 óra', '2 óra', '2 t búza'], [null, GREEN, null, null], ['font-weight="700"', null, null, 'fill="' + RED + '" font-weight="700"']) +
    row(cy0 + 2 * ch, ['B ország', '6 óra', '3 óra', '0,5 t búza'], [null, null, GREEN, null], ['font-weight="700"', null, null, 'fill="' + GREEN + '" font-weight="700"']) +
    txt(20, 160, 'Abszolút előny: A mindkét terméket kevesebb munkával állítja elő.', T, 12) +
    txt(20, 182, 'Komparatív előny: A-nak a búza, B-nek a szövet „olcsóbb” alternatívaköltségben.', T, 12) +
    txt(20, 206, '→ A búzára, B szövetre specializálódik; bármely 0,5 és 2 t búza/vég közötti cserearány', M, 12) +
    txt(20, 224, 'mellett mindkét ország több fogyasztási lehetőséghez jut, mint önellátóként.', M, 12) + '</svg>';

  STUDIE.addCourse({
    id: 'kozgazdasagtan',
    title: 'Közgazdaságtan',
    icon: '📊',
    color: '#2f9e6a',
    level: 'BSc 1–2. félév (gazdasági, mérnök, informatikus)',
    description: 'Szűkösség és döntés, kereslet–kínálat, vállalati költségek és piaci szerkezetek, makrogazdasági mutatók és gazdaságpolitika, nemzetközi kereskedelem és pénzügyi alapok – ábrákkal és ellenőrzött számpéldákkal.',
    intro: 'A közgazdaságtan azt vizsgálja, hogyan döntenek az emberek, a vállalatok és az állam **szűkös erőforrásokról**, és ezek a döntések hogyan kapcsolódnak össze a piacokon. A **mikroökonómia** az egyes piacokra és szereplőkre (háztartás, vállalat) összpontosít – a határelemzés és a kereslet–kínálat modellje a fő eszköze. A **makroökonómia** az egész gazdaság aggregált mutatóit (GDP, infláció, munkanélküliség) és a gazdaságpolitika eszközeit tárgyalja.\n\nA modellek egyszerűsítenek: a „ceteris paribus” (minden más változatlan) feltevés mellett egyszerre csak egy hatást vizsgálunk. A matematikai háttérhez a deriválás (határköltség, határbevétel) és a mértani sor (multiplikátor, jelenérték) elég.',
    topics: [
      { id: 'alap', title: 'Alapfogalmak' },
      { id: 'piac', title: 'Piac: kereslet és kínálat' },
      { id: 'vallalat', title: 'Vállalat és piaci szerkezetek' },
      { id: 'makro', title: 'Makrogazdaság' },
      { id: 'nemzetkozi', title: 'Nemzetközi és pénzügyi alapok' },
      { id: 'fogyaszto', title: 'Fogyasztói döntés' },
      { id: 'tenyezo', title: 'Munkapiac és jövedelemeloszlás' }
    ],
    formulas: [
      {
        id: 'rugalmassag-f', title: 'A kereslet árrugalmassága', en: 'price elasticity of demand',
        parts: [{ t: 'E_d', d: 'Árrugalmasság: hány százalékkal változik a keresett mennyiség 1% árváltozásra', unit: '–', more: 'A keresleti görbe negatív meredeksége miatt jellemzően negatív; gyakran abszolút értékben adják meg.' }, { t: '=' },
          { t: '%ΔQ', d: 'A keresett mennyiség százalékos változása', unit: '%' }, { t: '/' },
          { t: '%ΔP', d: 'Az ár százalékos változása', unit: '%', more: 'Ívrugalmasságnál (felezőpont-módszer) az átlagos árhoz és mennyiséghez viszonyítunk: %ΔQ = ΔQ/((Q₁+Q₂)/2).' }],
        text: '|E| > 1: **rugalmas** kereslet (a mennyiség erősebben reagál, mint az ár); |E| < 1: **rugalmatlan**; |E| = 1: egységnyi rugalmasságú. Pontrugalmasság lineáris keresletre: `E = (dQ/dP)·(P/Q)`. A bevétel (P·Q) rugalmatlan keresletnél az árral együtt nő, rugalmasnál ellentétesen mozog.',
        example: 'Ár 10 → 12 Ft, mennyiség 1000 → 900 db. Felezőpont-módszer: `%ΔQ = −100/950 ≈ −10,5%`, `%ΔP = 2/11 ≈ 18,2%`, `E ≈ −0,58` – rugalmatlan, ezért a bevétel nő: 10 000 → 10 800 Ft.'
      },
      {
        id: 'profit-f', title: 'Profit (gazdasági profit)', en: 'profit = total revenue − total cost',
        parts: [{ t: 'π', d: 'Profit', unit: 'Ft' }, { t: '=' },
          { t: 'TR', d: 'Teljes (összes) bevétel: TR = P·Q', unit: 'Ft' }, { t: '−' },
          { t: 'TC', d: 'Teljes költség: TC = FC + VC (fix + változó költség)', unit: 'Ft', more: 'A közgazdasági költség az alternatívaköltségeket (pl. a tulajdonos saját tőkéjének és munkájának elmaradt hozamát) is tartalmazza – ezért kisebb a gazdasági profit a számviteli profitnál.' }],
        text: 'Egységnyi kibocsátásra: `π = (P − ATC)·Q`. A **nulla gazdasági profit** nem veszteség: azt jelenti, hogy a vállalat pontosan annyit keres, mint a legjobb alternatív felhasználásban (normálprofit).',
        example: 'TC = 100 + Q², P = 40. Az optimum P = MC = 2Q → Q = 20. `TR = 40·20 = 800`, `TC = 100 + 400 = 500`, `π = 300`.'
      },
      {
        id: 'mrmc-f', title: 'A profitmaximalizálás feltétele', en: 'profit maximization: MR = MC',
        parts: [{ t: 'MR', d: 'Határbevétel: az utolsó egység eladásából származó többletbevétel, dTR/dQ', unit: 'Ft/db' }, { t: '=' },
          { t: 'MC', d: 'Határköltség: az utolsó egység előállításának többletköltsége, dTC/dQ', unit: 'Ft/db', more: 'Másodrendű feltétel: az optimumban az MC görbe alulról metszi az MR görbét (MC meredekebben nő).' }],
        text: 'A profit `π(Q) = TR(Q) − TC(Q)` szélsőértékének elsőrendű feltétele `π′(Q) = 0`, azaz MR = MC. Árelfogadó (tökéletesen versenyző) vállalatnál MR = P, így a feltétel **P = MC**; monopóliumnál MR < P. Rövid távon a vállalat akkor termel, ha P ≥ min AVC (különben leáll, és csak a fix költséget veszíti el).',
        example: 'Monopólium: P = 100 − Q, MC = 20. `TR = 100Q − Q²`, `MR = 100 − 2Q = 20` → Q = 40, P = 60.'
      },
      {
        id: 'gdp-f', title: 'GDP kiadási oldalról', en: 'GDP expenditure approach: Y = C + I + G + NX',
        parts: [{ t: 'Y', d: 'Bruttó hazai termék (GDP): egy ország területén adott időszak alatt előállított végső termékek és szolgáltatások piaci értéke', unit: 'Ft/év' }, { t: '=' },
          { t: 'C', d: 'Háztartások fogyasztási kiadásai', unit: 'Ft' }, { t: '+' },
          { t: 'I', d: 'Beruházás: vállalati beruházás, lakásépítés, készletváltozás', unit: 'Ft', more: 'Nem pénzügyi befektetés! Részvényvásárlás nem beruházás a GDP-ben.' }, { t: '+' },
          { t: 'G', d: 'Az állam termék- és szolgáltatásvásárlásai', unit: 'Ft', more: 'A transzferek (nyugdíj, segély) nem részei G-nek: nincs mögöttük megtermelt jószág.' }, { t: '+' },
          { t: 'NX', d: 'Nettó export: export − import', unit: 'Ft' }],
        text: 'A GDP háromféleképpen mérhető – termelési (hozzáadott értékek összege), jövedelmi (bérek, profitok, adók) és kiadási oldalról –, és elvben mindhárom ugyanazt adja, mert minden kiadás valakinek jövedelem. Az import levonása azért kell, mert C, I és G az import termékekre fordított kiadást is tartalmazza.',
        example: 'C = 600, I = 200, G = 250, export = 450, import = 500 (mrd Ft). `NX = −50`, `Y = 600 + 200 + 250 − 50 = 1000` mrd Ft.'
      },
      {
        id: 'multiplikator-f', title: 'Kiadási multiplikátor', en: 'Keynesian spending multiplier',
        parts: [{ t: 'k', d: 'Multiplikátor: hányszorosára nő az egyensúlyi kibocsátás egységnyi autonóm kiadásnövekedésre', unit: '–' }, { t: '=' },
          { t: '1 / (1 − MPC)', d: 'MPC: fogyasztási határhajlandóság, a többletjövedelem elköltött hányada (0 < MPC < 1)', more: 'Arányos t adókulccsal: k = 1/(1 − MPC·(1 − t)); nyitott gazdaságban az importhajlandóság tovább csökkenti.' }],
        text: 'Levezetés mértani sorral: a ΔG kiadás valakinek jövedelem, aminek MPC-szeresét elkölti, az megint jövedelem… `ΔY = ΔG·(1 + MPC + MPC² + …) = ΔG/(1 − MPC)`. Ez egy egyszerűsített, rögzített árszínvonalú, kihasználatlan kapacitásokat feltételező modell; a valóságban becsült multiplikátorok jóval kisebbek, és függnek a monetáris politika reakciójától, a nyitottságtól és a ciklus állapotától.',
        example: 'MPC = 0,8 → `k = 1/0,2 = 5`; 100 mrd Ft többletkiadás a modellben 500 mrd Ft-tal növeli a kibocsátást. 25%-os adókulccsal: `k = 1/(1 − 0,8·0,75) = 2,5`.'
      },
      {
        id: 'jelenertek-f', title: 'Jelenérték (diszkontálás)', en: 'present value; discounting',
        parts: [{ t: 'PV', d: 'Jelenérték: a jövőbeli összeg ma egyenértékű nagysága', unit: 'Ft' }, { t: '=' },
          { t: 'FV', d: 'Jövőbeli érték (az n-edik időszak végén esedékes pénzösszeg)', unit: 'Ft' }, { t: '/' },
          { t: '(1 + r)^n', d: 'Diszkonttényező reciproka; r: időszaki kamatláb (diszkontráta), n: időszakok száma', more: 'Pénzáram-sorozatra: NPV = Σ C_t/(1 + r)^t − I₀. Örökjáradék: PV = C/r.' }],
        text: 'A jelenérték a **kamatos kamatozás megfordítása**: ha ma PV forintot r kamattal befektetünk, n év múlva `PV·(1 + r)^n = FV` lesz. Minél nagyobb a kamatláb és minél távolabbi a kifizetés, annál kisebb a jelenérték.',
        example: '1 000 000 Ft 3 év múlva, r = 6%: `PV = 1 000 000/1,06³ ≈ 839 619 Ft`.'
      },
      {
        id: 'fisher-f', title: 'Nominál- és reálkamat (Fisher-egyenlet)', en: 'Fisher equation: nominal vs real interest rate',
        parts: [{ t: '1 + i', d: 'i: nominális kamatláb (amit a szerződés pénzben ígér)', unit: '–' }, { t: '=' },
          { t: '(1 + r)', d: 'r: reálkamatláb, a vásárlóerő növekedése', unit: '–' }, { t: '·' },
          { t: '(1 + π)', d: 'π: inflációs ráta', unit: '–', more: 'Kis értékekre jó közelítés: r ≈ i − π. Ex ante (döntéskor) a várt inflációval számolunk.' }],
        text: 'A nominális hozamból le kell „vonni” az inflációt, hogy lássuk, ténylegesen mennyivel több terméket vásárolhatunk. Ha az infláció meghaladja a nominális kamatot, a reálkamat **negatív**: a megtakarítás vásárlóereje csökken.',
        example: 'i = 8%, π = 5%: `r = 1,08/1,05 − 1 ≈ 2,86%` (a közelítés 3%-ot adna). i = 4%, π = 6%: `r = 1,04/1,06 − 1 ≈ −1,9%`.'
      },
      {
        id: 'atlagkoltseg-f', title: 'Átlag- és határköltség', en: 'average and marginal cost',
        parts: [{ t: 'ATC', d: 'Átlagos teljes költség (egységköltség)', unit: 'Ft/db' }, { t: '=' },
          { t: 'TC/Q', d: 'Teljes költség osztva a kibocsátással; = AFC + AVC', unit: 'Ft/db' }, { t: ';' },
          { t: 'MC', d: 'Határköltség', unit: 'Ft/db' }, { t: '=' },
          { t: 'dTC/dQ', d: 'A teljes költség deriváltja; diszkrét esetben ΔTC/ΔQ', more: 'A fix költség deriváltja 0, ezért MC = dVC/dQ: a határköltséget a fix költség nem befolyásolja.' }],
        text: 'Ha MC < ATC, a következő egység lehúzza az átlagot; ha MC > ATC, felhúzza. Ezért az MC görbe az ATC (és az AVC) görbét a **minimumpontjában** metszi – ugyanaz a logika, mint a vizsgajegyek átlagánál.',
        example: 'TC = 100 + Q²: `ATC = 100/Q + Q`, `MC = 2Q`. A minimum ott, ahol `100/Q + Q = 2Q`, azaz Q = 10; ekkor ATC = MC = 20 Ft.'
      },
      {
        id: 'fogyasztoi-optimum-f', title: 'A fogyasztói optimum feltétele', en: 'consumer equilibrium: equal marginal utility per unit of money',
        parts: [{ t: 'MU_x / P_x', d: 'Az x jószágra költött utolsó forint határhaszna', unit: 'haszon/Ft' }, { t: '=' },
          { t: 'MU_y / P_y', d: 'Az y jószágra költött utolsó forint határhaszna', unit: 'haszon/Ft' }, { t: '⇔' },
          { t: 'MRS', d: 'Helyettesítési határráta: MU_x/MU_y, a közömbösségi görbe meredekségének abszolút értéke', unit: 'y/x' }, { t: '=' },
          { t: 'P_x / P_y', d: 'A relatív ár: a költségvetési egyenes meredekségének abszolút értéke', unit: 'y/x' }],
        text: 'Gossen második törvénye. Ha a bal oldal nagyobb, az x-re költött forint többet ér: érdemes x-ből többet, y-ból kevesebbet venni, amíg a csökkenő határhaszon ki nem egyenlíti a két oldalt. A feltétel mellett a teljes jövedelmet el kell költeni: `P_x · x + P_y · y = I`.',
        example: 'MU_x = 30, P_x = 300 Ft; MU_y = 20, P_y = 100 Ft. Forintonként 0,1 kontra 0,2: y-ból érdemes többet venni. Ha y-ból több fogy, MU_y csökken, amíg mindkét hányados egyenlő nem lesz.'
      },
      {
        id: 'mrp-f', title: 'Munkakereslet: határtermék-bevétel = bér', en: 'labour demand: marginal revenue product equals wage',
        parts: [{ t: 'MRP_L', d: 'A munka határtermék-bevétele: ennyivel nő a bevétel egy további munkással', unit: 'Ft/fő' }, { t: '=' },
          { t: 'MR', d: 'Határbevétel: egy további termékegység eladásából származó bevétel (tökéletes versenyben = P)', unit: 'Ft/db' }, { t: '·' },
          { t: 'MP_L', d: 'A munka határterméke: egy további munkás többlettermelése', unit: 'db/fő' }, { t: '=' },
          { t: 'w', d: 'A bér (egy munkás költsége ugyanarra az időszakra)', unit: 'Ft/fő' }],
        text: 'A vállalat addig alkalmaz újabb munkást, amíg az általa hozott többletbevétel legalább akkora, mint a bére. A határköltség-feltétellel (MR = MC) egyenértékű, mert `MC = w / MP_L`.',
        example: 'P = 20 000 Ft, MP_L = 6 db/hét → MRP = 120 000 Ft/hét. 100 000 Ft-os heti bérköltség mellett megéri felvenni.'
      },
      {
        id: 'gini-f', title: 'Gini-együttható', en: 'Gini coefficient',
        parts: [{ t: 'G', d: 'Gini-együttható: 0 = teljes egyenlőség, 1 = egy személy kap mindent', unit: '0…1' }, { t: '=' },
          { t: 'A', d: 'Az egyenlőség egyenese és a Lorenz-görbe közötti terület', unit: '–' }, { t: '/ (' },
          { t: 'A + B', d: 'A teljes háromszög területe az egységnégyzetben: 1/2 (B a Lorenz-görbe alatti terület)', unit: '–' }, { t: ') = 1 − 2B' }],
        text: 'k egyenlő népességcsoport (pl. ötödök) kumulált jövedelemrészesedéseiből (L₀ = 0, …, L_k = 1) a trapézszabállyal: `B ≈ (1/k) · Σ (L_{i−1} + L_i) / 2`. Gyakran százalékban (0–100) is közlik.',
        example: 'Kumulált részesedések ötödönként: 0,05; 0,15; 0,30; 0,55; 1. `B = 0,31`, `G = 1 − 0,62 = 0,38`.'
      },
      {
        id: 'phillips-f', title: 'Várakozásokkal kiegészített Phillips-görbe', en: 'expectations-augmented Phillips curve',
        parts: [{ t: 'π', d: 'Tényleges infláció', unit: '%' }, { t: '=' },
          { t: 'π^e', d: 'Várt infláció', unit: '%' }, { t: '−' },
          { t: 'β', d: 'Az infláció érzékenysége a munkanélküliségi résre', unit: '–' }, { t: '· (' },
          { t: 'u', d: 'Tényleges munkanélküliségi ráta', unit: '%' }, { t: '−' },
          { t: 'u∗', d: 'Természetes munkanélküliségi ráta (NAIRU)', unit: '%' }, { t: ')' }],
        text: 'Ha u = u∗, az infláció a várakozásokkal egyezik. A természetes ráta alatti munkanélküliség a vártnál magasabb inflációval jár; ha a várakozások ehhez igazodnak, az infláció gyorsul. Kínálati sokkot egy további tag jelöl (+ ε).',
        example: 'π^e = 3%, β = 0,5, u∗ = 5%, u = 4%: `π = 3 − 0,5 · (−1) = 3,5%`.'
      },
      {
        id: 'solow-f', title: 'Tőkefelhalmozás a Solow-modellben', en: 'Solow model capital accumulation',
        parts: [{ t: 'Δk', d: 'Az egy munkásra jutó tőke változása egy időszak alatt', unit: 'tőke/fő' }, { t: '=' },
          { t: 's · f(k)', d: 'Beruházás munkásonként: a megtakarítási ráta (s) szorozva az egy főre jutó kibocsátással', unit: 'tőke/fő' }, { t: '−' },
          { t: '(n + δ) · k', d: 'Pótlási igény: a népességnövekedés (n) és az értékcsökkenés (δ) miatt ennyi beruházás kell a k szinten tartásához', unit: 'tőke/fő' }],
        text: 'A steady state-ben Δk = 0, azaz `s · f(k∗) = (n + δ) · k∗`. Technológiai haladás (g) esetén hatékony munkásonként számolunk, és a pótlási igény `(n + g + δ) · k`.',
        example: '`f(k) = k^0,5`, s = 0,2, n + δ = 0,05: `0,2 · √k = 0,05 · k` → k∗ = 16, y∗ = 4.'
      },
      {
        id: 'mennyisegi-f', title: 'A pénz mennyiségi egyenlete', en: 'equation of exchange (quantity theory of money)',
        parts: [{ t: 'M', d: 'Pénzmennyiség', unit: 'Ft' }, { t: '·' },
          { t: 'V', d: 'A pénz forgási sebessége: egy pénzegység évente hányszor cserél gazdát végső termékekért', unit: '1/év' }, { t: '=' },
          { t: 'P', d: 'Árszínvonal (árindex)', unit: '–' }, { t: '·' },
          { t: 'Y', d: 'Reál-GDP (bázisévi áron)', unit: 'Ft/év' }],
        text: 'Növekedési ütemekben: `%ΔM + %ΔV ≈ %ΔP + %ΔY`. Stabil V mellett az infláció hosszú távon a pénzmennyiség és a reálkibocsátás növekedési ütemének különbsége.',
        example: 'M = 20 000 Mrd Ft, V = 4, Y = 80 000 Mrd Ft → P = 1. M +10%, Y +3%, V állandó → infláció ≈ 7% (pontosan `1,10/1,03 − 1 ≈ 6,8%`).'
      }
    ],
    terms: [
      /* ----- Alapfogalmak ----- */
      { id: 'szukosseg', term: 'Szűkösség', en: 'scarcity', topic: 'alap',
        short: 'Az erőforrások (munka, tőke, föld, idő) korlátozottak a lehetséges felhasználásokhoz és az igényekhez képest, ezért választani kell. A közgazdaságtan alapproblémája.',
        text: 'Szűkös az a jószág, amelyből nulla ár mellett több kellene, mint amennyi rendelkezésre áll. A szűkösség nem azonos a ritkasággal: a kenyér nem ritka, de szűkös – előállítása munkát, gabonát, energiát igényel, amelyeket másra is fel lehetne használni.\n\nA szűkösségből három alapkérdés következik minden gazdaságban:\n\n- **Mit** termeljünk (és mennyit)?\n- **Hogyan** termeljünk (milyen technológiával, milyen erőforrás-kombinációval)?\n- **Kinek** termeljünk (hogyan oszlik meg a termés)?\n\nA **termelési tényezők** hagyományos felosztása: munka, tőke (gépek, épületek – nem a pénz!), természeti erőforrások (föld), valamint a vállalkozói képesség. A piacgazdaság ezekre a kérdésekre az **árakon** keresztül ad decentralizált választ: az ár jelzi, mennyire szűkös egy jószág, és ösztönöz a takarékosságra vagy a termelés bővítésére.\n\nA **szabad javak** (például a levegő egy erdőben) nem szűkösek; ha azonban egy erőforrás túlhasználata miatt szűkössé válik (tiszta levegő egy nagyvárosban), megjelennek a gazdasági problémák.',
        example: 'Egy hallgatónak a vizsgaidőszakban heti 60 szabad órája van. Ha mindhárom tárgyára 30 órát szánna, 90 óra kellene – az idő szűkös, döntenie kell az órák elosztásáról.',
        pitfall: 'A szűkösség nem a „szegénység” szinonimája: a leggazdagabb ember ideje is szűkös. A tőke a közgazdaságtanban termelőeszközt jelent, nem a bankszámlán lévő pénzt.',
        related: ['alternativakoltseg', 'termelesi-lehetosegek', 'hatarelemzes', 'kereslet', 'kozjavak'] },
      { id: 'alternativakoltseg', term: 'Alternatívaköltség', en: 'opportunity cost', topic: 'alap',
        short: 'Egy döntés valódi költsége: annak a legjobb lehetőségnek az értéke, amelyről a választás miatt lemondunk.',
        prereq: ['lecke:penzugy/koltsegvetes'],
        text: 'Mivel az erőforrások szűkösek, minden választás egyben lemondás. Az alternatívaköltség a **legjobb kihagyott** alternatíva – nem az összes kihagyott lehetőség összege.\n\nA közgazdasági költség ezért eltér a könyvelési (számviteli) költségtől:\n\n- **explicit költség**: tényleges pénzkiadás (bér, anyag, bérleti díj);\n- **implicit költség**: a saját erőforrás elmaradt hozama (a tulajdonos munkájának piaci bére, a saját tőke kamata).\n\n`közgazdasági költség = explicit + implicit költség`\n\nAz alternatívaköltség jelenik meg a termelési lehetőségek határának meredekségében, a nemzetközi kereskedelem komparatív előnyében és a befektetési döntések diszkontrátájában is (a pénz alternatívaköltsége a kamat).\n\nA **elsüllyedt költség** (sunk cost) – a már elköltött, vissza nem szerezhető pénz – nem alternatívaköltség: a jövőre vonatkozó döntésnél figyelmen kívül kell hagyni.',
        example: 'Egyetemi év költsége: tandíj + könyvek = 600 000 Ft, plusz a kihagyott teljes munkaidős fizetés (nettó 3 600 000 Ft/év). Az alternatívaköltség kb. **4,2 millió Ft** – a megélhetési költség csak annyiban számít, amennyiben az egyetem miatt több (hiszen enni dolgozóként is kell).',
        pitfall: 'Nem adjuk össze az összes kihagyott lehetőséget: ha este moziba mehettél volna VAGY dolgozhattál volna, csak a kettő közül az értékesebb számít. A már kifizetett, vissza nem téríthető jegyár (elsüllyedt költség) nem ok arra, hogy egy rossz filmet végignézz.',
        related: ['szukosseg', 'termelesi-lehetosegek', 'komparativ-elony', 'jelenertek', 'koltsegek', 'hatarelemzes'] },
      { id: 'hatarelemzes', term: 'Határelemzés és ösztönzők', en: 'marginal analysis; incentives', topic: 'alap',
        short: 'A racionális döntéshozó egy tevékenységet addig bővít, amíg az utolsó egység határhaszna (határbevétele) legalább akkora, mint határköltsége. Az ösztönzők – árak, adók, jutalmak, büntetések – ezen a mérlegelésen keresztül hatnak a viselkedésre.',
        prereq: ['analizis/derivalt', 'analizis/szelsoertek'],
        text: 'A legtöbb döntés nem „mindent vagy semmit” típusú, hanem arról szól, hogy **egy kicsivel több vagy kevesebb** legyen-e valamiből. A „határ” (marginális) jelző mindig az utolsó, pótlólagos egységre utal:\n\n- **határhaszon** (MU, MB): az utolsó egység fogyasztásából származó többlethaszon;\n- **határköltség** (MC): az utolsó egység többletköltsége;\n- **határbevétel** (MR): az utolsó egység eladásából származó többletbevétel.\n\nAz optimum ott van, ahol **MB = MC**: amíg MB > MC, megéri bővíteni; ha MB < MC, csökkenteni kell. Matematikailag ez a nettó haszon szélsőértékének elsőrendű feltétele (a derivált nulla).\n\nA **csökkenő határhaszon** törvénye szerint ugyanabból a jószágból minden további egység egyre kevesebb többlethasznot ad – ezért lejtenek lefelé a keresleti görbék.\n\n**Ösztönzők**: ha egy tevékenység határköltsége vagy határhaszna megváltozik, a viselkedés is változik. A dohánytermékek jövedéki adója, a dugódíj vagy a teljesítménybér mind ezen alapul. A szakpolitikák elemzésekor a **nem szándékolt** hatásokra is figyelni kell (például ha egy támogatás olyan viselkedést jutalmaz, amelyet nem akartak).',
        example: 'Egy pékség napi kenyérmennyiségének határköltsége: 21. kenyér 180 Ft, 22. kenyér 230 Ft, 23. kenyér 290 Ft. Ha a kenyér ára 250 Ft, a 22. kenyeret még megéri megsütni (250 > 230), a 23.-at már nem (250 < 290).',
        pitfall: 'Az átlag és a határ nem ugyanaz: az, hogy egy étterem átlagköltsége egy vendégre 3000 Ft, nem jelenti, hogy egy további vendég 3000 Ft-ba kerül – a határköltség (alapanyag, mosogatás) lehet sokkal kisebb, ha van szabad asztal.',
        formulas: ['mrmc-f'],
        related: ['profitmaximalizalas', 'koltsegek', 'kereslet', 'alternativakoltseg', 'externalia', 'szukosseg'] },
      { id: 'termelesi-lehetosegek', term: 'Termelési lehetőségek határa', en: 'production possibility frontier (PPF)', topic: 'alap',
        short: 'Azoknak a termékkombinációknak a görbéje, amelyeket egy gazdaság adott erőforrásokkal és technológiával, azok teljes és hatékony kihasználásával elő tud állítani.',
        prereq: ['lecke:matematika/linearis-fuggveny'],
        visual: kgPpf, caption: 'A görbe pontjai hatékonyak (A), a görbe alatti pontok pazarlók (B), a görbén kívüliek elérhetetlenek (C). A görbe meredeksége az alternatívaköltség, amely a gabonatermelés bővítésével egyre nő.',
        text: 'A legegyszerűbb, kétjószágos modell három fogalmat tesz láthatóvá: a **szűkösséget** (a határon kívüli pontok elérhetetlenek), a **hatékonyságot** (a határon lévő pontokon az egyik jószágból csak a másik rovására lehet többet termelni) és az **alternatívaköltséget** (a görbe meredeksége).\n\nA görbe tipikusan **kifelé domború** (konkáv az origóból nézve), mert az erőforrások nem egyformán alkalmasak minden célra: ha egyre több gabonát akarunk, egyre kevésbé alkalmas munkásokat és gépeket kell átcsoportosítani, ezért egyre több gépről kell lemondani egy újabb tonna gabonáért – **növekvő alternatívaköltség**. Egyenes PPF állandó alternatívaköltséget jelent (tökéletesen helyettesíthető erőforrások).\n\nA görbe **kifelé tolódik** gazdasági növekedéskor: több erőforrás (népesség, tőkefelhalmozás) vagy jobb technológia esetén. A beruházási javak (gépek) javára hozott döntés ma kevesebb fogyasztást jelent, de holnap kijjebb tolja a határt.',
        example: 'A görbe: `Y = 100·√(1 − (X/50)²)`. A gabona 20-ról 30 ezer tonnára növelése 91,7 → 80,0, azaz **11,7 gép** feladásával jár; 30-ról 40-re már 80,0 → 60,0, azaz **20 gép** – a következő 10 ezer tonnáért pedig 60 gép kellene.',
        pitfall: 'A munkanélküliség vagy a kihasználatlan gyár nem tolja befelé a görbét: a gazdaság ilyenkor a görbe **alatti** pontban van. A görbe csak az erőforrások vagy a technológia változásával mozdul el.',
        related: ['szukosseg', 'alternativakoltseg', 'komparativ-elony', 'gazdasagi-ciklus', 'munkanelkuliseg'] },

      /* ----- Piac ----- */
      { id: 'kereslet', term: 'Kereslet', en: 'demand', topic: 'piac',
        short: 'Az a mennyiség, amelyet a vásárlók különböző árak mellett hajlandók és képesek megvenni, minden más tényező változatlansága mellett. A keresleti görbe általában negatív meredekségű.',
        prereq: ['lecke:matematika/linearis-fuggveny'],
        text: 'A **keresleti függvény** Q_d = D(P) a keresett mennyiséget adja meg az ár függvényében (ceteris paribus). A **kereslet törvénye**: magasabb árnál kevesebbet keresnek. Okai:\n\n- **helyettesítési hatás**: a drágább jószág helyett relatíve olcsóbbat választanak;\n- **jövedelmi hatás**: az áremelkedés csökkenti a reáljövedelmet;\n- **csökkenő határhaszon**: a vásárló csak alacsonyabb árért vesz további egységet.\n\nFontos megkülönböztetés:\n\n- **mozgás a görbe mentén** = a keresett mennyiség változása, az ár változása miatt;\n- **a görbe eltolódása** = a kereslet változása, más tényező miatt: jövedelem, helyettesítő és kiegészítő termékek ára, ízlés, várakozások, vásárlók száma.\n\n**Normál jószág** iránt a jövedelem növekedésével nő, **inferior** (alacsonyabb rendű) jószág iránt csökken a kereslet. **Helyettesítő** termékek (vaj–margarin): az egyik drágulása a másik keresletét növeli. **Kiegészítő** termékek (autó–benzin): az egyik drágulása a másik keresletét csökkenti.\n\nA piaci kereslet az egyéni keresletek **vízszintes összege**: minden árra összeadjuk a keresett mennyiségeket.',
        example: 'Q_d = 100 − 2P. P = 20 Ft mellett 60 db, P = 30 Ft mellett 40 db a keresett mennyiség. Ha a vásárlók jövedelme nő és a jószág normál, a görbe jobbra tolódik, például Q_d = 130 − 2P-re: ugyanazon 20 Ft-os áron most 90 db-ot keresnek.',
        pitfall: '„Nőtt az ár, ezért csökkent a kereslet” – pontatlan: az ár változása a **keresett mennyiséget** változtatja (mozgás a görbén), a kereslet (a görbe helye) változatlan. A közgazdasági ábrákon a függőleges tengelyen van az ár, holott ez a független változó – ez Marshall óta szokás.',
        related: ['kinalat', 'piaci-egyensuly', 'rugalmassag', 'tobblet', 'hatarelemzes'] },
      { id: 'kinalat', term: 'Kínálat', en: 'supply', topic: 'piac',
        short: 'Az a mennyiség, amelyet a termelők különböző árak mellett hajlandók és képesek eladni, minden más változatlansága mellett. A kínálati görbe általában pozitív meredekségű.',
        text: 'A **kínálati függvény** Q_s = S(P). A **kínálat törvénye**: magasabb ár mellett többet kínálnak, mert:\n\n- a magasabb ár a növekvő határköltségű egységek előállítását is fedezi (versenyző vállalat kínálati görbéje a határköltség-görbéjének min AVC fölötti szakasza);\n- új termelők lépnek be a piacra.\n\nA **kínálat eltolódását** okozza: az inputárak változása (bérek, nyersanyag, energia), a technológia, az adók és támogatások, az eladók száma, a várakozások és a természeti tényezők (időjárás a mezőgazdaságban). Költségcsökkenés esetén a görbe **jobbra (lefelé)** tolódik: ugyanazon áron többet, vagy ugyanannyit alacsonyabb áron kínálnak.\n\nA kínálat rugalmassága az időtávtól függ: **nagyon rövid távon** (egy napon belül) a mennyiség rögzített, a görbe függőleges; **hosszú távon** a kapacitás bővíthető, a kínálat sokkal rugalmasabb.\n\nA piaci kínálat az egyes vállalatok kínálatának vízszintes összege.',
        example: 'Q_s = −20 + 4P: 5 Ft alatt senki nem kínál; P = 20 Ft-nál 60 db, P = 25 Ft-nál 80 db. Ha egységenként 5 Ft adót vetnek ki az eladókra, a görbe 5 Ft-tal felfelé tolódik: Q_s = −20 + 4(P − 5) = −40 + 4P.',
        pitfall: 'Az ár emelkedése nem „növeli a kínálatot”, hanem a **kínált mennyiséget** (mozgás a görbén). A kínálat akkor nő, ha a görbe tolódik el, például olcsóbb lett a termelés.',
        related: ['kereslet', 'piaci-egyensuly', 'koltsegek', 'tokeletes-verseny', 'tobblet'] },
      { id: 'piaci-egyensuly', term: 'Piaci egyensúly', en: 'market equilibrium', topic: 'piac',
        short: 'Az az ár és mennyiség, amelynél a keresett és a kínált mennyiség megegyezik (Q_d = Q_s): ezen az áron nincs sem hiány, sem fölösleg, így nincs nyomás az ár változására.',
        prereq: ['lecke:matematika/egyenletek'],
        visual: kgShift, caption: 'A kereslet növekedése (D₁ → D₂) a kínálati görbe mentén vezet új egyensúlyhoz: magasabb ár és nagyobb mennyiség.',
        text: 'Ha az ár az egyensúlyi fölött van, **túlkínálat** (fölösleg) keletkezik: az eladók készletei nőnek, árat csökkentenek. Ha alatta van, **túlkereslet** (hiány): sorban állás, a vevők felverik az árat. Az árak így a piacot az egyensúly felé terelik – ez az „**láthatatlan kéz**” mechanizmusa (Adam Smith).\n\n**Összehasonlító statika**: hogyan változik az egyensúly egy külső sokk hatására?\n\n- kereslet nő → P nő, Q nő;\n- kereslet csökken → P csökken, Q csökken;\n- kínálat nő → P csökken, Q nő;\n- kínálat csökken → P nő, Q csökken.\n\nHa a kereslet és a kínálat **egyszerre** mozdul el, az egyik változó iránya egyértelmű, a másiké a mértékektől függ (például ha mindkettő nő, Q biztosan nő, P bizonytalan).\n\nA modell a **tökéletes verseny** idealizációjára épül: sok kis szereplő, homogén termék, teljes információ, szabad belépés.',
        example: 'Q_d = 100 − 2P, Q_s = −20 + 4P. Egyensúly: `100 − 2P = −20 + 4P` → **P∗ = 20, Q∗ = 60**. Ha a kereslet Q_d = 130 − 2P-re nő: `130 − 2P = −20 + 4P` → P = 25, Q = 80. Ha az ár 25 maradna az eredeti keresletnél: Q_d = 50, Q_s = 80 → 30 db fölösleg.',
        pitfall: 'Egy hatás miatt nem tolhatjuk el mindkét görbét: ha nő a kereslet, és emiatt nő az ár, az a **kínált mennyiséget** növeli (mozgás a kínálati görbén), nem a kínálatot.',
        related: ['kereslet', 'kinalat', 'tobblet', 'arszabalyozas', 'rugalmassag', 'tokeletes-verseny'] },
      { id: 'rugalmassag', term: 'Rugalmasság (árrugalmasság)', en: 'elasticity (price elasticity of demand)', topic: 'piac',
        short: 'Azt méri, hány százalékkal változik egy mennyiség (pl. a keresett mennyiség) egy másik változó (pl. az ár) 1%-os változására. Mértékegység-független, ezért különböző piacok összevethetők.',
        prereq: ['lecke:matematika/szazalek', 'analizis/derivalt'],
        text: 'A **kereslet árrugalmassága** `E = %ΔQ / %ΔP`. Osztályozás abszolút értékben:\n\n- |E| > 1: **rugalmas** (luxuscikkek, sok helyettesítővel rendelkező termékek, például egy adott márkájú üdítő);\n- |E| < 1: **rugalmatlan** (alapvető szükségletek, kevés helyettesítő: üzemanyag, gyógyszer, villamos energia rövid távon);\n- E = 0: tökéletesen rugalmatlan (függőleges görbe); |E| → ∞: tökéletesen rugalmas (vízszintes görbe).\n\nA rugalmasság **nem** a meredekség: egy egyenes keresleti görbén a rugalmasság pontról pontra változik – a magas árú szakaszon rugalmas, az alacsonyon rugalmatlan, a felezőpontban |E| = 1.\n\n**Bevételi szabály**: rugalmatlan keresletnél az áremelés növeli a bevételt (P·Q), rugalmasnál csökkenti; |E| = 1-nél a bevétel maximális.\n\nTovábbi rugalmasságok: **jövedelemrugalmasság** (normál jószág > 0, inferior < 0, luxusjószág > 1), **kereszt-árrugalmasság** (helyettesítők > 0, kiegészítők < 0), **kínálati árrugalmasság**.\n\nGyakorlati jelentőség: az adók terhét főként a **rugalmatlanabb** oldal viseli (adóincidencia).',
        example: 'Q_d = 100 − 2P, P = 20, Q = 60 pontban: `E = (dQ/dP)·(P/Q) = −2·20/60 ≈ −0,67` – rugalmatlan. P = 30, Q = 40 pontban: `E = −2·30/40 = −1,5` – rugalmas. A felezőpont P = 25, Q = 50, itt E = −1.',
        pitfall: 'A laposabb görbe nem feltétlenül „rugalmasabb” minden pontban – csak azonos ponton (azonos P, Q) vethető össze két görbe meredeksége. A százalékos változásnál a kiindulási értéktől függ az eredmény; ezért ívrugalmasságnál a felezőpont-módszert használjuk.',
        formulas: ['rugalmassag-f'],
        related: ['kereslet', 'kinalat', 'tobblet', 'monopolium', 'piaci-egyensuly'] },
      { id: 'tobblet', term: 'Fogyasztói és termelői többlet', en: 'consumer and producer surplus', topic: 'piac',
        short: 'Fogyasztói többlet: amennyivel többet lettek volna hajlandók fizetni a vevők, mint a piaci ár (a keresleti görbe alatti, ár feletti terület). Termelői többlet: a piaci ár és az eladók minimális elfogadható ára (kínálati görbe) közötti különbség összege.',
        prereq: ['analizis/riemann-integral'],
        visual: kgSurplus, caption: 'Lineáris kereslet és kínálat: a fogyasztói többlet (kék) és a termelői többlet (zöld) háromszöge. Összegük, a teljes többlet, a versenyzői egyensúlyban maximális.',
        text: 'A keresleti görbe minden pontja megmutatja, mennyit ér az adott egység a **határvásárlónak** (fizetési hajlandóság). Ha mindenki ugyanazt a P∗ árat fizeti, a korábbi vevők „nyernek”: ezek összege a **fogyasztói többlet**,\n\n`FT = ∫ (D(Q) − P∗) dQ`, 0-tól Q∗-ig,\n\nlineáris esetben egy háromszög területe. Hasonlóan a kínálati görbe a határköltséget mutatja, így a **termelői többlet** az ár és a határköltség különbségének összege (rövid távon a bevétel mínusz változó költség).\n\nA **teljes (társadalmi) többlet** = FT + TT a piac által létrehozott jólét. Versenyzői egyensúlyban maximális: minden olyan egységet előállítanak, amelynek értéke a vevőnek nagyobb, mint az előállítás költsége.\n\nMinden beavatkozás, amely az egyensúlyi mennyiségtől eltérít (adó, árszabályozás, monopólium), **holtteher-veszteséget** (deadweight loss) okoz: a teljes többlet olyan csökkenését, amely senkinek nem jut. Ez a jóléti közgazdaságtan alapeszköze – azt azonban nem mondja meg, hogy az elosztás igazságos-e; ez értékválasztás kérdése.',
        example: 'Q_d = 100 − 2P (azaz P = 50 − Q/2), Q_s = −20 + 4P (P = 5 + Q/4), egyensúly P = 20, Q = 60. `FT = ½·60·(50 − 20) = 900`, `TT = ½·60·(20 − 5) = 450`, összesen 1350.',
        pitfall: 'A fogyasztói többlet nem a vevők megtakarítása a bolti árhoz képest, hanem fizetési hajlandóság és ár különbsége; pénzben mérjük, de jóléti mérték. A termelői többlet nem azonos a profittal: a fix költséget nem vonja le.',
        related: ['piaci-egyensuly', 'kereslet', 'kinalat', 'arszabalyozas', 'monopolium', 'externalia'] },
      { id: 'arszabalyozas', term: 'Árplafon és árpadló', en: 'price ceiling and price floor', topic: 'piac',
        short: 'Hatósági árszabályozás: az árplafon (maximált ár) legfeljebb, az árpadló (minimálár) legalább egy adott árat enged. Akkor kötő, ha a plafon az egyensúlyi ár alatt, a padló fölötte van.',
        visual: kgCeil, caption: 'Kötő árplafon: a kínált mennyiség (40) kisebb a keresettnél (70), hiány alakul ki; a 40 és 60 közötti egységek elmaradása holtteher-veszteség (narancs).',
        text: 'Az árszabályozás célja jellemzően valamely csoport védelme (a vevőké árplafonnal, az eladóké vagy munkavállalóké árpadlóval). A tankönyvi modell következményei, ha a szabályozás köt:\n\n**Árplafon** (P_max < P∗):\n\n- **hiány**: Q_d > Q_s; az eladott mennyiség a kínált mennyiség (a „rövidebb oldal”);\n- a szűkös mennyiséget nem az ár osztja el, hanem sorban állás, kapcsolatok, jegyrendszer – a beszerzés időköltsége is költség;\n- minőségromlás, feketepiac kialakulhat;\n- holtteher-veszteség: a meg nem termelt egységek többlete elvész.\n\n**Árpadló** (P_min > P∗):\n\n- **fölösleg**: Q_s > Q_d (például mezőgazdasági intervenciós felvásárlásnál raktárkészlet halmozódik fel);\n- a munkapiacon a minimálbér a modell szerint a kereslet csökkenésén keresztül hathat a foglalkoztatásra; az empirikus hatás nagysága vitatott, és függ a minimálbér szintjétől és a munkapiac szerkezetétől (például a munkáltatói piaci erőtől).\n\nA nem kötő szabályozás (plafon az egyensúly fölött) nem változtat semmin. A hatások rövid és hosszú távon eltérhetnek, mert a kínálat hosszú távon rugalmasabb.',
        example: 'Q_d = 100 − 2P, Q_s = −20 + 4P, egyensúly P = 20, Q = 60. Árplafon 15 Ft: `Q_d = 70`, `Q_s = 40`, **hiány 30**. A 40. egységért a vevők 30 Ft-ot is fizetnének, a termelő határköltsége 15 Ft: holtteher-veszteség `½·(60 − 40)·(30 − 15) = 150`. Árpadló 25 Ft: Q_s = 80, Q_d = 50, **fölösleg 30**.',
        pitfall: 'Az árplafon nem garantálja, hogy mindenki olcsón jut a termékhez: csak a vásárlók egy része kap, és sokszor nem azok, akiknek a legnagyobb szükségük van rá. A „hiány” itt a szabályozott áron értendő, nem fizikai értelemben.',
        related: ['piaci-egyensuly', 'tobblet', 'kereslet', 'kinalat', 'rugalmassag'] },

      /* ----- Vállalat ----- */
      { id: 'koltsegek', term: 'Költségfogalmak: fix, változó, határ- és átlagköltség', en: 'fixed, variable, marginal and average cost', topic: 'vallalat',
        short: 'A teljes költség (TC) a kibocsátástól független fix (FC) és a vele változó (VC) költség összege. Az egységköltség az átlagköltség (ATC = TC/Q), a pótlólagos egység költsége a határköltség (MC = dTC/dQ).',
        prereq: ['analizis/derivalt'],
        visual: kgCost, caption: 'Tipikus rövid távú költséggörbék. A határköltség a csökkenő hozadék miatt egy pont után emelkedik, és az AVC, majd az ATC görbét a minimumában metszi.',
        text: '**Rövid távon** legalább egy termelési tényező (például a gyárépület) rögzített, ezért van **fix költség** (bérleti díj, értékcsökkenés, biztosítás), amelyet akkor is fizetni kell, ha a vállalat semmit sem termel. **Hosszú távon** minden tényező változtatható, nincs fix költség.\n\nÁtlagos mennyiségek:\n\n- AFC = FC/Q: a termelés bővítésével folyamatosan csökken („a fix költség szétterül”);\n- AVC = VC/Q: U alakú;\n- ATC = AFC + AVC: U alakú, minimuma az AVC minimuma után van.\n\nA **határköltség** emelkedése a **csökkenő határhozadék** törvényéből adódik: rögzített tőke mellett minden újabb munkás egyre kevesebb többletterméket ad (a gépek körül egyre zsúfoltabb), ezért egy többletegység egyre több munkát igényel.\n\n**Hosszú távú átlagköltség** (LRAC): ha a méret növelésével az átlagköltség csökken, **méretgazdaságosság** (economies of scale) van – ez magyarázza például, miért kevés autógyár van egy piacon.',
        example: 'FC = 100, VC = 0,1Q³ − 2Q² + 20Q. Q = 10-nél: `VC = 100 − 200 + 200 = 100`, `AVC = 10` (ez a minimum), `ATC = 20`, `MC = 0,3·100 − 40 + 20 = 10` = AVC. Az ATC minimuma Q ≈ 13-nál ≈ 18,6, ahol MC ≈ ATC.',
        pitfall: 'A fix költség a rövid távú termelési döntést (mennyit termeljünk) nem befolyásolja, mert a határköltségben nem szerepel; csak azt, hogy a vállalat hosszú távon a piacon marad-e. A „fix” nem azt jelenti, hogy soha nem változik, hanem hogy nem függ Q-tól.',
        formulas: ['atlagkoltseg-f', 'profit-f'],
        related: ['profitmaximalizalas', 'tokeletes-verseny', 'hatarelemzes', 'alternativakoltseg', 'kinalat', 'monopolium'] },
      { id: 'profitmaximalizalas', term: 'Profitmaximalizálás (MR = MC)', en: 'profit maximization (MR = MC)', topic: 'vallalat',
        short: 'A profit (bevétel mínusz költség) annál a kibocsátásnál maximális, ahol a határbevétel egyenlő a határköltséggel. Minden piaci szerkezetben ez a vállalat döntési szabálya.',
        prereq: ['analizis/szelsoertek', 'analizis/derivalt'],
        text: 'A profit `π(Q) = TR(Q) − TC(Q)`. Ha egy további egység többet hoz, mint amennyibe kerül (MR > MC), a termelés bővítése növeli a profitot; ha kevesebbet (MR < MC), a csökkentése. Az optimum tehát:\n\n`MR(Q∗) = MC(Q∗)`, és MC metszi MR-t alulról.\n\nA szabály piaci szerkezettől függően:\n\n- **tökéletes verseny**: a vállalat árelfogadó, MR = P, így P = MC;\n- **monopólium**: az eladott mennyiség növeléséhez árat kell csökkenteni minden egységen, ezért MR < P; a monopolista P > MC áron ad el.\n\n**Rövid távú leállási szabály**: ha P < min AVC, a vállalat jobban jár, ha leáll (csak FC-t veszít). Ha min AVC ≤ P < min ATC, veszteséges, de termel, mert a bevétel a fix költség egy részét is fedezi.\n\n**Hosszú távon** a vállalat kilép, ha P < min ATC (nem éri el a normálprofitot).\n\nA profitmaximalizálás feltevés: a valós vállalatok célja lehet a piaci részesedés, a bevétel vagy a vállalatérték is, de a modell jó első közelítés.',
        example: 'Árelfogadó vállalat, TC = 100 + Q², P = 40 Ft. MC = 2Q = 40 → Q∗ = 20. `π = 40·20 − (100 + 400) = 300`. Ellenőrzés: Q = 19-nél `π = 760 − 461 = 299`, Q = 21-nél `π = 840 − 541 = 299` – kisebb.',
        pitfall: 'A profit maximuma nem ott van, ahol az egységnyi profit (P − ATC) a legnagyobb, és nem is ott, ahol a bevétel maximális. A profit lehet negatív is az optimumban – ilyenkor a „legkisebb veszteséget” adó mennyiség az optimális.',
        formulas: ['mrmc-f', 'profit-f'],
        related: ['koltsegek', 'tokeletes-verseny', 'monopolium', 'oligopolium', 'hatarelemzes'] },
      { id: 'tokeletes-verseny', term: 'Tökéletes verseny', en: 'perfect competition', topic: 'vallalat',
        short: 'Piaci szerkezet sok kis eladóval és vevővel, homogén termékkel, teljes információval és szabad be- és kilépéssel. Az egyes vállalatok árelfogadók: a piaci árat nem tudják befolyásolni.',
        visual: kgPc, caption: 'Árelfogadó vállalat rövid távú optimuma: ahol a vízszintes árvonal (P = MR) metszi a határköltség-görbét. A zöld téglalap a gazdasági profit.',
        text: 'A tökéletes verseny ideáltípus – a valóságban a mezőgazdasági termékpiacok vagy a tőzsdei nyersanyagpiacok állnak hozzá a legközelebb –, de viszonyítási pontként fontos.\n\nJellemzők:\n\n- a vállalat keresleti görbéje **vízszintes** a piaci áron: ha drágábban adna, senki nem venne tőle, olcsóbban pedig nem érdemes;\n- **P = MR = AR**, a profitmaximum: P = MC;\n- a vállalat **rövid távú kínálati görbéje** az MC görbe min AVC feletti szakasza.\n\n**Hosszú távú egyensúly**: ha a vállalatok gazdasági profitot érnek el, új vállalatok lépnek be, a piaci kínálat nő, az ár csökken – egészen addig, amíg **P = min ATC**, azaz a gazdasági profit nulla. Veszteség esetén kilépés történik.\n\nHatékonysági tulajdonságok:\n\n- **allokatív hatékonyság**: P = MC, a fogyasztók értékelése egyenlő a társadalmi határköltséggel, a teljes többlet maximális;\n- **termelési hatékonyság**: hosszú távon a minimális átlagköltségen termelnek.',
        example: 'P = 30 Ft, VC = 0,1Q³ − 2Q² + 20Q, FC = 100. `MC = 0,3Q² − 4Q + 20 = 30` → Q∗ ≈ 15,5. ATC(15,5) ≈ 19,5, a profit ≈ (30 − 19,5)·15,5 ≈ 163 Ft. Belépések után az ár min ATC ≈ 18,6 Ft-ra csökken.',
        pitfall: 'A „nulla gazdasági profit” nem jelenti, hogy a tulajdonos nem keres semmit: a normálprofit (a tőke és a saját munka alternatívaköltsége) már a költségekben van. A vállalat keresleti görbéje vízszintes, a **piaci** keresleti görbe azonban lejt.',
        formulas: ['mrmc-f'],
        related: ['profitmaximalizalas', 'koltsegek', 'monopolium', 'oligopolium', 'piaci-egyensuly', 'kinalat'] },
      { id: 'monopolium', term: 'Monopólium', en: 'monopoly', topic: 'vallalat',
        short: 'Piaci szerkezet egyetlen eladóval, közeli helyettesítő nélküli termékkel és belépési korlátokkal. A monopolista ármeghatározó: az MR = MC mennyiséget a keresleti görbéről leolvasott, a határköltségnél magasabb áron adja el.',
        visual: kgMono, caption: 'Monopólium lineáris kereslettel és állandó határköltséggel: a monopolista Q = 40-et termel P = 60 áron. A versenyzői mennyiséghez (80) képest elmaradó egységek holtteher-veszteséget (HV) okoznak.',
        text: 'A **belépési korlátok** forrásai: jogi (szabadalom, koncesszió, kizárólagos engedély), kulcsfontosságú erőforrás birtoklása, **természetes monopólium** (akkora méretgazdaságosság, hogy egy vállalat olcsóbban látja el a piacot, mint több – például víz- és villamoshálózat), valamint hálózati hatások.\n\nMivel a monopolista keresleti görbéje maga a piaci keresleti görbe, több eladásához csökkentenie kell az árat – az összes eladott egységen. Ezért lineáris keresletnél `P = a − bQ` esetén `MR = a − 2bQ`: a határbevételi görbe kétszer olyan meredek, és mindig a keresleti görbe alatt van.\n\nKövetkezmények a versenyzői piachoz képest: **kisebb mennyiség, magasabb ár**, P > MC, holtteher-veszteség. A piaci erő mérőszáma a **Lerner-index**: `L = (P − MC)/P = −1/E`. A monopolista mindig a keresleti görbe **rugalmas** szakaszán termel (ahol MR > 0).\n\n**Árdiszkrimináció**: ha a vállalat különböző vevőknek különböző árat tud szabni (diákkedvezmény, repülőjegyek), a többlet egy részét megszerezheti, és a kibocsátás nőhet.\n\nA szabályozás eszközei: versenyjog (kartell- és fúziókontroll), természetes monopóliumoknál árszabályozás.',
        example: 'P = 100 − Q, MC = 20. MR = 100 − 2Q = 20 → **Q = 40, P = 60**, profit `(60 − 20)·40 = 1600`. Verseny esetén P = 20, Q = 80. Holtteher-veszteség: `½·40·40 = 800`. Lerner-index: (60 − 20)/60 ≈ 0,67.',
        pitfall: 'A monopolista nem „tetszőlegesen magas” árat kér: a keresleti görbe korlátozza – magasabb ár kevesebb vevőt jelent. Nincs kínálati görbéje sem, mert az ár és a mennyiség kapcsolata a keresleti görbe alakjától függ.',
        formulas: ['mrmc-f', 'profit-f'],
        related: ['profitmaximalizalas', 'tokeletes-verseny', 'oligopolium', 'tobblet', 'rugalmassag', 'koltsegek'] },
      { id: 'oligopolium', term: 'Oligopólium', en: 'oligopoly', topic: 'vallalat',
        short: 'Kevés, egymás döntéseire stratégiailag reagáló nagy vállalat által uralt piac. Elemzésének eszköze a játékelmélet; az eredmény a monopólium és a verseny között van.',
        prereq: ['linearis-algebra/matrix'],
        text: 'Az oligopólium jellemzője a **kölcsönös függőség**: egy vállalat profitja a riválisok döntéseitől is függ (mobilszolgáltatók, légitársaságok, kereskedelmi repülőgépgyártás). Ezért a vállalatok stratégiai szereplők.\n\nAlapmodellek:\n\n- **Cournot-modell**: a vállalatok mennyiségben versenyeznek, mindegyik a másik mennyiségét adottnak véve maximalizál. Az eredmény Nash-egyensúly; n vállalat esetén a teljes kibocsátás `n/(n + 1)`-szerese a versenyzői mennyiségnek.\n- **Bertrand-modell**: árverseny homogén termékkel – már két vállalat esetén is P = MC adódik (Bertrand-paradoxon).\n- **Stackelberg-modell**: van egy vezető, amely elsőként dönt.\n\nA **fogolydilemma** megmutatja, miért nehéz a kartell fenntartása: közösen a magas ár lenne a legjobb, de egyénileg mindegyiknek megéri alákínálni. A **Nash-egyensúly** olyan stratégiakombináció, amelyből egyik szereplőnek sem éri meg egyoldalúan eltérni.\n\nA kartell (árak vagy mennyiségek összehangolása) a legtöbb jogrendszerben, így az EU-ban és Magyarországon is tilos; a versenyhatóság bírságot szabhat ki.\n\nA piaci koncentráció mérőszáma a **Herfindahl–Hirschman-index** (HHI): a piaci részesedések (százalékban) négyzetösszege.',
        example: 'Cournot-duopólium: P = 100 − Q, MC = 20. A reakciófüggvények `q₁ = (80 − q₂)/2` és `q₂ = (80 − q₁)/2`, megoldás `q₁ = q₂ = 80/3 ≈ 26,7`, Q ≈ 53,3, **P ≈ 46,7**. Összevetés: monopólium P = 60, Q = 40; verseny P = 20, Q = 80. HHI négy egyenlő vállalatra: `4·25² = 2500`.',
        pitfall: 'A Nash-egyensúly nem feltétlenül a szereplők számára legjobb kimenetel (a fogolydilemmában mindkettő rosszabbul jár, mint együttműködve) – és nem is feltétlenül társadalmilag optimális.',
        formulas: ['mrmc-f'],
        related: ['monopolium', 'tokeletes-verseny', 'profitmaximalizalas', 'hatarelemzes', 'externalia'] },
      { id: 'externalia', term: 'Externália (külső gazdasági hatás)', en: 'externality', topic: 'vallalat',
        short: 'Egy gazdasági szereplő tevékenységének olyan hatása másokra, amelyet a piaci ár nem tükröz. Negatív externália (szennyezés) esetén a piac túltermel, pozitívnál (oltás, kutatás) alultermel.',
        visual: kgExt, caption: 'Negatív externália: a társadalmi határköltség (MSC) a magánköltség (MPC) fölött van. A piac 70 egységet termel a társadalmilag optimális 55 helyett; a narancs háromszög a holtteher-veszteség.',
        text: 'Az externália a **piaci kudarc** egyik fő formája: a döntéshozó nem viseli tevékenysége teljes költségét (vagy nem kapja meg teljes hasznát), ezért a piaci egyensúly eltér a társadalmi optimumtól.\n\n- **Negatív termelési externália**: gyári szennyezés, zaj. Itt `MSC = MPC + külső határköltség`.\n- **Pozitív externália**: védőoltás (a beoltott a többieket is védi), alapkutatás, oktatás. Itt `MSB = MPB + külső határhaszon`.\n\nKezelési lehetőségek (mindegyiknek megvannak a maga előnyei és korlátai):\n\n- **Pigou-adó** (vagy pozitív externáliánál támogatás) a külső határköltség nagyságában: a szereplő „belsővé teszi” (internalizálja) a hatást;\n- **szabályozás**: kibocsátási határértékek, technológiai előírások;\n- **forgalmazható kibocsátási jogok** (cap-and-trade, például az EU ETS): a mennyiséget rögzítik, az árat a piac alakítja ki;\n- **Coase-tétel**: ha a tulajdonjogok világosak és a tranzakciós költségek alacsonyak, az érintettek alkuval is elérhetik a hatékony megoldást – a jogok kezdeti elosztásától függetlenül (de az elosztás a jövedelmet befolyásolja).',
        example: 'D: P = 80 − Q/2, MPC: P = 10 + Q/2, külső kár egységenként 15. Piaci egyensúly: `80 − Q/2 = 10 + Q/2` → Q = 70. Optimum: `80 − Q/2 = 25 + Q/2` → Q = 55. Holtteher-veszteség: `½·(70 − 55)·15 = 112,5`. Egységenként 15 Ft-os Pigou-adó a piacot Q = 55-re viszi.',
        pitfall: 'A társadalmi optimum általában nem a nulla szennyezés: addig érdemes csökkenteni, amíg a csökkentés határköltsége kisebb, mint az elkerült kár. A pénzbeli kifizetés (például egy adó, amit valaki befizet) önmagában nem externália – az csak a piacon kívüli, nem kompenzált hatás.',
        related: ['kozjavak', 'tobblet', 'hatarelemzes', 'kinalat', 'fiskalis-politika'] },
      { id: 'kozjavak', term: 'Közjavak', en: 'public goods', topic: 'vallalat',
        short: 'Olyan javak, amelyek fogyasztásából senkit nem lehet (vagy nem éri meg) kizárni, és egy ember fogyasztása nem csökkenti a többiekét. Ilyen a honvédelem, a közvilágítás vagy az árvízvédelem. A piac hajlamos alultermelni őket.',
        text: 'A javakat két tulajdonság szerint szokás osztályozni:\n\n- **kizárhatóság**: meg lehet-e akadályozni, hogy a nem fizető használja?\n- **rivalizálás** (versengés): az én fogyasztásom csökkenti-e a tiédet?\n\nEz négy csoportot ad:\n\n- **magánjavak**: kizárható és rivalizáló (kenyér, ruha);\n- **klubjavak**: kizárható, nem rivalizáló (fizetős streaming, kevéssé zsúfolt fizetős út);\n- **közös erőforrások**: nem kizárható, de rivalizáló (halállomány a nyílt tengeren, legelő) – a **közlegelők tragédiája**: mindenki túlhasználja;\n- **tiszta közjavak**: nem kizárható, nem rivalizáló.\n\nA közjavak problémája a **potyautas-probléma** (free rider): mivel a jószág annak is elérhető, aki nem fizet, mindenki abban érdekelt, hogy a költséget más állja. Ezért az önkéntes piaci finanszírozás jellemzően elmarad a hatékony szinttől.\n\nA hatékony mennyiség feltétele (Samuelson-szabály): az egyéni határhasznok **függőleges összege** egyenlő a határköltséggel. Finanszírozási lehetőségek: adóból történő állami biztosítás, önkéntes hozzájárulás (adomány, közösségi finanszírozás), illetve technológiai kizárhatóság megteremtése.',
        example: 'Egy 1000 lakosú falu árvízvédelmi gátja 300 000 Ft-ba kerül, mindenkinek 500 Ft-ot ér – összesen 500 000 Ft, tehát társadalmilag megéri. Önkéntes alapon azonban mindenki arra számít, hogy a gát a többiek pénzéből is megépül, így a gyűjtés könnyen elmarad a szükséges összegtől.',
        pitfall: 'A „közjószág” nem azonos az állam által előállított jószággal: az állam magánjavakat is biztosít (például oktatást, egészségügyi ellátást), és közjószágot is előállíthat magánszereplő (nyílt forráskódú szoftver).',
        related: ['externalia', 'szukosseg', 'fiskalis-politika', 'tobblet'] },

      /* ----- Makrogazdaság ----- */
      { id: 'gdp', term: 'GDP (bruttó hazai termék)', en: 'gross domestic product (GDP)', topic: 'makro',
        short: 'Egy ország területén adott időszak (negyedév, év) alatt előállított összes végső termék és szolgáltatás piaci értéke. A gazdasági teljesítmény legfontosabb mérőszáma.',
        prereq: ['lecke:penzugy/koltsegvetes'],
        text: 'Kulcsszavak a definícióban:\n\n- **végső** termékek: a köztes termékeket (a pék által vett liszt) nem számoljuk külön, különben kétszer számolnánk; ugyanezt adja a **hozzáadott értékek** összege;\n- **hazai**: az ország területén, a termelő nemzetiségétől függetlenül. A **GNI** (bruttó nemzeti jövedelem) a hazai lakosok jövedelmét méri, bárhol keletkezett;\n- **piaci érték**: a nem piaci tevékenység (háztartási munka, önkéntesség) és az árnyékgazdaság jórészt kimarad.\n\n**Nominális GDP**: folyó árakon. **Reál-GDP**: egy bázisév árain, így az árváltozás hatását kiszűri; a **GDP-deflátor** = nominális/reál GDP · 100. A gazdasági növekedést a reál-GDP százalékos változása méri.\n\nA kiadási oldali felbontás: `Y = C + I + G + NX`.\n\nKorlátok: a GDP nem méri közvetlenül a jólétet – nem veszi figyelembe a jövedelemeloszlást, a szabadidőt, a környezeti károkat, a háztartási munkát. Az **egy főre jutó GDP vásárlóerő-paritáson** (PPP) alkalmasabb országok életszínvonalának összevetésére.',
        example: 'Egy gazdaságban C = 600, I = 200, G = 250, export 450, import 500 mrd Ft → `GDP = 600 + 200 + 250 + (450 − 500) = 1000` mrd Ft. Ha a következő évben a nominális GDP 1100, a deflátor 106, akkor a reál-GDP `1100/1,06 ≈ 1038`, a reálnövekedés ≈ 3,8%.',
        pitfall: 'A használt autó eladása vagy egy részvény vásárlása nem növeli a GDP-t (nem most termelték, illetve pénzügyi tranzakció). Az állami nyugdíjkifizetés sem része G-nek – az transzfer, és csak akkor jelenik meg, amikor a nyugdíjas elkölti (C).',
        formulas: ['gdp-f'],
        related: ['gazdasagi-ciklus', 'inflacio', 'munkanelkuliseg', 'fiskalis-politika', 'arfolyam'] },
      { id: 'inflacio', term: 'Infláció', en: 'inflation', topic: 'makro',
        short: 'Az általános árszínvonal tartós emelkedése, azaz a pénz vásárlóerejének csökkenése. Leggyakoribb mérőszáma a fogyasztóiár-index (CPI) éves változása.',
        prereq: ['lecke:penzugy/kamat-inflacio', 'lecke:matematika/szazalek'],
        text: 'A **fogyasztóiár-index** egy reprezentatív **fogyasztói kosár** árának változását követi; a súlyokat a háztartások kiadási szerkezete adja. Ha a CPI egy év alatt 100-ról 104,5-re nő, az infláció 4,5%. A **maginfláció** a legingadozóbb tételek (energia, nyers élelmiszer) nélkül számolt mutató, jobban jelzi a tartós trendet.\n\nFogalmak:\n\n- **dezinfláció**: az infláció üteme csökken, de az árak még nőnek;\n- **defláció**: az árszínvonal csökken;\n- **hiperinfláció**: havi 50% fölötti infláció (Magyarország 1946: a valaha mért legmagasabb).\n\nOkai (a tankönyvek szokásos csoportosítása):\n\n- **keresleti infláció**: az aggregált kereslet gyorsabban nő, mint a termelési kapacitás;\n- **költséginfláció**: kínálati sokk (energiaár-emelkedés, bérköltség);\n- **várakozások**: ha mindenki áremelkedésre számít, bér- és árdöntéseiben beépíti azt;\n- hosszú távon a **pénzmennyiség** növekedése és az infláció szorosan összefügg (mennyiségi pénzelmélet: `M·V = P·Y`).\n\nKöltségei: a nem várt infláció újraosztja a vagyont (az adósok nyernek, a hitelezők és a fix jövedelműek veszítenek), bizonytalanságot kelt, torzítja a relatív árak jelzéseit. A legtöbb jegybank ezért alacsony, stabil inflációt céloz (az MNB célja 3% ± 1 százalékpont).',
        example: 'A nominálbér 8%-kal, az árszínvonal 4,5%-kal nő. A reálbér változása: `1,08/1,045 − 1 ≈ 3,35%` (közelítőleg 8 − 4,5 = 3,5%). 5%-os éves inflációnál a pénz vásárlóereje `ln 2/ln 1,05 ≈ 14,2` év alatt feleződik.',
        pitfall: 'Egyetlen termék drágulása nem infláció – az csak a relatív ár változása. Az infláció csökkenése sem jelenti, hogy az árak csökkennek: csak lassabban nőnek (dezinfláció).',
        formulas: ['fisher-f'],
        related: ['monetaris-politika', 'jelenertek', 'gdp', 'munkanelkuliseg', 'gazdasagi-ciklus', 'arfolyam'] },
      { id: 'munkanelkuliseg', term: 'Munkanélküliség', en: 'unemployment', topic: 'makro',
        short: 'Munkanélküli az, aki nem dolgozik, aktívan keres munkát, és két héten belül munkába tudna állni. A munkanélküliségi ráta a munkanélküliek aránya a munkaerőpiacon aktívak (foglalkoztatottak + munkanélküliek) között.',
        text: 'A népesség munkaerőpiaci felosztása (ILO-definíció szerint):\n\n- **foglalkoztatott**: a vizsgált héten legalább egy órát dolgozott jövedelemért;\n- **munkanélküli**: nem dolgozott, az elmúlt négy hétben aktívan keresett munkát, és két héten belül munkába tudna állni;\n- **inaktív**: a többi (diák, nyugdíjas, háztartásbeli, aki nem keres munkát).\n\n`munkanélküliségi ráta = U/(E + U)`, `aktivitási ráta = (E + U)/munkaképes korú népesség`.\n\nTípusai:\n\n- **súrlódásos**: munkahelyváltás, pályakezdés ideje – mindig van, és bizonyos mértékig hasznos (jobb illeszkedés);\n- **strukturális**: a keresett és a kínált készségek, földrajzi helyek tartós eltérése (például egy iparág hanyatlásakor);\n- **ciklikus**: a recesszió miatti keresletcsökkenésből fakad.\n\nA súrlódásos és strukturális együtt a **természetes ráta** (NAIRU-hoz közeli fogalom): az a szint, amely a ciklus „normál” állapotában is fennáll. **Okun-törvénye** szerint a ciklikus munkanélküliség és a kibocsátási rés ellentétesen mozog (tapasztalati ökölszabály: 1 százalékpontnyi munkanélküliség-növekedés kb. 2%-os negatív kibocsátási réssel jár; az együttható országonként eltér).',
        example: 'Egy országban 4 750 000 foglalkoztatott és 250 000 munkanélküli van. `ráta = 250 000/5 000 000 = 5,0%`. Ha 50 000 munkanélküli feladja a keresést (inaktívvá válik), a ráta `200 000/4 950 000 ≈ 4,0%`-ra esik – úgy, hogy senki nem talált munkát.',
        pitfall: 'A munkanélküliségi ráta nem a „munkával nem rendelkezők aránya a népességben”: az inaktívak (diákok, nyugdíjasok) nem munkanélküliek. A regisztrált álláskeresők száma (hivatali adat) és a felmérésen alapuló ILO-munkanélküliség eltérhet.',
        related: ['gazdasagi-ciklus', 'gdp', 'inflacio', 'fiskalis-politika', 'termelesi-lehetosegek'] },
      { id: 'gazdasagi-ciklus', term: 'Gazdasági ciklus (konjunktúraciklus)', en: 'business cycle', topic: 'makro',
        short: 'A reál-GDP és a vele együtt mozgó mutatók (foglalkoztatás, beruházás) ismétlődő, de szabálytalan ingadozása a hosszú távú növekedési trend körül: fellendülés, csúcs, visszaesés (recesszió), mélypont.',
        visual: kgCycle, caption: 'A tényleges reál-GDP (kék) ingadozik a potenciális kibocsátás trendje (szaggatott) körül. A kettő különbsége a kibocsátási rés.',
        text: 'A **potenciális GDP** az a kibocsátás, amelyet a gazdaság erőforrásai normál kihasználtságával, gyorsuló infláció nélkül elő tud állítani. A tényleges és a potenciális GDP különbsége a **kibocsátási rés** (output gap):\n\n- **negatív rés** (recesszióban): kihasználatlan kapacitás, ciklikus munkanélküliség, mérséklődő inflációs nyomás;\n- **pozitív rés** (konjunktúra csúcsán): túlfeszített kapacitások, munkaerőhiány, gyorsuló inflációs nyomás.\n\nA ciklus fázisai: **expanzió** (fellendülés) → **csúcs** → **recesszió** (visszaesés) → **mélypont** → újabb expanzió. Gyakori gyakorlati ökölszabály: **technikai recesszió**, ha a szezonálisan kiigazított reál-GDP két egymást követő negyedévben csökken.\n\nA ciklusok okairól több elméleti iskola létezik: keresleti sokkok (keynesi hagyomány), technológiai és kínálati sokkok (reálüzleti ciklus elmélet), pénzügyi ciklusok (hitelezési fellendülés és visszarendeződés). A mutatók viselkedése szerint: **prociklikus** (beruházás, foglalkoztatás), **anticiklikus** (munkanélküliség), **előrejelző** (beszerzésimenedzser-index, rendelésállomány).\n\nA **stabilizációs politika** – fiskális és monetáris eszközökkel – a ciklus kilengéseit igyekszik mérsékelni.',
        example: 'Negyedéves reál-GDP-növekedés (előző negyedévhez képest): +0,6%, +0,2%, −0,3%, −0,4%, +0,1%. A 3. és 4. negyedév két egymást követő csökkenés → technikai recesszió; a mélypont a 4. negyedév, az 5.-ben indul az új expanzió.',
        pitfall: 'A „ciklus” nem jelent szabályos periódust: a fázisok hossza és mélysége nagyon eltérő, ezért nem jósolható meg, mint egy szinuszhullám. A növekedés lassulása (pozitív, de kisebb ütem) még nem recesszió.',
        related: ['gdp', 'munkanelkuliseg', 'inflacio', 'fiskalis-politika', 'monetaris-politika'] },
      { id: 'fiskalis-politika', term: 'Költségvetési (fiskális) politika', en: 'fiscal policy', topic: 'makro',
        short: 'Az állam bevételeivel (adók) és kiadásaival (vásárlások, transzferek) kapcsolatos döntések összessége, amelyekkel a kormány az aggregált keresletet, az erőforrás-elosztást és a jövedelemelosztást befolyásolja.',
        prereq: ['lecke:penzugy/ber-ado', 'analizis/vegtelen-sor'],
        text: 'A **költségvetési egyenleg** = bevételek − kiadások; ha negatív, **hiány** (deficit), amelyet hitelfelvétellel finanszíroznak, és ez növeli az **államadósságot**. Az EU szabályai (Stabilitási és Növekedési Paktum) referenciaértékként 3%-os hiányt és 60%-os adósságot határoznak meg a GDP arányában.\n\nStabilizációs szerep a keynesi modellben:\n\n- **expanzív** fiskális politika (kiadásnövelés, adócsökkentés) recesszióban növeli a keresletet;\n- **restriktív** (megszorító) politika túlfűtöttség esetén mérsékli.\n\nA kiadásnövelés hatása a **multiplikátoron** keresztül többszöröződhet, mert a kiadás másoknak jövedelem, amelyet részben elköltenek.\n\n**Automatikus stabilizátorok**: progresszív vagy arányos adók és munkanélküli-ellátás – recesszióban automatikusan csökken az adóbevétel és nő a transzfer, így tompítják a ciklust, külön döntés nélkül.\n\nA közgazdasági vitákban felmerülő korlátozó tényezők: a **kiszorítási hatás** (az állami hitelfelvétel emelheti a kamatot és csökkentheti a magánberuházást), a döntési és hatásbeli **késések**, az adósság fenntarthatósága, valamint a racionális várakozások (Ricardo-féle ekvivalencia). A hatás mértéke empirikus kérdés, és a gazdaság állapotától függ.',
        example: 'Zárt gazdaság, MPC = 0,8, adó nélkül: `k = 1/(1 − 0,8) = 5`; 100 mrd Ft többletkiadás a modell szerint 500 mrd Ft-tal növeli az egyensúlyi kibocsátást. 25%-os arányos adóval: `k = 1/(1 − 0,8·0,75) = 2,5`, a hatás 250 mrd Ft.',
        pitfall: 'A költségvetési hiány (egy év folyama) és az államadósság (felhalmozott állomány) nem ugyanaz: csökkenő hiány mellett is nőhet az adósság. A transzfer (nyugdíj, családi pótlék) nem része a GDP-ben szereplő G-nek.',
        formulas: ['multiplikator-f', 'gdp-f'],
        related: ['monetaris-politika', 'gdp', 'gazdasagi-ciklus', 'munkanelkuliseg', 'kozjavak', 'externalia'] },
      { id: 'monetaris-politika', term: 'Monetáris politika és jegybanki alapkamat', en: 'monetary policy; central bank policy rate', topic: 'makro',
        short: 'A jegybank (Magyarországon az MNB) azon döntései, amelyekkel a pénz és a hitel árát (kamatszintet) és mennyiségét befolyásolja – elsődlegesen az árstabilitás érdekében. Fő eszköze az irányadó kamat (alapkamat).',
        prereq: ['lecke:penzugy/bank', 'lecke:penzugy/kamat-inflacio', 'lecke:penzugy/hitel'],
        text: 'A modern jegybankok többsége **inflációs célkövetést** folytat: nyilvánosan bejelentett inflációs célt (az MNB-nél 3%, ±1 százalékpontos toleranciasávval, az EKB-nál 2%) igyekszik középtávon elérni.\n\nAz **alapkamat** (irányadó ráta) az a kamat, amelyen a jegybank a kereskedelmi bankoknak hitelt nyújt vagy betétet fogad tőlük. Ez befolyásolja a bankközi kamatokat, majd ezen keresztül a hitel- és betéti kamatokat. A **monetáris transzmisszió** csatornái:\n\n- **kamatcsatorna**: magasabb kamat → drágább hitel, vonzóbb megtakarítás → kisebb fogyasztás és beruházás;\n- **árfolyamcsatorna**: magasabb kamat → vonzóbb hazai eszközök → erősödő árfolyam → olcsóbb import;\n- **várakozási csatorna**: a hiteles jegybank a várakozásokon keresztül is hat;\n- **hitelcsatorna** és **eszközárcsatorna**.\n\nA hatás késéssel (jellemzően 1–2 év) jelentkezik. **Szigorító** (restriktív) politika: kamatemelés az infláció mérséklésére; **lazító**: kamatcsökkentés a kereslet élénkítésére. Ha a kamat a nulla közelébe ér, nem hagyományos eszközök is használatosak (eszközvásárlás, „mennyiségi lazítás”, előretekintő iránymutatás).\n\nA jegybanki függetlenség célja, hogy a monetáris döntések középtávú célokat szolgáljanak.',
        example: 'Egy 10 millió Ft-os változó kamatozású vállalati hitel kamata a jegybanki kamathoz kötött, alapkamat + 2 százalékpont. Ha az alapkamat 4%-ról 6%-ra nő, az éves kamatteher `10 000 000·0,06 = 600 000` Ft-ról `10 000 000·0,08 = 800 000` Ft-ra emelkedik.',
        pitfall: 'A jegybank nem a bolti árakat szabja meg, és nem közvetlenül „nyomtat pénzt” a költségvetésnek (az EU-ban a monetáris finanszírozás tilos). A kamatemelés nem azonnal hat: a döntés és az inflációs hatás között jellemzően több negyedév telik el.',
        formulas: ['fisher-f'],
        related: ['inflacio', 'fiskalis-politika', 'arfolyam', 'jelenertek', 'gazdasagi-ciklus'] },

      /* ----- Nemzetközi és pénzügyi alapok ----- */
      { id: 'komparativ-elony', term: 'Komparatív előny', en: 'comparative advantage', topic: 'nemzetkozi',
        short: 'Egy ország (vagy személy) komparatív előnnyel rendelkezik egy termék előállításában, ha annak alternatívaköltsége nála kisebb, mint másoknál. Ricardo tétele: a specializáció és a kereskedelem akkor is kölcsönösen előnyös, ha az egyik félnek mindenben abszolút előnye van.',
        visual: kgComp, caption: 'Ricardo-típusú példa: A ország mindkét termékben hatékonyabb (abszolút előny), de a szövet alternatívaköltsége B országban kisebb – B-nek a szövetben, A-nak a búzában van komparatív előnye.',
        text: 'David Ricardo (1817) felismerése, hogy a kereskedelem előnye nem az **abszolút**, hanem a **relatív** termelékenységből fakad. Az **abszolút előny** azt jelenti, hogy valaki kevesebb erőforrással állít elő egy terméket; a **komparatív előny** azt, hogy kisebb az alternatívaköltsége.\n\nA logika lépései:\n\n1. Kiszámítjuk mindkét fél alternatívaköltségét mindkét termékre.\n2. Mindenki arra specializálódik, amiben kisebb az alternatívaköltsége.\n3. Ha a **cserearány** (terms of trade) a két alternatívaköltség közé esik, mindkét fél többet fogyaszthat, mint önellátóként – a fogyasztási lehetőségei kívül kerülnek a saját termelési lehetőségek határán.\n\nUgyanez az elv magyarázza a személyek közötti munkamegosztást: egy kiváló sebész akkor is megéri, ha nem maga gépeli a leleteit, még ha gyorsabban gépel is, mint az asszisztense.\n\nA modell egyszerűsít (két ország, két termék, állandó alternatívaköltség, nincsenek szállítási költségek). Az elmélet azt is mutatja, hogy a kereskedelemből származó nyereség egy országon belül **nem egyenletesen oszlik el**: egyes ágazatok és munkavállalók nyernek, mások veszíthetnek – ez a kereskedelempolitikai viták egyik forrása.',
        example: 'A: 1 t búza 1 óra, 1 vég szövet 2 óra → 1 szövet = 2 t búza. B: 1 t búza 6 óra, 1 szövet 3 óra → 1 szövet = 0,5 t búza. B-nek a szövetben van komparatív előnye (0,5 < 2), A-nak a búzában (A-nál 1 búza = 0,5 szövet, B-nél 2 szövet). Ha 1 szövetet 1 t búzáért cserélnek: A 1 óra munkával (1 t búza) jut egy szövethez a saját 2 órája helyett, B pedig 3 óra munkával (1 szövet) kap 1 t búzát a saját 6 órája helyett – mindketten nyernek.',
        pitfall: 'Az, hogy egy országnak mindenben abszolút hátránya van, nem jelenti, hogy nem tud előnyösen kereskedni – mindig van komparatív előnye valamiben (hacsak az alternatívaköltségek nem pontosan egyenlők). A komparatív előny nem rögzített: technológiával, beruházással, oktatással változik.',
        related: ['alternativakoltseg', 'termelesi-lehetosegek', 'arfolyam', 'szukosseg'] },
      { id: 'arfolyam', term: 'Árfolyam', en: 'exchange rate', topic: 'nemzetkozi',
        short: 'Két valuta cserearánya: megmutatja, hány egység hazai pénzt kell adni egy egység külföldi pénzért (pl. 400 Ft/euró). A forint gyengülése azt jelenti, hogy egy euró több forintba kerül.',
        prereq: ['lecke:penzugy/bank'],
        text: 'Magyarországon az árfolyamot általában **közvetlen jegyzésben** adják meg (Ft/EUR, Ft/USD). Ha az EUR/HUF 390-ről 410-re nő, a forint **leértékelődött** (gyengült), az euró felértékelődött.\n\nAz árfolyam hatásai:\n\n- **gyengülő** hazai valuta: az export külföldön olcsóbb (versenyképesebb), az import drágább – emeli az import termékek forintárát, és így az inflációt;\n- **erősödő** hazai valuta: olcsóbb import, kisebb inflációs nyomás, de nehezebb helyzetben lévő exportőrök.\n\n**Árfolyamrendszerek**: lebegő (a piac alakítja, a jegybank legfeljebb beavatkozik), rögzített (a jegybank tartja az árfolyamot, ehhez devizatartalék kell), valutatanács, illetve közös valuta (euróövezet).\n\nAz árfolyamot befolyásolja a **kamatkülönbözet** (magasabb hazai kamat vonzza a tőkét), az inflációs különbség, a folyó fizetési mérleg, a kockázati megítélés és a várakozások. Hosszú távon a **vásárlóerő-paritás** (PPP) elmélete szerint az árfolyam a két ország árszínvonalainak arányához közelít – rövid távon ettől jelentősen eltérhet.\n\nA **reálárfolyam** a nominális árfolyamot az árszínvonalakkal korrigálja, és a valódi versenyképességet mutatja: `reálárfolyam = nominális árfolyam · P_külföld / P_hazai`.',
        example: 'Egy 50 eurós németországi alkatrész 400 Ft/EUR mellett `50·400 = 20 000` Ft. Ha a forint 410 Ft/EUR-ra gyengül, 20 500 Ft-ba kerül (+2,5%). Egy magyar exportőr 1 000 000 Ft-os terméke ugyanakkor 2500 euró helyett ≈ 2439 euró lesz a külföldi vevőnek.',
        pitfall: 'Az árfolyam „nő” vagy „csökken” kifejezés jegyzésmódtól függ: Ft/EUR növekedése a **forint gyengülése**. A gyenge valuta nem egyértelműen „jó” vagy „rossz”: az exportőröknek kedvez, az importőröknek és a devizában eladósodottaknak nem.',
        related: ['monetaris-politika', 'inflacio', 'komparativ-elony', 'gdp', 'jelenertek'] },
      { id: 'jelenertek', term: 'Kamat, jelenérték és diszkontálás', en: 'interest, present value and discounting', topic: 'nemzetkozi',
        short: 'A kamat a pénz időértékének ára. A diszkontálás a jövőbeli pénzösszegeket a kamatlábbal mai értékre (jelenértékre) számítja át: PV = FV/(1 + r)^n. A reálkamat az inflációval csökkentett kamat.',
        prereq: ['lecke:penzugy/kamat-inflacio', 'lecke:penzugy/befektetes', 'analizis/exponencialis-novekedes', 'analizis/vegtelen-sor'],
        text: 'Ma egy forint többet ér, mint egy év múlva egy forint, mert:\n\n- befektethető, és kamatot hoz (a pénz **alternatívaköltsége**);\n- az infláció csökkentheti a vásárlóerejét;\n- a jövőbeli kifizetés bizonytalan (kockázat).\n\n**Kamatos kamat**: n év alatt `FV = PV·(1 + r)^n`. A **diszkontálás** ennek megfordítása: `PV = FV/(1 + r)^n`. A diszkontráta a hasonló kockázatú alternatív befektetés hozama.\n\n**Nettó jelenérték** (NPV): egy beruházás összes jövőbeli pénzáramának jelenértéke mínusz a kezdő ráfordítás. A döntési szabály: **NPV > 0** esetén a beruházás többet hoz, mint az alternatív befektetés – érdemes megvalósítani. Az a diszkontráta, amelynél NPV = 0, a **belső megtérülési ráta** (IRR).\n\nNevezetes formulák:\n\n- **örökjáradék**: `PV = C/r`;\n- **annuitás** (n éven át C): `PV = C·(1 − (1 + r)^(−n))/r`.\n\n**Nominál- és reálkamat**: a Fisher-összefüggés szerint `(1 + i) = (1 + r)(1 + π)`, közelítőleg `r ≈ i − π`. A kamatlábak összevetésére az **EBKM**, illetve hiteleknél a **THM** szolgál, amelyek az összes költséget éves szintre számítják.',
        example: 'PV: 1 000 000 Ft 3 év múlva 6%-on `1 000 000/1,06³ ≈ 839 619` Ft. Beruházás: ma 1000, utána 3 éven át évi 400. 10%-os diszkontrátával `NPV = −1000 + 400/1,1 + 400/1,21 + 400/1,331 ≈ −5,3` → nem éri meg; 5%-kal `NPV ≈ +89,3` → megéri. Fisher: i = 8%, π = 5% → `r = 1,08/1,05 − 1 ≈ 2,86%`.',
        pitfall: 'A különböző időpontokban esedékes pénzösszegeket nem szabad egyszerűen összeadni – előbb közös időpontra (jellemzően mára) kell diszkontálni. A kamatlábat az időszakhoz kell igazítani: havi kifizetéseknél havi kamatlábbal és hónapokban mért n-nel számolunk.',
        formulas: ['jelenertek-f', 'fisher-f'],
        related: ['alternativakoltseg', 'inflacio', 'monetaris-politika', 'arfolyam', 'profitmaximalizalas'] },

      /* ----- Bővítés: fogyasztói döntés ----- */
      { id: 'hasznossag', term: 'Hasznosság és csökkenő határhaszon', en: 'utility and diminishing marginal utility', topic: 'fogyaszto',
        short: 'A hasznosság a fogyasztásból származó elégedettség elméleti mértéke; a határhaszon az utolsó, pótlólagos egység által hozott többlethaszon, amely a fogyasztott mennyiség növekedésével jellemzően csökken.',
        prereq: ['analizis/derivalt'],
        text: 'A **teljes haszon** (TU) a fogyasztott mennyiség függvénye, a **határhaszon** `MU = ΔTU/ΔQ` (folytonos esetben a derivált). A **csökkenő határhaszon törvénye** (Gossen első törvénye, 1854): ugyanabból a jószágból minden további egység egyre kevesebb többletelégedettséget ad. A teljes haszon addig nő, amíg a határhaszon pozitív, és ott maximális, ahol a határhaszon nulla.\n\nA **határhaszon-elmélet** (Jevons, Menger, Walras, 1870-es évek, „marginalista forradalom”) oldotta fel a **víz–gyémánt paradoxont**: a víz teljes haszna óriási, de mivel bőven van, az utolsó pohár határhaszna – és így az ára – kicsi; a gyémánt ritka, ezért határhaszna és ára magas. **Az árat a határhaszon, nem a teljes haszon határozza meg.**\n\n**Gossen második törvénye** (kiegyenlítődés): korlátozott jövedelmét a fogyasztó akkor osztja el optimálisan, ha minden jószágra az **utolsó forintért kapott határhaszon egyenlő** – lásd a képletet. Ha egy jószágnál nagyobb, abból érdemes többet venni a másik rovására.\n\n**Kardinális vagy ordinális?** A klasszikus elmélet mérhetőnek („útil”) tekintette a hasznot. A modern elmélet csak **sorrendet** feltételez (A-t jobban szereti, mint B-t); a döntésekhez ez is elég, és a közömbösségi görbék ezt ábrázolják. A hasznosság tehát modellfogalom, nem mérőműszerrel mért mennyiség.',
        example: 'Pizzaszeletek határhaszna: 10, 8, 5, 1, −2 egység. A teljes haszon 10, 18, 23, 24, 22 – a negyedik szeletnél maximális, az ötödik már ront (MU < 0). Ha egy szelet ára 4 egység hasznot érő pénz, a racionális fogyasztó 3 szeletet vesz: a 4. szelet (MU = 1) nem éri meg az árát.',
        pitfall: 'A csökkenő határhaszon nem jelenti, hogy a teljes haszon csökken: amíg MU pozitív, a teljes haszon nő, csak egyre lassabban. Két ember hasznosságát összeadni vagy összehasonlítani az ordinális elméletben nem lehet.',
        formulas: ['fogyasztoi-optimum-f'],
        related: ['kozombossegi-gorbe', 'jovedelmi-helyettesitesi', 'kereslet', 'hatarelemzes', 'tobblet'] },
      { id: 'kozombossegi-gorbe', term: 'Közömbösségi görbe, költségvetési egyenes és a fogyasztói optimum', en: 'indifference curve, budget line and consumer equilibrium', topic: 'fogyaszto',
        short: 'A közömbösségi görbe azokat a jószágkosarakat köti össze, amelyek a fogyasztónak egyformán kedvesek; a költségvetési egyenes a jövedelemből megvehető kosarak határa; az optimum ott van, ahol a legmagasabb elérhető közömbösségi görbe érinti a költségvetési egyenest.',
        prereq: ['lecke:matematika/linearis-fuggveny', 'analizis/derivalt'],
        text: '**Preferenciák** szokásos feltevései: teljesség (bármely két kosár összevethető), tranzitivitás, „több jobb” (monotonitás), és a **konvexitás** (a vegyes kosarakat jobban szeretjük a szélsőségeseknél). Ezekből következik, hogy a közömbösségi görbék lefelé lejtenek, origóra konvexek, és **nem metszik egymást**; a jobbra fent lévők magasabb elégedettséget jelentenek.\n\nA görbe meredekségének abszolút értéke a **helyettesítési határráta**: `MRS = MU_x / MU_y` – hány egység y-ról mondana le a fogyasztó egy további x-ért. A konvexitás miatt az MRS a görbén lefelé haladva csökken.\n\n**Költségvetési egyenes**: `p_x · x + p_y · y = I`. Tengelymetszetei `I/p_x` és `I/p_y`, meredeksége `−p_x / p_y` (a piaci cserearány). Jövedelemnövekedés párhuzamosan kifelé tolja, az egyik ár változása elforgatja.\n\n**Optimum** (belső megoldásnál): az érintési pontban a két meredekség egyenlő:\n\n`MRS = MU_x / MU_y = p_x / p_y`, átrendezve `MU_x / p_x = MU_y / p_y`.\n\nA szubjektív cserearány (mennyit érne meg) egyezik a piacival (mennyibe kerül). Ha `MRS > p_x/p_y`, x-ből többet érdemes venni. Az ár változtatásával kapott optimumpontokból rajzolható ki a **keresleti görbe**.\n\nSarokmegoldás is lehetséges: ha valaki egy jószágot egyáltalán nem vesz, ott az érintési feltétel nem teljesül.',
        example: 'U = x · y, I = 6000 Ft, p_x = 500 Ft, p_y = 1000 Ft. MU_x = y, MU_y = x, az optimumban `y/x = 500/1000`, tehát x = 2y. Behelyettesítve: `500 · 2y + 1000 · y = 6000` → y = 3, x = 6. Ellenőrzés: `3000 + 3000 = 6000` Ft – ennél a hasznosságfüggvénynél a jövedelem fele-fele arányban oszlik meg.',
        pitfall: 'A közömbösségi görbe nem a „megvásárolható” kosarakat mutatja (az a költségvetési egyenes), hanem az egyformán kedvelteket. Két görbe metszése ellentmondana a tranzitivitásnak, ezért helyes ábrán sosem metszik egymást.',
        formulas: ['fogyasztoi-optimum-f'],
        related: ['hasznossag', 'jovedelmi-helyettesitesi', 'kereslet', 'alternativakoltseg', 'termelesi-lehetosegek'] },
      { id: 'jovedelmi-helyettesitesi', term: 'Helyettesítési és jövedelmi hatás; normál, alsóbbrendű és Giffen-jószág', en: 'substitution and income effects; normal, inferior and Giffen goods', topic: 'fogyaszto',
        short: 'Egy ár változásának hatása két részre bontható: a helyettesítési hatás a relatív árak változásából fakad (mindig az olcsóbbá vált jószág felé terel), a jövedelmi hatás a vásárlóerő változásából; utóbbi iránya attól függ, normál vagy alsóbbrendű-e a jószág.',
        text: 'Ha egy jószág olcsóbb lesz, két dolog történik egyszerre:\n\n1. **helyettesítési hatás**: a jószág a többihez képest olcsóbb, ezért változatlan elégedettség mellett is többet veszünk belőle. Iránya **mindig** az árváltozással ellentétes (kompenzált keresleti görbe mindig negatív meredekségű);\n2. **jövedelmi hatás**: ugyanabból a jövedelemből többet tudunk venni, mintha gazdagabbak lennénk.\n\nA jövedelmi hatás iránya a jószág fajtájától függ:\n\n- **normál jószág**: a jövedelem nő → többet veszünk belőle (jövedelemrugalmasság > 0); ha > 1, **luxusjószág**;\n- **alsóbbrendű (inferior) jószág**: a jövedelem nő → kevesebbet veszünk (a legolcsóbb élelmiszerek, tömegközlekedés egyes helyzetekben); jövedelemrugalmasság < 0.\n\nNormál jószágnál a két hatás egy irányba mutat, a kereslet biztosan negatív meredekségű. Alsóbbrendűnél ellentétesek, de általában a helyettesítési erősebb. **Giffen-jószág**: olyan erősen alsóbbrendű jószág, amelynél a jövedelmi hatás legyőzi a helyettesítésit, így drágulásakor **többet** vesznek belőle. Ehhez kell, hogy a jószág a nagyon szegény háztartások kiadásainak nagy részét tegye ki, és ne legyen jó helyettesítője. Empirikusan ritka; egy ismert kutatás (Jensen és Miller, 2008) kínai, létminimum közelében élő háztartások rizs-, illetve tésztafogyasztásánál talált ilyen viselkedést.\n\nA felbontást Slutsky (1915) és Hicks dolgozta ki; a **Slutsky-egyenlet** a kettő összegeként írja fel a teljes árhatást.',
        example: 'A burgonya ára emelkedik egy szegény háztartásban, ahol a kiadások fele burgonyára megy. Helyettesítési hatás: kevesebb burgonya, több más élelmiszer. Jövedelmi hatás: a háztartás érezhetően szegényebb lesz, és le kell mondania a drágább húsról – a kiesett kalóriát a még mindig legolcsóbb burgonyával pótolja. Ha ez erősebb, a burgonyafogyasztás nő: Giffen-viselkedés.',
        pitfall: 'A Giffen-jószág nem azonos a presztízsjószággal (Veblen-hatás), ahol a magas ár maga teszi vonzóvá a terméket – ez a preferenciák sajátossága, nem jövedelmi hatás. Az sem Giffen-hatás, ha a vevők az áremelkedéstől további drágulásra számítva előre vásárolnak (várakozási hatás).',
        related: ['kereslet', 'hasznossag', 'kozombossegi-gorbe', 'rugalmassag'] },

      /* ----- Bővítés: vállalat és piaci szerkezetek ----- */
      { id: 'termelesi-fuggveny', term: 'Termelési függvény, csökkenő hozadék és méretgazdaságosság', en: 'production function, diminishing returns, returns to scale', topic: 'vallalat',
        short: 'A termelési függvény megmutatja, adott technológiával a ráfordításokból (munka, tőke) legfeljebb mennyi termék állítható elő. Rövid távon a változó tényező csökkenő határtermékű; hosszú távon a méret növelése növekvő, állandó vagy csökkenő hozadékot adhat.',
        prereq: ['analizis/derivalt'],
        text: 'Általános alak: `Q = f(L, K)`, ahol L a munka, K a tőke.\n\n**Rövid táv**: legalább egy tényező (jellemzően a tőke: gépek, épület) rögzített. A munka **határterméke** `MP_L = ΔQ/ΔL`, **átlagterméke** `AP_L = Q/L`. A **csökkenő hozadék törvénye**: rögzített tőke mellett egyre több munkást alkalmazva egy ponton túl a határtermék csökken (túl sokan dolgoznak ugyanazon a gépen). Ez az oka annak, hogy a rövid távú **határköltség** egy ponton túl nő (`MC = w / MP_L`), és ezért emelkedik a kínálati görbe.\n\n**Hosszú táv**: minden tényező változtatható. Ha minden ráfordítást λ-szorosára növelünk:\n\n- a kibocsátás több mint λ-szorosára nő → **növekvő** hozadék (méretgazdaságosság): specializáció, nagy berendezések hatékonysága, hálózati hatások;\n- pontosan λ-szorosára → **állandó** hozadék;\n- kevésbé → **csökkenő** hozadék (méretgazdaságtalanság): koordinációs, irányítási nehézségek.\n\nEnnek megfelelően a **hosszú távú átlagköltség** (LRAC) csökken, vízszintes, illetve emelkedik. A **minimális hatékony üzemméret** az a kibocsátás, ahol az LRAC először éri el a minimumát; ha ez a piaci kereslethez képest nagy, kevés vállalat fér el a piacon (természetes monopólium, oligopólium).\n\nGyakori modell a **Cobb–Douglas-függvény**: `Q = A · L^α · K^β`; ha `α + β > 1`, növekvő, ha `= 1`, állandó, ha `< 1`, csökkenő a hozadék.',
        example: 'Egy pékségben 1 sütővel: 1 pék 100, 2 pék 220, 3 pék 300, 4 pék 340 kenyér naponta. Határtermék: 100, 120, 80, 40 – a második pék még növekvő (munkamegosztás), utána csökkenő hozadék. Q = L^0,5 · K^0,5 esetén a ráfordítások duplázása pontosan duplázza a kibocsátást (állandó hozadék).',
        pitfall: 'A csökkenő hozadék (rövid táv, egy tényező változik) és a csökkenő méretgazdaságosság (hosszú táv, minden tényező együtt változik) két különböző fogalom: egy vállalatnál egyszerre lehet rövid távon csökkenő hozadék és hosszú távon növekvő méretgazdaságosság.',
        formulas: ['atlagkoltseg-f'],
        related: ['koltsegek', 'profitmaximalizalas', 'tokeletes-verseny', 'monopolium', 'munkapiac', 'gazdasagi-novekedes'] },
      { id: 'monopolisztikus-verseny', term: 'Monopolisztikus verseny', en: 'monopolistic competition', topic: 'vallalat',
        short: 'Piaci szerkezet sok vállalattal, amelyek egymáshoz hasonló, de megkülönböztetett termékeket kínálnak, és szabadon léphetnek be a piacra; rövid távon kis monopóliumként viselkednek, hosszú távon a belépés lenullázza a gazdasági profitot.',
        text: 'Elméletét egymástól függetlenül Edward Chamberlin és Joan Robinson dolgozta ki (1933). Jellemzők:\n\n- **sok eladó**, mindegyik kis részesedéssel – nem kell számolni egymás reakcióival (ez különbözteti meg az oligopóliumtól);\n- **termékdifferenciálás**: márka, minőség, elhelyezkedés, kiszolgálás, dizájn. Ezért minden vállalat keresleti görbéje **lefelé lejt** – van némi árazási erő –, de a sok közeli helyettesítő miatt **rugalmas**;\n- **szabad belépés és kilépés**.\n\n**Rövid táv**: a vállalat a monopóliumhoz hasonlóan ott termel, ahol `MR = MC`, és az árat a keresleti görbéről olvassa le; lehet gazdasági profitja.\n\n**Hosszú táv**: a profit új versenytársakat vonz, akik elvonják a vevők egy részét, így minden vállalat keresleti görbéje balra tolódik, amíg **érinti az átlagköltség-görbét**. Ott `P = ATC`: a gazdasági profit nulla, de `P > MC`.\n\nKövetkezmények:\n\n- **többletkapacitás**: a vállalat az átlagköltség minimuma előtt termel (sok, félig üres étterem, fodrászat);\n- az ár magasabb a határköltségnél, ezért van **holtteher-veszteség** – ez a **termékválaszték ára**, amelyet a fogyasztók értékelnek;\n- nagy szerepe van a **reklámnak** és a márkaépítésnek, mert a vállalat a saját keresleti görbéjét próbálja jobbra tolni és rugalmatlanabbá tenni.',
        example: 'Egy egyetemi városban egy új kávézó a minőségi kávé miatt eleinte magas árat kérhet és profitot termel. Ez újabb kávézókat vonz, a vendégek szétoszlanak, az egy kávézóra jutó forgalom csökken. Néhány év múlva az átlagos kávézó épphogy fedezi költségeit, beleértve a tulajdonos munkájának és tőkéjének alternatívaköltségét is.',
        pitfall: 'A nulla gazdasági profit nem jelenti, hogy a tulajdonos „nem keres semmit”: a számviteli profit pozitív lehet, csak éppen annyi, amennyit a tőkéje és munkája máshol hozna. A többletkapacitás itt nem pazarlás a szó szoros értelmében, hanem a választék ára.',
        formulas: ['mrmc-f', 'profit-f'],
        related: ['tokeletes-verseny', 'monopolium', 'oligopolium', 'profitmaximalizalas', 'koltsegek', 'rugalmassag'] },
      { id: 'jatekelmelet', term: 'Játékelmélet: domináns stratégia, Nash-egyensúly, fogolydilemma', en: 'game theory: dominant strategy, Nash equilibrium, prisoner\'s dilemma', topic: 'vallalat',
        short: 'A játékelmélet olyan döntési helyzeteket vizsgál, amelyekben az eredmény a többi szereplő döntésétől is függ. Nash-egyensúlyban egyik játékos sem jár jobban, ha egyedül eltér a stratégiájától; a fogolydilemmában ez az egyensúly mindenki számára rosszabb, mint az együttműködés.',
        prereq: ['linearis-algebra/matrix'],
        text: 'Egy játék elemei: **játékosok**, **stratégiák** (cselekvési lehetőségek), **kifizetések** (minden stratégiakombináció eredménye). Két játékosnál ez **kifizetési mátrixban** ábrázolható.\n\n- **Domináns stratégia**: a többiek bármely választása mellett ez a legjobb. Ha minden játékosnak van ilyen, a kimenet egyértelmű.\n- **Nash-egyensúly** (John Nash, 1950): olyan stratégiaprofil, amelyben mindenki a többiek stratégiájára adott **legjobb válaszát** játssza; egyoldalú eltéréssel senki sem nyer. Nash bizonyította, hogy minden véges játéknak van egyensúlya, ha megengedjük a **kevert** (véletlenszerűsített) stratégiákat is.\n\n**Fogolydilemma** (Flood és Dresher kísérlete 1950-ből; nevét Albert W. Tucker adta): két gyanúsítottat külön hallgatnak ki. Ha mindketten hallgatnak, 1-1 év; ha mindketten vallanak, 5-5 év; ha csak az egyik vall, ő szabadul, a másik 10 évet kap. A vallomás **domináns** stratégia, tehát a Nash-egyensúly a (vall, vall) – pedig a (hallgat, hallgat) mindkettőnek jobb lenne. **Az egyéni racionalitás kollektíve rossz eredményhez vezet.**\n\nGazdasági példák: **kartellek** (mindenkinek megérné titokban alákínálni), reklámverseny, fegyverkezés, közös erőforrások túlhasználata, klímavédelem.\n\n**Ismételt játékok**: ha a játék sokszor, előre nem ismert ideig ismétlődik, az együttműködés fenntartható a jövőbeli büntetés fenyegetésével. Robert Axelrod számítógépes versenyeiben (1980 körül) az egyszerű **„szemet szemért”** (tit-for-tat) stratégia – kezdetben együttműködik, utána a másik előző lépését utánozza – teljesített kiválóan.',
        example: 'Két benzinkút: ha mindkettő magas árat tart, 10-10 millió profit; ha az egyik lejjebb megy, ő 15, a másik 2 milliót keres; ha mindkettő olcsó, 5-5. Bármit tesz a másik, az alacsony ár jobb (15 > 10, 5 > 2) – domináns stratégia –, ezért az egyensúly (olcsó, olcsó) 5-5 millióval, holott (drága, drága) 10-10-et hozna.',
        pitfall: 'A Nash-egyensúly nem feltétlenül hatékony (Pareto-optimális), és nem is mindig egyértelmű: sok játékban több egyensúly van (pl. melyik oldalon közlekedjünk), ilyenkor a konvenció vagy a koordináció dönt. A domináns stratégia egyensúlya mindig Nash-egyensúly, de fordítva nem.',
        related: ['oligopolium', 'monopolium', 'externalia', 'kozjavak', 'aszimmetrikus-informacio'] },
      { id: 'aszimmetrikus-informacio', term: 'Aszimmetrikus információ: kontraszelekció és erkölcsi kockázat', en: 'asymmetric information: adverse selection and moral hazard', topic: 'vallalat',
        short: 'Ha az ügylet egyik fele többet tud, mint a másik, a piac rosszul működhet: szerződéskötés előtt kontraszelekció (a rossz minőség kiszorítja a jót), utána erkölcsi kockázat (a rejtett cselekvés kockázatosabbá válik) léphet fel.',
        text: 'A tökéletes verseny modellje teljes információt feltételez. A valóságban az eladó jobban ismeri az árut, a biztosított a saját egészségét és szokásait, a munkavállaló a saját szorgalmát.\n\n**Kontraszelekció** (adverse selection, rejtett információ a szerződés előtt). George Akerlof „citrompiac” modellje (1970): a használtautó-piacon a vevő nem tudja megkülönböztetni a jó autót a rossztól („citrom”), ezért csak az átlagos minőségnek megfelelő árat hajlandó fizetni. Ezen az áron a jó autók tulajdonosai nem adnak el, kilépnek; az átlagminőség csökken, az ár tovább esik – szélső esetben a piac összeomlik. Ugyanez a biztosításnál: átlagos díj mellett főként a kockázatosabbak kötnek szerződést.\n\n**Erkölcsi kockázat** (moral hazard, rejtett cselekvés a szerződés után): a biztosított kevésbé vigyáz, a „túl nagy ahhoz, hogy csődbe menjen” bank kockázatosabban fektet, a megbízott (ügynök) a saját érdekét követi a megbízóé helyett (**megbízó–ügynök probléma**).\n\nPiaci és szabályozási megoldások:\n\n- **jelzés** (signaling, Michael Spence, 1973): a jól informált fél költséges jelzéssel bizonyítja a minőségét – garancia, márka, végzettség;\n- **szűrés** (screening, Rothschild–Stiglitz, 1976): a kevésbé informált fél olyan szerződésmenüt kínál, amelyből a típusok önmaguk választanak (különböző önrészű biztosítások);\n- **önrész**, bónusz-málusz, teljesítményhez kötött bérezés, biztosítéki követelmények;\n- **kötelező biztosítás**, információközlési kötelezettség, minőségi tanúsítás.\n\nAkerlof, Spence és Stiglitz 2001-ben közgazdasági Nobel-emlékdíjat kapott ezekért az eredményekért.',
        example: 'Szemléltetés: a jó autó 2 millió, a rossz 1 millió Ft-ot ér, fele-fele arányban vannak. A vevő legfeljebb az átlagos 1,5 millió Ft-ot ajánlja. A jó autó tulajdonosa 1,8 millió alatt nem ad el, ezért kivonul; a piacon csak rossz autók maradnak, az ár 1 millióra esik. Egy független műszaki vizsga (jelzés) helyreállíthatja a jó autók piacát.',
        pitfall: 'Az erkölcsi kockázat nem erkölcsi ítélet, hanem ösztönzési probléma: racionális viselkedés megváltozott ösztönzők mellett. A kontraszelekció és az erkölcsi kockázat időzítésükben különbözik: az egyik a szerződéskötés előtti rejtett tulajdonság, a másik az utána következő rejtett cselekvés.',
        related: ['externalia', 'kozjavak', 'tokeletes-verseny', 'jatekelmelet', 'munkapiac'] },

      /* ----- Bővítés: munkapiac és jövedelemeloszlás ----- */
      { id: 'munkapiac', term: 'Munkapiac: munkakereslet, munkakínálat, bér', en: 'labour market: labour demand, labour supply, wages', topic: 'tenyezo',
        short: 'A munka iránti kereslet származtatott kereslet: a vállalat addig alkalmaz újabb munkást, amíg annak határtermék-bevétele eléri a bért. A munkakínálatot a szabadidő és a jövedelem közötti választás alakítja; a kettő metszéspontja adja a piaci bért és foglalkoztatást.',
        prereq: ['analizis/derivalt'],
        text: '**Munkakereslet.** A munkaerőt nem önmagáért veszik, hanem az általa előállított termékért (**származtatott kereslet**). Egy további munkás **határtermék-bevétele**: `MRP_L = MR · MP_L`; tökéletes versenyben `MR = P`, így `VMP_L = P · MP_L`. A profitmaximalizáló vállalat ott áll meg, ahol `MRP_L = w` (a bér). A csökkenő hozadék miatt az MRP csökken, ezért a munkakeresleti görbe lefelé lejt. Eltolja: a termék árának, a termelékenységnek (technológia, tőke) változása.\n\n**Munkakínálat.** Az egyén a szabadidő és a fogyasztás között választ; a bér a szabadidő alternatívaköltsége. Béremeléskor:\n\n- **helyettesítési hatás**: a szabadidő drágább → több munka;\n- **jövedelmi hatás**: gazdagabb lesz, több szabadidőt „vásárol” → kevesebb munka.\n\nAlacsony bérnél többnyire a helyettesítési, nagyon magasnál a jövedelmi hatás erősebb lehet: a kínálati görbe **visszahajolhat**. A piaci kínálat a részvételi döntések miatt jellemzően pozitív meredekségű.\n\n**Bérkülönbségek** okai: **humántőke** (képzés, tapasztalat – Gary Becker), **kompenzáló bérkülönbség** (veszélyes, kellemetlen munka), szakszervezetek, megkülönböztetés, a munkaerő mobilitásának korlátai.\n\n**Minimálbér.** Versenyző munkapiacon az egyensúlyi bér feletti minimálbér munkanélküliséget okoz (a kínált munka több, mint a keresett). **Monopszónia** esetén (egy domináns munkáltató, amely bérfelajánlásával maga befolyásolja a bérszintet) viszont egy mérsékelt minimálbér akár növelheti is a foglalkoztatást. Az empirikus hatás vitatott és mértékfüggő; ismert kutatás Card és Krueger 1994-es gyorsétterem-tanulmánya.',
        example: 'Egy kerti bútorokat gyártó üzem terméke 20 000 Ft/db. A 4. munkás heti 6, az 5. heti 4 darabbal növeli a termelést. MRP: 120 000 és 80 000 Ft/hét. Ha a heti bérköltség 100 000 Ft, a 4. munkást megéri felvenni (120 000 > 100 000), az 5.-et nem (80 000 < 100 000).',
        pitfall: 'A „munkamennyiség-tévedés” (lump of labour fallacy) szerint a munka mennyisége rögzített, ezért ha valaki többet dolgozik (vagy idősebbek tovább dolgoznak, bevándorlók érkeznek), mástól veszi el. A munkakereslet viszont nem rögzített: függ a béreszinttől, a termelékenységtől és a gazdaság méretétől.',
        formulas: ['mrp-f'],
        related: ['termelesi-fuggveny', 'munkanelkuliseg', 'jovedelmi-helyettesitesi', 'arszabalyozas', 'profitmaximalizalas', 'lorenz-gini'] },
      { id: 'lorenz-gini', term: 'Jövedelemeloszlás: Lorenz-görbe és Gini-együttható', en: 'income distribution: Lorenz curve and Gini coefficient', topic: 'tenyezo',
        short: 'A Lorenz-görbe azt mutatja, a népesség legszegényebb x%-a a jövedelmek hány százalékával rendelkezik; a Gini-együttható a görbe és a tökéletes egyenlőség egyenese közötti terület aránya, 0 (teljes egyenlőség) és 1 (egy személy kap mindent) között.',
        prereq: ['analizis/riemann-integral', 'lecke:matematika/szazalek'],
        text: '**Lorenz-görbe** (Max O. Lorenz, 1905): a vízszintes tengelyen a népesség jövedelem szerint növekvő sorrendben vett kumulált aránya, a függőlegesen a jövedelmek kumulált aránya. A **45°-os egyenes** a tökéletes egyenlőség (a népesség 20%-a a jövedelem 20%-át kapja); minél jobban „behasal” a görbe, annál egyenlőtlenebb az eloszlás.\n\n**Gini-együttható** (Corrado Gini, 1912): ha A az egyenes és a Lorenz-görbe közötti, B a görbe alatti terület, akkor `G = A / (A + B)`. Mivel `A + B = 1/2`, ezért `G = 1 − 2B`. Kvintilis- vagy decilisadatokból B trapézokkal közelíthető.\n\nÉrtelmezési szempontok:\n\n- mindig meg kell mondani, **mit** mérünk: piaci jövedelmet, vagy adók és transzferek utáni **rendelkezésre álló** jövedelmet (az újraelosztás hatása a kettő különbségéből látszik); jövedelmet vagy **vagyont** (a vagyoneloszlás jellemzően jóval egyenlőtlenebb); háztartást vagy fogyasztási egységet;\n- a Gini egyetlen szám, ezért **különböző alakú** eloszlásokhoz is ugyanaz az érték tartozhat (pl. a középosztály vagy a szélek egyenlőtlensége). Kiegészítő mutatók: **kvintilisarány** (S80/S20: a felső és az alsó ötöd jövedelmének hányadosa), **Palma-arány** (felső 10% / alsó 40%), szegénységi ráták;\n- az egyenlőtlenség és a szegénység különböző fogalmak: nőhet az átlagos életszínvonal miközben nő a Gini, és fordítva.',
        example: 'Ötödök jövedelemrészesedése: 5%, 10%, 15%, 25%, 45%. Kumulálva: 0,05; 0,15; 0,30; 0,55; 1,00. Trapézokkal: `B = 0,2 · (0,025 + 0,10 + 0,225 + 0,425 + 0,775) = 0,31`, így `G = 1 − 2 · 0,31 = 0,38`. S80/S20 = 45/5 = 9.',
        pitfall: 'A Gini-együttható nem a „gazdagok és szegények” arányát mutatja, és nem is a szegénységet; két különböző országban ugyanaz a Gini egészen eltérő élethelyzeteket jelenthet. A mért értékek erősen függenek az adatforrástól és a definícióktól, ezért csak azonos módszerű adatok vethetők össze.',
        formulas: ['gini-f'],
        related: ['munkapiac', 'fiskalis-politika', 'gdp', 'tobblet'] },

      /* ----- Bővítés: makrogazdaság ----- */
      { id: 'ad-as', term: 'Aggregált kereslet és kínálat (AD–AS modell)', en: 'aggregate demand and aggregate supply (AD–AS model)', topic: 'makro',
        short: 'Makrogazdasági modell, amely az árszínvonal és a reál-GDP alakulását az aggregált kereslet (AD) és a rövid, illetve hosszú távú aggregált kínálat (SRAS, LRAS) metszéspontjaként magyarázza; segítségével elkülöníthetők a keresleti és a kínálati sokkok.',
        prereq: ['lecke:matematika/linearis-fuggveny'],
        text: '**Aggregált kereslet** (AD): az összes végső termék iránti kereslet az árszínvonal függvényében, `Y = C + I + G + NX`. Azért lejt lefelé, mert magasabb árszínvonalnál:\n\n- a pénz és a megtakarítások reálértéke kisebb (**vagyonhatás**);\n- több pénz kell a tranzakciókhoz, nőnek a kamatok, csökken a beruházás (**kamathatás**);\n- a hazai termékek külföldhöz képest drágulnak, csökken a nettó export (**árfolyamhatás**).\n\nAD-t **eltolja**: a fogyasztói és vállalati bizalom, a költségvetési politika (G, adók), a monetáris politika (kamat), a külföldi kereslet.\n\n**Rövid távú kínálat** (SRAS): pozitív meredekségű, mert a bérek és sok ár **ragadós** (szerződések, menükártya-költség): ha a termékárak emelkednek, a vállalatoknak megéri többet termelni. **Hosszú távú kínálat** (LRAS): függőleges a **potenciális kibocsátásnál**, amelyet a munkaerő, a tőke és a technológia határoz meg, nem az árszínvonal.\n\n**Sokkok:**\n\n- **keresleti sokk** (pl. bizalomvesztés, AD balra): rövid távon csökken a kibocsátás és az árszínvonal is – recesszió alacsony inflációval;\n- **kínálati sokk** (pl. az energiaárak hirtelen emelkedése, SRAS balra): csökken a kibocsátás, miközben nő az árszínvonal – **stagfláció**. Ilyenkor a gazdaságpolitika dilemmába kerül: a kereslet élénkítése az inflációt, a szigorítás a recessziót erősíti.\n\nHosszú távon a bérek és árak alkalmazkodnak, a gazdaság visszatér a potenciális kibocsátáshoz; a vita arról szól, mennyi idő alatt, és érdemes-e közben gazdaságpolitikával beavatkozni.',
        example: 'Egy világjárvány miatt a háztartások visszafogják a fogyasztást (AD balra): a GDP csökken, az infláció mérséklődik. Ha ugyanakkor az ellátási láncok akadoznak (SRAS balra), a két hatás a kibocsátást ugyanabba, az árszínvonalat ellentétes irányba viszi – az infláció alakulása attól függ, melyik erősebb.',
        pitfall: 'Az AD-görbe nem a mikroökonómiai keresleti görbék egyszerű összege: azért lejt, mert az árszínvonal a vagyonon, a kamaton és az árfolyamon keresztül hat, nem a relatív árak miatt. Az AD–AS modell az árszínvonal szintjét, nem az infláció ütemét mutatja; dinamikus változata ezt finomítja.',
        formulas: ['gdp-f', 'multiplikator-f'],
        related: ['gdp', 'inflacio', 'gazdasagi-ciklus', 'fiskalis-politika', 'monetaris-politika', 'phillips-gorbe'] },
      { id: 'phillips-gorbe', term: 'Phillips-görbe', en: 'Phillips curve', topic: 'makro',
        short: 'Az infláció és a munkanélküliség közötti rövid távú ellentétes kapcsolat; a várakozásokkal kiegészített változat szerint hosszú távon nincs választási lehetőség: a munkanélküliség visszatér a természetes rátához, csak az infláció szintje lesz magasabb.',
        text: 'A. W. Phillips (1958) az Egyesült Királyság 1861–1957-es adataiban azt találta, hogy alacsony munkanélküliség idején gyorsabban nőnek a nominálbérek. Samuelson és Solow (1960) az árinflációra fogalmazta át, és ebből sokan arra következtettek, hogy a gazdaságpolitika **választhat** a görbe mentén: kicsit több infláció cserébe kevesebb munkanélküliségért.\n\nMilton Friedman (1968) és Edmund Phelps (1967) bírálata: a munkavállalók és a vállalatok a **várt inflációt** beépítik a bérekbe és árakba. A **várakozásokkal kiegészített Phillips-görbe**:\n\n`π = π^e − β · (u − u∗)`\n\nahol u∗ a **természetes munkanélküliségi ráta** (NAIRU: az inflációt nem gyorsító munkanélküliségi ráta), amelyet a súrlódásos és a strukturális munkanélküliség határoz meg.\n\n- **Rövid távon** (adott várakozások mellett) a meglepetésszerű keresletélénkítés csökkenti a munkanélküliséget, növeli az inflációt.\n- **Hosszú távon** a várakozások alkalmazkodnak (π^e → π), így u visszatér u∗-hoz: a hosszú távú Phillips-görbe **függőleges**. A tartósan u∗ alatt tartott munkanélküliség gyorsuló inflációhoz vezetne.\n\nAz 1970-es évek **stagflációja** (egyszerre magas infláció és munkanélküliség) igazolta a bírálatot: kínálati sokkok és emelkedő várakozások mellett a régi kapcsolat felbomlott.\n\nGazdaságpolitikai következmény: a jegybank **hitelessége** és a **horgonyzott inflációs várakozások** kulcsfontosságúak; ha mindenki elhiszi az inflációs célt, a dezinfláció kisebb munkanélküliségi áldozattal jár.',
        example: 'Szemléltetés: π^e = 3%, u∗ = 5%, β = 0,5. Ha a munkanélküliség 4%-ra csökken: `π = 3 − 0,5 · (4 − 5) = 3,5%`. Ha a következő évben mindenki 3,5%-os inflációra számít, és u továbbra is 4%, akkor `π = 4%` – az infláció évről évre gyorsul, amíg u vissza nem tér 5%-ra.',
        pitfall: 'A Phillips-görbe nem jelent stabil „menüt”: a statisztikai együttmozgás a várakozások és a sokkok változásával eltűnhet. A természetes ráta sem természeti állandó: függ a munkapiaci intézményektől, a képzettségtől és a munkaközvetítés hatékonyságától, és nem figyelhető meg közvetlenül, csak becsülhető.',
        formulas: ['phillips-f'],
        related: ['inflacio', 'munkanelkuliseg', 'monetaris-politika', 'ad-as', 'gazdasagi-ciklus'] },
      { id: 'gazdasagi-novekedes', term: 'Gazdasági növekedés: a Solow-modell', en: 'economic growth: the Solow model', topic: 'makro',
        short: 'A hosszú távú növekedés neoklasszikus modellje: a tőkefelhalmozás a csökkenő hozadék miatt csak egy egyensúlyi (steady state) szintig növeli az egy főre jutó kibocsátást; a tartós életszínvonal-emelkedés forrása a technológiai haladás.',
        prereq: ['analizis/exponencialis-novekedes'],
        text: 'Robert Solow (1956) modellje, egy főre (munkásra) jutó értékekkel:\n\n- termelés: `y = f(k)`, ahol k az egy munkásra jutó tőke; f a **csökkenő hozadék** miatt egyre laposabb;\n- a jövedelem s hányadát megtakarítják és beruházzák: **beruházás** `s · f(k)`;\n- a tőke kopik (δ értékcsökkenési ráta), a népesség n ütemben nő, ezért `(n + δ) · k` beruházás kell csak ahhoz, hogy k ne csökkenjen.\n\nA tőke változása: `Δk = s · f(k) − (n + δ) · k`. Ha a beruházás meghaladja a pótlási igényt, k nő; a csökkenő hozadék miatt azonban egyre kevésbé, és a gazdaság a **steady state** k∗-hoz tart, ahol `s · f(k∗) = (n + δ) · k∗`.\n\nKövetkeztetések:\n\n1. **Magasabb megtakarítási ráta** magasabb egy főre jutó **szintet** ad, de tartósan nem gyorsítja a növekedést.\n2. **Feltételes konvergencia**: a hasonló paraméterű, de szegényebb (kevesebb tőkéjű) gazdaságok gyorsabban nőnek, és felzárkóznak.\n3. A steady state-ben az egy főre jutó kibocsátás csak a **technológiai haladás** (teljes tényezőtermelékenység, A) ütemében nő. Ezt a Solow-modell kívülről adottnak veszi – a **Solow-maradék** a növekedés tőkével és munkával nem magyarázott része.\n\nAz **endogén növekedéselméletek** (Paul Romer, Robert Lucas, 1980-as évek vége) a technológiát magyarázzák: kutatás-fejlesztés, tudás-tovagyűrűzés, humántőke. Az intézményi közgazdaságtan a tulajdonjogok, a jogállamiság és a versenyképes piacok szerepét hangsúlyozza.\n\nHasznos ökölszabály: **70-es szabály** – évi g%-os növekedésnél a kibocsátás kb. `70 / g` év alatt duplázódik.',
        example: 'Ha egy ország egy főre jutó GDP-je évi 2%-kal nő, kb. 35 év alatt duplázódik; 7%-os ütemmel 10 év alatt. Solow-példa: `y = k^0,5`, s = 0,2, n + δ = 0,05. Steady state: `0,2 · k^0,5 = 0,05 · k` → `k^0,5 = 4` → k∗ = 16, y∗ = 4.',
        pitfall: 'A GDP-növekedés és az egy főre jutó növekedés nem ugyanaz: népességnövekedés mellett nőhet a GDP úgy, hogy az átlagos életszínvonal stagnál. Konvergencia csak feltételesen várható: eltérő intézmények, megtakarítás és népességnövekedés mellett az országok eltérő steady state felé tartanak.',
        formulas: ['solow-f'],
        related: ['gdp', 'termelesi-fuggveny', 'gazdasagi-ciklus', 'termelesi-lehetosegek', 'jelenertek'] },

      /* ----- Bővítés: pénz és nemzetközi gazdaság ----- */
      { id: 'penzteremtes', term: 'A pénz funkciói és a pénzteremtés', en: 'functions of money and money creation', topic: 'nemzetkozi',
        short: 'A pénz csereeszköz, értékmérő és értékmegőrző. A forgalomban lévő pénz nagy része kereskedelmi banki betét, amely jellemzően hitelezéskor keletkezik: a bank a hitel folyósításakor új betétet ír jóvá; a törlesztés ezt a pénzt megszünteti.',
        prereq: ['lecke:penzugy/bank', 'lecke:penzugy/hitel'],
        text: '**A pénz funkciói**: **csereeszköz** (megszünteti a cserekereskedelem „kettős egybeesés” problémáját), **elszámolási egység / értékmérő** (közös mértékegység az árakhoz), **értékmegőrző** (vásárlóerő átvitele a jövőbe – infláció mellett romló minőségben), és **halasztott fizetések eszköze** (adósságok mértékegysége).\n\n**Pénzfajták és -aggregátumok**:\n\n- **jegybankpénz** (monetáris bázis): készpénz + a kereskedelmi bankok jegybanki számláin tartott tartalékok – ezt csak a jegybank hozza létre;\n- **kereskedelmi banki pénz**: a számlapénz (betétek), a pénzmennyiség döntő része;\n- szűk és tág pénzaggregátumok: **M1** (készpénz + látra szóló betétek), **M2**, **M3** (egyre kevésbé likvid elemekkel bővítve).\n\n**Hogyan keletkezik a pénz?** A bank, amikor hitelt nyújt, nem a meglévő betétesek pénzét adja kölcsön, hanem **mérlegét két oldalon bővíti**: eszközként követelést (a hitelt), forrásként új betétet ír jóvá az adós számláján. „A hitelek teremtenek betéteket” – ezt a Bank of England is kifejtette egy 2014-es tanulmányában. A hitel törlesztése a betétet, így a pénzt **megszünteti**.\n\nA banki pénzteremtés **korlátai**: a hitel iránti kereslet és a hitelképes ügyfelek köre; a bank jövedelmezősége (a jegybanki kamat szabja meg a források árát); a **tőkekövetelmények** és likviditási szabályok; a betétek más bankokba áramlása, amit jegybankpénzzel kell rendezni.\n\nA tankönyvi **pénzmultiplikátor** (`m = 1 / r`, r a kötelező tartalékráta) egyszerűsített modell: azt mutatja, legfeljebb mekkora betétállomány épülhet egy adott tartalékra, de a valóságban a jegybank jellemzően a **kamatot** rögzíti, és a tartalékot a kereslethez igazítva biztosítja – az ok-okozati irány tehát inkább hitel → betét → tartalékigény.',
        example: 'Egy bank 10 millió Ft lakáshitelt folyósít: eszközei között megjelenik a 10 milliós követelés, forrásai között a vevő 10 milliós betétje – új pénz keletkezett. Az átutalás után a betét az eladó bankjába kerül, ezért az első bank jegybankpénzben rendezi az átutalást. Amikor az adós évek alatt visszafizeti a hitelt, ez a pénz megszűnik.',
        pitfall: 'A „bank a betétesek pénzét adja kölcsön” és „a jegybank nyomtatja a pénz nagy részét” elképzelés egyaránt pontatlan: a pénzmennyiség nagy része kereskedelmi banki betét, amely hitelezéssel jön létre. Ebből nem következik, hogy a bankok korlátlanul teremthetnek pénzt: a fenti szabályozási és piaci korlátok kötik őket.',
        formulas: ['mennyisegi-f'],
        related: ['monetaris-politika', 'inflacio', 'mennyisegi-penzelmelet', 'jelenertek', 'arfolyam'] },
      { id: 'mennyisegi-penzelmelet', term: 'A pénz mennyiségelmélete (MV = PY)', en: 'quantity theory of money', topic: 'nemzetkozi',
        short: 'A forgalomban lévő pénzmennyiség és a pénz forgási sebességének szorzata egyenlő a nominális kibocsátással. Ha a forgási sebesség és a reálkibocsátás közel állandó, a pénzmennyiség tartósan gyorsabb növekedése inflációhoz vezet.',
        text: 'A **csereegyenlet** (Irving Fisher, 1911 nyomán): `M · V = P · Y`, ahol M a pénzmennyiség, V a pénz **forgási sebessége** (egy pénzegység évente hányszor cserél gazdát végső termékek vásárlásakor), P az árszínvonal, Y a reál-GDP. Definíció szerint mindig igaz, hiszen V-t éppen ebből számoljuk (`V = P · Y / M`).\n\n**Elméletté** a viselkedési feltevések teszik:\n\n1. V hosszú távon viszonylag stabil (a fizetési szokások lassan változnak);\n2. Y-t a valós tényezők (munka, tőke, technológia) határozzák meg, nem a pénzmennyiség (**a pénz semlegessége** hosszú távon).\n\nNövekedési ütemekre átírva: `%ΔM + %ΔV ≈ %ΔP + %ΔY`, azaz `infláció ≈ pénzmennyiség-növekedés − reálnövekedés + forgási sebesség változása`. Friedman híres megfogalmazásában: „Az infláció mindig és mindenütt monetáris jelenség.”\n\nAz elv régi: már David Hume (18. század) és korábban a spanyol amerikai nemesfém-beáramlás inflációját vizsgáló szerzők is megfogalmazták.\n\nAmit a hosszú távú adatok jól alátámasztanak: a **hiperinflációk** (Németország 1923, Magyarország 1945–46 – a valaha mért legnagyobb hiperinfláció) mindig a költségvetési hiány pénzteremtéssel való finanszírozásához kapcsolódtak. Rövid távon azonban V **instabil** (pénzügyi innovációk, válságok, kamatszint), ezért a jegybankok a pénzmennyiség célzásáról jórészt áttértek a **kamat** és az **inflációs cél** használatára.',
        example: 'Ha a pénzmennyiség évi 10%-kal, a reál-GDP 3%-kal nő, és V állandó, akkor az infláció kb. `10 − 3 = 7%`. Számszerűen: M = 20 000 Mrd Ft, V = 4, Y = 80 000 Mrd Ft (bázisévi áron): `P = M · V / Y = 1`. Ha M 22 000-re, Y 82 400-ra nő, P ≈ 1,068, azaz 6,8% infláció.',
        pitfall: 'Az egyenlet önmagában nem mond ok-okozati irányt: a pénzmennyiség növekedése lehet az infláció következménye is (a jegybank alkalmazkodik). Ha V csökken (pl. válságban a szereplők pénzt halmoznak), a pénzmennyiség növekedése nem feltétlenül okoz inflációt.',
        formulas: ['mennyisegi-f', 'fisher-f'],
        related: ['inflacio', 'monetaris-politika', 'penzteremtes', 'gdp'] },
      { id: 'vam', term: 'Vám és kereskedelempolitika', en: 'tariffs and trade policy', topic: 'nemzetkozi',
        short: 'A vám az importált árukra kivetett adó. Kis ország esetén a belföldi ár a vámmal nő: a hazai termelők nyernek, az állam vámbevételhez jut, a fogyasztók veszítenek – és a veszteségük nagyobb, mint a többiek nyeresége (holtteher-veszteség).',
        prereq: ['lecke:allampolgari/europai-unio'],
        text: '**Kis nyitott gazdaság** (a világpiaci árat nem befolyásolja), világpiaci ár P_w, egységenkénti vám t. A belföldi ár `P_w + t` lesz:\n\n- a hazai **kínálat nő**, a **kereslet csökken**, az **import csökken**;\n- a **fogyasztói többlet csökken** (drágább és kevesebb fogyasztás);\n- a **termelői többlet nő** (a védett hazai termelők);\n- az állam **vámbevétele**: `t · (új import)`;\n- **holtteher-veszteség** két háromszögből: a **termelési torzítás** (drágábban termelünk itthon, amit olcsóbban importálhatnánk) és a **fogyasztási torzítás** (olyan vásárlások maradnak el, amelyek a világpiaci áron megérnék).\n\n**Más eszközök**: **kvóta** (mennyiségi korlát – a vámbevétel helyett az importengedély birtokosai kapják a különbözetet), önkéntes exportkorlátozás, **nem vámjellegű akadályok** (szabványok, engedélyek), exporttámogatás, dömpingellenes vám.\n\n**Érvek a védelem mellett**: **csecsemőipar** (átmeneti védelem a tanulási szakaszban), nemzetbiztonság és ellátásbiztonság, nagy ország esetén a **cserearány** javítása (optimális vám), tisztességtelen gyakorlatok elleni védekezés. **Ellenérvek**: holtteher-veszteség, a védett ágazatok lobbija és járadékvadászat, megtorló vámok (kereskedelmi háború), a kevésbé hatékony termelés konzerválása.\n\n**Intézmények**: a többoldalú kereskedelmi rendszer (GATT 1947, Kereskedelmi Világszervezet 1995) a legnagyobb kedvezmény elvére és a vámok kölcsönös csökkentésére épül. Az Európai Unió **vámunió**: belső vámok nincsenek, a külső vámtarifa közös, és a kereskedelempolitika uniós hatáskör.',
        example: 'P_w = 100, t = 20. Vám nélkül: belföldi kereslet 1000, kínálat 400, import 600. Vámmal (ár 120): kereslet 900, kínálat 500, import 400. Vámbevétel `20 · 400 = 8000`. Holtteher: `½ · 20 · 100 + ½ · 20 · 100 = 2000`. Fogyasztói veszteség `20 · 900 + ½ · 20 · 100 = 19 000` = termelői nyereség 9000 + vámbevétel 8000 + holtteher 2000.',
        pitfall: 'A vámot – az adóincidencia logikája szerint – nem a külföldi exportőr fizeti meg, hanem kis ország esetén teljes egészében a belföldi vevők (magasabb ár formájában). A kereskedelempolitika kérdése nem az, hogy a védelemnek vannak-e nyertesei (vannak), hanem hogy nyereségük meghaladja-e a fogyasztók veszteségét.',
        related: ['komparativ-elony', 'tobblet', 'arszabalyozas', 'arfolyam', 'fizetesi-merleg'] },
      { id: 'fizetesi-merleg', term: 'Fizetési mérleg', en: 'balance of payments', topic: 'nemzetkozi',
        short: 'Egy ország és a külföld közötti gazdasági tranzakciók rendszerezett kimutatása adott időszakra: a folyó fizetési mérleg (áruk, szolgáltatások, jövedelmek, transzferek), a tőkemérleg és a pénzügyi mérleg. A folyó és tőkemérleg együttes egyenlegét a pénzügyi mérleg finanszírozza.',
        prereq: ['lecke:penzugy/bank'],
        text: 'Részei (az IMF fizetésimérleg-kézikönyvének szerkezete szerint):\n\n**Folyó fizetési mérleg**:\n\n- **áruk** és **szolgáltatások** kereskedelme (export − import: külkereskedelmi mérleg);\n- **elsődleges jövedelmek**: munkajövedelem a határon át, befektetési jövedelmek (osztalék, kamat, a külföldi tulajdonú vállalatok újrabefektetett profitja);\n- **másodlagos jövedelmek**: viszonzatlan transzferek (hazautalások, uniós és nemzetközi folyó támogatások, adók).\n\n**Tőkemérleg**: tőketranszferek (pl. beruházási célú uniós támogatások), nem termelt nem pénzügyi eszközök.\n\n**Pénzügyi mérleg**: a külföldi eszközök és források változása – **közvetlen tőkebefektetés** (FDI, tartós tulajdonosi érdekeltség), **portfólióbefektetés** (értékpapírok), egyéb befektetések (hitelek, betétek), **tartalékeszközök** (a jegybank devizatartaléka).\n\n**Alapazonosság**: folyó mérleg + tőkemérleg = a pénzügyi mérleg egyenlege (nettó hitelnyújtás vagy hitelfelvétel a külföld felé), statisztikai hibákkal. Ha egy ország folyó fizetési mérlege hiányos, azt külföldi forrás bevonásával vagy külföldi eszközeinek csökkentésével finanszírozza.\n\n**Makrogazdasági kapcsolat**: a nemzeti számlákból `folyó mérleg ≈ S − I` (belföldi megtakarítás mínusz beruházás). A hiány tehát azt jelenti, hogy az ország többet beruház (vagy az állam többet költ), mint amennyit belföldön megtakarít. Ha a hiány az államháztartás hiányából ered, **ikerdeficitről** beszélünk.\n\nA hiány önmagában nem rossz (egy felzárkózó ország produktív beruházásokat finanszírozhat külföldi tőkéből), de a tartós, fogyasztást finanszírozó, rövid lejáratú adósságra épülő hiány sérülékennyé tesz egy hirtelen tőkekiáramlással szemben.',
        example: 'Egy ország exportja 100, importja 95 (egység: milliárd euró), a külföldi tulajdonú cégek kivitt profitja 8, a külföldön dolgozók hazautalásai 2. Folyó mérleg: `100 − 95 − 8 + 2 = −1`. Ha 1 milliárd uniós beruházási támogatás érkezik (tőkemérleg +1), a folyó és a tőkemérleg együtt 0: a pénzügyi mérleg egyenlege (a statisztikai hibán túl) szintén nulla.',
        pitfall: 'A külkereskedelmi mérleg többlete nem jelenti a folyó fizetési mérleg többletét: sok külföldi működőtőkével rendelkező országban a profitkivitel (elsődleges jövedelmek) jelentős hiányt okoz. A fizetési mérleg „egyensúlya” könyvelési azonosság, nem gazdasági egyensúly.',
        formulas: ['gdp-f'],
        related: ['arfolyam', 'komparativ-elony', 'gdp', 'vam', 'monetaris-politika'] }
    ]
  });
})();
