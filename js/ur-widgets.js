/* Tudásműhely – csillagászati widgetek (Csillagászat és űr tantárgy).
 * Leckében:  widget: { type: 'naprendszer' } · { type: 'palyaszim' } · { type: 'holdfazis' } · { type: 'egbolt' }
 * Mindegyik önálló (nincs külső könyvtár), a számítások saját, egyszerűsített csillagászati képletekkel készülnek:
 *   – bolygópályák: JPL „Keplerian elements for approximate positions” (J2000 elemek, 1800–2050 között ~1° pontosság),
 *   – Nap és Hold: rövidített Meeus-képletek (~1°), csillagidő: IAU GMST-közelítés,
 *   – csillagkatalógus: kb. 170 fényes csillag J2000 koordinátái (a precessziót elhanyagoljuk, 2026-ban ez ~0,4°). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc, fmt = S.fmt;
  var RAD = Math.PI / 180;

  function head(t, h) { return '<div class="w-title">' + esc(t) + '</div>' + (h ? '<p class="w-help">' + S.inline(h) + '</p>' : ''); }
  function seg(name, opts, cur) {
    return '<div class="seg ur-seg" data-seg="' + name + '">' + opts.map(function (o) {
      return '<button type="button" data-val="' + esc(o[0]) + '" class="' + (String(o[0]) === String(cur) ? 'on' : '') + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function onSeg(el, name, cb) {
    var box = el.querySelector('[data-seg="' + name + '"]');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      box.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      cb(b.dataset.val);
    });
  }
  function setSeg(el, name, val) {
    el.querySelectorAll('[data-seg="' + name + '"] button').forEach(function (x) { x.classList.toggle('on', x.dataset.val === String(val)); });
  }
  function rng(k, label, min, max, step, val, unit) {
    return '<label><span class="lv"><span>' + esc(label) + '</span><b><span data-v="' + k + '">' + fmt(val) + '</span> ' + esc(unit || '') + '</b></span>' +
      '<input type="range" data-k="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>';
  }
  function res(items) {
    return '<div class="w-res">' + items.map(function (x) { return '<div><small>' + esc(x[0]) + '</small><b>' + x[1] + '</b></div>'; }).join('') + '</div>';
  }
  /* Animáció, amely leáll, ha a widget eltűnik az oldalról. */
  function loop(el, fn) {
    var last = null;
    function tick(t) {
      if (!document.body.contains(el)) return;
      var dt = last == null ? 0 : Math.min(0.1, (t - last) / 1000);
      last = t; fn(dt);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function f1(x) { return x.toFixed(1); }
  function norm360(x) { x %= 360; return x < 0 ? x + 360 : x; }
  function jdOf(ms) { return ms / 86400000 + 2440587.5; }
  var HONAP = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];
  function huDate(d) { return d.getFullYear() + '. ' + HONAP[d.getMonth()] + ' ' + d.getDate() + '.'; }

  /* ---------- közös égimechanika ---------- */
  /* JPL közelítő pályaelemek, J2000: a [CSE], e, I [°], L [°], L változása [°/évszázad], ϖ [°], Ω [°] */
  var EL = {
    merkur: [0.38709927, 0.20563593, 7.00497902, 252.25032350, 149472.67411175, 77.45779628, 48.33076593],
    venusz: [0.72333566, 0.00677672, 3.39467605, 181.97909950, 58517.81538729, 131.60246718, 76.67984255],
    fold: [1.00000261, 0.01671123, -0.00001531, 100.46457166, 35999.37244981, 102.93768193, 0],
    mars: [1.52371034, 0.09339410, 1.84969142, -4.55343205, 19140.30268499, -23.94362959, 49.55953891],
    jupiter: [5.20288700, 0.04838624, 1.30439695, 34.39644051, 3034.74612775, 14.72847983, 100.47390909],
    szaturnusz: [9.53667594, 0.05386179, 2.48599187, 49.95424423, 1222.49362201, 92.59887831, 113.66242448],
    uranusz: [19.18916464, 0.04725744, 0.77263783, 313.23810451, 428.48202785, 170.95427630, 74.01692503],
    neptunusz: [30.06992276, 0.00859048, 1.77004347, -55.12002969, 218.45945325, 44.96476227, 131.78422574]
  };
  /* heliocentrikus ekliptikai derékszögű koordináták (CSE), T: Julián-évszázad J2000 óta */
  function helio(k, T) {
    var e = EL[k], a = e[0], ec = e[1], I = e[2] * RAD, L = e[3] + e[4] * T, w = e[5], O = e[6] * RAD;
    var M = norm360(L - w) * RAD, om = w * RAD - O, E = M;
    for (var i = 0; i < 8; i++) E -= (E - ec * Math.sin(E) - M) / (1 - ec * Math.cos(E));
    var xp = a * (Math.cos(E) - ec), yp = a * Math.sqrt(1 - ec * ec) * Math.sin(E);
    var co = Math.cos(om), so = Math.sin(om), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I), sI = Math.sin(I);
    return [(co * cO - so * sO * cI) * xp + (-so * cO - co * sO * cI) * yp,
      (co * sO + so * cO * cI) * xp + (-so * sO + co * cO * cI) * yp,
      (so * sI) * xp + (co * sI) * yp];
  }
  var EPS = 23.43928 * RAD;
  function eclToEq(x, y, z) {
    var ye = y * Math.cos(EPS) - z * Math.sin(EPS), ze = y * Math.sin(EPS) + z * Math.cos(EPS);
    return [norm360(Math.atan2(ye, x) / RAD), Math.atan2(ze, Math.sqrt(x * x + ye * ye)) / RAD];   // [RA fokban, Dec fokban]
  }
  function planetRaDec(k, jd) {
    var T = (jd - 2451545) / 36525, p = helio(k, T), E = helio('fold', T);
    return eclToEq(p[0] - E[0], p[1] - E[1], p[2] - E[2]);
  }
  function sunEcl(jd) {
    var n = jd - 2451545, L = 280.460 + 0.9856474 * n, g = (357.528 + 0.9856003 * n) * RAD;
    return norm360(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
  }
  function moonEcl(jd) {
    var d = jd - 2451545;
    var L = 218.316 + 13.176396 * d, M = (134.963 + 13.064993 * d) * RAD, F = (93.272 + 13.229350 * d) * RAD;
    var Ms = (357.529 + 0.98560028 * d) * RAD, D = (297.850 + 12.190749 * d) * RAD;
    var lam = L + 6.289 * Math.sin(M) + 1.274 * Math.sin(2 * D - M) + 0.658 * Math.sin(2 * D) + 0.214 * Math.sin(2 * M) - 0.186 * Math.sin(Ms) - 0.114 * Math.sin(2 * F);
    return [norm360(lam), 5.128 * Math.sin(F)];
  }
  function eclLonLatToEq(lam, bet) {
    var l = lam * RAD, b = bet * RAD;
    return eclToEq(Math.cos(b) * Math.cos(l), Math.cos(b) * Math.sin(l), Math.sin(b));
  }
  var SYN = 29.530589, NEW0 = 2451550.26;   // szinodikus hónap; egy ismert újhold (2000. jan. 6.)
  function moonAge(jd) { var a = (jd - NEW0) % SYN; return a < 0 ? a + SYN : a; }
  function phaseName(age) {
    var f = age / SYN;
    if (f < 0.0339 || f > 0.9661) return 'újhold';
    if (f < 0.216) return 'növő sarló';
    if (f < 0.284) return 'első negyed (növő félhold)';
    if (f < 0.466) return 'növő hold (dagadó)';
    if (f < 0.534) return 'telihold';
    if (f < 0.716) return 'fogyó hold';
    if (f < 0.784) return 'utolsó negyed (fogyó félhold)';
    return 'fogyó sarló';
  }
  /* A Hold korongja a Földről (északi félteke): age napokban. Visszaad egy SVG-töredéket. */
  function moonDisc(cx, cy, R, age) {
    var el = age / SYN * 360, waxing = el < 180, c = Math.cos(el * RAD), rx = Math.abs(R * c);
    var crescent = c > 0;   // az elongáció < 90° vagy > 270°: sarló
    var s1 = waxing ? 1 : 0, s2 = waxing ? (crescent ? 0 : 1) : (crescent ? 1 : 0);
    var lit = 'M' + f1(cx) + ' ' + f1(cy - R) + ' A' + R + ' ' + R + ' 0 0 ' + s1 + ' ' + f1(cx) + ' ' + f1(cy + R) +
      ' A' + f1(rx) + ' ' + R + ' 0 0 ' + s2 + ' ' + f1(cx) + ' ' + f1(cy - R) + ' Z';
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="#2b2f3a"/>' +
      '<path d="' + lit + '" fill="#f2ecd6"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="rgba(255,255,255,.25)"/>';
  }
  function illum(age) { return (1 - Math.cos(age / SYN * 2 * Math.PI)) / 2; }

  /* =====================================================================
   * 1. Naprendszer-modell
   * ===================================================================== */
  var PL = [
    // id, név, a [CSE], keringési idő [nap], átmérő [km], szín, tömeg [Föld=1], nap hossza, holdak, hőmérséklet, érdekesség
    ['merkur', 'Merkúr', 0.387, 87.97, 4879, '#b9b0a2', 0.055, '176 földi nap (napkeltétől napkeltéig)', '0', '−180 … +430 °C', 'A legkisebb bolygó. Szinte nincs légköre, ezért nappal izzik, éjjel fagyos.'],
    ['venusz', 'Vénusz', 0.723, 224.70, 12104, '#e8c27a', 0.815, '117 földi nap; visszafelé forog', '0', 'kb. +465 °C', 'Sűrű szén-dioxid légköre miatt a legforróbb bolygó, forróbb a Merkúrnál is.'],
    ['fold', 'Föld', 1.000, 365.26, 12756, '#3b82f6', 1, '24 óra', '1', 'átlag kb. +15 °C', 'Az egyetlen ismert bolygó, ahol élet van, és a felszínén folyékony víz.'],
    ['mars', 'Mars', 1.524, 686.98, 6792, '#e0703f', 0.107, '24 óra 40 perc', '2 (Phobos, Deimos)', 'átlag kb. −65 °C', 'Itt van a Naprendszer legmagasabb vulkánja, az Olympus Mons (kb. 22 km).'],
    ['jupiter', 'Jupiter', 5.203, 4332.6, 142984, '#d8b08c', 317.8, '9 óra 56 perc', 'több mint 100', 'felhőtető kb. −110 °C', 'A legnagyobb bolygó: tömege több mint kétszerese az összes többi bolygóénak együtt. A Nagy Vörös Folt nagyobb a Földnél.'],
    ['szaturnusz', 'Szaturnusz', 9.537, 10759, 120536, '#e3cf8f', 95.2, '10 óra 33 perc', 'több mint 280', 'felhőtető kb. −140 °C', 'Gyűrűi jégdarabokból állnak, átmérőjük kb. 270 000 km, de vastagságuk általában csak néhány tíz méter.'],
    ['uranusz', 'Uránusz', 19.19, 30687, 51118, '#9fd8e0', 14.5, '17 óra 14 perc', '28–29', 'kb. −195 °C', 'Kb. 98°-ban megdőlt tengellyel szinte „gurulva” kering a Nap körül.'],
    ['neptunusz', 'Neptunusz', 30.07, 60190, 49528, '#5b7cf0', 17.1, '16 óra 6 perc', '16', 'kb. −200 °C', 'Itt fújnak a Naprendszer leggyorsabb szelei, több mint 2000 km/h sebességgel.']
  ];
  var AU_KM = 149597871;
  S.addWidget('naprendszer', function (el) {
    var dist = 'belso', size = 'nagyitott', speed = 10, t = Date.now(), sel = 'fold';
    var W = 520, C = 260, RMAX = 245;
    el.classList.add('ur');
    el.innerHTML = head('A Naprendszer felülről', 'A bolygók a valódi keringési idejük arányában mozognak (a kiinduló állás a mai napé). A pályákat körnek rajzoltuk; a valóságban enyhén elnyúlt ellipszisek. **Kattints egy bolygóra!**') +
      '<div class="ur-ctrls">' +
      '<div><small>Távolságok</small>' + seg('d', [['belso', 'Belső bolygók (valós arány)'], ['valos', 'Mind (valós arány)'], ['tomoritett', 'Mind (összenyomva)']], dist) + '</div>' +
      '<div><small>Bolygóméretek</small>' + seg('s', [['nagyitott', 'Felnagyítva'], ['valos', 'Valós arányban']], size) + '</div>' +
      '<div><small>Idő</small>' + seg('v', [['0', '⏸ Áll'], ['1', '1 nap/s'], ['10', '10 nap/s'], ['60', '2 hónap/s'], ['365', '1 év/s'], ['3650', '10 év/s']], speed) + '</div>' +
      '</div>' +
      '<div class="ur-split"><svg class="w-svg ur-space" viewBox="0 0 ' + W + ' ' + W + '" role="img" aria-label="Naprendszer-modell"></svg>' +
      '<div class="ur-side"><div class="ur-date"><b data-o="date"></b> <button type="button" class="btn sm" data-a="ma">Ma</button></div>' +
      '<p class="ur-note" data-o="note"></p><div class="ur-info" data-o="info"></div></div></div>';
    var svg = el.querySelector('svg');
    function scaleAU() { return dist === 'belso' ? RMAX / 1.62 : RMAX / 31; }
    function rOf(a) {
      if (dist === 'tomoritett') return 30 + (RMAX - 30) * Math.sqrt(a / 30.07);
      return a * scaleAU();
    }
    function sizeOf(p) {
      if (size === 'nagyitott') return 2.2 + 1.5 * Math.sqrt(p[4] / 4879);
      return p[4] / 2 / AU_KM * (dist === 'tomoritett' ? RMAX / 31 : scaleAU());
    }
    function sunSize() { return size === 'nagyitott' ? 13 : 696000 / AU_KM * (dist === 'tomoritett' ? RMAX / 31 : scaleAU()); }
    function build() {
      var h = '<defs><radialGradient id="ur-sun"><stop offset="0" stop-color="#fff7c2"/><stop offset=".6" stop-color="#ffc93c"/><stop offset="1" stop-color="#ff8a00"/></radialGradient></defs>';
      // halvány „csillagok” a háttérben (álvéletlen, hogy mindig ugyanott legyenek)
      var sd = 7;
      for (var i = 0; i < 90; i++) { sd = (sd * 16807) % 2147483647; var x = sd % W; sd = (sd * 16807) % 2147483647; var y = sd % W; h += '<circle cx="' + x + '" cy="' + y + '" r="' + (i % 7 ? 0.6 : 1) + '" fill="rgba(255,255,255,.35)"/>'; }
      PL.forEach(function (p) {
        var r = rOf(p[2]);
        if (r < RMAX + 8) h += '<circle cx="' + C + '" cy="' + C + '" r="' + f1(r) + '" fill="none" stroke="rgba(160,180,230,.28)" stroke-width="' + (p[0] === sel ? 1.6 : 0.8) + '"/>';
      });
      if (dist !== 'belso') {
        var r1 = rOf(2.2), r2 = rOf(3.3);
        h += '<circle cx="' + C + '" cy="' + C + '" r="' + f1((r1 + r2) / 2) + '" fill="none" stroke="rgba(190,170,140,.18)" stroke-width="' + f1(Math.max(1, r2 - r1)) + '"/>';
      }
      var ss = sunSize();
      h += '<circle cx="' + C + '" cy="' + C + '" r="' + f1(Math.max(ss, 0.8)) + '" fill="url(#ur-sun)"/>';
      if (ss < 4) h += '<circle cx="' + C + '" cy="' + C + '" r="7" fill="none" stroke="#ffc93c" stroke-dasharray="2 2"/>';
      PL.forEach(function (p) {
        var s = sizeOf(p), tiny = s < 2;
        h += '<g class="ur-pl" data-id="' + p[0] + '" tabindex="0" role="button" aria-label="' + esc(p[1]) + '"><title>' + esc(p[1]) + '</title>' +
          '<circle class="hit" r="' + Math.max(11, s + 4) + '" fill="transparent"/>' +
          (tiny ? '<circle r="5" fill="none" stroke="' + p[5] + '" stroke-width="1.2"/>' : '') +
          (p[0] === 'szaturnusz' && !tiny ? '<ellipse rx="' + f1(s * 2.1) + '" ry="' + f1(s * 0.7) + '" fill="none" stroke="#cdb77a" stroke-width="1.4"/>' : '') +
          '<circle class="body" r="' + f1(Math.max(s, 0.7)) + '" fill="' + p[5] + '"/>' +
          '<text class="ur-lbl" y="' + f1(-Math.max(s, 5) - 4) + '" text-anchor="middle">' + esc(p[1]) + '</text></g>';
      });
      h += '<text class="ur-lbl" x="10" y="' + (W - 10) + '" style="font-size:11px;opacity:.75">' +
        (dist === 'tomoritett' ? 'A távolságok összenyomva – NEM arányosak!' : 'Lépték: 1 CSE = ' + fmt(scaleAU(), 0) + ' képpont') + '</text>';
      svg.innerHTML = h;
      svg.querySelectorAll('.ur-pl').forEach(function (g) {
        g.addEventListener('click', function () { sel = g.dataset.id; build(); info(); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sel = g.dataset.id; build(); info(); } });
      });
      place();
      note();
    }
    function place() {
      var T = (jdOf(t) - 2451545) / 36525;
      PL.forEach(function (p) {
        var g = svg.querySelector('.ur-pl[data-id="' + p[0] + '"]'), e = EL[p[0]];
        var L = norm360(e[3] + e[4] * T) * RAD, r = rOf(p[2]);
        var x = C + r * Math.cos(L), y = C - r * Math.sin(L);
        g.setAttribute('transform', 'translate(' + f1(x) + ' ' + f1(y) + ')');
        g.style.display = r > RMAX + 8 ? 'none' : '';
        var tx = g.querySelector('text'); tx.setAttribute('text-anchor', x > W - 45 ? 'end' : x < 45 ? 'start' : 'middle');
        g.classList.toggle('sel', p[0] === sel);
      });
      el.querySelector('[data-o="date"]').textContent = huDate(new Date(t));
    }
    function note() {
      var n = [];
      if (dist === 'belso') n.push('A Jupiter és a külső bolygók ebben a léptékben kívül esnek a képen: a Jupiter 3,4-szer messzebb van a Naptól, mint a Mars.');
      if (dist === 'valos') n.push('Valós távolságokkal a belső bolygók szinte a Napba olvadnak, pedig a kép a valóságnál már így is jóval „zsúfoltabb”.');
      if (size === 'valos') n.push('**Valós méretarányban** a bolygók és sokszor még a Nap is kisebbek egy képpontnál – ezért jelöltük őket gyűrűvel. A valódi méretek és távolságok egyszerre nem férnek ki semmilyen képernyőre.');
      else n.push('A bolygóméreteket erősen felnagyítottuk. A Nap valójában a Földnél 109-szer nagyobb átmérőjű.');
      el.querySelector('[data-o="note"]').innerHTML = S.inline(n.join(' '));
    }
    function info() {
      var p = PL.filter(function (x) { return x[0] === sel; })[0];
      var yrs = p[3] / 365.256;
      el.querySelector('[data-o="info"]').innerHTML = '<b style="color:' + p[5] + '">● ' + esc(p[1]) + '</b>' +
        '<table class="ur-tab"><tbody>' +
        '<tr><td>Átlagos távolság a Naptól</td><td>' + fmt(p[2], 3) + ' CSE (' + fmt(p[2] * 149.6, 1) + ' millió km)</td></tr>' +
        '<tr><td>Keringési idő (év)</td><td>' + (yrs < 2 ? fmt(p[3], 1) + ' nap' : fmt(yrs, 2) + ' földi év') + '</td></tr>' +
        '<tr><td>Átmérő</td><td>' + fmt(p[4], 0) + ' km (' + fmt(p[4] / 12756, 2) + ' × Föld)</td></tr>' +
        '<tr><td>Tömeg</td><td>' + fmt(p[6], 3) + ' × Föld</td></tr>' +
        '<tr><td>Egy nap hossza</td><td>' + esc(p[7]) + '</td></tr>' +
        '<tr><td>Ismert holdak (2026)</td><td>' + esc(p[8]) + '</td></tr>' +
        '<tr><td>Hőmérséklet</td><td>' + esc(p[9]) + '</td></tr></tbody></table>' +
        '<p class="ur-note">' + esc(p[10]) + '</p>';
    }
    onSeg(el, 'd', function (v) { dist = v; build(); });
    onSeg(el, 's', function (v) { size = v; build(); });
    onSeg(el, 'v', function (v) { speed = parseFloat(v); });
    el.querySelector('[data-a="ma"]').addEventListener('click', function () { t = Date.now(); place(); });
    build(); info();
    loop(el, function (dt) { if (speed) { t += dt * speed * 86400000; place(); } });
  });

  /* =====================================================================
   * 2. Pályaszimulátor (Newton ágyúgolyója)
   * ===================================================================== */
  var MU = 398600.4418, RE = 6371;   // km³/s², km
  S.addWidget('palyaszim', function (el) {
    var v = 7.67, h = 400, ang = 0, path = [], tAnim = 0, Ttot = 1, kind = '', VR = RE * 1.3;
    el.classList.add('ur');
    el.innerHTML = head('Pályaszimulátor: Newton ágyúgolyója', 'Egy test indul a Föld fölött adott magasságból, vízszintesen (vagy kicsit felfelé). A számítógép kis időlépésekben kiszámolja a mozgását (numerikus integrálás). **Légellenállás nélkül** számolunk – a valóságban 100–200 km alatt a légkör gyorsan lefékezné.') +
      '<div class="ur-ctrls"><div><small>Gyors beállítás</small>' + seg('p', [['lees', 'Leesik'], ['kor', 'Körpálya'], ['ell', 'Ellipszis'], ['szok', 'Szökés']], 'kor') + '</div></div>' +
      '<div class="w-grid"><div class="w-ctrl">' +
      rng('v', 'Kezdősebesség', 2, 13, 0.01, v, 'km/s') + rng('h', 'Indulási magasság', 100, 3000, 10, h, 'km') + rng('a', 'Emelkedési szög', 0, 40, 1, ang, '°') +
      '<button type="button" class="btn primary" data-a="go">🚀 Újra</button><div data-o="r"></div></div>' +
      '<div class="w-out"><svg class="w-svg ur-space" viewBox="0 0 520 440" role="img" aria-label="Pálya a Föld körül"></svg>' +
      '<div class="w-formula">v₁ = √(γM/r) · v₂ = √(2γM/r) = √2 · v₁</div></div></div>';
    var svg = el.querySelector('svg'), CX = 260, CY = 220, PIX = 205;
    function readIn() {
      el.querySelectorAll('input[type=range]').forEach(function (i) {
        var x = parseFloat(i.value); el.querySelector('[data-v="' + i.dataset.k + '"]').textContent = fmt(x);
        if (i.dataset.k === 'v') v = x; if (i.dataset.k === 'h') h = x; if (i.dataset.k === 'a') ang = x;
      });
    }
    function setIn(k, x) { var i = el.querySelector('input[data-k="' + k + '"]'); i.value = x; }
    function acc(x, y) { var r2 = x * x + y * y, r = Math.sqrt(r2), k = -MU / (r2 * r); return [k * x, k * y]; }
    function simulate() {
      var r0 = RE + h, a = ang * RAD;
      var x = 0, y = r0, vx = v * Math.cos(a), vy = v * Math.sin(a);
      var eps = v * v / 2 - MU / r0, hm = r0 * v * Math.cos(a), e = Math.sqrt(Math.max(0, 1 + 2 * eps * hm * hm / (MU * MU)));
      var sa = eps < 0 ? -MU / (2 * eps) : Infinity, rp = isFinite(sa) ? sa * (1 - e) : hm * hm / MU / (1 + e), ra = isFinite(sa) ? sa * (1 + e) : Infinity;
      var T = isFinite(sa) ? 2 * Math.PI * Math.sqrt(sa * sa * sa / MU) : Infinity;
      if (eps >= 0) kind = 'szok'; else if (rp < RE) kind = 'lees'; else if (e < 0.01) kind = 'kor'; else kind = 'ell';
      VR = kind === 'szok' ? Math.max(RE * 5, r0 * 2.5) : Math.min(Math.max(ra * 1.08, r0 * 1.15, RE * 1.25), RE * 14);
      if (kind === 'lees') VR = Math.max(r0 * 1.15, RE * 1.25);
      var tmax = kind === 'szok' ? 4e5 : kind === 'lees' ? T : T * 1.02, dt = Math.max(1, Math.min(20, tmax / 3000));
      path = [[x, y, 0]];
      var t = 0, n = 0;
      while (t < tmax && n < 40000) {
        // RK4 lépés
        var k1 = acc(x, y), k1x = vx, k1y = vy;
        var k2 = acc(x + k1x * dt / 2, y + k1y * dt / 2), k2x = vx + k1[0] * dt / 2, k2y = vy + k1[1] * dt / 2;
        var k3 = acc(x + k2x * dt / 2, y + k2y * dt / 2), k3x = vx + k2[0] * dt / 2, k3y = vy + k2[1] * dt / 2;
        var k4 = acc(x + k3x * dt, y + k3y * dt), k4x = vx + k3[0] * dt, k4y = vy + k3[1] * dt;
        x += dt / 6 * (k1x + 2 * k2x + 2 * k3x + k4x); y += dt / 6 * (k1y + 2 * k2y + 2 * k3y + k4y);
        vx += dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); vy += dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
        t += dt; n++;
        if (n % 3 === 0) path.push([x, y, t]);
        var r = Math.sqrt(x * x + y * y);
        if (r < RE) { path.push([x * RE / r, y * RE / r, t]); break; }
        if (r > VR * 1.05) { path.push([x, y, t]); break; }
      }
      Ttot = path[path.length - 1][2] || 1; tAnim = 0;
      var v1 = Math.sqrt(MU / r0), v2 = Math.sqrt(2 * MU / r0);
      var names = { lees: '💥 Leesik', kor: '⭕ Körpálya', ell: '🥚 Ellipszispálya', szok: '🚀 Szökés' };
      var items = [['Eredmény', names[kind]], ['Körsebesség ezen a magasságon', fmt(v1, 2) + ' km/s'], ['Szökési sebesség itt', fmt(v2, 2) + ' km/s']];
      if (kind === 'kor' || kind === 'ell') {
        items.push(['Keringési idő', T < 7200 ? fmt(T / 60, 1) + ' perc' : fmt(T / 3600, 1) + ' óra']);
        items.push(['Legkisebb magasság', fmt(rp - RE, 0) + ' km']);
        items.push(['Legnagyobb magasság', fmt(ra - RE, 0) + ' km']);
      }
      if (kind === 'lees') items.push(['Repülési idő', fmt(Ttot / 60, 1) + ' perc']);
      el.querySelector('[data-o="r"]').innerHTML = res(items) + '<p class="ur-note">' + S.inline({
        lees: 'A sebesség kevés: a pálya metszi a Föld felszínét. Gyorsabb test messzebb ér földet.',
        kor: 'Pont akkora a sebesség, hogy esés közben a Föld felszíne ugyanannyit görbül el alatta: a test folyamatosan „mellé esik”.',
        ell: 'A körsebességnél gyorsabb (vagy ferdén induló) test **ellipszispályára** áll: napközel helyett itt **földközel** és **földtávol** pontja van.',
        szok: 'Elérte a szökési sebességet: a mozgási energiája legyőzi a gravitációs kötést, és végleg elhagyja a Földet (hiperbola- vagy parabolapálya).'
      }[kind]) + '</p>';
      setSeg(el, 'p', kind);
      draw();
    }
    function P(x, y) { return [CX + x / VR * PIX, CY - y / VR * PIX]; }
    function draw() {
      var re = RE / VR * PIX, atm = (RE + 100) / VR * PIX;
      var hh = '<defs><radialGradient id="ur-earth" cx=".35" cy=".35"><stop offset="0" stop-color="#6fb3ff"/><stop offset=".7" stop-color="#2c6bc4"/><stop offset="1" stop-color="#173b78"/></radialGradient></defs>';
      hh += '<circle cx="' + CX + '" cy="' + CY + '" r="' + f1(atm) + '" fill="rgba(120,180,255,.18)"/>';
      hh += '<circle cx="' + CX + '" cy="' + CY + '" r="' + f1(re) + '" fill="url(#ur-earth)"/>';
      // „hegy” és ágyú az indulási ponton
      var s0 = P(0, RE), s1 = P(0, RE + h);
      hh += '<line x1="' + f1(s0[0]) + '" y1="' + f1(s0[1]) + '" x2="' + f1(s1[0]) + '" y2="' + f1(s1[1]) + '" stroke="#9aa6b8" stroke-width="2"/>';
      // kör- és szökési referencia
      var rr = (RE + h) / VR * PIX;
      if (rr < 300) hh += '<circle cx="' + CX + '" cy="' + CY + '" r="' + f1(rr) + '" fill="none" stroke="rgba(255,255,255,.22)" stroke-dasharray="3 4"/>';
      var col = { lees: '#ff6b6b', kor: '#4ade80', ell: '#facc15', szok: '#c084fc' }[kind];
      var k = 0, d = '';
      for (var i = 0; i < path.length; i++) {
        if (path[i][2] > tAnim) break;
        var q = P(path[i][0], path[i][1]); d += (i ? 'L' : 'M') + f1(q[0]) + ' ' + f1(q[1]); k = i;
      }
      var full = '';
      path.forEach(function (p, i) { var q = P(p[0], p[1]); full += (i ? 'L' : 'M') + f1(q[0]) + ' ' + f1(q[1]); });
      hh += '<path d="' + full + '" fill="none" stroke="' + col + '" stroke-opacity=".25" stroke-width="1.5" stroke-dasharray="4 4"/>';
      hh += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.4"/>';
      var cur = P(path[k][0], path[k][1]);
      hh += '<circle cx="' + f1(cur[0]) + '" cy="' + f1(cur[1]) + '" r="5" fill="#fff" stroke="' + col + '" stroke-width="2"/>';
      hh += '<text class="ur-lbl" x="10" y="20">Föld (valódi méretarányban) · szaggatott kör: az indulási magasság</text>';
      hh += '<text class="ur-lbl" x="10" y="430" style="font-size:11px;opacity:.75">a látómező sugara: ' + fmt(VR, 0) + ' km · világoskék sáv: a légkör alsó 100 km-e</text>';
      svg.innerHTML = hh;
    }
    el.querySelectorAll('input[type=range]').forEach(function (i) { i.addEventListener('input', function () { readIn(); simulate(); }); });
    onSeg(el, 'p', function (val) {
      readIn();
      var r0 = RE + h, v1 = Math.sqrt(MU / r0);
      setIn('a', 0);
      setIn('v', ({ lees: v1 * 0.8, kor: v1, ell: v1 * 1.15, szok: v1 * Math.SQRT2 * 1.02 })[val].toFixed(2));
      readIn(); simulate();
    });
    el.querySelector('[data-a="go"]').addEventListener('click', function () { tAnim = 0; });
    readIn(); simulate();
    loop(el, function (dt) {
      if (tAnim >= Ttot) return;
      tAnim = Math.min(Ttot, tAnim + dt * Ttot / 7);
      draw();
    });
  });

  /* =====================================================================
   * 3. Holdfázis-magyarázó
   * ===================================================================== */
  S.addWidget('holdfazis', function (el) {
    var age = moonAge(jdOf(Date.now())), play = false;
    el.classList.add('ur');
    el.innerHTML = head('Holdfázisok: felülnézet és nézet a Földről', 'Bal oldalon felülről (az északi pólus felől) látod a Napot, a Földet és a Hold pályáját; jobb oldalon azt, amit Magyarországról látsz az égen. A Hold mindkét képen pontosan félig van megvilágítva – csak a nézőpont más.') +
      '<div class="ur-ctrls"><label class="ur-wide"><span class="lv"><span>A Hold „kora” (napok az újhold óta)</span><b data-o="age"></b></span><input type="range" min="0" max="29.5" step="0.05" data-k="age"></label>' +
      '<div class="ur-btns"><button type="button" class="btn" data-a="play">▶ Lejátszás</button><button type="button" class="btn" data-a="ma">🌙 A mai Hold</button></div></div>' +
      '<div class="ur-two"><svg class="w-svg ur-space" viewBox="0 0 360 300" data-o="top" role="img" aria-label="Nap, Föld és Hold felülről"></svg>' +
      '<svg class="w-svg ur-space" viewBox="0 0 240 300" data-o="view" role="img" aria-label="A Hold a Földről nézve"></svg></div><div data-o="r"></div>';
    var inp = el.querySelector('input[data-k="age"]');
    function draw() {
      inp.value = age.toFixed(2);
      el.querySelector('[data-o="age"]').textContent = fmt(age, 1) + ' nap';
      var cx = 205, cy = 150, R = 105, ps = 180 + age / SYN * 360, mx = cx + R * Math.cos(ps * RAD), my = cy - R * Math.sin(ps * RAD);
      var h = '';
      for (var i = 0; i < 6; i++) { var yy = 40 + i * 44; h += '<line x1="6" y1="' + yy + '" x2="44" y2="' + yy + '" stroke="#ffcf4a" stroke-width="1.5" stroke-opacity=".7"/><path d="M44 ' + (yy - 4) + ' L52 ' + yy + ' L44 ' + (yy + 4) + 'Z" fill="#ffcf4a" fill-opacity=".7"/>'; }
      h += '<text class="ur-lbl" x="8" y="20">☀ napfény</text>';
      h += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="rgba(180,190,220,.35)" stroke-dasharray="3 4"/>';
      // fázisnevek a pálya mentén
      [[180, 'újhold'], [270, 'első negyed'], [0, 'telihold'], [90, 'utolsó negyed']].forEach(function (q) {
        var lx = cx + (R + 22) * Math.cos(q[0] * RAD), ly = cy - (R + 22) * Math.sin(q[0] * RAD) + 4;
        h += '<text class="ur-lbl" x="' + f1(Math.max(28, Math.min(332, lx))) + '" y="' + f1(Math.max(12, Math.min(296, ly))) + '" text-anchor="middle" style="font-size:10px;opacity:.75">' + q[1] + '</text>';
      });
      // Föld: nappali (bal) és éjszakai (jobb) fél
      h += '<circle cx="' + cx + '" cy="' + cy + '" r="16" fill="#1b3060"/><path d="M' + cx + ' ' + (cy - 16) + ' A16 16 0 0 0 ' + cx + ' ' + (cy + 16) + ' Z" fill="#4b93ff"/>';
      h += '<text class="ur-lbl" x="' + cx + '" y="' + (cy + 32) + '" text-anchor="middle">Föld</text>';
      // látóirány a Földről a Holdhoz
      h += '<line x1="' + cx + '" y1="' + cy + '" x2="' + f1(mx) + '" y2="' + f1(my) + '" stroke="rgba(255,255,255,.35)" stroke-dasharray="2 3"/>';
      // Hold: a Nap felé eső (bal) fele világos
      h += '<circle cx="' + f1(mx) + '" cy="' + f1(my) + '" r="11" fill="#3a3f4b"/><path d="M' + f1(mx) + ' ' + f1(my - 11) + ' A11 11 0 0 0 ' + f1(mx) + ' ' + f1(my + 11) + ' Z" fill="#f2ecd6"/>';
      // a Föld felől látható félgömb határa
      var ux = (cx - mx) / R, uy = (cy - my) / R, px = -uy, py = ux;
      h += '<line x1="' + f1(mx + px * 15) + '" y1="' + f1(my + py * 15) + '" x2="' + f1(mx - px * 15) + '" y2="' + f1(my - py * 15) + '" stroke="#4ade80" stroke-width="1.4"/>';
      h += '<text class="ur-lbl" x="352" y="292" text-anchor="end" style="font-size:10px;fill:#4ade80">zöld vonal: eddig látunk rá a Holdra</text>';
      h += '<path d="M330 40 A22 22 0 1 0 352 62" fill="none" stroke="rgba(255,255,255,.5)"/><path d="M352 62 l-6 -2 l4 -5z" fill="rgba(255,255,255,.5)"/><text class="ur-lbl" x="318" y="24" style="font-size:10px;opacity:.75">keringés</text>';
      el.querySelector('[data-o="top"]').innerHTML = h;
      var fr = illum(age), name = phaseName(age);
      var v = moonDisc(120, 135, 82, age) + '<text class="ur-lbl" x="120" y="250" text-anchor="middle" style="font-size:14px;font-weight:700">' + esc(name) + '</text>' +
        '<text class="ur-lbl" x="120" y="270" text-anchor="middle">megvilágítva: ' + Math.round(fr * 100) + '%</text>' +
        '<text class="ur-lbl" x="120" y="24" text-anchor="middle" style="opacity:.75">Így látod Magyarországról</text>';
      el.querySelector('[data-o="view"]').innerHTML = v;
      // kelés és delelés hozzávetőleg: újholdkor a Nappal együtt (kb. 6 és 12 óra), naponta kb. 50 perccel később
      var shift = age / SYN * 24, rise = (6 + shift) % 24, tr = (12 + shift) % 24;
      function hm(x) { var hh2 = Math.floor(x), mm = Math.round((x - hh2) * 60); if (mm === 60) { hh2 = (hh2 + 1) % 24; mm = 0; } return hh2 + ':' + (mm < 10 ? '0' : '') + mm; }
      var tip = age < 1.5 || age > 28 ? 'Újholdkor a Hold a Nappal együtt jár az égen, ezért nem látszik. Ha ilyenkor pont a Nap elé kerül, **napfogyatkozás** van.' :
        Math.abs(age - SYN / 2) < 1.2 ? 'Teliholdkor a Hold a Nappal szemben áll: napnyugtakor kel, éjfélkor delel. Ha a Föld árnyékába kerül, **holdfogyatkozás** van.' :
        age < SYN / 2 ? 'Növő Hold: a jobb oldala világos, esténként látszik a nyugati-déli égen.' : 'Fogyó Hold: a bal oldala világos, éjjel kel, hajnalban és délelőtt látszik.';
      el.querySelector('[data-o="r"]').innerHTML = res([['Fázis', esc(name)], ['Kel (kb.)', hm(rise)], ['Delel, délen áll (kb.)', hm(tr)], ['Következő telihold', age < SYN / 2 ? fmt(SYN / 2 - age, 1) + ' nap múlva' : fmt(SYN * 1.5 - age, 1) + ' nap múlva']]) +
        '<p class="ur-note">' + S.inline(tip) + ' A kelési és delelési idő csak hozzávetőleges (évszaktól függően órákkal is eltérhet).</p>';
    }
    inp.addEventListener('input', function () { age = parseFloat(inp.value); draw(); });
    var pb = el.querySelector('[data-a="play"]');
    pb.addEventListener('click', function () { play = !play; pb.textContent = play ? '⏸ Megállítás' : '▶ Lejátszás'; });
    el.querySelector('[data-a="ma"]').addEventListener('click', function () { age = moonAge(jdOf(Date.now())); draw(); });
    draw();
    loop(el, function (dt) { if (play) { age = (age + dt * 3) % SYN; draw(); } });
  });

  /* =====================================================================
   * 4. Égbolttérkép (Magyarország)
   * ===================================================================== */
  /* [név, RA (óra), Dec (fok), fényesség (magnitúdó), csillagkép-kód] – J2000 */
  var STARS = [
    ['Dubhe', 11.062, 61.75, 1.8, 'UMa'], ['Merak', 11.031, 56.38, 2.4, 'UMa'], ['Phecda', 11.897, 53.69, 2.4, 'UMa'], ['Megrez', 12.257, 57.03, 3.3, 'UMa'],
    ['Alioth', 12.900, 55.96, 1.8, 'UMa'], ['Mizar', 13.399, 54.93, 2.2, 'UMa'], ['Alkaid', 13.792, 49.31, 1.9, 'UMa'],
    ['Sarkcsillag', 2.530, 89.26, 2.0, 'UMi'], ['Yildun', 17.537, 86.59, 4.4, 'UMi'], ['ε UMi', 16.766, 82.04, 4.2, 'UMi'], ['ζ UMi', 15.734, 77.79, 4.3, 'UMi'],
    ['Kochab', 14.845, 74.16, 2.1, 'UMi'], ['Pherkad', 15.345, 71.83, 3.0, 'UMi'], ['η UMi', 16.292, 75.76, 5.0, 'UMi'],
    ['Caph', 0.153, 59.15, 2.3, 'Cas'], ['Schedar', 0.675, 56.54, 2.2, 'Cas'], ['γ Cas', 0.945, 60.72, 2.2, 'Cas'], ['Ruchbah', 1.430, 60.24, 2.7, 'Cas'], ['Segin', 1.907, 63.67, 3.4, 'Cas'],
    ['Alderamin', 21.310, 62.59, 2.5, 'Cep'], ['Alfirk', 21.478, 70.56, 3.2, 'Cep'], ['Errai', 23.656, 77.63, 3.2, 'Cep'], ['ι Cep', 22.828, 66.20, 3.5, 'Cep'], ['ζ Cep', 22.181, 58.20, 3.4, 'Cep'],
    ['Deneb', 20.690, 45.28, 1.25, 'Cyg'], ['Sadr', 20.370, 40.26, 2.2, 'Cyg'], ['Gienah', 20.770, 33.97, 2.5, 'Cyg'], ['δ Cyg', 19.750, 45.13, 2.9, 'Cyg'], ['Albireo', 19.512, 27.96, 3.1, 'Cyg'],
    ['Vega', 18.616, 38.78, 0.03, 'Lyr'], ['Sheliak', 18.835, 33.36, 3.5, 'Lyr'], ['Sulafat', 18.982, 32.69, 3.3, 'Lyr'], ['ζ Lyr', 18.746, 37.61, 4.3, 'Lyr'], ['δ Lyr', 18.908, 36.90, 4.3, 'Lyr'],
    ['Altair', 19.846, 8.87, 0.77, 'Aql'], ['Tarazed', 19.771, 10.61, 2.7, 'Aql'], ['Alshain', 19.922, 6.41, 3.7, 'Aql'], ['δ Aql', 19.425, 3.11, 3.4, 'Aql'], ['ζ Aql', 19.090, 13.86, 3.0, 'Aql'], ['λ Aql', 19.104, -4.88, 3.4, 'Aql'],
    ['Betelgeuze', 5.919, 7.41, 0.5, 'Ori'], ['Rigel', 5.242, -8.20, 0.13, 'Ori'], ['Bellatrix', 5.419, 6.35, 1.6, 'Ori'], ['Mintaka', 5.533, -0.30, 2.2, 'Ori'],
    ['Alnilam', 5.604, -1.20, 1.7, 'Ori'], ['Alnitak', 5.679, -1.94, 1.8, 'Ori'], ['Saiph', 5.796, -9.67, 2.1, 'Ori'], ['Meissa', 5.585, 9.93, 3.4, 'Ori'],
    ['Aldebaran', 4.599, 16.51, 0.85, 'Tau'], ['Elnath', 5.438, 28.61, 1.65, 'Tau'], ['ζ Tau', 5.627, 21.14, 3.0, 'Tau'], ['θ Tau', 4.478, 15.87, 3.4, 'Tau'], ['γ Tau', 4.330, 15.63, 3.6, 'Tau'],
    ['δ Tau', 4.382, 17.54, 3.8, 'Tau'], ['ε Tau', 4.477, 19.18, 3.5, 'Tau'], ['Fiastyúk', 3.791, 24.11, 2.9, 'Tau'], ['λ Tau', 4.011, 12.49, 3.4, 'Tau'],
    ['Castor', 7.577, 31.89, 1.6, 'Gem'], ['Pollux', 7.755, 28.03, 1.15, 'Gem'], ['Alhena', 6.629, 16.40, 1.9, 'Gem'], ['Mebsuta', 6.732, 25.13, 3.0, 'Gem'],
    ['Tejat', 6.383, 22.51, 2.9, 'Gem'], ['Propus', 6.248, 22.51, 3.3, 'Gem'], ['Wasat', 7.335, 21.98, 3.5, 'Gem'],
    ['Procyon', 7.655, 5.22, 0.34, 'CMi'], ['Gomeisa', 7.453, 8.29, 2.9, 'CMi'],
    ['Szíriusz', 6.752, -16.72, -1.46, 'CMa'], ['Mirzam', 6.378, -17.96, 2.0, 'CMa'], ['Wezen', 7.140, -26.39, 1.8, 'CMa'], ['Adhara', 6.977, -28.97, 1.5, 'CMa'],
    ['Aludra', 7.401, -29.30, 2.45, 'CMa'], ['Furud', 6.338, -30.06, 3.0, 'CMa'], ['ο2 CMa', 7.050, -23.83, 3.0, 'CMa'],
    ['Capella', 5.278, 46.00, 0.08, 'Aur'], ['Menkalinan', 5.992, 44.95, 1.9, 'Aur'], ['θ Aur', 5.995, 37.21, 2.6, 'Aur'], ['Hassaleh', 4.950, 33.17, 2.7, 'Aur'], ['ε Aur', 5.033, 43.82, 3.0, 'Aur'],
    ['Mirfak', 3.405, 49.86, 1.8, 'Per'], ['Algol', 3.136, 40.96, 2.1, 'Per'], ['δ Per', 3.715, 47.79, 3.0, 'Per'], ['ε Per', 3.964, 40.01, 2.9, 'Per'],
    ['ζ Per', 3.902, 31.88, 2.85, 'Per'], ['γ Per', 3.080, 53.51, 2.9, 'Per'], ['η Per', 2.845, 55.90, 3.8, 'Per'],
    ['Alpheratz', 0.140, 29.09, 2.06, 'And'], ['Mirach', 1.162, 35.62, 2.05, 'And'], ['Almach', 2.065, 42.33, 2.1, 'And'], ['δ And', 0.655, 30.86, 3.3, 'And'],
    ['Markab', 23.079, 15.21, 2.5, 'Peg'], ['Scheat', 23.063, 28.08, 2.4, 'Peg'], ['Algenib', 0.221, 15.18, 2.8, 'Peg'], ['Enif', 21.736, 9.88, 2.4, 'Peg'],
    ['Homam', 22.691, 10.83, 3.4, 'Peg'], ['Matar', 22.717, 30.22, 2.9, 'Peg'], ['Biham', 22.170, 6.20, 3.5, 'Peg'],
    ['Regulus', 10.140, 11.97, 1.35, 'Leo'], ['Denebola', 11.818, 14.57, 2.1, 'Leo'], ['Algieba', 10.333, 19.84, 2.0, 'Leo'], ['Zosma', 11.235, 20.52, 2.6, 'Leo'],
    ['Chertan', 11.237, 15.43, 3.3, 'Leo'], ['Adhafera', 10.278, 23.42, 3.4, 'Leo'], ['Rasalas', 9.879, 26.01, 3.9, 'Leo'], ['ε Leo', 9.764, 23.77, 3.0, 'Leo'], ['η Leo', 10.122, 16.76, 3.5, 'Leo'],
    ['Arcturus', 14.261, 19.18, -0.05, 'Boo'], ['Izar', 14.750, 27.07, 2.4, 'Boo'], ['Muphrid', 13.911, 18.40, 2.7, 'Boo'], ['Seginus', 14.535, 38.31, 3.0, 'Boo'],
    ['Nekkar', 15.032, 40.39, 3.5, 'Boo'], ['δ Boo', 15.258, 33.31, 3.5, 'Boo'], ['ρ Boo', 14.531, 30.37, 3.6, 'Boo'],
    ['Alphecca', 15.578, 26.71, 2.2, 'CrB'], ['β CrB', 15.464, 29.11, 3.7, 'CrB'], ['θ CrB', 15.549, 31.36, 4.1, 'CrB'], ['γ CrB', 15.713, 26.30, 3.8, 'CrB'], ['δ CrB', 15.827, 26.07, 4.6, 'CrB'], ['ε CrB', 15.960, 26.88, 4.1, 'CrB'],
    ['Spica', 13.420, -11.16, 0.98, 'Vir'], ['Porrima', 12.694, -1.45, 2.7, 'Vir'], ['Vindemiatrix', 13.036, 10.96, 2.8, 'Vir'], ['δ Vir', 12.927, 3.40, 3.4, 'Vir'], ['ζ Vir', 13.578, -0.60, 3.4, 'Vir'], ['β Vir', 11.845, 1.76, 3.6, 'Vir'],
    ['Antares', 16.490, -26.43, 1.0, 'Sco'], ['Dschubba', 16.006, -22.62, 2.3, 'Sco'], ['Acrab', 16.091, -19.81, 2.6, 'Sco'], ['π Sco', 15.981, -26.11, 2.9, 'Sco'],
    ['σ Sco', 16.353, -25.59, 2.9, 'Sco'], ['τ Sco', 16.598, -28.22, 2.8, 'Sco'], ['ε Sco', 16.836, -34.29, 2.3, 'Sco'], ['μ Sco', 16.864, -38.05, 3.0, 'Sco'],
    ['ζ Sco', 16.910, -42.36, 3.6, 'Sco'], ['η Sco', 17.202, -43.24, 3.3, 'Sco'], ['Sargas', 17.622, -43.00, 1.9, 'Sco'], ['ι Sco', 17.793, -40.13, 3.0, 'Sco'],
    ['κ Sco', 17.708, -39.03, 2.4, 'Sco'], ['Shaula', 17.560, -37.10, 1.6, 'Sco'], ['Lesath', 17.513, -37.30, 2.7, 'Sco'],
    ['Kaus Australis', 18.403, -34.38, 1.85, 'Sgr'], ['Kaus Media', 18.350, -29.83, 2.7, 'Sgr'], ['Kaus Borealis', 18.466, -25.42, 2.8, 'Sgr'], ['Nunki', 18.921, -26.30, 2.05, 'Sgr'],
    ['Ascella', 19.044, -29.88, 2.6, 'Sgr'], ['Alnasl', 18.097, -30.42, 3.0, 'Sgr'], ['φ Sgr', 18.761, -26.99, 3.2, 'Sgr'], ['τ Sgr', 19.116, -27.67, 3.3, 'Sgr'],
    ['π Her', 17.251, 36.81, 3.2, 'Her'], ['η Her', 16.715, 38.92, 3.5, 'Her'], ['ζ Her', 16.688, 31.60, 2.8, 'Her'], ['ε Her', 17.005, 30.93, 3.9, 'Her'],
    ['Kornephoros', 16.504, 21.49, 2.8, 'Her'], ['Rasalgethi', 17.244, 14.39, 3.1, 'Her'], ['δ Her', 17.250, 24.84, 3.1, 'Her'],
    ['Rasalhague', 17.582, 12.56, 2.1, 'Oph'], ['Cebalrai', 17.725, 4.57, 2.8, 'Oph'], ['Sabik', 17.173, -15.72, 2.4, 'Oph'], ['ζ Oph', 16.619, -10.57, 2.6, 'Oph'],
    ['Yed Prior', 16.239, -3.69, 2.7, 'Oph'], ['κ Oph', 16.961, 9.38, 3.2, 'Oph'],
    ['Eltanin', 17.943, 51.49, 2.2, 'Dra'], ['Rastaban', 17.507, 52.30, 2.8, 'Dra'], ['Grumium', 17.892, 56.87, 3.75, 'Dra'], ['δ Dra', 19.209, 67.66, 3.1, 'Dra'],
    ['ε Dra', 19.803, 70.27, 3.8, 'Dra'], ['ζ Dra', 17.146, 65.71, 3.2, 'Dra'], ['η Dra', 16.400, 61.51, 2.7, 'Dra'], ['ι Dra', 15.415, 58.97, 3.3, 'Dra'],
    ['Thuban', 14.073, 64.38, 3.65, 'Dra'], ['κ Dra', 12.558, 69.79, 3.9, 'Dra'], ['λ Dra', 11.523, 69.33, 3.8, 'Dra'],
    ['Gienah Crv', 12.263, -17.54, 2.6, 'Crv'], ['Kraz', 12.573, -23.40, 2.65, 'Crv'], ['Algorab', 12.498, -16.52, 2.95, 'Crv'], ['Minkar', 12.169, -22.62, 3.0, 'Crv'],
    ['Zubeneschamali', 15.283, -9.38, 2.6, 'Lib'], ['Zubenelgenubi', 14.848, -16.04, 2.75, 'Lib'],
    ['Hamal', 2.120, 23.46, 2.0, 'Ari'], ['Sheratan', 1.911, 20.81, 2.6, 'Ari'],
    ['Fomalhaut', 22.961, -29.62, 1.16, 'PsA'], ['Diphda', 0.726, -17.99, 2.0, 'Cet'], ['Menkar', 3.038, 4.09, 2.5, 'Cet'],
    ['Alphard', 9.460, -8.66, 2.0, 'Hya'], ['Cor Caroli', 12.934, 38.32, 2.9, 'CVn'],
    ['Deneb Algedi', 21.784, -16.13, 2.85, 'Cap'], ['Dabih', 20.350, -14.78, 3.05, 'Cap'], ['Sadalsuud', 21.526, -5.57, 2.9, 'Aqr'], ['Sadalmelik', 22.096, -0.32, 2.95, 'Aqr']
  ];
  /* csillagkép-vonalak a csillagnevekkel */
  var LINES = [
    ['Dubhe', 'Merak', 'Phecda', 'Megrez', 'Dubhe'], ['Megrez', 'Alioth', 'Mizar', 'Alkaid'],
    ['Sarkcsillag', 'Yildun', 'ε UMi', 'ζ UMi', 'Kochab', 'Pherkad', 'η UMi', 'ζ UMi'],
    ['Caph', 'Schedar', 'γ Cas', 'Ruchbah', 'Segin'],
    ['Alderamin', 'Alfirk', 'Errai', 'ι Cep', 'Alderamin'], ['ι Cep', 'ζ Cep', 'Alderamin'],
    ['Deneb', 'Sadr', 'Albireo'], ['δ Cyg', 'Sadr', 'Gienah'],
    ['Vega', 'ζ Lyr', 'Sheliak', 'Sulafat', 'δ Lyr', 'ζ Lyr'],
    ['ζ Aql', 'Tarazed', 'Altair', 'Alshain'], ['Altair', 'δ Aql', 'λ Aql'],
    ['Betelgeuze', 'Bellatrix'], ['Betelgeuze', 'Alnitak'], ['Bellatrix', 'Mintaka'], ['Mintaka', 'Alnilam', 'Alnitak'], ['Alnitak', 'Saiph'], ['Mintaka', 'Rigel'], ['Betelgeuze', 'Meissa', 'Bellatrix'],
    ['ζ Tau', 'Aldebaran', 'θ Tau', 'γ Tau', 'δ Tau', 'ε Tau', 'Elnath'], ['γ Tau', 'λ Tau'],
    ['Castor', 'Mebsuta', 'Tejat', 'Propus'], ['Pollux', 'Wasat', 'Alhena'], ['Castor', 'Pollux'],
    ['Procyon', 'Gomeisa'],
    ['Mirzam', 'Szíriusz', 'ο2 CMa', 'Wezen', 'Aludra'], ['Wezen', 'Adhara', 'Furud'],
    ['Capella', 'Menkalinan', 'θ Aur', 'Elnath', 'Hassaleh', 'ε Aur', 'Capella'],
    ['η Per', 'γ Per', 'Mirfak', 'δ Per', 'ε Per', 'ζ Per'], ['Mirfak', 'Algol'],
    ['Alpheratz', 'Scheat', 'Markab', 'Algenib', 'Alpheratz'], ['Markab', 'Homam', 'Biham', 'Enif'], ['Scheat', 'Matar'], ['Alpheratz', 'δ And', 'Mirach', 'Almach'],
    ['ε Leo', 'Rasalas', 'Adhafera', 'Algieba', 'η Leo', 'Regulus'], ['Algieba', 'Zosma', 'Denebola', 'Chertan', 'Regulus'], ['Zosma', 'Chertan'],
    ['Arcturus', 'Izar', 'δ Boo', 'Nekkar', 'Seginus', 'ρ Boo', 'Arcturus'], ['Arcturus', 'Muphrid'],
    ['θ CrB', 'β CrB', 'Alphecca', 'γ CrB', 'δ CrB', 'ε CrB'],
    ['β Vir', 'Porrima', 'δ Vir', 'Vindemiatrix'], ['Porrima', 'Spica'], ['δ Vir', 'ζ Vir', 'Spica'],
    ['Acrab', 'Dschubba', 'π Sco'], ['Dschubba', 'σ Sco', 'Antares', 'τ Sco', 'ε Sco', 'μ Sco', 'ζ Sco', 'η Sco', 'Sargas', 'ι Sco', 'κ Sco', 'Shaula', 'Lesath'],
    ['Alnasl', 'Kaus Media', 'Kaus Borealis', 'φ Sgr', 'Nunki', 'τ Sgr', 'Ascella', 'φ Sgr', 'Kaus Media', 'Kaus Australis', 'Ascella'], ['Alnasl', 'Kaus Australis'],
    ['π Her', 'η Her', 'ζ Her', 'ε Her', 'π Her'], ['ζ Her', 'Kornephoros'], ['ε Her', 'δ Her', 'Rasalgethi'],
    ['Rasalhague', 'Cebalrai', 'Sabik', 'ζ Oph', 'Yed Prior', 'κ Oph', 'Rasalhague'],
    ['Eltanin', 'Rastaban', 'Grumium', 'Eltanin'], ['Grumium', 'δ Dra', 'ε Dra', 'ζ Dra', 'η Dra', 'ι Dra', 'Thuban', 'κ Dra', 'λ Dra'],
    ['Gienah Crv', 'Algorab', 'Kraz', 'Minkar', 'Gienah Crv'],
    ['Zubeneschamali', 'Zubenelgenubi'], ['Hamal', 'Sheratan'], ['Dabih', 'Deneb Algedi'], ['Sadalsuud', 'Sadalmelik']
  ];
  var CONST = { UMa: 'Nagy Medve (Göncölszekér)', UMi: 'Kis Medve', Cas: 'Kassziopeia', Cep: 'Cepheus', Cyg: 'Hattyú', Lyr: 'Lant', Aql: 'Sas', Ori: 'Orion', Tau: 'Bika',
    Gem: 'Ikrek', CMi: 'Kis Kutya', CMa: 'Nagy Kutya', Aur: 'Szekeres', Per: 'Perszeusz', And: 'Androméda', Peg: 'Pegazus', Leo: 'Oroszlán', Boo: 'Ökörhajcsár',
    CrB: 'Északi Korona', Vir: 'Szűz', Sco: 'Skorpió', Sgr: 'Nyilas', Her: 'Herkules', Oph: 'Kígyótartó', Dra: 'Sárkány', Crv: 'Holló', Lib: 'Mérleg', Ari: 'Kos',
    PsA: 'Déli Hal', Cet: 'Cet', Hya: 'Északi Vízikígyó', CVn: 'Vadászebek', Cap: 'Bak', Aqr: 'Vízöntő' };
  var PLANETS = [['merkur', 'Merkúr', '#cfc6b8'], ['venusz', 'Vénusz', '#fff3c4'], ['mars', 'Mars', '#ff8a5c'], ['jupiter', 'Jupiter', '#ffe2b8'], ['szaturnusz', 'Szaturnusz', '#f1dc9a']];
  var PLACES = [['bp', 'Budapest', 47.50, 19.04], ['deb', 'Debrecen', 47.53, 21.63], ['sze', 'Szeged', 46.25, 20.15], ['pec', 'Pécs', 46.07, 18.23], ['sop', 'Sopron', 47.68, 16.58]];
  /* Magyar helyi idő → UTC: CET (UTC+1), nyári időszámítás (UTC+2) márc. utolsó vasárnapja 1:00 UTC és okt. utolsó vasárnapja 1:00 UTC között */
  function lastSunday(y, m) { var d = new Date(Date.UTC(y, m + 1, 0)); return d.getUTCDate() - d.getUTCDay(); }
  function huToUtcMs(y, mo, d, hh, mi) {
    var guess = Date.UTC(y, mo, d, hh - 1, mi), s = Date.UTC(y, 2, lastSunday(y, 2), 1), e = Date.UTC(y, 9, lastSunday(y, 9), 1);
    return guess >= s && guess - 3600000 < e ? guess - 3600000 : guess;
  }
  function huNowParts() {
    var now = Date.now(), d = new Date(now + 3600000), y = d.getUTCFullYear();
    var s = Date.UTC(y, 2, lastSunday(y, 2), 1), e = Date.UTC(y, 9, lastSunday(y, 9), 1);
    if (now >= s && now < e) d = new Date(now + 7200000);
    return { y: d.getUTCFullYear(), mo: d.getUTCMonth(), d: d.getUTCDate(), h: d.getUTCHours(), mi: d.getUTCMinutes() };
  }
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  var DIRS = ['É', 'ÉÉK', 'ÉK', 'KÉK', 'K', 'KDK', 'DK', 'DDK', 'D', 'DDNy', 'DNy', 'NyDNy', 'Ny', 'NyÉNy', 'ÉNy', 'ÉÉNy'];
  function dirName(az) { return DIRS[Math.round(norm360(az) / 22.5) % 16]; }

  S.addWidget('egbolt', function (el) {
    var n = huNowParts(), place = PLACES[0], showC = true, showS = true;
    el.classList.add('ur');
    el.innerHTML = head('Égbolttérkép a magyar égre', 'Válaszd ki a dátumot, az órát (magyar idő szerint) és a helyet. A kör széle a **horizont**, a közepe a fejed fölötti pont (**zenit**). Tartsd a térképet a fejed fölé, az „É” jelet észak felé fordítva: így lesz a kelet bal oldalon.') +
      '<div class="ur-ctrls ur-sky-ctrl">' +
      '<label><small>Dátum</small><input type="date" data-k="date" value="' + n.y + '-' + p2(n.mo + 1) + '-' + p2(n.d) + '"></label>' +
      '<label><small>Idő (magyar idő)</small><input type="time" data-k="time" value="' + p2(n.h) + ':' + p2(n.mi) + '"></label>' +
      '<label><small>Hely</small><select data-k="hely">' + PLACES.map(function (p) { return '<option value="' + p[0] + '">' + esc(p[1]) + '</option>'; }).join('') + '</select></label>' +
      '<div class="ur-btns"><button type="button" class="btn sm" data-a="most">Most</button><button type="button" class="btn sm" data-a="m1">−1 óra</button><button type="button" class="btn sm" data-a="p1">+1 óra</button><button type="button" class="btn sm" data-a="este">Ma 21:00</button></div>' +
      '<label class="ur-chk"><input type="checkbox" data-k="cn" checked> csillagképnevek</label><label class="ur-chk"><input type="checkbox" data-k="sn" checked> csillagnevek</label>' +
      '</div>' +
      '<div class="ur-split"><svg class="w-svg ur-space ur-sky" viewBox="0 0 520 520" role="img" aria-label="Égbolttérkép"></svg><div class="ur-side" data-o="list"></div></div>';
    var svg = el.querySelector('svg'), CX = 260, CY = 260, R = 226;
    var di = el.querySelector('[data-k="date"]'), ti = el.querySelector('[data-k="time"]');
    function hor(raDeg, dec, lst, lat) {
      var H = (lst - raDeg) * RAD, d = dec * RAD, f = lat * RAD;
      var sa = Math.sin(f) * Math.sin(d) + Math.cos(f) * Math.cos(d) * Math.cos(H), alt = Math.asin(sa);
      var az = Math.atan2(-Math.cos(d) * Math.sin(H), Math.sin(d) * Math.cos(f) - Math.cos(d) * Math.cos(H) * Math.sin(f));
      return [alt / RAD, norm360(az / RAD)];
    }
    function xy(alt, az) { var r = R * (90 - alt) / 90; return [CX - r * Math.sin(az * RAD), CY - r * Math.cos(az * RAD)]; }
    function draw() {
      var dv = (di.value || '').split('-'), tv = (ti.value || '').split(':');
      if (dv.length < 3 || tv.length < 2) return;
      var ms = huToUtcMs(+dv[0], +dv[1] - 1, +dv[2], +tv[0], +tv[1]), jd = jdOf(ms);
      var lat = place[2], lst = norm360(280.46061837 + 360.98564736629 * (jd - 2451545) + place[3]);
      var sl = sunEcl(jd), seq = eclLonLatToEq(sl, 0), sh = hor(seq[0], seq[1], lst, lat);
      var sky = sh[0] > 0 ? '#3d6fb8' : sh[0] > -6 ? '#26407a' : sh[0] > -12 ? '#16255a' : sh[0] > -18 ? '#0f1a42' : '#080e2a';
      var h = '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" fill="' + sky + '" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/>';
      [30, 60].forEach(function (a) { h += '<circle cx="' + CX + '" cy="' + CY + '" r="' + f1(R * (90 - a) / 90) + '" fill="none" stroke="rgba(255,255,255,.12)" stroke-dasharray="2 4"/>'; });
      h += '<text class="ur-lbl" x="' + (CX + 3) + '" y="' + (CY - R * 2 / 3 + 11) + '" style="font-size:9px;opacity:.5">30°</text><text class="ur-lbl" x="' + (CX + 3) + '" y="' + (CY - R / 3 + 11) + '" style="font-size:9px;opacity:.5">60°</text>';
      var pos = {};
      STARS.forEach(function (s) { var a = hor(s[1] * 15, s[2], lst, lat); pos[s[0]] = a; });
      // csillagkép-vonalak
      if (showC) LINES.forEach(function (ln) {
        for (var i = 0; i + 1 < ln.length; i++) {
          var a = pos[ln[i]], b = pos[ln[i + 1]];
          if (!a || !b || a[0] < -2 || b[0] < -2) continue;
          var p = xy(Math.max(a[0], 0), a[1]), q = xy(Math.max(b[0], 0), b[1]);
          h += '<line x1="' + f1(p[0]) + '" y1="' + f1(p[1]) + '" x2="' + f1(q[0]) + '" y2="' + f1(q[1]) + '" stroke="rgba(140,180,255,.45)" stroke-width="1"/>';
        }
      });
      // csillagok
      var cs = {};
      STARS.forEach(function (s) {
        var a = pos[s[0]]; if (a[0] < 0) return;
        var p = xy(a[0], a[1]), r = Math.max(0.9, 3.4 - 0.72 * s[3]);
        (cs[s[4]] = cs[s[4]] || []).push(p);
        h += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="' + f1(r) + '" fill="#fff"><title>' + esc(s[0] + ' (' + (CONST[s[4]] || '') + '), fényesség: ' + fmt(s[3], 1) + ' magnitúdó, magasság: ' + Math.round(a[0]) + '°') + '</title></circle>';
        if (showS && (s[3] < 1.6 || s[0] === 'Sarkcsillag' || s[0] === 'Fiastyúk')) h += '<text class="ur-lbl ur-star" x="' + f1(p[0] + 5) + '" y="' + f1(p[1] - 4) + '">' + esc(s[0]) + '</text>';
      });
      if (showC) Object.keys(cs).forEach(function (k) {
        var pts = cs[k]; if (pts.length < 2) return;
        var x = 0, y = 0; pts.forEach(function (p) { x += p[0]; y += p[1]; }); x /= pts.length; y /= pts.length;
        h += '<text class="ur-lbl ur-const" x="' + f1(x) + '" y="' + f1(y + 14) + '" text-anchor="middle">' + esc(CONST[k]) + '</text>';
      });
      // bolygók, Hold, Nap
      var vis = [];
      PLANETS.forEach(function (pl) {
        var rd = planetRaDec(pl[0], jd), a = hor(rd[0], rd[1], lst, lat);
        if (a[0] > 0) {
          var p = xy(a[0], a[1]);
          h += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="4.2" fill="' + pl[2] + '" stroke="#ffb347" stroke-width="1.2"><title>' + esc(pl[1]) + '</title></circle>' +
            '<text class="ur-lbl ur-planet" x="' + f1(p[0] + 7) + '" y="' + f1(p[1] + 4) + '">' + esc(pl[1]) + '</text>';
        }
        vis.push([pl[1], a]);
      });
      var ml = moonEcl(jd), meq = eclLonLatToEq(ml[0], ml[1]), mh = hor(meq[0], meq[1], lst, lat), age = norm360(ml[0] - sl) / 360 * SYN;
      if (mh[0] > 0) { var mp = xy(mh[0], mh[1]); h += '<g transform="translate(' + f1(mp[0] - 9) + ' ' + f1(mp[1] - 9) + ') scale(0.11)">' + moonDisc(82, 82, 80, age) + '</g><text class="ur-lbl ur-planet" x="' + f1(mp[0] + 11) + '" y="' + f1(mp[1] + 4) + '">Hold</text>'; }
      if (sh[0] > -1) { var sp = xy(Math.max(sh[0], 0), sh[1]); h += '<circle cx="' + f1(sp[0]) + '" cy="' + f1(sp[1]) + '" r="9" fill="#ffd23c"/><text class="ur-lbl ur-planet" x="' + f1(sp[0] + 12) + '" y="' + f1(sp[1] + 4) + '">Nap</text>'; }
      // égtájak
      [['É', 0], ['K', 90], ['D', 180], ['Ny', 270]].forEach(function (d) {
        var p = xy(-90 * 16 / R, d[1]);
        h += '<text class="ur-lbl ur-dir" x="' + f1(p[0]) + '" y="' + f1(p[1] + 5) + '" text-anchor="middle">' + d[0] + '</text>';
      });
      h += '<text class="ur-lbl" x="' + CX + '" y="' + (CY + 3) + '" text-anchor="middle" style="font-size:9px;opacity:.45">+ zenit</text>';
      svg.innerHTML = h;
      // oldalsáv
      var dayMsg = sh[0] > 0 ? '☀️ **Nappal van** – a Nap fénye miatt a csillagok most nem látszanak (a térkép mégis megmutatja, hol vannak).' :
        sh[0] > -12 ? '🌆 **Szürkület** – csak a legfényesebb csillagok és bolygók látszanak.' : '🌌 **Sötét éjszaka** van.';
      var lst2 = '<p class="ur-note">' + S.inline(dayMsg) + '</p><b>Bolygók és a Hold</b><ul class="ur-list">';
      vis.forEach(function (v) { lst2 += '<li>' + (v[1][0] > 0 ? '✅ ' : '⬇️ ') + '<b>' + esc(v[0]) + '</b>: ' + (v[1][0] > 0 ? Math.round(v[1][0]) + '° magasan, ' + dirName(v[1][1]) + ' felé' : 'a horizont alatt') + '</li>'; });
      lst2 += '<li>' + (mh[0] > 0 ? '✅ ' : '⬇️ ') + '<b>Hold</b> (' + esc(phaseName(age)) + ', ' + Math.round(illum(age) * 100) + '%): ' + (mh[0] > 0 ? Math.round(mh[0]) + '° magasan, ' + dirName(mh[1]) + ' felé' : 'a horizont alatt') + '</li></ul>';
      lst2 += '<p class="ur-note">A Merkúr és a Vénusz mindig a Nap közelében jár: csak napnyugta után vagy napkelte előtt, alacsonyan keresd őket. A számítás kb. 1°-os pontosságú.</p>';
      el.querySelector('[data-o="list"]').innerHTML = lst2;
    }
    function shift(hrs) {
      var dv = di.value.split('-'), tv = ti.value.split(':');
      var d = new Date(Date.UTC(+dv[0], +dv[1] - 1, +dv[2], +tv[0], +tv[1]) + hrs * 3600000);
      di.value = d.getUTCFullYear() + '-' + p2(d.getUTCMonth() + 1) + '-' + p2(d.getUTCDate()); ti.value = p2(d.getUTCHours()) + ':' + p2(d.getUTCMinutes()); draw();
    }
    di.addEventListener('change', draw); ti.addEventListener('change', draw); di.addEventListener('input', draw); ti.addEventListener('input', draw);
    el.querySelector('[data-k="hely"]').addEventListener('change', function (e) { place = PLACES.filter(function (p) { return p[0] === e.target.value; })[0]; draw(); });
    el.querySelector('[data-k="cn"]').addEventListener('change', function (e) { showC = e.target.checked; draw(); });
    el.querySelector('[data-k="sn"]').addEventListener('change', function (e) { showS = e.target.checked; draw(); });
    el.querySelector('[data-a="m1"]').addEventListener('click', function () { shift(-1); });
    el.querySelector('[data-a="p1"]').addEventListener('click', function () { shift(1); });
    el.querySelector('[data-a="most"]').addEventListener('click', function () { var q = huNowParts(); di.value = q.y + '-' + p2(q.mo + 1) + '-' + p2(q.d); ti.value = p2(q.h) + ':' + p2(q.mi); draw(); });
    el.querySelector('[data-a="este"]').addEventListener('click', function () { var q = huNowParts(); di.value = q.y + '-' + p2(q.mo + 1) + '-' + p2(q.d); ti.value = '21:00'; draw(); });
    draw();
  });

  /* tesztekhez és más modulokhoz */
  S.urAstro = { planetRaDec: planetRaDec, moonAge: moonAge, sunEcl: sunEcl, moonEcl: moonEcl, huToUtcMs: huToUtcMs, jdOf: jdOf };
})();
