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
    ['elektromos-auto', 'akkucella', 'atom'],
    ['okostelefon', 'processzor', 'tranzisztor', 'atom'],
    ['napelempanel', 'atom'],
    ['dns', 'atom']
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
      '<span class="zoom-btns"><button type="button" class="btn" id="ex-zin" aria-label="Nagyítás">＋</button><button type="button" class="btn" id="ex-zout" aria-label="Kicsinyítés">−</button><button type="button" class="btn" id="ex-zreset" aria-label="Teljes nézet">⟲</button></span>' +
      (m.scale ? '<span class="scale">Valódi méret: ' + esc(m.scale) + '</span>' : '') + '</div>' +
      '<svg class="ex-svg" id="ex-svg" viewBox="' + vb + '" role="group" aria-label="' + esc(m.title) + ' alkatrészei">' +
      (m.backdrop || '') + partsSvg + '<g id="ex-parts-end"></g>' + (m.overlay || '') + '<g id="ex-badges-layer"></g></svg>' +
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
    /* A kijelölt alkatrész(eke)t előrehozzuk, hogy ne takarja el semmi; kijelölés nélkül visszaáll az eredeti sorrend. */
    var partsEnd = svg.querySelector('#ex-parts-end');
    var origOrder = Array.prototype.slice.call(svg.querySelectorAll('.part'));
    function highlight(ids) {
      origOrder.forEach(function (g) { svg.insertBefore(g, partsEnd); });
      if (ids && ids.length) origOrder.forEach(function (g) { if (ids.indexOf(g.dataset.id) >= 0) svg.insertBefore(g, partsEnd); });
      svg.classList.toggle('has-sel', !!(ids && ids.length));
      svg.querySelectorAll('.part, .badge-g').forEach(function (g) {
        g.classList.toggle('sel', !!(ids && ids.indexOf(g.dataset.id) >= 0));
      });
      hlIds = ids && ids.length ? ids : null;
      if (hlIds) zoomToParts(hlIds); else zoomTo(base);
    }

    /* ---------- nagyítás: viewBox animálása ---------- */
    var hlIds = null;
    var base = (function () { var v = vb.split(/[\s,]+/).map(Number); return { x: v[0], y: v[1], w: v[2], h: v[3] }; })();
    var cur = { x: base.x, y: base.y, w: base.w, h: base.h }, anim = null;
    function setVB(v) {
      cur = v;
      svg.setAttribute('viewBox', v.x.toFixed(1) + ' ' + v.y.toFixed(1) + ' ' + v.w.toFixed(1) + ' ' + v.h.toFixed(1));
      var zoomed = v.w < base.w * 0.98;
      // a számjelölők nagyításkor ne nőjenek túl nagyra
      var k = Math.max(0.45, Math.min(1, v.w / base.w));
      badgeLayer.querySelectorAll('circle').forEach(function (c) { c.setAttribute('r', (11 * k).toFixed(2)); });
      badgeLayer.querySelectorAll('text').forEach(function (t) { t.style.fontSize = (12 * k).toFixed(2) + 'px'; });
      svg.classList.toggle('zoomed', zoomed);
      svg.style.touchAction = zoomed ? 'none' : 'manipulation';
    }
    function zoomTo(t) {
      // a képarány mindig az eredeti marad
      var ar = base.w / base.h;
      if (t.w / t.h > ar) { var nh = t.w / ar; t = { x: t.x, y: t.y - (nh - t.h) / 2, w: t.w, h: nh }; }
      else { var nw = t.h * ar; t = { x: t.x - (nw - t.w) / 2, y: t.y, w: nw, h: t.h }; }
      if (t.w > base.w * 1.5) t = { x: base.x, y: base.y, w: base.w, h: base.h };
      var from = cur, t0 = null;
      if (anim) cancelAnimationFrame(anim);
      if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return setVB(t);
      function step(ts) {
        if (t0 == null) t0 = ts;
        var k = Math.min(1, (ts - t0) / 550), e = 1 - Math.pow(1 - k, 3);
        setVB({ x: from.x + (t.x - from.x) * e, y: from.y + (t.y - from.y) * e, w: from.w + (t.w - from.w) * e, h: from.h + (t.h - from.h) * e });
        if (k < 1) anim = requestAnimationFrame(step); else anim = null;
      }
      anim = requestAnimationFrame(step);
    }
    function zoomToParts(ids) {
      var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      ids.forEach(function (id) {
        var g = svg.querySelector('.part[data-id="' + id + '"]'), bb;
        try { bb = g.getBBox(); } catch (e) { return; }
        var p = byId[id].p, d = exploded && p.explode ? p.explode : [0, 0];
        x0 = Math.min(x0, bb.x + d[0]); y0 = Math.min(y0, bb.y + d[1]);
        x1 = Math.max(x1, bb.x + bb.width + d[0]); y1 = Math.max(y1, bb.y + bb.height + d[1]);
      });
      if (!isFinite(x0)) return;
      var w = x1 - x0, h = y1 - y0, pad = Math.max(w, h) * 0.35 + 20;
      // ne nagyítson túl: legfeljebb kb. 4-szeres
      var minW = base.w / 4, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      var W = Math.max(w + pad * 2, minW), H = Math.max(h + pad * 2, minW * base.h / base.w);
      zoomTo({ x: cx - W / 2, y: cy - H / 2, w: W, h: H });
    }
    function zoomBy(f) {
      var cx = cur.x + cur.w / 2, cy = cur.y + cur.h / 2, w = Math.min(base.w * 1.2, Math.max(base.w / 8, cur.w * f)), h = w * base.h / base.w;
      zoomTo({ x: cx - w / 2, y: cy - h / 2, w: w, h: h });
    }
    root.querySelector('#ex-zin').addEventListener('click', function () { zoomBy(0.7); });
    root.querySelector('#ex-zout').addEventListener('click', function () { zoomBy(1.43); });
    root.querySelector('#ex-zreset').addEventListener('click', function () { zoomTo(base); });
    // touchpad csippentés / Ctrl + görgő
    svg.addEventListener('wheel', function (e) {
      if (!e.ctrlKey) return;
      e.preventDefault();
      zoomBy(e.deltaY > 0 ? 1.12 : 0.89);
    }, { passive: false });
    // húzással mozgatás nagyított állapotban
    var drag = null, dragged = false;
    svg.addEventListener('pointerdown', function (e) {
      if (!svg.classList.contains('zoomed')) return;
      drag = { x: e.clientX, y: e.clientY, vb: cur, id: e.pointerId }; dragged = false;
    });
    svg.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!dragged && Math.abs(dx) + Math.abs(dy) < 6) return;
      if (!dragged) { dragged = true; try { svg.setPointerCapture(e.pointerId); } catch (er) { /* nem támogatott */ } }
      var s = drag.vb.w / svg.clientWidth;
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      setVB({ x: drag.vb.x - dx * s, y: drag.vb.y - dy * s, w: drag.vb.w, h: drag.vb.h });
    });
    function endDrag() { drag = null; setTimeout(function () { dragged = false; }, 0); }
    svg.addEventListener('pointerup', endDrag);
    svg.addEventListener('pointercancel', endDrag);
    // húzás után ne számítson kattintásnak
    svg.addEventListener('click', function (e) { if (dragged) { e.stopPropagation(); e.preventDefault(); } }, true);

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
      if (hlIds) zoomToParts(hlIds);
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
