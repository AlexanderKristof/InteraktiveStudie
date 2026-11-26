/* Tudásműhely – ∑ Képletgyűjtemény és kalkulátorok.
 * Adat: data/kepletek.js (STUDIE.KEPLETEK = { cats, list }).
 * Útvonalak: #/kepletek (kereső, kategóriák, kedvencek) · #/kepletek/<id> (képlet + kalkulátor) · #/kepletek/lap (nyomtatható képletlap)
 * A képletek szövegesen vannak megadva ("v = s/t"); ezt egy kis elemző (parse) fa-szerkezetté alakítja,
 * amiből ugyanaz a kód számol (ev), szép HTML-képletet rajzol (html) és behelyettesített lépést mutat.
 * Bármelyik változó kiszámítható: ha van megadott átrendezés (inv), azt használjuk, különben numerikusan
 * (rácskeresés + felezés) keressük meg a gyök(ök)et. Minden belső számolás SI-alapegységekben történik. */
(function () {
  'use strict';
  var S = window.STUDIE = window.STUDIE || {};
  var K = S.kepletKalk = {};

  /* ---------- mértékegységek: [címke, szorzó az SI-alaphoz, eltolás] ---------- */
  var U = {
    len: [['m', 1], ['km', 1000], ['dm', 0.1], ['cm', 0.01], ['mm', 1e-3], ['µm', 1e-6], ['nm', 1e-9]],
    area: [['m²', 1], ['dm²', 1e-2], ['cm²', 1e-4], ['mm²', 1e-6], ['km²', 1e6], ['ha', 1e4]],
    vol: [['m³', 1], ['dm³', 1e-3], ['L', 1e-3], ['cm³', 1e-6], ['mL', 1e-6], ['mm³', 1e-9]],
    time: [['s', 1], ['ms', 1e-3], ['perc', 60], ['h', 3600], ['nap', 86400], ['év', 31557600]],
    speed: [['m/s', 1], ['km/h', 1 / 3.6]],
    acc: [['m/s²', 1]],
    mass: [['kg', 1], ['g', 1e-3], ['mg', 1e-6], ['t', 1000]],
    force: [['N', 1], ['kN', 1e3], ['MN', 1e6], ['mN', 1e-3]],
    energy: [['J', 1], ['kJ', 1e3], ['MJ', 1e6], ['Wh', 3600], ['kWh', 3.6e6], ['cal', 4.1868], ['kcal', 4186.8], ['eV', 1.602176634e-19]],
    power: [['W', 1], ['mW', 1e-3], ['kW', 1e3], ['MW', 1e6], ['LE', 735.49875]],
    press: [['Pa', 1], ['hPa', 100], ['kPa', 1e3], ['MPa', 1e6], ['bar', 1e5], ['atm', 101325], ['Hgmm', 133.322]],
    temp: [['K', 1, 0], ['°C', 1, 273.15], ['°F', 5 / 9, 273.15 - 32 * 5 / 9]],
    dtemp: [['K', 1], ['°C', 1]],
    current: [['A', 1], ['mA', 1e-3], ['µA', 1e-6], ['kA', 1e3]],
    volt: [['V', 1], ['mV', 1e-3], ['kV', 1e3]],
    res: [['Ω', 1], ['mΩ', 1e-3], ['kΩ', 1e3], ['MΩ', 1e6]],
    cap: [['F', 1], ['mF', 1e-3], ['µF', 1e-6], ['nF', 1e-9], ['pF', 1e-12]],
    ind: [['H', 1], ['mH', 1e-3], ['µH', 1e-6]],
    charge: [['C', 1], ['mC', 1e-3], ['µC', 1e-6], ['nC', 1e-9], ['mAh', 3.6], ['Ah', 3600]],
    freq: [['Hz', 1], ['kHz', 1e3], ['MHz', 1e6], ['GHz', 1e9], ['1/perc', 1 / 60]],
    angle: [['°', Math.PI / 180], ['rad', 1]],
    angvel: [['rad/s', 1], ['°/s', Math.PI / 180], ['fordulat/perc', 2 * Math.PI / 60]],
    dens: [['kg/m³', 1], ['g/cm³', 1000], ['kg/dm³', 1000], ['g/dm³', 1]],
    mol: [['mol', 1], ['mmol', 1e-3], ['kmol', 1e3]],
    molm: [['kg/mol', 1], ['g/mol', 1e-3]],
    molv: [['m³/mol', 1], ['dm³/mol', 1e-3]],
    conc: [['mol/m³', 1], ['mol/dm³', 1000], ['mmol/dm³', 1]],
    mconc: [['kg/m³', 1], ['g/dm³', 1], ['mg/dm³', 1e-3], ['g/cm³', 1000]],
    pct: [['%', 0.01], ['(tizedes tört)', 1]],
    prob: [['', 1], ['%', 0.01]],
    num: [['', 1]],
    money: [['Ft', 1], ['ezer Ft', 1e3], ['millió Ft', 1e6]],
    shc: [['J/(kg·K)', 1], ['kJ/(kg·K)', 1e3]],
    latent: [['J/kg', 1], ['kJ/kg', 1e3], ['MJ/kg', 1e6]],
    emol: [['J/mol', 1], ['kJ/mol', 1e3]],
    entr: [['J/K', 1], ['kJ/K', 1e3]],
    momentum: [['kg·m/s', 1]],
    torque: [['N·m', 1], ['kN·m', 1e3]],
    stiff: [['N/m', 1], ['N/cm', 100], ['kN/m', 1e3]],
    rate: [['1/s', 1], ['1/perc', 1 / 60], ['1/h', 1 / 3600], ['1/nap', 1 / 86400], ['1/év', 1 / 31557600]],
    resist: [['Ω·m', 1], ['Ω·mm²/m', 1e-6]],
    flux: [['T', 1], ['mT', 1e-3], ['µT', 1e-6]],
    flow: [['m³/s', 1], ['L/s', 1e-3], ['L/perc', 1e-3 / 60], ['m³/h', 1 / 3600]],
    lpm: [['1/m', 1], ['dpt', 1]],
    db: [['dB', 1]],
    intens: [['W/m²', 1], ['mW/m²', 1e-3], ['µW/m²', 1e-6]],
    ftkwh: [['Ft/kWh', 1 / 3.6e6]],
    act: [['Bq', 1], ['kBq', 1e3], ['MBq', 1e6]]
  };
  K.units = U;
  /* 'x:<címke>' → egyetlen, SI-nek tekintett egység */
  function dimUnits(dim) { return U[dim] || [[dim.replace(/^x:/, ''), 1]]; }
  function unitRow(dim, label) { var l = dimUnits(dim); for (var i = 0; i < l.length; i++) if (l[i][0] === label) return l[i]; return l[0]; }
  K.toSI = function (x, dim, label) { var r = unitRow(dim, label); return x * r[1] + (r[2] || 0); };
  K.fromSI = function (x, dim, label) { var r = unitRow(dim, label); return (x - (r[2] || 0)) / r[1]; };
  K.dimUnits = dimUnits;
  /* az SI-alapegység címkéje (szorzó 1, eltolás 0) – pl. szögnél rad, %-nál tizedes tört */
  function siLabel(dim) { var l = dimUnits(dim); for (var i = 0; i < l.length; i++) if (l[i][1] === 1 && !l[i][2]) return l[i][0]; return l[0][0]; }
  K.siLabel = siLabel;

  /* ---------- kifejezés-elemző ---------- */
  var FUN = {
    sqrt: Math.sqrt, cbrt: function (x) { return x < 0 ? -Math.pow(-x, 1 / 3) : Math.pow(x, 1 / 3); },
    sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan,
    ln: Math.log, lg: function (x) { return Math.log(x) / Math.LN10; }, log: function (b, x) { return Math.log(x) / Math.log(b); },
    exp: Math.exp, abs: Math.abs,
    fact: function (x) { return (x < 0 || x > 1e6) ? NaN : gamma(x + 1); },
    comb: function (n, k) { return (k < 0 || n < 0 || k > n || n > 1e6) ? NaN : Math.exp(lgam(n + 1) - lgam(k + 1) - lgam(n - k + 1)); },
    perm: function (n, k) { return (k < 0 || n < 0 || k > n || n > 1e6) ? NaN : Math.exp(lgam(n + 1) - lgam(n - k + 1)); },
    Phi: function (z) { return 0.5 * erfc(-z / Math.SQRT2); }
  };
  var GCF = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  function gamma(x) {
    if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
    if (x === Math.round(x) && x < 171) { var f = 1; for (var i = 2; i < x; i++) f *= i; return f; }
    x -= 1; var a = GCF[0], t = x + 7.5;
    for (var k = 1; k < 9; k++) a += GCF[k] / (x + k);
    return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
  }
  function lgam(x) { if (x === Math.round(x) && x > 0 && x < 171) return Math.log(gamma(x)); if (x < 0.5) return Math.log(Math.abs(gamma(x))); x -= 1; var a = GCF[0], t = x + 7.5; for (var k = 1; k < 9; k++) a += GCF[k] / (x + k); return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a); }
  function erfc(x) { /* Numerical Recipes erfcc, relatív hiba < 1,2·10⁻⁷ */
    var z = Math.abs(x), t = 1 / (1 + 0.5 * z);
    var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return x >= 0 ? r : 2 - r;
  }
  K.fn = FUN;

  function tokenize(s) {
    var out = [], m, i = 0;
    s = String(s).replace(/\s+$/, '');
    while (i < s.length) {
      var rest = s.slice(i);
      m = /^\s*(?:(\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|([-+*\/^(),]))/.exec(rest);
      if (!m) throw new Error('Értelmezhetetlen rész: „' + rest.trim().slice(0, 12) + '”');
      if (m[1] != null) out.push({ t: 'n', v: parseFloat(m[1]) });
      else if (m[2] != null) out.push({ t: 'id', v: m[2] });
      else out.push({ t: m[3] });
      i += m[0].length;
    }
    return out;
  }
  function parse(src) {
    var tk = tokenize(src), p = 0;
    function peek() { return tk[p] && tk[p].t; }
    function eat(t) { if (peek() !== t) throw new Error('Hiányzik: ' + t); return tk[p++]; }
    function expr() {
      var a = term();
      while (peek() === '+' || peek() === '-') { var o = tk[p++].t; a = { t: o, a: a, b: term() }; }
      return a;
    }
    function term() {
      var a = unary();
      while (peek() === '*' || peek() === '/') { var o = tk[p++].t; a = { t: o, a: a, b: unary() }; }
      return a;
    }
    function unary() {
      if (peek() === '-') { p++; return { t: 'neg', a: unary() }; }
      if (peek() === '+') { p++; return unary(); }
      return power();
    }
    function power() {
      var a = atom();
      if (peek() === '^') { p++; return { t: '^', a: a, b: unary() }; }
      return a;
    }
    function atom() {
      var x = tk[p];
      if (!x) throw new Error('Váratlan vége');
      if (x.t === 'n') { p++; return { t: 'n', v: x.v }; }
      if (x.t === '(') { p++; var e = expr(); eat(')'); return e; }
      if (x.t === 'id') {
        p++;
        if (peek() === '(') {
          if (!FUN[x.v]) throw new Error('Ismeretlen függvény: ' + x.v);
          p++; var args = [expr()];
          while (peek() === ',') { p++; args.push(expr()); }
          eat(')');
          return { t: 'f', n: x.v, args: args };
        }
        if (x.v === 'pi') return { t: 'pi' };
        return { t: 'v', n: x.v };
      }
      throw new Error('Váratlan jel: ' + x.t);
    }
    var r = expr();
    if (p < tk.length) throw new Error('Felesleges rész a végén');
    return r;
  }
  K.parse = parse;

  function ev(n, env) {
    switch (n.t) {
      case 'n': return n.v;
      case 'pi': return Math.PI;
      case 'v': if (!(n.n in env)) throw new Error('Hiányzó érték: ' + n.n); return env[n.n];
      case '+': return ev(n.a, env) + ev(n.b, env);
      case '-': return ev(n.a, env) - ev(n.b, env);
      case '*': return ev(n.a, env) * ev(n.b, env);
      case '/': return ev(n.a, env) / ev(n.b, env);
      case '^': return Math.pow(ev(n.a, env), ev(n.b, env));
      case 'neg': return -ev(n.a, env);
      case 'f': return FUN[n.n].apply(null, n.args.map(function (a) { return ev(a, env); }));
    }
    throw new Error('?');
  }
  K.ev = ev;
  function varsOf(n, acc) {
    acc = acc || {};
    if (n.t === 'v') acc[n.n] = 1;
    if (n.a) varsOf(n.a, acc); if (n.b) varsOf(n.b, acc);
    if (n.args) n.args.forEach(function (a) { varsOf(a, acc); });
    return acc;
  }
  K.varsOf = varsOf;

  /* ---------- számformátum ---------- */
  var SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  function group(intStr) { return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function fmtNum(x, sig) {
    if (x == null || isNaN(x)) return '–';
    if (!isFinite(x)) return x > 0 ? '∞' : '−∞';
    if (x === 0) return '0';
    sig = sig || 4;
    var ax = Math.abs(x), e = Math.floor(Math.log(ax) / Math.LN10);
    if (Math.pow(10, e + 1) <= ax) e++;
    var s;
    if (ax >= 1e9 || ax < 1e-4) {
      var m = x / Math.pow(10, e), mr = +m.toFixed(sig - 1);
      if (Math.abs(mr) >= 10) { mr /= 10; e++; }
      s = String(+mr.toFixed(sig - 1)).replace('.', ',').replace('-', '−') + '·10' + String(e).split('').map(function (c) { return SUP[c]; }).join('');
      return s;
    }
    var d = Math.max(0, sig - 1 - e);
    s = (+x.toFixed(d)).toFixed(d);
    if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    var neg = s.charAt(0) === '-'; if (neg) s = s.slice(1);
    var parts = s.split('.');
    return (neg ? '−' : '') + group(parts[0]) + (parts[1] ? ',' + parts[1] : '');
  }
  K.fmtNum = fmtNum;
  /* Beírt szám értelmezése: tizedesvessző, szóköz, 1,5·10^-3, sőt egyszerű kifejezés (2*pi, 1/3, sqrt(2)) is. */
  K.parseInput = function (s) {
    s = String(s == null ? '' : s).trim();
    if (!s) return NaN;
    var SUPI = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
    s = s.replace(/10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, function (m, e) { return '10^' + e.split('').map(function (c) { return SUPI[c]; }).join(''); });
    s = s.replace(/[\u00a0\u202f ]/g, '').replace(/−/g, '-').replace(/[×·]/g, '*').replace(/,/g, '.').replace(/π/g, 'pi')
      .replace(/\*?10\^\(?(-?\d+)\)?/g, function (m, e) { return (/^\*/.test(m) ? '*' : '') + '1e' + e; });
    if (/^-?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(s)) return parseFloat(s);
    try { var a = parse(s); if (Object.keys(varsOf(a)).length) return NaN; return ev(a, {}); } catch (e) { return NaN; }
  };

  /* ---------- HTML-képlet a fából ---------- */
  var GREEK = { alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', Delta: 'Δ', eps: 'ε', epsilon: 'ε', eta: 'η', theta: 'θ', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', rho: 'ρ', sigma: 'σ', Sigma: 'Σ', tau: 'τ', phi: 'φ', Phi: 'Φ', omega: 'ω', Omega: 'Ω', varphi: 'φ' };
  K.symOf = function (key) {
    var base = key, sub = '';
    var i = key.indexOf('_');
    if (i > 0) { base = key.slice(0, i); sub = key.slice(i + 1); }
    else { var m = /^([A-Za-z]+?)(\d+)$/.exec(key); if (m && (m[1].length === 1 || GREEK[m[1]])) { base = m[1]; sub = m[2]; } }
    var b = GREEK[base] || base;
    var sb = sub ? (GREEK[sub] || sub) : '';
    return b + (sb ? '<sub>' + sb + '</sub>' : '');
  };
  function prec(n) {
    switch (n.t) {
      case '+': case '-': return 1;
      case '*': return 2;
      case '/': return 2;
      case 'neg': return 2.5;
      case '^': return 4;
      case 'n': return n.v < 0 ? 2.5 : 5;
      case 'val': return n.low ? 2.5 : 5;
      default: return 5;
    }
  }
  function isFracLike(n, inl) { return n.t === '/' && !inl; }
  /* opts: { sym: {kulcs: html}, vals: {kulcs: szám} (behelyettesítéshez), inl: soron belül (kitevőben) } */
  function html(n, o, inl) {
    var sym = o.sym || {};
    function wrap(x, need) { return need ? '(' + x + ')' : x; }
    function H(x, i) { return html(x, o, i == null ? inl : i); }
    switch (n.t) {
      case 'n': return fmtNum(n.v, 10);
      case 'pi': return 'π';
      case 'v':
        if (o.vals && n.n in o.vals) { var vs = fmtNum(o.vals[n.n], 6); return (o.vals[n.n] < 0 || vs.indexOf('·') >= 0) ? '(' + vs + ')' : vs; }
        return '<var>' + (sym[n.n] || K.symOf(n.n)) + '</var>';
      case '+': return H(n.a) + ' + ' + H(n.b);
      case '-': return H(n.a) + ' − ' + wrap(H(n.b), prec(n.b) <= 1);
      case '*':
        var l = H(n.a), r = H(n.b), pl = prec(n.a), pr = prec(n.b);
        var lw = wrap(l, pl < 2), rw = wrap(r, pr < 2.5 || n.b.t === 'neg');
        var juxt = !o.vals && n.a.t === 'n' && (n.b.t === 'v' || n.b.t === 'pi' || n.b.t === 'f' || (n.b.t === '^' && n.b.a.t !== 'n'));
        if (!juxt && !o.vals && n.a.t === 'pi' && n.b.t !== 'n') juxt = true;
        return juxt ? lw + rw : lw + ' · ' + rw;
      case '/':
        if (inl) return wrap(H(n.a), prec(n.a) < 2) + '/' + wrap(H(n.b), prec(n.b) < 5);
        return '<span class="kf-fr"><span class="kf-nu">' + H(n.a) + '</span><span class="kf-de">' + H(n.b) + '</span></span>';
      case 'neg': return '−' + wrap(H(n.a), prec(n.a) < 2 || n.a.t === 'neg');
      case '^':
        var base = H(n.a), bp = prec(n.a);
        if (n.a.t === 'f' && n.a.n === 'sqrt') bp = 0;
        return wrap(base, bp < 5 || isFracLike(n.a, inl)) + '<sup>' + html(n.b, o, true) + '</sup>';
      case 'f':
        var A = n.args.map(function (a) { return H(a); });
        switch (n.n) {
          case 'sqrt': return inl ? '√(' + A[0] + ')' : '<span class="kf-sq">√<span class="kf-rad">' + A[0] + '</span></span>';
          case 'cbrt': return inl ? '∛(' + A[0] + ')' : '<span class="kf-sq">∛<span class="kf-rad">' + A[0] + '</span></span>';
          case 'abs': return '|' + A[0] + '|';
          case 'exp': return 'e<sup>' + html(n.args[0], o, true) + '</sup>';
          case 'fact': return wrap(A[0], prec(n.args[0]) < 5) + '!';
          case 'comb': return inl ? 'C(' + A.join('; ') + ')' : '<span class="kf-binom">(<span class="kf-fr kf-nol"><span class="kf-nu">' + A[0] + '</span><span class="kf-de">' + A[1] + '</span></span>)</span>';
          case 'log': return 'log<sub>' + html(n.args[0], o, true) + '</sub>' + wrap(A[1], prec(n.args[1]) < 5);
          case 'perm': return 'V(' + A.join('; ') + ')';
          default:
            var simpleArg = n.args.length === 1 && (n.args[0].t === 'v' || n.args[0].t === 'n') && !o.vals;
            var FN = { asin: 'arcsin', acos: 'arccos', atan: 'arctg', tan: 'tg' };
            return '<span class="kf-fn">' + (FN[n.n] || n.n) + '</span>' + (simpleArg ? '&#8201;' + A[0] : '(' + A.join('; ') + ')');
        }
    }
    return '?';
  }
  K.html = function (ast, o) { return html(ast, o || {}, false); };

  /* ---------- képletek előkészítése ---------- */
  var DATA = S.KEPLETEK || { cats: [], list: [] };
  K.data = DATA;
  function prep(F) {
    if (F._p) return F;
    F.vars = (F.v || []).map(function (a) {
      var o = a[4] || {}, du = String(a[2] || 'num'), ci = du.indexOf(':'), dim = du, unit;
      if (ci > 0 && du.slice(0, 2) !== 'x:') { dim = du.slice(0, ci); unit = du.slice(ci + 1); }
      else unit = dimUnits(dim)[0][0];
      return { k: a[0], name: a[1], dim: dim, unit: unit, ex: a[3], c: !!o.c, neg: !!o.neg, int: !!o.int, rng: o.rng, s: o.s || K.symOf(a[0]), no: !!o.no };
    });
    F.byK = {}; F.vars.forEach(function (x) { F.byK[x.k] = x; });
    F.sym = {}; F.vars.forEach(function (x) { F.sym[x.k] = x.s; });
    if (F.f) {
      var eq = F.f.split('=');
      F.y = eq[0].trim(); F.rhs = parse(eq.slice(1).join('='));
      F.invA = {}; Object.keys(F.inv || {}).forEach(function (k) { F.invA[k] = [].concat(F.inv[k]).map(parse); });
    }
    F._p = true;
    return F;
  }
  K.prep = prep;
  K.byId = function (id) { var f = DATA.list.filter(function (x) { return x.id === id; })[0]; return f ? prep(f) : null; };
  K.targets = function (F) { prep(F); if (F.list) return []; return F.vars.filter(function (x) { return !x.c && !x.no; }).map(function (x) { return x.k; }); };

  /* Numerikus gyökkeresés: rács mentén előjelváltást keresünk, majd felezünk. */
  function findRoots(g, v, yScale) {
    var xs = [], i;
    if (v.rng) { for (i = 0; i <= 720; i++) xs.push(v.rng[0] + (v.rng[1] - v.rng[0]) * i / 720); }
    else {
      var pos = []; for (i = -400; i <= 400; i++) pos.push(Math.pow(10, i / 10));
      if (v.neg) { xs = pos.slice().reverse().map(function (x) { return -x; }); xs.push(0); xs = xs.concat(pos); }
      else xs = pos;
    }
    var gs = xs.map(function (x) { var r; try { r = g(x); } catch (e) { r = NaN; } return isFinite(r) ? r : NaN; });
    var roots = [];
    for (i = 0; i < xs.length; i++) {
      if (gs[i] === 0) { roots.push(xs[i]); continue; }
      if (i === 0) continue;
      var ga = gs[i - 1], gb = gs[i];
      if (isNaN(ga) || isNaN(gb) || ga === 0 || (ga > 0) === (gb > 0)) continue;
      var a = xs[i - 1], b = xs[i], fa = ga, big = Math.max(Math.abs(ga), Math.abs(gb));
      for (var it = 0; it < 200; it++) {
        var m = (a + b) / 2;
        if (m === a || m === b) break;
        var fm = g(m);
        if (!isFinite(fm)) break;
        if (fm === 0) { a = b = m; break; }
        if ((fm > 0) === (fa > 0)) { a = m; fa = fm; } else b = m;
      }
      var r = (a + b) / 2, gr = g(r);
      if (isFinite(gr) && Math.abs(gr) <= 1e-6 * big + 1e-300) roots.push(r);
    }
    /* érintő (kettős) gyök: |g| helyi minimuma közel nullához → aranymetszéses keresés */
    for (i = 1; i < xs.length - 1; i++) {
      var g0 = gs[i - 1], g1 = gs[i], g2 = gs[i + 1];
      if (isNaN(g0) || isNaN(g1) || isNaN(g2) || (g0 > 0) !== (g1 > 0) || (g1 > 0) !== (g2 > 0)) continue;
      if (!(Math.abs(g1) <= Math.abs(g0) && Math.abs(g1) <= Math.abs(g2))) continue;
      var lo = xs[i - 1], hi = xs[i + 1], R = 0.6180339887;
      for (var j = 0; j < 160; j++) {
        var c1 = hi - R * (hi - lo), c2 = lo + R * (hi - lo), f1 = Math.abs(g(c1)), f2 = Math.abs(g(c2));
        if (!(f1 >= f2)) hi = c2; else lo = c1;
      }
      var xm = (lo + hi) / 2, gm = Math.abs(g(xm)), sc = Math.max(Math.abs(g0), Math.abs(g2));
      if (isFinite(gm) && gm <= 1e-9 * sc && gm <= 1e-7 * (Math.abs(yScale) || sc)) roots.push(xm);
    }
    var out = [];
    roots.forEach(function (r) { if (!out.some(function (q) { return Math.abs(q - r) <= 1e-9 * Math.max(Math.abs(q), Math.abs(r), 1e-300); })) out.push(r); });
    return out;
  }
  K.findRoots = findRoots;

  /* target kiszámítása az SI-értékekből (vals: minden más változó). → { roots, how: 'fo'|'inv'|'num', ast } */
  K.solve = function (F, target, vals) {
    prep(F);
    if (target === F.y) return { roots: [ev(F.rhs, vals)], how: 'fo', asts: [F.rhs] };
    if (F.invA[target]) {
      var rs = [];
      F.invA[target].forEach(function (a) { var r = ev(a, vals); if (isFinite(r) && !rs.some(function (q) { return Math.abs(q - r) <= 1e-12 * Math.max(Math.abs(q), 1e-300); })) rs.push(r); });
      return { roots: rs, how: 'inv', asts: F.invA[target] };
    }
    var y = vals[F.y], env = {};
    Object.keys(vals).forEach(function (k) { env[k] = vals[k]; });
    var g = function (x) { env[target] = x; return ev(F.rhs, env) - y; };
    return { roots: findRoots(g, F.byK[target], y), how: 'num' };
  };
  K.numSolve = function (F, target, vals) {
    prep(F);
    var y = vals[F.y], env = {};
    Object.keys(vals).forEach(function (k) { env[k] = vals[k]; });
    return findRoots(function (x) { env[target] = x; return ev(F.rhs, env) - y; }, F.byK[target], y);
  };
  /* A példa értékei SI-ben, a fő változóval együtt */
  K.exampleSI = function (F) {
    prep(F);
    var v = {};
    F.vars.forEach(function (x) { if (x.k !== F.y && x.ex != null) v[x.k] = K.toSI(x.ex, x.dim, x.unit); });
    if (F.rhs) v[F.y] = ev(F.rhs, v);
    return v;
  };

  function headHtml(F) {
    prep(F);
    if (F.h) return F.h;
    if (F.list) return F.lh || '';
    return '<var>' + F.sym[F.y] + '</var> = ' + K.html(F.rhs, { sym: F.sym });
  }
  K.headHtml = headHtml;

  K.readList = function (txt, pairs) {
    if (pairs) {
      var P = String(txt).split(/\n|;/).map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
        var p = l.replace(/,(?=\d)/g, '.').split(/[\s\t]+|\s*[|]\s*/).filter(Boolean).map(K.parseInput);
        if (p.length !== 2 || isNaN(p[0]) || isNaN(p[1])) throw new Error('Minden sorba egy x és egy y kell, szóközzel elválasztva (pl. „1 2,5”). Hibás sor: ' + l);
        return p;
      });
      if (P.length < 2) throw new Error('Legalább két adatpár kell.');
      return P;
    }
    var xs = String(txt).replace(/(\d),(\d)/g, '$1.$2').split(/[\s;]+/).filter(Boolean).map(K.parseInput);
    if (xs.some(isNaN)) throw new Error('Csak számokat adj meg (tizedesvessző is jó), szóközzel vagy pontosvesszővel elválasztva.');
    if (xs.length < 2) throw new Error('Legalább két adat kell.');
    return xs;
  };

  /* ---------- oldalak (csak böngészőben) ---------- */
  if (typeof document === 'undefined' || !S.addRoute) return;
  var esc = S.esc;
  function cats() { return DATA.cats || []; }
  function catOf(F) { var c = F.c.split('/'); var C = cats().filter(function (x) { return x.id === c[0]; })[0]; var sub = C && (C.subs || []).filter(function (s) { return s[0] === c[1]; })[0]; return { cat: C, sub: sub }; }
  function favs() { var f = S.store.get('kepletek.fav', []); return Array.isArray(f) ? f : []; }
  function isFav(id) { return favs().indexOf(id) >= 0; }
  function toggleFav(id) { var f = favs(), i = f.indexOf(id); if (i >= 0) f.splice(i, 1); else f.push(id); S.store.set('kepletek.fav', f); return i < 0; }
  function uni() { return S.level === 'egyetem'; }
  function unitLabel(u) { return u ? ' ' + esc(u) : ''; }
  function crumbs(extra) { return '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span>' + (extra ? '<a href="#/kepletek">Képletgyűjtemény</a><span>›</span>' + extra : '<span>Képletgyűjtemény</span>') + '</nav>'; }
  function searchText(F) {
    if (F._st) return F._st;
    var cc = catOf(F);
    return (F._st = S.norm([F.n, F.k || '', F.id, cc.cat ? cc.cat.title : '', cc.sub ? cc.sub[1] : '', (F.vars || []).map(function (v) { return v.name; }).join(' ')].join(' ')));
  }
  function linkList(F) {
    var out = [];
    (F.ln || []).forEach(function (l) {
      var m;
      if ((m = /^L:([\w-]+)\/([\w-]+)$/.exec(l))) {
        var s = (S.subjects || []).filter(function (x) { return x.id === m[1]; })[0], le = s && s.lessons.filter(function (x) { return x.id === m[2]; })[0];
        if (le) out.push('<a class="chip" href="#/lecke/' + s.id + '/' + le.id + '">' + (s.icon || '📘') + ' ' + esc(le.title) + '</a>');
      } else if ((m = /^C:([\w-]+)$/.exec(l))) {
        var c = S.courseById && S.courseById(m[1]);
        if (c) out.push('<a class="chip" href="#/egyetem/' + c.id + '/kepletek">' + (c.icon || '🎓') + ' ' + esc(c.title) + ' – képletek</a>');
      } else if ((m = /^R:([\w-]+)(.*)$/.exec(l))) {
        if (S.routes && S.routes[m[1]]) out.push('<a class="chip" href="#/' + m[1] + m[2].split('|')[0] + '">' + esc(m[2].split('|')[1] || m[1]) + '</a>');
      }
    });
    return out;
  }
  function card(F) {
    var cc = catOf(F);
    return '<div class="card kp-card"><button type="button" class="kp-star' + (isFav(F.id) ? ' on' : '') + '" data-fav="' + F.id + '" aria-label="Kedvenc" title="Kedvencekhez">' + (isFav(F.id) ? '★' : '☆') + '</button>' +
      '<a href="#/kepletek/' + F.id + '"><small class="kp-cat">' + (cc.cat ? cc.cat.icon + ' ' + esc(cc.sub ? cc.sub[1] : cc.cat.title) : '') + '</small><b>' + esc(F.n) + '</b>' +
      '<span class="kp-f">' + headHtml(F) + '</span></a></div>';
  }
  function bindStars(root, after) {
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-fav]'); if (!b) return;
      e.preventDefault(); var on = toggleFav(b.dataset.fav);
      b.classList.toggle('on', on); b.textContent = on ? '★' : '☆';
      if (after) after();
    });
  }

  function hub(main, params) {
    var st = S.store.get('kepletek.hub', { c: '', s: '' }) || { c: '', s: '' };
    if (params && params.c != null) st.c = params.c;
    var q = (params && params.q) || '';
    var list = DATA.list.map(prep);
    var calcN = list.filter(function (F) { return F.list || K.targets(F).length; }).length;
    main.innerHTML = crumbs() + '<h1>∑ Képletgyűjtemény és kalkulátorok</h1>' +
      '<p class="lead">' + list.length + ' képlet matematikából, fizikából, kémiából, pénzügyből és egyetemi tárgyakból. Mindegyiknél ' + (uni() ? 'érvényességi feltételek, változók és mértékegységek, valamint kalkulátor: bármelyik mennyiség kiszámítható a többiből, lépésenként.' : 'elmagyarázzuk, mit jelentenek a betűk, és van hozzá számológép: azt számolja ki, amit keresel, lépésről lépésre.') + '</p>' +
      '<div class="kp-tools"><input type="search" id="kp-q" class="filter" placeholder="🔎 Keresés: pl. sebesség, kamat, pH, henger…" value="' + esc(q) + '" aria-label="Keresés a képletek között">' +
      '<a class="btn" href="#/kepletek/lap">🖨️ Nyomtatható képletlap</a></div>' +
      '<div class="chips kp-chips" id="kp-cats"></div><div class="chips kp-chips kp-subs" id="kp-subs"></div>' +
      '<p class="muted kp-count" id="kp-count"></p><div class="kp-grid" id="kp-list"></div>';
    var qi = main.querySelector('#kp-q');
    function paintChips() {
      var fc = favs().length;
      main.querySelector('#kp-cats').innerHTML = '<button type="button" class="chip' + (!st.c ? ' on' : '') + '" data-c="">Mind</button>' +
        '<button type="button" class="chip' + (st.c === 'fav' ? ' on' : '') + '" data-c="fav">★ Kedvencek (' + fc + ')</button>' +
        cats().map(function (c) { var n = list.filter(function (F) { return F.c.split('/')[0] === c.id; }).length; return '<button type="button" class="chip' + (st.c === c.id ? ' on' : '') + '" data-c="' + c.id + '">' + c.icon + ' ' + esc(c.title) + ' <small>' + n + '</small></button>'; }).join('');
      var C = cats().filter(function (x) { return x.id === st.c; })[0];
      main.querySelector('#kp-subs').innerHTML = C ? '<button type="button" class="chip' + (!st.s ? ' on' : '') + '" data-s="">Minden ' + esc(C.title.toLowerCase()) + '</button>' + (C.subs || []).map(function (s) {
        var n = list.filter(function (F) { return F.c === C.id + '/' + s[0]; }).length;
        return n ? '<button type="button" class="chip' + (st.s === s[0] ? ' on' : '') + '" data-s="' + s[0] + '">' + esc(s[1]) + ' <small>' + n + '</small></button>' : '';
      }).join('') : '';
    }
    function paint() {
      var words = S.norm(qi.value.trim()).split(/\s+/).filter(Boolean), fv = favs();
      var res = list.filter(function (F) {
        var c = F.c.split('/');
        if (st.c === 'fav') { if (fv.indexOf(F.id) < 0) return false; }
        else if (st.c && c[0] !== st.c) return false;
        if (st.c && st.c !== 'fav' && st.s && c[1] !== st.s) return false;
        if (!words.length) return true;
        var t = searchText(F);
        return words.every(function (w) { return t.indexOf(w) >= 0; });
      });
      main.querySelector('#kp-count').textContent = res.length + ' képlet' + (words.length || st.c ? ' a szűrésnek megfelelően' : '') + ' · ' + calcN + ' kalkulátor';
      var box = main.querySelector('#kp-list');
      if (!res.length) { box.innerHTML = '<div class="empty card">' + (st.c === 'fav' ? 'Még nincs kedvenc képleted. A ☆ csillaggal jelölheted meg őket.' : 'Nincs ilyen képlet. Próbálj más szót (ékezet nélkül is jó).') + '</div>'; return; }
      if (!words.length && !st.s && st.c !== 'fav') {
        var groups = {}, order = [];
        res.forEach(function (F) { if (!groups[F.c]) { groups[F.c] = []; order.push(F.c); } groups[F.c].push(F); });
        box.innerHTML = order.map(function (k) { var cc = catOf(groups[k][0]); return '<h2 class="kp-gh">' + (cc.cat ? cc.cat.icon + ' ' + esc(cc.cat.title) + ' · ' : '') + esc(cc.sub ? cc.sub[1] : '') + '</h2><div class="kp-cards">' + groups[k].map(card).join('') + '</div>'; }).join('');
      } else box.innerHTML = '<div class="kp-cards">' + res.map(card).join('') + '</div>';
    }
    main.querySelector('#kp-cats').addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (!b) return; st.c = b.dataset.c; st.s = ''; S.store.set('kepletek.hub', st); paintChips(); paint(); });
    main.querySelector('#kp-subs').addEventListener('click', function (e) { var b = e.target.closest('[data-s]'); if (!b) return; st.s = b.dataset.s; S.store.set('kepletek.hub', st); paintChips(); paint(); });
    qi.addEventListener('input', paint);
    bindStars(main.querySelector('#kp-list'), function () { paintChips(); if (st.c === 'fav') paint(); });
    paintChips(); paint();
    return true;
  }

  /* ---------- egy képlet oldala ---------- */
  function varTable(F) {
    return '<table class="kp-vars"><thead><tr><th>Jel</th><th>Jelentés</th><th>Mértékegység</th></tr></thead><tbody>' + F.vars.map(function (v) {
      var units = dimUnits(v.dim).map(function (u) { return u[0]; }).filter(Boolean);
      return '<tr><td><var>' + v.s + '</var></td><td>' + esc(v.name) + (v.c ? ' <small class="muted">(állandó: ' + fmtNum(v.ex, 6) + unitLabel(v.unit) + ')</small>' : '') + '</td><td>' + (units.length ? esc(units[0]) + (units.length > 1 ? ' <small class="muted">(' + esc(units.slice(1, 5).join(', ')) + ')</small>' : '') : 'mértékegység nélküli') + '</td></tr>';
    }).join('') + '</tbody></table>';
  }
  function exampleText(F) {
    if (F.list) return F.p ? S.inline(F.p) : '';
    var v = K.exampleSI(F), y = F.byK[F.y];
    var given = F.vars.filter(function (x) { return x.k !== F.y && !x.c; }).map(function (x) { return '<var>' + x.s + '</var> = ' + fmtNum(x.ex, 6) + unitLabel(x.unit); });
    return (F.p ? S.inline(F.p) + ' ' : '') + 'Ha ' + given.join(', ') + ', akkor <b><var>' + y.s + '</var> ≈ ' + fmtNum(K.fromSI(v[F.y], y.dim, y.unit)) + unitLabel(y.unit) + '</b>.';
  }
  function rearranged(F) {
    var keys = Object.keys(F.invA || {});
    if (!keys.length) return '';
    return '<p class="kp-rearr"><b>Átrendezve:</b> ' + keys.map(function (k) { return '<span class="kp-f"><var>' + F.sym[k] + '</var> = ' + F.invA[k].map(function (a) { return K.html(a, { sym: F.sym }); }).join(' <span class="muted">vagy</span> ') + '</span>'; }).join('<span class="muted"> · </span>') + '</p>';
  }

  function unitSelect(v, cls, cur) {
    var us = dimUnits(v.dim);
    if (us.length < 2) return us[0][0] ? '<span class="kp-u1">' + esc(us[0][0]) + '</span>' : '';
    return '<select class="' + cls + '" data-k="' + v.k + '" aria-label="Mértékegység">' + us.map(function (u) { return '<option' + (u[0] === cur ? ' selected' : '') + '>' + esc(u[0]) + '</option>'; }).join('') + '</select>';
  }

  function calcBox(main, F) {
    var box = main.querySelector('#kp-calc');
    var tg = K.targets(F);
    var mem = S.store.get('kepletek.calc', {}) || {};
    var target = (mem[F.id] && tg.indexOf(mem[F.id]) >= 0) ? mem[F.id] : (F.g && tg.indexOf(F.g) >= 0 ? F.g : (tg.indexOf(F.y) >= 0 ? F.y : tg[0]));
    var resUnit = null;
    var ex = K.exampleSI(F);
    var vals = {}, units = {};
    F.vars.forEach(function (v) { units[v.k] = v.unit; vals[v.k] = fmtNum(K.fromSI(ex[v.k], v.dim, v.unit), 6).replace(/ /g, ''); });
    function render() {
      var tv = F.byK[target];
      box.innerHTML = '<div class="kp-tg"><span class="kp-lbl">Mit keresel?</span><div class="kp-seg" role="radiogroup">' + tg.map(function (k) {
        return '<button type="button" role="radio" aria-checked="' + (k === target) + '" class="' + (k === target ? 'on' : '') + '" data-t="' + k + '" title="' + esc(F.byK[k].name) + '"><var>' + F.byK[k].s + '</var></button>';
      }).join('') + '</div><span class="muted kp-tgname">' + esc(tv.name) + '</span></div>' +
        '<div class="kp-inputs">' + F.vars.filter(function (v) { return v.k !== target; }).map(function (v) {
          return '<label class="kp-in"><span class="kp-sym"><var>' + v.s + '</var></span><span class="kp-nm">' + esc(v.name) + '</span>' +
            '<span class="kp-row"><input type="text" inputmode="decimal" autocomplete="off" data-k="' + v.k + '" value="' + esc(vals[v.k] || '') + '" aria-label="' + esc(v.name) + '">' + unitSelect(v, 'kp-us', units[v.k]) + '</span></label>';
        }).join('') + '</div>' +
        '<div class="kp-res" id="kp-res" aria-live="polite"></div>';
      compute();
    }
    function compute() {
      var tv = F.byK[target], out = box.querySelector('#kp-res'), si = {}, err = [], lines = [];
      F.vars.forEach(function (v) {
        if (v.k === target) return;
        var raw = vals[v.k], x = K.parseInput(raw);
        if (isNaN(x)) { err.push(v); return; }
        si[v.k] = K.toSI(x, v.dim, units[v.k]);
        var siU = siLabel(v.dim);
        lines.push('<var>' + v.s + '</var> = ' + fmtNum(x, 8) + unitLabel(units[v.k]) + (units[v.k] !== siU ? ' = ' + fmtNum(si[v.k], 6) + unitLabel(siU) : ''));
      });
      if (err.length) { out.innerHTML = '<p class="muted">Add meg: ' + err.map(function (v) { return '<var>' + v.s + '</var> (' + esc(v.name) + ')'; }).join(', ') + '. Tizedesvessző is jó, pl. 2,5 vagy 1,6·10^-19.</p>'; return; }
      var r;
      try { r = K.solve(F, target, si); } catch (e) { out.innerHTML = '<p class="kp-bad">Hiba: ' + esc(e.message) + '</p>'; return; }
      var roots = r.roots.filter(function (x) { return isFinite(x); }).sort(function (a, b) { return a - b; });
      var siU = siLabel(tv.dim);
      var ru = resUnit || units[target] || tv.unit;
      var st = '<ol class="kp-steps"><li><b>Adatok' + (lines.some(function (l) { return l.indexOf(' = ') !== l.lastIndexOf(' = '); }) ? ' (SI-alapegységre váltva)' : '') + ':</b><br>' + lines.join('<br>') + '</li>';
      if (r.how === 'num') {
        st += '<li><b>Rendezés:</b> <var>' + tv.s + '</var> nem fejezhető ki egyszerűen, ezért a gép numerikusan keresi meg: addig próbálgat (felezéses módszerrel), amíg <span class="kp-f">' + headHtml(F) + '</span> teljesül.</li>';
      } else {
        st += '<li><b>Képlet' + (r.how === 'inv' ? ' (átrendezve)' : '') + ':</b> ' + r.asts.map(function (a) { return '<span class="kp-f"><var>' + tv.s + '</var> = ' + K.html(a, { sym: F.sym }) + '</span>'; }).join(' <span class="muted">vagy</span> ') + '</li>';
        st += '<li><b>Behelyettesítés:</b> ' + r.asts.map(function (a) { var x = NaN; try { x = ev(a, si); } catch (e) { /* */ } return '<span class="kp-f"><var>' + tv.s + '</var> = ' + K.html(a, { sym: F.sym, vals: si }) + '</span> = ' + (isFinite(x) ? fmtNum(x, 6) + unitLabel(siU) : '<i>nincs valós érték</i>'); }).join('<br>') + '</li>';
      }
      if (!roots.length) {
        out.innerHTML = st + '</ol><p class="kp-bad">Ezekkel az adatokkal nincs (valós) megoldás. Nézd át a számokat és a mértékegységeket – például negatív szám nem lehet gyök alatt, a szinusz nem lehet 1-nél nagyobb.</p>';
        return;
      }
      if (r.how === 'num') {
        var chk = {}; Object.keys(si).forEach(function (k) { chk[k] = si[k]; }); chk[target] = roots[0];
        st += '<li><b>Ellenőrzés:</b> visszahelyettesítve <var>' + F.sym[F.y] + '</var> = ' + fmtNum(ev(F.rhs, chk), 6) + unitLabel(siLabel(F.byK[F.y].dim)) + ' ✓</li>';
      }
      var resTxt = roots.map(function (x) {
        var v = K.fromSI(x, tv.dim, ru), s = fmtNum(v);
        if (tv.int && Math.abs(v - Math.round(v)) > 1e-6) s += ' <small class="muted">(nem egész szám – a feladat szerint kerekíts)</small>';
        return s;
      });
      if (ru !== siU || roots.length > 1) st += '<li><b>Eredmény' + (ru !== siU ? ' a választott mértékegységben' : '') + ':</b> <var>' + tv.s + '</var> = ' + resTxt.join(' vagy ') + unitLabel(ru) + '</li>';
      vals[target] = fmtNum(K.fromSI(roots[0], tv.dim, ru), 6).replace(/ /g, ''); units[target] = ru;
      out.innerHTML = '<div class="kp-answer"><span><var>' + tv.s + '</var> ' + (roots.length > 1 ? '=' : '≈') + ' <b>' + resTxt.join('</b> vagy <b>') + '</b></span> ' + unitSelect({ k: target, dim: tv.dim }, 'kp-ru', ru) + '</div>' +
        (roots.length > 1 ? '<p class="muted">Több megoldás is van – a feladat szövege dönti el, melyik illik (pl. hegyes- vagy tompaszög).</p>' : '') +
        '<details class="kp-det"' + (S.store.get('kepletek.steps', true) ? ' open' : '') + '><summary>Lépések</summary>' + st + '</ol></details>';
      var ds = out.querySelector('.kp-det'); ds.addEventListener('toggle', function () { S.store.set('kepletek.steps', ds.open); });
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-t]'); if (!b) return;
      if (b.dataset.t === target) return;
      target = b.dataset.t; resUnit = null; mem[F.id] = target; S.store.set('kepletek.calc', mem);
      render();
    });
    box.addEventListener('input', function (e) { var k = e.target.dataset && e.target.dataset.k; if (e.target.tagName === 'INPUT' && k) { vals[k] = e.target.value; compute(); } });
    box.addEventListener('change', function (e) {
      var t = e.target, k = t.dataset && t.dataset.k;
      if (t.classList.contains('kp-us')) {
        var v = F.byK[k], x = K.parseInput(vals[k]);
        if (!isNaN(x)) { var conv = K.fromSI(K.toSI(x, v.dim, units[k]), v.dim, t.value); vals[k] = fmtNum(conv, 8).replace(/ /g, ''); var inp = box.querySelector('input[data-k="' + k + '"]'); if (inp) inp.value = vals[k]; }
        units[k] = t.value; compute();
      } else if (t.classList.contains('kp-ru')) { resUnit = t.value; compute(); }
    });
    render();
  }

  function listCalc(main, F) {
    var box = main.querySelector('#kp-calc');
    box.innerHTML = '<label class="kp-in kp-list"><span class="kp-nm">' + esc(F.li || 'Adatok (szóközzel, pontosvesszővel vagy új sorral elválasztva)') + '</span><textarea rows="4" id="kp-ta" spellcheck="false">' + esc(F.lx || '') + '</textarea></label><div class="kp-res" id="kp-res" aria-live="polite"></div>';
    var ta = box.querySelector('#kp-ta');
    function go() {
      var out = box.querySelector('#kp-res'), r;
      try { r = F.list(K.readList(ta.value, F.pairs)); } catch (e) { out.innerHTML = '<p class="kp-bad">' + esc(e.message) + '</p>'; return; }
      out.innerHTML = '<table class="kp-vars kp-out"><tbody>' + r.map(function (x) { return '<tr><td>' + x[0] + '</td><td><b>' + fmtNum(x[1], 5) + '</b></td><td class="muted">' + (x[2] ? S.inline(x[2]) : '') + '</td></tr>'; }).join('') + '</tbody></table>';
    }
    ta.addEventListener('input', go); go();
  }

  function detail(main, id) {
    var F = K.byId(id);
    if (!F) return false;
    var cc = catOf(F), all = DATA.list.filter(function (x) { return x.c === F.c; }), i = all.indexOf(F), prev = all[i - 1], next = all[i + 1];
    var links = linkList(F);
    var u = uni();
    main.innerHTML = crumbs((cc.cat ? '<a href="#/kepletek?c=' + cc.cat.id + '">' + cc.cat.icon + ' ' + esc(cc.cat.title) + '</a><span>›</span>' : '') + '<span>' + esc(F.n) + '</span>') +
      '<div class="kp-head"><div><small class="muted">' + (cc.cat ? cc.cat.icon + ' ' + esc(cc.cat.title) + (cc.sub ? ' · ' + esc(cc.sub[1]) : '') : '') + '</small><h1>' + esc(F.n) + '</h1></div>' +
      '<button type="button" class="kp-star big' + (isFav(F.id) ? ' on' : '') + '" data-fav="' + F.id + '" aria-label="Kedvenc">' + (isFav(F.id) ? '★' : '☆') + '</button></div>' +
      '<div class="kp-layout"><div class="kp-main">' +
      '<div class="card kp-show"><div class="kp-big kp-f">' + headHtml(F) + '</div>' + (F.list ? '' : rearranged(F)) + '</div>' +
      '<section class="card pad kp-text">' +
      (u ? (F.u ? '<p>' + S.inline(F.u) + '</p>' : '') + (F.e ? '<details><summary>🎒 Egyszerűen elmagyarázva</summary><p>' + S.inline(F.e) + '</p></details>' : '')
        : (F.e ? '<p>' + S.inline(F.e) + '</p>' : '') + (F.u ? '<details><summary>🎓 Pontosabban (egyetemi szint, érvényesség)</summary><p>' + S.inline(F.u) + '</p></details>' : '')) +
      '<p class="kp-ex"><b>Példa:</b> ' + exampleText(F) + '</p></section>' +
      (F.vars && F.vars.length ? '<section class="card pad"><h2 class="kp-h2">Mit jelentenek a betűk?</h2>' + varTable(F) + '</section>' : '') +
      (links.length ? '<section class="kp-links"><b>📚 Kapcsolódó tananyag:</b> ' + links.join(' ') + '</section>' : '') +
      '</div><aside class="card pad kp-calcwrap"><h2 class="kp-h2">🧮 Kalkulátor</h2>' + (F.list ? '' : '<p class="muted kp-hint">Válaszd ki, mit keresel, és írd be a többit. A mértékegység a mezők mellett átváltható.</p>') + '<div id="kp-calc"></div></aside></div>' +
      '<nav class="pager">' + (prev ? '<a class="btn" href="#/kepletek/' + prev.id + '">← ' + esc(prev.n) + '</a>' : '<span></span>') +
      (next ? '<a class="btn" href="#/kepletek/' + next.id + '">' + esc(next.n) + ' →</a>' : '<a class="btn" href="#/kepletek">Vissza a gyűjteményhez</a>') + '</nav>';
    bindStars(main.querySelector('.kp-head'));
    if (F.list) listCalc(main, F); else calcBox(main, F);
    return true;
  }

  /* ---------- nyomtatható képletlap ---------- */
  function sheet(main) {
    var sel = S.store.get('kepletek.lap', null) || { c: ['mat'], fav: false, vars: true };
    var list = DATA.list.map(prep);
    function opts() {
      return cats().map(function (c) {
        return '<fieldset class="kp-fs"><legend><label><input type="checkbox" data-cat="' + c.id + '"' + (sel.c.indexOf(c.id) >= 0 ? ' checked' : '') + '> ' + c.icon + ' ' + esc(c.title) + '</label></legend>' +
          (c.subs || []).map(function (s) { var k = c.id + '/' + s[0]; var n = list.filter(function (F) { return F.c === k; }).length; return n ? '<label><input type="checkbox" data-sub="' + k + '"' + (sel.c.indexOf(c.id) >= 0 || sel.c.indexOf(k) >= 0 ? ' checked' : '') + '> ' + esc(s[1]) + ' <small class="muted">(' + n + ')</small></label>' : ''; }).join('') + '</fieldset>';
      }).join('');
    }
    main.innerHTML = '<div class="kp-noprint">' + crumbs('<span>Nyomtatható képletlap</span>') + '<h1>🖨️ Nyomtatható képletlap</h1>' +
      '<p class="lead">Jelöld be, mely témakörök kerüljenek a lapra, majd nyomtasd ki (vagy mentsd PDF-be a nyomtatási ablakban).</p>' +
      '<div class="card pad kp-sheetopts">' + opts() + '<div class="kp-sheetbar"><label><input type="checkbox" id="kp-favonly"' + (sel.fav ? ' checked' : '') + '> csak a kedvenceim (★)</label>' +
      '<label><input type="checkbox" id="kp-withvars"' + (sel.vars ? ' checked' : '') + '> változók jelentése is</label>' +
      '<button type="button" class="btn primary" id="kp-print">🖨️ Nyomtatás</button></div></div></div><div id="kp-sheet" class="kp-sheet"></div>';
    function readSel() {
      var c = [];
      main.querySelectorAll('[data-sub]').forEach(function (x) { if (x.checked) c.push(x.dataset.sub); });
      sel = { c: c, fav: main.querySelector('#kp-favonly').checked, vars: main.querySelector('#kp-withvars').checked };
      S.store.set('kepletek.lap', sel);
    }
    function paint() {
      var fv = favs();
      var chosen = list.filter(function (F) { return (sel.c.indexOf(F.c) >= 0 || sel.c.indexOf(F.c.split('/')[0]) >= 0) && (!sel.fav || fv.indexOf(F.id) >= 0); });
      var out = '<h2 class="kp-sheet-t">Képletlap <small>– Tudásműhely · ' + chosen.length + ' képlet</small></h2>', last = '';
      chosen.forEach(function (F) {
        var cc = catOf(F), g = (cc.cat ? cc.cat.title : '') + (cc.sub ? ' · ' + cc.sub[1] : '');
        if (g !== last) { out += (last ? '</div>' : '') + '<h3>' + esc(g) + '</h3><div class="kp-sheet-g">'; last = g; }
        out += '<div class="kp-sheet-i"><b>' + esc(F.n) + '</b><div class="kp-f">' + headHtml(F) + '</div>' +
          (sel.vars && F.vars.length ? '<small>' + F.vars.map(function (v) { var u0 = v.unit; return '<var>' + v.s + '</var>: ' + esc(v.name) + (u0 ? ' [' + esc(u0) + ']' : ''); }).join('; ') + '</small>' : '') + '</div>';
      });
      if (last) out += '</div>';
      if (!chosen.length) out += '<p class="muted">Nincs kiválasztott képlet.</p>';
      main.querySelector('#kp-sheet').innerHTML = out;
    }
    main.querySelector('.kp-sheetopts').addEventListener('change', function (e) {
      var t = e.target;
      if (t.dataset.cat) main.querySelectorAll('[data-sub^="' + t.dataset.cat + '/"]').forEach(function (x) { x.checked = t.checked; });
      cats().forEach(function (c) { var subs = main.querySelectorAll('[data-sub^="' + c.id + '/"]'), on = Array.prototype.every.call(subs, function (x) { return x.checked; }); var cb = main.querySelector('[data-cat="' + c.id + '"]'); if (cb) cb.checked = on && subs.length > 0; });
      readSel(); paint();
    });
    main.querySelector('#kp-print').addEventListener('click', function () { window.print(); });
    readSel(); paint();
    return true;
  }

  S.addRoute('kepletek', {
    title: 'Képletgyűjtemény', nav: '',
    page: function (main, rest, params) {
      if (!rest.length) return hub(main, params);
      if (rest[0] === 'lap') return sheet(main);
      return detail(main, rest[0]);
    }
  });
})();
