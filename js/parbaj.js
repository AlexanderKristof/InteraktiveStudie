/* Tudásműhely – ⚔️ Párbaj mód.
 * 1) Egy eszközön, két játékos egymással szemben: középen a kérdés, mindkét oldalon saját válaszgombok.
 *    Aki előbb jól válaszol, pontot kap; aki rosszat nyom, arra a kérdésre kiesik.
 * 2) Kihívás linkkel: ugyanaz a kérdéssor (seed) mindenkinek; a végén az eredmény megosztható szövegként.
 * Útvonal: #/parbaj  ·  #/parbaj?c=<kód> (kihívás) */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  function rng(seed) { var x = seed >>> 0 || 1; return function () { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; }
  function shuf(a, r) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pool(gid, stable) {
    var out = [];
    S.testGroups().forEach(function (g) {
      if (gid && g.id !== gid) return;
      g.topics.forEach(function (t) { t.questions.forEach(function (q) { if (q.options && q.options.length === 4 && !(stable && /^g-/.test(String(q.id)))) out.push({ q: q, g: g, t: t }); }); });
    });
    out.sort(function (a, b) { return String(a.q.id || a.q.q) < String(b.q.id || b.q.q) ? -1 : 1; }); /* stabil sorrend a seedhez */
    return out;
  }
  function pick(gid, n, seed, stable) { var r = rng(seed); return shuf(pool(gid, stable), r).slice(0, n).map(function (it) { return { it: it, opts: shuf(it.q.options.map(function (t, k) { return { t: t, ok: k === it.q.answer }; }), r) }; }); }
  function enc(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/=+$/, ''); }
  function dec(s) { try { return JSON.parse(decodeURIComponent(escape(atob(s)))); } catch (e) { return null; } }
  function groupSelect(cur) {
    return '<select id="pb-g"><option value="">🎲 Vegyes – az egész tananyagból</option>' + S.testGroups().map(function (g) {
      return '<option value="' + g.id + '"' + (g.id === cur ? ' selected' : '') + '>' + esc(g.icon + ' ' + g.title) + '</option>'; }).join('') + '</select>';
  }

  S.addRoute('parbaj', { title: 'Párbaj', nav: 'teszt', page: function (main, rest, params) {
    if (params && params.c) { var c = dec(params.c); if (c) return challenge(main, c); }
    var st = S.store.get('parbaj.beall', { g: '', n: 10, a: 'Anna', b: 'Bence' });
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/teszt">Tesztközpont</a><span>›</span><span>Párbaj</span></nav>' +
      '<h1>⚔️ Párbaj</h1><p class="lead">Ki tud többet? Válassz témát, és mérkőzzetek meg egymással!</p>' +
      '<p><a class="btn" href="#/szoba">🌐 Online, távoli barátokkal: Párbajszoba →</a></p>' +
      '<div class="pb-setup card pad"><label class="pw-f"><span>Téma</span>' + groupSelect(st.g) + '</label>' +
      '<label class="pw-f"><span>Kérdések száma</span><select id="pb-n">' + [5, 10, 15, 20].map(function (n) { return '<option' + (n === st.n ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
      '<div class="pb-modes"><div class="card pad"><h2>👥 Egy eszközön, egymás ellen</h2><p class="muted">Üljetek egymással szemben (vagy egymás mellé), a képernyő két fele az egyik és a másik játékosé. Aki előbb jól válaszol, viszi a pontot; aki rosszat nyom, arra a kérdésre kiesik.</p>' +
      '<div class="pw-grid"><label class="pw-f"><span>1. játékos</span><input id="pb-a" value="' + esc(st.a) + '"></label><label class="pw-f"><span>2. játékos</span><input id="pb-b" value="' + esc(st.b) + '"></label></div>' +
      '<label class="muted" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="pb-flip" checked> szemben ülünk (a felső fél fejjel lefelé)</label>' +
      '<p><button type="button" class="btn primary" id="pb-start">⚔️ Párbaj indítása</button></p></div>' +
      '<div class="card pad"><h2>🔗 Kihívás linkkel</h2><p class="muted">Mindenki ugyanazt a kérdéssort kapja, a saját eszközén. A végén megoszthatjátok az eredményt (pontszám + idő), és kiderül, ki nyert.</p>' +
      '<label class="pw-f"><span>A neved</span><input id="pb-me" value="' + esc(st.a) + '"></label>' +
      '<p><button type="button" class="btn" id="pb-link">🔗 Kihívás-link készítése</button></p><div id="pb-linkout"></div></div></div></div>';
    if (S.searchableSelect) S.searchableSelect(main.querySelector('#pb-g'), '🔎 Keresd a tantárgyat vagy kurzust…');
    function cfg() {
      var c = { g: main.querySelector('#pb-g').value, n: +main.querySelector('#pb-n').value, a: main.querySelector('#pb-a').value || '1. játékos', b: main.querySelector('#pb-b').value || '2. játékos' };
      S.store.set('parbaj.beall', c); return c;
    }
    main.querySelector('#pb-start').addEventListener('click', function () {
      var c = cfg(); if (pool(c.g).length < 4) { alert('Ehhez a témához kevés a kérdés.'); return; }
      duel(main, c, main.querySelector('#pb-flip').checked);
    });
    main.querySelector('#pb-link').addEventListener('click', function () {
      var c = cfg(), code = enc({ g: c.g, n: c.n, s: Math.floor(Math.random() * 1e9), f: main.querySelector('#pb-me').value || '' });
      var url = location.href.split('#')[0] + '#/parbaj?c=' + code;
      main.querySelector('#pb-linkout').innerHTML = '<input readonly value="' + esc(url) + '" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--line)"><p class="row" style="gap:6px;flex-wrap:wrap;margin-top:8px"><button type="button" class="btn sm" id="pb-copy">📋 Másolás</button>' +
        (navigator.share ? '<button type="button" class="btn sm" id="pb-share">📤 Megosztás</button>' : '') + '<a class="btn sm primary" href="#/parbaj?c=' + code + '">▶ Én is kitöltöm</a></p>';
      var cp = main.querySelector('#pb-copy'); cp.addEventListener('click', function () { var i = main.querySelector('#pb-linkout input'); i.select(); try { navigator.clipboard.writeText(i.value); } catch (e) { document.execCommand('copy'); } cp.textContent = '✓ Másolva'; });
      var sh = main.querySelector('#pb-share'); if (sh) sh.addEventListener('click', function () { navigator.share({ title: 'Párbaj-kihívás', text: 'Kihívlak egy ' + c.n + ' kérdéses párbajra a Tudásműhelyen!', url: url }).catch(function () {}); });
    });
    return true;
  } });

  /* ---------- egy eszközön ---------- */
  function duel(main, c, flip) {
    var qs = pick(c.g, c.n, Math.floor(Math.random() * 1e9)), i = 0, sc = [0, 0], out = [false, false], locked = false, tmr;
    function side(p) {
      var x = qs[i];
      return '<div class="pb-side pb-p' + p + (flip && p === 0 ? ' pb-flip' : '') + (out[p] ? ' pb-out' : '') + '"><div class="pb-name">' + esc(p ? c.b : c.a) + ' <b>' + sc[p] + '</b></div>' +
        '<div class="pb-q">' + S.inline(x.it.q.q) + '</div><div class="pb-opts">' + x.opts.map(function (o, k) {
          return '<button type="button" class="pb-opt" data-p="' + p + '" data-k="' + k + '"' + (out[p] || locked ? ' disabled' : '') + '>' + S.inline(String(o.t)) + '</button>'; }).join('') + '</div></div>';
    }
    function paint(msg) {
      main.innerHTML = '<div class="pb-arena">' + side(0) + '<div class="pb-mid"><span>' + (i + 1) + ' / ' + qs.length + '</span>' + (msg || '') + '<button type="button" class="btn sm" id="pb-quit">✕ Kilépés</button></div>' + side(1) + '</div>';
      main.querySelector('#pb-quit').addEventListener('click', function () { clearTimeout(tmr); location.hash = '#/parbaj'; });
      main.querySelectorAll('.pb-opt').forEach(function (b) { b.addEventListener('click', function () { answer(+b.dataset.p, +b.dataset.k); }); });
    }
    function reveal(winner) {
      locked = true;
      var x = qs[i], right = x.opts.filter(function (o) { return o.ok; })[0];
      paint('<div class="pb-res">' + (winner != null ? '🏅 <b>' + esc(winner ? c.b : c.a) + '</b> nyerte!' : '😅 Senki sem találta el.') + '<br><small>Helyes: ' + S.inline(String(right.t)) + '</small></div>');
      main.querySelectorAll('.pb-opt').forEach(function (b) { if (x.opts[+b.dataset.k].ok) b.classList.add('ok'); });
      tmr = setTimeout(next, 2200);
    }
    function answer(p, k) {
      if (locked || out[p]) return;
      var x = qs[i];
      if (x.opts[k].ok) { sc[p]++; reveal(p); }
      else {
        out[p] = true;
        if (S.srsRecord) S.srsRecord(x.it.q, false, { label: x.it.g.title + ' – ' + x.it.t.title, href: x.it.t.href });
        if (out[0] && out[1]) reveal(null); else paint();
      }
    }
    function next() {
      if (!main.querySelector('.pb-arena')) return; /* közben elnavigáltak */
      i++; out = [false, false]; locked = false;
      if (i >= qs.length) return end();
      paint();
    }
    function end() {
      var w = sc[0] === sc[1] ? null : sc[0] > sc[1] ? 0 : 1;
      if (S.logActivity) S.logActivity('game', 'parbaj');
      main.innerHTML = '<div class="card pad pb-end"><div style="font-size:3rem">' + (w == null ? '🤝' : '🏆') + '</div><h1>' + (w == null ? 'Döntetlen!' : esc(w ? c.b : c.a) + ' nyert!') + '</h1>' +
        '<p class="pb-score">' + esc(c.a) + ' <b>' + sc[0] + '</b> : <b>' + sc[1] + '</b> ' + esc(c.b) + '</p>' +
        '<p class="muted">A közösen elrontott kérdések bekerültek a <a href="#/ismetles">Mai ismétlésbe</a>.</p>' +
        '<p><button type="button" class="btn primary" id="pb-again">🔁 Visszavágó</button> <a class="btn" href="#/parbaj">Másik téma</a></p></div>';
      main.querySelector('#pb-again').addEventListener('click', function () { duel(main, c, flip); });
    }
    paint();
  }

  /* ---------- kihívás linkkel ---------- */
  function challenge(main, c) {
    var qs = pick(c.g, c.n, c.s, true), i = 0, ok = 0, t0 = 0, name = S.store.get('parbaj.beall', {}).a || '';
    var g = c.g && S.testGroups().filter(function (x) { return x.id === c.g; })[0];
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/parbaj">Párbaj</a><span>›</span><span>Kihívás</span></nav>' +
      '<h1>🔗 Párbaj-kihívás</h1><div class="card pad"><p>' + (c.f ? '<b>' + esc(c.f) + '</b> kihívott egy párbajra! ' : '') + '<b>' + c.n + ' kérdés</b> · ' + esc(g ? g.icon + ' ' + g.title : 'vegyes téma') + '. Mindenki ugyanazt a kérdéssort kapja. Számít a pontszám, egyenlőségnél az idő.</p>' +
      '<label class="pw-f"><span>A neved</span><input id="ch-name" value="' + esc(name) + '"></label><p><button type="button" class="btn primary" id="ch-go">▶ Indulás</button></p></div>';
    main.querySelector('#ch-go').addEventListener('click', function () { name = main.querySelector('#ch-name').value || 'Játékos'; t0 = Date.now(); show(); });
    function show() {
      if (i >= qs.length) return fin();
      var x = qs[i];
      main.innerHTML = '<div class="card pad"><div class="row" style="justify-content:space-between"><small class="muted">' + (i + 1) + ' / ' + qs.length + '</small><small>✔ ' + ok + '</small></div>' +
        '<p class="ih-q">' + S.inline(x.it.q.q) + '</p><div class="pb-opts">' + x.opts.map(function (o, k) { return '<button type="button" class="pb-opt" data-k="' + k + '">' + S.inline(String(o.t)) + '</button>'; }).join('') + '</div></div>';
      main.querySelectorAll('.pb-opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var good = x.opts[+b.dataset.k].ok; if (good) ok++;
          if (S.srsRecord) S.srsRecord(x.it.q, good, { label: x.it.g.title + ' – ' + x.it.t.title, href: x.it.t.href });
          main.querySelectorAll('.pb-opt').forEach(function (z) { z.disabled = true; if (x.opts[+z.dataset.k].ok) z.classList.add('ok'); });
          if (!good) b.classList.add('bad');
          setTimeout(function () { i++; show(); }, 700);
        });
      });
    }
    function fin() {
      var secs = Math.round((Date.now() - t0) / 1000), txt = '⚔️ Párbaj (' + (g ? g.title : 'vegyes') + ', ' + c.n + ' kérdés): ' + name + ' – ' + ok + '/' + c.n + ' pont, ' + secs + ' mp';
      if (S.logActivity) S.logActivity('game', 'parbaj');
      main.innerHTML = '<div class="card pad pb-end"><div style="font-size:3rem">🏁</div><h1>' + ok + ' / ' + c.n + '</h1><p>Időd: <b>' + secs + ' mp</b></p>' +
        '<p>Küldd el az eredményed a kihívónak (vagy írd be a csoportba):</p><textarea readonly style="width:100%;min-height:60px">' + esc(txt) + '</textarea>' +
        '<p class="row" style="gap:6px;justify-content:center;flex-wrap:wrap"><button type="button" class="btn" id="ch-copy">📋 Másolás</button>' + (navigator.share ? '<button type="button" class="btn" id="ch-share">📤 Megosztás</button>' : '') +
        '<a class="btn primary" href="#/parbaj">⚔️ Saját kihívás</a></p></div>';
      main.querySelector('#ch-copy').addEventListener('click', function () { var t = main.querySelector('textarea'); t.select(); try { navigator.clipboard.writeText(t.value); } catch (e) { document.execCommand('copy'); } });
      var sh = main.querySelector('#ch-share'); if (sh) sh.addEventListener('click', function () { navigator.share({ text: txt + '\n' + location.href }).catch(function () {}); });
    }
    return true;
  }
})();
