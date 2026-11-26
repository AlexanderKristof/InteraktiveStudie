/* Tudásműhely – Lépésenkénti feladatmegoldó.
 * Véletlen, de „szép” számokkal készülő feladatok matekból, fizikából, kémiából és pénzügyből:
 * feladatszöveg, helyes válasz (tűréssel, mértékegységgel), 2–3 fokozatos tipp és
 * lépésről lépésre felfedhető teljes megoldás.
 *   Oldal:   #/feladatok  ·  #/feladatok/<tipus>?szint=0|1|2&seed=123
 *   Widget:  widget: { type: 'lepesek', options: { tipus: 'masodfoku', szint: 1 } }
 * Tárolás: 'lepesek' → { pont, sorozat, legjobb, jo, ossz, tipusok: { id: { jo, ossz } } },  'lepesek.szint' → 0|1|2 */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  /* ================= segédfüggvények ================= */
  function mkRng(seed) {
    var a = (seed >>> 0) || 1;
    function f() {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    var R = {
      f: f,
      int: function (lo, hi) { return lo + Math.floor(f() * (hi - lo + 1)); },
      nz: function (lo, hi) { var v; do { v = R.int(lo, hi); } while (v === 0); return v; },
      pick: function (arr) { return arr[Math.floor(f() * arr.length)]; }
    };
    return R;
  }
  function round(x, dp) { var p = Math.pow(10, dp); return Math.round(x * p) / p; }
  /* Magyar számírás: tizedesvessző, 5 jegytől ezres tagolás, valódi mínuszjel. */
  function nf(x, dp) {
    if (dp == null) dp = 4;
    if (!isFinite(x)) return '∞';
    var r = round(x, dp);
    if (r === 0) r = 0;
    var neg = r < 0, s = Math.abs(r).toFixed(dp);
    if (dp > 0) s = s.replace(/\.?0+$/, '');
    var parts = s.split('.'), ip = parts[0];
    if (ip.length > 4) ip = ip.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (neg ? '−' : '') + ip + (parts[1] ? ',' + parts[1] : '');
  }
  function par(x, dp) { return x < 0 ? '(' + nf(x, dp) + ')' : nf(x, dp); }
  function pm(x, dp) { return x === 0 ? '' : (x < 0 ? ' − ' : ' + ') + nf(Math.abs(x), dp); }
  function C(s) { return '`' + s + '`'; }
  var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '−': '⁻', '+': '⁺' };
  function sup(n) { return String(n).split('').map(function (c) { return SUP[c] || c; }).join(''); }
  function chem(f) { return f.replace(/\d/g, function (d) { return '₀₁₂₃₄₅₆₇₈₉'.charAt(+d); }); }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }
  /* Többtagú kifejezés: lin([[3,'x'],[-5,'']]) → „3x − 5” */
  function lin(terms) {
    var s = '', first = true;
    terms.forEach(function (t) {
      var c = t[0], v = t[1];
      if (c === 0) return;
      var a = Math.abs(c), body = v ? (a === 1 ? v : nf(a) + v) : nf(a);
      s += (c < 0 ? (first ? '−' : ' − ') : (first ? '' : ' + ')) + body;
      first = false;
    });
    return s || '0';
  }
  function frs(n, d) { if (d < 0) { n = -n; d = -d; } return d === 1 ? nf(n) : (n < 0 ? '−' : '') + Math.abs(n) + '/' + d; }
  /* normálalak: { m, k } és szöveg */
  function sciParts(v) {
    if (v === 0) return { m: 0, k: 0 };
    var k = Math.floor(Math.log(Math.abs(v)) / Math.LN10 + 1e-12), m = round(v / Math.pow(10, k), 6);
    if (Math.abs(m) >= 10) { m = round(m / 10, 6); k++; }
    if (Math.abs(m) < 1) { m = round(m * 10, 6); k--; }
    return { m: m, k: k };
  }
  function sci(v, dp) { var p = sciParts(v); return nf(p.m, dp == null ? 4 : dp) + '·10' + sup(p.k); }
  /* válasz-leíró */
  function A(label, v, unit, o) {
    o = o || {};
    var dp = o.dp == null ? 2 : o.dp;
    return { label: label, v: v, unit: unit || '', dp: dp, kind: o.kind || 'num', rel: o.rel || 0, tol: o.tol,
      show: o.show || (o.kind === 'sci' ? sci(v, 4) : nf(v, dp)) };
  }

  /* ================= feladattípusok ================= */
  var GROUPS = [['mat', '📐 Matematika'], ['fiz', '⚡ Fizika'], ['kem', '⚗️ Kémia'], ['penz', '💰 Pénzügy']];
  var LEVELS = ['Könnyű', 'Közepes', 'Nehéz'];
  var TYPES = {}, ORDER = [];
  function add(id, group, icon, title, desc, gen) { TYPES[id] = { id: id, group: group, icon: icon, title: title, desc: desc, gen: gen }; ORDER.push(id); }

  /* ---------- 1. Lineáris egyenlet ---------- */
  add('linearis', 'mat', '⚖️', 'Lineáris egyenlet', 'Egyismeretlenes elsőfokú egyenletek rendezése', function (R, L) {
    var x, a, b, c, d, k, e, p = 0, eq, steps = [], hints;
    if (L === 0) {
      x = R.int(1, 12); a = R.int(2, 9); b = R.nz(-20, 20); c = 0; d = a * x + b; k = a; e = d - b;
      eq = lin([[a, 'x'], [b, '']]) + ' = ' + nf(d);
      steps.push((b > 0 ? 'Mindkét oldalból kivonjuk a konstans tagot (' + C(nf(b)) + ')' : 'Mindkét oldalhoz hozzáadjuk a konstans tag ellentettjét (' + C('+' + nf(-b)) + ')') +
        ', így bal oldalon csak az x-es tag marad: ' + C(nf(a) + 'x = ' + nf(d) + pm(-b) + ' = ' + nf(e)));
      steps.push('Mindkét oldalt elosztjuk x együtthatójával: ' + C('x = ' + nf(e) + ' : ' + nf(a) + ' = ' + nf(x)));
      steps.push('Ellenőrzés: ' + C(nf(a) + ' · ' + par(x) + pm(b) + ' = ' + nf(d)) + ' ✔ – tehát ' + C('x = ' + nf(x)) + '.');
      hints = ['Az a cél, hogy x egyedül maradjon. Amit az egyenlet egyik oldalával teszel, tedd meg a másikkal is!',
        'Először a konstans tagtól szabadulj meg a bal oldalon: ' + C(nf(a) + 'x = ' + nf(e)) + '.',
        'Most oszd el mindkét oldalt ennyivel: ' + C(nf(a)) + '.'];
    } else {
      x = R.nz(-12, 12);
      do {
        a = L === 1 ? R.int(2, 12) : R.nz(-9, 9);
        c = L === 1 ? R.int(1, 12) : R.nz(-9, 9);
      } while (a === c || Math.abs(a) < 2 || Math.abs(a - c) === 0);
      if (L === 2) { p = R.nz(-9, 9); b = a * p; } else b = R.nz(-20, 20);
      k = a - c; d = k * x + b; e = d - b;
      eq = (L === 2 ? nf(a) + '(' + lin([[1, 'x'], [p, '']]) + ')' : lin([[a, 'x'], [b, '']])) + ' = ' + lin([[c, 'x'], [d, '']]);
      if (L === 2) steps.push('Bontsuk fel a zárójelet (a szorzót minden tagra alkalmazzuk): ' + C(nf(a) + ' · x + ' + par(a) + ' · ' + par(p) + ' = ' + lin([[a, 'x'], [b, '']])) + ', így az egyenlet: ' + C(lin([[a, 'x'], [b, '']]) + ' = ' + lin([[c, 'x'], [d, '']])));
      steps.push('Gyűjtsük az x-es tagokat a bal oldalra – mindkét oldalhoz hozzáadjuk ezt: ' + C(lin([[-c, 'x']])) + '. Ekkor ' + C(lin([[a, 'x'], [-c, 'x']]) + ' = ' + lin([[k, 'x']])) + ', vagyis ' + C(lin([[k, 'x'], [b, '']]) + ' = ' + nf(d)));
      steps.push('A konstans tagot vigyük át a jobb oldalra (előjelet vált): ' + C(lin([[k, 'x']]) + ' = ' + nf(d) + pm(-b) + ' = ' + nf(e)));
      if (k !== 1) steps.push('Osszuk el mindkét oldalt x együtthatójával: ' + C('x = ' + nf(e) + ' : ' + par(k) + ' = ' + nf(x)));
      steps.push('Ellenőrzés: bal oldal ' + C(L === 2 ? nf(a) + ' · (' + nf(x) + pm(p) + ') = ' + nf(a * x + b) : nf(a) + ' · ' + par(x) + pm(b) + ' = ' + nf(a * x + b)) +
        ', jobb oldal ' + C(nf(c) + ' · ' + par(x) + pm(d) + ' = ' + nf(c * x + d)) + ' ✔ – tehát ' + C('x = ' + nf(x)) + '.');
      hints = ['Rendezd az egyenletet: az x-es tagok kerüljenek az egyik, a számok a másik oldalra!' + (L === 2 ? ' Előbb bontsd fel a zárójelet.' : ''),
        'Az x-es tagok összevonása után: ' + C(lin([[k, 'x'], [b, '']]) + ' = ' + nf(d)) + '.',
        'Már csak ennyi maradt: ' + C(lin([[k, 'x']]) + ' = ' + nf(e)) + '. Oszd el mindkét oldalt x együtthatójával!'];
    }
    return { text: 'Oldd meg az egyenletet a valós számok halmazán: ' + C(eq), answers: [A('x', x, '', { dp: 2 })], hints: hints, steps: steps,
      data: { L: L, a: a, b: b, c: c, d: d, p: p } };
  });

  /* ---------- 2. Egyenletrendszer ---------- */
  add('egyenletrendszer', 'mat', '🔀', 'Egyenletrendszer (2×2)', 'Két egyenlet, két ismeretlen – az egyenlő együtthatók módszerével', function (R, L) {
    var lo = [1, -9, -12][L], hi = [9, 9, 12][L], cm = [5, 6, 9][L];
    var x, y, a1, b1, a2, b2, det;
    function co() { return L === 0 ? R.int(1, cm) : R.nz(-cm, cm); }
    do { x = R.int(lo, hi); y = R.int(lo, hi); a1 = co(); b1 = co(); a2 = co(); b2 = co(); det = a1 * b2 - a2 * b1; } while (det === 0);
    var c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y, g = gcd(a1, a2), m1 = a2 / g, m2 = a1 / g;
    var k = b1 * m1 - b2 * m2, rhs = c1 * m1 - c2 * m2;
    function eqs(a, b, c) { return lin([[a, 'x'], [b, 'y']]) + ' = ' + nf(c); }
    var steps = [];
    if (m1 === 1 && m2 === 1) steps.push('Az x együtthatója mindkét egyenletben ugyanannyi (' + C(nf(a1)) + '), így ha kivonjuk egymásból őket, x kiesik.');
    else steps.push('Tegyük egyenlővé x együtthatóját: az I. egyenletet szorozzuk ' + C(nf(m1)) + ' értékkel, a II.-at ' + C(nf(m2)) + ' értékkel:\n' +
      C('I.  ' + eqs(a1 * m1, b1 * m1, c1 * m1)) + '\n' + C('II. ' + eqs(a2 * m2, b2 * m2, c2 * m2)));
    steps.push('Vonjuk ki a II. egyenletet az I.-ből – x kiesik: ' + C(lin([[k, 'y']]) + ' = ' + nf(rhs)));
    steps.push('Osszuk el y együtthatójával: ' + C('y = ' + nf(rhs) + ' : ' + par(k) + ' = ' + nf(y)));
    steps.push('Helyettesítsük be y értékét az I. egyenletbe: ' + C(lin([[a1, 'x']]) + ' + ' + par(b1) + ' · ' + par(y) + ' = ' + nf(c1)) + ', azaz ' +
      C(lin([[a1, 'x']]) + ' = ' + nf(c1) + (b1 * y ? pm(-b1 * y) + ' = ' + nf(a1 * x) : '')) + ', így ' + C('x = ' + nf(a1 * x) + ' : ' + par(a1) + ' = ' + nf(x)));
    steps.push('Ellenőrzés a II. egyenletben: ' + C(nf(a2) + ' · ' + par(x) + ' + ' + par(b2) + ' · ' + par(y) + ' = ' + nf(c2)) + ' ✔ – a megoldás: ' + C('x = ' + nf(x) + ', y = ' + nf(y)) + '.');
    return {
      text: 'Oldd meg az egyenletrendszert!\n' + C('I.  ' + eqs(a1, b1, c1)) + '\n' + C('II. ' + eqs(a2, b2, c2)),
      answers: [A('x', x, '', { dp: 2 }), A('y', y, '', { dp: 2 })],
      hints: ['Próbáld úgy alakítani az egyenleteket, hogy az egyik ismeretlen együtthatója mindkettőben ugyanannyi legyen – akkor kivonással kiesik.',
        'Ha kivonod az egyenleteket egymásból (szükség esetén szorzás után), ezt kapod: ' + C(lin([[k, 'y']]) + ' = ' + nf(rhs)) + '.',
        'y = ' + nf(y) + '. Ezt helyettesítsd vissza az I. egyenletbe, és fejezd ki x-et!'],
      steps: steps, data: { a1: a1, b1: b1, c1: c1, a2: a2, b2: b2, c2: c2 }
    };
  });

  /* ---------- 3. Másodfokú egyenlet ---------- */
  add('masodfoku', 'mat', '📈', 'Másodfokú egyenlet', 'Megoldóképlet és diszkrimináns', function (R, L) {
    var a, r1, r2, rr = [9, 10, 12][L];
    a = L === 0 ? 1 : L === 1 ? R.pick([1, 1, 2, 3, -1]) : R.nz(-5, 5);
    do { r1 = R.int(-rr, rr); r2 = R.int(-rr, rr); } while ((r1 === r2 && (L < 2 || R.f() < 0.8)) || (r1 === 0 && r2 === 0));
    var b = -a * (r1 + r2), c = a * r1 * r2, D = b * b - 4 * a * c, sq = Math.round(Math.sqrt(D));
    var x1 = (-b + sq) / (2 * a), x2 = (-b - sq) / (2 * a);
    var eq = lin([[a, 'x²'], [b, 'x'], [c, '']]) + ' = 0';
    var steps = [
      'Olvassuk le az együtthatókat (' + C('ax² + bx + c = 0') + ' alak): ' + C('a = ' + nf(a) + ', b = ' + nf(b) + ', c = ' + nf(c)),
      'Diszkrimináns: ' + C('D = b² − 4ac = ' + par(b) + '² − 4 · ' + par(a) + ' · ' + par(c) + ' = ' + nf(b * b) + pm(-4 * a * c) + ' = ' + nf(D)),
      D > 0 ? 'Mivel ' + C('D > 0') + ', két különböző valós gyök van. ' + C('√D = √' + nf(D) + ' = ' + nf(sq))
        : 'Mivel ' + C('D = 0') + ', egyetlen (kétszeres) valós gyök van: ' + C('√D = 0'),
      'Megoldóképlet: ' + C('x = (−b ± √D) / (2a)') + '\n' + C('x₁ = (' + nf(-b) + ' + ' + nf(sq) + ') / ' + par(2 * a) + ' = ' + nf(-b + sq) + ' / ' + par(2 * a) + ' = ' + nf(x1)),
      C('x₂ = (' + nf(-b) + ' − ' + nf(sq) + ') / ' + par(2 * a) + ' = ' + nf(-b - sq) + ' / ' + par(2 * a) + ' = ' + nf(x2)),
      'Ellenőrzés (Viète-formulák): ' + C('x₁ + x₂ = ' + nf(x1 + x2) + ' = −b/a') + ' és ' + C('x₁ · x₂ = ' + nf(x1 * x2) + ' = c/a') + ' ✔ A gyökök: ' + C(nf(x1)) + ' és ' + C(nf(x2)) + '.'
    ];
    return {
      text: 'Oldd meg a másodfokú egyenletet! ' + C(eq) + (D === 0 ? '' : '') + '\n(A két gyököt tetszőleges sorrendben beírhatod; kétszeres gyöknél mindkét mezőbe ugyanaz kerül.)',
      answers: [A('x₁', x1, ''), A('x₂', x2, '')], unordered: true,
      hints: ['Használd a megoldóképletet: ' + C('x = (−b ± √D) / (2a)') + ', ahol ' + C('D = b² − 4ac') + '.',
        'Az együtthatók: ' + C('a = ' + nf(a) + ', b = ' + nf(b) + ', c = ' + nf(c)) + '. Számold ki előbb a diszkriminánst!',
        C('D = ' + nf(D)) + ', ' + C('√D = ' + nf(sq)) + '. Most már csak be kell helyettesíteni (egyszer +, egyszer − előjellel).'],
      steps: steps, data: { a: a, b: b, c: c }
    };
  });

  /* ---------- 4. Százalékszámítás ---------- */
  add('szazalek', 'mat', '％', 'Százalékszámítás', 'Alap, százalékérték, százalékláb', function (R, L) {
    var labs = [[10, 20, 25, 50, 5, 75], [5, 8, 12, 15, 30, 35, 40, 60], [2.5, 7, 13, 17.5, 22, 37, 115, 140]][L];
    var ctxs = [
      { u: 'Ft', ertek: 'Egy {A} Ft-os pulóver árából {P}% kedvezményt adnak. Hány forint a kedvezmény?', alap: 'Egy pulóver árából {P}% kedvezményt adnak, ez {E} Ft. Mennyi volt a pulóver eredeti ára?', lab: 'Egy {A} Ft-os pulóver árából {E} Ft kedvezményt adnak. Hány százalékos a kedvezmény?' },
      { u: 'g', ertek: 'Egy {A} g-os müzliszelet {P}%-a cukor. Hány gramm cukor van benne?', alap: 'Egy müzliszeletben {E} g cukor van, ez a szelet tömegének {P}%-a. Hány grammos a szelet?', lab: 'Egy {A} g-os müzliszeletben {E} g cukor van. A szelet hány százaléka cukor?' },
      { u: 'fő', int: true, ertek: 'Egy {A} fős iskola diákjainak {P}%-a jár szakkörre. Hányan járnak szakkörre?', alap: 'Egy iskolában {E} diák jár szakkörre, ez az összes diák {P}%-a. Hány diákja van az iskolának?', lab: 'Egy {A} fős iskolában {E} diák jár szakkörre. A diákok hány százaléka ez?' },
      { u: 'km', ertek: 'Egy {A} km-es túrának már {P}%-át megtettük. Hány km-t tettünk meg?', alap: 'Egy túrán {E} km-t tettünk meg, ez a teljes táv {P}%-a. Milyen hosszú a túra?', lab: 'Egy {A} km-es túrából {E} km-t tettünk meg. A táv hány százaléka ez?' }
    ];
    var ctx = R.pick(ctxs), P, Al, E, mode = R.pick(['ertek', 'alap', 'lab']);
    do {
      P = R.pick(labs);
      Al = ctx.u === 'km' ? R.int(2, L === 0 ? 20 : 80) * 5 : L === 0 ? R.int(1, 20) * 20 : L === 1 ? R.int(2, 100) * 50 : R.int(40, 800) * 5;
      E = round(Al * P / 100, 6);
    } while (Math.abs(E * 100 - Math.round(E * 100)) > 1e-9 || (ctx.int && E !== Math.round(E)) || E === 0 || (P > 100 && ctx.u !== 'Ft'));
    var text = ctx[mode].replace('{A}', nf(Al)).replace('{P}', nf(P)).replace('{E}', nf(E)), steps, ans, hints;
    var kn = [];
    if (mode !== 'alap') kn.push('alap (100%) = ' + nf(Al) + ' ' + ctx.u);
    if (mode !== 'lab') kn.push('százalékláb = ' + nf(P) + '%');
    if (mode !== 'ertek') kn.push('százalékérték = ' + nf(E) + ' ' + ctx.u);
    var known = 'Ismert: ' + kn.join(', ') + '.';
    if (mode === 'ertek') {
      ans = A('érték', E, ctx.u);
      steps = [known + ' Keressük a százalékértéket (a rész nagyságát).', 'Képlet: ' + C('érték = alap · láb / 100'),
        'Először 1%: ' + C(nf(Al) + ' / 100 = ' + nf(Al / 100)) + ', majd ' + nf(P) + '%: ' + C(nf(Al / 100) + ' · ' + nf(P) + ' = ' + nf(E) + ' ' + ctx.u)];
      hints = ['Melyik a 100% (az alap), és hány százalékát keressük?', 'Számold ki, mennyi az alap 1%-a (oszd el 100-zal)!', '1% = ' + nf(Al / 100) + ' ' + ctx.u + '. Ezt szorozd meg ennyivel: ' + nf(P) + '.'];
    } else if (mode === 'alap') {
      ans = A('alap', Al, ctx.u);
      steps = [known + ' Keressük az alapot (a 100%-ot).', 'Képlet: ' + C('alap = érték · 100 / láb'),
        'Ha ' + nf(P) + '% = ' + nf(E) + ' ' + ctx.u + ', akkor 1%: ' + C(nf(E) + ' / ' + nf(P) + ' = ' + nf(E / P)) + ', és 100%: ' + C(nf(E / P) + ' · 100 = ' + nf(Al) + ' ' + ctx.u)];
      hints = ['Most a 100% az ismeretlen. Tudod, hogy ' + nf(P) + '% mennyi.', 'Számold ki az 1%-ot: oszd el a százalékértéket a százaléklábbal.', '1% = ' + nf(E / P) + ' ' + ctx.u + ' – a 100% ennek százszorosa.'];
    } else {
      ans = A('láb', P, '%');
      steps = [known + ' Keressük a százaléklábat: a rész hány százaléka az egésznek?', 'Képlet: ' + C('láb = érték / alap · 100'),
        C(nf(E) + ' / ' + nf(Al) + ' = ' + nf(E / Al, 6)) + ', és ezt 100-zal szorozva: ' + C(nf(E / Al, 6) + ' · 100 = ' + nf(P) + '%')];
      hints = ['Azt keressük, hányad része a rész az egésznek – ezt kell százalékban megadni.', 'Oszd el a részt az egésszel: ' + C(nf(E) + ' / ' + nf(Al)) + '.', 'A kapott tizedes törtet szorozd meg 100-zal.'];
    }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: { mode: mode, A: Al, P: P, E: E } };
  });

  /* ---------- 5. Törtek ---------- */
  add('tortek', 'mat', '🍕', 'Törtek összeadása, szorzása', 'Közös nevező, egyszerűsítés, reciprok', function (R, L) {
    var dh = [6, 12, 15][L], ops = [['+', '·'], ['+', '−', '·'], ['+', '−', '·', ':']][L], op = R.pick(ops);
    function fr() { var d = R.int(2, dh), n; do { n = R.int(1, L === 2 ? 2 * d - 1 : d - 1); } while (gcd(n, d) !== 1); return [n, d]; }
    var f1 = fr(), f2 = fr();
    if (op === '−' && f1[0] * f2[1] < f2[0] * f1[1]) { var t = f1; f1 = f2; f2 = t; }
    if (op === '−' && f1[0] * f2[1] === f2[0] * f1[1]) { op = '+'; }
    var a = f1[0], b = f1[1], c = f2[0], d = f2[1], n, m, steps = [], hints;
    var ex = C(a + '/' + b + ' ' + op + ' ' + c + '/' + d);
    if (op === '+' || op === '−') {
      var Lc = lcm(b, d), p = a * Lc / b, q = c * Lc / d; n = op === '+' ? p + q : p - q; m = Lc;
      if (b === d) steps.push('A nevezők azonosak (' + C(String(b)) + '), így nem kell bővíteni – ez lesz a közös nevező.');
      else {
        steps.push('Közös nevező kell: a nevezők legkisebb közös többszöröse ' + C('[' + b + '; ' + d + '] = ' + Lc));
        steps.push('Bővítsük a törteket: ' + C(a + '/' + b + ' = ' + p + '/' + Lc) + ' és ' + C(c + '/' + d + ' = ' + q + '/' + Lc));
      }
      steps.push((op === '+' ? 'Adjuk össze' : 'Vonjuk ki') + ' a számlálókat, a nevező marad: ' + C(p + '/' + Lc + ' ' + op + ' ' + q + '/' + Lc + ' = ' + n + '/' + Lc));
      hints = ['Összeadni/kivonni csak azonos nevezőjű törteket lehet. Keresd meg a közös nevezőt!', 'A legkisebb közös nevező: ' + C(String(Lc)) + '. Bővítsd mindkét törtet erre!', 'A bővített törtek: ' + C(p + '/' + Lc) + ' és ' + C(q + '/' + Lc) + '. Ne felejtsd el a végén egyszerűsíteni!'];
    } else {
      var a2 = a, b2 = b, c2 = c, d2 = d;
      if (op === ':') { steps.push('Törttel úgy osztunk, hogy a reciprokával szorzunk: ' + C(a + '/' + b + ' : ' + c + '/' + d + ' = ' + a + '/' + b + ' · ' + d + '/' + c)); c2 = d; d2 = c; }
      n = a2 * c2; m = b2 * d2;
      steps.push('Szorzásnál számlálót a számlálóval, nevezőt a nevezővel szorzunk: ' + C(a2 + '/' + b2 + ' · ' + c2 + '/' + d2 + ' = (' + a2 + ' · ' + c2 + ') / (' + b2 + ' · ' + d2 + ') = ' + n + '/' + m));
      hints = [op === ':' ? 'Osztás helyett szorozz a második tört reciprokával (fordítsd meg a második törtet)!' : 'Törtek szorzásánál nem kell közös nevező!',
        'Számláló · számláló, nevező · nevező: ' + C(n + '/' + m) + '.', 'Most egyszerűsítsd: keresd meg a számláló és a nevező legnagyobb közös osztóját!'];
    }
    var g = gcd(n, m), N = n / g, M = m / g;
    steps.push(g > 1 ? 'Egyszerűsítsünk ' + C(String(g)) + '-vel (a számláló és a nevező legnagyobb közös osztójával): ' + C(n + '/' + m + ' = ' + frs(N, M))
      : 'A tört már nem egyszerűsíthető (a számláló és a nevező relatív prímek): ' + C(frs(N, M)));
    if (M > 1 && N > M) steps.push('Vegyes számként: ' + C(frs(N, M) + ' = ' + Math.floor(N / M) + ' egész ' + (N % M) + '/' + M) + '. Az eredmény: ' + C(frs(N, M)) + '.');
    else steps[steps.length - 1] += ' – ez az eredmény.';
    return { text: 'Számold ki, és add meg a lehető legegyszerűbb alakban: ' + ex, answers: [A('eredmény', N / M, '', { kind: 'frac', show: frs(N, M), tol: 1e-9 })],
      hints: hints, steps: steps, data: { a: a, b: b, c: c, d: d, op: op, N: N, M: M } };
  });

  /* ---------- 6. Arányosság ---------- */
  add('aranyossag', 'mat', '⚖', 'Egyenes és fordított arányosság', 'Következtetés egységre, állandó szorzat', function (R, L) {
    var mode = L === 0 ? 'egyenes' : R.pick(['egyenes', 'forditott']), steps, hints, text, ans, data;
    if (mode === 'egyenes') {
      var ctx = R.pick([
        { t: '{q1} kg alma {p1} Ft. Mennyibe kerül {q2} kg ugyanilyen alma?', u: 'Ft', qu: 'kg', e: '1 kg ára', mk: function () { return R.int(L === 2 ? 25 : 10, 90) * 10; } },
        { t: 'Egy autó {q1} liter benzinnel {p1} km-t tesz meg. Hány km-t tesz meg {q2} liter benzinnel?', u: 'km', qu: 'liter', e: '1 literrel megtett út', mk: function () { return R.int(12, 22); } },
        { t: 'Egy palacsintareceptben {q1} főre {p1} g liszt kell. Mennyi liszt kell {q2} főre?', u: 'g', qu: 'fő', e: '1 főre jutó liszt', mk: function () { return R.int(4, 15) * 10; } }
      ]);
      var u = ctx.mk(), q1, q2;
      do {
        q1 = L === 2 && ctx.qu !== 'fő' ? R.int(3, 16) / 2 : R.int(2, L === 0 ? 6 : 12);
        q2 = L === 2 && ctx.qu !== 'fő' ? R.int(3, 24) / 2 : R.int(2, L === 0 ? 10 : 20);
      } while (q1 === q2);
      var p1 = u * q1, p2 = u * q2;
      text = ctx.t.replace('{q1}', nf(q1)).replace('{p1}', nf(p1)).replace('{q2}', nf(q2));
      ans = A('válasz', p2, ctx.u);
      steps = ['Egyenes arányosság: ahányszor több ' + ctx.qu + ', annyiszor több ' + ctx.u + '. A hányados állandó.',
        'Következtetés egységre – ' + ctx.e + ': ' + C(nf(p1) + ' : ' + nf(q1) + ' = ' + nf(u) + ' ' + ctx.u),
        nf(q2) + ' ' + ctx.qu + ' esetén: ' + C(nf(u) + ' · ' + nf(q2) + ' = ' + nf(p2) + ' ' + ctx.u)];
      hints = ['Ha kétszer annyi a mennyiség, kétszer annyi az eredmény is – ez egyenes arányosság.', 'Számold ki, mennyi jut 1 egységre (' + ctx.e + ')!', ctx.e + ' = ' + nf(u) + ' ' + ctx.u + '. Ezt szorozd meg ennyivel: ' + nf(q2) + '.'];
      data = { mode: mode, q1: q1, p1: p1, q2: q2 };
    } else {
      var ctx2 = R.pick([
        { t: '{w1} egyforma munkás {d1} nap alatt fest ki egy iskolát. Hány nap alatt végezne {w2} munkás ugyanilyen tempóban?', u: 'nap', wu: 'munkás', tot: 'munkásnap' },
        { t: 'Egy medencét {w1} egyforma szivattyú {d1} óra alatt tölt meg. Hány óra alatt töltené meg {w2} szivattyú?', u: 'óra', wu: 'szivattyú', tot: 'szivattyúóra' },
        { t: 'Egy tábor élelme {w1} gyereknek {d1} napra elég. Hány napra elég ugyanez {w2} gyereknek?', u: 'nap', wu: 'gyerek', tot: 'adag' }
      ]);
      var w1, d1, w2, T;
      do { w1 = R.int(2, L === 2 ? 30 : 12); d1 = R.int(2, 20); T = w1 * d1; w2 = R.int(2, L === 2 ? 40 : 16); }
      while (w2 === w1 || (L < 2 ? T % w2 !== 0 : Math.abs(T / w2 * 10 - Math.round(T / w2 * 10)) > 1e-9));
      text = ctx2.t.replace('{w1}', nf(w1)).replace('{d1}', nf(d1)).replace('{w2}', nf(w2));
      ans = A('válasz', T / w2, ctx2.u);
      steps = ['Fordított arányosság: ahányszor több ' + ctx2.wu + ', annyiszor kevesebb idő kell. A szorzat állandó.',
        'Az összes „munka”: ' + C(nf(w1) + ' · ' + nf(d1) + ' = ' + nf(T) + ' ' + ctx2.tot),
        'Ezt elosztjuk az új létszámmal: ' + C(nf(T) + ' : ' + nf(w2) + ' = ' + nf(T / w2) + ' ' + ctx2.u)];
      hints = ['Több ' + ctx2.wu + ' → kevesebb ' + ctx2.u + '. Ez fordított arányosság: a szorzat állandó.', 'Számold ki az összes munkát: ' + C(nf(w1) + ' · ' + nf(d1)) + '.', 'Összesen ' + nf(T) + ' ' + ctx2.tot + '. Oszd el ennyivel: ' + nf(w2) + '.'];
      data = { mode: mode, w1: w1, d1: d1, w2: w2 };
    }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: data };
  });

  /* ---------- 7. Pitagorasz-tétel ---------- */
  add('pitagorasz', 'mat', '📐', 'Pitagorasz-tétel', 'Derékszögű háromszög hiányzó oldala', function (R, L) {
    var tr = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 35, 37], [9, 40, 41]], a, b, c, k;
    var mode = L === 0 ? 'c' : R.pick(['c', 'b']);
    if (L < 2) { var t = R.pick(L === 0 ? tr.slice(0, 2) : tr); k = R.int(1, L === 0 ? 3 : 4); a = t[0] * k; b = t[1] * k; c = t[2] * k; if (R.f() < 0.5) { var s = a; a = b; b = s; } }
    else if (mode === 'c') { a = R.int(2, 20); b = R.int(2, 20); c = Math.sqrt(a * a + b * b); }
    else { a = R.int(2, 20); c = a + R.int(1, 10); b = Math.sqrt(c * c - a * a); }
    var dp = L === 2 ? 2 : 2, ladder = R.f() < 0.4, u = ladder ? 'm' : 'cm', text, steps, ans, hints;
    if (mode === 'c') {
      text = ladder ? 'Egy fal tövétől ' + nf(a) + ' m-re áll egy létra alja, a létra teteje ' + nf(b) + ' m magasan ér a falhoz. Milyen hosszú a létra?'
        : 'Egy derékszögű háromszög befogói ' + C('a = ' + nf(a) + ' cm') + ' és ' + C('b = ' + nf(b) + ' cm') + '. Mekkora az átfogó (c)?';
      ans = A('c', c, u, { dp: dp });
      steps = ['Pitagorasz-tétel: a befogók négyzetösszege egyenlő az átfogó négyzetével: ' + C('a² + b² = c²'),
        C('c² = ' + nf(a) + '² + ' + nf(b) + '² = ' + nf(a * a) + ' + ' + nf(b * b) + ' = ' + nf(c * c)),
        C('c = √' + nf(c * c) + (c === Math.round(c) ? ' = ' : ' ≈ ') + nf(c, dp) + ' ' + u)];
      hints = ['Melyik az átfogó? A derékszöggel szemközti, leghosszabb oldal – ezt keressük.', 'Használd: ' + C('c² = a² + b²') + '.', C('c² = ' + nf(c * c)) + '. Vonj gyököt!'];
    } else {
      text = ladder ? 'Egy ' + nf(c) + ' m hosszú létra alja ' + nf(a) + ' m-re van a faltól. Milyen magasra ér fel a létra a falon?'
        : 'Egy derékszögű háromszög átfogója ' + C('c = ' + nf(c) + ' cm') + ', egyik befogója ' + C('a = ' + nf(a) + ' cm') + '. Mekkora a másik befogó (b)?';
      ans = A('b', b, u, { dp: dp });
      steps = ['Pitagorasz-tétel: ' + C('a² + b² = c²') + ', ebből a hiányzó befogó: ' + C('b² = c² − a²'),
        C('b² = ' + nf(c) + '² − ' + nf(a) + '² = ' + nf(c * c) + ' − ' + nf(a * a) + ' = ' + nf(b * b)),
        C('b = √' + nf(b * b) + (b === Math.round(b) ? ' = ' : ' ≈ ') + nf(b, dp) + ' ' + u)];
      hints = ['A létra (vagy az átfogó) a leghosszabb oldal – most egy befogót keresünk.', 'Rendezd át a tételt: ' + C('b² = c² − a²') + '.', C('b² = ' + nf(b * b)) + '. Vonj gyököt!'];
    }
    if (ladder) steps[0] = 'A fal, a talaj és a létra derékszögű háromszöget alkot; a létra az átfogó. ' + steps[0];
    if (L === 2) steps[steps.length - 1] += ' (két tizedesjegyre kerekítve)';
    return { text: text + (L === 2 ? ' (Két tizedesjegyre kerekíts!)' : ''), answers: [ans], hints: hints, steps: steps, data: { mode: mode, a: a, b: b, c: c } };
  });

  /* ---------- 8. Kör ---------- */
  add('kor', 'mat', '⭕', 'Kör kerülete és területe', 'K = 2rπ, T = r²π', function (R, L) {
    var modes = [['K', 'T'], ['K', 'T', 'dK', 'dT', 'rK'], ['rT', 'TK', 'rK', 'dT']][L], mode = R.pick(modes);
    var r = L === 0 ? R.int(1, 20) : R.int(2, 60) / (L === 1 ? 1 : 2), d = 2 * r, PI = Math.PI, steps, text, ans, hints, obj = R.pick(['egy kör alakú virágágyás', 'egy pizza', 'egy kerek asztallap', 'egy kör alakú medence']);
    var K = 2 * r * PI, T = r * r * PI, Kd = round(K, 2), Td = round(T, 2);
    var rel = 0.003;
    if (mode === 'K' || mode === 'dK') {
      text = 'Mekkora ' + obj + ' kerülete, ha ' + (mode === 'K' ? 'sugara ' + C('r = ' + nf(r) + ' cm') : 'átmérője ' + C('d = ' + nf(d) + ' cm')) + '?';
      ans = A('K', K, 'cm', { rel: rel });
      steps = (mode === 'dK' ? ['A sugár az átmérő fele: ' + C('r = d / 2 = ' + nf(d) + ' / 2 = ' + nf(r) + ' cm')] : []).concat([
        'A kör kerülete: ' + C('K = 2 · r · π'), C('K = 2 · ' + nf(r) + ' · 3,14159… ≈ ' + nf(K, 2) + ' cm')]);
      hints = ['A kerület képlete: ' + C('K = 2rπ') + ' (vagy ' + C('K = dπ') + ').', mode === 'dK' ? 'Vigyázz: az átmérő a sugár kétszerese!' : 'Helyettesítsd be r értékét, π ≈ 3,14.', 'Számold ki: ' + C('2 · ' + nf(r) + ' · π') + '.'];
    } else if (mode === 'T' || mode === 'dT') {
      text = 'Mekkora ' + obj + ' területe, ha ' + (mode === 'T' ? 'sugara ' + C('r = ' + nf(r) + ' cm') : 'átmérője ' + C('d = ' + nf(d) + ' cm')) + '?';
      ans = A('T', T, 'cm²', { rel: rel });
      steps = (mode === 'dT' ? ['A sugár az átmérő fele: ' + C('r = d / 2 = ' + nf(d) + ' / 2 = ' + nf(r) + ' cm')] : []).concat([
        'A kör területe: ' + C('T = r² · π'), C('T = ' + nf(r) + '² · π = ' + nf(r * r) + ' · 3,14159… ≈ ' + nf(T, 2) + ' cm²')]);
      hints = ['A terület képlete: ' + C('T = r²π') + '.', mode === 'dT' ? 'Vigyázz: a képletben a sugár van, nem az átmérő!' : 'Előbb emeld négyzetre a sugarat!', C('r² = ' + nf(r * r)) + ' – szorozd meg π-vel.'];
    } else if (mode === 'rK') {
      r = Kd / (2 * PI); T = r * r * PI;
      text = obj.charAt(0).toUpperCase() + obj.slice(1) + ' kerülete ' + C('K = ' + nf(Kd) + ' cm') + '. Mekkora a sugara?';
      ans = A('r', r, 'cm', { rel: rel });
      steps = ['Induljunk a kerület képletéből: ' + C('K = 2 · r · π') + ', ebből ' + C('r = K / (2π)'), C('r = ' + nf(Kd) + ' / (2 · 3,14159…) = ' + nf(Kd) + ' / ' + nf(2 * PI, 4) + ' ≈ ' + nf(r, 2) + ' cm')];
      hints = ['Írd fel a kerület képletét, és fejezd ki belőle r-t!', C('r = K / (2π)'), 'Oszd el ' + nf(Kd) + '-t ennyivel: ' + C('2π ≈ 6,28') + '.'];
      K = Kd;
    } else if (mode === 'rT') {
      r = Math.sqrt(Td / PI);
      text = obj.charAt(0).toUpperCase() + obj.slice(1) + ' területe ' + C('T = ' + nf(Td) + ' cm²') + '. Mekkora a sugara?';
      ans = A('r', r, 'cm', { rel: rel });
      steps = ['Induljunk a terület képletéből: ' + C('T = r² · π') + ', ebből ' + C('r² = T / π'), C('r² = ' + nf(Td) + ' / 3,14159… ≈ ' + nf(r * r, 2)), C('r = √' + nf(r * r, 2) + ' ≈ ' + nf(r, 2) + ' cm')];
      hints = ['Fejezd ki r²-et a terület képletéből!', C('r² = T / π'), 'Ha megvan r², vonj belőle gyököt.'];
      T = Td;
    } else {
      r = Kd / (2 * PI); T = r * r * PI;
      text = obj.charAt(0).toUpperCase() + obj.slice(1) + ' kerülete ' + C('K = ' + nf(Kd) + ' cm') + '. Mekkora a területe?';
      ans = A('T', T, 'cm²', { rel: rel });
      steps = ['Először a sugár kell: ' + C('r = K / (2π) = ' + nf(Kd) + ' / ' + nf(2 * PI, 4) + ' ≈ ' + nf(r, 4) + ' cm'), 'A terület: ' + C('T = r² · π'), C('T = ' + nf(r, 4) + '² · π ≈ ' + nf(T, 2) + ' cm²')];
      hints = ['Két lépés: előbb a kerületből a sugár, aztán a sugárból a terület.', C('r = K / (2π) ≈ ' + nf(r, 2) + ' cm'), 'Most ' + C('T = r²π') + '.'];
      K = Kd;
    }
    return { text: text + ' (Két tizedesjegyre kerekíts; π ≈ 3,14 is elfogadott.)', answers: [ans], hints: hints, steps: steps, data: { mode: mode, r: r, K: K, T: T, Kd: Kd, Td: Td } };
  });

  /* ---------- 9. Hatványozás, normálalak ---------- */
  add('hatvany', 'mat', '🔢', 'Hatványozás és normálalak', 'Azonosságok, nagyon nagy és nagyon kicsi számok', function (R, L) {
    var steps, text, ans, hints, data;
    if (L === 0) {
      var base = R.pick([2, 2, 3, 5, 10]), op = R.pick(['·', ':', '^']), m, n, e, v;
      do {
        m = R.int(1, 7); n = R.int(1, 5);
        e = op === '·' ? m + n : op === ':' ? m - n : m * n; v = Math.pow(base, e);
      } while (e < 1 || v > 100000 || (op === '^' && (m < 2 || n < 2)));
      var expr = op === '^' ? '(' + base + sup(m) + ')' + sup(n) : base + sup(m) + ' ' + op + ' ' + base + sup(n);
      var rule = op === '·' ? 'Azonos alapú hatványok szorzásakor a kitevők összeadódnak: ' + C('aᵐ · aⁿ = aᵐ⁺ⁿ')
        : op === ':' ? 'Azonos alapú hatványok osztásakor a kitevők kivonódnak: ' + C('aᵐ : aⁿ = aᵐ⁻ⁿ')
          : 'Hatvány hatványozásakor a kitevők összeszorzódnak: ' + C('(aᵐ)ⁿ = aᵐ·ⁿ');
      text = 'Számold ki a hatványozás azonosságainak segítségével: ' + C(expr);
      ans = A('érték', v, '', { dp: 0 });
      steps = [rule, C(expr + ' = ' + base + sup(op === '·' ? m + '+' + n : op === ':' ? m + '-' + n : m + '·' + n) + ' = ' + base + sup(e)),
        C(base + sup(e) + ' = ' + nf(v, 0))];
      hints = ['Nézd meg: azonos az alap? Akkor elég a kitevőkkel számolni.', rule, 'Az új kitevő: ' + C(String(e)) + '. Most számold ki ' + C(base + sup(e)) + ' értékét.'];
      data = { v: v, base: base, e: e };
    } else if (L === 1) {
      var mm = R.int(11, 99), k;
      while (mm % 10 === 0) mm = R.int(11, 99);
      do { k = R.int(-7, 8); } while (k === 0 || k === 1);
      var M = mm / 10, N = k >= 1 ? mm * Math.pow(10, k - 1) : mm / Math.pow(10, 1 - k), Nshow = nf(N, Math.max(0, 1 - k));
      text = 'Írd fel normálalakban ezt a számot: ' + C(Nshow) + '\n(Így írd be: ' + C('4,2·10^-4') + ' vagy ' + C('4,2e-4') + '.)';
      ans = A('normálalak', N, '', { kind: 'sci', rel: 1e-6, show: nf(M) + '·10' + sup(k) });
      steps = ['Normálalak: ' + C('a · 10ᵏ') + ', ahol ' + C('1 ≤ a < 10') + '. Itt ' + C('a = ' + nf(M)) + ' lesz (az első nem nulla számjegy után kerül a tizedesvessző).',
        k > 0 ? 'A tizedesvesszőt ' + k + ' helyiértékkel balra kell mozgatni, hogy ' + nf(M) + ' legyen – ezért a kitevő pozitív: ' + C('k = ' + k)
          : 'A tizedesvesszőt ' + (-k) + ' helyiértékkel jobbra kell mozgatni, hogy ' + nf(M) + ' legyen – ezért a kitevő negatív: ' + C('k = ' + nf(k)),
        C(Nshow + ' = ' + nf(M) + '·10' + sup(k))];
      hints = ['Normálalakban egy 1 és 10 közötti szám szorzódik 10 valamelyik hatványával.', 'Az első tényező: ' + C(nf(M)) + '. Hány helyiértékkel kell elmozdítani a tizedesvesszőt?', k > 0 ? 'Nagy számnál (≥ 10) a kitevő pozitív.' : 'Egynél kisebb számnál a kitevő negatív.'];
      data = { N: N };
    } else {
      var a1 = R.int(11, 99) / 10, a2 = R.int(11, 99) / 10, k1 = R.int(-9, 9), k2 = R.int(-9, 9), op2 = R.pick(['·', ':']);
      var N1 = a1 * Math.pow(10, k1), N2 = a2 * Math.pow(10, k2);
      var raw = op2 === '·' ? round(a1 * a2, 6) : round(a1 / a2, 6), ke = op2 === '·' ? k1 + k2 : k1 - k2, res = sciParts(raw * Math.pow(10, ke));
      var val = op2 === '·' ? N1 * N2 : N1 / N2;
      text = 'Számold ki, és add meg normálalakban (a tényezőt két tizedesjegyre kerekítve): ' + C('(' + nf(a1) + '·10' + sup(k1) + ') ' + op2 + ' (' + nf(a2) + '·10' + sup(k2) + ')') + '\n(Beírás: pl. ' + C('3,2·10^5') + ' vagy ' + C('3,2e5') + '.)';
      var shw = nf(res.m, 2) + '·10' + sup(res.k);
      ans = A('eredmény', val, '', { kind: 'sci', tol: 0.0051 * Math.pow(10, res.k), show: shw });
      steps = ['A tényezőket és a 10-hatványokat külön kezeljük: ' + C(op2 === '·' ? '(a·10ᵐ) · (b·10ⁿ) = (a·b)·10ᵐ⁺ⁿ' : '(a·10ᵐ) : (b·10ⁿ) = (a:b)·10ᵐ⁻ⁿ'),
        'Tényezők: ' + C(nf(a1) + ' ' + op2 + ' ' + nf(a2) + (op2 === ':' && raw !== round(raw, 4) ? ' ≈ ' : ' = ') + nf(raw)) + '; kitevő: ' + C(nf(k1) + (op2 === '·' ? pm(k2) : pm(-k2)) + ' = ' + nf(ke)),
        (Math.abs(raw) >= 10 || Math.abs(raw) < 1) ? 'A ' + C(nf(raw) + '·10' + sup(ke)) + ' még nem normálalak (a tényező nincs 1 és 10 között), ezért igazítunk rajta: ' + C(nf(res.m) + '·10' + sup(res.k))
          : 'A tényező 1 és 10 között van, tehát kész a normálalak: ' + C(nf(res.m) + '·10' + sup(res.k))];
      if (nf(res.m) !== nf(res.m, 2)) steps[2] += ', kerekítve: ' + C(shw);
      hints = ['A számokat és a 10-hatványokat külön-külön számold!', 'Tényezők: ' + C(nf(a1) + ' ' + op2 + ' ' + nf(a2)) + ', kitevők: ' + (op2 === '·' ? 'összeadódnak.' : 'kivonódnak.'), 'Ha a tényező 10 vagy nagyobb (vagy 1-nél kisebb), igazítsd: pl. ' + C('25·10³ = 2,5·10⁴') + '.'];
      data = { N1: N1, N2: N2, op: op2 };
    }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: data };
  });

  /* ---------- 10. Egyenletes mozgás ---------- */
  add('mozgas', 'fiz', '🚲', 'Egyenletes mozgás', 'v = s / t – sebesség, út, idő', function (R, L) {
    var steps, text, ans, hints, data, who = R.pick([['Egy kerékpáros', 'Egy kerékpáros'], ['Egy autó', 'Egy autó'], ['Egy vonat', 'Egy vonat'], ['Egy futó', 'Egy futó']])[0];
    if (L < 2) {
      var kmh = L === 0 || R.f() < 0.5, v, t, s, mode = R.pick(['v', 's', 't']);
      if (kmh) { v = R.pick(who === 'Egy futó' ? [8, 10, 12] : who === 'Egy kerékpáros' ? [12, 15, 18, 20, 24] : [40, 50, 60, 72, 80, 90, 100, 120]); t = R.pick([1, 2, 3, 0.5, 1.5, 2.5]); }
      else { v = R.int(who === 'Egy futó' ? 2 : 4, who === 'Egy futó' ? 6 : 30); t = R.int(5, 120); }
      s = v * t;
      var uv = kmh ? 'km/h' : 'm/s', us = kmh ? 'km' : 'm', ut = kmh ? 'h' : 's';
      if (mode === 'v') { text = who + ' ' + nf(t) + ' ' + ut + ' alatt ' + nf(s) + ' ' + us + ' utat tesz meg egyenletesen. Mekkora a sebessége?'; ans = A('v', v, uv); steps = ['A sebesség a megtett út és az eltelt idő hányadosa: ' + C('v = s / t'), C('v = ' + nf(s) + ' ' + us + ' / ' + nf(t) + ' ' + ut + ' = ' + nf(v) + ' ' + uv)]; }
      else if (mode === 's') { text = who + ' ' + nf(v) + ' ' + uv + ' sebességgel halad ' + nf(t) + ' ' + ut + ' ideig. Mekkora utat tesz meg?'; ans = A('s', s, us); steps = ['A sebesség képletéből (' + C('v = s / t') + ') kifejezzük az utat: ' + C('s = v · t'), C('s = ' + nf(v) + ' ' + uv + ' · ' + nf(t) + ' ' + ut + ' = ' + nf(s) + ' ' + us)]; }
      else { text = who + ' ' + nf(v) + ' ' + uv + ' sebességgel halad. Mennyi idő alatt tesz meg ' + nf(s) + ' ' + us + ' utat?'; ans = A('t', t, ut); steps = ['A sebesség képletéből (' + C('v = s / t') + ') kifejezzük az időt: ' + C('t = s / v'), C('t = ' + nf(s) + ' ' + us + ' / ' + nf(v) + ' ' + uv + ' = ' + nf(t) + ' ' + ut)]; }
      var kn = [];
      if (mode !== 's') kn.push(C('s = ' + nf(s) + ' ' + us));
      if (mode !== 'v') kn.push(C('v = ' + nf(v) + ' ' + uv));
      if (mode !== 't') kn.push(C('t = ' + nf(t) + ' ' + ut));
      steps.unshift('Egyenletes mozgásnál a sebesség állandó. Ismert: ' + kn.join(', ') + '.');
      hints = ['Az alapképlet: ' + C('v = s / t') + '.', mode === 'v' ? 'Oszd el az utat az idővel!' : mode === 's' ? 'Rendezd át: ' + C('s = v · t') + '.' : 'Rendezd át: ' + C('t = s / v') + '.', 'Figyelj, hogy a mértékegységek illeszkedjenek (' + us + ', ' + ut + ', ' + uv + ').'];
      data = { mode: mode, v: v, s: s, t: t };
    } else {
      var vk = R.pick([36, 45, 54, 60, 72, 80, 90, 108, 120]), mins = R.pick([12, 15, 20, 24, 30, 36, 40, 45, 48, 75, 90]), sk = vk * mins / 60, vms = vk / 3.6;
      text = who.replace('Egy futó', 'Egy autó').replace('Egy kerékpáros', 'Egy autó') + ' ' + nf(mins) + ' perc alatt ' + nf(sk) + ' km-t tesz meg egyenletes sebességgel. Mekkora a sebessége m/s-ban? (Két tizedesjegyre kerekíts!)';
      ans = A('v', vms, 'm/s');
      steps = ['Váltsuk át az időt órába: ' + C(nf(mins) + ' perc = ' + nf(mins) + ' / 60 h = ' + nf(mins / 60) + ' h'),
        'Sebesség km/h-ban: ' + C('v = s / t = ' + nf(sk) + ' km / ' + nf(mins / 60) + ' h = ' + nf(vk) + ' km/h'),
        'Átváltás m/s-ra: ' + C('1 m/s = 3,6 km/h') + ', ezért 3,6-tal osztunk: ' + C(nf(vk) + ' / 3,6 ≈ ' + nf(vms, 2) + ' m/s')];
      hints = ['Két lépés: előbb km/h-ban számolj, aztán váltsd át m/s-ra.', 'Az időt váltsd át órába: ' + C(nf(mins) + ' perc = ' + nf(mins / 60) + ' h') + '.', 'km/h → m/s: ossz 3,6-tal (mert 1 h = 3600 s és 1 km = 1000 m).'];
      data = { mode: 'v2', s: sk * 1000, t: mins * 60 };
    }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: data };
  });

  /* ---------- 11. Gyorsulás ---------- */
  add('gyorsulas', 'fiz', '🏎️', 'Gyorsulás', 'a = Δv / Δt, megtett út gyorsuláskor és fékezéskor', function (R, L) {
    var steps, text, ans, hints, data, mode = L === 0 ? 'a' : L === 1 ? R.pick(['a', 'v', 's']) : R.pick(['auto', 'fek']);
    if (mode === 'a' || mode === 'v' || mode === 's') {
      var a = R.pick(L === 0 ? [1, 2, 3, 4, 5] : [0.5, 1, 1.5, 2, 2.5, 3, 4]), t = R.int(2, 10), v0 = mode === 's' ? 0 : R.int(0, 10), v1 = v0 + a * t;
      if (mode === 'a') {
        text = 'Egy roller sebessége ' + nf(t) + ' s alatt egyenletesen ' + nf(v0) + ' m/s-ról ' + nf(v1) + ' m/s-ra nő. Mekkora a gyorsulása?';
        ans = A('a', a, 'm/s²');
        steps = ['A gyorsulás a sebességváltozás és az eltelt idő hányadosa: ' + C('a = Δv / Δt'), 'Sebességváltozás: ' + C('Δv = ' + nf(v1) + ' − ' + nf(v0) + ' = ' + nf(v1 - v0) + ' m/s'), C('a = ' + nf(v1 - v0) + ' m/s / ' + nf(t) + ' s = ' + nf(a) + ' m/s²')];
        hints = ['A gyorsulás megmutatja, mennyit nő a sebesség 1 másodperc alatt.', 'Számold ki a sebességváltozást: ' + C('Δv = v − v₀') + '.', 'Oszd el ' + C('Δv') + '-t az idővel.'];
      } else if (mode === 'v') {
        text = 'Egy autó ' + nf(v0) + ' m/s sebességről ' + nf(a) + ' m/s² gyorsulással gyorsít ' + nf(t) + ' s-on át. Mekkora lesz a sebessége?';
        ans = A('v', v1, 'm/s');
        steps = ['Egyenletesen gyorsuló mozgásnál: ' + C('v = v₀ + a · t'), 'A sebesség növekedése: ' + C('a · t = ' + nf(a) + ' · ' + nf(t) + ' = ' + nf(a * t) + ' m/s'), C('v = ' + nf(v0) + ' + ' + nf(a * t) + ' = ' + nf(v1) + ' m/s')];
        hints = ['Másodpercenként ' + nf(a) + ' m/s-mal nő a sebesség.', 'Mennyivel nő a sebesség ' + nf(t) + ' s alatt? ' + C('a · t'), 'Add hozzá a kezdősebességhez!'];
      } else {
        var s = a * t * t / 2;
        text = 'Egy álló helyzetből induló motoros ' + nf(a) + ' m/s² gyorsulással gyorsít ' + nf(t) + ' s-on át. Mekkora utat tesz meg ezalatt?';
        ans = A('s', s, 'm');
        steps = ['Álló helyzetből egyenletesen gyorsuló mozgásnál: ' + C('s = a/2 · t²'), C('t² = ' + nf(t) + '² = ' + nf(t * t) + ' s²'), C('s = ' + nf(a) + ' / 2 · ' + nf(t * t) + ' = ' + nf(s) + ' m')];
        hints = ['Ha a test álló helyzetből indul, a megtett út: ' + C('s = a/2 · t²') + '.', 'Előbb emeld négyzetre az időt!', C('t² = ' + nf(t * t)) + '. Szorozd meg a gyorsulás felével.'];
      }
      data = { mode: mode, a: a, t: t, v0: v0, v1: v1 };
    } else if (mode === 'auto') {
      var tt = R.pick([5, 6, 7, 8, 9, 10, 12]), vk = R.pick([72, 90, 100, 108]), vm = vk / 3.6, aa = vm / tt;
      text = 'Egy autó álló helyzetből ' + nf(tt) + ' s alatt gyorsul fel ' + nf(vk) + ' km/h-ra. Mekkora az átlagos gyorsulása? (Két tizedesjegyre kerekíts!)';
      ans = A('a', aa, 'm/s²');
      steps = ['Előbb váltsuk át a sebességet m/s-ra (osztás 3,6-tal): ' + C(nf(vk) + ' km/h / 3,6 ≈ ' + nf(vm, 4) + ' m/s'), 'A gyorsulás: ' + C('a = Δv / Δt'), C('a = ' + nf(vm, 4) + ' m/s / ' + nf(tt) + ' s ≈ ' + nf(aa, 2) + ' m/s²')];
      hints = ['A gyorsulás mértékegysége m/s², ezért a sebességet m/s-ban kell megadni.', 'km/h → m/s: ossz 3,6-tal! ' + C(nf(vk) + ' km/h ≈ ' + nf(vm, 2) + ' m/s'), 'Most oszd el az idővel: ' + C('a = Δv / Δt') + '.'];
      data = { mode: mode, v: vm, t: tt };
    } else {
      var vk2 = R.pick([36, 54, 72, 90, 108]), v2 = vk2 / 3.6, dec = R.pick([4, 5, 6, 8]), tf = v2 / dec, sf = v2 * v2 / (2 * dec);
      text = 'Egy ' + nf(vk2) + ' km/h sebességgel haladó autó vészfékez, lassulása ' + nf(dec) + ' m/s². Mekkora a fékút (a megállásig megtett út)? (Két tizedesjegyre kerekíts!)';
      ans = A('s', sf, 'm');
      steps = ['Váltsuk át a sebességet m/s-ra: ' + C(nf(vk2) + ' / 3,6 = ' + nf(v2) + ' m/s'), 'A megállásig eltelt idő: ' + C('t = v / a = ' + nf(v2) + ' / ' + nf(dec) + ' = ' + nf(tf, 4) + ' s'),
        'Egyenletes lassulásnál az átlagsebesség a kezdősebesség fele, így ' + C('s = v/2 · t = ' + nf(v2 / 2) + ' · ' + nf(tf, 4) + ' ≈ ' + nf(sf, 2) + ' m') + ' (ugyanez a ' + C('s = v² / (2a)') + ' képlettel).'];
      hints = ['Váltsd át a sebességet m/s-ra (osztás 3,6-tal)!', 'Számold ki, mennyi idő alatt áll meg: ' + C('t = v / a') + '.', 'Fékút: ' + C('s = v² / (2a)') + '.'];
      data = { mode: mode, v: v2, a: dec };
    }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: data };
  });

  /* ---------- 12. Ohm-törvény és teljesítmény ---------- */
  add('ohm', 'fiz', '💡', 'Ohm-törvény és elektromos teljesítmény', 'U = R · I, P = U · I', function (R, L) {
    var mode = R.pick([['I', 'U', 'R'], ['P', 'PUR', 'I', 'R'], ['PIR', 'PU2', 'IPU', 'R']][L]), steps, text, ans, hints, Rr, I, U, P;
    Rr = R.pick(L === 0 ? [2, 4, 5, 6, 10, 12, 20] : [2, 3, 4, 5, 8, 10, 12, 15, 20, 24, 40, 50, 100]);
    I = R.pick(L === 0 ? [0.5, 1, 2, 3, 4] : [0.2, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5]);
    U = Rr * I; P = U * I;
    if (mode === 'IPU') { U = R.pick([12, 24, 230]); P = U * R.pick([1, 2, 4, 5, 10]); I = P / U; Rr = U / I; }
    var ohm = 'Ohm törvénye: ' + C('U = R · I');
    if (mode === 'I') { text = 'Egy ' + nf(Rr) + ' Ω-os ellenállásra ' + nf(U) + ' V feszültséget kapcsolunk. Mekkora áram folyik át rajta?'; ans = A('I', I, 'A'); steps = [ohm + ', ebből ' + C('I = U / R'), C('I = ' + nf(U) + ' V / ' + nf(Rr) + ' Ω = ' + nf(I) + ' A')]; hints = ['Ohm törvénye: ' + C('U = R · I') + '. Melyik az ismeretlen?', 'Fejezd ki az áramot: ' + C('I = U / R') + '.']; }
    else if (mode === 'U') { text = 'Egy ' + nf(Rr) + ' Ω-os ellenálláson ' + nf(I) + ' A áram folyik. Mekkora feszültség esik rajta?'; ans = A('U', U, 'V'); steps = [ohm, C('U = ' + nf(Rr) + ' Ω · ' + nf(I) + ' A = ' + nf(U) + ' V')]; hints = ['Ohm törvénye: ' + C('U = R · I') + '.', 'Csak szorozd össze az ellenállást és az áramot!']; }
    else if (mode === 'R') { text = 'Egy fogyasztóra ' + nf(U) + ' V feszültséget kapcsolva ' + nf(I) + ' A áram folyik. Mekkora az ellenállása?'; ans = A('R', Rr, 'Ω'); steps = [ohm + ', ebből ' + C('R = U / I'), C('R = ' + nf(U) + ' V / ' + nf(I) + ' A = ' + nf(Rr) + ' Ω')]; hints = ['Ohm törvénye: ' + C('U = R · I') + '.', 'Fejezd ki az ellenállást: ' + C('R = U / I') + '.']; }
    else if (mode === 'P') { text = 'Egy izzó ' + nf(U) + ' V feszültségen ' + nf(I) + ' A áramot vesz fel. Mekkora a teljesítménye?'; ans = A('P', P, 'W'); steps = ['Az elektromos teljesítmény: ' + C('P = U · I'), C('P = ' + nf(U) + ' V · ' + nf(I) + ' A = ' + nf(P) + ' W')]; hints = ['A teljesítmény a feszültség és az áramerősség szorzata.', C('P = U · I')]; }
    else if (mode === 'PUR') { text = 'Egy ' + nf(Rr) + ' Ω-os fűtőszálra ' + nf(U) + ' V feszültséget kapcsolunk. Mekkora a teljesítménye?'; ans = A('P', P, 'W'); steps = ['Először az áram, Ohm törvényéből: ' + C('I = U / R = ' + nf(U) + ' / ' + nf(Rr) + ' = ' + nf(I) + ' A'), 'A teljesítmény: ' + C('P = U · I'), C('P = ' + nf(U) + ' V · ' + nf(I) + ' A = ' + nf(P) + ' W')]; hints = ['Két lépés: előbb az áramerősség, utána a teljesítmény.', C('I = U / R = ' + nf(I) + ' A'), C('P = U · I')]; }
    else if (mode === 'PIR') { text = 'Egy ' + nf(Rr) + ' Ω-os ellenálláson ' + nf(I) + ' A áram folyik. Mekkora teljesítmény alakul hővé rajta?'; ans = A('P', P, 'W'); steps = ['A teljesítmény ' + C('P = U · I') + ', és ' + C('U = R · I') + ', ezért ' + C('P = I² · R'), C('I² = ' + nf(I) + '² = ' + nf(I * I) + ' A²'), C('P = ' + nf(I * I) + ' · ' + nf(Rr) + ' = ' + nf(P) + ' W')]; hints = ['Nincs megadva a feszültség – számold ki Ohm törvényével, vagy használd a ' + C('P = I² · R') + ' képletet.', C('U = R · I = ' + nf(U) + ' V'), C('P = U · I')]; }
    else if (mode === 'PU2') { text = 'Egy ' + nf(Rr) + ' Ω-os ellenállásra ' + nf(U) + ' V feszültséget kapcsolunk. Mekkora a teljesítmény? (A ' + C('P = U² / R') + ' képlettel is számolhatsz.)'; ans = A('P', P, 'W'); steps = ['Mivel ' + C('I = U / R') + ', a teljesítmény ' + C('P = U · I = U² / R'), C('U² = ' + nf(U) + '² = ' + nf(U * U) + ' V²'), C('P = ' + nf(U * U) + ' / ' + nf(Rr) + ' = ' + nf(P) + ' W')]; hints = ['Használd a ' + C('P = U² / R') + ' képletet!', C('U² = ' + nf(U * U)), 'Oszd el az ellenállással.']; }
    else { text = 'Egy ' + nf(P) + ' W-os készüléket ' + nf(U) + ' V-ra kapcsolunk. Mekkora áramot vesz fel, és mekkora az ellenállása?'; ans = A('I', I, 'A'); var ans2 = A('R', Rr, 'Ω'); steps = ['A teljesítmény ' + C('P = U · I') + ', ebből ' + C('I = P / U = ' + nf(P) + ' / ' + nf(U) + ' = ' + nf(I) + ' A'), 'Ohm törvényéből: ' + C('R = U / I = ' + nf(U) + ' / ' + nf(I) + ' = ' + nf(Rr) + ' Ω')]; hints = ['Az áramot a teljesítményből kapod: ' + C('I = P / U') + '.', 'Az ellenállás Ohm törvényéből: ' + C('R = U / I') + '.']; return { text: text, answers: [ans, ans2], hints: hints, steps: steps, data: { mode: mode, U: U, P: P } }; }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: { mode: mode, U: U, I: I, R: Rr } };
  });

  /* ---------- 13. Munka és teljesítmény ---------- */
  add('munka', 'fiz', '🏋️', 'Mechanikai munka és teljesítmény', 'W = F · s, P = W / t', function (R, L) {
    var mode = R.pick([['W'], ['W', 'P'], ['emel', 'emelP']][L]), steps, text, ans, hints, data;
    if (mode === 'W' || mode === 'P') {
      var F = R.pick([20, 40, 50, 80, 100, 120, 150, 200, 250, 400]), s = R.pick([2, 3, 4, 5, 8, 10, 12, 15, 20, 25]), W = F * s, t = R.pick([2, 4, 5, 8, 10, 20, 25, 40, 50]);
      if (mode === 'W') { text = 'Egy szekrényt ' + nf(F) + ' N erővel ' + nf(s) + ' m-en át tolunk (az erő a mozgás irányába mutat). Mennyi munkát végzünk?'; ans = A('W', W, 'J'); steps = ['A mechanikai munka az erő és az elmozdulás szorzata (ha egyirányúak): ' + C('W = F · s'), C('W = ' + nf(F) + ' N · ' + nf(s) + ' m = ' + nf(W) + ' J')]; hints = ['A munka képlete: ' + C('W = F · s') + '.', 'N · m = J (joule).']; }
      else { text = 'Egy szánkót ' + nf(F) + ' N erővel ' + nf(s) + ' m-en át húzunk ' + nf(t) + ' s alatt. Mekkora az átlagteljesítményünk?'; ans = A('P', W / t, 'W'); steps = ['Először a munka: ' + C('W = F · s = ' + nf(F) + ' · ' + nf(s) + ' = ' + nf(W) + ' J'), 'A teljesítmény az időegység alatt végzett munka: ' + C('P = W / t'), C('P = ' + nf(W) + ' J / ' + nf(t) + ' s = ' + nf(W / t) + ' W')]; hints = ['Két lépés: előbb a munka, aztán a teljesítmény.', C('W = F · s = ' + nf(W) + ' J'), C('P = W / t')]; }
      data = { mode: mode, F: F, s: s, t: t };
    } else {
      var m = R.pick([2, 5, 10, 15, 20, 25, 40, 50, 60, 75]), h = R.pick([1.5, 2, 3, 4, 5, 6, 8, 10, 12]), tt = R.pick([2, 3, 4, 5, 6, 10, 12, 15]), Wm = m * 10 * h;
      if (mode === 'emel') { text = 'Egy ' + nf(m) + ' kg-os zsákot ' + nf(h) + ' m magasra emelünk egyenletesen. Mennyi munkát végzünk? (g ≈ 10 m/s²)'; ans = A('W', Wm, 'J'); steps = ['Egyenletes emeléskor a testre ható nehézségi erővel egyenlő erőt fejtünk ki: ' + C('F = m · g = ' + nf(m) + ' · 10 = ' + nf(m * 10) + ' N'), 'Az emelési munka: ' + C('W = F · h = m · g · h'), C('W = ' + nf(m * 10) + ' N · ' + nf(h) + ' m = ' + nf(Wm) + ' J')]; hints = ['Mekkora erő kell a zsák egyenletes emeléséhez? ' + C('F = m · g'), C('F = ' + nf(m * 10) + ' N'), 'A munka: ' + C('W = F · h') + '.']; }
      else { text = 'Egy daru ' + nf(m * 10) + ' kg-os terhet ' + nf(h) + ' m magasra emel ' + nf(tt) + ' s alatt. Mekkora a hasznos teljesítménye? (g ≈ 10 m/s²; két tizedesjegyre kerekíts!)'; Wm = m * 100 * h; ans = A('P', Wm / tt, 'W'); steps = ['Az emeléshez szükséges erő: ' + C('F = m · g = ' + nf(m * 10) + ' · 10 = ' + nf(m * 100) + ' N'), 'A munka: ' + C('W = F · h = ' + nf(m * 100) + ' · ' + nf(h) + ' = ' + nf(Wm) + ' J'), 'A teljesítmény: ' + C('P = W / t = ' + nf(Wm) + ' / ' + nf(tt) + ' ≈ ' + nf(Wm / tt, 2) + ' W') + (Wm / tt >= 1000 ? ' (≈ ' + nf(Wm / tt / 1000, 2) + ' kW)' : '')]; hints = ['Három lépés: erő → munka → teljesítmény.', C('W = m · g · h = ' + nf(Wm) + ' J'), C('P = W / t')]; m = m * 10; }
      data = { mode: mode, m: m, h: h, t: tt };
    }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: data };
  });

  /* ---------- 14. Sűrűség ---------- */
  var MAT = [['víz', 1000], ['jég', 900], ['vas', 7800], ['alumínium', 2700], ['réz', 8900], ['fenyőfa', 500], ['arany', 19300], ['beton', 2400], ['ólom', 11300], ['üveg', 2500]];
  add('suruseg', 'fiz', '🧊', 'Sűrűség', 'ρ = m / V és mértékegység-átváltás', function (R, L) {
    var mt = R.pick(MAT.slice(1)), rho = mt[1], steps, text, ans, hints, data, mode;
    if (L === 0) {
      var V = R.pick([0.5, 1, 2, 3, 4, 5, 10]), m = rho * V; mode = 'rho';
      text = 'Egy tömör test térfogata ' + nf(V) + ' m³, tömege ' + nf(m) + ' kg. Mekkora a sűrűsége? Milyen anyagból lehet?';
      ans = A('ρ', rho, 'kg/m³');
      steps = ['A sűrűség a tömeg és a térfogat hányadosa: ' + C('ρ = m / V'), C('ρ = ' + nf(m) + ' kg / ' + nf(V) + ' m³ = ' + nf(rho) + ' kg/m³'), 'Ez a(z) **' + mt[0] + '** sűrűsége.'];
      hints = ['A sűrűség megmutatja, mekkora az 1 m³ anyag tömege.', 'Oszd el a tömeget a térfogattal: ' + C('ρ = m / V') + '.'];
      data = { mode: mode, m: m, V: V };
    } else if (L === 1) {
      var g = rho / 1000, Vc = R.pick([10, 20, 25, 40, 50, 100, 125, 200, 250, 500]), mg = g * Vc; mode = R.pick(['rho', 'm', 'V']);
      if (mode === 'rho') { text = 'Egy ' + nf(Vc) + ' cm³ térfogatú tárgy tömege ' + nf(mg) + ' g. Mekkora a sűrűsége g/cm³-ben?'; ans = A('ρ', g, 'g/cm³'); steps = [C('ρ = m / V'), C('ρ = ' + nf(mg) + ' g / ' + nf(Vc) + ' cm³ = ' + nf(g) + ' g/cm³') + ' (ez ' + nf(rho) + ' kg/m³ – a(z) ' + mt[0] + ' sűrűsége)']; hints = ['Képlet: ' + C('ρ = m / V') + '.', 'Oszd el a grammot a köbcentivel.']; }
      else if (mode === 'm') { text = 'Mekkora a tömege egy ' + nf(Vc) + ' cm³ térfogatú ' + mt[0] + 'darabnak? (A(z) ' + mt[0] + ' sűrűsége ' + nf(g) + ' g/cm³.)'; ans = A('m', mg, 'g'); steps = [C('ρ = m / V') + ', ebből ' + C('m = ρ · V'), C('m = ' + nf(g) + ' g/cm³ · ' + nf(Vc) + ' cm³ = ' + nf(mg) + ' g')]; hints = ['Rendezd át a sűrűség képletét a tömegre!', C('m = ρ · V')]; }
      else { text = 'Mekkora a térfogata egy ' + nf(mg) + ' g tömegű ' + mt[0] + 'darabnak? (A(z) ' + mt[0] + ' sűrűsége ' + nf(g) + ' g/cm³.)'; ans = A('V', Vc, 'cm³'); steps = [C('ρ = m / V') + ', ebből ' + C('V = m / ρ'), C('V = ' + nf(mg) + ' g / ' + nf(g) + ' g/cm³ = ' + nf(Vc) + ' cm³')]; hints = ['Rendezd át a sűrűség képletét a térfogatra!', C('V = m / ρ')]; }
      hints.push('Ellenőrizd a mértékegységeket: g, cm³ és g/cm³ illenek egymáshoz.');
      data = { mode: mode, rho: g, m: mg, V: Vc };
    } else {
      mode = R.pick(['rhoL', 'mcm']);
      if (mode === 'rhoL') {
        var dm = R.pick([2, 4, 5, 8, 10, 20, 25, 50]), mk = rho * dm / 1000;
        text = 'Egy ' + nf(dm) + ' dm³ térfogatú tömb tömege ' + nf(mk) + ' kg. Mekkora a sűrűsége kg/m³-ben?';
        ans = A('ρ', rho, 'kg/m³');
        steps = ['Váltsuk át a térfogatot: ' + C('1 dm³ = 0,001 m³') + ', így ' + C(nf(dm) + ' dm³ = ' + nf(dm / 1000) + ' m³'), C('ρ = m / V = ' + nf(mk) + ' kg / ' + nf(dm / 1000) + ' m³ = ' + nf(rho) + ' kg/m³'), 'Ez a(z) **' + mt[0] + '** sűrűsége.'];
        hints = ['A kg/m³-hez a térfogatot m³-ben kell megadni.', C('1 m³ = 1000 dm³') + ', tehát ossz 1000-rel.', C('ρ = m / V')];
        data = { mode: mode, m: mk, V: dm / 1000 };
      } else {
        var cc = R.pick([50, 100, 200, 250, 400, 500, 800, 1000]), mkg = rho * cc / 1e6;
        text = 'Mekkora a tömege egy ' + nf(cc) + ' cm³ térfogatú ' + mt[0] + 'darabnak kilogrammban? (ρ = ' + nf(rho) + ' kg/m³)';
        ans = A('m', mkg, 'kg', { dp: 4 });
        steps = ['Váltsuk át a térfogatot m³-be: ' + C('1 m³ = 1 000 000 cm³') + ', így ' + C(nf(cc) + ' cm³ = ' + nf(cc / 1e6, 8) + ' m³'), C('m = ρ · V = ' + nf(rho) + ' kg/m³ · ' + nf(cc / 1e6, 8) + ' m³ = ' + nf(mkg, 4) + ' kg')];
        hints = ['Vagy a térfogatot váltsd m³-be, vagy a sűrűséget g/cm³-be (' + C(nf(rho) + ' kg/m³ = ' + nf(rho / 1000) + ' g/cm³') + ').', C('m = ρ · V'), 'Ha grammot kaptál, ne felejtsd el kg-ra váltani (osztás 1000-rel).'];
        data = { mode: mode, rho: rho, V: cc / 1e6 };
      }
    }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: data };
  });

  /* ---------- 15. Hőmennyiség ---------- */
  var HEAT = [['víz', 4200], ['alumínium', 900], ['vas', 460], ['réz', 385], ['olaj', 2000]];
  add('ho', 'fiz', '🔥', 'Hőmennyiség', 'Q = c · m · ΔT', function (R, L) {
    var mt = L === 0 ? HEAT[0] : R.pick(HEAT), c = mt[1], m = R.pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), dT = R.int(1, 8) * 10, Q = c * m * dT, steps, text, ans, hints, data, mode;
    var cs = 'c = ' + nf(c) + ' J/(kg·°C)';
    if (L === 0 || (L === 1 && R.f() < 0.5)) {
      var T1 = R.int(1, 3) * 10, T2 = T1 + dT; mode = 'Q';
      text = nf(m) + ' kg ' + mt[0] + ' hőmérsékletét ' + (L === 0 ? nf(dT) + ' °C-kal növeljük' : nf(T1) + ' °C-ról ' + nf(T2) + ' °C-ra melegítjük') + '. Mennyi hőt kell közölni vele? Add meg kJ-ban! (' + C(cs) + ')';
      ans = A('Q', Q / 1000, 'kJ', { show: nf(Q / 1000) });
      steps = ['A felvett hő: ' + C('Q = c · m · ΔT') + (L === 0 ? '' : ', ahol ' + C('ΔT = ' + nf(T2) + ' − ' + nf(T1) + ' = ' + nf(dT) + ' °C')), C('Q = ' + nf(c) + ' · ' + nf(m) + ' · ' + nf(dT) + ' = ' + nf(Q) + ' J'), 'Átváltás: ' + C('1 kJ = 1000 J') + ', tehát ' + C('Q = ' + nf(Q / 1000) + ' kJ')];
      hints = ['A fajhő megmutatja, mennyi hő kell 1 kg anyag 1 °C-os melegítéséhez.', 'Képlet: ' + C('Q = c · m · ΔT') + (L === 0 ? '' : '; először számold ki ΔT-t!'), 'J-ból kJ: ossz 1000-rel.'];
      data = { mode: mode, c: c, m: m, dT: dT };
    } else if (L === 1) {
      mode = 'm';
      text = 'Mekkora tömegű ' + mt[0] + ' melegszik fel ' + nf(dT) + ' °C-kal ' + nf(Q / 1000) + ' kJ hő hatására? (' + C(cs) + ')';
      ans = A('m', m, 'kg');
      steps = ['Kiindulás: ' + C('Q = c · m · ΔT') + ', ebből ' + C('m = Q / (c · ΔT)'), 'A hőt váltsuk J-ba: ' + C(nf(Q / 1000) + ' kJ = ' + nf(Q) + ' J'), C('m = ' + nf(Q) + ' / (' + nf(c) + ' · ' + nf(dT) + ') = ' + nf(Q) + ' / ' + nf(c * dT) + ' = ' + nf(m) + ' kg')];
      hints = ['Fejezd ki m-et a ' + C('Q = c · m · ΔT') + ' képletből!', 'Ne felejtsd: a fajhő J-ban van megadva, ezért a hőt is J-ban kell beírni.', C('m = Q / (c · ΔT)')];
      data = { mode: mode, c: c, Q: Q, dT: dT };
    } else {
      mode = 'T2';
      var T0 = R.int(1, 4) * 5, Tf = T0 + dT;
      text = nf(m) + ' kg ' + mt[0] + ' kezdeti hőmérséklete ' + nf(T0) + ' °C. ' + nf(Q / 1000) + ' kJ hőt közlünk vele (veszteség nélkül). Mekkora lesz a hőmérséklete? (' + C(cs) + ')';
      ans = A('T', Tf, '°C');
      steps = ['Fejezzük ki a hőmérséklet-változást: ' + C('Q = c · m · ΔT') + ' → ' + C('ΔT = Q / (c · m)'), C('ΔT = ' + nf(Q) + ' J / (' + nf(c) + ' · ' + nf(m) + ') = ' + nf(Q) + ' / ' + nf(c * m) + ' = ' + nf(dT) + ' °C'), 'A végső hőmérséklet: ' + C('T = ' + nf(T0) + ' + ' + nf(dT) + ' = ' + nf(Tf) + ' °C')];
      hints = ['Előbb a hőmérséklet-változást (ΔT) számold ki, aztán add hozzá a kezdeti hőmérséklethez.', C('ΔT = Q / (c · m)') + ' – a kJ-t váltsd át J-ba!', C('ΔT = ' + nf(dT) + ' °C')];
      data = { mode: mode, c: c, m: m, Q: Q, T0: T0 };
    }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: data };
  });

  /* ---------- Kémia: vegyületek ---------- */
  var ATOM = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5 };
  var ANAME = { H: 'hidrogén', C: 'szén', N: 'nitrogén', O: 'oxigén', Na: 'nátrium', Mg: 'magnézium', Al: 'alumínium', S: 'kén', Cl: 'klór', K: 'kálium', Ca: 'kalcium', Fe: 'vas', Cu: 'réz' };
  var COMP = [
    ['H2O', 'víz', [['H', 2], ['O', 1]], 0], ['CO2', 'szén-dioxid', [['C', 1], ['O', 2]], 0], ['NaCl', 'nátrium-klorid (konyhasó)', [['Na', 1], ['Cl', 1]], 0],
    ['CH4', 'metán', [['C', 1], ['H', 4]], 0], ['NH3', 'ammónia', [['N', 1], ['H', 3]], 0], ['HCl', 'hidrogén-klorid', [['H', 1], ['Cl', 1]], 0],
    ['O2', 'oxigéngáz', [['O', 2]], 0], ['MgO', 'magnézium-oxid', [['Mg', 1], ['O', 1]], 0],
    ['H2SO4', 'kénsav', [['H', 2], ['S', 1], ['O', 4]], 1], ['NaOH', 'nátrium-hidroxid', [['Na', 1], ['O', 1], ['H', 1]], 1], ['CaCO3', 'kalcium-karbonát (mészkő)', [['Ca', 1], ['C', 1], ['O', 3]], 1],
    ['HNO3', 'salétromsav', [['H', 1], ['N', 1], ['O', 3]], 1], ['C2H5OH', 'etanol', [['C', 2], ['H', 6], ['O', 1]], 1], ['KCl', 'kálium-klorid', [['K', 1], ['Cl', 1]], 1],
    ['SO2', 'kén-dioxid', [['S', 1], ['O', 2]], 1], ['N2', 'nitrogéngáz', [['N', 2]], 1],
    ['C6H12O6', 'szőlőcukor (glükóz)', [['C', 6], ['H', 12], ['O', 6]], 2], ['Ca(OH)2', 'kalcium-hidroxid (oltott mész)', [['Ca', 1], ['O', 2], ['H', 2]], 2],
    ['Fe2O3', 'vas(III)-oxid', [['Fe', 2], ['O', 3]], 2], ['Al2O3', 'alumínium-oxid', [['Al', 2], ['O', 3]], 2], ['CuSO4', 'réz(II)-szulfát', [['Cu', 1], ['S', 1], ['O', 4]], 2],
    ['Al2(SO4)3', 'alumínium-szulfát', [['Al', 2], ['S', 3], ['O', 12]], 2], ['C12H22O11', 'répacukor (szacharóz)', [['C', 12], ['H', 22], ['O', 11]], 2], ['Mg(OH)2', 'magnézium-hidroxid', [['Mg', 1], ['O', 2], ['H', 2]], 2]
  ];
  function molar(cp) { return round(cp[2].reduce(function (s, e) { return s + ATOM[e[0]] * e[1]; }, 0), 6); }
  function pickComp(R, L) { var pool = COMP.filter(function (c) { return c[3] <= L; }), top = pool.filter(function (c) { return c[3] === L; }); return R.f() < 0.6 ? R.pick(top) : R.pick(pool); }
  function molarSteps(cp) {
    var M = molar(cp);
    return ['Bontsuk fel a képletet atomokra: ' + cp[2].map(function (e) { return e[1] + ' db ' + ANAME[e[0]] + ' (' + e[0] + ')'; }).join(', ') + (cp[0].indexOf('(') >= 0 ? ' – a zárójel utáni szám a zárójelen belül minden atomot szoroz!' : '') + '.',
      'Atomtömegek: ' + cp[2].map(function (e) { return C('A(' + e[0] + ') = ' + nf(ATOM[e[0]])); }).join(', ') + '. Ezek szorzata a darabszámmal: ' + cp[2].map(function (e) { return C(e[1] + ' · ' + nf(ATOM[e[0]]) + ' = ' + nf(e[1] * ATOM[e[0]])); }).join(', '),
      'Összeadva: ' + C('M(' + chem(cp[0]) + ') = ' + cp[2].map(function (e) { return nf(e[1] * ATOM[e[0]]); }).join(' + ') + ' = ' + nf(M) + ' g/mol')];
  }
  var ATOMNOTE = '(Kerekített atomtömegek: H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, Al = 27, S = 32, Cl = 35,5, K = 39, Ca = 40, Fe = 56, Cu = 63,5.)';

  /* ---------- 16. Moláris tömeg ---------- */
  add('molaris', 'kem', '⚛️', 'Moláris tömeg', 'Összegképletből: M = Σ (darab · atomtömeg)', function (R, L) {
    var cp = pickComp(R, L), M = molar(cp);
    return { text: 'Mekkora a(z) ' + cp[1] + ' moláris tömege? Képlete: ' + C(chem(cp[0])) + '\n' + ATOMNOTE, answers: [A('M', M, 'g/mol')],
      hints: ['A moláris tömeg az összegképletben lévő atomok atomtömegeinek összege (g/mol-ban).', 'Számold meg, melyik atomból hány darab van: ' + cp[2].map(function (e) { return e[0] + ': ' + e[1]; }).join(', ') + '.', 'Szorozd meg minden atom darabszámát az atomtömegével, és add össze!'],
      steps: molarSteps(cp), data: { f: cp[0] } };
  });

  /* ---------- 17. Anyagmennyiség ---------- */
  add('anyagmennyiseg', 'kem', '🧪', 'Anyagmennyiség (mól)', 'n = m / M, részecskeszám', function (R, L) {
    var cp = pickComp(R, Math.min(L, 1)), M = molar(cp), n = R.pick([0.1, 0.2, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), m = round(n * M, 6), mode = L === 0 ? 'n' : L === 1 ? R.pick(['n', 'm']) : R.pick(['N', 'Nm']);
    var steps, text, ans, hints, Mline = 'A moláris tömeg: ' + C('M(' + chem(cp[0]) + ') = ' + cp[2].map(function (e) { return (e[1] > 1 ? e[1] + '·' : '') + nf(ATOM[e[0]]); }).join(' + ') + ' = ' + nf(M) + ' g/mol');
    if (mode === 'n') { text = 'Hány mol ' + nf(m) + ' g ' + cp[1] + ' (' + chem(cp[0]) + ')?'; ans = A('n', n, 'mol'); steps = [Mline, 'Az anyagmennyiség: ' + C('n = m / M'), C('n = ' + nf(m) + ' g / ' + nf(M) + ' g/mol = ' + nf(n) + ' mol')]; hints = ['Először a moláris tömeg kell (atomtömegek összege).', C('M = ' + nf(M) + ' g/mol'), C('n = m / M')]; }
    else if (mode === 'm') { text = 'Hány gramm ' + nf(n) + ' mol ' + cp[1] + ' (' + chem(cp[0]) + ')?'; ans = A('m', m, 'g', { show: nf(m) }); steps = [Mline, C('n = m / M') + ', ebből ' + C('m = n · M'), C('m = ' + nf(n) + ' mol · ' + nf(M) + ' g/mol = ' + nf(m) + ' g')]; hints = ['Először a moláris tömeg kell.', C('M = ' + nf(M) + ' g/mol') + ' – ennyi 1 mol tömege.', C('m = n · M')]; }
    else if (mode === 'N') { text = 'Hány részecske (molekula vagy ionpár) van ennyi anyagban: ' + nf(n) + ' mol ' + cp[1] + ' (' + chem(cp[0]) + ')? (Avogadro-állandó: ' + C('N_A ≈ 6·10²³ 1/mol') + '; írd be pl. így: ' + C('3·10^23') + ')'; ans = A('N', n * 6e23, 'db', { kind: 'sci', rel: 0.005 }); steps = ['1 mol anyagban ' + C('6·10²³') + ' részecske van.', C('N = n · N_A'), C('N = ' + nf(n) + ' · 6·10²³ = ' + sci(n * 6e23) + ' db')]; hints = ['1 mol = 6·10²³ darab részecske.', C('N = n · N_A'), 'Az eredményt normálalakban add meg.']; }
    else { text = 'Hány részecske (molekula vagy ionpár) van ennyi anyagban: ' + nf(m) + ' g ' + cp[1] + ' (' + chem(cp[0]) + ')? (' + C('N_A ≈ 6·10²³ 1/mol') + '; írd be pl. így: ' + C('3·10^23') + ')'; ans = A('N', n * 6e23, 'db', { kind: 'sci', rel: 0.005 }); steps = [Mline, C('n = m / M = ' + nf(m) + ' / ' + nf(M) + ' = ' + nf(n) + ' mol'), C('N = n · N_A = ' + nf(n) + ' · 6·10²³ = ' + sci(n * 6e23) + ' db')]; hints = ['Két lépés: tömeg → mol → darabszám.', C('n = m / M = ' + nf(n) + ' mol'), C('N = n · 6·10²³')]; }
    if (cp[0] && /N_A/.test(text)) text = text.replace(/N_A/g, 'Nₐ');
    steps = steps.map(function (s) { return s.replace(/N_A/g, 'Nₐ'); }); hints = hints.map(function (s) { return s.replace(/N_A/g, 'Nₐ'); });
    return { text: text + (mode === 'N' ? '' : '\n' + ATOMNOTE), answers: [ans], hints: hints, steps: steps, data: { mode: mode, f: cp[0], n: n, m: m } };
  });

  /* ---------- 18. Oldatok ---------- */
  add('oldat', 'kem', '🥤', 'Oldat tömegszázaléka', 'w% = m(oldott anyag) / m(oldat) · 100', function (R, L) {
    var tot = R.pick([50, 100, 120, 150, 200, 250, 300, 400, 500, 800]), w = R.pick([2, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40]), mo = tot * w / 100, mv = tot - mo, steps, text, ans, hints, data;
    var SOL = R.pick([['cukor', 'cukrot', 'cukoroldat'], ['só', 'sót', 'sóoldat'], ['szódabikarbóna', 'szódabikarbónát', 'szódabikarbóna-oldat']]), sol = SOL[0], mode = L === 0 ? 'w' : L === 1 ? R.pick(['mo', 'mv']) : R.pick(['hig', 'kever']);
    if (Math.abs(mo - Math.round(mo * 10) / 10) > 1e-9) { tot = 200; mo = tot * w / 100; mv = tot - mo; }
    if (mode === 'w') { text = nf(mo) + ' g ' + SOL[1] + ' ' + nf(mv) + ' g vízben oldunk fel. Hány tömegszázalékos az oldat?'; ans = A('w', w, '%'); steps = ['Az oldat tömege az oldott anyag és az oldószer tömegének összege: ' + C('m(oldat) = ' + nf(mo) + ' + ' + nf(mv) + ' = ' + nf(tot) + ' g'), 'Tömegszázalék: ' + C('w% = m(oldott) / m(oldat) · 100'), C('w% = ' + nf(mo) + ' / ' + nf(tot) + ' · 100 = ' + nf(w) + '%')]; hints = ['Vigyázz: az oldat tömegébe a feloldott anyag is beleszámít!', C('m(oldat) = ' + nf(tot) + ' g'), C('w% = m(oldott) / m(oldat) · 100')]; data = { mode: mode, mo: mo, mv: mv }; }
    else if (mode === 'mo') { text = 'Hány gramm ' + sol + ' van ' + nf(tot) + ' g ' + nf(w) + ' tömegszázalékos ' + SOL[2] + 'ban?'; ans = A('m', mo, 'g'); steps = ['A ' + nf(w) + ' tömegszázalék azt jelenti, hogy 100 g oldatban ' + nf(w) + ' g oldott anyag van.', C('m(oldott) = m(oldat) · w% / 100'), C('m(oldott) = ' + nf(tot) + ' · ' + nf(w) + ' / 100 = ' + nf(mo) + ' g')]; hints = ['Mit jelent a ' + nf(w) + '%? 100 g oldatban ' + nf(w) + ' g ' + sol + ' van.', 'Ez százalékszámítás: alap = az oldat tömege.', C('m = ' + nf(tot) + ' · ' + nf(w) + ' / 100')]; data = { mode: mode, tot: tot, w: w }; }
    else if (mode === 'mv') { text = 'Hány gramm víz és ' + sol + ' kell ' + nf(tot) + ' g ' + nf(w) + ' tömegszázalékos oldat készítéséhez? Add meg a víz tömegét!'; ans = A('víz', mv, 'g'); steps = ['Az oldott anyag tömege: ' + C('m(' + sol + ') = ' + nf(tot) + ' · ' + nf(w) + ' / 100 = ' + nf(mo) + ' g'), 'A víz a maradék: ' + C('m(víz) = m(oldat) − m(' + sol + ')'), C('m(víz) = ' + nf(tot) + ' − ' + nf(mo) + ' = ' + nf(mv) + ' g')]; hints = ['Előbb számold ki, mennyi ' + sol + ' kell!', C('m(' + sol + ') = ' + nf(mo) + ' g'), 'A víz tömege = oldat − oldott anyag.']; data = { mode: mode, tot: tot, w: w }; }
    else if (mode === 'hig') {
      var add = R.pick([50, 100, 150, 200, 250, 300]), w2 = mo / (tot + add) * 100;
      text = nf(tot) + ' g ' + nf(w) + ' tömegszázalékos ' + SOL[2] + 'hoz ' + nf(add) + ' g vizet öntünk. Hány tömegszázalékos lesz az oldat? (Két tizedesjegyre kerekíts!)';
      ans = A('w', w2, '%');
      steps = ['Az oldott anyag tömege nem változik: ' + C('m(' + sol + ') = ' + nf(tot) + ' · ' + nf(w) + ' / 100 = ' + nf(mo) + ' g'), 'Az új oldat tömege: ' + C(nf(tot) + ' + ' + nf(add) + ' = ' + nf(tot + add) + ' g'), C('w% = ' + nf(mo) + ' / ' + nf(tot + add) + ' · 100 ≈ ' + nf(w2, 2) + '%')];
      hints = ['Hígításkor csak a víz mennyisége nő, az oldott anyagé nem!', C('m(' + sol + ') = ' + nf(mo) + ' g') + ' – ez marad.', 'Az új oldat tömege ' + nf(tot + add) + ' g. Számold ki az arányt!'];
      data = { mode: mode, tot: tot, w: w, add: add };
    } else {
      var tot2 = R.pick([100, 150, 200, 250, 300]), wb = R.pick([1, 2, 3, 5, 6]), mo2 = tot2 * wb / 100, wk = (mo + mo2) / (tot + tot2) * 100;
      if (wb === w) { wb = w + 1; mo2 = tot2 * wb / 100; wk = (mo + mo2) / (tot + tot2) * 100; }
      text = 'Összeöntünk ' + nf(tot) + ' g ' + nf(w) + '%-os és ' + nf(tot2) + ' g ' + nf(wb) + '%-os ' + SOL[2] + 'ot. Hány tömegszázalékos a keverék? (Két tizedesjegyre kerekíts!)';
      ans = A('w', wk, '%');
      steps = ['Oldott anyag az első oldatban: ' + C(nf(tot) + ' · ' + nf(w) + ' / 100 = ' + nf(mo) + ' g') + ', a másodikban: ' + C(nf(tot2) + ' · ' + nf(wb) + ' / 100 = ' + nf(mo2) + ' g'),
        'Összesen: ' + C(nf(mo) + ' + ' + nf(mo2) + ' = ' + nf(mo + mo2) + ' g') + ' oldott anyag, ' + C(nf(tot) + ' + ' + nf(tot2) + ' = ' + nf(tot + tot2) + ' g') + ' oldat.',
        C('w% = ' + nf(mo + mo2) + ' / ' + nf(tot + tot2) + ' · 100 ≈ ' + nf(wk, 2) + '%')];
      hints = ['A százalékokat NEM lehet egyszerűen átlagolni! Számold ki az oldott anyag tömegét mindkét oldatban.', 'Oldott anyag összesen: ' + nf(mo + mo2) + ' g.', 'Oldat összesen: ' + nf(tot + tot2) + ' g.'];
      data = { mode: mode, tot: tot, w: w, tot2: tot2, wb: wb };
    }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: data };
  });

  /* ---------- 19. pH ---------- */
  add('ph', 'kem', '🍋', 'pH erős savra és lúgra', 'pH = −lg[H⁺], pH + pOH = 14', function (R, L) {
    var acid = R.f() < 0.5, k = R.int(1, L === 0 ? 5 : 4), a = L === 0 ? 1 : R.int(2, 9), z = L === 2 ? 2 : 1;
    var sp = acid ? (z === 2 ? ['H2SO4', 'kénsav'] : R.pick([['HCl', 'sósav'], ['HNO3', 'salétromsav']])) : (z === 2 ? ['Ba(OH)2', 'bárium-hidroxid'] : R.pick([['NaOH', 'nátrium-hidroxid'], ['KOH', 'kálium-hidroxid']]));
    var c = a * Math.pow(10, -k), ion = z * c, lg = -Math.log(ion) / Math.LN10, pH = acid ? lg : 14 - lg;
    var cS = a === 1 ? '10' + sup(-k) : nf(a) + '·10' + sup(-k), ionS = z === 1 ? cS : sci(ion), I = acid ? '[H⁺]' : '[OH⁻]';
    var text = 'Mekkora a pH-ja a ' + C('c = ' + cS + ' mol/dm³') + ' koncentrációjú ' + sp[1] + (sp[1].indexOf('-') >= 0 ? '-oldatnak (' : 'oldatnak (') + chem(sp[0]) + ')? (25 °C' + (z === 2 ? '; tételezzük fel, hogy teljesen disszociál' : '') + (L === 0 ? '' : '; két tizedesjegyre kerekíts') + ')';
    var steps = [(acid ? 'Erős sav: vízben teljesen disszociál' : 'Erős bázis: vízben teljesen disszociál') + (z === 2 ? ', és egy egységéből ' + (acid ? '2 H⁺' : '2 OH⁻') + ' ion lesz: ' + C(I + ' = 2 · c = 2 · ' + cS + ' = ' + ionS + ' mol/dm³') : ': ' + C(I + ' = c = ' + cS + ' mol/dm³')),
      acid ? C('pH = −lg' + I + ' = −lg(' + ionS + ') = ' + nf(lg, L === 0 ? 0 : 4)) + (L === 0 ? '' : ' ≈ ' + nf(lg, 2))
        : C('pOH = −lg' + I + ' = −lg(' + ionS + ') = ' + nf(lg, L === 0 ? 0 : 4)),
    ];
    if (!acid) steps.push('25 °C-on ' + C('pH + pOH = 14') + ', tehát ' + C('pH = 14 − ' + nf(lg, L === 0 ? 0 : 4) + ' ≈ ' + nf(pH, 2)));
    steps.push(acid ? 'Az oldat savas (pH < 7).' : 'Az oldat lúgos (pH > 7).');
    steps[steps.length - 1] = 'Eredmény: ' + C('pH = ' + nf(pH, 2)) + ' – ' + steps[steps.length - 1];
    var hints = [acid ? 'Erős savnál ' + C('[H⁺]') + ' egyenlő a sav koncentrációjával' + (z === 2 ? ' – de a kénsav 2 H⁺-t ad le!' : '.') : 'Lúgnál előbb a pOH-t számold ki ' + C('[OH⁻]') + ' alapján' + (z === 2 ? ' – a Ba(OH)₂ 2 OH⁻-t ad!' : '.'),
      C(acid ? 'pH = −lg[H⁺]' : 'pOH = −lg[OH⁻]') + (a === 1 && z === 1 ? ' – 10 hatványánál ez épp a kitevő ellentettje.' : ' – használd a számológép log gombját.'),
      acid ? C('[H⁺] = ' + ionS) : C('pH = 14 − pOH')];
    return { text: text, answers: [A('pH', pH, '', { dp: 2, tol: 0.011 })], hints: hints, steps: steps, data: { acid: acid, c: c, z: z } };
  });

  /* ---------- 20. Kamatos kamat ---------- */
  add('kamatos', 'penz', '🏦', 'Kamatos kamat', 'Cₙ = C₀ · (1 + p/100)ⁿ', function (R, L) {
    var C0 = L === 0 ? R.int(1, 20) * 10000 : R.int(2, 100) * 10000, p = R.pick([[2, 3, 4, 5, 10], [2.5, 3, 3.5, 4, 5, 6, 7], [3, 4.5, 5.5, 6, 6.5, 8]][L]), n = L === 0 ? R.int(1, 3) : R.int(2, 10);
    var q = 1 + p / 100, Cn = C0 * Math.pow(q, n), interest = Cn - C0, ask = L === 2 ? 'kamat' : 'Cn', steps = [], qs = nf(q, 4);
    steps.push('A kamattényező: ' + C('q = 1 + p/100 = 1 + ' + nf(p) + '/100 = ' + qs) + '. Évente ennyivel szorzódik a pénz (a kamat is kamatozik).');
    if (n <= 4) {
      var cur = C0, lines = [];
      for (var i = 1; i <= n; i++) { var nx = cur * q; lines.push(C(i + '. év vége: ' + nf(cur, 2) + ' · ' + qs + ' = ' + nf(nx, 2) + ' Ft')); cur = nx; }
      steps.push('Évről évre:\n' + lines.join('\n'));
    } else steps.push('Képlet: ' + C('Cₙ = C₀ · qⁿ') + ', ahol ' + C('qⁿ = ' + qs + sup(n) + ' ≈ ' + nf(Math.pow(q, n), 6)));
    steps.push(C('Cₙ = ' + nf(C0) + ' · ' + qs + sup(n) + ' ≈ ' + nf(Cn, 0) + ' Ft'));
    if (ask === 'kamat') steps.push('A kapott kamat a végösszeg és a betét különbsége: ' + C(nf(Cn, 0) + ' − ' + nf(C0) + ' ≈ ' + nf(interest, 0) + ' Ft'));
    var v = ask === 'kamat' ? interest : Cn;
    return {
      text: nf(C0) + ' Ft-ot évi ' + nf(p) + '%-os kamatos kamatra teszünk le ' + n + ' évre (a kamatot évente jóváírják, és az is kamatozik). ' + (ask === 'kamat' ? 'Összesen hány forint kamatot kapunk?' : 'Mennyi pénzünk lesz a futamidő végén?') + ' (Egész forintra kerekíts!)',
      answers: [A(ask === 'kamat' ? 'kamat' : 'Cₙ', v, 'Ft', { dp: 0, tol: Math.max(1, Cn * 0.0001) })],
      hints: ['Kamatos kamatnál minden évben az előző év végi összeg kamatozik: évente ' + qs + '-del szorzunk.', 'Képlet: ' + C('Cₙ = C₀ · (1 + p/100)ⁿ') + '.', C('(' + qs + ')' + sup(n) + ' ≈ ' + nf(Math.pow(q, n), 4)) + (ask === 'kamat' ? ' – a végén vond le a betétet!' : '')],
      steps: steps, data: { C0: C0, p: p, n: n, ask: ask }
    };
  });

  /* ---------- 21. ÁFA ---------- */
  add('afa', 'penz', '🧾', 'ÁFA: nettó és bruttó ár', 'bruttó = nettó · (1 + kulcs/100)', function (R, L) {
    var k = L === 0 ? 27 : R.pick([27, 27, 18, 5]), net = R.int(L === 0 ? 1 : 2, L === 0 ? 50 : 500) * 100, gr = net * (100 + k) / 100, vat = gr - net, f = nf(1 + k / 100), mode = ['b', 'n', 'v'][L];
    var steps, text, ans, hints;
    if (mode === 'b') { text = 'Egy termék nettó ára ' + nf(net) + ' Ft, az ÁFA-kulcs ' + k + '%. Mennyi a bruttó ár (amit a vásárló fizet)?'; ans = A('bruttó', gr, 'Ft', { dp: 0 }); steps = ['Az ÁFA a nettó ár ' + k + '%-a: ' + C(nf(net) + ' · ' + k + ' / 100 = ' + nf(vat) + ' Ft'), 'Bruttó = nettó + ÁFA: ' + C(nf(net) + ' + ' + nf(vat) + ' = ' + nf(gr) + ' Ft'), 'Egy lépésben: ' + C('bruttó = nettó · ' + f + ' = ' + nf(gr) + ' Ft')]; hints = ['A bruttó ár = nettó ár + ÁFA.', 'Az ÁFA a nettó ár ' + k + '%-a.', 'Gyorsabban: szorozd a nettó árat ennyivel: ' + C(f) + '.']; }
    else if (mode === 'n') { text = 'Egy termék bruttó ára ' + nf(gr) + ' Ft, az ÁFA-kulcs ' + k + '%. Mennyi a nettó ára?'; ans = A('nettó', net, 'Ft', { dp: 0 }); steps = ['A bruttó ár a nettó ' + nf(100 + k) + '%-a: ' + C('bruttó = nettó · ' + f), 'Ezért visszafelé osztunk: ' + C('nettó = bruttó / ' + f), C('nettó = ' + nf(gr) + ' / ' + f + ' = ' + nf(net) + ' Ft') + ' – figyeld meg: ez NEM ugyanaz, mint a bruttó árból ' + k + '%-ot levonni!']; hints = ['A bruttó ár a nettó ár ' + nf(100 + k) + '%-a – tehát itt a nettó az alap (100%).', 'Ne a bruttóból vonj le ' + k + '%-ot! Oszd el a bruttó árat ennyivel: ' + C(f) + '.', C('nettó = bruttó / ' + f)]; }
    else { text = 'Egy termék bruttó ára ' + nf(gr) + ' Ft, az ÁFA-kulcs ' + k + '%. Hány forint ÁFA van az árban?'; ans = A('ÁFA', vat, 'Ft', { dp: 0 }); steps = ['Először a nettó ár: ' + C('nettó = bruttó / ' + f + ' = ' + nf(gr) + ' / ' + f + ' = ' + nf(net) + ' Ft'), 'Az ÁFA a különbség: ' + C('ÁFA = bruttó − nettó = ' + nf(gr) + ' − ' + nf(net) + ' = ' + nf(vat) + ' Ft'), 'Ellenőrzés: ' + C(nf(net) + ' · ' + k + '% = ' + nf(vat) + ' Ft') + ' ✔ (a bruttó árnak ez csak ' + nf(k / (100 + k) * 100, 1) + '%-a!)']; hints = ['Az ÁFA a NETTÓ ár ' + k + '%-a, nem a bruttóé!', 'Számold ki előbb a nettó árat: ' + C('nettó = bruttó / ' + f) + '.', 'ÁFA = bruttó − nettó.']; }
    return { text: text, answers: [ans], hints: hints, steps: steps, data: { k: k, net: net, gr: gr, mode: mode } };
  });

  /* ================= generálás és ellenőrzés ================= */
  function generate(tipus, level, seed) {
    var T = TYPES[tipus]; if (!T) return null;
    level = Math.max(0, Math.min(2, +level || 0));
    if (seed == null) seed = Math.floor(Math.random() * 1e9) + 1;
    var p = T.gen(mkRng(seed), level);
    p.tipus = tipus; p.level = level; p.seed = seed;
    return p;
  }
  function parseInput(str) {
    var s = String(str == null ? '' : str).replace(/[\s  ]/g, '').replace(/[−–]/g, '-').replace(/,/g, '.');
    s = s.replace(/[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű°%Ωμ][^0-9]*$/, '');
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+$/, function (m) { return '^' + m.split('').map(function (c) { return '⁻⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c) === 0 ? '-' : String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)); }).join(''); });
    if (!s) return null;
    var m = s.match(/^([-+]?\d*\.?\d+)(?:e|[*·x×]10\^?)([-+]?\d+)$/i);
    if (m) return { v: parseFloat(m[1]) * Math.pow(10, parseInt(m[2], 10)), sci: true };
    m = s.match(/^10\^([-+]?\d+)$/);
    if (m) return { v: Math.pow(10, parseInt(m[1], 10)), sci: true };
    m = s.match(/^([-+]?\d+)\/([-+]?\d+)$/);
    if (m) { var n = parseInt(m[1], 10), d = parseInt(m[2], 10); if (!d) return null; return { v: n / d, num: n, den: d }; }
    if (/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return { v: parseFloat(s) };
    return null;
  }
  function matchOne(a, inp) {
    var x = parseInput(inp);
    if (!x) return 'empty';
    var tol = a.tol != null ? a.tol : 0.51 * Math.pow(10, -a.dp) + 1e-9;
    if (a.rel) tol = Math.max(tol, Math.abs(a.v) * a.rel);
    if (a.kind === 'frac') tol = a.tol != null ? a.tol : 1e-9;
    var ok = Math.abs(x.v - a.v) <= tol;
    if (ok && a.kind === 'frac' && x.den != null && gcd(x.num, x.den) !== 1) return 'simplify';
    return ok ? 'ok' : 'bad';
  }
  function check(p, inputs) {
    var res = p.answers.map(function (a, i) { return matchOne(a, inputs[i]); });
    if (p.unordered && p.answers.length === 2 && res.join() !== 'ok,ok') {
      var alt = [matchOne(p.answers[1], inputs[0]), matchOne(p.answers[0], inputs[1])];
      if (alt.filter(function (r) { return r === 'ok'; }).length > res.filter(function (r) { return r === 'ok'; }).length) res = alt;
    }
    return { ok: res.every(function (r) { return r === 'ok'; }), parts: res };
  }

  /* ================= felület ================= */
  var SKEY = 'lepesek';
  function stats() { var s = S.store.get(SKEY, null) || {}; s.pont = s.pont || 0; s.sorozat = s.sorozat || 0; s.legjobb = s.legjobb || 0; s.jo = s.jo || 0; s.ossz = s.ossz || 0; s.tipusok = s.tipusok || {}; return s; }
  function getLevel() { var l = S.store.get(SKEY + '.szint', 1); return l === 0 || l === 1 || l === 2 ? l : 1; }
  function txt(s) { return String(s).split('\n').map(S.inline).join('<br>'); }
  function groupTitle(g) { return GROUPS.filter(function (x) { return x[0] === g; })[0][1]; }
  function statLine(s) { return '<span>🔥 Sorozat: <b>' + s.sorozat + '</b></span><span>🏆 Rekord: <b>' + s.legjobb + '</b></span><span>⭐ Pont: <b>' + s.pont + '</b></span><span>✅ ' + s.jo + ' / ' + s.ossz + ' feladat</span>'; }

  /* Egy feladat megoldófelülete. opts: { tipus, level, seed, onNew(level) } */
  function mountSolver(box, opts) {
    var p = generate(opts.tipus, opts.level, opts.seed), T = TYPES[p.tipus];
    var hintN = 0, stepN = 0, solved = false, revealed = false, failed = false, counted = false;
    box.innerHTML =
      '<div class="lp-head"><span class="lp-tag">' + esc(groupTitle(T.group)) + ' · ' + esc(T.title) + '</span><span class="lp-lvl lp-l' + p.level + '">' + LEVELS[p.level] + '</span></div>' +
      '<div class="lp-text">' + txt(p.text) + '</div>' +
      '<form class="lp-form" autocomplete="off">' + p.answers.map(function (a, i) {
        var ph = a.kind === 'frac' ? 'pl. 5/6' : a.kind === 'sci' ? 'pl. 4,2·10^-3' : 'pl. 12,5';
        return '<label class="lp-in"><span class="lp-lab">' + esc(a.label) + ' =</span><input type="text" inputmode="' + (a.kind === 'num' ? 'decimal' : 'text') + '" data-i="' + i + '" placeholder="' + ph + '" aria-label="' + esc(a.label) + '">' + (a.unit ? '<small>' + esc(a.unit) + '</small>' : '') + '</label>';
      }).join('') + '<button type="submit" class="btn primary">Ellenőrzés</button></form>' +
      '<div class="lp-fb" aria-live="polite"></div>' +
      '<div class="lp-acts"><button type="button" class="btn" data-a="hint">💡 Tipp 1</button><button type="button" class="btn" data-a="step">👣 Következő lépés</button>' +
      '<button type="button" class="btn" data-a="all">📖 Teljes megoldás</button><button type="button" class="btn lp-new" data-a="new">🔄 Kérj hasonló feladatot</button></div>' +
      '<div class="lp-hints"></div><ol class="lp-steps"></ol>' +
      '<div class="lp-stats">' + statLine(stats()) + '</div>';
    var fb = box.querySelector('.lp-fb'), hb = box.querySelector('[data-a=hint]'), sb = box.querySelector('[data-a=step]'), ab = box.querySelector('[data-a=all]');
    function save(fn) { var s = stats(); fn(s); S.store.set(SKEY, s); box.querySelector('.lp-stats').innerHTML = statLine(s); }
    function answerText() { return p.answers.map(function (a) { return '<code>' + esc(a.label + ' = ' + a.show + (a.unit ? ' ' + a.unit : '')) + '</code>'; }).join(' és '); }
    function paintHints() {
      box.querySelector('.lp-hints').innerHTML = p.hints.slice(0, hintN).map(function (h, i) { return '<div class="lp-hint"><b>Tipp ' + (i + 1) + ':</b> ' + txt(h) + '</div>'; }).join('');
      if (hintN >= p.hints.length) { hb.disabled = true; hb.textContent = '💡 Nincs több tipp'; } else hb.textContent = '💡 Tipp ' + (hintN + 1);
    }
    function paintSteps() {
      box.querySelector('.lp-steps').innerHTML = p.steps.slice(0, stepN).map(function (s, i) { return '<li class="lp-step' + (i === stepN - 1 ? ' lp-fresh' : '') + '">' + txt(s) + '</li>'; }).join('');
      if (stepN >= p.steps.length) {
        sb.disabled = true; ab.disabled = true; sb.textContent = '👣 Minden lépés látszik';
        if (!solved && !revealed) { revealed = true; fb.className = 'lp-fb w-msg'; fb.innerHTML = '📖 A helyes válasz: ' + answerText() + '. Kérj egy hasonló feladatot, és próbáld meg egyedül!'; }
      } else sb.textContent = '👣 Következő lépés (' + (stepN + 1) + '/' + p.steps.length + ')';
    }
    box.querySelector('.lp-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (solved) return;
      var inputs = Array.prototype.map.call(box.querySelectorAll('.lp-in input'), function (i) { return i.value; });
      if (inputs.every(function (v) { return !String(v).trim(); })) { fb.className = 'lp-fb w-msg bad'; fb.textContent = 'Írd be a válaszodat a mezőbe!'; return; }
      var r = check(p, inputs);
      box.querySelectorAll('.lp-in').forEach(function (l, i) { l.classList.toggle('lp-ok', r.parts[i] === 'ok'); l.classList.toggle('lp-bad', r.parts[i] === 'bad'); });
      if (r.ok) {
        solved = true;
        var pts = revealed ? 0 : Math.max(0, 3 - hintN - stepN);
        save(function (s) {
          if (!counted) { s.ossz++; counted = true; var ts = s.tipusok[p.tipus] = s.tipusok[p.tipus] || { jo: 0, ossz: 0 }; ts.ossz++; }
          if (!revealed) { s.jo++; s.tipusok[p.tipus].jo++; }
          s.pont += pts;
          if (!revealed && pts > 0) { s.sorozat++; s.legjobb = Math.max(s.legjobb, s.sorozat); }
        });
        fb.className = 'lp-fb w-msg ok';
        fb.innerHTML = '✔ Helyes! ' + answerText() + (pts ? ' · +' + pts + ' pont' : '') + (revealed ? ' (a megoldás már látszott, ezért most nem jár pont)' : '') + '<br><small>Nézd meg a lépéseket is, vagy kérj egy hasonló feladatot!</small>';
        box.querySelector('.lp-new').classList.add('lp-pulse');
      } else {
        var simp = r.parts.indexOf('simplify') >= 0, empty = r.parts.indexOf('empty') >= 0;
        if (!counted) save(function (s) { s.ossz++; counted = true; var ts = s.tipusok[p.tipus] = s.tipusok[p.tipus] || { jo: 0, ossz: 0 }; ts.ossz++; });
        if (!failed && !simp) { failed = true; save(function (s) { s.sorozat = 0; }); }
        fb.className = 'lp-fb w-msg bad';
        fb.innerHTML = simp ? '🙂 Az érték jó, de a törtet még egyszerűsítsd!' : empty && p.answers.length > 1 ? 'Töltsd ki az összes mezőt! (Tizedesvesszőt is használhatsz.)'
          : '✗ Ez még nem jó. ' + (hintN < p.hints.length ? 'Kérj egy tippet, vagy nézd meg a következő lépést!' : 'Nézd meg a megoldás lépéseit!') + (r.parts.some(function (x) { return x === 'empty'; }) ? '' : ' <small>(Tizedesvesszőt is írhatsz, pl. 2,5.)</small>');
      }
    });
    hb.addEventListener('click', function () { if (hintN < p.hints.length) { hintN++; paintHints(); } });
    sb.addEventListener('click', function () { if (stepN < p.steps.length) { stepN++; paintSteps(); } });
    ab.addEventListener('click', function () { stepN = p.steps.length; paintSteps(); });
    box.querySelector('[data-a=new]').addEventListener('click', function () {
      if (opts.onNew) opts.onNew(p.level); else mountSolver(box, { tipus: p.tipus, level: p.level, onNew: null });
    });
    paintHints();
    return p;
  }

  function levelSeg(cur) {
    return '<div class="seg lp-seg" role="group" aria-label="Nehézség">' + LEVELS.map(function (t, i) {
      return '<button type="button" data-lvl="' + i + '" class="' + (i === cur ? 'on' : '') + '">' + ['🟢', '🟡', '🔴'][i] + ' ' + t + '</button>';
    }).join('') + '</div>';
  }
  function onLevel(root, cb) {
    root.querySelectorAll('[data-lvl]').forEach(function (b) {
      b.addEventListener('click', function () { var l = +b.dataset.lvl; S.store.set(SKEY + '.szint', l); cb(l); });
    });
  }

  function pageHub(main) {
    var lvl = getLevel(), st = stats();
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Feladatmegoldó</span></nav>' +
      '<h1>🧮 Lépésenkénti feladatmegoldó</h1>' +
      '<p class="muted">Válassz feladattípust! Minden feladat új, véletlen számokkal készül. Elakadtál? Kérj tippet, vagy fedd fel a megoldást lépésről lépésre. Tipp nélkül több pont jár.</p>' +
      '<div class="lp-bar"><div><small>Nehézség</small>' + levelSeg(lvl) + '</div><div class="lp-stats">' + statLine(st) + '</div></div>' +
      GROUPS.map(function (g) {
        var ids = ORDER.filter(function (id) { return TYPES[id].group === g[0]; });
        return '<h2 class="lp-gh">' + esc(g[1]) + '</h2><div class="lp-grid">' + ids.map(function (id) {
          var T = TYPES[id], ts = st.tipusok[id];
          return '<a class="card lp-tile" href="#/feladatok/' + id + '?szint=' + lvl + '"><span class="lp-ico" aria-hidden="true">' + T.icon + '</span><span><b>' + esc(T.title) + '</b><small>' + S.inline(T.desc) + '</small>' +
            (ts ? '<em>✅ ' + ts.jo + ' / ' + ts.ossz + '</em>' : '') + '</span></a>';
        }).join('') + '</div>';
      }).join('');
    onLevel(main, function () { pageHub(main); });
  }

  function pageType(main, tipus, params) {
    var T = TYPES[tipus]; if (!T) return false;
    var lvl = params && params.szint != null && /^[012]$/.test(params.szint) ? +params.szint : getLevel();
    var seed = params && params.seed && /^\d+$/.test(params.seed) ? +params.seed : null;
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/feladatok">Feladatmegoldó</a><span>›</span><span>' + esc(T.title) + '</span></nav>' +
      '<h1>' + T.icon + ' ' + esc(T.title) + '</h1><p class="muted">' + S.inline(T.desc) + '</p>' +
      '<div class="lp-bar"><div><small>Nehézség</small>' + levelSeg(lvl) + '</div></div>' +
      '<div class="card lp-card" id="lp-solver"></div>' +
      '<h2 class="lp-gh">Még több ' + esc(groupTitle(T.group).replace(/^\S+\s/, '').toLowerCase()) + '</h2><div class="chips">' +
      ORDER.filter(function (id) { return TYPES[id].group === T.group && id !== tipus; }).map(function (id) { return '<a class="chip" href="#/feladatok/' + id + '">' + TYPES[id].icon + ' ' + esc(TYPES[id].title) + '</a>'; }).join('') +
      '<a class="chip" href="#/feladatok">↩ Összes feladattípus</a></div>';
    var box = main.querySelector('#lp-solver');
    function run(l, s) { mountSolver(box, { tipus: tipus, level: l, seed: s, onNew: function (lv) { run(lv, null); box.scrollIntoView && box.scrollIntoView({ block: 'nearest' }); } }); }
    run(lvl, seed);
    onLevel(main, function (l) { main.querySelectorAll('[data-lvl]').forEach(function (b) { b.classList.toggle('on', +b.dataset.lvl === l); }); run(l, null); });
    return true;
  }

  S.addRoute('feladatok', {
    title: 'Lépésenkénti feladatmegoldó', nav: '',
    page: function (main, rest, params) {
      if (rest && rest[0]) return pageType(main, rest[0], params || {});
      pageHub(main); return true;
    }
  });

  S.addWidget('lepesek', function (el, o) {
    o = o || {};
    var tipus = TYPES[o.tipus] ? o.tipus : ORDER[Math.floor(Math.random() * ORDER.length)], T = TYPES[tipus];
    var lvl = o.szint === 0 || o.szint === 1 || o.szint === 2 ? o.szint : getLevel();
    el.innerHTML = '<div class="w-title">' + esc(o.title || T.icon + ' Gyakorló feladat: ' + T.title) + '</div>' +
      '<p class="w-help">' + S.inline(o.help || 'Oldd meg a feladatot! Ha elakadsz, kérj tippet, vagy nézd meg a megoldást lépésről lépésre.') + '</p>' +
      '<div class="lp-card lp-in-widget"></div><p class="lp-more"><a href="#/feladatok/' + tipus + '">Még több ilyen feladat →</a> · <a href="#/feladatok">Összes feladattípus</a></p>';
    mountSolver(el.querySelector('.lp-card'), { tipus: tipus, level: lvl });
  });

  /* Teszteléshez és más modulok számára. */
  S.lepesek = { TYPES: TYPES, ORDER: ORDER, GROUPS: GROUPS, generate: generate, check: check, parseInput: parseInput, nf: nf, ATOM: ATOM };
})();
