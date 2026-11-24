/* Modell: az állati (emberi) sejt – sematikus metszeti rajz a fontosabb sejtalkotókkal.
 * Nem méretarányos: a valóságban a riboszómák és a vezikulák sokkal kisebbek. */
(function () {
  var CX = 330, CY = 232, RX = 262, RY = 182;    // a sejthártya külső széle
  var N = { x: 288, y: 228, rx: 80, ry: 72 };     // a sejtmag
  var NS = ' pointer-events="none"';
  function f(v) { return (+v).toFixed(1); }
  function rnd(i) { var x = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return x - Math.floor(x); }
  function E(cx, cy, rx, ry, t) { return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)]; }
  function circ(x, y, r, fill, extra) {
    return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + r + '" fill="' + fill + '"' + (extra || '') + '/>';
  }
  function poly(pts) { return pts.map(function (p, i) { return (i ? 'L' : 'M') + f(p[0]) + ' ' + f(p[1]); }).join(' '); }
  /* sima görbe pontokon át (a szakaszfelező pontokon át húzott másodfokú Bézier-láncként) */
  function smooth(pts) {
    var d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (var i = 1; i < pts.length - 1; i++) {
      var mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += ' Q' + f(pts[i][0]) + ' ' + f(pts[i][1]) + ' ' + f(mx) + ' ' + f(my);
    }
    var l = pts[pts.length - 1];
    return d + ' L' + f(l[0]) + ' ' + f(l[1]);
  }
  function tube(d, outer, inner, w) {
    return '<path d="' + d + '" fill="none" stroke="transparent" stroke-width="' + (w + 8) + '" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + outer + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + inner + '" stroke-width="' + (w * 0.42).toFixed(1) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  var defs = '<defs>' +
    '<radialGradient id="sj-cyto" cx="45%" cy="45%" r="60%"><stop offset="0" stop-color="#f3a9c6" stop-opacity=".30"/><stop offset="1" stop-color="#e27aa5" stop-opacity=".18"/></radialGradient>' +
    '<radialGradient id="sj-nuc" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#e2d4fa"/><stop offset=".6" stop-color="#c0a6ec"/><stop offset="1" stop-color="#9f80dc"/></radialGradient>' +
    '<radialGradient id="sj-nucl" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#a77be6"/><stop offset=".6" stop-color="#6a3fb5"/><stop offset="1" stop-color="#47237f"/></radialGradient>' +
    '<radialGradient id="sj-mito" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffc49e"/><stop offset="1" stop-color="#f0895a"/></radialGradient>' +
    '<radialGradient id="sj-lys" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#cdeb8f"/><stop offset=".6" stop-color="#8cc04a"/><stop offset="1" stop-color="#5d8f27"/></radialGradient>' +
    '<radialGradient id="sj-ves" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff0b8"/><stop offset=".6" stop-color="#f5c85a"/><stop offset="1" stop-color="#c8951f"/></radialGradient>' +
    '</defs>';

  var backdrop = defs +
    '<text class="lbl" x="14" y="26" font-size="17">Állati sejt – metszet</text>' +
    '<text class="lbl-muted" x="14" y="44">sematikus rajz, nem méretarányos</text>' +
    '<text class="lbl-muted" x="14" y="452" font-size="11">egy emberi sejt átmérője kb. 10–30 µm (0,01–0,03 mm)</text>';

  /* 1. Sejthártya: foszfolipid kettős réteg fehérjékkel */
  var mem = '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + (RX - 5) + '" ry="' + (RY - 5) + '" fill="none" stroke="transparent" stroke-width="16"/>' +
    '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + (RX - 5) + '" ry="' + (RY - 5) + '" fill="none" stroke="#f0d48e" stroke-width="9" opacity=".9"/>';
  var nH = 170, k, t, p;
  for (k = 0; k < nH; k++) {
    t = k / nH * 2 * Math.PI;
    p = E(CX, CY, RX - 0.5, RY - 0.5, t);
    mem += circ(p[0], p[1], 2.6, '#d6578e', ' stroke="#8f2a5a" stroke-width=".5"');
    p = E(CX, CY, RX - 9.5, RY - 9.5, t + Math.PI / nH);
    mem += circ(p[0], p[1], 2.6, '#d6578e', ' stroke="#8f2a5a" stroke-width=".5"');
  }
  [0.75, 1.9, 2.75, 3.6, 4.55, 5.5].forEach(function (tt, i) {
    var q = E(CX, CY, RX - 5, RY - 5, tt), rot = Math.atan2(RX * Math.sin(tt), RY * Math.cos(tt)) * 180 / Math.PI;
    mem += '<g transform="translate(' + f(q[0]) + ' ' + f(q[1]) + ') rotate(' + f(rot) + ')">' +
      '<ellipse rx="11" ry="6.5" fill="#7d62c7" stroke="#4b3390" stroke-width="1"/>' +
      (i % 2 ? '<rect x="-11" y="-1.3" width="22" height="2.6" fill="#c9bdf0"/>' :
        '<path d="M11 0 l7 0 m-3 0 l4 -4 m-4 4 l4 4" stroke="#3f9f6a" stroke-width="1.6" fill="none" stroke-linecap="round"/>') + '</g>';
  });

  /* 2. Sejtplazma (citoszol) */
  var cyto = '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + (RX - 12) + '" ry="' + (RY - 12) + '" fill="url(#sj-cyto)"/>' +
    '<text class="lbl-muted" x="170" y="254" text-anchor="middle" font-size="11" font-style="italic"' + NS + '>citoszol</text>';

  /* 3. Sejtmag: kettős maghártya magpórusokkal */
  var nuc = '<ellipse cx="' + N.x + '" cy="' + N.y + '" rx="' + N.rx + '" ry="' + N.ry + '" fill="url(#sj-nuc)" stroke="#5c3c9e" stroke-width="2.4"/>' +
    '<ellipse cx="' + N.x + '" cy="' + N.y + '" rx="' + (N.rx - 6) + '" ry="' + (N.ry - 6) + '" fill="none" stroke="#7a59c0" stroke-width="1.6"/>';
  for (k = 0; k < 16; k++) {
    t = k / 16 * 2 * Math.PI + 0.1;
    p = E(N.x, N.y, N.rx - 3, N.ry - 3, t);
    var rp = Math.atan2(N.rx * Math.sin(t), N.ry * Math.cos(t)) * 180 / Math.PI;
    nuc += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + f(rp) + ')"><rect x="-5" y="-3.2" width="10" height="6.4" rx="1.5" fill="#d9caf6"/>' +
      '<path d="M-5 -3.2 h10 M-5 3.2 h10" stroke="#4a2c86" stroke-width="1.6"/></g>';
  }

  /* 4. Kromatin (DNS + hisztonfehérjék) */
  var NL = [N.x + 16, N.y - 16, 21];   // a sejtmagvacska helye
  var chrom = '';
  for (var c = 0; c < 9; c++) {
    var a0 = rnd(c) * 6.283, rr = 0.25 + rnd(c + 30) * 0.5;
    var x = N.x + Math.cos(a0) * (N.rx - 12) * rr, y = N.y + Math.sin(a0) * (N.ry - 12) * rr;
    var dir = rnd(c + 60) * 6.283, pts = [[x, y]];
    for (var s = 0; s < 16; s++) {
      dir += (rnd(c * 31 + s) - 0.5) * 1.9;
      var nx = x + Math.cos(dir) * 8, ny = y + Math.sin(dir) * 8;
      var inN = Math.pow((nx - N.x) / (N.rx - 13), 2) + Math.pow((ny - N.y) / (N.ry - 13), 2) < 1;
      var inNl = Math.pow(nx - NL[0], 2) + Math.pow(ny - NL[1], 2) < Math.pow(NL[2] + 6, 2);
      if (!inN || inNl) { dir += 2.4; continue; }
      x = nx; y = ny; pts.push([x, y]);
    }
    if (pts.length > 2) chrom += '<path d="' + smooth(pts) + '" fill="none" stroke="#5a2f9e" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>';
  }
  [[-0.4, 9], [1.3, 8], [2.4, 10], [3.6, 7], [4.6, 9], [5.6, 8]].forEach(function (h) {   // heterokromatin a maghártya mentén
    var q = E(N.x, N.y, N.rx - 14, N.ry - 14, h[0]);
    chrom += '<ellipse cx="' + f(q[0]) + '" cy="' + f(q[1]) + '" rx="' + h[1] + '" ry="' + (h[1] * 0.55) + '" transform="rotate(' + f(h[0] * 57.3 + 90) + ' ' + f(q[0]) + ' ' + f(q[1]) + ')" fill="#5a2f9e" opacity=".55"/>';
  });

  /* 5. Sejtmagvacska */
  var nucl = circ(NL[0], NL[1], NL[2], 'url(#sj-nucl)', ' stroke="#3a1c6c" stroke-width="1.2"');
  for (k = 0; k < 14; k++) {
    var aa = k * 2.39996, rq = 4 + 12 * Math.sqrt(k / 14);
    nucl += circ(NL[0] + rq * Math.cos(aa), NL[1] + rq * Math.sin(aa), 1.6, 'rgba(255,255,255,.35)');
  }

  /* 6. Durva ER és 8. riboszómák */
  var rer = '', ribo = '';
  for (k = 0; k < 4; k++) {
    var d = 15 + k * 13, t0 = -1.95 + k * 0.08, t1 = 0.42 - k * 0.06, pts2 = [];
    for (t = t0; t <= t1 + 1e-6; t += 0.08) {
      var w = Math.sin(t * 9 + k) * 2.2;
      pts2.push(E(N.x, N.y, N.rx + d + w, N.ry + d + w, t));
    }
    rer += tube(smooth(pts2), '#4a78c8', '#bcd3f5', 8);
    for (t = t0 + 0.04; t <= t1; t += 0.085) {
      var w2 = Math.sin(t * 9 + k) * 2.2;
      p = E(N.x, N.y, N.rx + d + w2 + 6.5, N.ry + d + w2 + 6.5, t);
      ribo += circ(p[0], p[1], 2.1, '#34408f', ' stroke="rgba(255,255,255,.8)" stroke-width=".6"');
    }
  }

  /* 7. Sima ER: elágazó csőhálózat */
  var ser = '';
  [[[318, 338], [338, 326], [360, 334], [382, 322], [404, 332], [428, 322]],
    [[330, 362], [352, 352], [372, 362], [396, 352], [418, 360]],
    [[360, 334], [366, 348], [372, 362]], [[404, 332], [398, 344], [396, 352]], [[382, 322], [390, 306], [410, 298]]
  ].forEach(function (pp) { ser += tube(smooth(pp), '#2f9a82', '#a6e6d4', 7); });

  /* 9. Golgi-készülék: egymásra rétegzett, ívelt ciszternák */
  var golgi = '', G = [440, 214];
  for (k = 0; k < 5; k++) {
    var gr = 56 + k * 11, span = 0.66 - k * 0.07, gp = [];
    for (t = -span; t <= span + 1e-6; t += span / 8) gp.push([G[0] + gr * Math.cos(t), G[1] + gr * Math.sin(t) * 1.05]);
    golgi += tube(smooth(gp), '#cf7a1f', '#f8d293', 8.5);
    golgi += circ(gp[0][0], gp[0][1], 4.8, '#e8962f', ' stroke="#a75d12" stroke-width="1"') +
      circ(gp[gp.length - 1][0], gp[gp.length - 1][1], 4.8, '#e8962f', ' stroke="#a75d12" stroke-width="1"');
  }

  /* 10. Mitokondriumok: kettős membrán, belső redők (kriszták) */
  function mito(cx, cy, len, wid, rot) {
    var hl = len / 2, hw = wid / 2, s = '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + rot + ')">' +
      '<rect x="' + (-hl) + '" y="' + (-hw) + '" width="' + len + '" height="' + wid + '" rx="' + hw + '" fill="url(#sj-mito)" stroke="#a9471f" stroke-width="2"/>' +
      '<rect x="' + (-hl + 4) + '" y="' + (-hw + 4) + '" width="' + (len - 8) + '" height="' + (wid - 8) + '" rx="' + (hw - 4) + '" fill="#f7a77c" stroke="#c45a2c" stroke-width="1.3"/>';
    var dd = 'M' + (-hl + hw * 0.7) + ' 0';
    for (var xx = -hl + hw * 0.7, i = 0; xx < hl - hw * 0.7; xx += 8, i++) {
      var yy = (i % 2 ? 1 : -1) * (hw - 4);
      dd += ' L' + f(xx + 2) + ' ' + f(yy) + ' L' + f(xx + 6) + ' ' + f(yy) + ' L' + f(xx + 8) + ' 0';
    }
    return s + '<path d="' + dd + '" fill="none" stroke="#a9471f" stroke-width="1.4" stroke-linejoin="round"/></g>';
  }
  var mitos = mito(132, 176, 78, 34, -32) + mito(150, 304, 72, 32, 24) + mito(252, 368, 76, 30, -6);

  /* 11. Lizoszómák */
  function lyso(x, y, r) {
    var s = circ(x, y, r, 'url(#sj-lys)', ' stroke="#4b7a1d" stroke-width="1.5"');
    for (var i = 0; i < 6; i++) s += circ(x + Math.cos(i * 2.4) * r * 0.5, y + Math.sin(i * 2.4) * r * 0.5, 1.8, '#3f6a14');
    return s;
  }
  var lys = lyso(96, 244, 14) + lyso(196, 96, 12) + lyso(540, 322, 11);

  /* 12. Vezikulák: ER → Golgi szállítóhólyagok, kiválasztó hólyagok, exocitózis */
  function ves(x, y, r) {
    return circ(x, y, r, 'url(#sj-ves)', ' stroke="#a8781a" stroke-width="1.2"') + circ(x - r * 0.2, y + r * 0.15, r * 0.3, '#c46b18', ' opacity=".7"');
  }
  var exo = E(CX, CY, RX - 5, RY - 5, 0.22);
  var vesic = ves(458, 160, 6) + ves(464, 268, 6) + ves(452, 288, 5) + ves(560, 178, 8) + ves(566, 236, 8) + ves(548, 284, 7) +
    '<path d="M' + f(exo[0] - 12) + ' ' + f(exo[1] - 9) + ' a 12 12 0 1 0 6 21" fill="url(#sj-ves)" stroke="#a8781a" stroke-width="1.3"/>' +
    circ(exo[0] + 7, exo[1] - 2, 2.2, '#c46b18') + circ(exo[0] + 13, exo[1] + 5, 2, '#c46b18') + circ(exo[0] + 9, exo[1] + 11, 1.8, '#c46b18');

  /* 13. Sejtváz (mikrotubulusok, aktin-kéreg) és sejtközpont (centriólumok) */
  var CS = [452, 300];
  var skel = '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + (RX - 17) + '" ry="' + (RY - 17) + '" fill="none" stroke="#d0508a" stroke-width="1.3" stroke-dasharray="3 3" opacity=".75"/>';
  for (k = 0; k < 15; k++) {
    var ta = k / 15 * 2 * Math.PI + 0.3, end = E(CX, CY, RX - 20, RY - 20, ta);
    var mx = (CS[0] + end[0]) / 2 + Math.sin(k * 1.7) * 18, my = (CS[1] + end[1]) / 2 + Math.cos(k * 1.3) * 18;
    skel += '<path d="M' + CS[0] + ' ' + CS[1] + ' Q' + f(mx) + ' ' + f(my) + ' ' + f(end[0]) + ' ' + f(end[1]) + '" fill="none" stroke="#4f7fe0" stroke-width="1.4" opacity=".65"/>';
  }
  skel += circ(CS[0], CS[1], 17, 'rgba(79,127,224,.22)', ' stroke="#4f7fe0" stroke-width="1" stroke-dasharray="2 2"') +
    '<g transform="translate(' + CS[0] + ' ' + CS[1] + ')">' +
    '<rect x="-14" y="-4" width="16" height="8" rx="2" fill="#7aa3f0" stroke="#284e9c" stroke-width="1.2"/>' +
    '<path d="M-11 -4 v8 M-7 -4 v8 M-3 -4 v8" stroke="#284e9c" stroke-width="1"/>' +
    '<rect x="2" y="-10" width="8" height="16" rx="2" fill="#7aa3f0" stroke="#284e9c" stroke-width="1.2"/>' +
    '<path d="M2 -6 h8 M2 -2 h8 M2 2 h8" stroke="#284e9c" stroke-width="1"/></g>';

  /* Szabad riboszómák a citoszolban (ahol nincs sejtalkotó) */
  var obst = [[N.x, N.y, 125], [440, 214, 112], [132, 176, 42], [150, 304, 40], [252, 368, 40], [372, 345, 60],
    [96, 244, 18], [196, 96, 16], [540, 322, 16], [CS[0], CS[1], 22], [560, 200, 20]];
  var placed = 0;
  for (k = 0; k < 600 && placed < 46; k++) {
    var ra = Math.sqrt(rnd(k * 7 + 1)) * 0.9, ta2 = rnd(k * 7 + 2) * 6.283;
    var px = CX + Math.cos(ta2) * (RX - 26) * ra, py = CY + Math.sin(ta2) * (RY - 26) * ra;
    if (obst.some(function (o) { return Math.pow(px - o[0], 2) + Math.pow(py - o[1], 2) < o[2] * o[2]; })) continue;
    ribo += circ(px, py, 2.1, '#34408f', ' stroke="rgba(255,255,255,.8)" stroke-width=".6"');
    if (placed % 3 === 0) ribo += circ(px + 4.5, py + 1.5, 2.1, '#34408f', ' stroke="rgba(255,255,255,.8)" stroke-width=".6"') +
      circ(px + 8.5, py + 4.5, 2.1, '#34408f', ' stroke="rgba(255,255,255,.8)" stroke-width=".6"');
    placed++;
  }

  STUDIE.addModel({
    id: 'sejt',
    title: 'Az állati (emberi) sejt',
    icon: '🦠',
    color: '#c2417a',
    category: 'Biológia',
    keywords: 'sejt sejtalkotó organellum sejthártya membrán foszfolipid citoplazma sejtplazma citoszol sejtmag maghártya magpórus sejtmagvacska kromatin DNS kromoszóma endoplazmatikus retikulum riboszóma Golgi mitokondrium lizoszóma vezikula sejtváz mikrotubulus centriólum fehérjeszintézis transzkripció transzláció exocitózis Hooke Schwann Virchow endoszimbiózis',
    summary: 'Az élet legkisebb egysége: hártyával körülvett, apró „gyár”, amelyben minden sejtalkotónak megvan a maga feladata.',
    scale: 'kb. 10–30 µm (egy hajszál vastagságának kb. negyede–tizede)',
    viewBox: '0 0 660 462',
    backdrop: backdrop,
    intro: 'A tested kb. **37 ezer milliárd** sejtből áll. Mindegyik egy apró, hártyával határolt **gyár**: van „igazgatósága” (**sejtmag**), „erőműve” (**mitokondrium**), „gyártósora” (**riboszóma** és **endoplazmatikus retikulum**), „csomagolóüzeme” (**Golgi-készülék**), „hulladékfeldolgozója” (**lizoszóma**) és „váza” (**sejtváz**). A rajz egy általános állati sejt metszete: valódi sejtjeink alakja és sejtalkotóinak aránya a feladatuktól függően nagyon eltérő.\n\nLent lépésről lépésre követheted, hogyan **készül egy fehérje** a sejtben. A **Szétszedés** gombbal széthúzhatod a sejtalkotókat.',
    parts: [
      {
        id: 'hartya', terms: ['anatomia/membranpotencial'], z: 2, name: 'Sejthártya', svg: mem, explode: [0, 0], badge: E(CX, CY, RX - 5, RY - 5, 1.05), en: 'plasma membrane (cell membrane)',
        what: 'A sejtet körülvevő, kb. **7–10 nm** vékony hártya. Elválasztja a sejt belsejét a környezetétől, és **válogat**: egyes anyagokat átenged, másokat nem (ez a **féligáteresztő** képesség). A benne ülő fehérjék csatornaként, szállítóként, „antennaként” (receptorként) és azonosító „névtáblaként” működnek.',
        madeOf: '**Foszfolipid kettős rétegből**: a molekulák vízkedvelő „feje” (a rajzon rózsaszín pöttyök) kifelé, a víztaszító „farka” (sárga sáv) befelé néz. Ebbe **fehérjék** (lila) ágyazódnak, a külső oldalukhoz gyakran **cukorláncok** kapcsolódnak (zöld ágacskák). A rétegek közé **koleszterin** ékelődik, ez szabályozza a hártya rugalmasságát.',
        how: 'A foszfolipidek vízben **maguktól** rendeződnek kettős réteggé, mert így a víztaszító farkak védve vannak a víztől. A hártya új anyagai a **sima ER-ben** készülnek, és vezikulákkal jutnak a felszínre: amikor egy hólyag beleolvad a hártyába, a saját membránja is a sejthártya része lesz. A hártya **folyékony**: a molekulák oldalirányban folyamatosan mozognak benne (folyékony mozaik modell).',
        uni: 'A **folyékony mozaik modell** (Singer–Nicolson, 1972) szerint a lipidek és a fehérjék laterálisan diffundálnak (D ≈ 1 µm²/s lipidekre), de a két réteg közti átfordulás (flip-flop) lassú, enzimek (flippázok, floppázok, szkrambalázok) végzik: ezért **aszimmetrikus** a membrán (pl. foszfatidil-szerin a belső oldalon; ha kifelé kerül, az az apoptózis jele). A membránon át **nyugalmi potenciál** alakul ki (kb. −70 mV), amelyet a **Na⁺/K⁺-ATPáz** (3 Na⁺ ki, 2 K⁺ be ATP-nként) és a K⁺-szivárgócsatornák tartanak fenn; értéke jó közelítéssel a **Goldman–Hodgkin–Katz-egyenletből** számolható. A koleszterinben és szfingolipidekben gazdag **lipidtutajok** jelátviteli platformként szolgálnak.',
        fact: 'Ha egy sejthártyát olyan vastagra nagyítanánk, mint egy papírlap, maga a sejt kb. egy focilabda méretű lenne.'
      },
      {
        id: 'plazma', z: 0, name: 'Sejtplazma (citoplazma)', svg: cyto, explode: [0, 0], badge: [170, 222], en: 'cytoplasm, cytosol',
        what: 'A sejthártyán belüli teljes tér a sejtmag kivételével. Folyékony része a **citoszol**, ebben „úsznak” a sejtalkotók. Itt zajlik a sejt anyagcsere-folyamatainak jó része, például a szőlőcukor lebontásának első lépése (**glikolízis**) és sok fehérje elkészítése.',
        madeOf: 'Kb. **70–80% víz**, benne oldott **ionok** (K⁺, Na⁺, Cl⁻, Ca²⁺), **tápanyagok** (szőlőcukor, aminosavak), több ezer féle **enzim** és más fehérje. Olyan sűrűn van benne fehérje, hogy inkább kocsonyás, mint vizes.',
        how: 'A citoszol folyamatosan megújul: a sejt a sejthártyán keresztül veszi fel a vizet és a tápanyagokat, a saját fehérjéit a szabad riboszómákon gyártja, a régieket pedig lebontja (pl. a **proteaszóma** nevű fehérjebontó „darálóval”). Sejtosztódáskor a citoplazma kettéfűződik, és a két utódsejt osztozik rajta.',
        uni: 'A citoszol **makromolekuláris zsúfoltsága** (macromolecular crowding: 200–300 g/l fehérje) jelentősen eltolja a kötési egyensúlyokat és lassítja a diffúziót. Ionösszetétele erősen eltér az extracelluláristól: [K⁺]ᵢ ≈ 140 mM, [Na⁺]ᵢ ≈ 10–15 mM, a szabad [Ca²⁺]ᵢ csak kb. 100 nM (kívül 1–2 mM): ez a 10 000-szeres gradiens teszi a Ca²⁺-ot univerzális **másodlagos hírvivővé**. Újabban felismert szerveződési elv a **folyadék–folyadék fázisszétválás**: membrán nélküli kondenzátumok (pl. stresszgranulumok) képződnek.',
        fact: 'A citoplazma nem áll: a sejtváz motorfehérjéi folyamatosan „kevergetik”, a sejtalkotók másodpercenként mikrométereket tehetnek meg.'
      },
      {
        id: 'mag', z: 3, name: 'Sejtmag (maghártyával)', svg: nuc, explode: [-38, 12], badge: [N.x - 52, N.y + 50], en: 'nucleus, nuclear envelope, nuclear pore',
        what: 'A sejt **irányítóközpontja**: itt tárolódik az örökítőanyag, a **DNS**, és itt íródnak át a gének mRNS-re. A sejtmagot **kettős maghártya** veszi körül, amelyen **magpórusok** (a rajzon a hártya „kapui”) vannak: ezeken át lépnek ki az mRNS-ek és a riboszóma-alegységek, és ezeken jutnak be a magba szükséges fehérjék.',
        madeOf: 'Két foszfolipid membránból (a külső a durva ER folytatása), a pórusokat óriási, kb. 30 féle fehérjéből álló **pórus-komplexek** alkotják. Belül a **magplazmában** van a kromatin és a sejtmagvacska; a belső hártyát a **lamina** nevű fehérjeháló erősíti.',
        how: 'A maghártya sejtosztódáskor **szétesik** apró hólyagokra, hogy a kromoszómák szétválhassanak, majd az osztódás végén az utódsejtekben a kromoszómák köré **újra összeáll**. A legtöbb sejtünknek egy magja van, de a vörösvérsejtek érésük során elveszítik, a vázizomrostokban viszont több száz is lehet.',
        uni: 'A magpórus-komplex (NPC, kb. 110 MDa, nyolcszoros szimmetria) belsejét **FG-ismétlődéses nukleoporinok** rendezetlen hálója tölti ki: a kb. 40 kDa-nál kisebb molekulák szabadon diffundálnak, a nagyobbak csak **importinokhoz/exportinokhoz** kötve jutnak át (NLS/NES szignálszekvenciák). Az irányt a **Ran-GTP gradiens** adja: a magban sok a Ran-GTP (RCC1 GEF), a citoplazmában a RanGAP hidrolizál. A lamina (A/C és B laminok) mutációi okozzák a **laminopátiákat**, pl. a korai öregedéssel járó progériát.',
        fact: 'Egy átlagos emberi sejt magja kb. 6 µm átmérőjű, mégis belefér közel **2 méternyi** DNS.'
      },
      {
        id: 'kromatin', z: 4, name: 'Kromatin (DNS)', svg: chrom, explode: [-38, 12], badge: [N.x - 30, N.y + 18], en: 'chromatin (DNA + histones)',
        what: 'A sejtmagban lévő **DNS** és a hozzá kötődő fehérjék együttese. A DNS-ben vannak a **gének**: ezek a fehérjék „receptjei”. Az emberi sejtben 46 DNS-molekula (**kromoszóma**) van, kb. **20 000 fehérjét kódoló** génnel. A lazább részek (eukromatin) aktívak, a sűrűbbek (heterokromatin, a hártya mentén sötét foltok) többnyire „kikapcsoltak”.',
        madeOf: 'A **DNS** két, egymás köré tekeredő szálból áll (kettős spirál). Ezek **nukleotidokból** épülnek fel, négyféle bázissal: A, T, G, C; a párok mindig A–T és G–C. A DNS **hiszton** fehérjék köré tekeredik, mint cérna az orsóra: így alakulnak ki a **nukleoszómák** (a „gyöngysor”).',
        how: 'Sejtosztódás előtt a DNS **megkettőződik** (replikáció): a két szál szétválik, és mindegyik mellé egy új, kiegészítő szál épül. Osztódáskor a kromatin erősen feltekeredik, ekkor látszanak mikroszkóppal a jellegzetes X alakú **kromoszómák**. Az osztódások között ismét kitekeredik, hogy a gének leolvashatók legyenek.',
        uni: 'Kromatin-szerveződés: 147 bp DNS × 1,65 fordulat a **hiszton-oktamer** (H2A, H2B, H3, H4 ×2) körül = nukleoszóma; a H1 linker hiszton tömörít tovább. A génaktivitást **epigenetikai** jelek szabályozzák: hisztonacetiláció (HAT/HDAC – lazít), H3K9me3/H3K27me3 (csendesít), CpG-metiláció (DNMT). A térbeli szerveződést **TAD-ok** (topologically associating domains) és kohezin-hurokképzés (loop extrusion, CTCF-határoló) írja le. A replikáció szemikonzervatív (Meselson–Stahl, 1958), az eukarióta kromoszómák végeit a **telomeráz** tartja karban.',
        fact: 'Ha egy sejtmag összes DNS-ét kinyújtanánk, kb. 2 m hosszú lenne; a tested összes sejtjének DNS-e pedig többször megjárná a Föld–Nap távolságot oda-vissza.'
      },
      {
        id: 'magvacska', z: 5, name: 'Sejtmagvacska', svg: nucl, explode: [-38, 12], en: 'nucleolus',
        what: 'Sötétebb, sűrű terület a sejtmagban, **nincs saját hártyája**. Ez a **riboszómák „gyára”**: itt készül a riboszómák RNS-e (rRNS), és itt állnak össze a riboszóma-alegységek. Az erősen fehérjetermelő sejtekben (pl. mirigysejtekben) nagy, és akár több is lehet.',
        madeOf: 'A riboszómális RNS génjeit hordozó **DNS-szakaszokból**, frissen átírt **rRNS-ből** és sok **fehérjéből**, köztük a citoplazmából behozott riboszómafehérjékből.',
        how: 'Akkor alakul ki, amikor az rRNS-gének átírása beindul: a sok átíródó RNS és a hozzá kötődő fehérjék egy sűrű „csomót” hoznak létre. Osztódáskor **eltűnik**, majd az utódsejtekben az rRNS-gének körül újra kialakul. A kész alegységek a magpórusokon át jutnak ki a citoplazmába.',
        uni: 'Három szubkompartmentje a fibrilláris centrum (FC, rDNS), a sűrű fibrilláris komponens (DFC, a pre-rRNS átírása az **RNS-polimeráz I**-gyel, processzálás snoRNP-kkel) és a granuláris komponens (GC, alegység-összeszerelés). A 47S pre-rRNS-ből 18S, 5,8S és 28S rRNS hasad ki; az 5S rRNS-t az RNS-polimeráz III írja át a sejtmagvacskán kívül. Ma a nucleolust **folyadék–folyadék fázisszétválással** létrejövő, membrán nélküli kondenzátumként értelmezik.',
        fact: 'Egy gyorsan növekvő emlőssejt percenként több ezer riboszóma-alegységet készít.'
      },
      {
        id: 'der', z: 3, name: 'Durva endoplazmatikus retikulum', svg: rer, explode: [20, -44], en: 'rough endoplasmic reticulum (RER)',
        what: 'Lapos, egymásra rétegzett hártyazsákok (**ciszternák**) rendszere a sejtmag körül. Azért „durva”, mert a külső felszínét **riboszómák** borítják (a rajzon sötét pöttyök). Itt készülnek azok a fehérjék, amelyek a **sejthártyába** kerülnek, a sejtből **kiválasztódnak** (pl. emésztőenzimek, hormonok, ellenanyagok), vagy a lizoszómákba jutnak.',
        madeOf: 'Egyetlen foszfolipid membránból, amely egy összefüggő belső teret (**lument**) zár körül. A membrán közvetlenül folytatódik a **külső maghártyába**. A lumenben a fehérjék feltekeredését segítő **dajkafehérjék** (chaperonok) vannak.',
        how: 'Az ER membránja folyamatosan nő: új foszfolipideket a saját membránjába épít be, és ezekből fűződnek le a vezikulák. Ha egy sejtnek több fehérjét kell termelnie (pl. az ellenanyagot gyártó plazmasejteknek), a durva ER többszörösére **megnövekszik**. A riboszómák nem végleg ülnek rajta: csak akkor kötődnek hozzá, ha éppen ER-be szánt fehérjét gyártanak.',
        uni: 'A szekréciós fehérjék N-terminális **szignálpeptidjét** a **SRP** (signal recognition particle) ismeri fel, a riboszómát az SRP-receptorhoz viszi, és a növekvő lánc a **Sec61 transzlokonon** át ko-transzlációsan jut a lumenbe; a szignálpeptidet a szignálpeptidáz lehasítja. A lumenben **N-glikoziláció** (Glc₃Man₉GlcNAc₂ az Asn-X-Ser/Thr motívumon, oligoszacharil-transzferáz), diszulfidhíd-képzés (PDI) és minőség-ellenőrzés (**kalnexin/kalretikulin ciklus**) történik. A hibásan feltekeredett fehérjék felhalmozódása az **UPR**-t (unfolded protein response: IRE1, PERK, ATF6) indítja el; a selejt az ERAD útvonalon a proteaszómába kerül.',
        fact: 'Egy hasnyálmirigy-sejtben a durva ER felülete többszöröse a sejthártyáénak.'
      },
      {
        id: 'ser', z: 3, name: 'Sima endoplazmatikus retikulum', svg: ser, explode: [18, 50], en: 'smooth endoplasmic reticulum (SER)',
        what: 'Elágazó **csövek** hálózata, amelynek felszínén **nincsenek riboszómák**. Itt készülnek a **lipidek**: a hártyák foszfolipidjei, a koleszterin és a szteroidhormonok (pl. nemi hormonok). A májsejtekben a sima ER **méregtelenít** (pl. gyógyszereket, alkoholt alakít át), az izomsejtekben pedig **kalciumot** tárol, amelynek felszabadulása az izom összehúzódását indítja.',
        madeOf: 'Ugyanolyan foszfolipid membránból, mint a durva ER, amellyel össze is függ. A membránjában a lipidgyártás és a méregtelenítés **enzimjei** ülnek.',
        how: 'A durva ER folytatásaként, annak membránjából alakul ki. Ha egy anyag (pl. egy gyógyszer) tartósan sok méregtelenítő munkát ad a májnak, a sima ER **megnagyobbodik** a májsejtekben: ezért kell egyes gyógyszerekből idővel nagyobb adag.',
        uni: 'A SER membránjában található a **citokróm P450** monooxigenáz-rendszer (I. fázisú biotranszformáció: hidroxiláció), és az UDP-glükuronil-transzferázok (II. fázis: konjugáció). Itt működik a koleszterinszintézis kulcsenzime, a **HMG-KoA-reduktáz** (a sztatinok célpontja), és a glükóz-6-foszfatáz (glükoneogenezis, glikogénbontás vége). Izomban a **szarkoplazmatikus retikulum** RyR1-csatornákon át ad le Ca²⁺-t (a DHP-receptorral mechanikusan kapcsolt elektromechanikai csatolás), visszavételét a **SERCA** pumpa végzi.',
        fact: 'A sima és a durva ER együtt alkothatja a sejt összes membránjának akár a felét.'
      },
      {
        id: 'riboszoma', z: 6, name: 'Riboszómák', svg: ribo, explode: [20, -44], badge: [196, 160], en: 'ribosomes (80S: 60S + 40S subunits)',
        what: 'Apró **fehérjegyártó gépek**: a sejtmagból érkező **mRNS** utasításai alapján aminosavakat fűznek össze fehérjévé. A szabadon lebegők (néha gyöngysorszerű csoportokban, **poliszómákban**) a citoszolban maradó fehérjéket készítik, az ER-hez kötöttek a kiválasztásra vagy hártyába szánt fehérjéket.',
        madeOf: 'Két alegységből (egy kisebből és egy nagyobból), amelyek **riboszómális RNS-ből** (rRNS) és kb. 80 féle **fehérjéből** állnak. Nincs hártyájuk. Egy riboszóma kb. 25–30 nm átmérőjű: a rajzon sokszorosan felnagyítva látszanak.',
        how: 'Alegységeik a **sejtmagvacskában** állnak össze, és külön-külön jutnak ki a magpórusokon. A citoplazmában csak akkor kapcsolódnak össze, amikor egy mRNS-hez kötődnek, és a fehérje elkészülte után ismét szétválnak. Egy sejtben **több millió** riboszóma lehet.',
        uni: 'Az eukarióta 80S riboszóma 40S (18S rRNS) és 60S (28S, 5,8S, 5S rRNS) alegységből áll. A peptidkötést a nagy alegység **peptidil-transzferáz centruma** katalizálja, amely **rRNS** (a riboszóma tehát ribozim). Három tRNS-kötőhely: **A** (aminoacil), **P** (peptidil), **E** (exit). Iniciáció: a 43S komplex a 5′-sapkánál köt, és az első AUG-ig pásztáz (Kozak-szekvencia); elongáció: eEF1A·GTP hozza az aminoacil-tRNS-t, eEF2 transzlokál; terminációkor az eRF1 ismeri fel a stopkodont. Sebesség eukariótákban kb. 5–6 aminosav/s.',
        fact: 'A riboszóma fehérjeépítő közepe **RNS-ből** van, nem fehérjéből: ez az egyik érv amellett, hogy az élet korai formáiban az RNS volt a „mindenes” molekula (RNS-világ hipotézis).'
      },
      {
        id: 'golgi', z: 3, name: 'Golgi-készülék', svg: golgi, explode: [54, -8], en: 'Golgi apparatus (cis/trans Golgi network)',
        what: 'Lapos, ívelt hártyazsákok kötege: a sejt **„posta- és csomagolóüzeme”**. Az ER-ből érkező fehérjéket és lipideket **átalakítja** (pl. cukorláncokat kapcsol rájuk), **szétválogatja** és „címkével” látja el, majd vezikulákba csomagolva elküldi őket a rendeltetési helyükre: a sejthártyához, a sejten kívülre vagy a lizoszómákba.',
        madeOf: '4–8 egymásra rétegzett, lapos membránzsákból (**ciszternából**). Van egy **fogadó (cis)** oldala, amely az ER felé néz, és egy **szállító (trans)** oldala, amely a sejthártya felé. A ciszternákban különböző módosító **enzimek** vannak.',
        how: 'A Golgi folyamatosan megújul: a cis oldalon az ER-ből érkező vezikulák összeolvadnak, és új ciszternát hoznak létre, amely fokozatosan „vándorol” a trans oldal felé, miközben az enzimjei változnak (**ciszterna-érés**), a trans oldalon pedig hólyagokra esik szét. Sejtosztódáskor apró darabokra bomlik, és az utódsejtekben újra összeáll.',
        uni: 'ER → Golgi szállítás **COPII**-burkos vezikulákkal (Sar1-GTP, Sec23/24), visszafelé **COPI**-gyel (KDEL-receptor hozza vissza az ER-rezidens fehérjéket). A Golgiban az N-glikánok átalakulnak (mannózlevágás, GlcNAc-, galaktóz-, sziálsav-hozzáadás), és itt történik az **O-glikoziláció**. A lizoszomális enzimek **mannóz-6-foszfát** jelet kapnak, ezt a trans-Golgi hálózat (TGN) M6P-receptorai ismerik fel, és **klatrin**-burkos vezikulákba válogatják. A vezikula célba juttatását **Rab** GTPázok és a **SNARE**-fehérjék (v-SNARE + t-SNARE) párosodása biztosítja.',
        fact: 'Camillo **Golgi** olasz orvos 1898-ban egy ezüstsós festéssel fedezte fel, de sokáig sokan festési hibának (műterméknek) tartották. Csak az elektronmikroszkóp igazolta, hogy tényleg létezik.'
      },
      {
        id: 'mito', z: 4, name: 'Mitokondriumok', svg: mitos, explode: [-56, 4], badge: [132, 176], en: 'mitochondria',
        what: 'A sejt **„erőművei”**: a tápanyagokból (pl. szőlőcukorból, zsírsavakból) oxigén felhasználásával **ATP**-t állítanak elő, ez a sejt „energiapénze”. Ez a **sejtlégzés**, melléktermékként szén-dioxid és víz keletkezik. Az energiaigényes sejtekben (szívizom, idegsejt, májsejt) több ezer mitokondrium is lehet.',
        madeOf: '**Kettős membránból**: a külső sima, a belső pedig **redőzött** (a redők neve **kriszta**), így nagy felületen férnek el rajta a légzési enzimek. A belső teret (**mátrix**) enzimek töltik ki, és van benne **saját DNS** és **saját riboszómák** is.',
        how: 'Mitokondrium nem keletkezhet a semmiből: a meglévők **kettéosztódással** szaporodnak (mint a baktériumok), és össze is olvadhatnak. A sérült darabokat a sejt lebontja. Egy **ősi baktérium** leszármazottai, amelyet sok százmillió éve egy másik sejt bekebelezett, de nem emésztett meg (**endoszimbiózis**). A mitokondriumainkat kizárólag **anyánktól** örököljük, a petesejtből.',
        uni: 'A citrátkör (mátrix) NADH-t és FADH₂-t termel; ezek elektronjai a belső membrán **légzési láncán** (I–IV. komplex, ubikinon, citokróm c) jutnak az O₂-ra, miközben az I., III. és IV. komplex protonokat pumpál a membránközi térbe. A létrejövő **protonmozgató erő** (Δp ≈ 180–200 mV, nagyrészt ΔΨ) hajtja az **ATP-szintázt** (F₀F₁, forgó motor: kb. 3 ATP egy 360°-os fordulatonként) – Mitchell **kemiozmotikus elmélete** (Nobel-díj 1978). Glükózonként kb. 30–32 ATP képződik. A mtDNS 16,5 kb, 37 gént kódol (13 fehérje, 22 tRNS, 2 rRNS); a mitokondrium a belső apoptózisút kulcsa is (citokróm c kiáramlás).',
        fact: 'Egy ember naponta nagyjából a **saját testtömegének megfelelő** mennyiségű ATP-t állít elő és használ el újra.'
      },
      {
        id: 'lizoszoma', z: 4, name: 'Lizoszómák', svg: lys, explode: [-40, 20], badge: [96, 244], en: 'lysosomes',
        what: 'Apró, gömb alakú hólyagok, a sejt **„emésztő- és újrahasznosító üzemei”**. Lebontják a sejtbe bekebelezett anyagokat és kórokozókat, valamint a sejt saját elöregedett, sérült alkotóit (ez az **autofágia**). A lebontásból származó építőköveket (aminosavakat, cukrokat) a sejt újra felhasználja.',
        madeOf: 'Egyetlen membránból, amely kb. **50 féle bontóenzimet** (pl. fehérje-, zsír-, nukleinsav-bontó enzimeket) zár magába. Belül **savas** a kémhatás (pH ≈ 4,5–5), és az enzimek csak ilyen savas közegben működnek jól: ha kiszabadulnak a semleges kémhatású citoszolba, alig ártanak.',
        how: 'Enzimjeik a **durva ER** riboszómáin készülnek, a **Golgi-készülékben** kapnak egy különleges „címkét”, ennek alapján a Golgi külön vezikulákba válogatja őket. Ezek a hólyagok összeolvadnak a bekebelezett anyagot tartalmazó hólyagokkal, és így alakul ki az érett lizoszóma. A savas kémhatást a membránjukban ülő **protonpumpák** hozzák létre.',
        uni: 'A lumen savasságát a **V-típusú H⁺-ATPáz** tartja fenn (Cl⁻-ellenionnal). A savas hidrolázok a mannóz-6-foszfát útvonalon érkeznek (GlcNAc-foszfotranszferáz a cis-Golgiban). Az autofágia (makroautofágia: kettős membránú autofagoszóma, **mTORC1**-gátlásra indul, ATG-fehérjék, LC3) mechanizmusának feltárásáért **Ószumi Josinori** kapott Nobel-díjat (2016). Egy-egy enzim genetikai hiánya **lizoszomális tárolási betegséget** okoz (pl. Tay–Sachs: hexózaminidáz A; Gaucher: glükocerebrozidáz; Pompe: savas α-glükozidáz).',
        fact: 'A fehérvérsejtek (falósejtek) lizoszómái semmisítik meg a bekebelezett baktériumokat.'
      },
      {
        id: 'vezikula', z: 5, name: 'Vezikulák (hólyagok)', svg: vesic, explode: [38, 26], badge: [566, 236], en: 'vesicles (transport, secretory), exocytosis',
        what: 'Apró, hártyával határolt **„szállítókapszulák”**. Anyagokat visznek a sejtalkotók között: az ER-ből a Golgiba, a Golgiból a sejthártyához. A sejthártyával összeolvadva kiürítik a tartalmukat a sejten kívülre (**exocitózis**, a rajzon jobbra, a hártyánál), a hártyából lefűződve pedig anyagot vesznek fel a sejtbe (**endocitózis**).',
        madeOf: 'Egyetlen foszfolipid membránból, benne a szállított anyaggal: például **hormonnal** (inzulin), **emésztőenzimmel**, **ingerületátvivő anyaggal** (az idegsejtekben), vagy a sejthártyába szánt fehérjékkel.',
        how: 'Egy membrán (pl. az ER vagy a Golgi hártyája) kis része **kidudorodik és lefűződik**, ebben burokfehérjék segítenek, amelyek „kosárként” fogják közre a hólyagot. A vezikula a **sejtváz** mikrotubulusain, motorfehérjék segítségével halad a célja felé. Ott a hártyák speciális fehérjéi „cipzárként” összekapcsolódnak, és a két membrán **összeolvad**.',
        uni: 'A membránfúziót a **SNARE-komplex** hajtja: a vezikula v-SNARE-je (pl. szinaptobrevin) és a célmembrán t-SNARE-jei (szintaxin, SNAP-25) négyhélixes köteggé „cipzározódnak”, az energia a két lipidréteget összepréseli. Szétszerelésüket az NSF ATPáz és az α-SNAP végzi. Szabályozott exocitózisnál (pl. szinapszis) a Ca²⁺-szenzor **szinaptotagmin** indítja a fúziót, kevesebb mint 1 ms alatt. A tetanusz- és a botulinumtoxin a SNARE-fehérjéket hasító proteáz. A SNARE-ok és a vezikulaszállítás feltárásáért 2013-ban Rothman, Schekman és Südhof Nobel-díjat kapott.',
        fact: 'Egyetlen idegvégződés másodpercenként akár több száz vezikulát is kiüríthet, mindegyikben néhány ezer ingerületátvivő molekulával.'
      },
      {
        id: 'sejtvaz', z: 1, name: 'Sejtváz és centriólumok', svg: skel, explode: [0, 0], badge: [CS[0] + 2, CS[1] + 30], en: 'cytoskeleton (microtubules, actin filaments), centrosome, centrioles',
        what: 'Fehérjeszálakból álló belső **„csontváz és sínhálózat”**. Formát ad a sejtnek, rögzíti a sejtalkotókat, ezen „sínen” szállítják a vezikulákat, és ez teszi lehetővé a sejt mozgását és osztódását. A **mikrotubulusok** (kék vonalak) a mag melletti **sejtközpontból** indulnak ki, amelynek közepén két, egymásra merőleges **centriólum** ül. A hártya alatt az **aktinszálak** hálója (szaggatott vonal) erősíti a sejt felszínét.',
        madeOf: 'Háromféle fehérjeszálból: **mikrotubulusok** (tubulin fehérjéből álló üreges csövek, kb. 25 nm), **aktin mikrofilamentumok** (vékony, kb. 7 nm-es szálak) és **intermedier filamentumok** (kötélszerű, szakítószilárd szálak, pl. keratin). A centriólumok 9 × 3 mikrotubulusból álló kis hengerek.',
        how: 'A szálak **folyamatosan épülnek és bomlanak**: a fehérje-alegységek az egyik végükön hozzákapcsolódnak, a másikon leválnak, így a sejtváz percek alatt átrendeződhet. Sejtosztódáskor a centriólumok megkettőződnek, a két sejtközpont a sejt két pólusára vándorol, és a köztük kialakuló **magorsó** mikrotubulusai húzzák szét a kromoszómákat.',
        uni: 'A mikrotubulus α/β-tubulin heterodimerekből álló, 13 protofilamentumos polarizált cső; a + végen a **GTP-sapka** elvesztése „katasztrófát” (gyors szétesést) okoz: ez a **dinamikus instabilitás**. A motorfehérjék közül a **kinezin** jellemzően a + vég (sejtperiféria), a **dynein** a − vég (centroszóma) felé lépked, ATP-hidrolízissel, kinezinnél 8 nm-es lépésekben. Az aktin ATP-kötő G-aktinból polimerizál (taposómalom-mechanizmus), a miozin II-vel együtt kontraktilis gyűrűt (citokinézis) és stresszrostokat alkot. A **kolhicin** és a **taxol** a mikrotubulusok dinamikáját zavarva gátolja az osztódást (daganatterápia).',
        fact: 'A csillók és az ondósejt ostora is mikrotubulusokból épül fel, ugyanabban a „9 + 2”-es elrendezésben.'
      }
    ],
    steps: [
      { icon: '📡', title: 'Jel érkezik: egy gén bekapcsol', text: 'Tegyük fel, hogy a hasnyálmirigy egyik sejtjének **inzulint** kell termelnie. A sejthártya receptorai jelet kapnak (pl. emelkedett vércukorszint), a jel eljut a sejtmagba, és ott a **kromatin** a megfelelő gén körül **fellazul**, hogy a gén leolvasható legyen.', parts: ['hartya', 'kromatin'] },
      { icon: '📝', title: 'Átírás (transzkripció)', when: 'a sejtmagban', text: 'Az **RNS-polimeráz** enzim szétnyitja a DNS kettős spirálját a gén szakaszán, és az egyik szálról **másolatot** készít: egy **mRNS** (hírvivő RNS) molekulát. A DNS a magban marad, csak a „receptről” készült másolat indul útnak. Az mRNS-ről még a magban kivágják a nem kódoló szakaszokat (intronokat).', parts: ['kromatin', 'mag'] },
      { icon: '🚪', title: 'Ki a sejtmagból', text: 'Az érett mRNS a **magpórusokon** keresztül kijut a citoplazmába. Ugyanezen az úton érkeznek a **sejtmagvacskában** összeállított **riboszóma-alegységek** is.', parts: ['mag', 'magvacska'] },
      { icon: '🧬', title: 'Fordítás (transzláció) a riboszómán', text: 'A riboszóma ráül az mRNS-re, és hármasával (**kodononként**) „olvassa” a bázisokat. Minden kodonhoz a **tRNS** molekulák a megfelelő **aminosavat** hozzák, a riboszóma pedig láncba fűzi őket. Az inzulin előalakjának elején egy „irányítószám” (szignálszakasz) van: ez jelzi, hogy a fehérjét a sejtből ki kell majd juttatni.', parts: ['riboszoma', 'plazma'] },
      { icon: '🏭', title: 'Be a durva ER-be', text: 'A szignálszakasz miatt a riboszóma a **durva ER** hártyájához kötődik, és a készülő fehérjeláncot egyenesen az ER belsejébe „fűzi”. Itt a lánc **feltekeredik**, kénhidak kapcsolják össze a részeit, a dajkafehérjék pedig ellenőrzik, hogy jó-e az alakja. A hibás fehérjéket a sejt lebontja.', parts: ['der', 'riboszoma'] },
      { icon: '🚚', title: 'Szállítás vezikulával a Golgiba', text: 'Az ER hártyájáról **lefűződő vezikulák** viszik a kész fehérjéket a **Golgi-készülék** fogadó (cis) oldalára, ahol a hólyagok beleolvadnak a ciszternákba.', parts: ['vezikula', 'golgi', 'der'] },
      { icon: '🏷️', title: 'Módosítás és válogatás a Golgiban', text: 'A fehérje ciszternáról ciszternára halad, közben **tovább alakítják** (pl. cukorláncokat módosítanak rajta; az inzulin előalakja itt és a kiválasztó hólyagban kerül „végső formájába”). A trans oldalon a fehérjéket **címke szerint szétválogatják**: a lizoszómába szánt enzimek másik „postazsákba” kerülnek, mint a kiválasztandó hormon.', parts: ['golgi', 'lizoszoma'] },
      { icon: '📦', title: 'Kiválasztás (exocitózis)', text: 'A Golgiról lefűződő **kiválasztó hólyagok** a **sejtváz** sínjein a sejthártyához jutnak, és jelre (pl. Ca²⁺-beáramlásra) **összeolvadnak** vele: a hólyag tartalma, az inzulin, a vérbe kerül. A hólyag hártyája a sejthártya része lesz.', parts: ['vezikula', 'sejtvaz', 'hartya'] },
      { icon: '⚡', title: 'Az egészhez energia kell', text: 'Minden lépés energiát fogyaszt: egyetlen aminosav beépítése legalább **4 ATP-egyenértékbe** kerül, a szállítás és a hártyák összeolvadása is energiaigényes. Ezt az ATP-t a **mitokondriumok** termelik, a sejtlégzés során.', parts: ['mito'] }
    ],
    history: [
      { year: '1665', text: 'Robert **Hooke** angol tudós saját mikroszkópjával parafaszeletet vizsgál, és a kis üregeket **„cell”**-nek (kamrácskának) nevezi el. Valójában elhalt növényi sejtek falát látta.' },
      { year: '1670-es évek', text: 'Antoni van **Leeuwenhoek** holland posztókereskedő saját csiszolású, kb. 200–270-szeres nagyítású lencséivel elsőként lát élő egysejtűeket, baktériumokat, vörösvérsejteket és ondósejteket.' },
      { year: '1831', text: 'Robert **Brown** skót botanikus leírja a növényi sejtekben mindig megtalálható sötét testet, és elnevezi **sejtmagnak** (nucleus).' },
      { year: '1838–1839', text: 'Matthias **Schleiden** (növények) és Theodor **Schwann** (állatok) megfogalmazza a **sejtelméletet**: minden élőlény sejtekből áll, és a sejt az élet alapegysége.' },
      { year: '1855', text: 'Rudolf **Virchow**: „Omnis cellula e cellula” – minden sejt sejtből származik. Sejt nem keletkezik a semmiből, csak egy meglévő sejt osztódásával.' },
      { year: '1931–1950-es évek', text: 'Ernst Ruska és Max Knoll megépíti az **elektronmikroszkópot**. Az 1940–50-es években (Palade, Porter, de Duve) ezzel fedezik fel az ER-t, a riboszómákat és a lizoszómákat, és látják először a mitokondrium krisztáit.' },
      { year: '1953', text: 'James **Watson** és Francis **Crick** Rosalind **Franklin** röntgenfelvételei alapján leírja a **DNS kettős spirál** szerkezetét. Ezzel érthetővé vált, hogyan másolódik az örökítőanyag.' },
      { year: '1967', text: 'Lynn **Margulis** amerikai biológus kidolgozza az **endoszimbiózis-elméletet**: a mitokondriumok (és a növények zöld színtestjei) egykor önálló baktériumok voltak, amelyeket egy ősi sejt bekebelezett. A saját DNS és a kettős membrán ma már erősen alátámasztja.' }
    ],
    quiz: [
      { q: 'Melyik sejtalkotóban készül a legtöbb ATP?', options: ['A mitokondriumban', 'A Golgi-készülékben', 'A sejtmagvacskában', 'A lizoszómában'], answer: 0, explain: 'A mitokondrium belső, redőzött membránján zajló sejtlégzés adja a sejt ATP-jének túlnyomó részét.' },
      { q: 'Miért „durva” a durva endoplazmatikus retikulum?', options: ['Mert a felszínét riboszómák borítják', 'Mert kemény a fala', 'Mert durván szétbontja a fehérjéket', 'Mert nincs membránja'], answer: 0, explain: 'A riboszómák miatt „szemcsés” az elektronmikroszkópos képen. A sima ER-en nincsenek riboszómák.' },
      { q: 'Mi a helyes sorrend egy kiválasztott fehérje útjában?', options: ['DNS → mRNS → riboszóma (durva ER) → Golgi → vezikula → sejthártya', 'Golgi → DNS → mitokondrium → sejthártya', 'Riboszóma → sejtmag → lizoszóma → DNS', 'Sejthártya → Golgi → ER → sejtmag'], answer: 0, explain: 'Átírás a magban, fordítás az ER-hez kötött riboszómán, módosítás a Golgiban, végül exocitózis.' },
      { q: 'Milyen molekulákból áll főleg a sejthártya alapja?', options: ['Foszfolipidek kettős rétegéből', 'Cellulózból', 'DNS-ből', 'Keményítőből'], answer: 0, explain: 'A foszfolipidek vízkedvelő feje kifelé, víztaszító farka befelé néz. A cellulóz a növényi sejtfal anyaga, ami az állati sejtekből hiányzik.' },
      { q: 'Mi támasztja alá, hogy a mitokondrium egykor önálló baktérium volt?', options: ['Saját DNS-e és kettős membránja van, és osztódással szaporodik', 'Zöld színű', 'Benne van a sejtmagban', 'Nagyobb a sejtnél'], answer: 0, explain: 'Ez az endoszimbiózis-elmélet. A mitokondrium DNS-e kör alakú, mint a baktériumoké, és riboszómái is baktériumszerűek.' }
    ]
  });
})();
