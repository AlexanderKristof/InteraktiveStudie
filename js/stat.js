/* Tudásműhely – névtelen látogatásszámlálás (GoatCounter: tudasmuhely.goatcounter.com).
 * Csak a közzétett weboldalon fut (alexanderkristof.github.io), a letöltött / offline változat semmit nem küld.
 * Nincs süti, nincs személyes adat; csak az oldal neve (lekérdezési rész NÉLKÜL – pl. a haladás-link adatai
 * soha nem mennek el), a böngésző típusa, a képernyőméret és az ország. A botokat a GoatCounter kiszűri.
 * Kikapcsolható: Letöltés és használat oldal (#/nevjegy) → „Látogatásszámlálás” kapcsoló. */
(function () {
  'use strict';
  var S = window.STUDIE;
  if (typeof document === 'undefined' || typeof location === 'undefined') { S.statPanel = function () { return ''; }; return; }
  var HOST = 'alexanderkristof.github.io', ENDPOINT = 'https://tudasmuhely.goatcounter.com/count';
  var on = location.hostname === HOST && /^https:/.test(location.protocol);
  function allowed() { return on && !S.store.get('nostat', false); }
  var loaded = false, last = '';
  function path() {
    var h = (location.hash || '#/').split('?')[0];
    /* a hosszú, egyedi azonosítók helyett csak az oldal típusa kerül be, pl. #/lecke/fizika/elektromossag marad,
       de minden lekérdezési rész (?d=, ?p=, ?c=…) le van vágva */
    return location.pathname + h;
  }
  function count() {
    if (!allowed() || !window.goatcounter || !window.goatcounter.count) return;
    var p = path(); if (p === last) return; last = p;
    try { window.goatcounter.count({ path: p, title: document.title }); } catch (e) { /* */ }
  }
  function load() {
    if (loaded || !allowed()) return; loaded = true;
    window.goatcounter = { no_onload: true };
    var s = document.createElement('script');
    s.async = true; s.src = 'https://gc.zgo.at/count.js'; s.setAttribute('data-goatcounter', ENDPOINT);
    s.onload = function () { setTimeout(count, 0); };
    document.head.appendChild(s);
  }
  window.addEventListener('hashchange', function () { setTimeout(count, 300); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();

  /* kapcsoló + tájékoztatás (a Letöltés és használat oldalon jelenik meg) */
  S.statPanel = function () {
    return '<section class="card pad" style="margin-top:18px"><h2 style="margin-top:0">📊 Névtelen látogatásszámlálás</h2>' +
      '<p>Az interneten közzétett változat megszámolja, hányan és mely oldalakat nézik meg (GoatCounter). Ehhez <b>nem használ sütit</b>, nem gyűjt nevet, e-mail-címet vagy IP-címet tárolva, és <b>a haladásod, jegyzeteid, eredményeid soha nem kerülnek bele</b>. Csak az oldal neve, a böngésző típusa, a képernyőméret és az ország. A letöltött, offline változat semmit nem küld.</p>' +
      (on ? '<label class="ts-topic"><input type="checkbox" id="st-nostat"' + (S.store.get('nostat', false) ? ' checked' : '') + '><span><b>Ne számolja a látogatásaimat</b><br><small class="muted">Ezen az eszközön kikapcsolja a számlálást.</small></span></label>'
        : '<p class="muted">Ezen a változaton a számlálás nem fut.</p>') + '</section>';
  };
  S.bindStatPanel = function (root) {
    var c = root.querySelector('#st-nostat');
    if (c) c.addEventListener('change', function () { S.store.set('nostat', c.checked); if (!c.checked) load(); });
  };
})();
