/* Modell: Forma–1-es autó (2022–2025-ös szabálykorszak) – oldalnézet, áttetsző burkolattal.
 * Koordináták méterben: m = hosszirányú távolság az első szárny elejétől (az orr balra néz),
 * h = magasság a talaj fölött. 1 m = 140 képpont. A burkolat (oldaldoboz, motorfedél) áttetsző,
 * alatta látszik az erőforrás, a turbó, az MGU-K, az akkumulátor és a sebességváltó. */
(function () {
  var S0 = 140, X0 = 95, G = 380;            // lépték, az autó eleje, a talaj képernyő-y koordinátája
  var NS = ' pointer-events="none"';
  var shade = STUDIE.draw.shade;
  function X(m) { return X0 + m * S0; }
  function Y(h) { return G - h * S0; }
  function P(p) { return X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1); }
  function B(m, h) { return [Math.round(X(m)), Math.round(Y(h))]; }
  /* Szétszedéskor ide (képernyő-koordináta) kerüljön az alkatrész (m, h) pontja. */
  function T(m, h, tx, ty) { return [Math.round(tx - X(m)), Math.round(ty - Y(h))]; }
  function poly(pts, fill, stroke, w, extra) {
    return '<polygon points="' + pts.map(P).join(' ') + '" fill="' + fill + '" stroke="' + (stroke || 'rgba(0,0,0,.4)') + '" stroke-width="' + (w == null ? 1 : w) + '" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  function line(pts, color, w, extra) {
    return '<polyline points="' + pts.map(P).join(' ') + '" fill="none" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  function circ(m, h, r, fill, stroke, w, extra) {
    return '<circle cx="' + X(m).toFixed(1) + '" cy="' + Y(h).toFixed(1) + '" r="' + (r * S0).toFixed(1) + '" fill="' + fill + '" stroke="' + (stroke || 'none') + '" stroke-width="' + (w || 0) + '"' + (extra || '') + '/>';
  }
  /* Szárnyprofil a (m0, h0) belépőéltől a (m1, h1) kilépőélig, t legnagyobb vastagsággal. Az ív „hasa” lefelé néz (fordított szárny). */
  function foil(m0, h0, m1, h1, t, fill, stroke) {
    var dx = m1 - m0, dh = h1 - h0, L = Math.sqrt(dx * dx + dh * dh), nx = -dh / L, nh = dx / L, up = [], lo = [], i;
    for (i = 0; i <= 12; i++) {
      var s = i / 12, th = t * 2.6 * Math.sqrt(s) * (1 - s) * (1 - 0.35 * s), camber = -t * 0.9 * Math.sin(Math.PI * s);
      var cm = m0 + dx * s + nx * camber, ch = h0 + dh * s + nh * camber;
      up.push([cm + nx * th / 2, ch + nh * th / 2]); lo.push([cm - nx * th / 2, ch - nh * th / 2]);
    }
    return poly(up.concat(lo.reverse()), fill, stroke || shade(fill, 0.55), 0.8);
  }
  function txt(m, h, s, size, fill, extra) {
    return '<text x="' + X(m).toFixed(1) + '" y="' + Y(h).toFixed(1) + '" font-size="' + (size || 9) + '" fill="' + (fill || '#fff') + '" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle"' + NS + (extra || '') + '>' + s + '</text>';
  }

  var FW = 1.0, RW = 4.6, R = 0.36;           // első és hátsó tengely (tengelytáv 3,6 m), keréksugár (18 col)

  var defs = '<defs>' +
    '<linearGradient id="f1-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f86d6"/><stop offset=".55" stop-color="#2556a8"/><stop offset="1" stop-color="#173a78"/></linearGradient>' +
    '<linearGradient id="f1-cover" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(79,134,214,.42)"/><stop offset="1" stop-color="rgba(23,58,120,.30)"/></linearGradient>' +
    '<linearGradient id="f1-metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d5dbe3"/><stop offset=".5" stop-color="#a3adba"/><stop offset="1" stop-color="#6f7a88"/></linearGradient>' +
    '<linearGradient id="f1-hot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffcf6b"/><stop offset=".6" stop-color="#f2702a"/><stop offset="1" stop-color="#b83d1c"/></linearGradient>' +
    '<linearGradient id="f1-carbon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a505a"/><stop offset="1" stop-color="#22262c"/></linearGradient>' +
    '<radialGradient id="f1-disc" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#3a3533"/><stop offset=".55" stop-color="#8a3c22"/><stop offset=".85" stop-color="#e2672a"/><stop offset="1" stop-color="#ffb35c"/></radialGradient>' +
    '<radialGradient id="f1-tyre" cx="50%" cy="50%" r="50%"><stop offset=".6" stop-color="#2c3036"/><stop offset=".92" stop-color="#1a1c20"/><stop offset="1" stop-color="#0f1013"/></radialGradient>' +
    '</defs>';

  // ---------- Háttér: cím, talaj, menetszél ----------
  function arrow(x1, y1, x2, y2, col) {
    return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' M' + (x2 - 7) + ' ' + (y2 - 4) + ' L' + x2 + ' ' + y2 + ' L' + (x2 - 7) + ' ' + (y2 + 4) + '" stroke="' + col + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  }
  var AIR = '#5fa8dc';
  var backdrop = defs +
    '<text class="lbl" x="14" y="24" font-size="16">Forma–1-es autó oldalnézetben</text>' +
    '<text class="lbl-muted" x="14" y="42">2022–2025-ös szabályok · a burkolat áttetsző, alatta a hibrid erőforrás és a hajtáslánc</text>' +
    '<line x1="10" y1="' + G + '" x2="950" y2="' + G + '" stroke="#8a94a3" stroke-width="1.5" stroke-dasharray="6 5"/>' +
    arrow(18, Y(0.2), 70, Y(0.2), AIR) + arrow(18, Y(0.5), 70, Y(0.5), AIR) + arrow(18, Y(0.8), 70, Y(0.8), AIR) +
    '<text class="lbl-muted" x="16" y="' + (Y(0.95)) + '" font-size="11">menetszél</text>' +
    '<text class="lbl-muted" x="16" y="' + (G + 16) + '" font-size="11">← menetirány</text>';

  // ---------- 1. Első szárny ----------
  var fwing = foil(0.02, 0.07, 0.34, 0.085, 0.035, '#2a2f37') +
    foil(0.22, 0.11, 0.46, 0.15, 0.03, '#2556a8') +
    foil(0.34, 0.15, 0.55, 0.21, 0.026, '#2a2f37') +
    foil(0.45, 0.20, 0.63, 0.27, 0.022, '#f2a33a');
  fwing += poly([[0.0, 0.04], [0.40, 0.04], [0.62, 0.10], [0.66, 0.29], [0.50, 0.31], [0.20, 0.20], [0.0, 0.12]], 'rgba(150,162,180,.32)', '#5b6675', 1.4);
  fwing += line([[0.04, 0.045], [0.45, 0.045]], '#f2a33a', 2);

  // ---------- 2. Hátsó szárny (főszárny, véglap, gerendaszárny, tartóoszlop) ----------
  var rwing = poly([[4.94, 0.38], [5.44, 0.38], [5.47, 0.88], [5.42, 0.98], [5.10, 1.00], [4.95, 0.94]], 'rgba(150,162,180,.22)', '#5b6675', 1.6) +
    line([[4.92, 0.42], [5.06, 0.82]], '#2a2f37', 5) +
    foil(4.92, 0.44, 5.20, 0.45, 0.04, '#2a2f37') +
    foil(4.97, 0.82, 5.29, 0.86, 0.05, '#2556a8');
  rwing += line([[4.96, 0.40], [5.43, 0.40]], '#f2a33a', 2);

  // ---------- 3. DRS (állítható felső lap + működtető) ----------
  var drs = '<g' + NS + ' opacity=".55">' + foil(5.24, 0.905, 5.46, 0.915, 0.018, 'none', '#e5484d').replace('stroke-width="0.8"', 'stroke-width="1.2" stroke-dasharray="3 2"') + '</g>' +
    poly([[5.235, 0.875], [5.275, 0.875], [5.275, 0.945], [5.235, 0.945]], '#c9ced6', '#555', 0.8) +
    foil(5.24, 0.90, 5.43, 0.985, 0.03, '#f2a33a');

  // ---------- 4. Padlólemez (Venturi-csatornák bejárata, csúszólap) ----------
  var floor = poly([[1.42, 0.035], [4.55, 0.035], [4.55, 0.075], [2.0, 0.09], [1.42, 0.10]], 'url(#f1-carbon)', '#6b7482', 1) +
    poly([[1.42, 0.10], [1.50, 0.27], [1.66, 0.28], [1.95, 0.10]], '#2e333b', '#6b7482', 1) +
    line([[1.52, 0.11], [1.58, 0.25]], '#6b7482', 1) + line([[1.62, 0.11], [1.67, 0.25]], '#6b7482', 1) +
    poly([[1.70, 0.012], [4.20, 0.012], [4.20, 0.035], [1.70, 0.035]], '#c9a66b', '#8a6a3a', 0.8) +
    line([[1.55, 0.06], [4.4, 0.06]], '#f2a33a', 1.5);

  // ---------- 5. Diffúzor ----------
  var diff = poly([[4.45, 0.035], [4.85, 0.05], [5.16, 0.33], [5.12, 0.37], [4.86, 0.20], [4.45, 0.08]], 'url(#f1-carbon)', '#6b7482', 1.2) +
    line([[4.88, 0.08], [5.08, 0.30]], '#7b8594', 1.1) + line([[4.95, 0.07], [5.12, 0.25]], '#7b8594', 1.1);

  // ---------- 6. Halo ----------
  var halo = '<path d="M' + P([2.02, 0.71]).replace(',', ' ') + ' C' + P([2.06, 0.86]).replace(',', ' ') + ' ' + P([2.15, 0.93]).replace(',', ' ') + ' ' + P([2.40, 0.945]).replace(',', ' ') +
    ' S' + P([2.74, 0.93]).replace(',', ' ') + ' ' + P([2.80, 0.78]).replace(',', ' ') + '" fill="none" stroke="rgba(0,0,0,0)" stroke-width="16"/>';
  halo += halo.replace('stroke="rgba(0,0,0,0)" stroke-width="16"', 'stroke="#2d3138" stroke-width="7" stroke-linecap="round"') +
    halo.replace('stroke="rgba(0,0,0,0)" stroke-width="16"', 'stroke="#8d97a5" stroke-width="2.2" stroke-linecap="round"' + NS);
  halo += poly([[1.99, 0.70], [2.06, 0.70], [2.06, 0.76], [1.99, 0.74]], '#2d3138', '#15181c', 0.8);

  // ---------- 7. Monocoque (túlélőcella) + orr + áttetsző burkolat ----------
  var tub = poly([[0.05, 0.15], [0.40, 0.27], [1.0, 0.47], [1.5, 0.60], [1.95, 0.70], [2.72, 0.70], [2.80, 0.95], [3.08, 0.97], [3.08, 0.60], [3.02, 0.12],
    [1.45, 0.12], [1.15, 0.20], [0.6, 0.17], [0.08, 0.10]], 'url(#f1-body)', '#123066', 1.4);
  tub += line([[0.25, 0.20], [1.0, 0.43], [1.9, 0.62]], '#f2a33a', 3) + line([[2.2, 0.30], [2.9, 0.30]], 'rgba(255,255,255,.35)', 1.2, ' stroke-dasharray="4 3"');
  // levegőbeömlő a pilóta feje fölött, bukócső
  tub += poly([[2.80, 0.95], [2.86, 0.95], [2.86, 0.84], [2.77, 0.84]], '#11151a', '#11151a', 0.8);
  // pilóta sisakja és a vezetőfülke pereme
  tub += circ(2.40, 0.79, 0.115, '#f2d04a', '#8a6d12', 1.2) +
    poly([[2.30, 0.80], [2.43, 0.86], [2.47, 0.80], [2.32, 0.76]], '#1b2a3a', '#1b2a3a', 0.6) +
    line([[1.95, 0.705], [2.72, 0.705]], '#123066', 3);
  // visszapillantó tükör
  tub += line([[1.84, 0.66], [1.84, 0.76]], '#1b2a3a', 2.5) + poly([[1.76, 0.75], [1.90, 0.76], [1.90, 0.81], [1.78, 0.80]], '#2556a8', '#123066', 1);
  // áttetsző oldaldoboz és motorfedél
  var cover = poly([[2.05, 0.62], [2.6, 0.66], [2.86, 0.74], [3.08, 0.97], [3.45, 0.88], [4.0, 0.70], [4.45, 0.56], [4.72, 0.48], [4.72, 0.40],
    [4.3, 0.33], [3.9, 0.12], [2.05, 0.12]], 'url(#f1-cover)', 'rgba(37,86,168,.9)', 1.4, NS) +
    poly([[2.05, 0.36], [2.12, 0.36], [2.12, 0.62], [2.05, 0.62]], '#11151a', '#11151a', 0.6) +
    line([[2.6, 0.12], [3.3, 0.55], [4.0, 0.64]], 'rgba(37,86,168,.6)', 1, NS);
  var mono = tub + cover;

  // ---------- 8. Belső égésű motor (V6) ----------
  var ice = poly([[3.08, 0.13], [3.64, 0.13], [3.64, 0.50], [3.08, 0.50]], 'url(#f1-metal)', '#4d5563', 1.2) +
    poly([[3.10, 0.50], [3.62, 0.50], [3.60, 0.58], [3.12, 0.58]], '#c23a3a', '#7a1f1f', 1) +
    poly([[3.14, 0.58], [3.50, 0.58], [3.46, 0.66], [3.18, 0.66]], '#8d97a5', '#4d5563', 0.8);
  [3.18, 3.34, 3.50].forEach(function (m) { ice += circ(m, 0.33, 0.045, '#6f7a88', '#4d5563', 0.8); });
  ice += line([[3.18, 0.40], [3.30, 0.46], [3.55, 0.47], [3.66, 0.56]], '#b8763a', 3.5) +
    line([[3.34, 0.40], [3.42, 0.45], [3.66, 0.56]], '#b8763a', 3.5) +
    line([[3.50, 0.40], [3.66, 0.56]], '#b8763a', 3.5);
  ice += txt(3.36, 0.20, 'V6', 11, '#2b3038');

  // ---------- 9. Turbófeltöltő + MGU-H ----------
  var turbo = line([[3.02, 0.62], [3.70, 0.62]], '#6f7a88', 3) +
    '<ellipse cx="' + X(3.03).toFixed(1) + '" cy="' + Y(0.62).toFixed(1) + '" rx="10" ry="12" fill="url(#f1-metal)" stroke="#4d5563" stroke-width="1"/>' +
    '<circle cx="' + X(3.03).toFixed(1) + '" cy="' + Y(0.62).toFixed(1) + '" r="4" fill="#4d5563"/>' +
    poly([[3.24, 0.59], [3.44, 0.59], [3.44, 0.65], [3.24, 0.65]], '#8a63d2', '#4e3384', 1) +
    '<ellipse cx="' + X(3.72).toFixed(1) + '" cy="' + Y(0.62).toFixed(1) + '" rx="11" ry="13" fill="url(#f1-hot)" stroke="#8a2f14" stroke-width="1"/>' +
    '<circle cx="' + X(3.72).toFixed(1) + '" cy="' + Y(0.62).toFixed(1) + '" r="4" fill="#8a2f14"/>' +
    line([[3.78, 0.60], [4.2, 0.55], [4.74, 0.49]], '#b8763a', 5) + line([[4.70, 0.495], [4.76, 0.488]], '#3a2a20', 5);

  // ---------- 10. MGU-K ----------
  var mguk = poly([[3.06, 0.14], [3.30, 0.14], [3.32, 0.17], [3.32, 0.27], [3.30, 0.30], [3.06, 0.30], [3.04, 0.27], [3.04, 0.17]], '#8a63d2', '#4e3384', 1.2);
  for (var f = 0; f < 5; f++) mguk += line([[3.09 + f * 0.045, 0.16], [3.09 + f * 0.045, 0.28]], 'rgba(255,255,255,.3)', 1.2);
  mguk += line([[2.96, 0.20], [3.04, 0.22]], '#f28a1e', 3);

  // ---------- 11. Akkumulátor (energiatároló) ----------
  var batt = poly([[2.50, 0.13], [2.96, 0.13], [2.96, 0.25], [2.50, 0.25]], '#f28a1e', '#8a4a0c', 1.2);
  for (var c = 1; c < 6; c++) batt += line([[2.50 + c * 0.077, 0.14], [2.50 + c * 0.077, 0.24]], 'rgba(0,0,0,.25)', 1);
  batt += line([[2.51, 0.19], [2.95, 0.19]], 'rgba(0,0,0,.25)', 1);

  // ---------- 12. Sebességváltó (+ hátsó gyűrődőzóna) ----------
  var gbox = poly([[3.64, 0.14], [4.40, 0.17], [4.72, 0.28], [4.72, 0.42], [4.40, 0.45], [3.64, 0.48]], 'url(#f1-carbon)', '#6b7482', 1.2) +
    poly([[4.72, 0.30], [4.98, 0.33], [4.98, 0.41], [4.72, 0.42]], '#3a4048', '#15181c', 1);
  [[3.82, 0.31, 0.10], [4.04, 0.31, 0.075], [4.22, 0.31, 0.06]].forEach(function (g) {
    gbox += circ(g[0], g[1], g[2], 'none', '#9aa3b0', 1.4, ' stroke-dasharray="2.5 1.8"') + circ(g[0], g[1], g[2] * 0.3, '#9aa3b0');
  });
  gbox += poly([[4.98, 0.34], [5.01, 0.34], [5.01, 0.40], [4.98, 0.40]], '#ff3b3b', '#a01010', 0.6);

  // ---------- 13. Felfüggesztés (első és hátsó lengőkarok, tolórudak) ----------
  var SC = '#3a4048';
  var susp = line([[FW + 0.03, 0.50], [1.45, 0.565]], SC, 3.2) + line([[FW + 0.03, 0.50], [1.72, 0.60]], SC, 3.2) +
    line([[FW + 0.02, 0.20], [1.42, 0.22]], SC, 3.2) + line([[FW + 0.02, 0.20], [1.80, 0.17]], SC, 3.2) +
    line([[FW + 0.04, 0.22], [1.55, 0.60]], '#6b7482', 2.6) +
    line([[RW - 0.03, 0.50], [4.10, 0.44]], SC, 3.2) + line([[RW - 0.03, 0.50], [3.86, 0.46]], SC, 3.2) +
    line([[RW - 0.02, 0.19], [4.12, 0.20]], SC, 3.2) + line([[RW - 0.02, 0.19], [3.84, 0.18]], SC, 3.2) +
    line([[RW - 0.04, 0.21], [4.05, 0.43]], '#6b7482', 2.6) +
    line([[FW, 0.08], [FW, 0.62]], 'rgba(0,0,0,0)', 1) + line([[RW, 0.08], [RW, 0.62]], 'rgba(0,0,0,0)', 1);

  // ---------- 14. Gumiabroncsok és felnik ----------
  function wheel(m) {
    var s = circ(m, R, R, 'url(#f1-tyre)', '#0b0c0e', 1) +
      circ(m, R, R * 0.83, 'none', '#e5484d', 2.4) +
      circ(m, R, 0.229, '#2f343b', '#5b636e', 1.2);
    for (var k = 0; k < 10; k++) {
      var a = k / 10 * 2 * Math.PI;
      s += line([[m + 0.17 * Math.cos(a), R + 0.17 * Math.sin(a)], [m + 0.225 * Math.cos(a), R + 0.225 * Math.sin(a)]], '#5b636e', 1.4);
    }
    return s;
  }
  var tyres = wheel(FW) + wheel(RW);

  // ---------- 15. Fékek (karbon tárcsa + nyereg, „átlátva” a felnin) ----------
  function brake(m, ang) {
    var s = circ(m, R, 0.165, 'url(#f1-disc)', '#6b2a14', 1);
    for (var k = 0; k < 18; k++) {
      var a = k / 18 * 2 * Math.PI;
      s += circ(m + 0.12 * Math.cos(a), R + 0.12 * Math.sin(a), 0.008, 'rgba(0,0,0,.45)');
    }
    s += circ(m, R, 0.06, '#5b636e', '#2f343b', 1);
    var cx = m + 0.13 * Math.cos(ang), ch = R + 0.13 * Math.sin(ang), dx = Math.cos(ang + 1.5708) * 0.08, dh = Math.sin(ang + 1.5708) * 0.08,
      ox = Math.cos(ang) * 0.045, oh = Math.sin(ang) * 0.045;
    s += poly([[cx - dx - ox, ch - dh - oh], [cx + dx - ox, ch + dh - oh], [cx + dx + ox, ch + dh + oh], [cx - dx + ox, ch - dh + oh]], '#c23a3a', '#6a1515', 1);
    return s;
  }
  var brakes = brake(FW, 2.4) + brake(RW, 0.8);

  // ---------- 16. Kormánykerék ----------
  var KM = 2.06, KH = 0.70;
  function kp(dm, dh) { return [KM + dm, KH + dh]; }
  var wheelS = poly([kp(-0.13, -0.05), kp(-0.15, 0.03), kp(-0.11, 0.07), kp(0.11, 0.07), kp(0.15, 0.03), kp(0.13, -0.05), kp(0.07, -0.07), kp(-0.07, -0.07)], '#2a2f37', '#0f1114', 1.2) +
    poly([kp(-0.15, 0.03), kp(-0.11, 0.07), kp(-0.09, -0.06), kp(-0.13, -0.05)], '#c23a3a', '#6a1515', 0.6) +
    poly([kp(0.15, 0.03), kp(0.11, 0.07), kp(0.09, -0.06), kp(0.13, -0.05)], '#c23a3a', '#6a1515', 0.6) +
    poly([kp(-0.05, 0.0), kp(0.05, 0.0), kp(0.05, 0.05), kp(-0.05, 0.05)], '#103a2a', '#5fd38a', 0.8);
  [[-0.075, 0.035, '#f2a33a'], [0.075, 0.035, '#5fa8dc'], [-0.07, -0.025, '#e5484d'], [0.07, -0.025, '#5fd38a'], [-0.025, -0.035, '#d8dde5'], [0.025, -0.035, '#d8dde5']].forEach(function (b) {
    wheelS += circ(KM + b[0], KH + b[1], 0.011, b[2], '#0f1114', 0.5);
  });

  STUDIE.addModel({
    id: 'f1-auto',
    title: 'Forma–1-es autó',
    icon: '🏎️',
    color: '#2556a8',
    category: 'Járművek',
    keywords: 'Forma-1 Formula 1 F1 versenyautó autóverseny első szárny hátsó szárny DRS padlólemez Venturi-csatorna talajhatás ground effect diffúzor halo monocoque túlélőcella szénszál karbon kompozit erőforrás power unit V6 turbó turbófeltöltő MGU-K MGU-H ERS hibrid energia-visszanyerés akkumulátor energiatároló sebességváltó felfüggesztés lengőkar pushrod pullrod gumiabroncs Pirelli gumi fék karbon fék brake-by-wire kormánykerék leszorítóerő aerodinamika szélcsatorna CFD Reynolds-szám 2026 aktív aerodinamika',
    summary: 'Egy repülőgépszárnyakkal „földhöz szorított” hibrid versenyautó: minden alkatrésze a gyorsulásért, a tapadásért és a biztonságért van.',
    scale: 'kb. 5,6 m hosszú, 2 m széles, kb. 1 m magas; legalább kb. 800 kg pilótával (2025)',
    viewBox: '0 0 960 560',
    backdrop: backdrop,
    intro: 'Egy Forma–1-es autó olyan, mint egy **fejjel lefelé fordított repülőgép**: a szárnyai és a padlója nem felemelik, hanem **a talajhoz szorítják**. Minél gyorsabban megy, annál erősebben tapad, így a kanyarokban sokszorosát bírja annak, amit egy utcai autó.\n\nA hajtást egy **hibrid erőforrás** adja: egy kicsi, 1,6 literes turbós V6 benzinmotor és mellette villanymotor-generátorok, amelyek fékezéskor és a kipufogógázból energiát nyernek vissza egy akkumulátorba. A pilóta egy szénszálas **túlélőcellában** ül, a feje fölött a titán **halo** védi.\n\nA rajz a **2022–2025-ös szabályok** szerinti autót mutatja; ahol a **2026-tól** érvényes új szabályok mást írnak elő, azt külön jelezzük. A burkolat áttetsző, így látod alatta a motort. A **Szétszedés** gombbal szétnyithatod az autót.',
    parts: [
      {
        id: 'elso-szarny', z: 3, name: 'Első szárny', svg: fwing, explode: [-30, 110], badge: B(0.35, 0.2), lesson: 'sport/forma1',
        en: 'front wing (multi-element, with endplates)',
        terms: ['e-mobilitas/legellenallas'],
        what: 'Az autó legelső része. Több egymás fölötti, ívelt **szárnyelemből** áll, amelyek fordított repülőgépszárnyként **lefelé** nyomják az autó orrát. Ez adja az első kerekek tapadását a kanyarokban.\n\nLegalább ilyen fontos a másik feladata: **irányítja a levegőt** az autó többi része felé, a kerekek mellett és a padló alá. Egy rosszul beállított első szárny az egész autó aerodinamikáját elrontja.\n\nA szárnyelemek szögét a boxkiállásnál pár másodperc alatt állíthatják, így igazítják az autó egyensúlyát.',
        madeOf: '**Szénszálas kompozit**: szénszálas szövetrétegek műgyantában, néhol méhsejtszerkezetű maggal. Nagyon könnyű és merev, a pálya bukkanóin mégsem rezeghet túl sokat: az FIA terheléses próbákkal ellenőrzi, mennyire hajlik.',
        how: 'A formát CNC-maróval munkálják ki, a szénszálas rétegeket kézzel rakják bele, majd **autoklávban** hővel és nyomással kikeményítik. Utána csiszolják, festik, és a mérési adatokat összevetik a szélcsatornás modellel.',
        uni: 'A szárnyelem leszorítóereje `F_L = ½·ρ·v²·A·C_L`, ahol ρ ≈ 1,2 kg/m³ a levegő sűrűsége, A a szárnyfelület, C_L a felhajtóerő-tényező (itt negatív irányú, leszorító). A több elemre bontás (főszárny + lapok) azért kell, mert a lapok közti **résen** átáramló nagy energiájú levegő „feltölti” a következő elem határrétegét, így nagyobb állásszögnél sem válik le az áramlás. A talaj közelében a szárny alatt felgyorsul a levegő, ezért a C_L nő (**talajhatás**), de túl alacsonyan az áramlás leválik, és a leszorítás hirtelen csökken. A **Reynolds-szám** egy kb. 0,25 m-es húrhosszú elemre 80 m/s-nál `Re = ρ·v·L/μ ≈ 1,2·80·0,25/1,8·10⁻⁵ ≈ 1,3·10⁶`, ami turbulens határréteget jelent. A 2022-es szabályok az első szárnyat egyszerűsítették, hogy kevesebb örvényt keltsen, és a követő autó is közelebb tudjon menni (**dirty air** csökkentése). **2026-tól** az első szárny is **aktív**: egyenesben laposabb állásba vált, a kanyarban visszaáll.',
        fact: 'Az első szárny tömege csak néhány kilogramm, nagy sebességnél mégis akár több száz kilogramm súlyának megfelelő leszorítóerőt ad.'
      },
      {
        id: 'hatso-szarny', z: 6, name: 'Hátsó szárny', svg: rwing, explode: [45, -55], badge: B(5.12, 0.62), lesson: 'sport/forma1',
        en: 'rear wing (main plane, endplates, beam wing)',
        terms: ['e-mobilitas/legellenallas', 'e-mobilitas/menetellenallas'],
        what: 'A hátsó kerekeket szorítja le, hogy a motor ereje ne „pörgesse el” őket, és kanyarban se csússzon ki az autó hátulja. A **főszárnyból**, a felette lévő állítható lapból (ez a **DRS**), a két oldalsó **véglapból** és alul a kisebb **gerendaszárnyból** áll.\n\nA pályától függően más-más szárnyat használnak: Monacóban nagyot (sok kanyar, kis sebesség), Monzában laposat (hosszú egyenesek, kis légellenállás).',
        madeOf: '**Szénszálas kompozit**, titán és acél rögzítőelemek. A tartóoszlop a sebességváltóhoz és a hátsó gyűrődőzónához csatlakozik.',
        how: 'Mint az első szárnyat: szénszálas rétegek formában, autoklávos kikeményítés. A kész szárnyat terheléses próbán ellenőrzik, mert a szabály előírja, legfeljebb mennyit hajolhat el adott erő alatt.',
        uni: 'A szárny nemcsak leszorítást, hanem **indukált ellenállást** is termel: véges szárnyfesztávnál a nyomáskülönbség a szárnyvégeken örvényt kelt, és `C_D,i = C_L²/(π·e·AR)`, ahol AR a karcsúság (fesztáv²/felület), e az Oswald-tényező. Az F1-es hátsó szárny nagyon kis karcsúságú (a szélességét a szabály korlátozza), ezért a **véglapok** feladata az örvények gyengítése. A hátsó szárny és a gerendaszárny együtt a **diffúzor** kiáramlását is „szívja”, így a padló leszorítását is növeli. Az autó teljes ellenállása `F_D = ½·ρ·v²·C_D·A`; az ehhez szükséges teljesítmény `P = F_D·v`, azaz **v³-nel** nő. Ezért kis légellenállású szárny kell a gyors pályákra. **2026-tól** az autók leszorítóereje és légellenállása is csökken, a hátsó szárny felső lapja pedig az egyeneseken minden autónál automatikusan kinyílik (**aktív aerodinamika**, „egyenes mód”), a kanyarokban zárul („kanyar mód”).'
      },
      {
        id: 'drs', z: 7, name: 'DRS (állítható hátsó szárnylap)', svg: drs, explode: [25, -150], badge: B(5.36, 1.06), lesson: 'sport/forma1',
        en: 'Drag Reduction System (DRS) flap and actuator',
        terms: ['e-mobilitas/legellenallas', 'e-mobilitas/menetellenallas'],
        what: 'A **DRS** (Drag Reduction System, légellenállás-csökkentő rendszer) a hátsó szárny felső lapja, amelyet egy kis hidraulikus munkahenger fel tud nyitni (a rajzon szaggatott vonal mutatja a nyitott állást). Nyitva kisebb a légellenállás, így az autó gyorsabb az egyenesben.\n\nA 2011 és 2025 közötti szabályok szerint a pilóta versenyben csak kijelölt **DRS-zónákban** nyithatta ki, és csak akkor, ha egy mérési ponton **1 másodpercen belül** volt az előtte haladó autó mögött. Így könnyebb előzni.\n\n**2026-tól** a DRS megszűnt: helyette minden autó első és hátsó szárnya **aktív**, az előzést pedig egy elektromos többletteljesítmény (**előzési mód**) segíti.',
        madeOf: 'Szénszálas lap, alumínium vagy titán csuklópántok, kis **hidraulikus** munkahenger, amelyet az autó hidraulikarendszere hajt.',
        how: 'A lapot ugyanúgy kompozitból készítik, mint a szárnyat. A működtetőt és a csuklókat finommechanikai üzemben gyártják, és sok ezer nyitás-zárás ciklussal tesztelik, mert egy beragadt DRS veszélyes lehet a következő kanyarban.',
        uni: 'Állandó hajtóteljesítménynél a végsebességet az egyensúly adja: `P = ½·ρ·C_D·A·v³` (a gördülési ellenállást elhanyagolva), így `v_max ∝ (C_D·A)^(−1/3)`. Ha a nyitott lap pl. 10%-kal csökkenti a C_D·A értéket, a végsebesség kb. `0,9^(−1/3) ≈ 1,036`-szorosára, azaz kb. 3,6%-kal nő; 320 km/h körül ez kb. 10–12 km/h. A gyakorlatban a nyereség pályánként kb. 10–20 km/h. A nyitott lap a leszorítást is csökkenti, ezért a pilóta fékezésnél (vagy a fékpedál érintésére automatikusan) zárja. A szélárnyék (slipstream) is segít: a követő autó előtti levegő kisebb sebességgel érkezik, mert az elöl haladó autó maga után sodorja.',
        fact: 'A DRS-t 2011-ben vezették be, mert a nagy leszorítóerejű autók mögött kavargó „piszkos levegőben” nagyon nehéz volt előzni.'
      },
      {
        id: 'padlolemez', z: 1, name: 'Padlólemez (Venturi-csatornák)', svg: floor, explode: [-110, 150], badge: B(2.6, 0.05), lesson: 'sport/forma1',
        en: 'floor with Venturi tunnels (ground-effect underfloor) and plank',
        terms: ['mechanika/szabad-rezges', 'mechanika/rezonancia', 'mechanika/csillapitas'],
        what: 'A 2022-es szabályok óta az autó **legfontosabb aerodinamikai része**. Alatta két nagy, ívelt csatorna, ún. **Venturi-csatorna** fut. A levegő itt felgyorsul, ezért a nyomása lecsökken, és az autót **a talajhoz szívja**. Ezt nevezik **talajhatásnak** (ground effect).\n\nA padló alatt van a **csúszólap** (plank) is: ha a verseny végére túlságosan elkopik, mert az autót túl alacsonyra állították, kizárják az autót.\n\nA 2022-es autóknál sokszor látszott a **delfinezés** (porpoising): egyenesben az autó szaporán fel-le pattogott, mert a padló alatti áramlás felváltva tapadt és leszakadt.',
        madeOf: 'Szénszálas kompozit, alatta egy fa alapú kompozitból készült **csúszólap** (plank) titán kopóbetétekkel.',
        how: 'A padló a szélcsatornában és a számítógépes áramlástani szimulációban (**CFD**) a legtöbbet fejlesztett rész. Nagy, összetett kompozit darab, amelyet több részből laminálnak és ragasztanak össze; a csapatok a szezon közben is sokszor hoznak új változatot.',
        uni: 'A csatornában a **kontinuitási egyenlet** (`A₁·v₁ = A₂·v₂`) szerint a szűkülő keresztmetszetben nő a sebesség, a **Bernoulli-egyenlet** (`p + ½·ρ·v² = állandó`, súrlódásmentes, összenyomhatatlan közelítés) szerint pedig csökken a nyomás. A leszorító erő a padló felületén vett nyomáskülönbség integrálja: `F = ∫(p∞ − p)·dA`. A talajhatás érzékeny a **hasmagasságra** (ride height): közelebb a talajhoz nagyobb a leszorítás, de egy kritikus érték alatt a határréteg leválik, és a leszorítás hirtelen leesik. A leszorítás csökken, a rugózás felemeli az autót, a leszorítás visszatér, és újra lenyomja: ez egy **gerjesztett rezgés** (porpoising), amely ha a felfüggesztés saját frekvenciájának közelébe esik, felerősödik. Ellenszere a merevebb rugózás, a nagyobb hasmagasság és a padlóél kialakítása; az FIA 2022 közben függőleges gyorsulási határértéket vezetett be. A talajhatás előnye, hogy a leszorítás nagy része örvények nélkül keletkezik, így a követő autó kevésbé veszít tapadásból.',
        fact: 'A talajhatást először a Lotus használta ki az 1970-es évek végén. 1983-tól a lapos padló kötelezővé tételével betiltották, és csak 2022-ben tért vissza, szigorúan szabályozott formában.'
      },
      {
        id: 'diffuzor', z: 0, name: 'Diffúzor', svg: diff, explode: [65, 125], badge: B(5.04, 0.2), lesson: 'sport/forma1',
        en: 'rear diffuser',
        terms: ['e-mobilitas/legellenallas'],
        what: 'Az autó hátsó, alsó része, ahol a padló alatti csatornák **felfelé ívelnek** és kitágulnak. Itt a padló alól kiáramló, felgyorsult levegő fokozatosan visszalassul a környezeti sebességre. Enélkül a Venturi-csatorna nem tudna olyan erős szívóhatást kelteni.',
        madeOf: '**Szénszálas kompozit** függőleges terelőlemezekkel (strake-ekkel), amelyek a levegőt egyenesen tartják.',
        how: 'A padlóval együtt tervezik és gyártják. Formáját a CFD-ben és a szélcsatornában finomhangolják, mert milliméterek is számítanak.',
        uni: 'A diffúzor **nyomás-visszanyerő** elem: a tágulásban a sebesség csökken, a statikus nyomás nő, a padló elejétől a kilépésig tehát **növekvő nyomás** (kedvezőtlen nyomásgradiens) ellen kell áramolnia a levegőnek. Ha a tágulás túl gyors, a határréteg leválik, és a diffúzor „leáll” (stall). A nyomástényező `C_p = (p − p∞)/(½·ρ·v∞²) = 1 − (v/v∞)²` (Bernoulli szerint); a padló alatt C_p erősen negatív, a diffúzor ezt fokozatosan közelíti a 0-hoz. Minél alacsonyabb nyomásra tud „kiszívni” a diffúzor, annál nagyobb sebességű lehet a padló alatti áramlás, és annál nagyobb a leszorítás. A hátsó szárny és a gerendaszárny alatti alacsony nyomás segít ebben, ezért a kettő együtt működik.'
      },
      {
        id: 'halo', z: 8, name: 'Halo (fejvédő keret)', svg: halo, explode: [0, -95], badge: B(2.40, 0.945), lesson: 'sport/forma1',
        en: 'Halo cockpit protection device',
        terms: ['mechanika/folyashatar', 'mechanika/feszultseg', 'mechanika/rugalmassagi-modulus'],
        what: 'A vezetőfülke fölötti, villásan elágazó **titánkeret**, amely a pilóta fejét védi a lerepülő kerekektől, alkatrészektől és ütközéskor a korláttól. **2018** óta kötelező.\n\nEleinte sokan csúnyának tartották, de azóta több balesetben is életet mentett. **2020-ban Bahreinben** Romain Grosjean autója kettészakadt, és átfúródott a szalagkorláton; a halo megvédte a fejét, és a lángoló roncsból a saját lábán szállt ki.',
        madeOf: '**Titánötvözet** (Ti6Al4V, 5-ös fokozat): nagy szilárdságú, könnyű és korrózióálló. A keret kb. **7 kg**, a burkolatával együtt valamivel több.',
        how: 'A halót csak néhány, az FIA által jóváhagyott gyártó készítheti, azonos szabvány szerint. A csöveket megmunkálják és összehegesztik, majd minden darabot röntgennel és terheléses próbával ellenőriznek.',
        uni: 'Az FIA szabványa szerint a halónak felülről és oldalról is kb. **125 kN** (kb. 12 tonna súlyának megfelelő) kvázistatikus terhelést kell elviselnie úgy, hogy se a keret, se a túlélőcella rögzítése ne menjen tönkre. A Ti6Al4V folyáshatára kb. 830–900 MPa, sűrűsége kb. 4,4 g/cm³ (az acélé 7,85 g/cm³), rugalmassági modulusa kb. 114 GPa. A fajlagos szilárdsága (σ/ρ) így jóval nagyobb, mint a legtöbb acélé. A terhelést a cső **hajlításként** veszi fel: a feszültség `σ = M·y/I`, ezért a csőszelvény (nagy másodrendű nyomaték kis tömeggel) ideális. Legalább ilyen fontos a **rögzítés**: a halo terhelését a szénszálas túlélőcellának kell a lokális beszakadás nélkül átvennie, ezért a monocoque-ot a rögzítési pontoknál megerősítik.',
        fact: 'A halo csak kb. 7 kg-os, de a próbán körülbelül egy emeletes londoni busz súlyának megfelelő terhelést kell kibírnia.'
      },
      {
        id: 'monocoque', z: 1, name: 'Monocoque (túlélőcella) és burkolat', svg: mono, explode: [0, 0], badge: B(2.62, 0.45), lesson: 'sport/forma1',
        en: 'carbon-fibre monocoque (survival cell), nose and bodywork',
        terms: ['mechanika/rugalmassagi-modulus', 'mechanika/szakitodiagram', 'mechanika/masodrendu-nyomatek', 'mechanika/csavaras', 'fizika-bsc/impulzus', 'mechanika/munka-energia'],
        what: 'Az autó „gerince” és a pilóta **páncélja**: egyetlen darabból álló, héjszerkezetű szénszálas cella, amelyben a pilóta ül, és mögötte az üzemanyagtartály van. Ehhez csatlakozik elöl az első felfüggesztés és az **orr**, hátul a motor.\n\nAz orr **gyűrődőzóna**: ütközéskor összetörik, és közben elnyeli a mozgási energiát, hogy a pilótát ért lassulás kisebb legyen. Az oldaldobozokban vannak a hűtők, a motorfedél alatt az erőforrás (a rajzon áttetszők).',
        madeOf: '**Szénszálas kompozit** sok rétegben, közte alumínium vagy aramid **méhsejtszerkezetű** maggal. Az oldalát behatolás elleni **Zylon**-réteg erősíti. Az üzemanyagtartály ütésálló, gumiszerű, kevlárral erősített zsák.',
        how: 'Formába kézzel, pontos sorrendben és irányban rakják le a gyantával előre átitatott szénszálas rétegeket (**prepreg**), vákuumzsákba csomagolják, és **autoklávban** hővel és nyomással kikeményítik. Ezt többször ismétlik. A kész cellának az FIA **töréstesztjein** és terheléses próbáin kell átmennie, mielőtt versenyezhet.',
        uni: 'A szénszálas kompozit előnye a **fajlagos merevség**: egyirányú szénszál–epoxi rétegnél `E ≈ 120–150 GPa` kb. 1,6 g/cm³ sűrűség mellett, ami tömegre vetítve kb. háromszor-négyszer jobb, mint az acélé (210 GPa, 7,85 g/cm³). A rétegek irányát (pl. 0°, ±45°, 90°) úgy választják, hogy a cella a hajlításnak és a **csavarásnak** is ellenálljon. A **szendvicsszerkezet** (két vékony héj, köztük könnyű méhsejtmag) hajlítómerevsége a héjak távolságának négyzetével nő (`I ≈ 2·b·t·(d/2)²`). A gyűrődőzónák a mozgási energiát **progresszív töréssel** nyelik el: a front ütközési próbán kb. 15 m/s (54 km/h) sebességgel csapódó, kb. 780 kg-os próbatest energiája `E = ½·m·v² ≈ ½·780·15² ≈ 88 kJ`. A lassulásra határértékek vonatkoznak; a fékút és az átlagos lassulás kapcsolata `a = v²/(2·s)`, tehát minél hosszabb úton nyeli el az orr az energiát, annál kisebb a pilótát érő g-erő. **2026-tól** az autók kisebbek (tengelytáv legfeljebb 3,4 m, szélesség 1,9 m) és könnyebbek (legalább 768 kg).',
        fact: 'Az első szénszálas monocoque-os F1-es autó az 1981-es McLaren MP4/1 volt. Azóta a túlélőcella annyira erős lett, hogy a pilóták sok nagy erejű balesetből sérülés nélkül szállnak ki.'
      },
      {
        id: 'eroforras', z: 3, name: 'Belső égésű motor (1,6 l V6)', svg: ice, explode: [-10, -175], badge: B(3.36, 0.42), link: 'benzinmotor', lesson: 'sport/forma1',
        en: 'internal combustion engine (ICE): 1.6-litre turbocharged V6',
        terms: ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/elso-fotetel', 'fizika-bsc/idealis-gaz', 'e-mobilitas/hatasfok'],
        what: 'A hibrid **erőforrás** (power unit) benzinmotoros része: egy mindössze **1,6 literes**, hathengeres, V elrendezésű, **turbófeltöltős** motor. A 2014–2025-ös szabályok szerint legfeljebb **15 000 fordulat/perc**-cel foroghat.\n\nA motor egyben az autó **teherhordó** része: a monocoque-hoz csavarozzák, és hozzá csatlakozik hátul a sebességváltó, amelyre a hátsó felfüggesztés és a hátsó szárny kerül.\n\nA verseny alatt csak korlátozott **üzemanyag-áramlás** engedélyezett, ezért nem az számít, mennyit fogyaszt, hanem hogy az üzemanyag energiájának mekkora részét alakítja munkává. A mai F1-es motorok **hőhatásfoka 50% fölötti**, egy átlagos utcai autóé kb. 30–40%.',
        madeOf: 'Alumíniumötvözet blokk és hengerfej, acél főtengely, titán hajtókarok, könnyűfém dugattyúk. A kipufogó-gyűjtőcső **hőálló nikkelötvözetből** (pl. Inconel) készül.',
        how: 'Az alkatrészeket mikrométeres pontossággal munkálják meg, kézzel szerelik össze tiszta teremben, majd **próbapadon** járatják, ahol egész versenyeket szimulálnak. A szabály évente csak néhány erőforrás-elemet enged autónként, ezért a motornak több ezer kilométert kell kibírnia.',
        uni: 'Az Otto-körfolyamat ideális hatásfoka `η = 1 − 1/ε^(κ−1)`; a 2014–2025-ös szabályok legfeljebb 18:1 sűrítési arányt engedtek (`η_ideális ≈ 1 − 18^(−0,4) ≈ 0,69`). A valós hatásfok ennél kisebb a hőveszteség, a súrlódás és a nem pillanatszerű égés miatt; az 50% fölötti értékhez **szegény keverékes**, előkamrás gyújtás (turbulent jet ignition), nagyon gyors égés és az MGU-H által visszanyert kipufogóenergia kellett. Az **üzemanyag-áramlás** 10 500 1/perc fölött legfeljebb 100 kg/h volt: kb. 43 MJ/kg fűtőértékkel ez `100/3600 kg/s · 43 MJ/kg ≈ 1,2 MW` vegyi teljesítmény, amiből kb. 50%-os hatásfokkal kb. 600 kW mechanikai teljesítmény lesz. Az MGU-K 120 kW-jával együtt az erőforrás csúcsteljesítménye nagyjából 1000 LE körül volt. **2026-tól** az áramlást nem tömegben, hanem **energiában** korlátozzák, az üzemanyagnak teljesen **fenntartható** (nem fosszilis) forrásból kell származnia, a sűrítési arány határa 16:1, a belső égésű motor teljesítménye pedig kb. 400 kW-ra csökken.',
        fact: 'A 2014 előtti V8-as F1-motorok hőhatásfoka 30% körül volt, a hibrid erőforrásoké 50% fölé emelkedett: ugyanannyi üzemanyagból jóval több munkát végeznek.'
      },
      {
        id: 'turbo', z: 4, name: 'Turbófeltöltő és MGU-H', svg: turbo, explode: [40, -232], badge: B(3.34, 0.62), lesson: 'sport/forma1',
        en: 'turbocharger with MGU-H (Motor Generator Unit – Heat)',
        terms: ['fizika-bsc/idealis-gaz', 'fizika-bsc/belso-energia', 'fizika-bsc/elso-fotetel'],
        what: 'A **turbófeltöltő** a kipufogógáz energiájával pörget egy **turbinát** (a rajzon a forró, narancssárga csiga), amely egy tengelyen keresztül hajtja a **kompresszort** (ezüst csiga). A kompresszor több levegőt présel a motorba, így több üzemanyag égethető el.\n\nA tengelyre a 2014–2025-ös erőforrásokban egy villamos gép, az **MGU-H** (Motor Generator Unit – Heat, lila) is került. Ez a kipufogógáz **hőenergiájából** áramot termel, vagy fordítva: motorként felpörgeti a turbót, így megszűnik a **turbólyuk** (a késlekedés gázadáskor).\n\n**2026-tól az MGU-H megszűnt**, mert drága és bonyolult volt, és az utcai autókban sem terjedt el.',
        madeOf: 'A turbina hőálló **nikkel-szuperötvözetből**, a kompresszor alumíniumból vagy titánból, a tengely acélból készül, különleges csapágyakkal. Az MGU-H állandó mágneses villamos gép.',
        how: 'A turbinakereket precíziós öntéssel és megmunkálással készítik, majd nagy fordulaton kiegyensúlyozzák. A forgórész-egységet próbapadon a teljes fordulatszám-tartományban tesztelik.',
        uni: 'A turbó **turbo-compound** rendszerként működött: a turbina által kinyert teljesítmény egyik része a kompresszort hajtotta, a többletet az MGU-H villamos energiává alakította, amely közvetlenül az MGU-K-hoz vagy az akkumulátorba juthatott, és a szabályok **nem korlátozták** körönként az MGU-H energiáját. A kompresszor izentropikus munkája tömegegységre `w = c_p·T₁·(Π^((κ−1)/κ) − 1)/η_k`, ahol Π a nyomásviszony; a turbinából nyerhető munka hasonlóan a kipufogógáz hőmérsékletétől és a nyomásviszonytól függ (a 2014–2025-ös szabály a turbó fordulatszámát legfeljebb **125 000 1/perc**-ben maximálta). A sűrített, felmelegedett levegőt töltőlevegő-hűtő hűti vissza, mert hidegebben nagyobb a sűrűsége (`ρ = p/(R·T)`). Az MGU-H nélkül (2026) a turbólyukat más módon, pl. az MGU-K-val és a motorvezérléssel kell kezelni.',
        fact: 'Az F1-es turbó tengelye percenként akár 125 000-et is fordulhatott, ez másodpercenként több mint 2000 fordulat.'
      },
      {
        id: 'mgu-k', z: 4, name: 'MGU-K (villanymotor-generátor)', svg: mguk, explode: [-90, -245], badge: B(3.18, 0.22), link: 'villanymotor', lesson: 'sport/forma1',
        en: 'MGU-K (Motor Generator Unit – Kinetic)',
        terms: ['e-mobilitas/pmsm', 'e-mobilitas/rekuperacio', 'e-mobilitas/inverter', 'villamosmernoki/szinkron-gep'],
        what: 'Az **MGU-K** (Motor Generator Unit – Kinetic) a motor főtengelyéhez kapcsolt **villanymotor-generátor**. Fékezéskor generátorként lassítja a hátsó kerekeket, és a mozgási energia egy részét árammá alakítja (**rekuperáció**). Gyorsításkor motorként plusz teljesítményt ad.\n\nA 2014–2025-ös szabályok szerint legfeljebb **120 kW** (kb. 160 LE) teljesítményt adhatott le. **2026-tól ez kb. 350 kW-ra** (kb. 470 LE) nő, így az autó hajtóteljesítményének közel fele elektromos.',
        madeOf: 'Állandó mágneses szinkrongép: rézzel tekercselt, elektrotechnikai acéllemezekből álló állórész, erős **ritkaföldfém mágnesek** a forgórészben, folyadékhűtésű ház. Vezérlője egy nagy teljesítményű **inverter**.',
        how: 'A tekercseket és a mágneseket nagy pontossággal szerelik, a forgórészt nagy fordulatra kiegyensúlyozzák. A villamos gépet és az invertert együtt tesztelik próbapadon, a versenyen előforduló gyors váltásokkal motor- és generátorüzem között.',
        uni: 'A 2014–2025-ös szabályok szerint az MGU-K körönként legfeljebb **2 MJ**-t tölthetett az akkumulátorba, és az akkumulátorból körönként legfeljebb **4 MJ** juthatott az MGU-K-ba (a különbözetet az MGU-H fedezhette). 120 kW-tal a 4 MJ `t = E/P = 4·10⁶ J / 1,2·10⁵ W ≈ 33 s` teljes teljesítményű rásegítést jelent körönként. A gép nyomatéka `M = P/ω`; nagy fordulatszámon (a szabályos határ 50 000 1/perc volt) kis méretből is nagy teljesítmény nyerhető. A fékerő elosztása bonyolult: a hátsó tengelyen az MGU-K fékező nyomatéka és a súrlódó fék nyomatéka összeadódik, ezt a **brake-by-wire** rendszer hangolja össze. **2026-tól** az MGU-K teljesítménye kb. 350 kW, a körönként visszanyerhető energia kb. kétszeresére nő, így a fékezések és az energiagazdálkodás szerepe még nagyobb lesz.'
      },
      {
        id: 'akkumulator', z: 3, name: 'Akkumulátor (energiatároló)', svg: batt, explode: [-140, -255], badge: B(2.73, 0.19), link: 'akkucella', lesson: 'sport/forma1',
        en: 'Energy Store (ES): lithium-ion battery pack',
        terms: ['e-mobilitas/cellakemia', 'e-mobilitas/c-rata', 'e-mobilitas/belso-ellenallas', 'e-mobilitas/kw-kwh', 'e-mobilitas/bms'],
        what: 'Az **energiatároló** (Energy Store) egy kicsi, de nagyon erős **lítiumion akkumulátor** az üzemanyagtartály alatt, a túlélőcella védett belsejében. Ide kerül a fékezéskor és a kipufogógázból visszanyert energia, és innen kapja az MGU-K az áramot a gyorsításhoz.\n\nNem nagy energiát tárol, hanem nagyon **gyorsan** tud tölteni és kisütni: körönként többször is. A 2014–2025-ös szabályok szerint legalább **20 kg** volt a tömege.',
        madeOf: 'Nagy teljesítményű **lítiumion cellák**, hűtőlemezek, árammérők és feszültségfigyelő elektronika, szigetelt, ütésálló házban. A narancssárga szín itt is a **nagyfeszültséget** jelzi.',
        how: 'A cellákat modulokba, a modulokat a házba építik, majd elektromos és hőtesztnek vetik alá. A boxban a szerelők külön szigetelő védőfelszerelésben dolgoznak, és jelzőfények mutatják, hogy az autó biztonságosan érinthető-e.',
        uni: 'A körönkénti 4 MJ kb. `4·10⁶ J / 3,6·10⁶ J/kWh ≈ 1,1 kWh` töltöttségkülönbség; az akku teljes energiája ennél valamivel nagyobb, hogy a cellák ne a szélső töltöttségi tartományban dolgozzanak. A 120 kW-os teljesítmény ilyen kis kapacitáshoz nagyon nagy **C-rátát** jelent (`C = I/Q`, itt több tízszeres), ezért teljesítményre optimalizált cellakémia, kis **belső ellenállás** és erős folyadékhűtés kell: a hőveszteség `P_h = I²·R_i`. A rendszerfeszültség nagy (a 2014–2025-ös szabály 1000 V-ban maximálta), mert azonos teljesítményhez nagyobb feszültségnél kisebb áram és kisebb `I²·R` veszteség tartozik. A cellákat **BMS** figyeli (feszültség, hőmérséklet, szigetelési ellenállás). **2026-tól** a nagyobb MGU-K-teljesítmény miatt az energiatároló szerepe tovább nő.'
      },
      {
        id: 'sebessegvalto', z: 3, name: 'Sebességváltó', svg: gbox, explode: [25, 135], badge: B(4.05, 0.42), lesson: 'sport/forma1',
        en: 'seamless-shift gearbox (8 forward gears) with differential',
        terms: ['e-mobilitas/nyomatek', 'mechanika/nyomatek', 'e-mobilitas/hatasfok'],
        what: '**Nyolc előre- és egy hátramenet**. A pilóta a kormány mögötti **váltófülekkel** vált, a váltás pedig ún. **seamless** (folytonos): a következő fokozat már kapcsol, mielőtt az előző oldana, így a vonóerő szinte nem szakad meg. Egy váltás néhány ezredmásodperc.\n\nA váltóház egyben **szerkezeti elem**: erre szerelik a hátsó felfüggesztést, a hátsó szárny tartóját és a hátsó **gyűrődőzónát** (a piros esőlámpa is itt van). Benne van a **differenciálmű** is.',
        madeOf: 'A ház **szénszálas kompozit** vagy titán, a fogaskerekek különlegesen edzett, nagy szilárdságú **acélból** készülnek. A fokozatokat hidraulikus működtetők kapcsolják.',
        how: 'A fogaskerekeket kovácsolják, fogazzák, edzik és köszörülik, felületüket különleges bevonattal látják el a súrlódás ellen. A teljes váltót próbapadon versenyterheléssel tesztelik. A szabály szerint a csapatoknak a fokozatok áttételeit egy egész szezonra előre rögzíteniük kell.',
        uni: 'Az áttétel a motornyomatékot és a fordulatszámot alakítja: `M_kerék = i_össz·η·M_motor`, `n_kerék = n_motor/i_össz`, ahol `i_össz = i_fokozat·i_véghajtás`. A fokozatokat úgy választják meg, hogy váltáskor a motor a lehető legnagyobb teljesítményű fordulatszám-tartományban maradjon (a 15 000 1/perces határ alatt). A seamless váltóban két fokozat rövid ideig egyszerre kapcsolódhat úgy, hogy a mechanika csak az egyik irányú nyomatékátvitelt engedi, így a váltás alatt sincs vonóerő-kiesés. A fogaskerékpár hatásfoka kb. 98–99%, de nagy nyomatéknál és fordulatszámon a veszteség hővé válik, ezért a váltóolajat hűteni kell. A **differenciálmű** (féldifferenciál, nem nyitott) elektrohidraulikusan állítható zárónyomatékkal hangolja, mennyire forogjanak együtt a hátsó kerekek kanyarbejáratnál és kigyorsításkor.'
      },
      {
        id: 'felfuggesztes', z: 5, name: 'Felfüggesztés', svg: susp, explode: [0, 62], badge: B(1.45, 0.45), lesson: 'sport/forma1',
        en: 'double-wishbone suspension with push/pull rods, rockers, torsion bars and dampers',
        terms: ['mechanika/hooke', 'mechanika/szabad-rezges', 'mechanika/csillapitas', 'fizika-bsc/harmonikus-rezges'],
        what: 'A kerekeket **kettős lengőkarok** (felső és alsó háromszög alakú karok) kötik az autóhoz. Egy ferde **tolórúd** (pushrod) vagy **húzórúd** (pullrod) vezeti az erőt az autó belsejében elrejtett rugókhoz és lengéscsillapítókhoz, így azok nem rontják a légáramlást.\n\nA talajhatásos autó felfüggesztése nagyon **merev**, mert a padló csak akkor ad jó leszorítást, ha a hasmagasság alig változik. Ezért az F1-es autó ugyanakkor kényelmetlen is: a pilóta minden bukkanót érez.',
        madeOf: 'A lengőkarok **szénszálas kompozitból** készülnek, áramvonalas, szárnyszerű keresztmetszettel; a csatlakozók titánból és acélból. Belül torziós rudak, hidraulikus lengéscsillapítók, billenőkarok (rocker).',
        how: 'A kompozit karokat formában laminálják, a fém csuklókat beragasztják, és minden darabot terheléssel ellenőriznek. A beállításokat (rugómerevség, csillapítás, kerékdőlés) minden pályára külön hangolják, a szimulátorban előre kipróbálva.',
        uni: 'A rugózott tömeg sajátfrekvenciája `f = (1/2π)·√(k/m)`; az F1-es autókon ez sokszorosa egy utcai autó kb. 1–1,5 Hz-es értékének, mert a merev rugózás tartja stabilan a hasmagasságot. A csillapítás mértékét a `ζ = c/(2·√(k·m))` csillapítási tényező írja le; túl kicsi ζ mellett az autó a bukkanókon „pattog”, túl nagynál a kerék nem tudja követni az utat, és csökken a tapadás. A leszorítóerő a sebességgel nő (`∝ v²`), ezért az autó nagy sebességnél **lejjebb ül**, ezt a rugózásnak és a padló kialakításának együtt kell kezelnie. A kettős lengőkaros geometria szabja meg a kerékdőlés változását és a **gördülési középpontot**. A csapatok egy időben **inertereket** is használtak: ez olyan elem, amelynek ereje a két vége közti relatív gyorsulással arányos (`F = b·(a₁ − a₂)`), és amelyet a Cambridge-i Egyetemen dolgoztak ki.'
      },
      {
        id: 'gumik', z: 6, name: 'Gumiabroncsok és kerekek', svg: tyres, explode: [0, 0], badge: B(RW + 0.25, 0.6), lesson: 'sport/forma1',
        en: 'tyres (18-inch slicks and treaded wet tyres) and wheels',
        terms: ['e-mobilitas/gordulesi-ellenallas'],
        what: 'Az autó egyetlen kapcsolata a pályával: négy, egy-egy tenyérnyi felület. 2022 óta **18 colos** keréken futnak. Száraz pályára **mintázat nélküli** (slick) gumik vannak különböző keverékekben (keményebbtől a puhábbig), esőre mintázatos **átmeneti** és **esőgumi**.\n\nA gumi csak egy szűk **hőmérséklet-tartományban** (üzemi ablakban) tapad igazán jól: hidegen „üveges”, túl melegen pedig gyorsan kopik és elveszti a tapadást. Ezért melegítik elő őket a verseny előtt melegítő takarókkal, és ezért olyan fontos a gumik kímélése a futam alatt.\n\nA sávok színe a keveréket jelöli: piros a puha, sárga a közepes, fehér a kemény.',
        madeOf: 'Természetes és szintetikus **gumi**, korom, szilícium-dioxid, olajok és különleges adalékok; belül textil- és acélbetétes karkasz. A felni **magnéziumötvözetből** készül.',
        how: 'A gumiabroncsot rétegekből építik fel, majd formában hővel és nyomással **vulkanizálják**. Az F1-ben egyetlen gyártó (2011 óta a Pirelli) szállít mindenkinek azonos gumikat. A felniket kovácsolják és megmunkálják.',
        uni: 'A gumi tapadása két részből áll: **adhézió** (molekuláris kötések a gumi és az aszfalt között) és **hiszterézis** (a gumi az aszfalt egyenetlenségein deformálódik, és a viszkoelasztikus veszteség fékező erőt ad). Mindkettő erősen hőmérséklet- és frekvenciafüggő; az üzemi ablak a gumi **üvegesedési hőmérsékletéhez** viszonyított helyzettől függ. A tapadási tényező az F1-es slicken a leszorítás nélkül is 1 fölötti lehet, és **terhelésérzékeny**: nagyobb normálerőnél μ csökken (`F_y = μ(F_z)·F_z`, ahol μ csökkenő függvény). A kanyarodáshoz szükséges oldalerő `F_y = m·v²/r`; a leszorítás (`F_z = m·g + ½·ρ·v²·A·C_L`) miatt nagy sebességnél jóval nagyobb oldalgyorsulás is elérhető, mint 1 g, a gyors kanyarokban akár 5 g körüli csúcsok is előfordulnak. A gumi **csúszási szög** mellett adja az oldalerőt; a csúcs után az erő csökken, ezt kell a pilótának „éreznie”.',
        fact: 'A gyors kanyarokban a pilóta oldalirányban akár a testsúlya ötszörösének megfelelő erőt is érezhet, ezért a nyakizmait külön edzik.'
      },
      {
        id: 'fekek', z: 7, name: 'Fékek (karbon tárcsák)', svg: brakes, explode: [0, -145], badge: B(FW, R), lesson: 'sport/forma1',
        en: 'carbon-carbon brake discs, calipers and brake-by-wire',
        terms: ['mechanika/munka-energia', 'fizika-bsc/munkatetel', 'e-mobilitas/rekuperacio'],
        what: 'Az F1-es autó **fékezni** még jobban tud, mint gyorsítani: 300 km/h fölötti sebességről néhány másodperc és alig több mint 100 méter alatt képes lelassulni egy lassú kanyarhoz. A pilótát ilyenkor **5 g** körüli lassulás nyomja a biztonsági övbe.\n\nA tárcsák **szén–szén kompozitból** készülnek, és csak forrón, több száz fokon működnek igazán jól: fékezéskor **izzanak**, csúcsértékben akár 1000 °C fölött. Hátul a fékezés egy részét az **MGU-K** végzi, és egy elektronikus rendszer (**brake-by-wire**) osztja el a fékerőt a villamos gép és a súrlódó fék között.',
        madeOf: 'A tárcsa és a fékbetét **szén–szén kompozit** (szénmátrixban szénszálak), több száz–ezer apró **hűtőfurattal**. A féknyereg alumínium–lítium ötvözetből vagy hasonló könnyűfémből, több dugattyúval.',
        how: 'A szén–szén tárcsa gyártása hónapokig tart: a szénszálas előformát magas hőmérsékleten szénnel itatják át gázfázisból (sok ciklusban), majd megmunkálják és kifúrják a hűtőcsatornákat. Egy tárcsa nagyon drága, és néhány verseny után cserélni kell.',
        uni: 'Egy kb. 800 kg-os autó mozgási energiája 330 km/h-nál (91,7 m/s) és 80 km/h-nál (22,2 m/s) között: `ΔE = ½·m·(v₁² − v₂²) ≈ ½·800·(91,7² − 22,2²) ≈ 3,2 MJ`. Ha ez kb. 2,5 s alatt történik, az átlagos fékteljesítmény `P ≈ 1,3 MW`, ami több tíz utcai autó motorteljesítménye. Ennek kis része nyerhető vissza villamosan (az MGU-K 120 kW-os határa miatt 2014–2025 között), a többi **hővé** válik a tárcsákban, ahonnan a légcsatornák viszik el. A nagy lassulás forrása a nagy leszorítás: a fékerő `F = μ·F_z` miatt nagy sebességnél jóval nagyobb, mint lassan, ezért a pilótának a fékezés elején kell a legerősebben a pedálra lépnie, majd fokozatosan engednie (**trail braking**). A szén–szén súrlódási tényezője üzemi hőmérsékleten kb. 0,5–0,6, hidegen jóval kisebb. A **brake-by-wire** (2014 óta) a pilóta pedálerejéből kiszámolja a kívánt hátsó fékerőt, és ebből levonja az MGU-K által adott generátoros nyomatékot, hogy a fékegyensúly állandó maradjon.',
        fact: 'Az F1-es fékek csúcsterhelés alatt izzó narancssárgán világítanak, éjszakai versenyeken ez jól látszik a kerekek mögött.'
      },
      {
        id: 'kormany', z: 2, name: 'Kormánykerék', svg: wheelS, explode: [-245, -100], badge: B(KM, KH + 0.02), lesson: 'sport/forma1',
        en: 'steering wheel (with display, switches, shift and clutch paddles)',
        what: 'Az F1-es kormány valójában egy **kézi irányítópult**: kijelző, nyomógombok és forgókapcsolók tucatjai vannak rajta, mögötte a **váltófülek** és a **kuplungfülek**. A pilóta vezetés közben, akár 300 km/h-nál állítja a **fékerőelosztást**, a **differenciálmű** beállításait, az **erőforrás üzemmódjait**, az energia-visszanyerést, vagy rádión beszél a csapattal.\n\nA kormányt le kell venni ahhoz, hogy a pilóta ki tudjon szállni; a szabály szerint néhány másodperc alatt ki kell tudnia szállni az autóból.',
        madeOf: '**Szénszálas** váz, gumírozott markolatok, nyomtatott áramkörök, kijelző, kapcsolók és gyorscsatlakozó a kormányoszlophoz.',
        how: 'Minden pilóta kezéhez igazítják: a markolatot a pilóta keze nyomán formázzák, a gombok helyét vele egyeztetik. Kézzel szerelik, nagyon sok apró alkatrészből, és egy-egy kormány költsége becslések szerint több tízezer euró.',
        uni: 'A kormány a kezelőfelülete egy elosztott vezérlőrendszernek: a gombok és kapcsolók jelei digitális buszon jutnak a szabványos **FIA motorvezérlő egységhez** (ECU), amely az erőforrás, a váltó, a differenciálmű és a fékek beállításait kezeli. A gombok által elérhető funkciókat a szabály korlátozza (pl. a pilótának kell döntenie, a mérnökök távolról nem avatkozhatnak be az autó működésébe). Az ergonómia az **emberi reakcióidő** miatt kritikus: a pilóta egy kör alatt sokszor vált és állít, ezért a leggyakoribb funkciók vakon, hüvelykujjal is elérhetők. A kormányoszlop az ütközési próbák része is, mert balesetkor nem sértheti meg a pilótát.'
      }
    ],
    uni: {
      text: 'Egyetemi szemmel az F1-es autó egy **erősen csatolt optimalizálási feladat** a szabálykönyv korlátai között. A köridőt három fő tényező határozza meg: a **tapadás** (gumi + leszorítás), a **hajtóteljesítmény** és a **légellenállás**, valamint az autó tömege.\n\n**Aerodinamika.** A leszorítás és az ellenállás egyaránt `½·ρ·v²·A·C` alakú; a két tényező hányadosa (L/D) a hatékonyság mértéke. Egy 5,5 m-es autóra 80 m/s-nál `Re = ρ·v·L/μ ≈ 3·10⁷`. A **szélcsatorna** legfeljebb 60%-os modellel és legfeljebb 50 m/s légsebességgel használható, így a modell Reynolds-száma csak kb. `0,6·50/80 ≈ 0,38`-szorosa a valóságosnak, ezért a szélcsatorna, a **CFD** és a pályamérések eredményeit egymáshoz kell **korrelálni**. A szélcsatorna- és CFD-időt a szabály korlátozza, az előző évi bajnoki helyezés szerinti csúszó skálán: az utolsók többet kapnak.\n\n**Energia.** A 2014–2025-ös erőforrás: 1,6 l-es turbó V6 + MGU-K (120 kW, körönként 2 MJ visszanyerés, 4 MJ felhasználás) + MGU-H (a turbó tengelyén) + akkumulátor. 2026-tól megszűnik az MGU-H, az MGU-K teljesítménye kb. 350 kW-ra nő, a belső égésű motoré kb. 400 kW-ra csökken, az üzemanyag teljesen fenntartható.\n\n**Tapadás és dinamika.** A kanyarsebesség felső határa közelítőleg `m·v²/r = μ·(m·g + ½·ρ·v²·A·C_L)`, amiből látszik, hogy a leszorítás miatt a gyors kanyarokban arányaiban nagyobb oldalgyorsulás érhető el. A súlypont alacsony, a tömegeloszlás és a gumik hőmérséklet-kezelése egyaránt a beállítás része.\n\n**Biztonság.** Szénszálas túlélőcella, gyűrődőzónák, halo, HANS-nyakvédő, tűzálló öltözet és a pálya biztonsági zónái együtt adják azt, hogy a sportág a 20. század közepéhez képest nagyságrendekkel biztonságosabb lett.',
      terms: ['e-mobilitas/legellenallas', 'e-mobilitas/menetellenallas', 'e-mobilitas/rekuperacio', 'e-mobilitas/pmsm', 'e-mobilitas/hatasfok', 'fizika-bsc/carnot-korfolyamat', 'fizika-bsc/munkatetel', 'fizika-bsc/impulzus', 'mechanika/rugalmassagi-modulus', 'mechanika/szabad-rezges', 'mechanika/csillapitas']
    },
    steps: [
      { icon: '📘', title: 'Szabálykönyv és koncepció', text: 'Minden az **FIA technikai szabályzatával** kezdődik: az előírja a méreteket, a tömeget, az erőforrást és a biztonsági követelményeket. A mérnökök ezen belül keresik a legjobb megoldást, és meghatározzák az autó alapelrendezését: tengelytáv, súlypont, hűtők helye, felfüggesztés típusa.', parts: ['monocoque', 'eroforras'] },
      { icon: '💻', title: 'Számítógépes áramlástan (CFD)', text: 'Az autó felületét számítógépen modellezik, és szuperszámítógépeken több millió cellás hálón megoldják az áramlás egyenleteit. Így több ezer szárny- és padlóváltozatot lehet kipróbálni. A szabály korlátozza, mennyi számítási kapacitást használhat egy csapat.', parts: ['elso-szarny', 'padlolemez', 'diffuzor', 'hatso-szarny'] },
      { icon: '🌬️', title: 'Szélcsatorna', text: 'A legígéretesebb változatokból **legfeljebb 60%-os** méretarányú modellt építenek, és szélcsatornában, mozgó szalagos „úttal” mérik a leszorítást és az ellenállást. Az eredményeket össze kell vetni a CFD-vel és később a pályán mért adatokkal.', parts: ['elso-szarny', 'padlolemez', 'diffuzor', 'hatso-szarny', 'drs'] },
      { icon: '🧵', title: 'Kompozitgyártás és autokláv', text: 'A szénszálas alkatrészekhez formákat marnak, majd kézzel, rétegről rétegre lerakják a gyantával átitatott szénszálas szövetet (**prepreg**). Vákuumzsákba csomagolva **autoklávban**, hővel és nyomással kikeményítik. Egy autó több ezer egyedi alkatrészből áll.', parts: ['monocoque', 'elso-szarny', 'hatso-szarny', 'padlolemez', 'felfuggesztes'] },
      { icon: '💥', title: 'Töréstesztek és homologáció', text: 'A túlélőcellának, az orrnak, az oldalsó és a hátsó gyűrődőzónának, a bukócsőnek és a halónak is át kell mennie az FIA ütközési és terheléses próbáin. Az orr-ütközési próbán pl. kb. 54 km/h-val csapódik a falnak. Csak ezek után versenyezhet az autó.', parts: ['monocoque', 'halo', 'sebessegvalto'] },
      { icon: '⚙️', title: 'Erőforrás és hajtáslánc a próbapadon', text: 'A motort, a turbót, az MGU-K-t és az akkumulátort a motorgyártó készíti és **próbapadon** teszteli, versenytávokat szimulálva. A sebességváltót külön padon terhelik.', parts: ['eroforras', 'turbo', 'mgu-k', 'akkumulator', 'sebessegvalto'] },
      { icon: '🔧', title: 'Összeszerelés', text: 'A monocoque-ra kerül a motor, arra a váltó a hátsó felfüggesztéssel és szárnnyal, elöl az első felfüggesztés és az orr. Bekerülnek a hűtők, a kábelköteg, a fékek, a kormány és a karosszéria. Egy autót a versenyek között is teljesen szétszednek és újra összeraknak.', parts: ['monocoque', 'eroforras', 'sebessegvalto', 'felfuggesztes', 'fekek', 'kormany'] },
      { icon: '🏁', title: 'Szimulátor, teszt, verseny', text: 'A pilóta előbb a **szimulátorban** ismeri meg az autót, majd jön az első gurulás (shakedown) és a téli teszt. Hétvégénként a gumik, a szárnyak és a felfüggesztés beállítását a pályához igazítják, és a pályán mért adatokból tovább fejlesztik az autót.', parts: ['gumik', 'drs', 'kormany'] }
    ],
    history: [
      { year: '1950', text: 'Május 13-án Silverstone-ban rendezik a Forma–1 világbajnokság első futamát. Az autók elöl motoros, csőváz-szerkezetű gépek, biztonsági öv és bukósisak-előírások nélkül.' },
      { year: '1959–1960', text: 'A **Cooper** kis, **középmotoros** autóival Jack Brabham kétszer világbajnok. Pár éven belül szinte minden csapat a vezető mögé teszi a motort.' },
      { year: '1968', text: 'Megjelennek a **szárnyak**: a Lotus, a Ferrari és a Brabham autóin is feltűnnek a leszorítóerőt adó szárnyak és légterelők.' },
      { year: '1977', text: 'A Renault elhozza a **turbómotort** a Forma–1-be; első győzelmét 1979-ben aratja.' },
      { year: '1977–1978', text: 'A **Lotus 78** és **79** a padló alatt kialakított csatornákkal kihasználja a **talajhatást**. 1983-tól a lapos padló kötelező lesz.' },
      { year: '1981', text: 'A **McLaren MP4/1** az első szénszálas kompozit **monocoque**-kal versenyző F1-es autó: könnyebb, merevebb és sokkal biztonságosabb.' },
      { year: '1989', text: 'A turbómotorokat betiltják, jönnek a szívómotorok. 1994 után a biztonsági szabályokat jelentősen szigorítják (magasabb cellaoldalak, töréstesztek).' },
      { year: '2009', text: 'Megjelenik a **KERS**, az első fékenergia-visszanyerő rendszer.' },
      { year: '2011', text: 'Bevezetik a **DRS**-t, hogy könnyebb legyen előzni.' },
      { year: '2014', text: 'Kezdődik a **hibrid korszak**: 1,6 literes turbó V6 + MGU-K + MGU-H + akkumulátor. A hőhatásfok később 50% fölé emelkedik.' },
      { year: '2018', text: 'Kötelező lesz a titán **halo** a pilóta feje fölött.' },
      { year: '2022', text: 'Visszatér a **talajhatás**: Venturi-csatornás padló, egyszerűsített szárnyak, **18 colos** kerekek, hogy az autók közelebb tudjanak menni egymáshoz.' },
      { year: '2026', text: 'Új szabályok: **MGU-H nélküli** erőforrás, kb. 350 kW-os MGU-K, teljesen **fenntartható üzemanyag**, kisebb és könnyebb autók, **aktív aerodinamika** a DRS helyett.' }
    ],
    quiz: [
      { q: 'Miért tapad jobban egy F1-es autó nagy sebességnél?', options: ['Mert a szárnyak és a padló leszorítóereje a sebességgel nő', 'Mert nagyobb sebességnél nehezebb lesz a motor', 'Mert a gumik hidegebbek lesznek', 'Mert a pilóta erősebben kormányoz'], answer: 0, explain: 'A leszorítóerő a sebesség négyzetével arányos, így gyors kanyarban sokkal nagyobb a tapadás.' },
      { q: 'Mit csinál a padló alatti Venturi-csatorna?', options: ['Felgyorsítja a levegőt, ezért ott lecsökken a nyomás, és az autót a talajhoz szívja', 'Hűti a motort', 'Felemeli az autót a bukkanókon', 'Csökkenti a gumik kopását'], answer: 0, explain: 'Ez a talajhatás: Bernoulli szerint a gyorsabban áramló levegő nyomása kisebb.' },
      { q: 'Melyik alkatrész szűnt meg a 2026-os erőforrásokban?', options: ['Az MGU-H', 'Az MGU-K', 'A turbófeltöltő', 'Az akkumulátor'], answer: 0, explain: 'Az MGU-H a turbó tengelyén nyert energiát a kipufogógázból; 2026-tól elhagyták, az MGU-K viszont sokkal erősebb lett.' },
      { q: 'Mire szolgál a halo?', options: ['A pilóta fejét védi a lerepülő tárgyaktól és ütközéskor', 'Növeli a leszorítóerőt', 'A rádióantenna tartója', 'Hűti a pilótát'], answer: 0, explain: '2018 óta kötelező, és több súlyos balesetben is megvédte a pilótát.' },
      { q: 'Miért izzanak az F1-es fékek?', options: ['Mert a mozgási energia nagy része hővé alakul a szén–szén tárcsákban', 'Mert elektromosan fűtik őket', 'Mert festékkel vannak bevonva', 'Mert a motor hője odaáramlik'], answer: 0, explain: 'Egy erős fékezésnél néhány másodperc alatt több megajoule energia alakul hővé, a tárcsák csúcsban 1000 °C fölé is melegedhetnek.' }
    ]
  });
})();
