/* Tudásműhely – 🤖 Programozás játszva.
 * Saját, Python-szerű tanulónyelv saját értelmezővel (NEM eval):
 *   tokenizáló (behúzás → INDENT/DEDENT) → rekurzív leszálló parser (AST) → fordító (verem-gépi utasítások) → VM.
 * A VM utasításonként lép, így a program lépésenként futtatható: aktuális sor, változók, kimenet, lépéslimit.
 * Két feladatcsoport: „Robot a rácson” (SVG rács, animáció) és „Algoritmusok” (ellenőrző tesztesetek).
 *   Oldal:   #/kodolas  ·  #/kodolas/<feladat-id>  ·  #/kodolas/homokozo
 *   Tárolás: 'kodolas' → { solved: { id: true }, code: { id: 'forráskód' }, speed: 1–10 }
 *   Node-ból tesztelhető: STUDIE.kodolas = { tokenize, parse, compile, VM, run, robotCheck, algoCheck, ROBOT, ALGO, … } */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  /* ====================================================================
   * 1. Hibák
   * ==================================================================== */
  function KErr(msg, line) { this.msg = msg; this.line = line || 0; }
  KErr.prototype.toString = function () { return (this.line ? this.line + '. sor: ' : '') + this.msg; };
  function fail(msg, line) { throw new KErr(msg, line); }

  /* ====================================================================
   * 2. Tokenizáló
   * ==================================================================== */
  var KWLIST = ['if', 'elif', 'else', 'while', 'for', 'in', 'def', 'return', 'break', 'continue', 'pass', 'and', 'or', 'not', 'True', 'False', 'None', 'global'];
  var KWS = {}; KWLIST.forEach(function (k) { KWS[k] = 1; });
  var OPS3 = ['//=', '**='], OPS2 = ['==', '!=', '<=', '>=', '//', '**', '+=', '-=', '*=', '/=', '%='], OPS1 = '+-*/%<>=()[],:.';
  var IDSTART = /[A-Za-z_\u00C0-\u024F]/, IDCH = /[A-Za-z0-9_\u00C0-\u024F]/;

  function tokenize(src) {
    var lines = String(src).replace(/\r\n?/g, '\n').split('\n');
    var toks = [], ind = [0], br = [];
    function push(t, v, ln) { toks.push({ t: t, v: v, line: ln }); }
    for (var li = 0; li < lines.length; li++) {
      var s = lines[li], ln = li + 1, i = 0, n = s.length, had = false;
      if (!br.length) {
        var col = 0;
        while (i < n && (s[i] === ' ' || s[i] === '\t')) { col += s[i] === '\t' ? 4 - col % 4 : 1; i++; }
        if (i >= n || s[i] === '#') continue;
        if (col > ind[ind.length - 1]) { ind.push(col); push('INDENT', col, ln); }
        else {
          while (col < ind[ind.length - 1]) { ind.pop(); push('DEDENT', col, ln); }
          if (col !== ind[ind.length - 1]) fail('Behúzási hiba: ennek a sornak a behúzása nem egyezik egyik korábbi szinttel sem. Blokkonként mindig 4 szóközzel (vagy egy Tabbal) kezdj beljebb.', ln);
        }
      }
      while (i < n) {
        var c = s[i], st = i;
        if (c === ' ' || c === '\t') { i++; continue; }
        if (c === '#') break;
        had = true;
        if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(s[i + 1] || ''))) {
          var m = /^(\d*\.\d+|\d+\.?\d*)([eE][+-]?\d+)?/.exec(s.slice(i));
          i += m[0].length;
          if (i < n && IDCH.test(s[i])) fail('Hibás szám vagy név: „' + s.slice(st, i + 1) + '…”. Egy név nem kezdődhet számjeggyel.', ln);
          push('NUM', parseFloat(m[0]), ln); continue;
        }
        if (IDSTART.test(c)) {
          while (i < n && IDCH.test(s[i])) i++;
          var w = s.slice(st, i); push(KWS[w] ? 'KW' : 'NAME', w, ln); continue;
        }
        if (c === '"' || c === "'") {
          var q = c, out = ''; i++;
          for (;;) {
            if (i >= n) fail('Le nem zárt szöveg: hiányzik a záró ' + q + ' jel a sor végéről.', ln);
            var d = s[i];
            if (d === '\\') { var e = s[i + 1]; out += e === 'n' ? '\n' : e === 't' ? '\t' : (e == null ? '' : e); i += 2; continue; }
            if (d === q) { i++; break; }
            out += d; i++;
          }
          push('STR', out, ln); continue;
        }
        if ('„”“’‘'.indexOf(c) >= 0) fail('Ilyen idézőjelet (' + c + ') a program nem ismer – a szöveget sima " vagy \' jelek közé tedd.', ln);
        var three = s.substr(i, 3), two = s.substr(i, 2);
        if (OPS3.indexOf(three) >= 0) { push('OP', three, ln); i += 3; continue; }
        if (OPS2.indexOf(two) >= 0) { push('OP', two, ln); i += 2; continue; }
        if (OPS1.indexOf(c) >= 0) {
          if (c === '(' || c === '[') br.push({ c: c, line: ln });
          else if (c === ')' || c === ']') {
            var o = br.pop();
            if (!o) fail('Fölösleges záró zárójel: „' + c + '” – nincs hozzá nyitó párja.', ln);
            if ((o.c === '(') !== (c === ')')) fail('A zárójelek nem illenek össze: a(z) ' + o.line + '. sorban nyitott „' + o.c + '” zárójelet itt „' + c + '” zárja.', ln);
          }
          push('OP', c, ln); i++; continue;
        }
        if (c === '!') fail('A „nem egyenlő” jele: != (felkiáltójel és egyenlőségjel együtt). A tagadás szava: not.', ln);
        if (c === '&' || c === '|') fail('Az „és” szava ebben a nyelvben: and, a „vagy” szava: or (nem ' + c + c + ').', ln);
        if (c === ';') fail('Pontosvessző nem kell: minden utasítás külön sorba kerül.', ln);
        if (c === '{' || c === '}') fail('Kapcsos zárójel nincs ebben a nyelvben: a blokkokat kettőspont és behúzás jelöli.', ln);
        fail('Ismeretlen jel a kódban: „' + c + '”.', ln);
      }
      if (!br.length && had) push('NL', null, ln);
    }
    if (br.length) { var b = br[br.length - 1]; fail('Le nem zárt zárójel: a(z) ' + b.line + '. sorban nyitott „' + b.c + '” nincs bezárva.', b.line); }
    var last = lines.length;
    while (ind.length > 1) { ind.pop(); push('DEDENT', 0, last); }
    push('EOF', null, last);
    return toks;
  }

  /* ====================================================================
   * 3. Parser → AST
   * ==================================================================== */
  function desc(tok) {
    switch (tok.t) {
      case 'EOF': return 'a program vége';
      case 'NL': return 'a sor vége';
      case 'INDENT': return 'egy beljebb kezdett sor';
      case 'DEDENT': return 'egy kijjebb kezdett sor';
      case 'STR': return 'egy szöveg';
      case 'NUM': return 'a(z) ' + tok.v + ' szám';
      default: return '„' + tok.v + '”';
    }
  }
  function Parser(toks) { this.t = toks; this.p = 0; }
  var P = Parser.prototype;
  P.peek = function (k) { return this.t[Math.min(this.p + (k || 0), this.t.length - 1)]; };
  P.next = function () { return this.t[this.p++]; };
  P.is = function (t, v) { var x = this.t[this.p]; return x.t === t && (v === undefined || x.v === v); };
  P.isOp = function (v) { return this.is('OP', v); };
  P.isKw = function (v) { return this.is('KW', v); };
  P.line = function () { return this.peek().line; };

  P.program = function () {
    var body = [];
    while (!this.is('EOF')) {
      if (this.is('INDENT')) fail('Behúzási hiba: ez a sor beljebb kezdődik, mint az előző. Beljebb csak kettősponttal végződő sor (if, while, for, def…) után kell kezdeni.', this.line());
      if (this.is('DEDENT')) { this.next(); continue; }
      body.push(this.stmt());
    }
    return body;
  };
  P.stmt = function () {
    var tok = this.peek();
    if (tok.t === 'KW') {
      switch (tok.v) {
        case 'if': return this.ifStmt();
        case 'while': return this.whileStmt();
        case 'for': return this.forStmt();
        case 'def': return this.defStmt();
        case 'elif': case 'else': fail('Az „' + tok.v + '” csak egy if (vagy elif) blokk után állhat, pontosan ugyanazzal a behúzással, mint az if.', tok.line);
      }
    }
    var s = this.simple();
    this.endLine();
    return s;
  };
  P.endLine = function () {
    if (this.is('NL')) { this.next(); return; }
    if (this.is('EOF') || this.is('DEDENT')) return;
    var t = this.peek();
    if (t.t === 'OP' && t.v === ':') fail('Váratlan kettőspont. Kettőspont csak if, elif, else, while, for és def sor végére kell.', t.line);
    fail('A sorban váratlan ' + desc(t) + ' következik. Hiányzik egy műveleti jel, vessző vagy zárójel? (Egy sorba csak egy utasítás kerülhet.)', t.line);
  };
  P.colon = function (kind, line) {
    if (this.isOp(':')) { this.next(); return; }
    var t = this.peek();
    if (t.t === 'OP' && t.v === '=') fail('Az „' + kind + '” feltételében az összehasonlítás jele == (két egyenlőségjel). Az egy = az értékadás jele.', t.line);
    if (t.t === 'NL' || t.t === 'EOF') fail('Hiányzik a kettőspont (:) a(z) „' + kind + '” sor végéről.', line);
    if (kind === 'else' && t.t === 'KW' && t.v === 'if') fail('Az „else if” helyett ebben a nyelvben „elif” kell (pl. elif x > 5:).', t.line);
    fail('Itt kettőspontot (:) vártam a(z) „' + kind + '” sor végén, de ' + desc(t) + ' áll. Hiányzik egy műveleti jel vagy zárójel?', t.line);
  };
  P.block = function (kind, line) {
    this.colon(kind, line);
    if (this.is('NL')) {
      this.next();
      if (!this.is('INDENT')) fail('A(z) „' + kind + '” sor után következő sor(oka)t beljebb kell kezdeni (4 szóközzel vagy Tabbal) – így most a blokk üres. Ha szándékosan üres, írj bele egy pass sort.', line);
      this.next();
      var body = [];
      while (!this.is('DEDENT') && !this.is('EOF')) {
        if (this.is('INDENT')) fail('Behúzási hiba: ez a sor beljebb kezdődik, mint az előző, pedig az előző sor nem kettősponttal végződik.', this.line());
        body.push(this.stmt());
      }
      if (this.is('DEDENT')) this.next();
      return body;
    }
    var s = this.simple(); this.endLine();
    return [s];
  };
  P.ifStmt = function () {
    var line = this.next().line, cond = this.expr(), tests = [{ cond: cond, body: this.block('if', line), line: line }], orelse = null;
    while (this.isKw('elif')) { var l2 = this.next().line, c2 = this.expr(); tests.push({ cond: c2, body: this.block('elif', l2), line: l2 }); }
    if (this.isKw('else')) { var l3 = this.next().line; orelse = this.block('else', l3); }
    return { k: 'if', tests: tests, orelse: orelse, line: line };
  };
  P.whileStmt = function () {
    var line = this.next().line, cond = this.expr();
    return { k: 'while', cond: cond, body: this.block('while', line), line: line };
  };
  P.forStmt = function () {
    var line = this.next().line;
    if (!this.is('NAME')) fail('A for után egy változónév kell, pl.: for i in range(5):', line);
    var name = this.next().v;
    if (!this.isKw('in')) fail('A for ciklus formája: for ' + name + ' in range(…):  (hiányzik az „in” szó)', line);
    this.next();
    var it = this.expr();
    return { k: 'for', name: name, iter: it, body: this.block('for', line), line: line };
  };
  P.defStmt = function () {
    var line = this.next().line;
    if (!this.is('NAME')) fail('A def után a függvény neve jön, pl.: def fordulj_meg():', line);
    var name = this.next().v, params = [];
    if (!this.isOp('(')) fail('A függvény neve után zárójel kell: def ' + name + '(): vagy def ' + name + '(a, b):', line);
    this.next();
    while (!this.isOp(')')) {
      if (!this.is('NAME')) fail('A függvény zárójelében csak paraméternevek állhatnak, vesszővel elválasztva.', line);
      var pn = this.next().v;
      if (params.indexOf(pn) >= 0) fail('A(z) „' + pn + '” paraméter kétszer szerepel.', line);
      params.push(pn);
      if (this.isOp(',')) this.next(); else if (!this.isOp(')')) fail('A paraméterek közé vessző kell.', line);
    }
    this.next();
    return { k: 'def', name: name, params: params, body: this.block('def', line), line: line };
  };
  P.simple = function () {
    var tok = this.peek(), line = tok.line;
    if (tok.t === 'KW') {
      if (tok.v === 'pass') { this.next(); return { k: 'pass', line: line }; }
      if (tok.v === 'break') { this.next(); return { k: 'break', line: line }; }
      if (tok.v === 'continue') { this.next(); return { k: 'continue', line: line }; }
      if (tok.v === 'return') {
        this.next();
        if (this.is('NL') || this.is('EOF') || this.is('DEDENT')) return { k: 'return', e: null, line: line };
        var rl = this.exprList();
        return { k: 'return', e: rl.length === 1 ? rl[0] : { k: 'list', items: rl, line: line }, line: line };
      }
      if (tok.v === 'global') {
        this.next(); var names = [];
        do { if (!this.is('NAME')) fail('A global után változónevek jönnek.', line); names.push(this.next().v); } while (this.isOp(',') && this.next());
        return { k: 'global', names: names, line: line };
      }
    }
    var lhs = this.exprList();
    if (this.isOp('=')) {
      this.next();
      lhs.forEach(function (t) { checkTarget(t, line); });
      var rhs = this.exprList();
      if (this.isOp('=')) fail('Egy sorban csak egy értékadás (=) legyen.', line);
      if (lhs.length > 1 && rhs.length > 1 && lhs.length !== rhs.length) fail('Az értékadás bal oldalán ' + lhs.length + ' változó van, a jobb oldalán viszont ' + rhs.length + ' érték.', line);
      return { k: 'assign', targets: lhs, values: rhs, line: line };
    }
    var t = this.peek();
    if (t.t === 'OP' && /^(\+|-|\*|\/|\/\/|%|\*\*)=$/.test(t.v)) {
      this.next();
      if (lhs.length !== 1) fail('A ' + t.v + ' művelet bal oldalán egyetlen változó állhat.', line);
      checkTarget(lhs[0], line);
      return { k: 'aug', target: lhs[0], op: t.v.slice(0, -1), value: this.expr(), line: line };
    }
    if (lhs.length !== 1) fail('Vesszővel elválasztott értékek önmagukban nem alkotnak utasítást. Lehet, hogy egy print( ) maradt le?', line);
    return { k: 'expr', e: lhs[0], line: line };
  };
  function checkTarget(t, line) {
    if (t.k === 'name' || t.k === 'idx') return;
    if (t.k === 'call') fail('Függvényhívásnak nem lehet értéket adni. Az = bal oldalán változónév (vagy lista[index]) állhat.', line);
    if (t.k === 'cmp' || t.k === 'bin') fail('Az = bal oldalán csak egy változónév állhat. (Összehasonlításhoz == kell.)', line);
    fail('Ide nem lehet értéket adni: az = bal oldalán változónév (vagy lista[index]) állhat.', line);
  }
  P.exprList = function () {
    var a = [this.expr()];
    while (this.isOp(',')) { this.next(); if (this.is('NL') || this.isOp('=') || this.is('EOF')) break; a.push(this.expr()); }
    return a;
  };
  P.expr = function () { return this.orE(); };
  P.orE = function () {
    var l = this.andE();
    while (this.isKw('or')) { var line = this.next().line; l = { k: 'or', l: l, r: this.andE(), line: line }; }
    return l;
  };
  P.andE = function () {
    var l = this.notE();
    while (this.isKw('and')) { var line = this.next().line; l = { k: 'and', l: l, r: this.notE(), line: line }; }
    return l;
  };
  P.notE = function () {
    if (this.isKw('not')) { var line = this.next().line; return { k: 'not', e: this.notE(), line: line }; }
    return this.cmpE();
  };
  var CMPOPS = { '==': 1, '!=': 1, '<': 1, '>': 1, '<=': 1, '>=': 1 };
  P.cmpE = function () {
    var first = this.arith(), items = [first], ops = [], line = this.line();
    for (;;) {
      var t = this.peek();
      if (t.t === 'OP' && CMPOPS[t.v]) { this.next(); ops.push(t.v); }
      else if (t.t === 'KW' && t.v === 'in') { this.next(); ops.push('in'); }
      else if (t.t === 'KW' && t.v === 'not' && this.peek(1).t === 'KW' && this.peek(1).v === 'in') { this.next(); this.next(); ops.push('not in'); }
      else break;
      items.push(this.arith());
    }
    return ops.length ? { k: 'cmp', ops: ops, items: items, line: line } : first;
  };
  P.arith = function () {
    var l = this.term();
    while (this.isOp('+') || this.isOp('-')) { var t = this.next(); l = { k: 'bin', op: t.v, l: l, r: this.term(), line: t.line }; }
    return l;
  };
  P.term = function () {
    var l = this.factor();
    while (this.isOp('*') || this.isOp('/') || this.isOp('//') || this.isOp('%')) { var t = this.next(); l = { k: 'bin', op: t.v, l: l, r: this.factor(), line: t.line }; }
    return l;
  };
  P.factor = function () {
    if (this.isOp('-') || this.isOp('+')) { var t = this.next(); return { k: 'un', op: t.v, e: this.factor(), line: t.line }; }
    return this.power();
  };
  P.power = function () {
    var b = this.postfix();
    if (this.isOp('**')) { var t = this.next(); return { k: 'bin', op: '**', l: b, r: this.factor(), line: t.line }; }
    return b;
  };
  P.postfix = function () {
    var e = this.atom();
    for (;;) {
      var line = this.line();
      if (this.isOp('(')) {
        this.next();
        var args = [], kw = [];
        while (!this.isOp(')')) {
          if (this.is('NAME') && this.peek(1).t === 'OP' && this.peek(1).v === '=') {
            var kn = this.next().v; this.next(); kw.push({ name: kn, e: this.expr() });
          } else {
            if (kw.length) fail('A név=érték alakú bemenetek a többi bemenet után jönnek.', line);
            args.push(this.expr());
          }
          if (this.isOp(',')) this.next(); else if (!this.isOp(')')) fail('A függvény bemenetei közé vessző kell, a végére pedig záró zárójel. Itt ' + desc(this.peek()) + ' áll.', this.line());
        }
        this.next();
        e = { k: 'call', f: e, args: args, kw: kw, line: line };
      } else if (this.isOp('[')) {
        this.next();
        var a = null, b = null;
        if (!this.isOp(':')) a = this.expr();
        if (this.isOp(':')) {
          this.next();
          if (!this.isOp(']')) b = this.expr();
          if (this.isOp(':')) fail('A lépésközös szeletelés ([a:b:c]) ebben a tanulónyelvben nem támogatott.', line);
          this.expectClose(']', line);
          e = { k: 'slice', o: e, a: a, b: b, line: line };
        } else {
          this.expectClose(']', line);
          e = { k: 'idx', o: e, i: a, line: line };
        }
      } else if (this.isOp('.')) {
        this.next();
        if (!this.is('NAME')) fail('A pont után egy művelet neve jön, pl. lista.append(5).', line);
        e = { k: 'attr', o: e, name: this.next().v, line: line };
      } else return e;
    }
  };
  P.expectClose = function (c, line) {
    if (this.isOp(c)) { this.next(); return; }
    fail('Itt „' + c + '” jelet vártam, de ' + desc(this.peek()) + ' áll.', line);
  };
  P.atom = function () {
    var t = this.peek(), line = t.line;
    if (t.t === 'NUM') { this.next(); return { k: 'const', v: t.v, line: line }; }
    if (t.t === 'STR') { this.next(); return { k: 'const', v: t.v, line: line }; }
    if (t.t === 'NAME') { this.next(); return { k: 'name', id: t.v, line: line }; }
    if (t.t === 'KW') {
      if (t.v === 'True') { this.next(); return { k: 'const', v: true, line: line }; }
      if (t.v === 'False') { this.next(); return { k: 'const', v: false, line: line }; }
      if (t.v === 'None') { this.next(); return { k: 'const', v: null, line: line }; }
      fail('Itt egy értéket vártam, de a(z) „' + t.v + '” kulcsszó áll. A kulcsszavakat (if, for, while, def…) nem lehet változónévnek használni.', line);
    }
    if (t.t === 'OP' && t.v === '(') {
      this.next();
      if (this.isOp(')')) { this.next(); return { k: 'list', items: [], line: line }; }
      var e = this.expr();
      if (this.isOp(',')) {
        var items = [e];
        while (this.isOp(',')) { this.next(); if (this.isOp(')')) break; items.push(this.expr()); }
        this.expectClose(')', line);
        return { k: 'list', items: items, line: line };
      }
      this.expectClose(')', line);
      return e;
    }
    if (t.t === 'OP' && t.v === '[') {
      this.next();
      var li = [];
      while (!this.isOp(']')) {
        li.push(this.expr());
        if (this.isOp(',')) this.next(); else if (!this.isOp(']')) fail('A lista elemei közé vessző kell, a végére pedig ].', this.line());
      }
      this.next();
      return { k: 'list', items: li, line: line };
    }
    if (t.t === 'NL' || t.t === 'EOF') fail('A sor túl korán véget ért: itt még egy értéket (számot, nevet, szöveget) vártam.', line);
    if (t.t === 'INDENT') fail('Behúzási hiba: váratlanul beljebb kezdett sor.', line);
    fail('Itt egy értéket (számot, nevet, szöveget vagy zárójeles kifejezést) vártam, de ' + desc(t) + ' áll.', line);
  };

  function parse(src) { return new Parser(tokenize(src)).program(); }

  /* AST-bejárás a feladatok követelményeihez (pl. „használj while ciklust”) */
  function walk(nodes, fn) {
    (nodes || []).forEach(function visit(n) {
      if (!n || typeof n !== 'object') return;
      if (Array.isArray(n)) { n.forEach(visit); return; }
      if (n.k) fn(n);
      Object.keys(n).forEach(function (key) { var v = n[key]; if (v && typeof v === 'object') visit(v); });
    });
  }
  function uses(ast, what) {
    var found = false;
    if (what === 'rekurzio') {
      walk(ast, function (n) {
        if (n.k !== 'def') return;
        walk(n.body, function (m) { if (m.k === 'call' && m.f.k === 'name' && m.f.id === n.name) found = true; });
      });
      return found;
    }
    walk(ast, function (n) { if (n.k === what) found = true; });
    return found;
  }

  /* ====================================================================
   * 4. Fordító: AST → verem-gépi utasítások ([op, arg, sor])
   * ==================================================================== */
  function Ctx(fn) { this.code = []; this.loops = []; this.fn = fn; }
  var C = Ctx.prototype;
  C.emit = function (op, a, line) { this.code.push([op, a, line]); return this.code.length - 1; };
  C.here = function () { return this.code.length; };
  C.patch = function (i, to) { this.code[i][1] = to == null ? this.code.length : to; };
  C.isLocal = function (name) { return !!(this.fn && this.fn.locals[name]); };
  C.load = function (name, line) { this.emit(this.isLocal(name) ? 'LOADL' : 'LOADG', name, line); };
  C.store = function (name, line) { this.emit(this.isLocal(name) ? 'STOREL' : 'STOREG', name, line); };
  C.body = function (list) { for (var i = 0; i < list.length; i++) this.st(list[i]); };

  function collectLocals(body, info) {
    (body || []).forEach(function v(s) {
      switch (s.k) {
        case 'global': s.names.forEach(function (n) { info.globals[n] = 1; }); break;
        case 'assign': s.targets.forEach(function (t) { if (t.k === 'name') info.cand[t.id] = 1; }); break;
        case 'aug': if (s.target.k === 'name') info.cand[s.target.id] = 1; break;
        case 'for': info.cand[s.name] = 1; s.body.forEach(v); break;
        case 'while': s.body.forEach(v); break;
        case 'if': s.tests.forEach(function (t) { t.body.forEach(v); }); if (s.orelse) s.orelse.forEach(v); break;
        case 'def': info.cand[s.name] = 1; break;
      }
    });
  }

  C.st = function (s) {
    var self = this, line = s.line, i, j;
    var lineIdx = this.emit('LINE', 0, line);
    switch (s.k) {
      case 'pass': case 'global': return;
      case 'expr':
        this.ex(s.e);
        if (s.e.k === 'name') this.emit('BARE', s.e.id, line); else this.emit('POP', 0, line);
        return;
      case 'assign': {
        var T = s.targets, V = s.values;
        V.forEach(function (v) { self.ex(v); });
        if (T.length === 1 && V.length > 1) { this.emit('LIST', V.length, line); }
        else if (T.length > 1 && V.length === 1) { this.emit('UNPACK', T.length, line); }
        for (i = T.length - 1; i >= 0; i--) this.storeTarget(T[i], line);
        return;
      }
      case 'aug': {
        var t = s.target;
        if (t.k === 'name') { this.load(t.id, line); this.ex(s.value); this.emit('BIN', s.op, line); this.store(t.id, line); }
        else { this.ex(t); this.ex(s.value); this.emit('BIN', s.op, line); this.ex(t.o); this.ex(t.i); this.emit('SETIDX', 0, line); }
        return;
      }
      case 'if': {
        var ends = [];
        for (i = 0; i < s.tests.length; i++) {
          var te = s.tests[i];
          if (i > 0) this.emit('LINE', 0, te.line);
          this.ex(te.cond);
          var jf = this.emit('JF', 0, te.line);
          this.body(te.body);
          if (i < s.tests.length - 1 || s.orelse) ends.push(this.emit('JMP', 0, te.line));
          this.patch(jf);
        }
        if (s.orelse) this.body(s.orelse);
        for (j = 0; j < ends.length; j++) this.patch(ends[j]);
        return;
      }
      case 'while': {
        var top = lineIdx;
        this.ex(s.cond);
        var jw = this.emit('JF', 0, line);
        var lp = { brk: [], cont: [] }; this.loops.push(lp);
        this.body(s.body);
        this.loops.pop();
        lp.cont.forEach(function (c) { self.patch(c, top); });
        this.emit('JMP', top, line);
        this.patch(jw);
        lp.brk.forEach(function (b) { self.patch(b); });
        return;
      }
      case 'for': {
        this.ex(s.iter);
        this.emit('ITER', 0, line);
        var ftop = this.here();
        var jfor = this.emit('FOR', 0, line);
        this.store(s.name, line);
        var lp2 = { brk: [], cont: [] }; this.loops.push(lp2);
        this.body(s.body);
        this.loops.pop();
        var back = this.emit('LINE', 0, line);
        lp2.cont.forEach(function (c) { self.patch(c, back); });
        this.emit('JMP', ftop, line);
        var popAt = this.emit('POP', 0, line);
        lp2.brk.forEach(function (b) { self.patch(b, popAt); });
        this.patch(jfor);
        return;
      }
      case 'def': {
        var info = { locals: {}, globals: {}, cand: {} };
        s.params.forEach(function (p) { info.cand[p] = 1; });
        collectLocals(s.body, info);
        Object.keys(info.cand).forEach(function (n) { if (!info.globals[n]) info.locals[n] = 1; });
        var sub = new Ctx(info);
        sub.body(s.body);
        sub.emit('CONST', null, s.line);
        sub.emit('RET', 0, s.line);
        this.emit('CONST', { kind: 'fn', name: s.name, params: s.params, code: sub.code, line: s.line }, line);
        this.store(s.name, line);
        return;
      }
      case 'return':
        if (!this.fn) fail('A return csak függvényen (def) belül használható.', line);
        if (s.e) this.ex(s.e); else this.emit('CONST', null, line);
        this.emit('RET', 0, line);
        return;
      case 'break':
        if (!this.loops.length) fail('A break csak cikluson (while vagy for) belül használható.', line);
        this.loops[this.loops.length - 1].brk.push(this.emit('JMP', 0, line));
        return;
      case 'continue':
        if (!this.loops.length) fail('A continue csak cikluson (while vagy for) belül használható.', line);
        this.loops[this.loops.length - 1].cont.push(this.emit('JMP', 0, line));
        return;
    }
    fail('Ismeretlen utasítás.', line);
  };
  C.storeTarget = function (t, line) {
    if (t.k === 'name') this.store(t.id, line);
    else { this.ex(t.o); this.ex(t.i); this.emit('SETIDX', 0, line); }
  };
  C.ex = function (e) {
    var self = this, line = e.line, i;
    switch (e.k) {
      case 'const': this.emit('CONST', e.v, line); return;
      case 'name': this.load(e.id, line); return;
      case 'list': e.items.forEach(function (x) { self.ex(x); }); this.emit('LIST', e.items.length, line); return;
      case 'bin': this.ex(e.l); this.ex(e.r); this.emit('BIN', e.op, line); return;
      case 'un': this.ex(e.e); this.emit('UN', e.op, line); return;
      case 'not': this.ex(e.e); this.emit('NOT', 0, line); return;
      case 'and': { this.ex(e.l); var ja = this.emit('JFK', 0, line); this.ex(e.r); this.patch(ja); return; }
      case 'or': { this.ex(e.l); var jo = this.emit('JTK', 0, line); this.ex(e.r); this.patch(jo); return; }
      case 'cmp': {
        var js = [];
        for (i = 0; i < e.ops.length; i++) {
          this.ex(e.items[i]); this.ex(e.items[i + 1]); this.emit('CMP', e.ops[i], line);
          if (i < e.ops.length - 1) js.push(this.emit('JFK', 0, line));
        }
        js.forEach(function (j) { self.patch(j); });
        return;
      }
      case 'call':
        this.ex(e.f);
        e.args.forEach(function (a) { self.ex(a); });
        e.kw.forEach(function (k) { self.ex(k.e); });
        this.emit('CALL', [e.args.length, e.kw.length ? e.kw.map(function (k) { return k.name; }) : null, e.f.k === 'name' ? e.f.id : (e.f.k === 'attr' ? e.f.name : null)], line);
        return;
      case 'idx': this.ex(e.o); this.ex(e.i); this.emit('INDEX', 0, line); return;
      case 'slice':
        this.ex(e.o);
        if (e.a) this.ex(e.a); else this.emit('CONST', null, line);
        if (e.b) this.ex(e.b); else this.emit('CONST', null, line);
        this.emit('SLICE', 0, line); return;
      case 'attr': this.ex(e.o); this.emit('ATTR', e.name, line); return;
    }
    fail('Ismeretlen kifejezés.', line);
  };

  function compile(src) {
    var ast = parse(src), c = new Ctx(null);
    c.body(ast);
    c.emit('END', 0, String(src).split('\n').length);
    return { code: c.code, ast: ast };
  }

  /* ====================================================================
   * 5. Értékek: kiírás, típusnevek, összehasonlítás
   * ==================================================================== */
  function isNum(v) { return typeof v === 'number' || typeof v === 'boolean'; }
  function fmtNum(x) {
    if (x !== x) return 'nan';
    if (!isFinite(x)) return x > 0 ? 'inf' : '-inf';
    if (Math.floor(x) === x && Math.abs(x) < 1e16) return String(x === 0 ? 0 : x);
    return String(parseFloat(x.toPrecision(12)));
  }
  function repr(v, inner) {
    if (v === null || v === undefined) return 'None';
    if (v === true) return 'True';
    if (v === false) return 'False';
    if (typeof v === 'number') return fmtNum(v);
    if (typeof v === 'string') return inner ? "'" + v.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'" : v;
    if (Array.isArray(v)) return '[' + v.map(function (x) { return repr(x, true); }).join(', ') + ']';
    if (v.kind === 'range') return 'range(' + v.a + ', ' + v.b + (v.c !== 1 ? ', ' + v.c : '') + ')';
    if (v.kind === 'fn') return '<függvény ' + v.name + '>';
    if (v.kind === 'bi') return '<beépített függvény ' + v.name + '>';
    return '?';
  }
  function reprShort(v, max) {
    max = max || 60;
    if (Array.isArray(v) && v.length > 12) return '[' + v.slice(0, 5).map(function (x) { return repr(x, true); }).join(', ') + ', … (' + v.length + ' elem)]';
    var s = repr(v, true);
    return s.length > max ? s.slice(0, max - 1) + '…' : s;
  }
  function tn(v) {
    if (v === null || v === undefined) return 'None (semmi)';
    if (typeof v === 'boolean') return 'logikai érték';
    if (typeof v === 'number') return Math.floor(v) === v ? 'egész szám' : 'tört szám';
    if (typeof v === 'string') return 'szöveg';
    if (Array.isArray(v)) return 'lista';
    if (v.kind === 'range') return 'range';
    if (v.kind === 'fn' || v.kind === 'bi') return 'függvény';
    return 'ismeretlen';
  }
  function truthy(v) {
    if (v === null || v === undefined || v === false) return false;
    if (v === true) return true;
    if (typeof v === 'number') return v !== 0;
    if (typeof v === 'string' || Array.isArray(v)) return v.length > 0;
    if (v.kind === 'range') return rlen(v) > 0;
    return true;
  }
  function eq(a, b) {
    if (isNum(a) && isNum(b)) return +a === +b;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (var i = 0; i < a.length; i++) if (!eq(a[i], b[i])) return false;
      return true;
    }
    if (a === undefined) a = null; if (b === undefined) b = null;
    return a === b;
  }
  function strictEq(a, b) { /* teszteknél: True ≠ 1 */
    if (typeof a !== typeof b && !(a == null && b == null)) return false;
    if (Array.isArray(a)) { if (!Array.isArray(b) || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (!strictEq(a[i], b[i])) return false; return true; }
    return eq(a, b);
  }
  function cmpv(a, b, op, line) {
    if (isNum(a) && isNum(b)) return +a < +b ? -1 : +a > +b ? 1 : 0;
    if (typeof a === 'string' && typeof b === 'string') return a < b ? -1 : a > b ? 1 : 0;
    if (Array.isArray(a) && Array.isArray(b)) {
      for (var i = 0; i < Math.min(a.length, b.length); i++) { var c = cmpv(a[i], b[i], op, line); if (c) return c; }
      return a.length - b.length;
    }
    fail('Nem lehet összehasonlítani (' + op + '): ' + tn(a) + ' és ' + tn(b) + '.' + (typeof a === 'string' || typeof b === 'string' ? ' Szöveget számmá az int() függvénnyel alakíthatsz.' : ''), line);
  }
  function rlen(r) { return Math.max(0, Math.ceil((r.b - r.a) / r.c)); }
  function deepCopy(v) { return Array.isArray(v) ? v.map(deepCopy) : v; }
  function isInt(v) { return (typeof v === 'number' && Math.floor(v) === v) || typeof v === 'boolean'; }
  function needInt(v, what, line) { if (!isInt(v)) fail(what + ' csak egész szám lehet, de most ' + tn(v) + ' (' + repr(v, true) + ').' + (typeof v === 'number' ? ' Osztásnál használd a // jelet!' : ''), line); return +v; }
  function seq(v, what, line) {
    if (Array.isArray(v)) return v;
    if (typeof v === 'string') return v.split('');
    if (v && v.kind === 'range') { var n = rlen(v); if (n > 100000) fail('Túl hosszú range (több mint 100 000 elem).', line); var o = []; for (var i = 0; i < n; i++) o.push(v.a + i * v.c); return o; }
    fail(what + ' egy listát, szöveget vagy range-et vár, de ' + tn(v) + ' értéket kapott.', line);
  }

  function binop(op, a, b, line) {
    var both = isNum(a) && isNum(b);
    switch (op) {
      case '+':
        if (both) return +a + +b;
        if (typeof a === 'string' && typeof b === 'string') return a + b;
        if (Array.isArray(a) && Array.isArray(b)) return a.concat(b);
        if ((typeof a === 'string' && isNum(b)) || (isNum(a) && typeof b === 'string')) fail('Szöveget és számot nem lehet összeadni. Alakítsd a számot szöveggé a str() függvénnyel (pl. "Pont: " + str(p)), vagy írd vesszővel elválasztva a print-be.', line);
        break;
      case '-': if (both) return a - b; break;
      case '*':
        if (both) return a * b;
        if (typeof a === 'string' && isInt(b)) { if (a.length * b > 1e6) fail('Túl hosszú szöveg jönne létre.', line); return b > 0 ? new Array(+b + 1).join(a) : ''; }
        if (isInt(a) && typeof b === 'string') return binop('*', b, a, line);
        if (Array.isArray(a) && isInt(b)) { if (a.length * b > 100000) fail('Túl hosszú lista jönne létre.', line); var o = []; for (var i = 0; i < b; i++) o = o.concat(a); return o; }
        if (isInt(a) && Array.isArray(b)) return binop('*', b, a, line);
        break;
      case '/': if (both) { if (+b === 0) fail('Nullával nem lehet osztani.', line); return a / b; } break;
      case '//': if (both) { if (+b === 0) fail('Nullával nem lehet osztani.', line); return Math.floor(a / b); } break;
      case '%': if (both) { if (+b === 0) fail('Nullával nem lehet maradékot képezni (% 0).', line); return a - b * Math.floor(a / b); } break;
      case '**': if (both) return Math.pow(a, b); break;
    }
    fail('A(z) „' + op + '” művelet nem végezhető el ' + tn(a) + ' és ' + tn(b) + ' között.', line);
  }

  /* ====================================================================
   * 6. Beépített függvények és metódusok
   * ==================================================================== */
  function bi(name, min, max, fn, kw) { return { kind: 'bi', name: name, min: min, max: max, fn: fn, kw: !!kw }; }
  function makeBuiltins(vm) {
    var B = {};
    B.print = bi('print', 0, 99, function (args, kw) {
      var sep = kw.sep != null ? String(kw.sep) : ' ', end = kw.end != null ? String(kw.end) : '\n';
      vm.write(args.map(function (a) { return repr(a); }).join(sep) + end);
      return null;
    }, true);
    B.len = bi('len', 1, 1, function (a, kw, line) {
      var v = a[0];
      if (typeof v === 'string' || Array.isArray(v)) return v.length;
      if (v && v.kind === 'range') return rlen(v);
      fail('A len() csak listának, szövegnek vagy range-nek tudja megmondani a hosszát, ' + tn(v) + ' értéknek nem.', line);
    });
    B.range = bi('range', 1, 3, function (a, kw, line) {
      a.forEach(function (x) { needInt(x, 'A range() bemenete', line); });
      var r = a.length === 1 ? { kind: 'range', a: 0, b: +a[0], c: 1 } : { kind: 'range', a: +a[0], b: +a[1], c: a.length > 2 ? +a[2] : 1 };
      if (r.c === 0) fail('A range() lépésköze nem lehet 0.', line);
      return r;
    });
    B.abs = bi('abs', 1, 1, function (a, kw, line) { if (!isNum(a[0])) fail('Az abs() számot vár.', line); return Math.abs(a[0]); });
    function minmax(name, sign) {
      return bi(name, 1, 99, function (a, kw, line) {
        var L = a.length === 1 ? seq(a[0], 'A(z) ' + name + '()', line) : a;
        if (!L.length) fail('Üres listának nincs ' + (sign > 0 ? 'legnagyobb' : 'legkisebb') + ' eleme.', line);
        var best = L[0];
        for (var i = 1; i < L.length; i++) if (cmpv(L[i], best, name, line) * sign > 0) best = L[i];
        return best;
      });
    }
    B.max = minmax('max', 1); B.min = minmax('min', -1);
    B.sum = bi('sum', 1, 1, function (a, kw, line) { var L = seq(a[0], 'A sum()', line), s = 0; L.forEach(function (x) { if (!isNum(x)) fail('A sum() csak számokat tud összeadni.', line); s += +x; }); return s; });
    B.int = bi('int', 1, 1, function (a, kw, line) {
      var v = a[0];
      if (isNum(v)) return v < 0 ? Math.ceil(v) : Math.floor(v);
      if (typeof v === 'string' && /^\s*[-+]?\d+\s*$/.test(v)) return parseInt(v, 10);
      fail('Ez nem alakítható egész számmá: ' + repr(v, true) + '.', line);
    });
    B.float = bi('float', 1, 1, function (a, kw, line) {
      var v = a[0];
      if (isNum(v)) return +v;
      if (typeof v === 'string' && /^\s*[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?\s*$/.test(v)) return parseFloat(v);
      fail('Ez nem alakítható számmá: ' + repr(v, true) + '.', line);
    });
    B.str = bi('str', 0, 1, function (a) { return a.length ? repr(a[0]) : ''; });
    B.bool = bi('bool', 0, 1, function (a) { return a.length ? truthy(a[0]) : false; });
    B.list = bi('list', 0, 1, function (a, kw, line) { return a.length ? seq(a[0], 'A list()', line).slice() : []; });
    B.round = bi('round', 1, 2, function (a, kw, line) {
      if (!isNum(a[0])) fail('A round() számot vár.', line);
      var d = a.length > 1 ? needInt(a[1], 'A tizedesjegyek száma', line) : 0, p = Math.pow(10, d);
      return Math.round(a[0] * p) / p;
    });
    B.sorted = bi('sorted', 1, 1, function (a, kw, line) { return seq(a[0], 'A sorted()', line).slice().sort(function (x, y) { return cmpv(x, y, '<', line); }); });
    return B;
  }
  function method(obj, name, line) {
    var M = null;
    if (Array.isArray(obj)) {
      M = {
        append: [1, 1, function (a) { if (obj.length >= 100000) fail('A lista túl hosszú lett (100 000 elem).', line); obj.push(a[0]); return null; }],
        pop: [0, 1, function (a) {
          if (!obj.length) fail('Üres listából nem lehet elemet kivenni (pop).', line);
          var i = a.length ? needInt(a[0], 'Az index', line) : obj.length - 1; if (i < 0) i += obj.length;
          if (i < 0 || i >= obj.length) fail('A pop() indexe kilóg a listából.', line);
          return obj.splice(i, 1)[0];
        }],
        insert: [2, 2, function (a) { var i = needInt(a[0], 'Az index', line); if (i < 0) i = Math.max(0, obj.length + i); obj.splice(Math.min(i, obj.length), 0, a[1]); return null; }],
        remove: [1, 1, function (a) { for (var i = 0; i < obj.length; i++) if (eq(obj[i], a[0])) { obj.splice(i, 1); return null; } fail('A remove(): nincs ilyen elem a listában: ' + repr(a[0], true) + '.', line); }],
        index: [1, 1, function (a) { for (var i = 0; i < obj.length; i++) if (eq(obj[i], a[0])) return i; fail('Az index(): nincs ilyen elem a listában: ' + repr(a[0], true) + '.', line); }],
        count: [1, 1, function (a) { var n = 0; obj.forEach(function (x) { if (eq(x, a[0])) n++; }); return n; }],
        copy: [0, 0, function () { return obj.slice(); }],
        reverse: [0, 0, function () { obj.reverse(); return null; }],
        sort: [0, 0, function () { obj.sort(function (x, y) { return cmpv(x, y, '<', line); }); return null; }]
      };
    } else if (typeof obj === 'string') {
      M = {
        upper: [0, 0, function () { return obj.toUpperCase(); }],
        lower: [0, 0, function () { return obj.toLowerCase(); }],
        strip: [0, 0, function () { return obj.trim(); }],
        split: [0, 1, function (a) { return a.length ? obj.split(String(a[0])) : obj.trim().split(/\s+/).filter(Boolean); }],
        replace: [2, 2, function (a) { return obj.split(String(a[0])).join(String(a[1])); }],
        count: [1, 1, function (a) { return String(a[0]) ? obj.split(String(a[0])).length - 1 : obj.length + 1; }],
        find: [1, 1, function (a) { return obj.indexOf(String(a[0])); }],
        isdigit: [0, 0, function () { return /^\d+$/.test(obj); }],
        join: [1, 1, function (a) { return seq(a[0], 'A join()', line).map(function (x) { if (typeof x !== 'string') fail('A join() csak szövegeket tud összefűzni.', line); return x; }).join(obj); }]
      };
    }
    var m = M && Object.prototype.hasOwnProperty.call(M, name) ? M[name] : null;
    if (!m) fail('A(z) ' + tn(obj) + ' értéknek nincs „' + name + '” nevű művelete' + (M ? ' (ismertek: ' + Object.keys(M).join(', ') + ')' : '') + '.', line);
    return bi(name, m[0], m[1], m[2]);
  }

  /* ====================================================================
   * 7. Robot-világ
   * ==================================================================== */
  var DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]; /* kelet, dél, nyugat, észak */
  function World(map) {
    var self = this;
    this.map = map; this.h = map.length; this.w = 0; this.walls = {}; this.gems = {}; this.goal = null; this.total = 0;
    map.forEach(function (row, y) {
      self.w = Math.max(self.w, row.length);
      row.split('').forEach(function (ch, x) {
        var k = x + ',' + y;
        if (ch === '#') self.walls[k] = 1;
        else if (ch === '*') { self.gems[k] = 1; self.total++; }
        else if (ch === 'C') self.goal = [x, y];
        else if ('>v<^'.indexOf(ch) >= 0) { self.x = x; self.y = y; self.d = '>v<^'.indexOf(ch); }
      });
    });
    map.forEach(function (row, y) { for (var x = row.length; x < self.w; x++) self.walls[x + ',' + y] = 1; });
    this.angle = this.d * 90; this.moves = 0; this.picked = 0;
  }
  World.prototype.blocked = function (x, y) { return x < 0 || y < 0 || x >= this.w || y >= this.h || !!this.walls[x + ',' + y]; };
  World.prototype.ahead = function (dd) { var D = DIRS[(this.d + dd + 4) % 4]; return this.blocked(this.x + D[0], this.y + D[1]); };
  World.prototype.atGoal = function () { return !!this.goal && this.x === this.goal[0] && this.y === this.goal[1]; };
  World.prototype.left = function () { return Object.keys(this.gems).length; };
  World.prototype.verdict = function () {
    var left = this.left();
    if (left) return { ok: false, msg: 'A program véget ért, de még ' + left + ' kincs maradt a pályán.' };
    if (this.goal && !this.atGoal()) return { ok: false, msg: 'A program véget ért, de a robot nem ért a célba (🏁).' };
    return { ok: true, msg: 'Siker! A robot teljesítette a pályát.' };
  };
  function robotBuiltins(vm, w) {
    function act() { w.moves++; if (w.moves > 5000) fail('A robot elfáradt: több mint 5000 mozdulatot tett. Lehet, hogy körbe-körbe jár?', vm.line); vm.yieldNow = true; }
    return {
      elore: bi('elore', 0, 0, function (a, kw, line) {
        if (w.ahead(0)) fail('Bumm! A robot falnak ütközött – előtte fal vagy a pálya széle van. (A fal_elol() megmondja, van-e előtte fal.)', line);
        w.x += DIRS[w.d][0]; w.y += DIRS[w.d][1]; act(); return null;
      }),
      balra: bi('balra', 0, 0, function () { w.d = (w.d + 3) % 4; w.angle -= 90; act(); return null; }),
      jobbra: bi('jobbra', 0, 0, function () { w.d = (w.d + 1) % 4; w.angle += 90; act(); return null; }),
      felvesz: bi('felvesz', 0, 0, function (a, kw, line) {
        var k = w.x + ',' + w.y;
        if (!w.gems[k]) fail('Itt nincs kincs, amit fel lehetne venni. (A kincs_itt() megmondja, van-e kincs a robot mezőjén.)', line);
        delete w.gems[k]; w.picked++; act(); return null;
      }),
      fal_elol: bi('fal_elol', 0, 0, function () { return w.ahead(0); }),
      szabad_balra: bi('szabad_balra', 0, 0, function () { return !w.ahead(-1); }),
      szabad_jobbra: bi('szabad_jobbra', 0, 0, function () { return !w.ahead(1); }),
      kincs_itt: bi('kincs_itt', 0, 0, function () { return !!w.gems[w.x + ',' + w.y]; }),
      celnal: bi('celnal', 0, 0, function () { return w.atGoal(); })
    };
  }

  /* ====================================================================
   * 8. Virtuális gép (lépésenként futtatható)
   * ==================================================================== */
  function lev(a, b) {
    var m = [], i, j;
    for (i = 0; i <= a.length; i++) { m[i] = [i]; }
    for (j = 0; j <= b.length; j++) m[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return m[a.length][b.length];
  }
  function suggest(name, cands) {
    var nn = S.norm(name), best = null, bd = 3;
    cands.forEach(function (c) { var d = lev(nn, S.norm(c)); if (S.norm(c) === nn) d = 0.5; if (d < bd && c !== name) { bd = d; best = c; } });
    return best && (bd <= 1 || (bd <= 2 && name.length > 4)) ? best : null;
  }

  function VM(prog, opts) {
    opts = opts || {};
    this.opts = opts;
    this.globals = {};
    this.out = ''; this.outLines = 0;
    this.stack = [];
    this.steps = 0;
    this.maxSteps = opts.maxSteps || 100000;
    this.maxDepth = opts.maxDepth || 200;
    this.done = false;
    this.yieldNow = false;
    this.bi = makeBuiltins(this);
    this.tiltott = {}; (opts.tiltott || []).forEach(function (t) { this.tiltott[t] = 1; }, this);
    if (opts.world) { var rb = robotBuiltins(this, opts.world); for (var k in rb) this.bi[k] = rb[k]; }
    this.frames = [{ code: prog.code, pc: 0, locals: null, base: 0, fn: null }];
    this.line = this.peekLine();
  }
  var V = VM.prototype;
  V.write = function (s) {
    if (this.out.length > 20000) return;
    this.out += s;
    if (this.out.length > 20000) this.out += '\n… (a kimenet túl hosszú, a többit levágtam)\n';
  };
  V.peekLine = function () {
    var f = this.frames[this.frames.length - 1];
    for (var i = f.pc; i < f.code.length; i++) if (f.code[i][0] === 'LINE' || f.code[i][0] === 'END') return f.code[i][2];
    return 0;
  };
  V.nameErr = function (name, line) {
    var cands = Object.keys(this.globals).concat(Object.keys(this.bi), KWLIST);
    var f = this.frames[this.frames.length - 1]; if (f.locals) cands = cands.concat(Object.keys(f.locals));
    var sg = suggest(name, cands);
    fail('Ismeretlen név: „' + name + '”. ' + (sg ? 'Talán erre gondoltál: „' + sg + '”?' : 'Lehet, hogy elírtad, vagy még nem adtál neki értéket (változó), illetve még nem írtad meg (függvény).'), line);
  };
  /* Egy lépés = egy utasítássor végrehajtása (vagy egy robotmozdulat). Visszatér: 'paused' | 'done'. */
  V.step = function () {
    if (this.done) return 'done';
    var first = true, st = this.stack, guard = 0;
    for (;;) {
      var f = this.frames[this.frames.length - 1], ins = f.code[f.pc], op = ins[0], a = ins[1], line = ins[2];
      if (op === 'LINE') {
        if (!first) { this.line = line; return 'paused'; }
        if (++this.steps > this.maxSteps) fail('Túl sok lépés (több mint ' + this.maxSteps.toLocaleString('hu-HU') + ') – lehet, hogy végtelen ciklus van a programban? Ellenőrizd, hogy a while feltétele egyszer hamissá válik-e.', line);
        this.line = line; first = false; f.pc++; continue;
      }
      first = false;
      if (++guard > 1000000) fail('A program túl sokáig fut egyetlen lépésben.', line);
      f.pc++;
      var x, y, v, i;
      switch (op) {
        case 'CONST': st.push(a); break;
        case 'LOADL':
          if (!Object.prototype.hasOwnProperty.call(f.locals, a)) fail('A(z) „' + a + '” helyi változónak még nincs értéke ebben a függvényben. (Ha a függvényen kívüli változót akarod megváltoztatni, írd a függvény elejére: global ' + a + ')', line);
          st.push(f.locals[a]); break;
        case 'LOADG':
          if (Object.prototype.hasOwnProperty.call(this.globals, a)) st.push(this.globals[a]);
          else if (Object.prototype.hasOwnProperty.call(this.bi, a)) {
            if (this.tiltott[a]) fail('Ebben a feladatban a beépített ' + a + '() függvényt nem használhatod – írd meg magad a ciklussal!', line);
            st.push(this.bi[a]);
          } else this.nameErr(a, line);
          break;
        case 'STOREL': f.locals[a] = st.pop(); break;
        case 'STOREG': this.globals[a] = st.pop(); break;
        case 'POP': st.pop(); break;
        case 'BARE':
          v = st.pop();
          if (v && (v.kind === 'fn' || v.kind === 'bi')) fail('A(z) „' + a + '” után hiányzik a zárójel. Függvényt így hívunk meg: ' + a + '()', line);
          break;
        case 'BIN': y = st.pop(); x = st.pop(); st.push(binop(a, x, y, line)); break;
        case 'UN':
          x = st.pop();
          if (!isNum(x)) fail('Előjelet (' + a + ') csak szám elé lehet írni, ' + tn(x) + ' elé nem.', line);
          st.push(a === '-' ? -x : +x); break;
        case 'NOT': st.push(!truthy(st.pop())); break;
        case 'CMP':
          y = st.pop(); x = st.pop();
          if (a === '==') v = eq(x, y);
          else if (a === '!=') v = !eq(x, y);
          else if (a === 'in' || a === 'not in') {
            if (typeof y === 'string') { if (typeof x !== 'string') fail('Szövegben csak szöveget lehet keresni (in).', line); v = y.indexOf(x) >= 0; }
            else if (Array.isArray(y)) { v = false; for (i = 0; i < y.length; i++) if (eq(x, y[i])) { v = true; break; } }
            else if (y && y.kind === 'range') { v = isInt(x) && (y.c > 0 ? x >= y.a && x < y.b : x <= y.a && x > y.b) && (x - y.a) % y.c === 0; }
            else fail('Az „in” jobb oldalán lista, szöveg vagy range állhat, ' + tn(y) + ' nem.', line);
            if (a === 'not in') v = !v;
          } else {
            var c = cmpv(x, y, a, line);
            v = a === '<' ? c < 0 : a === '>' ? c > 0 : a === '<=' ? c <= 0 : c >= 0;
          }
          st.push(v); break;
        case 'JMP': f.pc = a; break;
        case 'JF': if (!truthy(st.pop())) f.pc = a; break;
        case 'JFK': if (!truthy(st[st.length - 1])) f.pc = a; else st.pop(); break;
        case 'JTK': if (truthy(st[st.length - 1])) f.pc = a; else st.pop(); break;
        case 'LIST': st.push(a ? st.splice(st.length - a, a) : []); break;
        case 'UNPACK':
          v = st.pop();
          if (!Array.isArray(v) && typeof v !== 'string') fail('Egy ' + tn(v) + ' értéket nem lehet ' + a + ' változóba szétosztani.', line);
          if (v.length !== a) fail('Az értékadás bal oldalán ' + a + ' változó van, a jobb oldalon viszont ' + v.length + ' érték.', line);
          for (i = 0; i < a; i++) st.push(v[i]);
          break;
        case 'INDEX': y = st.pop(); x = st.pop(); st.push(this.index(x, y, line)); break;
        case 'SETIDX': {
          var idx = st.pop(), obj = st.pop(); v = st.pop();
          if (typeof obj === 'string') fail('A szöveg betűit nem lehet egyenként átírni. Készíts helyette új szöveget!', line);
          if (!Array.isArray(obj)) fail('Egy ' + tn(obj) + ' értéknek nincsenek indexelhető elemei.', line);
          obj[this.fixIndex(obj, idx, line)] = v; break;
        }
        case 'SLICE': {
          var b = st.pop(), aa = st.pop(); x = st.pop();
          if (!Array.isArray(x) && typeof x !== 'string') fail('Csak listát vagy szöveget lehet szeletelni ([a:b]).', line);
          var L = x.length, lo = aa == null ? 0 : needInt(aa, 'A szelet határa', line), hi = b == null ? L : needInt(b, 'A szelet határa', line);
          if (lo < 0) lo = Math.max(0, lo + L); if (hi < 0) hi = Math.max(0, hi + L);
          st.push(x.slice(Math.min(lo, L), Math.min(hi, L))); break;
        }
        case 'ATTR':
          x = st.pop();
          if (this.tiltott[a]) fail('Ebben a feladatban a(z) .' + a + '() műveletet nem használhatod – írd meg magad!', line);
          st.push(method(x, a, line)); break;
        case 'ITER':
          x = st.pop();
          if (x && x.kind === 'range') st.push({ kind: 'it', r: x, i: 0, n: rlen(x) });
          else if (Array.isArray(x) || typeof x === 'string') st.push({ kind: 'it', s: x, i: 0 });
          else fail('A for csak listán, szövegen vagy range()-en tud végigmenni, ' + tn(x) + ' értéken nem. (Számnál: for i in range(' + repr(x, true) + '):)', line);
          break;
        case 'FOR':
          x = st[st.length - 1];
          if (x.r) { if (x.i < x.n) st.push(x.r.a + (x.i++) * x.r.c); else { st.pop(); f.pc = a; } }
          else if (x.i < x.s.length) st.push(x.s[x.i++]);
          else { st.pop(); f.pc = a; }
          break;
        case 'CALL': {
          var n = a[0], kwn = a[1], kwv = {};
          if (kwn) for (i = kwn.length - 1; i >= 0; i--) kwv[kwn[i]] = st.pop();
          var args = n ? st.splice(st.length - n, n) : [];
          var fn = st.pop();
          if (fn && fn.kind === 'fn') {
            if (kwn) fail('Saját függvénynek a bemeneteket név nélkül, sorban add át.', line);
            if (args.length !== fn.params.length) fail('A(z) „' + fn.name + '” függvény ' + fn.params.length + ' bemenetet (paramétert) vár, de ' + args.length + ' darabot kapott.', line);
            if (this.frames.length >= this.maxDepth) fail('Túl mély rekurzió: több mint ' + this.maxDepth + ' egymásba ágyazott függvényhívás. Hiányzik a leállási feltétel (alapeset), vagy nem közelít felé a hívás?', line);
            var loc = {};
            for (i = 0; i < args.length; i++) loc[fn.params[i]] = args[i];
            this.frames.push({ code: fn.code, pc: 0, locals: loc, base: st.length, fn: fn, args: args });
          } else if (fn && fn.kind === 'bi') {
            if (kwn && !fn.kw) fail('A(z) ' + fn.name + '() nem fogad név=érték alakú bemenetet.', line);
            if (args.length < fn.min || args.length > fn.max) {
              fail(fn.max === 0 ? 'A(z) ' + fn.name + '() nem vár bemenetet – a zárójel üresen marad: ' + fn.name + '()' :
                'A(z) ' + fn.name + '() ' + (fn.min === fn.max ? fn.min : fn.min + '–' + fn.max) + ' bemenetet vár, de ' + args.length + ' darabot kapott.', line);
            }
            v = fn.fn(args, kwv, line);
            st.push(v === undefined ? null : v);
          } else fail((a[2] ? 'A(z) „' + a[2] + '” nem függvény (hanem ' + tn(fn) + '), ezért nem lehet zárójellel meghívni.' : 'Ez nem függvény, nem lehet meghívni.'), line);
          break;
        }
        case 'RET':
          v = st.pop(); this.frames.pop(); st.length = f.base; st.push(v); break;
        case 'END':
          this.done = true; this.line = line; return 'done';
        default: fail('Belső hiba: ismeretlen utasítás ' + op, line);
      }
      this.yieldNow = false; /* a robotmozdulat után a lépés a következő sor elején áll meg */
    }
  };
  V.fixIndex = function (obj, i, line) {
    var k = needInt(i, 'Az index', line), L = obj.length, kk = k < 0 ? k + L : k;
    if (kk < 0 || kk >= L) {
      var what = typeof obj === 'string' ? 'szöveg' : 'lista';
      fail(L ? 'Túlindexelés: a ' + what + ' ' + L + ' elemű, ezért az index 0 és ' + (L - 1) + ' között lehet, de most ' + k + ' volt.' : 'Túlindexelés: a ' + what + ' üres, nincs ' + k + '. eleme.', line);
    }
    return kk;
  };
  V.index = function (x, i, line) {
    if (Array.isArray(x) || typeof x === 'string') return x[this.fixIndex(x, i, line)];
    if (x && x.kind === 'range') { var k = needInt(i, 'Az index', line), n = rlen(x); if (k < 0) k += n; if (k < 0 || k >= n) fail('A range indexe kilóg.', line); return x.a + k * x.c; }
    fail('Egy ' + tn(x) + ' értéket nem lehet indexelni ([…]).', line);
  };
  V.run = function () { while (this.step() !== 'done') { /* tovább */ } };
  /* Saját függvény meghívása kívülről (tesztekhez) */
  V.call = function (name, args) {
    var fn = this.globals[name];
    if (!fn || fn.kind !== 'fn') fail('Nem találom a(z) „' + name + '” nevű függvényt. Ne nevezd át, és def-fel írd meg!', 0);
    var code = [['CONST', fn, 0]];
    args.forEach(function (a) { code.push(['CONST', a, 0]); });
    code.push(['CALL', [args.length, null, name], 0], ['END', 0, 0]);
    this.done = false; this.stack = []; this.steps = 0;
    this.frames = [{ code: code, pc: 0, locals: null, base: 0, fn: null }];
    this.run();
    return this.stack.pop();
  };
  V.snapshot = function () {
    var out = { globals: [], locals: null, fns: [], callStack: [] }, self = this;
    Object.keys(this.globals).forEach(function (k) {
      var v = self.globals[k];
      if (v && v.kind === 'fn') out.fns.push(k + '(' + v.params.join(', ') + ')'); else out.globals.push([k, v]);
    });
    var top = this.frames[this.frames.length - 1];
    if (top.fn && top.locals) out.locals = { name: top.fn.name, vars: Object.keys(top.locals).map(function (k) { return [k, top.locals[k]]; }) };
    this.frames.forEach(function (f) { if (f.fn) out.callStack.push(f.fn.name + '(' + (f.args || []).map(function (x) { return reprShort(x, 20); }).join(', ') + ')'); });
    return out;
  };

  function codeLines(src) { return String(src).split('\n').filter(function (l) { return l.trim() && !/^\s*#/.test(l); }).length; }

  /* ====================================================================
   * 9. Ellenőrzők (a felület és a node-teszt is ezt használja)
   * ==================================================================== */
  var KELL = { 'for': 'for ciklust', 'while': 'while ciklust', 'if': 'if elágazást', 'def': 'saját függvényt (def)', 'rekurzio': 'rekurziót (a függvény hívja önmagát)' };
  function requirements(task, prog) {
    var miss = (task.kell || []).filter(function (k) { return !uses(prog.ast, k); });
    return miss.length ? 'Működhet, de ebben a feladatban ' + miss.map(function (k) { return KELL[k]; }).join(' és ') + ' kell használnod.' : null;
  }
  function robotCheck(level, src) {
    var prog;
    try { prog = compile(src); } catch (e) { if (e instanceof KErr) return { ok: false, compileErr: e, results: [] }; throw e; }
    var results = level.maps.map(function (map) {
      var w = new World(map), vm = new VM(prog, { world: w, maxSteps: 20000 });
      try { vm.run(); } catch (e) { if (e instanceof KErr) return { ok: false, msg: e.toString(), err: e }; throw e; }
      return w.verdict();
    });
    var ok = results.every(function (r) { return r.ok; }), note = null;
    if (ok) {
      note = requirements(level, prog);
      if (!note && level.maxSor && codeLines(src) > level.maxSor) note = 'A robot célba ért, de a program ' + codeLines(src) + ' sor. Ennél a pályánál legfeljebb ' + level.maxSor + ' sor a cél (a megjegyzések és üres sorok nem számítanak) – használj ciklust!';
    }
    return { ok: ok && !note, results: results, note: note };
  }
  function algoCheck(task, src) {
    var prog;
    try { prog = compile(src); } catch (e) { if (e instanceof KErr) return { ok: false, compileErr: e, results: [] }; throw e; }
    var vm = new VM(prog, { tiltott: task.tiltott, maxSteps: 100000 });
    try { vm.run(); } catch (e) { if (e instanceof KErr) return { ok: false, compileErr: e, results: [] }; throw e; }
    var results = task.tests.map(function (t) {
      var args = deepCopy(t[0]), r = { args: t[0], expected: t[1] };
      vm.maxSteps = t[2] || task.maxSteps || 100000;
      try { r.got = vm.call(task.fn, args); r.steps = vm.steps; r.ok = strictEq(r.got, t[1]); }
      catch (e) {
        if (!(e instanceof KErr)) throw e;
        r.ok = false; r.err = e;
        if (t[2] && /Túl sok lépés/.test(e.msg)) r.err = new KErr('Túl lassú: több mint ' + t[2] + ' lépés kellett. ' + (task.lassu || ''), e.line);
        else if (task.lassu && /Túl sok lépés|Túl mély/.test(e.msg)) r.err = new KErr(e.msg + ' ' + task.lassu, e.line);
      }
      return r;
    });
    var ok = results.every(function (r) { return r.ok; }), note = ok ? requirements(task, prog) : null;
    return { ok: ok && !note, results: results, note: note, out: vm.out };
  }

  /* ====================================================================
   * 10. Feladatok – Robot a rácson
   * ==================================================================== */
  var ROBOT = [
    { id: 'robot-1', cim: 'Első lépések', fogalom: 'Szekvencia',
      leiras: 'A robot a pálya bal szélén áll, és jobbra néz. Juttasd el a célba (🏁)!\nAz `elore()` parancs egy mezőt léptet előre. A parancsokat egymás alá írd: a gép **sorban, fentről lefelé** hajtja végre őket.',
      tipp: 'Számold meg, hány mezőre van a cél! Annyiszor kell leírni: elore()',
      minta: 'elore()\nelore()\nelore()\nelore()\n',
      start: '# Írd ide a robot parancsait, soronként egyet!\nelore()\n',
      maps: [['>...C']],
      egyetem: 'A szekvencia (egymás utáni végrehajtás) a három alapvető vezérlési szerkezet egyike. A Böhm–Jacopini-tétel szerint szekvenciából, elágazásból és ciklusból minden algoritmus felépíthető.' },
    { id: 'robot-2', cim: 'Kanyar', fogalom: 'Szekvencia',
      leiras: 'Most kanyarodni is kell. A `jobbra()` és a `balra()` helyben fordítja el a robotot 90 fokkal – nem lép közben!\nFigyelj: a „jobbra” mindig a **robot szemszögéből** értendő.',
      tipp: 'Előre kettőt, fordulás jobbra (most lefelé néz), előre kettőt, fordulás balra, és még egy lépés.',
      minta: 'elore()\nelore()\njobbra()\nelore()\nelore()\nbalra()\nelore()\n',
      start: '# Előre, kanyar, előre…\n',
      maps: [['>..#', '##.#', '##.C']] },
    { id: 'robot-3', cim: 'Kincsgyűjtés', fogalom: 'Szekvencia',
      leiras: 'Szedd fel mindkét kincset (💎), aztán állj a célra! A `felvesz()` parancs a robot alatti mezőről veszi fel a kincset.',
      tipp: 'Először a felső sor kincse, aztán le a jobb oldalon, majd balra az alsó soron. Ahol kincs van, ott: felvesz()',
      minta: 'elore()\nelore()\nfelvesz()\nelore()\njobbra()\nelore()\nelore()\njobbra()\nelore()\nfelvesz()\nelore()\nelore()\n',
      start: '',
      maps: [['>.*.', '###.', 'C.*.']] },
    { id: 'robot-4', cim: 'Hosszú folyosó', fogalom: 'Ciklus',
      leiras: 'Tizenegy lépés a cél. Leírhatnád 11-szer, de a programozó lusta (és okos): a **for ciklus** megismétli a beljebb kezdett sorokat.\n`for i in range(3):` → a blokk háromszor fut le. A blokk sorait 4 szóközzel (vagy Tabbal) kezdd beljebb!\nItt legfeljebb **3 sor** lehet a program.',
      tipp: 'for i in range(11):\n    elore()',
      minta: 'for i in range(11):\n    elore()\n',
      start: 'for i in range(3):\n    elore()\n',
      maps: [['>..........C']], maxSor: 3, kell: ['for'],
      egyetem: 'A for ciklus számlálós (determinisztikus) ciklus: az ismétlések száma belépéskor ismert. A range(n) a 0, 1, …, n−1 sorozatot adja.' },
    { id: 'robot-5', cim: 'Lépcső', fogalom: 'Ciklus',
      leiras: 'Mássz fel a lépcsőn, és szedd fel a fokokon a kincseket! Keresd meg az **ismétlődő mintát**, és azt tedd a ciklusba. Legfeljebb **6 sor** lehet.',
      tipp: 'Egy lépcsőfok: előre, balra, előre, felvesz, jobbra. Ez ismétlődik 4-szer.',
      minta: 'for i in range(4):\n    elore()\n    balra()\n    elore()\n    felvesz()\n    jobbra()\n',
      start: '',
      maps: [['####*', '###*.', '##*.#', '#*.##', '>.###']], maxSor: 6, kell: ['for'] },
    { id: 'robot-6', cim: 'Körbe-körbe', fogalom: 'Ciklus',
      leiras: 'Járd körbe a négyzetet, és minden oldal közepéről vedd fel a kincset! Mind a 4 oldal ugyanolyan – de egy oldalon belül is van ismétlődés. Ciklus a ciklusban (**beágyazott ciklus**)! Legfeljebb **7 sor**.',
      tipp: 'Egy oldal: 3 lépés, felvesz, 3 lépés, jobbra. A „3 lépés” is lehet egy belső ciklus: for j in range(3): elore()',
      minta: 'for oldal in range(4):\n    for j in range(3):\n        elore()\n    felvesz()\n    for j in range(3):\n        elore()\n    jobbra()\n',
      start: '',
      maps: [['>..*...', '.#####.', '.#####.', '*#####*', '.#####.', '.#####.', '...*...']], maxSor: 7, kell: ['for'],
      egyetem: 'Beágyazott ciklusoknál a belső törzs végrehajtásainak száma a ciklusszámok szorzata (itt 4·3 + 4·3 lépés) – ez az alapja a műveletigény-becslésnek.' },
    { id: 'robot-7', cim: 'Ismeretlen folyosó', fogalom: 'Feltételes ciklus',
      leiras: 'A folyosó hossza **minden pályán más** (a pályaváltó gombokkal kipróbálhatod). Nem tudod előre, hányat kell lépni – ezért a **while ciklus** kell: addig ismétel, amíg a feltétele igaz.\nA `fal_elol()` igaz (True), ha a robot előtt fal van. A `not` megfordítja: `while not fal_elol():` = „amíg nincs előtted fal”.',
      tipp: 'while not fal_elol():\n    elore()',
      minta: 'while not fal_elol():\n    elore()\n',
      start: 'while not fal_elol():\n    \n',
      maps: [['>..C'], ['>......C'], ['>..........C']], kell: ['while'], felt: true,
      egyetem: 'Az elöltesztelő (while) ciklus akkor áll meg, ha a feltétele hamis lesz. A helyesség bizonyításához kell egy „variáns” – itt a faltól mért távolság –, amely minden lépésben csökken, így a ciklus biztosan véget ér.' },
    { id: 'robot-8', cim: 'Kincsek itt-ott', fogalom: 'Elágazás',
      leiras: 'A folyosón kincsek vannak, de minden pályán máshol. Lépj végig, és **ha** kincsen állsz, vedd fel!\nA `kincs_itt()` igaz, ha a robot mezőjén kincs van. Az `if` blokkja csak akkor fut le, ha a feltétel igaz.',
      tipp: 'A while cikluson belül: elore(), majd if kincs_itt(): felvesz()  – figyelj a behúzásra: a felvesz() még egy szinttel beljebb!',
      minta: 'while not fal_elol():\n    elore()\n    if kincs_itt():\n        felvesz()\n',
      start: '',
      maps: [['>.*..*.*'], ['>**....*'], ['>...*...']], kell: ['while', 'if'], felt: true },
    { id: 'robot-9', cim: 'Akadályfutás', fogalom: 'Elágazás',
      leiras: 'A célig vezető úton falak állnak. Ha fal van előtted, kerüld meg felülről; ha nincs, lépj előre. Ismételd, amíg célba nem érsz! A `celnal()` igaz, ha a robot a célon áll.\nAz `if … else` két ágú elágazás: ha a feltétel igaz, az első blokk fut, különben az `else` blokkja.',
      tipp: 'Kerülés: balra, elore, jobbra, elore, elore, jobbra, elore, balra. A váz:\nwhile not celnal():\n    if fal_elol():\n        …kerülés…\n    else:\n        elore()',
      minta: 'while not celnal():\n    if fal_elol():\n        balra()\n        elore()\n        jobbra()\n        elore()\n        elore()\n        jobbra()\n        elore()\n        balra()\n    else:\n        elore()\n',
      start: '',
      maps: [['........', '>..#..#C'], ['.........', '>#...#..C'], ['...........', '>....#.#..C']], kell: ['while', 'if'], felt: true },
    { id: 'robot-10', cim: 'Labirintus', fogalom: 'Elágazás',
      leiras: 'Juss ki a labirintusból! Egy régi trükk: **tartsd a jobb kezed a falon** – ha jobbra szabad az út, fordulj jobbra és lépj; ha előre szabad, lépj előre; különben fordulj balra.\nÚj érzékelő: `szabad_jobbra()` (és `szabad_balra()`). Több ágú elágazás: `if … elif … else`.',
      tipp: 'while not celnal():\n    if szabad_jobbra():\n        jobbra()\n        elore()\n    elif not fal_elol():\n        elore()\n    else:\n        balra()',
      minta: 'while not celnal():\n    if szabad_jobbra():\n        jobbra()\n        elore()\n    elif not fal_elol():\n        elore()\n    else:\n        balra()\n',
      start: '',
      maps: [['>..#...', '##.#.#.', '...#.#.', '.###.#.', '.....#C'], ['>.#....', '#...##.', '#.#....', '#.####.', '#....#C']], kell: ['while', 'if'], felt: true,
      egyetem: 'A „jobbkéz-szabály” (falkövetés) minden olyan labirintusban kivezet, ahol a falak összefüggők a külső fallal (egyszeresen összefüggő labirintus). Általános gráfban a mélységi bejárás (DFS) a megbízható módszer: O(V + E) idő.' },
    { id: 'robot-11', cim: 'Saját parancs', fogalom: 'Függvény',
      leiras: 'Három egyforma fülke, mindben egy kincs. Taníts a robotnak **új parancsot**! A `def` kulcsszóval saját függvényt írsz:\n`def kitero():` – alá, beljebb, a lépések. Utána a `kitero()` hívással bármikor lefuttatod.\nItt legfeljebb **16 sor** lehet, és használnod kell a `def`-et.',
      tipp: 'def kitero():\n    balra()\n    elore()\n    elore()\n    felvesz()\n    balra()\n    balra()\n    elore()\n    elore()\n    balra()\nAztán háromszor: 3 lépés előre és kitero(). A végén még egy lépés.',
      minta: 'def kitero():\n    balra()\n    elore()\n    elore()\n    felvesz()\n    balra()\n    balra()\n    elore()\n    elore()\n    balra()\n\nfor i in range(3):\n    for j in range(3):\n        elore()\n    kitero()\nelore()\n',
      start: 'def kitero():\n    balra()\n    # folytasd!\n\n',
      maps: [['###*##*##*#', '###.##.##.#', '>.........C']], maxSor: 16, kell: ['def'],
      egyetem: 'Az eljárás (procedurális absztrakció) nevet ad egy műveletsornak: a hívó csak azt tudja, MIT csinál, nem azt, HOGYAN. Ez a moduláris programozás alapja.' },
    { id: 'robot-12', cim: 'Csigaház', fogalom: 'Függvény',
      leiras: 'Járd végig a csigavonalat a célig! A szakaszok hossza: 6, 6, 6, 4, 4, 2, 2. Írj olyan függvényt, ami **bemenetet (paramétert)** kap: `def menj(n):` – és n-et lép előre.\nA `for h in [6, 6, 6, 4, 4, 2, 2]:` ciklus egy lista elemein megy végig.',
      tipp: 'def menj(n):\n    for i in range(n):\n        elore()\nAztán minden hosszra: menj(h), jobbra()',
      minta: 'def menj(n):\n    for i in range(n):\n        elore()\n\nfor h in [6, 6, 6, 4, 4, 2, 2]:\n    menj(h)\n    jobbra()\n',
      start: 'def menj(n):\n    # n-szer előre\n    pass\n\nmenj(6)\n',
      maps: [['>......', '######.', '.....#.', '.###.#.', '.#C..#.', '.#####.', '.......']], kell: ['def'] },
    { id: 'robot-13', cim: 'Kígyó', fogalom: 'Függvény',
      leiras: 'A szoba tele van kinccsel. Szedd fel mindet, soronként oda-vissza haladva (mint a kígyó)! Érdemes több kis függvényt írni: egy sor bejárását, és a sorváltást jobbra-, illetve balra-fordulással.',
      tipp: 'def sor(): 4-szer (előre, felvesz). def le_jobbra(): jobbra, elore, felvesz, jobbra. def le_balra(): ugyanez balra. Aztán: sor, le_jobbra, sor, le_balra, sor, le_jobbra, sor.',
      minta: 'def sor():\n    for i in range(4):\n        elore()\n        felvesz()\n\ndef le_jobbra():\n    jobbra()\n    elore()\n    felvesz()\n    jobbra()\n\ndef le_balra():\n    balra()\n    elore()\n    felvesz()\n    balra()\n\nsor()\nle_jobbra()\nsor()\nle_balra()\nsor()\nle_jobbra()\nsor()\n',
      start: '',
      maps: [['>****', '*****', '*****', '*****']], kell: ['def'] },
    { id: 'robot-14', cim: 'Nagytakarítás', fogalom: 'Mindent bele',
      leiras: 'Ismeretlen méretű szoba, ismeretlen helyeken kincsek – minden pályán más. Járd be az egész szobát kígyóvonalban, és szedj fel mindent! Kell hozzá függvény, while, if és egy változó, ami megjegyzi, merre fordulsz legközelebb. A `while True:` végtelen ciklusból a `break` lép ki.',
      tipp: 'def sor(): ha kincs van, felvesz; amíg nincs fal előtted: előre, és ha kincs van, felvesz.\nA főprogram: irany = 0, sor(), aztán while True: ha irany == 0, és jobbra nem szabad → break, különben jobbra-elore-jobbra; egyébként ugyanez balra. Végül irany = 1 - irany és sor().',
      minta: 'def sor():\n    if kincs_itt():\n        felvesz()\n    while not fal_elol():\n        elore()\n        if kincs_itt():\n            felvesz()\n\nirany = 0\nsor()\nwhile True:\n    if irany == 0:\n        if not szabad_jobbra():\n            break\n        jobbra()\n        elore()\n        jobbra()\n    else:\n        if not szabad_balra():\n            break\n        balra()\n        elore()\n        balra()\n    irany = 1 - irany\n    sor()\n',
      start: '',
      maps: [['>.*..', '*...*', '..*..'], ['>....*', '.*....', '....*.', '*.....'], ['>..*', '....', '.*..', '....', '*..*']], kell: ['def', 'while', 'if'], felt: true,
      egyetem: 'Ez a „busztrofédon” (ökörszántás-szerű) bejárás: minden mezőt pontosan egyszer érint, így w×h méretű szobára O(w·h) lépés – ennél gyorsabban nem lehet, hiszen minden mezőt meg kell nézni. Robotporszívók és mezőgazdasági gépek útvonaltervezésének alapmintája.' }
  ];

  /* ====================================================================
   * 11. Feladatok – Algoritmusok
   * ==================================================================== */
  var BIG = []; for (var bi_ = 0; bi_ < 2000; bi_++) BIG.push(bi_ * 2);
  var ALGO = [
    { id: 'osszeg', cim: 'Összegzés', tetel: 'Összegzés tétele', fn: 'osszeg', tiltott: ['sum'],
      leiras: 'Írj `osszeg(lista)` függvényt, amely visszaadja a lista elemeinek összegét! Üres lista összege 0. A beépített `sum()` most tilos – írd meg magad!',
      iskolai: 'Ötlet: egy „gyűjtő” változó (s) 0-ról indul, és a ciklus minden elemet hozzáad. A végén s-ben van az összeg.',
      tipp: 's = 0, aztán for x in lista: s = s + x, végül return s',
      minta: 'def osszeg(lista):\n    s = 0\n    for x in lista:\n        s = s + x\n    return s\n',
      start: 'def osszeg(lista):\n    # Ide írd a megoldást!\n    return 0\n\nprint(osszeg([3, 5, 2]))\n',
      tests: [[[[1, 2, 3]], 6], [[[]], 0], [[[5]], 5], [[[-2, 7, 10]], 15], [[[100, 200, 300, 400]], 1000]],
      bonyolultsag: 'Időbonyolultság: **O(n)** – minden elemet pontosan egyszer érintünk. Tárigény: O(1) (egyetlen gyűjtőváltozó). Ennél jobb nem lehet: minden elemet legalább egyszer el kell olvasni.' },
    { id: 'maximum', cim: 'Maximumkiválasztás', tetel: 'Maximumkiválasztás tétele', fn: 'maximum', tiltott: ['max', 'sorted', 'sort'],
      leiras: 'Írj `maximum(lista)` függvényt, amely visszaadja a (nem üres) lista legnagyobb elemét! A `max()` most tilos.',
      iskolai: 'Ötlet: az első elemet „eddigi legnagyobbnak” tekintjük, aztán végignézzük a többit: ha valamelyik nagyobb, az lesz az új legnagyobb. Vigyázz: ne 0-ról indulj, mert a lista csupa negatív számból is állhat!',
      tipp: 'legn = lista[0], aztán for x in lista: if x > legn: legn = x',
      minta: 'def maximum(lista):\n    legn = lista[0]\n    for x in lista:\n        if x > legn:\n            legn = x\n    return legn\n',
      start: 'def maximum(lista):\n    # Ide írd a megoldást!\n    return 0\n\nprint(maximum([3, 9, 2]))\n',
      tests: [[[[3, 9, 2]], 9], [[[-5, -2, -9]], -2], [[[7]], 7], [[[1, 2, 3, 4]], 4], [[[4, 3, 2, 1]], 4], [[[5, 5, 1]], 5]],
      bonyolultsag: 'Időbonyolultság: **O(n)**, pontosan n−1 összehasonlítás. Bizonyítható, hogy összehasonlítás-alapú módszerrel n−1-nél kevesebb nem elég (minden nem-maximumnak legalább egyszer „vesztenie” kell).' },
    { id: 'paros_db', cim: 'Megszámolás', tetel: 'Megszámolás tétele', fn: 'paros_db',
      leiras: 'Írj `paros_db(lista)` függvényt, amely megadja, hány **páros** szám van a listában! Páros az a szám, amelynek 2-vel osztva 0 a maradéka: `x % 2 == 0`.',
      iskolai: 'Ötlet: egy számláló (db) 0-ról indul, és minden páros elemnél eggyel nő. A `db += 1` ugyanaz, mint a `db = db + 1`.',
      tipp: 'db = 0, for x in lista: if x % 2 == 0: db += 1',
      minta: 'def paros_db(lista):\n    db = 0\n    for x in lista:\n        if x % 2 == 0:\n            db += 1\n    return db\n',
      start: 'def paros_db(lista):\n    # Ide írd a megoldást!\n    return 0\n\nprint(paros_db([1, 2, 3, 4]))\n',
      tests: [[[[1, 2, 3, 4]], 2], [[[]], 0], [[[1, 3, 5]], 0], [[[0, -2, 7]], 2], [[[2, 2, 2, 2, 2]], 5]],
      bonyolultsag: 'Időbonyolultság: **O(n)**. A megszámolás az összegzés speciális esete: minden elem 1-et vagy 0-t ad hozzá a feltételtől függően.' },
    { id: 'van_negativ', cim: 'Eldöntés', tetel: 'Eldöntés tétele', fn: 'van_negativ',
      leiras: 'Írj `van_negativ(lista)` függvényt, amely `True`-t ad vissza, ha van a listában negatív szám, különben `False`-t!',
      iskolai: 'Ötlet: amint találsz egy negatív számot, már tudod a választ – azonnal visszatérhetsz (return True). Ha a ciklus végigért és nem találtál, akkor False.',
      tipp: 'for x in lista: if x < 0: return True  – és a ciklus UTÁN (nem benne!): return False',
      minta: 'def van_negativ(lista):\n    for x in lista:\n        if x < 0:\n            return True\n    return False\n',
      start: 'def van_negativ(lista):\n    # Ide írd a megoldást!\n    return False\n\nprint(van_negativ([3, -1, 4]))\n',
      tests: [[[[3, -1, 4]], true], [[[1, 2, 3]], false], [[[]], false], [[[-5]], true], [[[0, 0, 0]], false], [[[4, 5, 6, -7]], true]],
      bonyolultsag: 'Legrosszabb eset: **O(n)** (nincs negatív elem, vagy az utolsó az). Legjobb eset: O(1) (rögtön az első elem negatív). A korai kilépés miatt átlagosan gyorsabb, mint egy teljes megszámolás.' },
    { id: 'kereses', cim: 'Lineáris keresés', tetel: 'Keresés tétele', fn: 'kereses', tiltott: ['index'],
      leiras: 'Írj `kereses(lista, x)` függvényt, amely visszaadja az x **első** előfordulásának indexét (sorszámát, 0-tól számolva), vagy -1-et, ha x nincs a listában! A `.index()` művelet most tilos.',
      iskolai: 'Ötlet: menj végig az indexeken (for i in range(len(lista))), és ha lista[i] == x, add vissza i-t. Ha végigértél, -1.',
      tipp: 'for i in range(len(lista)):\n    if lista[i] == x:\n        return i\nreturn -1',
      minta: 'def kereses(lista, x):\n    for i in range(len(lista)):\n        if lista[i] == x:\n            return i\n    return -1\n',
      start: 'def kereses(lista, x):\n    # Ide írd a megoldást!\n    return -1\n\nprint(kereses([4, 8, 15, 16], 15))\n',
      tests: [[[[4, 8, 15, 16], 15], 2], [[[4, 8, 15, 16], 4], 0], [[[4, 8, 15, 16], 99], -1], [[[], 1], -1], [[[7, 3, 7], 7], 0]],
      bonyolultsag: 'Időbonyolultság: **O(n)** legrosszabb esetben. Rendezetlen listában ennél jobb nem lehet – rendezett listában viszont a bináris keresés O(log n)!' },
    { id: 'fizzbuzz', cim: 'FizzBuzz', tetel: 'Elágazások sorrendje', fn: 'fizzbuzz',
      leiras: 'Írj `fizzbuzz(n)` függvényt! Ha n osztható 3-mal és 5-tel is, adja vissza: `"FizzBuzz"`; ha csak 3-mal: `"Fizz"`; ha csak 5-tel: `"Buzz"`; különben magát a számot **szövegként** (`str(n)`).',
      iskolai: 'A trükk a sorrend: először azt kell megnézni, hogy 15-tel (3-mal ÉS 5-tel) osztható-e, mert különben már a „Fizz” ágon kilépnél.',
      tipp: 'if n % 15 == 0: … elif n % 3 == 0: … elif n % 5 == 0: … else: return str(n)',
      minta: 'def fizzbuzz(n):\n    if n % 15 == 0:\n        return "FizzBuzz"\n    elif n % 3 == 0:\n        return "Fizz"\n    elif n % 5 == 0:\n        return "Buzz"\n    else:\n        return str(n)\n',
      start: 'def fizzbuzz(n):\n    # Ide írd a megoldást!\n    return str(n)\n\nfor i in range(1, 16):\n    print(fizzbuzz(i))\n',
      tests: [[[3], 'Fizz'], [[5], 'Buzz'], [[15], 'FizzBuzz'], [[7], '7'], [[30], 'FizzBuzz'], [[1], '1'], [[9], 'Fizz'], [[10], 'Buzz']],
      bonyolultsag: 'Egy hívás **O(1)** – állandó számú maradékos osztás. Klasszikus állásinterjú-feladat: nem a nehézsége, hanem az elágazások helyes sorrendje miatt.' },
    { id: 'prim', cim: 'Prímteszt', tetel: 'Eldöntés', fn: 'prim',
      leiras: 'Írj `prim(n)` függvényt, amely `True`-t ad, ha n prímszám! Prím az az 1-nél nagyobb egész, amelynek csak két osztója van: 1 és önmaga. (A 0 és az 1 nem prím.)',
      iskolai: 'Ötlet: próbáld végig az osztókat 2-től. Ha valamelyik osztja n-et (n % i == 0), nem prím. Elég addig próbálni, amíg i·i ≤ n – ha nagyobb osztó lenne, lenne kisebb párja is.',
      tipp: 'if n < 2: return False\ni = 2\nwhile i * i <= n:\n    if n % i == 0: return False\n    i += 1\nreturn True',
      minta: 'def prim(n):\n    if n < 2:\n        return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 1\n    return True\n',
      start: 'def prim(n):\n    # Ide írd a megoldást!\n    return False\n\nprint(prim(13))\n',
      tests: [[[1], false], [[2], true], [[9], false], [[13], true], [[97], true], [[100], false], [[0], false], [[7919], true]],
      bonyolultsag: 'Próbaosztással √n-ig: **O(√n)** osztás. (A bemenet hosszához – log n bithez – képest ez exponenciális!) Nagy számoknál valószínűségi tesztek (Miller–Rabin) kellenek; determinisztikusan az AKS-teszt polinomidejű.' },
    { id: 'buborek', cim: 'Buborékrendezés', tetel: 'Rendezés', fn: 'buborek', tiltott: ['sort', 'sorted'],
      leiras: 'Írj `buborek(lista)` függvényt, amely növekvő sorrendbe rendezi a listát (és vissza is adja)! Módszer: hasonlítsd össze a szomszédos elemeket, és ha rossz sorrendben vannak, cseréld meg őket. Ezt ismételd, amíg minden a helyére kerül. A `sort()` és a `sorted()` most tilos.',
      iskolai: 'Minden menetben a legnagyobb elem „felbuborékozik” a lista végére. Csere egy sorban: `a, b = b, a`.',
      tipp: 'Két egymásba ágyazott ciklus: for i in range(n - 1): for j in range(n - 1 - i): ha lista[j] > lista[j + 1], csere.',
      minta: 'def buborek(lista):\n    n = len(lista)\n    for i in range(n - 1):\n        for j in range(n - 1 - i):\n            if lista[j] > lista[j + 1]:\n                lista[j], lista[j + 1] = lista[j + 1], lista[j]\n    return lista\n',
      start: 'def buborek(lista):\n    # Ide írd a megoldást!\n    return lista\n\nprint(buborek([5, 1, 4, 2, 8]))\n',
      tests: [[[[5, 1, 4, 2, 8]], [1, 2, 4, 5, 8]], [[[]], []], [[[1]], [1]], [[[3, 2, 1]], [1, 2, 3]], [[[1, 2, 3]], [1, 2, 3]], [[[4, -1, 4, 0]], [-1, 0, 4, 4]]],
      bonyolultsag: 'Időbonyolultság: **O(n²)** összehasonlítás (kb. n²/2). Hatékony rendezések (összefésülő, kupac-, átlagosan a gyors-) **O(n log n)** idejűek – és összehasonlítás-alapú rendezés ennél aszimptotikusan gyorsabb nem lehet.' },
    { id: 'binaris', cim: 'Bináris keresés', tetel: 'Logaritmikus keresés', fn: 'binaris_kereses', tiltott: ['index'],
      leiras: 'Írj `binaris_kereses(lista, x)` függvényt **növekvően rendezett** listára: adja vissza x indexét, vagy -1-et, ha nincs benne!\nNézd meg a középső elemet: ha az x, kész; ha kisebb x-nél, a jobb felében keress tovább, különben a bal felében. A tesztek között van egy 2000 elemű lista is: ott **legfeljebb 300 lépés** lehet – lineáris kereséssel nem fér bele!',
      iskolai: 'Mint a „gondoltam egy számra 1 és 100 között” játék: mindig a felénél tippelsz, így minden lépésben a fele lehetőség kiesik. 1000 elemből ~10 lépés alatt megtalálod.',
      tipp: 'bal = 0, jobb = len(lista) - 1. while bal <= jobb: kozep = (bal + jobb) // 2 …',
      minta: 'def binaris_kereses(lista, x):\n    bal = 0\n    jobb = len(lista) - 1\n    while bal <= jobb:\n        kozep = (bal + jobb) // 2\n        if lista[kozep] == x:\n            return kozep\n        elif lista[kozep] < x:\n            bal = kozep + 1\n        else:\n            jobb = kozep - 1\n    return -1\n',
      start: 'def binaris_kereses(lista, x):\n    # Ide írd a megoldást!\n    return -1\n\nprint(binaris_kereses([1, 3, 5, 7, 9, 11], 7))\n',
      tests: [[[[1, 3, 5, 7, 9, 11], 7], 3], [[[1, 3, 5, 7, 9, 11], 1], 0], [[[1, 3, 5, 7, 9, 11], 11], 5], [[[1, 3, 5, 7, 9, 11], 4], -1], [[[], 4], -1], [[BIG, 3998], 1999, 300], [[BIG, 1234], 617, 300], [[BIG, 1235], -1, 300]],
      lassu: 'Felezd a keresési tartományt minden lépésben!',
      bonyolultsag: 'Időbonyolultság: **O(log n)** – minden lépés felezi a tartományt, így 2000 elemhez ~11, egymillióhoz ~20 lépés elég. Feltétel: a lista rendezett (és O(1) idejű indexelés). A „kozep = (bal + jobb) // 2” fix méretű egészekkel túlcsordulhat – ezért írják sok nyelven bal + (jobb − bal) // 2 alakban.' },
    { id: 'faktorialis', cim: 'Faktoriális rekurzióval', tetel: 'Rekurzió', fn: 'faktorialis', kell: ['rekurzio'],
      leiras: 'Írj `faktorialis(n)` függvényt **rekurzívan** (a függvény hívja önmagát)! n! = 1·2·3·…·n, és 0! = 1.\nRekurzív felírás: n! = n · (n−1)!, az alapeset: ha n ≤ 1, az eredmény 1.',
      iskolai: 'A rekurzió olyan, mint az egymásba rakott matrjoska-babák: a nagy feladatot egy ugyanolyan, de kisebb feladatra vezeted vissza – amíg el nem jutsz a legkisebbig (alapeset), aminek tudod a válaszát. Lépésenként futtatva a változók táblázatában látod a hívási vermet!',
      tipp: 'if n <= 1: return 1\nreturn n * faktorialis(n - 1)',
      minta: 'def faktorialis(n):\n    if n <= 1:\n        return 1\n    return n * faktorialis(n - 1)\n',
      start: 'def faktorialis(n):\n    # Ide írd a megoldást!\n    return 1\n\nprint(faktorialis(5))\n',
      tests: [[[0], 1], [[1], 1], [[5], 120], [[10], 3628800], [[3], 6]],
      bonyolultsag: 'Időbonyolultság: **O(n)** szorzás, de a rekurzió miatt a tárigény is **O(n)** (n darab hívás vár egymásra a veremben). Iteratív változata O(1) tárral beéri. (Nagy n-re az eredmény jegyeinek száma is nő, így a szorzások ára sem állandó.)' },
    { id: 'fibonacci', cim: 'Fibonacci-számok', tetel: 'Rekurzió vagy ciklus?', fn: 'fibonacci', maxSteps: 100000,
      leiras: 'Írj `fibonacci(n)` függvényt, amely az n-edik Fibonacci-számot adja: F(0) = 0, F(1) = 1, és minden további az előző kettő összege (0, 1, 1, 2, 3, 5, 8, 13…).\nVigyázz: a teszt F(30)-at is kéri – a „naiv” rekurzió (fibonacci(n-1) + fibonacci(n-2)) ehhez több mint egymillió hívást végezne, és kifut a lépéslimitből!',
      iskolai: 'Ciklussal gyors: két változóban tartsd az utolsó két számot, és lépésenként told el őket: a, b = b, a + b.',
      tipp: 'a, b = 0, 1\nfor i in range(n):\n    a, b = b, a + b\nreturn a',
      minta: 'def fibonacci(n):\n    a, b = 0, 1\n    for i in range(n):\n        a, b = b, a + b\n    return a\n',
      start: 'def fibonacci(n):\n    # Ide írd a megoldást!\n    return 0\n\nprint(fibonacci(10))\n',
      tests: [[[0], 0], [[1], 1], [[2], 1], [[10], 55], [[20], 6765], [[30], 832040]],
      lassu: 'A naiv rekurzió ugyanazt sokszor kiszámolja újra – próbáld ciklussal!',
      bonyolultsag: 'A naiv rekurzió **O(φⁿ) ≈ O(1,618ⁿ)** – exponenciális, mert ugyanazokat a részeredményeket újra és újra kiszámolja. Ciklussal (vagy memoizációval, azaz dinamikus programozással) **O(n)**; mátrixhatványozással O(log n) szorzás.' },
    { id: 'palindrom', cim: 'Palindróm', tetel: 'Két mutató', fn: 'palindrom',
      leiras: 'Írj `palindrom(szoveg)` függvényt, amely `True`-t ad, ha a szöveg visszafelé olvasva ugyanaz (pl. „kerek”, „abba”)! Az üres szöveg és az egybetűs szöveg is palindróm.',
      iskolai: 'Ötlet: két „ujj” – az egyik az elején (i = 0), a másik a végén (j = len - 1). Ha a két betű különbözik, nem palindróm; különben az ujjak közelednek egymáshoz.',
      tipp: 'i = 0, j = len(szoveg) - 1, while i < j: ha szoveg[i] != szoveg[j]: return False, aztán i += 1, j -= 1',
      minta: 'def palindrom(szoveg):\n    i = 0\n    j = len(szoveg) - 1\n    while i < j:\n        if szoveg[i] != szoveg[j]:\n            return False\n        i += 1\n        j -= 1\n    return True\n',
      start: 'def palindrom(szoveg):\n    # Ide írd a megoldást!\n    return False\n\nprint(palindrom("kerek"))\n',
      tests: [[['kerek'], true], [['abba'], true], [['alma'], false], [[''], true], [['a'], true], [['radar'], true], [['ab'], false], [['abca'], false]],
      bonyolultsag: 'Időbonyolultság: **O(n)**, legfeljebb n/2 összehasonlítás, O(1) többlettár. (A megfordított másolattal való összevetés is O(n), de O(n) többlettárat igényel.)' },
    { id: 'lnko', cim: 'Legnagyobb közös osztó', tetel: 'Euklideszi algoritmus', fn: 'lnko',
      leiras: 'Írj `lnko(a, b)` függvényt, amely két nemnegatív egész legnagyobb közös osztóját adja! Az **euklideszi algoritmus**: amíg b nem 0, cseréld (a, b)-t (b, a % b)-re. A végén a az eredmény.',
      iskolai: 'Az ötlet: két szám közös osztói ugyanazok, mint a kisebbiké és a maradéké. A maradék egyre kisebb lesz, és amikor 0, megvan a válasz. Ez az egyik legrégebbi ismert algoritmus – Eukleidész már leírta az Elemekben.',
      tipp: 'while b != 0:\n    a, b = b, a % b\nreturn a',
      minta: 'def lnko(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n',
      start: 'def lnko(a, b):\n    # Ide írd a megoldást!\n    return 1\n\nprint(lnko(12, 18))\n',
      tests: [[[12, 18], 6], [[17, 5], 1], [[100, 75], 25], [[7, 7], 7], [[0, 5], 5], [[5, 0], 5], [[1071, 462], 21]],
      bonyolultsag: 'Időbonyolultság: **O(log min(a, b))** maradékos osztás (Lamé-tétel: a lépések száma legfeljebb a kisebbik szám tízes számrendszerbeli jegyeinek ötszöröse; a legrosszabb eset két szomszédos Fibonacci-szám).' },
    { id: 'megfordit', cim: 'Lista megfordítása', tetel: 'Másolás', fn: 'megfordit', tiltott: ['reverse'],
      leiras: 'Írj `megfordit(lista)` függvényt, amely **új** listát ad vissza fordított sorrendben! A `.reverse()` most tilos.',
      iskolai: 'Ötlet: készíts üres listát (uj = []), és a régi lista elemeit hátulról előre haladva fűzd hozzá: uj.append(…).',
      tipp: 'uj = []\ni = len(lista) - 1\nwhile i >= 0:\n    uj.append(lista[i])\n    i -= 1\nreturn uj',
      minta: 'def megfordit(lista):\n    uj = []\n    i = len(lista) - 1\n    while i >= 0:\n        uj.append(lista[i])\n        i -= 1\n    return uj\n',
      start: 'def megfordit(lista):\n    # Ide írd a megoldást!\n    return lista\n\nprint(megfordit([1, 2, 3]))\n',
      tests: [[[[1, 2, 3]], [3, 2, 1]], [[[]], []], [[[7]], [7]], [[['a', 'b']], ['b', 'a']], [[[1, 2, 2, 3]], [3, 2, 2, 1]]],
      bonyolultsag: 'Időbonyolultság: **O(n)**; az append amortizáltan O(1). Helyben (két mutatóval cserélgetve) O(1) többlettárral is megoldható.' },
    { id: 'szamjegy', cim: 'Számjegyek összege', tetel: 'Maradékos osztás', fn: 'szamjegyosszeg', tiltott: ['str'],
      leiras: 'Írj `szamjegyosszeg(n)` függvényt, amely egy nemnegatív egész szám jegyeinek összegét adja (pl. 123 → 6)! Szöveggé alakítani (`str()`) most tilos: használd a `% 10` (utolsó jegy) és a `// 10` (utolsó jegy levágása) műveletet!',
      iskolai: '123 % 10 = 3 (az utolsó jegy), 123 // 10 = 12 (levágtuk). Ismételd, amíg a szám el nem fogy (0 nem lesz).',
      tipp: 's = 0\nwhile n > 0:\n    s += n % 10\n    n = n // 10\nreturn s',
      minta: 'def szamjegyosszeg(n):\n    s = 0\n    while n > 0:\n        s += n % 10\n        n = n // 10\n    return s\n',
      start: 'def szamjegyosszeg(n):\n    # Ide írd a megoldást!\n    return 0\n\nprint(szamjegyosszeg(123))\n',
      tests: [[[123], 6], [[0], 0], [[9999], 36], [[1001], 2], [[5], 5], [[908070], 24]],
      bonyolultsag: 'Időbonyolultság: **O(log n)** – pontosan annyi lépés, ahány jegyű a szám (tízes alapú logaritmus). Ugyanez a minta adja a számrendszer-átváltás algoritmusát is.' }
  ];

  var ALL = ROBOT.map(function (t) { t.kind = 'robot'; return t; }).concat(ALGO.map(function (t) { t.kind = 'algo'; return t; }));
  function byId(id) { return ALL.filter(function (t) { return t.id === id; })[0]; }

  S.kodolas = { tokenize: tokenize, parse: parse, compile: compile, VM: VM, World: World, KErr: KErr, repr: repr, uses: uses,
    robotCheck: robotCheck, algoCheck: algoCheck, codeLines: codeLines, ROBOT: ROBOT, ALGO: ALGO, byId: byId };

  /* ====================================================================
   * 12. Felület
   * ==================================================================== */
  if (typeof document === 'undefined') return;

  var SKEY = 'kodolas';
  function load() { var s = S.store.get(SKEY, null) || {}; s.solved = s.solved || {}; s.code = s.code || {}; s.speed = s.speed || 6; return s; }
  function save(fn) { var s = load(); fn(s); S.store.set(SKEY, s); }
  var uni = function () { return S.level === 'egyetem'; };

  /* ---------- szintaxiskiemelés ---------- */
  var ROBOTF = { elore: 1, balra: 1, jobbra: 1, felvesz: 1, fal_elol: 1, szabad_balra: 1, szabad_jobbra: 1, kincs_itt: 1, celnal: 1 };
  var BUILTF = { print: 1, len: 1, range: 1, abs: 1, min: 1, max: 1, sum: 1, int: 1, float: 1, str: 1, bool: 1, list: 1, round: 1, sorted: 1 };
  function hlLine(s) {
    var out = '', re = /(#.*$)|("(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_\u00C0-\u024F][A-Za-z0-9_\u00C0-\u024F]*)|([\s\S])/g, m, prevDef = false;
    while ((m = re.exec(s))) {
      if (m[1]) out += '<span class="kd-c">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="kd-s">' + esc(m[2]) + '</span>';
      else if (m[3]) out += '<span class="kd-n">' + esc(m[3]) + '</span>';
      else if (m[4]) {
        var w = m[4], cls = KWS[w] ? (w === 'True' || w === 'False' || w === 'None' ? 'kd-n' : 'kd-k') : prevDef ? 'kd-f' : ROBOTF[w] ? 'kd-r' : BUILTF[w] ? 'kd-b' : '';
        out += cls ? '<span class="' + cls + '">' + esc(w) + '</span>' : esc(w);
        prevDef = w === 'def'; continue;
      } else out += esc(m[5]);
      if (m[5] && !/\s/.test(m[5])) prevDef = false;
    }
    return out;
  }
  function hlBlock(src) { return String(src).replace(/\n$/, '').split('\n').map(hlLine).join('\n'); }

  /* ---------- kódszerkesztő ---------- */
  function Editor(host, code, onChange) {
    var self = this;
    host.innerHTML = '<div class="kd-ed"><div class="kd-gut" aria-hidden="true"></div><div class="kd-wrap"><pre class="kd-hl" aria-hidden="true"></pre>' +
      '<textarea class="kd-ta" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Programkód (Tab = 4 szóköz; Esc, majd Tab: kilépés a szerkesztőből)"></textarea></div></div>';
    this.ta = host.querySelector('.kd-ta'); this.hl = host.querySelector('.kd-hl'); this.gut = host.querySelector('.kd-gut');
    this.ta.value = code; this.cur = 0; this.err = 0; this.escMode = false;
    this.ta.addEventListener('input', function () { self.paint(); onChange(self.ta.value); });
    this.ta.addEventListener('scroll', function () { self.sync(); });
    this.ta.addEventListener('keydown', function (e) { self.key(e); });
    this.paint();
  }
  var E = Editor.prototype;
  E.sync = function () { this.hl.scrollTop = this.ta.scrollTop; this.hl.scrollLeft = this.ta.scrollLeft; this.gut.scrollTop = this.ta.scrollTop; };
  E.paint = function () {
    var lines = this.ta.value.split('\n'), cur = this.cur, err = this.err;
    this.hl.innerHTML = lines.map(function (l, i) {
      var n = i + 1;
      return '<span class="kd-l' + (n === cur ? ' cur' : '') + (n === err ? ' err' : '') + '">' + (hlLine(l) || ' ') + '</span>';
    }).join('') + '<span class="kd-l"> </span>';
    this.gut.innerHTML = lines.map(function (l, i) { var n = i + 1; return '<div class="' + (n === cur ? 'cur' : '') + (n === err ? ' err' : '') + '">' + (n === cur ? '▶' : n) + '</div>'; }).join('') + '<div>&nbsp;</div>';
    this.sync();
  };
  E.mark = function (cur, err) {
    this.cur = cur || 0; this.err = err || 0; this.paint();
    var ln = this.cur || this.err;
    if (ln) { /* görgessük láthatóvá */
      var lh = parseFloat(getComputedStyle(this.ta).lineHeight) || 21, top = (ln - 1) * lh, ta = this.ta;
      if (top < ta.scrollTop || top > ta.scrollTop + ta.clientHeight - lh * 2) { ta.scrollTop = Math.max(0, top - ta.clientHeight / 3); this.sync(); }
    }
  };
  E.insert = function (text) {
    var ta = this.ta; ta.focus();
    var ok = false;
    try { ok = document.execCommand('insertText', false, text); } catch (e) { ok = false; }
    if (!ok) {
      var s = ta.selectionStart, en = ta.selectionEnd;
      ta.value = ta.value.slice(0, s) + text + ta.value.slice(en);
      ta.selectionStart = ta.selectionEnd = s + text.length;
      ta.dispatchEvent(new Event('input'));
    }
  };
  E.lineStart = function (pos) { return this.ta.value.lastIndexOf('\n', pos - 1) + 1; };
  E.dedent = function () {
    var ta = this.ta, v = ta.value, s = ta.selectionStart, en = ta.selectionEnd, a = this.lineStart(s);
    var block = v.slice(a, en), lines = block.split('\n'), removedFirst = 0, removed = 0;
    var nb = lines.map(function (l, i) { var m = /^ {1,4}/.exec(l); var k = m ? m[0].length : 0; if (i === 0) removedFirst = k; removed += k; return l.slice(k); }).join('\n');
    ta.setSelectionRange(a, en); this.insert(nb);
    ta.setSelectionRange(Math.max(a, s - removedFirst), Math.max(a, en - removed));
  };
  E.indentSel = function () {
    var ta = this.ta, v = ta.value, s = ta.selectionStart, en = ta.selectionEnd, a = this.lineStart(s);
    var lines = v.slice(a, en).split('\n'), nb = lines.map(function (l) { return '    ' + l; }).join('\n');
    ta.setSelectionRange(a, en); this.insert(nb);
    ta.setSelectionRange(s + 4, en + 4 * lines.length);
  };
  E.key = function (e) {
    var ta = this.ta;
    if (e.key === 'Escape') { this.escMode = true; return; }
    if (e.key === 'Tab') {
      if (this.escMode) { this.escMode = false; return; }
      e.preventDefault();
      if (e.shiftKey) this.dedent();
      else if (ta.value.slice(ta.selectionStart, ta.selectionEnd).indexOf('\n') >= 0) this.indentSel();
      else this.insert('    ');
      return;
    }
    this.escMode = false;
    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      var s = ta.selectionStart, a = this.lineStart(s), before = ta.value.slice(a, s), ind = /^ */.exec(before)[0];
      if (/:\s*(#.*)?$/.test(before)) ind += '    ';
      e.preventDefault(); this.insert('\n' + ind);
    }
  };

  /* ---------- robotpálya SVG ---------- */
  var CS = 44;
  function boardSvg(w) {
    var o = '<svg class="kd-board" viewBox="0 0 ' + (w.w * CS) + ' ' + (w.h * CS) + '" role="img" aria-label="Robotpálya: ' + w.w + '×' + w.h + ' mező">';
    for (var y = 0; y < w.h; y++) for (var x = 0; x < w.w; x++) {
      var k = x + ',' + y, X = x * CS, Y = y * CS;
      if (w.walls[k]) { o += '<rect class="kd-wall" x="' + X + '" y="' + Y + '" width="' + CS + '" height="' + CS + '"/>'; continue; }
      o += '<rect class="kd-floor' + ((x + y) % 2 ? ' alt' : '') + '" x="' + X + '" y="' + Y + '" width="' + CS + '" height="' + CS + '"/>';
      if (w.goal && w.goal[0] === x && w.goal[1] === y) o += '<g class="kd-goal"><rect x="' + (X + 4) + '" y="' + (Y + 4) + '" width="' + (CS - 8) + '" height="' + (CS - 8) + '" rx="6"/><text x="' + (X + CS / 2) + '" y="' + (Y + CS / 2 + 7) + '" text-anchor="middle" font-size="20">🏁</text></g>';
      if (w.gems[k]) o += '<polygon class="kd-gem" data-k="' + k + '" points="' + (X + 22) + ',' + (Y + 9) + ' ' + (X + 33) + ',' + (Y + 20) + ' ' + (X + 22) + ',' + (Y + 35) + ' ' + (X + 11) + ',' + (Y + 20) + '"/>';
    }
    o += '<g class="kd-bot"><g class="kd-bot-r"><rect width="' + CS + '" height="' + CS + '" fill="transparent"/>' +
      '<rect class="kd-bot-body" x="9" y="9" width="24" height="26" rx="7"/><rect class="kd-bot-eye" x="24" y="14" width="6" height="6" rx="2"/><rect class="kd-bot-eye" x="24" y="24" width="6" height="6" rx="2"/>' +
      '<polygon class="kd-bot-nose" points="34,17 40,22 34,27"/></g></g></svg>';
    return o;
  }
  function placeBot(host, w, instant) {
    var g = host.querySelector('.kd-bot'), r = host.querySelector('.kd-bot-r');
    if (!g) return;
    if (instant) { g.style.transition = 'none'; r.style.transition = 'none'; }
    g.style.transform = 'translate(' + (w.x * CS) + 'px,' + (w.y * CS) + 'px)';
    r.style.transform = 'rotate(' + w.angle + 'deg)';
    if (instant) { void g.getBoundingClientRect(); g.style.transition = ''; r.style.transition = ''; }
    Array.prototype.forEach.call(host.querySelectorAll('.kd-gem'), function (p) { p.classList.toggle('taken', !w.gems[p.getAttribute('data-k')]); });
  }

  /* ---------- változók táblázata ---------- */
  function varsHtml(vm, prev) {
    if (!vm) return '<p class="muted kd-empty">Futtatás vagy lépésenkénti végrehajtás közben itt látod a változók értékét.</p>';
    var sn = vm.snapshot(), now = {}, o = '';
    function rows(list, pre) {
      return list.map(function (kv) {
        var r = reprShort(kv[1], 70), key = pre + kv[0]; now[key] = r;
        return '<tr class="' + (prev && prev[key] !== r ? 'chg' : '') + '"><td><code>' + esc(kv[0]) + '</code></td><td><code>' + esc(r) + '</code></td><td class="muted">' + esc(tn(kv[1])) + '</td></tr>';
      }).join('');
    }
    if (sn.callStack.length) o += '<p class="kd-stack">📚 Hívási verem: <code>főprogram</code>' + sn.callStack.map(function (c) { return ' → <code>' + esc(c) + '</code>'; }).join('') + '</p>';
    if (sn.locals) o += '<table class="kd-vt"><caption>🔹 ' + esc(sn.locals.name) + '() helyi változói</caption><tbody>' + (rows(sn.locals.vars, 'L:') || '<tr><td colspan="3" class="muted">(még nincs)</td></tr>') + '</tbody></table>';
    o += '<table class="kd-vt">' + (sn.locals ? '<caption>🌐 Főprogram (globális) változói</caption>' : '') + '<tbody>' + (rows(sn.globals, 'G:') || '<tr><td colspan="3" class="muted">(még nincs változó)</td></tr>') + '</tbody></table>';
    if (sn.fns.length) o += '<p class="muted kd-fns">Saját függvények: ' + sn.fns.map(function (f) { return '<code>' + esc(f) + '</code>'; }).join(', ') + '</p>';
    o += '<p class="muted kd-steps">Végrehajtott lépések: ' + vm.steps + '</p>';
    return { html: o, snap: now };
  }

  var CHEAT = [
    ['x = 5', 'értékadás: az x változó értéke 5 lesz'],
    ['x += 1', 'x értékét eggyel növeli (x = x + 1)'],
    ['print("Szia", x)', 'kiírás a kimenetre'],
    ['if x > 3:\n    …\nelif x == 3:\n    …\nelse:\n    …', 'elágazás – a blokkot 4 szóközzel beljebb kezdjük'],
    ['while x < 10:\n    …', 'ismétlés, amíg a feltétel igaz'],
    ['for i in range(5):\n    …', 'ismétlés 5-ször (i = 0, 1, 2, 3, 4)'],
    ['for x in lista:\n    …', 'végigmegy a lista elemein'],
    ['def f(a, b):\n    return a + b', 'saját függvény bemenetekkel és visszatérési értékkel'],
    ['lista = [3, 1, 2]\nlista[0]  lista.append(4)  len(lista)', 'lista, indexelés 0-tól, bővítés, hossz'],
    ['==  !=  <  >  <=  >=  and  or  not', 'összehasonlítás és logikai műveletek'],
    ['+  -  *  /  //  %  **', 'műveletek: // egészosztás, % maradék, ** hatvány']
  ];
  function cheatHtml() {
    return '<details class="kd-cheat card"><summary>📖 A nyelv röviden (puska)</summary><div class="kd-cheat-g">' + CHEAT.map(function (c) {
      return '<div><pre class="kd-pre">' + hlBlock(c[0]) + '</pre><p class="muted">' + esc(c[1]) + '</p></div>'; }).join('') +
      '</div><p class="muted">Robotparancsok: <code>elore()</code> <code>balra()</code> <code>jobbra()</code> <code>felvesz()</code> · érzékelők (igaz/hamis): <code>fal_elol()</code> <code>szabad_balra()</code> <code>szabad_jobbra()</code> <code>kincs_itt()</code> <code>celnal()</code>. Beépített függvények: ' +
      Object.keys(BUILTF).map(function (b) { return '<code>' + b + '()</code>'; }).join(' ') + '.</p></details>';
  }

  /* ---------- központ ---------- */
  function hub(main) {
    var st = load(), nR = ROBOT.filter(function (t) { return st.solved[t.id]; }).length, nA = ALGO.filter(function (t) { return st.solved[t.id]; }).length;
    function cards(list) {
      return '<div class="kd-grid">' + list.map(function (t, i) {
        var ok = st.solved[t.id];
        return '<a class="card kd-card' + (ok ? ' ok' : '') + '" href="#/kodolas/' + t.id + '"><span class="kd-num">' + (ok ? '✓' : i + 1) + '</span><b>' + esc(t.cim) + '</b><small>' + esc(t.fogalom || t.tetel) + '</small></a>';
      }).join('') + '</div>';
    }
    function bar(n, all) { return '<div class="kd-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + all + '" aria-valuenow="' + n + '"><i style="width:' + Math.round(100 * n / all) + '%"></i></div><p class="muted">' + n + ' / ' + all + ' megoldva</p>'; }
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Programozás játszva</span></nav>' +
      '<h1>🤖 Programozás játszva</h1>' +
      '<p class="lead">' + (uni()
        ? 'Python-szerű tanulónyelv saját értelmezővel: tokenizálás → elemzés (szintaxisfa) → fordítás veremgépi utasításokra → lépésenkénti végrehajtás. Robotpályák a vezérlési szerkezetekhez, klasszikus algoritmusok bonyolultsági megjegyzésekkel.'
        : 'Írj programot, és nézd, ahogy a gép lépésről lépésre végrehajtja! Előbb egy robotot irányítasz a rácson, aztán igazi algoritmusokat írsz – ugyanazzal a nyelvvel, amit a Python használ.') + '</p>' +
      '<div class="note"><b>Miért Python-szerű a nyelv?</b> ' + (uni()
        ? 'A Python az informatikaoktatás és az érettségi egyik leggyakoribb nyelve, a szintaxisa kevés „zajjal” (pontosvessző, kapcsos zárójel) jár, a behúzás pedig rákényszerít az áttekinthető szerkezetre. A részhalmaz: egész/tört számok, szöveg, lista, if/elif/else, while, for…in range, def/return, rekurzió, break/continue. Eltérés: a / eredményét egész számként írja ki, ha az (pl. 6/2 → 3); a tuple helyett lista van.'
        : 'Mert a Python az egyik legnépszerűbb programozási nyelv, és amit itt megtanulsz, az „igazi” Pythonban is működik. A parancsok angol szavak (if = ha, while = amíg, for = minden…), a robot parancsai viszont magyarok.') + '</div>' +
      '<div class="kd-hub"><section class="card kd-sec"><h2>🤖 Robot a rácson</h2><p class="muted">Szekvencia → ciklus → feltétel → függvény. ' + ROBOT.length + ' pálya, egyre nehezebb.</p>' + bar(nR, ROBOT.length) + cards(ROBOT) + '</section>' +
      '<section class="card kd-sec"><h2>🧠 Algoritmusok</h2><p class="muted">Klasszikus programozási tételek és feladatok, automatikus ellenőrzéssel. ' + ALGO.length + ' feladat.</p>' + bar(nA, ALGO.length) + cards(ALGO) + '</section></div>' +
      '<p class="kd-sandbox"><a class="btn" href="#/kodolas/homokozo">🧪 Homokozó – szabad programozás</a></p>' + cheatHtml();
    return true;
  }

  /* ---------- feladat oldal ---------- */
  var SPEEDS = [900, 600, 400, 260, 160, 90, 45, 15, 4, 0];
  function taskPage(main, task) {
    var isRobot = task && task.kind === 'robot', sandbox = !task, id = task ? task.id : 'homokozo';
    var st = load(), list = isRobot ? ROBOT : ALGO, idx = task ? list.indexOf(task) : -1;
    var code = st.code[id] != null ? st.code[id] : (task ? task.start : '# Írj ide bármit, és futtasd!\nnevek = ["Anna", "Bence", "Csilla"]\nfor nev in nevek:\n    print("Szia, " + nev + "!")\n');
    var variant = 0, world = null, vm = null, prog = null, timer = null, running = false, prevSnap = null, saveT = null;

    var title = sandbox ? 'Homokozó' : task.cim;
    var keys = ['⇥', '⇤', '(', ')', ':', '=', '==', ',', '[', ']', '"', '+', '-', '<', '>', '#'];
    var words = isRobot ? ['elore()', 'balra()', 'jobbra()', 'felvesz()'].concat(task.felt || idx >= 6 ? ['fal_elol()', 'kincs_itt()', 'szabad_jobbra()', 'szabad_balra()', 'celnal()'] : []).concat(['for i in range():', 'while ', 'if ', 'else:', 'not ', 'def '])
      : ['print()', 'for x in ', 'range()', 'while ', 'if ', 'elif ', 'else:', 'return ', 'len()', 'def ', 'and ', 'or ', 'not '];

    main.innerHTML = '<div class="kd-page"><nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/kodolas">Programozás játszva</a><span>›</span><span>' + esc(title) + '</span></nav>' +
      '<h1>' + (sandbox ? '🧪 Homokozó' : (isRobot ? '🤖 ' : '🧠 ') + esc(task.cim)) + '</h1>' +
      (task ? '<p class="kd-chips"><span class="chip">' + (isRobot ? 'Robot · ' + (idx + 1) + '. pálya' : 'Algoritmus · ' + (idx + 1) + '. feladat') + '</span><span class="chip">' + esc(task.fogalom || task.tetel) + '</span>' +
        (st.solved[id] ? '<span class="chip kd-okchip">✓ Megoldva</span>' : '') + '</p>' : '<p class="lead">Szabad programozás: írj, futtass, kísérletezz! A kódod automatikusan mentődik.</p>') +
      '<div class="kd-task' + (isRobot ? ' robot' : '') + '">' +
      '<div class="kd-left">' +
      (task ? '<div class="card kd-desc">' + S.md(task.leiras) +
        (task.iskolai && !uni() ? '<div class="note">' + S.md('💡 ' + task.iskolai) + '</div>' : '') +
        (uni() && (task.bonyolultsag || task.egyetem) ? '<div class="note kd-uni">' + S.md('🎓 ' + (task.bonyolultsag || task.egyetem)) + '</div>' : '') +
        (isRobot && task.maps.length > 1 ? '<p class="muted">Ez a feladat <b>' + task.maps.length + ' különböző pályán</b> is működjön! Az ellenőrzés mindet lefuttatja.</p>' : '') +
        '<div class="kd-reveal"><button type="button" class="btn sm" data-rv="tipp">💡 Tipp</button><button type="button" class="btn sm" data-rv="minta">👀 Mintamegoldás</button></div>' +
        '<div class="kd-rv" id="kd-tipp" hidden><pre class="kd-pre">' + hlBlock(task.tipp) + '</pre></div>' +
        '<div class="kd-rv" id="kd-minta" hidden><p class="muted">Egy lehetséges megoldás (nem az egyetlen!):</p><pre class="kd-pre">' + hlBlock(task.minta) + '</pre><button type="button" class="btn sm" id="kd-usemin">⤵ Betöltés a szerkesztőbe</button></div>' +
        '</div>' : '') +
      (isRobot ? '<div class="card kd-stage"><div class="kd-vars-sel" id="kd-vsel"></div><div id="kd-board"></div><div id="kd-rmsg" class="kd-rmsg" aria-live="polite"></div></div>' : '') +
      '</div>' +
      '<div class="kd-right">' +
      '<div class="card kd-edcard"><div id="kd-ed"></div><div class="kd-keys" role="toolbar" aria-label="Gyorsgombok">' +
      keys.map(function (k) { return '<button type="button" class="kd-key" data-ins="' + esc(k) + '" title="' + (k === '⇥' ? 'Behúzás (4 szóköz)' : k === '⇤' ? 'Behúzás csökkentése' : esc(k)) + '">' + esc(k) + '</button>'; }).join('') +
      words.map(function (k) { return '<button type="button" class="kd-key w" data-ins="' + esc(k) + '">' + esc(k.trim()) + '</button>'; }).join('') + '</div>' +
      '<div class="kd-ctrl"><button type="button" class="btn primary" id="kd-run">▶ Futtatás</button><button type="button" class="btn" id="kd-step">⏭ Lépés</button><button type="button" class="btn" id="kd-stop">⏹ Újra</button>' +
      (task ? '<button type="button" class="btn" id="kd-check">✔ Ellenőrzés</button>' : '') +
      '<label class="kd-speed"><span>🐢</span><input type="range" min="1" max="10" id="kd-speed" value="' + st.speed + '" aria-label="Sebesség"><span>🐇</span></label></div>' +
      '<div id="kd-msg" class="kd-msg" aria-live="polite"></div></div>' +
      '<div class="kd-panels"><div class="card kd-panel"><h3>🗂 Változók</h3><div id="kd-vars"></div></div><div class="card kd-panel"><h3>🖨 Kimenet</h3><pre id="kd-out" class="kd-out"></pre></div></div>' +
      '<div id="kd-res"></div>' +
      '</div></div>' +
      (task ? '<p class="kd-nav">' + (idx > 0 ? '<a class="btn" href="#/kodolas/' + list[idx - 1].id + '">← ' + esc(list[idx - 1].cim) + '</a>' : '<span></span>') +
        '<a class="btn" href="#/kodolas">Összes feladat</a>' + (idx < list.length - 1 ? '<a class="btn" href="#/kodolas/' + list[idx + 1].id + '">' + esc(list[idx + 1].cim) + ' →</a>' : '<span></span>') + '</p>' : '') +
      cheatHtml() + '</div>';

    var root = main.querySelector('.kd-page');
    var $ = function (s) { return root.querySelector(s); };
    var ed = new Editor($('#kd-ed'), code, function (v) {
      if (vm && !running) reset(true);
      clearTimeout(saveT); saveT = setTimeout(function () { save(function (s) { s.code[id] = v; }); }, 400);
    });

    function msg(html, cls) { $('#kd-msg').innerHTML = html ? '<div class="kd-m ' + (cls || '') + '">' + html + '</div>' : ''; }
    function showErr(e) {
      msg('⚠️ <b>' + (e.line ? e.line + '. sor:' : 'Hiba:') + '</b> ' + esc(e.msg), 'bad');
      ed.mark(0, e.line);
    }
    function renderVars() {
      var r = varsHtml(vm, prevSnap);
      if (typeof r === 'string') { $('#kd-vars').innerHTML = r; prevSnap = null; return; }
      $('#kd-vars').innerHTML = r.html; prevSnap = r.snap;
    }
    function renderOut() { var o = $('#kd-out'); o.textContent = vm ? vm.out : ''; o.scrollTop = o.scrollHeight; }
    function newWorld() {
      if (!isRobot) return;
      world = new World(task.maps[variant]);
      $('#kd-board').innerHTML = boardSvg(world);
      placeBot($('#kd-board'), world, true);
      $('#kd-vsel').innerHTML = task.maps.length > 1 ? task.maps.map(function (m, i) { return '<button type="button" class="chip' + (i === variant ? ' on' : '') + '" data-v="' + i + '">' + (i + 1) + '. pálya</button>'; }).join('') : '';
      $('#kd-rmsg').innerHTML = '<span class="muted">Kincsek: ' + world.total + (world.goal ? ' · Cél: 🏁' : '') + '</span>';
    }
    function setRunning(r) {
      running = r;
      $('#kd-run').textContent = r ? '⏸ Szünet' : (vm && !vm.done ? '▶ Folytatás' : '▶ Futtatás');
      ed.ta.readOnly = !!vm && !vm.done;
      root.querySelector('.kd-edcard').classList.toggle('busy', !!vm && !vm.done);
    }
    function reset(keepMsg) {
      clearTimeout(timer); timer = null; vm = null; prog = null; prevSnap = null;
      if (!keepMsg) msg('');
      ed.mark(0, 0); newWorld(); renderVars(); renderOut(); setRunning(false);
    }
    function start() {
      reset();
      try { prog = compile(ed.ta.value); vm = new VM(prog, { world: world, tiltott: task && task.tiltott, maxSteps: 100000 }); }
      catch (e) { if (!(e instanceof KErr)) throw e; showErr(e); vm = null; return false; }
      ed.mark(vm.line, 0); renderVars();
      return true;
    }
    function finish() {
      setRunning(false); ed.mark(0, 0); renderVars(); renderOut();
      if (isRobot) {
        var v = world.verdict();
        if (!v.ok) { msg('🤔 ' + esc(v.msg), 'warn'); return; }
        checkAll(true);
      } else msg('✅ A program lefutott (' + vm.steps + ' lépés).' + (task ? ' Ha kész vagy, nyomd meg az <b>✔ Ellenőrzés</b> gombot!' : ''), 'ok');
    }
    function doStep() {
      var r;
      try { r = vm.step(); } catch (e) { if (!(e instanceof KErr)) throw e; clearTimeout(timer); timer = null; showErr(e); vm.done = true; setRunning(false); renderVars(); renderOut(); return 'err'; }
      return r;
    }
    function tick() {
      if (!vm || !running || !root.isConnected) return;
      var sp = SPEEDS[(+$('#kd-speed').value || 6) - 1], r, n = sp === 0 ? 400 : 1;
      for (var i = 0; i < n; i++) { r = doStep(); if (r !== 'paused') break; }
      if (r === 'err') return;
      if (isRobot) placeBot($('#kd-board'), world);
      if (r === 'done') { finish(); return; }
      ed.mark(vm.line, 0); renderVars(); renderOut();
      timer = setTimeout(tick, sp === 0 ? 0 : sp);
    }
    function successBox(text) {
      var next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;
      msg('🎉 <b>' + text + '</b>' + (next ? ' <a class="btn sm primary" href="#/kodolas/' + next.id + '">Következő: ' + esc(next.cim) + ' →</a>' : ' <a class="btn sm" href="#/kodolas">Vissza a feladatokhoz</a>'), 'ok');
      save(function (s) { s.solved[id] = true; s.code[id] = ed.ta.value; });
      var chips = root.querySelector('.kd-chips');
      if (chips && !chips.querySelector('.kd-okchip')) chips.insertAdjacentHTML('beforeend', '<span class="chip kd-okchip">✓ Megoldva</span>');
    }
    function checkAll(afterRun) {
      if (isRobot) {
        var res = robotCheck(task, ed.ta.value);
        if (res.compileErr) { showErr(res.compileErr); return; }
        var bad = -1; res.results.forEach(function (r, i) { if (!r.ok && bad < 0) bad = i; });
        if (bad >= 0) {
          var r = res.results[bad];
          msg((afterRun ? '👍 Ezen a pályán sikerült, de ' : '') + (task.maps.length > 1 ? 'a(z) ' + (bad + 1) + '. pályán: ' : '') + esc(r.msg) + (task.maps.length > 1 ? ' <button type="button" class="btn sm" data-v="' + bad + '">Mutasd</button>' : ''), 'warn');
          if (r.err && r.err.line) ed.mark(0, r.err.line);
          return;
        }
        if (res.note) { msg('🤏 ' + esc(res.note), 'warn'); return; }
        successBox(task.maps.length > 1 ? 'Szuper! Mind a(z) ' + task.maps.length + ' pályán működik.' : 'Szuper! A pálya teljesítve.');
        return;
      }
      var ar = algoCheck(task, ed.ta.value);
      if (ar.compileErr) { showErr(ar.compileErr); $('#kd-res').innerHTML = ''; return; }
      var okN = ar.results.filter(function (r) { return r.ok; }).length;
      $('#kd-res').innerHTML = '<div class="card kd-tests"><h3>🧪 Tesztek: ' + okN + ' / ' + ar.results.length + '</h3><div class="kd-tw"><table class="kd-vt"><thead><tr><th></th><th>Bemenet</th><th>Várt</th><th>Kapott</th></tr></thead><tbody>' +
        ar.results.map(function (r) {
          return '<tr class="' + (r.ok ? 'pass' : 'fail') + '"><td>' + (r.ok ? '✅' : '❌') + '</td><td><code>' + esc(task.fn + '(' + r.args.map(function (a) { return reprShort(a, 40); }).join(', ') + ')') + '</code></td><td><code>' + esc(reprShort(r.expected)) + '</code></td><td>' +
            (r.err ? '<span class="kd-bad">' + esc(r.err.toString()) + '</span>' : '<code>' + esc(reprShort(r.got)) + '</code>' + (uni() && r.steps ? ' <small class="muted">(' + r.steps + ' lépés)</small>' : '')) + '</td></tr>';
        }).join('') + '</tbody></table></div></div>';
      if (ar.ok) successBox('Minden teszt átment!');
      else if (ar.note) msg('🤏 ' + esc(ar.note), 'warn');
      else msg('Még ' + (ar.results.length - okN) + ' teszt nem megy át – nézd meg a táblázatot lent!', 'warn');
    }

    $('#kd-run').addEventListener('click', function () {
      if (running) { clearTimeout(timer); setRunning(false); return; }
      if (!vm || vm.done) { if (!start()) return; }
      setRunning(true); tick();
    });
    $('#kd-step').addEventListener('click', function () {
      if (running) { clearTimeout(timer); setRunning(false); }
      if (!vm || vm.done) { if (!start()) return; setRunning(false); return; }
      var r = doStep();
      if (r === 'err') return;
      if (isRobot) placeBot($('#kd-board'), world);
      if (r === 'done') { finish(); return; }
      ed.mark(vm.line, 0); renderVars(); renderOut(); setRunning(false);
    });
    $('#kd-stop').addEventListener('click', function () { reset(); });
    if ($('#kd-check')) $('#kd-check').addEventListener('click', function () { if (running) { clearTimeout(timer); } reset(); checkAll(false); });
    $('#kd-speed').addEventListener('input', function () { var v = +this.value; save(function (s) { s.speed = v; }); });
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-v]');
      if (b && isRobot && !running) { variant = +b.getAttribute('data-v'); reset(true); return; }
      var rv = e.target.closest('[data-rv]');
      if (rv) {
        var which = rv.getAttribute('data-rv'), box = $('#kd-' + which);
        if (which === 'minta' && box.hidden && !st.solved[id] && !confirm('Biztosan megnézed a mintamegoldást? Próbáld meg előbb egyedül – a tipp is segíthet!')) return;
        box.hidden = !box.hidden; rv.classList.toggle('on', !box.hidden);
      }
      if (e.target.id === 'kd-usemin') {
        if (!confirm('Lecseréled a saját kódodat a mintamegoldásra?')) return;
        var src = task.minta;
        if (!isRobot) { var ex = task.start.split('\n\n').slice(1).join('\n\n'); if (ex) src += '\n' + ex; }
        reset(); ed.ta.value = src; ed.paint(); save(function (s) { s.code[id] = src; });
      }
    });
    var keysBar = root.querySelector('.kd-keys');
    keysBar.addEventListener('mousedown', function (e) { if (e.target.closest('.kd-key')) e.preventDefault(); });
    keysBar.addEventListener('click', function (e) {
      var k = e.target.closest('.kd-key'); if (!k || ed.ta.readOnly) return;
      var t = k.getAttribute('data-ins');
      if (t === '⇥') { ed.insert('    '); return; }
      if (t === '⇤') { ed.dedent(); return; }
      ed.insert(t);
      var back = /\(\):$/.test(t) ? 2 : /^(print|range|len)\(\)$/.test(t) ? 1 : 0;
      if (back) { var p = ed.ta.selectionStart - back; ed.ta.setSelectionRange(p, p); }
    });
    reset();
    return true;
  }

  S.addRoute('kodolas', { title: 'Programozás játszva', nav: '', page: function (main, rest) {
    var id = rest && rest[0];
    if (!id) return hub(main);
    if (id === 'homokozo') return taskPage(main, null);
    var t = byId(id);
    if (!t) return false;
    return taskPage(main, t);
  } });
})();
