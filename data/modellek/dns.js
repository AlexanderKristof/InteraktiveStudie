/* Modell: a DNS – stilizált kettős spirál (térhatású árnyalással) és nagyított kiemelések:
 * nukleotid, bázispárok hidrogénkötésekkel, kromoszóma/nukleoszóma, atomok.
 * Nem méretarányos: a kettős spirál átmérője kb. 2 nm. */
(function () {
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  function f(v) { return (+v).toFixed(1); }
  function pts(arr) { return arr.map(function (p) { return f(p[0]) + ',' + f(p[1]); }).join(' '); }
  function txt(x, y, s, cls, extra) { return '<text class="' + (cls || 'lbl-muted') + '" x="' + f(x) + '" y="' + f(y) + '"' + (extra || '') + NS + '>' + s + '</text>'; }
  function panel(x, y, w, h, title) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" style="fill:var(--surface);stroke:var(--line)" stroke-width="1.2"/>' +
      txt(x + 12, y + 20, title, 'lbl', ' font-size="12.5"');
  }
  /* szabályos sokszög csúcsai */
  function ngon(cx, cy, r, n, a0) {
    var out = [];
    for (var i = 0; i < n; i++) { var a = (a0 + i * 360 / n) * Math.PI / 180; out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return out;
  }
  /* purin (hatszög + öttagú gyűrű) – side: az öttagú gyűrű oldala (-1 bal, +1 jobb) */
  function purine(cx, cy, r, color, side, letter) {
    var hex = ngon(cx, cy, r, 6, -90), s = side || -1;
    var pc = [cx + s * (0.866 + 0.688) * r, cy], R = 0.8507 * r;
    var pen = [0, 1, 2, 3, 4].map(function (k) { var a = (s < 0 ? 0 : 180) + k * 72; a = a * Math.PI / 180; return [pc[0] + R * Math.cos(a), pc[1] + R * Math.sin(a)]; });
    return '<polygon points="' + pts(pen) + '" fill="' + shade(color, 0.85) + '" stroke="' + shade(color, 0.5) + '" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<polygon points="' + pts(hex) + '" fill="' + color + '" stroke="' + shade(color, 0.5) + '" stroke-width="1.4" stroke-linejoin="round"/>' +
      (letter ? '<text x="' + f(cx) + '" y="' + f(cy + 5) + '" text-anchor="middle" font-size="14" font-weight="700" fill="#fff"' + NS + '>' + letter + '</text>' : '');
  }
  function pyrimidine(cx, cy, r, color, letter) {
    return '<polygon points="' + pts(ngon(cx, cy, r, 6, -90)) + '" fill="' + color + '" stroke="' + shade(color, 0.5) + '" stroke-width="1.4" stroke-linejoin="round"/>' +
      (letter ? '<text x="' + f(cx) + '" y="' + f(cy + 5) + '" text-anchor="middle" font-size="14" font-weight="700" fill="#fff"' + NS + '>' + letter + '</text>' : '');
  }

  var BASE = { A: '#2f9e55', T: '#e0524a', G: '#3a74d6', C: '#d9a21b' };
  var NAME = { A: 'adenin', T: 'timin', G: 'guanin', C: 'citozin' };
  var PAIR = { A: 'T', T: 'A', G: 'C', C: 'G' };
  var S1 = '#7b5fd6', S2 = '#b4508f';            // a két szál gerince
  var SUGAR = '#ef9cbc', PHOS = '#f0902e';

  /* ---------- a kettős spirál geometriája ---------- */
  var CX = 290, AMP = 56, Y0 = 66, Y1 = 492, PITCH = 172, PH0 = 0.9;
  var DELTA = 2 * Math.PI * 12 / 34;            // a két szál fáziseltolása → kis és nagy árok
  var NBP = 10;                                 // bázispár / menet (a rajzon; a valóságban kb. 10,5)
  function th(y) { return 2 * Math.PI * (y - Y0) / PITCH + PH0; }
  function s1(y) { var t = th(y); return [CX + AMP * Math.sin(t), y, Math.cos(t)]; }
  function s2(y) { var t = th(y) + DELTA; return [CX + AMP * Math.sin(t), y, Math.cos(t)]; }
  function depthCol(c, z) { return shade(c, 0.58 + 0.5 * (z + 1) / 2); }

  /* 1. Cukor-foszfát gerinc: hátsó szakaszok vékonyabbak és sötétebbek */
  var back = '', front = '';
  [[s1, S1], [s2, S2]].forEach(function (st) {
    for (var y = Y0; y < Y1; y += 3) {
      var a = st[0](y), b = st[0](Math.min(Y1, y + 3.4)), z = (a[2] + b[2]) / 2, w = 5 + 3.2 * (z + 1) / 2;
      var seg = '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" stroke="' + depthCol(st[1], z) + '" stroke-width="' + f(w) + '" stroke-linecap="round"/>';
      if (z < 0) back += seg; else front += seg;
    }
  });
  var e1t = s1(Y0), e1b = s1(Y1), e2t = s2(Y0), e2b = s2(Y1);
  var backbone = '<g opacity=".9">' + back + '</g>' + front +
    txt(e1t[0] + (e1t[0] < CX ? -22 : 8), Y0 - 4, "5′", 'lbl', ' font-size="13" fill="' + S1 + '"') +
    txt(e2t[0] + (e2t[0] < CX ? -22 : 8), Y0 - 4, "3′", 'lbl', ' font-size="13"') +
    txt(e1b[0] + (e1b[0] < CX ? -22 : 8), Y1 + 12, "3′", 'lbl', ' font-size="13"') +
    txt(e2b[0] + (e2b[0] < CX ? -22 : 8), Y1 + 12, "5′", 'lbl', ' font-size="13"');

  /* 4. Bázispárok, 2–3. cukrok és foszfátok, 5. hidrogénkötések (a spirálban) */
  var SEQ = 'ATGCGTACCTAGGCATTCGAGCTAAGCTGTA';
  var step = PITCH / NBP, rungs = [], sug = '', pho = '', hb = '';
  for (var i = 0, y = Y0 + step / 2; y < Y1 - 2; i++, y += step) {
    var a = s1(y), b = s2(y), bs = SEQ[i % SEQ.length], z = (a[2] + b[2]) / 2, xm = (a[0] + b[0]) / 2;
    var r = '<line x1="' + f(a[0]) + '" y1="' + f(y) + '" x2="' + f(b[0]) + '" y2="' + f(y) + '" stroke="' + shade('#2a2f3a', 1) + '" stroke-opacity=".35" stroke-width="8.5" stroke-linecap="round"/>' +
      '<line x1="' + f(a[0]) + '" y1="' + f(y) + '" x2="' + f(xm) + '" y2="' + f(y) + '" stroke="' + depthCol(BASE[bs], z) + '" stroke-width="6.5"/>' +
      '<line x1="' + f(xm) + '" y1="' + f(y) + '" x2="' + f(b[0]) + '" y2="' + f(y) + '" stroke="' + depthCol(BASE[PAIR[bs]], z) + '" stroke-width="6.5"/>';
    rungs.push({ z: z, s: r });
    var nh = (bs === 'G' || bs === 'C') ? 3 : 2, len = Math.abs(b[0] - a[0]);
    if (len > 16) for (var k = 0; k < nh; k++) {
      var hx = xm + (k - (nh - 1) / 2) * 3.4;
      hb += '<line x1="' + f(hx) + '" y1="' + f(y - 2.6) + '" x2="' + f(hx) + '" y2="' + f(y + 2.6) + '" stroke="#fff" stroke-width="1.3" opacity="' + f(0.6 + 0.4 * (z + 1) / 2) + '"/>';
    }
    [[a, S1], [b, S2]].forEach(function (q) {
      var p = q[0], sz = 4.2 + 1.8 * (p[2] + 1) / 2;
      sug += '<polygon points="' + pts(ngon(p[0], p[1], sz, 5, -90)) + '" fill="' + depthCol(SUGAR, p[2]) + '" stroke="' + shade(SUGAR, 0.45) + '" stroke-width=".9"/>';
    });
    [s1(y + step / 2), s2(y - step / 2)].forEach(function (p) {
      if (p[1] > Y1 || p[1] < Y0) return;
      pho += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="' + f(3 + 1.6 * (p[2] + 1) / 2) + '" fill="' + depthCol(PHOS, p[2]) + '" stroke="' + shade(PHOS, 0.5) + '" stroke-width=".9"/>';
    });
  }
  rungs.sort(function (p, q) { return p.z - q.z; });
  var bases = rungs.map(function (x) { return x.s; }).join('');
  /* bázis-jelmagyarázat a bal felső sarokban */
  var LG = [16, 82];
  bases += '<rect x="' + (LG[0] - 4) + '" y="' + (LG[1] - 18) + '" width="166" height="118" rx="10" fill="transparent"/>' +
    txt(LG[0], LG[1] - 4, 'Nitrogénbázisok', 'lbl', ' font-size="12.5"');
  ['A', 'T', 'G', 'C'].forEach(function (bsx, j) {
    var yy = LG[1] + 14 + j * 21;
    bases += '<rect x="' + LG[0] + '" y="' + (yy - 7) + '" width="26" height="12" rx="3" fill="' + BASE[bsx] + '" stroke="' + shade(BASE[bsx], 0.55) + '"/>' +
      '<text x="' + (LG[0] + 13) + '" y="' + (yy + 3) + '" text-anchor="middle" font-size="10" font-weight="700" fill="#fff"' + NS + '>' + bsx + '</text>' +
      txt(LG[0] + 34, yy + 3, NAME[bsx], 'lbl-muted');
  });
  bases += '<path d="M' + (LG[0] + 92) + ' ' + (LG[1] + 8) + ' h5 v21 h-5 M' + (LG[0] + 92) + ' ' + (LG[1] + 50) + ' h5 v21 h-5" stroke="#8792a5" stroke-width="1.4" fill="none"/>' +
    txt(LG[0] + 101, LG[1] + 23, 'pár', 'lbl-muted', ' font-size="11"') + txt(LG[0] + 101, LG[1] + 65, 'pár', 'lbl-muted', ' font-size="11"');

  /* ---------- 6. Nagy és kis árok: a jobb szélen ---------- */
  // ahol az egyes szálak a spirál jobb szélén járnak: th = π/2 (+2πn) ill. th + DELTA = π/2
  function yAt(target) { return Y0 + (target - PH0) / (2 * Math.PI) * PITCH; }
  var n0 = 1, yS1 = yAt(Math.PI / 2 + 2 * Math.PI * n0), yS2 = yAt(Math.PI / 2 - DELTA + 2 * Math.PI * n0);
  while (yS2 < 110) { yS2 += PITCH; }
  while (yS1 < yS2) yS1 += PITCH;
  var GX = CX + AMP + 16;
  function bracket(x, ya, yb, col) {
    return '<path d="M' + f(x - 5) + ' ' + f(ya) + ' h5 V' + f(yb) + ' h-5" fill="none" stroke="' + col + '" stroke-width="2"/>';
  }
  var grooves = '<rect x="' + (GX - 6) + '" y="' + f(yS2 - PITCH + DELTA / (2 * Math.PI) * PITCH - 6) + '" width="120" height="' + f(PITCH + 12) + '" fill="transparent"/>';
  var yMinA = yS2, yMinB = yS1, yMajA = yS1 - PITCH, yMajB = yS2;
  grooves += bracket(GX, yMajA + 3, yMajB - 3, '#c2417a') + txt(GX + 8, (yMajA + yMajB) / 2 - 2, 'nagy árok', 'lbl', ' font-size="12"') + txt(GX + 8, (yMajA + yMajB) / 2 + 13, 'kb. 2,2 nm', 'lbl-muted', ' font-size="11"') +
    bracket(GX, yMinA + 3, yMinB - 3, '#7b5fd6') + txt(GX + 8, (yMinA + yMinB) / 2 - 2, 'kis árok', 'lbl', ' font-size="12"') + txt(GX + 8, (yMinA + yMinB) / 2 + 13, 'kb. 1,2 nm', 'lbl-muted', ' font-size="11"');

  /* ---------- 11. Méretek: menetemelkedés és átmérő ---------- */
  var yP0 = yMinB + 12, yP1 = yP0 + PITCH;
  if (yP1 > Y1) { yP1 = Y1 - 4; yP0 = yP1 - PITCH; }
  var DX = GX + 2;
  var dims = '<rect x="' + (DX - 6) + '" y="' + f(yP0 - 4) + '" width="112" height="' + f(PITCH + 8) + '" fill="transparent"/>' +
    '<path d="M' + (DX - 6) + ' ' + f(yP0) + ' h12 M' + (DX - 6) + ' ' + f(yP1) + ' h12 M' + DX + ' ' + f(yP0 + 2) + ' V' + f(yP1 - 2) + '" stroke="#8792a5" stroke-width="1.6" fill="none"/>' +
    '<path d="M' + DX + ' ' + f(yP0) + ' l-4 8 h8 Z M' + DX + ' ' + f(yP1) + ' l-4 -8 h8 Z" fill="#8792a5"/>' +
    txt(DX + 10, (yP0 + yP1) / 2 - 8, 'egy menet', 'lbl', ' font-size="12"') + txt(DX + 10, (yP0 + yP1) / 2 + 8, '3,4 nm', 'lbl-muted') +
    txt(DX + 10, (yP0 + yP1) / 2 + 23, '≈ 10,5', 'lbl-muted', ' font-size="11"') + txt(DX + 10, (yP0 + yP1) / 2 + 37, 'bázispár', 'lbl-muted', ' font-size="11"');
  var WY = Y1 + 22;
  dims += '<path d="M' + (CX - AMP) + ' ' + (WY - 6) + ' v12 M' + (CX + AMP) + ' ' + (WY - 6) + ' v12 M' + (CX - AMP + 2) + ' ' + WY + ' H' + (CX + AMP - 2) + '" stroke="#8792a5" stroke-width="1.6" fill="none"/>' +
    '<path d="M' + (CX - AMP) + ' ' + WY + ' l8 -4 v8 Z M' + (CX + AMP) + ' ' + WY + ' l-8 -4 v8 Z" fill="#8792a5"/>' +
    txt(CX + AMP + 10, WY + 4, 'átmérő: 2 nm', 'lbl-muted');

  /* ---------- 9. Gén: egy kiemelt szakasz ---------- */
  var GY0 = Y0 + step * 4, GY1 = Y0 + step * 14;
  var gene = '<rect x="' + (CX - AMP - 12) + '" y="' + f(GY0) + '" width="' + (2 * AMP + 24) + '" height="' + f(GY1 - GY0) + '" rx="10" fill="rgba(240,180,40,.13)" stroke="#d9a21b" stroke-width="1.6" stroke-dasharray="6 4"/>' +
    '<path d="M' + (CX - AMP - 20) + ' ' + f(GY0) + ' h-6 V' + f(GY1) + ' h6" fill="none" stroke="#d9a21b" stroke-width="2.4"/>' +
    txt(CX - AMP - 34, (GY0 + GY1) / 2 - 12, 'gén', 'lbl', ' text-anchor="end" font-size="14"') +
    txt(CX - AMP - 34, (GY0 + GY1) / 2 + 5, 'egy fehérje', 'lbl-muted', ' text-anchor="end"') +
    txt(CX - AMP - 34, (GY0 + GY1) / 2 + 20, '„receptje”', 'lbl-muted', ' text-anchor="end"') +
    '<path d="M' + (CX - AMP - 40) + ' ' + f((GY0 + GY1) / 2 + 32) + ' v30" stroke="#d9a21b" stroke-width="2" fill="none"' + NS + '/><path d="M' + (CX - AMP - 44) + ' ' + f((GY0 + GY1) / 2 + 58) + ' l4 8 l4 -8 Z" fill="#d9a21b"' + NS + '/>' +
    txt(CX - AMP - 48, (GY0 + GY1) / 2 + 52, 'leolvasás', 'lbl-muted', ' text-anchor="end" font-size="11"');

  /* ---------- 7. Nukleotid (kiemelés) ---------- */
  var NX = 470, NY = 14, NW = 276;
  var nuc = panel(NX, NY, NW, 166, 'Egy nukleotid: foszfát + cukor + bázis');
  var Pp = [NX + 44, NY + 84], Sg = [NX + 140, NY + 90], Bp = [NX + 230, NY + 84];
  var sv = ngon(Sg[0], Sg[1], 26, 5, -90);   // 0: gyűrűs O (fent), 1: C1′, 2: C2′, 3: C3′, 4: C4′
  var c5 = [sv[4][0] - 22, sv[4][1] - 26];
  nuc += '<path d="M' + f(sv[4][0]) + ' ' + f(sv[4][1]) + ' L' + f(c5[0]) + ' ' + f(c5[1]) + ' L' + f(Pp[0] + 16) + ' ' + f(Pp[1] - 12) + '" stroke="#8792a5" stroke-width="2.4" fill="none"/>' +
    '<path d="M' + f(sv[1][0]) + ' ' + f(sv[1][1]) + ' L' + f(Bp[0] - 54) + ' ' + f(Bp[1] + 6) + '" stroke="#8792a5" stroke-width="2.4"/>';
  [[0, -22], [0, 22], [-22, 0], [17, -13]].forEach(function (o, j) {
    nuc += '<line x1="' + Pp[0] + '" y1="' + Pp[1] + '" x2="' + (Pp[0] + o[0]) + '" y2="' + (Pp[1] + o[1]) + '" stroke="#8792a5" stroke-width="2.4"/>' +
      '<circle cx="' + (Pp[0] + o[0]) + '" cy="' + (Pp[1] + o[1]) + '" r="8" fill="#e3463c" stroke="#9c2620"/>' +
      '<text x="' + (Pp[0] + o[0]) + '" y="' + (Pp[1] + o[1] + 3.5) + '" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff"' + NS + '>O' + (j === 2 ? '⁻' : '') + '</text>';
  });
  nuc += '<circle cx="' + Pp[0] + '" cy="' + Pp[1] + '" r="13" fill="' + PHOS + '" stroke="#a35210" stroke-width="1.4"/>' +
    '<text x="' + Pp[0] + '" y="' + (Pp[1] + 5) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#fff"' + NS + '>P</text>';
  nuc += '<polygon points="' + pts(sv) + '" fill="' + SUGAR + '" stroke="#9c3d63" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<circle cx="' + f(sv[0][0]) + '" cy="' + f(sv[0][1]) + '" r="6" fill="#e3463c" stroke="#9c2620"/>' +
    '<text x="' + f(sv[0][0]) + '" y="' + f(sv[0][1] + 3) + '" text-anchor="middle" font-size="8" font-weight="700" fill="#fff"' + NS + '>O</text>' +
    txt(sv[1][0] + 6, sv[1][1] - 2, "1′", 'lbl-muted', ' font-size="10"') + txt(sv[2][0] + 4, sv[2][1] + 12, "2′", 'lbl-muted', ' font-size="10"') +
    txt(sv[3][0] + 2, sv[3][1] + 13, "3′", 'lbl-muted', ' font-size="10"') + txt(sv[4][0] - 16, sv[4][1] + 4, "4′", 'lbl-muted', ' font-size="10"') +
    txt(c5[0] - 4, c5[1] - 6, "5′", 'lbl-muted', ' font-size="10"') +
    '<line x1="' + f(sv[3][0]) + '" y1="' + f(sv[3][1]) + '" x2="' + f(sv[3][0] - 16) + '" y2="' + f(sv[3][1] + 8) + '" stroke="#8792a5" stroke-width="2"/>' +
    txt(sv[3][0] - 18, sv[3][1] + 16, '3′–OH', 'lbl-muted', ' font-size="10" text-anchor="end"');
  nuc += purine(Bp[0], Bp[1], 18, BASE.A, -1, 'A');
  nuc += txt(Pp[0], NY + 156, 'foszfát', 'lbl-muted', ' text-anchor="middle"') + txt(Sg[0], NY + 156, 'dezoxiribóz', 'lbl-muted', ' text-anchor="middle"') +
    txt(Bp[0] - 6, NY + 156, 'bázis (adenin)', 'lbl-muted', ' text-anchor="middle"');

  /* ---------- 5. Hidrogénkötések (kiemelés: bázispárok) ---------- */
  var HX = 470, HY = 190, HW = 276;
  var hbond = panel(HX, HY, HW, 158, 'Bázispárok: hidrogénkötések');
  function pairRow(y, L, R, n) {
    var lx = HX + 92, rx = HX + 190, s = '';
    s += '<line x1="' + (HX + 24) + '" y1="' + y + '" x2="' + (lx - 40) + '" y2="' + y + '" stroke="#8792a5" stroke-width="2.4"/>' +
      '<polygon points="' + pts(ngon(HX + 22, y, 8, 5, -90)) + '" fill="' + SUGAR + '" stroke="#9c3d63"/>' +
      '<line x1="' + (rx + 18) + '" y1="' + y + '" x2="' + (HX + HW - 26) + '" y2="' + y + '" stroke="#8792a5" stroke-width="2.4"/>' +
      '<polygon points="' + pts(ngon(HX + HW - 24, y, 8, 5, -90)) + '" fill="' + SUGAR + '" stroke="#9c3d63"/>';
    s += purine(lx, y, 18, BASE[L], -1, L) + pyrimidine(rx, y, 18, BASE[R], R);
    for (var k = 0; k < n; k++) {
      var yy = y + (k - (n - 1) / 2) * 9;
      s += '<line x1="' + (lx + 17) + '" y1="' + yy + '" x2="' + (rx - 17) + '" y2="' + yy + '" stroke="#5b6b82" stroke-width="2" stroke-dasharray="3 3"/>';
    }
    return s;
  }
  hbond += pairRow(HY + 56, 'A', 'T', 2) + txt(HX + 138, HY + 88, 'A = T · 2 hidrogénkötés', 'lbl-muted', ' text-anchor="middle" font-size="11"') +
    pairRow(HY + 116, 'G', 'C', 3) + txt(HX + 138, HY + 150, 'G ≡ C · 3 hidrogénkötés', 'lbl-muted', ' text-anchor="middle" font-size="11"') + hb;

  /* ---------- 8. Kromoszóma és hisztonok (kiemelés) ---------- */
  var KX = 470, KY = 358, KW = 276;
  var chromo = panel(KX, KY, KW, 150, 'Csomagolás: kromoszóma, hisztonok');
  function arm(x0, y0, x1, y1) {
    return '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y1 + '" stroke="#6c4fc0" stroke-width="15" stroke-linecap="round"/>' +
      '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y1 + '" stroke="#a48be8" stroke-width="9" stroke-linecap="round" stroke-dasharray="5 4"/>';
  }
  var cx0 = KX + 50, cy0 = KY + 80;
  chromo += arm(cx0 - 6, cy0, cx0 - 22, cy0 - 36) + arm(cx0 - 6, cy0, cx0 - 19, cy0 + 38) + arm(cx0 + 6, cy0, cx0 + 22, cy0 - 36) + arm(cx0 + 6, cy0, cx0 + 19, cy0 + 38) +
    '<ellipse cx="' + cx0 + '" cy="' + cy0 + '" rx="9" ry="6" fill="#4a3290"/>';
  chromo += '<path d="M' + (cx0 + 26) + ' ' + (cy0 - 38) + ' L' + (KX + 98) + ' ' + (KY + 36) + ' M' + (cx0 + 26) + ' ' + (cy0 - 30) + ' L' + (KX + 98) + ' ' + (KY + 124) + '" stroke="#8792a5" stroke-width="1" stroke-dasharray="3 3" fill="none"' + NS + '/>';
  var beads = [[KX + 120, KY + 60], [KX + 152, KY + 92], [KX + 186, KY + 62], [KX + 220, KY + 96], [KX + 252, KY + 68]];
  var dpath = 'M' + (KX + 100) + ' ' + (KY + 88);
  beads.forEach(function (bd) { dpath += ' Q' + (bd[0] - 18) + ' ' + (bd[1] + 22) + ' ' + bd[0] + ' ' + (bd[1] + 14); });
  chromo += '<path d="' + dpath + '" fill="none" stroke="' + S1 + '" stroke-width="2.6"/>';
  beads.forEach(function (bd) {
    chromo += '<ellipse cx="' + bd[0] + '" cy="' + bd[1] + '" rx="15" ry="12" fill="#5fb3a2" stroke="#2c7466" stroke-width="1.4"/>' +
      '<path d="M' + (bd[0] - 15) + ' ' + (bd[1] + 2) + ' Q' + bd[0] + ' ' + (bd[1] - 20) + ' ' + (bd[0] + 15) + ' ' + (bd[1] - 2) + ' M' + (bd[0] - 14) + ' ' + (bd[1] + 8) + ' Q' + bd[0] + ' ' + (bd[1] - 10) + ' ' + (bd[0] + 15) + ' ' + (bd[1] + 5) + '" fill="none" stroke="' + S1 + '" stroke-width="2.4"/>';
  });
  chromo += txt(cx0, KY + 144, 'kromoszóma', 'lbl-muted', ' text-anchor="middle" font-size="11"') +
    txt(KX + 186, KY + 134, 'nukleoszómák: DNS hiszton-', 'lbl-muted', ' text-anchor="middle" font-size="11"') +
    txt(KX + 186, KY + 146, 'fehérjék köré tekerve', 'lbl-muted', ' text-anchor="middle" font-size="11"');

  /* ---------- 10. Atomok (kiemelés): egy foszfátcsoport és a cukor egy része golyómodellben ---------- */
  var AX = 14, AY = 358;
  var atoms = panel(AX, AY, 172, 150, 'Atomok: C, H, O, N, P');
  var EL = { C: ['#4a4f58', '#fff'], H: ['#f2f4f7', '#333'], O: ['#e3463c', '#fff'], N: ['#3a6fe0', '#fff'], P: ['#f0902e', '#fff'] };
  function ball(x, y, e, r) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + EL[e][0] + '" stroke="' + shade(EL[e][0] === '#f2f4f7' ? '#9aa3ad' : EL[e][0], 0.6) + '" stroke-width="1.2"/>' +
      '<text x="' + x + '" y="' + (y + 3.6) + '" text-anchor="middle" font-size="10" font-weight="700" fill="' + EL[e][1] + '"' + NS + '>' + e + '</text>';
  }
  var mol = [['P', 56, 74, 13], ['O', 56, 48, 9], ['O', 30, 80, 9], ['O', 62, 100, 9], ['O', 82, 70, 9], ['C', 106, 56, 10], ['H', 102, 34, 6], ['C', 130, 72, 10], ['N', 150, 96, 9], ['H', 128, 96, 6]];
  var bonds = [[0, 1], [0, 2], [0, 3], [0, 4], [4, 5], [5, 6], [5, 7], [7, 8], [7, 9]];
  bonds.forEach(function (bd) {
    var p = mol[bd[0]], q = mol[bd[1]];
    atoms += '<line x1="' + (AX + p[1]) + '" y1="' + (AY + p[2]) + '" x2="' + (AX + q[1]) + '" y2="' + (AY + q[2]) + '" stroke="#8792a5" stroke-width="3"/>';
  });
  mol.forEach(function (m) { atoms += ball(AX + m[1], AY + m[2], m[0], m[3]); });
  atoms += txt(AX + 12, AY + 128, 'szén · hidrogén · oxigén', 'lbl-muted', ' font-size="11"') + txt(AX + 12, AY + 142, 'nitrogén · foszfor', 'lbl-muted', ' font-size="11"');

  var backdrop = '<text class="lbl" x="14" y="26" font-size="17">A DNS kettős spirálja</text>' +
    '<text class="lbl-muted" x="14" y="44">stilizált rajz, nem méretarányos</text>' +
    '<line x1="' + CX + '" y1="' + (Y0 - 8) + '" x2="' + CX + '" y2="' + (Y1 + 8) + '" stroke="#8792a5" stroke-width="1" stroke-dasharray="2 5" opacity=".6"/>';

  STUDIE.addModel({
    id: 'dns',
    title: 'A DNS',
    icon: '🧬',
    color: '#c2417a',
    category: 'Biológia',
    keywords: 'DNS DNA dezoxiribonukleinsav kettős spirál kettős hélix nukleotid nitrogénbázis adenin timin guanin citozin bázispár hidrogénkötés cukor-foszfát gerinc dezoxiribóz foszfát nagy árok kis árok gén kromoszóma hiszton nukleoszóma replikáció helikáz primáz DNS-polimeráz ligáz Okazaki transzkripció RNS Watson Crick Franklin Chargaff PCR CRISPR genom',
    summary: 'Négy betűből írt, kétméteres „szakácskönyv” minden sejtedben: ebben van leírva, hogyan épülsz fel.',
    scale: 'átmérő kb. 2 nm; egy sejt teljes DNS-e kb. 2 m hosszú',
    viewBox: '0 0 760 520',
    backdrop: backdrop,
    intro: 'A **DNS** (dezoxiribonukleinsav) az élőlények örökítőanyaga. Két hosszú szálból áll, amelyek egymás köré csavarodva **kettős spirált** alkotnak, mint egy megcsavart kötélhágcsó. A hágcsó két „korlátja” a **cukor-foszfát gerinc**, a „fokai” a **bázispárok**.\n\nA négy bázis (**A, T, G, C**) sorrendje hordozza az információt, ahogy a betűk sorrendje egy mondatban. A párosodás szabálya egyszerű: **A mindig T-vel, G mindig C-vel** áll párban. Ezért az egyik szál meghatározza a másikat, és ezért tud a DNS pontosan **lemásolódni**.',
    parts: [
      {
        id: 'gerinc', z: 3, name: 'Cukor-foszfát gerinc', svg: backbone, explode: [0, 0], badge: [s1(Y0 + 120)[0], Y0 + 120], en: 'sugar–phosphate backbone',
        what: 'A kettős spirál két „korlátja”. Mindkét szál felváltva **cukorból** és **foszfátcsoportból** álló, hosszú lánc, a bázisok pedig befelé, a spirál tengelye felé lógnak róla. A két szál **ellentétes irányú** (antiparallel): az egyik 5′→3′, a másik 3′→5′ irányban fut (a rajzon a végeken jelölve).',
        madeOf: 'Felváltva **dezoxiribóz** cukorból és **foszfátcsoportból**, amelyeket erős **kovalens kötések** (foszfodiészter-kötések) kapcsolnak össze. A foszfátok negatív töltése miatt a DNS savas, és vízben jól oldódik.',
        how: 'A sejtben az enzimek (DNS-polimerázok) építik fel: mindig a lánc 3′ végéhez kapcsolnak hozzá egy újabb nukleotidot. Így a szál csak **5′→3′ irányban** nőhet. A kapcsolódáshoz szükséges energiát maga a beépülő nukleotid hozza: három foszfátjából kettő lehasad.',
        uni: 'A foszfodiészter-kötés a 3′-OH nukleofil támadásával jön létre a bejövő dNTP α-foszfátján, pirofoszfát (PPᵢ) távozásával; a PPᵢ pirofoszfatázos hidrolízise teszi a reakciót gyakorlatilag **irreverzibilissé** (ΔG°′ ≈ −19 kJ/mol helyett összesen kb. −50 kJ/mol). A gerinc foszfátjai pH 7-en teljesen deprotonáltak (pKₐ ≈ 1), ezért a DNS **polianion**: a töltéseket Mg²⁺ és a hisztonok lizin/arginin oldalláncai árnyékolják. A B-DNS jobbmenetes, a bázispárok emelkedése 0,34 nm, csavarodása kb. 34,3°.',
        terms: ['kemia-bsc/pka'],
        fact: 'A két szál olyan, mint két, egymással szemben haladó autópálya-sáv: ugyanazon a „hídon” futnak, de ellentétes irányba.'
      },
      {
        id: 'dezoxiriboz', z: 5, name: 'Dezoxiribóz (cukor)', svg: sug, explode: [-26, 0], badge: [s2(Y0 + step * 18.5)[0], Y0 + step * 18.5], en: 'deoxyribose (2′-deoxy-D-ribose)',
        what: 'Öt szénatomos cukor (**pentóz**), a rajzon rózsaszín ötszögek. Minden nukleotidban egy van: ehhez kapcsolódik az egyik oldalon a **foszfát**, a másikon a **bázis**. A neve onnan jön, hogy a ribózhoz képest a 2′ szénatomjáról **hiányzik egy oxigén** (de-oxi).',
        madeOf: '5 szén-, 10 hidrogén- és 4 oxigénatom (C₅H₁₀O₄). A szénatomokat 1′-től 5′-ig számozzák (a vessző, „vonás” jelzi, hogy a cukoré, nem a bázisé). A bázis az 1′, a következő foszfát a 3′, az előző az 5′ szénatomhoz kötődik.',
        how: 'A sejt a ribonukleotidokból állítja elő: a **ribonukleotid-reduktáz** enzim eltávolítja a 2′ szénatom OH-csoportját. Ez az egyetlen út, amellyel a sejt DNS-építőkövet tud gyártani, ezért fontos célpontja egyes rákellenes gyógyszereknek.',
        uni: 'A 2′-OH hiánya kulcsfontosságú a **kémiai stabilitáshoz**: az RNS-ben a 2′-OH intramolekuláris nukleofilként hasítja a szomszédos foszfodiésztert (lúgos hidrolízis), a DNS ezért nagyságrendekkel stabilabb, alkalmasabb hosszú távú tárolásra. A furanózgyűrű konformációja (**cukorbillenés**, sugar pucker) határozza meg a hélixformát: B-DNS-ben C2′-endo, A-formában (és RNS-duplexben) C3′-endo.',
        fact: 'A DNS és az RNS közti egyik fő különbség ez az egyetlen hiányzó oxigénatom.'
      },
      {
        id: 'foszfat', z: 6, name: 'Foszfátcsoport', svg: pho, explode: [-52, 0], badge: [s1(Y0 + step * 21)[0], Y0 + step * 21], en: 'phosphate group (phosphodiester linkage)',
        what: 'A gerinc másik építőeleme, a rajzon narancssárga golyók. Minden foszfát két szomszédos cukrot köt össze: az egyik cukor **3′**, a másik **5′** szénatomjához kapcsolódik. Ettől lesz a szálnak iránya.',
        madeOf: 'Egy **foszforatom** körül négy **oxigénatom** (PO₄). Az egyik oxigén negatív töltésű, ezért a DNS-molekula egésze erősen negatív töltésű.',
        how: 'A nukleotidok **trifoszfát** formában (pl. dATP) érkeznek. Beépüléskor két foszfát lehasad, és az energia felszabadul; a megmaradt foszfát köti össze a cukrokat.',
        uni: 'A foszfát negatív töltése teszi lehetővé a **gélelektroforézist**: elektromos térben a DNS-darabok a pozitív pólus felé vándorolnak, a kisebbek gyorsabban (a térhálóban a mozgékonyság kb. a méret logaritmusával csökken). A töltéssűrűség miatt a DNS hajlékonyságát erősen befolyásolja az ionerősség: a **perzisztenciahossz** fiziológiás sókoncentrációnál kb. 50 nm (≈150 bp).',
        terms: ['kemia-bsc/pka'],
        fact: 'Ugyanez a foszfátcsoport van az ATP-ben, a sejt „energiavalutájában” is.'
      },
      {
        id: 'bazisok', z: 2, name: 'Nitrogénbázisok (A, T, G, C)', svg: bases, explode: [0, 0], badge: [CX + 6, Y0 + step * 9.5], lesson: 'biologia/genetika', en: 'nucleobases: adenine, thymine, guanine, cytosine',
        what: 'A hágcsó „fokai”. Négyféle bázis van: **adenin (A)**, **timin (T)**, **guanin (G)** és **citozin (C)**. Mindig **A párosodik T-vel** és **G a C-vel** (komplementer bázispárok). A bázisok sorrendje a genetikai információ: három egymás utáni bázis (egy **kodon**) egy aminosavat jelöl.',
        madeOf: 'Szén-, nitrogén-, oxigén- és hidrogénatomokból álló gyűrűs molekulák. Az A és a G **purin** (két gyűrű), a T és a C **pirimidin** (egy gyűrű). Minden párban egy nagy és egy kis bázis áll, ezért a „fokok” egyforma hosszúak, és a spirál egyenletes vastagságú.',
        how: 'A sejt egyszerűbb molekulákból (aminosavakból, szén-dioxidból, cukorból) sok lépésben építi fel őket, vagy a lebontott nukleinsavakból újrahasznosítja. Az RNS-ben timin helyett **uracil (U)** van.',
        uni: 'A Watson–Crick-párosodás geometriája miatt a C1′–C1′ távolság mindkét párban kb. 1,08 nm: ez teszi a hélixet szekvenciától függetlenül szabályossá. A stabilitást azonban nem elsősorban a hidrogénkötések, hanem a **bázisstacking** (az egymás fölötti bázisok π–π és van der Waals kölcsönhatása, hidrofób hatás) adja. A GC-tartalom növeli az olvadáspontot (Tₘ): durván `Tₘ ≈ 69,3 + 0,41·(%GC)` °C (Marmur–Doty). A **kodon** 4³ = 64 lehetőséget ad 20 aminosavra és a stopjelekre: a kód **degenerált**.',
        terms: ['kemia-bsc/intermolekularis'],
        fact: 'Az emberi genom kb. 3,1 milliárd bázispár. Ha egy könyvbe írnánk ki a betűit, kb. 1 millió oldal lenne.'
      },
      {
        id: 'hkotes', z: 4, name: 'Hidrogénkötések (A=T, G≡C)', svg: hbond, explode: [8, 0], badge: [HX + 138, HY + 56], en: 'hydrogen bonds (Watson–Crick base pairing)',
        what: 'A két szálat a bázispárok közötti **hidrogénkötések** tartják össze. Az **A és T között 2**, a **G és C között 3** hidrogénkötés van, ezért a G–C pár erősebb. A spirál rajzán a fehér pálcikák jelzik őket a bázispárok közepén.',
        madeOf: 'Nem anyag, hanem gyenge **vonzás**: egy részlegesen pozitív hidrogénatom (amely N-hez kötődik) és egy másik molekula részlegesen negatív N vagy O atomja között. Egy hidrogénkötés kb. 20-szor gyengébb egy kovalens kötésnél.',
        how: 'Magától alakul ki, ha a megfelelő bázisok egymással szemben állnak: a kötések helye és száma miatt csak az A–T és a G–C pár „illik”. Mivel gyengék, enzimek (pl. a **helikáz**) vagy kb. 90 °C-os hő **szét tudja választani** a két szálat, például másoláskor vagy a PCR-ben, lehűtve pedig újra összeállnak.',
        uni: 'Egy N–H···N vagy N–H···O hidrogénkötés energiája vizes közegben csak kb. 4–8 kJ/mol, mert kicsatolódáskor a bázisok a vízzel alakítanak ki hasonló kötéseket: a duplex specifikusságát a kötések **mintázata** (donor–akceptor elrendezés) adja, stabilitását nagyrészt a stacking. A szálszétválás (**denaturáció**) kooperatív, éles átmenet: az UV-abszorbancia 260 nm-en kb. 40%-kal nő (**hiperkróm effektus**), ebből mérik a Tₘ-t.',
        terms: ['kemia-bsc/intermolekularis', 'kemia-bsc/elektronegativitas'],
        fact: 'A gyenge kötés itt előny: így a DNS „cipzárként” könnyen nyitható és zárható, mégis milliárdnyi kötés együtt nagyon stabil.'
      },
      {
        id: 'arkok', z: 1, name: 'Nagy és kis árok', svg: grooves, explode: [24, 0], badge: [GX - 2, (yMajA + yMajB) / 2], en: 'major groove and minor groove',
        what: 'Mivel a két szál nem pont szemben csavarodik, a spirál felszínén két különböző szélességű **barázda** fut körbe: a **nagy árok** és a **kis árok**. Ezeken keresztül „látnak bele” a fehérjék a bázisokba anélkül, hogy szét kellene nyitniuk a kettős spirált.',
        madeOf: 'Nem önálló alkatrész, hanem a spirál **alakjából** adódik: a cukrok a bázispárnak ugyanarra az oldalára esnek, így az egyik oldalon szűk, a másikon széles rés marad.',
        how: 'A géneket ki- és bekapcsoló fehérjék (**transzkripciós faktorok**) jellemzően a nagy árokba illeszkednek, és a bázisok szélein lévő atomok mintázatából ismerik fel a nekik szóló szakaszt. Egyes gyógyszerek és festékek a kis árokba kötődnek.',
        uni: 'B-DNS-ben a nagy árok kb. 2,2 nm széles és 0,85 nm mély, a kis árok kb. 1,2 nm széles és 0,75 nm mély. A nagy árokban minden bázispár **egyedi** H-kötés-donor/akceptor és metilcsoport-mintázatot mutat (A·T, T·A, G·C, C·G megkülönböztethető), a kis árokban A·T és T·A nem. Ezért a szekvenciaspecifikus felismerés (pl. helix-turn-helix, cinkujj motívumok) főleg a nagy árokban történik. Kisárok-kötők pl. a Hoechst és DAPI festékek.',
        fact: 'A DAPI nevű kék festék a kis árokba bújik, és UV-fényben megvilágítva kéken fénylik: így teszik láthatóvá a sejtmagokat a mikroszkópban.'
      },
      {
        id: 'nukleotid', z: 7, name: 'Nukleotid (egy „betű”)', svg: nuc, explode: [8, -6], en: 'nucleotide (deoxyribonucleoside monophosphate)',
        what: 'A DNS építőköve, egy „betű”. Három részből áll: egy **foszfátcsoportból**, egy **dezoxiribóz** cukorból és egy **nitrogénbázisból**. Négyféle nukleotid van, csak a bázisukban különböznek. A DNS e nukleotidok hosszú láncolata.',
        madeOf: 'A rajzon az adenin-nukleotid látható (dAMP). Az atomok: szén, hidrogén, oxigén, nitrogén és foszfor. A cukor szénatomjait **1′–5′** számozzák; az 5′ szénhez kötődik a foszfát, az 1′-hez a bázis, a 3′ szénen lévő OH-csoporthoz kapcsolódik a következő nukleotid.',
        how: 'A sejtben **trifoszfát** formában (dATP, dTTP, dGTP, dCTP) készülnek el, mert a két „extra” foszfát lehasadása adja a beépítés energiáját. A laborban automata szintetizátorokkal is előállítanak rövid DNS-szálakat (oligonukleotidokat), ezek kellenek például a PCR-hez.',
        uni: 'Nómenklatúra: bázis + cukor = **nukleozid** (pl. dezoxiadenozin), + foszfát(ok) = **nukleotid** (dAMP, dADP, dATP). A bázis N-glikozidos kötéssel kapcsolódik a C1′-hez (purinnál N9, pirimidinnél N1), β-konfigurációban. A kémiai DNS-szintézis **foszforamidit-módszerrel** 3′→5′ irányban halad (fordítva, mint a biológiai), lépésenként kb. 99%-os hatékonysággal, ezért kb. 200 nukleotidnál hosszabb szálat így nehéz előállítani.',
        terms: ['kemia-bsc/hibridizacio'],
        fact: 'Ha az emberi genom minden nukleotidja egy mm-es betű lenne, a sor kb. 3100 km hosszú lenne: nagyjából Budapesttől Lisszabonig érne.'
      },
      {
        id: 'gen', z: 0, name: 'Gén (egy kiemelt szakasz)', svg: gene, explode: [-40, 0], badge: [CX - AMP - 23, (GY0 + GY1) / 2], lesson: 'biologia/genetika', en: 'gene',
        what: 'A DNS egy olyan **szakasza**, amely egy fehérje (vagy egy működő RNS) elkészítésének „receptjét” tartalmazza. Az emberi DNS-ben kb. **20 000** fehérjét kódoló gén van, de ezek a teljes DNS-nek csak kb. 1–2%-át teszik ki. A többi rész szabályozó szakasz, ismétlődés, vagy még ismeretlen szerepű.',
        madeOf: 'Ugyanabból áll, mint a DNS többi része: nukleotidok sorozatából. Egy gén néhány száz bázispártól több millió bázispárig terjedhet. Az elején egy **promóter** szakasz jelzi, hol kell elkezdeni a leolvasást.',
        how: 'Amikor a sejtnek szüksége van a fehérjére, a gént **átírja** (transzkripció) egy mRNS-másolatra, ezt pedig a riboszómák **lefordítják** (transzláció) aminosav-sorrenddé. A gének a szülőktől öröklődnek: minden génből egy példányt anyádtól, egyet apádtól kaptál.',
        uni: 'Az eukarióta gén **exonokból** és **intronokból** áll; az elsődleges átiratból a spliceoszóma vágja ki az intronokat. **Alternatív splicing** révén egy génről több fehérjeváltozat készülhet (az emberi gének >90%-ánál). A génexpressziót cisz-elemek (promóter, enhanszer, szilenszer), transzkripciós faktorok és epigenetikai jelek (CpG-metiláció, hisztonmódosítások) szabályozzák. A centrális dogma: DNS → RNS → fehérje (kivétel pl. a reverz transzkripció).',
        fact: 'Az egyik leghosszabb emberi gén, a disztrofiné, kb. 2,2 millió bázispár; átírása kb. 16 órát vesz igénybe.'
      },
      {
        id: 'kromoszoma', z: 7, name: 'Kromoszóma és hisztonok', svg: chromo, explode: [8, 6], link: 'sejt', lesson: 'biologia/sejt', en: 'chromosome, histones, nucleosome, chromatin',
        what: 'Egy sejt DNS-e kb. **2 méter** hosszú, mégis befér egy pár mikrométeres sejtmagba. Ehhez szorosan fel van csomagolva: a DNS **hisztonfehérjék** köré tekeredik (ezek a **nukleoszómák**, mint gyöngyök egy fonalon), ezek tovább tekerednek, végül a sejtosztódáskor kialakulnak a mikroszkóppal is látható, X alakú **kromoszómák**.',
        madeOf: 'Kb. fele-fele arányban **DNS** és **fehérje**. Az emberi testi sejtekben **46 kromoszóma** (23 pár) van; mindegyik egyetlen, nagyon hosszú DNS-molekula. Az X alak két egyforma testvérkromatidából áll, amelyeket a **centromer** fog össze.',
        how: 'A csomagolás folyamatosan változik: ahol a géneket olvasni kell, ott a kromatin **lazább**, ahol nem, ott tömörebb. Sejtosztódás előtt a DNS megkettőződik, majd a kromoszómák erősen feltekerednek, hogy a két utódsejt között szét lehessen húzni őket. Kattints a gombra, és nézz bele a **sejtbe**!',
        uni: 'Egy nukleoszóma 147 bp DNS-t tekercsel 1,65 fordulatban egy **hiszton-oktamer** (H2A, H2B, H3, H4, mindegyikből 2) köré; a linker-DNS-t a H1 hiszton köti. A tömörítés: 2 nm-es duplex → 11 nm-es „gyöngysor” → kromatinhurkok (kohezin, CTCF) és **TAD-ok** → metafázisos kromoszóma (kb. 10 000-szeres tömörítés). A kromoszómák végein a **telomerek** (TTAGGG ismétlődések) védenek; a végreplikációs problémát a **telomeráz** reverz transzkriptáz oldja meg.',
        fact: 'Ha a sejtmag egy teniszlabda méretű lenne, a benne lévő DNS kb. 20 km hosszú, hajszálvékony fonal lenne.'
      },
      {
        id: 'atomok', z: 7, name: 'Atomok (C, H, O, N, P)', svg: atoms, explode: [-6, 6], link: 'atom', en: 'atoms: carbon, hydrogen, oxygen, nitrogen, phosphorus',
        what: 'A DNS mindössze **öt elemből** épül fel: **szénből (C)**, **hidrogénből (H)**, **oxigénből (O)**, **nitrogénből (N)** és **foszforból (P)**. A rajzon golyómodellben egy foszfátcsoport és egy cukor-részlet látható, a szokásos színekkel: szén sötétszürke, hidrogén fehér, oxigén piros, nitrogén kék, foszfor narancs.',
        madeOf: 'Egy bázispár kb. 60–70 atomból áll. Az emberi genom teljes DNS-ében több száz milliárd atom van sejtenként. A nitrogén a bázisokban, a foszfor a gerincben van, a szén, hidrogén és oxigén mindenhol.',
        how: 'Ezek az atomok a táplálékodból származnak: a nitrogén a fehérjék aminosavaiból, a foszfor pl. a tejtermékek foszfátjaiból. A sejt **kovalens kötésekkel** kapcsolja őket molekulákká. Kattints a gombra, és nézz bele egy **atomba**!',
        uni: 'A bázisok gyűrűi **aromás**, sp²-hibridizált, sík rendszerek: ez teszi lehetővé a szoros stackinget és az UV-elnyelést (λ_max ≈ 260 nm). A heteroatomok (N, O) **elektronegativitása** polarizálja az N–H és C=O kötéseket: ezek a hidrogénkötés-donorok és -akceptorok. Egyes bázisok **tautomer** formái (pl. ritka imino/enol alak) hibás párosodást okozhatnak: ez a spontán pontmutációk egyik forrása.',
        terms: ['kemia-bsc/atompalya', 'kemia-bsc/hibridizacio', 'kemia-bsc/elektronegativitas'],
        fact: 'A Meselson–Stahl-kísérletben a nitrogénatomok nehezebb izotópjával (¹⁵N) jelölték meg a DNS-t, így tudták követni a régi és az új szálakat.'
      },
      {
        id: 'meret', z: 1, name: 'Méretek: menet és átmérő', svg: dims, explode: [24, 0], badge: [DX, (yP0 + yP1) / 2 + 56], en: 'helical pitch and diameter (B-DNA)',
        what: 'A kettős spirál **2 nm** átmérőjű, és kb. **3,4–3,6 nm**-enként tesz meg egy teljes fordulatot, ez alatt kb. **10,5 bázispár** követi egymást. A spirál **jobbmenetes**, mint egy átlagos csavar.',
        madeOf: 'A méreteket a molekula felépítése határozza meg: a bázispárok kb. 0,34 nm-re vannak egymástól, és mindegyik kb. 34°-kal elfordul az előzőhöz képest. 10,5 × 34° ≈ 360°, vagyis egy teljes kör.',
        how: 'A méreteket **röntgendiffrakcióval** mérték meg: a DNS-szálakról készült felvételek (pl. Rosalind Franklin híres **51-es fotója**) X alakú mintázatából lehetett kiszámolni a spirál átmérőjét és menetemelkedését.',
        uni: 'A spirális szerkezet diffrakciós képe Bessel-függvényekkel írható le (Cochran–Crick–Vand, 1952): a rétegvonalak közti távolság a menetemelkedés reciproka, a „hiányzó” 4. rétegvonal a két szál fáziseltolását mutatja (kis és nagy árok). A DNS-nek más formái is vannak: az **A-DNS** (víztelenebb, 11 bp/menet, szélesebb) és a balmenetes **Z-DNS** (váltakozó GC-szekvenciákban).',
        fact: 'Egy hajszál kb. 50 000-szer vastagabb a DNS kettős spiráljánál.'
      }
    ],
    uni: {
      text: 'Egyetemi szemmel a DNS egy **polimer**, amelynek szerkezetét kémiai kötések hierarchiája határozza meg: a gerincet **kovalens foszfodiészter-kötések**, a két szálat **hidrogénkötések**, a spirál stabilitását pedig főleg a **bázisstacking** és a hidrofób hatás adja. A duplex képződése szabadentalpia-mérlegként írható le: `ΔG = ΔH − T·ΔS`, ahol a kedvező entalpiát (stacking, H-kötések) a két szál összekapcsolódásának entrópiaveszteség ellensúlyozza; ezért van éles **olvadási hőmérséklet** (Tₘ). A **replikáció szemikonzervatív** (Meselson–Stahl), a polimerázok csak 5′→3′ irányban szintetizálnak, primert igényelnek, és **3′→5′ exonukleáz** aktivitással lektorálnak: a hibaarány polimeráz-szelekcióval kb. 10⁻⁵, lektorálással 10⁻⁷, a hibajavító (mismatch repair) rendszerrel együtt kb. 10⁻⁹–10⁻¹⁰ bázisonként.',
      terms: ['kemia-bsc/intermolekularis', 'kemia-bsc/gibbs', 'kemia-bsc/entropia', 'kemia-bsc/aktivalasi-energia']
    },
    steps: [
      { icon: '📍', title: '1. Indulás: a replikációs origó', text: 'A DNS **megkettőződése** (replikáció) minden sejtosztódás előtt lezajlik. Meghatározott pontokon, a **replikációs origókban** kezdődik; az emberi DNS-ben több tízezer ilyen pont van, hogy a munka néhány óra alatt elkészüljön.', parts: ['gerinc', 'gen'] },
      { icon: '🔓', title: '2. Helikáz: a cipzár szétnyitása', text: 'A **helikáz** enzim végighalad a DNS-en, és **felszakítja a bázispárok közti hidrogénkötéseket**: a két szál szétválik, kialakul a Y alakú **replikációs villa**. A szétvált szálakat egyszálkötő fehérjék tartják szét, a **topoizomeráz** pedig előtte enyhíti a csavarodást, hogy a DNS ne gubancolódjon össze.', parts: ['hkotes', 'bazisok'] },
      { icon: '🏁', title: '3. Primáz: rajtvonal', text: 'A DNS-polimeráz nem tud a semmiből szálat kezdeni, csak egy meglévő szálat hosszabbítani. Ezért először a **primáz** egy rövid, kb. 10 nukleotidos **RNS-indítószakaszt** (primert) épít.', parts: ['nukleotid'] },
      { icon: '🧱', title: '4. DNS-polimeráz és a vezető szál', text: 'A **DNS-polimeráz** a régi szálat mintaként használva illeszti be a komplementer nukleotidokat (A-val szemben T, G-vel szemben C). Csak **5′→3′ irányban** tud építeni. Az egyik szálon (a **vezető szálon**) ez pont a villa nyitódásának irányába esik, így ez **folyamatosan** készül, másodpercenként kb. 50 (baktériumban akár 1000) nukleotiddal.', parts: ['nukleotid', 'gerinc', 'bazisok'] },
      { icon: '🧩', title: '5. A késlekedő szál: Okazaki-darabok', text: 'A másik szál ellentétes irányú (antiparallel), ezért ott a polimeráz csak **visszafelé, darabokban** tud dolgozni: minden darab egy új primerrel kezdődik. Ezek a kb. 100–200 nukleotidos (baktériumban 1000–2000) **Okazaki-fragmentumok**. Ez a **késlekedő szál**.', parts: ['gerinc', 'foszfat'] },
      { icon: '🪡', title: '6. Primerek cseréje és ligáz', text: 'Egy másik DNS-polimeráz kivágja az RNS-primereket, és DNS-sel tölti ki a helyüket. A darabok közt maradt réseket a **DNS-ligáz** zárja le egy foszfodiészter-kötéssel, így összefüggő szál lesz.', parts: ['foszfat', 'dezoxiriboz'] },
      { icon: '🔍', title: '7. Ellenőrzés és eredmény', text: 'A polimeráz menet közben **ellenőrzi** a munkáját, és a hibás nukleotidot azonnal kivágja; a maradék hibákat javító enzimek keresik meg. Végül kb. **egymilliárd bázisonként egy** hiba marad. Az eredmény két egyforma DNS-molekula, mindegyikben **egy régi és egy új szál** (szemikonzervatív replikáció).', parts: ['bazisok', 'hkotes'] },
      { icon: '📜', title: '8. Transzkripció: a gén átírása', text: 'Amikor egy fehérjére van szükség, az **RNS-polimeráz** a gén elején (promóter) rákapcsolódik a DNS-re, helyben szétnyitja, és az egyik szálat mintaként használva **mRNS**-t épít (timin helyett uracillal). A DNS mögötte visszazáródik. Az mRNS a sejtmagból kijut a riboszómákhoz, ahol fehérje készül belőle.', parts: ['gen', 'arkok'] },
      { icon: '📦', title: '9. Csomagolás', text: 'A kész DNS **hisztonok** köré tekeredik, és a kromatin tovább tömörödik. Sejtosztódáskor a két másolat X alakú **kromoszómákká** tekeredik fel, és a két utódsejt mindegyike egy teljes készletet kap.', parts: ['kromoszoma'] }
    ],
    history: [
      { year: '1869', text: '**Friedrich Miescher** svájci orvos kötszerekről gyűjtött fehérvérsejtek magjából egy foszfortartalmú anyagot von ki, amelyet **nukleinnek** nevez. Ez volt a DNS első izolálása.' },
      { year: '1950', text: '**Erwin Chargaff** kimutatja a róla elnevezett szabályokat: minden élőlény DNS-ében az A mennyisége egyenlő a T-ével, a G-é a C-ével, de az A+T és G+C aránya fajonként eltér.' },
      { year: '1952', text: '**Rosalind Franklin** és Raymond Gosling elkészíti a híres **51-es fotót**: a DNS-szál röntgendiffrakciós képe, amelynek X alakú mintázata spirális szerkezetre utal.' },
      { year: '1953', text: '**James Watson** és **Francis Crick** Franklin és Maurice Wilkins adatainak felhasználásával megalkotja a **kettős spirál** modellt, komplementer bázispárokkal. (Watson, Crick és Wilkins 1962-ben Nobel-díjat kapott; Franklin 1958-ban meghalt.)' },
      { year: '1958', text: '**Matthew Meselson** és **Franklin Stahl** nehéz nitrogénizotóppal (¹⁵N) és sűrűséggradiens-centrifugálással igazolja, hogy a replikáció **szemikonzervatív**: minden új molekulában egy régi és egy új szál van.' },
      { year: '1983', text: '**Kary Mullis** feltalálja a **PCR**-t (polimeráz-láncreakció), amellyel egyetlen DNS-szakaszból órák alatt milliárdnyi másolat készíthető. Ma ezen alapul a genetikai vizsgálatok és a fertőzések kimutatásának nagy része (Nobel-díj 1993).' },
      { year: '2003', text: 'Befejeződik a **Humán Genom Projekt**: nemzetközi együttműködésben, 13 év munkájával meghatározzák az emberi DNS kb. 3 milliárd bázispárjának sorrendjét (a teljes, hézagmentes szekvencia 2022-ben készült el).' },
      { year: '2012', text: '**Emmanuelle Charpentier** és **Jennifer Doudna** megmutatja, hogy a **CRISPR–Cas9** bakteriális védekezőrendszer programozható „génollóként” használható: a DNS tetszőleges pontján lehet vágni és javítani (Nobel-díj 2020).' }
    ],
    quiz: [
      { q: 'Melyik bázis párosodik a guaninnal (G)?', options: ['Citozin (C)', 'Adenin (A)', 'Timin (T)', 'Uracil (U)'], answer: 0, explain: 'A párosodás szabálya: A–T és G–C. A G és a C között 3 hidrogénkötés van.' },
      { q: 'Miből áll a DNS „korlátja”, a gerinc?', options: ['Felváltva cukorból és foszfátból', 'Csak bázisokból', 'Hisztonfehérjékből', 'Aminosavakból'], answer: 0, explain: 'A dezoxiribóz cukrokat foszfátcsoportok kötik össze, a bázisok befelé lógnak.' },
      { q: 'Melyik enzim nyitja szét a két szálat replikációkor?', options: ['Helikáz', 'Ligáz', 'Primáz', 'RNS-polimeráz'], answer: 0, explain: 'A helikáz felszakítja a bázispárok közti hidrogénkötéseket. A ligáz a darabokat köti össze, a primáz indítószakaszt készít.' },
      { q: 'Mit jelent, hogy a DNS két szála antiparallel?', options: ['Ellentétes irányban futnak (5′→3′ és 3′→5′)', 'Párhuzamosak és azonos irányúak', 'Nem érintkeznek', 'Az egyik DNS, a másik RNS'], answer: 0, explain: 'Emiatt a késlekedő szálon a polimeráz csak darabokban (Okazaki-fragmentumok) tud dolgozni.' },
      { q: 'Mit igazolt a Meselson–Stahl-kísérlet (1958)?', options: ['A replikáció szemikonzervatív', 'A DNS kettős spirál', 'A gének fehérjékből állnak', 'A DNS-ben 4 bázis van'], answer: 0, explain: 'Minden új DNS-molekulában egy régi és egy újonnan készült szál van.' }
    ]
  });
})();
