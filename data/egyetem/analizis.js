/* Egyetem: Matematikai analízis (kalkulus) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';

  /* ---------- rajzsegédek ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function hu(v, d) { return v.toFixed(d).replace('.', ','); }
  // Matematikai koordináták → képpont (x0..x1, y0..y1 a [L, L+W] × [Tp, Tp+H] téglalapra).
  function frame(x0, x1, y0, y1, L, Tp, W, H) {
    return {
      X: function (x) { return r1(L + (x - x0) / (x1 - x0) * W); },
      Y: function (y) { return r1(Tp + (y1 - y) / (y1 - y0) * H); }
    };
  }
  // Függvénygörbe path-ként; a [ylo, yhi] sávból kilépő részeknél megszakad.
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
  // Nyíl (vonal + nyílhegy).
  function arrow(x1, y1, x2, y2, col, w) {
    var a = Math.atan2(y2 - y1, x2 - x1), s = 8;
    var p1 = [x2 - s * Math.cos(a - 0.4), y2 - s * Math.sin(a - 0.4)], p2 = [x2 - s * Math.cos(a + 0.4), y2 - s * Math.sin(a + 0.4)];
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 1.5) + '"/>' +
      '<path d="M' + r1(x2) + ' ' + r1(y2) + ' L' + r1(p1[0]) + ' ' + r1(p1[1]) + ' L' + r1(p2[0]) + ' ' + r1(p2[1]) + ' z" fill="' + col + '"/>';
  }
  function axes(xa, ya, xb, yb, x0, y0) { // x tengely ya magasságban xa→xb, y tengely x0-nál yb→y0 (felfelé)
    return arrow(xa, ya, xb, ya, 'var(--fg-2)') + arrow(x0, y0, x0, yb, 'var(--fg-2)');
  }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (cls || T)) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }

  /* ---------- 1. Konvergens sorozat ε-sávval ---------- */
  var sq = frame(0, 25, -0.4, 1.8, 50, 16, 440, 180), A = 1, eps = 0.25;
  var seqSvg = '<svg viewBox="0 0 560 230">' +
    '<rect x="50" y="' + sq.Y(A + eps) + '" width="440" height="' + r1(sq.Y(A - eps) - sq.Y(A + eps)) + '" fill="#7c5cd6" opacity=".15"/>' +
    '<line x1="50" y1="' + sq.Y(A + eps) + '" x2="490" y2="' + sq.Y(A + eps) + '" stroke="#7c5cd6" stroke-dasharray="5 4"/>' +
    '<line x1="50" y1="' + sq.Y(A - eps) + '" x2="490" y2="' + sq.Y(A - eps) + '" stroke="#7c5cd6" stroke-dasharray="5 4"/>' +
    '<line x1="50" y1="' + sq.Y(A) + '" x2="490" y2="' + sq.Y(A) + '" stroke="#7c5cd6" stroke-width="1.5"/>' +
    axes(50, sq.Y(0), 505, 8, 50, 206) +
    '<line x1="' + sq.X(4.5) + '" y1="20" x2="' + sq.X(4.5) + '" y2="' + sq.Y(-0.35) + '" stroke="var(--muted)" stroke-dasharray="3 4"/>' +
    txt(sq.X(4.5), 222, 'N', T, 13, 'middle', 'font-weight="700"') +
    txt(496, sq.Y(A + eps) + 4, 'A + ε', T, 12) + txt(496, sq.Y(A) + 4, 'A', T, 13, null, 'font-weight="700"') + txt(496, sq.Y(A - eps) + 4, 'A − ε', T, 12) +
    txt(508, sq.Y(0) + 4, 'n', M, 12) + txt(58, 18, 'aₙ', M, 12) + txt(44, sq.Y(0) + 4, '0', M, 11, 'end');
  for (var n = 1; n <= 24; n++) {
    var an = 1 + (n % 2 ? -1 : 1) * 1.2 / n, inside = Math.abs(an - A) < eps;
    seqSvg += '<line x1="' + sq.X(n) + '" y1="' + sq.Y(0) + '" x2="' + sq.X(n) + '" y2="' + sq.Y(an) + '" stroke="var(--line)"/>' +
      '<circle cx="' + sq.X(n) + '" cy="' + sq.Y(an) + '" r="4.5" fill="' + (inside ? '#7c5cd6' : '#e5484d') + '"/>';
  }
  seqSvg += txt(300, 200, 'piros: a sávon kívül (véges sok tag)', M, 11) + '</svg>';

  /* ---------- 2. Szelő → érintő ---------- */
  var sc = frame(0, 6, 0, 5.4, 40, 12, 500, 200);
  function fS(x) { return 0.13 * x * x + 0.2 * x + 0.5; }
  var x0 = 1.5, fx0 = fS(x0), slope0 = 0.26 * x0 + 0.2;
  var secSvg = '<svg viewBox="0 0 560 245">' + axes(40, sc.Y(0), 548, 6, 40, sc.Y(0));
  [3, 2, 1].forEach(function (h, i) {
    var m = (fS(x0 + h) - fx0) / h, xa = 0.2, xb = Math.min(5.9, x0 + h + 0.9);
    secSvg += '<line x1="' + sc.X(xa) + '" y1="' + sc.Y(fx0 + m * (xa - x0)) + '" x2="' + sc.X(xb) + '" y2="' + sc.Y(fx0 + m * (xb - x0)) + '" stroke="#f08c2e" stroke-width="2" opacity="' + [0.45, 0.7, 1][i] + '"/>' +
      '<circle cx="' + sc.X(x0 + h) + '" cy="' + sc.Y(fS(x0 + h)) + '" r="5" fill="var(--surface)" stroke="#f08c2e" stroke-width="2.5"/>' +
      txt(sc.X(x0 + h) - 8, sc.Y(fS(x0 + h)) - 9, 'Q (h = ' + h + ')', M, 11, 'end');
  });
  secSvg += '<line x1="' + sc.X(0) + '" y1="' + sc.Y(fx0 - slope0 * x0) + '" x2="' + sc.X(5.8) + '" y2="' + sc.Y(fx0 + slope0 * (5.8 - x0)) + '" stroke="#2f9e6a" stroke-width="3"/>' +
    '<path d="' + curve(sc, fS, 0, 5.75, 80, 0, 5.4) + '" fill="none" stroke="#7c5cd6" stroke-width="3"/>' +
    // h és Δf a legnagyobb szelőhöz
    '<line x1="' + sc.X(x0) + '" y1="' + sc.Y(fx0) + '" x2="' + sc.X(x0 + 3) + '" y2="' + sc.Y(fx0) + '" stroke="var(--muted)" stroke-dasharray="4 3"/>' +
    '<line x1="' + sc.X(x0 + 3) + '" y1="' + sc.Y(fx0) + '" x2="' + sc.X(x0 + 3) + '" y2="' + sc.Y(fS(x0 + 3)) + '" stroke="var(--muted)" stroke-dasharray="4 3"/>' +
    txt(sc.X(x0 + 1.5), sc.Y(fx0) + 16, 'h', T, 13, 'middle', 'font-style="italic"') +
    txt(sc.X(x0 + 3) + 6, sc.Y((fx0 + fS(x0 + 3)) / 2) + 22, 'f(x₀+h) − f(x₀)', M, 11) +
    '<circle cx="' + sc.X(x0) + '" cy="' + sc.Y(fx0) + '" r="5.5" fill="#7c5cd6"/>' + txt(sc.X(x0) - 10, sc.Y(fx0) - 10, 'P', T, 13, 'end', 'font-weight="700"') +
    '<line x1="' + sc.X(x0) + '" y1="' + sc.Y(fx0) + '" x2="' + sc.X(x0) + '" y2="' + sc.Y(0) + '" stroke="var(--muted)" stroke-dasharray="2 3"/>' + txt(sc.X(x0), sc.Y(0) + 16, 'x₀', T, 12, 'middle') +
    txt(60, 24, 'szelők (h = 3, 2, 1)', T, 12, null, 'fill="#f08c2e"') + txt(60, 42, 'érintő: h → 0, meredeksége f′(x₀)', T, 12) +
    '<rect x="44" y="33" width="10" height="4" fill="#2f9e6a"/><rect x="44" y="15" width="10" height="4" fill="#f08c2e"/></svg>';

  /* ---------- 3. Riemann-összeg ---------- */
  var rf = frame(0, 7, 0, 3.2, 40, 14, 500, 190);
  function fR(x) { return 1.2 + 0.8 * Math.sin(0.9 * x) + 0.15 * x; }
  function FR(x) { return 1.2 * x - 0.8 / 0.9 * Math.cos(0.9 * x) + 0.075 * x * x; }
  var ra = 0.5, rb = 6.5, rn = 8, dx = (rb - ra) / rn, rsum = 0;
  var riemSvg = '<svg viewBox="0 0 560 250">';
  for (var ri = 0; ri < rn; ri++) {
    var xm = ra + (ri + 0.5) * dx, ym = fR(xm); rsum += ym * dx;
    riemSvg += '<rect x="' + rf.X(ra + ri * dx) + '" y="' + rf.Y(ym) + '" width="' + r1(rf.X(dx) - rf.X(0)) + '" height="' + r1(rf.Y(0) - rf.Y(ym)) + '" fill="#2f7bf6" fill-opacity=".22" stroke="#2f7bf6" stroke-width="1.5"/>' +
      '<line x1="' + rf.X(xm) + '" y1="' + rf.Y(0) + '" x2="' + rf.X(xm) + '" y2="' + rf.Y(ym) + '" stroke="#2f7bf6" stroke-dasharray="2 3" opacity=".7"/>' +
      '<circle cx="' + rf.X(xm) + '" cy="' + rf.Y(ym) + '" r="3.5" fill="#e5484d"/>';
  }
  riemSvg += '<path d="' + curve(rf, fR, 0.1, 6.9, 100, 0, 3.2) + '" fill="none" stroke="#7c5cd6" stroke-width="3"/>' + axes(40, rf.Y(0), 550, 6, 40, rf.Y(0)) +
    txt(rf.X(ra), rf.Y(0) + 17, 'a', T, 13, 'middle', 'font-style="italic"') + txt(rf.X(rb), rf.Y(0) + 17, 'b', T, 13, 'middle', 'font-style="italic"') +
    txt(rf.X(ra + 2.5 * dx), rf.Y(0) + 17, 'ξ₃', T, 12, 'middle') + txt(rf.X(ra + 3.5 * dx), rf.Y(0) + 17, 'Δx', M, 12, 'middle') +
    txt(rf.X(ra + 3.5 * dx), rf.Y(fR(ra + 3.5 * dx)) - 10, 'f(ξᵢ)', T, 12, 'middle') +
    txt(300, 240, 'n = ' + rn + ' téglalap: Σ f(ξᵢ)·Δx = ' + hu(rsum, 3) + '  ·  pontos integrál: ' + hu(FR(rb) - FR(ra), 3), T, 12, 'middle') + '</svg>';

  /* ---------- 4. Taylor-polinomok a sin x-hez ---------- */
  var tf = frame(-6.6, 6.6, -2.3, 2.3, 20, 10, 520, 200);
  function taylorSin(n) {
    return function (x) { var s = 0, term = x; for (var k = 1; k <= n; k += 2) { s += term; term *= -x * x / ((k + 1) * (k + 2)); } return s; };
  }
  var tCols = ['#e5484d', '#f08c2e', '#2f9e6a', '#2f7bf6'], tN = [1, 3, 5, 7];
  var taySvg = '<svg viewBox="0 0 560 250"><defs><clipPath id="an-tay-clip"><rect x="20" y="10" width="520" height="200"/></clipPath></defs>' +
    axes(20, tf.Y(0), 548, 6, tf.X(0), 214);
  [-2, -1, 1, 2].forEach(function (k) {
    taySvg += '<line x1="' + tf.X(k * Math.PI) + '" y1="' + (tf.Y(0) - 4) + '" x2="' + tf.X(k * Math.PI) + '" y2="' + (tf.Y(0) + 4) + '" ' + LN + '/>' +
      txt(tf.X(k * Math.PI), tf.Y(0) + 17, (k < 0 ? '−' : '') + (Math.abs(k) === 2 ? '2π' : 'π'), M, 11, 'middle');
  });
  taySvg += '<g clip-path="url(#an-tay-clip)" fill="none">' + tN.map(function (n, i) {
    return '<path d="' + curve(tf, taylorSin(n), -6.6, 6.6, 220, -6, 6) + '" stroke="' + tCols[i] + '" stroke-width="2"/>';
  }).join('') + '<path d="' + curve(tf, Math.sin, -6.6, 6.6, 220, -3, 3) + '" style="stroke:var(--fg)" stroke-width="3.5"/></g>';
  var legend = [['sin x', 'var(--fg)'], ['T₁', tCols[0]], ['T₃', tCols[1]], ['T₅', tCols[2]], ['T₇', tCols[3]]];
  legend.forEach(function (l, i) {
    taySvg += '<rect x="' + (70 + i * 90) + '" y="226" width="16" height="4" style="fill:' + l[1] + '"/>' + txt(92 + i * 90, 232, l[0], T, 12);
  });
  taySvg += '</svg>';

  /* ---------- 5. Inverz függvény: eˣ és ln x ---------- */
  var iv = frame(-3, 4.5, -3, 4.5, 40, 10, 220, 220);
  var invSvg = '<svg viewBox="0 0 560 240"><defs><clipPath id="an-inv-clip"><rect x="40" y="10" width="220" height="220"/></clipPath></defs>' +
    axes(40, iv.Y(0), 262, 6, iv.X(0), 232) +
    '<g clip-path="url(#an-inv-clip)" fill="none"><line x1="' + iv.X(-3) + '" y1="' + iv.Y(-3) + '" x2="' + iv.X(4.5) + '" y2="' + iv.Y(4.5) + '" stroke="var(--muted)" stroke-dasharray="6 5"/>' +
    '<path d="' + curve(iv, Math.exp, -3, 1.55, 80, -3.5, 5) + '" stroke="#2f7bf6" stroke-width="3"/>' +
    '<path d="' + curve(iv, Math.log, 0.02, 4.5, 160, -3.6, 5) + '" stroke="#e5484d" stroke-width="3"/>' +
    '<line x1="' + iv.X(1) + '" y1="' + iv.Y(Math.E) + '" x2="' + iv.X(Math.E) + '" y2="' + iv.Y(1) + '" stroke="var(--fg-2)" stroke-dasharray="3 3"/></g>' +
    '<circle cx="' + iv.X(1) + '" cy="' + iv.Y(Math.E) + '" r="4.5" fill="#2f7bf6"/><circle cx="' + iv.X(Math.E) + '" cy="' + iv.Y(1) + '" r="4.5" fill="#e5484d"/>' +
    '<circle cx="' + iv.X(0) + '" cy="' + iv.Y(1) + '" r="3.5" fill="#2f7bf6"/><circle cx="' + iv.X(1) + '" cy="' + iv.Y(0) + '" r="3.5" fill="#e5484d"/>' +
    txt(iv.X(1) - 10, iv.Y(Math.E) + 4, '(1; e)', T, 11, 'end') + txt(iv.X(Math.E) + 6, iv.Y(1) + 16, '(e; 1)', T, 11) +
    '<rect x="300" y="40" width="22" height="4" fill="#2f7bf6"/>' + txt(332, 46, 'y = eˣ', T, 14) +
    '<rect x="300" y="72" width="22" height="4" fill="#e5484d"/>' + txt(332, 78, 'y = ln x  (az eˣ inverze)', T, 14) +
    '<line x1="300" y1="106" x2="322" y2="106" stroke="var(--muted)" stroke-dasharray="6 5"/>' + txt(332, 110, 'y = x  (tükörtengely)', T, 14) +
    txt(300, 150, 'Az (a; b) pont tükörképe (b; a):', M, 12) + txt(300, 170, 'a két tengely szerepet cserél.', M, 12) +
    txt(300, 200, 'eˣ: ℝ → (0; ∞),  ln: (0; ∞) → ℝ', T, 12) + '</svg>';

  /* ---------- 6. Improprius integrál: 1/x² és 1/x ---------- */
  var ip = frame(0, 9, 0, 1.6, 40, 12, 480, 180);
  function inv2(x) { return 1 / (x * x); }
  var areaPath = 'M' + ip.X(1) + ' ' + ip.Y(0) + ' ' + curve(ip, inv2, 1, 9, 120, 0, 2).replace(/^M/, 'L') + 'L' + ip.X(9) + ' ' + ip.Y(0) + ' z';
  var impSvg = '<svg viewBox="0 0 560 230"><path d="' + areaPath + '" fill="#2f9e6a" opacity=".28"/>' +
    '<path d="' + curve(ip, function (x) { return 1 / x; }, 0.63, 9, 120, 0, 1.6) + '" fill="none" stroke="#f08c2e" stroke-width="2" stroke-dasharray="6 4"/>' +
    '<path d="' + curve(ip, inv2, 0.79, 9, 160, 0, 1.6) + '" fill="none" stroke="#2f9e6a" stroke-width="3"/>' +
    axes(40, ip.Y(0), 545, 6, 40, ip.Y(0)) +
    '<line x1="' + ip.X(1) + '" y1="' + ip.Y(0) + '" x2="' + ip.X(1) + '" y2="' + ip.Y(1) + '" stroke="#2f9e6a" stroke-width="1.5"/>' +
    txt(ip.X(1), ip.Y(0) + 17, '1', T, 12, 'middle') + txt(ip.X(9), ip.Y(0) + 17, '→ ∞', T, 12, 'middle') +
    txt(ip.X(2.1), ip.Y(0.55), 'y = 1/x²', T, 13, null, 'fill="#2f9e6a" font-weight="700"') + txt(ip.X(3.6), ip.Y(0.36), 'y = 1/x', T, 13, null, 'fill="#f08c2e" font-weight="700"') +
    txt(ip.X(4.6), ip.Y(0.95), 'az [1; ∞) feletti terület 1/x² alatt: 1', T, 13) + txt(ip.X(4.6), ip.Y(0.95) + 20, '1/x alatt: végtelen (divergens)', M, 12) + '</svg>';

  /* ---------- 7. Iránymező: y′ = −0,8(y − 2) ---------- */
  var df = frame(0, 6, 0, 4.4, 40, 10, 480, 200), kD = 0.8;
  var deSvg = '<svg viewBox="0 0 560 235">' + axes(40, df.Y(0), 540, 4, 40, df.Y(0));
  var sxp = 480 / 6, syp = 200 / 4.4;
  for (var gx = 0.25; gx < 6; gx += 0.5) for (var gy = 0.2; gy < 4.4; gy += 0.4) {
    var s = -kD * (gy - 2), vx = sxp, vy = -s * syp, len = Math.sqrt(vx * vx + vy * vy), hx = vx / len * 7, hy = vy / len * 7;
    deSvg += '<line x1="' + r1(df.X(gx) - hx) + '" y1="' + r1(df.Y(gy) - hy) + '" x2="' + r1(df.X(gx) + hx) + '" y2="' + r1(df.Y(gy) + hy) + '" stroke="var(--muted)" stroke-width="1.4"/>';
  }
  deSvg += '<line x1="40" y1="' + df.Y(2) + '" x2="520" y2="' + df.Y(2) + '" stroke="#7c5cd6" stroke-width="2" stroke-dasharray="6 4"/>';
  [[0.1, '#2f7bf6'], [1, '#2f9e6a'], [3.2, '#f08c2e'], [4.0, '#e5484d']].forEach(function (c) {
    deSvg += '<path d="' + curve(df, function (x) { return 2 + (c[0] - 2) * Math.exp(-kD * x); }, 0, 6, 120, -1, 5) + '" fill="none" stroke="' + c[1] + '" stroke-width="2.5"/>' +
      '<circle cx="' + df.X(0) + '" cy="' + df.Y(c[0]) + '" r="4" fill="' + c[1] + '"/>';
  });
  deSvg += txt(526, df.Y(2) + 4, 'y = 2', T, 12) + txt(540, df.Y(0) + 16, 'x', M, 12, 'end') + txt(48, 16, 'y', M, 12) +
    txt(290, 230, 'pöttyök: különböző kezdeti feltételek y(0) = y₀', M, 11, 'middle') + '</svg>';

  STUDIE.addCourse({
    id: 'analizis',
    title: 'Matematikai analízis',
    icon: '∫',
    color: '#7c5cd6',
    level: 'BSc 1–2. félév (mérnök, informatikus, természettudomány)',
    description: 'Határérték, derivált, integrál, sorok és differenciálegyenletek – a kalkulus fogalmai ábrákkal és kidolgozott példákkal.',
    intro: 'A kalkulus a változás nyelve: a **derivált** a pillanatnyi változási sebesség, az **integrál** a felhalmozódott mennyiség. Minden a **határértékre** épül: ebből lesz a derivált (a különbségi hányados határértéke) és az integrál (a közelítő összegek határértéke), a kettőt pedig a Newton–Leibniz-formula köti össze. A fogalomtérképen jól látszik, hogyan kapcsolódnak egymáshoz.',
    topics: [
      { id: 'sorozat', title: 'Sorozatok és határérték' },
      { id: 'fuggveny', title: 'Függvények és folytonosság' },
      { id: 'derivalt', title: 'Differenciálszámítás' },
      { id: 'integral', title: 'Integrálszámítás' },
      { id: 'sorok', title: 'Sorok és differenciálegyenletek' },
      { id: 'tobbvaltozos', title: 'Többváltozós függvények' }
    ],
    formulas: [
      {
        id: 'derivalt-def', title: 'A derivált definíciója', en: 'definition of the derivative',
        parts: [{ t: 'f′(x_0)', d: 'Az f függvény deriváltja az x₀ pontban: az érintő meredeksége', unit: '[f] / [x]', more: 'Ha f(t) út, t idő: m/s, azaz sebesség.' }, { t: '=' },
          { t: 'lim_{h→0}', d: 'Határérték, miközben a h lépésköz 0-hoz tart (h ≠ 0)', more: 'h pozitív és negatív is lehet: a jobb és bal oldali határértéknek meg kell egyeznie.' },
          { t: '[' }, { t: 'f(x_0 + h) − f(x_0)', d: 'A függvényérték megváltozása (Δf)' }, { t: '] / ' }, { t: 'h', d: 'A független változó megváltozása (Δx)' }],
        text: 'A tört a különbségi hányados: a P(x₀; f(x₀)) és Q(x₀ + h; f(x₀ + h)) pontokon átmenő szelő meredeksége. Ha a határérték létezik és véges, f differenciálható x₀-ban.',
        example: 'f(x) = 1/x, x₀ = 2: `[1/(2 + h) − 1/2] / h = −1 / (2(2 + h)) → −1/4`, tehát f′(2) = −1/4.'
      },
      {
        id: 'lancszabaly-f', title: 'Láncszabály', en: 'chain rule',
        parts: [{ t: '(f ∘ g)′(x)', d: 'Az összetett függvény, f(g(x)) deriváltja' }, { t: '=' },
          { t: 'f′(g(x))', d: 'A külső függvény deriváltja, a belső függvény értékénél kiértékelve' }, { t: '·' },
          { t: 'g′(x)', d: 'A belső függvény deriváltja („belső derivált”)', more: 'Ezt felejtik el a leggyakrabban!' }],
        text: 'Leibniz-jelöléssel, ha y = f(u) és u = g(x): `dy/dx = dy/du · du/dx`. A változási sebességek összeszorzódnak.',
        example: '`(e^(x²))′ = e^(x²) · 2x`;  `(ln(cos x))′ = (1/cos x)·(−sin x) = −tg x`.'
      },
      {
        id: 'taylor-f', title: 'Taylor-formula', en: "Taylor's formula",
        parts: [{ t: 'f(x)', d: 'A közelítendő függvény az x helyen' }, { t: '=' },
          { t: 'Σ_{k=0}^{n}', d: 'Összegzés k = 0-tól n-ig: ez a Tₙ(x) n-edfokú Taylor-polinom' },
          { t: 'f^{(k)}(a)', d: 'f k-adik deriváltja az a fejtési pontban', more: 'f⁽⁰⁾ = f maga.' }, { t: '/' },
          { t: 'k!', d: 'k faktoriális: 1·2·…·k', more: '0! = 1' }, { t: '·' },
          { t: '(x − a)^k', d: 'Az eltérés a fejtési ponttól, k-adik hatványon' }, { t: '+' },
          { t: 'R_n(x)', d: 'Maradéktag: a közelítés hibája', more: 'Lagrange-alak: f⁽ⁿ⁺¹⁾(ξ)/(n+1)! · (x − a)ⁿ⁺¹, valamilyen a és x közötti ξ-vel.' }],
        text: 'Az n = 1 eset az érintő egyenes. A Taylor-polinom értéke és első n deriváltja az a pontban megegyezik f-ével.',
        example: 'eˣ az a = 0 körül, n = 3: `T₃(x) = 1 + x + x²/2 + x³/6`. x = 1-re T₃ = 2,6667 (e = 2,71828…); n = 6-tal már 2,71806.'
      },
      {
        id: 'newton-leibniz-f', title: 'Newton–Leibniz-formula', en: 'fundamental theorem of calculus',
        parts: [{ t: '∫_a^b', d: 'Határozott integrál az [a, b] intervallumon', more: 'a az alsó, b a felső határ.' },
          { t: 'f(x) dx', d: 'Az integrandus (f) és az integrációs változó (x)' }, { t: '=' },
          { t: 'F(b)', d: 'Egy primitív függvény értéke a felső határon', more: 'F′ = f' }, { t: '−' },
          { t: 'F(a)', d: 'Ugyanannak a primitív függvénynek az értéke az alsó határon' }],
        text: 'Az analízis alaptétele: a határozott integrált (közelítő összegek határértékét) egy primitív függvény két értékének különbségeként kapjuk. A `+ C` kiesik, ezért bármelyik primitív függvény jó.',
        example: '`∫₁² 3x² dx = [x³]₁² = 8 − 1 = 7`.'
      },
      {
        id: 'parcialis-f', title: 'Parciális integrálás', en: 'integration by parts',
        parts: [{ t: '∫ f · g′ dx', d: 'A kiszámítandó integrál: szorzat, amelynek egyik tényezőjét (g′) könnyű integrálni' }, { t: '=' },
          { t: 'f · g', d: 'A két függvény szorzata', more: 'Határozott integrálnál [f·g] a határok között.' }, { t: '−' },
          { t: '∫ f′ · g dx', d: 'A „maradék” integrál: jó választásnál egyszerűbb az eredetinél' }],
        text: 'A szorzat deriválási szabályából, `(fg)′ = f′g + fg′`, integrálással adódik.',
        example: '`∫ x·cos x dx`: f = x, g′ = cos x ⟹ `x·sin x − ∫ sin x dx = x·sin x + cos x + C`.'
      },
      {
        id: 'mertani-sor', title: 'Mértani sor összege', en: 'geometric series',
        parts: [{ t: 'Σ_{n=0}^{∞}', d: 'Végtelen összeg n = 0-tól: a részletösszegek határértéke' },
          { t: 'q^n', d: 'A mértani sorozat n-edik tagja; q a hányados (kvóciens)' }, { t: '=' },
          { t: '1 / (1 − q)', d: 'A sor összege', more: 'Csak |q| < 1 esetén! Ha |q| ≥ 1, a sor divergens.' }],
        text: 'Az n-edik részletösszeg `sₙ = (1 − qⁿ⁺¹)/(1 − q)`; |q| < 1 esetén qⁿ⁺¹ → 0. Ez a legfontosabb összehasonlító sor.',
        example: '`1 + 1/2 + 1/4 + 1/8 + … = 1/(1 − 1/2) = 2`.'
      },
      {
        id: 'cauchy-hadamard', title: 'Cauchy–Hadamard-tétel (konvergenciasugár)', en: 'Cauchy–Hadamard theorem',
        parts: [{ t: 'R', d: 'A Σ cₙ(x − a)ⁿ hatványsor konvergenciasugara' }, { t: '=' }, { t: '1 /' },
          { t: 'limsup_{n→∞}', d: 'Felső határérték: a sorozat legnagyobb torlódási pontja', more: 'Ha a közönséges határérték létezik, azzal egyenlő.' },
          { t: 'ⁿ√|c_n|', d: 'Az n-edik együttható abszolút értékének n-edik gyöke' }],
        text: 'Megállapodás: ha a limsup 0, akkor R = ∞; ha végtelen, akkor R = 0. |x − a| < R esetén a sor abszolút konvergens, |x − a| > R esetén divergens.',
        example: 'Σ 2ⁿxⁿ: ⁿ√2ⁿ = 2, tehát R = 1/2 (ez a q = 2x mértani sor, amely |2x| < 1-re konvergens).'
      },
      {
        id: 'exp-megoldas', title: 'Az y′ = ky differenciálegyenlet megoldása', en: 'exponential growth / decay law',
        parts: [{ t: 'y(t)', d: 'A mennyiség értéke a t időpontban' }, { t: '=' },
          { t: 'y_0', d: 'Kezdeti érték: y(0)' }, { t: '·' },
          { t: 'e^{kt}', d: 'Exponenciális tényező; k a növekedési (k > 0) vagy bomlási (k < 0) együttható', unit: 'k: 1/s', more: 'Időállandó τ = 1/|k|; duplázódási vagy felezési idő ln 2/|k|.' }],
        text: 'Az y′ = k·y, y(0) = y₀ kezdetiérték-probléma egyetlen megoldása. Ellenőrzés: `y′ = y₀·k·e^(kt) = k·y`.',
        example: 'Baktériumtenyészet: y₀ = 1000, k = 0,3 1/óra. 5 óra múlva `y = 1000·e^1,5 ≈ 4482`.'
      },
      {
        id: 'newton-modszer-f', title: 'Newton-módszer (érintőmódszer)', en: "Newton's method",
        parts: [{ t: 'x_{n+1}', d: 'A következő közelítés: az aktuális pontbeli érintő zérushelye' }, { t: '=' },
          { t: 'x_n', d: 'Az aktuális közelítés' }, { t: '−' },
          { t: 'f(x_n)', d: 'A függvény értéke az aktuális pontban (ennyivel „vagyunk messze” a 0-tól)' }, { t: '/' },
          { t: 'f′(x_n)', d: 'A derivált (az érintő meredeksége) az aktuális pontban', more: 'Nem lehet 0 – vízszintes érintőnek nincs zérushelye.' }],
        text: 'Az `y = f(xₙ) + f′(xₙ)(x − xₙ)` érintő egyenest 0-val egyenlővé téve kapjuk. Egyszeres gyök közelében a konvergencia **kvadratikus**: a pontos jegyek száma lépésenként nagyjából megduplázódik.',
        example: 'f(x) = x² − 2: `xₙ₊₁ = (xₙ + 2/xₙ)/2`. x₀ = 1 ⟹ 1,5 ⟹ 1,416667 ⟹ 1,414216 (√2 = 1,414214…).'
      },
      {
        id: 'fourier-f', title: 'Fourier-együtthatók', en: 'Fourier coefficients',
        parts: [{ t: 'a_n', d: 'A cos nx tag együtthatója (n = 0, 1, 2, …)' }, { t: '=' },
          { t: '1/π', d: 'Normáló tényező: ∫ cos² nx dx = π egy perióduson (n ≥ 1)' }, { t: '·' },
          { t: '∫_{−π}^{π} f(x) cos nx dx', d: 'f „vetülete” a cos nx függvényre (skaláris szorzat)' }, { t: ',  ' },
          { t: 'b_n', d: 'A sin nx tag együtthatója (n = 1, 2, …)', more: 'b_n = (1/π) ∫ f(x) sin nx dx a [−π; π] intervallumon.' }],
        text: 'A sor alakja `f(x) ~ a₀/2 + Σ (aₙ cos nx + bₙ sin nx)`. Az a₀/2 a függvény átlagértéke egy perióduson. T periódusidőnél nx helyett nωx áll, ω = 2π/T, és az együtthatók előtt 2/T a szorzó.',
        example: 'Négyszögjel (−1 a (−π; 0), +1 a (0; π) szakaszon): páratlan, ezért aₙ = 0, és `bₙ = 4/(nπ)` páratlan n-re, 0 párosra.'
      },
      {
        id: 'gradiens-f', title: 'Iránymenti derivált a gradienssel', en: 'directional derivative',
        parts: [{ t: '∂f/∂e', d: 'Az f változási sebessége az e irányban haladva', unit: '[f] / [hossz]' }, { t: '=' },
          { t: '∇f', d: 'Gradiens: (∂f/∂x, ∂f/∂y, …) – a parciális deriváltak vektora', more: 'Olvasd: „nabla f”.' }, { t: '·' },
          { t: 'e', d: 'Egységvektor (hossza 1!) a vizsgált irányban' }, { t: '=' },
          { t: '|∇f|·cos θ', d: 'θ a gradiens és az e irány szöge', more: 'Legnagyobb, ha θ = 0 (e a gradiens irányába mutat); 0, ha e a szintvonal érintője.' }],
        text: 'Totálisan differenciálható f esetén érvényes. Ebből következik, hogy a gradiens a leggyorsabb növekedés iránya, és merőleges a szintvonalakra (szintfelületekre).',
        example: 'f = x² + 3y², P(1; 1), e = (3; 4)/5: ∇f = (2; 6), `∂f/∂e = (2·3 + 6·4)/5 = 6`.'
      },
      {
        id: 'polar-f', title: 'Kettős integrál polárkoordinátákban', en: 'double integral in polar coordinates',
        parts: [{ t: '∬_D f(x, y) dx dy', d: 'Kettős integrál a D síktartományon' }, { t: '=' },
          { t: '∬ f(r cos φ, r sin φ)', d: 'Ugyanaz a függvény polárkoordinátákkal kifejezve: x = r cos φ, y = r sin φ' }, { t: '·' },
          { t: 'r', d: 'A Jacobi-determináns abszolút értéke: a „területtorzítás”', more: 'Az r és φ szerinti kis téglalap képe egy r·dr·dφ területű körgyűrűcikk.' },
          { t: 'dr dφ', d: 'Integrálás r és φ szerint, a D tartománynak megfelelő határokkal' }],
        text: 'Általános helyettesítésnél a szorzó a koordináta-transzformáció Jacobi-mátrixának determinánsa, abszolút értékben. Kör- és gyűrűtartományokon, valamint x² + y²-től függő integrandusoknál ez a legkényelmesebb.',
        example: 'Az R sugarú körlap területe: `∫₀^{2π} ∫₀^R r dr dφ = 2π · R²/2 = R²π`.'
      }
    ],
    terms: [
      /* ----- Sorozatok és határérték ----- */
      { id: 'sorozat-hatarertek', term: 'Sorozat határértéke (konvergencia)', en: 'limit of a sequence, convergence', topic: 'sorozat',
        short: 'Az (aₙ) sorozat az A számhoz tart, ha bármely ε > 0-hoz van olyan N küszöbindex, hogy minden n > N esetén |aₙ − A| < ε.',
        visual: seqSvg, caption: 'aₙ = 1 + (−1)ⁿ·1,2/n: ε = 0,25-höz N = 4 jó küszöb, onnantól minden tag az A körüli sávban van.',
        text: 'Szemléletesen: akármilyen keskeny sávot rajzolunk A köré, a sorozatnak csak **véges sok** tagja marad kívül. A küszöbindex ε-tól függ: kisebb ε-hoz általában nagyobb N kell. Jelölés: `lim aₙ = A` vagy `aₙ → A`. Ha nincs ilyen A, a sorozat **divergens**.\n\nA `+∞`-be tartás (minden K-hoz van N, hogy n > N esetén aₙ > K) „tágabb értelemben vett” határérték: az ilyen sorozat nem konvergens.\n\nAlapvető tételek:\n\n- a konvergens sorozat **korlátos**;\n- a **monoton és korlátos** sorozat konvergens;\n- **rendőrelv**: ha aₙ ≤ bₙ ≤ cₙ, és aₙ, cₙ → A, akkor bₙ → A;\n- a határérték felcserélhető a műveletekkel (összeg, szorzat, hányados, ha a nevező határértéke nem 0).',
        example: 'aₙ = 1 + (−1)ⁿ·1,2/n esetén A = 1. ε = 0,25-höz: |aₙ − 1| = 1,2/n < 0,25 ⟺ n > 4,8, tehát N = 4 jó küszöb: n ≥ 5-től minden tag a sávban van (ábra).',
        pitfall: 'A korlátosság nem elég a konvergenciához: a (−1)ⁿ sorozat korlátos, mégis divergens. Az sem elég, hogy a szomszédos tagok különbsége 0-hoz tart: `√(n+1) − √n → 0`, mégis √n → ∞.',
        related: ['cauchy-sorozat', 'e-szam', 'nevezetes-hatarertekek', 'fuggveny-hatarertek', 'vegtelen-sor'] },
      { id: 'cauchy-sorozat', term: 'Cauchy-sorozat', en: 'Cauchy sequence', topic: 'sorozat',
        short: 'Olyan sorozat, amelynek tagjai egymáshoz kerülnek tetszőlegesen közel: minden ε > 0-hoz van N, hogy m, n > N esetén |aₘ − aₙ| < ε.',
        text: 'A definícióban nem szerepel a határérték, ezért akkor is ellenőrizhető, ha nem tudjuk, mi lenne a limesz.\n\n**Cauchy-féle konvergenciakritérium**: a valós számok körében egy sorozat pontosan akkor konvergens, ha Cauchy-sorozat. Ez a valós számok **teljességét** fejezi ki.\n\nA racionális számok körében ez nem igaz: √2 tizedes közelítései (1; 1,4; 1,41; 1,414; …) racionális Cauchy-sorozatot alkotnak, de határértékük nem racionális. A valós számokat éppen úgy is fel lehet építeni, hogy a racionális Cauchy-sorozatok „határértékeit” hozzávesszük.',
        pitfall: 'Nem elég, hogy a **szomszédos** tagok kerülnek közel (|aₙ₊₁ − aₙ| → 0): a feltételnek bármely két elég nagy indexű tagra teljesülnie kell. A harmonikus sor részletösszegeinél sₙ₊₁ − sₙ = 1/(n+1) → 0, mégsem Cauchy-sorozat (sₙ → ∞).',
        related: ['sorozat-hatarertek', 'vegtelen-sor'] },
      { id: 'e-szam', term: 'Az e szám', en: "Euler's number e", topic: 'sorozat',
        short: 'Az (1 + 1/n)ⁿ sorozat határértéke: e ≈ 2,718281828…, a természetes logaritmus és az exponenciális függvény alapja.',
        text: 'Az aₙ = (1 + 1/n)ⁿ sorozat szigorúan **monoton nő** és **felülről korlátos** (például 3 felső korlát), így a monoton konvergencia tétele szerint konvergens: határértéke az e. Általánosabban `(1 + x/n)ⁿ → eˣ` minden valós x-re.\n\nVégtelen sorral: `e = Σ 1/k! = 1 + 1 + 1/2 + 1/6 + 1/24 + …` – ez sokkal gyorsabban konvergál.\n\nAz e azért kitüntetett alap, mert az `eˣ` függvény deriváltja önmaga. Ezért jelenik meg minden olyan folyamatban, ahol a változás sebessége arányos magával a mennyiséggel: kamatos kamat, radioaktív bomlás, kondenzátor kisülése.',
        example: 'Évi 100% kamat n részletben jóváírva: 1 Ft-ból (1 + 1/n)ⁿ Ft lesz egy év alatt.\n\n- n = 1: 2 Ft\n- n = 12 (havonta): 2,613 Ft\n- n = 365 (naponta): 2,7146 Ft\n- folytonos jóváírás: e ≈ 2,7183 Ft',
        pitfall: '„1 + 1/n → 1 és 1ⁿ = 1, tehát a határérték 1” – hibás! Az **1^∞ határozatlan alak**: az alap 1-hez, a kitevő ∞-hez tart, és a „verseny” eredménye bármi lehet.',
        related: ['sorozat-hatarertek', 'nevezetes-hatarertekek', 'exponencialis-novekedes', 'taylor-polinom', 'inverz-fuggveny'] },
      { id: 'nevezetes-hatarertekek', term: 'Nevezetes határértékek', en: 'standard limits', topic: 'sorozat',
        short: 'Gyakran használt határértékek, amelyekre a bonyolultabbak visszavezethetők: qⁿ, ⁿ√n, (1 + 1/n)ⁿ, sin x / x és társaik.',
        text: '- `qⁿ → 0`, ha |q| < 1; `qⁿ → ∞`, ha q > 1; q ≤ −1 esetén divergens.\n- `ⁿ√a → 1` (a > 0) és `ⁿ√n → 1`.\n- `nᵏ / aⁿ → 0` (a > 1): az exponenciális minden hatványnál gyorsabban nő.\n- `aⁿ / n! → 0`: a faktoriális még gyorsabb.\n- `(1 + 1/n)ⁿ → e`.\n- `sin x / x → 1`, ha x → 0 (x radiánban!).\n- `(eˣ − 1)/x → 1` és `ln(1 + x)/x → 1`, ha x → 0.\n\nNövekedési sorrend nagy n-re: **log n ≪ nᵏ ≪ aⁿ ≪ n! ≪ nⁿ**. Törteknél a domináns tagot emeljük ki a számlálóból és a nevezőből.',
        example: '`lim (3n² + 5n)/(2n² − 1)`: osszunk n²-tel: `(3 + 5/n)/(2 − 1/n²) → 3/2`.\n\n`lim (2ⁿ + n¹⁰⁰)/3ⁿ = lim (2/3)ⁿ + n¹⁰⁰/3ⁿ = 0 + 0 = 0`.',
        pitfall: 'A sin x / x → 1 csak **radiánban** igaz; fokban mérve a határérték π/180 lenne. A ∞/∞ és 0/0 nem „1” és nem „0”: határozatlan alakok, külön vizsgálatot igényelnek.',
        related: ['sorozat-hatarertek', 'e-szam', 'fuggveny-hatarertek', 'lhospital'] },

      /* ----- Függvények ----- */
      { id: 'injektiv-szurjektiv', term: 'Injektív, szürjektív, bijektív függvény', en: 'injective, surjective, bijective function', topic: 'fuggveny',
        short: 'Injektív: különböző helyeken különböző értéket vesz fel; szürjektív: a teljes képhalmazt felveszi; bijektív: mindkettő (kölcsönösen egyértelmű).',
        text: 'Egy f: A → B függvény minden A-beli x-hez **pontosan egy** B-beli f(x)-et rendel. A az **értelmezési tartomány**, B a **képhalmaz**; a ténylegesen felvett értékek halmaza az **értékkészlet**.\n\n- **Injektív**: x₁ ≠ x₂ ⟹ f(x₁) ≠ f(x₂). Grafikonon: minden vízszintes egyenes legfeljebb egyszer metszi.\n- **Szürjektív** (ráképezés): minden y ∈ B-hez van x, hogy f(x) = y, vagyis az értékkészlet a teljes B.\n- **Bijektív**: injektív és szürjektív. Pontosan ekkor létezik inverz függvény.\n\nA szigorúan monoton függvény mindig injektív.',
        example: 'f(x) = x² mint ℝ → ℝ függvény se nem injektív (f(−2) = f(2) = 4), se nem szürjektív (−1-et nem veszi fel). Leszűkítve, f: [0; ∞) → [0; ∞) már bijektív, inverze a √x.',
        pitfall: 'Ugyanaz a hozzárendelési szabály más értelmezési tartománnyal vagy képhalmazzal más tulajdonságú függvény. Az injektivitás és a szürjektivitás mindig a **megadott halmazokra** vonatkozik.',
        related: ['inverz-fuggveny', 'folytonossag'] },
      { id: 'inverz-fuggveny', term: 'Inverz függvény', en: 'inverse function', topic: 'fuggveny',
        short: 'Bijektív f inverze az az f⁻¹ függvény, amely minden y = f(x) értékhez visszaadja x-et: f⁻¹(f(x)) = x és f(f⁻¹(y)) = y.',
        visual: invSvg, caption: 'Az eˣ és az ln x grafikonja egymás tükörképe az y = x egyenesre.',
        text: 'Az inverz grafikonja az eredeti tükörképe az **y = x** egyenesre, hiszen a két tengely szerepet cserél. Az inverz értelmezési tartománya az eredeti értékkészlete, és fordítva.\n\nFontos párok: `eˣ` és `ln x`; `x²` (x ≥ 0) és `√x`; `sin x` ([−π/2; π/2]-re szűkítve) és `arcsin x`; `tg x` és `arctg x`.\n\n**Az inverz deriváltja**: `(f⁻¹)′(y) = 1 / f′(x)`, ahol y = f(x) és f′(x) ≠ 0. Például `(ln y)′ = 1/eˣ = 1/y`. Szemléletesen: tükrözéskor az érintő meredeksége a reciprokára változik.',
        example: 'f(x) = 2x + 3 inverze: y = 2x + 3 ⟹ x = (y − 3)/2, tehát f⁻¹(x) = (x − 3)/2. Ellenőrzés: f⁻¹(f(5)) = f⁻¹(13) = 5.',
        pitfall: 'f⁻¹(x) **nem** azonos 1/f(x)-szel! A −1 itt nem kitevő: sin⁻¹ x = arcsin x, nem 1/sin x.',
        related: ['injektiv-szurjektiv', 'e-szam', 'derivalt', 'lancszabaly'] },
      { id: 'fuggveny-hatarertek', term: 'Függvény határértéke', en: 'limit of a function', topic: 'fuggveny',
        short: 'Az f függvény határértéke az a helyen A, ha minden ε > 0-hoz van olyan δ > 0, hogy 0 < |x − a| < δ esetén |f(x) − A| < ε.',
        text: 'A határérték azt írja le, hová közelít f(x), ha x elég közel kerül a-hoz. Az a pontbeli érték ebben **nem számít**, sőt f-nek ott értelmezve sem kell lennie – ezt fejezi ki a `0 < |x − a|` feltétel.\n\n**Átviteli elv** (Heine): `lim f(x) = A` (x → a) pontosan akkor, ha minden xₙ → a (xₙ ≠ a) sorozatra f(xₙ) → A. Ezzel a függvényhatárérték a sorozatokéra vezethető vissza.\n\n**Egyoldali határértékek**: x → a⁺ (jobbról) és x → a⁻ (balról). A kétoldali határérték akkor létezik, ha mindkettő létezik és egyenlő.',
        example: '`lim (x² − 4)/(x − 2)` (x → 2): a függvény x = 2-ben nincs értelmezve, de x ≠ 2-re `(x² − 4)/(x − 2) = x + 2`, így a határérték 4.',
        pitfall: 'Az előjelfüggvénynek (sgn x) 0-ban nincs határértéke: jobbról 1, balról −1. A sin(1/x) függvénynek 0-ban egyoldali határértéke sincs, mert végtelen sokszor oszcillál −1 és 1 között.',
        related: ['sorozat-hatarertek', 'folytonossag', 'derivalt', 'lhospital', 'nevezetes-hatarertekek'] },
      { id: 'folytonossag', term: 'Folytonosság', en: 'continuity', topic: 'fuggveny',
        short: 'f folytonos az a pontban, ha ott értelmezve van, létezik határértéke, és az egyenlő a függvényértékkel: lim f(x) = f(a), ha x → a.',
        text: 'Szemléletesen: a grafikon „a ceruza felemelése nélkül” megrajzolható – ez intervallumon értelmezett, nem túl vad függvényekre jó kép. Az elemi függvények (polinomok, eˣ, sin, ln, …) értelmezési tartományuk minden pontjában folytonosak, és folytonos függvények összege, szorzata, hányadosa (ahol a nevező ≠ 0) és kompozíciója is folytonos.\n\nZárt, korlátos intervallumon folytonos függvényekre két alaptétel:\n\n- **Bolzano-tétel**: ha f(a) és f(b) előjele különböző, van olyan c ∈ (a; b), hogy f(c) = 0. Erre épül az intervallumfelezéses gyökkeresés.\n- **Weierstrass-tétel**: f korlátos, és felveszi a legnagyobb és a legkisebb értékét.',
        example: 'Az x³ + x − 1 = 0 egyenletnek van gyöke a [0; 1] intervallumban, mert f(0) = −1 < 0 és f(1) = 1 > 0. Felezéssel: f(0,5) = −0,375 < 0, tehát a gyök a (0,5; 1) szakaszon van, és így tovább. (A gyök ≈ 0,6823.)',
        pitfall: 'A folytonosság nem jelent differenciálhatóságot: |x| folytonos 0-ban, de ott töréspontja van, nincs érintője. Fordítva viszont igaz: ami differenciálható, az folytonos.',
        related: ['fuggveny-hatarertek', 'derivalt', 'injektiv-szurjektiv', 'riemann-integral'] },

      /* ----- Differenciálszámítás ----- */
      { id: 'derivalt', term: 'Derivált (differenciálhányados)', en: 'derivative', topic: 'derivalt',
        short: 'Az f függvény x₀ pontbeli deriváltja a különbségi hányados határértéke: f′(x₀) = lim [f(x₀ + h) − f(x₀)]/h, ha h → 0. Ez a pillanatnyi változási sebesség.',
        visual: secSvg, caption: 'Ahogy h csökken, a P-n és Q-n átmenő szelők az érintő egyeneshez tartanak.',
        text: 'A különbségi hányados a P és Q pontokon átmenő **szelő** meredeksége, vagyis az átlagos változási sebesség a [x₀; x₀ + h] szakaszon. Ha h → 0, a szelő az **érintőbe** fordul, meredeksége a derivált.\n\nFizikai jelentés: ha s(t) a megtett út, akkor s′(t) a pillanatnyi sebesség, v′(t) a gyorsulás. Jelölések: f′(x), df/dx (Leibniz), ẋ (idő szerinti, Newton).\n\nAlapderiváltak: `(xⁿ)′ = n·xⁿ⁻¹`, `(eˣ)′ = eˣ`, `(ln x)′ = 1/x`, `(sin x)′ = cos x`, `(cos x)′ = −sin x`.\n\nMűveleti szabályok: `(f + g)′ = f′ + g′`, `(c·f)′ = c·f′`, `(f·g)′ = f′g + fg′`, `(f/g)′ = (f′g − fg′)/g²`.',
        formulas: ['derivalt-def'],
        example: 'f(x) = x²: `[(x₀ + h)² − x₀²]/h = (2x₀h + h²)/h = 2x₀ + h → 2x₀`, tehát f′(x₀) = 2x₀. Az x₀ = 3 pontban az érintő meredeksége 6.',
        pitfall: 'Differenciálható ⟹ folytonos, de fordítva nem: |x| 0-ban folytonos, de a jobb és bal oldali különbségi hányados határértéke (+1, illetve −1) különbözik, ezért ott nem differenciálható.',
        related: ['erinto', 'lancszabaly', 'folytonossag', 'fuggveny-hatarertek', 'szelsoertek', 'kozepertektetel', 'primitiv-fuggveny', 'taylor-polinom'],
        models: ['elektromos-auto'] },
      { id: 'erinto', term: 'Érintő egyenes', en: 'tangent line', topic: 'derivalt',
        short: 'Az f grafikonjának (x₀; f(x₀)) pontbeli érintője az az egyenes, amelynek meredeksége f′(x₀): y = f(x₀) + f′(x₀)·(x − x₀).',
        text: 'Az érintő a függvény legjobb **lineáris közelítése** a pont környezetében: `f(x) ≈ f(x₀) + f′(x₀)(x − x₀)`, és a hiba gyorsabban tűnik el, mint (x − x₀). Ez az elsőfokú Taylor-polinom; ezen alapul a mérnöki **linearizálás** (munkapont körüli kis jeles modell).\n\nA **Newton-módszer** gyökkeresésre az érintő zérushelyével lép tovább: `xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)` – jó kezdőpontból nagyon gyorsan (négyzetesen) konvergál.\n\nAz érintőre merőleges egyenes a **normális**, meredeksége −1/f′(x₀) (ha f′(x₀) ≠ 0).',
        example: 'f(x) = √x érintője x₀ = 4-ben: f(4) = 2, f′(x) = 1/(2√x), f′(4) = 1/4, így `y = 2 + (x − 4)/4`. Ebből √4,1 ≈ 2 + 0,1/4 = 2,025 (a pontos érték 2,02485…).',
        pitfall: 'Az érintő nem „csak egy pontban érinti” a görbét: máshol metszheti, sőt inflexiós pontban át is metszi (y = x³ érintője 0-ban az x tengely).',
        related: ['derivalt', 'taylor-polinom', 'kozepertektetel'] },
      { id: 'lancszabaly', term: 'Láncszabály', en: 'chain rule', topic: 'derivalt',
        short: 'Összetett függvény deriváltja: [f(g(x))]′ = f′(g(x))·g′(x) – a külső függvény deriváltja a belső helyen, szorozva a belső függvény deriváltjával.',
        text: 'Leibniz-jelöléssel, ha y = f(u) és u = g(x): `dy/dx = dy/du · du/dx`. Szemléletesen: ha u kétszer olyan gyorsan változik, mint x, y pedig háromszor olyan gyorsan, mint u, akkor y hatszor olyan gyorsan változik, mint x.\n\nTöbbszörös összetételnél a szabály láncszerűen ismétlődik – innen a neve. A **helyettesítéses integrálás** a láncszabály visszafelé alkalmazása, az inverz függvény deriválási szabálya pedig a láncszabály következménye.',
        formulas: ['lancszabaly-f'],
        example: '- `(sin(x²))′ = cos(x²)·2x`\n- `(e^(−3x))′ = −3·e^(−3x)`\n- `(√(1 + x²))′ = 1/(2√(1 + x²)) · 2x = x/√(1 + x²)`',
        pitfall: 'A leggyakoribb hiba a belső derivált elhagyása: `(sin 3x)′ = 3·cos 3x`, nem cos 3x.',
        related: ['derivalt', 'helyettesites', 'inverz-fuggveny'] },
      { id: 'lhospital', term: "L'Hospital-szabály", en: "L'Hôpital's rule", topic: 'derivalt',
        short: 'Ha f és g határértéke az a helyen egyaránt 0 (vagy ±∞), akkor lim f/g = lim f′/g′, feltéve, hogy az utóbbi határérték létezik.',
        text: 'A **0/0** és **∞/∞** típusú határozatlan alakok kiszámítására szolgál. Feltételek: f és g differenciálható a környezetben, g′(x) ≠ 0 (a-tól eltekintve), és a deriváltak hányadosának létezik a határértéke. Szükség esetén többször egymás után is alkalmazható.\n\nMás határozatlan alakok átalakítással vezethetők vissza:\n\n- `0·∞`: törtté írjuk, pl. `x·ln x = ln x / (1/x)`;\n- `∞ − ∞`: közös nevezőre hozunk;\n- `1^∞`, `0⁰`, `∞⁰`: `f^g = e^(g·ln f)` alakban a kitevőt vizsgáljuk.',
        example: '`lim (1 − cos x)/x²` (x → 0) = `lim sin x/(2x)` = `lim cos x / 2` = 1/2.\n\n`lim x/eˣ` (x → ∞) = `lim 1/eˣ` = 0.',
        pitfall: 'A szabály a számlálót és a nevezőt **külön-külön** deriválja, nem a törtet a hányadosszabállyal! És csak határozatlan alakra szabad alkalmazni: `lim (x + 1)/(x + 2) = 1/2` (x → 0), de a deriváltak hányadosa tévesen 1-et adna.',
        related: ['fuggveny-hatarertek', 'nevezetes-hatarertekek', 'derivalt', 'taylor-polinom'] },
      { id: 'szelsoertek', term: 'Szélsőérték', en: 'extremum (local maximum / minimum)', topic: 'derivalt',
        short: 'f-nek x₀-ban lokális maximuma (minimuma) van, ha x₀ egy környezetében f(x) ≤ f(x₀) (illetve ≥). Differenciálható f-nél ennek szükséges feltétele f′(x₀) = 0.',
        text: '**Szükséges feltétel** (Fermat-tétel): ha f-nek belső pontban lokális szélsőértéke van és ott differenciálható, akkor f′(x₀) = 0. Az ilyen pontok a **stacionárius pontok**.\n\n**Elégséges feltételek**:\n\n- f′ előjelet vált x₀-ban: + → − esetén maximum, − → + esetén minimum;\n- f′(x₀) = 0 és f″(x₀) < 0 ⟹ lokális maximum; f″(x₀) > 0 ⟹ lokális minimum.\n\nZárt intervallumon a **globális** szélsőértéket a stacionárius pontok, a nem differenciálható pontok és a **végpontok** függvényértékeinek összehasonlításával kapjuk.',
        example: 'Melyik 1 dm³-es, felül nyitott, négyzet alapú doboz felülete a legkisebb? Alapél x, magasság 1/x², felület `A(x) = x² + 4/x`. `A′(x) = 2x − 4/x² = 0` ⟹ x³ = 2, x ≈ 1,26 dm; `A″ = 2 + 8/x³ > 0`, tehát ez minimum.',
        pitfall: 'f′(x₀) = 0 nem elég: f(x) = x³ deriváltja 0-ban nulla, mégsincs ott szélsőérték (inflexiós pont). Végpontbeli vagy töréspontbeli szélsőértéknél pedig a derivált nem feltétlenül 0.',
        related: ['derivalt', 'kozepertektetel', 'taylor-polinom'] },
      { id: 'kozepertektetel', term: 'Lagrange-középértéktétel', en: 'mean value theorem', topic: 'derivalt',
        short: 'Ha f folytonos [a; b]-n és differenciálható (a; b)-n, akkor van olyan ξ ∈ (a; b), hogy f′(ξ) = [f(b) − f(a)]/(b − a).',
        text: 'Geometriailag: van a görbének olyan pontja, ahol az érintő **párhuzamos a végpontokat összekötő húrral**. Fizikailag: ha egy autó 2 óra alatt 180 km-t tett meg, akkor valamikor pontosan 90 km/h-val haladt.\n\nSpeciális esete a **Rolle-tétel**: ha f(a) = f(b), van olyan ξ, ahol f′(ξ) = 0.\n\nKövetkezményei a differenciálszámítás „munkalovai”: ha egy intervallumon f′ ≡ 0, akkor f konstans; ha f′ > 0, akkor f szigorúan monoton nő. Ebből adódik, hogy két primitív függvény csak konstansban különbözik, és ebből vezethető le a Taylor-formula maradéktagja is.',
        pitfall: 'A tétel ξ **létezését** mondja ki, de nem adja meg, hol van, és ξ nem feltétlenül egyértelmű. Ha f nem differenciálható minden belső pontban (pl. |x| a [−1; 1]-en), a tétel nem alkalmazható.',
        related: ['derivalt', 'szelsoertek', 'primitiv-fuggveny', 'taylor-polinom', 'erinto'] },
      { id: 'taylor-polinom', term: 'Taylor-polinom', en: 'Taylor polynomial', topic: 'derivalt',
        short: 'Az f függvényt az a pont körül n-edfokú polinommal közelíti, amelynek az a pontban f-fel egyezik az értéke és az első n deriváltja.',
        visual: taySvg, caption: 'A sin x Taylor-polinomjai 0 körül: minél magasabb a fokszám, annál szélesebb sávban simulnak a görbére.',
        text: '`Tₙ(x) = f(a) + f′(a)(x − a) + f″(a)/2!·(x − a)² + … + f⁽ⁿ⁾(a)/n!·(x − a)ⁿ`\n\nAz n = 1 eset az érintő. A hibát a **Lagrange-féle maradéktag** adja: `Rₙ(x) = f⁽ⁿ⁺¹⁾(ξ)/(n+1)! · (x − a)ⁿ⁺¹`, valamilyen a és x közötti ξ-vel.\n\nAz a = 0 körüli polinom a **Maclaurin-polinom**. Fontos példák:\n\n- `eˣ ≈ 1 + x + x²/2! + x³/3! + …`\n- `sin x ≈ x − x³/3! + x⁵/5! − …`\n- `cos x ≈ 1 − x²/2! + x⁴/4! − …`\n- `ln(1 + x) ≈ x − x²/2 + x³/3 − …`\n\nA számológépek és a mérnöki közelítések (kis szögeknél sin x ≈ x) is erre épülnek.',
        formulas: ['taylor-f'],
        example: '`sin 0,5 ≈ 0,5 − 0,5³/6 = 0,479167`; a pontos érték 0,479426. A maradéktag szerint a hiba legfeljebb 0,5⁵/5! ≈ 0,00026 – valóban ennyi.',
        pitfall: 'A Taylor-polinom csak az a pont **környezetében** közelít jól; távolabb a hiba óriási lehet (az ábrán a polinomok elszakadnak a szinuszgörbétől). A szögeket radiánban kell megadni.',
        related: ['derivalt', 'erinto', 'hatvanysor', 'e-szam', 'lhospital', 'kozepertektetel', 'szelsoertek'] },

      /* ----- Integrálszámítás ----- */
      { id: 'primitiv-fuggveny', term: 'Primitív függvény (határozatlan integrál)', en: 'antiderivative, indefinite integral', topic: 'integral',
        short: 'F az f primitív függvénye egy intervallumon, ha ott F′ = f. Az összes primitív függvény a határozatlan integrál: ∫ f(x) dx = F(x) + C.',
        text: 'A primitív függvény keresése a deriválás megfordítása. Intervallumon két primitív függvény csak konstansban tér el (a középértéktétel következménye) – ezért a `+ C`.\n\nAlapintegrálok:\n\n- `∫ xⁿ dx = xⁿ⁺¹/(n+1) + C` (n ≠ −1)\n- `∫ 1/x dx = ln|x| + C`\n- `∫ eˣ dx = eˣ + C`\n- `∫ sin x dx = −cos x + C`, `∫ cos x dx = sin x + C`\n- `∫ 1/(1 + x²) dx = arctg x + C`\n\nMinden folytonos függvénynek van primitív függvénye, de nem mindig fejezhető ki elemi függvényekkel: `e^(−x²)` primitív függvénye nem elemi (ebből lesz a hibafüggvény, erf, a valószínűségszámítás normális eloszlásánál).',
        example: '`∫ (6x² − 4/x + eˣ) dx = 2x³ − 4·ln|x| + eˣ + C`. Ellenőrzés deriválással: `6x² − 4/x + eˣ`.',
        pitfall: 'A `+ C` elhagyása határozatlan integrálnál hiba. Az ln|x| abszolút értéke sem dísz: x < 0-ra is ez a primitív függvény.',
        related: ['derivalt', 'newton-leibniz', 'parcialis-integralas', 'helyettesites', 'kozepertektetel'] },
      { id: 'riemann-integral', term: 'Riemann-integrál (határozott integrál)', en: 'Riemann integral, definite integral', topic: 'integral',
        short: 'Az [a; b] intervallumot kis részekre osztjuk és képezzük a Σ f(ξᵢ)·Δxᵢ közelítő összegeket; ha ezek a felosztás finomításával egyetlen számhoz tartanak, az az f határozott integrálja.',
        visual: riemSvg, caption: 'Közelítő összeg nyolc téglalappal (ξᵢ a részintervallumok felezőpontja). Finomabb felosztással az összeg a görbe alatti területhez tart.',
        text: 'Nemnegatív f esetén az integrál a görbe alatti **terület**; ahol f negatív, ott a terület negatív előjellel számít. A pontos definíció alsó és felső összegekkel dolgozik (Darboux): f integrálható, ha a felosztás finomításával a kettő különbsége 0-hoz tart.\n\nZárt intervallumon minden **folytonos** függvény (sőt minden korlátos, véges sok pontban szakadó függvény) Riemann-integrálható. Az integrál **lineáris**, és **intervallum szerint additív**: ha a < b < c, az [a; c]-n vett integrál az [a; b]-n és a [b; c]-n vett integrálok összege.\n\nFizikai jelentés: a sebesség integrálja a megtett út, az áramerősségé a töltés, a teljesítményé az energia.',
        formulas: ['newton-leibniz-f'],
        example: '`∫₀¹ x² dx` közelítése n = 4 egyenlő részre:\n\n- bal oldali téglalapokkal: `(0 + 1/16 + 4/16 + 9/16)·1/4 = 14/64 ≈ 0,219`\n- jobb oldali téglalapokkal: `(1 + 4 + 9 + 16)/16 · 1/4 = 30/64 ≈ 0,469`\n\nA pontos érték 1/3, és n → ∞ esetén mindkét összeg ehhez tart.',
        pitfall: 'A határozott integrál **szám**, nem függvény (nincs + C). A terület és az integrál csak nemnegatív függvénynél egyezik: sin x integrálja a [0; 2π]-n 0, pedig a görbe és a tengely közti terület 4.',
        related: ['newton-leibniz', 'primitiv-fuggveny', 'improprius-integral', 'folytonossag', 'vegtelen-sor'],
        models: ['akkucella'] },
      { id: 'newton-leibniz', term: 'Newton–Leibniz-formula', en: 'fundamental theorem of calculus', topic: 'integral',
        short: 'Ha f integrálható [a; b]-n és F egy primitív függvénye, akkor a határozott integrál: ∫ f(x) dx = F(b) − F(a).',
        text: 'Ez az **analízis alaptétele**: összeköti a két nagy fogalmat, a deriváltat és az integrált. A határozott integrál kiszámításához nem kell közelítő összegeket számolni, elég egy primitív függvényt találni. Jelölés: `[F(x)]ₐᵇ = F(b) − F(a)`.\n\nA tétel másik fele az **integrálfüggvényről** szól: ha f folytonos, akkor `I(x) = ∫ₐˣ f(t) dt` differenciálható, és `I′(x) = f(x)`. Vagyis minden folytonos függvénynek van primitív függvénye, és az integrálás a deriválás megfordítása.',
        formulas: ['newton-leibniz-f'],
        example: 'sin x integrálja a [0; π]-n: `[−cos x]` 0-tól π-ig `= −cos π − (−cos 0) = 1 + 1 = 2`. Egy szinuszív alatti terület tehát pontosan 2.',
        pitfall: 'A primitív függvénynek a **teljes** [a; b] intervallumon léteznie kell. 1/x² integrálja a [−1; 1]-en „számolással” `[−1/x] = −1 − 1 = −2` lenne – egy pozitív függvény integrálja nem lehet negatív! Az 1/x² a 0-ban nem korlátos: ez divergens improprius integrál.',
        related: ['riemann-integral', 'primitiv-fuggveny', 'derivalt', 'improprius-integral'] },
      { id: 'parcialis-integralas', term: 'Parciális integrálás', en: 'integration by parts', topic: 'integral',
        short: '∫ f·g′ dx = f·g − ∫ f′·g dx – a szorzat deriválási szabályának integrál alakja.',
        text: 'Akkor hasznos, ha a szorzat egyik tényezője deriválva egyszerűbb lesz (pl. polinom), a másiknak pedig könnyű a primitív függvénye (eˣ, sin x, cos x).\n\nTipikus esetek:\n\n- `∫ xⁿ·eˣ dx`, `∫ xⁿ·sin x dx`: a polinom legyen f (deriválva „elfogy”);\n- `∫ ln x dx`, `∫ arctg x dx`: írjuk `1·ln x` alakba, és ln x legyen f;\n- `∫ eˣ·sin x dx`: kétszeri parciális integrálás után az eredeti integrál visszatér, és egyenletként rendezhető.',
        formulas: ['parcialis-f'],
        example: '`∫ x·eˣ dx`: f = x, g′ = eˣ ⟹ f′ = 1, g = eˣ. Így `∫ x·eˣ dx = x·eˣ − ∫ eˣ dx = (x − 1)·eˣ + C`. Ellenőrzés: `((x − 1)eˣ)′ = eˣ + (x − 1)eˣ = x·eˣ`.',
        pitfall: 'Rossz szereposztásnál az integrál bonyolultabb lesz: ∫ x·eˣ-nél ha f = eˣ és g′ = x, akkor ∫ x²/2·eˣ dx következik, ami rosszabb az eredetinél.',
        related: ['primitiv-fuggveny', 'helyettesites', 'derivalt', 'newton-leibniz'] },
      { id: 'helyettesites', term: 'Helyettesítéses integrálás', en: 'integration by substitution', topic: 'integral',
        short: 'Új változó bevezetése: ∫ f(g(x))·g′(x) dx = ∫ f(u) du, ahol u = g(x) – a láncszabály megfordítása.',
        text: 'Recept: válasszuk u = g(x)-et, írjuk fel `du = g′(x) dx`-et, majd az integrandust **teljesen** u-val fejezzük ki. Határozott integrálnál a **határokat is át kell számolni**: x = a-hoz u = g(a), x = b-hez u = g(b) tartozik.\n\nNevezetes speciális eset: `∫ f′(x)/f(x) dx = ln|f(x)| + C`. Gyökös kifejezéseknél gyakran trigonometrikus helyettesítés segít (√(1 − x²)-nél x = sin t).',
        formulas: ['lancszabaly-f'],
        example: '`∫ 2x·cos(x²) dx`: u = x², du = 2x dx ⟹ `∫ cos u du = sin u + C = sin(x²) + C`.\n\n`x·e^(x²)` integrálja a [0; 1]-en: u = x², du = 2x dx, az új határok 0 és 1 ⟹ `½·∫ eᵘ du = (e − 1)/2 ≈ 0,859`.',
        pitfall: 'A dx-et is helyettesíteni kell! `∫ cos(3x) dx = sin(3x)/3 + C`, nem sin(3x) + C, mert u = 3x esetén dx = du/3.',
        related: ['lancszabaly', 'primitiv-fuggveny', 'parcialis-integralas', 'newton-leibniz'] },
      { id: 'improprius-integral', term: 'Improprius integrál', en: 'improper integral', topic: 'integral',
        short: 'Nem korlátos intervallumon vagy nem korlátos függvényre vett integrál, amelyet határértékként értelmezünk: például az [a; ω]-n vett integrálok határértéke, ha ω → ∞.',
        visual: impSvg, caption: 'Az 1/x² alatti végtelen hosszú tartomány területe véges (1), az 1/x alatti végtelen.',
        text: 'Két fajtája van:\n\n- **végtelen intervallum**: kiszámoljuk az [a; ω]-n vett integrált, majd ω → ∞;\n- **nem korlátos integrandus** (pl. 1/√x a 0 közelében): a szinguláris pont felé tartó határral számolunk.\n\nHa a határérték véges, az improprius integrál **konvergens**, különben **divergens**. Fontos összehasonlító példa: `1/xᵖ` integrálja az [1; ∞)-en pontosan akkor konvergens, ha p > 1, a (0; 1]-en pedig pontosan akkor, ha p < 1.\n\nAz improprius integrál és a végtelen sor szoros rokonok: az **integrálkritérium** szerint monoton fogyó, pozitív f-re Σ f(n) és f [1; ∞)-en vett integrálja egyszerre konvergens vagy divergens.',
        example: '1/x² az [1; ω]-n: `[−1/x] = 1 − 1/ω → 1`. A végtelen hosszú tartomány területe véges: 1.\n\n1/x az [1; ω]-n: `ln ω → ∞`, tehát divergens.',
        pitfall: 'Az, hogy f(x) → 0, ha x → ∞, nem elég a konvergenciához: 1/x is 0-hoz tart, mégis divergens az integrálja. Elég gyorsan kell lecsengenie.',
        related: ['riemann-integral', 'newton-leibniz', 'vegtelen-sor'] },

      /* ----- Sorok és differenciálegyenletek ----- */
      { id: 'vegtelen-sor', term: 'Végtelen sor', en: 'infinite series', topic: 'sorok',
        short: 'Egy (aₙ) sorozat tagjainak „végtelen összege”: Σ aₙ értéke az sₙ = a₁ + … + aₙ részletösszegek sorozatának határértéke, ha az létezik.',
        text: 'A sor **konvergens**, ha a részletösszegek sorozata konvergens; ekkor ennek határértéke a sor összege.\n\n- **Mértani sor**: `Σ qⁿ = 1/(1 − q)` (n = 0-tól), ha |q| < 1; különben divergens.\n- **Harmonikus sor**: `Σ 1/n` divergens, bár a tagok 0-hoz tartanak. `Σ 1/n²` viszont konvergens (összege π²/6).\n\nKonvergenciakritériumok:\n\n- **szükséges feltétel**: aₙ → 0;\n- **hányados-** és **gyökkritérium**: ha lim |aₙ₊₁/aₙ| < 1, illetve lim ⁿ√|aₙ| < 1, a sor (abszolút) konvergens, ha > 1, divergens;\n- **összehasonlító kritérium** ismert sorokkal;\n- **Leibniz-kritérium** váltakozó előjelű sorokra: ha |aₙ| monoton 0-hoz tart, a sor konvergens.\n\nHa Σ |aₙ| is konvergens, a sor **abszolút konvergens**, és tagjai tetszőlegesen átrendezhetők.',
        formulas: ['mertani-sor'],
        example: '`0,999… = 9/10 + 9/100 + … = (9/10)·1/(1 − 1/10) = 1`. A mértani sor pontosan megmutatja, hogy 0,999… = 1.',
        pitfall: 'aₙ → 0 **szükséges, de nem elégséges**: a harmonikus sor tagjai 0-hoz tartanak, a sor mégis divergens (a részletösszegek ln n-hez hasonlóan nőnek).',
        related: ['sorozat-hatarertek', 'cauchy-sorozat', 'hatvanysor', 'improprius-integral', 'konvergenciasugar', 'riemann-integral'] },
      { id: 'hatvanysor', term: 'Hatványsor', en: 'power series', topic: 'sorok',
        short: 'Σ cₙ(x − a)ⁿ alakú végtelen sor; x-től függően konvergens vagy divergens, a konvergenciatartományán függvényt határoz meg.',
        text: 'A hatványsorok „végtelen fokszámú polinomok”. A konvergencia-intervallum belsejében tagonként **deriválhatók és integrálhatók**, és a konvergenciasugár ettől nem változik. Ezért kényelmes velük számolni: differenciálegyenletek megoldását is kereshetjük hatványsor alakban.\n\nHa f végtelen sokszor differenciálható, **Taylor-sora** egy hatványsor, `cₙ = f⁽ⁿ⁾(a)/n!` együtthatókkal. Az eˣ, sin x és cos x Taylor-sora minden x-re konvergál, és előállítja a függvényt.',
        formulas: ['cauchy-hadamard'],
        example: 'A mértani sorból: `1/(1 − x) = 1 + x + x² + x³ + …`, ha |x| < 1. Tagonként integrálva: `−ln(1 − x) = x + x²/2 + x³/3 + …`. Az x = −1 helyen (Abel-tétel): `ln 2 = 1 − 1/2 + 1/3 − 1/4 + …`.',
        pitfall: 'Egy végtelen sokszor deriválható függvény Taylor-sora konvergálhat máshoz, mint maga a függvény: az `f(x) = e^(−1/x²)`, f(0) = 0 függvény Taylor-sora 0 körül azonosan 0.',
        related: ['vegtelen-sor', 'konvergenciasugar', 'taylor-polinom', 'e-szam'] },
      { id: 'konvergenciasugar', term: 'Konvergenciasugár', en: 'radius of convergence', topic: 'sorok',
        short: 'Az az R ≥ 0 szám (vagy ∞), amelyre a Σ cₙ(x − a)ⁿ hatványsor |x − a| < R esetén abszolút konvergens, |x − a| > R esetén divergens.',
        text: 'Kiszámítása a **Cauchy–Hadamard-tétellel**: `1/R = limsup ⁿ√|cₙ|`, vagy ha létezik, a hányadoskritériumból: `R = lim |cₙ/cₙ₊₁|`.\n\nA **határpontokban** (|x − a| = R) a tétel semmit sem mond, ott külön vizsgálat kell.\n\nKomplex változóban szemléletes a jelentése: R a középponttól a függvény legközelebbi szinguláris pontjáig mért távolság. Ezért 1/(1 + x²) sora 0 körül csak |x| < 1-re konvergens, pedig a valós tengelyen a függvény mindenhol „szép”: a ±i pontokban szinguláris.',
        formulas: ['cauchy-hadamard'],
        example: 'Σ xⁿ/n: cₙ = 1/n, `R = lim (n+1)/n = 1`. Az x = 1 helyen a harmonikus sor (divergens), x = −1-ben a Leibniz-sor (konvergens). A konvergenciatartomány: [−1; 1).\n\nΣ xⁿ/n!: `R = lim (n+1)!/n! = ∞`, minden x-re konvergens (ez az eˣ).',
        pitfall: 'A konvergenciasugár a határpontokról nem mond semmit, és a konvergenciatartomány lehet nyílt, zárt vagy félig nyílt intervallum is.',
        related: ['hatvanysor', 'vegtelen-sor'] },
      { id: 'linearis-de', term: 'Elsőrendű lineáris differenciálegyenlet', en: 'first-order linear ODE', topic: 'sorok',
        short: 'y′ + p(x)·y = q(x) alakú egyenlet, amelynek ismeretlenje az y(x) függvény. Homogén, ha q ≡ 0.',
        visual: deSvg, caption: 'Az y′ = −0,8(y − 2) egyenlet iránymezője és négy megoldása: mindegyik exponenciálisan közelít az y = 2 egyensúlyi megoldáshoz.',
        text: 'A **differenciálegyenletben** az ismeretlen egy függvény, és szerepel benne a deriváltja is. Az általános megoldás egy tetszőleges állandót tartalmaz, amelyet a **kezdeti feltétel** (pl. y(0) = y₀) rögzít.\n\nMegoldás lépései:\n\n1. A homogén egyenlet, y′ = −p(x)·y **szétválasztható**: `yₕ = C·e^(−P(x))`, ahol P′ = p.\n2. Az inhomogén egyenletre **állandó variálásával**: y = C(x)·e^(−P(x)) alakban keresve `C′(x) = q(x)·e^(P(x))`.\n3. Általános megoldás = a homogén egyenlet általános megoldása + az inhomogén egy partikuláris megoldása.\n\nAz ábra **iránymezője** minden pontban a megoldás meredekségét mutatja: a megoldásgörbék „követik a vonalkákat”.',
        formulas: ['exp-megoldas'],
        example: 'Newton-féle lehűlési törvény: `T′ = −k(T − Tₖ)`, ahol Tₖ a környezet hőmérséklete. Megoldása `T(t) = Tₖ + (T₀ − Tₖ)·e^(−kt)`. 90 °C-os tea 20 °C-os szobában, k = 0,05 1/perc: 10 perc után `T = 20 + 70·e^(−0,5) ≈ 62,5 °C`.',
        pitfall: 'Az állandót a kezdeti feltételből a **teljes** (homogén + partikuláris) megoldásra kell meghatározni, nem csak a homogén részre. És a „lineáris” y-ra és y′-re vonatkozik: y′ = y² nem lineáris, x²·y′ + y = 0 viszont igen.',
        related: ['exponencialis-novekedes', 'primitiv-fuggveny', 'derivalt'] },
      { id: 'exponencialis-novekedes', term: 'Exponenciális növekedés és bomlás', en: 'exponential growth and decay', topic: 'sorok',
        short: 'Ha egy mennyiség változási sebessége arányos magával a mennyiséggel (y′ = k·y), akkor y(t) = y₀·eᵏᵗ: k > 0 esetén exponenciális növekedés, k < 0 esetén bomlás.',
        text: 'Az y′ = ky a legegyszerűbb differenciálegyenlet, és mindenhol megjelenik: populációnövekedés (korlátlan erőforrás mellett), kamatos kamat, radioaktív bomlás, kondenzátor kisülése (`U(t) = U₀·e^(−t/RC)`).\n\nJellemző idők:\n\n- **időállandó**: τ = 1/|k| – ennyi idő alatt e-szeresére nő, illetve e-ad részére csökken;\n- **duplázódási idő** ln 2/k (növekedésnél), **felezési idő** ln 2/|k| (bomlásnál).\n\nAz exponenciális folyamat **logaritmikus skálán egyenes**: mért adatokból k a ln y – t grafikon meredekségéből olvasható le.',
        formulas: ['exp-megoldas'],
        example: 'Évi 7%-os folytonos növekedésnél a duplázódási idő `ln 2 / 0,07 ≈ 9,9 év` (a „70-es szabály”: 70/7 = 10 év).',
        pitfall: 'A valóságban az exponenciális növekedés mindig csak ideig-óráig tart: korlátos erőforrásnál a **logisztikus** modell, `y′ = ky(1 − y/K)` a pontosabb. Ne keverjük a lineáris növekedéssel sem: itt a **relatív** (százalékos) változás állandó, nem az abszolút.',
        related: ['linearis-de', 'e-szam', 'derivalt'],
        models: ['atom'] },
      /* ----- Bővítés: további alapfogalmak ----- */
      { id: 'bolzano-weierstrass', term: 'Folytonos függvény zárt intervallumon (Bolzano- és Weierstrass-tétel)', en: 'intermediate value theorem, extreme value theorem', topic: 'fuggveny',
        short: 'Zárt, korlátos intervallumon folytonos függvény minden közbülső értéket felvesz (Bolzano), és van legnagyobb és legkisebb értéke (Weierstrass).',
        prereq: ['analizis/folytonossag'],
        text: 'Az [a; b] intervallumon folytonos függvényekről három alaptételt használunk folyamatosan:\n\n- **Bolzano-tétel**: ha f(a) és f(b) ellentétes előjelű, akkor van olyan c ∈ (a; b), hogy f(c) = 0. Általánosabban (**Darboux-tulajdonság**): f(a) és f(b) között minden értéket felvesz.\n- **Weierstrass-tétel**: f korlátos, és felveszi a legnagyobb és a legkisebb értékét (van abszolút maximuma és minimuma).\n- **Heine-tétel**: f egyenletesen folytonos – ezen múlik többek között a Riemann-integrálhatóság.\n\nMindhárom tétel a valós számok **teljességén** alapul. A feltételek nem hagyhatók el: az 1/x függvény a (0; 1] intervallumon folytonos, de nem korlátos (az intervallum nem zárt); a [−1; 1]-en vett előjelfüggvény előjelet vált, mégsem 0 sehol, mert nem folytonos.\n\n**Felezéses módszer (intervallumfelezés)**: a Bolzano-tétel bizonyítása egyben algoritmus is. Megnézzük f-et az intervallum felezőpontjában, és azt a felét tartjuk meg, ahol az előjelváltás van. n lépés után a gyök helyét `(b − a)/2ⁿ` pontossággal ismerjük. Lassú, de **mindig működik** – ezért a numerikus gyökkeresők gyakran ezzel indulnak, és gyorsabb módszerre (pl. Newton-módszer) váltanak.',
        example: 'x³ + x − 1 = 0 egy gyöke a (0; 1)-ben van, mert f(0) = −1 < 0 és f(1) = 1 > 0. Felezés: f(0,5) = −0,375 ⟹ (0,5; 1); f(0,75) ≈ 0,172 ⟹ (0,5; 0,75); f(0,625) ≈ −0,131 ⟹ (0,625; 0,75). A gyök ≈ 0,6823.',
        pitfall: 'A Bolzano-tétel csak a gyök **létezését** mondja ki, egyértelműségét nem: több gyök is lehet. Megfordítva sem igaz: gyök előjelváltás nélkül is lehet (x² a 0-ban), ezért a felezéses módszer az ilyen gyököt nem találja meg.',
        related: ['folytonossag', 'szelsoertek', 'newton-modszer', 'riemann-integral', 'cauchy-sorozat'] },
      { id: 'fuggvenyvizsgalat', term: 'Teljes függvényvizsgálat (monotonitás, konvexitás, inflexió)', en: 'curve sketching: monotonicity, convexity, inflection', topic: 'derivalt',
        short: 'A deriváltak előjeléből olvassuk ki a függvény menetét: f′ > 0 esetén szigorúan nő, f″ > 0 esetén konvex; az inflexiós pontban a görbület iránya megfordul.',
        prereq: ['analizis/derivalt', 'analizis/szelsoertek'],
        text: 'A függvényvizsgálat menete:\n\n1. **Értelmezési tartomány**, zérushelyek, paritás (páros: f(−x) = f(x); páratlan: f(−x) = −f(x)), periodicitás.\n2. **Határértékek** a tartomány szélein és a szakadási helyeken; **aszimptoták**. Ferde aszimptota y = mx + b, ahol `m = lim f(x)/x` és `b = lim (f(x) − mx)`, ha x → ±∞.\n3. **Első derivált**: ahol f′ > 0, a függvény szigorúan nő, ahol f′ < 0, csökken (a Lagrange-középértéktétel következménye). Stacionárius pontok, szélsőértékek.\n4. **Második derivált**: f **konvex** egy intervallumon, ha bármely két pontja közötti húr a grafikon fölött (vagy rajta) van; kétszer differenciálható f-nél ez azt jelenti, hogy f″ ≥ 0. Ha f″ ≤ 0, **konkáv**. (Középiskolában: „alulról konvex”, illetve „alulról konkáv”.)\n5. **Inflexiós pont**: ahol a függvény konvexből konkávba vált vagy fordítva. Itt f″ = 0 (ha létezik), de ez csak szükséges feltétel – f″-nek **előjelet kell váltania**.\n6. Táblázatba foglaljuk az eredményeket, megadjuk az értékkészletet, és felrajzoljuk a grafikont.\n\nA konvexitás nemcsak a rajzhoz kell: konvex függvény minden lokális minimuma globális minimum, ezért az optimalizálásban (pl. a gépi tanulásban) kitüntetett szerepe van.',
        example: 'f(x) = x³ − 3x (páratlan). `f′ = 3(x − 1)(x + 1)`: nő a (−∞; −1], csökken a [−1; 1], nő az [1; ∞) intervallumon; lokális maximum f(−1) = 2, minimum f(1) = −2. `f″ = 6x`: x < 0-ra konkáv, x > 0-ra konvex, inflexiós pont (0; 0). Zérushelyek: 0 és ±√3.',
        pitfall: 'f″(x₀) = 0 még nem inflexió: f(x) = x⁴ esetén f″(0) = 0, de a függvény mindenütt konvex, a 0-ban minimuma van. Vigyázz a terminológiára is: egyes könyvek a „konvex” szót fordított értelemben használják, ezért mindig a definíciót nézd (húr a grafikon fölött).',
        related: ['szelsoertek', 'derivalt', 'kozepertektetel', 'fuggveny-hatarertek', 'erinto'] },
      { id: 'newton-modszer', term: 'Newton-módszer (érintőmódszer)', en: "Newton's method (Newton–Raphson method)", topic: 'derivalt',
        short: 'Egyenlet gyökének iteratív közelítése: a függvényt az aktuális pontban az érintőjével helyettesítjük, és az érintő zérushelye lesz a következő közelítés.',
        prereq: ['analizis/erinto'],
        text: 'Az f(x) = 0 egyenletet sokszor nem lehet képlettel megoldani (pl. cos x = x), ezért közelítő eljárást használunk. Az xₙ pontban húzott érintő: `y = f(xₙ) + f′(xₙ)(x − xₙ)`. Ennek zérushelye:\n\n`xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)`.\n\n**Konvergencia**: ha f kétszer folytonosan differenciálható, az r gyökben f′(r) ≠ 0, és a kezdőpont elég közel van, a hiba **kvadratikusan** csökken: `eₙ₊₁ ≈ (f″/(2f′))·eₙ²`. A gyakorlatban ez azt jelenti, hogy a helyes tizedesjegyek száma lépésenként nagyjából **megduplázódik**. Összehasonlításul: a felezéses módszer lépésenként csak egy kettedes jegyet nyer.\n\n**Hátrányok**:\n\n- kell hozzá a derivált;\n- ha f′(xₙ) ≈ 0, a következő pont nagyon messzire ugrik;\n- rossz kezdőpontból divergálhat vagy ciklusba kerülhet;\n- többszörös gyöknél csak lineárisan konvergál.\n\nEzért a gyakorlatban gyakran felezéssel szűkítik a gyök helyét, majd Newton-lépésekkel finomítanak. Többváltozós egyenletrendszerre ugyanez működik: a derivált helyére a **Jacobi-mátrix** lép, és minden lépésben egy lineáris egyenletrendszert oldunk meg. A számológépek és számítógépek négyzetgyökvonása és osztása is ilyen iterációkra épül.',
        formulas: ['newton-modszer-f'],
        example: '√2 kiszámítása, f(x) = x² − 2: az iteráció `xₙ₊₁ = (xₙ + 2/xₙ)/2` (ez az ókori Hérón-féle eljárás). x₀ = 1 ⟹ x₁ = 1,5 ⟹ x₂ = 1,416667 ⟹ x₃ = 1,414216. A hibák: 0,086 → 0,0025 → 0,000002 – a pontos jegyek száma valóban duplázódik.',
        pitfall: 'A módszer nem „mindig működik”: f(x) = x³ − 2x + 2 esetén x₀ = 0-ból x₁ = 1, majd x₂ = 0 adódik, és az iteráció örökké a 0 és 1 között ugrál. Mindig ellenőrizd, hogy |f(xₙ)| valóban csökken-e.',
        related: ['erinto', 'derivalt', 'bolzano-weierstrass', 'taylor-polinom'] },
      { id: 'integral-alkalmazasai', term: 'A határozott integrál alkalmazásai (terület, térfogat, ívhossz, munka)', en: 'applications of the definite integral', topic: 'integral',
        short: 'Ami „kis darabok összegeként” áll elő – görbék közötti terület, forgástest térfogata, ívhossz, munka –, az határozott integrállal számolható.',
        prereq: ['analizis/riemann-integral', 'analizis/newton-leibniz'],
        text: 'Az alkalmazások közös gondolatmenete: a mennyiséget **kis darabokra** bontjuk, egy darabot egyszerű képlettel közelítünk, összegzünk, majd a darabok méretét 0-hoz tartjuk – ez éppen a Riemann-integrál.\n\n- **Két görbe közötti terület**: `T = ∫ₐᵇ (f(x) − g(x)) dx`, ha f ≥ g.\n- **Forgástest térfogata** (az x tengely körül, tárcsamódszer): egy vékony szelet egy πf(x)² alapú, dx vastag korong, ezért `V = π ∫ₐᵇ f(x)² dx`.\n- **Ívhossz**: egy kis darab hossza Pitagorasz-tétellel `√(dx² + dy²)`, így `L = ∫ₐᵇ √(1 + f′(x)²) dx`.\n- **Forgásfelület** (palást): `A = 2π ∫ₐᵇ f(x)·√(1 + f′(x)²) dx`.\n- **Munka** változó erőnél: `W = ∫ F(x) dx`.\n- **Átlagérték**: `(1/(b − a))·∫ₐᵇ f(x) dx` – pl. a váltakozó áram négyzetes középértéke (effektív érték) is így adódik.\n- **Súlypont, tömeg, nyomaték**: sűrűséggel súlyozott integrálok.\n\nA fizikában szinte minden „összegyűlő” mennyiség ilyen: az elmozdulás a sebesség, a töltés az áramerősség, az energia a teljesítmény időbeli integrálja.',
        formulas: ['newton-leibniz-f'],
        example: 'Gömb térfogata: az f(x) = √(R² − x²) félkört forgatjuk: `V = π ∫ (R² − x²) dx` (−R-től R-ig) `= π(2R³ − 2R³/3) = 4R³π/3`.\n\nRugó megnyújtása s-sel (F = D·x): `W = ∫₀ˢ D·x dx = D·s²/2` – ez a rugalmas energia.',
        pitfall: 'Az integrál előjeles területet ad: `∫₀^{2π} sin x dx = 0`, a ténylegesen bezárt terület viszont 4. Ha a görbék metszik egymást, a metszéspontoknál fel kell bontani az intervallumot, és |f − g|-t kell integrálni.',
        related: ['riemann-integral', 'newton-leibniz', 'kettos-integral', 'primitiv-fuggveny'] },
      { id: 'taylor-sor', term: 'Taylor-sor', en: 'Taylor series', topic: 'sorok',
        short: 'Végtelen sokszor differenciálható függvény hatványsora az a pont körül, Σ f⁽ᵏ⁾(a)/k!·(x − a)ᵏ; ott állítja elő a függvényt, ahol a maradéktag 0-hoz tart.',
        prereq: ['analizis/taylor-polinom', 'analizis/hatvanysor'],
        text: 'A Taylor-polinom fokszámát minden határon túl növelve hatványsort kapunk. Ez a sor pontosan akkor állítja elő f(x)-et, ha az **Rₙ(x) maradéktag 0-hoz tart**. Fontos sorfejtések (a = 0 körül) és érvényességi tartományuk:\n\n- `eˣ = Σ xⁿ/n!` – minden x-re;\n- `sin x = x − x³/3! + x⁵/5! − …`, `cos x = 1 − x²/2! + x⁴/4! − …` – minden x-re;\n- `1/(1 − x) = Σ xⁿ` – ha |x| < 1;\n- `ln(1 + x) = x − x²/2 + x³/3 − …` – ha −1 < x ≤ 1;\n- `(1 + x)^α = 1 + αx + α(α − 1)/2!·x² + …` (binomiális sor) – ha |x| < 1;\n- `arctg x = x − x³/3 + x⁵/5 − …` – ha |x| ≤ 1.\n\nA konvergenciasugáron belül a sor **tagonként deriválható és integrálható**. Így kapjuk például ln(1 + x) sorát az 1/(1 + x) mértani sor integrálásával, arctg x-ét pedig az 1/(1 + x²) sorából. A sorokba komplex számot írva adódik az **Euler-formula**: `e^(ix) = cos x + i·sin x`.\n\nFigyelem: a Taylor-sor konvergenciája **még nem garantálja**, hogy a sor összege f. Az `f(x) = e^(−1/x²)` (f(0) = 0) függvény minden deriváltja 0-ban 0, így Taylor-sora azonosan 0, maga a függvény pedig x ≠ 0-ra pozitív. Azokat a függvényeket, amelyeket a Taylor-soruk előállít, **analitikusnak** nevezzük.',
        formulas: ['taylor-f', 'cauchy-hadamard'],
        example: 'Az `∫₀¹ e^(−x²) dx` integrál primitív függvénye nem elemi. Sorral: `e^(−x²) = 1 − x² + x⁴/2 − x⁶/6 + x⁸/24 − …`, tagonként integrálva `1 − 1/3 + 1/10 − 1/42 + 1/216 − … ≈ 0,7475`. A sor váltakozó előjelű, így a hiba kisebb a következő tagnál (1/1320 ≈ 0,00076); a pontos érték 0,746824…',
        pitfall: 'A sor csak a konvergenciatartományban használható: ln(1 + x) sora x = 2-ben divergens, hiába létezik ln 3. Ilyenkor más fejtési pontot vagy átalakítást kell választani (pl. ln 3 = ln 2 + ln 1,5).',
        related: ['taylor-polinom', 'hatvanysor', 'konvergenciasugar', 'e-szam', 'fourier-sor'] },
      { id: 'fourier-sor', term: 'Fourier-sor', en: 'Fourier series', topic: 'sorok',
        short: 'Egy periodikus függvény felbontása szinusz- és koszinuszhullámok végtelen összegére: f(x) ~ a₀/2 + Σ (aₙ cos nx + bₙ sin nx).',
        prereq: ['analizis/riemann-integral', 'linearis-algebra/ortogonalitas'],
        text: 'A Taylor-sor egy pont környezetében közelít hatványokkal; a Fourier-sor egy **teljes perióduson** közelít trigonometrikus függvényekkel. Az ötlet J. Fourier hővezetési vizsgálataiból (19. század eleje) származik.\n\n**Miért így számoljuk az együtthatókat?** A trigonometrikus függvények a [−π; π] intervallumon **ortogonálisak**: `∫ sin mx · cos nx dx = 0`, és `∫ sin mx · sin nx dx = 0` (m ≠ n), míg `∫ sin² nx dx = π`. Ezért az együttható ugyanúgy „vetítéssel” kapható, mint egy vektor koordinátája ortogonális bázisban: f-et megszorozzuk cos nx-szel (sin nx-szel), integrálunk, és minden más tag kiesik.\n\n**Konvergencia** (Dirichlet-tétel): ha f szakaszonként folytonosan differenciálható, a Fourier-sor minden x-ben a bal és jobb oldali határérték átlagához, `(f(x−) + f(x+))/2`-höz tart – folytonossági pontban tehát f(x)-hez.\n\n**Hasznos megfigyelések**:\n\n- páros függvény sorában csak koszinuszok, páratlanéban csak szinuszok vannak;\n- **Parseval-egyenlőség**: `(1/π)∫ f² dx = a₀²/2 + Σ (aₙ² + bₙ²)` – a jel „energiája” megoszlik a frekvenciák között;\n- ugrásnál a részletösszegek kb. 9%-kal túllőnek (**Gibbs-jelenség**).\n\nAlkalmazások: hangszerek hangszíne (felharmonikusok), rezgések és hővezetés megoldása, jelfeldolgozás, és ezen alapulnak a hang- és képtömörítő eljárások (koszinusz-transzformáció) is. Nem periodikus jelekre a **Fourier-transzformáció** az általánosítás.',
        formulas: ['fourier-f'],
        example: 'Négyszögjel (f = −1 a (−π; 0), f = 1 a (0; π) szakaszon): `f(x) = (4/π)·(sin x + sin 3x/3 + sin 5x/5 + …)`. Az x = π/2 helyen f = 1, ebből `1 − 1/3 + 1/5 − 1/7 + … = π/4` (Leibniz-sor).',
        pitfall: 'A szakadási helyen a sor nem f értékét, hanem az átlagot adja (a négyszögjelnél x = 0-ban 0-t). A Gibbs-féle túllövés több tag felvételével sem tűnik el, csak egyre keskenyebb lesz.',
        related: ['vegtelen-sor', 'taylor-sor', 'riemann-integral', 'parcialis-integralas'] },
      { id: 'szetvalaszthato-de', term: 'Szétválasztható változójú differenciálegyenlet', en: 'separable differential equation', topic: 'sorok',
        short: 'Az y′ = f(x)·g(y) alakú egyenlet: a változókat két oldalra rendezve (dy/g(y) = f(x) dx) mindkét oldal külön integrálható.',
        prereq: ['analizis/primitiv-fuggveny', 'analizis/lancszabaly'],
        text: '**Módszer**: ha g(y) ≠ 0, akkor\n\n`∫ dy/g(y) = ∫ f(x) dx + C`,\n\nmajd (ha lehet) kifejezzük y-t, és a C állandót a **kezdeti feltételből** határozzuk meg. A „dx-szel való szorzás” csak jelölés; a pontos indoklás a láncszabály: ha G′ = 1/g és F′ = f, akkor `(G(y(x)))′ = y′/g(y) = f(x)`, tehát `G(y(x)) = F(x) + C`.\n\nA g(c) = 0 egyenlet gyökeihez tartoznak az **állandó (egyensúlyi) megoldások**, y ≡ c – ezeket az osztásnál elveszítjük, külön kell felírni.\n\n**Egzisztencia és unicitás** (Picard–Lindelöf-tétel): ha az y′ = F(x, y) egyenlet jobb oldala folytonos, és y szerint Lipschitz-feltételt teljesít (pl. folytonosan differenciálható), akkor a kezdetiérték-problémának a kezdőpont környezetében **pontosan egy** megoldása van. Ha a feltétel sérül, több megoldás is lehet: az `y′ = 3y^(2/3)`, y(0) = 0 feladatot az y ≡ 0 és az y = x³ is kielégíti.\n\n**Fontos példák**: exponenciális növekedés (y′ = ky), Newton-féle lehűlés, és a **logisztikus egyenlet**, `y′ = ky(1 − y/K)`, amelynek megoldása `y = K/(1 + A·e^(−kt))`, A = (K − y₀)/y₀ – a korlátos erőforrású népességnövekedés, a járványok kezdeti terjedése vagy egy termék elterjedésének S alakú görbéje.',
        formulas: ['exp-megoldas'],
        example: 'y′ = x·y², y(0) = 1. Szétválasztva `dy/y² = x dx` ⟹ `−1/y = x²/2 + C`; y(0) = 1-ből C = −1, így `y = 2/(2 − x²)`. A megoldás csak a (−√2; √2) intervallumon létezik: x → √2 esetén „felrobban”, pedig az egyenlet jobb oldala mindenhol szép.',
        pitfall: 'A konstanst az integráláskor kell beírni, nem a végén: `ln|y| = x + C`-ből `y = C₁·eˣ` lesz (C₁ = ±e^C), nem `eˣ + C`. És ne felejtsd el az osztáskor elvesző állandó megoldásokat (y′ = y² esetén y ≡ 0).',
        related: ['linearis-de', 'exponencialis-novekedes', 'primitiv-fuggveny', 'helyettesites', 'masodrendu-de'] },
      { id: 'masodrendu-de', term: 'Állandó együtthatós másodrendű lineáris differenciálegyenlet', en: 'second-order linear ODE with constant coefficients', topic: 'sorok',
        short: 'Az y″ + p·y′ + q·y = r(x) egyenlet; a homogén rész megoldásait e^(λx) alakban keressük, ahol λ a λ² + pλ + q = 0 karakterisztikus egyenlet gyöke.',
        prereq: ['analizis/linearis-de', 'mechanika/szabad-rezges'],
        text: 'A homogén egyenlet (r = 0) megoldásai **kétdimenziós vektorteret** alkotnak: két megoldás bármely lineáris kombinációja is megoldás (szuperpozíció). y = e^(λx)-et behelyettesítve a **karakterisztikus egyenletet** kapjuk: λ² + pλ + q = 0. A D = p² − 4q diszkrimináns szerint:\n\n- **D > 0** (két valós gyök): `y = C₁e^(λ₁x) + C₂e^(λ₂x)`;\n- **D = 0** (kettős gyök): `y = (C₁ + C₂x)·e^(λx)`;\n- **D < 0** (λ = α ± iβ): `y = e^(αx)·(C₁ cos βx + C₂ sin βx)` – az Euler-formulából.\n\nA két állandót **két** kezdeti feltétel rögzíti: y(0) és y′(0).\n\n**Inhomogén egyenlet**: általános megoldás = a homogén egyenlet általános megoldása + az inhomogén egyenlet egy **partikuláris** megoldása. Ezt polinom, e^(kx), sin, cos típusú r(x) esetén **próbafüggvénnyel** keressük (a jobb oldallal azonos alakú kifejezés ismeretlen együtthatókkal). Ha a próbafüggvény maga is megoldja a homogén egyenletet (**rezonancia**), x-szel meg kell szorozni.\n\n**Fizikai jelentés**: a csillapított rezgőmozgás egyenlete, `m·ẍ + c·ẋ + s·x = F(t)`, pontosan ilyen. A három eset a túlcsillapított, a kritikusan csillapított és a lengő (alulcsillapított) mozgás. Ugyanez az egyenlet írja le az RLC-kört (L·q̈ + R·q̇ + q/C = U(t)).',
        example: 'y″ + 2y′ + 5y = 0, y(0) = 1, y′(0) = 0. `λ² + 2λ + 5 = 0` ⟹ λ = −1 ± 2i, így `y = e^(−x)(C₁ cos 2x + C₂ sin 2x)`. y(0) = C₁ = 1; `y′(0) = −C₁ + 2C₂ = 0` ⟹ C₂ = 1/2. Megoldás: `y = e^(−x)(cos 2x + ½ sin 2x)` – csillapodó rezgés.',
        pitfall: 'Rezonanciánál a „kézenfekvő” próbafüggvény nem működik: y″ + y = sin x esetén A sin x + B cos x behelyettesítve 0-t ad. Helyesen x·(A sin x + B cos x)-et kell próbálni; az eredmény `y_p = −(x/2)·cos x` – a kitérés időben korlátlanul nő.',
        related: ['linearis-de', 'szetvalaszthato-de', 'exponencialis-novekedes', 'taylor-sor'] },
      /* ----- Többváltozós függvények ----- */
      { id: 'tobbvaltozos-fuggveny', term: 'Többváltozós függvény, határérték és folytonosság', en: 'functions of several variables; limit and continuity', topic: 'tobbvaltozos',
        short: 'Olyan függvény, amely egy ℝⁿ-beli ponthoz (több valós számhoz) rendel valós számot, pl. f(x, y); grafikonja felület, szemléltetésére szintvonalakat használunk.',
        prereq: ['analizis/fuggveny-hatarertek', 'linearis-algebra/vektor'],
        text: 'A valóság legtöbb mennyisége több változótól függ: a hőmérséklet a helytől és az időtől, T(x, y, z, t); egy téglalap területe két oldalától, T = xy. Kétváltozós f grafikonja a z = f(x, y) **felület**. Síkban jól ábrázolhatók a **szintvonalak**, f(x, y) = c – ilyenek a térképek szintvonalai és az időjárási térképek izobárjai.\n\n**Határérték**: `lim f(x) = A`, ha x → a, amennyiben minden ε > 0-hoz van δ > 0, hogy `0 < |x − a| < δ` esetén `|f(x) − A| < ε`. Itt |x − a| a (euklideszi) távolság. A definíció formailag ugyanaz, mint egy változóban, de a lényeges különbség: a pontot **végtelen sok irányból és görbe mentén** lehet megközelíteni, és mindegyiknél ugyanazt kell kapni.\n\n- **Nemlétezés igazolása**: két olyan út, amely mentén különböző a határérték.\n- **Létezés igazolása**: becslés, pl. polárkoordinátákkal, |f(x, y) − A| ≤ g(r), ahol g(r) → 0.\n\n**Folytonosság**: lim f(x) = f(a). Folytonos függvények összege, szorzata, összetétele folytonos; a Weierstrass-tétel itt is érvényes: **korlátos és zárt** halmazon folytonos függvény felveszi a maximumát és a minimumát.',
        example: '`f(x, y) = xy/(x² + y²)` az origóban: az y = mx egyenes mentén `m/(1 + m²)`, ami m-től függ, tehát nincs határérték.\n\n`g(x, y) = x²y/(x² + y²)`: polárkoordinátákkal `g = r·cos²φ·sin φ`, így |g| ≤ r → 0; a határérték 0, g folytonosan kiterjeszthető.',
        pitfall: 'Nem elég az egyenesek mentén vizsgálni: `x²y/(x⁴ + y²)` minden origón átmenő egyenes mentén 0-hoz tart, de az y = x² parabola mentén végig 1/2. A határértékhez **minden** közeledési módra ugyanaz kell.',
        related: ['fuggveny-hatarertek', 'folytonossag', 'parcialis-derivalt', 'gradiens', 'bolzano-weierstrass'] },
      { id: 'parcialis-derivalt', term: 'Parciális derivált és totális differenciálhatóság', en: 'partial derivative, total differentiability', topic: 'tobbvaltozos',
        short: 'Az f(x, y) függvény x szerinti parciális deriváltja (∂f/∂x) a közönséges derivált, miközben a többi változót állandónak tekintjük.',
        prereq: ['analizis/derivalt', 'analizis/tobbvaltozos-fuggveny'],
        text: '`∂f/∂x (a, b) = lim (f(a + h, b) − f(a, b))/h`, h → 0. Szemléletesen: a felületet az y = b síkkal elmetszük, és a metszetgörbe meredekségét vesszük. A számolás egyszerű: a többi változó „konstans”. Jelölés még: fₓ, ∂ₓf.\n\n**Magasabb rendű deriváltak**: fₓₓ, fₓᵧ, fᵧₓ, fᵧᵧ. **Young-tétel** (Schwarz-tétel): ha a második parciális deriváltak folytonosak, a deriválás sorrendje felcserélhető, fₓᵧ = fᵧₓ.\n\n**Totális differenciálhatóság**: f az a pontban differenciálható, ha jól közelíthető lineáris függvénnyel:\n\n`f(a + h) = f(a) + ∇f(a)·h + o(|h|)`.\n\nKét változóban ez az **érintősík** létezése: `z = f(a, b) + fₓ·(x − a) + fᵧ·(y − b)`. A parciális deriváltak létezése ehhez **nem elég** (lásd a hibákat), de ha a parciális deriváltak folytonosak, f differenciálható.\n\n**Többváltozós láncszabály**: ha x = x(t), y = y(t), akkor `d f(x(t), y(t))/dt = fₓ·x′ + fᵧ·y′`.\n\n**Hibaterjedés**: a teljes differenciál, `Δf ≈ fₓ·Δx + fᵧ·Δy`, megmutatja, hogyan hat a mért adatok hibája a számított eredményre – a mérésértékelés alapképlete.',
        example: 'f = x²y + sin(xy): `fₓ = 2xy + y·cos(xy)`, `fᵧ = x² + x·cos(xy)`, és mindkét sorrendben `fₓᵧ = 2x + cos(xy) − xy·sin(xy)`.\n\nHenger térfogata, V = πr²h, r = 5 ± 0,1 cm, h = 10 ± 0,2 cm: `ΔV ≈ 2πrh·Δr + πr²·Δh = 10π + 5π ≈ 47 cm³`, a V ≈ 785 cm³-nek kb. 6%-a.',
        pitfall: 'Az `f = xy/(x² + y²)`, f(0, 0) = 0 függvénynek az origóban mindkét parciális deriváltja létezik (0), mégsem folytonos ott, így differenciálható sem. Többváltozós esetben a parciális deriválhatóságból nem következik a folytonosság.',
        related: ['tobbvaltozos-fuggveny', 'gradiens', 'derivalt', 'lancszabaly', 'erinto'] },
      { id: 'gradiens', term: 'Gradiens és iránymenti derivált', en: 'gradient and directional derivative', topic: 'tobbvaltozos',
        short: 'A gradiens a parciális deriváltakból álló vektor, ∇f = (∂f/∂x, ∂f/∂y, …): a leggyorsabb növekedés irányába mutat, hossza ennek a növekedésnek a mértéke.',
        prereq: ['analizis/parcialis-derivalt', 'linearis-algebra/skalaris-szorzat'],
        text: 'Ha egy e **egységvektor** irányában indulunk el, a függvény változási sebessége az **iránymenti derivált**:\n\n`∂f/∂e = ∇f · e = |∇f|·cos θ`,\n\nahol θ a gradiens és e szöge. Ebből három fontos következmény olvasható ki:\n\n- a növekedés θ = 0-nál, azaz a **gradiens irányában a legnagyobb**, és értéke |∇f|;\n- a gradienssel ellentétes irányban a leggyorsabb a csökkenés;\n- a **szintvonal** (szintfelület) mentén f nem változik, ezért ott ∂f/∂e = 0: a **gradiens merőleges a szintvonalakra**.\n\n**Fizikai megjelenések**: a hő a hőmérséklet-gradienssel szemben áramlik (Fourier-törvény, `q = −λ·∇T`); az elektromos térerősség a potenciál negatív gradiense (`E = −∇φ`); konzervatív erő a potenciális energia negatív gradiense (`F = −∇U`). A víz a terepen a legnagyobb lejtés, azaz a −∇h irányában folyik.\n\n**Gradiensmódszer** (gradient descent): egy függvény minimumát úgy keressük, hogy kis lépésekben a −∇f irányába haladunk: `x_{k+1} = x_k − η·∇f(x_k)`. A neurális hálók tanítása is ezen az elven működik.\n\nEgy F(x, y, z) = 0 felület **normálvektora** ∇F – ezzel írható fel az érintősík.',
        formulas: ['gradiens-f'],
        example: 'f(x, y) = x² + 3y², P(1; 1): ∇f = (2x; 6y) = (2; 6). Az e = (3; 4)/5 irányban `∂f/∂e = (2·3 + 6·4)/5 = 6`. A legnagyobb növekedés a (2; 6) irányában `|∇f| = √40 ≈ 6,32`; a (6; −2) irányban (a szintvonal érintője) a derivált 0.',
        pitfall: 'Az iránymenti deriválthoz **egységvektor** kell: ha e = (3; 4)-gyel számolnánk normálás nélkül, ötszörös értéket kapnánk. A gradiens az értelmezési tartomány (az x, y sík) vektora, nem a felületen „fekszik”.',
        related: ['parcialis-derivalt', 'tobbvaltozos-szelsoertek', 'lagrange-multiplikator', 'tobbvaltozos-fuggveny'] },
      { id: 'tobbvaltozos-szelsoertek', term: 'Többváltozós szélsőérték és a Hesse-mátrix', en: 'extrema of functions of several variables, Hessian matrix', topic: 'tobbvaltozos',
        short: 'Belső lokális szélsőértékhelyen a gradiens nulla; hogy ott minimum, maximum vagy nyeregpont van-e, a második deriváltak Hesse-mátrixa dönti el.',
        prereq: ['analizis/gradiens', 'analizis/szelsoertek', 'linearis-algebra/sajatertek'],
        text: '**Szükséges feltétel**: ha a differenciálható f-nek belső pontban lokális szélsőértéke van, ott `∇f = 0` (stacionárius pont).\n\n**Elégséges feltétel**: a második rendű Taylor-közelítés stacionárius pontban `f(a + h) ≈ f(a) + ½·hᵀHh`, ahol H a **Hesse-mátrix** (a második parciális deriváltak mátrixa, folytonos deriváltaknál szimmetrikus). Tehát:\n\n- H **pozitív definit** (minden sajátértéke > 0) ⟹ lokális minimum;\n- H **negatív definit** (minden sajátértéke < 0) ⟹ lokális maximum;\n- H **indefinit** (van pozitív és negatív sajátértéke is) ⟹ **nyeregpont**: egyes irányokban nő, másokban csökken;\n- ha H szinguláris (van 0 sajátérték), a teszt nem dönt.\n\n**Két változóban**: `D = fₓₓ·fᵧᵧ − fₓᵧ²` (a Hesse-mátrix determinánsa).\n\n- D > 0 és fₓₓ > 0 ⟹ minimum; D > 0 és fₓₓ < 0 ⟹ maximum;\n- D < 0 ⟹ nyeregpont;\n- D = 0 ⟹ nem dönthető el így.\n\n**Globális szélsőérték** korlátos, zárt tartományon: a belső stacionárius pontokat és a **határon** felvett értékeket is össze kell vetni (a határon gyakran Lagrange-multiplikátorral dolgozunk).\n\nA módszer klasszikus alkalmazása a **legkisebb négyzetek** módszere: az illesztési hiba négyzetösszegét minimalizáljuk az egyenes két paramétere szerint.',
        example: 'f = x³ − 3x + y². `∇f = (3x² − 3; 2y) = 0` ⟹ (1; 0) és (−1; 0). fₓₓ = 6x, fᵧᵧ = 2, fₓᵧ = 0.\n\n- (1; 0): D = 12 > 0, fₓₓ = 6 > 0 ⟹ lokális minimum, f = −2;\n- (−1; 0): D = −12 < 0 ⟹ nyeregpont.',
        pitfall: 'A ∇f = 0 nem jelent szélsőértéket: a `z = x² − y²` nyeregfelületnek az origóban vízszintes az érintősíkja, mégsem minimum és nem is maximum. D = 0-nál pedig bármi lehet: x⁴ + y⁴-nek minimuma, x⁴ − y⁴-nek nyeregpontja van az origóban.',
        related: ['szelsoertek', 'gradiens', 'lagrange-multiplikator', 'taylor-polinom', 'parcialis-derivalt'] },
      { id: 'lagrange-multiplikator', term: 'Feltételes szélsőérték: Lagrange-multiplikátor', en: 'Lagrange multiplier', topic: 'tobbvaltozos',
        short: 'Az f(x, y) szélsőértékét a g(x, y) = 0 feltétel mellett ott keressük, ahol a két gradiens párhuzamos: ∇f = λ·∇g.',
        prereq: ['analizis/gradiens'],
        text: 'Sok optimalizálási feladatban **kötött** a mozgásunk: adott kerületű téglalap, adott költségvetés, adott anyagmennyiség. Ilyenkor nem a teljes síkon, hanem a g(x, y) = 0 görbén keressük f szélsőértékét.\n\n**Geometriai indoklás**: a feltételi görbén haladva f mindaddig változik, amíg a görbe metszi f szintvonalait. Szélsőértéknél a görbe **érinti** az egyik szintvonalat. Az érintkezési pontban a két görbe normálisa – vagyis ∇f és ∇g – párhuzamos:\n\n`∇f = λ·∇g`, és `g(x, y) = 0`.\n\nEz n változó esetén n + 1 egyenlet n + 1 ismeretlenre (x₁, …, xₙ, λ). Kényelmes megfogalmazás: az `L = f − λ·g` **Lagrange-függvény** stacionárius pontjait keressük, ∇L = 0. Több feltételnél: `∇f = λ₁∇g₁ + λ₂∇g₂ + …`.\n\n**A λ jelentése**: megmutatja, mennyit változik az optimális érték, ha a feltételt egy egységgel lazítjuk. A közgazdaságtanban ezt **árnyékárnak** nevezik (mennyit érne egy további egységnyi erőforrás).\n\nA módszer feltétele, hogy a vizsgált pontban ∇g ≠ 0. A kapott jelöltek közül az értékek összehasonlításával (vagy másodrendű feltétellel) döntjük el, melyik a minimum és melyik a maximum.',
        example: 'Melyik 20 egység kerületű téglalap területe a legnagyobb? f = xy, g = 2x + 2y − 20 = 0. `∇f = (y; x)`, `∇g = (2; 2)`: y = 2λ, x = 2λ ⟹ x = y = 5, a terület 25 – a négyzet. λ = 2,5: ha a kerület 21-re nő, a legnagyobb terület kb. 2,5-del nő (pontosan 5,25² = 27,56).',
        pitfall: 'Gyakori hiba elfelejteni a g = 0 feltételt az egyenletrendszerből: nélküle csak az irányok párhuzamosságát írjuk elő, ami végtelen sok pontra teljesülhet. A λ előjele sem kötött, és λ = 0 is lehetséges (ha a feltétel nélküli szélsőérték éppen a görbére esik).',
        related: ['tobbvaltozos-szelsoertek', 'gradiens', 'szelsoertek'] },
      { id: 'kettos-integral', term: 'Kettős integrál (Fubini-tétel, polárkoordináták)', en: 'double integral, Fubini theorem, polar coordinates', topic: 'tobbvaltozos',
        short: 'Kétváltozós függvény integrálja egy síktartományon – a felület alatti térfogat; téglalapon két egymás utáni egyváltozós integrállal számolható.',
        prereq: ['analizis/riemann-integral', 'analizis/tobbvaltozos-fuggveny', 'linearis-algebra/determinans'],
        text: '**Definíció**: a D tartományt kis ΔAᵢ területű részekre bontjuk, és képezzük a `Σ f(ξᵢ)·ΔAᵢ` közelítő összegeket; ha a felosztás finomításával ezek egy számhoz tartanak, ez a kettős integrál, `∬_D f dA`. Ha f ≥ 0, ez a felület alatti test térfogata.\n\n**Fubini-tétel**: folytonos f esetén téglalapon\n\n`∬ f dA = ∫_a^b (∫_c^d f(x, y) dy) dx = ∫_c^d (∫_a^b f(x, y) dx) dy`,\n\nazaz a belső integrálnál a másik változó állandó. **Normáltartományon** (a ≤ x ≤ b, φ₁(x) ≤ y ≤ φ₂(x)) a belső határok x-től függnek. A sorrend felcserélése néha egy megoldhatatlan integrálból egyszerűt csinál – ilyenkor a határokat a tartomány rajzából kell újra felírni.\n\n**Helyettesítés**: új koordinátákra térve a területelem a **Jacobi-determináns** abszolút értékével szorzódik. Polárkoordinátákban `dA = r dr dφ`, térbeli gömbi koordinátákban `dV = r²·sin θ dr dθ dφ`.\n\n**Alkalmazások**:\n\n- terület (f = 1), tömeg (f = sűrűség), súlypont: `x_S = (1/A)·∬ x dA`;\n- **másodrendű nyomaték** (a hajlítás méretezéséhez): `I = ∬ y² dA`;\n- valószínűség: együttes sűrűségfüggvény integrálja egy tartományon.\n\nA hármas integrál ugyanígy működik térfogaton.',
        formulas: ['polar-f'],
        example: 'Téglalapon: `∬ xy dA` a [0; 1] × [0; 2] téglalapon `= ∫₀¹ x dx · ∫₀² y dy = ½ · 2 = 1`.\n\nGauss-integrál: `(∫ e^(−x²) dx)² = ∬ e^(−(x² + y²)) dA` a teljes síkon `= ∫₀^{2π} ∫₀^∞ e^(−r²)·r dr dφ = 2π · ½ = π`, ezért `∫ e^(−x²) dx = √π` (−∞-től ∞-ig) – ez adja a normális eloszlás normáló tényezőjét.',
        pitfall: 'A polárkoordinátás helyettesítésnél gyakran kimarad az r szorzó (dA = r dr dφ, nem dr dφ). A sorrend cseréjekor a határokat nem lehet egyszerűen megcserélni, ha a tartomány nem téglalap.',
        related: ['riemann-integral', 'improprius-integral', 'tobbvaltozos-fuggveny', 'integral-alkalmazasai', 'helyettesites'] }
    ]
  });
})();
