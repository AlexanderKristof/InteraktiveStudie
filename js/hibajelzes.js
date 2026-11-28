/* Tudásműhely – MI-átláthatósági megjegyzés és „Hibát jelzek” gomb a láblécben (minden oldalon).
 * A gomb előre kitöltött e-mailt nyit az aktuális oldal címével és linkjével. */
(function () {
  'use strict';
  if (typeof document === 'undefined') return;
  var MAIL = 'mitudi.hibak@gmail.com', SITE = 'https://alexanderkristof.github.io/InteraktiveStudie/';
  function link() {
    var url = (/^https?:/.test(location.protocol) ? location.href.split('#')[0] : SITE) + (location.hash || '#/').split('?')[0];
    var t = (document.title || '').replace(/ – Tudásműhely$/, '') || 'Kezdőlap';
    var body = 'Szia!\n\nHibát találtam ezen az oldalon:\n' + t + '\n' + url + '\n\nMi a hiba? (írd le röviden, ha tudod, a helyes változatot is):\n\n';
    return 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Hibajelzés: ' + t) + '&body=' + encodeURIComponent(body);
  }
  function build() {
    var f = document.querySelector('footer.foot'); if (!f || f.querySelector('.ai-note')) return;
    var p = document.createElement('p'); p.className = 'ai-note';
    p.innerHTML = '🤖 <b>Mesterséges intelligencia segítségével készült.</b> A Tudásműhely tartalmát és programját MI segítségével írtuk – ez teszi lehetővé, hogy ilyen sok témát, ilyen részletesen és ingyen kínálhassunk. Az MI és az ember is tévedhet, ezért az itt olvasottakat érdemes kritikusan kezelni, és fontos ügyekben más forrásból is ellenőrizni. <b>Hibát találtál?</b> Írd meg nekünk – kijavítjuk! <a class="btn sm" id="hibajelzes" href="' + link() + '">✉️ Hibát jelzek</a>';
    f.insertBefore(p, f.firstChild);
    p.querySelector('#hibajelzes').addEventListener('click', function () { this.href = link(); });
  }
  document.addEventListener('DOMContentLoaded', build);
  if (document.readyState !== 'loading') build();
})();
