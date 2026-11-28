/* Tudásműhely – 🔄 Haladás átvitele eszközök között, fiók és szerver nélkül (#/szinkron).
 * A haladás (minden 'tudasmuhely.' kulcs) tömörítve egy linkbe / QR-kódba / szövegkódba kerül.
 * A másik eszközön a link megnyitásával vagy a kód beillesztésével betölthető: összefésülve vagy felülírva.
 * Saját QR-kódoló (bájt mód, L hibajavítás, 1–40. verzió) a Nayuki-féle referencia-algoritmus alapján. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var PREFIX = 'tudasmuhely.', SITE = 'https://mitudi.hu/';
  var SKIP = { 'szinkron.last': 1, 'pszicho.hangulat': 1 }; /* a hangulatnapló érzékeny, nem utazik linkben */

  /* ================= QR-kódoló ================= */
  var ECC_L = [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];
  var BLK_L = [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25];
  function rawModules(v) {
    var r = (16 * v + 128) * v + 64;
    if (v >= 2) { var n = Math.floor(v / 7) + 2; r -= (25 * n - 10) * n - 55; if (v >= 7) r -= 36; }
    return r;
  }
  function dataCodewords(v) { return Math.floor(rawModules(v) / 8) - ECC_L[v] * BLK_L[v]; }
  function gfMul(x, y) { var z = 0; for (var i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11D); z ^= ((y >>> i) & 1) * x; } return z & 255; }
  function rsDivisor(deg) {
    var r = []; for (var i = 0; i < deg; i++) r.push(0); r[deg - 1] = 1; var root = 1;
    for (i = 0; i < deg; i++) { for (var j = 0; j < r.length; j++) { r[j] = gfMul(r[j], root); if (j + 1 < r.length) r[j] ^= r[j + 1]; } root = gfMul(root, 2); }
    return r;
  }
  function rsRemainder(data, div) {
    var r = div.map(function () { return 0; });
    data.forEach(function (b) { var f = b ^ r.shift(); r.push(0); for (var i = 0; i < div.length; i++) r[i] ^= gfMul(div[i], f); });
    return r;
  }
  function alignPos(v) {
    if (v === 1) return [];
    var n = Math.floor(v / 7) + 2, step = v === 32 ? 26 : Math.ceil((v * 4 + 4) / (n * 2 - 2)) * 2, r = [6];
    for (var p = v * 4 + 10; r.length < n; p -= step) r.splice(1, 0, p);
    return r;
  }
  S.qrEncode = function (bytes) {
    var v, cap;
    for (v = 1; v <= 40; v++) { cap = dataCodewords(v) * 8; if (4 + (v < 10 ? 8 : 16) + bytes.length * 8 <= cap) break; }
    if (v > 40) return null;
    var bits = [];
    function put(val, len) { for (var i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); }
    put(4, 4); put(bytes.length, v < 10 ? 8 : 16); bytes.forEach(function (b) { put(b, 8); });
    put(0, Math.min(4, cap - bits.length)); put(0, (8 - bits.length % 8) % 8);
    for (var pad = 0xEC; bits.length < cap; pad ^= 0xEC ^ 0x11) put(pad, 8);
    var data = []; for (var i = 0; i < bits.length; i += 8) { var b = 0; for (var j = 0; j < 8; j++) b = (b << 1) | bits[i + j]; data.push(b); }
    /* hibajavító kódszavak és blokkok összefésülése */
    var nb = BLK_L[v], el = ECC_L[v], raw = Math.floor(rawModules(v) / 8), nShort = nb - raw % nb, shortLen = Math.floor(raw / nb);
    var div = rsDivisor(el), blocks = [], k = 0;
    for (i = 0; i < nb; i++) {
      var d = data.slice(k, k + shortLen - el + (i < nShort ? 0 : 1)); k += d.length;
      var ecc = rsRemainder(d, div); if (i < nShort) d.push(0); blocks.push(d.concat(ecc));
    }
    var all = [];
    for (i = 0; i < blocks[0].length; i++) for (j = 0; j < blocks.length; j++) if (i !== shortLen - el || j >= nShort) all.push(blocks[j][i]);
    /* mátrix */
    var size = v * 4 + 17, M = [], F = [];
    for (i = 0; i < size; i++) { M.push([]); F.push([]); for (j = 0; j < size; j++) { M[i].push(false); F[i].push(false); } }
    function setF(x, y, dark) { M[y][x] = dark; F[y][x] = true; }
    for (i = 0; i < size; i++) { setF(6, i, i % 2 === 0); setF(i, 6, i % 2 === 0); }
    [[3, 3], [size - 4, 3], [3, size - 4]].forEach(function (c) {
      for (var dy = -4; dy <= 4; dy++) for (var dx = -4; dx <= 4; dx++) {
        var dist = Math.max(Math.abs(dx), Math.abs(dy)), xx = c[0] + dx, yy = c[1] + dy;
        if (xx >= 0 && xx < size && yy >= 0 && yy < size) setF(xx, yy, dist !== 2 && dist !== 4);
      }
    });
    var ap = alignPos(v), na = ap.length;
    for (i = 0; i < na; i++) for (j = 0; j < na; j++) {
      if ((i === 0 && j === 0) || (i === 0 && j === na - 1) || (i === na - 1 && j === 0)) continue;
      for (var dy2 = -2; dy2 <= 2; dy2++) for (var dx2 = -2; dx2 <= 2; dx2++) setF(ap[i] + dx2, ap[j] + dy2, Math.max(Math.abs(dx2), Math.abs(dy2)) !== 1);
    }
    function formatBits(mask) {
      var dat = (1 << 3) | mask, rem = dat; /* L szint = 01 */
      for (var q = 0; q < 10; q++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      var fb = ((dat << 10) | rem) ^ 0x5412;
      function g(n) { return ((fb >>> n) & 1) !== 0; }
      for (q = 0; q <= 5; q++) setF(8, q, g(q));
      setF(8, 7, g(6)); setF(8, 8, g(7)); setF(7, 8, g(8));
      for (q = 9; q < 15; q++) setF(14 - q, 8, g(q));
      for (q = 0; q < 8; q++) setF(size - 1 - q, 8, g(q));
      for (q = 8; q < 15; q++) setF(8, size - 15 + q, g(q));
      setF(8, size - 8, true);
    }
    formatBits(0);
    if (v >= 7) {
      var rem = v; for (i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
      var vb = (v << 12) | rem;
      for (i = 0; i < 18; i++) { var bit = ((vb >>> i) & 1) !== 0, a = size - 11 + i % 3, bb = Math.floor(i / 3); setF(a, bb, bit); setF(bb, a, bit); }
    }
    var bi = 0;
    for (var right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (var vert = 0; vert < size; vert++) for (j = 0; j < 2; j++) {
        var x = right - j, up = ((right + 1) & 2) === 0, y = up ? size - 1 - vert : vert;
        if (!F[y][x] && bi < all.length * 8) { M[y][x] = ((all[bi >>> 3] >>> (7 - (bi & 7))) & 1) !== 0; bi++; }
      }
    }
    function maskFn(m, x, y) {
      switch (m) {
        case 0: return (x + y) % 2 === 0; case 1: return y % 2 === 0; case 2: return x % 3 === 0; case 3: return (x + y) % 3 === 0;
        case 4: return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; case 5: return x * y % 2 + x * y % 3 === 0;
        case 6: return (x * y % 2 + x * y % 3) % 2 === 0; default: return ((x + y) % 2 + x * y % 3) % 2 === 0;
      }
    }
    function applyMask(m) { for (var yy = 0; yy < size; yy++) for (var xx = 0; xx < size; xx++) if (!F[yy][xx] && maskFn(m, xx, yy)) M[yy][xx] = !M[yy][xx]; }
    function penalty() {
      var p = 0, dark = 0, xx, yy, run, c;
      for (yy = 0; yy < size; yy++) { run = 1; for (xx = 1; xx <= size; xx++) { if (xx < size && M[yy][xx] === M[yy][xx - 1]) run++; else { if (run >= 5) p += run - 2; run = 1; } } }
      for (xx = 0; xx < size; xx++) { run = 1; for (yy = 1; yy <= size; yy++) { if (yy < size && M[yy][xx] === M[yy - 1][xx]) run++; else { if (run >= 5) p += run - 2; run = 1; } } }
      for (yy = 0; yy < size - 1; yy++) for (xx = 0; xx < size - 1; xx++) { c = M[yy][xx]; if (c === M[yy][xx + 1] && c === M[yy + 1][xx] && c === M[yy + 1][xx + 1]) p += 3; }
      for (yy = 0; yy < size; yy++) for (xx = 0; xx < size; xx++) if (M[yy][xx]) dark++;
      p += Math.floor(Math.abs(dark * 20 - size * size * 10) / (size * size)) * 10;
      return p;
    }
    var best = 0, bestP = Infinity;
    for (var m = 0; m < 8; m++) { applyMask(m); formatBits(m); var pp = penalty(); if (pp < bestP) { bestP = pp; best = m; } applyMask(m); }
    applyMask(best); formatBits(best);
    return { size: size, version: v, modules: M };
  };
  S.qrSvg = function (text) {
    var bytes = [], u = unescape(encodeURIComponent(text));
    for (var i = 0; i < u.length; i++) bytes.push(u.charCodeAt(i));
    var q = S.qrEncode(bytes);
    if (!q) return null;
    var b = 4, n = q.size + b * 2, d = '';
    for (var y = 0; y < q.size; y++) for (var x = 0; x < q.size; x++) if (q.modules[y][x]) d += 'M' + (x + b) + ',' + (y + b) + 'h1v1h-1z';
    return '<svg class="sy-qr" viewBox="0 0 ' + n + ' ' + n + '" shape-rendering="crispEdges" role="img" aria-label="QR-kód"><rect width="' + n + '" height="' + n + '" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
  };

  /* ================= adatok csomagolása ================= */
  function collect() {
    var data = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k.indexOf(PREFIX) === 0 && !SKIP[k.slice(PREFIX.length)]) data[k.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(k));
      }
    } catch (e) { /* nincs tárolás */ }
    return data;
  }
  function b64url(bytes) {
    var s = ''; for (var i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, Array.prototype.slice.call(bytes, i, i + 0x8000));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function unb64url(s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '=';
    var bin = atob(s), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function utf8(str) { var u = unescape(encodeURIComponent(str)), a = new Uint8Array(u.length); for (var i = 0; i < u.length; i++) a[i] = u.charCodeAt(i); return a; }
  function fromUtf8(bytes) { var s = ''; for (var i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, Array.prototype.slice.call(bytes, i, i + 0x8000)); return decodeURIComponent(escape(s)); }
  function stream(bytes, T) {
    var cs = new T('deflate-raw'), w = cs.writable.getWriter(); w.write(bytes); w.close();
    return new Response(cs.readable).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  var canZip = typeof CompressionStream !== 'undefined' && typeof Response !== 'undefined';
  function pack(obj, cb) {
    var json = JSON.stringify({ app: 'tudasmuhely', v: 1, date: new Date().toISOString(), data: obj }), raw = utf8(json);
    if (!canZip) { cb('j' + b64url(raw)); return; }
    stream(raw, CompressionStream).then(function (z) { cb('z' + b64url(z)); }, function () { cb('j' + b64url(raw)); });
  }
  function unpack(code, cb) {
    code = (code || '').trim();
    var m = code.match(/[?&]d=([A-Za-z0-9_-]+)/); if (m) code = m[1];
    code = code.replace(/\s+/g, '');
    function done(bytes) { try { var j = JSON.parse(fromUtf8(bytes)); if (j.app !== 'tudasmuhely' || !j.data) throw 0; cb(null, j); } catch (e) { cb('format'); } }
    try {
      var t = code.charAt(0), bytes = unb64url(code.slice(1));
      if (t === 'j') done(bytes);
      else if (t === 'z') { if (typeof DecompressionStream === 'undefined') { cb('old'); return; } stream(bytes, DecompressionStream).then(done, function () { cb('format'); }); }
      else cb('format');
    } catch (e) { cb('format'); }
  }

  /* összefésülés: semmi ne vesszen el – objektumok uniója, tömbök uniója, számoknál a nagyobb */
  function merge(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      var seen = {}, out = [];
      a.concat(b).forEach(function (x) { var k = JSON.stringify(x); if (!seen[k]) { seen[k] = 1; out.push(x); } });
      return out;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
      var r = {}; Object.keys(a).forEach(function (k) { r[k] = a[k]; });
      Object.keys(b).forEach(function (k) { r[k] = k in r ? merge(r[k], b[k]) : b[k]; });
      return r;
    }
    if (typeof a === 'number' && typeof b === 'number') return Math.max(a, b);
    return a === undefined || a === null ? b : a;
  }
  S.syncMerge = merge;
  function summarize(d) {
    var done = 0, ans = 0, notes = 0;
    Object.keys(d.done || {}).forEach(function (k) { if (d.done[k]) done++; });
    if (d.quiz && typeof d.quiz === 'object') ans = Object.keys(d.quiz).length;
    if (d.notes && typeof d.notes === 'object') notes = Object.keys(d.notes).length;
    return { keys: Object.keys(d).length, done: done, ans: ans, notes: notes };
  }
  function baseUrl() { return /^https?:/.test(location.protocol) ? location.href.split('#')[0] : SITE; }

  /* ================= oldal ================= */
  function page(main, rest, params) {
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/haladas">Haladásom</a><span>›</span><span>Átvitel</span></nav>' +
      '<h1>🔄 Haladás átvitele másik eszközre</h1>' +
      '<p class="lead">Fiók és jelszó nélkül: a haladásod egy linkbe vagy QR-kódba kerül, amit a másik eszközön megnyitsz. Semmi nem megy fel szerverre – az adat csak a linkben utazik.</p>' +
      (params.d ? '<section class="card pad sy-in" id="sy-in"><h2 style="margin-top:0">📥 Érkezett haladás</h2><div id="sy-in-b" class="muted">Kicsomagolás…</div></section>' : '') +
      '<div class="sy-grid">' +
      '<section class="card pad"><h2 style="margin-top:0">📤 Küldés erről az eszközről</h2>' +
      '<p class="muted" id="sy-sum"></p>' +
      '<div class="row"><button type="button" class="btn primary" id="sy-make">Link és QR-kód készítése</button></div>' +
      '<div id="sy-out" hidden><div id="sy-qr" class="sy-qrbox"></div>' +
      '<p class="muted sy-tip" id="sy-qrtip"></p>' +
      '<label class="sy-l">Link<input type="text" id="sy-link" readonly></label>' +
      '<div class="row"><button type="button" class="btn" id="sy-copy">📋 Link másolása</button>' + (navigator.share ? '<button type="button" class="btn" id="sy-share">📨 Küldés magadnak…</button>' : '') + '</div>' +
      '<p class="muted sy-tip">A link a teljes haladásodat tartalmazza (leckék, teszteredmények, jegyzetek, saját kérdések). Csak magadnak küldd el, pl. e-mailben vagy üzenetben saját magadnak.</p></div></section>' +
      '<section class="card pad"><h2 style="margin-top:0">📥 Fogadás ezen az eszközön</h2>' +
      '<ol class="sy-steps"><li>A másik eszközön nyisd meg ezt az oldalt, és nyomd meg a „Link és QR-kód készítése” gombot.</li><li>Ezzel a telefonnal olvasd be a QR-kódot a kamerával – vagy nyisd meg a linket, ha elküldted magadnak.</li><li>Válaszd az <b>Összefésülést</b>: így egyik eszközön elért haladásod sem vész el.</li></ol>' +
      '<label class="sy-l">…vagy illeszd be ide a linket / kódot<textarea id="sy-paste" rows="3" placeholder="https://…#/szinkron?d=z…"></textarea></label>' +
      '<div class="row"><button type="button" class="btn" id="sy-read">Betöltés</button></div><div id="sy-paste-b"></div></section>' +
      '</div>' +
      '<p class="muted" style="margin-top:16px">Fájlba mentés és betöltés továbbra is működik a <a href="#/haladas">Haladásom</a> oldalon.</p>';
    var mine = collect(), sm = summarize(mine);
    main.querySelector('#sy-sum').textContent = 'Ezen az eszközön: ' + sm.done + ' kész lecke, ' + sm.keys + ' mentett adatcsoport.';
    var url = '';
    main.querySelector('#sy-make').addEventListener('click', function () {
      pack(collect(), function (code) {
        url = baseUrl() + '#/szinkron?d=' + code;
        main.querySelector('#sy-out').hidden = false;
        main.querySelector('#sy-link').value = url;
        var svg = url.length <= 2900 ? S.qrSvg(url) : null;
        main.querySelector('#sy-qr').innerHTML = svg || '<div class="sy-noqr">🗂 Túl sok adat egy QR-kódhoz (' + Math.round(url.length / 1000) + ' ezer karakter). Használd a linket, vagy a fájlba mentést.</div>';
        main.querySelector('#sy-qrtip').innerHTML = svg ? 'Olvasd be a másik eszköz kamerájával. Ha nehezen olvassa be, <button type="button" class="btn sm" id="sy-big">🔍 nagyítsd ki</button>, és növeld a képernyő fényerejét.' : '';
        var big = main.querySelector('#sy-big');
        if (big) big.addEventListener('click', function () {
          var ov = document.createElement('div'); ov.className = 'sy-full'; ov.innerHTML = svg + '<p>Koppints bárhova a bezáráshoz</p>';
          ov.addEventListener('click', function () { ov.remove(); }); document.body.appendChild(ov);
        });
      });
    });
    main.querySelector('#sy-copy').addEventListener('click', function () {
      var i = main.querySelector('#sy-link'); i.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) { /* */ }
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { flash('Másolva!'); }, function () { if (ok) flash('Másolva!'); });
      else if (ok) flash('Másolva!');
    });
    var sh = main.querySelector('#sy-share');
    if (sh) sh.addEventListener('click', function () { navigator.share({ title: 'Tudásműhely – haladásom', url: url }).catch(function () {}); });
    function flash(t) { var b = main.querySelector('#sy-copy'), o = b.textContent; b.textContent = '✔ ' + t; setTimeout(function () { b.textContent = o; }, 1500); }
    function offer(box, code) {
      box.innerHTML = '<p class="muted">Kicsomagolás…</p>';
      unpack(code, function (err, j) {
        if (err) { box.innerHTML = '<p class="sy-err">' + (err === 'old' ? 'Ez a böngésző túl régi a tömörített kódhoz. Frissítsd, vagy használd a fájlba mentést.' : 'Ez nem érvényes Tudásműhely-link vagy -kód (lehet, hogy nem másolódott ki teljesen).') + '</p>'; return; }
        var s = summarize(j.data);
        box.innerHTML = '<p>Mentés ideje: <b>' + esc(new Date(j.date).toLocaleString('hu-HU')) + '</b> · ' + s.done + ' kész lecke · ' + s.keys + ' adatcsoport.</p>' +
          '<div class="row"><button type="button" class="btn primary" data-m="merge">🔀 Összefésülés (ajánlott)</button><button type="button" class="btn" data-m="over">♻️ Felülírás</button></div>' +
          '<p class="muted sy-tip">Összefésülés: mindkét eszköz haladása megmarad. Felülírás: ezen az eszközön minden a kapott állapotra cserélődik.</p>';
        box.addEventListener('click', function (e) {
          var m = e.target.getAttribute && e.target.getAttribute('data-m'); if (!m) return;
          if (m === 'over' && !confirm('Biztosan felülírod az ezen az eszközön lévő haladást?')) return;
          var cur = collect();
          if (m === 'over') { Object.keys(cur).forEach(function (k) { try { localStorage.removeItem(PREFIX + k); } catch (x) { /* */ } }); }
          Object.keys(j.data).forEach(function (k) { S.store.set(k, m === 'merge' && k in cur ? merge(cur[k], j.data[k]) : j.data[k]); });
          S.store.set('szinkron.last', new Date().toISOString());
          box.innerHTML = '<p class="sy-ok">✔ Kész! A haladásod betöltve (' + (m === 'merge' ? 'összefésülve' : 'felülírva') + ').</p><div class="row"><a class="btn primary" href="#/haladas">Haladásom megnézése →</a></div>';
          if (S.applySettings) try { S.applySettings(); } catch (x) { /* */ }
        });
      });
    }
    if (params.d) offer(main.querySelector('#sy-in-b'), params.d);
    main.querySelector('#sy-read').addEventListener('click', function () { offer(main.querySelector('#sy-paste-b'), main.querySelector('#sy-paste').value); });
  }
  S.addRoute('szinkron', { title: 'Haladás átvitele', nav: '', page: page });
})();
