/* Egyetem: Fizika (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';

  /* ---------- rajzsegédek ---------- */
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
  function arrow(x1, y1, x2, y2, col, w) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 1.5) + '"/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  function axes(xa, ya, xb, yb, x0, y0) { return arrow(xa, ya, xb, ya, 'var(--fg-2)') + arrow(x0, y0, x0, yb, 'var(--fg-2)'); }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (cls || T)) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  function pts(fr, fn, a, b, n) { var r = []; for (var i = 0; i <= n; i++) { var x = a + (b - a) * i / n; r.push([fr.X(x), fr.Y(fn(x))]); } return r; }
  function poly(p) { return p.map(function (q, i) { return (i ? 'L' : 'M') + q[0] + ' ' + q[1]; }).join(' '); }

  /* ---------- 1. Harmonikus rezgés: rugó + x(t), v(t) ---------- */
  var ho = frame(0, 2, -1.25, 1.25, 150, 20, 380, 180);
  var oscSvg = '<svg viewBox="0 0 560 250">';
  // rugó és test (pillanatkép a t = 0 helyzetben: x = +A)
  var zig = 'M60 14 L60 30', segs = 10;
  for (var zi = 1; zi <= segs; zi++) zig += ' L' + (zi % 2 ? 44 : 76) + ' ' + (30 + zi * 7);
  zig += ' L60 ' + (30 + segs * 7 + 7) + ' L60 ' + (30 + segs * 7 + 14);
  oscSvg += '<line x1="30" y1="14" x2="90" y2="14" stroke="var(--fg-2)" stroke-width="3"/>' +
    '<path d="' + zig + '" fill="none" stroke="var(--fg-2)" stroke-width="2"/>' +
    '<rect x="38" y="' + (30 + segs * 7 + 14) + '" width="44" height="34" rx="4" fill="#2f7bf6"/>' + txt(60, 30 + segs * 7 + 36, 'm', T, 14, 'middle', 'fill="#fff" font-weight="700"') +
    txt(60, 228, 'k rugóállandó', M, 11, 'middle');
  oscSvg += '<line x1="150" y1="' + ho.Y(1) + '" x2="530" y2="' + ho.Y(1) + '" stroke="var(--muted)" stroke-dasharray="3 4"/>' +
    '<line x1="150" y1="' + ho.Y(-1) + '" x2="530" y2="' + ho.Y(-1) + '" stroke="var(--muted)" stroke-dasharray="3 4"/>' +
    axes(150, ho.Y(0), 545, 12, 150, 205) +
    '<path d="' + curve(ho, function (t) { return 0.75 * -Math.sin(2 * Math.PI * t); }, 0, 2, 200, -2, 2) + '" fill="none" stroke="#f08c2e" stroke-width="2.2" stroke-dasharray="7 4"/>' +
    '<path d="' + curve(ho, function (t) { return Math.cos(2 * Math.PI * t); }, 0, 2, 200, -2, 2) + '" fill="none" stroke="#2f7bf6" stroke-width="3"/>' +
    txt(144, ho.Y(1) + 4, 'A', T, 12, 'end') + txt(144, ho.Y(-1) + 4, '−A', T, 12, 'end') + txt(548, ho.Y(0) + 16, 't', M, 12, 'end') +
    '<line x1="' + ho.X(0) + '" y1="' + (ho.Y(-1) + 14) + '" x2="' + ho.X(1) + '" y2="' + (ho.Y(-1) + 14) + '" stroke="var(--fg-2)"/>' +
    '<line x1="' + ho.X(1) + '" y1="' + (ho.Y(-1) + 8) + '" x2="' + ho.X(1) + '" y2="' + (ho.Y(-1) + 20) + '" stroke="var(--fg-2)"/>' +
    txt((ho.X(0) + ho.X(1)) / 2, ho.Y(-1) + 28, 'T = 2π√(m/k)', T, 12, 'middle') +
    '<rect x="200" y="234" width="14" height="4" fill="#2f7bf6"/>' + txt(220, 240, 'kitérés x(t) = A·cos ωt', T, 11) +
    '<rect x="380" y="234" width="14" height="4" fill="#f08c2e"/>' + txt(400, 240, 'sebesség v(t) (léptékezve)', T, 11) + '</svg>';

  /* ---------- 2. Carnot-körfolyamat p–V diagramon ---------- */
  var g = 5 / 3, T1 = 1, T2 = 0.5, V1 = 1, V2 = 2.4, rr = Math.pow(T1 / T2, 1 / (g - 1)), V3 = V2 * rr, V4 = V1 * rr;
  var p2 = T1 / V2, p4 = T2 / V4;
  var cp = frame(0, 7.4, 0, 1.08, 60, 12, 460, 190);
  function iso(Tk) { return function (V) { return Tk / V; }; }
  var s12 = pts(cp, iso(T1), V1, V2, 40), s23 = pts(cp, function (V) { return p2 * Math.pow(V2 / V, g); }, V2, V3, 40),
    s34 = pts(cp, iso(T2), V3, V4, 40), s41 = pts(cp, function (V) { return p4 * Math.pow(V4 / V, g); }, V4, V1, 40);
  function midArrow(seg, col) { var i = Math.floor(seg.length / 2), a = seg[i - 1], b = seg[i + 1]; return head(seg[i][0], seg[i][1], Math.atan2(b[1] - a[1], b[0] - a[0]), col, 11); }
  var carSvg = '<svg viewBox="0 0 560 240">' +
    '<path d="' + poly(s12.concat(s23, s34, s41)) + ' z" fill="#7c5cd6" opacity=".16"/>' +
    '<path d="' + curve(cp, iso(T1), 0.93, 7.3, 80, 0, 1.12) + '" fill="none" stroke="#e5484d" stroke-width="1.2" stroke-dasharray="4 4" opacity=".7"/>' +
    '<path d="' + curve(cp, iso(T2), 0.47, 7.3, 80, 0, 1.12) + '" fill="none" stroke="#2f7bf6" stroke-width="1.2" stroke-dasharray="4 4" opacity=".7"/>' +
    '<g fill="none" stroke-width="3"><path d="' + poly(s12) + '" stroke="#e5484d"/><path d="' + poly(s23) + '" stroke="#7c5cd6"/><path d="' + poly(s34) + '" stroke="#2f7bf6"/><path d="' + poly(s41) + '" stroke="#7c5cd6"/></g>' +
    midArrow(s12, '#e5484d') + midArrow(s23, '#7c5cd6') + midArrow(s34, '#2f7bf6') + midArrow(s41, '#7c5cd6') +
    axes(60, cp.Y(0), 548, 6, 60, cp.Y(0)) + txt(546, cp.Y(0) + 16, 'V', M, 13, 'end') + txt(68, 16, 'p', M, 13);
  [[V1, T1 / V1, '1', -14, -4], [V2, p2, '2', 6, -6], [V3, T2 / V3, '3', 6, -6], [V4, p4, '4', -6, 16]].forEach(function (q) {
    carSvg += '<circle cx="' + cp.X(q[0]) + '" cy="' + cp.Y(q[1]) + '" r="4.5" style="fill:var(--fg)"/>' + txt(cp.X(q[0]) + q[3], cp.Y(q[1]) + q[4], q[2], T, 13, null, 'font-weight="700"');
  });
  carSvg += txt(cp.X(1.7) + 8, cp.Y(T1 / 1.7) - 10, 'Q₁ felvétel (izoterm, T₁)', T, 12, null, 'fill="#e5484d"') +
    txt(cp.X(4.6), cp.Y(0) + 17, 'Q₂ leadás (izoterm, T₂)', T, 12, 'middle', 'fill="#2f7bf6"') +
    txt(395, 60, 'lila: adiabaták (Q = 0)', T, 12, null, 'fill="#7c5cd6"') + txt(395, 78, 'szaggatott: teljes izotermák', M, 11) +
    txt(cp.X(3.0), cp.Y(0.25) + 6, 'W', T, 16, 'middle', 'font-weight="700"') +
    txt(cp.X(7.3), cp.Y(T1 / 7.3) - 6, 'T₁', T, 12, 'end', 'fill="#e5484d"') + txt(cp.X(7.3), cp.Y(T2 / 7.3) + 14, 'T₂', T, 12, 'end', 'fill="#2f7bf6"') + '</svg>';

  /* ---------- 3. Elektromos dipólus erővonalai (numerikus integrálással) ---------- */
  var qs = [[-1.2, 0, 1], [1.2, 0, -1]], fs = 80, cx0 = 280, cy0 = 140;
  function E(x, y) {
    var ex = 0, ey = 0;
    qs.forEach(function (q) { var dx = x - q[0], dy = y - q[1], r3 = Math.pow(dx * dx + dy * dy, 1.5); ex += q[2] * dx / r3; ey += q[2] * dy / r3; });
    return [ex, ey];
  }
  var fieldSvg = '<svg viewBox="0 0 560 280"><g fill="none" stroke="var(--fg-2)" stroke-width="1.4" opacity=".75">', heads = '';
  for (var li = 0; li < 16; li++) {
    var ang = (li + 0.5) / 16 * 2 * Math.PI, x = qs[0][0] + 0.12 * Math.cos(ang), y = 0.12 * Math.sin(ang), path = [], st = 0;
    while (st++ < 1200) {
      path.push([cx0 + x * fs, cy0 - y * fs]);
      var e = E(x, y), el = Math.sqrt(e[0] * e[0] + e[1] * e[1]);
      x += 0.025 * e[0] / el; y += 0.025 * e[1] / el;
      if (Math.abs(x) > 3.6 || Math.abs(y) > 1.85) break;
      if (Math.sqrt((x - qs[1][0]) * (x - qs[1][0]) + y * y) < 0.12) { path.push([cx0 + x * fs, cy0 - y * fs]); break; }
    }
    fieldSvg += '<path d="' + poly(path.map(function (p) { return [r1(p[0]), r1(p[1])]; })) + '"/>';
    var k = Math.min(path.length - 2, Math.floor(path.length * (path.length > 150 ? 0.25 : 0.5)));
    if (k > 2 && path[k][0] > 4 && path[k][0] < 556 && path[k][1] > 4 && path[k][1] < 276) heads += head(path[k][0], path[k][1], Math.atan2(path[k + 1][1] - path[k - 1][1], path[k + 1][0] - path[k - 1][0]), 'var(--fg-2)', 8);
  }
  fieldSvg += '</g>' + heads +
    '<circle cx="' + (cx0 + qs[0][0] * fs) + '" cy="' + cy0 + '" r="14" fill="#e5484d"/>' + txt(cx0 + qs[0][0] * fs, cy0 + 6, '+', T, 20, 'middle', 'fill="#fff" font-weight="700"') +
    '<circle cx="' + (cx0 + qs[1][0] * fs) + '" cy="' + cy0 + '" r="14" fill="#2f7bf6"/>' + txt(cx0 + qs[1][0] * fs, cy0 + 6, '−', T, 20, 'middle', 'fill="#fff" font-weight="700"') + '</svg>';

  /* ---------- 4. Kétréses interferencia ---------- */
  var slitSvg = '<svg viewBox="0 0 560 270"><defs><clipPath id="fz-slit-clip"><rect x="150" y="10" width="172" height="250"/></clipPath></defs>';
  for (var wf = 0; wf < 5; wf++) slitSvg += '<line x1="' + (30 + wf * 24) + '" y1="40" x2="' + (30 + wf * 24) + '" y2="230" stroke="#7c5cd6" stroke-width="2" opacity=".6"/>';
  slitSvg += arrow(20, 248, 120, 248, 'var(--muted)') + txt(20, 264, 'síkhullám (λ)', M, 11) +
    '<g fill="var(--fg-2)"><rect x="146" y="14" width="8" height="100"/><rect x="146" y="122" width="8" height="26"/><rect x="146" y="156" width="8" height="100"/></g>' +
    '<g clip-path="url(#fz-slit-clip)" fill="none" stroke-width="1.6">';
  for (var rad = 16; rad <= 200; rad += 16) {
    slitSvg += '<circle cx="150" cy="118" r="' + rad + '" stroke="#2f7bf6" opacity=".55"/><circle cx="150" cy="152" r="' + rad + '" stroke="#e5484d" opacity=".55"/>';
  }
  slitSvg += '</g><line x1="330" y1="14" x2="330" y2="256" stroke="var(--fg-2)" stroke-width="2.5"/>';
  var ip = '', env = '', ymid = 135, half = 118, amax = 3.8 * Math.PI;
  for (var yy = -half; yy <= half; yy += 2) {
    var al = yy / half * amax, b = al / 4, sinc = b === 0 ? 1 : Math.sin(b) / b, I = Math.pow(Math.cos(al), 2) * sinc * sinc;
    ip += (yy === -half ? 'M' : 'L') + r1(340 + 190 * I) + ' ' + (ymid + yy) + ' ';
    env += (yy === -half ? 'M' : 'L') + r1(340 + 190 * sinc * sinc) + ' ' + (ymid + yy) + ' ';
    slitSvg += '<rect x="314" y="' + (ymid + yy - 1) + '" width="12" height="2.4" fill="#f08c2e" opacity="' + r1(Math.min(1, I * 1.1)) + '"/>';
  }
  slitSvg += '<path d="' + env + '" fill="none" stroke="var(--muted)" stroke-dasharray="4 4"/><path d="' + ip + '" fill="none" stroke="#f08c2e" stroke-width="2.5"/>' +
    txt(158, 268, 'kettős rés (d)', M, 11) + txt(300, 10, 'ernyő', M, 11) + txt(420, 30, 'intenzitás I(y)', T, 12) +
    txt(420, 252, 'szaggatott: egy rés', M, 11) + txt(420, 266, 'elhajlási burkolója', M, 11) + '</svg>';

  /* ---------- 5. Doppler-effektus: hullámfrontok mozgó forrásnál ---------- */
  var dSvg = '<svg viewBox="0 0 560 230"><defs><clipPath id="fz-dop-clip"><rect x="0" y="8" width="560" height="180"/></clipPath></defs><g clip-path="url(#fz-dop-clip)" fill="none" stroke="#2f7bf6" stroke-width="2">';
  var cpx = 26, vs = 0.5, sx0 = 200, now = 6;
  for (var ti = 0; ti < now; ti++) {
    dSvg += '<circle cx="' + (sx0 + vs * ti * cpx) + '" cy="98" r="' + ((now - ti) * cpx) + '" opacity="' + r1(0.35 + 0.65 * ti / now) + '"/>';
  }
  var srcX = sx0 + vs * now * cpx;
  dSvg += '</g><circle cx="' + srcX + '" cy="98" r="7" fill="#e5484d"/>' + arrow(srcX + 10, 98, srcX + 46, 98, '#e5484d', 2.5) + txt(srcX + 28, 90, 'v', T, 13, 'middle', 'font-style="italic"') +
    '<circle cx="24" cy="98" r="9" fill="#2f9e6a"/><circle cx="536" cy="98" r="9" fill="#2f9e6a"/>' +
    txt(16, 206, '← távolodó forrás: hosszabb λ, kisebb f', T, 12) + txt(544, 206, 'közeledő forrás: rövidebb λ, nagyobb f →', T, 12, 'end') +
    txt(280, 224, 'forrás sebessége a hullámsebesség fele (v = c/2)', M, 11, 'middle') + '</svg>';

  /* ---------- 6. Radioaktív bomlás felezési időkkel ---------- */
  var dc = frame(0, 5.3, 0, 1.08, 64, 14, 456, 180);
  var decSvg = '<svg viewBox="0 0 560 235">';
  for (var h = 1; h <= 4; h++) {
    var fr = Math.pow(2, -h);
    decSvg += '<line x1="64" y1="' + dc.Y(fr) + '" x2="' + dc.X(h) + '" y2="' + dc.Y(fr) + '" stroke="var(--muted)" stroke-dasharray="3 4"/>' +
      '<line x1="' + dc.X(h) + '" y1="' + dc.Y(fr) + '" x2="' + dc.X(h) + '" y2="' + dc.Y(0) + '" stroke="var(--muted)" stroke-dasharray="3 4"/>' +
      '<circle cx="' + dc.X(h) + '" cy="' + dc.Y(fr) + '" r="4.5" fill="#e5484d"/>' +
      txt(dc.X(h), dc.Y(0) + 17, (h === 1 ? '' : h) + 'T', T, 12, 'middle') + (h < 4 ? txt(58, dc.Y(fr) + 4, 'N₀/' + Math.pow(2, h), M, 11, 'end') : txt(dc.X(h) + 6, dc.Y(fr) - 8, 'N₀/16', M, 11));
  }
  decSvg += '<path d="' + curve(dc, function (t) { return Math.pow(2, -t); }, 0, 5.2, 160, 0, 2) + '" fill="none" stroke="#e5484d" stroke-width="3"/>' +
    axes(64, dc.Y(0), 545, 6, 64, dc.Y(0)) + txt(58, dc.Y(1) + 4, 'N₀', T, 12, 'end') + txt(544, dc.Y(0) + 17, 't', M, 12, 'end') + txt(72, 14, 'N(t)', M, 12) +
    txt(dc.X(1.6), dc.Y(0.78), 'N(t) = N₀·e<tspan dy="-6" font-size="10">−λt</tspan><tspan dy="6"> = N₀·2</tspan><tspan dy="-6" font-size="10">−t/T</tspan>', T, 13) + txt(dc.X(1.6), dc.Y(0.78) + 20, 'minden T alatt a még meglévő magok fele bomlik el', M, 11) + '</svg>';

  /* ---------- 7. Alagúteffektus: hullámfüggvény potenciálgáton ---------- */
  var ga = 290, gb = 350, yc = 120, kw = 2 * Math.PI / 58, kap = 0.021, phi = Math.atan(kap / kw), Aamp = 34;
  var Cv = Aamp * Math.cos(phi), Dv = Cv * Math.exp(-kap * (gb - ga)), Bamp = Dv / Math.cos(phi);
  function psi(x) {
    if (x < ga) return Aamp * Math.cos(kw * (x - ga) + phi);
    if (x <= gb) return Cv * Math.exp(-kap * (x - ga));
    return Bamp * Math.cos(kw * (x - gb) + phi);
  }
  var wp = '';
  for (var px = 20; px <= 540; px += 2) wp += (px === 20 ? 'M' : 'L') + px + ' ' + r1(yc - psi(px)) + ' ';
  var tunSvg = '<svg viewBox="0 0 560 235">' +
    '<path d="M20 200 H' + ga + ' V60 H' + gb + ' V200 H540" fill="none" stroke="var(--fg-2)" stroke-width="2.5"/>' +
    '<rect x="' + ga + '" y="60" width="' + (gb - ga) + '" height="140" fill="#f08c2e" opacity=".18"/>' +
    '<line x1="20" y1="' + yc + '" x2="540" y2="' + yc + '" stroke="var(--muted)" stroke-dasharray="5 4"/>' +
    '<path d="' + wp + '" fill="none" stroke="#7c5cd6" stroke-width="3"/>' +
    txt(gb + 6, 72, 'V₀ (gát)', T, 12) + txt(544, yc - 6, 'E', T, 13, 'end', 'font-weight="700"') +
    txt(26, 222, 'beeső + visszavert hullám', M, 11) + txt(ga + (gb - ga) / 2, 222, 'lecsengés a gátban', M, 11, 'middle') + txt(540, 222, 'átjutott hullám', M, 11, 'end') +
    txt(26, 30, 'E < V₀: klasszikusan a részecske nem juthatna át', T, 12) + '</svg>';

  /* ---------- 8. Fotoeffektus: Eₖ,max a frekvencia függvényében ---------- */
  var ph = frame(0, 16, -2.8, 4.6, 60, 12, 460, 200), hEv = 0.4136; // eV / 10¹⁴ Hz
  var phSvg = '<svg viewBox="0 0 560 245">' +
    '<rect x="' + ph.X(4.0) + '" y="12" width="' + r1(ph.X(7.5) - ph.X(4.0)) + '" height="200" fill="#d9a520" opacity=".12"/>' + txt((ph.X(4) + ph.X(7.5)) / 2, 26, 'látható fény', M, 11, 'middle') +
    axes(60, ph.Y(0), 545, 6, 60, 214) +
    '<line x1="' + ph.X(0) + '" y1="' + ph.Y(-2.3) + '" x2="' + ph.X(2.3 / hEv) + '" y2="' + ph.Y(0) + '" stroke="#2f7bf6" stroke-width="1.6" stroke-dasharray="5 4"/>' +
    '<line x1="' + ph.X(2.3 / hEv) + '" y1="' + ph.Y(0) + '" x2="' + ph.X(16) + '" y2="' + ph.Y(16 * hEv - 2.3) + '" stroke="#2f7bf6" stroke-width="3"/>' +
    '<line x1="' + ph.X(4.3 / hEv) + '" y1="' + ph.Y(0) + '" x2="' + ph.X(16) + '" y2="' + ph.Y(16 * hEv - 4.3) + '" stroke="#e5484d" stroke-width="3"/>' +
    '<circle cx="' + ph.X(2.3 / hEv) + '" cy="' + ph.Y(0) + '" r="4.5" fill="#2f7bf6"/><circle cx="' + ph.X(4.3 / hEv) + '" cy="' + ph.Y(0) + '" r="4.5" fill="#e5484d"/>' +
    txt(ph.X(2.3 / hEv), ph.Y(0) + 18, 'f₀ (Na)', T, 11, 'middle', 'fill="#2f7bf6"') + txt(ph.X(4.3 / hEv), ph.Y(0) + 18, 'f₀ (Zn)', T, 11, 'middle', 'fill="#e5484d"') +
    txt(68, ph.Y(-2.3) + 16, '−W (Na) = −2,3 eV', T, 11, null, 'fill="#2f7bf6"') +
    txt(ph.X(9.5), ph.Y(9.5 * hEv - 2.3) - 12, 'nátrium', T, 12, 'end', 'fill="#2f7bf6" font-weight="700"') + txt(ph.X(13.6), ph.Y(13.6 * hEv - 4.3) + 22, 'cink', T, 12, null, 'fill="#e5484d" font-weight="700"') +
    txt(ph.X(8.2), ph.Y(-1.5), 'meredekség: h (mindkét fémre azonos)', T, 12) +
    txt(68, 18, 'Eₖ,max (eV)', M, 11) + txt(544, ph.Y(0) - 8, 'f (10¹⁴ Hz)', M, 11, 'end') +
    [4, 8, 12, 16].map(function (v) { return txt(ph.X(v), ph.Y(-2.8) + 16, v, M, 10, 'middle'); }).join('') + '</svg>';

  STUDIE.addCourse({
    id: 'fizika-bsc',
    title: 'Fizika (BSc)',
    icon: '🔭',
    color: '#2f7bf6',
    level: 'BSc 1–3. félév (mérnök, fizikus, informatikus)',
    description: 'Mechanika, hőtan, elektromágnesség, hullámok és modern fizika – a mérnöki fizika kulcsfogalmai ábrákkal és számpéldákkal.',
    intro: 'A fizika néhány nagy megmaradási törvényre és mezőfogalomra épül: **impulzus**, **energia**, **töltés**, és a mezők (elektromos, mágneses, hullámfüggvény). A hőtan a [[benzinmotor|benzinmotor]], az elektromágneses indukció az [[elektromos-auto|elektromos autó]], a modern fizika az [[atom|atom]] modellben kézzelfogható. A fogalomtérképen az is látszik, hogyan kötődik a hullámtan a kvantummechanikához.',
    topics: [
      { id: 'mechanika', title: 'Mechanika' },
      { id: 'termo', title: 'Termodinamika' },
      { id: 'em', title: 'Elektromágnesség' },
      { id: 'hullam', title: 'Hullámok és optika' },
      { id: 'modern', title: 'Modern fizika' },
      { id: 'relativitas', title: 'Speciális relativitáselmélet' }
    ],
    formulas: [
      {
        id: 'newton2', title: 'Newton II. törvénye impulzussal', en: "Newton's second law (momentum form)",
        parts: [{ t: 'F_{e}', d: 'A testre ható erők eredője (vektor)', unit: 'N' }, { t: '=' },
          { t: 'dp', d: 'Az impulzus (lendület) kis megváltozása', unit: 'kg·m/s', more: 'p = m·v' }, { t: '/' },
          { t: 'dt', d: 'A változáshoz tartozó kis időtartam', unit: 's' }],
        text: 'Állandó tömegnél `dp/dt = m·dv/dt = m·a`. Integrálva: az **erőlökés** egyenlő az impulzusváltozással, `∫ F dt = Δp`. Ha az eredő erő nulla, az impulzus megmarad.',
        example: 'Teniszlabda (58 g) 30 m/s-mal érkezik, 30 m/s-mal pattan vissza, az érintkezés 5 ms. Átlagos erő: `F = 0,058·60 / 0,005 ≈ 700 N`.'
      },
      {
        id: 'idealis-gaz-f', title: 'Az ideális gáz állapotegyenlete', en: 'ideal gas law',
        parts: [{ t: 'p', d: 'Nyomás', unit: 'Pa' }, { t: '·' }, { t: 'V', d: 'Térfogat', unit: 'm³' }, { t: '=' },
          { t: 'n', d: 'Anyagmennyiség', unit: 'mol' }, { t: '·' },
          { t: 'R', d: 'Egyetemes gázállandó', unit: 'J/(mol·K)', more: 'R = 8,314 J/(mol·K)' }, { t: '·' },
          { t: 'T', d: 'Abszolút hőmérséklet', unit: 'K', more: 'T = t(°C) + 273,15' }],
        text: 'Molekulaszámmal: `pV = N·k·T`, ahol k = 1,381·10⁻²³ J/K a Boltzmann-állandó.',
        example: '1 mol gáz 0 °C-on és 101 325 Pa nyomáson: `V = 8,314·273,15 / 101 325 ≈ 0,0224 m³ = 22,4 dm³`.'
      },
      {
        id: 'carnot-f', title: 'Carnot-hatásfok', en: 'Carnot efficiency',
        parts: [{ t: 'η_{C}', d: 'A Carnot-hatásfok: két hőtartály között működő hőerőgép elméletileg legnagyobb hatásfoka', unit: '0…1' }, { t: '=' }, { t: '1 −' },
          { t: 'T_2', d: 'A hideg tartály abszolút hőmérséklete', unit: 'K' }, { t: '/' },
          { t: 'T_1', d: 'A meleg tartály abszolút hőmérséklete', unit: 'K' }],
        text: 'A hatásfok `η = W/Q₁ = (Q₁ − Q₂)/Q₁`; reverzibilis körfolyamatban `Q₂/Q₁ = T₂/T₁`. Minden valódi (irreverzibilis) gép hatásfoka ennél kisebb.',
        example: 'Benzinmotor: T₁ ≈ 2300 K (égés), T₂ ≈ 350 K: `η ≈ 1 − 350/2300 ≈ 85%`. A valódi Otto-motor 30–38%-ot ér el.'
      },
      {
        id: 'entropia-f', title: 'Entrópiaváltozás', en: 'change of entropy',
        parts: [{ t: 'ΔS', d: 'A rendszer entrópiájának megváltozása', unit: 'J/K' }, { t: '=' },
          { t: '∫', d: 'Összegzés a kezdő- és végállapotot összekötő **reverzibilis** út mentén' },
          { t: 'δQ_{rev}', d: 'Reverzibilisen felvett elemi hő', unit: 'J', more: 'A δ jelzi, hogy a hő nem állapotfüggvény.' }, { t: '/' },
          { t: 'T', d: 'Az abszolút hőmérséklet a hőcsere pillanatában', unit: 'K' }],
        text: 'Állandó hőmérsékleten `ΔS = Q/T`. Ideális gázra: `ΔS = n·Cᵥ·ln(T₂/T₁) + n·R·ln(V₂/V₁)`. Mivel S állapotfüggvény, irreverzibilis folyamatnál is ugyanennyi a változás – csak egy reverzibilis helyettesítő úton kell számolni.',
        example: '1 mol ideális gáz izoterm módon kétszeres térfogatra tágul: `ΔS = R·ln 2 ≈ 5,76 J/K`.'
      },
      {
        id: 'faraday-f', title: 'Faraday-féle indukciós törvény', en: "Faraday's law of induction",
        parts: [{ t: 'U_i', d: 'Indukált feszültség (elektromotoros erő)', unit: 'V' }, { t: '=' },
          { t: '−', d: 'Lenz-törvény: az indukált áram akadályozza az őt létrehozó változást' },
          { t: 'N', d: 'A tekercs menetszáma', unit: '–' }, { t: '·' },
          { t: 'dΦ', d: 'A mágneses fluxus megváltozása', unit: 'Wb = V·s', more: 'Φ = B·A·cos α' }, { t: '/' },
          { t: 'dt', d: 'A változás ideje', unit: 's' }],
        text: 'A fluxus a mágneses indukció, a felület vagy a kettő szögének változása miatt is változhat – mindegyik feszültséget indukál.',
        example: 'Generátor: N = 100, A = 0,02 m², B = 0,5 T, ω = 314 1/s (50 Hz). `Φ = BA·cos ωt`, így a csúcsfeszültség `N·B·A·ω = 314 V`.'
      },
      {
        id: 'de-broglie-f', title: 'De Broglie-összefüggés', en: 'de Broglie relation',
        parts: [{ t: 'λ', d: 'A részecskéhez tartozó hullámhossz', unit: 'm' }, { t: '=' },
          { t: 'h', d: 'Planck-állandó', unit: 'J·s', more: 'h = 6,626·10⁻³⁴ J·s' }, { t: '/' },
          { t: 'p', d: 'A részecske impulzusa', unit: 'kg·m/s', more: 'Nemrelativisztikusan p = m·v = √(2mE).' }],
        text: 'Fotonra és anyagi részecskére egyaránt érvényes. Fotonnál p = E/c = h/λ.',
        example: '100 V-on gyorsított elektron: `p = √(2·m·e·U) ≈ 5,4·10⁻²⁴ kg·m/s`, `λ ≈ 0,123 nm` – atomi méret.'
      },
      {
        id: 'hatarozatlansag-f', title: 'Heisenberg-féle határozatlansági reláció', en: 'uncertainty principle',
        parts: [{ t: 'Δx', d: 'A helykoordináta bizonytalansága (szórása)', unit: 'm' }, { t: '·' },
          { t: 'Δp_x', d: 'Az impulzus x-komponensének bizonytalansága (szórása)', unit: 'kg·m/s' }, { t: '≥' },
          { t: 'ħ', d: 'Redukált Planck-állandó', unit: 'J·s', more: 'ħ = h/(2π) ≈ 1,055·10⁻³⁴ J·s' }, { t: '/ 2' }],
        text: 'Egyszerre éles hely és éles impulzus nem létezik. A Δ itt statisztikai szórást jelent: sok azonos módon előkészített rendszeren mérve a mérési eredmények szórása.',
        example: 'Δx = 10⁻¹⁰ m-be zárt elektron: `Δp ≥ 5,3·10⁻²⁵ kg·m/s`, azaz `Δv ≳ 5,8·10⁵ m/s`.'
      },
      {
        id: 'bomlas-f', title: 'Radioaktív bomlástörvény', en: 'radioactive decay law',
        parts: [{ t: 'N(t)', d: 'A t időpontig még el nem bomlott magok száma' }, { t: '=' },
          { t: 'N_0', d: 'A kezdeti magszám (t = 0-ban)' }, { t: '·' },
          { t: 'e^{−λt}', d: 'Exponenciális tényező; λ a bomlási állandó (egy mag egységnyi időre jutó bomlási valószínűsége)', unit: 'λ: 1/s' }, { t: '=' },
          { t: 'N_0' , d: 'A kezdeti magszám (t = 0-ban)' }, { t: '·' },
          { t: '2^{−t/T}', d: 'Ugyanez a felezési idővel kifejezve', unit: 'T: s', more: 'T = ln 2 / λ ≈ 0,693/λ' }],
        text: 'A `dN/dt = −λN` differenciálegyenlet megoldása. Az aktivitás `A = λN` (Bq) ugyanígy csökken.',
        example: 'A jód-131 felezési ideje 8 nap: 24 nap (3 felezési idő) múlva a kezdeti mennyiség 1/8-a, 80 nap múlva kb. 1/1000-e marad.'
      },
      {
        id: 'gravitacio-f', title: 'Newton-féle gravitációs törvény', en: "Newton's law of universal gravitation",
        parts: [{ t: 'F', d: 'A két test között ható vonzóerő nagysága', unit: 'N' }, { t: '=' },
          { t: 'γ', d: 'Gravitációs állandó', unit: 'N·m²/kg²', more: 'γ ≈ 6,674·10⁻¹¹ N·m²/kg² (gyakran G-vel jelölik).' }, { t: '·' },
          { t: 'm₁·m₂', d: 'A két test tömegének szorzata', unit: 'kg²' }, { t: '/' },
          { t: 'r²', d: 'A tömegközéppontok távolságának négyzete', unit: 'm²', more: 'Gömbszimmetrikus testekre pontosan érvényes, mintha a teljes tömeg a középpontban lenne.' }],
        text: 'Az erő a két tömegközéppontot összekötő egyenes mentén vonzó. A gravitációs helyzeti energia `E_p = −γ·m₁·m₂/r` (a végtelenben 0). A Föld felszínén `g = γ·M/R² ≈ 9,81 m/s²`.',
        example: 'Két 1 kg-os golyó 1 m távolságban: `F ≈ 6,7·10⁻¹¹ N` – ezért kellett Cavendish (1798) torziós ingája a kimutatásához.'
      },
      {
        id: 'lorentz-f', title: 'Idődilatáció (Lorentz-tényező)', en: 'time dilation, Lorentz factor',
        parts: [{ t: 'Δt', d: 'Két esemény között eltelt idő a megfigyelő rendszerében, amelyhez képest az óra v sebességgel mozog', unit: 's' }, { t: '=' },
          { t: 'γ', d: 'Lorentz-tényező: 1/√(1 − v²/c²) ≥ 1', more: 'v = 0,6c: γ = 1,25; v = 0,99c: γ ≈ 7,09.' }, { t: '·' },
          { t: 'Δt₀', d: 'Sajátidő: az órával együtt mozgó rendszerben mért idő (ez a legrövidebb)', unit: 's' }],
        text: 'Ugyanez a tényező adja a hosszkontrakciót, `L = L₀/γ` (csak a mozgás irányában), és a relativisztikus energiát, `E = γ·mc²`. Kis sebességnél γ ≈ 1 + v²/(2c²).',
        example: 'Müon (sajátidő-élettartama 2,2 µs) v = 0,998c-vel: γ ≈ 15,8, a földi megfigyelő szerint kb. 35 µs-ig él.'
      },
      {
        id: 'snellius-f', title: 'Snellius–Descartes-féle törési törvény', en: "Snell's law",
        parts: [{ t: 'n₁', d: 'Az első közeg törésmutatója: n = c/v', unit: '–' }, { t: '·' },
          { t: 'sin α₁', d: 'Beesési szög szinusza (a szöget a beesési merőlegestől mérjük!)' }, { t: '=' },
          { t: 'n₂', d: 'A második közeg törésmutatója', unit: '–' }, { t: '·' },
          { t: 'sin α₂', d: 'Törési szög szinusza' }],
        text: 'Optikailag sűrűbb közegbe (nagyobb n) lépve a fény a merőlegeshez törik. Sűrűbből ritkábba haladva a `sin α_h = n₂/n₁` határszögnél nagyobb beesési szögnél **teljes visszaverődés** lép fel.',
        example: 'Üveg (n = 1,5) – levegő határfelület: `sin α_h = 1/1,5` ⟹ α_h ≈ 41,8°.'
      },
      {
        id: 'stefan-boltzmann-f', title: 'Stefan–Boltzmann-törvény', en: 'Stefan–Boltzmann law',
        parts: [{ t: 'M', d: 'Kisugárzott teljesítmény egységnyi felületről', unit: 'W/m²' }, { t: '=' },
          { t: 'ε', d: 'Emissziós tényező: abszolút fekete testre 1, valós testekre 0 és 1 között', unit: '–' }, { t: '·' },
          { t: 'σ', d: 'Stefan–Boltzmann-állandó', unit: 'W/(m²·K⁴)', more: 'σ ≈ 5,670·10⁻⁸ W/(m²·K⁴)' }, { t: '·' },
          { t: 'T⁴', d: 'Az abszolút hőmérséklet negyedik hatványa', unit: 'K⁴' }],
        text: 'A negyedik hatvány miatt a hőmérséklet kétszerezése tizenhatszoros sugárzást jelent. A sugárzás maximumának helyét a Wien-féle eltolódási törvény adja: `λ_max·T ≈ 2,898·10⁻³ m·K`.',
        example: 'A Nap felszíne (T ≈ 5800 K): `M ≈ 5,67·10⁻⁸·5800⁴ ≈ 6,4·10⁷ W/m²`, azaz négyzetméterenként kb. 64 MW.'
      },
      {
        id: 'doboz-f', title: 'Részecske dobozban: energiaszintek', en: 'particle in a box energy levels',
        parts: [{ t: 'E_n', d: 'Az n-edik megengedett energiaszint', unit: 'J (gyakran eV)' }, { t: '=' },
          { t: 'n²', d: 'n = 1, 2, 3, … kvantumszám: hány félhullám fér a dobozba', more: 'n = 0 nem megengedett: akkor ψ ≡ 0 lenne.' }, { t: '·' },
          { t: 'h²', d: 'A Planck-állandó négyzete (h ≈ 6,626·10⁻³⁴ J·s)' }, { t: '/' },
          { t: '(8·m·L²)', d: 'm a részecske tömege, L a doboz szélessége', unit: 'kg·m²' }],
        text: 'Végtelen mély, egydimenziós potenciálgödörre érvényes. A legkisebb energia (n = 1) sem nulla: ez a **zérusponti energia**.',
        example: 'Elektron 1 nm-es dobozban: `E₁ = (6,626·10⁻³⁴)²/(8·9,11·10⁻³¹·10⁻¹⁸) ≈ 6,0·10⁻²⁰ J ≈ 0,38 eV`.'
      },
      {
        id: 'hidrogen-f', title: 'A hidrogénatom energiaszintjei', en: 'hydrogen energy levels',
        parts: [{ t: 'E_n', d: 'Az n-edik energiaszint (kötött állapot, ezért negatív)', unit: 'eV' }, { t: '=' },
          { t: '−13,6 eV', d: 'A Rydberg-energia: ennyi az alapállapotú hidrogén ionizációs energiája', more: 'Pontosabban 13,606 eV.' }, { t: '/' },
          { t: 'n²', d: 'Főkvantumszám négyzete, n = 1, 2, 3, …' }],
        text: 'Átmenetnél kibocsátott foton energiája `hf = E_m − E_n`, hullámhossza a Rydberg-formulából `1/λ = R·(1/n² − 1/m²)`, R ≈ 1,097·10⁷ 1/m.',
        example: 'A 3 → 2 átmenet: `ΔE = 13,6·(1/4 − 1/9) ≈ 1,89 eV`, `λ = hc/ΔE ≈ 656 nm` – a vörös H-alfa vonal.'
      }
    ],
    terms: [
      /* ----- Mechanika ----- */
      { id: 'impulzus', term: 'Impulzus (lendület)', en: 'momentum (linear momentum)', topic: 'mechanika',
        short: 'A test tömegének és sebességének szorzata: p = m·v. Vektormennyiség, mértékegysége kg·m/s.',
        text: 'Newton II. törvényének általános alakja: **az impulzus változási sebessége egyenlő a testre ható eredő erővel**, `F = dp/dt`. Állandó tömegnél ebből lesz a megszokott `F = m·a`, de változó tömegű rendszerre (rakéta) az impulzusos alak a helyes kiindulás.\n\n**Impulzusmegmaradás**: zárt rendszerben (a külső erők eredője nulla) a teljes impulzus állandó. Ütközéseknél akkor is érvényes, ha a mozgási energia egy része hővé és deformációvá alakul (rugalmatlan ütközés).\n\nAz erő időbeli integrálja az **erőlökés**: `Δp = ∫ F dt`. Ezért véd a légzsák és a gyűrődési zóna: ugyanakkora impulzusváltozás hosszabb idő alatt kisebb erővel jár.',
        formulas: ['newton2'],
        example: '1000 kg-os, 20 m/s-mal haladó autó beleütközik egy álló, 1500 kg-os autóba, és összeakadnak. Közös sebesség: `v = 1000·20 / 2500 = 8 m/s`. A mozgási energia 200 kJ-ról 80 kJ-ra csökken: 120 kJ alakul deformációs munkává és hővé.',
        pitfall: 'Az impulzus **vektor**: két szemben haladó, egyforma tömegű és sebességű testé együtt nulla. Ütközéskor az impulzus mindig megmarad, a mozgási energia csak rugalmas ütközésnél.',
        related: ['impulzusmomentum', 'munkatetel', 'konzervativ-ero', 'de-broglie', 'hatarozatlansag', 'lorentz-ero'],
        models: ['elektromos-auto'] },
      { id: 'impulzusmomentum', term: 'Impulzusmomentum (perdület)', en: 'angular momentum', topic: 'mechanika',
        short: 'Pontszerű test impulzusmomentuma egy pontra vonatkoztatva L = r × p; rögzített tengely körül forgó merev testre L = I·ω.',
        text: 'A forgómozgás „lendülete”. Newton II. törvényének forgási megfelelője: **az impulzusmomentum változási sebessége a külső erők forgatónyomatéka**, `dL/dt = M`, ahol `M = r × F`.\n\n**Perdületmegmaradás**: ha a külső forgatónyomaték nulla, L állandó. Ezért pörög gyorsabban a műkorcsolyázó, ha behúzza a karját (I csökken, ω nő), és ezért állandó a bolygók területi sebessége (Kepler II. törvénye – a centrális gravitációs erőnek nincs nyomatéka a Napra).\n\nA kvantummechanikában az impulzusmomentum **kvantált**: egy kitüntetett irányra vett vetülete ħ egész (spinnél fél-egész) számú többszöröse.',
        example: 'Korcsolyázó: kitárt karral I₁ = 4 kg·m², ω₁ = 2 1/s; behúzott karral I₂ = 1,6 kg·m². Ekkor `ω₂ = I₁ω₁/I₂ = 5 1/s`. A forgási energia (½Iω²) 8 J-ról 20 J-ra nő – a különbözetet a korcsolyázó izommunkája fedezi.',
        pitfall: 'Az impulzusmomentum mindig egy **vonatkoztatási pontra** (tengelyre) értendő: ugyanannak a testnek más pontra más az L-je. Egyenes vonalú egyenletes mozgást végző testnek is van impulzusmomentuma egy olyan pontra, amely nincs a pályáján.',
        related: ['impulzus', 'tehetetlensegi-nyomatek', 'munkatetel'] },
      { id: 'tehetetlensegi-nyomatek', term: 'Tehetetlenségi nyomaték', en: 'moment of inertia', topic: 'mechanika',
        short: 'A merev test forgással szembeni tehetetlenségének mértéke egy adott tengelyre: I = Σ mᵢrᵢ² (folytonos testre ∫ r² dm), mértékegysége kg·m².',
        text: 'A forgómozgásban a tömeg szerepét veszi át: `M = I·β` (β a szöggyorsulás), `L = I·ω`, a forgási energia `½·I·ω²`. Nemcsak a tömegtől, hanem annak **eloszlásától** is függ: a tengelytől távoli tömeg négyzetesen számít.\n\nNevezetes értékek (m tömeg, R sugár, l hossz):\n\n- tömör henger a szimmetriatengelye körül: ½·mR²\n- vékony falú cső vagy karika: mR²\n- tömör gömb: (2/5)·mR²\n- vékony rúd a középpontján át: (1/12)·ml²\n\n**Steiner-tétel**: ha a tömegközépponton átmenő tengelyre I₀, akkor egy vele párhuzamos, d távolságú tengelyre `I = I₀ + m·d²`.',
        example: 'Tömör henger és karika gurul le ugyanarról a lejtőről. A henger ér le előbb: nála az energia kisebb hányada megy forgásba – a lejtő alján `v² = 4gh/3`, a karikánál csak `v² = gh`, tömegtől és sugártól függetlenül.',
        pitfall: 'A tehetetlenségi nyomaték nem a test sajátja, hanem a test **és a tengely** együttesé: ugyanaz a rúd a végpontja körül négyszer nehezebben forgatható ((1/3)·ml²), mint a közepe körül.',
        related: ['impulzusmomentum', 'munkatetel', 'impulzus'] },
      { id: 'munkatetel', term: 'Munkatétel', en: 'work–energy theorem', topic: 'mechanika',
        short: 'A testre ható összes erő munkája egyenlő a test mozgási energiájának megváltozásával: W = ΔEₖ = ½mv₂² − ½mv₁².',
        text: 'A **munka** az erő pálya menti integrálja: `W = ∫ F·ds`; állandó erőnél és egyenes pályánál `W = F·s·cos α`. Mértékegysége joule (J = N·m). Csak az elmozdulás irányába eső erőkomponens végez munkát – a körpályán tartó centripetális erő munkája nulla.\n\nA munkatétel Newton II. törvényéből következik, és gyakran egyszerűbb, mint a mozgásegyenlet megoldása, mert csak a kezdő- és a végállapot számít. Ha minden erő **konzervatív**, a munkatételből a mechanikai energia megmaradása lesz.\n\nA **teljesítmény** a munkavégzés sebessége: `P = dW/dt = F·v` (watt).',
        example: '1200 kg-os autó 25 m/s-ról megáll. A fékek munkája: `W = 0 − ½·1200·25² = −375 kJ`. Ha a fékút 50 m, az átlagos fékezőerő 7,5 kN.',
        pitfall: 'A munkatételbe az **összes** erő munkája kell, a súrlódásé és a normálerőé is (az utóbbié gyakran nulla). Ne keverjük a munkát a teljesítménnyel: W joule, P watt.',
        related: ['impulzus', 'konzervativ-ero', 'belso-energia', 'tehetetlensegi-nyomatek', 'tomeg-energia'],
        models: ['elektromos-auto'] },
      { id: 'konzervativ-ero', term: 'Konzervatív erő és potenciális energia', en: 'conservative force, potential energy', topic: 'mechanika',
        short: 'Konzervatív az az erő, amelynek munkája két pont között nem függ az úttól (zárt görbén nulla); ilyenkor létezik U potenciális energia, amelyre F = −grad U.',
        text: 'Konzervatív erők: gravitáció, rugóerő, elektrosztatikus erő. Nem konzervatív (disszipatív) erők: súrlódás, közegellenállás – ezek munkája függ az úttól, és a mechanikai energiát hővé alakítják.\n\nA potenciális energia csak egy állandó erejéig meghatározott (a nullszint szabadon választható). Egy dimenzióban `F = −dU/dx`: az erő a potenciális energia **csökkenésének** irányába mutat, ezért a test a „potenciálvölgy” alja felé gyorsul. A völgy alja a **stabil egyensúlyi helyzet**.\n\nHa csak konzervatív erők végeznek munkát, a **mechanikai energia megmarad**: `Eₖ + U = állandó`.',
        example: 'Rugóban tárolt energia: `U = ½kx²`; k = 200 N/m, x = 0,1 m esetén U = 1 J.\n\nNehézségi erőtér: U = mgh. 5 m magasról leejtett test `√(2gh) ≈ 9,9 m/s` sebességgel ér földet – a tömegétől függetlenül.',
        pitfall: 'A potenciális energia mindig egy **rendszerhez** tartozik (test + Föld, két töltés), nem egyetlen testhez. A potenciális energia (J) és az elektromos potenciál (J/C = V) két különböző fogalom.',
        related: ['munkatetel', 'potencial', 'harmonikus-rezges', 'elektromos-terero', 'impulzus'] },
      { id: 'harmonikus-rezges', term: 'Harmonikus rezgés', en: 'simple harmonic motion', topic: 'mechanika',
        short: 'Rezgés, amelynél a kitérés az idő szinuszos függvénye: x(t) = A·cos(ωt + φ). Akkor jön létre, ha a visszatérítő erő arányos a kitéréssel (F = −kx).',
        visual: oscSvg, caption: 'Rugóra függesztett test kitérése (kék) és sebessége (narancs): a sebesség negyed periódussal „előbbre jár”, és ott a legnagyobb, ahol a kitérés nulla.',
        text: 'A mozgásegyenlet `m·ẍ = −k·x`, azaz `ẍ + ω²x = 0`, ahol `ω = √(k/m)` a **körfrekvencia**. A periódusidő `T = 2π/ω = 2π·√(m/k)` – **nem függ az amplitúdótól**. A sebesség `v = −Aω·sin(ωt + φ)`, a gyorsulás `a = −ω²x`.\n\nAz energia folyamatosan alakul át mozgási és rugalmas energia között, összege `½kA²` állandó.\n\nSzinte minden stabil egyensúly körüli **kis** rezgés harmonikus, mert a potenciális energia a minimum körül parabolával közelíthető (Taylor-közelítés). Így rezeg a kis kitérésű matematikai inga is: `T = 2π·√(l/g)`.',
        example: 'm = 0,5 kg tömegű test k = 200 N/m-es rugón: `ω = √400 = 20 1/s`, `T = 2π/20 ≈ 0,314 s`, f ≈ 3,18 Hz. A = 5 cm amplitúdónál a legnagyobb sebesség `Aω = 1 m/s`.',
        pitfall: 'A körfrekvencia (ω, rad/s) és a frekvencia (f, Hz) nem ugyanaz: ω = 2πf. A matematikai inga csak **kis** kitérésnél harmonikus (sin φ ≈ φ); nagy kitérésnél a periódusidő nő.',
        related: ['konzervativ-ero', 'hullamegyenlet', 'munkatetel', 'impulzus'] },

      /* ----- Termodinamika ----- */
      { id: 'idealis-gaz', term: 'Ideális gáz', en: 'ideal gas', topic: 'termo',
        short: 'Modellgáz, amelynek részecskéi pontszerűek és csak ütközéskor hatnak kölcsön; állapotegyenlete pV = nRT.',
        text: 'Az állapotegyenlet egyesíti a Boyle–Mariotte- (T állandó: pV állandó), a Gay-Lussac- és a Charles-törvényt. R = 8,314 J/(mol·K) az egyetemes gázállandó. Molekulaszámmal: `pV = NkT`, ahol k = R/Nₐ = 1,381·10⁻²³ J/K a **Boltzmann-állandó**.\n\nA **kinetikus gázelmélet** szerint a hőmérséklet a részecskék átlagos mozgási energiájának mértéke: `⟨½mv²⟩ = (3/2)·kT`. A nyomás a falnak ütköző molekulák impulzusátadásából adódik.\n\nValódi gázok alacsony nyomáson és a cseppfolyósodástól távoli hőmérsékleten jól közelítik az ideális gázt; egyébként a van der Waals-egyenlet a pontosabb.',
        formulas: ['idealis-gaz-f'],
        example: '1 mol gáz 0 °C-on (273,15 K) és 101 325 Pa nyomáson: `V = nRT/p ≈ 0,0224 m³ = 22,4 dm³` – ez a moláris normáltérfogat.',
        pitfall: 'A hőmérsékletet **kelvinben** kell beírni! 20 °C-ról 40 °C-ra melegítve (állandó térfogaton) a nyomás nem duplázódik meg, csak `313/293 ≈ 1,07`-szeresére nő.',
        related: ['belso-energia', 'elso-fotetel', 'carnot-korfolyamat', 'entropia'],
        models: ['benzinmotor'] },
      { id: 'belso-energia', term: 'Belső energia és hőkapacitás', en: 'internal energy, heat capacity', topic: 'termo',
        short: 'A belső energia (U) a rendszer részecskéinek összes mozgási és kölcsönhatási energiája; a hőkapacitás (C) megmutatja, mennyi hő kell 1 K hőmérséklet-emelkedéshez.',
        text: 'A belső energia **állapotfüggvény**: csak a rendszer pillanatnyi állapotától függ, nem attól, hogyan jutott oda. Ideális gáznál csak a hőmérséklettől függ: `U = (f/2)·nRT`, ahol f a szabadsági fokok száma (egyatomos gáz: 3, kétatomos: 5 szobahőmérsékleten).\n\n**Hőkapacitás**: `C = Q/ΔT` (J/K). Egységnyi tömegre a **fajhő** c (J/(kg·K)), egy mólra a **moláris hőkapacitás**. Gázoknál számít a folyamat: állandó térfogaton `Cᵥ = (f/2)·R`, állandó nyomáson nagyobb, `Cₚ = Cᵥ + R` (Mayer-egyenlet), mert a tágulási munkát is fedezni kell. Arányuk az **adiabatikus kitevő**, `γ = Cₚ/Cᵥ` (levegőre ≈ 1,4).',
        example: 'A víz fajhője 4,18 kJ/(kg·K). 1 liter víz 20 °C-ról 100 °C-ra melegítéséhez `Q = 1·4180·80 ≈ 334 kJ` kell – egy 2 kW-os vízforralónak ez veszteség nélkül kb. 167 s.',
        pitfall: 'A hő és a belső energia nem ugyanaz: a hő **energiaátadás** (folyamathoz tartozik), a belső energia **állapothoz** tartozik. Nem mondhatjuk, hogy „a test hőt tartalmaz”.',
        related: ['elso-fotetel', 'idealis-gaz', 'entropia', 'munkatetel'],
        models: ['benzinmotor'] },
      { id: 'elso-fotetel', term: 'A termodinamika I. főtétele', en: 'first law of thermodynamics', topic: 'termo',
        short: 'Energiamegmaradás hőtani folyamatokra: a belső energia megváltozása a felvett hő és a rendszeren végzett munka összege, ΔU = Q + W.',
        text: 'Előjelszabály (hazai konvenció): Q > 0, ha a rendszer hőt **vesz fel**; W > 0, ha a környezet végez munkát a rendszeren (összenyomás). Táguláskor a gáz végez munkát, ilyenkor `W = −∫ p dV` negatív. (Sok angol nyelvű könyv a gáz által végzett munkát veszi pozitívnak: `ΔU = Q − W`. Mindkettő helyes, csak a W jelentése más.)\n\nNevezetes folyamatok ideális gázzal:\n\n- **izochor** (V állandó): W = 0, ΔU = Q;\n- **izobár** (p állandó): W = −p·ΔV;\n- **izoterm** (T állandó): ΔU = 0, a felvett hő `Q = nRT·ln(V₂/V₁)`;\n- **adiabatikus** (Q = 0): ΔU = W, és `p·Vᵞ = állandó`.\n\nKövetkezmény: nem létezik **elsőfajú perpetuum mobile**, azaz energiabefektetés nélkül munkát végző gép.',
        example: '2 mol ideális gáz izoterm módon, 300 K-en kétszeres térfogatra tágul. A gáz által végzett munka `nRT·ln 2 = 2·8,314·300·0,693 ≈ 3,46 kJ`, és pontosan ennyi hőt vesz fel (ΔU = 0).',
        pitfall: 'Az előjelkonvenció a leggyakoribb hibaforrás: mindig írjuk ki, hogy W a gázon vagy a gáz által végzett munka. Adiabatikus tágulásnál a gáz **lehűl**, pedig nem adott le hőt – a munkát a belső energiájából fedezte.',
        related: ['belso-energia', 'idealis-gaz', 'entropia', 'carnot-korfolyamat', 'munkatetel'],
        models: ['benzinmotor'] },
      { id: 'entropia', term: 'Entrópia és a II. főtétel', en: 'entropy, second law of thermodynamics', topic: 'termo',
        short: 'Az entrópia (S) állapotfüggvény, megváltozása reverzibilis folyamatban dS = δQ/T. A II. főtétel szerint elszigetelt rendszer entrópiája nem csökkenhet.',
        text: 'A **II. főtétel** egyenértékű megfogalmazásai:\n\n- **Clausius**: a hő magától nem megy át hidegebb testről melegebbre.\n- **Kelvin–Planck**: nincs olyan periodikusan működő gép, amely egyetlen hőtartályból felvett hőt teljes egészében munkává alakít (nincs **másodfajú perpetuum mobile**).\n- **Entrópiaelv**: elszigetelt rendszerben `ΔS ≥ 0`; egyenlőség csak reverzibilis folyamatnál.\n\n**Statisztikus értelmezés** (Boltzmann): `S = k·ln Ω`, ahol Ω az adott makroállapotot megvalósító mikroállapotok száma. A rendszer azért halad a nagyobb entrópia felé, mert az elsöprően valószínűbb: összekeveredett gázok azért nem válnak szét maguktól, mert ennek esélye elképzelhetetlenül kicsi.\n\nAz entrópia jelöli ki a makroszkopikus folyamatok **időirányát**.',
        formulas: ['entropia-f'],
        example: '1 kg 0 °C-os jég megolvad (olvadáshő 334 kJ/kg): a jég entrópiája `ΔS = 334 000/273,15 ≈ +1223 J/K`-nel nő. Ha a hőt a 20 °C-os szoba adja, annak entrópiája `334 000/293,15 ≈ 1139 J/K`-nel csökken. Összesen ≈ +83 J/K > 0, ahogy a II. főtétel előírja.',
        pitfall: 'Egy rendszer entrópiája **csökkenhet** (hűtőszekrény belseje, élőlény), ha a környezeté legalább ennyivel nő: a ΔS ≥ 0 csak **elszigetelt** rendszerre igaz. A δQ/T képlet csak reverzibilis útra érvényes.',
        related: ['elso-fotetel', 'carnot-korfolyamat', 'belso-energia', 'idealis-gaz'] },
      { id: 'carnot-korfolyamat', term: 'Carnot-körfolyamat és Carnot-hatásfok', en: 'Carnot cycle, Carnot efficiency', topic: 'termo',
        short: 'Két izoterm és két adiabatikus szakaszból álló reverzibilis körfolyamat. Hatásfoka η = 1 − T₂/T₁ (T₁ a meleg, T₂ a hideg tartály abszolút hőmérséklete): ez az adott hőmérsékletek között működő hőerőgépek elméleti felső határa.',
        visual: carSvg, caption: 'A Carnot-ciklus p–V diagramon. A körbezárt (lila) terület a gáz által egy ciklus alatt végzett hasznos munka.',
        text: 'A négy ütem (ábra):\n\n1. **1→2 izoterm tágulás** T₁-en: a gáz Q₁ hőt vesz fel a meleg tartályból.\n2. **2→3 adiabatikus tágulás**: a gáz T₂-re hűl.\n3. **3→4 izoterm összenyomás** T₂-n: a gáz Q₂ hőt ad le a hideg tartálynak.\n4. **4→1 adiabatikus összenyomás**: vissza T₁-re.\n\nA hasznos munka `W = Q₁ − Q₂`. Mivel reverzibilis ciklusban az entrópia összváltozása nulla, `Q₁/T₁ = Q₂/T₂`, ebből `η = W/Q₁ = 1 − T₂/T₁`.\n\n**Carnot-tétel**: ugyanazon két hőmérséklet között egyetlen hőerőgép sem lehet jobb hatásfokú a reverzibilisnél. A valódi motorok (Otto, Diesel, gőzturbina) ennél kevesebbet tudnak.',
        formulas: ['carnot-f'],
        example: 'Gőzerőmű: T₁ = 823 K (550 °C), T₂ = 303 K (30 °C): `η(max) = 1 − 303/823 ≈ 63%`; a valóságban kb. 40–45% érhető el.\n\nFordítva járatva hőszivattyú: a fűtési tényező legfeljebb `T₁/(T₁ − T₂)`; 0 °C-os külső levegő és 35 °C-os fűtővíz esetén `308/35 ≈ 8,8` (a valóságban 3–5).',
        pitfall: 'A hőmérsékletet **kelvinben** kell beírni: 550 °C és 30 °C között a határ nem `1 − 30/550 ≈ 95%`! A 100%-os hatásfokhoz T₂ = 0 K kellene, ami elérhetetlen (III. főtétel).',
        related: ['entropia', 'elso-fotetel', 'idealis-gaz', 'belso-energia'],
        models: ['benzinmotor'] },

      /* ----- Elektromágnesség ----- */
      { id: 'elektromos-terero', term: 'Elektromos térerősség', en: 'electric field strength', topic: 'em',
        short: 'Az elektromos mezőt jellemző vektor: az egységnyi pozitív próbatöltésre ható erő, E = F/q. Mértékegysége N/C = V/m.',
        visual: fieldSvg, caption: 'Elektromos dipólus (+q és −q) erővonalai, numerikusan kiszámolva: a pozitív töltésen kezdődnek, a negatívon végződnek.',
        text: 'A mező közvetíti a töltések közti kölcsönhatást. Pontszerű Q töltés tere `E = k·Q/r² = Q/(4πε₀r²)`, sugárirányú; több töltés terei vektoriálisan összeadódnak (**szuperpozíció**). ε₀ = 8,854·10⁻¹² F/m a vákuum permittivitása.\n\nA mezőt **erővonalakkal** szemléltetjük: érintőjük a térerősség irányát mutatja, sűrűségük a nagyságát. Pozitív töltésen kezdődnek, negatívon végződnek, és sosem metszik egymást.\n\nVezető belsejében sztatikus esetben E = 0, a töltések a felületen ülnek – ezen alapul a **Faraday-kalitka** árnyékoló hatása.',
        example: 'A hidrogénatomban a proton tere az elektron helyén (r ≈ 5,3·10⁻¹¹ m): `E = 8,99·10⁹ · 1,6·10⁻¹⁹ / (5,3·10⁻¹¹)² ≈ 5,1·10¹¹ V/m`. Összehasonlításul: a száraz levegő kb. 3·10⁶ V/m-nél üt át.',
        pitfall: 'Az erővonal **nem** a próbatöltés pályája: a töltés a térerősség irányába gyorsul, de a sebessége más irányú is lehet. Negatív töltésre az erő a térerősséggel ellentétes irányú.',
        related: ['potencial', 'gauss-torveny', 'lorentz-ero', 'maxwell-egyenletek', 'konzervativ-ero'],
        models: ['atom'] },
      { id: 'potencial', term: 'Elektromos potenciál és feszültség', en: 'electric potential, voltage', topic: 'em',
        short: 'A potenciál (φ) az egységnyi pozitív töltésre jutó potenciális energia egy pontban; két pont potenciálkülönbsége a feszültség, U = φ(A) − φ(B). Mértékegysége volt (V = J/C).',
        text: 'Mivel az elektrosztatikus erő konzervatív, minden ponthoz rendelhető egy skalár potenciál, amelyből a térerősség meredekséggel (gradienssel) kapható: `E = −grad φ`, egy dimenzióban `E = −dφ/dx`. A térerősség a potenciál **csökkenésének** irányába mutat.\n\nPontszerű töltés potenciálja `φ = kQ/r` (a végtelen távoli pont a nullszint). Az azonos potenciálú pontok **ekvipotenciális felületeket** alkotnak, amelyek mindenütt merőlegesek az erővonalakra.\n\nQ töltés átvitele U feszültségen `W = Q·U` munkát jelent. Ezért mérik a részecskék energiáját **elektronvoltban**: `1 eV = 1,602·10⁻¹⁹ J`.',
        example: 'Homogén mezőben (síkkondenzátor) `U = E·d`: 1 cm-es lemeztávolságnál 230 V esetén E = 23 kV/m. Egy 230 V-on felgyorsított elektron 230 eV ≈ 3,7·10⁻¹⁷ J mozgási energiát kap.',
        pitfall: 'A potenciál értéke a nullszint megválasztásától függ, a feszültség (különbség) nem. A potenciál skalár, a térerősség vektor: ahol a potenciál nulla, a térerősség nem feltétlenül az (pl. két ellentétes töltés felezőpontjában).',
        related: ['elektromos-terero', 'konzervativ-ero', 'faraday-indukcio', 'fotoeffektus'] },
      { id: 'gauss-torveny', term: 'Gauss-törvény', en: "Gauss's law", topic: 'em',
        short: 'Egy zárt felületen átmenő elektromos fluxus arányos a felület által közrezárt össztöltéssel: ∮ E·dA = Q/ε₀.',
        text: 'Az **elektromos fluxus** a felületet „átdöfő” erővonalak számával arányos: `Φₑ = ∫ E·dA`. A törvény azt mondja: a zárt felületből annyi erővonal lép ki, amennyi töltés van bent. A kívül lévő töltések erővonalai be- és ki is lépnek, nettó hozzájárulásuk nulla.\n\nSzimmetrikus töltéseloszlásnál ezzel könnyű kiszámolni a teret:\n\n- pontszerű töltés vagy gömb kívül: `E = Q/(4πε₀r²)` (ebből jön a Coulomb-törvény);\n- végtelen hosszú egyenes vonaltöltés (λ C/m): `E = λ/(2πε₀r)`;\n- végtelen sík (σ C/m²): `E = σ/(2ε₀)`, a távolságtól független.\n\nA Gauss-törvény az egyik **Maxwell-egyenlet**. Mágneses megfelelője szerint zárt felületen a mágneses fluxus mindig nulla: nincs mágneses monopólus.',
        example: 'Töltött fémgömb belsejében felvett gömbfelületen belül nincs töltés, ezért ott E = 0. A gömbön kívül a tér olyan, mintha az összes töltés a középpontban lenne.',
        pitfall: 'A törvény mindig igaz, de a térerősség csak **szimmetrikus** esetekben számolható vele egyszerűen. Ha a teljes fluxus nulla, attól a felületen még nem kell mindenhol E = 0-nak lennie.',
        related: ['elektromos-terero', 'maxwell-egyenletek', 'potencial'] },
      { id: 'lorentz-ero', term: 'Lorentz-erő', en: 'Lorentz force', topic: 'em',
        short: 'Elektromágneses mezőben mozgó q töltésre ható erő: F = q·(E + v × B).',
        text: 'A mágneses rész, `q·v × B`, merőleges a sebességre és a mágneses indukcióra is, ezért **nem végez munkát**: csak a mozgás irányát változtatja, a sebesség nagyságát nem. Homogén B-ben a töltés körpályán (általános esetben csavarvonalon) mozog: sugara `r = mv/(|q|B)`, körfrekvenciája `ω = |q|B/m` (ciklotronfrekvencia), a sebességtől független.\n\nÁramjárta vezetőre: `F = I·l × B` – ezen alapul az **elektromotor**. További alkalmazások: tömegspektrométer, részecskegyorsítók, Hall-szonda, a sarki fény (a Föld mágneses tere a napszél töltött részecskéit a pólusok felé tereli).',
        example: 'Elektron 10⁶ m/s sebességgel, merőlegesen lép egy B = 1 mT-s mezőbe: `r = 9,11·10⁻³¹ · 10⁶ / (1,6·10⁻¹⁹ · 10⁻³) ≈ 5,7 mm`.',
        pitfall: 'A jobbkéz-szabály pozitív töltésre érvényes; elektronra az erő ellentétes irányú. Ha v párhuzamos B-vel, a mágneses erő nulla.',
        related: ['elektromos-terero', 'faraday-indukcio', 'maxwell-egyenletek', 'impulzus'],
        models: ['elektromos-auto'] },
      { id: 'faraday-indukcio', term: 'Faraday-féle indukciós törvény', en: "Faraday's law of induction", topic: 'em',
        short: 'Zárt vezetőkörben indukált feszültség egyenlő a körön átmenő mágneses fluxus változási sebességének −1-szeresével: Uᵢ = −dΦ/dt.',
        text: 'A **mágneses fluxus** `Φ = B·A·cos α` (weber, Wb = V·s). Változhat a mágneses indukció, a felület vagy a kettő szöge – mindegyik feszültséget indukál. N menetes tekercsre `Uᵢ = −N·dΦ/dt`.\n\nA negatív előjel a **Lenz-törvény**: az indukált áram iránya olyan, hogy mágneses tere akadályozza az őt létrehozó változást. Ez az energiamegmaradás következménye – különben „ingyen” gyorsulna a mágnes.\n\nAlkalmazások: generátor (forgó tekercs, `Uᵢ = NBAω·sin ωt`), transzformátor, indukciós főzőlap, örvényáramú fék, a villanyautó **rekuperatív fékezése**.',
        formulas: ['faraday-f'],
        example: '200 menetes, 10 cm² keresztmetszetű tekercsben a B 0,05 s alatt 0-ról 0,5 T-ra nő: `|Uᵢ| = 200 · 0,5 · 10⁻³ / 0,05 = 2 V`.',
        pitfall: 'Nem a fluxus nagysága, hanem a **változása** indukál feszültséget: egy erős, de álló mágnes mellett nyugvó tekercsben nincs indukció.',
        related: ['lorentz-ero', 'maxwell-egyenletek', 'potencial'],
        models: ['elektromos-auto'] },
      { id: 'maxwell-egyenletek', term: 'Maxwell-egyenletek', en: "Maxwell's equations", topic: 'em',
        short: 'Az elektromágnesség négy alapegyenlete: leírják, hogyan keltik a töltések és áramok az elektromos és mágneses mezőt, és hogyan keltik egymást a változó mezők.',
        text: 'Szavakban (integrális alakban):\n\n1. **Gauss-törvény (elektromos)**: zárt felület elektromos fluxusa a bezárt töltés osztva ε₀-lal – a töltések az erővonalak forrásai.\n2. **Gauss-törvény (mágneses)**: zárt felület mágneses fluxusa nulla – nincsenek mágneses töltések, az indukcióvonalak zártak.\n3. **Faraday-törvény**: a változó mágneses mező örvényes elektromos mezőt kelt.\n4. **Ampère–Maxwell-törvény**: mágneses mezőt kelt az elektromos áram és a **változó elektromos mező** is (eltolási áram).\n\nMaxwell zseniális kiegészítése az eltolási áram volt: így a változó E és B mező egymást fenntartva, töltések nélkül is terjedhet. Ez az **elektromágneses hullám**, sebessége `c = 1/√(ε₀μ₀) ≈ 3·10⁸ m/s` – a fény is ilyen.',
        example: '`1/√(8,854·10⁻¹² · 4π·10⁻⁷) ≈ 2,998·10⁸ m/s`. Maxwell ebből a számolásból jött rá 1864-ben, hogy a fény elektromágneses hullám.',
        pitfall: 'Az egyenletek csak együtt adják a teljes képet. Sztatikus esetben (nincs időbeli változás) az elektromos és a mágneses jelenségek szétválnak, általános esetben viszont nem.',
        related: ['gauss-torveny', 'faraday-indukcio', 'lorentz-ero', 'elektromos-terero', 'hullamegyenlet', 'fotoeffektus'] },

      /* ----- Hullámok és optika ----- */
      { id: 'hullamegyenlet', term: 'Hullámegyenlet', en: 'wave equation', topic: 'hullam',
        short: 'A hullámterjedés alapegyenlete: ∂²u/∂t² = c²·∂²u/∂x². Megoldásai a c sebességgel alakváltozás nélkül haladó u(x, t) = f(x − ct) + g(x + ct) hullámok.',
        text: 'A **harmonikus (szinuszos) hullám**: `u(x, t) = A·sin(kx − ωt)`, ahol `k = 2π/λ` a hullámszám, ω = 2πf a körfrekvencia. A terjedési (fázis)sebesség: `c = ω/k = λ·f`.\n\nA sebességet a közeg határozza meg: feszített húron `c = √(F/μ)` (F feszítőerő, μ hosszegységre eső tömeg), a hang levegőben ≈ 343 m/s (20 °C), a fény vákuumban ≈ 3·10⁸ m/s.\n\nAz egyenlet **lineáris**, ezért megoldások összege is megoldás – ez a **szuperpozíció elve**, amelyen az interferencia alapul. Két szemben haladó, egyforma hullám összege **állóhullám** (húros hangszerek, rezonátorok).',
        example: 'A 440 Hz-es „a” hang hullámhossza levegőben `λ = c/f = 343/440 ≈ 0,78 m`. Ugyanez a frekvencia vízben (c ≈ 1480 m/s) 3,4 m-es hullámhosszú.',
        pitfall: 'Hullámterjedéskor a közeg részecskéi nem haladnak a hullámmal, csak egyensúlyi helyzetük körül rezegnek: energia és információ terjed, anyag nem. Közegváltáskor a **frekvencia marad**, a hullámhossz és a sebesség változik.',
        related: ['harmonikus-rezges', 'interferencia', 'doppler', 'maxwell-egyenletek', 'hullamfuggveny'] },
      { id: 'interferencia', term: 'Interferencia és elhajlás (diffrakció)', en: 'interference and diffraction', topic: 'hullam',
        short: 'Találkozó hullámok kitérései összeadódnak: azonos fázisban erősítik (konstruktív), ellentétes fázisban gyengítik vagy kioltják (destruktív) egymást. Az elhajlás a hullámok akadály mögé hatolása, amely sok elemi hullám interferenciájából adódik.',
        visual: slitSvg, caption: 'Young-féle kétréses kísérlet: a két résből induló hullámok (kék és piros) interferenciája csíkokat ad az ernyőn; a csíkok fényességét az egyes rések elhajlása (szaggatott burkoló) modulálja.',
        text: 'Tartós interferenciakép csak **koherens** (állandó fáziskülönbségű) hullámoknál jön létre. Az eredmény az **útkülönbségen** múlik: erősítés `Δs = k·λ`, kioltás `Δs = (k + ½)·λ` esetén (k egész szám).\n\n**Kétréses kísérlet** (Young, 1801): d réstávolságnál a fényes csíkok irányai `d·sin θ = k·λ`; L távolságú ernyőn a csíktávolság (kis szögeknél) `Δy = λL/d`. Egyenként érkező fotonokkal vagy elektronokkal is kialakul – a kvantummechanika egyik alapkísérlete.\n\n**Elhajlás** (Huygens–Fresnel-elv: a hullámfront minden pontja elemi hullámok forrása):\n\n- **egy rés** (szélesség a): sötét irányok `a·sin θ = k·λ` (k ≠ 0);\n- **optikai rács** (rácsállandó d): éles főmaximumok `d·sin θ = k·λ` – ezzel mérhető a hullámhossz (spektroszkópia);\n- **felbontóképesség**: D átmérőjű kör alakú nyílás (lencse) legkisebb feloldható szöge `θ ≈ 1,22·λ/D`.\n\nAz elhajlás akkor számottevő, ha az akadály mérete összemérhető a hullámhosszal: a hangot halljuk a sarok mögül (λ ~ 1 m), a fényt nem látjuk (λ ~ 500 nm).',
        example: 'Vörös lézer (λ = 650 nm), d = 0,25 mm, ernyő L = 2 m-re: `Δy = 650·10⁻⁹ · 2 / 0,25·10⁻³ = 5,2 mm`.\n\n600 vonal/mm-es rács (d = 1,67 µm) és nátriumfény (589 nm): `sin θ₁ ≈ 0,353`, θ₁ ≈ 20,7°.',
        pitfall: 'Egy résnél az `a·sin θ = kλ` a **sötét** helyeket adja, két résnél és rácsnál a `d·sin θ = kλ` a **világosakat** – könnyű összekeverni. Kioltásnál az energia nem vész el, csak átrendeződik a világos csíkokba.',
        related: ['hullamegyenlet', 'de-broglie', 'hullamfuggveny', 'doppler'] },
      { id: 'doppler', term: 'Doppler-effektus', en: 'Doppler effect', topic: 'hullam',
        short: 'Ha a hullámforrás és a megfigyelő egymáshoz képest mozog, a megfigyelt frekvencia eltér a kibocsátottól: közeledéskor nagyobb, távolodáskor kisebb.',
        visual: dSvg, caption: 'A mozgó forrás által korábban kibocsátott hullámfrontok előtte összetorlódnak, mögötte széthúzódnak.',
        text: 'Hangra, a közeghez képest u sebességű megfigyelő és v sebességű forrás esetén (a közeledés iránya pozitív):\n\n`f′ = f · (c + u)/(c − v)`, ahol c a hangsebesség.\n\nMozgó forrásnál a hullámfrontok előtte összetorlódnak (rövidebb hullámhossz), mögötte széthúzódnak (ábra). Ha a forrás gyorsabb a hangnál, a frontok kúpba sűrűsödnek: ez a **hangrobbanás** (Mach-kúp).\n\nFénynél nincs közeg, csak a relatív sebesség számít; kis sebességnél `Δf/f ≈ v/c`. Alkalmazások: traffipax és időjárási radar, Doppler-ultrahang (véráramlás mérése), a távoli galaxisok **vöröseltolódása** – a táguló Univerzum bizonyítéka.',
        example: '700 Hz-es szirénájú mentőautó 25 m/s-mal közeledik (c = 343 m/s): `f′ = 700·343/(343 − 25) ≈ 755 Hz`; elhaladása után `f′ = 700·343/(343 + 25) ≈ 652 Hz`.',
        pitfall: 'Hangnál a forrás és a megfigyelő mozgása nem szimmetrikus: ugyanakkora sebességnél a mozgó forrás nagyobb eltolódást okoz. A hang közeledéskor **állandóan** magasabb, nem „egyre magasabb” – a váltás az elhaladás pillanatában történik.',
        related: ['hullamegyenlet', 'interferencia'] },

      /* ----- Modern fizika ----- */
      { id: 'fotoeffektus', term: 'Foton és fényelektromos jelenség', en: 'photon, photoelectric effect', topic: 'modern',
        short: 'A fény E = h·f energiájú adagokban (fotonokban) nyelődik el. Fémre eső fény akkor lök ki elektronokat, ha a fotonenergia nagyobb a kilépési munkánál.',
        visual: phSvg, caption: 'A kilépő elektronok legnagyobb mozgási energiája a frekvenciával lineárisan nő; a meredekség minden fémre a Planck-állandó, a tengelymetszet a fémre jellemző kilépési munka.',
        text: 'Kísérleti tények, amelyeket a klasszikus hullámkép nem tud megmagyarázni:\n\n- a kilépő elektronok **legnagyobb mozgási energiája a frekvenciától** függ, nem az intenzitástól;\n- van **határfrekvencia** (f₀), ami alatt semmilyen erős fény sem lök ki elektront;\n- a kilépés **késedelem nélkül** megtörténik.\n\n**Einstein** magyarázata (1905, Nobel-díj 1921): egy foton egyetlen elektronnak adja át teljes energiáját, így `h·f = W + Eₖ,max`, ahol W a kilépési munka. Az intenzitás a fotonok **számát** növeli – vagyis az áramerősséget –, de egy-egy foton energiáját nem.\n\nA **foton** az elektromágneses sugárzás kvantuma: nyugalmi tömege nulla, energiája `E = h·f`, impulzusa `p = h/λ`. h = 6,626·10⁻³⁴ J·s a Planck-állandó. Hasznos átváltás: `E [eV] ≈ 1240 / λ [nm]`.',
        example: 'A nátrium kilépési munkája ≈ 2,3 eV. Zöld fény (532 nm): `E ≈ 1240/532 ≈ 2,33 eV` – épp csak kilép elektron (Eₖ ≈ 0,03 eV). Ultraibolya (250 nm): 4,96 eV, Eₖ ≈ 2,7 eV.',
        pitfall: 'Erősebb fény nem ad gyorsabb elektronokat, csak többet. Ha f < f₀, akármeddig világíthatunk, nem lesz fotoáram.',
        related: ['de-broglie', 'hatarozatlansag', 'tomeg-energia', 'maxwell-egyenletek', 'potencial'],
        models: ['atom'] },
      { id: 'de-broglie', term: 'De Broglie-hullámhossz (anyaghullám)', en: 'de Broglie wavelength, matter wave', topic: 'modern',
        short: 'Minden p impulzusú részecskéhez hullám tartozik, amelynek hullámhossza λ = h/p.',
        text: 'Louis de Broglie 1924-ben megfordította a foton esetét: ha a fénynek van részecsketermészete, az anyagnak legyen hullámtermészete. Az elektron hullámtermészetét Davisson és Germer 1927-ben kristályon való **elektronelhajlással** igazolta.\n\nMakroszkopikus testek hullámhossza mérhetetlenül kicsi, ezért nem látunk interferenciát egy labdánál. Elektronoknál viszont az atomtávolságok nagyságrendjébe esik: ezen alapul az **elektronmikroszkóp** (sokkal jobb felbontás, mint a fénymikroszkópé) és az elektrondiffrakciós szerkezetvizsgálat.\n\nA Bohr-modell kvantumfeltétele is értelmet nyer: a megengedett pályák kerületére egész számú hullámhossz fér rá (állóhullám).',
        formulas: ['de-broglie-f'],
        example: 'U = 100 V-on gyorsított elektron: `p = √(2m·eU) ≈ 5,4·10⁻²⁴ kg·m/s`, `λ = h/p ≈ 0,123 nm` – éppen atomi méret. Egy 0,15 kg-os, 40 m/s-os labdáé: `λ ≈ 1,1·10⁻³⁴ m`.',
        pitfall: 'A λ = h/p a részecske **impulzusából** számolandó, nem a sebességből (relativisztikus sebességnél p ≠ mv). A fotonra is igaz, de a fotonnak nincs nyugalmi tömege, nála p = E/c.',
        related: ['fotoeffektus', 'hatarozatlansag', 'hullamfuggveny', 'interferencia', 'impulzus'],
        models: ['atom'] },
      { id: 'hatarozatlansag', term: 'Határozatlansági reláció', en: 'Heisenberg uncertainty principle', topic: 'modern',
        short: 'Egy részecske helye és impulzusa egyszerre nem lehet tetszőleges pontossággal meghatározott: Δx·Δpₓ ≥ ħ/2.',
        text: 'Nem a mérőeszközök tökéletlenségéről van szó, hanem a **hullámtermészet** következményéről: egy jól lokalizált (keskeny) hullámcsomag csak sokféle hullámhosszból (impulzusból) rakható össze, egy egyetlen hullámhosszú hullám pedig végtelen kiterjedésű. ħ = h/(2π) ≈ 1,055·10⁻³⁴ J·s.\n\nHasonló összefüggés áll fenn energia és idő között: `ΔE·Δt ≳ ħ/2` – a rövid élettartamú gerjesztett állapotok energiája „elkent” (színképvonalak természetes vonalszélessége).\n\nKövetkezmények: az atomban az elektron nem zuhanhat a magba (a szűk bezártság nagy impulzust, így nagy mozgási energiát jelentene), és a kvantumos harmonikus oszcillátor legkisebb energiája sem nulla (**nullponti energia**, ½ħω).',
        formulas: ['hatarozatlansag-f'],
        example: 'Atomnyi (Δx ≈ 10⁻¹⁰ m) tartományba zárt elektron: `Δp ≥ ħ/(2Δx) ≈ 5,3·10⁻²⁵ kg·m/s`, ami kb. 5,8·10⁵ m/s sebességbizonytalanság. Egy 1 g-os golyónál ugyanez kb. 5·10⁻²² m/s – észrevehetetlen.',
        pitfall: 'A reláció nem azt mondja, hogy a mérés „megzavarja” a részecskét (az egy másik hatás), hanem hogy a részecskének **nincs** egyszerre éles helye és impulzusa. Az azonos irányú komponensekre vonatkozik (Δx és Δpₓ; Δx és Δpᵧ között nincs ilyen korlát).',
        related: ['de-broglie', 'hullamfuggveny', 'fotoeffektus', 'impulzus'],
        models: ['atom'] },
      { id: 'hullamfuggveny', term: 'Hullámfüggvény és alagúteffektus', en: 'wave function, quantum tunnelling', topic: 'modern',
        short: 'A kvantummechanikai állapotot leíró ψ(x, t) komplex függvény; |ψ|² a részecske megtalálási valószínűség-sűrűsége. Hullámtermészete miatt a részecske klasszikusan tiltott potenciálgáton is átjuthat (alagúteffektus).',
        visual: tunSvg, caption: 'A hullámfüggvény (valós része) egy E-nél magasabb potenciálgát előtt, belsejében és mögött: a gátban exponenciálisan lecseng, de nem nullázódik ki.',
        text: '**Born-féle értelmezés**: annak valószínűsége, hogy a részecskét az [x; x + dx] szakaszon találjuk, `|ψ(x)|²·dx`. Ezért ψ normált: |ψ|² teljes térre vett integrálja 1. Időbeli alakulását a **Schrödinger-egyenlet** írja le; álló állapotokra `−(ħ²/2m)·ψ″ + V·ψ = E·ψ`.\n\nKötött részecskénél (atom, potenciáldoboz) csak bizonyos energiák megengedettek, mert a hullámfüggvénynek állóhullámmá kell rendeződnie – innen az **energiaszintek kvantáltsága**.\n\n**Alagúteffektus**: ha a részecske energiája kisebb a gát magasságánál (E < V₀), a gátban ψ exponenciálisan lecseng (ábra). Vékony gát túloldalán kis amplitúdó marad: az áthaladás valószínűsége közelítőleg `T ≈ e^(−2κd)`, ahol `κ = √(2m(V₀ − E))/ħ` és d a gát szélessége.\n\nEzen alapul az alfa-bomlás, a Nap magfúziója (a protonok a Coulomb-gáton „alagutaznak”), a pásztázó alagútmikroszkóp és a flash-memória cellák írása.',
        example: 'E = 1 eV-os elektron V₀ = 2 eV-os gáton: `κ = √(2m·1 eV)/ħ ≈ 5,1·10⁹ 1/m`. d = 0,5 nm-es gáton `T ≈ e^(−5,1) ≈ 0,6%`, d = 1 nm-en már csak `e^(−10,2) ≈ 0,004%`. Ez az érzékenység teszi atomi pontosságúvá az alagútmikroszkópot.',
        pitfall: 'ψ maga nem mérhető, és nem a részecske „szétkenődött anyaga”: csak |ψ|² kap valószínűségi jelentést. Az alagúteffektusban a részecske nem veszít energiát: a gát túloldalán ugyanazzal az E energiával jelenik meg.',
        related: ['de-broglie', 'hatarozatlansag', 'radioaktiv-bomlas', 'hullamegyenlet', 'interferencia'],
        models: ['atom', 'tranzisztor'] },
      { id: 'radioaktiv-bomlas', term: 'Radioaktív bomlás és felezési idő', en: 'radioactive decay, half-life', topic: 'modern',
        short: 'Instabil atommagok spontán átalakulása (α-, β-, γ-sugárzás kíséretében). A bomlatlan magok száma exponenciálisan csökken: egy felezési idő alatt a felére.',
        visual: decSvg, caption: 'Bomlási görbe: minden felezési idő (T) alatt a még meglévő magok fele bomlik el.',
        text: 'Az egyes magok bomlása **véletlenszerű**: nem mondható meg, melyik mikor bomlik, csak annak valószínűsége, hogy egységnyi idő alatt elbomlik – ez a **bomlási állandó** (λ). Sok mag esetén ebből a `dN/dt = −λN` differenciálegyenlet és az exponenciális **bomlástörvény** következik.\n\n**Felezési idő**: `T = ln 2/λ`; az átlagos élettartam `τ = 1/λ`. Az **aktivitás**, `A = λN` (bomlás/s = becquerel, Bq), szintén a felezési idővel csökken.\n\nBomlásfajták:\n\n- **α**: héliumatommag (2 proton + 2 neutron) távozik – az alagúteffektus teszi lehetővé;\n- **β⁻**: egy neutron protonná alakul, elektron és antineutrínó távozik;\n- **γ**: gerjesztett mag nagy energiájú fotont bocsát ki, összetétele nem változik.',
        formulas: ['bomlas-f'],
        example: 'Radiokarbonos kormeghatározás: a ¹⁴C felezési ideje 5730 év. Ha egy leletben a ¹⁴C-arány az élő szervezetének 25%-a, két felezési idő, kb. 11 460 év telt el. 10%-nál: `t = 5730 · log₂ 10 ≈ 19 000 év`.',
        pitfall: 'Két felezési idő után nem fogy el az anyag, hanem a **negyede** marad (a felének a fele). A felezési idő nem függ a kiinduló mennyiségtől, a hőmérséklettől és a kémiai kötéstől sem.',
        related: ['hullamfuggveny', 'tomeg-energia', 'fotoeffektus'],
        models: ['atom'] },
      { id: 'tomeg-energia', term: 'Tömeg–energia egyenértékűség (E = mc²)', en: 'mass–energy equivalence', topic: 'modern',
        short: 'A nyugalmi tömeg energiával egyenértékű: E₀ = mc². Kötési energia felszabadulásakor a rendszer tömege mérhetően csökken.',
        text: 'Einstein speciális relativitáselméletének következménye (1905). Mozgó test teljes energiája `E = γ·mc²`, ahol `γ = 1/√(1 − v²/c²)`; kis sebességnél `E ≈ mc² + ½mv²` – a klasszikus mozgási energia a második tag. Általánosan `E² = (pc)² + (mc²)²`; tömeg nélküli fotonra `E = pc`.\n\n**Tömeghiány**: az atommag tömege kisebb, mint az alkotó protonok és neutronok tömegének összege; a különbség c²-szerese a **kötési energia**. Az egy nukleonra jutó kötési energia a vas környékén a legnagyobb, ezért energiát ad a nehéz magok **hasadása** (atomerőmű) és a könnyű magok **fúziója** (Nap).\n\nKémiai reakcióknál is van tömegváltozás, de olyan kicsi (~10⁻¹⁰ relatív), hogy gyakorlatilag mérhetetlen.',
        example: 'A Nap sugárzási teljesítménye 3,8·10²⁶ W, ez másodpercenként `Δm = P/c² ≈ 3,8·10²⁶ / 9·10¹⁶ ≈ 4,2·10⁹ kg` tömegcsökkenés. A hélium-4 mag kötési energiája 28,3 MeV, ez az alkotórészek tömegének kb. 0,75%-a.',
        pitfall: '„A tömeg energiává alakul” pontatlan: az energia megmarad, csak a nyugalmi energia egy része más formát (mozgási energiát, sugárzást) ölt. A modern szóhasználatban m a sebességtől független nyugalmi tömeg; nem mondjuk, hogy a gyors test tömege „megnő”.',
        related: ['radioaktiv-bomlas', 'fotoeffektus', 'munkatetel', 'impulzus'],
        models: ['atom'] },
      /* ----- Bővítés: további alapfogalmak ----- */
      { id: 'gravitacio', term: 'Gravitáció és Kepler-törvények', en: 'gravitation and Kepler laws', topic: 'mechanika',
        short: 'Bármely két test vonzza egymást a tömegük szorzatával egyenesen, a távolságuk négyzetével fordítottan arányos erővel; ebből következnek a bolygók és műholdak pályái.',
        prereq: ['fizika-bsc/impulzusmomentum', 'lecke:fizika/newton'],
        text: '**Newton gravitációs törvénye** (1687): `F = γ·m₁·m₂/r²`. Ugyanaz az erő ejti le az almát és tartja pályán a Holdat – Newton ezzel egyesítette a földi és az égi mechanikát. A γ állandót Cavendish mérte meg először (1798).\n\n**Kepler törvényei** (empirikusan, 1609–1619; Newton levezette őket):\n\n1. A bolygók **ellipszispályán** keringenek, amelynek egyik fókuszában a Nap áll.\n2. A Napból a bolygóhoz húzott vezérsugár egyenlő idők alatt **egyenlő területeket** súrol – ez a centrális erőtérben érvényes **perdületmegmaradás** következménye: napközelben gyorsabb a bolygó.\n3. A keringési idők négyzetei úgy aránylanak, mint a pályák fél nagytengelyeinek köbei: `T²/a³ = 4π²/(γ·M)` – minden bolygóra ugyanaz.\n\n**Hasznos összefüggések**:\n\n- **körpálya** sebessége: `v = √(γM/r)` (a gravitáció biztosítja a centripetális erőt);\n- **szökési sebesség**: `v₂ = √(2γM/R)`, a Földön ≈ 11,2 km/s – ekkor a mozgási energia fedezi a −γMm/R helyzeti energiát;\n- a gravitációs **helyzeti energia** `−γMm/r`; a földfelszín közelében ebből lesz a megszokott mgh.\n\nAz űrállomáson a súlytalanság nem azért van, mert ott nincs gravitáció (400 km magasan g még kb. 8,7 m/s²), hanem mert az állomás és az űrhajósok együtt **szabadon esnek** a Föld körül.',
        formulas: ['gravitacio-f'],
        example: 'Geostacionárius pálya: T = 1 csillagnap ≈ 86 164 s, γM_Föld ≈ 3,986·10¹⁴ m³/s². Kepler III. törvényéből `r = ∛(γM·T²/(4π²)) ≈ 42 160 km` a Föld középpontjától, azaz kb. 35 790 km magasan – itt „áll” egy műhold az Egyenlítő egy pontja fölött.',
        pitfall: 'A súlytalanság nem a gravitáció hiánya, hanem szabadesés. A képletben r a **középpontok** távolsága, nem a felszín feletti magasság. Ellipszispályán a sebesség nem állandó.',
        related: ['impulzusmomentum', 'konzervativ-ero', 'impulzus', 'munkatetel'] },
      { id: 'boltzmann-eloszlas', term: 'Boltzmann-eloszlás és ekvipartíció', en: 'Boltzmann distribution, equipartition theorem', topic: 'termo',
        short: 'T hőmérsékletű egyensúlyban egy E energiájú állapot valószínűsége e^(−E/kT)-vel arányos; minden négyzetes szabadsági fokra átlagosan ½kT energia jut.',
        prereq: ['fizika-bsc/entropia', 'fizika-bsc/idealis-gaz'],
        text: 'A statisztikus fizika a makroszkopikus jellemzőket (nyomás, hőmérséklet, entrópia) a részecskék sokaságának viselkedéséből vezeti le. Alaperedménye a **Boltzmann-faktor**: termikus egyensúlyban\n\n`P(E) ∝ e^(−E/(k·T))`,\n\nahol k = 1,380649·10⁻²³ J/K a Boltzmann-állandó. Két állapot betöltöttségének aránya `e^(−ΔE/(kT))`. A k·T szorzat a jellemző „termikus energia”: szobahőmérsékleten (300 K) kT ≈ 0,026 eV ≈ 1/40 eV.\n\n**Következmények**:\n\n- **Barometrikus magasságformula** (állandó hőmérsékletű légkörben): `p(h) = p₀·e^(−mgh/(kT))`; levegőre a jellemző magasság kT/(mg) ≈ 8 km.\n- **Arrhenius-összefüggés**: a kémiai reakciók sebessége `e^(−E_a/(kT))` szerint függ a hőmérséklettől – ezért gyorsul sok reakció jelentősen kis melegítéstől is.\n- **Félvezetők**: a vezetési sávba gerjesztett elektronok száma a tiltott sáv szélességétől exponenciálisan függ.\n- **Maxwell–Boltzmann sebességeloszlás** a gázmolekulák sebességére.\n\n**Ekvipartíció-tétel**: klasszikus rendszerben minden, az energiában négyzetesen szereplő szabadsági fokra átlagosan **½kT** jut. Egyatomos gáz részecskéjére 3 haladási szabadsági fok: `⟨E⟩ = 3/2·kT`; ebből adódik az ideális gáz belső energiája, `U = (f/2)·nRT`. Ha egy szabadsági fok gerjesztéséhez kT-nél jóval nagyobb energia kell (kvantált rezgések szobahőmérsékleten), az „befagy” – ezért 5 és nem 7 a kétatomos gázok f-je szobahőmérsékleten.',
        example: 'Két állapot energiakülönbsége 0,1 eV, T = 300 K: a felső és az alsó állapot betöltöttségének aránya `e^(−0,1/0,0259) ≈ e^(−3,9) ≈ 0,02`. 600 K-en már `e^(−1,93) ≈ 0,15` – a hőmérséklet kétszerezése hétszeresére növelte.',
        pitfall: 'A Boltzmann-faktor **egy állapotra** vonatkozik: ha egy energiaszinthez több állapot tartozik (degeneráció), a szint betöltöttségét az állapotok számával is szorozni kell. Nagyon alacsony hőmérsékleten vagy nagy sűrűségnél (elektronok fémben) kvantumstatisztika (Fermi–Dirac, Bose–Einstein) kell.',
        related: ['entropia', 'idealis-gaz', 'belso-energia', 'elso-fotetel'] },
      { id: 'ampere-torveny', term: 'Mágneses mező keltése: Biot–Savart- és Ampère-törvény', en: 'Biot–Savart law and Ampère law', topic: 'em',
        short: 'Az elektromos áram mágneses mezőt kelt; egyenes vezető körül B = μ₀I/(2πr), és bármely zárt görbe mentén a mágneses indukció körintegrálja a körülfogott árammal arányos.',
        prereq: ['fizika-bsc/lorentz-ero', 'lecke:fizika/elektromossag'],
        text: 'Ørsted 1820-ban fedezte fel, hogy az áramjárta vezető kitéríti az iránytűt. A mező számítására két egyenértékű út van:\n\n**Biot–Savart-törvény**: egy I áramú, dl hosszú vezetődarab járuléka `dB = (μ₀/4π)·I·dl × r̂ / r²` – a Coulomb-törvény mágneses megfelelője. Bármilyen alakú vezetőre összegezhető (integrálható).\n\n**Ampère-féle gerjesztési törvény**: `∮ B·dl = μ₀·I_bezárt`. Szimmetrikus elrendezésekben sokkal gyorsabb:\n\n- **hosszú egyenes vezető**: koncentrikus körök mentén `B = μ₀I/(2πr)`; iránya a **jobbkéz-szabállyal** (hüvelykujj az áram irányába, a behajlított ujjak a mező irányát mutatják);\n- **hosszú tekercs** (szolenoid), belül homogén: `B = μ₀·n·I`, ahol n = N/l a menetsűrűség; kívül közel 0;\n- **toroid**: `B = μ₀NI/(2πr)` a tekercs belsejében.\n\n**Párhuzamos vezetők** között az egyik mezeje a másik áramára Lorentz-erőt fejt ki: `F/l = μ₀·I₁·I₂/(2πd)` – azonos irányú áramok vonzzák, ellentétesek taszítják egymást. Korábban az amper definíciója ezen alapult.\n\nμ₀ ≈ 4π·10⁻⁷ V·s/(A·m) a vákuum permeabilitása. Vasmagos tekercsben a mező a relatív permeabilitással (μᵣ, akár több ezer) megsokszorozódik – ezen alapulnak az elektromágnesek, relék, transzformátorok és villanymotorok.\n\nMaxwell felismerése: változó elektromos mező mellett az Ampère-törvényt ki kell egészíteni az **eltolási árammal** – ez vezetett az elektromágneses hullámokhoz.',
        example: 'Egyenes vezető, I = 10 A, r = 5 cm: `B = 4π·10⁻⁷·10/(2π·0,05) = 4·10⁻⁵ T = 40 µT` – összemérhető a Föld mágneses mezejével, ezért téríti ki az iránytűt. Tekercs 1000 menet/m-rel, I = 2 A: `B = 4π·10⁻⁷·1000·2 ≈ 2,5 mT`.',
        pitfall: 'Az eredeti Ampère-törvény töltődő kondenzátornál ellentmondásra vezet (a fegyverzetek között nem folyik vezetési áram) – ezért kell az eltolási áram. A mágneses mező **körbeveszi** a vezetőt, nem tőle sugárirányban mutat.',
        related: ['lorentz-ero', 'maxwell-egyenletek', 'faraday-indukcio', 'gauss-torveny'] },
      { id: 'kondenzator', term: 'Kondenzátor, kapacitás és a mező energiája', en: 'capacitor, capacitance, field energy', topic: 'em',
        short: 'A kondenzátor töltést és elektromos energiát tárol; kapacitása C = Q/U, síkkondenzátorra C = ε₀εᵣA/d, a tárolt energia ½CU².',
        prereq: ['fizika-bsc/potencial', 'fizika-bsc/gauss-torveny'],
        text: 'Két, egymástól elszigetelt vezető (fegyverzet) +Q és −Q töltéssel; a köztük lévő feszültség arányos a töltéssel. Az arányossági tényező a **kapacitás**: `C = Q/U`, egysége a farad (F = C/V); a gyakorlatban pF, nF, µF.\n\n**Síkkondenzátor**: a Gauss-törvény szerint a fegyverzetek között `E = Q/(ε₀εᵣA)` homogén mező van, így `U = E·d` és\n\n`C = ε₀·εᵣ·A/d`,\n\nε₀ ≈ 8,854·10⁻¹² F/m. Nagy kapacitáshoz nagy felület, kis távolság és nagy **relatív permittivitású** szigetelő (dielektrikum) kell: a dielektrikum polarizálódik, és gyengíti a belső mezőt.\n\n**Energia**: a töltések felvitelekor végzett munka `W = ½·C·U² = Q²/(2C)`. Ez az energia magában az **elektromos mezőben** tárolódik, energiasűrűsége `w = ½·ε₀εᵣ·E²` – ez a gondolat vezet el oda, hogy a mezőnek önálló fizikai valósága van (és az elektromágneses hullám energiát szállít).\n\n**Kapcsolások**: párhuzamosan a kapacitások összeadódnak (`C = C₁ + C₂`), sorosan a reciprokok (`1/C = 1/C₁ + 1/C₂`) – éppen fordítva, mint az ellenállásoknál.\n\n**RC-kör**: ellenálláson át töltve a feszültség `U(t) = U₀·(1 − e^(−t/RC))` szerint nő, τ = RC időállandóval. Alkalmazások: tápegységek simítása, időzítők, szűrők, energiatárolás (vaku, defibrillátor), érintőképernyők, memóriacellák.',
        example: 'Két 10 cm × 10 cm-es lemez 1 mm-re, levegővel: `C = 8,854·10⁻¹²·0,01/0,001 ≈ 88,5 pF` – meglepően kicsi. Egy 470 µF-os kondenzátor 300 V-on viszont `½·470·10⁻⁶·300² ≈ 21 J` energiát tárol: ezt egy vaku egy pillanat alatt ki tudja sütni.',
        pitfall: 'Ha egy kondenzátort ellenálláson keresztül egy telepről töltünk fel, a telep által leadott QU energiának csak a fele (½QU) kerül a kondenzátorba, a másik fele hővé alakul az ellenálláson – az ellenállás nagyságától függetlenül.',
        related: ['potencial', 'gauss-torveny', 'elektromos-terero', 'maxwell-egyenletek'] },
      { id: 'em-hullam', term: 'Elektromágneses hullám és spektrum', en: 'electromagnetic wave and spectrum', topic: 'hullam',
        short: 'Egymást fenntartó, egymásra és a terjedési irányra merőlegesen rezgő elektromos és mágneses mező, amely vákuumban c ≈ 3·10⁸ m/s sebességgel terjed; a fény is ilyen.',
        prereq: ['fizika-bsc/maxwell-egyenletek', 'fizika-bsc/hullamegyenlet'],
        text: 'A Maxwell-egyenletekből töltések nélküli térben hullámegyenlet következik, amelynek terjedési sebessége `c = 1/√(ε₀μ₀)`. A hullámot H. Hertz kísérletileg is kimutatta (1887–1888).\n\n**Tulajdonságai**:\n\n- **transzverzális**: E ⊥ B, és mindkettő merőleges a terjedési irányra; ezért **polarizálható**;\n- az amplitúdók aránya `E = c·B`;\n- **nem kell hozzá közeg** – vákuumban is terjed;\n- anyagban lassabb: `v = c/n`, ahol n a törésmutató;\n- **energiát** és **impulzust** szállít: az energiaáram-sűrűség a Poynting-vektor, `S = E × B/μ₀`; szinuszos hullám intenzitása `I = ½·c·ε₀·E₀²`. Elnyelő felületen a sugárnyomás `p = I/c`.\n\n**Az elektromágneses spektrum** – mind ugyanaz a jelenség, csak a hullámhossz (`λ = c/f`) más:\n\n- **rádióhullámok** (m–km): műsorszórás, kommunikáció;\n- **mikrohullámok** (mm–dm): radar, mobil- és wifi-kommunikáció, mikrohullámú sütő;\n- **infravörös**: hősugárzás, távirányítók, hőkamerák;\n- **látható fény**: kb. 380–780 nm, vöröstől ibolyáig;\n- **ultraibolya**: napégés, fertőtlenítés;\n- **röntgen**- és **gammasugárzás**: orvosi képalkotás, anyagvizsgálat, atommagfolyamatok.\n\nKvantumos szemlélettel a sugárzás `E = h·f` energiájú fotonokból áll: minél nagyobb a frekvencia, annál nagyobb egy foton energiája – ezért ionizál az UV, a röntgen és a gamma, a rádióhullám viszont nem.',
        example: 'A napsugárzás intenzitása a Föld távolságában kb. 1360 W/m². Ebből `E₀ = √(2I/(cε₀)) ≈ 1,0 kV/m`, `B₀ = E₀/c ≈ 3,4 µT`, a sugárnyomás teljes elnyelésnél `1360/3·10⁸ ≈ 4,5 µPa`. Egy 100 MHz-es rádióadó hullámhossza `3·10⁸/10⁸ = 3 m`.',
        pitfall: 'Más közegbe lépve a hullám **frekvenciája nem változik**, csak a sebessége és a hullámhossza. A rádióhullám és a fény nem különböző „fajta” sugárzás – csak a hullámhosszuk tér el.',
        related: ['maxwell-egyenletek', 'hullamegyenlet', 'fenytores', 'interferencia', 'fotoeffektus'] },
      { id: 'fenytores', term: 'Fénytörés és teljes visszaverődés', en: 'refraction and total internal reflection', topic: 'hullam',
        short: 'Két közeg határán a fény iránya megváltozik: n₁·sin α₁ = n₂·sin α₂ (Snellius–Descartes); sűrűbb közegből a határszögnél laposabban érkező fény teljesen visszaverődik.',
        prereq: ['fizika-bsc/em-hullam', 'lecke:fizika/hullamok-feny'],
        text: 'A **törésmutató** `n = c/v` megmutatja, hányszor lassabb a fény a közegben, mint vákuumban (levegő ≈ 1,0003, víz ≈ 1,33, üveg ≈ 1,5, gyémánt ≈ 2,42). A határfelületen a **visszaverődés törvénye** (beesési szög = visszaverődési szög) és a **törési törvény** érvényes:\n\n`n₁·sin α₁ = n₂·sin α₂`.\n\nMindkettő levezethető a **Huygens-elvből** (a hullámfront pontjai elemi hullámok forrásai) vagy a **Fermat-elvből** (a fény a két pont közötti utat a legrövidebb idő alatt teszi meg – mint a vízimentő, aki a parton többet fut, a vízben kevesebbet úszik).\n\n**Teljes visszaverődés**: optikailag sűrűbb közegből ritkábba haladva (n₁ > n₂) a törési szög nagyobb a beesésinél; a `sin α_h = n₂/n₁` **határszögnél** a megtört sugár a felület mentén halad, efölött a fény **teljes egészében visszaverődik**. Ezen alapul:\n\n- az **optikai szál**: a fény a mag és a köpeny határán ismételt teljes visszaverődéssel, nagyon kis veszteséggel jut el akár sok kilométerre;\n- a gyémánt csillogása (kis határszög, kb. 24°);\n- a prizmás távcsövek és periszkópok.\n\n**Diszperzió**: a törésmutató a hullámhossztól függ (a kék fény jobban törik, mint a vörös), ezért bontja a prizma színekre a fehér fényt, és ezért jön létre a szivárvány.\n\nA lencsék is a fénytörés elvén működnek: vékony lencsére a leképezési törvény `1/f = 1/t + 1/k`.',
        formulas: ['snellius-f'],
        example: 'Vízből (n = 1,33) 30°-os beesési szöggel kilépő fény: `sin α₂ = 1,33·0,5 = 0,665` ⟹ α₂ ≈ 41,7°. A víz–levegő határszög `arcsin(1/1,33) ≈ 48,8°` – ennél laposabban a víz alól nézve a felszín tükörként viselkedik. Egy 1 m mély medence függőlegesen lenézve csak kb. `1/1,33 ≈ 0,75 m` mélynek látszik.',
        pitfall: 'A szögeket mindig a **beesési merőlegestől** kell mérni, nem a felülettől. Teljes visszaverődés csak sűrűbb közegből ritkábba haladva lehetséges, fordítva soha.',
        related: ['em-hullam', 'interferencia', 'hullamegyenlet', 'doppler'] },
      { id: 'allohullam', term: 'Állóhullám és sajátrezgések', en: 'standing wave, normal modes', topic: 'hullam',
        short: 'Két szemben haladó, azonos frekvenciájú hullám összege; vannak helyben maradó csomópontjai és duzzadóhelyei. Két végén rögzített húron csak L = n·λ/2 hullámhosszak alakulhatnak ki.',
        prereq: ['fizika-bsc/hullamegyenlet', 'fizika-bsc/harmonikus-rezges'],
        text: 'Ha egy hullám egy rögzített végről visszaverődik, a beeső és a visszavert hullám szuperpozíciója:\n\n`y = A·sin(kx − ωt) + A·sin(kx + ωt) = 2A·sin(kx)·cos(ωt)`.\n\nEz már nem halad: minden pont ugyanabban a ritmusban rezeg, de az amplitúdó helyről helyre más. **Csomópontok** (mindig nyugalomban) λ/2 távolságban követik egymást, köztük a **duzzadóhelyek** (legnagyobb kitérés). Az állóhullám energiát nem szállít, csak a csomópontok között ide-oda alakul.\n\n**Két végén rögzített húr**: mindkét végén csomópont kell, ezért csak bizonyos hullámhosszak lehetségesek:\n\n`L = n·λ/2`, azaz `fₙ = n·c/(2L)`, n = 1, 2, 3, …,\n\nahol a húron a hullám sebessége `c = √(F/μ)` (F a feszítőerő, μ a hosszegységre jutó tömeg). Az f₁ az **alaphang**, a többi a **felhangok** (felharmonikusok) – ezek arányától függ a hangszín.\n\n**Sípok**: mindkét végén nyitott síp ugyanígy minden felhangot tartalmaz; egyik végén zárt sípban a zárt végen csomópont, a nyitotton duzzadóhely van: `L = (2n − 1)·λ/4`, csak **páratlan** felhangok szólnak.\n\n**Jelentősége**: hangszerek, épületek és hidak sajátrezgései (rezonancia), a mikrohullámú sütő „hideg foltjai”, a lézer rezonátora. A kvantummechanikában a kötött részecske hullámfüggvényének hasonló feltételt kell teljesítenie – ebből ered az **energia kvantáltsága**.',
        example: 'Gitárhúr: L = 65 cm, alaphang 110 Hz. A hullám sebessége a húron `c = 2·L·f = 143 m/s`. A 12. bundnál lefogva a rezgő hossz feleződik: a hang egy oktávval magasabb (220 Hz). Ugyanezt a feszítőerő **négyszerezésével** lehetne elérni (c ∝ √F).',
        pitfall: 'A húron terjedő hullám sebessége nem azonos a hang levegőbeli sebességével: a frekvencia ugyanaz, de a levegőben kialakuló hang hullámhossza más (110 Hz-nél kb. 3,1 m). Az állóhullám csomópontjai a forrás felé sem „vándorolnak”.',
        related: ['hullamegyenlet', 'harmonikus-rezges', 'interferencia', 'potencialdoboz'] },
      /* ----- Speciális relativitáselmélet ----- */
      { id: 'specialis-relativitas', term: 'A speciális relativitáselmélet alapjai', en: 'special relativity: postulates and Lorentz transformation', topic: 'relativitas',
        short: 'Két alapelvre épül: a fizika törvényei minden inerciarendszerben azonosak, és a fény vákuumbeli sebessége minden inerciarendszerben ugyanaz (c), a forrás mozgásától függetlenül.',
        prereq: ['fizika-bsc/maxwell-egyenletek', 'fizika-bsc/impulzus'],
        text: 'A 19. század végén ellentmondás feszült a mechanika és az elektrodinamika között: a Maxwell-egyenletekből egyetlen fénysebesség adódik, a Michelson–Morley-kísérlet (1887) pedig nem talált a Föld mozgásából eredő különbséget. Einstein (1905) két **posztulátummal** oldotta fel:\n\n1. **Relativitási elv**: a fizika törvényei minden inerciarendszerben ugyanolyan alakúak; nincs kitüntetett „nyugvó” rendszer.\n2. **A fénysebesség állandósága**: a fény vákuumbeli sebessége minden inerciarendszerben c ≈ 3·10⁸ m/s.\n\n**Lorentz-transzformáció** (a vesszős rendszer v sebességgel mozog az x tengely mentén):\n\n`x′ = γ·(x − v·t)`,  `t′ = γ·(t − v·x/c²)`,  `γ = 1/√(1 − v²/c²)`.\n\nKis sebességnél (v ≪ c) γ ≈ 1, és visszakapjuk a klasszikus Galilei-transzformációt.\n\n**Következmények**:\n\n- az **egyidejűség relatív**: ami az egyik rendszerben egyszerre történik, a másikban nem feltétlenül;\n- **idődilatáció** és **hosszkontrakció**;\n- **sebességösszeadás**: `u = (u′ + v)/(1 + u′v/c²)` – a fénysebességet így nem lehet túllépni;\n- **tömeg–energia egyenértékűség**: `E = γmc²`, nyugalmi energia mc²;\n- tömeggel rendelkező test nem érheti el c-t: ehhez végtelen energia kellene.\n\n**Invariáns**: a téridő-intervallum, `s² = c²Δt² − Δx²`, minden inerciarendszerben ugyanaz – a tér és az idő egyetlen négydimenziós **téridő** részei.\n\nA műholdas helymeghatározásban (GPS) a relativisztikus (speciális és általános) korrekciók nélkül a hiba naponta kilométerekre nőne.',
        formulas: ['lorentz-f'],
        example: 'Két űrhajó a Földhöz képest 0,8c-vel távolodik egymástól ellentétes irányban. Klasszikusan 1,6c lenne a relatív sebességük, relativisztikusan `(0,8 + 0,8)/(1 + 0,64) ≈ 0,976c` – kisebb c-nél.',
        pitfall: 'A relativitáselmélet nem azt mondja, hogy „minden relatív”: a fénysebesség és a téridő-intervallum minden megfigyelő számára azonos. Az idődilatáció és a hosszkontrakció sem látszólagos, optikai csalódás – mérhető, valós hatás.',
        related: ['idodilatacio', 'tomeg-energia', 'maxwell-egyenletek', 'impulzus'] },
      { id: 'idodilatacio', term: 'Idődilatáció és hosszkontrakció', en: 'time dilation and length contraction', topic: 'relativitas',
        short: 'A mozgó óra a megfigyelőhöz képest lassabban jár (Δt = γ·Δt₀), a mozgó tárgy a mozgás irányában rövidebb (L = L₀/γ); a hatás csak a fénysebességhez közeli sebességeknél jelentős.',
        prereq: ['fizika-bsc/specialis-relativitas'],
        text: '**Fényóra-gondolatkísérlet**: egy óra két, L távolságú tükör között pattogó fényimpulzus. Az órával együtt mozgó megfigyelő szerint egy „tikk” ideje `Δt₀ = 2L/c`. A hozzá képest v sebességgel mozgó órát figyelő viszont **ferde** utat lát; mivel a fény neki is c sebességű, Pitagorasz-tétellel `(cΔt/2)² = L² + (vΔt/2)²`, amiből\n\n`Δt = γ·Δt₀`, `γ = 1/√(1 − v²/c²)`.\n\nA **sajátidő** (Δt₀) az órával együtt mozgó rendszerben mért idő – ez a legrövidebb.\n\n**Hosszkontrakció**: egy tárgy hossza abban a rendszerben a legnagyobb, ahol nyugalomban van (L₀, sajáthossz); a hozzá képest mozgó megfigyelő szerint a mozgás irányában `L = L₀/γ`. Merőleges irányban nincs változás.\n\n**Kísérleti bizonyítékok**:\n\n- a felső légkörben keletkező **müonok** (élettartamuk sajátidőben 2,2 µs) elérik a felszínt, pedig klasszikusan csak néhány száz métert tehetnének meg;\n- részecskegyorsítókban a gyors, instabil részecskék élettartama γ-szorosára nő;\n- repülőgépeken utaztatott **atomórák** (Hafele–Keating-kísérlet, 1971) és a navigációs műholdak órái.\n\n**Ikerparadoxon**: ha az egyik iker nagy sebességű űrutazás után hazatér, ő lesz a fiatalabb. Nem ellentmondás: a helyzet nem szimmetrikus, mert az utazó a fordulónál inerciarendszert vált (gyorsul), az otthon maradó nem.\n\nHétköznapi sebességeken a hatás elhanyagolható: egy utasszállító repülőgépen (≈ 250 m/s) `γ − 1 ≈ 3,5·10⁻¹³`.',
        formulas: ['lorentz-f'],
        example: 'Müon v = 0,998c-vel, γ ≈ 15,8. Idődilatáció nélkül `0,998·c·2,2 µs ≈ 660 m`-t tenne meg, a földi megfigyelő szerint viszont 15,8-szor tovább él, és kb. 10,4 km-t tesz meg. A müon saját rendszerében ugyanez hosszkontrakcióként jelenik meg: neki a 10,4 km-es légréteg csak kb. 660 m vastag.',
        pitfall: 'A hatás kölcsönös: mindkét megfigyelő a **másik** óráját látja lassabbnak – ez nem ellentmondás, mert az egyidejűség is relatív. Az ikerparadoxon feloldása nem a „gyorsulás okozta öregedés”, hanem a rendszerváltás aszimmetriája.',
        related: ['specialis-relativitas', 'tomeg-energia', 'radioaktiv-bomlas'] },
      /* ----- Modern fizika ----- */
      { id: 'feketetest', term: 'Hőmérsékleti sugárzás (fekete test, Planck-törvény)', en: 'thermal radiation, black body, Planck law', topic: 'modern',
        short: 'Minden test hőmérsékletétől függő elektromágneses sugárzást bocsát ki; a fekete test sugárzása csak a hőmérséklettől függ: teljesítménye σT⁴, maximuma λ_max = b/T-nél van.',
        prereq: ['fizika-bsc/em-hullam'],
        text: 'Az **abszolút fekete test** minden ráeső sugárzást elnyel; jó közelítés egy kis nyílású, belül egyenletes hőmérsékletű üreg. Kibocsátott spektruma **csak a hőmérséklettől** függ, az anyagtól nem.\n\n**Törvényei**:\n\n- **Stefan–Boltzmann-törvény**: a kisugárzott teljesítmény felületegységenként `M = σ·T⁴`, σ ≈ 5,670·10⁻⁸ W/(m²·K⁴). Valós testekre `ε·σ·T⁴`, ahol ε ≤ 1 az emissziós tényező.\n- **Wien-féle eltolódási törvény**: a spektrum maximumának hullámhossza `λ_max = b/T`, b ≈ 2,898·10⁻³ m·K. Melegebb test „kékebb”: a felhevített vas előbb vörösen, majd sárgán, végül fehéren izzik.\n\n**A kvantumfizika születése**: a klasszikus fizika (Rayleigh–Jeans-törvény) szerint a rövid hullámhosszakon a sugárzás korlátlanul nőne („ultraibolya-katasztrófa”). **Max Planck** 1900-ban azzal a feltevéssel kapta meg a mérésekkel egyező képletet, hogy az energia csak `E = h·f` adagokban (kvantumokban) cserélődhet. A h ≈ 6,626·10⁻³⁴ J·s Planck-állandó azóta a kvantumfizika alapállandója.\n\n**Példák a természetből és a technikából**:\n\n- a Nap felszíne (≈ 5800 K) körülbelül 500 nm körül sugároz a legerősebben – szemünk érzékenysége is ehhez igazodik;\n- az emberi test (≈ 310 K) maximuma kb. 9,3 µm-nél van, az infravörösben – erre érzékenyek a hőkamerák;\n- a **kozmikus mikrohullámú háttérsugárzás** 2,725 K-es fekete test sugárzásának felel meg, maximuma kb. 1 mm-nél – a forró korai Világegyetem lenyomata;\n- az izzólámpák fényének nagy része infravörös, ezért rossz a hatásfokuk.',
        formulas: ['stefan-boltzmann-f'],
        example: 'Wien-törvénnyel: emberi test `2,898·10⁻³/310 ≈ 9,3 µm`; Nap `2,898·10⁻³/5800 ≈ 500 nm`. Stefan–Boltzmann: ha egy test abszolút hőmérséklete kétszeresére nő (pl. 300 K-ről 600 K-re), kisugárzott teljesítménye `2⁴ = 16`-szorosára nő.',
        pitfall: 'A „fekete test” nem feltétlenül fekete színű: a Nap is jó közelítéssel fekete test. A Stefan–Boltzmann-törvénybe **kelvinben** kell írni a hőmérsékletet – Celsius-fokkal értelmetlen eredményt kapunk.',
        related: ['fotoeffektus', 'em-hullam', 'entropia', 'boltzmann-eloszlas'] },
      { id: 'potencialdoboz', term: 'Részecske dobozban (végtelen potenciálgödör)', en: 'particle in a box (infinite potential well)', topic: 'modern',
        short: 'Egy kis tartományba zárt részecske hullámfüggvénye állóhullám, ezért energiája csak meghatározott értékeket vehet fel: Eₙ = n²h²/(8mL²), n = 1, 2, 3, …',
        prereq: ['fizika-bsc/hullamfuggveny', 'fizika-bsc/de-broglie'],
        text: 'A legegyszerűbb kvantummechanikai modell: egy m tömegű részecske egy L szélességű tartományban szabadon mozoghat, de a falakon nem juthat át (végtelen magas potenciálfal). A hullámfüggvénynek a falaknál 0-nak kell lennie – pontosan úgy, mint a két végén rögzített húr állóhullámainak.\n\n**Megoldás**: `ψₙ(x) = √(2/L)·sin(nπx/L)`, n = 1, 2, 3, …\n\nRövid levezetés de Broglie-val: a dobozba egész számú félhullámnak kell beleférnie, `L = n·λ/2`, így `p = h/λ = n·h/(2L)`, és az energia `E = p²/(2m)`:\n\n`Eₙ = n²·h²/(8·m·L²)`.\n\n**Tanulságok**:\n\n- az energia **kvantált** – csak diszkrét értékek megengedettek;\n- a legkisebb energia sem nulla (**zérusponti energia**): a bezárt részecske soha nem áll nyugalomban – összhangban a határozatlansági relációval;\n- a szintek távolsága `1/(mL²)`-tel arányos: **kis** tömegnél és **kis** méretnél jelentős, makroszkopikus testeknél mérhetetlenül kicsi (ezért nem tapasztaljuk a hétköznapokban);\n- a megtalálási valószínűség, |ψ|², nem egyenletes: az n-edik állapotnak n − 1 csomópontja van, ahol a részecske soha nem található.\n\n**Alkalmazások**: a **kvantumpöttyök** (néhány nm-es félvezető kristályok) színe a méretüktől függ – a kisebbek kékebbek, mert nagyobb a szintek távolsága; félvezető lézerek kvantumgödrei; festékmolekulák elnyelése.',
        formulas: ['doboz-f'],
        example: 'Elektron L = 1 nm-es dobozban: E₁ ≈ 0,38 eV, E₂ = 4E₁ ≈ 1,50 eV. A 2 → 1 átmenetben kibocsátott foton energiája ≈ 1,13 eV, hullámhossza `1240 nm·eV/1,13 eV ≈ 1100 nm` (infravörös). Egy 1 g-os golyóra 1 cm-es dobozban a szintek távolsága kb. 10⁻⁶⁰ J-os nagyságrendű – teljesen észrevehetetlen.',
        pitfall: 'Az n = 0 nem megengedett állapot (akkor ψ mindenhol 0 lenne, a részecske sehol sem volna). A részecske nem „pattog” klasszikusan a falak között: az állapot állóhullám, amelynek csomópontjaiban a megtalálás valószínűsége 0.',
        related: ['hullamfuggveny', 'de-broglie', 'hatarozatlansag', 'allohullam', 'hidrogenatom'] },
      { id: 'hidrogenatom', term: 'A hidrogénatom: energiaszintek és vonalas színkép', en: 'hydrogen atom: energy levels and line spectrum', topic: 'modern',
        short: 'A hidrogénatom elektronja csak Eₙ = −13,6 eV/n² energiájú állapotokban lehet; szintek közötti átmenetkor a különbségnek megfelelő energiájú foton nyelődik el vagy keletkezik.',
        prereq: ['fizika-bsc/potencialdoboz', 'fizika-bsc/fotoeffektus', 'lecke:fizika/atom'],
        text: 'A gázok **vonalas színképe** (csak meghatározott hullámhosszak) a klasszikus fizikával megmagyarázhatatlan volt. **Bohr modellje** (1913) a hidrogénatomra feltette, hogy az elektron csak bizonyos stacionárius pályákon lehet, ahol nem sugároz, és sugárzás csak két állapot közötti **ugráskor** keletkezik:\n\n`h·f = E_m − E_n`.\n\nA megengedett energiák: `Eₙ = −13,6 eV/n²`, a pályasugarak `rₙ = n²·a₀`, ahol `a₀ ≈ 0,0529 nm` a Bohr-sugár. A negatív energia **kötött** állapotot jelent; 13,6 eV az alapállapotú atom **ionizációs energiája**.\n\n**Színképsorozatok** (Rydberg-formula, `1/λ = R·(1/n² − 1/m²)`):\n\n- **Lyman-sorozat** (n = 1): ultraibolya;\n- **Balmer-sorozat** (n = 2): látható – vörös H-alfa (656 nm), kékeszöld H-béta (486 nm) stb.;\n- **Paschen-sorozat** (n = 3): infravörös.\n\n**A mai kép**: a Schrödinger-egyenlet pontos megoldása ugyanezeket az energiákat adja, de az elektronnak nincs pályája – állapotait **orbitálok**, a megtalálási valószínűség térbeli eloszlásai írják le. Négy kvantumszám jellemzi őket: n (fő), l (mellék, 0…n − 1), m (mágneses, −l…l) és a spin. A Bohr-modell sikere a helyes energiákban van, a körpályák képe viszont nem helytálló.\n\n**Alkalmazások**: a csillagok és ködök anyagát a színképvonalaikból ismerjük (spektroszkópia); a vonalak eltolódásából (Doppler-effektus) a sebességük is mérhető. A színképvonalak ujjlenyomatként azonosítják az elemeket.',
        formulas: ['hidrogen-f'],
        example: 'H-alfa (3 → 2): `ΔE = 13,6·(1/4 − 1/9) ≈ 1,89 eV` ⟹ `λ ≈ 1240/1,89 ≈ 656 nm` (vörös). A Lyman-alfa (2 → 1): `13,6·3/4 = 10,2 eV` ⟹ 122 nm, ultraibolya.',
        pitfall: 'A Bohr-féle körpályák képe nem a valóság: az elektron nem kering, hanem „felhőként” (valószínűségi eloszlásként) van jelen. A 13,6 eV-os képlet csak egyelektronos atomokra (ionokra) érvényes; többelektronos atomoknál az elektronok kölcsönhatása megváltoztatja a szinteket.',
        related: ['fotoeffektus', 'hullamfuggveny', 'potencialdoboz', 'spin-pauli', 'doppler'],
        models: ['atom'] },
      { id: 'spin-pauli', term: 'Spin és Pauli-féle kizárási elv', en: 'spin and Pauli exclusion principle', topic: 'modern',
        short: 'Az elektronnak saját impulzusmomentuma (spinje) van, amelynek mért komponense csak +ħ/2 vagy −ħ/2 lehet; a Pauli-elv szerint két elektron nem lehet ugyanabban a kvantumállapotban.',
        prereq: ['fizika-bsc/hidrogenatom', 'fizika-bsc/impulzusmomentum'],
        text: '**Spin**: a részecskék belső, „velük született” impulzusmomentuma – nem egy kis golyó tényleges forgása, hanem tisztán kvantummechanikai tulajdonság. Az elektron spinje ½: bármely tengelyre mért komponense csak `+ħ/2` („fel”) vagy `−ħ/2` („le”) lehet. Kísérletileg a Stern–Gerlach-kísérlet (1922) mutatta ki, amelyben inhomogén mágneses mező az atomnyalábot két részre bontotta. A spinhez **mágneses momentum** tartozik: ezen alapul az anyagok mágnessége, az MRI (a protonok spinje) és a merevlemezek, mágneses érzékelők működése.\n\n**Pauli-féle kizárási elv** (1925): egy atomban nincs két olyan elektron, amelynek mind a négy kvantumszáma (n, l, m, mₛ) megegyezik. Általánosabban: két azonos **fermion** (feles spinű részecske: elektron, proton, neutron) nem lehet ugyanabban az állapotban.\n\n**Következmények**:\n\n- **héjszerkezet**: egy pályára (orbitálra) legfeljebb két, ellentétes spinű elektron fér; az n-edik héjon legfeljebb **2n²** elektron (2, 8, 18, …). Ebből adódik a **periódusos rendszer** felépítése és az elemek kémiai viselkedése;\n- az anyag **stabilitása és „keménysége”**: az elektronok nem zsúfolódhatnak össze – ez a degenerációs nyomás tartja a fehér törpéket és a neutroncsillagokat;\n- a fémek elektronjainak viselkedése (Fermi-energia), a félvezetők sávszerkezete.\n\nAz egész spinű részecskékre (**bozonok**, pl. foton) nincs ilyen korlát: sokan lehetnek ugyanabban az állapotban – ezen alapul a **lézer** és a Bose–Einstein-kondenzátum.',
        example: 'A nátrium (11 elektron) elektronszerkezete 1s² 2s² 2p⁶ 3s¹: az első két héj betelt (2 + 8), a tizenegyedik elektronnak már a harmadik héjon jut hely. Ez az egyetlen, lazán kötött külső elektron teszi a nátriumot (és minden alkálifémet) rendkívül reakcióképessé.',
        pitfall: 'A Pauli-elv nem tiltja, hogy két elektron ugyanazon a pályán legyen – csak azt, hogy a spinjük is azonos legyen. A spin nem a részecske „pörgése” a szó klasszikus értelmében: egy pontszerű elektron nem foroghat.',
        related: ['hidrogenatom', 'impulzusmomentum', 'hullamfuggveny', 'boltzmann-eloszlas'],
        models: ['atom'] },
      { id: 'kotesi-energia', term: 'Atommag, kötési energia, maghasadás és magfúzió', en: 'nuclear binding energy, fission and fusion', topic: 'modern',
        short: 'Az atommag tömege kisebb alkotórészei tömegének összegénél; a különbség (tömeghiány) c²-szerese a kötési energia. Az egy nukleonra jutó kötési energia a vas környékén a legnagyobb, ezért a nehéz magok hasadása és a könnyűek fúziója energiát szabadít fel.',
        prereq: ['fizika-bsc/tomeg-energia', 'fizika-bsc/radioaktiv-bomlas'],
        text: 'Az atommag protonokból és neutronokból (**nukleonokból**) áll, amelyeket az **erős kölcsönhatás** tart össze. Ez a protonok elektromos taszításánál jóval erősebb, de **rövid hatótávolságú** (kb. 1–2 fm): csak a szomszédos nukleonok között hat. A nehezebb magokban ezért több neutron kell a stabilitáshoz.\n\n**Tömeghiány és kötési energia**: `E_k = Δm·c²`, ahol Δm a szabad nukleonok és a mag tömegének különbsége. 1 u tömegnek 931,5 MeV energia felel meg. A kötési energia az az energia, amely a mag alkotórészeire bontásához **szükséges** – minél nagyobb, annál stabilabb a mag.\n\n**Az egy nukleonra jutó kötési energia görbéje**: a könnyű magoknál meredeken nő, a vas–nikkel környékén (≈ 8,8 MeV/nukleon) maximális, utána lassan csökken (urán ≈ 7,6 MeV/nukleon). Ebből következik:\n\n- **maghasadás**: egy nehéz mag (pl. U-235 neutronbefogás után) két közepes magra hasad; hasadásonként kb. **200 MeV** szabadul fel, és 2–3 új neutron, amelyek **láncreakciót** indíthatnak (atomerőmű: szabályozott; atombomba: szabályozatlan);\n- **magfúzió**: könnyű magok egyesülése. A deutérium–trícium fúzió (D + T → He-4 + n) 17,6 MeV-ot ad. A csillagok energiaforrása ez (a Napban a hidrogén héliummá alakul). Földi megvalósítását nehezíti, hogy a pozitív magok taszítását csak több tízmillió fokos plazmában lehet legyőzni.\n\nAz energiasűrűség óriási: 1 kg U-235 teljes hasadása kb. 8·10¹³ J-t ad, a szén égésének (néhány tíz MJ/kg) néhány milliószorosát – mert a magerők milliószor erősebbek a kémiai kötéseket létrehozó elektromos kölcsönhatásnál.',
        example: 'Deuteron: m_p + m_n = 1,007276 u + 1,008665 u = 2,015941 u, a deuteron tömege 2,013553 u. A tömeghiány 0,002388 u, a kötési energia `0,002388·931,5 ≈ 2,22 MeV` – ennyi energiájú gammafotonnal bontható fel.',
        pitfall: 'A kötési energia nem „a magban tárolt, kinyerhető energia”, hanem ellenkezőleg: amennyivel kisebb a kötött rendszer energiája. Energia akkor szabadul fel, ha a végtermékek **erősebben** kötöttek (nagyobb az egy nukleonra jutó kötési energiájuk), mint a kiindulási magok.',
        related: ['tomeg-energia', 'radioaktiv-bomlas', 'hullamfuggveny', 'de-broglie'],
        models: ['atom'] }
    ]
  });
})();
