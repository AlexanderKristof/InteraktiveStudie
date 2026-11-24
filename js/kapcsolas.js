/* Tudásműhely – kapcsolás-építő játék (lámpa bekötése).
 * Widget: { type: 'kapcsolas', options: { feladat: 'egyszeru' | 'valto' } }
 * A diák kapcsokat köt össze vezetékkel; a program szimulálja az áramkört
 * (unió–keresés a vezetékeken és a zárt kapcsolóérintkezőkön), és ellenőrzi a szabályokat. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  var COLORS = [['barna', '#8b5a2b'], ['fekete', '#222'], ['szürke', '#8d96a8'], ['kék', '#2f7bf6'], ['zöld-sárga', 'url(#kp-gy)']];
  var PHASE_COLORS = { barna: 1, fekete: 1, 'szürke': 1 };

  /* Feladatok: kapcsok (x, y, felirat), kapcsolók (állapotfüggő belső kapcsolatok). */
  var TASKS = {
    egyszeru: {
      title: '1. feladat: lámpa egy kapcsolóval',
      help: 'Kösd be a lámpát úgy, hogy a kapcsolóval fel- és lekapcsolható legyen. Ne feledd: a kapcsoló a **fázist** szakítsa meg, a lámpa fém házát pedig védőföldelni kell.',
      terms: {
        L: [70, 110, 'L'], N: [70, 170, 'N'], PE: [70, 230, 'PE'],
        sa: [285, 112, '1'], sb: [335, 112, '2'],
        lL: [505, 262, 'L'], lN: [545, 272, 'N'], lPE: [585, 262, 'PE']
      },
      switches: [{ id: 's1', x: 310, y: 80, kind: 'egy', contacts: function (st) { return st ? [['sa', 'sb']] : []; } }],
      states: [[0], [1]]
    },
    valto: {
      title: '2. feladat: alternatív (váltó) kapcsolás',
      help: 'Folyosón vagy lépcsőházban a lámpát két helyről kell tudni kapcsolni. Mindkét váltókapcsolónak van egy **közös** (K) és két **váltó** (1, 2) kapcsa. Bármelyik kapcsoló átbillentése változtassa meg a lámpa állapotát!',
      terms: {
        L: [70, 110, 'L'], N: [70, 170, 'N'], PE: [70, 230, 'PE'],
        aK: [215, 112, 'K'], a1: [265, 96, '1'], a2: [265, 128, '2'],
        bK: [445, 112, 'K'], b1: [395, 96, '1'], b2: [395, 128, '2'],
        lL: [505, 262, 'L'], lN: [545, 272, 'N'], lPE: [585, 262, 'PE']
      },
      switches: [
        { id: 's1', x: 240, y: 80, kind: 'valto', contacts: function (st) { return [['aK', st ? 'a2' : 'a1']]; } },
        { id: 's2', x: 420, y: 80, kind: 'valto', contacts: function (st) { return [['bK', st ? 'b2' : 'b1']]; } }
      ],
      states: [[0, 0], [0, 1], [1, 0], [1, 1]]
    }
  };

  function uf(keys) {
    var p = {};
    keys.forEach(function (k) { p[k] = k; });
    function f(x) { while (p[x] !== x) { p[x] = p[p[x]]; x = p[x]; } return x; }
    return { find: f, join: function (a, b) { p[f(a)] = f(b); } };
  }

  S.addWidget('kapcsolas', function (el, o) {
    var taskId = o.feladat || 'egyszeru', T, wires, sw, color = 'barna', pick = null;
    function reset() { T = TASKS[taskId]; wires = []; sw = T.switches.map(function () { return 0; }); pick = null; }
    reset();

    function net(state) {
      var u = uf(Object.keys(T.terms));
      wires.forEach(function (w) { u.join(w.a, w.b); });
      T.switches.forEach(function (s, i) { s.contacts(state[i]).forEach(function (c) { u.join(c[0], c[1]); }); });
      return u;
    }
    function simulate(state) {
      var u = net(state), L = u.find('L'), N = u.find('N'), PE = u.find('PE');
      var short = L === N || L === PE;
      var lit = !short && u.find('lL') === L && u.find('lN') === N;
      return { lit: lit, short: short, npe: N === PE, u: u };
    }

    function check() {
      var out = [], ok = true;
      if (!wires.length) return [['bad', 'Még nincs bekötve semmi.']];
      var sims = T.states.map(simulate);
      if (sims.some(function (s) { return s.short; })) { return [['bad', '⚡ Zárlat! A fázis közvetlenül összeér a nullával vagy a védővezetékkel, ezért a kismegszakító azonnal leoldana. Keresd meg a hibás vezetéket!']]; }
      if (sims.some(function (s) { return s.npe; })) out.push(['bad', 'A nullavezető (N) és a védővezető (PE) össze van kötve! Lakásban ezeket külön kell vezetni, különben a FI relé leoldana, és a védelem sem működne megfelelően.']), ok = false;
      // működés
      if (taskId === 'egyszeru') {
        var good = sims[1].lit && !sims[0].lit;
        out.push([good ? 'ok' : 'bad', good ? 'A lámpa a kapcsolóval fel- és lekapcsolható.' : 'A lámpa nem kapcsolható rendesen: ' + (sims[0].lit && sims[1].lit ? 'mindig ég, a kapcsoló nincs az áramkörben.' : 'nem ég be a kapcsoló egyik állásában sem.')]);
        ok = ok && good;
      } else {
        var lits = sims.map(function (s) { return s.lit; });
        var good2 = lits[0] !== lits[1] && lits[0] !== lits[2] && lits[3] !== lits[1] && lits[3] !== lits[2];
        out.push([good2 ? 'ok' : 'bad', good2 ? 'Mindkét kapcsoló átbillentése megváltoztatja a lámpa állapotát.' : 'Nem minden kapcsolóállás-váltás kapcsolja át a lámpát (' + lits.filter(Boolean).length + ' állásban ég a négyből, kettőben kellene).']);
        ok = ok && good2;
      }
      // a kapcsoló a fázist szakítsa
      var offStates = sims.filter(function (s) { return !s.lit; });
      var phaseBroken = offStates.length && offStates.every(function (s) { return s.u.find('lL') !== s.u.find('L'); });
      var anyLit = sims.some(function (s) { return s.lit; });
      if (anyLit) {
        out.push([phaseBroken ? 'ok' : 'bad', phaseBroken ? 'A kapcsoló a fázisvezetőt szakítja meg: lekapcsolt állapotban a lámpa feszültségmentes.' : 'A kapcsoló a nullavezetőt szakítja meg! Lekapcsolva is feszültség alatt marad a foglalat, izzócserénél áramütés veszélye áll fenn.']);
        ok = ok && phaseBroken;
      }
      // védőföld
      var u0 = sims[0].u, pe = u0.find('lPE') === u0.find('PE');
      out.push([pe ? 'ok' : 'bad', pe ? 'A lámpa fém háza védőföldelve van.' : 'A lámpa PE kapcsa nincs összekötve a védővezetővel (PE).']);
      ok = ok && pe;
      // színek
      var u1 = uf(Object.keys(T.terms)); wires.forEach(function (w) { u1.join(w.a, w.b); });
      var bad = [];
      wires.forEach(function (w) {
        var r = u1.find(w.a), isPE = r === u1.find('PE') || r === u1.find('lPE'), isN = r === u1.find('N') || r === u1.find('lN');
        var want = isPE ? 'zöld-sárga' : isN ? 'kék' : 'fázis';
        var okc = want === 'fázis' ? PHASE_COLORS[w.c] : w.c === want;
        if (!okc) bad.push(T.terms[w.a][2] + '–' + T.terms[w.b][2] + ' (' + w.c + ' helyett ' + (want === 'fázis' ? 'barna/fekete/szürke' : want) + ')');
      });
      out.push([bad.length ? 'warn' : 'ok', bad.length ? 'Rossz vezetékszín: ' + bad.join(', ') + '.' : 'A vezetékszínek szabványosak (barna/fekete/szürke fázis, kék nulla, zöld-sárga védőföld).']);
      ok = ok && !bad.length;
      if (ok) out.unshift(['ok', '🎉 Kiváló! Ezt a bekötést egy villanyszerelő is elfogadná.']);
      return out;
    }

    function draw() {
      var st = simulate(sw), t = T.terms;
      var s = '<defs><pattern id="kp-gy" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#2f9e6a"/><rect width="5" height="10" fill="#e8c425"/></pattern>' +
        '<radialGradient id="kp-glow"><stop offset="0" stop-color="#ffe066" stop-opacity=".95"/><stop offset="1" stop-color="#ffe066" stop-opacity="0"/></radialGradient></defs>';
      // táp
      s += '<rect x="20" y="80" width="90" height="180" rx="10" fill="var(--surface)" stroke="var(--line)" stroke-width="2"/><text x="65" y="74" text-anchor="middle" class="svg-muted" font-size="12">elosztó (230 V)</text>';
      // lámpa
      s += '<circle cx="545" cy="200" r="70" fill="url(#kp-glow)" opacity="' + (st.lit ? 1 : 0) + '"/>' +
        '<path d="M505 250 h80 v-14 a40 34 0 0 0 -80 0z" fill="#8d96a8" stroke="var(--fg-2)" stroke-width="2"/>' +
        '<circle cx="545" cy="196" r="26" fill="' + (st.lit ? '#ffd43b' : 'var(--surface)') + '" stroke="var(--fg-2)" stroke-width="2"/>' +
        '<path d="M535 202 q5 -16 10 0 q5 -16 10 0" fill="none" stroke="' + (st.lit ? '#b8860b' : 'var(--muted)') + '" stroke-width="2"/>' +
        '<text x="545" y="300" text-anchor="middle" class="svg-muted" font-size="12">lámpa (fém házas)</text>';
      // kapcsolók
      T.switches.forEach(function (k, i) {
        var on = sw[i];
        s += '<g class="kp-sw" data-sw="' + i + '" style="cursor:pointer"><rect x="' + (k.x - 40) + '" y="' + (k.y - 38) + '" width="80" height="90" rx="10" fill="var(--surface)" stroke="var(--line)" stroke-width="2"/>' +
          '<rect x="' + (k.x - 14) + '" y="' + (k.y - 30) + '" width="28" height="22" rx="5" fill="' + (on ? 'var(--accent)' : 'var(--surface-2)') + '" stroke="var(--fg-2)"/>' +
          '<text x="' + k.x + '" y="' + (k.y - 14) + '" text-anchor="middle" font-size="11" font-weight="700" fill="' + (on ? '#fff' : 'var(--fg)') + '">' + (k.kind === 'valto' ? (on ? '2' : '1') : (on ? 'BE' : 'KI')) + '</text>';
        // belső érintkező rajza
        k.contacts(on).forEach(function (c) { s += '<line x1="' + t[c[0]][0] + '" y1="' + t[c[0]][1] + '" x2="' + t[c[1]][0] + '" y2="' + t[c[1]][1] + '" stroke="var(--accent)" stroke-width="3" stroke-dasharray="4 3"/>'; });
        s += '<text x="' + k.x + '" y="' + (k.y + 66) + '" text-anchor="middle" class="svg-muted" font-size="11">' + (k.kind === 'valto' ? 'váltókapcsoló' : 'kapcsoló') + '</text></g>';
      });
      // vezetékek
      wires.forEach(function (w, i) {
        var a = t[w.a], b = t[w.b], col = COLORS.filter(function (c) { return c[0] === w.c; })[0][1];
        var mx = (a[0] + b[0]) / 2, my = Math.max(a[1], b[1]) + 30 + (i % 3) * 8;
        s += '<path class="kp-wire" data-w="' + i + '" d="M' + a[0] + ' ' + a[1] + ' Q' + mx + ' ' + my + ' ' + b[0] + ' ' + b[1] + '" fill="none" stroke="' + col + '" stroke-width="6" stroke-linecap="round" style="cursor:pointer"><title>Kattints a törléshez</title></path>';
      });
      // kapcsok
      Object.keys(t).forEach(function (k) {
        var p = t[k], fill = k === 'L' ? '#8b5a2b' : k === 'N' ? '#2f7bf6' : k === 'PE' ? '#2f9e6a' : 'var(--surface)';
        s += '<g class="kp-term" data-t="' + k + '" style="cursor:pointer"><circle class="kp-hit" cx="' + p[0] + '" cy="' + p[1] + '" r="18" fill="transparent"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (pick === k ? 11 : 8) + '" fill="' + fill + '" stroke="' + (pick === k ? 'var(--accent)' : 'var(--fg-2)') + '" stroke-width="' + (pick === k ? 4 : 2) + '"/>' +
          '<text x="' + (p[0] + (['L', 'N', 'PE'].indexOf(k) >= 0 ? 16 : 0)) + '" y="' + (p[1] + (['L', 'N', 'PE'].indexOf(k) >= 0 ? 4 : -13)) + '" text-anchor="' + (['L', 'N', 'PE'].indexOf(k) >= 0 ? 'start' : 'middle') + '" font-size="12" font-weight="700" class="svg-text">' + esc(p[2]) + '</text></g>';
      });
      if (st.short) s += '<text x="320" y="330" text-anchor="middle" font-size="16" font-weight="800" fill="#e5484d">⚡ ZÁRLAT – a kismegszakító leoldana!</text>';
      el.querySelector('#kp').innerHTML = s;
      el.querySelectorAll('.kp-term').forEach(function (g) {
        g.addEventListener('click', function () {
          var k = g.dataset.t;
          if (!pick) pick = k;
          else if (pick === k) pick = null;
          else {
            if (!wires.some(function (w) { return (w.a === pick && w.b === k) || (w.a === k && w.b === pick); })) wires.push({ a: pick, b: k, c: color });
            pick = null;
          }
          el.querySelector('#kp-res').innerHTML = '';
          draw();
        });
      });
      el.querySelectorAll('.kp-wire').forEach(function (p) { p.addEventListener('click', function () { wires.splice(+p.dataset.w, 1); el.querySelector('#kp-res').innerHTML = ''; draw(); }); });
      el.querySelectorAll('.kp-sw').forEach(function (g) { g.addEventListener('click', function () { var i = +g.dataset.sw; sw[i] = sw[i] ? 0 : 1; draw(); }); });
      el.querySelector('#kp-hint').textContent = pick ? 'Most kattints a másik kapocsra, ahová a vezetéket húzod (vagy ugyanarra a megszakításhoz).' : 'Kattints egy kapocsra, majd egy másikra: közéjük vezeték kerül. Vezetékre kattintva törlöd. A kapcsolóra kattintva átbillented.';
    }

    function paint() {
      el.innerHTML = '<div class="w-title">🔌 Kapcsolás-építő</div><div class="row" style="margin-bottom:8px">' +
        '<div class="seg" id="kp-task">' + Object.keys(TASKS).map(function (k) { return '<button type="button" data-k="' + k + '" class="' + (k === taskId ? 'on' : '') + '">' + (k === 'egyszeru' ? '1. Egy kapcsoló' : '2. Váltókapcsolás') + '</button>'; }).join('') + '</div></div>' +
        '<p class="w-help"><b>' + esc(T.title) + '.</b> ' + S.inline(T.help) + '</p>' +
        '<div class="row" style="gap:6px;margin-bottom:8px"><span class="muted" style="font-size:.9rem">Vezeték színe:</span>' + COLORS.map(function (c) {
          return '<button type="button" class="kp-col' + (c[0] === color ? ' on' : '') + '" data-c="' + c[0] + '" title="' + c[0] + '"><i style="background:' + (c[0] === 'zöld-sárga' ? 'repeating-linear-gradient(45deg,#2f9e6a 0 5px,#e8c425 5px 10px)' : c[1]) + '"></i>' + c[0] + '</button>';
        }).join('') + '</div>' +
        '<svg class="w-svg" viewBox="0 0 640 340" id="kp"></svg><p class="muted" id="kp-hint" style="font-size:.88rem;margin:6px 0"></p>' +
        '<div class="row"><button type="button" class="btn primary" id="kp-check">Ellenőrzés</button><button type="button" class="btn" id="kp-clear">Minden vezeték törlése</button></div><div id="kp-res" style="margin-top:10px;display:grid;gap:6px"></div>' +
        '<div class="note warn" style="margin-top:12px"><b class="t">⚠ Ez csak szimuláció</b><p>Valódi hálózati szerelést csak képesítéssel rendelkező villanyszerelő végezhet, feszültségmentes állapotban.</p></div>';
      el.querySelectorAll('#kp-task button').forEach(function (b) { b.addEventListener('click', function () { taskId = b.dataset.k; reset(); paint(); }); });
      el.querySelectorAll('.kp-col').forEach(function (b) { b.addEventListener('click', function () { color = b.dataset.c; el.querySelectorAll('.kp-col').forEach(function (x) { x.classList.toggle('on', x === b); }); }); });
      el.querySelector('#kp-check').addEventListener('click', function () {
        el.querySelector('#kp-res').innerHTML = check().map(function (r) { return '<div class="w-msg ' + r[0] + '">' + (r[0] === 'ok' ? '✔ ' : r[0] === 'warn' ? '⚠ ' : '✘ ') + esc(r[1]) + '</div>'; }).join('');
      });
      el.querySelector('#kp-clear').addEventListener('click', function () { wires = []; pick = null; el.querySelector('#kp-res').innerHTML = ''; draw(); });
      draw();
    }
    paint();
  });

  /* A játék bekerül a soros/párhuzamos kapcsolás leckébe. */
  S.attachKapcsolas = function () {
    var s = S.subjects.filter(function (x) { return x.id === 'villanyszereles'; })[0];
    var l = s && s.lessons.filter(function (x) { return x.id === 'kapcsolasok'; })[0];
    if (l) { l.widgets = l.widgets || []; if (!l.widgets.some(function (w) { return w.type === 'kapcsolas'; })) l.widgets.unshift({ type: 'kapcsolas' }); }
  };
})();
