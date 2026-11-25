/* Tudásműhely – Egyetem: szakszótár, képlet-boncoló, fogalomtérkép, tanulókártyák.
 * Adat: STUDIE.addCourse({ id, title, icon, color, level, description, topics, terms, formulas }) – lásd data/egyetem/. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc, md = S.md;
  S.courses = [];
  S.addCourse = function (c) { S.courses.push(c); };
  /* Egyszerű, szakszó nélküli magyarázatok iskolai nézethez: STUDIE.addSimple('kurzus', { _course: '…', fogalomId: '…' }) */
  S.simple = {};
  S.addSimple = function (cid, map) { var o = S.simple[cid] = S.simple[cid] || {}; Object.keys(map).forEach(function (k) { o[k] = map[k]; }); };
  S.simpleOf = function (cid, tid) { return (S.simple[cid] || {})[tid] || ''; };
  /* első mondat; a gyakori rövidítéseknél (pl., stb., kb., ill., ún., Kr. e.) és sorszámoknál nem vágunk */
  function firstSentence(t) {
    var line = String(t).split('\n')[0], re = /[.!?](\s|$)/g, m;
    while ((m = re.exec(line)) !== null) {
      var before = line.slice(0, m.index + 1);
      if (/(^|\s|\()(pl|stb|kb|ill|ún|vö|Kr|e|sz|dr|ld|min|max|db|ford)\.$/i.test(before) || /\d\.$/.test(before)) continue;
      return before.trim();
    }
    return line;
  }
  /* iskolai nézetben a rövid leírás helyett az egyszerű magyarázat első mondata */
  S.termShort = function (c, t) { var sm = S.level !== 'egyetem' && S.simpleOf(c.id, t.id); return sm ? firstSentence(sm) : t.short; };
  S.courseById = function (id) { return S.courses.filter(function (c) { return c.id === id; })[0]; };

  var PALETTE = ['#2f7bf6', '#e5484d', '#2f9e6a', '#f08c2e', '#7c5cd6', '#0e9aa7', '#c2417a', '#8a6d1f'];
  function topicColor(c, topicId) {
    var i = (c.topics || []).findIndex(function (t) { return t.id === topicId; });
    return PALETTE[(i < 0 ? 0 : i) % PALETTE.length];
  }
  function topicTitle(c, id) { var t = (c.topics || []).filter(function (x) { return x.id === id; })[0]; return t ? t.title : ''; }
  function termById(c, id) { return c.terms.filter(function (t) { return t.id === id; })[0]; }
  function sortTerms(arr) { return arr.slice().sort(function (a, b) { return a.term.localeCompare(b.term, 'hu'); }); }

  /* Matematikai jelölés: x_1, x_{max}, x^2, x^{n+1}, valamint \alpha jellegű görög betűk nélkül (írj Unicode-ot: α, Δ, ω). */
  function mathHtml(t) {
    return esc(t)
      .replace(/_\{([^}]*)\}/g, '<sub>$1</sub>').replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>')
      .replace(/_([A-Za-z0-9α-ωΑ-Ω]+)/g, '<sub>$1</sub>').replace(/\^([A-Za-z0-9+\-α-ω]+)/g, '<sup>$1</sup>');
  }
  S.mathHtml = mathHtml;

  /* ---------- tudásgráf: hivatkozások a szintek között ----------
   * Szakszó-hivatkozás formája: 'kurzusId/fogalomId' (pl. 'digitalis-technika/mosfet').
   * - modell alkatrésze:  terms: ['digitalis-technika/mosfet']
   * - lecke:              terms: [...]
   * - szakszó:            prereq: ['lecke:villanyszereles/alapfogalmak', 'modell:tranzisztor', 'digitalis-technika/bit']  */
  S.resolveTerm = function (ref) {
    var p = String(ref).split('/'), c = S.courseById(p[0]), t = c && termById(c, p[1]);
    return t ? { c: c, t: t, href: '#/egyetem/' + c.id + '/fogalom/' + t.id } : null;
  };
  S.termCards = function (refs, title) {
    var list = (refs || []).map(S.resolveTerm).filter(Boolean);
    if (!list.length) return '';
    return '<div class="term-refs">' + (title ? '<b class="tr-title">' + title + '</b>' : '') + '<div class="tr-grid">' + list.map(function (r) {
      return '<a class="tr-card" style="--tc:' + topicColor(r.c, r.t.topic) + '" href="' + r.href + '"><b>' + esc(r.t.term) + '</b>' +
        (r.t.latin ? '<small class="sci-name" style="font-size:.85rem">' + esc(r.t.latin) + '</small>' : '') + (r.t.en ? '<small>🇬🇧 ' + esc(r.t.en) + '</small>' : '') + '<span>' + S.inline(S.termShort(r.c, r.t)) + '</span><em>' + esc(r.c.title) + ' →</em></a>';
    }).join('') + '</div></div>';
  };
  /* Hol fordul elő egy szakszó a valóságban? (modellek alkatrészei, leckék) */
  function usages(c, t) {
    var ref = c.id + '/' + t.id, out = [];
    Object.keys(S.models).forEach(function (k) {
      var m = S.models[k];
      if ((m.uni && (m.uni.terms || []).indexOf(ref) >= 0)) out.push({ icon: m.icon, label: m.title, href: '#/felfedezo/' + m.id });
      m.parts.forEach(function (p) {
        if ((p.terms || []).indexOf(ref) >= 0) out.push({ icon: m.icon, label: m.title + ' › ' + p.name, href: '#/felfedezo/' + m.id + '?resz=' + p.id });
      });
    });
    S.subjects.forEach(function (s) {
      s.lessons.forEach(function (l) {
        if ((l.terms || []).indexOf(ref) >= 0) out.push({ icon: s.icon, label: s.title + ' › ' + l.title, href: '#/lecke/' + s.id + '/' + l.id });
      });
    });
    return out;
  }
  function prereqLinks(t) {
    return (t.prereq || []).map(function (r) {
      var m;
      if ((m = /^lecke:(.+)\/(.+)$/.exec(r))) {
        var s = S.subjects.filter(function (x) { return x.id === m[1]; })[0], l = s && s.lessons.filter(function (x) { return x.id === m[2]; })[0];
        return l ? { icon: s.icon, label: s.title + ' › ' + l.title, href: '#/lecke/' + s.id + '/' + l.id } : null;
      }
      if ((m = /^modell:(.+)$/.exec(r))) return S.models[m[1]] ? { icon: S.models[m[1]].icon, label: S.models[m[1]].title, href: '#/felfedezo/' + m[1] } : null;
      var rt = S.resolveTerm(r);
      return rt ? { icon: rt.c.icon, label: rt.t.term, href: rt.href } : null;
    }).filter(Boolean);
  }
  /* Szakszavak, amelyek egy leckére mint előismeretre épülnek. */
  S.termsBuildingOn = function (sid, lid) {
    var key = 'lecke:' + sid + '/' + lid, out = [];
    S.courses.forEach(function (c) { c.terms.forEach(function (t) { if ((t.prereq || []).indexOf(key) >= 0) out.push(c.id + '/' + t.id); }); });
    return out;
  };
  function linkList(items) {
    return '<div class="chips" style="margin-top:4px">' + items.map(function (u) { return '<a class="chip" href="' + u.href + '">' + u.icon + ' ' + esc(u.label) + '</a>'; }).join('') + '</div>';
  }

  /* Kétirányú kapcsolatok a fogalmak között (ha A → B, akkor B is látja A-t). */
  function links(c) {
    if (c._links) return c._links;
    var L = {};
    c.terms.forEach(function (t) { L[t.id] = L[t.id] || {}; });
    c.terms.forEach(function (t) {
      (t.related || []).forEach(function (r) {
        if (!L[r]) return;
        L[t.id][r] = 1; L[r][t.id] = 1;
      });
    });
    c._links = {};
    Object.keys(L).forEach(function (k) { c._links[k] = Object.keys(L[k]); });
    return c._links;
  }

  /* ---------- képlet-boncoló ---------- */
  function formulaHtml(f, idx) {
    return '<div class="formula card" data-f="' + idx + '"><div class="f-head"><b>' + esc(f.title) + '</b>' + (f.en ? '<span class="badge">' + esc(f.en) + '</span>' : '') + '</div>' +
      '<div class="f-eq" role="group" aria-label="' + esc(f.title) + '">' + f.parts.map(function (p, i) {
        return p.d ? '<button type="button" class="f-tok" data-i="' + i + '" style="--c:' + PALETTE[i % PALETTE.length] + '">' + mathHtml(p.t) + '</button>'
          : '<span class="f-op">' + mathHtml(p.t) + '</span>';
      }).join('') + '</div><div class="f-info"><span class="muted">Kattints a képlet egy jelére: megmutatom, mit jelent.</span></div>' +
      (f.text ? '<div class="f-text">' + md(f.text) + '</div>' : '') +
      (f.example ? '<div class="note tip"><b class="t">Példa</b>' + md(f.example) + '</div>' : '') + '</div>';
  }
  function bindFormulas(root, formulas) {
    root.querySelectorAll('.formula[data-f]').forEach(function (box) {
      var f = formulas[+box.dataset.f];
      box.querySelectorAll('.f-tok').forEach(function (b) {
        b.addEventListener('click', function () {
          var p = f.parts[+b.dataset.i];
          box.querySelectorAll('.f-tok').forEach(function (x) { x.classList.toggle('on', x === b); });
          box.querySelector('.f-info').innerHTML = '<span class="f-sym" style="color:' + PALETTE[+b.dataset.i % PALETTE.length] + '">' + mathHtml(p.t) + '</span>' +
            '<span><b>' + S.inline(p.d) + '</b>' + (p.unit ? ' · mértékegység: <code>' + esc(p.unit) + '</code>' : '') + (p.more ? '<br><span class="muted">' + S.inline(p.more) + '</span>' : '') + '</span>';
        });
      });
    });
  }

  /* ---------- fogalomkártya ---------- */
  function termHtml(c, t, compact) {
    var col = topicColor(c, t.topic);
    var rel = links(c)[t.id] || [];
    var fs = (t.formulas || []).map(function (fid) { return c.formulas.findIndex(function (f) { return f.id === fid; }); }).filter(function (i) { return i >= 0; });
    return '<article class="term" style="--tc:' + col + '">' +
      '<div class="row" style="gap:6px"><span class="topic-chip">' + esc(topicTitle(c, t.topic)) + '</span>' + (t.en ? '<span class="badge" title="angolul">🇬🇧 ' + esc(t.en) + '</span>' : '') + '</div>' +
      '<h' + (compact ? '3' : '1') + ' class="term-title">' + esc(t.term) + (t.latin ? ' <span class="sci-name" style="display:inline;font-size:.6em;font-weight:500">(' + esc(t.latin) + ')</span>' : '') + '</h' + (compact ? '3' : '1') + '>' +
      '<p class="term-short">' + S.inline(t.short) + '</p>' +
      (t.visual ? '<figure class="term-visual">' + t.visual + (t.caption ? '<figcaption>' + S.inline(t.caption) + '</figcaption>' : '') + '</figure>' : '') +
      (t.text ? md(t.text) : '') +
      fs.map(function (i) { return formulaHtml(c.formulas[i], i); }).join('') +
      (t.widget ? '<div class="widget card" data-widget="' + esc(JSON.stringify(t.widget)) + '"></div>' : '') +
      (t.example ? '<div class="note tip"><b class="t">Példa</b>' + md(t.example) + '</div>' : '') +
      (t.pitfall ? '<div class="note warn"><b class="t">Gyakori hiba</b>' + md(t.pitfall) + '</div>' : '') +
      (rel.length ? '<p class="muted" style="margin-bottom:4px">Kapcsolódó fogalmak:</p><div class="chips" style="margin-top:0">' + rel.map(function (r) {
        var rt = termById(c, r); return '<a class="chip" href="#/egyetem/' + c.id + '/fogalom/' + r + '">' + esc(rt.term) + '</a>';
      }).join('') + '</div>' : '') +
      (!compact && prereqLinks(t).length ? '<div class="note"><b class="t">🎒 Előismeret: ha valami nem világos, ezekkel kezdd</b>' + linkList(prereqLinks(t)) + '</div>' : '') +
      (!compact && usages(c, t).length ? '<div class="note tip"><b class="t">🔧 Hol találkozol vele a valóságban?</b>' + linkList(usages(c, t)) + '</div>' : '') +
      ((t.models || []).filter(function (m) { return S.models[m]; }).length ? '<div class="related" style="margin-top:12px">' + t.models.filter(function (m) { return S.models[m]; }).map(function (m) {
        return '<a class="btn" href="#/felfedezo/' + m + '">' + S.models[m].icon + ' Nézz bele: ' + esc(S.models[m].title) + '</a>';
      }).join('') + '</div>' : '') +
      '</article>';
  }

  /* ---------- fogalomtérkép (erő-alapú elrendezés, egyszer kiszámolva) ---------- */
  function layout(c, W, H) {
    if (c._layout) return c._layout;
    var L = links(c), n = c.terms.length, pos = {}, k = Math.sqrt(W * H / n) * 0.62;
    c.terms.forEach(function (t, i) {
      var a = i / n * 2 * Math.PI;
      pos[t.id] = { x: W / 2 + Math.cos(a) * W * 0.35, y: H / 2 + Math.sin(a) * H * 0.35 };
    });
    for (var it = 0; it < 400; it++) {
      var temp = 30 * (1 - it / 400) + 1, disp = {};
      c.terms.forEach(function (a) { disp[a.id] = { x: 0, y: 0 }; });
      for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) {
        var A = c.terms[i].id, B = c.terms[j].id, dx = pos[A].x - pos[B].x, dy = pos[A].y - pos[B].y, d = Math.max(1, Math.sqrt(dx * dx + dy * dy)), f = k * k / d;
        disp[A].x += dx / d * f; disp[A].y += dy / d * f; disp[B].x -= dx / d * f; disp[B].y -= dy / d * f;
      }
      c.terms.forEach(function (t) {
        L[t.id].forEach(function (r) {
          if (t.id > r) return;
          var dx = pos[t.id].x - pos[r].x, dy = pos[t.id].y - pos[r].y, d = Math.max(1, Math.sqrt(dx * dx + dy * dy)), f = d * d / k;
          disp[t.id].x -= dx / d * f; disp[t.id].y -= dy / d * f; disp[r].x += dx / d * f; disp[r].y += dy / d * f;
        });
      });
      c.terms.forEach(function (t) {
        var p = pos[t.id], d = disp[t.id];
        d.x += (W / 2 - p.x) * 0.03; d.y += (H / 2 - p.y) * 0.05;
        var len = Math.max(1, Math.sqrt(d.x * d.x + d.y * d.y));
        p.x += d.x / len * Math.min(len, temp);
        p.y += d.y / len * Math.min(len, temp);
      });
    }
    // A kész elrendezést átméretezzük a rajzterületre.
    var xs = [], ys = [];
    Object.keys(pos).forEach(function (id) { xs.push(pos[id].x); ys.push(pos[id].y); });
    var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = Math.min.apply(0, ys), y1 = Math.max.apply(0, ys);
    Object.keys(pos).forEach(function (id) {
      pos[id].x = 90 + (pos[id].x - x0) / Math.max(1, x1 - x0) * (W - 180);
      pos[id].y = 30 + (pos[id].y - y0) / Math.max(1, y1 - y0) * (H - 75);
    });
    // Feliratok ütközésének feloldása: az átfedő címkéjű pontokat kicsit széttoljuk.
    var ids = Object.keys(pos), lw = {};
    c.terms.forEach(function (t) { lw[t.id] = t.term.replace(/\s*\(.*\)\s*/, '').length * 7.6 + 12; });
    for (var rep = 0; rep < 300; rep++) {
      var moved = false;
      for (var a = 0; a < ids.length; a++) for (var b = a + 1; b < ids.length; b++) {
        var P = pos[ids[a]], Q = pos[ids[b]], dx = Q.x - P.x, dy = Q.y - P.y;
        var ox = (lw[ids[a]] + lw[ids[b]]) / 2 - Math.abs(dx), oy = 34 - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          moved = true;
          if (oy < ox) { var sy = (dy >= 0 ? 1 : -1) * Math.min(oy, 6) / 2; P.y -= sy; Q.y += sy; }
          else { var sx = (dx >= 0 ? 1 : -1) * Math.min(ox, 6) / 2; P.x -= sx; Q.x += sx; }
        }
      }
      ids.forEach(function (id) { pos[id].x = Math.min(W - lw[id] / 2, Math.max(lw[id] / 2, pos[id].x)); pos[id].y = Math.min(H - 30, Math.max(14, pos[id].y)); });
      if (!moved) break;
    }
    c._layout = pos;
    return pos;
  }
  function mapHtml(c) {
    var W = 900, H = 640, pos = layout(c, W, H), L = links(c), edges = '', nodes = '';
    c.terms.forEach(function (t) {
      L[t.id].forEach(function (r) {
        if (t.id < r) edges += '<line data-a="' + t.id + '" data-b="' + r + '" x1="' + pos[t.id].x.toFixed(1) + '" y1="' + pos[t.id].y.toFixed(1) + '" x2="' + pos[r].x.toFixed(1) + '" y2="' + pos[r].y.toFixed(1) + '"/>';
      });
    });
    c.terms.forEach(function (t) {
      var p = pos[t.id], r = 6 + Math.min(8, L[t.id].length * 1.4);
      nodes += '<g class="node" data-id="' + t.id + '" tabindex="0" role="button" aria-label="' + esc(t.term) + '" transform="translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')">' +
        '<circle r="' + r.toFixed(1) + '" fill="' + topicColor(c, t.topic) + '"/><text y="' + (r + 15).toFixed(1) + '">' + esc(t.term.replace(/\s*\(.*\)\s*/, '')) + '</text></g>';
    });
    return '<svg class="cmap" viewBox="0 0 ' + W + ' ' + H + '"><g class="edges">' + edges + '</g>' + nodes + '</svg>';
  }

  /* ---------- tanulókártyák (Leitner-módszer, 5 doboz) ---------- */
  function cardsBox(root, c) {
    var key = 'leitner.' + c.id, boxes = S.store.get(key, {}), queue = [], cur = null, flipped = false, seen = 0, good = 0;
    function build() {
      // A kisebb sorszámú dobozok kártyái gyakrabban jönnek elő.
      var pool = [];
      c.terms.forEach(function (t) { var b = boxes[t.id] || 1; for (var i = 0; i < 6 - b; i++) pool.push(t); });
      queue = S.shuffle(pool).filter(function (t, i, a) { return a.indexOf(t) === i; }).slice(0, 12);
      queue.sort(function (a, b) { return (boxes[a.id] || 1) - (boxes[b.id] || 1) + (Math.random() - 0.5) * 2; });
    }
    function stats() {
      var cnt = [0, 0, 0, 0, 0];
      c.terms.forEach(function (t) { cnt[(boxes[t.id] || 1) - 1]++; });
      return '<div class="leitner">' + cnt.map(function (n, i) {
        return '<div><small>' + (i + 1) + '. doboz</small><b>' + n + '</b><span class="bar"><i style="width:' + Math.round(n / c.terms.length * 100) + '%"></i></span></div>';
      }).join('') + '</div>';
    }
    function show() {
      if (!queue.length) {
        root.innerHTML = '<div class="card pad"><h3>Kör vége</h3><p>' + good + ' / ' + seen + ' fogalmat tudtál.</p>' + stats() +
          '<p class="muted">Az 5. dobozban lévő fogalmakat már jól tudod. A rosszul tudottak visszakerülnek az 1. dobozba, és hamarabb előkerülnek.</p>' +
          '<div class="row"><button type="button" class="btn primary" id="lc-again">Új kör</button><button type="button" class="btn" id="lc-reset">Dobozok ürítése</button></div></div>';
        root.querySelector('#lc-again').addEventListener('click', function () { seen = good = 0; build(); show(); });
        root.querySelector('#lc-reset').addEventListener('click', function () { boxes = {}; S.store.set(key, boxes); seen = good = 0; build(); show(); });
        return;
      }
      cur = queue[0]; flipped = false;
      var reverse = Math.random() < 0.35 && cur.en; // néha angolból kérdez
      root.innerHTML = stats() +
        '<button type="button" class="flash" id="lc-card" aria-live="polite"><span class="muted">' + esc(topicTitle(c, cur.topic)) + ' · ' + (boxes[cur.id] || 1) + '. doboz</span>' +
        '<span class="flash-front">' + (reverse ? '🇬🇧 ' + esc(cur.en) : esc(cur.term)) + '</span>' +
        '<span class="flash-hint muted">Gondold végig, mit jelent, aztán kattints a megfordításhoz!</span></button>' +
        '<div class="row" id="lc-act" style="justify-content:center;margin-top:12px"></div>';
      var card = root.querySelector('#lc-card');
      card.addEventListener('click', function () {
        if (flipped) return; flipped = true;
        card.classList.add('flipped');
        card.innerHTML = '<span class="muted">' + esc(cur.term) + (cur.en ? ' · 🇬🇧 ' + esc(cur.en) : '') + '</span><span class="flash-back">' + S.inline(cur.short) + '</span>';
        var act = root.querySelector('#lc-act');
        act.innerHTML = '<button type="button" class="btn" id="lc-no">✘ Nem tudtam</button><button type="button" class="btn primary" id="lc-yes">✔ Tudtam</button>' +
          '<a class="btn" href="#/egyetem/' + c.id + '/fogalom/' + cur.id + '">Részletek</a>';
        act.querySelector('#lc-yes').addEventListener('click', function () { answer(true); });
        act.querySelector('#lc-no').addEventListener('click', function () { answer(false); });
        act.querySelector('#lc-yes').focus();
      });
    }
    function answer(ok) {
      seen++; if (ok) good++;
      boxes[cur.id] = ok ? Math.min(5, (boxes[cur.id] || 1) + 1) : 1;
      S.store.set(key, boxes);
      queue.shift();
      if (!ok) queue.splice(Math.min(queue.length, 3), 0, cur); // hamarosan újra előjön
      if (seen > 24) queue = [];
      show();
    }
    build(); show();
  }

  /* Automatikus kvíz: definíció → fogalom, fogalom → angol megfelelő. */
  function autoQuiz(c) {
    var terms = c.terms;
    return S.shuffle(terms).slice(0, Math.min(8, terms.length)).map(function (t) {
      var others = S.shuffle(terms.filter(function (x) { return x !== t; })).slice(0, 3);
      if (t.en && Math.random() < 0.3 && others.every(function (o) { return o.en; })) {
        return { q: 'Mi a(z) **' + t.term + '** angol szakkifejezése?', options: [t.en].concat(others.map(function (o) { return o.en; })), answer: 0, explain: t.term + ' = ' + t.en + '. ' + t.short };
      }
      return { q: 'Melyik fogalomra illik ez a meghatározás? „' + t.short + '”', options: [t.term].concat(others.map(function (o) { return o.term; })), answer: 0, explain: '**' + t.term + '**' + (t.en ? ' (' + t.en + ')' : '') + '.' };
    });
  }

  /* ---------- oldalak ---------- */
  /* Tudományterületek a kurzuslistához (a kurzus a `field` mezővel felülírhatja). */
  var FIELDS = [['mernok', '⚙️ Mérnöki tudományok'], ['info', '💻 Informatika'], ['termtud', '🔬 Matematika és természettudomány'], ['elet', '🧬 Orvos- és élettudomány'], ['gazd', '📊 Gazdaság- és társadalomtudomány'], ['egyeb', '📚 Egyéb']];
  var FIELD_OF = { villamosmernoki: 'mernok', 'e-mobilitas': 'mernok', mechanika: 'mernok', elektronika: 'mernok', szabalyozas: 'mernok',
    'digitalis-technika': 'info', algoritmusok: 'info', programozas: 'info', adatbazis: 'info',
    analizis: 'termtud', 'linearis-algebra': 'termtud', valszam: 'termtud', 'fizika-bsc': 'termtud', 'kemia-bsc': 'termtud', 'szerves-kemia': 'termtud',
    anatomia: 'elet', kozgazdasagtan: 'gazd' };
  S.pageUniList = function (main) {
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Egyetem</span></nav>' +
      '<h1>Egyetemi szakszótár és vizuális jegyzet</h1><p class="lead">Szakszavak érthetően, ábrákkal és angol megfelelővel. Kattintható képletek, fogalomtérkép, ami megmutatja, mi mivel függ össze, és tanulókártyák a vizsgára készüléshez.</p>' +
      ['bsc', 'msc'].map(function (deg) {
        var all = S.courses.filter(function (c) { return (c.degree || 'bsc') === deg; });
        if (!all.length) return '';
        return '<h2 class="deg-title">' + (deg === 'msc' ? '🎓 MSc – mesterképzés <small class="muted">a BSc-re épülő, haladó kurzusok</small>' : '📘 BSc – alapképzés') + '</h2>' +
          FIELDS.map(function (f) {
            var list = all.filter(function (c) { return (c.field || FIELD_OF[c.id] || 'egyeb') === f[0]; });
            return list.length ? '<div class="section-title"><h3>' + f[1] + '</h3><span class="muted">' + list.length + ' kurzus</span></div><div class="grid">' + list.map(function (c) {
              return '<a class="card tile" style="--tile:' + c.color + '" href="#/egyetem/' + c.id + '"><span class="ico">' + c.icon + '</span><h3>' + esc(c.title) + (deg === 'msc' ? ' <span class="badge msc">MSc</span>' : '') + '</h3><p>' + esc(c.description) + '</p>' +
                '<span class="meta">' + esc(c.level || '') + ' · ' + c.terms.length + ' szakszó · ' + (c.formulas || []).length + ' képlet</span></a>';
            }).join('') + '</div>' : '';
          }).join('');
      }).join('');
  };

  S.pageCourse = function (main, id, tab) {
    var c = S.courseById(id);
    if (!c) return false;
    c.formulas = c.formulas || [];
    tab = tab || 'szotar';
    var TABS = [['szotar', '📖 Szakszótár'], ['terkep', '🕸️ Fogalomtérkép'], ['kepletek', '∑ Képletek'], ['kartyak', '🃏 Tanulókártyák'], ['kviz', '✔ Kvíz']];
    setTimeout(function () { var k = main.querySelector('.tabs.big'); if (k) k.insertAdjacentHTML('beforeend', '<a href="#/teszt?targy=' + c.id + '">📝 Teszt</a>'); }, 0);
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/egyetem">Egyetem</a><span>›</span><span>' + esc(c.title) + '</span></nav>' +
      '<div class="subject-head" style="--tile:' + c.color + '"><span class="ico">' + c.icon + '</span><div><h1>' + esc(c.title) + '</h1><p class="lead" style="margin:0">' + esc(c.description) + '</p></div></div>' +
      (c.builds && c.builds.length ? '<p class="builds">🧱 <b>Erre épül (érdemes előbb ezeket nézni):</b> ' + c.builds.map(function (id) { var x = S.courseById(id); return x ? '<a class="chip" href="#/egyetem/' + x.id + '">' + x.icon + ' ' + esc(x.title) + '</a>' : ''; }).join(' ') + '</p>' : '') +
      (S.level !== 'egyetem' && S.simpleOf(c.id, '_course') ? '<section class="simple-box card pad"><div class="sb-head"><span class="sb-ico">🎒</span><b>Miről szól ez a kurzus? – egyszerűen</b></div>' + md(S.simpleOf(c.id, '_course')) +
        '<p class="muted" style="font-size:.9rem">Iskolai nézetben vagy: a szakszavaknál elöl egyszerű magyarázatot látsz. A fejlécben válthatsz egyetemi szintre.</p></section>'
        : (c.intro ? '<div class="lesson-body">' + md(c.intro) + '</div>' : '')) +
      '<div class="tabs big" role="tablist">' + TABS.map(function (t) {
        return '<a role="tab" aria-selected="' + (t[0] === tab) + '" class="' + (t[0] === tab ? 'on' : '') + '" href="#/egyetem/' + c.id + '/' + t[0] + '">' + t[1] + '</a>';
      }).join('') + '</div><div id="uni-body"></div>';
    var body = main.querySelector('#uni-body');

    if (tab === 'szotar') {
      var topic = '', q = '';
      body.innerHTML = '<div class="row" style="margin-bottom:12px"><input type="search" class="filter" id="gl-q" placeholder="Szűrés a szakszavak között (magyarul vagy angolul)…" aria-label="Szűrés">' +
        '</div><div class="chips" id="gl-topics" style="margin:0 0 14px"><button type="button" class="chip on" data-t="">Mind</button>' + (c.topics || []).map(function (t) {
          return '<button type="button" class="chip" data-t="' + t.id + '" style="--tc:' + topicColor(c, t.id) + '"><i class="dot"></i>' + esc(t.title) + '</button>';
        }).join('') + '</div><div id="gl-list"></div>';
      var paint = function () {
        var nq = S.norm(q);
        var list = sortTerms(c.terms).filter(function (t) {
          return (!topic || t.topic === topic) && (!nq || S.norm(t.term + ' ' + (t.en || '') + ' ' + t.short).indexOf(nq) >= 0);
        });
        var groups = {}, order = [];
        list.forEach(function (t) { var L = t.term.charAt(0).toUpperCase(); if (!groups[L]) { groups[L] = []; order.push(L); } groups[L].push(t); });
        body.querySelector('#gl-list').innerHTML = list.length ? order.map(function (L) {
          return '<h3 class="letter">' + esc(L) + '</h3><div class="gl-grid">' + groups[L].map(function (t) {
            return '<a class="card gl-item" style="--tc:' + topicColor(c, t.topic) + '" href="#/egyetem/' + c.id + '/fogalom/' + t.id + '"><b>' + esc(t.term) + '</b>' +
              (t.en ? '<small>🇬🇧 ' + esc(t.en) + '</small>' : '') + '<span>' + S.inline(S.termShort(c, t)) + '</span></a>';
          }).join('') + '</div>';
        }).join('') : '<div class="empty card">Nincs ilyen szakszó.</div>';
      };
      body.querySelector('#gl-q').addEventListener('input', function (e) { q = e.target.value; paint(); });
      body.querySelectorAll('#gl-topics .chip').forEach(function (b) {
        b.addEventListener('click', function () {
          topic = b.dataset.t;
          body.querySelectorAll('#gl-topics .chip').forEach(function (x) { x.classList.toggle('on', x === b); });
          paint();
        });
      });
      paint();
    } else if (tab === 'terkep') {
      body.innerHTML = '<p class="muted">Minden pont egy fogalom, a vonalak a kapcsolatokat jelölik. Minél nagyobb a pont, annál több mindennel függ össze. Kattints egy pontra!</p>' +
        '<div class="chips" style="margin:0 0 10px">' + (c.topics || []).map(function (t) { return '<span class="chip" style="--tc:' + topicColor(c, t.id) + '"><i class="dot"></i>' + esc(t.title) + '</span>'; }).join('') + '</div>' +
        '<div class="map-layout"><div class="card" style="padding:8px">' + mapHtml(c) + '</div><aside class="card pad" id="map-side"><p class="muted">Válassz egy fogalmat a térképen.</p></aside></div>';
      var svg = body.querySelector('.cmap'), L = links(c);
      var pick = function (id) {
        svg.classList.add('has-sel');
        svg.querySelectorAll('.node').forEach(function (g) { g.classList.toggle('sel', g.dataset.id === id); g.classList.toggle('nb', L[id].indexOf(g.dataset.id) >= 0); });
        svg.querySelectorAll('line').forEach(function (l) { l.classList.toggle('sel', l.dataset.a === id || l.dataset.b === id); });
        var t = termById(c, id);
        body.querySelector('#map-side').innerHTML = termHtml(c, t, true) + '<p><a class="btn primary" href="#/egyetem/' + c.id + '/fogalom/' + id + '">Teljes leírás →</a></p>';
        bindFormulas(body.querySelector('#map-side'), c.formulas);
        S.mountWidgets(body.querySelector('#map-side'));
      };
      svg.querySelectorAll('.node').forEach(function (g) {
        g.addEventListener('click', function () { pick(g.dataset.id); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(g.dataset.id); } });
      });
    } else if (tab === 'kepletek') {
      body.innerHTML = c.formulas.length ? '<p class="muted">Minden színes jel kattintható: megmutatja, mit jelent és mi a mértékegysége.</p>' + c.formulas.map(formulaHtml).join('') : '<div class="empty card">Ehhez a kurzushoz még nincs képlet.</div>';
      bindFormulas(body, c.formulas);
    } else if (tab === 'kartyak') {
      cardsBox(body, c);
    } else if (tab === 'kviz') {
      body.innerHTML = '<p class="muted">A kérdések minden alkalommal a szakszótárból generálódnak újra.</p><div class="quiz card" id="uq"></div>';
      S.renderQuiz(body.querySelector('#uq'), autoQuiz(c), 'course/' + c.id);
    }
    return true;
  };

  S.pageTerm = function (main, cid, tid) {
    var c = S.courseById(cid), t = c && termById(c, tid);
    if (!t) return false;
    c.formulas = c.formulas || [];
    var sorted = sortTerms(c.terms), i = sorted.indexOf(t), prev = sorted[i - 1], next = sorted[i + 1];
    var school = S.level !== 'egyetem', simple = school && S.simpleOf(c.id, t.id), pre = prereqLinks(t);
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/egyetem">Egyetem</a><span>›</span><a href="#/egyetem/' + c.id + '">' + esc(c.title) + '</a><span>›</span><span>' + esc(t.term) + '</span></nav>' +
      (school && !simple ? '<div class="note" style="margin-bottom:14px"><b class="t">🎒 Iskolai szinten vagy</b><p>Ez egy egyetemi szakszó. ' +
        (pre.length ? 'Ha még új, ezekkel kezdd: ' + pre.map(function (u) { return '<a href="' + u.href + '">' + u.icon + ' ' + esc(u.label) + '</a>'; }).join(', ') + '. ' : '') +
        '<button type="button" class="linkish" data-level="egyetem">Váltás egyetemi szintre</button></p></div>' : '') +
      (S.toolsHtml ? S.toolsHtml('szakszo:' + c.id + '/' + t.id) : '') +
      (school && simple ? '<div class="lesson-body term-page"><section class="simple-box card pad"><div class="sb-head"><span class="sb-ico">🎒</span><div><small class="muted">' + esc(c.title) + ' · egyszerűen elmagyarázva</small><h1>' + esc(t.term) + '</h1></div></div>' +
        S.md(simple) +
        (pre.length ? '<p class="muted" style="font-size:.92rem">📘 Ha még új, előbb ezeket nézd meg: ' + pre.map(function (u) { return '<a href="' + u.href + '">' + u.icon + ' ' + esc(u.label) + '</a>'; }).join(', ') + '</p>' : '') +
        '</section><details class="school-fold"><summary>🎓 Szakmai magyarázat (egyetemi szint, szakszavakkal) – kattints a lenyitáshoz</summary>' + termHtml(c, t, false) + '</details></div>'
        : '<div class="lesson-body term-page">' + termHtml(c, t, false) + '</div>') +
      '<nav class="pager">' + (prev ? '<a class="btn" href="#/egyetem/' + c.id + '/fogalom/' + prev.id + '">← ' + esc(prev.term) + '</a>' : '<span></span>') +
      (next ? '<a class="btn" href="#/egyetem/' + c.id + '/fogalom/' + next.id + '">' + esc(next.term) + ' →</a>' : '<a class="btn" href="#/egyetem/' + c.id + '">Vissza a szótárhoz</a>') + '</nav>';
    bindFormulas(main, c.formulas);
    S.mountWidgets(main);
    if (S.bindTools) S.bindTools(main, 'szakszo:' + c.id + '/' + t.id, { title: t.term, href: '#/egyetem/' + c.id + '/fogalom/' + t.id, kind: c.title + ' · szakszó', icon: c.icon }, main.querySelector('.term-page'));
    return true;
  };
})();
