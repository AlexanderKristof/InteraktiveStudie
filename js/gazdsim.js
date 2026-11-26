/* Tudásműhely – 📈 Gazdasági szimulátorok (#/szimulatorok, #/szimulatorok/<id>)
 *   tozsde       – Tőzsdejáték kitalált részvényekkel, indexalappal és kötvénnyel (52 hét)
 *   vallalkozas  – Saját vállalkozás: büfé / webshop / bringaszerviz (12 hónap)
 *   koltsegvetes – Családi költségvetés hónapról hónapra (12 hónap)
 * Minden cég, hír és szám KITALÁLT, oktatási célú; a modellek egyszerűsítettek.
 * A játékállás a böngészőben marad (STUDIE.store, kulcs: gazdsim.<id>). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var MONTHS = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];

  /* ---------- segédfüggvények ---------- */
  function grp(n) { return String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function ft(n) { return isFinite(n) ? (Math.round(n) < 0 ? '−' : '') + grp(n) + ' Ft' : '–'; }
  function pc(x, d) { if (!isFinite(x)) return '–'; var v = (x * 100).toFixed(d == null ? 1 : d); return (x < 0 ? '−' : (x > 0 ? '+' : '')) + v.replace('-', '').replace('.', ',') + ' %'; }
  function pcPlain(x, d) { return (x * 100).toFixed(d == null ? 1 : d).replace('.', ',') + ' %'; }
  function short(n) {
    var a = Math.abs(n), s = n < 0 ? '−' : '';
    if (a >= 1e6) return s + (a / 1e6).toFixed(a >= 1e7 ? 1 : 2).replace(/\.?0+$/, '').replace('.', ',') + ' M';
    if (a >= 1e3) return s + Math.round(a / 1e3) + ' e';
    return s + Math.round(a);
  }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function numIn(el, sel, d) { var i = el.querySelector(sel); if (!i) return d; var v = parseFloat(String(i.value).replace(/\s/g, '').replace(',', '.')); return isFinite(v) ? v : d; }
  function mean(a) { return a.length ? a.reduce(function (s, x) { return s + x; }, 0) / a.length : 0; }
  function std(a) { var m = mean(a); return a.length > 1 ? Math.sqrt(a.reduce(function (s, x) { return s + (x - m) * (x - m); }, 0) / (a.length - 1)) : 0; }
  function returns(v) { var r = []; for (var i = 1; i < v.length; i++) r.push(v[i] / v[i - 1] - 1); return r; }
  function maxDD(v) { var pk = v[0], dd = 0; v.forEach(function (x) { pk = Math.max(pk, x); dd = Math.min(dd, x / pk - 1); }); return dd; }
  /* Reprodukálható véletlen (mulberry32): az állapot a mentett játékban van, így újratöltés után is folytatható. */
  function rnd(g) {
    g.r = (g.r + 0x6D2B79F5) | 0; var t = g.r;
    t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function gauss(g) { var u = 1 - rnd(g), v = rnd(g); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function seed() { return (Math.random() * 4294967296) | 0; }
  function load(id) { return S.store.get('gazdsim.' + id, null); }
  function save(id, g) { S.store.set('gazdsim.' + id, g); }
  function stat(items) { return '<div class="w-res gs-stats">' + items.map(function (x) { return '<div' + (x[2] ? ' class="' + x[2] + '"' : '') + '><small>' + esc(x[0]) + '</small><b>' + x[1] + '</b></div>'; }).join('') + '</div>'; }
  function table(list) { return '<table class="pw-table"><tbody>' + list.map(function (r) { return '<tr' + (r[2] ? ' class="' + r[2] + '"' : '') + '><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table>'; }
  function lessonLinks(list) {
    return '<div class="gs-links"><b>📚 Kapcsolódó leckék</b><div class="gs-link-row">' + list.map(function (l) { return '<a class="btn sm" href="' + l[0] + '">' + esc(l[1]) + '</a>'; }).join('') + '</div></div>';
  }
  function seg(name, opts, cur) {
    return '<div class="seg gs-seg" data-seg="' + name + '">' + opts.map(function (o) {
      return '<button type="button" data-val="' + esc(o[0]) + '" class="' + (o[0] === cur ? 'on' : '') + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function field(id, label, val, unit, extra) {
    return '<label class="pw-f"><span>' + esc(label) + '</span><span class="pw-in"><input id="' + id + '" type="number" inputmode="numeric" value="' + val + '"' + (extra || '') + '><small>' + esc(unit || '') + '</small></span></label>';
  }

  /* ---------- SVG-grafikon (vonal / oszlop), húzható-érinthető leolvasóval és táblázatnézettel ----------
   * sp = { labels: [...], series: [{ name, c: 1..4 | 'pos', vals: [...], bar: true }], fmt: fn, zero: true, marks: [{ i, label }], height } */
  /* tengelyfelirat: annyi tizedes, amennyit a lépésköz megkíván (pl. 0,95 M / 1 M / 1,05 M) */
  function axis(v, step, big) {
    if (Math.abs(v) < step / 1e6) return '0';
    var u = big >= 1e6 ? 1e6 : big >= 1e4 ? 1e3 : 1, suf = u === 1e6 ? ' M' : u === 1e3 ? ' e' : '';
    var dec = Math.max(0, Math.min(3, -Math.floor(Math.log(step / u) / Math.LN10 + 1e-9)));
    var t = (Math.abs(v) / u).toFixed(dec).replace('.', ',');
    return (v < 0 && Math.abs(v) > step / 1e6 ? '−' : '') + t + suf;
  }
  function niceStep(x) { if (!(x > 0)) return 1; var p = Math.pow(10, Math.floor(Math.log(x) / Math.LN10)), f = x / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p; }
  function chart(el, sp) {
    var fmt = sp.fmt || ft, n = sp.labels.length;
    var W = Math.max(300, Math.round(el.clientWidth || 600)), H = sp.height || 230, L = 50, R = 14, T = 14, B = 28;
    var pw = W - L - R, ph = H - T - B, hasBar = sp.series.some(function (s) { return s.bar; });
    var all = []; sp.series.forEach(function (s) { s.vals.forEach(function (v) { if (isFinite(v)) all.push(v); }); });
    if (sp.zero || hasBar) all.push(0);
    var mn = Math.min.apply(null, all.length ? all : [0]), mx = Math.max.apply(null, all.length ? all : [1]);
    if (mx === mn) { mx += Math.abs(mx) * 0.1 || 1; mn -= Math.abs(mn) * 0.1 || 0; }
    var step = niceStep((mx - mn) / 4), lo = Math.floor(mn / step) * step, hi = Math.ceil(mx / step) * step;
    function y(v) { return T + ph - (v - lo) / (hi - lo) * ph; }
    var band = pw / Math.max(1, n);
    function x(i) { return hasBar ? L + band * (i + 0.5) : L + (n <= 1 ? pw / 2 : i * pw / (n - 1)); }
    var s = '';
    for (var v = lo; v <= hi + step / 2; v += step) {
      s += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v).toFixed(1) + '" y2="' + y(v).toFixed(1) + '" class="' + (Math.abs(v) < step / 1e6 ? 'gs-zero' : 'gs-grid') + '"/>' +
        '<text x="' + (L - 6) + '" y="' + (y(v) + 4).toFixed(1) + '" text-anchor="end" class="gs-ax">' + esc(axis(v, step, Math.max(Math.abs(lo), Math.abs(hi)))) + '</text>';
    }
    var every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(pw / 58))));
    sp.labels.forEach(function (lb, i) {
      if (i % every === 0) s += '<text x="' + x(i).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="' + (x(i) > W - 30 ? 'end' : i === 0 && !hasBar ? 'start' : 'middle') + '" class="gs-ax">' + esc(lb) + '</text>';
    });
    (sp.marks || []).forEach(function (m) {
      var mxp = L + (n <= 1 ? 0 : m.i * pw / (n - 1));
      s += '<line x1="' + mxp.toFixed(1) + '" x2="' + mxp.toFixed(1) + '" y1="' + T + '" y2="' + (T + ph) + '" class="gs-mark"/>' +
        '<text x="' + (mxp + (m.i > (n - 1) * 0.7 ? -4 : 4)).toFixed(1) + '" y="' + (m.row ? T + ph - 6 : T + 12) + '" text-anchor="' + (m.i > (n - 1) * 0.7 ? 'end' : 'start') + '" class="gs-mark-t">' + esc(m.label) + '</text>';
    });
    sp.series.forEach(function (se) {
      if (se.bar) {
        var bw = Math.min(26, band * 0.62);
        se.vals.forEach(function (v, i) {
          if (!isFinite(v)) return;
          var y0 = y(0), y1 = y(v), h = Math.max(1, Math.abs(y1 - y0));
          s += '<rect x="' + (x(i) - bw / 2).toFixed(1) + '" y="' + Math.min(y0, y1).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="3" class="' + (v >= 0 ? 'gs-pos' : 'gs-neg') + '"/>';
        });
      } else {
        var d = se.vals.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(' ');
        s += '<path d="' + d + '" class="gs-line gs-c' + se.c + (se.dash ? ' gs-dash' : '') + '"/>';
        if (se.vals.length === 1) s += '<circle cx="' + x(0) + '" cy="' + y(se.vals[0]) + '" r="4" class="gs-dot gs-f' + se.c + '"/>';
      }
    });
    s += '<line class="gs-guide" x1="0" x2="0" y1="' + T + '" y2="' + (T + ph) + '" visibility="hidden"/><g class="gs-dots"></g>' +
      '<rect x="' + L + '" y="' + T + '" width="' + pw + '" height="' + ph + '" fill="transparent" class="gs-hit"/>';
    var legend = sp.series.length > 1 ? '<div class="gs-legend">' + sp.series.map(function (se) {
      return '<span><i class="gs-sw ' + (se.bar ? 'gs-swbar' : 'gs-f' + se.c) + (se.dash ? ' gs-swdash' : '') + '"></i>' + esc(se.name) + '</span>';
    }).join('') + '</div>' : '';
    var tbl = '<details class="gs-tbl"><summary>Adatok táblázatban</summary><div class="gs-tbl-wrap"><table class="pw-table"><thead><tr><th></th>' +
      sp.series.map(function (se) { return '<th>' + esc(se.name) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      sp.labels.map(function (lb, i) { return '<tr><td>' + esc(lb) + '</td>' + sp.series.map(function (se) { return '<td>' + esc(fmt(se.vals[i])) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div></details>';
    el.innerHTML = (sp.title ? '<div class="gs-ctitle">' + esc(sp.title) + '</div>' : '') + legend +
      '<div class="gs-plot"><svg class="gs-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(sp.title || 'grafikon') + '">' + s + '</svg><div class="gs-tip" hidden></div></div>' + tbl;
    var svg = el.querySelector('svg'), tip = el.querySelector('.gs-tip'), guide = el.querySelector('.gs-guide'), dots = el.querySelector('.gs-dots'), plot = el.querySelector('.gs-plot');
    function show(e) {
      var r = svg.getBoundingClientRect(); if (!r.width || !n) return;
      var px = (e.clientX - r.left) * W / r.width;
      var i = hasBar ? Math.floor((px - L) / band) : Math.round((px - L) / (n <= 1 ? 1 : pw / (n - 1)));
      i = clamp(i, 0, n - 1);
      var gx = x(i);
      guide.setAttribute('x1', gx); guide.setAttribute('x2', gx); guide.setAttribute('visibility', 'visible');
      dots.innerHTML = sp.series.filter(function (se) { return !se.bar && isFinite(se.vals[i]); }).map(function (se) {
        return '<circle cx="' + gx.toFixed(1) + '" cy="' + y(se.vals[i]).toFixed(1) + '" r="4.5" class="gs-dot gs-f' + se.c + '"/>';
      }).join('');
      tip.innerHTML = '<b>' + esc(sp.labels[i]) + '</b>' + sp.series.map(function (se) {
        return '<div><i class="gs-sw ' + (se.bar ? 'gs-swbar' : 'gs-f' + se.c) + '"></i>' + esc(se.name) + ': <b>' + esc(fmt(se.vals[i])) + '</b></div>';
      }).join('');
      tip.hidden = false;
      var cx = gx / W * r.width, tw = tip.offsetWidth, pr = plot.clientWidth;
      tip.style.left = clamp(cx > pr / 2 ? cx - tw - 10 : cx + 10, 0, Math.max(0, pr - tw)) + 'px';
    }
    function hide() { tip.hidden = true; guide.setAttribute('visibility', 'hidden'); dots.innerHTML = ''; }
    svg.addEventListener('pointermove', show); svg.addEventListener('pointerdown', show); svg.addEventListener('pointerleave', hide);
  }

  /* ======================================================================
   * 1. TŐZSDEJÁTÉK
   * ====================================================================== */
  /* Heti hozam = mu + béta · piaci sokk + sigma · egyedi sokk (+ hír). Évesítve: mu·52 ≈ várható hozam, szórás·√52 ≈ éves kockázat. */
  var STOCKS = [
    { id: 'napf', name: 'Napfény Energia', sec: 'Megújuló energia', ico: '☀️', p0: 4200, mu: 0.0018, sig: 0.050, beta: 1.1 },
    { id: 'keks', name: 'Ropogós Keksz', sec: 'Élelmiszer', ico: '🍪', p0: 2800, mu: 0.0010, sig: 0.020, beta: 0.6 },
    { id: 'pixl', name: 'Pixelfa Games', sec: 'Videojáték', ico: '🎮', p0: 1500, mu: 0.0016, sig: 0.070, beta: 1.4 },
    { id: 'vasu', name: 'Sínen Logisztika', sec: 'Szállítmányozás', ico: '🚆', p0: 3600, mu: 0.0012, sig: 0.032, beta: 1.0 },
    { id: 'gyog', name: 'Zöldkereszt Gyógyszer', sec: 'Egészségügy', ico: '💊', p0: 9800, mu: 0.0015, sig: 0.030, beta: 0.7 },
    { id: 'robo', name: 'RoboKert Tech', sec: 'Technológia', ico: '🤖', p0: 950, mu: 0.0024, sig: 0.075, beta: 1.5 },
    { id: 'bank', name: 'Tulipán Bank', sec: 'Pénzügy', ico: '🌷', p0: 5400, mu: 0.0012, sig: 0.038, beta: 1.2 }
  ];
  var IDX = { id: 'idx', name: 'Tízes Indexalap', sec: 'Mind a 7 részvény egyenlő súllyal', ico: '🧺', p0: 1000, fund: true };
  var BOND = { id: 'bond', name: 'Biztos Kötvény', sec: 'Állampapír-szerű, évi 5 % fix kamat', ico: '🏛️', p0: 1000, fund: true };
  var ASSETS = STOCKS.concat([IDX, BOND]);
  var WEEKS = 52, START = 1000000, FEE = 0.005, FEEMIN = 150, IDXFEE = 0.002;
  var NEWS = [
    ['napf', 0.12, 'A Napfény Energia óriási napelempark-szerződést nyert.'],
    ['napf', -0.10, 'Felhős nyár: a Napfény Energia gyengébb termelésről számolt be.'],
    ['keks', 0.05, 'A Ropogós Keksz új zabkekszét kapkodják a boltokban.'],
    ['keks', -0.06, 'Drágult a liszt: a Ropogós Keksz kisebb nyereségre figyelmeztet.'],
    ['pixl', 0.25, 'Kirobbanó siker a Pixelfa Games új játéka!'],
    ['pixl', -0.22, 'A Pixelfa Games egy évvel elhalasztotta a várva várt játékát.'],
    ['vasu', 0.07, 'A Sínen Logisztika ötéves szállítási szerződést kötött.'],
    ['vasu', -0.08, 'Sztrájk bénította meg a Sínen Logisztika raktárait.'],
    ['gyog', 0.15, 'Sikeres klinikai vizsgálat a Zöldkereszt Gyógyszernél.'],
    ['gyog', -0.18, 'Nem kapott engedélyt a Zöldkereszt Gyógyszer új készítménye.'],
    ['robo', 0.30, 'A RoboKert Tech fűnyíró robotja lett az év terméke.'],
    ['robo', -0.35, 'Gyártási hiba: a RoboKert Tech visszahívja a termékeit.'],
    ['bank', 0.06, 'A Tulipán Bank a vártnál nagyobb nyereséget jelentett.'],
    ['bank', -0.09, 'Felügyeleti bírságot kapott a Tulipán Bank.'],
    ['*', -0.06, 'Kamatemelés és gazdasági aggodalmak: szinte minden részvény esik.'],
    ['*', 0.06, 'Jó gazdasági adatok: a piac felfelé tör.'],
    ['*', -0.12, 'Pánik a piacokon! Egy nagy (kitalált) külföldi cég csődje mindenkit megijesztett.'],
    ['*', 0.07, 'Megkönnyebbülés: csökkennek a kamatok, a részvények emelkednek.'],
    ['*', 0.05, 'Rekordot döntött a fogyasztás: a befektetők optimisták.']
  ];
  function riskLabel(a) { if (a.id === 'bond') return ['nagyon alacsony', 'r0']; if (a.id === 'idx') return ['közepes (szórt)', 'r1']; return a.sig < 0.035 ? ['közepes', 'r1'] : a.sig < 0.06 ? ['magas', 'r2'] : ['nagyon magas', 'r3']; }
  function assetById(id) { return ASSETS.filter(function (a) { return a.id === id; })[0]; }

  function tNew() {
    var g = { v: 1, r: seed(), week: 0, cash: START, prices: {}, hold: {}, fees: 0, trades: 0, sel: 'idx', amt: 100000, news: [], done: false };
    ASSETS.forEach(function (a) { g.prices[a.id] = a.p0; g.hold[a.id] = 0; });
    g.benchUnits = START * (1 - FEE) / IDX.p0;
    g.hist = { value: [START], bench: [START], p: {} };
    ASSETS.forEach(function (a) { g.hist.p[a.id] = [a.p0]; });
    return g;
  }
  function tValue(g) { return g.cash + ASSETS.reduce(function (s, a) { return s + g.hold[a.id] * g.prices[a.id]; }, 0); }
  function tStep(g) {
    var m = gauss(g) * 0.018, news = null, rets = [];
    if (rnd(g) < 0.3) news = NEWS[Math.floor(rnd(g) * NEWS.length)];
    STOCKS.forEach(function (s) {
      var r = s.mu + s.beta * m + s.sig * gauss(g);
      if (news && (news[0] === s.id || news[0] === '*')) r += news[1] * (news[0] === '*' ? s.beta : 1);
      r = Math.max(r, -0.6);
      g.prices[s.id] = Math.max(1, g.prices[s.id] * (1 + r)); rets.push(r);
    });
    g.prices.idx *= 1 + mean(rets) - IDXFEE / 52;
    g.prices.bond *= 1 + 0.05 / 52;
    g.week++;
    if (news) g.news.unshift({ w: g.week, a: news[0], d: news[1], t: news[2] });
    g.news = g.news.slice(0, 12);
    g.hist.value.push(tValue(g)); g.hist.bench.push(g.benchUnits * g.prices.idx);
    ASSETS.forEach(function (a) { g.hist.p[a.id].push(g.prices[a.id]); });
    if (g.week >= WEEKS) g.done = true;
  }
  function tFee(v) { return Math.max(FEEMIN, v * FEE); }

  function tozsde(box) {
    var g = load('tozsde'); if (!g || g.v !== 1) { g = tNew(); save('tozsde', g); }
    var msg = '';
    function render() {
      var val = tValue(g), bench = g.hist.bench[g.hist.bench.length - 1], a = assetById(g.sel), w = g.week;
      var ch = function (id) { var h = g.hist.p[id]; return h.length > 1 ? h[h.length - 1] / h[h.length - 2] - 1 : 0; };
      var held = ASSETS.filter(function (x) { return g.hold[x.id] > 0; });
      box.innerHTML =
        '<div class="note warn"><b class="t">🎲 Ez játék, nem befektetési tanács!</b><p>Minden cég, árfolyam és hír kitalált. A valódi tőzsdén is igaz azonban: a múltbeli hozam nem garancia a jövőre, és amit nem értesz, abba ne fektess.</p></div>' +
        stat([['Hét', w + ' / ' + WEEKS], ['Készpénz', ft(g.cash)], ['Portfóliód értéke', ft(val)], ['Hozamod', pc(val / START - 1), val >= START ? 'gs-up' : 'gs-down'], ['Ha mindent indexbe tettél volna', pc(bench / START - 1), bench >= START ? 'gs-up' : 'gs-down']]) +
        (g.news.length && g.news[0].w === w ? '<div class="gs-news"><b>📰 A hét híre:</b> ' + esc(g.news[0].t) + '</div>' : (w ? '<div class="gs-news gs-quiet">📰 Ezen a héten nem volt nagy hír – az árak „maguktól” is ingadoznak.</div>' : '<div class="gs-news">👋 Van <b>' + ft(START) + '</b> játékpénzed. Válassz befektetést a listából, vásárolj, majd lépj a következő hétre!</div>')) +
        '<div class="card gs-card"><div class="gs-chart" id="gs-t-ch"></div></div>' +
        '<div class="gs-cols"><div>' +
        '<h3 class="gs-h">Befektetések</h3><div class="gs-assets">' + ASSETS.map(function (x) {
          var c = ch(x.id), rk = riskLabel(x), hv = g.hold[x.id] * g.prices[x.id];
          return '<button type="button" class="gs-asset' + (x.id === g.sel ? ' on' : '') + '" data-asset="' + x.id + '"><span class="gs-a-ico">' + x.ico + '</span>' +
            '<span class="gs-a-main"><b>' + esc(x.name) + '</b><small>' + esc(x.sec) + ' · kockázat: <span class="gs-risk ' + rk[1] + '">' + rk[0] + '</span></small></span>' +
            '<span class="gs-a-num"><b>' + ft(g.prices[x.id]) + '</b><small class="' + (c > 0 ? 'gs-up' : c < 0 ? 'gs-down' : '') + '">' + (w ? pc(c) : '–') + '</small>' + (hv > 0 ? '<small>tiéd: ' + ft(hv) + '</small>' : '') + '</span></button>';
        }).join('') + '</div></div>' +
        '<div><h3 class="gs-h">' + a.ico + ' ' + esc(a.name) + '</h3><div class="card gs-card">' +
        '<div class="gs-chart" id="gs-t-ach"></div>' +
        '<p class="gs-small">Van belőle: <b>' + grp(g.hold[a.id]) + ' db</b> (' + ft(g.hold[a.id] * g.prices[a.id]) + '). Díj minden vételnél és eladásnál: ' + pcPlain(FEE) + ', legalább ' + ft(FEEMIN) + '.</p>' +
        (g.done ? '' : field('gs-t-amt', 'Összeg', g.amt, 'Ft', ' min="0" step="10000"') +
          '<div class="gs-quick">' + [50000, 100000, 250000].map(function (q) { return '<button type="button" class="btn sm" data-amt="' + q + '">' + grp(q) + '</button>'; }).join('') + '<button type="button" class="btn sm" data-amt="max">Az összes készpénz</button></div>' +
          '<div class="row gs-trade"><button type="button" class="btn primary" data-act="buy">Vétel</button><button type="button" class="btn" data-act="sell">Eladás</button><button type="button" class="btn" data-act="sellall">Mindet eladom</button></div>') +
        (msg ? '<div class="w-msg ' + msg[0] + '">' + msg[1] + '</div>' : '') +
        '</div>' +
        (held.length ? '<h3 class="gs-h">Portfóliód összetétele</h3><div class="gs-bars">' + held.concat([{ id: '_cash', name: 'Készpénz' }]).map(function (x) {
          var v = x.id === '_cash' ? g.cash : g.hold[x.id] * g.prices[x.id], sh = v / val;
          return '<div class="gs-barrow"><span>' + esc(x.name) + '</span><span class="gs-bar"><i style="width:' + (sh * 100).toFixed(1) + '%"></i></span><b>' + pcPlain(sh, 0) + '</b></div>';
        }).join('') + '</div>' : '') +
        '</div></div>' +
        (g.done ? tSummary(g) : '<div class="row gs-actions"><button type="button" class="btn primary" data-act="w1">Következő hét ▶</button><button type="button" class="btn" data-act="w4">+4 hét ▶▶</button><button type="button" class="btn" data-act="end">Befejezem most</button><button type="button" class="btn" data-act="new">Új játék</button></div>') +
        (g.news.length ? '<details class="gs-tbl"><summary>📰 Korábbi hírek</summary><ul class="gs-newslist">' + g.news.map(function (n) { return '<li><b>' + n.w + '. hét:</b> ' + esc(n.t) + '</li>'; }).join('') + '</ul></details>' : '') +
        '<div class="card pad gs-learn"><h3>💡 Mit érdemes figyelni?</h3><ul>' +
        '<li><b>Kockázat = ingadozás.</b> A RoboKert vagy a Pixelfa nagyot nyerhet, de nagyot is bukhat. A Ropogós Keksz unalmasabb, de nyugodtabb.</li>' +
        '<li><b>Diverzifikáció:</b> az indexalap mind a 7 céget tartalmazza, ezért egy-egy cég rossz híre csak kicsit húzza le. A piac egészét érintő hírek ellen viszont ez sem véd.</li>' +
        '<li><b>A hír már az árban van:</b> mire elolvasod, az árfolyam már reagált. Utána kapkodni ritkán éri meg.</li>' +
        '<li><b>A díjak összeadódnak:</b> minden adás-vétel pénzbe kerül – a sok kereskedés a hozamot eszi.</li>' +
        '<li><b>Kötvény:</b> kisebb, de kiszámítható hozam. Egy vegyes portfólió (részvény + kötvény) kevésbé ingadozik.</li></ul>' +
        lessonLinks([['#/lecke/penzugy/befektetes', 'Befektetés alapjai'], ['#/lecke/penzugy/kamat-inflacio', 'Kamat és infláció'], ['#/lecke/penz-mindennap/megtakaritas-ongondoskodas', 'Megtakarítás, öngondoskodás'], ['#/egyetem/vallalati-penzugy', '🎓 Vállalati pénzügyek'], ['#/egyetem/msc-halado-penzugy', '🎓 Haladó pénzügyek']]) + '</div>';
      var labels = g.hist.value.map(function (v, i) { return i + '. hét'; });
      chart(box.querySelector('#gs-t-ch'), { title: 'Portfóliód értéke vs. „csak indexalap” stratégia', labels: labels,
        series: [{ name: 'Portfóliód', c: 1, vals: g.hist.value }, { name: 'Csak indexalap (összehasonlítás)', c: 2, vals: g.hist.bench, dash: true }] });
      chart(box.querySelector('#gs-t-ach'), { title: 'Árfolyam (Ft / db)', labels: labels, height: 170, series: [{ name: a.name, c: 3, vals: g.hist.p[a.id] }] });
    }
    function trade(kind) {
      var a = assetById(g.sel), p = g.prices[a.id], amt = numIn(box, '#gs-t-amt', g.amt), q, v, f;
      g.amt = amt;
      if (kind === 'buy') {
        q = Math.floor(Math.min(amt, g.cash) / p);
        while (q > 0 && q * p + tFee(q * p) > g.cash) q--;
        if (q <= 0) { msg = ['bad', 'Ehhez nincs elég készpénzed (az árat és a díjat is ki kell fizetni).']; return; }
        v = q * p; f = tFee(v); g.cash -= v + f; g.hold[a.id] += q;
        msg = ['ok', 'Vettél ' + grp(q) + ' db-ot: ' + ft(v) + ' + ' + ft(f) + ' díj.'];
      } else {
        q = kind === 'sellall' ? g.hold[a.id] : Math.min(g.hold[a.id], Math.ceil(amt / p));
        if (q <= 0) { msg = ['bad', 'Ebből nincs eladható darabod.']; return; }
        v = q * p; f = Math.min(v, tFee(v)); g.cash += v - f; g.hold[a.id] -= q;
        msg = ['ok', 'Eladtál ' + grp(q) + ' db-ot: ' + ft(v) + ', díj: ' + ft(f) + '.'];
      }
      g.fees += f; g.trades++;
      g.hist.value[g.hist.value.length - 1] = tValue(g);
    }
    box.onclick = function (e) {
      var b = e.target.closest('button'); if (!b || !box.contains(b)) return;
      if (b.dataset.asset) { g.sel = b.dataset.asset; msg = ''; }
      else if (b.dataset.amt) { var i = box.querySelector('#gs-t-amt'); if (i) i.value = b.dataset.amt === 'max' ? Math.floor(g.cash) : b.dataset.amt; g.amt = numIn(box, '#gs-t-amt', 0); return; }
      else {
        var act = b.dataset.act; if (!act) return;
        msg = '';
        if (act === 'buy' || act === 'sell' || act === 'sellall') trade(act);
        else if (act === 'w1') tStep(g);
        else if (act === 'w4') { for (var k = 0; k < 4 && !g.done; k++) tStep(g); }
        else if (act === 'end') { if (!g.week) { msg = ['warn', 'Legalább egy hetet játssz!']; } else g.done = true; }
        else if (act === 'new') { if (g.week && !g.done && !window.confirm('Biztosan új játékot kezdesz? A mostani elvész.')) return; g = tNew(); }
      }
      save('tozsde', g); render();
    };
    box.oninput = function (e) { if (e.target.id === 'gs-t-amt') { g.amt = numIn(box, '#gs-t-amt', 0); save('tozsde', g); } };
    render();
  }
  function tSummary(g) {
    var v = g.hist.value, b = g.hist.bench, rv = returns(v), rb = returns(b);
    var ret = v[v.length - 1] / START - 1, retB = b[b.length - 1] / START - 1;
    var volV = std(rv) * Math.sqrt(52), volB = std(rb) * Math.sqrt(52), ddV = maxDD(v), ddB = maxDD(b);
    var val = tValue(g), shares = ASSETS.map(function (a) { return g.hold[a.id] * g.prices[a.id] / val; }), top = Math.max.apply(null, shares);
    var topA = ASSETS[shares.indexOf(top)], cashSh = g.cash / val, n = shares.filter(function (s) { return s > 0.02; }).length;
    var tips = [];
    tips.push(ret >= retB ? 'Most <b>jobban jártál</b>, mint az egyszerű indexalap (' + pc(ret) + ' vs. ' + pc(retB) + '). Ebben a szerencse is benne van: a valóságban a profi alapkezelők többsége sem veri tartósan az indexet.' :
      'Az egyszerű, „vedd meg és felejtsd el” indexalap <b>jobb volt</b> (' + pc(retB) + ' vs. ' + pc(ret) + '). Ez a valóságban is gyakori: a sok döntés és kapkodás ritkán hoz többet.');
    if (volV > volB * 1.3) tips.push('Portfóliód ingadozása (évesítve ' + pcPlain(volV) + ') jóval nagyobb volt, mint az indexé (' + pcPlain(volB) + '). Nagyobb kockázatot vállaltál – ez nagyobb nyereséget <b>és</b> nagyobb veszteséget is hozhat.');
    else if (volV < volB * 0.7) tips.push('Portfóliód nyugodtabb volt az indexnél (ingadozás: ' + pcPlain(volV) + ' vs. ' + pcPlain(volB) + ') – valószínűleg sok kötvényt vagy készpénzt tartottál. Kisebb kockázat, általában kisebb hozam.');
    if (top > 0.5 && topA && topA.id !== 'idx' && topA.id !== 'bond') tips.push('A pénzed több mint fele egyetlen cégben (' + esc(topA.name) + ') volt. Ez a „minden tojás egy kosárban” hiba: egy rossz hír az egész vagyonodat megrázhatja.');
    if (cashSh > 0.4) tips.push('A pénzed ' + pcPlain(cashSh, 0) + '-a készpénzben maradt. A valóságban a készpénzt az infláció lassan „megeszi”.');
    if (g.fees > START * 0.01) tips.push('Kereskedési díjakra ' + ft(g.fees) + ' ment el (' + g.trades + ' tranzakció). Ez a kezdőtőke ' + pcPlain(g.fees / START) + '-a – a gyakori adás-vétel drága.');
    if (n >= 4 || shares[ASSETS.indexOf(IDX)] > 0.4) tips.push('Jól szórtad a pénzed – így egy-egy cég bajától kevésbé sérülsz.');
    return '<div class="card pad gs-summary"><h2>🎓 Mit tanultál?</h2>' +
      stat([['Végső érték', ft(v[v.length - 1])], ['Hozamod', pc(ret), ret >= 0 ? 'gs-up' : 'gs-down'], ['Indexalap hozama', pc(retB), retB >= 0 ? 'gs-up' : 'gs-down'], ['Legnagyobb visszaesésed', pc(ddV)], ['Index legnagyobb visszaesése', pc(ddB)], ['Fizetett díjak', ft(g.fees)]]) +
      '<ul>' + tips.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
      '<p class="gs-small"><b>Legnagyobb visszaesés:</b> a csúcsról mért legnagyobb esés – ezt kell „kibírni” idegekkel. <b>Ingadozás (szórás):</b> a heti hozamok szórása × √52, a kockázat szokásos mérőszáma.</p>' +
      '<div class="row"><button type="button" class="btn primary" data-act="new">Új játék (új véletlen piac)</button></div></div>';
  }

  /* ======================================================================
   * 2. SAJÁT VÁLLALKOZÁS
   * ====================================================================== */
  /* Kereslet = alap · szezon(hónap) · (ár / referenciaár)^(−e) · marketinghatás · hírnév · véletlen(±10 %).
   * e = árrugalmasság (1 % áremelés kb. e %-kal csökkenti a keresett mennyiséget). Marketing: csökkenő határhaszon. */
  var BIZ = {
    bufe: { name: 'Iskolai büfé', ico: '🥪', unit: 'menü', units: 'menü (szendvics + ital)', ref: 900, cost: 380, base: 2000, e: 1.8, spoil: 0.8, fixed: 140000, cap0: 700, capE: 1000, wage: 360000, mk: 60000, cash0: 1200000,
      season: [1, 1, 1.05, 1, 1.05, 0.9, 0.2, 0.2, 1.1, 1.05, 1, 0.85],
      desc: 'Friss szendvicsek és italok egy nagy gimnázium mellett. A friss áru romlandó: ami a hónap végén megmarad, annak 80 %-át ki kell dobni. Nyáron alig van vevő.' },
    webshop: { name: 'Pólós webshop', ico: '👕', unit: 'póló', units: 'póló', ref: 6990, cost: 3400, base: 170, e: 2.2, spoil: 0, fixed: 120000, cap0: 250, capE: 400, wage: 360000, mk: 80000, cash0: 1200000,
      season: [0.7, 0.7, 0.85, 0.95, 1, 1.1, 1.1, 1, 0.95, 1, 1.4, 1.9],
      desc: 'Saját tervezésű pólók online. A beszerzési ár a csomagolást és a szállítást is tartalmazza. Online a vevők könnyen összehasonlítják az árakat (nagy árrugalmasság). Karácsony előtt csúcsszezon.' },
    szerviz: { name: 'Bringaszerviz', ico: '🚲', unit: 'javítás', units: 'javítás (alkatrészcsomag)', ref: 8000, cost: 2200, base: 220, e: 1.4, spoil: 0, fixed: 220000, cap0: 110, capE: 150, wage: 380000, mk: 50000, cash0: 1000000,
      season: [0.35, 0.45, 0.9, 1.4, 1.6, 1.5, 1.4, 1.3, 1.1, 0.8, 0.5, 0.4],
      desc: 'Kerékpárjavító műhely. Minden javításhoz egy alkatrészcsomag kell (ez a készlet). Tavasszal és nyáron sorban állnak, télen alig jön valaki.' }
  };
  var TAX = 0.09;
  function bDemand(T, g, d, noise) {
    var mi = g.month % 12;
    return T.base * T.season[mi] * Math.pow(d.price / T.ref, -T.e) * (1 + 0.35 * (1 - Math.exp(-d.mkt / T.mk))) * g.rep * (noise == null ? 1 : noise);
  }
  function bNew(type) {
    var T = BIZ[type];
    return { v: 1, type: type, r: seed(), month: 0, cash: T.cash0, stock: 0, rep: 1, hist: [], done: false, broke: false,
      d: { price: T.ref, buy: Math.round(T.base * T.season[0] / 10) * 10, mkt: 0, staff: 1 } };
  }
  function bStep(g, d) {
    var T = BIZ[g.type], o = { m: g.month, price: d.price, buy: d.buy, mkt: d.mkt, staff: d.staff, open: g.cash };
    o.buyCost = d.buy * T.cost; g.cash -= o.buyCost; g.stock += d.buy;
    o.cap = T.cap0 + d.staff * T.capE;
    o.demand = Math.round(bDemand(T, g, d, 0.9 + 0.2 * rnd(g)));
    o.sold = Math.min(o.demand, g.stock, o.cap);
    g.stock -= o.sold;
    o.waste = T.spoil ? Math.round(g.stock * T.spoil) : 0; g.stock -= o.waste;
    o.rev = o.sold * d.price; o.cogs = o.sold * T.cost; o.wasteCost = o.waste * T.cost;
    o.margin = o.rev - o.cogs;
    o.wage = d.staff * T.wage; o.fixed = T.fixed;
    o.ebt = o.margin - o.wasteCost - o.wage - o.fixed - d.mkt;
    o.tax = o.ebt > 0 ? Math.round(o.ebt * TAX) : 0;
    o.net = o.ebt - o.tax;
    g.cash += o.rev - o.wage - o.fixed - d.mkt - o.tax;
    o.cash = g.cash; o.stockLeft = g.stock;
    o.lost = o.demand - o.sold;
    o.lostWhy = o.lost > 0 ? (g.stock + o.waste === 0 && o.sold < o.cap ? 'készlet' : 'kapacitás') : '';
    var miss = o.demand ? o.lost / o.demand : 0;
    g.rep += miss > 0.1 ? -0.1 * miss : 0.02;
    if (d.price > T.ref * 1.4) g.rep -= 0.03;
    if (d.mkt > 0) g.rep += 0.01;
    g.rep = clamp(g.rep, 0.7, 1.25); o.rep = g.rep;
    g.hist.push(o); g.month++;
    if (g.cash < 0) { g.broke = true; g.done = true; }
    if (g.month >= 12) g.done = true;
    return o;
  }
  function bIncome(o, T) {
    return table([
      ['Árbevétel (' + grp(o.sold) + ' ' + esc(T.unit) + ' × ' + ft(o.price) + ')', ft(o.rev)],
      ['− Eladott áruk beszerzési értéke', ft(-o.cogs)],
      ['<b>= Árrés (fedezet)</b> · ' + (o.rev ? pcPlain(o.margin / o.rev) : '–') + ' a bevételből', '<b>' + ft(o.margin) + '</b>', 'gs-sub'],
      ['− Kidobott, megromlott készlet', ft(-o.wasteCost)],
      ['− Bérköltség (' + o.staff + ' fő, járulékokkal)', ft(-o.wage)],
      ['− Bérleti díj, rezsi, könyvelő (állandó költség)', ft(-o.fixed)],
      ['− Marketing', ft(-o.mkt)],
      ['<b>= Adózás előtti eredmény</b>', '<b>' + ft(o.ebt) + '</b>', 'gs-sub'],
      ['− Adó (9 %, szemléltető, TAO-szerű)', ft(-o.tax)],
      ['<b>= Adózott eredmény (nyereség / veszteség)</b>', '<b>' + ft(o.net) + '</b>', 'sum']
    ]);
  }
  function bCash(o) {
    return table([
      ['Nyitó pénzkészlet', ft(o.open)],
      ['− Készletvásárlás (hónap elején)', ft(-o.buyCost)],
      ['+ Befolyt bevétel', ft(o.rev)],
      ['− Bérek', ft(-o.wage)],
      ['− Állandó költségek', ft(-o.fixed)],
      ['− Marketing', ft(-o.mkt)],
      ['− Adó', ft(-o.tax)],
      ['<b>= Záró pénzkészlet</b>', '<b>' + ft(o.cash) + '</b>', 'sum']
    ]);
  }

  function vallalkozas(box) {
    var g = load('vallalkozas'); if (g && g.v !== 1) g = null;
    var msg = '', tab = 'eredmeny';
    function pickType() {
      box.innerHTML = '<p class="lead">Milyen vállalkozást indítasz? Mindegyikben 12 hónapig vezeted a céget: te döntöd el az árat, a készletet, a marketinget és a létszámot. Ha elfogy a pénzed, csődbe mész!</p>' +
        '<div class="learn-grid">' + Object.keys(BIZ).map(function (k) {
          var T = BIZ[k];
          return '<button type="button" class="card learn-tile gs-pick" data-type="' + k + '"><span class="ico">' + T.ico + '</span><b>' + esc(T.name) + '</b><small>' + esc(T.desc) + '</small><small>Indulótőke: <b>' + ft(T.cash0) + '</b></small></button>';
        }).join('') + '</div>' +
        '<div class="note"><p>A cégek, az árak és a keresleti modell <b>kitaláltak és egyszerűsítettek</b>. Az árak nettó (áfa nélküli) árak: az áfát a vevőtől beszedjük és befizetjük, nem a mi pénzünk.</p></div>';
    }
    function decisions() {
      var d = g.d;
      d.price = Math.max(1, numIn(box, '#gs-b-price', d.price)); d.buy = Math.max(0, Math.round(numIn(box, '#gs-b-buy', d.buy)));
      d.mkt = Math.max(0, numIn(box, '#gs-b-mkt', d.mkt));
      return d;
    }
    function preview() {
      var T = BIZ[g.type], d = decisions(), out = box.querySelector('#gs-b-prev'); if (!out) return;
      var est = bDemand(T, g, d), cap = T.cap0 + d.staff * T.capE, F = T.fixed + d.staff * T.wage + d.mkt, unitM = d.price - T.cost;
      var bep = unitM > 0 ? F / unitM : Infinity, cost = d.buy * T.cost;
      out.innerHTML = '<div class="gs-prev">' +
        '<div>📊 <b>Piackutatás:</b> ezen az áron ebben a hónapban kb. <b>' + grp(est * 0.9) + '–' + grp(est * 1.1) + '</b> ' + esc(T.unit) + ' iránti kereslet várható.</div>' +
        '<div>👥 <b>Kapacitás:</b> ' + grp(cap) + ' ' + esc(T.unit) + ' / hónap (te + ' + d.staff + ' alkalmazott). Raktáron: ' + grp(g.stock) + ', vásárlás után: ' + grp(g.stock + d.buy) + '.</div>' +
        '<div>⚖️ <b>Fedezeti pont:</b> ' + (isFinite(bep) ? '<b>' + grp(Math.ceil(bep)) + '</b> ' + esc(T.unit) + ' kell eladni, hogy ne legyen veszteség.' : '<b>az ár a beszerzési ár alatt van – minden eladással veszítesz!</b>') + '</div>' +
        (cost > g.cash ? '<div class="w-msg bad">A készletvásárlás (' + ft(cost) + ') több, mint a pénzed (' + ft(g.cash) + ').</div>' : '<div>💳 Készletvásárlás: ' + ft(cost) + ' → utána marad ' + ft(g.cash - cost) + '.</div>') +
        '</div>';
      var ch = box.querySelector('#gs-b-bep');
      if (ch) {
        var qmax = Math.max(isFinite(bep) ? bep * 1.8 : 0, est * 1.3, cap * 0.5, 10), N = 20, lab = [], rv = [], cv = [];
        for (var i = 0; i <= N; i++) { var q = qmax * i / N; lab.push(grp(q) + ' ' + T.unit); rv.push(q * d.price); cv.push(F + q * T.cost); }
        var marks = [];
        if (isFinite(bep) && bep <= qmax) marks.push({ i: bep / qmax * N, label: 'Fedezeti pont ≈ ' + grp(Math.ceil(bep)) });
        marks.push({ i: Math.min(est, cap) / qmax * N, label: 'Várható eladás', row: 1 });
        chart(ch, { title: 'Fedezetipont-grafikon (ezzel az árral és költségekkel)', labels: lab, zero: true, marks: marks,
          series: [{ name: 'Bevétel', c: 1, vals: rv }, { name: 'Összes költség', c: 2, vals: cv }] });
      }
    }
    function render() {
      if (!g) return pickType();
      var T = BIZ[g.type], last = g.hist[g.hist.length - 1], d = g.d;
      var totNet = g.hist.reduce(function (s, o) { return s + o.net; }, 0);
      box.innerHTML =
        '<div class="gs-bizhead"><span class="gs-bizico">' + T.ico + '</span><div><h2>' + esc(T.name) + '</h2><small>' + esc(T.desc) + '</small></div></div>' +
        stat([['Hónap', g.done ? 'vége' : (g.month + 1) + '. (' + MONTHS[g.month % 12] + ')'], ['Pénzkészlet', ft(g.cash), g.cash < 0 ? 'gs-down' : ''], ['Raktáron', grp(g.stock) + ' ' + T.unit], ['Hírnév', Math.round(g.rep * 100) + ' pont'], ['Eddigi nyereség', ft(totNet), totNet >= 0 ? 'gs-up' : 'gs-down']]) +
        (msg ? '<div class="w-msg ' + msg[0] + '">' + msg[1] + '</div>' : '') +
        (g.done ? bSummary(g) :
          '<div class="card pad gs-dec"><h3>🧭 Döntések – ' + MONTHS[g.month % 12] + ' (szezon: ' + (T.season[g.month % 12] >= 1.2 ? 'erős 🔥' : T.season[g.month % 12] <= 0.6 ? 'gyenge ❄️' : 'átlagos') + ')</h3>' +
          '<div class="pw-grid">' + field('gs-b-price', 'Eladási ár (nettó) / ' + T.unit, d.price, 'Ft', ' min="1" step="10"') +
          field('gs-b-buy', 'Készletvásárlás (' + T.cost + ' Ft/db)', d.buy, 'db', ' min="0" step="10"') +
          field('gs-b-mkt', 'Marketing erre a hónapra', d.mkt, 'Ft', ' min="0" step="10000"') +
          '<div class="pw-f"><span>Alkalmazottak (' + ft(T.wage) + '/fő/hó)</span>' + seg('staff', [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3']], String(d.staff)) + '</div></div>' +
          '<div id="gs-b-prev"></div><div class="gs-chart" id="gs-b-bep"></div>' +
          '<div class="row gs-actions"><button type="button" class="btn primary" data-act="month">Hónap lezárása ▶</button><button type="button" class="btn" data-act="new">Másik vállalkozás / újrakezdés</button></div></div>') +
        (last ? '<div class="card pad"><h3>📄 ' + (last.m + 1) + '. hónap (' + MONTHS[last.m % 12] + ') eredménye</h3>' +
          '<p class="gs-small">Kereslet: <b>' + grp(last.demand) + '</b> · eladva: <b>' + grp(last.sold) + '</b>' + (last.lost > 0 ? ' · <span class="gs-down">elvesztett vevők: ' + grp(last.lost) + ' (kevés ' + last.lostWhy + ')</span>' : '') + (last.waste ? ' · kidobva: ' + grp(last.waste) : '') + '</p>' +
          seg('tab', [['eredmeny', 'Eredménykimutatás'], ['cash', 'Pénzforgalom (cash flow)']], tab) +
          '<div class="gs-tabbox">' + (tab === 'cash' ? bCash(last) + '<p class="gs-small">A <b>nyereség nem ugyanaz, mint a pénz!</b> A készletet már a hónap elején kifizetted, de költségként csak akkor jelenik meg, amikor eladod. Ezért lehet egy cég nyereséges, mégis fizetésképtelen.</p>' : bIncome(last, T)) + '</div></div>' : '') +
        (g.hist.length ? '<div class="card pad"><div class="gs-chart" id="gs-b-profit"></div><div class="gs-chart" id="gs-b-cash"></div></div>' : '') +
        '<div class="card pad gs-learn"><h3>💡 Fogalmak röviden</h3><ul>' +
        '<li><b>Árrés (fedezet):</b> bevétel − az eladott áru beszerzési ára. Ebből kell kifizetni minden más költséget.</li>' +
        '<li><b>Állandó (fix) költség:</b> akkor is fizeted, ha semmit sem adsz el (bérleti díj, bérek). <b>Változó költség:</b> darabonként jelentkezik (alapanyag).</li>' +
        '<li><b>Fedezeti pont:</b> fix költség ÷ (ár − egységnyi változó költség). Ennyit kell eladni a nullszaldóhoz.</li>' +
        '<li><b>Árrugalmasság:</b> ha drágítasz, kevesebben vesznek. Ennél a cégnél 1 % áremelés kb. ' + String(T.e).replace('.', ',') + ' %-kal csökkenti a keresletet.</li>' +
        '<li><b>Adó:</b> a 9 % itt csak <b>szemléltető</b> (a magyar társasági adó kulcsa 9 %, de azt évente, sok szabály szerint számolják; kisvállalkozásoknak más adózási formák is vannak, pl. KIVA, átalányadó, és helyi iparűzési adó is lehet).</li></ul>' +
        lessonLinks([['#/lecke/felnott-elet/vallalkozas-indul', 'Vállalkozás indítása'], ['#/lecke/penz-mindennap/afa-szamla', 'ÁFA és számla'], ['#/egyetem/vallalati-penzugy', '🎓 Vállalati pénzügyek'], ['#/egyetem/kozgazdasagtan', '🎓 Közgazdaságtan'], ['#/egyetem/szamvitel', '🎓 Számvitel'], ['#/egyetem/adozas', '🎓 Adózás']]) + '</div>';
      if (!g.done) preview();
      if (g.hist.length) {
        var lab = g.hist.map(function (o) { return MONTHS[o.m % 12].slice(0, 3) + '.'; });
        chart(box.querySelector('#gs-b-profit'), { title: 'Havi adózott eredmény', labels: lab, height: 190, series: [{ name: 'Nyereség / veszteség', bar: true, vals: g.hist.map(function (o) { return o.net; }) }] });
        chart(box.querySelector('#gs-b-cash'), { title: 'Pénzkészlet a hónap végén', labels: lab, height: 190, zero: true, series: [{ name: 'Pénzkészlet', c: 1, vals: g.hist.map(function (o) { return o.cash; }) }] });
      }
    }
    box.onclick = function (e) {
      var b = e.target.closest('button'); if (!b || !box.contains(b)) return;
      if (b.dataset.type) { g = bNew(b.dataset.type); msg = ''; save('vallalkozas', g); return render(); }
      var sg = b.closest('[data-seg]');
      if (sg && sg.dataset.seg === 'staff') { decisions(); g.d.staff = +b.dataset.val; save('vallalkozas', g); sg.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); return preview(); }
      if (sg && sg.dataset.seg === 'tab') { tab = b.dataset.val; return render(); }
      var act = b.dataset.act;
      if (act === 'month') {
        var d = decisions(), T = BIZ[g.type];
        if (d.buy * T.cost > g.cash) { msg = ['bad', 'Nincs elég pénzed ennyi készletre. Vegyél kevesebbet!']; return render(); }
        var o = bStep(g, { price: d.price, buy: d.buy, mkt: d.mkt, staff: d.staff });
        msg = g.broke ? ['bad', '💥 Elfogyott a pénzed – a vállalkozás csődbe ment.'] : [o.net >= 0 ? 'ok' : 'warn', (o.net >= 0 ? '✅ Nyereséges hónap: ' : '⚠️ Veszteséges hónap: ') + ft(o.net)];
        save('vallalkozas', g); render();
      } else if (act === 'new') {
        if (g && !g.done && g.month && !window.confirm('Biztosan újrakezded? A mostani vállalkozás elvész.')) return;
        g = null; msg = ''; S.store.set('gazdsim.vallalkozas', null); render();
      }
    };
    box.oninput = function (e) { if (g && !g.done && /^gs-b-/.test(e.target.id || '')) { preview(); save('vallalkozas', g); } };
    render();
  }
  function bSummary(g) {
    var T = BIZ[g.type], H = g.hist;
    var sum = function (k) { return H.reduce(function (s, o) { return s + o[k]; }, 0); };
    var rev = sum('rev'), margin = sum('margin'), net = sum('net'), lost = sum('lost'), waste = sum('wasteCost'), mkt = sum('mkt'), tax = sum('tax');
    var lossM = H.filter(function (o) { return o.net < 0; }).length, avgP = H.length ? mean(H.map(function (o) { return o.price; })) : T.ref;
    var opt = T.cost * T.e / (T.e - 1), tips = [];
    if (g.broke) tips.push('<b>Csőd:</b> a pénzkészlet 0 alá esett. A cégek gyakran nem a veszteség, hanem a <b>pénzhiány</b> miatt buknak el – például ha túl sok készletet vesznek, vagy a gyenge szezonra nem tesznek félre.');
    if (lost > sum('sold') * 0.1) tips.push('Sok vevőt elvesztettél (' + grp(lost) + '), mert kevés volt a készlet vagy a munkaerő. Az elégedetlen vevők a hírnevet is rontják.');
    if (waste > rev * 0.05) tips.push('A megromlott áru ' + ft(waste) + '-ba került. Romlandó árunál a pontos rendelés (előrejelzés) sokat ér.');
    if (avgP > T.ref * 1.3) tips.push('Átlagosan elég drága voltál (' + ft(avgP) + '). Nagy árrugalmasságnál a magas ár elriasztja a vevőket.');
    if (avgP < T.cost * 1.3) tips.push('Nagyon olcsón adtál (' + ft(avgP) + ') – kicsi az egy darabon lévő árrés, így a fix költségeket nehéz kitermelni.');
    if (mkt > 0 && mkt > margin * 0.25) tips.push('A marketingre költött ' + ft(mkt) + ' sok volt: a reklám hatása csökkenő – az első forintok sokat hoznak, a további egyre kevesebbet.');
    if (lossM) tips.push(lossM + ' veszteséges hónapod volt. A szezonális cégeknél ez természetes – a jó hónapokban kell tartalékolni a rosszakra.');
    if (!tips.length) tips.push('Szépen egyensúlyoztál az ár, a készlet és a kapacitás között. 👏');
    tips.push('🎓 Egyetemi kitekintés: ha a kereslet állandó rugalmasságú (e) és nincs kapacitáskorlát, a nyereséget maximalizáló ár <code>P = c · e / (e − 1)</code>. Itt: ' + ft(T.cost) + ' · ' + String(T.e).replace('.', ',') + ' / ' + String(T.e - 1).replace('.', ',') + ' ≈ <b>' + ft(opt) + '</b>. Ha a kapacitás szűk, érdemes ennél drágábbnak lenni.');
    return '<div class="card pad gs-summary"><h2>🎓 Mit tanultál?</h2>' +
      stat([['Hónapok', H.length + ' / 12'], ['Összes árbevétel', ft(rev)], ['Összes árrés', ft(margin)], ['Befizetett adó', ft(tax)], ['Adózott eredmény', ft(net), net >= 0 ? 'gs-up' : 'gs-down'], ['Záró pénzkészlet', ft(g.cash), g.cash >= 0 ? '' : 'gs-down']]) +
      '<ul>' + tips.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
      '<div class="row"><button type="button" class="btn primary" data-act="new">Új vállalkozás</button></div></div>';
  }

  /* ======================================================================
   * 3. CSALÁDI (SZEMÉLYES) KÖLTSÉGVETÉS
   * ====================================================================== */
  var INCOME = 390000, CARD_RATE = 0.03, SAVE_RATE = 0.004, CARD_LIMIT = 500000;
  var FOOD = [['sp', 'Spórolós (főzök)', 60000, -2], ['at', 'Átlagos', 85000, 0], ['ke', 'Kényelmes (sok rendelés)', 125000, 2]];
  var FUN = [['ke', 'Kevés', 15000, -4], ['koz', 'Közepes', 40000, 1], ['sok', 'Sok', 80000, 3]];
  var GOALS = [['laptop', '💻 Új laptop', 250000], ['nyaralas', '🏖️ Nyaralás a barátokkal', 300000], ['jogsi', '🚗 Jogosítvány', 450000]];
  var PAY = [['min', 'Minimum'], ['20000', '20 000 Ft'], ['all', 'Teljes tartozás']];
  function rezsi(m) { return [48000, 46000, 38000, 30000, 28000, 26000, 26000, 26000, 28000, 32000, 38000, 48000][m % 12]; }
  function fixedList(m) { return [['Albérlet', 150000], ['Rezsi (gáz, villany, víz)', rezsi(m)], ['Telefon + internet', 9000], ['Bérlet', 9000], ['Drogéria, egészség', 12000]]; }
  function fixedSum(m) { return fixedList(m).reduce(function (s, x) { return s + x[1]; }, 0); }
  /* esemény: t szöveg, opts: [felirat, költség, jóllét-változás, (bevétel)], emerg: vésztartalékból fizethető */
  var EVENTS = {
    mosogep: { t: '🧺 Elromlott a mosógép!', emerg: true, opts: [['Megjavíttatom', 35000, 0], ['Új, energiatakarékosat veszek', 130000, 2], ['Egy hónapig a szüleimnél mosok', 6000, -5]] },
    ajandek: { t: '🎁 A legjobb barátod szülinapja jön.', opts: [['Drága ajándék', 25000, 4], ['Közös program, apró ajándék', 9000, 4], ['Saját készítésű ajándék', 2000, 2]] },
    kabat: { t: '🏷️ Akció: a régóta nézett télikabát 40 % kedvezménnyel 27 000 Ft (eredetileg 45 000). A régi még jó…', opts: [['Megveszem – ekkora kedvezmény!', 27000, 2], ['Kihagyom – nincs rá szükségem', 0, 0]] },
    fog: { t: '🦷 Fáj a fogad, fogorvoshoz kellene menned.', emerg: true, opts: [['Elmegyek most', 30000, 0], ['Halogatom', 0, -6]] },
    fog2: { t: '🦷 A halogatott fogad begyulladt: gyökérkezelés kell, azonnal.', emerg: true, opts: [['Kifizetem (nincs más választás)', 95000, -4]] },
    premium: { t: '💰 Jó munkádért 60 000 Ft prémiumot kaptál!', opts: [['Szuper!', 0, 3, 60000]] },
    koncert: { t: '🎤 Kedvenc együttesed koncertet ad a városban.', opts: [['Megyek (jegy + utazás)', 22000, 7], ['Kihagyom', 0, -3]] },
    telefon: { t: '📱 Leejtetted a telefonodat, betört a kijelzője.', emerg: true, opts: [['Kijelzőcsere', 38000, 0], ['Új csúcsmobil', 240000, 5], ['Repedt kijelzővel használom', 0, -4]] },
    visszaterites: { t: '🧾 Visszatérítést kaptál egy lemondott utazás után: +25 000 Ft.', opts: [['Rendben', 0, 1, 25000]] },
    eskuvo: { t: '💒 Unokatestvéred esküvőjére vagy hivatalos.', opts: [['Elmegyek, rendes ajándékkal', 40000, 6], ['Elmegyek, szerényebb ajándékkal', 20000, 5], ['Nem megyek el', 0, -6]] },
    edzoterem: { t: '🏋️ Az edzőterem éves bérletet kínál 20 % kedvezménnyel: 96 000 Ft egyben (havonta 10 000 Ft lenne).', opts: [['Megveszem az éveset', 96000, 4], ['Inkább kocogni járok (ingyen)', 0, 2]] },
    tulora: { t: '⏱️ Túlórát vállalhatsz ebben a hónapban: +45 000 Ft, de fáradtabb leszel.', opts: [['Vállalom', 0, -5, 45000], ['Nem vállalom', 0, 1]] },
    bringa: { t: '🚲 Ellopták a biciklidet a ház elől.', emerg: true, opts: [['Veszek egy használtat', 45000, 0], ['Mostantól busszal járok', 0, -3]] },
    kedvezmeny: { t: '🛒 A szupermarket hűségprogramja 8 000 Ft kupont adott – ennyivel olcsóbb lesz a bevásárlás.', opts: [['Felhasználom', -8000, 1]] }
  };
  var XMAS = { t: '🎄 December: jön a karácsony!', opts: [['Mindenkinek nagy ajándék', 90000, 5], ['Átgondolt, keretösszegű ajándékok', 40000, 6], ['Szinte semmit nem veszek', 5000, -5]] };
  function kEvent(g) {
    if (g.month === 11) return XMAS;
    return g.ev ? EVENTS[g.ev] : null;
  }
  function kRollEvent(g) {
    if (g.month === 11) { g.ev = null; return; }
    if (g.pending && g.pending.m === g.month) { g.ev = g.pending.ev; g.pending = null; return; }
    var keys = Object.keys(EVENTS).filter(function (k) { return k !== 'fog2' && g.seen.indexOf(k) < 0; });
    g.ev = keys.length && rnd(g) < 0.8 ? keys[Math.floor(rnd(g) * keys.length)] : null;
    if (g.ev) g.seen.push(g.ev);
  }
  function kNew(goal) {
    var g = { v: 1, r: seed(), month: 0, goal: goal, cur: 30000, fund: 0, save: 0, debt: 60000, wb: 60, hist: [], seen: [], pending: null, done: false, broke: false,
      interest: 0, tot: { fix: 0, food: 0, fun: 0, ev: 0, card: 0 }, d: { food: 'at', fun: 'koz', toFund: 20000, toGoal: 20000, pay: 'min', useFund: true, choice: -1 } };
    kRollEvent(g);
    return g;
  }
  function kMinPay(debt) { return Math.min(debt, Math.max(5000, Math.round(debt * 0.05))); }
  function kPay(g, d) { return d.pay === 'all' ? g.debt : d.pay === 'min' ? kMinPay(g.debt) : Math.min(g.debt, +d.pay); }
  function kCalc(g, d) {
    /* a hónap elszámolása, g módosítása nélkül */
    var ev = kEvent(g), opt = ev && d.choice >= 0 ? ev.opts[d.choice] : null;
    var f = FOOD.filter(function (x) { return x[0] === d.food; })[0], fu = FUN.filter(function (x) { return x[0] === d.fun; })[0];
    var o = { m: g.month, inc: INCOME + (opt && opt[3] || 0), fix: fixedSum(g.month), food: f[2], fun: fu[2], ev: opt ? opt[1] : 0, evName: opt ? opt[0] : '', fromFund: 0 };
    var fund = g.fund, save = g.save, debt = g.debt, cur = g.cur;
    if (ev && ev.emerg && d.useFund && o.ev > 0) { o.fromFund = Math.min(fund, o.ev); fund -= o.fromFund; }
    cur += o.inc - o.fix - o.food - o.fun - (o.ev - o.fromFund);
    o.pay = kPay(g, d); cur -= o.pay; debt -= o.pay;
    o.toFund = Math.max(0, d.toFund); o.toGoal = Math.max(0, d.toGoal);
    cur -= o.toFund + o.toGoal; fund += o.toFund; save += o.toGoal;
    o.borrow = 0; if (cur < 0) { o.borrow = -cur; debt += o.borrow; cur = 0; }
    o.interest = Math.round(debt * CARD_RATE); debt += o.interest;
    o.fundInt = Math.round(fund * SAVE_RATE); o.saveInt = Math.round(save * SAVE_RATE); fund += o.fundInt; save += o.saveInt;
    o.wbd = f[3] + fu[3] + (opt ? opt[2] : 0) + (debt > 150000 ? -3 : 0) + (fund >= fixedSum(0) ? 1 : 0);
    o.cur = cur; o.fund = fund; o.save = save; o.debt = debt;
    return o;
  }
  function kStep(g, d) {
    var o = kCalc(g, d);
    g.cur = o.cur; g.fund = o.fund; g.save = o.save; g.debt = o.debt; g.interest += o.interest;
    g.wb = clamp(g.wb + o.wbd, 0, 100); o.wb = g.wb;
    g.tot.fix += o.fix; g.tot.food += o.food; g.tot.fun += o.fun; g.tot.ev += o.ev; g.tot.card += o.interest;
    if (g.ev === 'fog' && d.choice === 1) g.pending = { m: g.month + 2, ev: 'fog2' };
    g.hist.push(o); g.month++;
    if (g.debt > CARD_LIMIT) { g.broke = true; g.done = true; }
    if (g.month >= 12) g.done = true;
    if (!g.done) { kRollEvent(g); g.d.choice = -1; }
    return o;
  }
  function kScore(g) {
    var goal = GOALS.filter(function (x) { return x[0] === g.goal; })[0];
    var p = [
      ['🎯 Megtakarítási cél (' + goal[1] + ')', Math.round(Math.min(1, g.save / goal[2]) * 30), 30],
      ['🛟 Vésztartalék (cél: legalább 1 havi fix költség)', Math.round(Math.min(1, g.fund / fixedSum(0)) * 25), 25],
      ['💳 Hitelkártya-tartozás', Math.round(25 * Math.max(0, 1 - g.debt / 100000)), 25],
      ['🙂 Jóllét (nem csak spórolni kell!)', Math.round(g.wb / 100 * 20), 20]
    ];
    return { parts: p, total: p.reduce(function (s, x) { return s + x[1]; }, 0) };
  }

  function koltsegvetes(box) {
    var g = load('koltsegvetes'); if (g && g.v !== 1) g = null;
    var msg = '';
    function pickGoal() {
      box.innerHTML = '<p class="lead">Képzeld el: 24 éves vagy, első munkahelyeden <b>' + ft(INCOME) + '</b> nettó fizetést kapsz, albérletben laksz, és a költözésből maradt <b>60 000 Ft hitelkártya-tartozásod</b>. 12 hónapon át te osztod be a pénzed. Mire spórolsz?</p>' +
        '<div class="learn-grid">' + GOALS.map(function (x) { return '<button type="button" class="card learn-tile gs-pick" data-goal="' + x[0] + '"><span class="ico">' + x[1].split(' ')[0] + '</span><b>' + esc(x[1].replace(/^\S+\s/, '')) + '</b><small>Cél: ' + ft(x[2]) + ' egy év alatt</small></button>'; }).join('') + '</div>' +
        '<div class="note"><p>A szereplő, az összegek és az események kitaláltak, de a nagyságrendek egy mai magyar fiatal felnőtt költségeihez igazodnak. A hitelkártya havi 3 % kamata szemléltető (a valódi kártyák THM-je gyakran 30–45 % körüli évente).</p></div>';
    }
    function readD() {
      var d = g.d;
      d.toFund = Math.max(0, Math.round(numIn(box, '#gs-k-fund', d.toFund))); d.toGoal = Math.max(0, Math.round(numIn(box, '#gs-k-goal', d.toGoal)));
      var c = box.querySelector('#gs-k-usefund'); if (c) d.useFund = c.checked;
      return d;
    }
    function preview() {
      var out = box.querySelector('#gs-k-prev'); if (!out) return;
      var d = readD(), ev = kEvent(g);
      if (ev && d.choice < 0) { out.innerHTML = '<div class="w-msg warn">Előbb dönts a hónap eseményéről! ☝️</div>'; return; }
      var o = kCalc(g, d);
      out.innerHTML = table([
        ['Nettó fizetés' + (o.inc > INCOME ? ' + extra bevétel' : ''), ft(o.inc)],
        ['− Fix kiadások', ft(-o.fix)], ['− Étkezés', ft(-o.food)], ['− Szabadidő', ft(-o.fun)],
        ['− Esemény' + (o.fromFund ? ' (ebből ' + ft(o.fromFund) + ' a vésztartalékból)' : ''), ft(-o.ev)],
        ['− Hitelkártya-törlesztés', ft(-o.pay)], ['− Vésztartalékba', ft(-o.toFund)], ['− Célra félretéve', ft(-o.toGoal)],
        ['<b>Folyószámla a hónap végén</b>', '<b>' + ft(o.cur) + '</b>', 'sum']
      ]) + (o.borrow ? '<div class="w-msg bad">⚠️ Nem jön ki a pénz: ' + ft(o.borrow) + ' hiányzik, ezt a hitelkártya fedezi – és havi 3 % kamatot fizetsz rá!</div>' : '') +
        (o.interest ? '<p class="gs-small">Kártyakamat ebben a hónapban: <b>' + ft(o.interest) + '</b> → tartozás a hónap végén: <b>' + ft(o.debt) + '</b>.</p>' : '<p class="gs-small">✅ Nincs kártyatartozás, nem fizetsz kamatot.</p>');
    }
    function render() {
      if (!g) return pickGoal();
      var goal = GOALS.filter(function (x) { return x[0] === g.goal; })[0], d = g.d, ev = kEvent(g);
      box.innerHTML =
        stat([['Hónap', g.done ? 'vége' : (g.month + 1) + '. (' + MONTHS[g.month] + ')'], ['Folyószámla', ft(g.cur)], ['Vésztartalék', ft(g.fund)], [goal[1], ft(g.save) + ' / ' + ft(goal[2])], ['Kártyatartozás', ft(g.debt), g.debt > 0 ? 'gs-down' : 'gs-up'], ['Jóllét', Math.round(g.wb) + ' / 100']]) +
        (msg ? '<div class="w-msg ' + msg[0] + '">' + msg[1] + '</div>' : '') +
        (g.done ? kSummary(g) :
          (ev ? '<div class="card pad gs-event"><h3>' + esc(ev.t) + '</h3><div class="gs-evopts">' + ev.opts.map(function (o, i) {
            return '<button type="button" class="btn' + (d.choice === i ? ' on' : '') + '" data-choice="' + i + '">' + esc(o[0]) + (o[1] > 0 ? ' · ' + ft(o[1]) : o[1] < 0 ? ' · ' + ft(-o[1]) + ' megtakarítás' : '') + (o[3] ? ' · +' + ft(o[3]) : '') + '</button>';
          }).join('') + '</div>' + (ev.emerg ? '<label class="pw-chk gs-chk"><input type="checkbox" id="gs-k-usefund"' + (d.useFund ? ' checked' : '') + '> Váratlan kiadás: a vésztartalékból fizetem (ha van benne)</label>' : '') + '</div>' :
            '<div class="gs-news gs-quiet">😌 Nyugodt hónap: nem történt semmi váratlan.</div>') +
          '<div class="card pad gs-dec"><h3>🧾 A(z) ' + MONTHS[g.month] + 'i költségvetésed</h3>' +
          '<p class="gs-small">Fix kiadások: ' + fixedList(g.month).map(function (x) { return esc(x[0]) + ' ' + ft(x[1]); }).join(' · ') + ' = <b>' + ft(fixedSum(g.month)) + '</b></p>' +
          '<div class="gs-decgrid"><div class="pw-f"><span>Étkezés</span>' + seg('food', FOOD.map(function (x) { return [x[0], x[1] + ' · ' + grp(x[2]) + ' Ft']; }), d.food) + '</div>' +
          '<div class="pw-f"><span>Szabadidő, szórakozás</span>' + seg('fun', FUN.map(function (x) { return [x[0], x[1] + ' · ' + grp(x[2]) + ' Ft']; }), d.fun) + '</div>' +
          '<div class="pw-f"><span>Hitelkártya-törlesztés (most: ' + ft(g.debt) + ', minimum: ' + ft(kMinPay(g.debt)) + ')</span>' + seg('pay', PAY, d.pay) + '</div></div>' +
          '<div class="pw-grid">' + field('gs-k-fund', 'Vésztartalékba teszek', d.toFund, 'Ft', ' min="0" step="5000"') + field('gs-k-goal', 'Célra félreteszek', d.toGoal, 'Ft', ' min="0" step="5000"') + '</div>' +
          '<div id="gs-k-prev"></div>' +
          '<div class="row gs-actions"><button type="button" class="btn primary" data-act="month">Hónap lezárása ▶</button><button type="button" class="btn" data-act="new">Újrakezdés</button></div></div>') +
        (g.hist.length ? '<div class="card pad"><div class="gs-chart" id="gs-k-ch"></div></div>' : '') +
        '<div class="card pad gs-learn"><h3>💡 Jó tudni</h3><ul>' +
        '<li><b>Először magadat fizesd ki:</b> a megtakarítást a hónap elején tedd félre, ne abból, ami a végén „marad”.</li>' +
        '<li><b>Vésztartalék:</b> 3–6 havi kiadásnyi pénz egy könnyen elérhető helyen. Így egy elromlott mosógép nem lesz hitelkártya-adósság. Az első lépcső: 1 havi fix költség.</li>' +
        '<li><b>Hitelkártya:</b> ha csak a minimumot fizeted, a tartozás alig csökken, a kamat viszont havonta jön. Havi 3 % évente kb. <b>' + pcPlain(Math.pow(1.03, 12) - 1, 0) + '</b> a kamatos kamat miatt!</li>' +
        '<li><b>Akció ≠ megtakarítás:</b> ha nem lett volna szükséged rá, a „40 % kedvezmény” is 60 % kiadás.</li>' +
        '<li>A megtakarításaid itt havi 0,4 % kamatot kapnak (kb. évi 5 %, mint egy jó állampapír).</li></ul>' +
        lessonLinks([['#/lecke/penzugy/koltsegvetes', 'Költségvetés'], ['#/lecke/penzugy/hitel', 'Hitel'], ['#/lecke/penzugy/kamat-inflacio', 'Kamat és infláció'], ['#/lecke/penz-mindennap/megtakaritas-ongondoskodas', 'Megtakarítás, öngondoskodás'], ['#/lecke/penz-mindennap/szamlak-kartyak', 'Számlák, kártyák'], ['#/lecke/penz-mindennap/lakhatas-rezsi', 'Lakhatás, rezsi']]) + '</div>';
      if (!g.done) preview();
      if (g.hist.length) {
        var lab = ['Kezdés'].concat(g.hist.map(function (o) { return MONTHS[o.m].slice(0, 3) + '.'; }));
        var H = [{ cur: 30000, fund: 0, save: 0, debt: 60000 }].concat(g.hist);
        chart(box.querySelector('#gs-k-ch'), { title: 'Pénzed alakulása hónapról hónapra', labels: lab, zero: true, series: [
          { name: 'Folyószámla', c: 1, vals: H.map(function (o) { return o.cur; }) },
          { name: 'Vésztartalék', c: 3, vals: H.map(function (o) { return o.fund; }) },
          { name: 'Célmegtakarítás', c: 4, vals: H.map(function (o) { return o.save; }) },
          { name: 'Kártyatartozás', c: 2, vals: H.map(function (o) { return o.debt; }), dash: true }] });
      }
    }
    box.onclick = function (e) {
      var b = e.target.closest('button'); if (!b || !box.contains(b)) return;
      if (b.dataset.goal) { g = kNew(b.dataset.goal); msg = ''; save('koltsegvetes', g); return render(); }
      if (b.dataset.choice != null) { readD(); g.d.choice = +b.dataset.choice; save('koltsegvetes', g); box.querySelectorAll('[data-choice]').forEach(function (x) { x.classList.toggle('on', x === b); }); return preview(); }
      var sg = b.closest('[data-seg]');
      if (sg) { readD(); g.d[sg.dataset.seg] = b.dataset.val; save('koltsegvetes', g); sg.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); return preview(); }
      var act = b.dataset.act;
      if (act === 'month') {
        var d = readD();
        if (kEvent(g) && d.choice < 0) { msg = ['warn', 'Előbb dönts a hónap eseményéről!']; return render(); }
        var o = kStep(g, d);
        msg = g.broke ? ['bad', '💥 A kártyatartozás átlépte a ' + ft(CARD_LIMIT) + '-os keretet – a bank letiltotta a kártyát.'] :
          o.borrow ? ['warn', '⚠️ Ebben a hónapban ' + ft(o.borrow) + '-ot a hitelkártyáról kellett fizetned.'] : ['ok', '✅ ' + MONTHS[o.m] + ' lezárva. Kártyakamat: ' + ft(o.interest) + '.'];
        save('koltsegvetes', g); render();
      } else if (act === 'new') {
        if (g && !g.done && g.month && !window.confirm('Biztosan újrakezded?')) return;
        g = null; msg = ''; S.store.set('gazdsim.koltsegvetes', null); render();
      }
    };
    box.oninput = function (e) { if (g && !g.done && /^gs-k-/.test(e.target.id || '')) { preview(); save('koltsegvetes', g); } };
    box.onchange = box.oninput;
    render();
  }
  function kSummary(g) {
    var sc = kScore(g), t = g.tot, tips = [];
    var all = t.fix + t.food + t.fun + t.ev + t.card;
    if (g.broke) tips.push('<b>A kártyakeret elfogyott.</b> A hitelkártya-adósság a kamatos kamat miatt gyorsan nő: ha egyszer elszabadul, nehéz megállítani.');
    if (g.interest > 10000) tips.push('Egy év alatt <b>' + ft(g.interest) + '</b> kártyakamatot fizettél – ezért a pénzért semmit sem kaptál. A drága adósságot érdemes elsőként visszafizetni.');
    else tips.push('Alig fizettél kamatot (' + ft(g.interest) + ') – a drága tartozást gyorsan rendezted. 👍');
    if (g.fund < fixedSum(0)) tips.push('A vésztartalékod még nem éri el az 1 havi fix költséget. Egy nagyobb baj (állásvesztés, betegség) könnyen adósságba sodorhatna.');
    else tips.push('Van legalább 1 havi tartalékod – ez nagy biztonság. A következő lépcső a 3–6 havi tartalék.');
    if (g.wb < 40) tips.push('Nagyon spóroltál, de a jólléted alacsony lett. Egy fenntartható költségvetésben a szórakozásnak is helye van – különben előbb-utóbb „kitörsz”.');
    if (t.food > 12 * 100000) tips.push('Étkezésre ' + ft(t.food) + ' ment el. A főzés az egyik legkönnyebb módja a spórolásnak.');
    return '<div class="card pad gs-summary"><h2>🎓 Mit tanultál? – ' + sc.total + ' / 100 pont</h2>' +
      '<div class="gs-bars">' + sc.parts.map(function (p) { return '<div class="gs-barrow"><span>' + esc(p[0]) + '</span><span class="gs-bar"><i style="width:' + (p[1] / p[2] * 100).toFixed(0) + '%"></i></span><b>' + p[1] + '/' + p[2] + '</b></div>'; }).join('') + '</div>' +
      '<h3 class="gs-h">Hová ment a pénz egy év alatt?</h3><div class="gs-bars">' + [['Fix kiadások', t.fix], ['Étkezés', t.food], ['Szabadidő', t.fun], ['Váratlan és egyéb események', t.ev], ['Kártyakamat', t.card]].map(function (x) {
        return '<div class="gs-barrow"><span>' + esc(x[0]) + '</span><span class="gs-bar"><i style="width:' + (all > 0 ? Math.max(0, x[1]) / all * 100 : 0).toFixed(1) + '%"></i></span><b>' + ft(x[1]) + '</b></div>';
      }).join('') + '</div>' +
      '<ul>' + tips.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
      '<div class="row"><button type="button" class="btn primary" data-act="new">Új év, új játék</button></div></div>';
  }

  /* ======================================================================
   * Oldalak
   * ====================================================================== */
  var GAMES = [
    { id: 'tozsde', ico: '📈', title: 'Tőzsdejáték', run: tozsde, grad: 'linear-gradient(120deg,#1d4ed8,#0891b2)',
      txt: '52 hét, 1 millió forint játékpénz, 7 kitalált cég, egy indexalap és egy kötvény. Legyőzöd az indexet? Közben megtanulod, mi a kockázat és a diverzifikáció.' },
    { id: 'vallalkozas', ico: '🏪', title: 'Saját vállalkozás', run: vallalkozas, grad: 'linear-gradient(120deg,#b45309,#db2777)',
      txt: 'Büfé, webshop vagy bringaszerviz: árazás, készlet, marketing, alkalmazottak. Havi eredménykimutatás, cash flow, fedezeti pont – és vigyázz, el ne fogyjon a pénz!' },
    { id: 'koltsegvetes', ico: '🧾', title: 'Családi költségvetés', run: koltsegvetes, grad: 'linear-gradient(120deg,#047857,#4f46e5)',
      txt: 'Egy év az első fizetésből: albérlet, rezsi, váratlan kiadások, hitelkártya. Építs vésztartalékot, érd el a célodat, és közben élj is!' }
  ];
  function status(id) {
    var g = load(id); if (!g) return 'Még nem kezdted el';
    if (id === 'tozsde') return g.done ? '✓ Befejezve' : g.week + '. hétnél tartasz';
    return g.done ? '✓ Befejezve' : g.month + 1 + '. hónapnál tartasz';
  }
  function hub(main) {
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Gazdasági szimulátorok</span></nav>' +
      '<section class="learn-hero" style="background:linear-gradient(120deg,#0f766e,#2563eb)"><h1>📊 Gazdasági szimulátorok</h1><p class="lead">Próbáld ki kockázat nélkül, milyen befektetni, céget vezetni vagy beosztani a fizetésed! Minden cég és szám kitalált – a tanulságok viszont valódiak.</p></section>' +
      '<div class="learn-grid">' + GAMES.map(function (x) {
        return '<a class="card learn-tile gs-hubtile" href="#/szimulatorok/' + x.id + '"><span class="ico">' + x.ico + '</span><b>' + esc(x.title) + '</b><small>' + esc(x.txt) + '</small><span class="gs-status">' + esc(status(x.id)) + '</span></a>';
      }).join('') + '</div>' +
      '<div class="note"><b class="t">ℹ️ Fontos</b><p>Ezek oktatási játékok egyszerűsített modellekkel. Semmi sem befektetési, adó- vagy pénzügyi tanács. A játékállás csak ebben a böngészőben tárolódik.</p></div>' +
      '<div class="card pad gs-learn">' + lessonLinks([['#/lecke/penzugy/koltsegvetes', 'Költségvetés'], ['#/lecke/penzugy/befektetes', 'Befektetés'], ['#/lecke/penzugy/hitel', 'Hitel'], ['#/lecke/penz-mindennap/megtakaritas-ongondoskodas', 'Megtakarítás, öngondoskodás'], ['#/lecke/felnott-elet/vallalkozas-indul', 'Vállalkozás indítása'], ['#/egyetem/vallalati-penzugy', '🎓 Vállalati pénzügyek']]) + '</div>';
    return true;
  }
  S.addRoute('szimulatorok', {
    title: 'Gazdasági szimulátorok', nav: '',
    page: function (main, rest) {
      if (!rest || !rest[0]) return hub(main);
      var x = GAMES.filter(function (y) { return y.id === rest[0]; })[0];
      if (!x) return false;
      main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/szimulatorok">Gazdasági szimulátorok</a><span>›</span><span>' + esc(x.title) + '</span></nav>' +
        '<section class="learn-hero gs-hero" style="background:' + x.grad + '"><h1>' + x.ico + ' ' + esc(x.title) + '</h1><p class="lead">' + esc(x.txt) + '</p></section>' +
        '<div class="gs-game" id="gs-game"></div>' +
        '<nav class="row gs-other">' + GAMES.filter(function (y) { return y !== x; }).map(function (y) { return '<a class="btn" href="#/szimulatorok/' + y.id + '">' + y.ico + ' ' + esc(y.title) + '</a>'; }).join('') + '</nav>';
      x.run(main.querySelector('#gs-game'));
      return true;
    }
  });
  /* tesztekhez és bővítéshez */
  S.gazdsim = { tNew: tNew, tStep: tStep, bNew: bNew, bStep: bStep, kNew: kNew, kStep: kStep, kScore: kScore, BIZ: BIZ };
})();
