/* Tudásműhely – ⚽ Sport és tudomány: sportágak, kedvenc sportolók, leckék, F1-modell.
 * A tartalom a „Tudtad?” tényekből jön: cat: 'sport', sport: 'foci', athletes: ['Puskás Ferenc'] */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  S.SPORTS = [
    ['foci', '⚽', 'Labdarúgás'], ['f1', '🏎️', 'Forma–1'], ['kosar', '🏀', 'Kosárlabda'], ['tenisz', '🎾', 'Tenisz'],
    ['uszas', '🏊', 'Úszás'], ['atletika', '🏃', 'Atlétika'], ['kezilabda', '🤾', 'Kézilabda'], ['vizilabda', '🤽', 'Vízilabda'],
    ['kerekpar', '🚴', 'Kerékpár'], ['vivas', '🤺', 'Vívás'], ['kajak', '🛶', 'Kajak-kenu'], ['jegkorong', '🏒', 'Jégkorong'],
    ['torna', '🤸', 'Torna'], ['kuzdo', '🥊', 'Küzdősportok'], ['teli', '⛷️', 'Téli sportok'], ['sakk', '♟️', 'Sakk'],
    ['altalanos', '💪', 'Sporttudomány']
  ];
  S.sportLabel = function (id) { var x = S.SPORTS.filter(function (s) { return s[0] === id; })[0]; return x ? x[1] + ' ' + x[2] : ''; };

  function sportFacts() { return S.facts.filter(function (f) { return f.cat === 'sport'; }); }
  function athletes() {
    var map = {};
    sportFacts().forEach(function (f) {
      (f.athletes || []).forEach(function (a) { (map[a] = map[a] || { name: a, facts: [], sports: {} }).facts.push(f); map[a].sports[f.sport] = 1; });
    });
    return Object.keys(map).map(function (k) { return map[k]; }).sort(function (a, b) { return b.facts.length - a.facts.length || a.name.localeCompare(b.name, 'hu'); });
  }

  S.pageSport = function (main, params) {
    var sp = params && params.sp || '', who = params && params.ki || '', q = '', theme = params && params.tema || '';
    var all = sportFacts(), ath = athletes();
    var subj = S.subjects.filter(function (s) { return s.id === 'sport'; })[0];
    var counts = {};
    all.forEach(function (f) { counts[f.sport] = (counts[f.sport] || 0) + 1; });

    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Sport</span></nav>' +
      '<section class="sport-hero"><h1>⚽ Sport és tudomány</h1><p class="lead">Miért kanyarodik a szabadrúgás? Hány g-t bír ki egy F1-pilóta? Hogyan edzenek a világ legjobbjai? ' +
      'Tudomány, rekordok és igaz történetek kitartásról és fejlődésről. Pletyka nélkül.</p></section>' +
      '<div class="sport-grid" id="sp-grid">' + S.SPORTS.filter(function (s) { return counts[s[0]]; }).map(function (s) {
        return '<button type="button" class="sport-tile" data-sp="' + s[0] + '"><span class="ico">' + s[1] + '</span><b>' + s[2] + '</b><small>' + counts[s[0]] + ' érdekesség</small></button>';
      }).join('') + '</div>' +
      (all.some(function (f) { return f.theme === 'edzes'; }) ? '<button type="button" class="card train-band" id="sp-train"><span class="ico">🏋️</span><span><b>Így edzenek a legjobbak</b>' +
        '<small>Agyedzés, vizualizáció, alvás, regeneráció, technika: ' + all.filter(function (f) { return f.theme === 'edzes'; }).length + ' tudományos edzéstitok sportolóktól</small></span><span class="btn primary">Mutasd →</span></button>' : '') +
      '<section class="card pad" style="margin-top:16px"><h2 style="margin-top:0">⭐ Ki a kedvenc sportolód?</h2>' +
      '<input type="search" id="sp-who" placeholder="Írd be a nevét, pl. Messi, Hosszú Katinka, Verstappen…" style="width:100%">' +
      '<div class="chips" id="sp-ath" style="margin-top:10px"></div></section>' +
      ((subj || S.models['f1-auto']) ? '<div class="section-title"><h2>📘 Leckék és modellek</h2>' + (subj ? '<a href="#/tantargy/sport">Összes lecke →</a>' : '') + '</div><div class="grid">' +
        (S.models['f1-auto'] ? '<a class="card tile" href="#/felfedezo/f1-auto"><span class="ico">' + S.models['f1-auto'].icon + '</span><b>' + esc(S.models['f1-auto'].title) + '</b><small>Szedd szét alkatrészeire!</small></a>' : '') +
        (subj ? subj.lessons.map(function (l) { return '<a class="card tile" href="#/lecke/sport/' + l.id + '"><span class="ico">' + subj.icon + '</span><b>' + esc(l.title) + '</b><small>' + esc(l.summary || '') + '</small></a>'; }).join('') : '') +
        '</div>' + (subj ? '<p style="margin-top:10px"><a class="btn" href="#/teszt">📝 Sportos teszt a Tesztközpontban</a> <a class="btn" href="#/kartyak/sport">🃏 Tanulókártyák</a></p>' : '') : '') +
      '<div id="sp-list"></div>';

    var list = main.querySelector('#sp-list'), athBox = main.querySelector('#sp-ath');
    function paintAth() {
      var nq = S.norm(q);
      var shown = ath.filter(function (a) { return !nq || S.norm(a.name).indexOf(nq) >= 0; }).filter(function (a) { return !sp || a.sports[sp]; });
      athBox.innerHTML = shown.length ? shown.slice(0, nq ? 60 : 40).map(function (a) {
        return '<button type="button" class="chip' + (a.name === who ? ' on' : '') + '" data-who="' + esc(a.name) + '">' + esc(a.name) + ' <small>(' + a.facts.length + ')</small></button>';
      }).join('') + (!nq && shown.length > 40 ? '<span class="muted" style="align-self:center">… és még ' + (shown.length - 40) + ', keress a nevére!</span>' : '')
        : '<span class="muted">Róla még nincs érdekesség. Nézz körül a sportágak között!</span>';
    }
    function paint() {
      main.querySelectorAll('#sp-grid [data-sp]').forEach(function (b) { b.classList.toggle('on', b.dataset.sp === sp); });
      paintAth();
      var items = all.filter(function (f) { return (!sp || f.sport === sp) && (!who || (f.athletes || []).indexOf(who) >= 0) && (!theme || f.theme === theme); });
      var head = (theme ? '🏋️ Így edzenek a legjobbak' + (sp ? ' · ' : '') : '') + (who ? '⭐ ' + esc(who) : sp ? esc(S.sportLabel(sp)) : theme ? '' : '💡 Válogatás minden sportágból');
      if (!who && !sp && !theme) items = S.shuffle(items.slice()).slice(0, 12);
      var tb = main.querySelector('#sp-train'); if (tb) tb.classList.toggle('on', !!theme);
      list.innerHTML = '<div class="section-title"><h2>' + head + '</h2>' + (sp || who || theme ? '<button type="button" class="linkish" id="sp-reset">Összes sportág</button>' : '<button type="button" class="linkish" id="sp-more">🎲 Másik 12</button>') + '</div>' +
        (items.length ? items.map(function (f) { return S.factCard(f, { open: !!who && items.length <= 3 }); }).join('') : '<p class="muted">Még nincs ilyen érdekesség.</p>');
      S.bindFacts(list);
      var r = list.querySelector('#sp-reset'); if (r) r.addEventListener('click', function () { sp = ''; who = ''; theme = ''; paint(); });
      var m = list.querySelector('#sp-more'); if (m) m.addEventListener('click', paint);
    }
    main.querySelector('#sp-grid').addEventListener('click', function (e) {
      var b = e.target.closest('[data-sp]'); if (!b) return;
      sp = sp === b.dataset.sp ? '' : b.dataset.sp; who = ''; paint();
      list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    athBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-who]'); if (!b) return;
      who = b.dataset.who; paint(); list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    var trb = main.querySelector('#sp-train');
    if (trb) trb.addEventListener('click', function () { theme = theme ? '' : 'edzes'; who = ''; paint(); list.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    main.querySelector('#sp-who').addEventListener('input', function (e) { q = e.target.value; paintAth(); });
    paint();
    return true;
  };
})();
