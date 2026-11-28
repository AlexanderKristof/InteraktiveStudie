/* Tudásműhely (MiTudi) – 🌐 Online párbajszobák.
 * Valódi többjátékos kvíz távoli barátokkal: a gazda szobát nyit, a többiek linkkel / kóddal / QR-kóddal lépnek be,
 * mindenki a saját eszközén válaszol, a ranglista élőben frissül (Supabase: Postgres + Realtime).
 *
 * Útvonalak: #/szoba (hub: létrehozás, belépés kóddal, Szobáim)  ·  #/szoba/KOD (lobbi → játék → eredmény)
 *
 * Működés röviden:
 *  - A supabase-js (js/vendor/supabase.js) csak itt, lustán töltődik be (script beszúrással). file:// és offline
 *    állapotban barátságos üzenet jelenik meg – az egyfájlos változat nem ágyazza be.
 *  - Névtelen bejelentkezés (anonymous sign-in) az első létrehozáskor / belépéskor; a munkamenet a böngészőben marad.
 *  - A kérdéseket a gazda választja ki a tesztközpont kérdésbankjából, és a szöveggel, a már összekevert opciókkal és
 *    a helyes válasz indexével együtt a rooms.questions mezőbe menti → mindenki ugyanazt látja ugyanabban a sorrendben.
 *  - Kétlépcsős válasz: kattintás = kijelölés, „✔ Véglegesítem” = beküldés (billentyű: 1–4 / A–D, Enter).
 *  - Időzítés: gondolkodási idő (rooms.seconds), és ha valaki már véglegesített, a többieknek legfeljebb
 *    rooms.after_first mp marad; ha mindenki beküldte, rövid eredményjelzés, majd jön a következő kérdés.
 *    Mindenki ugyanabból az adatból (started_at + players.answers) számolja – nincs külön „következő kérdés” üzenet.
 *  - Pontozás: helyes válasz 500 pont + legfeljebb 250 gyorsasági bónusz (a hátralévő idő arányában, tízesekre kerekítve).
 *  - Az adatbázis-séma: supabase/szobak.sql + supabase/szobak-2.sql.
 *  - Élő frissítés Realtime-mal; ha az kiesik, 3 másodpercenkénti lekérdezés (polling).
 *
 * Ismert korlát: a helyes válasz indexe a kliensnél van (baráti játékhoz elfogadható, versenyhez nem). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var SB_URL = 'https://acrlrhijksveqsuirbxt.supabase.co';
  var SB_KEY = 'sb_publishable_HJ2RCgin6oJ3UaISCRIYNA_Loc9Tlss'; /* nyilvános (publishable) kulcs – a jogosultságot az RLS adja */
  var LIB = 'js/vendor/supabase.js', HOME = 'https://mitudi.hu/';
  var ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; /* nincs 0/O és 1/I */
  var REVEAL = 3000, LEAD = 3000, MAXP = 50, POLL = 3000, EXPIRE = 24 * 3600 * 1000;
  var OFFLINE = 'Az online szobákhoz internet kell – nyisd meg a https://mitudi.hu oldalon.';
  var sb = null, libState = 0, libWait = [], uid = null, cleanup = null;
  var skew = +S.store.get('szoba.skew', 0) || 0;

  /* ---------- könyvtár, kapcsolat, idő ---------- */
  function online() { return typeof location !== 'undefined' && /^https?:$/.test(location.protocol) && navigator.onLine !== false; }
  function loadLib(cb) {
    if (sb) { cb(null); return; }
    if (!online()) { cb('offline'); return; }
    libWait.push(cb);
    if (libState === 1) return;
    libState = 1;
    function done(err) { libState = err ? 0 : 2; var w = libWait; libWait = []; w.forEach(function (f) { f(err); }); }
    function make() {
      try {
        sb = window.supabase.createClient(SB_URL, SB_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: 'mitudi-szoba-auth' } });
        done(null);
      } catch (e) { done('offline'); }
    }
    if (window.supabase && window.supabase.createClient) { make(); return; }
    var s = document.createElement('script');
    s.src = LIB; s.async = true;
    s.onload = function () { if (window.supabase && window.supabase.createClient) make(); else done('offline'); };
    s.onerror = function () { if (s.parentNode) s.parentNode.removeChild(s); done('offline'); };
    document.head.appendChild(s);
  }
  function getUid() {
    return sb.auth.getSession().then(function (r) { var s = r && r.data && r.data.session; uid = s ? s.user.id : null; return uid; }, function () { return null; });
  }
  function ensureAuth() {
    return getUid().then(function (id) {
      if (id) return id;
      return sb.auth.signInAnonymously().then(function (x) {
        if (x.error) throw x.error;
        uid = x.data.user.id; return uid;
      });
    });
  }
  function errText(e) {
    var m = String((e && (e.message || e.error_description || e.code)) || e || '');
    if (navigator.onLine === false || /failed to fetch|network|load failed|fetch/i.test(m)) return 'Nem érem el a szervert. Ellenőrizd az internetkapcsolatot, és próbáld újra.';
    if (/anonymous/i.test(m)) return 'A névtelen belépés most nem elérhető a szerveren. Próbáld újra később.';
    if (/rate limit|too many|429/i.test(m)) return 'Túl sok próbálkozás rövid idő alatt – várj egy kicsit, és próbáld újra.';
    if (/row-level security|permission|42501/i.test(m)) return 'Ehhez nincs jogosultságod ebben a szobában.';
    return 'Hiba történt: ' + m;
  }
  function now() { return Date.now() + skew; }
  function setSkew(iso, t0, t1) {
    var s = Date.parse(iso); if (!isFinite(s)) return;
    skew = Math.round(s - (t0 + t1) / 2); S.store.set('szoba.skew', skew);
  }
  /* Ha a supabase/szobak-2.sql le van futtatva, a szerver pontos idejét kérdezzük le; különben a beszúrt sorok
   * created_at / joined_at mezőjéből (vagy a korábban eltárolt eltérésből) dolgozunk. */
  function syncClock() {
    var t0 = Date.now();
    return sb.rpc('mitudi_now').then(function (r) { if (r && !r.error && r.data) setSkew(r.data, t0, Date.now()); }, function () {});
  }

  /* ---------- segédek ---------- */
  function rnd(n) {
    if (window.crypto && crypto.getRandomValues) { var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
    return Math.floor(Math.random() * n);
  }
  function genCode() { var c = ''; for (var i = 0; i < 5; i++) c += ALPHA.charAt(rnd(ALPHA.length)); return c; }
  var BAD_EXACT = ['szar', 'szaros', 'szarhazi', 'buzi', 'pina', 'segg', 'seggfej', 'anyad', 'kurva', 'picsa', 'geci', 'fasz', 'cock', 'dick', 'cunt', 'twat', 'prick', 'slut', 'whore', 'retard', 'fag', 'faggot'];
  var BAD_PREFIX = ['fasz', 'geci', 'kurv', 'picsa', 'basz', 'bazdm', 'kocsog', 'ribanc', 'fuck', 'shit', 'bitch', 'nigg', 'asshole', 'motherf', 'buzik', 'pinas'];
  function cleanNick(s) {
    s = String(s || '').replace(/[\u0000-\u001f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 20);
    return s.replace(/[^\s.,_\-!?]+/g, function (w) {
      var n = S.norm(w).replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4|@/g, 'a').replace(/\$/g, 's').replace(/[^a-z]/g, '');
      var bad = n && (BAD_EXACT.indexOf(n) >= 0 || BAD_PREFIX.some(function (p) { return n.indexOf(p) === 0; }));
      return bad ? w.charAt(0) + new Array(w.length).join('*') : w;
    });
  }
  function baseUrl() {
    var h = location.hostname;
    if (/^https?:$/.test(location.protocol) && h && h !== 'localhost' && h !== '127.0.0.1' && !/^(192\.168|10)\./.test(h)) return location.origin + location.pathname;
    return HOME;
  }
  function inviteUrl(code) { return baseUrl() + '#/szoba/' + code; }
  function copyText(text, inp, btn) {
    function ok() { if (btn) { btn.textContent = '✓ Másolva'; setTimeout(function () { btn.textContent = '🔗 Meghívó link másolása'; }, 1800); } }
    function legacy() { if (inp) { inp.select(); try { document.execCommand('copy'); } catch (e) { /* nincs vágólap */ } } ok(); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, legacy); else legacy();
  }
  function remember(code, title, host) {
    var l = S.store.get('szoba.lista', []).filter(function (x) { return x && x.c !== code; });
    l.unshift({ c: code, t: String(title || '').slice(0, 80), h: host ? 1 : 0, d: Date.now() });
    S.store.set('szoba.lista', l.slice(0, 20));
  }
  function topicKey(r) { var t = (r && r.topic) || ''; var i = t.indexOf('|'); return i >= 0 ? t.slice(0, i) : ''; }
  function topicLabel(r) { var t = (r && r.topic) || ''; var i = t.indexOf('|'); return i >= 0 ? t.slice(i + 1) : (t || '🎲 Vegyes'); }
  function crumbs(last) {
    return '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span>' + (last ? '<a href="#/szoba">Online párbajszoba</a><span>›</span><span>' + esc(last) + '</span>' : '<span>Online párbajszoba</span>') + '</nav>';
  }
  function offlineCard() {
    return '<div class="card pad szb-warn"><p><b>📡 ' + esc(OFFLINE) + '</b></p><p class="muted">Internet nélkül is játszhatsz: a <a href="#/parbaj">⚔️ Párbaj</a> egy eszközön, két játékossal működik.</p>' +
      '<p><a class="btn primary" href="' + HOME + '#/szoba">🌐 mitudi.hu megnyitása</a></p></div>';
  }

  /* ---------- kérdések a tesztközpont bankjából ---------- */
  function validQ(q) { return q && typeof q.q === 'string' && Array.isArray(q.options) && q.options.length >= 2 && q.options.length <= 6 && typeof q.answer === 'number' && q.options[q.answer] != null; }
  function parseKey(key) {
    if (key.indexOf('g:') === 0) return { g: key.slice(2), t: '' };
    if (key.indexOf('t:') === 0) { var p = key.slice(2).split('/'); return { g: p[0], t: p.slice(1).join('/') }; }
    return { g: '', t: '' };
  }
  function poolFor(key) {
    var k = parseKey(key || ''), out = [];
    S.testGroups().forEach(function (g) {
      if (k.g && g.id !== k.g) return;
      g.topics.forEach(function (t) {
        if (k.t && t.id !== k.t) return;
        t.questions.forEach(function (q) { if (validQ(q)) out.push({ q: q, g: g, t: t }); });
      });
    });
    return out;
  }
  function makeQuestions(key, n) {
    return S.shuffle(poolFor(key)).slice(0, n).map(function (it) {
      var order = S.shuffle(it.q.options.map(function (o, i) { return i; }));
      return { q: it.q.q, o: order.map(function (i) { return String(it.q.options[i]); }), a: order.indexOf(it.q.answer),
        x: String(it.q.explain || '').slice(0, 600), s: (it.g.icon ? it.g.icon + ' ' : '') + it.t.title };
    });
  }
  function labelFor(key) {
    var k = parseKey(key || ''); if (!k.g) return '🎲 Vegyes – az egész tananyagból';
    var g = S.testGroups().filter(function (x) { return x.id === k.g; })[0]; if (!g) return '🎲 Vegyes';
    var t = k.t && g.topics.filter(function (x) { return x.id === k.t; })[0];
    return (g.icon ? g.icon + ' ' : '') + g.title + (t ? ' – ' + t.title : '');
  }
  function topicSelect(cur) {
    return '<select id="szb-topic"><option value="">🎲 Vegyes – az egész tananyagból</option>' + S.testGroups().map(function (g) {
      var gl = (g.icon ? g.icon + ' ' : '') + g.title;
      return '<optgroup label="' + esc(gl + (g.kind ? ' · ' + g.kind : '')) + '"><option value="g:' + esc(g.id) + '"' + ('g:' + g.id === cur ? ' selected' : '') + '>' + esc(gl) + ' – minden téma</option>' +
        g.topics.map(function (t) { var v = 't:' + g.id + '/' + t.id; return '<option value="' + esc(v) + '"' + (v === cur ? ' selected' : '') + '>' + esc(g.title + ' – ' + t.title) + '</option>'; }).join('') + '</optgroup>';
    }).join('') + '</select>';
  }

  /* ---------- szoba létrehozása, belépés ---------- */
  var SQLMSG = 'Az online szobák adatbázisa frissítésre vár (supabase/szobak-2.sql) – kérjük, próbáld újra később.';
  function needsSql(e) { return e && (e.code === 'PGRST204' || e.code === '42703' || /after_first|answers|schema cache/i.test(e.message || '')); }
  function createRoom(cfg) {
    var qs = makeQuestions(cfg.k, cfg.n);
    if (qs.length < 3) return Promise.reject({ message: 'Ehhez a témához túl kevés a kérdés – válassz bővebb témát.' });
    var topic = (cfg.k + '|' + labelFor(cfg.k)).slice(0, 200), title = (cfg.nick + ' szobája').slice(0, 80);
    function attempt(n) {
      var code = genCode(), t0 = Date.now();
      return sb.from('rooms').insert({ code: code, title: title, topic: topic, questions: qs, seconds: cfg.s, after_first: cfg.x }).select('code,created_at').single().then(function (r) {
        if (r.error) { if (r.error.code === '23505' && n < 6) return attempt(n + 1); throw needsSql(r.error) ? { message: SQLMSG } : r.error; }
        setSkew(r.data.created_at, t0, Date.now());
        remember(code, topicLabel({ topic: topic }), true);
        return joinRoom(code, cfg.nick).then(function () { return code; });
      });
    }
    return ensureAuth().then(function () { return attempt(0); });
  }
  function joinRoom(code, nick) {
    return ensureAuth().then(function (me) {
      var t0 = Date.now();
      return sb.from('players').insert({ room_code: code, nick: nick }).select().single().then(function (r) {
        if (!r.error) { setSkew(r.data.joined_at, t0, Date.now()); return r.data; }
        if (r.error.code !== '23505') throw r.error;
        return sb.from('players').select('*').eq('room_code', code).eq('user_id', me).maybeSingle().then(function (x) { if (x.error) throw x.error; return x.data; });
      });
    });
  }

  /* ---------- hub ---------- */
  function hub(main) {
    var st = S.store.get('szoba.beall2', { k: '', n: 10, s: 60, x: 20 }), nick = S.store.get('szoba.nick', '');
    var list = S.store.get('szoba.lista', []);
    main.innerHTML = crumbs() + '<h1>🌐 Online párbajszoba</h1><p class="lead">Hívd meg a barátaidat linkkel vagy kóddal, és versenyezzetek élőben – mindenki a saját telefonján vagy gépén.</p>' +
      (online() ? '<div class="szb-hub">' +
        '<div class="card pad szb-new"><h2>➕ Szoba létrehozása</h2>' +
          '<label class="szb-f"><span>Beceneved</span><input id="szb-nick" maxlength="20" autocomplete="nickname" placeholder="pl. Villám" value="' + esc(nick) + '"></label>' +
          '<label class="szb-f"><span>Téma</span>' + topicSelect(st.k) + '</label>' +
          '<div class="szb-two"><label class="szb-f"><span>Kérdések száma</span><select id="szb-n">' + [5, 10, 15, 20].map(function (n) { return '<option' + (n === st.n ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
          '<label class="szb-f"><span>Gondolkodási idő</span><select id="szb-s">' + [15, 30, 45, 60, 90, 120].map(function (n) { return '<option value="' + n + '"' + (n === st.s ? ' selected' : '') + '>' + n + ' mp / kérdés</option>'; }).join('') + '</select></label></div>' +
          '<label class="szb-f"><span>Ha valaki már válaszolt, a többieknek marad</span><select id="szb-x">' + [5, 10, 20, 30, 0].map(function (n) { return '<option value="' + n + '"' + (n === st.x ? ' selected' : '') + '>' + (n ? 'legfeljebb ' + n + ' mp' : 'ki – mindenki a teljes időt kapja') + '</option>'; }).join('') + '</select></label>' +
          '<p><button type="button" class="btn primary" id="szb-create">🌐 Szoba létrehozása</button></p><p class="szb-msg" id="szb-cmsg" role="alert"></p></div>' +
        '<div class="card pad szb-join"><h2>🔑 Belépés kóddal</h2><p class="muted">Kaptál egy 5 jegyű kódot? Írd be ide.</p>' +
          '<label class="szb-f"><span>Szobakód</span><input id="szb-code" class="szb-codein" maxlength="8" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="K7MPX"></label>' +
          '<p><button type="button" class="btn primary" id="szb-go">▶ Belépés</button></p><p class="szb-msg" id="szb-jmsg" role="alert"></p></div>' +
        '</div>' : offlineCard()) +
      '<p class="muted szb-privacy">🔒 Csak a becenevedet és a pontszámodat tároljuk, a szobakóddal bárki megnézheti a szobát. Ne add meg a valódi teljes nevedet.</p>' +
      '<div class="card pad szb-mine"><h2>🗂 Szobáim</h2>' + (list.length ? '<ul class="szb-list">' + list.map(function (x) {
        return '<li><a href="#/szoba/' + esc(x.c) + '"><b class="szb-mono">' + esc(x.c) + '</b> <span>' + esc(x.t || '') + '</span></a> <small class="muted">' + (x.h ? '👑 gazda · ' : '') + new Date(x.d).toLocaleDateString('hu-HU') + '</small> <i class="szb-st" data-c="' + esc(x.c) + '"></i></li>';
      }).join('') + '</ul>' : '<p class="muted">Még nincs szobád. Hozz létre egyet, vagy lépj be egy kóddal!</p>') + '</div>' +
      '<p class="muted">Egy eszközön, internet nélkül: <a href="#/parbaj">⚔️ Párbaj</a>.</p>';
    if (!online()) return;
    S.searchableSelect(main.querySelector('#szb-topic'), '🔎 Keresd a tantárgyat vagy a témát (pl. tört, Ohm, IFRS)…');
    var code = main.querySelector('#szb-code');
    code.addEventListener('input', function () { var p = code.selectionStart; code.value = code.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); try { code.setSelectionRange(p, p); } catch (e) { /* nem baj */ } });
    function goCode() {
      var c = code.value.trim().toUpperCase(), m = main.querySelector('#szb-jmsg');
      if (!/^[A-Z0-9]{4,8}$/.test(c)) { m.textContent = 'A szobakód 4–8 betű vagy szám (pl. K7MPX).'; code.focus(); return; }
      location.hash = '#/szoba/' + c;
    }
    main.querySelector('#szb-go').addEventListener('click', goCode);
    code.addEventListener('keydown', function (e) { if (e.key === 'Enter') goCode(); });
    main.querySelector('#szb-create').addEventListener('click', function () {
      var btn = this, m = main.querySelector('#szb-cmsg'), ni = main.querySelector('#szb-nick'), nk = cleanNick(ni.value);
      if (!nk) { m.textContent = 'Adj meg egy becenevet (legfeljebb 20 karakter).'; ni.focus(); return; }
      ni.value = nk; S.store.set('szoba.nick', nk);
      var cfg = { k: main.querySelector('#szb-topic').value, n: +main.querySelector('#szb-n').value, s: +main.querySelector('#szb-s').value, x: +main.querySelector('#szb-x').value, nick: nk };
      S.store.set('szoba.beall2', { k: cfg.k, n: cfg.n, s: cfg.s, x: cfg.x });
      btn.disabled = true; m.textContent = '⏳ Szoba létrehozása…';
      loadLib(function (err) {
        if (err) { btn.disabled = false; m.textContent = OFFLINE; return; }
        createRoom(cfg).then(function (c) { location.hash = '#/szoba/' + c; }, function (e) { btn.disabled = false; m.textContent = errText(e); });
      });
    });
    /* a Szobáim lista állapotai egyetlen lekérdezéssel */
    if (list.length) loadLib(function (err) {
      if (err) return;
      sb.from('rooms').select('code,status').in('code', list.map(function (x) { return x.c; })).then(function (r) {
        if (r.error || !r.data) return;
        var by = {}; r.data.forEach(function (x) { by[x.code] = x.status; });
        main.querySelectorAll('.szb-st').forEach(function (el) {
          var s = by[el.dataset.c]; el.textContent = s === 'lobby' ? '⏳ várakozik' : s === 'running' ? '▶ folyik' : s === 'finished' ? '🏁 vége' : '✕ nem található';
          el.className = 'szb-st szb-st-' + (s || 'none');
        });
      });
    });
  }

  /* ---------- egy szoba ---------- */
  function roomPage(main, code) {
    main.innerHTML = crumbs(code) + '<div id="szb-room"><div class="lazy-wait" role="status"><span class="spin"></span> Szoba betöltése…</div></div>';
    var box = main.querySelector('#szb-room');
    loadLib(function (err) {
      if (err) { box.innerHTML = offlineCard(); return; }
      Room(main, box, code);
    });
  }

  /* Időzítés (mindenki ugyanabból az adatból, determinisztikusan számolja):
   *   start(0) = started_at
   *   határidő(q) = min(start(q) + T, első_beküldés(q) + X)        T = rooms.seconds, X = rooms.after_first (0 = ki)
   *   vége(q) = utolsó érvényes beküldés, ha mindenki beküldött; különben határidő(q) + GRACE
   *   start(q+1) = vége(q) + REVEAL (eredményjelzés)
   * A beküldések a players.answers tömbben vannak ({q, k, t}); a „t”-t a szerver órája adja (szobak-2.sql trigger). */
  var GRACE = 1000;
  function pts(ok, t, s, T) { return ok ? 500 + Math.round(25 * Math.max(0, Math.min(1, (s + T - t) / T))) * 10 : 0; } /* 500 + max. 250 gyorsasági bónusz */
  function fmtPts(n) { return String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0'); } /* 7 250 – ezres tagolás már 4 jegytől */

  function Room(main, box, code) {
    var room = null, players = [], mine = null, ch = null, rtOk = false, timer = null, lastPoll = 0, lastKey = '', lastBoard = '';
    var myAns = S.store.get('szoba.a.' + code, []), dirty = 0, pushing = false, retryAt = 0, finishing = false, logged = false, dead = false;
    var sel = null, selQ = -1, TL = null;
    function fail(msg, retry) {
      box.innerHTML = '<div class="card pad szb-warn"><p><b>' + esc(msg) + '</b></p><p class="row" style="gap:8px;flex-wrap:wrap">' + (retry ? '<button type="button" class="btn primary" id="szb-retry">🔄 Újra</button>' : '') + '<a class="btn" href="#/szoba">🌐 Szobák</a></p></div>';
      var b = box.querySelector('#szb-retry'); if (b) b.addEventListener('click', function () { box.innerHTML = '<div class="lazy-wait"><span class="spin"></span> Újrapróbálás…</div>'; start(); });
    }
    function fetchRoom() { return sb.from('rooms').select('*').eq('code', code).maybeSingle(); }
    function fetchPlayers() { return sb.from('players').select('*').eq('room_code', code).order('joined_at', { ascending: true }); }
    function setPlayers(list) {
      players = list || [];
      mine = uid ? players.filter(function (p) { return p.user_id === uid; })[0] || null : null;
      /* a szerver által már időbélyegzett saját beküldések az irányadók; a még el nem küldötteket megtartjuk */
      if (mine && Array.isArray(mine.answers) && mine.answers.length >= myAns.length) { myAns = mine.answers.slice(); S.store.set('szoba.a.' + code, myAns); }
    }
    function merge(row) {
      if (!row || row.room_code !== code) return;
      var i = -1; players.forEach(function (p, k) { if (p.id === row.id) i = k; });
      if (i >= 0) players[i] = row; else players.push(row);
      setPlayers(players);
    }
    function start() {
      Promise.all([getUid(), fetchRoom(), fetchPlayers()]).then(function (r) {
        if (dead) return;
        if (r[1].error) throw r[1].error;
        if (!r[1].data) { fail('Nincs ilyen szoba: ' + code + '. Ellenőrizd a kódot (a 0 és az O, az 1 és az I nem fordul elő benne).', false); return; }
        room = r[1].data; setPlayers(r[2].data || []);
        if (mine) remember(code, topicLabel(room), room.host_id === uid);
        syncClock();
        subscribe(); tick();
        timer = setInterval(tick, 250);
      }).catch(function (e) { if (!dead) fail(errText(e), true); });
    }
    function subscribe() {
      ch = sb.channel('szoba-' + code + '-' + rnd(1e6))
        .on('postgres_changes', { event: '*', schema: 'public', table: 'players', filter: 'room_code=eq.' + code }, function (p) { if (p.new && p.new.id) merge(p.new); tick(); })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: 'code=eq.' + code }, function (p) { if (p.new && p.new.code === code) { if (!p.new.questions) p.new.questions = room.questions; room = p.new; } tick(); })
        .subscribe(function (status) {
          var was = rtOk; rtOk = status === 'SUBSCRIBED';
          if (rtOk && !was) poll(); /* ami a feliratkozás előtt történt, azt is lássuk */
          paintLive();
        });
    }
    function poll() {
      lastPoll = Date.now();
      Promise.all([fetchRoom(), fetchPlayers()]).then(function (r) {
        if (dead) return;
        if (!r[0].error && r[0].data) room = r[0].data;
        if (!r[1].error && r[1].data) setPlayers(r[1].data);
        tick();
      }, function () { /* a következő körben újra */ });
    }
    function destroy() {
      dead = true; clearInterval(timer);
      if (ch) { try { sb.removeChannel(ch); } catch (e) { /* már zárva */ } ch = null; }
      window.removeEventListener('hashchange', onHash); document.removeEventListener('visibilitychange', onVis); document.removeEventListener('keydown', onKey);
    }
    function onHash() { if (location.hash.replace(/\?.*$/, '').toUpperCase() !== ('#/SZOBA/' + code)) destroy(); }
    function onVis() { if (!document.hidden && room) poll(); }
    window.addEventListener('hashchange', onHash); document.addEventListener('visibilitychange', onVis); document.addEventListener('keydown', onKey);
    cleanup = destroy;

    /* --- állapot --- */
    function qs() { return Array.isArray(room.questions) ? room.questions : []; }
    function t0() { return room.started_at ? Date.parse(room.started_at) : 0; }
    function isHost() { return !!uid && room.host_id === uid; }
    /* a szobak-2.sql előtti szoba: nincs after_first, vagy lezárult úgy, hogy a pontok még nem a beküldésekből jöttek */
    function legacy() { return !('after_first' in room) || (room.status === 'finished' && players.some(function (p) { return p.score > 0 && !(Array.isArray(p.answers) && p.answers.length); })); }
    function ansOf(p) { return p === mine ? myAns : (Array.isArray(p.answers) ? p.answers : []); }
    function subOf(p, q) { var a = ansOf(p); for (var i = 0; i < a.length; i++) if (a[i] && a[i].q === q) return a[i]; return null; }
    /* A teljes idővonal a mostani pillanatig + pontok a lezárt kérdésekből. */
    function timeline() {
      var Q = qs(), n = Q.length, s = t0(), T = room.seconds * 1000, X = (room.after_first || 0) * 1000, tn = now();
      var tot = {}; players.forEach(function (p) { tot[p.id] = { score: 0, correct: 0, answered: 0 }; });
      for (var q = 0; q < n; q++) {
        var elig = players.filter(function (p) { return Date.parse(p.joined_at) <= s || subOf(p, q); });
        var subs = {}, first = Infinity;
        players.forEach(function (p) { var a = subOf(p, q); if (a && +a.t >= s - 3000 && +a.t <= s + T + GRACE) { subs[p.id] = a; if (+a.t < first) first = +a.t; } });
        var dl = s + T; if (X && first < Infinity) dl = Math.min(dl, Math.max(first, s) + X);
        var valid = {}, last = s;
        Object.keys(subs).forEach(function (id) { if (+subs[id].t <= dl + GRACE) { valid[id] = subs[id]; last = Math.max(last, +subs[id].t); } });
        var all = elig.length > 0 && elig.every(function (p) { return valid[p.id]; });
        var end = all ? last : tn >= dl + GRACE ? dl + GRACE : null;
        var info = { q: q, s: s, dl: dl, T: T, valid: valid, elig: elig, end: end, tot: tot, n: n };
        if (end == null) { info.ph = 'q'; return info; }
        Object.keys(valid).forEach(function (id) {
          if (!tot[id]) return; var a = valid[id], ok = +a.k === Q[q].a;
          tot[id].answered++; if (ok) { tot[id].correct++; tot[id].score += pts(true, +a.t, s, T); }
        });
        if (tn < end + REVEAL) { info.ph = 'r'; return info; }
        s = end + REVEAL;
      }
      return { ph: 'done', tot: tot, n: n, endAt: s };
    }
    function scoreOf(p) { var t = TL && TL.tot && TL.tot[p.id]; return legacy() || !t ? { score: p.score, correct: p.correct } : t; }
    function view() {
      TL = null;
      if (legacy()) return { v: room.status === 'finished' ? 'results' : 'legacy' };
      TL = room.status === 'lobby' ? null : timeline();
      if (room.status === 'finished' || (TL && TL.ph === 'done')) { if (!TL) TL = timeline(); return { v: 'results' }; }
      if (!mine) {
        if (players.length >= MAXP) return { v: 'full' };
        if (room.status === 'lobby' && now() - Date.parse(room.created_at) > EXPIRE) return { v: 'expired' };
        return { v: 'join' };
      }
      if (room.status === 'lobby') return { v: 'lobby' };
      if (now() < t0()) return { v: 'count' };
      return { v: 'play', qi: TL.q, ph: TL.ph };
    }
    function push() {
      if (!mine || pushing || !dirty || Date.now() < retryAt) return;
      var ver = dirty, t = (TL && TL.tot && TL.tot[mine.id]) || { score: 0, answered: 0, correct: 0 }; pushing = true;
      sb.from('players').update({ answers: myAns, score: t.score, answered: t.answered, correct: t.correct, finished: !!(TL && TL.ph === 'done') || room.status === 'finished' || !!subOf(mine, qs().length - 1) })
        .eq('id', mine.id).select().maybeSingle().then(function (r) {
          pushing = false;
          if (r.error) { retryAt = Date.now() + POLL; return; }
          if (dirty === ver) dirty = 0;
          if (r.data) merge(r.data);
          tick();
        }, function () { pushing = false; retryAt = Date.now() + POLL; });
    }

    /* --- a fő ciklus --- */
    function tick() {
      if (dead || !room) return;
      if (!document.body.contains(box)) { destroy(); return; }
      if (!rtOk && Date.now() - lastPoll >= POLL) poll();
      else if (rtOk && Date.now() - lastPoll >= 15000) poll(); /* biztonsági frissítés, ha egy esemény elveszne */
      var v = view();
      /* a saját sor összesítője (a hub és a régi kliensek kedvéért) – csak ha változott */
      if (mine && TL && TL.tot && TL.tot[mine.id] && !legacy()) {
        var t = TL.tot[mine.id], fin = v.v === 'results';
        if ((t.score !== mine.score || t.correct !== mine.correct || t.answered !== mine.answered || (fin && !mine.finished)) && !dirty && !pushing) dirty = 1;
      }
      push();
      if (isHost() && room.status === 'running' && !finishing && TL && TL.ph === 'done') {
        finishing = true;
        sb.from('rooms').update({ status: 'finished' }).eq('code', code).eq('status', 'running').then(function (r) { if (r.error) finishing = false; }, function () { finishing = false; });
      }
      var key = v.v + ':' + (v.qi == null ? '' : v.qi) + ':' + (v.ph || '') + ':' + (v.qi != null && subOf(mine, v.qi) ? 1 : 0) + ':' + room.status + ':' + (room.next_code || '');
      if (key !== lastKey) { lastKey = key; lastBoard = ''; paint(v); }
      paintBoard(v); paintTimer(v);
    }
    function paintLive() {
      var el = box.querySelector('.szb-live'); if (!el) return;
      el.textContent = rtOk ? '🟢 Élő kapcsolat' : '🟠 Lekérdezéses mód (3 mp-enként)';
      el.className = 'szb-live' + (rtOk ? '' : ' off');
    }
    function settings() { return room.seconds + ' mp gondolkodás' + (room.after_first ? ' · ' + room.after_first + ' mp, ha valaki már válaszolt' : ''); }
    function head(sub) {
      return '<div class="szb-head"><div><h1>' + esc(room.title || 'Párbajszoba') + '</h1><p class="muted">' + esc(topicLabel(room)) + ' · ' + qs().length + ' kérdés · ' + esc(settings()) + (sub ? ' · ' + sub : '') + '</p></div>' +
        '<div class="szb-headr"><span class="szb-mono szb-chip">' + esc(code) + '</span><span class="szb-live"></span></div></div>';
    }
    function sorted() {
      return players.slice().sort(function (a, b) { var x = scoreOf(a), y = scoreOf(b); return y.score - x.score || y.correct - x.correct || Date.parse(a.joined_at) - Date.parse(b.joined_at); });
    }
    function paintBoard(v) {
      var el = box.querySelector('#szb-board'); if (!el) return;
      var n = qs().length, html;
      if (room.status === 'lobby') html = players.map(function (p) { return '<li class="szb-pl' + (p === mine ? ' me' : '') + '">' + (p.user_id === room.host_id ? '👑 ' : '🙂 ') + esc(p.nick) + '</li>'; }).join('');
      else html = sorted().map(function (p, i) {
        var st = '';
        if (v && v.v === 'play' && TL && TL.ph) {
          var done = !!TL.valid[p.id], el2 = TL.elig.indexOf(p) >= 0;
          st = TL.ph === 'q' ? (done ? '<span class="szb-ps ok" title="Beküldte a válaszát">✅ választott</span>' : el2 || p === mine ? '<span class="szb-ps" title="Még gondolkodik">⏳ gondolkodik</span>' : '') : '';
        }
        var sc = scoreOf(p);
        return '<li class="' + (p === mine ? 'me' : '') + '"><span class="szb-rk">' + (i + 1) + '.</span><span class="szb-nm">' + esc(p.nick) + st + '</span><span class="szb-pt">' + fmtPts(sc.score) + '</span><small class="muted">' + sc.correct + '/' + n + '</small></li>';
      }).join('');
      if (!players.length) html = '<li class="muted">Még senki sincs itt.</li>';
      if (html !== lastBoard) { lastBoard = html; el.innerHTML = html; }
      var cnt = box.querySelector('#szb-cnt'); if (cnt) cnt.textContent = players.length;
      var sb2 = box.querySelector('#szb-start'); if (sb2 && !sb2.dataset.busy) sb2.disabled = players.length < 1;
    }
    function paintTimer(v) {
      if (v.v === 'count') { var c = box.querySelector('#szb-cd'); if (c) c.textContent = Math.max(1, Math.ceil((t0() - now()) / 1000)); return; }
      if (v.v !== 'play' || !TL) return;
      var l = box.querySelector('#szb-left'), f = box.querySelector('#szb-barfill'), hint = box.querySelector('#szb-hurry');
      if (TL.ph === 'q') {
        var left = Math.max(0, TL.dl - now()), short = TL.dl < TL.s + TL.T;
        if (l) { l.textContent = '⏱ ' + Math.ceil(left / 1000) + ' mp'; l.classList.toggle('hurry', short || left < 5000); }
        if (f) { f.style.width = Math.max(0, Math.min(100, left / TL.T * 100)) + '%'; f.classList.toggle('hurry', short); }
        if (hint) hint.hidden = !short || !!subOf(mine, TL.q);
      } else {
        var last = TL.q >= TL.n - 1, nx = Math.max(0, TL.end + REVEAL - now());
        if (l) { l.textContent = last ? '🏁 Mindjárt vége' : '⏭ ' + Math.ceil(nx / 1000) + ' mp'; l.classList.remove('hurry'); }
        if (f) f.style.width = '0%';
      }
    }

    /* --- nézetek --- */
    function paint(v) {
      if (v.v === 'legacy') { box.innerHTML = head('') + '<div class="card pad szb-warn"><p><b>Ez a szoba a játék egy korábbi változatával készült, ezért nem folytatható.</b> Hozz létre egy újat!</p><p><a class="btn primary" href="#/szoba">🌐 Új szoba</a></p></div>'; return paintLive(); }
      if (v.v === 'join' || v.v === 'full' || v.v === 'expired') return paintJoin(v.v);
      if (v.v === 'lobby') return paintLobby();
      if (v.v === 'count') {
        box.innerHTML = head('indul') + '<div class="szb-play"><div class="card pad szb-count"><p>Kezdünk!</p><div id="szb-cd" class="szb-big">3</div><p class="muted">Kattints a válaszra, majd nyomd meg a „✔ Véglegesítem” gombot. Billentyűvel: 1–4 vagy A–D, majd Enter.</p></div>' + side() + '</div>';
        return paintLive();
      }
      if (v.v === 'play') return paintPlay(v);
      return paintResults();
    }
    function side() { return '<aside class="card pad szb-side"><h2>🏆 Élő ranglista</h2><ol id="szb-board" class="szb-board"></ol></aside>'; }
    function paintJoin(kind) {
      var nk = S.store.get('szoba.nick', '');
      var msg = kind === 'full' ? '<p class="szb-msg">🚫 Ez a szoba betelt (legfeljebb ' + MAXP + ' játékos). Kérj új kódot a gazdától, vagy nézd a ranglistát.</p>'
        : kind === 'expired' ? '<p class="szb-msg">⌛ Ez a szoba lejárt: több mint egy napja nyitották, és nem indult el. Hozz létre egy újat!</p>' : '';
      box.innerHTML = head(room.status === 'running' ? '▶ a játék már tart' : '⏳ várakozás') + '<div class="szb-play"><div class="card pad szb-joincard">' +
        (msg || '<h2>👋 Belépés a szobába</h2>' + (room.status === 'running' ? '<p>A játék már elkezdődött – a hátralévő kérdésekre még válaszolhatsz.</p>' : '<p>A gazda még nem indította el a játékot.</p>') +
          '<label class="szb-f"><span>Beceneved</span><input id="szb-jnick" maxlength="20" autocomplete="nickname" placeholder="pl. Villám" value="' + esc(nk) + '"></label>' +
          '<p><button type="button" class="btn primary" id="szb-join">▶ Belépek</button></p><p class="szb-msg" id="szb-jm" role="alert"></p>' +
          '<p class="muted szb-privacy">🔒 Csak a becenevedet és a pontszámodat tároljuk. Ne add meg a valódi teljes nevedet.</p>') +
        '<p><a href="#/szoba">← Vissza a szobákhoz</a></p></div>' + side() + '</div>';
      paintLive();
      var b = box.querySelector('#szb-join'); if (!b) return;
      var inp = box.querySelector('#szb-jnick');
      function go() {
        var n2 = cleanNick(inp.value), m = box.querySelector('#szb-jm');
        if (!n2) { m.textContent = 'Adj meg egy becenevet (legfeljebb 20 karakter).'; inp.focus(); return; }
        inp.value = n2; S.store.set('szoba.nick', n2); b.disabled = true; m.textContent = '⏳ Belépés…';
        joinRoom(code, n2).then(function (row) {
          if (dead) return;
          remember(code, topicLabel(room), false); merge(row); lastKey = ''; tick();
        }, function (e) { b.disabled = false; m.textContent = errText(e); });
      }
      b.addEventListener('click', go);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    }
    function shareBlock() {
      var url = inviteUrl(code), svg = S.qrSvg ? S.qrSvg(url) : null;
      return '<div class="szb-share"><div><p class="muted">Szobakód</p><div class="szb-code szb-mono">' + esc(code) + '</div>' +
        '<input readonly id="szb-url" class="szb-url" value="' + esc(url) + '" aria-label="Meghívó link">' +
        '<p class="row" style="gap:8px;flex-wrap:wrap"><button type="button" class="btn" id="szb-copy">🔗 Meghívó link másolása</button>' + (navigator.share ? '<button type="button" class="btn" id="szb-wshare">📤 Megosztás</button>' : '') + '</p></div>' +
        (svg ? '<div class="szb-qr" title="Olvasd be a telefonod kamerájával">' + svg + '<small class="muted">📷 Olvasd be a kamerával</small></div>' : '') + '</div>';
    }
    function bindShare() {
      var url = inviteUrl(code), cp = box.querySelector('#szb-copy'), sh = box.querySelector('#szb-wshare');
      if (cp) cp.addEventListener('click', function () { copyText(url, box.querySelector('#szb-url'), cp); });
      if (sh) sh.addEventListener('click', function () { navigator.share({ title: 'Párbajszoba – ' + code, text: 'Gyere, versenyezzünk! Szobakód: ' + code, url: url }).catch(function () {}); });
    }
    function paintLobby() {
      box.innerHTML = head('⏳ várakozás') + '<div class="card pad szb-lobby">' + shareBlock() +
        '<h2>👥 Játékosok (<span id="szb-cnt">' + players.length + '</span>)</h2><ul id="szb-board" class="szb-pls"></ul>' +
        '<p class="muted szb-rules">📏 Szabályok: kattints a válaszra, majd „✔ Véglegesítem”. Helyes válasz: <b>500 pont</b> + legfeljebb <b>250</b> gyorsasági bónusz. ' +
          (room.after_first ? 'Amint valaki véglegesít, a többieknek legfeljebb <b>' + room.after_first + ' mp</b> marad.' : '') + '</p>' +
        (isHost() ? '<p><button type="button" class="btn primary szb-startbtn" id="szb-start">▶ Indítás</button></p><p class="muted">Indíthatsz egyedül is – aki később érkezik, a hátralévő kérdésekre még beszállhat.</p><p class="szb-msg" id="szb-sm" role="alert"></p>'
          : '<p class="szb-wait">⏳ Várakozás a gazdára…</p>') + '</div>';
      paintLive(); bindShare();
      var b = box.querySelector('#szb-start');
      if (b) b.addEventListener('click', function () {
        b.disabled = true; b.dataset.busy = '1'; var m = box.querySelector('#szb-sm'); m.textContent = '';
        syncClock().then(function () {
          return sb.from('rooms').update({ status: 'running', started_at: new Date(now() + LEAD).toISOString() }).eq('code', code).eq('status', 'lobby').select().maybeSingle();
        }).then(function (r) {
          if (r.error) throw r.error;
          if (r.data) room = r.data;
          tick();
        }).catch(function (e) { b.disabled = false; delete b.dataset.busy; m.textContent = errText(e); });
      });
    }
    function submit() {
      var v = view();
      if (v.v !== 'play' || TL.ph !== 'q' || sel == null || selQ !== TL.q || subOf(mine, TL.q)) return;
      myAns = myAns.concat([{ q: TL.q, k: sel, t: now() }]); S.store.set('szoba.a.' + code, myAns);
      dirty++; retryAt = 0; tick();
    }
    function choose(k) {
      if (!TL || TL.ph !== 'q' || subOf(mine, TL.q)) return;
      sel = k; selQ = TL.q;
      box.querySelectorAll('.szb-opt').forEach(function (b) { var on = +b.dataset.k === k; b.classList.toggle('sel', on); b.setAttribute('aria-pressed', String(on)); });
      var f = box.querySelector('#szb-final'); if (f) f.disabled = false;
    }
    function onKey(e) {
      if (!TL || TL.ph !== 'q' || !box.querySelector('.szb-opts') || e.altKey || e.ctrlKey || e.metaKey) return;
      var tg = e.target && e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT') return;
      var n = qs()[TL.q].o.length, k = -1, key = String(e.key || '').toUpperCase();
      if (/^[1-6]$/.test(key)) k = +key - 1; else if (/^[A-F]$/.test(key)) k = key.charCodeAt(0) - 65;
      if (k >= 0 && k < n) { e.preventDefault(); choose(k); }
      else if (e.key === 'Enter' && sel != null) { e.preventDefault(); submit(); }
    }
    function paintPlay(v) {
      var Q = qs(), x = Q[v.qi], n = Q.length, mySub = subOf(mine, v.qi), rev = v.ph === 'r';
      if (selQ !== v.qi) { sel = null; selQ = v.qi; }
      var fb = '';
      if (rev) {
        var myV = mine && TL.valid[mine.id], ok = myV && +myV.k === x.a;
        fb = ok ? '<p class="szb-fb ok">✅ Helyes! <b>+' + fmtPts(pts(true, +myV.t, TL.s, TL.T)) + ' pont</b></p>'
          : '<p class="szb-fb bad">' + (myV ? '❌ Nem talált.' : mySub ? '⏰ Későn érkezett a válaszod.' : '⏰ Nem véglegesítettél időben.') + ' A helyes válasz: <b>' + S.inline(x.o[x.a]) + '</b></p>';
        /* ki mit tippelt, mennyi idő alatt */
        var rows = TL.elig.map(function (p) { var a = TL.valid[p.id]; return { p: p, a: a, dt: a ? Math.max(0, +a.t - TL.s) : Infinity }; }).sort(function (a, b) { return a.dt - b.dt; });
        var fastest = rows.filter(function (r) { return r.a && +r.a.k === x.a; })[0];
        fb += '<ul class="szb-who">' + rows.map(function (r) {
          var good = r.a && +r.a.k === x.a;
          return '<li class="' + (r.p === mine ? 'me' : '') + '"><span class="szb-nm">' + (r === fastest ? '⚡ ' : '') + esc(r.p.nick) + '</span><span>' + (r.a ? '<b>' + 'ABCDEF'.charAt(+r.a.k) + '</b> ' + (good ? '✅' : '❌') : '—') + '</span><small class="muted">' +
            (r.a ? S.fmt(r.dt / 1000, 1) + ' mp' : 'nem válaszolt') + '</small><span class="szb-pt">' + (good ? '+' + fmtPts(pts(true, +r.a.t, TL.s, TL.T)) : '0') + '</span></li>';
        }).join('') + '</ul>';
        if (fastest) fb += '<p class="muted">⚡ Leggyorsabb helyes válasz: <b>' + esc(fastest.p.nick) + '</b> (' + S.fmt(fastest.dt / 1000, 1) + ' mp)</p>';
        if (x.x) fb += '<div class="szb-why">' + S.md(x.x) + '</div>';
        if (v.qi === n - 1) fb += '<p class="muted">🏁 Ez volt az utolsó kérdés – mindjárt jön a végeredmény.</p>';
      } else if (mySub) fb = '<p class="szb-fb wait">📨 Véglegesítve: <b>' + 'ABCDEF'.charAt(+mySub.k) + '</b>. Várjuk a többieket…</p>';
      var chosen = mySub ? +mySub.k : sel;
      box.innerHTML = head('▶ játék') + '<div class="szb-play"><div class="card pad szb-main">' +
        '<div class="szb-qhead"><b>' + (v.qi + 1) + ' / ' + n + '</b><small class="muted">' + esc(x.s || '') + '</small><span id="szb-left" class="szb-left"></span></div>' +
        '<div class="szb-bar"><i id="szb-barfill"></i></div><p class="szb-hurry" id="szb-hurry" hidden>⚡ Valaki már válaszolt – siess!</p><p class="szb-q">' + S.inline(x.q) + '</p>' +
        '<div class="szb-opts" role="group" aria-label="Válaszlehetőségek">' + x.o.map(function (o, k) {
          var cls = rev ? (k === x.a ? ' ok' : chosen === k ? ' bad' : ' dim') : chosen === k ? ' sel' : '';
          return '<button type="button" class="szb-opt' + cls + '" data-k="' + k + '" aria-pressed="' + (chosen === k) + '"' + (rev || mySub ? ' disabled' : '') + '><span class="szb-l">' + 'ABCDEF'.charAt(k) + '</span><span>' + S.inline(o) + '</span></button>';
        }).join('') + '</div>' +
        (rev || mySub ? '' : '<p class="szb-final"><button type="button" class="btn primary" id="szb-final"' + (sel == null ? ' disabled' : '') + '>✔ Véglegesítem</button><small class="muted">Kattints egy válaszra (vagy 1–4 / A–D), majd véglegesítsd (Enter). Véglegesítés előtt még átválthatsz.</small></p>') +
        '<div aria-live="polite">' + fb + '</div></div>' + side() + '</div>';
      paintLive();
      if (rev || mySub) return;
      box.querySelectorAll('.szb-opt').forEach(function (b) { b.addEventListener('click', function () { choose(+b.dataset.k); }); });
      box.querySelector('#szb-final').addEventListener('click', submit);
    }
    function paintResults() {
      var list = sorted(), n = qs().length, medal = ['🥇', '🥈', '🥉'];
      if (!logged && mine) { logged = true; if (S.logActivity) S.logActivity('game', 'szoba'); }
      var pod = list.slice(0, 3).map(function (p, i) { var sc = scoreOf(p); return '<div class="szb-pod szb-pod' + (i + 1) + (p === mine ? ' me' : '') + '"><div class="szb-medal">' + medal[i] + '</div><b>' + esc(p.nick) + '</b><span>' + fmtPts(sc.score) + ' pont</span><small>' + sc.correct + '/' + n + ' helyes</small></div>'; }).join('');
      var myRank = mine ? list.indexOf(mine) + 1 : 0, ms = mine ? scoreOf(mine) : null;
      box.innerHTML = head('🏁 vége') + '<div class="card pad szb-res"><h2>🏁 Végeredmény</h2>' +
        (myRank ? '<p class="szb-mine-res">' + (myRank === 1 ? '🏆 Nyertél! ' : 'A helyezésed: <b>' + myRank + '.</b> ') + '<b>' + fmtPts(ms.score) + ' pont</b> · ' + ms.correct + '/' + n + ' helyes</p>' : '') +
        (list.length ? '<div class="szb-podium">' + pod + '</div>' : '<p class="muted">Ebben a szobában senki sem játszott.</p>') +
        '<ol class="szb-board szb-full">' + list.map(function (p, i) {
          var sc = scoreOf(p);
          return '<li class="' + (p === mine ? 'me' : '') + '"><span class="szb-rk">' + (i + 1) + '.</span><span class="szb-nm">' + esc(p.nick) + '</span><span class="szb-pt">' + fmtPts(sc.score) + '</span><small class="muted">' + sc.correct + '/' + n + '</small></li>';
        }).join('') + '</ol>' +
        (room.next_code ? '<p class="szb-next">🔁 Visszavágó indult: <a class="btn primary" href="#/szoba/' + esc(room.next_code) + '">Belépés a(z) ' + esc(room.next_code) + ' szobába →</a></p>' : '') +
        '<p class="row" style="gap:8px;flex-wrap:wrap"><button type="button" class="btn primary" id="szb-again">🔁 Visszavágó</button><button type="button" class="btn" id="szb-copy">🔗 Meghívó link másolása</button><a class="btn" href="#/szoba">🌐 Új szoba</a></p>' +
        '<p class="szb-msg" id="szb-am" role="alert"></p><input readonly id="szb-url" class="szb-url" value="' + esc(inviteUrl(code)) + '" aria-label="A szoba linkje"><p class="muted">A szoba linkje később is megnyitható, és ezt a végeredményt mutatja.</p></div>';
      paintLive(); bindShare();
      box.querySelector('#szb-again').addEventListener('click', function () {
        var b = this, m = box.querySelector('#szb-am'), nk = cleanNick((mine && mine.nick) || S.store.get('szoba.nick', '') || 'Játékos');
        b.disabled = true; m.textContent = '⏳ Új szoba ugyanazzal a beállítással…';
        S.need(function () {
          createRoom({ k: topicKey(room), n: n, s: room.seconds, x: room.after_first == null ? 20 : room.after_first, nick: nk }).then(function (c) {
            function go() { location.hash = '#/szoba/' + c; }
            /* a régi szoba is jelzi a visszavágót a többieknek */
            if (isHost() && 'next_code' in room) sb.from('rooms').update({ next_code: c }).eq('code', code).then(go, go); else go();
          }, function (e) { b.disabled = false; m.textContent = errText(e); });
        });
      });
    }
    start();
  }

  S.addRoute('szoba', { title: 'Online párbajszoba', nav: 'teszt', page: function (main, rest) {
    if (cleanup) { try { cleanup(); } catch (e) { /* már lezárva */ } cleanup = null; }
    var code = String((rest && rest[0]) || '').toUpperCase();
    if (!code) { hub(main); return true; }
    if (!/^[A-Z0-9]{4,8}$/.test(code)) {
      main.innerHTML = crumbs('Hibás kód') + '<div class="card pad szb-warn"><p><b>Ez nem szobakód: „' + esc(code) + '”.</b> A kód 4–8 betűből vagy számból áll.</p><p><a class="btn primary" href="#/szoba">🌐 Szobák</a></p></div>';
      return true;
    }
    if (!online()) { main.innerHTML = crumbs(code) + offlineCard(); return true; }
    roomPage(main, code);
    return true;
  } });
})();
