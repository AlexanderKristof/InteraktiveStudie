/* Tudásműhely – 📱 alsó menüsor telefonon (mint egy appban) + „Menü” lap az összes oldallal. */
(function () {
  'use strict';
  if (typeof document === 'undefined') return;
  var S = window.STUDIE;
  var TABS = [['#/', '🏠', 'Kezdőlap', 'home'], ['#/kereses', '🔎', 'Keresés', 'kereses'], ['#/teszt', '📝', 'Teszt', 'teszt'], ['#/tanulas', '📚', 'Tanulás', 'tanulas']];
  var MENU = [
    ['#/ujdonsagok', '🆕', 'Újdonságok'], ['#/', '📘', 'Tantárgyak'], ['#/felfedezo', '🔍', 'Mi miből áll?'], ['#/egyetem', '🎓', 'Egyetem'],
    ['#/teszt', '📝', 'Tesztközpont'], ['#/ismetles', '🔁', 'Mai ismétlés'], ['#/parbaj', '⚔️', 'Párbaj'], ['#/sajat', '✏️', 'Saját kérdések'],
    ['#/tanulas', '📚', 'Tanulássegéd'], ['#/felkeszito', '📅', 'Vizsgára'], ['#/tudtad', '💡', 'Tudtad?'], ['#/sport', '⚽', 'Sport'],
    ['#/nyelvek', '🗣️', 'Nyelvek'], ['#/utvonalak', '🧭', 'Útvonalak'], ['#/tanaroknak', '👩‍🏫', 'Tanároknak'], ['#/edzoknek', '🏋️', 'Edzőknek'],
    ['#/tartalom', '📚', 'Tartalomjegyzék'], ['#/haladas', '📈', 'Haladásom'], ['#/jegyzetek', '📝', 'Jegyzeteim'], ['#/beallitasok', '⚙️', 'Beállítások']
  ];
  /* a bővítmények (labor, szimulátorok, pályaorientáció…) maguktól is felkerülnek, ha léteznek */
  var EXTRA = [['labor', '🧪', 'Virtuális labor'], ['aramkor', '🔌', 'Áramkör-labor'], ['feladatok', '🧮', 'Feladatmegoldó'], ['szimulatorok', '💹', 'Szimulátorok'], ['palya', '🧭', 'Pályaorientáció'], ['setup', '🏁', 'Setup-szimulátor'], ['erettsegi', '🎓', 'Érettségi'], ['kodolas', '💻', 'Programozás'], ['szabadulo', '🔐', 'Szabadulószoba'], ['idovonal', '🕰️', 'Idővonal'], ['gyengepontok', '🎯', 'Gyengepontok'], ['magyarazd', '🗣️', 'Magyarázd el!'], ['fuzet', '📓', 'Jegyzetfüzet'], ['szinkron', '🔄', 'Átvitel']];
  function build() {
    if (document.getElementById('mnav')) return;
    var extra = EXTRA.filter(function (e) { return (S.routes && S.routes[e[0]]) || e[0] === 'setup'; }).map(function (e) { return ['#/' + e[0], e[1], e[2]]; });
    var nav = document.createElement('nav');
    nav.id = 'mnav'; nav.className = 'mnav'; nav.setAttribute('aria-label', 'Alsó menü');
    nav.innerHTML = TABS.map(function (t) { return '<a href="' + t[0] + '" data-m="' + t[3] + '"><span>' + t[1] + '</span><small>' + t[2] + '</small></a>'; }).join('') +
      '<button type="button" id="mnav-more" aria-expanded="false"><span>☰</span><small>Menü</small></button>';
    var sheet = document.createElement('div');
    sheet.id = 'msheet'; sheet.className = 'msheet'; sheet.hidden = true;
    sheet.innerHTML = '<div class="msheet-in" role="dialog" aria-label="Menü"><div class="msheet-h"><b>Minden oldal</b><button type="button" class="btn sm" id="msheet-x">✕</button></div><div class="msheet-g">' +
      MENU.concat(extra).map(function (m) { return '<a href="' + m[0] + '"><span>' + m[1] + '</span><small>' + m[2] + '</small></a>'; }).join('') + '</div></div>';
    document.body.appendChild(sheet); document.body.appendChild(nav);
    var more = nav.querySelector('#mnav-more');
    function close() { sheet.hidden = true; more.setAttribute('aria-expanded', 'false'); }
    more.addEventListener('click', function () { sheet.hidden = !sheet.hidden; more.setAttribute('aria-expanded', String(!sheet.hidden)); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet || e.target.closest('a') || e.target.id === 'msheet-x') close(); });
    window.addEventListener('hashchange', function () { close(); mark(); });
    mark();
  }
  function mark() {
    var page = (location.hash.replace(/^#\/?/, '').split(/[/?]/)[0]) || 'home';
    document.querySelectorAll('#mnav a').forEach(function (a) { a.classList.toggle('on', a.dataset.m === page); });
    var n = S.newsUnseen ? S.newsUnseen().length : 0, more = document.getElementById('mnav-more'), dot = more && more.querySelector('.nb');
    if (more) { if (n && !dot) more.insertAdjacentHTML('beforeend', '<i class="nb mnb">' + n + '</i>'); else if (dot) { if (n) dot.textContent = n; else dot.remove(); } }
  }
  document.addEventListener('DOMContentLoaded', build);
  if (document.readyState !== 'loading') build();
})();
