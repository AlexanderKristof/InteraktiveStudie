/* Tudásműhely – 🧭 Pályaorientáció (#/palya).
 * Érdeklődés-kérdőív (Holland-féle RIASEC-dimenziók), profilábra, illő pályák és pályaleírások.
 * Adat: STUDIE.addPalya({ id, title, icon, code: 'RIC', szint: 'szakma'|'diploma'|'vegyes', terulet, short,
 *   mit, nap, tulajdonsagok: [...], ut: [...], tantargyak: [...], kereset, kilatas,
 *   linkek: [ { tantargy } | { lecke: 'tárgy/lecke' } | { modell } | { kurzus } | { szakszo: 'kurzus/fogalom' } | { utvonal } | { oldal: '#/…', title, icon } ] })
 * Útvonalak: #/palya (áttekintés), #/palya/kerdoiv, #/palya/eredmeny, #/palya/<pályaId>. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  S.palyak = [];
  S.addPalya = function (p) { S.palyak.push(p); };
  S.palyaById = function (id) { return S.palyak.filter(function (p) { return p.id === id; })[0]; };

  /* A hat érdeklődési típus. */
  var DIMS = [
    { k: 'R', name: 'Realista', ico: '🔧', color: '#ea580c', short: 'gyakorlatias, kézzelfogható munka',
      txt: 'Szeretsz kézzel, szerszámokkal, gépekkel dolgozni, és látni a munkád kézzelfogható eredményét. Gyakran a szabadban vagy műhelyben érzed jól magad.' },
    { k: 'I', name: 'Vizsgálódó', ico: '🔬', color: '#2563eb', short: 'kíváncsi, elemző, kutató',
      txt: 'Érdekel, mi miért történik. Szívesen gondolkodsz, kísérletezel, elemzel adatokat, és elmélyülsz egy nehéz problémában.' },
    { k: 'A', name: 'Művészi', ico: '🎨', color: '#c026d3', short: 'alkotó, kifejező, egyedi',
      txt: 'Az önkifejezés vonz: rajz, zene, írás, tervezés. Szereted, ha szabadon, a saját egyedi módodon alkothatsz.' },
    { k: 'S', name: 'Szociális', ico: '🤝', color: '#16a34a', short: 'segítő, tanító, gondoskodó',
      txt: 'Emberekkel szeretsz foglalkozni: segíteni, tanítani, gondoskodni, meghallgatni. Jól megérted mások érzéseit.' },
    { k: 'E', name: 'Vállalkozó', ico: '🚀', color: '#dc2626', short: 'szervező, meggyőző, vezető',
      txt: 'Szívesen szervezel, irányítasz, meggyőzöl másokat. Vonzanak a célok, a verseny, az üzlet és a felelősség.' },
    { k: 'C', name: 'Konvencionális', ico: '📋', color: '#0891b2', short: 'rendszerező, pontos, megbízható',
      txt: 'Szereted a rendet, a pontos szabályokat és a jól átlátható feladatokat. Megbízhatóan bánsz számokkal, adatokkal, iratokkal.' }
  ];
  var DIM = {}; DIMS.forEach(function (d) { DIM[d.k] = d; });
  S.PALYA_DIMS = DIMS;

  /* 24 állítás, típusonként 4, keverve. */
  var Q = [
    ['R', 'Szívesen szerelek, javítok meg dolgokat (biciklit, gépet, elektromos eszközt).'],
    ['I', 'Szeretek rejtvényeket, logikai feladatokat megoldani.'],
    ['A', 'Szívesen rajzolok, fotózok, tervezek vagy alkotok valami újat.'],
    ['S', 'Szívesen segítek másoknak, ha elakadnak, például a tanulásban.'],
    ['E', 'Szívesen szervezek programokat, és szeretem, ha én irányíthatom a csapatot.'],
    ['C', 'Szeretem, ha rend van, és mindennek megvan a helye.'],
    ['R', 'Szeretek a kezemmel, szerszámokkal dolgozni.'],
    ['I', 'Érdekel, mi miért történik a természetben.'],
    ['A', 'Szeretek zenélni, énekelni vagy színpadon szerepelni.'],
    ['S', 'Jól megértem mások érzéseit, sokan hozzám fordulnak a gondjaikkal.'],
    ['E', 'Szeretek meggyőzni másokat, érvelni, vitatkozni.'],
    ['C', 'Szívesen dolgozom táblázatokkal, számokkal, listákkal.'],
    ['R', 'Jól érzem magam a szabadban, akár fizikai munka közben is.'],
    ['I', 'Szívesen utánajárok egy kérdésnek: kísérletezek, adatokat vizsgálok.'],
    ['A', 'Szívesen írok történeteket, verseket vagy blogot.'],
    ['S', 'Szeretek csapatban, emberekkel együtt dolgozni.'],
    ['E', 'Érdekel, hogyan lehet pénzt keresni, vállalkozást indítani.'],
    ['C', 'Pontosan, alaposan követem az utasításokat és a szabályokat.'],
    ['R', 'Érdekel, hogyan működnek belülről a gépek, motorok, járművek.'],
    ['I', 'Szeretek elmélyülni egy nehéz problémában, akár órákig is.'],
    ['A', 'Fontos nekem, hogy a magam egyedi módján csinálhassam a dolgokat.'],
    ['S', 'Szívesen foglalkozom gyerekekkel, idősekkel vagy betegekkel.'],
    ['E', 'Bátran vállalok kockázatot, ha nagy a lehetséges nyereség.'],
    ['C', 'Szeretem előre megtervezni a napomat és a feladataimat.']
  ];
  S.PALYA_KERDESEK = Q;
  var SCALE = [[1, 'Egyáltalán nem jellemző rám'], [2, 'Inkább nem jellemző'], [3, 'Is-is'], [4, 'Inkább jellemző'], [5, 'Nagyon jellemző rám']];
  var SZINT = { szakma: '🛠️ Szakképzés, technikum', diploma: '🎓 Felsőfokú végzettség', vegyes: '🛠️🎓 Szakma vagy diploma' };

  /* ---------- állapot ---------- */
  function answers() {
    var a = S.store.get('palya.valaszok', null);
    if (!a || a.length !== Q.length) { a = []; for (var i = 0; i < Q.length; i++) a.push(null); }
    return a;
  }
  function saveAnswers(a) { S.store.set('palya.valaszok', a); }
  function answeredCount(a) { return a.filter(function (x) { return x != null; }).length; }
  /* Típusonkénti pontszám 0–100%-ban (4 állítás, egyenként 1–5 → 4–20 pont). Csak teljes kitöltésnél. */
  function profile(a) {
    a = a || answers();
    if (answeredCount(a) < Q.length) return null;
    var sum = {}; DIMS.forEach(function (d) { sum[d.k] = 0; });
    Q.forEach(function (q, i) { sum[q[0]] += a[i]; });
    var out = {}; DIMS.forEach(function (d) { out[d.k] = Math.round((sum[d.k] - 4) / 16 * 100); });
    return out;
  }
  S.palyaProfile = profile;
  /* Holland-kód: a három legerősebb típus (egyezésnél a RIASEC-sorrend dönt). */
  function code(pr) {
    return DIMS.slice().sort(function (x, y) { return pr[y.k] - pr[x.k] || DIMS.indexOf(x) - DIMS.indexOf(y); }).slice(0, 3).map(function (d) { return d.k; }).join('');
  }
  /* Illeszkedés: a pálya kódjának betűi 3–2–1 súllyal, a profil adott típusának százalékával. */
  function match(pr, p) {
    var w = [3, 2, 1], s = 0, n = 0;
    p.code.split('').forEach(function (c, i) { s += w[i] * pr[c]; n += w[i]; });
    return Math.round(s / n);
  }
  S.palyaMatch = match;

  /* ---------- kapcsolódó tartalom ---------- */
  function subj(id) { return S.subjects.filter(function (s) { return s.id === id; })[0]; }
  S.palyaLink = function (l) {
    if (l.tantargy) { var s = subj(l.tantargy); return s ? { icon: s.icon, kind: 'Tantárgy', title: s.title, href: '#/tantargy/' + s.id } : null; }
    if (l.lecke) {
      var p = l.lecke.split('/'), s2 = subj(p[0]), le = s2 && s2.lessons.filter(function (x) { return x.id === p[1]; })[0];
      return le ? { icon: s2.icon, kind: 'Lecke · ' + s2.title, title: le.title, href: '#/lecke/' + l.lecke } : null;
    }
    if (l.modell) { var m = S.models[l.modell]; return m ? { icon: m.icon, kind: 'Felfedező modell', title: m.title, href: '#/felfedezo/' + m.id } : null; }
    if (l.kurzus) { var c = S.courseById && S.courseById(l.kurzus); return c ? { icon: c.icon, kind: 'Egyetemi kurzus', title: c.title, href: '#/egyetem/' + c.id } : null; }
    if (l.szakszo) { var r = S.resolveTerm && S.resolveTerm(l.szakszo); return r ? { icon: r.c.icon, kind: 'Szakszó · ' + r.c.title, title: r.t.term, href: r.href } : null; }
    if (l.utvonal) { var u = (S.paths || []).filter(function (x) { return x.id === l.utvonal; })[0]; return u ? { icon: u.icon, kind: 'Tanulási útvonal', title: u.title, href: '#/utvonal/' + u.id } : null; }
    if (l.oldal) return { icon: l.icon || '🔗', kind: 'Oldal', title: l.title || l.oldal, href: l.oldal };
    return null;
  };

  /* ---------- rajzok ---------- */
  function hexChart(pr, size) {
    var W = size || 320, PADX = 70, cx = W / 2 + PADX, cy = W / 2, R = W / 2 - 52, out = '';
    function pt(i, f) { var a = -Math.PI / 2 + i * Math.PI / 3; return [cx + Math.cos(a) * R * f, cy + Math.sin(a) * R * f]; }
    function poly(f) { return DIMS.map(function (d, i) { var p = pt(i, f); return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
    [0.25, 0.5, 0.75, 1].forEach(function (f) { out += '<polygon points="' + poly(f) + '" class="pa-hgrid"/>'; });
    DIMS.forEach(function (d, i) { var p = pt(i, 1); out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0].toFixed(1) + '" y2="' + p[1].toFixed(1) + '" class="pa-hgrid"/>'; });
    var pts = DIMS.map(function (d, i) { var p = pt(i, Math.max(0.03, pr[d.k] / 100)); return p; });
    out += '<polygon points="' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '" class="pa-area"/>';
    pts.forEach(function (p, i) { out += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4.5" fill="' + DIMS[i].color + '"/>'; });
    DIMS.forEach(function (d, i) {
      var p = pt(i, 1.2), anchor = Math.abs(p[0] - cx) < 4 ? 'middle' : p[0] > cx ? 'start' : 'end';
      if (anchor !== 'middle') p[0] += p[0] > cx ? -14 : 14;
      out += '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + (i === 0 ? -2 : i === 3 ? 10 : 4)).toFixed(1) + '" text-anchor="' + anchor + '" class="pa-lbl"><tspan fill="' + d.color + '" font-weight="700">' + d.k + '</tspan> ' + esc(d.name) + '</text>' +
        '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + (i === 0 ? 12 : i === 3 ? 24 : 18)).toFixed(1) + '" text-anchor="' + anchor + '" class="pa-pct">' + pr[d.k] + '%</text>';
    });
    return '<svg class="pa-hex" viewBox="0 0 ' + (W + 2 * PADX) + ' ' + W + '" role="img" aria-label="Érdeklődési profil hatszögábrán">' + out + '</svg>';
  }
  function bars(pr, withText) {
    var order = DIMS.slice().sort(function (x, y) { return pr[y.k] - pr[x.k]; });
    return '<div class="pa-bars">' + order.map(function (d) {
      return '<div class="pa-bar"><span class="pa-bn"><b style="color:' + d.color + '">' + d.ico + ' ' + d.k + '</b> ' + esc(d.name) + '</span>' +
        '<span class="pa-bt"><i style="width:' + pr[d.k] + '%;background:' + d.color + '"></i></span><b class="pa-bv">' + pr[d.k] + '%</b>' +
        (withText ? '<small>' + esc(d.txt) + '</small>' : '') + '</div>';
    }).join('') + '</div>';
  }
  function codeChips(c) {
    return '<span class="pa-code">' + c.split('').map(function (k) { return '<i style="background:' + DIM[k].color + '" title="' + esc(DIM[k].name) + '">' + k + '</i>'; }).join('') + '</span>';
  }
  function card(p, pr) {
    var m = pr ? match(pr, p) : null;
    return '<a class="card pa-card" href="#/palya/' + p.id + '"><span class="pa-ci">' + p.icon + '</span><span class="pa-ct"><b>' + esc(p.title) + '</b>' +
      '<small>' + esc(p.short) + '</small><span class="pa-cm">' + codeChips(p.code) + '<span>' + esc(p.terulet) + '</span>' +
      (m != null ? '<span class="pa-mt" title="Illeszkedés az érdeklődési profilodhoz">' + m + '%</span>' : '') + '</span></span></a>';
  }
  function crumbs(extra) {
    return '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span>' + (extra ? '<a href="#/palya">Pályaorientáció</a><span>›</span><span>' + esc(extra) + '</span>' : '<span>Pályaorientáció</span>') + '</nav>';
  }
  var DISCLAIMER = 'Ez **nem képességteszt** és nem mondja meg, mi „leszel”. Csak azt mutatja, mi érdekel most – ez idővel változhat. Beszélgess róla szüleiddel, tanáraiddal, pályaválasztási tanácsadóval, és próbálj ki dolgokat (szakkör, nyári munka, nyílt nap)!';

  /* ---------- oldalak ---------- */
  var filt = { dim: '', szint: '', q: '' };
  function pageHub(main) {
    var a = answers(), n = answeredCount(a), pr = profile(a);
    var quizBox;
    if (pr) {
      var c = code(pr);
      quizBox = '<section class="card pad pa-mine"><div class="pa-mine-h"><div><h2>Az érdeklődési profilod</h2><p class="muted" style="margin:0">Holland-kódod: ' + codeChips(c) + ' – ' +
        c.split('').map(function (k) { return esc(DIM[k].name); }).join(', ') + '</p></div>' +
        '<div class="pa-acts"><a class="btn primary" href="#/palya/eredmeny">Részletes eredmény →</a><a class="btn" href="#/palya/kerdoiv?uj=1">Újrakitöltés</a></div></div>' + bars(pr, false) + '</section>';
    } else {
      quizBox = '<section class="card pad pa-start"><span class="pa-big">📝</span><div><h2>Érdeklődés-kérdőív</h2><p>24 rövid állítás, mindegyiknél azt jelöld, mennyire jellemző rád. Kb. 4–5 perc. A végén megkapod az érdeklődési profilodat és a hozzá illő pályákat.</p>' +
        '<div class="pa-acts"><a class="btn primary" href="#/palya/kerdoiv">' + (n ? 'Folytatás (' + n + ' / ' + Q.length + ') →' : 'Kitöltöm →') + '</a></div></div></section>';
    }
    main.innerHTML = crumbs() +
      '<section class="learn-hero pa-hero"><h1>🧭 Pályaorientáció</h1><p class="lead">Mi érdekel igazán, és milyen munkák illenek hozzá? Töltsd ki a kérdőívet, vagy böngéssz ' + S.palyak.length + ' pálya leírása között: mit csinál, hogy telik egy napja, és hogyan lehet azzá válni.</p></section>' +
      quizBox +
      '<div class="section-title"><h2>💼 Pályák</h2><span class="muted" id="pa-cnt"></span></div>' +
      '<div class="pa-filters"><input type="search" id="pa-q" class="pa-q" placeholder="🔎 Keresés: pl. autó, kórház, számítógép…" value="' + esc(filt.q) + '">' +
      '<div class="seg" data-f="dim">' + [['', 'Mind']].concat(DIMS.map(function (d) { return [d.k, d.ico + ' ' + d.name]; })).map(function (o) { return '<button type="button" data-v="' + o[0] + '" class="' + (filt.dim === o[0] ? 'on' : '') + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>' +
      '<div class="seg" data-f="szint">' + [['', 'Minden képzés'], ['szakma', '🛠️ Szakma'], ['diploma', '🎓 Diploma']].map(function (o) { return '<button type="button" data-v="' + o[0] + '" class="' + (filt.szint === o[0] ? 'on' : '') + '">' + esc(o[1]) + '</button>'; }).join('') + '</div></div>' +
      '<div class="pa-grid" id="pa-list"></div>' +
      '<section class="note"><p>' + S.inline(DISCLAIMER) + '</p></section>';
    function paint() {
      var q = S.norm(filt.q.trim()), words = q.split(/\s+/).filter(Boolean);
      var list = S.palyak.filter(function (p) {
        if (filt.dim && p.code.indexOf(filt.dim) < 0) return false;
        if (filt.szint && p.szint !== filt.szint && p.szint !== 'vegyes') return false;
        var hay = S.norm([p.title, p.short, p.terulet, p.mit, (p.tantargyak || []).join(' ')].join(' '));
        return words.every(function (w) { return hay.indexOf(w) >= 0; });
      });
      if (filt.dim) list.sort(function (x, y) { return x.code.indexOf(filt.dim) - y.code.indexOf(filt.dim); });
      if (pr) list.sort(function (x, y) { return match(pr, y) - match(pr, x); });
      else if (!filt.dim) list.sort(function (x, y) { return x.title.localeCompare(y.title, 'hu'); });
      main.querySelector('#pa-list').innerHTML = list.length ? list.map(function (p) { return card(p, pr); }).join('') : '<p class="muted">Nincs ilyen pálya a listában. Próbálj másik szűrőt!</p>';
      main.querySelector('#pa-cnt').textContent = list.length + ' pálya' + (pr ? ' · illeszkedés szerint rendezve' : '');
    }
    main.querySelector('#pa-q').addEventListener('input', function () { filt.q = this.value; paint(); });
    Array.prototype.forEach.call(main.querySelectorAll('.pa-filters .seg'), function (box) {
      box.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        filt[box.dataset.f] = b.dataset.v;
        Array.prototype.forEach.call(box.querySelectorAll('button'), function (x) { x.classList.toggle('on', x === b); });
        paint();
      });
    });
    paint();
    return true;
  }

  function pageQuiz(main, params) {
    var a = answers();
    if (params && params.uj) { a = answers().map(function () { return null; }); saveAnswers(a); history.replaceState(null, '', '#/palya/kerdoiv'); }
    var i = a.indexOf(null); if (i < 0) i = 0;
    main.innerHTML = crumbs('Kérdőív') + '<section class="card pad pa-quiz" id="pa-quiz"></section>' +
      '<p class="muted pa-hint">Nincs jó vagy rossz válasz. Ne azt nézd, miben vagy ügyes, hanem azt, mit csinálsz <b>szívesen</b>. Billentyűzettel az 1–5 gombokkal is válaszolhatsz.</p>';
    var box = main.querySelector('#pa-quiz');
    function draw() {
      var q = Q[i], done = answeredCount(a);
      box.innerHTML = '<div class="pa-prog"><span>' + (i + 1) + ' / ' + Q.length + '. állítás</span><span class="pa-pbar"><i style="width:' + Math.round(done / Q.length * 100) + '%"></i></span></div>' +
        '<p class="pa-stmt">' + esc(q[1]) + '</p>' +
        '<div class="pa-scale">' + SCALE.map(function (s) {
          return '<button type="button" class="pa-opt' + (a[i] === s[0] ? ' on' : '') + '" data-v="' + s[0] + '"><b>' + s[0] + '</b><span>' + esc(s[1]) + '</span></button>';
        }).join('') + '</div>' +
        '<div class="pa-nav"><button type="button" class="btn" data-go="-1"' + (i === 0 ? ' disabled' : '') + '>← Vissza</button>' +
        (done === Q.length ? '<a class="btn primary" href="#/palya/eredmeny">Eredményem →</a>' : '<button type="button" class="btn" data-go="1"' + (i === Q.length - 1 ? ' disabled' : '') + '>Tovább →</button>') + '</div>';
    }
    function pick(v) {
      a[i] = v; saveAnswers(a);
      if (answeredCount(a) === Q.length) {
        /* Minden kész: javításnál lépjünk tovább, az utolsónál jöhet az eredmény. */
        if (i < Q.length - 1) { i++; draw(); } else location.hash = '#/palya/eredmeny';
        return;
      }
      for (var k = 1; k <= Q.length; k++) { var j = (i + k) % Q.length; if (a[j] == null) { i = j; break; } }
      draw();
    }
    box.addEventListener('click', function (e) {
      var o = e.target.closest('.pa-opt'); if (o) return pick(+o.dataset.v);
      var g = e.target.closest('[data-go]'); if (g) { i = Math.max(0, Math.min(Q.length - 1, i + +g.dataset.go)); draw(); }
    });
    function onKey(e) {
      if (!document.body.contains(box)) { document.removeEventListener('keydown', onKey); return; }
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (/^[1-5]$/.test(e.key)) pick(+e.key);
      else if (e.key === 'ArrowLeft' && i > 0) { i--; draw(); }
      else if (e.key === 'ArrowRight' && i < Q.length - 1) { i++; draw(); }
    }
    document.addEventListener('keydown', onKey);
    draw();
    return true;
  }

  function pageResult(main) {
    var pr = profile();
    if (!pr) {
      main.innerHTML = crumbs('Eredmény') + '<div class="empty card pad"><h1>Még nincs eredményed</h1><p>Előbb töltsd ki a 24 állításos kérdőívet (' + answeredCount(answers()) + ' / ' + Q.length + ' kész).</p><a class="btn primary" href="#/palya/kerdoiv">Kérdőív →</a></div>';
      return true;
    }
    var c = code(pr), ranked = S.palyak.slice().sort(function (x, y) { return match(pr, y) - match(pr, x); });
    var spread = Math.max.apply(null, DIMS.map(function (d) { return pr[d.k]; })) - Math.min.apply(null, DIMS.map(function (d) { return pr[d.k]; }));
    main.innerHTML = crumbs('Eredmény') +
      '<h1>Az érdeklődési profilod</h1><p class="lead">A hat terület a pszichológus John L. Holland elméletéből származik (RIASEC). A legerősebb három betű adja a „Holland-kódodat”: ' + codeChips(c) + '</p>' +
      '<div class="pa-res"><section class="card pad pa-chart">' + hexChart(pr, 340) + '</section><section class="card pad">' + bars(pr, true) + '</section></div>' +
      (spread < 20 ? '<div class="note tip"><p>A profilod elég kiegyensúlyozott: sok minden érdekel nagyjából egyformán. Ez nem baj! Érdemes kipróbálni több területet, és figyelni, mi tölt fel igazán.</p></div>' : '') +
      '<div class="section-title"><h2>🎯 Hozzád illő pályák</h2><a href="#/palya">Összes pálya →</a></div>' +
      '<div class="pa-grid">' + ranked.slice(0, 12).map(function (p) { return card(p, pr); }).join('') + '</div>' +
      '<section class="card pad" style="margin-top:18px"><h2 style="margin-top:0">🧭 Hogyan tovább?</h2><ol class="pa-steps">' +
      '<li>Nyisd meg 2–3 illő pálya leírását, és nézd meg, <b>hogy telik egy napja</b> – el tudod képzelni magad benne?</li>' +
      '<li>Próbáld ki a kapcsolódó leckéket és modelleket a programban: ha élvezed, jó jel.</li>' +
      '<li>Kérdezz meg valakit, aki ezt a munkát végzi (rokon, ismerős, nyílt nap, pályaorientációs nap).</li>' +
      '<li>Nézd meg, milyen iskola, technikum vagy egyetemi szak vezet oda – és milyen tantárgyak fontosak hozzá.</li>' +
      '<li>Fél–egy év múlva töltsd ki újra: az érdeklődés változik, és ez teljesen rendben van.</li></ol>' +
      '<div class="pa-acts"><a class="btn" href="#/palya/kerdoiv?uj=1">Újrakitöltés</a><a class="btn" href="#/palya">Minden pálya</a></div></section>' +
      '<section class="note"><p>' + S.inline(DISCLAIMER) + '</p></section>';
    return true;
  }

  function pageCareer(main, id) {
    var p = S.palyaById(id);
    if (!p) return false;
    var pr = profile(), m = pr ? match(pr, p) : null;
    var links = (p.linkek || []).map(S.palyaLink).filter(Boolean);
    var similar = S.palyak.filter(function (x) { return x !== p; }).map(function (x) {
      var s = 0; p.code.split('').forEach(function (k, i) { var j = x.code.indexOf(k); if (j >= 0) s += (3 - i) * (3 - j); });
      return [x, s];
    }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 4).map(function (z) { return z[0]; });
    function list(arr) { return '<ul>' + arr.map(function (t) { return '<li>' + S.inline(t) + '</li>'; }).join('') + '</ul>'; }
    main.innerHTML = crumbs(p.title) +
      '<header class="pa-head"><span class="pa-hi">' + p.icon + '</span><div><h1>' + esc(p.title) + '</h1><p class="lead" style="margin:0">' + esc(p.short) + '</p>' +
      '<div class="pa-tags">' + codeChips(p.code) + '<span class="badge">' + esc(p.terulet) + '</span><span class="badge">' + esc(SZINT[p.szint] || '') + '</span></div></div></header>' +
      '<div class="pa-types">' + p.code.split('').map(function (k) { return '<span style="--pc:' + DIM[k].color + '">' + DIM[k].ico + ' <b>' + esc(DIM[k].name) + '</b> – ' + esc(DIM[k].short) + '</span>'; }).join('') + '</div>' +
      (m != null ? '<div class="pa-fit card"><b>' + m + '%</b><span>illeszkedés az érdeklődési profilodhoz' + (m >= 70 ? ' – ez nagyon közel áll ahhoz, ami érdekel!' : m >= 50 ? ' – részben illik hozzád.' : ' – most kevésbé illik az érdeklődésedhez, de ez változhat.') + '</span></div>' :
        '<div class="pa-fit card"><b>?</b><span>Mennyire illik hozzád? <a href="#/palya/kerdoiv">Töltsd ki a kérdőívet</a>, és itt megjelenik.</span></div>') +
      '<div class="pa-body">' +
      '<section class="card pad"><h2>🛠️ Mit csinál?</h2>' + S.md(p.mit) + '</section>' +
      '<section class="card pad"><h2>🕘 Egy napja</h2>' + S.md(p.nap) + '</section>' +
      '<section class="card pad"><h2>💪 Milyen tulajdonságok kellenek?</h2>' + list(p.tulajdonsagok) + '</section>' +
      '<section class="card pad"><h2>🎓 Hogyan lehet azzá válni?</h2><ol class="pa-steps">' + p.ut.map(function (t) { return '<li>' + S.inline(t) + '</li>'; }).join('') + '</ol></section>' +
      '<section class="card pad"><h2>📚 Fontos tantárgyak</h2><div class="pa-subj">' + p.tantargyak.map(function (t) { return '<span class="badge">' + esc(t) + '</span>'; }).join('') + '</div></section>' +
      '<section class="card pad"><h2>💰 Kereset és kilátások</h2>' + S.md(p.kereset) + (p.kilatas ? S.md(p.kilatas) : '') +
      '<p class="muted pa-small">Konkrét összegeket szándékosan nem írunk: a bérek gyorsan változnak, és függnek a helytől, a tapasztalattól és a munkáltatótól.</p></section>' +
      '</div>' +
      (links.length ? '<div class="section-title"><h2>🔗 Próbáld ki a programban</h2></div><div class="pa-links">' + links.map(function (l) {
        return '<a class="card pa-link" href="' + l.href + '"><span class="pa-li">' + l.icon + '</span><span><small>' + esc(l.kind) + '</small><b>' + esc(l.title) + '</b></span></a>';
      }).join('') + '</div>' : '') +
      '<div class="section-title"><h2>🧩 Hasonló pályák</h2><a href="#/palya">Összes pálya →</a></div><div class="pa-grid">' + similar.map(function (x) { return card(x, pr); }).join('') + '</div>';
    return true;
  }

  S.addRoute('palya', {
    title: 'Pályaorientáció', nav: '',
    page: function (main, rest, params) {
      if (!rest[0]) return pageHub(main);
      if (rest[0] === 'kerdoiv') return pageQuiz(main, params);
      if (rest[0] === 'eredmeny') return pageResult(main);
      return pageCareer(main, rest[0]);
    }
  });
})();
