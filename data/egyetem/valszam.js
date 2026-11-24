/* Egyetem: Valószínűségszámítás és statisztika – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';

  /* ---------- rajzsegédek ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function hu(v, d) { return v.toFixed(d).replace('.', ','); }
  function frame(x0, x1, y0, y1, L, Tp, W, H) {
    return {
      X: function (x) { return r1(L + (x - x0) / (x1 - x0) * W); },
      Y: function (y) { return r1(Tp + (y1 - y) / (y1 - y0) * H); }
    };
  }
  function curve(fr, fn, a, b, n) {
    var d = '';
    for (var i = 0; i <= n; i++) { var x = a + (b - a) * i / n; d += (i ? 'L' : 'M') + fr.X(x) + ' ' + fr.Y(fn(x)) + ' '; }
    return d;
  }
  // Görbe alatti terület [a, b]-n, mint zárt path.
  function area(fr, fn, a, b, n) { return curve(fr, fn, a, b, n) + 'L' + fr.X(b) + ' ' + fr.Y(0) + ' L' + fr.X(a) + ' ' + fr.Y(0) + ' z'; }
  function arrow(x1, y1, x2, y2, col, w) {
    var a = Math.atan2(y2 - y1, x2 - x1), s = 8;
    var p1 = [x2 - s * Math.cos(a - 0.4), y2 - s * Math.sin(a - 0.4)], p2 = [x2 - s * Math.cos(a + 0.4), y2 - s * Math.sin(a + 0.4)];
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 1.5) + '"/>' +
      '<path d="M' + r1(x2) + ' ' + r1(y2) + ' L' + r1(p1[0]) + ' ' + r1(p1[1]) + ' L' + r1(p2[0]) + ' ' + r1(p2[1]) + ' z" fill="' + col + '"/>';
  }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (cls || T)) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  function line(x1, y1, x2, y2, extra) { return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" ' + (extra || LN) + '/>'; }
  function xaxis(fr, a, b) { return arrow(fr.X(a), fr.Y(0), fr.X(b) + 10, fr.Y(0), 'var(--fg-2)'); }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function gauss(r) { var u = r() || 1e-9, v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function npdf(x, m, s) { return Math.exp(-(x - m) * (x - m) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI)); }
  var BL = '#2f7bf6', OR = '#f08c2e', PU = '#7c5cd6', GR = '#2f9e6a', RE = '#e5484d', TE = '#0e9aa7';

  /* ---------- 1. Venn-diagram: kockadobás ---------- */
  var vennSvg = '<svg viewBox="0 0 560 240">' +
    '<rect x="20" y="20" width="320" height="200" rx="10" fill="none" ' + LN + ' stroke-width="1.5"/>' +
    '<circle cx="140" cy="120" r="78" fill="' + BL + '" fill-opacity=".2" stroke="' + BL + '" stroke-width="2"/>' +
    '<circle cx="220" cy="120" r="78" fill="' + OR + '" fill-opacity=".2" stroke="' + OR + '" stroke-width="2"/>' +
    txt(34, 42, 'Ω', T, 16, null, 'font-weight="700"') +
    txt(92, 64, 'A', T, 16, 'middle', 'font-weight="700" fill="' + BL + '"') + txt(268, 64, 'B', T, 16, 'middle', 'font-weight="700" fill="' + OR + '"') +
    txt(105, 128, '2', T, 20, 'middle', 'font-weight="700"') + txt(180, 112, '4', T, 20, 'middle', 'font-weight="700"') + txt(180, 145, '6', T, 20, 'middle', 'font-weight="700"') +
    txt(255, 128, '5', T, 20, 'middle', 'font-weight="700"') + txt(46, 200, '1', T, 20, 'middle', 'font-weight="700"') + txt(316, 200, '3', T, 20, 'middle', 'font-weight="700"') +
    txt(180, 210, 'A ∩ B', M, 11, 'middle') +
    txt(360, 44, 'Ω = {1, 2, 3, 4, 5, 6}', T, 13) + txt(360, 70, 'A = „páros” = {2, 4, 6}', T, 13, null, 'fill="' + BL + '"') +
    txt(360, 94, 'B = „legalább 4” = {4, 5, 6}', T, 13, null, 'fill="' + OR + '"') +
    txt(360, 122, 'A ∩ B = {4, 6}', T, 13) + txt(360, 146, 'A ∪ B = {2, 4, 5, 6}', T, 13) + txt(360, 170, 'Ā = {1, 3, 5}', T, 13) +
    txt(360, 200, 'P(A ∪ B) = 3/6 + 3/6 − 2/6', T, 13, null, 'font-weight="700"') + txt(360, 220, '= 4/6 = 2/3', T, 13, null, 'font-weight="700"') + '</svg>';

  /* ---------- 2. Bayes-fa: orvosi teszt ---------- */
  function edge(x1, y1, x2, y2, p, col) {
    return line(x1, y1, x2, y2, 'stroke="' + (col || 'var(--fg-2)') + '" stroke-width="2"') +
      txt((x1 + x2) / 2, (y1 + y2) / 2 - 6, p, M, 12, 'middle');
  }
  function node(x, y, s, col) { return '<circle cx="' + x + '" cy="' + y + '" r="16" fill="var(--surface)" stroke="' + (col || 'var(--fg-2)') + '" stroke-width="2"/>' + txt(x, y + 5, s, T, 13, 'middle', 'font-weight="700"'); }
  var bayesSvg = '<svg viewBox="0 0 560 260">' +
    edge(36, 130, 160, 64, '0,01', RE) + edge(36, 130, 160, 196, '0,99', GR) +
    edge(176, 64, 300, 28, '0,90', RE) + edge(176, 64, 300, 96, '0,10') + edge(176, 196, 300, 164, '0,05', RE) + edge(176, 196, 300, 232, '0,95') +
    '<circle cx="28" cy="130" r="8" fill="var(--fg-2)"/>' +
    node(160, 64, 'B', RE) + node(160, 196, 'E', GR) + node(316, 28, '+', RE) + node(316, 96, '−') + node(316, 164, '+', RE) + node(316, 232, '−') +
    txt(160, 100, 'beteg', M, 11, 'middle') + txt(160, 232, 'egészséges', M, 11, 'middle') +
    txt(345, 33, 'beteg és +: 0,01·0,90 = 0,009', T, 12, null, 'font-weight="700" fill="' + RE + '"') +
    txt(345, 101, 'beteg és −: 0,001', M, 12) +
    txt(345, 169, 'egészs. és +: 0,99·0,05 = 0,0495', T, 12, null, 'font-weight="700" fill="' + RE + '"') +
    txt(345, 237, 'egészs. és −: 0,9405', M, 12) +
    txt(345, 124, 'P(+) = 0,009 + 0,0495 = 0,0585', T, 12) +
    txt(345, 196, 'P(B | +) = 0,009 / 0,0585 ≈ 15,4%', T, 12, null, 'font-weight="700"') + '</svg>';

  /* ---------- 3. Eloszlásfüggvény: kockadobás ---------- */
  var cf = frame(0, 7.3, 0, 1.12, 50, 14, 470, 190);
  var cdfSvg = '<svg viewBox="0 0 560 240">' + xaxis(cf, 0, 7.3) + arrow(cf.X(0), cf.Y(0), cf.X(0), 6, 'var(--fg-2)');
  [1, 2, 3, 4, 5, 6].forEach(function (k) {
    cdfSvg += txt(cf.X(k), cf.Y(0) + 16, k, M, 11, 'middle') + txt(cf.X(0) - 6, cf.Y(k / 6) + 4, k + '/6', M, 10, 'end') +
      line(cf.X(0), cf.Y(k / 6), cf.X(7.3), cf.Y(k / 6), 'stroke="var(--line)" stroke-dasharray="2 4"');
  });
  cdfSvg += line(cf.X(0), cf.Y(0), cf.X(1), cf.Y(0), 'stroke="' + TE + '" stroke-width="3"');
  for (var ck = 1; ck <= 6; ck++) {
    var xe = ck < 6 ? ck + 1 : 7.3;
    cdfSvg += line(cf.X(ck), cf.Y(ck / 6), cf.X(xe), cf.Y(ck / 6), 'stroke="' + TE + '" stroke-width="3"') +
      line(cf.X(ck), cf.Y((ck - 1) / 6), cf.X(ck), cf.Y(ck / 6), 'stroke="' + TE + '" stroke-dasharray="3 3"') +
      '<circle cx="' + cf.X(ck) + '" cy="' + cf.Y((ck - 1) / 6) + '" r="4.5" fill="var(--surface)" stroke="' + TE + '" stroke-width="2"/>' +
      '<circle cx="' + cf.X(ck) + '" cy="' + cf.Y(ck / 6) + '" r="4.5" fill="' + TE + '"/>';
  }
  cdfSvg += txt(cf.X(0) + 8, 18, 'F(x) = P(X < x) vagy P(X ≤ x)', T, 12) +
    txt(cf.X(7.3) + 4, cf.Y(0) + 4, 'x', M, 12) +
    txt(cf.X(3.5), cf.Y(0.18), 'ugrások: P(X = k) = 1/6', M, 12, 'middle') + '</svg>';

  /* ---------- 4. Sűrűségfüggvény: terület = valószínűség ---------- */
  function fG(x) { return x * Math.exp(-x); }
  var df = frame(0, 7, 0, 0.42, 40, 14, 480, 186);
  var densSvg = '<svg viewBox="0 0 560 240">' +
    '<path d="' + area(df, fG, 1, 2, 40) + '" fill="' + TE + '" fill-opacity=".35"/>' +
    '<path d="' + curve(df, fG, 0, 7, 120) + '" fill="none" stroke="' + TE + '" stroke-width="3"/>' +
    xaxis(df, 0, 7) + arrow(df.X(0), df.Y(0), df.X(0), 8, 'var(--fg-2)') +
    [0, 1, 2, 3, 4, 5, 6].map(function (k) { return txt(df.X(k), df.Y(0) + 16, k, M, 11, 'middle'); }).join('') +
    [0.1, 0.2, 0.3].map(function (v) { return txt(df.X(0) - 6, df.Y(v) + 4, hu(v, 1), M, 10, 'end'); }).join('') +
    txt(df.X(1.5), df.Y(0.12), '0,330', T, 14, 'middle', 'font-weight="700"') +
    txt(df.X(3.2), df.Y(0.3), 'f(x) = x·e^(−x),  x ≥ 0', T, 13, null, 'fill="' + TE + '"') +
    txt(df.X(3.2), df.Y(0.25), 'P(1 < X < 2) = ∫₁² f(x) dx ≈ 0,330', T, 13) +
    txt(df.X(3.2), df.Y(0.2), 'a teljes görbe alatti terület: 1', M, 12) + '</svg>';

  /* ---------- 5. Binomiális eloszlás n = 10, p = 0,5 ---------- */
  var C10 = [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1];
  var bf = frame(-0.7, 10.7, 0, 0.28, 40, 20, 500, 180);
  var binSvg = '<svg viewBox="0 0 560 240">' + line(bf.X(-0.7), bf.Y(0), bf.X(10.7), bf.Y(0));
  C10.forEach(function (c, k) {
    var p = c / 1024;
    binSvg += '<rect x="' + bf.X(k - 0.38) + '" y="' + bf.Y(p) + '" width="' + r1(bf.X(0.38) - bf.X(-0.38)) + '" height="' + r1(bf.Y(0) - bf.Y(p)) + '" rx="2" fill="' + (k === 5 ? PU : TE) + '" fill-opacity="' + (k === 5 ? 0.9 : 0.7) + '"/>' +
      txt(bf.X(k), bf.Y(0) + 16, k, M, 11, 'middle') +
      (p > 0.005 ? txt(bf.X(k), bf.Y(p) - 5, hu(p, 3), M, 10, 'middle') : '');
  });
  binSvg += txt(bf.X(-0.6), 16, 'P(X = k), n = 10, p = 0,5 (10 pénzfeldobásból k fej)', T, 12) +
    txt(bf.X(10.7), bf.Y(0) + 32, 'k', M, 12, 'end') +
    txt(bf.X(7.3), bf.Y(0.2), 'E(X) = np = 5', T, 12) + txt(bf.X(7.3), bf.Y(0.2) + 18, 'D(X) = √(np(1−p)) ≈ 1,58', T, 12) + '</svg>';

  /* ---------- 6. Exponenciális eloszlás ---------- */
  var ef = frame(0, 4, 0, 2.1, 40, 14, 480, 186);
  var expSvg = '<svg viewBox="0 0 560 240">' +
    '<path d="' + area(ef, function (x) { return Math.exp(-x); }, 1, 4, 60) + '" fill="' + TE + '" fill-opacity=".3"/>' +
    '<path d="' + curve(ef, function (x) { return Math.exp(-x); }, 0, 4, 80) + '" fill="none" stroke="' + TE + '" stroke-width="3"/>' +
    '<path d="' + curve(ef, function (x) { return 2 * Math.exp(-2 * x); }, 0, 4, 80) + '" fill="none" stroke="' + OR + '" stroke-width="2.5" stroke-dasharray="6 4"/>' +
    xaxis(ef, 0, 4) + arrow(ef.X(0), ef.Y(0), ef.X(0), 8, 'var(--fg-2)') +
    [0, 1, 2, 3].map(function (k) { return txt(ef.X(k), ef.Y(0) + 16, k + (k ? ' 000 h' : ''), M, 11, 'middle'); }).join('') +
    txt(ef.X(0) - 6, ef.Y(1) + 4, '1', M, 10, 'end') + txt(ef.X(0) - 6, ef.Y(2) + 4, '2', M, 10, 'end') +
    txt(ef.X(1.9), ef.Y(0.42), 'P(T > 1000 h) = e⁻¹ ≈ 0,368', T, 13, null, 'font-weight="700"') +
    txt(ef.X(1.2), ef.Y(1.8), 'λ = 1 / 1000 h (átlag 1000 h)', T, 12, null, 'fill="' + TE + '"') +
    txt(ef.X(1.2), ef.Y(1.55), 'λ = 2 / 1000 h (átlag 500 h)', T, 12, null, 'fill="' + OR + '"') +
    txt(ef.X(1.2), ef.Y(1.25), 'f(t) = λ·e^(−λt), t ≥ 0', M, 12) + '</svg>';

  /* ---------- 7. Normális eloszlás σ-sávokkal ---------- */
  var nf = frame(-3.6, 3.6, 0, 0.44, 20, 40, 520, 160);
  function phi(z) { return npdf(z, 0, 1); }
  var normSvg = '<svg viewBox="0 0 560 250">' +
    '<path d="' + area(nf, phi, -3, 3, 100) + '" fill="' + TE + '" fill-opacity=".18"/>' +
    '<path d="' + area(nf, phi, -2, 2, 80) + '" fill="' + TE + '" fill-opacity=".25"/>' +
    '<path d="' + area(nf, phi, -1, 1, 60) + '" fill="' + TE + '" fill-opacity=".4"/>' +
    '<path d="' + curve(nf, phi, -3.6, 3.6, 140) + '" fill="none" stroke="' + TE + '" stroke-width="3"/>' + line(nf.X(-3.6), nf.Y(0), nf.X(3.6), nf.Y(0));
  [-3, -2, -1, 0, 1, 2, 3].forEach(function (z) {
    normSvg += line(nf.X(z), nf.Y(0), nf.X(z), nf.Y(phi(z)), 'stroke="var(--fg-2)" stroke-opacity=".5" stroke-dasharray="3 3"') +
      txt(nf.X(z), nf.Y(0) + 16, z ? 'μ' + (z > 0 ? '+' : '−') + (Math.abs(z) > 1 ? Math.abs(z) : '') + 'σ' : 'μ', T, 11, 'middle') +
      txt(nf.X(z), nf.Y(0) + 31, 100 + 15 * z, M, 11, 'middle');
  });
  [[1, '68,3%', 98], [2, '95,4%', 70], [3, '99,7%', 42]].forEach(function (b) {
    var y = b[2] - 20;
    normSvg += line(nf.X(-b[0]), y, nf.X(b[0]), y, 'stroke="var(--fg-2)" stroke-width="1.5"') +
      line(nf.X(-b[0]), y - 4, nf.X(-b[0]), y + 4, 'stroke="var(--fg-2)" stroke-width="1.5"') + line(nf.X(b[0]), y - 4, nf.X(b[0]), y + 4, 'stroke="var(--fg-2)" stroke-width="1.5"') +
      '<rect x="' + (nf.X(0) - 24) + '" y="' + (y - 9) + '" width="48" height="17" rx="4" fill="var(--surface)"/>' +
      txt(nf.X(0), y + 4, b[1], T, 12, 'middle', 'font-weight="700"');
  });
  normSvg += txt(20, 242, 'IQ-skála: μ = 100, σ = 15', M, 11) + '</svg>';

  /* ---------- 8. Nagy számok törvénye: relatív gyakoriság ---------- */
  var lr = rng(3), heads = 0, lf = frame(0, 3, 0, 1, 50, 14, 470, 180), lpath = '';
  for (var li = 1; li <= 1000; li++) {
    heads += lr() < 0.5 ? 1 : 0;
    var lx = Math.log10(li);
    lpath += (li === 1 ? 'M' : 'L') + lf.X(lx) + ' ' + lf.Y(heads / li) + ' ';
  }
  var llnSvg = '<svg viewBox="0 0 560 240">' +
    '<rect x="' + lf.X(0) + '" y="' + lf.Y(0.55) + '" width="470" height="' + r1(lf.Y(0.45) - lf.Y(0.55)) + '" fill="' + GR + '" fill-opacity=".15"/>' +
    line(lf.X(0), lf.Y(0.5), lf.X(3), lf.Y(0.5), 'stroke="' + GR + '" stroke-width="1.5" stroke-dasharray="6 4"') +
    line(lf.X(0), lf.Y(0), lf.X(3), lf.Y(0)) + line(lf.X(0), lf.Y(0), lf.X(0), lf.Y(1)) +
    '<path d="' + lpath + '" fill="none" stroke="' + PU + '" stroke-width="2"/>' +
    [[0, '1'], [1, '10'], [2, '100'], [3, '1000']].map(function (t) { return txt(lf.X(t[0]), lf.Y(0) + 16, t[1], M, 11, 'middle'); }).join('') +
    [0, 0.5, 1].map(function (v) { return txt(lf.X(0) - 6, lf.Y(v) + 4, hu(v, 1), M, 11, 'end'); }).join('') +
    txt(lf.X(3), lf.Y(0) + 32, 'dobások száma (logaritmikus skála)', M, 11, 'end') +
    txt(lf.X(0) + 8, lf.Y(1) + 4, 'fejek relatív gyakorisága', T, 12, null, 'fill="' + PU + '"') +
    txt(lf.X(3) - 4, lf.Y(0.55) - 6, 'p = 0,5 ± 0,05', T, 12, 'end', 'fill="' + GR + '"') + '</svg>';

  /* ---------- 9. Centrális határeloszlás-tétel: n kocka átlaga ---------- */
  function diceDist(n) { // a dobott számok összegének pontos eloszlása
    var d = [1];
    for (var i = 0; i < n; i++) {
      var nd = []; for (var j = 0; j < d.length + 6; j++) nd[j] = 0;
      d.forEach(function (v, s) { for (var f = 1; f <= 6; f++) nd[s + f] += v / 6; });
      d = nd;
    }
    return d;
  }
  var cltSvg = '<svg viewBox="0 0 560 230">';
  [1, 2, 10].forEach(function (n, pi) {
    var d = diceDist(n), L = 14 + pi * 184, W = 166, maxp = 0, s, cnt = 5 * n + 1, bw = W / cnt;
    for (s = n; s <= 6 * n; s++) maxp = Math.max(maxp, d[s]);
    var top = 46, H = 130, base = top + H;
    for (s = n; s <= 6 * n; s++) {
      var h = d[s] / maxp * H * 0.9;
      cltSvg += '<rect x="' + r1(L + (s - n) * bw + bw * 0.08) + '" y="' + r1(base - h) + '" width="' + r1(bw * 0.84) + '" height="' + r1(h) + '" fill="' + TE + '" fill-opacity=".75"/>';
    }
    if (n === 10) {
      var mu = 35, sd = Math.sqrt(10 * 35 / 12), pth = '';
      for (var q = 0; q <= 80; q++) {
        var sx = n - 0.5 + q / 80 * cnt, yy = npdf(sx, mu, sd) / maxp * H * 0.9;
        pth += (q ? 'L' : 'M') + r1(L + (sx - n + 0.5) * bw) + ' ' + r1(base - yy) + ' ';
      }
      cltSvg += '<path d="' + pth + '" fill="none" stroke="' + RE + '" stroke-width="2"/>';
    }
    cltSvg += line(L, base, L + W, base) +
      txt(L + W / 2, 30, 'n = ' + n + (n === 1 ? ' kocka' : ' kocka átlaga'), T, 13, 'middle', 'font-weight="700"') +
      txt(L + bw / 2, base + 16, '1', M, 11, 'middle') + txt(L + W - bw / 2, base + 16, '6', M, 11, 'middle') + txt(L + W / 2, base + 16, '3,5', M, 11, 'middle');
  });
  cltSvg += txt(280, 218, 'piros: a közelítő normális sűrűség, N(3,5; 1,71²/10)', M, 11, 'middle') + '</svg>';

  /* ---------- 10. Konfidenciaintervallumok: 20 minta ---------- */
  var cr = rng(5), cif = frame(167.4, 176.6, 0, 21, 20, 10, 345, 210), ciSvg = '<svg viewBox="0 0 560 262">', miss = 0;
  for (var ci = 0; ci < 20; ci++) {
    var mm = 0; for (var cj = 0; cj < 36; cj++) mm += 172 + 6 * gauss(cr);
    mm /= 36;
    var bad = Math.abs(mm - 172) > 1.96, col = bad ? RE : TE, yy2 = cif.Y(20 - ci);
    if (bad) miss++;
    ciSvg += line(cif.X(mm - 1.96), yy2, cif.X(mm + 1.96), yy2, 'stroke="' + col + '" stroke-width="' + (bad ? 3 : 2.2) + '"') +
      '<circle cx="' + cif.X(mm) + '" cy="' + yy2 + '" r="3.2" fill="' + col + '"/>';
  }
  ciSvg += line(cif.X(172), 6, cif.X(172), cif.Y(0) - 2, 'stroke="var(--fg-2)" stroke-width="1.5" stroke-dasharray="5 4"') +
    line(cif.X(167.4), cif.Y(0), cif.X(176.6), cif.Y(0)) +
    [168, 169, 170, 171, 172, 173, 174, 175, 176].map(function (v) { return txt(cif.X(v), cif.Y(0) + 16, v, M, 11, 'middle'); }).join('') +
    txt(cif.X(172), cif.Y(0) + 32, 'μ = 172 cm (valódi, ismeretlen)', T, 11, 'middle') +
    txt(385, 50, '20 független minta, n = 36,', T, 12) + txt(385, 68, 'σ = 6 cm', T, 12) +
    txt(385, 98, 'mindegyikből 95%-os', M, 12) + txt(385, 114, 'konfidenciaintervallum:', M, 12) + txt(385, 134, 'x̄ ± 1,96 · 6/√36 = x̄ ± 1,96', T, 12, null, 'font-weight="700"') +
    txt(385, 164, miss + ' intervallum hibázik (piros)', T, 12, null, 'fill="' + RE + '"') +
    txt(385, 184, 'hosszú távon kb. 5%-uk', M, 12) + txt(385, 202, '(20-ból átlagosan 1)', M, 12) + '</svg>';

  /* ---------- 11. Első- és másodfajú hiba ---------- */
  var hf = frame(487, 507, 0, 0.23, 20, 20, 520, 170), crit = 500 - 1.645 * 2;
  function h0(x) { return npdf(x, 500, 2); }
  function h1(x) { return npdf(x, 495, 2); }
  var errSvg = '<svg viewBox="0 0 560 240">' +
    '<path d="' + area(hf, h1, crit, 501, 60) + '" fill="' + OR + '" fill-opacity=".4"/>' +
    '<path d="' + area(hf, h0, 494, crit, 40) + '" fill="' + RE + '" fill-opacity=".6"/>' +
    '<path d="' + curve(hf, h1, 487, 503, 120) + '" fill="none" stroke="' + OR + '" stroke-width="2.5"/>' +
    '<path d="' + curve(hf, h0, 492, 507, 120) + '" fill="none" stroke="' + TE + '" stroke-width="3"/>' +
    line(hf.X(487), hf.Y(0), hf.X(507), hf.Y(0)) +
    line(hf.X(crit), 22, hf.X(crit), hf.Y(0), 'stroke="var(--fg)" stroke-width="2"') +
    [488, 490, 492, 494, 496, 498, 500, 502, 504, 506].map(function (v) { return txt(hf.X(v), hf.Y(0) + 15, v, M, 11, 'middle'); }).join('') +
    txt(hf.X(500) + 30, hf.Y(0.19), 'H₀: μ = 500 g', T, 13, null, 'font-weight="700" fill="' + TE + '"') +
    txt(hf.X(495) - 30, hf.Y(0.19), 'H₁: μ = 495 g', T, 13, 'end', 'font-weight="700" fill="' + OR + '"') +
    txt(hf.X(crit) + 6, 34, 'kritikus érték: 496,71 g', T, 12) +
    txt(hf.X(crit) - 6, 34, '← elutasítjuk H₀-t', M, 12, 'end') +
    txt(hf.X(494.6), hf.Y(0.02) + 2, 'α = 5%', T, 12, 'end', 'font-weight="700" fill="' + RE + '"') +
    txt(hf.X(487.3), hf.Y(0.035), 'β ≈ 20%', T, 12, null, 'font-weight="700" fill="' + OR + '"') +
    txt(hf.X(487), 228, 'x̄ mintavételi eloszlása (n = 25, σ = 10 g, szórás 2 g)', M, 11) + '</svg>';

  /* ---------- 12. Lineáris regresszió reziduumokkal ---------- */
  var RX = [1, 2, 3, 4, 5], RY = [2, 3, 5, 4, 6], rf = frame(0, 6, 0, 7, 40, 14, 300, 200);
  var regSvg = '<svg viewBox="0 0 560 245">' +
    arrow(rf.X(0), rf.Y(0), rf.X(6) + 6, rf.Y(0), 'var(--fg-2)') + arrow(rf.X(0), rf.Y(0), rf.X(0), 8, 'var(--fg-2)') +
    line(rf.X(0.3), rf.Y(1.3 + 0.9 * 0.3), rf.X(5.8), rf.Y(1.3 + 0.9 * 5.8), 'stroke="' + PU + '" stroke-width="3"');
  RX.forEach(function (x, i) {
    var yh = 1.3 + 0.9 * x;
    regSvg += line(rf.X(x), rf.Y(RY[i]), rf.X(x), rf.Y(yh), 'stroke="' + RE + '" stroke-width="2" stroke-dasharray="4 3"') +
      '<circle cx="' + rf.X(x) + '" cy="' + rf.Y(RY[i]) + '" r="5.5" fill="' + TE + '"/>' + txt(rf.X(x), rf.Y(0) + 16, x, M, 11, 'middle');
  });
  for (var ry = 1; ry <= 6; ry++) regSvg += txt(rf.X(0) - 6, rf.Y(ry) + 4, ry, M, 11, 'end');
  regSvg += txt(rf.X(4.6), rf.Y(6.6), 'ŷ = 1,3 + 0,9x', T, 13, 'end', 'font-weight="700" fill="' + PU + '"') +
    txt(370, 40, 'adatok: (1; 2), (2; 3), (3; 5),', T, 12) + txt(370, 58, '(4; 4), (5; 6)', T, 12) +
    txt(370, 88, 'x̄ = 3, ȳ = 4', T, 12) + txt(370, 108, 'b = 9 / 10 = 0,9', T, 12) + txt(370, 128, 'a = 4 − 0,9·3 = 1,3', T, 12) +
    txt(370, 160, 'piros: reziduumok (eᵢ = yᵢ − ŷᵢ)', T, 12, null, 'fill="' + RE + '"') +
    txt(370, 180, 'Σeᵢ² = 1,9 a lehető legkisebb', M, 12) + txt(370, 208, 'r = 0,9, R² = 0,81', T, 12, null, 'font-weight="700"') + '</svg>';

  /* ---------- 13. Korreláció: három pontfelhő ---------- */
  function pearson(x, y) {
    var n = x.length, mx = 0, my = 0, sxy = 0, sxx = 0, syy = 0, i;
    for (i = 0; i < n; i++) { mx += x[i] / n; my += y[i] / n; }
    for (i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) * (x[i] - mx); syy += (y[i] - my) * (y[i] - my); }
    return sxy / Math.sqrt(sxx * syy);
  }
  var kr = rng(11), corrSvg = '<svg viewBox="0 0 560 215">';
  [['erős pozitív', function (x, e) { return 0.9 * x + 0.45 * e; }], ['nincs kapcsolat', function (x, e) { return e; }], ['nemlineáris', function (x, e) { return 1.6 * x * x - 1.5 + 0.25 * e; }]].forEach(function (pn, i) {
    var xs = [], ys = [], L = 14 + i * 184, cx0 = L + 83, cy0 = 100, pts = '';
    for (var k = 0; k < 50; k++) { var x = i === 2 ? -1.5 + 3 * k / 49 : gauss(kr) * 0.7, e = gauss(kr) * 0.7; xs.push(x); ys.push(pn[1](x, e)); }
    xs.forEach(function (x, k) {
      var px = cx0 + x * 38, py = cy0 - ys[k] * 30;
      if (px > L + 2 && px < L + 164 && py > 22 && py < 178) pts += '<circle cx="' + r1(px) + '" cy="' + r1(py) + '" r="3.2" fill="' + TE + '" fill-opacity=".7"/>';
    });
    corrSvg += '<rect x="' + L + '" y="20" width="166" height="160" rx="6" fill="none" ' + LN + ' stroke-opacity=".4"/>' + pts +
      txt(cx0, 198, pn[0] + ': r = ' + hu(pearson(xs, ys), 2), T, 12, 'middle', 'font-weight="700"');
  });
  corrSvg += txt(14, 13, 'A harmadik ábrán erős a kapcsolat, mégis r ≈ 0: a korreláció csak a lineáris összefüggést méri.', M, 11) + '</svg>';

  STUDIE.addCourse({
    id: 'valszam',
    title: 'Valószínűségszámítás és statisztika',
    icon: '🎲',
    color: '#0e9aa7',
    level: 'BSc 2–3. félév',
    description: 'Események és valószínűség, valószínűségi változók, nevezetes eloszlások, határeloszlás-tételek és a statisztikai következtetés alapjai – ábrákkal és kidolgozott példákkal.',
    intro: 'A **valószínűségszámítás** a véletlen jelenségek matematikai modellje: ismert modellből számolja ki, mire számíthatunk. A **statisztika** a fordított irány: megfigyelt adatokból következtet a modell ismeretlen paramétereire – és megmondja, mennyire bízhatunk a következtetésben. A két terület között a **határeloszlás-tételek** teremtik meg a hidat: a nagy számok törvénye miatt becsülhetünk átlagokkal, a centrális határeloszlás-tétel miatt pedig a normális eloszlással mérhetjük a becslés pontosságát.',
    topics: [
      { id: 'alap', title: 'A valószínűség alapjai' },
      { id: 'valtozo', title: 'Valószínűségi változók' },
      { id: 'eloszlas', title: 'Nevezetes eloszlások' },
      { id: 'hatar', title: 'Határeloszlás-tételek' },
      { id: 'stat', title: 'Statisztika' }
    ],
    formulas: [
      {
        id: 'felt-val-f', title: 'Feltételes valószínűség', en: 'conditional probability',
        parts: [{ t: 'P(A | B)', d: 'Az A esemény valószínűsége, feltéve, hogy B bekövetkezett' }, { t: '=' },
          { t: 'P(A ∩ B)', d: 'Annak valószínűsége, hogy A és B is bekövetkezik' }, { t: '/' },
          { t: 'P(B)', d: 'A feltétel valószínűsége', more: 'Csak P(B) > 0 esetén értelmezett.' }],
        text: 'Átrendezve kapjuk a **szorzási szabályt**: `P(A ∩ B) = P(A | B)·P(B)`. A feltétel szűkíti az eseményteret: a B-n belül nézzük, mekkora részt foglal el A.',
        example: 'Kockadobás, A = „páros”, B = „legalább 4”: `P(A | B) = P({4, 6}) / P({4, 5, 6}) = (2/6)/(3/6) = 2/3`.'
      },
      {
        id: 'bayes-f', title: 'Bayes-tétel (teljes valószínűséggel)', en: "Bayes' theorem",
        parts: [{ t: 'P(B_i | A)', d: 'Utólagos (a posteriori) valószínűség: a Bᵢ hipotézis valószínűsége az A megfigyelése után' }, { t: '=' },
          { t: 'P(A | B_i)', d: 'Likelihood: mennyire valószínű a megfigyelés, ha Bᵢ igaz' }, { t: '·' },
          { t: 'P(B_i)', d: 'Előzetes (a priori) valószínűség: Bᵢ valószínűsége a megfigyelés előtt' }, { t: '/' },
          { t: 'Σ_j P(A | B_j) P(B_j)', d: 'A megfigyelés teljes valószínűsége, P(A)', more: 'A B₁, B₂, … események teljes eseményrendszert alkotnak: páronként kizárók, és együtt kiadják Ω-t.' }],
        text: 'A nevező a **teljes valószínűség tétele**: P(A) az összes lehetséges „ok” szerinti esetek súlyozott összege. A Bayes-tétel ezt fordítja meg: a hatásból (A) következtet az okra (Bᵢ).',
        example: 'Betegség gyakorisága 1%, a teszt érzékenysége 90%, álpozitív aránya 5%: `P(B | +) = 0,9·0,01 / (0,9·0,01 + 0,05·0,99) = 0,009/0,0585 ≈ 0,154`.'
      },
      {
        id: 'szorasnegyzet-f', title: 'Szórásnégyzet (variancia)', en: 'variance',
        parts: [{ t: 'D^2(X)', d: 'X szórásnégyzete; jelölik Var(X)-szel vagy σ²-tel is', unit: '[X]²' }, { t: '=' },
          { t: 'E[(X − E(X))^2]', d: 'A várható értéktől vett eltérés négyzetének várható értéke (definíció)' }, { t: '=' },
          { t: 'E(X^2)', d: 'X négyzetének várható értéke (második momentum)' }, { t: '−' },
          { t: '(E(X))^2', d: 'A várható érték négyzete', more: 'Ez a „számolós” alak (Steiner-formula); kézi számításra kényelmesebb.' }],
        text: 'A **szórás** a szórásnégyzet gyöke, `D(X) = √D²(X)`, mértékegysége megegyezik X-ével. Szabályok: `D²(aX + b) = a²·D²(X)`, és független változókra `D²(X + Y) = D²(X) + D²(Y)`.',
        example: 'Kockadobás: E(X) = 3,5, `E(X²) = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6`, így `D²(X) = 91/6 − 12,25 = 35/12 ≈ 2,917`, D(X) ≈ 1,708.'
      },
      {
        id: 'binom-f', title: 'Binomiális eloszlás', en: 'binomial distribution',
        parts: [{ t: 'P(X = k)', d: 'Annak valószínűsége, hogy n kísérletből pontosan k sikeres' }, { t: '=' },
          { t: '(n alatt k)', d: 'Binomiális együttható: n!/(k!(n − k)!) – ennyiféleképpen választható ki a k sikeres kísérlet', more: 'Például (10 alatt 5) = 252.' }, { t: '·' },
          { t: 'p^k', d: 'k siker valószínűsége (p: a siker valószínűsége egy kísérletben)' }, { t: '·' },
          { t: '(1 − p)^{n−k}', d: 'n − k kudarc valószínűsége' }],
        text: 'Feltételek: n **független**, azonos p sikervalószínűségű kísérlet (Bernoulli-kísérletsorozat). Várható érték `np`, szórásnégyzet `np(1 − p)`.',
        example: '10 pénzfeldobásból pontosan 5 fej: `252 · 0,5¹⁰ = 252/1024 ≈ 0,246`.'
      },
      {
        id: 'normalis-f', title: 'A normális eloszlás sűrűségfüggvénye', en: 'normal (Gaussian) density',
        parts: [{ t: 'f(x)', d: 'Az N(μ; σ²) eloszlás sűrűségfüggvénye' }, { t: '=' },
          { t: '1 / (σ√(2π))', d: 'Normáló tényező: ettől lesz a görbe alatti teljes terület 1' }, { t: '·' },
          { t: 'e^{−(x − μ)^2 / (2σ^2)}', d: 'A haranggörbe alakját adó tényező', more: 'μ a csúcs helye (várható érték), σ a szélesség (szórás); az inflexiós pontok μ ± σ-nál vannak.' }],
        text: 'A **standardizálás**, `Z = (X − μ)/σ` minden normális eloszlást a standard normálisra, N(0; 1)-re vezet vissza; ennek eloszlásfüggvénye Φ(z), értékei táblázatból vagy programból olvashatók ki.',
        example: 'IQ ~ N(100; 15²): `P(IQ > 130) = P(Z > 2) = 1 − Φ(2) ≈ 0,0228`, vagyis kb. 2,3%.'
      },
      {
        id: 'clt-f', title: 'Centrális határeloszlás-tétel', en: 'central limit theorem',
        parts: [{ t: '(S_n − nμ)', d: 'Az n független, azonos eloszlású változó összegének eltérése a várható értékétől' }, { t: '/' },
          { t: '(σ√n)', d: 'Az összeg szórása', more: 'Független tagok szórásnégyzetei összeadódnak: D²(Sₙ) = nσ², így D(Sₙ) = σ√n.' },
          { t: '→' }, { t: 'N(0; 1)', d: 'Eloszlásban a standard normális eloszláshoz tart, ha n → ∞' }],
        text: 'Feltétel: X₁, X₂, … független, azonos eloszlású, véges μ várható értékkel és σ > 0 szórással. Az átlagra ugyanez: `(X̄ₙ − μ)/(σ/√n) → N(0; 1)`.',
        example: '100 kockadobás összege: μ = 3,5, σ ≈ 1,708 ⟹ az összeg várható értéke 350, szórása `1,708·10 ≈ 17,08`. `P(S ≤ 330) ≈ Φ((330 − 350)/17,08) = Φ(−1,17) ≈ 0,12`.'
      },
      {
        id: 'konf-f', title: 'Konfidenciaintervallum a várható értékre (ismert σ)', en: 'confidence interval for the mean',
        parts: [{ t: 'x̄', d: 'A minta átlaga: a μ pontbecslése' }, { t: '±' },
          { t: 'z_{α/2}', d: 'A standard normális eloszlás kritikus értéke', more: '90%: 1,645; 95%: 1,96; 99%: 2,576.' }, { t: '·' },
          { t: 'σ / √n', d: 'Az átlag standard hibája: σ a populáció szórása, n a mintaelemszám' }],
        text: 'Ismeretlen σ esetén a korrigált tapasztalati szórást (s) használjuk, és z helyett a Student-féle t-eloszlás (n − 1 szabadsági fokú) kritikus értékét.',
        example: 'n = 36, x̄ = 172 cm, σ = 6 cm, 95%: `172 ± 1,96·6/6 = 172 ± 1,96`, azaz [170,04; 173,96] cm.'
      },
      {
        id: 'regresszio-f', title: 'A legkisebb négyzetes egyenes együtthatói', en: 'least-squares regression coefficients',
        parts: [{ t: 'b', d: 'Az egyenes meredeksége: átlagosan ennyivel nő y, ha x eggyel nő' }, { t: '=' },
          { t: 'Σ(x_i − x̄)(y_i − ȳ)', d: 'Az eltérésszorzatok összege (a kovariancia (n − 1)-szerese)' }, { t: '/' },
          { t: 'Σ(x_i − x̄)^2', d: 'Az x-eltérések négyzetösszege' }, { t: ';  a =' },
          { t: 'ȳ − b·x̄', d: 'Tengelymetszet: az egyenes átmegy az (x̄; ȳ) súlyponton' }],
        text: 'Ez az a = ȳ − b·x̄ és b választás minimalizálja a reziduumok négyzetösszegét, `Σ(yᵢ − a − bxᵢ)²`. A meredekség a korrelációs együtthatóval is kifejezhető: `b = r · s_y / s_x`.',
        example: 'Adatok (1; 2), (2; 3), (3; 5), (4; 4), (5; 6): x̄ = 3, ȳ = 4, `Σ(xᵢ − x̄)(yᵢ − ȳ) = 9`, `Σ(xᵢ − x̄)² = 10`, tehát b = 0,9, a = 1,3.'
      }
    ],
    terms: [
      /* ----- A valószínűség alapjai ----- */
      { id: 'esemenyter', term: 'Eseménytér és esemény', en: 'sample space, event', topic: 'alap',
        short: 'Az eseménytér (Ω) egy véletlen kísérlet összes lehetséges kimenetelének halmaza; esemény az Ω egy részhalmaza.',
        prereq: ['lecke:matematika/tortek'],
        visual: vennSvg, caption: 'Kockadobás eseményei Venn-diagramon; a számok a kimenetelek.',
        text: 'Az Ω elemei az **elemi események** (kimenetelek). Az eseményekkel halmazműveleteket végzünk:\n\n- **A ∪ B** (összeg): A vagy B bekövetkezik (legalább az egyik);\n- **A ∩ B** (szorzat): mindkettő bekövetkezik;\n- **Ā** (komplementer, ellentett esemény): A nem következik be;\n- **A \\ B** (különbség): A igen, B nem.\n\nKülönleges események: a **biztos esemény** (Ω) és a **lehetetlen esemény** (∅). A és B **egymást kizárók**, ha A ∩ B = ∅.\n\n**Klasszikus valószínűségi mező**: ha Ω véges, és minden kimenetel egyformán valószínű, akkor `P(A) = kedvező esetek száma / összes eset száma`. Ez kombinatorikai feladattá alakítja a valószínűség-számítást.\n\nHasznos azonosságok: `P(Ā) = 1 − P(A)` és a **szita-formula**: `P(A ∪ B) = P(A) + P(B) − P(A ∩ B)`.',
        example: 'Kockadobás: A = {2, 4, 6}, B = {4, 5, 6}. `P(A ∪ B) = 3/6 + 3/6 − 2/6 = 2/3`. Valóban: A ∪ B = {2, 4, 5, 6}, négy kedvező eset a hatból.',
        pitfall: 'A klasszikus képlet csak **egyformán valószínű** kimenetelekre érvényes. Két kockával dobott összeg lehetséges értékei 2…12, de P(összeg = 7) nem 1/11, hanem 6/36 = 1/6 – a 36 rendezett pár az egyformán valószínű, nem a 11 összeg.',
        related: ['kolmogorov-axiomak', 'felteteles-valoszinuseg', 'fuggetlenseg', 'valoszinusegi-valtozo'] },
      { id: 'kolmogorov-axiomak', term: 'Kolmogorov-axiómák', en: 'Kolmogorov axioms', topic: 'alap',
        short: 'A valószínűség matematikai definíciója: P nemnegatív, P(Ω) = 1, és egymást kizáró események (megszámlálható) uniójára additív.',
        prereq: ['lecke:matematika/szazalek'],
        text: 'Andrej Kolmogorov 1933-ban mértékelméleti alapra helyezte a valószínűségszámítást. Egy **valószínűségi mező** (Ω, 𝒜, P) hármas, ahol 𝒜 az események rendszere (σ-algebra), P pedig a valószínűség:\n\n1. `P(A) ≥ 0` minden A eseményre;\n2. `P(Ω) = 1`;\n3. **σ-additivitás**: ha A₁, A₂, … páronként kizárók, akkor `P(A₁ ∪ A₂ ∪ …) = P(A₁) + P(A₂) + …`.\n\nEbből a három axiómából vezethető le minden más: P(∅) = 0, P(Ā) = 1 − P(A), A ⊆ B esetén P(A) ≤ P(B), 0 ≤ P(A) ≤ 1, a szita-formula stb.\n\nAz axiómák nem mondják meg, **mennyi** egy esemény valószínűsége – csak azt, milyen szabályoknak kell megfelelnie. A konkrét értékek modellből (pl. szimmetria), tapasztalatból (relatív gyakoriság) vagy szubjektív meggyőződésből (bayesi felfogás) származnak.',
        example: 'Egy cinkelt kockára P(6) = 0,3, a többi öt szám egyformán valószínű. Az axiómákból: `5·p + 0,3 = 1`, így p = 0,14. `P(páros) = 0,14 + 0,14 + 0,3 = 0,58`.',
        pitfall: 'A 0 valószínűségű esemény nem feltétlenül lehetetlen: egy [0; 1]-en egyenletes véletlen szám bármely konkrét értéket (pl. pontosan 0,5-öt) 0 valószínűséggel vesz fel, mégis valamelyiket felveszi.',
        related: ['esemenyter', 'felteteles-valoszinuseg', 'nagy-szamok-torvenye'] },
      { id: 'felteteles-valoszinuseg', term: 'Feltételes valószínűség', en: 'conditional probability', topic: 'alap',
        short: 'Az A esemény valószínűsége azzal a többletinformációval, hogy B bekövetkezett: P(A | B) = P(A ∩ B) / P(B).',
        prereq: ['valszam/esemenyter'],
        text: 'A feltétel **új valószínűségi mezőt** jelent: az eseménytér B-re szűkül, és minden valószínűséget P(B)-vel normálunk.\n\nA **szorzási szabály** láncolva:\n\n`P(A₁ ∩ A₂ ∩ A₃) = P(A₁)·P(A₂ | A₁)·P(A₃ | A₁ ∩ A₂)`.\n\nEz a valószínűségi fák (döntési fák) alapja: az ágak mentén a feltételes valószínűségeket szorozzuk.\n\nHa A₁, …, Aₙ teljes eseményrendszer, a **teljes valószínűség tétele**: `P(B) = Σ P(B | Aᵢ)·P(Aᵢ)`. A **Bayes-tétel** pedig a feltétel irányát fordítja meg: P(A | B)-ből P(B | A)-t számol.',
        formulas: ['felt-val-f', 'bayes-f'],
        example: 'Egy dobozban 3 piros és 2 kék golyó van; kettőt húzunk visszatevés nélkül. `P(mindkettő piros) = 3/5 · 2/4 = 0,3`. A második húzás piros voltának valószínűsége feltéve, hogy az első piros: 2/4 = 0,5.',
        pitfall: 'P(A | B) és P(B | A) általában nagyon különböző! „A betegek 90%-ánál pozitív a teszt” (P(+ | beteg)) nem azonos azzal, hogy „a pozitív tesztűek 90%-a beteg” (P(beteg | +)). Ez az ügyész téveszméje (prosecutor’s fallacy).',
        related: ['fuggetlenseg', 'bayes-tetel', 'teljes-valoszinuseg', 'esemenyter'] },
      { id: 'fuggetlenseg', term: 'Események függetlensége', en: 'independence of events', topic: 'alap',
        short: 'A és B függetlenek, ha P(A ∩ B) = P(A)·P(B); ekkor az egyik bekövetkezése nem változtat a másik valószínűségén: P(A | B) = P(A).',
        text: 'A függetlenség **valószínűségi** fogalom, nem fizikai: azt jelenti, hogy B ismerete nem ad információt A-ról. Fizikailag elkülönülő kísérletek (két külön kockadobás) független eseményeket adnak, de „összefüggőnek látszó” események is lehetnek függetlenek.\n\nTöbb esemény **teljesen független**, ha bármely részrendszerükre a szorzat-szabály teljesül. A páronkénti függetlenség ennél gyengébb.\n\nHa A és B független, akkor A és B̄, Ā és B, Ā és B̄ is az. Független eseményekre: `P(legalább egy) = 1 − P(egyik sem) = 1 − Π(1 − P(Aᵢ))`.',
        example: 'Két kockadobás: A = „az első 6-os”, B = „az összeg 7”. P(A) = 1/6, P(B) = 6/36 = 1/6, P(A ∩ B) = P((6; 1)) = 1/36 = 1/6 · 1/6 – tehát **függetlenek**, pedig B „függ” az első dobástól is. (Az „összeg 8” már nem független A-tól: P = 1/36 ≠ 5/216.)',
        pitfall: 'Függetlenség ≠ kizárás! Két kizáró, pozitív valószínűségű esemény **soha** nem független: ha A bekövetkezett, B biztosan nem, tehát P(B | A) = 0 ≠ P(B). A „szerencsejátékos tévedése” is ide tartozik: öt piros után a rulett nem „tartozik” egy feketével.',
        related: ['felteteles-valoszinuseg', 'esemenyter', 'kovariancia', 'binomialis'] },
      { id: 'teljes-valoszinuseg', term: 'Teljes valószínűség tétele', en: 'law of total probability', topic: 'alap',
        short: 'Ha B₁, …, Bₙ teljes eseményrendszer, akkor bármely A eseményre P(A) = Σ P(A | Bᵢ)·P(Bᵢ).',
        prereq: ['valszam/felteteles-valoszinuseg'],
        text: 'A **teljes eseményrendszer** páronként kizáró események sorozata, amelyek uniója Ω – vagyis a lehetséges „esetek” szétválasztása. A tétel: ha minden esetben tudjuk A feltételes valószínűségét, akkor A teljes valószínűsége ezek **súlyozott átlaga**, a súlyok az esetek valószínűségei.\n\nA valószínűségi fán ez úgy jelenik meg, hogy az A-hoz vezető ágak szorzatait összeadjuk. A tétel a Bayes-képlet nevezője is.\n\nHasonló elv érvényes a várható értékre is (**teljes várható érték tétele**): `E(X) = Σ E(X | Bᵢ)·P(Bᵢ)`.',
        formulas: ['bayes-f'],
        example: 'Három gyár adja egy termék 50%-át, 30%-át, 20%-át, selejtarányuk 1%, 2%, 3%. Egy véletlen termék selejtes: `P = 0,5·0,01 + 0,3·0,02 + 0,2·0,03 = 0,005 + 0,006 + 0,006 = 0,017`.',
        pitfall: 'A feltételes valószínűségeket nem szabad egyszerűen átlagolni: (1% + 2% + 3%)/3 = 2% hibás eredmény, mert a gyárak nem egyforma arányban termelnek.',
        related: ['felteteles-valoszinuseg', 'bayes-tetel'] },
      { id: 'bayes-tetel', term: 'Bayes-tétel', en: "Bayes' theorem", topic: 'alap',
        short: 'A feltételes valószínűség megfordítása: P(B | A) = P(A | B)·P(B) / P(A) – a megfigyelés fényében frissíti a hipotézis valószínűségét.',
        prereq: ['valszam/teljes-valoszinuseg'],
        visual: bayesSvg, caption: 'Orvosi szűrőteszt valószínűségi fája: a pozitív eredményűeknek csak kb. 15%-a beteg.',
        text: 'A tétel értelmezése: **előzetes** (a priori) tudásunkat, P(B), a megfigyelés **valószínűségével** (likelihood), P(A | B) szorozzuk, és normálunk. Az eredmény az **utólagos** (a posteriori) valószínűség, P(B | A).\n\nA tétel legfontosabb tanulsága: ritka eseményeknél az előzetes valószínűség (az **alapgyakoriság**) döntő. Ha egy betegség ritka, még egy jó teszt pozitív eredménye mögött is többnyire egészséges ember áll, mert az egészségesek óriási tömegének kis százaléka is sok álpozitívot ad.\n\nAlkalmazások: orvosi diagnosztika, spamszűrés (naiv Bayes-osztályozó), gépi tanulás, bayesi statisztika, ahol a paramétereket is valószínűségi változónak tekintjük.',
        formulas: ['bayes-f', 'felt-val-f'],
        example: 'Gyakoriság 1%, érzékenység 90%, álpozitív arány 5%. 10 000 emberből 100 beteg (90 pozitív), 9900 egészséges (495 pozitív). A 585 pozitívból 90 beteg: `90/585 ≈ 15,4%`. Egy második, független pozitív teszt után már `0,9·0,154 / (0,9·0,154 + 0,05·0,846) ≈ 77%`.',
        pitfall: 'Az alapgyakoriság figyelmen kívül hagyása (base rate fallacy) a leggyakoribb hiba: a „90%-os pontosságú” teszt pozitív eredménye nem jelent 90% esélyt a betegségre.',
        related: ['felteteles-valoszinuseg', 'teljes-valoszinuseg', 'hipotezisvizsgalat', 'elso-masodfaju-hiba'] },

      /* ----- Valószínűségi változók ----- */
      { id: 'valoszinusegi-valtozo', term: 'Valószínűségi változó', en: 'random variable', topic: 'valtozo',
        short: 'Olyan függvény, amely a véletlen kísérlet minden kimeneteléhez egy valós számot rendel: X: Ω → ℝ.',
        prereq: ['valszam/esemenyter'],
        text: 'A valószínűségi változó számmá alakítja a kimenetelt, így számolhatunk vele (átlag, szórás, összeg). Két fő típusa:\n\n- **diszkrét**: véges vagy megszámlálhatóan végtelen sok értéket vesz fel (dobott szám, hibák száma, beérkező hívások száma). Eloszlását a `pₖ = P(X = xₖ)` valószínűségek adják meg, Σpₖ = 1.\n- **folytonos**: értékei egy intervallumot töltenek ki (élettartam, magasság, mérési hiba). Bármely konkrét érték valószínűsége 0; az eloszlást a **sűrűségfüggvény** írja le.\n\nMindkét típusra közös leírás az **eloszlásfüggvény**. Az eloszlás legfontosabb számjellemzői a **várható érték** (hol a „közepe”) és a **szórás** (mennyire szóródik).\n\nVáltozók függvénye is valószínűségi változó: ha X a dobott szám, akkor X², 2X + 1 vagy két dobás összege, X + Y is az.',
        example: 'Két kockadobásnál X = a dobott számok összege. X értékei 2, …, 12; P(X = 7) = 6/36, P(X = 2) = P(X = 12) = 1/36. Ugyanazon az eseménytéren Y = a nagyobbik szám is értelmezhető.',
        pitfall: 'A valószínűségi változó **nem** változó a megszokott értelemben, és nem is valószínűség: függvény, amelynek az értéke a kísérlet kimenetelétől függ.',
        related: ['eloszlasfuggveny', 'surusegfuggveny', 'varhato-ertek', 'szoras', 'binomialis', 'esemenyter'] },
      { id: 'eloszlasfuggveny', term: 'Eloszlásfüggvény', en: 'cumulative distribution function (CDF)', topic: 'valtozo',
        short: 'Az X valószínűségi változó eloszlásfüggvénye F(x) = P(X < x) (a magyar hagyományban; angol nyelvű irodalomban P(X ≤ x)).',
        prereq: ['valszam/valoszinusegi-valtozo'],
        visual: cdfSvg, caption: 'Kockadobás eloszlásfüggvénye: lépcsős függvény, minden lehetséges értéknél 1/6-os ugrással.',
        text: 'Az eloszlásfüggvény minden valószínűségi változót egységesen leír. Tulajdonságai:\n\n- **monoton nő**;\n- `lim F(x) = 0`, ha x → −∞, és `lim F(x) = 1`, ha x → +∞;\n- balról folytonos (a P(X < x) konvencióval; a P(X ≤ x)-szel jobbról).\n\nIntervallum valószínűsége: `P(a ≤ X < b) = F(b) − F(a)`.\n\nDiszkrét változónál F lépcsős, az ugrások helye a lehetséges értékek, az ugrás nagysága a valószínűségük. Folytonos változónál F folytonos, és deriváltja a sűrűségfüggvény: `F′(x) = f(x)`.\n\nAz eloszlásfüggvény inverze a **kvantilisfüggvény**: a medián az a pont, ahol F = 0,5; a statisztikai táblázatok (pl. Φ) is eloszlásfüggvény-értékeket tartalmaznak.',
        example: 'Kockadobásra F(3,5) = P(X < 3,5) = 3/6 = 0,5; F(1) = 0 (a magyar konvencióval), F(7) = 1. `P(2 ≤ X < 5) = F(5) − F(2) = 4/6 − 1/6 = 1/2` (a 2, 3, 4 értékek).',
        pitfall: 'Diszkrét esetben a < és ≤ megkülönböztetése számít: P(X < 3) = 2/6, de P(X ≤ 3) = 3/6. Mindig ellenőrizd, melyik konvenciót használja a tankönyv vagy a szoftver (a programok általában P(X ≤ x)-et adnak).',
        related: ['valoszinusegi-valtozo', 'surusegfuggveny', 'normalis-eloszlas'] },
      { id: 'surusegfuggveny', term: 'Sűrűségfüggvény', en: 'probability density function (PDF)', topic: 'valtozo',
        short: 'Folytonos valószínűségi változó f sűrűségfüggvényére P(a < X < b) = ∫ₐᵇ f(x) dx: a görbe alatti terület a valószínűség.',
        prereq: ['analizis/riemann-integral', 'valszam/eloszlasfuggveny'],
        visual: densSvg, caption: 'A valószínűség a sűrűségfüggvény alatti terület; itt ∫₁² x·e^(−x) dx ≈ 0,330.',
        text: 'A sűrűségfüggvény feltételei: `f(x) ≥ 0`, és a teljes terület `∫ f(x) dx = 1` (−∞-től +∞-ig). Kapcsolat az eloszlásfüggvénnyel: `F(x) = ∫ f(t) dt` (−∞-től x-ig), illetve `f = F′`.\n\nA sűrűség **nem valószínűség**, hanem valószínűség egységnyi hosszra: kis Δx-re `P(x < X < x + Δx) ≈ f(x)·Δx`. Ezért mértékegysége 1/[X], és értéke lehet 1-nél nagyobb is.\n\nA folytonos változók jellemzői integrálokkal számolhatók: `E(X) = ∫ x·f(x) dx`, `E(X²) = ∫ x²·f(x) dx`.',
        formulas: ['normalis-f'],
        example: 'f(x) = x·e^(−x) (x ≥ 0): parciális integrálással F(x) = 1 − (1 + x)e^(−x), így `P(1 < X < 2) = 2e⁻¹ − 3e⁻² ≈ 0,7358 − 0,4060 = 0,330`.',
        pitfall: 'f(x) = 3 is lehet érvényes sűrűségérték (pl. a [0; 1/3] intervallumon egyenletes eloszlásnál) – a „valószínűség nem lehet 1-nél nagyobb” szabály a **területre** vonatkozik, nem a függvényértékre.',
        related: ['eloszlasfuggveny', 'valoszinusegi-valtozo', 'varhato-ertek', 'normalis-eloszlas', 'exponencialis-eloszlas', 'egyenletes-eloszlas'] },
      { id: 'varhato-ertek', term: 'Várható érték', en: 'expected value, expectation, mean', topic: 'valtozo',
        short: 'A valószínűségi változó értékeinek valószínűségekkel súlyozott átlaga: E(X) = Σ xₖ·pₖ (diszkrét), illetve ∫ x·f(x) dx (folytonos).',
        prereq: ['analizis/improprius-integral'],
        text: 'A várható érték az eloszlás **súlypontja**: ha a valószínűségeket tömegnek képzeljük a számegyenesen, ott van egyensúlyban. A nagy számok törvénye szerint sok független ismétlés **átlaga** a várható értékhez tart – ez adja a gyakorlati jelentését.\n\nSzabályok:\n\n- **linearitás**: `E(aX + bY + c) = a·E(X) + b·E(Y) + c` – **mindig** igaz, függetlenség nélkül is;\n- független változókra `E(XY) = E(X)·E(Y)`;\n- függvényre: `E(g(X)) = Σ g(xₖ)·pₖ`.\n\nA linearitás hatékony eszköz: bonyolult változót egyszerű indikátorok összegére bontunk (pl. binomiális: n darab 0/1 változó összege, így E = np).\n\nA várható érték nem mindig létezik: a Cauchy-eloszlásnál az integrál divergens.',
        example: 'Kockadobás: `E(X) = (1 + 2 + 3 + 4 + 5 + 6)/6 = 3,5`. Szerencsejáték: 1000 Ft tét, 1/6 eséllyel 5000 Ft nyeremény: `E(nyereség) = 5000/6 − 1000 ≈ −167 Ft` játékonként.',
        pitfall: 'A várható érték nem feltétlenül lehetséges érték (kockával nem dobható 3,5), és nem a „legvalószínűbb” érték (az a módusz). Általában `E(g(X)) ≠ g(E(X))`, pl. E(X²) ≠ (E(X))².',
        related: ['szoras', 'valoszinusegi-valtozo', 'kovariancia', 'nagy-szamok-torvenye', 'becsles'] },
      { id: 'szoras', term: 'Szórás és szórásnégyzet', en: 'standard deviation, variance', topic: 'valtozo',
        short: 'A szórásnégyzet a várható értéktől vett eltérés négyzetének várható értéke, D²(X) = E[(X − EX)²]; a szórás ennek gyöke, D(X).',
        prereq: ['valszam/varhato-ertek'],
        text: 'A szórás azt méri, mennyire ingadozik a változó a várható értéke körül. A négyzetre emelés miatt a nagy eltérések jobban számítanak, és a pozitív és negatív eltérések nem ejtik ki egymást.\n\nSzabályok:\n\n- `D²(aX + b) = a²·D²(X)`, `D(aX + b) = |a|·D(X)` – az eltolás nem változtat;\n- **független** X, Y esetén `D²(X ± Y) = D²(X) + D²(Y)` (különbségnél is összeadódnak!);\n- általában `D²(X + Y) = D²(X) + D²(Y) + 2·Cov(X, Y)`.\n\nKövetkezmény: n független, azonos eloszlású változó átlagának szórása `σ/√n` – az átlag annál pontosabb, minél nagyobb a minta, de csak a gyökkel arányosan.\n\nA **Csebisev-egyenlőtlenség** bármely eloszlásra garantálja: `P(|X − EX| ≥ kσ) ≤ 1/k²`.',
        formulas: ['szorasnegyzet-f'],
        example: 'Kockadobás: D²(X) = 35/12 ≈ 2,917, D(X) ≈ 1,708. Két független dobás összegére: D² = 35/6, D ≈ 2,415 (nem 2·1,708!). 100 dobás átlagának szórása `1,708/10 ≈ 0,17`.',
        pitfall: 'A szórások nem adódnak össze, csak a szórásnégyzetek (és csak függetlenség vagy korrelálatlanság esetén). A mintából számolt szórásnál a korrigált képlet n − 1-gyel oszt.',
        related: ['varhato-ertek', 'kovariancia', 'normalis-eloszlas', 'centralis-hatareloszlas', 'becsles'] },
      { id: 'kovariancia', term: 'Kovariancia és korrelációs együttható', en: 'covariance, correlation coefficient', topic: 'valtozo',
        short: 'Cov(X, Y) = E[(X − EX)(Y − EY)] = E(XY) − EX·EY méri két változó együttmozgását; normálva r = Cov(X, Y) / (D(X)·D(Y)) ∈ [−1; 1].',
        prereq: ['valszam/szoras', 'linearis-algebra/skalaris-szorzat'],
        text: 'A kovariancia pozitív, ha X és Y jellemzően egyszerre tér el ugyanabba az irányba az átlagától; negatív, ha ellentétesen. Értéke függ a mértékegységektől, ezért a normált változatot, a **korrelációs együtthatót** (r vagy ρ) használjuk:\n\n- r = ±1: pontos lineáris kapcsolat (Y = aX + b);\n- r = 0: **korrelálatlanok**;\n- |r| a lineáris kapcsolat erősségét méri.\n\nGeometriailag a centrált adatvektorok skaláris szorzata a kovariancia, r pedig a köztük lévő szög koszinusza – ezért |r| ≤ 1 (Cauchy–Schwarz-egyenlőtlenség).\n\nTöbb változó kovarianciái a **kovarianciamátrixot** alkotják; ez szimmetrikus és pozitív szemidefinit – a főkomponens-analízis kiindulópontja.',
        example: 'X egyenletes a {−1; 0; 1} halmazon, Y = X². E(X) = 0, `E(XY) = E(X³) = 0`, így Cov(X, Y) = 0 – pedig Y-t teljesen meghatározza X!',
        pitfall: 'Függetlenségből következik a korrelálatlanság, de **fordítva nem** (lásd a példát). A korreláció csak a **lineáris** kapcsolatot méri.',
        related: ['korrelacio-oksag', 'szoras', 'varhato-ertek', 'linearis-regresszio', 'fuggetlenseg'] },

      /* ----- Nevezetes eloszlások ----- */
      { id: 'binomialis', term: 'Binomiális eloszlás', en: 'binomial distribution', topic: 'eloszlas',
        short: 'n független, p sikervalószínűségű kísérletből a sikerek számának eloszlása: P(X = k) = (n alatt k)·pᵏ·(1 − p)ⁿ⁻ᵏ, k = 0, …, n.',
        prereq: ['lecke:matematika/szazalek', 'valszam/fuggetlenseg'],
        visual: binSvg, caption: 'A Bin(10; 0,5) eloszlás: a legvalószínűbb érték 5, de ennek is csak kb. 25% az esélye.',
        text: 'Jelölés: X ~ Bin(n; p). Tipikus helyzetek: n pénzfeldobásból a fejek száma, n legyártott termékből a selejtesek száma (visszatevéses mintavétel), n beteg közül a gyógyulók száma.\n\nJellemzők: `E(X) = np`, `D²(X) = np(1 − p)`. Ez a linearitásból adódik: X = X₁ + … + Xₙ, ahol Xᵢ az i-edik kísérlet 0/1 **indikátora** (Bernoulli-változó), E(Xᵢ) = p, D²(Xᵢ) = p(1 − p).\n\nKözelítések:\n\n- nagy n, kis p, mérsékelt np esetén **Poisson-eloszlással** (λ = np);\n- ha np(1 − p) elég nagy (ökölszabály: > 9), a centrális határeloszlás-tétel szerint **normális eloszlással**: N(np; np(1 − p)).\n\nVisszatevés nélküli mintavételnél a pontos eloszlás a **hipergeometrikus**; nagy sokaságból vett kis mintára a binomiális jó közelítés.',
        formulas: ['binom-f'],
        example: '10 dobásból pontosan 5 fej: 252/1024 ≈ 0,246. Legalább 8 fej: `(45 + 10 + 1)/1024 ≈ 0,055`. Egy 2%-os selejtarányú gyártásból 50 darabot vizsgálva `P(nincs selejt) = 0,98⁵⁰ ≈ 0,364`.',
        pitfall: 'A függetlenség és az állandó p elengedhetetlen. Ha egy 10 lapos pakliból húzunk visszatevés nélkül, a húzások nem függetlenek – a binomiális modell hibás.',
        related: ['poisson', 'normalis-eloszlas', 'centralis-hatareloszlas', 'varhato-ertek', 'fuggetlenseg'] },
      { id: 'poisson', term: 'Poisson-eloszlás', en: 'Poisson distribution', topic: 'eloszlas',
        short: 'Ritka, egymástól függetlenül bekövetkező események számának eloszlása adott időtartamban: P(X = k) = λᵏ·e^(−λ) / k!, k = 0, 1, 2, …',
        prereq: ['analizis/e-szam', 'valszam/binomialis'],
        text: 'A Poisson-eloszlás a binomiális **határesete**: ha n → ∞ és p → 0 úgy, hogy np = λ állandó, akkor `Bin(n; p) → Poisson(λ)`. Ezért írja le jól a „sok lehetőség, mindegyik ritka” helyzeteket:\n\n- telefonközpontba percenként beérkező hívások;\n- radioaktív bomlások száma másodpercenként;\n- sajtóhibák száma egy oldalon, balesetek egy útszakaszon.\n\nKülönleges tulajdonság: **E(X) = D²(X) = λ** – a várható érték és a szórásnégyzet egyenlő. Független Poisson-változók összege is Poisson-eloszlású: Poisson(λ₁) + Poisson(λ₂) = Poisson(λ₁ + λ₂).\n\nKapcsolat: ha az események Poisson-folyamat szerint érkeznek λ intenzitással, a két esemény közötti várakozási idő **exponenciális** eloszlású.',
        example: 'Óránként átlagosan 2 hívás érkezik (λ = 2). `P(egy órán át nincs hívás) = e⁻² ≈ 0,135`; `P(legfeljebb 2 hívás) = e⁻²(1 + 2 + 2²/2) = 5e⁻² ≈ 0,677`.',
        pitfall: 'A λ mindig a vizsgált **időtartamra** vonatkozik: ha óránként 2 hívás az átlag, akkor egy fél órára λ = 1, nem 2.',
        related: ['binomialis', 'exponencialis-eloszlas', 'varhato-ertek'] },
      { id: 'egyenletes-eloszlas', term: 'Egyenletes eloszlás', en: 'uniform distribution', topic: 'eloszlas',
        short: 'Az [a; b] intervallumon egyenletes eloszlás sűrűségfüggvénye konstans: f(x) = 1/(b − a), ha a ≤ x ≤ b, máshol 0.',
        prereq: ['valszam/surusegfuggveny'],
        text: 'Az egyenletes eloszlás a „teljes tudatlanság” modellje egy intervallumon: bármely részintervallum valószínűsége csak a hosszától függ, `P(c < X < d) = (d − c)/(b − a)`.\n\nJellemzők: `E(X) = (a + b)/2`, `D²(X) = (b − a)²/12`.\n\nEloszlásfüggvény: `F(x) = (x − a)/(b − a)` az intervallumon, előtte 0, utána 1.\n\nKülönleges szerepe a **szimulációban** van: a számítógépes véletlenszám-generátorok [0; 1)-en egyenletes számokat adnak, és ebből bármilyen eloszlás előállítható az **inverz eloszlásfüggvény** módszerével: ha U egyenletes, akkor F⁻¹(U) eloszlásfüggvénye F. Például `−ln(1 − U)/λ` exponenciális eloszlású.\n\nA diszkrét megfelelője a szabályos kocka: n egyformán valószínű érték.',
        example: 'A busz 10 percenként jár, véletlen időpontban érkezünk: a várakozási idő egyenletes [0; 10] percen. Várható várakozás 5 perc, szórás `10/√12 ≈ 2,89` perc. `P(több mint 7 percet várunk) = 3/10`.',
        pitfall: 'Két független egyenletes változó összege már **nem** egyenletes, hanem háromszög-eloszlású (két kocka összege sem egyenletes: a 7 a leggyakoribb).',
        related: ['surusegfuggveny', 'exponencialis-eloszlas', 'centralis-hatareloszlas'] },
      { id: 'exponencialis-eloszlas', term: 'Exponenciális eloszlás', en: 'exponential distribution', topic: 'eloszlas',
        short: 'Örökifjú élettartamok és várakozási idők eloszlása: f(t) = λ·e^(−λt), t ≥ 0; P(T > t) = e^(−λt), E(T) = 1/λ.',
        prereq: ['analizis/exponencialis-novekedes', 'analizis/improprius-integral'],
        visual: expSvg, caption: 'Exponenciális sűrűségfüggvények; a satírozott terület annak valószínűsége, hogy az alkatrész 1000 óránál tovább működik.',
        text: 'Paramétere a λ > 0 **intenzitás** (meghibásodási ráta). Jellemzők: `E(T) = 1/λ`, `D(T) = 1/λ`, eloszlásfüggvény `F(t) = 1 − e^(−λt)`.\n\nAz exponenciális eloszlás egyetlen folytonos eloszlás, amely **örökifjú** (memória nélküli):\n\n`P(T > s + t | T > s) = P(T > t)`.\n\nVagyis egy s ideje működő alkatrész ugyanolyan „új”, mint egy friss: a múlt nem befolyásolja a jövőt. Ez jól modellezi a véletlen meghibásodásokat (elektronikai alkatrészek), a radioaktív bomlást (felezési idő `ln 2/λ`) és a Poisson-folyamatban két esemény közötti várakozást.\n\nKopó (öregedő) alkatrészekre nem jó modell – ott a Weibull-eloszlás használatos.',
        example: 'Egy alkatrész átlagos élettartama 1000 óra (λ = 1/1000 h). `P(T > 1000 h) = e⁻¹ ≈ 0,368`: az alkatrészek csaknem kétharmada az átlagos élettartam előtt tönkremegy. Medián: `1000·ln 2 ≈ 693` óra.',
        pitfall: 'Az átlag nem a „tipikus” érték: az exponenciális eloszlás erősen jobbra ferde, a medián (693 h) jóval kisebb a várható értéknél (1000 h).',
        related: ['poisson', 'egyenletes-eloszlas', 'surusegfuggveny', 'varhato-ertek'] },
      { id: 'normalis-eloszlas', term: 'Normális (Gauss-) eloszlás', en: 'normal (Gaussian) distribution', topic: 'eloszlas',
        short: 'A μ várható értékű, σ szórású haranggörbe alakú eloszlás, N(μ; σ²); a centrális határeloszlás-tétel miatt a természet és a statisztika leggyakoribb eloszlása.',
        prereq: ['analizis/e-szam', 'valszam/surusegfuggveny'],
        visual: normSvg, caption: 'A normális eloszlás „68–95–99,7” szabálya: az értékek ennyi százaléka esik μ ± 1σ, 2σ, 3σ közé.',
        text: 'Sűrűségfüggvénye szimmetrikus μ-re, ott maximális; az inflexiós pontok μ ± σ-nál vannak. A **standard normális** eloszlás N(0; 1), eloszlásfüggvénye Φ(z); a `Z = (X − μ)/σ` standardizálással minden normális eloszlás erre vezethető vissza.\n\n**68–95–99,7 szabály**: `P(|X − μ| < σ) ≈ 68,3%`, `< 2σ`: 95,4%, `< 3σ`: 99,7%. A minőségbiztosítás „six sigma” módszere is erre utal.\n\nMiért ilyen gyakori? A centrális határeloszlás-tétel szerint sok kis, független hatás összege közel normális eloszlású – így alakul a mérési hiba, a testmagasság, a zaj.\n\nTulajdonságok: független normálisok összege normális, `N(μ₁; σ₁²) + N(μ₂; σ₂²) = N(μ₁ + μ₂; σ₁² + σ₂²)`; lineáris transzformáltja is normális.',
        formulas: ['normalis-f'],
        example: 'IQ ~ N(100; 15²). `P(85 < IQ < 115) ≈ 68,3%`, `P(IQ > 130) = 1 − Φ(2) ≈ 2,3%`. Hány pont a felső 10% határa? Φ(z) = 0,9 ⟹ z ≈ 1,2816, így `100 + 1,2816·15 ≈ 119`.',
        pitfall: 'Nem minden adat normális eloszlású: a jövedelmek, várakozási idők, fájlméretek erősen ferdék. A normális eloszlás farka nagyon vékony – pénzügyi hozamoknál az extrém események sokkal gyakoribbak, mint amit a Gauss-modell jósol.',
        related: ['centralis-hatareloszlas', 'szoras', 'konfidenciaintervallum', 'binomialis', 'eloszlasfuggveny', 'hipotezisvizsgalat'] },

      /* ----- Határeloszlás-tételek ----- */
      { id: 'nagy-szamok-torvenye', term: 'Nagy számok törvénye', en: 'law of large numbers', topic: 'hatar',
        short: 'Független, azonos eloszlású valószínűségi változók átlaga a mintaelemszám növekedtével a közös várható értékhez tart.',
        prereq: ['analizis/sorozat-hatarertek', 'valszam/varhato-ertek'],
        visual: llnSvg, caption: '1000 pénzfeldobás: a fejek relatív gyakorisága eleinte erősen ingadozik, majd 0,5 körül stabilizálódik.',
        text: 'Két változata:\n\n- **gyenge törvény**: minden ε > 0-ra `P(|X̄ₙ − μ| > ε) → 0`, ha n → ∞ (sztochasztikus konvergencia). Véges szórás esetén a Csebisev-egyenlőtlenségből azonnal adódik: `P(|X̄ₙ − μ| ≥ ε) ≤ σ²/(nε²)`;\n- **erős törvény**: X̄ₙ → μ **1 valószínűséggel** (majdnem biztosan).\n\nKülönleges eset (Bernoulli): egy esemény **relatív gyakorisága** a valószínűségéhez tart. Ez köti össze a matematikai valószínűséget a tapasztalattal, és ez indokolja, hogy a statisztikában a mintaátlaggal becsüljük a várható értéket.\n\nGyakorlati következmények: a biztosítótársaságok és kaszinók sok független kockázat átlagán keresztül szinte biztos bevételre számíthatnak; a Monte-Carlo-szimulációk is ezen alapulnak.',
        example: 'Szabályos érme, n = 10 000 dobás: a relatív gyakoriság szórása `√(0,25/10 000) = 0,005`, így a Csebisev-egyenlőtlenség szerint `P(|gyakoriság − 0,5| ≥ 0,02) ≤ 0,25/(10 000 · 0,0004) = 0,0625`. (A pontos valószínűség ennél jóval kisebb.)',
        pitfall: 'A törvény nem azt mondja, hogy a fejek és írások **száma** kiegyenlítődik: a különbség abszolút értékben tipikusan √n nagyságrendben nő, csak az **arány** tart 0,5-hez. A korábbi eredmények nem „kompenzálódnak” (szerencsejátékos tévedése).',
        related: ['centralis-hatareloszlas', 'varhato-ertek', 'becsles', 'kolmogorov-axiomak'] },
      { id: 'centralis-hatareloszlas', term: 'Centrális határeloszlás-tétel', en: 'central limit theorem (CLT)', topic: 'hatar',
        short: 'Sok független, azonos eloszlású, véges szórású változó összege (átlaga) standardizálva közel standard normális eloszlású, bármilyen is az eredeti eloszlás.',
        prereq: ['valszam/normalis-eloszlas', 'valszam/szoras'],
        visual: cltSvg, caption: 'Egy kocka eloszlása egyenletes, két kocka átlagáé háromszög, tíz kockáé már szinte tökéletes haranggörbe.',
        text: 'A tétel a valószínűségszámítás egyik legfontosabb eredménye. Azt mondja ki, hogy az átlag eloszlása közelítőleg `N(μ; σ²/n)` – csak az eredeti eloszlás várható értéke és szórása számít, az alakja nem.\n\nKövetkezmények:\n\n- megmagyarázza, miért gyakori a normális eloszlás a természetben (sok kis hatás összege);\n- a binomiális eloszlás nagy n-re normálissal közelíthető (**Moivre–Laplace-tétel**);\n- a statisztikai próbák és konfidenciaintervallumok nagy mintánál akkor is működnek, ha az adatok nem normálisak.\n\nA konvergencia sebessége az eredeti eloszlás alakjától függ: szimmetrikus eloszlásnál n ≈ 10–30 már jó közelítést ad, erősen ferde eloszlásnál nagyobb n kell.\n\nDiszkrét változók közelítésénél a **folytonossági korrekció** (±0,5) javít a pontosságon.',
        formulas: ['clt-f'],
        example: '100 kockadobás összege: E = 350, D = √(100·35/12) ≈ 17,08. `P(S ≤ 330) ≈ Φ(−1,17) ≈ 0,12`. Folytonossági korrekcióval `Φ((330,5 − 350)/17,08) ≈ 0,127`.',
        pitfall: 'Véges szórás kell: a Cauchy-eloszlású változók átlaga nem lesz normális, akármekkora is n. A tétel az **átlag** eloszlásáról szól, nem az egyedi adatokéról – a nagy minta nem teszi normálissá magukat az adatokat.',
        related: ['normalis-eloszlas', 'nagy-szamok-torvenye', 'konfidenciaintervallum', 'binomialis', 'szoras', 'egyenletes-eloszlas'] },

      /* ----- Statisztika ----- */
      { id: 'becsles', term: 'Becslés (pontbecslés)', en: 'estimation, point estimator', topic: 'stat',
        short: 'Egy ismeretlen paraméter (pl. μ, σ, p) közelítése a mintából számolt statisztikával; jó becslés a torzítatlan, konzisztens és hatásos becslés.',
        prereq: ['valszam/varhato-ertek'],
        text: 'A minta X₁, …, Xₙ független, azonos eloszlású változók sorozata; a **becslőfüggvény** (statisztika) ezek függvénye, így maga is valószínűségi változó. Kívánatos tulajdonságok:\n\n- **torzítatlan**: a becslés várható értéke a valódi paraméter;\n- **konzisztens**: n → ∞ esetén a valódi értékhez tart;\n- **hatásos**: a torzítatlan becslések közül a legkisebb szórású.\n\nNevezetes becslések:\n\n- várható érték: a **mintaátlag**, `x̄ = Σxᵢ/n`;\n- szórásnégyzet: a **korrigált tapasztalati szórásnégyzet**, `s² = Σ(xᵢ − x̄)²/(n − 1)`;\n- valószínűség: a **relatív gyakoriság**.\n\nÁltalános módszerek: a **maximum likelihood** becslés azt a paramétert választja, amely mellett a megfigyelt minta a legvalószínűbb; a **momentumok módszere** az elméleti és a tapasztalati momentumokat teszi egyenlővé.',
        example: 'Minta: 4, 7, 5, 8, 6. `x̄ = 30/5 = 6`, az eltérések négyzetösszege `4 + 1 + 1 + 4 + 0 = 10`, `s² = 10/4 = 2,5`, s ≈ 1,58. (n-nel osztva 2-t kapnánk, ami szisztematikusan alulbecsül.)',
        pitfall: 'Miért n − 1? Mert az eltéréseket a mintaátlagtól mérjük, amely „közelebb van” az adatokhoz, mint a valódi μ, így az n-nel osztott változat átlagosan kisebb a valódi σ²-nél. Az x̄ kiszámítása egy szabadsági fokot „elhasznál”.',
        related: ['konfidenciaintervallum', 'nagy-szamok-torvenye', 'varhato-ertek', 'szoras', 'linearis-regresszio'] },
      { id: 'konfidenciaintervallum', term: 'Konfidenciaintervallum', en: 'confidence interval', topic: 'stat',
        short: 'A mintából számolt intervallum, amely előre rögzített (pl. 95%-os) valószínűséggel lefedi az ismeretlen paramétert – az eljárás megbízhatósága a minták sokaságára értendő.',
        prereq: ['valszam/becsles', 'valszam/centralis-hatareloszlas'],
        visual: ciSvg, caption: '20 különböző minta 95%-os konfidenciaintervalluma: a legtöbb lefedi a valódi μ-t, de nem mindegyik.',
        text: 'A pontbecslés egyetlen szám, de nem mondja meg, mennyire pontos. Az **intervallumbecslés** egy [L; U] intervallumot ad, ahol L és U a mintától függ (tehát véletlen), a paraméter viszont rögzített.\n\nA várható értékre, ismert σ mellett: `x̄ ± z·σ/√n`. Ismeretlen σ esetén s-sel és a Student-féle **t-eloszlás** kritikus értékével számolunk.\n\nAz intervallum szélessége:\n\n- nő a megbízhatósági szinttel (99% szélesebb, mint 95%);\n- nő a szórással;\n- csökken a minta méretével, `1/√n` arányban: a pontosság megduplázásához **négyszeres** minta kell.\n\nKapcsolat a hipotézisvizsgálattal: a 95%-os intervallum pontosan azokat a μ₀ értékeket tartalmazza, amelyeket a kétoldali 5%-os próba nem utasítana el.',
        formulas: ['konf-f'],
        example: '36 fős minta, x̄ = 172 cm, σ = 6 cm: 95%-os intervallum `172 ± 1,96`, azaz [170,04; 173,96] cm. ±1 cm-es pontossághoz `n = (1,96·6/1)² ≈ 138,3`, tehát legalább 139 fő kell.',
        pitfall: 'Az elkészült intervallumra **nem** mondhatjuk, hogy „95% a valószínűsége, hogy μ benne van” – μ nem véletlen, vagy benne van, vagy nincs. A 95% az eljárásra vonatkozik: ha sokszor ismételnénk, az intervallumok 95%-a fedné le μ-t.',
        related: ['becsles', 'hipotezisvizsgalat', 'normalis-eloszlas', 'centralis-hatareloszlas'] },
      { id: 'hipotezisvizsgalat', term: 'Hipotézisvizsgálat (statisztikai próba)', en: 'hypothesis testing, statistical test', topic: 'stat',
        short: 'Döntési eljárás, amely a minta alapján eldönti, elvetjük-e a H₀ nullhipotézist a H₁ ellenhipotézis javára, rögzített α szignifikanciaszinten.',
        prereq: ['valszam/normalis-eloszlas'],
        text: 'Lépései:\n\n1. **nullhipotézis** (H₀, „nincs hatás”, pl. μ = μ₀) és **ellenhipotézis** (H₁: μ ≠ μ₀ kétoldali, vagy μ < μ₀, μ > μ₀ egyoldali) megfogalmazása;\n2. a **szignifikanciaszint** (α, tipikusan 5%) rögzítése **előre**;\n3. **próbastatisztika** kiszámítása, amelynek eloszlása H₀ esetén ismert – pl. az egymintás z-próbánál `z = (x̄ − μ₀)/(σ/√n)`;\n4. döntés: ha a statisztika a **kritikus tartományba** esik (vagy a p-érték < α), H₀-t elvetjük.\n\nGyakori próbák: z-próba (ismert σ), **t-próba** (ismeretlen σ; egy- és kétmintás), **χ²-próba** (illeszkedés, függetlenség), F-próba és varianciaanalízis (ANOVA).\n\nA logika a „bizonyítás ellentmondással” statisztikai változata: feltesszük H₀-t, és megnézzük, mennyire meglepő az adat.',
        formulas: ['clt-f'],
        example: 'Töltősúly: H₀: μ = 500 g, H₁: μ < 500 g (fogyasztóvédelem), σ = 10 g, n = 25, x̄ = 496 g. `z = (496 − 500)/(10/5) = −2`. A kritikus érték 5%-os egyoldali próbánál −1,645, mivel −2 < −1,645, H₀-t elvetjük: a csomagok szignifikánsan könnyebbek.',
        pitfall: 'H₀ megtartása **nem bizonyítja** H₀-t, csak azt jelenti, hogy az adatok nem elég erős bizonyítékok ellene (kis minta mellett ez gyakori). Helyes megfogalmazás: „nem utasítjuk el”, nem pedig „elfogadjuk”.',
        related: ['p-ertek', 'elso-masodfaju-hiba', 'konfidenciaintervallum', 'normalis-eloszlas', 'bayes-tetel'] },
      { id: 'p-ertek', term: 'p-érték', en: 'p-value', topic: 'stat',
        short: 'Annak valószínűsége, hogy H₀ fennállása esetén a megfigyeltnél legalább ennyire szélsőséges (H₁ irányába mutató) eredményt kapunk.',
        prereq: ['valszam/hipotezisvizsgalat'],
        text: 'A p-érték azt méri, mennyire **összeegyeztethetetlen** az adat a nullhipotézissel. Döntési szabály: ha p < α, H₀-t elvetjük („az eredmény szignifikáns”).\n\nElőnye a puszta igen/nem döntéssel szemben, hogy megmutatja a bizonyíték erősségét: p = 0,049 és p = 0,0001 egyaránt szignifikáns 5%-on, de nagyon különböző mértékben.\n\nAmit a p-érték **nem** jelent:\n\n- nem annak valószínűsége, hogy H₀ igaz;\n- nem annak valószínűsége, hogy az eredmény „véletlen műve”;\n- nem a hatás nagyságának mértéke: nagy mintánál egy gyakorlatilag jelentéktelen különbség is nagyon kis p-t adhat.\n\nA tudományos gyakorlatban a p-értékek mellett **hatásméretet** és **konfidenciaintervallumot** is közölni kell. A sok próbát lefuttató, és csak a szignifikánsakat közlő „p-hacking” hamis felfedezésekhez vezet; többszörös összehasonlításnál korrekció (pl. Bonferroni) kell.',
        example: 'A töltősúlyos példában z = −2, egyoldali H₁: `p = Φ(−2) ≈ 0,023`. Mivel 0,023 < 0,05, 5%-on elvetjük H₀-t, de 1%-on nem. Kétoldali ellenhipotézisnél p ≈ 0,046 lenne.',
        pitfall: 'Ha 20 független próbát futtatunk olyan esetekben, ahol H₀ mindig igaz, átlagosan **egy** „szignifikáns” eredményt kapunk 5%-on – pusztán a véletlen miatt.',
        related: ['hipotezisvizsgalat', 'elso-masodfaju-hiba', 'konfidenciaintervallum'] },
      { id: 'elso-masodfaju-hiba', term: 'Első- és másodfajú hiba', en: 'type I and type II error', topic: 'stat',
        short: 'Elsőfajú hiba: igaz H₀-t vetünk el (valószínűsége α); másodfajú hiba: hamis H₀-t tartunk meg (valószínűsége β). A próba ereje 1 − β.',
        prereq: ['valszam/hipotezisvizsgalat'],
        visual: errSvg, caption: 'A két hiba ugyanazon a kritikus értéken osztozik: α csökkentése (a vonal balra tolása) β-t növeli.',
        text: 'A négy lehetséges kimenet:\n\n- H₀ igaz, megtartjuk – helyes;\n- H₀ igaz, elvetjük – **elsőfajú hiba** (téves riasztás, álpozitív), valószínűsége **α**;\n- H₀ hamis, elvetjük – helyes; ennek valószínűsége a **próba ereje**, 1 − β;\n- H₀ hamis, megtartjuk – **másodfajú hiba** (elmulasztott felfedezés, álnegatív), valószínűsége **β**.\n\nα-t mi választjuk, β viszont a valódi paramétertől, a mintamérettől és α-tól függ. Rögzített n mellett a kettő ellentétesen mozog. Mindkettő csökkentésének egyetlen útja a **mintaelemszám növelése**.\n\nA tervezéskor erőelemzéssel (power analysis) határozzuk meg, mekkora minta kell egy adott hatás megbízható (pl. 80%-os erővel történő) kimutatásához.\n\nMelyik hiba súlyosabb, az alkalmazástól függ: bíróságon az ártatlan elítélése (H₀: ártatlan) elsőfajú hiba, ezért α-t kicsinek választjuk; szűrővizsgálatnál a beteg elmulasztása (másodfajú) lehet a súlyosabb.',
        example: 'Töltősúly-próba (σ = 10 g, n = 25, α = 5%, egyoldali): a kritikus érték `500 − 1,645·2 = 496,71` g. Ha valójában μ = 495 g, a próba ereje `Φ((496,71 − 495)/2) = Φ(0,855) ≈ 0,80`, tehát β ≈ 0,20.',
        pitfall: 'α nem annak valószínűsége, hogy egy elvetett H₀ valójában igaz volt – az egy fordított feltételes valószínűség (Bayes!), amely az előzetes valószínűségtől is függ.',
        related: ['hipotezisvizsgalat', 'p-ertek', 'bayes-tetel', 'normalis-eloszlas'] },
      { id: 'linearis-regresszio', term: 'Lineáris regresszió', en: 'linear regression, least squares', topic: 'stat',
        short: 'Az y ≈ a + b·x egyenes illesztése adatpontokra a legkisebb négyzetek módszerével: a reziduumok négyzetösszegét minimalizáljuk.',
        prereq: ['lecke:matematika/linearis-fuggveny', 'analizis/szelsoertek'],
        visual: regSvg, caption: 'A regressziós egyenes a függőleges eltérések (reziduumok) négyzetösszegét teszi a lehető legkisebbé.',
        text: 'Modell: `yᵢ = a + b·xᵢ + εᵢ`, ahol εᵢ a véletlen hiba. A **legkisebb négyzetek módszere** a `Q(a, b) = Σ(yᵢ − a − bxᵢ)²` függvényt minimalizálja; a parciális deriváltak nullává tételéből adódnak a normálegyenletek, és megoldásuk:\n\n`b = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)²`, `a = ȳ − b·x̄`.\n\nAz illeszkedés jóságát a **determinációs együttható** méri: `R² = 1 − Σeᵢ² / Σ(yᵢ − ȳ)²`, ami azt mutatja meg, hogy y szórásnégyzetének mekkora hányadát magyarázza x. Egyváltozós esetben R² = r².\n\nTöbb magyarázó változónál (**többszörös regresszió**) mátrixalakban: `β = (XᵀX)⁻¹Xᵀy` – ez a lineáris algebra és a statisztika találkozása.\n\nA regresszió y-t x-ből jósolja; x-et y-ból jósolni egy **másik** egyenest ad.',
        formulas: ['regresszio-f'],
        example: 'Az ábra adatain b = 0,9, a = 1,3. Becslés x = 6-ra: `ŷ = 1,3 + 5,4 = 6,7`. A reziduumok: −0,2; −0,1; 1,0; −0,9; 0,2, négyzetösszegük 1,9, `Σ(yᵢ − ȳ)² = 10`, így R² = 1 − 1,9/10 = 0,81.',
        pitfall: 'Az adatok tartományán kívüli **extrapoláció** veszélyes: a lineáris kapcsolat csak a megfigyelt intervallumon igazolt. Egy kiugró pont erősen elhúzhatja az egyenest, ezért mindig nézd meg a pontfelhőt is.',
        related: ['korrelacio-oksag', 'kovariancia', 'becsles'] },
      { id: 'korrelacio-oksag', term: 'Korreláció vs. ok-okozati kapcsolat', en: 'correlation vs. causation', topic: 'stat',
        short: 'Két változó együttmozgása (korrelációja) önmagában nem bizonyítja, hogy az egyik okozza a másikat.',
        prereq: ['valszam/kovariancia'],
        visual: corrSvg, caption: 'Pearson-féle korrelációs együttható három szimulált adathalmazon.',
        text: 'Egy erős korrelációnak több magyarázata lehet:\n\n1. **X okozza Y-t** – ez lenne az ok-okozati kapcsolat;\n2. **fordított okság**: Y okozza X-et;\n3. **zavaró (confounding) változó**: egy harmadik Z mindkettőt befolyásolja;\n4. **véletlen egybeesés**: sok változópár között mindig akad, amelyik „véletlenül” korrelál;\n5. **szelekciós torzítás**: a minta kiválasztása hozza létre a kapcsolatot.\n\nAz okság igazolásának aranystandardja a **randomizált kontrollált kísérlet**: a véletlen besorolás kiegyenlíti a zavaró tényezőket. Megfigyeléses adatoknál a zavaró változókra kontrollálni kell (többszörös regresszió, rétegzés), és még akkor is óvatosan kell fogalmazni.\n\nA **Simpson-paradoxon** mutatja a zavaró változó erejét: csoportonként fennálló összefüggés az összevont adatokon megfordulhat.\n\nTovábbá: r ≈ 0 nem jelenti a kapcsolat hiányát (nemlineáris kapcsolat), és r ≈ 1 sem jelent meredek összefüggést – r a pontok egyenes körüli szóródását méri, nem a meredekséget.',
        example: 'A fagylalteladások és a vízbefulladások száma erősen korrelál – mindkettőt a nyári meleg (zavaró változó) növeli. A tűzoltók száma egy tűzesetnél korrelál a kárral – mert a nagy tűzhöz több tűzoltót küldenek (fordított okság).',
        pitfall: 'A „korreláció nem okság” elv fordítva sem használható érvként: a korreláció hiánya nem zárja ki az okozati kapcsolatot (pl. két ellentétes hatás kiolthatja egymást, vagy a kapcsolat nemlineáris).',
        related: ['kovariancia', 'linearis-regresszio', 'hipotezisvizsgalat'] }
    ]
  });
})();
