/* Tudásműhely – ✏️ Saját kérdések és kártyák.
 * Diák vagy tanár saját paklit (kérdéssort) írhat: 4 válaszos kérdések magyarázattal.
 * Gyakorlás teszt- vagy kártyamódban, nyomtatható feladatlap, megosztás fájlként (.json) vagy linkként.
 * Útvonal: #/sajat, #/sajat/<pakliId>, #/sajat?p=<kód> (megosztott pakli importálása). Tárolás: 'sajat.paklik'. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  function decks() { return S.store.get('sajat.paklik', []); }
  function saveDecks(d) { S.store.set('sajat.paklik', d); }
  function byId(id) { return decks().filter(function (d) { return d.id === id; })[0]; }
  function upsert(deck) { var d = decks(), i = d.findIndex(function (x) { return x.id === deck.id; }); if (i >= 0) d[i] = deck; else d.unshift(deck); saveDecks(d); }
  function enc(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_'); }
  function dec(s) { try { s = s.replace(/-/g, '+').replace(/_/g, '/'); return JSON.parse(decodeURIComponent(escape(atob(s)))); } catch (e) { return null; } }
  function clean(deck) {
    return { id: deck.id || 'p' + Date.now().toString(36), title: String(deck.title || 'Saját pakli').slice(0, 80),
      items: (deck.items || []).filter(function (q) { return q && q.q && q.options && q.options.length >= 2; }).map(function (q) {
        return { q: String(q.q).slice(0, 500), options: q.options.slice(0, 4).map(function (o) { return String(o).slice(0, 200); }), answer: Math.max(0, Math.min(3, +q.answer || 0)), explain: String(q.explain || '').slice(0, 600) };
      }) };
  }
  function items(deck) {
    return deck.items.map(function (q, i) {
      return { q: Object.assign({ id: 'sajat-' + deck.id + '-' + i }, q), g: { id: 'sajat-' + deck.id, title: deck.title, icon: '✏️', srs: true }, t: { id: 'sajat', title: deck.title, href: '#/sajat/' + deck.id } };
    });
  }

  S.addRoute('sajat', { title: 'Saját kérdések', nav: 'teszt', page: function (main, rest, params) {
    if (params && params.p) return importView(main, params.p);
    if (rest[0]) { var d = byId(rest[0]); if (!d) return false; return editor(main, d); }
    var list = decks();
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/teszt">Tesztközpont</a><span>›</span><span>Saját kérdések</span></nav>' +
      '<h1>✏️ Saját kérdések és kártyák</h1><p class="lead">Írd meg a saját kérdéseidet (pl. a holnapi dolgozat anyagából), gyakorolj velük tesztként vagy kártyákkal, és oszd meg az osztálytársaiddal – internet és regisztráció nélkül.</p>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap"><button type="button" class="btn primary" id="sj-new">➕ Új pakli</button><label class="btn" style="cursor:pointer">📂 Megnyitás fájlból<input type="file" id="sj-file" accept=".json,application/json" hidden></label></div>' +
      (list.length ? '<div class="sj-list">' + list.map(function (d) {
        return '<div class="card pad sj-deck"><div><b>' + esc(d.title) + '</b><small class="muted">' + d.items.length + ' kérdés</small></div><div class="row" style="gap:6px;flex-wrap:wrap">' +
          '<a class="btn sm" href="#/sajat/' + d.id + '">✏️ Szerkesztés</a>' + (d.items.length ? '<button type="button" class="btn sm primary" data-play="' + d.id + '">▶ Teszt</button><button type="button" class="btn sm" data-cards="' + d.id + '">🃏 Kártyák</button>' : '') + '</div></div>';
      }).join('') + '</div>' : '<p class="note">Még nincs saját paklid. Kezdj egyet a „➕ Új pakli” gombbal!</p>');
    main.querySelector('#sj-new').addEventListener('click', function () { var d = clean({ title: 'Új pakli', items: [] }); upsert(d); location.hash = '#/sajat/' + d.id; });
    main.querySelector('#sj-file').addEventListener('change', function (e) {
      var f = e.target.files[0]; if (!f) return;
      var r = new FileReader(); r.onload = function () { try { var d = clean(JSON.parse(r.result)); d.id = 'p' + Date.now().toString(36); if (!d.items.length) throw 0; upsert(d); location.hash = '#/sajat/' + d.id; } catch (er) { alert('Ez a fájl nem saját kérdéspakli.'); } };
      r.readAsText(f);
    });
    main.querySelectorAll('[data-play]').forEach(function (b) { b.addEventListener('click', function () { var d = byId(b.dataset.play); S.runTest(main, S.shuffle(items(d)), 'azonnali', { label: '✏️ ' + d.title, backHref: '#/sajat', backLabel: 'Saját kérdések' }); }); });
    main.querySelectorAll('[data-cards]').forEach(function (b) { b.addEventListener('click', function () { cards(main, byId(b.dataset.cards)); }); });
    return true;
  } });

  function editor(main, d) {
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/sajat">Saját kérdések</a><span>›</span><span>' + esc(d.title) + '</span></nav>' +
      '<div class="card pad"><label class="pw-f"><span>A pakli címe</span><input id="sj-title" value="' + esc(d.title) + '"></label>' +
      '<div class="row sj-actions"><button type="button" class="btn primary" id="sj-play"' + (d.items.length ? '' : ' disabled') + '>▶ Teszt</button><button type="button" class="btn" id="sj-cards"' + (d.items.length ? '' : ' disabled') + '>🃏 Kártyák</button>' +
      '<button type="button" class="btn" id="sj-print"' + (d.items.length ? '' : ' disabled') + '>🖨 Feladatlap</button><button type="button" class="btn" id="sj-link"' + (d.items.length ? '' : ' disabled') + '>🔗 Megosztás linkkel</button>' +
      '<button type="button" class="btn" id="sj-save">💾 Mentés fájlba</button><button type="button" class="btn" id="sj-del">🗑 Pakli törlése</button></div><div id="sj-linkout"></div></div>' +
      '<h2>Kérdések (' + d.items.length + ')</h2><ol class="sj-qs">' + d.items.map(function (q, i) {
        return '<li><div><b>' + S.inline(q.q) + '</b><br><small>✓ ' + esc(q.options[q.answer]) + ' · ✗ ' + q.options.filter(function (o, k) { return k !== q.answer; }).map(esc).join(' · ') + '</small></div>' +
          '<span class="row" style="gap:4px"><button type="button" class="btn sm" data-edit="' + i + '">✏️</button><button type="button" class="btn sm" data-rm="' + i + '">🗑</button></span></li>';
      }).join('') + '</ol>' +
      '<div class="card pad" id="sj-form"><h3 style="margin-top:0" id="sj-ftitle">➕ Új kérdés</h3>' +
      '<label class="pw-f"><span>Kérdés</span><textarea id="sj-q" rows="2"></textarea></label>' +
      [0, 1, 2, 3].map(function (k) { return '<label class="sj-opt"><input type="radio" name="sj-ok" value="' + k + '"' + (k === 0 ? ' checked' : '') + ' title="Ez a helyes"><input type="text" id="sj-o' + k + '" placeholder="' + (k === 0 ? 'Helyes válasz (vagy jelöld a körrel, melyik a jó)' : (k + 1) + '. válasz') + '"></label>'; }).join('') +
      '<label class="pw-f"><span>Magyarázat (nem kötelező)</span><input id="sj-ex"></label><p class="row" style="gap:6px"><button type="button" class="btn primary" id="sj-add">✔ Kérdés mentése</button><button type="button" class="btn" id="sj-cancel" hidden>Mégse</button></p>' +
      '<details><summary>⚡ Gyors bevitel sok kérdéshez</summary><p class="muted">Soronként egy kérdés: <code>kérdés | helyes válasz | rossz 1 | rossz 2 | rossz 3</code></p><textarea id="sj-bulk" rows="5" style="width:100%"></textarea><p><button type="button" class="btn" id="sj-bulkadd">➕ Mind hozzáadása</button></p></details></div>';
    var editing = -1;
    function persist() { d.title = main.querySelector('#sj-title').value || 'Saját pakli'; upsert(clean(d)); }
    main.querySelector('#sj-title').addEventListener('change', persist);
    function fill(i) {
      var q = d.items[i]; editing = i;
      main.querySelector('#sj-ftitle').textContent = '✏️ ' + (i + 1) + '. kérdés szerkesztése';
      main.querySelector('#sj-q').value = q.q; [0, 1, 2, 3].forEach(function (k) { main.querySelector('#sj-o' + k).value = q.options[k] || ''; });
      main.querySelector('input[name=sj-ok][value="' + q.answer + '"]').checked = true; main.querySelector('#sj-ex').value = q.explain || '';
      main.querySelector('#sj-cancel').hidden = false; main.querySelector('#sj-form').scrollIntoView({ behavior: 'smooth' });
    }
    main.querySelector('#sj-add').addEventListener('click', function () {
      var q = main.querySelector('#sj-q').value.trim(), opts = [0, 1, 2, 3].map(function (k) { return main.querySelector('#sj-o' + k).value.trim(); });
      var ok = +main.querySelector('input[name=sj-ok]:checked').value;
      if (!q || !opts[ok]) { alert('Írd be a kérdést és a helyes választ!'); return; }
      var filled = opts.map(function (o, k) { return { o: o, k: k }; }).filter(function (x) { return x.o; });
      if (filled.length < 2) { alert('Legalább két válaszlehetőség kell.'); return; }
      var item = { q: q, options: filled.map(function (x) { return x.o; }), answer: filled.findIndex(function (x) { return x.k === ok; }), explain: main.querySelector('#sj-ex').value.trim() };
      if (editing >= 0) d.items[editing] = item; else d.items.push(item);
      persist(); editor(main, d);
    });
    main.querySelector('#sj-cancel').addEventListener('click', function () { editor(main, d); });
    main.querySelector('#sj-bulkadd').addEventListener('click', function () {
      var n = 0; main.querySelector('#sj-bulk').value.split('\n').forEach(function (line) {
        var p = line.split('|').map(function (x) { return x.trim(); }).filter(Boolean);
        if (p.length >= 3) { d.items.push({ q: p[0], options: p.slice(1, 5), answer: 0, explain: '' }); n++; }
      });
      if (!n) { alert('Nem találtam érvényes sort. Formátum: kérdés | helyes | rossz 1 | rossz 2 | rossz 3'); return; }
      persist(); editor(main, d);
    });
    main.querySelectorAll('[data-edit]').forEach(function (b) { b.addEventListener('click', function () { fill(+b.dataset.edit); }); });
    main.querySelectorAll('[data-rm]').forEach(function (b) { b.addEventListener('click', function () { if (confirm('Törlöd ezt a kérdést?')) { d.items.splice(+b.dataset.rm, 1); persist(); editor(main, d); } }); });
    main.querySelector('#sj-play').addEventListener('click', function () { persist(); S.runTest(main, S.shuffle(items(d)), 'azonnali', { label: '✏️ ' + d.title, backHref: '#/sajat/' + d.id, backLabel: d.title }); });
    main.querySelector('#sj-cards').addEventListener('click', function () { persist(); cards(main, d); });
    main.querySelector('#sj-print').addEventListener('click', function () { persist(); S.printSheet(items(d), d.title); });
    main.querySelector('#sj-save').addEventListener('click', function () {
      persist(); var blob = new Blob([JSON.stringify(clean(d), null, 1)], { type: 'application/json' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = (d.title || 'pakli').replace(/[^\wáéíóöőúüűÁÉÍÓÖŐÚÜŰ -]/g, '') + '.json'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    });
    main.querySelector('#sj-link').addEventListener('click', function () {
      persist(); var code = enc(clean(d)), url = location.href.split('#')[0] + '#/sajat?p=' + code;
      main.querySelector('#sj-linkout').innerHTML = (url.length > 8000 ? '<p class="note">⚠️ Ez a pakli nagy, a link nagyon hosszú lett. Ha nem működik, használd a „Mentés fájlba” gombot.</p>' : '') +
        '<input readonly value="' + esc(url) + '" style="width:100%;margin-top:8px;padding:8px;border-radius:8px;border:1px solid var(--line)"><p class="row" style="gap:6px;margin-top:6px"><button type="button" class="btn sm" id="sj-copy">📋 Másolás</button>' + (navigator.share ? '<button type="button" class="btn sm" id="sj-share">📤 Megosztás</button>' : '') + '</p>';
      main.querySelector('#sj-copy').addEventListener('click', function () { var i = main.querySelector('#sj-linkout input'); i.select(); try { navigator.clipboard.writeText(i.value); } catch (e) { document.execCommand('copy'); } this.textContent = '✓ Másolva'; });
      var sh = main.querySelector('#sj-share'); if (sh) sh.addEventListener('click', function () { navigator.share({ title: d.title, text: 'Gyakorolj ezzel a kérdéssorral: ' + d.title, url: url }).catch(function () {}); });
    });
    main.querySelector('#sj-del').addEventListener('click', function () { if (confirm('Biztosan törlöd a teljes paklit?')) { saveDecks(decks().filter(function (x) { return x.id !== d.id; })); location.hash = '#/sajat'; } });
    return true;
  }

  function cards(main, d) {
    var order = S.shuffle(d.items.slice()), i = 0, flipped = false;
    function paint() {
      if (i >= order.length) { main.innerHTML = '<div class="card pad" style="text-align:center"><h2>🃏 Végére értél!</h2><p><button type="button" class="btn primary" id="cd-again">🔁 Újra</button> <a class="btn" href="#/sajat/' + d.id + '">Vissza</a></p></div>'; main.querySelector('#cd-again').addEventListener('click', function () { cards(main, d); }); return; }
      var q = order[i];
      main.innerHTML = '<nav class="crumbs"><a href="#/sajat">Saját kérdések</a><span>›</span><span>' + esc(d.title) + ' – kártyák</span></nav>' +
        '<p class="muted">' + (i + 1) + ' / ' + order.length + ' · koppints a kártyára a megfordításhoz</p><button type="button" class="card sj-card' + (flipped ? ' back' : '') + '" id="cd">' +
        (flipped ? '<b>' + S.inline(q.options[q.answer]) + '</b>' + (q.explain ? '<small>' + S.inline(q.explain) + '</small>' : '') : '<span>' + S.inline(q.q) + '</span>') + '</button>' +
        '<p class="row" style="gap:8px;justify-content:center"><button type="button" class="btn" id="cd-prev"' + (i ? '' : ' disabled') + '>← Előző</button><button type="button" class="btn primary" id="cd-next">Következő →</button></p>';
      main.querySelector('#cd').addEventListener('click', function () { flipped = !flipped; paint(); });
      main.querySelector('#cd-next').addEventListener('click', function () { i++; flipped = false; paint(); });
      main.querySelector('#cd-prev').addEventListener('click', function () { i--; flipped = false; paint(); });
    }
    paint();
  }

  function importView(main, code) {
    var d = dec(code); d = d && clean(d);
    if (!d || !d.items.length) { main.innerHTML = '<p class="note">Ez a link sérült vagy hiányos. Kérd el újra, vagy fájlként.</p>'; return true; }
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/sajat">Saját kérdések</a><span>›</span><span>Megosztott pakli</span></nav>' +
      '<h1>📥 ' + esc(d.title) + '</h1><p class="lead">Valaki megosztott veled egy ' + d.items.length + ' kérdéses paklit.</p>' +
      '<p class="row" style="gap:8px;flex-wrap:wrap"><button type="button" class="btn primary" id="im-play">▶ Kitöltöm most</button><button type="button" class="btn" id="im-save">💾 Elmentem a saját paklijaim közé</button></p>' +
      '<ol class="sj-qs">' + d.items.map(function (q) { return '<li>' + S.inline(q.q) + '</li>'; }).join('') + '</ol>';
    main.querySelector('#im-play').addEventListener('click', function () { S.runTest(main, S.shuffle(items(d)), 'azonnali', { label: '✏️ ' + d.title, backHref: '#/sajat', backLabel: 'Saját kérdések' }); });
    main.querySelector('#im-save').addEventListener('click', function () { d.id = 'p' + Date.now().toString(36); upsert(d); location.hash = '#/sajat/' + d.id; });
    return true;
  }
})();
