/* Tudásműhely – oldalankénti eszköztár: ⭐ kedvenc, 🔊 felolvasás, 📝 saját jegyzet; „Jegyzeteim” oldal.
 * Kulcsok: 'lecke:tantárgy/lecke', 'modell:id', 'szakszo:kurzus/fogalom'. Tárolás: 'favs', 'notes' (a fájlmentésbe is bekerül). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  S.toolsHtml = function (key) {
    var fav = !!S.store.get('favs', {})[key], note = (S.store.get('notes', {})[key] || {}).text || '';
    return '<div class="page-tools" data-key="' + esc(key) + '">' +
      '<button type="button" class="btn sm' + (fav ? ' on' : '') + '" data-tool="fav" aria-pressed="' + fav + '">' + (fav ? '⭐ Kedvenc' : '☆ Kedvencekhez') + '</button>' +
      ('speechSynthesis' in window ? '<button type="button" class="btn sm" data-tool="read">🔊 Felolvasás</button>' : '') +
      '<button type="button" class="btn sm' + (note ? ' on' : '') + '" data-tool="note">📝 Jegyzet' + (note ? ' ✓' : '') + '</button>' +
      '<div class="note-box" hidden><textarea rows="4" placeholder="Írd ide a saját jegyzetedet ehhez az oldalhoz… (automatikusan mentődik)">' + esc(note) + '</textarea>' +
      '<small class="muted">A jegyzet csak ezen az eszközön tárolódik. A <a href="#/jegyzetek">Jegyzeteim</a> oldalon mindet megtalálod.</small></div></div>';
  };

  /* Felolvasás: mondatokra bontva, mert egyes böngészők a hosszú szöveget megszakítják. */
  var speaking = false;
  function stopSpeech() { try { speechSynthesis.cancel(); } catch (e) { /* nincs */ } speaking = false; }
  function speak(text, btn) {
    stopSpeech();
    var voices = speechSynthesis.getVoices(), hu = voices.filter(function (v) { return /^hu/i.test(v.lang); })[0];
    var parts = text.replace(/\s+/g, ' ').match(/[^.!?…:;]+[.!?…:;]*/g) || [text];
    var chunks = [], cur = '';
    parts.forEach(function (p) { if ((cur + p).length > 220) { if (cur) chunks.push(cur); cur = p; } else cur += p; });
    if (cur) chunks.push(cur);
    speaking = true;
    btn.textContent = '⏹ Leállítás';
    chunks.forEach(function (c, i) {
      var u = new SpeechSynthesisUtterance(c.trim());
      u.lang = 'hu-HU'; if (hu) u.voice = hu; u.rate = 0.95;
      if (i === chunks.length - 1) u.onend = function () { speaking = false; btn.textContent = '🔊 Felolvasás'; };
      speechSynthesis.speak(u);
    });
    if (!hu && !S.store.get('noHuVoiceWarned', false)) {
      S.store.set('noHuVoiceWarned', true);
      setTimeout(function () { alert('Ezen az eszközön nincs telepítve magyar felolvasóhang, ezért a kiejtés idegenes lehet. A rendszer beállításaiban (Nyelv / Szövegfelolvasás) telepíthetsz magyar hangot.'); }, 300);
    }
  }
  window.addEventListener('hashchange', stopSpeech);

  /* A felolvasandó szöveg: a megadott tartalomból a widgetek, kvízek és gombok nélkül. */
  function readable(root) {
    var c = root.cloneNode(true);
    c.querySelectorAll('.widget, .quiz, button, .page-tools, svg, .crumbs, .pager, .tabs, .toc, .term-refs, .chips, .related, .ex-stage').forEach(function (n) { n.remove(); });
    return c.innerText || c.textContent || '';
  }

  S.bindTools = function (root, key, info, readRoot) {
    var box = root.querySelector('.page-tools[data-key="' + key.replace(/"/g, '\\"') + '"]');
    if (!box) return;
    box.querySelector('[data-tool="fav"]').addEventListener('click', function () {
      var favs = S.store.get('favs', {});
      if (favs[key]) delete favs[key]; else favs[key] = { title: info.title, href: info.href, kind: info.kind, icon: info.icon, date: new Date().toISOString().slice(0, 10) };
      S.store.set('favs', favs);
      this.classList.toggle('on', !!favs[key]); this.textContent = favs[key] ? '⭐ Kedvenc' : '☆ Kedvencekhez';
    });
    var rb = box.querySelector('[data-tool="read"]');
    if (rb) rb.addEventListener('click', function () {
      if (speaking) { stopSpeech(); rb.textContent = '🔊 Felolvasás'; return; }
      speak(readable(readRoot || root), rb);
    });
    var nb = box.querySelector('[data-tool="note"]'), area = box.querySelector('.note-box'), ta = area.querySelector('textarea'), t = null;
    nb.addEventListener('click', function () { area.hidden = !area.hidden; if (!area.hidden) ta.focus(); });
    ta.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var notes = S.store.get('notes', {}), v = ta.value.trim();
        if (v) notes[key] = { text: ta.value, title: info.title, href: info.href, kind: info.kind, icon: info.icon, date: new Date().toISOString().slice(0, 10) };
        else delete notes[key];
        S.store.set('notes', notes);
        nb.classList.toggle('on', !!v); nb.textContent = '📝 Jegyzet' + (v ? ' ✓' : '');
      }, 400);
    });
  };

  S.pageJegyzetek = function (main) {
    var favs = S.store.get('favs', {}), notes = S.store.get('notes', {});
    function sortByDate(o) { return Object.keys(o).sort(function (a, b) { return (o[b].date || '').localeCompare(o[a].date || ''); }); }
    var fk = sortByDate(favs), nk = sortByDate(notes);
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Jegyzeteim</span></nav><h1>Jegyzeteim és kedvenceim</h1>' +
      '<p class="lead">Minden leckénél, modellnél és szakszónál a cím alatti ☆ és 📝 gombbal menthetsz. Itt minden egy helyen van. A Haladásom oldalon fájlba is mentheted.</p>' +
      '<h2>⭐ Kedvencek (' + fk.length + ')</h2>' + (fk.length ? '<div class="card results">' + fk.map(function (k) {
        var f = favs[k];
        return '<div class="sr"><span class="ico">' + (f.icon || '⭐') + '</span><a class="t" href="' + f.href + '" style="text-decoration:none;color:inherit"><b>' + esc(f.title) + '</b><span>' + esc(f.kind || '') + '</span></a>' +
          '<button type="button" class="btn sm kind" data-unfav="' + esc(k) + '" aria-label="Eltávolítás">✕</button></div>';
      }).join('') + '</div>' : '<p class="muted">Még nincs kedvenced.</p>') +
      '<h2>📝 Jegyzetek (' + nk.length + ')</h2>' + (nk.length ? '<div class="notes-list">' + nk.map(function (k) {
        var n = notes[k];
        return '<div class="card pad"><div class="row" style="justify-content:space-between"><a href="' + n.href + '"><b>' + (n.icon || '📝') + ' ' + esc(n.title) + '</b></a><small class="muted">' + esc(n.kind || '') + ' · ' + esc(n.date || '') + '</small></div>' +
          '<div class="note-text">' + esc(n.text).replace(/\n/g, '<br>') + '</div></div>';
      }).join('') + '</div><p><button type="button" class="btn" id="nt-print">🖨 Jegyzetek nyomtatása</button></p>' : '<p class="muted">Még nincs jegyzeted.</p>');
    main.querySelectorAll('[data-unfav]').forEach(function (b) {
      b.addEventListener('click', function () { var f = S.store.get('favs', {}); delete f[b.dataset.unfav]; S.store.set('favs', f); S.pageJegyzetek(main); });
    });
    var pr = main.querySelector('#nt-print');
    if (pr) pr.addEventListener('click', function () {
      var w = window.open('', '_blank'); if (!w) return;
      w.document.write('<!doctype html><meta charset="utf-8"><title>Jegyzeteim</title><style>body{font:14px/1.5 system-ui,Arial;max-width:760px;margin:20px auto;padding:0 16px}h2{font-size:15px;margin:16px 0 4px;border-top:1px solid #ccc;padding-top:8px}</style><h1>Jegyzeteim</h1>' +
        nk.map(function (k) { return '<h2>' + esc(notes[k].title) + ' <small>(' + esc(notes[k].kind || '') + ')</small></h2><div>' + esc(notes[k].text).replace(/\n/g, '<br>') + '</div>'; }).join('') + '<script>print()<\/script>');
      w.document.close();
    });
  };
})();
