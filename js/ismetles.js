/* Tudásműhely – 🔁 Okos ismétlés (elosztott ismétlés az egész programban).
 * Minden rossz válasz (Tesztközpont, lecke-kvíz, modell-kvíz, egyetemi kvíz, párbaj) bekerül egy ismétlő dobozba.
 * Az ismétlésnél jó válasz → hosszabb szünet (1 → 3 → 7 → 16 → 35 nap), rossz → vissza az 1. dobozba.
 * 5 jó ismétlés után a kérdés „megtanultnak” számít, és kikerül. Tárolás: 'srs' a böngészőben. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var GAPS = [1, 3, 7, 16, 35];
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function day(n) { return today() + n * 86400000; }
  function keyOf(q) { return q.id ? String(q.id) : 'h' + S.norm(q.q).slice(0, 80); }
  function load() { return S.store.get('srs', {}); }
  function save(x) { S.store.set('srs', x); }

  /* meta: { label, href, gid, tid } */
  S.srsRecord = function (q, ok, meta) {
    if (!q || !q.options) return;
    var all = load(), k = keyOf(q), it = all[k];
    if (!ok) {
      all[k] = { q: { q: q.q, options: q.options, answer: q.answer, explain: q.explain || '' }, m: meta || (it && it.m) || {}, box: 0, due: day(1), miss: ((it && it.miss) || 0) + 1 };
    } else if (it) {
      if (it.due > today() + 1) { save(all); return; } /* még nem esedékes: nem léptetjük */
      it.box++;
      if (it.box >= GAPS.length) { delete all[k]; S.store.set('srs.megtanult', S.store.get('srs.megtanult', 0) + 1); }
      else it.due = day(GAPS[it.box]);
    }
    save(all);
  };
  S.srsDue = function () { var all = load(), t = today(); return Object.keys(all).filter(function (k) { return all[k].due <= t; }).map(function (k) { return all[k]; }); };
  S.srsCount = function () { return Object.keys(load()).length; };

  S.srsHomeCard = function () {
    var due = S.srsDue().length, total = S.srsCount();
    if (!total) return '';
    return '<a class="card daily srs-card" href="#/ismetles"><span class="ico">🔁</span><span><b>Mai ismétlés</b><small>' +
      (due ? due + ' kérdés vár rád, amit korábban elrontottál – most érdemes átismételni.' : 'Ma nincs esedékes kérdés. ' + total + ' kérdés van ütemezve a következő napokra.') +
      '</small></span><span class="btn' + (due ? ' primary' : '') + '">' + (due ? 'Ismétlés →' : 'Megnézem') + '</span></a>';
  };

  S.addRoute('ismetles', { title: 'Mai ismétlés', nav: 'teszt', page: function (main) {
    var all = load(), keys = Object.keys(all), t = today();
    var due = keys.filter(function (k) { return all[k].due <= t; });
    var boxes = [0, 0, 0, 0, 0]; keys.forEach(function (k) { boxes[Math.min(4, all[k].box)]++; });
    var next = keys.filter(function (k) { return all[k].due > t; }).map(function (k) { return all[k].due; }).sort()[0];
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Mai ismétlés</span></nav>' +
      '<h1>🔁 Okos ismétlés</h1><p class="lead">Amit bárhol elrontasz (teszt, lecke-kvíz, párbaj), az ide kerül. A program a megfelelő időben – <b>1, 3, 7, 16 és 35 nap</b> múlva – újra elődobja. Így az agyad pont akkor ismétel, amikor már kezdené elfelejteni: ez a leghatékonyabb módja a megjegyzésnek.</p>' +
      '<div class="srs-stats card pad"><div><b>' + due.length + '</b><small>esedékes ma</small></div><div><b>' + keys.length + '</b><small>ütemezve összesen</small></div><div><b>' + S.store.get('srs.megtanult', 0) + '</b><small>már megtanultál</small></div>' +
      '<div class="srs-boxes">' + boxes.map(function (n, i) { return '<span title="' + GAPS[i] + ' nap"><i style="height:' + Math.max(4, Math.min(60, n * 6)) + 'px"></i><small>' + (i + 1) + '.</small></span>'; }).join('') + '</div></div>' +
      (due.length ? '<p><button type="button" class="btn primary" id="srs-go">▶ Ismétlés indítása (' + Math.min(due.length, 30) + ' kérdés)</button></p>'
        : '<p class="note">' + (keys.length ? 'Ma nincs több ismételnivaló. 🎉 A következő ismétlés: <b>' + new Date(next).toLocaleDateString('hu-HU') + '</b>.' : 'Még nincs mit ismételni. Csinálj egy tesztet a <a href="#/teszt">Tesztközpontban</a> vagy egy lecke kvízét – amit elrontasz, az ide kerül.') + '</p>') +
      (keys.length ? '<details class="card pad"><summary>📋 Az összes ütemezett kérdés (' + keys.length + ')</summary><ul class="srs-list">' + keys.sort(function (a, b) { return all[a].due - all[b].due; }).slice(0, 200).map(function (k) {
        var it = all[k];
        return '<li>' + S.inline(it.q.q) + '<br><small class="muted">' + esc(it.m.label || '') + ' · ' + (it.due <= t ? 'ma esedékes' : new Date(it.due).toLocaleDateString('hu-HU')) + ' · ' + (it.box + 1) + '. doboz</small></li>';
      }).join('') + '</ul></details>' : '');
    var go = main.querySelector('#srs-go');
    if (go) go.addEventListener('click', function () {
      var items = S.shuffle(due.slice()).slice(0, 30).map(function (k) {
        var it = all[k], q = Object.assign({ id: k }, it.q);
        return { q: q, g: { id: 'srs', title: it.m.label || 'Ismétlés', icon: '🔁', srs: true }, t: { id: 'srs', title: it.m.label || 'Ismétlés', href: it.m.href || '#/ismetles' }, meta: it.m };
      });
      S.runTest(main, items, 'azonnali', { label: '🔁 Mai ismétlés', backHref: '#/ismetles', backLabel: 'Okos ismétlés' });
    });
    return true;
  } });
})();
