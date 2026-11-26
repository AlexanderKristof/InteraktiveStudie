/* Tudásműhely – 🧠 Pszichológia és mentális egészség: interaktív elemek.
 * Leckében:  widget: { type: 'psz-segitseg' }            – „Ha most nehéz” doboz (options.full: bővebb változat)
 *            widget: { type: 'psz-legzes' }              – légzőgyakorlat (doboz-légzés / 4-7-8 / lassú légzés), csökkentett mozgással is
 *            widget: { type: 'psz-hangulat' }            – hangulatnapló (csak helyben, S.store), grafikon, törölhető
 *            widget: { type: 'psz-csapda' }              – „Gondolatcsapda-felismerő” kvíz (kognitív torzítások)
 *            widget: { type: 'psz-halogatas' }           – halogatás-tervező (10 perces lépések, időzítő)
 * A „Ha most nehéz” doboz egyetemi nézetben is a lecke tetejére kerül (lásd lent: ensureHelpTop).
 * Segélyvonalak (ellenőrizve 2026. novemberben): 116-111 Kék Vonal, 116-123 Lelki Elsősegély, 112 – ingyenes, 0–24. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  function head(t, h) { return '<div class="w-title">' + esc(t) + '</div>' + (h ? '<p class="w-help">' + S.inline(h) + '</p>' : ''); }
  function lessMotion() {
    return document.documentElement.classList.contains('no-motion') || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function alive(el) { return document.body.contains(el); }

  /* ================= „Ha most nehéz” doboz ================= */
  function helpHtml(full) {
    return '<div class="psz-help" role="note" aria-label="Ha most nehéz – segélyvonalak">' +
      '<div class="psz-help-h">💙 Ha most nehéz</div>' +
      '<p>Nem kell egyedül megbirkóznod vele. Ezek a vonalak <b>ingyenesek</b>, <b>névtelenek</b> és <b>éjjel-nappal</b> hívhatók, mobilról is:</p>' +
      '<ul class="psz-lines">' +
      '<li><a class="psz-num" href="tel:116111">116-111</a><span><b>Kék Vonal</b> – gyerekeknek és fiataloknak (24 év alatt)</span></li>' +
      '<li><a class="psz-num" href="tel:116123">116-123</a><span><b>Lelki Elsősegély Telefonszolgálat</b> – bármilyen korban</span></li>' +
      '<li><a class="psz-num psz-112" href="tel:112">112</a><span><b>Segélyhívó</b> – ha közvetlen veszély van</span></li>' +
      '</ul>' +
      (full ? '<p>A Kék Vonalnak <b>chates</b> segítsége is van (kek-vonal.hu – az aktuális időpontokat ott találod). Személyesen: <b>iskolapszichológus</b>, osztályfőnök, <b>háziorvos</b>, pedagógiai szakszolgálat, család- és gyermekjóléti szolgálat.</p>' +
        '<p>Nem kell kész mondatokkal hívnod. Elég annyi: <i>„Szia, nem vagyok jól, és nem tudom, kinek mondjam el.”</i></p>' : '') +
      '<p class="psz-small">Ez a tananyag nem diagnosztizál, és nem helyettesíti a szakembert.</p></div>';
  }
  S.pszichoHelpHtml = helpHtml;
  S.addWidget('psz-segitseg', function (el, o) {
    el.classList.add('psz-help-wrap');
    el.innerHTML = helpHtml(o && o.full);
  });

  /* Egyetemi nézetben az iskolai anyag (és vele a doboz) lenyitható részbe kerül, a tantárgyoldalon pedig nincs widget:
   * ilyenkor a lecke/tantárgy tetejére is beteszünk egy dobozt, hogy mindig jól látható legyen. */
  function ensureHelpTop() {
    var h = location.hash || '';
    if (h.indexOf('#/lecke/pszichologia/') !== 0 && h.indexOf('#/tantargy/pszichologia') !== 0) return;
    var main = document.getElementById('main'); if (!main) return;
    if (main.querySelector('.psz-help-top')) return;
    var visible = Array.prototype.some.call(main.querySelectorAll('.psz-help'), function (x) { return !x.closest('details'); });
    if (visible) return;
    var anchor = main.querySelector('.lesson-body > .lead') || main.querySelector('.subject-head');
    if (!anchor) return;
    var box = document.createElement('div');
    box.className = 'psz-help-top';
    box.innerHTML = helpHtml(false);
    anchor.parentNode.insertBefore(box, anchor.nextSibling);
  }
  if (window.MutationObserver) {
    var started = false;
    var start = function () {
      if (started) return; var main = document.getElementById('main'); if (!main) return; started = true;
      new MutationObserver(ensureHelpTop).observe(main, { childList: true, subtree: false });
      ensureHelpTop();
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  }

  /* ================= Légzőgyakorlat ================= */
  var PATTERNS = {
    doboz: { name: 'Doboz-légzés (4-4-4-4)', phases: [['be', 'Belégzés', 4], ['tart', 'Tartsd bent', 4], ['ki', 'Kilégzés', 4], ['szunet', 'Szünet', 4]], cycles: 6 },
    '478': { name: '4-7-8 légzés', phases: [['be', 'Belégzés orron', 4], ['tart', 'Tartsd bent', 7], ['ki', 'Kilégzés szájon', 8]], cycles: 4 },
    lassu: { name: 'Lassú légzés (4-6)', phases: [['be', 'Belégzés', 4], ['ki', 'Hosszú kilégzés', 6]], cycles: 8 }
  };
  S.addWidget('psz-legzes', function (el) {
    var mode = 'doboz', timer = null, t0 = 0, staticMode = lessMotion();
    el.innerHTML = head('🌬️ Légzőgyakorlat', 'Ülj kényelmesen, lazítsd el a vállad. Kövesd a kört és a feliratot. Ha szédülsz vagy kényelmetlen, **állj meg**, és lélegezz a saját tempódban – a benntartást nyugodtan rövidítheted.') +
      '<div class="psz-row"><div class="seg" id="pl-mode">' + Object.keys(PATTERNS).map(function (k) {
        return '<button type="button" data-m="' + k + '"' + (k === mode ? ' class="on"' : '') + '>' + esc(PATTERNS[k].name) + '</button>';
      }).join('') + '</div></div>' +
      '<label class="psz-chk"><input type="checkbox" id="pl-static"' + (staticMode ? ' checked' : '') + '> Mozgás nélküli nézet (csak szöveg és számláló)</label>' +
      '<div class="psz-breath" id="pl-stage" aria-live="polite"><div class="psz-orb" id="pl-orb"><span id="pl-count"></span></div>' +
      '<div class="psz-phase" id="pl-phase">Nyomd meg az Indítás gombot</div><div class="psz-pbar"><i id="pl-bar"></i></div><div class="psz-small" id="pl-cyc"></div></div>' +
      '<div class="psz-row"><button type="button" class="btn primary" id="pl-go">▶ Indítás</button></div>';
    var orb = el.querySelector('#pl-orb'), stage = el.querySelector('#pl-stage');
    function paintStatic() { stage.classList.toggle('psz-static', staticMode); }
    paintStatic();
    function setOrb(kind, secs) {
      var big = kind === 'be' || kind === 'tart';
      orb.className = 'psz-orb psz-' + kind;
      if (staticMode) { orb.style.transition = 'none'; orb.style.transform = 'none'; return; }
      orb.style.transition = (kind === 'be' || kind === 'ki') ? 'transform ' + secs + 's linear' : 'none';
      orb.style.transform = 'scale(' + (big ? 1 : 0.55) + ')';
    }
    function stop(msg) {
      if (timer) { clearInterval(timer); timer = null; }
      el.querySelector('#pl-go').textContent = '▶ Indítás';
      el.querySelector('#pl-phase').textContent = msg || 'Megállítva';
      el.querySelector('#pl-count').textContent = '';
      el.querySelector('#pl-bar').style.width = '0';
      setOrb('szunet', 0); orb.style.transform = staticMode ? 'none' : 'scale(0.55)';
    }
    function startRun() {
      var P = PATTERNS[mode], cyc = P.phases.reduce(function (a, p) { return a + p[2]; }, 0), total = cyc * P.cycles, lastKey = '';
      t0 = Date.now(); el.querySelector('#pl-go').textContent = '■ Megállítás';
      orb.style.transition = 'none'; orb.style.transform = staticMode ? 'none' : 'scale(0.55)';
      function tick() {
        if (!alive(el)) { clearInterval(timer); timer = null; return; }
        var t = (Date.now() - t0) / 1000;
        if (t >= total) { stop('Kész! Figyeld meg: hogyan érzed most magad?'); return; }
        var c = Math.floor(t / cyc), r = t - c * cyc, i = 0, acc = 0;
        while (r >= acc + P.phases[i][2]) { acc += P.phases[i][2]; i++; }
        var ph = P.phases[i], left = Math.ceil(acc + ph[2] - r), key = c + ':' + i;
        if (key !== lastKey) { lastKey = key; setOrb(ph[0], ph[2]); el.querySelector('#pl-phase').textContent = ph[1]; }
        el.querySelector('#pl-count').textContent = left;
        el.querySelector('#pl-bar').style.width = ((r - acc) / ph[2] * 100) + '%';
        el.querySelector('#pl-cyc').textContent = (c + 1) + '. kör / ' + P.cycles;
      }
      tick(); timer = setInterval(tick, 100);
    }
    el.querySelector('#pl-go').addEventListener('click', function () { if (timer) stop(); else startRun(); });
    el.querySelector('#pl-mode').addEventListener('click', function (e) {
      var b = e.target.closest('[data-m]'); if (!b) return; mode = b.dataset.m;
      el.querySelectorAll('#pl-mode button').forEach(function (x) { x.classList.toggle('on', x === b); });
      stop('Nyomd meg az Indítás gombot'); el.querySelector('#pl-cyc').textContent = '';
    });
    el.querySelector('#pl-static').addEventListener('change', function (e) { staticMode = e.target.checked; paintStatic(); if (!timer) stop('Nyomd meg az Indítás gombot'); });
    stop('Nyomd meg az Indítás gombot');
  });

  /* ================= Hangulatnapló ================= */
  var MOODS = [[1, '😞', 'nagyon rossz'], [2, '😕', 'rossz'], [3, '😐', 'közepes'], [4, '🙂', 'jó'], [5, '😄', 'nagyon jó']];
  var FEELS = ['nyugodt', 'vidám', 'hálás', 'energikus', 'büszke', 'fáradt', 'feszült', 'szorongó', 'szomorú', 'dühös', 'magányos', 'unott', 'csalódott'];
  var HKEY = 'pszicho.hangulat';
  S.addWidget('psz-hangulat', function (el) {
    var data = S.store.get(HKEY, { e: {} }); if (!data || typeof data.e !== 'object') data = { e: {} };
    var cur = { d: today(), m: 0, t: [], a: '' };
    function load(d) { var x = data.e[d]; cur = { d: d, m: x ? x.m : 0, t: x ? (x.t || []).slice() : [], a: x && x.a != null ? x.a : '' }; }
    load(cur.d);
    el.innerHTML = head('📓 Hangulatnapló', 'Naponta egy kattintás: hogy érezted magad, milyen érzések voltak jellemzők, mennyit aludtál. Pár hét után **mintázatokat** vehetsz észre (pl. kevés alvás után rosszabb napok). Ez nem teszt és nem diagnózis – csak neked szól.') +
      '<div class="psz-privacy">🔒 <b>Adatvédelem:</b> a bejegyzések <b>csak ezen az eszközön, ebben a böngészőben</b> tárolódnak, sehova nem kerülnek fel. <b>Közös vagy iskolai gépen ne használd</b>, mert más is megnézheti. A „Haladás átvitele” linkbe a napló szándékosan <b>nem</b> kerül bele. Bármikor törölheted.</div>' +
      '<div class="psz-row"><label class="pw-f psz-date"><span>Nap</span><input type="date" id="ph-d"></label>' +
      '<label class="pw-f psz-date"><span>Alvás (óra, nem kötelező)</span><input type="number" id="ph-a" min="0" max="16" step="0.5" inputmode="decimal"></label></div>' +
      '<div class="psz-lbl">Milyen volt a napod?</div><div class="psz-moods" id="ph-m" role="radiogroup" aria-label="Hangulat">' + MOODS.map(function (m) {
        return '<button type="button" role="radio" data-v="' + m[0] + '" title="' + m[2] + '" aria-label="' + m[2] + '"><span>' + m[1] + '</span><small>' + m[2] + '</small></button>';
      }).join('') + '</div>' +
      '<div class="psz-lbl">Milyen érzések voltak jellemzők? (többet is választhatsz)</div><div class="psz-chips" id="ph-t">' + FEELS.map(function (f) {
        return '<button type="button" class="chip" data-f="' + f + '" aria-pressed="false">' + f + '</button>';
      }).join('') + '</div>' +
      '<div class="psz-row"><button type="button" class="btn primary" id="ph-save">💾 Mentés</button><button type="button" class="btn" id="ph-del">Ennek a napnak a törlése</button><span class="psz-small" id="ph-msg" aria-live="polite"></span></div>' +
      '<div id="ph-out"></div>' +
      '<div class="psz-row"><button type="button" class="btn sm" id="ph-wipe">🗑 A teljes napló törlése</button></div>';
    var dIn = el.querySelector('#ph-d'), aIn = el.querySelector('#ph-a');
    dIn.value = cur.d; dIn.max = today();
    function paintForm() {
      aIn.value = cur.a;
      el.querySelectorAll('#ph-m button').forEach(function (b) { var on = +b.dataset.v === cur.m; b.classList.toggle('on', on); b.setAttribute('aria-checked', on ? 'true' : 'false'); });
      el.querySelectorAll('#ph-t button').forEach(function (b) { var on = cur.t.indexOf(b.dataset.f) >= 0; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    }
    function save() { S.store.set(HKEY, data); }
    function msg(t) { el.querySelector('#ph-msg').textContent = t; }
    function dateAdd(d, n) { var x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() + n); return x.getFullYear() + '-' + pad(x.getMonth() + 1) + '-' + pad(x.getDate()); }
    function paintOut() {
      var keys = Object.keys(data.e).sort(), out = el.querySelector('#ph-out');
      if (!keys.length) { out.innerHTML = '<p class="psz-small">Még nincs bejegyzés. Az első mentés után itt jelenik meg a grafikon.</p>'; return; }
      var end = today(), days = [], i;
      for (i = 29; i >= 0; i--) days.push(dateAdd(end, -i));
      var narrow = (el.clientWidth || 600) < 520, W = narrow ? 360 : 600, H = narrow ? 200 : 170, L = 30, R = 18, T = 12, B = 26, pw = (W - L - R) / 29;
      function x(i) { return L + i * pw; }
      function y(m) { return T + (5 - m) / 4 * (H - T - B); }
      var svg = '<svg class="psz-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Hangulat az elmúlt 30 napban">';
      [1, 2, 3, 4, 5].forEach(function (m) { svg += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(m) + '" y2="' + y(m) + '" class="psz-grid"/><text x="' + (L - 6) + '" y="' + (y(m) + 5) + '" text-anchor="end" font-size="13">' + MOODS[m - 1][1] + '</text>'; });
      days.forEach(function (d, i) {
        var e = data.e[d];
        if (e && e.a !== '' && e.a != null && isFinite(e.a)) { var h = Math.min(12, +e.a) / 12 * (H - T - B); svg += '<rect class="psz-sleep" x="' + (x(i) - pw * 0.3) + '" y="' + (H - B - h) + '" width="' + (pw * 0.6) + '" height="' + h + '"><title>' + d + ': ' + e.a + ' óra alvás</title></rect>'; }
        if (i % (narrow ? 10 : 7) === 1 || i === 29) svg += '<text x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="' + (i === 29 ? 'end' : 'middle') + '" font-size="11" class="svg-text">' + d.slice(5).replace('-', '.') + '.</text>';
      });
      var pts = [];
      days.forEach(function (d, i) { var e = data.e[d]; if (e && e.m) pts.push([x(i), y(e.m), d, e.m]); });
      if (pts.length > 1) svg += '<polyline class="psz-line" points="' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"/>';
      pts.forEach(function (p) { svg += '<circle class="psz-dot" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4"><title>' + p[2] + ': ' + MOODS[p[3] - 1][2] + '</title></circle>'; });
      svg += '</svg>';
      /* összesítés: az elmúlt 7 és 30 nap */
      function avg(n) { var s = 0, c = 0; for (var k = 0; k < n; k++) { var e = data.e[dateAdd(end, -k)]; if (e && e.m) { s += e.m; c++; } } return c ? (s / c) : null; }
      var cnt = {}; days.forEach(function (d) { var e = data.e[d]; (e && e.t || []).forEach(function (f) { cnt[f] = (cnt[f] || 0) + 1; }); });
      var top = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; }).slice(0, 3);
      var a7 = avg(7), a30 = avg(30);
      /* óvatos jelzés: az utolsó 5 bejegyzés (14 napon belül) mind rossz */
      var recent = keys.filter(function (k) { return k >= dateAdd(end, -13) && k <= end && data.e[k].m; }).slice(-5);
      var low = recent.length >= 5 && recent.every(function (k) { return data.e[k].m <= 2; });
      out.innerHTML = '<div class="psz-chart-wrap">' + svg + '</div><p class="psz-small">● hangulat (vonal) · ▮ alvás órában (halvány oszlop, 12 óra = a grafikon teteje) · az elmúlt 30 nap</p>' +
        '<div class="psz-stats"><div><small>Átlag, 7 nap</small><b>' + (a7 ? S.fmt(a7, 1) + ' / 5' : '–') + '</b></div><div><small>Átlag, 30 nap</small><b>' + (a30 ? S.fmt(a30, 1) + ' / 5' : '–') + '</b></div>' +
        '<div><small>Leggyakoribb érzések</small><b>' + (top.length ? esc(top.join(', ')) : '–') + '</b></div><div><small>Bejegyzések</small><b>' + keys.length + '</b></div></div>' +
        (low ? '<div class="note"><b class="t">💙 Egy kedves jelzés</b><p>Az utóbbi bejegyzéseidben többször rossz volt a hangulatod. Ez nem diagnózis, és lehet egyszerűen egy nehéz időszak – de jó lehet beszélni róla valakivel, akiben megbízol (barát, szülő, iskolapszichológus), vagy felhívni a <a href="tel:116111"><b>116-111</b></a>-et. Nem kell egyedül cipelned.</p></div>' : '');
    }
    dIn.addEventListener('change', function () { if (dIn.value) { load(dIn.value); paintForm(); msg(data.e[cur.d] ? 'Ehhez a naphoz már van bejegyzés – módosíthatod.' : ''); } });
    aIn.addEventListener('input', function () { cur.a = aIn.value; });
    el.querySelector('#ph-m').addEventListener('click', function (e) { var b = e.target.closest('[data-v]'); if (!b) return; cur.m = +b.dataset.v; paintForm(); });
    el.querySelector('#ph-t').addEventListener('click', function (e) {
      var b = e.target.closest('[data-f]'); if (!b) return; var f = b.dataset.f, i = cur.t.indexOf(f);
      if (i >= 0) cur.t.splice(i, 1); else cur.t.push(f); paintForm();
    });
    el.querySelector('#ph-save').addEventListener('click', function () {
      if (!cur.m) { msg('Előbb válaszd ki, milyen volt a napod (1–5).'); return; }
      if (!cur.d || cur.d > today()) { msg('Válassz egy mai vagy korábbi napot.'); return; }
      var a = parseFloat(String(cur.a).replace(',', '.'));
      data.e[cur.d] = { m: cur.m, t: cur.t.slice(), a: isFinite(a) ? Math.max(0, Math.min(16, a)) : '' };
      save(); paintOut(); msg('Mentve (' + cur.d + ').');
    });
    el.querySelector('#ph-del').addEventListener('click', function () {
      if (!data.e[cur.d]) { msg('Ehhez a naphoz nincs bejegyzés.'); return; }
      delete data.e[cur.d]; save(); load(cur.d); paintForm(); paintOut(); msg('A nap bejegyzése törölve.');
    });
    el.querySelector('#ph-wipe').addEventListener('click', function () {
      if (!window.confirm('Biztosan törlöd a teljes hangulatnaplót erről az eszközről? Ez nem vonható vissza.')) return;
      data = { e: {} };
      try { localStorage.removeItem('tudasmuhely.' + HKEY); } catch (x) { S.store.set(HKEY, data); }
      load(today()); dIn.value = cur.d; paintForm(); paintOut(); msg('A napló törölve.');
    });
    paintForm(); paintOut();
  });

  /* ================= Gondolatcsapda-felismerő ================= */
  var TRAPS = {
    mvs: ['Mindent vagy semmit', 'Csak két lehetőséget látsz: tökéletes vagy kudarc, nincs köztes.'],
    tul: ['Túláltalánosítás', 'Egy esetből „mindig”, „soha”, „mindenki” következtetés.'],
    kat: ['Katasztrofizálás', 'A legrosszabb kimenetelt tartod valószínűnek, és elviselhetetlennek látod.'],
    gol: ['Gondolatolvasás', 'Biztosnak veszed, mit gondolnak rólad mások – bizonyíték nélkül.'],
    jos: ['Jóslás', 'Előre „tudod”, hogy rosszul fog alakulni.'],
    szu: ['Mentális szűrő', 'Csak a negatív részletet látod, a pozitívakat kiszűröd.'],
    lee: ['A jó dolgok leértékelése', 'A sikert „véletlennek”, „nem számítónak” tartod.'],
    cim: ['Címkézés', 'Egy hibából az egész személyre ragasztasz címkét („lúzer vagyok”).'],
    kel: ['„Kell”-állítások', 'Merev szabályok magaddal vagy másokkal szemben („mindig… kell”).'],
    erz: ['Érzelmi érvelés', 'Mivel így érzed, biztosan így is van.'],
    sze: ['Személyre vonatkoztatás', 'Magadra veszed vagy magadat hibáztatod olyasmiért, ami nem (csak) rajtad múlik.']
  };
  var CASES = [
    ['Négyest kaptam ötös helyett. Ez egy teljes kudarc.', 'mvs', 'Egy négyes jó jegy. Hol van a teljesítményem egy 1–10-es skálán, nem csak a „tökéletes / kudarc” között?'],
    ['Elrontottam a prezentációt. Soha semmi nem sikerül nekem.', 'tul', 'Egy prezentáció ment rosszul. Mi sikerült az utóbbi hetekben?'],
    ['Ha elrontom a holnapi felelést, megbukom, nem vesznek fel sehova, és vége mindennek.', 'kat', 'Mi a legvalószínűbb kimenetel? És ha rosszul is sikerül, hogyan tudnám kijavítani?'],
    ['Nem köszönt vissza a folyosón. Biztos haragszik rám.', 'gol', 'Lehet, hogy nem látott meg, vagy a saját gondolataiba merült. Megkérdezhetem.'],
    ['Minek menjek el a buliba, úgyis rosszul fogom érezni magam.', 'jos', 'Nem tudhatom előre. Kipróbálhatom egy órára, és ha nem jó, hazamegyek.'],
    ['A tanár öt dolgot megdicsért a fogalmazásomban, de egy hibát is írt. Pocsék lett.', 'szu', 'Öt dicséret és egy javítanivaló: ez összességében jó munka, amin egy ponton lehet javítani.'],
    ['Megnyertem a versenyt, de csak azért, mert a jók nem indultak.', 'lee', 'Felkészültem és jól teljesítettem – ez az én eredményem is.'],
    ['Elfelejtettem a barátom születésnapját. Szörnyű ember vagyok.', 'cim', 'Hibáztam, és ez rossz érzés. Bocsánatot kérhetek és pótolhatom – egy hiba nem tesz szörnyű emberré.'],
    ['Mindig mindenkinek segítenem kell, különben önző vagyok.', 'kel', 'Jó dolog segíteni, de nekem is lehetnek határaim. „Szeretnék segíteni, ha belefér” – ez rugalmasabb.'],
    ['Olyan hülyének érzem magam matekból, biztos hülye is vagyok hozzá.', 'erz', 'Az érzés nem bizonyíték. Mit mutatnak a tények: mit értek már, és mihez kell még gyakorlás?'],
    ['A szüleim veszekednek. Biztos miattam van.', 'sze', 'A felnőttek konfliktusainak sok oka lehet, és nem az én felelősségem megoldani őket.'],
    ['Senki nem írt az osztálycsoportba a posztomra. Mindenki utál.', 'tul', 'Egy poszt kevés reakciót kapott. Ki az, aki az utóbbi időben kedves volt hozzám?'],
    ['Ha nem tudom tökéletesen megcsinálni, inkább el se kezdem.', 'mvs', 'A „kész, de nem tökéletes” sokkal több, mint a „semmi”. Mi lenne egy elég jó első változat?'],
    ['Biztos mindenki észrevette a pattanásomat, és rajtam nevetnek.', 'gol', 'A legtöbben a saját dolgaikkal vannak elfoglalva. Honnan tudom, hogy ezt gondolják?'],
    ['Fáj a fejem a vizsga előtt – biztosan elájulok majd, és mindenki előtt leégek.', 'kat', 'Az izgalom kellemetlen, de nem veszélyes. Pár lassú légzés segíthet, és egy rossz pillanat is túlélhető.'],
    ['Ugyan, az edzőm csak udvariasságból dicsért meg.', 'lee', 'Mi lenne, ha elhinném, és megkérdezném, mit csináltam jól?']
  ];
  S.addWidget('psz-csapda', function (el) {
    var order, i, score, ROUND = 8;
    el.innerHTML = head('🪤 Gondolatcsapda-felismerő', 'Olvasd el a gondolatot, és válaszd ki, melyik **gondolati torzítás** illik rá a legjobban. (Néha több is illene – a magyarázat megmutatja a legjellemzőbbet.) Minden kérdés után egy **rugalmasabb** gondolatot is mutatunk.') +
      '<div id="pc-box" aria-live="polite"></div>';
    var box = el.querySelector('#pc-box');
    function startRound() { order = shuffle(CASES).slice(0, ROUND); i = 0; score = 0; show(); }
    function show() {
      if (i >= order.length) {
        box.innerHTML = '<div class="psz-score">' + score + ' / ' + order.length + '</div><p>' + (score >= 6 ? 'Szép! Jól felismered a csapdákat.' : 'Nem baj – ezek a minták elsőre nehezen láthatók. A gyakorlás segít.') +
          ' A lényeg nem a pontszám: ha a saját gondolataidban is észreveszed ezeket a mintákat, már tettél egy lépést.</p><button type="button" class="btn primary" id="pc-again">↻ Új kör</button>';
        box.querySelector('#pc-again').addEventListener('click', startRound); return;
      }
      var c = order[i], wrong = shuffle(Object.keys(TRAPS).filter(function (k) { return k !== c[1]; })).slice(0, 3), opts = shuffle(wrong.concat([c[1]]));
      box.innerHTML = '<div class="psz-small">' + (i + 1) + '. / ' + order.length + '</div><blockquote class="psz-thought">„' + esc(c[0]) + '”</blockquote>' +
        '<div class="psz-opts">' + opts.map(function (k) { return '<button type="button" class="btn" data-k="' + k + '">' + esc(TRAPS[k][0]) + '</button>'; }).join('') + '</div><div id="pc-fb"></div>';
      box.querySelectorAll('[data-k]').forEach(function (b) {
        b.addEventListener('click', function () {
          var ok = b.dataset.k === c[1]; if (ok) score++;
          box.querySelectorAll('[data-k]').forEach(function (x) { x.disabled = true; if (x.dataset.k === c[1]) x.classList.add('psz-ok'); else if (x === b) x.classList.add('psz-bad'); });
          box.querySelector('#pc-fb').innerHTML = '<div class="note ' + (ok ? 'tip' : 'warn') + '"><b class="t">' + (ok ? '✓ Igen: ' : 'Ez inkább: ') + esc(TRAPS[c[1]][0]) + '</b><p>' + esc(TRAPS[c[1]][1]) + '</p>' +
            '<p><b>Rugalmasabb gondolat:</b> ' + esc(c[2]) + '</p></div><button type="button" class="btn primary" id="pc-next">' + (i + 1 < order.length ? 'Következő →' : 'Eredmény') + '</button>';
          box.querySelector('#pc-next').addEventListener('click', function () { i++; show(); });
          box.querySelector('#pc-next').focus();
        });
      });
    }
    startRound();
  });

  /* ================= Halogatás-tervező ================= */
  var TKEY = 'pszicho.halogatas';
  S.addWidget('psz-halogatas', function (el) {
    var st = S.store.get(TKEY, null);
    if (!st || !Array.isArray(st.steps)) st = { task: '', ha: '', steps: [] };
    var tm = null, tEnd = 0, tIdx = -1;
    el.innerHTML = head('🧩 Halogatás-tervező', 'Írd be a feladatot, amit halogatsz, és bontsd **10 perces**, nagyon konkrét lépésekre. Az első lépés legyen nevetségesen kicsi! Csak ezen az eszközön tárolódik.') +
      '<label class="pw-f psz-wide"><span>A feladat</span><input type="text" id="pt-task" maxlength="120" placeholder="pl. felkészülés a töri témazáróra"></label>' +
      '<label class="pw-f psz-wide"><span>Ha–akkor terv: mikor és hol kezded?</span><input type="text" id="pt-ha" maxlength="160" placeholder="pl. Ha hazaértem és ettem, akkor leülök az asztalhoz, és megcsinálom az 1. lépést."></label>' +
      '<div class="psz-row"><input type="text" id="pt-new" class="psz-in" maxlength="120" placeholder="Új 10 perces lépés…" aria-label="Új lépés"><button type="button" class="btn" id="pt-add">+ Lépés</button><button type="button" class="btn" id="pt-sug">💡 Kezdő lépések javaslata</button></div>' +
      '<ol class="psz-steps" id="pt-list"></ol><div id="pt-prog"></div><div id="pt-timer" aria-live="polite"></div>' +
      '<div class="psz-row"><button type="button" class="btn sm" id="pt-clear">🗑 Új terv (a mostani törlése)</button></div>';
    var taskIn = el.querySelector('#pt-task'), haIn = el.querySelector('#pt-ha'), newIn = el.querySelector('#pt-new');
    taskIn.value = st.task; haIn.value = st.ha;
    function save() { S.store.set(TKEY, st); }
    function paint() {
      var list = el.querySelector('#pt-list');
      list.innerHTML = st.steps.length ? st.steps.map(function (s, i) {
        return '<li class="' + (s.done ? 'done' : '') + '"><label><input type="checkbox" data-c="' + i + '"' + (s.done ? ' checked' : '') + '> <span>' + esc(s.t) + '</span></label>' +
          '<span class="psz-acts"><button type="button" class="btn sm" data-go="' + i + '"' + (s.done ? ' disabled' : '') + ' title="10 perces időzítő">⏱ 10 perc</button>' +
          '<button type="button" class="btn sm" data-up="' + i + '"' + (i ? '' : ' disabled') + ' aria-label="Feljebb">↑</button>' +
          '<button type="button" class="btn sm" data-x="' + i + '" aria-label="Törlés">✕</button></span></li>';
      }).join('') : '<li class="psz-empty">Még nincs lépés. Adj hozzá egyet, vagy kérj javaslatot!</li>';
      var done = st.steps.filter(function (s) { return s.done; }).length, n = st.steps.length;
      el.querySelector('#pt-prog').innerHTML = n ? '<div class="psz-pbar psz-pbar-big"><i style="width:' + (done / n * 100) + '%"></i></div><p class="psz-small">' + done + ' / ' + n + ' lépés kész · még kb. ' + ((n - done) * 10) + ' perc munka' +
        (done === n ? ' – 🎉 Megvan! Mi segített? Jegyezd meg legközelebbre.' : done ? ' – haladsz, ez számít!' : '') + '</p>' : '';
    }
    function add(t) { t = String(t || '').trim(); if (!t) return; if (st.steps.length >= 40) return; st.steps.push({ t: t, done: false }); save(); paint(); }
    function stopTimer(text) { if (tm) { clearInterval(tm); tm = null; } el.querySelector('#pt-timer').innerHTML = text || ''; tIdx = -1; }
    function runTimer(i) {
      stopTimer(); tIdx = i; tEnd = Date.now() + 10 * 60 * 1000;
      function tick() {
        if (!alive(el)) { clearInterval(tm); tm = null; return; }
        var left = Math.max(0, Math.round((tEnd - Date.now()) / 1000));
        if (!left) { stopTimer('<div class="note tip"><b class="t">⏰ Letelt a 10 perc!</b><p>Ha megvan a lépés, pipáld ki. Ha belejöttél, nyugodtan folytasd – ha nem, az is rendben van: elindultál.</p></div>'); return; }
        el.querySelector('#pt-timer').innerHTML = '<div class="psz-timer"><b>' + Math.floor(left / 60) + ':' + pad(left % 60) + '</b> <span>' + esc((st.steps[tIdx] || {}).t || '') + '</span> <button type="button" class="btn sm" id="pt-stop">Megállítás</button></div>';
        el.querySelector('#pt-stop').addEventListener('click', function () { stopTimer(); });
      }
      tick(); tm = setInterval(tick, 1000);
    }
    taskIn.addEventListener('input', function () { st.task = taskIn.value; save(); });
    haIn.addEventListener('input', function () { st.ha = haIn.value; save(); });
    el.querySelector('#pt-add').addEventListener('click', function () { add(newIn.value); newIn.value = ''; newIn.focus(); });
    newIn.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); add(newIn.value); newIn.value = ''; } });
    el.querySelector('#pt-sug').addEventListener('click', function () {
      var t = st.task.trim();
      ['Előkészítem az eszközöket (füzet, könyv, laptop), a telefont másik szobába teszem.',
        'Megnézem, pontosan mi a feladat' + (t ? ' (' + t + ')' : '') + ', és leírom 2-3 mondatban.',
        'Összegyűjtöm, milyen részekből áll, és sorba rakom őket.',
        'Megcsinálom az első, legkisebb részt – nem kell tökéletesnek lennie.',
        'Fejből felidézem / átnézem, amit eddig csináltam, és felírom, mi a következő lépés.'].forEach(add);
    });
    el.querySelector('#pt-list').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.x != null) { st.steps.splice(+b.dataset.x, 1); save(); paint(); stopTimer(); }
      else if (b.dataset.up != null) { var k = +b.dataset.up, t = st.steps[k]; st.steps[k] = st.steps[k - 1]; st.steps[k - 1] = t; save(); paint(); }
      else if (b.dataset.go != null) runTimer(+b.dataset.go);
    });
    el.querySelector('#pt-list').addEventListener('change', function (e) {
      var c = e.target.closest('[data-c]'); if (!c) return; st.steps[+c.dataset.c].done = c.checked; save(); paint();
      if (c.checked && +c.dataset.c === tIdx) stopTimer('<p class="psz-small">✓ Szép! Egy lépéssel közelebb.</p>');
    });
    el.querySelector('#pt-clear').addEventListener('click', function () {
      if (st.steps.length && !window.confirm('Törlöd a mostani tervet?')) return;
      st = { task: '', ha: '', steps: [] }; taskIn.value = ''; haIn.value = ''; save(); stopTimer(); paint();
    });
    paint();
  });
})();
