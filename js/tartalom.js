/* Tudásműhely – teljes tartalomjegyzék: minden tantárgy, lecke, modell, kurzus, hibakereső és útvonal egy helyen. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  S.pageTartalom = function (main) {
    var html = '', counts = { lecke: 0, modell: 0, szakszo: 0, hiba: 0 };
    S.STAGES.forEach(function (stg) {
      var subs = S.subjects.filter(function (s) { return (s.stage || 'kozep') === stg[0]; });
      if (!subs.length) return;
      html += '<section class="toc-sec"><h2>' + stg[1] + '</h2>' + subs.map(function (s) {
        counts.lecke += s.lessons.length;
        return '<details class="toc-item" data-text="' + esc(S.norm(s.title + ' ' + s.lessons.map(function (l) { return l.title + ' ' + (l.tags || []).join(' '); }).join(' '))) + '">' +
          '<summary><a href="#/tantargy/' + s.id + '">' + s.icon + ' ' + esc(s.title) + '</a> <small class="muted">' + s.lessons.length + ' lecke</small></summary><ol>' +
          s.lessons.map(function (l) { return '<li><a href="#/lecke/' + s.id + '/' + l.id + '">' + esc(l.title) + '</a></li>'; }).join('') + '</ol></details>';
      }).join('') + '</section>';
    });
    var models = Object.keys(S.models).map(function (k) { return S.models[k]; }), cats = {};
    models.forEach(function (m) { (cats[m.category || 'Egyéb'] = cats[m.category || 'Egyéb'] || []).push(m); });
    counts.modell = models.length;
    html += '<section class="toc-sec"><h2>🔍 Mi miből áll?</h2>' + Object.keys(cats).map(function (c) {
      return '<details class="toc-item" data-text="' + esc(S.norm(c + ' ' + cats[c].map(function (m) { return m.title + ' ' + m.parts.map(function (p) { return p.name; }).join(' '); }).join(' '))) + '">' +
        '<summary><b>' + esc(c) + '</b> <small class="muted">' + cats[c].length + ' modell</small></summary><ul>' +
        cats[c].map(function (m) { return '<li><a href="#/felfedezo/' + m.id + '">' + m.icon + ' ' + esc(m.title) + '</a> <small class="muted">(' + m.parts.length + ' alkatrész)</small></li>'; }).join('') + '</ul></details>';
    }).join('') + '</section>';
    html += '<section class="toc-sec"><h2>🎓 Egyetem</h2>' + (S.courses || []).map(function (c) {
      counts.szakszo += c.terms.length;
      return '<details class="toc-item" data-text="' + esc(S.norm(c.title + ' ' + c.terms.map(function (t) { return t.term + ' ' + (t.en || ''); }).join(' '))) + '">' +
        '<summary><a href="#/egyetem/' + c.id + '">' + c.icon + ' ' + esc(c.title) + '</a> <small class="muted">' + c.terms.length + ' szakszó</small></summary><p class="toc-terms">' +
        c.terms.slice().sort(function (a, b) { return a.term.localeCompare(b.term, 'hu'); }).map(function (t) { return '<a href="#/egyetem/' + c.id + '/fogalom/' + t.id + '">' + esc(t.term) + '</a>'; }).join(' · ') + '</p></details>';
    }).join('') + '</section>';
    var trs = Object.keys(S.troubles || {}).map(function (k) { return S.troubles[k]; });
    counts.hiba = trs.length;
    html += '<section class="toc-sec"><h2>🛠️ Hibakeresők</h2><details class="toc-item" open data-text="' + esc(S.norm(trs.map(function (t) { return t.title; }).join(' '))) + '"><summary><b>Lépésről lépésre hibakeresés</b> <small class="muted">' + trs.length + ' döntési fa</small></summary><ul>' +
      trs.map(function (t) { var ref = (t.lessons || [])[0]; return ref ? '<li><a href="#/lecke/' + ref + '">' + esc(t.title) + '</a></li>' : ''; }).join('') + '</ul></details></section>';
    html += '<section class="toc-sec"><h2>🧭 Tanulási útvonalak</h2><details class="toc-item" open data-text="' + esc(S.norm((S.paths || []).map(function (p) { return p.title; }).join(' '))) + '"><summary><b>Célirányos tervek</b> <small class="muted">' + (S.paths || []).length + ' útvonal</small></summary><ul>' +
      (S.paths || []).map(function (p) { return '<li><a href="#/utvonal/' + p.id + '">' + p.icon + ' ' + esc(p.title) + '</a></li>'; }).join('') + '</ul></details></section>';

    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Tartalomjegyzék</span></nav><h1>Teljes tartalomjegyzék</h1>' +
      '<p class="lead">' + S.subjects.length + ' tantárgy, ' + counts.lecke + ' lecke, ' + counts.modell + ' szétszedhető modell, ' + (S.courses || []).length + ' egyetemi kurzus ' + counts.szakszo + ' szakszóval, ' + counts.hiba + ' hibakereső.</p>' +
      '<div class="row" style="margin-bottom:12px"><input type="search" id="toc-q" class="filter" placeholder="Szűrés a tartalomjegyzékben…" aria-label="Szűrés">' +
      '<button type="button" class="btn" id="toc-open">Mind kinyit</button><button type="button" class="btn" id="toc-print">🖨 Nyomtatás</button></div><div id="toc">' + html + '</div>';
    var q = main.querySelector('#toc-q');
    q.addEventListener('input', function () {
      var nq = S.norm(q.value.trim());
      main.querySelectorAll('.toc-item').forEach(function (d) {
        var hit = !nq || d.dataset.text.indexOf(nq) >= 0;
        d.hidden = !hit; if (nq && hit) d.open = true;
        if (nq) d.querySelectorAll('li, .toc-terms a').forEach(function (li) { li.classList.toggle('dim', S.norm(li.textContent).indexOf(nq) < 0); });
        else d.querySelectorAll('.dim').forEach(function (x) { x.classList.remove('dim'); });
      });
      main.querySelectorAll('.toc-sec').forEach(function (sec) { sec.hidden = !sec.querySelector('.toc-item:not([hidden])'); });
    });
    main.querySelector('#toc-open').addEventListener('click', function () {
      var all = main.querySelectorAll('.toc-item'), open = Array.prototype.some.call(all, function (d) { return !d.open; });
      all.forEach(function (d) { d.open = open; }); this.textContent = open ? 'Mind becsuk' : 'Mind kinyit';
    });
    main.querySelector('#toc-print').addEventListener('click', function () { main.querySelectorAll('.toc-item').forEach(function (d) { d.open = true; }); window.print(); });
  };
})();
