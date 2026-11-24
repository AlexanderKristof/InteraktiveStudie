/* Tudásműhely – tanulási útvonalak: tantárgyakon átívelő, lépésenkénti tanulási tervek.
 * Adat: STUDIE.addPath({ id, title, icon, color, level, description, steps: [
 *   { lecke: 'tantárgy/lecke' } | { modell: 'id' } | { szakszo: 'kurzus/fogalom' } | { teszt: 'tantárgy- vagy kurzusId' },
 *   (opcionálisan mindegyikhez: note: 'miért fontos ez a lépés') ] }) */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  S.paths = [];
  S.addPath = function (p) { S.paths.push(p); };

  function subj(id) { return S.subjects.filter(function (s) { return s.id === id; })[0]; }
  /* Egy lépés adatai: cím, ikon, link, kész-e. */
  S.pathStep = function (st) {
    var prog = S.store.get('progress', {}), seen = S.store.get('seenModels', {}), terms = S.store.get('seenTerms', {}), stats = S.store.get('teszt.stats', {});
    if (st.lecke) {
      var p = st.lecke.split('/'), s = subj(p[0]), l = s && s.lessons.filter(function (x) { return x.id === p[1]; })[0];
      if (!l) return null;
      var pr = prog[st.lecke];
      return { kind: 'Lecke', icon: s.icon, title: l.title, sub: s.title, href: '#/lecke/' + st.lecke, done: !!(pr && (pr.done || pr.quizBest >= 70)) };
    }
    if (st.modell) {
      var m = S.models[st.modell];
      return m ? { kind: 'Felfedező', icon: m.icon, title: m.title, sub: 'Mi miből áll?', href: '#/felfedezo/' + m.id, done: !!seen[m.id] } : null;
    }
    if (st.szakszo) {
      var r = S.resolveTerm && S.resolveTerm(st.szakszo);
      return r ? { kind: 'Szakszó', icon: r.c.icon, title: r.t.term, sub: r.c.title, href: r.href, done: !!terms[st.szakszo] } : null;
    }
    if (st.teszt) {
      var g = subj(st.teszt) || (S.courseById && S.courseById(st.teszt));
      if (!g) return null;
      var n = 0, ok = 0;
      Object.keys(stats).forEach(function (k) { if (k.indexOf(st.teszt + '/') === 0) { n += stats[k].n; ok += stats[k].ok; } });
      return { kind: 'Teszt', icon: '📝', title: 'Teszt: ' + g.title, sub: n ? 'eddig ' + Math.round(ok / n * 100) + '% helyes' : 'legalább 10 kérdés, 70% felett', href: '#/teszt?targy=' + st.teszt, done: n >= 10 && ok / n >= 0.7 };
    }
    return null;
  };
  function stepsOf(p) { return p.steps.map(function (st) { var x = S.pathStep(st); if (x) x.note = st.note; return x; }).filter(Boolean); }
  function stats(p) { var st = stepsOf(p), d = st.filter(function (x) { return x.done; }).length; return { steps: st, done: d, pct: st.length ? Math.round(d / st.length * 100) : 0 }; }

  function card(p) {
    var x = stats(p);
    return '<a class="card tile" style="--tile:' + p.color + '" href="#/utvonal/' + p.id + '"><span class="ico">' + p.icon + '</span><h3>' + esc(p.title) + '</h3>' +
      '<p>' + esc(p.description) + '</p><span class="meta">' + esc(p.level || '') + ' · ' + x.steps.length + ' lépés · ' + x.done + ' kész</span><span class="bar"><i style="width:' + x.pct + '%"></i></span></a>';
  }
  S.pathCards = function (n) { return S.paths.slice(0, n || S.paths.length).map(card).join(''); };

  S.pageUtvonalak = function (main) {
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Tanulási útvonalak</span></nav>' +
      '<h1>Tanulási útvonalak</h1><p class="lead">Nem tudod, hol kezdd? Válassz egy célt. Az útvonal lépésről lépésre végigvezet a leckéken, modelleken, szakszavakon és teszteken, tantárgyakon átívelve. A haladásod automatikusan követi, mit végeztél már el.</p>' +
      '<div class="grid" style="margin-top:16px">' + S.paths.map(card).join('') + '</div>';
  };

  S.pageUtvonal = function (main, id) {
    var p = S.paths.filter(function (x) { return x.id === id; })[0];
    if (!p) return false;
    var x = stats(p), next = x.steps.filter(function (s) { return !s.done; })[0];
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/utvonalak">Tanulási útvonalak</a><span>›</span><span>' + esc(p.title) + '</span></nav>' +
      '<div class="subject-head" style="--tile:' + p.color + '"><span class="ico">' + p.icon + '</span><div><h1>' + esc(p.title) + '</h1><p class="lead" style="margin:0">' + esc(p.description) + '</p></div></div>' +
      '<div class="row" style="--tile:' + p.color + ';margin:14px 0"><span class="muted">' + x.done + ' / ' + x.steps.length + ' lépés kész</span><span class="bar" style="flex:1;max-width:320px"><i style="width:' + x.pct + '%"></i></span>' +
      (next ? '<a class="btn primary" href="' + next.href + '">Következő lépés: ' + esc(next.title) + ' →</a>' : '<span class="badge done">🎉 Útvonal teljesítve!</span>') + '</div>' +
      '<ol class="path">' + x.steps.map(function (s, i) {
        return '<li class="' + (s.done ? 'done' : s === next ? 'next' : '') + '"><span class="pnum">' + (s.done ? '✓' : i + 1) + '</span>' +
          '<a class="card" href="' + s.href + '"><span class="ico">' + s.icon + '</span><span class="t"><small>' + s.kind + ' · ' + esc(s.sub) + '</small><b>' + esc(s.title) + '</b>' +
          (s.note ? '<span>' + S.inline(s.note) + '</span>' : '') + '</span></a></li>';
      }).join('') + '</ol>';
    return true;
  };
})();
