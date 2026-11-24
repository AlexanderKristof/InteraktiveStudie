/* Tudásműhely – Haladás: összesítés, napi sorozat, kitűzők, mentés/betöltés fájlba. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var PREFIX = 'tudasmuhely.';

  function today(d) { d = d || new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }

  /* Napi aktivitás naplózása (az útválasztó hívja minden oldalváltáskor). */
  S.logActivity = function (kind, id) {
    var act = S.store.get('activity', {}), d = today();
    act[d] = (act[d] || 0) + 1;
    S.store.set('activity', act);
    if (kind === 'model' && id) {
      var seen = S.store.get('seenModels', {});
      if (!seen[id]) { seen[id] = d; S.store.set('seenModels', seen); }
    }
    if (kind === 'term' && id) { var st = S.store.get('seenTerms', {}); if (!st[id]) { st[id] = d; S.store.set('seenTerms', st); } }
    if (kind === 'deep' && id) S.store.set('deepest', Math.max(S.store.get('deepest', 0), id));
  };

  function streak() {
    var act = S.store.get('activity', {}), n = 0, d = new Date();
    if (!act[today(d)]) d.setDate(d.getDate() - 1); // ma még nem tanult: a tegnapi sorozat még él
    while (act[today(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function bestStreak() {
    var days = Object.keys(S.store.get('activity', {})).sort(), best = 0, cur = 0, prev = null;
    days.forEach(function (k) {
      var t = new Date(k + 'T12:00:00');
      cur = prev && (t - prev) / 864e5 < 1.5 ? cur + 1 : 1;
      best = Math.max(best, cur); prev = t;
    });
    return best;
  }

  function summary() {
    var prog = S.store.get('progress', {}), done = 0, total = 0, perfect = 0;
    var subjects = S.subjects.map(function (s) {
      var d = s.lessons.filter(function (l) { var p = prog[s.id + '/' + l.id]; return p && p.done; }).length;
      done += d; total += s.lessons.length;
      return { s: s, done: d, total: s.lessons.length };
    });
    Object.keys(prog).forEach(function (k) { if (prog[k].quizBest === 100) perfect++; });
    var hist = S.store.get('teszt.history', []), stats = S.store.get('teszt.stats', {}), answered = 0, correct = 0;
    Object.keys(stats).forEach(function (k) { answered += stats[k].n; correct += stats[k].ok; });
    var cards5 = 0;
    (S.courses || []).forEach(function (c) { var b = S.store.get('leitner.' + c.id, {}); Object.keys(b).forEach(function (k) { if (b[k] >= 5) cards5++; }); });
    return { subjects: subjects, done: done, total: total, perfect: perfect, hist: hist, answered: answered, correct: correct,
      cards5: cards5, seen: Object.keys(S.store.get('seenModels', {})).length, streak: streak(), best: bestStreak(), deepest: S.store.get('deepest', 0),
      days: Object.keys(S.store.get('activity', {})).length };
  }

  function badges(x) {
    var list = [
      ['🌱', 'Első lépés', 'Elvégezted az első leckét.', x.done >= 1],
      ['📗', 'Szorgalmas', '10 lecke kész.', x.done >= 10],
      ['📚', 'Könyvmoly', '30 lecke kész.', x.done >= 30],
      ['💯', 'Hibátlan', 'Egy leckekvízt 100%-ra teljesítettél.', x.perfect >= 1],
      ['🎯', 'Mesterlövész', '5 leckekvíz 100%-on.', x.perfect >= 5],
      ['📝', 'Vizsgázó', 'Kitöltöttél egy tesztet a Tesztközpontban.', x.hist.length >= 1],
      ['🏆', 'Jeles', 'Legalább 20 kérdéses teszt 88% felett.', x.hist.some(function (h) { return h.n >= 20 && h.pct >= 88; })],
      ['🧠', 'Kérdésfaló', '200 megválaszolt tesztkérdés.', x.answered >= 200],
      ['🔥', 'Kitartó', '3 napos tanulási sorozat.', x.best >= 3],
      ['⚡', 'Megállíthatatlan', '7 napos tanulási sorozat.', x.best >= 7],
      ['🔍', 'Felfedező', '5 különböző modellt néztél meg.', x.seen >= 5],
      ['⚛️', 'Mélyfúró', 'Lejutottál az alaplaptól az atomig.', x.deepest >= 4],
      ['🃏', 'Szótárbúvár', '20 egyetemi szakszó az 5. dobozban.', x.cards5 >= 20],
      ['📅', 'Felkészültem', 'Egy vizsgánál elérted a 80%-os felkészültséget.', !!(S.examsReady && S.examsReady())],
      ['🧭', 'Célba értem', 'Teljesítettél egy tanulási útvonalat.', (S.paths || []).some(function (p) { return p.steps.every(function (st) { var r = S.pathStep(st); return !r || r.done; }); })]
    ];
    x.subjects.forEach(function (r) { list.push([r.s.icon, r.s.title + ' mestere', 'Minden lecke kész ebből: ' + r.s.title + '.', r.total > 0 && r.done === r.total]); });
    return list;
  }

  /* ---------- mentés / betöltés ---------- */
  function exportData() {
    var data = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k.indexOf(PREFIX) === 0) data[k.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(k));
      }
    } catch (e) { alert('A böngésző nem engedi az adatok olvasását.'); return; }
    var blob = new Blob([JSON.stringify({ app: 'tudasmuhely', version: 1, date: new Date().toISOString(), data: data }, null, 1)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'tudasmuhely-haladas-' + today() + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }
  function importData(file, done) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var j = JSON.parse(r.result);
        if (j.app !== 'tudasmuhely' || !j.data) throw new Error('format');
        if (!confirm('Betöltöd a mentést (' + (j.date || '').slice(0, 10) + ')? A jelenlegi haladásod felülíródik.')) return;
        Object.keys(j.data).forEach(function (k) { S.store.set(k, j.data[k]); });
        done(true);
      } catch (e) { alert('Ez nem egy Tudásműhely mentésfájl.'); }
    };
    r.readAsText(file);
  }

  /* ---------- oldal ---------- */
  S.pageHaladas = function (main) {
    var x = summary(), bs = badges(x), got = bs.filter(function (b) { return b[3]; }).length;
    var act = S.store.get('activity', {});
    // 12 hetes naptár (GitHub-szerű)
    var cells = '', d = new Date(); d.setDate(d.getDate() - 83 - d.getDay());
    for (var i = 0; i < 84 + new Date().getDay() + 1; i++) {
      var k = today(d), v = act[k] || 0, lvl = v ? (v >= 20 ? 4 : v >= 10 ? 3 : v >= 4 ? 2 : 1) : 0;
      cells += '<i class="cal l' + lvl + '" title="' + k + ': ' + v + ' oldal"></i>';
      d.setDate(d.getDate() + 1);
    }
    var pct = x.total ? Math.round(x.done / x.total * 100) : 0, acc = x.answered ? Math.round(x.correct / x.answered * 100) : null;
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Haladásom</span></nav><h1>Haladásom</h1>' +
      '<div class="stat-row">' + [
        ['🔥', x.streak + ' nap', 'tanulási sorozat (legjobb: ' + x.best + ')'],
        ['📘', x.done + ' / ' + x.total, 'lecke kész (' + pct + '%)'],
        ['📝', x.answered, 'megválaszolt tesztkérdés' + (acc != null ? ' · ' + acc + '% helyes' : '')],
        ['🏅', got + ' / ' + bs.length, 'kitűző']
      ].map(function (s) { return '<div class="card stat"><span class="ico">' + s[0] + '</span><b>' + s[1] + '</b><small>' + s[2] + '</small></div>'; }).join('') + '</div>' +
      '<h2>Aktivitás az elmúlt 12 hétben</h2><div class="card pad"><div class="cal-grid">' + cells + '</div><p class="muted" style="margin:8px 0 0;font-size:.85rem">Minden négyzet egy nap; minél sötétebb, annál többet tanultál aznap.</p></div>' +
      '<h2>Kitűzők</h2><div class="badge-grid">' + bs.map(function (b) {
        return '<div class="card bdg' + (b[3] ? ' got' : '') + '" title="' + esc(b[2]) + '"><span>' + b[0] + '</span><b>' + esc(b[1]) + '</b><small>' + esc(b[2]) + '</small></div>';
      }).join('') + '</div>' +
      '<h2>Tantárgyak</h2><div class="ts-topicres">' + x.subjects.map(function (r) {
        var p = r.total ? Math.round(r.done / r.total * 100) : 0;
        return '<a class="card" href="#/tantargy/' + r.s.id + '"><span>' + r.s.icon + ' ' + esc(r.s.title) + '</span><span class="bar" style="--tile:' + r.s.color + '"><i style="width:' + p + '%"></i></span><b>' + r.done + '/' + r.total + '</b></a>';
      }).join('') + '</div>' +
      '<h2>Mentés és betöltés</h2><div class="card pad"><p style="margin-top:0">A haladásod ebben a böngészőben tárolódik. Ha másik gépen vagy telefonon is folytatnád, mentsd el fájlba, és ott töltsd be.</p>' +
      '<div class="row"><button type="button" class="btn primary" id="hx-exp">⬇ Haladás mentése fájlba</button><label class="btn" style="cursor:pointer">⬆ Mentés betöltése<input type="file" accept=".json,application/json" id="hx-imp" hidden></label></div></div>';
    main.querySelector('#hx-exp').addEventListener('click', exportData);
    main.querySelector('#hx-imp').addEventListener('change', function (e) {
      if (e.target.files[0]) importData(e.target.files[0], function () { S.pageHaladas(main); alert('Betöltve!'); });
    });
  };
})();
