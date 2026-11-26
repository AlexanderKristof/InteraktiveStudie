/* Tudásműhely – 🩺 Hibanapló és gyengepont-térkép.
 * Közös naplózás: S.logAnswer(meta, ok) – a lecke-/modell-/egyetemi kvíz (app.js renderQuiz) és a Tesztközpont
 * (teszt.js results) hívja minden megválaszolt kérdés után.
 *   meta: { key: 'tantárgy/lecke' | 'model/id' | 'course/kurzus' }  VAGY  { gid, tid },
 *         továbbá { q: kérdés, your: a te válaszod, right: helyes válasz, href, label, src }
 * Tárolás: 'gyp' → { st: { 'gid/tid': { n, ok, t } }, log: [ utolsó 50 rossz válasz ], seeded: true }
 * Az első használatkor a Tesztközpont korábbi témastatisztikáját ('teszt.stats') is átveszi.
 * A lépésenkénti feladatok ('lepesek' → tipusok) eredménye külön sorként jelenik meg.
 * Útvonal: #/gyengepontok */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var KEY = 'gyp', LOG_MAX = 50;

  function load() {
    var d = S.store.get(KEY, null) || {};
    d.st = d.st || {}; d.log = d.log || [];
    if (!d.seeded) {
      /* a korábbi tesztstatisztika átvétele (egyszer) */
      var ts = S.store.get('teszt.stats', {});
      Object.keys(ts).forEach(function (k) {
        if (!ts[k] || !ts[k].n || d.st[k]) return;
        d.st[k] = { n: ts[k].n, ok: ts[k].ok || 0, t: 0 };
      });
      d.seeded = true;
    }
    return d;
  }
  function save(d) { S.store.set(KEY, d); }

  /* Egyetemi kurzuskvíznél a kérdésből/válaszból kikeressük a fogalmat, így a téma is ismert. */
  function courseTopic(cid, meta) {
    var c = S.courseById && S.courseById(cid);
    if (!c) return '_';
    var hay = S.norm((meta.right || '') + ' ' + (meta.q || ''));
    var hit = (c.terms || []).filter(function (t) {
      return t.topic && ((meta.right && (meta.right === t.term || meta.right === t.en || meta.right === t.short)) || hay.indexOf(S.norm(t.term)) >= 0);
    })[0];
    return hit ? hit.topic : '_';
  }
  function resolve(meta) {
    var gid = meta.gid, tid = meta.tid;
    if (!gid && meta.key) {
      var p = String(meta.key).split('/');
      if (p[0] === 'model') { gid = 'felfedezo'; tid = p[1]; }
      else if (p[0] === 'course') { gid = p[1]; tid = courseTopic(p[1], meta); }
      else { gid = p[0]; tid = p[1]; }
    }
    return { gid: gid || '_', tid: tid || '_' };
  }

  S.logAnswer = function (meta, ok) {
    try {
      meta = meta || {};
      var r = resolve(meta), k = r.gid + '/' + r.tid, d = load();
      var x = d.st[k] = d.st[k] || { n: 0, ok: 0, t: 0 };
      x.n++; if (ok) x.ok++; x.t = Date.now();
      if (!ok) {
        d.log.unshift({ q: String(meta.q || ''), your: meta.your == null ? null : String(meta.your), right: String(meta.right == null ? '' : meta.right),
          href: meta.href || '', label: meta.label || '', gid: r.gid, tid: r.tid, ts: Date.now(), src: meta.src || 'kviz' });
        d.log = d.log.slice(0, LOG_MAX);
      }
      save(d);
    } catch (e) { /* a naplózás sosem akaszthatja meg a kvízt */ }
  };

  /* ---------- lépésenkénti feladat ajánlása egy témához ---------- */
  var LP_MATCH = {
    linearis: ['linearis egyenlet', 'elsofoku', 'egyenletek'], egyenletrendszer: ['egyenletrendszer'], masodfoku: ['masodfoku'],
    szazalek: ['szazalek'], tortek: ['tortek', 'tortszam'], aranyossag: ['aranyossag', 'aranyos'], pitagorasz: ['pitagorasz'],
    kor: ['kor kerulete', 'kor terulete', 'kerulet', 'terulet'], hatvany: ['hatvany', 'normalalak'],
    mozgas: ['egyenletes mozgas', 'sebesseg', 'mozgas'], gyorsulas: ['gyorsul'], ohm: ['ohm', 'ellenallas', 'aramkor', 'elektromos'],
    munka: ['munka', 'teljesitmeny', 'energia'], suruseg: ['suruseg'], ho: ['homennyiseg', 'hotan', 'fajho', 'ho es'],
    molaris: ['molaris', 'atomtomeg'], anyagmennyiseg: ['anyagmennyiseg', 'mol'], oldat: ['oldat'], ph: ['ph', 'savak', 'sav'],
    kamatos: ['kamat', 'megtakaritas', 'befektet', 'hitel'], afa: ['afa', 'ado']
  };
  var LP_SUBJ = { mat: /matek|matemat|analizis|algebra/, fiz: /fizik|mechanika|villamos/, kem: /kemi/, penz: /penz|gazdas|felnott|adozas|szamvitel/ };
  function lpFor(gid, title) {
    var L = S.lepesek; if (!L || !L.TYPES) return null;
    var sj = S.subjects.filter(function (s) { return s.id === gid; })[0], c = !sj && S.courseById && S.courseById(gid);
    var sjt = S.norm((sj ? sj.title : c ? c.title : '') + ' ' + gid);
    var ok = Object.keys(LP_SUBJ).filter(function (g) { return LP_SUBJ[g].test(sjt); });
    if (!ok.length) return null;
    var tt = ' ' + S.norm(title || '').replace(/[^a-z0-9]+/g, ' ') + ' ';
    var hit = (L.ORDER || []).filter(function (id) {
      return ok.indexOf(L.TYPES[id].group) >= 0 && (LP_MATCH[id] || []).some(function (w) { return tt.indexOf(' ' + w) >= 0; });
    })[0];
    return hit ? L.TYPES[hit] : { hub: true };
  }

  /* ---------- megjelenítés ---------- */
  function groupsIndex() {
    var idx = {};
    try { (S.testGroups ? S.testGroups() : []).forEach(function (g) { idx[g.id] = g; }); } catch (e) { /* nincs tesztmodul */ }
    return idx;
  }
  function topicInfo(G, gid, tid) {
    var g = G[gid], t = g && g.topics.filter(function (x) { return x.id === tid; })[0];
    var c = !g && S.courseById && S.courseById(gid);
    return {
      g: g || (c ? { id: c.id, title: c.title, icon: c.icon, color: c.color, topics: [] } : { id: gid, title: gid === '_' ? 'Egyéb' : gid, icon: '📘', color: '#888', topics: [] }),
      title: t ? t.title : tid === '_' ? 'Vegyes kérdések' : tid,
      href: t ? t.href : (c ? '#/egyetem/' + c.id : ''),
      hasQ: !!(t && t.questions && t.questions.length)
    };
  }
  function heat(err) { return err <= 0.1 ? 0 : err <= 0.25 ? 1 : err <= 0.4 ? 2 : err <= 0.6 ? 3 : 4; }
  function pctTxt(x) { return Math.round(x * 100) + '%'; }
  function srsFor(href, gid, tid) {
    var all = S.store.get('srs', {}), n = 0;
    Object.keys(all).forEach(function (k) { var m = all[k].m || {}; if ((href && m.href === href) || (m.gid === gid && m.tid === tid)) n++; });
    return n;
  }

  function page(main) {
    var uni = S.level === 'egyetem';
    var d = load(); save(d);
    var G = groupsIndex();
    var lp = S.store.get('lepesek', null), lpT = (lp && lp.tipusok) || {};
    /* témák összegyűjtése tantárgyanként */
    var byG = {}, rows = [];
    Object.keys(d.st).forEach(function (k) {
      var x = d.st[k]; if (!x || !x.n) return;
      var i = k.indexOf('/'), gid = k.slice(0, i), tid = k.slice(i + 1), inf = topicInfo(G, gid, tid);
      var r = { key: k, gid: gid, tid: tid, n: x.n, ok: x.ok, err: 1 - x.ok / x.n, title: inf.title, href: inf.href, g: inf.g, hasQ: inf.hasQ };
      rows.push(r);
      (byG[gid] = byG[gid] || { g: inf.g, rows: [], n: 0, ok: 0 }).rows.push(r);
      byG[gid].n += x.n; byG[gid].ok += x.ok;
    });
    var lpRows = S.lepesek ? Object.keys(lpT).filter(function (id) { return S.lepesek.TYPES[id] && lpT[id].ossz; }).map(function (id) {
      var T = S.lepesek.TYPES[id], x = lpT[id];
      return { key: 'lp/' + id, gid: 'lp', tid: id, n: x.ossz, ok: Math.min(x.jo, x.ossz), err: 1 - Math.min(x.jo, x.ossz) / x.ossz, title: T.icon + ' ' + T.title, href: '#/feladatok/' + id, lp: T, g: { id: 'lp', title: 'Lépésenkénti feladatok', icon: '🧮' } };
    }) : [];
    if (lpRows.length) {
      byG.lp = { g: lpRows[0].g, rows: lpRows, n: 0, ok: 0 };
      lpRows.forEach(function (r) { byG.lp.n += r.n; byG.lp.ok += r.ok; rows.push(r); });
    }
    var total = 0, good = 0; rows.forEach(function (r) { total += r.n; good += r.ok; });

    var head = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/haladas">Haladásom</a><span>›</span><span>Gyengepont-térkép</span></nav>' +
      '<h1>🩺 Hibanapló és gyengepont-térkép</h1>' +
      '<p class="lead">' + (uni
        ? 'A lecke-, modell- és kurzuskvízek, a Tesztközpont és a lépésenkénti feladatok összes válasza témánként összesítve. A hőtérkép a hibaarányt mutatja; a leggyengébb témákhoz célzott gyakorlást ajánlunk.'
        : 'Itt látod, melyik témában hibázol a legtöbbet. Zöld = megy, sárga = még billeg, piros = ezt érdemes átnézni. Alul a legutóbbi rossz válaszaid vannak – ezekből lehet a legtöbbet tanulni!') + '</p>';

    if (!rows.length && !d.log.length) {
      main.innerHTML = head + '<div class="card pad gp-empty"><div class="gp-empty-ico">🌱</div><h2>Még nincs mit kiértékelni</h2>' +
        '<p>' + (uni ? 'A térkép az első megválaszolt kérdés után kezd kirajzolódni.' : 'Ha megoldasz néhány kvízt vagy tesztet, itt megjelenik, mi megy már jól, és mit érdemes még gyakorolni. A hibázás nem baj – abból tanulsz a legtöbbet!') + '</p>' +
        '<div class="row gp-empty-row"><a class="btn primary" href="#/teszt">📝 Tesztközpont</a><a class="btn" href="#/tartalom">📚 Válassz egy leckét</a>' +
        (S.routes && S.routes.feladatok ? '<a class="btn" href="#/feladatok">🧮 Lépésenkénti feladatok</a>' : '') + '</div></div>';
      return true;
    }

    /* 5 leggyengébb téma */
    var minN = rows.some(function (r) { return r.n >= 2 && r.err > 0; }) ? 2 : 1;
    var worst = rows.filter(function (r) { return r.n >= minN && r.err > 0; }).sort(function (a, b) { return b.err - a.err || b.n - a.n; }).slice(0, 5);
    var worstKeys = {}; worst.forEach(function (r) { worstKeys[r.key] = 1; });

    function recHtml(r, i) {
      var recs = [];
      if (r.lp) {
        recs.push('<a class="btn primary" href="#/feladatok/' + r.tid + '">🧮 Új feladat ebből</a>');
        recs.push('<a class="btn" href="#/feladatok/' + r.tid + '?szint=0">🪜 Könnyebb szinten</a>');
      } else {
        if (r.href) recs.push('<a class="btn" href="' + esc(r.href) + '">📖 ' + (/^#\/lecke\//.test(r.href) ? 'Lecke újraolvasása' : 'Tananyag megnyitása') + '</a>');
        if (r.hasQ) recs.push('<button type="button" class="btn primary" data-gp-test="' + esc(r.key) + '">📝 Gyakorló teszt ebből a témából</button>');
        if (G[r.gid] && G[r.gid].topics.length > 1) recs.push('<a class="btn" href="#/teszt?targy=' + encodeURIComponent(r.gid) + '">🗂 Teszt az egész tantárgyból</a>');
        var L = lpFor(r.gid, r.title);
        if (L && L.hub) recs.push('<a class="btn" href="#/feladatok">🧮 Lépésenkénti feladatok</a>');
        else if (L) recs.push('<a class="btn" href="#/feladatok/' + L.id + '">' + L.icon + ' Lépésenként: ' + esc(L.title) + '</a>');
        var due = srsFor(r.href, r.gid, r.tid);
        recs.push('<a class="btn" href="#/ismetles">🔁 Okos ismétlés' + (due ? ' (' + due + ' kérdés innen)' : '') + '</a>');
      }
      return '<li class="card gp-worst-item gp-h' + heat(r.err) + '"><div class="gp-worst-head"><span class="gp-rank">' + (i + 1) + '.</span><div class="gp-worst-t"><b>' + esc(r.title) + '</b><small class="muted">' + esc((r.g.icon || '') + ' ' + r.g.title) + '</small></div>' +
        '<span class="gp-pill gp-h' + heat(r.err) + '">' + pctTxt(r.err) + ' hiba</span></div>' +
        '<p class="muted gp-worst-n">' + r.ok + ' jó / ' + r.n + ' válasz</p><div class="gp-recs">' + recs.join('') + '</div></li>';
    }

    var gids = Object.keys(byG).sort(function (a, b) { var A = byG[a], B = byG[b]; return (B.n - B.ok) / B.n - (A.n - A.ok) / A.n; });
    function mapHtml() {
      return gids.map(function (gid) {
        var b = byG[gid], err = 1 - b.ok / b.n;
        var tried = {}; b.rows.forEach(function (r) { tried[r.tid] = 1; });
        var untried = gid === 'lp' ? [] : ((G[gid] && G[gid].topics) || []).filter(function (t) { return !tried[t.id]; });
        var cells = b.rows.slice().sort(function (x, y) { return y.err - x.err; }).map(function (r) {
          return '<a class="gp-cell gp-h' + heat(r.err) + (worstKeys[r.key] ? ' gp-hot' : '') + '" href="' + esc(r.href || '#/gyengepontok') + '" title="' + esc(r.title + ': ' + r.ok + ' jó / ' + r.n + ' válasz') + '">' +
            '<span class="gp-cell-t">' + esc(r.title) + '</span><span class="gp-cell-v">' + pctTxt(r.err) + ' hiba · ' + r.n + ' db</span></a>';
        }).join('');
        return '<section class="card gp-group"><div class="gp-group-head"><h3>' + esc((b.g.icon || '') + ' ' + b.g.title) + '</h3><span class="gp-pill gp-h' + heat(err) + '">' + pctTxt(1 - err) + ' jó</span></div>' +
          '<div class="gp-cells">' + cells + '</div>' +
          (untried.length ? '<details class="gp-untried"><summary>' + untried.length + ' téma még kipróbálatlan</summary><div class="gp-dots">' + untried.map(function (t) {
            return '<a class="gp-dot" href="' + esc(t.href) + '" title="' + esc(t.title) + '">' + esc(t.title) + '</a>';
          }).join('') + '</div></details>' : '') + '</section>';
      }).join('');
    }
    function logHtml() {
      if (!d.log.length) return '<p class="muted">Még nincs rossz válasz a naplóban. 🎉</p>';
      return '<ol class="gp-log">' + d.log.map(function (e) {
        var when = e.ts ? new Date(e.ts).toLocaleString('hu-HU', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
        return '<li class="card gp-log-item"><div class="gp-log-q">' + S.inline(e.q) + '</div>' +
          '<div class="gp-log-a"><span class="gp-your">✘ ' + (uni ? 'Válaszod' : 'A te válaszod') + ': ' + (e.your == null ? '<i>nem válaszoltál</i>' : S.inline(e.your)) + '</span>' +
          '<span class="gp-right">✔ Helyes: ' + S.inline(e.right) + '</span></div>' +
          '<div class="gp-log-m"><small class="muted">' + esc(when) + (e.label ? ' · ' + esc(e.label) : '') + '</small>' + (e.href ? ' <a href="' + esc(e.href) + '">Ugrás a témához →</a>' : '') + '</div></li>';
      }).join('') + '</ol>';
    }

    main.innerHTML = head +
      '<div class="gp-stats card pad"><div><b>' + total + '</b><small>megválaszolt kérdés</small></div><div><b>' + (total ? pctTxt(good / total) : '–') + '</b><small>helyes arány</small></div>' +
      '<div><b>' + rows.length + '</b><small>kipróbált téma</small></div><div><b>' + d.log.length + '</b><small>rossz válasz a naplóban</small></div></div>' +
      (worst.length ? '<h2>🎯 A 5 leggyengébb pontod</h2><p class="muted">' + (uni ? 'Hibaarány szerint rendezve (legalább ' + minN + ' válasz témánként).' : 'Ezekkel a témákkal érdemes most foglalkozni. Kezdd az elsővel!') + '</p><ol class="gp-worst">' + worst.map(recHtml).join('') + '</ol>'
        : '<div class="note tip"><b class="t">Nincs gyenge pontod 🎉</b><p>Minden kipróbált témában hibátlan vagy. Próbálj ki újakat!</p></div>') +
      '<div class="gp-map-head"><h2>🗺 Gyengepont-térkép</h2><div class="gp-legend" aria-label="Jelmagyarázat"><span class="gp-h0">≤10%</span><span class="gp-h1">≤25%</span><span class="gp-h2">≤40%</span><span class="gp-h3">≤60%</span><span class="gp-h4">&gt;60%</span><small class="muted">hibaarány</small></div></div>' +
      '<div class="gp-map">' + mapHtml() + '</div>' +
      '<h2>📓 Hibanapló <small class="muted">(utolsó ' + LOG_MAX + ' rossz válasz)</small></h2>' + logHtml() +
      '<div class="gp-clear card pad"><div><b>Újrakezdés</b><p class="muted">' + (uni ? 'Törli a hibanaplót és a térkép adatait. A Tesztközpont statisztikáját, a lépésenkénti feladatok pontjait és az Okos ismétlést nem érinti.' : 'Kitörli a hibanaplót és a térképet. Az Okos ismétlés kérdései megmaradnak.') + '</p></div>' +
      '<button type="button" class="btn gp-clear-btn" id="gp-clear">🗑 Napló törlése</button></div>';

    main.querySelectorAll('[data-gp-test]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-gp-test'), i = k.indexOf('/'), gid = k.slice(0, i), tid = k.slice(i + 1);
        var items = S.testItems ? S.shuffle(S.testItems(gid, [tid])).slice(0, 10) : [];
        if (!items.length) { location.hash = '#/teszt?targy=' + encodeURIComponent(gid); return; }
        S.runTest(main, items, 'azonnali', { label: 'Gyakorlás: ' + items[0].t.title, backHref: '#/gyengepontok', backLabel: 'Gyengepont-térkép' });
      });
    });
    main.querySelector('#gp-clear').addEventListener('click', function () {
      if (!confirm('Biztosan törlöd a hibanaplót és a gyengepont-térképet? Ez nem vonható vissza.')) return;
      save({ st: {}, log: [], seeded: true });
      page(main);
    });
    return true;
  }

  S.addRoute('gyengepontok', { title: 'Hibanapló és gyengepont-térkép', nav: 'haladas', page: function (main) { return page(main); } });
})();
