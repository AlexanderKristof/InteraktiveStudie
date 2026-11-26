/* Tudásműhely – ⚡ Virtuális áramkör-labor (egyenáramú, törpefeszültségű szimuláció).
 * Widget:  widget: { type: 'aramkor-labor', options: { challenge: 'lampa' | 'soros' | 'oszto' | 'led' | 'amper' | 'biztositek', mode: 'free' } }
 * Önálló oldal: #/aramkor   (#/aramkor/<feladat-id> vagy #/aramkor/szabad)
 *
 * Kezelés: koppints az alkatrészpalettán egy elemre, majd a rács két szomszédos pontja közötti szakaszra – oda kerül.
 * Megoldó: módosított csomóponti potenciálok módszere (MNA), Gauss-eliminációval, minden változtatás után.
 *  - a telep: ideális feszültségforrás 0,2 Ω belső ellenállással (Norton-ekvivalensként beépítve),
 *  - vezeték, zárt kapcsoló, ampermérő: 1 mΩ; biztosíték: 10 mΩ; feszültségmérő: 10 MΩ,
 *  - LED: szakaszosan lineáris modell (nyitófeszültség 2 V + 5 Ω), 30 mA felett kiég,
 *  - izzó: állandó ellenállású, 6 V-os névleges feszültségű (fényerő = P / P_névleges).
 * A solver STUDIE.aramkor.solve / simulate néven node-ból is tesztelhető. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc, fmt = S.fmt;

  /* ---------- fizikai állandók ---------- */
  var K = {
    RW: 0.001, RBAT: 0.2, RFUSE: 0.01, RVOLT: 1e7, GOFF: 1e-9, GMIN: 1e-9,
    LED_VF: 2.0, LED_RD: 5, LED_MAX: 0.03, SHORT_I: 5, LAMP_UN: 6
  };
  var COLS = 7, ROWS = 5, D = 60, PAD = 28;

  var TYPES = {
    wire: { name: 'Vezeték', def: null },
    bat: { name: 'Telep', def: 4.5 },
    res: { name: 'Ellenállás', def: 330 },
    lamp: { name: 'Izzó', def: 12 },
    led: { name: 'LED', def: null },
    sw: { name: 'Kapcsoló', def: null },
    amm: { name: 'Ampermérő', def: null },
    volt: { name: 'Feszültségmérő', def: null },
    fuse: { name: 'Biztosíték', def: 1 }
  };
  var ORDER = ['wire', 'bat', 'res', 'lamp', 'led', 'sw', 'amm', 'volt', 'fuse'];
  var POLAR = { bat: 1, led: 1, amm: 1, volt: 1 };

  /* E12-es ellenállássor 1 Ω … 100 kΩ */
  var E12 = (function () {
    var b = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2], out = [];
    [1, 10, 100, 1000, 10000].forEach(function (m) { b.forEach(function (x) { out.push(Math.round(x * m * 100) / 100); }); });
    out.push(100000); return out;
  })();
  var FUSES = [0.05, 0.1, 0.2, 0.5, 1, 2, 3, 5];

  /* ---------- megoldó ---------- */
  function gauss(A, b) {
    var n = b.length, i, j, k;
    for (k = 0; k < n; k++) {
      var p = k, mx = Math.abs(A[k][k]);
      for (i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > mx) { mx = Math.abs(A[i][k]); p = i; }
      if (mx < 1e-300) return null;
      if (p !== k) { var t = A[k]; A[k] = A[p]; A[p] = t; var tb = b[k]; b[k] = b[p]; b[p] = tb; }
      for (i = k + 1; i < n; i++) {
        var f = A[i][k] / A[k][k]; if (!f) continue;
        for (j = k; j < n; j++) A[i][j] -= f * A[k][j];
        b[i] -= f * b[k];
      }
    }
    var x = new Array(n);
    for (i = n - 1; i >= 0; i--) {
      var s = b[i];
      for (j = i + 1; j < n; j++) s -= A[i][j] * x[j];
      x[i] = s / A[i][i];
    }
    return x;
  }

  /* Egy elem árama a-ból b felé: I = g·(Va − Vb) + j. */
  function stampOf(c, ledOn) {
    switch (c.t) {
      case 'bat': return { g: 1 / K.RBAT, j: (+c.v || 0) / K.RBAT }; // + pólus a „b” végen
      case 'res': case 'lamp': return { g: 1 / Math.max(1e-6, +c.v || 1), j: 0 };
      case 'led': return c.dead || !ledOn ? { g: K.GOFF, j: 0 } : { g: 1 / K.LED_RD, j: -K.LED_VF / K.LED_RD };
      case 'sw': return c.on && !c.dead ? { g: 1 / K.RW, j: 0 } : { g: K.GOFF, j: 0 };
      case 'volt': return { g: 1 / K.RVOLT, j: 0 };
      case 'fuse': return c.dead ? { g: K.GOFF, j: 0 } : { g: 1 / K.RFUSE, j: 0 };
      default: return { g: 1 / K.RW, j: 0 }; // vezeték, ampermérő
    }
  }

  /* comps: [{ t, x1, y1, x2, y2, v, on, dead }] → { V: {"x,y": volt}, I, U, P (elemenként, a→b), ref } */
  function solve(comps) {
    var nodes = {}, keys = [];
    function nid(x, y) { var k = x + ',' + y; if (!(k in nodes)) { nodes[k] = keys.length; keys.push(k); } return nodes[k]; }
    var el = comps.map(function (c) { return { c: c, a: nid(c.x1, c.y1), b: nid(c.x2, c.y2) }; });
    var n = keys.length, par = [], i;
    for (i = 0; i < n; i++) par.push(i);
    function root(x) { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; }
    el.forEach(function (e) { var ra = root(e.a), rb = root(e.b); if (ra !== rb) par[ra] = rb; });
    /* szigetenként egy vonatkoztatási pont: az első telep − pólusa, különben a legkisebb sorszámú csomópont */
    var refOf = {};
    el.forEach(function (e) { if (e.c.t === 'bat') { var r = root(e.a); if (!(r in refOf)) refOf[r] = e.a; } });
    for (i = 0; i < n; i++) { var r0 = root(i); if (!(r0 in refOf)) refOf[r0] = i; }
    var idx = [], m = 0;
    for (i = 0; i < n; i++) idx.push(refOf[root(i)] === i ? -1 : m++);
    var ledOn = el.map(function () { return false; }), V = [], I = [], U = [], iter;
    for (iter = 0; iter < 40; iter++) {
      var A = [], rhs = [];
      for (i = 0; i < m; i++) { var row = []; for (var j = 0; j < m; j++) row.push(0); row[i] = K.GMIN; A.push(row); rhs.push(0); }
      el.forEach(function (e, q) {
        var s = stampOf(e.c, ledOn[q]), ia = idx[e.a], ib = idx[e.b];
        if (ia >= 0) { A[ia][ia] += s.g; rhs[ia] -= s.j; }
        if (ib >= 0) { A[ib][ib] += s.g; rhs[ib] += s.j; }
        if (ia >= 0 && ib >= 0) { A[ia][ib] -= s.g; A[ib][ia] -= s.g; }
      });
      var x = m ? gauss(A, rhs) : [];
      if (!x) x = rhs.map(function () { return 0; });
      V = idx.map(function (k) { return k < 0 ? 0 : x[k]; });
      I = []; U = [];
      var changed = false;
      el.forEach(function (e, q) {
        var s = stampOf(e.c, ledOn[q]), u = V[e.a] - V[e.b];
        U.push(u); I.push(s.g * u + s.j);
        if (e.c.t === 'led' && !e.c.dead) {
          if (!ledOn[q] && u > K.LED_VF + 1e-9) { ledOn[q] = true; changed = true; }
          else if (ledOn[q] && s.g * u + s.j < -1e-12) { ledOn[q] = false; changed = true; }
        }
      });
      if (!changed) break;
    }
    var P = el.map(function (e, q) {
      if (e.c.t === 'bat') return (+e.c.v || 0) * I[q] - I[q] * I[q] * K.RBAT; // leadott teljesítmény
      return U[q] * I[q];
    });
    var Vm = {}; keys.forEach(function (k, q) { Vm[k] = V[q]; });
    return { V: Vm, I: I, U: U, P: P, ledOn: ledOn };
  }

  /* Megoldás + kiolvadás/kiégés: a túlterhelt biztosítékot, majd LED-et „megöli”, és újraszámol.
   * A comps elemek dead mezőjét módosítja. events: [{ i, t, I }] */
  function simulate(comps) {
    var events = [], r, k;
    for (k = 0; k < 20; k++) {
      r = solve(comps);
      var hit = false;
      comps.forEach(function (c, i) {
        if (c.t === 'fuse' && !c.dead && Math.abs(r.I[i]) > (+c.v || 1)) { c.dead = true; hit = true; events.push({ i: i, t: 'fuse', I: Math.abs(r.I[i]) }); }
      });
      if (hit) continue;
      comps.forEach(function (c, i) {
        if (c.t === 'led' && !c.dead && r.I[i] > K.LED_MAX) { c.dead = true; hit = true; events.push({ i: i, t: 'led', I: r.I[i] }); }
      });
      if (!hit) break;
    }
    r.events = events;
    r.short = comps.some(function (c, i) { return c.t === 'bat' && Math.abs(r.I[i]) > K.SHORT_I; });
    return r;
  }

  /* ---------- formázás ---------- */
  function fI(i) { var a = Math.abs(i); if (a < 5e-7) return '0 mA'; return a < 1 ? fmt(i * 1000, a < 0.01 ? 2 : 1) + ' mA' : fmt(i, 2) + ' A'; }
  function fU(u) { return fmt(Math.abs(u) < 5e-4 ? 0 : u, 2) + ' V'; }
  function fP(p) { var a = Math.abs(p); return a < 1 ? fmt(p * 1000, a < 0.01 ? 2 : 0) + ' mW' : fmt(p, 2) + ' W'; }
  function fR(r) { return r >= 1000 ? fmt(r / 1000, 2) + ' kΩ' : fmt(r, 1) + ' Ω'; }
  function valLabel(c) {
    if (c.t === 'bat') return fmt(c.v, 1) + ' V';
    if (c.t === 'res' || c.t === 'lamp') return fR(c.v);
    if (c.t === 'fuse') return fmt(c.v, 2) + ' A';
    return '';
  }

  /* ---------- rajzolás ---------- */
  function sym(t, c) {
    var L = '<line class="ak-w" x1="-30" y1="0" x2="';
    function leads(r) { return L + (-r) + '" y2="0"/><line class="ak-w" x1="' + r + '" y1="0" x2="30" y2="0"/>'; }
    switch (t) {
      case 'wire': return L + '30" y2="0"/>';
      case 'bat': return leads(4) + '<line class="ak-w" x1="-4" y1="-6" x2="-4" y2="6" stroke-width="5"/><line class="ak-w" x1="4" y1="-13" x2="4" y2="13"/>';
      case 'res': return leads(14) + '<rect class="ak-w ak-body" x="-14" y="-6" width="28" height="12" rx="1.5"/>';
      case 'lamp': return leads(11) + '<circle class="ak-w ak-body" r="11"/><path class="ak-w" d="M-7.8 -7.8L7.8 7.8M-7.8 7.8L7.8 -7.8"/>';
      case 'led': return leads(8) + '<polygon class="ak-w ak-led" points="-8,-9 -8,9 8,0"/><line class="ak-w" x1="8" y1="-9" x2="8" y2="9"/>' +
        '<path class="ak-w ak-thin" d="M0 -11l6 -7m-4 0h4v4M5 -9l6 -7m-4 0h4v4"/>';
      case 'sw': return L + '-12" y2="0"/><line class="ak-w" x1="13" y1="0" x2="30" y2="0"/><circle class="ak-w ak-body" cx="-12" r="2.5"/><circle class="ak-w ak-body" cx="13" r="2.5"/>' +
        (c && c.on ? '<line class="ak-w" x1="-12" y1="0" x2="13" y2="-1"/>' : '<line class="ak-w" x1="-12" y1="0" x2="10" y2="-13"/>');
      case 'amm': case 'volt': return leads(12) + '<circle class="ak-w ak-body" r="12"/>';
      case 'fuse': return leads(14) + '<rect class="ak-w ak-body" x="-14" y="-5" width="28" height="10" rx="1.5"/>' +
        (c && c.dead ? '<path class="ak-w ak-thin" d="M-14 0h10M4 0h10"/>' : '<line class="ak-w ak-thin" x1="-14" y1="0" x2="14" y2="0"/>');
    }
    return '';
  }
  function iconSvg(t) {
    var letter = t === 'amm' ? 'A' : t === 'volt' ? 'V' : '';
    return '<svg class="ak-ico" viewBox="-33 -19 66 38" aria-hidden="true">' + sym(t, { on: true }) +
      (letter ? '<text class="ak-let" y="4.5" text-anchor="middle">' + letter + '</text>' : '') + '</svg>';
  }
  function px(x) { return PAD + x * D; }
  function edgeKey(x1, y1, x2, y2) {
    return x1 === x2 ? 'v' + x1 + ',' + Math.min(y1, y2) : 'h' + Math.min(x1, x2) + ',' + y1;
  }
  function edgeEnds(k) {
    var d = k.charAt(0), p = k.slice(1).split(','), x = +p[0], y = +p[1];
    return d === 'h' ? [x, y, x + 1, y] : [x, y + 1, x, y]; // alapirány: balról jobbra, illetve alulról felfelé
  }

  /* ---------- feladatok ---------- */
  function C(t, x1, y1, x2, y2, v, on) { var o = { t: t, x1: x1, y1: y1, x2: x2, y2: y2 }; if (v != null) o.v = v; if (on != null) o.on = on; return o; }
  function wires(list) { return list.map(function (w) { return C('wire', w[0], w[1], w[2], w[3]); }); }
  function infos(st) {
    return st.comps.map(function (c, i) {
      var r = st.res, b = 0;
      if (c.t === 'lamp') b = (r.U[i] * r.U[i]) / (K.LAMP_UN * K.LAMP_UN);
      if (c.t === 'led' && !c.dead) b = Math.max(0, r.I[i]) / 0.02;
      return { c: c, i: i, I: r.I[i], U: r.U[i], P: r.P[i], b: b };
    });
  }
  function ofType(st, t) { return infos(st).filter(function (x) { return x.c.t === t; }); }

  var CH = [
    { id: 'lampa', title: 'Kösd be a lámpát', ico: '💡',
      goal: 'A telep és az izzó már a táblán van. Kösd össze őket **vezetékekkel** úgy, hogy **zárt áramkör** jöjjön létre, és az izzó világítson!',
      hint: 'Válaszd a **Vezeték** eszközt, és koppints a rácspontok közötti szakaszokra. Az áramnak körbe kell érnie: a telep + pólusától az izzón át vissza a − pólusig.',
      setup: function () { return [C('bat', 1, 2, 1, 1, 4.5), C('lamp', 3, 2, 3, 1, 12)]; },
      check: function (st) {
        var l = ofType(st, 'lamp').filter(function (x) { return x.b >= 0.2; })[0];
        if (st.res.short) return { ok: false, msg: 'Rövidzár van a körben – az áram nem az izzón át folyik.' };
        return l ? { ok: true, msg: 'Világít! Zárt áramkör jött létre. Az izzón ' + fU(Math.abs(l.U)) + ' feszültség van, és I = U / R = ' + fI(Math.abs(l.I)) + ' áram folyik át rajta.' } : { ok: false };
      } },
    { id: 'soros', title: 'Soros vs párhuzamos', ico: '🔀',
      goal: '**1. lépés:** kösd a két izzót **sorosan** (egymás után, egyetlen körben) a telepre. **2. lépés:** építsd át **párhuzamosra**: mindkét izzó külön ágban, közvetlenül a telep két pólusára kötve. Figyeld a fényerőt!',
      hint: 'Sorosan ugyanaz az áram folyik át mindkét izzón, de a telep feszültsége megoszlik köztük – ezért halványabbak. Párhuzamosan mindkettő a teljes telepfeszültséget kapja. Az átépítéshez a **Törlés** eszközzel vehetsz le vezetéket.',
      setup: function () { return [C('bat', 1, 3, 1, 2, 6), C('lamp', 3, 1, 4, 1, 12), C('lamp', 3, 3, 4, 3, 12)]; },
      check: function (st, mem) {
        var L = ofType(st, 'lamp').filter(function (x) { return x.b >= 0.03; }), E = 0;
        ofType(st, 'bat').forEach(function (x) { E = Math.max(E, x.c.v); });
        if (st.res.short || L.length < 2 || !E) return { ok: false, msg: mem.ser ? '✓ 1. lépés kész (soros: ' + mem.ser + '). Most jöhet a párhuzamos kapcsolás!' : '' };
        var a = L[0], b = L[1], Ia = Math.abs(a.I), Ib = Math.abs(b.I), Ua = Math.abs(a.U), Ub = Math.abs(b.U);
        if (Math.abs(Ia - Ib) < 0.01 * Ia && Ua + Ub > 0.85 * E && Ua < 0.75 * E && Ub < 0.75 * E) mem.ser = 'izzónként ' + fU(Ua) + ', ' + fI(Ia) + ', fényerő ' + fmt(a.b * 100, 0) + '%';
        if (Ua > 0.9 * E && Ub > 0.9 * E) {
          if (!mem.ser) return { ok: false, msg: 'Ez már párhuzamos kapcsolás – de előbb a soros kötést próbáld ki (1. lépés)!' };
          return { ok: true, msg: 'Soros: ' + mem.ser + '. Párhuzamos: izzónként ' + fU(Ua) + ', ' + fI(Ia) + ', fényerő ' + fmt(a.b * 100, 0) + '%. Párhuzamosan mindkét izzó a teljes feszültséget kapja, a telepből pedig kétszer akkora áram folyik.' };
        }
        return { ok: false, msg: mem.ser ? '✓ 1. lépés kész (soros: ' + mem.ser + '). Most építsd át párhuzamosra!' : '' };
      } },
    { id: 'oszto', title: 'Feszültségosztó 5 V-ra', ico: '➗',
      goal: 'A **9 V**-os telepből állíts elő **5 V**-ot ellenállásokkal! Kösd az ellenállásokat **sorosan** a telepre, és a **feszültségmérővel** mérd meg az egyiken a feszültséget. Cél: 4,85 V és 5,15 V közötti mért érték. A telep feszültségét ne változtasd!',
      hint: 'Soros kötésben a feszültség az ellenállások arányában oszlik meg: `U2 = U · R2 / (R1 + R2)`. 5 V a 9 V-ból: `R2 : R1 ≈ 5 : 4`. Jelöld ki az ellenállást, és a csúszkával állítsd az értékét (szabványos E12-es sor).',
      setup: function () { return [C('bat', 1, 3, 1, 1 + 1, 9), C('res', 2, 1, 3, 1, 1000), C('res', 4, 1, 5, 1, 1000)].concat(wires([[1, 2, 1, 1], [1, 1, 2, 1]])); },
      check: function (st) {
        var bats = ofType(st, 'bat');
        if (!bats.length || bats.some(function (x) { return x.c.v !== 9; })) return { ok: false, msg: 'A telep legyen 9 V-os!' };
        if (ofType(st, 'res').length < 2) return { ok: false, msg: 'Legalább két ellenállás kell.' };
        var vm = ofType(st, 'volt').filter(function (x) { var u = Math.abs(x.U); return u >= 4.85 && u <= 5.15; })[0];
        return vm ? { ok: true, msg: 'A feszültségmérő ' + fU(Math.abs(vm.U)) + '-ot mutat. Ez a feszültségosztó: két soros ellenállás az ellenállásuk arányában osztja meg a telep feszültségét.' } : { ok: false };
      } },
    { id: 'led', title: 'Védd meg a LED-et ellenállással', ico: '🔴',
      goal: 'A LED-nek kb. **2 V** kell, és legfeljebb **30 mA**-t bír (ideálisan 10–20 mA). Kösd a LED-et a **9 V**-os telepre úgy, hogy **ne égjen ki**, és 5–30 mA folyjon rajta! Figyelj a polaritásra: a háromszög csúcsa a − pólus felé mutasson.',
      hint: 'Előtét-ellenállás kell sorosan: `R = (U_telep − U_LED) / I = (9 V − 2 V) / 0,02 A = 350 Ω` → a 330 Ω vagy a 390 Ω jó választás. Ha a LED kiégett 💥, jelöld ki és nyomd meg a **Csere** gombot. Rossz irányban a LED nem vezet – a **Megfordítás** gomb segít.',
      setup: function () { return [C('bat', 1, 3, 1, 2, 9), C('led', 3, 1, 4, 1)]; },
      check: function (st) {
        if (!ofType(st, 'res').length) return { ok: false };
        var l = ofType(st, 'led').filter(function (x) { return !x.c.dead && x.I >= 0.005 && x.I <= K.LED_MAX; })[0];
        return l ? { ok: true, msg: 'A LED világít, ' + fI(l.I) + ' folyik rajta, a feszültsége ' + fU(l.U) + '. Az ellenállás „elnyeli” a maradék feszültséget, és korlátozza az áramot.' } : { ok: false };
      } },
    { id: 'amper', title: 'Mérj áramot ampermérővel', ico: '🅰️',
      goal: 'Iktass be az izzós körbe egy **ampermérőt**, hogy megmutassa az izzón átfolyó áramot! Az ampermérőt mindig **sorosan** kell bekötni – ehhez cseréld le az egyik vezetéket ampermérőre.',
      hint: 'Válaszd az **Ampermérő** eszközt, és koppints az egyik meglévő vezetékre: kicseréli. Ha párhuzamosan kötnéd (pl. a telep két sarkára), rövidzárat okozna, mert az ampermérő ellenállása szinte nulla!',
      setup: function () { return [C('bat', 1, 2, 1, 1, 4.5), C('lamp', 3, 2, 3, 1, 12)].concat(wires([[1, 1, 2, 1], [2, 1, 3, 1], [1, 2, 2, 2], [2, 2, 3, 2]])); },
      check: function (st) {
        if (st.res.short) return { ok: false, msg: 'Rövidzár! Az ampermérőt sorosan kell bekötni, nem párhuzamosan.' };
        var a = ofType(st, 'amm').filter(function (x) { return Math.abs(x.I) > 0.01; })[0], l = ofType(st, 'lamp').filter(function (x) { return x.b >= 0.1; })[0];
        if (a && l && Math.abs(Math.abs(a.I) - Math.abs(l.I)) < 0.02 * Math.abs(l.I)) return { ok: true, msg: 'Az ampermérő ' + fI(Math.abs(a.I)) + '-t mutat – pontosan ennyi folyik az izzón is, mert soros körben mindenhol ugyanakkora az áram. Ellenőrzés: I = U / R = ' + fmt(Math.abs(l.U), 2) + ' V / ' + fmt(l.c.v, 0) + ' Ω.' };
        return { ok: false };
      } },
    { id: 'biztositek', title: 'Biztosíték kiolvad', ico: '🧯',
      goal: 'Ebben a körben egy **1 A**-es biztosíték védi a vezetékeket, az izzón kb. 0,37 A folyik. Zárd rövidre az izzót egy vezetékkel (például a bal oldali két pont között függőlegesen), és figyeld meg, mi történik!',
      hint: 'Rövidzárnál az áram szinte csak a vezetékek és a telep kicsi ellenállásán folyik, ezért óriási lesz. A biztosíték ilyenkor kiolvad, és megszakítja a kört, mielőtt a vezetékek túlmelegednének. Utána a biztosítékot kijelölve a **Csere** gombbal tehetsz be újat (de előbb szüntesd meg a zárlatot!).',
      setup: function () { return [C('bat', 1, 2, 1, 1, 4.5), C('fuse', 1, 1, 2, 1, 1), C('lamp', 3, 2, 3, 1, 12)].concat(wires([[2, 1, 3, 1], [1, 2, 2, 2], [2, 2, 3, 2]])); },
      check: function (st) {
        var f = ofType(st, 'fuse').filter(function (x) { return x.c.dead; })[0];
        return f ? { ok: true, msg: 'A biztosíték kiolvadt 💥 – megszakította a kört. Ezért van a lakásokban is biztosíték (kismegszakító): a zárlati áram különben felforrósítaná a vezetékeket, és tüzet okozhatna.' } : { ok: false };
      } }
  ];
  function chById(id) { return CH.filter(function (c) { return c.id === id; })[0]; }

  /* ---------- widget ---------- */
  var uid = 0;
  S.addWidget('aramkor-labor', function (el, opt) {
    opt = opt || {};
    var gid = 'akg' + (++uid);
    var mode = opt.mode === 'free' ? 'free' : (opt.challenge || opt.mode === 'challenge') ? 'ch' : S.store.get('aramkor.mode', 'ch');
    var chId = chById(opt.challenge) ? opt.challenge : S.store.get('aramkor.chId', 'lampa');
    if (!chById(chId)) chId = 'lampa';
    var tool = 'sel', selIdx = -1, selNode = null, undo = [], mem = {}, hintOn = false, st = { comps: [], res: null }, lastEvents = [];

    function clone(c) { return JSON.parse(JSON.stringify(c)); }
    function loadState() {
      if (mode === 'free') st.comps = S.store.get('aramkor.free', null) || [C('bat', 1, 2, 1, 1, 4.5)];
      else st.comps = (S.store.get('aramkor.chs', {})[chId]) || chById(chId).setup();
      st.comps = st.comps.filter(function (c) { return TYPES[c.t]; });
      undo = []; selIdx = -1; selNode = null; mem = (S.store.get('aramkor.mem', {})[chId]) || {};
    }
    function persist() {
      if (mode === 'free') S.store.set('aramkor.free', st.comps);
      else { var m = S.store.get('aramkor.chs', {}); m[chId] = st.comps; S.store.set('aramkor.chs', m); }
    }
    function pushUndo() { undo.push(clone(st.comps)); if (undo.length > 60) undo.shift(); }
    function find(k) { for (var i = 0; i < st.comps.length; i++) { var c = st.comps[i]; if (edgeKey(c.x1, c.y1, c.x2, c.y2) === k) return i; } return -1; }

    el.innerHTML = '<div class="ak">' +
      '<div class="w-title">⚡ Áramkör-labor</div>' +
      '<p class="w-help">Koppints a palettán egy alkatrészre, majd a rács két szomszédos pontja közötti szakaszra. Ha egy alkatrészre koppintasz, kijelölöd: ott állíthatod az értékét. Pontra koppintva látod a feszültségét.</p>' +
      '<div class="ak-modes seg" role="group" aria-label="Mód"><button type="button" data-mode="ch">🎯 Feladatok</button><button type="button" data-mode="free">🛠️ Szabad építés</button></div>' +
      '<div class="ak-ch"></div>' +
      '<div class="ak-pal" role="toolbar" aria-label="Alkatrészek"></div>' +
      '<div class="ak-board"><svg class="ak-svg" viewBox="0 0 ' + (2 * PAD + (COLS - 1) * D) + ' ' + (2 * PAD + (ROWS - 1) * D) + '" role="img" aria-label="Áramköri tábla"></svg></div>' +
      '<div class="ak-actions"><button type="button" class="btn" data-act="undo">↶ Visszavonás</button><button type="button" class="btn" data-act="fix">🔧 Minden csere</button><button type="button" class="btn" data-act="clear">🧹 Tábla törlése</button><button type="button" class="btn ak-reset" data-act="reset">↺ Feladat újrakezdése</button></div>' +
      '<div class="ak-status" aria-live="polite"></div>' +
      '<div class="ak-sel"></div>' +
      '<div class="ak-meters"></div>' +
      '<div class="ak-saves"></div>' +
      '<p class="ak-safe">⚠️ <b>Biztonság:</b> ez csak törpefeszültségű (elemes, néhány voltos) áramkörök szimulációja. A hálózati 230 V <b>életveszélyes</b> – konnektorral, hálózati vezetékkel soha ne kísérletezz!</p>' +
      '</div>';
    var svg = el.querySelector('.ak-svg'), pal = el.querySelector('.ak-pal'), chBox = el.querySelector('.ak-ch'),
      statusBox = el.querySelector('.ak-status'), selBox = el.querySelector('.ak-sel'), metBox = el.querySelector('.ak-meters'), saveBox = el.querySelector('.ak-saves');

    function paintPalette() {
      pal.innerHTML = '<button type="button" data-tool="sel" class="ak-tool' + (tool === 'sel' ? ' on' : '') + '"><span class="ak-emo">👆</span><span>Kijelölés</span></button>' +
        ORDER.map(function (t) { return '<button type="button" data-tool="' + t + '" class="ak-tool' + (tool === t ? ' on' : '') + '">' + iconSvg(t) + '<span>' + TYPES[t].name + '</span></button>'; }).join('') +
        '<button type="button" data-tool="del" class="ak-tool' + (tool === 'del' ? ' on' : '') + '"><span class="ak-emo">🗑️</span><span>Törlés</span></button>';
    }
    pal.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tool]'); if (!b) return;
      tool = b.dataset.tool; paintPalette();
    });

    /* ---- szimuláció és kirajzolás ---- */
    function run() {
      st.res = simulate(st.comps);
      if (st.res.events.length) lastEvents = st.res.events.slice();
      paintBoard(); paintStatus(); paintSelReadings(); paintMeters(); paintChallenge();
    }
    function changed(keepEvents) { if (!keepEvents) lastEvents = []; persist(); run(); }

    function paintBoard() {
      var r = st.res, h = '', x, y, used = {};
      h += '<defs><radialGradient id="' + gid + 'l"><stop offset="0" stop-color="#ffe066" stop-opacity="1"/><stop offset=".55" stop-color="#ffc400" stop-opacity=".55"/><stop offset="1" stop-color="#ffb300" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="' + gid + 'r"><stop offset="0" stop-color="#ff4d4d" stop-opacity="1"/><stop offset="1" stop-color="#ff2a2a" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="' + gid + 'h"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".9"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient></defs>';
      /* üres szakaszok (vezetővonalak) */
      for (y = 0; y < ROWS; y++) for (x = 0; x < COLS; x++) {
        if (x < COLS - 1) h += '<line class="ak-guide" x1="' + px(x) + '" y1="' + px(y) + '" x2="' + px(x + 1) + '" y2="' + px(y) + '"/>';
        if (y < ROWS - 1) h += '<line class="ak-guide" x1="' + px(x) + '" y1="' + px(y) + '" x2="' + px(x) + '" y2="' + px(y + 1) + '"/>';
      }
      var labels = '', flows = '';
      st.comps.forEach(function (c, i) {
        used[c.x1 + ',' + c.y1] = used[c.x2 + ',' + c.y2] = 1;
        var ax = px(c.x1), ay = px(c.y1), bx = px(c.x2), by = px(c.y2), mx = (ax + bx) / 2, my = (ay + by) / 2,
          ang = Math.round(Math.atan2(by - ay, bx - ax) * 180 / Math.PI), horiz = c.y1 === c.y2,
          I = r.I[i], hot = Math.abs(I) > K.SHORT_I && c.t !== 'fuse';
        var g = '<g transform="translate(' + mx + ' ' + my + ') rotate(' + ang + ')">';
        if (hot) h += '<circle cx="' + mx + '" cy="' + my + '" r="26" fill="url(#' + gid + 'h)" class="ak-heat"/>';
        if (c.t === 'lamp') {
          var b = Math.min(1.6, r.U[i] * r.U[i] / (K.LAMP_UN * K.LAMP_UN));
          if (b > 0.01) h += '<circle cx="' + mx + '" cy="' + my + '" r="' + (12 + 16 * Math.min(1.3, Math.sqrt(b))) + '" fill="url(#' + gid + 'l)" opacity="' + Math.min(1, 0.25 + b).toFixed(2) + '"/>';
        }
        if (c.t === 'led' && !c.dead && I > 1e-4) h += '<circle cx="' + mx + '" cy="' + my + '" r="' + (10 + 10 * Math.min(1, I / 0.02)) + '" fill="url(#' + gid + 'r)" opacity="' + Math.min(1, 0.3 + I / 0.02).toFixed(2) + '"/>';
        if (i === selIdx) h += g + '<rect class="ak-selbox" x="-27" y="-17" width="54" height="34" rx="7"/></g>';
        h += '<g class="ak-c ak-' + c.t + (hot ? ' ak-hot' : '') + (c.dead ? ' ak-dead' : '') + (c.t === 'lamp' && r.U[i] * r.U[i] / 36 >= 0.05 ? ' ak-lit' : '') + '">' + g + sym(c.t, c) + '</g>';
        if (c.t === 'amm' || c.t === 'volt') h += '<text class="ak-let" x="' + mx + '" y="' + (my + 4.5) + '" text-anchor="middle">' + (c.t === 'amm' ? 'A' : 'V') + '</text>';
        h += '</g>';
        if (POLAR[c.t] && c.t !== 'led') {
          var qx = bx - (bx - ax) * 0.2 + (horiz ? 0 : -10), qy = by - (by - ay) * 0.2 + (horiz ? 15 : 4);
          labels += '<text class="ak-plus" x="' + qx + '" y="' + qy + '" text-anchor="middle">+</text>';
        }
        var lab = valLabel(c);
        if (c.t === 'amm') lab = fI(-I);
        if (c.t === 'volt') lab = fU(-r.U[i]);
        if (c.dead) labels += '<text class="ak-boom" x="' + mx + '" y="' + (my + 6) + '" text-anchor="middle">💥</text>';
        if (hot && c.t === 'bat') labels += '<text class="ak-boom" x="' + (mx + (horiz ? 0 : 16)) + '" y="' + (my + (horiz ? -16 : 6)) + '" text-anchor="middle">🔥</text>';
        if (lab) labels += '<text class="ak-lab' + (c.t === 'amm' || c.t === 'volt' ? ' ak-read' : '') + '" x="' + (horiz ? mx : mx + 15) + '" y="' + (horiz ? my - 15 : my + 4) + '" text-anchor="' + (horiz ? 'middle' : 'start') + '">' + esc(lab) + '</text>';
        if ((c.t === 'wire' || c.t === 'sw') && Math.abs(I) > 2e-4) { // a mozgó pontok a vezetékeken mutatják az áram irányát
          var dur = Math.max(0.25, Math.min(4, 0.6 / Math.sqrt(Math.abs(I))));
          flows += '<line class="ak-flow' + (I < 0 ? ' ak-rev' : '') + '" x1="' + ax + '" y1="' + ay + '" x2="' + bx + '" y2="' + by + '" style="animation-duration:' + dur.toFixed(2) + 's"/>';
        }
      });
      h += flows;
      for (y = 0; y < ROWS; y++) for (x = 0; x < COLS; x++) {
        var k = x + ',' + y;
        h += '<circle class="ak-dot' + (used[k] ? ' ak-used' : '') + (selNode === k ? ' ak-nsel' : '') + '" cx="' + px(x) + '" cy="' + px(y) + '" r="' + (selNode === k ? 6 : used[k] ? 4 : 3) + '"/>';
      }
      h += labels;
      if (selNode && st.res.V[selNode] != null) {
        var p = selNode.split(','), nx = px(+p[0]), ny = px(+p[1]);
        h += '<text class="ak-nv" x="' + nx + '" y="' + (ny - 9) + '" text-anchor="middle">' + esc(fU(st.res.V[selNode])) + '</text>';
      }
      /* koppintási felületek */
      for (y = 0; y < ROWS; y++) for (x = 0; x < COLS; x++) {
        if (x < COLS - 1) h += '<rect class="ak-hit" data-e="h' + x + ',' + y + '" x="' + (px(x) + 12) + '" y="' + (px(y) - 15) + '" width="' + (D - 24) + '" height="30"/>';
        if (y < ROWS - 1) h += '<rect class="ak-hit" data-e="v' + x + ',' + y + '" x="' + (px(x) - 15) + '" y="' + (px(y) + 12) + '" width="30" height="' + (D - 24) + '"/>';
      }
      for (y = 0; y < ROWS; y++) for (x = 0; x < COLS; x++) h += '<circle class="ak-hit" data-n="' + x + ',' + y + '" cx="' + px(x) + '" cy="' + px(y) + '" r="12"/>';
      svg.innerHTML = h;
    }

    function tapEdge(k) {
      var i = find(k);
      selNode = null;
      if (tool === 'del') { if (i >= 0) { pushUndo(); st.comps.splice(i, 1); selIdx = -1; changed(); } return; }
      if (tool === 'sel') {
        if (i < 0) { selIdx = -1; paintBoard(); paintSel(); return; }
        if (st.comps[i].t === 'sw') { pushUndo(); st.comps[i].on = !st.comps[i].on; selIdx = i; paintSel(); changed(); return; }
        selIdx = i; paintSel(); paintBoard(); return;
      }
      if (i >= 0 && st.comps[i].t === tool) { selIdx = i; paintSel(); paintBoard(); return; }
      pushUndo();
      var e = edgeEnds(k), c = C(tool, e[0], e[1], e[2], e[3], TYPES[tool].def);
      if (tool === 'sw') c.on = true;
      if (i >= 0) st.comps[i] = c; else st.comps.push(c);
      selIdx = i >= 0 ? i : st.comps.length - 1;
      paintSel(); changed();
    }
    svg.addEventListener('click', function (e) {
      var t = e.target.closest('[data-e],[data-n]'); if (!t) return;
      if (t.dataset.n) { selNode = selNode === t.dataset.n ? null : t.dataset.n; selIdx = -1; paintBoard(); paintSel(); return; }
      tapEdge(t.dataset.e);
    });

    /* ---- állapotüzenetek ---- */
    function paintStatus() {
      var r = st.res, msgs = [];
      if (!st.comps.some(function (c) { return c.t === 'bat'; })) msgs.push(['info', '🔋 Tegyél le egy telepet – áramforrás nélkül nem folyik áram.']);
      lastEvents.forEach(function (ev) {
        if (ev.t === 'fuse') msgs.push(['bad', '💥 A biztosíték kiolvadt: ' + fI(ev.I) + ' folyt volna rajta. Kijelölve a „Csere” gombbal tehetsz be újat.']);
        if (ev.t === 'led') msgs.push(['bad', '💥 A LED kiégett: ' + fI(ev.I) + ' folyt rajta (legfeljebb 30 mA-t bír). Tegyél vele sorba ellenállást, majd cseréld ki!']);
      });
      if (r.short) {
        var mx = 0; st.comps.forEach(function (c, i) { if (c.t === 'bat') mx = Math.max(mx, Math.abs(r.I[i])); });
        msgs.push(['bad', '🔥 <b>Rövidzár!</b> A telep pólusait szinte ellenállás nélkül kötötted össze: ' + fI(mx) + ' folyik, a vezetékek és a telep forrósodnak. A valóságban ez égési sérülést, tüzet, akkumulátornál robbanást is okozhat!']);
      }
      st.comps.forEach(function (c, i) {
        if (c.t === 'lamp' && r.U[i] * r.U[i] / 36 > 1.44) msgs.push(['warn', '💡 Az izzó a névleges 6 V-nál jóval nagyobb feszültséget kap (' + fU(Math.abs(r.U[i])) + ') – a valóságban hamar kiégne.']);
        if (c.t === 'led' && !c.dead && r.U[i] < -0.5) msgs.push(['info', '🔴 Az egyik LED fordítva van bekötve, ezért nem vezet (zárási irány). Jelöld ki, és nyomd meg a „Megfordítás” gombot.']);
        if (c.t === 'amm' && Math.abs(r.I[i]) > K.SHORT_I) msgs.push(['warn', 'Ⓐ Az ampermérőn óriási áram folyik – valószínűleg párhuzamosan kötötted. Az ampermérőt mindig sorosan kell bekötni!']);
      });
      statusBox.innerHTML = msgs.map(function (m) { return '<p class="ak-msg ak-' + m[0] + '">' + m[1] + '</p>'; }).join('');
    }

    /* ---- kijelölt elem ---- */
    function ctrlFor(c) {
      if (c.t === 'bat') return slider('Feszültség', 3, 24, 1, c.v * 2, fmt(c.v, 1) + ' V');
      if (c.t === 'res') return slider('Ellenállás', 0, E12.length - 1, 1, Math.max(0, E12.indexOf(c.v)), fR(c.v));
      if (c.t === 'lamp') return slider('Az izzó ellenállása (6 V-os izzó)', 5, 100, 1, c.v, fR(c.v));
      if (c.t === 'fuse') return slider('Névleges áram', 0, FUSES.length - 1, 1, Math.max(0, FUSES.indexOf(c.v)), fmt(c.v, 2) + ' A');
      return '';
    }
    function slider(label, min, max, step, val, shown) {
      return '<label class="ak-rng"><span class="lv"><span>' + esc(label) + '</span><b data-akv>' + esc(shown) + '</b></span><input type="range" data-akr min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>';
    }
    function paintSel() {
      if (selIdx < 0 || !st.comps[selIdx]) {
        selIdx = -1;
        if (selNode) { selBox.innerHTML = '<div class="ak-card"><b>Csomópont (' + esc(selNode.replace(',', '; ')) + ')</b><div class="ak-read" data-akread></div></div>'; paintSelReadings(); }
        else selBox.innerHTML = '';
        return;
      }
      var c = st.comps[selIdx];
      selBox.innerHTML = '<div class="ak-card"><div class="ak-selh">' + iconSvg(c.t) + '<b>' + esc(TYPES[c.t].name) + '</b></div>' + ctrlFor(c) +
        '<div class="ak-read" data-akread></div><div class="ak-btns">' +
        (c.t === 'sw' ? '<button type="button" class="btn" data-sa="toggle">' + (c.on ? '⏻ Kikapcsolás' : '⏻ Bekapcsolás') + '</button>' : '') +
        (POLAR[c.t] ? '<button type="button" class="btn" data-sa="flip">⇄ Megfordítás</button>' : '') +
        (c.dead ? '<button type="button" class="btn primary" data-sa="fix">🔧 Csere</button>' : '') +
        '<button type="button" class="btn" data-sa="del">🗑️ Törlés</button></div></div>';
      var rg = selBox.querySelector('[data-akr]');
      if (rg) {
        var before = null;
        rg.addEventListener('pointerdown', function () { before = clone(st.comps); });
        rg.addEventListener('input', function () {
          if (!before) before = clone(st.comps);
          var v = +rg.value, cc = st.comps[selIdx];
          if (cc.t === 'bat') cc.v = v / 2; else if (cc.t === 'res') cc.v = E12[v]; else if (cc.t === 'lamp') cc.v = v; else if (cc.t === 'fuse') cc.v = FUSES[v];
          selBox.querySelector('[data-akv]').textContent = cc.t === 'bat' ? fmt(cc.v, 1) + ' V' : cc.t === 'fuse' ? fmt(cc.v, 2) + ' A' : fR(cc.v);
          changed();
        });
        rg.addEventListener('change', function () { if (before) { undo.push(before); before = null; } });
      }
      paintSelReadings();
    }
    selBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-sa]'); if (!b || selIdx < 0) return;
      var c = st.comps[selIdx], a = b.dataset.sa;
      pushUndo();
      if (a === 'toggle') c.on = !c.on;
      if (a === 'flip') { var tx = c.x1, ty = c.y1; c.x1 = c.x2; c.y1 = c.y2; c.x2 = tx; c.y2 = ty; }
      if (a === 'fix') c.dead = false;
      if (a === 'del') { st.comps.splice(selIdx, 1); selIdx = -1; }
      changed(); paintSel();
    });
    function row(k, v) { return '<div><small>' + esc(k) + '</small><b>' + v + '</b></div>'; }
    function paintSelReadings() {
      var box = selBox.querySelector('[data-akread]'); if (!box) return;
      var r = st.res;
      if (selIdx < 0) {
        if (selNode) box.innerHTML = r.V[selNode] == null ? '<p class="muted">Ehhez a ponthoz nem csatlakozik semmi.</p>' :
          '<div class="w-res">' + row('Potenciál', esc(fU(r.V[selNode]))) + '</div><p class="muted ak-note">A telep − pólusához (0 V) viszonyítva. Két pont feszültsége a potenciáljaik különbsége.</p>';
        return;
      }
      var c = st.comps[selIdx], i = selIdx, I = r.I[i], U = r.U[i], P = r.P[i], h = '';
      if (c.t === 'bat') h = row('Forrásfeszültség', fU(c.v)) + row('Kapocsfeszültség', fU(-U)) + row('Áram', fI(Math.abs(I))) + row('Leadott teljesítmény', fP(P));
      else if (c.t === 'amm') h = row('Mért áram', fI(-I)) + row('Saját ellenállás', '≈ 0 Ω');
      else if (c.t === 'volt') h = row('Mért feszültség', fU(-U)) + row('Saját ellenállás', '10 MΩ');
      else if (c.t === 'wire') h = row('Áram', fI(Math.abs(I)));
      else if (c.t === 'sw') h = row('Állapot', c.on ? 'zárva (BE)' : 'nyitva (KI)') + row('Áram', fI(Math.abs(I))) + row('Feszültség rajta', fU(Math.abs(U)));
      else if (c.t === 'fuse') h = row('Állapot', c.dead ? 'kiolvadt 💥' : 'ép') + row('Áram', fI(Math.abs(I))) + row('Névleges', fmt(c.v, 2) + ' A');
      else if (c.t === 'led') h = row('Állapot', c.dead ? 'kiégett 💥' : I > 1e-4 ? 'világít' : U < -0.5 ? 'fordítva, nem vezet' : 'nem vezet') + row('Feszültség', fU(U)) + row('Áram', fI(Math.max(0, I))) + row('Teljesítmény', fP(Math.max(0, P)));
      else {
        h = row('Feszültség', fU(Math.abs(U))) + row('Áram', fI(Math.abs(I))) + row('Teljesítmény', fP(Math.abs(P)));
        if (c.t === 'lamp') h += row('Fényerő', fmt(Math.min(999, U * U / 36 * 100), 0) + '%');
      }
      box.innerHTML = '<div class="w-res">' + h + '</div>';
    }

    /* ---- műszerek összesítője ---- */
    function paintMeters() {
      var r = st.res, n = { amm: 0, volt: 0 }, items = [];
      st.comps.forEach(function (c, i) {
        if (c.t === 'amm') items.push(['Ⓐ Ampermérő ' + (++n.amm), fI(-r.I[i])]);
        if (c.t === 'volt') items.push(['Ⓥ Feszültségmérő ' + (++n.volt), fU(-r.U[i])]);
      });
      var tot = 0, nb = 0; st.comps.forEach(function (c, i) { if (c.t === 'bat') { tot += r.P[i]; nb++; } });
      if (nb) items.push(['🔋 Telep(ek) leadott teljesítménye', fP(tot)]);
      metBox.innerHTML = items.length ? '<div class="w-res">' + items.map(function (x) { return row(x[0], esc(x[1])); }).join('') + '</div>' : '';
    }

    /* ---- feladatpanel ---- */
    function paintChallenge() {
      el.querySelectorAll('[data-mode]').forEach(function (b) { b.classList.toggle('on', b.dataset.mode === mode); });
      el.querySelector('.ak-reset').hidden = mode !== 'ch';
      if (mode !== 'ch') { chBox.innerHTML = ''; if (!saveBox.innerHTML) paintSaves(); return; }
      saveBox.innerHTML = '';
      var ch = chById(chId), done = S.store.get('aramkor.done', {}), res = ch.check(st, mem);
      S.store.set('aramkor.mem', (function () { var m = S.store.get('aramkor.mem', {}); m[chId] = mem; return m; })());
      if (res.ok && !done[chId]) { done[chId] = true; S.store.set('aramkor.done', done); }
      var nextI = CH.indexOf(ch) + 1;
      chBox.innerHTML = '<div class="ak-chips">' + CH.map(function (c, i) {
        return '<button type="button" class="ak-chip' + (c.id === chId ? ' on' : '') + (done[c.id] ? ' done' : '') + '" data-ch="' + c.id + '" title="' + esc(c.title) + '">' + (done[c.id] ? '✓' : (i + 1)) + '. ' + c.ico + '</button>';
      }).join('') + '</div>' +
        '<div class="ak-goal' + (res.ok ? ' ok' : '') + '"><b>' + (CH.indexOf(ch) + 1) + '. ' + esc(ch.title) + '</b><p>' + S.inline(ch.goal) + '</p>' +
        (res.msg && !res.ok ? '<p class="ak-prog">' + esc(res.msg) + '</p>' : '') +
        (res.ok ? '<p class="ak-win">🎉 <b>Siker!</b> ' + esc(res.msg || '') + '</p>' + (nextI < CH.length ? '<button type="button" class="btn primary" data-ch="' + CH[nextI].id + '">Következő feladat →</button>' : '<p>Minden feladatot megoldottál! Próbáld ki a <b>Szabad építés</b> módot.</p>') : '') +
        '<button type="button" class="btn ak-hintb" data-hint>' + (hintOn ? '🙈 Tipp elrejtése' : '💡 Tipp') + '</button>' +
        (hintOn ? '<p class="ak-hint">' + S.inline(ch.hint) + '</p>' : '') + '</div>';
    }
    chBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ch],[data-hint]'); if (!b) return;
      if (b.hasAttribute('data-hint')) { hintOn = !hintOn; paintChallenge(); return; }
      chId = b.dataset.ch; S.store.set('aramkor.chId', chId); hintOn = false; lastEvents = [];
      loadState(); paintSel(); run();
    });
    el.querySelector('.ak-modes').addEventListener('click', function (e) {
      var b = e.target.closest('[data-mode]'); if (!b || b.dataset.mode === mode) return;
      mode = b.dataset.mode; S.store.set('aramkor.mode', mode); lastEvents = [];
      loadState(); paintSel(); run();
    });

    /* ---- mentések (szabad mód) ---- */
    function paintSaves() {
      var sv = S.store.get('aramkor.saves', []);
      saveBox.innerHTML = '<div class="ak-card"><b>💾 Mentett áramköreim</b><div class="ak-saveform"><input type="text" maxlength="40" placeholder="Az áramkör neve" aria-label="Az áramkör neve"><button type="button" class="btn" data-sv="save">Mentés</button></div>' +
        (sv.length ? '<ul class="ak-list">' + sv.map(function (s, i) {
          return '<li><span>' + esc(s.n) + ' <small class="muted">(' + s.c.length + ' alkatrész)</small></span><span><button type="button" class="btn" data-sv="load" data-i="' + i + '">Betöltés</button> <button type="button" class="btn" data-sv="rm" data-i="' + i + '" aria-label="Törlés">✕</button></span></li>';
        }).join('') + '</ul>' : '<p class="muted ak-note">Még nincs mentett áramköröd. A tábla aktuális állapotát a böngésző magától is megjegyzi.</p>') + '</div>';
    }
    saveBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-sv]'); if (!b) return;
      var sv = S.store.get('aramkor.saves', []), i = +b.dataset.i;
      if (b.dataset.sv === 'save') {
        var inp = saveBox.querySelector('input'), name = inp.value.trim() || ('Áramkör ' + (sv.length + 1));
        sv.unshift({ n: name, c: clone(st.comps), d: Date.now() }); if (sv.length > 30) sv.length = 30;
      } else if (b.dataset.sv === 'load' && sv[i]) { pushUndo(); st.comps = clone(sv[i].c); selIdx = -1; selNode = null; paintSel(); lastEvents = []; persist(); run(); }
      else if (b.dataset.sv === 'rm') sv.splice(i, 1);
      S.store.set('aramkor.saves', sv); paintSaves();
    });

    el.querySelector('.ak-actions').addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      var a = b.dataset.act;
      if (a === 'undo') { if (!undo.length) return; st.comps = undo.pop(); }
      else if (a === 'fix') { pushUndo(); st.comps.forEach(function (c) { c.dead = false; }); }
      else if (a === 'clear') { pushUndo(); st.comps = []; }
      else if (a === 'reset') { pushUndo(); st.comps = chById(chId).setup(); mem = {}; }
      selIdx = -1; selNode = null; paintSel(); changed();
    });

    loadState(); paintPalette(); run();
  });

  /* ---------- önálló oldal ---------- */
  S.addRoute('aramkor', {
    title: 'Áramkör-labor', nav: '',
    page: function (main, rest) {
      var o = {}; if (rest && rest[0] === 'szabad') o.mode = 'free'; else if (rest && chById(rest[0])) o.challenge = rest[0];
      main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Áramkör-labor</span></nav>' +
        '<h1>⚡ Virtuális áramkör-labor</h1><p class="lead">Építs áramköröket telepből, izzóból, LED-ből, ellenállásból, kapcsolóból és biztosítékból, és mérj ampermérővel, feszültségmérővel! A program minden változtatás után kiszámolja az áramokat és a feszültségeket – úgy, ahogy a mérnöki áramkör-szimulátorok.</p>' +
        '<div class="widget card" id="ak-host"></div>' +
        '<details class="card ak-how"><summary>🧮 Hogyan számol a labor?</summary>' + S.md(
          'A szimulátor a **csomóponti potenciálok módszerét** (módosított csomóponti analízis, MNA) használja. Minden csomópontra felírja **Kirchhoff csomóponti törvényét** (a befolyó és kifolyó áramok összege nulla), az alkatrészekre pedig **Ohm törvényét** (`I = U / R`). Így egy lineáris egyenletrendszer jön létre, amit **Gauss-eliminációval** old meg.\n\n' +
          '- A telep: forrásfeszültség és 0,2 Ω belső ellenállás – ezért rövidzárnál nem végtelen, hanem „csak” több tíz amper az áram.\n' +
          '- Vezeték, zárt kapcsoló és ampermérő: 0,001 Ω; a feszültségmérő: 10 MΩ (szinte nem vesz fel áramot).\n' +
          '- A LED egyszerűsített modell: kb. 2 V felett kezd vezetni, 30 mA felett kiég. Mivel a LED nem lineáris, a program addig számol újra, amíg minden LED állapota (vezet / nem vezet) ellentmondásmentes.\n' +
          '- Az izzó 6 V-os, ellenállása állandó (a valóságban a hideg izzószál ellenállása kisebb). A fényereje a teljesítményével arányos: `P = U · I = U² / R`.\n' +
          '- A biztosíték itt azonnal kiolvad, ha a névleges áramánál több folyik rajta; a valódi biztosíték a túláram nagyságától függően némi idő alatt old ki.\n\n' +
          'Ez a labor csak **törpefeszültségű**, elemes áramköröket szimulál. A hálózati 230 V életveszélyes!') + '</details>';
      S.widgets['aramkor-labor'](main.querySelector('#ak-host'), o);
      return true;
    }
  });

  S.aramkor = { solve: solve, simulate: simulate, K: K, challenges: CH };
})();
