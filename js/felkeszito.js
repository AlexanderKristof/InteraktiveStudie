/* Tudásműhely – Vizsga- és dolgozatfelkészítő.
 * A diák felvesz egy vizsgát (tantárgy/kurzus, témák, dátum, típus); a program napokra bontott
 * tanulási tervet készít, méri a felkészültséget, időre menő próbavizsgát és nyomtatható összefoglalót ad.
 * Tárolás: S.store 'exams' (tömb). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var KINDS = [['tz', 'Témazáró dolgozat', 20, 40], ['ro', 'Röpdolgozat', 10, 15], ['er', 'Érettségi', 30, 60], ['sz', 'Szakmai vizsga', 30, 60], ['zh', 'Egyetemi ZH / vizsga', 25, 50]];
  function kindOf(id) { return KINDS.filter(function (k) { return k[0] === id; })[0] || KINDS[0]; }

  function ymd(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function parse(s) { return new Date(s + 'T12:00:00'); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return ymd(d); }
  function diff(a, b) { return Math.round((parse(b) - parse(a)) / 864e5); }
  function huDate(s) { return parse(s).toLocaleDateString('hu-HU', { month: 'long', day: 'numeric', weekday: 'long' }); }
  function exams() { return S.store.get('exams', []); }
  function save(list) { S.store.set('exams', list); }
  function examById(id) { return exams().filter(function (e) { return e.id === id; })[0]; }
  function update(ex) { save(exams().map(function (e) { return e.id === ex.id ? ex : e; })); }

  function groupOf(ex) { return S.testGroups().filter(function (g) { return g.id === ex.group; })[0]; }
  function topicsOf(ex, g) { g = g || groupOf(ex); return g ? g.topics.filter(function (t) { return ex.topics.indexOf(t.id) >= 0; }) : []; }

  /* ---------- felkészültség a tesztstatisztikából ---------- */
  function readiness(ex) {
    var st = S.store.get('teszt.stats', {}), list = topicsOf(ex).map(function (t) {
      var r = st[ex.group + '/' + t.id], n = r ? r.n : 0, pct = n ? Math.round(r.ok / n * 100) : null;
      // kevés kérdés alapján még nem lehetünk biztosak: 10 kérdés alatt arányosan kevesebbet ér
      var score = n ? pct * Math.min(1, n / 10) : 0;
      return { t: t, n: n, pct: pct, score: score };
    });
    var total = list.length ? Math.round(list.reduce(function (a, x) { return a + x.score; }, 0) / list.length) : 0;
    return { total: total, topics: list };
  }

  /* ---------- tanulási terv ---------- */
  function plan(ex) {
    var g = groupOf(ex), tps = topicsOf(ex, g), k = kindOf(ex.kind);
    var span = Math.max(0, diff(ex.created, ex.date));    // ennyi tanulónap van a vizsga előtt
    var days = [], i;
    for (i = 0; i < Math.max(1, span); i++) days.push({ date: addDays(ex.created, i), tasks: [] });
    var studyDays = days.length >= 2 ? days.length - 1 : days.length;
    var per = Math.ceil(tps.length / studyDays) || 1;
    tps.forEach(function (t, j) {
      var d = days[Math.min(studyDays - 1, Math.floor(j / per))];
      d.tasks.push({ type: 'lecke', title: 'Tanuld át: ' + t.title, href: t.href, topic: t.id });
      d.tasks.push({ type: 'teszt', title: 'Gyakorló teszt: ' + t.title + ' (10 kérdés)', topics: [t.id], n: 10 });
    });
    // üres tanulónapokra ismétlés kerül
    for (i = 0; i < studyDays; i++) if (!days[i].tasks.length) days[i].tasks.push({ type: 'gyenge', title: 'Ismétlés: a leggyengébb témáid (15 kérdés)', n: 15 }, { type: 'osszefoglalo', title: 'Olvasd át az összefoglaló lapot' });
    var last = days[days.length - 1];
    if (days.length >= 2) {
      last.tasks.push({ type: 'osszefoglalo', title: 'Összefoglaló lap átolvasása' });
      last.tasks.push({ type: 'proba', title: 'Próbavizsga időre (' + k[2] + ' kérdés, ' + k[3] + ' perc)', n: k[2], minutes: k[3] });
    } else {
      last.tasks.push({ type: 'proba', title: 'Gyors próbavizsga (' + Math.min(15, k[2]) + ' kérdés)', n: Math.min(15, k[2]), minutes: Math.round(Math.min(15, k[2]) * 1.5) });
    }
    days.forEach(function (d, di) { d.tasks.forEach(function (t, ti) { t.key = di + '-' + ti; }); });
    return days;
  }
  function taskDone(ex, t) {
    if (ex.done[t.key]) return true;
    if (t.type === 'lecke' && t.href && t.href.indexOf('#/lecke/') === 0) {
      var p = S.store.get('progress', {})[t.href.slice(8)];
      return !!(p && p.done);
    }
    return false;
  }

  /* ---------- feladatok indítása ---------- */
  function sample(items, n) { return S.shuffle(items).slice(0, n); }
  function startTask(main, ex, t) {
    var back = { backHref: '#/felkeszito/' + ex.id, backLabel: ex.title };
    function finish(extra) {
      return function (pct) {
        var e = examById(ex.id); if (!e) return;
        e.done[t.key] = true;
        if (extra) extra(e, pct);
        update(e);
      };
    }
    if (t.type === 'teszt') {
      S.runTest(main, sample(S.testItems(ex.group, t.topics), t.n), 'azonnali', Object.assign({ label: t.title, onFinish: finish() }, back));
    } else if (t.type === 'gyenge') {
      var r = readiness(ex).topics.slice().sort(function (a, b) { return a.score - b.score; }).slice(0, 3).map(function (x) { return x.t.id; });
      S.runTest(main, sample(S.testItems(ex.group, r), t.n), 'azonnali', Object.assign({ label: 'Gyenge témák ismétlése', onFinish: finish() }, back));
    } else if (t.type === 'proba') {
      S.runTest(main, sample(S.testItems(ex.group, ex.topics), t.n), 'vizsga', Object.assign({ label: '⏱ Próbavizsga', minutes: t.minutes,
        onFinish: finish(function (e, pct) { e.mocks = (e.mocks || []).concat([{ date: ymd(new Date()), pct: pct }]); }) }, back));
    } else if (t.type === 'osszefoglalo') {
      var e2 = examById(ex.id); e2.done[t.key] = true; update(e2);
      printSummary(ex);
    }
  }

  /* ---------- nyomtatható összefoglaló („puska”) ---------- */
  function plain(t) { return String(t || '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[\[[^|\]]+\|(.+?)\]\]/g, '$1'); }
  function codes(t) {
    var m = String(t || '').match(/`[^`]+`/g) || [];
    // csak a valódi összefüggések: egyenlőség vagy reláció van bennük, és van bennük betű (nem pusztán számpélda)
    return m.map(function (x) { return x.slice(1, -1); }).filter(function (x) { return /[=<>≈]/.test(x) && /[A-Za-zα-ωΑ-Ω]/.test(x) && !/^[\d\s.,·×\/+−-]+=/.test(x); });
  }
  function printSummary(ex) {
    var g = groupOf(ex), tps = topicsOf(ex, g), html = '';
    var subject = S.subjects.filter(function (s) { return s.id === ex.group; })[0];
    var course = S.courseById && S.courseById(ex.group);
    tps.forEach(function (t) {
      html += '<section><h2>' + esc(t.title) + '</h2>';
      if (subject) {
        var l = subject.lessons.filter(function (x) { return x.id === t.id; })[0];
        if (!l) return;
        html += '<p class="sum">' + esc(plain(l.summary)) + '</p>';
        var f = [], notes = [];
        (l.sections || []).forEach(function (sec) {
          f = f.concat(codes(sec.text));
          if (sec.tip) notes.push('💡 ' + plain(sec.tip).split('\n')[0]);
          if (sec.warn) notes.push('⚠ ' + plain(sec.warn).split('\n')[0]);
        });
        var heads = (l.sections || []).map(function (s) { return s.title; }).filter(Boolean);
        if (heads.length) html += '<p><b>Részek:</b> ' + heads.map(esc).join(' · ') + '</p>';
        if (f.length) html += '<p><b>Képletek, kulcsadatok:</b> ' + f.filter(function (x, i) { return f.indexOf(x) === i; }).slice(0, 12).map(function (x) { return '<code>' + esc(x) + '</code>'; }).join(' ') + '</p>';
        if (notes.length) html += '<ul class="notes">' + notes.slice(0, 5).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>';
        if (l.quiz && l.quiz.length) html += '<p><b>Tudnod kell:</b></p><ul>' + l.quiz.map(function (q) { return '<li>' + esc(plain(q.q)) + ' → <b>' + esc(plain(q.options[q.answer])) + '</b></li>'; }).join('') + '</ul>';
      } else if (course) {
        html += '<ul>' + course.terms.filter(function (x) { return x.topic === t.id; }).map(function (x) {
          return '<li><b>' + esc(x.term) + '</b>' + (x.en ? ' <i>(' + esc(x.en) + ')</i>' : '') + ': ' + esc(plain(x.short)) + '</li>';
        }).join('') + '</ul>';
        var fids = {};
        course.terms.filter(function (x) { return x.topic === t.id; }).forEach(function (x) { (x.formulas || []).forEach(function (f) { fids[f] = 1; }); });
        var fl = (course.formulas || []).filter(function (f) { return fids[f.id]; });
        if (fl.length) html += '<p><b>Képletek:</b></p><ul>' + fl.map(function (f) { return '<li>' + esc(f.title) + ': <code>' + esc(f.parts.map(function (p) { return p.t; }).join(' ')) + '</code></li>'; }).join('') + '</ul>';
      }
      html += '</section>';
    });
    var doc = '<!doctype html><html lang="hu"><head><meta charset="utf-8"><title>Összefoglaló – ' + esc(ex.title) + '</title><style>' +
      'body{font:13px/1.45 system-ui,Segoe UI,Arial,sans-serif;color:#111;max-width:820px;margin:20px auto;padding:0 16px}h1{font-size:20px;margin:0}' +
      '.meta{color:#555;font-size:12px;margin:2px 0 12px}section{break-inside:avoid;border-top:1px solid #ccc;padding-top:6px;margin-top:10px}' +
      'h2{font-size:15px;margin:0 0 4px}p{margin:3px 0}ul{margin:3px 0 3px 18px;padding:0}code{background:#f1f1f1;padding:0 4px;border-radius:3px;font-size:12px}' +
      '.sum{font-style:italic;color:#333}.notes{list-style:none;margin-left:0}@media print{.noprint{display:none}body{margin:0 auto}}</style></head><body>' +
      '<p class="noprint"><button onclick="window.print()">🖨 Nyomtatás</button></p><h1>Összefoglaló: ' + esc(ex.title) + '</h1>' +
      '<div class="meta">' + esc(kindOf(ex.kind)[1]) + ' · ' + esc(g ? g.title : '') + ' · ' + esc(ex.date) + ' · Tudásműhely</div>' + html + '</body></html>';
    var w = window.open('', '_blank');
    if (!w) { alert('A böngésző letiltotta az új ablakot. Engedélyezd a felugró ablakokat ehhez az oldalhoz.'); return; }
    w.document.open(); w.document.write(doc); w.document.close();
  }

  /* ---------- oldalak ---------- */
  function gauge(p) {
    var col = p >= 80 ? 'var(--ok)' : p >= 50 ? 'var(--warn)' : 'var(--bad)';
    return '<div class="gauge" style="--p:' + p + ';--c:' + col + '"><b>' + p + '%</b><small>felkészültség</small></div>';
  }
  function countdown(ex) {
    var d = diff(ymd(new Date()), ex.date);
    return d > 1 ? 'még ' + d + ' nap' : d === 1 ? 'holnap!' : d === 0 ? 'ma van!' : 'lezajlott';
  }

  S.pageFelkeszito = function (main) {
    var list = exams().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var groups = S.testGroups().filter(function (g) { return g.id !== 'felfedezo'; });
    var byKind = {};
    groups.forEach(function (g) { (byKind[g.kind] = byKind[g.kind] || []).push(g); });
    var tomorrow7 = addDays(ymd(new Date()), 7);
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Vizsgafelkészítő</span></nav>' +
      '<h1>Vizsga- és dolgozatfelkészítő</h1><p class="lead">Add meg, miből és mikor írsz. Napokra bontott tanulási tervet kapsz gyakorló tesztekkel, felkészültségi mérővel, időre menő próbavizsgával és nyomtatható összefoglalóval.</p>' +
      (list.length ? '<h2>Vizsgáim</h2><div class="grid">' + list.map(function (ex) {
        var g = groupOf(ex), r = readiness(ex);
        return '<a class="card tile exam-tile" style="--tile:' + (g ? g.color : '#2357d9') + '" href="#/felkeszito/' + ex.id + '"><span class="row" style="justify-content:space-between"><span class="ico">' + (g ? g.icon : '📝') + '</span>' + gauge(r.total) + '</span>' +
          '<h3>' + esc(ex.title) + '</h3><p>' + esc(kindOf(ex.kind)[1]) + ' · ' + esc(huDate(ex.date)) + '</p><span class="meta"><b>' + countdown(ex) + '</b> · ' + ex.topics.length + ' téma</span></a>';
      }).join('') + '</div>' : '') +
      '<h2>Új vizsga vagy dolgozat</h2><form class="card pad exam-form" id="ex-form">' +
      '<label>Miből?<select id="ex-group" required><option value="">Válassz tantárgyat vagy kurzust…</option>' + Object.keys(byKind).map(function (k) {
        return '<optgroup label="' + esc(k) + '">' + byKind[k].map(function (g) { return '<option value="' + g.id + '">' + esc(g.title) + '</option>'; }).join('') + '</optgroup>';
      }).join('') + '</select></label>' +
      '<label>Milyen számonkérés?<select id="ex-kind">' + KINDS.map(function (k) { return '<option value="' + k[0] + '">' + k[1] + '</option>'; }).join('') + '</select></label>' +
      '<label>Mikor lesz?<input type="date" id="ex-date" value="' + tomorrow7 + '" min="' + ymd(new Date()) + '" required></label>' +
      '<label>Elnevezés<input type="text" id="ex-title" placeholder="pl. Fizika témazáró"></label>' +
      '<div id="ex-topics" class="ex-topics"></div>' +
      '<button class="btn primary" type="submit">Terv készítése →</button></form>';
    var gs = main.querySelector('#ex-group'), ks = main.querySelector('#ex-kind'), ti = main.querySelector('#ex-title'), tb = main.querySelector('#ex-topics');
    var autoTitle = true;
    ti.addEventListener('input', function () { autoTitle = !ti.value; });
    function refresh() {
      var g = groups.filter(function (x) { return x.id === gs.value; })[0];
      if (!g) { tb.innerHTML = ''; return; }
      if (autoTitle) ti.value = g.title + ' – ' + kindOf(ks.value)[1].toLowerCase();
      tb.innerHTML = '<p class="muted" style="margin:4px 0">Mely témák lesznek benne?</p>' + g.topics.map(function (t) {
        return '<label class="ts-topic"><input type="checkbox" value="' + t.id + '" checked><span>' + esc(t.title) + '</span><small>' + t.questions.length + '</small></label>';
      }).join('');
    }
    gs.addEventListener('change', function () {
      var g = groups.filter(function (x) { return x.id === gs.value; })[0];
      if (g) ks.value = g.kind === 'Egyetem' ? 'zh' : g.kind === 'Szakmák' ? 'sz' : 'tz';
      refresh();
    });
    ks.addEventListener('change', refresh);
    main.querySelector('#ex-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var topics = Array.prototype.slice.call(tb.querySelectorAll('input:checked')).map(function (i) { return i.value; });
      if (!gs.value || !topics.length) { alert('Válassz tantárgyat és legalább egy témát!'); return; }
      var ex = { id: 'v' + Date.now().toString(36), title: ti.value.trim() || 'Vizsga', kind: ks.value, group: gs.value, topics: topics,
        date: main.querySelector('#ex-date').value, created: ymd(new Date()), done: {}, mocks: [] };
      if (ex.date < ex.created) ex.date = ex.created;
      save(exams().concat([ex]));
      location.hash = '#/felkeszito/' + ex.id;
    });
  };

  S.pageVizsga = function (main, id) {
    var ex = examById(id);
    if (!ex) return false;
    var g = groupOf(ex), r = readiness(ex), days = plan(ex), today = ymd(new Date());
    var all = 0, done = 0;
    days.forEach(function (d) { d.tasks.forEach(function (t) { all++; if (taskDone(ex, t)) done++; }); });
    var weak = r.topics.filter(function (x) { return x.n && x.pct < 70; });
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/felkeszito">Vizsgafelkészítő</a><span>›</span><span>' + esc(ex.title) + '</span></nav>' +
      '<div class="exam-head card pad" style="--tile:' + (g ? g.color : '#2357d9') + '">' + gauge(r.total) +
      '<div><h1 style="margin:0">' + esc(ex.title) + '</h1><p class="muted" style="margin:4px 0">' + esc(kindOf(ex.kind)[1]) + ' · ' + esc(g ? g.title : '') + ' · ' + esc(huDate(ex.date)) + ' · <b>' + countdown(ex) + '</b></p>' +
      '<div class="row"><span class="muted">' + done + ' / ' + all + ' feladat kész</span><span class="bar" style="flex:1;max-width:260px"><i style="width:' + (all ? Math.round(done / all * 100) : 0) + '%"></i></span></div>' +
      '<div class="row" style="margin-top:10px"><button class="btn primary" id="ex-mock">⏱ Próbavizsga most</button><button class="btn" id="ex-sum">🖨 Összefoglaló lap</button>' +
      (weak.length ? '<button class="btn" id="ex-weak">🎯 Gyenge témák gyakorlása</button>' : '') + '<button class="btn" id="ex-del">Törlés</button></div></div></div>' +
      (ex.mocks && ex.mocks.length ? '<p class="muted">Próbavizsgáid: ' + ex.mocks.map(function (m) { var gr = S.testGrade(m.pct); return m.date.slice(5) + ': <b>' + m.pct + '%</b> (' + gr[0] + ')'; }).join(' · ') + '</p>' : '') +
      '<h2>Témák felkészültsége</h2><div class="ts-topicres">' + r.topics.map(function (x) {
        var col = x.pct == null ? 'var(--line)' : x.pct >= 80 ? 'var(--ok)' : x.pct >= 50 ? 'var(--warn)' : 'var(--bad)';
        return '<a class="card" href="' + x.t.href + '"><span>' + esc(x.t.title) + '</span><span class="bar" style="--tile:' + col + '"><i style="width:' + Math.round(x.score) + '%"></i></span><b>' + (x.pct == null ? '–' : x.pct + '%') + '</b></a>';
      }).join('') + '</div><p class="muted" style="font-size:.85rem">A felkészültség a gyakorló tesztek eredményéből számolódik. Egy téma akkor számít teljesen, ha legalább 10 kérdést megoldottál belőle.</p>' +
      '<h2>Tanulási terv</h2><div class="plan">' + days.map(function (d) {
        var cls = d.date === today ? 'today' : d.date < today ? 'past' : '';
        return '<div class="card plan-day ' + cls + '"><div class="plan-date">' + (d.date === today ? '📍 Ma, ' : '') + esc(huDate(d.date)) + '</div>' + d.tasks.map(function (t) {
          var dn = taskDone(ex, t);
          return '<div class="plan-task' + (dn ? ' done' : '') + '"><input type="checkbox" data-key="' + t.key + '"' + (dn ? ' checked' : '') + ' aria-label="Kész">' +
            (t.href ? '<a href="' + t.href + '">' + esc(t.title) + '</a>' : '<button type="button" class="linkish" data-task="' + t.key + '">' + esc(t.title) + '</button>') + '</div>';
        }).join('') + '</div>';
      }).join('') + '<div class="card plan-day exam-day"><div class="plan-date">🍀 ' + esc(huDate(ex.date)) + ': ' + esc(kindOf(ex.kind)[1]) + '</div><p style="margin:4px 0">Pihenj, aludj eleget, és nézd át még egyszer az összefoglalót. Sok sikert!</p></div></div>';

    var taskByKey = {};
    days.forEach(function (d) { d.tasks.forEach(function (t) { taskByKey[t.key] = t; }); });
    main.querySelectorAll('.plan-task input').forEach(function (c) {
      c.addEventListener('change', function () { var e = examById(id); e.done[c.dataset.key] = c.checked; update(e); c.parentNode.classList.toggle('done', c.checked); });
    });
    main.querySelectorAll('[data-task]').forEach(function (b) { b.addEventListener('click', function () { startTask(main, ex, taskByKey[b.dataset.task]); }); });
    var k = kindOf(ex.kind);
    main.querySelector('#ex-mock').addEventListener('click', function () { startTask(main, ex, { key: 'mock-' + Date.now(), type: 'proba', title: 'Próbavizsga', n: k[2], minutes: k[3] }); });
    main.querySelector('#ex-sum').addEventListener('click', function () { printSummary(ex); });
    var wk = main.querySelector('#ex-weak');
    if (wk) wk.addEventListener('click', function () { startTask(main, ex, { key: 'weak-' + Date.now(), type: 'gyenge', n: 15 }); });
    main.querySelector('#ex-del').addEventListener('click', function () {
      if (confirm('Biztosan törlöd ezt a vizsgát és a tervét?')) { save(exams().filter(function (e) { return e.id !== id; })); location.hash = '#/felkeszito'; }
    });
    return true;
  };

  /* Kezdőlapi emlékeztető a legközelebbi vizsgáról. */
  S.examReminder = function () {
    var today = ymd(new Date()), next = exams().filter(function (e) { return e.date >= today; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; })[0];
    if (!next) return '';
    var r = readiness(next);
    return '<a class="card daily" href="#/felkeszito/' + next.id + '" style="text-decoration:none;color:inherit"><span class="ico">📅</span><span><b>' + esc(next.title) + ': ' + countdown(next) + '</b><small>Felkészültség: ' + r.total + '%. Nézd meg a mai feladataidat!</small></span><span class="btn">Megnyitás →</span></a>';
  };
  S.examsReady = function () { return exams().some(function (e) { return readiness(e).total >= 80; }); };
})();
