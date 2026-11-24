/* Tudásműhely – offline gyorsítótár.
 * Webszerverről megnyitva az első látogatás után minden fájl a gépen marad,
 * így a tananyag internet nélkül is betölt. Stratégia: a gyorsítótárból
 * azonnal kiszolgál, a háttérben pedig frissít (stale-while-revalidate). */
var CACHE = 'tudasmuhely-v11';
var CORE = ['./', './index.html', './css/style.css', './js/core.js', './js/university.js', './js/teszt.js', './js/hibakereses.js', './js/kapcsolas.js', './js/haladas.js', './js/utvonalak.js', './js/felkeszito.js', './js/eszkozok.js', './js/tartalom.js', './js/kartyak.js', './js/tudtad.js', './js/sport.js', './js/nyelvek.js', './js/widgets.js', './js/explorer.js', './js/app.js', './manifest.webmanifest', './icons/icon.svg'];

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
  e.respondWith(caches.open(CACHE).then(function (cache) {
    return cache.match(e.request, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        if (res && res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    });
  }));
});
