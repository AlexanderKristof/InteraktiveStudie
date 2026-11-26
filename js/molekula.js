/* Tudásműhely – ⚛️ Molekulaépítő.
 * Útvonalak:  #/molekula (központ) · #/molekula/epito[?m=<id>] · #/molekula/kihivas[/<n>] ·
 *             #/molekula/izomer[/<képlet>] · #/molekula/egyenlet · #/molekula/konyvtar[/<id>]
 * Motor (S.molekula): SMILES-szerű leírás → gráf, vegyértékszabály, gráf-izomorfizmus alapú kanonikus
 * kulcs (H-atomok összevonva, aromás gyűrűk normalizálva), összegképlet, moláris tömeg, 2D elrendezés,
 * 3D VSEPR-modell (elektronpár-taszítás szimulációja), polaritás, egyenletrendezés racionális Gauss-eliminációval.
 * Tárolás: 'molekula.vaszon', 'molekula.kihivas' ({ id: true }), 'molekula.izomer' ({ képlet: [kulcs…] }),
 *          'molekula.egyenlet' ({ index: true }). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  /* ================= elemek ================= */
  /* név, moláris tömeg, vegyértékelektron, elektronegativitás (Pauling), kovalens sugár (Å), szín */
  var ELS = {
    H: ['hidrogén', 1.008, 1, 2.20, 0.31, '#ffffff'],
    Li: ['lítium', 6.94, 1, 0.98, 1.28, '#cc80ff'],
    B: ['bór', 10.81, 3, 2.04, 0.84, '#ffb5b5'],
    C: ['szén', 12.011, 4, 2.55, 0.76, '#5a5a5a'],
    N: ['nitrogén', 14.007, 5, 3.04, 0.71, '#3050f8'],
    O: ['oxigén', 15.999, 6, 3.44, 0.66, '#ff0d0d'],
    F: ['fluor', 18.998, 7, 3.98, 0.57, '#90e050'],
    Na: ['nátrium', 22.990, 1, 0.93, 1.66, '#ab5cf2'],
    Mg: ['magnézium', 24.305, 2, 1.31, 1.41, '#8aff00'],
    Al: ['alumínium', 26.982, 3, 1.61, 1.21, '#bfa6a6'],
    Si: ['szilícium', 28.085, 4, 1.90, 1.11, '#f0c8a0'],
    P: ['foszfor', 30.974, 5, 2.19, 1.07, '#ff8000'],
    S: ['kén', 32.06, 6, 2.58, 1.05, '#e6d21e'],
    Cl: ['klór', 35.45, 7, 3.16, 1.02, '#1fd01f'],
    K: ['kálium', 39.098, 1, 0.82, 2.03, '#8f40d4'],
    Ca: ['kalcium', 40.078, 2, 1.00, 1.76, '#3dcc00'],
    Br: ['bróm', 79.904, 7, 2.96, 1.20, '#a62929'],
    I: ['jód', 126.90, 7, 2.66, 1.39, '#940094']
  };
  var METAL = { Li: 1, Na: 1, K: 1, Mg: 1, Ca: 1, Al: 1 };
  /* további elemek csak az egyenletekhez (moláris tömeg) */
  var MASS = { He: 4.0026, Be: 9.0122, Ne: 20.180, Ar: 39.948, Ti: 47.867, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
    Se: 78.971, Sr: 87.62, Ag: 107.87, Sn: 118.71, Xe: 131.29, Ba: 137.33, Pt: 195.08, Au: 196.97, Hg: 200.59, Pb: 207.2, U: 238.03 };
  Object.keys(ELS).forEach(function (k) { MASS[k] = ELS[k][1]; });
  var HYPER = { P: [3, 5], S: [2, 4, 6], Cl: [1, 3, 5, 7], Br: [1, 3, 5, 7], I: [1, 3, 5, 7] };

  /* Megengedett kötésszám (vegyérték) az elem és a formális töltés alapján. */
  function valences(el, q) {
    if (!ELS[el]) return [];
    if (el === 'H') return q ? [0] : [1];
    var e = ELS[el][2] - q;
    if (e < 0 || e > 8) return [];
    if (!q && HYPER[el]) return HYPER[el];
    return [e <= 4 ? e : 8 - e];
  }

  /* ================= gráf-segédek ================= */
  /* gráf: { a: [{ e, q, x?, y? }], b: [{ i, j, o }] }  (o = 1, 2, 3) */
  function adj(g) {
    var ad = g.a.map(function () { return []; });
    g.b.forEach(function (b, k) { ad[b.i].push({ n: b.j, o: b.o, k: k }); ad[b.j].push({ n: b.i, o: b.o, k: k }); });
    return ad;
  }
  function atomInfo(g, ad, i) {
    var a = g.a[i], s = 0;
    ad[i].forEach(function (x) { s += x.o; });
    var vs = valences(a.e, a.q || 0), tgt = null, k;
    for (k = 0; k < vs.length; k++) if (vs[k] >= s) { tgt = vs[k]; break; }
    var e = ELS[a.e] ? ELS[a.e][2] - (a.q || 0) : 0, free = e - s;
    return { s: s, ok: vs.indexOf(s) >= 0, miss: tgt == null ? 0 : tgt - s, over: tgt == null && vs.length ? s - vs[vs.length - 1] : 0,
      lp: free > 0 ? Math.floor(free / 2) : 0, rad: free > 0 && free % 2 === 1, deg: ad[i].length };
  }
  function clone(g) { return { a: g.a.map(function (x) { var o = { e: x.e, q: x.q || 0 }; if (x.x != null) { o.x = x.x; o.y = x.y; } return o; }), b: g.b.map(function (b) { return { i: b.i, j: b.j, o: b.o }; }) }; }
  function components(g) {
    var ad = adj(g), seen = g.a.map(function () { return -1; }), out = [];
    for (var s = 0; s < g.a.length; s++) {
      if (seen[s] >= 0) continue;
      var st = [s], list = []; seen[s] = out.length;
      while (st.length) { var v = st.pop(); list.push(v); ad[v].forEach(function (x) { if (seen[x.n] < 0) { seen[x.n] = out.length; st.push(x.n); } }); }
      list.sort(function (a, b) { return a - b; });
      var map = {}; list.forEach(function (v, k) { map[v] = k; });
      out.push({ idx: list, g: { a: list.map(function (v) { return g.a[v]; }), b: g.b.filter(function (b) { return map[b.i] != null; }).map(function (b) { return { i: map[b.i], j: map[b.j], o: b.o }; }) } });
    }
    return out;
  }

  /* ================= SMILES-részhalmaz → gráf (explicit H-atomokkal) ================= */
  function smiles(str) {
    var g = { a: [], b: [] }, i = 0, prev = -1, stack = [], ring = {}, bo = 1, hs = [];
    function add(e, q, h) {
      g.a.push({ e: e, q: q }); hs.push(h);
      var idx = g.a.length - 1;
      if (prev >= 0) g.b.push({ i: prev, j: idx, o: bo });
      bo = 1; prev = idx;
    }
    while (i < str.length) {
      var c = str.charAt(i);
      if (c === '(') { stack.push(prev); i++; continue; }
      if (c === ')') { prev = stack.pop(); i++; continue; }
      if (c === '-' || c === '=' || c === '#') { bo = c === '-' ? 1 : c === '=' ? 2 : 3; i++; continue; }
      if (/\d/.test(c)) {
        var d = +c;
        if (ring[d]) { g.b.push({ i: ring[d].a, j: prev, o: Math.max(ring[d].o, bo) }); delete ring[d]; }
        else ring[d] = { a: prev, o: bo };
        bo = 1; i++; continue;
      }
      if (c === '[') {
        var end = str.indexOf(']', i), m = /^([A-Z][a-z]?)(H(\d?))?([+-]\d|[+-]+)?$/.exec(str.slice(i + 1, end));
        if (!m) throw new Error('SMILES hiba: ' + str);
        var q = 0;
        if (m[4]) q = (m[4].charAt(0) === '+' ? 1 : -1) * (/\d/.test(m[4]) ? +m[4].charAt(1) : m[4].length);
        add(m[1], q, m[2] ? (m[3] ? +m[3] : 1) : 0); i = end + 1; continue;
      }
      var two = str.substr(i, 2);
      if (two === 'Cl' || two === 'Br') { add(two, 0, -1); i += 2; continue; }
      if ('BCNOPSFI'.indexOf(c) >= 0) { add(c, 0, -1); i++; continue; }
      throw new Error('SMILES hiba: ' + str + ' @' + i);
    }
    var n = g.a.length, sum = [], k;
    for (k = 0; k < n; k++) sum.push(0);
    g.b.forEach(function (b) { sum[b.i] += b.o; sum[b.j] += b.o; });
    for (k = 0; k < n; k++) {
      var h = hs[k];
      if (h < 0) { var vs = valences(g.a[k].e, 0), t = null; for (var z = 0; z < vs.length; z++) if (vs[z] >= sum[k]) { t = vs[z]; break; } h = t == null ? 0 : t - sum[k]; }
      for (var y = 0; y < h; y++) { g.a.push({ e: 'H', q: 0 }); g.b.push({ i: k, j: g.a.length - 1, o: 1 }); }
    }
    return g;
  }

  /* ================= kanonikus kulcs (gráf-izomorfizmus) ================= */
  function uniqRank(arr) {
    var u = arr.slice().sort(), m = {}, r = 0;
    u.forEach(function (s) { if (!(s in m)) m[s] = r++; });
    return { col: arr.map(function (s) { return m[s]; }), n: r };
  }
  function canon(g) {
    var ad = adj(g), keep = [], map = {}, i;
    for (i = 0; i < g.a.length; i++) {
      var a = g.a[i], fold = a.e === 'H' && !a.q && ad[i].length === 1 && ad[i][0].o === 1 && g.a[ad[i][0].n].e !== 'H';
      if (!fold) { map[i] = keep.length; keep.push(i); }
    }
    var m = keep.length, hc = keep.map(function () { return 0; });
    for (i = 0; i < g.a.length; i++) if (map[i] == null) hc[map[ad[i][0].n]]++;
    var E = [], nb = keep.map(function () { return []; });
    g.b.forEach(function (b) { if (map[b.i] != null && map[b.j] != null) E.push({ i: map[b.i], j: map[b.j], o: b.o }); });
    /* aromás 6-gyűrűk: váltakozó egyes–kettős kötések → 'a' (4) */
    var eAt = {};
    E.forEach(function (e, k) { eAt[e.i + ',' + e.j] = k; eAt[e.j + ',' + e.i] = k; nb[e.i].push(e.j); nb[e.j].push(e.i); });
    var arom = {};
    function dfs(s, path) {
      var v = path[path.length - 1];
      if (path.length === 6) {
        if (nb[v].indexOf(s) < 0 || path[1] > path[5]) return;
        var ks = [], ok = true;
        for (var t = 0; t < 6; t++) ks.push(eAt[path[t] + ',' + path[(t + 1) % 6]]);
        for (t = 0; t < 6; t++) if (E[ks[t]].o + E[ks[(t + 1) % 6]].o !== 3) ok = false;
        if (ok) ks.forEach(function (k) { arom[k] = 1; });
        return;
      }
      nb[v].forEach(function (w) { if (w > s && path.indexOf(w) < 0) dfs(s, path.concat([w])); });
    }
    for (i = 0; i < m; i++) if (nb[i].length >= 2) dfs(i, [i]);
    E.forEach(function (e, k) { if (arom[k]) e.o = 4; });
    var NB = keep.map(function () { return []; });
    E.forEach(function (e) { NB[e.i].push([e.j, e.o]); NB[e.j].push([e.i, e.o]); });
    var lab = keep.map(function (v, k) { var a = g.a[v]; return a.e + (a.q ? (a.q > 0 ? '+' + a.q : a.q) : '') + 'h' + hc[k]; });
    function refine(col) {
      var cnt = uniqRank(col.map(String)).n;
      for (;;) {
        var sig = col.map(function (c, v) { return c + ':' + NB[v].map(function (x) { return col[x[0]] + '.' + x[1]; }).sort().join(','); });
        var r = uniqRank(sig);
        col = r.col;
        if (r.n === cnt) return { col: col, n: r.n };
        cnt = r.n;
      }
    }
    function leaf(col) {
      var ord = []; for (var v = 0; v < m; v++) ord[col[v]] = v;
      return ord.map(function (v) { return lab[v]; }).join(' ') + '|' + E.map(function (e) {
        var x = col[e.i], y = col[e.j]; return (x < y ? x + '-' + y : y + '-' + x) + e.o; }).sort().join(' ');
    }
    var best = null, leaves = 0;
    function search(col) {
      if (leaves > 4000) return;
      var r = refine(col); col = r.col;
      if (r.n === m) { leaves++; var s = leaf(col); if (best === null || s < best) best = s; return; }
      var cnt = {}; col.forEach(function (c) { cnt[c] = (cnt[c] || 0) + 1; });
      var cell = -1; for (var c = 0; c < r.n; c++) if (cnt[c] > 1) { cell = c; break; }
      for (var v = 0; v < m; v++) if (col[v] === cell) {
        search(col.map(function (x, u) { return x * 2 + (x === cell && u !== v ? 1 : 0); }));
      }
    }
    if (!m) return '';
    search(uniqRank(lab.map(function (l, v) { return l + 'd' + NB[v].length; })).col);
    return best;
  }

  /* ================= képlet, moláris tömeg ================= */
  function counts(g) { var c = {}; g.a.forEach(function (a) { c[a.e] = (c[a.e] || 0) + 1; }); return c; }
  function hill(c) {
    var ks = Object.keys(c).sort(), out = '';
    if (c.C) { ks = ['C'].concat(c.H ? ['H'] : []).concat(ks.filter(function (k) { return k !== 'C' && k !== 'H'; })); }
    ks.forEach(function (k) { out += k + (c[k] > 1 ? c[k] : ''); });
    return out;
  }
  function charge(g) { var q = 0; g.a.forEach(function (a) { q += a.q || 0; }); return q; }
  function massOf(c) { var m = 0; Object.keys(c).forEach(function (k) { m += (MASS[k] || 0) * c[k]; }); return m; }
  /* HTML-alak: alsó index, felső index töltéshez (^2+, ^-) */
  function fF(s) {
    return esc(String(s)).replace(/\^(\d*[+-])/g, function (m, x) { return '<sup>' + x.replace('-', '−') + '</sup>'; })
      .replace(/([A-Za-z\)\]])(\d+)/g, '$1<sub>$2</sub>');
  }

  /* ================= molekulakönyvtár ================= */
  /* id, s: SMILES (Kekulé-alak), n: IUPAC (magyar) név, k: köznapi név, f: szokásos képlet, c: csoport,
   * fp: forráspont (1 atm), op: olvadáspont, mu: kísérleti dipólusmomentum (D), p: tulajdonság, u: felhasználás, h: veszély */
  var CATS = { elem: 'Elemmolekulák', hidrid: 'Hidrogénvegyületek', oxid: 'Oxidok', sav: 'Szervetlen savak', ionos: 'Ionvegyületek, lúgok, sók', halogenid: 'Kovalens halogenidek',
    alkan: 'Alkánok', ciklo: 'Cikloalkánok', alken: 'Alkének, diének', alkin: 'Alkinek', aromas: 'Aromás vegyületek', alkohol: 'Alkoholok', eter: 'Éterek',
    oxo: 'Aldehidek és ketonok', karbonsav: 'Karbonsavak', eszter: 'Észterek', halogen: 'Halogénezett szénhidrogének', nitrogen: 'Nitrogéntartalmú szerves vegyületek', szenhidrat: 'Szénhidrátok' };
  var LIB = [
    /* --- elemmolekulák --- */
    { id: 'hidrogen', s: '[H][H]', n: 'hidrogén (dihidrogén)', k: 'hidrogéngáz', f: 'H2', c: 'elem', fp: '−253 °C', mu: 0, p: 'Színtelen, szagtalan, a legkisebb sűrűségű gáz.', u: 'Ammóniagyártás, üzemanyagcellák, zsírkeményítés (margarin).', h: 'Rendkívül tűzveszélyes; levegővel robbanóelegyet (durranógázt) képez.' },
    { id: 'oxigen', s: 'O=O', n: 'oxigén (dioxigén)', k: '', f: 'O2', c: 'elem', fp: '−183 °C', mu: 0, p: 'Színtelen, szagtalan gáz, a levegő kb. 21%-a; az égést táplálja.', u: 'Légzés, orvosi oxigénterápia, hegesztés, acélgyártás.', h: 'Oxidáló: tiszta oxigénben az anyagok hevesen égnek.' },
    { id: 'nitrogen', s: 'N#N', n: 'nitrogén (dinitrogén)', k: '', f: 'N2', c: 'elem', fp: '−196 °C', mu: 0, p: 'A levegő kb. 78%-a; a hármas kötés miatt nagyon stabil, nehezen reagál.', u: 'Ammóniagyártás, védőgáz élelmiszer-csomagolásban, folyékony nitrogénnel hűtés.', h: 'Zárt térben kiszoríthatja az oxigént (fulladásveszély); a folyékony nitrogén fagyási sérülést okoz.' },
    { id: 'fluor', s: 'FF', n: 'fluor (difluor)', k: '', f: 'F2', c: 'elem', fp: '−188 °C', mu: 0, p: 'Halványsárga, rendkívül reakcióképes gáz; a fluor a legnagyobb elektronegativitású elem.', u: 'Fluorvegyületek (pl. teflon alapanyagai) gyártása.', h: 'Erősen mérgező és maró; szinte mindennel hevesen reagál.' },
    { id: 'klor', s: 'ClCl', n: 'klór (diklór)', k: 'klórgáz', f: 'Cl2', c: 'elem', fp: '−34 °C', mu: 0, p: 'Sárgászöld, szúrós szagú, a levegőnél nehezebb gáz.', u: 'Víz fertőtlenítése, PVC és fehérítőszerek gyártása.', h: 'Mérgező, a légutakat marja. Hipó és savas vízkőoldó keverésekor is felszabadul – soha ne keverd őket!' },
    { id: 'brom', s: 'BrBr', n: 'bróm (dibróm)', k: '', f: 'Br2', c: 'elem', fp: '59 °C', mu: 0, p: 'Vörösbarna, szobahőmérsékleten folyékony, illékony nemfém.', u: 'Égésgátlók, gyógyszerek gyártása; a brómos víz a kettős kötés kimutatására szolgál.', h: 'Maró, mérgező gőzei vannak.' },
    { id: 'jod', s: 'II', n: 'jód (dijód)', k: '', f: 'I2', c: 'elem', mu: 0, p: 'Szürkésfekete, fémesen csillogó kristály; melegítve lila gőzzé szublimál.', u: 'Fertőtlenítés (jódtinktúra), keményítő kimutatása, jódozott só.', h: 'Bőrt és szemet irritál; nagy mennyiségben ártalmas.' },
    { id: 'ozon', s: '[O-][O+]=O', n: 'ózon (trioxigén)', k: '', f: 'O3', c: 'elem', fp: '−112 °C', p: 'Szúrós szagú, halványkék gáz; a sztratoszférában elnyeli az UV-sugárzás nagy részét. Két egyenértékű határszerkezete van (rezonancia).', u: 'Víz- és levegőfertőtlenítés.', h: 'A talaj közelében mérgező, irritálja a légutakat (nyári szmog).' },
    /* --- hidrogénvegyületek --- */
    { id: 'viz', s: 'O', n: 'oxidán', k: 'víz', f: 'H2O', c: 'hidrid', fp: '100 °C', mu: 1.85, p: 'Színtelen, szagtalan folyadék; a hidrogénkötések miatt szokatlanul magas a forráspontja, a jég pedig könnyebb a folyékony víznél.', u: 'Az élet oldószere; ivóvíz, oldószer, hűtőközeg.', h: 'Nem veszélyes (a forró víz és a gőz azonban égési sérülést okoz).' },
    { id: 'hidrogen-peroxid', s: 'OO', n: 'hidrogén-peroxid', k: '', f: 'H2O2', c: 'hidrid', fp: '150 °C', p: 'Színtelen folyadék, könnyen bomlik vízre és oxigénre.', u: 'Fertőtlenítés (3%-os oldat), hajszőkítés, papírfehérítés.', h: 'Tömény oldata maró és erősen oxidáló.' },
    { id: 'ammonia', s: 'N', n: 'azán', k: 'ammónia', f: 'NH3', c: 'hidrid', fp: '−33 °C', mu: 1.47, p: 'Színtelen, szúrós szagú gáz; vízben nagyon jól oldódik, oldata lúgos kémhatású.', u: 'Műtrágyagyártás (Haber–Bosch-eljárás), hűtőközeg, tisztítószerek.', h: 'Mérgező és maró; a szemet és a légutakat károsítja.' },
    { id: 'hidrazin', s: 'NN', n: 'hidrazin (diazán)', k: '', f: 'N2H4', c: 'hidrid', fp: '114 °C', p: 'Színtelen, ammóniaszagú folyadék, erős redukálószer.', u: 'Rakéta-hajtóanyag (műholdak manőverező hajtóművei), kazánvíz oxigénmentesítése.', h: 'Mérgező, maró, rákkeltő gyanús, tűzveszélyes.' },
    { id: 'hf', s: 'F', n: 'hidrogén-fluorid', k: '', f: 'HF', c: 'hidrid', fp: '20 °C', mu: 1.83, p: 'Színtelen gáz vagy folyadék; vizes oldata, a folysav megtámadja az üveget.', u: 'Üvegmaratás, fluorvegyületek gyártása.', h: 'Rendkívül mérgező és maró; a bőrön át felszívódva is súlyos mérgezést okoz.' },
    { id: 'hcl', s: 'Cl', n: 'hidrogén-klorid', k: '', f: 'HCl', c: 'hidrid', fp: '−85 °C', mu: 1.11, p: 'Színtelen, szúrós szagú gáz; vízben kiválóan oldódik, oldata az erős sav, a sósav.', u: 'Fémek pácolása, PVC-gyártás; a gyomorsav is sósavat tartalmaz.', h: 'Maró, a légutakat izgatja.' },
    { id: 'hbr', s: 'Br', n: 'hidrogén-bromid', k: '', f: 'HBr', c: 'hidrid', fp: '−67 °C', mu: 0.83, p: 'Színtelen, szúrós szagú gáz; vizes oldata erős sav.', u: 'Brómvegyületek előállítása, szerves szintézisek.', h: 'Maró, mérgező.' },
    { id: 'hi', s: 'I', n: 'hidrogén-jodid', k: '', f: 'HI', c: 'hidrid', fp: '−35 °C', mu: 0.45, p: 'Színtelen gáz; vizes oldata a halogén-hidrogénsavak közül a legerősebb sav.', u: 'Szerves szintézisek, redukálószer.', h: 'Maró.' },
    { id: 'kenhidrogen', s: 'S', n: 'dihidrogén-szulfid', k: 'kén-hidrogén', f: 'H2S', c: 'hidrid', fp: '−60 °C', mu: 0.97, p: 'Színtelen, záptojásszagú gáz.', u: 'A kéngyártás kiindulási anyaga (földgáz kéntelenítése).', h: 'Nagyon mérgező; nagy koncentrációban bénítja a szaglást, ezért nem is érezzük.' },
    { id: 'szilan', s: '[SiH4]', n: 'szilán', k: 'monoszilán', f: 'SiH4', c: 'hidrid', mu: 0, p: 'Színtelen gáz, levegőn magától meggyullad.', u: 'Félvezetőipar: szilíciumrétegek leválasztása chipekhez, napelemekhez.', h: 'Öngyulladó, tűzveszélyes.' },
    /* --- oxidok --- */
    { id: 'szen-dioxid', s: 'O=C=O', n: 'szén-dioxid', k: '', f: 'CO2', c: 'oxid', fp: '−78 °C-on szublimál', mu: 0, p: 'Színtelen, szagtalan, a levegőnél nehezebb gáz; vízben oldva szénsav keletkezik. Üvegházhatású gáz. Lineáris, ezért apoláris, bár a C=O kötések polárisak.', u: 'Szénsavas italok, tűzoltó készülékek, szárazjég; a fotoszintézis alapanyaga.', h: 'Zárt térben (pince, erjesztés) fulladást okozhat.' },
    { id: 'szen-monoxid', s: '[C-]#[O+]', n: 'szén-monoxid', k: '', f: 'CO', c: 'oxid', fp: '−192 °C', mu: 0.11, p: 'Színtelen, szagtalan gáz; tökéletlen égéskor keletkezik. A szén és az oxigén között hármas kötés van (formális töltésekkel).', u: 'Kohászat (vasércek redukálása), szintézisgáz a vegyiparban.', h: 'Nagyon mérgező: a hemoglobinhoz kötődik, gátolja az oxigénszállítást. Gázkészülékek mellé CO-érzékelő kell!' },
    { id: 'ken-dioxid', s: 'O=S=O', n: 'kén-dioxid', k: '', f: 'SO2', c: 'oxid', fp: '−10 °C', mu: 1.63, p: 'Színtelen, szúrós szagú gáz; vízben oldva kénessav keletkezik – a savas eső egyik okozója.', u: 'Kénsavgyártás, borászat (kénezés, tartósítás: E220).', h: 'Mérgező, a légutakat irritálja.' },
    { id: 'ken-trioxid', s: 'O=S(=O)=O', n: 'kén-trioxid', k: '', f: 'SO3', c: 'oxid', fp: '45 °C', mu: 0, p: 'Fehér, illékony szilárd anyag; vízzel hevesen kénsavvá egyesül.', u: 'A kénsavgyártás köztiterméke.', h: 'Erősen maró, vízzel hevesen reagál.' },
    { id: 'dinitrogen-oxid', s: '[N-]=[N+]=O', n: 'dinitrogén-oxid', k: 'kéjgáz', f: 'N2O', c: 'oxid', fp: '−88 °C', p: 'Színtelen, édeskés szagú gáz, lineáris molekula.', u: 'Orvosi fájdalomcsillapítás és altatás, habszifonok hajtógáza.', h: 'Visszaélésszerű belégzése idegkárosodást és fulladást okozhat; erős üvegházhatású gáz.' },
    /* --- szervetlen savak --- */
    { id: 'kensav', s: 'OS(=O)(=O)O', n: 'kénsav', k: '', f: 'H2SO4', c: 'sav', fp: '337 °C', p: 'Olajszerű, színtelen, erős sav; erősen vízelvonó.', u: 'A vegyipar legnagyobb mennyiségben gyártott anyaga: műtrágyák, akkumulátorsav, festékek.', h: 'Erősen maró! Hígításkor mindig a savat öntjük a vízbe, sosem fordítva.' },
    { id: 'kenessav', s: 'OS(=O)O', n: 'kénessav', k: '', f: 'H2SO3', c: 'sav', p: 'Csak vizes oldatban létezik: a kén-dioxid vizes oldata.', u: 'Fehérítés, tartósítás.', h: 'Maró, irritáló.' },
    { id: 'salétromsav', s: 'O[N+](=O)[O-]', n: 'salétromsav', k: '', f: 'HNO3', c: 'sav', fp: '83 °C', p: 'Színtelen, erős, oxidáló sav; fény hatására bomlik és megsárgul. A nitrogénen +1, az egyik oxigénen −1 formális töltés van.', u: 'Műtrágyák (ammónium-nitrát), robbanóanyagok, választóvíz (az ezüstöt oldja, az aranyat nem).', h: 'Erősen maró és oxidáló; a bőrt sárgára festi.' },
    { id: 'foszforsav', s: 'OP(=O)(O)O', n: 'foszforsav', k: 'ortofoszforsav', f: 'H3PO4', c: 'sav', p: 'Színtelen, szilárd vagy szirupos, közepesen erős sav.', u: 'Műtrágyák, rozsdaeltávolítók, kólák savanyítása (E338).', h: 'Tömény formában maró.' },
    { id: 'szensav', s: 'OC(=O)O', n: 'szénsav', k: '', f: 'H2CO3', c: 'sav', p: 'Gyenge, bomlékony sav; csak vizes oldatban létezik, könnyen szén-dioxidra és vízre bomlik.', u: 'A szénsavas italok „szénsava” (valójában főleg oldott CO₂); a vér pH-jának szabályozása.', h: 'Nem veszélyes.' },
    { id: 'hcn', s: 'C#N', n: 'hidrogén-cianid', k: 'ciánhidrogén, kéksav', f: 'HCN', c: 'sav', fp: '26 °C', mu: 2.98, p: 'Színtelen, keserűmandula-szagú, nagyon illékony folyadék; lineáris molekula.', u: 'Műanyag-alapanyagok (pl. akrilnitril, nejlon) gyártása.', h: 'Rendkívül mérgező: a sejtlégzést gátolja.' },
    { id: 'hipoklorossav', s: 'OCl', n: 'hipoklórossav', k: '', f: 'HOCl', c: 'sav', p: 'Gyenge sav, csak vizes oldatban létezik; erős oxidálószer.', u: 'Fertőtlenítés: a klóros víz és a hipó hatóanyaga.', h: 'Irritáló; savval keverve klórgáz szabadulhat fel.' },
    /* --- ionvegyületek, lúgok, sók --- */
    { id: 'natrium-klorid', s: '[Na]Cl', n: 'nátrium-klorid', k: 'konyhasó, kősó', f: 'NaCl', c: 'ionos', op: '801 °C', p: 'Fehér, kocka alakú kristályokból álló ionvegyület, vízben jól oldódik. A rajzon egy vonal jelöli, valójában Na⁺- és Cl⁻-ionok rácsáról van szó.', u: 'Ételízesítés, tartósítás, útsózás, klór és nátrium-hidroxid gyártása.', h: 'Kis mennyiségben nem veszélyes; a túlzott sófogyasztás emeli a vérnyomást.' },
    { id: 'natrium-hidroxid', s: '[Na]O', n: 'nátrium-hidroxid', k: 'marónátron, lúgkő', f: 'NaOH', c: 'ionos', op: '318 °C', p: 'Fehér, nedvszívó szilárd anyag; vizes oldata erős lúg.', u: 'Szappangyártás, lefolyótisztítók, papíripar.', h: 'Erősen maró, különösen a szemre veszélyes!' },
    { id: 'kalium-hidroxid', s: '[K]O', n: 'kálium-hidroxid', k: 'marókáli', f: 'KOH', c: 'ionos', p: 'Fehér, nedvszívó szilárd anyag; vizes oldata erős lúg.', u: 'Lágyszappanok, lúgos elemek elektrolitja, biodízelgyártás.', h: 'Erősen maró.' },
    { id: 'kalium-klorid', s: '[K]Cl', n: 'kálium-klorid', k: '', f: 'KCl', c: 'ionos', p: 'Fehér, sós ízű kristályos ionvegyület.', u: 'Káliumtartalmú műtrágya, „csökkentett nátriumtartalmú” sópótló.', h: 'Nagy mennyiségben szívritmuszavart okozhat.' },
    { id: 'szodabikarbona', s: '[Na]OC(=O)O', n: 'nátrium-hidrogén-karbonát', k: 'szódabikarbóna', f: 'NaHCO3', c: 'ionos', p: 'Fehér por; savakkal pezsegve szén-dioxidot fejleszt, hevítve is CO₂-t ad le.', u: 'Sütőpor, gyomorsav közömbösítése, poroltó.', h: 'Nem veszélyes.' },
    /* --- kovalens halogenidek (VSEPR-példák) --- */
    { id: 'bor-trifluorid', s: 'FB(F)F', n: 'bór-trifluorid', k: '', f: 'BF3', c: 'halogenid', fp: '−100 °C', mu: 0, p: 'Színtelen, szúrós szagú gáz. A bórnak csak 6 elektron jut a vegyértékhéján (elektronhiányos, Lewis-sav); síkháromszög alakú.', u: 'Katalizátor a szerves vegyiparban.', h: 'Mérgező, maró.' },
    { id: 'foszfor-triklorid', s: 'ClP(Cl)Cl', n: 'foszfor-triklorid', k: '', f: 'PCl3', c: 'halogenid', fp: '76 °C', p: 'Színtelen, füstölgő folyadék, trigonális piramis alakú molekula; vízzel hevesen reagál.', u: 'Növényvédő szerek, égésgátlók alapanyaga.', h: 'Mérgező, maró.' },
    { id: 'foszfor-pentaklorid', s: 'ClP(Cl)(Cl)(Cl)Cl', n: 'foszfor-pentaklorid', k: '', f: 'PCl5', c: 'halogenid', mu: 0, p: 'Halványsárga kristályos anyag; gázállapotban trigonális bipiramis alakú molekula (a P-nek 10 elektron jut: kiterjesztett oktett).', u: 'Klórozószer a szerves kémiában.', h: 'Maró, vízzel hevesen reagál.' },
    { id: 'ken-hexafluorid', s: 'FS(F)(F)(F)(F)F', n: 'kén-hexafluorid', k: '', f: 'SF6', c: 'halogenid', mu: 0, p: 'Színtelen, szagtalan, nagyon stabil, nehéz gáz; oktaéderes molekula.', u: 'Elektromos szigetelőgáz nagyfeszültségű kapcsolókban.', h: 'Nem mérgező, de az egyik legerősebb üvegházhatású gáz.' },
    { id: 'klor-trifluorid', s: 'FCl(F)F', n: 'klór-trifluorid', k: '', f: 'ClF3', c: 'halogenid', fp: '12 °C', p: 'Színtelen gáz; T-alakú molekula (3 kötő és 2 nemkötő elektronpár a klóron). Az egyik legreakcióképesebb ismert vegyület.', u: 'Félvezetőipari tisztítás.', h: 'Rendkívül veszélyes: oxidáló, maró, mérgező – sok anyagot (még az üveget is) meggyújthat.' },
    /* --- alkánok --- */
    { id: 'metan', s: 'C', n: 'metán', k: '', f: 'CH4', c: 'alkan', fp: '−162 °C', mu: 0, p: 'A legegyszerűbb szénhidrogén; színtelen, szagtalan gáz, a földgáz fő alkotója. Tetraéderes molekula.', u: 'Fűtés, főzés (földgáz), hidrogéngyártás.', h: 'Rendkívül tűzveszélyes; erős üvegházhatású gáz. A földgáz szagát hozzáadott szagosító anyag adja.' },
    { id: 'etan', s: 'CC', n: 'etán', k: '', f: 'C2H6', c: 'alkan', fp: '−89 °C', mu: 0, p: 'Színtelen, szagtalan gáz, a földgázban is előfordul.', u: 'Eténgyártás (krakkolás).', h: 'Rendkívül tűzveszélyes.' },
    { id: 'propan', s: 'CCC', n: 'propán', k: '', f: 'C3H8', c: 'alkan', fp: '−42 °C', p: 'Színtelen gáz, nyomás alatt könnyen cseppfolyósítható.', u: 'PB-gáz (propán-bután): gázpalack, kempingfőző, autógáz.', h: 'Rendkívül tűzveszélyes; a levegőnél nehezebb, mélyedésekben összegyűlhet.' },
    { id: 'butan', s: 'CCCC', n: 'bután', k: 'n-bután', f: 'C4H10', c: 'alkan', fp: '−0,5 °C', p: 'Színtelen, könnyen cseppfolyósítható gáz; egyenes (el nem ágazó) szénlánc.', u: 'Öngyújtók, PB-gáz, aeroszolos palackok hajtógáza.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'izobutan', s: 'CC(C)C', n: '2-metilpropán', k: 'izobután', f: 'C4H10', c: 'alkan', fp: '−12 °C', p: 'A bután elágazó láncú izomerje: ugyanaz az összegképlet (C₄H₁₀), más a szerkezet és a forráspont.', u: 'Hűtőközeg (R600a) hűtőszekrényekben, hajtógáz.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'pentan', s: 'CCCCC', n: 'pentán', k: 'n-pentán', f: 'C5H12', c: 'alkan', fp: '36 °C', p: 'Színtelen, illékony folyadék.', u: 'Oldószer, polisztirolhab (hungarocell) habosítása.', h: 'Tűzveszélyes, gőze kábító.' },
    { id: 'izopentan', s: 'CC(C)CC', n: '2-metilbután', k: 'izopentán', f: 'C5H12', c: 'alkan', fp: '28 °C', p: 'Elágazó láncú pentánizomer, nagyon illékony folyadék.', u: 'A benzin egyik komponense, oldószer.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'neopentan', s: 'CC(C)(C)C', n: '2,2-dimetilpropán', k: 'neopentán', f: 'C5H12', c: 'alkan', fp: '9,5 °C', mu: 0, p: 'A legelágazóbb pentánizomer: gömbszerű molekula, kisebb felületen érintkezik a szomszédaival, ezért a legalacsonyabb a forráspontja.', u: 'Főleg kutatás, összehasonlítások.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'hexan', s: 'CCCCCC', n: 'hexán', k: 'n-hexán', f: 'C6H14', c: 'alkan', fp: '69 °C', p: 'Színtelen, benzinszagú folyadék.', u: 'Oldószer, étolajok kivonása magvakból, ragasztók.', h: 'Tűzveszélyes; tartós belégzése idegkárosodást okozhat.' },
    { id: '2-metilpentan', s: 'CC(C)CCC', n: '2-metilpentán', k: 'izohexán', f: 'C6H14', c: 'alkan', fp: '60 °C', p: 'A hexán egyik elágazó láncú izomerje.', u: 'A benzin komponense, oldószer.', h: 'Tűzveszélyes.' },
    { id: '3-metilpentan', s: 'CCC(C)CC', n: '3-metilpentán', k: '', f: 'C6H14', c: 'alkan', fp: '63 °C', p: 'A hexán egyik elágazó láncú izomerje (a metilcsoport a lánc közepén van).', u: 'A benzin komponense, oldószer.', h: 'Tűzveszélyes.' },
    { id: '22-dimetilbutan', s: 'CC(C)(C)CC', n: '2,2-dimetilbután', k: 'neohexán', f: 'C6H14', c: 'alkan', fp: '50 °C', p: 'A legelágazóbb hexánizomer, ezért a legalacsonyabb forráspontú közülük.', u: 'Benzinadalék (magas oktánszám).', h: 'Tűzveszélyes.' },
    { id: '23-dimetilbutan', s: 'CC(C)C(C)C', n: '2,3-dimetilbután', k: '', f: 'C6H14', c: 'alkan', fp: '58 °C', p: 'Két szomszédos szénatomon elágazó hexánizomer.', u: 'Benzinadalék, kutatás.', h: 'Tűzveszélyes.' },
    /* --- cikloalkánok --- */
    { id: 'ciklopropan', s: 'C1CC1', n: 'ciklopropán', k: '', f: 'C3H6', c: 'ciklo', fp: '−33 °C', p: 'Feszült, háromtagú gyűrű: a 60°-os gyűrűszög messze van a tetraéderes 109,5°-tól, ezért reakcióképes.', u: 'Régen altatószer volt.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'ciklobutan', s: 'C1CCC1', n: 'ciklobután', k: '', f: 'C4H8', c: 'ciklo', fp: '12 °C', p: 'Négytagú, szintén feszült gyűrű; a butének izomerje (C₄H₈).', u: 'Főleg kutatás.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'metilciklopropan', s: 'CC1CC1', n: 'metilciklopropán', k: '', f: 'C4H8', c: 'ciklo', p: 'Háromtagú gyűrű egy metilcsoporttal; a C₄H₈ képletű izomerek egyike.', u: 'Kutatás.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'ciklohexan', s: 'C1CCCCC1', n: 'ciklohexán', k: '', f: 'C6H12', c: 'ciklo', fp: '81 °C', mu: 0, p: 'Hattagú gyűrű; feszültségmentes „szék” konformációt vesz fel, így minden kötésszög közel 109,5°.', u: 'A nejlon alapanyagainak gyártása, oldószer.', h: 'Tűzveszélyes, irritáló.' },
    /* --- alkének, diének --- */
    { id: 'eten', s: 'C=C', n: 'etén', k: 'etilén', f: 'C2H4', c: 'alken', fp: '−104 °C', mu: 0, p: 'Színtelen, édeskés szagú gáz; sík molekula, a kettős kötés miatt könnyen addícionál.', u: 'Polietilén (PE) gyártása; növényi hormon, érleli a gyümölcsöket.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'propen', s: 'C=CC', n: 'propén', k: 'propilén', f: 'C3H6', c: 'alken', fp: '−48 °C', p: 'Színtelen gáz, a ciklopropán izomerje.', u: 'Polipropilén (PP) gyártása.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'but-1-en', s: 'C=CCC', n: 'but-1-én', k: '', f: 'C4H8', c: 'alken', fp: '−6 °C', p: 'A kettős kötés a lánc végén van.', u: 'Polietilén-kopolimerek (LLDPE) gyártása.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'but-2-en', s: 'CC=CC', n: 'but-2-én', k: '', f: 'C4H8', c: 'alken', p: 'A kettős kötés a lánc közepén van; cisz- és transz-izomerje is létezik (ezt a modell nem különbözteti meg).', u: 'Benzinadalékok, butadién gyártása.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'izobutilen', s: 'C=C(C)C', n: '2-metilpropén', k: 'izobutilén', f: 'C4H8', c: 'alken', fp: '−7 °C', p: 'Elágazó láncú butén.', u: 'Butilkaucsuk (belső gumik) gyártása.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'butadien', s: 'C=CC=C', n: 'buta-1,3-dién', k: 'butadién', f: 'C4H6', c: 'alken', fp: '−4 °C', p: 'Két konjugált kettős kötést tartalmazó gáz.', u: 'Szintetikus kaucsuk (gumiabroncsok) gyártása.', h: 'Rendkívül tűzveszélyes, rákkeltő.' },
    /* --- alkinek --- */
    { id: 'etin', s: 'C#C', n: 'etin', k: 'acetilén', f: 'C2H2', c: 'alkin', mu: 0, p: 'Színtelen gáz, lineáris molekula; a hármas kötés miatt nagyon reakcióképes, égése rendkívül forró lángot ad.', u: 'Lánghegesztés és -vágás (oxigén-acetilén láng), vegyipari alapanyag.', h: 'Rendkívül tűzveszélyes; nyomás alatt robbanékony, ezért acetonban oldva tárolják.' },
    { id: 'propin', s: 'C#CC', n: 'propin', k: 'metil-acetilén', f: 'C3H4', c: 'alkin', fp: '−23 °C', p: 'Színtelen gáz, a propadién izomerje.', u: 'Hegesztőgáz-keverékek, szerves szintézisek.', h: 'Rendkívül tűzveszélyes.' },
    /* --- aromás vegyületek --- */
    { id: 'benzol', s: 'C1=CC=CC=C1', n: 'benzol', k: '', f: 'C6H6', c: 'aromas', fp: '80 °C', mu: 0, p: 'Színtelen, jellegzetes szagú folyadék; sík hatszög, hat delokalizált π-elektronja különösen stabillá teszi. (A váltakozó kettős kötések csak a rajzolás eszközei.)', u: 'Műanyagok, festékek, gyógyszerek alapanyaga; oldószerként ma már kerülik.', h: 'Rákkeltő (leukémiát okozhat), tűzveszélyes.' },
    { id: 'toluol', s: 'CC1=CC=CC=C1', n: 'metilbenzol', k: 'toluol', f: 'C7H8', c: 'aromas', fp: '111 °C', p: 'Színtelen, jellegzetes szagú folyadék.', u: 'Oldószer (festékek, hígítók), benzinadalék.', h: 'Tűzveszélyes; az idegrendszert károsíthatja.' },
    { id: 'fenol', s: 'OC1=CC=CC=C1', n: 'fenol (hidroxibenzol)', k: 'karbolsav', f: 'C6H5OH', c: 'aromas', fp: '182 °C', p: 'Színtelen kristályos anyag, gyenge sav (erősebb, mint az alkoholok).', u: 'Műgyanták (bakelit), gyógyszerek gyártása; régen fertőtlenítőszer volt.', h: 'Mérgező és maró, a bőrön át is felszívódik.' },
    { id: 'sztirol', s: 'C=CC1=CC=CC=C1', n: 'etenilbenzol (vinilbenzol)', k: 'sztirol', f: 'C8H8', c: 'aromas', fp: '145 °C', p: 'Színtelen, olajos folyadék.', u: 'Polisztirol (hungarocell, eldobható poharak) gyártása.', h: 'Tűzveszélyes, irritáló.' },
    { id: 'anilin', s: 'NC1=CC=CC=C1', n: 'benzolamin (fenilamin)', k: 'anilin', f: 'C6H5NH2', c: 'aromas', fp: '184 °C', p: 'Színtelen, levegőn megbarnuló olajos folyadék, gyenge bázis.', u: 'Festékek, gyógyszerek, poliuretánok alapanyaga.', h: 'Mérgező, rontja a vér oxigénszállító képességét.' },
    { id: 'benzoesav', s: 'OC(=O)C1=CC=CC=C1', n: 'benzolkarbonsav', k: 'benzoesav', f: 'C6H5COOH', c: 'aromas', op: '122 °C', p: 'Fehér, kristályos, gyenge sav.', u: 'Tartósítószer (E210), illatszerek.', h: 'Irritáló.' },
    { id: 'aszpirin', s: 'CC(=O)OC1=CC=CC=C1C(=O)O', n: '2-acetoxibenzoesav', k: 'acetilszalicilsav, aszpirin', f: 'C9H8O4', c: 'aromas', p: 'Fehér kristályos anyag; egyszerre karbonsav és észter.', u: 'Fájdalom- és lázcsillapító, véralvadásgátló.', h: 'Túladagolva mérgező, gyomorvérzést okozhat; gyermekeknek csak orvosi javaslatra.' },
    { id: 'koffein', s: 'CN1C=NC2=C1C(=O)N(C)C(=O)N2C', n: '1,3,7-trimetilxantin', k: 'koffein', f: 'C8H10N4O2', c: 'aromas', p: 'Fehér, keserű ízű kristályos anyag; két összekapcsolódó gyűrűből áll, a központi idegrendszert serkenti.', u: 'Élénkítő: kávé, tea, energiaitalok.', h: 'Nagy adagban szívdobogás, álmatlanság; gyermekeknek kerülendő.' },
    /* --- alkoholok --- */
    { id: 'metanol', s: 'CO', n: 'metanol', k: 'metil-alkohol, faszesz', f: 'CH3OH', c: 'alkohol', fp: '65 °C', mu: 1.70, p: 'Színtelen, az etanoléhoz hasonló szagú folyadék – szagról nem lehet megkülönböztetni!', u: 'Oldószer, formaldehidgyártás, szélvédőmosó folyadék, üzemanyag.', h: 'Mérgező! Kis mennyiség is vakságot, nagyobb mennyiség halált okozhat; tűzveszélyes.' },
    { id: 'etanol', s: 'CCO', n: 'etanol', k: 'etil-alkohol, borszesz', f: 'C2H5OH', c: 'alkohol', fp: '78 °C', mu: 1.69, p: 'Színtelen folyadék; vízzel korlátlanul elegyedik.', u: 'Szeszes italok, fertőtlenítőszer, oldószer, bioüzemanyag (E10 benzin).', h: 'Tűzveszélyes; rendszeres fogyasztása függőséget, máj- és idegkárosodást okoz.' },
    { id: 'propan-1-ol', s: 'CCCO', n: 'propán-1-ol', k: 'n-propil-alkohol', f: 'C3H7OH', c: 'alkohol', fp: '97 °C', p: 'Színtelen folyadék, elsőrendű alkohol.', u: 'Oldószer, nyomdafestékek, fertőtlenítőszerek.', h: 'Tűzveszélyes, szemkárosító.' },
    { id: 'propan-2-ol', s: 'CC(O)C', n: 'propán-2-ol', k: 'izopropil-alkohol', f: 'C3H7OH', c: 'alkohol', fp: '82 °C', p: 'Színtelen folyadék, másodrendű alkohol; a propán-1-ol izomerje.', u: 'Kézfertőtlenítők, elektronikai tisztítószer.', h: 'Tűzveszélyes, szemirritáló.' },
    { id: 'butan-1-ol', s: 'CCCCO', n: 'bután-1-ol', k: 'n-butil-alkohol', f: 'C4H9OH', c: 'alkohol', fp: '118 °C', p: 'Színtelen folyadék, elsőrendű alkohol.', u: 'Oldószer festékekhez, lakkokhoz.', h: 'Tűzveszélyes, ártalmas.' },
    { id: 'butan-2-ol', s: 'CCC(C)O', n: 'bután-2-ol', k: 'szek-butil-alkohol', f: 'C4H9OH', c: 'alkohol', fp: '99,5 °C', p: 'Másodrendű alkohol; királis molekula (két tükörképi alakja van, ezt a modell nem különbözteti meg).', u: 'Oldószer, butanon előállítása.', h: 'Tűzveszélyes, irritáló.' },
    { id: 'izobutanol', s: 'CC(C)CO', n: '2-metilpropán-1-ol', k: 'izobutil-alkohol', f: 'C4H9OH', c: 'alkohol', fp: '108 °C', p: 'Elágazó láncú, elsőrendű alkohol.', u: 'Oldószer, lakkok, illatszerek.', h: 'Tűzveszélyes, irritáló.' },
    { id: 'tercbutanol', s: 'CC(C)(C)O', n: '2-metilpropán-2-ol', k: 'terc-butil-alkohol', f: 'C4H9OH', c: 'alkohol', fp: '82 °C', p: 'Harmadrendű alkohol, nehezen oxidálható; 25 °C körül megszilárdul.', u: 'Oldószer, benzinadalékok alapanyaga.', h: 'Tűzveszélyes, irritáló.' },
    { id: 'etilenglikol', s: 'OCCO', n: 'etán-1,2-diol', k: 'etilénglikol, glikol', f: 'C2H4(OH)2', c: 'alkohol', fp: '197 °C', p: 'Színtelen, édes ízű, szirupos folyadék; két hidroxilcsoportja van.', u: 'Fagyálló folyadék, a PET-palackok alapanyaga.', h: 'Mérgező (vesekárosodás); édes íze miatt különösen veszélyes gyerekekre és háziállatokra.' },
    { id: 'glicerin', s: 'OCC(O)CO', n: 'propán-1,2,3-triol', k: 'glicerin', f: 'C3H5(OH)3', c: 'alkohol', fp: '290 °C', p: 'Színtelen, édes ízű, sűrű folyadék; a zsírok és olajok építőköve.', u: 'Kozmetikumok, kézkrémek, élelmiszer-adalék (E422), nitroglicerin gyártása.', h: 'Nem veszélyes.' },
    /* --- éterek --- */
    { id: 'dimetil-eter', s: 'COC', n: 'metoximetán', k: 'dimetil-éter', f: 'CH3OCH3', c: 'eter', fp: '−24 °C', p: 'Színtelen gáz; az etanol izomerje (C₂H₆O), de nincs O–H kötése, ezért nem képez hidrogénkötést – ezért gáz, míg az etanol folyadék.', u: 'Aeroszolos hajtógáz, alternatív dízel-üzemanyag.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'etil-metil-eter', s: 'CCOC', n: 'metoxietán', k: 'etil-metil-éter', f: 'C2H5OCH3', c: 'eter', fp: '7 °C', p: 'Színtelen gáz; a propanolok izomerje (C₃H₈O).', u: 'Kevés gyakorlati felhasználása van.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'dietil-eter', s: 'CCOCC', n: 'etoxietán', k: 'dietil-éter, „éter”', f: 'C2H5OC2H5', c: 'eter', fp: '35 °C', mu: 1.15, p: 'Színtelen, nagyon illékony, jellegzetes szagú folyadék; a butanolok izomerje (C₄H₁₀O).', u: 'Oldószer; régen altatószer volt (1846-tól).', h: 'Rendkívül tűzveszélyes, gőze a padló mentén terjed; állás közben robbanékony peroxidok képződhetnek benne.' },
    { id: 'metil-propil-eter', s: 'COCCC', n: '1-metoxipropán', k: 'metil-propil-éter', f: 'C4H10O', c: 'eter', p: 'A C₄H₁₀O képletű izomerek egyike (éter).', u: 'Főleg kutatás.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'izopropil-metil-eter', s: 'COC(C)C', n: '2-metoxipropán', k: 'izopropil-metil-éter', f: 'C4H10O', c: 'eter', p: 'A C₄H₁₀O képletű izomerek egyike (elágazó éter).', u: 'Főleg kutatás.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'etilen-oxid', s: 'C1CO1', n: 'oxirán', k: 'etilén-oxid', f: 'C2H4O', c: 'eter', fp: '11 °C', p: 'Háromtagú, feszült gyűrűs éter, nagyon reakcióképes; az acetaldehid izomerje.', u: 'Orvosi eszközök sterilizálása, etilénglikol gyártása.', h: 'Rákkeltő, mérgező, rendkívül tűzveszélyes.' },
    /* --- aldehidek, ketonok --- */
    { id: 'formaldehid', s: 'C=O', n: 'metanal', k: 'formaldehid', f: 'HCHO', c: 'oxo', fp: '−19 °C', mu: 2.33, p: 'Szúrós szagú gáz, sík molekula; vizes oldata a formalin.', u: 'Műgyanták, ragasztók (forgácslap), biológiai preparátumok tartósítása.', h: 'Mérgező, rákkeltő, allergizáló.' },
    { id: 'acetaldehid', s: 'CC=O', n: 'etanal', k: 'acetaldehid', f: 'CH3CHO', c: 'oxo', fp: '20 °C', p: 'Illékony, szúrós-gyümölcsös szagú folyadék; a szervezetben az alkohol lebontásakor keletkezik.', u: 'Ecetsav és más vegyszerek gyártása.', h: 'Rendkívül tűzveszélyes, rákkeltő gyanús.' },
    { id: 'propanal', s: 'CCC=O', n: 'propanal', k: 'propionaldehid', f: 'C2H5CHO', c: 'oxo', fp: '48 °C', p: 'Színtelen, szúrós szagú folyadék; az aceton izomerje (C₃H₆O).', u: 'Műanyagok, gyógyszerek alapanyaga.', h: 'Tűzveszélyes, irritáló.' },
    { id: 'aceton', s: 'CC(=O)C', n: 'propanon', k: 'aceton', f: 'CH3COCH3', c: 'oxo', fp: '56 °C', mu: 2.88, p: 'Színtelen, jellegzetes szagú, illékony folyadék, vízzel elegyedik; a legegyszerűbb keton.', u: 'Körömlakklemosó, oldószer, műanyagipar.', h: 'Rendkívül tűzveszélyes, szemirritáló.' },
    { id: 'butanon', s: 'CCC(=O)C', n: 'butanon', k: 'etil-metil-keton (MEK)', f: 'C2H5COCH3', c: 'oxo', fp: '80 °C', p: 'Színtelen, acetonszerű szagú folyadék.', u: 'Oldószer festékekhez, ragasztókhoz.', h: 'Tűzveszélyes, irritáló.' },
    /* --- karbonsavak --- */
    { id: 'hangyasav', s: 'OC=O', n: 'metánsav', k: 'hangyasav', f: 'HCOOH', c: 'karbonsav', fp: '101 °C', p: 'Szúrós szagú folyadék; a hangyák és a csalán csípésében is van.', u: 'Bőrcserzés, méhészet (atkák elleni szer), tartósítás.', h: 'Maró.' },
    { id: 'ecetsav', s: 'CC(=O)O', n: 'etánsav', k: 'ecetsav', f: 'CH3COOH', c: 'karbonsav', fp: '118 °C', p: 'Szúrós szagú, gyenge sav; a háztartási ecet ennek híg vizes oldata.', u: 'Ételecet, savanyúságok, vízkőoldás, észterek gyártása.', h: 'Tömény formában (jégecet) maró és tűzveszélyes.' },
    { id: 'propionsav', s: 'CCC(=O)O', n: 'propánsav', k: 'propionsav', f: 'C2H5COOH', c: 'karbonsav', fp: '141 °C', p: 'Szúrós szagú folyadék, gyenge sav.', u: 'Tartósítószer (E280) pékárukban.', h: 'Maró.' },
    { id: 'vajsav', s: 'CCCC(=O)O', n: 'butánsav', k: 'vajsav', f: 'C3H7COOH', c: 'karbonsav', fp: '164 °C', p: 'Avas vajra emlékeztető, kellemetlen szagú folyadék; az avas vaj és az izzadság szagáért is felel.', u: 'Észtereit gyümölcsös illat- és aromaanyagként használják.', h: 'Maró.' },
    /* --- észterek --- */
    { id: 'metil-acetat', s: 'CC(=O)OC', n: 'metil-etanoát', k: 'metil-acetát', f: 'CH3COOCH3', c: 'eszter', fp: '57 °C', p: 'Kellemes illatú folyadék; a propionsav izomerje.', u: 'Oldószer (ragasztók, festékek).', h: 'Tűzveszélyes, irritáló.' },
    { id: 'etil-acetat', s: 'CC(=O)OCC', n: 'etil-etanoát', k: 'etil-acetát', f: 'CH3COOC2H5', c: 'eszter', fp: '77 °C', p: 'Gyümölcsös illatú folyadék; ecetsavból és etanolból képződik (észterképzés).', u: 'Körömlakklemosó, ragasztók oldószere, kávé koffeinmentesítése.', h: 'Tűzveszélyes, irritáló.' },
    { id: 'metil-formiat', s: 'O=COC', n: 'metil-metanoát', k: 'metil-formiát', f: 'HCOOCH3', c: 'eszter', fp: '32 °C', p: 'Kellemes illatú, illékony folyadék; az ecetsav izomerje (C₂H₄O₂).', u: 'Szerves szintézisek, habosítószer.', h: 'Rendkívül tűzveszélyes.' },
    { id: 'etil-formiat', s: 'O=COCC', n: 'etil-metanoát', k: 'etil-formiát', f: 'HCOOC2H5', c: 'eszter', fp: '54 °C', p: 'Rumra emlékeztető illatú folyadék.', u: 'Aroma- és illatanyag.', h: 'Tűzveszélyes, irritáló.' },
    /* --- halogénezett szénhidrogének --- */
    { id: 'klormetan', s: 'CCl', n: 'klórmetán', k: 'metil-klorid', f: 'CH3Cl', c: 'halogen', fp: '−24 °C', mu: 1.89, p: 'Színtelen gáz, poláris molekula.', u: 'Szilikonok gyártása.', h: 'Rendkívül tűzveszélyes, mérgező.' },
    { id: 'diklormetan', s: 'ClCCl', n: 'diklórmetán', k: 'metilén-klorid', f: 'CH2Cl2', c: 'halogen', fp: '40 °C', mu: 1.60, p: 'Színtelen, illékony, édeskés szagú folyadék.', u: 'Oldószer, festékeltávolító.', h: 'Ártalmas, rákkeltő gyanús.' },
    { id: 'kloroform', s: 'ClC(Cl)Cl', n: 'triklórmetán', k: 'kloroform', f: 'CHCl3', c: 'halogen', fp: '61 °C', mu: 1.04, p: 'Édeskés szagú, a víznél nehezebb folyadék.', u: 'Laboratóriumi oldószer; régen altatószer volt.', h: 'Ártalmas, rákkeltő gyanús, máj- és vesekárosító.' },
    { id: 'szen-tetraklorid', s: 'ClC(Cl)(Cl)Cl', n: 'tetraklórmetán', k: 'szén-tetraklorid', f: 'CCl4', c: 'halogen', fp: '77 °C', mu: 0, p: 'Apoláris folyadék: a négy poláris C–Cl kötés dipólusa a tetraéderes alak miatt kioltja egymást.', u: 'Régen tűzoltó- és tisztítószer volt; ma az ózonréteg védelme miatt tiltott.', h: 'Mérgező, májkárosító, az ózonréteget károsítja.' },
    { id: 'vinil-klorid', s: 'C=CCl', n: 'klóretén', k: 'vinil-klorid', f: 'C2H3Cl', c: 'halogen', fp: '−13 °C', p: 'Színtelen gáz.', u: 'PVC (polivinil-klorid) gyártása.', h: 'Rákkeltő, rendkívül tűzveszélyes.' },
    { id: '1-klorpropan', s: 'CCCCl', n: '1-klórpropán', k: 'n-propil-klorid', f: 'C3H7Cl', c: 'halogen', fp: '47 °C', p: 'A klóratom a lánc végén van.', u: 'Szerves szintézisek.', h: 'Tűzveszélyes, ártalmas.' },
    { id: '2-klorpropan', s: 'CC(Cl)C', n: '2-klórpropán', k: 'izopropil-klorid', f: 'C3H7Cl', c: 'halogen', fp: '36 °C', p: 'A klóratom a középső szénatomon van; az 1-klórpropán izomerje.', u: 'Szerves szintézisek.', h: 'Tűzveszélyes, ártalmas.' },
    { id: '11-diklóretan', s: 'CC(Cl)Cl', n: '1,1-diklóretán', k: 'etilidén-diklorid', f: 'C2H4Cl2', c: 'halogen', fp: '57 °C', p: 'Mindkét klór ugyanazon a szénatomon van.', u: 'Oldószer, szintézisek.', h: 'Tűzveszélyes, ártalmas.' },
    { id: '12-diklóretan', s: 'ClCCCl', n: '1,2-diklóretán', k: 'etilén-diklorid', f: 'C2H4Cl2', c: 'halogen', fp: '84 °C', p: 'A két klór két különböző szénatomon van; az 1,1-diklóretán izomerje.', u: 'A vinil-klorid (és így a PVC) gyártásának köztiterméke.', h: 'Rákkeltő gyanús, tűzveszélyes.' },
    /* --- nitrogéntartalmú szerves vegyületek --- */
    { id: 'metilamin', s: 'CN', n: 'metánamin', k: 'metil-amin', f: 'CH3NH2', c: 'nitrogen', fp: '−6 °C', p: 'Halszagú gáz, gyenge bázis (az ammónia rokona).', u: 'Gyógyszerek, növényvédő szerek gyártása.', h: 'Rendkívül tűzveszélyes, maró.' },
    { id: 'karbamid', s: 'NC(N)=O', n: 'karbamid', k: 'urea, húgysav­amid', f: 'CO(NH2)2', c: 'nitrogen', op: '133 °C', p: 'Fehér kristályos anyag; az emlősök ebben a formában ürítik a fehérjék nitrogénjét. Wöhler 1828-as karbamidszintézisét a szerves kémia egyik kezdőpontjának tartják.', u: 'Műtrágya, AdBlue dízeladalék, műgyanták, kozmetikumok.', h: 'Nem veszélyes.' },
    { id: 'glicin', s: 'NCC(=O)O', n: 'aminoetánsav', k: 'glicin', f: 'C2H5NO2', c: 'nitrogen', p: 'A legegyszerűbb aminosav; nincs tükörképi párja.', u: 'A fehérjék építőköve, ízfokozó.', h: 'Nem veszélyes.' },
    { id: 'alanin', s: 'CC(N)C(=O)O', n: '2-aminopropánsav', k: 'alanin', f: 'C3H7NO2', c: 'nitrogen', p: 'Fehérjealkotó aminosav, királis molekula.', u: 'A fehérjék építőköve, táplálékkiegészítők.', h: 'Nem veszélyes.' },
    { id: 'acetonitril', s: 'CC#N', n: 'etánnitril', k: 'acetonitril', f: 'CH3CN', c: 'nitrogen', fp: '82 °C', p: 'Színtelen, poláris folyadék.', u: 'Oldószer (pl. kromatográfiában), akkumulátorok elektrolitja.', h: 'Tűzveszélyes, mérgező.' },
    /* --- szénhidrátok --- */
    { id: 'glukoz', s: 'OCC1OC(O)C(O)C(O)C1O', n: 'D-glükopiranóz', k: 'glükóz (szőlőcukor), gyűrűs alak', f: 'C6H12O6', c: 'szenhidrat', p: 'Hattagú gyűrű (5 C + 1 O). Az α és β alak, illetve a galaktóz és a mannóz csak a térállásban különbözik – a szerkezeti képletük ugyanez, ezért a modell nem különbözteti meg őket.', u: 'A sejtek fő energiaforrása; infúziók, édesipar.', h: 'Nem veszélyes.' },
    { id: 'glukoz-nyilt', s: 'OCC(O)C(O)C(O)C(O)C=O', n: '2,3,4,5,6-pentahidroxihexanal', k: 'glükóz (szőlőcukor), nyílt láncú alak', f: 'C6H12O6', c: 'szenhidrat', p: 'Aldohexóz: aldehidcsoportja miatt redukáló cukor (adja az ezüsttükörpróbát). Vizes oldatban túlnyomórészt gyűrűs alakban van.', u: 'A sejtek fő energiaforrása.', h: 'Nem veszélyes.' },
    { id: 'fruktoz', s: 'OCC(O)C(O)C(O)C(=O)CO', n: '1,3,4,5,6-pentahidroxihexán-2-on', k: 'fruktóz (gyümölcscukor), nyílt láncú alak', f: 'C6H12O6', c: 'szenhidrat', p: 'Ketohexóz, a glükóz szerkezeti izomerje; a legédesebb természetes cukor.', u: 'Gyümölcsök, méz; édesítőszer.', h: 'Nem veszélyes.' }
  ];
  var BYID = {}, BYKEY = {};
  LIB.forEach(function (m) {
    m.g = smiles(m.s); m.key = canon(m.g); m.cnt = counts(m.g); m.hill = hill(m.cnt); m.M = massOf(m.cnt); m.q = charge(m.g);
    BYID[m.id] = m; BYKEY[m.key] = m;
  });
  function title(m) { var t = m.k ? m.k.split(',')[0].replace(/\s*\(.*$/, '') : m.n; return t.charAt(0).toUpperCase() + t.slice(1); }
  function nameLine(m) {
    var k = m.k ? m.k.charAt(0).toUpperCase() + m.k.slice(1) : '', n = m.n;
    return k ? k + ' · ' + n : n.charAt(0).toUpperCase() + n.slice(1);
  }

  /* ================= H-kiegészítés és szabad irány (2D) ================= */
  function freeAngle(g, ad, i, extra) {
    var a = g.a[i], used = ad[i].map(function (x) { return Math.atan2(g.a[x.n].y - a.y, g.a[x.n].x - a.x); }).concat(extra || []);
    if (!used.length) return 0;
    if (used.length === 1) {
      /* lánc: cikcakk helyett egyenes vonal – a hagyományos iskolai szerkezeti képlet */
      var o = used[0] + Math.PI, alt = [o, o - Math.PI / 2, o + Math.PI / 2], bestA = o, bestD = -1;
      alt.forEach(function (t) { var d = crowd(g, a, t); if (d > bestD + 4) { bestD = d; bestA = t; } });
      return bestA;
    }
    var best = 0, bs = -1;
    for (var k = 0; k < 24; k++) {
      var t = k * Math.PI / 12, md = 9;
      used.forEach(function (u) { var d = Math.abs(((t - u) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI); md = Math.min(md, d); });
      var sc = md * 100 + Math.min(crowd(g, a, t), 60) * 0.5;
      if (sc > bs + 1e-6) { bs = sc; best = t; }
    }
    return best;
  }
  function crowd(g, a, t) {
    var x = a.x + Math.cos(t) * 56, y = a.y + Math.sin(t) * 56, md = 999;
    g.a.forEach(function (b) { if (b !== a) md = Math.min(md, Math.sqrt((b.x - x) * (b.x - x) + (b.y - y) * (b.y - y))); });
    return md;
  }
  function addH(g) {
    var ad = adj(g), n = g.a.length, added = 0;
    for (var i = 0; i < n; i++) {
      var inf = atomInfo(g, ad, i);
      if (g.a[i].e === 'H' && ad[i].length) continue;
      for (var k = 0; k < inf.miss; k++) {
        var t = freeAngle(g, ad, i), a = g.a[i], L = 44;
        g.a.push({ e: 'H', q: 0, x: a.x + Math.cos(t) * L, y: a.y + Math.sin(t) * L });
        g.b.push({ i: i, j: g.a.length - 1, o: 1 });
        ad = adj(g); added++;
      }
    }
    return added;
  }
  /* H-kiegészítés koordináták nélkül (csak a felismeréshez) */
  function withH(g) {
    var h = clone(g), ad = adj(h), n = h.a.length;
    for (var i = 0; i < n; i++) {
      var inf = atomInfo(h, ad, i);
      if (h.a[i].e === 'H' && ad[i].length) continue;
      for (var k = 0; k < inf.miss; k++) { h.a.push({ e: 'H', q: 0 }); h.b.push({ i: i, j: h.a.length - 1, o: 1 }); }
    }
    return h;
  }

  /* ================= 2D elrendezés (szerkezeti képlethez) ================= */
  function rings(g, ad) {
    var out = [], seen = {};
    /* legkisebb gyűrű minden kötésre (BFS a kötés elhagyásával) */
    g.b.forEach(function (b, k) {
      var prev = {}, q = [b.i]; prev[b.i] = -1;
      while (q.length) {
        var v = q.shift(); if (v === b.j) break;
        ad[v].forEach(function (x) { if (x.k !== k && !(x.n in prev)) { prev[x.n] = v; q.push(x.n); } });
      }
      if (!(b.j in prev)) return;
      var path = [], v2 = b.j; while (v2 !== -1) { path.push(v2); v2 = prev[v2]; }
      if (path.length > 8) return;
      var key = path.slice().sort(function (a, c) { return a - c; }).join(',');
      if (!seen[key]) { seen[key] = 1; out.push(path); }
    });
    out.sort(function (a, b) { return b.length - a.length; });
    return out;
  }
  /* aromás (váltakozó kötésű hattagú) gyűrűk kötései */
  function aromBonds(g, ad) {
    var out = {};
    rings(g, ad).forEach(function (r) {
      if (r.length !== 6) return;
      var ks = [], t, ok = true;
      for (t = 0; t < 6; t++) { var u = r[t], w = r[(t + 1) % 6]; ad[u].forEach(function (x) { if (x.n === w) ks.push(x.k); }); }
      for (t = 0; t < 6; t++) if (g.b[ks[t]].o + g.b[ks[(t + 1) % 6]].o !== 3) ok = false;
      if (ok) ks.forEach(function (k) { out[k] = 1; });
    });
    return out;
  }
  function layout2D(g) {
    var n = g.a.length, ad = adj(g), P = [], placed = [], i, k;
    for (i = 0; i < n; i++) { P.push({ x: 0, y: 0 }); placed.push(false); }
    if (!n) return P;
    var R = rings(g, ad), inRing = {}, ringOf = {};
    R.forEach(function (r, ri) { r.forEach(function (v) { inRing[v] = (inRing[v] || 0) + 1; if (!(v in ringOf)) ringOf[v] = ri; }); });
    var ringDone = {}, dirOf = [], comp = components(g), offX = 0;
    comp.forEach(function (c) {
      /* kiinduló atom: a legtöbb szomszédú nehézatom */
      var start = c.idx[0];
      c.idx.forEach(function (v) { if (g.a[v].e !== 'H' && (g.a[start].e === 'H' || ad[v].length > ad[start].length)) start = v; });
      P[start] = { x: offX, y: 0 }; placed[start] = true; dirOf[start] = Math.PI;
      var queue = [start];
      function placeRing(ri, v, dir) {
        if (ringDone[ri]) return; ringDone[ri] = 1;
        var r = R[ri], m = r.length, rad = 0.5 / Math.sin(Math.PI / m), s = r.indexOf(v);
        var cx = P[v].x + Math.cos(dir) * rad, cy = P[v].y + Math.sin(dir) * rad, a0 = Math.atan2(P[v].y - cy, P[v].x - cx);
        /* a már elhelyezett gyűrűatomok irányával egyező körüljárás */
        var sign = 1;
        for (var t = 1; t < m; t++) { var w = r[(s + t) % m]; if (placed[w]) { var ang = Math.atan2(P[w].y - cy, P[w].x - cx), d1 = Math.abs(Math.atan2(Math.sin(ang - (a0 + 2 * Math.PI * t / m)), Math.cos(ang - (a0 + 2 * Math.PI * t / m)))), d2 = Math.abs(Math.atan2(Math.sin(ang - (a0 - 2 * Math.PI * t / m)), Math.cos(ang - (a0 - 2 * Math.PI * t / m)))); sign = d1 <= d2 ? 1 : -1; break; } }
        for (t = 0; t < m; t++) {
          var u = r[(s + t) % m]; if (placed[u]) continue;
          var an = a0 + sign * 2 * Math.PI * t / m;
          P[u] = { x: cx + Math.cos(an) * rad, y: cy + Math.sin(an) * rad }; placed[u] = true;
          dirOf[u] = an; queue.push(u);
        }
        dirOf[v] = a0;
      }
      if (start in ringOf) placeRing(ringOf[start], start, 0);
      while (queue.length) {
        var v = queue.shift(), kids = ad[v].filter(function (x) { return !placed[x.n]; });
        if (!kids.length) continue;
        var base = dirOf[v] == null ? 0 : dirOf[v];
        if (v in ringOf) {
          var others = ad[v].filter(function (x) { return placed[x.n]; }).map(function (x) { return Math.atan2(P[x.n].y - P[v].y, P[x.n].x - P[v].x); });
          var sx = 0, sy = 0; others.forEach(function (a) { sx -= Math.cos(a); sy -= Math.sin(a); });
          base = Math.atan2(sy, sx);
        }
        var nbIn = ad[v].length - kids.length, tot = ad[v].length, step;
        if (!nbIn && !(v in ringOf)) {
          kids.forEach(function (x, j) { var an = Math.PI + 2 * Math.PI * j / kids.length + (kids.length === 2 ? 0 : 0), L = g.a[x.n].e === 'H' ? 0.8 : 1;
            P[x.n] = { x: P[v].x + Math.cos(an) * L, y: P[v].y + Math.sin(an) * L }; placed[x.n] = true; dirOf[x.n] = an;
            if (x.n in ringOf) placeRing(ringOf[x.n], x.n, an);
            queue.push(x.n); });
          continue;
        }
        if (v in ringOf) step = kids.length > 1 ? 0.75 : 0;
        else if (tot === 2) {
          var sp = ad[v].some(function (x) { return x.o === 3; }) || ad[v].filter(function (x) { return x.o === 2; }).length === 2;
          step = 0; base += sp || g.a[v].e === 'C' ? 0 : (v % 2 ? 1 : -1) * Math.PI / 3 * (nbIn ? 1 : 0);
        } else step = 2 * Math.PI / tot;
        kids.forEach(function (x, j) {
          var an = base + (j - (kids.length - 1) / 2) * step, L = g.a[x.n].e === 'H' ? 0.8 : 1;
          if (x.n in ringOf && !ringDone[ringOf[x.n]]) { P[x.n] = { x: P[v].x + Math.cos(an) * L, y: P[v].y + Math.sin(an) * L }; placed[x.n] = true; dirOf[x.n] = an; placeRing(ringOf[x.n], x.n, an); queue.push(x.n); return; }
          P[x.n] = { x: P[v].x + Math.cos(an) * L, y: P[v].y + Math.sin(an) * L }; placed[x.n] = true; dirOf[x.n] = an; queue.push(x.n);
        });
      }
      var mx = -1e9; c.idx.forEach(function (v) { mx = Math.max(mx, P[v].x); });
      offX = mx + 2;
    });
    /* erőtér-finomítás: kötéshossz, szomszédos kötések szöge, taszítás */
    var bonded = {};
    g.b.forEach(function (b) { bonded[b.i + ',' + b.j] = bonded[b.j + ',' + b.i] = 1; });
    for (var it = 0; it < 260; it++) {
      var D = P.map(function () { return { x: 0, y: 0 }; }), st = 0.12 * (1 - it / 300);
      g.b.forEach(function (b) {
        var L = (g.a[b.i].e === 'H' || g.a[b.j].e === 'H') ? 0.8 : 1, dx = P[b.j].x - P[b.i].x, dy = P[b.j].y - P[b.i].y, d = Math.sqrt(dx * dx + dy * dy) || 1e-3, f = (d - L) / d * 0.5;
        D[b.i].x += dx * f; D[b.i].y += dy * f; D[b.j].x -= dx * f; D[b.j].y -= dy * f;
      });
      for (i = 0; i < n; i++) for (k = i + 1; k < n; k++) {
        if (bonded[i + ',' + k]) continue;
        var dx2 = P[k].x - P[i].x, dy2 = P[k].y - P[i].y, d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1e-3, lim = 1.45;
        if (d2 < lim) { var f2 = (lim - d2) / d2 * 0.25; D[i].x -= dx2 * f2; D[i].y -= dy2 * f2; D[k].x += dx2 * f2; D[k].y += dy2 * f2; }
      }
      for (i = 0; i < n; i++) { P[i].x += D[i].x * st * 4; P[i].y += D[i].y * st * 4; }
    }
    return P;
  }

  /* ================= 3D: VSEPR-szimuláció ================= */
  function radius(e) { return ELS[e] ? ELS[e][4] : 1; }
  var LPW = 1.3, LPW5 = 1.3, IDEAL = { '2,0': 180, '3,0': 120, '2,1': 118, '4,0': 109.47, '3,1': 107, '2,2': 104.5 };
  function embed3D(g, xy) {
    var n = g.a.length, ad = adj(g), P = [], i, j, k;
    var L2 = xy || layout2D(g);
    for (i = 0; i < n; i++) P.push([L2[i].x * 1.45, L2[i].y * 1.45, 0.45 * Math.sin(i * 2.399 + 0.5)]);
    var info = g.a.map(function (a, v) { return atomInfo(g, ad, v); }), lps = [], dom = [], mass = [];
    for (i = 0; i < n; i++) mass.push(g.a[i].e === 'H' ? 1 : 2);
    for (i = 0; i < n; i++) {
      dom[i] = ad[i].map(function (x) { return x.n; });
      if (g.a[i].e === 'H' || METAL[g.a[i].e]) continue;
      var nl = Math.min(info[i].lp, 6 - dom[i].length);
      if (!dom[i].length) nl = 0;
      for (k = 0; k < nl; k++) {
        var t = k * 2.1 + i;
        P.push([P[i][0] + 0.5 * Math.cos(t), P[i][1] + 0.5 * Math.sin(t), P[i][2] + (k % 2 ? 0.5 : -0.5)]);
        lps.push({ a: i, p: P.length - 1 }); dom[i].push(P.length - 1); mass.push(0.3);
      }
    }
    var isLp = {}; lps.forEach(function (l) { isLp[l.p] = l; });
    var terminal = ad.map(function (x) { return x.length === 1; });
    var ar = aromBonds(g, ad);
    var cons = g.b.map(function (b, bi) {
      var f = ar[bi] ? 0.93 : b.o === 2 ? 0.87 : b.o === 3 ? 0.78 : 1;
      return [b.i, b.j, (radius(g.a[b.i].e) + radius(g.a[b.j].e)) * f];
    });
    lps.forEach(function (l) { cons.push([l.a, l.p, 0.55]); });
    /* 1–3 távolság-kényszerek a VSEPR-szögekből (legfeljebb 4 domén esetén) – gyors, stabil konvergencia */
    var fixedC = {}, small = {}, linear = []; rings(g, ad).forEach(function (r) { if (r.length <= 4) r.forEach(function (v) { small[v] = 1; }); });
    var blen = {}; cons.forEach(function (c) { blen[c[0] + ',' + c[1]] = blen[c[1] + ',' + c[0]] = c[2]; });
    for (i = 0; i < n; i++) {
      var X = ad[i].length, Ee = dom[i].length - X, th = IDEAL[X + ',' + Ee];
      if (X >= 2 && (X + Ee === 5 || X + Ee === 6)) {
        /* kiterjesztett oktett: nemkötő párok SN=5-nél ekvatoriális, SN=6-nál transz helyzetbe */
        var slots = X + Ee === 5 ? ['a', 'a', 'e', 'e', 'e'].slice(0, 5 - Ee) : [0, 1, 2, 3, 4, 5].slice(Ee);
        fixedC[i] = 1;
        for (j = 0; j < X; j++) for (k = j + 1; k < X; k++) {
          var s1 = slots[j], s2 = slots[k], ang;
          if (X + Ee === 5) ang = s1 === 'a' && s2 === 'a' ? 180 : s1 === 'e' && s2 === 'e' ? 120 : 90;
          else ang = (s1 >> 1) === (s2 >> 1) ? 180 : 90;
          var b1 = ad[i][j].n, b2 = ad[i][k].n, l1 = blen[i + ',' + b1], l2 = blen[i + ',' + b2];
          cons.push([b1, b2, Math.sqrt(l1 * l1 + l2 * l2 - 2 * l1 * l2 * Math.cos(ang * Math.PI / 180)), 0.5]);
        }
        continue;
      }
      if (X < 2 || th == null || small[i]) continue;
      fixedC[i] = 1;
      if (th === 180) linear.push([i, ad[i][0].n, ad[i][1].n]);
      for (j = 0; j < X; j++) for (k = j + 1; k < X; k++) {
        var a1 = ad[i][j].n, a2 = ad[i][k].n, la = blen[i + ',' + a1], lb = blen[i + ',' + a2];
        cons.push([a1, a2, Math.sqrt(la * la + lb * lb - 2 * la * lb * Math.cos(th * Math.PI / 180)), 0.5]);
      }
    }
    var near = {}, bo = {};
    g.b.forEach(function (b) { bo[b.i + ',' + b.j] = bo[b.j + ',' + b.i] = b.o; });
    g.b.forEach(function (b) { near[b.i + ',' + b.j] = near[b.j + ',' + b.i] = 1; });
    for (i = 0; i < n; i++) ad[i].forEach(function (x) { ad[i].forEach(function (y) { if (x.n !== y.n) near[x.n + ',' + y.n] = 1; }); });
    var ringB = {}; rings(g, ad).forEach(function (r) { for (var t = 0; t < r.length; t++) { var u = r[t], w = r[(t + 1) % r.length]; ringB[u + ',' + w] = ringB[w + ',' + u] = 1; } });
    var dbl = g.b.filter(function (b) { return b.o === 2 && ad[b.i].length + ad[b.j].length > 2 && !ringB[b.i + ',' + b.j]; });
    function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function len(a) { return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1e-9; }
    function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    var T = 700, seed = 12345;
    function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
    for (var it = 0; it < T; it++) {
      var step = 0.5 * (1 - it / T) + 0.08;
      /* elektronpár-domének taszítása minden központi atom körül (egységvektorokon) */
      for (i = 0; i < n; i++) {
        var D = dom[i]; if (D.length < 2) continue;
        var U = D.map(function (p) { var v = sub(P[p], P[i]), l = len(v); return [v[0] / l, v[1] / l, v[2] / l, l]; });
        var W = D.map(function (p) { return isLp[p] ? (D.length >= 5 ? LPW5 : LPW) : 1 + 0.12 * ((bo[i + ',' + p] || 1) - 1); });
        for (j = 0; j < D.length; j++) {
          var F = [0, 0, 0];
          for (k = 0; k < D.length; k++) {
            if (k === j) continue;
            var d = [U[j][0] - U[k][0], U[j][1] - U[k][1], U[j][2] - U[k][2]], l3 = Math.pow(len(d), 3) + 0.02, w = W[j] * W[k];
            F[0] += d[0] / l3 * w; F[1] += d[1] / l3 * w; F[2] += d[2] / l3 * w;
          }
          var rd = F[0] * U[j][0] + F[1] * U[j][1] + F[2] * U[j][2];
          F = [F[0] - rd * U[j][0], F[1] - rd * U[j][1], F[2] - rd * U[j][2]];
          var fl = len(F), cap = 0.25; if (fl > cap) F = [F[0] / fl * cap, F[1] / fl * cap, F[2] / fl * cap];
          var p = D[j], r = U[j][3] * step * Math.min(2.5, 1 / mass[p]);
          if ((terminal[i] || fixedC[i]) && !isLp[p]) continue;
          P[p][0] += F[0] * r; P[p][1] += F[1] * r; P[p][2] += F[2] * r;
        }
      }
      /* „hűtés”: kezdetben kis véletlen rezgés, hogy a modell ne ragadjon be rossz alakba */
      if (it < T * 0.45) { var amp = 0.08 * (1 - it / (T * 0.45)); P.forEach(function (p) { p[0] += (rnd() - 0.5) * amp; p[1] += (rnd() - 0.5) * amp; p[2] += (rnd() - 0.5) * amp; }); }
      /* nem kötött atomok gyenge taszítása */
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) {
        if (near[i + ',' + j]) continue;
        var dd = sub(P[j], P[i]), ll = len(dd), lim = 1.1 * (radius(g.a[i].e) + radius(g.a[j].e)) + 0.9;
        if (ll < lim) { var f = (lim - ll) / ll * step * 0.06; P[i][0] -= dd[0] * f; P[i][1] -= dd[1] * f; P[i][2] -= dd[2] * f; P[j][0] += dd[0] * f; P[j][1] += dd[1] * f; P[j][2] += dd[2] * f; }
      }
      /* kettős kötés: a két végatom szubsztituensei egy síkban */
      dbl.forEach(function (b) {
        var A = b.i, B = b.j, ref = dom[A].filter(function (x) { return x !== B; })[0], other = B;
        if (ref == null) { ref = dom[B].filter(function (x) { return x !== A; })[0]; A = b.j; B = b.i; }
        if (ref == null) return;
        var nrm = cross(sub(P[ref], P[A]), sub(P[B], P[A])), nl2 = len(nrm); nrm = [nrm[0] / nl2, nrm[1] / nl2, nrm[2] / nl2];
        dom[B].concat(dom[A]).forEach(function (x) {
          if (x === A || x === B || x === ref || (x < n && g.a[x].e !== 'H')) return;
          var v = sub(P[x], P[A]), h = (v[0] * nrm[0] + v[1] * nrm[1] + v[2] * nrm[2]) * 0.3;
          P[x][0] -= nrm[0] * h; P[x][1] -= nrm[1] * h; P[x][2] -= nrm[2] * h;
        });
        void other;
      });
      /* lineáris központok (AX₂, AX₂E₃): a 180°-ot a távolság-kényszer lassan éri el, ezért a végén „kiegyenesítjük” */
      if (it > T - 200) linear.forEach(function (c) {
        var a = c[1], b = c[2], u = sub(P[c[0]], P[a]), l = len(u), lb = blen[c[0] + ',' + b];
        var t = [P[c[0]][0] + u[0] / l * lb, P[c[0]][1] + u[1] / l * lb, P[c[0]][2] + u[2] / l * lb];
        P[b][0] += (t[0] - P[b][0]) * 0.5; P[b][1] += (t[1] - P[b][1]) * 0.5; P[b][2] += (t[2] - P[b][2]) * 0.5;
      });
      /* kényszerek: kötéshosszak */
      for (var pass = 0; pass < (it > T - 150 ? 8 : 3); pass++) cons.forEach(function (c) {
        var v = sub(P[c[1]], P[c[0]]), l = len(v), df = (l - c[2]) / l * (c[3] || 1), ma = mass[c[0]], mb = mass[c[1]], wa = mb / (ma + mb), wb = ma / (ma + mb);
        P[c[0]][0] += v[0] * df * wa; P[c[0]][1] += v[1] * df * wa; P[c[0]][2] += v[2] * df * wa;
        P[c[1]][0] -= v[0] * df * wb; P[c[1]][1] -= v[1] * df * wb; P[c[1]][2] -= v[2] * df * wb;
      });
    }
    /* utófeldolgozás: lineáris központ → a „b” oldali ág eltolása a pontos 180°-hoz */
    linear.forEach(function (c) {
      var a = c[1], b = c[2], u = sub(P[c[0]], P[a]), l = len(u), lb = blen[c[0] + ',' + b];
      var C0 = P[c[0]], from = sub(P[b], C0), fl = len(from), to = [u[0] / l, u[1] / l, u[2] / l];
      var f1 = [from[0] / fl, from[1] / fl, from[2] / fl], ax = cross(f1, to), sn = len(ax), cs = f1[0] * to[0] + f1[1] * to[1] + f1[2] * to[2];
      if (sn < 1e-6) return;
      ax = [ax[0] / sn, ax[1] / sn, ax[2] / sn];
      var seen = {}, st = [b]; seen[c[0]] = 1; seen[b] = 1;
      while (st.length) { var v = st.pop(); (dom[v] || []).forEach(function (w) { if (!seen[w]) { seen[w] = 1; st.push(w); } }); }
      if (seen[a]) return;
      Object.keys(seen).forEach(function (w) {
        w = +w; if (w === c[0]) return;
        var r = sub(P[w], C0), kx = cross(ax, r), kd = ax[0] * r[0] + ax[1] * r[1] + ax[2] * r[2];
        /* Rodrigues-forgatás */
        P[w] = [C0[0] + r[0] * cs + kx[0] * sn + ax[0] * kd * (1 - cs), C0[1] + r[1] * cs + kx[1] * sn + ax[1] * kd * (1 - cs), C0[2] + r[2] * cs + kx[2] * sn + ax[2] * kd * (1 - cs)];
      });
      void lb;
    });
    var cx = 0, cy = 0, cz = 0;
    for (i = 0; i < n; i++) { cx += P[i][0]; cy += P[i][1]; cz += P[i][2]; }
    cx /= n || 1; cy /= n || 1; cz /= n || 1;
    P.forEach(function (p) { p[0] -= cx; p[1] -= cy; p[2] -= cz; });
    return { P: P.slice(0, n), LP: lps.map(function (l) { return { a: l.a, p: P[l.p] }; }) };
  }
  function angleAt(P, c, a, b) {
    var u = [P[a][0] - P[c][0], P[a][1] - P[c][1], P[a][2] - P[c][2]], v = [P[b][0] - P[c][0], P[b][1] - P[c][1], P[b][2] - P[c][2]];
    var d = (u[0] * v[0] + u[1] * v[1] + u[2] * v[2]) / (Math.sqrt(u[0] * u[0] + u[1] * u[1] + u[2] * u[2]) * Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]));
    return Math.acos(Math.max(-1, Math.min(1, d))) * 180 / Math.PI;
  }

  /* VSEPR-alakok: [kötő domének (X), nemkötő párok (E)] → név, ideális szög, hibridizáció */
  var VSEPR = {
    '2,0': ['lineáris', '180°'], '3,0': ['síkháromszög (trigonális planáris)', '120°'], '2,1': ['hajlított (V-alakú)', '< 120° (kb. 117°)'],
    '4,0': ['tetraéderes', '109,5°'], '3,1': ['trigonális piramis', '< 109,5° (pl. NH₃: 107°)'], '2,2': ['hajlított (V-alakú)', '< 109,5° (pl. H₂O: 104,5°)'],
    '5,0': ['trigonális bipiramis', '90° és 120°'], '4,1': ['libikóka (torzult tetraéder)', '< 90° és < 120°'], '3,2': ['T-alakú', '< 90°'], '2,3': ['lineáris', '180°'],
    '6,0': ['oktaéderes', '90°'], '5,1': ['négyzetes piramis', '< 90°'], '4,2': ['síknégyzetes', '90°'],
    '1,0': ['kétatomos (lineáris)', '–'], '1,1': ['kétatomos (lineáris)', '–'], '1,2': ['kétatomos (lineáris)', '–'], '1,3': ['kétatomos (lineáris)', '–']
  };
  var HYB = { 2: 'sp', 3: 'sp²', 4: 'sp³', 5: 'sp³d', 6: 'sp³d²' };

  /* polaritás: kötésdipólusok vektoriális összege (ΔEN · egységvektor) */
  function dipole(g, P) {
    var v = [0, 0, 0], maxd = 0;
    g.b.forEach(function (b) {
      var A = g.a[b.i], B = g.a[b.j]; if (!ELS[A.e] || !ELS[B.e]) return;
      var d = ELS[B.e][3] - ELS[A.e][3], u = [P[b.j][0] - P[b.i][0], P[b.j][1] - P[b.i][1], P[b.j][2] - P[b.i][2]], l = Math.sqrt(u[0] * u[0] + u[1] * u[1] + u[2] * u[2]) || 1;
      maxd = Math.max(maxd, Math.abs(d));
      v[0] += u[0] / l * d; v[1] += u[1] / l * d; v[2] += u[2] / l * d;
    });
    return { m: Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]), maxd: maxd, v: v };
  }

  /* teljes elemzés egy (összefüggő) molekulára */
  function analyze(g) {
    var ad = adj(g), info = g.a.map(function (a, i) { return atomInfo(g, ad, i); });
    var cnt = counts(g), res = { g: g, ad: ad, info: info, cnt: cnt, hill: hill(cnt), M: massOf(cnt), q: charge(g) };
    res.valid = info.every(function (x) { return x.ok; }) && g.a.length > 0;
    res.problems = [];
    info.forEach(function (x, i) { if (!x.ok) res.problems.push({ i: i, miss: x.miss, over: x.over }); });
    res.key = res.valid ? canon(g) : null;
    res.entry = res.key != null ? BYKEY[res.key] || null : null;
    if (!res.valid && res.problems.every(function (p) { return p.miss > 0; })) {
      var h = withH(g), hi = adj(h);
      if (h.a.every(function (a, i) { return atomInfo(h, hi, i).ok; })) { res.hKey = canon(h); res.hEntry = BYKEY[res.hKey] || null; res.hHill = hill(counts(h)); }
    }
    return res;
  }

  /* ================= egyenletek ================= */
  var SUPS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-' };
  var SUBS = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
  function normSp(s) {
    s = String(s).replace(/[₀-₉]/g, function (c) { return SUBS[c]; }).replace(/[⁰¹²³⁴-⁹⁺⁻]+/g, function (m) { return '^' + m.split('').map(function (c) { return SUPS[c]; }).join(''); });
    return s.replace(/−/g, '-').replace(/\s+/g, '');
  }
  /* egy részecske képlete → { elemek: db, '±': töltés } ; hiba esetén null */
  function parseSpecies(str) {
    var s = normSp(str), q = 0, m = /\^(\d*)([+-])$/.exec(s);
    if (m) { q = (m[2] === '+' ? 1 : -1) * (m[1] ? +m[1] : 1); s = s.slice(0, m.index); }
    if (s === 'e') { return q ? { '±': q, e: 0 } : null; }
    var out = {}, ok = true;
    s.split(/[·*.]/).forEach(function (part) {
      var mult = 1, mm = /^(\d+)(.*)$/.exec(part); if (mm) { mult = +mm[1]; part = mm[2]; }
      var pos = 0;
      function group() {
        var c = {};
        while (pos < part.length) {
          var ch = part.charAt(pos);
          if (ch === '(' || ch === '[') { pos++; var inner = group(); if (part.charAt(pos) !== ')' && part.charAt(pos) !== ']') { ok = false; return c; } pos++; var k = num(); Object.keys(inner).forEach(function (e) { c[e] = (c[e] || 0) + inner[e] * k; }); continue; }
          if (ch === ')' || ch === ']') return c;
          var em = /^[A-Z][a-z]?/.exec(part.slice(pos));
          if (!em || !MASS[em[0]]) { ok = false; return c; }
          pos += em[0].length; var nn = num(); c[em[0]] = (c[em[0]] || 0) + nn;
        }
        return c;
      }
      function num() { var x = /^\d+/.exec(part.slice(pos)); if (!x) return 1; pos += x[0].length; return +x[0]; }
      var c = group(); if (pos < part.length) ok = false;
      Object.keys(c).forEach(function (e) { out[e] = (out[e] || 0) + c[e] * mult; });
    });
    if (!ok || !Object.keys(out).length) return null;
    if (q) out['±'] = q;
    return out;
  }
  /* „+” elválasztó, ami nem töltés része */
  function splitSide(side) {
    var parts = [], cur = '', s = side.replace(/−/g, '-');
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if (c === '+' && !/\^\d*$/.test(cur)) { parts.push(cur); cur = ''; continue; }
      cur += c;
    }
    parts.push(cur);
    return parts.map(function (p) { return p.trim(); }).filter(Boolean);
  }
  function parseEquation(str) {
    var s = String(str);
    var sides = s.split(/\s*(?:->|→|=>|⇌|⟶|=)\s*/);
    if (sides.length !== 2) return { err: 'Az egyenletben pontosan egy nyíl (→, ->, =) legyen.' };
    var sp = [[], []], err = null;
    sides.forEach(function (side, k) {
      splitSide(side).forEach(function (t) {
        var co = /^(\d+)\s*(?=[A-Z(\[e])/.exec(t), f = co ? t.slice(co[0].length) : t;
        var c = parseSpecies(f);
        if (!c) err = 'Nem értelmezhető képlet: „' + t + '”';
        sp[k].push({ f: f.trim(), c: c, given: co ? +co[1] : null });
      });
    });
    if (err) return { err: err };
    if (!sp[0].length || !sp[1].length) return { err: 'Mindkét oldalon legyen legalább egy anyag.' };
    return { L: sp[0], R: sp[1] };
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var g2 = gcd(n, d); return [n / g2, d / g2]; }
  function fsub(a, b) { return fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]); }
  function fmul(a, b) { return fr(a[0] * b[0], a[1] * b[1]); }
  function fdiv(a, b) { return fr(a[0] * b[1], a[1] * b[0]); }
  /* együtthatók: a nulltér racionális bázisvektora → legkisebb pozitív egészek */
  function balance(eq) {
    var sp = eq.L.concat(eq.R), nL = eq.L.length, els = {};
    sp.forEach(function (x) { Object.keys(x.c).forEach(function (e) { els[e] = 1; }); });
    var E = Object.keys(els), n = sp.length;
    var A = E.map(function (e) { return sp.map(function (x, j) { var v = x.c[e] || 0; return fr(j < nL ? v : -v, 1); }); });
    var piv = [], r = 0, c, i;
    for (c = 0; c < n && r < A.length; c++) {
      var p = -1; for (i = r; i < A.length; i++) if (A[i][c][0] !== 0) { p = i; break; }
      if (p < 0) continue;
      var t = A[p]; A[p] = A[r]; A[r] = t;
      var pv = A[r][c]; A[r] = A[r].map(function (x) { return fdiv(x, pv); });
      for (i = 0; i < A.length; i++) if (i !== r && A[i][c][0] !== 0) { var f = A[i][c]; A[i] = A[i].map(function (x, k) { return fsub(x, fmul(f, A[r][k])); }); }
      piv.push(c); r++;
    }
    var free = []; for (c = 0; c < n; c++) if (piv.indexOf(c) < 0) free.push(c);
    if (!free.length) return { err: 'Ennek az egyenletnek nincs megoldása: valamelyik atom (vagy a töltés) nem jelenhet meg mindkét oldalon azonos számban.' };
    var x = []; for (c = 0; c < n; c++) x.push(fr(0, 1));
    free.forEach(function (fc) { x[fc] = fr(1, 1); });
    piv.forEach(function (pc, row) { var s2 = fr(0, 1); free.forEach(function (fc) { s2 = fsub(s2, A[row][fc]); }); x[pc] = s2; });
    var l = 1; x.forEach(function (v) { l = l / gcd(l, v[1]) * v[1]; });
    var ints = x.map(function (v) { return v[0] * (l / v[1]); }), g2 = 0;
    ints.forEach(function (v) { g2 = gcd(g2, v); }); ints = ints.map(function (v) { return v / g2; });
    if (ints.every(function (v) { return v <= 0; })) ints = ints.map(function (v) { return -v; });
    if (!ints.every(function (v) { return v > 0; })) return { err: 'Nincs csupa pozitív egész megoldás – lehet, hogy rossz oldalra került egy anyag, vagy hiányzik egy termék.', c: ints };
    return { c: ints, multi: free.length > 1 };
  }
  function sideCount(list, co) {
    var t = {}; list.forEach(function (x, i) { Object.keys(x.c).forEach(function (e) { t[e] = (t[e] || 0) + x.c[e] * co[i]; }); });
    return t;
  }
  var EQS = [
    { f: 'H2 + O2 -> H2O', c: [2, 1, 2], t: 'Durranógáz: a hidrogén égése', lv: 1, tip: 'Az O₂-ben 2 oxigén van, a vízben csak 1 – kezdd a víz elé írt 2-essel!' },
    { f: 'N2 + H2 -> NH3', c: [1, 3, 2], t: 'Ammóniaszintézis (Haber–Bosch)', lv: 1, tip: 'A 2 nitrogénatomhoz 2 NH₃ kell; utána számold meg a hidrogéneket.' },
    { f: 'Na + Cl2 -> NaCl', c: [2, 1, 2], t: 'Nátrium égése klórban', lv: 1, tip: 'A Cl₂ két klóratomjához 2 NaCl kell.' },
    { f: 'Mg + O2 -> MgO', c: [2, 1, 2], t: 'A magnézium égése', lv: 1, tip: 'Az O₂-ből 2 MgO lesz.' },
    { f: 'C + O2 -> CO2', c: [1, 1, 1], t: 'A szén tökéletes égése', lv: 1, tip: 'Ez már rendezett – minden együttható 1.' },
    { f: 'H2O2 -> H2O + O2', c: [2, 2, 1], t: 'A hidrogén-peroxid bomlása', lv: 1, tip: 'Próbáld 2 H₂O₂-vel: 4 H és 4 O áll a bal oldalon.' },
    { f: 'NaOH + HCl -> NaCl + H2O', c: [1, 1, 1, 1], t: 'Közömbösítés: lúg + sav', lv: 1, tip: 'Számold meg: talán már minden együttható 1.' },
    { f: 'CaCO3 -> CaO + CO2', c: [1, 1, 1], t: 'A mészkő hőbontása (mészégetés)', lv: 1, tip: 'Számold meg az atomokat mindkét oldalon.' },
    { f: 'Zn + HCl -> ZnCl2 + H2', c: [1, 2, 1, 1], t: 'Cink oldása sósavban', lv: 1, tip: 'A ZnCl₂-ben 2 klór van, ehhez 2 HCl kell.' },
    { f: 'CH4 + O2 -> CO2 + H2O', c: [1, 2, 1, 2], t: 'A metán (földgáz) égése', lv: 1, tip: 'Sorrend: C, aztán H, végül az O (az O₂ elé kerül az utolsó szám).' },
    { f: 'Fe + O2 -> Fe2O3', c: [4, 3, 2], t: 'A vas rozsdásodása (egyszerűsítve)', lv: 2, tip: 'Az O-atomok: 2 és 3 legkisebb közös többszöröse 6 → 3 O₂ és 2 Fe₂O₃.' },
    { f: 'Al + O2 -> Al2O3', c: [4, 3, 2], t: 'Az alumínium oxidációja', lv: 2, tip: 'Ugyanaz a trükk, mint a vasnál: 3 O₂ és 2 Al₂O₃.' },
    { f: 'Na + H2O -> NaOH + H2', c: [2, 2, 2, 1], t: 'A nátrium reakciója vízzel', lv: 2, tip: 'A H₂ miatt páros számú H kell: próbálj 2 H₂O-t.' },
    { f: 'NaOH + H2SO4 -> Na2SO4 + H2O', c: [2, 1, 1, 2], t: 'Kénsav közömbösítése', lv: 2, tip: 'A Na₂SO₄ két nátriumához 2 NaOH kell.' },
    { f: 'CaCO3 + HCl -> CaCl2 + H2O + CO2', c: [1, 2, 1, 1, 1], t: 'Vízkő oldása sósavval', lv: 2, tip: 'A CaCl₂ két klórjához 2 HCl kell.' },
    { f: 'KClO3 -> KCl + O2', c: [2, 2, 3], t: 'Oxigénfejlesztés kálium-klorátból', lv: 2, tip: 'Az O-atomok: 3 és 2 → 6 kell, azaz 2 KClO₃ és 3 O₂.' },
    { f: 'Al + HCl -> AlCl3 + H2', c: [2, 6, 2, 3], t: 'Alumínium oldása sósavban', lv: 2, tip: 'A H-atomok: a H₂ miatt páros kell → 6 HCl, 3 H₂.' },
    { f: 'C3H8 + O2 -> CO2 + H2O', c: [1, 5, 3, 4], t: 'A propán égése (gázpalack)', lv: 2, tip: 'C: 3 CO₂, H: 4 H₂O, majd O: 6 + 4 = 10 → 5 O₂.' },
    { f: 'C2H5OH + O2 -> CO2 + H2O', c: [1, 3, 2, 3], t: 'Az etanol égése', lv: 2, tip: 'Ne felejtsd el az etanol saját oxigénjét!' },
    { f: 'C6H12O6 + O2 -> CO2 + H2O', c: [1, 6, 6, 6], t: 'Sejtlégzés (a glükóz „elégetése”)', lv: 2, tip: 'C: 6 CO₂, H: 6 H₂O, O: 12 + 6 − 6 = 12 → 6 O₂.' },
    { f: 'CO2 + H2O -> C6H12O6 + O2', c: [6, 6, 1, 6], t: 'Fotoszintézis', lv: 2, tip: 'A sejtlégzés fordítottja.' },
    { f: 'Fe2O3 + CO -> Fe + CO2', c: [1, 3, 2, 3], t: 'Vasgyártás a nagyolvasztóban', lv: 2, tip: 'Minden CO egy O-t vesz fel; a Fe₂O₃-ban 3 O van.' },
    { f: 'C2H2 + O2 -> CO2 + H2O', c: [2, 5, 4, 2], t: 'Az acetilén égése (hegesztőláng)', lv: 2, tip: 'Ha az O₂ elé tört kerülne (5/2), szorozz mindent 2-vel!' },
    { f: 'SO2 + O2 -> SO3', c: [2, 1, 2], t: 'Kénsavgyártás: kén-trioxid előállítása', lv: 2, tip: 'Próbálj 2 SO₂-t és 2 SO₃-t.' },
    { f: 'P4 + O2 -> P4O10', c: [1, 5, 1], t: 'A fehérfoszfor égése', lv: 2, tip: 'A P már rendben; 10 O-hoz 5 O₂ kell.' },
    { f: 'NaHCO3 -> Na2CO3 + H2O + CO2', c: [2, 1, 1, 1], t: 'A szódabikarbóna hőbomlása (sütés)', lv: 2, tip: 'A Na₂CO₃ két nátriumához 2 NaHCO₃ kell.' },
    { f: 'Pb(NO3)2 + KI -> PbI2 + KNO3', c: [1, 2, 1, 2], t: '„Aranyeső”: ólom-jodid csapadék', lv: 2, tip: 'A nitrátcsoportot (NO₃) kezeld egy egységként!' },
    { f: 'C4H10 + O2 -> CO2 + H2O', c: [2, 13, 8, 10], t: 'A bután égése (öngyújtó)', lv: 3, tip: 'Az O₂ elé 13/2 jönne – szorozz mindent 2-vel.' },
    { f: 'C8H18 + O2 -> CO2 + H2O', c: [2, 25, 16, 18], t: 'Az oktán égése (benzin)', lv: 3, tip: 'C: 8, H: 9 vízmolekula, O: 25/2 → szorozz 2-vel.' },
    { f: 'NH3 + O2 -> NO + H2O', c: [4, 5, 4, 6], t: 'Ammónia oxidációja (salétromsavgyártás)', lv: 3, tip: 'Kezdd 2 NH₃-val és 3 H₂O-val, majd duplázz, ha tört jön ki.' },
    { f: 'FeS2 + O2 -> Fe2O3 + SO2', c: [4, 11, 2, 8], t: 'A pirit pörkölése', lv: 3, tip: 'Fe: 2 FeS₂ → 1 Fe₂O₃, S: 4 SO₂; O: 3 + 8 = 11 → 11/2 O₂ → duplázd.' },
    { f: 'Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O', c: [3, 2, 1, 6], t: 'Kalcium-foszfát képződése', lv: 3, tip: 'Ca: 3 Ca(OH)₂, PO₄: 2 H₃PO₄, majd a víz.' },
    { f: 'Al2(SO4)3 + Ca(OH)2 -> Al(OH)3 + CaSO4', c: [1, 3, 2, 3], t: 'Víztisztítás alumínium-szulfáttal', lv: 3, tip: 'A szulfátcsoport (SO₄) egységként kezelhető: 3 CaSO₄.' },
    { f: 'NO2 + H2O -> HNO3 + NO', c: [3, 1, 2, 1], t: 'Nitrogén-dioxid elnyeletése vízben', lv: 3, tip: 'Diszproporció: a N egy része oxidálódik, másik része redukálódik. Próbálj 3 NO₂-t.' },
    { f: 'Cu + HNO3 -> Cu(NO3)2 + NO + H2O', c: [3, 8, 3, 2, 4], t: 'Réz oldása híg salétromsavban', lv: 3, tip: 'Redoxi: Cu 0 → +2 (2 e⁻ le), N +5 → +2 (3 e⁻ fel) → 3 Cu és 2 NO.' },
    { f: 'Cu + H2SO4 -> CuSO4 + SO2 + H2O', c: [1, 2, 1, 1, 2], t: 'Réz oldása tömény kénsavban', lv: 3, tip: 'Az egyik kénsav sót ad, a másik SO₂-vé redukálódik.' },
    { f: 'KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O', c: [2, 16, 2, 2, 5, 8], t: 'Klórfejlesztés kálium-permanganáttal', lv: 3, tip: 'Mn +7 → +2 (5 e⁻), 2 Cl⁻ → Cl₂ (2 e⁻) → 2 KMnO₄ és 5 Cl₂.' },
    { f: 'CuSO4·5H2O -> CuSO4 + H2O', c: [1, 1, 5], t: 'A rézgálic kristályvizének elvesztése', lv: 2, tip: 'A „·5H₂O” öt vízmolekulát jelent.' },
    { f: 'Zn + Cu^2+ -> Zn^2+ + Cu', c: [1, 1, 1, 1], t: 'Ionegyenlet: cink a rézszulfát-oldatban', lv: 3, tip: 'Az ionegyenletben a töltéseknek is egyezniük kell!' },
    { f: 'MnO4^- + Fe^2+ + H^+ -> Mn^2+ + Fe^3+ + H2O', c: [1, 5, 8, 1, 5, 4], t: 'Permanganometria (vas(II) mérése)', lv: 3, tip: 'Mn: +7 → +2 (5 e⁻), Fe: +2 → +3 (1 e⁻) → 5 Fe²⁺; a töltést H⁺-val, az O-t vízzel egyenlítsd ki.' },
    { f: 'Cr2O7^2- + I^- + H^+ -> Cr^3+ + I2 + H2O', c: [1, 6, 14, 2, 3, 7], t: 'Dikromát–jodid redoxireakció', lv: 3, tip: '2 Cr: +6 → +3 (összesen 6 e⁻) → 6 I⁻ → 3 I₂; 7 O → 7 H₂O → 14 H⁺.' }
  ];

  /* ================= kihívások, izomerkészletek ================= */
  var TASKS = [
    ['hidrogen', 'Két H-atom egyetlen kötéssel.'], ['viz', 'Egy O két H-val.'], ['hcl', 'Egy H és egy Cl.'], ['ammonia', 'A N 3 kötést létesít.'],
    ['metan', 'A C mindig 4 kötést létesít.'], ['oxigen', 'Két O között kettős kötés kell.'], ['nitrogen', 'Két N között hármas kötés kell.'], ['szen-dioxid', 'O=C=O – két kettős kötés.'],
    ['etan', 'Két C egyes kötéssel, a többi hely H.'], ['eten', 'C=C kettős kötés + 4 H.'], ['etin', 'C≡C hármas kötés + 2 H.'], ['metanol', 'CH₃–OH'],
    ['etanol', 'CH₃–CH₂–OH'], ['formaldehid', 'H₂C=O'], ['hcn', 'H–C≡N'], ['propan', 'Három C egy láncban.'],
    ['izobutan', 'Egy C-hez három másik C kapcsolódik.'], ['dimetil-eter', 'Az O két C között van: CH₃–O–CH₃.'], ['ecetsav', 'CH₃–C(=O)–OH'], ['aceton', 'A középső C-n kettős kötésű O, két oldalán CH₃.'],
    ['propan-2-ol', 'Az OH a középső szénatomon.'], ['kensav', 'A S-hez 2 =O és 2 –OH kapcsolódik (a S 6 kötést létesít).'], ['benzol', 'Hattagú gyűrű váltakozó kettős kötésekkel.'], ['etil-acetat', 'CH₃–C(=O)–O–CH₂–CH₃'],
    ['glicerin', 'Három C, mindegyiken egy OH.'], ['karbamid', 'Egy C=O két NH₂-csoporttal.'], ['glicin', 'H₂N–CH₂–COOH'], ['salétromsav', 'Használd a ± eszközt: N⁺ (4 kötés) és O⁻ (1 kötés).'],
    ['szen-monoxid', 'C≡O hármas kötés; a C-re −, az O-ra + formális töltés kell.'], ['ozon', 'O⁻–O⁺=O: a középső O-n + töltés.'], ['glukoz', '5 C és 1 O alkot hattagú gyűrűt; 4 gyűrűs C-n OH, az 5.-hez CH₂OH kapcsolódik.'], ['aszpirin', 'Benzolgyűrű, rajta egymás mellett –COOH és –O–C(=O)–CH₃.']
  ];
  var ISO = [
    { f: 'C4H10', t: 'Bután-izomerek', d: 'Csak C és H, egyes kötések.' },
    { f: 'C5H12', t: 'Pentán-izomerek', d: 'Elágazások: egy vagy két metilcsoport.' },
    { f: 'C6H14', t: 'Hexán-izomerek', d: 'Figyelj: a lánc „hajlítása” nem új izomer!' },
    { f: 'C2H6O', t: 'C₂H₆O: alkohol vagy éter?', d: 'Az O kerülhet a lánc végére vagy közepére.' },
    { f: 'C3H8O', t: 'C₃H₈O', d: 'Két alkohol és egy éter.' },
    { f: 'C4H10O', t: 'C₄H₁₀O', d: 'Négy alkohol és három éter.' },
    { f: 'C4H8', t: 'C₄H₈: alkének és gyűrűk', d: 'Egy kettős kötés VAGY egy gyűrű kell. (A cisz–transz izomereket itt nem számoljuk külön.)' },
    { f: 'C3H7Cl', t: 'C₃H₇Cl', d: 'Hová kerülhet a klóratom?' },
    { f: 'C2H4Cl2', t: 'C₂H₄Cl₂', d: 'Egy vagy két szénatomon a két klór?' }
  ];
  ISO.forEach(function (s) { s.list = LIB.filter(function (m) { return m.hill === s.f && !m.q; }); });

  S.molekula = { ELS: ELS, LIB: LIB, BYID: BYID, BYKEY: BYKEY, EQS: EQS, TASKS: TASKS, ISO: ISO, smiles: smiles, canon: canon, counts: counts, hill: hill, massOf: massOf,
    analyze: analyze, embed3D: embed3D, layout2D: layout2D, parseEquation: parseEquation, parseSpecies: parseSpecies, balance: balance, valences: valences, atomInfo: atomInfo, adj: adj,
    withH: withH, components: components, angleAt: angleAt, dipole: dipole };

  /* ================= felület ================= */
  if (!S.addRoute) return;
  var PAL = ['C', 'H', 'O', 'N', 'S', 'P', 'F', 'Cl', 'Br', 'I', 'B', 'Si', 'Na', 'K', 'Li', 'Mg', 'Ca', 'Al'];
  var BL = 56;
  function uni() { return S.level === 'egyetem'; }
  function num(x, d) { return S.fmt ? S.fmt(x, d) : String(Math.round(x * 100) / 100).replace('.', ','); }
  function crumbs(list) {
    return '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span>' + list.map(function (x, i) {
      return i < list.length - 1 ? '<a href="' + x[1] + '">' + esc(x[0]) + '</a><span>›</span>' : '<span>' + esc(x[0]) + '</span>';
    }).join('') + '</nav>';
  }
  var MODES = [
    ['epito', '🧪', 'Építő', 'Rakj le atomokat, húzz kötéseket – a program felismeri a molekulát, kiszámolja a képletét, moláris tömegét és megmutatja 3D-ben.'],
    ['kihivas', '🎯', 'Építsd meg!', TASKS.length + ' fokozatosan nehezedő feladat a víztől az aszpirinig.'],
    ['izomer', '🔀', 'Izomerkereső', 'Ugyanaz az összegképlet, más szerkezet: találd meg az összes izomert!'],
    ['egyenlet', '⚖️', 'Egyenletrendező', EQS.length + ' egyenlet együtthatókkal, atommérleggel – és automatikus rendező a saját egyenleteidhez.'],
    ['konyvtar', '📚', 'Molekulatár', LIB.length + ' molekula névvel, tulajdonságokkal, felhasználással, veszélyekkel és 3D-modellel.']
  ];
  function modeTabs(cur) {
    return '<div class="mk-tabs" role="tablist">' + MODES.map(function (m) {
      return '<a class="chip' + (m[0] === cur ? ' on' : '') + '" href="#/molekula/' + m[0] + '">' + m[1] + ' ' + esc(m[2]) + '</a>'; }).join('') + '</div>';
  }
  var LESSONS = [['kem-alap', 'molekulak-kepletek'], ['kem-alap', 'kemiai-valtozasok'], ['kemia', 'kemiai-kotesek'], ['kemia', 'anyagmennyiseg'], ['kemia', 'reakciok'], ['kemia', 'szerves-elektrokemia']];
  var UNI = [['kemia-bsc', 'vsepr', 'VSEPR-elmélet'], ['kemia-bsc', 'hibridizacio', 'Hibridizáció'], ['kemia-bsc', 'elektronegativitas', 'Elektronegativitás'], ['kemia-bsc', 'redoxi', 'Redoxireakciók, oxidációs szám'], ['szerves-kemia', 'izomeria', 'Izoméria'], ['szerves-kemia', 'iupac', 'IUPAC-nevezéktan']];
  function lessonLinks(which) {
    var out = [];
    LESSONS.forEach(function (x, i) {
      if (which && which.indexOf(i) < 0) return;
      var s = (S.subjects || []).filter(function (z) { return z.id === x[0]; })[0], l = s && s.lessons.filter(function (z) { return z.id === x[1]; })[0];
      if (l) out.push('<a class="chip" href="#/lecke/' + x[0] + '/' + x[1] + '">📖 ' + esc(l.title) + (x[0] === 'kem-alap' ? ' (7–8.)' : '') + '</a>');
    });
    if (uni()) UNI.forEach(function (x) { out.push('<a class="chip" href="#/egyetem/' + x[0] + '/fogalom/' + x[1] + '">🎓 ' + esc(x[2]) + '</a>'); });
    return out.length ? '<div class="mk-links"><b>Kapcsolódó leckék:</b> ' + out.join(' ') + '</div>' : '';
  }
  function lum(hex) { var n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; }
  function sym(a) { return a.e; }

  /* ---------- 2D rajz (építő és statikus szerkezeti képlet) ---------- */
  function freeDirs(C, ad, i, k) {
    var used = ad[i].map(function (x) { return Math.atan2(C[x.n].y - C[i].y, C[x.n].x - C[i].x); }), out = [];
    for (var t = 0; t < k; t++) {
      var best = -Math.PI / 2, bs = -1;
      if (used.length) for (var s = 0; s < 36; s++) {
        var a = s * Math.PI / 18, md = 9;
        used.forEach(function (u) { md = Math.min(md, Math.abs(Math.atan2(Math.sin(a - u), Math.cos(a - u)))); });
        if (md > bs + 1e-6) { bs = md; best = a; }
      } else best = [-Math.PI / 2, Math.PI / 2, 0, Math.PI][t] || 0;
      out.push(best); used.push(best);
    }
    return out;
  }
  function drawMol(g, C, o) {
    o = o || {};
    var ad = adj(g), out = '', R = o.r || 15;
    g.b.forEach(function (b) {
      var p = C[b.i], q = C[b.j], dx = q.x - p.x, dy = q.y - p.y, L = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / L, ny = dx / L;
      var offs = b.o === 1 ? [0] : b.o === 2 ? [-3.4, 3.4] : [-5.5, 0, 5.5];
      var ion = METAL[g.a[b.i].e] || METAL[g.a[b.j].e];
      offs.forEach(function (f) {
        out += '<line x1="' + (p.x + nx * f).toFixed(1) + '" y1="' + (p.y + ny * f).toFixed(1) + '" x2="' + (q.x + nx * f).toFixed(1) + '" y2="' + (q.y + ny * f).toFixed(1) + '" class="mk-bond' + (ion ? ' ion' : '') + '"/>';
      });
    });
    g.a.forEach(function (a, i) {
      var p = C[i], el = ELS[a.e], col = el ? el[5] : '#999999', inf = atomInfo(g, ad, i), r = a.e === 'H' ? R * 0.8 : R;
      if (o.lp && inf.lp && a.e !== 'H' && !METAL[a.e]) {
        freeDirs(C, ad, i, Math.min(inf.lp, 4)).forEach(function (t) {
          var cx = p.x + Math.cos(t) * (r + 6), cy = p.y + Math.sin(t) * (r + 6), px = -Math.sin(t) * 3.2, py = Math.cos(t) * 3.2;
          out += '<circle cx="' + (cx + px).toFixed(1) + '" cy="' + (cy + py).toFixed(1) + '" r="1.9" class="mk-lpdot"/><circle cx="' + (cx - px).toFixed(1) + '" cy="' + (cy - py).toFixed(1) + '" r="1.9" class="mk-lpdot"/>';
        });
      }
      if (o.check && !inf.ok) out += '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + (r + 5) + '" class="mk-ring ' + (inf.over || !inf.miss ? 'over' : 'miss') + '"/>';
      out += '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + r + '" fill="' + col + '" class="mk-atom' + (o.sel === i ? ' sel' : '') + '"/>' +
        '<text x="' + p.x.toFixed(1) + '" y="' + (p.y + 0.5).toFixed(1) + '" class="mk-lbl" fill="' + (lum(col) < 0.55 ? '#fff' : '#111') + '">' + esc(sym(a)) + '</text>';
      if (a.q) out += '<text x="' + (p.x + r * 0.95).toFixed(1) + '" y="' + (p.y - r * 0.7).toFixed(1) + '" class="mk-q">' + (Math.abs(a.q) > 1 ? Math.abs(a.q) : '') + (a.q > 0 ? '+' : '−') + '</text>';
      if (o.check && !inf.ok) out += '<g class="mk-badge ' + (inf.over || !inf.miss ? 'over' : 'miss') + '"><circle cx="' + (p.x - r * 0.95).toFixed(1) + '" cy="' + (p.y - r * 0.9).toFixed(1) + '" r="8"/><text x="' + (p.x - r * 0.95).toFixed(1) + '" y="' + (p.y - r * 0.9 + 0.5).toFixed(1) + '">' + (inf.over || !inf.miss ? '!' : '+' + inf.miss) + '</text></g>';
    });
    return out;
  }
  /* statikus szerkezeti képlet egy könyvtári molekulához */
  var layCache = {};
  function staticSvg(m, maxW, maxH, cls) {
    var P = layCache[m.id] || (layCache[m.id] = layout2D(m.g)), x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    P.forEach(function (p) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); });
    var C = P.map(function (p) { return { x: (p.x - x0) * BL + 24, y: (p.y - y0) * BL + 24 }; }), W = (x1 - x0) * BL + 48, H = (y1 - y0) * BL + 48;
    return '<svg class="' + (cls || 'mk-static') + '" viewBox="0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0) + '" style="max-width:' + Math.min(maxW, W) + 'px;max-height:' + maxH + 'px" role="img" aria-label="' + esc(title(m)) + ' szerkezeti képlete">' + drawMol(m.g, C, { lp: uni() }) + '</svg>';
  }
  function toCanvas(m, W, H) {
    var P = layout2D(m.g), x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    P.forEach(function (p) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); });
    var k = Math.min(BL, (W - 50) / Math.max(0.01, x1 - x0), (H - 50) / Math.max(0.01, y1 - y0));
    var g = clone(m.g);
    g.a.forEach(function (a, i) { a.x = W / 2 + (P[i].x - (x0 + x1) / 2) * k; a.y = H / 2 + (P[i].y - (y0 + y1) / 2) * k; });
    return g;
  }

  /* ---------- építő vászon ---------- */
  function Builder(host, opt) {
    opt = opt || {};
    var g = opt.key ? S.store.get(opt.key, null) : null;
    if (!g || !g.a) g = { a: [], b: [] };
    var st = { el: S.store.get('molekula.elem', 'C'), order: 1, tool: 'add', lp: uni() }, hist = [], sel = -1, drag = null, W = 600, H = 400;
    host.innerHTML = '<div class="mk-tb"><div class="mk-pal" role="toolbar" aria-label="Elemek">' + PAL.map(function (e) {
        return '<button type="button" class="mk-el" data-el="' + e + '" title="' + esc(ELS[e][0]) + '" style="--mk-c:' + ELS[e][5] + '">' + e + '</button>'; }).join('') + '</div>' +
      '<div class="mk-tools"><span class="seg mk-ord" aria-label="Kötésrend">' + [1, 2, 3].map(function (o) {
        return '<button type="button" data-o="' + o + '" title="' + ['Egyes', 'Kettős', 'Hármas'][o - 1] + ' kötés">' + ['—', '=', '≡'][o - 1] + '</button>'; }).join('') + '</span>' +
      '<span class="seg mk-tool">' + [['add', '✏️', 'Rajzolás: koppints az üres helyre vagy egy atomra, húzz atomtól atomig'], ['move', '✋', 'Mozgatás'], ['swap', '🔁', 'Elemcsere: koppints egy atomra'], ['charge', '±', 'Formális töltés: koppints egy atomra (0 → + → −)'], ['del', '🧽', 'Radír: atom vagy kötés törlése']].map(function (t) {
        return '<button type="button" data-t="' + t[0] + '" title="' + t[2] + '" aria-label="' + t[2] + '">' + t[1] + '</button>'; }).join('') + '</span>' +
      '<button type="button" class="btn sm" data-act="undo" title="Visszavonás">↶</button><button type="button" class="btn sm" data-act="clear" title="Vászon törlése">🗑</button></div></div>' +
      '<div class="mk-stage-wrap"><svg class="mk-stage" role="application" aria-label="Molekularajzoló vászon"></svg><div class="mk-empty muted"></div></div>' +
      '<div class="mk-acts"><button type="button" class="btn sm primary" data-act="h">➕ H-k kiegészítése</button><button type="button" class="btn sm" data-act="tidy">✨ Elrendezés</button>' +
      '<button type="button" class="btn sm" data-act="lp">' + '⠒ Nemkötő párok</button></div>';
    var svg = host.querySelector('.mk-stage'), empty = host.querySelector('.mk-empty');
    function size() {
      var r = svg.getBoundingClientRect(); W = Math.max(260, r.width || 600); H = Math.max(240, r.height || 400);
      svg.setAttribute('viewBox', '0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0));
    }
    function save() { if (opt.key) S.store.set(opt.key, g); }
    function snap() { hist.push(JSON.stringify(g)); if (hist.length > 60) hist.shift(); }
    function paintBar() {
      host.querySelectorAll('.mk-el').forEach(function (b) { b.classList.toggle('on', b.dataset.el === st.el); });
      host.querySelectorAll('.mk-ord button').forEach(function (b) { b.classList.toggle('on', +b.dataset.o === st.order); });
      host.querySelectorAll('.mk-tool button').forEach(function (b) { b.classList.toggle('on', b.dataset.t === st.tool); });
      host.querySelector('[data-act="lp"]').classList.toggle('on', st.lp);
    }
    function draw(ghost) {
      var s = drawMol(g, g.a, { check: true, lp: st.lp, sel: sel });
      if (ghost) s = '<line x1="' + ghost[0].toFixed(1) + '" y1="' + ghost[1].toFixed(1) + '" x2="' + ghost[2].toFixed(1) + '" y2="' + ghost[3].toFixed(1) + '" class="mk-ghost"/>' + s;
      svg.innerHTML = s;
      empty.innerHTML = g.a.length ? '' : '👆 Koppints a vászonra egy <b>' + esc(ELS[st.el][0]) + '</b>atom lerakásához. Atomra koppintva új, hozzá kötött atomot kapsz; atomtól atomig húzva kötést rajzolsz, kötésre koppintva változik a kötésrend.';
    }
    function changed() { save(); draw(); if (opt.onChange) opt.onChange(api); }
    function pt(e) { var r = svg.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / (r.width || W), y: (e.clientY - r.top) * H / (r.height || H) }; }
    function hitAtom(p, skip) {
      var best = -1, bd = 24;
      g.a.forEach(function (a, i) { if (i === skip) return; var d = Math.sqrt((a.x - p.x) * (a.x - p.x) + (a.y - p.y) * (a.y - p.y)); if (d < bd) { bd = d; best = i; } });
      return best;
    }
    function hitBond(p) {
      var best = -1, bd = 11;
      g.b.forEach(function (b, k) {
        var A = g.a[b.i], B = g.a[b.j], dx = B.x - A.x, dy = B.y - A.y, L2 = dx * dx + dy * dy || 1, t = Math.max(0, Math.min(1, ((p.x - A.x) * dx + (p.y - A.y) * dy) / L2));
        var d = Math.sqrt(Math.pow(A.x + dx * t - p.x, 2) + Math.pow(A.y + dy * t - p.y, 2)); if (d < bd) { bd = d; best = k; }
      });
      return best;
    }
    function bondBetween(i, j) { for (var k = 0; k < g.b.length; k++) { var b = g.b[k]; if ((b.i === i && b.j === j) || (b.i === j && b.j === i)) return k; } return -1; }
    function addBonded(i, el, at) {
      var a = g.a[i], p = at;
      if (!p) { var t = freeAngle(g, adj(g), i), L = el === 'H' || a.e === 'H' ? 44 : BL; p = { x: a.x + Math.cos(t) * L, y: a.y + Math.sin(t) * L }; }
      p.x = Math.max(16, Math.min(W - 16, p.x)); p.y = Math.max(16, Math.min(H - 16, p.y));
      g.a.push({ e: el, q: 0, x: p.x, y: p.y }); g.b.push({ i: i, j: g.a.length - 1, o: st.order });
    }
    function delAtom(i) {
      g.b = g.b.filter(function (b) { return b.i !== i && b.j !== i; }).map(function (b) { return { i: b.i > i ? b.i - 1 : b.i, j: b.j > i ? b.j - 1 : b.j, o: b.o }; });
      g.a.splice(i, 1);
    }
    svg.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
      e.preventDefault(); size();
      var p = pt(e), ai = hitAtom(p), bi = ai < 0 ? hitBond(p) : -1;
      drag = { p0: p, a: ai, b: bi, moved: false, done: false };
      try { svg.setPointerCapture(e.pointerId); } catch (x) { /* régi böngésző */ }
      if (st.tool === 'move' && ai >= 0) snap();
      if (st.tool === 'add' && ai >= 0) drag.timer = setTimeout(function () {
        if (drag && !drag.moved && g.a[ai].e !== st.el) { snap(); g.a[ai].e = st.el; g.a[ai].q = 0; drag.done = true; if (navigator.vibrate) navigator.vibrate(20); changed(); }
      }, 550);
    });
    svg.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var p = pt(e), dx = p.x - drag.p0.x, dy = p.y - drag.p0.y;
      if (!drag.moved && dx * dx + dy * dy > 64) { drag.moved = true; clearTimeout(drag.timer); }
      if (!drag.moved || drag.a < 0) return;
      if (st.tool === 'move') { g.a[drag.a].x = Math.max(12, Math.min(W - 12, p.x)); g.a[drag.a].y = Math.max(12, Math.min(H - 12, p.y)); draw(); }
      else if (st.tool === 'add') { var t = hitAtom(p, drag.a), q = t >= 0 ? g.a[t] : p; draw([g.a[drag.a].x, g.a[drag.a].y, q.x, q.y]); }
    });
    function up(e) {
      if (!drag) return;
      clearTimeout(drag.timer);
      var d = drag, p = pt(e); drag = null;
      if (d.done) return;
      if (st.tool === 'move') { if (d.moved) changed(); else draw(); return; }
      if (st.tool === 'add') {
        if (d.a >= 0) {
          snap();
          if (!d.moved) addBonded(d.a, st.el);
          else {
            var t = hitAtom(p, d.a);
            if (t >= 0) { var k = bondBetween(d.a, t); if (k >= 0) g.b[k].o = g.b[k].o === st.order ? g.b[k].o % 3 + 1 : st.order; else g.b.push({ i: d.a, j: t, o: st.order }); }
            else addBonded(d.a, st.el, p);
          }
          return changed();
        }
        if (d.b >= 0 && !d.moved) { snap(); g.b[d.b].o = g.b[d.b].o % 3 + 1; return changed(); }
        if (!d.moved) { snap(); g.a.push({ e: st.el, q: 0, x: p.x, y: p.y }); return changed(); }
        return draw();
      }
      if (d.moved) return draw();
      if (st.tool === 'swap' && d.a >= 0) { snap(); g.a[d.a].e = st.el; g.a[d.a].q = 0; return changed(); }
      if (st.tool === 'charge' && d.a >= 0) { snap(); var q = g.a[d.a].q || 0; g.a[d.a].q = q === 0 ? 1 : q > 0 ? -1 : 0; return changed(); }
      if (st.tool === 'del') {
        if (d.a >= 0) { snap(); delAtom(d.a); return changed(); }
        if (d.b >= 0) { snap(); g.b.splice(d.b, 1); return changed(); }
      }
    }
    svg.addEventListener('pointerup', up);
    svg.addEventListener('pointercancel', function () { if (drag) clearTimeout(drag.timer); drag = null; draw(); });
    host.querySelector('.mk-pal').addEventListener('click', function (e) {
      var b = e.target.closest('[data-el]'); if (!b) return;
      st.el = b.dataset.el; S.store.set('molekula.elem', st.el);
      if (st.tool !== 'add' && st.tool !== 'swap') st.tool = 'add';
      paintBar(); draw();
    });
    host.querySelector('.mk-ord').addEventListener('click', function (e) { var b = e.target.closest('[data-o]'); if (b) { st.order = +b.dataset.o; if (st.tool !== 'add') st.tool = 'add'; paintBar(); } });
    host.querySelector('.mk-tool').addEventListener('click', function (e) { var b = e.target.closest('[data-t]'); if (b) { st.tool = b.dataset.t; paintBar(); } });
    host.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      var a = b.dataset.act;
      if (a === 'undo') { if (hist.length) { g = JSON.parse(hist.pop()); changed(); } }
      else if (a === 'clear') { if (g.a.length) { snap(); g = { a: [], b: [] }; changed(); } }
      else if (a === 'h') { size(); snap(); if (!addH(g)) hist.pop(); changed(); }
      else if (a === 'tidy') { if (g.a.length) { size(); snap(); tidy(); changed(); } }
      else if (a === 'lp') { st.lp = !st.lp; paintBar(); draw(); }
    });
    function tidy() {
      var P = layout2D(g), x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      P.forEach(function (p) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); });
      var k = Math.min(BL, (W - 50) / Math.max(0.01, x1 - x0), (H - 50) / Math.max(0.01, y1 - y0));
      g.a.forEach(function (a, i) { a.x = W / 2 + (P[i].x - (x0 + x1) / 2) * k; a.y = H / 2 + (P[i].y - (y0 + y1) / 2) * k; });
    }
    var api = {
      graph: function () { return g; },
      load: function (m) { size(); snap(); g = toCanvas(m, W, H); changed(); },
      clear: function () { snap(); g = { a: [], b: [] }; changed(); },
      redraw: function () { size(); draw(); }
    };
    size(); paintBar(); draw();
    /* ha a mentett rajz kilógna a (pl. telefonon keskenyebb) vászonról, igazítsuk be */
    if (g.a.some(function (a) { return a.x > W - 8 || a.y > H - 8 || a.x < 8 || a.y < 8; })) { tidy(); save(); draw(); }
    var rz = function () { if (!document.body.contains(svg)) return window.removeEventListener('resize', rz); size(); draw(); };
    window.addEventListener('resize', rz);
    return api;
  }

  /* ---------- 3D-nézet ---------- */
  function Viewer3D(host) {
    host.innerHTML = '<div class="mk-3d"><svg class="mk-3dsvg" viewBox="-160 -125 320 250" role="img" aria-label="Forgatható 3D-modell"></svg>' +
      '<div class="mk-3dbar"><button type="button" class="btn sm on" data-v="auto">⟳ Forgás</button><button type="button" class="btn sm on" data-v="lp">☁ Nemkötő párok</button><button type="button" class="btn sm" data-v="lab">🏷 Jelölés</button></div>' +
      '<p class="muted mk-3dhelp">Húzd az ujjad vagy az egeret a forgatáshoz.</p></div>';
    var svg = host.querySelector('svg'), rot = { a: 0.6, b: -0.35 }, E = null, gr = null, auto = true, showLp = true, lab = false, sc = 50, raf = 0, dr = null, last = 0;
    function grad() {
      return '<defs>' + Object.keys(ELS).map(function (e) {
        return '<radialGradient id="mk3-' + e + '" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="#fff" stop-opacity=".9"/><stop offset="35%" stop-color="' + ELS[e][5] + '"/><stop offset="100%" stop-color="' + S.draw.shade(ELS[e][5], 0.45) + '"/></radialGradient>';
      }).join('') + '</defs>';
    }
    var defs = S.draw && S.draw.shade ? grad() : '';
    function pr(p) {
      var ca = Math.cos(rot.a), sa = Math.sin(rot.a), cb = Math.cos(rot.b), sb = Math.sin(rot.b);
      var x = p[0] * ca + p[2] * sa, z = -p[0] * sa + p[2] * ca, y = p[1] * cb - z * sb, z2 = p[1] * sb + z * cb;
      var f = 1 + z2 * 0.04;
      return [x * sc * f, y * sc * f, z2];
    }
    function draw() {
      if (!E) { svg.innerHTML = ''; return; }
      var it = [], ad = adj(gr);
      var Q = E.P.map(pr);
      gr.b.forEach(function (b) {
        var p = Q[b.i], q = Q[b.j], dx = q[0] - p[0], dy = q[1] - p[1], L = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / L, ny = dx / L;
        var offs = b.o === 1 ? [0] : b.o === 2 ? [-4, 4] : [-6, 0, 6], s = '';
        offs.forEach(function (f) { s += '<line x1="' + (p[0] + nx * f).toFixed(1) + '" y1="' + (p[1] + ny * f).toFixed(1) + '" x2="' + (q[0] + nx * f).toFixed(1) + '" y2="' + (q[1] + ny * f).toFixed(1) + '" class="mk3-bond' + (offs.length > 1 ? ' thin' : '') + '"/>'; });
        it.push([(p[2] + q[2]) / 2 - 0.3, s]);
      });
      if (showLp) E.LP.forEach(function (l) {
        if (ad[l.a].length < 2 && gr.a.length > 2) return;
        var c = Q[l.a], p = pr(l.p), x = c[0] + (p[0] - c[0]) * 1.5, y = c[1] + (p[1] - c[1]) * 1.5;
        it.push([p[2] - 0.05, '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + (sc * 0.24).toFixed(1) + '" ry="' + (sc * 0.24).toFixed(1) + '" class="mk3-lp"/><circle cx="' + (x - 3).toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.8" class="mk3-lpd"/><circle cx="' + (x + 3).toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.8" class="mk3-lpd"/>']);
      });
      gr.a.forEach(function (a, i) {
        var p = Q[i], r = (0.22 + 0.22 * radius(a.e)) * sc * (1 + p[2] * 0.04);
        var s = '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + r.toFixed(1) + '" fill="' + (defs ? 'url(#mk3-' + a.e + ')' : ELS[a.e][5]) + '" class="mk3-atom"/>';
        if (lab || a.e !== 'C' && a.e !== 'H') s += '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 0.5).toFixed(1) + '" class="mk3-lbl" fill="' + (lum(ELS[a.e][5]) < 0.55 ? '#fff' : '#111') + '">' + esc(a.e) + (lab ? '<tspan class="mk3-idx">' + (i + 1) + '</tspan>' : '') + '</text>';
        it.push([p[2], s]);
      });
      it.sort(function (x, y) { return x[0] - y[0]; });
      svg.innerHTML = defs + it.map(function (x) { return x[1]; }).join('');
      void ad;
    }
    function loop(t) {
      if (!document.body.contains(svg)) return;
      if (auto && !dr && t - last > 30) { rot.a += 0.012; draw(); last = t; }
      raf = requestAnimationFrame(loop);
    }
    svg.addEventListener('pointerdown', function (e) { dr = { x: e.clientX, y: e.clientY }; try { svg.setPointerCapture(e.pointerId); } catch (x) { /* nincs */ } e.preventDefault(); });
    svg.addEventListener('pointermove', function (e) {
      if (!dr) return;
      rot.a += (e.clientX - dr.x) * 0.012; rot.b = Math.max(-1.5, Math.min(1.5, rot.b + (e.clientY - dr.y) * 0.012));
      dr = { x: e.clientX, y: e.clientY }; draw();
    });
    function stop() { dr = null; }
    svg.addEventListener('pointerup', stop); svg.addEventListener('pointercancel', stop);
    host.querySelector('.mk-3dbar').addEventListener('click', function (e) {
      var b = e.target.closest('[data-v]'); if (!b) return;
      if (b.dataset.v === 'auto') auto = !auto; else if (b.dataset.v === 'lp') showLp = !showLp; else lab = !lab;
      b.classList.toggle('on', b.dataset.v === 'auto' ? auto : b.dataset.v === 'lp' ? showLp : lab); draw();
    });
    cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
    return {
      set: function (g, xy) {
        gr = g; E = g && g.a.length ? embed3D(g, xy) : null;
        if (E) { var m = 0.8; E.P.forEach(function (p) { m = Math.max(m, Math.sqrt(p[0] * p[0] + p[1] * p[1] + p[2] * p[2])); }); sc = 100 / (m + 0.7); }
        draw(); return E;
      }
    };
  }

  /* ---------- alak, hibridizáció, polaritás szövegesen ---------- */
  function atomLabel(g, i) {
    var e = g.a[i].e, same = 0, k = 0;
    g.a.forEach(function (a, j) { if (a.e === e) { same++; if (j <= i) k++; } });
    return e + (same > 1 ? '<sub>' + k + '</sub>' : '');
  }
  function shapeRows(r, E) {
    var g = r.g, rows = [];
    g.a.forEach(function (a, i) {
      var X = r.ad[i].length, inf = r.info[i];
      if (X < 2 || a.e === 'H') return;
      var Ee = METAL[a.e] ? 0 : Math.min(inf.lp, 6 - X), v = VSEPR[X + ',' + Ee];
      if (!v) return;
      var ang = '';
      if (E) {
        var list = [];
        for (var j = 0; j < X; j++) for (var k = j + 1; k < X; k++) list.push(Math.round(angleAt(E.P, i, r.ad[i][j].n, r.ad[i][k].n)));
        list.sort(function (x, y) { return x - y; });
        var u = list.filter(function (x, z) { return z === 0 || Math.abs(x - list[z - 1]) > 1; });
        ang = ' · <span class="muted">a modellben: ' + u.map(function (x) { return x + '°'; }).join(', ') + '</span>';
      }
      rows.push('<li><b>' + atomLabel(g, i) + '</b>: ' + esc(v[0]) + ' – ' + X + ' kötő' + (Ee ? ' + ' + Ee + ' nemkötő' : '') + ' elektronpár(-domén)' +
        (uni() ? ' · <span class="mk-tag">AX<sub>' + X + '</sub>' + (Ee ? 'E<sub>' + Ee + '</sub>' : '') + '</span> · hibridizáció: <b>' + (HYB[X + Ee] || '–') + '</b>' : '') +
        ' · ideális szög: ' + esc(v[1]) + ang + '</li>');
    });
    return rows;
  }
  function polarity(r, E, m) {
    if (!E || r.g.a.length < 2) return '';
    var d = dipole(r.g, E.P), ionic = r.g.b.some(function (b) { var x = r.g.a[b.i].e, y = r.g.a[b.j].e; return ELS[x] && ELS[y] && Math.abs(ELS[x][3] - ELS[y][3]) >= 1.7 && (METAL[x] || METAL[y]); });
    var pol, why;
    if (ionic) { pol = 'ionos vegyület'; why = 'Fém és nemfém között nagy az elektronegativitás-különbség (ΔEN ≥ 1,7): elektronátadás történik, ionok jönnek létre.'; }
    else if (d.maxd <= 0.4) { pol = 'apoláris'; why = 'A kötések közel apolárisak (ΔEN ≤ 0,4), ezért a molekula is apoláris.'; }
    else if (d.m < 0.15) { pol = 'apoláris'; why = 'A kötések polárisak, de a szimmetrikus alak miatt a kötésdipólusok kioltják egymást.'; }
    else { pol = 'poláris'; why = 'A kötésdipólusok nem oltják ki egymást: a molekulának van egy pozitívabb és egy negatívabb vége.'; }
    var s = '<p><b>Polaritás:</b> <span class="mk-pill ' + (pol === 'apoláris' ? 'apol' : 'pol') + '">' + pol + '</span> <span class="muted">' + why + '</span></p>';
    if (uni()) {
      s += '<p class="muted">Kötésdipólusok vektorösszege (ΔEN-egységben): ' + num(d.m, 2) + (m && m.mu != null ? ' · kísérleti dipólusmomentum: <b>' + num(m.mu, 2) + ' D</b>' : ' · durva becslés: ≈ ' + num(d.m * 1.15, 1) + ' D (kísérleti adat nélkül, csak tájékoztató)') + '</p>';
      var rows = {}; r.g.b.forEach(function (b) {
        var x = r.g.a[b.i].e, y = r.g.a[b.j].e; if (x === y) return; var k = [x, y].sort().join('–'), de = Math.abs(ELS[x][3] - ELS[y][3]);
        rows[k] = num(de, 2) + ' (' + (de >= 1.7 ? 'ionos jellegű' : de > 0.4 ? 'poláris kovalens' : 'apoláris kovalens') + ')';
      });
      var ks = Object.keys(rows); if (ks.length) s += '<p class="muted">ΔEN (Pauling): ' + ks.map(function (k) { return k + ': ' + rows[k]; }).join(' · ') + '</p>';
    }
    return s;
  }
  function factCard(m, full) {
    var props = [];
    if (m.fp) props.push('forráspont: ' + esc(m.fp));
    if (m.op) props.push('olvadáspont: ' + esc(m.op));
    return '<div class="mk-fact"><h3>' + esc(nameLine(m)) + '</h3>' +
      '<p class="mk-formula">' + fF(m.f) + (m.f !== m.hill ? ' <span class="muted">(Hill-rend: ' + fF(m.hill) + ')</span>' : '') + ' · M = ' + num(m.M, 2) + ' g/mol' + (props.length ? ' · ' + props.join(' · ') : '') + '</p>' +
      '<p><span class="mk-cat">' + esc(CATS[m.c]) + '</span>' + (uni() ? ' <span class="muted">IUPAC: ' + esc(m.n) + '</span>' : '') + '</p>' +
      '<p>🔬 ' + esc(m.p) + '</p><p>🏭 <b>Felhasználás:</b> ' + esc(m.u) + '</p><p class="mk-haz">⚠️ <b>Veszély:</b> ' + esc(m.h) + '</p>' +
      (full ? '' : '<p><a href="#/molekula/konyvtar/' + m.id + '">Részletek és 3D-modell a molekulatárban →</a></p>') + '</div>';
  }
  /* elemzőpanel az építőhöz */
  function analysisHtml(g, no3d) {
    if (!g.a.length) return '<p class="muted">A vászon üres. Kezdd egy szénatommal, vagy tölts be egy példát a <a href="#/molekula/konyvtar">molekulatárból</a>!</p>';
    var comps = components(g), out = '';
    if (comps.length > 1) out += '<p class="w-msg warn">' + comps.length + ' különálló részecske van a vásznon – mindegyiket külön elemzem. (Kösd össze őket, ha egy molekulát szeretnél.)</p>';
    comps.forEach(function (c, ci) {
      var r = analyze(c.g), m = r.entry;
      out += '<div class="mk-res">' + (comps.length > 1 ? '<h3 class="mk-sub">' + (ci + 1) + '. részecske</h3>' : '');
      out += '<p class="mk-formula"><b>Összegképlet:</b> ' + fF(m ? m.f : r.hill) + (r.q ? '<sup>' + (Math.abs(r.q) > 1 ? Math.abs(r.q) : '') + (r.q > 0 ? '+' : '−') + '</sup>' : '') +
        (m && m.f !== r.hill ? ' <span class="muted">(Hill-rend: ' + fF(r.hill) + ')</span>' : '') + ' · <b>M</b> = ' + num(r.M, 2) + ' g/mol</p>';
      if (!r.valid) {
        out += '<div class="w-msg warn"><b>Vegyértékszabály:</b><ul class="mk-probs">' + r.problems.slice(0, 6).map(function (p) {
          var a = c.g.a[p.i], inf = r.info[p.i], vs = valences(a.e, a.q || 0);
          return '<li>' + atomLabel(c.g, p.i) + ': ' + (p.miss > 0 ? 'még <b>' + p.miss + '</b> kötés hiányzik' : 'túl sok kötés (' + inf.s + ')') + ' – ' + esc(ELS[a.e][0]) + (a.q ? ' (' + (a.q > 0 ? '+' : '−') + ' töltéssel)' : '') + ' vegyértéke: ' + (vs.length ? vs.join(' vagy ') : '–') + '</li>';
        }).join('') + (r.problems.length > 6 ? '<li>… és még ' + (r.problems.length - 6) + '</li>' : '') + '</ul>' +
        (r.hEntry ? '<p>💡 Hidrogénekkel kiegészítve ez lenne: <b>' + esc(nameLine(r.hEntry)) + '</b> (' + fF(r.hEntry.f) + ') – nyomd meg a „H-k kiegészítése” gombot!</p>' : r.hKey ? '<p>💡 Hidrogénekkel kiegészítve: ' + fF(r.hHill) + ' – nyomd meg a „H-k kiegészítése” gombot!</p>' : '') +
        (r.problems.some(function (p) { return p.miss <= 0; }) && uni() ? '<p class="muted">Tipp: egyes atomok több kötést is létesíthetnek formális töltéssel (pl. N⁺: 4 kötés, O⁺: 3 kötés, O⁻: 1 kötés) – használd a ± eszközt.</p>' : '') + '</div>';
      } else if (m) {
        out += '<div class="w-msg ok">✅ Felismertem: <b>' + esc(title(m)) + '</b></div>' + factCard(m);
      } else {
        out += '<div class="w-msg ok">✅ Szabályos szerkezet – minden atom vegyértéke rendben. Ez a molekula nincs benne a ' + LIB.length + ' molekulás könyvtárban' + (r.q ? ' (ion)' : '') + '.</div>';
      }
      if (!no3d && (r.valid || c.g.a.length > 1)) {
        var rows = shapeRows(r, null);
        if (rows.length) out += '<h4 class="mk-sub">Alak (VSEPR) <span class="muted">a központi atomok körül</span></h4><ul class="mk-shape">' + rows.slice(0, 8).join('') + '</ul>' + (rows.length > 8 ? '<p class="muted">… és még ' + (rows.length - 8) + ' központi atom.</p>' : '');
      }
      if (uni() && r.valid) {
        var fc = c.g.a.map(function (a, i) { return a.q ? atomLabel(c.g, i) + ': ' + (a.q > 0 ? '+' : '−') + Math.abs(a.q) : ''; }).filter(Boolean);
        out += '<p class="muted"><b>Formális töltések</b> (FT = vegyértékelektron − nemkötő elektron − kötések száma): ' + (fc.length ? fc.join(', ') : 'minden atomon 0') + (r.q ? ' · össztöltés: ' + (r.q > 0 ? '+' : '−') + Math.abs(r.q) : '') + '</p>';
        var rad = r.info.some(function (x) { return x.rad; });
        if (rad) out += '<p class="muted">Páratlan elektron (gyök) van a szerkezetben.</p>';
      }
      out += '</div>';
    });
    return out;
  }

  /* ---------- közös: építő + elemzés + 3D ---------- */
  function workbench(main, opt) {
    main.querySelector('.mk-wb').innerHTML = '<div class="mk-left"><div class="mk-builder card"></div></div><div class="mk-right"><div class="mk-panel card pad" aria-live="polite"></div>' +
      '<div class="card pad mk-3dcard"><div class="row mk-3dhead"><h3>🧊 3D-modell</h3><button type="button" class="btn sm" id="mk-3dtog"></button></div><div class="mk-3dhost"></div><div class="mk-3dinfo"></div></div></div>';
    var panel = main.querySelector('.mk-panel'), on = S.store.get('molekula.3d', true), viewer = null, tmr = 0;
    var tog = main.querySelector('#mk-3dtog');
    function upd3d() {
      tog.textContent = on ? 'Elrejtés' : 'Megjelenítés';
      var host = main.querySelector('.mk-3dhost'), info = main.querySelector('.mk-3dinfo');
      if (!on) { host.innerHTML = ''; info.innerHTML = ''; viewer = null; return; }
      if (!viewer) viewer = Viewer3D(host);
      var g = B.graph(), comps = components(g), c = comps.filter(function (x) { return x.g.a.length > 1; })[0] || comps[0];
      if (!c) { viewer.set(null); info.innerHTML = '<p class="muted">Rajzolj egy molekulát – itt térben is megjelenik.</p>'; return; }
      if (c.g.a.length > 60) { viewer.set(null); info.innerHTML = '<p class="muted">Túl nagy a 3D-nézethez (legfeljebb 60 atom).</p>'; return; }
      var xy = c.g.a.map(function (a) { return { x: a.x / BL, y: a.y / BL }; });
      var E = viewer.set(c.g, xy), r = analyze(c.g), rows = shapeRows(r, E);
      info.innerHTML = (comps.length > 1 ? '<p class="muted">A 3D-nézet az első többatomos részecskét mutatja.</p>' : '') +
        (r.valid ? '' : '<p class="muted">⚠️ A szerkezet még nem szabályos, ezért a térbeli alak csak közelítő.</p>') +
        (rows.length ? '<ul class="mk-shape">' + rows.slice(0, 6).join('') + '</ul>' : '') + (r.valid ? polarity(r, E, r.entry) : '');
    }
    tog.addEventListener('click', function () { on = !on; S.store.set('molekula.3d', on); panel.innerHTML = analysisHtml(B.graph(), on); upd3d(); });
    var B = Builder(main.querySelector('.mk-builder'), { key: opt.key, onChange: function () {
      panel.innerHTML = (opt.head ? opt.head() : '') + analysisHtml(B.graph(), on);
      if (opt.onChange) opt.onChange(B);
      clearTimeout(tmr); tmr = setTimeout(upd3d, 180);
    } });
    panel.innerHTML = (opt.head ? opt.head() : '') + analysisHtml(B.graph(), on);
    upd3d();
    return B;
  }

  /* ================= oldalak ================= */
  function pageHub(main) {
    var done = S.store.get('molekula.kihivas', {}), iso = S.store.get('molekula.izomer', {}), eq = S.store.get('molekula.egyenlet', {});
    var isoDone = ISO.filter(function (s) { return (iso[s.f] || []).length >= s.list.length; }).length;
    var stat = { kihivas: Object.keys(done).filter(function (k) { return done[k]; }).length + ' / ' + TASKS.length + ' kész', izomer: isoDone + ' / ' + ISO.length + ' készlet teljes', egyenlet: Object.keys(eq).length + ' / ' + EQS.length + ' rendezve' };
    main.innerHTML = crumbs([['Molekulaépítő']]) + '<h1>⚛️ Molekulaépítő</h1>' +
      '<p class="lead">' + (uni() ? 'Molekulák építése vegyértékszabállyal, gráf-izomorfizmus alapú felismeréssel, VSEPR-geometriával, hibridizációval, formális töltéssel és polaritással; reakcióegyenletek rendezése racionális lineáris algebrával.' : 'Építs molekulákat atomokból, nézd meg őket térben, keresd meg az izomereket, és rendezd a kémiai egyenleteket!') + '</p>' +
      '<div class="grid mk-hub">' + MODES.map(function (m) {
        return '<a class="card tile" style="--tile:#d9a520" href="#/molekula/' + m[0] + '"><span class="ico">' + m[1] + '</span><h3>' + esc(m[2]) + '</h3><p>' + esc(m[3]) + '</p>' + (stat[m[0]] ? '<span class="badge">' + esc(stat[m[0]]) + '</span>' : '') + '</a>';
      }).join('') + '</div>' + lessonLinks();
  }
  function pageBuilder(main, params) {
    main.innerHTML = crumbs([['Molekulaépítő', '#/molekula'], ['Építő']]) + '<h1>🧪 Molekulaépítő</h1>' + modeTabs('epito') +
      '<details class="mk-help card pad"><summary>Hogyan használd?</summary><ul>' +
      '<li><b>Atom lerakása:</b> válassz elemet, és koppints az üres vászonra.</li>' +
      '<li><b>Atom hozzákötése:</b> koppints egy meglévő atomra – a kiválasztott elemből új atom kapcsolódik hozzá. Húzással magad döntöd el, hová kerüljön.</li>' +
      '<li><b>Kötés két atom között:</b> húzz az egyik atomtól a másikig. Kötésre koppintva: egyes → kettős → hármas.</li>' +
      '<li><b>Elemcsere:</b> 🔁 eszköz, vagy tartsd az ujjad egy atomon fél másodpercig.</li>' +
      '<li><b>Formális töltés</b> (±): pl. a salétromsavban N⁺ és O⁻ kell. <b>Radír</b> (🧽): atom vagy kötés törlése.</li>' +
      '<li>A <b>„H-k kiegészítése”</b> gomb minden szabad vegyértéket hidrogénnel tölt fel – elég a szénvázat megrajzolnod!</li></ul></details>' +
      '<div class="mk-wb"></div>' + lessonLinks();
    var B = workbench(main, { key: 'molekula.vaszon' });
    if (params && params.m && BYID[params.m]) B.load(BYID[params.m]);
  }
  function pageTasks(main, rest) {
    var done = S.store.get('molekula.kihivas', {}), n = rest[1] != null ? +rest[1] : NaN;
    if (!(n >= 1 && n <= TASKS.length)) {
      main.innerHTML = crumbs([['Molekulaépítő', '#/molekula'], ['Építsd meg!']]) + '<h1>🎯 Építsd meg!</h1>' + modeTabs('kihivas') +
        '<p class="lead">' + TASKS.length + ' feladat, egyre nehezebben. A program a szerkezetet ellenőrzi: mindegy, hogyan rajzolod, csak a kapcsolódások számítanak.</p>' +
        '<p><span class="badge">' + Object.keys(done).filter(function (k) { return done[k]; }).length + ' / ' + TASKS.length + ' kész</span></p>' +
        '<ol class="mk-tasklist">' + TASKS.map(function (t, i) {
          var m = BYID[t[0]], lv = i < 11 ? 1 : i < 24 ? 2 : 3;
          return '<li><a class="card" href="#/molekula/kihivas/' + (i + 1) + '"><span class="mk-num' + (done[t[0]] ? ' done' : '') + '">' + (done[t[0]] ? '✓' : i + 1) + '</span><span><b>' + esc(title(m)) + '</b><small>' + (uni() || lv === 1 ? fF(m.f) + ' · ' : '') + ['', 'könnyű', 'közepes', 'nehéz'][lv] + '</small></span></a></li>';
        }).join('') + '</ol>' + lessonLinks([0, 2, 5]);
      return;
    }
    var t = TASKS[n - 1], m = BYID[t[0]], shown = { tip: false, f: !uni() && n <= 11 }, solved = false;
    main.innerHTML = crumbs([['Molekulaépítő', '#/molekula'], ['Építsd meg!', '#/molekula/kihivas'], [n + '. feladat']]) +
      '<h1>🎯 ' + n + '. feladat: ' + esc(title(m)) + '</h1>' + modeTabs('kihivas') +
      '<div class="card pad mk-task"><div class="mk-taskq"></div><div class="row mk-taskbtns"><button type="button" class="btn sm" data-h="tip">💡 Tipp</button><button type="button" class="btn sm" data-h="f">🧪 Képlet</button><button type="button" class="btn sm" data-h="sol">👀 Megoldás</button>' +
      (n > 1 ? '<a class="btn sm" href="#/molekula/kihivas/' + (n - 1) + '">← Előző</a>' : '') + (n < TASKS.length ? '<a class="btn sm" href="#/molekula/kihivas/' + (n + 1) + '">Következő →</a>' : '') + '</div><div class="mk-taskres" aria-live="polite"></div></div>' +
      '<div class="mk-wb"></div>';
    function q() {
      main.querySelector('.mk-taskq').innerHTML = '<p>Építsd meg ezt a molekulát: <b>' + esc(nameLine(m)) + '</b>' + (shown.f ? ' – ' + fF(m.f) : '') + '</p>' + (shown.tip ? '<p class="muted">💡 ' + esc(t[1]) + '</p>' : '') + (done[t[0]] ? '<p class="muted">✓ Ezt már egyszer megoldottad.</p>' : '');
    }
    q();
    S.store.set('molekula.kihivas.vaszon', null);
    var B = workbench(main, { key: 'molekula.kihivas.vaszon', onChange: function (b) {
      var g = b.graph(), comps = components(g), res = main.querySelector('.mk-taskres');
      if (comps.length !== 1) { res.innerHTML = ''; return; }
      var r = analyze(g);
      if (r.entry === m) {
        if (!solved) { solved = true; done[t[0]] = true; S.store.set('molekula.kihivas', done); q(); }
        res.innerHTML = '<div class="w-msg ok">🎉 Kész! Ez valóban ' + esc(title(m)) + '.' + (n < TASKS.length ? ' <a href="#/molekula/kihivas/' + (n + 1) + '">Jöhet a következő →</a>' : ' Az összes feladat végére értél!') + '</div>';
      } else if (r.valid && r.entry) res.innerHTML = '<div class="w-msg warn">Ez ' + esc(title(r.entry)) + ' – szabályos molekula, de nem ezt kértük.' + (r.hill === m.hill ? ' Ugyanaz az összegképlet: ez egy <b>izomer</b>!' : '') + '</div>';
      else if (r.valid) res.innerHTML = '<div class="w-msg warn">Szabályos molekula, de nem a keresett. ' + (r.hill === m.hill ? 'Az összegképlet stimmel – rendezd át az atomokat!' : 'Vesd össze az összegképletet: ' + fF(r.hill) + '.') + '</div>';
      else if (r.hEntry === m) res.innerHTML = '<div class="w-msg warn">Jó úton jársz – már csak a hidrogének hiányoznak.</div>';
      else res.innerHTML = '';
    } });
    main.querySelector('.mk-taskbtns').addEventListener('click', function (e) {
      var b = e.target.closest('[data-h]'); if (!b) return;
      if (b.dataset.h === 'sol') { B.load(m); return; }
      shown[b.dataset.h] = true; q();
    });
  }
  function pageIso(main, rest) {
    var store = S.store.get('molekula.izomer', {}), f = rest[1], set = ISO.filter(function (s) { return s.f === f; })[0];
    if (!set) {
      main.innerHTML = crumbs([['Molekulaépítő', '#/molekula'], ['Izomerkereső']]) + '<h1>🔀 Izomerkereső</h1>' + modeTabs('izomer') +
        '<p class="lead">Az <b>izomerek</b> összegképlete azonos, de az atomok másképp kapcsolódnak egymáshoz – ezért más a nevük és a tulajdonságaik. Válassz egy összegképletet, és építsd meg az összes lehetséges szerkezetet!</p>' +
        '<div class="grid">' + ISO.map(function (s) {
          var got = (store[s.f] || []).length;
          return '<a class="card tile" style="--tile:#7b5cd6" href="#/molekula/izomer/' + s.f + '"><h3>' + fF(s.f) + '</h3><p>' + esc(s.t) + ' – ' + esc(s.d) + '</p><span class="badge' + (got >= s.list.length ? ' done' : '') + '">' + got + ' / ' + s.list.length + ' megtalálva</span></a>';
        }).join('') + '</div>' + lessonLinks([4]);
      return;
    }
    var found = store[f] || [];
    main.innerHTML = crumbs([['Molekulaépítő', '#/molekula'], ['Izomerkereső', '#/molekula/izomer'], [f]]) + '<h1>🔀 ' + fF(f) + ' izomerjei</h1>' + modeTabs('izomer') +
      '<div class="card pad mk-iso"><p>' + esc(set.d) + ' Építs egy ' + fF(f) + ' képletű molekulát – ha új, felkerül a listára. Utána töröld a vásznat (🗑), és jöhet a következő!</p><div class="mk-isolist"></div><div class="row"><button type="button" class="btn sm" id="mk-isoreset">↺ Újrakezdés</button></div></div>' +
      '<div class="mk-wb"></div>';
    function list(msg) {
      var keys = found;
      main.querySelector('.mk-isolist').innerHTML = (msg || '') + '<p><b>' + keys.length + ' / ' + set.list.length + '</b> izomer megtalálva' + (keys.length >= set.list.length ? ' – 🏆 megvan mind!' : '') + '</p>' +
        '<div class="mk-bar"><span style="width:' + Math.round(100 * keys.length / set.list.length) + '%"></span></div><ul class="mk-found">' + set.list.map(function (m) {
          var ok = keys.indexOf(m.key) >= 0;
          return '<li class="' + (ok ? 'ok' : '') + '">' + (ok ? '✅ <b>' + esc(title(m)) + '</b> <span class="muted">' + esc(m.n) + (m.fp ? ' · fp. ' + esc(m.fp) : '') + '</span>' : '❔ <span class="muted">még nem találtad meg</span>') + '</li>';
        }).join('') + '</ul>';
    }
    list();
    main.querySelector('#mk-isoreset').addEventListener('click', function () { found = []; store[f] = found; S.store.set('molekula.izomer', store); list(); });
    workbench(main, { key: 'molekula.izomer.vaszon', onChange: function (b) {
      var g = b.graph(), comps = components(g);
      if (comps.length !== 1) return;
      var r = analyze(g);
      if (!r.valid || r.q || g.a.some(function (a) { return a.q; })) return;
      if (r.hill !== f) { list('<p class="w-msg warn">Ez ' + fF(r.hill) + ' – nem ' + fF(f) + '.</p>'); return; }
      if (found.indexOf(r.key) >= 0) { list('<p class="w-msg warn">Ezt már megtaláltad' + (r.entry ? ': ' + esc(title(r.entry)) : '') + '. A forgatás vagy tükrözés nem ad új izomert!</p>'); return; }
      if (!r.entry) { list('<p class="w-msg warn">Ez szabályos ' + fF(f) + ' szerkezet, de nincs a listán – ellenőrizd, nem tartalmaz-e szokatlan gyűrűt vagy kötést.</p>'); return; }
      found.push(r.key); store[f] = found; S.store.set('molekula.izomer', store);
      list('<p class="w-msg ok">🎉 Új izomer: <b>' + esc(title(r.entry)) + '</b>!</p>');
    } });
  }
  function eqHtml(eq, co, inputs) {
    function side(list, off) {
      return list.map(function (x, i) {
        var k = off + i;
        return '<span class="mk-sp">' + (inputs ? '<input type="number" inputmode="numeric" min="1" max="99" class="mk-co" data-k="' + k + '" value="' + (co[k] || '') + '" placeholder="1" aria-label="' + esc(x.f) + ' együtthatója">' : (co[k] > 1 ? '<b class="mk-cov">' + co[k] + '</b>' : '')) + '<span class="mk-spf">' + fF(x.f) + '</span></span>';
      }).join('<span class="mk-plus">+</span>');
    }
    return '<div class="mk-eq">' + side(eq.L, 0) + '<span class="mk-arrow">→</span>' + side(eq.R, eq.L.length) + '</div>';
  }
  function pageEq(main, params) {
    var solvedSt = S.store.get('molekula.egyenlet', {}), idx = Math.max(0, Math.min(EQS.length - 1, (params && +params.i ? +params.i : S.store.get('molekula.egyenlet.i', 1)) - 1)), custom = null, co = [], hintN = 0;
    main.innerHTML = crumbs([['Molekulaépítő', '#/molekula'], ['Egyenletrendező']]) + '<h1>⚖️ Egyenletrendező</h1>' + modeTabs('egyenlet') +
      '<p class="lead">' + (uni() ? 'Anyagmegmaradás: minden elem atomjainak (ionegyenletnél a töltésnek is) egyeznie kell a két oldalon. Az automatikus rendező a sztöchiometriai mátrix nullterét számolja ki racionális Gauss-eliminációval.' : 'A kémiai reakcióban az atomok nem tűnnek el és nem keletkeznek: csak átrendeződnek. Írd be az együtthatókat úgy, hogy minden atomból ugyanannyi legyen a két oldalon!') + '</p>' +
      '<div class="card pad"><div class="row mk-eqsel"><button type="button" class="btn sm" id="mk-prev" aria-label="Előző egyenlet">←</button><select id="mk-eqs"></select><button type="button" class="btn sm" id="mk-next" aria-label="Következő egyenlet">→</button></div>' +
      '<div id="mk-eqbox"></div></div>' +
      '<div class="card pad mk-own"><h2>✍️ Saját egyenlet automatikus rendezése</h2><p class="muted">Írd be a képleteket „+” jelekkel és nyíllal (→, -> vagy =). Zárójel, kristályvíz (CuSO4·5H2O) és ionok is mehetnek: Fe^3+, MnO4^-.</p>' +
      '<div class="row"><input id="mk-owni" class="mk-owni" placeholder="pl. C3H8 + O2 -> CO2 + H2O" autocomplete="off" spellcheck="false"><button type="button" class="btn primary" id="mk-ownb">⚙️ Rendezés</button></div><div id="mk-ownout" aria-live="polite"></div></div>' + lessonLinks([0, 1, 3, 4]);
    var sel = main.querySelector('#mk-eqs');
    sel.innerHTML = [1, 2, 3].map(function (lv) {
      return '<optgroup label="' + ['', 'Könnyű', 'Közepes', 'Nehéz (redoxi, ionegyenlet)'][lv] + '">' + EQS.map(function (e, i) {
        return e.lv === lv ? '<option value="' + i + '">' + (solvedSt[i] ? '✓ ' : '') + (i + 1) + '. ' + esc(e.t) + '</option>' : ''; }).join('') + '</optgroup>';
    }).join('');
    function cur() { return custom || { eq: parseEquation(EQS[idx].f), d: EQS[idx] }; }
    function paint() {
      var c = cur(), eq = c.eq, nS = eq.L.length + eq.R.length;
      while (co.length < nS) co.push('');
      var box = main.querySelector('#mk-eqbox');
      box.innerHTML = '<p class="mk-eqt"><b>' + esc(c.d.t) + '</b>' + (c.d.lv ? ' <span class="badge l' + Math.min(c.d.lv, 2) + '">' + ['', 'könnyű', 'közepes', 'nehéz'][c.d.lv] + '</span>' : '') + (!custom && solvedSt[idx] ? ' <span class="badge done">✓ megoldva</span>' : '') + '</p>' +
        eqHtml(eq, co, true) + '<div class="mk-scale"></div><div class="mk-tbl"></div>' +
        '<div class="row mk-eqbtns"><button type="button" class="btn primary" data-e="check">✔ Ellenőrzés</button><button type="button" class="btn" data-e="tip">💡 Tipp</button><button type="button" class="btn" data-e="sol">👀 Megoldás</button><button type="button" class="btn" data-e="reset">↺ Törlés</button></div><div class="mk-eqmsg" aria-live="polite"></div>';
      box.querySelectorAll('.mk-co').forEach(function (inp) {
        inp.addEventListener('input', function () { co[+inp.dataset.k] = inp.value; live(); });
      });
      live();
    }
    function coef() { return co.map(function (v) { var n = parseInt(v, 10); return n > 0 ? n : 1; }); }
    function live() {
      var c = cur(), eq = c.eq, k = coef(), L = sideCount(eq.L, k), R = sideCount(eq.R, k.slice(eq.L.length));
      var els = Object.keys(L).concat(Object.keys(R)).filter(function (e, i, a) { return a.indexOf(e) === i; });
      els.sort(function (a, b) { return (a === '±') - (b === '±') || (a === 'C' ? -1 : b === 'C' ? 1 : a === 'H' ? -1 : b === 'H' ? 1 : a < b ? -1 : 1); });
      var mL = 0, mR = 0;
      eq.L.forEach(function (x, i) { mL += massOf(x.c) * k[i]; }); eq.R.forEach(function (x, i) { mR += massOf(x.c) * k[eq.L.length + i]; });
      var ok = els.every(function (e) { return (L[e] || 0) === (R[e] || 0); });
      var mx = Math.max(1, Math.max.apply(null, els.map(function (e) { return Math.max(Math.abs(L[e] || 0), Math.abs(R[e] || 0)); })));
      main.querySelector('.mk-tbl').innerHTML = '<table class="mk-atoms"><thead><tr><th>Bal oldal</th><th></th><th>Jobb oldal</th></tr></thead><tbody>' + els.map(function (e) {
        var a = L[e] || 0, b = R[e] || 0, eqv = a === b, lab = e === '±' ? 'töltés' : e;
        return '<tr class="' + (eqv ? 'ok' : 'bad') + '"><td><span class="mk-barl"><span style="width:' + Math.round(100 * Math.abs(a) / mx) + '%"></span></span><b>' + (e === '±' && a > 0 ? '+' : '') + a + '</b></td><th>' + lab + ' ' + (eqv ? '✓' : a > b ? '&gt;' : '&lt;') + '</th><td><b>' + (e === '±' && b > 0 ? '+' : '') + b + '</b><span class="mk-barr"><span style="width:' + Math.round(100 * Math.abs(b) / mx) + '%"></span></span></td></tr>';
      }).join('') + '</tbody></table>';
      var tilt = Math.max(-14, Math.min(14, (mR - mL) / Math.max(mL, mR, 1) * 40));
      main.querySelector('.mk-scale').innerHTML = '<svg viewBox="-150 -20 300 120" class="mk-scalesvg" role="img" aria-label="Tömegmérleg">' +
        '<polygon points="-14,95 14,95 0,10" class="mk-sc-post"/><g transform="rotate(' + tilt.toFixed(1) + ')"><line x1="-120" y1="0" x2="120" y2="0" class="mk-sc-beam"/>' +
        '<g transform="translate(-110 0) rotate(' + (-tilt).toFixed(1) + ')"><line x1="0" y1="0" x2="0" y2="34" class="mk-sc-str"/><path d="M-34 34 h68 l-8 14 h-52 z" class="mk-sc-pan ' + (ok ? 'ok' : '') + '"/><text y="64" class="mk-sc-t">' + num(mL, 1) + ' g</text></g>' +
        '<g transform="translate(110 0) rotate(' + (-tilt).toFixed(1) + ')"><line x1="0" y1="0" x2="0" y2="34" class="mk-sc-str"/><path d="M-34 34 h68 l-8 14 h-52 z" class="mk-sc-pan ' + (ok ? 'ok' : '') + '"/><text y="64" class="mk-sc-t">' + num(mR, 1) + ' g</text></g></g>' +
        '<circle r="5" class="mk-sc-pin"/></svg><p class="muted mk-sc-cap">A mérleg a két oldal tömegét mutatja (moláris tömeg × együttható). Akkor áll vízszintesen, ha a tömeg megmarad' + (ok ? ' – <b class="mk-okt">és most minden atom egyezik ✓</b>' : '') + '.</p>';
      return ok;
    }
    function msg(h) { main.querySelector('.mk-eqmsg').innerHTML = h; }
    main.querySelector('#mk-eqbox').addEventListener('click', function (e) {
      var b = e.target.closest('[data-e]'); if (!b) return;
      var c = cur(), want = custom ? custom.c : EQS[idx].c, k = coef(), act = b.dataset.e;
      if (act === 'check') {
        var ok = live(), g2 = 0; k.forEach(function (x) { g2 = gcd(g2, x); });
        if (ok && g2 === 1) { msg('<div class="w-msg ok">🎉 Helyes! Minden atom' + (c.eq.L.concat(c.eq.R).some(function (x) { return x.c['±']; }) ? ' és a töltés is' : '') + ' egyezik a két oldalon.</div>'); if (!custom) { solvedSt[idx] = 1; S.store.set('molekula.egyenlet', solvedSt); } }
        else if (ok) msg('<div class="w-msg warn">Az atomszámok egyeznek, de az együtthatók egyszerűsíthetők (mind osztható ' + g2 + '-vel). A legkisebb egész számokat szoktuk használni.</div>');
        else msg('<div class="w-msg bad">Még nem stimmel: nézd meg a táblázat piros sorait!</div>');
      } else if (act === 'tip') {
        hintN++;
        var first = -1; want.forEach(function (w, i) { if (first < 0 && k[i] !== w) first = i; });
        var sp = c.eq.L.concat(c.eq.R);
        msg('<div class="w-msg warn">💡 ' + (hintN === 1 ? esc(c.d.tip || 'Kezdd a legtöbb atomot tartalmazó molekulával; a csak egyféle atomból álló anyagokat (O₂, H₂, Fe…) hagyd a végére!') :
          first >= 0 ? 'A(z) ' + fF(sp[first].f) + ' együtthatója: <b>' + want[first] + '</b>.' : 'Úgy tűnik, minden együttható jó – nyomd meg az Ellenőrzést!') + '</div>');
      } else if (act === 'sol') { co = want.map(String); paint(); msg('<div class="w-msg">A rendezett egyenlet: ' + eqHtml(c.eq, want, false) + '</div>'); }
      else if (act === 'reset') { co = []; hintN = 0; paint(); }
    });
    function go(i) { custom = null; idx = (i + EQS.length) % EQS.length; S.store.set('molekula.egyenlet.i', idx + 1); co = []; hintN = 0; sel.value = idx; paint(); }
    sel.addEventListener('change', function () { go(+sel.value); });
    main.querySelector('#mk-prev').addEventListener('click', function () { go(idx - 1); });
    main.querySelector('#mk-next').addEventListener('click', function () { go(idx + 1); });
    function own() {
      var v = main.querySelector('#mk-owni').value.trim(), out = main.querySelector('#mk-ownout');
      if (!v) { out.innerHTML = ''; return; }
      var eq = parseEquation(v);
      if (eq.err) { out.innerHTML = '<div class="w-msg bad">' + esc(eq.err) + '</div>'; return; }
      var r = balance(eq);
      if (r.err) { out.innerHTML = '<div class="w-msg bad">' + esc(r.err) + '</div>'; return; }
      out.innerHTML = '<div class="w-msg ok">Rendezve: ' + eqHtml(eq, r.c, false) + '</div>' + (r.multi ? '<p class="w-msg warn">Figyelem: ennek az egyenletnek több, egymástól független megoldása is van (valójában két reakció összege), ez csak az egyik.</p>' : '') +
        (uni() ? '<p class="muted">Az egyenletrendszer: ' + Object.keys(sideCount(eq.L.concat(eq.R), r.c)).length + ' elem' + ' (sor) × ' + r.c.length + ' anyag (oszlop); a nulltér bázisvektorát a legkisebb pozitív egészekre skáláztam.</p>' : '') +
        '<p><button type="button" class="btn sm" id="mk-owntry">✍️ Kipróbálom magam a fenti mérlegen</button></p>';
      main.querySelector('#mk-owntry').addEventListener('click', function () { custom = { eq: eq, c: r.c, d: { t: 'Saját egyenlet: ' + v, tip: 'Kezdd azzal az elemmel, amelyik a legkevesebb anyagban szerepel!' } }; co = []; hintN = 0; paint(); main.querySelector('#mk-eqbox').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    }
    main.querySelector('#mk-ownb').addEventListener('click', own);
    main.querySelector('#mk-owni').addEventListener('keydown', function (e) { if (e.key === 'Enter') own(); });
    sel.value = idx; paint();
  }
  function pageLib(main, rest) {
    var id = rest[1];
    if (id && BYID[id]) {
      var m = BYID[id], r = analyze(m.g);
      main.innerHTML = crumbs([['Molekulaépítő', '#/molekula'], ['Molekulatár', '#/molekula/konyvtar'], [title(m)]]) + '<h1>' + esc(title(m)) + ' <span class="mk-h1f">' + fF(m.f) + '</span></h1>' + modeTabs('konyvtar') +
        '<div class="mk-detail"><div class="card pad"><h3>Szerkezeti képlet</h3><div class="mk-statwrap">' + staticSvg(m, 520, 340) + '</div>' + factCard(m, true) +
        '<p class="row"><a class="btn primary" href="#/molekula/epito?m=' + m.id + '">🧪 Megnyitás az építőben</a>' + (TASKS.some(function (t) { return t[0] === m.id; }) ? '<a class="btn" href="#/molekula/kihivas/' + (TASKS.map(function (t) { return t[0]; }).indexOf(m.id) + 1) + '">🎯 Építsd meg magad!</a>' : '') + '</p></div>' +
        '<div class="card pad"><h3>🧊 3D-modell</h3><div class="mk-3dhost"></div><div class="mk-3dinfo"></div></div></div>' + lessonLinks();
      var v = Viewer3D(main.querySelector('.mk-3dhost')), E = v.set(m.g, layCache[m.id]), rows = shapeRows(r, E);
      main.querySelector('.mk-3dinfo').innerHTML = (rows.length ? '<h4 class="mk-sub">Alak (VSEPR)</h4><ul class="mk-shape">' + rows.join('') + '</ul>' : '') + polarity(r, E, m) +
        (uni() ? '<p class="muted">Kanonikus gráfkulcs (H-atomok összevonva): <code class="mk-key">' + esc(m.key.length > 90 ? m.key.slice(0, 90) + '…' : m.key) + '</code></p>' : '');
      return;
    }
    var q = S.store.get('molekula.konyvtar.q', ''), cat = '';
    main.innerHTML = crumbs([['Molekulaépítő', '#/molekula'], ['Molekulatár']]) + '<h1>📚 Molekulatár</h1>' + modeTabs('konyvtar') +
      '<p class="lead">' + LIB.length + ' molekula: köznapi és IUPAC-név, összegképlet, moláris tömeg, tulajdonságok, felhasználás, veszélyek. Bármelyiket megnyithatod az építőben.</p>' +
      '<div class="row mk-libbar"><input type="search" id="mk-q" placeholder="🔎 Név vagy képlet (pl. etanol, C2H6O)" value="' + esc(q) + '"></div><div class="mk-cats">' +
      '<button type="button" class="chip on" data-c="">Mind</button>' + Object.keys(CATS).map(function (c) { return '<button type="button" class="chip" data-c="' + c + '">' + esc(CATS[c]) + '</button>'; }).join('') + '</div><div class="mk-libgrid"></div>';
    function paint() {
      var w = S.norm(q.trim()).split(/\s+/).filter(Boolean);
      var list = LIB.filter(function (m) {
        if (cat && m.c !== cat) return false;
        var hay = S.norm(m.n + ' ' + m.k + ' ' + m.f + ' ' + m.hill + ' ' + m.id + ' ' + CATS[m.c]);
        return w.every(function (x) { return hay.indexOf(x) >= 0; });
      });
      main.querySelector('.mk-libgrid').innerHTML = list.length ? list.map(function (m) {
        return '<a class="card mk-libcard" href="#/molekula/konyvtar/' + m.id + '"><span class="mk-libsvg">' + staticSvg(m, 200, 110, 'mk-mini') + '</span><b>' + esc(title(m)) + '</b><small>' + fF(m.f) + ' · ' + num(m.M, 2) + ' g/mol</small><small class="muted">' + esc(m.n) + '</small></a>';
      }).join('') : '<p class="muted">Nincs találat.</p>';
    }
    main.querySelector('#mk-q').addEventListener('input', function (e) { q = e.target.value; S.store.set('molekula.konyvtar.q', q); paint(); });
    main.querySelector('.mk-cats').addEventListener('click', function (e) {
      var b = e.target.closest('[data-c]'); if (!b) return; cat = b.dataset.c;
      main.querySelectorAll('.mk-cats .chip').forEach(function (x) { x.classList.toggle('on', x === b); }); paint();
    });
    paint();
  }

  S.addRoute('molekula', { title: 'Molekulaépítő', nav: '', page: function (main, rest, params) {
    rest = rest || []; var mode = rest[0] || '';
    if (mode === 'epito') pageBuilder(main, params);
    else if (mode === 'kihivas') pageTasks(main, rest);
    else if (mode === 'izomer') pageIso(main, rest);
    else if (mode === 'egyenlet') pageEq(main, params);
    else if (mode === 'konyvtar') pageLib(main, rest);
    else if (!mode) pageHub(main);
    else return false;
    return true;
  } });
})();
