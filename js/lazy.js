/* Tudásműhely – ⚡ gyorsabb betöltés.
 * A nagy adatcsomagok (egyetemi kurzusok, egyszerű magyarázatok, kérdésbank, Tudtad?, nyelvek,
 * szakmai kiegészítők) nem az első képernyő előtt töltődnek be, hanem utána, a háttérben.
 * Az index.html-ben így szerepelnek:  <script data-lazy="csoport" data-src="data/…/fajl.js"></script>
 * Az egyfájlos változatban (tools/build-single.js) a kód <script type="text/x-lazy"> elemben van beágyazva.
 * S.need(cb): ha minden betöltődött, azonnal hívja cb-t, különben a betöltés végén. */
(function () {
  'use strict';
  var S = window.STUDIE;
  var state = 0, waiting = []; /* 0: nem indult, 1: folyamatban, 2: kész */
  S.lazyReady = false;
  function items() { return [].slice.call(document.querySelectorAll('script[data-lazy]')); }
  function finish() {
    state = 2; S.lazyReady = true;
    var w = waiting; waiting = [];
    w.forEach(function (cb) { try { cb(); } catch (e) { setTimeout(function () { throw e; }); } });
  }
  function start() {
    if (state) return; state = 1;
    var list = items();
    if (!list.length) { finish(); return; }
    var inline = list.filter(function (el) { return el.type === 'text/x-lazy'; });
    if (inline.length) {
      /* egyfájlos változat: kis adagokban futtatjuk, hogy a lap közben is reagáljon */
      var i = 0;
      (function step() {
        var t = Date.now();
        while (i < inline.length && Date.now() - t < 40) {
          var s = document.createElement('script'); s.textContent = inline[i++].textContent; document.head.appendChild(s);
        }
        if (i < inline.length) setTimeout(step, 0); else finish();
      })();
      return;
    }
    var left = list.length;
    function done() { if (--left === 0) finish(); }
    list.forEach(function (el) {
      var s = document.createElement('script');
      s.async = false; /* a beszúrás sorrendjében futnak le */
      s.src = el.getAttribute('data-src');
      s.onload = done;
      s.onerror = function () { if (window.console) console.warn('Nem sikerült betölteni: ' + s.src); done(); };
      document.head.appendChild(s);
    });
  }
  S.need = function (cb) {
    if (state === 2) { cb(); return; }
    waiting.push(cb); start();
  };
  S.lazyStart = start;
})();
