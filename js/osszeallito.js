/* Tudásműhely – 🧩 Kérdés-összeállító: keresés az összes kérdés között (tantárgyak, kurzusok, modellek),
 * kiválogatás egy „kosárba”, majd gyakorló teszt, időre menő vizsga vagy nyomtatható dolgozat megoldókulccsal.
 * Útvonal: #/osszeallito?q=…  ·  A kosár: localStorage 'osszeallito.kosar' (kérdés-azonosítók). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var KEY = 'osszeallito.kosar';

  function index() {
    var all = [], byId = {};
    S.testGroups().forEach(function (g) {
      g.topics.forEach(function (t) {
        t.questions.forEach(function (q) {
          var it = { q: q, g: g, t: t, id: q.id || (g.id + '/' + t.id + '/' + S.norm(q.q).slice(0, 40)) };
          it.n = S.norm(q.q + ' ' + q.options.join(' ') + ' ' + (q.explain || ''));
          it.nt = S.norm(t.title + ' ' + g.title);
          all.push(it); byId[it.id] = it;
        });
      });
    });
    return { all: all, byId: byId };
  }
  function cart() { return S.store.get(KEY, []); }
  function setCart(c) { S.store.set(KEY, c); }

  S.pageOsszeallito = function (main, params) {
    var IX = index(), q = params && params.q || '', kind = params && params.k || '', grp = params && params.g || '';
    var kinds = []; S.testGroups().forEach(function (g) { if (kinds.indexOf(g.kind) < 0) kinds.push(g.kind); });
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/teszt">Tesztközpont</a><span>›</span><span>Kérdés-összeállító</span></nav>' +
      '<h1>🧩 Kérdés-összeállító</h1><p class="lead">Keress rá bármilyen témára az összes tantárgy, egyetemi kurzus és modell <b>' + IX.all.length + '</b> kérdése között, válogasd össze, amire szükséged van, és indíts belőle <b>gyakorló tesztet</b>, <b>időre menő vizsgát</b>, vagy nyomtass <b>dolgozatot megoldókulccsal</b>.</p>' +
      '<div class="osz-layout"><section class="card pad osz-search">' +
      '<div class="row" style="gap:8px;flex-wrap:wrap"><input type="search" id="oz-q" value="' + esc(q) + '" placeholder="Keresés: pl. Ohm, fotoszintézis, 1848, deriválás, ÁFA…" style="flex:1;min-width:220px">' +
      '<select id="oz-k"><option value="">Minden terület</option>' + kinds.map(function (k) { return '<option' + (k === kind ? ' selected' : '') + '>' + esc(k) + '</option>'; }).join('') + '</select>' +
      '<select id="oz-g"><option value="">Minden tantárgy / kurzus</option>' + S.testGroups().filter(function (g) { return !kind || g.kind === kind; }).map(function (g) {
        return '<option value="' + g.id + '"' + (g.id === grp ? ' selected' : '') + '>' + esc(g.icon + ' ' + g.title) + '</option>'; }).join('') + '</select></div>' +
      '<label class="muted" style="display:flex;gap:6px;align-items:center;margin-top:8px"><input type="checkbox" id="oz-ans"> mutasd a helyes választ is</label>' +
      '<div id="oz-res"></div></section>' +
      '<aside class="card pad osz-cart" id="oz-cart"></aside></div>';

    var resBox = main.querySelector('#oz-res'), cartBox = main.querySelector('#oz-cart'), showAns = false, last = [];
    function search() {
      var terms = S.norm(q).split(/\s+/).filter(Boolean);
      var list = IX.all.filter(function (it) {
        if (kind && it.g.kind !== kind) return false;
        if (grp && it.g.id !== grp) return false;
        return terms.every(function (t) { return it.n.indexOf(t) >= 0 || it.nt.indexOf(t) >= 0; });
      });
      if (!terms.length && !grp) list = [];
      return list;
    }
    function paintRes() {
      var list = search(); last = list;
      var c = cart();
      if (!list.length) {
        resBox.innerHTML = '<p class="muted" style="margin-top:14px">' + (q || grp ? 'Nincs találat. Próbálj rövidebb vagy más szót (az ékezet nem számít).' : 'Írj be egy kulcsszót, vagy válassz egy tantárgyat a listából.') + '</p>';
        return;
      }
      var groups = {}, order = [];
      list.forEach(function (it) { var k = it.g.id + '|' + it.t.id; if (!groups[k]) { groups[k] = []; order.push(k); } groups[k].push(it); });
      var shown = 0;
      resBox.innerHTML = '<div class="row osz-bar"><b>' + list.length + ' kérdés</b> ' + order.length + ' témában' +
        '<button type="button" class="btn sm primary" id="oz-addall">+ Mind a kosárba</button></div>' +
        order.map(function (k) {
          var its = groups[k], g = its[0].g, t = its[0].t;
          if (shown > 250) return '';
          return '<details class="osz-topic"' + (order.length <= 4 ? ' open' : '') + '><summary><span>' + esc(g.icon + ' ' + g.title) + ' › <b>' + esc(t.title) + '</b></span><small>' + its.length + ' kérdés</small>' +
            '<button type="button" class="btn sm" data-addtopic="' + esc(k) + '">+ téma</button></summary><ol>' +
            its.map(function (it) {
              shown++;
              var inC = c.indexOf(it.id) >= 0;
              return '<li><label><input type="checkbox" data-qid="' + esc(it.id) + '"' + (inC ? ' checked' : '') + '> ' + S.inline(it.q.q) + '</label>' +
                (showAns ? '<div class="osz-ans">✓ ' + S.inline(String(it.q.options[it.q.answer])) + '</div>' : '') + '</li>';
            }).join('') + '</ol></details>';
        }).join('') + (list.length > 250 ? '<p class="muted">Csak az első kb. 250 kérdés látszik – szűkítsd a keresést, vagy add hozzá mindet egyszerre.</p>' : '');
      resBox.querySelectorAll('[data-qid]').forEach(function (b) {
        b.addEventListener('change', function () {
          var c2 = cart(), i = c2.indexOf(b.dataset.qid);
          if (b.checked && i < 0) c2.push(b.dataset.qid); if (!b.checked && i >= 0) c2.splice(i, 1);
          setCart(c2); paintCart();
        });
      });
      resBox.querySelectorAll('[data-addtopic]').forEach(function (b) {
        b.addEventListener('click', function (e) { e.preventDefault(); add(groups[b.dataset.addtopic]); });
      });
      resBox.querySelector('#oz-addall').addEventListener('click', function () { add(list); });
    }
    function add(its) {
      var c = cart(); its.forEach(function (it) { if (c.indexOf(it.id) < 0) c.push(it.id); }); setCart(c); paintRes(); paintCart();
    }
    function items() { return cart().map(function (id) { return IX.byId[id]; }).filter(Boolean); }
    function paintCart() {
      var its = items(), byG = {};
      its.forEach(function (it) { byG[it.g.title] = (byG[it.g.title] || 0) + 1; });
      cartBox.innerHTML = '<h2 style="margin-top:0">🧺 Összeállítás</h2>' +
        (its.length ? '<p><b>' + its.length + '</b> kérdés kiválasztva</p><ul class="osz-sum">' + Object.keys(byG).map(function (k) { return '<li>' + esc(k) + ': ' + byG[k] + '</li>'; }).join('') + '</ul>' +
          '<label class="pw-f"><span>Cím (nyomtatáshoz)</span><input id="oz-title" type="text" value="' + esc(S.store.get('osszeallito.cim', 'Témazáró dolgozat')) + '"></label>' +
          '<label class="pw-f"><span>Hány kérdés legyen? (véletlenszerű válogatás)</span><input id="oz-n" type="number" min="1" max="' + its.length + '" value="' + Math.min(its.length, 20) + '"></label>' +
          '<label class="pw-f"><span>Időkorlát vizsgánál (perc, 0 = nincs)</span><input id="oz-min" type="number" min="0" max="240" value="0"></label>' +
          '<div class="osz-actions"><button type="button" class="btn primary" data-go="azonnali">⚡ Gyakorló teszt</button><button type="button" class="btn" data-go="vizsga">📝 Vizsga mód</button>' +
          '<button type="button" class="btn" id="oz-print">🖨 Dolgozat + megoldókulcs</button><button type="button" class="btn" id="oz-clear">🗑 Kosár ürítése</button></div>' +
          '<p class="muted" style="font-size:.85rem">A kosár megmarad ezen a gépen, a következő alkalommal is folytathatod.</p>'
          : '<p class="muted">Még üres. Pipáld ki a kérdéseket a találatok között, vagy add hozzá egy egész témát a „+ téma” gombbal.</p>');
      if (!its.length) return;
      function pick() { var n = Math.max(1, Math.min(its.length, +cartBox.querySelector('#oz-n').value || its.length)); return S.shuffle(its.slice()).slice(0, n); }
      cartBox.querySelector('#oz-title').addEventListener('input', function (e) { S.store.set('osszeallito.cim', e.target.value); });
      cartBox.querySelectorAll('[data-go]').forEach(function (b) {
        b.addEventListener('click', function () {
          var mins = +cartBox.querySelector('#oz-min').value || 0;
          S.runTest(main, pick(), b.dataset.go, { label: cartBox.querySelector('#oz-title').value || 'Saját összeállítás', minutes: b.dataset.go === 'vizsga' && mins ? mins : 0, backHref: '#/osszeallito', backLabel: 'Kérdés-összeállító' });
        });
      });
      cartBox.querySelector('#oz-print').addEventListener('click', function () { S.printSheet(pick(), cartBox.querySelector('#oz-title').value); });
      cartBox.querySelector('#oz-clear').addEventListener('click', function () { if (confirm('Biztosan üríted a kosarat?')) { setCart([]); paintRes(); paintCart(); } });
    }
    function go() { location.hash = '#/osszeallito?' + [q ? 'q=' + encodeURIComponent(q) : '', kind ? 'k=' + encodeURIComponent(kind) : '', grp ? 'g=' + grp : ''].filter(Boolean).join('&'); }
    var tmr;
    main.querySelector('#oz-q').addEventListener('input', function (e) { q = e.target.value; clearTimeout(tmr); tmr = setTimeout(function () { paintRes(); history.replaceState(null, '', '#/osszeallito?q=' + encodeURIComponent(q) + (grp ? '&g=' + grp : '')); }, 250); });
    main.querySelector('#oz-k').addEventListener('change', function (e) { kind = e.target.value; grp = ''; go(); });
    main.querySelector('#oz-g').addEventListener('change', function (e) { grp = e.target.value; go(); });
    S.searchableSelect(main.querySelector('#oz-g'), '🔎 Keresd a tantárgyat vagy kurzust…');
    main.querySelector('#oz-ans').addEventListener('change', function (e) { showAns = e.target.checked; paintRes(); });
    paintRes(); paintCart();
    return true;
  };
})();
