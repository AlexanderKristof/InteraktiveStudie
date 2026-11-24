/* Tudásműhely – „Mi miből áll?” felfedező.
 * Egy modell alkatrészekből áll. Minden alkatrész saját SVG-rajzot, szétszedési
 * eltolást és leírást kap (mi ez, miből van, hogyan készül). Ha egy alkatrésznek
 * van "link" mezője, egy másik modellbe lehet "belenézni" (egy szinttel lejjebb). */
(function () {
  'use strict';
  var S = window.STUDIE;
  var esc = S.esc, md = S.md;

  /* A felfedező lista oldalon megjelenő "utazás a mélybe" láncok. */
  S.chains = [
    ['alaplap', 'processzor', 'tranzisztor', 'atom'],
    ['elektromos-auto', 'akkucella', 'atom']
  ];

  S.renderModel = function (root, m, trail) {
    var exploded = false, selId = null, tab = 'what', step = 0;
    var vb = m.viewBox || '0 0 600 420';

    var crumbs = '<a href="#/">Kezdőlap</a><span>›</span><a href="#/felfedezo">Mi miből áll?</a>';
    trail.forEach(function (id, i) {
      var tm = S.models[id]; if (!tm) return;
      crumbs += '<span>›</span>' + (i === trail.length - 1 ? '<span>' + esc(tm.title) + '</span>'
        : '<a href="#/felfedezo/' + trail.slice(0, i + 1).join('/') + '">' + esc(tm.title) + '</a>');
    });

    // Rajzolási sorrend: kisebb z hátrébb (alul) van. A számozás a lista sorrendjét követi.
    var drawOrder = m.parts.map(function (p, i) { return { p: p, i: i }; })
      .sort(function (a, b) { return ((a.p.z || 0) - (b.p.z || 0)) || (a.i - b.i); });
    var partsSvg = drawOrder.map(function (o) {
      var p = o.p, i = o.i;
      return '<g class="part" data-id="' + p.id + '" tabindex="0" role="button" aria-label="' + esc((i + 1) + '. ' + p.name) + '">' +
        '<title>' + esc(p.name) + '</title>' + p.svg + '</g>';
    }).join('');

    root.innerHTML =
      '<nav class="crumbs">' + crumbs + '</nav>' +
      '<h1>' + m.icon + ' ' + esc(m.title) + '</h1><p class="lead">' + esc(m.summary) + '</p>' +
      '<div class="ex-layout">' +
      '<div class="ex-stage card"><div class="ex-toolbar">' +
      '<button type="button" class="btn primary" id="ex-explode">⇱ Szétszedés</button>' +
      '<button type="button" class="btn on" id="ex-badges">① Számok</button>' +
      (m.scale ? '<span class="scale">Valódi méret: ' + esc(m.scale) + '</span>' : '') + '</div>' +
      '<svg class="ex-svg" id="ex-svg" viewBox="' + vb + '" role="group" aria-label="' + esc(m.title) + ' alkatrészei">' +
      (m.backdrop || '') + partsSvg + (m.overlay || '') + '<g id="ex-badges-layer"></g></svg>' +
      '<div class="part-chips" id="ex-chips">' + m.parts.map(function (p, i) {
        return '<button type="button" data-id="' + p.id + '"><i>' + (i + 1) + '</i>' + esc(p.name) + '</button>';
      }).join('') + '</div></div>' +
      '<aside class="ex-info card" id="ex-info" aria-live="polite"></aside></div>' +
      (m.steps && m.steps.length ? '<h2>Hogyan készül? – lépésről lépésre</h2><div class="steps card" id="ex-steps"></div>' : '') +
      (m.history && m.history.length ? '<h2>Történet: mikor és hogyan alakult ki?</h2><ul class="history">' + m.history.map(function (h) {
        return '<li><b>' + esc(h.year) + '</b>' + S.inline(h.text) + '</li>';
      }).join('') + '</ul>' : '') +
      (m.uni ? (S.level === 'egyetem'
        ? '<h2>🎓 Egyetemi mélység</h2><div class="lesson-body">' + md(m.uni.text || '') + '</div>' + (m.uni.widgets || []).map(function (w) {
          return '<div class="widget card" data-widget="' + esc(JSON.stringify(w)) + '"></div>';
        }).join('') + (S.termCards ? S.termCards(m.uni.terms, 'Kapcsolódó szakszavak') : '')
        : '<div class="note uni-hint" style="margin-top:24px"><b class="t">🎓 Egyetemistáknak</b><p>Ehhez a modellhez paraméterezhető szimuláció, képletek és angol szakszavak is tartoznak. <button type="button" class="linkish" data-level="egyetem">Váltás egyetemi szintre</button></p></div>') : '') +
      (m.quiz && m.quiz.length ? '<h2>Ellenőrizd magad!</h2><div class="quiz card" id="ex-quiz"></div>' : '');

    var svg = root.querySelector('#ex-svg');
    var info = root.querySelector('#ex-info');
    var byId = {};
    m.parts.forEach(function (p, i) { byId[p.id] = { p: p, n: i + 1 }; });

    /* Számjelölők: ha a modell nem ad meg helyet (badge: [x, y]), az alkatrész közepére kerülnek. */
    var badgeLayer = svg.querySelector('#ex-badges-layer'), bhtml = '';
    m.parts.forEach(function (p, i) {
      var pos = p.badge;
      if (!pos) {
        var g = svg.querySelector('.part[data-id="' + p.id + '"]'), bb = null;
        try { bb = g.getBBox(); } catch (e) { /* nem renderelt */ }
        pos = bb && bb.width ? [bb.x + bb.width / 2, bb.y + bb.height / 2] : [20 + i * 26, 20];
      }
      bhtml += '<g class="badge-g" data-id="' + p.id + '"><circle cx="' + pos[0] + '" cy="' + pos[1] + '" r="11"/>' +
        '<text x="' + pos[0] + '" y="' + pos[1] + '">' + (i + 1) + '</text></g>';
    });
    badgeLayer.innerHTML = bhtml;

    function applyTransforms() {
      svg.querySelectorAll('.part, .badge-g').forEach(function (g) {
        var p = byId[g.dataset.id].p, d = exploded && p.explode ? p.explode : [0, 0];
        g.style.transform = 'translate(' + d[0] + 'px,' + d[1] + 'px)';
      });
    }

    function paintInfo() {
      if (!selId) {
        info.innerHTML = '<h3>Fedezd fel!</h3>' + md(m.intro || '') +
          '<p class="muted">Kattints egy alkatrészre a rajzon vagy a listában. A <b>Szétszedés</b> gombbal szétnyithatod a darabokat.</p>';
        return;
      }
      var e = byId[selId], p = e.p;
      var uni = S.level === 'egyetem';
      var tabs = [['what', 'Mi ez?', p.what], ['made', 'Miből van?', p.madeOf], ['how', 'Hogyan készül?', p.how]].concat(uni && p.uni ? [['uni', '🎓 Egyetemi háttér', p.uni]] : [])
        .filter(function (t) { return t[2]; });
      if (!tabs.some(function (t) { return t[0] === tab; })) tab = tabs[0] ? tabs[0][0] : 'what';
      var cur = tabs.filter(function (t) { return t[0] === tab; })[0];
      var link = p.link && S.models[p.link];
      info.innerHTML = '<h3><span class="n">' + e.n + '</span>' + esc(p.name) + '</h3>' +
        '<div class="tabs" role="tablist">' + tabs.map(function (t) {
          return '<button type="button" role="tab" aria-selected="' + (t[0] === tab) + '" class="' + (t[0] === tab ? 'on' : '') + '" data-tab="' + t[0] + '">' + t[1] + '</button>';
        }).join('') + '</div>' +
        '<div>' + md(cur ? cur[2] : '') + '</div>' +
        (uni && p.en ? '<p class="muted" style="margin:6px 0 0">🇬🇧 ' + esc(p.en) + '</p>' : '') +
        (uni && S.termCards ? S.termCards(p.terms, 'Szakszavak ehhez az alkatrészhez') : '') +
        (!uni && (p.uni || (p.terms && p.terms.length)) ? '<p class="muted" style="font-size:.88rem;margin-top:10px">🎓 Ehhez az alkatrészhez egyetemi magyarázat is tartozik. <button type="button" class="linkish" data-level="egyetem">Egyetemi szint</button></p>' : '') +
        (p.fact ? '<div class="fact">' + S.inline(p.fact) + '</div>' : '') +
        (link ? '<p style="margin-top:14px"><a class="btn primary" href="#/felfedezo/' + trail.concat(p.link).join('/') + '">🔍 Nézz bele: ' + esc(link.title) + ' →</a></p>' : '') +
        (p.lesson ? '<p><a class="btn" href="#/lecke/' + p.lesson + '">📘 Kapcsolódó lecke</a></p>' : '') +
        '<div class="row" style="margin-top:12px"><button type="button" class="btn" id="ex-prev">←</button><button type="button" class="btn" id="ex-next">→</button>' +
        '<button type="button" class="btn" id="ex-clear">Áttekintés</button></div>';
      info.querySelectorAll('[data-tab]').forEach(function (b) {
        b.addEventListener('click', function () { tab = b.dataset.tab; paintInfo(); });
      });
      info.querySelector('#ex-prev').addEventListener('click', function () { select(m.parts[(e.n - 2 + m.parts.length) % m.parts.length].id); });
      info.querySelector('#ex-next').addEventListener('click', function () { select(m.parts[e.n % m.parts.length].id); });
      info.querySelector('#ex-clear').addEventListener('click', function () { select(null); });
    }

    function select(id, keepTab) {
      selId = id;
      if (!keepTab) tab = 'what';
      highlight(id ? [id] : null);
      root.querySelectorAll('#ex-chips button').forEach(function (b) { b.classList.toggle('on', b.dataset.id === id); });
      paintInfo();
    }
    function highlight(ids) {
      svg.classList.toggle('has-sel', !!(ids && ids.length));
      svg.querySelectorAll('.part, .badge-g').forEach(function (g) {
        g.classList.toggle('sel', !!(ids && ids.indexOf(g.dataset.id) >= 0));
      });
    }

    svg.querySelectorAll('.part').forEach(function (g) {
      g.addEventListener('click', function () { select(g.dataset.id === selId ? null : g.dataset.id); });
      g.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); select(g.dataset.id); }
      });
    });
    svg.addEventListener('click', function (ev) { if (!ev.target.closest('.part')) select(null); });
    root.querySelectorAll('#ex-chips button').forEach(function (b) {
      b.addEventListener('click', function () { select(b.dataset.id === selId ? null : b.dataset.id); });
    });
    var exBtn = root.querySelector('#ex-explode');
    exBtn.addEventListener('click', function () {
      exploded = !exploded;
      exBtn.textContent = exploded ? '⇲ Összerakás' : '⇱ Szétszedés';
      applyTransforms();
    });
    var bBtn = root.querySelector('#ex-badges');
    bBtn.addEventListener('click', function () {
      var off = svg.classList.toggle('no-badges');
      bBtn.classList.toggle('on', !off);
    });

    /* Gyártási lépések */
    var stepsBox = root.querySelector('#ex-steps');
    function paintStep() {
      var st = m.steps[step];
      stepsBox.innerHTML = '<div class="step-head"><div class="dots">' + m.steps.map(function (_, i) {
        return '<button type="button" aria-label="' + (i + 1) + '. lépés" class="' + (i === step ? 'on' : i < step ? 'past' : '') + '" data-i="' + i + '"></button>';
      }).join('') + '</div><span class="muted">' + (step + 1) + ' / ' + m.steps.length + '</span></div>' +
        '<div class="step-body"><h3>' + (st.icon ? st.icon + ' ' : '') + esc(st.title) + (st.when ? ' <small>' + esc(st.when) + '</small>' : '') + '</h3>' + md(st.text) + '</div>' +
        '<div class="row"><button type="button" class="btn" id="st-prev"' + (step ? '' : ' disabled') + '>← Előző</button>' +
        '<button type="button" class="btn primary" id="st-next"' + (step < m.steps.length - 1 ? '' : ' disabled') + '>Következő lépés →</button>' +
        (st.parts ? '<button type="button" class="btn" id="st-show">Mutasd a rajzon</button>' : '') + '</div>';
      stepsBox.querySelectorAll('.dots button').forEach(function (b) {
        b.addEventListener('click', function () { step = +b.dataset.i; paintStep(); });
      });
      stepsBox.querySelector('#st-prev').addEventListener('click', function () { step--; paintStep(); });
      stepsBox.querySelector('#st-next').addEventListener('click', function () { step++; paintStep(); });
      var sh = stepsBox.querySelector('#st-show');
      if (sh) sh.addEventListener('click', function () {
        if (st.parts.length === 1) select(st.parts[0]);
        else { select(null); highlight(st.parts); }
        svg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
    if (stepsBox) paintStep();
    if (m.quiz && m.quiz.length) S.renderQuiz(root.querySelector('#ex-quiz'), m.quiz, 'model/' + m.id);

    if (S.mountWidgets) S.mountWidgets(root);
    applyTransforms();
    var pre = S.params && S.params.resz;
    if (pre && byId[pre]) select(pre); else paintInfo();
  };
})();
