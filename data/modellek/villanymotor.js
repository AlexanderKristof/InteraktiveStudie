/* Modell: villanyautó-hajtómotor – állandó mágneses szinkronmotor (PMSM, belső mágneses forgórész).
 * Izometrikus, „negyedkivágásos” rajz: minden hengeres alkatrészből ugyanaz a felső-elülső negyed
 * hiányzik, így összerakva is belelátunk a motorba. A tengely a világ x irányába mutat
 * (a képen balról fentről jobbra le), a keresztmetszet az y–z síkban van. */
(function () {
  var K = 0.9, I = STUDIE.draw.iso(378, 288, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  var TAU = 2 * Math.PI;
  function P(p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  /* pont a tengely körül: x hossz, r sugár, a szög (0 = +y, 90° = +z) */
  function Q(x, r, a) { return I.pt(x, r * Math.cos(a), r * Math.sin(a)); }
  function pg(pts, fill, stroke, w, extra) {
    return '<polygon points="' + pts.map(P).join(' ') + '" fill="' + fill + '" stroke="' + (stroke || 'rgba(0,0,0,.3)') + '" stroke-width="' + (w == null ? 0.8 : w) + '" stroke-linejoin="round"' + (extra || '') + '/>';
  }
  function ln(p, q, stroke, w, extra) {
    return '<line x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) + '" x2="' + q[0].toFixed(1) + '" y2="' + q[1].toFixed(1) + '" stroke="' + stroke + '" stroke-width="' + w + '"' + (extra || '') + NS + '/>';
  }
  function arc(x, r, a0, a1, n) { var o = []; for (var i = 0; i <= n; i++) o.push(Q(x, r, a0 + (a1 - a0) * i / n)); return o; }

  /* Henger vagy cső (r1 = 0: tömör) x0-tól x1-ig. opt.cut: hiányzik a 0–90°-os negyed.
   * Sorrend: belső hátsó palást → külső elülső palást → metszetlapok → közeli véglap. */
  var CUT0 = TAU / 4;   // a meglévő anyag CUT0 … TAU között
  function tube(x0, x1, r1, r2, color, opt) {
    opt = opt || {};
    var cut = opt.cut !== false, n = opt.n || 64, s = '', i, a, b, m, fct;
    var A0 = cut ? CUT0 : 0, A1 = TAU;
    function inRange(t) { return t >= A0 - 1e-9 && t <= A1 + 1e-9; }
    // belső palást (csak a hátsó, felénk néző fele látszik)
    if (r1 > 0) {
      for (i = 0; i < n; i++) {
        a = i / n * TAU; b = (i + 1) / n * TAU; m = (a + b) / 2; fct = Math.cos(m) + Math.sin(m);
        if (fct >= 0 || !inRange(a) || !inRange(b)) continue;
        var ci = shade(color, 0.42 + 0.16 * (-fct) / 1.42);
        s += pg([Q(x0, r1, a), Q(x0, r1, b), Q(x1, r1, b), Q(x1, r1, a)], ci, ci, 0.5);
      }
    }
    // külső palást (a felénk néző sávok)
    for (i = 0; i < n; i++) {
      a = i / n * TAU; b = (i + 1) / n * TAU; m = (a + b) / 2; fct = Math.cos(m) + Math.sin(m);
      if (fct <= -0.02 || !inRange(a) || !inRange(b)) continue;
      var co = shade(color, 0.62 + 0.36 * fct / 1.42);
      s += pg([Q(x0, r2, a), Q(x0, r2, b), Q(x1, r2, b), Q(x1, r2, a)], co, co, 0.5);
    }
    if (opt.lam) {   // lemezelés: körívek a paláston
      for (var lx = x0 + opt.lam; lx < x1 - 1; lx += opt.lam) {
        var segs = [[-Math.PI / 4, 0], [CUT0, 3 * Math.PI / 4]];
        if (!cut) segs = [[-Math.PI / 4, 3 * Math.PI / 4]];
        segs.forEach(function (sg) { s += '<polyline points="' + arc(lx, r2, sg[0], sg[1], 10).map(P).join(' ') + '" fill="none" stroke="rgba(0,0,0,.22)" stroke-width=".6"' + NS + '/>'; });
      }
    }
    if (opt.skin) s += opt.skin;
    // metszetlapok
    if (cut) {
      var cc = opt.cutColor || shade(color, 1.18);
      s += pg([Q(x0, r1, 0), Q(x1, r1, 0), Q(x1, r2, 0), Q(x0, r2, 0)], cc, 'rgba(0,0,0,.35)', 0.8);
      s += pg([Q(x0, r1, CUT0), Q(x1, r1, CUT0), Q(x1, r2, CUT0), Q(x0, r2, CUT0)], shade(cc, 0.9), 'rgba(0,0,0,.35)', 0.8);
      if (opt.lam) for (var cx = x0 + opt.lam; cx < x1 - 1; cx += opt.lam) {
        s += ln(Q(cx, r1, 0), Q(cx, r2, 0), 'rgba(0,0,0,.16)', 0.6) + ln(Q(cx, r1, CUT0), Q(cx, r2, CUT0), 'rgba(0,0,0,.16)', 0.6);
      }
    }
    // közeli véglap (x1)
    var fc = opt.faceColor || shade(color, 1.06), d;
    if (cut) {
      var outer = arc(x1, r2, A0, A1, 48), inner = r1 > 0 ? arc(x1, r1, A1, A0, 32) : [Q(x1, 0, 0)];
      d = 'M' + outer.concat(inner).map(P).join(' L') + ' Z';
    } else {
      d = 'M' + arc(x1, r2, 0, TAU, 48).map(P).join(' L') + ' Z' + (r1 > 0 ? ' M' + arc(x1, r1, 0, TAU, 32).map(P).join(' L') + ' Z' : '');
    }
    if (opt.holes) d += opt.holes;
    s += '<path d="' + d + '" fill="' + fc + '" fill-rule="evenodd" stroke="rgba(0,0,0,.4)" stroke-width="0.9" stroke-linejoin="round"/>';
    if (opt.face) s += opt.face;
    return s;
  }

  var defs = '<defs>' +
    '<linearGradient id="vm-cable" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f59a3c"/><stop offset="1" stop-color="#d96d14"/></linearGradient>' +
    '<radialGradient id="vm-field" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#7aa8ff" stop-opacity="0"/><stop offset=".8" stop-color="#7aa8ff" stop-opacity=".18"/><stop offset="1" stop-color="#7aa8ff" stop-opacity="0"/></radialGradient>' +
    '</defs>';
  var backdrop = defs +
    '<text class="lbl" x="14" y="24" font-size="17">Villanyautó-hajtómotor – állandó mágneses szinkronmotor</text>' +
    '<text class="lbl-muted" x="14" y="42">negyedkivágásos rajz · a forgórész mágnesei: piros = északi, kék = déli pólus</text>' +
    '<g transform="translate(580 566)"' + NS + '>' +
    '<rect x="0" y="-9" width="22" height="7" rx="3" fill="#c8763a"/><text class="lbl-muted" x="28" y="-2" font-size="11">réz tekercselés</text>' +
    '<rect x="170" y="-9" width="22" height="7" rx="3" fill="#8e99a8"/><text class="lbl-muted" x="198" y="-2" font-size="11">elektrotechnikai acéllemez</text>' +
    '<rect x="0" y="11" width="22" height="7" rx="3" fill="#3d8fe0"/><text class="lbl-muted" x="28" y="18" font-size="11">hűtőfolyadék</text>' +
    '<rect x="170" y="11" width="22" height="7" rx="3" fill="#e8862a"/><text class="lbl-muted" x="198" y="18" font-size="11">nagyfeszültség (400–800 V)</text></g>';

  /* ---------- méretek (világkoordináta, „mm-szerű” egység) ---------- */
  var H0 = 0, H1 = 240, HR1 = 95, HR2 = 110;        // ház
  var S0 = 30, S1 = 210, SR1 = 62, SR2 = 95;        // állórész-lemezköteg
  var R0 = 34, R1 = 206, RR = 60, SH = 16;          // forgórész, tengely sugara

  /* ---------- 1. Állórész-ház hűtőköpennyel, rögzítőkarimával ---------- */
  var housing = tube(H0, H1, HR1, HR2, '#a7b2bf', { cutColor: '#c3ccd6' }) +
    tube(H1, H1 + 7, HR1, 124, '#97a3b1', { cutColor: '#b9c3ce' });
  [[-0.2], [3.3], [4.4]].forEach(function (an) {   // csavarfuratok a karimán
    var p = Q(H1 + 7, 117, an[0]);
    housing += '<ellipse cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" rx="3.2" ry="2.4" fill="#4b5563"' + NS + '/>';
  });
  // bordázat a ház tetején (merevítés)
  for (var rb = 20; rb < 230; rb += 26) housing += '<polyline points="' + arc(rb, HR2 + 0.5, CUT0 + 0.05, 3 * Math.PI / 4, 8).map(P).join(' ') + '" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.4"' + NS + '/>';
  var hl = I.pt(140, -HR2 + 4, -30);
  housing += '<text x="' + hl[0].toFixed(1) + '" y="' + hl[1].toFixed(1) + '" font-size="9" font-weight="700" fill="#4b5563" transform="rotate(30 ' + hl[0].toFixed(1) + ' ' + hl[1].toFixed(1) + ')"' + NS + '>PMSM · 150 kW</text>';

  /* ---------- 2. Hűtés: csatornák a ház falában, be- és kilépő csonk ---------- */
  var cool = '';
  for (var cx2 = 10; cx2 < 228; cx2 += 17) {
    cool += pg([Q(cx2, 99, 0), Q(cx2 + 10, 99, 0), Q(cx2 + 10, 106, 0), Q(cx2, 106, 0)], '#3d8fe0', '#1f5f9e', 0.7) +
      pg([Q(cx2 + 8, 99, CUT0), Q(cx2 + 18, 99, CUT0), Q(cx2 + 18, 106, CUT0), Q(cx2 + 8, 106, CUT0)], '#3d8fe0', '#1f5f9e', 0.7);
  }
  // csonkok a ház tetején (a z tengely mentén felfelé), tömlővel
  cool += I.cyl(118, -26, 104, 7, 22, '#3d8fe0') + I.cyl(118, -26, 126, 9, 4, '#2a6db3') +
    I.cyl(196, -26, 104, 7, 22, '#e8743a') + I.cyl(196, -26, 126, 9, 4, '#b8561f');
  var ci1 = I.pt(118, -26, 130), ci2 = I.pt(196, -26, 130);
  function hose(c, dark, col) {
    var d = 'M' + c[0].toFixed(1) + ' ' + c[1].toFixed(1) + ' q4 -26 34 -36';
    return '<path d="' + d + '" fill="none" stroke="' + dark + '" stroke-width="9" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="6" stroke-linecap="round"/>';
  }
  cool += hose(ci1, '#1f5f9e', '#3d8fe0') + hose(ci2, '#9a4614', '#e8743a') +
    '<text class="lbl-muted" x="' + (ci1[0] + 40).toFixed(1) + '" y="' + (ci1[1] - 40).toFixed(1) + '" font-size="10.5"' + NS + '>hűtőfolyadék be</text>' +
    '<text class="lbl-muted" x="' + (ci2[0] + 40).toFixed(1) + '" y="' + (ci2[1] - 40).toFixed(1) + '" font-size="10.5"' + NS + '>ki (melegebb)</text>';

  /* ---------- 3. Állórész-lemezköteg (hornyokkal) ---------- */
  var slotFace = '';
  for (var sl = 0; sl < 48; sl++) {   // hornyok a köteg véglapján (a tekercsfej takarja a nagyját)
    var sa = (sl + 0.5) / 48 * TAU;
    if (sa < CUT0 + 0.04) continue;
    slotFace += pg([Q(S1, SR1, sa - 0.035), Q(S1, SR1, sa + 0.035), Q(S1, SR1 + 20, sa + 0.035), Q(S1, SR1 + 20, sa - 0.035)], '#5b6573', 'none', 0);
  }
  var stator = tube(S0, S1, SR1, SR2, '#8e99a8', { lam: 6, cutColor: '#b7c0cb', face: slotFace });

  /* ---------- 4. Tekercselés: hajtűs rézvezetők a hornyokban + tekercsfejek ---------- */
  var CU = '#c8763a', WX0 = 8, WX1 = 232;
  function headRing(x0, x1) {
    var skin = '';
    for (var k2 = 0; k2 < 40; k2++) {   // „hajtű” ferde vonalak a tekercsfej palástján
      var a2 = -Math.PI / 4 + k2 / 40 * Math.PI;
      if (a2 > 0 && a2 < CUT0) continue;
      skin += ln(Q(x0, 86, a2), Q(x1, 86, a2 + 0.12), 'rgba(90,40,10,.45)', 0.8);
    }
    var face = '';
    for (var k3 = 0; k3 < 48; k3++) {
      var a3 = (k3 + 0.5) / 48 * TAU;
      if (a3 < CUT0 + 0.04) continue;
      face += ln(Q(x1, 65, a3), Q(x1, 85, a3 + 0.05), 'rgba(255,220,180,.55)', 1.1);
    }
    return tube(x0, x1, 64, 86, CU, { cutColor: '#e0965a', skin: skin, face: face });
  }
  var wind = headRing(WX0, S0) + headRing(S1, WX1);
  // a hornyokban futó négy rétegnyi lapos vezető a két metszetlapon
  [0, 1, 2, 3].forEach(function (L) {
    var r0 = 64 + L * 5, r1 = r0 + 4;
    wind += pg([Q(S0, r0, 0), Q(S1, r0, 0), Q(S1, r1, 0), Q(S0, r1, 0)], L % 2 ? '#d98a4c' : CU, '#7a4218', 0.5) +
      pg([Q(S0, r0, CUT0), Q(S1, r0, CUT0), Q(S1, r1, CUT0), Q(S0, r1, CUT0)], L % 2 ? '#c98044' : '#b86a30', '#7a4218', 0.5);
  });

  /* ---------- 5. Állandó mágnesek (V elrendezés, 8 pólus; a kivágott negyed két pólusa hiányzik) ---------- */
  var poles = [], magnets = '', pockets = '';
  for (var pi = 0; pi < 8; pi++) {
    var th = (pi + 0.5) / 8 * TAU;
    if (th > 0 && th < CUT0) continue;
    poles.push({ th: th, north: pi % 2 === 0 });
  }
  function slabs(th) {   // egy pólus két mágnesének keresztmetszete (y, z sarokpontok)
    var er = [Math.cos(th), Math.sin(th)], et = [-Math.sin(th), Math.cos(th)], out = [];
    [-1, 1].forEach(function (sgn) {
      var c = [44 * er[0] + sgn * 11 * et[0], 44 * er[1] + sgn * 11 * et[1]];
      var dl = [0.62 * er[0] + sgn * 0.78 * et[0], 0.62 * er[1] + sgn * 0.78 * et[1]];
      var nn = [-dl[1], dl[0]];
      out.push([[c[0] - 8 * dl[0] - 2.4 * nn[0], c[1] - 8 * dl[1] - 2.4 * nn[1]], [c[0] + 8 * dl[0] - 2.4 * nn[0], c[1] + 8 * dl[1] - 2.4 * nn[1]],
        [c[0] + 8 * dl[0] + 2.4 * nn[0], c[1] + 8 * dl[1] + 2.4 * nn[1]], [c[0] - 8 * dl[0] + 2.4 * nn[0], c[1] - 8 * dl[1] + 2.4 * nn[1]]]);
    });
    return out;
  }
  poles.forEach(function (pl) {
    var col = pl.north ? '#d9484a' : '#3f73d6';
    slabs(pl.th).forEach(function (cs) {
      // oldallapok (amelyik felénk néz), majd a közeli véglap
      for (var e = 0; e < 4; e++) {
        var p0 = cs[e], p1 = cs[(e + 1) % 4];
        var nrm = [p1[1] - p0[1], -(p1[0] - p0[0])];
        var cen = [(cs[0][0] + cs[2][0]) / 2, (cs[0][1] + cs[2][1]) / 2], mid = [(p0[0] + p1[0]) / 2 - cen[0], (p0[1] + p1[1]) / 2 - cen[1]];
        if (nrm[0] * mid[0] + nrm[1] * mid[1] < 0) nrm = [-nrm[0], -nrm[1]];
        if (nrm[0] + nrm[1] <= 0) continue;
        magnets += pg([I.pt(R0, p0[0], p0[1]), I.pt(R1, p0[0], p0[1]), I.pt(R1, p1[0], p1[1]), I.pt(R0, p1[0], p1[1])], shade(col, 0.72), shade(col, 0.45), 0.6);
      }
      magnets += pg(cs.map(function (c) { return I.pt(R1, c[0], c[1]); }), col, shade(col, 0.5), 0.8);
      pockets += ' M' + cs.map(function (c) { return P(I.pt(R1, c[0], c[1])); }).join(' L') + ' Z';
    });
  });

  /* ---------- 6. Forgórész-lemezköteg (zsebekkel a mágneseknek) ---------- */
  var rotor = tube(R0, R1, SH, RR, '#7d8896', { lam: 6, cutColor: '#a9b3bf', holes: pockets });

  /* ---------- 7. Tengely (bordás kimenővéggel) ---------- */
  var T0 = -66, T1 = 330;
  var shaft = tube(T0, T1, 0, SH, '#9aa4b0', { cut: false, n: 40 });
  for (var sp = 0; sp < 10; sp++) {   // bordázás (spline) a kimenő végen
    var sa2 = -Math.PI / 4 + sp / 9 * Math.PI;
    shaft += ln(Q(296, SH + 0.2, sa2), Q(T1, SH + 0.2, sa2), 'rgba(40,48,58,.55)', 1);
  }
  shaft += ln(Q(290, SH + 0.2, -Math.PI / 4), Q(290, SH + 0.2, 3 * Math.PI / 4), 'rgba(40,48,58,.45)', 0.8);

  /* ---------- 8. Csapágyak (hátsó és első mélyhornyú golyóscsapágy) ---------- */
  function bearing(x0, x1) {
    var s = tube(x0, x1, SH, 34, '#b9c2cc', { cut: false, n: 40, faceColor: '#c9d1da' });
    // golyók a két gyűrű között a véglapon
    for (var bi = 0; bi < 12; bi++) {
      var p = Q(x1, 25, bi / 12 * TAU);
      s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.4" fill="#e8edf2" stroke="#5b6573" stroke-width=".7"' + NS + '/>';
    }
    s += '<path d="M' + arc(x1, 22, 0, TAU, 32).map(P).join(' L') + ' Z" fill="none" stroke="rgba(0,0,0,.25)" stroke-width=".7"' + NS + '/>' +
      '<path d="M' + arc(x1, 29, 0, TAU, 32).map(P).join(' L') + ' Z" fill="none" stroke="rgba(0,0,0,.25)" stroke-width=".7"' + NS + '/>';
    return s;
  }
  var bearings = bearing(-24, -8) + bearing(246, 262);

  /* ---------- 9. Rezolver (pozícióérzékelő) ---------- */
  var resolver = tube(-50, -34, 34, 46, '#4a5563', { cut: false, n: 40, faceColor: '#5c6878' });
  for (var rc = 0; rc < 10; rc++) {   // tekercsek az álló részen
    var p2 = Q(-34, 40, rc / 10 * TAU);
    resolver += '<ellipse cx="' + p2[0].toFixed(1) + '" cy="' + p2[1].toFixed(1) + '" rx="3.6" ry="2.6" fill="#c8763a" stroke="#7a4218" stroke-width=".6"' + NS + '/>';
  }
  // forgó, „háromszögletű” (excentrikus) lemezes rész a tengelyen
  var lobe = [];
  for (var lb = 0; lb <= 48; lb++) { var la = lb / 48 * TAU; lobe.push(Q(-40, 25 + 5 * Math.cos(3 * la), la)); }
  resolver += tube(-44, -40, SH, 25, '#9aa4b0', { cut: false, n: 32 }) + pg(lobe, '#b4bdc8', '#3b434d', 0.9);
  var rl = I.pt(-42, 0, 54);
  resolver += '<text class="lbl-muted" x="' + rl[0].toFixed(1) + '" y="' + rl[1].toFixed(1) + '" font-size="10" text-anchor="middle"' + NS + '>sin / cos jel</text>';

  /* ---------- 10. Kivezetések: U, V, W fázis-sínek ---------- */
  var leads = '';
  ['U', 'V', 'W'].forEach(function (ph, i) {
    var x = 12 + i * 8;
    leads += I.box(x, -20, 74, 4, 4, 38, '#c8763a') + I.box(x - 1, -21, 104, 6, 6, 4, '#d9dde3');
  });
  var ut = I.pt(20, -18, 116);
  leads += '<text x="' + (ut[0] - 26).toFixed(1) + '" y="' + (ut[1] + 4).toFixed(1) + '" font-size="10" font-weight="700" fill="#c0601c" text-anchor="end"' + NS + '>U V W</text>';

  /* ---------- 11. Csatlakozó az inverterhez (nagyfeszültségű csatlakozódoboz + kábel) ---------- */
  var conn = I.box(-8, -44, 108, 50, 40, 24, '#e8862a') + I.box(4, -40, 132, 26, 30, 8, '#4a525d');
  var cb = I.pt(17, -25, 140), ce = [cb[0] - 62, cb[1] - 52];
  conn += '<path d="M' + cb[0].toFixed(1) + ' ' + cb[1].toFixed(1) + ' C' + cb[0].toFixed(1) + ' ' + (cb[1] - 40).toFixed(1) + ' ' + (ce[0] + 40).toFixed(1) + ' ' + ce[1].toFixed(1) + ' ' + ce[0].toFixed(1) + ' ' + ce[1].toFixed(1) + '" fill="none" stroke="#9a4a10" stroke-width="13" stroke-linecap="round"/>' +
    '<path d="M' + cb[0].toFixed(1) + ' ' + cb[1].toFixed(1) + ' C' + cb[0].toFixed(1) + ' ' + (cb[1] - 40).toFixed(1) + ' ' + (ce[0] + 40).toFixed(1) + ' ' + ce[1].toFixed(1) + ' ' + ce[0].toFixed(1) + ' ' + ce[1].toFixed(1) + '" fill="none" stroke="url(#vm-cable)" stroke-width="10" stroke-linecap="round"/>' +
    '<text class="lbl" x="' + (ce[0] - 6).toFixed(1) + '" y="' + (ce[1] - 10).toFixed(1) + '" font-size="11" text-anchor="middle"' + NS + '>← inverter</text>';
  var wl = I.pt(18, -4, 120);
  conn += '<text x="' + wl[0].toFixed(1) + '" y="' + wl[1].toFixed(1) + '" font-size="8" font-weight="700" fill="#fff" text-anchor="middle" transform="rotate(30 ' + wl[0].toFixed(1) + ' ' + wl[1].toFixed(1) + ')"' + NS + '>⚡ HV</text>';

  STUDIE.addModel({
    id: 'villanymotor',
    title: 'Villanymotor (állandó mágneses szinkronmotor)',
    icon: '🧲',
    color: '#2f7bf6',
    category: 'Járművek',
    keywords: 'villanymotor elektromotor villanyautó hajtómotor PMSM állandó mágneses szinkronmotor IPM belső mágneses forgórész állórész forgórész lemezköteg elektrotechnikai acél tekercselés hajtűtekercs hairpin neodímium NdFeB ritkaföldfém mágnes tengely csapágy rezolver pozícióérzékelő három fázis U V W inverter FOC mezőorientált szabályozás forgó mágneses mező nyomaték rekuperáció generátor hűtőköpeny olajhűtés Jedlik Ányos Tesla Faraday Kandó',
    summary: 'Három fázisáram forgó mágneses mezőt kelt az állórészben, a forgórész mágnesei ezt követik: így lesz az akkumulátor áramából nyomaték, fékezéskor pedig fordítva.',
    scale: 'kb. 25–30 cm átmérő, 30–40 cm hossz, 30–60 kg; 100–300 kW, akár 15–20 ezer 1/perc',
    viewBox: '0 0 960 600',
    backdrop: backdrop,
    intro: 'A villanyautó motorja a legtöbb mai autóban **állandó mágneses szinkronmotor** (PMSM). Két fő része van: a kívül álló **állórész**, amelynek hornyaiban rézvezetők futnak, és a belül forgó **forgórész**, amelybe erős **neodímium mágneseket** építettek.\n\nAz **inverter** háromfázisú áramot küld a tekercsekbe, és ez egy körbeforgó **mágneses mezőt** kelt. A forgórész mágnesei ezt a mezőt „üldözik”, ezért forognak, pontosan a mező fordulatszámával: ezért **szinkron** a motor. Fékezéskor a szerepek megfordulnak: a forgó mágnesek áramot indukálnak, a motor **generátorként** visszatölti az akkumulátort. A hatásfoka 95% körüli: a benzinmotorénak kb. két-háromszorosa.',
    parts: [
      {
        id: 'haz', z: 0, name: 'Állórész-ház hűtőköpennyel', svg: housing, explode: [215, -40], badge: B(150, -HR2, 40), en: 'motor housing with integrated cooling jacket',
        terms: ['mechanika/feszultseg', 'mechanika/rezonancia'],
        what: 'A motor külső „teste”. Tartja az állórészt, rajta vannak a rögzítőkarimák, amelyekkel a hajtóműhöz csavarozzák, és a falában **hűtőcsatornák** futnak: ez a **hűtőköpeny**. A ház veszi fel a motor nyomatékának ellenerejét is: ha a forgórész egyik irányba csavarodik, a ház a másikba „akarna”.',
        madeOf: 'Többnyire **nyomásos öntésű alumínium**ötvözet (könnyű és jól vezeti a hőt), a csatornákkal együtt öntve vagy egy belső hüvellyel kialakítva. A két végén csapágypajzs zárja le (a rajzon nincs jelölve), tömítésekkel, hogy por és víz ne jusson be.',
        how: 'Az alumíniumot nagy nyomással acélszerszámba öntik, majd CNC-gépen pontos méretre esztergálják a belső furatot és a csapágyüléseket. Az állórész-köteget gyakran **zsugorkötéssel** teszik bele: a házat felmelegítik (kitágul), beleengedik a köteget, és lehűlve szorosan rászorul.',
        uni: 'A zsugorkötés felületi nyomása a túlfedésből számolható (Lamé-egyenletek vastag falú csőre); elég nagynak kell lennie, hogy a csúcsnyomatékot súrlódással átvigye (`M = μ · p · π · d² · L / 2`), de a lemezkötegben ébredő nyomófeszültség rontja a vasveszteséget (a mágneses tulajdonságok feszültségérzékenyek). A háznak a **rezgés** és a **zaj** szempontjából is fontos szerepe van: az elektromágneses erőhullámok (pl. a hornyok számából adódó rendek) a ház sajátfrekvenciáit gerjeszthetik, ezt végeselemes modális analízissel ellenőrzik.',
        fact: 'A villanymotor zümmögését nagyrészt nem a csapágyak, hanem a mágneses erők rezegtette ház és lemezköteg adja.'
      },
      {
        id: 'hutes', z: 1, name: 'Hűtés (víz–glikol / olaj)', svg: cool, explode: [215, -40], badge: B(118, -26, 146), en: 'cooling system: water-glycol jacket and oil spray cooling',
        terms: ['e-mobilitas/hatasfok', 'fizika-bsc/elso-fotetel'],
        what: 'A motor 95% körüli hatásfokkal dolgozik, de 150 kW-nál az 5% veszteség is **7–8 kW hő**: egy villanykályha többszöröse. Ezt el kell vezetni, különben a tekercsek szigetelése és a mágnesek károsodnának. A rajzon a ház falában futó **kék csatornákban** víz–glikol keverék áramlik; sok motorban emellett **olajat** is permeteznek közvetlenül a tekercsfejekre és a forgórészre.',
        madeOf: 'Hűtőfolyadék (víz + etilén-glikol fagyálló), csonkok és tömlők, amelyek az autó hűtőkörébe kötnek. Olajhűtésnél a hajtómű **olaja**, szivattyú és fúvókák vagy a tengely belső furata, amelyen át a forgó tengely szétszórja az olajat.',
        how: 'A hűtőkör közös az inverterrel és gyakran az akkumulátorral: egy elektromos szivattyú keringeti, a hőt az autó elején lévő hűtő vagy a fűtéshez egy hőszivattyú hasznosítja. Az olajhűtést a hajtóművel közös olajteknőből oldják meg.',
        uni: 'A veszteség zöme **rézveszteség** (`P_Cu = 3 · I² · R`, a hőmérséklettel nő az ellenállás: `R(T) = R₂₀ · (1 + 0,0039 · ΔT)`), valamint **vasveszteség** (hiszterézis ∝ f, örvényáram ∝ f², ezért nő nagy fordulaton). A tekercsfejek hővezetéssel nehezen hűthetők, mert a hő útja a szigetelésen és a lemezkötegen át vezet; a közvetlen olajpermet ezt rövidre zárja. A szigetelés hőállósági osztálya tipikusan H (180 °C), a mágneseknél a lemágneseződés kockázata miatt kb. 150 °C fölé nem szabad menni.',
        fact: 'Télen a motor és az inverter „hulladékhőjét” a hőszivattyú az utastér fűtésére is felhasználhatja.'
      },
      {
        id: 'allores-koteg', z: 2, name: 'Állórész-lemezköteg', svg: stator, explode: [0, 0], badge: B(120, SR2, -20), lesson: 'fizika/elektromossag', en: 'stator core (laminated electrical steel stack)',
        terms: ['villamosmernoki/forgo-mezo', 'fizika-bsc/faraday-indukcio'],
        what: 'Az álló, gyűrű alakú vasmag. Belső peremén **hornyok** vannak, ezekben fut a tekercselés. A vas a mágneses mező „autópályája”: összegyűjti és a légrésen át a forgórészre vezeti a tekercsek mágneses terét. A rajzon jól látszik, hogy **sok vékony lemezből** áll.',
        madeOf: 'Több száz, 0,2–0,35 mm vastag **elektrotechnikai acéllemez** (kb. 3% szilíciumot tartalmazó vas), mindegyik vékony **szigetelő lakkréteggel**. A lemezeket hegesztési varratok, ragasztás vagy összepréselt „kapcsok” tartják össze.',
        how: 'A lemezeket nagy sebességű **présgépekkel** stancolják ki tekercselt acélszalagból (percenként több száz darabot), majd kötegbe rakják. Kis szériánál lézerrel vágják. A köteget a pontos méretre préselik, és a külső oldalán hegesztéssel vagy ragasztással rögzítik.',
        uni: 'A lemezelés az **örvényáramok** ellen véd: a változó mágneses fluxus a vasban is feszültséget indukál (Faraday-törvény), és a tömör vasban nagy köráramok folynának. Az örvényáram-veszteség egy lemezben `P_ö ∝ (π · d · f · B_max)² / ρ` szerint függ a lemezvastagságtól (d): fele vastagság, negyed veszteség. A szilícium növeli a fajlagos ellenállást (ρ) és csökkenti a hiszterézist. A villanyautó-motorok 400–1000 Hz-es alapfrekvenciája miatt itt vékonyabb lemezek kellenek, mint az 50 Hz-es ipari motorokban.',
        fact: 'Egy hajtómotor állórésze több száz lemezből áll, amelyek mindegyike vékonyabb, mint egy bankkártya fele.'
      },
      {
        id: 'tekercseles', z: 3, name: 'Tekercselés (hajtűtekercs)', svg: wind, explode: [-50, -30], badge: B(S1 + 10, 86, 20), en: 'hairpin stator winding (rectangular copper conductors)',
        terms: ['villamosmernoki/haromfazisu-rendszer', 'villamosmernoki/csillag-kapcsolas', 'fizika-bsc/lorentz-ero'],
        what: 'A hornyokban futó **rézvezetők**: ezekbe küldi az inverter a három fázis áramát, és ezek hozzák létre a forgó mágneses mezőt. A modern motorokban nem kerek huzalt tekercselnek, hanem **lapos, U alakú rézrudakat („hajtűket”)** dugnak a hornyokba, és a végüket összehegesztik. A köteg két végén kilógó részek a **tekercsfejek**.',
        madeOf: 'Lakkszigetelésű, téglalap keresztmetszetű **elektrolitréz** vezetők, a hornyokban szigetelőpapír (pl. aramid), az egész **gyantával impregnálva**. Három fázis (U, V, W), általában **csillagkapcsolásban**.',
        how: 'A rézrudat géppel hajtű alakúra hajlítják, a hajtűket gyűrűbe rendezik, és **egy irányból, tengelyirányban** egyszerre betolják a hornyokba (ezt mutatja a szétszedett nézet). A másik oldalon kilógó végeket megcsavarják, és **lézerrel összehegesztik** párosával. Végül a tekercselést gyantával itatják át, ami szigetel, rögzít és jobban vezeti a hőt.',
        uni: 'A hajtűtekercs fő előnye a nagy **horonykitöltési tényező**: kb. 65–75% a kerek huzalos 40–50% helyett, így ugyanakkora horonyban kisebb a rézellenállás és a rézveszteség. Hátránya a nagy frekvencián fellépő **áramkiszorítás** (skin- és proximity-hatás): a lapos vezető keresztmetszetének egy részében alig folyik áram, ezért a vezetőket több rétegre osztják. A vezetőkre ható erő `F = I · L × B` (Lorentz-erő); a három, egymáshoz képest 120°-kal eltolt fázistekercs árama térben is forgó mezőt hoz létre (lásd forgó mező).',
        fact: 'Hajtűtekercseléssel egy állórészt percek alatt lehet gépesítve tekercselni: ez tette olcsóvá a villanyautó-motorok tömeggyártását.'
      },
      {
        id: 'forgoresz', z: 5, name: 'Forgórész-lemezköteg', svg: rotor, explode: [-215, 60], badge: B(120, 0, 40), en: 'rotor core (laminated, with V-shaped magnet pockets)',
        terms: ['e-mobilitas/pmsm', 'fizika-bsc/tehetetlensegi-nyomatek', 'mechanika/tehetetlensegi-nyomatek'],
        what: 'A tengelyre szerelt, forgó vasmag. Lemezeiben **V alakú zsebek** vannak, ezekbe kerülnek a mágnesek: ezért hívják **belső mágneses** (IPM) motornak. A zsebek alakja nem véletlen: a mágnesek terét és a vas útját úgy alakítja, hogy a motor a mágnesek vonzásán felül egy plusz, ún. **reluktancianyomatékot** is kapjon.',
        madeOf: 'Vékony elektrotechnikai acéllemezek, mint az állórészben, de nagy szilárdságú változatból, mert nagy fordulaton óriási **centrifugális erő** hat rájuk. A tengelyre zsugorkötéssel vagy bordás illesztéssel rögzítik.',
        how: 'A lemezeket kistancolják (a zsebekkel együtt), kötegbe rakják, beteszik a mágneseket, és a zsebeket **gyantával** kitöltik, hogy a mágnes ne mozogjon. A kész forgórészt felmelegítve a tengelyre húzzák. A köteget gyakran néhány szakaszra osztják, és kicsit elforgatják egymáshoz képest („ferdítés”), hogy a nyomaték egyenletesebb, a motor csendesebb legyen.',
        uni: 'A belső mágneses forgórésznél a d és a q irányú induktivitás különbözik (`L_q > L_d`), ezért a nyomatéknak két tagja van: `T = (3/2) · p · [ψ_PM · i_q + (L_d − L_q) · i_d · i_q]`, ahol p a póluspárszám. Negatív `i_d` árammal a második tag hozzáad a nyomatékhoz (**reluktancianyomaték**), és ugyanez teszi lehetővé a **mezőgyengítést** nagy fordulaton. A centrifugális feszültség `σ ≈ ρ · ω² · r²` nagyságrendű: 15 000 1/perc és 6 cm sugár esetén a vékony hidakban több száz MPa is lehet, ezért a zsebek közötti „hidak” szélessége kompromisszum a szilárdság és a mágneses szórás között.',
        fact: 'A forgórész kerülete 15 000 1/perc-nél kb. 100 m/s-mal, azaz 360 km/h-val száguld.'
      },
      {
        id: 'magnesek', z: 4, name: 'Állandó mágnesek (NdFeB)', svg: magnets, explode: [-240, -185], badge: B(R1, 44 * Math.cos(2.75), 44 * Math.sin(2.75)), link: 'atom', en: 'permanent magnets (sintered NdFeB, V-shaped interior arrangement)',
        terms: ['e-mobilitas/pmsm', 'fizika-bsc/lorentz-ero'],
        what: 'A forgórész zsebeibe dugott, téglatest alakú **neodímium–vas–bór** mágnesek. Polaritásuk körben váltakozik: északi, déli, északi… (a rajzon piros és kék). Ezek adják a forgórész saját, állandó mágneses terét, amelyet az állórész forgó mezője „magával húz”. A rajz motorjában 8 pólus van; a kivágott negyedből kettő hiányzik.',
        madeOf: 'Nd₂Fe₁₄B kristályokból **szinterezett** mágnes, a hőállóság növelésére kevés **diszpróziummal** vagy terbiummal ötvözve, korrózió ellen **nikkel- vagy epoxibevonattal**. A neodímium és a diszprózium **ritkaföldfém**: a bányászatuk és feldolgozásuk nagyrészt Kínában történik.',
        how: 'A fémötvözetet megolvasztják, mikrométeres porrá őrlik, a port **erős mágneses térben préselik** (így a kristályok egy irányba állnak), majd kemencében szinterezik, végül méretre köszörülik és bevonják. **Felmágnesezni** a legvégén szokták: egy erős impulzus-tekercs néhány ezredmásodperces, több tesla erősségű mezővel.',
        uni: 'Az NdFeB a ma ismert legerősebb állandó mágnes: remanenciája `B_r ≈ 1,2–1,4 T`, energiaszorzata `(BH)_max` akár 400 kJ/m³ fölött. Erőssége a Nd 4f elektronjainak nagy **mágneses anizotrópiájából** ered, a vas adja a nagy mágnesezettséget. Gyenge pontja a hőmérséklet: a **koercitív erő** melegen erősen csökken, és ha a motor túlmelegszik, egy erős ellentér (pl. zárlat) **visszafordíthatatlanul lemágnesezheti**. Curie-hőmérséklete kb. 310 °C. Kutatások folynak ritkaföldfém-mentes motorokra (pl. külső gerjesztésű szinkronmotor, kapcsolt reluktanciamotor).',
        fact: 'Egy villanyautó hajtómotorjában kb. 1–2 kg neodímium mágnes van; két ilyen mágnes közé szorult ujj komolyan megsérülhet.'
      },
      {
        id: 'tengely', z: 6, name: 'Tengely', svg: shaft, explode: [-150, 130], badge: B(318, 0, -6), en: 'rotor shaft (with output spline)',
        terms: ['mechanika/csavaras', 'e-mobilitas/nyomatek'],
        what: 'A forgórész nyomatékát vezeti ki a motorból. Jobb oldali, **bordázott** (fogazott) vége a hajtómű fogaskerekébe illeszkedik, onnan jut a nyomaték a kerekekhez. A bal végén ül a **rezolver**, amely a tengely helyzetét méri.',
        madeOf: 'Nemesíthető, nagy szilárdságú **acél** (pl. króm-molibdén acél), a csapágyhelyeken és a bordázaton **edzett** felülettel. Gyakran **üreges**, hogy könnyebb legyen, és hogy olaj áramolhasson benne a forgórész hűtésére.',
        how: 'Rúdból esztergálják, a bordázatot hengermarással vagy hidegalakítással készítik, majd indukciós edzéssel keményítik, és a csapágyhelyeket mikrométeres pontosságra köszörülik.',
        uni: 'A tengelyt csavarásra méretezik: tömör tengelynél `τ_max = 16 · T / (π · d³)`, üregesnél a poláris keresztmetszeti tényező `K_p = π · (D⁴ − d⁴) / (16 · D)`. 400 N·m-nél és 32 mm átmérőnél `τ ≈ 62 MPa`. Fontos a **kritikus fordulatszám** is: a forgórész–tengely rendszer első hajlító sajátfrekvenciájának jóval az üzemi maximum fölött kell lennie (`ω_kr = √(k / m)`), különben rezonancia lép fel.',
        fact: 'A villanymotor álló helyzetből is szinte a teljes nyomatékát adja: ezért gyorsulnak a villanyautók ilyen hirtelen.'
      },
      {
        id: 'csapagyak', z: 7, name: 'Csapágyak', svg: bearings, explode: [-132, 140], badge: B(262, -14, 34), en: 'deep-groove ball bearings (front and rear)',
        terms: ['mechanika/rezonancia'],
        what: 'A két **golyóscsapágy** tartja és vezeti a forgó tengelyt a házban, minimális súrlódással. Egy villanyautó motorjában akár percenként 15–20 ezer fordulatot is ki kell bírniuk, csendben és több százezer kilométeren át.',
        madeOf: 'Edzett **csapágyacél** gyűrűk és golyók (néha **kerámia** golyók), műanyag kosár, élettartamra szóló **zsírkenés** és tömítés. Sokszor **szigetelt** külső gyűrűvel vagy kerámia golyókkal készülnek.',
        how: 'A gyűrűk pályáját köszörülik és polírozzák, a golyókat több lépésben, mikrométeres pontosságra csiszolják. Összeszerelés után zsírt töltenek beléjük, és lezárják őket. Szerelésnél a csapágyat melegítve húzzák a tengelyre.',
        uni: 'Inverteres hajtásnál a csapágyakat egy különleges veszély fenyegeti: a PWM kapcsolgatás miatti **közös módusú feszültség** kapacitív úton feltölti a tengelyt, és a kenőzsír filmjén átütő apró szikrák (EDM, elektromos kisülés) kráterezik a futópályát („mosódeszka” kopás). Ellenszer: szigetelt vagy hibrid (kerámia golyós) csapágy, földelőkefe a tengelyen. A golyóscsapágy névleges élettartama `L₁₀ = (C / P)³` millió fordulat (C: dinamikus alapterhelés, P: egyenértékű terhelés).',
        fact: 'A villanyautók motorjaiban gyakran kerámiagolyós csapágy van: a kerámia nem vezeti az áramot, így nem keletkeznek benne szikrák.'
      },
      {
        id: 'rezolver', z: 8, name: 'Rezolver (pozícióérzékelő)', svg: resolver, explode: [-275, -10], badge: B(-42, -46, 14), en: 'resolver (rotor position sensor)',
        terms: ['e-mobilitas/foc', 'villamosmernoki/transzformator'],
        what: 'Az inverternek minden pillanatban tudnia kell, **pontosan hol állnak a forgórész mágnesei**, különben rossz pillanatban kapcsolná az áramot. Ezt méri a rezolver: egy forgó transzformátor, amely a tengely szögétől függő **szinusz és koszinusz** jelet ad.',
        madeOf: 'Egy álló, tekercses **gyűrű** (lemezelt vasmag rézhuzalos tekercsekkel) és a tengelyre szerelt, **hullámos peremű lemezköteg**, amelyben nincs se tekercs, se elektronika. Ezért nagyon strapabíró: bírja a hőt, a rezgést és az olajat.',
        how: 'A lemezeket kistancolják, a gyűrűre automata gép tekercseli a huzalt. A gyártósor végén a rezolvert a motorral együtt **kalibrálják**: megmérik, milyen szögnél áll a forgórész mágnese a rezolver nullpontjához képest, és ezt az értéket beírják az inverter memóriájába.',
        uni: 'A gerjesztőtekercs néhány kHz-es szinuszos jelet kap, a két kimenőtekercs feszültsége `u_sin = U · sin(ωt) · sin θ`, `u_cos = U · sin(ωt) · cos θ`. A szöget `θ = atan2(u_sin, u_cos)` adja; ezt egy digitális **követő szabályzó** (R/D konverter) folyamatosan számolja, a fordulatszámot pedig a szög deriváltjából kapja. A mezőorientált szabályozás (FOC) Park-transzformációjához ez az elektromos szög kell: `θ_el = p · θ_mech`.',
        fact: 'Egyes motorok rezolver helyett érzékelő nélküli becslést vagy olcsóbb induktív érzékelőt használnak, de a villanyautók többségében ma is rezolver van.'
      },
      {
        id: 'kivezetesek', z: 9, name: 'Kivezetések (U, V, W fázis)', svg: leads, explode: [-20, -62], badge: B(28, -22, 92), en: 'phase leads / busbars (U, V, W)',
        terms: ['villamosmernoki/haromfazisu-rendszer', 'villamosmernoki/csillag-kapcsolas'],
        what: 'Három vastag **rézsín**, amelyek a tekercselés három fázisát (U, V, W) kivezetik a csatlakozódobozba. Mindegyiken akár **több száz amper** folyik. A tekercsek másik végét a motoron belül egy közös pontba kötik össze: ez a **csillagpont**.',
        madeOf: 'Ónozott vagy nikkelezett **rézsínek**, szigetelő műanyag (pl. PPS) tartóba fröccsöntve, a végükön csavaros vagy hegesztett csatlakozással.',
        how: 'A síneket kistancolják és hajlítják, majd műanyagba öntik őket. A tekercsfejeknél a hajtűk végeihez lézerrel vagy ellenállás-hegesztéssel kötik. Végül nagyfeszültségű **szigetelésvizsgálat** következik: a fázisok és a ház közé több ezer voltot kapcsolnak, és ellenőrzik, hogy nincs átütés.',
        uni: 'Szimmetrikus háromfázisú táplálásnál a fázisáramok összege nulla (`i_U + i_V + i_W = 0`), ezért csillagkapcsolásnál nem kell nullavezető, és két áram mérése elég a harmadik kiszámításához. A sínek keresztmetszetét a folyamatos áram és a rövid idejű csúcsáram melegítése (`∫ i² dt`) határozza meg. A gyors PWM-élek (néhány kV/µs) miatt a sínek és a kábelek induktivitása és kapacitása is számít: túlfeszültség-csúcsokat és elektromágneses zavarokat okozhatnak.',
        fact: 'A 800 V-os villanyautókban ugyanakkora teljesítményhez fele akkora áram elég, így vékonyabb sínek és kábelek is elegendők.'
      },
      {
        id: 'csatlakozo', z: 10, name: 'Csatlakozó az inverterhez', svg: conn, explode: [215, -30], badge: B(18, -24, 150), link: 'elektromos-auto', lesson: 'elektromos-auto/motor-inverter', en: 'high-voltage connector / terminal box to the inverter',
        terms: ['e-mobilitas/inverter', 'e-mobilitas/pwm', 'e-mobilitas/foc'],
        what: 'Itt csatlakozik a motorhoz az **inverter**, amely az akkumulátor egyenáramából háromfázisú, változtatható frekvenciájú és erősségű áramot állít elő. A **narancssárga** szín mindig **nagyfeszültséget** jelöl (400–800 V): ehhez csak képzett szakember nyúlhat. Sok mai autóban az inverter közvetlenül a motorra van építve, kábel nélkül.',
        madeOf: 'Árnyékolt, nagyfeszültségű **kábelek** vagy rézsínek, tömített műanyag–fém **csatlakozóház**, érintésvédelmi **reteszkapcsoló** (HVIL), amely megszakítja a nagyfeszültséget, ha a csatlakozót kihúzzák.',
        how: 'A csatlakozókat vízállóra (IP67) tervezik, és a gyártósoron nyomáspróbával ellenőrzik a tömítést. Az árnyékolást körben a házhoz kötik, hogy a kapcsolgatásból eredő zavar ne jusson ki a rádiók és érzékelők felé.',
        uni: 'Az inverter **PWM**-mel (impulzusszélesség-modulációval) állítja elő a szinuszos fázisáramokat, tipikusan 8–20 kHz-es kapcsolási frekvenciával; a tekercsek induktivitása kisimítja az áramot. A szabályozás **mezőorientált** (FOC): a mért fázisáramokat Clarke- és Park-transzformációval a forgórésszel együtt forgó d–q koordinátarendszerbe számolja át, ahol a nyomatékképző `i_q` és a mezőirányú `i_d` egyenáramként szabályozható PI-szabályzókkal. A legnagyobb fordulatszámot a **feszültségkorlát** szabja meg: a motor indukált feszültsége (`U_i ∝ ω · ψ`) nem haladhatja meg az akkumulátor feszültségét, efölött **mezőgyengítés** kell.',
        fact: 'Az inverter másodpercenként akár több tízezerszer kapcsolja ki-be a több száz amperes áramot.'
      }
    ],
    uni: {
      text: 'A háromfázisú, térben 120°-kal eltolt tekercsekben folyó, időben 120°-kal eltolt áramok egy állandó nagyságú, `ω_s = 2π · f / p` szögsebességgel **forgó mágneses mezőt** hoznak létre (Ferraris–Tesla-elv). A szinkronmotor forgórésze pontosan ezzel a sebességgel forog: `n = 60 · f / p`; 8 pólusú (p = 4) motornál 15 000 1/perc-hez 1000 Hz kell.\n\nA szabályozás a forgórészhez rögzített **d–q koordinátarendszerben** történik. A feszültségegyenletek: `u_d = R · i_d + L_d · di_d/dt − ω · L_q · i_q`, `u_q = R · i_q + L_q · di_q/dt + ω · (L_d · i_d + ψ_PM)`. A nyomaték: `T = (3/2) · p · [ψ_PM · i_q + (L_d − L_q) · i_d · i_q]`. Kis fordulaton a **MTPA** (maximum torque per ampere) stratégia adja adott áramhoz a legnagyobb nyomatékot; nagy fordulaton, amikor az indukált feszültség eléri az inverter határát, negatív `i_d` árammal **mezőgyengítést** alkalmaznak: így alakul ki az állandó nyomatékú, majd az állandó teljesítményű tartomány.\n\n**Rekuperációkor** `i_q` előjelet vált: a nyomaték fékező, a teljesítmény az akkumulátor felé áramlik. A motor hatásfok-térképén a legjobb pont (96–97%) jellemzően közepes fordulaton és nyomatékon van.',
      terms: ['e-mobilitas/pmsm', 'e-mobilitas/foc', 'e-mobilitas/mezogyengites', 'e-mobilitas/rekuperacio', 'e-mobilitas/inverter', 'villamosmernoki/forgo-mezo', 'villamosmernoki/szinkron-gep', 'fizika-bsc/lorentz-ero', 'fizika-bsc/faraday-indukcio']
    },
    steps: [
      { icon: '🌀', title: '1. Forgó mágneses mező a három fázisból', text: 'Az állórész tekercselése három csoportból (**U, V, W fázis**) áll, körben egymástól eltolva. Az inverter mindhárom fázisba szinuszos áramot küld, de egymáshoz képest **egyharmad periódussal** késleltetve. A három tekercs mágneses tere összeadódik, és az eredő mező **körbeforog** az állórészben, anélkül hogy bármi mozogna. Minél nagyobb a frekvencia, annál gyorsabban forog.', parts: ['tekercseles', 'allores-koteg', 'kivezetesek'] },
      { icon: '🧲', title: '2. A mágnesek „üldözik” a mezőt: nyomaték', text: 'A forgórész **állandó mágnesei** a forgó mezővel kölcsönhatnak: az ellentétes pólusok vonzzák, az azonosak taszítják egymást. Ha a mező kicsit „előrébb jár” a mágneseknél, maga után húzza őket: ez a **nyomaték**. A forgórész pontosan a mező sebességével forog: ezért **szinkron** motor. A V alakú mágneselrendezés miatt a vasmag maga is be akar állni a mező irányába, ez **plusz nyomatékot** ad.', parts: ['magnesek', 'forgoresz', 'allores-koteg'] },
      { icon: '📍', title: '3. Hol áll a forgórész? A rezolver mér', text: 'A legtöbb nyomaték akkor keletkezik, ha az állórész mezője kb. **90°-kal a mágnesek előtt** jár. Ehhez az inverternek másodpercenként több ezerszer tudnia kell a forgórész pontos helyzetét: ezt a tengely végén ülő **rezolver** méri, és szinusz–koszinusz jelként küldi az inverternek.', parts: ['rezolver', 'tengely'] },
      { icon: '🎛️', title: '4. Inverter-vezérlés (FOC, röviden)', text: 'Az **inverter** az akkumulátor egyenáramát tranzisztorok gyors kapcsolgatásával (**PWM**) szinuszos háromfázisú árammá alakítja. A **mezőorientált szabályozás** (FOC) a mért áramokat „átszámolja” a forgórésszel együtt forgó nézőpontba: így két egyszerű mennyiséget kell csak szabályoznia, egy **nyomatékképző** és egy **mezőirányú** áramot. A gázpedál valójában nyomatékot kér, az inverter ezt áramra fordítja le.', parts: ['csatlakozo', 'kivezetesek', 'tekercseles'] },
      { icon: '🏎️', title: '5. Nagy fordulat: mezőgyengítés', text: 'Ahogy a motor gyorsul, a forgó mágnesek egyre nagyobb **feszültséget indukálnak** a tekercsekben, amely egyszer eléri az akkumulátor feszültségét. Ekkor az inverter egy olyan áramösszetevőt is küld, amely **gyengíti a mágnesek terét**: így a motor tovább gyorsulhat, cserébe a nyomaték csökken. Ezért gyorsul egy villanyautó a legerősebben kis sebességnél.', parts: ['magnesek', 'tekercseles', 'csatlakozo'] },
      { icon: '🔋', title: '6. Rekuperáció: a motor generátorként fékez', text: 'Ha a vezető leveszi a lábát a pedálról vagy fékez, az inverter megfordítja a nyomatékképző áram irányát. A kerekek által forgatott mágnesek **áramot indukálnak** a tekercsekben (elektromágneses indukció), az inverter ezt **egyenárammá** alakítja és visszatölti az akkumulátorba. Városi forgalomban így a fékezési energia jelentős része visszanyerhető, és a fékbetétek is alig kopnak.', parts: ['magnesek', 'tekercseles', 'csatlakozo'] },
      { icon: '❄️', title: '7. Hűtés: a hőt el kell vinni', text: 'A tekercsek ellenállása és a vas mágneses veszteségei miatt a motor melegszik. A ház **hűtőköpenyében** víz–glikol áramlik, sok motorban **olajat** is permeteznek a tekercsfejekre. A szenzorok mérik a tekercs hőmérsékletét; ha túl meleg, a vezérlés korlátozza a teljesítményt, hogy a szigetelés és a mágnesek ne károsodjanak.', parts: ['hutes', 'haz', 'tekercseles'] },
      { icon: '🏭', title: '8. Gyártás I.: lemezelés és tekercselés', text: 'Az acélszalagból **présgép** stancolja ki percenként több száz állórész- és forgórészlemezt, ezeket kötegbe rakják és rögzítik. A rézrudakat géppel **hajtű alakúra** hajlítják, a hornyokba tolják, a kilógó végeket megcsavarják és **lézerrel összehegesztik**. Végül az egész állórészt **gyantával impregnálják**, és zsugorkötéssel a házba illesztik.', parts: ['allores-koteg', 'tekercseles', 'haz', 'forgoresz'] },
      { icon: '⚖️', title: '9. Gyártás II.: mágnesezés, kiegyensúlyozás, próba', text: 'A mágneseket a forgórész zsebeibe tolják és beragasztják; sokszor csak ezután **mágnesezik fel** egy erős impulzussal. A forgórészt a tengellyel együtt **kiegyensúlyozzák**: furatokkal vagy apró súlyokkal addig korrigálják, amíg nagy fordulaton sem rezeg. Végül a kész motor **próbapadra** kerül: mérik a nyomatékot, a hatásfokot, a zajt, a szigetelést, és bekalibrálják a rezolvert.', parts: ['magnesek', 'forgoresz', 'tengely', 'csapagyak', 'rezolver'] }
    ],
    history: [
      { year: '1821', text: '**Michael Faraday** megmutatja az „elektromágneses forgást”: egy áramjárta drót folyamatosan körbejár egy mágnes körül. Ez az első kísérlet, amelyben az elektromosság folyamatos mozgást hoz létre.' },
      { year: '1827–28 körül', text: '**Jedlik Ányos** bencés szerzetes, fizikatanár megépíti „**villanydelejes forgonyát**”: az egyik első olyan villanymotort, amelyben álló és forgó elektromágnes és kommutátor van. Később egy kis kocsimodellt is hajtott vele.' },
      { year: '1834–1837', text: '**Thomas Davenport** amerikai kovács elektromágneses motort épít, és 1837-ben megkapja rá az USA első villanymotor-szabadalmát. **Moritz Jacobi** 1838-ban Szentpéterváron egy csónakot hajt villanymotorral. Az elemek drágasága miatt azonban még nem terjed el.' },
      { year: '1888', text: '**Nikola Tesla** szabadalmaztatja a **forgó mágneses mezőn** alapuló váltakozó áramú motort (tőle függetlenül **Galileo Ferraris** is felfedezi az elvet). Ez teszi lehetővé a kefék és a kommutátor nélküli motorokat.' },
      { year: '1889–1902', text: '**Mihail Dolivo-Dobrovolszkij** megalkotja a háromfázisú, kalickás forgórészű **aszinkron motort**, amely egyszerűsége miatt a gyárak „igáslovává” válik. **Kandó Kálmán** tervei alapján 1902-ben Észak-Olaszországban (Valtellina) háromfázisú villamos vasút indul.' },
      { year: '1984', text: 'A japán Sumitomo (**Szagava Maszato**) és az amerikai General Motors egymástól függetlenül bejelenti a **neodímium–vas–bór** mágnest, a legerősebb állandó mágnest. Ez teszi lehetővé a kicsi, könnyű és nagyon hatékony állandó mágneses motorokat.' },
      { year: '1997', text: 'A **Toyota Prius**, az első tömeggyártott hibridautó, állandó mágneses szinkronmotorral és inverterrel hajt. A villanyautó-motorok fejlődése ettől kezdve felgyorsul.' },
      { year: 'ma', text: 'A villanyautók többségében **belső mágneses szinkronmotor** hajt, **hajtűtekercseléssel**, olaj- és vízhűtéssel, 800 V-os rendszerekben. A ritkaföldfémektől való függés csökkentésére terjednek a ritkaföldfém-mentes és a diszprózium-szegény mágneses motorok is.' }
    ],
    quiz: [
      { q: 'Mitől forog a forgó mágneses mező az állórészben?', options: ['A három fázis áramai időben eltolva változnak', 'Az állórész forog a forgórész körül', 'A kefék kapcsolgatják', 'A mágnesek taszítják egymást'], answer: 0, explain: 'A három, körben eltolt tekercs egymáshoz képest egyharmad periódussal késleltetett árama együtt egy körbeforgó mezőt hoz létre, mozgó alkatrész nélkül.' },
      { q: 'Miért „szinkron” ez a motor?', options: ['Mert a forgórész pontosan a forgó mező sebességével forog', 'Mert két motor együtt forog', 'Mert a kerekekkel azonos sebességű', 'Mert csak egy sebessége van'], answer: 0, explain: 'Az állandó mágneses forgórész „ráül” a forgó mezőre; az aszinkron motornál ezzel szemben a forgórész kicsit lemarad (szlip).' },
      { q: 'Miért vékony, szigetelt lemezekből áll az állórész és a forgórész vasmagja?', options: ['Hogy kicsik legyenek az örvényáram-veszteségek', 'Hogy könnyebb legyen összecsavarni', 'Hogy jobban hűljön a víz', 'Hogy a mágnes ne férjen hozzá'], answer: 0, explain: 'A változó mágneses tér a vasban is áramot indukálna; a szigetelt lemezek megszakítják ezeknek a köráramoknak az útját.' },
      { q: 'Mi a rezolver feladata?', options: ['A forgórész pontos szöghelyzetének mérése', 'A motor hűtése', 'A feszültség megemelése', 'A tengely kenése'], answer: 0, explain: 'Az inverter csak akkor tudja a megfelelő pillanatban kapcsolni az áramot, ha ismeri a mágnesek helyzetét.' },
      { q: 'Mi történik rekuperáció közben?', options: ['A motor generátorként áramot termel, és tölti az akkumulátort', 'A motor gyorsabban forog', 'A mágnesek lemágneseződnek', 'Az akkumulátor lehűl'], answer: 0, explain: 'A kerekek forgatják a forgórészt, a mágnesek feszültséget indukálnak a tekercsekben, az inverter ezt egyenárammá alakítja.' }
    ]
  });
})();
