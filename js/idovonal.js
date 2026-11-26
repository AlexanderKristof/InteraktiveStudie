/* Tudásműhely – 🕰️ Történelmi idővonal és térképek.
 *   Oldal:   #/idovonal  ·  #/idovonal/<korszak>  (pl. #/idovonal/kozepkor)  ·  ?e=<esemény-id> egy esemény kártyája
 *            #/idovonal/terkep  ·  #/idovonal/terkep/<térkép-id>  ·  #/idovonal/jatek  („Rakd sorba!”)
 *   Widget:  widget: { type: 'idovonal', options: { korszak: 'kozepkor', sav: 'hu' } }        – nagyítható idővonal
 *            widget: { type: 'idovonal', options: { terkep: 'honfoglalas' } }                 – animált térkép
 *            widget: { type: 'idovonal', options: { jatek: true, korszak: 'ujkor', db: 6 } }  – „Rakd sorba!” játék
 *            widget: { type: 'idovonal', options: { events: [...] } }                         – a régi, leckébe írt idővonal (változatlanul)
 * Adat: data/idovonal.js (STUDIE.idovonal). Tárolás: 'idovonal.savok', 'idovonal.jatek'. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var oldWidget = S.widgets.idovonal || null; /* a widgets.js egyszerű idővonala – a meglévő leckék ezt használják (lent elkapjuk) */
  var uid = 0;

  function D() { return S.idovonal || { korszakok: [], savok: [], esemenyek: [], terkepek: [], geo: {}, szinek: {} }; }
  var prepared = false;
  function prep() {
    if (prepared || !S.idovonal) return;
    prepared = true;
    var seen = {};
    D().esemenyek.sort(function (a, b) { return a.y - b.y; }).forEach(function (e) {
      var id = (e.y < 0 ? 'm' + Math.round(-e.y) : String(Math.floor(e.y))) + '-' + S.norm(e.t).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30);
      while (seen[id]) id += 'x';
      seen[id] = 1; e.id = id;
      e._w = Math.min(170, 18 + e.t.length * 6.3);
    });
  }
  function evById(id) { return D().esemenyek.filter(function (e) { return e.id === id; })[0]; }
  function savById(id) { return D().savok.filter(function (s) { return s.id === id; })[0] || { id: id, t: id, ico: '•', c: '#888' }; }
  function eraById(id) { return D().korszakok.filter(function (k) { return k.id === id; })[0]; }
  function eraOf(y) { var k = D().korszakok; for (var i = 0; i < k.length; i++) if (y < k[i].to) return k[i]; return k[k.length - 1]; }
  function mapById(id) { return D().terkepek.filter(function (m) { return m.id === id; })[0]; }
  function uniLevel() { return S.level === 'egyetem'; }

  /* ---------- évszámok ---------- */
  function fmtYear(y) {
    if (y <= -10000) { var ago = 2000 - y; return ago >= 1e6 ? S.fmt(ago / 1e6, 1) + ' millió éve' : S.fmt(Math.round(ago / 1000), 0) + ' ezer éve'; }
    if (y < 0) return 'Kr. e. ' + Math.round(-y);
    return String(Math.floor(y));
  }
  function evLabel(e) { return e.l || fmtYear(e.y); }

  /* ---------- nem egyenletes időskála: a régmúlt össze van nyomva ---------- */
  var KN = [[-3400000, 0], [-300000, 0.9], [-40000, 1.8], [-10000, 2.6], [-3200, 3.8], [-500, 5.0], [476, 6.5], [1000, 7.4], [1492, 8.6], [1789, 10.0], [1914, 11.4], [1990, 12.9], [2030, 13.5]];
  var UMAX = KN[KN.length - 1][1];
  function U(y) {
    if (y <= KN[0][0]) return 0;
    for (var i = 1; i < KN.length; i++) if (y <= KN[i][0]) { var a = KN[i - 1], b = KN[i]; return a[1] + (y - a[0]) / (b[0] - a[0]) * (b[1] - a[1]); }
    return UMAX;
  }
  function Y(u) {
    if (u <= 0) return KN[0][0];
    for (var i = 1; i < KN.length; i++) if (u <= KN[i][1]) { var a = KN[i - 1], b = KN[i]; return a[0] + (u - a[1]) / (b[1] - a[1]) * (b[0] - a[0]); }
    return KN[KN.length - 1][0];
  }

  function lessonLink(ref) {
    var p = String(ref).split('/'), s = S.subjects.filter(function (x) { return x.id === p[0]; })[0];
    var l = s && s.lessons.filter(function (x) { return x.id === p[1]; })[0];
    return l ? '<a class="chip" href="#/lecke/' + esc(p[0]) + '/' + esc(p[1]) + '">' + esc(s.icon || '📘') + ' ' + esc(l.title) + '</a>' : '';
  }
  function uniBlock(text, title) {
    if (!text) return '';
    if (uniLevel()) return '<div class="note iv-uni"><b class="t">🎓 ' + esc(title || 'Történészi háttér, vitatott kérdések') + '</b><p>' + S.inline(text) + '</p></div>';
    return '<p class="iv-unihint muted">🎓 Ehhez történészi háttér és vitatott kérdések is tartoznak. <button type="button" class="linkish" data-level="egyetem">Váltás egyetemi szintre</button></p>';
  }

  /* ================================================================
   *  1. NAGYÍTHATÓ IDŐVONAL
   * ================================================================ */
  var pageState = null; /* az oldal állapota szintváltás / újrarajzolás után is megmarad */

  function timeline(host, o) {
    prep();
    o = o || {};
    var my = ++uid, compact = !!o.compact, R = compact ? 2 : 3, ROWH = 26, STRIP = 12;
    var eras = D().korszakok, lanes = D().savok, evs = D().esemenyek;
    var savedLanes = S.store.get('idovonal.savok', null);
    var st = o.state || { u0: 0, k: 0, sel: null, era: o.korszak || '', lanes: {} };
    lanes.forEach(function (l) {
      if (st.lanes[l.id] == null) st.lanes[l.id] = o.sav ? l.id === o.sav : (savedLanes && savedLanes[l.id] != null ? savedLanes[l.id] : true);
    });
    var laneH = STRIP + R * ROWH + 6;

    host.innerHTML = '<div class="iv-tl' + (compact ? ' iv-compact' : '') + '">' +
      '<div class="iv-tools"><div class="iv-erabtns" role="group" aria-label="Korszakok"><button type="button" class="chip" data-era="">🔭 Mind</button>' +
      eras.map(function (k) { return '<button type="button" class="chip" data-era="' + k.id + '" style="--ec:' + k.c + '"><span class="iv-dot"></span>' + esc(k.t) + '</button>'; }).join('') + '</div>' +
      '<div class="iv-zoom"><button type="button" class="btn sm" data-z="0.6" aria-label="Kicsinyítés">−</button><button type="button" class="btn sm" data-z="1.6" aria-label="Nagyítás">+</button><button type="button" class="btn sm" data-z="fit" title="Az egész idővonal">⤢</button></div></div>' +
      '<div class="iv-lanesel" role="group" aria-label="Sávok">' + lanes.map(function (l) {
        return '<label class="iv-lchk" style="--lc:' + l.c + '"><input type="checkbox" data-lane="' + l.id + '"' + (st.lanes[l.id] ? ' checked' : '') + '> ' + l.ico + ' ' + esc(l.t) + '</label>'; }).join('') +
      (compact ? '' : '<input type="search" class="iv-find" placeholder="🔎 Esemény keresése…" aria-label="Esemény keresése">') + '</div>' +
      (compact ? '' : '<div class="iv-found" hidden></div>') +
      '<div class="iv-erainfo"></div>' +
      '<div class="iv-view" tabindex="0" role="application" aria-label="Idővonal: húzd oldalra, nagyíts a + és − gombbal">' +
      '<div class="iv-bands"></div><div class="iv-rows">' + lanes.map(function (l) {
        return '<div class="iv-row" data-s="' + l.id + '" style="height:' + laneH + 'px;--lc:' + l.c + '"><span class="iv-rowlab">' + l.ico + ' ' + esc(l.t) + '</span></div>'; }).join('') +
      '</div><div class="iv-axis"></div></div>' +
      '<p class="iv-hint muted">↔ Húzd oldalra · ' + (compact ? 'nagyítás: + / − gomb vagy két ujj' : 'görgő, két ujj vagy + / −: nagyítás') + ' · kattints egy eseményre! <span class="iv-nonlin">A skála nem egyenletes: a régmúlt össze van nyomva.</span></p>' +
      '<div class="iv-cardhost" aria-live="polite"></div></div>';

    var root = host.querySelector('.iv-tl'), view = root.querySelector('.iv-view'), bands = root.querySelector('.iv-bands'), axis = root.querySelector('.iv-axis');
    var rows = {}, nodes = {};
    lanes.forEach(function (l) { rows[l.id] = root.querySelector('.iv-row[data-s="' + l.id + '"]'); });
    evs.forEach(function (e) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'iv-ev'; b.dataset.id = e.id;
      b.title = evLabel(e) + ' – ' + e.t;
      b.innerHTML = '<i></i><span>' + esc(e.t) + '</span>';
      (rows[e.s] || rows[lanes[0].id]).appendChild(b);
      nodes[e.id] = b;
    });

    function W() { return view.clientWidth || 600; }
    function kMin() { return W() / (UMAX + 0.3); }
    function clamp() {
      st.k = Math.max(kMin(), Math.min(st.k || kMin(), 6000));
      var span = W() / st.k;
      st.u0 = Math.max(-0.15, Math.min(st.u0, UMAX + 0.15 - span));
    }
    function X(u) { return (u - st.u0) * st.k; }

    function ticks(w) {
      var yA = Y(st.u0), yB = Y(st.u0 + w / st.k), placed = [], out = '';
      var steps = [1000000, 500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
      steps.forEach(function (s) {
        var deep = s >= 10000, list = [];
        if (deep) { /* „… éve” jelölés: a 2000-hez képest kerek évek */
          var aA = Math.ceil((2000 - yB) / s) * s, aB = Math.floor((2000 - yA) / s) * s;
          if ((aB - aA) / s > 300) return;
          for (var a = aA; a <= aB; a += s) if (2000 - a <= -8000) list.push(2000 - a);
        } else {
          var lo = Math.max(yA, -9000), a0 = Math.ceil(lo / s) * s, b0 = Math.floor(yB / s) * s;
          if (b0 < a0 || (b0 - a0) / s > 300) return;
          for (var y = a0; y <= b0; y += s) if (y !== 0) list.push(y);
        }
        list.forEach(function (y) {
          var x = X(U(y));
          for (var i = 0; i < placed.length; i++) if (Math.abs(placed[i] - x) < 74) return;
          placed.push(x);
          out += '<span class="iv-tick" style="transform:translateX(' + x.toFixed(1) + 'px)">' + esc(fmtYear(y)) + '</span>';
        });
      });
      return out;
    }

    var raf = 0;
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = 0; render(); }); }
    function render() {
      if (!document.body.contains(root)) return;
      clamp();
      var w = W();
      bands.innerHTML = eras.map(function (k) {
        var x0 = X(U(k.from)), x1 = X(U(k.to));
        if (x1 < 0 || x0 > w) return '';
        var lx = Math.max(0, -x0) + 6;
        return '<div class="iv-band" style="left:' + x0.toFixed(1) + 'px;width:' + (x1 - x0).toFixed(1) + 'px;--ec:' + k.c + '"><span style="left:' + lx.toFixed(1) + 'px">' + esc(k.t) + '</span></div>';
      }).join('');
      lanes.forEach(function (l) {
        rows[l.id].style.display = st.lanes[l.id] ? '' : 'none';
        if (!st.lanes[l.id]) return;
        var ends = []; for (var r = 0; r < R; r++) ends[r] = -1e9;
        evs.forEach(function (e) {
          if (e.s !== l.id) return;
          var n = nodes[e.id], x = X(U(e.y));
          if (x < -190 || x > w + 8) { n.style.display = 'none'; return; }
          n.style.display = '';
          var row = -1;
          for (var i = 0; i < R; i++) if (ends[i] < x - 6) { row = i; break; }
          var on = e.id === st.sel;
          if (on && row < 0) row = R - 1; /* a kiválasztott esemény felirata mindig látszik */
          if (row < 0) { n.className = 'iv-ev dot'; n.style.transform = 'translate(' + x.toFixed(1) + 'px,1px)'; n.tabIndex = -1; }
          else { ends[row] = x + e._w; n.className = 'iv-ev' + (on ? ' on' : ''); n.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (STRIP + row * ROWH) + 'px)'; n.tabIndex = 0; }
        });
      });
      axis.innerHTML = ticks(w);
    }

    function zoomAt(f, px) {
      var u = st.u0 + px / st.k;
      st.k = Math.max(kMin(), Math.min(st.k * f, 6000));
      st.u0 = u - px / st.k;
    }
    var anim = 0;
    function animateTo(u0, k) {
      cancelAnimationFrame(anim);
      var a0 = st.u0, k0 = st.k, t0 = null;
      (function step(t) {
        if (t0 == null) t0 = t;
        var p = Math.min(1, (t - t0) / 420), q = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        st.k = k0 + (k - k0) * q; st.u0 = a0 + (u0 - a0) * q; render();
        if (p < 1) anim = requestAnimationFrame(step);
      })(performance.now());
    }
    function showRange(yA, yB) {
      var uA = U(yA), uB = U(yB), pad = (uB - uA) * 0.04, k = W() / (uB - uA + 2 * pad);
      animateTo(uA - pad, Math.max(kMin(), Math.min(k, 6000)));
    }
    function setEra(id, instant, keepView) {
      st.era = id;
      root.querySelectorAll('[data-era]').forEach(function (b) { b.classList.toggle('on', b.dataset.era === id); });
      var k = eraById(id), info = root.querySelector('.iv-erainfo');
      if (k) {
        var n = evs.filter(function (e) { return e.y >= k.from && e.y < k.to; }).length;
        info.innerHTML = '<div class="iv-erabox" style="--ec:' + k.c + '"><b>' + esc(k.t) + '</b> <span class="muted">(' + esc(fmtYear(Math.max(k.from, -3300000))) + ' – ' + (k.to >= 2030 ? 'napjainkig' : esc(fmtYear(k.to))) + ' · ' + n + ' esemény)</span><p>' + S.inline(k.le) + '</p>' +
          (uniLevel() && k.uni ? '<p class="iv-erauni"><b>🎓 Korszakhatárok és fogalmak:</b> ' + S.inline(k.uni) + '</p>' : '') +
          (compact ? '' : '<p class="iv-eralinks"><a class="chip" href="#/idovonal/jatek?korszak=' + k.id + '">🧩 Rakd sorba – ' + esc(k.t) + '</a>' +
            D().terkepek.filter(function (m) { return m.korszak === k.id; }).map(function (m) { return '<a class="chip" href="#/idovonal/terkep/' + m.id + '">' + m.ico + ' ' + esc(m.t) + '</a>'; }).join('') + '</p>') + '</div>';
      } else info.innerHTML = '';
      if (keepView) render();
      else if (instant) {
        if (k) { var uA = U(k.from), uB = U(k.to), pad = (uB - uA) * 0.04; st.k = W() / (uB - uA + 2 * pad); st.u0 = uA - pad; }
        else { st.k = kMin(); st.u0 = -0.15; }
        render();
      } else if (k) showRange(k.from, k.to);
      else animateTo(-0.15, kMin());
      if (o.onEra && !keepView) o.onEra(id);
    }

    function visibleSorted() { return evs.filter(function (e) { return st.lanes[e.s]; }); }
    function select(id, center) {
      var e = evById(id);
      if (!e) return;
      st.sel = id;
      if (center) {
        var w = W(), k = st.k, x = X(U(e.y));
        if (x < w * 0.15 || x > w * 0.85) animateTo(U(e.y) - w / 2 / k, k); else render();
      } else render();
      root.querySelector('.iv-cardhost').innerHTML = card(e);
      if (o.onSelect) o.onSelect(e);
    }
    function card(e) {
      var lane = savById(e.s), era = eraOf(e.y);
      var links = (e.lk || []).map(lessonLink).join(''), m = e.map && mapById(e.map);
      return '<article class="iv-card card" style="--lc:' + lane.c + '">' +
        '<div class="iv-card-top"><span class="iv-badge">' + lane.ico + ' ' + esc(lane.t) + '</span><span class="iv-erab" style="--ec:' + era.c + '">' + esc(era.t) + '</span>' +
        '<button type="button" class="iv-x" data-close aria-label="Kártya bezárása">✕</button></div>' +
        '<div class="iv-date">' + esc(evLabel(e)) + '</div><h3>' + esc(e.t) + '</h3>' +
        '<div class="iv-cgrid"><div><h4>📜 Mi történt?</h4><p>' + S.inline(e.mi) + '</p></div><div><h4>💡 Miért fontos?</h4><p>' + S.inline(e.mf) + '</p></div></div>' +
        uniBlock(e.uni) +
        (links || m ? '<div class="iv-links"><span class="muted">Kapcsolódik:</span> ' + links + (m ? '<a class="chip" href="#/idovonal/terkep/' + m.id + '?ev=' + Math.floor(e.y) + '">' + m.ico + ' Térkép: ' + esc(m.t) + '</a>' : '') + '</div>' : '') +
        '<div class="iv-cardnav"><button type="button" class="btn sm" data-go="-1">← Előző esemény</button><button type="button" class="btn sm" data-go="1">Következő esemény →</button></div></article>';
    }

    /* ---- egér, érintés, csippentés ---- */
    var ptrs = {}, moved = false, downX = 0;
    function onDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (Object.keys(ptrs).length === 1) {
        moved = false; downX = e.clientX;
        window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp); window.addEventListener('pointercancel', onUp);
      }
    }
    function onMove(e) {
      var p = ptrs[e.pointerId];
      if (!p) return;
      var ids = Object.keys(ptrs);
      if (ids.length >= 2) {
        var a = ptrs[ids[0]], b = ptrs[ids[1]];
        var d0 = Math.hypot(a.x - b.x, a.y - b.y) || 1, m0 = (a.x + b.x) / 2;
        p.x = e.clientX; p.y = e.clientY;
        var d1 = Math.hypot(a.x - b.x, a.y - b.y) || 1, m1 = (a.x + b.x) / 2, rect = view.getBoundingClientRect();
        st.u0 -= (m1 - m0) / st.k;
        zoomAt(d1 / d0, m1 - rect.left);
        moved = true;
      } else {
        var dx = e.clientX - p.x;
        if (Math.abs(e.clientX - downX) > 4) moved = true;
        st.u0 -= dx / st.k;
        p.x = e.clientX; p.y = e.clientY;
      }
      schedule();
    }
    function onUp(e) {
      delete ptrs[e.pointerId];
      if (!Object.keys(ptrs).length) { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); window.removeEventListener('pointercancel', onUp); }
    }
    view.addEventListener('pointerdown', onDown);
    view.addEventListener('click', function (e) {
      if (moved) { moved = false; return; }
      var b = e.target.closest('.iv-ev');
      if (b) select(b.dataset.id, false);
    });
    view.addEventListener('wheel', function (e) {
      if (compact && !e.ctrlKey && document.activeElement !== view && !view.contains(document.activeElement)) return;
      e.preventDefault();
      var rect = view.getBoundingClientRect();
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) st.u0 += e.deltaX / st.k;
      else zoomAt(Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0015)), e.clientX - rect.left);
      schedule();
    }, { passive: false });
    view.addEventListener('keydown', function (e) {
      var w = W();
      if (e.key === 'ArrowLeft') st.u0 -= 80 / st.k;
      else if (e.key === 'ArrowRight') st.u0 += 80 / st.k;
      else if (e.key === '+' || e.key === '=') zoomAt(1.4, w / 2);
      else if (e.key === '-') zoomAt(1 / 1.4, w / 2);
      else if (e.key === 'Home') { st.k = kMin(); st.u0 = -0.15; }
      else return;
      e.preventDefault(); schedule();
    });

    root.querySelectorAll('[data-era]').forEach(function (b) { b.addEventListener('click', function () { setEra(b.dataset.era); }); });
    root.querySelectorAll('[data-z]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.z === 'fit') { setEra(''); return; }
        cancelAnimationFrame(anim); var w = W(), u = st.u0 + w / 2 / st.k, k = Math.max(kMin(), Math.min(st.k * parseFloat(b.dataset.z), 6000));
        animateTo(u - w / 2 / k, k);
      });
    });
    root.querySelectorAll('[data-lane]').forEach(function (c) {
      c.addEventListener('change', function () {
        st.lanes[c.dataset.lane] = c.checked;
        if (!Object.keys(st.lanes).some(function (k) { return st.lanes[k]; })) { st.lanes[c.dataset.lane] = c.checked = true; }
        if (!o.sav) S.store.set('idovonal.savok', st.lanes);
        render();
      });
    });
    root.querySelector('.iv-cardhost').addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) { st.sel = null; root.querySelector('.iv-cardhost').innerHTML = ''; render(); if (o.onSelect) o.onSelect(null); return; }
      var g = e.target.closest('[data-go]');
      if (!g) return;
      var list = visibleSorted(), i = list.map(function (x) { return x.id; }).indexOf(st.sel), n = list[i + (+g.dataset.go)];
      if (n) select(n.id, true);
    });
    var find = root.querySelector('.iv-find'), found = root.querySelector('.iv-found');
    if (find) {
      find.addEventListener('input', function () {
        var q = S.norm(find.value.trim()), words = q.split(/\s+/).filter(Boolean);
        if (!words.length) { found.hidden = true; return; }
        var hits = evs.filter(function (e) { var t = S.norm(e.t + ' ' + evLabel(e) + ' ' + e.mi); return words.every(function (w) { return t.indexOf(w) >= 0; }); }).slice(0, 8);
        found.hidden = false;
        found.innerHTML = hits.length ? hits.map(function (e) { return '<button type="button" class="chip" data-hit="' + e.id + '">' + savById(e.s).ico + ' ' + esc(evLabel(e)) + ' – ' + esc(e.t) + '</button>'; }).join('') : '<span class="muted">Nincs találat.</span>';
      });
      found.addEventListener('click', function (e) {
        var b = e.target.closest('[data-hit]');
        if (!b) return;
        var ev = evById(b.dataset.hit);
        if (!st.lanes[ev.s]) { st.lanes[ev.s] = true; root.querySelector('[data-lane="' + ev.s + '"]').checked = true; }
        var era = eraOf(ev.y); st.era = ''; setEraButtons();
        var k = Math.max(st.k, W() / ((U(era.to) - U(era.from)) * 1.1));
        st.k = k; st.u0 = U(ev.y) - W() / 2 / k;
        select(ev.id, false);
        root.querySelector('.iv-cardhost').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    }
    function setEraButtons() { root.querySelectorAll('[data-era]').forEach(function (b) { b.classList.toggle('on', b.dataset.era === st.era); }); }
    window.addEventListener('resize', function onR() { if (!document.body.contains(root)) { window.removeEventListener('resize', onR); return; } schedule(); });

    /* kezdőállapot */
    if (st.k) setEra(st.era || '', true, true);
    else setEra(st.era || '', true);
    if (o.sel && evById(o.sel)) {
      var ev0 = evById(o.sel);
      if (!st.lanes[ev0.s]) { st.lanes[ev0.s] = true; root.querySelector('[data-lane="' + ev0.s + '"]').checked = true; }
      if (!st.era) { var e0 = eraOf(ev0.y), uA = U(e0.from), uB = U(e0.to); st.k = Math.max(st.k, W() / ((uB - uA) * 1.1)); }
      st.u0 = U(ev0.y) - W() / 2 / st.k;
      select(o.sel, false);
    } else if (st.sel && evById(st.sel)) select(st.sel, false);
    return st;
  }

  /* ================================================================
   *  2. TÉRKÉPEK (vázlatos SVG)
   * ================================================================ */
  var OWN = { kir: 'Királyi Magyarország', tor: 'török kézen', erd: 'Erdélyi Fejedelemség', hab: 'Habsburg kézen' };
  function mapView(host, m, o) {
    o = o || {};
    var my = ++uid, G = D().geo, C = D().szinek;
    var v = m.view, cosC = m.world ? 1 : Math.cos((v[2] + v[3]) / 2 * Math.PI / 180);
    var VW = 800, k = VW / ((v[1] - v[0]) * cosC), VH = Math.round((v[3] - v[2]) * k);
    function P(p) { return [(p[0] - v[0]) * cosC * k, (v[3] - p[1]) * k]; }
    function pts(p) { return typeof p === 'string' ? G[p] : p; }
    function d(list, closed) { return list.map(function (p, i) { var q = P(p); return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join('') + (closed ? 'Z' : ''); }
    function vis(it, y) { return (it.from == null || y >= it.from) && (it.to == null || y <= it.to); }
    function arrowHead(list, c) {
      var a = P(list[list.length - 2]), b = P(list[list.length - 1]), ang = Math.atan2(b[1] - a[1], b[0] - a[0]), s = 13;
      function r(dx, dy) { return (b[0] + dx * Math.cos(ang) - dy * Math.sin(ang)).toFixed(1) + ',' + (b[1] + dx * Math.sin(ang) + dy * Math.cos(ang)).toFixed(1); }
      return '<polygon class="iv-ah" points="' + r(2, 0) + ' ' + r(-s, -s * 0.55) + ' ' + r(-s * 0.7, 0) + ' ' + r(-s, s * 0.55) + '" fill="' + c + '"/>';
    }
    var steps = m.steps || [], si = 0;
    if (o.year != null && steps.length) { steps.forEach(function (s, i) { if (s.y <= o.year) si = i; }); }
    var clips = {};
    (m.areas || []).forEach(function (a) { if (a.clip) clips[a.clip] = 1; });

    var svg = '<svg class="iv-svg" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" aria-label="' + esc(m.t) + ' – vázlatos térkép"><defs>' +
      Object.keys(clips).map(function (c) { return '<clipPath id="ivc' + my + c + '"><path d="' + d(pts(c), true) + '"/></clipPath>'; }).join('') + '</defs>' +
      '<rect class="iv-sea" x="0" y="0" width="' + VW + '" height="' + VH + '"/>' +
      '<g class="iv-land">' + G.land.map(function (l) { return '<path d="' + d(l, true) + '"/>'; }).join('') + '</g>' +
      '<g class="iv-water">' + G.sea.map(function (l) { return '<path d="' + d(l, true) + '"/>'; }).join('') + '</g>' +
      (m.mountains ? '<path class="iv-mnt" vector-effect="non-scaling-stroke" d="' + d(G.karpatok) + '"/>' : '') +
      '<g class="iv-areas">' + (m.areas || []).map(function (a, i) {
        var at = a.at ? P(a.at) : null;
        return '<g class="iv-it" data-k="a' + i + '"><path d="' + d(pts(a.pts), true) + '" fill="' + a.c + '" fill-opacity="' + (a.op || 0.5) + '" stroke="' + a.c + '" stroke-width="1.2" vector-effect="non-scaling-stroke"' + (a.clip ? ' clip-path="url(#ivc' + my + a.clip + ')"' : '') + '/>' +
          (at && a.lab ? '<text class="iv-alab" x="' + at[0].toFixed(1) + '" y="' + at[1].toFixed(1) + '" text-anchor="middle">' + esc(a.lab) + '</text>' : '') + '</g>';
      }).join('') + '</g>' +
      (m.rivers ? '<g class="iv-rivers">' + Object.keys(G.rivers).map(function (r) { return '<path vector-effect="non-scaling-stroke" d="' + d(G.rivers[r]) + '"/>'; }).join('') + '</g>' : '') +
      '<g class="iv-lines">' + (m.lines || []).map(function (l, i) {
        var list = pts(l.pts), dash = !!l.dash, mid = P(list[l.lp != null ? l.lp : Math.floor((list.length - 1) / 2)]);
        return '<g class="iv-it' + (dash ? ' iv-dashed' : ' iv-route') + '" data-k="l' + i + '"><path d="' + d(list, l.closed) + '" fill="none" stroke="' + l.c + '" stroke-width="' + (l.w || 3) + '" stroke-linecap="round" stroke-linejoin="round"' +
          (dash ? ' vector-effect="non-scaling-stroke" stroke-dasharray="' + l.dash + '"' : ' pathLength="1"') + '/>' + (l.arrow ? arrowHead(list, l.c) : '') +
          (l.lab ? '<text class="iv-llab" x="' + mid[0].toFixed(1) + '" y="' + (mid[1] - 8).toFixed(1) + '" text-anchor="middle" fill="' + l.c + '">' + esc(l.lab) + '</text>' : '') + '</g>';
      }).join('') + '</g>' +
      '<g class="iv-places">' + (m.places || []).map(function (p, i) {
        var q = P(p.p);
        var body = p.label ? '<text class="iv-region" x="' + q[0].toFixed(1) + '" y="' + q[1].toFixed(1) + '" text-anchor="middle">' + esc(p.n) + '</text>'
          : (p.holo ? '<rect class="iv-holo" x="' + (q[0] - 6).toFixed(1) + '" y="' + (q[1] - 6).toFixed(1) + '" width="12" height="12" rx="2"/>' : '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="6.5"' + (p.cap ? ' fill="' + C[p.cap] + '"' : '') + '/>') +
            (p.al === 'l' || q[0] > VW - 120 ? '<text x="' + (q[0] - 10).toFixed(1) + '" y="' + (q[1] + 4).toFixed(1) + '" text-anchor="end">' : '<text x="' + (q[0] + 10).toFixed(1) + '" y="' + (q[1] + 4).toFixed(1) + '">') + esc(p.n) + '</text>';
        return '<g class="iv-it iv-pl" data-k="p' + i + '" data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(p.n) + '">' + body + '</g>';
      }).join('') + '</g></svg>';

    var related = D().esemenyek.filter(function (e) { return e.map === m.id; });
    host.innerHTML = '<div class="iv-map">' +
      (o.compact ? '' : '<p class="iv-mle">' + S.inline(m.le) + '</p>') +
      (steps.length ? '<div class="iv-steps"><button type="button" class="btn sm iv-play" aria-label="Lejátszás">▶</button>' +
        '<input type="range" min="0" max="' + (steps.length - 1) + '" step="1" value="' + si + '" aria-label="Idő-csúszka">' +
        '<div class="iv-stepyrs">' + steps.map(function (s, i) { return '<button type="button" class="iv-sy" data-si="' + i + '">' + esc(s.l) + '</button>'; }).join('') + '</div></div>' : '') +
      '<div class="iv-steptx" aria-live="polite"></div>' +
      '<div class="iv-svgwrap"><div class="iv-svgin">' + svg + '</div></div>' +
      '<div class="iv-mtools"><button type="button" class="btn sm" data-mz="-1" aria-label="Térkép kicsinyítése">−</button><button type="button" class="btn sm" data-mz="1" aria-label="Térkép nagyítása">+</button>' +
      (m.legend ? '<div class="iv-legend">' + m.legend.map(function (l) { return '<span><i style="background:' + l[0] + '"></i>' + esc(l[1]) + '</span>'; }).join('') + '</div>' : '') + '</div>' +
      '<div class="iv-pinfo muted" aria-live="polite">👆 Kattints a térképen egy helyre a magyarázatért!</div>' +
      '<p class="iv-sketch">✏️ <b>Vázlatos térkép:</b> a partvonalakat, folyókat és határokat kézzel, erősen egyszerűsítve rajzoltuk – csak a nagy összefüggések megértésére szolgál, pontos határvonalakhoz használj történelmi atlaszt.</p>' +
      (o.compact ? '' : uniBlock(m.uni, 'Történészi háttér') +
        (related.length ? '<div class="iv-links"><span class="muted">Események az idővonalon:</span> ' + related.map(function (e) { return '<a class="chip" href="#/idovonal?e=' + e.id + '">' + esc(evLabel(e)) + ' – ' + esc(e.t) + '</a>'; }).join('') + '</div>' : '')) +
      '</div>';

    var root = host.querySelector('.iv-map'), svgEl = root.querySelector('svg'), inner = root.querySelector('.iv-svgin');
    var items = root.querySelectorAll('.iv-it'), shown = {}, zoom = 1;
    function itemOf(key) { var t = key[0], i = +key.slice(1); return t === 'a' ? m.areas[i] : t === 'l' ? m.lines[i] : m.places[i]; }
    function ownerAt(p, y) { var o2 = null; (p.own || []).forEach(function (x) { if (x[0] <= y) o2 = x[1]; }); return o2; }
    function curY() { return steps.length ? steps[si].y : 9999; }
    function paint(animate) {
      var y = curY();
      items.forEach(function (g) {
        var key = g.dataset.k, it = itemOf(key), on = vis(it, y);
        g.classList.toggle('iv-hide', !on);
        if (on && !shown[key] && animate) { g.classList.remove('iv-new'); void g.getBoundingClientRect(); g.classList.add('iv-new'); }
        shown[key] = on;
        if (key[0] === 'p' && it.own) {
          var ow = ownerAt(it, y), c = g.querySelector('circle');
          if (c) c.setAttribute('fill', C[ow] || C.kir);
        }
      });
      if (steps.length) {
        var s = steps[si];
        root.querySelector('.iv-steptx').innerHTML = '<b>' + esc(s.l) + ':</b> ' + S.inline(s.tx);
        root.querySelector('input[type=range]').value = si;
        root.querySelectorAll('.iv-sy').forEach(function (b) { b.classList.toggle('on', +b.dataset.si === si); });
      }
    }
    function fontFit() {
      var w = svgEl.getBoundingClientRect().width || VW, sc = w / VW;
      svgEl.style.fontSize = Math.max(11, Math.min(26, 12.5 / sc)).toFixed(1) + 'px';
    }
    function setZoom(z) {
      zoom = Math.max(1, Math.min(3, z));
      inner.style.width = (zoom * 100) + '%';
      fontFit();
    }
    if (steps.length) {
      var rng = root.querySelector('input[type=range]'), play = root.querySelector('.iv-play'), timer = null;
      rng.addEventListener('input', function () { si = +rng.value; paint(true); });
      root.querySelectorAll('.iv-sy').forEach(function (b) { b.addEventListener('click', function () { stop(); si = +b.dataset.si; paint(true); }); });
      var stop = function () { clearInterval(timer); timer = null; play.textContent = '▶'; play.setAttribute('aria-label', 'Lejátszás'); };
      play.addEventListener('click', function () {
        if (timer) { stop(); return; }
        if (si >= steps.length - 1) si = -1;
        play.textContent = '⏸'; play.setAttribute('aria-label', 'Szünet');
        var tick = function () { if (!document.body.contains(root)) return stop(); si++; paint(true); if (si >= steps.length - 1) stop(); };
        tick(); timer = setInterval(tick, 2600);
      });
    }
    function info(i) {
      var p = m.places[i], y = curY(), ow = ownerAt(p, y);
      root.querySelectorAll('.iv-pl').forEach(function (g) { g.classList.toggle('on', +g.dataset.i === i); });
      root.querySelector('.iv-pinfo').classList.remove('muted');
      root.querySelector('.iv-pinfo').innerHTML = '<b>📍 ' + esc(p.n) + '</b>' + (ow ? ' <span class="iv-own" style="--oc:' + C[ow] + '">' + esc(steps[si].l) + ': ' + esc(OWN[ow] || ow) + '</span>' : '') + '<br>' + S.inline(p.tx);
    }
    root.querySelector('.iv-places') && root.querySelector('svg').addEventListener('click', function (e) {
      var g = e.target.closest('.iv-pl');
      if (g && !g.classList.contains('iv-hide')) info(+g.dataset.i);
    });
    root.querySelectorAll('.iv-pl').forEach(function (g) { g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); info(+g.dataset.i); } }); });
    root.querySelectorAll('[data-mz]').forEach(function (b) { b.addEventListener('click', function () { setZoom(zoom + (+b.dataset.mz) * 0.5); }); });
    window.addEventListener('resize', function onR() { if (!document.body.contains(root)) { window.removeEventListener('resize', onR); return; } fontFit(); });
    setZoom(window.innerWidth <= 640 ? 1.5 : 1);
    paint(true);
  }

  /* ================================================================
   *  3. „RAKD SORBA!” JÁTÉK
   * ================================================================ */
  function game(host, o) {
    prep();
    o = o || {};
    var st = { n: o.db || (uniLevel() ? 7 : 5), era: o.korszak || '', sav: o.sav || '' };
    var round = null, locked = false;
    host.innerHTML = '<div class="iv-game">' +
      '<div class="iv-gset"><label><span>Korszak</span><select data-g="era"><option value="">Az összes korszak</option>' + D().korszakok.map(function (k) { return '<option value="' + k.id + '"' + (k.id === st.era ? ' selected' : '') + '>' + esc(k.t) + '</option>'; }).join('') + '</select></label>' +
      '<label><span>Sáv</span><select data-g="sav"><option value="">Minden sáv</option>' + D().savok.map(function (s) { return '<option value="' + s.id + '"' + (s.id === st.sav ? ' selected' : '') + '>' + s.ico + ' ' + esc(s.t) + '</option>'; }).join('') + '</select></label>' +
      '<label><span>Események száma</span><select data-g="n">' + [5, 6, 7, 8].map(function (n) { return '<option' + (n === st.n ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
      '<button type="button" class="btn" data-new>🔀 Új kör</button></div>' +
      '<p class="muted iv-ghelp">Rendezd az eseményeket <b>a legkorábbitól a legkésőbbiig</b>! Fogd meg a ☰ fogantyút és húzd, vagy használd a ▲ ▼ gombokat.</p>' +
      '<ol class="iv-sort"></ol><div class="iv-gbtns"><button type="button" class="btn primary" data-check>✔ Ellenőrzés</button></div>' +
      '<div class="iv-gres" aria-live="polite"></div><p class="iv-gstat muted"></p></div>';
    var root = host.querySelector('.iv-game'), list = root.querySelector('.iv-sort');

    function stats() {
      var s = S.store.get('idovonal.jatek', { pont: 0, kor: 0, hibatlan: 0, legjobb: 0 });
      root.querySelector('.iv-gstat').textContent = 'Eddig: ' + s.kor + ' kör · ' + s.pont + ' pont · ' + s.hibatlan + ' hibátlan kör · legjobb kör: ' + s.legjobb + ' pont';
      return s;
    }
    function pickSet() {
      var pool = D().esemenyek.filter(function (e) {
        if (st.sav && e.s !== st.sav) return false;
        if (st.era) { var k = eraById(st.era); if (!(e.y >= k.from && e.y < k.to)) return false; }
        return true;
      });
      var gap = uniLevel() ? 1 : 4, out = [];
      S.shuffle(pool).forEach(function (e) {
        if (out.length >= st.n) return;
        if (out.every(function (x) { return Math.abs(Math.floor(x.y) - Math.floor(e.y)) >= gap; })) out.push(e);
      });
      return out;
    }
    function newRound() {
      locked = false;
      var set = pickSet();
      root.querySelector('.iv-gres').innerHTML = '';
      root.querySelector('[data-check]').disabled = false;
      if (set.length < 3) { list.innerHTML = ''; root.querySelector('.iv-gres').innerHTML = '<div class="w-msg warn">Ehhez a beállításhoz kevés az esemény – válassz tágabb korszakot vagy minden sávot.</div>'; root.querySelector('[data-check]').disabled = true; return; }
      if (set.length < st.n) root.querySelector('.iv-gres').innerHTML = '<div class="w-msg warn">Csak ' + set.length + ' eseményt találtunk ehhez a beállításhoz.</div>';
      round = set;
      var order = S.shuffle(set);
      if (order.every(function (e, i) { return i === 0 || order[i - 1].y < e.y; })) order.reverse();
      list.innerHTML = order.map(function (e) {
        var l = savById(e.s);
        return '<li class="iv-item" data-id="' + e.id + '" style="--lc:' + l.c + '"><span class="iv-h" aria-hidden="true">☰</span><span class="iv-itx"><b>' + esc(e.t) + '</b><small>' + l.ico + ' ' + esc(l.t) + '</small></span><span class="iv-iyr"></span>' +
          '<span class="iv-mv"><button type="button" class="btn sm" data-mv="-1" aria-label="Feljebb">▲</button><button type="button" class="btn sm" data-mv="1" aria-label="Lejjebb">▼</button></span></li>';
      }).join('');
    }
    function check() {
      if (locked || !round) return;
      locked = true;
      var items = Array.prototype.slice.call(list.children), sorted = round.slice().sort(function (a, b) { return a.y - b.y; }), ok = 0;
      items.forEach(function (li, i) {
        var e = evById(li.dataset.id), good = sorted[i].id === e.id;
        if (good) ok++;
        li.classList.add(good ? 'ok' : 'bad');
        li.querySelector('.iv-iyr').textContent = evLabel(e);
      });
      var n = items.length, all = ok === n, pts = ok * 10 + (all ? 10 * (n - 3) : 0);
      var s = S.store.get('idovonal.jatek', { pont: 0, kor: 0, hibatlan: 0, legjobb: 0 });
      s.kor++; s.pont += pts; if (all) s.hibatlan++; s.legjobb = Math.max(s.legjobb, pts);
      S.store.set('idovonal.jatek', s);
      root.querySelector('[data-check]').disabled = true;
      root.querySelector('.iv-gres').innerHTML = '<div class="w-msg ' + (all ? 'ok' : ok >= n / 2 ? 'warn' : 'bad') + '"><b>' + ok + ' / ' + n + '</b> esemény került a helyére · <b>+' + pts + ' pont</b>' + (all ? ' – hibátlan, ' + (10 * (n - 3)) + ' pont jutalom! 🎉' : '') + '</div>' +
        (all ? '' : '<div class="iv-right"><b>A helyes sorrend:</b><ol>' + sorted.map(function (e) { return '<li><a href="#/idovonal?e=' + e.id + '">' + esc(evLabel(e)) + ' – ' + esc(e.t) + '</a></li>'; }).join('') + '</ol></div>') +
        '<p><button type="button" class="btn primary" data-new>🔀 Következő kör</button></p>';
      stats();
    }
    function move(li, dir) {
      if (locked) return;
      if (dir < 0 && li.previousElementSibling) list.insertBefore(li, li.previousElementSibling);
      else if (dir > 0 && li.nextElementSibling) list.insertBefore(li.nextElementSibling, li);
    }
    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-new]')) { newRound(); return; }
      if (e.target.closest('[data-check]')) { check(); return; }
      var b = e.target.closest('[data-mv]');
      if (b) { var li = b.closest('li'); move(li, +b.dataset.mv); b.focus(); }
    });
    root.querySelectorAll('select[data-g]').forEach(function (s) {
      s.addEventListener('change', function () { st[s.dataset.g] = s.dataset.g === 'n' ? +s.value : s.value; newRound(); });
    });
    /* húzás egérrel (bárhol a soron) vagy érintéssel (a ☰ fogantyún) */
    var drag = null;
    list.addEventListener('pointerdown', function (e) {
      var li = e.target.closest('li');
      if (!li || locked || e.target.closest('button')) return;
      if (e.pointerType !== 'mouse' && !e.target.closest('.iv-h')) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      drag = li; li.classList.add('drag');
      try { li.setPointerCapture(e.pointerId); } catch (x) { /* régi böngésző */ }
    });
    list.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var others = Array.prototype.slice.call(list.children).filter(function (x) { return x !== drag; }), idx = 0;
      others.forEach(function (x) { var r = x.getBoundingClientRect(); if (e.clientY > r.top + r.height / 2) idx++; });
      var ref = others[idx] || null;
      if (ref !== drag.nextElementSibling) list.insertBefore(drag, ref);
    });
    function endDrag() { if (drag) { drag.classList.remove('drag'); drag = null; } }
    list.addEventListener('pointerup', endDrag);
    list.addEventListener('pointercancel', endDrag);
    stats();
    newRound();
  }

  /* ================================================================
   *  WIDGET – leckékbe is betehető
   * ================================================================ */
  /* A widgets.js később tölt be, és szintén 'idovonal' néven regisztrál: a beállítást elkapjuk (az lesz a régi,
   * events-es változat), a lekérdezés pedig mindig ezt a bővített widgetet adja vissza. */
  function ivWidget(el, o) {
    o = o || {};
    if (o.events) { if (oldWidget) oldWidget(el, o); return; }
    prep();
    var head = function (t, help) { return '<div class="w-title">' + esc(t) + '</div>' + (help ? '<p class="w-help">' + S.inline(help) + '</p>' : ''); };
    if (o.terkep) {
      var m = mapById(o.terkep);
      if (!m) { el.innerHTML = '<p class="muted">Ismeretlen térkép: ' + esc(o.terkep) + '</p>'; return; }
      el.innerHTML = head(o.title || m.ico + ' ' + m.t, o.help || m.le) + '<div class="iv-wbody"></div><p class="iv-wmore"><a href="#/idovonal/terkep/' + m.id + '">Az összes térkép ↗</a></p>';
      mapView(el.querySelector('.iv-wbody'), m, { compact: true, year: o.ev });
    } else if (o.jatek) {
      el.innerHTML = head(o.title || '🧩 Rakd sorba!', o.help) + '<div class="iv-wbody"></div>';
      game(el.querySelector('.iv-wbody'), o);
    } else {
      var k = o.korszak && eraById(o.korszak);
      el.innerHTML = head(o.title || '🕰️ Történelmi idővonal' + (k ? ': ' + k.t : ''), o.help) + '<div class="iv-wbody"></div><p class="iv-wmore"><a href="#/idovonal' + (k ? '/' + k.id : '') + '">Teljes idővonal, térképek és játék ↗</a></p>';
      timeline(el.querySelector('.iv-wbody'), { compact: true, korszak: o.korszak, sav: o.sav, sel: o.esemeny });
    }
  }
  try {
    Object.defineProperty(S.widgets, 'idovonal', { configurable: true, enumerable: true,
      get: function () { return ivWidget; },
      set: function (fn) { if (fn !== ivWidget) oldWidget = fn; } });
  } catch (e) { S.widgets.idovonal = ivWidget; }

  /* ================================================================
   *  OLDAL: #/idovonal
   * ================================================================ */
  S.addRoute('idovonal', { title: 'Idővonal és térképek', nav: '', page: function (main, rest, params) {
    prep();
    var sub = rest[0] || '', era = eraById(sub);
    if (sub && sub !== 'terkep' && sub !== 'jatek' && !era) return false;
    var tab = sub === 'terkep' ? 'terkep' : sub === 'jatek' ? 'jatek' : 'tl';
    var m = null;
    if (tab === 'terkep') { m = rest[1] ? mapById(rest[1]) : D().terkepek[0]; if (!m) return false; }
    var nEv = D().esemenyek.length, nMap = D().terkepek.length;
    var crumbs = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span>' + (tab === 'tl' && !era ? '<span>Idővonal és térképek</span>' : '<a href="#/idovonal">Idővonal és térképek</a><span>›</span><span>' + esc(tab === 'terkep' ? 'Térképek' : tab === 'jatek' ? 'Rakd sorba!' : era.t) + '</span>') + '</nav>';
    main.innerHTML = crumbs + '<h1>🕰️ Történelmi idővonal és térképek</h1>' +
      '<p class="lead">' + (uniLevel()
        ? 'A magyar és az egyetemes történelem ' + nEv + ' fordulópontja az őskortól napjainkig, négy párhuzamos sávban. A kártyákon a történetírói hátteret és a vitatott kérdéseket is összefoglaljuk.'
        : 'Utazz az időben az őskortól napjainkig! ' + nEv + ' esemény négy sávban: mi történt Magyarországon, a világban, a tudományban és a kultúrában – ugyanabban az időben.') + '</p>' +
      '<div class="iv-tabs" role="tablist"><a class="chip' + (tab === 'tl' ? ' on' : '') + '" href="#/idovonal">🕰️ Idővonal</a><a class="chip' + (tab === 'terkep' ? ' on' : '') + '" href="#/idovonal/terkep">🗺️ Térképek (' + nMap + ')</a><a class="chip' + (tab === 'jatek' ? ' on' : '') + '" href="#/idovonal/jatek">🧩 Rakd sorba!</a></div>' +
      '<div class="iv-page"></div>';
    var box = main.querySelector('.iv-page');
    if (tab === 'tl') {
      var keep = pageState && pageState.era === (era ? era.id : '') && !params.e ? pageState : null;
      pageState = timeline(box, {
        korszak: era ? era.id : '', sel: params.e, state: keep,
        onSelect: function (e) { try { history.replaceState(null, '', '#/idovonal' + (pageState && pageState.era ? '/' + pageState.era : '') + (e ? '?e=' + e.id : '')); } catch (x) { /* file:// alatt is működik, de ha nem: nem gond */ } },
        onEra: function (id) { if (pageState) pageState.era = id; try { history.replaceState(null, '', '#/idovonal' + (id ? '/' + id : '')); } catch (x) { /* */ } }
      });
      box.insertAdjacentHTML('beforeend', '<div class="iv-legendbox card pad"><h2>Hogyan használd?</h2><ul>' +
        '<li><b>Korszak-gombok:</b> egy kattintással ráközelítesz egy korszakra; a háttérszínek a korszakokat jelölik.</li>' +
        '<li><b>Sávok:</b> kapcsold ki-be a magyar, a világ-, a tudomány- és a kultúrtörténeti sávot.</li>' +
        '<li><b>Nagyítás:</b> egérgörgő, két ujjas csippentés, a + / − gombok vagy a billentyűzet (← → + −).</li>' +
        '<li>Ha közelebb nagyítasz, több esemény felirata látszik; a kis pöttyökre is rákattinthatsz.</li></ul>' +
        '<p class="muted">Az évszámokat több forrásból ellenőriztük; ahol a pontos dátum bizonytalan, „körül” vagy „kb.” szerepel.</p></div>');
    } else if (tab === 'terkep') {
      box.innerHTML = '<div class="iv-maplist">' + D().terkepek.map(function (x) { return '<a class="chip' + (x === m ? ' on' : '') + '" href="#/idovonal/terkep/' + x.id + '">' + x.ico + ' ' + esc(x.t) + '</a>'; }).join('') + '</div>' +
        '<section class="card pad iv-mapcard"><h2>' + m.ico + ' ' + esc(m.t) + '</h2><div class="iv-mhost"></div></section>';
      mapView(box.querySelector('.iv-mhost'), m, { year: params.ev != null ? +params.ev : null });
    } else {
      box.innerHTML = '<section class="card pad"><h2>🧩 Rakd sorba!</h2><div class="iv-ghost"></div></section>';
      game(box.querySelector('.iv-ghost'), { korszak: eraById(params.korszak) ? params.korszak : '', sav: params.sav || '' });
    }
    return true;
  } });
})();
