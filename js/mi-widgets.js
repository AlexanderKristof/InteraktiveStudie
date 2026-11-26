/* Tudásműhely – mesterséges intelligencia interaktív elemek (offline, canvas + SVG).
 * Leckében:  widget: { type: 'mi-tanito' }       – „Tanítsd a gépet!”: pontok két színben, élőben tanuló modell
 *            widget: { type: 'mi-halo' }         – neurális háló játszótér (rétegek, neuronok, színezett súlyok)
 *            widget: { type: 'mi-kovetkezo-szo' } – bigram-modell egy kis magyar szövegen, hőmérséklettel
 *            widget: { type: 'mi-valodi-kviz' }  – „Valódi vagy MI?” felismerési kvíz
 * Minden számítás a böngészőben történik, internet nélkül. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var BLUE = '#2f7bf6', ORANGE = '#f08c2e';

  function head(t, h) { return '<div class="w-title">' + esc(t) + '</div>' + (h ? '<p class="w-help">' + S.inline(h) + '</p>' : ''); }
  function hu(n, d) { return S.fmt(n, d == null ? 2 : d); }

  /* Determinisztikus véletlen (hogy a példaadatok mindig ugyanúgy nézzenek ki). */
  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function gauss(r) { var u = r() || 1e-9, v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

  /* ---------- kis neurális háló: tanh rejtett rétegek, szigmoid kimenet, kereszt-entrópia, momentum ---------- */
  function Net(sizes, seed) {
    var r = rng(seed || 7), L = [];
    for (var l = 0; l < sizes.length - 1; l++) {
      var nin = sizes[l], nout = sizes[l + 1], lim = Math.sqrt(6 / (nin + nout)), W = [], vW = [];
      for (var j = 0; j < nout; j++) {
        var row = [], vr = [];
        for (var k = 0; k < nin; k++) { row.push((r() * 2 - 1) * lim); vr.push(0); }
        W.push(row); vW.push(vr);
      }
      var b = [], vb = [];
      for (j = 0; j < nout; j++) { b.push(0); vb.push(0); }
      L.push({ W: W, b: b, vW: vW, vb: vb });
    }
    this.sizes = sizes; this.L = L;
  }
  Net.prototype.forward = function (x) {
    var acts = [x], a = x, L = this.L;
    for (var l = 0; l < L.length; l++) {
      var W = L[l].W, b = L[l].b, out = [], last = l === L.length - 1;
      for (var j = 0; j < W.length; j++) {
        var z = b[j], row = W[j];
        for (var k = 0; k < row.length; k++) z += row[k] * a[k];
        out.push(last ? 1 / (1 + Math.exp(-z)) : Math.tanh(z));
      }
      acts.push(out); a = out;
    }
    return acts;
  };
  Net.prototype.predict = function (x) { var a = this.forward(x); return a[a.length - 1][0]; };
  /* Egy teljes tanítási kör (minden adatpont egyszer), a hiba átlagát adja vissza. */
  Net.prototype.step = function (data, lr, feat) {
    var L = this.L, n = data.length, loss = 0, l, j, k;
    if (!n) return 0;
    var gW = L.map(function (ly) { return ly.W.map(function (row) { return row.map(function () { return 0; }); }); });
    var gb = L.map(function (ly) { return ly.b.map(function () { return 0; }); });
    for (var i = 0; i < n; i++) {
      var d = data[i], acts = this.forward(feat(d.x, d.y)), p = acts[acts.length - 1][0], y = d.c;
      loss += -(y * Math.log(Math.max(p, 1e-9)) + (1 - y) * Math.log(Math.max(1 - p, 1e-9)));
      var delta = [p - y];
      for (l = L.length - 1; l >= 0; l--) {
        var a = acts[l], W = L[l].W, prev = l > 0 ? a.map(function () { return 0; }) : null;
        for (j = 0; j < W.length; j++) {
          gb[l][j] += delta[j];
          for (k = 0; k < a.length; k++) { gW[l][j][k] += delta[j] * a[k]; if (prev) prev[k] += W[j][k] * delta[j]; }
        }
        if (prev) delta = prev.map(function (v, kk) { return v * (1 - a[kk] * a[kk]); });
      }
    }
    var mu = 0.85;
    for (l = 0; l < L.length; l++) {
      for (j = 0; j < L[l].W.length; j++) {
        for (k = 0; k < L[l].W[j].length; k++) { L[l].vW[j][k] = mu * L[l].vW[j][k] - lr * gW[l][j][k] / n; L[l].W[j][k] += L[l].vW[j][k]; }
        L[l].vb[j] = mu * L[l].vb[j] - lr * gb[l][j] / n; L[l].b[j] += L[l].vb[j];
      }
    }
    return loss / n;
  };

  /* ---------- rajzolás: valószínűségi „térkép” + döntési határ (marching squares) + pontok ---------- */
  function setupCanvas(cv) {
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(400 * dpr); cv.height = Math.round(400 * dpr);
    return cv.getContext('2d');
  }
  function mix(p) {
    /* p = a narancs osztály valószínűsége */
    var c1 = [47, 123, 246], c2 = [240, 140, 46], t = p;
    return [Math.round(c1[0] + (c2[0] - c1[0]) * t), Math.round(c1[1] + (c2[1] - c1[1]) * t), Math.round(c1[2] + (c2[2] - c1[2]) * t)];
  }
  function draw(ctx, net, feat, data, opts) {
    var W = ctx.canvas.width, H = ctx.canvas.height, G = 40, i, j, cw = W / G, ch = H / G;
    ctx.clearRect(0, 0, W, H);
    var vals = [];
    for (j = 0; j <= G; j++) { var row = []; for (i = 0; i <= G; i++) { var x = i / G * 2 - 1, y = 1 - j / G * 2; row.push(net ? net.predict(feat(x, y)) : 0.5); } vals.push(row); }
    if (net) {
      for (j = 0; j < G; j++) for (i = 0; i < G; i++) {
        var p = (vals[j][i] + vals[j][i + 1] + vals[j + 1][i] + vals[j + 1][i + 1]) / 4, c = mix(p), al = 0.12 + Math.abs(p - 0.5) * 0.6;
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + al.toFixed(3) + ')';
        var x0 = Math.round(i * cw), y0 = Math.round(j * ch);
        ctx.fillRect(x0, y0, Math.round((i + 1) * cw) - x0, Math.round((j + 1) * ch) - y0);
      }
      /* döntési határ: ahol p = 0,5 */
      ctx.strokeStyle = opts.line || '#334'; ctx.lineWidth = 2.5 * W / 400; ctx.beginPath();
      for (j = 0; j < G; j++) for (i = 0; i < G; i++) {
        var v = [vals[j][i] - 0.5, vals[j][i + 1] - 0.5, vals[j + 1][i + 1] - 0.5, vals[j + 1][i] - 0.5];
        var P = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]], pts = [];
        for (var e = 0; e < 4; e++) {
          var a = v[e], b = v[(e + 1) % 4];
          if ((a < 0) !== (b < 0)) { var t = a / (a - b), A = P[e], B = P[(e + 1) % 4]; pts.push([(A[0] + (B[0] - A[0]) * t) * cw, (A[1] + (B[1] - A[1]) * t) * ch]); }
        }
        for (var q = 0; q + 1 < pts.length; q += 2) { ctx.moveTo(pts[q][0], pts[q][1]); ctx.lineTo(pts[q + 1][0], pts[q + 1][1]); }
      }
      ctx.stroke();
    }
    /* tengelyek halványan */
    ctx.strokeStyle = 'rgba(128,128,128,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    var r = 6 * W / 400;
    data.forEach(function (d) {
      var px = (d.x + 1) / 2 * W, py = (1 - d.y) / 2 * H;
      var ok = !net || ((net.predict(feat(d.x, d.y)) > 0.5 ? 1 : 0) === d.c);
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = d.c ? ORANGE : BLUE; ctx.fill();
      ctx.lineWidth = (ok ? 1.5 : 3) * W / 400; ctx.strokeStyle = ok ? '#fff' : '#d11'; ctx.stroke();
    });
  }
  function accuracy(net, feat, data) {
    if (!data.length) return 0;
    var ok = 0; data.forEach(function (d) { if ((net.predict(feat(d.x, d.y)) > 0.5 ? 1 : 0) === d.c) ok++; });
    return ok / data.length;
  }
  function lineColor() { var dark = document.documentElement.getAttribute('data-theme') === 'dark' || (document.documentElement.getAttribute('data-theme') !== 'light' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches); return dark ? '#f4f6fb' : '#1b2436'; }

  /* ---------- példaadatok ---------- */
  function dataset(kind, n, seed) {
    var r = rng(seed || 11), out = [], i;
    for (i = 0; i < n; i++) {
      var x, y, c;
      if (kind === 'foltok') { c = i % 2; x = (c ? 0.45 : -0.45) + gauss(r) * 0.2; y = (c ? 0.35 : -0.35) + gauss(r) * 0.2; }
      else if (kind === 'kor') { x = r() * 2 - 1; y = r() * 2 - 1; var d = Math.sqrt(x * x + y * y); if (Math.abs(d - 0.55) < 0.08) { i--; continue; } c = d < 0.55 ? 0 : 1; }
      else if (kind === 'xor') { x = r() * 2 - 1; y = r() * 2 - 1; if (Math.abs(x) < 0.08 || Math.abs(y) < 0.08) { i--; continue; } c = (x > 0) === (y > 0) ? 0 : 1; }
      else { /* spirál */ c = i % 2; var t = (Math.floor(i / 2) / (n / 2)) * 1.6 * Math.PI + 0.3, rr = 0.12 + t / (1.6 * Math.PI + 0.3) * 0.78, ang = t + c * Math.PI; x = rr * Math.cos(ang) + gauss(r) * 0.03; y = rr * Math.sin(ang) + gauss(r) * 0.03; }
      out.push({ x: Math.max(-0.97, Math.min(0.97, x)), y: Math.max(-0.97, Math.min(0.97, y)), c: c });
    }
    return out;
  }
  function xy(x, y) { return [x, y]; }

  /* Animációs ciklus, ami leáll, ha a widget eltűnik az oldalról. */
  function animator(el, frame) {
    var on = false;
    function tick() { if (!on) return; if (!document.body.contains(el)) { on = false; return; } frame(); requestAnimationFrame(tick); }
    return { start: function () { if (!on) { on = true; requestAnimationFrame(tick); } }, stop: function () { on = false; }, get on() { return on; } };
  }

  /* =====================================================================
   * 1. „Tanítsd a gépet!”
   * ===================================================================== */
  S.addWidget('mi-tanito', function (el, o) {
    var color = 0, model = 'egyenes', data = dataset('foltok', 24, 5), net, epoch = 0, loss = 0, lr = 0.5;
    el.innerHTML = head(o.title || 'Tanítsd a gépet!', o.help || 'Kattints a táblára, és rakj le pontokat két színben: ez a **tanítóadat**, a szín a **címke**. Indítsd el a tanítást, és figyeld, hogyan húzza meg a gép lépésről lépésre a **határt** a két csoport között. A piros keretes pontokat még rossz oldalra sorolja. Egy meglévő pontra kattintva törölheted.') +
      '<div class="miw-wrap"><div class="miw-board"><canvas class="miw-cv" aria-label="Tanítótábla: kattints pontok lerakásához"></canvas></div><div class="miw-side">' +
      '<div class="miw-lbl">Milyen színű pontot raksz le?</div><div class="seg" data-g="col"><button type="button" data-v="0" class="on">🔵 Kék</button><button type="button" data-v="1">🟠 Narancs</button></div>' +
      '<div class="miw-lbl">Milyen „agya” legyen a gépnek?</div><div class="seg" data-g="model"><button type="button" data-v="egyenes" class="on">Csak egyenes vonal</button><button type="button" data-v="halo">Kis háló (8 neuron)</button></div>' +
      '<div class="miw-lbl">Kész példák</div><div class="seg" data-g="ex"><button type="button" data-v="foltok">Két csoport</button><button type="button" data-v="kor">Kör</button><button type="button" data-v="xor">Sakktábla</button></div>' +
      '<label class="miw-rng"><span>Tanulási lépésköz: <b class="miw-lr">0,5</b></span><input type="range" min="0" max="4" step="1" value="2" class="miw-lrr"></label>' +
      '<div class="miw-btns"><button type="button" class="btn primary miw-go">▶ Tanítás</button><button type="button" class="btn miw-one">1 lépés</button><button type="button" class="btn miw-reset">↺ Elfelejt</button><button type="button" class="btn miw-clear">🗑 Tábla törlése</button></div>' +
      '<div class="w-res miw-stats"></div><div class="miw-msg"></div></div></div>';
    var cv = el.querySelector('canvas'), ctx = setupCanvas(cv), LRS = [0.05, 0.2, 0.5, 1.5, 4];
    function fresh() { net = new Net(model === 'egyenes' ? [2, 1] : [2, 8, 1], 3 + data.length); epoch = 0; loss = 0; }
    function paint() {
      draw(ctx, epoch ? net : null, xy, data, { line: lineColor() });
      var acc = epoch ? accuracy(net, xy, data) : 0, n0 = data.filter(function (d) { return !d.c; }).length;
      el.querySelector('.miw-stats').innerHTML = '<div><small>Tanítási kör</small><b>' + epoch + '</b></div><div><small>Hiba (minél kisebb, annál jobb)</small><b>' + (epoch ? hu(loss, 3) : '–') + '</b></div><div><small>Jól besorolt pont</small><b>' + (epoch ? Math.round(acc * 100) + '%' : '–') + '</b></div>';
      var msg = '';
      if (n0 === 0 || n0 === data.length) msg = '<div class="w-msg warn">Mindkét színből kell legalább egy pont, különben nincs mit megkülönböztetni.</div>';
      else if (epoch > 300 && acc < 0.9 && model === 'egyenes') msg = '<div class="w-msg warn">Egyetlen egyenes vonallal ezt nem lehet szétválasztani! Próbáld ki a <b>kis hálót</b>.</div>';
      else if (epoch && acc === 1) msg = '<div class="w-msg ok">Minden pontot jól sorol be. De vigyázz: attól, hogy a tanítópontokon hibátlan, egy <b>új</b> pontnál még tévedhet!</div>';
      el.querySelector('.miw-msg').innerHTML = msg;
    }
    var anim = animator(el, function () {
      for (var i = 0; i < 4; i++) { loss = net.step(data, lr, xy); epoch++; }
      paint();
      if (epoch >= 3000) stop();
    });
    function stop() { anim.stop(); el.querySelector('.miw-go').textContent = '▶ Tanítás'; }
    function start() { if (!data.length) return; anim.start(); el.querySelector('.miw-go').textContent = '⏸ Megállít'; }
    function segBind(g, cb) {
      var box = el.querySelector('[data-g="' + g + '"]');
      box.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        box.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); cb(b.dataset.v);
      });
    }
    segBind('col', function (v) { color = +v; });
    segBind('model', function (v) { model = v; fresh(); paint(); });
    segBind('ex', function (v) { data = dataset(v, v === 'foltok' ? 24 : 60, 5); fresh(); paint(); });
    el.querySelector('.miw-lrr').addEventListener('input', function () { lr = LRS[+this.value]; el.querySelector('.miw-lr').textContent = hu(lr); });
    el.querySelector('.miw-go').addEventListener('click', function () { if (anim.on) stop(); else start(); });
    el.querySelector('.miw-one').addEventListener('click', function () { stop(); if (data.length) { loss = net.step(data, lr, xy); epoch++; } paint(); });
    el.querySelector('.miw-reset').addEventListener('click', function () { stop(); fresh(); paint(); });
    el.querySelector('.miw-clear').addEventListener('click', function () { stop(); data = []; fresh(); paint(); });
    cv.addEventListener('click', function (e) {
      var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 2 - 1, y = 1 - (e.clientY - r.top) / r.height * 2;
      var hit = -1;
      data.forEach(function (d, i) { if (Math.abs(d.x - x) < 0.05 && Math.abs(d.y - y) < 0.05) hit = i; });
      if (hit >= 0) data.splice(hit, 1); else data.push({ x: x, y: y, c: color });
      if (!anim.on) paint();
    });
    fresh(); paint();
  });

  /* =====================================================================
   * 2. Neurális háló játszótér
   * ===================================================================== */
  S.addWidget('mi-halo', function (el, o) {
    var kind = o.data || 'xor', layers = 1, neurons = 4, lr = 0.3, extra = false, data, net, epoch = 0, loss = 0;
    el.innerHTML = head(o.title || 'Neurális háló játszótér', o.help || 'Állítsd be, hány **rejtett réteg** és rétegenként hány **neuron** legyen, aztán indítsd a tanítást. A vonalak a **súlyok**: 🔵 kék = erősít, 🟠 narancs = gyengít, a vastagság az erősség. A színes táblán látod, hogyan osztja fel a háló a síkot.') +
      '<div class="miw-ctrl">' +
      '<div><div class="miw-lbl">Adat</div><div class="seg" data-g="d"><button type="button" data-v="xor">Sakktábla (XOR)</button><button type="button" data-v="kor">Kör</button><button type="button" data-v="foltok">Két folt</button><button type="button" data-v="spiral">Spirál</button></div></div>' +
      '<div class="miw-step"><span class="miw-lbl">Rejtett rétegek</span><button type="button" class="btn sm" data-a="l-">−</button><b class="miw-nl"></b><button type="button" class="btn sm" data-a="l+">+</button></div>' +
      '<div class="miw-step"><span class="miw-lbl">Neuron / réteg</span><button type="button" class="btn sm" data-a="n-">−</button><b class="miw-nn"></b><button type="button" class="btn sm" data-a="n+">+</button></div>' +
      '<div><div class="miw-lbl">Lépésköz</div><div class="seg" data-g="lr"><button type="button" data-v="0.03">0,03</button><button type="button" data-v="0.3" class="on">0,3</button><button type="button" data-v="1">1</button><button type="button" data-v="3">3</button></div></div>' +
      '<label class="miw-chk"><input type="checkbox" class="miw-ex"><span>Adjuk meg a gépnek a <b>távolságot</b> is (x², y²)</span></label>' +
      '</div>' +
      '<div class="miw-wrap"><div class="miw-netbox"><svg class="w-svg miw-net" viewBox="0 0 420 260" role="img" aria-label="A neurális háló rajza"></svg></div>' +
      '<div class="miw-board"><canvas class="miw-cv" aria-label="A háló döntése a síkon"></canvas></div></div>' +
      '<div class="miw-btns"><button type="button" class="btn primary miw-go">▶ Tanítás</button><button type="button" class="btn miw-reset">↺ Új véletlen súlyok</button></div>' +
      '<div class="w-res miw-stats"></div><div class="miw-msg"></div>';
    var cv = el.querySelector('canvas'), ctx = setupCanvas(cv), svg = el.querySelector('.miw-net'), seed = 1;
    function feat(x, y) { return extra ? [x, y, x * x, y * y] : [x, y]; }
    function sizes() { var s = [extra ? 4 : 2]; for (var i = 0; i < layers; i++) s.push(neurons); s.push(1); return s; }
    function build() { data = dataset(kind, 200, 21); net = new Net(sizes(), seed); epoch = 0; loss = 0; el.querySelector('.miw-nl').textContent = layers; el.querySelector('.miw-nn').textContent = neurons; drawNet(); paint(); }
    function drawNet() {
      var sz = sizes(), cols = sz.length, X = function (l) { return 40 + l * (340 / (cols - 1)); };
      var Y = function (l, j) { var n = sz[l], gap = Math.min(30, 220 / Math.max(1, n)); return 130 + (j - (n - 1) / 2) * gap; };
      var maxw = 0.001, s = '', l, j, k;
      net.L.forEach(function (ly) { ly.W.forEach(function (row) { row.forEach(function (w) { maxw = Math.max(maxw, Math.abs(w)); }); }); });
      for (l = 0; l < net.L.length; l++) for (j = 0; j < net.L[l].W.length; j++) for (k = 0; k < net.L[l].W[j].length; k++) {
        var w = net.L[l].W[j][k];
        s += '<line x1="' + X(l) + '" y1="' + Y(l, k).toFixed(1) + '" x2="' + X(l + 1) + '" y2="' + Y(l + 1, j).toFixed(1) + '" stroke="' + (w >= 0 ? BLUE : ORANGE) + '" stroke-width="' + (0.4 + 4 * Math.abs(w) / maxw).toFixed(2) + '" stroke-opacity="' + (0.25 + 0.7 * Math.abs(w) / maxw).toFixed(2) + '"/>';
      }
      var names = extra ? ['x', 'y', 'x²', 'y²'] : ['x', 'y'];
      for (l = 0; l < cols; l++) for (j = 0; j < sz[l]; j++) {
        var fill = l === 0 ? 'var(--surface-2)' : l === cols - 1 ? 'var(--accent-soft)' : 'var(--surface)';
        s += '<circle cx="' + X(l) + '" cy="' + Y(l, j).toFixed(1) + '" r="10" fill="' + fill + '" stroke="var(--fg-2)" stroke-width="1.2"/>';
        if (l === 0) s += '<text x="' + (X(l) - 15) + '" y="' + (Y(l, j) + 4).toFixed(1) + '" text-anchor="end" font-size="12" class="svg-text">' + names[j] + '</text>';
      }
      s += '<text x="' + X(cols - 1) + '" y="' + (Y(cols - 1, 0) + 28) + '" text-anchor="middle" font-size="11" class="svg-muted">kimenet</text>';
      s += '<text x="' + X(0) + '" y="250" text-anchor="middle" font-size="11" class="svg-muted">bemenet</text>';
      if (cols > 2) s += '<text x="' + ((X(1) + X(cols - 2)) / 2) + '" y="250" text-anchor="middle" font-size="11" class="svg-muted">rejtett réteg' + (cols > 3 ? 'ek' : '') + '</text>';
      svg.innerHTML = s;
    }
    function paint() {
      draw(ctx, net, feat, data, { line: lineColor() });
      var acc = accuracy(net, feat, data), npar = 0;
      net.L.forEach(function (ly) { npar += ly.W.length * (ly.W[0].length + 1); });
      el.querySelector('.miw-stats').innerHTML = '<div><small>Tanítási kör</small><b>' + epoch + '</b></div><div><small>Hiba</small><b>' + (epoch ? hu(loss, 3) : '–') + '</b></div><div><small>Jól besorolt</small><b>' + Math.round(acc * 100) + '%</b></div><div><small>Állítható szám (súly)</small><b>' + npar + '</b></div>';
      var msg = '';
      if (layers === 0 && !extra && (kind === 'xor' || kind === 'kor') && epoch > 200) msg = '<div class="w-msg warn">Rejtett réteg nélkül a háló csak egyenes vonalat tud húzni, ez ide kevés. Adj hozzá egy réteget, vagy kapcsold be a távolságot!</div>';
      else if (epoch > 50 && acc >= 0.97) msg = '<div class="w-msg ok">Szép! A háló megtanulta szétválasztani a két színt.</div>';
      el.querySelector('.miw-msg').innerHTML = msg;
    }
    var frames = 0;
    var anim = animator(el, function () {
      for (var i = 0; i < 3; i++) { loss = net.step(data, lr, feat); epoch++; }
      paint(); if (++frames % 6 === 0) drawNet();
      if (epoch >= 6000) stop();
    });
    function stop() { anim.stop(); drawNet(); el.querySelector('.miw-go').textContent = '▶ Tanítás'; }
    el.querySelector('.miw-go').addEventListener('click', function () { if (anim.on) stop(); else { anim.start(); this.textContent = '⏸ Megállít'; } });
    el.querySelector('.miw-reset').addEventListener('click', function () { stop(); seed++; build(); });
    el.querySelector('.miw-ex').addEventListener('change', function () { stop(); extra = this.checked; build(); });
    el.querySelectorAll('[data-a]').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.dataset.a; stop();
        if (a === 'l-') layers = Math.max(0, layers - 1); if (a === 'l+') layers = Math.min(3, layers + 1);
        if (a === 'n-') neurons = Math.max(1, neurons - 1); if (a === 'n+') neurons = Math.min(8, neurons + 1);
        build();
      });
    });
    ['d', 'lr'].forEach(function (g) {
      var box = el.querySelector('[data-g="' + g + '"]');
      box.querySelectorAll('button').forEach(function (b) { if (g === 'd') b.classList.toggle('on', b.dataset.v === kind); });
      box.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        box.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        if (g === 'd') { stop(); kind = b.dataset.v; build(); } else lr = parseFloat(b.dataset.v);
      });
    });
    build();
  });

  /* =====================================================================
   * 3. „Következő szó” – bigram-modell
   * ===================================================================== */
  var KORPUSZ = 'A macska szereti a halat. A macska tud ugrani. A macska a kertben alszik. A macska szereti a napot. ' +
    'A kutya szereti a csontot. A kutya tud úszni. A kutya a kertben játszik. A kutya szereti a gyereket. ' +
    'A madár szereti a magot. A madár tud repülni. A madár a fán énekel. A madár a fán alszik. ' +
    'A hal tud úszni. A hal a tóban él. A gyerek szereti a macskát. A gyerek a kertben játszik. A gyerek tud úszni. ' +
    'Nyáron a gyerek a tóban úszik. Télen a madár a fán alszik. Nyáron a nap süt. Télen a tó jeges. ' +
    'Ma a nap süt és a madár énekel. Ma a kutya a kertben alszik. A nap meleg. A tó hideg.';
  S.addWidget('mi-kovetkezo-szo', function (el, o) {
    var text = o.text || KORPUSZ, toks = [], cnt = {}, i;
    text.toLowerCase().replace(/[,;:!?]/g, '').split(/\s+/).forEach(function (w) {
      if (!w) return; var dot = /\.$/.test(w); w = w.replace(/\.$/, ''); if (w) toks.push(w); if (dot) toks.push('.');
    });
    var prev = '.';
    for (i = 0; i < toks.length; i++) { var t = toks[i]; cnt[prev] = cnt[prev] || {}; cnt[prev][t] = (cnt[prev][t] || 0) + 1; prev = t; }
    var T = 1, gen = [], r = Math.random;
    el.innerHTML = head(o.title || 'Következő szó: egy apró nyelvi modell', o.help || 'Ez a mini „nyelvi modell” csak annyit tud, hogy egy rövid mesében **melyik szó után milyen szó jött** és hányszor. Ebből számol **esélyt** a következő szóra, aztán sorsol. A **hőmérséklet** szabja meg, mennyire legyen merész: alacsonyon szinte mindig a leggyakoribbat választja, magason a ritkábbakat is.') +
      '<div class="miw-gen" aria-live="polite"></div>' +
      '<div class="miw-btns"><button type="button" class="btn primary miw-samp">🎲 Következő szó</button><button type="button" class="btn miw-best">⬆ A legvalószínűbb</button><button type="button" class="btn miw-auto">⏩ Mondat végéig</button><button type="button" class="btn miw-new">↺ Elölről</button></div>' +
      '<label class="miw-rng"><span>Hőmérséklet: <b class="miw-t">1</b> <small class="muted miw-tl"></small></span><input type="range" min="0.1" max="2.5" step="0.1" value="1" class="miw-tr"></label>' +
      '<div class="miw-lbl miw-ctx"></div><div class="miw-bars"></div>' +
      '<details class="miw-src"><summary>A tanítószöveg (' + toks.filter(function (x) { return x !== '.'; }).length + ' szó)</summary><p>' + esc(text) + '</p></details>';
    function last() { return gen.length ? gen[gen.length - 1] : '.'; }
    function probs() {
      var c = cnt[last()] || cnt['.'], keys = Object.keys(c), tot = 0, out;
      out = keys.map(function (k) { var v = Math.pow(c[k], 1 / T); tot += v; return { w: k, n: c[k], v: v }; });
      out.forEach(function (x) { x.p = x.v / tot; });
      return out.sort(function (a, b) { return b.p - a.p || (a.w < b.w ? -1 : 1); });
    }
    function show(w) { return w === '.' ? '. (pont, vége)' : w; }
    function paint(picked) {
      var words = [], cap = true;
      gen.forEach(function (w) { if (w === '.') { if (words.length) words[words.length - 1] += '.'; cap = true; } else { words.push(cap ? w.charAt(0).toUpperCase() + w.slice(1) : w); cap = false; } });
      el.querySelector('.miw-gen').innerHTML = words.length ? esc(words.join(' ')) + (gen.length && last() !== '.' ? ' <span class="miw-cur">▍</span>' : '') : '<span class="muted">Nyomd meg a „Következő szó” gombot!</span>';
      var ps = probs(), tot = 0; ps.forEach(function (x) { tot += x.n; });
      el.querySelector('.miw-ctx').innerHTML = gen.length && last() !== '.' ? 'Az utolsó szó: <b>„' + esc(last()) + '”</b>. A szövegben ezután ezek jöttek (' + tot + ' alkalom):' : 'Mondat eleje. Ezekkel a szavakkal kezdődtek a mondatok:';
      el.querySelector('.miw-bars').innerHTML = ps.map(function (x) {
        return '<div class="miw-bar' + (picked === x.w ? ' on' : '') + '"><span class="miw-bw">' + esc(show(x.w)) + '</span><span class="miw-bt"><i style="width:' + (x.p * 100).toFixed(1) + '%"></i></span><span class="miw-bp">' + hu(x.p * 100, 1) + '%</span><small class="muted">' + x.n + '×</small></div>';
      }).join('');
    }
    function add(greedy) {
      if (gen.length > 40 && last() === '.') gen = [];
      var ps = probs(), w;
      if (greedy) w = ps[0].w;
      else { var u = r(), acc = 0; w = ps[ps.length - 1].w; for (var k = 0; k < ps.length; k++) { acc += ps[k].p; if (u < acc) { w = ps[k].w; break; } } }
      gen.push(w); paint(w);
    }
    el.querySelector('.miw-samp').addEventListener('click', function () { add(false); });
    el.querySelector('.miw-best').addEventListener('click', function () { add(true); });
    el.querySelector('.miw-auto').addEventListener('click', function () { var g = 0; do { add(false); g++; } while (last() !== '.' && g < 25); });
    el.querySelector('.miw-new').addEventListener('click', function () { gen = []; paint(); });
    el.querySelector('.miw-tr').addEventListener('input', function () {
      T = parseFloat(this.value);
      el.querySelector('.miw-t').textContent = hu(T, 1);
      el.querySelector('.miw-tl').textContent = T < 0.5 ? '(óvatos, ismétlődő)' : T > 1.5 ? '(merész, meglepő)' : '(kiegyensúlyozott)';
      paint();
    });
    el.querySelector('.miw-tl').textContent = '(kiegyensúlyozott)';
    paint();
  });

  /* =====================================================================
   * 4. „Valódi vagy MI?” – felismerési kvíz
   * ===================================================================== */
  var ESETEK = [
    { t: 'Videó: egy híres színész arra biztat, hogy fektess be egy új kriptopénzbe, mert „garantáltan megduplázza a pénzed”. A szája mozgása kicsit elcsúszik a hanghoz képest. A videót csak egy ismeretlen hirdetés mutatja.', mi: 1, why: ['Híresség + gyors meggazdagodás + sürgetés: ez a csalók kedvenc receptje.', 'A száj és a hang elcsúszása gyakori jele a hamisított (deepfake) videónak.', 'A színész saját, hivatalos oldalán nincs nyoma az ajánlatnak.'] },
    { t: 'Fotók egy árvízről a városodban. Ugyanazt a helyszínt a helyi önkormányzat oldala és két hírportál is mutatja, különböző fotósok, különböző szögekből.', mi: 0, why: ['Több, egymástól független, ismert forrás ugyanarról számol be.', 'Különböző szögekből készült képek nehezen hamisíthatók egyszerre.', 'Teljes bizonyosság ritkán van, de itt minden ellenőrzés a valódiság felé mutat.'] },
    { t: 'Üzenet egy ismeretlen számról: „Szia Anya, elromlott a telefonom, ez az új számom. Sürgősen utalnál 80 ezret? Később elmagyarázom!” Mellette egy hangüzenet, ami pont úgy szól, mint a gyerek hangja.', mi: 1, why: ['Ismeretlen szám, sürgetés, pénzkérés: klasszikus csalás.', 'Néhány másodpercnyi hangfelvételből ma már valószerű hangot lehet utánozni.', 'Megoldás: hívd vissza a családtagot a régi, ismert számán, vagy kérdezz olyat, amit csak ő tudhat.'] },
    { t: 'Fotó egy politikusról egy tüntetésen. Ha jobban megnézed, az egyik kezén hat ujj van, és a háttérben lévő táblák felirata értelmetlen, összefolyó betűkből áll.', mi: 1, why: ['A képgenerátorok sokáig hibáztak a kezeknél és a feliratoknál, és bár egyre jobbak, ezek a hibák még előfordulhatnak.', 'Fontos: ha nincs ilyen hiba, attól a kép még lehet hamis. A forrás ellenőrzése a legbiztosabb.'] },
    { t: 'Egy blogcikk egy „2023-as oxfordi tanulmányra” hivatkozik, amely szerint a csokoládé okosabbá tesz. Rákeresel a tanulmány címére, de sehol nem találod.', mi: 1, why: ['A nyelvi modellek néha meggyőző, de nem létező forrásokat „találnak ki” (ezt hívják hallucinációnak).', 'Egy valódi tanulmánynak van szerzője, folyóirata, és rá lehet keresni.'] },
    { t: 'Videó az iskolai sportnapról, ahol te is ott voltál. Minden úgy történik rajta, ahogy emlékszel, és az iskola hivatalos oldalára töltötték fel.', mi: 0, why: ['Saját tapasztalatod egyezik a felvétellel.', 'A forrás ismert és felelős (az iskola).'] },
    { t: 'Képernyőkép terjed: „Holnaptól betiltják a kutyasétáltatást a parkokban!” Nincs rajta link, és egyetlen hírportál sem ír róla.', mi: 1, why: ['Egy képernyőképet bárki elkészíthet vagy átszerkeszthet, MI-vel vagy anélkül.', 'Egy ilyen szabályról a hivatalos oldalak és a hírek is beszámolnának.', 'Az erős érzelmet kiváltó, „hihetetlen” hír mindig gyanús.'] },
    { t: 'Profilkép egy közösségi oldalon: hibátlanul sima bőr, a két fülbevaló teljesen különböző, a haj szélei beleolvadnak a háttérbe. A profil egy hete készült, és már mindenkit ismerősnek jelöl.', mi: 1, why: ['Az eltérő fülbevalók, a „beleolvadó” haj és a túl tökéletes bőr generált képre utalhat.', 'Az új, gyorsan ismerkedő profil álprofil jele lehet.'] },
    { t: 'A tanárod a hivatalos iskolai rendszerben bejelenti, hogy jövő kedden témazáró lesz, és ugyanezt az órán is elmondta.', mi: 0, why: ['A hivatalos csatorna és a személyes közlés egyezik.'] },
    { t: 'Egy webshopban egy ismeretlen termék alatt egyetlen nap alatt 50 ötcsillagos vélemény jelent meg. Mind nagyon hasonló mondatokkal dicsér, és egyik sem említ semmi konkrétat.', mi: 1, why: ['A sok, egyszerre megjelenő, sablonos dicséret gyakran gépi úton gyártott hamis vélemény.', 'A valódi vélemények változatosak, és gyakran konkrét apró hibákat is említenek.'] },
    { t: 'A nagymamád egy régi, papírra nyomtatott fényképet mutat az ötvenes évekből, és elmeséli, ki van rajta és hol készült.', mi: 0, why: ['Ismert, megbízható személytől származik, és van mögötte személyes történet.'] },
    { t: 'Egy hírolvasó egy tévécsatorna logójával döbbenetes bejelentést tesz. A csatorna saját honlapján és műsorában semmi nyoma a hírnek.', mi: 1, why: ['A logót és a hírolvasót is lehet hamisítani.', 'Mindig nézd meg az eredeti forrást: ha ott nincs, a hír nagy eséllyel hamis.'] }
  ];
  S.addWidget('mi-valodi-kviz', function (el, o) {
    var round, k, score;
    el.innerHTML = head(o.title || 'Valódi vagy MI?', o.help || 'Olvasd el a helyzetet, és döntsd el: **megbízhatónak tűnik**, vagy **gyanús** (MI-vel hamisított vagy más módon félrevezető lehet)? Nem a ráérzés a lényeg, hanem hogy **milyen jelekre** figyelsz.') +
      '<div class="miw-quiz"></div>';
    var box = el.querySelector('.miw-quiz');
    function start() { round = S.shuffle(ESETEK).slice(0, 6); k = 0; score = 0; ask(); }
    function ask() {
      if (k >= round.length) {
        box.innerHTML = '<div class="score">' + score + ' / ' + round.length + '</div><p><b>Az ellenőrzés lépései, bármi is jön szembe:</b></p><ol class="miw-list"><li>Honnan származik? Ismert, felelős forrás?</li><li>Megtalálható máshol is, független helyeken?</li><li>Sürget, ijesztget vagy túl szép, hogy igaz legyen?</li><li>Vannak furcsa részletek (kéz, felirat, száj, hang, árnyék)?</li><li>Ha pénzről vagy személyes adatról van szó: hívd vissza az ismert számon, kérdezz meg egy felnőttet.</li></ol><button type="button" class="btn primary miw-again">↻ Új kör</button>';
        box.querySelector('.miw-again').addEventListener('click', start); return;
      }
      var c = round[k];
      box.innerHTML = '<div class="miw-qn muted">' + (k + 1) + '. eset a ' + round.length + '-ból</div><p class="miw-case">' + esc(c.t) + '</p>' +
        '<div class="miw-btns"><button type="button" class="btn" data-a="0">✅ Megbízhatónak tűnik</button><button type="button" class="btn" data-a="1">🚩 Gyanús</button></div><div class="miw-fb"></div>';
      box.querySelectorAll('[data-a]').forEach(function (b) {
        b.addEventListener('click', function () {
          var ok = +b.dataset.a === c.mi; if (ok) score++;
          box.querySelectorAll('[data-a]').forEach(function (x) { x.disabled = true; x.classList.toggle('primary', +x.dataset.a === c.mi); });
          box.querySelector('.miw-fb').innerHTML = '<div class="w-msg ' + (ok ? 'ok' : 'bad') + '">' + (ok ? 'Jó döntés!' : 'Ezt érdemes újragondolni.') + ' ' + (c.mi ? 'Ez gyanús.' : 'Ez valószínűleg megbízható.') + '</div><ul class="miw-list">' + c.why.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul><button type="button" class="btn primary miw-next">Tovább →</button>';
          box.querySelector('.miw-next').addEventListener('click', function () { k++; ask(); });
        });
      });
    }
    start();
  });
})();
