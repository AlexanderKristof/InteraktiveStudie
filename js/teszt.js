/* Tudásműhely – Tesztközpont: témákra bontott kérdésbank, 4 válaszlehetőség,
 * azonnali visszajelzés vagy vizsga mód (értékelés csak a végén).
 *
 * Extra kérdések hozzáadása (data/kerdesek/*.js):
 *   STUDIE.addQuestions('villanyszereles', {
 *     alapfogalmak: [ { q: '…', options: ['helyes', 'rossz', 'rossz', 'rossz'], answer: 0, explain: '…' } ]
 *   });
 * Az első kulcs a tantárgy (vagy egyetemi kurzus) azonosítója, a belső kulcsok a lecke (vagy témakör) azonosítói. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  S.bank = {};
  S.addQuestions = function (group, byTopic) {
    var g = S.bank[group] = S.bank[group] || {};
    Object.keys(byTopic).forEach(function (t) { g[t] = (g[t] || []).concat(byTopic[t]); });
  };
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  /* ---------- a kérdésbank összeállítása ---------- */
  function genTermQuestions(c, topicId) {
    var terms = c.terms.filter(function (t) { return t.topic === topicId; }), out = [];
    function distract(t, pick) {
      var same = S.shuffle(c.terms.filter(function (x) { return x !== t && x.topic === t.topic && pick(x); }));
      var other = S.shuffle(c.terms.filter(function (x) { return x !== t && x.topic !== t.topic && pick(x); }));
      return same.concat(other).slice(0, 3);
    }
    terms.forEach(function (t) {
      var d = distract(t, function () { return true; });
      if (d.length === 3) {
        out.push({ id: 'g-' + c.id + '-' + t.id + '-def', q: 'Melyik fogalomra illik ez a meghatározás? „' + t.short + '”', options: [t.term].concat(d.map(function (x) { return x.term; })), answer: 0,
          explain: '**' + t.term + '**' + (t.en ? ' (🇬🇧 ' + t.en + ')' : '') + '. [[#/egyetem/' + c.id + '/fogalom/' + t.id + '|A szakszó részletes leírása →]]' });
        out.push({ id: 'g-' + c.id + '-' + t.id + '-rev', q: 'Mit jelent a(z) **' + t.term + '** kifejezés?', options: [t.short].concat(d.map(function (x) { return x.short; })), answer: 0,
          explain: t.short });
      }
      if (t.en) {
        var de = distract(t, function (x) { return !!x.en; });
        if (de.length === 3) out.push({ id: 'g-' + c.id + '-' + t.id + '-en', q: 'Mi a(z) **' + t.term + '** angol szakkifejezése?', options: [t.en].concat(de.map(function (x) { return x.en; })), answer: 0, explain: t.term + ' = ' + t.en + '.' });
      }
    });
    return out;
  }

  /* Csoportok → témák → kérdések. Minden kérdés kap egy stabil azonosítót a statisztikához. */
  function buildGroups() {
    var groups = [];
    S.subjects.forEach(function (s) {
      var extra = S.bank[s.id] || {};
      groups.push({ id: s.id, title: s.title, icon: s.icon, color: s.color, kind: S.stageTitle(s.stage).replace(/^\S+\s/, ''),
        topics: s.lessons.map(function (l) {
          var qs = (l.quiz || []).concat(extra[l.id] || []).map(function (q, i) { return Object.assign({ id: s.id + '/' + l.id + '/' + i }, q); });
          return { id: l.id, title: l.title, href: '#/lecke/' + s.id + '/' + l.id, questions: qs };
        }).filter(function (t) { return t.questions.length; }) });
    });
    var models = Object.keys(S.models).map(function (k) { return S.models[k]; }).filter(function (m) { return m.quiz && m.quiz.length; });
    if (models.length) groups.push({ id: 'felfedezo', title: 'Mi miből áll?', icon: '🔍', color: '#0e9aa7', kind: 'Felfedező',
      topics: models.map(function (m) {
        return { id: m.id, title: m.title, href: '#/felfedezo/' + m.id, questions: m.quiz.concat((S.bank.felfedezo || {})[m.id] || []).map(function (q, i) { return Object.assign({ id: 'model/' + m.id + '/' + i }, q); }) };
      }) });
    (S.courses || []).forEach(function (c) {
      var extra = S.bank[c.id] || {};
      groups.push({ id: c.id, title: c.title, icon: c.icon, color: c.color, kind: 'Egyetem',
        topics: (c.topics || []).map(function (t) {
          return { id: t.id, title: t.title, href: '#/egyetem/' + c.id, questions: genTermQuestions(c, t.id).concat((extra[t.id] || []).map(function (q, i) { return Object.assign({ id: c.id + '/' + t.id + '/x' + i }, q); })) };
        }).filter(function (t) { return t.questions.length; }) });
    });
    return groups.filter(function (g) { return g.topics.length; });
  }

  /* ---------- statisztika ---------- */
  function stats() { return S.store.get('teszt.stats', {}); }
  function topicPct(st, key) { var x = st[key]; return x && x.n ? Math.round(x.ok / x.n * 100) : null; }
  function grade(pct) {
    return pct >= 88 ? [5, 'jeles'] : pct >= 75 ? [4, 'jó'] : pct >= 62 ? [3, 'közepes'] : pct >= 50 ? [2, 'elégséges'] : [1, 'elégtelen'];
  }

  /* ---------- beállító oldal ---------- */
  /* ---------- megosztható osztálydolgozat ---------- */
  function encodeCfg(c) { return btoa(unescape(encodeURIComponent(JSON.stringify(c)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function decodeCfg(s) {
    try { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return JSON.parse(decodeURIComponent(escape(atob(s)))); }
    catch (e) { return null; }
  }
  function sshuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function sharedTest(main, cfg) {
    var groups = buildGroups(), pool = [];
    cfg.s.forEach(function (key) {
      var p = key.split('/'), g = groups.filter(function (x) { return x.id === p[0]; })[0];
      var t = g && g.topics.filter(function (x) { return x.id === p[1]; })[0];
      if (t) t.questions.forEach(function (q) { pool.push({ q: q, g: g, t: t }); });
    });
    var items = sshuffle(pool, seeded(cfg.r));
    if (cfg.n) items = items.slice(0, cfg.n);
    var topics = [];
    items.forEach(function (x) { var n = x.g.icon + ' ' + x.t.title; if (topics.indexOf(n) < 0) topics.push(n); });
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Osztálydolgozat</span></nav>' +
      '<div class="card pad shared-test"><h1>📝 Osztálydolgozat</h1>' +
      (items.length ? '<p class="lead">' + items.length + ' kérdés' + (cfg.t ? ' · ⏱ ' + cfg.t + ' perc' : '') + ' · ' + (cfg.m === 'vizsga' ? 'értékelés a végén' : 'azonnali visszajelzés') + '</p>' +
        '<p class="muted">Témák: ' + topics.map(esc).join(', ') + '</p>' +
        '<form id="sh-form" class="row"><input type="text" id="sh-name" placeholder="Írd be a neved" required style="padding:10px 12px;border-radius:10px;border:1px solid var(--line);min-width:220px">' +
        '<button class="btn primary" type="submit">Kezdés →</button></form><p class="muted" style="font-size:.85rem">A végén mutasd meg a tanárodnak az eredményoldalt.</p>'
        : '<p>Ez a dolgozat-link olyan témákra hivatkozik, amelyek ebben a változatban nem találhatók.</p>') + '</div>';
    var f = main.querySelector('#sh-form');
    if (f) f.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = main.querySelector('#sh-name').value.trim();
      run(main, items, cfg.m === 'vizsga' ? 'vizsga' : 'azonnali', 'osztaly', { seed: cfg.r, minutes: cfg.t || 0, label: 'Osztálydolgozat – ' + name, student: name, backHref: '#/', backLabel: 'Kezdőlap' });
    });
  }

  /* A tesztközpont nagy címsorai: iskolai szintek, egyetem, szakmák, felfedező. */
  var SECTIONS = [['altalanos', '🎒 Általános iskola'], ['kozep', '🏫 Középiskola'], ['egyetem', '🎓 Egyetem'], ['szakma', '🛠️ Szakmák'], ['sport', '⚽ Sport és mozgás'], ['elet', '🧭 Felnőtt élet'], ['felfedezo', '🔍 Mi miből áll? (modellek)']];
  function secOf(g) {
    if (g.id === 'felfedezo') return 'felfedezo';
    if (S.courseById && S.courseById(g.id)) return 'egyetem';
    var sj = S.subjects.filter(function (x) { return x.id === g.id; })[0];
    return sj ? (sj.stage || 'kozep') : 'kozep';
  }
  S.pageTeszt = function (main, params) {
    if (params && params.d) { var cfg = decodeCfg(params.d); if (cfg && cfg.s) return sharedTest(main, cfg); }
    var groups = buildGroups(), st = stats();
    function groupHtml(g) {
        var n = 0; g.topics.forEach(function (t) { n += t.questions.length; });
        return '<details class="card ts-group" style="--tile:' + g.color + '"' + (g.topics.some(function (t) { return sel[g.id + '/' + t.id]; }) ? ' open' : '') + '>' +
          '<summary><span class="ico">' + g.icon + '</span><span class="ts-gt"><b>' + esc(g.title) + '</b><small>' + g.topics.length + ' téma · ' + n + ' kérdés</small></span>' +
          '<label class="ts-all" onclick="event.stopPropagation()"><input type="checkbox" data-group="' + g.id + '"> mind</label></summary>' +
          '<div class="ts-list">' + g.topics.map(function (t) {
            var key = g.id + '/' + t.id, p = topicPct(st, key);
            return '<label class="ts-topic"><input type="checkbox" data-key="' + key + '"' + (sel[key] ? ' checked' : '') + '><span>' + esc(t.title) + '</span>' +
              (p != null ? '<span class="badge ' + (p >= 80 ? 'l1' : p >= 60 ? 'l2' : 'l3') + '">' + p + '%</span>' : '') + '<small>' + t.questions.length + '</small></label>';
          }).join('') + '</div></details>';
    }
    var saved = S.store.get('teszt.setup', { mode: 'azonnali', count: 20, sel: null });
    var sel = {};
    if (params.targy) groups.forEach(function (g) { if (g.id === params.targy) g.topics.forEach(function (t) { sel[g.id + '/' + t.id] = 1; }); });
    else if (saved.sel) saved.sel.forEach(function (k) { sel[k] = 1; });
    else groups.slice(0, 1).forEach(function (g) { g.topics.forEach(function (t) { sel[g.id + '/' + t.id] = 1; }); });
    var mode = saved.mode, count = saved.count;
    var total = 0; groups.forEach(function (g) { g.topics.forEach(function (t) { total += t.questions.length; }); });

    // gyenge témák: legalább 4 megválaszolt kérdés, 70% alatt
    var weak = [];
    groups.forEach(function (g) { g.topics.forEach(function (t) { var p = topicPct(st, g.id + '/' + t.id); if (p != null && st[g.id + '/' + t.id].n >= 4 && p < 70) weak.push({ g: g, t: t, p: p }); }); });
    weak.sort(function (a, b) { return a.p - b.p; });

    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Tesztközpont</span></nav>' +
      '<h1>Tesztközpont</h1><p class="lead">Válassz témákat, állítsd be a kérdések számát és a módot. A kérdésbankban jelenleg <b>' + total + '</b> kérdés van, mindegyik 4 válaszlehetőséggel.</p>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap;margin:8px 0"><a class="btn" href="#/parbaj">⚔️ Párbaj egymás ellen</a><a class="btn" href="#/sajat">✏️ Saját kérdéseim</a><a class="btn" href="#/ismetles">🔁 Mai ismétlés' + (S.srsDue && S.srsDue().length ? ' (' + S.srsDue().length + ')' : '') + '</a></div>' +
      '<a class="card osz-promo" href="#/osszeallito"><span class="ico">🧩</span><span><b>Kérdés-összeállító</b><small>Keress kulcsszóra az összes kérdés között, válogasd ki, ami kell, és készíts belőle vizsgát vagy nyomtatható dolgozatot.</small></span><span class="btn primary">Megnyitás →</span></a>' +
      (weak.length ? '<div class="note warn"><b class="t">Gyenge pontjaid: ezeket érdemes gyakorolni</b><div class="chips" style="margin-top:6px">' + weak.slice(0, 6).map(function (w) {
        return '<button type="button" class="chip" data-weak="' + w.g.id + '/' + w.t.id + '">' + w.g.icon + ' ' + esc(w.t.title) + ' · ' + w.p + '%</button>';
      }).join('') + '</div></div>' : '') +
      '<div class="ts-find card pad"><input type="search" id="ts-find" placeholder="🔎 Keresés tantárgyra, kurzusra vagy témára… (pl. fizika, Ohm, IFRS, sejt, 1848)" autocomplete="off">' +
      '<span class="muted" id="ts-find-n"></span><a class="btn sm" id="ts-find-q" href="#/osszeallito">🧩 Keresés a kérdések szövegében is</a></div>' +
      '<div class="ts-layout"><div class="ts-topics">' + SECTIONS.map(function (sec) {
        var gs = groups.filter(function (g) { return secOf(g) === sec[0]; });
        if (!gs.length) return '';
        var qn = 0; gs.forEach(function (g) { g.topics.forEach(function (t) { qn += t.questions.length; }); });
        var any = gs.some(function (g) { return g.topics.some(function (t) { return sel[g.id + '/' + t.id]; }); });
        return '<details class="ts-section" data-sec="' + sec[0] + '"' + (any ? ' open' : '') + '><summary class="ts-sec-head"><span class="ts-sec-title">' + sec[1] + '</span>' +
          '<span class="ts-sec-meta">' + gs.length + ' ' + (sec[0] === 'felfedezo' ? 'csoport' : sec[0] === 'egyetem' ? 'kurzus' : 'tantárgy') + ' · ' + qn + ' kérdés <b data-seccount="' + sec[0] + '"></b></span>' +
          '<label class="ts-all" onclick="event.stopPropagation()"><input type="checkbox" data-section="' + sec[0] + '"> mind</label></summary><div class="ts-sec-body">' + gs.map(groupHtml).join('') + '</div></details>';
      }).join('') + '</div>' +
      '<aside class="card pad ts-side"><h3>Beállítások</h3>' +
      '<p class="muted" style="margin:0 0 4px">Visszajelzés</p><div class="ts-modes">' +
      '<button type="button" data-mode="azonnali"><b>⚡ Azonnali</b><span>Minden kérdés után kiírja, hogy helyes volt-e, magyarázattal.</span></button>' +
      '<button type="button" data-mode="vizsga"><b>📝 Vizsga mód</b><span>Csak a végén értékel. Közben visszaléphetsz és módosíthatsz.</span></button></div>' +
      '<p class="muted" style="margin:14px 0 4px">Kérdések száma</p><div class="seg" id="ts-count">' + [10, 20, 30, 50, 0].map(function (c) {
        return '<button type="button" data-c="' + c + '">' + (c || 'Mind') + '</button>';
      }).join('') + '</div>' +
      '<p class="ts-sum" id="ts-sum"></p><button type="button" class="btn primary" id="ts-start" style="width:100%;justify-content:center">Teszt indítása →</button>' +
      '<button type="button" class="btn" id="ts-print" style="width:100%;justify-content:center;margin-top:8px">🖨 Nyomtatható feladatlap</button>' +
      '<button type="button" class="btn" id="ts-link" style="width:100%;justify-content:center;margin-top:8px">🔗 Osztálydolgozat-link</button><div id="ts-linkbox"></div>' +
      (S.store.get('teszt.history', []).length ? '<h3 style="margin-top:20px">Legutóbbi tesztjeid</h3><ul class="ts-hist">' + S.store.get('teszt.history', []).slice(0, 5).map(function (h) {
        var gr = grade(h.pct);
        return '<li><b>' + h.pct + '%</b> <span class="badge">' + gr[0] + ' (' + gr[1] + ')</span> <small class="muted">' + h.n + ' kérdés · ' + (h.mode === 'vizsga' ? 'vizsga' : 'azonnali') + ' · ' + esc(h.date) + '</small></li>';
      }).join('') + '</ul>' : '') + '</aside></div>';

    function selected() {
      var qs = [];
      groups.forEach(function (g) { g.topics.forEach(function (t) { if (sel[g.id + '/' + t.id]) t.questions.forEach(function (q) { qs.push({ q: q, g: g, t: t }); }); }); });
      return qs;
    }
    function paint() {
      main.querySelectorAll('[data-mode]').forEach(function (b) { b.classList.toggle('on', b.dataset.mode === mode); });
      main.querySelectorAll('#ts-count button').forEach(function (b) { b.classList.toggle('on', +b.dataset.c === count); });
      main.querySelectorAll('[data-key]').forEach(function (i) { i.checked = !!sel[i.dataset.key]; });
      main.querySelectorAll('[data-group]').forEach(function (i) {
        var g = groups.filter(function (x) { return x.id === i.dataset.group; })[0];
        var k = g.topics.filter(function (t) { return sel[g.id + '/' + t.id]; }).length;
        i.checked = k === g.topics.length; i.indeterminate = k > 0 && k < g.topics.length;
      });
      (function () {
        var fi = main.querySelector('#ts-find'), cnt = main.querySelector('#ts-find-n'), qa = main.querySelector('#ts-find-q');
        if (!fi) return;
        function ws(x) { return ' ' + x.replace(/[^a-z0-9]+/g, ' ') + ' '; }
        function hit(x, w) { return x.indexOf(' ' + w) >= 0; }
        var qText = {};
        groups.forEach(function (g) { g.topics.forEach(function (t) { qText[g.id + '/' + t.id] = t.questions.map(function (q) { return ws(S.norm(q.q + ' ' + q.options.join(' '))); }); }); });
        fi.addEventListener('input', function () {
          var qHits = 0;
          var q = S.norm(fi.value.trim()), words = q.split(/\s+/).filter(Boolean), hitT = 0;
          qa.href = '#/osszeallito' + (fi.value.trim() ? '?q=' + encodeURIComponent(fi.value.trim()) : '');
          main.querySelectorAll('.ts-section').forEach(function (sec) {
            var secTitle = S.norm(sec.querySelector('.ts-sec-title').textContent), secHit = false;
            sec.querySelectorAll('.ts-group').forEach(function (gr) {
              var gTitle = S.norm(gr.querySelector('.ts-gt b').textContent), gHit = false;
              var gAll = words.length && words.every(function (w) { return hit(ws(gTitle + ' ' + secTitle), w); });
              gr.querySelectorAll('.ts-topic').forEach(function (tp) {
                var tTitle = S.norm(tp.querySelector('span').textContent), key = tp.querySelector('input').dataset.key;
                var ok = !words.length || gAll || words.every(function (w) { return hit(ws(tTitle + ' ' + gTitle + ' ' + secTitle), w); });
                var nq = words.length ? (qText[key] || []).filter(function (x) { return words.every(function (w) { return hit(x, w); }); }).length : 0;
                var badge = tp.querySelector('.ts-qhit'); if (badge) badge.remove();
                if (!ok && nq) { ok = true; qHits += nq; tp.insertAdjacentHTML('beforeend', '<span class="badge ts-qhit">🔎 ' + nq + ' kérdés</span>'); }
                tp.hidden = !ok; if (ok) { gHit = true; if (words.length) hitT++; }
              });
              gr.hidden = !gHit; if (gHit) secHit = true;
              if (words.length) gr.open = gHit;
            });
            sec.hidden = !secHit;
            if (words.length) sec.open = secHit;
          });
          cnt.textContent = words.length ? (hitT ? hitT + ' téma illik a keresésre' + (qHits ? ' (ebből ' + qHits + ' kérdés szövegében is szerepel)' : '') + ' – pipáld ki, amelyik kell.' : 'Nincs találat.') : '';
        });
      })();
      main.querySelectorAll('[data-section]').forEach(function (i) {
        var tot = 0, k = 0;
        groups.forEach(function (g) { if (secOf(g) !== i.dataset.section) return; g.topics.forEach(function (t) { tot++; if (sel[g.id + '/' + t.id]) k++; }); });
        i.checked = tot > 0 && k === tot; i.indeterminate = k > 0 && k < tot;
        var lab = main.querySelector('[data-seccount="' + i.dataset.section + '"]');
        if (lab) lab.textContent = k ? '· ' + k + ' téma kijelölve' : '';
      });
      var avail = selected().length, n = count ? Math.min(count, avail) : avail;
      main.querySelector('#ts-sum').innerHTML = avail ? '<b>' + n + '</b> kérdés a kiválasztott <b>' + avail + '</b> közül, ' + (mode === 'vizsga' ? 'vizsga módban.' : 'azonnali visszajelzéssel.') : 'Jelölj ki legalább egy témát!';
      main.querySelector('#ts-start').disabled = !avail;
    }
    main.querySelectorAll('[data-key]').forEach(function (i) { i.addEventListener('change', function () { if (i.checked) sel[i.dataset.key] = 1; else delete sel[i.dataset.key]; paint(); }); });
    main.querySelectorAll('[data-group]').forEach(function (i) {
      i.addEventListener('change', function () {
        var g = groups.filter(function (x) { return x.id === i.dataset.group; })[0];
        g.topics.forEach(function (t) { if (i.checked) sel[g.id + '/' + t.id] = 1; else delete sel[g.id + '/' + t.id]; });
        paint();
      });
    });
    main.querySelectorAll('[data-section]').forEach(function (i) {
      i.addEventListener('change', function () {
        groups.forEach(function (g) {
          if (secOf(g) !== i.dataset.section) return;
          g.topics.forEach(function (t) { if (i.checked) sel[g.id + '/' + t.id] = 1; else delete sel[g.id + '/' + t.id]; });
        });
        paint();
      });
    });
    main.querySelectorAll('[data-mode]').forEach(function (b) { b.addEventListener('click', function () { mode = b.dataset.mode; paint(); }); });
    main.querySelectorAll('#ts-count button').forEach(function (b) { b.addEventListener('click', function () { count = +b.dataset.c; paint(); }); });
    main.querySelectorAll('[data-weak]').forEach(function (b) {
      b.addEventListener('click', function () { sel = {}; sel[b.dataset.weak] = 1; paint(); main.querySelector('#ts-start').scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    });
    main.querySelector('#ts-link').addEventListener('click', function () {
      var keys = Object.keys(sel);
      if (!keys.length) return;
      var mins = prompt('Időkorlát percben (0 = nincs időkorlát):', count ? String(Math.round((count || 20) * 1.5)) : '0');
      if (mins === null) return;
      var cfg = { s: keys, n: count || 0, m: mode, t: Math.max(0, parseInt(mins, 10) || 0), r: Math.floor(Math.random() * 1e9) };
      var url = location.href.split('#')[0] + '#/teszt?d=' + encodeCfg(cfg);
      var box = main.querySelector('#ts-linkbox');
      box.innerHTML = '<div class="linkbox"><input type="text" readonly value="' + esc(url) + '"><button type="button" class="btn sm" id="ts-copy">Másolás</button>' +
        '<small class="muted">Küldd el ezt a linket a diákoknak. Mindenki ugyanazt a ' + (cfg.n || 'összes') + ' kérdést kapja ugyanabban a sorrendben' + (cfg.t ? ', ' + cfg.t + ' perc alatt' : '') + '. A link a weboldalas (GitHub Pages) változattal működik.</small></div>';
      var inp = box.querySelector('input'); inp.select();
      box.querySelector('#ts-copy').addEventListener('click', function () {
        inp.select();
        var ok = false; try { ok = document.execCommand('copy'); } catch (e) { /* régi böngésző */ }
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { ok = true; }, function () {});
        this.textContent = '✔ Másolva';
      });
    });
    main.querySelector('#ts-print').addEventListener('click', function () {
      var pool = S.shuffle(selected()), list = count ? pool.slice(0, count) : pool;
      printSheet(list);
    });
    main.querySelector('#ts-start').addEventListener('click', function () {
      S.store.set('teszt.setup', { mode: mode, count: count, sel: Object.keys(sel) });
      var pool = S.shuffle(selected());
      run(main, count ? pool.slice(0, count) : pool, mode);
    });
    paint();
  };

  /* ---------- nyomtatható feladatlap megoldókulccsal ---------- */
  function plain(t) { return String(t || '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[\[[^|\]]+\|(.+?)\]\]/g, '$1'); }
  function printSheet(items, title) {
    var qs = items.map(function (it) {
      var opts = S.shuffle(it.q.options.map(function (t, k) { return { t: t, ok: k === it.q.answer }; }));
      return { q: it.q, t: it.t, g: it.g, opts: opts };
    });
    var topics = [];
    qs.forEach(function (x) { var n = x.g.title + ' – ' + x.t.title; if (topics.indexOf(n) < 0) topics.push(n); });
    var html = '<!doctype html><html lang="hu"><head><meta charset="utf-8"><title>Feladatlap – Tudásműhely</title><style>' +
      'body{font:14px/1.45 system-ui,Segoe UI,Arial,sans-serif;color:#111;max-width:780px;margin:24px auto;padding:0 16px}' +
      'h1{font-size:20px;margin:0 0 4px}.meta{color:#555;font-size:12px;margin-bottom:14px}.name{display:flex;gap:24px;margin:10px 0 18px}' +
      '.name span{flex:1;border-bottom:1px solid #999;padding-bottom:2px}ol.q>li{margin:0 0 12px;break-inside:avoid}ol.q>li>b{display:block;margin-bottom:4px}' +
      '.o{display:grid;grid-template-columns:1fr 1fr;gap:2px 16px}.o div:before{content:"☐ ";}' +
      '.key{break-before:page}.key ol{columns:3;font-size:12px}.key li{break-inside:avoid;margin-bottom:4px}' +
      '@media print{.noprint{display:none}}</style></head><body>' +
      '<p class="noprint"><button onclick="window.print()">🖨 Nyomtatás</button></p>' +
      '<h1>' + esc(title || 'Feladatlap') + '</h1><div class="meta">' + (topics.length > 6 ? topics.slice(0, 6).map(esc).join(' · ') + ' · …' : topics.map(esc).join(' · ')) + '<br>' + qs.length + ' kérdés · Tudásműhely</div>' +
      '<div class="name"><span>Név:</span><span>Osztály:</span><span>Dátum:</span><span>Pont: &nbsp;&nbsp;&nbsp;/ ' + qs.length + '</span></div>' +
      '<ol class="q">' + qs.map(function (x) {
        return '<li><b>' + esc(plain(x.q.q)) + '</b><div class="o">' + x.opts.map(function (o, k) { return '<div>' + LETTERS[k] + ') ' + esc(plain(o.t)) + '</div>'; }).join('') + '</div></li>';
      }).join('') + '</ol>' +
      '<div class="key"><h1>Megoldókulcs</h1><ol>' + qs.map(function (x) {
        var k = x.opts.findIndex(function (o) { return o.ok; });
        return '<li><b>' + LETTERS[k] + '</b> – ' + esc(plain(x.opts[k].t)) + '</li>';
      }).join('') + '</ol></div></body></html>';
    var w = window.open('', '_blank');
    if (!w) { alert('A böngésző letiltotta az új ablakot. Engedélyezd a felugró ablakokat ehhez az oldalhoz.'); return; }
    w.document.open(); w.document.write(html); w.document.close();
  }

  /* ---------- napi kihívás: dátumból kevert, mindenkinek ugyanaz az 5 kérdés ---------- */
  function seeded(seed) { return function () { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }; }
  S.dailyKey = function () { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  S.startDaily = function (main) {
    var all = [];
    var uni = S.level === 'egyetem';
    buildGroups().filter(function (g) { return uni ? g.kind === 'Egyetem' || g.id === 'felfedezo' || g.kind === 'Középiskola' : g.kind !== 'Egyetem'; }).forEach(function (g) { g.topics.forEach(function (t) { t.questions.forEach(function (q) { if (q.options.length === 4) all.push({ q: q, g: g, t: t }); }); }); });
    var key = S.dailyKey() + (uni ? 'u' : ''), seed = 0;
    for (var i = 0; i < key.length; i++) seed = (seed * 31 + key.charCodeAt(i)) % 4294967296;
    var rnd = seeded(seed);
    for (var j = all.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)); var tmp = all[j]; all[j] = all[k]; all[k] = tmp; }
    run(main, all.slice(0, 5), 'azonnali', 'napi');
  };

  /* ---------- a teszt futtatása ---------- */
  /* Más modulok (pl. a vizsgafelkészítő) számára. */
  S.testGroups = buildGroups;
  S.printSheet = printSheet;
  S.testItems = function (groupId, topicIds) {
    var out = [];
    buildGroups().forEach(function (g) {
      if (g.id !== groupId) return;
      g.topics.forEach(function (t) { if (!topicIds || topicIds.indexOf(t.id) >= 0) t.questions.forEach(function (q) { out.push({ q: q, g: g, t: t }); }); });
    });
    return out;
  };
  S.runTest = function (main, items, mode, opts) { run(main, items, mode, opts && opts.kind, opts || {}); };
  S.testGrade = grade;

  function run(main, items, mode, kind, ropts) {
    ropts = ropts || {};
    var orng = ropts.seed != null ? seeded(ropts.seed + 7) : null;
    var qs = items.map(function (it) {
      var base = it.q.options.map(function (t, k) { return { t: t, ok: k === it.q.answer }; });
      var opts = orng ? sshuffle(base, orng) : S.shuffle(base);
      return { q: it.q, g: it.g, t: it.t, meta: it.meta, opts: opts, pick: null, locked: false };
    });
    var i = 0, t0 = Date.now(), finished = false, timer = null;
    window.scrollTo(0, 0);
    if (ropts.minutes) {
      var deadline = t0 + ropts.minutes * 60000;
      timer = setInterval(function () {
        var el = main.querySelector('#ts-timer');
        if (!el || finished) { if (!el) { clearInterval(timer); } return; }
        var left = Math.max(0, Math.round((deadline - Date.now()) / 1000));
        el.textContent = '⏱ ' + Math.floor(left / 60) + ':' + ('0' + left % 60).slice(-2);
        el.classList.toggle('low', left < 120);
        if (!left) { clearInterval(timer); finished = true; alert('Lejárt az idő! A dolgozatot beadtuk.'); results(); }
      }, 500);
    }

    function palette() {
      return '<div class="ts-pal" aria-label="Kérdések">' + qs.map(function (x, k) {
        var cls = k === i ? 'cur' : '';
        if (mode === 'azonnali' && x.locked) cls += x.opts[x.pick].ok ? ' ok' : ' bad';
        else if (x.pick != null) cls += ' done';
        return '<button type="button" data-go="' + k + '" class="' + cls + '">' + (k + 1) + '</button>';
      }).join('') + '</div>';
    }
    function score() { return qs.filter(function (x) { return x.pick != null && x.opts[x.pick].ok; }).length; }

    function show() {
      var x = qs[i], answered = qs.filter(function (y) { return y.pick != null; }).length;
      var reveal = mode === 'azonnali' && x.locked;
      main.innerHTML = '<nav class="crumbs"><a href="' + (ropts.backHref || '#/teszt') + '">' + esc(ropts.backLabel || 'Tesztközpont') + '</a><span>›</span><span>' + (ropts.label ? esc(ropts.label) : mode === 'vizsga' ? '📝 Vizsga mód' : '⚡ Azonnali visszajelzés') + '</span></nav>' +
        '<div class="ts-run"><div class="ts-top"><span class="badge" style="background:color-mix(in srgb,' + x.g.color + ' 18%,transparent)">' + x.g.icon + ' ' + esc(x.g.title) + ' › ' + esc(x.t.title) + '</span>' +
        (ropts.minutes ? '<span class="ts-timer" id="ts-timer">⏱</span>' : '') +
        '<span class="muted">' + (mode === 'azonnali' ? 'Pontszám: <b>' + score() + '</b> / ' + qs.filter(function (y) { return y.locked; }).length : 'Megválaszolva: <b>' + answered + '</b> / ' + qs.length) + '</span></div>' +
        '<div class="bar" style="margin:10px 0 16px"><i style="width:' + Math.round((i + 1) / qs.length * 100) + '%"></i></div>' +
        '<div class="card quiz ts-q"><div class="progress">' + (i + 1) + '. kérdés / ' + qs.length + '</div><div class="q">' + S.inline(x.q.q) + '</div><div class="opts">' +
        x.opts.map(function (o, k) {
          var cls = 'opt';
          if (reveal) { if (o.ok) cls += ' right'; else if (k === x.pick) cls += ' wrong'; }
          else if (k === x.pick) cls += ' picked';
          return '<button type="button" class="' + cls + '" data-k="' + k + '"' + (reveal ? ' disabled' : '') + '><span class="ltr">' + LETTERS[k] + '</span>' + S.inline(o.t) + '</button>';
        }).join('') + '</div>' +
        (reveal ? '<div class="explain"><b>' + (x.opts[x.pick].ok ? '✔ Helyes!' : '✘ Nem jó. A helyes válasz: ' + LETTERS[x.opts.findIndex(function (o) { return o.ok; })]) + '</b> ' + S.inline(x.q.explain || '') + '</div>' : '') +
        '<div class="row ts-nav"><button type="button" class="btn" id="ts-prev"' + (i ? '' : ' disabled') + '>← Előző</button>' +
        (i < qs.length - 1 ? '<button type="button" class="btn primary" id="ts-next"' + (mode === 'azonnali' && !x.locked ? ' disabled' : '') + '>Következő →</button>' : '') +
        (mode === 'vizsga' || i === qs.length - 1 ? '<button type="button" class="btn ' + (i === qs.length - 1 ? 'primary' : '') + '" id="ts-submit"' + (mode === 'azonnali' && !x.locked ? ' disabled' : '') + '>' + (mode === 'vizsga' ? 'Beadás és értékelés' : 'Eredmény') + '</button>' : '') +
        '</div><p class="muted ts-keys">Billentyűk: 1–4 vagy A–D a válaszhoz, Enter a továbblépéshez.</p></div>' + palette() + '</div>';

      main.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () { choose(+b.dataset.k); });
      });
      var nx = main.querySelector('#ts-next'), pv = main.querySelector('#ts-prev'), sb = main.querySelector('#ts-submit');
      if (nx) nx.addEventListener('click', function () { i++; show(); });
      pv.addEventListener('click', function () { i--; show(); });
      if (sb) sb.addEventListener('click', submit);
      main.querySelectorAll('[data-go]').forEach(function (b) { b.addEventListener('click', function () { i = +b.dataset.go; show(); }); });
      if (reveal && nx) nx.focus();
    }
    function choose(k) {
      var x = qs[i];
      if (x.locked) return;
      x.pick = k;
      if (mode === 'azonnali') x.locked = true;
      show();
    }
    function submit() {
      var open = qs.filter(function (x) { return x.pick == null; }).length;
      if (open && !confirm(open + ' kérdésre még nem válaszoltál. Biztosan beadod?')) return;
      finished = true;
      results();
    }
    function onKey(e) {
      if (finished || !document.body.contains(main.querySelector('.ts-run'))) { document.removeEventListener('keydown', onKey); return; }
      if (e.target.closest && e.target.closest('input, textarea')) return;
      var k = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 }[e.key.toLowerCase()];
      if (k != null && k < qs[i].opts.length) { choose(k); e.preventDefault(); }
      else if (e.key === 'Enter' || e.key === 'ArrowRight') {
        if (i < qs.length - 1 && (mode === 'vizsga' || qs[i].locked)) { i++; show(); e.preventDefault(); }
      } else if (e.key === 'ArrowLeft' && i > 0) { i--; show(); }
    }
    document.addEventListener('keydown', onKey);

    function results() {
      var ok = score(), pct = Math.round(ok / qs.length * 100), gr = grade(pct), secs = Math.round((Date.now() - t0) / 1000);
      // statisztika mentése témánként
      var st = stats(), byTopic = {};
      qs.forEach(function (x) {
        var key = x.g.id + '/' + x.t.id, good = x.pick != null && x.opts[x.pick].ok;
        if (S.srsRecord) S.srsRecord(x.q, good, x.meta || { label: x.g.title + ' – ' + x.t.title, href: x.t.href, gid: x.g.id, tid: x.t.id });
        if (S.logAnswer && !x.g.srs) S.logAnswer({ gid: x.g.id, tid: x.t.id, q: x.q.q, your: x.pick != null ? x.opts[x.pick].t : null, right: x.q.options[x.q.answer], href: x.t.href, label: x.g.title + ' – ' + x.t.title, src: 'teszt' }, good);
        if (x.g.srs) return;
        st[key] = st[key] || { n: 0, ok: 0 }; st[key].n++; if (good) st[key].ok++;
        byTopic[key] = byTopic[key] || { g: x.g, t: x.t, n: 0, ok: 0 }; byTopic[key].n++; if (good) byTopic[key].ok++;
      });
      S.store.set('teszt.stats', st);
      var hist = S.store.get('teszt.history', []);
      hist.unshift({ pct: pct, n: qs.length, mode: mode, date: new Date().toLocaleDateString('hu-HU') + ' ' + new Date().toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }) });
      S.store.set('teszt.history', hist.slice(0, 30));
      if (timer) clearInterval(timer);
      if (ropts.onFinish) { try { ropts.onFinish(pct, ok, qs.length); } catch (e) { /* nem kritikus */ } }
      if (kind === 'napi') { var dl = S.store.get('daily', {}); dl[S.dailyKey()] = ok; S.store.set('daily', dl); }
      var wrong = qs.filter(function (x) { return x.pick == null || !x.opts[x.pick].ok; });
      var filter = 'mind';

      function paintReview() {
        var list = filter === 'hibas' ? wrong : qs;
        main.querySelector('#ts-review').innerHTML = list.length ? list.map(function (x) {
          var n = qs.indexOf(x) + 1, good = x.pick != null && x.opts[x.pick].ok;
          return '<div class="card ts-rv ' + (good ? 'ok' : 'bad') + '"><div class="row" style="justify-content:space-between"><b>' + n + '. ' + (good ? '✔' : x.pick == null ? '– nincs válasz' : '✘') + '</b><small class="muted">' + x.g.icon + ' ' + esc(x.t.title) + '</small></div>' +
            '<div class="q">' + S.inline(x.q.q) + '</div><ul>' + x.opts.map(function (o, k) {
              return '<li class="' + (o.ok ? 'right' : k === x.pick ? 'wrong' : '') + '"><span class="ltr">' + LETTERS[k] + '</span>' + S.inline(o.t) + (o.ok ? ' <b>✔ helyes</b>' : k === x.pick ? ' <b>← a te válaszod</b>' : '') + '</li>';
            }).join('') + '</ul>' + (x.q.explain ? '<div class="explain">' + S.inline(x.q.explain) + '</div>' : '') + '</div>';
        }).join('') : '<div class="empty card">Nincs hibás válasz. 🎉</div>';
        main.querySelectorAll('[data-f]').forEach(function (b) { b.classList.toggle('on', b.dataset.f === filter); });
      }

      main.innerHTML = '<nav class="crumbs"><a href="' + (ropts.backHref || '#/teszt') + '">' + esc(ropts.backLabel || 'Tesztközpont') + '</a><span>›</span><span>Eredmény</span></nav>' +
        '<div class="ts-result card pad"><div class="ts-score g' + gr[0] + '"><b>' + pct + '%</b><span>' + gr[0] + ' – ' + gr[1] + '</span></div>' +
        '<div><h1 style="margin-bottom:4px">' + (pct === 100 ? 'Hibátlan! 🏆' : pct >= 75 ? 'Szép munka!' : pct >= 50 ? 'Átmentél, de van még mit gyakorolni.' : 'Ezt még gyakorolni kell.') + '</h1>' +
        (ropts.student ? '<p style="margin:0 0 4px"><b>' + esc(ropts.student) + '</b> · ' + esc(new Date().toLocaleString('hu-HU')) + '</p>' : '') +
        '<p class="muted">' + ok + ' helyes válasz ' + qs.length + ' kérdésből · ' + Math.floor(secs / 60) + ' perc ' + (secs % 60) + ' mp · ' + (mode === 'vizsga' ? 'vizsga mód' : 'azonnali visszajelzés') + '</p>' +
        '<div class="row">' + (wrong.length ? '<button type="button" class="btn primary" id="ts-redo">↻ A hibásak újra (' + wrong.length + ')</button>' : '') +
        (ropts.backHref ? '<a class="btn" href="' + ropts.backHref + '">← Vissza: ' + esc(ropts.backLabel || '') + '</a>' : '<button type="button" class="btn" id="ts-again">Ugyanezek a témák, új kérdésekkel</button><a class="btn" href="#/teszt">Új beállítás</a>') + '</div></div></div>' +
        '<h2>Témánként</h2><div class="ts-topicres">' + Object.keys(byTopic).map(function (k) {
          var b = byTopic[k], p = Math.round(b.ok / b.n * 100);
          return '<a class="card" href="' + b.t.href + '"><span>' + b.g.icon + ' ' + esc(b.t.title) + '</span><span class="bar" style="--tile:' + (p >= 75 ? 'var(--ok)' : p >= 50 ? 'var(--warn)' : 'var(--bad)') + '"><i style="width:' + p + '%"></i></span><b>' + b.ok + '/' + b.n + '</b></a>';
        }).join('') + '</div>' +
        '<div class="row" style="justify-content:space-between;margin-top:28px"><h2 style="margin:0">Válaszaid</h2><div class="seg"><button type="button" data-f="mind">Mind</button><button type="button" data-f="hibas">Csak a hibásak</button></div></div>' +
        '<div id="ts-review" class="ts-reviews"></div>';
      main.querySelectorAll('[data-f]').forEach(function (b) { b.addEventListener('click', function () { filter = b.dataset.f; paintReview(); }); });
      var rd = main.querySelector('#ts-redo');
      if (rd) rd.addEventListener('click', function () { run(main, S.shuffle(wrong.map(function (x) { return { q: x.q, g: x.g, t: x.t }; })), mode); });
      var ag = main.querySelector('#ts-again');
      if (ag) ag.addEventListener('click', function () { S.pageTeszt(main, {}); main.querySelector('#ts-start').click(); });
      paintReview();
      window.scrollTo(0, 0);
    }
    show();
  }
})();
