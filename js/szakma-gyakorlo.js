/* Tudásműhely – szakmai számolásgyakorló widget (végtelen feladatsor, lépésenkénti megoldással).
 * Használat egy lecke szakaszában: widget: { type: 'szakma-gyakorlo', options: { kind: 'adag' | 'ean' | 'rendelesipont' | 'eoq' | 'pekszazalek' | 'oxidalo' | 'arkepzes', title, help } }
 * Kizárólag gyakorlásra: a valódi munkában (különösen a gyógyszerelésben) mindig a rendelés, a protokoll és a kettős ellenőrzés az irányadó. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(arr) { return arr[ri(0, arr.length - 1)]; }
  function nf(x) { return (Math.round(x * 100) / 100).toString().replace('.', ','); }

  var GEN = {
    /* Gyógyszeradag-számítás: hány ml-t kell kimérni? (térfogat = előírt dózis / koncentráció) */
    adag: function () {
      var c = pick([[10, 'mg/ml'], [20, 'mg/ml'], [25, 'mg/ml'], [50, 'mg/ml'], [5, 'mg/ml'], [2, 'mg/ml']]), v = pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]);
      var d = c[0] * v;
      if (Math.random() < 0.3) {
        var tab = pick([50, 100, 250, 500]), n = pick([0.5, 1, 2]);
        return { task: 'Rendelés: ' + nf(tab * n) + ' mg. Egy tabletta ' + tab + ' mg. Hány tabletta?', answer: n, tol: 0.001,
          steps: ['tabletta = előírt dózis / egy tabletta hatóanyag-tartalma', '= ' + nf(tab * n) + ' mg / ' + tab + ' mg = ' + nf(n) + ' tabletta', 'Felezni csak bemetszett (felezővonalas) és felezésre engedélyezett tablettát szabad!'] };
      }
      return { task: 'Rendelés: ' + nf(d) + ' mg. Az oldat ' + c[0] + ' ' + c[1] + '. Hány ml?', answer: v, tol: 0.001,
        steps: ['térfogat = előírt dózis / koncentráció', '= ' + nf(d) + ' mg / ' + c[0] + ' mg/ml = ' + nf(v) + ' ml', 'Ellenőrzés: ' + nf(v) + ' ml · ' + c[0] + ' mg/ml = ' + nf(d) + ' mg ✔'] };
    },
    /* EAN-13 / GTIN-13 ellenőrző számjegy */
    ean: function () {
      var d = [5, 9, 9], i, sum = 0;
      for (i = 0; i < 9; i++) d.push(ri(0, 9));
      for (i = 0; i < 12; i++) sum += d[i] * (i % 2 === 0 ? 1 : 3);
      var cd = (10 - sum % 10) % 10;
      return { task: 'EAN-13: ' + d.join('') + '? – mi az ellenőrző számjegy?', answer: cd,
        steps: ['Az első 12 számjegyet balról felváltva 1-gyel és 3-mal szorozzuk:', d.map(function (x, k) { return x + '·' + (k % 2 === 0 ? 1 : 3); }).join(' + ') + ' = ' + sum,
          'A következő 10-es többszörösig hiányzó rész: ' + (Math.ceil(sum / 10) * 10) + ' − ' + sum + ' = ' + cd, 'A teljes kód: ' + d.join('') + cd] };
    },
    /* Rendelési pont */
    rendelesipont: function () {
      var u = ri(4, 40) * 5, l = ri(2, 10), b = ri(1, 6) * u / 2;
      b = Math.round(b);
      return { task: 'Napi felhasználás ' + u + ' db, utánpótlási idő ' + l + ' nap, biztonsági készlet ' + b + ' db. Rendelési pont = ? db', answer: u * l + b,
        steps: ['Rendelési pont = napi felhasználás · utánpótlási idő + biztonsági készlet', '= ' + u + ' · ' + l + ' + ' + b + ' = ' + (u * l + b) + ' db', 'Ha a készlet erre a szintre csökken, rendelni kell.'] };
    },
    /* Gazdaságos rendelési tételnagyság (Wilson-képlet) */
    eoq: function () {
      var set = pick([[20000, 5000, 2], [12000, 3000, 5], [8000, 2500, 4], [50000, 4000, 10], [18000, 6000, 15], [32000, 2000, 5], [9000, 8000, 10]]);
      var D = set[0], K = set[1], H = set[2], q = Math.sqrt(2 * D * K / H);
      return { task: 'Éves igény D = ' + D + ' db, rendelési költség K = ' + K + ' Ft/rendelés, tartási költség H = ' + H + ' Ft/db/év. EOQ = ? db (egészre kerekítve)', answer: Math.round(q), tol: 1,
        steps: ['EOQ = √(2 · D · K / H)', '= √(2 · ' + D + ' · ' + K + ' / ' + H + ') = √' + Math.round(2 * D * K / H), '≈ ' + Math.round(q) + ' db', 'Évente kb. ' + nf(D / q) + ' rendelés.'] };
    },
    /* Sütőipari (pék-) százalék: minden a liszt tömegéhez viszonyítva */
    pekszazalek: function () {
      var flour = pick([500, 1000, 1500, 2000, 2500, 5000, 10000]);
      var it = pick([['víz', [60, 62, 65, 68, 70, 75]], ['só', [1.8, 2]], ['friss élesztő', [1, 1.5, 2, 3]], ['cukor', [5, 8, 10]], ['vaj', [10, 15, 20]]]);
      var p = pick(it[1]);
      if (Math.random() < 0.35) {
        var g = flour * p / 100;
        return { task: nf(g) + ' g ' + it[0] + ' jut ' + flour + ' g lisztre. Hány sütőipari %?', answer: p, tol: 0.01,
          steps: ['sütőipari % = összetevő tömege / liszt tömege · 100', '= ' + nf(g) + ' / ' + flour + ' · 100 = ' + nf(p) + ' %'] };
      }
      return { task: flour + ' g liszt, ' + it[0] + ': ' + nf(p) + ' % (sütőipari %). Hány gramm ' + it[0] + ' kell?', answer: flour * p / 100, tol: 0.01,
        steps: ['A liszt mindig 100 %. Összetevő = liszt · % / 100', '= ' + flour + ' · ' + nf(p) + ' / 100 = ' + nf(flour * p / 100) + ' g'] };
    },
    /* Hajfesték és oxidálószer keverése */
    oxidalo: function () {
      var r = pick([[1, 1], [1, 1.5], [1, 2]]), f = pick([30, 40, 45, 50, 60, 90]);
      return { task: 'Keverési arány festék : oxidálószer = ' + nf(r[0]) + ' : ' + nf(r[1]) + '. ' + f + ' g festékhez hány gramm oxidálószer kell?', answer: f * r[1] / r[0], tol: 0.01,
        steps: ['oxidálószer = festék · (' + nf(r[1]) + ' / ' + nf(r[0]) + ')', '= ' + f + ' · ' + nf(r[1] / r[0]) + ' = ' + nf(f * r[1] / r[0]) + ' g', 'Mindig a gyártó keverési arányát használd, és mérlegen mérj!'] };
    },
    /* Szolgáltatás árképzése */
    arkepzes: function () {
      var anyag = ri(2, 12) * 500, ido = pick([30, 45, 60, 90, 120]), oradij = pick([4000, 5000, 6000, 8000]), hasz = pick([10, 15, 20]);
      var munka = oradij * ido / 60, net = (anyag + munka) * (1 + hasz / 100);
      return { task: 'Anyagköltség ' + anyag + ' Ft, munkaidő ' + ido + ' perc, órára jutó költség (bér + rezsi) ' + oradij + ' Ft, haszonkulcs ' + hasz + ' %. Nettó ár = ? Ft', answer: Math.round(net), tol: 1,
        steps: ['Munkaköltség = ' + oradij + ' · ' + ido + ' / 60 = ' + nf(munka) + ' Ft', 'Önköltség = ' + anyag + ' + ' + nf(munka) + ' = ' + nf(anyag + munka) + ' Ft', 'Nettó ár = önköltség · (1 + ' + hasz + '/100) = ' + Math.round(net) + ' Ft', 'Ha áfakörös vagy, erre jön még az áfa.'] };
    }
  };

  S.addWidget('szakma-gyakorlo', function (el, o) {
    o = o || {};
    var kind = GEN[o.kind] ? o.kind : 'adag', cur, total = 0, good = 0, streak = 0;
    el.innerHTML = '<div class="w-title">' + esc(o.title || 'Számolj!') + '</div><p class="w-help">' + S.inline(o.help || 'Végtelen sok feladat: mindig újat kapsz. Írd be a választ, és nézd meg a megoldás lépéseit.') + '</p>' +
      '<div class="practice szgy"><div class="task szgy-task"></div><form class="row szgy-form"><input type="text" inputmode="decimal" class="szgy-in" aria-label="Válasz" placeholder="válasz">' +
      '<button class="btn primary" type="submit">Ellenőrzés</button><button class="btn szgy-next" type="button">Új feladat</button></form>' +
      '<div class="szgy-fb" style="margin-top:10px"></div><p class="muted szgy-st"></p></div>';
    var q = function (s) { return el.querySelector(s); };
    function next() { cur = GEN[kind](); q('.szgy-task').textContent = cur.task; q('.szgy-in').value = ''; q('.szgy-fb').innerHTML = ''; }
    q('.szgy-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var val = parseFloat(q('.szgy-in').value.replace(/\s/g, '').replace(',', '.'));
      if (isNaN(val)) { q('.szgy-fb').innerHTML = '<div class="w-msg warn">Írj be egy számot!</div>'; return; }
      var ok = Math.abs(val - cur.answer) <= (cur.tol || 1e-6);
      total++; if (ok) { good++; streak++; } else streak = 0;
      q('.szgy-fb').innerHTML = '<div class="w-msg ' + (ok ? 'ok' : 'bad') + '">' + (ok ? '✔ Helyes!' : '✘ Nem jó. A helyes válasz: ' + nf(cur.answer)) + '</div>' +
        '<div class="w-formula" style="margin-top:8px">' + cur.steps.map(esc).join('<br>') + '</div>';
      q('.szgy-st').textContent = 'Eredmény: ' + good + ' / ' + total + (streak > 1 ? ' · sorozat: ' + streak + ' 🔥' : '');
    });
    q('.szgy-next').addEventListener('click', next);
    next();
  });
  S.szakmaGyakorlo = GEN;
})();
