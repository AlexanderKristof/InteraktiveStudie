/* Modell: Otthoni hálózat és internet – izometrikus jelenet: elöl a lakás (ONT, router, switch, Wi-Fi AP,
 * eszközök), hátul az utcai optikai elosztó, az internetszolgáltató (DNS) és egy adatközpont.
 * Kábelszínek: sárga = optikai szál (fény), kék = UTP réz hálózati kábel, narancs szaggatott = gerinchálózat. */
(function () {
  var K = 2.15, OX = 196, OY = 352;
  var I = STUDIE.draw.iso(OX, OY, K);
  var shade = STUDIE.draw.shade;
  var NS = ' pointer-events="none"';
  function f1(n) { return (+n).toFixed(1); }
  function P(p) { return f1(p[0]) + ',' + f1(p[1]); }
  function B(x, y, z) { var p = I.pt(x, y, z); return [Math.round(p[0]), Math.round(p[1])]; }
  function planeY(y, inner, extra) {   // y = állandó sík: u = x, v = −z
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',0,' + K + ',' + f1(OX - y * 0.866 * K) + ',' + f1(OY + y * 0.5 * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function planeX(x, inner, extra) {   // x = állandó sík: u = −y, v = −z
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (-0.5 * K).toFixed(4) + ',0,' + K + ',' + f1(OX + x * 0.866 * K) + ',' + f1(OY + x * 0.5 * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function planeZ(z, inner, extra) {   // vízszintes sík: u = x, v = y
    return '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + (-0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + OX + ',' + f1(OY - z * K) + ')"' + (extra || '') + '>' + inner + '</g>';
  }
  function pathD(pts) { return pts.map(function (p, i) { var s = I.pt(p[0], p[1], p[2]); return (i ? 'L' : 'M') + f1(s[0]) + ' ' + f1(s[1]); }).join(' '); }
  function cable(pts, color, w, extra) {
    var d = pathD(pts), j = '" fill="none" stroke-linejoin="round" stroke-linecap="round"';
    return '<path d="' + d + j + ' stroke="transparent" stroke-width="' + (w + 7) + '"/>' +
      '<path d="' + d + j + ' stroke="' + shade(color, 0.6) + '" stroke-width="' + (w + 1.4) + '"' + (extra || '') + '/>' +
      '<path d="' + d + j + ' stroke="' + color + '" stroke-width="' + w + '"' + (extra || '') + '/>';
  }
  function yDisc(cx, cy, cz, r, n) {
    var pts = [];
    for (var i = 0; i < (n || 28); i++) { var a = i / (n || 28) * 2 * Math.PI; pts.push(I.pt(cx + r * Math.cos(a), cy, cz + r * Math.sin(a))); }
    return pts;
  }
  function leds(face, pts, colors) {   // kis LED-pöttyök egy függőleges lapon
    return pts.map(function (p, i) { var q = face(p); return '<circle cx="' + f1(q[0]) + '" cy="' + f1(q[1]) + '" r="1.7" fill="' + colors[i % colors.length] + '"' + NS + '/>'; }).join('');
  }
  function waves(c, rs, color, a0, a1) {   // Wi-Fi hullámok (képernyő-koordinátában)
    return '<g fill="none" stroke="' + color + '" stroke-width="2.2" stroke-linecap="round" opacity=".75"' + NS + '>' + rs.map(function (r) {
      var p0 = [c[0] + r * Math.cos(a0), c[1] + r * Math.sin(a0)], p1 = [c[0] + r * Math.cos(a1), c[1] + r * Math.sin(a1)];
      return '<path d="M' + P(p0) + ' A' + r + ' ' + r + ' 0 0 1 ' + P(p1) + '"/>';
    }).join('') + '</g>';
  }
  function tag(x, y, lines, color, anchor) {   // IP-cím címke (képernyő-koordinátában), vezetővonallal a ponthoz
    var w = Math.max.apply(null, lines.map(function (l) { return l.length; })) * 6.3 + 14, h = lines.length * 13 + 8;
    var s = '<line x1="' + f1(anchor[0]) + '" y1="' + f1(anchor[1]) + '" x2="' + f1(x + w / 2) + '" y2="' + f1(y + h) + '" stroke="' + color + '" stroke-width="1.2" stroke-dasharray="3 2"/>' +
      '<rect x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(w) + '" height="' + h + '" rx="6" fill="#ffffff" stroke="' + color + '" stroke-width="1.6"/>';
    lines.forEach(function (l, i) { s += '<text x="' + f1(x + 7) + '" y="' + f1(y + 15 + i * 13) + '" font-family="ui-monospace,monospace" font-size="10.5" font-weight="' + (i ? 400 : 700) + '" fill="' + (i ? '#4a5260' : '#1d2a3a') + '">' + l + '</text>'; });
    return s;
  }

  var FIB = '#f2b705', UTP = '#2f7bf6', BB = '#f08a24';
  var defs = '<defs>' +
    '<linearGradient id="hn-screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a7bd5"/><stop offset="1" stop-color="#5b3fc4"/></linearGradient>' +
    '<radialGradient id="hn-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6b0" stop-opacity=".95"/><stop offset="1" stop-color="#ffd84d" stop-opacity="0"/></radialGradient>' +
    '</defs>';

  /* ---------- Háttér: talaj, lakás (padló, falak, bútorok), szolgáltatói telephely, feliratok ---------- */
  var bg = defs + '<text class="lbl" x="14" y="26" font-size="17">Otthoni hálózat és az internet</text>' +
    '<text class="lbl-muted" x="14" y="44">a lakástól az optikai kábelen át az adatközpontig</text>';
  bg += I.poly([I.pt(-12, 96, -5), I.pt(206, 96, -5), I.pt(206, -210, -5), I.pt(-12, -210, -5)], '#e8eee3', ' stroke="none"');
  // árok az optikai kábelnek (a kábel maga az alkatrész)
  bg += '<path d="' + pathD([[114, -9, -5], [178, -9, -5], [178, -50, -5]]) + '" fill="none" stroke="#d6ccb6" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"' + NS + '/>';
  // lakás: padló, hátsó és bal fal ablakkal
  bg += I.box(0, 0, -5, 112, 84, 5, '#cfae7e');
  for (var fx = 14; fx < 112; fx += 14) bg += '<path d="' + pathD([[fx, 0, 0.05], [fx, 84, 0.05]]) + '" stroke="rgba(120,85,40,.25)" stroke-width="1"' + NS + '/>';
  bg += I.box(0, -4, 0, 112, 4, 66, '#eef0f3') + I.box(-4, -4, 0, 4, 88, 66, '#e9ecf0');
  bg += planeX(0.03, '<rect x="-66" y="-50" width="26" height="24" fill="#cfe6f7" stroke="#aab4c0" stroke-width="1.2"/><path d="M-53 -50 V-26 M-66 -38 H-40" stroke="#aab4c0" stroke-width="1"/>', NS);
  // bútorok: íróasztal, tévészekrény, dohányzóasztal, kanapé
  bg += I.box(6, 4, 0, 46, 15, 17, '#b98b5a') + I.box(66, 3, 0, 40, 12, 13, '#8a6a4a') + I.box(16, 44, 0, 38, 22, 11, '#c49a6a') +
    I.box(70, 60, 0, 36, 18, 9, '#6f8fb5') + I.box(70, 74, 9, 36, 4, 12, '#5f7ea3') + I.box(70, 60, 9, 4, 18, 6, '#5f7ea3') + I.box(102, 60, 9, 4, 18, 6, '#5f7ea3');
  // utcai elosztó talapzata, szolgáltató épülete, adatközpont padlója
  bg += I.box(160, -78, -5, 42, 38, 5, '#c9cfd6') + I.box(160, -82, 0, 42, 4, 30, '#dfe3e8') + I.box(156, -82, 0, 4, 42, 30, '#d5dae0');
  bg += I.box(24, -206, -5, 90, 66, 5, '#c9cfd6');
  var lab = function (x, y, z, t, sub) { var p = I.pt(x, y, z); return '<text class="lbl" x="' + f1(p[0]) + '" y="' + f1(p[1]) + '" font-size="12.5" text-anchor="middle">' + t + '</text>' + (sub ? '<text class="lbl-muted" x="' + f1(p[0]) + '" y="' + f1(p[1] + 14) + '" font-size="11" text-anchor="middle">' + sub + '</text>' : ''); };
  bg += lab(56, 98, -14, 'Otthon (lakás)', 'helyi hálózat · 192.168.1.x');
  bg += lab(214, -36, -16, 'Internetszolgáltató', 'OLT · DNS-szerver');
  bg += '<text class="lbl" x="566" y="92" font-size="12.5" text-anchor="middle">Adatközpont</text><text class="lbl-muted" x="566" y="106" font-size="11" text-anchor="middle">pl. a weboldal szervere</text>';

  /* ---------- Optikai kábel a szolgáltatóig + utcai elosztó (osztó) + OLT ---------- */
  // a lakásban: az ONT-tól a fal tövében, kábelcsatornában a sarokig, onnan a földben az utcai osztóig
  var fiber = cable([[21, 2.2, 40], [23, 1.4, 40], [23, 1.4, 0.8], [112, 1.4, 0.8], [116, -9, -3], [124, -9, -3]], FIB, 2.6);
  fiber += I.box(124, -14, 0, 10, 9, 18, '#7d8f7a') + I.face(124, -14, 18.05, 10, 9, '#93a690');
  fiber += planeY(-4.95, '<rect x="125.5" y="-15" width="7" height="5" rx="1" fill="#eef0f3"/><text x="129" y="-11.6" text-anchor="middle" font-size="3" font-weight="700" font-family="sans-serif" fill="#3a414b">1:32</text>', NS);
  fiber += cable([[134, -9, -3], [178, -9, -3], [178, -49, -3], [178, -49, 2]], FIB, 3.2);
  // más házak felé menő szálak az osztóból
  fiber += cable([[132, -5, -3], [132, 14, -3], [142, 14, -3]], FIB, 1.6, ' stroke-opacity=".6"') + cable([[129, -14, -3], [129, -34, -3], [118, -34, -3]], FIB, 1.6, ' stroke-opacity=".6"');
  // OLT a szolgáltatónál (ide fut be a szál)
  fiber += I.box(170, -60, 0, 14, 10, 26, '#3a414b');
  for (var oz = 4; oz < 24; oz += 4) fiber += planeY(-49.95, '<rect x="171.5" y="' + (-oz - 2.6) + '" width="11" height="2.4" fill="#22262c"/><circle cx="181.4" cy="' + (-oz - 1.4) + '" r=".6" fill="#30d158"/>', NS);
  fiber += planeY(-49.95, '<text x="177" y="-1.2" text-anchor="middle" font-size="3" font-weight="700" font-family="sans-serif" fill="#c9d1dc">OLT</text>', NS);
  // fényimpulzusok a szálban
  [[23, 1.4, 20], [70, 1.4, 0.8], [154, -9, -3], [178, -30, -3]].forEach(function (q) {
    var p = I.pt(q[0], q[1], q[2]);
    fiber += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="6" fill="url(#hn-glow)"' + NS + '/>';
  });

  // gerinchálózat a szolgáltatótól az adatközpont felé
  fiber += '<path d="' + pathD([[177, -60, 26], [177, -110, 26], [96, -150, 4]]) + '" fill="none" stroke="transparent" stroke-width="9"/>' +
    '<path d="' + pathD([[177, -60, 26], [177, -110, 26], [96, -150, 4]]) + '" fill="none" stroke="' + BB + '" stroke-width="3" stroke-dasharray="7 4" stroke-linecap="round"/>';
  fiber += '<text class="lbl-muted" x="742" y="352" font-size="11" text-anchor="end"' + NS + '>internet gerinchálózat</text>';

  /* ---------- ONT (optikai modem) a falon ---------- */
  var ont = I.box(8, 0.2, 30, 13, 4, 16, '#f7f8fa');
  ont += planeY(4.25, '<text x="9.6" y="-42" font-size="2.9" font-weight="800" font-family="sans-serif" fill="#5d6672">ONT</text>' +
    ['PON', 'LOS', 'LAN', 'TEL'].map(function (t, i) { return '<circle cx="' + (10.3 + i * 2.8) + '" cy="-36" r=".75" fill="' + ['#30d158', '#9aa3ad', '#30d158', '#9aa3ad'][i] + '"/><text x="' + (10.3 + i * 2.8) + '" y="-33.6" text-anchor="middle" font-size="1.3" font-family="sans-serif" fill="#8a94a1">' + t + '</text>'; }).join(''), NS);
  ont += I.box(10, 2, 26.5, 9, 2, 3.5, '#d5dae0');   // alsó csatlakozó-takaró

  /* ---------- Tűzfal (a router „kapuja”) ---------- */
  var fw = I.box(23, 7, 17, 3, 12, 14, '#c94a2b');
  fw += planeX(26.03, (function () {
    var s = '';
    for (var r = 0; r < 5; r++) for (var c = 0; c < 4; c++) s += '<rect x="' + f1(-19 + c * 3 + (r % 2 ? 1.5 : 0) - 0.0) + '" y="' + f1(-31 + r * 2.8) + '" width="2.8" height="2.4" fill="#e06a45" stroke="#8a2a16" stroke-width=".3"/>';
    return '<g clip-path="none">' + s + '</g>';
  })(), NS);
  var fwi = I.pt(24.5, 13, 35);
  fw += '<path d="M' + f1(fwi[0]) + ' ' + f1(fwi[1] - 9) + ' c5 3 9 3 9 3 v6 c0 6 -5 9 -9 11 c-4 -2 -9 -5 -9 -11 v-6 c0 0 4 0 9 -3 z" fill="#f08a24" stroke="#8a2a16" stroke-width="1.2"/>' +
    '<path d="M' + f1(fwi[0] - 3.5) + ' ' + f1(fwi[1] + 1) + ' l2.6 2.8 l5 -5.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';

  /* ---------- Router ---------- */
  var rt = '';
  [31, 38, 45].forEach(function (x) { rt += I.box(x, 8.4, 20, 1.4, 1.4, 14, '#2b3038'); });
  rt += I.box(29, 8, 17, 19, 10, 3.6, '#f2f4f7');
  rt += planeY(18.05, (function () { var s = ''; for (var i = 0; i < 6; i++) s += '<circle cx="' + (31 + i * 2.4) + '" cy="-18.8" r=".65" fill="' + (i === 1 ? '#f5a524' : '#30d158') + '"/>'; return s; })(), NS);
  rt += planeZ(20.65, '<text x="38.5" y="13.8" text-anchor="middle" font-size="2.6" font-weight="800" font-family="sans-serif" fill="#8a94a1">ROUTER</text>', NS);
  rt += waves(I.pt(38, 13, 34), [10, 17, 24], '#2f9e6a', -2.4, -0.75);

  /* ---------- Switch ---------- */
  var sw = I.box(84, 5, 13, 18, 8, 3.4, '#3a414b');
  sw += planeY(13.05, (function () { var s = ''; for (var i = 0; i < 8; i++) s += '<rect x="' + (85.2 + i * 2.05) + '" y="-15.8" width="1.6" height="1.6" fill="#15181d"/><circle cx="' + (86 + i * 2.05) + '" cy="-13.8" r=".35" fill="' + (i < 4 ? '#30d158' : '#5d6672') + '"/>'; return s; })(), NS);
  sw += planeZ(16.45, '<text x="93" y="9.6" text-anchor="middle" font-size="2.3" font-weight="800" font-family="sans-serif" fill="#aab4c0">SWITCH</text>', NS);

  /* ---------- Wi-Fi hozzáférési pont (a falon) ---------- */
  var APC = [58, 0.2, 52];
  var ap = I.poly(yDisc(APC[0], APC[1], APC[2], 7), '#d9dee5', ' stroke="#aab4c0" stroke-width=".8"') +
    I.poly(yDisc(APC[0], APC[1] + 2.4, APC[2], 6.6), '#ffffff', ' stroke="#aab4c0" stroke-width=".8"') +
    I.poly(yDisc(APC[0], APC[1] + 2.45, APC[2], 2.2), 'none', ' stroke="#2f9e6a" stroke-width="1.4"');
  ap += waves(I.pt(APC[0], 3, APC[2]), [14, 23, 32, 41], '#2f9e6a', -0.3, 1.25);
  ap += waves(I.pt(APC[0], 3, APC[2]), [14, 23, 32], '#2f9e6a', 1.9, 3.3);

  /* ---------- UTP hálózati kábelek ---------- */
  var utp = cable([[14.5, 2.2, 30], [14.5, 2.2, 22], [20, 6, 17.2], [31, 12, 17.2], [31, 17, 18]], UTP, 2.2);   // ONT → router WAN
  utp += cable([[44, 8.3, 18.5], [44, 2.5, 18], [44, 2.5, 1], [86, 2.5, 1], [86, 2.5, 13], [88, 5, 14.5]], UTP, 2.4);   // router → switch
  utp += cable([[100, 5, 15], [102, 2, 15], [102, 2, 20], [104, 1.5, 26]], UTP, 2);   // switch → tévé
  utp += cable([[96, 5, 15.5], [96, 1.6, 17], [96, 1.6, 58], [70, 1.6, 58], [64, 1.6, 54]], UTP, 2);   // switch → AP
  [[31, 17, 18], [88, 5, 14.5], [44, 8.3, 18.5]].forEach(function (q) { utp += I.box(q[0] - 1, q[1] - 0.6, q[2] - 0.6, 2, 1.2, 1.6, '#cfd6de'); });   // RJ45 dugók
  // csomag (adatcsomag) a kábelen
  var pk = I.pt(65, 2.5, 1);
  utp += '<g transform="translate(' + f1(pk[0]) + ' ' + f1(pk[1] - 7) + ')"' + NS + '><rect x="-8" y="-5.5" width="16" height="11" rx="2" fill="#2f7bf6" stroke="#fff" stroke-width="1"/><path d="M-8 -5 L0 1 L8 -5" fill="none" stroke="#fff" stroke-width="1"/></g>';

  /* ---------- Eszközök: tévé, laptop, telefon ---------- */
  var dev = I.box(72, 0.2, 24, 32, 2, 19, '#1d2229');
  dev += planeY(2.25, '<rect x="73.2" y="-41.8" width="29.6" height="16.6" fill="url(#hn-screen)"/><path d="M80 -30 l4 -5 l3 3 l5 -6 l6 8 z" fill="#fff" fill-opacity=".55"/><circle cx="78" cy="-38" r="1.6" fill="#ffd84d"/>', NS);
  // laptop a dohányzóasztalon: alap + kijelző
  dev += I.box(22, 50, 11, 18, 12, 0.9, '#b7bfca') + I.face(23.5, 52, 11.95, 15, 7, '#3a414b', ' stroke="none"') + I.face(28, 59.5, 11.95, 6, 2, '#9aa3ae', ' stroke="none"');
  dev += I.poly([I.pt(22, 50, 11.9), I.pt(40, 50, 11.9), I.pt(40, 47.6, 23), I.pt(22, 47.6, 23)], '#3a414b', ' stroke="#22262c" stroke-width=".8"');
  dev += '<g transform="matrix(' + (0.866 * K).toFixed(4) + ',' + (0.5 * K).toFixed(4) + ',' + (0.2 * 0.866 * K).toFixed(4) + ',' + (0.95 * K).toFixed(4) + ',' + f1(OX - 50 * 0.866 * K) + ',' + f1(OY + 25 * K - 11.9 * K) + ')"' + NS + '><rect x="23" y="-10.4" width="16" height="9.6" fill="url(#hn-screen)"/><rect x="25" y="-8.6" width="7" height="1.2" fill="#fff" fill-opacity=".8"/><rect x="25" y="-6.4" width="11" height="1" fill="#fff" fill-opacity=".5"/><rect x="25" y="-4.6" width="9" height="1" fill="#fff" fill-opacity=".5"/></g>';
  // telefon a dohányzóasztalon
  dev += I.box(45, 52, 11, 4.4, 8.6, 0.8, '#22262c') + I.face(45.4, 52.4, 11.85, 3.6, 7.8, '#4b7fd6', ' stroke="none"');
  dev += waves(I.pt(47, 56, 12), [6, 11], '#2f9e6a', -2.2, -0.9) + waves(I.pt(31, 48, 22), [6, 11], '#2f9e6a', -2.2, -0.9);

  /* ---------- IP-címek és DHCP ---------- */
  var ip = '';
  var aR = I.pt(38, 12, 22), aL = I.pt(30, 49, 24), aP = I.pt(47, 56, 13), aT = I.pt(88, 1, 44), aW = I.pt(24, 8, 32);
  ip += tag(aR[0] + 64, aR[1] - 160, ['192.168.1.1', 'router · DHCP-szerver'], '#2f6fd6', aR);
  ip += tag(aW[0] - 184, aW[1] - 112, ['203.0.113.7', 'nyilvános cím (NAT)'], '#c94a2b', aW);
  ip += tag(aL[0] - 128, aL[1] - 32, ['192.168.1.23', 'laptop'], '#2f6fd6', aL);
  ip += tag(aP[0] - 30, aP[1] + 38, ['192.168.1.42', 'telefon'], '#2f6fd6', aP);
  ip += tag(aT[0] + 108, aT[1] - 104, ['192.168.1.10', 'tévé'], '#2f6fd6', aT);

  /* ---------- DNS-szerver a szolgáltatónál ---------- */
  var dnsS = I.box(188, -66, 0, 10, 9, 22, '#2b3038');
  for (var dz = 3; dz < 21; dz += 3.4) dnsS += planeY(-56.95, '<rect x="189" y="' + (-dz - 2.4) + '" width="8" height="2.2" fill="#3a414b" stroke="#15181d" stroke-width=".2"/><circle cx="196" cy="' + (-dz - 1.3) + '" r=".45" fill="#2f9bff"/>', NS);
  dnsS += planeY(-56.95, '<text x="193" y="-23.4" text-anchor="middle" font-size="2.6" font-weight="800" font-family="sans-serif" fill="#e6ebf1">DNS</text>', NS);
  var dq = I.pt(190, -62, 22);
  dq = [dq[0] - 150, dq[1] - 4];
  var dt = I.pt(190, -62, 22);
  dnsS += '<line x1="' + f1(dt[0]) + '" y1="' + f1(dt[1]) + '" x2="' + f1(dq[0] + 80) + '" y2="' + f1(dq[1] - 26) + '" stroke="#5b3fc4" stroke-width="1.2" stroke-dasharray="3 2"/>' +
    '<rect x="' + f1(dq[0] + 2) + '" y="' + f1(dq[1] - 62) + '" width="156" height="36" rx="7" fill="#ffffff" stroke="#5b3fc4" stroke-width="1.6"/>' +
    '<text x="' + f1(dq[0] + 10) + '" y="' + f1(dq[1] - 46) + '" font-family="ui-monospace,monospace" font-size="10.5" font-weight="700" fill="#1d2a3a">pelda.hu → 203.0.113.10</text>' +
    '<text x="' + f1(dq[0] + 10) + '" y="' + f1(dq[1] - 33) + '" font-family="sans-serif" font-size="10" fill="#4a5260">név → IP-cím „telefonkönyv”</text>';

  /* ---------- Adatközpont: szerverrackek, hűtés, gerinchálózat ---------- */
  var dc = '';
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 5; col++) {
      var rx = 30 + col * 13, ry = -200 + row * 17;
      dc += I.box(rx, ry, 0, 11, 8, 26, '#262b33');
      dc += planeY(ry + 8.03, (function (x0) {
        var s = '';
        for (var u = 0; u < 7; u++) s += '<rect x="' + (x0 + 1) + '" y="' + (-3 - u * 3.3) + '" width="9" height="2.6" fill="#323843"/><circle cx="' + (x0 + 9) + '" cy="' + (-1.7 - u * 3.3) + '" r=".45" fill="' + (u % 3 ? '#30d158' : '#2f9bff') + '"/>';
        return s;
      })(rx), NS);
    }
  }
  dc += I.box(30, -146, 0, 63, 5, 12, '#c9d1da');   // hűtőegységek (sor elöl)
  for (var cx2 = 33; cx2 < 92; cx2 += 7.5) dc += I.poly([[cx2, -140.95, 2.5], [cx2 + 5, -140.95, 2.5], [cx2 + 5, -140.95, 9.5], [cx2, -140.95, 9.5]].map(function (q) { return I.pt(q[0], q[1], q[2]); }), '#9aa6b5', ' stroke="none"' + NS);

  STUDIE.addModel({
    id: 'halozat',
    title: 'Otthoni hálózat és internet',
    icon: '🌐',
    color: '#2f6fd6',
    category: 'Számítástechnika',
    keywords: 'hálózat internet Wi-Fi wifi router modem ONT optika üvegszál FTTH GPON switch UTP kábel Ethernet RJ45 hozzáférési pont access point mesh IP-cím IPv4 IPv6 DHCP DNS NAT tűzfal adatközpont szerver felhő TCP/IP OSI csomagkapcsolás 2,4 GHz 5 GHz 6 GHz sávszélesség ping',
    summary: 'Amikor megnyitsz egy weboldalt, az adat rádióhullámként, elektromos jelként és fényként is utazik, néhány tized másodperc alatt akár több ezer kilométert.',
    scale: 'a lakásban néhány tíz méter, az adatközpontig akár több ezer kilométer',
    viewBox: '0 0 800 600',
    backdrop: bg,
    intro: 'Az internet **hálózatok hálózata**. Otthon a **router** egy kis helyi hálózatot épít: kábellel (**UTP**) vagy rádión (**Wi-Fi**) kapcsolódik hozzá a laptop, a telefon, a tévé. Minden eszköz kap egy **IP-címet** (**DHCP**), mint egy házszámot. A router a **tűzfal** mögül, az **ONT**-n át egy **optikai szálon** (fénnyel) küldi tovább az adatot az **internetszolgáltatóhoz**, onnan pedig a gerinchálózaton a cél **adatközpontig**.\n\nAz adat nem egyben utazik, hanem kis **csomagokra** bontva. Mindegyik csomagon rajta van a feladó és a címzett IP-címe, és a routerek lépésről lépésre továbbítják. A webcímeket (pl. pelda.hu) a **DNS** fordítja le IP-címre.',
    parts: [
      {
        id: 'optika', z: 1, name: 'Optikai kábel a szolgáltatóig', svg: fiber, explode: [0, 0], badge: B(150, -9, -3), en: 'fibre-optic access line (FTTH, GPON) with splitter and OLT',
        terms: ['fizika-bsc/fenytores', 'fizika-bsc/em-hullam'],
        what: 'Egy hajszálvékony **üvegszál**, amelyben az adat **fényimpulzusok** formájában utazik. A házból az utcai elosztóig fut, ahol egy **optikai osztó** (splitter) a jelet több háztartás között osztja szét (pl. 1:32). Innen egyetlen szál viszi tovább a szolgáltató **OLT** nevű központi berendezéséig. A fény nem gyengül annyira, mint a rézkábelben az elektromos jel, ezért kilométereken át szinte veszteség nélkül halad.',
        madeOf: 'Nagy tisztaságú **kvarcüveg** (szilícium-dioxid): egy kb. 9 µm átmérőjű **mag**, körülötte 125 µm-es **köpeny** kicsit kisebb törésmutatóval, rajta műanyag védőbevonat, kívül sárga vagy fehér kábelköpeny és húzásálló aramidszálak. Az osztó egy kis üveglapka, amelybe hullámvezetőket írtak.',
        how: 'Egy vastag üvegrudat (**előgyártmányt**) gőzfázisú leválasztással rétegről rétegre építenek fel, hogy a mag törésmutatója nagyobb legyen. Ezt egy toronyban 2000 °C körül meglágyítják, és percenként több száz méteres sebességgel **hajszálvékonyra húzzák**, közben azonnal bevonják műanyaggal. A szálakat hegesztéssel (ívvel) toldják össze.',
        uni: 'A fény a magban **teljes visszaverődéssel** halad: a mag–köpeny határon a beesési szög nagyobb a határszögnél, `sin θ_h = n_köpeny / n_mag`. Az egymódusú szálban (`V = 2πa·NA/λ < 2,405`) csak egy módus terjed, nincs módusdiszperzió. A csillapítás 1310 nm-en ≈ 0,35 dB/km, 1550 nm-en ≈ 0,2 dB/km. A **GPON** (ITU-T G.984) ugyanazon a szálon hullámhossz-osztással működik: lefelé 1490 nm-en 2,488 Gbit/s, felfelé 1310 nm-en 1,244 Gbit/s, amelyen az osztóra kötött előfizetők osztoznak (felfelé időosztásos hozzáféréssel, TDMA).',
        fact: 'A fény az üvegszálban kb. 200 000 km/s-mal halad (a vákuumbeli sebesség kétharmadával): Budapestről New Yorkig így is legalább 35 ezredmásodperc az út egy irányban.'
      },
      {
        id: 'ont', z: 3, name: 'Modem / ONT (optikai végpont)', svg: ont, explode: [-34, -56], badge: B(14.5, 4.2, 44), en: 'ONT – optical network terminal (fibre modem)',
        what: 'A falra szerelt kis doboz, ahová az optikai szál befut. Ez **átalakítja a fényt elektromos jellé** és vissza. Rézkábeles (DSL, kábeltévés) internetnél ugyanezt a szerepet a **modem** tölti be: ott a jel a telefonvonalon vagy a koaxiális kábelen érkezik. A „PON” LED azt jelzi, hogy a kapcsolat a szolgáltatóval él.',
        madeOf: 'Műanyag ház, benne egy **lézerdióda** (adó), egy **fotodióda** (vevő), egy kis hullámhossz-szűrő, amely szétválasztja a két irányt, és egy chip, amely a GPON protokollt kezeli. Kimenete egy szabványos Ethernet (RJ45) csatlakozó.',
        how: 'Az optikai adó-vevő modult nagy pontossággal kell a szálhoz illeszteni (mikrométeres pozicionálás és ragasztás). A panelt SMT-vel szerelik. A szolgáltató a telepítéskor az ONT **gyári sorozatszámát** regisztrálja az OLT-n: csak az engedélyezett eszköz kap forgalmat.',
        uni: 'Az ONT az OSI **fizikai** és **adatkapcsolati** rétegét valósítja meg a PON oldalon: lefelé minden ONT megkapja az összes adatot (üzenetszórás), és csak a saját azonosítójú (GEM port) kereteit dolgozza fel, ezért a lefelé menő adat **AES-sel titkosított**. Felfelé az OLT időréseket oszt ki (DBA, dinamikus sávszélesség-kiosztás), hogy az ONT-k ne „beszéljenek egymásba”. A távolságkülönbségeket a **ranging** eljárás egyenlíti ki.',
        lesson: 'rendszeruzem/halozati-eszkozok',
        fact: 'A „modem” szó a modulátor–demodulátor rövidítése: a régi betárcsázós modemek hangokká alakították az adatot, ezért sípoltak.'
      },
      {
        id: 'tuzfal', z: 4, name: 'Tűzfal', svg: fw, explode: [-46, -40], badge: B(24.5, 13, 32), en: 'firewall (stateful packet filter)',
        terms: ['msc-kripto/hozzaferes-vezerles'],
        what: 'A tűzfal a „portás” az otthoni hálózat és az internet között. Alapból **minden kívülről kezdeményezett kapcsolatot elutasít**, a bentről indított kérésekre érkező válaszokat viszont átengedi. Így a laptopodat az internetről nem lehet csak úgy „megszólítani”. Otthon általában nem külön doboz, hanem a **router programjának része**; a gépeken is fut egy-egy szoftveres tűzfal.',
        madeOf: 'Szoftver: szabálylista és egy **kapcsolattábla**, amely nyilvántartja a bentről indított, éppen élő kapcsolatokat. Nagyvállalatoknál külön hardveres tűzfal-készülék, saját nagy sebességű processzorral.',
        how: 'A szabályokat a gyártó előre beállítja (bentről kifelé szabad, kintről befelé tilos), a felhasználó kivételeket adhat hozzá (pl. „port továbbítás” egy játékszervernek). A routerek **firmware-frissítése** gyakran a tűzfal biztonsági hibáit is javítja.',
        uni: 'Az otthoni tűzfal **állapottartó csomagszűrő** (stateful inspection): minden csomagot az ötös (forrás-IP, cél-IP, forrásport, célport, protokoll) és a kapcsolat állapota (pl. TCP SYN/ESTABLISHED) alapján enged vagy dob el. A **NAT** mellékhatásként is szűr: kívülről csak olyan csomag jut be, amelyhez van bejegyzés a fordítási táblában. Fejlettebb tűzfalak alkalmazási rétegben (L7) is vizsgálnak, behatolásérzékelővel (IDS/IPS).',
        lesson: 'informatika/adatbiztonsag',
        fact: 'A „tűzfal” nevét az épületek tűzgátló falától kapta, amely megállítja a tűz továbbterjedését egyik helyiségből a másikba.'
      },
      {
        id: 'router', z: 5, name: 'Router', svg: rt, explode: [6, -62], badge: B(38.5, 13, 21), en: 'router (home gateway with NAT and DHCP)',
        terms: ['algoritmusok/dijkstra', 'algoritmusok/bellman-ford'],
        what: 'Az otthoni hálózat **központja** és a kapu az internet felé. Eldönti, hogy egy csomag a helyi hálózaton marad, vagy ki kell küldeni az internetre. Az otthoni „router” valójában több eszköz egyben: **router**, **Wi-Fi hozzáférési pont**, kis **switch**, **tűzfal**, **DHCP-szerver** és DNS-gyorsítótár. A rajzon a három antenna a Wi-Fi-hez kell.',
        madeOf: 'Műanyag ház, benne egy nyomtatott áramköri lap egy hálózati **processzorral** (SoC), memóriával, flash tárolóval, Wi-Fi rádiós chipekkel és erősítőkkel, Ethernet-kapcsoló chippel. A szoftvere (firmware) általában Linux-alapú.',
        how: 'A panelt SMT-vel szerelik, a rádiós részt fémburkolat árnyékolja. Gyártás után minden routeren lemérik az adóteljesítményt és a vételi érzékenységet, majd rátöltik a firmware-t és egy **egyedi jelszót**.',
        uni: 'A router az OSI **hálózati rétegében** (L3) dolgozik: a csomag cél-IP-címét a **továbbítási táblában** a leghosszabb illeszkedő előtag (longest prefix match) szerint keresi. Az internet gerincén a routerek útválasztó protokollokkal építik a táblákat: tartományon belül **OSPF** (Dijkstra-algoritmus, link-state) vagy régebben RIP (Bellman–Ford, distance-vector), a szolgáltatók között **BGP** (útvonalvektor, szabályalapú). Az otthoni router **NAT**-ot is végez: a sok privát címet (192.168.x.x) egyetlen nyilvános IPv4-címre fordítja, a portszámok alapján különböztetve meg a kapcsolatokat.',
        lesson: 'informatika/halozatok',
        fact: 'A routert érdemes a lakás közepére, magasra tenni, nem a szekrény mögé: a fal, a fém és a víz (pl. akvárium) erősen gyengíti a Wi-Fi jelét.'
      },
      {
        id: 'switch', z: 6, name: 'Switch (hálózati kapcsoló)', svg: sw, explode: [26, -48], badge: B(93, 9, 16.4), en: 'Ethernet switch',
        terms: ['algoritmusok/hasitotabla'],
        what: 'Több vezetékes eszközt köt össze: a router egyetlen kábelét „elosztja” a tévé, a játékkonzol, a Wi-Fi hozzáférési pont között. Okos eszköz: megjegyzi, melyik portján melyik eszköz van, és a kereteket **csak oda küldi**, ahová szólnak, nem mindenkinek. Így a portok nem zavarják egymást.',
        madeOf: 'Fém vagy műanyag ház, benne egy **kapcsoló chip** (switch ASIC) gyors memóriával, a portokon **RJ45 aljzatok** kis transzformátorokkal (galvanikus leválasztás), LED-ek. Az okos (menedzselt) switchekben egy kis processzor is van.',
        how: 'A kapcsoló chipet félvezetőgyárban készítik, a switch panelt SMT-vel szerelik. A portokon a jelátvitelt automata tesztberendezés ellenőrzi (minden port, minden sebesség).',
        uni: 'A switch az **adatkapcsolati rétegben** (L2) dolgozik: az Ethernet-keretek forrás-**MAC-címét** megtanulja (MAC-tábla, lényegében hasítótábla: cím → port), a célcím alapján pedig a megfelelő portra továbbítja (ismeretlen címet minden portra elárasztással). Teljes duplex, ütközésmentes kapcsolat portonként. A hurkokat a **Spanning Tree** protokoll szünteti meg; a forgalom logikai szétválasztására **VLAN**-ok (IEEE 802.1Q) szolgálnak.',
        lesson: 'rendszeruzem/halozati-eszkozok',
        fact: 'A switch elődje a „hub” volt: az minden adatot minden portjára kikiabált, és ha ketten egyszerre „beszéltek”, ütközés lett.'
      },
      {
        id: 'utp', z: 2, name: 'Hálózati kábelek (UTP, Ethernet)', svg: utp, explode: [0, 0], badge: B(66, 2.5, 1), en: 'twisted-pair Ethernet cable (UTP, RJ45)',
        terms: ['fizika-bsc/faraday-indukcio'],
        what: 'A kék kábelek az **Ethernet** vezetékes kapcsolatai: ONT → router, router → switch, switch → tévé és Wi-Fi hozzáférési pont. A vezetékes kapcsolat **gyorsabb és stabilabb** a Wi-Fi-nél, és nem osztozik a rádiós csatornán más eszközökkel. Egy kábelszakasz legfeljebb **100 méter** lehet.',
        madeOf: 'Négy pár, egymás köré **sodort**, műanyag szigetelésű **rézvezeték** egy közös köpenyben, a végükön átlátszó **RJ45** dugó nyolc érintkezővel. A „Cat5e”, „Cat6”, „Cat6A” kategória a kábel minőségét és sebességét jelzi.',
        how: 'A rézhuzalt húzással vékonyítják, szigetelik, majd a párokat pontosan meghatározott, páronként eltérő menetemelkedéssel összesodorják. A kábelt hosszra vágják, és krimpelőfogóval rápréselik a dugót.',
        uni: 'A sodrás célja a **zavarvédelem**: a külső mágneses tér a szomszédos hurkokban ellentétes feszültséget indukál, ami kioltja egymást, a jel pedig **differenciálisan** (a két ér feszültségkülönbségeként) utazik. Az 1000BASE-T mind a négy éren egyszerre, mindkét irányba ad (visszhangkioltással), 125 Mbaud-dal, PAM-5 kódolással. A kábel hullámimpedanciája 100 Ω. Egy keret legfeljebb 1500 bájt hasznos adatot visz (MTU).',
        fact: 'Az Ethernet kábelen áramot is lehet vinni (PoE): sok Wi-Fi hozzáférési pont és biztonsági kamera ugyanazon a kábelen kapja az adatot és a tápot is.'
      },
      {
        id: 'ap', z: 7, name: 'Wi-Fi hozzáférési pont', svg: ap, explode: [0, -60], badge: B(APC[0], 2.6, APC[2]), en: 'Wi-Fi access point (AP, mesh node)',
        terms: ['fizika-bsc/em-hullam', 'fizika-bsc/interferencia'],
        what: 'Egy rádió adó-vevő, amely a vezetékes hálózatot **Wi-Fi-re** „fordítja”. A router is tartalmaz egyet, de egy nagy lakásban vagy házban több helyiségben is kell: ezt adja a különálló hozzáférési pont vagy a **mesh** rendszer egy-egy egysége. A rajzon kábelen kapja az adatot a switchtől, és a falra szerelve sugároz.',
        madeOf: 'Műanyag ház, benne rádiós chipek a **2,4 GHz-es**, **5 GHz-es** (és újabban **6 GHz-es**) sávra, több **antenna**, processzor és memória. Gyakran a hálózati kábelen kapja az áramot is (PoE).',
        how: 'A panelt SMT-vel szerelik, az antennákat a ház belsejébe ragasztják vagy a panelre nyomtatják. Minden rádiós készüléket a forgalomba hozatal előtt a **rádiós szabványok** szerint bevizsgálnak (megengedett teljesítmény, frekvencia).',
        uni: 'A **2,4 GHz-es** sáv hatótávolsága nagyobb és jobban átjut a falakon, de keskeny és zsúfolt (Európában a 13 csatornából csak 3–4 nem lapolódik át). Az **5 GHz** és a **6 GHz** (Wi-Fi 6E/7) szélesebb csatornákat (80–320 MHz) ad, nagyobb sebességgel, de kisebb hatótávval. A gyorsítás eszközei: **OFDMA** (sok kis alvivő), **MIMO** (több antenna, térbeli nyalábok), **QAM** (több bit szimbólumonként: 1024-QAM = 10 bit). A közeg osztott, a hozzáférés ütközéselkerüléssel (CSMA/CA) történik.',
        lesson: 'rendszeruzem/halozatok',
        fact: 'A mikrohullámú sütő is 2,4 GHz körül működik: ezért lassulhat be a 2,4 GHz-es Wi-Fi, amikor melegítesz valamit.'
      },
      {
        id: 'eszkozok', z: 8, name: 'Eszközök (laptop, telefon, tévé)', svg: dev, explode: [-30, 40], badge: B(31, 56, 13), link: 'okostelefon', en: 'client devices (laptop, smartphone, smart TV)',
        what: 'Ezek a hálózat „végpontjai”, ők kérnek adatot (weboldal, videó, üzenet), és ők jelenítik meg. A **laptop** és a **telefon** Wi-Fi-n, a **tévé** kábelen kapcsolódik. Minden eszköznek van egy gyárilag beégetett **MAC-címe** (a hálózati kártya „sorozatszáma”) és egy kapott **IP-címe**.',
        madeOf: 'Mindegyikben van egy **hálózati csatoló**: Wi-Fi rádió antennával vagy Ethernet-csatoló RJ45 aljzattal. A telefonban emellett mobilhálózati (4G/5G) modem is.',
        how: 'A hálózati csatoló ma szinte mindig egy chip része a fő alaplapon (vagy a telefon SoC-jában). A szoftveres oldalról az **operációs rendszer** hálózati része (TCP/IP-verem) kezeli a kapcsolatokat.',
        uni: 'A végpontokon fut a **szállítási réteg**: a **TCP** megbízható, sorrendhelyes bájtfolyamot épít (háromutas kézfogás, sorszámok, nyugták, újraküldés, torlódásvezérlés), az **UDP** egyszerű, gyors datagramokat küld (pl. videóhívás, DNS). Fölötte az **alkalmazási réteg** protokolljai: HTTP(S), DNS, és a titkosítást adó **TLS**. A TCP/IP modell négy rétege: kapcsolati, internet (IP), szállítási (TCP/UDP), alkalmazási.',
        lesson: 'informatika/halozatok',
        fact: 'Egy átlagos háztartásban ma már 10–20 eszköz is csatlakozik a hálózathoz: a telefonoktól a tévén át a robotporszívóig és az okosizzóig.'
      },
      {
        id: 'ipcim', z: 10, name: 'IP-címek és DHCP', svg: ip, explode: [0, -34], badge: [Math.round(aR[0] + 64), Math.round(aR[1] - 160)], en: 'IP addressing and DHCP',
        terms: ['digitalis-technika/bit'],
        what: 'Az **IP-cím** az eszköz „házszáma” a hálózaton, enélkül a csomagok nem találnának oda. A lakásban az eszközök **magáncímet** kapnak (pl. 192.168.1.23); ezeket a **router** osztja ki automatikusan a **DHCP** segítségével, amikor az eszköz csatlakozik. Kifelé az egész lakás **egyetlen nyilvános címen** (a rajzon 203.0.113.7) látszik: a router „fordít” (NAT).',
        madeOf: 'Az IPv4-cím **32 bit**, négy 0–255 közötti számmal írva; ebből kb. 4,3 milliárd létezik, ami kevés: elfogyott. Az utód, az **IPv6** 128 bites (pl. 2001:db8::1), ebből gyakorlatilag kifogyhatatlan mennyiség van.',
        how: 'A DHCP négy üzenettel működik: az új eszköz körbekiált („van itt DHCP-szerver?”), a router ajánl egy szabad címet, az eszköz elkéri, a router visszaigazolja. A cím **bérlet**: egy idő után meg kell hosszabbítani. A routerben beállítható, hogy egy eszköz mindig ugyanazt a címet kapja.',
        uni: 'A DHCP üzenetváltása **DORA**: Discover (üzenetszórás, UDP 67/68) → Offer → Request → Acknowledge. A kiosztott adatok: IP-cím, **alhálózati maszk** (pl. /24 = 255.255.255.0: az első 24 bit a hálózat, a maradék 8 az eszköz), alapértelmezett átjáró, DNS-szerver, bérletidő. Az RFC 1918 magáncím-tartományai: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. A NAT a magáncímeket a nyilvánosra fordítja (cím + port leképezés), a szolgáltatónál sokszor még egy NAT-réteg is van (CGNAT). IPv6-nál a címet az eszköz gyakran maga képezi (SLAAC).',
        lesson: 'rendszeruzem/halozatok',
        fact: 'A rajzon szereplő 203.0.113.x és a pelda.hu jellegű címek a dokumentációs példáknak fenntartott címtartományból valók: valódi gép nem kaphatja meg őket.'
      },
      {
        id: 'dns', z: 9, name: 'DNS-szerver (névfeloldás)', svg: dnsS, explode: [26, -46], badge: B(193, -57, 12), en: 'DNS resolver (Domain Name System)',
        terms: ['msc-elosztott/vegso-konzisztencia', 'algoritmusok/hasitotabla'],
        what: 'Az internet **telefonkönyve**. Te azt írod be, hogy pelda.hu, de a csomagoknak IP-cím kell. A DNS-szerver (általában a szolgáltatóé, vagy egy nyilvános szolgáltatás) megmondja, melyik IP-címhez tartozik a név. A választ a telefon, a router és a szerver is megjegyzi egy ideig (gyorsítótár), így legközelebb már nem kell újra megkérdezni.',
        madeOf: 'Szerverszámítógépek a szolgáltató gépházában, rajtuk DNS-szerverprogram és egy nagy **gyorsítótár**. A világ DNS-e egy fa: a csúcson a **gyökérszerverek**, alattuk a .hu, .com stb. tartományok szerverei, legalul az egyes cégek névszerverei.',
        how: 'A DNS-t nem egy cég „gyártja”, hanem szabványok (RFC-k) írják le, és világszerte ezernyi szervezet működteti. A .hu tartomány nyilvántartását például az Internet Szolgáltatók Tanácsa (ISZT) végzi.',
        uni: 'A feloldás **rekurzív** a kliens felől és **iteratív** a feloldó felől: a feloldó a gyökértől (13 logikai gyökérszerver-név, sok anycast példánnyal) a TLD-n át a mérvadó névszerverig kérdez végig. A rekordtípusok: **A** (IPv4), **AAAA** (IPv6), CNAME, MX, NS, TXT. Minden válasznak **TTL**-je van: addig gyorsítótárazható. Így a DNS **végső konzisztenciájú** elosztott adatbázis (egy változás a TTL lejártáig nem mindenhol látszik). A hamisítás ellen a **DNSSEC** digitális aláírásokat, a lehallgatás ellen a DoH/DoT titkosítást használja.',
        lesson: 'rendszeruzem/szerverek',
        fact: 'Ha „nem megy az internet”, de egy IP-cím közvetlen beírásával igen, gyakran a DNS a hibás: a csomagok mennének, csak a nevet nem tudja feloldani senki.'
      },
      {
        id: 'adatkozpont', z: 0, name: 'Adatközpont (szerverek)', svg: dc, explode: [30, -42], badge: B(60, -168, 26), link: 'alaplap', en: 'data centre (server racks, cooling, backbone)',
        terms: ['msc-elosztott/terheleseloszto', 'msc-elosztott/replikacio-modok', 'msc-kripto/tls'],
        what: 'Egy nagy, hűtött csarnok, tele **szerverekkel**: ezeken vannak a weboldalak, a videók, a felhőben tárolt fényképeid. A szerverek fiókszerűen, **rackszekrényekben** sorakoznak, rengeteg árammal és hűtéssel. Az adatközpontot vastag **optikai gerinchálózat** köti össze az internet többi részével. Egy-egy nagy szolgáltatás egyszerre több adatközpontból is működik.',
        madeOf: 'Rackszekrények szerverekkel (alaplap, processzorok, sok memória, SSD-k), hálózati switchek, **szünetmentes tápok** akkumulátorokkal, dízelgenerátorok, **hűtőberendezések** (hideg és meleg folyosók, egyre gyakrabban folyadékhűtés), tűzoltó rendszer és szigorú beléptetés.',
        how: 'Az épületet úgy tervezik, hogy minden fontos rendszerből legyen tartalék (két áramforrás, több hűtőgép, több optikai útvonal). A szervereket gyárilag szerelt rackekben szállítják, a helyszínen csak bekötik őket.',
        uni: 'A kérések elosztása több szinten történik: DNS-alapú vagy **anycast** földrajzi elosztás, a csarnokon belül **terheléselosztók** (L4/L7). Az adatokat **replikálják** több gépre és helyszínre a hibatűrés miatt. A hatékonyság mutatója a **PUE** = teljes energiafelhasználás / IT-energia (ideálisan 1, a gyakorlatban 1,1–1,6). A Nemzetközi Energiaügynökség becslése szerint 2024-ben a világ adatközpontjai kb. 415 TWh-t, a globális villamosenergia-fogyasztás mintegy 1,5%-át használták. A kapcsolat a böngésző és a szerver között **TLS**-sel titkosított (HTTPS).',
        lesson: 'rendszeruzem/szerverek',
        fact: 'A kontinensek közti internetforgalom szinte teljes egészében a tenger fenekén futó optikai kábeleken megy, nem műholdon.'
      }
    ],
    uni: {
      text: 'Az internet működését **rétegmodellekkel** írják le. Az **OSI** modell hét rétege: fizikai, adatkapcsolati, hálózati, szállítási, viszony, megjelenítési, alkalmazási. A gyakorlatban a négyrétegű **TCP/IP** modell él: kapcsolati (Ethernet, Wi-Fi, GPON), internet (**IP**), szállítási (**TCP**, UDP), alkalmazási (HTTP, DNS, TLS). Minden réteg a saját fejlécével „becsomagolja” a felette lévő adatát (**enkapszuláció**), a vevő oldalon fordított sorrendben bontják ki.\n\nAz internet **csomagkapcsolt**: nincs lefoglalt vonal, a csomagok egymástól függetlenül, a routerek sorain (puffereiben) várakozva haladnak. A késleltetés összetevői: terjedési (`d/v`, üvegszálban `v ≈ 2·10⁸ m/s`), továbbítási (`L/R`), feldolgozási és **sorban állási** (M/M/1 közelítésben `T = 1/(μ − λ)`). Az átviteli sebesség felső korlátja a Shannon-tétel: `C = B · log₂(1 + S/N)`. A **NAT** a privát IPv4-címtartományokat egy nyilvános címre fordítja; az **IPv6** 128 bites címekkel ezt szükségtelenné teszi. A Wi-Fi sávok (2,4 / 5 / 6 GHz) a hatótáv és a csatornaszélesség (sebesség) között jelentenek kompromisszumot.',
      terms: ['msc-sztochasztika/mm1-sor', 'algoritmusok/dijkstra', 'msc-kripto/tls', 'fizika-bsc/em-hullam', 'msc-elosztott/vegso-konzisztencia']
    },
    steps: [
      { icon: '📶', title: '1. Csatlakozás: IP-cím a routertől', text: 'Amikor a telefon rácsatlakozik a Wi-Fi-re, a **hozzáférési ponttal** titkosított rádiókapcsolatot épít, majd **DHCP**-vel címet kér. A router kioszt neki egy szabad magáncímet (pl. 192.168.1.42), és megmondja, merre van a kijárat (az átjáró) és a DNS-szerver.', parts: ['ap', 'eszkozok', 'ipcim', 'router'] },
      { icon: '📖', title: '2. Névfeloldás: mi a pelda.hu címe?', text: 'Beírod a böngészőbe: pelda.hu. A telefon megkérdezi a **DNS-szervert**, amely (ha nem tudja fejből) a gyökértől a .hu-n át a domain saját névszerveréig végigkérdez, majd visszaadja az IP-címet: 203.0.113.10. A választ mindenki megjegyzi egy időre.', parts: ['dns', 'eszkozok'] },
      { icon: '✉️', title: '3. Csomagok: borítékba téve', text: 'A böngésző kérését a telefon **csomagokra** bontja. Mindegyik kap egy „borítékot”: TCP-fejléc (sorszám, portok), IP-fejléc (feladó és címzett IP-címe), majd Wi-Fi-keret. A kapcsolatot **TLS** titkosítja, így útközben senki nem olvashatja el.', parts: ['eszkozok'] },
      { icon: '🔀', title: '4. Otthon: Wi-Fi, switch, router', text: 'A csomag rádión a **hozzáférési ponthoz** jut, onnan **UTP kábelen** a **switchen** át a **routerhez**. A router látja, hogy a cím nem a helyi hálózaté, ezért kifelé küldi. Közben a **NAT** kicseréli a feladó magáncímét a lakás nyilvános címére, és feljegyzi, kinek kell majd a válasz.', parts: ['ap', 'utp', 'switch', 'router'] },
      { icon: '🧱', title: '5. Tűzfal: kifelé szabad', text: 'A **tűzfal** megjegyzi, hogy bentről indult egy kapcsolat, ezért a rá érkező válaszokat majd beengedi. Egy kívülről kéretlenül érkező csomagot viszont eldobna.', parts: ['tuzfal', 'router'] },
      { icon: '💡', title: '6. Fény az üvegszálban', text: 'Az **ONT** a csomag elektromos jelét **fényimpulzusokká** alakítja, és az **optikai szálon** az utcai osztón át a szolgáltató OLT berendezéséhez küldi, amely továbbadja a szolgáltató routereinek.', parts: ['ont', 'optika'] },
      { icon: '🌍', title: '7. Az interneten át', text: 'A csomag routerről routerre ugrik (jellemzően 10–20 „ugrás”). Minden router a táblázata alapján eldönti, melyik szomszédjának adja tovább. A gerincvezetékek óriási kapacitású optikai kábelek, a tengereken át is. Az egyes csomagok akár különböző úton is mehetnek.', parts: ['optika', 'adatkozpont'] },
      { icon: '🖥️', title: '8. A szerver válaszol', text: 'Az **adatközpontban** egy terheléselosztó egy szabad szerverhez irányítja a kérést. A szerver előállítja a weboldalt, és a válaszcsomagok ugyanígy, fordított irányban jutnak vissza a routerig, amely a NAT-tábla alapján a telefonnak adja őket. A telefon sorba rakja a csomagokat, és megjelenik az oldal. Az egész jó esetben néhány tized másodperc.', parts: ['adatkozpont', 'router', 'eszkozok'] }
    ],
    history: [
      { year: '1969', text: 'Elindul az amerikai **ARPANET**, az internet elődje: október 29-én küldik el az első üzenetet két egyetem között (a „LOGIN” szóból csak a „LO” ért át, mert a rendszer lefagyott).' },
      { year: '1973–1974', text: 'Bob Metcalfe a Xerox PARC-ban kidolgozza az **Ethernetet**; Vint Cerf és Bob Kahn leírja a **TCP/IP** alapjait: hálózatok összekapcsolását csomagokkal.' },
      { year: '1983', text: 'Az ARPANET január 1-jén átáll a **TCP/IP**-re: ezt tartják az internet „születésnapjának”. Ugyanebben az évben Paul Mockapetris megalkotja a **DNS**-t.' },
      { year: '1989–1991', text: 'Tim Berners-Lee a CERN-ben megalkotja a **világhálót** (WWW): a weboldalakat, a HTTP-t és a HTML-t. 1991-ben nyilvános lesz.' },
      { year: '1990-es évek eleje', text: 'Magyarországon az egyetemek és kutatóintézetek hálózatán keresztül megérkezik az internet; a .hu tartomány kezelése elindul, az évtized végére megjelennek a lakossági előfizetések.' },
      { year: '1997–1999', text: 'Megjelenik az első **Wi-Fi** szabvány (IEEE 802.11), majd a 802.11b és a Wi-Fi Alliance: a vezeték nélküli hálózat a háztartásokba költözik.' },
      { year: '2003', text: 'Elfogadják a **GPON** szabványt (ITU-T G.984): a fényvezetős internet (FTTH) gazdaságosan eljuthat a lakásokig.' },
      { year: '2011', text: 'A központi IPv4-címkészlet (IANA) **kifogy**: felgyorsul az **IPv6** bevezetése, és elterjed a NAT a szolgáltatóknál is.' },
      { year: '2020-as évek', text: 'A **Wi-Fi 6E** és **Wi-Fi 7** megnyitja a 6 GHz-es sávot, az otthoni optikai előfizetések elérik a több Gbit/s-ot, az adatközpontok áramigényét pedig a mesterséges intelligencia hajtja felfelé.' }
    ],
    quiz: [
      { q: 'Mi a DNS feladata?', options: ['A webcímeket (pl. pelda.hu) IP-címre fordítja', 'Titkosítja a Wi-Fi-t', 'Fénnyé alakítja az adatot', 'IP-címet oszt a lakás eszközeinek'], answer: 0, explain: 'A DNS az internet „telefonkönyve”: név → IP-cím. Az IP-címet a lakásban a DHCP osztja ki.' },
      { q: 'Mit csinál az ONT?', options: ['Az optikai szál fényjelét elektromos jellé alakítja és vissza', 'Wi-Fi-jelet erősít', 'Tárolja a weboldalakat', 'Kiosztja a nyilvános IP-címeket a világon'], answer: 0, explain: 'Az ONT az optikai hálózat végpontja a lakásban: a „fénymodem”.' },
      { q: 'Miért elég egyetlen nyilvános IP-cím egy egész lakásnak?', options: ['Mert a router NAT-tal lefordítja a magáncímeket a nyilvánosra', 'Mert csak egy eszköz internetezhet egyszerre', 'Mert a switch minden csomagot mindenkinek elküld', 'Mert a Wi-Fi nem használ IP-címet'], answer: 0, explain: 'A NAT a portszámok alapján tartja nyilván, melyik belső eszközé melyik kapcsolat.' },
      { q: 'Melyik Wi-Fi sáv ér messzebbre, és jut át jobban a falakon?', options: ['A 2,4 GHz-es', 'Az 5 GHz-es', 'A 6 GHz-es', 'Mindegyik ugyanannyira'], answer: 0, explain: 'Az alacsonyabb frekvenciájú hullámot a falak kevésbé nyelik el, de a 2,4 GHz-es sáv keskenyebb, ezért lassabb és zsúfoltabb.' },
      { q: 'Mit jelent, hogy az internet csomagkapcsolt?', options: ['Az adatot kis csomagokra bontják, amelyek egymástól függetlenül, routerről routerre jutnak célba', 'Minden híváshoz külön vezetéket kapcsolnak össze', 'Az adatot postán küldik', 'Csak egy csomag lehet úton egyszerre'], answer: 0, explain: 'A csomagkapcsolás miatt a vonalakon sokan osztozhatnak, és egy hiba esetén a csomagok kerülőúton is célba érnek.' }
    ]
  });
})();
