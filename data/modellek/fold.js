/* Modell: a Föld szerkezete – gömb, amelyből egy kb. 90°-os cikket kivágtunk, így látszanak a belső
 * gömbhéjak. A mag és az alsó köpeny sugara arányos, a külső, vékony rétegeket (kéreg, litoszféra,
 * asztenoszféra, felső köpeny) olvashatóság kedvéért vastagabbra rajzoltuk; a valódi arányokat
 * az alsó sáv mutatja. Jobb oldalt két betét: a lemezhatárok típusai és a légkör rétegei. */
(function () {
  var CX = 290, CY = 310, R = 200;
  var A0 = -100, A1 = -10;                  // a kivágott cikk szélei (fok, SVG-irány: -90 = fel)
  var NS = ' pointer-events="none"';
  var UX = Math.cos((A0 + A1) / 2 * Math.PI / 180), UY = Math.sin((A0 + A1) / 2 * Math.PI / 180);
  function ex(d) { return [Math.round(UX * d), Math.round(UY * d)]; }       // szétszedés a cikk felezője mentén
  function p(r, a) { var t = a * Math.PI / 180; return [CX + r * Math.cos(t), CY + r * Math.sin(t)]; }
  function f(q) { return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }
  function bp(r, a) { var q = p(r, a); return [Math.round(q[0]), Math.round(q[1])]; }
  /* körgyűrűcikk r0–r1 sugár és a0–a1 szög között */
  function sector(r0, r1, a0, a1, fill, extra) {
    var lg = (a1 - a0) > 180 ? 1 : 0;
    var d = 'M' + f(p(r1, a0)) + ' A' + r1 + ' ' + r1 + ' 0 ' + lg + ' 1 ' + f(p(r1, a1)) +
      (r0 > 0 ? ' L' + f(p(r0, a1)) + ' A' + r0 + ' ' + r0 + ' 0 ' + lg + ' 0 ' + f(p(r0, a0)) : ' L' + CX + ' ' + CY) + ' Z';
    return '<path d="' + d + '" fill="' + fill + '"' + (extra || ' stroke="rgba(40,20,10,.55)" stroke-width="1"') + '/>';
  }
  function arc(r, a0, a1, extra) {
    return '<path d="M' + f(p(r, a0)) + ' A' + r + ' ' + r + ' 0 0 1 ' + f(p(r, a1)) + '" fill="none"' + extra + '/>';
  }
  /* felirat a cikk bal széle mellett (fehér betű sötét körvonallal: világos és sötét módban is olvasható) */
  function edgeLbl(r, s) {
    var q = p(r, A0);
    return '<text x="' + (q[0] - 7).toFixed(1) + '" y="' + (q[1] + 4).toFixed(1) + '" font-size="10.5" font-weight="700" fill="#fff" stroke="rgba(10,20,40,.75)" stroke-width="3" paint-order="stroke" text-anchor="end"' + NS + '>' + s + '</text>';
  }
  function inLbl(r, a, s, col) {
    var q = p(r, a);
    return '<text x="' + q[0].toFixed(1) + '" y="' + (q[1] + 4).toFixed(1) + '" font-size="10.5" font-weight="700" fill="' + (col || '#3a1a08') + '" text-anchor="middle"' + NS + '>' + s + '</text>';
  }
  function curvedArrow(r, a0, a1, col) {
    var e = p(r, a1), t = (a1 + (a1 > a0 ? 90 : -90)) * Math.PI / 180, h = 6;
    var back = Math.atan2(Math.sin(t), Math.cos(t)) + Math.PI;
    return arc(r, Math.min(a0, a1), Math.max(a0, a1), ' stroke="' + col + '" stroke-width="2" stroke-linecap="round"' + NS) +
      '<path d="M' + (e[0] + h * Math.cos(back - 0.5)).toFixed(1) + ' ' + (e[1] + h * Math.sin(back - 0.5)).toFixed(1) + ' L' + f(e) + ' L' +
      (e[0] + h * Math.cos(back + 0.5)).toFixed(1) + ' ' + (e[1] + h * Math.sin(back + 0.5)).toFixed(1) + '" fill="none" stroke="' + col + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + NS + '/>';
  }
  function arrowH(x1, y, x2, col) {
    var s = x2 > x1 ? 1 : -1;
    return '<path d="M' + x1 + ' ' + y + ' L' + x2 + ' ' + y + ' M' + (x2 - s * 6) + ' ' + (y - 4) + ' L' + x2 + ' ' + y + ' L' + (x2 - s * 6) + ' ' + (y + 4) + '" fill="none" stroke="' + col + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"' + NS + '/>';
  }

  /* a gömb kivágás nélküli része */
  var bodyD = 'M' + CX + ' ' + CY + ' L' + f(p(R, A1)) + ' A' + R + ' ' + R + ' 0 1 1 ' + f(p(R, A0)) + ' Z';
  var defs = '<defs>' +
    '<clipPath id="fd-body"><path d="' + bodyD + '"/></clipPath>' +
    '<radialGradient id="fd-ocean" cx="38%" cy="40%" r="70%"><stop offset="0" stop-color="#6fbaf0"/><stop offset=".6" stop-color="#2f7cc4"/><stop offset="1" stop-color="#1b4c86"/></radialGradient>' +
    '<radialGradient id="fd-icore" cx="' + CX + '" cy="' + CY + '" r="38" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fffbe0"/><stop offset="1" stop-color="#f2c23a"/></radialGradient>' +
    '<radialGradient id="fd-ocore" cx="' + CX + '" cy="' + CY + '" r="109" gradientUnits="userSpaceOnUse"><stop offset=".35" stop-color="#ffc356"/><stop offset="1" stop-color="#ee7d2c"/></radialGradient>' +
    '<radialGradient id="fd-lman" cx="' + CX + '" cy="' + CY + '" r="146" gradientUnits="userSpaceOnUse"><stop offset=".74" stop-color="#d8562e"/><stop offset="1" stop-color="#b8452a"/></radialGradient>' +
    '<radialGradient id="fd-uman" cx="' + CX + '" cy="' + CY + '" r="164" gradientUnits="userSpaceOnUse"><stop offset=".89" stop-color="#d4683c"/><stop offset="1" stop-color="#c95f38"/></radialGradient>' +
    '<pattern id="fd-melt" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#e89a5a"/><circle cx="2" cy="2" r="1.1" fill="#fff0b0" opacity=".85"/><circle cx="5.5" cy="5" r=".8" fill="#ffd27a"/></pattern>' +
    '<radialGradient id="fd-land" cx="' + (CX - 60) + '" cy="' + (CY - 70) + '" r="270" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#a6d077"/><stop offset=".6" stop-color="#78a54d"/><stop offset="1" stop-color="#3f6a2c"/></radialGradient>' +
    '</defs>';

  /* ---------- háttér: cím, forgástengely, valódi arányok sávja ---------- */
  var bar = '', BX = 20, BW = 560, KM = BW / 6371;
  [[0, 35, '#a8875f'], [35, 660, '#d4683c'], [660, 2890, '#c8502c'], [2890, 5150, '#f39a3e'], [5150, 6371, '#f7d567']].forEach(function (s) {
    bar += '<rect x="' + (BX + s[0] * KM).toFixed(1) + '" y="548" width="' + Math.max(2, (s[1] - s[0]) * KM).toFixed(1) + '" height="12" fill="' + s[2] + '" stroke="rgba(0,0,0,.35)" stroke-width=".6"/>';
  });
  [[0, '0'], [660, '660'], [2890, '2890'], [5150, '5150'], [6371, '6371 km']].forEach(function (t, i) {
    var x = BX + t[0] * KM;
    bar += '<text class="lbl-muted" x="' + x.toFixed(1) + '" y="574" font-size="10.5" text-anchor="' + (i === 0 ? 'start' : i === 4 ? 'end' : 'middle') + '">' + t[1] + '</text>';
  });
  var backdrop = defs +
    '<text class="lbl" x="14" y="22" font-size="16">A Föld szerkezete – kivágott gömb</text>' +
    '<text class="lbl-muted" x="14" y="40">a vékony külső rétegeket vastagabbra rajzoltuk · a valódi arányok lent</text>' +
    '<path d="M' + CX + ' 78 L' + CX + ' 524" stroke="#8a93a3" stroke-width="1.2" stroke-dasharray="6 4"/>' +
    '<text class="lbl-muted" x="' + (CX - 6) + '" y="88" font-size="11" text-anchor="end">É</text>' +
    '<text class="lbl-muted" x="' + (CX + 6) + '" y="531" font-size="11">D</text>' +
    '<text class="lbl-muted" x="' + BX + '" y="542" font-size="10.5">Valódi arányok a felszíntől a középpontig (mélység)</text>' + bar;

  /* ---------- 1. Kéreg: kontinentális (vastag) és óceáni (vékony) a cikkben ---------- */
  var AM = -62;                                   // itt vált a kontinentális kéreg óceánira
  var crust = sector(184, 200, A0, AM, '#b08d63') + sector(190, 196, AM, A1, '#5f5b68') +
    sector(196, 200, AM, A1, '#3f8fd6', ' stroke="#1d4f8a" stroke-width=".8"') +
    '';
  for (var ga = A0 + 4; ga < AM - 2; ga += 6) { var g1 = p(186, ga), g2 = p(198, ga + 2); crust += '<path d="M' + f(g1) + ' L' + f(g2) + '" stroke="rgba(60,35,15,.35)" stroke-width="1"' + NS + '/>'; }

  /* ---------- 2. Litoszféra-köpeny + asztenoszféra ---------- */
  var litho = sector(164, 176, A0, A1, 'url(#fd-melt)') + sector(176, 184, A0, A1, '#8b6447') + sector(184, 190, AM, A1, '#8b6447') +
    edgeLbl(172, '≈100 km');

  /* ---------- 3. Felső köpeny (átmeneti zónával) ---------- */
  var upper = sector(146, 164, A0, A1, 'url(#fd-uman)') +
    arc(155, A0 + 1, A1 - 1, ' stroke="rgba(255,235,200,.75)" stroke-width="1.2" stroke-dasharray="4 3"' + NS) +
    edgeLbl(146, '660 km');

  /* ---------- 4. Alsó köpeny ---------- */
  var lower = sector(109, 146, A0, A1, 'url(#fd-lman)') +
    curvedArrow(138, -62, -42, 'rgba(255,230,200,.85)') + curvedArrow(118, -40, -60, 'rgba(255,230,200,.85)') +
    inLbl(127, -77, 'alsó köpeny', '#fff3e6');

  /* ---------- 5. Külső mag ---------- */
  var outer = sector(38, 109, A0, A1, 'url(#fd-ocore)') +
    curvedArrow(92, -84, -66, 'rgba(120,40,0,.55)') + curvedArrow(88, -26, -42, 'rgba(120,40,0,.55)') +
    inLbl(74, -55, 'külső mag');
  var olq = p(74, -55);
  outer += '<text x="' + olq[0].toFixed(1) + '" y="' + (olq[1] + 17).toFixed(1) + '" font-size="9.5" fill="#5a2a08" text-anchor="middle"' + NS + '>folyékony vas</text>';

  /* ---------- 6. Belső mag ---------- */
  var inner = sector(0, 38, A0, A1, 'url(#fd-icore)') + edgeLbl(38, '5150 km') +
    '<circle cx="' + CX + '" cy="' + CY + '" r="2.5" fill="#7a4a00"' + NS + '/>' +
    '<text x="' + (CX - 7) + '" y="' + (CY + 16) + '" font-size="10.5" font-weight="700" fill="#fff" stroke="rgba(10,20,40,.75)" stroke-width="3" paint-order="stroke" text-anchor="end"' + NS + '>6371 km</text>';

  /* ---------- 7. Mohorovičić-határ ---------- */
  function mohoPath(w, col, dash) {
    var a = p(184, A0), b = p(184, AM), c = p(190, AM), d = p(190, A1);
    return '<path d="M' + f(a) + ' A184 184 0 0 1 ' + f(b) + ' L' + f(c) + ' A190 190 0 0 1 ' + f(d) + '" fill="none" stroke="' + col + '" stroke-width="' + w + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' stroke-linejoin="round"/>';
  }
  var moho = mohoPath(9, 'transparent') + mohoPath(4.2, '#2b2140') + mohoPath(2.2, '#ffe14d', '6 3') + edgeLbl(186, '5–70 km');

  /* ---------- 8. Gutenberg-határ (mag–köpeny határ) ---------- */
  var gut = arc(109, A0, A1, ' stroke="transparent" stroke-width="10"') + arc(109, A0, A1, ' stroke="#3b0d0d" stroke-width="5"') +
    arc(109, A0, A1, ' stroke="#ff5a3c" stroke-width="2.6"') + edgeLbl(109, '2890 km');

  /* ---------- 9. Vízburok: az óceánok a gömb felszínén ---------- */
  var ocean = '<path d="' + bodyD + '" fill="url(#fd-ocean)" stroke="#1b4c86" stroke-width="1.4"/>' +
    '<path d="M' + CX + ' ' + CY + ' L' + f(p(R, A1)) + ' M' + CX + ' ' + CY + ' L' + f(p(R, A0)) + '" stroke="rgba(10,25,50,.55)" stroke-width="1.6"' + NS + '/>';

  /* ---------- 10. Kőzetlemezek: kontinensek, lemezhatárok a felszínen + betét a három határtípussal ---------- */
  var LAND = ' fill="url(#fd-land)" stroke="#4d6b33" stroke-width="1" stroke-linejoin="round"';
  var plates = '<g clip-path="url(#fd-body)">' +
    '<path d="M118 214 C132 186 166 160 206 152 C232 148 246 160 244 176 C240 194 222 206 214 226 C206 246 222 262 214 280 C204 296 186 300 176 290 C166 278 150 268 136 262 C120 254 108 236 118 214 Z"' + LAND + '/>' +
    '<path d="M230 128 C244 122 262 124 268 134 C270 146 258 156 244 156 C232 156 224 140 230 128 Z"' + LAND + '/>' +
    '<path d="M206 304 C222 296 246 300 262 314 C278 330 276 352 264 376 C252 402 240 432 226 456 C218 470 206 468 204 452 C200 420 196 392 190 364 C184 338 190 312 206 304 Z"' + LAND + '/>' +
    '<path d="M300 262 C326 250 366 250 392 262 C410 272 420 290 414 310 C406 334 394 352 380 376 C368 398 356 420 342 432 C330 440 320 430 318 414 C314 390 316 366 306 348 C296 330 280 316 284 298 C286 282 290 270 300 262 Z"' + LAND + '/>' +
    '<path d="M318 272 C340 262 376 264 394 276 C400 290 386 300 366 300 C346 302 322 296 318 272 Z" fill="#d2b77a" stroke="none"/>' +
    '<path d="M222 502 C250 494 300 492 352 500 C330 512 260 514 222 502 Z"' + LAND.replace('url(#fd-land)', '#e6eef5') + '/>' +
    '<path d="M262 116 C254 160 246 200 258 236 C268 266 252 290 262 318 C272 346 286 360 282 392 C278 424 276 460 268 506" fill="none" stroke="#7a1414" stroke-width="4" stroke-linecap="round" opacity=".55"/>' +
    '<path d="M262 116 C254 160 246 200 258 236 C268 266 252 290 262 318 C272 346 286 360 282 392 C278 424 276 460 268 506" fill="none" stroke="#ff6b4a" stroke-width="2" stroke-dasharray="5 3" stroke-linecap="round"/>' +
    '<path d="M136 304 C126 340 128 390 150 430 C166 456 180 474 198 488" fill="none" stroke="#ff6b4a" stroke-width="2" stroke-dasharray="5 3" stroke-linecap="round"/>' +
    '<path d="M402 330 C420 360 432 400 440 440" fill="none" stroke="#ff6b4a" stroke-width="2" stroke-dasharray="5 3" stroke-linecap="round"/>' +
    '</g>';
  function panel(y0, h, title, sub) {
    return '<rect x="598" y="' + y0 + '" width="194" height="' + h + '" rx="9" fill="rgba(127,141,176,.13)" stroke="#7f8db0" stroke-width="1"/>' +
      '<text class="lbl" x="606" y="' + (y0 + 15) + '" font-size="11.5">' + title + '</text>' +
      '<text class="lbl-muted" x="606" y="' + (y0 + 28) + '" font-size="10">' + sub + '</text>';
  }
  var MANT = '#d9774a', OCR = '#5f5b68', CCR = '#b08d63', SEA = '#4f9be0', W = '#ffffff';
  var y1 = 58, y2 = 176, y3 = 294;
  plates += panel(y1, 110, 'Szétváló (divergens)', 'óceánközépi hátság, pl. Izland') +
    '<rect x="604" y="' + (y1 + 64) + '" width="182" height="40" fill="' + MANT + '"/>' +
    '<rect x="604" y="' + (y1 + 36) + '" width="182" height="20" fill="' + SEA + '"/>' +
    '<path d="M604 ' + (y1 + 56) + ' L684 ' + (y1 + 56) + ' L692 ' + (y1 + 48) + ' L692 ' + (y1 + 66) + ' L604 ' + (y1 + 66) + ' Z" fill="' + OCR + '" stroke="#2d2a33"/>' +
    '<path d="M786 ' + (y1 + 56) + ' L706 ' + (y1 + 56) + ' L698 ' + (y1 + 48) + ' L698 ' + (y1 + 66) + ' L786 ' + (y1 + 66) + ' Z" fill="' + OCR + '" stroke="#2d2a33"/>' +
    '<path d="M672 ' + (y1 + 104) + ' Q695 ' + (y1 + 80) + ' 692 ' + (y1 + 50) + ' L698 ' + (y1 + 50) + ' Q695 ' + (y1 + 80) + ' 718 ' + (y1 + 104) + ' Z" fill="#ffb03a" stroke="#c0581a"/>' +
    arrowH(660, y1 + 61, 620, W) + arrowH(730, y1 + 61, 770, W) +
    '<path d="M682 ' + (y1 + 98) + ' Q660 ' + (y1 + 80) + ' 640 ' + (y1 + 86) + ' M708 ' + (y1 + 98) + ' Q730 ' + (y1 + 80) + ' 750 ' + (y1 + 86) + '" fill="none" stroke="rgba(255,240,210,.85)" stroke-width="1.6"' + NS + '/>';
  plates += panel(y2, 110, 'Közeledő (alábukás)', 'árok és vulkánok, pl. Andok') +
    '<rect x="604" y="' + (y2 + 52) + '" width="182" height="52" fill="' + MANT + '"/>' +
    '<rect x="604" y="' + (y2 + 40) + '" width="96" height="12" fill="' + SEA + '"/>' +
    '<path d="M604 ' + (y2 + 52) + ' L692 ' + (y2 + 52) + ' Q712 ' + (y2 + 56) + ' 744 ' + (y2 + 104) + ' L728 ' + (y2 + 104) + ' Q702 ' + (y2 + 66) + ' 688 ' + (y2 + 62) + ' L604 ' + (y2 + 62) + ' Z" fill="' + OCR + '" stroke="#2d2a33"/>' +
    '<path d="M700 ' + (y2 + 40) + ' L742 ' + (y2 + 44) + ' L752 ' + (y2 + 30) + ' L762 ' + (y2 + 44) + ' L786 ' + (y2 + 44) + ' L786 ' + (y2 + 74) + ' L744 ' + (y2 + 78) + ' Q714 ' + (y2 + 58) + ' 700 ' + (y2 + 52) + ' Z" fill="' + CCR + '" stroke="#5a4426"/>' +
    '<path d="M752 ' + (y2 + 30) + ' L748 ' + (y2 + 24) + ' M752 ' + (y2 + 30) + ' L756 ' + (y2 + 22) + '" stroke="#e0402e" stroke-width="2" stroke-linecap="round"' + NS + '/>' +
    '<path d="M740 ' + (y2 + 92) + ' Q750 ' + (y2 + 70) + ' 752 ' + (y2 + 36) + '" fill="none" stroke="#ffb03a" stroke-width="2.4" stroke-dasharray="4 3"' + NS + '/>' +
    arrowH(620, y2 + 57, 662, W);
  plates += panel(y3, 110, 'Elcsúszó (transzform)', 'felülnézet, pl. Szent András') +
    '<rect x="604" y="' + (y3 + 36) + '" width="182" height="32" fill="#c2a872" stroke="#6b5a36" stroke-width=".8"/>' +
    '<rect x="604" y="' + (y3 + 68) + '" width="182" height="34" fill="#a68a5c" stroke="#6b5a36" stroke-width=".8"/>' +
    '<path d="M680 ' + (y3 + 36) + ' L680 ' + (y3 + 68) + ' M712 ' + (y3 + 68) + ' L712 ' + (y3 + 102) + '" stroke="#2f7cc4" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M604 ' + (y3 + 68) + ' L786 ' + (y3 + 68) + '" stroke="#c0392b" stroke-width="2.4" stroke-dasharray="7 4"/>' +
    arrowH(770, y3 + 52, 730, '#3a2a10') + arrowH(620, y3 + 86, 660, '#3a2a10');

  /* ---------- 11. Légkör: fénylő burok + betét a rétegekkel ---------- */
  var air = '<circle cx="' + CX + '" cy="' + CY + '" r="207" fill="none" stroke="rgba(110,180,245,.45)" stroke-width="14"/>' +
    '<circle cx="' + CX + '" cy="' + CY + '" r="214" fill="none" stroke="rgba(110,180,245,.6)" stroke-width="1"/>';
  var AY = 412, layers = [
    ['troposzféra', '0–12 km · időjárás, felhők', 28, '#9fd3f5'],
    ['sztratoszféra', '12–50 km · ózonréteg', 30, '#6fa9e0'],
    ['mezoszféra', '50–85 km · meteorok', 26, '#4f78c0'],
    ['termoszféra', '85–600 km · sarki fény, ISS', 28, '#3a4f96'],
    ['exoszféra', '600 km felett · ritka gáz', 24, '#2b3366']
  ];
  air += '<rect x="598" y="' + AY + '" width="194" height="166" rx="9" fill="rgba(127,141,176,.13)" stroke="#7f8db0" stroke-width="1"/>' +
    '<text class="lbl" x="606" y="' + (AY + 15) + '" font-size="11.5">A légkör rétegei</text>';
  var yb = AY + 162;
  layers.forEach(function (l) {
    yb -= l[2];
    air += '<rect x="606" y="' + yb + '" width="26" height="' + l[2] + '" fill="' + l[3] + '" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>' +
      '<text class="lbl" x="638" y="' + (yb + 11) + '" font-size="10.5">' + l[0] + '</text>' +
      '<text class="lbl-muted" x="638" y="' + (yb + 22) + '" font-size="9.5">' + l[1] + '</text>';
  });
  air += '<path d="M608 ' + (AY + 124) + ' L630 ' + (AY + 124) + '" stroke="#ffd34d" stroke-width="2.4"' + NS + '/>';

  /* ---------- 12. Mágneses tér: dipólus erővonalak, a forgástengelyhez kb. 10°-ban dőlve ---------- */
  var TILT = 10 * Math.PI / 180, MAG = '#a35bd6';
  function rot(x, y) { return [CX + x * Math.cos(TILT) - y * Math.sin(TILT), CY + x * Math.sin(TILT) + y * Math.cos(TILT)]; }
  var mag = '';
  [1.13, 1.27, 1.42].forEach(function (k) {
    var L = k * R, th0 = Math.asin(Math.sqrt(R / L));
    [1, -1].forEach(function (side) {
      var d = '';
      for (var i = 0; i <= 40; i++) {
        var th = th0 + (Math.PI - 2 * th0) * i / 40, r = L * Math.sin(th) * Math.sin(th);
        var q = rot(side * r * Math.sin(th), -r * Math.cos(th));
        d += (i ? ' L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1);
      }
      mag += '<path d="' + d + '" fill="none" stroke="transparent" stroke-width="8"/><path d="' + d + '" fill="none" stroke="' + MAG + '" stroke-width="1.8" stroke-opacity=".9"/>';
      var a = rot(side * L, 0), b = rot(side * L, -8);     // nyílhegy az egyenlítőnél: délről észak felé
      var ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
      mag += '<path d="M' + (a[0] - 6 * Math.cos(ang - 0.5)).toFixed(1) + ' ' + (a[1] - 6 * Math.sin(ang - 0.5)).toFixed(1) + ' L' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' L' +
        (a[0] - 6 * Math.cos(ang + 0.5)).toFixed(1) + ' ' + (a[1] - 6 * Math.sin(ang + 0.5)).toFixed(1) + '" fill="none" stroke="' + MAG + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    });
  });
  var mt = rot(0, -236), mb = rot(0, 226);
  mag += '<path d="M' + mt[0].toFixed(1) + ' ' + mt[1].toFixed(1) + ' L' + mb[0].toFixed(1) + ' ' + mb[1].toFixed(1) + '" stroke="' + MAG + '" stroke-width="1.4" stroke-dasharray="2 4"/>' +
    '<text x="' + (mt[0] + 6).toFixed(1) + '" y="' + (mt[1] + 8).toFixed(1) + '" font-size="10.5" font-weight="700" fill="' + MAG + '"' + NS + '>mágneses tengely</text>';

  STUDIE.addModel({
    id: 'fold',
    title: 'A Föld szerkezete',
    icon: '🌍',
    color: '#0e9aa7',
    category: 'Természettudomány',
    keywords: 'Föld szerkezete gömbhéjak kéreg óceáni kéreg kontinentális kéreg litoszféra asztenoszféra köpeny felső köpeny alsó köpeny átmeneti zóna mag külső mag belső mag Moho Mohorovičić-határ Gutenberg-határ Lehmann-határ kőzetlemez lemeztektonika lemezhatár alábukás szubdukció óceánközépi hátság transzform vető földrengés szeizmikus hullám P-hullám S-hullám árnyékzóna vulkán légkör troposzféra sztratoszféra ózon vízburok óceán mágneses tér geodinamó Wegener Eötvös torziós inga Eratoszthenész',
    summary: 'Egy 6371 km sugarú, rétegzett gömb: vékony kőzethéj, lassan áramló forró köpeny, folyékony és szilárd vasmag, körülötte víz, levegő és mágneses pajzs.',
    scale: 'sugár 6371 km, tömeg 5,97 · 10²⁴ kg, átlagsűrűség 5,5 g/cm³',
    viewBox: '0 0 800 582',
    backdrop: backdrop,
    intro: 'A Föld olyan, mint egy **hagyma** vagy egy őszibarack: rétegekből (gömbhéjakból) áll. Kívül a vékony, szilárd **kéreg**, alatta a vastag, forró **köpeny**, legbelül a vasból és nikkelből álló **mag**, amelynek külső része folyékony, belső része szilárd. A rétegek a Föld születésekor **sűrűség szerint** váltak szét: a nehéz vas lesüllyedt, a könnyebb kőzetek felúsztak.\n\nA felszínt víz (**vízburok**) és levegő (**légkör**) borítja, körülötte pedig a folyékony magban keletkező **mágneses tér** véd a Napból érkező részecskéktől. A belsejébe senki sem látott bele: amit tudunk, főleg a **földrengéshullámok** „átvilágításából” tudjuk.',
    parts: [
      {
        id: 'kereg', z: 11, name: 'Földkéreg (óceáni és kontinentális)', svg: crust, explode: ex(64), badge: bp(192, -88), lesson: 'foldrajz/fold-szerkezete', en: 'crust: oceanic and continental',
        terms: ['mechanika/rugalmassagi-modulus'],
        what: 'A Föld legkülső, szilárd kőzethéja, amelyen élünk. Kétféle van: az **óceáni kéreg** vékony (5–10 km) és nehezebb, az óceánok alját alkotja; a **kontinentális kéreg** vastag (átlag 35 km, hegységek alatt 60–70 km) és könnyebb, ezért „magasabban úszik”. A rajzon a barna, vastag sáv a kontinentális, a szürke, vékony az óceáni kéreg, rajta a kék tengervíz. Ha a Föld egy alma lenne, a kéreg vékonyabb lenne, mint az alma héja.',
        madeOf: 'A kontinentális kéreg felső része **gránitszerű** kőzetekből (kvarc, földpátok, csillámok), alsó része sötétebb, sűrűbb kőzetekből áll; átlagsűrűsége kb. **2,7 g/cm³**. Az óceáni kéreg **bazaltból** és **gabbróból** (sok vas és magnézium) áll, sűrűsége kb. **3,0 g/cm³**. A kéreg leggyakoribb elemei: oxigén (46%), szilícium (28%), alumínium, vas, kalcium.',
        how: 'Az óceáni kéreg folyamatosan **újratermelődik**: az óceánközépi hátságokon a feláramló magma megszilárdul, a lemezhatárokon pedig visszabukik a köpenybe. Ezért a legidősebb óceáni kéreg is csak kb. **180 millió éves**. A kontinentális kéreg túl könnyű ahhoz, hogy elnyelődjön: évmilliárdok alatt halmozódott fel vulkánossággal, hegységképződéssel, és a legidősebb kőzetei **4 milliárd év** körüliek (a legidősebb ásványszemcsék 4,4 milliárd évesek).',
        uni: 'A kéreg a hegyek alatt vastagabb, mert **izosztatikus egyensúlyban** „úszik” a sűrűbb köpenyen (Airy-modell): a hegység h magasságához `t = h·ρ_k/(ρ_m − ρ_k)` mélységű „gyökér” tartozik, ρ_k ≈ 2,7, ρ_m ≈ 3,3 g/cm³ mellett kb. 4,5-szöröse. A szeizmikus P-hullám sebessége a kéregben 5,5–7 km/s, ez a rugalmassági modulusból és a sűrűségből adódik: `v_P = √((K + 4G/3)/ρ)`. Az óceáni kéreg rétegsora (ofiolit-sorozat): üledék, párnaláva, telérkomplexum, gabbró.',
        fact: 'A legmélyebb fúrás (Kola-félsziget, 1989) 12,2 km mélyre jutott, de így sem érte el a kontinentális kéreg alját: ott már 180 °C volt.'
      },
      {
        id: 'litoszfera', z: 10, name: 'Litoszféra és asztenoszféra', svg: litho, explode: ex(52), badge: bp(172, -78), lesson: 'foldrajz/fold-szerkezete', en: 'lithosphere (rigid plates) and asthenosphere (weak, partially molten mantle)',
        terms: ['mechanika/folyashatar', 'mechanika/alakvaltozas'],
        what: 'A **litoszféra** (kőzetburok) a kéreg és a köpeny legfelső, merev része együtt: kb. 100 km vastag (az óceánok alatt vékonyabb, a régi kontinensek alatt 200 km-nél is vastagabb). Ez darabolódik **kőzetlemezekre**. Alatta van az **asztenoszféra** (a rajzon pöttyös narancs sáv): forró, képlékeny réteg, amelyen a lemezek évente néhány centimétert **csúsznak**, mint jégtáblák a sűrű folyón.',
        madeOf: 'A litoszféra alsó része a köpeny kőzete, **peridotit** (főleg olivin és piroxén ásványok), csak hidegebb és ezért merev. Az asztenoszféra ugyanez a kőzet, de olyan forró (kb. 1300 °C), hogy **1–2%-a megolvad**: a vékony olvadékhártyák a kristályok között „megkenik”, így lassan folyni tud.',
        how: 'A litoszféra **hűléssel** vastagodik: az óceáni lemez a hátságon születik vékonyan és forrón, aztán ahogy távolodik, kihűl, megvastagszik, nehezebb lesz, és mélyebbre süllyed. Kb. 100–150 millió év alatt olyan nehéz lesz, hogy az alábukási zónában visszasüllyed a köpenybe. A lemez és az asztenoszféra határa valójában egy **hőmérsékleti határ** (kb. 1300 °C-os izoterma).',
        uni: 'A különbség **reológiai**, nem összetételbeli: a litoszféra rugalmasan és törésesen viselkedik, az asztenoszféra viszkózusan folyik (viszkozitás kb. 10¹⁹–10²⁰ Pa·s). Ezt a jégkorszak utáni **izosztatikus kiemelkedés** mutatja: Skandinávia ma is évi kb. 1 cm-rel emelkedik, ahogy az asztenoszféra lassan visszaáramlik a leolvadt jégtakaró helyére. Az asztenoszférában a szeizmikus hullámok lelassulnak (**kis sebességű zóna**, LVZ, kb. 80–200 km mélyen). Az óceáni litoszféra vastagsága kb. `√(κ·t)`-vel nő (félvégtelen hűlő test modell), ezért az óceán mélysége is a kéreg korának négyzetgyökével nő.',
        fact: 'A lemezek nagyjából olyan gyorsan mozognak, ahogy a körmöd nő: évente 2–10 cm-t.'
      },
      {
        id: 'felso-kopeny', z: 9, name: 'Felső köpeny', svg: upper, explode: ex(42), badge: bp(155, -20), lesson: 'foldrajz/fold-szerkezete', en: 'upper mantle and transition zone (410–660 km)',
        terms: ['kemia-bsc/le-chatelier', 'mechanika/alakvaltozas'],
        what: 'A kéreg alatt kb. **660 km** mélységig tartó, forró, szilárd kőzetréteg (a litoszféra alsó része és az asztenoszféra is ide tartozik). Bár szilárd, évmilliók alatt lassan **áramlik**, mint egy nagyon sűrű méz. Alsó részén, 410 és 660 km között van az **átmeneti zóna** (a rajzon szaggatott vonal jelzi a 410 km-es határt), ahol a nagy nyomás átrendezi az ásványok kristályszerkezetét.',
        madeOf: '**Peridotit**, amelynek fő ásványa a zöld **olivin** (vas-magnézium-szilikát), mellette piroxén és gránát. Az átmeneti zónában az olivin nagy nyomáson sűrűbb ásványokká alakul (wadsleyit, majd ringwoodit). Ezekben az ásványokban jelentős mennyiségű **víz** (hidroxilcsoport) lehet kötve: talán több, mint az összes óceánban.',
        how: 'A felső köpeny anyaga a Föld kialakulásakor vált el a magtól és a kéregtől. Ma is folyamatosan „dolgozik”: ahol a forró anyag felemelkedik és a nyomás csökken, részlegesen **megolvad**, ez a magma táplálja a vulkánokat. A vulkánok néha köpenydarabokat (**xenolitokat**) is felhoznak: ezekből tudjuk közvetlenül, milyen kőzet van odalent.',
        uni: 'A 410 és 660 km-es **szeizmikus diszkontinuitások** fázisátalakulások: olivin → wadsleyit (410 km, pozitív Clapeyron-meredekség), ringwoodit → bridgmanit + ferroperikláz (660 km, negatív Clapeyron-meredekség). Az utóbbi részben gátolja a köpenyáramlást, ezért egyes alábukó lemezek „elakadnak” a 660 km-en (**stagnáló lemezek**), mások áttörnek az alsó köpenybe. A hőmérséklet az átmeneti zónában 1500–1700 °C. A mélyfészkű (300–700 km) földrengések ebben a tartományban az alábukó lemezekben pattannak ki.',
        fact: 'Az olivin drágakő változata a **peridot**: zöld színe a köpeny kőzetének színe is. Hawaii egyes strandjain olivinszemcsékből álló zöld homok van.'
      },
      {
        id: 'also-kopeny', z: 9, name: 'Alsó köpeny', svg: lower, explode: ex(30), badge: bp(128, -30), lesson: 'foldrajz/fold-szerkezete', en: 'lower mantle',
        terms: ['fizika-bsc/radioaktiv-bomlas', 'fizika-bsc/belso-energia'],
        what: 'A Föld legnagyobb térfogatú rétege: 660 km-től **2890 km** mélységig tart, a bolygó térfogatának kb. felét adja. Szilárd, de nagyon forró (alján kb. 3500–4000 °C) kőzet, amely évmilliók alatt lassan **körbeáramlik** (köpenyáramlás, a rajzon a nyilak): az alján felmelegedett anyag emelkedik, a felül lehűlt süllyed. Ez a lassú „forrás” mozgatja a kőzetlemezeket.',
        madeOf: 'Főleg **bridgmanit** (perovszkit-szerkezetű magnézium-vas-szilikát, a Föld leggyakoribb ásványa!) és **ferroperikláz** (magnézium-vas-oxid). Sűrűsége lefelé 4,4-ről kb. 5,6 g/cm³-re nő a nyomás miatt. A köpeny alján, a magnál van a sokat kutatott **D″ réteg**, és két kontinensnyi, szokatlan „folt” (LLSVP).',
        how: 'A köpeny hőjének két forrása van: a Föld születéséből megmaradt **ősi hő** és a kőzetekben lévő **radioaktív elemek** (urán, tórium, kálium-40) bomlása. A hő a mag felől és belülről felfelé halad, és **hőáramlással** (konvekcióval) távozik. A forró **köpenycsóvák** (pl. Hawaii, Izland alatt) talán egészen a mag–köpeny határtól emelkednek fel.',
        uni: 'A köpeny szilárd, de **kúszással** folyik: viszkozitása kb. 10²¹–10²² Pa·s. A konvekció erősségét a **Rayleigh-szám** jellemzi: `Ra = ρ·g·α·ΔT·d³/(κ·η)`, a köpenyre kb. 10⁷, jóval a kritikus érték (≈ 10³) felett, tehát a köpeny hevesen konvektál. A Föld teljes hőárama kb. **47 TW**, ennek nagyjából fele radioaktív bomlásból származik (ezt a **geoneutrínó**-mérések is alátámasztják). A **szeizmikus tomográfia** (sok ezer földrengés terjedési idejének „visszaszámolása”) 3D-képet ad a köpeny hidegebb (gyorsabb) és melegebb (lassabb) tartományairól.',
        fact: 'A köpeny egy-egy „átfordulása” (egy anyagdarab felemelkedése és lesüllyedése) több száz millió évig tart.'
      },
      {
        id: 'kulso-mag', z: 8, name: 'Külső mag (folyékony)', svg: outer, explode: ex(18), badge: bp(92, -88), lesson: 'foldrajz/fold-szerkezete', en: 'liquid outer core (geodynamo)',
        terms: ['fizika-bsc/faraday-indukcio', 'fizika-bsc/lorentz-ero'],
        what: '2890 km-től **5150 km** mélységig tartó, **folyékony** fémréteg. A hőmérséklete 4000–5000 °C körüli. A benne kavargó, áramló folyékony fém elektromos áramokat kelt, és ezek hozzák létre a Föld **mágneses terét** (geodinamó): ezért mutat észak felé az iránytű.',
        madeOf: 'Főleg **vas** (kb. 85%) és **nikkel** (kb. 5%), plusz kb. 10% könnyebb elem: kén, oxigén, szilícium, talán hidrogén. Sűrűsége 9,9–12,2 g/cm³. Hígan folyik, nagyjából úgy, mint a víz.',
        how: 'A mag a Föld születése utáni néhány tízmillió évben jött létre, amikor a megolvadt bolygóban a nehéz vas cseppekben **lesüllyedt** a középpontba (ez a „vaskatasztrófa”). A külső magot alulról a kristályosodó belső mag és a felszabaduló hő, felülről a köpeny hűti: emiatt **hőáramlás** és összetételi áramlás indul, a Föld forgása pedig (a Coriolis-erő révén) oszlopokká, spirálokká rendezi az áramlást.',
        uni: 'A geodinamó önfenntartó: a vezető folyadék áramlása a meglévő mágneses térben **indukált áramot** kelt (Faraday), az áram mágneses tere erősíti az eredetit. A folyamatot a mágneses indukciós egyenlet írja le: `∂B/∂t = ∇×(v×B) + η_m·∇²B`; a dinamóhoz a **mágneses Reynolds-szám** `Rm = v·L/η_m` ≫ 1 kell (a külső magra ≈ 10³). Az áramlás sebessége kb. 0,5 mm/s (évi 10–20 km), ezt a tér lassú „nyugati irányú vándorlásából” mérik. A Lorentz-erő visszahat az áramlásra: ez korlátozza a tér erősségét.',
        fact: 'A mágneses tér az elmúlt 83 millió évben több százszor **megfordult**: legutóbb kb. 780 000 éve. Ezt az óceáni kéreg csíkos mágnesezettsége őrzi.'
      },
      {
        id: 'belso-mag', z: 8, name: 'Belső mag (szilárd)', svg: inner, explode: ex(6), badge: bp(20, -55), lesson: 'foldrajz/fold-szerkezete', en: 'solid inner core',
        terms: ['fizika-bsc/impulzusmomentum', 'mechanika/tehetetlensegi-nyomatek'],
        what: 'A Föld közepe, 5150 km-től a **6371 km**-es középpontig: kb. 1220 km sugarú, **szilárd** vasgolyó, nagyjából a Hold kétharmadának megfelelő méretű. Bár a hőmérséklete kb. **5200–5400 °C** (olyan forró, mint a Nap felszíne), a hatalmas nyomás (a légköri nyomás kb. 3,6 milliószorosa) miatt nem tud megolvadni.',
        madeOf: '**Vas–nikkel ötvözet**, kevés könnyű elemmel. Sűrűsége kb. 12,8–13 g/cm³. A vasatomok valószínűleg szoros illeszkedésű (hexagonális) kristályrácsban rendeződnek, a kristályok tájolása a hullámsebességek alapján rendezett (**anizotrópia**: a sarkok irányában gyorsabbak a hullámok).',
        how: 'A belső mag **lassan nő**: ahogy a Föld hűl, a külső mag alján folyamatosan vas **kristályosodik ki**, évente kb. 1 mm-nyi. A becslések szerint a belső mag csak 0,5–1,5 milliárd éve létezik, a Föld története nagy részében teljesen folyékony volt a mag. A kristályosodáskor felszabaduló hő és a visszamaradó könnyű elemek felemelkedése hajtja a geodinamót.',
        uni: 'A Föld **tehetetlenségi nyomatéki tényezője** `I/(M·R²) = 0,3307`, kisebb a homogén gömb 0,4-es értékénél: ez önmagában bizonyítja, hogy a tömeg a középpont felé sűrűsödik. A belső mag nyíróhullámokat (PKJKP) is vezet, ami szilárdságát bizonyítja, bár az S-hullám sebessége szokatlanul kicsi (kb. 3,6 km/s), talán a közel olvadáspontú állapot miatt. A belső mag kissé eltérő szögsebességgel foroghat a köpenyhez képest (**szuperrotáció** vagy oszcilláció): ezt az ismétlődő földrengések hullámainak apró változásaiból próbálják kimutatni.',
        fact: 'A belső magot egy dán nő, **Inge Lehmann** fedezte fel 1936-ban, a földrengéshullámok „árnyékzónájában” megjelenő gyenge jelekből.'
      },
      {
        id: 'moho', z: 12, name: 'Mohorovičić-határ (Moho)', svg: moho, explode: ex(58), badge: bp(190, -26), lesson: 'foldrajz/fold-szerkezete', en: 'Mohorovičić discontinuity (Moho): crust–mantle boundary',
        terms: ['fizika-bsc/hullamegyenlet'],
        what: 'A **kéreg és a köpeny határa** (a rajzon sárga szaggatott vonal). Az óceánok alatt 5–10 km, a kontinensek alatt átlag 35 km, a magas hegységek alatt 60–70 km mélyen húzódik. Itt a földrengéshullámok **hirtelen felgyorsulnak**, mert a köpeny kőzete sűrűbb és merevebb.',
        madeOf: 'Nem anyag, hanem **határfelület**: fölötte a kéreg bazaltos vagy gránitos kőzetei, alatta a köpeny peridotitja. Vastagsága néhány száz métertől néhány kilométerig terjedő átmeneti sáv.',
        how: 'Andrija **Mohorovičić** horvát szeizmológus fedezte fel 1909-ben egy Zágráb melletti földrengés feljegyzéseiből. Észrevette, hogy kb. 200 km-nél távolabbi állomásokra a hullámok **két csoportban** érkeznek: egy közvetlen, lassabb úton, és egy mélyebben, egy gyorsabb rétegben haladó és visszatörő úton. A két beérkezési idő különbségéből kiszámolta a határ mélységét.',
        uni: 'A P-hullám sebessége a Mohónál kb. 6,7–7,2 km/s-ról **≈ 8,0–8,2 km/s**-ra ugrik. A határon a hullámok a **Snellius–Descartes-törvény** szerint törnek: `sin α₁/v₁ = sin α₂/v₂`; a kritikus szögben beeső hullám a határ mentén halad (**fejhullám**, Pn), és ez nagy távolságban megelőzi a közvetlen hullámot (Pg). A „keresztező távolságból” és a két egyenes menetidőgörbéből a réteg vastagsága kiszámítható. Ma a Mohót **reflexiós szeizmikával** (mesterséges rezgésforrással) és receiver-függvény módszerrel térképezik.',
        fact: 'A Pannon-medence alatt a kéreg vékony: a Moho csak kb. 25–30 km mélyen van, ezért Magyarországon a földhő a világátlagnál jóval nagyobb (gyógy- és termálvizek!).'
      },
      {
        id: 'gutenberg', z: 12, name: 'Gutenberg-határ (mag–köpeny határ)', svg: gut, explode: ex(24), badge: bp(109, -15), lesson: 'foldrajz/fold-szerkezete', en: 'Gutenberg discontinuity: core–mantle boundary (CMB)',
        terms: ['fizika-bsc/hullamegyenlet', 'mechanika/rugalmassagi-modulus'],
        what: 'A **köpeny és a mag határa** kb. **2890 km** mélyen (a rajzon piros vonal). Ez a Föld legélesebb határa: fölötte szilárd kőzet, alatta **folyékony fém**. A sűrűség itt kb. 5,6-ról 9,9 g/cm³-re ugrik, nagyobbat, mint a levegő és a kőzet közt a felszínen.',
        madeOf: 'Határfelület a szilikátkőzet (köpeny) és a vas–nikkel olvadék (külső mag) között. A határon néhol vékony, részben megolvadt **ultralassú zónák** (ULVZ) vannak, és a hőmérséklet több mint 1000 fokot ugrik.',
        how: 'Beno **Gutenberg** német-amerikai szeizmológus 1913-ban számította ki a mélységét kb. 2900 km-nek, nagyon pontosan. A felfedezés kulcsa: az **S-hullámok** (nyíróhullámok) nem jutnak át a magon, mert **folyadékban nem terjednek**. A P-hullámok átjutnak, de a határon erősen megtörnek, így a Földön egy gyűrű alakú **árnyékzóna** keletkezik (a rengés helyétől 103° és 142° közötti szögtávolságban), ahol alig érzékelhetők.',
        uni: 'Az S-hullám sebessége `v_S = √(G/ρ)`; folyadékban a nyírómodulus G = 0, ezért S-hullám nem terjed: a külső magban az S-hullám-sebesség nulla. A P-hullám a határon kb. 13,7 km/s-ról 8,1 km/s-ra lassul, ezért a sugarak a mag felé törnek (konvergáló „lencse”). A határról visszaverődő hullámok (PcP, ScS) és a magon áthaladók (PKP, SKS) menetidő-görbéiből határozzák meg a mélységet ± néhány km pontossággal. A mag–köpeny határon átáramló hő (kb. 5–15 TW) hajtja a geodinamót.',
        fact: 'A mag–köpeny határ domborzata a felszíninél is nagyobb lehet: a forró és hideg tartományok miatt néhány kilométeres „hegyek” és „völgyek” vannak rajta.'
      },
      {
        id: 'vizburok', z: 1, name: 'Vízburok (hidroszféra)', svg: ocean, explode: [0, 0], badge: [176, 404], lesson: 'foldrajz/vizburok', en: 'hydrosphere (oceans, ice, groundwater)',
        terms: ['fizika-bsc/belso-energia'],
        what: 'A Föld összes vize: óceánok, tengerek, jég, folyók, tavak, talajvíz, légköri pára. Az óceánok a felszín **71%-át** borítják, átlagos mélységük kb. **3700 m**, legmélyebb pontjuk a Mariana-árok (kb. 10 900 m). A víz **97%-a sós** tengervíz, az édesvíz nagy része jégben (Antarktisz, Grönland) van.',
        madeOf: 'Víz (H₂O), oldott **sókkal** (főleg nátrium-klorid, átlagosan kb. 3,5% sótartalom), oldott gázokkal (oxigén, szén-dioxid) és élőlényekkel. A tengervíz sűrűsége kb. 1,025 g/cm³.',
        how: 'A víz egy része a Földet felépítő kőzetekből **vulkáni gázként** szabadult fel, más része jeges **üstökösökkel és kisbolygókkal** érkezhetett; a Föld már kb. 4,4 milliárd éve óceánokkal borított lehetett. A víz azóta **körforgásban** van: párolog, felhővé áll össze, csapadékként lehull és lefolyik. Egy vízmolekula átlagosan kb. 9 napot tölt a légkörben, de akár 3000 évet a mélytengerben.',
        uni: 'A víz **fajhője** (4,18 kJ/(kg·K)) nagy, ezért az óceán óriási hőtároló: a felső 3 m-e annyi hőt tárol, mint a teljes légkör. Az óceán az ember által okozott többlethő **kb. 90%-át** elnyelte. A **termohalin cirkuláció** (a hőmérséklet és sótartalom okozta sűrűségkülönbség hajtotta mélyáramlás, „szállítószalag”) kb. 1000 év alatt forgatja át az óceánt. Az óceánok a kibocsátott CO₂ kb. negyedét is elnyelik, ami **savasodást** okoz (pH ≈ 8,2 → 8,1).',
        fact: 'Ha a Föld felszíne teljesen sima lenne, a víz egy kb. 2,7 km mély óceánnal borítaná be.'
      },
      {
        id: 'lemezek', z: 7, name: 'Kőzetlemezek és lemezhatárok', svg: plates, explode: [0, 0], badge: [778, 72], lesson: 'foldrajz/fold-szerkezete', en: 'tectonic plates and plate boundaries (divergent, convergent, transform)',
        terms: ['mechanika/feszultseg', 'mechanika/folyashatar'],
        what: 'A litoszféra kb. 7 nagy és több tucat kisebb **kőzetlemezre** tört, amelyek a kontinenseket és az óceánok alját hordozzák. A gömbön a piros szaggatott vonalak lemezhatárok (pl. az Atlanti-óceán közepén húzódó hátság). A lemezek háromféleképpen találkozhatnak (jobb oldali betét): **szétválnak** (új óceáni kéreg születik), **közelednek** (az egyik alábukik, vagy hegység gyűrődik fel), vagy **elcsúsznak** egymás mellett. A földrengések és vulkánok nagy része a lemezhatárokon van.',
        madeOf: 'Minden lemez **litoszféra**: kéreg + a köpeny merev felső része. Lehet óceáni (vékony, nehéz bazaltos kéreggel), kontinentális vagy vegyes. Pl. a Dél-amerikai-lemez a kontinenst és az Atlanti-óceán nyugati felét is hordozza.',
        how: 'A lemezeket több erő mozgatja: a lesüllyedő, nehéz lemezperem **húzása** az alábukási zónában (ez a legerősebb), a hátságok magasan fekvő, forró lemezének „lecsúszása” (**hátságtolás**), és a köpenyáramlás súrlódása. A kontinensek így folyamatosan vándorolnak: kb. 300 millió éve egyetlen őskontinens, a **Pangea** alkotta őket, és a jövőben ismét összeállhatnak.',
        uni: 'A lemezek mozgása egy gömbfelületen **Euler-pólus körüli forgás**: a relatív sebesség `v = ω × r`, nagysága `ω·R·sin Δ` (Δ a pólustól mért szögtávolság). Ma **GPS-szel** milliméteres pontossággal mérik. A három határtípusnak három feszültségi rezsim felel meg: széthúzás (normál vetők), összenyomás (feltolódások, a legnagyobb rengések, pl. 2011 Tóhoku M9,1), oldalirányú nyírás (transzform vetők). A rengések nagyságát a **szeizmikus nyomaték** írja le: `M₀ = μ·A·D` (nyírómodulus × vetőfelület × elmozdulás), ebből a nyomatéki magnitúdó `M_w = (2/3)·(lg M₀ − 9,1)`.',
        fact: 'Az Atlanti-óceán évente 2–3 cm-rel szélesebb lesz: Kolumbusz óta kb. 10–15 métert tágult.'
      },
      {
        id: 'legkor', z: 0, name: 'Légkör', svg: air, explode: [0, 0], badge: [101, 224], lesson: 'foldrajz/legkor', en: 'atmosphere (troposphere, stratosphere, mesosphere, thermosphere, exosphere)',
        terms: ['fizika-bsc/idealis-gaz'],
        what: 'A Földet körülvevő gázburok (a rajzon a gömb körüli kék derengés, erősen nagyítva). Rétegei (jobb alsó betét): a **troposzféra** (0–12 km), ahol az időjárás zajlik; a **sztratoszféra** (12–50 km) az **ózonréteggel**, amely elnyeli a Nap UV-sugárzásának nagy részét; a **mezoszféra** (50–85 km), ahol a meteorok elégnek; a **termoszféra** (85–600 km) a sarki fénnyel és a Nemzetközi Űrállomással; végül a ritka **exoszféra**.',
        madeOf: '**Nitrogén** (78%), **oxigén** (21%), argon (0,93%), szén-dioxid (kb. 0,042%), változó mennyiségű vízgőz, és nyomokban sok más gáz. A légkör tömegének fele 5,5 km alatt van, 99%-a 30 km alatt.',
        how: 'Az ősi légkör főleg vulkáni gázokból (vízgőz, CO₂, nitrogén) állt, oxigén nélkül. A szabad **oxigén** a fotoszintetizáló cianobaktériumoknak köszönhető: kb. 2,4 milliárd éve kezdett felhalmozódni (**nagy oxidációs esemény**). Az oxigénből a sztratoszférában az UV hatására **ózon** (O₃) lett, ami lehetővé tette a szárazföldi életet.',
        uni: 'A légnyomás a magassággal közelítőleg exponenciálisan csökken (**barometrikus magasságformula**): `p(h) = p₀·e^(−h/H)`, a skálamagasság `H = R·T/(M·g) ≈ 8 km`. A troposzférában a hőmérséklet kb. 6,5 K/km-rel csökken (nedves adiabatikus gradiens közelítése), a sztratoszférában az ózon UV-elnyelése miatt **nő**. Az üvegházhatás nélkül a felszín átlaghőmérséklete a sugárzási egyensúlyból `T = [S·(1−A)/(4σ)]^(1/4) ≈ 255 K` (−18 °C) lenne, a valóságban kb. 288 K (+15 °C).',
        fact: 'Ha a Föld egy kosárlabda nagyságú lenne, a légkör légzésre alkalmas része vékonyabb lenne, mint egy papírlap.'
      },
      {
        id: 'magneses-ter', z: 0, name: 'Mágneses tér (magnetoszféra)', svg: mag, explode: [0, 0], badge: [44, 296], lesson: 'fizika/elektromossag', en: 'geomagnetic field and magnetosphere',
        terms: ['fizika-bsc/lorentz-ero', 'fizika-bsc/faraday-indukcio', 'fizika-bsc/maxwell-egyenletek'],
        what: 'A Föld olyan, mintha a belsejében egy óriási, a forgástengelyhez képest kb. **10°-kal megdöntött** rúdmágnes lenne (a rajzon lila erővonalak). A teret valójában a folyékony külső mag áramlásai keltik. Ez a „pajzs”, a **magnetoszféra**, eltéríti a Napból érkező töltött részecskéket (napszél), amelyek a sarkok közelében a légkörbe jutva **sarki fényt** keltenek. Az iránytű ezért mutat (közelítőleg) észak felé.',
        madeOf: 'Mágneses mező, nem anyag. Erőssége a felszínen kb. **25–65 mikrotesla** (egy hűtőmágnesé ennek több százszorosa). A Nap felőli oldalon kb. 10 földsugárnyira összenyomódik, az éjszakai oldalon hosszú **csóvává** nyúlik.',
        how: 'A külső mag folyékony vasának áramlása elektromos áramokat kelt, ezek mágneses teret, amely további áramokat indukál: ez az önfenntartó **geodinamó**. A tér folyamatosan változik: a mágneses pólusok vándorolnak (az északi mágneses pólus ma évi 40–50 km-rel halad Szibéria felé), és a tér időnként **megfordul**. A kőzetekben lévő mágneses ásványok megőrzik a keletkezésük kori tér irányát: ebből olvasható ki a tér története (**paleomágnesség**).',
        uni: 'A felszíni teret a **gömbfüggvény-sorfejtés** írja le (IGRF modell); a domináns tag a dipólus, mágneses momentuma kb. `8·10²² A·m²`. Dipólustérben a térerősség `B = (μ₀·m/4π·r³)·√(1 + 3·sin²φ)` (φ a mágneses szélesség): a sarkoknál kétszer akkora, mint az egyenlítőn. A napszél töltött részecskéire `F = q·(v × B)` **Lorentz-erő** hat: spirálpályán mozognak az erővonalak mentén, és a sarkok felé tükröződve a **Van Allen-sugárzási övekben** csapdázódnak. A mágneses déli pólus a geográfiai északi sark közelében van: az iránytű északi pólusa ezt „keresi”.',
        fact: 'Az iránytű nem pontosan északra mutat: az eltérés (**deklináció**) Magyarországon ma kb. 5–6° kelet felé.'
      }
    ],
    uni: {
      text: 'A Föld belsejét főként **szeizmológiával** ismerjük: a földrengéshullámok terjedési sebessége a közeg rugalmas állandóitól és sűrűségétől függ, `v_P = √((K + 4G/3)/ρ)`, `v_S = √(G/ρ)`. Több ezer állomás menetidő-adataiból állították össze az **egydimenziós referenciamodelleket** (PREM, 1981; ak135), amelyek a sebességet és a sűrűséget a mélység függvényében adják meg. A modellt két független kényszer rögzíti: a Föld **tömege** (5,97·10²⁴ kg, átlagsűrűség 5,51 g/cm³, ami jóval nagyobb a felszíni kőzetek 2,7–3,0 g/cm³-énél) és a **tehetetlenségi nyomatéka** (`I = 0,3307·M·R²`). A sűrűség mélységbeli növekedését a homogén réteg önösszenyomódására vonatkozó **Adams–Williamson-egyenlet** írja le: `dρ/dr = −ρ(r)·g(r)/Φ`, ahol `Φ = v_P² − (4/3)·v_S²` a szeizmikus paraméter. A nyomás a középpontban kb. 360 GPa. A Föld hőháztartása: a felszíni hőáram átlagosan kb. 87 mW/m² (összesen ≈ 47 TW), ennek forrása részben a radioaktív bomlás (²³⁸U, ²³⁵U, ²³²Th, ⁴⁰K), részben a kialakuláskori hő és a belső mag kristályosodása. A mágneses teret a külső mag magnetohidrodinamikai dinamója tartja fenn.',
      terms: ['fizika-bsc/hullamegyenlet', 'mechanika/rugalmassagi-modulus', 'mechanika/tehetetlensegi-nyomatek', 'fizika-bsc/radioaktiv-bomlas', 'fizika-bsc/faraday-indukcio', 'fizika-bsc/lorentz-ero']
    },
    steps: [
      { icon: '🌋', title: '1. Földrengés: a Föld „átvilágítása”', text: 'Egy erős földrengés olyan, mint egy hatalmas kalapácsütés: rezgéshullámok indulnak ki belőle, és **átfutnak az egész Földön**. A világ több ezer szeizmográfja percre pontosan rögzíti, mikor érkeznek meg. A beérkezési időkből lehet kiszámolni, milyen gyorsan haladtak a hullámok a különböző mélységekben, és hol **törtek meg** vagy **verődtek vissza**.', parts: ['kereg', 'moho'] },
      { icon: '〰️', title: '2. P- és S-hullámok', text: 'A **P-hullám** (elsődleges) hosszanti, összenyomódó–ritkuló hullám, mint a hang: szilárd anyagban, folyadékban és gázban is terjed, és gyorsabb. Az **S-hullám** (másodlagos) keresztirányú, nyíró hullám: csak **szilárd** anyagban terjed. A két hullám beérkezése közötti időből a rengés távolsága is kiszámolható.', parts: ['felso-kopeny', 'also-kopeny'] },
      { icon: '🌑', title: '3. Az árnyékzóna: a mag folyékony', text: 'A rengéssel átellenes oldalon egy nagy területen **nem érkeznek S-hullámok** (103°-on túl): valami folyékony van az útjukban, ez a **külső mag**. A P-hullámok átjutnak, de a mag határán erősen megtörnek, ezért 103° és 142° között egy gyűrű alakú sávban **alig érkezik** P-hullám. Ebből számolta ki **Gutenberg** 1913-ban a mag határát 2900 km-re.', parts: ['gutenberg', 'kulso-mag'] },
      { icon: '💡', title: '4. Gyenge jelek az árnyékban: a belső mag', text: '**Inge Lehmann** 1936-ban észrevette, hogy az árnyékzónában mégis érkeznek gyenge P-hullámok. Magyarázata: a mag közepén egy **másik, szilárd** mag van, amelynek határáról visszaverődnek a hullámok. Később kimutatták, hogy a belső magban nyíróhullámok is terjednek, tehát valóban szilárd.', parts: ['belso-mag', 'kulso-mag'] },
      { icon: '☄️', title: '5. Születés: 4,6 milliárd éve', text: 'A Föld kb. **4,54 milliárd éve** állt össze a fiatal Napot körülvevő por- és gázkorongból: apró szemcsék, majd kőzetdarabok, végül egyre nagyobb kisbolygók ütköztek és tapadtak össze. Az ütközések és a radioaktív bomlás hője miatt a fiatal Föld nagy része **megolvadt** (magmaóceán borította).', parts: ['kereg', 'also-kopeny'] },
      { icon: '🌗', title: '6. Óriásbecsapódás: így lett a Hold', text: 'Nem sokkal a Föld születése után egy **Mars-méretű** égitest (Theia) ferdén nekiütközött. A szétfröccsent, főleg köpenyanyagból álló törmelék a Föld körüli pályán összeállt: ez lett a **Hold**. Ezért ilyen kicsi a Hold vasmagja, és ezért hasonlít a kőzete annyira a földköpenyhez.', parts: ['felso-kopeny', 'also-kopeny'] },
      { icon: '⚖️', title: '7. Differenciálódás: sűrűség szerinti rétegződés', text: 'A megolvadt Földben a nehéz **vas és nikkel** cseppekben lesüllyedt a középpontba, és kialakította a **magot**; a könnyebb szilikátok a köpenyt, a legkönnyebbek a **kérget** adták. A gázok és a vízgőz kiszabadultak: belőlük lett az ősi **légkör** és a **vízburok**. A folyékony mag áramlása beindította a **mágneses teret**.', parts: ['kulso-mag', 'belso-mag', 'kereg', 'vizburok', 'legkor', 'magneses-ter'] },
      { icon: '🔄', title: '8. A kőzetciklus: a Föld ma is dolgozik', text: 'A Föld belső hője ma is mozgatja a **köpenyt** és vele a **kőzetlemezeket**. A hátságokon új kéreg születik, az alábukási zónákban a régi visszasüllyed. A felszínen a víz és a levegő **lepusztítja** a kőzeteket, az üledék lerakódik, betemetődik, átalakul (**metamorf** kőzet), megolvad, majd magmaként újra felszínre jut: ez a **kőzetciklus**, amely sok százmillió év alatt újra és újra „átgyúrja” a kérget.', parts: ['lemezek', 'litoszfera', 'kereg', 'vizburok'] }
    ],
    history: [
      { year: 'Kr. e. 240 körül', text: '**Eratoszthenész** alexandriai tudós a Nap delelési szögéből Szüénében és Alexandriában kiszámolja a Föld kerületét: kb. 40 000 km-t kap, meglepően pontosan.' },
      { year: '1891–1910-es évek', text: '**Eötvös Loránd** megépíti a **torziós ingát** (Eötvös-inga), amellyel a gravitációs tér apró változásait tudja mérni. Mérései a Ság-hegyen és a befagyott Balaton jegén a föld alatti tömegeloszlásra adtak felvilágosítást; az ingát később az egész világon kőolaj- és ércmezők kutatására használták. A gravitációs gradiens egysége ma is az **eötvös** (E).' },
      { year: '1909', text: '**Andrija Mohorovičić** egy horvátországi földrengés hullámaiból felfedezi a kéreg és a köpeny határát, a **Moho**-t.' },
      { year: '1912', text: '**Alfred Wegener** előadja a **kontinensvándorlás** elméletét: a kontinensek egykor egyetlen őskontinenst (Pangea) alkottak. Bizonyítékai: a partvonalak illeszkedése, azonos ősmaradványok és kőzetek az óceánok két oldalán. A mozgás okát nem tudta megmagyarázni, ezért kortársai többnyire elutasították.' },
      { year: '1913', text: '**Beno Gutenberg** az S-hullámok árnyékzónájából kiszámolja, hogy a folyékony mag határa kb. **2900 km** mélyen van.' },
      { year: '1936', text: '**Inge Lehmann** dán szeizmológus a P-hullámok árnyékzónájában érkező gyenge jelekből felfedezi a **szilárd belső magot**.' },
      { year: '1960-as évek', text: 'Megszületik a **lemeztektonika**: Harry Hess leírja az óceánaljzat-szétterülést (1962), Vine és Matthews az óceáni kéreg csíkos mágnesezettségével igazolja (1963), Tuzo Wilson leírja a transzform vetőket (1965). Wegener elmélete végre magyarázatot kap.' },
      { year: '1981–ma', text: 'Elkészül a **PREM** Föld-referenciamodell; a szeizmikus tomográfia 3D-ben „lefényképezi” a köpenyt, a GPS milliméteresen méri a lemezmozgást, a geoneutrínó-detektorok pedig közvetlenül mérik a Föld radioaktív hőtermelését.' }
    ],
    quiz: [
      { q: 'Melyik réteg folyékony a Föld belsejében?', options: ['A külső mag', 'A belső mag', 'Az alsó köpeny', 'A kontinentális kéreg'], answer: 0, explain: 'A külső mag folyékony vas–nikkel; a belső mag a hatalmas nyomás miatt szilárd, a köpeny pedig szilárd, csak nagyon lassan áramlik.' },
      { q: 'Honnan tudjuk, hogy a külső mag folyékony?', options: ['Az S-hullámok nem jutnak át rajta', 'Lefúrtak odáig', 'A vulkánok onnan hozzák fel a lávát', 'A műholdak lefényképezték'], answer: 0, explain: 'A nyíróhullámok (S) folyadékban nem terjednek, ezért a rengéssel átellenes oldalon árnyékzóna keletkezik.' },
      { q: 'Mi a Mohorovičić-határ?', options: ['A kéreg és a köpeny határa', 'A köpeny és a mag határa', 'A külső és a belső mag határa', 'A troposzféra teteje'], answer: 0, explain: 'A Moho a kéreg alján van: az óceánok alatt 5–10 km, a kontinensek alatt 30–70 km mélyen. Itt a földrengéshullámok felgyorsulnak.' },
      { q: 'Milyen lemezhatáron keletkezik új óceáni kéreg?', options: ['Szétváló (divergens) határon, pl. óceánközépi hátságon', 'Alábukási zónában', 'Transzform vetőnél', 'Kontinensek ütközésénél'], answer: 0, explain: 'A szétváló lemezek között feláramló magma megszilárdul, és új óceáni kérget épít.' },
      { q: 'Melyik magyar tudós mérte a gravitáció apró változásait torziós ingával?', options: ['Eötvös Loránd', 'Jedlik Ányos', 'Szent-Györgyi Albert', 'Neumann János'], answer: 0, explain: 'Az Eötvös-inga a gravitációs tér finom változásait méri; a földtani kutatásban, pl. kőolajkutatásban világszerte használták.' }
    ]
  });
})();
