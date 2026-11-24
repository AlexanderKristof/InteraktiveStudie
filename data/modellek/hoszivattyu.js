/* Modell: levegő–víz hőszivattyú (monoblokk kültéri egység) – izometrikus, „átlátszó” házzal,
 * hogy a hűtőközeg-kör látható legyen. Színkód: piros = forró gáz, narancs = meleg folyadék,
 * kék = hideg folyadék–gőz keverék, világoskék = hideg gáz (fűtési üzemben). */
(function () {
  var K = 1, I = STUDIE.draw.iso(296, 372, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  function P(p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255); }
  function line(a, b, stroke, w, extra) {
    var p = I.pt(a[0], a[1], a[2]), q = I.pt(b[0], b[1], b[2]);
    return '<line x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) + '" x2="' + q[0].toFixed(1) + '" y2="' + q[1].toFixed(1) + '" stroke="' + stroke + '" stroke-width="' + w + '"' + (extra || '') + '/>';
  }
  /* Fekvő henger (x vagy y irányú tengellyel): látható palástcsíkok + a közeli véglap. */
  function cylH(axis, cx, cy, cz, r, len, color) {
    var n = 24, s = '', i;
    function q(a, t) {
      return axis === 'x' ? I.pt(cx + t, cy + r * Math.cos(a), cz + r * Math.sin(a))
        : I.pt(cx + r * Math.cos(a), cy + t, cz + r * Math.sin(a));
    }
    for (i = 0; i < n; i++) {
      var a0 = i / n * 2 * Math.PI, a1 = (i + 1) / n * 2 * Math.PI, m = (a0 + a1) / 2, f = Math.cos(m) + Math.sin(m);
      if (f <= -0.2) continue;
      var c = shade(color, 0.6 + 0.32 * (f + 0.2) / 1.62);
      s += '<polygon points="' + [q(a0, 0), q(a1, 0), q(a1, len), q(a0, len)].map(P).join(' ') + '" fill="' + c + '" stroke="' + c + '" stroke-width="0.6"/>';
    }
    var cap = [];
    for (i = 0; i < n; i++) cap.push(q(i / n * 2 * Math.PI, len));
    return s + '<polygon points="' + cap.map(P).join(' ') + '" fill="' + shade(color, 1.08) + '" stroke="rgba(0,0,0,.35)" stroke-width="0.8"/>';
  }
  /* Kör (vagy körgyűrű-pontok) az y = állandó síkban – a ventilátor síkja. */
  function yCircle(cx, cy, cz, r, n) {
    var pts = [];
    for (var i = 0; i < (n || 40); i++) { var a = i / (n || 40) * 2 * Math.PI; pts.push(I.pt(cx + r * Math.cos(a), cy, cz + r * Math.sin(a))); }
    return pts;
  }
  /* Cső térbeli töréspontokon át: sötét kontúr, színes mag, világos csillanás. */
  function pipe(pts, color, w) {
    var d = pts.map(function (p, i) { var s = I.pt(p[0], p[1], p[2]); return (i ? 'L' : 'M') + s[0].toFixed(1) + ' ' + s[1].toFixed(1); }).join(' ');
    return '<path d="' + d + '" fill="none" stroke="transparent" stroke-width="' + (w + 8) + '" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + shade(color, 0.55) + '" stroke-width="' + (w + 2) + '" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + w + '" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="' + (w * 0.3).toFixed(1) + '" stroke-linejoin="round" stroke-linecap="round" transform="translate(-0.6 -0.8)"' + NS + '/>';
  }
  function arrowAt(a, b, color) {   // kis nyílhegy a cső mentén (a → b irány)
    var p = I.pt(a[0], a[1], a[2]), q = I.pt(b[0], b[1], b[2]);
    var ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI, m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    return '<path d="M-5 -4.5 L5 0 L-5 4.5 Z" transform="translate(' + m[0].toFixed(1) + ' ' + m[1].toFixed(1) + ') rotate(' + ang.toFixed(1) + ')" fill="' + color + '" stroke="#fff" stroke-width="1"' + NS + '/>';
  }

  var defs = '<defs>' +
    '<linearGradient id="hp-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfe3f2" stop-opacity=".30"/><stop offset="1" stop-color="#9fb8cc" stop-opacity=".14"/></linearGradient>' +
    '<radialGradient id="hp-hub" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#9aa4b2"/><stop offset="1" stop-color="#3d4652"/></radialGradient>' +
    '<linearGradient id="hp-comp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2c333d"/><stop offset=".55" stop-color="#5c6675"/><stop offset="1" stop-color="#262c35"/></linearGradient>' +
    '</defs>';
  var backdrop = defs +
    '<text class="lbl" x="14" y="26" font-size="17">Levegő–víz hőszivattyú – monoblokk kültéri egység</text>' +
    '<text class="lbl-muted" x="14" y="44">átlátszó házzal, fűtési üzemben · a csövek színe a hűtőközeg hőmérsékletét jelzi</text>' +
    '<g transform="translate(14 540)">' +
    '<rect x="0" y="-9" width="22" height="6" rx="3" fill="#e0402e"/><text class="lbl-muted" x="28" y="-2">forró gáz (60–90 °C)</text>' +
    '<rect x="190" y="-9" width="22" height="6" rx="3" fill="#f08a24"/><text class="lbl-muted" x="218" y="-2">meleg folyadék</text>' +
    '<rect x="0" y="9" width="22" height="6" rx="3" fill="#2f6fd6"/><text class="lbl-muted" x="28" y="16">hideg keverék (−10…0 °C)</text>' +
    '<rect x="190" y="9" width="22" height="6" rx="3" fill="#4fc0e8"/><text class="lbl-muted" x="218" y="16">hideg gáz (szívóoldal)</text></g>';

  /* ---------- 1. Ház: alaplemez, lábak, hátsó rács, válaszfal, üveg burkolat ---------- */
  var X0 = -150, X1 = 150, Y0 = -60, Y1 = 60, H = 200;
  var housing = '';
  [[-140, -50], [120, -50], [-140, 40], [120, 40]].forEach(function (f) { housing += I.box(f[0], f[1], -14, 20, 10, 14, '#4a525e'); });
  housing += I.box(X0, Y0, 0, 300, 120, 8, '#8a96a6');
  // hátsó és bal oldali fal (a hátsó a levegőbeszívó rács)
  housing += I.poly([I.pt(X0, Y0, 8), I.pt(X1, Y0, 8), I.pt(X1, Y0, H), I.pt(X0, Y0, H)], 'rgba(150,165,185,.16)', ' stroke="#8392a6" stroke-width="1"' + NS);
  housing += I.poly([I.pt(X0, Y0, 8), I.pt(X0, Y1, 8), I.pt(X0, Y1, H), I.pt(X0, Y0, H)], 'rgba(150,165,185,.14)', ' stroke="#8392a6" stroke-width="1"' + NS);
  for (var gz = 20; gz < H; gz += 14) housing += line([X0, Y0, gz], [20, Y0, gz], 'rgba(120,135,155,.55)', 0.8, NS);
  // válaszfal a ventilátortér és a gépház között
  housing += I.poly([I.pt(20, Y0, 8), I.pt(20, Y1, 8), I.pt(20, Y1, H), I.pt(20, Y0, H)], 'rgba(120,135,155,.18)', ' stroke="#7d8ca0" stroke-width="1" stroke-dasharray="4 3"' + NS);
  // jobb oldallap (gépház fedele) szellőzőrésekkel – átlátszó
  housing += I.poly([I.pt(X1, Y0, 8), I.pt(X1, Y1, 8), I.pt(X1, Y1, H), I.pt(X1, Y0, H)], 'url(#hp-glass)', ' stroke="#7d8ca0" stroke-width="1.2"' + NS);
  for (var lz = 150; lz < 190; lz += 8) housing += line([X1, -40, lz], [X1, 40, lz], 'rgba(90,105,125,.5)', 1.6, NS);
  // előlap és tető – átlátszó üveg, a ventilátornál kör alakú kifúvónyílás
  housing += I.poly([I.pt(X0, Y1, 8), I.pt(X1, Y1, 8), I.pt(X1, Y1, H), I.pt(X0, Y1, H)], 'url(#hp-glass)', ' stroke="#7d8ca0" stroke-width="1.2"' + NS);
  housing += I.poly([I.pt(X0, Y0, H), I.pt(X1, Y0, H), I.pt(X1, Y1, H), I.pt(X0, Y1, H)], 'url(#hp-glass)', ' stroke="#7d8ca0" stroke-width="1.2"' + NS);
  housing += I.poly(yCircle(-65, Y1, 104, 80, 48), 'none', ' stroke="#7d8ca0" stroke-width="2"' + NS);
  // élek (tömör keret, erre lehet kattintani)
  [[[X0, Y1, 8], [X0, Y1, H]], [[X1, Y1, 8], [X1, Y1, H]], [[X1, Y0, 8], [X1, Y0, H]], [[X0, Y0, H], [X1, Y0, H]], [[X1, Y0, H], [X1, Y1, H]],
    [[X0, Y1, H], [X1, Y1, H]], [[X0, Y0, H], [X0, Y1, H]], [[X0, Y0, 8], [X0, Y0, H]]].forEach(function (e) {
    housing += line(e[0], e[1], 'transparent', 9) + line(e[0], e[1], '#6b7a8f', 2.6, ' stroke-linecap="round"');
  });
  var tag = I.pt(118, Y1, 30);
  housing += '<text class="lbl-muted" x="' + tag[0].toFixed(1) + '" y="' + tag[1].toFixed(1) + '" font-size="10" text-anchor="middle" transform="rotate(30 ' + tag[0].toFixed(1) + ' ' + tag[1].toFixed(1) + ')"' + NS + '>R290 · 8 kW</text>';

  /* ---------- 2. Ventilátor a homloklapon, védőráccsal ---------- */
  var FC = [-65, Y1 - 4, 104], FR = 72;
  var fan = I.poly(yCircle(FC[0], FC[1] - 10, FC[2], FR + 4, 48), '#59636f', ' stroke="#353c46" stroke-width="1"') +
    I.poly(yCircle(FC[0], FC[1], FC[2], FR + 4, 48), 'rgba(40,48,58,.55)', ' stroke="#353c46" stroke-width="1.2"');
  for (var bl = 0; bl < 3; bl++) {
    var a0 = bl * 2 * Math.PI / 3 + 0.3, pts = [];
    for (var t = 0; t <= 1.0001; t += 0.125) pts.push(I.pt(FC[0] + (14 + 54 * t) * Math.cos(a0 + 0.35 * t), FC[1], FC[2] + (14 + 54 * t) * Math.sin(a0 + 0.35 * t)));
    for (t = 1; t >= -0.0001; t -= 0.125) pts.push(I.pt(FC[0] + (14 + 54 * t) * Math.cos(a0 + 0.35 * t + 0.95 - 0.25 * t), FC[1], FC[2] + (14 + 54 * t) * Math.sin(a0 + 0.35 * t + 0.95 - 0.25 * t)));
    fan += I.poly(pts, '#5aa9d6', ' stroke="#2b6f99" stroke-width="1.2" stroke-linejoin="round"');
  }
  fan += I.poly(yCircle(FC[0], FC[1] + 1, FC[2], 15, 24), 'url(#hp-hub)', ' stroke="#2a3038" stroke-width="1"');
  [26, 44, 62, 78].forEach(function (r) { fan += I.poly(yCircle(FC[0], FC[1] + 3, FC[2], r, 48), 'none', ' stroke="#3f4752" stroke-width="1.3"' + NS); });
  for (var sp = 0; sp < 8; sp++) {
    var sa = sp * Math.PI / 4;
    fan += line([FC[0] + 15 * Math.cos(sa), FC[1] + 3, FC[2] + 15 * Math.sin(sa)], [FC[0] + 78 * Math.cos(sa), FC[1] + 3, FC[2] + 78 * Math.sin(sa)], '#3f4752', 1.3, NS);
  }

  /* ---------- 3. Elpárologtató: lamellás hőcserélő hátul és bal oldalt ---------- */
  var evap = I.box(-147, -58, 10, 162, 12, 186, '#aebccb') + I.box(-148, -46, 10, 12, 98, 186, '#aebccb');
  for (var fx = -144; fx < 14; fx += 4.5) evap += line([fx, -46, 12], [fx, -46, 194], 'rgba(70,90,115,.55)', 0.7, NS);
  for (var fy = -44; fy < 50; fy += 4.5) evap += line([-136, fy, 12], [-136, fy, 194], 'rgba(70,90,115,.55)', 0.7, NS);
  for (var hz = 22; hz < 190; hz += 13) {   // a rézcsövek „hajtűvégei” a jobb oldali véglapon
    evap += '<ellipse cx="' + B(15, -55, hz)[0] + '" cy="' + B(15, -55, hz)[1] + '" rx="3" ry="2" fill="#c8763a" stroke="#7a4218" stroke-width=".7"' + NS + '/>' +
      '<ellipse cx="' + B(15, -49, hz + 6)[0] + '" cy="' + B(15, -49, hz + 6)[1] + '" rx="3" ry="2" fill="#c8763a" stroke="#7a4218" stroke-width=".7"' + NS + '/>';
  }

  /* ---------- 4. Kompresszor folyadékleválasztóval ---------- */
  var CP = [62, -14];
  var comp = I.box(CP[0] - 30, CP[1] - 30, 8, 60, 60, 4, '#545d6a');
  comp += I.cyl(95, -40, 12, 11, 72, '#3e4651') + I.cyl(95, -40, 84, 6, 6, '#5d6774');
  var cb = I.pt(CP[0], CP[1], 12), ct = I.pt(CP[0], CP[1], 96), crx = 26 * 1.2247, cry = 26 * 0.7071;
  comp += '<path d="M' + (cb[0] - crx).toFixed(1) + ' ' + cb[1].toFixed(1) + ' A' + crx.toFixed(1) + ' ' + cry.toFixed(1) + ' 0 0 0 ' + (cb[0] + crx).toFixed(1) + ' ' + cb[1].toFixed(1) +
    ' L' + (ct[0] + crx).toFixed(1) + ' ' + ct[1].toFixed(1) + ' A' + crx.toFixed(1) + ' ' + (cry * 1.7).toFixed(1) + ' 0 0 0 ' + (ct[0] - crx).toFixed(1) + ' ' + ct[1].toFixed(1) + ' Z" fill="url(#hp-comp)" stroke="#1d2229" stroke-width="1"/>';
  comp += '<path d="M' + (cb[0] - crx).toFixed(1) + ' ' + (cb[1] - 30).toFixed(1) + ' A' + crx.toFixed(1) + ' ' + cry.toFixed(1) + ' 0 0 0 ' + (cb[0] + crx).toFixed(1) + ' ' + (cb[1] - 30).toFixed(1) + '" fill="none" stroke="#1d2229" stroke-width="1.2"' + NS + '/>';
  comp += I.box(CP[0] + 16, CP[1] - 6, 52, 14, 14, 18, '#6b7584');   // kapcsolódoboz
  var cl = I.pt(CP[0] + 16, CP[1] + 16, 30);
  comp += '<text x="' + cl[0].toFixed(1) + '" y="' + cl[1].toFixed(1) + '" font-size="7.5" font-weight="700" fill="#c9d1dc" text-anchor="middle"' + NS + '>DC INVERTER</text>';

  /* ---------- 5. Négyutú váltószelep (pilotszeleppel) ---------- */
  var V = [56, 10, 136];
  var valve = cylH('x', V[0], V[1], V[2], 7, 40, '#c99a3c') + I.box(V[0] + 12, V[1] - 7, V[2] + 8, 16, 14, 12, '#2e3540') +
    line([V[0] + 20, V[1], V[2] + 20], [V[0] + 20, V[1] - 22, V[2] + 34], '#2e3540', 1.6) +
    cylH('y', V[0] + 10, V[1], V[2] - 9, 2.6, 0.1, '#c99a3c');

  /* ---------- 6. Kondenzátor: lemezes hőcserélő ---------- */
  var HX = [108, -2, 30, 34, 26, 112];   // x, y, z, w, d, h
  var cond = I.box(HX[0], HX[1], HX[2], HX[3], HX[4], HX[5], '#b4bfcc');
  for (var pz = HX[2] + 6; pz < HX[2] + HX[5]; pz += 5) cond += line([HX[0] + 2, HX[1] + HX[4], pz], [HX[0] + HX[3] - 2, HX[1] + HX[4], pz], 'rgba(70,85,105,.45)', 0.8, NS);
  for (var py2 = HX[1] + 3; py2 < HX[1] + HX[4]; py2 += 3) cond += line([HX[0] + HX[3], py2, HX[2] + 2], [HX[0] + HX[3], py2, HX[2] + HX[5] - 2], 'rgba(70,85,105,.5)', 0.7, NS);
  [[116, 132], [116, 40], [134, 40], [134, 132]].forEach(function (pt) { cond += cylH('y', pt[0], HX[1] + HX[4], pt[1], 4.5, 7, '#9aa6b5'); });

  /* ---------- 7. Elektronikus expanziós szelep (léptetőmotoros) ---------- */
  var EV = [40, 44];
  var eev = I.cyl(EV[0], EV[1], 46, 5, 20, '#c99a3c') + I.cyl(EV[0], EV[1], 66, 8.5, 22, '#30363f') + I.cyl(EV[0], EV[1], 88, 4, 4, '#6b7480') +
    line([EV[0], EV[1], 80], [EV[0] + 18, EV[1] - 30, 160], '#30363f', 1.4, ' stroke-dasharray="3 2"');

  /* ---------- 8. Hűtőközeg-vezetékek ---------- */
  var HOT = '#e0402e', WARM = '#f08a24', COLD = '#2f6fd6', SUCT = '#4fc0e8';
  var dis = [[CP[0], CP[1], 104], [CP[0], CP[1], 120], [CP[0], 10, 120], [76, 10, 120], [76, 10, 129]];
  var toCond = [[90, 10, 143], [90, 10, 156], [116, 10, 156], [116, 31, 156], [116, 31, 132]];
  var liquid = [[116, 31, 40], [116, 50, 40], [EV[0], 50, 40], [EV[0], EV[1], 40], [EV[0], EV[1], 46]];
  var cold = [[EV[0] - 3, EV[1], 54], [6, EV[1], 54], [6, -40, 54], [6, -40, 24]];
  var suction = [[13, -40, 186], [13, -40, 166], [62, -40, 166], [62, 10, 166], [62, 10, 143]];
  var toAcc = [[88, 10, 129], [88, 10, 112], [95, 10, 112], [95, -40, 112], [95, -40, 90]];
  var accToComp = [[95, -29, 50], [95, -14, 50], [CP[0] + 24, -14, 50]];
  var pipes = pipe(cold, COLD, 4.2) + pipe([[6, -40, 24], [6, -40, 186]], COLD, 4) + pipe([[13, -40, 20], [13, -40, 186]], SUCT, 4.4) +
    pipe(suction, SUCT, 5) + pipe(toAcc, SUCT, 5) + pipe(accToComp, SUCT, 5) +
    pipe(dis, HOT, 4.6) + pipe(toCond, HOT, 4.6) + pipe(liquid, WARM, 3.8);
  for (var cz = 34; cz < 186; cz += 26) pipes += pipe([[6, -40, cz], [11, -46, cz + 4]], COLD, 1.6);   // elosztó kapillárisok
  pipes += arrowAt(dis[1], dis[2], HOT) + arrowAt(toCond[2], toCond[3], HOT) + arrowAt(liquid[1], liquid[2], WARM) +
    arrowAt(cold[1], cold[2], COLD) + arrowAt(suction[1], suction[2], SUCT) + arrowAt(toAcc[2], toAcc[3], SUCT);

  /* ---------- 9. Keringtető szivattyú (a visszatérő ágon) ---------- */
  var PU = [128, -34];
  var pump = cylH('y', PU[0], PU[1] - 9, 26, 11, 18, '#5b6b7c') + I.cyl(PU[0], PU[1], 36, 10, 26, '#2f7d8c') + I.cyl(PU[0], PU[1], 62, 6, 4, '#c3ccd6');
  var pl = I.pt(PU[0], PU[1], 49);
  pump += '<circle cx="' + pl[0].toFixed(1) + '" cy="' + (pl[1] + 6).toFixed(1) + '" r="2.4" fill="#7ee08b"' + NS + '/>';

  /* ---------- 10. Vezérlés és inverter ---------- */
  var ctrl = I.box(30, -52, 170, 112, 96, 6, '#3d4552') + I.face(34, -48, 176.1, 104, 88, '#2f7d4f', ' stroke="#1f5434" stroke-width="1"');
  for (var hs = 0; hs < 7; hs++) ctrl += I.box(40 + hs * 5, -40, 176, 2.5, 30, 12, '#c3cad3');
  ctrl += I.box(84, -40, 176, 16, 16, 4, '#22262c') + I.box(106, -36, 176, 12, 12, 3, '#22262c') + I.box(104, 10, 176, 22, 14, 7, '#d9dde3');
  [[60, 16], [70, 16], [60, 28], [70, 28]].forEach(function (c) { ctrl += I.cyl(c[0], c[1], 176, 4.5, 12, '#2a5fa8'); });
  ctrl += I.box(118, -44, 176, 18, 6, 6, '#e8e3d0');
  var chip = I.pt(92, -32, 180);
  ctrl += '<text x="' + chip[0].toFixed(1) + '" y="' + (chip[1] + 2).toFixed(1) + '" font-size="5" fill="#9aa3ad" text-anchor="middle"' + NS + '>MCU</text>';

  /* ---------- 11. Fűtési víz: előremenő és visszatérő ---------- */
  var FLOW = '#d6453d', RET = '#3d7bd6';
  var flowP = [[134, 31, 132], [134, 44, 132], [134, 44, 140], [240, 44, 140]];
  var retIn = [[240, -34, 26], [PU[0] + 9, -34, 26]];
  var retOut = [[PU[0], PU[1] + 9, 26], [PU[0], 14, 26], [134, 14, 26], [134, 31, 26], [134, 31, 40]];
  var water = pipe(flowP, FLOW, 7) + pipe(retIn, RET, 7) + pipe(retOut, RET, 6) +
    arrowAt(flowP[2], flowP[3], FLOW) + arrowAt(retIn[0], retIn[1], RET);
  water += cylH('x', 214, 44, 140, 6, 8, '#9aa6b5') + cylH('x', 214, -34, 26, 6, 8, '#9aa6b5');
  var fl = I.pt(240, 44, 140), rl = I.pt(240, -34, 26);
  water += '<text class="lbl" x="' + (fl[0] + 12).toFixed(1) + '" y="' + (fl[1] - 2).toFixed(1) + '" font-size="12">előremenő víz</text>' +
    '<text class="lbl-muted" x="' + (fl[0] + 12).toFixed(1) + '" y="' + (fl[1] + 13).toFixed(1) + '">35 °C → a házba</text>' +
    '<text class="lbl" x="' + (rl[0] + 12).toFixed(1) + '" y="' + (rl[1] - 2).toFixed(1) + '" font-size="12">visszatérő víz</text>' +
    '<text class="lbl-muted" x="' + (rl[0] + 12).toFixed(1) + '" y="' + (rl[1] + 13).toFixed(1) + '">30 °C ← a házból</text>';

  STUDIE.addModel({
    id: 'hoszivattyu',
    title: 'Hőszivattyú (levegő–víz)',
    icon: '♨️',
    color: '#0e9aa7',
    category: 'Energia',
    keywords: 'hőszivattyú levegő-víz monoblokk kültéri egység fűtés hűtés kompresszor inverter elpárologtató kondenzátor lemezes hőcserélő expanziós szelep négyutú váltószelep hűtőközeg R290 propán R32 freon COP SCOP Carnot hűtőkör leolvasztás keringtető szivattyú padlófűtés megújuló energia',
    summary: 'A hideg kinti levegőből „szivattyúzza” be a hőt a házba: egy kilowattóra áramból három-négy kilowattóra hő lesz.',
    scale: 'kb. 110 × 45 × 90 cm, 60–120 kg',
    viewBox: '0 0 720 560',
    backdrop: backdrop,
    intro: 'A hőszivattyú **nem termeli**, hanem **átszállítja** a hőt: a kinti levegőből (még −10 °C-os levegőből is!) hőt vesz fel, és magasabb hőmérsékleten adja le a fűtővíznek. Ugyanazt csinálja, mint a hűtőszekrény, csak fordítva: a hűtő a belsejéből szállítja ki a hőt a konyhába.\n\nA „szállítóeszköz” a **hűtőközeg**, amely zárt csőkörben kering, és négy lépést ismétel: **elpárolog** (hőt vesz fel), **összesűrítik** (felmelegszik), **lecsapódik** (hőt ad le), majd **fojtják** (lehűl). A munkát a **kompresszor** végzi árammal, de a leadott hő 3–4-szerese a felvett áramnak: a többi a levegőből jön.',
    parts: [
      {
        id: 'haz', z: 0, name: 'Kültéri egység háza', svg: housing, explode: [0, 0], badge: B(-150, 60, 178), en: 'outdoor unit casing (monobloc)',
        what: 'A kültéri egység „doboza”. Egy **monoblokk** hőszivattyúban a teljes hűtőkör a házban van, a lakásba csak a **fűtővíz** csövei mennek. A ház két részre oszlik: a bal oldali **ventilátortérben** áramlik át a levegő a hőcserélőn, a jobb oldali, zárt **gépházban** van a kompresszor és az elektronika.',
        madeOf: 'Porfestett, horganyzott **acéllemez** vagy alumínium burkolat, alul **kondenzvíz-tálca** és csepegtető nyílások, a gépházban hang- és rezgéscsillapító **szivacs** és gumibakok. Hátul védőrács óvja a lamellákat.',
        how: 'A lemezeket CNC-vel kivágják, élhajlító gépen hajlítják, majd horganyozzák és porfestik (a festéket kemencében beégetik). A gyártósoron a lemezekre szerelik a hűtőkört, aztán felkerül a burkolat. Telepítéskor a házat **rezgéscsillapító lábakra** vagy fali konzolra teszik, a csapadékvíz elvezetésével együtt.',
        uni: 'A ház tervezésénél a fő szempont az **akusztika** és a **légáram**. A hangteljesítményszint (L_WA) tipikusan 50–60 dB(A); a szomszéd felé eső hangnyomás a távolsággal kb. `L_p = L_W − 20·lg r − 8 + D_c` szerint csökken (félteres terjedés, D_c irányítottsági tényező). A propános (R290) gépeknél a gépház kialakítása a **robbanásvédelmi** előírásokat is követi: az elektromos alkatrészek nem lehetnek szikraképző forrásai az esetleg kiszivárgó gáznak, és a lakásba kerülő vízkörben gázleválasztó kell.',
        fact: 'Monoblokknál a lakásba csak víz megy. Az ún. **split** rendszerekben a hűtőközeg is bejut egy beltéri egységig, ezért a szerelésükhöz hűtőtechnikusi engedély kell.'
      },
      {
        id: 'ventilator', z: 9, name: 'Ventilátor', svg: fan, explode: [-100, 70], en: 'axial fan (EC motor)',
        what: 'Nagy, lassan forgó **axiális ventilátor**, amely a kinti levegőt átszívja a hátsó hőcserélő lamellái között, majd elölről kifújja. A kifújt levegő **hidegebb** a beszívottnál (kb. 5 °C-kal), mert a hőt átadta a hűtőközegnek.',
        madeOf: 'Üvegszállal erősített **műanyag** (poliamid vagy polipropilén) lapátok, közepükön **EC motor** (elektronikusan kommutált, kefe nélküli egyenáramú motor). Elöl acél vagy műanyag **védőrács**.',
        how: 'A lapátkereket egy darabban fröccsöntik, majd kiegyensúlyozzák, hogy ne rezegjen. A lapátok ívelt, „sarlós” formája a zajt csökkenti. Az EC motor fordulatszámát a vezérlés folyamatosan változtatja a hőigénytől függően.',
        uni: 'A ventilátorok hasonlósági törvényei: a térfogatáram `V̇ ∝ n`, a nyomásnövekedés `Δp ∝ n²`, a teljesítmény `P ∝ n³`. Fél fordulatszámon tehát csak **1/8 teljesítmény** kell: ezért éri meg változtatható fordulatszámú EC motor. Egy 8 kW-os gépen kb. 3000–4000 m³/h levegő áramlik át: `Q̇ = ρ · V̇ · c_p · ΔT` alapján 5 K lehűlésnél ez kb. 5–7 kW elvont hő.',
        fact: 'Egy 8 kW-os hőszivattyú óránként kb. akkora tömegű levegőt mozgat át, mint egy kisebb tornaterem teljes légtere.'
      },
      {
        id: 'elparologtato', z: 2, name: 'Elpárologtató (lamellás hőcserélő)', svg: evap, explode: [-56, -24], badge: B(-60, -52, 150), en: 'evaporator (finned-tube heat exchanger)',
        terms: ['fizika-bsc/elso-fotetel', 'fizika-bsc/belso-energia'],
        what: 'A hátsó és oldalsó, sűrű bordázatú „radiátor”. Itt **veszi fel a hőt** a hűtőközeg a kinti levegőből. A csövekben a hideg (pl. −8 °C-os) hűtőközeg **elpárolog**: forrásához hő kell, ezt a melegebb (pl. +2 °C-os) levegőtől kapja.',
        madeOf: '**Rézcsövek** (újabban alumínium), amelyeken több száz vékony, kb. 0,1 mm-es **alumínium lamella** ül. A lamellák óriási felületet adnak: egy egységben több tíz négyzetméter. Gyakran **hidrofil bevonattal** látják el, hogy a kicsapódó víz könnyen lefolyjon.',
        how: 'A lamellákat szalagból sajtolják ki, egymásra rakják, majd a hajtűre hajlított csöveket átdugják rajtuk. Ezután a csöveket belülről **kitágítják** (mechanikusan vagy nyomással), így a lamellák szorosan ráfeszülnek. A csővégeket ívekkel összeforrasztják, végül nyomáspróbázzák.',
        uni: 'A felvett hőáram `Q̇₀ = k · A · ΔT_m`, ahol ΔT_m a **logaritmikus közepes hőmérséklet-különbség**. A hűtőközeg oldalán az elpárolgás állandó hőmérsékleten megy végbe (izobár–izoterm kétfázisú szakasz), a kilépésnél a gőzt 3–6 K-nel **túlhevítik**, hogy a kompresszorba biztosan ne jusson folyadék. 0 °C körüli lamella-hőmérsékletnél a levegő nedvessége **dérként** fagy ki: ez rontja a hőátadást, ezért kell időnként leolvasztani.',
        fact: '−7 °C-os külső levegőből is ki lehet nyerni hőt: a hűtőközeg ilyenkor kb. −15 °C-on forr, tehát a levegő még mindig melegebb nála.'
      },
      {
        id: 'kompresszor', z: 4, name: 'Kompresszor (inverteres)', svg: comp, explode: [-40, 100], badge: B(CP[0], CP[1] + 20, 70), en: 'variable-speed (inverter) scroll / rotary compressor',
        terms: ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/idealis-gaz', 'e-mobilitas/pmsm'],
        what: 'A hőszivattyú „szíve”, ez használja az áramot. Összenyomja a hideg, kis nyomású hűtőközeg-gőzt, ettől az **felforrósodik** (60–90 °C-ra) és nyomása 4–5-szörösére nő. Mellette a kisebb henger a **folyadékleválasztó**: nem engedi, hogy folyadékcsepp jusson a kompresszorba.',
        madeOf: 'Hermetikusan lezárt **acél** tok, benne egy **állandó mágneses szinkronmotor** és a sűrítő mechanizmus: **scroll** (két egymásba illő csiga) vagy **rotációs** (forgódugattyús) kivitel. A belső súrlódó felületeket speciális **olaj** keni, amely a hűtőközeggel együtt kering.',
        how: 'A csigákat (scrollokat) alumíniumból vagy öntöttvasból mikrométeres pontossággal marják. Az összeszerelt motort és sűrítőt acél tokba hegesztik, így semmi nem szivároghat ki. Gumibakokra szerelik, hogy a rezgése ne jusson át a házra.',
        uni: 'A sűrítés ideálisan **izentrópikus**: `T₂ = T₁ · (p₂/p₁)^((κ−1)/κ)`. A log p–h diagramon a 1→2 szakasz; a fajlagos munka `w = h₂ − h₁`, valós gépnél `η_is = (h₂s − h₁)/(h₂ − h₁) ≈ 0,6–0,75`. Az **inverter** a motor fordulatszámát kb. 15–120 Hz között változtatja: így a gép nem kapcsolgat ki-be, hanem folyamatosan pont annyi hőt ad, amennyi kell. Részterhelésen a hőcserélők relatíve nagyok, kisebb a ΔT, ezért a **COP magasabb**.',
        fact: 'Egy háztartási hőszivattyú kompresszora 1–3 kW-ot vesz fel, és közben 4–10 kW hőt juttat a fűtésbe.'
      },
      {
        id: 'valtoszelep', z: 6, name: 'Négyutú váltószelep', svg: valve, explode: [10, -82], badge: B(V[0] + 20, V[1] + 6, V[2] + 6), en: 'four-way reversing valve',
        what: 'Egy „váltó” a hűtőkörben: megfordítja a hűtőközeg áramlási irányát. **Fűtéskor** a forró gáz a víz felé (a lemezes hőcserélőbe) megy, **hűtéskor és leolvasztáskor** a kinti hőcserélő felé. A kompresszor mindig ugyanabba az irányba szív és nyom, csak a szelep „kapcsolja át” a vezetékeket.',
        madeOf: '**Sárgaréz** test négy rézcsonkkal, benne egy csúszó tolattyú (műanyag szánnal), tetején egy kis **elektromágneses pilotszelep** (fekete tekercs).',
        how: 'A testet sárgaréz csőből alakítják, a csonkokat keményforrasztással illesztik. Működése okos: a kis pilotszelep csak egy vékony csövön irányítja a nyomáskülönbséget, és a kompresszor **saját nyomása** tolja át a nagy tolattyút.',
        uni: 'A tolattyú két végének nyomása közötti különbséget (Δp ≈ 5–15 bar) a pilotszelep a szívóoldalra „engedi le” az egyik oldalon: az így keletkező erő `F = Δp · A` mozgatja a tolattyút. Átváltáskor a kör nyomásai kiegyenlítődnek, ezért a vezérlés a váltás előtt rövid ideig leveszi a kompresszor fordulatszámát (hidraulikus ütés, zaj csökkentése).',
        fact: 'A légkondicionálók nagy része is ilyen szeleppel tud fűteni: valójában mind hőszivattyúk.'
      },
      {
        id: 'kondenzator', z: 5, name: 'Kondenzátor (lemezes hőcserélő)', svg: cond, explode: [96, -14], badge: B(HX[0] + 17, HX[1] + 26, 86), en: 'condenser (brazed plate heat exchanger)',
        what: 'Itt adja le a hőt a hűtőközeg a **fűtővíznek**. A forró gáz a lemezek közt lehűl és **lecsapódik** (kondenzálódik), miközben sok hőt ad le. A víz és a hűtőközeg **ellenáramban**, egymás melletti réseken folyik, de sosem keveredik.',
        madeOf: 'Több tucat préselt, halszálkamintás **rozsdamentes acéllemez**, amelyeket **rézzel** (vagy nikkellel) forrasztanak össze. Kívül hőszigetelés borítja.',
        how: 'A lemezeket présgéppel hullámosítják, felváltva elforgatva egymásra rakják, közéjük forraszfóliát tesznek, és vákuumkemencében kb. 1100 °C-on összeforrasztják. Így egyetlen tömör, nyomásálló blokk lesz belőle, amelyben a csatornák felváltva a vízé és a hűtőközegé.',
        uni: 'A hűtőközeg oldalán három szakasz van: **túlhevítés elvétele** (gáz), **kondenzáció** (állandó hőmérsékleten, ez adja a hő zömét, a párolgáshő `r`), majd **utóhűtés** (folyadék). A log p–h diagramon a 2→3 vízszintes szakasz; a leadott fajlagos hő `q = h₂ − h₃`. A halszálkaminta erős turbulenciát kelt: a hőátbocsátási tényező 2000–5000 W/(m²·K), ezért ilyen kicsi a készülék. Minél alacsonyabb az előremenő víz hőmérséklete, annál alacsonyabb a kondenzációs nyomás, annál kisebb a kompresszor munkája.',
        fact: 'Egy cipősdoboznál kisebb lemezes hőcserélő is képes 10 kW hőt átadni: ennyi egy kisebb családi ház teljes hőigénye fagyban.'
      },
      {
        id: 'expanzios', z: 7, name: 'Elektronikus expanziós szelep', svg: eev, explode: [-58, -52], badge: B(EV[0], EV[1], 78), en: 'electronic expansion valve (EEV)',
        what: 'A kör „fojtója”. A nagy nyomású, meleg folyékony hűtőközeget egy apró, állítható résen engedi át. A résen túl a nyomás hirtelen leesik, a folyadék egy része **felforr**, és ettől az egész **lehűl** (pl. +30 °C-ról −10 °C-ra). Olyan, mint amikor a dezodoros flakonból kiáramló gáz hideg.',
        madeOf: '**Sárgaréz** szeleptest kúpos tűvel, tetején **léptetőmotor** (fekete tekercs). A motor akár 500 lépésben állítja a tű helyzetét.',
        how: 'A tűt és az ülést nagy pontossággal esztergálják. A vezérlés a kompresszor előtti hőmérsékletből és nyomásból számolja a **túlhevítést**, és másodpercenként igazítja a szelepnyitást: ha túl kevés a hűtőközeg az elpárologtatóban, kinyit, ha túl sok, fojt.',
        uni: 'A fojtás **izentalpikus** folyamat (`h₃ = h₄`, Joule–Thomson-effektus): a log p–h diagramon függőleges vonal. A kilépő állapot gőztartalma `x₄ = (h₄ − h′)/(h″ − h′)` tipikusan 0,2–0,35. A fojtás termodinamikai veszteség (exergiarombolás): nagy gépekben ezt **expanderrel** vagy **ejektorral** részben visszanyerik. A túlhevítés-szabályozás tipikusan PI-szabályzó, alapjel 4–6 K.',
        fact: 'Régebbi gépekben termosztatikus szelep (TXV) volt: egy gázzal töltött kis tartály „érezte” a hőmérsékletet, és mechanikusan állította a rést, áram nélkül.'
      },
      {
        id: 'vezetekek', z: 8, name: 'Hűtőközeg-vezetékek', svg: pipes, explode: [0, 0], badge: B(6, 44, 60), en: 'refrigerant piping (discharge, liquid, suction lines)',
        what: 'Zárt **rézcső**-kör, amelyben a hűtőközeg kering. A rajzon a színek a hőmérsékletet mutatják: **piros** a kompresszorból jövő forró gáz, **narancs** a meleg folyadék, **kék** a fojtás utáni hideg folyadék–gőz keverék, **világoskék** a kompresszorba visszatérő hideg gáz. A nyilak az áramlás irányát jelzik fűtési üzemben.',
        madeOf: 'Vörösréz csövek, ezüsttartalmú keményforrasztással összeillesztve. Benne a **hűtőközeg**: ma egyre inkább **R290 (propán)**, vagy R32; régebben R410A, R134a, még régebben ózonbontó freonok. Egy háztartási gépben mindössze 0,5–3 kg hűtőközeg van.',
        how: 'A csöveket hajlítógéppel formázzák, és nitrogénáram alatt forrasztják, hogy belül ne oxidálódjanak. Kész állapotban a kört nagy nyomású nitrogénnel vagy héliummal **tömörségpróbázzák**, majd **vákuumozzák** (hogy ne maradjon benne nedvesség és levegő), végül grammra pontosan feltöltik hűtőközeggel.',
        uni: 'A körfolyamat a **log p–h diagramon** egy torzult téglalap: 1→2 sűrítés (izentrópikus közelítés), 2→3 hőleadás állandó nyomáson, 3→4 izentalpikus fojtás, 4→1 elpárolgás. A fűtési teljesítménytényező `COP = q_kond / w = (h₂ − h₃)/(h₂ − h₁)`. A Carnot-határ `COP_C = T_meleg/(T_meleg − T_hideg)` (kelvinben): 35 °C / 0 °C esetén ≈ 8,8, a valós gépek ennek kb. 45–55%-át érik el (COP ≈ 4–4,5). A hűtőközeg környezeti hatását a **GWP** (globális felmelegítő potenciál) jellemzi: R410A ≈ 2088, R32 ≈ 675, R290 ≈ 3.',
        fact: 'A propán (R290) GWP-je kb. 3, a korábban elterjedt R410A-é kb. 2000: ha kiszivárogna, kb. 700-szor kevésbé melegítené a klímát.'
      },
      {
        id: 'szivattyu', z: 3, name: 'Keringtető szivattyú', svg: pump, explode: [40, 122], badge: B(PU[0], PU[1], 72), en: 'circulation pump (ECM, high-efficiency)',
        what: 'A **fűtővizet** keringeti a hőszivattyú és a ház radiátorai vagy padlófűtése között. Nélküle a meleg víz a lemezes hőcserélőben „megállna”, és a gép túlmelegedne.',
        madeOf: 'Öntöttvas vagy kompozit **szivattyúház** (csiga), benne műanyag járókerék, rajta nedvestengelyű, **állandó mágneses motor** elektronikával. A motor forgórészét maga a víz keni és hűti.',
        how: 'A szivattyúházat öntik, a járókereket fröccsöntik. A mai „A” energiaosztályú szivattyúk elektronikája méri a nyomáskülönbséget, és csak annyi fordulattal forog, amennyi éppen kell: 5–45 W-ot fogyaszt egy régi, 60–100 W-os helyett.',
        uni: 'A munkapontot a szivattyú jelleggörbéjének és a hálózat `Δp = R · V̇²` jelleggörbéjének metszéspontja adja. A szükséges térfogatáram `V̇ = Q̇ / (ρ · c_p · ΔT)`: 8 kW-hoz és 5 K hőfoklépcsőhöz kb. 0,38 l/s ≈ 1,4 m³/h kell. Hőszivattyúnál fontos a **kis ΔT** (nagy térfogatáram), mert így alacsonyabb előremenő hőmérséklettel is leadható a teljesítmény.',
        fact: 'Az EU 2015 óta csak nagy hatásfokú (EEI ≤ 0,23) keringtető szivattyúk forgalmazását engedi.'
      },
      {
        id: 'vezerles', z: 10, name: 'Vezérlés és inverter elektronika', svg: ctrl, explode: [30, -132], badge: B(86, 0, 186), link: 'processzor', en: 'controller and inverter drive (PCB, IGBT/MOSFET power module)',
        terms: ['e-mobilitas/inverter', 'e-mobilitas/pwm', 'villamosmernoki/teljesitmenytenyezo'],
        what: 'A hőszivattyú „agya” és „izma”. Egy **mikrovezérlő** méri a hőmérsékleteket és nyomásokat, és dönt: milyen gyorsan forogjon a kompresszor és a ventilátor, mennyire nyisson az expanziós szelep, mikor kell leolvasztani. Az **inverter** a hálózati váltakozó áramot átalakítja a kompresszormotornak szükséges, változtatható frekvenciájú árammá.',
        madeOf: '**Nyomtatott áramköri lap** (zöld) mikrovezérlővel, **teljesítménymodul** (IGBT vagy MOSFET tranzisztorok) **alumínium hűtőbordán**, nagy **kondenzátorok** (kék hengerek), fojtótekercsek, csatlakozók és szűrők.',
        how: 'Az alkatrészeket automata gépek ültetik a lapra, majd forrasztókemencében forrasztják. A teljesítménymodul hővezető pasztával csavarozódik a hűtőbordára, amelyet gyakran maga a **szívóoldali hideg hűtőközeg-cső** hűt. A program (firmware) a gyártó évtizedes tapasztalatát tartalmazza.',
        uni: 'Az inverter két fokozatú: **egyenirányító + PFC** (teljesítménytényező-javító boost konverter, cos φ ≈ 0,99), majd egy **háromfázisú hídkapcsolás**, amely **PWM** jelekkel szinuszos áramot állít elő a motornak. A szinkronmotort érzékelő nélküli **mezőorientált szabályozással** (FOC) hajtják. A vezérlés zárt hurkú: az előremenő vízhőmérséklet alapjelét az **időjárás-követő görbe** adja (külső hőmérséklet → szükséges vízhőmérséklet).',
        fact: 'Az inverter teljesítménymodulja több kilowattot kapcsol másodpercenként több ezerszer, a hővesztesége mégis csak néhány tíz watt.'
      },
      {
        id: 'viz', z: 1, name: 'Fűtési előremenő és visszatérő víz', svg: water, explode: [66, 40], badge: B(176, -34, 26), en: 'heating flow and return (hydronic circuit)',
        what: 'A két vastag cső köti össze a kültéri egységet a ház fűtésével. Az **előremenő** ágon a felmelegített víz (pl. 35 °C) megy a padlófűtésbe vagy a radiátorokba, a **visszatérő** ágon a lehűlt víz (pl. 30 °C) jön vissza. A visszatérő ágon ül a **keringtető szivattyú**.',
        madeOf: 'Hőszigetelt **acél, réz** vagy többrétegű műanyag cső, csatlakozóknál **rezgéscsillapító flexibilis tömlő**, szűrő, elzáró csapok, a rendszerben **tágulási tartály** és biztonsági szelep. Télen a kinti szakasz fagyveszélyes: ezért van benne fagyvédelmi funkció vagy fagyálló folyadék.',
        how: 'A telepítő köti be, a falon át szigetelt csővel. Feltöltés előtt átmossák a rendszert, és légtelenítik. A víz minősége fontos: a vízkő és az iszap elrontaná a lemezes hőcserélőt, ezért mágneses iszapleválasztót is szerelnek be.',
        uni: 'A hőszivattyú hatásfokát legjobban az **előremenő hőmérséklet** határozza meg: minden 1 K csökkenés kb. 2–3%-kal javítja a COP-t. Ezért ideális a **nagy felületű, alacsony hőmérsékletű** fűtés (padlófűtés 30–35 °C, falfűtés). A szezonális mutató az **SCOP** (EN 14825), amely az év közbeni külső hőmérséklet-eloszlással súlyozza a részterhelési COP-értékeket.',
        fact: 'Padlófűtéssel (35 °C) egy jó gép SCOP-ja 4–5, régi radiátorokkal (55 °C) inkább 2,8–3,5.'
      }
    ],
    uni: {
      text: 'A hőszivattyú egy **fordított Carnot-körfolyamatot** közelítő gőzkompressziós körfolyamat. A termodinamika második főtétele szerint hő magától csak melegebbről hidegebbre áramlik; a „hegynek fel” szállításhoz munka kell. Az ideális (Carnot-) fűtési teljesítménytényező\n\n`COP_C = T_m / (T_m − T_h)`\n\nahol `T_m` a leadási, `T_h` a felvételi hőmérséklet kelvinben. Látszik, hogy **minél kisebb a hőmérséklet-emelés**, annál jobb a gép: 0 °C-ról 35 °C-ra ≈ 8,8, de 55 °C-ra már csak ≈ 6. A valós körfolyamatot a **log p–h diagramon** követik (függőleges tengely: nyomás logaritmikusan, vízszintes: fajlagos entalpia). Itt a négy lépés: 1→2 sűrítés (kompresszor), 2→3 hűtés és kondenzáció (lemezes hőcserélő), 3→4 fojtás (függőleges, izentalpikus), 4→1 elpárolgás. A COP egyszerűen leolvasható: `COP = (h₂ − h₃)/(h₂ − h₁)`. Az energiamérleg (első főtétel): `Q̇_kond = Q̇_elp + P_el`.',
      terms: ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/entropia', 'fizika-bsc/elso-fotetel', 'e-mobilitas/inverter', 'e-mobilitas/hatasfok']
    },
    steps: [
      { icon: '🌬️', title: '1. Elpárolgás: hő a kinti levegőből', text: 'A ventilátor átszívja a kinti levegőt a lamellás **elpárologtatón**. A csövekben a hűtőközeg nagyon hideg (pl. −8 °C) és kis nyomású, ezért a +2 °C-os levegő is melegebb nála: a hő átáramlik, és a hűtőközeg **elforr**. Közben sok hőt nyel el (párolgáshő), de a hőmérséklete alig változik. A kifújt levegő lehűl.', parts: ['ventilator', 'elparologtato'] },
      { icon: '🗜️', title: '2. Sűrítés: a kompresszor felforrósítja', text: 'A hideg gőz a **folyadékleválasztón** át a **kompresszorba** jut. Ez 4–5-szörös nyomásra sűríti, és ettől a gáz **60–90 °C-ra** forrósodik (ugyanezért melegszik a kerékpárpumpa is). Ez az egyetlen lépés, ami jelentős áramot fogyaszt.', parts: ['kompresszor', 'vezetekek'] },
      { icon: '🔀', title: '3. Irányváltó: merre menjen a forró gáz?', text: 'A forró gáz a **négyutú váltószelepen** halad át. Fűtési üzemben a szelep a **lemezes hőcserélő**, azaz a víz felé irányítja. A visszatérő hideg gázt pedig a kompresszor szívóoldalára vezeti.', parts: ['valtoszelep', 'vezetekek'] },
      { icon: '💧', title: '4. Kondenzáció: hő a fűtővíznek', text: 'A **lemezes hőcserélőben** a forró gáz átadja a hőjét a fűtővíznek, és **lecsapódik** folyadékká (ahogy a gőz a hideg tükrön). A víz 30 °C-ról 35 °C-ra melegszik, és a **keringtető szivattyú** elviszi a padlófűtésbe vagy a radiátorokba.', parts: ['kondenzator', 'viz', 'szivattyu'] },
      { icon: '🧊', title: '5. Fojtás: a nyomás leesik, a folyadék lehűl', text: 'A még meleg, nagy nyomású folyadék az **expanziós szelep** apró résén préselődik át. A nyomás hirtelen leesik, a folyadék egy része felforr, és az egész **−10 °C körülire hűl**. Ez a hideg keverék jut vissza az elpárologtatóba, és kezdődik elölről a kör, percenként többször.', parts: ['expanzios', 'vezetekek'] },
      { icon: '🎛️', title: '6. Szabályozás: pont annyi hő, amennyi kell', text: 'A **vezérlés** folyamatosan méri a kinti és a víz hőmérsékletét, a nyomásokat és a túlhevítést. Az **inverter** ennek alapján állítja a kompresszor fordulatszámát: enyhe időben lassan, nagy fagyban gyorsan forog. A gép így ritkán kapcsol ki-be, és jobb a hatásfoka.', parts: ['vezerles', 'kompresszor'] },
      { icon: '❄️', title: '7. Leolvasztás: ha bederesedik a lamella', text: 'Fagypont körüli, párás időben a lamellákra **dér** rakódik, ami szigetel. A vezérlés ezt észleli (a nyomás és a hőmérséklet alapján), és néhány percre **átkapcsolja a váltószelepet**: a forró gáz ekkor a kinti hőcserélőbe megy, és leolvasztja a jeget. A ventilátor közben áll, a kültéri egység alól víz csöpög és pára száll fel.', parts: ['valtoszelep', 'elparologtato', 'ventilator'] },
      { icon: '☀️', title: '8. Nyári hűtés: ugyanaz, visszafelé', text: 'Nyáron a **váltószelep** tartósan megfordítja a kört: a lemezes hőcserélő lesz az **elpárologtató** (lehűti a vizet kb. 18 °C-ra), a kinti lamellás hőcserélő pedig a **kondenzátor** (oda adja le a hőt). A hűtött víz padlón vagy fan-coilokon át hűti a házat.', parts: ['valtoszelep', 'kondenzator', 'elparologtato'] }
    ],
    history: [
      { year: '1852', text: '**William Thomson (Lord Kelvin)** leírja a hőszivattyú elvét: egy gép, amely munka árán hőt szállít a hidegebb helyről a melegebbre, és több hőt ad le, mint amennyi munkát felvesz.' },
      { year: '1856', text: '**Peter von Rittinger** osztrák bányamérnök megépíti az első működő hőszivattyús rendszert: sólepárlóban a pára hőjét visszanyerve takarékoskodik a tüzelőanyaggal.' },
      { year: '1930-as évek', text: 'Zürichben a városháza fűtésére (1938) folyóvízből hőt nyerő hőszivattyút építenek, ez az egyik első nagy épületfűtési alkalmazás.' },
      { year: '1940-es évek', text: '**Robert C. Webber** amerikai feltaláló a mélyhűtője kivezető csövét megérintve jön rá, hogy a „kidobott” hővel fűteni lehet: megépíti az első **földhős** (talajszondás) közvetlen hőcserélős hőszivattyút.' },
      { year: '1987', text: 'A **Montreali jegyzőkönyv** elrendeli az ózonréteget bontó **freonok** (CFC-k, később HCFC-k, pl. R22) kivezetését. Helyükre klórmentes hűtőközegek kerülnek.' },
      { year: '1980–2000-es évek', text: 'Japán gyártók elterjesztik az **inverteres kompresszort**: a fordulatszám-szabályozással a gépek csendesebbek és jelentősen hatékonyabbak lesznek, a levegős hőszivattyú fagyban is használható lesz.' },
      { year: '2016', text: 'A **Kigali-módosítás** a nagy GWP-jű fluorozott hűtőközegek (HFC-k) fokozatos visszaszorítását írja elő; az EU F-gáz rendelete is szigorodik.' },
      { year: 'ma', text: 'Terjed az **R290 (propán)** hűtőközeg (GWP ≈ 3), amellyel a levegő–víz gépek 70 °C-os vizet is előállítanak, így régi radiátoros házakban is használhatók. Európában évente milliószám telepítenek hőszivattyút.' }
    ],
    quiz: [
      { q: 'Mit csinál a hőszivattyú a kinti levegő hőjével?', options: ['Elvonja, és magasabb hőmérsékleten a fűtővíznek adja', 'Elégeti', 'Árammá alakítja', 'Kifújja a házból'], answer: 0, explain: 'A hőszivattyú nem termel hőt, hanem a hidegebb helyről a melegebbre szállítja, ehhez kell a kompresszor munkája.' },
      { q: 'Melyik alkatrész forrósítja fel a hűtőközeg-gőzt?', options: ['A kompresszor', 'Az expanziós szelep', 'Az elpárologtató', 'A ventilátor'], answer: 0, explain: 'A gáz összenyomáskor felmelegszik, mint a kerékpárpumpa.' },
      { q: 'Mi történik a hűtőközeggel az expanziós szelep után?', options: ['A nyomása leesik, és nagyon lehűl', 'Felforrósodik', 'Megszilárdul', 'Kikerül a levegőbe'], answer: 0, explain: 'A fojtás után a folyadék egy része felforr, ettől az egész keverék −10 °C körülire hűl.' },
      { q: 'Mit jelent, ha egy hőszivattyú COP-ja 4?', options: ['1 kWh áramból 4 kWh hőt ad', 'A hatásfoka 4%', '4 °C-ig működik', '4 kW áramot vesz fel'], answer: 0, explain: 'A COP a leadott hő és a felvett elektromos energia aránya. A „többlet” a kinti levegőből jön.' },
      { q: 'Melyik alkatrész teszi lehetővé a leolvasztást és a nyári hűtést?', options: ['A négyutú váltószelep', 'A keringtető szivattyú', 'A ház', 'A lemezes hőcserélő szigetelése'], answer: 0, explain: 'A váltószelep megfordítja a hűtőközeg áramlását, így a kinti hőcserélőbe megy a forró gáz.' }
    ]
  });
})();
