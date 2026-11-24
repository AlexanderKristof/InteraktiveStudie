/* Tudásműhely – „💡 Tudtad?” érdekes tények.
 * Adat: STUDIE.addFacts([{ id, cat, q: 'A meglepő állítás', why: 'Magyarázat (jelölőnyelv)',
 *        links: ['modell:sziv', 'modell:sziv#billentyuk', 'lecke:biologia/keringes-legzes', 'tantargy:fizika', 'szakszo:anatomia/ekg'] }])
 * Megjelenik: saját oldalon (#/tudtad), a felfedező alkatrészeinél külön fülön, a leckék alján és a kezdőlapon („A nap ténye”). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  S.facts = [];
  S.addFacts = function (arr) { (arr || []).forEach(function (f) { S.facts.push(f); }); };

  S.FACT_CATS = [
    ['allatok', '🦆 Állatok'], ['emberi-test', '🫀 Emberi test'], ['novenyek', '🌿 Növények és természet'],
    ['fizika', '⚡ Fizika'], ['kemia', '🧪 Kémia'], ['technika', '⚙️ Technika és járművek'], ['informatika', '💻 Számítógépek'],
    ['vilagur', '🪐 Világűr'], ['fold', '🌍 Föld és időjárás'], ['tortenelem', '🏛️ Történelem'], ['matek', '🔢 Matematika'],
    ['nyelv', '📖 Nyelv és irodalom'], ['muveszet', '🎵 Zene és művészet'], ['szakmak', '🛠️ Szakmák'], ['etel', '🍳 Ételek és konyha'], ['penz', '💰 Pénz és társadalom']
  ];
  function catTitle(c) { var x = S.FACT_CATS.filter(function (k) { return k[0] === c; })[0]; return x ? x[1] : '💡 Egyéb'; }
  S.factCatTitle = catTitle;

  function seen() { return S.store.get('tudtad.seen', {}); }
  function markSeen(id) { var s = seen(); if (!s[id]) { s[id] = 1; S.store.set('tudtad.seen', s); } }

  /* Hivatkozás → link a kapcsolódó tartalomra */
  function linkOf(ref) {
    var m = /^(\w+):(.+)$/.exec(ref); if (!m) return null;
    var k = m[1], v = m[2];
    if (k === 'modell') {
      var mp = v.split('#'), mod = S.models[mp[0]]; if (!mod) return null;
      var part = mp[1] && mod.parts.filter(function (p) { return p.id === mp[1]; })[0];
      return { icon: mod.icon, label: mod.title + (part ? ': ' + part.name : ''), href: '#/felfedezo/' + mod.id + (part ? '?resz=' + part.id : '') };
    }
    if (k === 'lecke') {
      var lp = v.split('/'), s = S.subjects.filter(function (x) { return x.id === lp[0]; })[0];
      var l = s && s.lessons.filter(function (x) { return x.id === lp[1]; })[0];
      return l ? { icon: s.icon, label: l.title, href: '#/lecke/' + s.id + '/' + l.id } : null;
    }
    if (k === 'tantargy') {
      var t = S.subjects.filter(function (x) { return x.id === v; })[0];
      return t ? { icon: t.icon, label: t.title, href: '#/tantargy/' + t.id } : null;
    }
    if (k === 'szakszo') {
      var r = S.resolveTerm && S.resolveTerm(v);
      return r ? { icon: r.c.icon, label: r.t.term, href: r.href } : null;
    }
    return null;
  }
  S.factLink = linkOf;

  /* Tények egy adott tartalomhoz. ref: 'modell:sziv', 'modell:sziv#bal-kamra', 'lecke:biologia/x', 'tantargy:biologia' */
  S.factsFor = function (ref, opts) {
    opts = opts || {};
    return S.facts.filter(function (f) {
      return (f.links || []).some(function (l) {
        return l === ref || (opts.prefix && l.indexOf(ref + '#') === 0) ||
          (opts.subject && (l === 'tantargy:' + opts.subject || l.indexOf('lecke:' + opts.subject + '/') === 0));
      });
    });
  };

  /* Egy tény kártyája: állítás → „Miért?” lenyitva a magyarázat */
  S.factCard = function (f, o) {
    o = o || {};
    var links = (f.links || []).map(linkOf).filter(Boolean).filter(function (x) { return !o.skipHref || x.href.split('?')[0] !== o.skipHref; });
    return '<details class="fact-card" data-fact="' + esc(f.id) + '"' + (o.open ? ' open' : '') + '>' +
      '<summary><span class="fc-cat">' + esc(catTitle(f.cat)) + '</span><b>💡 Tudtad, hogy ' + S.inline(f.q) + '</b><span class="fc-why">Miért? ▾</span></summary>' +
      '<div class="fc-body">' + S.md(f.why) +
      (links.length ? '<div class="fc-links">' + links.map(function (x) { return '<a class="chip" href="' + x.href + '">' + x.icon + ' ' + esc(x.label) + '</a>'; }).join('') + '</div>' : '') +
      '</div></details>';
  };
  S.bindFacts = function (root) {
    root.querySelectorAll('details.fact-card').forEach(function (d) {
      d.addEventListener('toggle', function () { if (d.open) markSeen(d.dataset.fact); });
    });
  };
  /* Rövid doboz (leckéhez, modellhez) */
  S.factBox = function (list, title, more) {
    if (!list.length) return '';
    return '<section class="fact-box"><h2>' + (title || '💡 Tudtad?') + '</h2>' + list.map(function (f) { return S.factCard(f); }).join('') +
      (more ? '<p style="margin:10px 0 0"><a href="#/tudtad">Még több érdekesség →</a></p>' : '') + '</section>';
  };

  /* A nap ténye: dátum szerint mindenkinek ugyanaz */
  S.factOfDay = function () {
    if (!S.facts.length) return null;
    var d = new Date(), n = d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate();
    return S.facts[(n * 7919) % S.facts.length];
  };

  S.pageTudtad = function (main, params) {
    var cat = params && params.kat || '', q = '', onlyNew = false;
    var counts = {};
    S.facts.forEach(function (f) { counts[f.cat] = (counts[f.cat] || 0) + 1; });
    var cats = S.FACT_CATS.filter(function (c) { return counts[c[0]]; });
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Tudtad?</span></nav>' +
      '<h1>💡 Tudtad?</h1><p class="lead">Meglepő, de igaz tények mindenről, amit tanulsz. Előbb tippeld meg, miért igaz, aztán kattints a <b>Miért?</b> gombra!</p>' +
      '<div class="card pad fact-tools"><div class="row" style="flex-wrap:wrap;gap:8px">' +
      '<input type="search" id="ft-q" placeholder="Keresés a tények között…" style="flex:1;min-width:200px">' +
      '<button type="button" class="btn primary" id="ft-rand">🎲 Véletlen tény</button>' +
      '<label class="muted" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="ft-new"> csak az új (még nem olvasott)</label></div>' +
      '<div class="chips" id="ft-cats" style="margin-top:10px"><button type="button" class="chip" data-cat="">Mind (' + S.facts.length + ')</button>' +
      cats.map(function (c) { return '<button type="button" class="chip" data-cat="' + c[0] + '">' + c[1] + ' (' + counts[c[0]] + ')</button>'; }).join('') + '</div>' +
      '<p class="muted" id="ft-stat" style="margin:10px 0 0"></p></div>' +
      '<div id="ft-list" class="fact-list"></div>';
    var list = main.querySelector('#ft-list');
    function paint() {
      var s = seen(), nq = S.norm(q);
      main.querySelectorAll('#ft-cats [data-cat]').forEach(function (b) { b.classList.toggle('on', b.dataset.cat === cat); });
      var items = S.facts.filter(function (f) {
        return (!cat || f.cat === cat) && (!onlyNew || !s[f.id]) && (!nq || S.norm(f.q + ' ' + f.why).indexOf(nq) >= 0);
      });
      var read = S.facts.filter(function (f) { return s[f.id]; }).length;
      main.querySelector('#ft-stat').textContent = 'Eddig ' + read + ' / ' + S.facts.length + ' tényt olvastál el. Itt most ' + items.length + ' látszik.';
      if (!cat && !nq && !onlyNew) {
        list.innerHTML = cats.map(function (c) {
          var fs = items.filter(function (f) { return f.cat === c[0]; });
          return '<section class="fact-sec"><h2>' + c[1] + '</h2>' + fs.map(function (f) { return S.factCard(f); }).join('') + '</section>';
        }).join('');
      } else list.innerHTML = items.length ? items.map(function (f) { return S.factCard(f); }).join('') : '<p class="muted">Nincs találat.</p>';
      S.bindFacts(list);
    }
    main.querySelector('#ft-cats').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]'); if (!b) return; cat = b.dataset.cat; paint();
    });
    main.querySelector('#ft-q').addEventListener('input', function (e) { q = e.target.value; paint(); });
    main.querySelector('#ft-new').addEventListener('change', function (e) { onlyNew = e.target.checked; paint(); });
    function single(f, label, rnd) {
      cat = ''; q = ''; onlyNew = false; main.querySelector('#ft-q').value = ''; main.querySelector('#ft-new').checked = false;
      list.innerHTML = '<p class="muted">' + label + '</p>' + S.factCard(f, { open: !rnd }) + '<p><button type="button" class="btn" id="ft-all">Összes tény</button></p>';
      S.bindFacts(list);
      list.querySelector('#ft-all').addEventListener('click', paint);
      main.querySelector('#ft-cats').querySelectorAll('.on').forEach(function (b) { b.classList.remove('on'); });
      if (!rnd) markSeen(f.id);
    }
    main.querySelector('#ft-rand').addEventListener('click', function () {
      var s = seen(), pool = S.facts.filter(function (f) { return !s[f.id]; });
      if (!pool.length) pool = S.facts;
      single(pool[Math.floor(Math.random() * pool.length)], '🎲 A véletlen tény:', true);
    });
    var want = params && params.f && S.facts.filter(function (f) { return f.id === params.f; })[0];
    if (want) single(want, '🔎 A keresett érdekesség:'); else paint();
    return true;
  };
})();
