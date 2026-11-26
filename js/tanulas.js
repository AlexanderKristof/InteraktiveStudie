/* Tudásműhely – 📚 Tanulássegéd: kutatással igazolt tanulási módszerek kipróbálható eszközökként.
 * #/tanulas                      – áttekintés és módszerek
 * #/tanulas/felidezes?l=s/l      – „Írd le, amire emlékszel” (aktív felidézés / Feynman), kulcsfogalom-ellenőrzéssel
 * #/tanulas/terkep?l=s/l         – gondolattérkép a leckéből
 * #/tanulas/igazhamis?t=s        – Igaz vagy hamis? villámjáték a kvízkérdésekből
 * #/tanulas/fogalom?k=kurzus     – Fogalomkitaláló (meghatározásból a szakszó)
 * #/tanulas/pomodoro             – fókuszidőzítő */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  function subjects() { return S.subjects; }
  function lessonByKey(key) {
    var p = String(key || '').split('/'), s = S.subjects.filter(function (x) { return x.id === p[0]; })[0];
    var l = s && s.lessons.filter(function (x) { return x.id === p[1]; })[0];
    return l ? { s: s, l: l, key: s.id + '/' + l.id } : null;
  }
  function plain(t) { return String(t || '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/`([^`]*)`/g, '$1').replace(/\[\[[^|\]]+\|(.+?)\]\]/g, '$1'); }
  /* kulcsfogalmak: a leckében félkövérrel kiemelt kifejezések, szakaszonként */
  function concepts(l) {
    var out = [], seen = {};
    (l.sections || []).forEach(function (sec, si) {
      var re = /\*\*(.+?)\*\*/g, m, list = [];
      while ((m = re.exec(sec.text || '')) !== null) {
        var c = m[1].replace(/[`:,.;!?()„”"]/g, '').trim();
        var k = S.norm(c);
        if (c.length < 3 || c.length > 42 || seen[k] || /^\d/.test(c)) continue;
        /* egyszavas határozók, fokozott melléknevek, ragozott alakok kiszűrése (pl. „sorosan”, „kisebb”, „vezetőkben”) */
        if (!/\s/.test(c) && /^[a-záéíóöőúüű]/.test(c) && (/(an|en|ban|ben|ból|ből|ra|re|va|ve|bb|ként|kor)$/.test(c) || c.length < 5)) continue;
        seen[k] = 1; list.push(c);
      }
      out.push({ title: sec.title || ('Szakasz ' + (si + 1)), items: list });
    });
    return out;
  }
  /* toldalékot tűrő egyezés: minden lényeges szó eleje szerepeljen a szövegben */
  function covered(text, concept) {
    var t = ' ' + S.norm(text) + ' ';
    var words = S.norm(concept).split(/[^a-z0-9]+/).filter(function (w) { return w.length >= 3; });
    if (!words.length) return t.indexOf(S.norm(concept)) >= 0;
    return words.every(function (w) { var stem = w.length > 6 ? w.slice(0, w.length - 3) : w.slice(0, Math.max(3, w.length - 1)); return t.indexOf(stem) >= 0; });
  }
  function lessonPicker(cur, base) {
    return '<label class="pw-f" style="max-width:520px"><span>Válassz leckét</span><select id="tl-pick"><option value="">– válassz –</option>' +
      S.STAGES.map(function (st) {
        return subjects().filter(function (s) { return (s.stage || 'kozep') === st[0]; }).map(function (s) {
          return '<optgroup label="' + esc(s.icon + ' ' + s.title) + '">' + s.lessons.map(function (l) {
            var k = s.id + '/' + l.id; return '<option value="' + k + '"' + (k === cur ? ' selected' : '') + '>' + esc(l.title) + '</option>';
          }).join('') + '</optgroup>';
        }).join('');
      }).join('') + '</select></label>';
  }
  function bindPicker(main, base) {
    var sel = main.querySelector('#tl-pick');
    if (sel) { sel.addEventListener('change', function () { if (sel.value) location.hash = base + '?l=' + sel.value; }); S.searchableSelect(sel, '🔎 Keresd a leckét: tantárgy vagy téma (pl. sejt, Ohm, honfoglalás)…'); }
  }
  function crumbs(title) {
    return '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/tanulas">Tanulássegéd</a><span>›</span><span>' + esc(title) + '</span></nav>';
  }

  /* ---------- áttekintő oldal ---------- */
  var TOOLS = [
    ['felidezes', '🧠', 'Írd le, amire emlékszel', 'Aktív felidézés: csukd be a leckét, írj le mindent fejből, a program megmutatja, mely kulcsfogalmak maradtak ki.'],
    ['terkep', '🗺️', 'Gondolattérkép', 'A lecke szerkezete egy ábrán: középen a téma, ágakon a részek és a kulcsfogalmak. Nyomtatható.'],
    ['igazhamis', '⚡', 'Igaz vagy hamis?', '60 másodperces villámjáték a kvízkérdésekből: gyors döntések, sorozat, rekord.'],
    ['fogalom', '🔤', 'Fogalomkitaláló', 'Megkapod a meghatározást, neked kell kitalálnod a fogalmat. Segítséget is kérhetsz.'],
    ['pomodoro', '⏱️', 'Fókuszidőzítő (Pomodoro)', '25 perc tanulás, 5 perc szünet. Számolja a köreidet, és a szünetben pihenésre emlékeztet.']
  ];
  S.pageTanulas = function (main, sub, params) {
    if (sub === 'felidezes') return felidezes(main, params);
    if (sub === 'terkep') return terkep(main, params);
    if (sub === 'igazhamis') return igazHamis(main, params);
    if (sub === 'fogalom') return fogalom(main, params);
    if (sub === 'pomodoro') return pomodoro(main);
    if (sub) return false;
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Tanulássegéd</span></nav>' +
      '<section class="learn-hero"><h1>📚 Tanulássegéd</h1><p class="lead">A kutatások szerint nem az a leghatékonyabb, ha sokszor újraolvasod az anyagot, hanem ha <b>előhívod</b> a fejedből, <b>elosztva</b> ismétled, és <b>kevered</b> a feladatokat. Ezek az eszközök ebben segítenek.</p></section>' +
      '<div class="learn-grid">' + TOOLS.map(function (t) {
        return '<a class="card learn-tile" href="#/tanulas/' + t[0] + '"><span class="ico">' + t[1] + '</span><b>' + esc(t[2]) + '</b><small>' + esc(t[3]) + '</small></a>';
      }).join('') +
      '<a class="card learn-tile" href="#/kartyak/' + (S.subjects[0] ? S.subjects[0].id : '') + '"><span class="ico">🃏</span><b>Tanulókártyák</b><small>Leitner-módszer: amit tudsz, ritkábban jön elő, amit nem, gyakrabban. Minden tantárgy oldalán megtalálod.</small></a>' +
      '<a class="card learn-tile" href="#/ismetles"><span class="ico">🔁</span><b>Okos ismétlés</b><small>Amit elrontottál, a program 1, 3, 7, 16 és 35 nap múlva újra elődobja – így marad meg igazán.</small></a>' +
      '<a class="card learn-tile" href="#/parbaj"><span class="ico">⚔️</span><b>Párbaj</b><small>Két játékos egy eszközön egymással szemben, vagy kihívás linkkel – ki tud többet?</small></a>' +
      '<a class="card learn-tile" href="#/osszeallito"><span class="ico">🧩</span><b>Kérdés-összeállító</b><small>Keress témára az összes kérdés között, és állíts össze belőle saját vizsgát vagy nyomtatható dolgozatot.</small></a>' +
      '<a class="card learn-tile" href="#/felkeszito"><span class="ico">📅</span><b>Vizsgafelkészítő</b><small>Napokra bontott terv, felkészültségi mérő és próbavizsga a dolgozatod napjáig.</small></a>' +
      '</div>' +
      '<section class="card pad" style="margin-top:18px"><h2 style="margin-top:0">🔬 Mi működik a tanulásban? – röviden</h2>' + S.md(
        '1. **Aktív felidézés (önteszt).** Ha előhívod az információt (kvíz, „írd le fejből”), sokkal jobban megmarad, mint újraolvasáskor. Már az erőfeszítés is erősíti az emléket.\n' +
        '2. **Elosztott ismétlés.** Ugyanannyi idő többször, kisebb adagokban (pl. ma, holnap, 3 nap múlva, egy hét múlva) jobban rögzül, mint egyetlen hosszú „bemagolás”.\n' +
        '3. **Keverés.** Ha különböző típusú feladatokat keverve gyakorolsz, az agy megtanulja eldönteni, **melyik** módszer kell – ez a dolgozatban számít.\n' +
        '4. **Magyarázd el egyszerűen (Feynman-módszer).** Ha el tudod magyarázni egy kisebb testvérnek, érted. Ahol elakadsz, ott van a hiány.\n' +
        '5. **Kép + szöveg.** Ábra, gondolattérkép, idővonal a szöveg mellett két úton rögzíti az anyagot.\n' +
        '6. **Alvás és szünet.** Alvás közben rendeződnek az emlékek; a rövid szünetek (Pomodoro) segítik a figyelmet.') +
        '<p>Részletesebben: <a href="#/lecke/haztartas/idobeosztas-tanulas">Hatékony tanulás és időbeosztás</a> lecke.</p>' +
      '</section>';
    return true;
  };

  /* ---------- aktív felidézés ---------- */
  function felidezes(main, params) {
    var L = lessonByKey(params && params.l);
    main.innerHTML = crumbs('Írd le, amire emlékszel') + '<h1>🧠 Írd le, amire emlékszel</h1>' +
      '<p class="lead">Válassz egy leckét, amit már olvastál. <b>Ne nézd meg újra!</b> Írj le mindent, ami eszedbe jut róla – mintha egy barátodnak magyaráznád. Utána a program megmutatja, mely kulcsfogalmak szerepeltek a szövegedben, és melyek maradtak ki.</p>' +
      lessonPicker(L && L.key) + '<div id="fl-box"></div>';
    bindPicker(main, '#/tanulas/felidezes');
    if (!L) return true;
    var cs = concepts(L.l), all = [];
    cs.forEach(function (g) { all = all.concat(g.items); });
    var box = main.querySelector('#fl-box');
    if (all.length < 3) { box.innerHTML = '<p class="note">Ebben a leckében kevés a kiemelt kulcsfogalom, ezért az ellenőrzés nem lenne pontos. Válassz másik leckét, vagy használd a <a href="#/tanulas/terkep?l=' + L.key + '">gondolattérképet</a>.</p>'; return true; }
    var draftKey = 'felidezes.' + L.key, draft = S.store.get(draftKey, '');
    box.innerHTML = '<div class="card pad" style="margin-top:12px"><h2 style="margin-top:0">' + esc(L.s.icon + ' ' + L.l.title) + '</h2>' +
      '<p class="muted">' + cs.length + ' rész, ' + all.length + ' kulcsfogalom. Tipp: először a nagy egészet írd le, aztán a részleteket.</p>' +
      '<textarea id="fl-txt" rows="10" style="width:100%;font:inherit;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--surface);color:var(--fg)" placeholder="Írd ide fejből, amit tudsz a témáról…">' + esc(draft) + '</textarea>' +
      '<div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap"><button type="button" class="btn primary" id="fl-check">✔ Ellenőrzés</button><span class="muted" id="fl-count"></span></div><div id="fl-res"></div></div>';
    var ta = box.querySelector('#fl-txt');
    function cnt() { box.querySelector('#fl-count').textContent = (ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0) + ' szó'; S.store.set(draftKey, ta.value); }
    ta.addEventListener('input', cnt); cnt();
    box.querySelector('#fl-check').addEventListener('click', function () {
      var txt = ta.value, hit = 0;
      var html = cs.filter(function (g) { return g.items.length; }).map(function (g) {
        return '<div class="fl-sec"><b>' + esc(g.title) + '</b><div class="chips">' + g.items.map(function (c) {
          var ok = covered(txt, c); if (ok) hit++;
          return '<span class="chip ' + (ok ? 'fl-ok' : 'fl-miss') + '">' + (ok ? '✓ ' : '✗ ') + esc(c) + '</span>';
        }).join('') + '</div></div>';
      }).join('');
      var pct = Math.round(hit / all.length * 100);
      var best = S.store.get('felidezes.best', {}); if (!best[L.key] || pct > best[L.key]) { best[L.key] = pct; S.store.set('felidezes.best', best); }
      if (S.logActivity) S.logActivity('recall', L.key);
      box.querySelector('#fl-res').innerHTML = '<div class="fl-score"><b>' + pct + '%</b><span>' + hit + ' / ' + all.length + ' kulcsfogalom szerepelt a szövegedben' + (best[L.key] > pct ? ' (rekordod: ' + best[L.key] + '%)' : '') + '</span></div>' +
        '<p class="muted">' + (pct >= 80 ? '🏆 Nagyon jó! Holnap vagy pár nap múlva próbáld újra – az elosztott ismétlés rögzíti igazán.' : pct >= 50 ? '👍 Jó alap. Nézd át a pirosakat a leckében, aztán holnap írd le újra.' : '💪 Semmi gond – pont ezért érdemes csinálni! Olvasd át a leckét, és pár óra múlva próbáld újra.') +
        ' A gép csak a szavakat keresi; hogy jól magyaráztad-e el, azt te döntöd el.</p>' + html +
        '<p><a class="btn" href="#/lecke/' + L.key + '">📘 Vissza a leckéhez</a> <a class="btn" href="#/tanulas/terkep?l=' + L.key + '">🗺️ Gondolattérkép</a></p>';
    });
    return true;
  }

  /* ---------- gondolattérkép ---------- */
  function terkep(main, params) {
    var L = lessonByKey(params && params.l);
    main.innerHTML = crumbs('Gondolattérkép') + '<h1>🗺️ Gondolattérkép</h1><p class="lead">A lecke vázlata egy ábrán. Próbáld előbb fejből elmondani az ágakat, aztán ellenőrizd!</p>' +
      lessonPicker(L && L.key) + '<div id="mm-box"></div>';
    bindPicker(main, '#/tanulas/terkep');
    if (!L) return true;
    var cs = concepts(L.l).filter(function (g) { return g.title; }).slice(0, 8);
    var W = 1000, H = 720, cx = W / 2, cy = H / 2, R1 = 215, n = cs.length || 1;
    var colors = ['#2563eb', '#16a34a', '#ea580c', '#9333ea', '#dc2626', '#0891b2', '#ca8a04', '#db2777'];
    var svg = '';
    function wrap(t, max) { var w = String(t).split(' '), lines = [], cur = ''; w.forEach(function (x) { if ((cur + ' ' + x).trim().length > max) { if (cur) lines.push(cur); cur = x; } else cur = (cur + ' ' + x).trim(); }); if (cur) lines.push(cur); return lines.slice(0, 3); }
    function text(x, y, t, size, cls, max, anchor) {
      var ls = wrap(t, max);
      return '<text x="' + x + '" y="' + (y - (ls.length - 1) * size * 0.6) + '" font-size="' + size + '" text-anchor="' + (anchor || 'middle') + '" class="' + cls + '">' + ls.map(function (l, i) { return '<tspan x="' + x + '" dy="' + (i ? size * 1.2 : 0) + '">' + esc(l) + '</tspan>'; }).join('') + '</text>';
    }
    cs.forEach(function (g, i) {
      var a = -Math.PI / 2 + i * 2 * Math.PI / n, x = cx + Math.cos(a) * R1, y = cy + Math.sin(a) * R1 * 0.78, col = colors[i % colors.length];
      svg += '<path d="M' + cx + ',' + cy + ' Q' + (cx + Math.cos(a) * R1 * 0.5) + ',' + (cy + Math.sin(a) * R1 * 0.2) + ' ' + x + ',' + y + '" stroke="' + col + '" stroke-width="5" fill="none" opacity=".7"/>';
      g.items.slice(0, 4).forEach(function (c, j, arr) {
        var spread = 0.42, b = a + (arr.length > 1 ? (j / (arr.length - 1) - 0.5) * spread * 2 : 0);
        var lx = cx + Math.cos(b) * (R1 + 140), ly = cy + Math.sin(b) * (R1 + 140) * 0.8;
        var right = Math.cos(b) >= 0;
        svg += '<line x1="' + x + '" y1="' + y + '" x2="' + lx + '" y2="' + ly + '" stroke="' + col + '" stroke-width="2" opacity=".55"/>' +
          '<circle cx="' + lx + '" cy="' + ly + '" r="4" fill="' + col + '"/>' + text(lx + (right ? 8 : -8), ly + 4, c, 15, 'mm-leaf', 22, right ? 'start' : 'end');
      });
      svg += '<rect x="' + (x - 95) + '" y="' + (y - 30) + '" width="190" height="60" rx="14" fill="' + col + '"/>' + text(x, y + 5, g.title, 15, 'mm-branch', 22);
    });
    svg += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="130" ry="58" fill="var(--fg)"/>' + text(cx, cy + 6, L.l.title, 19, 'mm-center', 20);
    main.querySelector('#mm-box').innerHTML = '<div class="card pad mm-card"><svg class="mm" viewBox="-60 0 ' + (W + 120) + ' ' + H + '" role="img" aria-label="Gondolattérkép: ' + esc(L.l.title) + '">' + svg + '</svg></div>' +
      '<p class="muted">Középen a lecke, színes ágakon a részei, a vékony ágakon a kulcsfogalmak (a leckében félkövérrel kiemeltek).</p>' +
      '<p><button type="button" class="btn" id="mm-print">🖨 Nyomtatás</button> <a class="btn" href="#/lecke/' + L.key + '">📘 A lecke</a> <a class="btn" href="#/tanulas/felidezes?l=' + L.key + '">🧠 Írd le fejből</a></p>';
    main.querySelector('#mm-print').addEventListener('click', function () { window.print(); });
    return true;
  }

  /* ---------- Igaz vagy hamis? ---------- */
  function questionsFor(sid) {
    var out = [];
    S.subjects.forEach(function (s) {
      if (sid && s.id !== sid) return;
      if (!sid && S.level !== 'egyetem' && s.stage === 'szakma') { /* vegyesben is benne vannak a szakmák */ }
      var bank = (S.bank || {})[s.id] || {};
      s.lessons.forEach(function (l) {
        (l.quiz || []).concat(bank[l.id] || []).forEach(function (q) { if (q.options && q.options.length >= 2) out.push({ q: q, s: s, l: l }); });
      });
    });
    return out;
  }
  function igazHamis(main, params) {
    var sid = params && params.t || '';
    var rec = S.store.get('igazhamis.rekord', {});
    main.innerHTML = crumbs('Igaz vagy hamis?') + '<h1>⚡ Igaz vagy hamis?</h1><p class="lead">Kapsz egy kérdést és egy választ. Döntsd el gyorsan: <b>igaz</b> vagy <b>hamis</b>? 60 másodperced van. (Billentyűzeten: ← hamis, → igaz.)</p>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap;align-items:end"><label class="pw-f"><span>Téma</span><select id="ih-t"><option value="">🎲 Vegyes (minden tantárgy)</option>' +
      S.subjects.map(function (s) { return '<option value="' + s.id + '"' + (s.id === sid ? ' selected' : '') + '>' + esc(s.icon + ' ' + s.title) + '</option>'; }).join('') + '</select></label>' +
      '<button type="button" class="btn primary" id="ih-go">▶ Indítás</button><span class="muted">Rekordod: <b>' + (rec[sid || 'vegyes'] || 0) + '</b></span></div><div id="ih-box"></div>';
    main.querySelector('#ih-t').addEventListener('change', function (e) { location.hash = '#/tanulas/igazhamis' + (e.target.value ? '?t=' + e.target.value : ''); });
    S.searchableSelect(main.querySelector('#ih-t'), '🔎 Keresd a tantárgyat…');
    main.querySelector('#ih-go').addEventListener('click', start);
    var timer = null, keyH = null;
    function start() {
      var pool = S.shuffle(questionsFor(sid)), i = 0, score = 0, streak = 0, best = 0, left = 60, wrong = [], cur = null;
      var box = main.querySelector('#ih-box');
      function next() {
        var it = pool[i++ % pool.length], q = it.q, truth = Math.random() < 0.5;
        var wrongOpts = q.options.map(function (o, k) { return k; }).filter(function (k) { return k !== q.answer; });
        var shownIdx = truth ? q.answer : wrongOpts[Math.floor(Math.random() * wrongOpts.length)];
        cur = { it: it, truth: truth, shown: q.options[shownIdx] };
        box.innerHTML = '<div class="ih-card card pad"><div class="ih-top"><span>⏱ <b id="ih-left">' + left + '</b> mp</span><span>Pont: <b>' + score + '</b></span>' + (streak >= 3 ? '<span class="combo">🔥 ' + streak + '</span>' : '') + '</div>' +
          '<small class="muted">' + esc(it.s.icon + ' ' + it.s.title + ' · ' + it.l.title) + '</small><p class="ih-q">' + S.inline(q.q) + '</p><p class="ih-a">→ ' + S.inline(String(cur.shown)) + '</p>' +
          '<div class="ih-btns"><button type="button" class="btn ih-no" data-v="0">✗ Hamis</button><button type="button" class="btn ih-yes" data-v="1">✓ Igaz</button></div></div>';
        box.querySelectorAll('[data-v]').forEach(function (b) { b.addEventListener('click', function () { answer(b.dataset.v === '1'); }); });
      }
      function answer(v) {
        if (!cur || left <= 0) return;
        if (v === cur.truth) { score++; streak++; best = Math.max(best, streak); flash(true); }
        else { streak = 0; wrong.push(cur); flash(false); }
        next();
      }
      function flash(ok) { box.classList.remove('ih-ok', 'ih-bad'); void box.offsetWidth; box.classList.add(ok ? 'ih-ok' : 'ih-bad'); }
      function end() {
        clearInterval(timer); timer = null; document.removeEventListener('keydown', keyH);
        var key = sid || 'vegyes', r = S.store.get('igazhamis.rekord', {}), isRec = score > (r[key] || 0);
        if (isRec) { r[key] = score; S.store.set('igazhamis.rekord', r); }
        if (S.logActivity) S.logActivity('game', 'igazhamis');
        box.innerHTML = '<div class="card pad" style="text-align:center"><div style="font-size:3rem">' + (isRec ? '🏆' : '⚡') + '</div><h2>' + score + ' pont</h2><p>Leghosszabb sorozat: 🔥 ' + best + (isRec ? ' · <b>Új rekord!</b>' : '') + '</p>' +
          (wrong.length ? '<details style="text-align:left"><summary>Amit elrontottál (' + wrong.length + ') – nézd át!</summary><ul>' + wrong.slice(0, 15).map(function (w) {
            return '<li>' + S.inline(w.it.q.q) + '<br><small>Te: ' + (w.truth ? '„hamis”' : '„igaz”') + ' · Helyes válasz: <b>' + S.inline(String(w.it.q.options[w.it.q.answer])) + '</b> · <a href="#/lecke/' + w.it.s.id + '/' + w.it.l.id + '">lecke</a></small></li>';
          }).join('') + '</ul></details>' : '') + '<p><button type="button" class="btn primary" id="ih-again">🔁 Újra</button></p></div>';
        box.querySelector('#ih-again').addEventListener('click', start);
      }
      keyH = function (e) { if (e.key === 'ArrowRight') answer(true); if (e.key === 'ArrowLeft') answer(false); };
      document.addEventListener('keydown', keyH);
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        if (!document.body.contains(box)) { clearInterval(timer); document.removeEventListener('keydown', keyH); return; }
        left--; var el = box.querySelector('#ih-left'); if (el) el.textContent = left;
        if (left <= 0) end();
      }, 1000);
      next();
    }
    return true;
  }

  /* ---------- Fogalomkitaláló ---------- */
  function fogalom(main, params) {
    var cid = params && params.k || (S.courses[0] && S.courses[0].id);
    var c = S.courseById && S.courseById(cid);
    main.innerHTML = crumbs('Fogalomkitaláló') + '<h1>🔤 Fogalomkitaláló</h1><p class="lead">Elolvasod a meghatározást, és beírod, melyik fogalomról van szó. Ha elakadsz, kérj segítséget (az első betű, aztán a betűk száma).</p>' +
      '<label class="pw-f" style="max-width:520px"><span>Kurzus</span><select id="fg-k">' + S.courses.map(function (x) { return '<option value="' + x.id + '"' + (x.id === cid ? ' selected' : '') + '>' + esc(x.icon + ' ' + x.title) + '</option>'; }).join('') + '</select></label><div id="fg-box"></div>';
    main.querySelector('#fg-k').addEventListener('change', function (e) { location.hash = '#/tanulas/fogalom?k=' + e.target.value; });
    S.searchableSelect(main.querySelector('#fg-k'), '🔎 Keresd a kurzust (pl. IFRS, gépi tanulás, anatómia)…');
    if (!c) return true;
    var deck = S.shuffle(c.terms.slice()), i = 0, score = 0, tries = 0;
    var box = main.querySelector('#fg-box');
    function clue(t) {
      var d = S.level !== 'egyetem' && S.simpleOf ? (S.simpleOf(c.id, t.id) || t.short) : t.short;
      var rx = new RegExp(t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      return plain(d).replace(rx, '▢▢▢');
    }
    function show() {
      if (i >= deck.length) { box.innerHTML = '<div class="card pad"><h2>Kész! ' + score + ' / ' + deck.length + '</h2><p><button class="btn primary" id="fg-re">🔁 Újrakezdés</button></p></div>'; box.querySelector('#fg-re').addEventListener('click', function () { deck = S.shuffle(c.terms.slice()); i = 0; score = 0; show(); }); return; }
      var t = deck[i], hint = 0;
      box.innerHTML = '<div class="card pad" style="margin-top:12px"><div class="row" style="justify-content:space-between"><small class="muted">' + (i + 1) + ' / ' + deck.length + ' · ' + esc(t.topic || '') + '</small><small>Pont: <b>' + score + '</b></small></div>' +
        '<p class="fg-clue">' + S.inline(clue(t)) + '</p><p class="muted" id="fg-hint"></p>' +
        '<div class="row" style="gap:8px;flex-wrap:wrap"><input id="fg-in" type="text" autocomplete="off" style="flex:1;min-width:200px;padding:10px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--fg);font:inherit" placeholder="Melyik fogalom?">' +
        '<button type="button" class="btn primary" id="fg-ok">Ellenőrzés</button><button type="button" class="btn" id="fg-h">💡 Segítség</button><button type="button" class="btn" id="fg-skip">Nem tudom</button></div><div id="fg-res"></div></div>';
      var inp = box.querySelector('#fg-in'); inp.focus();
      function reveal(ok) {
        box.querySelector('#fg-res').innerHTML = '<p class="' + (ok ? 'fl-ok' : 'fl-miss') + ' fg-res">' + (ok ? '✓ Igen: ' : 'A megoldás: ') + '<b>' + esc(t.term) + '</b>' + (t.en ? ' · 🇬🇧 ' + esc(t.en) : '') +
          ' <a href="#/egyetem/' + c.id + '/fogalom/' + t.id + '">részletek</a></p><button type="button" class="btn primary" id="fg-next">Tovább →</button>';
        box.querySelector('#fg-next').addEventListener('click', function () { i++; show(); });
        box.querySelector('#fg-next').focus();
        ['#fg-ok', '#fg-h', '#fg-skip'].forEach(function (id) { box.querySelector(id).disabled = true; });
      }
      function check() {
        var a = S.norm(inp.value).replace(/[^a-z0-9]/g, ''), b = S.norm(t.term.replace(/\(.*?\)/g, '')).replace(/[^a-z0-9]/g, '');
        var ok = a && (a === b || (a.length >= 4 && (b.indexOf(a) === 0 && a.length >= b.length * 0.7)) || S.norm(t.en || '').replace(/[^a-z0-9]/g, '') === a);
        if (ok) { score += hint ? 0.5 : 1; reveal(true); } else { tries++; box.querySelector('#fg-hint').textContent = 'Még nem. Próbáld újra, vagy kérj segítséget!'; }
      }
      box.querySelector('#fg-ok').addEventListener('click', check);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
      box.querySelector('#fg-h').addEventListener('click', function () {
        hint++;
        var tt = t.term.replace(/\(.*?\)/g, '').trim();
        box.querySelector('#fg-hint').textContent = hint === 1 ? 'Kezdőbetű: „' + tt.charAt(0) + '…”' : 'Minta: ' + tt.split('').map(function (ch, k) { return k === 0 || ch === ' ' || ch === '-' ? ch : '_'; }).join(' ');
      });
      box.querySelector('#fg-skip').addEventListener('click', function () { reveal(false); });
    }
    show();
    return true;
  }

  /* ---------- Pomodoro ---------- */
  var pomo = { mode: 'focus', left: 25 * 60, running: false, timer: null, rounds: 0 };
  function beep() {
    try { var A = window.AudioContext || window.webkitAudioContext, ctx = new A(), o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.2, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2); o.start(); o.stop(ctx.currentTime + 1.2);
    } catch (e) { /* nincs hang */ }
  }
  function pomodoro(main) {
    var cfg = S.store.get('pomodoro', { focus: 25, rest: 5 });
    pomo.rounds = S.store.get('pomodoro.ma', {})[new Date().toDateString()] || 0;
    main.innerHTML = crumbs('Fókuszidőzítő') + '<h1>⏱️ Fókuszidőzítő</h1><p class="lead">25 perc teljes figyelem (telefon el!), aztán 5 perc valódi szünet: állj fel, igyál vizet, nézz ki az ablakon. Négy kör után tarts hosszabb szünetet.</p>' +
      '<div class="card pad pomo"><div class="pomo-mode" id="pm-mode"></div><div class="pomo-time" id="pm-time"></div><div class="pomo-bar"><i id="pm-bar"></i></div>' +
      '<div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap"><button type="button" class="btn primary" id="pm-go"></button><button type="button" class="btn" id="pm-reset">↺ Újra</button><button type="button" class="btn" id="pm-skip">⏭ Váltás</button></div>' +
      '<input id="pm-task" type="text" placeholder="Min dolgozol most? (pl. Matek: törtek)" style="width:100%;margin-top:14px;padding:10px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--fg);font:inherit" value="' + esc(S.store.get('pomodoro.feladat', '')) + '">' +
      '<div class="pw-grid" style="margin-top:12px"><label class="pw-f"><span>Fókusz (perc)</span><input id="pm-f" type="number" min="5" max="90" value="' + cfg.focus + '"></label><label class="pw-f"><span>Szünet (perc)</span><input id="pm-r" type="number" min="1" max="30" value="' + cfg.rest + '"></label></div>' +
      '<p class="muted" id="pm-rounds"></p></div>';
    var el = function (id) { return main.querySelector('#' + id); };
    function total() { return (pomo.mode === 'focus' ? cfg.focus : cfg.rest) * 60; }
    function paint() {
      if (!document.body.contains(main.querySelector('.pomo'))) return;
      var m = Math.floor(pomo.left / 60), s = pomo.left % 60;
      el('pm-time').textContent = m + ':' + ('0' + s).slice(-2);
      el('pm-mode').textContent = pomo.mode === 'focus' ? '🎯 Fókusz' : '☕ Szünet';
      el('pm-mode').className = 'pomo-mode ' + pomo.mode;
      el('pm-bar').style.width = (100 - pomo.left / total() * 100) + '%';
      el('pm-go').textContent = pomo.running ? '⏸ Szünet' : '▶ Indítás';
      el('pm-rounds').textContent = 'Ma befejezett fókuszkörök: ' + pomo.rounds + (pomo.rounds >= 4 ? ' – szép munka! Tarts egy hosszabb pihenőt is.' : '');
      document.title = (pomo.running ? el('pm-time').textContent + ' · ' : '') + 'Fókuszidőzítő';
    }
    function switchMode() {
      if (pomo.mode === 'focus') {
        pomo.rounds++; var d = S.store.get('pomodoro.ma', {}); d[new Date().toDateString()] = pomo.rounds; S.store.set('pomodoro.ma', d);
        if (S.logActivity) S.logActivity('pomodoro', '');
      }
      pomo.mode = pomo.mode === 'focus' ? 'rest' : 'focus'; pomo.left = total(); beep();
    }
    function tick() { if (pomo.left > 0) pomo.left--; if (pomo.left <= 0) switchMode(); paint(); }
    el('pm-go').addEventListener('click', function () {
      pomo.running = !pomo.running;
      clearInterval(pomo.timer); pomo.timer = pomo.running ? setInterval(tick, 1000) : null; paint();
    });
    el('pm-reset').addEventListener('click', function () { pomo.left = total(); paint(); });
    el('pm-skip').addEventListener('click', function () { pomo.mode = pomo.mode === 'focus' ? 'rest' : 'focus'; pomo.left = total(); paint(); });
    el('pm-task').addEventListener('input', function (e) { S.store.set('pomodoro.feladat', e.target.value); });
    ['pm-f', 'pm-r'].forEach(function (id) {
      el(id).addEventListener('change', function () {
        cfg = { focus: Math.max(5, Math.min(90, +el('pm-f').value || 25)), rest: Math.max(1, Math.min(30, +el('pm-r').value || 5)) };
        S.store.set('pomodoro', cfg); if (!pomo.running) pomo.left = total(); paint();
      });
    });
    if (!pomo.running && pomo.left > total()) pomo.left = total();
    paint();
    return true;
  }
})();
