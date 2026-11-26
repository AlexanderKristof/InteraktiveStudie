/* Tudásműhely – 🎓 Érettségi próbavizsgák.
 * Saját, érettségi-SZERŰ feladatsorok (nem a hivatalos feladatlapok másolatai) hat tárgyból:
 * matematika (közép + emelt), fizika, kémia, biológia, történelem, informatika (digitális kultúra).
 * Minden feladat automatikusan javítható: feleletválasztás, többszörös választás, szám (tűréssel,
 * mértékegységgel, tizedesvesszővel), rövid szöveges válasz, párosítás, sorba rendezés, igaz/hamis.
 * A számolós feladatok egy része minden indításkor új számokkal készül (saját generátorok + STUDIE.lepesek).
 *   Oldalak: #/erettsegi · #/erettsegi/<targy> · #/erettsegi/<targy>/vizsga
 *            #/erettsegi/<targy>/eredmeny?id=… · #/erettsegi/<targy>/nyomtat?sor=…&seed=…&kulcs=0|1
 * Tárolás: 'erettsegi' → { cur: folyamatban lévő vizsga, hist: [eredmények] },  'erettsegi.ido' → időkeret-választás
 * A rosszul megoldott feleletválasztós kérdések az okos ismétlésbe kerülnek (S.srsRecord). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  /* ================= segédfüggvények ================= */
  function rng(seed) {
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
      pick: function (arr) { return arr[Math.floor(f() * arr.length)]; },
      shuf: function (arr) { var b = arr.slice(); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(f() * (i + 1)), t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
    };
    return R;
  }
  function mix(a, b) { var h = (a ^ Math.imul(b + 1, 0x9E3779B1)) >>> 0; h = Math.imul(h ^ (h >>> 16), 0x85EBCA6B) >>> 0; h = Math.imul(h ^ (h >>> 13), 0xC2B2AE35) >>> 0; return (h ^ (h >>> 16)) >>> 0 || 1; }
  function nf(x, dp) {
    if (dp == null) dp = 4;
    var p = Math.pow(10, dp), r = Math.round(x * p) / p;
    if (r === 0) r = 0;
    var s = Math.abs(r).toFixed(dp);
    if (dp > 0) s = s.replace(/\.?0+$/, '');
    var parts = s.split('.'), ip = parts[0];
    if (ip.length > 4) ip = ip.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (r < 0 ? '−' : '') + ip + (parts[1] ? ',' + parts[1] : '');
  }
  function C(s) { return '`' + s + '`'; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function binom(n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }
  function txt(s) { return String(s == null ? '' : s).split('\n').map(S.inline).join('<br>'); }
  function normTxt(s) { return S.norm(String(s || '')).replace(/[^a-z0-9]+/g, ' ').trim(); }
  var LET = 'ABCDEFGHIJ';
  var SUBD = '₀₁₂₃₄₅₆₇₈₉';
  function subn(n) { return String(n).split('').map(function (c) { return SUBD.charAt(+c); }).join(''); }

  /* ================= feladat-építők ================= */
  /* p = pontszám, ex = magyarázat a javítókulcsban */
  function MC(q, o, a, ex, p) { return { t: 'mc', q: q, o: o, a: a, ex: ex, p: p || 2 }; }
  function MU(q, o, a, ex, p) { return { t: 'multi', q: q, o: o, a: a, ex: ex, p: p || 3 }; }
  /* parts: [[címke, érték, mértékegység, abszolút tűrés, relatív tűrés, kijelzett tizedesjegy]] */
  function NU(q, parts, ex, p) {
    return { t: 'num', q: q, n: parts.map(function (x) { return { l: x[0], v: x[1], u: x[2] || '', tol: x[3], rel: x[4] || 0, dp: x[5] == null ? 3 : x[5] }; }), ex: ex, p: p || 2 };
  }
  function TX(q, acc, ex, p) { return { t: 'text', q: q, acc: acc, ex: ex, p: p || 2 }; }
  function PA(q, pairs, ex, p) { return { t: 'match', q: q, pairs: pairs, ex: ex, p: p || 4 }; }
  function SO(q, items, ex, p) { return { t: 'order', q: q, items: items, ex: ex, p: p || 4 }; }
  function IH(q, st, ex, p) { return { t: 'tf', q: q, st: st, ex: ex, p: p || 3 }; }
  function LP(tipus, L, p) { return { t: 'lp', tipus: tipus, L: L, p: p }; }
  function G(fn, p) { return { t: 'gen', fn: fn, p: p }; }

  /* ================= generátorok (minden indításkor új számok) ================= */
  var gen = {
    halmaz: function (R) {
      var k1 = R.pick([2, 3, 4]), k2, N = R.pick([30, 40, 48, 60]);
      do { k2 = R.pick([3, 5, 6, 7]); } while (k2 === k1);
      var l = k1 * k2 / gcd(k1, k2), inter = Math.floor(N / l), uni = Math.floor(N / k1) + Math.floor(N / k2) - inter;
      return NU('Legyen ' + C('A') + ' az 1 és ' + N + ' közötti egész számok (a határokat is beleértve) közül a ' + k1 + ' többszöröseinek halmaza, ' + C('B') + ' pedig ugyanezek közül a ' + k2 + ' többszöröseié. Hány eleme van az ' + C('A ∩ B') + ' és az ' + C('A ∪ B') + ' halmaznak?',
        [['|A ∩ B|', inter, 'db'], ['|A ∪ B|', uni, 'db']],
        'A metszetbe a ' + k1 + ' és ' + k2 + ' legkisebb közös többszörösének (' + C(String(l)) + ') többszörösei kerülnek: ' + C('⌊' + N + ' / ' + l + '⌋ = ' + inter) + '. Az unió elemszáma (szita-formula): ' + C('|A| + |B| − |A ∩ B| = ' + Math.floor(N / k1) + ' + ' + Math.floor(N / k2) + ' − ' + inter + ' = ' + uni) + '.');
    },
    szamtani: function (R) {
      var a1 = R.int(-8, 15), d = R.nz(-4, 6), n = R.int(12, 40), a3 = a1 + 2 * d, a7 = a1 + 6 * d, an = a1 + (n - 1) * d;
      return NU('Egy számtani sorozat harmadik tagja ' + C(nf(a3)) + ', hetedik tagja ' + C(nf(a7)) + '. Mennyi a sorozat differenciája és a ' + n + '. tagja?',
        [['d', d, ''], ['a' + subn(n), an, '']],
        C('a₇ − a₃ = 4d') + ', tehát ' + C('d = (' + nf(a7) + ' − ' + (a3 < 0 ? '(' + nf(a3) + ')' : nf(a3)) + ') / 4 = ' + nf(d)) + '. Az első tag ' + C('a₁ = a₃ − 2d = ' + nf(a1)) + ', így ' + C('a' + subn(n) + ' = a₁ + ' + (n - 1) + 'd = ' + nf(an)) + '.');
    },
    kocka: function (R) {
      var s = R.int(3, 11), c = 6 - Math.abs(s - 7);
      return NU('Két szabályos dobókockával dobunk egyszerre. Mennyi annak a valószínűsége, hogy a dobott számok összege ' + s + '? (Törtként, pl. ' + C('5/36') + ', vagy három tizedesjegyre kerekítve add meg.)',
        [['P', c / 36, '', 0.0011]],
        'Az összes (rendezett) kimenetel ' + C('6 · 6 = 36') + '. Az összeg ' + s + ' ennyi esetben: ' + c + '. ' + C('P = ' + c + '/36 ≈ ' + nf(c / 36, 3)) + '.');
    },
    stat: function (R) {
      var d = [], i; for (i = 0; i < 7; i++) d.push(R.int(4, 20));
      var sum = d.reduce(function (a, b) { return a + b; }, 0), srt = d.slice().sort(function (a, b) { return a - b; });
      return NU('Egy hétfős csoport dolgozatán ezek a pontszámok születtek: ' + C(d.join('; ')) + '. Számítsd ki a pontszámok átlagát (két tizedesjegyre) és mediánját!',
        [['átlag', sum / 7, 'pont', 0.011], ['medián', srt[3], 'pont']],
        'Átlag: ' + C(sum + ' / 7 ≈ ' + nf(sum / 7, 2)) + '. Medián: sorba rendezve ' + C(srt.join('; ')) + ', a középső (4.) adat ' + C(String(srt[3])) + '.');
    },
    log: function (R) {
      var b = R.pick([2, 3, 5, 10]), k = b === 2 ? R.int(3, 10) : b === 3 ? R.int(2, 6) : b === 5 ? R.int(2, 4) : R.int(2, 6), v = Math.pow(b, k);
      var name = b === 10 ? 'lg ' + nf(v, 0) : 'log' + subn(b) + ' ' + nf(v, 0);
      return NU('Mennyi ' + C(name) + ' értéke?', [['érték', k, '']],
        'A logaritmus az a kitevő, amelyre az alapot emelve a számot kapjuk: ' + C(b + '^' + k + ' = ' + nf(v, 0)) + ', tehát ' + C(name + ' = ' + k) + '.');
    },
    trig: function (R) {
      var al = R.int(20, 70), a = R.int(3, 15), rad = al * Math.PI / 180, c = a / Math.sin(rad), b = a / Math.tan(rad);
      return NU('Egy derékszögű háromszög egyik hegyesszöge ' + C('α = ' + al + '°') + ', az ezzel szemközti befogó ' + C('a = ' + a + ' cm') + '. Mekkora az átfogó és a másik befogó? (Két tizedesjegyre kerekíts.)',
        [['c', c, 'cm', 0.02, 0.003, 2], ['b', b, 'cm', 0.02, 0.003, 2]],
        C('sin α = a / c') + ' → ' + C('c = ' + a + ' / sin ' + al + '° ≈ ' + nf(c, 2) + ' cm') + '; ' + C('tg α = a / b') + ' → ' + C('b = ' + a + ' / tg ' + al + '° ≈ ' + nf(b, 2) + ' cm') + '.');
    },
    mertani: function (R) {
      var a1 = R.int(1, 5), q = R.pick([2, 3, -2]), n = R.int(5, 8), an = a1 * Math.pow(q, n - 1);
      return NU('Egy mértani sorozat első tagja ' + C(String(a1)) + ', hányadosa ' + C(nf(q)) + '. Mennyi a sorozat ' + n + '. tagja?', [['a' + subn(n), an, '']],
        C('aₙ = a₁ · q^(n−1)') + ', így ' + C('a' + subn(n) + ' = ' + a1 + ' · (' + nf(q) + ')^' + (n - 1) + ' = ' + nf(an)) + '.', 3);
    },
    komb: function (R) {
      var n = R.int(18, 32), sorrend = R.f() < 0.5;
      if (sorrend) {
        var v = n * (n - 1) * (n - 2);
        return NU('Egy ' + n + ' fős osztályban elnököt, titkárt és pénztárost választanak (egy ember csak egy tisztséget kaphat). Hányféleképpen tehetik ezt meg?', [['lehetőség', v, '']],
          'A sorrend (tisztség) számít: ' + C(n + ' · ' + (n - 1) + ' · ' + (n - 2) + ' = ' + nf(v, 0)) + ' (ismétlés nélküli variáció).', 3);
      }
      var c = binom(n, 3);
      return NU('Egy ' + n + ' fős osztályból háromfős küldöttséget választanak. Hányféleképpen tehetik ezt meg?', [['lehetőség', c, '']],
        'A sorrend nem számít, ezért kombinációról van szó: ' + C('(' + n + ' alatt a 3) = ' + n + '·' + (n - 1) + '·' + (n - 2) + ' / 6 = ' + nf(c, 0)) + '.', 3);
    },
    testatlo: function (R) {
      var a = R.int(2, 12);
      return NU('Egy kocka éle ' + C(a + ' cm') + '. Mekkora a testátlója (két tizedesjegyre) és a felszíne?',
        [['testátló', a * Math.sqrt(3), 'cm', 0.011], ['felszín', 6 * a * a, 'cm²']],
        'Testátló: ' + C('d = a√3 = ' + a + '√3 ≈ ' + nf(a * Math.sqrt(3), 2) + ' cm') + '. Felszín: ' + C('A = 6a² = 6 · ' + a * a + ' = ' + 6 * a * a + ' cm²') + '.');
    },
    sokszog: function (R) {
      var n = R.int(5, 15);
      return NU('Egy konvex sokszögnek ' + n + ' oldala van. Mennyi a belső szögeinek összege, és hány átlója van?',
        [['szögösszeg', (n - 2) * 180, '°'], ['átlók', n * (n - 3) / 2, 'db']],
        'Belső szögek összege: ' + C('(n − 2) · 180° = ' + (n - 2) + ' · 180° = ' + (n - 2) * 180 + '°') + '. Átlók száma: ' + C('n(n − 3)/2 = ' + n + ' · ' + (n - 3) + ' / 2 = ' + n * (n - 3) / 2) + '.');
    },
    koord: function (R) {
      var tr = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]), sw = R.f() < 0.5;
      var dx = (sw ? tr[1] : tr[0]) * (R.f() < 0.5 ? -1 : 1), dy = (sw ? tr[0] : tr[1]) * (R.f() < 0.5 ? -1 : 1);
      var x1 = R.int(-6, 6), y1 = R.int(-6, 6), x2 = x1 + dx, y2 = y1 + dy;
      return NU('Adott az ' + C('A(' + x1 + '; ' + y1 + ')') + ' és a ' + C('B(' + x2 + '; ' + y2 + ')') + ' pont. Mekkora az AB szakasz hossza, és melyek a felezőpontjának koordinátái?',
        [['|AB|', tr[2], ''], ['Fₓ', (x1 + x2) / 2, ''], ['Fᵧ', (y1 + y2) / 2, '']],
        C('|AB| = √((' + x2 + ' − ' + (x1 < 0 ? '(' + x1 + ')' : x1) + ')² + (' + y2 + ' − ' + (y1 < 0 ? '(' + y1 + ')' : y1) + ')²) = √(' + dx * dx + ' + ' + dy * dy + ') = ' + tr[2]) + '. Felezőpont: a koordináták számtani közepe, ' + C('F(' + nf((x1 + x2) / 2) + '; ' + nf((y1 + y2) / 2) + ')') + '.', 6);
    },
    urna: function (R) {
      var r = R.int(3, 8), k = R.int(2, 8), n = r + k;
      return NU('Egy dobozban ' + r + ' piros és ' + k + ' kék golyó van. Visszatevés nélkül kihúzunk kettőt. Mennyi a valószínűsége, hogy (a) az első piros; (b) mindkettő piros? (Három tizedesjegyre vagy törtként.)',
        [['P(a)', r / n, '', 0.0011], ['P(b)', r * (r - 1) / (n * (n - 1)), '', 0.0011]],
        '(a) ' + C(r + '/' + n + ' ≈ ' + nf(r / n, 3)) + '. (b) A második húzásnál már csak ' + (r - 1) + ' piros van ' + (n - 1) + ' golyó között: ' + C(r + '/' + n + ' · ' + (r - 1) + '/' + (n - 1) + ' = ' + r * (r - 1) + '/' + n * (n - 1) + ' ≈ ' + nf(r * (r - 1) / (n * (n - 1)), 3)) + '.', 6);
    },
    henger: function (R) {
      var r = R.int(2, 9), m = R.int(3, 20), V = r * r * Math.PI * m, A = 2 * r * r * Math.PI + 2 * r * Math.PI * m;
      return NU('Egy forgáshenger alapkörének sugara ' + C(r + ' cm') + ', magassága ' + C(m + ' cm') + '. Számítsd ki a térfogatát és a felszínét (egész értékre kerekítve)!',
        [['V', V, 'cm³', 1, 0.005, 0], ['A', A, 'cm²', 1, 0.005, 0]],
        C('V = r²π · m = ' + r * r + 'π · ' + m + ' ≈ ' + nf(V, 0) + ' cm³') + '; ' + C('A = 2r²π + 2rπm = ' + 2 * r * r + 'π + ' + 2 * r * m + 'π ≈ ' + nf(A, 0) + ' cm²') + '.', 8);
    },
    /* --- emelt matematika --- */
    exp: function (R) {
      var a = R.int(2, 5), b = R.pick([2, 3]), x = R.int(2, b === 2 ? 7 : 5), c = a * Math.pow(b, x);
      return NU('Oldd meg a valós számok halmazán: ' + C(a + ' · ' + b + '^x = ' + nf(c, 0)), [['x', x, '']],
        'Mindkét oldalt ' + a + '-' + (a === 2 ? 'vel' : a === 5 ? 'tel' : a === 3 ? 'mal' : 'gyel') + ' osztva: ' + C(b + '^x = ' + nf(c / a, 0) + ' = ' + b + '^' + x) + '; az exponenciális függvény szigorú monotonitása miatt ' + C('x = ' + x) + '.', 5);
    },
    logegy: function (R) {
      var b = R.pick([2, 3]), k = R.int(2, 5), a = R.nz(-5, 9), x = Math.pow(b, k) - a;
      return NU('Oldd meg a valós számok halmazán: ' + C('log' + subn(b) + '(x ' + (a < 0 ? '− ' + -a : '+ ' + a) + ') = ' + k), [['x', x, '']],
        'A logaritmus definíciója szerint ' + C('x ' + (a < 0 ? '− ' + -a : '+ ' + a) + ' = ' + b + '^' + k + ' = ' + Math.pow(b, k)) + ', így ' + C('x = ' + x) + '. Ellenőrzés: az argumentum pozitív (' + Math.pow(b, k) + ' > 0), tehát a gyök megfelel.', 5);
    },
    integral: function (R) {
      var a = R.pick([1, 3, 6]), k = R.int(1, 4), c = R.int(0, 5), v = a * k * k * k / 3 + c * k;
      return NU('Számítsd ki a határozott integrált: ' + C('∫₀^' + k + ' (' + (a === 1 ? '' : a) + 'x²' + (c ? ' + ' + c : '') + ') dx') + ' (két tizedesjegyre).', [['érték', v, '', 0.011]],
        'Primitív függvény: ' + C('F(x) = ' + (a === 1 ? 'x³/3' : a === 3 ? 'x³' : '2x³') + (c ? ' + ' + c + 'x' : '')) + '. Newton–Leibniz-formula: ' + C('F(' + k + ') − F(0) = ' + nf(v, 2)) + '.', 6);
    },
    deriv: function (R) {
      var p = R.int(1, 4), c = R.int(-10, 10), fm = -2 * p * p * p + c;
      return NU('Legyen ' + C('f(x) = x³ − ' + 3 * p * p + 'x' + (c ? (c < 0 ? ' − ' + -c : ' + ' + c) : '')) + '. Hol van az ' + C('f') + ' függvénynek helyi minimuma, és mennyi ott a függvényérték?',
        [['x', p, ''], ['f(x)', fm, '']],
        C('f′(x) = 3x² − ' + 3 * p * p) + ', ennek zérushelyei ' + C('x = ±' + p) + '. ' + C('f″(x) = 6x') + ', ' + C('f″(' + p + ') = ' + 6 * p + ' > 0') + ', tehát ' + C('x = ' + p) + '-ben helyi minimum van: ' + C('f(' + p + ') = ' + p * p * p + ' − ' + 3 * p * p * p + (c ? (c < 0 ? ' − ' + -c : ' + ' + c) : '') + ' = ' + fm) + '.', 6);
    },
    szamossz: function (R) {
      var a1 = R.int(-5, 12), d = R.nz(-3, 7), n = R.int(15, 60), s = n * (2 * a1 + (n - 1) * d) / 2;
      return NU('Egy számtani sorozat első tagja ' + C(nf(a1)) + ', differenciája ' + C(nf(d)) + '. Mennyi az első ' + n + ' tag összege?', [['Sₙ', s, '']],
        C('Sₙ = n · (2a₁ + (n − 1)d) / 2 = ' + n + ' · (' + 2 * a1 + ' + ' + (n - 1) * d + ') / 2 = ' + nf(s)) + '.', 5);
    },
    binomp: function (R) {
      var n = R.int(4, 8), k = R.int(1, n - 1), P = binom(n, k) / Math.pow(2, n);
      return NU('Egy szabályos érmét ' + n + ' alkalommal feldobunk. Mennyi a valószínűsége, hogy pontosan ' + k + ' fejet dobunk? (Négy tizedesjegyre vagy törtként.)', [['P', P, '', 0.00011]],
        'Binomiális eloszlás: ' + C('P = (' + n + ' alatt a ' + k + ') · 0,5^' + n + ' = ' + binom(n, k) + ' / ' + Math.pow(2, n) + ' ≈ ' + nf(P, 4)) + '.', 6);
    },
    koszinusz: function (R) {
      var a = R.int(3, 12), b = R.int(3, 12), g = R.pick([60, 120]), c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(g * Math.PI / 180));
      return NU('Egy háromszög két oldala ' + C(a + ' cm') + ' és ' + C(b + ' cm') + ', az általuk közrezárt szög ' + C(g + '°') + '. Milyen hosszú a harmadik oldal? (Két tizedesjegyre.)', [['c', c, 'cm', 0.011, 0.002, 2]],
        'Koszinusztétel: ' + C('c² = a² + b² − 2ab · cos γ = ' + a * a + ' + ' + b * b + ' ' + (g === 60 ? '− ' + a * b : '+ ' + a * b) + ' = ' + Math.round(c * c)) + ' (mert ' + C('cos ' + g + '° = ' + (g === 60 ? '0,5' : '−0,5')) + '), így ' + C('c ≈ ' + nf(c, 2) + ' cm') + '.', 6);
    },
    variacio: function (R) {
      var k = R.int(3, 5), v = 1; for (var i = 0; i < k; i++) v *= 10 - i;
      return NU('Hány olyan ' + k + ' jegyű PIN-kód készíthető (a 0 is állhat elöl), amelyben minden számjegy különböző?', [['darab', v, '']],
        'Ismétlés nélküli variáció 10 elemből ' + k + ' hosszan: ' + C([10, 9, 8, 7, 6].slice(0, k).join(' · ') + ' = ' + nf(v, 0)) + '.', 4);
    },
    /* --- fizika --- */
    feldobas: function (R) {
      var v0 = R.int(2, 6) * 5, h = v0 * v0 / 20, t = v0 / 10;
      return NU('Egy labdát ' + C(v0 + ' m/s') + ' sebességgel függőlegesen feldobunk. Milyen magasra emelkedik, és mennyi idő alatt ér a pálya tetejére? (' + C('g = 10 m/s²') + ', a közegellenállás elhanyagolható.)',
        [['h', h, 'm', 0.06], ['t', t, 's', 0.06]],
        'A tetőponton a sebesség 0. ' + C('t = v₀ / g = ' + v0 + ' / 10 = ' + nf(t) + ' s') + '; ' + C('h = v₀² / (2g) = ' + v0 * v0 + ' / 20 = ' + nf(h) + ' m') + '.', 8);
    },
    utkozes: function (R) {
      var m1 = R.int(8, 15) * 100, v1 = R.int(5, 20), m2 = R.int(6, 15) * 100, u = m1 * v1 / (m1 + m2);
      return NU('Egy ' + C(m1 + ' kg') + ' tömegű autó ' + C(v1 + ' m/s') + ' sebességgel nekiütközik egy álló, ' + C(m2 + ' kg') + ' tömegű autónak, és a két jármű összekapcsolódva mozog tovább. Mekkora közös sebességgel indulnak el? (Két tizedesjegyre.)',
        [['u', u, 'm/s', 0.011, 0.003, 2]],
        'Lendületmegmaradás (tökéletesen rugalmatlan ütközés): ' + C('m₁v₁ = (m₁ + m₂) · u') + ', így ' + C('u = ' + m1 + ' · ' + v1 + ' / ' + (m1 + m2) + ' ≈ ' + nf(u, 2) + ' m/s') + '.', 8);
    },
    hullam: function (R) {
      var f = R.pick([170, 340, 425, 680, 850, 1360]), l = 340 / f;
      return NU('Egy hangvilla ' + C(f + ' Hz') + ' frekvenciájú hangot ad. Mekkora a hang hullámhossza levegőben, ha ott a hangsebesség ' + C('340 m/s') + '? Mennyi a rezgés periódusideje ezredmásodpercben?',
        [['λ', l, 'm', 0.0011], ['T', 1000 / f, 'ms', 0.006]],
        C('λ = c / f = 340 / ' + f + ' = ' + nf(l, 3) + ' m') + '; ' + C('T = 1 / f = 1 / ' + f + ' s ≈ ' + nf(1000 / f, 2) + ' ms') + '.', 6);
    },
    felezes: function (R) {
      var N0 = R.pick([1600, 3200, 6400, 8000]), T = R.int(2, 12), k = R.int(1, 4), N = N0 / Math.pow(2, k);
      return NU('Egy radioaktív minta ' + N0 + ' atommagot tartalmaz, a felezési idő ' + T + ' nap. Hány bomlatlan mag marad ' + k * T + ' nap múlva (várhatóan), és ez a kezdeti mennyiség hány százaléka?',
        [['N', N, 'db'], ['arány', 100 / Math.pow(2, k), '%', 0.011]],
        k * T + ' nap = ' + k + ' felezési idő, ezért ' + C('N = ' + N0 + ' / 2^' + k + ' = ' + nf(N)) + ', ami ' + C(nf(100 / Math.pow(2, k), 2) + '%') + '.', 6);
    },
    /* --- kémia --- */
    gaz: function (R) {
      var g = R.pick([['O₂', 32], ['CO₂', 44], ['N₂', 28], ['CH₄', 16], ['NH₃', 17]]), n = R.pick([0.5, 1.5, 2, 2.5, 3, 4]), m = n * g[1];
      return NU('Mekkora a térfogata ' + nf(m) + ' g ' + g[0] + '-gáznak standardállapotban (25 °C, 0,1 MPa; ' + C('Vₘ = 24,5 dm³/mol') + ')? Add meg az anyagmennyiséget is!',
        [['n', n, 'mol', 0.011], ['V', n * 24.5, 'dm³', 0.06]],
        C('M(' + g[0] + ') = ' + g[1] + ' g/mol') + ', ' + C('n = m / M = ' + nf(m) + ' / ' + g[1] + ' = ' + nf(n) + ' mol') + ', ' + C('V = n · Vₘ = ' + nf(n) + ' · 24,5 = ' + nf(n * 24.5, 2) + ' dm³') + '.', 6);
    },
    eges: function (R) {
      var s = R.pick([['CH₄', 16, 1, 'CH₄ + 2 O₂ → CO₂ + 2 H₂O'], ['C₂H₆', 30, 2, '2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O'], ['C₃H₈', 44, 3, 'C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O']]);
      var n = R.pick([0.25, 0.5, 1, 1.5, 2, 2.5]), m = n * s[1], nc = n * s[2];
      return NU('Hány mol és hány gramm szén-dioxid keletkezik ' + nf(m) + ' g ' + s[0] + ' tökéletes égésekor? (Egyenlet: ' + C(s[3]) + '; ' + C('M(CO₂) = 44 g/mol') + '.)',
        [['n(CO₂)', nc, 'mol', 0.011], ['m(CO₂)', nc * 44, 'g', 0.06]],
        C('n(' + s[0] + ') = ' + nf(m) + ' / ' + s[1] + ' = ' + nf(n) + ' mol') + '. Az egyenlet szerint 1 mol ' + s[0] + '-ból ' + s[2] + ' mol CO₂ lesz: ' + C('n(CO₂) = ' + nf(nc) + ' mol') + ', ' + C('m = ' + nf(nc) + ' · 44 = ' + nf(nc * 44) + ' g') + '.', 6);
    },
    /* --- biológia --- */
    hw: function (R) {
      var q = R.pick([0.1, 0.2, 0.3, 0.4]), p = 1 - q;
      return NU('Egy nagy, ideális (Hardy–Weinberg-egyensúlyban lévő) populációban a recesszív tulajdonságot mutató egyedek aránya ' + nf(q * q * 100) + '%. Mekkora a recesszív allél gyakorisága (q), és hány százalék a heterozigóták aránya?',
        [['q', q, '', 0.006], ['2pq', 2 * p * q * 100, '%', 0.06]],
        'A recesszív fenotípusúak homozigóták: ' + C('q² = ' + nf(q * q)) + ' → ' + C('q = ' + nf(q)) + ', ' + C('p = 1 − q = ' + nf(p)) + '. Heterozigóták: ' + C('2pq = 2 · ' + nf(p) + ' · ' + nf(q) + ' = ' + nf(2 * p * q) + ' = ' + nf(2 * p * q * 100) + '%') + '.', 6);
    },
    mendel: function (R) {
      var N = R.int(10, 50) * 4;
      return NU('Két heterozigóta (' + C('Aa × Aa') + ') borsónövény keresztezéséből ' + N + ' utód született. Az A allél (sárga szín) dominál az a (zöld) felett. Várhatóan hány utód lesz sárga, és hány heterozigóta?',
        [['sárga', 3 * N / 4, 'db'], ['heterozigóta', N / 2, 'db']],
        'A Punnett-tábla szerint ' + C('AA : Aa : aa = 1 : 2 : 1') + '. Sárga (AA vagy Aa): ' + C('3/4 · ' + N + ' = ' + 3 * N / 4) + '; heterozigóta (Aa): ' + C('1/2 · ' + N + ' = ' + N / 2) + '.', 4);
    },
    /* --- informatika --- */
    dec2bin: function (R) {
      var n = R.int(20, 255), b = n.toString(2), pad = ('00000000' + b).slice(-8);
      var t = TX('Írd fel a ' + C(String(n)) + ' tízes számrendszerbeli számot kettes számrendszerben!', [b, pad],
        'Ismételt 2-vel osztás, a maradékokat alulról felfelé olvasva: ' + C(n + '₁₀ = ' + b + '₂') + '. Ellenőrzés helyiértékekkel: ' + b.split('').map(function (c, i) { return c === '1' ? Math.pow(2, b.length - 1 - i) : null; }).filter(function (x) { return x != null; }).join(' + ') + ' = ' + n + '.', 3);
      t.mono = true; return t;
    },
    bin2dec: function (R) {
      var n = R.int(33, 255), b = n.toString(2);
      return NU('Mennyi a ' + C(b + '₂') + ' kettes számrendszerbeli szám értéke tízes számrendszerben?', [['érték', n, '']],
        'Helyiértékek összege: ' + C(b.split('').map(function (c, i) { return c === '1' ? Math.pow(2, b.length - 1 - i) : null; }).filter(function (x) { return x != null; }).join(' + ') + ' = ' + n) + '.', 3);
    },
    ciklus: function (R) {
      var n = R.int(12, 40), k = R.pick([2, 3, 5]), s = 0; for (var i = 1; i <= n; i++) if (i % k === 0) s += i;
      return NU('Mit ír ki az alábbi (mondatszerű leírással megadott) algoritmus?\n' + C('s := 0') + '\n' + C('Ciklus i := 1-től ' + n + '-ig') + '\n' + C('    Ha i mod ' + k + ' = 0 akkor s := s + i') + '\n' + C('Ciklus vége') + '\n' + C('Ki: s'),
        [['s', s, '']],
        'Az algoritmus az 1 és ' + n + ' közötti számok közül a ' + k + ' többszöröseit adja össze: ' + C(k + ' + ' + 2 * k + ' + … + ' + Math.floor(n / k) * k + ' = ' + s) + '.', 4);
    },
    hafv: function (R) {
      var a = R.int(20, 90), v = a >= 50 ? a * 2 : a - 10;
      return NU('Az A1 cella értéke ' + C(String(a)) + '. Milyen érték jelenik meg abban a cellában, amelybe ezt írtuk: ' + C('=HA(A1>=50;A1*2;A1-10)') + '?', [['érték', v, '']],
        'A feltétel (' + C(a + ' >= 50') + ') ' + (a >= 50 ? 'igaz, ezért az „igaz” ág fut: ' + C(a + '·2 = ' + v) : 'hamis, ezért a „hamis” ág fut: ' + C(a + ' − 10 = ' + v)) + '.', 2);
    },
    maxmin: function (R) {
      var v = [R.int(1, 40), R.int(1, 40), R.int(1, 40), R.int(1, 40)], mx = Math.max.apply(null, v), mn = Math.min.apply(null, v), sm = v[0] + v[1] + v[2] + v[3];
      return NU('Az A1:A4 cellákban rendre ezek az értékek állnak: ' + C(v.join('; ')) + '. Mit adnak a ' + C('=MAX(A1:A4)-MIN(A1:A4)') + ' és a ' + C('=SZUM(A1:A4)/DARAB(A1:A4)') + ' képletek?',
        [['1. képlet', mx - mn, ''], ['2. képlet', sm / 4, '', 0.011]],
        'Terjedelem: ' + C(mx + ' − ' + mn + ' = ' + (mx - mn)) + '. A második képlet az átlag: ' + C(sm + ' / 4 = ' + nf(sm / 4, 2)) + '.', 4);
    },
    futas: function (R) {
      var a = R.int(0, 5), k = R.pick([2, 3, 4, 5]), b = a + k * R.int(4, 15) + R.int(0, k - 1), cnt = Math.floor((b - a) / k) + 1;
      return NU('Hányszor fut le a ciklusmag?\n' + C('for i in range(' + a + ', ' + (b + 1) + ', ' + k + '):') + '\n' + C('    print(i)'), [['darab', cnt, '']],
        'Az ' + C('i') + ' értékei: ' + a + ', ' + (a + k) + ', …, ' + (a + (cnt - 1) * k) + ' (a felső határ, ' + (b + 1) + ', már nem szerepel). Darabszám: ' + C('⌊(' + b + ' − ' + a + ') / ' + k + '⌋ + 1 = ' + cnt) + '.', 3);
    }
  };

  /* ================= tantárgyak és próbasorok ================= */
  var KOZEP = [80, 60, 40, 25], EMELT = [60, 47, 33, 25];
  var SUBJ = [
    {
      id: 'matematika', title: 'Matematika', icon: '📐', color: '#2357d9',
      valodi: 'Középszint: írásbeli <b>180 perc, 100 pont</b> – az I. rész (rövid feladatok) 45 perc és 30 pont, a II. rész (hosszabb, összetett feladatok, részben választhatók) 135 perc és 70 pont. Emelt szint: <b>240 perc, 115 pont</b> – I. rész 4 feladat (51 pont), II. rész 5 feladatból 4-et kell megoldani (4 × 16 = 64 pont). A valódi vizsgán a levezetés is pontot ér.',
      sets: [
        { id: 'k1', title: '1. próbasor (középszint)', szint: 'kozep', ido: 90, valodi: 180, sec: [
          { title: 'I. rész – rövid feladatok', items: [
            G(gen.halmaz, 2),
            LP('szazalek', 1, 2),
            LP('linearis', 1, 2),
            MC('Hol van az ' + C('f(x) = (x − 3)² − 4') + ' függvény minimumhelye?', ['x = 3', 'x = −3', 'x = −4', 'x = 4'], 0, 'Teljes négyzetes alakban ' + C('f(x) = (x − u)² + v') + ' a minimumhely ' + C('x = u') + ', itt ' + C('x = 3') + ' (a minimum értéke −4).'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['Minden rombusz paralelogramma.', true], ['Minden téglalap négyzet.', false], ['Van olyan háromszög, amelynek két derékszöge van.', false]], 'A rombusz szemközti oldalai párhuzamosak, így paralelogramma. A téglalap csak akkor négyzet, ha oldalai egyenlők. Két derékszög már 180°-ot adna, a harmadik szögre nem maradna semmi.'),
            G(gen.szamtani, 2),
            G(gen.kocka, 3),
            G(gen.stat, 4),
            G(gen.log, 2),
            LP('pitagorasz', 1, 3),
            TX('Mi a neve azoknak az egyeneseknek, amelyek közös metszéspontja a háromszög köré írt kör középpontja?', ['oldalfelező merőlegesek', 'oldalfelező merőleges', 'oldalfelező merőlegesei', 'szakaszfelező merőlegesek', 'szakaszfelező merőleges'], 'A köré írt kör középpontja a három csúcstól egyenlő távolságra van, ezért az oldalfelező merőlegesek metszéspontja.'),
            MU('Melyek prímszámok az alábbiak közül?', ['2', '9', '17', '21', '23', '1'], [0, 2, 4], 'Prímszám: pontosan két pozitív osztója van. A 9 = 3 · 3 és a 21 = 3 · 7 összetett, az 1-nek csak egy osztója van, ezért nem prím.')
          ] },
          { title: 'II. rész – összetett feladatok', items: [
            LP('masodfoku', 1, 6),
            LP('egyenletrendszer', 1, 6),
            LP('kamatos', 1, 6),
            SO('Rendezd a számokat növekvő sorrendbe!', ['1/4', '0,3', '3/8', '√0,16', '2⁻¹'], 'Tizedes tört alakban: 0,25 < 0,3 < 0,375 < 0,4 < 0,5.'),
            PA('Párosítsd a függvényeket a rájuk jellemző tulajdonsággal!', [['f(x) = 2x + 1', 'szigorúan monoton nő az egész számegyenesen'], ['f(x) = −x²', 'maximuma van, értéke 0'], ['f(x) = |x − 2|', 'minimumhelye x = 2'], ['f(x) = 1/x', 'x = 0-ban nincs értelmezve']], 'A lineáris függvény pozitív meredekséggel nő; a −x² parabola lefelé nyitott; az abszolútérték-függvény csúcsa (2; 0); az 1/x-nél 0-val nem lehet osztani.'),
            LP('kor', 1, 6),
            G(gen.trig, 6)
          ] }
        ] },
        { id: 'k2', title: '2. próbasor (középszint)', szint: 'kozep', ido: 90, valodi: 180, sec: [
          { title: 'I. rész – rövid feladatok', items: [
            LP('tortek', 1, 2),
            MC('Melyik az ' + C('5x − 3 > 2x + 9') + ' egyenlőtlenség megoldáshalmaza?', ['x > 4', 'x < 4', 'x > 2', 'x > 12/7'], 0, C('3x > 12') + ', pozitív számmal osztva az irány nem változik: ' + C('x > 4') + '.'),
            G(gen.mertani, 3),
            G(gen.testatlo, 2),
            LP('hatvany', 1, 2),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['A 0 páros szám.', true], ['A √2 racionális szám.', false], ['Egy szorzat pontosan akkor 0, ha legalább az egyik tényezője 0.', true]], 'A 0 osztható 2-vel. A √2 irracionális (nem írható fel két egész hányadosaként). A harmadik a szorzat zérustulajdonsága.'),
            TX('Hogyan nevezzük egy adatsor leggyakrabban előforduló értékét?', ['módusz', 'modusz'], 'Ez a módusz; a medián a középső érték, az átlag az összeg és a darabszám hányadosa.'),
            G(gen.komb, 3),
            MC('Melyik pont illeszkedik az ' + C('y = 2x − 3') + ' egyenletű egyenesre?', ['(2; 1)', '(1; 1)', '(0; 3)', '(3; 2)'], 0, 'Behelyettesítve: ' + C('2 · 2 − 3 = 1') + ' ✔. A többinél a jobb oldal nem egyezik az y-koordinátával.'),
            G(gen.sokszog, 2),
            MU('Mely állítások igazak az ' + C('f(x) = x²') + ' (x ∈ ℝ) függvényre?', ['páros függvény', 'értékkészlete a nemnegatív valós számok halmaza', 'az egész értelmezési tartományon szigorúan monoton nő', 'egyetlen zérushelye az x = 0', 'periodikus'], [0, 1, 3], 'A parabola szimmetrikus az y tengelyre (páros), értéke sosem negatív, 0-ban 0. A negatív számokon csökken, tehát nem monoton nő mindenhol; nem periodikus.', 4),
            LP('aranyossag', 1, 3)
          ] },
          { title: 'II. rész – összetett feladatok', items: [
            LP('egyenletrendszer', 2, 6),
            LP('masodfoku', 2, 6),
            G(gen.koord, 6),
            G(gen.urna, 6),
            PA('Párosítsd a statisztikai fogalmakat a jelentésükkel!', [['átlag', 'az adatok összege osztva a darabszámmal'], ['medián', 'a nagyság szerint rendezett adatsor középső értéke'], ['terjedelem', 'a legnagyobb és a legkisebb adat különbsége'], ['módusz', 'a leggyakoribb adat']], 'Ezek az érettségi alapfogalmai; páros elemszámnál a medián a két középső adat átlaga.'),
            SO('Rendezd helyes sorrendbe egy másodfokú egyenlet megoldásának lépéseit!', ['nullára rendezés (ax² + bx + c = 0 alak)', 'az együtthatók leolvasása', 'a diszkrimináns kiszámítása', 'a megoldóképlet alkalmazása', 'ellenőrzés behelyettesítéssel'], 'Az együtthatókat csak a 0-ra rendezett alakból lehet leolvasni, a diszkrimináns dönti el, hány gyök van.'),
            G(gen.henger, 8)
          ] }
        ] },
        { id: 'e1', title: 'Emelt szintű próbasor', szint: 'emelt', ido: 120, valodi: 240, sec: [
          { title: 'I. rész', items: [
            LP('masodfoku', 2, 5),
            G(gen.exp, 5),
            G(gen.logegy, 5),
            G(gen.koszinusz, 6),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['Minden deriválható függvény folytonos.', true], ['Minden folytonos függvény deriválható.', false], ['Ha f′(x₀) = 0, akkor x₀-ban biztosan szélsőérték van.', false], ['Az (1 + 1/n)ⁿ sorozat határértéke e.', true]], 'Az |x| folytonos, de 0-ban nem deriválható. Az x³ deriváltja 0-ban 0, mégsincs ott szélsőérték (inflexiós pont). Az e definíciója a megadott határérték.', 4)
          ] },
          { title: 'II. rész', items: [
            G(gen.deriv, 6),
            G(gen.integral, 6),
            G(gen.szamossz, 5),
            G(gen.binomp, 6),
            PA('Párosítsd a függvényeket a deriváltjukkal!', [['sin x', 'cos x'], ['eˣ', 'eˣ'], ['ln x (x > 0)', '1/x'], ['x⁵', '5x⁴']], 'Alapderiváltak: (sin x)′ = cos x, (eˣ)′ = eˣ, (ln x)′ = 1/x, (xⁿ)′ = n·xⁿ⁻¹.', 4),
            MU('Mely állítások igazak minden egyszerű gráfra?', ['A fokszámok összege páros.', 'A páratlan fokú csúcsok száma páros.', 'Minden fa összefüggő és körmentes.', 'Egy n csúcsú fának n éle van.', 'Minden összefüggő gráf fa.'], [0, 1, 2], 'A fokszámösszeg az élszám kétszerese, ezért páros, és emiatt a páratlan fokú csúcsok száma is páros. Az n csúcsú fának n − 1 éle van; a kört tartalmazó összefüggő gráf nem fa.', 4),
            G(gen.variacio, 4)
          ] }
        ] }
      ]
    },
    {
      id: 'fizika', title: 'Fizika', icon: '⚡', color: '#d97706',
      valodi: 'Középszint: írásbeli <b>150 perc, 90 pont</b> (2026-os tájékoztatás szerint) – feleletválasztós kérdéssor és összetett (számításos, forráselemző, jelenségértelmező, méréselemző) feladatok, utóbbiak egy részéből választani lehet. Emelt szint: 240 perc, 100 pont.',
      sets: [
        { id: 'k1', title: '1. próbasor', szint: 'kozep', ido: 75, valodi: 150, sec: [
          { title: 'I. rész – feleletválasztás', items: [
            MC('Egy test egyenes vonalú egyenletes mozgást végez. Mekkora a rá ható erők eredője?', ['nulla', 'a test súlyával egyenlő', 'a mozgás irányába mutat', 'a sebességgel arányos'], 0, 'Newton I. törvénye: ha az eredő erő nulla, a test megtartja egyenletes mozgását vagy nyugalmát.'),
            MC('A közegellenállás nélküli szabadesés során melyik mennyiség állandó?', ['a gyorsulás', 'a sebesség', 'a megtett út másodpercenként', 'a mozgási energia'], 0, 'A gyorsulás végig g ≈ 9,81 m/s²; a sebesség egyenletesen nő, így a másodpercenként megtett út és a mozgási energia is nő.'),
            MC('Mi történik a hanggal vákuumban?', ['nem terjed', 'fénysebességgel terjed', 'gyorsabban terjed, mint levegőben', 'csak magas hangok terjednek'], 0, 'A hang mechanikai hullám, terjedéséhez közeg (részecskék) kell.'),
            MC('Két egyforma, R ellenállású fogyasztót párhuzamosan kapcsolunk. Mekkora az eredő ellenállás?', ['R/2', '2R', 'R', 'R²'], 0, 'Párhuzamos kapcsolásnál ' + C('1/Re = 1/R + 1/R = 2/R') + ', tehát ' + C('Re = R/2') + '.'),
            MC('Melyik részecske töltése negatív?', ['elektron', 'proton', 'neutron', 'alfa-részecske'], 0, 'Az elektron töltése −e; a proton és az alfa-részecske pozitív, a neutron semleges.'),
            MC('Fény levegőből ferdén üvegbe lép. Mit mondhatunk a törési szögről?', ['kisebb a beesési szögnél', 'nagyobb a beesési szögnél', 'egyenlő a beesési szöggel', 'mindig 90°'], 0, 'Optikailag sűrűbb közegbe lépve a fény a beesési merőlegeshez törik.'),
            MC('Ideális gáz izoterm állapotváltozásánál melyik mennyiség állandó?', ['a nyomás és a térfogat szorzata', 'a nyomás', 'a térfogat', 'a nyomás és a térfogat hányadosa'], 0, 'Boyle–Mariotte-törvény: állandó hőmérsékleten ' + C('p · V = állandó') + '.'),
            MC('Mit jelent a felezési idő?', ['azt az időt, amely alatt a radioaktív magok fele elbomlik', 'a minta teljes elbomlásának felét', 'egy atommag élettartamának felét', 'azt az időt, amely alatt a sugárzás kétszeresére nő'], 0, 'Felezési idő alatt a még el nem bomlott magok száma (várhatóan) a felére csökken.'),
            MU('Melyek vektormennyiségek?', ['sebesség', 'erő', 'tömeg', 'munka', 'lendület (impulzus)', 'hőmérséklet'], [0, 1, 4], 'Vektormennyiségnek nagysága és iránya is van. A tömeg, a munka és a hőmérséklet skalár.'),
            PA('Párosítsd a fizikai mennyiségeket az SI-mértékegységükkel!', [['erő', 'newton (N)'], ['teljesítmény', 'watt (W)'], ['nyomás', 'pascal (Pa)'], ['elektromos töltés', 'coulomb (C)']], 'N = kg·m/s², W = J/s, Pa = N/m², C = A·s.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['A Föld körül keringő űrhajóban azért van súlytalanság, mert ott nincs gravitáció.', false], ['Zárt rendszer összenergiája állandó.', true], ['A vas ferromágneses anyag.', true]], 'Az űrhajóban is hat a gravitáció (ez tartja pályán); a súlytalanság oka, hogy az űrhajó és benne minden szabadon esik.'),
            TX('Hogyan nevezzük azt a jelenséget, amikor a változó mágneses mező feszültséget kelt egy vezetőben?', ['elektromágneses indukció', 'indukció', 'elektromagneses indukcio', 'mágneses indukció'], 'Ez az elektromágneses indukció (Faraday), ezen alapul a generátor és a transzformátor.')
          ] },
          { title: 'II. rész – számításos feladatok', items: [
            LP('gyorsulas', 1, 8),
            LP('ohm', 1, 8),
            LP('ho', 1, 8),
            G(gen.feldobas, 8),
            SO('Rendezd az elektromágneses sugárzásokat növekvő hullámhossz szerint!', ['gamma-sugárzás', 'röntgensugárzás', 'ultraibolya', 'látható fény', 'infravörös', 'rádióhullám'], 'A gamma-sugárzás hullámhossza a legrövidebb (energiája a legnagyobb), a rádióhullámé a leghosszabb.', 4)
          ] }
        ] },
        { id: 'k2', title: '2. próbasor', szint: 'kozep', ido: 75, valodi: 150, sec: [
          { title: 'I. rész – feleletválasztás', items: [
            MC('Az A test erőt fejt ki a B testre. Mit mondhatunk a B által az A-ra kifejtett erőről?', ['egyenlő nagyságú, ellentétes irányú, és az A testre hat', 'egyenlő nagyságú, azonos irányú', 'kisebb, mert B reagál', 'csak akkor létezik, ha B mozog'], 0, 'Newton III. törvénye (hatás–ellenhatás): az erőpár két különböző testre hat, ezért nem oltják ki egymást.'),
            MC('Mekkora egy nyugalomban lévő, 2 kg tömegű test súlya a Föld felszínén (g ≈ 10 m/s²)?', ['kb. 20 N', '2 N', '2 kg', '0,2 N'], 0, C('G = m · g = 2 · 10 = 20 N') + '. A kg tömegegység, nem erőegység.'),
            MC('Milyen mennyiség mértékegysége a kWh?', ['energia (munka)', 'teljesítmény', 'áramerősség', 'feszültség'], 0, '1 kWh = 1000 W · 3600 s = 3,6 MJ – energiaegység, ezt méri a villanyóra.'),
            MC('Soros kapcsolásnál melyik mennyiség azonos minden fogyasztón?', ['az áramerősség', 'a feszültség', 'a teljesítmény', 'az ellenállás'], 0, 'Soros körben ugyanaz a töltésáram folyik át minden elemen; a feszültség az ellenállások arányában oszlik meg.'),
            MC('Egy rugó megnyúlását kétszeresére növeljük. Hogyan változik a rugalmas energiája?', ['négyszeresére nő', 'kétszeresére nő', 'nem változik', 'felére csökken'], 0, C('E = ½ · D · x²') + ', a megnyúlás négyzetével arányos.'),
            MC('Melyik radioaktív sugárzás áthatolóképessége a legkisebb?', ['alfa', 'béta', 'gamma', 'röntgen'], 0, 'Az alfa-részecskéket már egy papírlap vagy néhány cm levegő is elnyeli.'),
            MC('Mi történik a fény frekvenciájával, amikor levegőből vízbe lép?', ['nem változik', 'nő', 'csökken', 'nullára csökken'], 0, 'A frekvenciát a forrás szabja meg; a sebesség és a hullámhossz csökken.'),
            MC('Melyik égitest a Föld természetes kísérője?', ['a Hold', 'a Nap', 'a Mars', 'a Vénusz'], 0, 'A Hold a Föld egyetlen természetes holdja; a Föld a Nap körül kering.'),
            MU('Melyek megújuló energiaforrások?', ['napenergia', 'szélenergia', 'földgáz', 'geotermikus energia', 'kőszén', 'urán'], [0, 1, 3], 'A földgáz és a kőszén fosszilis, az urán véges készletű nukleáris üzemanyag.'),
            PA('Párosítsd a tudósokat a munkásságukkal!', [['Isaac Newton', 'egyetemes tömegvonzás törvénye'], ['Michael Faraday', 'elektromágneses indukció'], ['Albert Einstein', 'speciális relativitáselmélet'], ['Eötvös Loránd', 'torziós inga, a súlyos és tehetetlen tömeg egyenlősége']], 'Eötvös Loránd ingájával nagy pontossággal kimutatta a súlyos és a tehetetlen tömeg arányosságát.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['Két test között hőmérséklet-különbség nélkül nincs (eredő) hőátadás.', true], ['A víz sűrűsége kb. 4 °C-on a legnagyobb.', true], ['A forráspont nem függ a külső nyomástól.', false]], 'Nagyobb nyomáson magasabb a forráspont (kukta), hegyen alacsonyabb.'),
            TX('Mi a neve a frekvencia SI-mértékegységének?', ['hertz', 'herc', 'hz'], '1 Hz = 1/s, vagyis másodpercenként egy rezgés.')
          ] },
          { title: 'II. rész – számításos feladatok', items: [
            LP('mozgas', 1, 6),
            LP('munka', 1, 8),
            LP('suruseg', 1, 6),
            G(gen.utkozes, 8),
            G(gen.hullam, 6),
            G(gen.felezes, 6)
          ] }
        ] }
      ]
    },
    {
      id: 'kemia', title: 'Kémia', icon: '⚗️', color: '#16a34a',
      valodi: 'Középszint: írásbeli <b>150 perc, 100 pont</b> (2024-től; korábban 120 perc). A feladatsor általános, szervetlen és szerves kémiai kérdéseket, valamint számítási feladatokat tartalmaz. Emelt szint: 240 perc, 100 pont.',
      sets: [
        { id: 'k1', title: '1. próbasor', szint: 'kozep', ido: 60, valodi: 150, sec: [
          { title: 'I. rész – elméleti feladatok', items: [
            MC('A magnézium rendszáma 12. Hány elektron van a Mg²⁺ ionban?', ['10', '12', '14', '2'], 0, 'A semleges atomnak 12 elektronja van; a 2+ ion két elektront leadott: 12 − 2 = 10 (neon-elektronszerkezet).'),
            MC('Milyen kémiai kötés tartja össze a nátrium-klorid kristályát?', ['ionkötés', 'kovalens kötés', 'fémes kötés', 'hidrogénkötés'], 0, 'Fém (Na) és nemfém (Cl) között nagy az elektronegativitás-különbség: Na⁺ és Cl⁻ ionok alakulnak ki.'),
            MC('Melyik molekula apoláris?', ['CO₂', 'H₂O', 'NH₃', 'HCl'], 0, 'A CO₂ lineáris, a két C=O kötés dipólusa kioltja egymást. A víz V alakú, az ammónia piramisos, a HCl kétatomos poláris.'),
            MC('Melyik gáz zavarosítja meg a meszes vizet?', ['szén-dioxid', 'oxigén', 'hidrogén', 'nitrogén'], 0, C('Ca(OH)₂ + CO₂ → CaCO₃ + H₂O') + ' – a vízben rosszul oldódó kalcium-karbonát csapadék okozza a zavarosodást.'),
            MC('Melyik oldat kémhatása lúgos?', ['nátrium-hidroxid-oldat', 'sósav', 'ecet', 'konyhasóoldat'], 0, 'A NaOH erős bázis (pH > 7). A sósav és az ecet savas, a konyhasóoldat semleges.'),
            MU('Melyek redoxireakciók?', ['Zn + 2 HCl → ZnCl₂ + H₂', 'CH₄ + 2 O₂ → CO₂ + 2 H₂O', 'NaOH + HCl → NaCl + H₂O', '2 Na + Cl₂ → 2 NaCl', 'CaCO₃ → CaO + CO₂'], [0, 1, 3], 'Redoxireakcióban változik az oxidációs szám (elektronátadás). A közömbösítés és a mészkő hőbontása nem jár oxidációsszám-változással.'),
            PA('Párosítsd a képleteket a köznapi nevükkel!', [['NaHCO₃', 'szódabikarbóna'], ['CaCO₃', 'mészkő'], ['CH₃COOH', 'ecetsav'], ['NaCl', 'konyhasó']], 'A szódabikarbóna nátrium-hidrogénkarbonát, a mészkő fő alkotója kalcium-karbonát.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['A nemesgázatomok külső elektronhéja telített (zárt).', true], ['A víz forráspontja a hidrogénkötések miatt viszonylag magas.', true], ['A katalizátor a reakció során elfogy.', false]], 'A katalizátor gyorsítja a reakciót (csökkenti az aktiválási energiát), de a folyamat végén változatlanul visszamarad.'),
            TX('Mi a neve a CH₄ képletű vegyületnek?', ['metán', 'metan'], 'A legegyszerűbb alkán, a földgáz fő összetevője.'),
            SO('Rendezd a 2. periódus elemeit növekvő elektronegativitás szerint!', ['Li', 'C', 'N', 'O', 'F'], 'A perióduson belül balról jobbra nő az elektronegativitás; a fluor a legnagyobb (4,0).')
          ] },
          { title: 'II. rész – számítások', items: [
            LP('molaris', 1, 4),
            LP('anyagmennyiseg', 1, 6),
            LP('oldat', 1, 6),
            LP('ph', 1, 6),
            G(gen.gaz, 6)
          ] }
        ] },
        { id: 'k2', title: '2. próbasor', szint: 'kozep', ido: 60, valodi: 150, sec: [
          { title: 'I. rész – elméleti feladatok', items: [
            MC('Hány vegyértékelektronja van a klóratomnak?', ['7', '1', '5', '17'], 0, 'A klór a 17. (VII. főcsoport) elem: ' + C('3s² 3p⁵') + ', 7 vegyértékelektron.'),
            MC('Egy főcsoporton belül felülről lefelé haladva hogyan változik az atomsugár?', ['nő', 'csökken', 'nem változik', 'előbb nő, majd csökken'], 0, 'Lefelé haladva egyre több elektronhéj van, ezért nő az atom mérete.'),
            MC('Melyik az etanol képlete?', ['C₂H₅OH', 'CH₃OH', 'CH₃COOH', 'C₂H₆'], 0, 'Az etanol (alkohol) két szénatomos, egy –OH csoporttal. CH₃OH: metanol, CH₃COOH: ecetsav, C₂H₆: etán.'),
            MC('Melyik anyag NEM elem?', ['víz', 'oxigéngáz', 'gyémánt', 'ózon'], 0, 'A víz vegyület (H₂O). Az O₂, az ózon (O₃) és a gyémánt (C) egyetlen elem atomjaiból áll.'),
            MC('Egy exoterm egyensúlyi reakció hőmérsékletét növeljük. Merre tolódik az egyensúly?', ['a kiindulási anyagok irányába', 'a termékek irányába', 'nem tolódik el', 'a reakció leáll'], 0, 'Le Châtelier–Braun-elv: a rendszer a hőt „felhasználó”, vagyis az endoterm (visszafelé irányuló) folyamatot segíti.'),
            MU('Melyek telítetlen szénhidrogének?', ['etén', 'etin', 'etán', 'propén', 'metán'], [0, 1, 3], 'A telítetlen vegyületekben C=C kettős vagy C≡C hármas kötés van (alkének, alkinek). Az etán és a metán alkán.'),
            PA('Párosítsd a funkciós csoportokat a vegyületcsoportokkal!', [['–OH (szénatomhoz kötve)', 'alkoholok'], ['–COOH', 'karbonsavak'], ['–CHO', 'aldehidek'], ['–NH₂', 'aminok']], 'A funkciós csoport határozza meg a vegyület jellemző kémiai tulajdonságait.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['Egy elem izotópjainak protonszáma azonos, neutronszáma különböző.', true], ['A savak vizes oldatának pH-ja 7-nél nagyobb.', false], ['A gyémánt és a grafit a szén allotróp módosulatai.', true]], 'Savas oldat pH-ja 7-nél kisebb (25 °C-on). Az allotróp módosulatok ugyanazon elem különböző szerkezetű formái.'),
            TX('Hogyan nevezzük azt a halmazállapot-változást, amelyben a szilárd anyag közvetlenül gázzá alakul?', ['szublimáció', 'szublimacio', 'szublimálás'], 'Például a jód vagy a szárazjég (szilárd CO₂) szublimál. A fordított folyamat a lecsapódás (kondenzáció szilárd fázisba).'),
            SO('Rendezd az alhéjakat a betöltődés sorrendjébe!', ['1s', '2s', '2p', '3s', '3p', '4s', '3d'], 'Az energiaszintek sorrendje miatt a 4s alhéj a 3d előtt töltődik be (pl. kálium, kalcium).')
          ] },
          { title: 'II. rész – számítások', items: [
            LP('molaris', 2, 4),
            LP('anyagmennyiseg', 2, 6),
            LP('oldat', 2, 6),
            LP('ph', 2, 6),
            G(gen.eges, 6)
          ] }
        ] }
      ]
    },
    {
      id: 'biologia', title: 'Biológia', icon: '🧬', color: '#0d9488',
      valodi: 'Középszint: írásbeli <b>120 perc, 100 pont</b> (a szóbeli 50 pont). A feladatsor sokféle feladattípusból áll; a vizsgázó szabadon oszthatja be az időt. Emelt szint: írásbeli 240 perc.',
      sets: [
        { id: 'k1', title: '1. próbasor', szint: 'kozep', ido: 50, valodi: 120, sec: [
          { title: 'Feladatsor', items: [
            MC('Hol zajlik a sejtlégzés utolsó szakasza (a terminális oxidáció)?', ['a mitokondriumban', 'a zöldszíntestben', 'a sejtmagban', 'a riboszómán'], 0, 'A terminális oxidáció a mitokondrium belső membránján megy végbe; itt keletkezik a legtöbb ATP.'),
            MC('Melyik szerv termeli az inzulint?', ['a hasnyálmirigy', 'a máj', 'a pajzsmirigy', 'a mellékvese'], 0, 'A hasnyálmirigy Langerhans-szigeteinek béta-sejtjei termelik; csökkenti a vércukorszintet.'),
            MC('Hány kromoszómát tartalmaz egy egészséges emberi testi sejt?', ['46', '23', '44', '92'], 0, '23 pár, azaz 46 kromoszóma (22 pár testi + 1 pár ivari kromoszóma). Az ivarsejtekben 23 van.'),
            MC('Melyik vércsoportú vörösvértest adható szükség esetén szinte bárkinek?', ['0 Rh−', 'AB Rh+', 'A Rh+', 'B Rh−'], 0, 'A 0 Rh− vörösvértesteken nincs A, B és D (Rh) antigén, ezért ez az „általános adó”.'),
            MC('Honnan származik a fotoszintézis során felszabaduló oxigén?', ['a vízből', 'a szén-dioxidból', 'a glükózból', 'a levegő nitrogénjéből'], 0, 'A fényszakaszban a víz bomlik (fotolízis), ebből lesz az O₂; a CO₂ szénatomjai a cukorba épülnek.'),
            MU('Melyek prokarióták?', ['baktériumok', 'cianobaktériumok', 'élesztőgomba', 'amőba', 'archeák'], [0, 1, 4], 'A prokarióták sejtjében nincs valódi sejtmag. Az élesztő (gomba) és az amőba eukarióta.'),
            PA('Párosítsd a szerveket a fő feladatukkal!', [['vese', 'a vér szűrése, vizeletképzés'], ['máj', 'epetermelés, méregtelenítés'], ['tüdő', 'gázcsere'], ['szív', 'a vér keringetése']], 'A szervek együttműködnek: a szív pumpál, a tüdő oxigénnel látja el a vért, a vese és a máj tisztít.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['A DNS-ben timin, az RNS-ben uracil található.', true], ['A vírusok önálló anyagcserével rendelkeznek.', false], ['Az enzimek csökkentik a reakciók aktiválási energiáját.', true]], 'A vírusok csak gazdasejtben szaporodnak, saját anyagcseréjük nincs.'),
            TX('Hogyan nevezzük azt a folyamatot, amelyben a növények fényenergia segítségével szén-dioxidból és vízből szerves anyagot állítanak elő?', ['fotoszintézis', 'fotoszintezis'], 'Bruttó egyenlete: ' + C('6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂') + '.'),
            SO('Rendezd a táplálék útjának állomásait helyes sorrendbe!', ['szájüreg', 'garat', 'nyelőcső', 'gyomor', 'vékonybél', 'vastagbél'], 'A tápanyagok felszívódása főleg a vékonybélben történik, a vastagbélben víz szívódik vissza.'),
            NU('Két heterozigóta (Aa) szülő gyermekénél hány százalék a valószínűsége, hogy a gyermek recesszív homozigóta (aa)?', [['valószínűség', 25, '%', 0.6]], 'A Punnett-táblában 4 egyenlő esélyű kombináció van (AA, Aa, aA, aa), ebből 1 aa: 25%.'),
            NU('Egy kettős szálú DNS-szakasz bázisainak 30%-a adenin. Hány százalék a guanin?', [['guanin', 20, '%', 0.6]], 'A = T = 30%, így A + T = 60%. A maradék 40% egyenlően oszlik meg G és C között: 20% guanin.', 3),
            MC('Melyik sejtalkotó végzi a fehérjeszintézist?', ['riboszóma', 'lizoszóma', 'Golgi-készülék', 'sejtközpont'], 0, 'A riboszómán az mRNS alapján aminosavakból fehérjelánc épül (transzláció).'),
            TX('Mi a neve a vörösvértestekben található, oxigént szállító fehérjének?', ['hemoglobin'], 'A hemoglobin vasat tartalmazó fehérje; a tüdőben megköti, a szövetekben leadja az oxigént.'),
            MU('Melyik állatok gerincesek?', ['béka', 'ponty', 'földigiliszta', 'éti csiga', 'denevér', 'keresztes pók'], [0, 1, 4], 'Gerinces: kétéltű (béka), hal (ponty), emlős (denevér). A giliszta gyűrűsféreg, a csiga puhatestű, a pók ízeltlábú.'),
            G(gen.hw, 6)
          ] }
        ] },
        { id: 'k2', title: '2. próbasor', szint: 'kozep', ido: 50, valodi: 120, sec: [
          { title: 'Feladatsor', items: [
            MC('Mi a sejtmag legfontosabb feladata?', ['a genetikai információ tárolása és a sejtműködés irányítása', 'az energiatermelés', 'a fehérjék lebontása', 'a fotoszintézis'], 0, 'A sejtmagban található a DNS nagy része; innen irányítja a fehérjeszintézist.'),
            MC('Melyik hormon emeli a vércukorszintet?', ['glukagon', 'inzulin', 'melatonin', 'oxitocin'], 0, 'A glukagon a máj glikogénjének lebontásával emeli a vércukorszintet; az inzulin ellentétesen hat.'),
            MC('Hol szívódik fel a tápanyagok nagy része?', ['a vékonybélben', 'a gyomorban', 'a vastagbélben', 'a nyelőcsőben'], 0, 'A vékonybél bélbolyhai hatalmas felszívó felületet biztosítanak.'),
            MC('Mi a mitózis eredménye?', ['két, az anyasejttel genetikailag azonos utódsejt', 'négy haploid ivarsejt', 'egy diploid zigóta', 'két haploid sejt'], 0, 'A mitózis számtartó osztódás (növekedés, regeneráció). Ivarsejtek meiózissal keletkeznek.'),
            MC('Melyik ér szállít oxigénben szegény vért?', ['a tüdőartéria (tüdőverőér)', 'az aorta', 'a tüdővéna (tüdőgyűjtőér)', 'a koszorúverőér'], 0, 'A tüdőartéria a jobb kamrából a tüdőbe viszi az oxigénben szegény vért; a tüdővéna oxigéndús vért hoz vissza.'),
            MU('Melyek a veleszületett (nem specifikus) védekezés részei?', ['a bőr mint mechanikai akadály', 'a falósejtek (fagociták)', 'az ellenanyagot termelő plazmasejtek', 'a láz', 'a memóriasejtek'], [0, 1, 3], 'A plazmasejtek és a memóriasejtek a szerzett (specifikus) immunitás részei.'),
            PA('Párosítsd a vitaminokat a hiánybetegségükkel!', [['C-vitamin', 'skorbut'], ['D-vitamin', 'angolkór (rachitisz)'], ['A-vitamin', 'farkasvakság'], ['B₁-vitamin', 'beriberi']], 'A D-vitamin a csontok kalciumbeépüléséhez, az A-vitamin a látáshoz szükséges.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['A növényi sejtfal fő alkotója a cellulóz.', true], ['Az ember érett vörösvértestjeiben van sejtmag.', false], ['Az ökoszisztémában az energia körforgásban van, újra és újra felhasználódik.', false]], 'Az érett vörösvértestek sejtmag nélküliek. Az anyag körforog, az energia viszont egy irányban áramlik és hővé alakulva távozik.'),
            TX('Hogyan nevezzük két idegsejt (vagy idegsejt és izomsejt) kapcsolódási helyét?', ['szinapszis', 'szinapszisok', 'synapsis'], 'A szinapszisban az ingerületet többnyire kémiai ingerületátvivő anyagok (pl. acetilkolin) adják át.'),
            SO('Rendezd a rendszertani kategóriákat a legtágabbtól a legszűkebbig!', ['ország', 'törzs', 'osztály', 'rend', 'család', 'nemzetség', 'faj'], 'A faj a rendszertan alapegysége; a faj tudományos neve a nemzetségnévből és a fajjelzőből áll.'),
            NU('Egy táplálékláncban minden szintre az előző szint energiájának kb. 10%-a jut. A termelők 100 000 kJ energiát kötnek meg. Mennyi jut a harmadlagos fogyasztókhoz?', [['energia', 100, 'kJ', 0.6]], 'Termelők 100 000 kJ → elsődleges 10 000 → másodlagos 1000 → harmadlagos 100 kJ.', 3),
            NU('Hány kromoszómát tartalmaz egy egészséges emberi petesejt?', [['kromoszóma', 23, 'db']], 'Az ivarsejtek haploidok (n = 23), a megtermékenyítéskor jön létre a diploid zigóta (2n = 46).'),
            MC('Mely vérsejtek játszanak fő szerepet a véralvadásban?', ['vérlemezkék', 'vörösvértestek', 'falósejtek', 'nyiroksejtek'], 0, 'A vérlemezkék (trombociták) a sérülésnél összetapadnak és elindítják az alvadási folyamatot.'),
            TX('Mi a neve a levelek bőrszövetében található, a gázcserét szabályozó nyílásoknak?', ['gázcserenyílás', 'gázcserenyílások', 'sztóma', 'sztómák', 'légzőnyílás', 'légzőnyílások'], 'A gázcserenyílásokat zárósejtek nyitják és zárják; itt párologtat a növény is.'),
            MU('Melyek belső elválasztású (hormontermelő) mirigyek?', ['pajzsmirigy', 'agyalapi mirigy', 'nyálmirigy', 'mellékvese', 'verejtékmirigy'], [0, 1, 3], 'A nyál- és a verejtékmirigy külső elválasztású: kivezetőcsövön ürítik váladékukat.'),
            G(gen.mendel, 4)
          ] }
        ] }
      ]
    },
    {
      id: 'tortenelem', title: 'Történelem', icon: '🏛️', color: '#b45309',
      valodi: 'Középszint: írásbeli <b>180 perc, 100 pont</b> – I. rész rövid választ igénylő (forrásokra épülő) feladatok, 50 pont; II. rész szöveges, kifejtendő feladatok (esszék), 50 pont. Ez a próbasor az I. rész típusait gyakoroltatja; esszét gép nem tud javítani.',
      sets: [
        { id: 'k1', title: '1. próbasor', szint: 'kozep', ido: 45, valodi: 180, sec: [
          { title: 'Rövid választ igénylő feladatok', items: [
            NU('Melyik évben zajlott a mohácsi csata?', [['évszám', 1526, '']], 'A mohácsi vereség (1526. augusztus 29.) után II. Lajos király is életét vesztette; ez vezetett az ország három részre szakadásához.'),
            MC('Kinek a nevéhez fűződik az athéni demokrácia virágkora a Kr. e. 5. században?', ['Periklész', 'Nagy Sándor', 'Julius Caesar', 'Nagy Károly'], 0, 'Periklész idején (Kr. e. 5. sz. közepe) érte el Athén és a demokrácia a fénykorát.'),
            MC('Melyik uralkodó adta ki az Aranybullát 1222-ben?', ['II. András', 'IV. Béla', 'I. István', 'Könyves Kálmán'], 0, 'II. András Aranybullája a nemesség (serviensek) jogait rögzítette.'),
            NU('Melyik évben ostromolták meg a Bastille-t, a francia forradalom jelképes kezdeteként?', [['évszám', 1789, '']], '1789. július 14. – ma Franciaország nemzeti ünnepe.'),
            PA('Párosítsd az eseményeket az évszámokkal!', [['a muhi csata (tatárjárás)', '1241'], ['a nándorfehérvári diadal', '1456'], ['Buda visszafoglalása a törököktől', '1686'], ['a szatmári béke', '1711']], 'A nándorfehérvári győzelem emlékét őrzi a déli harangszó; a szatmári béke zárta le a Rákóczi-szabadságharcot.'),
            SO('Rendezd időrendbe az eseményeket!', ['a Rákóczi-szabadságharc kitörése', 'a Pragmatica Sanctio elfogadása', 'az 1848-as forradalom', 'a kiegyezés', 'a trianoni békeszerződés'], '1703 → 1723 → 1848 → 1867 → 1920.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['Az 1848. márciusi 12 pont egyik követelése a sajtószabadság volt.', true], ['A kiegyezést Ferenc József és Kossuth Lajos kötötte meg.', false], ['Az első Batthyány-kormány felelős minisztérium volt.', true]], 'A kiegyezést Deák Ferenc és köre készítette elő; Kossuth emigrációból ellenezte (Kasszandra-levél).'),
            TX('Ki írta az 1830-ban megjelent Hitel című művet?', ['Széchenyi István', 'Széchenyi', 'gróf Széchenyi István', 'Szechenyi Istvan'], 'Széchenyi István a Hitelben a feudális gazdaság korlátait (ősiség, hitelhiány) bírálta – ez a reformkor egyik kiinduló műve.'),
            MU('Mely államok tartoztak az első világháborúban a központi hatalmakhoz?', ['Német Császárság', 'Osztrák–Magyar Monarchia', 'Oszmán Birodalom', 'Bulgária', 'Franciaország', 'Orosz Birodalom'], [0, 1, 2, 3], 'Franciaország és Oroszország az antanthoz tartozott.', 4),
            MC('Melyik nemzetközi szervezet jött létre 1945-ben a világbéke megőrzésére?', ['ENSZ', 'Népszövetség', 'NATO', 'Varsói Szerződés'], 0, 'Az ENSZ alapokmányát 1945-ben írták alá San Franciscóban. A Népszövetség az I. vh. után, a NATO 1949-ben, a Varsói Szerződés 1955-ben jött létre.'),
            MC('Melyik napon tört ki az 1956-os forradalom?', ['október 23.', 'november 4.', 'március 15.', 'augusztus 20.'], 0, 'Október 23-án a budapesti tüntetésből lett forradalom; november 4-én a szovjet csapatok támadása vetett véget neki.'),
            TX('Hogyan nevezzük az egyháznak fizetett, a termés tizedét kitevő középkori adót?', ['tized', 'dézsma', 'egyházi tized'], 'A tizedet (dézsmát) Szent István vezette be az egyház fenntartására.'),
            MC('Melyik országban kezdődött az ipari forradalom a 18. században?', ['Nagy-Britanniában (Angliában)', 'Franciaországban', 'Németországban', 'az Egyesült Államokban'], 0, 'Szénkészletek, gyarmati piacok és tőke segítették – a gőzgép és a textilipar volt a motorja.'),
            NU('Melyik évben bomlott fel a Szovjetunió?', [['évszám', 1991, '']], '1991 decemberében a Szovjetunió megszűnt, helyén önálló államok jöttek létre.'),
            PA('Párosítsd az uralkodókat a hozzájuk kapcsolható intézkedéssel vagy eseménnyel!', [['Hunyadi Mátyás', 'a fekete sereg (zsoldoshadsereg)'], ['IV. Béla', 'újjáépítés a tatárjárás után („második honalapító”)'], ['Mária Terézia', 'úrbéri rendelet (1767)'], ['II. József', 'türelmi rendelet (1781)']], 'IV. Béla kővárak építésére ösztönzött; Mária Terézia rendezte a jobbágyterheket; II. József türelmi rendelete a protestánsoknak és ortodoxoknak adott vallásgyakorlati jogokat.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['A reformáció Luther Márton 1517-es fellépésével kezdődött.', true], ['A vesztfáliai béke a harmincéves háborút zárta le.', true], ['Kolumbusz 1492-ben a tengeri utat keresve Indiát érte el.', false]], 'Kolumbusz Amerikát (a Bahama-szigeteket) érte el, bár haláláig Ázsiának hitte. Indiába Vasco da Gama jutott el tengeren (1498).')
          ] }
        ] },
        { id: 'k2', title: '2. próbasor', szint: 'kozep', ido: 45, valodi: 180, sec: [
          { title: 'Rövid választ igénylő feladatok', items: [
            NU('Melyik évben kezdődött a második világháború?', [['évszám', 1939, '']], '1939. szeptember 1-jén Németország megtámadta Lengyelországot.'),
            MC('Ki volt a Római Birodalom első császára (princepse)?', ['Augustus', 'Julius Caesar', 'Nero', 'Constantinus'], 0, 'Octavianus Kr. e. 27-ben kapta az Augustus nevet; a principátus megalapítója. Caesar diktátor volt, de nem császár.'),
            MC('Melyik vallás szent könyve a Korán?', ['iszlám', 'zsidó vallás', 'buddhizmus', 'hinduizmus'], 0, 'A Korán az iszlám szent könyve, a muszlimok szerint Mohamed próféta kinyilatkoztatásait tartalmazza.'),
            MC('Kit választottak magyar királlyá 1458-ban?', ['Hunyadi Mátyást', 'Hunyadi Jánost', 'I. Ulászlót', 'V. Lászlót'], 0, 'Hunyadi Mátyást 1458 januárjában választották királlyá (a hagyomány szerint a Duna jegén).'),
            PA('Párosítsd a felfedezőket a teljesítményükkel!', [['Vasco da Gama', 'tengeri út Indiába Afrika megkerülésével'], ['Kolumbusz Kristóf', 'az amerikai kontinens elérése (1492)'], ['Magellán', 'az első Föld körüli út expedíciója'], ['James Cook', 'Ausztrália keleti partjának feltérképezése']], 'Magellán maga útközben meghalt, de expedíciója 1522-ben teljesítette a Föld megkerülését.'),
            SO('Rendezd időrendbe!', ['az első feljegyzett olümpiai játékok', 'a Nyugatrómai Birodalom bukása', 'Nagy Károly császárrá koronázása', 'az egyházszakadás', 'Amerika felfedezése'], 'Kr. e. 776 → Kr. u. 476 → 800 → 1054 → 1492.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['A Magyar Királyság a 16. században három részre szakadt.', true], ['A Rákóczi-szabadságharcot a szatmári béke zárta le.', true], ['Az aradi vértanúkat 1867-ben végezték ki.', false]], 'Az aradi vértanúkat 1849. október 6-án végezték ki; 1867 a kiegyezés éve.'),
            TX('Ki volt Magyarország kormányzó-elnöke 1849-ben, a szabadságharc idején?', ['Kossuth Lajos', 'Kossuth'], 'A Függetlenségi nyilatkozat (1849. április 14.) után Kossuth Lajost választották kormányzó-elnökké.'),
            MU('Mely nagyhatalmak alkották az antantot az első világháború kezdetén?', ['Franciaország', 'Orosz Birodalom', 'Nagy-Britannia', 'Német Császárság', 'Osztrák–Magyar Monarchia', 'Oszmán Birodalom'], [0, 1, 2], 'A Német Császárság, a Monarchia és az Oszmán Birodalom a központi hatalmak tagja volt.'),
            MC('Mi volt a Marshall-terv?', ['amerikai gazdasági segélyprogram Európa háború utáni újjáépítésére', 'a szovjet tervgazdaság első ötéves terve', 'a NATO katonai stratégiája', 'a német jóvátétel fizetési terve az I. világháború után'], 0, 'Az USA 1948-tól nyújtott segélyt; a szovjet befolyási övezet országai (köztük Magyarország) nem fogadhatták el.'),
            MC('Melyik évben tartották a rendszerváltás utáni első szabad országgyűlési választásokat Magyarországon?', ['1990', '1989', '1991', '1994'], 0, '1990 tavaszán; ezután alakult meg az Antall-kormány.'),
            TX('Hogyan nevezzük a 18. század szellemi mozgalmát, amely az észt, a tudományt és a természetes jogokat állította középpontba?', ['felvilágosodás', 'felvilagosodas', 'a felvilágosodás'], 'Képviselői pl. Voltaire, Montesquieu, Rousseau; eszméi hatottak az amerikai és a francia forradalomra.'),
            MC('Melyik évben csatlakozott Magyarország az Európai Unióhoz?', ['2004', '1999', '2007', '2011'], 0, '2004. május 1-jén, kilenc másik országgal együtt. (1999: NATO-csatlakozás.)'),
            NU('Melyik évben írták alá a trianoni békeszerződést?', [['évszám', 1920, '']], '1920. június 4-én; Magyarország területének mintegy kétharmadát elveszítette.'),
            PA('Párosítsd a korszakokat a jellemzőikkel!', [['dualizmus', 'Osztrák–Magyar Monarchia, 1867–1918'], ['Horthy-korszak', 'kormányzói rendszer, revíziós külpolitika'], ['Rákosi-korszak', 'személyi kultusz, beszolgáltatás, padlássöprés'], ['Kádár-korszak', 'új gazdasági mechanizmus (1968), „gulyáskommunizmus”']], 'A korszakok uralkodó politikai rendszerükről kapták a nevüket.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['Az Egyesült Államok Függetlenségi Nyilatkozatát 1776-ban fogadták el.', true], ['Napóleon 1815-ben Waterloonál győzött.', false], ['A berlini fal 1989-ben omlott le.', true]], 'Waterloonál Napóleon végleges vereséget szenvedett (1815), ezután Szent Ilona szigetére száműzték.')
          ] }
        ] }
      ]
    },
    {
      id: 'informatika', title: 'Informatika (digitális kultúra)', icon: '💻', color: '#7c3aed',
      valodi: 'Középszint: a digitális kultúra írásbelije <b>180 perces gyakorlati vizsga számítógépen</b> (szövegszerkesztés, táblázat- és adatbázis-kezelés, weblap, programozás). Ez a próbasor az elméleti, algoritmikus és táblázatkezelési tudást méri automatikusan javítható feladatokkal – a gépes gyakorlatot nem helyettesíti.',
      sets: [
        { id: 'k1', title: '1. próbasor', szint: 'kozep', ido: 45, valodi: 180, sec: [
          { title: 'Feladatsor', items: [
            NU('Hány különböző értéket lehet ábrázolni 8 biten?', [['érték', 256, 'db']], C('2⁸ = 256') + ' (például 0 és 255 között).'),
            NU('Mennyi a ' + C('101101₂') + ' szám értéke tízes számrendszerben?', [['érték', 45, '']], C('32 + 8 + 4 + 1 = 45') + '.'),
            G(gen.dec2bin, 3),
            MC('Melyik táblázatkezelő képlet számolja ki az A1:A10 tartomány átlagát?', ['=ÁTLAG(A1:A10)', '=SZUM(A1:A10)', '=DARAB(A1:A10)', '=ÁTLAG(A1;A10)'], 0, 'A tartományt kettősponttal adjuk meg; az ' + C('=ÁTLAG(A1;A10)') + ' csak a két cella átlaga lenne.'),
            MC('Melyik HTML-elem hoz létre hivatkozást (linket)?', ['`<a>`', '`<p>`', '`<img>`', '`<link>`'], 0, 'Az ' + C('<a href="…">') + ' a hivatkozás; a ' + C('<link>') + ' a fejlécben külső erőforrást (pl. stíluslapot) kapcsol be.'),
            NU('Mit ír ki a program?\n' + C('s = 0') + '\n' + C('for i in range(1, 6):') + '\n' + C('    s = s + i * i') + '\n' + C('print(s)'), [['kimenet', 55, '']], 'Az 1–5 számok négyzetösszege: ' + C('1 + 4 + 9 + 16 + 25 = 55') + '.', 3),
            G(gen.ciklus, 4),
            MC('Melyik NEM bemeneti eszköz?', ['monitor', 'billentyűzet', 'egér', 'lapolvasó (szkenner)'], 0, 'A monitor kimeneti eszköz: a számítógép adatait jeleníti meg.'),
            MU('Melyek jellemzők egy erős jelszóra?', ['legalább 12 karakter hosszú', 'kis- és nagybetűt, számot, írásjelet is tartalmaz', 'a születési dátumunk', 'minden szolgáltatásnál ugyanazt használjuk', 'nem értelmes szótári szó'], [0, 1, 4], 'A személyes adat könnyen kitalálható; az újrahasznált jelszó egy adatszivárgás után minden fiókot veszélyeztet.'),
            PA('Párosítsd a fájlkiterjesztéseket a tartalmukkal!', [['.png', 'kép (veszteségmentes tömörítés)'], ['.mp3', 'hang'], ['.csv', 'tagolt szöveges táblázat'], ['.html', 'weboldal']], 'A .csv egyszerű szövegfájl, amelyben a mezőket elválasztó jel (pl. pontosvessző) tagolja.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['Az IP-cím azonosítja a hálózatra kapcsolt eszközt.', true], ['A RAM tartalma kikapcsolás után is megmarad.', false], ['Az SQL lekérdezésben a WHERE záradék szűri a rekordokat.', true]], 'A RAM felejtő (volatilis) memória; tartós tárolásra SSD vagy merevlemez szolgál.'),
            SO('Rendezd növekvő sorrendbe a mértékegységeket!', ['bit', 'bájt', 'kilobájt', 'megabájt', 'gigabájt', 'terabájt'], '1 bájt = 8 bit; a további egységek ezres (SI) vagy 1024-es (bináris előtag: KiB, MiB…) váltószámmal követik egymást.'),
            TX('Hogyan nevezzük azt a keresési algoritmust, amely rendezett sorozatban mindig a középső elemet vizsgálja, és így felezi a keresési tartományt?', ['bináris keresés', 'logaritmikus keresés', 'felezéses keresés', 'binaris kereses'], 'Lépésszáma kb. log₂ n, ezért nagy adatoknál sokkal gyorsabb a lineáris keresésnél – de csak rendezett adatokon működik.'),
            G(gen.hafv, 2),
            NU('Egy táblában 120 rekord van, a ' + C('varos') + ' mező mindegyikben ki van töltve, és 45 rekordban az értéke ' + C("'Pécs'") + '. Hány sort ad vissza: ' + C("SELECT * FROM t WHERE varos <> 'Pécs';") + '?', [['sorok', 75, '']], 'A ' + C('<>') + ' a „nem egyenlő” reláció: ' + C('120 − 45 = 75') + '.', 3),
            MC('Mit jelent a felhőalapú tárolás?', ['az adatok egy szolgáltató interneten elérhető szerverein tárolódnak', 'az adatok a számítógép RAM-jában tárolódnak', 'az adatok csak pendrive-on érhetők el', 'a merevlemez tömörítési módja'], 0, 'Előnye a bárhonnan elérhetőség és a megosztás; hátránya, hogy a szolgáltatóra és az internetkapcsolatra is szükség van.')
          ] }
        ] },
        { id: 'k2', title: '2. próbasor', szint: 'kozep', ido: 45, valodi: 180, sec: [
          { title: 'Feladatsor', items: [
            NU('Mennyi a ' + C('1F₁₆') + ' (tizenhatos számrendszerbeli) szám értéke tízes számrendszerben?', [['érték', 31, '']], C('1 · 16 + 15 = 31') + ' (F = 15).'),
            G(gen.bin2dec, 3),
            NU('Hány bájt 2 KiB (kibibájt)?', [['bájt', 2048, 'B']], '1 KiB = 1024 bájt, tehát 2 KiB = 2048 bájt.'),
            MC('Melyik hivatkozás abszolút (másoláskor sem változik)?', ['=$A$1', '=A1', '=A$1', '=$A1'], 0, 'A $ jel rögzíti az oszlopot, illetve a sort; a ' + C('$A$1') + ' mindkettőt. A ' + C('A$1') + ' és a ' + C('$A1') + ' vegyes hivatkozás.'),
            MC('Melyik protokoll biztosít titkosított kapcsolatot a weboldalak eléréséhez?', ['HTTPS', 'HTTP', 'FTP', 'SMTP'], 0, 'A HTTPS a HTTP titkosított (TLS) változata; az SMTP levélküldésre, az FTP fájlátvitelre szolgál.'),
            NU('Mit ír ki a program?\n' + C('x = 1') + '\n' + C('while x < 100:') + '\n' + C('    x = x * 3') + '\n' + C('print(x)'), [['kimenet', 243, '']], 'x értékei: 1, 3, 9, 27, 81, 243. A 243 már nem kisebb 100-nál, ezért a ciklus leáll, és ezt írja ki.', 3),
            G(gen.futas, 3),
            MC('Mi az adathalászat (phishing)?', ['megtévesztő üzenettel személyes adatok vagy jelszavak megszerzése', 'nagy adathalmazok statisztikai elemzése', 'víruskereső program', 'adatok biztonsági mentése'], 0, 'Gyanús link, sürgető hang, hivatalosnak tűnő feladó – ezek a jelei. Jelszót e-mailben sosem kér a bank.'),
            MU('Melyek programozási nyelvek?', ['Python', 'HTML', 'C#', 'CSS', 'JavaScript', 'JPEG'], [0, 2, 4], 'A HTML jelölőnyelv, a CSS stílusleíró nyelv, a JPEG képformátum.'),
            PA('Párosítsd a hálózati fogalmakat a szerepükkel!', [['DNS', 'a domainnevet IP-címre fordítja'], ['router', 'csomagokat továbbít hálózatok között'], ['Wi-Fi', 'vezeték nélküli helyi hálózat'], ['tűzfal', 'szabályok alapján szűri a hálózati forgalmat']], 'Ezek együtt teszik lehetővé, hogy egy otthoni gép biztonságosan elérje a weboldalakat.'),
            IH('Döntsd el az állításokról, hogy igazak vagy hamisak!', [['A rekurzív függvény (közvetlenül vagy közvetve) önmagát hívja meg.', true], ['A tömbök indexelése minden programozási nyelvben 1-től kezdődik.', false], ['A szerzői jog által védett képet bárki szabadon felhasználhatja, ha megjelöli a forrást.', false]], 'Sok nyelvben (Python, C, JavaScript) 0-tól indul az index. A forrásmegjelölés nem pótolja a felhasználási engedélyt (kivéve pl. szabad licenc esetén).'),
            SO('Rendezd az SQL lekérdezés záradékait a helyes sorrendbe!', ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY'], 'Például: ' + C('SELECT varos, COUNT(*) FROM t WHERE kor > 18 GROUP BY varos ORDER BY varos;')),
            TX('Melyik táblázatkezelő függvény (magyar nevével) számolja meg egy tartományban a megadott feltételnek megfelelő cellákat?', ['DARABTELI', 'darabteli', '=DARABTELI', 'COUNTIF'], 'Például ' + C('=DARABTELI(B2:B30;">=50")') + '. Angol neve COUNTIF.'),
            G(gen.maxmin, 4),
            NU('Mekkora egy 1920 × 1080 képpontos, 24 bites színmélységű kép tömörítetlenül, bájtban?', [['méret', 6220800, 'B']], C('1920 · 1080 = 2 073 600') + ' képpont, képpontonként 24 bit = 3 bájt: ' + C('2 073 600 · 3 = 6 220 800 B') + ' (kb. 6 MB).', 3),
            MC('Melyik adatszerkezet működik „utoljára be, elsőként ki” (LIFO) elven?', ['verem', 'sor', 'tömb', 'bináris fa'], 0, 'A verem (stack) tetejére teszünk és onnan veszünk el; a sor (queue) FIFO elvű.')
          ] }
        ] }
      ]
    }
  ];

  /* azonosítók a stabil tároláshoz és az okos ismétléshez */
  SUBJ.forEach(function (s) {
    s.sets.forEach(function (set) {
      set.sec.forEach(function (sec, si) { sec.items.forEach(function (it, ii) { it.id = s.id + '-' + set.id + '-' + si + '-' + ii; }); });
    });
  });
  function subjById(id) { return SUBJ.filter(function (s) { return s.id === id; })[0]; }
  function setInfo(subj, setId) {
    if (setId === 'vegyes') {
      var b = subj.sets.filter(function (x) { return x.szint === 'kozep'; })[0];
      return { id: 'vegyes', title: '🎲 Vegyes próbasor', szint: 'kozep', ido: b.ido, valodi: b.valodi, base: b };
    }
    return subj.sets.filter(function (x) { return x.id === setId; })[0];
  }

  /* ================= vizsga összeállítása ================= */
  function instItem(src, seed) {
    var R = rng(seed), it;
    if (src.t === 'gen') { it = src.fn(R); it.p = src.p || it.p; }
    else if (src.t === 'lp') {
      var P = S.lepesek.generate(src.tipus, src.L, seed);
      it = { t: 'lp', q: P.text, P: P, n: P.answers.map(function (a) { return { l: a.label, u: a.unit, show: a.show }; }), ex: P.steps.join('\n'), p: src.p };
    } else it = Object.assign({}, src);
    it.id = src.id; it.src = src;
    if (it.t === 'mc' || it.t === 'multi') it.perm = R.shuf(it.o.map(function (x, i) { return i; }));
    if (it.t === 'match') it.perm = R.shuf(it.pairs.map(function (x, i) { return i; }));
    if (it.t === 'order') { var idx = it.items.map(function (x, i) { return i; }), pm; do { pm = R.shuf(idx); } while (pm.join() === idx.join()); it.perm = pm; }
    return it;
  }
  function build(subj, setId, seed) {
    var info = setInfo(subj, setId), secs;
    if (!info) return null;
    if (setId === 'vegyes') {
      var R = rng(mix(seed, 777)), kz = subj.sets.filter(function (x) { return x.szint === 'kozep'; });
      secs = info.base.sec.map(function (s, si) {
        var pool = []; kz.forEach(function (x) { if (x.sec[si]) pool = pool.concat(x.sec[si].items); });
        return { title: s.title, items: R.shuf(pool).slice(0, s.items.length) };
      });
    } else secs = info.sec;
    var items = [], k = 0;
    secs.forEach(function (s, si) { s.items.forEach(function (src) { var it = instItem(src, mix(seed, k + 1)); it.sec = si; it.k = k++; items.push(it); }); });
    var max = items.reduce(function (a, it) { return a + it.p; }, 0);
    return { subj: subj, info: info, secs: secs, items: items, max: max, seed: seed };
  }

  /* ================= javítás ================= */
  function numOk(part, inp) {
    if (inp == null || String(inp).trim() === '') return false;
    var x = S.lepesek.parseInput(String(inp).replace(/^[^=]*=/, ''));
    if (!x) return false;
    var tol = part.tol != null ? part.tol : 0.0051;
    if (part.rel) tol = Math.max(tol, Math.abs(part.v) * part.rel);
    return Math.abs(x.v - part.v) <= tol + 1e-12;
  }
  function filled(it, a) {
    if (a == null) return false;
    if (it.t === 'mc') return a !== '' && a != null;
    if (it.t === 'multi') return a.length > 0;
    if (it.t === 'num' || it.t === 'lp') return a.some(function (x) { return x && String(x).trim(); });
    if (it.t === 'text') return !!String(a).trim();
    if (it.t === 'match' || it.t === 'tf') return a.some(function (x) { return x != null && x !== ''; });
    if (it.t === 'order') return !!a.touched;
    return false;
  }
  function score(it, a) {
    var p = it.p, ok = 0, n = 1;
    if (!filled(it, a)) return 0;
    function part(c, tot) { return Math.floor(p * Math.max(0, c) / tot + 1e-9); }
    switch (it.t) {
      case 'mc': return +a === it.a ? p : 0;
      case 'multi':
        var hit = a.filter(function (x) { return it.a.indexOf(x) >= 0; }).length, bad = a.length - hit;
        return part(hit - bad, it.a.length);
      case 'num': n = it.n.length; it.n.forEach(function (pt, i) { if (numOk(pt, a[i])) ok++; }); return part(ok, n);
      case 'lp': var r = S.lepesek.check(it.P, it.n.map(function (x, i) { return a[i] || ''; })); n = r.parts.length; ok = r.parts.filter(function (x) { return x === 'ok'; }).length; return part(ok, n);
      case 'text':
        var u = normTxt(a), u2 = u.replace(/ /g, '');
        return it.acc.some(function (x) { var v = normTxt(x); return v === u || v.replace(/ /g, '') === u2; }) ? p : 0;
      case 'match': n = it.pairs.length; it.pairs.forEach(function (x, i) { if (a[i] !== '' && a[i] != null && +a[i] === i) ok++; }); return part(ok, n);
      case 'tf': n = it.st.length; it.st.forEach(function (x, i) { if (a[i] != null && a[i] !== '' && (a[i] === 'i') === x[1]) ok++; }); return part(ok, n);
      case 'order': var ord = (a && a.o) || it.perm; n = it.items.length; ord.forEach(function (x, i) { if (x === i) ok++; }); return part(ok, n);
    }
    return 0;
  }
  function grade(pct, emelt) {
    var t = emelt ? EMELT : KOZEP;
    if (pct >= t[0]) return [5, 'jeles']; if (pct >= t[1]) return [4, 'jó']; if (pct >= t[2]) return [3, 'közepes']; if (pct >= t[3]) return [2, 'elégséges']; return [1, 'elégtelen'];
  }

  /* válaszok szöveges megjelenítése (javítókulcs, eredmény) */
  function keyHtml(it) {
    switch (it.t) {
      case 'mc': return '<b>' + LET.charAt(it.perm.indexOf(it.a)) + '</b>) ' + S.inline(it.o[it.a]);
      case 'multi': return it.a.map(function (i) { return it.perm.indexOf(i); }).sort().map(function (j) { return '<b>' + LET.charAt(j) + '</b>) ' + S.inline(it.o[it.perm[j]]); }).join('; ');
      case 'num': return it.n.map(function (pt) { return (pt.l ? esc(pt.l) + ' = ' : '') + '<b>' + nf(pt.v, pt.dp) + '</b>' + (pt.u ? ' ' + esc(pt.u) : ''); }).join('; ');
      case 'lp': return it.n.map(function (pt) { return (pt.l ? esc(pt.l) + ' = ' : '') + '<b>' + esc(pt.show) + '</b>' + (pt.u ? ' ' + esc(pt.u) : ''); }).join('; ') + (it.P.unordered ? ' <small class="muted">(tetszőleges sorrendben)</small>' : '');
      case 'text': return '<b>' + esc(it.acc[0]) + '</b>' + (it.acc.length > 1 ? ' <small class="muted">(elfogadva még: ' + it.acc.slice(1).map(esc).join(', ') + ')</small>' : '');
      case 'match': return it.pairs.map(function (x, i) { return (i + 1) + '–<b>' + LET.charAt(it.perm.indexOf(i)) + '</b> (' + esc(x[0]) + ' → ' + esc(x[1]) + ')'; }).join('<br>');
      case 'tf': return it.st.map(function (x, i) { return (i + 1) + '. <b>' + (x[1] ? 'Igaz' : 'Hamis') + '</b>'; }).join(' · ');
      case 'order': return it.items.map(function (x, i) { return '<b>' + LET.charAt(it.perm.indexOf(i)) + '</b> ' + esc(x); }).join(' → ');
    }
    return '';
  }
  function ansHtml(it, a) {
    if (!filled(it, a)) return '<i class="muted">nincs válasz</i>' + (it.t === 'order' ? ' <small class="muted">(nem rendezted át a listát)</small>' : '');
    switch (it.t) {
      case 'mc': return S.inline(it.o[+a]);
      case 'multi': return a.map(function (i) { return S.inline(it.o[i]); }).join('; ');
      case 'num': case 'lp': return it.n.map(function (pt, i) { return (pt.l ? esc(pt.l) + ' = ' : '') + esc(a[i] || '–') + (pt.u ? ' ' + esc(pt.u) : ''); }).join('; ');
      case 'text': return esc(a);
      case 'match': return it.pairs.map(function (x, i) { return esc(x[0]) + ' → ' + (a[i] !== '' && a[i] != null ? esc(it.pairs[+a[i]][1]) : '–'); }).join('<br>');
      case 'tf': return it.st.map(function (x, i) { return (i + 1) + '. ' + (a[i] === 'i' ? 'Igaz' : a[i] === 'h' ? 'Hamis' : '–'); }).join(' · ');
      case 'order': return ((a && a.o) || it.perm).map(function (i) { return esc(it.items[i]); }).join(' → ') ;
    }
    return '';
  }

  /* ================= tárolás ================= */
  function load() { var d = S.store.get('erettsegi', null) || {}; d.hist = d.hist || []; return d; }
  function save(d) { S.store.set('erettsegi', d); }
  function fmtTime(sec) { sec = Math.max(0, Math.round(sec)); var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return (h ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s; }
  function fmtDate(t) { var d = new Date(t); return d.toLocaleDateString('hu-HU') + ' ' + d.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }); }
  function crumbs(parts) {
    return '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span>' + parts.map(function (p, i) { return i < parts.length - 1 ? '<a href="' + p[1] + '">' + esc(p[0]) + '</a><span>›</span>' : '<span>' + esc(p[0]) + '</span>'; }).join('') + '</nav>';
  }
  function countItems(subj) { return subj.sets.reduce(function (a, s) { return a + s.sec.reduce(function (b, x) { return b + x.items.length; }, 0); }, 0); }
  function uniNote() {
    return S.level === 'egyetem' ? '<div class="note"><b class="t">🎓 Egyetemi szint</b><p>Ez a modul középiskolai érettségi-felkészítő. Egyetemi tanulmányokhoz ismétlésnek, illetve a felvételi pontszámítás alapjául szolgáló tárgyak átnézésére jó; a mélyebb anyagot a kurzusoknál találod.</p></div>' : '';
  }
  function gradeTable() {
    return '<table class="er-gt"><thead><tr><th>Érdemjegy</th><th>Középszint</th><th>Emelt szint</th></tr></thead><tbody>' +
      [['jeles (5)', '80–100%', '60–100%'], ['jó (4)', '60–79%', '47–59%'], ['közepes (3)', '40–59%', '33–46%'], ['elégséges (2)', '25–39%', '25–32%'], ['elégtelen (1)', '0–24%', '0–24%']].map(function (r) {
        return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<p class="muted er-small">Tájékoztató adatok (Oktatási Hivatal szabályai alapján, 2026. novemberi állapot). A valódi vizsgán a teljes (írásbeli + szóbeli) eredmény számít, és az elégségeshez vizsgarészenként legalább 12% kell. A pontos, aktuális szabályokat mindig az oktatas.hu oldalon ellenőrizd!</p>';
  }

  /* ================= oldalak ================= */
  function pageHub(main) {
    var d = load(), total = SUBJ.reduce(function (a, s) { return a + countItems(s); }, 0);
    main.innerHTML = crumbs([['Érettségi próbavizsgák']]) +
      '<h1>🎓 Érettségi próbavizsgák</h1><p class="lead">Teljes, időre írható próbasorok hat tárgyból – az érettségi formátumát, pontozását és időkeretét követve. A számolós feladatok minden indításkor új számokkal jönnek, a végén pontozást, tájékoztató érdemjegyet és magyarázatos javítókulcsot kapsz.</p>' +
      uniNote() +
      (d.cur ? curCard(d.cur) : '') +
      '<div class="er-grid">' + SUBJ.map(function (s) {
        var h = d.hist.filter(function (x) { return x.subj === s.id; }), best = h.reduce(function (a, x) { return Math.max(a, x.pct); }, -1);
        return '<a class="card er-tile" style="--tile:' + s.color + '" href="#/erettsegi/' + s.id + '"><span class="er-ico" aria-hidden="true">' + s.icon + '</span><span><b>' + esc(s.title) + '</b><small>' + s.sets.length + ' próbasor + vegyes · ' + countItems(s) + ' feladat' + (s.sets.some(function (x) { return x.szint === 'emelt'; }) ? ' · emelt szint is' : '') + '</small>' +
          (h.length ? '<em>' + h.length + ' kitöltés · legjobb: ' + best + '%</em>' : '') + '</span></a>';
      }).join('') + '</div>' +
      histHtml(d.hist, null) +
      '<details class="card pad er-info"><summary>ℹ️ Hogyan pontozzák az érettségit? (tájékoztató)</summary>' + gradeTable() +
      '<p class="er-small muted">Ezek <b>saját, érettségi-szerű</b> feladatok, nem a hivatalos feladatsorok. Összesen ' + total + ' feladat (ebből a generált feladatok minden kitöltéskor új számokkal készülnek). Korábbi hivatalos feladatlapokat és javítási útmutatókat az Oktatási Hivatal honlapján találsz.</p></details>';
    bindHist(main);
    return true;
  }
  function curCard(cur) {
    var s = subjById(cur.subj), info = s && setInfo(s, cur.set); if (!info) return '';
    return '<div class="card pad er-cur"><b>⏸ Félbehagyott próbavizsga:</b> ' + esc(s.title) + ' – ' + esc(info.title) + ' · eltelt idő: ' + fmtTime(cur.el) +
      ' <a class="btn primary sm" href="#/erettsegi/' + s.id + '/vizsga">Folytatás →</a></div>';
  }
  function histHtml(hist, sid) {
    var h = hist.filter(function (x) { return !sid || x.subj === sid; }).slice().reverse();
    if (!h.length) return '';
    return '<h2>📈 Korábbi eredményeid</h2><div class="er-tablewrap"><table class="er-hist"><thead><tr><th>Dátum</th>' + (sid ? '' : '<th>Tárgy</th>') + '<th>Próbasor</th><th>Pont</th><th>%</th><th>Jegy*</th><th>Idő</th><th></th></tr></thead><tbody>' +
      h.slice(0, 30).map(function (x) {
        var s = subjById(x.subj), info = s && setInfo(s, x.set);
        return '<tr><td>' + fmtDate(x.date) + '</td>' + (sid ? '' : '<td>' + (s ? s.icon + ' ' + esc(s.title) : '') + '</td>') + '<td>' + esc(info ? info.title : x.set) + '</td><td>' + x.pts + '/' + x.max + '</td><td><b>' + x.pct + '%</b></td><td>' + x.jegy + '</td><td>' + fmtTime(x.el) + '</td>' +
          '<td><a href="#/erettsegi/' + x.subj + '/eredmeny?id=' + x.id + '">Részletek</a></td></tr>';
      }).join('') + '</tbody></table></div><p class="muted er-small">* tájékoztató érdemjegy. <button type="button" class="linkish" data-er-clear="' + (sid || '') + '">Előzmények törlése</button></p>';
  }
  function bindHist(main) {
    var b = main.querySelector('[data-er-clear]');
    if (b) b.addEventListener('click', function () {
      if (!confirm('Biztosan törlöd az előzményeket?')) return;
      var d = load(), sid = b.getAttribute('data-er-clear'); d.hist = sid ? d.hist.filter(function (x) { return x.subj !== sid; }) : []; save(d); S.routes.erettsegi.page(main, sid ? [sid] : [], {});
    });
  }

  function pageSubject(main, s) {
    var d = load(), ido = S.store.get('erettsegi.ido', 'ajanlott');
    var rows = s.sets.concat([setInfo(s, 'vegyes')]).map(function (set) {
      var n = set.id === 'vegyes' ? set.base.sec.reduce(function (a, x) { return a + x.items.length; }, 0) : set.sec.reduce(function (a, x) { return a + x.items.length; }, 0);
      var gens = set.id === 'vegyes' ? '' : set.sec.reduce(function (a, x) { return a + x.items.filter(function (i) { return i.t === 'gen' || i.t === 'lp'; }).length; }, 0);
      return '<div class="card pad er-set"><div><h3>' + esc(set.title) + (set.szint === 'emelt' ? ' <span class="chip er-emelt">emelt</span>' : '') + '</h3><p class="muted">' + n + ' feladat · ajánlott idő: ' + set.ido + ' perc (valódi vizsga: ' + set.valodi + ' perc)' +
        (set.id === 'vegyes' ? ' · véletlenszerű válogatás az összes középszintű feladatból' : gens ? ' · ebből ' + gens + ' minden alkalommal új számokkal' : '') + '</p></div>' +
        '<div class="row"><button type="button" class="btn primary" data-start="' + set.id + '">▶ Indítás</button><a class="btn" href="#/erettsegi/' + s.id + '/nyomtat?sor=' + set.id + '&seed=' + (Math.floor(Math.random() * 1e9) + 1) + '">🖨️ Nyomtatható</a></div></div>';
    }).join('');
    main.innerHTML = crumbs([['Érettségi próbavizsgák', '#/erettsegi'], [s.title]]) +
      '<h1>' + s.icon + ' ' + esc(s.title) + ' – próbaérettségi</h1>' + uniNote() +
      '<div class="note"><b class="t">📋 A valódi érettségi (tájékoztató)</b><p>' + s.valodi + '</p></div>' +
      (d.cur ? curCard(d.cur) : '') +
      '<div class="er-opts card pad"><b>⏱ Időkeret:</b> <div class="seg" id="er-ido">' + [['ajanlott', 'ajánlott (arányos)'], ['valodi', 'valódi vizsgaidő'], ['nincs', 'nincs időkorlát']].map(function (o) {
        return '<button type="button" data-v="' + o[0] + '" class="' + (ido === o[0] ? 'on' : '') + '">' + o[1] + '</button>'; }).join('') + '</div>' +
      '<p class="muted er-small">A próbasorok rövidebbek a valódi vizsgánál, ezért az „ajánlott” idő arányosan kevesebb. Az időzítő szüneteltethető; ha lejár, a dolgozatot automatikusan beadjuk.</p></div>' +
      rows + histHtml(d.hist, s.id);
    main.querySelectorAll('#er-ido button').forEach(function (b) {
      b.addEventListener('click', function () { ido = b.dataset.v; S.store.set('erettsegi.ido', ido); main.querySelectorAll('#er-ido button').forEach(function (x) { x.classList.toggle('on', x === b); }); });
    });
    main.querySelectorAll('[data-start]').forEach(function (b) {
      b.addEventListener('click', function () {
        var dd = load();
        if (dd.cur && !confirm('Van egy félbehagyott próbavizsgád. Ha újat kezdesz, az elvész. Folytatod?')) return;
        var info = setInfo(s, b.dataset.start);
        dd.cur = { subj: s.id, set: info.id, seed: Math.floor(Math.random() * 1e9) + 1, lim: ido === 'nincs' ? 0 : (ido === 'valodi' ? info.valodi : info.ido) * 60, el: 0, ans: {}, flag: {}, idx: 0, start: Date.now() };
        save(dd); location.hash = '#/erettsegi/' + s.id + '/vizsga';
      });
    });
    bindHist(main);
    return true;
  }

  /* ---------- vizsga ---------- */
  function inputHtml(it, a) {
    var h = '', nm = 'er-in-' + it.k;
    switch (it.t) {
      case 'mc':
        return '<div class="er-opts-list">' + it.perm.map(function (oi, j) {
          return '<label class="er-opt"><input type="radio" name="' + nm + '" value="' + oi + '"' + (a != null && +a === oi ? ' checked' : '') + '><span class="er-let">' + LET.charAt(j) + '</span><span>' + S.inline(it.o[oi]) + '</span></label>'; }).join('') + '</div>';
      case 'multi':
        a = a || [];
        return '<p class="muted er-small">Több helyes válasz is lehet. Minden rossz jelölés levon egy helyeset.</p><div class="er-opts-list">' + it.perm.map(function (oi, j) {
          return '<label class="er-opt"><input type="checkbox" value="' + oi + '"' + (a.indexOf(oi) >= 0 ? ' checked' : '') + '><span class="er-let">' + LET.charAt(j) + '</span><span>' + S.inline(it.o[oi]) + '</span></label>'; }).join('') + '</div>';
      case 'num': case 'lp':
        a = a || [];
        return '<div class="er-nums">' + it.n.map(function (pt, i) {
          return '<label class="er-num"><span>' + esc(pt.l || 'válasz') + ' =</span><input type="text" inputmode="decimal" autocomplete="off" data-i="' + i + '" value="' + esc(a[i] || '') + '" placeholder="pl. 12,5"><em>' + esc(pt.u || '') + '</em></label>'; }).join('') +
          '</div><p class="muted er-small">Tizedesvesszőt és pontot is használhatsz; törtet így írj: 3/4. A mértékegységet nem kell beírni.</p>';
      case 'text':
        return '<input type="text" class="er-text' + (it.mono ? ' er-mono' : '') + '" autocomplete="off" value="' + esc(a || '') + '" placeholder="Írd ide a választ…">' + '<p class="muted er-small">Kis- és nagybetű, illetve az ékezetek nem számítanak.</p>';
      case 'match':
        a = a || [];
        return '<div class="er-match">' + it.pairs.map(function (x, i) {
          return '<label><span>' + (i + 1) + '. ' + S.inline(x[0]) + '</span><select data-i="' + i + '"><option value="">– válassz –</option>' + it.perm.map(function (ri, j) {
            return '<option value="' + ri + '"' + (a[i] !== '' && a[i] != null && +a[i] === ri ? ' selected' : '') + '>' + LET.charAt(j) + ') ' + esc(it.pairs[ri][1]) + '</option>'; }).join('') + '</select></label>'; }).join('') + '</div>';
      case 'tf':
        a = a || [];
        return '<div class="er-tf">' + it.st.map(function (x, i) {
          return '<div class="er-tfrow"><span>' + (i + 1) + '. ' + S.inline(x[0]) + '</span><span class="seg"><button type="button" data-i="' + i + '" data-v="i" class="' + (a[i] === 'i' ? 'on' : '') + '">Igaz</button><button type="button" data-i="' + i + '" data-v="h" class="' + (a[i] === 'h' ? 'on' : '') + '">Hamis</button></span></div>'; }).join('') + '</div>';
      case 'order':
        var ord = (a && a.o) || it.perm;
        return '<ol class="er-order">' + ord.map(function (ii, pos) {
          return '<li><span>' + S.inline(it.items[ii]) + '</span><span class="er-mv"><button type="button" class="btn sm" data-mv="' + pos + '" data-d="-1" aria-label="Feljebb"' + (pos === 0 ? ' disabled' : '') + '>↑</button><button type="button" class="btn sm" data-mv="' + pos + '" data-d="1" aria-label="Lejjebb"' + (pos === ord.length - 1 ? ' disabled' : '') + '>↓</button></span></li>'; }).join('') + '</ol>' +
          '<p class="muted er-small">A nyilakkal rendezd át a listát (felül legyen az első). Ha a jelenlegi sorrendet tartod jónak, nyomd meg: <button type="button" class="btn sm" data-okorder>✔ Ez a válaszom</button>' + (a && a.touched ? ' <b>✔ rögzítve</b>' : '') + '</p>';
    }
    return h;
  }

  function pageExam(main, s) {
    var d = load(), cur = d.cur;
    if (!cur || cur.subj !== s.id) {
      main.innerHTML = crumbs([['Érettségi próbavizsgák', '#/erettsegi'], [s.title, '#/erettsegi/' + s.id], ['Vizsga']]) +
        '<p class="note">Nincs folyamatban lévő ' + esc(s.title.toLowerCase()) + ' próbavizsga. <a href="#/erettsegi/' + s.id + '">Indíts egyet →</a></p>';
      return true;
    }
    var ex = build(s, cur.set, cur.seed);
    if (!ex) { delete d.cur; save(d); location.hash = '#/erettsegi/' + s.id; return true; }
    var N = ex.items.length, paused = cur.el > 0, root;
    if (cur.idx >= N) cur.idx = 0;
    main.innerHTML = crumbs([['Érettségi próbavizsgák', '#/erettsegi'], [s.title, '#/erettsegi/' + s.id], [ex.info.title]]) +
      '<div class="er-exam" id="er-exam">' +
      '<div class="er-bar card"><span class="er-bt"><b>' + s.icon + ' ' + esc(s.title) + '</b><small>' + esc(ex.info.title) + ' · ' + ex.max + ' pont</small></span>' +
      '<span class="er-timer" id="er-timer" aria-live="off"></span>' +
      '<span class="row"><button type="button" class="btn sm" id="er-pause"></button><button type="button" class="btn sm primary" id="er-submit">✔ Beadás</button></span></div>' +
      '<div class="er-pal" id="er-pal"></div>' +
      '<div class="er-paused card pad" id="er-paused" hidden><h2>⏸ Szünet</h2><p>Az óra áll, a feladatok el vannak rejtve. Ha készen állsz, folytasd!</p><button type="button" class="btn primary" id="er-resume">▶ Folytatás</button></div>' +
      '<div class="card pad er-task" id="er-task"></div></div>';
    root = main.querySelector('#er-exam');
    var tb = document.querySelector('.topbar'); if (tb && getComputedStyle(tb).position === 'sticky') root.style.setProperty('--er-top', (tb.offsetHeight + 6) + 'px');
    var task = root.querySelector('#er-task'), pal = root.querySelector('#er-pal'), timerEl = root.querySelector('#er-timer');
    function persist() { var dd = load(); dd.cur = cur; save(dd); }
    function paintPal() {
      var html = '', last = -1;
      ex.items.forEach(function (it, i) {
        if (it.sec !== last) { last = it.sec; html += '<span class="er-palsec">' + esc(ex.secs[it.sec].title.split(' – ')[0]) + '</span>'; }
        html += '<button type="button" data-go="' + i + '" class="' + (i === cur.idx ? 'cur ' : '') + (filled(it, cur.ans[i]) ? 'done ' : '') + (cur.flag[i] ? 'flag' : '') + '" aria-label="' + (i + 1) + '. feladat">' + (i + 1) + '</button>';
      });
      var answered = ex.items.filter(function (it, i) { return filled(it, cur.ans[i]); }).length;
      pal.innerHTML = html + '<span class="er-palinfo">' + answered + '/' + N + ' megválaszolva</span>';
    }
    function paintTask() {
      var it = ex.items[cur.idx];
      task.innerHTML = '<div class="er-thead"><span>' + (cur.idx + 1) + '. feladat <small class="muted">· ' + esc(ex.secs[it.sec].title) + '</small></span><span class="chip">' + it.p + ' pont</span></div>' +
        '<div class="er-q">' + txt(it.q) + '</div>' + inputHtml(it, cur.ans[cur.idx]) +
        '<div class="er-nav"><button type="button" class="btn" data-step="-1"' + (cur.idx === 0 ? ' disabled' : '') + '>← Előző</button>' +
        '<button type="button" class="btn' + (cur.flag[cur.idx] ? ' on' : '') + '" id="er-flag">🚩 ' + (cur.flag[cur.idx] ? 'Megjelölve' : 'Megjelölöm később') + '</button>' +
        (cur.idx < N - 1 ? '<button type="button" class="btn primary" data-step="1">Következő →</button>' : '<button type="button" class="btn primary" id="er-submit2">✔ Beadás</button>') + '</div>';
      bindTask(it);
    }
    function setAns(v) { cur.ans[cur.idx] = v; persist(); paintPal(); }
    function bindTask(it) {
      var k = cur.idx;
      if (it.t === 'mc') task.querySelectorAll('input[type=radio]').forEach(function (r) { r.addEventListener('change', function () { setAns(+r.value); }); });
      if (it.t === 'multi') task.querySelectorAll('input[type=checkbox]').forEach(function (c) { c.addEventListener('change', function () {
        setAns(Array.prototype.slice.call(task.querySelectorAll('input[type=checkbox]:checked')).map(function (x) { return +x.value; })); }); });
      if (it.t === 'num' || it.t === 'lp') task.querySelectorAll('.er-num input').forEach(function (inp) { inp.addEventListener('input', function () {
        var a = (cur.ans[k] || []).slice(); a[+inp.dataset.i] = inp.value; setAns(a); }); });
      if (it.t === 'text') task.querySelector('.er-text').addEventListener('input', function (e) { setAns(e.target.value); });
      if (it.t === 'match') task.querySelectorAll('select').forEach(function (sel) { sel.addEventListener('change', function () {
        var a = (cur.ans[k] || []).slice(); a[+sel.dataset.i] = sel.value === '' ? '' : +sel.value; setAns(a); }); });
      if (it.t === 'tf') task.querySelectorAll('.er-tf button').forEach(function (b) { b.addEventListener('click', function () {
        var a = (cur.ans[k] || []).slice(); a[+b.dataset.i] = b.dataset.v; setAns(a); paintTask(); }); });
      if (it.t === 'order') task.querySelectorAll('[data-mv]').forEach(function (b) { b.addEventListener('click', function () {
        var o = ((cur.ans[k] && cur.ans[k].o) || it.perm).slice(), p = +b.dataset.mv, q = p + +b.dataset.d, t = o[p]; o[p] = o[q]; o[q] = t;
        setAns({ o: o, touched: true }); paintTask(); var f = task.querySelector('[data-mv="' + q + '"][data-d="' + b.dataset.d + '"]') || task.querySelector('[data-mv="' + q + '"]'); if (f) f.focus(); }); });
      if (it.t === 'order') task.querySelector('[data-okorder]').addEventListener('click', function () { setAns({ o: ((cur.ans[k] && cur.ans[k].o) || it.perm).slice(), touched: true }); paintTask(); });
      task.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { go(cur.idx + +b.dataset.step); }); });
      task.querySelector('#er-flag').addEventListener('click', function () { cur.flag[k] = !cur.flag[k]; persist(); paintPal(); paintTask(); });
      var s2 = task.querySelector('#er-submit2'); if (s2) s2.addEventListener('click', function () { submit(false); });
    }
    function go(i) { if (i < 0 || i >= N) return; cur.idx = i; persist(); paintPal(); paintTask(); task.scrollIntoView && root.getBoundingClientRect().top < 0 && root.scrollIntoView({ block: 'start' }); }
    function paintTimer() {
      timerEl.textContent = cur.lim ? '⏱ ' + fmtTime(cur.lim - cur.el) : '⏱ ' + fmtTime(cur.el);
      timerEl.title = cur.lim ? 'Hátralévő idő' : 'Eltelt idő (nincs időkorlát)';
      timerEl.classList.toggle('low', !!cur.lim && cur.lim - cur.el <= 300);
    }
    function setPaused(p) {
      paused = p;
      root.querySelector('#er-pause').textContent = p ? '▶ Folytatás' : '⏸ Szünet';
      root.querySelector('#er-paused').hidden = !p; task.hidden = p; pal.hidden = p;
    }
    function submit(auto) {
      var empty = ex.items.filter(function (it, i) { return !filled(it, cur.ans[i]); }).length;
      if (!auto && !confirm(empty ? 'Még ' + empty + ' feladatra nem válaszoltál. Biztosan beadod?' : 'Beadod a dolgozatot?')) return;
      clearInterval(timer);
      var pts = 0, srsLabel = 'Érettségi próba – ' + s.title;
      ex.items.forEach(function (it, i) {
        var g = score(it, cur.ans[i]); pts += g;
        if (it.t === 'mc' && S.srsRecord) S.srsRecord({ id: 'er-' + it.id, q: it.q, options: it.o, answer: it.a, explain: it.ex }, g === it.p, { label: srsLabel, href: '#/erettsegi/' + s.id });
      });
      var pct = Math.round(pts / ex.max * 100), gr = grade(pct, ex.info.szint === 'emelt'), dd = load(), id = Date.now();
      dd.hist.push({ id: id, subj: s.id, set: cur.set, seed: cur.seed, ans: cur.ans, el: cur.el, lim: cur.lim, date: id, pts: pts, max: ex.max, pct: pct, jegy: gr[0], auto: !!auto });
      if (dd.hist.length > 60) dd.hist = dd.hist.slice(-60);
      delete dd.cur; save(dd);
      location.hash = '#/erettsegi/' + s.id + '/eredmeny?id=' + id;
    }
    pal.addEventListener('click', function (e) { var b = e.target.closest('[data-go]'); if (b) go(+b.dataset.go); });
    root.querySelector('#er-pause').addEventListener('click', function () { setPaused(!paused); persist(); });
    root.querySelector('#er-resume').addEventListener('click', function () { setPaused(false); });
    root.querySelector('#er-submit').addEventListener('click', function () { submit(false); });
    var tick = 0, timer = setInterval(function () {
      if (!document.body.contains(root)) { clearInterval(timer); return; }
      if (paused) return;
      cur.el++; tick++; paintTimer();
      if (tick % 5 === 0) persist();
      if (cur.lim && cur.el >= cur.lim) { persist(); alert('⏰ Lejárt az idő! A dolgozatot beadjuk.'); submit(true); }
    }, 1000);
    paintPal(); paintTask(); paintTimer(); setPaused(paused);
    return true;
  }

  /* ---------- eredmény ---------- */
  function pageResult(main, s, params) {
    var d = load(), h = d.hist.filter(function (x) { return String(x.id) === String(params.id) && x.subj === s.id; })[0];
    if (!h) return false;
    var ex = build(s, h.set, h.seed); if (!ex) return false;
    var emelt = ex.info.szint === 'emelt', gr = grade(h.pct, emelt);
    var secPts = ex.secs.map(function () { return [0, 0]; });
    var rows = ex.items.map(function (it, i) {
      var g = score(it, h.ans[i]); secPts[it.sec][0] += g; secPts[it.sec][1] += it.p;
      var cls = g === it.p ? 'ok' : g > 0 ? 'part' : 'bad';
      return '<details class="er-res ' + cls + '"><summary><span class="er-rn">' + (i + 1) + '.</span><span class="er-rq">' + S.inline(String(it.q).split('\n')[0].slice(0, 140)) + '</span><b class="er-rp">' + g + '/' + it.p + '</b></summary>' +
        '<div class="er-rbody"><div class="er-q">' + txt(it.q) + '</div><p><b>A te válaszod:</b> ' + ansHtml(it, h.ans[i]) + '</p><p><b>Helyes válasz:</b> ' + keyHtml(it) + '</p>' +
        (it.ex ? '<div class="er-ex"><b>Magyarázat:</b> ' + txt(it.ex) + '</div>' : '') + '</div></details>';
    }).join('');
    var wrongMc = ex.items.filter(function (it, i) { return it.t === 'mc' && score(it, h.ans[i]) < it.p; }).length;
    main.innerHTML = crumbs([['Érettségi próbavizsgák', '#/erettsegi'], [s.title, '#/erettsegi/' + s.id], ['Eredmény']]) +
      '<h1>📊 Eredményed – ' + esc(s.title) + '</h1><p class="muted">' + esc(ex.info.title) + ' · ' + fmtDate(h.date) + (h.auto ? ' · lejárt az idő, automatikusan beadva' : '') + '</p>' +
      '<div class="er-sum card pad"><div class="er-big"><b>' + h.pct + '%</b><small>' + h.pts + ' / ' + h.max + ' pont</small></div>' +
      '<div class="er-big g' + gr[0] + '"><b>' + gr[0] + '</b><small>' + gr[1] + ' (tájékoztató, ' + (emelt ? 'emelt' : 'közép') + 'szintű ponthatárokkal)</small></div>' +
      '<div class="er-big"><b>' + fmtTime(h.el) + '</b><small>felhasznált idő' + (h.lim ? ' / ' + Math.round(h.lim / 60) + ' perc' : '') + '</small></div>' +
      '<div class="er-secs">' + ex.secs.map(function (sc, i) { var p = secPts[i][1] ? Math.round(secPts[i][0] / secPts[i][1] * 100) : 0; return '<div><span>' + esc(sc.title) + '</span><span class="bar"><i style="width:' + p + '%"></i></span><b>' + secPts[i][0] + '/' + secPts[i][1] + '</b></div>'; }).join('') + '</div></div>' +
      (wrongMc && S.srsRecord ? '<p class="note tip">🔁 A ' + wrongMc + ' elrontott feleletválasztós kérdés bekerült az <a href="#/ismetles">okos ismétlésbe</a> – holnap újra elődobja.</p>' : '') +
      '<div class="row er-actions"><button type="button" class="btn primary" id="er-again">🔄 Újra (új számokkal)</button><a class="btn" href="#/erettsegi/' + s.id + '/nyomtat?sor=' + h.set + '&seed=' + h.seed + '&kulcs=1">🖨️ Javítókulcs nyomtatása</a><a class="btn" href="#/erettsegi/' + s.id + '">↩ ' + esc(s.title) + '</a>' +
      '<button type="button" class="btn" id="er-openall">Összes kinyitása</button></div>' +
      '<h2>Javítókulcs feladatonként</h2><div class="er-results">' + rows + '</div>' +
      '<details class="card pad er-info"><summary>ℹ️ Ponthatárok (tájékoztató)</summary>' + gradeTable() + '</details>';
    main.querySelector('#er-openall').addEventListener('click', function () { main.querySelectorAll('.er-res').forEach(function (x) { x.open = true; }); });
    main.querySelector('#er-again').addEventListener('click', function () {
      var dd = load(); if (dd.cur && !confirm('Van egy félbehagyott próbavizsgád. Ha újat kezdesz, az elvész. Folytatod?')) return;
      var ido = S.store.get('erettsegi.ido', 'ajanlott');
      dd.cur = { subj: s.id, set: h.set, seed: Math.floor(Math.random() * 1e9) + 1, lim: ido === 'nincs' ? 0 : (ido === 'valodi' ? ex.info.valodi : ex.info.ido) * 60, el: 0, ans: {}, flag: {}, idx: 0, start: Date.now() };
      save(dd); location.hash = '#/erettsegi/' + s.id + '/vizsga';
    });
    return true;
  }

  /* ---------- nyomtatható változat ---------- */
  function printTask(it, i) {
    var body = '';
    switch (it.t) {
      case 'mc': case 'multi':
        body = (it.t === 'multi' ? '<p class="er-small"><i>Több helyes válasz is lehet.</i></p>' : '') + '<ol class="er-pl" type="A">' + it.perm.map(function (oi) { return '<li>☐ ' + S.inline(it.o[oi]) + '</li>'; }).join('') + '</ol>'; break;
      case 'num': case 'lp':
        body = '<p class="er-lines">' + it.n.map(function (pt) { return esc(pt.l || 'válasz') + ' = ______________ ' + esc(pt.u || ''); }).join('&emsp;&emsp;') + '</p>'; break;
      case 'text': body = '<p class="er-lines">Válasz: ________________________________</p>'; break;
      case 'match':
        body = '<div class="er-pm"><ol>' + it.pairs.map(function (x) { return '<li>' + S.inline(x[0]) + ' → ____</li>'; }).join('') + '</ol><ol type="A">' + it.perm.map(function (ri) { return '<li>' + S.inline(it.pairs[ri][1]) + '</li>'; }).join('') + '</ol></div>'; break;
      case 'tf':
        body = '<table class="er-ptf">' + it.st.map(function (x, j) { return '<tr><td>' + (j + 1) + '. ' + S.inline(x[0]) + '</td><td>☐ I</td><td>☐ H</td></tr>'; }).join('') + '</table>'; break;
      case 'order':
        body = '<ol type="A" class="er-pl">' + it.perm.map(function (ii) { return '<li>' + S.inline(it.items[ii]) + '</li>'; }).join('') + '</ol><p class="er-lines">Helyes sorrend (betűkkel): ______________________</p>'; break;
    }
    return '<div class="er-ptask"><div class="er-thead"><b>' + (i + 1) + '. feladat</b><span>' + it.p + ' pont</span></div><div class="er-q">' + txt(it.q) + '</div>' + body + '</div>';
  }
  function pagePrint(main, s, params) {
    var seed = /^\d+$/.test(params.seed || '') ? +params.seed : Math.floor(Math.random() * 1e9) + 1, kulcs = params.kulcs === '1';
    var ex = build(s, params.sor || 'k1', seed); if (!ex) return false;
    var base = '#/erettsegi/' + s.id + '/nyomtat?sor=' + ex.info.id + '&seed=' + seed;
    var html = '<div class="er-print"><header class="er-phead"><h1>' + s.icon + ' ' + esc(s.title) + ' – ' + esc(ex.info.title) + (kulcs ? ' · JAVÍTÓKULCS' : '') + '</h1>' +
      '<p>Tudásműhely · saját, érettségi-szerű próbasor (nem hivatalos feladatlap) · változat: ' + seed + '</p>' +
      (kulcs ? '' : '<p class="er-lines">Név: ______________________________ &emsp; Dátum: ______________ &emsp; Időkeret: ' + ex.info.ido + ' perc &emsp; Elérhető: ' + ex.max + ' pont</p>') + '</header>';
    var last = -1;
    ex.items.forEach(function (it, i) {
      if (it.sec !== last) { last = it.sec; html += '<h2>' + esc(ex.secs[it.sec].title) + '</h2>'; }
      if (!kulcs) html += printTask(it, i);
      else html += '<div class="er-ptask"><div class="er-thead"><b>' + (i + 1) + '. feladat</b><span>' + it.p + ' pont</span></div><div class="er-q er-small">' + txt(it.q) + '</div><p><b>Megoldás:</b> ' + keyHtml(it) + '</p>' + (it.ex ? '<div class="er-ex er-small">' + txt(it.ex) + '</div>' : '') + '</div>';
    });
    if (kulcs) html += '<h2>Értékelés (tájékoztató)</h2><p>Összesen ' + ex.max + ' pont. Részpontozás: többszörös választásnál minden rossz jelölés levon egy helyeset; párosításnál, igaz–hamisnál, sorba rendezésnél és többrészes számolásnál a helyes részek arányában jár pont.</p>' + gradeTable();
    html += '</div>';
    main.innerHTML = crumbs([['Érettségi próbavizsgák', '#/erettsegi'], [s.title, '#/erettsegi/' + s.id], ['Nyomtatható']]) +
      '<div class="row er-noprint"><button type="button" class="btn primary" id="er-print">🖨️ Nyomtatás</button>' +
      '<a class="btn' + (kulcs ? '' : ' on') + '" href="' + base + '">📝 Feladatlap</a><a class="btn' + (kulcs ? ' on' : '') + '" href="' + base + '&kulcs=1">🔑 Javítókulcs</a>' +
      '<a class="btn" href="#/erettsegi/' + s.id + '/nyomtat?sor=' + ex.info.id + '&seed=' + (Math.floor(Math.random() * 1e9) + 1) + '">🎲 Új változat</a></div>' +
      '<p class="muted er-small er-noprint">A feladatlap és a javítókulcs ugyanahhoz a változathoz (' + seed + ') tartozik, így külön lapra nyomtathatók.</p>' + html;
    main.querySelector('#er-print').addEventListener('click', function () { window.print(); });
    return true;
  }

  S.addRoute('erettsegi', {
    title: 'Érettségi próbavizsgák', nav: '',
    page: function (main, rest, params) {
      params = params || {};
      if (!rest || !rest[0]) return pageHub(main);
      var s = subjById(rest[0]); if (!s) return false;
      if (rest[1] === 'vizsga') return pageExam(main, s);
      if (rest[1] === 'eredmeny') return pageResult(main, s, params);
      if (rest[1] === 'nyomtat') return pagePrint(main, s, params);
      if (rest[1]) return false;
      return pageSubject(main, s);
    }
  });

  /* Teszteléshez. */
  S.erettsegi = { SUBJ: SUBJ, build: build, score: score, grade: grade, filled: filled, countItems: countItems };
})();
