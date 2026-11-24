/* Tudásműhely – tantárgyi tanulókártyák (Leitner-módszer, 5 doboz).
 * A kártyák a leckék kvízkérdéseiből és a kérdésbankból készülnek: elöl a kérdés, hátul a helyes válasz és a magyarázat.
 * Tárolás: 'kartya.<tantárgy>' → { 'lecke/q3': doboz, 'lecke/b7': doboz } */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  function deck(s) {
    var bank = (S.bank || {})[s.id] || {}, cards = [];
    s.lessons.forEach(function (l) {
      (l.quiz || []).forEach(function (q, i) { cards.push({ key: l.id + '/q' + i, lesson: l, q: q }); });
      (bank[l.id] || []).forEach(function (q, i) { cards.push({ key: l.id + '/b' + i, lesson: l, q: q }); });
    });
    return cards;
  }

  S.pageKartyak = function (main, sid, params) {
    var s = S.subjects.filter(function (x) { return x.id === sid; })[0];
    if (!s) return false;
    var all = deck(s), skey = 'kartya.' + s.id, boxes = S.store.get(skey, {});
    var lesson = params && params.lecke || '';
    var queue = [], cur = null, flipped = false, seen = 0, good = 0;

    function pool() { return all.filter(function (c) { return !lesson || c.lesson.id === lesson; }); }
    function build() {
      var weighted = [];
      pool().forEach(function (c) { var b = boxes[c.key] || 1; for (var i = 0; i < 6 - b; i++) weighted.push(c); });
      queue = S.shuffle(weighted).filter(function (c, i, a) { return a.indexOf(c) === i; }).slice(0, 12);
      queue.sort(function (a, b) { return (boxes[a.key] || 1) - (boxes[b.key] || 1) + (Math.random() - 0.5) * 2; });
    }
    function stats() {
      var cnt = [0, 0, 0, 0, 0], p = pool();
      p.forEach(function (c) { cnt[(boxes[c.key] || 1) - 1]++; });
      return '<div class="leitner">' + cnt.map(function (n, i) {
        return '<div><small>' + (i + 1) + '. doboz</small><b>' + n + '</b><span class="bar"><i style="width:' + (p.length ? Math.round(n / p.length * 100) : 0) + '%"></i></span></div>';
      }).join('') + '</div>';
    }
    function shell(inner) {
      main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/tantargy/' + s.id + '">' + esc(s.title) + '</a><span>›</span><span>Tanulókártyák</span></nav>' +
        '<h1>🃏 Tanulókártyák: ' + esc(s.title) + '</h1><p class="muted">' + all.length + ' kártya. A jól tudottak hátrébb kerülnek (5. doboz), a rosszul tudottak gyakrabban előjönnek.</p>' +
        '<div class="chips" id="kc-lessons" style="margin:0 0 12px"><a class="chip' + (lesson ? '' : ' on') + '" href="#/kartyak/' + s.id + '">Mind</a>' + s.lessons.map(function (l) {
          return '<a class="chip' + (lesson === l.id ? ' on' : '') + '" href="#/kartyak/' + s.id + '?lecke=' + l.id + '">' + esc(l.title) + '</a>';
        }).join('') + '</div>' + stats() + inner;
    }
    function show() {
      if (!queue.length) {
        shell('<div class="card pad"><h3>Kör vége</h3><p>' + good + ' / ' + seen + ' kártyát tudtál.</p><div class="row"><button type="button" class="btn primary" id="kc-again">Új kör</button>' +
          '<button type="button" class="btn" id="kc-reset">Dobozok ürítése</button><a class="btn" href="#/teszt?targy=' + s.id + '">📝 Teszt ebből a tárgyból</a></div></div>');
        main.querySelector('#kc-again').addEventListener('click', function () { seen = good = 0; build(); show(); });
        main.querySelector('#kc-reset').addEventListener('click', function () {
          if (!confirm('Minden kártya visszakerül az 1. dobozba. Biztos?')) return;
          boxes = {}; S.store.set(skey, boxes); seen = good = 0; build(); show();
        });
        return;
      }
      cur = queue[0]; flipped = false;
      shell('<button type="button" class="flash" id="kc-card"><span class="muted">' + esc(cur.lesson.title) + ' · ' + (boxes[cur.key] || 1) + '. doboz</span>' +
        '<span class="flash-front kc-q">' + S.inline(cur.q.q) + '</span><span class="flash-hint muted">Gondold végig a választ, aztán kattints a megfordításhoz!</span></button>' +
        '<div class="row" id="kc-act" style="justify-content:center;margin-top:12px"></div>');
      var card = main.querySelector('#kc-card');
      card.addEventListener('click', function () {
        if (flipped) return; flipped = true;
        card.classList.add('flipped');
        card.innerHTML = '<span class="muted">' + S.inline(cur.q.q) + '</span><span class="flash-back"><b>' + S.inline(cur.q.options[cur.q.answer]) + '</b></span>' +
          (cur.q.explain ? '<span class="muted" style="font-size:.92rem">' + S.inline(cur.q.explain) + '</span>' : '');
        var act = main.querySelector('#kc-act');
        act.innerHTML = '<button type="button" class="btn" id="kc-no">✘ Nem tudtam</button><button type="button" class="btn primary" id="kc-yes">✔ Tudtam</button>' +
          '<a class="btn" href="#/lecke/' + s.id + '/' + cur.lesson.id + '">📘 Lecke</a>';
        act.querySelector('#kc-yes').addEventListener('click', function () { answer(true); });
        act.querySelector('#kc-no').addEventListener('click', function () { answer(false); });
        act.querySelector('#kc-yes').focus();
      });
    }
    function answer(ok) {
      seen++; if (ok) good++;
      boxes[cur.key] = ok ? Math.min(5, (boxes[cur.key] || 1) + 1) : 1;
      S.store.set(skey, boxes);
      queue.shift();
      if (!ok) queue.splice(Math.min(queue.length, 3), 0, cur);
      if (seen > 24) queue = [];
      if (S.logActivity) S.logActivity();
      show();
    }
    build(); show();
    return true;
  };
})();
