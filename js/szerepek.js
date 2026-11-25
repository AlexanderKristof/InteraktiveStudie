/* Tudásműhely – gyűjtőoldalak szerepek szerint: 👩‍🏫 Tanároknak (#/tanaroknak) és 🏋️ Edzőknek (#/edzoknek). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  function subj(id) { return S.subjects.filter(function (s) { return s.id === id; })[0]; }
  function tile(href, ico, title, txt) {
    return '<a class="card learn-tile" href="' + href + '"><span class="ico">' + ico + '</span><b>' + esc(title) + '</b><small>' + esc(txt) + '</small></a>';
  }
  function lessonTiles(s) {
    return s ? '<div class="section-title"><h2>' + s.icon + ' ' + esc(s.title) + '</h2><a href="#/tantargy/' + s.id + '">A tantárgy oldala →</a></div><div class="learn-grid">' +
      s.lessons.map(function (l) { return tile('#/lecke/' + s.id + '/' + l.id, '📘', l.title, l.summary || ''); }).join('') + '</div>' : '';
  }

  S.pageTanaroknak = function (main) {
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Tanároknak</span></nav>' +
      '<section class="learn-hero" style="background:linear-gradient(120deg,#7c3aed,#db2777)"><h1>👩‍🏫 Tanároknak</h1><p class="lead">Minden eszköz egy helyen, amivel az órára készülhetsz, dolgozatot állíthatsz össze, vagy az osztállyal közösen tanulhattok. Internet nélkül, regisztráció nélkül, ingyen.</p></section>' +
      '<div class="section-title"><h2>🧰 Eszközök az órához</h2></div><div class="learn-grid">' +
      tile('#/osszeallito', '🧩', 'Dolgozat-összeállító', 'Keress kulcsszóra kb. ' + Math.round(S.testGroups().reduce(function (a, g) { return a + g.topics.reduce(function (b, t) { return b + t.questions.length; }, 0); }, 0) / 100) * 100 + ' kérdés között, válogass, és nyomtass dolgozatot megoldókulccsal.') +
      tile('#/teszt', '🔗', 'Osztálydolgozat-link', 'A Tesztközpontban linket készíthetsz: minden diák ugyanazt a kérdés- és válaszsorrendet kapja, névvel és időkorláttal.') +
      tile('#/teszt', '🖨', 'Nyomtatható feladatlap', 'Témák kiválasztása után egy gombbal nyomtatható feladatlap és külön megoldókulcs.') +
      tile('#/tartalom', '📚', 'Tartalomjegyzék és tanmenet', 'Minden tantárgy oldalán „🖨 Tanmenet” gomb: a leckék, célok és interaktív elemek listája nyomtatva.') +
      tile('#/felkeszito', '📅', 'Felkészülési terv a diákoknak', 'A diákok megadják a dolgozat napját, és napokra bontott tervet, próbavizsgát kapnak.') +
      tile('#/tanulas', '📚', 'Tanulássegéd', 'Felidézés, gondolattérkép, villámjáték, fogalomkitaláló, Pomodoro – kutatással igazolt módszerek.') +
      '</div>' +
      '<div class="section-title"><h2>🎲 Ötletek közös, kivetített munkához</h2></div><div class="learn-grid">' +
      tile('#/felfedezo', '🔍', 'Szétszedhető modellek', 'Vetítsd ki a processzort, a szívet vagy az F1-autót, és a „Keresd meg!” játékkal az osztály közösen találja meg az alkatrészeket.') +
      tile('#/tanulas/igazhamis', '⚡', 'Igaz vagy hamis? – osztályverseny', 'Két csapat, felváltva döntenek 60 másodpercig. A végén közösen nézzétek át a rossz válaszokat.') +
      tile('#/tanulas/fogalom', '🔤', 'Fogalomkitaláló – csapatjáték', 'Felolvasod a meghatározást, a csapatok tippelnek. Iskolai nézetben egyszerű, hétköznapi magyarázatok jelennek meg.') +
      tile('#/tanulas/terkep', '🗺️', 'Gondolattérkép az óra végén', 'Vetítsd ki a lecke gondolattérképét, és kérd meg a diákokat, hogy fejből mondják el az ágakat.') +
      tile('#/tudtad', '💡', '„Tudtad?” óraindítónak', 'Egy meglepő tény az óra elején felkelti a figyelmet – minden leckéhez tartozik legalább egy.') +
      tile('#/egyetem', '🎒', 'Szintváltás 🎒/🎓', 'A fejléc gombjával ugyanaz a tartalom egyszerű vagy szakmai szinten jelenik meg – differenciáláshoz.') +
      '</div>' +
      (subj('tanari') ? lessonTiles(subj('tanari')) : '<p class="note">A tanári módszertan tantárgy hamarosan érkezik.</p>') +
      '<section class="card pad" style="margin-top:18px"><h2 style="margin-top:0">🔒 Adatvédelem az osztályban</h2><p>Az alkalmazás nem küld adatot sehova: a haladás, a jegyzetek és az eredmények csak az adott eszköz böngészőjében tárolódnak. Közös gépen a „Haladásom” oldalon fájlba menthető a haladás; törölni a böngésző webhelyadatainak törlésével lehet. Az osztálydolgozat-link eredményeit a diák mutatja meg (vagy fényképezi le) – nincs központi szerver.</p></section>';
    return true;
  };

  S.pageEdzoknek = function (main) {
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Edzőknek</span></nav>' +
      '<section class="learn-hero" style="background:linear-gradient(120deg,#0b7a3b,#0891b2)"><h1>🏋️ Edzőknek</h1><p class="lead">Edzéstervezés, terhelésmonitorozás, sérülésmegelőzés, gyerekedzés és sportpszichológia – tudományos alapokon, gyakorlati eszközökkel.</p></section>' +
      '<div class="widget card" id="ed-load"></div>' +
      '<div class="section-title"><h2>🧰 Eszközök és tartalmak</h2></div><div class="learn-grid">' +
      tile('#/sport', '🏆', 'Így edzenek a legjobbak', 'Kb. 130 tudományosan magyarázott edzésmódszer a világ legjobb sportolóitól – mutasd meg a csapatodnak is!') +
      tile('#/lecke/sport/edzeselmelet', '📈', 'Edzéselmélet, regeneráció, alvás', 'Szuperkompenzáció, terhelés–pihenés, alvás szerepe – a Sport és tudomány tantárgyból.') +
      tile('#/lecke/sport/sportpszichologia', '🧠', 'Sportpszichológia', 'Motiváció, fókusz, kudarcok feldolgozása.') +
      tile('#/lecke/sport/taplalkozas', '🥗', 'Táplálkozás és folyadék', 'Szénhidrát, fehérje, hidratálás – kiegészítők és extrém diéták nélkül.') +
      tile('#/setup', '🏁', 'Motorsport: setup-szimulátor', 'Versenymérnöki gondolkodás: minden állítás előnye és hátránya.') +
      tile('#/osszeallito', '🧩', 'Kérdések a csapatnak', 'Állíts össze egy rövid kvízt szabályokról, taktikáról, sporttudományról.') +
      '</div>' +
      (subj('edzo') ? lessonTiles(subj('edzo')) : '<p class="note">Az edzői ismeretek tantárgy hamarosan érkezik.</p>') +
      '<section class="card pad" style="margin-top:18px"><h2 style="margin-top:0">🛟 Biztonság mindenekelőtt</h2><p>Fejsérülés gyanújánál: <b>„Ha kétséges, állítsd le!”</b> – a sportoló aznap ne térjen vissza a játékba, és orvos döntsön a visszatérésről. Hőségben gyakori itatás, árnyék, könnyebb edzés. Sürgős esetben: <b>112</b>.</p></section>';
    if (S.widgets.terheles) S.widgets.terheles(main.querySelector('#ed-load'), {});
    return true;
  };
})();
