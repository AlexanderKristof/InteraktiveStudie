/* Tudásműhely – offline gyorsítótár.
 * Webszerverről megnyitva az első látogatás után minden fájl a gépen marad,
 * így a tananyag internet nélkül is betölt. Stratégia: a gyorsítótárból
 * azonnal kiszolgál, a háttérben pedig frissít (előbb a hálózat, internet nélkül a gyorsítótár). */
var CACHE = 'tudasmuhely-v25';
var CORE = ['./', './index.html', './css/style.css', './js/core.js', './js/university.js', './js/teszt.js', './js/hibakereses.js', './js/kapcsolas.js', './js/haladas.js', './js/utvonalak.js', './js/felkeszito.js', './js/eszkozok.js', './js/tartalom.js', './js/kartyak.js', './js/tudtad.js', './js/sport.js', './js/nyelvek.js', './js/tanulas.js', './js/osszeallito.js', './js/szerepek.js', './js/aramkor-labor.js', './js/ismetles.js', './js/parbaj.js', './js/sajat.js', './js/mobilnav.js', './js/ujdonsagok.js', './js/widgets.js', './js/penz-widgets.js', './js/setup-szim.js', './js/explorer.js', './js/app.js', './manifest.webmanifest', './icons/icon.svg'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  /* Hálózat előbb (ha van internet, mindig a friss változat jön), különben a gyorsítótár.
   * Lassú hálózatnál 4 másodperc után a gyorsítótárból szolgálunk ki. */
  e.respondWith(caches.open(CACHE).then(function (cache) {
    var net = fetch(e.request, { cache: 'no-cache' }).then(function (res) {
      if (res && res.ok) cache.put(e.request, res.clone());
      return res;
    });
    var timer = new Promise(function (resolve) { setTimeout(resolve, 4000); }).then(function () { return cache.match(e.request, { ignoreSearch: true }); });
    return Promise.race([net.catch(function () { return null; }), timer]).then(function (r) {
      return r || net.catch(function () { return null; }).then(function (r2) { return r2 || cache.match(e.request, { ignoreSearch: true }); });
    });
  }));
});
