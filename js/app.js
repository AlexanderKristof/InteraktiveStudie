/* Tudásműhely – alkalmazás: útválasztás, oldalak, keresés, kvíz, haladás. */
(function () {
  'use strict';
  var S = window.STUDIE;
  var esc = S.esc, md = S.md, norm = S.norm;
  var main = document.getElementById('main');
  var LEVELS = { 1: ['kezdő', 'l1'], 2: ['haladó', 'l2'], 3: ['profi', 'l3'] };

  /* ---------- haladás ---------- */
  var progress = S.store.get('progress', {});
  function lessonKey(sid, lid) { return sid + '/' + lid; }
  function isDone(sid, lid) { var p = progress[lessonKey(sid, lid)]; return !!(p && p.done); }
  function setProgress(key, patch) {
    progress[key] = Object.assign({}, progress[key] || {}, patch);
    S.store.set('progress', progress);
  }
  function subjectStats(s) {
    var done = s.lessons.filter(function (l) { return isDone(s.id, l.id); }).length;
    return { done: done, total: s.lessons.length, pct: s.lessons.length ? Math.round(done / s.lessons.length * 100) : 0 };
  }
  S.progress = { setProgress: setProgress, get: function (k) { return progress[k]; } };

  function subjectById(id) { return S.subjects.filter(function (s) { return s.id === id; })[0]; }

  /* ---------- kvíz (leckékhez és modellekhez is) ---------- */
  S.renderQuiz = function (box, quiz, key) {
    var order = S.shuffle(quiz);
    var i = 0, score = 0;
    function show() {
      if (i >= order.length) return finish();
      var q = order[i];
      var opts = S.shuffle(q.options.map(function (t, k) { return { t: t, ok: k === q.answer }; }));
      box.innerHTML =
        '<div class="progress">' + (i + 1) + ' / ' + order.length + ' kérdés</div>' +
        '<div class="q">' + S.inline(q.q) + '</div>' +
        '<div class="opts">' + opts.map(function (o, k) {
          return '<button type="button" class="opt" data-k="' + k + '">' + S.inline(o.t) + '</button>';
        }).join('') + '</div><div class="after"></div>';
      box.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var picked = opts[+b.dataset.k];
          if (picked.ok) score++;
          box.querySelectorAll('.opt').forEach(function (x) {
            x.disabled = true;
            if (opts[+x.dataset.k].ok) x.classList.add('right');
          });
          if (!picked.ok) b.classList.add('wrong');
          box.querySelector('.after').innerHTML =
            '<div class="explain"><b>' + (picked.ok ? '✔ Helyes!' : '✘ Nem egészen.') + '</b> ' + S.inline(q.explain || '') + '</div>' +
            '<div class="row" style="margin-top:12px"><button type="button" class="btn primary next">' +
            (i + 1 < order.length ? 'Következő kérdés →' : 'Eredmény') + '</button></div>';
          var nx = box.querySelector('.next');
          nx.addEventListener('click', function () { i++; show(); });
          nx.focus();
        });
      });
    }
    function finish() {
      var pct = Math.round(score / order.length * 100);
      var best = 0;
      if (key) {
        var p = progress[key] || {};
        best = Math.max(p.quizBest || 0, pct);
        setProgress(key, { quizBest: best });
      }
      var msg = pct === 100 ? 'Hibátlan! Mehetsz tovább.' : pct >= 70 ? 'Szép munka! Egy kis ismétlés és meglesz a 100%.' : 'Érdemes még egyszer átolvasni a leckét, aztán újra próbálni.';
      box.innerHTML = '<div class="score">' + score + ' / ' + order.length + '</div><p>' + msg + '</p>' +
        (key ? '<p class="muted">Legjobb eredményed: ' + best + '%</p>' : '') +
        '<button type="button" class="btn retry">↻ Újra</button>';
      box.querySelector('.retry').addEventListener('click', function () { order = S.shuffle(quiz); i = 0; score = 0; show(); });
    }
    show();
  };

  /* ---------- widget beillesztése ---------- */
  function mountWidgets(root) {
    root.querySelectorAll('[data-widget]').forEach(function (el) {
      var spec = JSON.parse(el.dataset.widget);
      var fn = S.widgets[spec.type];
      if (!fn) { el.innerHTML = '<p class="muted">Ismeretlen interaktív elem: ' + esc(spec.type) + '</p>'; return; }
      try { fn(el, spec.options || {}); }
      catch (e) { el.innerHTML = '<p class="muted">Hiba az interaktív elem betöltésekor.</p>'; if (window.console) console.error(e); }
    });
  }
  S.mountWidgets = mountWidgets;
  function widgetSlot(w) { return '<div class="widget card" data-widget="' + esc(JSON.stringify(w)) + '"></div>'; }

  /* ---------- oldalak ---------- */
  function setNav(which) {
    document.querySelectorAll('[data-nav]').forEach(function (a) { a.classList.toggle('active', a.dataset.nav === which); });
  }
  function title(t) { document.title = t ? t + ' – Tudásműhely' : 'Tudásműhely – interaktív tanulás'; }

  function pageHome() {
    setNav('home'); title('');
    var last = S.store.get('last', null);
    var lastHtml = '';
    if (last) {
      var ls = subjectById(last.s);
      var ll = ls && ls.lessons.filter(function (l) { return l.id === last.l; })[0];
      if (ll) lastHtml = '<a class="card tile" style="--tile:' + ls.color + ';margin-top:20px;flex-direction:row;align-items:center" href="#/lecke/' + ls.id + '/' + ll.id + '">' +
        '<span class="ico">' + ls.icon + '</span><span><small class="muted">Folytasd, ahol abbahagytad</small><h3 style="margin:0">' + esc(ll.title) + '</h3><p>' + esc(ls.title) + '</p></span></a>';
    }
    var models = Object.keys(S.models).map(function (k) { return S.models[k]; });
    main.innerHTML =
      '<section class="hero"><h1>Tanulj bármit, a saját tempódban.</h1>' +
      '<p class="lead">Interaktív leckék, kísérletek és kvízek, és egy felfedező, ami alkatrészeire szedve mutatja meg, mi miből áll és hogyan készül. Letöltés után internet nélkül is működik.</p>' +
      '<form class="search-big" id="hero-search"><input type="search" name="q" placeholder="Mi érdekel? pl. processzor, atom, Ohm-törvény…" aria-label="Keresés"><button class="btn primary" type="submit">Keresés</button></form>' +
      '<div class="chips">' + ['processzor', 'atom', 'akkumulátor', 'Ohm', 'FI relé', 'Pitagorasz', 'négyütemű motor', 'honfoglalás'].map(function (c) {
        return '<a class="chip" href="#/kereses?q=' + encodeURIComponent(c) + '">' + esc(c) + '</a>';
      }).join('') + '</div>' + lastHtml + '</section>' +
      '<div class="section-title"><h2>Tantárgyak és szakmák</h2><span class="muted">' + S.subjects.length + ' terület</span></div>' +
      '<div class="grid">' + S.subjects.map(function (s) {
        var st = subjectStats(s);
        return '<a class="card tile" style="--tile:' + s.color + '" href="#/tantargy/' + s.id + '">' +
          '<span class="ico">' + s.icon + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.description) + '</p>' +
          '<span class="meta">' + st.total + ' lecke · ' + st.done + ' kész</span><span class="bar"><i style="width:' + st.pct + '%"></i></span></a>';
      }).join('') + '</div>' +
      '<div class="section-title"><h2>Mi miből áll?</h2><a href="#/felfedezo">Összes →</a></div>' +
      '<p class="muted" style="margin-top:-6px">Szedd szét, kattints rá, nézz bele. Minden alkatrésznél megtudod, mi az, miből van és hogyan gyártják.</p>' +
      '<div class="grid">' + models.slice(0, 4).map(modelTile).join('') + '</div>';
    main.querySelector('#hero-search').addEventListener('submit', function (e) {
      e.preventDefault();
      var q = e.target.q.value.trim();
      if (q) location.hash = '#/kereses?q=' + encodeURIComponent(q);
    });
  }

  function modelTile(m) {
    return '<a class="card tile" style="--tile:' + (m.color || '#2357d9') + '" href="#/felfedezo/' + m.id + '">' +
      '<span class="ico">' + m.icon + '</span><h3>' + esc(m.title) + '</h3><p>' + esc(m.summary) + '</p>' +
      '<span class="meta">' + m.parts.length + ' alkatrész · ' + (m.steps ? m.steps.length + ' gyártási lépés' : '') + '</span></a>';
  }

  function pageSubject(id) {
    var s = subjectById(id);
    if (!s) return notFound();
    setNav('home'); title(s.title);
    var st = subjectStats(s);
    main.innerHTML =
      '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>' + esc(s.title) + '</span></nav>' +
      '<div class="subject-head" style="--tile:' + s.color + '"><span class="ico">' + s.icon + '</span><div><h1>' + esc(s.title) + '</h1>' +
      '<p class="lead" style="margin:0">' + esc(s.description) + '</p></div></div>' +
      (s.intro ? '<div class="lesson-body">' + md(s.intro) + '</div>' : '') +
      '<div class="row" style="--tile:' + s.color + ';margin-top:10px"><span class="muted">' + st.done + ' / ' + st.total + ' lecke kész</span><span class="bar" style="flex:1;max-width:260px"><i style="width:' + st.pct + '%"></i></span></div>' +
      '<ol class="lesson-list" style="--tile:' + s.color + '">' + s.lessons.map(function (l, i) {
        var d = isDone(s.id, l.id), lv = LEVELS[l.level || 1];
        var p = progress[lessonKey(s.id, l.id)];
        return '<li><a class="card" href="#/lecke/' + s.id + '/' + l.id + '"><span class="num' + (d ? ' done' : '') + '">' + (d ? '✓' : i + 1) + '</span>' +
          '<span class="txt"><b>' + esc(l.title) + '</b><span>' + esc(l.summary) + '</span></span>' +
          '<span class="row" style="flex:none;gap:6px"><span class="badge ' + lv[1] + '">' + lv[0] + '</span>' +
          (p && p.quizBest != null ? '<span class="badge">kvíz ' + p.quizBest + '%</span>' : '') + '</span></a></li>';
      }).join('') + '</ol>';
  }

  function pageLesson(sid, lid) {
    var s = subjectById(sid);
    var idx = s ? s.lessons.findIndex(function (l) { return l.id === lid; }) : -1;
    if (idx < 0) return notFound();
    var l = s.lessons[idx], key = lessonKey(sid, lid), lv = LEVELS[l.level || 1];
    setNav('home'); title(l.title);
    S.store.set('last', { s: sid, l: lid });
    var prev = s.lessons[idx - 1], next = s.lessons[idx + 1];
    var secs = l.sections || [];
    var body = secs.map(function (sec, i) {
      return '<section id="sec-' + i + '">' + (sec.title ? '<h2>' + esc(sec.title) + '</h2>' : '') + md(sec.text) +
        (sec.tip ? '<div class="note tip"><b class="t">Jó tudni</b>' + md(sec.tip) + '</div>' : '') +
        (sec.warn ? '<div class="note warn"><b class="t">⚠ Figyelem</b>' + md(sec.warn) + '</div>' : '') +
        (sec.widget ? widgetSlot(sec.widget) : '') + '</section>';
    }).join('');
    var widgets = (l.widgets || []).map(widgetSlot).join('');
    var models = (l.models || []).filter(function (m) { return S.models[m]; });
    main.innerHTML =
      '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/tantargy/' + s.id + '">' + esc(s.title) + '</a><span>›</span><span>' + (idx + 1) + '. lecke</span></nav>' +
      '<div class="lesson"><article class="lesson-body">' +
      '<div class="row" style="gap:8px;margin-bottom:6px"><span class="badge ' + lv[1] + '">' + lv[0] + '</span>' + (l.minutes ? '<span class="badge">⏱ kb. ' + l.minutes + ' perc</span>' : '') + '</div>' +
      '<h1>' + esc(l.title) + '</h1><p class="lead">' + esc(l.summary) + '</p>' +
      body + widgets +
      (models.length ? '<h2>Nézz bele!</h2><p class="muted">Ehhez a leckéhez kapcsolódó szétszedhető modellek:</p><div class="related">' + models.map(function (m) {
        return '<a class="btn" href="#/felfedezo/' + m + '">' + S.models[m].icon + ' ' + esc(S.models[m].title) + '</a>';
      }).join('') + '</div>' : '') +
      (l.quiz && l.quiz.length ? '<h2 id="kviz">Ellenőrizd magad!</h2><div class="quiz card" id="quiz"></div>' : '') +
      '<div class="row" style="margin-top:22px"><button type="button" class="btn" id="done"></button></div>' +
      '<nav class="pager">' + (prev ? '<a class="btn" href="#/lecke/' + s.id + '/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="btn primary" href="#/lecke/' + s.id + '/' + next.id + '">' + esc(next.title) + ' →</a>' : '<a class="btn" href="#/tantargy/' + s.id + '">Vissza a tantárgyhoz</a>') + '</nav>' +
      '</article><aside class="toc card pad"><b>Tartalom</b><ol>' + secs.map(function (sec, i) {
        return sec.title ? '<li><a href="#sec-' + i + '" data-jump="sec-' + i + '">' + esc(sec.title) + '</a></li>' : '';
      }).join('') + (l.quiz ? '<li><a href="#kviz" data-jump="kviz">Kvíz</a></li>' : '') + '</ol></aside></div>';

    var doneBtn = main.querySelector('#done');
    function paintDone() {
      var d = isDone(sid, lid);
      doneBtn.textContent = d ? '✓ Megtanultam (visszavonás)' : 'Megjelölöm: megtanultam';
      doneBtn.classList.toggle('on', d);
    }
    doneBtn.addEventListener('click', function () { setProgress(key, { done: !isDone(sid, lid) }); paintDone(); });
    paintDone();
    // A tartalomjegyzék ugrásai ne írják át az útvonalat.
    main.querySelectorAll('[data-jump]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var t = document.getElementById(a.dataset.jump);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    mountWidgets(main);
    if (l.quiz && l.quiz.length) S.renderQuiz(main.querySelector('#quiz'), l.quiz, key);
  }

  function pageExplorerList() {
    setNav('felfedezo'); title('Mi miből áll?');
    var models = Object.keys(S.models).map(function (k) { return S.models[k]; });
    var cats = {};
    models.forEach(function (m) { (cats[m.category || 'Egyéb'] = cats[m.category || 'Egyéb'] || []).push(m); });
    var chains = S.chains || [];
    main.innerHTML =
      '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Mi miből áll?</span></nav>' +
      '<h1>Mi miből áll?</h1><p class="lead">Válassz egy tárgyat, szedd szét, és kattints az alkatrészeire. Ahol egy alkatrész mellett „Nézz bele” gomb van, ott egy szinttel lejjebb is mehetsz, egészen az atomokig.</p>' +
      (chains.length ? '<div class="card pad" style="margin:16px 0"><b>Utazás a mélybe</b>' + chains.map(function (c) {
        return '<div class="chain">' + c.map(function (id, i) {
          var m = S.models[id]; if (!m) return '';
          return (i ? '<span class="arrow">→</span>' : '') + '<a class="chip" href="#/felfedezo/' + c.slice(0, i + 1).join('/') + '">' + m.icon + ' ' + esc(m.title) + '</a>';
        }).join('') + '</div>';
      }).join('') + '</div>' : '') +
      Object.keys(cats).map(function (c) {
        return '<div class="section-title"><h2>' + esc(c) + '</h2></div><div class="grid">' + cats[c].map(modelTile).join('') + '</div>';
      }).join('');
  }

  function pageExplorer(ids) {
    var m = S.models[ids[ids.length - 1]];
    if (!m) return notFound();
    setNav('felfedezo'); title(m.title);
    S.renderModel(main, m, ids);
  }

  /* ---------- keresés ---------- */
  var index = null;
  function buildIndex() {
    index = [];
    S.subjects.forEach(function (s) {
      index.push({ kind: 'Tantárgy', icon: s.icon, title: s.title, sub: s.description, href: '#/tantargy/' + s.id, text: s.description + ' ' + (s.intro || '') });
      s.lessons.forEach(function (l) {
        var txt = [l.summary, (l.tags || []).join(' ')].concat((l.sections || []).map(function (x) { return (x.title || '') + ' ' + (x.text || '') + ' ' + (x.tip || '') + ' ' + (x.warn || ''); })).join(' ');
        index.push({ kind: 'Lecke', icon: s.icon, title: l.title, sub: s.title + ' · ' + l.summary, href: '#/lecke/' + s.id + '/' + l.id, text: txt, tags: (l.tags || []).join(' ') });
      });
    });
    Object.keys(S.models).forEach(function (k) {
      var m = S.models[k];
      index.push({ kind: 'Felfedező', icon: m.icon, title: m.title, sub: m.summary, href: '#/felfedezo/' + m.id, text: m.summary + ' ' + (m.intro || '') + ' ' + (m.keywords || ''), tags: m.keywords || '' });
      m.parts.forEach(function (p) {
        index.push({ kind: 'Alkatrész', icon: m.icon, title: p.name, sub: m.title + ' · ' + p.what, href: '#/felfedezo/' + m.id + '?resz=' + p.id, text: [p.what, p.madeOf, p.how, p.fact].join(' ') });
      });
    });
    index.forEach(function (it) { it.nt = norm(it.title); it.nx = norm(it.text); it.ng = norm(it.tags || ''); });
  }
  function search(q) {
    if (!index) buildIndex();
    var terms = norm(q).split(/\s+/).filter(function (t) { return t.length > 0; });
    if (!terms.length) return [];
    var out = [];
    index.forEach(function (it) {
      var sc = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i], s = 0;
        if (it.nt === t) s += 40;
        if (it.nt.indexOf(t) === 0) s += 20;
        if (it.nt.indexOf(t) >= 0) s += 15;
        if (it.ng.indexOf(t) >= 0) s += 8;
        if (it.nx.indexOf(t) >= 0) s += 3;
        if (!s) return; // minden szónak szerepelnie kell
        sc += s;
      }
      if (it.kind === 'Lecke' || it.kind === 'Felfedező') sc += 2;
      out.push({ it: it, sc: sc });
    });
    out.sort(function (a, b) { return b.sc - a.sc; });
    return out.map(function (o) { return o.it; });
  }
  function mark(text, q) {
    var t = esc(text);
    norm(q).split(/\s+/).filter(Boolean).forEach(function (w) {
      // ékezetfüggetlen kiemelés: a normalizált szövegben keresünk, az eredetiben jelölünk
      var src = norm(t), i = src.indexOf(w);
      if (i >= 0 && w.length > 1) t = t.slice(0, i) + '<mark>' + t.slice(i, i + w.length) + '</mark>' + t.slice(i + w.length);
    });
    return t;
  }
  function resultRow(it, q, hi) {
    return '<a class="sr' + (hi ? ' hi' : '') + '" href="' + it.href + '"><span class="ico">' + it.icon + '</span><span class="t"><b>' + mark(it.title, q) + '</b><span>' + esc(it.sub) + '</span></span><span class="badge kind">' + it.kind + '</span></a>';
  }
  function pageSearch(q) {
    setNav(''); title('Keresés: ' + q);
    var res = search(q);
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Keresés</span></nav>' +
      '<h1>Keresés: „' + esc(q) + '”</h1><p class="muted">' + res.length + ' találat</p>' +
      (res.length ? '<div class="card results">' + res.slice(0, 60).map(function (it) { return resultRow(it, q); }).join('') + '</div>'
        : '<div class="card empty"><p>Erre még nincs tananyag.</p><p>Próbáld másképp: rövidebb szóval, vagy nézz körül a <a href="#/">tantárgyak</a> és a <a href="#/felfedezo">felfedező</a> között.</p></div>');
    var input = document.getElementById('search');
    if (document.activeElement !== input) input.value = q;
  }

  function pageAbout() {
    setNav(''); title('Letöltés és használat');
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Letöltés</span></nav>' +
      '<article class="lesson-body"><h1>Hogyan töltsem le és használjam?</h1>' + md(
        'A Tudásműhely egy egyszerű weboldal, ami **teljesen a saját gépeden fut**: nem kell hozzá internet, regisztráció vagy telepítés.\n\n' +
        '**1. lehetőség: egyetlen fájl.** Töltsd le a `tudasmuhely-offline.html` fájlt (a `dist` mappában található), és nyisd meg dupla kattintással bármilyen böngészőben. Pendrive-ra is másolható, e-mailben is elküldhető.\n\n' +
        '**2. lehetőség: a teljes mappa.** Töltsd le a projektet ZIP-ként (GitHubon: Code → Download ZIP), csomagold ki, és nyisd meg az `index.html` fájlt.\n\n' +
        '**3. lehetőség: telepítés alkalmazásként.** Ha a tananyag egy weboldalon van közzétéve (például az iskola szerverén), a böngésző menüjében válaszd a „Telepítés” vagy „Hozzáadás a kezdőképernyőhöz” lehetőséget. Az első megnyitás után offline is működik, telefonon is.\n\n' +
        'A haladásod (elvégzett leckék, kvízeredmények) a böngésződben tárolódik ezen az eszközön. Ha másik gépre ülsz, ott elölről indul.\n\n' +
        'A tananyag bővíthető: minden tantárgy és modell egy-egy külön fájl a `data` mappában. A leírás a `README.md` fájlban van.') +
      '<div class="row" style="margin-top:12px"><button class="btn" id="reset" type="button">Haladás törlése ezen az eszközön</button></div></article>';
    main.querySelector('#reset').addEventListener('click', function () {
      if (confirm('Biztosan törlöd az összes elvégzett leckét és kvízeredményt?')) {
        progress = {}; S.store.set('progress', progress); S.store.set('last', null); location.hash = '#/';
      }
    });
  }

  function notFound() {
    title('Nem található');
    main.innerHTML = '<div class="empty card"><h1>Ezt nem találjuk</h1><p>Lehet, hogy elírás van a címben.</p><a class="btn primary" href="#/">Vissza a kezdőlapra</a></div>';
  }

  /* ---------- útválasztó ---------- */
  var lastPath = null;
  function route() {
    var h = location.hash.slice(1) || '/';
    if (h.indexOf('/') !== 0) return; // pl. #sec-1 belső ugrás
    var qi = h.indexOf('?');
    var path = qi >= 0 ? h.slice(0, qi) : h;
    var params = {};
    if (qi >= 0) h.slice(qi + 1).split('&').forEach(function (kv) {
      var p = kv.split('='); params[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' '));
    });
    var seg = path.split('/').filter(Boolean).map(decodeURIComponent);
    S.params = params;
    document.body.setAttribute('data-page', seg[0] || 'home');
    closePop();
    if (!seg.length) pageHome();
    else if (seg[0] === 'tantargy') pageSubject(seg[1]);
    else if (seg[0] === 'lecke') pageLesson(seg[1], seg[2]);
    else if (seg[0] === 'felfedezo' && seg.length === 1) pageExplorerList();
    else if (seg[0] === 'felfedezo') pageExplorer(seg.slice(1));
    else if (seg[0] === 'kereses') pageSearch(params.q || '');
    else if (seg[0] === 'nevjegy') pageAbout();
    else notFound();
    if (path !== lastPath) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
    lastPath = path;
  }

  /* ---------- fejléc keresője ---------- */
  var input = document.getElementById('search');
  var pop = document.getElementById('search-pop');
  var hi = -1, cur = [];
  function closePop() { pop.hidden = true; hi = -1; }
  function paintPop() {
    var q = input.value.trim();
    if (!q) return closePop();
    cur = search(q).slice(0, 8);
    pop.innerHTML = cur.length ? cur.map(function (it, i) { return resultRow(it, q, i === hi); }).join('') +
      '<a class="sr" href="#/kereses?q=' + encodeURIComponent(q) + '"><span class="ico">🔎</span><span class="t"><b>Összes találat</b></span></a>'
      : '<div class="empty" style="padding:14px">Nincs találat erre: „' + esc(q) + '”</div>';
    pop.hidden = false;
  }
  input.addEventListener('input', function () { hi = -1; paintPop(); });
  input.addEventListener('focus', paintPop);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { hi = Math.min(hi + 1, cur.length - 1); paintPop(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { hi = Math.max(hi - 1, -1); paintPop(); e.preventDefault(); }
    else if (e.key === 'Escape') { closePop(); input.blur(); }
    else if (e.key === 'Enter') {
      var q = input.value.trim();
      if (hi >= 0 && cur[hi]) location.hash = cur[hi].href;
      else if (q) location.hash = '#/kereses?q=' + encodeURIComponent(q);
      closePop(); input.blur();
    }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.search')) closePop(); });
  pop.addEventListener('click', function () { closePop(); input.blur(); });

  /* ---------- téma ---------- */
  var theme = S.store.get('theme', null);
  if (theme) document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme').addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    theme = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    S.store.set('theme', theme);
  });

  /* ---------- offline mód (csak webszerverről futtatva) ---------- */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }

  window.addEventListener('hashchange', route);
  route();
})();
