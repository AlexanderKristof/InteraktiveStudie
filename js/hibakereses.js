/* Tudásműhely – hibakereső szimulátor (döntési fa).
 * Adat: STUDIE.addTrouble({ id, title, intro, lessons: ['tantárgy/lecke', …], start, nodes: {
 *   csomópontId: { q: 'Kérdés', check: 'Mit és hogyan ellenőrizz/mérj', answers: [ { t: 'Válasz', next: 'id' }, … ] },
 *   eredményId:  { result: 'Mi a hiba', fix: 'Mit kell tenni', level: 'ok' | 'warn' | 'bad', pro: true ha szakemberre tartozik }
 * } })
 * A fa automatikusan megjelenik a felsorolt leckék végén, és widgetként is beilleszthető: { type: 'hibakereses', options: { tree: 'id' } }. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  S.troubles = {};
  S.addTrouble = function (t) { S.troubles[t.id] = t; };

  S.addWidget('hibakereses', function (el, o) {
    var tr = S.troubles[o.tree];
    if (!tr) { el.innerHTML = '<p class="muted">Ismeretlen hibakereső: ' + esc(o.tree) + '</p>'; return; }
    var path = [];   // [{ node, answer }]
    var cur = tr.start;
    function paint() {
      var n = tr.nodes[cur];
      var trail = path.map(function (p, i) {
        return '<li><button type="button" class="linkish" data-back="' + i + '">' + S.inline(tr.nodes[p.node].q) + '</button> → <b>' + esc(p.answer) + '</b></li>';
      }).join('');
      var body;
      if (n.result) {
        var lv = n.level || (n.pro ? 'warn' : 'ok');
        body = '<div class="tb-result ' + lv + '"><div class="tb-kicker">' + (lv === 'bad' ? '⚠️ Valószínű hiba' : lv === 'warn' ? '🔎 Valószínű hiba' : '✅ Megvan!') + '</div>' +
          '<h3>' + S.inline(n.result) + '</h3>' + (n.fix ? '<div class="tb-fix"><b>Mit tegyél?</b>' + S.md(n.fix) + '</div>' : '') +
          (n.pro ? '<div class="note warn"><b class="t">Szakemberre tartozik</b><p>Ezt a javítást képesítéssel rendelkező szakember végezze el.</p></div>' : '') + '</div>';
      } else {
        body = '<div class="tb-q"><div class="tb-kicker">' + (path.length + 1) + '. lépés</div><h3>' + S.inline(n.q) + '</h3>' +
          (n.check ? '<div class="tb-check"><b>🔧 Ellenőrzés / mérés:</b> ' + S.inline(n.check) + '</div>' : '') +
          '<div class="tb-answers">' + n.answers.map(function (a, i) {
            return '<button type="button" class="btn" data-a="' + i + '">' + S.inline(a.t) + '</button>';
          }).join('') + '</div></div>';
      }
      el.innerHTML = '<div class="w-title">🛠️ Hibakereső: ' + esc(tr.title) + '</div>' + (tr.intro ? '<p class="w-help">' + S.inline(tr.intro) + '</p>' : '') +
        (trail ? '<ol class="tb-trail">' + trail + '</ol>' : '') + body +
        '<div class="row" style="margin-top:12px">' + (path.length ? '<button type="button" class="btn" id="tb-back">← Vissza egy lépést</button><button type="button" class="btn" id="tb-restart">↻ Újrakezdés</button>' : '') + '</div>';
      el.querySelectorAll('[data-a]').forEach(function (b) {
        b.addEventListener('click', function () {
          var a = n.answers[+b.dataset.a];
          path.push({ node: cur, answer: b.textContent });
          cur = a.next; paint();
        });
      });
      el.querySelectorAll('[data-back]').forEach(function (b) {
        b.addEventListener('click', function () { var i = +b.dataset.back; cur = path[i].node; path = path.slice(0, i); paint(); });
      });
      var bk = el.querySelector('#tb-back'), rs = el.querySelector('#tb-restart');
      if (bk) bk.addEventListener('click', function () { var p = path.pop(); cur = p.node; paint(); });
      if (rs) rs.addEventListener('click', function () { path = []; cur = tr.start; paint(); });
    }
    paint();
  });

  /* A fák hozzáadása a hozzájuk rendelt leckékhez (a tantárgyfájlok módosítása nélkül). */
  S.attachTroubles = function () {
    Object.keys(S.troubles).forEach(function (id) {
      (S.troubles[id].lessons || []).forEach(function (ref) {
        var p = ref.split('/'), s = S.subjects.filter(function (x) { return x.id === p[0]; })[0];
        var l = s && s.lessons.filter(function (x) { return x.id === p[1]; })[0];
        if (!l) return;
        l.widgets = l.widgets || [];
        if (!l.widgets.some(function (w) { return w.type === 'hibakereses' && w.options && w.options.tree === id; })) l.widgets.push({ type: 'hibakereses', options: { tree: id } });
      });
    });
  };
})();
