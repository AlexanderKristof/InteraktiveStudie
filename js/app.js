/* Tudásműhely – alkalmazás: útválasztás, oldalak, keresés, kvíz, haladás. */
(function () {
  'use strict';
  var S = window.STUDIE;
  var esc = S.esc, md = S.md, norm = S.norm;
  var main = document.getElementById('main');
  if (S.attachTroubles) S.attachTroubles();
  if (S.attachKapcsolas) S.attachKapcsolas();
  var LEVELS = { 1: ['kezdő', 'l1'], 2: ['haladó', 'l2'], 3: ['profi', 'l3'] };

  /* ---------- haladás ---------- */
  var progress = S.store.get('progress', {});
  function lessonKey(sid, lid) { return sid + '/' + lid; }
  function isDone(sid, lid) { var p = progress[lessonKey(sid, lid)]; return !!(p && p.done); }
  function setProgress(key, patch) {
    progress[key] = Object.assign({}, progress[key] || {}, patch);
    S.store.set('progress', progress);
  }
  function subjectStats(s) {
    var done = s.lessons.filter(function (l) { return isDone(s.id, l.id); }).length;
    return { done: done, total: s.lessons.length, pct: s.lessons.length ? Math.round(done / s.lessons.length * 100) : 0 };
  }
  S.progress = { setProgress: setProgress, get: function (k) { return progress[k]; } };

  function subjectById(id) { return S.subjects.filter(function (s) { return s.id === id; })[0]; }

  /* ---------- kvíz (leckékhez és modellekhez is) ---------- */
  S.renderQuiz = function (box, quiz, key) {
    var order = S.shuffle(quiz);
    var i = 0, score = 0;
    function show() {
      if (i >= order.length) return finish();
      var q = order[i];
      var opts = S.shuffle(q.options.map(function (t, k) { return { t: t, ok: k === q.answer }; }));
      box.innerHTML =
        '<div class="progress">' + (i + 1) + ' / ' + order.length + ' kérdés</div>' +
        '<div class="q">' + S.inline(q.q) + '</div>' +
        '<div class="opts">' + opts.map(function (o, k) {
          return '<button type="button" class="opt" data-k="' + k + '">' + S.inline(o.t) + '</button>';
        }).join('') + '</div><div class="after"></div>';
      box.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var picked = opts[+b.dataset.k];
          if (picked.ok) score++;
          if (S.srsRecord) S.srsRecord(q, picked.ok, { label: document.title.replace(/ – Tudásműhely$/, '') || 'Kvíz', href: location.hash });
          if (S.logAnswer) S.logAnswer({ key: key, q: q.q, your: picked.t, right: q.options[q.answer], href: location.hash, label: document.title.replace(/ – Tudásműhely$/, '') }, picked.ok);
          box.querySelectorAll('.opt').forEach(function (x) {
            x.disabled = true;
            if (opts[+x.dataset.k].ok) x.classList.add('right');
          });
          if (!picked.ok) b.classList.add('wrong');
          box.querySelector('.after').innerHTML =
            '<div class="explain"><b>' + (picked.ok ? '✔ Helyes!' : '✘ Nem egészen.') + '</b> ' + S.inline(q.explain || '') + '</div>' +
            '<div class="row" style="margin-top:12px"><button type="button" class="btn primary next">' +
            (i + 1 < order.length ? 'Következő kérdés →' : 'Eredmény') + '</button></div>';
          var nx = box.querySelector('.next');
          nx.addEventListener('click', function () { i++; show(); });
          nx.focus();
        });
      });
    }
    function finish() {
      var pct = Math.round(score / order.length * 100);
      var best = 0;
      if (key) {
        var p = progress[key] || {};
        best = Math.max(p.quizBest || 0, pct);
        setProgress(key, { quizBest: best });
      }
      var msg = pct === 100 ? 'Hibátlan! Mehetsz tovább.' : pct >= 70 ? 'Szép munka! Egy kis ismétlés és meglesz a 100%.' : 'Érdemes még egyszer átolvasni a leckét, aztán újra próbálni.';
      box.innerHTML = '<div class="score">' + score + ' / ' + order.length + '</div><p>' + msg + '</p>' +
        (key ? '<p class="muted">Legjobb eredményed: ' + best + '%</p>' : '') +
        '<button type="button" class="btn retry">↻ Újra</button>';
      box.querySelector('.retry').addEventListener('click', function () { order = S.shuffle(quiz); i = 0; score = 0; show(); });
    }
    show();
  };

  /* ---------- widget beillesztése ---------- */
  function mountWidgets(root) {
    root.querySelectorAll('[data-widget]').forEach(function (el) {
      var spec = JSON.parse(el.dataset.widget);
      var fn = S.widgets[spec.type];
      if (!fn) { el.innerHTML = '<p class="muted">Ismeretlen interaktív elem: ' + esc(spec.type) + '</p>'; return; }
      try { fn(el, spec.options || {}); }
      catch (e) { el.innerHTML = '<p class="muted">Hiba az interaktív elem betöltésekor.</p>'; if (window.console) console.error(e); }
    });
  }
  S.mountWidgets = mountWidgets;
  function widgetSlot(w) { return '<div class="widget card" data-widget="' + esc(JSON.stringify(w)) + '"></div>'; }

  /* ---------- oldalak ---------- */
  function setNav(which) {
    document.querySelectorAll('[data-nav]').forEach(function (a) { a.classList.toggle('active', a.dataset.nav === which); });
  }
  function title(t) { document.title = t ? t + ' – Tudásműhely' : 'Tudásműhely – interaktív tanulás'; }

  function workshopRow() {
    var W = [['feladatok', '🧮', 'Feladatmegoldó', 'Matek, fizika, kémia, pénzügy – tippekkel és lépésenkénti megoldással'],
      ['labor', '🧪', 'Virtuális labor', 'Kísérletek fizikából és kémiából, veszély nélkül'],
      ['aramkor', '🔌', 'Áramkör-labor', 'Építs áramkört, és mérd meg, mi történik'],
      ['szimulatorok', '💹', 'Gazdasági szimulátorok', 'Tőzsdejáték, saját vállalkozás, családi költségvetés – kockázat nélkül'],
      ['palya', '🧭', 'Pályaorientáció', 'Milyen szakma illik hozzád? Teszt és szakma-profilok'],
      ['parbaj', '⚔️', 'Párbaj', 'Kvízcsata egy telefonon vagy kihívó linkkel'],
      ['szoba', '🌐', 'Online párbajszoba', 'Hívd meg a barátaidat linkkel vagy kóddal, és versenyezzetek élőben'],
      ['sajat', '✏️', 'Saját kérdések', 'Írj saját kártyákat, és oszd meg a barátaiddal'],
      ['erettsegi', '🎓', 'Érettségi próbavizsga', '6 tantárgy, időre, pontozással és javítókulccsal'],
      ['kodolas', '💻', 'Programozás játszva', 'Robot a rácson és algoritmusok, lépésenkénti futtatással'],
      ['szabadulo', '🔐', 'Szabadulószoba', 'Törd fel a lakatokat fizika-, matek- és kémiafeladatokkal'],
      ['idovonal', '🕰️', 'Idővonal és térképek', 'Történelem az őskortól napjainkig, kattintható térképekkel'],
      ['gyengepontok', '🎯', 'Gyengepont-térkép', 'Hol hibázol a legtöbbet? Célzott gyakorlás'],
      ['magyarazd', '🗣️', 'Magyarázd el!', 'Írd le a saját szavaiddal – az app megmondja, mi hiányzik'],
      ['fuzet', '📓', 'Nyomtatható jegyzetfüzet', 'Bármely tantárgyból szép összefoglaló füzet'],
      ['kepletek', '📐', 'Képletgyűjtemény', '238 képlet kalkulátorral: bármelyik betűt kiszámolja, lépésenként'],
      ['jatekter', '🎱', 'Fizikai játéktér', 'Hajítás, ütközés, hídépítés, holdraszállás – saját fizikamotor'],
      ['molekula', '⚗️', 'Molekulaépítő', 'Építs molekulát, az app felismeri és 3D-ben megmutatja'],
      ['hangos', '🎧', 'Hangos tanulás', 'Leckék podcastként, felolvasott kvízzel – képernyő nélkül'],
      ['szinkron', '🔄', 'Átvitel másik eszközre', 'Haladás telefonról gépre linkkel vagy QR-kóddal']]
      .filter(function (w) { return S.routes && S.routes[w[0]]; });
    return W.length ? '<div class="section-title" style="margin-top:22px"><h2>🛠 Interaktív műhely</h2></div><div class="role-row">' + W.map(function (w) {
      return '<a class="card role-card" href="#/' + w[0] + '"><span class="ico">' + w[1] + '</span><b>' + w[2] + '</b><small>' + w[3] + '</small></a>'; }).join('') + '</div>' : '';
  }
  function pageHome() {
    setNav('home'); title('');
    var last = S.store.get('last', null);
    var lastHtml = '';
    if (last) {
      var ls = subjectById(last.s);
      var ll = ls && ls.lessons.filter(function (l) { return l.id === last.l; })[0];
      if (ll) lastHtml = '<a class="card tile" style="--tile:' + ls.color + ';margin-top:20px;flex-direction:row;align-items:center" href="#/lecke/' + ls.id + '/' + ll.id + '">' +
        '<span class="ico">' + ls.icon + '</span><span><small class="muted">Folytasd, ahol abbahagytad</small><h3 style="margin:0">' + esc(ll.title) + '</h3><p>' + esc(ls.title) + '</p></span></a>';
    }
    var models = Object.keys(S.models).map(function (k) { return S.models[k]; });
    main.innerHTML =
      '<section class="hero"><h1>Tanulj bármit, a saját tempódban.</h1>' +
      '<p class="lead">Interaktív leckék, kísérletek és kvízek, és egy felfedező, ami alkatrészeire szedve mutatja meg, mi miből áll és hogyan készül. Letöltés után internet nélkül is működik.</p>' +
      '<form class="search-big" id="hero-search"><input type="search" name="q" placeholder="Mi érdekel? pl. processzor, atom, Ohm-törvény…" aria-label="Keresés"><button class="btn primary" type="submit">Keresés</button></form>' +
      '<div class="chips">' + ['processzor', 'atom', 'akkumulátor', 'Ohm', 'FI relé', 'Pitagorasz', 'négyütemű motor', 'honfoglalás'].map(function (c) {
        return '<a class="chip" href="#/kereses?q=' + encodeURIComponent(c) + '">' + esc(c) + '</a>';
      }).join('') + '<a class="chip" href="#/tartalom" style="border-style:dashed">📚 Teljes tartalomjegyzék</a></div>' + (S.newsHomeCard ? S.newsHomeCard() : '') + (S.srsHomeCard ? S.srsHomeCard() : '') + lastHtml + dailyHtml() + examHtml() + factDayHtml() + '</section>' +
      ((S.paths || []).length ? '<div class="section-title"><h2>🧭 Válassz célt</h2><a href="#/utvonalak">Összes útvonal →</a></div><p class="muted" style="margin-top:-6px">Lépésről lépésre végigvezető tanulási tervek, tantárgyakon átívelve.</p><div class="grid">' + S.pathCards(4) + '</div>' : '') +
      S.STAGES.map(function (stg) {
        var list = S.subjects.filter(function (s) { return (s.stage || 'kozep') === stg[0]; });
        if (!list.length) return '';
        return '<div class="section-title"><h2>' + stg[1] + '</h2><span class="muted">' + list.length + ' tantárgy</span></div>' +
          '<div class="grid">' + list.map(function (s) {
            var st = subjectStats(s);
            return '<a class="card tile" style="--tile:' + s.color + '" href="#/tantargy/' + s.id + '">' +
              '<span class="ico">' + s.icon + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.description) + '</p>' +
              '<span class="meta">' + st.total + ' lecke · ' + st.done + ' kész</span><span class="bar"><i style="width:' + st.pct + '%"></i></span></a>';
          }).join('') + '</div>';
      }).join('') +
      '<div class="section-title"><h2>Mi miből áll?</h2><a href="#/felfedezo">Összes →</a></div>' +
      '<p class="muted" style="margin-top:-6px">Szedd szét, kattints rá, nézz bele. Minden alkatrésznél megtudod, mi az, miből van és hogyan gyártják.</p>' +
      '<div class="grid">' + models.slice(0, 4).map(modelTile).join('') + '</div>' +
      ((S.courses || []).length ? '<a class="card uni-band" href="#/egyetem" style="text-decoration:none;color:inherit"><span class="ico">🎓</span><span><h2 style="margin:0">Egyetemistáknak</h2>' +
        '<span class="muted">Szakszótár ábrákkal és angol megfelelővel, kattintható képletek, fogalomtérkép és tanulókártyák: ' +
        S.courses.map(function (c) { return esc(c.title); }).join(', ') + '.</span></span><span class="btn primary">Megnyitás →</span></a>' : '') +
      (S.pageSport ? '<a class="card uni-band sport-band" href="#/sport" style="text-decoration:none;color:inherit;margin-top:14px"><span class="ico">⚽</span><span><h2 style="margin:0">Sport és tudomány</h2>' +
        '<span class="muted">Foci, Forma–1, kosárlabda, úszás, tenisz és még sok más: a sport fizikája, edzéstudomány, rekordok és igaz történetek a kedvenc sportolóidról.</span></span><span class="btn primary">Megnyitás →</span></a>' : '') +
      (S.pageTanaroknak ? '<div class="role-row"><a class="card role-card" href="#/tanaroknak"><span class="ico">👩‍🏫</span><b>Tanároknak</b><small>Dolgozat-összeállító, osztálydolgozat-link, tanmenet, ötletek az órára</small></a>' +
        '<a class="card role-card" href="#/edzoknek"><span class="ico">🏋️</span><b>Edzőknek</b><small>Terhelés-kalkulátor, edzéstervezés, sérülésmegelőzés</small></a>' +
        '<a class="card role-card" href="#/setup"><span class="ico">🏁</span><b>Motorsport</b><small>Setup-szimulátor: légy versenymérnök!</small></a></div>' : '') + workshopRow();
    if (S.bindFacts) S.bindFacts(main);
    main.querySelector('#hero-search').addEventListener('submit', function (e) {
      e.preventDefault();
      var q = e.target.q.value.trim();
      if (q) location.hash = '#/kereses?q=' + encodeURIComponent(q);
    });
  }

  function examHtml() {
    if (!S.examReminder) return '';
    return S.examReminder() || '<a class="card daily" href="#/felkeszito" style="text-decoration:none;color:inherit"><span class="ico">📅</span><span><b>Dolgozatot vagy vizsgát írsz?</b><small>Add meg, miből és mikor: napokra bontott tervet, próbavizsgát és összefoglalót kapsz.</small></span><span class="btn">Tervet kérek →</span></a>';
  }
  function factDayHtml() {
    var f = S.factOfDay && S.factOfDay();
    if (!f) return '';
    return '<div class="fact-day"><div class="row" style="justify-content:space-between;align-items:baseline;gap:8px"><b class="t">💡 A nap ténye</b><a href="#/tudtad">Összes érdekesség (' + S.facts.length + ') →</a></div>' + S.factCard(f) + '</div>';
  }
  function dailyHtml() {
    if (!S.startDaily) return '';
    var dl = S.store.get('daily', {}), got = dl[S.dailyKey()];
    return '<div class="card daily"><span class="ico">🗓️</span><span><b>Napi kihívás</b><small>' + (got != null ? 'Ma már megvolt: ' + got + ' / 5 helyes. Holnap újabb jön!' : '5 vegyes kérdés az egész tananyagból. Mindenkinek ugyanaz a mai sor!') + '</small></span>' +
      '<button type="button" class="btn ' + (got != null ? '' : 'primary') + '" id="daily-go">' + (got != null ? 'Újra' : 'Indítás →') + '</button></div>';
  }
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'daily-go') { setNav('teszt'); title('Napi kihívás'); S.startDaily(main); }
  });

  function modelTile(m) {
    return '<a class="card tile" style="--tile:' + (m.color || '#2357d9') + '" href="#/felfedezo/' + m.id + '">' +
      '<span class="ico">' + m.icon + '</span><h3>' + esc(m.title) + '</h3><p>' + esc(m.summary) + '</p>' +
      '<span class="meta">' + m.parts.length + ' alkatrész · ' + (m.steps ? m.steps.length + ' gyártási lépés' : '') + '</span></a>';
  }

  function pageSubject(id) {
    var s = subjectById(id);
    if (!s) return notFound();
    setNav('home'); title(s.title);
    var st = subjectStats(s);
    main.innerHTML =
      '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>' + esc(S.stageTitle(s.stage).replace(/^\S+\s/, '')) + '</span><span>›</span><span>' + esc(s.title) + '</span></nav>' +
      '<div class="subject-head" style="--tile:' + s.color + '"><span class="ico">' + s.icon + '</span><div><h1>' + esc(s.title) + '</h1>' +
      '<p class="lead" style="margin:0">' + esc(s.description) + '</p></div></div>' +
      (s.intro ? '<div class="lesson-body">' + md(s.intro) + '</div>' : '') +
      '<div class="row" style="--tile:' + s.color + ';margin-top:10px"><span class="muted">' + st.done + ' / ' + st.total + ' lecke kész</span><span class="bar" style="flex:1;max-width:260px"><i style="width:' + st.pct + '%"></i></span></div>' +
      '<div class="row" style="margin-top:14px"><a class="btn primary" href="#/teszt?targy=' + s.id + '">📝 Teszt ebből a tantárgyból</a><a class="btn" href="#/kartyak/' + s.id + '">🃏 Tanulókártyák</a><a class="btn" href="#/osszeallito?g=' + s.id + '">🧩 Vizsgakérdések összeállítása</a><a class="btn" href="#/felkeszito">📅 Felkészülés dolgozatra</a><button type="button" class="btn" id="syllabus">🖨 Tanmenet</button><a class="btn" href="#/fuzet/' + s.id + '">📓 Jegyzetfüzet</a></div>' +
      '<ol class="lesson-list" style="--tile:' + s.color + '">' + s.lessons.map(function (l, i) {
        var d = isDone(s.id, l.id), lv = LEVELS[l.level || 1];
        var p = progress[lessonKey(s.id, l.id)];
        return '<li><a class="card" href="#/lecke/' + s.id + '/' + l.id + '"><span class="num' + (d ? ' done' : '') + '">' + (d ? '✓' : i + 1) + '</span>' +
          '<span class="txt"><b>' + esc(l.title) + '</b><span>' + esc(l.summary) + '</span></span>' +
          '<span class="row" style="flex:none;gap:6px"><span class="badge ' + lv[1] + '">' + lv[0] + '</span>' +
          (p && p.quizBest != null ? '<span class="badge">kvíz ' + p.quizBest + '%</span>' : '') + '</span></a></li>';
      }).join('') + '</ol>';
  }

  /* Érdekességek a leckéhez: előbb a közvetlenül hozzá kötöttek, aztán a tantárgy többi ténye közül naponta váltakozva */
  function lessonFacts(sid, key) {
    if (!S.factsFor) return [];
    var own = S.factsFor('lecke:' + key), rest = S.factsFor('tantargy:' + sid, { subject: sid }).filter(function (f) { return own.indexOf(f) < 0; });
    var off = rest.length ? (new Date().getDate() + key.length) % rest.length : 0;
    return own.concat(rest.slice(off).concat(rest.slice(0, off))).slice(0, Math.max(own.length, 2)).slice(0, 4);
  }

  function pageLesson(sid, lid) {
    var s = subjectById(sid);
    var idx = s ? s.lessons.findIndex(function (l) { return l.id === lid; }) : -1;
    if (idx < 0) return notFound();
    var l = s.lessons[idx], key = lessonKey(sid, lid), lv = LEVELS[l.level || 1];
    setNav('home'); title(l.title);
    S.store.set('last', { s: sid, l: lid });
    var prev = s.lessons[idx - 1], next = s.lessons[idx + 1];
    var secs = l.sections || [];
    var body = secs.map(function (sec, i) {
      return '<section id="sec-' + i + '">' + (sec.title ? '<h2>' + esc(sec.title) + '</h2>' : '') + md(sec.text) +
        (sec.tip ? '<div class="note tip"><b class="t">Jó tudni</b>' + md(sec.tip) + '</div>' : '') +
        (sec.warn ? '<div class="note warn"><b class="t">⚠ Figyelem</b>' + md(sec.warn) + '</div>' : '') +
        (sec.widget ? widgetSlot(sec.widget) : '') + '</section>';
    }).join('');
    var widgets = (l.widgets || []).map(widgetSlot).join('');
    var models = (l.models || []).filter(function (m) { return S.models[m]; });
    /* Egyetemi szinten az egyetemi szakszavak kerülnek előre, az iskolai magyarázat lenyitható részbe. */
    var uniRefs = S.termCards ? (l.terms || []).concat(S.termsBuildingOn ? S.termsBuildingOn(s.id, l.id) : []).filter(function (r, i, a) { return a.indexOf(r) === i && S.resolveTerm(r); }) : [];
    var uniView = S.level === 'egyetem', lu = S.lessonUni[key];
    var uniTop = '';
    if (uniView) {
      var hasUni = uniRefs.length || lu;
      uniTop = hasUni ? '<section class="uni-top card pad"><h2>🎓 Egyetemi / szakmai szint</h2>' +
          (lu && lu.text ? '<div class="uni-text">' + S.md(lu.text) + '</div>' : '') +
          (lu && lu.glossary && lu.glossary.length ? glossaryHtml(lu.glossary) : '') +
          (uniRefs.length ? S.termCards(uniRefs, lu ? 'Kapcsolódó egyetemi szakszavak' : '') : '') + '</section>'
        : '<div class="note uni-hint"><b class="t">🎓 Egyetemi nézet</b><p>Ehhez a leckéhez még nincs külön egyetemi kiegészítés, ezért az iskolai anyagot látod. Nézz körül az <a href="#/egyetem">egyetemi kurzusok</a> között!</p></div>';
      if (hasUni) { body = '<details class="school-fold"><summary>🎒 Iskolai magyarázat (alapok) – kattints a lenyitáshoz</summary>' + body + widgets + '</details>'; widgets = ''; }
    }
    main.innerHTML =
      '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/tantargy/' + s.id + '">' + esc(s.title) + '</a><span>›</span><span>' + (idx + 1) + '. lecke</span></nav>' +
      '<div class="lesson"><article class="lesson-body">' +
      '<div class="row" style="gap:8px;margin-bottom:6px"><span class="badge ' + lv[1] + '">' + lv[0] + '</span>' + (l.minutes ? '<span class="badge">⏱ kb. ' + l.minutes + ' perc</span>' : '') + '</div>' +
      '<h1>' + esc(l.title) + '</h1><p class="lead">' + esc(l.summary) + '</p>' + (S.toolsHtml ? S.toolsHtml('lecke:' + key) : '') +
      (S.routes && S.routes.hangos ? '<p class="hg-listen"><a class="btn sm" href="#/hangos/' + s.id + '/' + l.id + '">🎧 Hallgasd meg</a></p>' : '') +
      uniTop + body + widgets +
      (models.length ? '<h2>Nézz bele!</h2><p class="muted">Ehhez a leckéhez kapcsolódó szétszedhető modellek:</p><div class="related">' + models.map(function (m) {
        return '<a class="btn" href="#/felfedezo/' + m + '">' + S.models[m].icon + ' ' + esc(S.models[m].title) + '</a>';
      }).join('') + '</div>' : '') +
      (uniView ? '' : uniBox(s, l)) +
      (S.pageTanulas ? '<div class="learn-actions card pad"><b>📚 Tanuld meg igazán:</b> <a class="btn sm" href="#/tanulas/felidezes?l=' + key + '">🧠 Írd le fejből</a> <a class="btn sm" href="#/tanulas/terkep?l=' + key + '">🗺️ Gondolattérkép</a> <a class="btn sm" href="#/tanulas/igazhamis?t=' + s.id + '">⚡ Igaz vagy hamis?</a> <a class="btn sm" href="#/kartyak/' + s.id + '?lecke=' + l.id + '">🃏 Kártyák</a></div>' : '') +
      (S.factBox ? S.factBox(lessonFacts(s.id, key), '💡 Tudtad?', true) : '') +
      (l.quiz && l.quiz.length ? '<h2 id="kviz">Ellenőrizd magad!</h2><div class="quiz card" id="quiz"></div>' : '') +
      '<div class="row" style="margin-top:22px"><button type="button" class="btn" id="done"></button></div>' +
      '<nav class="pager">' + (prev ? '<a class="btn" href="#/lecke/' + s.id + '/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="btn primary" href="#/lecke/' + s.id + '/' + next.id + '">' + esc(next.title) + ' →</a>' : '<a class="btn" href="#/tantargy/' + s.id + '">Vissza a tantárgyhoz</a>') + '</nav>' +
      '</article><aside class="toc card pad"><b>Tartalom</b><ol>' + secs.map(function (sec, i) {
        return sec.title ? '<li><a href="#sec-' + i + '" data-jump="sec-' + i + '">' + esc(sec.title) + '</a></li>' : '';
      }).join('') + (l.quiz ? '<li><a href="#kviz" data-jump="kviz">Kvíz</a></li>' : '') + '</ol></aside></div>';

    if (S.bindFacts) S.bindFacts(main);
    if (S.bindTools) S.bindTools(main, 'lecke:' + key, { title: l.title, href: '#/lecke/' + key, kind: s.title + ' · lecke', icon: s.icon }, main.querySelector('.lesson-body'));
    var doneBtn = main.querySelector('#done');
    function paintDone() {
      var d = isDone(sid, lid);
      doneBtn.textContent = d ? '✓ Megtanultam (visszavonás)' : 'Megjelölöm: megtanultam';
      doneBtn.classList.toggle('on', d);
    }
    doneBtn.addEventListener('click', function () { setProgress(key, { done: !isDone(sid, lid) }); paintDone(); });
    paintDone();
    // A tartalomjegyzék ugrásai ne írják át az útvonalat.
    main.querySelectorAll('[data-jump]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var t = document.getElementById(a.dataset.jump);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    mountWidgets(main);
    if (l.quiz && l.quiz.length) S.renderQuiz(main.querySelector('#quiz'), l.quiz, key);
  }

  /* Egyetemi kitekintés a lecke végén: a lecke saját hivatkozásai + azok a szakszavak, amelyek erre a leckére épülnek. */
  function glossaryHtml(g) {
    return '<h3>📖 Szakszótár</h3><div class="table-wrap"><table class="gloss"><thead><tr><th>Magyar</th><th>Szakmai / nemzetközi név</th><th>Jelentés</th></tr></thead><tbody>' +
      g.map(function (x) {
        return '<tr><td><b>' + esc(x.hu) + '</b></td><td>' + (x.latin ? '<span class="sci-name">' + esc(x.latin) + '</span><br>' : '') + (x.en ? '<small>🇬🇧 ' + esc(x.en) + '</small>' : '') + '</td><td>' + S.inline(x.def || '') + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  function uniBox(s, l) {
    if (!S.termCards) return '';
    var refs = (l.terms || []).concat(S.termsBuildingOn(s.id, l.id)).filter(function (r, i, a) { return a.indexOf(r) === i && S.resolveTerm(r); });
    var lu = S.lessonUni[s.id + '/' + l.id];
    if (!refs.length && lu && S.level !== 'egyetem') return '<div class="note uni-hint"><b class="t">🎓 Szakmai / egyetemi szint</b><p>Ehhez a leckéhez mélyebb, szaknyelvi kiegészítés is tartozik' + (lu.glossary ? ' (' + lu.glossary.length + ' szakszó angol' + (lu.glossary.some(function (x) { return x.latin; }) ? ' és latin' : '') + ' megfelelővel)' : '') + '. <button type="button" class="linkish" data-level="egyetem">Váltás egyetemi szintre</button></p></div>';
    if (!refs.length) return '';
    if (S.level !== 'egyetem') {
      return '<div class="note uni-hint"><b class="t">🎓 Egyetemi kitekintés</b><p>' + refs.length + ' egyetemi szakszó épül erre a leckére (pl. ' +
        refs.slice(0, 3).map(function (r) { var x = S.resolveTerm(r); return '<a href="' + x.href + '">' + esc(x.t.term) + '</a>'; }).join(', ') +
        '). <button type="button" class="linkish" data-level="egyetem">Váltás egyetemi szintre</button></p></div>';
    }
    return '<h2>🎓 Egyetemi kitekintés</h2><p class="muted">Ugyanez a téma mélyebben, a pontos szakszavakkal és angol megfelelőjükkel:</p>' + S.termCards(refs);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-level]');
    if (b && b.tagName === 'BUTTON') S.setLevel(b.dataset.level);
  });

  function pageExplorerList() {
    setNav('felfedezo'); title('Mi miből áll?');
    var models = Object.keys(S.models).map(function (k) { return S.models[k]; });
    var cats = {};
    models.forEach(function (m) { (cats[m.category || 'Egyéb'] = cats[m.category || 'Egyéb'] || []).push(m); });
    var chains = S.chains || [];
    main.innerHTML =
      '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Mi miből áll?</span></nav>' +
      '<h1>Mi miből áll?</h1><p class="lead">Válassz egy tárgyat, szedd szét, és kattints az alkatrészeire. Ahol egy alkatrész mellett „Nézz bele” gomb van, ott egy szinttel lejjebb is mehetsz, egészen az atomokig.</p>' +
      (chains.length ? '<div class="card pad" style="margin:16px 0"><b>Utazás a mélybe</b>' + chains.map(function (c) {
        return '<div class="chain">' + c.map(function (id, i) {
          var m = S.models[id]; if (!m) return '';
          return (i ? '<span class="arrow">→</span>' : '') + '<a class="chip" href="#/felfedezo/' + c.slice(0, i + 1).join('/') + '">' + m.icon + ' ' + esc(m.title) + '</a>';
        }).join('') + '</div>';
      }).join('') + '</div>' : '') +
      '<div class="row model-filter"><input type="search" id="mf-q" class="filter" placeholder="Modell keresése… (pl. motor, sejt, chip)" aria-label="Modell keresése">' +
      '<div class="chips" id="mf-cats" style="margin:0"><button type="button" class="chip on" data-c="">Mind (' + models.length + ')</button>' + Object.keys(cats).map(function (c) {
        return '<button type="button" class="chip" data-c="' + esc(c) + '">' + esc(c) + ' (' + cats[c].length + ')</button>';
      }).join('') + '</div></div><div id="mf-list"></div>';
    var cat = '', q = '';
    function paintModels() {
      var nq = norm(q);
      main.querySelector('#mf-list').innerHTML = Object.keys(cats).filter(function (c) { return !cat || c === cat; }).map(function (c) {
        var list = cats[c].filter(function (m) { return !nq || norm(m.title + ' ' + m.summary + ' ' + (m.keywords || '') + ' ' + m.parts.map(function (p) { return p.name; }).join(' ')).indexOf(nq) >= 0; });
        return list.length ? '<div class="section-title"><h2>' + esc(c) + '</h2></div><div class="grid">' + list.map(modelTile).join('') + '</div>' : '';
      }).join('') || '<div class="empty card">Nincs ilyen modell.</div>';
    }
    main.querySelector('#mf-q').addEventListener('input', function (e) { q = e.target.value; paintModels(); });
    main.querySelectorAll('#mf-cats .chip').forEach(function (b) {
      b.addEventListener('click', function () { cat = b.dataset.c; main.querySelectorAll('#mf-cats .chip').forEach(function (x) { x.classList.toggle('on', x === b); }); paintModels(); });
    });
    paintModels();
  }

  function pageExplorer(ids) {
    var m = S.models[ids[ids.length - 1]];
    if (!m) return notFound();
    if (S.logActivity) { S.logActivity('model', m.id); if (ids[ids.length - 1] === 'atom') S.logActivity('deep', ids.length); }
    setNav('felfedezo'); title(m.title);
    S.renderModel(main, m, ids);
  }

  /* ---------- keresés ---------- */
  var index = null;
  function buildIndex() {
    index = [];
    S.subjects.forEach(function (s) {
      index.push({ kind: 'Tantárgy', icon: s.icon, title: s.title, sub: s.description, href: '#/tantargy/' + s.id, text: s.description + ' ' + (s.intro || '') });
      s.lessons.forEach(function (l) {
        var txt = [l.summary, (l.tags || []).join(' ')].concat((l.sections || []).map(function (x) { return (x.title || '') + ' ' + (x.text || '') + ' ' + (x.tip || '') + ' ' + (x.warn || ''); })).join(' ');
        var lu = S.lessonUni[s.id + '/' + l.id];
        if (lu) txt += ' ' + lu.text + ' ' + (lu.glossary || []).map(function (g) { return g.hu + ' ' + (g.en || '') + ' ' + (g.latin || ''); }).join(' ');
        index.push({ kind: 'Lecke', icon: s.icon, title: l.title, sub: s.title + ' · ' + l.summary, href: '#/lecke/' + s.id + '/' + l.id, text: txt, tags: (l.tags || []).join(' ') });
      });
    });
    Object.keys(S.models).forEach(function (k) {
      var m = S.models[k];
      index.push({ kind: 'Felfedező', icon: m.icon, title: m.title, sub: m.summary, href: '#/felfedezo/' + m.id, text: m.summary + ' ' + (m.intro || '') + ' ' + (m.keywords || ''), tags: m.keywords || '' });
      m.parts.forEach(function (p) {
        index.push({ kind: 'Alkatrész', icon: m.icon, title: p.name, sub: m.title + ' · ' + p.what, href: '#/felfedezo/' + m.id + '?resz=' + p.id, text: [p.what, p.madeOf, p.how, p.fact].join(' ') });
      });
    });
    Object.keys(S.troubles || {}).forEach(function (k) {
      var t = S.troubles[k], ref = (t.lessons || [])[0];
      if (!ref) return;
      var sid = ref.split('/')[0], sub = S.subjects.filter(function (x) { return x.id === sid; })[0];
      index.push({ kind: 'Hibakereső', icon: '🛠️', title: t.title, sub: (sub ? sub.title + ' · ' : '') + 'lépésről lépésre hibakeresés', href: '#/lecke/' + ref,
        text: t.intro + ' ' + Object.keys(t.nodes).map(function (n) { return (t.nodes[n].q || '') + ' ' + (t.nodes[n].result || ''); }).join(' ') });
    });
    (S.courses || []).forEach(function (c) {
      index.push({ kind: 'Egyetem', icon: c.icon, title: c.title, sub: c.description, href: '#/egyetem/' + c.id, text: c.description + ' ' + (c.intro || '') });
      c.terms.forEach(function (t) {
        index.push({ kind: 'Szakszó', icon: c.icon, title: t.term, sub: c.title + ' · ' + t.short, href: '#/egyetem/' + c.id + '/fogalom/' + t.id,
          text: [t.short, t.text, t.example, t.pitfall].join(' '), tags: (t.en || '') + ' ' + (t.tags || '') });
      });
    });
    var SPORT_ALIAS = { foci: 'foci futball football soccer', f1: 'f1 forma1 formula1 formula forma-1 autoverseny', kosar: 'kosar kosarlabda basketball nba', tenisz: 'tennis', uszas: 'swimming', atletika: 'athletics futas', kezilabda: 'handball', vizilabda: 'waterpolo', kerekpar: 'bicikli cycling tour', vivas: 'fencing', kajak: 'kenu canoe', jegkorong: 'hoki hockey nhl', torna: 'gymnastics', kuzdo: 'box okolvivas judo birkozas', teli: 'si korcsolya', sakk: 'chess', altalanos: 'edzes sporttudomany' };
    (S.SPORTS || []).forEach(function (sp) {
      index.push({ kind: 'Sport', icon: sp[1], title: sp[2], sub: 'Sport és tudomány · érdekességek, sportolók', href: '#/sport?sp=' + sp[0], text: '', tags: sp[0] + ' sport ' + (SPORT_ALIAS[sp[0]] || ''), boost: 6 });
    });
    var athl = {};
    (S.facts || []).forEach(function (f) { (f.athletes || []).forEach(function (n) { athl[n] = (athl[n] || 0) + 1; }); });
    Object.keys(athl).forEach(function (n) {
      index.push({ kind: 'Sportoló', icon: '⭐', title: n, sub: athl[n] + ' érdekesség a Sport oldalon', href: '#/sport?ki=' + encodeURIComponent(n), text: '', tags: 'sportolo', boost: 4 });
    });
    (S.langCourses || []).forEach(function (c) {
      index.push({ kind: 'Nyelv', icon: c.flag, title: c.title + ' nyelv', sub: 'Játékos nyelvtanulás · ' + c.units.length + ' egység', href: '#/nyelv/' + c.id, text: (c.intro || '') + ' ' + c.units.map(function (u) { return u.title; }).join(' '), tags: c.id + ' nyelvtanulas nyelvlecke', boost: 6 });
    });
    (S.facts || []).forEach(function (f) {
      index.push({ kind: 'Tudtad?', icon: '💡', title: 'Tudtad, hogy ' + f.q.replace(/\*\*/g, ''), sub: S.factCatTitle(f.cat), href: '#/tudtad?f=' + encodeURIComponent(f.id), text: f.why, tags: (f.athletes || []).join(' '), weak: true });
    });
    index.forEach(function (it) { it.nt = norm(it.title); it.nx = norm(it.text); it.ng = norm(it.tags || ''); });
  }
  /* Elgépelés-tűrő összehasonlítás: Levenshtein-távolság korlátos számolással. */
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i]; var rowMin = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
        if (cur[j] < rowMin) rowMin = cur[j];
      }
      if (rowMin > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }
  function fuzzyWord(words, t) {
    if (t.length < 4) return false;
    var max = t.length >= 8 ? 2 : 1;
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (w.length < 3) continue;
      // a szó eleje is egyezhet elgépeléssel (pl. „procesz” → „processzor”)
      if (lev(w, t, max) <= max || (w.length > t.length && lev(w.slice(0, t.length), t, max) <= max)) return true;
    }
    return false;
  }
  function search(q, noFuzzy) {
    if (!index) buildIndex();
    var terms = norm(q).split(/\s+/).filter(function (t) { return t.length > 0; });
    if (!terms.length) return [];
    var out = [];
    index.forEach(function (it) {
      var sc = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i], s = 0;
        if (it.nt === t) s += 40;
        if (it.nt.indexOf(t) === 0) s += 20;
        else if ((' ' + it.nt).indexOf(' ' + t) >= 0) s += 10; /* szó elején (pl. „Lionel Messi”) */
        if (it.nt.indexOf(t) >= 0) s += 15;
        if (it.ng.indexOf(t) >= 0) s += 8;
        if ((' ' + it.ng + ' ').indexOf(' ' + t + ' ') >= 0) s += 14; /* pontos címke/kulcsszó-egyezés (pl. f1) */
        if (it.nx.indexOf(t) >= 0) s += 3;
        if (!s && !noFuzzy) {
          if (!it.nw) { it.nw = it.nt.split(/[^a-z0-9]+/); it.ngw = it.ng.split(/[^a-z0-9]+/); }
          if (fuzzyWord(it.nw, t)) s += 14;
          else if (fuzzyWord(it.ngw, t)) s += 4;
        }
        if (!s) return; // minden szónak szerepelnie kell
        sc += s;
      }
      if (it.kind === 'Lecke' || it.kind === 'Felfedező' || it.kind === 'Szakszó') sc += 2;
      if (it.boost) sc += it.boost;
      if (it.weak) sc = Math.round(sc * 0.55); /* a hosszú „Tudtad?”-címek ne nyomják el a modelleket, leckéket */
      out.push({ it: it, sc: sc });
    });
    out.sort(function (a, b) { return b.sc - a.sc; });
    return out.map(function (o) { return o.it; });
  }
  function mark(text, q) {
    var t = esc(text);
    norm(q).split(/\s+/).filter(Boolean).forEach(function (w) {
      // ékezetfüggetlen kiemelés: a normalizált szövegben keresünk, az eredetiben jelölünk
      var src = norm(t), i = src.indexOf(w);
      if (i >= 0 && w.length > 1) t = t.slice(0, i) + '<mark>' + t.slice(i, i + w.length) + '</mark>' + t.slice(i + w.length);
    });
    return t;
  }
  function resultRow(it, q, hi) {
    return '<a class="sr' + (hi ? ' hi' : '') + '" href="' + it.href + '"><span class="ico">' + it.icon + '</span><span class="t"><b>' + mark(it.title, q) + '</b><span>' + esc(it.sub) + '</span></span><span class="badge kind">' + it.kind + '</span></a>';
  }
  function pageSearch(q) {
    setNav(''); title('Keresés: ' + q);
    var res = search(q);
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Keresés</span></nav>' +
      '<h1>Keresés: „' + esc(q) + '”</h1><p class="muted">' + res.length + ' találat</p>' +
      (res.length ? '<div class="card results">' + res.slice(0, 60).map(function (it) { return resultRow(it, q); }).join('') + '</div>'
        : '<div class="card empty"><p>Erre még nincs tananyag.</p><p>Próbáld másképp: rövidebb szóval, vagy nézz körül a <a href="#/">tantárgyak</a> és a <a href="#/felfedezo">felfedező</a> között.</p></div>');
    var input = document.getElementById('search');
    if (document.activeElement !== input) input.value = q;
  }

  function pageAbout() {
    setNav(''); title('Letöltés és használat');
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Letöltés</span></nav>' +
      '<article class="lesson-body"><h1>Hogyan töltsem le és használjam?</h1>' + md(
        'A Tudásműhely egy egyszerű weboldal, ami **teljesen a saját gépeden fut**: nem kell hozzá internet, regisztráció vagy telepítés.\n\n' +
        '**1. lehetőség: egyetlen fájl.** Töltsd le a `tudasmuhely-offline.html` fájlt (a `dist` mappában található), és nyisd meg dupla kattintással bármilyen böngészőben. Pendrive-ra is másolható, e-mailben is elküldhető.\n\n' +
        '**2. lehetőség: a teljes mappa.** Töltsd le a projektet ZIP-ként (GitHubon: Code → Download ZIP), csomagold ki, és nyisd meg az `index.html` fájlt.\n\n' +
        '**3. lehetőség: telepítés alkalmazásként.** Ha a tananyag egy weboldalon van közzétéve (például az iskola szerverén), a böngésző menüjében válaszd a „Telepítés” vagy „Hozzáadás a kezdőképernyőhöz” lehetőséget. Az első megnyitás után offline is működik, telefonon is.\n\n' +
        'A haladásod (elvégzett leckék, kvízeredmények) a böngésződben tárolódik ezen az eszközön. Ha másik gépre ülsz, ott elölről indul.\n\n' +
        'A tananyag bővíthető: minden tantárgy és modell egy-egy külön fájl a `data` mappában. A leírás a `README.md` fájlban van.') +
      '<div class="row" style="margin-top:12px"><button class="btn" id="reset" type="button">Haladás törlése ezen az eszközön</button></div>' + (S.statPanel ? S.statPanel() : '') + '</article>';
    if (S.bindStatPanel) S.bindStatPanel(main);
    main.querySelector('#reset').addEventListener('click', function () {
      if (confirm('Biztosan törlöd az összes elvégzett leckét és kvízeredményt?')) {
        progress = {}; S.store.set('progress', progress); S.store.set('last', null); location.hash = '#/';
      }
    });
  }

  function notFound() {
    title('Nem található');
    main.innerHTML = '<div class="empty card"><h1>Ezt nem találjuk</h1><p>Lehet, hogy elírás van a címben.</p><a class="btn primary" href="#/">Vissza a kezdőlapra</a></div>';
  }

  /* ---------- útválasztó ---------- */
  var lastPath = null;
  function route() {
    var h = location.hash.slice(1) || '/';
    if (h.indexOf('/') !== 0) return; // pl. #sec-1 belső ugrás
    var qi = h.indexOf('?');
    var path = qi >= 0 ? h.slice(0, qi) : h;
    var params = {};
    if (qi >= 0) h.slice(qi + 1).split('&').forEach(function (kv) {
      var p = kv.split('='); params[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' '));
    });
    var seg = path.split('/').filter(Boolean).map(decodeURIComponent);
    S.params = params;
    if (S.logActivity && seg[0] && seg[0] !== 'haladas') S.logActivity();
    document.body.setAttribute('data-page', seg[0] || 'home');
    closePop();
    /* ⚡ a kezdőlap azonnal megjelenik; a többi oldal megvárja a háttérben töltődő adatcsomagokat */
    if (seg.length && S.need && !S.lazyReady) {
      main.innerHTML = '<div class="lazy-wait" role="status"><span class="spin"></span> Tananyag betöltése…</div>';
      var want = location.hash;
      S.need(function () { if (location.hash === want) route(); });
      return;
    }
    if (!seg.length) pageHome();
    else if (seg[0] === 'tantargy') pageSubject(seg[1]);
    else if (seg[0] === 'lecke') pageLesson(seg[1], seg[2]);
    else if (seg[0] === 'felfedezo' && seg.length === 1) pageExplorerList();
    else if (seg[0] === 'felfedezo') pageExplorer(seg.slice(1));
    else if (seg[0] === 'egyetem' && seg.length === 1) { setNav('egyetem'); title('Egyetem'); S.pageUniList(main); }
    else if (seg[0] === 'egyetem' && seg[2] === 'fogalom') { if (S.logActivity) S.logActivity('term', seg[1] + '/' + seg[3]); setNav('egyetem'); var tt = S.courseById(seg[1]); title(tt ? tt.title : ''); if (!S.pageTerm(main, seg[1], seg[3])) notFound(); }
    else if (seg[0] === 'egyetem') { setNav('egyetem'); var cc = S.courseById(seg[1]); title(cc ? cc.title : ''); if (!S.pageCourse(main, seg[1], seg[2])) notFound(); }
    else if (seg[0] === 'felkeszito' && seg[1]) { setNav('felkeszito'); title('Vizsgafelkészítő'); if (!S.pageVizsga(main, seg[1])) notFound(); }
    else if (seg[0] === 'felkeszito') { setNav('felkeszito'); title('Vizsgafelkészítő'); S.pageFelkeszito(main); }
    else if (seg[0] === 'kartyak') { setNav('home'); title('Tanulókártyák'); if (!S.pageKartyak(main, seg[1], params)) notFound(); }
    else if (seg[0] === 'tartalom') { setNav(''); title('Tartalomjegyzék'); S.pageTartalom(main); }
    else if (seg[0] === 'beallitasok') { setNav(''); title('Beállítások'); S.pageBeallitasok(); }
    else if (seg[0] === 'jegyzetek') { setNav(''); title('Jegyzeteim'); S.pageJegyzetek(main); }
    else if (seg[0] === 'ujdonsagok') { setNav('ujdonsagok'); title('Újdonságok'); S.pageUjdonsagok(main); }
    else if (seg[0] === 'tanaroknak') { setNav(''); title('Tanároknak'); S.pageTanaroknak(main); }
    else if (seg[0] === 'edzoknek') { setNav('sport'); title('Edzőknek'); S.pageEdzoknek(main); }
    else if (seg[0] === 'setup') { setNav('sport'); title('Setup-szimulátor'); S.pageSetup(main); }
    else if (seg[0] === 'osszeallito') { setNav('teszt'); title('Kérdés-összeállító'); S.pageOsszeallito(main, params); }
    else if (seg[0] === 'tanulas') { setNav('tanulas'); title('Tanulássegéd'); if (!S.pageTanulas(main, seg[1], params)) notFound(); }
    else if (seg[0] === 'nyelvek') { setNav('nyelvek'); title('Nyelvek'); S.pageNyelvek(main); }
    else if (seg[0] === 'nyelv') { setNav('nyelvek'); var lc = S.langById(seg[1]); title(lc ? lc.title : ''); if (!S.pageNyelv(main, seg[1])) notFound(); }
    else if (seg[0] === 'sport') { setNav('sport'); title('Sport és tudomány'); S.pageSport(main, params); }
    else if (seg[0] === 'tudtad') { setNav('tudtad'); title('Tudtad?'); S.pageTudtad(main, params); }
    else if (seg[0] === 'utvonalak') { setNav(''); title('Tanulási útvonalak'); S.pageUtvonalak(main); }
    else if (seg[0] === 'utvonal') { setNav(''); var pth = (S.paths || []).filter(function (x) { return x.id === seg[1]; })[0]; title(pth ? pth.title : ''); if (!S.pageUtvonal(main, seg[1])) notFound(); }
    else if (seg[0] === 'haladas') { setNav('haladas'); title('Haladásom'); S.pageHaladas(main); }
    else if (seg[0] === 'teszt') { setNav('teszt'); title('Tesztközpont'); S.pageTeszt(main, params); }
    else if (seg[0] === 'kereses') pageSearch(params.q || '');
    else if (seg[0] === 'nevjegy') pageAbout();
    else if (S.routes && S.routes[seg[0]]) { var rt = S.routes[seg[0]]; setNav(rt.nav || ''); title(rt.title || ''); if (rt.page(main, seg.slice(1), params) === false) notFound(); }
    else notFound();
    if (path !== lastPath) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
    lastPath = path;
  }

  /* ---------- fejléc keresője ---------- */
  var input = document.getElementById('search');
  var pop = document.getElementById('search-pop');
  var hi = -1, cur = [];
  function closePop() { pop.hidden = true; hi = -1; }
  function paintPop() {
    var q = input.value.trim();
    if (!q) return closePop();
    cur = search(q).slice(0, 8);
    pop.innerHTML = cur.length ? cur.map(function (it, i) { return resultRow(it, q, i === hi); }).join('') +
      '<a class="sr" href="#/kereses?q=' + encodeURIComponent(q) + '"><span class="ico">🔎</span><span class="t"><b>Összes találat</b></span></a>'
      : '<div class="empty" style="padding:14px">Nincs találat erre: „' + esc(q) + '”</div>';
    pop.hidden = false;
  }
  input.addEventListener('input', function () { hi = -1; paintPop(); });
  input.addEventListener('focus', paintPop);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { hi = Math.min(hi + 1, cur.length - 1); paintPop(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { hi = Math.max(hi - 1, -1); paintPop(); e.preventDefault(); }
    else if (e.key === 'Escape') { closePop(); input.blur(); }
    else if (e.key === 'Enter') {
      var q = input.value.trim();
      if (hi >= 0 && cur[hi]) location.hash = cur[hi].href;
      else if (q) location.hash = '#/kereses?q=' + encodeURIComponent(q);
      closePop(); input.blur();
    }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.search')) closePop(); });
  pop.addEventListener('click', function () { closePop(); input.blur(); });

  /* ---------- mélységi szint: iskolai / egyetemi ---------- */
  S.level = S.store.get('level', 'iskolai');
  var levelBtn = document.getElementById('level');
  function paintLevel() {
    levelBtn.innerHTML = S.level === 'egyetem' ? '🎓 <span>Egyetemi</span>' : '🎒 <span>Iskolai</span>';
    levelBtn.title = 'Mélységi szint: ' + (S.level === 'egyetem' ? 'egyetemi (elmélet, képletek, angol szakszavak)' : 'iskolai és szakmai') + '. Kattints a váltáshoz!';
    document.documentElement.setAttribute('data-level', S.level);
  }
  S.setLevel = function (lv) {
    S.level = lv; S.store.set('level', lv); paintLevel();
    var y = window.scrollY; route(); window.scrollTo(0, y);
    toast(lv === 'egyetem' ? '🎓 Egyetemi nézet: szakmai (latin/angol) nevek és mélyebb leírások mindenhol.' : '🎒 Iskolai nézet: közérthető magyarázatok.');
  };
  var toastTimer;
  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  levelBtn.addEventListener('click', function () { S.setLevel(S.level === 'egyetem' ? 'iskolai' : 'egyetem'); });
  paintLevel();

  /* ---------- nyomtatható tanmenet ---------- */
  function printSyllabus(s) {
    var plain = function (t) { return String(t || '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[\[[^|\]]+\|(.+?)\]\]/g, '$1'); };
    var WN = { ohm: 'Ohm-törvény kísérlet', 'soros-parhuzamos': 'soros/párhuzamos kapcsolás', feszultsegeses: 'feszültségesés-számító', negyutemu: 'négyütemű motor animáció', attetel: 'áttétel-szimulátor',
      akkupakk: 'akkupakk-tervező', fuggveny: 'függvényábrázoló', pitagorasz: 'Pitagorasz-szemléltető', gyakorlas: 'gyakorló feladatok', idovonal: 'idővonal-játék', hajitas: 'hajítás-szimulátor',
      atomepito: 'atomépítő', periodusos: 'periódusos rendszer', parositas: 'párosító játék', hibakereses: 'hibakereső szimulátor', kapcsolas: 'kapcsolás-építő', 'mosfet-iv': 'MOSFET-szimuláció', 'cpu-teljesitmeny': 'CPU-teljesítmény szimuláció' };
    var total = 0, bank = S.bank && S.bank[s.id] || {};
    var rows = s.lessons.map(function (l, i) {
      total += l.minutes || 0;
      var ws = [];
      (l.sections || []).forEach(function (x) { if (x.widget) ws.push(x.widget.type); });
      (l.widgets || []).forEach(function (w) { ws.push(w.type); });
      var wn = ws.filter(function (w, k) { return ws.indexOf(w) === k; }).map(function (w) { return WN[w] || w; });
      return '<tr><td>' + (i + 1) + '.</td><td><b>' + esc(l.title) + '</b><br><small>' + esc(plain(l.summary)) + '</small>' +
        '<div class="sec">' + (l.sections || []).map(function (x) { return esc(x.title || ''); }).filter(Boolean).join(' · ') + '</div>' +
        (wn.length ? '<div class="w">Interaktív: ' + esc(wn.join(', ')) + '</div>' : '') + '</td>' +
        '<td>' + esc((LEVELS[l.level || 1] || LEVELS[1])[0]) + '</td><td>' + (l.minutes || '–') + ' perc</td><td>' + (l.quiz || []).length + ' + ' + (bank[l.id] || []).length + '</td></tr>';
    }).join('');
    var html = '<!doctype html><html lang="hu"><head><meta charset="utf-8"><title>Tanmenet – ' + esc(s.title) + '</title><style>' +
      'body{font:13px/1.45 system-ui,Segoe UI,Arial,sans-serif;color:#111;max-width:860px;margin:20px auto;padding:0 16px}h1{font-size:20px;margin:0}.meta{color:#555;margin:4px 0 14px}' +
      'table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid #ccc;padding:6px 6px;text-align:left;vertical-align:top}th{background:#f2f2f2;font-size:12px}' +
      'small{color:#444}.sec{font-size:12px;color:#333;margin-top:3px}.w{font-size:12px;color:#2357d9;margin-top:2px}@media print{.noprint{display:none}}</style></head><body>' +
      '<p class="noprint"><button onclick="window.print()">🖨 Nyomtatás</button></p><h1>Tanmenet: ' + esc(s.icon + ' ' + s.title) + '</h1>' +
      '<div class="meta">' + esc(S.stageTitle(s.stage).replace(/^\S+\s/, '')) + ' · ' + s.lessons.length + ' lecke · kb. ' + total + ' perc önálló tanulás · Tudásműhely</div>' +
      (s.description ? '<p>' + esc(s.description) + '</p>' : '') +
      '<table><thead><tr><th>#</th><th>Lecke, részei, interaktív elemek</th><th>Szint</th><th>Idő</th><th>Kvíz + bank</th></tr></thead><tbody>' + rows + '</tbody></table></body></html>';
    var w = window.open('', '_blank');
    if (!w) { alert('A böngésző letiltotta az új ablakot. Engedélyezd a felugró ablakokat ehhez az oldalhoz.'); return; }
    w.document.open(); w.document.write(html); w.document.close();
  }
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'syllabus') {
      var sid = (location.hash.match(/^#\/tantargy\/([^/?]+)/) || [])[1], s = sid && subjectById(sid);
      if (s) printSyllabus(s);
    }
  });

  /* ---------- akadálymentesítési beállítások ---------- */
  function applySettings() {
    var st = S.store.get('settings', {}), r = document.documentElement;
    r.style.fontSize = st.font ? st.font + '%' : '';
    r.classList.toggle('hc', !!st.contrast);
    r.classList.toggle('no-motion', !!st.noMotion);
    r.classList.toggle('dys', !!st.dys);
    r.classList.toggle('wide-lh', !!st.wideLh);
    r.classList.toggle('ulinks', !!st.ulinks);
    ruler(!!st.ruler); readBtn(!!st.readAll);
    if (S.applyMegjelenes) S.applyMegjelenes(st);
  }
  S.applySettings = applySettings;
  /* olvasóvonalzó: áttetsző sáv, ami követi az ujjat/egeret – segít a sor tartásában */
  var rulerEl = null;
  function rulerMove(e) { var y = e.touches ? e.touches[0].clientY : e.clientY; if (rulerEl) rulerEl.style.top = (y - 22) + 'px'; }
  function ruler(on) {
    if (on && !rulerEl) { rulerEl = document.createElement('div'); rulerEl.className = 'read-ruler'; document.body.appendChild(rulerEl); document.addEventListener('mousemove', rulerMove); document.addEventListener('touchmove', rulerMove, { passive: true }); }
    if (!on && rulerEl) { rulerEl.remove(); rulerEl = null; document.removeEventListener('mousemove', rulerMove); document.removeEventListener('touchmove', rulerMove); }
  }
  /* felolvasás gomb minden oldalon: a kijelölt szöveget, vagy ha nincs kijelölés, az oldal fő tartalmát olvassa fel */
  var readEl = null;
  function readBtn(on) {
    if (!('speechSynthesis' in window)) return;
    if (on && !readEl) {
      readEl = document.createElement('button'); readEl.type = 'button'; readEl.className = 'read-fab'; readEl.title = 'Felolvasás (a kijelölt szöveg vagy az egész oldal)'; readEl.textContent = '🔊';
      readEl.addEventListener('click', function () {
        if (speechSynthesis.speaking) { speechSynthesis.cancel(); readEl.textContent = '🔊'; return; }
        var sel = String(window.getSelection ? window.getSelection() : '').trim(), txt = sel || (main.innerText || '').slice(0, 6000);
        var u = new SpeechSynthesisUtterance(txt); u.lang = 'hu-HU'; u.rate = (S.store.get('settings', {}).rate) || 0.95;
        var v = speechSynthesis.getVoices().filter(function (x) { return /^hu/i.test(x.lang); })[0]; if (v) u.voice = v;
        u.onend = function () { readEl.textContent = '🔊'; }; readEl.textContent = '⏹'; speechSynthesis.speak(u);
      });
      document.body.appendChild(readEl);
    }
    if (!on && readEl) { readEl.remove(); readEl = null; }
  }
  applySettings();
  S.pageBeallitasok = function () {
    var st = S.store.get('settings', {});
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Beállítások</span></nav><h1>Beállítások</h1>' +
      '<div class="card pad settings">' +
      '<div><b>Betűméret</b><div class="seg" id="st-font">' + [[90, 'Kicsi'], [100, 'Normál'], [115, 'Nagy'], [130, 'Nagyon nagy']].map(function (f) {
        return '<button type="button" data-v="' + f[0] + '" class="' + ((st.font || 100) === f[0] ? 'on' : '') + '">' + f[1] + '</button>'; }).join('') + '</div></div>' +
      '<label class="ts-topic"><input type="checkbox" id="st-contrast"' + (st.contrast ? ' checked' : '') + '><span><b>Magas kontraszt</b><br><small class="muted">Fekete-fehér alapú, nagyon erős színek, vastagabb keretek és fókuszkeret (pl. projektoron, gyengénlátóknak).</small></span></label>' +
      '<label class="ts-topic"><input type="checkbox" id="st-motion"' + (st.noMotion ? ' checked' : '') + '><span><b>Csökkentett mozgás</b><br><small class="muted">Nincs mozgó átmenet, animáció és sima görgetés.</small></span></label>' +
      '<h3 style="margin:8px 0 0">♿ Olvasás és akadálymentesség</h3>' +
      '<label class="ts-topic"><input type="checkbox" id="st-dys"' + (st.dys ? ' checked' : '') + '><span><b>Diszlexiabarát olvasás</b><br><small class="muted">Jól megkülönböztethető betűk, nagyobb betű- és szóköz, nincs dőlt betű, balra zárt szöveg.</small></span></label>' +
      '<label class="ts-topic"><input type="checkbox" id="st-lh"' + (st.wideLh ? ' checked' : '') + '><span><b>Tágasabb sorköz</b><br><small class="muted">Több hely a sorok között, könnyebb követni a szöveget.</small></span></label>' +
      '<label class="ts-topic"><input type="checkbox" id="st-ruler"' + (st.ruler ? ' checked' : '') + '><span><b>Olvasóvonalzó</b><br><small class="muted">Egy halvány sáv követi az egeret vagy az ujjad, így nem csúszol el a sorban.</small></span></label>' +
      '<label class="ts-topic"><input type="checkbox" id="st-read"' + (st.readAll ? ' checked' : '') + '><span><b>Felolvasás gomb minden oldalon</b><br><small class="muted">Egy 🔊 gomb a sarokban: felolvassa a kijelölt szöveget, vagy kijelölés nélkül az egész oldalt.</small></span></label>' +
      '<label class="ts-topic"><input type="checkbox" id="st-ulinks"' + (st.ulinks ? ' checked' : '') + '><span><b>Linkek aláhúzása</b><br><small class="muted">A kattintható szövegek mindig aláhúzva látszanak.</small></span></label>' +
      '<div><b>Felolvasás sebessége</b><div class="seg" id="st-rate">' + [[0.75, 'Lassú'], [0.95, 'Normál'], [1.2, 'Gyors']].map(function (f) {
        return '<button type="button" data-v="' + f[0] + '" class="' + ((st.rate || 0.95) === f[0] ? 'on' : '') + '">' + f[1] + '</button>'; }).join('') + '</div></div>' +
      '<div><b>Mélységi szint</b><div class="seg" id="st-level"><button type="button" data-v="iskolai" class="' + (S.level !== 'egyetem' ? 'on' : '') + '">🎒 Iskolai</button><button type="button" data-v="egyetem" class="' + (S.level === 'egyetem' ? 'on' : '') + '">🎓 Egyetemi</button></div></div>' +
      '</div><p class="muted">A beállítások ezen az eszközön tárolódnak, és bekerülnek a <a href="#/haladas">haladás-mentésbe</a> is.</p>';
    function save(k, v) { var s2 = S.store.get('settings', {}); s2[k] = v; S.store.set('settings', s2); applySettings(); S.pageBeallitasok(); }
    main.querySelectorAll('#st-font button').forEach(function (b) { b.addEventListener('click', function () { save('font', +b.dataset.v); }); });
    main.querySelectorAll('#st-rate button').forEach(function (b) { b.addEventListener('click', function () { save('rate', +b.dataset.v); }); });
    main.querySelectorAll('#st-level button').forEach(function (b) { b.addEventListener('click', function () { S.setLevel(b.dataset.v); }); });
    main.querySelector('#st-contrast').addEventListener('change', function () { save('contrast', this.checked); });
    main.querySelector('#st-motion').addEventListener('change', function () { save('noMotion', this.checked); });
    [['#st-dys', 'dys'], ['#st-lh', 'wideLh'], ['#st-ruler', 'ruler'], ['#st-read', 'readAll'], ['#st-ulinks', 'ulinks']].forEach(function (x) {
      main.querySelector(x[0]).addEventListener('change', function () { save(x[1], this.checked); });
    });
    if (S.megjelenesPanel) S.megjelenesPanel(main);
  };

  /* ---------- téma ---------- */
  var theme = S.store.get('theme', null);
  if (theme) document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme').addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    theme = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    S.store.set('theme', theme);
  });

  /* ---------- telepítés alkalmazásként (ha a böngésző felajánlja) ---------- */
  var installEvt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); installEvt = e;
    var foot = document.querySelector('.foot p');
    if (foot && !document.getElementById('install-btn')) {
      foot.insertAdjacentHTML('beforeend', ' · <button type="button" class="linkish" id="install-btn">📲 Telepítés alkalmazásként</button>');
      document.getElementById('install-btn').addEventListener('click', function () {
        if (!installEvt) return;
        installEvt.prompt();
        installEvt.userChoice.then(function () { installEvt = null; var b = document.getElementById('install-btn'); if (b) b.remove(); });
      });
    }
  });

  /* ---------- offline mód (csak webszerverről futtatva) ---------- */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      var had = !!navigator.serviceWorker.controller, reloaded = false;
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) { reg.update(); }).catch(function () {});
      /* ha új változat érkezett és átvette az irányítást, egyszer újratöltjük, hogy az új fájlok látszódjanak */
      navigator.serviceWorker.addEventListener('controllerchange', function () { if (had && !reloaded) { reloaded = true; location.reload(); } });
    });
  }

  /* Ha egy link a jelenlegi címre mutat (pl. futó teszt közben a morzsamenü), a böngésző nem
     váltana oldalt, ezért ilyenkor kézzel rajzoljuk újra. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#/"]');
    if (a && a.getAttribute('href') === location.hash && !e.ctrlKey && !e.metaKey) { e.preventDefault(); route(); window.scrollTo(0, 0); }
  });
  window.addEventListener('hashchange', route);
  route();
  /* az első képernyő után a háttérben betöltjük a többi adatot, majd frissítjük a keresőt és a kezdőlapot */
  if (S.need) setTimeout(function () {
    S.need(function () {
      index = null;
      var a = document.activeElement;
      if (!(location.hash.slice(1) || '/').replace(/^\/+/, '') && !(a && main.contains(a) && /INPUT|TEXTAREA|SELECT/.test(a.tagName))) { var y = window.scrollY; route(); window.scrollTo(0, y); }
    });
  }, 30);
})();
