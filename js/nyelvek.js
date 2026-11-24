/* Tudásműhely – 🗣️ Nyelvtanulás: játékos, rövid gyakorlókörök (ösvény, XP, napi cél, sorozat).
 * Adat: STUDIE.addLangCourse({
 *   id: 'nemet', title: 'Német', flag: '🇩🇪', tts: 'de-DE', noSpaces: false, script: false,
 *   intro: 'rövid bemutató',
 *   units: [{ id: 'koszones', title: 'Köszönés', icon: '👋', tip: 'nyelvtani tipp (jelölőnyelv)',
 *     words: [['Hallo', 'szia'], ['Guten Morgen', 'jó reggelt'], ['こんにちは', 'jó napot', 'konnichiwa' /* átírás *\/]],
 *     sentences: [['Ich heiße Anna.', 'Annának hívnak.', ['Mein Name ist Anna.'] /* más helyes célnyelvi alakok *\/, ['Az én nevem Anna.'] /* más helyes magyar alakok *\/]] }]
 * })
 * A feladatok automatikusan készülnek a szavakból és mondatokból. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  S.langCourses = [];
  S.addLangCourse = function (c) { S.langCourses.push(c); };
  S.langById = function (id) { return S.langCourses.filter(function (c) { return c.id === id; })[0]; };

  var MAXLV = 3, ROUND = 12;
  function today() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function prog(c) { return S.store.get('nyelv.' + c.id, { units: {}, xp: 0 }); }
  function saveProg(c, p) { S.store.set('nyelv.' + c.id, p); }
  function daily() { return S.store.get('nyelv.napi', {}); }
  function goal() { return S.store.get('nyelv.cel', 30); }
  function streak() {
    var d = daily(), n = 0, t = new Date();
    if (!(d[today()] >= 1)) t.setDate(t.getDate() - 1);
    for (;;) {
      var k = t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2);
      if (d[k] >= 1) { n++; t.setDate(t.getDate() - 1); } else break;
    }
    return n;
  }

  /* ---------- összehasonlítás ---------- */
  function strip(s) { return String(s).toLowerCase().replace(/[.,!?¿¡;:"„”“«»()。、！？]/g, ' ').replace(/[’`´]/g, '\'').replace(/\s+/g, ' ').trim(); }
  function noAcc(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/œ/g, 'oe').replace(/æ/g, 'ae') : s; }
  function judge(input, answers) {
    var a = strip(input);
    for (var i = 0; i < answers.length; i++) if (a === strip(answers[i])) return 'ok';
    for (var j = 0; j < answers.length; j++) if (noAcc(a) === noAcc(strip(answers[j]))) return 'accent';
    return 'bad';
  }

  /* ---------- felolvasás ---------- */
  var voiceCache = {};
  function voiceFor(lang) {
    if (!('speechSynthesis' in window)) return null;
    if (voiceCache[lang]) return voiceCache[lang];
    var vs = speechSynthesis.getVoices(), base = lang.split('-')[0].toLowerCase();
    var v = vs.filter(function (x) { return x.lang && x.lang.replace('_', '-').toLowerCase() === lang.toLowerCase(); })[0] ||
      vs.filter(function (x) { return x.lang && x.lang.toLowerCase().indexOf(base) === 0; })[0];
    if (v) voiceCache[lang] = v;
    return v || null;
  }
  function canSpeak(c) { return !!(c.tts && voiceFor(c.tts)); }
  function say(c, text, slow) {
    if (!('speechSynthesis' in window) || !c.tts) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text); u.lang = c.tts;
      var v = voiceFor(c.tts); if (v) u.voice = v;
      u.rate = slow ? 0.6 : 0.95; speechSynthesis.speak(u);
    } catch (e) { /* nincs hang */ }
  }
  if ('speechSynthesis' in window) { try { speechSynthesis.onvoiceschanged = function () { voiceCache = {}; }; speechSynthesis.getVoices(); } catch (e) { /* */ } }

  function tokens(c, s) { return c.noSpaces ? String(s).replace(/[。、！？.!?]/g, '').split(/\s+/).filter(Boolean) : String(s).replace(/[.,!?¿¡;:]/g, '').split(/\s+/).filter(Boolean); }
  function joinT(c, arr) { return arr.join(c.noSpaces ? '' : ' '); }
  function adv(c) {
    if (c.adv) return c.adv;
    var t = c.title.toLowerCase();
    if (/a$/.test(t)) return t + 'ául';
    if (/e$/.test(t)) return t.slice(0, -1) + 'éül';
    return t + (/[aáoóuú]/.test(t) ? 'ul' : 'ül');
  }
  function shown(c, w) { return esc(w[0]) + (w[2] ? ' <small class="translit">' + esc(w[2]) + '</small>' : ''); }

  /* ---------- feladatgenerátor ---------- */
  function pool(c, unitIdx) {
    var u = c.units[unitIdx], prev = c.units.slice(0, unitIdx);
    var extraW = [], extraS = [];
    prev.forEach(function (x) { extraW = extraW.concat(x.words || []); extraS = extraS.concat(x.sentences || []); });
    return { words: u.words || [], sentences: u.sentences || [], oldW: extraW, oldS: extraS };
  }
  function pickOthers(list, not, n, key) {
    var seen = {}; seen[not[key]] = 1;
    return S.shuffle(list.filter(function (w) { if (seen[w[key]]) return false; seen[w[key]] = 1; return true; })).slice(0, n);
  }
  function makeRound(c, unitIdx, level) {
    var P = pool(c, unitIdx), allW = P.words.concat(P.oldW), ex = [];
    var speak = canSpeak(c);
    var ws = S.shuffle(P.words.slice()), ss = S.shuffle(P.sentences.slice());
    if (P.oldW.length && level > 0) ws = ws.concat(S.shuffle(P.oldW.slice()).slice(0, 3));
    var wi = 0, si = 0;
    function nextW() { var w = ws[wi % ws.length]; wi++; return w; }
    function nextS() { var s = ss[si % ss.length]; si++; return s; }
    var plan = level === 0 ? ['intro', 'intro', 'intro', 'choose', 'choose-rev', 'pairs', 'listen', 'build', 'choose', 'build', 'type', 'build']
      : level === 1 ? ['choose', 'choose-rev', 'listen', 'build', 'pairs', 'build-rev', 'type', 'build', 'listen-build', 'choose-rev', 'build', 'type']
        : ['build-rev', 'type', 'listen-build', 'build', 'type', 'pairs', 'build-rev', 'listen', 'type', 'build', 'build-rev', 'type'];
    var introduced = 0;
    plan.forEach(function (k) {
      if ((k === 'listen' || k === 'listen-build') && !speak) k = k === 'listen' ? 'choose' : 'build';
      if (/build/.test(k) && !ss.length) k = 'choose';
      if (k === 'intro') { var w0 = P.words[introduced++ % P.words.length]; ex.push({ k: 'intro', w: w0, opts: S.shuffle([w0].concat(pickOthers(allW, w0, 2, 1))) }); return; }
      if (k === 'choose' || k === 'choose-rev' || k === 'listen') {
        var w = nextW(); ex.push({ k: k, w: w, opts: S.shuffle([w].concat(pickOthers(allW, w, 3, k === 'choose' ? 1 : 0))) }); return;
      }
      if (k === 'pairs') { ex.push({ k: 'pairs', list: S.shuffle(P.words.slice()).slice(0, 5) }); return; }
      if (k === 'type') { var wt = nextW(); ex.push({ k: 'type', w: wt }); return; }
      var s = nextS();
      if (k === 'build' || k === 'listen-build') {
        var toks = tokens(c, s[0]), others = [];
        P.sentences.concat(P.oldS).forEach(function (o) { if (o !== s) others = others.concat(tokens(c, o[0])); });
        others = S.shuffle(others.filter(function (t) { return toks.indexOf(t) < 0; })).filter(function (t, i, a) { return a.indexOf(t) === i; }).slice(0, Math.min(4, 2 + level));
        ex.push({ k: k, s: s, bank: S.shuffle(toks.concat(others)), answer: toks });
      } else {
        var th = s[1].replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean), oh = [];
        P.sentences.concat(P.oldS).forEach(function (o) { if (o !== s) oh = oh.concat(o[1].replace(/[.,!?;:]/g, '').split(/\s+/)); });
        oh = S.shuffle(oh.filter(function (t) { return t && th.indexOf(t) < 0; })).filter(function (t, i, a) { return a.indexOf(t) === i; }).slice(0, 3);
        ex.push({ k: 'build-rev', s: s, bank: S.shuffle(th.concat(oh)), answer: th });
      }
    });
    return ex.slice(0, ROUND);
  }

  /* ---------- oldalak ---------- */
  S.pageNyelvek = function (main) {
    var st = streak(), d = daily()[today()] || 0;
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Nyelvek</span></nav>' +
      '<section class="lang-hero"><h1>🗣️ Nyelvtanulás játékosan</h1><p class="lead">Rövid, 3–5 perces körök: szavak, mondatépítés, hallás utáni értés, párosítás. ' +
      'Napi pár kör, és a sorozatod nő!</p>' + statsBar(st, d) + '</section>' +
      '<div class="lang-grid">' + S.langCourses.map(function (c) {
        var p = prog(c), done = c.units.filter(function (u) { return (p.units[u.id] || 0) > 0; }).length;
        return '<a class="card lang-card" href="#/nyelv/' + c.id + '"><span class="flag">' + c.flag + '</span><b>' + esc(c.title) + '</b>' +
          '<small>' + c.units.length + ' egység' + (c.badge ? ' · ' + esc(c.badge) : '') + '</small>' +
          '<span class="bar"><i style="width:' + Math.round(done / Math.max(1, c.units.length) * 100) + '%"></i></span>' +
          '<small>' + (p.xp ? p.xp + ' XP' : 'Még nem kezdted el') + '</small></a>';
      }).join('') + '</div>' +
      '<div class="card pad" style="margin-top:16px"><b>🎯 Napi cél:</b> <span class="row" style="display:inline-flex;gap:6px;flex-wrap:wrap">' +
      [10, 30, 50, 100].map(function (g) { return '<button type="button" class="chip' + (goal() === g ? ' on' : '') + '" data-goal="' + g + '">' + g + ' XP</button>'; }).join('') + '</span>' +
      '<p class="muted" style="margin:8px 0 0">Egy kör kb. 10–15 XP. A kiejtést a böngésző felolvasója mondja ki; ha nincs hozzá hang telepítve, a hallgatós feladatok kimaradnak.</p></div>';
    main.querySelectorAll('[data-goal]').forEach(function (b) {
      b.addEventListener('click', function () { S.store.set('nyelv.cel', +b.dataset.goal); S.pageNyelvek(main); });
    });
    return true;
  };
  function statsBar(st, d) {
    var g = goal();
    return '<div class="lang-stats"><span>🔥 <b>' + st + '</b> nap sorozat</span><span>⚡ ma <b>' + d + '</b> / ' + g + ' XP</span>' +
      '<span class="bar goal"><i style="width:' + Math.min(100, Math.round(d / g * 100)) + '%"></i></span></div>';
  }

  S.pageNyelv = function (main, id) {
    var c = S.langById(id); if (!c) return false;
    var p = prog(c), next = c.units.findIndex(function (u) { return (p.units[u.id] || 0) < MAXLV; });
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/nyelvek">Nyelvek</a><span>›</span><span>' + esc(c.title) + '</span></nav>' +
      '<section class="lang-hero"><h1>' + c.flag + ' ' + esc(c.title) + '</h1>' + (c.intro ? '<p class="lead">' + S.inline(c.intro) + '</p>' : '') +
      statsBar(streak(), daily()[today()] || 0) + '<p style="margin:8px 0 0">⭐ ' + (p.xp || 0) + ' XP ebben a nyelvben</p></section>' +
      '<div id="lang-voice"></div>' +
      '<ol class="lang-path">' + c.units.map(function (u, i) {
        var lv = p.units[u.id] || 0, cur = i === next;
        return '<li class="lp-node' + (lv >= MAXLV ? ' done' : lv ? ' started' : '') + (cur ? ' current' : '') + '" style="--off:' + [0, 40, 60, 40, 0, -40, -60, -40][i % 8] + 'px">' +
          '<button type="button" class="lp-btn" data-unit="' + i + '" aria-label="' + esc(u.title) + '"><span>' + (u.icon || '⭐') + '</span></button>' +
          '<div class="lp-info"><b>' + (i + 1) + '. ' + esc(u.title) + '</b><span class="crowns">' + [1, 2, 3].map(function (k) { return k <= lv ? '👑' : '◦'; }).join('') + '</span>' +
          (cur ? '<span class="badge">Most ez jön</span>' : '') + '</div></li>';
      }).join('') + '</ol>' +
      '<div id="unit-pop"></div>';
    main.querySelectorAll('[data-unit]').forEach(function (b) {
      b.addEventListener('click', function () { unitPop(main, c, +b.dataset.unit); });
    });
    /* a hangok betöltése aszinkron, ezért kicsit később nézzük meg, van-e felolvasóhang */
    setTimeout(function () {
      var v = main.querySelector('#lang-voice');
      if (v && c.tts && !canSpeak(c)) v.innerHTML = '<p class="note" style="font-size:.9rem">🔇 A böngésződben nincs ' + esc(c.title.toLowerCase()) + ' felolvasóhang, ezért a hallgatós feladatok kimaradnak. (Telefonon és a legtöbb asztali böngészőben van.)</p>';
    }, 1200);
    return true;
  };

  function unitPop(main, c, i) {
    var u = c.units[i], lv = prog(c).units[u.id] || 0;
    var box = main.querySelector('#unit-pop');
    box.innerHTML = '<div class="modal-back"><div class="modal card pad" role="dialog" aria-label="' + esc(u.title) + '">' +
      '<h2 style="margin-top:0">' + (u.icon || '⭐') + ' ' + esc(u.title) + '</h2>' +
      '<p class="muted">Szint: ' + lv + ' / ' + MAXLV + '. ' + (u.words || []).length + ' szó, ' + (u.sentences || []).length + ' mondat.</p>' +
      (u.tip ? '<details class="lang-tip"><summary>💡 Nyelvtani tipp</summary>' + S.md(u.tip) + '</details>' : '') +
      '<details class="lang-tip"><summary>📖 Szólista</summary><table class="gloss"><tbody>' + (u.words || []).map(function (w) {
        return '<tr><td><button type="button" class="linkish" data-say="' + esc(w[0]) + '">🔊</button> <b>' + shown(c, w) + '</b></td><td>' + esc(w[1]) + '</td></tr>';
      }).join('') + '</tbody></table></details>' +
      '<div class="row" style="margin-top:14px;gap:8px;flex-wrap:wrap"><button type="button" class="btn primary" data-go="' + Math.min(lv, MAXLV - 1) + '">' + (lv >= MAXLV ? '🔁 Gyakorlás' : lv ? '▶ Következő szint' : '▶ Kezdés') + '</button>' +
      (lv > 0 ? '<button type="button" class="btn" data-go="0">Könnyű kör</button>' : '') +
      '<button type="button" class="btn" data-close>Bezárás</button></div></div></div>';
    box.querySelector('[data-close]').addEventListener('click', function () { box.innerHTML = ''; });
    box.querySelector('.modal-back').addEventListener('click', function (e) { if (e.target.classList.contains('modal-back')) box.innerHTML = ''; });
    box.querySelectorAll('[data-say]').forEach(function (b) { b.addEventListener('click', function () { say(c, b.dataset.say); }); });
    box.querySelectorAll('[data-go]').forEach(function (b) { b.addEventListener('click', function () { box.innerHTML = ''; runRound(main, c, i, +b.dataset.go); }); });
  }

  /* ---------- egy kör ---------- */
  function runRound(main, c, ui, level) {
    var u = c.units[ui], items = makeRound(c, ui, level), idx = 0, mistakes = [], good = 0, combo = 0, bestCombo = 0, retry = false;
    function shell(inner, foot) {
      main.innerHTML = '<div class="lesson-run"><div class="lr-top"><button type="button" class="btn sm" id="lr-quit" aria-label="Kilépés">✕</button>' +
        '<span class="bar lr-bar"><i style="width:' + Math.round(idx / (items.length + mistakes.length || 1) * 100) + '%"></i></span>' +
        (combo >= 3 ? '<span class="combo">🔥 ' + combo + '</span>' : '') + '</div><div class="lr-body">' + inner + '</div><div class="lr-foot" id="lr-foot">' + (foot || '') + '</div></div>';
      main.querySelector('#lr-quit').addEventListener('click', function () { if (confirm('Biztosan kilépsz? Ennek a körnek az eredménye elvész.')) location.hash = '#/nyelv/' + c.id; });
    }
    function next() {
      if (idx >= items.length) {
        if (mistakes.length && !retry) { retry = true; items = items.concat(mistakes); mistakes = []; }
        if (idx >= items.length) return finish();
      }
      show(items[idx]);
    }
    function feedback(ok, correctHtml, extra) {
      var foot = main.querySelector('#lr-foot');
      if (ok) { good++; combo++; bestCombo = Math.max(bestCombo, combo); } else { combo = 0; if (!retry) mistakes.push(items[idx]); }
      foot.className = 'lr-foot ' + (ok ? 'ok' : 'bad');
      foot.innerHTML = '<div><b>' + (ok ? ['Szuper!', 'Ügyes!', 'Pontosan!', 'Így van!'][Math.floor(Math.random() * 4)] : 'Nem egészen.') + '</b>' +
        (correctHtml ? '<div>' + (ok ? '' : 'Helyesen: ') + correctHtml + '</div>' : '') + (extra ? '<div class="muted">' + extra + '</div>' : '') + '</div>' +
        '<button type="button" class="btn primary" id="lr-next">Tovább →</button>';
      var nb = foot.querySelector('#lr-next'); nb.focus();
      nb.addEventListener('click', function () { idx++; next(); });
    }
    function checkBtn(fn) {
      var foot = main.querySelector('#lr-foot');
      foot.innerHTML = '<span></span><button type="button" class="btn primary" id="lr-check" disabled>Ellenőrzés</button>';
      var b = foot.querySelector('#lr-check'); b.addEventListener('click', fn); return b;
    }
    function optsHtml(list, label) {
      return '<div class="lr-opts">' + list.map(function (o, i) { return '<button type="button" class="lr-opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd> ' + label(o) + '</button>'; }).join('') + '</div>';
    }
    function bindOpts(onPick) {
      var picked = -1, btn = checkBtn(function () { onPick(picked); });
      main.querySelectorAll('.lr-opt').forEach(function (b) {
        b.addEventListener('click', function () {
          main.querySelectorAll('.lr-opt').forEach(function (x) { x.classList.remove('sel'); });
          b.classList.add('sel'); picked = +b.dataset.i; btn.disabled = false;
        });
      });
    }
    function lock() { main.querySelectorAll('.lr-body button, .lr-body input').forEach(function (b) { b.disabled = true; }); }

    function show(x) {
      if (x.k === 'intro') {
        shell('<p class="lr-kind">✨ Új szó</p><div class="lr-new"><button type="button" class="speak" id="sp">🔊</button><b>' + shown(c, x.w) + '</b><span>= ' + esc(x.w[1]) + '</span></div>' +
          '<p class="lr-q">Mit jelent: <b>' + shown(c, x.w) + '</b>?</p>' + optsHtml(x.opts, function (o) { return esc(o[1]); }));
        main.querySelector('#sp').addEventListener('click', function () { say(c, x.w[0]); }); say(c, x.w[0]);
        bindOpts(function (p) { lock(); feedback(x.opts[p] === x.w, esc(x.w[0]) + ' = ' + esc(x.w[1])); });
      } else if (x.k === 'choose' || x.k === 'choose-rev') {
        var rev = x.k === 'choose-rev';
        shell('<p class="lr-kind">' + (rev ? 'Hogy mondod ' + esc(adv(c)) + '?' : 'Válaszd ki a jelentését!') + '</p>' +
          '<p class="lr-q">' + (rev ? '<b>' + esc(x.w[1]) + '</b>' : '<button type="button" class="speak sm" id="sp">🔊</button> <b>' + shown(c, x.w) + '</b>') + '</p>' +
          optsHtml(x.opts, function (o) { return rev ? shown(c, o) : esc(o[1]); }));
        var spb = main.querySelector('#sp'); if (spb) { spb.addEventListener('click', function () { say(c, x.w[0]); }); say(c, x.w[0]); }
        bindOpts(function (p) { lock(); var ok = x.opts[p] === x.w; if (rev) say(c, x.w[0]); feedback(ok, shown(c, x.w) + ' = ' + esc(x.w[1])); });
      } else if (x.k === 'listen') {
        shell('<p class="lr-kind">🎧 Mit hallasz?</p><p class="lr-q"><button type="button" class="speak big" id="sp">🔊</button> <button type="button" class="speak sm" id="sps" title="Lassan">🐢</button></p>' +
          optsHtml(x.opts, function (o) { return shown(c, o); }));
        main.querySelector('#sp').addEventListener('click', function () { say(c, x.w[0]); });
        main.querySelector('#sps').addEventListener('click', function () { say(c, x.w[0], true); });
        say(c, x.w[0]);
        bindOpts(function (p) { lock(); feedback(x.opts[p] === x.w, shown(c, x.w) + ' = ' + esc(x.w[1])); });
      } else if (x.k === 'type') {
        shell('<p class="lr-kind">✍️ Írd be ' + esc(adv(c)) + '!</p><p class="lr-q"><b>' + esc(x.w[1]) + '</b></p>' +
          '<input type="text" id="lr-in" class="lr-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + (c.script ? 'Írhatod az átírást is (pl. ' + esc(x.w[2] || '') + ')' : 'Ide írd…') + '">');
        var inp = main.querySelector('#lr-in'), btn = checkBtn(function () {
          var answers = [x.w[0]].concat(x.w[2] ? [x.w[2]] : []), r = judge(inp.value, answers);
          lock(); say(c, x.w[0]);
          feedback(r !== 'bad', shown(c, x.w), r === 'accent' ? 'Majdnem tökéletes: figyelj az ékezetekre/különleges betűkre!' : '');
        });
        inp.focus();
        inp.addEventListener('input', function () { btn.disabled = !inp.value.trim(); });
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !btn.disabled) btn.click(); });
      } else if (x.k === 'pairs') {
        var left = S.shuffle(x.list.slice()), right = S.shuffle(x.list.slice()), sel = null, done = 0, miss = 0;
        shell('<p class="lr-kind">🔗 Párosítsd!</p><div class="lr-pairs"><div>' + left.map(function (w, i) { return '<button type="button" class="lr-opt" data-l="' + i + '">' + shown(c, w) + '</button>'; }).join('') + '</div><div>' +
          right.map(function (w, i) { return '<button type="button" class="lr-opt" data-r="' + i + '">' + esc(w[1]) + '</button>'; }).join('') + '</div></div>');
        main.querySelector('#lr-foot').innerHTML = '<span class="muted">Koppints egy szóra, majd a jelentésére.</span><span></span>';
        main.querySelectorAll('.lr-pairs .lr-opt').forEach(function (b) {
          b.addEventListener('click', function () {
            if (b.classList.contains('matched')) return;
            var isL = b.hasAttribute('data-l'), w = isL ? left[+b.dataset.l] : right[+b.dataset.r];
            if (isL) say(c, w[0]);
            if (!sel || sel.isL === isL) { main.querySelectorAll('.lr-pairs .sel').forEach(function (z) { z.classList.remove('sel'); }); b.classList.add('sel'); sel = { b: b, w: w, isL: isL }; return; }
            if (sel.w === w) { sel.b.classList.add('matched'); b.classList.add('matched'); sel.b.classList.remove('sel'); done++; }
            else { miss++; b.classList.add('wrong'); var sb = sel.b; setTimeout(function () { b.classList.remove('wrong'); sb.classList.remove('sel'); }, 450); }
            sel = null;
            if (done === x.list.length) feedback(miss <= 1, '', miss ? miss + ' téves párosítás.' : 'Hibátlan párosítás!');
          });
        });
      } else {
        var isRev = x.k === 'build-rev', listen = x.k === 'listen-build', chosen = [];
        shell('<p class="lr-kind">' + (listen ? '🎧 Rakd össze, amit hallasz!' : isRev ? 'Fordítsd le magyarra!' : 'Fordítsd le ' + esc(adv(c)) + '!') + '</p>' +
          '<p class="lr-q">' + (listen ? '<button type="button" class="speak big" id="sp">🔊</button> <button type="button" class="speak sm" id="sps">🐢</button>'
            : isRev ? '<button type="button" class="speak sm" id="sp">🔊</button> <b>' + esc(x.s[0]) + '</b>' : '<b>' + esc(x.s[1]) + '</b>') + '</p>' +
          '<div class="lr-answer" id="lr-ans"></div><div class="lr-bank" id="lr-bank">' + x.bank.map(function (t, i) { return '<button type="button" class="tok" data-t="' + i + '">' + esc(t) + '</button>'; }).join('') + '</div>');
        var sp2 = main.querySelector('#sp'); if (sp2) sp2.addEventListener('click', function () { say(c, x.s[0]); });
        var sps2 = main.querySelector('#sps'); if (sps2) sps2.addEventListener('click', function () { say(c, x.s[0], true); });
        if (listen || isRev) say(c, x.s[0]);
        var ans = main.querySelector('#lr-ans'), bank = main.querySelector('#lr-bank');
        var cb = checkBtn(function () {
          lock();
          var got = chosen.map(function (i) { return x.bank[i]; });
          var target = isRev ? x.s[1] : x.s[0];
          var alts = isRev ? [x.s[1]].concat(x.s[3] || []) : [x.s[0]].concat(x.s[2] || []);
          var ok = judge(joinT(isRev ? { noSpaces: false } : c, got), alts) === 'ok' || strip(got.join(' ')) === strip(x.answer.join(' '));
          if (!isRev) say(c, x.s[0]);
          feedback(ok, esc(target), isRev ? esc(x.s[0]) : esc(x.s[1]));
        });
        function paintB() {
          ans.innerHTML = chosen.map(function (i, k) { return '<button type="button" class="tok" data-k="' + k + '">' + esc(x.bank[i]) + '</button>'; }).join('');
          bank.querySelectorAll('.tok').forEach(function (b) { b.classList.toggle('used', chosen.indexOf(+b.dataset.t) >= 0); });
          cb.disabled = !chosen.length;
          ans.querySelectorAll('.tok').forEach(function (b) { b.addEventListener('click', function () { chosen.splice(+b.dataset.k, 1); paintB(); }); });
        }
        bank.querySelectorAll('.tok').forEach(function (b) {
          b.addEventListener('click', function () { var t = +b.dataset.t; if (chosen.indexOf(t) >= 0) return; chosen.push(t); paintB(); });
        });
        paintB();
      }
    }

    function finish() {
      var total = idx, acc = total ? Math.round(good / total * 100) : 0;
      var xp = 10 + (acc >= 90 ? 5 : 0) + (bestCombo >= 8 ? 3 : 0);
      var p = prog(c); p.xp = (p.xp || 0) + xp;
      var before = p.units[u.id] || 0;
      if (level >= before && before < MAXLV) p.units[u.id] = before + 1;
      saveProg(c, p);
      var dd = daily(); dd[today()] = (dd[today()] || 0) + xp; S.store.set('nyelv.napi', dd);
      if (S.logActivity) S.logActivity('lang', c.id);
      var st = streak(), g = goal(), dx = dd[today()];
      main.innerHTML = '<div class="lesson-run lr-done"><div class="lr-body" style="text-align:center">' +
        '<div class="big-emoji">' + (acc >= 90 ? '🏆' : acc >= 70 ? '🎉' : '💪') + '</div><h1>Kör teljesítve!</h1>' +
        '<div class="lr-score"><div><b>+' + xp + '</b><small>XP</small></div><div><b>' + acc + '%</b><small>pontosság</small></div><div><b>🔥 ' + st + '</b><small>nap sorozat</small></div></div>' +
        (p.units[u.id] > before ? '<p>👑 Új szint: <b>' + esc(u.title) + '</b> ' + p.units[u.id] + ' / ' + MAXLV + '</p>' : '') +
        '<p class="muted">' + (dx >= g ? '🎯 Megvan a mai cél (' + dx + ' / ' + g + ' XP)! Holnap is gyere!' : 'Mai cél: ' + dx + ' / ' + g + ' XP – még ' + (g - dx) + ' XP.') + '</p>' +
        '<div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap"><a class="btn primary" href="#/nyelv/' + c.id + '">Tovább az ösvényen →</a>' +
        '<button type="button" class="btn" id="again">🔁 Még egy kör</button></div></div></div>';
      main.querySelector('#again').addEventListener('click', function () { runRound(main, c, ui, Math.min(p.units[u.id] || 0, MAXLV - 1)); });
    }
    next();
  }

  /* billentyűk: 1–4 a válaszokhoz, Enter = ellenőrzés / tovább */
  if (typeof document !== 'undefined') document.addEventListener('keydown', function (e) {
    if (!document.querySelector('.lesson-run') || /INPUT|TEXTAREA/.test((e.target || {}).tagName)) return;
    if (/^[1-6]$/.test(e.key)) { var o = document.querySelectorAll('.lr-opts .lr-opt')[+e.key - 1]; if (o && !o.disabled) o.click(); }
    if (e.key === 'Enter') { var b = document.querySelector('#lr-next') || document.querySelector('#lr-check:not([disabled])'); if (b) { e.preventDefault(); b.click(); } }
  });
})();
