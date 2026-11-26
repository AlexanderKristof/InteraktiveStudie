/* Tudásműhely – 🧪 Virtuális labor: fizikai és kémiai kísérletek.
 * Oldalak:  #/labor  (áttekintő)   ·   #/labor/<kiserlet>  (pl. #/labor/inga)
 * Widgetek (leckébe is beilleszthetők: widget: { type: 'labor-inga' }):
 *   labor-inga, labor-rugo, labor-fenytores, labor-lencse, labor-interferencia,
 *   labor-titralas, labor-ph, labor-gaz, labor-uszas, labor-olvadas */
(function () {
  'use strict';
  var S = window.STUDIE, fmt = S.fmt, esc = S.esc;
  var uid = 0;

  /* ---------- közös segédfüggvények ---------- */
  function q(el, n) { return el.querySelector('[data-lb="' + n + '"]'); }
  function head(title, help) {
    return '<div class="w-title">' + esc(title) + '</div>' + (help ? '<p class="w-help">' + S.inline(help) + '</p>' : '');
  }
  /* csúszka: kulcs, felirat, min, max, lépés, érték, mértékegység, tizedesjegyek */
  function rng(k, label, min, max, step, val, unit, d) {
    d = d == null ? 2 : d;
    return '<label><span class="lv"><span>' + esc(label) + '</span><b><span data-v="' + k + '">' + fmt(val, d) + '</span> ' + esc(unit || '') + '</b></span>' +
      '<input type="range" data-k="' + k + '" data-d="' + d + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + esc(label) + '"></label>';
  }
  function bind(box, update) {
    var inputs = box.querySelectorAll('input[type=range][data-k]');
    function read() {
      var v = {};
      inputs.forEach(function (i) {
        v[i.dataset.k] = parseFloat(i.value);
        var o = box.querySelector('[data-v="' + i.dataset.k + '"]');
        if (o) o.textContent = fmt(v[i.dataset.k], +i.dataset.d);
      });
      return v;
    }
    inputs.forEach(function (i) { i.addEventListener('input', function () { update(read(), i.dataset.k); }); });
    update(read(), null);
    return read;
  }
  function setRange(box, k, val) {
    var i = box.querySelector('input[data-k="' + k + '"]');
    if (!i) return;
    i.value = val; i.dispatchEvent(new Event('input'));
  }
  function res(items) {
    return '<div class="w-res">' + items.map(function (x) { return '<div><small>' + esc(x[0]) + '</small><b>' + x[1] + '</b></div>'; }).join('') + '</div>';
  }
  function seg(name, opts, cur) {
    return '<div class="seg" data-seg="' + name + '">' + opts.map(function (o) {
      return '<button type="button" data-val="' + esc(o[0]) + '" class="' + (o[0] === cur ? 'on' : '') + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function onSeg(el, name, cb) {
    var box = el.querySelector('[data-seg="' + name + '"]');
    box.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        box.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        cb(b.dataset.val);
      });
    });
  }
  function sel(name, label, opts, cur) {
    return '<label class="pw-f lb-f"><span>' + esc(label) + '</span><select data-lb="' + name + '">' + opts.map(function (o) {
      return '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(cur) ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
    }).join('') + '</select></label>';
  }
  /* Animáció, ami leáll, ha a widget eltűnik az oldalról. */
  function loop(el, fn) {
    var last = null;
    function tick(t) {
      if (!document.body.contains(el)) return;
      var dt = last == null ? 0 : Math.min(0.05, (t - last) / 1000);
      last = t; fn(dt);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  /* „Mit figyelj meg?” + „Miért?” + (kémiánál) biztonsági megjegyzés */
  function learn(obs, why, safe) {
    return (safe ? '<div class="lb-safe">⚠️ ' + S.inline(safe) + '</div>' : '') +
      '<div class="lb-learn"><div class="lb-obs"><b>🔍 Mit figyelj meg?</b><ol>' + obs.map(function (o) { return '<li>' + S.inline(o) + '</li>'; }).join('') + '</ol></div>' +
      '<details class="lb-why"><summary>💡 Miért? – a magyarázat</summary>' + S.md(why) + '</details></div>';
  }
  function r1(n) { return Math.round(n * 10) / 10; }
  function txt(x, y, s, o) {
    o = o || {};
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (o.fs || 11) + '" class="' + (o.cls || 'svg-muted') + '"' +
      (o.a ? ' text-anchor="' + o.a + '"' : '') + (o.fill ? ' fill="' + o.fill + '"' : '') + (o.w ? ' font-weight="' + o.w + '"' : '') + '>' + esc(s) + '</text>';
  }
  function ln(x1, y1, x2, y2, st) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" ' + (st || 'class="lb-ink" stroke-width="2"') + '/>';
  }
  function path(pts) { return pts.map(function (p, i) { return (i ? 'L' : 'M') + r1(p[0]) + ' ' + r1(p[1]); }).join(' '); }
  /* nyíl (erővektor, fénysugár iránya) */
  function arrow(x1, y1, x2, y2, color, w, extra) {
    var a = Math.atan2(y2 - y1, x2 - x1), hl = 8 + (w || 2);
    var p1 = [x2 - hl * Math.cos(a - 0.4), y2 - hl * Math.sin(a - 0.4)], p2 = [x2 - hl * Math.cos(a + 0.4), y2 - hl * Math.sin(a + 0.4)];
    return '<g' + (extra || '') + '>' + ln(x1, y1, x2 - 4 * Math.cos(a), y2 - 4 * Math.sin(a), 'stroke="' + color + '" stroke-width="' + (w || 2) + '"') +
      '<polygon points="' + r1(x2) + ',' + r1(y2) + ' ' + r1(p1[0]) + ',' + r1(p1[1]) + ' ' + r1(p2[0]) + ',' + r1(p2[1]) + '" fill="' + color + '"/></g>';
  }
  /* színátmenet: stops = [[érték, [r,g,b,a]], …] */
  function grad(stops, v) {
    if (v <= stops[0][0]) return stops[0][1];
    for (var i = 1; i < stops.length; i++) {
      if (v <= stops[i][0]) {
        var a = stops[i - 1], b = stops[i], u = (v - a[0]) / (b[0] - a[0]);
        return a[1].map(function (c, j) { return c + (b[1][j] - c) * u; });
      }
    }
    return stops[stops.length - 1][1];
  }
  function rgba(c) { return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + (c[3] == null ? 1 : c[3]).toFixed(2) + ')'; }
  function deg(r) { return r * 180 / Math.PI; }
  function rad(d) { return d * Math.PI / 180; }
  function mmss(t) { var m = Math.floor(t / 60), s = Math.floor(t - m * 60); return m + ':' + (s < 10 ? '0' : '') + s; }

  /* =====================================================================
   * 1. Fonalinga
   * ===================================================================== */
  S.addWidget('labor-inga', function (el) {
    var g = 9.81, P = { l: 1, a: 10 }, th = 0, om = 0, t = 0, lastX = null, Tm = null;
    var sw = { run: false, start: 0, acc: 0, n: 0 };
    el.innerHTML = head('🕰️ Fonalinga – mérd meg a lengésidőt!', 'Állítsd be a fonal hosszát, a kezdő kitérést és a bolygót. Indítsd a stoppert, amikor az inga a **szélső helyzetben** van, és állítsd meg **10 teljes lengés** után (oda és vissza = 1 lengés). Az animáció valós időben fut.') +
      '<div class="row lb-mb">' + seg('g', [['9.81', '🌍 Föld'], ['1.62', '🌙 Hold'], ['3.71', '🔴 Mars'], ['24.79', '🪐 Jupiter']], '9.81') + '</div>' +
      '<div class="w-grid"><div class="w-ctrl" data-lb="ctrl">' + rng('l', 'Fonalhossz (l)', 0.1, 2.5, 0.05, 1, 'm') + rng('a', 'Kezdő kitérés (φ₀)', 2, 60, 1, 10, '°', 0) +
      '<div class="lb-sw"><div class="lb-swt" data-lb="swt">⏱ 0,00 s</div><div class="lb-btns"><button type="button" class="btn primary" data-lb="sw">▶ Stopper indítása</button>' +
      '<button type="button" class="btn" data-lb="swr">Nullázás</button></div><div class="lb-small" data-lb="swi"></div></div>' +
      '<button type="button" class="btn" data-lb="rel">↺ Újra elengedem az ingát</button>' +
      '</div><div class="w-out"><svg class="w-svg" viewBox="0 0 320 240" data-lb="svg" role="img" aria-label="Lengő fonalinga"></svg><div data-lb="res"></div><div class="w-formula" data-lb="f"></div></div></div>' +
      learn([
        'Mérd meg 10 teljes lengés idejét, és oszd el 10-zel! Mennyire egyezik a kapott érték a `T = 2π·√(l/g)` képlettel?',
        'Négyszerezd meg a fonal hosszát (pl. 0,5 m → 2 m). Hányszorosára nőtt a lengésidő? (Tipp: gyök alatt van!)',
        'Vidd az ingát a Holdra, majd a Jupiterre! Hol leng lassabban, hol gyorsabban?',
        'Kis kitérésnél (5–10°) a lengésidő szinte nem függ a kitéréstől. Mi a helyzet 60°-nál?',
        'Észrevetted? Nincs tömeg-csúszka – a lengésidő ugyanis **nem függ** a nehezék tömegétől.'
      ], 'Az ingát a nehézségi erő fonalra merőleges összetevője, `m·g·sin φ` húzza vissza az egyensúlyi helyzetbe. Kis szögeknél `sin φ ≈ φ` (radiánban), ezért a visszatérítő erő arányos a kitéréssel – ez **harmonikus rezgőmozgás**, melynek lengésideje:\n\n' +
        '`T = 2π·√(l/g)`\n\n' +
        '- **Hosszabb fonal** → ugyanakkora szöghöz hosszabb ív tartozik, lassabb a lengés. Négyszeres hossz → kétszeres lengésidő.\n' +
        '- **Kisebb g** (Hold) → gyengébb a visszatérítő erő, lassabb a lengés.\n' +
        '- **A tömeg kiesik:** a nagyobb tömegre nagyobb erő hat, de ugyanannyival nehezebb is gyorsítani.\n' +
        '- **Nagy kitérésnél** `sin φ < φ`, a visszatérítő erő kisebb a „kis szöges” közelítésnél, így a lengésidő kicsit hosszabb (60°-nál kb. 7%-kal).\n\n' +
        'Ezt a szabályt Galilei fedezte fel, és ezen alapulnak az ingaórák. Fordítva is használható: a lengésidő méréséből kiszámítható a nehézségi gyorsulás: `g = 4π²·l / T²`.');
    var svg = q(el, 'svg');
    function release() { th = rad(P.a); om = 0; lastX = null; Tm = null; info(); }
    function acc(a) { return -g / P.l * Math.sin(a); }
    function step(h) { // RK4
      var k1a = om, k1w = acc(th);
      var k2a = om + h / 2 * k1w, k2w = acc(th + h / 2 * k1a);
      var k3a = om + h / 2 * k2w, k3w = acc(th + h / 2 * k2a);
      var k4a = om + h * k3w, k4w = acc(th + h * k3a);
      th += h / 6 * (k1a + 2 * k2a + 2 * k3a + k4a); om += h / 6 * (k1w + 2 * k2w + 2 * k3w + k4w);
    }
    function theory() {
      var T0 = 2 * Math.PI * Math.sqrt(P.l / g), a = 1, b = Math.cos(rad(P.a) / 2);
      for (var i = 0; i < 12; i++) { var an = (a + b) / 2; b = Math.sqrt(a * b); a = an; }
      return [T0, T0 / a]; // pontos lengésidő: T0 / AGM(1, cos(φ0/2))
    }
    function swTime() { return sw.acc + (sw.run ? t - sw.start : 0); }
    function info() {
      var T = theory();
      q(el, 'res').innerHTML = res([['T képlettel (kis kitérés)', fmt(T[0], 3) + ' s'], ['T pontosan (' + P.a + '°-os kitérés)', fmt(T[1], 3) + ' s'],
        ['Az inga mért lengésideje', Tm ? fmt(Tm, 3) + ' s' : 'mérés…'], ['Frekvencia (f = 1/T)', fmt(1 / T[1], 3) + ' Hz']]);
      q(el, 'f').textContent = 'T = 2π·√(l/g) = 2π·√(' + fmt(P.l) + ' m / ' + fmt(g) + ' m/s²) = ' + fmt(T[0], 3) + ' s';
    }
    function swInfo() {
      var tt = swTime();
      q(el, 'swt').textContent = '⏱ ' + fmt(tt, 2) + ' s';
      q(el, 'swi').innerHTML = 'Számolt teljes lengések: <b>' + sw.n + '</b>' +
        (!sw.run && sw.n > 0 ? '<br>Mérésed: T ≈ ' + fmt(tt, 2) + ' s / ' + sw.n + ' = <b>' + fmt(tt / sw.n, 3) + ' s</b>' : '');
    }
    function draw() {
      var L = P.l * 80, cx = 160, cy = 18, px = cx + L * Math.sin(th), py = cy + L * Math.cos(th), a = rad(P.a);
      var lx = cx - L * Math.sin(a), rx = cx + L * Math.sin(a), ay = cy + L * Math.cos(a);
      svg.innerHTML = '<rect x="105" y="6" width="110" height="10" rx="2" class="lb-solid"/>' +
        ln(cx, cy, cx, cy + L + 16, 'class="lb-axis" stroke-dasharray="3 4"') +
        '<path d="M' + r1(lx) + ' ' + r1(ay) + ' A' + r1(L) + ' ' + r1(L) + ' 0 0 0 ' + r1(rx) + ' ' + r1(ay) + '" fill="none" class="lb-axis" stroke-dasharray="2 4"/>' +
        ln(cx, cy, px, py, 'class="lb-ink" stroke-width="1.5"') + '<circle cx="' + r1(cx) + '" cy="' + cy + '" r="3" class="lb-inkf"/>' +
        '<circle cx="' + r1(px) + '" cy="' + r1(py) + '" r="11" fill="#e5484d" stroke="rgba(0,0,0,.35)"/>' +
        txt(8, 232, 'l = ' + fmt(P.l) + ' m · g = ' + fmt(g) + ' m/s²') + txt(312, 232, 'φ = ' + fmt(deg(th), 0) + '°', { a: 'end' });
    }
    bind(q(el, 'ctrl'), function (v) { P = v; release(); });
    onSeg(el, 'g', function (val) { g = parseFloat(val); release(); });
    q(el, 'rel').addEventListener('click', release);
    q(el, 'sw').addEventListener('click', function () {
      if (sw.run) { sw.acc += t - sw.start; sw.run = false; this.textContent = '▶ Stopper indítása'; }
      else { sw.run = true; sw.start = t; this.textContent = '⏹ Stopper megállítása'; }
      swInfo();
    });
    q(el, 'swr').addEventListener('click', function () {
      sw.acc = 0; sw.n = 0; if (sw.run) sw.start = t; swInfo();
    });
    swInfo();
    loop(el, function (dt) {
      var n = Math.max(1, Math.ceil(dt / 0.002)), h = dt / n;
      for (var i = 0; i < n; i++) {
        var prev = th; step(h); t += h;
        if (prev < 0 && th >= 0) { // negatívból pozitívba: periódusonként egyszer
          var tc = t - h * th / (th - prev);
          if (lastX != null) { Tm = tc - lastX; info(); }
          lastX = tc;
          if (sw.run) sw.n++;
        }
      }
      draw();
      if (sw.run || dt === 0) swInfo();
    });
  });

  /* =====================================================================
   * 2. Rugós rezgés
   * ===================================================================== */
  S.addWidget('labor-rugo', function (el) {
    var P = { k: 20, m: 0.5, b: 0, x0: 0.1 }, x = 0.1, v = 0, t = 0, tRel = 0, hist = [], run = true, W = 8;
    el.innerHTML = head('🌀 Rugós rezgés és csillapítás', 'Felemeljük a rugón lógó testet **x₀** magasra az egyensúlyi helyzet fölé, majd elengedjük. Állítsd a rugóállandót, a tömeget és a csillapítást, és figyeld a kitérés–idő grafikont!') +
      '<div class="w-grid"><div class="w-ctrl" data-lb="ctrl">' + rng('k', 'Rugóállandó (k)', 5, 100, 1, 20, 'N/m', 0) + rng('m', 'Tömeg (m)', 0.1, 2, 0.05, 0.5, 'kg') +
      rng('b', 'Csillapítás (b)', 0, 10, 0.1, 0, 'kg/s', 1) + rng('x0', 'Kezdeti kitérés (x₀)', 0.02, 0.15, 0.01, 0.1, 'm') +
      '<div class="lb-btns"><button type="button" class="btn primary" data-lb="rel">↺ Újra elengedem</button><button type="button" class="btn" data-lb="run">⏸ Szünet</button></div>' +
      '</div><div class="w-out"><div class="lb-two"><svg class="w-svg" viewBox="0 0 120 240" data-lb="spr" role="img" aria-label="Rugón rezgő test"></svg>' +
      '<svg class="w-svg" viewBox="0 0 320 240" data-lb="gr" role="img" aria-label="Kitérés–idő grafikon"></svg></div><div data-lb="res"></div><div class="w-formula" data-lb="f"></div></div></div>' +
      learn([
        'Olvasd le a grafikonról a periódusidőt (két szomszédos csúcs távolsága), és hasonlítsd össze a `T = 2π·√(m/k)` értékkel!',
        'Négyszerezd meg a tömeget: a periódusidő a kétszeresére nő.',
        'Merevebb rugó (nagyobb k) → gyorsabb rezgés.',
        'Változtasd a kezdeti kitérést: a periódusidő **nem** változik, csak az amplitúdó!',
        'Kapcsold be a csillapítást: az amplitúdó egyre csökken (szaggatott burkológörbe), és az energia hővé alakul. Nagy csillapításnál a test át sem leng – ez a **túlcsillapítás**.'
      ], 'A rugó a Hooke-törvény szerint a kitéréssel arányos, vele ellentétes irányú erővel húzza vissza a testet: `F = −k·x`. Newton II. törvényéből `m·a = −k·x`, ennek megoldása a **harmonikus rezgés**:\n\n' +
        '`x(t) = x₀·cos(ω·t)`, ahol `ω = √(k/m)` és `T = 2π·√(m/k)`\n\n' +
        '- Nagyobb tömeg → nagyobb tehetetlenség → lassabb rezgés.\n' +
        '- Merevebb rugó → nagyobb visszatérítő erő → gyorsabb rezgés.\n' +
        '- A nehézségi erő csak az egyensúlyi helyzetet tolja lejjebb, a periódusidőt nem változtatja meg.\n\n' +
        'A **csillapítás** (pl. légellenállás, súrlódás, olaj a lengéscsillapítóban) a sebességgel arányos fékezőerő: `F = −b·v`. Ilyenkor az amplitúdó exponenciálisan csökken: `x₀·e^(−b·t/(2m))`. Ha `b = 2·√(k·m)`, akkor **kritikus csillapításról** beszélünk: a test a lehető leggyorsabban, átlendülés nélkül áll be. Az autók lengéscsillapítóit ennek közelébe hangolják, hogy a kocsi egy úthiba után ne „pattogjon”.');
    var spr = q(el, 'spr'), gr = q(el, 'gr');
    function release() { x = P.x0; v = 0; tRel = t; hist = [[t, x]]; }
    function info() {
      var w0 = Math.sqrt(P.k / P.m), gm = P.b / (2 * P.m), T0 = 2 * Math.PI / w0, kind, Td = null;
      if (P.b === 0) kind = 'csillapítatlan';
      else if (gm < w0 * 0.97) { kind = 'gyengén csillapított'; Td = 2 * Math.PI / Math.sqrt(w0 * w0 - gm * gm); }
      else if (gm <= w0 * 1.03) kind = 'kritikus csillapítás';
      else kind = 'túlcsillapított';
      var E = 0.5 * P.k * x * x + 0.5 * P.m * v * v;
      q(el, 'res').innerHTML = res([['Periódusidő T₀ = 2π√(m/k)', fmt(T0, 3) + ' s'], ['Frekvencia f₀', fmt(1 / T0, 3) + ' Hz'],
        ['Csillapított periódusidő', Td ? fmt(Td, 3) + ' s' : (P.b === 0 ? '= T₀' : 'nincs rezgés')], ['Viselkedés', kind],
        ['Pillanatnyi kitérés', fmt(x * 100, 1) + ' cm'], ['Rezgési energia', fmt(E * 1000, 1) + ' mJ']]);
      q(el, 'f').textContent = 'T₀ = 2π·√(m/k) = 2π·√(' + fmt(P.m) + ' kg / ' + fmt(P.k, 0) + ' N/m) = ' + fmt(T0, 3) + ' s   ·   kritikus csillapítás: b = 2√(k·m) = ' + fmt(2 * Math.sqrt(P.k * P.m), 2) + ' kg/s';
    }
    function draw() {
      // rugó + test (felfelé pozitív kitérés)
      var cy = 140 - x * 400, mw = 26 + P.m * 12, top = cy - 16, n = 14, pts = [[60, 8], [60, 18]];
      for (var i = 1; i < n; i++) pts.push([60 + (i % 2 ? 13 : -13), 18 + (top - 26) * i / n]);
      pts.push([60, top - 8]); pts.push([60, top]);
      spr.innerHTML = '<rect x="20" y="2" width="80" height="6" class="lb-solid"/>' + ln(8, 140, 112, 140, 'class="lb-axis" stroke-dasharray="4 3"') + txt(112, 135, '0', { a: 'end' }) +
        '<path d="' + path(pts) + '" fill="none" class="lb-ink" stroke-width="2" stroke-linejoin="round"/>' +
        '<rect x="' + r1(60 - mw / 2) + '" y="' + r1(top) + '" width="' + r1(mw) + '" height="32" rx="4" fill="#2f7bf6" stroke="rgba(0,0,0,.35)"/>' +
        txt(60, top + 21, fmt(P.m) + ' kg', { a: 'middle', fill: '#fff', fs: 10, cls: 'svg-text' }) +
        txt(6, 232, 'x = ' + fmt(x * 100, 1) + ' cm');
      // grafikon
      var t0 = t - W, X0 = 36, X1 = 312, Y0 = 120, sc = 95 / 0.16;
      function gx(tt) { return X0 + (tt - t0) / W * (X1 - X0); }
      function gy(xx) { return Y0 - xx * sc; }
      var s = '';
      for (var sec = Math.ceil(t0); sec <= t; sec++) s += ln(gx(sec), 20, gx(sec), 220, 'class="lb-grid"');
      [0.15, 0.1, 0.05, -0.05, -0.1, -0.15].forEach(function (yy) { s += ln(X0, gy(yy), X1, gy(yy), 'class="lb-grid"') + txt(X0 - 3, gy(yy) + 4, fmt(yy * 100, 0), { a: 'end', fs: 9 }); });
      s += ln(X0, Y0, X1, Y0, 'class="lb-axis"') + ln(X0, 20, X0, 220, 'class="lb-axis"') + txt(X0 - 3, 14, 'x (cm)', { a: 'start', fs: 10 }) + txt(X1, 236, 'idő → (1 osztás = 1 s)', { a: 'end', fs: 10 });
      var gm = P.b / (2 * P.m), w0 = Math.sqrt(P.k / P.m);
      if (P.b > 0 && gm < w0) {
        var e1 = [], e2 = [];
        for (var j = 0; j <= 60; j++) { var tt = Math.max(tRel, t0) + (t - Math.max(tRel, t0)) * j / 60, ev = P.x0 * Math.exp(-gm * (tt - tRel)); e1.push([gx(tt), gy(ev)]); e2.push([gx(tt), gy(-ev)]); }
        s += '<path d="' + path(e1) + '" fill="none" stroke="#f59f00" stroke-dasharray="4 3"/><path d="' + path(e2) + '" fill="none" stroke="#f59f00" stroke-dasharray="4 3"/>';
      }
      if (hist.length > 1) s += '<path d="' + path(hist.map(function (p) { return [gx(p[0]), gy(p[1])]; })) + '" fill="none" stroke="#2f7bf6" stroke-width="2"/>';
      s += '<circle cx="' + r1(gx(t)) + '" cy="' + r1(gy(x)) + '" r="4" fill="#e5484d"/>';
      gr.innerHTML = s;
    }
    bind(q(el, 'ctrl'), function (vv, k) { P = vv; if (k === 'x0' || k === null) release(); info(); });
    q(el, 'rel').addEventListener('click', function () { release(); run = true; q(el, 'run').textContent = '⏸ Szünet'; });
    q(el, 'run').addEventListener('click', function () { run = !run; this.textContent = run ? '⏸ Szünet' : '▶ Folytatás'; });
    var acc = 0;
    loop(el, function (dt) {
      if (run && dt > 0) {
        var n = Math.ceil(dt / 0.001), h = dt / n;
        for (var i = 0; i < n; i++) { var a = (-P.k * x - P.b * v) / P.m; v += a * h; x += v * h; t += h; }
        hist.push([t, x]);
        while (hist.length && hist[0][0] < t - W) hist.shift();
        acc += dt; if (acc > 0.1) { acc = 0; info(); }
      }
      draw();
    });
  });

  /* =====================================================================
   * 3. Fénytörés és teljes visszaverődés
   * ===================================================================== */
  var MED = [['1.000', 'levegő (n = 1,00)'], ['1.333', 'víz (n = 1,33)'], ['1.361', 'alkohol (n = 1,36)'], ['1.49', 'plexi (n = 1,49)'], ['1.52', 'üveg (n = 1,52)'], ['2.42', 'gyémánt (n = 2,42)']];
  function medName(n) { var m = MED.filter(function (x) { return +x[0] === n; })[0]; return m ? m[1].split(' (')[0] : ''; }
  S.addWidget('labor-fenytores', function (el) {
    var n1 = 1, n2 = 1.333, A = 40;
    el.innerHTML = head('🔦 Fénytörés és teljes visszaverődés', 'Egy lézersugár a felső közegből érkezik a határfelületre. Válaszd ki a két közeget, és forgasd a sugarat a beesési szög csúszkájával!') +
      '<div class="w-grid"><div class="w-ctrl" data-lb="ctrl">' + sel('m1', 'Felső közeg (innen jön a fény)', MED, '1.000') + sel('m2', 'Alsó közeg', MED, '1.333') +
      '<button type="button" class="btn" data-lb="swap">⇅ Közegek cseréje</button>' + rng('a', 'Beesési szög (α)', 0, 89, 0.5, 40, '°', 1) +
      '<div data-lb="msg"></div></div><div class="w-out"><svg class="w-svg" viewBox="0 0 320 260" data-lb="svg" role="img" aria-label="Fénysugár törése két közeg határán"></svg><div data-lb="res"></div><div class="w-formula" data-lb="f"></div></div></div>' +
      learn([
        'Levegőből vízbe: a megtört sugár a beesési merőlegeshez **közelebb** halad (β < α).',
        'Cseréld meg a közegeket (víz fent, levegő lent), és növeld a szöget! Kb. 48,6°-nál eltűnik a megtört sugár: ez a **határszög**.',
        'Merőleges (0°-os) beesésnél a fény nem változtat irányt.',
        'Gyémántból levegőbe a határszög csak kb. 24,4° – ezért verődik vissza és csillog annyira a csiszolt gyémánt.',
        'Figyeld a visszavert sugár erősségét: minél laposabban érkezik a fény, annál több verődik vissza.'
      ], 'A fény különböző anyagokban különböző sebességgel halad: `v = c/n`, ahol `n` az anyag **törésmutatója** (vákuumban n = 1, vízben 1,33, üvegben kb. 1,5). Amikor a sugár ferdén éri a határfelületet, az egyik „széle” hamarabb lassul le, ezért a sugár irányt változtat – ez a **fénytörés**. A törési törvény (Snellius–Descartes-törvény):\n\n' +
        '`n₁·sin α = n₂·sin β`\n\n' +
        'Ha a fény **optikailag sűrűbb** közegből ritkább felé halad (n₁ > n₂), a megtört sugár a merőlegestől elhajlik. A **határszögnél** a megtört sugár már a felület mentén haladna (β = 90°): `sin α_h = n₂ / n₁`. Ennél nagyobb beesési szögnél a fény egyáltalán nem lép ki, **teljesen visszaverődik**.\n\n' +
        'Ezt használja az **optikai kábel** (üvegszál): a fény a szál falán újra és újra teljesen visszaverődik, így kilométereken át vezethető – így jut el hozzád az internet is.');
    var svg = q(el, 'svg'), read;
    function fresnel(ci, ct) {
      var rs = (n1 * ci - n2 * ct) / (n1 * ci + n2 * ct), rp = (n1 * ct - n2 * ci) / (n1 * ct + n2 * ci);
      return (rs * rs + rp * rp) / 2;
    }
    function tint(n) { return 'rgba(80,160,255,' + Math.min(0.5, (n - 1) * 0.32).toFixed(2) + ')'; }
    function update() {
      var a = rad(A), s = n1 / n2 * Math.sin(a), tir = s > 1, b = tir ? null : Math.asin(s);
      var R = tir ? 1 : fresnel(Math.cos(a), Math.cos(b)), crit = n1 > n2 ? deg(Math.asin(n2 / n1)) : null;
      var C = [160, 130], L = 128, col = '#ff3b30';
      var inc = [C[0] - L * Math.sin(a), C[1] - L * Math.cos(a)], refl = [C[0] + L * Math.sin(a), C[1] - L * Math.cos(a)];
      var h = '<rect x="0" y="0" width="320" height="130" fill="' + tint(n1) + '"/><rect x="0" y="130" width="320" height="130" fill="' + tint(n2) + '"/>' +
        ln(0, 130, 320, 130, 'class="lb-ink" stroke-width="1.5"') + ln(160, 8, 160, 252, 'class="lb-axis" stroke-dasharray="5 4"') +
        txt(8, 18, medName(n1) + ' · n₁ = ' + fmt(n1, 3), { cls: 'svg-text', fs: 12 }) + txt(8, 250, medName(n2) + ' · n₂ = ' + fmt(n2, 3), { cls: 'svg-text', fs: 12 }) +
        txt(166, 18, 'beesési merőleges', { fs: 10 });
      // szögívek
      var ra = 34;
      if (A > 0.5) h += '<path d="M160 ' + (130 - ra) + ' A' + ra + ' ' + ra + ' 0 0 0 ' + r1(160 - ra * Math.sin(a)) + ' ' + r1(130 - ra * Math.cos(a)) + '" fill="none" stroke="#ff9f0a" stroke-width="2"/>' +
        txt(160 - 46 * Math.sin(a / 2) - 4, 130 - 46 * Math.cos(a / 2) + 4, 'α', { cls: 'svg-text', fs: 13, w: 700, a: 'middle' });
      h += arrow(inc[0], inc[1], (inc[0] + C[0]) / 2, (inc[1] + C[1]) / 2, col, 3) + ln((inc[0] + C[0]) / 2, (inc[1] + C[1]) / 2, C[0], C[1], 'stroke="' + col + '" stroke-width="3"');
      h += arrow(C[0], C[1], refl[0], refl[1], col, 3, ' opacity="' + Math.max(0.12, R).toFixed(2) + '"');
      if (!tir) {
        var tr = [C[0] + L * Math.sin(b), C[1] + L * Math.cos(b)];
        h += arrow(C[0], C[1], tr[0], tr[1], col, 3, ' opacity="' + Math.max(0.15, 1 - R).toFixed(2) + '"');
        if (b > 0.01) h += '<path d="M160 ' + (130 + ra) + ' A' + ra + ' ' + ra + ' 0 0 0 ' + r1(160 + ra * Math.sin(b)) + ' ' + r1(130 + ra * Math.cos(b)) + '" fill="none" stroke="#30b0c7" stroke-width="2"/>' +
          txt(160 + 46 * Math.sin(b / 2) + 4, 130 + 46 * Math.cos(b / 2) + 4, 'β', { cls: 'svg-text', fs: 13, w: 700, a: 'middle' });
      }
      h += '<circle cx="160" cy="130" r="3" fill="' + col + '"/>';
      svg.innerHTML = h;
      q(el, 'res').innerHTML = res([['Beesési szög α', fmt(A, 1) + '°'], ['Törési szög β', tir ? 'nincs' : fmt(deg(b), 1) + '°'],
        ['Visszavert fény', fmt(R * 100, R > 0.995 ? 0 : 1) + ' %'], ['Határszög', crit == null ? 'nincs (n₁ ≤ n₂)' : fmt(crit, 1) + '°']]);
      q(el, 'f').textContent = tir ? 'n₁·sin α = ' + fmt(n1 * Math.sin(a), 3) + ' > n₂ = ' + fmt(n2, 3) + '  →  nincs megoldás: teljes visszaverődés' :
        'n₁·sin α = n₂·sin β  →  ' + fmt(n1, 3) + '·sin ' + fmt(A, 1) + '° = ' + fmt(n2, 3) + '·sin ' + fmt(deg(b), 1) + '°';
      q(el, 'msg').innerHTML = tir ? '<div class="w-msg warn">✨ <b>Teljes visszaverődés!</b> A beesési szög (' + fmt(A, 1) + '°) nagyobb a határszögnél (' + fmt(crit, 1) + '°), ezért a fény nem lép ki az alsó közegbe.</div>' :
        (n1 < n2 ? '<div class="w-msg ok">Ritkábból sűrűbb közegbe: a sugár a merőlegeshez törik.</div>' : n1 > n2 ? '<div class="w-msg ok">Sűrűbből ritkább közegbe: a sugár a merőlegestől törik. Növeld a szöget a határszög fölé!</div>' : '<div class="w-msg ok">Egyforma közegek: nincs fénytörés.</div>');
    }
    read = bind(q(el, 'ctrl'), function (v) { A = v.a; update(); });
    q(el, 'm1').addEventListener('change', function () { n1 = parseFloat(this.value); update(); });
    q(el, 'm2').addEventListener('change', function () { n2 = parseFloat(this.value); update(); });
    q(el, 'swap').addEventListener('click', function () {
      var a = q(el, 'm1').value; q(el, 'm1').value = q(el, 'm2').value; q(el, 'm2').value = a;
      n1 = parseFloat(q(el, 'm1').value); n2 = parseFloat(q(el, 'm2').value); update();
    });
  });

  /* =====================================================================
   * 4. Gyűjtőlencse képalkotása
   * ===================================================================== */
  S.addWidget('labor-lencse', function (el) {
    var P = { f: 10, t: 30 }, SC = 5;
    el.innerHTML = head('🔍 Gyűjtőlencse képalkotása', 'Mozgasd a tárgyat (narancs nyíl) és változtasd a lencse fókusztávolságát! A három **nevezetes sugármenet** megmutatja, hol keletkezik a kép.') +
      '<div class="w-grid lb-wide"><div class="w-ctrl" data-lb="ctrl">' + rng('t', 'Tárgytávolság (t)', 2, 55, 0.5, 30, 'cm', 1) + rng('f', 'Fókusztávolság (f)', 3, 20, 0.5, 10, 'cm', 1) +
      '<div class="lb-legend"><span><i style="background:#e5484d"></i>tengellyel párhuzamos → fókuszon át</span><span><i style="background:#2f9e44"></i>optikai középponton át: nem törik</span><span><i style="background:#2f7bf6"></i>fókuszon át → tengellyel párhuzamos</span></div>' +
      '</div><div class="w-out"><svg class="w-svg" viewBox="0 0 600 300" data-lb="svg" role="img" aria-label="Gyűjtőlencse sugármenete"></svg><div data-lb="res"></div><div class="w-formula" data-lb="f"></div></div></div>' +
      learn([
        '**t > 2f:** a kép kicsinyített, fordított állású és valódi (így működik a fényképezőgép és a szemünk).',
        '**t = 2f:** a kép ugyanakkora, mint a tárgy, és szintén 2f távolságra van.',
        '**f < t < 2f:** nagyított, fordított, valódi kép (projektor, diavetítő).',
        '**t = f:** a megtört sugarak párhuzamosak – nincs kép (így világít a zseblámpa és a reflektor).',
        '**t < f:** egyenes állású, nagyított, **látszólagos** kép – így működik a nagyító (lupé).'
      ], 'A gyűjtőlencse közepe vastagabb, mint a széle, ezért a tengellyel párhuzamosan érkező sugarakat a **fókuszpontba** (F) töri. A képszerkesztéshez elég két-három nevezetes sugár:\n\n' +
        '- a tengellyel párhuzamos sugár a túloldali fókuszponton át halad tovább,\n- az optikai középponton átmenő sugár irányváltozás nélkül halad át,\n- a fókuszponton át érkező sugár a lencse után a tengellyel párhuzamosan halad.\n\n' +
        'A tárgytávolság (t), a képtávolság (k) és a fókusztávolság (f) között a **leképezési törvény** teremt kapcsolatot:\n\n`1/f = 1/t + 1/k`, a nagyítás pedig `N = K/T = k/t`.\n\n' +
        'Ha a megtört sugarak valóban egy pontban találkoznak, **valódi kép** keletkezik – ernyőn felfogható. Ha a tárgy a fókuszponton belül van, a megtört sugarak széttartanak, csak a **meghosszabbításaik** (szaggatott vonalak) metszik egymást: ez a **látszólagos kép**, ernyőn nem fogható fel, de a lencsén át belenézve látjuk. (A képletben ilyenkor k negatív.) A lencse törőképessége dioptriában: `D = 1/f` (f méterben).');
    var svg = q(el, 'svg');
    function X(x) { return 300 + x * SC; }
    function Y(y) { return 150 - y * SC; }
    function ray(pts, color, dash) {
      return '<path d="' + path(pts.map(function (p) { return [X(p[0]), Y(p[1])]; })) + '" fill="none" stroke="' + color + '" stroke-width="' + (dash ? 1.5 : 2) + '"' + (dash ? ' stroke-dasharray="5 4" opacity=".8"' : '') + '/>';
    }
    function arr(x, h, color, dash, label) {
      var x0 = X(x), y0 = Y(0), y1 = Y(h), d = h >= 0 ? 1 : -1;
      return '<g>' + ln(x0, y0, x0, y1 + d * 6, 'stroke="' + color + '" stroke-width="4"' + (dash ? ' stroke-dasharray="5 3"' : '')) +
        '<polygon points="' + r1(x0) + ',' + r1(y1) + ' ' + r1(x0 - 7) + ',' + r1(y1 + d * 11) + ' ' + r1(x0 + 7) + ',' + r1(y1 + d * 11) + '" fill="' + color + '"/>' +
        txt(x0 > 450 ? x0 - 10 : x0 + 10, h >= 0 ? y1 + 4 : y1 + 2, label, { a: x0 > 450 ? 'end' : 'start', fs: 13, cls: 'svg-text', fill: color }) + '</g>';
    }
    function update() {
      var kk = P.t * P.f / (P.t - P.f), NN = Math.abs(P.f / (P.t - P.f));
      SC = Math.min(12, 285 / (Math.max(P.t, 2 * P.f, 10, Math.abs(kk) < 80 ? Math.abs(kk) : 0) + 2));
      var f = P.f, t = P.t, h = Math.max(18, Math.min(62, 125 / Math.max(1, NN))) / SC, XE = 330 / SC, dd = t - f, none = Math.abs(dd) < 0.25;
      var k = none ? Infinity : t * f / dd, Hk = none ? 0 : -h * k / t, real = k > 0 && !none;
      var s = ln(0, 150, 600, 150, 'class="lb-axis" stroke-width="1.5"');
      [[-2 * f, '2F'], [-f, 'F'], [f, 'F′'], [2 * f, '2F′']].forEach(function (p) {
        if (Math.abs(p[0]) * SC <= 296) s += '<circle cx="' + r1(X(p[0])) + '" cy="150" r="3.5" class="lb-inkf"/>' + txt(X(p[0]), 168, p[1], { a: 'middle', fs: 13 });
      });
      s += '<ellipse cx="300" cy="150" rx="9" ry="125" fill="rgba(80,160,255,.22)" stroke="rgba(47,123,246,.8)" stroke-width="1.5"/>' +
        '<polygon points="300,22 293,34 307,34" fill="rgba(47,123,246,.8)"/><polygon points="300,278 293,266 307,266" fill="rgba(47,123,246,.8)"/>';
      // 1. párhuzamos sugár
      var m1 = -h / f;
      s += ray([[-t, h], [0, h], [XE, h + m1 * XE]], '#e5484d');
      if (!real && !none) s += ray([[0, h], [k, Hk]], '#e5484d', true);
      // 2. középponton át
      var m2 = -h / t;
      s += ray([[-t, h], [0, 0], [XE, m2 * XE]], '#2f9e44');
      if (!real && !none) s += ray([[0, 0], [k, Hk]], '#2f9e44', true);
      // 3. fókuszon át
      if (!none) {
        var y3 = -h * f / dd;
        if (Math.abs(y3) * SC < 600) {
          s += ray([[-t, h], [0, y3], [XE, y3]], '#2f7bf6');
          if (!real) s += ray([[0, y3], [k, y3]], '#2f7bf6', true);
          if (t < f) s += ray([[-f, 0], [-t, h]], '#2f7bf6', true);
        }
      }
      s += arr(-t, h, '#f08c00', false, 'tárgy');
      if (!none && Math.abs(k) * SC < 300) s += arr(k, Hk, '#9c36b5', !real, real ? 'kép (valódi)' : 'kép (látszólagos)');
      else if (!none) s += txt(real ? 592 : 8, 20, real ? 'a kép messze jobbra van →' : '← a kép messze balra van', { a: real ? 'end' : 'start', fs: 13, cls: 'svg-text' });
      else s += txt(592, 20, 'a sugarak párhuzamosak: nincs kép', { a: 'end', fs: 13, cls: 'svg-text' });
      svg.innerHTML = s;
      var N = none ? Infinity : Math.abs(k) / t, kind;
      if (none) kind = 'nincs kép (végtelenben)';
      else kind = (real ? 'valódi, fordított' : 'látszólagos, egyenes') + ', ' + (Math.abs(N - 1) < 0.02 ? 'ugyanakkora' : N > 1 ? 'nagyított' : 'kicsinyített');
      q(el, 'res').innerHTML = res([['Képtávolság k', none ? '∞' : fmt(k, 1) + ' cm'], ['Nagyítás N = |k|/t', none ? '∞' : fmt(N, 2) + '×'], ['A kép', kind], ['Törőképesség D', fmt(100 / f, 1) + ' dioptria']]);
      q(el, 'f').textContent = none ? '1/f = 1/t + 1/k  →  1/k = 1/' + fmt(f, 1) + ' − 1/' + fmt(t, 1) + ' = 0  →  k = ∞' :
        '1/f = 1/t + 1/k  →  1/' + fmt(f, 1) + ' = 1/' + fmt(t, 1) + ' + 1/(' + fmt(k, 1) + ')   [cm]';
    }
    bind(q(el, 'ctrl'), function (v) { P = v; update(); });
  });

  /* =====================================================================
   * 5. Hullámok interferenciája
   * ===================================================================== */
  S.addWidget('labor-interferencia', function (el) {
    var CW = 300, CH = 200, P = { lam: 20, d: 60 }, two = true, mode = 'hullam', ph = 0, Aa, Ps, probe = null, dirty = true;
    el.innerHTML = head('🌊 Hullámok interferenciája', 'Két, egyszerre rezgő (azonos fázisú) pontforrás hullámokat kelt egy vízkádban. Ahol hullámhegy hullámheggyel találkozik, **erősítés**, ahol hegy völggyel, **kioltás** jön létre. **Koppints a képre** egy pont vizsgálatához!') +
      '<div class="row lb-mb">' + seg('md', [['hullam', '🌊 Pillanatkép'], ['int', '☀️ Erősítés–kioltás térkép']], 'hullam') + seg('two', [['2', '2 forrás'], ['1', '1 forrás']], '2') + '</div>' +
      '<div class="w-grid"><div class="w-ctrl" data-lb="ctrl">' + rng('lam', 'Hullámhossz (λ)', 8, 40, 1, 20, 'mm', 0) + rng('d', 'Források távolsága (d)', 10, 120, 1, 60, 'mm', 0) +
      '<div data-lb="probe" class="lb-small">Koppints a vízfelületre: megmutatjuk, mekkora ott a két hullám útkülönbsége.</div></div>' +
      '<div class="w-out"><canvas class="lb-cv" width="' + CW + '" height="' + CH + '" data-lb="cv" role="img" aria-label="Két pontforrás hullámainak interferenciája"></canvas><div data-lb="res"></div><div class="w-formula">erősítés: Δs = n·λ   ·   kioltás: Δs = (n + ½)·λ   (n = 0, 1, 2, …)</div></div></div>' +
      learn([
        'A két forrás felezőmerőlegesén mindig **erősítés** van – ott az útkülönbség 0.',
        'Csökkentsd a hullámhosszt: az erősítési vonalak sűrűbbek lesznek, és több lesz belőlük.',
        'Növeld a források távolságát: ez is több vonalat ad.',
        'Kapcsolj „1 forrás”-ra: eltűnik a mintázat, csak körhullámok maradnak.',
        'Nézd meg a térképet: a sötét kioltási vonalak görbék (hiperbolák), amelyek a források között indulnak.'
      ], 'A hullámok **szuperpozíciója**: ahol két hullám találkozik, a kitérésük összeadódik. Hogy egy pontban mi történik, az attól függ, mennyivel hosszabb utat tesz meg az egyik hullám, mint a másik (**útkülönbség**, `Δs = |s₁ − s₂|`):\n\n' +
        '- Ha `Δs` a hullámhossz egész számú többszöröse (`0, λ, 2λ, …`), a hullámok **azonos fázisban** érkeznek: hegy hegyre, völgy völgyre – **erősítés**.\n' +
        '- Ha `Δs = λ/2, 3λ/2, …`, hegy völgyre esik – **kioltás**.\n\n' +
        'Az erősítési vonalak száma kb. `2·d/λ + 1`, ezért rövidebb hullámhossznál vagy távolabbi forrásoknál több vonal van. Interferencia csak **koherens** (azonos frekvenciájú, állandó fáziskülönbségű) forrásoknál alakul ki tartósan.\n\n' +
        'Ugyanez történik a fénnyel Young kétréses kísérletében (ez bizonyította, hogy a fény hullám), a hanggal két hangszóró előtt, és ezen alapul a **zajszűrős fejhallgató** is: ellenfázisú hanggal oltja ki a zajt.');
    var cv = q(el, 'cv'), ctx = cv.getContext ? cv.getContext('2d') : null, img = ctx ? ctx.createImageData(CW, CH) : null;
    function src() { return two ? [[CW / 2 - P.d / 2, 14], [CW / 2 + P.d / 2, 14]] : [[CW / 2, 14]]; }
    function precompute() {
      var k = 2 * Math.PI / P.lam, s = src(), n = CW * CH;
      Aa = new Float32Array(n); Ps = new Float32Array(n);
      for (var y = 0; y < CH; y++) for (var x = 0; x < CW; x++) {
        var re = 0, im = 0;
        for (var j = 0; j < s.length; j++) { var r = Math.sqrt((x - s[j][0]) * (x - s[j][0]) + (y - s[j][1]) * (y - s[j][1])); re += Math.cos(k * r); im += Math.sin(k * r); }
        var i = y * CW + x; Aa[i] = Math.sqrt(re * re + im * im); Ps[i] = Math.atan2(im, re);
      }
      dirty = true;
    }
    function render() {
      if (!ctx) return;
      var d = img.data, n = CW * CH, mx = two ? 2 : 1;
      for (var i = 0; i < n; i++) {
        var u = mode === 'int' ? Aa[i] * Aa[i] / (mx * mx) : (Aa[i] * Math.cos(Ps[i] - ph) / mx + 1) / 2;
        var o = i * 4;
        if (mode === 'int') { d[o] = 10 + 245 * u; d[o + 1] = 18 + 200 * u; d[o + 2] = 50 + 40 * u; }
        else { d[o] = 8 + 190 * u; d[o + 1] = 45 + 190 * u; d[o + 2] = 110 + 145 * u; }
        d[o + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      src().forEach(function (p) { ctx.beginPath(); ctx.arc(p[0], p[1], 4, 0, 7); ctx.fillStyle = '#ff3b30'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); });
      if (probe) {
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
        src().forEach(function (p) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(probe[0], probe[1]); ctx.stroke(); });
        ctx.setLineDash([]); ctx.beginPath(); ctx.arc(probe[0], probe[1], 5, 0, 7); ctx.strokeStyle = '#ffd43b'; ctx.lineWidth = 2.5; ctx.stroke();
      }
      dirty = false;
    }
    function probeInfo() {
      var box = q(el, 'probe');
      if (!probe) return;
      var s = src();
      if (!two) { box.innerHTML = 'Egy forrásnál nincs útkülönbség – nincs interferencia, mindenhol ugyanakkora a hullám.'; return; }
      var r1_ = Math.hypot(probe[0] - s[0][0], probe[1] - s[0][1]), r2_ = Math.hypot(probe[0] - s[1][0], probe[1] - s[1][1]);
      var ds = Math.abs(r1_ - r2_), m = ds / P.lam, fr = m - Math.floor(m), verdict;
      if (fr < 0.15 || fr > 0.85) verdict = '<b class="lb-good">erősítés</b> (Δs ≈ ' + Math.round(m) + '·λ)';
      else if (fr > 0.35 && fr < 0.65) verdict = '<b class="lb-bad">kioltás</b> (Δs ≈ ' + (Math.floor(m) + 0.5).toLocaleString('hu-HU') + '·λ)';
      else verdict = 'részleges erősítés';
      box.innerHTML = 'Távolság a forrásoktól: s₁ = ' + fmt(r1_, 1) + ' mm, s₂ = ' + fmt(r2_, 1) + ' mm<br>Útkülönbség: Δs = ' + fmt(ds, 1) + ' mm = <b>' + fmt(m, 2) + ' λ</b> → ' + verdict;
    }
    function info() {
      var m = Math.floor(P.d / P.lam - 1e-9);
      q(el, 'res').innerHTML = res([['Hullámhossz λ', fmt(P.lam, 0) + ' mm'], ['Források távolsága d', fmt(P.d, 0) + ' mm'], ['d / λ', fmt(P.d / P.lam, 2)],
        ['Erősítési vonalak', two ? String(2 * m + 1) : '–']]);
    }
    bind(q(el, 'ctrl'), function (v) { P = v; precompute(); info(); probeInfo(); });
    onSeg(el, 'md', function (v) { mode = v; dirty = true; });
    onSeg(el, 'two', function (v) { two = v === '2'; precompute(); info(); probeInfo(); });
    cv.addEventListener('click', function (e) {
      var r = cv.getBoundingClientRect();
      probe = [(e.clientX - r.left) / r.width * CW, (e.clientY - r.top) / r.height * CH];
      probeInfo(); dirty = true;
    });
    loop(el, function (dt) {
      if (mode === 'hullam') { ph += dt * 2 * Math.PI * 0.8; dirty = true; }
      if (dirty) render();
    });
  });

  /* =====================================================================
   * 6. Titrálás
   * ===================================================================== */
  var IND = {
    ff: { name: 'fenolftalein', range: [8.2, 10], stops: [[8.2, [195, 220, 245, 0.5]], [10, [230, 40, 150, 0.85]]], desc: 'színtelen (pH < 8,2) → rózsaszín/lila (pH > 10)' },
    mn: { name: 'metilnarancs', range: [3.1, 4.4], stops: [[3.1, [225, 40, 40, 0.85]], [3.75, [245, 120, 30, 0.85]], [4.4, [245, 200, 30, 0.85]]], desc: 'piros (pH < 3,1) → narancs → sárga (pH > 4,4)' },
    bt: { name: 'brómtimolkék', range: [6.0, 7.6], stops: [[6.0, [235, 205, 30, 0.85]], [6.8, [50, 170, 80, 0.85]], [7.6, [40, 90, 220, 0.85]]], desc: 'sárga (pH < 6,0) → zöld → kék (pH > 7,6)' }
  };
  function indName(id, pH) {
    var r = IND[id].range;
    if (id === 'ff') return pH < r[0] ? 'színtelen' : pH < 9 ? 'halvány rózsaszín' : 'rózsaszín';
    if (id === 'mn') return pH < r[0] ? 'piros' : pH < r[1] ? 'narancssárga' : 'sárga';
    return pH < r[0] ? 'sárga' : pH < r[1] ? 'zöld' : 'kék';
  }
  S.addWidget('labor-titralas', function (el) {
    var Va = 25, Ca = 0.1, P = { cb: 0.1, v: 0 }, ind = 'ff', drop = null;
    el.innerHTML = head('⚗️ Titrálás: sósav + nátronlúg', 'A lombikban **25,0 cm³ 0,100 mol/dm³ koncentrációjú sósav** (HCl) van, néhány csepp indikátorral. A bürettából **nátrium-hidroxid-oldatot** (NaOH) csepegtetünk hozzá. Keresd meg azt a cseppet, amelytől az indikátor színe megváltozik!') +
      '<div class="row lb-mb">' + seg('ind', [['ff', 'fenolftalein'], ['mn', 'metilnarancs'], ['bt', 'brómtimolkék']], 'ff') + '</div>' +
      '<div class="w-grid"><div class="w-ctrl" data-lb="ctrl">' + rng('v', 'Hozzáadott NaOH-oldat', 0, 50, 0.05, 0, 'cm³') + rng('cb', 'NaOH koncentrációja', 0.05, 0.2, 0.01, 0.1, 'mol/dm³') +
      '<div class="lb-btns"><button type="button" class="btn" data-add="0.05">+1 csepp</button><button type="button" class="btn" data-add="1">+1 cm³</button><button type="button" class="btn" data-add="5">+5 cm³</button><button type="button" class="btn" data-add="-0.05">−1 csepp</button><button type="button" class="btn" data-lb="rst">↺ Újra</button></div>' +
      '<div data-lb="msg"></div></div><div class="w-out"><div class="lb-two lb-two-t"><svg class="w-svg" viewBox="0 0 150 240" data-lb="app" role="img" aria-label="Büretta és titráló lombik"></svg>' +
      '<svg class="w-svg" viewBox="0 0 320 240" data-lb="gr" role="img" aria-label="Titrálási görbe: pH a hozzáadott térfogat függvényében"></svg></div><div data-lb="res"></div><div class="w-formula">HCl + NaOH → NaCl + H₂O   ·   egyenértékpontban: c(HCl)·V(HCl) = c(NaOH)·V(NaOH)</div></div></div>' +
      learn([
        'Csepegtess lassan! Figyeld, hogy az egyenértékpont előtt sok cm³ alig változtat a pH-n, a közelében viszont **egyetlen csepp** több pH-egységet ugrik.',
        'Fenolftaleinnel: melyik cseppnél lesz rózsaszín az oldat? Mennyi NaOH fogyott? Számold ki ebből a sav koncentrációját!',
        'Próbáld ki a metilnarancsot is: korábban vált színt, mégis csak egy-két csepp a különbség.',
        'Duplázd meg a NaOH koncentrációját: feleannyi lúg kell a semlegesítéshez.',
        'A görbén a színes sáv az indikátor **átcsapási tartománya**. Akkor jó egy indikátor, ha a sáv a meredek ugrásba esik.'
      ], 'A titrálás során a sav és a lúg **semlegesíti** egymást: `H⁺ + OH⁻ → H₂O`. Az **egyenértékpontban** pontosan annyi mol NaOH-t adtunk hozzá, amennyi mol HCl volt a lombikban: `c(HCl)·V(HCl) = c(NaOH)·V(NaOH)`. Erős sav és erős bázis esetén itt a pH = 7 (25 °C-on).\n\n' +
        'Miért ugrik ekkorát a pH? Mert a pH **logaritmikus** skála: `pH = −lg[H⁺]`. Ha a sav 99,9%-át már semlegesítettük, a maradék H⁺-koncentráció még mindig kb. 10⁻⁴ mol/dm³ (pH ≈ 4). Egy-két csepp lúg után viszont már OH⁻-felesleg van, és a pH 10 körülire ugrik.\n\n' +
        'Az **indikátorok** gyenge savak vagy bázisok, amelyeknek savas és lúgos formája más színű. Mindegyiknek megvan a maga átcsapási tartománya: fenolftalein 8,2–10, metilnarancs 3,1–4,4, brómtimolkék 6,0–7,6. Erős sav – erős bázis titrálásánál mindhárom használható, mert az ugrás mindhármuk tartományát átfogja.',
        '**Csak a virtuális laborban veszélytelen!** Valódi titrálást kizárólag iskolai laborban, tanári felügyelettel végezz: a sósav és a nátrium-hidroxid-oldat **maró**, védőszemüveg, kesztyű és köpeny kötelező. Pipettázni csak pipettalabdával szabad, szájjal soha!');
    var app = q(el, 'app'), gr = q(el, 'gr'), ctrl = q(el, 'ctrl');
    function pH(V) {
      var na = Ca * Va / 1000, nb = P.cb * V / 1000, Vt = (Va + V) / 1000, d = (na - nb) / Vt;
      return -Math.log(((d + Math.sqrt(d * d + 4e-14)) / 2)) / Math.LN10;
    }
    function color(p) { return grad(IND[ind].stops, p); }
    function drawApp(p) {
      var lvl = 20 + P.v / 50 * 120, c = color(p), fill = rgba(c), s = '';
      // büretta
      s += '<rect x="64" y="12" width="20" height="132" rx="3" class="lb-glass"/>' +
        '<rect x="66" y="' + r1(lvl) + '" width="16" height="' + r1(142 - lvl) + '" fill="rgba(120,170,255,.35)"/>';
      for (var i = 0; i <= 50; i += 5) s += ln(64, 20 + i * 2.4, i % 10 ? 70 : 74, 20 + i * 2.4, 'class="lb-ink" stroke-width="1"') + (i % 10 === 0 ? txt(60, 24 + i * 2.4, String(i), { a: 'end', fs: 9 }) : '');
      s += '<rect x="68" y="144" width="12" height="8" class="lb-solid"/><rect x="58" y="146" width="32" height="4" rx="2" class="lb-solid"/>' + ln(74, 152, 74, 164, 'class="lb-ink" stroke-width="2"');
      if (drop != null) s += '<ellipse cx="74" cy="' + r1(166 + drop * 26) + '" rx="2.5" ry="3.5" fill="rgba(120,170,255,.9)"/>';
      // lombik
      var vol = Va + P.v, ly = 228 - Math.min(40, 14 + vol * 0.35); // folyadékszint
      var lx1 = 64 - (ly - 186) * 0.86, lx2 = 84 + (ly - 186) * 0.86;
      s += '<path d="M' + r1(lx1) + ' ' + r1(ly) + ' L' + r1(lx2) + ' ' + r1(ly) + ' L120 228 L28 228 Z" fill="' + fill + '"/>' +
        '<path d="M64 172 L64 186 L28 228 L120 228 L84 186 L84 172" fill="none" class="lb-ink" stroke-width="2" stroke-linejoin="round"/>' +
        txt(74, 239, IND[ind].name, { a: 'middle', fs: 9 });
      app.innerHTML = s;
    }
    function drawGraph(p, Ve) {
      var X0 = 34, X1 = 312, Y0 = 214, Y1 = 12;
      function gx(V) { return X0 + V / 50 * (X1 - X0); }
      function gy(ph) { return Y0 - ph / 14 * (Y0 - Y1); }
      var r = IND[ind].range, s = '<rect x="' + X0 + '" y="' + r1(gy(r[1])) + '" width="' + (X1 - X0) + '" height="' + r1(gy(r[0]) - gy(r[1])) + '" fill="' + rgba(color((r[0] + r[1]) / 2)).replace(/[\d.]+\)$/, '0.22)') + '"/>';
      for (var ph = 0; ph <= 14; ph += 2) s += ln(X0, gy(ph), X1, gy(ph), 'class="lb-grid"') + txt(X0 - 4, gy(ph) + 4, String(ph), { a: 'end', fs: 9 });
      for (var V = 0; V <= 50; V += 10) s += ln(gx(V), Y0, gx(V), Y1, 'class="lb-grid"') + txt(gx(V), Y0 + 13, String(V), { a: 'middle', fs: 9 });
      s += ln(X0, gy(7), X1, gy(7), 'class="lb-axis" stroke-dasharray="4 3"') + txt(X1 - 2, gy(7) - 3, 'semleges (pH 7)', { a: 'end', fs: 9 });
      s += txt(X0, 9, 'pH', { fs: 10 }) + txt(X1, 238, 'V(NaOH) / cm³', { a: 'end', fs: 10 });
      var vs = [];
      for (var i = 0; i <= 250; i++) vs.push(i / 5);
      if (Ve < 50) for (var j = -10; j <= 10; j++) vs.push(Math.max(0, Math.min(50, Ve + j * 0.02)));
      vs.sort(function (a, b) { return a - b; });
      s += '<path d="' + path(vs.map(function (v) { return [gx(v), gy(pH(v))]; })) + '" fill="none" stroke="#2f7bf6" stroke-width="2"/>';
      if (Ve <= 50) s += ln(gx(Ve), Y0, gx(Ve), Y1, 'stroke="#9c36b5" stroke-dasharray="3 3"') + txt(gx(Ve) + 3, Y1 + 10, 'egyenértékpont', { fs: 9, fill: '#9c36b5' });
      s += '<circle cx="' + r1(gx(P.v)) + '" cy="' + r1(gy(p)) + '" r="5" fill="#e5484d" stroke="#fff" stroke-width="1.5"/>';
      gr.innerHTML = s;
    }
    function update() {
      var p = pH(P.v), Ve = Ca * Va / P.cb, nm = indName(ind, p);
      drawApp(p); drawGraph(p, Ve);
      q(el, 'res').innerHTML = res([['Hozzáadott NaOH', fmt(P.v, 2) + ' cm³'], ['pH', fmt(p, 2)], ['Egyenértékpont', fmt(Ve, 2) + ' cm³'], ['Indikátor színe', nm]]);
      var dv = P.v - Ve, m;
      if (Math.abs(dv) <= 0.051) m = '<div class="w-msg ok">🎯 Pont az egyenértékpontban vagy! Itt a lúg éppen semlegesítette a savat: pH ≈ 7.</div>';
      else if (dv < 0 && dv > -0.5) m = '<div class="w-msg warn">Nagyon közel jársz! Most már cseppenként adagolj.</div>';
      else if (dv > 0 && dv < 1) m = '<div class="w-msg warn">Túlléptél az egyenértékponton: lúgfelesleg van. A fogyás ' + fmt(Ve, 2) + ' cm³ lett volna.</div>';
      else m = '<p class="lb-small">' + esc(IND[ind].name) + ': ' + esc(IND[ind].desc) + '</p>';
      q(el, 'msg').innerHTML = m;
    }
    bind(ctrl, function (v) { P = v; update(); });
    onSeg(el, 'ind', function (v) { ind = v; update(); });
    el.querySelectorAll('[data-add]').forEach(function (b) {
      b.addEventListener('click', function () { setRange(ctrl, 'v', Math.max(0, Math.min(50, +(P.v + parseFloat(b.dataset.add)).toFixed(2)))); if (+b.dataset.add > 0) drop = 0; });
    });
    q(el, 'rst').addEventListener('click', function () { setRange(ctrl, 'v', 0); });
    loop(el, function (dt) {
      if (drop == null) return;
      drop += dt * 3;
      if (drop > 1) drop = null;
      drawApp(pH(P.v));
    });
  });

  /* =====================================================================
   * 7. pH-skála és indikátorok
   * ===================================================================== */
  var CABBAGE = [[1, [200, 30, 60, 0.9]], [3, [215, 50, 130, 0.9]], [5, [145, 60, 165, 0.9]], [7, [95, 80, 185, 0.9]], [8, [60, 110, 205, 0.9]], [9.5, [40, 150, 170, 0.9]], [11, [60, 170, 80, 0.9]], [12.5, [170, 200, 40, 0.9]], [14, [230, 210, 40, 0.9]]];
  var UNIV = [[0, [200, 20, 40, 0.9]], [2, [235, 60, 40, 0.9]], [4, [245, 150, 40, 0.9]], [5, [245, 200, 40, 0.9]], [6, [200, 215, 50, 0.9]], [7, [60, 170, 70, 0.9]], [8, [30, 150, 130, 0.9]], [9, [40, 100, 190, 0.9]], [10, [60, 60, 170, 0.9]], [12, [90, 40, 150, 0.9]], [14, [80, 30, 120, 0.9]]];
  var SUBST = [
    ['🔋', 'akkumulátorsav (kénsav)', 0.8, '0–1', 'Erősen maró! Csak szakember kezelheti.'],
    ['🧪', 'gyomorsav', 1.5, '1–2', 'A gyomor nyálkahártyája védi magát tőle.'],
    ['🍋', 'citromlé', 2.3, '2–2,6', ''],
    ['🥤', 'kóla', 2.5, '2,4–2,8', 'Foszforsavat tartalmaz – a fogzománcnak nem tesz jót.'],
    ['🫙', 'háztartási ecet', 2.7, '2,4–3', ''],
    ['🍊', 'narancslé', 3.6, '3,3–4,2', ''],
    ['🍅', 'paradicsom', 4.4, '4,2–4,9', ''],
    ['☕', 'fekete kávé', 5.0, '4,8–5,2', ''],
    ['🌧️', 'tiszta esővíz', 5.6, 'kb. 5,6', 'A levegő szén-dioxidjától enyhén savas (szénsav).'],
    ['🥛', 'tej', 6.6, '6,5–6,8', ''],
    ['💧', 'frissen desztillált víz', 7.0, '7 (25 °C-on)', 'Semleges: [H⁺] = [OH⁻].'],
    ['🩸', 'vér', 7.4, '7,35–7,45', 'A szervezet nagyon szűk határok között tartja!'],
    ['🌊', 'tengervíz', 8.1, '7,9–8,3', ''],
    ['🧁', 'szódabikarbóna-oldat', 8.3, '8–8,5', ''],
    ['🧼', 'szappanos víz', 10, '9–10', ''],
    ['🧴', 'szalmiákszesz (ammóniaoldat)', 11.3, '11–11,6', 'Szúrós szagú, ne szagold közvetlenül!'],
    ['🧺', 'mosószóda-oldat', 11.5, '11–12', 'Bőrt irritálhat.'],
    ['⚠️', 'hipó (fehérítő)', 12.5, '11–13', 'Soha ne keverd savas szerrel (pl. vízkőoldóval) – mérgező klórgáz fejlődik!'],
    ['🚿', 'lefolyótisztító (NaOH)', 13.5, '13–14', 'Erősen maró! Kesztyű és védőszemüveg kell.']
  ];
  S.addWidget('labor-ph', function (el) {
    var cur = 2, pHv = SUBST[2][2], gid = 'lbph' + (++uid);
    el.innerHTML = head('🌈 pH-skála és indikátorok', 'Válassz egy anyagot a háztartásból, és nézd meg, milyen színű lesz vele a **vöröskáposztalé** és a többi indikátor! A csúszkával tetszőleges pH-t is kipróbálhatsz.') +
      '<div class="lb-chips" data-lb="chips">' + SUBST.map(function (s, i) { return '<button type="button" class="btn sm' + (i === cur ? ' on' : '') + '" data-i="' + i + '">' + s[0] + ' ' + esc(s[1]) + '</button>'; }).join('') + '</div>' +
      '<div class="w-grid"><div class="w-ctrl" data-lb="ctrl">' + rng('ph', 'pH (saját érték)', 0, 14, 0.1, pHv, '', 1) + '<div data-lb="note"></div></div>' +
      '<div class="w-out"><svg class="w-svg" viewBox="0 0 320 250" data-lb="svg" role="img" aria-label="Kémcsövek indikátorokkal és pH-skála"></svg><div data-lb="res"></div></div></div>' +
      learn([
        'Hasonlítsd össze a citromlé és a szódabikarbóna színét vöröskáposztalével: piros ↔ kékes-zöld.',
        'Egy pH-egység különbség **tízszeres** H⁺-koncentrációt jelent! Hányszor savasabb a citromlé (pH 2,3) a kávénál (pH 5)?',
        'A fenolftalein csak lúgos oldatban színes, savasban és semlegesben színtelen – savak megkülönböztetésére nem jó.',
        'A vöröskáposzta szinte a teljes skálán más-más színt mutat – ezért „házi univerzális indikátor”.'
      ], 'A **pH** azt mutatja meg, mennyire savas vagy lúgos egy vizes oldat: `pH = −lg[H⁺]`. 7 alatt savas, 7 felett lúgos, 7 a semleges (25 °C-on). Mivel logaritmikus skála, **egy egységnyi** különbség tízszeres, kettő százszoros eltérést jelent a H⁺-ionok koncentrációjában.\n\n' +
        'Az **indikátorok** olyan festékanyagok, amelyek szerkezete – és ezért színe – a pH-tól függ. A vöröskáposztában **antociánok** vannak (ezek adják a szeder, a cékla és a lila hagyma színét is): savas közegben pirosak, semlegesben lilák, lúgosban kékek, zöldek, erősen lúgosban sárgák. Az univerzális indikátor több festék keveréke, így az egész skálán fokozatosan változik a színe.\n\n' +
        'A megadott pH-értékek tájékoztató jellegűek: a valódi érték a márkától, töménységtől és hőmérséklettől függően eltérhet.',
        '**Otthoni kísérlethez:** vöröskáposztát vágj fel, forrázd le forró vízzel (ezt egy felnőtt végezze), hagyd kihűlni, majd szűrd le. Csak **ételekkel** (ecet, citrom, szódabikarbóna, tej) kísérletezz! Tisztítószereket, hipót, lefolyótisztítót ne használj, és soha ne keverd őket egymással – maró hatásúak, és mérgező gáz is fejlődhet. Semmit ne kóstolj meg!');
    var svg = q(el, 'svg'), ctrl = q(el, 'ctrl');
    function tube(x, label, c) {
      return '<g><path d="M' + (x - 14) + ' 28 L' + (x - 14) + ' 128 A14 14 0 0 0 ' + (x + 14) + ' 128 L' + (x + 14) + ' 28" class="lb-glass" stroke-width="2"/>' +
        '<path d="M' + (x - 12) + ' 62 L' + (x - 12) + ' 128 A12 12 0 0 0 ' + (x + 12) + ' 128 L' + (x + 12) + ' 62 Z" fill="' + rgba(c) + '"/>' +
        txt(x, 160, label[0], { a: 'middle', fs: 10, cls: 'svg-text' }) + txt(x, 172, label[1], { a: 'middle', fs: 10 }) + '</g>';
    }
    function draw() {
      var p = pHv, s = '<defs><linearGradient id="' + gid + '" x1="0" x2="1">';
      for (var i = 0; i <= 14; i++) s += '<stop offset="' + (i / 14).toFixed(3) + '" stop-color="' + rgba(grad(UNIV, i)) + '"/>';
      s += '</linearGradient></defs>';
      var ff = p < 8.2 ? [195, 220, 245, 0.5] : grad(IND.ff.stops, p);
      s += tube(45, ['vöröskáposzta', ''], grad(CABBAGE, p)) + tube(120, ['univerzális', 'indikátor'], grad(UNIV, p)) + tube(195, ['fenolftalein', ''], ff) + tube(270, ['metilnarancs', ''], grad(IND.mn.stops, p));
      var X0 = 14, X1 = 306, bx = X0 + p / 14 * (X1 - X0);
      s += '<rect x="' + X0 + '" y="196" width="' + (X1 - X0) + '" height="18" rx="4" fill="url(#' + gid + ')"/>';
      for (var j = 0; j <= 14; j++) s += txt(X0 + j / 14 * (X1 - X0), 228, String(j), { a: 'middle', fs: 9 });
      s += txt(X0, 244, '← savas', { fs: 10 }) + txt(160, 244, 'semleges', { a: 'middle', fs: 10 }) + txt(X1, 244, 'lúgos →', { a: 'end', fs: 10 });
      s += '<polygon points="' + r1(bx) + ',196 ' + r1(bx - 7) + ',184 ' + r1(bx + 7) + ',184" class="lb-inkf"/>';
      svg.innerHTML = s;
      var kind = p < 3 ? 'erősen savas' : p < 6.5 ? 'gyengén savas' : p <= 7.5 ? 'közel semleges' : p <= 11 ? 'gyengén lúgos' : 'erősen lúgos';
      var f = Math.pow(10, Math.abs(7 - p)), cmp = Math.abs(7 - p) < 0.05 ? 'ugyanannyi, mint a tiszta vízben' :
        (p < 7 ? fmt(f, f < 10 ? 1 : 0) + '-szor több, mint tiszta vízben' : fmt(f, f < 10 ? 1 : 0) + '-szor kevesebb, mint tiszta vízben');
      q(el, 'res').innerHTML = res([['pH', fmt(p, 1)], ['Kémhatás', kind], ['[H⁺] kb.', '10<sup>−' + fmt(p, 1) + '</sup> mol/dm³'], ['H⁺-ionok', cmp]]);
    }
    function noteFor(i) {
      var s = SUBST[i];
      q(el, 'note').innerHTML = i == null ? '<p class="lb-small">Saját pH-érték.</p>' :
        '<div class="lb-sub"><b>' + s[0] + ' ' + esc(s[1]) + '</b><span>Jellemző pH: ' + esc(s[3]) + '</span>' + (s[4] ? '<small>' + esc(s[4]) + '</small>' : '') + '</div>';
    }
    var lock = false;
    bind(ctrl, function (v) {
      pHv = v.ph;
      if (!lock) { cur = null; q(el, 'chips').querySelectorAll('button').forEach(function (b) { b.classList.remove('on'); }); }
      noteFor(cur); draw();
    });
    q(el, 'chips').querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        cur = +b.dataset.i; q(el, 'chips').querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        lock = true; setRange(ctrl, 'ph', SUBST[cur][2]); lock = false;
        pHv = SUBST[cur][2]; noteFor(cur); draw();
      });
    });
    cur = 2; q(el, 'chips').querySelector('[data-i="2"]').classList.add('on'); noteFor(cur); draw();
  });

  /* =====================================================================
   * 8. Gáztörvények
   * ===================================================================== */
  S.addWidget('labor-gaz', function (el) {
    var n = 0.04, R = 8.314, nR = n * R, mode = 'izoterm', st = { T: 300, V: 1, p: nR * 300 / 1 }, parts = [], N = 40;
    for (var i = 0; i < N; i++) { var a = Math.random() * 2 * Math.PI; parts.push({ x: Math.random(), y: Math.random(), vx: Math.cos(a), vy: Math.sin(a) }); }
    var MODES = {
      izoterm: { t: 'állandó hőmérséklet (izoterm)', law: 'Boyle–Mariotte-törvény: p·V = állandó' },
      izobar: { t: 'állandó nyomás (izobár)', law: 'Gay-Lussac I. törvénye: V / T = állandó' },
      izochor: { t: 'állandó térfogat (izochor)', law: 'Gay-Lussac II. törvénye: p / T = állandó' }
    };
    el.innerHTML = head('🎈 Gáztörvények – dugattyús henger', 'A hengerben **0,04 mol ideális gáz** van. Válaszd ki, melyik mennyiség maradjon állandó, és változtasd a többit! A pöttyök a gázrészecskék: a sebességük a hőmérséklettől függ.') +
      '<div class="row lb-mb">' + seg('md', [['izoterm', 'T állandó'], ['izobar', 'p állandó'], ['izochor', 'V állandó']], 'izoterm') + '</div>' +
      '<div class="w-grid"><div class="w-ctrl"><div data-lb="ctrl" class="w-ctrl"></div><div class="lb-small" data-lb="law"></div></div>' +
      '<div class="w-out"><div class="lb-two"><svg class="w-svg" viewBox="0 0 170 240" data-lb="cyl" role="img" aria-label="Dugattyús henger gázrészecskékkel"></svg>' +
      '<svg class="w-svg" viewBox="0 0 320 240" data-lb="gr" role="img" aria-label="Állapotváltozás grafikonja"></svg></div><div data-lb="res"></div><div class="w-formula" data-lb="f"></div></div></div>' +
      learn([
        '**T állandó:** nyomd össze a gázt a felére – a nyomás a kétszeresére nő (p·V nem változik).',
        'Melegítsd a gázt: a részecskék gyorsabban mozognak, gyakrabban és nagyobb lendülettel ütköznek a falnak – ez a nyomás.',
        '**p állandó:** a térfogat egyenesen arányos a **kelvinben** mért hőmérséklettel. A szaggatott egyenes 0 K-nél (−273 °C) érné el a nullát.',
        '**V állandó:** zárt tartályban melegítéskor nő a nyomás. Ezért tilos a spray-palackot tűzbe dobni!',
        'Figyeld a „p·V/T” értéket: bármit csinálsz, állandó marad (= n·R).'
      ], 'A gáz nyomását a részecskék falnak ütközése okozza. A hőmérséklet a részecskék átlagos mozgási energiájával arányos, ezért melegítéskor gyorsabban mozognak.\n\n' +
        '- Kisebb térfogatban ugyanannyi részecske **gyakrabban** ütközik a falnak → nagyobb nyomás (`p·V = állandó`).\n' +
        '- Magasabb hőmérsékleten **erősebben és gyakrabban** ütköznek → zárt tartályban nő a nyomás (`p/T = állandó`), szabadon mozgó dugattyúnál pedig a gáz kitágul (`V/T = állandó`).\n\n' +
        'A három törvény egyetlen egyenletbe foglalható, ez az **egyesített gáztörvény** (állapotegyenlet):\n\n`p·V = n·R·T`, ahol `R = 8,314 J/(mol·K)`\n\n' +
        'Fontos: a képletekben a hőmérsékletet mindig **kelvinben** kell számolni (`T = t + 273,15`). A modell **ideális gázt** feltételez – a valódi gázok nagy nyomáson és alacsony hőmérsékleten eltérnek tőle, és végül cseppfolyósodnak.');
    var ctrl = q(el, 'ctrl'), cyl = q(el, 'cyl'), gr = q(el, 'gr');
    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
    function build() {
      if (mode === 'izobar') {
        st.p = clamp(Math.round(st.p), 80, 250);
        ctrl.innerHTML = rng('T', 'Hőmérséklet (T)', 100, 450, 5, st.T, 'K', 0) + rng('p', 'Nyomás (p) – állandó', 80, 250, 5, st.p, 'kPa', 0);
      } else {
        st.V = clamp(Math.round(st.V * 20) / 20, 0.3, 2.5);
        ctrl.innerHTML = rng('V', mode === 'izochor' ? 'Térfogat (V) – állandó' : 'Térfogat (V)', 0.3, 2.5, 0.05, st.V, 'dm³') +
          rng('T', mode === 'izoterm' ? 'Hőmérséklet (T) – állandó' : 'Hőmérséklet (T)', 100, 450, 5, st.T, 'K', 0);
      }
      q(el, 'law').textContent = MODES[mode].law;
      bind(ctrl, function (v) {
        st.T = v.T;
        if (mode === 'izobar') { st.p = v.p; st.V = nR * st.T / st.p; } else { st.V = v.V; st.p = nR * st.T / st.V; }
        info(); graph();
      });
    }
    function info() {
      q(el, 'res').innerHTML = res([['Nyomás p', fmt(st.p, 1) + ' kPa'], ['Térfogat V', fmt(st.V, 3) + ' dm³'], ['Hőmérséklet T', fmt(st.T, 0) + ' K = ' + fmt(st.T - 273.15, 0) + ' °C'],
        ['p·V', fmt(st.p * st.V, 1) + ' J'], ['p·V / T', fmt(st.p * st.V / st.T, 4) + ' J/K']]);
      q(el, 'f').textContent = 'p·V = n·R·T  →  ' + fmt(st.p, 1) + ' kPa · ' + fmt(st.V, 3) + ' dm³ = 0,04 mol · 8,314 J/(mol·K) · ' + fmt(st.T, 0) + ' K';
    }
    function graph() {
      var X0 = 40, X1 = 310, Y0 = 210, Y1 = 14, s = '', xs, ys, xl, yl, fx, pts = [], i, xv, yv;
      if (mode === 'izoterm') { xs = 2.5; ys = 500; xl = 'V (dm³)'; yl = 'p (kPa)'; xv = st.V; yv = st.p; }
      else if (mode === 'izobar') { xs = 450; ys = 2.5; xl = 'T (K)'; yl = 'V (dm³)'; xv = st.T; yv = st.V; }
      else { xs = 450; ys = 500; xl = 'T (K)'; yl = 'p (kPa)'; xv = st.T; yv = st.p; }
      function gx(x) { return X0 + x / xs * (X1 - X0); }
      function gy(y) { return Y0 - y / ys * (Y0 - Y1); }
      for (i = 0; i <= 5; i++) {
        s += ln(gx(xs * i / 5), Y0, gx(xs * i / 5), Y1, 'class="lb-grid"') + txt(gx(xs * i / 5), Y0 + 13, fmt(xs * i / 5, xs < 10 ? 1 : 0), { a: 'middle', fs: 9 });
        s += ln(X0, gy(ys * i / 5), X1, gy(ys * i / 5), 'class="lb-grid"') + txt(X0 - 4, gy(ys * i / 5) + 3, fmt(ys * i / 5, ys < 10 ? 1 : 0), { a: 'end', fs: 9 });
      }
      s += ln(X0, Y0, X1, Y0, 'class="lb-axis"') + ln(X0, Y0, X0, Y1, 'class="lb-axis"') + txt(X0 - 2, 10, yl, { fs: 10 }) + txt(X1, 236, xl, { a: 'end', fs: 10 });
      if (mode === 'izoterm') {
        [150, 300, 450].forEach(function (T) {
          var pp = []; for (var v = 0.25; v <= 2.5; v += 0.025) { var p = nR * T / v; if (p <= 520) pp.push([gx(v), gy(p)]); }
          s += '<path d="' + path(pp) + '" fill="none" class="lb-grid" stroke-width="1.5"/>' + txt(gx(2.5) - 2, gy(nR * T / 2.5) - 3, T + ' K', { a: 'end', fs: 9 });
        });
        for (var v2 = 0.25; v2 <= 2.5; v2 += 0.02) { var p2 = nR * st.T / v2; if (p2 <= 520) pts.push([gx(v2), gy(p2)]); }
        s += '<path d="' + path(pts) + '" fill="none" stroke="#2f7bf6" stroke-width="2.5"/>';
      } else {
        var kk = mode === 'izobar' ? nR / st.p : nR / st.V; // y = kk·T
        s += ln(gx(0), gy(0), gx(100), gy(kk * 100), 'stroke="#2f7bf6" stroke-width="2" stroke-dasharray="4 4"') + ln(gx(100), gy(kk * 100), gx(450), gy(kk * 450), 'stroke="#2f7bf6" stroke-width="2.5"');
        s += txt(gx(0) + 6, gy(0) - 16, '0 K = −273 °C', { fs: 9, fill: '#e5484d' }) + '<circle cx="' + gx(0) + '" cy="' + gy(0) + '" r="3" fill="#e5484d"/>';
      }
      s += '<circle cx="' + r1(gx(xv)) + '" cy="' + r1(gy(Math.min(yv, ys * 1.04))) + '" r="6" fill="#e5484d" stroke="#fff" stroke-width="1.5"/>';
      gr.innerHTML = s;
    }
    function drawCyl() {
      var X0 = 22, X1 = 112, B = 226, top = B - st.V / 2.5 * 190, w = X1 - X0, h = B - top, s = '';
      var heat = clamp((st.T - 100) / 350, 0, 1);
      s += '<rect x="' + (X0 - 4) + '" y="24" width="' + (w + 8) + '" height="' + (B - 20) + '" rx="4" class="lb-glass"/>';
      s += '<rect x="' + X0 + '" y="' + r1(top) + '" width="' + w + '" height="' + r1(h) + '" fill="rgba(' + Math.round(80 + 170 * heat) + ',' + Math.round(140 - 60 * heat) + ',' + Math.round(255 - 180 * heat) + ',.16)"/>';
      parts.forEach(function (p) { s += '<circle cx="' + r1(X0 + 3 + p.x * (w - 6)) + '" cy="' + r1(top + 3 + p.y * (h - 6)) + '" r="2.6" fill="#2f7bf6"/>'; });
      s += '<rect x="' + X0 + '" y="' + r1(top - 10) + '" width="' + w + '" height="10" class="lb-solid"/><rect x="' + (X0 + w / 2 - 4) + '" y="4" width="8" height="' + r1(top - 14) + '" class="lb-solid"/>';
      // nyomásmérő
      var cx = 142, cy = 70, ang = rad(-120 + clamp(st.p / 500, 0, 1) * 240);
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="22" fill="var(--surface)" class="lb-ink" stroke-width="2"/>' + ln(X1 + 4, cy, cx - 22, cy, 'class="lb-ink" stroke-width="3"') +
        ln(cx, cy, cx + 17 * Math.sin(ang), cy - 17 * Math.cos(ang), 'stroke="#e5484d" stroke-width="2"') + txt(cx, cy + 36, fmt(st.p, 0) + ' kPa', { a: 'middle', fs: 10, cls: 'svg-text' });
      // hőmérő
      var tb = 205, tt = 120, th = tb - (st.T - 100) / 350 * (tb - tt - 8);
      s += '<rect x="136" y="' + tt + '" width="12" height="' + (tb - tt) + '" rx="6" fill="var(--surface)" class="lb-ink" stroke-width="1.5"/><circle cx="142" cy="' + (tb + 4) + '" r="8" fill="#e5484d"/>' +
        '<rect x="139" y="' + r1(th) + '" width="6" height="' + r1(tb - th + 2) + '" fill="#e5484d"/>' + txt(142, 232, fmt(st.T, 0) + ' K', { a: 'middle', fs: 10, cls: 'svg-text' });
      cyl.innerHTML = s;
    }
    onSeg(el, 'md', function (v) { mode = v; build(); });
    build();
    loop(el, function (dt) {
      var sp = 0.9 * Math.sqrt(st.T / 300), w = 90, h = st.V / 2.5 * 190;
      parts.forEach(function (p) {
        p.x += p.vx * sp * dt * 120 / w; p.y += p.vy * sp * dt * 120 / Math.max(h, 10);
        if (p.x < 0) { p.x = -p.x; p.vx = Math.abs(p.vx); } if (p.x > 1) { p.x = 2 - p.x; p.vx = -Math.abs(p.vx); }
        if (p.y < 0) { p.y = -p.y; p.vy = Math.abs(p.vy); } if (p.y > 1) { p.y = 2 - p.y; p.vy = -Math.abs(p.vy); }
        p.x = clamp(p.x, 0, 1); p.y = clamp(p.y, 0, 1);
      });
      drawCyl();
    });
  });

  /* =====================================================================
   * 9. Sűrűség és úszás (Arkhimédész)
   * ===================================================================== */
  var LIQ = [['1000', 'víz (1000 kg/m³)'], ['1025', 'tengervíz (1025 kg/m³)'], ['1240', 'Holt-tenger vize (1240 kg/m³)'], ['920', 'étolaj (920 kg/m³)'], ['1260', 'glicerin (1260 kg/m³)'], ['13546', 'higany (13 546 kg/m³)']];
  var OBJ = [['240', '🍾 parafa (240 kg/m³)'], ['500', '🪵 fenyőfa (500 kg/m³)'], ['900', '🕯️ gyertyaviasz (900 kg/m³)'], ['917', '🧊 jég (917 kg/m³)'], ['1080', '🥚 friss tojás (kb. 1080 kg/m³)'],
    ['1380', '🧱 PVC műanyag (1380 kg/m³)'], ['2700', '🥫 alumínium (2700 kg/m³)'], ['7870', '⚙️ vas (7870 kg/m³)'], ['19300', '🥇 arany (19 300 kg/m³)'], ['egyeni', '✏️ saját sűrűség (csúszkával)']];
  S.addWidget('labor-uszas', function (el) {
    var g = 9.81, rf = 1000, ro = 917, custom = false, P = { V: 1000, rc: 800 }, y = null, target = 0;
    el.innerHTML = head('🚢 Sűrűség és úszás – Arkhimédész törvénye', 'Válassz egy folyadékot és egy kocka alakú testet! Úszik, lebeg vagy elsüllyed? Figyeld az erőnyilakat: **G** a nehézségi erő (súly), **F↑** a felhajtóerő.') +
      '<div class="w-grid"><div class="w-ctrl" data-lb="ctrl">' + sel('liq', 'Folyadék', LIQ, '1000') + sel('obj', 'Test anyaga', OBJ, '917') +
      '<div data-lb="cwrap" hidden>' + rng('rc', 'Saját sűrűség', 100, 2000, 10, 800, 'kg/m³', 0) + '</div>' + rng('V', 'A test térfogata', 100, 2000, 50, 1000, 'cm³', 0) +
      '<button type="button" class="btn primary" data-lb="drop">💧 Beleejtem újra</button><div data-lb="msg"></div></div>' +
      '<div class="w-out"><svg class="w-svg" viewBox="0 0 320 260" data-lb="svg" role="img" aria-label="Folyadékba merülő test erőnyilakkal"></svg><div data-lb="res"></div><div class="w-formula">F<sub>fel</sub> = ρ<sub>folyadék</sub> · V<sub>bemerülő</sub> · g   ·   G = ρ<sub>test</sub> · V · g</div></div></div>' +
      learn([
        'Ha a test sűrűsége **kisebb** a folyadékénál, úszik; ha **nagyobb**, elsüllyed; ha **egyenlő**, lebeg.',
        'Úszó testnél a felhajtóerő pontosan akkora, mint a súly – és a bemerülő rész aránya = ρ_{test} / ρ_{folyadék}.',
        'Jég vízben: kb. 92%-a van a víz alatt – ezért csak a jéghegy csúcsa látszik!',
        'A tojás vízben elsüllyed, a sós Holt-tengerben viszont úszik. Ugyanígy az ember is könnyebben lebeg sós vízben.',
        'Higanyban még a vas is úszik! (Az arany viszont nem.)',
        'Változtasd a térfogatot: az erők nőnek, de az, hogy úszik-e, **csak a sűrűségektől** függ.'
      ], 'A folyadék nyomása a mélységgel nő (`p = ρ·g·h`), ezért a test aljára nagyobb nyomás hat, mint a tetejére. A különbség egy felfelé mutató erő, a **felhajtóerő**. **Arkhimédész törvénye** szerint ez akkora, mint a test által kiszorított folyadék súlya:\n\n`F_fel = ρ_folyadék · V_bemerülő · g`\n\n' +
        'A test súlya `G = ρ_test · V · g`. Ha teljesen bemerülne, a két erőt csak a sűrűségek különböztetik meg – ezért dönti el egyedül a **sűrűségek aránya**, hogy a test úszik vagy elmerül. Az úszó test addig merül, amíg a kiszorított folyadék súlya egyenlő nem lesz a saját súlyával.\n\n' +
        'Az elsüllyedt testre is hat felhajtóerő: ha rugós erőmérőre akasztanánk, **kevesebbet mutatna** a folyadékban, mint a levegőben (látszólagos súlyveszteség). A vasból készült hajó azért úszik, mert a belsejében lévő levegővel együtt az **átlagos sűrűsége** kisebb a vízénél.',
        'A higany mérgező fém – az iskolákban ma már nem használják. Higanyos kísérletet csak itt, a szimulációban próbálj ki!');
    var svg = q(el, 'svg'), ctrl = q(el, 'ctrl');
    var SURF = 92, BOT = 246, TX0 = 40, TX1 = 280, PXCM = 4;
    function rho() { return custom ? P.rc : ro; }
    function geom() {
      var side = Math.cbrt(P.V) * PXCM, r = rho(), sub, state;
      if (Math.abs(r - rf) / rf < 0.005) { state = 'lebeg'; sub = side; }
      else if (r < rf) { state = 'úszik'; sub = side * r / rf; }
      else { state = 'elsüllyed'; sub = side; }
      return { side: side, sub: sub, state: state };
    }
    function targetY() {
      var G = geom();
      if (G.state === 'úszik') return SURF - (G.side - G.sub);
      if (G.state === 'lebeg') return (SURF + BOT) / 2 - G.side / 2;
      return BOT - G.side;
    }
    function draw() {
      var G = geom(), cx = 160, top = y, side = G.side, s = '';
      var subNow = Math.max(0, Math.min(side, top + side - SURF));
      s += '<rect x="' + TX0 + '" y="' + SURF + '" width="' + (TX1 - TX0) + '" height="' + (BOT - SURF) + '" fill="' + (rf > 5000 ? 'rgba(170,175,190,.55)' : rf < 990 ? 'rgba(240,200,60,.35)' : 'rgba(60,140,255,' + (0.22 + (rf - 1000) / 1200).toFixed(2) + ')') + '"/>';
      s += '<path d="M' + TX0 + ' 40 L' + TX0 + ' ' + BOT + ' L' + TX1 + ' ' + BOT + ' L' + TX1 + ' 40" fill="none" class="lb-ink" stroke-width="3"/>';
      var col = ro > 5000 && !custom ? '#9aa1ad' : '#c8874a';
      if (!custom && ro === 917) col = '#bfe6ff';
      if (!custom && ro === 19300) col = '#e8b93a';
      if (!custom && ro === 2700) col = '#c9ced6';
      if (!custom && ro === 1080) col = '#f2e3c6';
      s += '<rect x="' + r1(cx - side / 2) + '" y="' + r1(top) + '" width="' + r1(side) + '" height="' + r1(side) + '" fill="' + col + '" stroke="rgba(0,0,0,.45)" stroke-width="1.5"/>';
      s += ln(TX0, SURF, TX1, SURF, 'stroke="rgba(40,110,220,.9)" stroke-width="2"');
      // erőnyilak (a pillanatnyi helyzethez)
      var W = rho() * P.V * 1e-6 * g, Fb = rf * (subNow / side) * P.V * 1e-6 * g, mx = Math.max(W, rf * P.V * 1e-6 * g), sc = 62 / mx;
      var mid = top + side / 2;
      s += arrow(cx + 12, mid, cx + 12, mid + Math.max(6, W * sc), '#e5484d', 3) + txt(cx + 20, mid + Math.max(6, W * sc) - 2, 'G = ' + fmt(W, 2) + ' N', { fs: 11, fill: '#e5484d' });
      if (Fb > 0.001) s += arrow(cx - 12, mid, cx - 12, mid - Math.max(6, Fb * sc), '#2f9e44', 3) + txt(cx - 20, mid - Math.max(6, Fb * sc) + 8, 'F↑ = ' + fmt(Fb, 2) + ' N', { fs: 11, fill: '#2f9e44', a: 'end' });
      s += txt(TX0 + 6, BOT - 8, LIQ.filter(function (l) { return +l[0] === rf; })[0][1].split(' (')[0], { fs: 11, cls: 'svg-text' });
      svg.innerHTML = s;
    }
    function info() {
      var G = geom(), r = rho(), m = r * P.V * 1e-6, W = m * g, Fb = G.state === 'úszik' ? W : rf * P.V * 1e-6 * g;
      var items = [['Tömeg m', fmt(m, 3) + ' kg'], ['Súly G', fmt(W, 2) + ' N'], ['Felhajtóerő F↑', fmt(Fb, 2) + ' N'], ['Bemerülő rész', fmt(G.sub / G.side * 100, 1) + ' %']];
      if (G.state === 'elsüllyed') items.push(['Erőmérő a folyadékban', fmt(W - Fb, 2) + ' N']);
      q(el, 'res').innerHTML = res(items);
      q(el, 'msg').innerHTML = '<div class="w-msg ' + (G.state === 'elsüllyed' ? 'bad' : G.state === 'lebeg' ? 'warn' : 'ok') + '"><b>A test ' + G.state + '.</b> ρ<sub>test</sub> = ' + fmt(r, 0) + ' kg/m³ ' +
        (G.state === 'úszik' ? '<' : G.state === 'lebeg' ? '≈' : '>') + ' ρ<sub>folyadék</sub> = ' + fmt(rf, 0) + ' kg/m³</div>';
    }
    function update(dropIt) { target = targetY(); if (dropIt || y == null) y = 20; info(); draw(); }
    bind(ctrl, function (v) { P = v; update(false); });
    q(el, 'liq').addEventListener('change', function () { rf = +this.value; update(true); });
    q(el, 'obj').addEventListener('change', function () {
      custom = this.value === 'egyeni'; if (!custom) ro = +this.value;
      q(el, 'cwrap').hidden = !custom; update(true);
    });
    q(el, 'drop').addEventListener('click', function () { update(true); });
    update(true);
    loop(el, function (dt) {
      if (Math.abs(y - target) < 0.2) { if (y !== target) { y = target; draw(); } return; }
      var d = target - y, stp = d * Math.min(1, dt * 3.5) + Math.sign(d) * dt * 10;
      if (Math.abs(stp) >= Math.abs(d)) y = target; else y += stp;
      draw();
    });
  });

  /* =====================================================================
   * 10. Olvadás–forrás görbe
   * ===================================================================== */
  S.addWidget('labor-olvadas', function (el) {
    var CI = 2100, LF = 334000, CW = 4180, LV = 2256000;
    var P = { m: 0.5, P: 1000, T0: -20 }, Q = 0, t = 0, run = false, speed = 60, bubbles = [];
    el.innerHTML = head('🧊 Olvadás és forrás – melegítési görbe', 'Egy edényben jég van, amit egyenletes teljesítményű főzőlappal melegítünk. Indítsd el, és figyeld a hőmérő és a grafikon alakját! (Ideális eset: nincs hőveszteség, normál légnyomás.)') +
      '<div class="row lb-mb">' + seg('sp', [['10', '×10'], ['60', '×60'], ['300', '×300']], '60') + '<span class="lb-small">gyorsítás</span></div>' +
      '<div class="w-grid"><div class="w-ctrl" data-lb="ctrl">' + rng('m', 'Jég tömege (m)', 0.1, 1, 0.05, 0.5, 'kg') + rng('P', 'Főzőlap teljesítménye (P)', 200, 2000, 50, 1000, 'W', 0) + rng('T0', 'Kezdő hőmérséklet', -30, -5, 1, -20, '°C', 0) +
      '<div class="lb-btns"><button type="button" class="btn primary" data-lb="go">▶ Melegítés indítása</button><button type="button" class="btn" data-lb="rst">↺ Újra</button></div></div>' +
      '<div class="w-out"><div class="lb-two"><svg class="w-svg" viewBox="0 0 180 240" data-lb="bk" role="img" aria-label="Melegített edény hőmérővel"></svg>' +
      '<svg class="w-svg" viewBox="0 0 320 240" data-lb="gr" role="img" aria-label="Hőmérséklet–idő grafikon"></svg></div><div data-lb="res"></div><div class="w-formula">Q = c·m·ΔT (melegedés)   ·   Q = L·m (olvadás, forrás)   ·   Q = P·t</div></div></div>' +
      learn([
        'Az olvadás alatt a hőmérséklet **0 °C-on áll**, pedig a főzőlap végig ugyanúgy fűt! Hová lesz az energia?',
        'Melyik szakasz a leghosszabb? A víz elforralásához kb. 6,8-szer annyi hő kell, mint a jég megolvasztásához.',
        'Hasonlítsd össze a jég és a víz melegedésének meredekségét: a víz lassabban melegszik, mert a fajhője kb. kétszer akkora.',
        'Duplázd meg a tömeget: minden szakasz kétszer olyan hosszú lesz. Duplázd meg a teljesítményt: feleannyi idő kell.'
      ], 'Amíg az anyag egyetlen halmazállapotban van, a felvett hő a részecskék mozgását gyorsítja, tehát **nő a hőmérséklet**: `Q = c·m·ΔT`.\n\n' +
        'Olvadáskor és forráskor viszont a hő a részecskék közötti **kötések** (a vízben a hidrogénkötések) felszakítására fordítódik, a részecskék átlagos mozgási energiája nem nő – ezért a hőmérséklet **állandó**, a grafikonon vízszintes szakasz (**plató**) jelenik meg. Ehhez az **olvadáshő**, illetve a **forráshő** kell: `Q = L·m`.\n\n' +
        '- jég fajhője: 2,1 kJ/(kg·°C), víz fajhője: 4,18 kJ/(kg·°C)\n- olvadáshő: 334 kJ/kg, forráshő (100 °C-on): 2256 kJ/kg\n\n' +
        'A forrás azért tart sokkal tovább, mert a gőzzé alakuláskor a részecskéket szinte teljesen el kell szakítani egymástól. A forráspont a légnyomástól függ: magas hegyen alacsonyabb (a Mount Everest csúcsán kb. 70 °C), a kuktában magasabb.',
        'Valódi kísérletnél vigyázz: a forró víz és a gőz súlyos égési sérülést okozhat! Csak felnőtt vagy tanár jelenlétében kísérletezz főzőlappal.');
    var bk = q(el, 'bk'), gr = q(el, 'gr'), ctrl = q(el, 'ctrl');
    function bounds() {
      var q1 = P.m * CI * (0 - P.T0), q2 = q1 + P.m * LF, q3 = q2 + P.m * CW * 100, q4 = q3 + P.m * LV;
      return [q1, q2, q3, q4];
    }
    function state(QQ) {
      var b = bounds();
      if (QQ < b[0]) return { T: P.T0 + QQ / (P.m * CI), ice: 1, liq: 0, ph: 'jég melegszik' };
      if (QQ < b[1]) { var f = (QQ - b[0]) / (P.m * LF); return { T: 0, ice: 1 - f, liq: f, ph: 'olvadás – ' + fmt(f * 100, 0) + '% már víz' }; }
      if (QQ < b[2]) return { T: (QQ - b[1]) / (P.m * CW), ice: 0, liq: 1, ph: 'víz melegszik' };
      if (QQ < b[3]) { var e = (QQ - b[2]) / (P.m * LV); return { T: 100, ice: 0, liq: 1 - e, ph: 'forrás – ' + fmt(e * 100, 0) + '% elpárolgott' }; }
      return { T: 100, ice: 0, liq: 0, ph: 'minden víz elforrt', done: true };
    }
    function drawGraph(stt) {
      var b = bounds(), tt = b[3] / P.P, X0 = 36, X1 = 312, Y0 = 210, Y1 = 14;
      function gx(x) { return X0 + x / (tt * 1.02) * (X1 - X0); }
      function gy(T) { return Y0 - (T + 35) / 150 * (Y0 - Y1); }
      var s = '', step = tt > 3600 ? 900 : tt > 1200 ? 300 : 60, i;
      [-30, 0, 50, 100].forEach(function (T) { s += ln(X0, gy(T), X1, gy(T), 'class="lb-grid"') + txt(X0 - 4, gy(T) + 3, T + '°', { a: 'end', fs: 9 }); });
      for (i = 0; i <= tt; i += step) s += ln(gx(i), Y0, gx(i), Y1, 'class="lb-grid"') + (i / step % 2 === 0 || tt / step < 8 ? txt(gx(i), Y0 + 13, Math.round(i / 60) + ' perc', { a: 'middle', fs: 8 }) : '');
      s += ln(X0, Y0, X1, Y0, 'class="lb-axis"') + ln(X0, Y0, X0, Y1, 'class="lb-axis"') + txt(X0 - 2, 10, 'T (°C)', { fs: 10 }) + txt(X1, 236, 'idő', { a: 'end', fs: 10 });
      var full = [[0, P.T0], [b[0] / P.P, 0], [b[1] / P.P, 0], [b[2] / P.P, 100], [b[3] / P.P, 100]];
      s += '<path d="' + path(full.map(function (p) { return [gx(p[0]), gy(p[1])]; })) + '" fill="none" class="lb-grid" stroke-width="2" stroke-dasharray="4 4"/>';
      var done = full.filter(function (p) { return p[0] <= t; }).concat([[Math.min(t, b[3] / P.P), stt.T]]);
      s += '<path d="' + path(done.map(function (p) { return [gx(p[0]), gy(p[1])]; })) + '" fill="none" stroke="#e5484d" stroke-width="2.5"/>';
      s += txt((gx(full[1][0]) + gx(full[2][0])) / 2, gy(0) - 5, 'olvadás', { a: 'middle', fs: 9, cls: 'svg-text' }) + txt((gx(full[3][0]) + gx(full[4][0])) / 2, gy(100) - 5, 'forrás', { a: 'middle', fs: 9, cls: 'svg-text' });
      s += '<circle cx="' + r1(gx(Math.min(t, b[3] / P.P))) + '" cy="' + r1(gy(stt.T)) + '" r="5" fill="#e5484d" stroke="#fff" stroke-width="1.5"/>';
      gr.innerHTML = s;
    }
    function drawBeaker(stt) {
      var s = '', X0 = 22, X1 = 118, B = 196, H = 120;
      s += '<rect x="12" y="200" width="116" height="12" rx="3" fill="' + (run && !stt.done ? '#ff6b35' : '#8a94ab') + '"/><rect x="18" y="212" width="104" height="14" rx="2" class="lb-solid"/>';
      var wl = stt.liq * 60 * (P.m / 0.5) * 0.9 + (stt.ice > 0 ? 6 : 0);
      wl = Math.min(H - 10, wl);
      if (stt.liq > 0) s += '<rect x="' + (X0 + 2) + '" y="' + r1(B - wl) + '" width="' + (X1 - X0 - 4) + '" height="' + r1(wl) + '" fill="rgba(60,140,255,.35)"/>';
      if (stt.ice > 0) {
        var nc = Math.max(1, Math.round(6 * P.m / 0.5)), sz = 9 + 11 * Math.sqrt(stt.ice);
        for (var i = 0; i < Math.min(nc, 12); i++) {
          var cx = X0 + 14 + (i % 4) * 22, cy = B - 4 - sz - Math.floor(i / 4) * (sz + 2) - (stt.liq > 0.3 ? 4 : 0);
          s += '<rect x="' + r1(cx) + '" y="' + r1(cy) + '" width="' + r1(sz) + '" height="' + r1(sz) + '" rx="3" fill="rgba(210,240,255,.95)" stroke="rgba(90,160,220,.9)"/>';
        }
      }
      bubbles.forEach(function (b) { s += '<circle cx="' + r1(b.x) + '" cy="' + r1(b.y) + '" r="' + r1(b.r) + '" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="1.2"/>'; });
      if (stt.T >= 100 && stt.liq > 0 && run) s += '<path d="M50 ' + (B - wl - 10) + ' q6 -10 0 -20 q-6 -10 0 -20 M80 ' + (B - wl - 14) + ' q6 -10 0 -20 q-6 -10 0 -20" fill="none" stroke="rgba(160,170,190,.7)" stroke-width="3" stroke-linecap="round"/>';
      s += '<path d="M' + X0 + ' ' + (B - H) + ' L' + X0 + ' ' + B + ' L' + X1 + ' ' + B + ' L' + X1 + ' ' + (B - H) + '" fill="none" class="lb-ink" stroke-width="2.5"/>';
      // hőmérő
      var tb = 188, ttp = 16, ty = tb - (stt.T + 35) / 150 * (tb - ttp - 6);
      s += '<rect x="140" y="' + ttp + '" width="12" height="' + (tb - ttp) + '" rx="6" fill="var(--surface)" class="lb-ink" stroke-width="1.5"/><circle cx="146" cy="' + (tb + 5) + '" r="8" fill="#e5484d"/>' +
        '<rect x="143" y="' + r1(ty) + '" width="6" height="' + r1(tb - ty + 2) + '" fill="#e5484d"/>';
      [0, 100].forEach(function (T) { var yy = tb - (T + 35) / 150 * (tb - ttp - 6); s += ln(152, yy, 158, yy, 'class="lb-ink" stroke-width="1"') + txt(166, yy + 3, String(T), { a: 'middle', fs: 8 }); });
      s += txt(146, 232, fmt(stt.T, 1) + ' °C', { a: 'middle', fs: 11, cls: 'svg-text', w: 700 });
      bk.innerHTML = s;
    }
    function info(stt) {
      q(el, 'res').innerHTML = res([['Eltelt idő', mmss(t)], ['Hőmérséklet', fmt(stt.T, 1) + ' °C'], ['Állapot', stt.ph], ['Bevitt hő Q = P·t', fmt(Q / 1000, 0) + ' kJ']]);
    }
    function paint() { var stt = state(Q); drawBeaker(stt); drawGraph(stt); info(stt); return stt; }
    function reset() { Q = 0; t = 0; run = false; bubbles = []; q(el, 'go').textContent = '▶ Melegítés indítása'; paint(); }
    bind(ctrl, function (v) { P = v; reset(); });
    onSeg(el, 'sp', function (v) { speed = +v; });
    q(el, 'go').addEventListener('click', function () {
      if (state(Q).done) reset();
      run = !run; this.textContent = run ? '⏸ Szünet' : '▶ Folytatás';
    });
    q(el, 'rst').addEventListener('click', reset);
    var acc = 0;
    loop(el, function (dt) {
      if (!run || dt === 0) return;
      var b = bounds(), sdt = dt * speed;
      t = Math.min(t + sdt, b[3] / P.P); Q = P.P * t;
      var stt = state(Q);
      if (stt.done) { run = false; q(el, 'go').textContent = '↺ Kezdjük újra'; }
      if (stt.T >= 100 && stt.liq > 0 && Math.random() < 0.6) bubbles.push({ x: 30 + Math.random() * 80, y: 192, r: 1.5 + Math.random() * 2.5 });
      var wl = Math.min(110, stt.liq * 60 * (P.m / 0.5) * 0.9);
      bubbles = bubbles.filter(function (bb) { bb.y -= dt * 60; return bb.y > 196 - wl; });
      acc += dt;
      if (acc > 0.04 || stt.done) { acc = 0; paint(); }
    });
  });

  /* =====================================================================
   * Áttekintő oldal: #/labor  és  #/labor/<kiserlet>
   * ===================================================================== */
  var GROUPS = [['meh', '⚙️ Mechanika és rezgések', 'fiz'], ['opt', '🌈 Fény és hullámok', 'fiz'], ['ho', '🔥 Hőtan és gázok', 'fiz'], ['elek', '⚡ Elektromosság', 'fiz'], ['kem', '⚗️ Kémia', 'kem']];
  /* [id, ikon, cím, leírás, csoport, widget típusa vagy null, külső link] */
  var EXP = [
    ['inga', '🕰️', 'Fonalinga', 'Mérd meg stopperrel a lengésidőt a Földön, a Holdon és a Jupiteren!', 'meh', 'labor-inga'],
    ['rugo', '🌀', 'Rugós rezgés', 'Rugóállandó, tömeg, csillapítás – élő kitérés–idő grafikonnal.', 'meh', 'labor-rugo'],
    ['uszas', '🚢', 'Sűrűség és úszás', 'Arkhimédész törvénye: mi úszik, mi süllyed el, és miért?', 'meh', 'labor-uszas'],
    ['hajitas', '🚀', 'Ferde hajítás', 'Lőj ki egy labdát különböző szögekben és bolygókon!', 'meh', 'hajitas'],
    ['setup', '🏁', 'Versenyautó setup-szimulátor', 'Légy versenymérnök: rugók, szárnyak, gumik – és a köridő.', 'meh', null, '#/setup'],
    ['fenytores', '🔦', 'Fénytörés és teljes visszaverődés', 'Snellius–Descartes-törvény, határszög, optikai kábel.', 'opt', 'labor-fenytores'],
    ['lencse', '🔍', 'Gyűjtőlencse képalkotása', 'Sugármenet, valódi és látszólagos kép, leképezési törvény.', 'opt', 'labor-lencse'],
    ['interferencia', '🌊', 'Hullámok interferenciája', 'Két forrás, erősítés és kioltás a vízkádban.', 'opt', 'labor-interferencia'],
    ['szinkever', '🎨', 'Színkeverés', 'Fény (RGB) és festék (CMY) – összeadó és kivonó színkeverés.', 'opt', 'szinkever'],
    ['gaz', '🎈', 'Gáztörvények', 'Dugattyús henger: nyomás, térfogat, hőmérséklet.', 'ho', 'labor-gaz'],
    ['olvadas', '🧊', 'Olvadás és forrás', 'Melegítési görbe: miért áll meg a hőmérséklet 0 és 100 °C-on?', 'ho', 'labor-olvadas'],
    ['aramkor', '🔌', 'Áramkör-labor', 'Építs saját áramkört elemekből, izzókból és kapcsolókból!', 'elek', null, '#/aramkor', 'aramkor'],
    ['ohm', '💡', 'Ohm törvénye', 'Feszültség, ellenállás, áram – és egy izzó, ami fényesedik.', 'elek', 'ohm'],
    ['soros-parhuzamos', '🔀', 'Soros és párhuzamos kapcsolás', 'Hogyan oszlik meg a feszültség és az áram?', 'elek', 'soros-parhuzamos'],
    ['titralas', '⚗️', 'Titrálás', 'Sósav + nátronlúg: pH-görbe és indikátorok színváltása.', 'kem', 'labor-titralas'],
    ['ph', '🌈', 'pH-skála és indikátorok', 'Háztartási anyagok kémhatása, vöröskáposzta-indikátor.', 'kem', 'labor-ph'],
    ['atomepito', '⚛️', 'Atomépítő', 'Protonok, neutronok, elektronok – építs atomot és iont!', 'kem', 'atomepito'],
    ['periodusos', '🧮', 'Periódusos rendszer', 'Az első 36 elem tulajdonságai és egy kereső játék.', 'kem', 'periodusos']
  ];
  function available(e) {
    if (e[6]) return !e[7] || !!(S.routes && S.routes[e[7]]);
    return !!S.widgets[e[5]];
  }
  function href(e) { return e[6] || '#/labor/' + e[0]; }
  function seen() { return S.store.get('labor.seen', {}) || {}; }

  function hub(main) {
    var list = EXP.filter(available), sn = seen(), flt = S.store.get('labor.filter', 'all');
    var own = list.filter(function (e) { return /^labor-/.test(e[5] || ''); }).length;
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Virtuális labor</span></nav>' +
      '<section class="lb-hero"><h1>🧪 Virtuális labor</h1><p class="lead">Kísérletezz biztonságosan! Ingák, rugók, lézerek, lencsék, hullámok, gázok és kémcsövek – csúszkákkal, élő mérésekkel és magyarázattal. ' +
      'Minden kísérletnél megtalálod, <b>mit figyelj meg</b>, és azt is, <b>miért</b> történik.</p>' +
      '<div class="lb-stats"><span>🔬 ' + list.length + ' kísérlet</span><span>✓ ' + list.filter(function (e) { return sn[e[0]]; }).length + ' kipróbálva</span></div></section>' +
      '<div class="row lb-filter">' + seg('lbf', [['all', 'Mind'], ['fiz', '🔭 Fizika'], ['kem', '⚗️ Kémia']], flt) + '</div>' +
      '<div data-lb="groups"></div>' +
      '<div class="lb-safe lb-safe-hub">⚠️ A virtuális laborban semmi sem robban fel és semmi sem maró. <b>Valódi kémiai kísérletet csak iskolai laborban, tanári felügyelettel</b> végezz, védőszemüvegben!</div>';
    function render() {
      q(main, 'groups').innerHTML = GROUPS.filter(function (g) { return flt === 'all' || g[2] === flt; }).map(function (g) {
        var items = list.filter(function (e) { return e[4] === g[0]; });
        if (!items.length) return '';
        return '<section class="lb-group"><h2>' + esc(g[1]) + '</h2><div class="lb-cards">' + items.map(function (e) {
          return '<a class="card lb-card" href="' + esc(href(e)) + '"><span class="lb-ico" aria-hidden="true">' + e[1] + '</span><b>' + esc(e[2]) + '</b><small>' + esc(e[3]) + '</small>' +
            (e[6] ? '<span class="lb-tag">külön oldal ↗</span>' : '') + (sn[e[0]] ? '<span class="lb-seen" title="Már kipróbáltad">✓</span>' : '') + '</a>';
        }).join('') + '</div></section>';
      }).join('');
    }
    onSeg(main, 'lbf', function (v) { flt = v; S.store.set('labor.filter', v); render(); });
    render();
    return true;
  }

  function expPage(main, id) {
    var list = EXP.filter(function (e) { return available(e) && !e[6]; });
    var idx = -1;
    list.forEach(function (e, i) { if (e[0] === id) idx = i; });
    if (idx < 0) return false;
    var e = list[idx], prev = list[(idx - 1 + list.length) % list.length], next = list[(idx + 1) % list.length];
    var sn = seen(); sn[e[0]] = 1; S.store.set('labor.seen', sn);
    document.title = e[2] + ' – Virtuális labor – Tudásműhely';
    var grp = GROUPS.filter(function (g) { return g[0] === e[4]; })[0];
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/labor">Virtuális labor</a><span>›</span><span>' + esc(e[2]) + '</span></nav>' +
      '<h1>' + e[1] + ' ' + esc(e[2]) + '</h1><p class="lead">' + esc(e[3]) + ' <span class="lb-tag">' + esc(grp ? grp[1] : '') + '</span></p>' +
      '<div class="widget card" data-lb="host"></div>' +
      '<nav class="lb-nav"><a class="btn" href="#/labor/' + esc(prev[0]) + '">← ' + esc(prev[2]) + '</a><a class="btn" href="#/labor">🧪 Összes kísérlet</a><a class="btn primary" href="#/labor/' + esc(next[0]) + '">' + esc(next[2]) + ' →</a></nav>';
    var host = q(main, 'host');
    try { S.widgets[e[5]](host, {}); }
    catch (err) { host.innerHTML = '<p class="muted">Hiba a kísérlet betöltésekor.</p>'; if (window.console) console.error(err); }
    return true;
  }

  S.addRoute('labor', {
    title: 'Virtuális labor', nav: '',
    page: function (main, rest) {
      if (!rest || !rest.length || !rest[0]) return hub(main);
      return expPage(main, rest[0]);
    }
  });
})();
