/* Modell: az emberi agy – a bal agyfélteke oldalnézetből (elöl, a rajz bal oldalán a homlok),
 * mellette egy középmetszeti nagyítás (köztiagy, agyalapi mirigy, kérgestest, limbikus rendszer),
 * az agyhártyák rétegei és egy kérgi idegsejt-hálózat nagyítva. Sematikus, nem méretarányos. */
(function () {
  var NS = ' pointer-events="none"';
  var INK = '#1b2230';
  function f(n) { return (+n).toFixed(1); }
  function rnd(i) { var x = Math.sin(i * 12.9898 + 7.3) * 43758.5453; return x - Math.floor(x); }
  /* zárt, sima görbe a pontokon át (Catmull–Rom → köbös Bézier) */
  function closed(pts) {
    var n = pts.length, d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ' C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
        f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d + ' Z';
  }
  /* nyitott, sima görbe */
  function open(pts) {
    var n = pts.length, d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (var i = 0; i < n - 1; i++) {
      var p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
      d += ' C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
        f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d;
  }
  function poly(pts) { return pts.map(function (p, i) { return (i ? 'L' : 'M') + f(p[0]) + ' ' + f(p[1]); }).join(' ') + ' Z'; }
  function txt(x, y, s, cls, extra) { return '<text class="' + cls + '" x="' + x + '" y="' + y + '"' + (extra || '') + NS + '>' + s + '</text>'; }
  /* sötét felirat a színes felületeken (világos és sötét témában is olvasható) */
  function dl(x, y, s, size, extra) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" fill="' + INK + '" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif"' + (extra || '') + NS + '>' + s + '</text>';
  }
  function lead(x1, y1, x2, y2) { return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" stroke="#7f8db0" stroke-width="1" fill="none"' + NS + '/>'; }
  function box(x, y, w, h) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="rgba(127,141,176,.10)" stroke="#7f8db0" stroke-width="1.2"/>'; }

  /* ---------- a nagyagy körvonala és a lebenyhatárok ---------- */
  var OUTP = [[66, 226], [72, 172], [104, 122], [160, 86], [226, 66], [290, 62], [352, 70], [406, 94], [446, 134], [468, 188], [471, 244],
    [455, 284], [430, 303], [390, 320], [330, 332], [262, 332], [202, 324], [158, 308], [130, 290], [134, 272], [150, 262], [118, 262], [84, 252]];
  var OUT = closed(OUTP);
  var CS = [[272, 20], [268, 70], [262, 100], [255, 130], [248, 160], [240, 190], [232, 218], [224, 241]];   // központi barázda
  var SY = [[224, 241], [280, 229], [330, 222]];                                                       // oldalsó (Sylvius-) barázda hátsó része
  var LOBE = {
    homlok: [[20, 266], [20, 20]].concat(CS).concat([[190, 250], [150, 262]]),
    fali: [[272, 20], [418, 20], [412, 104], [404, 170], [405, 240], [330, 222], [280, 229]].concat(CS.slice(1).reverse()),
    nyakszirti: [[418, 20], [520, 20], [520, 380], [440, 360], [432, 310], [405, 240], [404, 170], [412, 104]],
    halantek: [[150, 262], [190, 250]].concat(SY).concat([[405, 240], [432, 310], [440, 360], [100, 380], [106, 268]])
  };
  var COL = {
    homlok: ['#7fa6ea', '#2d4f95'], fali: ['#ecc961', '#8a6a10'], halantek: ['#7ccb93', '#2b7044'], nyakszirti: ['#ee93a6', '#93304a']
  };

  var defs = '<defs>' +
    '<radialGradient id="ag-shade" gradientUnits="userSpaceOnUse" cx="200" cy="120" r="330"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></radialGradient>' +
    '<radialGradient id="ag-cbg" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#d2b3ec"/><stop offset="1" stop-color="#9a6fc4"/></radialGradient>' +
    '<linearGradient id="ag-bsg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f0bf88"/><stop offset="1" stop-color="#cf8d4c"/></linearGradient>' +
    '<radialGradient id="ag-thal" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#9fe0d6"/><stop offset="1" stop-color="#4faea2"/></radialGradient>' +
    '<clipPath id="ag-brain"><path d="' + OUT + '"/></clipPath>' +
    Object.keys(LOBE).map(function (k) { return '<clipPath id="ag-c-' + k + '" clip-path="url(#ag-brain)"><path d="' + poly(LOBE[k]) + '"/></clipPath>'; }).join('') +
    '</defs>';

  /* barázdák (sulcusok): sötét vonal + világos „perem” → tekervényes hatás */
  function sulci(list, col) {
    return list.map(function (pts) {
      var d = open(pts);
      return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.4" stroke-linecap="round" opacity=".7"' + NS + '/>' +
        '<path d="' + d + '" transform="translate(1.6 1.8)" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".4"' + NS + '/>';
    }).join('');
  }
  function lobe(k, sul, extra) {
    return '<g clip-path="url(#ag-c-' + k + ')">' +
      '<path d="' + OUT + '" fill="' + COL[k][0] + '"/>' +
      '<path d="' + OUT + '" fill="url(#ag-shade)"' + NS + '/>' +
      sulci(sul, COL[k][1]) + (extra || '') +
      '<path d="' + poly(LOBE[k]) + '" fill="none" stroke="' + COL[k][1] + '" stroke-width="3.2" stroke-linejoin="round"/>' +
      '<path d="' + OUT + '" fill="none" stroke="' + COL[k][1] + '" stroke-width="4"/>' +
      '</g>';
  }
  function area(d, label) {
    return '<path d="' + d + '" fill="rgba(255,255,255,.26)" stroke="#fff" stroke-width="1.2" stroke-dasharray="3 2.5"' + NS + '/>' + (label || '');
  }

  /* ---------- háttér ---------- */
  var backdrop = defs +
    txt(14, 26, 'Az emberi agy – bal félteke oldalnézetből', 'lbl', ' font-size="15"') +
    txt(14, 44, 'elöl a homlok, hátul a tarkó · sematikus', 'lbl-muted', ' font-size="11"') +
    // kis szem: innen indul a látás
    '<g' + NS + '><ellipse cx="34" cy="300" rx="13" ry="9" fill="#f4f6fa" stroke="#5c6b86" stroke-width="1.4"/><circle cx="30" cy="300" r="5.5" fill="#4f7fc8" stroke="#24457e"/><circle cx="29" cy="300" r="2.4" fill="#111"/></g>' +
    txt(34, 322, 'szem', 'lbl-muted', ' font-size="10" text-anchor="middle"') +
    // nagyítások keretei
    box(510, 40, 280, 280) + txt(522, 58, 'középmetszet – a félteke belső oldala', 'lbl-muted', ' font-size="10"') +
    box(16, 398, 236, 150) + txt(26, 414, 'agyhártyák – nagyítva', 'lbl-muted', ' font-size="10"') +
    box(510, 332, 280, 216) + txt(522, 350, 'idegsejt-hálózat a kéregben – nagyítva', 'lbl-muted', ' font-size="10"');

  /* középmetszeti háttér (áttetsző sziluettek) */
  var IX = 510, IY = 40;
  function T(s) { return '<g transform="translate(' + IX + ' ' + IY + ')">' + s + '</g>'; }
  var MEDP = [[16, 150], [24, 100], [64, 62], [140, 46], [210, 56], [254, 96], [268, 146], [254, 184], [214, 194], [176, 188], [136, 192], [92, 196], [52, 188], [26, 172]];
  var medBack = '<path d="' + closed(MEDP) + '" fill="rgba(150,160,185,.30)" stroke="#7f8db0" stroke-width="1.4"/>' +
    '<path d="' + open([[44, 120], [62, 90], [104, 70], [150, 66], [196, 76], [226, 100], [236, 126]]) + '" fill="none" stroke="#7f8db0" stroke-width="1.4" stroke-dasharray="4 3"/>' +
    '<path d="' + open([[226, 150], [244, 134], [262, 132]]) + '" fill="none" stroke="#7f8db0" stroke-width="1.3"/>' +
    // agytörzs és kisagy a középmetszetben (halványan)
    '<path d="M134 178 L166 174 C172 206 178 238 182 272 L160 272 C154 240 146 208 134 178 Z" fill="rgba(225,160,100,.40)" stroke="#a86a2e" stroke-width="1.2"/>' +
    '<ellipse cx="218" cy="226" rx="40" ry="30" fill="rgba(170,130,210,.38)" stroke="#7a5aa6" stroke-width="1.2"/>' +
    '<path d="M186 226 L214 226 M200 226 L216 206 M200 226 L218 248 M214 226 L232 214 M214 226 L234 236" stroke="#7a5aa6" stroke-width="1.4" fill="none"/>';
  backdrop += T(medBack) +
    txt(IX + 160, IY + 266, 'agytörzs', 'lbl-muted', ' font-size="9" text-anchor="end"') +
    txt(IX + 262, IY + 268, 'kisagy', 'lbl-muted', ' font-size="9" text-anchor="end"') +
    txt(IX + 22, IY + 140, 'elöl', 'lbl-muted', ' font-size="9"');

  /* agyhártya-nagyítás háttere: bőr, csont, kéreg */
  function wave(x) { return 496 + 5 * Math.sin((x - 24) / 124 * Math.PI * 3); }
  var wpts = []; for (var wx = 24; wx <= 148; wx += 4) wpts.push([wx, wave(wx)]);
  var waveD = open(wpts);
  backdrop += '<rect x="24" y="422" width="124" height="12" fill="#e8b39b" stroke="#9a5d45" stroke-width="1"/>' +
    '<rect x="24" y="434" width="124" height="20" fill="#e7dcc2" stroke="#8f8160" stroke-width="1"/>' +
    [32, 50, 70, 88, 104, 124, 140].map(function (x, i) { return '<ellipse cx="' + x + '" cy="' + (442 + (i % 2) * 5) + '" rx="4" ry="2.6" fill="#c9b98f"/>'; }).join('') +
    '<path d="' + waveD + ' L148 540 L24 540 Z" fill="#c8a3b2" stroke="none"/>' +
    '<path d="M24 528 Q86 520 148 528 L148 540 L24 540 Z" fill="#eadfc9"/>' +
    lead(150, 428, 156, 428) + txt(158, 431, 'fejbőr', 'lbl-muted', ' font-size="9.5"') +
    lead(150, 444, 156, 444) + txt(158, 447, 'koponyacsont', 'lbl-muted', ' font-size="9.5"') +
    lead(150, 516, 156, 518) + txt(158, 521, 'agykéreg', 'lbl-muted', ' font-size="9.5"') +
    txt(158, 534, '(szürkeállomány)', 'lbl-muted', ' font-size="8.5"');

  /* ---------- 1–4. lebenyek ---------- */
  var homlok = lobe('homlok', [
    [[250, 78], [244, 120], [232, 160], [222, 200], [212, 232]],
    [[236, 108], [200, 104], [160, 110], [118, 130]],
    [[228, 168], [190, 166], [150, 174], [108, 192]],
    [[176, 250], [168, 228]], [[200, 244], [206, 222]],
    [[86, 168], [104, 150], [122, 148]], [[84, 216], [112, 214], [130, 230]], [[160, 84], [176, 96], [196, 92]]
  ], area('M268 70 L262 100 L255 130 L248 160 L240 190 L232 218 L224 241 L212 232 L222 200 L232 160 L244 120 L250 78 Z',
    dl(242, 150, 'mozgatókéreg', 8.5, ' transform="rotate(-76 242 150)"')) +
    area('M158 232 C160 218 196 216 202 230 C206 244 162 248 158 232 Z', dl(180, 236, 'Broca', 9)) +
    dl(140, 146, 'homloklebeny', 13));

  var fali = lobe('fali', [
    [[292, 72], [286, 110], [276, 150], [266, 190], [258, 226]],
    [[284, 160], [320, 142], [360, 138], [398, 150]],
    [[326, 96], [356, 88], [392, 108]], [[304, 212], [334, 204], [360, 214]]
  ], area('M268 70 L292 72 L286 110 L276 150 L266 190 L258 226 L224 241 L232 218 L240 190 L248 160 L255 130 L262 100 Z',
    dl(266, 150, 'érzőkéreg', 8.5, ' transform="rotate(-76 266 150)"')) +
    dl(346, 182, 'fali lebeny', 13));

  var halantek = lobe('halantek', [
    [[168, 286], [220, 272], [280, 264], [340, 258], [392, 266]],
    [[190, 316], [250, 312], [320, 312], [380, 306], [416, 296]]
  ], area('M246 240 C250 232 290 228 296 236 C300 246 252 252 246 240 Z', dl(271, 243, 'hallókéreg', 7.5)) +
    area('M346 250 C348 238 396 238 398 250 C398 264 346 266 346 250 Z', dl(372, 254, 'Wernicke', 8.5)) +
    dl(282, 296, 'halántéklebeny', 13));

  var nyakszirti = lobe('nyakszirti', [
    [[420, 140], [438, 168], [446, 196]], [[422, 222], [444, 244], [456, 266]], [[416, 270], [434, 290]], [[426, 112], [446, 124]]
  ], area('M452 214 C466 218 472 270 456 282 C444 284 438 222 452 214 Z', dl(456, 250, 'látókéreg', 8, ' transform="rotate(-82 456 250)"')) +
    dl(428, 160, 'nyak-', 10.5) + dl(428, 172, 'szirti', 10.5) + dl(428, 184, 'lebeny', 10.5));

  /* ---------- 5. kisagy ---------- */
  var CBP = [[338, 322], [372, 306], [420, 300], [462, 306], [482, 328], [480, 356], [456, 378], [412, 386], [368, 378], [344, 358]];
  var CB = closed(CBP), folia = '';
  for (var fy = 304; fy < 392; fy += 7) {
    folia += '<path d="M330 ' + fy + ' Q410 ' + (fy + 10) + ' 492 ' + (fy - 4) + '" fill="none" stroke="#5f3d86" stroke-width="' + (fy === 346 ? 2.4 : 1.2) + '" opacity=".75"' + NS + '/>' +
      '<path d="M330 ' + (fy + 2) + ' Q410 ' + (fy + 12) + ' 492 ' + (fy - 2) + '" fill="none" stroke="#fff" stroke-width=".8" opacity=".35"' + NS + '/>';
  }
  var kisagy = '<path d="' + CB + '" fill="url(#ag-cbg)" stroke="#5f3d86" stroke-width="2.4"/>' +
    '<g clip-path="url(#ag-cbclip)">' + folia + '</g>' +
    '<defs><clipPath id="ag-cbclip"><path d="' + CB + '"/></clipPath></defs>' +
    '<path d="' + CB + '" fill="none" stroke="#5f3d86" stroke-width="2.4"' + NS + '/>' +
    dl(426, 366, 'kisagy', 12);

  /* ---------- 6. agytörzs ---------- */
  var BS = 'M300 318 L346 318 L350 352 C358 368 358 396 348 408 L342 458 L340 528 L316 528 L314 460 L306 410 C288 406 272 392 272 372 C272 356 286 350 300 350 Z';
  var agytorzs = '<path d="' + BS + '" fill="url(#ag-bsg)" stroke="#8a5420" stroke-width="2" stroke-linejoin="round"/>' +
    [362, 372, 382, 392, 400].map(function (y) { return '<path d="M' + (y < 380 ? 278 : 280) + ' ' + y + ' Q314 ' + (y + 5) + ' 352 ' + y + '" fill="none" stroke="#a8692c" stroke-width="1" opacity=".7"' + NS + '/>'; }).join('') +
    '<path d="M300 352 L350 352 M306 410 L348 410 M314 460 L342 460" stroke="#8a5420" stroke-width="1.4" stroke-dasharray="3 2"' + NS + '/>' +
    '<ellipse cx="318" cy="432" rx="5" ry="13" fill="#f6d2a8" stroke="#a8692c" stroke-width="1"' + NS + '/>' +
    '<path d="M274 378 L258 386 M280 398 L266 410 M308 418 L296 428 M312 440 L298 448" stroke="#c9a16e" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M316 470 L300 478 M340 470 L356 478 M316 494 L300 502 M340 494 L356 502" stroke="#c9a16e" stroke-width="2" stroke-linecap="round"/>' +
    lead(296, 342, 266, 342) + txt(262, 345, 'középagy', 'lbl-muted', ' font-size="10" text-anchor="end"') +
    lead(272, 368, 266, 368) + txt(262, 371, 'híd', 'lbl-muted', ' font-size="10" text-anchor="end"') +
    lead(346, 434, 362, 434) + txt(365, 437, 'nyúltvelő', 'lbl-muted', ' font-size="10"') +
    lead(342, 506, 362, 506) + txt(365, 504, 'gerincvelő', 'lbl-muted', ' font-size="10"') + txt(365, 517, '→ az izmokhoz', 'lbl-muted', ' font-size="9"');

  /* ---------- 7–10. középmetszeti nagyítás ---------- */
  var kergestest = T('<path d="M78 128 C62 112 72 86 102 80 C130 74 168 74 194 86 C214 96 222 114 212 126 C206 133 197 129 196 121 C194 104 172 94 142 94 C112 94 93 100 89 112 C87 120 91 127 93 132 C89 139 82 135 78 128 Z" fill="#f0dfa8" stroke="#9b8040" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M98 86 C130 80 168 80 192 92" fill="none" stroke="#c8ad62" stroke-width="1" stroke-dasharray="2 3"' + NS + '/>' +
    dl(142, 89, 'kérgestest', 8.5));
  var koztiagy = T('<ellipse cx="142" cy="122" rx="27" ry="16" fill="url(#ag-thal)" stroke="#22766b" stroke-width="1.8"/>' +
    dl(142, 125, 'talamusz', 8.5) +
    '<path d="M92 140 C94 130 112 128 122 134 C130 140 128 152 118 154 C106 156 92 152 92 140 Z" fill="#f2a564" stroke="#9c5414" stroke-width="1.6"/>' +
    '<circle cx="128" cy="154" r="4.5" fill="#f2a564" stroke="#9c5414" stroke-width="1.2"/>' +
    lead(94, 146, 74, 166) + txt(10, 178, 'hipotalamusz', 'lbl-muted', ' font-size="9.5"'));
  var hipofizis = T('<path d="M102 152 C100 162 96 170 92 178" fill="none" stroke="#a03a68" stroke-width="3.2" stroke-linecap="round"/>' +
    '<ellipse cx="86" cy="186" rx="10" ry="7.5" fill="#e8749f" stroke="#8e2a58" stroke-width="1.5"/>' +
    '<ellipse cx="97" cy="187" rx="6" ry="6" fill="#c2507f" stroke="#8e2a58" stroke-width="1.3"/>' +
    lead(80, 193, 54, 216) + txt(10, 226, 'agyalapi mirigy', 'lbl-muted', ' font-size="9.5"'));
  var limbikus = T('<path d="M204 136 C190 104 160 98 132 100 C110 102 100 116 104 134 C106 144 114 150 124 152" fill="none" stroke="#7d5bc0" stroke-width="2" stroke-dasharray="4 2.5"/>' +
    '<path d="M126 196 C150 204 178 196 196 172 C204 160 206 150 204 140 L213 142 C218 156 214 170 206 182 C188 208 156 218 128 210 Z" fill="#a983e8" stroke="#5a3ca0" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M140 206 L142 199 M156 207 L157 199 M172 202 L170 195 M186 192 L182 186" stroke="#5a3ca0" stroke-width="1"' + NS + '/>' +
    '<ellipse cx="118" cy="200" rx="10.5" ry="8" fill="#ea6060" stroke="#8c2020" stroke-width="1.5"/>' +
    lead(112, 207, 50, 248) + txt(10, 256, 'amigdala', 'lbl-muted', ' font-size="9.5"') +
    lead(212, 150, 224, 156) + txt(226, 160, 'hippo-', 'lbl-muted', ' font-size="9.5"') + txt(226, 171, 'kampusz', 'lbl-muted', ' font-size="9.5"') +
    '');

  /* ---------- 11. agyhártyák és liquor ---------- */
  // a liquor tere: felül a pókhálóhártya, alul a hullámos lágy agyhártya
  var revW = wpts.slice().reverse();
  var csf = '<path d="M24 467 L148 467 ' + revW.map(function (p) { return 'L' + f(p[0]) + ' ' + f(p[1]); }).join(' ') + ' Z" fill="rgba(96,182,240,.55)" stroke="none"/>';
  var agyhartya = '<rect x="24" y="454" width="124" height="9" fill="#8ea2c9" stroke="#3f5482" stroke-width="1.2"/>' +
    csf +
    [34, 46, 62, 80, 96, 120, 136].map(function (x) { return '<path d="M' + x + ' 467 L' + (x + 3) + ' ' + f(wave(x + 3) - 2) + '" stroke="#8b78c4" stroke-width="1"' + NS + '/>'; }).join('') +
    '<rect x="24" y="463" width="124" height="4" fill="#c4b0ea" stroke="#6a52a0" stroke-width=".8"/>' +
    '<circle cx="58" cy="480" r="5" fill="#d23a43" stroke="#7a1a20" stroke-width="1"/><circle cx="110" cy="478" r="4" fill="#3d62b3" stroke="#1f3570" stroke-width="1"/>' +
    '<path d="' + waveD + '" fill="none" stroke="#e0607e" stroke-width="2.6"/>' +
    lead(150, 458, 156, 459) + txt(158, 462, 'kemény agyhártya', 'lbl-muted', ' font-size="9.5"') +
    lead(150, 466, 156, 472) + txt(158, 475, 'pókhálóhártya', 'lbl-muted', ' font-size="9.5"') +
    lead(150, 482, 156, 487) + txt(158, 490, 'liquor (agyvíz)', 'lbl-muted', ' font-size="9.5"') +
    lead(150, 496, 156, 503) + txt(158, 506, 'lágy agyhártya', 'lbl-muted', ' font-size="9.5"');

  /* ---------- 12. idegsejt-hálózat ---------- */
  var DEN = '#b97a1c';
  function dend(pts, w) { return '<path d="' + open(pts) + '" fill="none" stroke="' + DEN + '" stroke-width="' + (w || 2.2) + '" stroke-linecap="round"/>'; }
  function soma(x, y) { return '<path d="M' + (x - 10) + ' ' + (y + 8) + ' Q' + x + ' ' + (y + 13) + ' ' + (x + 10) + ' ' + (y + 8) + ' L' + x + ' ' + (y - 16) + ' Z" fill="#f0b048" stroke="#8a5a10" stroke-width="1.6" stroke-linejoin="round"/><circle cx="' + x + '" cy="' + (y + 1) + '" r="3.6" fill="#a8641a"/>'; }
  function pyr(x, y, top) {
    return dend([[x, y - 14], [x - 2, y - 40], [x + 1, top]], 2.6) + dend([[x - 1, y - 38], [x - 18, y - 56], [x - 24, y - 70]], 1.5) + dend([[x, y - 52], [x + 16, y - 66], [x + 22, y - 80]], 1.5) +
      dend([[x - 8, y + 6], [x - 24, y + 14], [x - 34, y + 12]], 1.6) + dend([[x + 8, y + 6], [x + 22, y + 16], [x + 30, y + 26]], 1.6) + dend([[x - 6, y + 9], [x - 14, y + 26]], 1.4) + soma(x, y);
  }
  var neuron = pyr(560, 452, 368) + pyr(640, 432, 372) + pyr(750, 466, 380) +
    // az 1. sejt axonja velőhüvellyel, a 3. sejt dendritjén végződik
    dend([[560, 462], [562, 492], [574, 520]], 1.8) +
    '<path d="M574 520 L700 520" stroke="' + DEN + '" stroke-width="1.8"/>' +
    [580, 608, 636, 664].map(function (x) { return '<rect x="' + x + '" y="514.5" width="24" height="11" rx="5.5" fill="#f6ecd2" stroke="#9c8a5a" stroke-width="1.1"/>'; }).join('') +
    dend([[700, 520], [710, 512], [716, 506]], 1.4) + dend([[700, 520], [712, 526], [718, 530]], 1.4) +
    '<circle cx="718" cy="505" r="3.4" fill="#f0b048" stroke="#8a5a10"/><circle cx="720" cy="531" r="3.4" fill="#f0b048" stroke="#8a5a10"/>' +
    dend([[742, 474], [730, 494], [722, 504]], 1.6) + dend([[744, 476], [732, 510], [724, 528]], 1.6) +
    // a 2. sejt axonja lefelé
    dend([[640, 442], [646, 470], [660, 500]], 1.6) +
    // szinapszis nagyítva
    '<path d="M718 505 L708 432" stroke="#7f8db0" stroke-width="1" stroke-dasharray="3 3"/>' +
    '<circle cx="704" cy="408" r="28" fill="rgba(240,176,72,.15)" stroke="#8a5a10" stroke-width="1.4"/>' +
    '<path d="M684 390 Q704 380 724 390 L724 404 Q704 412 684 404 Z" fill="#f0b048" stroke="#8a5a10" stroke-width="1.2"/>' +
    [[694, 394], [704, 392], [714, 395], [699, 401], [709, 401]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3" fill="#6fb0ea" stroke="#2c5f9a" stroke-width=".8"/>'; }).join('') +
    '<path d="M684 416 Q704 410 724 416 L724 428 L684 428 Z" fill="#e9c27e" stroke="#8a5a10" stroke-width="1.2"/>' +
    [690, 698, 706, 714].map(function (x) { return '<rect x="' + x + '" y="412" width="4" height="5" fill="#3fa35b"/>'; }).join('') +
    [[696, 409], [708, 410]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.3" fill="#2c5f9a"/>'; }).join('') +
    txt(526, 476, 'sejttest', 'lbl-muted', ' font-size="9"') +
    txt(600, 404, 'dendrit', 'lbl-muted', ' font-size="9" text-anchor="middle"') +
    txt(600, 542, 'axon velőhüvellyel', 'lbl-muted', ' font-size="9"') +
    txt(704, 374, 'szinapszis', 'lbl-muted', ' font-size="9" text-anchor="middle"');

  STUDIE.addModel({
    id: 'agy',
    title: 'Az emberi agy',
    icon: '🧠',
    color: '#c2417a',
    category: 'Biológia',
    keywords: 'agy nagyagy agykéreg félteke lebeny homloklebeny fali lebeny halántéklebeny nyakszirti lebeny kisagy agytörzs nyúltvelő híd középagy köztiagy talamusz hipotalamusz agyalapi mirigy hipofízis kérgestest limbikus rendszer hippokampusz amigdala agyhártya liquor agykamra idegsejt neuron szinapszis mozgatókéreg érzőkéreg Broca Wernicke látókéreg memória alvás EEG fMRI homunculus Golgi Cajal Szentágothai',
    summary: 'Kb. 1,4 kg-os, zsírszerű szerv, amelyben kb. 86 milliárd idegsejt és ennél is több kapcsolat működik. A testtömeg 2%-a, de nyugalomban a test energiájának kb. 20%-át használja.',
    scale: 'kb. 16–17 cm hosszú, 14 cm széles, 1,2–1,5 kg; a kéreg kb. 2–4 mm vastag',
    viewBox: '0 0 800 560',
    backdrop: backdrop,
    intro: 'Az agy a test **irányítóközpontja**: itt alakulnak ki az érzetek, a gondolatok, az érzelmek és az emlékek, és innen indulnak a mozgások parancsai. A rajzon a **bal agyfélteke** látszik oldalról: a **nagyagy kérge** négy lebenyre osztható (**homlok-, fali, halánték- és nyakszirti lebeny**), alatta hátul a **kisagy**, lent az **agytörzs**, amely a **gerincvelőben** folytatódik.\n\nJobbra fent a félteke **belső oldala** látszik (mintha középen kettévágnánk az agyat): itt van a **köztiagy**, az **agyalapi mirigy**, a két féltekét összekötő **kérgestest** és az emlékezésben, érzelmekben fontos **limbikus rendszer**. Lent az agyat burkoló **agyhártyák** és az agyat felépítő **idegsejtek** nagyítva. A **Szétszedés** gombbal a lebenyeket széthúzhatod.',
    parts: [
      {
        id: 'homlok', z: 4, name: 'Homloklebeny', svg: homlok, explode: [-28, -14], badge: [112, 214], en: 'frontal lobe (primary motor cortex, prefrontal cortex, Broca’s area)',
        lesson: 'biologia/ideg-hormon-emesztes', terms: ['anatomia/kozponti-kornyeki'],
        what: 'A nagyagy **legnagyobb** lebenye, a homlok mögött, a **központi barázdáig** tart. Ez a „vezérigazgató”: itt történik a **tervezés, döntés, figyelem, önkontroll**, itt dől el, mit teszünk, és mit nem. A hátsó szélén húzódik a **mozgatókéreg**, amely az akaratlagos mozgások parancsait küldi az izmokhoz, alul pedig (legtöbbünknél a bal féltekében) a **Broca-terület**, amely a beszéd **előállításához** kell.',
        madeOf: 'Mint minden lebeny, kívül **szürkeállományból** (kéreg: az idegsejtek sejttestjei, kb. 2–4 mm vastag, hat rétegben) és alatta **fehérállományból** (a sejtek velőhüvelyes nyúlványai) áll. A felszínt **tekervények** (gyrusok) és **barázdák** (sulcusok) teszik ráncossá: így fér el a kb. 0,2 m²-es kéreg (egy kis asztallapnyi) a koponyában. A mozgatókéregben vannak a test legnagyobb idegsejtjei, a **Betz-féle óriás piramissejtek**.',
        how: 'Az agy az embrió **külső csíralemezéből** fejlődik: a 3–4. héten az idegbarázda **idegcsővé** záródik, amelynek elülső vége három, majd öt **agyhólyaggá** tágul. A legelső (előagy) hólyagból nőnek ki a **nagyagyféltekék**, amelyek a 6. hónaptól kezdenek ráncolódni. A homloklebeny érik meg **utoljára**: a velőhüvelyek képződése és a felesleges kapcsolatok „metszése” itt egészen **kb. 25 éves korig** tart, ezért kamaszkorban még fejlődik a kockázatok mérlegelése és az önkontroll.',
        uni: 'Funkcionális felosztás (Brodmann-mezőkkel): **primer motoros kéreg** (BA 4, gyrus precentralis), **premotoros és szupplementer motoros kéreg** (BA 6: mozgások tervezése, sorrendje), **frontális szemmező** (BA 8), **Broca-terület** (BA 44–45, gyrus frontalis inferior pars opercularis és triangularis) és a **prefrontális kéreg** (dorsolateralis: munkamemória, végrehajtó funkciók; orbitofrontális és ventromediális: jutalom, érzelmi döntések). A primer motoros kéreg **szomatotópiás** (a test egyes részei sorban képeződnek le: homunculus), a kéreg V. rétegének piramissejtjei adják a **tractus corticospinalis** (piramispálya) rostjait. A prefrontális kéreg sérülésének klasszikus esete **Phineas Gage** (1848): értelme megmaradt, de személyisége és döntéshozása megváltozott.',
        fact: 'A felnőtt agykéreg kb. 16 milliárd idegsejtet tartalmaz; ha kiteríthetnénk, kb. 2000 cm² lenne, nagyjából három 30 cm-es pizza területe.'
      },
      {
        id: 'fali', z: 4, name: 'Fali lebeny', svg: fali, explode: [6, -26], badge: [392, 132], en: 'parietal lobe (primary somatosensory cortex)',
        lesson: 'biologia/ideg-hormon-emesztes', terms: ['anatomia/kozponti-kornyeki'],
        what: 'A fejtető alatti lebeny, a központi barázda **mögött**. Elülső sávja az **érzőkéreg**: ide érkeznek a bőrből, az izmokból és az ízületekből az **érintés, nyomás, hő, fájdalom** és a testhelyzet jelei. A lebeny hátsó része a **térbeli tájékozódás** központja: tudja, hol vannak a végtagjaink és a tárgyak körülöttünk, segít a kéz mozgását a látott tárgyhoz igazítani, és a számolásban is szerepe van.',
        madeOf: 'Hatrétegű **kéregből** és alatta fehérállományból. Az érzőkéreg sejtjei **oszlopokba** rendeződnek: egy-egy oszlop egy kis bőrterület egyféle ingerére (pl. rezgés vagy tartós nyomás) válaszol. A **szemcsés (granuláris)** IV. réteg itt különösen vastag, mert ide fut be a talamuszból érkező rostok többsége.',
        how: 'A nagyagyféltekék a magzati élet során hátrafelé és lefelé növekedve, C alakban „körbenőnek”; a központi barázda a 20. hét körül jelenik meg. Az érzőkéreg térképe **használat** szerint alakul: amelyik testrészt sokat használjuk (pl. a zongorista ujjai), annak a kérgi területe megnő. Ez a **plaszticitás** felnőttkorban is megmarad.',
        uni: 'A **primer szomatoszenzoros kéreg** (S1, BA 3a, 3b, 1, 2, gyrus postcentralis) szomatotópiás, a kontralaterális testfélről kap információt a **lemniscus medialis** (tapintás, propriocepció) és a **tractus spinothalamicus** (fájdalom, hő) pályán, a talamusz VPL/VPM magjain át. A hátsó parietális kéreg (BA 5, 7, gyrus supramarginalis és angularis) a látott és a tapintott információt **térbeli koordinátarendszerbe** illeszti (a látórendszer „hol/hogyan?” dorsalis pályája). Jobb oldali parietális sérüléskor gyakori a **féloldali neglect**: a beteg nem vesz tudomást a bal oldali térfélről. A bal gyrus angularis sérülése írás-, olvasás- és számolási zavart okozhat (Gerstmann-szindróma).',
        fact: 'Az érzőkéreg „térképén” a kéz és az ajak sokkal nagyobb területet foglal el, mint az egész hát: ezért érezzük az ujjbegyünkkel a legfinomabb részleteket.'
      },
      {
        id: 'halantek', z: 4, name: 'Halántéklebeny', svg: halantek, explode: [-8, 24], badge: [200, 300], en: 'temporal lobe (auditory cortex, Wernicke’s area)',
        lesson: 'biologia/ideg-hormon-emesztes',
        what: 'A halánték mögötti, alsó lebeny, amelyet felülről a mély **oldalsó (Sylvius-) barázda** választ el. Felső részén van a **hallókéreg**, mögötte (többnyire a bal féltekében) a **Wernicke-terület**, amely a beszéd **megértéséhez** kell. Alsó része a látott tárgyak és **arcok felismerésében** fontos, a belsejében pedig az emlékezéshez szükséges **hippokampusz** és az érzelmeket értékelő **amigdala** rejtőzik.',
        madeOf: 'Kéregből és fehérállományból; a belső, „régebbi” részén egyszerűbb, háromrétegű kéreg is van (a hippokampusz körül). Az oldalsó barázda mélyén egy további, „elrejtett” kéregterület, az **inzula** (sziget) is található.',
        how: 'A fejlődő félteke C alakú növekedése során a halántéklebeny **előre és lefelé** fordul, ezért kerül a hippokampusz és az oldalkamra alsó szarva is a belsejébe. A hallókéreg a magzatban már a 25. hét körül válaszol a hangokra: a baba felismeri anyja hangját születéskor. A nyelvi területek az első életévekben a hallott beszéd hatására szerveződnek: ezért tanul meg egy kisgyerek akcentus nélkül több nyelvet.',
        uni: 'A **primer hallókéreg** (A1, BA 41–42, Heschl-tekervény) **tonotópiás**: a különböző hangmagasságok sorban képeződnek le, mint a csiga alaphártyáján. A **Wernicke-terület** (BA 22 hátsó része) és a Broca-terület között a **fasciculus arcuatus** teremt kapcsolatot; sérülésekor a beteg megérti a beszédet, de nem tud ismételni (vezetéses afázia). A temporális lebeny alsó részén fut a látórendszer **„mi?” (ventralis) pályája**: a **gyrus fusiformis** arcfelismerő területének sérülése **prozopagnóziát** (arcvakságot) okoz. A mediális temporális lebeny (hippokampusz, entorhinális kéreg) az epizodikus memória kulcsa; a temporális lebeny a felnőttkori epilepszia leggyakoribb kiindulási helye.',
        fact: 'A Wernicke-afáziás beteg folyékonyan, gyorsan beszél, de mondatai értelmetlenek, és ő maga sem érti, amit mondanak neki.'
      },
      {
        id: 'nyakszirti', z: 4, name: 'Nyakszirti lebeny', svg: nyakszirti, explode: [26, -6], badge: [428, 214], en: 'occipital lobe (primary visual cortex)',
        link: 'szem', terms: ['anatomia/latas'],
        what: 'Az agy **leghátsó**, a tarkó mögötti lebenye: a **látás** központja. A szemből érkező jelek a talamuszon át az itteni **elsődleges látókéregbe** jutnak, ahol az agy először rakja össze a vonalakat, éleket, színeket és mozgásokat. Innen két úton halad tovább az információ: a halántéklebeny felé („**mi** ez?”) és a fali lebeny felé („**hol** van, hogyan nyúljak érte?”).',
        madeOf: 'Kéregből és fehérállományból. Az elsődleges látókéreg főként a lebeny **belső** felszínén, egy mély barázda (sarkantyúbarázda) két partján fekszik; a metszetén egy szabad szemmel is látható fehér csík fut végig (Gennari-csík), ezért **csíkolt kéregnek** is nevezik.',
        how: 'A látókéreg kapcsolatai a születés körüli hónapokban, a **látás hatására** finomodnak: ha egy kisgyerek egyik szeme egy kritikus időszakban (kb. 7–8 éves korig) nem kap éles képet (pl. kancsalság miatt), a hozzá tartozó kérgi kapcsolatok elsorvadnak, és a szem „tompalátóvá” válik akkor is, ha később maga a szem rendben van. Ezért fontos a kisgyerekek szemvizsgálata. Működés: a jobb látótér képe a **bal**, a bal látótéré a **jobb** nyakszirti lebenybe kerül.',
        uni: 'A **V1** (BA 17) **retinotópiás**: a retina szomszédos pontjai a kéregben is szomszédosak, a fovea (éleslátás helye) aránytalanul nagy területet kap (kortikális magnifikáció). David **Hubel** és Torsten **Wiesel** (Nobel-díj, 1981) mutatták ki, hogy a V1 sejtjei bizonyos **irányú élekre** válaszolnak (egyszerű és komplex sejtek), és hogy a kéreg **szemdominancia-** és **orientációs oszlopokba** rendeződik. A magasabb látómezők specializálódnak: V4 – szín, V5/MT – mozgás. A V1 kétoldali sérülése **kérgi vakságot** okoz, de egyes betegek öntudatlanul mégis reagálnak a látott ingerekre (**vaklátás**, blindsight).',
        fact: 'Ha a tarkónkat beütjük, „csillagokat látunk”: a látókéreg mechanikus ingerlése is fényérzetet kelt.'
      },
      {
        id: 'kisagy', z: 2, name: 'Kisagy', svg: kisagy, explode: [22, 24], badge: [468, 340], en: 'cerebellum',
        lesson: 'biologia/ideg-hormon-emesztes', terms: ['anatomia/kozponti-kornyeki'],
        what: 'A nagyagy hátsó része alatt, a tarkóban ülő, sűrűn barázdált „kis agy”. A mozgások **finomhangolója**: összeveti a tervezett mozgást a ténylegessel, és menet közben korrigál, így lesz a mozgás **pontos, összerendezett és sima**. Felel az **egyensúlyért**, a testtartásért és a begyakorolt mozgások (biciklizés, gépelés) **automatizálásáért**. Bár csak az agy tömegének kb. 10%-a, itt van az **idegsejtek több mint fele**.',
        madeOf: 'Vékony, párhuzamos **lemezkékbe** (foliumokba) gyűrt kéregből és fehérállományból; metszetben a fehérállomány faágszerű rajzolatot ad (**életfa**). A kéreg három rétegű; a középső rétegben sorakoznak a hatalmas, legyezőszerű dendritfájú **Purkinje-sejtek**, a legalsóban a parányi **szemcsesejtek** milliárdjai.',
        how: 'Az utóagyhólyag (rombagy) felső részének „ajkaiból” fejlődik. Különlegesség, hogy a kisagy **szemcsesejtjei** még a születés után hónapokig vándorolnak és osztódnak, ezért a kisagy az **első életévben** nő a legtöbbet: ekkor tanulja meg a baba a fejtartást, az ülést, a járást. Működés: a kisagy nem indít mozgást, hanem **hibajeleket** használ a tanuláshoz, minden gyakorlással pontosabb.',
        uni: 'A kisagy kéregének áramköre szabályos „kristályrács”: a **mohás rostok** (híd, gerincvelő, vesztibuláris magok) a szemcsesejteken át **párhuzamos rostokkal** egyenként kb. 200 000 szinapszist adnak minden Purkinje-sejtre, míg minden Purkinje-sejtet egyetlen **kúszórost** (a nyúltvelői olivából) fon körül, és „hibajelet” szállít. A párhuzamos rost–Purkinje-szinapszisok **hosszú távú depressziója** (LTD) a motoros tanulás sejtszintű alapja (Marr–Albus–Ito-elmélet). A Purkinje-sejtek **gátló** (GABA) kimenete a kisagyi magokon át a talamuszba és a mozgatókéregbe fut. Sérülése **ataxiát** (bizonytalan, széles alapú járás), szándékos remegést és dysmetriát okoz; az alkohol is elsősorban a kisagy működését rontja.',
        fact: 'A kisagyban kb. 69 milliárd idegsejt van, a nagyagykéregben csak kb. 16 milliárd.'
      },
      {
        id: 'agytorzs', z: 1, name: 'Agytörzs (középagy, híd, nyúltvelő)', svg: agytorzs, explode: [-8, 22], badge: [314, 380], en: 'brainstem: midbrain, pons, medulla oblongata',
        lesson: 'biologia/ideg-hormon-emesztes', terms: ['anatomia/reflexiv', 'anatomia/kozponti-kornyeki'],
        what: 'Az agy „szára”, amely a gerincvelőt köti össze a nagyaggyal. Fentről lefelé három része a **középagy**, a **híd** és a **nyúltvelő**. Itt futnak át a fel- és lefelé haladó **pályák**, innen ered a 12 pár **agyideg** többsége, és itt vannak az **életfenntartó központok**: a **légzés, a szívműködés és a vérnyomás** szabályozása, a nyelés, köhögés, tüsszentés, hányás reflexei. Az agytörzs hálózatos állománya tart **ébren**.',
        madeOf: 'A gerincvelővel ellentétben itt a szürkeállomány nem egy darabban, hanem **magvakra** (idegsejtcsoportokra) szétszórva ül a fehérállomány pályái között. A híd elülső, kidomborodó részét harántul futó rostok alkotják, amelyek a nagyagyat a kisagyhoz kapcsolják. A nyúltvelő elején két hosszanti duzzanat, a **piramisok** látszik: ezekben futnak le a mozgatókéreg parancsai.',
        how: 'Az idegcső középső (középagyhólyag) és hátsó (rombagy) részéből fejlődik; az agytörzs alakul ki és kezd működni **elsőként**: a légzőmozgások és a szopóreflex már a magzatban is működik. A mozgatókéregből leszálló pálya rostjainak kb. 85–90%-a a nyúltvelő alján **átkereszteződik** a másik oldalra: ezért irányítja a **bal** agyfélteke a **jobb** testfelet. Ha az agytörzs véglegesen leáll, az ember önállóan nem tud lélegezni: ez az **agyhalál** egyik ismérve.',
        uni: 'Az agytörzsben található az **agyidegek** III–XII. magjainak többsége, valamint a **formatio reticularis** (hálózatos állomány): ennek felszálló aktiváló rendszere (ARAS) a talamuszon át tartja ébren a kérget; sérülése kómát okoz. A **légzési ritmust** a nyúltvelő preBötzinger-komplexuma generálja, a **kardiovaszkuláris központ** (nucleus tractus solitarii, rostralis ventrolateralis medulla) a baroreceptor-reflexen át szabályozza a vérnyomást. A középagyban van a **substantia nigra** (dopaminerg sejtjei Parkinson-kórban pusztulnak), a nucleus ruber, a látás- és hallásreflexek központjai (colliculus superior és inferior). A **pupillareflex**, a **kornea-reflex** és a **vesztibulo-okuláris reflex** az agytörzs épségének klinikai vizsgálatára szolgál.',
        fact: 'A nyúltvelő csak kb. 3 cm hosszú, mégis nélküle egyetlen percig sem tudnánk lélegezni.'
      },
      {
        id: 'koztiagy', z: 6, name: 'Köztiagy: talamusz és hipotalamusz', svg: koztiagy, explode: [0, 0], badge: [690, 150], en: 'diencephalon: thalamus and hypothalamus',
        lesson: 'biologia/ideg-hormon-emesztes', terms: ['anatomia/homeosztazis'],
        what: 'Az agy közepén, a két félteke között ülő rész. Nagyobbik része a tojás alakú **talamusz** (látótelep): ez a kéreg **„kapuőre”**, a szaglás kivételével minden érzékszervi jel itt kapcsolódik át, mielőtt a kéregbe jutna, és itt dől el, mire figyelünk. Alatta ül a csak kb. 4 g-os **hipotalamusz**, a **belső környezet** szabályozója: a testhőmérséklet, az **éhség, szomjúság**, az alvás–ébrenlét ritmusa és a hormonrendszer irányítása tartozik hozzá.',
        madeOf: 'Mindkettő **szürkeállományú magvak** sokaságából áll; a talamusz kb. 50 magot, a hipotalamusz egy tucatnyit tartalmaz. A hipotalamusz idegsejtjei között **hormontermelő** (neuroszekréciós) sejtek is vannak, és itt van a test „főórája”, a **szuprakiazmatikus mag** is, közvetlenül a látóideg-kereszteződés fölött.',
        how: 'Az előagyhólyag hátsó részéből (köztiagyhólyag) fejlődik, a III. agykamra két oldalfalából. A belső óra a szem fényérzékeny dúcsejtjeitől kapja a világosság jelét: reggel a fény „beállítja” kb. 24 órásra. Működés: a hipotalamusz érzékelői folyamatosan mérik a vér hőmérsékletét, só- és cukortartalmát, és **negatív visszacsatolással** állítják helyre az eltéréseket (pl. melegben izzadás, szomjúság).',
        uni: 'A **talamusz** specifikus reléi: corpus geniculatum laterale (látás), mediale (hallás), VPL/VPM (testérzés), VL/VA (kisagy és bazális ganglionok → motoros kéreg). A **thalamocorticalis hurkok** ritmusai (alvási orsók, a mély alvás lassú hullámai) az EEG-n is látszanak. A **hipotalamusz** a homeosztázis integrátora: preopticus terület (hőszabályozás, alvás), nucleus supraopticus és paraventricularis (ADH, oxitocin, CRH), nucleus arcuatus (éhség: leptin- és ghrelinérzékelés, NPY/AgRP és POMC sejtek), oldalsó hipotalamusz (orexin: ébrenlét; hiánya **narkolepsziát** okoz). A **nucleus suprachiasmaticus** óragénjei (CLOCK–BMAL1, PER–CRY transzkripciós–transzlációs visszacsatolás) kb. 24 órás ritmust adnak, és a tobozmirigy melatonintermelését is vezérlik.',
        fact: 'A lázat a hipotalamusz „termosztátjának” átállítása okozza: ezért fázunk és vacogunk a láz felszálló szakaszában, pedig már melegebb a testünk a szokásosnál.'
      },
      {
        id: 'hipofizis', z: 7, name: 'Agyalapi mirigy (hipofízis)', svg: hipofizis, explode: [-12, 16], badge: [580, 238], en: 'pituitary gland (hypophysis)',
        lesson: 'biologia/ideg-hormon-emesztes', terms: ['anatomia/homeosztazis'],
        what: 'Borsónyi (kb. 0,5 g-os) mirigy, amely egy vékony nyélen lóg a hipotalamusz alatt, a koponyaalap egy csontos mélyedésében (törökülés). A hormonrendszer **„karmestere”**: hormonjaival a **pajzsmirigyet, a mellékvesét, az ivarmirigyeket** irányítja, és ő termeli a **növekedési hormont** is. A hipotalamusz utasításait hajtja végre, így köti össze az **idegrendszert** a **hormonrendszerrel**.',
        madeOf: 'Két, eltérő eredetű részből áll: az **elülső lebeny** (adenohipofízis) valódi **mirigyhám**, többféle hormontermelő sejttel; a **hátsó lebeny** (neurohipofízis) viszont **idegszövet**: a hipotalamusz idegsejtjeinek nyúlványai végződnek benne, és ezek ürítik a vérbe hormonjaikat.',
        how: 'Két irányból „nő össze”: az elülső lebeny az embrió **szájüregének** tetejéből fűződik le felfelé (Rathke-tasak), a hátsó lebeny pedig a köztiagy aljából nő lefelé. Működés: a hipotalamusz **serkentő és gátló hormonjai** egy különleges érhálózaton (kapuérrendszeren) jutnak el az elülső lebenyhez. A hormonszintek **negatív visszacsatolással** szabályozódnak: ha pl. sok pajzsmirigyhormon van a vérben, a hipofízis kevesebb pajzsmirigy-serkentő hormont (TSH) termel.',
        uni: 'Az **adenohipofízis** hormonjai: GH (növekedési hormon), PRL (prolaktin), TSH, ACTH (és POMC-származékok), FSH és LH. A hipotalamusz **releasing és inhibiting hormonjai** (TRH, CRH, GnRH, GHRH, szomatosztatin, dopamin = prolaktingátló) a **hipotalamo-hipofizer portális** keringésen át hatnak; a tengelyek (HPA, HPT, HPG) többszintű negatív visszacsatolással működnek, és a GnRH-hoz hasonlóan gyakran **pulzatilisan** szekretálódnak. A **neurohipofízis** az ADH-t (vazopresszin: vízvisszaszívás a gyűjtőcsatornákban aquaporin-2-n át) és az oxitocint (szülés, tejleadás) tárolja és üríti. Klinikum: GH-többlet gyermekkorban gigantizmust, felnőttkorban akromegáliát, ADH-hiány **diabetes insipidust** okoz.',
        fact: 'A növekedési hormon főleg mély alvás közben szabadul fel: a gyerekek valóban „alvás közben nőnek”.'
      },
      {
        id: 'kergestest', z: 5, name: 'Kérgestest', svg: kergestest, explode: [0, -16], badge: [594, 120], en: 'corpus callosum',
        lesson: 'biologia/ideg-hormon-emesztes',
        what: 'A két agyféltekét összekötő, ív alakú, vastag **„hídpillér”** a hosszanti agyrés mélyén. Rajta keresztül cserélnek információt a féltekék, így működik az agy egységesen: pl. a bal kézzel megfogott tárgy nevét (amit a jobb félteke érez) a bal félteke nyelvi területei ki tudják mondani.',
        madeOf: 'Kb. **200 millió** idegsejt-nyúlványból (axonból) álló **fehérállomány**, nagyrészt velőhüvelyes rostokkal: ezért fehér. Elülső, ívben lehajló vége a **térd**, a hátsó, megvastagodott vége a **párna**; az elülső részen a homloklebenyeket, a hátsón a nyakszirti és halántéklebenyeket kötik össze a rostok.',
        how: 'A magzati élet **12–20. hete** között alakul ki, elölről hátrafelé növekedve; a rostok velőhüvelyesedése egészen a **serdülőkor** végéig tart. Ritkán veleszületetten hiányzik: ilyenkor más pályák részben átveszik a szerepét. Súlyos, gyógyszerre nem reagáló epilepsziában régebben átvágták (callosotomia), hogy a roham ne terjedhessen át a másik féltekére.',
        uni: 'Roger **Sperry** (Nobel-díj, 1981) és Michael Gazzaniga **„split-brain”** (kettéosztott agyú) betegeken végzett vizsgálatai mutatták ki a féltekék **lateralizációját**: a csak a bal látótérbe (= jobb féltekébe) vetített tárgyat a beteg nem tudta megnevezni, de bal kezével kiválasztotta. A féltekék közti átvitel a kérgestest **homotóp** rostjain át történik (a két félteke megfelelő pontjai között), és a hallókéreg, a kéz területei között különösen sűrű; a primer látókéreg kapcsolatai főleg a függőleges középvonal környékét kötik össze, így „varrják össze” a két látótér képét. Diffúziós MRI-vel (traktográfia) a rostkötegek élőben is ábrázolhatók.',
        fact: 'Bár az agyunk két féltekéje kissé eltérően dolgozik, a „bal agyféltekés” és „jobb agyféltekés” emberek népszerű elmélete tudományosan nem igazolható.'
      },
      {
        id: 'limbikus', z: 8, name: 'Limbikus rendszer: hippokampusz és amigdala', svg: limbikus, explode: [16, 20], badge: [690, 214], en: 'limbic system: hippocampus and amygdala',
        lesson: 'biologia/ideg-hormon-emesztes', terms: ['anatomia/szinapszis'],
        what: 'A halántéklebeny belső, mély részén, a köztiagy körül gyűrűt alkotó struktúrák. A csikóhal alakú **hippokampusz** az új **emlékek** kialakításához kell: a napi élményeket ideiglenesen tárolja, majd (főként **alvás közben**) átadja a kéregnek tartós megőrzésre, és a **térbeli tájékozódásban** is fontos. A mandula alakú **amigdala** az **érzelmek**, különösen a **félelem** gyors értékelője: veszélyt jelző ingerre még azelőtt riaszt, hogy tudatosulna.',
        madeOf: 'A hippokampusz egy feltekeredett, ősibb, **háromrétegű kéreg**, amelynek kimenő rostjai a **fornix** (boltozat) ívén jutnak a köztiagyba. Az amigdala egy tucat **magból** álló szürkeállomány-csomó a hippokampusz elülső vége előtt. (A rajzon a középmetszetre vetítve látszanak, valójában oldalt, a halántéklebeny mélyén ülnek.)',
        how: 'A hippokampusz az előagy legősibb kérgéből alakul ki, és a félteke C alakú növekedésekor „gördül” be a halántéklebeny belsejébe. Különlegessége, hogy egyes részeiben **felnőttkorban is** keletkezhetnek új idegsejtek (ennek mértéke embernél vitatott). Működés: tanuláskor a hippokampusz szinapszisai **megerősödnek**; a stresszhormon (kortizol) tartós többlete viszont károsítja.',
        uni: 'A tanulás sejtszintű modellje a **hosszú távú potencírozás** (LTP), amelyet Bliss és Lømo írt le 1973-ban a hippokampuszban: a NMDA-receptor egyidejű preszinaptikus glutamátjelre és posztszinaptikus depolarizációra (Mg²⁺-blokk feloldódása) nyit, a beáramló Ca²⁺ a CaMKII aktiválásán át több **AMPA-receptort** épít a membránba (Hebb-szabály: „cells that fire together wire together”). A hippokampusz **helysejtjeit** (O’Keefe) és az entorhinális kéreg **rácssejtjeit** (May-Britt és Edvard Moser) 2014-ben Nobel-díjjal ismerték el. A **H. M.** (Henry Molaison) betegnél 1953-ban mindkét mediális temporális lebeny eltávolítása után súlyos anterográd amnézia alakult ki, de motoros tanulása (procedurális memória) megmaradt. Az amigdala a **félelmi kondicionálás** központja (LeDoux), a hipotalamuszon és az agytörzsön át a stresszválaszt indítja.',
        fact: 'A londoni taxisofőrök hippokampuszának hátsó része az évekig tartó útvonaltanulás után mérhetően megnagyobbodik.'
      },
      {
        id: 'agyhartya', z: 3, name: 'Agyhártyák és agy-gerincvelői folyadék', svg: agyhartya, explode: [0, 0], badge: [40, 486], en: 'meninges (dura mater, arachnoid mater, pia mater) and cerebrospinal fluid',
        lesson: 'termeszet/emberi-test',
        what: 'Az agyat és a gerincvelőt **három hártya** burkolja: kívül a vastag, szívós **kemény agyhártya**, középen a vékony **pókhálóhártya**, legbelül a tekervényekhez simuló **lágy agyhártya**. A pókhálóhártya alatt kering az **agy-gerincvelői folyadék** (liquor): ebben az agy szinte **úszik**, ami tompítja az ütéseket, és kb. 1,4 kg-os súlyát mintegy 50 g-ra „könnyíti”. A liquor tápanyagot szállít és a salakanyagokat is elviszi.',
        madeOf: 'A kemény agyhártya tömött, **kollagénrostos kötőszövet**, amely a koponyacsont belső felszínéhez nőtt. A pókhálóhártya finom kötőszöveti hártya, amelyből pókhálószerű **gerendák** nyúlnak le. A lágy agyhártya egyetlen vékony réteg, sok **érrel**. A liquor víztiszta folyadék: kevés fehérje, glükóz és sók; mennyisége kb. **150 ml**.',
        how: 'A liquort az agykamrák falában lévő **érfonatok** termelik a vérplazmából, naponta kb. **500 ml**-t, így naponta 3–4-szer kicserélődik. A négy agykamrán át a pókhálóhártya alatti térbe áramlik, majd a vénás öblökbe szívódik vissza. Ha valahol elzáródik az útja, a kamrák kitágulnak (**vízfejűség**). Ha a hártyákba kórokozó jut, **agyhártyagyulladás** alakul ki; a tarkómerevség intő jel. Liquorvizsgálathoz a deréktájon, a gerincvelő vége alatt vesznek mintát (lumbálpunkció).',
        uni: 'A **vér–agy gát** (a kapillárisok endothelsejtjei közti szoros kapcsolatok, asztrociták végtalpai) és a **vér–liquor gát** (az érfonat hámja) szabályozza, mi juthat be a központi idegrendszerbe: a legtöbb fehérje, sok gyógyszer és kórokozó nem. A liquornyomás fekve kb. 7–18 Hgmm. A **glimfatikus rendszer** (Nedergaard, 2013) szerint a liquor az erek körüli tereken (asztrocita-aquaporin-4 csatornák segítségével) átáramlik az agyszöveten, és kimossa a salakanyagokat, többek között a béta-amiloidot; ez **alvás közben** sokkal hatékonyabb, mert ekkor az intersticiális tér kb. 60%-kal kitágul. A kemény agyhártya alatti és feletti vérzések (subdurális, epidurális hematoma) életveszélyes koponyaűri nyomásfokozódást okozhatnak.',
        fact: 'Az agyban nincsenek fájdalomérző receptorok, a fejfájás nagy részét a hártyák és az erek receptorai okozzák. Ezért lehet egyes agyműtéteket ébren is végezni.'
      },
      {
        id: 'neuron', z: 3, name: 'Idegsejt-hálózat (neuronok és szinapszisok)', svg: neuron, explode: [0, 0], badge: [534, 438], en: 'neural network: neurons, dendrites, myelinated axon, synapse',
        link: 'sejt', lesson: 'biologia/sejt', terms: ['anatomia/neuron', 'anatomia/szinapszis', 'anatomia/akcios-potencial', 'anatomia/membranpotencial'],
        what: 'Az agy építőkövei az **idegsejtek** (neuronok): elektromos és kémiai jelekkel kommunikálnak. Minden neuron a **dendritjein** fogadja a jeleket, a **sejttestben** „összegzi” őket, és ha elég erős az inger, az **axonján** elektromos impulzust (akciós potenciált) küld tovább. A sejtek a **szinapszisokban** kapcsolódnak: itt az elektromos jel **kémiai jellé** (ingerületátvivő anyaggá) alakul. Egy neuron akár **10 000** másikkal is kapcsolatban állhat.',
        madeOf: 'Az idegsejt ugyanazokból a sejtalkotókból áll, mint a többi sejt (sejtmag, mitokondriumok, riboszómák), csak hosszú **nyúlványai** vannak. Sok axont **velőhüvely** (zsírszerű mielin) szigetel, amelyet a gliasejtek tekernek köréjük; a hüvelyt rendszeresen **befűződések** szakítják meg. A neuronokat legalább annyi **gliasejt** veszi körül, amely táplálja, védi és tisztítja őket.',
        how: 'A neuronok az embrióban az idegcső belső falán **osztódnak**, majd a kéregbe **vándorolnak**, ahol belülről kifelé, rétegenként rendeződnek. A magzati agyban **percenként** több százezer új idegsejt keletkezik. A kapcsolatok száma kisgyerekkorban a legnagyobb, utána a használt kapcsolatok **megerősödnek**, a nem használtak **elsorvadnak**. Felnőttkorban az idegsejtek többsége már nem osztódik, de a **szinapszisok** egész életünkben átépülnek: ez a tanulás alapja.',
        uni: 'A **nyugalmi membránpotenciál** (kb. −70 mV) a K⁺-ionok kifelé irányuló szivárgásán és a Na⁺/K⁺-ATPáz működésén alapul (Goldman–Hodgkin–Katz-egyenlet). Az **akciós potenciál** (Hodgkin és Huxley, 1952) a feszültségfüggő Na⁺-csatornák gyors nyitásával (depolarizáció kb. +30 mV-ig), majd inaktiválódásukkal és a K⁺-csatornák nyitásával (repolarizáció) jön létre, „mindent vagy semmit” elven. A velőhüvelyes axonon az impulzus a **Ranvier-befűződések** között ugrálva (**szaltatórikus vezetés**) akár 100–120 m/s-mal terjed, a velőhüvely nélküli vékony rostokon csak 0,5–2 m/s-mal. A kémiai szinapszisban a preszinaptikus Ca²⁺-beáramlás váltja ki a vezikulák exocitózisát (SNARE-fehérjék); az ingerületátvivő (pl. glutamát – serkentő, GABA – gátló) a posztszinaptikus receptorokon EPSP-t vagy IPSP-t kelt, amelyek az axondombon **térben és időben összegződnek**.',
        fact: 'Az agy kb. 86 milliárd idegsejtje között becslések szerint kb. 100–500 billió szinapszis van: több, mint ahány csillag a Tejútrendszerben.'
      }
    ],
    uni: {
      text: 'Az agy egyetemi szemmel egy **hierarchikusan szerveződő hálózat**. A neokortex **hat rétegű** (I. molekuláris, II–III. kérgi kapcsolatokat adó piramissejtek, IV. talamikus bemenet, V. subcorticalis kimenet, VI. talamusz felé visszacsatoló réteg), és **függőleges oszlopokba**, modulokba rendeződik (Mountcastle, **Szentágothai János**). A Brodmann-féle (1909) citoarchitektonikai térkép 52 mezője ma is a funkcionális lokalizáció közös nyelve.\n\n**Energiamérleg:** a kb. 1,4 kg-os agy nyugalomban kb. **20 W** teljesítményt használ (a test nyugalmi oxigénfogyasztásának kb. 20%-át), túlnyomórészt a Na⁺/K⁺-ATPáz működtetésére, amely az akciós potenciálok és szinaptikus áramok után helyreállítja az ionkoncentrációkat. Az ionok egyensúlyi potenciálja a **Nernst-egyenletből**: `E = (RT/zF)·ln([ion]ₖᵢᵥ/[ion]ᵦₑ)`; K⁺-ra 37 °C-on kb. −90 mV, Na⁺-ra kb. +60 mV. A nyugalmi potenciált a **GHK-egyenlet** adja a permeabilitások súlyozásával.\n\n**Mérés:** az **EEG** a kéreg piramissejtjeinek szinkron szinaptikus áramait méri a fejbőrön (µV nagyságrend, ms-os időfelbontás); az **fMRI** a **BOLD-jelet** (az oxi- és dezoxihemoglobin eltérő mágneses tulajdonságát) követi, amely a helyi idegi aktivitást kísérő véráramlás-növekedést tükrözi (mm-es térbeli, de másodperces időbeli felbontással). A két módszer kiegészíti egymást.',
      terms: ['anatomia/neuron', 'anatomia/szinapszis', 'anatomia/akcios-potencial', 'anatomia/membranpotencial', 'anatomia/reflexiv', 'anatomia/kozponti-kornyeki', 'anatomia/latas']
    },
    steps: [
      { icon: '👀', title: '1. Inger éri az érzékszervet', when: '0 ms', text: 'Egy labda repül feléd. A róla visszaverődő fényt a **szemed** ideghártyájának fényérzékelő sejtjei elnyelik, és a fényt **elektromos jellé** alakítják. A jel a **látóidegen** át az agy felé indul. (A szem felépítését a **nyakszirti lebeny** „Nézz bele” gombjával nézheted meg részletesen.) Minden érzékszerv így működik: a hang, az érintés, az íz mind **idegimpulzusokká** alakul.', parts: ['neuron'] },
      { icon: '🚦', title: '2. Átkapcsolás a talamuszban', when: 'kb. 30–40 ms', text: 'A látóideg rostjai a **talamuszba** futnak, ahol egy újabb idegsejtre kapcsolnak át. A talamusz itt **szűri és erősíti** a jeleket aszerint, mire figyelünk. Egy gyors „mellékágon” a jel az **amigdalába** is eljut, amely már ekkor felméri, veszélyes-e a közeledő tárgy.', parts: ['koztiagy', 'limbikus'] },
      { icon: '🖼️', title: '3. A kép „összerakása” a látókéregben', when: 'kb. 50–100 ms', text: 'A jel a **nyakszirti lebeny** látókérgébe ér. Itt az agy először éleket, színeket és mozgásirányokat azonosít, majd két úton dolgozza fel tovább: a **halántéklebeny** felé haladva felismeri, **mi** ez (labda!), a **fali lebeny** felé pedig kiszámolja, **hol** van és merre halad.', parts: ['nyakszirti', 'halantek', 'fali'] },
      { icon: '🤔', title: '4. Döntés a homloklebenyben', when: 'kb. 100–150 ms', text: 'A **homloklebeny** elülső része összeveti a helyzetet a céljainkkal és a korábbi tapasztalatokkal: elkapjam vagy elhajoljak? A döntést az **érzelmi értékelés** (amigdala) és az **emlékek** (hippokampusz) is befolyásolják. A két félteke közben a **kérgestesten** át egyezteti az információt.', parts: ['homlok', 'limbikus', 'kergestest'] },
      { icon: '🦾', title: '5. Parancs a mozgatókéregből', when: 'kb. 150–200 ms', text: 'A **mozgatókéreg** óriás piramissejtjei kiadják a parancsot a kar és a kéz izmainak. A **kisagy** ugyanekkor megkapja a parancs „másolatát”, és összeveti az érzékszervek jelentéseivel: ha kell, menet közben **pontosítja** a mozdulatot, hogy a kéz pont oda érjen, ahol a labda lesz.', parts: ['homlok', 'kisagy'] },
      { icon: '⬇️', title: '6. Le az agytörzsön és a gerincvelőn, az izomig', when: 'kb. 200–250 ms', text: 'A parancs a **piramispályán** lefelé fut: áthalad az **agytörzsön**, a **nyúltvelőben** átkereszteződik a másik oldalra (ezért mozgatja a bal félteke a jobb kezet), majd a **gerincvelőben** átkapcsol egy mozgatóidegsejtre. Ennek axonja egészen az **izomig** fut, ahol a szinapszisban felszabaduló acetilkolin **összehúzódásra** készteti az izomrostokat. A kezed mozdul! (Egy egyszerű **reflex**, pl. a térdreflex, ennél gyorsabb, mert az agy kihagyásával, a gerincvelőben zajlik le.)', parts: ['agytorzs', 'neuron'] },
      { icon: '🔁', title: '7. Visszajelzés és finomítás', text: 'A bőrből, az izmokból és az ízületekből érkező jelek a **fali lebeny érzőkérgébe** futnak: érzed a labda ütését a tenyereden és tudod, hol van a karod. A **kisagy** a terv és a valóság különbségéből **tanul**: legközelebb már pontosabb lesz a mozdulat. Így válik egy gyakorolt mozgás idővel **automatikussá**.', parts: ['fali', 'kisagy'] },
      { icon: '💾', title: '8. Emlék születik', text: 'Ha az élmény fontos vagy érzelmes volt (pl. eldöntötte a meccset), a **hippokampusz** szinapszisai **megerősödnek**, és rövid időre „rögzítik” az eseményt. Az **amigdala** az érzelmes emlékeket még jobban megerősíti. A tartós emlék később a **kéreg** sok területén elosztva tárolódik: az emlékezés valójában a szinapszisok **átépülése**.', parts: ['limbikus', 'neuron'] },
      { icon: '😴', title: '9. Alvás: rendrakás és mentés', text: 'Este a **hipotalamusz** belső órája és a sötétség hatására termelődő melatonin álmossá tesz, az **agytörzs** ébresztő rendszere „lehalkul”. Az alvás kb. **90 perces ciklusokból** áll (mély alvás és álmodó, ún. REM-alvás). Mély alvás közben a hippokampusz **„visszajátssza”** a nap eseményeit, és átadja őket a kéregnek, az agyhártyák alatt keringő **liquor** pedig kimossa a salakanyagokat. Ezért tanulás után az alvás az egyik legjobb „ismétlés”.', parts: ['koztiagy', 'agytorzs', 'limbikus', 'agyhartya'] }
    ],
    history: [
      { year: 'Kr. e. kb. 400', text: '**Hippokratész** és követői szerint az **agy** a gondolkodás, az érzések és az érzékelés szerve, és az epilepszia sem isteni büntetés, hanem agyi betegség. (Arisztotelész ezzel szemben a szívet tartotta az értelem székhelyének, az agyat pedig a vér „hűtőjének”.)' },
      { year: '1861', text: 'Paul **Broca** francia orvos egy betegét vizsgálja, aki csak egyetlen szótagot („tan”) tudott kimondani, de mindent megértett. Halála után a bal homloklebeny alsó részén sérülést talál: ez az első bizonyíték arra, hogy egy **konkrét képesség** az agy **meghatározott helyéhez** köthető (**Broca-terület**).' },
      { year: '1874', text: 'Carl **Wernicke** német neurológus leírja a beszédmegértés zavarát a bal halántéklebeny hátsó részének sérülésekor (**Wernicke-terület**), és megalkotja a nyelv első agyi „kapcsolási rajzát” a két terület összeköttetésével.' },
      { year: '1873–1906', text: 'Camillo **Golgi** ezüstsós „fekete reakciója” (1873) egyes idegsejteket teljes egészükben, nyúlványaikkal együtt megfesti. Ezzel a módszerrel Santiago **Ramón y Cajal** bebizonyítja, hogy az idegrendszer **különálló sejtekből** épül fel, amelyek érintkezési pontokon kapcsolódnak (**neurontan**). **1906-ban** közösen kapják a Nobel-díjat, bár Golgi élete végéig hálózatelméletet vallott.' },
      { year: '1924', text: 'Hans **Berger** német pszichiáter Jénában elsőként rögzíti az emberi agy elektromos tevékenységét a fejbőrre helyezett elektródákkal: ez az **EEG** (elektroenkefalogram). Ő írja le az ellazult, csukott szemű állapot kb. 10 Hz-es **alfa-hullámait** is (közölve 1929-ben).' },
      { year: '1937–1950', text: 'Wilder **Penfield** kanadai idegsebész ébren műtött epilepsziás betegeinek agykérgét gyenge árammal ingerli, és feljegyzi, mit mozdítanak, mit éreznek. Ebből rajzolja meg a mozgató- és érzőkéreg térképét, a torz arányú „kis embert”, a **homunculust**.' },
      { year: '1967', text: '**Szentágothai János** (1912–1994), a magyar neuroanatómia kiemelkedő alakja, John Ecclesszel és Ito Maszaóval megjelenteti „A kisagy mint idegi gépezet” című alapművét. Később kidolgozza az agykéreg **moduláris (oszlopos) szerveződésének** modelljét. A Semmelweis Egyetem professzora, 1977–1985 között a Magyar Tudományos Akadémia elnöke volt.' },
      { year: '1990-es évek', text: 'Ogawa Szeidzsi 1990-ben leírja a **BOLD-jelet**, és 1991–92-től megjelenik a **funkcionális MRI** (fMRI): sugárterhelés nélkül, élő, gondolkodó emberben lehet megfigyelni, melyik agyterület aktív. Az évtizedet az USA-ban hivatalosan is „az agy évtizedének” nevezték.' }
    ],
    quiz: [
      { q: 'Melyik lebenyben van az elsődleges látókéreg?', options: ['A nyakszirti lebenyben', 'A homloklebenyben', 'A fali lebenyben', 'A halántéklebenyben'], answer: 0, explain: 'A látókéreg a tarkó mögött, a nyakszirti lebenyben van; a hallókéreg a halántéklebenyben, a mozgatókéreg a homloklebenyben.' },
      { q: 'Mi a kisagy fő feladata?', options: ['A mozgások összehangolása és az egyensúly', 'A beszéd megértése', 'A testhőmérséklet szabályozása', 'Az emlékek hosszú távú tárolása'], answer: 0, explain: 'A kisagy finomhangolja a mozgásokat, felel az egyensúlyért és a begyakorolt mozgások automatizálásáért.' },
      { q: 'Miért mozgatja a bal agyfélteke a jobb testfelet?', options: ['Mert a mozgatópálya rostjai a nyúltvelőben átkereszteződnek', 'Mert a kérgestest megfordítja a jeleket', 'Mert a jobb félteke csak érzékel', 'Mert a kisagy átirányítja a parancsokat'], answer: 0, explain: 'A piramispálya rostjainak nagy része a nyúltvelő alján a másik oldalra kerül.' },
      { q: 'Melyik agyterület nélkülözhetetlen új emlékek kialakításához?', options: ['A hippokampusz', 'A kisagy', 'A nyúltvelő', 'Az agyalapi mirigy'], answer: 0, explain: 'H. M. hippokampuszának eltávolítása után nem tudott új emlékeket kialakítani, a régiek viszont megmaradtak.' },
      { q: 'Mi köti össze az idegrendszert a hormonrendszerrel?', options: ['A hipotalamusz és az agyalapi mirigy', 'A kérgestest', 'A talamusz és a kisagy', 'Az agyhártyák'], answer: 0, explain: 'A hipotalamusz hormonjai irányítják a hipofízist, amely a többi belső elválasztású mirigyet vezérli.' }
    ]
  });
})();
