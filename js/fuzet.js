/* Tudásműhely – Nyomtatható jegyzetfüzet (#/fuzet/<tantárgy>).
 * Egy tantárgy leckéiből szép, nyomtatható (böngészőből PDF-be menthető) összefoglaló füzetet készít:
 * címlap, tartalomjegyzék, leckénként célok, kulcsfogalmak, képletek, a lényeg, statikus ábrák
 * (a kapcsolódó szétszedhető modellek összerakott rajza), interaktív elemek helyett rövid leírás,
 * összefoglaló táblázat, önellenőrző kérdések és külön megoldásoldal. */
(function () {
  'use strict';
  var S = window.STUDIE;
  var esc = S.esc;
  var LV = { 1: 'kezdő', 2: 'haladó', 3: 'profi' };
  var ABC = 'abcdefgh';
  var FONTS = [9, 10, 11, 12, 13, 14];

  /* Interaktív elemek szöveges leírása (a nyomtatott füzetben ezek helyett áll). */
  var WD = {
    ohm: 'Ohm-törvény kísérlet: a feszültség és az ellenállás állításával figyelhető, hogyan változik az áram (I = U / R).',
    'soros-parhuzamos': 'Soros és párhuzamos kapcsolás összehasonlítása: az eredő ellenállás, az áram és a feszültségek számítása.',
    feszultsegeses: 'Feszültségesés-számító: a vezeték hossza, keresztmetszete és az áram alapján.',
    negyutemu: 'Négyütemű motor animáció: szívás, sűrítés, munkaütem, kipufogás egymás után.',
    attetel: 'Áttétel-szimulátor: fogaskerekek fogszáma, fordulatszám és nyomaték kapcsolata.',
    akkupakk: 'Akkupakk-tervező: cellák soros és párhuzamos kötése, feszültség és kapacitás.',
    fuggveny: 'Függvényábrázoló: a paraméterek állításával változik a grafikon.',
    pitagorasz: 'Pitagorasz-szemléltető: a befogókra és az átfogóra rajzolt négyzetek területe.',
    gyakorlas: 'Gyakorló feladatok véletlen számokkal, azonnali visszajelzéssel.',
    hajitas: 'Hajítás-szimulátor: a kezdősebesség és a szög hatása a pályára.',
    atomepito: 'Atomépítő: protonok, neutronok és elektronok hozzáadása, az elem és az ion felismerése.',
    periodusos: 'Interaktív periódusos rendszer: az elemek adatai kattintásra.',
    parositas: 'Párosító játék.',
    idovonal: 'Idővonal-játék: események időrendbe állítása.',
    hibakereses: 'Hibakereső döntési fa: kérdésről kérdésre a hiba okáig.',
    kapcsolas: 'Kapcsolás-építő: alkatrészek összekötése, áramkör kipróbálása.',
    zongora: 'Virtuális zongora: hangok meghallgatása és összehasonlítása.',
    szinkever: 'Színkeverő: additív (fény) és szubtraktív (festék) színkeverés.',
    afa: 'ÁFA-kalkulátor: nettó, bruttó és adótartalom számítása.',
    berkalkulator: 'Bérkalkulátor: bruttó bérből nettó bér, levonásokkal.',
    megtakaritas: 'Megtakarítás-kalkulátor: kamatos kamat és rendszeres befizetés.',
    terheles: 'Terhelés-tervező: edzésterhelés és pihenés egyensúlya.',
    'setup-szim': 'Setup-szimulátor: járműbeállítások hatása a viselkedésre.',
    'mosfet-iv': 'MOSFET-szimuláció: karakterisztika a vezérlőfeszültség függvényében.',
    'cpu-teljesitmeny': 'CPU-teljesítmény szimuláció: órajel, magok és fogyasztás.',
    lepesek: 'Lépésről lépésre levezetett feladatok.'
  };

  function plain(t) { return String(t || '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[\[[^|\]]+\|(.+?)\]\]/g, '$1'); }
  function uniq(arr) {
    var seen = {};
    return arr.filter(function (x) { var k = S.norm(x); if (!k || seen[k]) return false; seen[k] = 1; return true; });
  }
  function lessonText(l) {
    return (l.sections || []).map(function (x) { return [x.text, x.tip, x.warn].filter(Boolean).join('\n'); }).join('\n');
  }
  function keyTerms(l, max) {
    var t = lessonText(l), out = [], m, re = /\*\*(.+?)\*\*/g;
    while ((m = re.exec(t))) {
      var x = plain(m[1]).replace(/[:.,;]+$/, '').trim();
      if (x.length > 1 && x.length <= 42 && !/^\d/.test(x) && !/^[a-záéíóöőúüű]{1,4}$/.test(x)) out.push(x);
    }
    out = uniq(out);
    if (out.length < 3) out = uniq(out.concat(l.tags || []));
    return out.slice(0, max);
  }
  function formulas(l, max) {
    var t = lessonText(l), out = [], m, re = /`([^`]+)`/g;
    while ((m = re.exec(t))) {
      var f = m[1].trim();
      if (f.length <= 64 && /[=≈≤≥∝→]/.test(f) && /[A-Za-zα-ωΔΣ]/.test(f)) out.push(f);
    }
    return uniq(out).slice(0, max);
  }
  function firstBlock(text) { return String(text || '').trim().split(/\n\s*\n/)[0]; }

  /* ---------- beállítások ---------- */
  function conf() {
    var c = S.store.get('fuzet.beall', {});
    return {
      font: FONTS.indexOf(c.font) >= 0 ? c.font : 11,
      compact: !!c.compact,
      notes: c.notes !== false,
      quiz: c.quiz !== false,
      sol: c.sol !== false,
      figs: c.figs !== false,
      level: c.level === 'egyetem' || c.level === 'iskolai' ? c.level : '',
      off: c.off || {}
    };
  }
  function saveConf(c) { S.store.set('fuzet.beall', c); }

  /* ---------- ábrák, interaktív elemek ---------- */
  function modelFigure(id, n, compact) {
    var m = S.models[id];
    if (!m || !m.parts) return '';
    var parts = m.parts.map(function (p, i) { return { p: p, i: i }; })
      .sort(function (a, b) { return ((a.p.z || 0) - (b.p.z || 0)) || (a.i - b.i); })
      .map(function (o) { return '<g>' + (o.p.svg || '') + '</g>'; }).join('');
    return '<figure class="fz-fig' + (compact ? ' fz-fig-sm' : '') + '"><svg viewBox="' + esc(m.viewBox || '0 0 600 420') + '" role="img" aria-label="' + esc(m.title) + '">' +
      (m.backdrop || '') + parts + (m.overlay || '') + '</svg>' +
      '<figcaption><b>' + n + '. ábra: ' + esc(m.title) + '</b>' + (m.scale ? ' <span class="fz-muted">(' + esc(m.scale) + ')</span>' : '') +
      (compact ? '' : '<span class="fz-parts">Részei: ' + m.parts.map(function (p, i) { return (i + 1) + '. ' + esc(p.name); }).join(' · ') + '</span>') +
      '</figcaption></figure>';
  }
  function widgetBox(w, compact) {
    if (!w || !w.type) return '';
    var o = w.options || {}, d = WD[w.type] || 'Interaktív gyakorló elem.', extra = '';
    if (w.type === 'gyakorlas' && o.title) d = o.title + ': gyakorló feladatok véletlen számokkal, azonnali visszajelzéssel.';
    if (w.type === 'hibakereses' && S.troubles && S.troubles[o.tree]) {
      var tr = S.troubles[o.tree];
      d = 'Hibakereső döntési fa – „' + tr.title + '”: kérdésről kérdésre vezet el a hiba okáig.';
      if (!compact && tr.intro) extra = '<p class="fz-small">' + S.inline(tr.intro) + '</p>';
    }
    if (w.type === 'atomepito' && o.p) d = 'Atomépítő: ' + o.p + ' proton, ' + (o.n || 0) + ' neutron, ' + (o.e || 0) + ' elektron – melyik elem, ion-e?';
    if (w.type === 'zongora' && o.title) d = 'Virtuális zongora – ' + o.title + '.';
    if (w.type === 'szinkever') d = o.mode === 'feny' ? 'Színkeverő: a fény additív színkeverése (piros + zöld + kék = fehér).' : WD.szinkever;
    if (w.type === 'parositas' && o.pairs && o.pairs.length) {
      d = (o.title || 'Párosítás') + ' – a helyes párok:';
      extra = '<table class="fz-tab fz-pairs"><tbody>' + o.pairs.map(function (p) {
        return '<tr><td><b>' + S.inline(p[0]) + '</b></td><td>' + S.inline(p[1]) + '</td></tr>';
      }).join('') + '</tbody></table>';
    }
    if (w.type === 'idovonal' && o.events && o.events.length) {
      d = (o.title || 'Idővonal') + ' – az események időrendben:';
      extra = '<ul class="fz-time">' + o.events.slice().sort(function (a, b) { return a.year - b.year; }).map(function (e) {
        return '<li><b>' + esc(e.label || String(e.year)) + '</b> – ' + esc(e.title) + (compact || !e.text ? '' : ': <span class="fz-muted">' + S.inline(e.text) + '</span>') + '</li>';
      }).join('') + '</ul>';
    }
    return '<div class="fz-widget"><span class="fz-wico" aria-hidden="true">🖐</span><div><b>Az online leckében kipróbálható:</b> ' + esc(d) + extra + '</div></div>';
  }

  /* ---------- a füzet ---------- */
  function buildBook(s, c) {
    var lessons = s.lessons.filter(function (l) { return !(c.off[s.id] || []).some(function (x) { return x === l.id; }); });
    var uni = c.level === 'egyetem', cmp = c.compact;
    var notes = c.notes ? S.store.get('notes', {}) : {};
    var figN = 0, qn = 0, quizHtml = '', solHtml = '', sumRows = '';
    var date = new Date().toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
    var mins = lessons.reduce(function (a, l) { return a + (l.minutes || 0); }, 0);

    var cover = '<section class="fz-sheet fz-cover">' +
      '<div class="fz-cover-top">Tudásműhely · ' + esc(S.stageTitle(s.stage).replace(/^\S+\s/, '')) + '</div>' +
      '<div class="fz-cover-ico" aria-hidden="true">' + s.icon + '</div>' +
      '<div class="fz-kicker">Jegyzetfüzet</div><h1 class="fz-title">' + esc(s.title) + '</h1>' +
      (s.description ? '<p class="fz-cover-desc">' + esc(s.description) + '</p>' : '') +
      '<p class="fz-cover-meta">' + lessons.length + ' lecke · kb. ' + mins + ' perc tananyag · ' + (uni ? '🎓 egyetemi / szakmai szint' : '🎒 iskolai szint') + (cmp ? ' · tömör változat' : '') + '</p>' +
      '<div class="fz-cover-lines"><div><span>Név</span><i></i></div><div><span>Osztály / csoport</span><i></i></div><div><span>Kezdés dátuma</span><i></i></div></div>' +
      '<div class="fz-cover-foot">Készült: ' + esc(date) + '</div></section>';

    var toc = '<section class="fz-sheet fz-toc"><h2 class="fz-h">Tartalom</h2><ol class="fz-toc-list">' + lessons.map(function (l, i) {
      return '<li><a href="#/fuzet/' + s.id + '" data-fzjump="fz-l-' + i + '"><b>' + esc(l.title) + '</b></a>' +
        (cmp ? '' : '<small>' + esc((l.sections || []).map(function (x) { return x.title; }).filter(Boolean).join(' · ')) + '</small>') + '</li>';
    }).join('') +
      '<li class="fz-toc-x"><b>Összefoglaló táblázat</b></li>' +
      (c.quiz ? '<li class="fz-toc-x"><b>Önellenőrző kérdések</b></li>' : '') +
      (c.quiz && c.sol ? '<li class="fz-toc-x"><b>Megoldások</b></li>' : '') + '</ol>' +
      '<div class="fz-howto"><b>Hogyan használd?</b> Minden lecke elején a célok és a kulcsfogalmak állnak; ezeket a lecke végén próbáld fejből elmondani. ' +
      'A 🖐 jel olyan részt jelöl, amely az online leckében interaktívan kipróbálható. A kérdések megoldásai a füzet végén, külön oldalon vannak.</div></section>';

    var body = lessons.map(function (l, i) {
      var key = s.id + '/' + l.id, terms = keyTerms(l, cmp ? 8 : 14), fs = formulas(l, cmp ? 6 : 10);
      var lu = uni && S.lessonUni ? S.lessonUni[key] : null;
      var secs = (l.sections || []).map(function (sec) {
        var txt = cmp ? firstBlock(sec.text) : sec.text;
        return '<div class="fz-sec">' + (sec.title ? '<h4>' + esc(sec.title) + '</h4>' : '') + S.md(txt) +
          (!cmp && sec.tip ? '<div class="fz-box fz-tip"><b>Jó tudni:</b> ' + S.md(sec.tip) + '</div>' : '') +
          (sec.warn ? '<div class="fz-box fz-warn"><b>⚠ Figyelem:</b> ' + S.md(cmp ? firstBlock(sec.warn) : sec.warn) + '</div>' : '') +
          (sec.widget && !cmp ? widgetBox(sec.widget, cmp) : '') + '</div>';
      }).join('');
      var ws = (l.widgets || []).concat(cmp ? (l.sections || []).map(function (x) { return x.widget; }).filter(Boolean) : []);
      var figs = c.figs ? (l.models || []).filter(function (m) { return S.models[m]; }).slice(0, cmp ? 1 : 2).map(function (m) { return modelFigure(m, ++figN, cmp); }).join('') : '';
      var note = notes['lecke:' + key] && notes['lecke:' + key].text;
      sumRows += '<tr><td>' + (i + 1) + '.</td><td><b>' + esc(l.title) + '</b></td><td>' + esc(terms.slice(0, 6).join(', ')) + '</td>' +
        '<td>' + (fs.length ? fs.slice(0, 3).map(function (f) { return S.inline('`' + f + '`'); }).join('<br>') : '–') + '</td><td>' + (LV[l.level || 1] || '') + (l.minutes ? '<br>' + l.minutes + ' perc' : '') + '</td></tr>';
      var qs = (l.quiz || []).slice(0, cmp ? 2 : 6);
      if (qs.length && c.quiz) {
        quizHtml += '<div class="fz-qblock"><h4>' + (i + 1) + '. ' + esc(l.title) + '</h4><ol class="fz-qs" start="' + (qn + 1) + '">' + qs.map(function (q) {
          return '<li><div class="fz-q">' + S.inline(q.q) + '</div><ol class="fz-opts" type="a">' + (q.options || []).map(function (o) { return '<li><span class="fz-cb"></span>' + S.inline(String(o)) + '</li>'; }).join('') + '</ol></li>';
        }).join('') + '</ol></div>';
        solHtml += '<div class="fz-solblock"><h4>' + (i + 1) + '. ' + esc(l.title) + '</h4><ol class="fz-sols" start="' + (qn + 1) + '">' + qs.map(function (q) {
          var a = (q.options || [])[q.answer];
          return '<li><b>' + ABC.charAt(q.answer) + ')</b> ' + S.inline(String(a == null ? '' : a)) + (cmp || !q.explain ? '' : '<div class="fz-small">' + S.inline(q.explain) + '</div>') + '</li>';
        }).join('') + '</ol></div>';
        qn += qs.length;
      }
      return '<section class="fz-sheet fz-lesson" id="fz-l-' + i + '">' +
        '<div class="fz-lhead"><span class="fz-lnum">' + (i + 1) + '</span><div><div class="fz-kicker">' + esc(s.title) + ' · ' + (i + 1) + '. lecke · ' + (LV[l.level || 1] || '') + (l.minutes ? ' · kb. ' + l.minutes + ' perc' : '') + '</div>' +
        '<h3 class="fz-ltitle">' + esc(l.title) + '</h3></div></div>' +
        '<p class="fz-lead">' + esc(plain(l.summary)) + '</p>' +
        '<div class="fz-goals"><div class="fz-goal"><h5>🎯 Célok – a lecke végére tudni fogod</h5><ul>' + (l.sections || []).filter(function (x) { return x.title; }).slice(0, 6).map(function (x) { return '<li>' + esc(x.title) + '</li>'; }).join('') + '</ul></div>' +
        (terms.length ? '<div class="fz-goal"><h5>🔑 Kulcsfogalmak</h5><p class="fz-terms">' + terms.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</p></div>' : '') + '</div>' +
        (fs.length ? '<div class="fz-formulas"><h5>📐 Képletek, összefüggések</h5><ul>' + fs.map(function (f) { return '<li>' + S.inline('`' + f + '`') + '</li>'; }).join('') + '</ul></div>' : '') +
        '<div class="fz-body' + (cmp ? ' fz-cmp' : '') + '">' + secs + '</div>' + figs +
        ws.map(function (w) { return widgetBox(w, cmp); }).join('') +
        (lu ? '<div class="fz-uni"><h5>🎓 Egyetemi / szakmai kiegészítés</h5>' + (lu.text ? S.md(cmp ? firstBlock(lu.text) : lu.text) : '') +
          (lu.glossary && lu.glossary.length ? '<table class="fz-tab"><thead><tr><th>Magyar</th><th>Szaknyelvi név</th>' + (cmp ? '' : '<th>Jelentés</th>') + '</tr></thead><tbody>' + lu.glossary.map(function (x) {
            return '<tr><td><b>' + esc(x.hu) + '</b></td><td>' + esc([x.latin, x.en].filter(Boolean).join(' · ')) + '</td>' + (cmp ? '' : '<td>' + S.inline(x.def || '') + '</td>') + '</tr>';
          }).join('') + '</tbody></table>' : '') + '</div>' : '') +
        (note ? '<div class="fz-box fz-note"><b>✏️ Saját jegyzetem:</b><div>' + esc(note).replace(/\n/g, '<br>') + '</div></div>' : '') +
        (cmp ? '' : '<div class="fz-lines" aria-label="Hely a saját jegyzeteknek"><span>Jegyzeteim</span><i></i><i></i><i></i><i></i></div>') +
        '</section>';
    }).join('');

    var summary = '<section class="fz-sheet fz-summary"><h2 class="fz-h">Összefoglaló táblázat</h2>' +
      '<div class="fz-tabwrap"><table class="fz-tab fz-sumtab"><thead><tr><th>#</th><th>Lecke</th><th>Kulcsfogalmak</th><th>Fő képletek</th><th>Szint</th></tr></thead><tbody>' + sumRows + '</tbody></table></div></section>';
    var quiz = c.quiz && qn ? '<section class="fz-sheet fz-quiz"><h2 class="fz-h">Önellenőrző kérdések</h2><p class="fz-muted">Karikázd be vagy pipáld ki a helyes választ! Minden kérdésnél egy válasz helyes. A megoldások a következő oldalon vannak – előbb próbáld meg nélkülük.</p>' + quizHtml + '</section>' : '';
    var sols = c.quiz && c.sol && qn ? '<section class="fz-sheet fz-solutions"><h2 class="fz-h">Megoldások</h2>' + solHtml +
      '<p class="fz-score">Eredményem: ______ / ' + qn + ' helyes válasz</p></section>' : '';
    return { html: cover + toc + body + summary + quiz + sols, lessons: lessons.length, q: qn, figs: figN };
  }

  /* fej- és lábléc a nyomtatott oldalakon (Chrome/Edge: @page margódobozok) */
  function pageStyle(s) {
    var el = document.getElementById('fz-page-style');
    if (!el) { el = document.createElement('style'); el.id = 'fz-page-style'; document.head.appendChild(el); }
    var t = (s.title + ' – Jegyzetfüzet').replace(/["\\]/g, '');
    el.textContent = '@page { size: A4; margin: 16mm 15mm 17mm; ' +
      '@top-left { content: "' + t + '"; font: 8pt system-ui, sans-serif; color: #444; } ' +
      '@top-right { content: "Tudásműhely"; font: 8pt system-ui, sans-serif; color: #444; } ' +
      '@bottom-center { content: counter(page) " / " counter(pages); font: 8pt system-ui, sans-serif; color: #444; } } ' +
      '@page :first { @top-left { content: none; } @top-right { content: none; } @bottom-center { content: none; } }';
  }
  if (window.addEventListener) window.addEventListener('hashchange', function () {
    if (!/^#\/fuzet\//.test(location.hash)) { var el = document.getElementById('fz-page-style'); if (el) el.remove(); }
  });

  function pickPage(main) {
    var groups = {};
    S.subjects.forEach(function (s) { (groups[s.stage] = groups[s.stage] || []).push(s); });
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Jegyzetfüzet</span></nav>' +
      '<h1>📓 Nyomtatható jegyzetfüzet</h1><p class="lead">Válassz tantárgyat: a leckékből címlappal, tartalomjegyzékkel, összefoglaló táblázattal és önellenőrző kérdésekkel ellátott füzetet készítünk, amit kinyomtathatsz vagy PDF-be menthetsz.</p>' +
      Object.keys(groups).map(function (g) {
        return '<h2>' + esc(S.stageTitle(g)) + '</h2><div class="chips">' + groups[g].map(function (s) {
          return '<a class="chip" href="#/fuzet/' + s.id + '">' + s.icon + ' ' + esc(s.title) + '</a>';
        }).join('') + '</div>';
      }).join('');
  }

  function page(main, rest) {
    var sid = rest[0];
    if (!sid) { pickPage(main); return; }
    var s = S.subjects.filter(function (x) { return x.id === sid; })[0];
    if (!s) return false;
    var c = conf();
    var lvl = c.level || S.level || 'iskolai';
    var off = c.off[s.id] || [];
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/tantargy/' + s.id + '">' + esc(s.title) + '</a><span>›</span><span>Jegyzetfüzet</span></nav>' +
      '<div class="fz-ui"><h1>📓 Jegyzetfüzet: ' + esc(s.title) + '</h1>' +
      '<p class="lead">Állítsd be, mi kerüljön bele, aztán nyomtasd ki, vagy a nyomtatási ablakban válaszd a <b>„Mentés PDF-ként”</b> lehetőséget.</p>' +
      '<div class="fz-panel card pad">' +
      '<div class="fz-opt"><b>Szint</b><div class="seg" id="fz-level"><button type="button" data-v="iskolai" class="' + (lvl !== 'egyetem' ? 'on' : '') + '">🎒 Iskolai</button><button type="button" data-v="egyetem" class="' + (lvl === 'egyetem' ? 'on' : '') + '">🎓 Egyetemi</button></div>' +
      '<small class="muted">Egyetemi szinten a leckék szaknyelvi kiegészítései és szakszótárai is bekerülnek.</small></div>' +
      '<div class="fz-opt"><b>Betűméret</b><div class="seg" id="fz-font">' + FONTS.map(function (f) { return '<button type="button" data-v="' + f + '" class="' + (c.font === f ? 'on' : '') + '">' + f + ' pt</button>'; }).join('') + '</div></div>' +
      '<div class="fz-checks">' +
      [['compact', 'Tömör mód', 'Csak a lényeg: rövidebb szöveg, kevesebb kérdés, kevesebb oldal.'],
        ['figs', 'Ábrák', 'A leckékhez tartozó modellek rajza.'],
        ['notes', 'Saját jegyzeteim', 'A leckéknél írt jegyzeteid is bekerülnek.'],
        ['quiz', 'Önellenőrző kérdések', 'Feleletválasztós kérdések a füzet végén.'],
        ['sol', 'Megoldások oldal', 'Külön oldalon, magyarázattal.']].map(function (x) {
        return '<label class="ts-topic"><input type="checkbox" data-k="' + x[0] + '"' + (c[x[0]] ? ' checked' : '') + '><span><b>' + x[1] + '</b><br><small class="muted">' + x[2] + '</small></span></label>';
      }).join('') + '</div>' +
      '<details class="fz-pick"' + (off.length ? ' open' : '') + '><summary><b>Leckék</b> <span class="muted" id="fz-cnt"></span></summary>' +
      '<div class="row" style="margin:8px 0"><button type="button" class="btn sm" id="fz-all">Mind</button><button type="button" class="btn sm" id="fz-none">Egyik sem</button></div>' +
      '<div class="fz-lgrid">' + s.lessons.map(function (l, i) {
        return '<label><input type="checkbox" data-l="' + esc(l.id) + '"' + (off.indexOf(l.id) < 0 ? ' checked' : '') + '> ' + (i + 1) + '. ' + esc(l.title) + '</label>';
      }).join('') + '</div></details>' +
      '<div class="row"><button type="button" class="btn primary" id="fz-print">🖨 Nyomtatás / mentés PDF-be</button><span class="muted" id="fz-stat"></span></div>' +
      '</div><h2 class="fz-prevtitle">Előnézet</h2></div>' +
      '<div class="fz-book" id="fz-book"></div>';

    var book = main.querySelector('#fz-book');
    function paint() {
      var cc = conf(); cc.level = lvl;
      var r = buildBook(s, cc);
      book.style.fontSize = cc.font + 'pt';
      book.innerHTML = r.lessons ? r.html : '<div class="card pad">Nincs kiválasztott lecke. Jelölj be legalább egyet!</div>';
      main.querySelector('#fz-stat').textContent = r.lessons + ' lecke · ' + r.figs + ' ábra · ' + r.q + ' kérdés';
      main.querySelector('#fz-cnt').textContent = '(' + r.lessons + ' / ' + s.lessons.length + ' kiválasztva)';
      main.querySelector('#fz-print').disabled = !r.lessons;
      pageStyle(s);
    }
    function upd(fn) { var cc = conf(); fn(cc); saveConf(cc); paint(); }
    main.querySelectorAll('#fz-level button').forEach(function (b) {
      b.addEventListener('click', function () {
        lvl = b.dataset.v; upd(function (cc) { cc.level = lvl; });
        main.querySelectorAll('#fz-level button').forEach(function (x) { x.classList.toggle('on', x === b); });
        if (lvl === 'egyetem' && S.need) S.need(paint);
      });
    });
    main.querySelectorAll('#fz-font button').forEach(function (b) {
      b.addEventListener('click', function () {
        upd(function (cc) { cc.font = +b.dataset.v; });
        main.querySelectorAll('#fz-font button').forEach(function (x) { x.classList.toggle('on', x === b); });
      });
    });
    main.querySelectorAll('.fz-checks input').forEach(function (inp) {
      inp.addEventListener('change', function () { upd(function (cc) { cc[inp.dataset.k] = inp.checked; }); });
    });
    function setOff() {
      var o = []; main.querySelectorAll('.fz-lgrid input').forEach(function (x) { if (!x.checked) o.push(x.dataset.l); });
      upd(function (cc) { cc.off[s.id] = o; });
    }
    main.querySelectorAll('.fz-lgrid input').forEach(function (x) { x.addEventListener('change', setOff); });
    main.querySelector('#fz-all').addEventListener('click', function () { main.querySelectorAll('.fz-lgrid input').forEach(function (x) { x.checked = true; }); setOff(); });
    main.querySelector('#fz-none').addEventListener('click', function () { main.querySelectorAll('.fz-lgrid input').forEach(function (x) { x.checked = false; }); setOff(); });
    main.querySelector('#fz-print').addEventListener('click', function () { window.print(); });
    book.addEventListener('click', function (e) {
      var a = e.target.closest('[data-fzjump]');
      if (!a) return;
      e.preventDefault();
      var t = document.getElementById(a.dataset.fzjump);
      if (t) t.scrollIntoView({ block: 'start' });
    });
    paint();
    /* az egyetemi kiegészítők és a kérdésbank a háttérben töltődnek be */
    if (S.need && !S.lazyReady) S.need(paint);
  }

  S.addRoute('fuzet', { title: 'Jegyzetfüzet', nav: '', page: page });
})();
