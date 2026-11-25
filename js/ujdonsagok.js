/* Tudásműhely – 🆕 Újdonságok: mi került fel legutóbb (#/ujdonsagok). Adat: data/ujdonsagok.js */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  S.news = [];
  S.addNews = function (n) { S.news.push(n); };
  function seen() { return S.store.get('ujdonsag.latott', {}); }
  S.newsUnseen = function () { var s = seen(); return S.news.filter(function (n) { return !s[n.id]; }); };
  S.paintNewsBadge = function () {
    var a = document.querySelector('.topnav a[data-nav="ujdonsagok"]'); if (!a) return;
    var n = S.newsUnseen().length, b = a.querySelector('.nb');
    if (n && !b) { a.insertAdjacentHTML('beforeend', ' <span class="nb">' + n + '</span>'); }
    else if (b) { if (n) b.textContent = n; else b.remove(); }
  };
  function plusHtml(n) {
    return (n.plus || []).map(function (p) { return '<span class="nw-plus"><b>' + esc(p[0]) + '</b> ' + esc(p[1]) + '</span>'; }).join('');
  }
  S.newsHomeCard = function () {
    var un = S.newsUnseen(), n = un[0] || S.news[0];
    if (!n) return '';
    return '<a class="card nw-home' + (un.length ? ' fresh' : '') + '" href="#/ujdonsagok"><span class="ico">🆕</span><span><small>' + (un.length ? un.length + ' új frissítés, amit még nem néztél meg' : 'Legutóbbi frissítés') + ' · ' + esc(n.date) + '</small>' +
      '<b>' + esc(n.title) + '</b><span class="nw-pl">' + plusHtml(n) + '</span></span><span class="btn primary">Megnézem →</span></a>';
  };
  S.pageUjdonsagok = function (main) {
    var s = seen();
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Újdonságok</span></nav>' +
      '<h1>🆕 Újdonságok</h1><p class="lead">Minden frissítés itt jelenik meg: mi lett új, mennyivel bővült, és egy kattintással oda is mehetsz.</p>' +
      S.news.map(function (n) {
        return '<section class="card pad nw-item' + (!s[n.id] ? ' fresh' : '') + '"><div class="nw-head"><h2>' + esc(n.title) + '</h2><small class="muted">' + esc(n.date) + (!s[n.id] ? ' · <b class="nw-new">ÚJ</b>' : '') + '</small></div>' +
          (n.plus && n.plus.length ? '<div class="nw-pl">' + plusHtml(n) + '</div>' : '') +
          '<ul class="nw-list">' + (n.items || []).map(function (it) { return '<li>' + (it[1] ? '<a href="' + it[1] + '">' + esc(it[0]) + ' →</a>' : esc(it[0])) + '</li>'; }).join('') + '</ul></section>';
      }).join('');
    S.news.forEach(function (n) { s[n.id] = 1; }); S.store.set('ujdonsag.latott', s);
    S.paintNewsBadge();
    return true;
  };
  if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', function () { if (S.paintNewsBadge) S.paintNewsBadge(); });
})();
