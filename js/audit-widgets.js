/* Tudásműhely – könyvvizsgálati és IFRS-gyakorlók, kalkulátorok.
 * Szakszóban:  widget: { type: 'audit-allitas' }
 *   Könyvvizsgálat (ISA): audit-allitas („Melyik állítás?”), audit-vouching („Vouching vagy tracing?”),
 *                         audit-matrix (eljárás ↔ állítás tábla), audit-lenyegesseg (ISA 320), audit-jelentes (ISA 700/705/706 döntőfa)
 *   IFRS:                 ifrs-lizing (IFRS 16), ifrs-ecl (IFRS 9), ifrs-felosztas (IFRS 15), ifrs-ertekvesztes (IAS 36),
 *                         ifrs-halasztott-ado (IAS 12), ifrs-keszlet (IAS 2)
 * A widgetek nem használnak id-t, így egy oldalon több példány is futhat. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  function nf(n, d) { return isFinite(n) ? S.fmt(n, d == null ? 0 : d) : '–'; }
  function head(t, h) { return '<div class="w-title">' + esc(t) + '</div>' + (h ? '<p class="w-help">' + S.inline(h) + '</p>' : ''); }
  function field(k, label, val, unit, extra) {
    return '<label class="pw-f"><span>' + esc(label) + '</span><span class="pw-in"><input data-f="' + k + '" type="number" inputmode="decimal" value="' + val + '"' + (extra || '') + '><small>' + esc(unit || '') + '</small></span></label>';
  }
  function val(el, k) { var i = el.querySelector('[data-f="' + k + '"]'); var v = parseFloat(String(i.value).replace(/\s/g, '').replace(',', '.')); return isFinite(v) ? v : 0; }
  function rows(list) {
    return '<table class="pw-table"><tbody>' + list.map(function (r) { return '<tr' + (r[2] ? ' class="' + r[2] + '"' : '') + '><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table>';
  }
  function seg(name, opts, cur) {
    return '<div class="seg aw-seg" data-seg="' + name + '">' + opts.map(function (o) {
      return '<button type="button" data-val="' + esc(o[0]) + '" class="' + (o[0] === cur ? 'on' : '') + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function onSeg(el, name, cb) {
    var box = el.querySelector('[data-seg="' + name + '"]');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-val]'); if (!b) return;
      box.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      cb(b.dataset.val);
    });
  }
  function live(el, fn) { el.addEventListener('input', fn); el.addEventListener('change', fn); fn(); }
  function table(headCells, bodyRows, cls) {
    return '<div class="aw-scroll"><table class="aw-table' + (cls ? ' ' + cls : '') + '"><thead><tr>' + headCells.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      bodyRows.map(function (r) { return '<tr' + (r.cls ? ' class="' + r.cls + '"' : '') + '>' + (r.cells || r).map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }

  /* ======================================================================
   * 1. „Melyik állítás?” – ISA 315 (2019) állítások gyakorlása
   * ====================================================================== */
  var AS = {
    B: 'Bekövetkezés (megtörténtség)', L: 'Létezés', T: 'Teljesség', P: 'Pontosság, értékelés és felosztás',
    I: 'Időbeli elhatárolás (cut-off)', S: 'Besorolás', J: 'Jogok és kötelezettségek', M: 'Bemutatás'
  };
  /* [helyzet, helyes állítás, magyarázat] */
  var HELYZETEK = [
    ['Az árbevétel-főkönyvből kiválasztott számlákhoz megkeresi a vevő által aláírt szállítólevelet.', 'B', 'A könyvelt tételből indul vissza a forrásig (vouching): azt teszteli, hogy a rögzített eladás valóban megtörtént-e – fiktív árbevétel ellen.'],
    ['A szállítólevél-tömb sorszámai közül kiválasztott szállításokat visszakeresi a számlázásban és a főkönyvben.', 'T', 'A forrásból indul a könyv felé (tracing): azt nézi, minden megtörtént szállítás bekerült-e az árbevételbe.'],
    ['Közvetlenül a banktól kér egyenlegközlőt a fordulónapi számlaegyenlegekről.', 'L', 'A banki megerősítés elsősorban a létezést (és a jogokat) igazolja; mivel a bank minden számlát felsorol, a teljességre is ad bizonyítékot.'],
    ['A tárgyieszköz-nyilvántartásból kiválasztott gépeket személyesen megkeresi a gyártócsarnokban.', 'L', 'Nyilvántartás → fizikai eszköz: a kimutatott eszköz létezik-e.'],
    ['A gyártócsarnokban kiválasztott gépekről ellenőrzi, hogy szerepelnek-e a tárgyieszköz-nyilvántartásban.', 'T', 'Fizikai eszköz → nyilvántartás: minden meglévő eszközt nyilvántartanak-e.'],
    ['Az utolsó decemberi és az első januári szállítóleveleket egyezteti a számlák könyvelési dátumával.', 'I', 'Klasszikus cut-off teszt: a fordulónap körüli ügyletek a helyes időszakba kerültek-e.'],
    ['A január–februári kifizetések közül megkeresi azokat, amelyek decemberi teljesítésre vonatkoznak, és ellenőrzi, hogy a kötelezettséget decemberben könyvelték-e.', 'T', 'El nem számolt kötelezettségek keresése: a könyveken kívüli forrásból (kifizetésből) indul, a szállítók teljességét teszteli.'],
    ['Újraszámolja a gépek éves értékcsökkenését a hasznos élettartam és a maradványérték alapján.', 'P', 'Az értékcsökkenés a bekerülési érték időszakok közötti felosztása: pontosság, értékelés és felosztás.'],
    ['A korosított vevőlista és a januári befolyások alapján értékeli, elegendő-e a vevőkre elszámolt értékvesztés.', 'P', 'A behajthatóság az egyenleg értékelésének kérdése.'],
    ['Megvizsgálja, hogy a raktárban lévő áruk között nincs-e bizományba kapott, idegen tulajdonú készlet.', 'J', 'A készlet létezik, de a kérdés az, hogy a cégé-e: jogok és kötelezettségek.'],
    ['A tulajdoni lapon ellenőrzi, hogy az irodaház a társaság nevén áll.', 'J', 'A tulajdonjog igazolása a jogok állítást teszteli.'],
    ['Ellenőrzi, hogy a hosszú lejáratú hitel következő 12 hónapban esedékes törlesztőrésze a rövid lejáratú kötelezettségek között szerepel.', 'S', 'A rövid és hosszú lejárat elkülönítése besorolási kérdés.'],
    ['Az aktivált beruházások között megkeresi a valójában karbantartásnak minősülő, költségként elszámolandó tételeket.', 'S', 'Felújítás vagy javítás? A megfelelő számlára (eszköz vagy ráfordítás) kerülés besorolás – egyben értékelési hatása is van.'],
    ['Ellenőrzi, hogy a kiegészítő melléklet bemutatja a hitel fedezetéül szolgáló jelzálogot.', 'M', 'A közzététel teljessége és megfelelősége a bemutatás állítás része.'],
    ['A kiválasztott beszerzési számlákon újraszámolja az ár × mennyiség szorzatot és az engedményt.', 'P', 'Az ügylet összegének helyessége: pontosság.'],
    ['Ellenőrzi, hogy az euróban fennálló szállítói tartozást a fordulónapi árfolyamon számították át.', 'P', 'A fordulónapi átszámítás az egyenleg értékelése.'],
    ['Minden decemberi áruátvételi jegyről ellenőrzi, hogy a hozzá tartozó szállítói kötelezettség szerepel-e a könyvekben.', 'T', 'Forrásdokumentumból (átvételi jegy) indul a könyvek felé: teljesség.'],
    ['A bérfőkönyvből kiválasztott munkavállalókról munkaszerződéssel és belépési adatokkal ellenőrzi, hogy valóban dolgoznak a cégnél.', 'B', 'A „fantomdolgozó” elleni teszt: a könyvelt bérkifizetés valós munkavállalóhoz, megtörtént munkához tartozik-e.'],
    ['A leltáron a leltárlistáról kiválasztott tételeket megszámolja a polcon.', 'L', 'Lista → polc: a nyilvántartott készlet létezik-e.'],
    ['A leltáron a polcon kiválasztott dobozokat visszakeresi a leltárlistában.', 'T', 'Polc → lista: minden meglévő készlet szerepel-e a listán.'],
    ['A fordulónap utáni eladási árakat összeveti a készlet bekerülési értékével.', 'P', 'Nettó realizálható érték vizsgálata: az egyenleg értékelése.'],
    ['Megvizsgálja, hogy a januári jóváírások és visszáruk nem decemberben árbevételként elszámolt szállításokra vonatkoznak-e.', 'I', 'A fordulónap utáni visszárukból derül ki, hogy a decemberi árbevétel a helyes időszakba került-e (és megtörtént-e egyáltalán).'],
    ['Ügyvédi levélben kér tájékoztatást a folyamatban lévő perekről és várható kimenetelükről.', 'T', 'A kötelezettségek és a céltartalékok teljességét teszteli: van-e ki nem mutatott kötelem (az értékeléshez is ad bizonyítékot).'],
    ['Ellenőrzi, hogy a kapcsolt felekkel kötött ügyletek a kiegészítő mellékletben szerepelnek.', 'M', 'A közzététel teljessége: bemutatás.'],
    ['A vevőknek kiküldött pozitív megerősítő levelekre adott válaszokat egyezteti az analitikával.', 'L', 'A vevő elismeri a tartozást: a követelés létezik (az értékelést viszont csak gyengén támasztja alá).'],
    ['Ellenőrzi, hogy az engedményezett (faktorált) vevőköveteléseket kivezették a könyvekből.', 'J', 'Az engedményezett követelés már nem a cégé: jogok és kötelezettségek.'],
    ['Megnézi, hogy a decemberben kifizetett jövő évi biztosítási díjat aktív időbeli elhatárolásként mutatták-e ki.', 'I', 'A ráfordítás a helyes időszakba került-e: időbeli elhatárolás.'],
    ['A leltár napján rögzíti az utolsó kiadott szállítólevél sorszámát.', 'I', 'Ez a későbbi cut-off teszt alapja: melyik szállítás tartozik még az időszakba.'],
    ['A kiválasztott értékesítési számlákon ellenőrzi az alkalmazott árat a jóváhagyott árlistával.', 'P', 'Az ügylet összegének helyessége: pontosság.'],
    ['Ellenőrzi, hogy az ügyvezetőnek adott kölcsön nem a vevők között, hanem a kapcsolt felekkel szembeni követelések között szerepel.', 'S', 'A megfelelő soron való kimutatás besorolás (a mellékletben pedig bemutatás).'],
    ['A szállítói törzsadatban szereplő új szállítókról cégjegyzékkel és adószámmal ellenőrzi, hogy valós vállalkozások.', 'B', 'Fiktív szállító elleni teszt: a könyvelt beszerzések megtörtént ügyletekhez tartoznak-e.'],
    ['Elemző eljárással összeveti a havi rezsiköltségeket, és keresi a hiányzó hónapokat.', 'T', 'A hiányzó havi költség el nem számolt ráfordításra utal: teljesség.'],
    ['Megvizsgálja, hogy a garanciális céltartalék összege összhangban van-e a múltbeli javítási arányokkal.', 'P', 'A becslés összegének megalapozottsága: értékelés.'],
    ['Ellenőrzi, hogy a goodwill értékvesztés-tesztjének kulcsfeltevéseit és az érzékenységvizsgálatot a melléklet a standard szerint bemutatja.', 'M', 'A közzététel megfelelősége: bemutatás.'],
    ['A pénztár meglepetésszerű ellenőrzésekor megszámolja a készpénzt.', 'L', 'Fizikai számlálás: a kimutatott pénz létezik-e.'],
    ['Megvizsgálja a kiadott nyugták sorszám-folytonosságát, és hogy minden nyugta szerepel-e a pénztárnaplóban.', 'T', 'Sorszám-folytonosság: minden bevételt rögzítettek-e.'],
    ['Külső raktárban tárolt készletről megerősítést kér a raktár üzemeltetőjétől.', 'L', 'Harmadik félnél lévő készlet létezésének igazolása (a jogokra is ad bizonyítékot).'],
    ['A beruházási számlákon könyvelt költségekről ellenőrzi, hogy valóban a társaság által megrendelt és átvett munkákra vonatkoznak.', 'B', 'A könyvelt ügylet megtörtént és a gazdálkodóhoz tartozik: bekövetkezés.'],
    ['A fordulónap után átnézi az igazgatósági jegyzőkönyveket kötelezettségvállalások és perek után kutatva.', 'T', 'Ki nem mutatott kötelezettségek, céltartalékok keresése: teljesség.'],
    ['Ellenőrzi, hogy a tulajdonos magánautóját nem a cég eszközei között tartják nyilván.', 'J', 'Az eszköz nem a gazdálkodóé: jogok és kötelezettségek.'],
    ['Újraszámolja a társaságiadó-kötelezettséget és a halasztott adót.', 'P', 'A kötelezettség összegének helyessége: pontosság, értékelés.'],
    ['Ellenőrzi, hogy az árbevételt tevékenységenként és földrajzi terület szerint a szabályoknak megfelelően bontották meg a mellékletben.', 'M', 'A megbontás és a közzététel megfelelősége: bemutatás.'],
    ['Ellenőrzi, hogy az egyéb bevételek között nem szerepel-e a szokásos értékesítésből származó árbevétel.', 'S', 'A megfelelő bevételi soron való kimutatás: besorolás.'],
    ['A december utolsó hetének bérszámfejtését egyezteti a jelenléti ívekkel, hogy a decemberi munkabér decemberben legyen elszámolva.', 'I', 'A ráfordítás időszakhoz rendelése: időbeli elhatárolás.'],
    ['A bankegyeztetésben a december 31-én úton lévő átutalásokat a januári bankkivonaton követi.', 'I', 'Az úton lévő tételek a fordulónap körüli időszakhoz rendelés kérdései (a pénzeszközök pontosságát is érinti).'],
    ['Ellenőrzi, hogy a lízingbe vett targoncát a bérleti szerződés alapján használatijog-eszközként mutatták ki, és nem saját tulajdonú tárgyi eszközként.', 'S', 'Az eszköz a cég mérlegébe tartozik, de nem saját tulajdonú tárgyi eszközként, hanem használatijog-eszközként: besorolás (és bemutatás).']
  ];
  S.addWidget('audit-allitas', function (el) {
    var order = [], i = 0, ok = 0, done = 0, answered = false;
    function reset() { order = S.shuffle(HELYZETEK.map(function (x, k) { return k; })); i = 0; ok = 0; done = 0; }
    el.innerHTML = head('Melyik állítás? – ' + HELYZETEK.length + ' helyzet', 'Olvasd el a könyvvizsgálói eljárást, és válaszd ki, **melyik állításra** (ISA 315, 2019) ad elsősorban bizonyítékot. Tipp: figyeld a vizsgálat **irányát** – könyvből indul vagy forrásból?') +
      '<div class="aw-quiz"><div class="aw-prog"></div><p class="aw-q"></p><div class="aw-opts">' + Object.keys(AS).map(function (k) {
        return '<button type="button" class="btn aw-opt" data-a="' + k + '">' + esc(AS[k]) + '</button>';
      }).join('') + '</div><div class="aw-fb" aria-live="polite"></div><div class="row aw-nav"><button type="button" class="btn primary aw-next" hidden>Következő →</button><button type="button" class="btn aw-restart">Újrakezdés</button></div></div>';
    var q = el.querySelector('.aw-q'), fb = el.querySelector('.aw-fb'), next = el.querySelector('.aw-next'), prog = el.querySelector('.aw-prog');
    function show() {
      answered = false; next.hidden = true; fb.innerHTML = '';
      el.querySelectorAll('.aw-opt').forEach(function (b) { b.disabled = false; b.classList.remove('ok', 'bad'); });
      if (i >= order.length) {
        q.innerHTML = '<b>Kész!</b> ' + ok + ' / ' + done + ' helyes válasz (' + Math.round(ok / Math.max(1, done) * 100) + '%).';
        el.querySelectorAll('.aw-opt').forEach(function (b) { b.disabled = true; });
        prog.textContent = ''; return;
      }
      var h = HELYZETEK[order[i]];
      prog.textContent = (i + 1) + '. / ' + order.length + ' helyzet · eddig ' + ok + ' helyes';
      q.textContent = h[0];
    }
    el.querySelector('.aw-opts').addEventListener('click', function (e) {
      var b = e.target.closest('.aw-opt'); if (!b || answered || i >= order.length) return;
      answered = true; done++;
      var h = HELYZETEK[order[i]], good = b.dataset.a === h[1];
      if (good) ok++;
      el.querySelectorAll('.aw-opt').forEach(function (x) { x.disabled = true; if (x.dataset.a === h[1]) x.classList.add('ok'); });
      if (!good) b.classList.add('bad');
      fb.innerHTML = '<div class="w-msg ' + (good ? 'ok' : 'bad') + '">' + (good ? '✔ Helyes! ' : '✘ A helyes válasz: <b>' + esc(AS[h[1]]) + '</b>. ') + S.inline(h[2]) + '</div>';
      next.hidden = false; next.focus();
      prog.textContent = (i + 1) + '. / ' + order.length + ' helyzet · eddig ' + ok + ' helyes';
    });
    next.addEventListener('click', function () { i++; show(); });
    el.querySelector('.aw-restart').addEventListener('click', function () { reset(); show(); });
    reset(); show();
  });

  /* ======================================================================
   * 2. „Vouching vagy tracing?”
   * ====================================================================== */
  /* [eljárás, 'V' | 'T', tesztelt állítás és magyarázat] */
  var IRANYOK = [
    ['Az árbevétel-főkönyvből választott számlákhoz megkeresi a szállítólevelet.', 'V', 'Könyv → bizonylat. Bekövetkezés: a könyvelt eladás megtörtént-e.'],
    ['A szállítólevelekből kiindulva ellenőrzi, hogy mindegyikről készült-e számla, és könyvelték-e.', 'T', 'Bizonylat → könyv. Teljesség: nem maradt-e ki árbevétel.'],
    ['A tárgyieszköz-analitikából választott tételeket megkeresi az üzemben.', 'V', 'Könyv → eszköz. Létezés.'],
    ['Az üzemben talált gépeket visszakeresi az analitikában.', 'T', 'Eszköz → könyv. Teljesség.'],
    ['A leltárlistáról választott tételeket megszámolja a polcon.', 'V', 'Lista → polc. Létezés.'],
    ['A polcon lévő tételeket keresi meg a leltárlistán.', 'T', 'Polc → lista. Teljesség.'],
    ['A szállítói analitika tételeihez megkeresi a beérkezett számlát és az átvételi jegyet.', 'V', 'Könyv → bizonylat. A kötelezettség létezése, a beszerzés bekövetkezése.'],
    ['A januári kifizetésekből indulva keresi a decemberre vonatkozó, de nem könyvelt számlákat.', 'T', 'Forrás → könyv. A szállítók teljessége.'],
    ['A bérfőkönyvből választott munkavállalókhoz megkeresi a munkaszerződést.', 'V', 'Könyv → dokumentum. Bekövetkezés (fantomdolgozó ellen).'],
    ['A HR-rendszer belépési listájából választott dolgozókat keresi meg a bérszámfejtésben.', 'T', 'Forrás → könyv. A bérköltség teljessége.'],
    ['A beruházási főkönyv tételeihez megkeresi a szállítói számlát és az átadás-átvételi jegyzőkönyvet.', 'V', 'Könyv → bizonylat. A növekedés bekövetkezése, pontossága.'],
    ['Az aláírt vevői megrendelések mintájáról ellenőrzi, hogy teljesítették, számlázták és könyvelték-e.', 'T', 'Forrás → könyv. Az árbevétel teljessége.'],
    ['A pénztárnapló kiadásaihoz megkeresi az eredeti bizonylatot és az engedélyt.', 'V', 'Könyv → bizonylat. A kiadás bekövetkezése, jogosultsága.'],
    ['A nyugtatömb sorszámait végigköveti a pénztárnaplóban.', 'T', 'Forrás → könyv. A bevételek teljessége.'],
    ['A vevőanalitika egyenlegeiről megerősítő levelet küld a vevőknek.', 'V', 'A könyvelt egyenlegből indul a külső fél felé. Létezés.'],
    ['A szerződés-nyilvántartásban talált bérleti szerződéseket keresi meg a lízingkötelezettségek között.', 'T', 'Forrás → könyv. A lízingkötelezettségek teljessége.'],
    ['A céltartalékok analitikájához megkeresi az alátámasztó számításokat és jogi leveleket.', 'V', 'Könyv → alátámasztás. A kötelezettség létezése és értékelése.'],
    ['Az ügyvédi levélben felsorolt perekről ellenőrzi, hogy képeztek-e rájuk céltartalékot vagy közzétették-e őket.', 'T', 'Forrás → könyv. A céltartalékok és a függő kötelezettségek teljessége.']
  ];
  S.addWidget('audit-vouching', function (el) {
    var order, i, ok, answered;
    el.innerHTML = head('Vouching vagy tracing?', '**Vouching**: a könyvelésből indulsz vissza a bizonylathoz vagy az eszközhöz (bekövetkezés, létezés). **Tracing**: a forrásból (bizonylat, eszköz, külső irat) indulsz a könyvelés felé (teljesség). Melyik irány?') +
      '<div class="aw-quiz"><div class="aw-prog"></div><p class="aw-q"></p><div class="aw-opts aw-two">' +
      '<button type="button" class="btn aw-opt" data-a="V">📒 → 📄 Vouching</button><button type="button" class="btn aw-opt" data-a="T">📄 → 📒 Tracing</button></div>' +
      '<div class="aw-fb" aria-live="polite"></div><div class="row aw-nav"><button type="button" class="btn primary aw-next" hidden>Következő →</button><button type="button" class="btn aw-restart">Újrakezdés</button></div></div>';
    var q = el.querySelector('.aw-q'), fb = el.querySelector('.aw-fb'), next = el.querySelector('.aw-next'), prog = el.querySelector('.aw-prog');
    function reset() { order = S.shuffle(IRANYOK.map(function (x, k) { return k; })); i = 0; ok = 0; }
    function show() {
      answered = false; next.hidden = true; fb.innerHTML = '';
      el.querySelectorAll('.aw-opt').forEach(function (b) { b.disabled = i >= order.length; b.classList.remove('ok', 'bad'); });
      if (i >= order.length) { q.innerHTML = '<b>Kész!</b> ' + ok + ' / ' + order.length + ' helyes.'; prog.textContent = ''; return; }
      prog.textContent = (i + 1) + '. / ' + order.length + ' · eddig ' + ok + ' helyes';
      q.textContent = IRANYOK[order[i]][0];
    }
    el.querySelector('.aw-opts').addEventListener('click', function (e) {
      var b = e.target.closest('.aw-opt'); if (!b || answered || i >= order.length) return;
      answered = true;
      var h = IRANYOK[order[i]], good = b.dataset.a === h[1];
      if (good) ok++;
      el.querySelectorAll('.aw-opt').forEach(function (x) { x.disabled = true; if (x.dataset.a === h[1]) x.classList.add('ok'); });
      if (!good) b.classList.add('bad');
      fb.innerHTML = '<div class="w-msg ' + (good ? 'ok' : 'bad') + '">' + (good ? '✔ Helyes! ' : '✘ Ez ' + (h[1] === 'V' ? 'vouching' : 'tracing') + '. ') + S.inline(h[2]) + '</div>';
      next.hidden = false; next.focus();
    });
    next.addEventListener('click', function () { i++; show(); });
    el.querySelector('.aw-restart').addEventListener('click', function () { reset(); show(); });
    reset(); show();
  });

  /* ======================================================================
   * 3. Eljárás ↔ állítás tábla mérlegtételenként
   * ====================================================================== */
  /* [állítás, jellemző kockázat, eljárás, kulcsállítás?] */
  var MATRIX = {
    penz: ['💰 Pénzeszközök', [
      ['Létezés', 'nem létező (elsikkasztott) pénz', 'banki megerősítés; pénztár meglepetésszerű számlálása', 1],
      ['Teljesség', 'nem könyvelt bankszámla', 'a bank minden számlát felsorol; megszüntetett és nulla egyenlegű számlákra is levél'],
      ['Jogok és kötelezettségek', 'zárolt, óvadéki vagy zálogolt betét', 'banki megerősítés zálogra, garanciára'],
      ['Pontosság, értékelés', 'hibás bankegyeztetés, rossz árfolyam', 'bankegyeztetés újraszámítása; devizaszámla átszámítása a fordulónapi árfolyamon'],
      ['Időbeli elhatárolás', 'úton lévő tételek, számlák közötti „kiting”', 'úton lévő tételek követése a januári kivonaton'],
      ['Bemutatás', 'szabadon nem rendelkezésre álló pénz', 'zárolt összegek elkülönítése, közzététel']]],
    vevo: ['🧾 Vevőkövetelések', [
      ['Létezés', 'fiktív követelés (túlértékelés)', 'pozitív megerősítő levél; nem válaszolóknál utólagos befolyás és szállítólevél', 1],
      ['Jogok és kötelezettségek', 'faktorált, engedményezett követelés', 'szerződések, banki megerősítés'],
      ['Pontosság, értékelés és felosztás', 'behajthatatlan követelés, elmaradt értékvesztés', 'korosított lista tesztje, utólagos befolyások, értékvesztés újraszámítása', 1],
      ['Időbeli elhatárolás', 'januári szállítás decemberben számlázva', 'cut-off: fordulónap körüli számlák és szállítólevelek'],
      ['Teljesség', 'nem rögzített követelés', 'szállítólevelekből kiinduló tracing; analitika = főkönyv'],
      ['Bemutatás', 'kapcsolt fél követelés a vevők között', 'elkülönítés, hosszú lejáratú rész, közzététel']]],
    arbevetel: ['📈 Árbevétel (ügylettípus)', [
      ['Bekövetkezés', 'fiktív bevétel (ISA 240 – feltételezett csalási kockázat)', 'vouching: főkönyv → szállítólevél, megrendelés, befolyás', 1],
      ['Teljesség', 'nem könyvelt (eltitkolt) bevétel', 'tracing: szállítólevél-sorszámok → számla → főkönyv; elemző eljárás'],
      ['Pontosság', 'rossz ár, engedmény, bónusz', 'árlista, szerződés; engedmények újraszámítása'],
      ['Időbeli elhatárolás', 'bevétel „előrehozása”', 'cut-off ±5 nap; januári jóváírások és visszáruk', 1],
      ['Besorolás', 'egyéb bevétel árbevételként, bruttó/nettó elszámolás', 'főkönyvi számlák tartalmának szemléje; ügynöki szerep vizsgálata'],
      ['Bemutatás', 'hiányos bontás, számviteli politika', 'a melléklet egyeztetése a munkapapírokkal']]],
    keszlet: ['📦 Készletek', [
      ['Létezés', 'nem létező, már eladott vagy elveszett készlet', 'jelenlét a leltáron; próbaszámlálás lista → polc; külső raktár megerősítése', 1],
      ['Teljesség', 'nem leltározott készlet', 'próbaszámlálás polc → lista; leltár = főkönyv'],
      ['Jogok és kötelezettségek', 'bizományba kapott, idegen készlet', 'bizományosi szerződések; eladott, de el nem szállított áru elkülönítése'],
      ['Pontosság, értékelés és felosztás', 'elavulás, nettó realizálható érték alatti ár, rossz önköltség', 'fordulónap utáni eladási árak; lassú forgású tételek; önköltség-számítás, általános költség felosztása normál kapacitással', 1],
      ['Időbeli elhatárolás', 'beérkezett, de nem könyvelt áru; kiszállított, de készletben maradt áru', 'utolsó szállítólevél- és átvételi jegy sorszámok a leltárnál'],
      ['Bemutatás', 'zálog, értékelési módszer', 'közzététel ellenőrzése']]],
    targyi: ['🏭 Tárgyi eszközök', [
      ['Létezés', 'selejtezett, de ki nem vezetett eszköz', 'nyilvántartás → fizikai szemle; selejtezési jegyzőkönyvek', 1],
      ['Teljesség', 'nem aktivált beruházás', 'eszköz → nyilvántartás; javítás-karbantartás számla átnézése'],
      ['Jogok és kötelezettségek', 'nem a cég tulajdona; zálog', 'tulajdoni lap, szerződés, forgalmi engedély; banki megerősítés'],
      ['Pontosság, értékelés és felosztás', 'rossz értékcsökkenés, elmaradt értékvesztés', 'növekedések egyeztetése számlákkal; értékcsökkenés újraszámítása; értékvesztési jelek', 1],
      ['Besorolás', 'karbantartás aktiválása', 'aktivált tételek mintájának vizsgálata (felújítás vagy javítás?)'],
      ['Bemutatás', 'hiányos eszközmozgás-tábla', 'nyitó + növekedés − csökkenés − écs = záró egyeztetése']]],
    szallito: ['🚚 Szállítói kötelezettségek', [
      ['Teljesség', 'el nem számolt kötelezettség (alulértékelés)', 'januári–februári kifizetések és beérkezett számlák vizsgálata; szállítói egyenlegközlő a nagy forgalmú szállítóknak', 1],
      ['Létezés / kötelezettség', 'fiktív szállító (csalás)', 'vouching: analitika → számla, átvételi jegy; törzsadat-változások'],
      ['Időbeli elhatárolás', 'decemberi átvétel januárban könyvelve', 'átvételi jegyek a fordulónap körül', 1],
      ['Pontosság, értékelés', 'devizás tartozás rossz árfolyamon', 'átszámítás ellenőrzése'],
      ['Bemutatás', 'kapcsolt fél kötelezettség elkülönítése', 'közzététel ellenőrzése']]],
    celtartalek: ['⚖️ Céltartalékok, függő kötelezettségek', [
      ['Teljesség', 'ki nem mutatott kötelem (per, garancia, környezeti kár)', 'ügyvédi megkeresés; jegyzőkönyvek, szerződések, jogi költségszámlák; későbbi események', 1],
      ['Létezés / kötelezettség', 'eredménysimító „tartalék” jelen kötelem nélkül', 'van-e múltbeli eseményből eredő jelen kötelem?'],
      ['Pontosság, értékelés', 'alá- vagy túlbecslés', 'módszer, feltevések, múltbeli adatok; visszatekintő vizsgálat (ISA 540)', 1],
      ['Bemutatás', 'hiányzó függő kötelezettség közzététel', 'melléklet ellenőrzése']]],
    ber: ['👷 Bérköltség (ügylettípus)', [
      ['Bekövetkezés', 'fantomdolgozó, nem teljesített munka', 'bérfőkönyv → munkaszerződés, jelenléti ív', 1],
      ['Teljesség', 'el nem számolt bér, prémium, szabadság', 'HR-lista → bérszámfejtés; év végi prémium- és szabadság-elhatárolás'],
      ['Pontosság', 'rossz bér, járulék', 'újraszámítás; elemző eljárás: létszám × átlagbér'],
      ['Időbeli elhatárolás', 'decemberi bér januárban', 'utolsó bérperiódus egyeztetése'],
      ['Besorolás', 'aktiválandó (saját előállítású) munka költségként vagy fordítva', 'projektenkénti munkaidő-nyilvántartás']]]
  };
  S.addWidget('audit-matrix', function (el) {
    var keys = Object.keys(MATRIX);
    el.innerHTML = head('Eljárás ↔ állítás tábla', 'Válassz egy mérlegtételt vagy ügylettípust: a táblázat megmutatja a releváns állításokat, a jellemző kockázatot és az arra válaszoló eljárást. A ★ a tipikusan legkockázatosabb állítás.') +
      '<div class="chips aw-chips">' + keys.map(function (k, i) { return '<button type="button" class="chip' + (i ? '' : ' on') + '" data-k="' + k + '">' + esc(MATRIX[k][0]) + '</button>'; }).join('') + '</div><div class="aw-mx"></div>';
    function paint(k) {
      el.querySelector('.aw-mx').innerHTML = table(['Állítás', 'Mi a kockázat?', 'Eljárás'], MATRIX[k][1].map(function (r) {
        return { cells: [(r[3] ? '★ ' : '') + '<b>' + esc(r[0]) + '</b>', esc(r[1]), esc(r[2])], cls: r[3] ? 'aw-key' : '' };
      }), 'aw-matrix');
    }
    el.querySelector('.aw-chips').addEventListener('click', function (e) {
      var b = e.target.closest('[data-k]'); if (!b) return;
      el.querySelectorAll('.aw-chips .chip').forEach(function (x) { x.classList.toggle('on', x === b); });
      paint(b.dataset.k);
    });
    paint(keys[0]);
  });

  /* ======================================================================
   * 4. Lényegesség-kalkulátor (ISA 320)
   * ====================================================================== */
  /* [kulcs, név, alapérték, sáv min %, sáv max %, javasolt %] – a sávok tájékoztató jellegűek, nem a standardból származnak */
  var BASES = [
    ['aee', 'Adózás előtti eredmény', 120000000, 5, 10, 5],
    ['arb', 'Árbevétel', 2400000000, 0.5, 1, 0.5],
    ['mfo', 'Mérlegfőösszeg', 1800000000, 1, 2, 1],
    ['st', 'Saját tőke', 700000000, 1, 5, 2],
    ['rf', 'Összes ráfordítás (pl. nonprofit)', 2250000000, 0.5, 2, 1]
  ];
  S.addWidget('audit-lenyegesseg', function (el) {
    var base = 'aee', risk = 'kozepes';
    el.innerHTML = head('Lényegesség-kalkulátor (ISA 320)', 'Add meg a viszonyítási alapokat, válassz bázist és százalékot. A sávok **a gyakorlatban szokásos, tájékoztató** értékek – az ISA 320 nem ír elő számokat, a végső összeg mindig szakmai megítélés.') +
      '<div class="pw-grid">' + BASES.map(function (b) { return field(b[0], b[1], b[2], 'Ft'); }).join('') + '</div>' +
      '<p class="aw-lbl">Viszonyítási alap</p>' + seg('base', BASES.map(function (b) { return [b[0], b[1].replace(/ \(.*\)/, '')]; }), base) +
      '<div class="w-ctrl aw-ctrl"><label><span class="lv"><span>Százalék</span><b><span class="aw-pv">5</span> %</b></span><input type="range" data-f="pct" min="0.1" max="10" step="0.1" value="5"></label></div>' +
      '<p class="aw-lbl">A lényeges hibás állítás felmért kockázata (teljesítési lényegességhez)</p>' + seg('risk', [['alacsony', 'Alacsony'], ['kozepes', 'Közepes'], ['magas', 'Magas']], risk) +
      '<div class="pw-grid">' + field('ctt', 'Egyértelműen jelentéktelen határ (a lényegesség %-a)', 5, '%') + '</div>' +
      '<label class="pw-chk"><input type="checkbox" data-f="volatil"> Az eredmény veszteséges, nulla közeli vagy nagyon ingadozó</label>' +
      '<div class="aw-out"></div>';
    var pct = el.querySelector('[data-f="pct"]');
    function bandOf(k) { return BASES.filter(function (b) { return b[0] === k; })[0]; }
    function calc() {
      var b = bandOf(base), p = parseFloat(pct.value), bv = val(el, base), M = bv * p / 100;
      el.querySelector('.aw-pv').textContent = S.fmt(p, 1);
      var pmPct = risk === 'alacsony' ? 75 : risk === 'magas' ? 50 : 65, PM = M * pmPct / 100, CTT = M * val(el, 'ctt') / 100;
      var inBand = p >= b[3] - 1e-9 && p <= b[4] + 1e-9;
      var volatil = el.querySelector('[data-f="volatil"]').checked;
      el.querySelector('.aw-out').innerHTML =
        '<div class="w-res"><div><small>Lényegesség (M)</small><b>' + nf(M) + ' Ft</b></div><div><small>Teljesítési lényegesség (' + pmPct + '%)</small><b>' + nf(PM) + ' Ft</b></div><div><small>Egyértelműen jelentéktelen</small><b>' + nf(CTT) + ' Ft</b></div></div>' +
        '<div class="w-msg ' + (inBand ? 'ok' : 'warn') + '" style="margin-top:8px">' + esc(b[1]) + ': gyakorlatban szokásos, tájékoztató sáv <b>' + S.fmt(b[3], 1) + '–' + S.fmt(b[4], 1) + '%</b>' +
        (inBand ? ' – a választott ' + S.fmt(p, 1) + '% a sávon belül van.' : ' – a választott ' + S.fmt(p, 1) + '% a sávon kívül esik: ezt külön indokolni és dokumentálni kell.') + '</div>' +
        (volatil && base === 'aee' ? '<div class="w-msg warn" style="margin-top:8px">Veszteséges vagy ingadozó eredménynél az adózás előtti eredmény torz bázis: használj normalizált (több évre átlagolt) eredményt, vagy válts árbevételre, ráfordításra, mérlegfőösszegre.</div>' : '') +
        '<p class="aw-lbl" style="margin-top:12px">Összehasonlítás: mekkora lenne a lényegesség más bázissal?</p>' +
        table(['Bázis', 'Összeg', 'Tájékoztató sáv', 'Lényegesség a sávban'], BASES.map(function (x) {
          var v = val(el, x[0]);
          return { cells: [esc(x[1]), nf(v) + ' Ft', S.fmt(x[3], 1) + '–' + S.fmt(x[4], 1) + '%', nf(v * x[3] / 100) + ' – ' + nf(v * x[4] / 100) + ' Ft'], cls: x[0] === base ? 'aw-key' : '' };
        })) +
        '<p class="w-help" style="margin-top:8px">Teljesítési lényegesség: alacsony kockázatnál a lényegesség kb. 75%-a, magasnál kb. 50%-a (tájékoztató). Kisebb, specifikus lényegesség is kellhet egyes tételekre (pl. vezetői javadalmazás, kapcsolt felek).</p>';
    }
    onSeg(el, 'base', function (v) { base = v; pct.value = bandOf(v)[5]; calc(); });
    onSeg(el, 'risk', function (v) { risk = v; calc(); });
    live(el, calc);
  });

  /* ======================================================================
   * 5. Könyvvizsgálói jelentés döntőfa (ISA 700 / 705 / 706, 570, 701)
   * ====================================================================== */
  var OPIN = {
    tiszta: ['Minősítés nélküli vélemény', 'ok', 'ISA 700: a beszámoló minden lényeges szempontból a keretrendszer szerint készült.'],
    minositett: ['Minősített vélemény', 'warn', 'ISA 705: lényeges, de nem átható probléma – „… hatásától (esetleges hatásától) eltekintve”.'],
    ellen: ['Ellenvélemény', 'bad', 'ISA 705: lényeges és átható hibás állítás – a beszámoló nem ad megbízható és valós képet.'],
    vissza: ['A vélemény nyilvánításának visszautasítása', 'bad', 'ISA 705: lényeges és átható lehetséges hatású bizonyítékhiány – a könyvvizsgáló nem tud véleményt alkotni.']
  };
  var TREE = {
    bizonyitek: { q: 'Sikerült elegendő és megfelelő könyvvizsgálati bizonyítékot szerezni?', a: [['Igen', 'hiba'], ['Nem (terjedelemkorlátozás)', 'korl']] },
    korl: { q: 'A fel nem tárt hibák lehetséges hatása lényeges lehet?', a: [['Nem lényeges', 'hiba'], ['Lényeges lehet', 'korl2']] },
    korl2: { q: 'A lehetséges hatás átható is lehet (sok tételt érint, vagy a beszámoló jelentős részét)?', a: [['Nem átható', 'hiba', 'minositett', 'bizonyítékhiány (ISA 705): minősített vélemény „az esetleges hatásától eltekintve”'], ['Átható', 'om', 'vissza', 'átható bizonyítékhiány (ISA 705): a vélemény visszautasítása']] },
    hiba: { q: 'Maradt a beszámolóban lényeges hibás állítás, amelyet a vezetés nem javított ki (ISA 450)?', a: [['Nem', 'gc'], ['Igen', 'hiba2']] },
    hiba2: { q: 'A hibás állítás hatása átható?', a: [['Nem átható', 'gc', 'minositett', 'lényeges, de nem átható hibás állítás: minősített vélemény'], ['Átható', 'gc', 'ellen', 'lényeges és átható hibás állítás: ellenvélemény']] },
    gc: { q: 'Mit állapított meg a könyvvizsgáló a vállalkozás folytatásáról (ISA 570)?', a: [
      ['Az elv megfelelő, nincs lényeges bizonytalanság', 'eom', null, null, 'gc0'],
      ['Lényeges bizonytalanság van, a melléklet megfelelően bemutatja', 'eom', null, null, 'gcmu'],
      ['Lényeges bizonytalanság van, de a közzététel hiányos', 'eom', 'minositett', 'a lényeges bizonytalanság közzététele hiányos: minősített vélemény (vagy, ha átható, ellenvélemény)'],
      ['A vállalkozás folytatásának elve nem megfelelő, mégis erre épül a beszámoló', 'eom', 'ellen', 'nem megfelelő going concern alap: ellenvélemény']] },
    eom: { q: 'Van olyan, a beszámolóban megfelelően bemutatott kérdés, amely a felhasználók számára a megértéshez alapvető (pl. nagy per, katasztrófa, újbóli kiadás)?', a: [['Nincs', 'om'], ['Van', 'om', null, null, 'eom']] },
    om: { q: 'Van a beszámolóban nem szereplő, de a könyvvizsgálat vagy a jelentés megértéséhez releváns kérdés (pl. az előző évet más vizsgálta, felhasználási korlátozás)?', a: [['Nincs', 'kam'], ['Van', 'kam', null, null, 'om']] },
    kam: { q: 'Tőzsdén jegyzett (nyilvánosan kereskedett) a gazdálkodó, vagy jogszabály, illetve önkéntes döntés alapján kulcsfontosságú könyvvizsgálati kérdéseket közöl a könyvvizsgáló?', a: [['Nem', 'end'], ['Igen', 'end', null, null, 'kam']] }
  };
  var RANK = { tiszta: 0, minositett: 1, ellen: 2, vissza: 3 };
  S.addWidget('audit-jelentes', function (el) {
    var hist = [];
    el.innerHTML = head('Könyvvizsgálói jelentés – döntőfa', 'Válaszolj a kérdésekre: a fa megmondja a **vélemény típusát** (ISA 700/705), és összeállítja a jelentés kötelező és esetleges szakaszait (ISA 570, 701, 706). Leegyszerűsített oktatási modell – élesben minden döntés szakmai megítélés.') +
      '<ol class="aw-path"></ol><div class="aw-node"></div><div class="row aw-nav"><button type="button" class="btn aw-back">← Vissza</button><button type="button" class="btn aw-restart">Újrakezdés</button></div>';
    function state() {
      var st = { op: 'tiszta', why: [], flags: {}, node: 'bizonyitek' };
      hist.forEach(function (h) {
        var a = TREE[h.node].a[h.i];
        if (a[2] && RANK[a[2]] > RANK[st.op]) st.op = a[2];
        if (a[3]) st.why.push(a[3]);
        if (a[4]) st.flags[a[4]] = 1;
        st.node = a[1];
      });
      return st;
    }
    function render() {
      var st = state();
      el.querySelector('.aw-path').innerHTML = hist.map(function (h) { return '<li><span class="muted">' + esc(TREE[h.node].q) + '</span> <b>' + esc(TREE[h.node].a[h.i][0]) + '</b></li>'; }).join('');
      el.querySelector('.aw-back').disabled = !hist.length;
      var box = el.querySelector('.aw-node');
      if (st.node !== 'end') {
        var n = TREE[st.node];
        box.innerHTML = '<p class="aw-q">' + esc(n.q) + '</p><div class="aw-opts aw-col">' + n.a.map(function (a, i) { return '<button type="button" class="btn aw-opt" data-i="' + i + '">' + esc(a[0]) + '</button>'; }).join('') + '</div>';
        return;
      }
      var o = OPIN[st.op], f = st.flags, vissza = st.op === 'vissza';
      var parts = [];
      parts.push('<b>' + (st.op === 'tiszta' ? 'Vélemény' : o[0]) + '</b> – kötelezően az első szakasz');
      parts.push('<b>' + (st.op === 'tiszta' ? 'A vélemény alapja' : o[0] + ' alapja') + '</b> – ISA-k, függetlenség' + (st.op !== 'tiszta' ? ', a probléma leírása és (ha lehet) számszerűsítése' : ''));
      if (!vissza) parts.push(f.gcmu ? '<b>Lényeges bizonytalanság a vállalkozás folytatásával kapcsolatban</b> – külön szakasz (ISA 570), nem figyelemfelhívás' : '<b>A vállalkozás folytatása</b> – következtetés az elv megfelelőségéről (az átdolgozott ISA 570 szerint minden jelentésben)');
      if (f.eom && !vissza) parts.push('<b>Figyelemfelhívás</b> (ISA 706) – utalás a mellékletre, „véleményünk e tekintetben nem minősített”');
      if (f.kam && !vissza) parts.push('<b>Kulcsfontosságú könyvvizsgálati kérdések</b> (ISA 701) – miért és hogyan; a minősítés alapját nem ismétli KAM-ként');
      if (f.om) parts.push('<b>Egyéb kérdés</b> (ISA 706)');
      if (!vissza) parts.push('<b>Egyéb információ</b> (ISA 720) – Magyarországon az üzleti jelentésről is');
      parts.push('<b>A vezetés és az irányítással megbízott személyek felelőssége</b>');
      parts.push('<b>A könyvvizsgáló felelőssége</b>' + (vissza ? ' – rövidített változat' : ''));
      parts.push('Aláírás, a könyvvizsgáló címe, a jelentés dátuma');
      box.innerHTML = '<div class="w-msg ' + o[1] + ' aw-verdict"><b>' + esc(o[0]) + '</b><br>' + esc(o[2]) + '</div>' +
        (st.why.length ? '<p class="w-help" style="margin-top:8px">Indok: ' + st.why.map(esc).join('; ') + '.</p>' : '') +
        '<p class="aw-lbl" style="margin-top:10px">A jelentés szakaszai ebben a sorrendben:</p><ol class="aw-report">' + parts.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ol>' +
        (vissza ? '<p class="w-help">Visszautasításnál nincs kulcsfontosságú kérdések és egyéb információ szakasz, mert ezek a vélemény hitelességét sugallnák.</p>' : '') +
        (st.op === 'tiszta' && f.gcmu ? '<p class="w-help">Figyeld meg: a lényeges bizonytalanság megfelelő közzététel mellett nem minősítés!</p>' : '');
    }
    el.querySelector('.aw-node').addEventListener('click', function (e) {
      var b = e.target.closest('.aw-opt'); if (!b) return;
      hist.push({ node: state().node, i: +b.dataset.i }); render();
    });
    el.querySelector('.aw-back').addEventListener('click', function () { hist.pop(); render(); });
    el.querySelector('.aw-restart').addEventListener('click', function () { hist = []; render(); });
    render();
  });

  /* ======================================================================
   * 6. IFRS 16 – lízingkötelezettség és használatijog-eszköz (lízingbe vevő)
   * ====================================================================== */
  S.addWidget('ifrs-lizing', function (el) {
    var timing = 'utolag';
    el.innerHTML = head('IFRS 16 lízingkalkulátor (lízingbe vevő)', 'Lízingkötelezettség = a díjak jelenértéke; használatijog-eszköz = kötelezettség + kezdeti közvetlen költség + előre fizetett díj + helyreállítási kötelem − kapott ösztönző. A ráfordítás (kamat + értékcsökkenés) a futamidő elején nagyobb – ez a „front-loading”.') +
      '<div class="pw-grid">' + field('p', 'Éves lízingdíj', 1000, 'pénzegység') + field('n', 'Futamidő', 5, 'év', ' min="1" max="30" step="1"') + field('r', 'Diszkontráta (beépített vagy járulékos hitelkamatláb)', 6, '%') +
      field('idc', 'Kezdeti közvetlen költség', 100, 'pénzegység') + field('inc', 'Kapott lízingösztönző', 0, 'pénzegység') + field('rest', 'Helyreállítási kötelem (jelenérték)', 0, 'pénzegység') + '</div>' +
      '<p class="aw-lbl">A díj fizetése</p>' + seg('tim', [['utolag', 'Év végén (utólag)'], ['elore', 'Év elején (előre)']], timing) + '<div class="aw-out"></div>';
    function calc() {
      var P = val(el, 'p'), n = Math.max(1, Math.min(30, Math.round(val(el, 'n')))), r = val(el, 'r') / 100, adv = timing === 'elore';
      var L0 = 0, t;
      for (t = 1; t <= n; t++) L0 += P / Math.pow(1 + r, adv ? t - 1 : t);
      var ROU = L0 + val(el, 'idc') + val(el, 'rest') - val(el, 'inc'), dep = ROU / n, L = L0, totI = 0, rowsArr = [];
      for (t = 1; t <= n; t++) {
        var open = L, base = adv ? L - P : L, i = base * r, close = adv ? L - P + i : L + i - P;
        if (t === n) close = 0;
        totI += i; L = close;
        rowsArr.push([t + '.', nf(open, 1), nf(P, 1), nf(i, 1), nf(close, 1), nf(dep, 1), '<b>' + nf(i + dep, 1) + '</b>']);
      }
      el.querySelector('.aw-out').innerHTML =
        '<div class="w-res"><div><small>Lízingkötelezettség (L₀)</small><b>' + nf(L0, 1) + '</b></div><div><small>Használatijog-eszköz</small><b>' + nf(ROU, 1) + '</b></div><div><small>Összes kamat</small><b>' + nf(totI, 1) + '</b></div><div><small>Éves értékcsökkenés</small><b>' + nf(dep, 1) + '</b></div></div>' +
        table(['Év', 'Nyitó kötelezettség', 'Díj', 'Kamat', 'Záró kötelezettség', 'Értékcsökkenés', 'Ráfordítás összesen'], rowsArr) +
        '<p class="w-help" style="margin-top:8px">Ellenőrzés: összes ráfordítás = díjak (' + nf(P * n, 1) + ') + kezdeti közvetlen költség + helyreállítás − ösztönző = ' + nf(P * n + val(el, 'idc') + val(el, 'rest') - val(el, 'inc'), 1) + '. ' +
        (adv ? 'Előre fizetésnél az első díj azonnal csökkenti a kötelezettséget, ezért a kamat kisebb.' : 'A cash-flow kimutatásban a díj tőkerésze finanszírozási, a kamatrész a számviteli politika szerint (az IFRS 18 után jellemzően finanszírozási) tétel.') + '</p>';
    }
    onSeg(el, 'tim', function (v) { timing = v; calc(); });
    live(el, calc);
  });

  /* ======================================================================
   * 7. IFRS 9 – várható hitelezési veszteség
   * ====================================================================== */
  S.addWidget('ifrs-ecl', function (el) {
    var mode = 'matrix', stage = '1';
    var BK = [['Nem lejárt', 100000, 0.5], ['1–30 nap', 20000, 2], ['31–60 nap', 6000, 6], ['61–90 nap', 2000, 15], ['90 napon túl', 2000, 50]];
    el.innerHTML = head('Várható hitelezési veszteség (IFRS 9)', 'Vevőkre az **egyszerűsített módszer** (teljes élettartamra várható veszteség, céltartalék-mátrix) is használható; egyébként az **általános modell**: 1. szakaszban 12 havi, 2–3. szakaszban teljes élettartamra várható veszteség. Oktatási egyszerűsítés: ECL ≈ PD × LGD × EAD, diszkontálás nélkül.') +
      seg('mode', [['matrix', 'Céltartalék-mátrix (vevők)'], ['altalanos', 'Általános modell (hitel)']], mode) +
      '<div class="aw-m-matrix"><div class="aw-scroll"><table class="aw-table aw-inputs"><thead><tr><th>Késedelem</th><th>Bruttó követelés</th><th>Veszteségráta, %</th><th>ECL</th></tr></thead><tbody>' +
      BK.map(function (b, i) { return '<tr><td>' + b[0] + '</td><td><input data-f="b' + i + '" type="number" inputmode="decimal" value="' + b[1] + '"></td><td><input data-f="r' + i + '" type="number" inputmode="decimal" step="0.1" value="' + b[2] + '"></td><td class="aw-e' + i + '"></td></tr>'; }).join('') +
      '</tbody></table></div><div class="pw-grid">' + field('fwd', 'Előretekintő korrekció a rátákra (pl. recesszió-előrejelzés)', 0, '%') + '</div></div>' +
      '<div class="aw-m-alt" hidden><div class="pw-grid">' + field('ead', 'Kitettség nemteljesítéskor (EAD)', 1000000, 'pénzegység') + field('pd12', '12 havi PD', 2, '%') + field('pdl', 'Teljes élettartamra szóló PD', 9, '%') + field('lgd', 'Nemteljesítéskori veszteségráta (LGD)', 45, '%') + '</div>' +
      '<p class="aw-lbl">Szakasz</p>' + seg('stage', [['1', '1. szakasz'], ['2', '2. szakasz (SICR)'], ['3', '3. szakasz (hitelértékvesztett)']], stage) + '</div><div class="aw-out"></div>';
    function calc() {
      el.querySelector('.aw-m-matrix').hidden = mode !== 'matrix';
      el.querySelector('.aw-m-alt').hidden = mode === 'matrix';
      var out = el.querySelector('.aw-out');
      if (mode === 'matrix') {
        var k = 1 + val(el, 'fwd') / 100, sum = 0, gross = 0;
        BK.forEach(function (b, i) { var e = val(el, 'b' + i) * Math.min(100, val(el, 'r' + i) * k) / 100; sum += e; gross += val(el, 'b' + i); el.querySelector('.aw-e' + i).textContent = nf(e); });
        out.innerHTML = '<div class="w-res"><div><small>Bruttó vevőállomány</small><b>' + nf(gross) + '</b></div><div><small>Értékvesztés (ECL)</small><b>' + nf(sum) + '</b></div><div><small>Nettó érték</small><b>' + nf(gross - sum) + '</b></div><div><small>Lefedettség</small><b>' + S.fmt(sum / Math.max(1, gross) * 100, 2) + '%</b></div></div>' +
          '<p class="w-help" style="margin-top:8px">A ráták a múltbeli veszteségi tapasztalatból indulnak, de az IFRS 9 előretekintő: a várható gazdasági helyzettel korrigálni kell őket. Az ECL változása az eredményt terheli (értékvesztés).</p>';
      } else {
        var ead = val(el, 'ead'), lgd = val(el, 'lgd') / 100, e12 = ead * val(el, 'pd12') / 100 * lgd, el_ = ead * val(el, 'pdl') / 100 * lgd, e3 = ead * lgd;
        var cur = stage === '1' ? e12 : stage === '2' ? el_ : e3;
        out.innerHTML = '<div class="w-res"><div><small>12 havi ECL</small><b>' + nf(e12) + '</b></div><div><small>Teljes élettartamra várható ECL</small><b>' + nf(el_) + '</b></div><div><small>Elszámolandó (' + stage + '. szakasz)</small><b>' + nf(cur) + '</b></div></div>' +
          '<p class="w-help" style="margin-top:8px">' + (stage === '1' ? 'Nincs jelentős hitelkockázat-növekedés: csak a 12 hónapon belüli nemteljesítésből eredő veszteség. Kamatbevétel a bruttó értékre.' :
            stage === '2' ? 'Jelentős hitelkockázat-növekedés (SICR, pl. 30 napon túli késedelem vélelme): teljes élettartamra várható veszteség. Kamatbevétel még a bruttó értékre. A 2. szakaszba lépés az értékvesztést „ugrásszerűen” növeli: ' + nf(el_ - e12) + '.' :
            'Hitelértékvesztett (pl. 90 napon túli késedelem vélelme, csőd): az egyszerűsítés itt PD = 100%-kal számol. Kamatbevétel a nettó (amortizált) értékre.') + '</p>';
      }
    }
    onSeg(el, 'mode', function (v) { mode = v; calc(); });
    onSeg(el, 'stage', function (v) { stage = v; calc(); });
    live(el, calc);
  });

  /* ======================================================================
   * 8. IFRS 15 – az ügyleti ár felosztása és a bevétel ütemezése
   * ====================================================================== */
  S.addWidget('ifrs-felosztas', function (el) {
    var IT = [['Szoftverlicenc', 700, 'pont', 0], ['Telepítés', 100, 'pont', 0], ['Támogatás', 300, 'ido', 24]];
    el.innerHTML = head('IFRS 15: az ügyleti ár felosztása (4. lépés) és elszámolása (5. lépés)', 'A szerződéses árat (az ügyleti árat) az **önálló eladási árak** arányában kell felosztani a teljesítési kötelmek között; a kedvezmény így arányosan jut minden kötelemre. Az időpontban teljesített kötelem bevétele átadáskor, az időszak alatt teljesítetté a teljesítés előrehaladtával számolható el.') +
      '<div class="pw-grid">' + field('tp', 'Ügyleti ár (a szerződés teljes ellenértéke)', 1000, 'pénzegység') + field('ho', 'Az első üzleti évből eltelt hónapok a szerződés kezdete óta', 6, 'hó', ' min="0" max="12"') + '</div>' +
      '<div class="aw-scroll"><table class="aw-table aw-inputs"><thead><tr><th>Teljesítési kötelem</th><th>Önálló eladási ár</th><th>Teljesítés</th><th>Időtartam (hó)</th></tr></thead><tbody>' +
      IT.map(function (x, i) {
        return '<tr><td>' + x[0] + '</td><td><input data-f="ssp' + i + '" type="number" inputmode="decimal" value="' + x[1] + '"></td><td><select data-f2="t' + i + '"><option value="pont"' + (x[2] === 'pont' ? ' selected' : '') + '>időpontban (átadáskor)</option><option value="ido"' + (x[2] === 'ido' ? ' selected' : '') + '>időszak alatt</option></select></td><td><input data-f="m' + i + '" type="number" inputmode="decimal" value="' + (x[3] || 12) + '"></td></tr>';
      }).join('') + '</tbody></table></div><div class="aw-out"></div>';
    function calc() {
      var tp = val(el, 'tp'), ho = Math.max(0, Math.min(12, val(el, 'ho'))), tot = 0, r = [], rev = 0;
      IT.forEach(function (x, i) { tot += val(el, 'ssp' + i); });
      IT.forEach(function (x, i) {
        var ssp = val(el, 'ssp' + i), a = tot ? tp * ssp / tot : 0, typ = el.querySelector('[data-f2="t' + i + '"]').value, m = Math.max(1, val(el, 'm' + i));
        var y1 = typ === 'pont' ? a : a * Math.min(ho, m) / m;
        rev += y1;
        r.push([x[0], nf(ssp), S.fmt(tot ? ssp / tot * 100 : 0, 1) + '%', '<b>' + nf(a, 1) + '</b>', nf(y1, 1), nf(a - y1, 1)]);
      });
      var disc = tot - tp;
      el.querySelector('.aw-out').innerHTML = table(['Kötelem', 'Önálló ár', 'Arány', 'Felosztott ár', '1. évi bevétel', 'Később (szerződéses kötelezettség, ha már számlázták)'], r) +
        '<div class="w-res" style="margin-top:8px"><div><small>Önálló árak összege</small><b>' + nf(tot) + '</b></div><div><small>Kedvezmény</small><b>' + nf(disc) + '</b></div><div><small>1. évi bevétel</small><b>' + nf(rev, 1) + '</b></div><div><small>Későbbi évek</small><b>' + nf(tp - rev, 1) + '</b></div></div>' +
        '<p class="w-help" style="margin-top:8px">' + (disc > 0 ? 'A ' + nf(disc) + ' kedvezmény arányosan oszlik meg; csak akkor rendelhető egyetlen kötelemhez, ha megfigyelhető bizonyíték mutatja, hogy kifejezetten arra vonatkozik.' : disc < 0 ? 'Az ügyleti ár magasabb az önálló árak összegénél – ellenőrizd az önálló árakat vagy a változó ellenértéket.' : 'Nincs kedvezmény: a felosztott ár megegyezik az önálló árral.') + '</p>';
    }
    live(el, calc);
  });

  /* ======================================================================
   * 9. IAS 36 – megtérülő érték és értékvesztés
   * ====================================================================== */
  S.addWidget('ifrs-ertekvesztes', function (el) {
    el.innerHTML = head('Értékvesztés-teszt (IAS 36)', 'Megtérülő érték = max(valós érték az elidegenítési költségekkel csökkentve; használati érték). A használati érték a jövőbeli pénzáramok jelenértéke adózás előtti diszkontrátával. Ha a könyv szerinti érték nagyobb, a különbözet értékvesztés.') +
      '<div class="pw-grid">' + field('ke', 'Könyv szerinti érték', 1000, 'pénzegység') + field('fv', 'Valós érték', 680, 'pénzegység') + field('ek', 'Elidegenítési költség', 30, 'pénzegység') +
      field('cf', 'Éves nettó pénzáram (használatból)', 300, 'pénzegység') + field('n', 'Hátralévő hasznos élettartam', 3, 'év', ' min="1" max="30" step="1"') + field('mar', 'Maradványérték a végén', 0, 'pénzegység') + field('r', 'Adózás előtti diszkontráta', 10, '%') + '</div><div class="aw-out"></div>';
    function calc() {
      var n = Math.max(1, Math.min(30, Math.round(val(el, 'n')))), r = val(el, 'r') / 100, viu = 0, t;
      for (t = 1; t <= n; t++) viu += val(el, 'cf') / Math.pow(1 + r, t);
      viu += val(el, 'mar') / Math.pow(1 + r, n);
      var fvlcd = val(el, 'fv') - val(el, 'ek'), ra = Math.max(fvlcd, viu), ke = val(el, 'ke'), iw = Math.max(0, ke - ra);
      el.querySelector('.aw-out').innerHTML = '<div class="w-res"><div><small>FV − elidegenítési költség</small><b>' + nf(fvlcd, 1) + '</b></div><div><small>Használati érték</small><b>' + nf(viu, 1) + '</b></div><div><small>Megtérülő érték</small><b>' + nf(ra, 1) + '</b></div><div><small>Értékvesztés</small><b>' + nf(iw, 1) + '</b></div></div>' +
        '<div class="w-msg ' + (iw > 0 ? 'warn' : 'ok') + '" style="margin-top:8px">' + (iw > 0 ? 'Értékvesztés: ' + nf(iw, 1) + '. Az új könyv szerinti érték ' + nf(ra, 1) + ', erre számoljuk a további értékcsökkenést; a halasztott adót is újra kell számolni.' : 'Nincs értékvesztés: a megtérülő érték eléri a könyv szerinti értéket.') +
        ' A megtérülő érték a ' + (viu >= fvlcd ? '<b>használati érték</b> (a cég jobban jár, ha használja)' : '<b>nettó eladási érték</b> (a cég jobban jár, ha eladja)') + '.</div>' +
        '<p class="w-help" style="margin-top:8px">Goodwillnál (pénztermelő egységben) az értékvesztés először a goodwillt csökkenti, és a goodwill értékvesztése nem írható vissza; más eszközöknél a visszaírás legfeljebb az értékvesztés nélküli könyv szerinti értékig lehetséges.</p>';
    }
    live(el, calc);
  });

  /* ======================================================================
   * 10. IAS 12 – halasztott adó
   * ====================================================================== */
  S.addWidget('ifrs-halasztott-ado', function (el) {
    var R = [['Gép (gyorsított adóügyi écs)', 'e', 800, 600], ['Garanciális céltartalék', 'k', 150, 0], ['Vevők (értékvesztés adóügyileg nem levonható)', 'e', 900, 1000], ['Aktivált fejlesztés (adóügyileg azonnal levonva)', 'e', 300, 0]];
    el.innerHTML = head('Halasztott adó kalkulátor (IAS 12)', 'Átmeneti különbözet = könyv szerinti érték − adóalap. **Eszköznél** a pozitív különbözet adóköteles (halasztott adókötelezettség, DTL), a negatív levonható (halasztott adókövetelés, DTA); **kötelezettségnél** fordítva. A magyar társasági adó kulcsa 9% – IFRS-tankönyvi példákban gyakran 20–25%.') +
      '<div class="aw-scroll"><table class="aw-table aw-inputs"><thead><tr><th>Tétel</th><th>Típus</th><th>Könyv szerinti érték</th><th>Adóalap</th><th>Különbözet</th><th>DTL / DTA</th></tr></thead><tbody>' +
      R.map(function (x, i) {
        return '<tr><td>' + x[0] + '</td><td><select data-f2="t' + i + '"><option value="e"' + (x[1] === 'e' ? ' selected' : '') + '>eszköz</option><option value="k"' + (x[1] === 'k' ? ' selected' : '') + '>kötelezettség</option></select></td><td><input data-f="ke' + i + '" type="number" inputmode="decimal" value="' + x[2] + '"></td><td><input data-f="aa' + i + '" type="number" inputmode="decimal" value="' + x[3] + '"></td><td class="aw-d' + i + '"></td><td class="aw-t' + i + '"></td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="pw-grid">' + field('rate', 'Várható adókulcs (a realizáláskor)', 9, '%') + field('loss', 'Fel nem használt adóügyi veszteség', 0, 'pénzegység') + '</div>' +
      '<label class="pw-chk"><input type="checkbox" data-f3="prob" checked> Valószínű, hogy lesz elég jövőbeli adóköteles nyereség a levonható különbözetek és a veszteség felhasználására</label><div class="aw-out"></div>';
    function calc() {
      var rate = val(el, 'rate') / 100, dtl = 0, dta = 0, prob = el.querySelector('[data-f3="prob"]').checked;
      R.forEach(function (x, i) {
        var typ = el.querySelector('[data-f2="t' + i + '"]').value, d = val(el, 'ke' + i) - val(el, 'aa' + i), taxable = typ === 'e' ? d > 0 : d < 0, amt = Math.abs(d) * rate;
        if (d === 0) { el.querySelector('.aw-d' + i).textContent = '0'; el.querySelector('.aw-t' + i).textContent = '–'; return; }
        if (taxable) dtl += amt; else dta += amt;
        el.querySelector('.aw-d' + i).textContent = nf(d) + (taxable ? ' (adóköteles)' : ' (levonható)');
        el.querySelector('.aw-t' + i).innerHTML = (taxable ? 'DTL ' : 'DTA ') + nf(amt, 1);
      });
      dta += val(el, 'loss') * rate;
      var dtaRec = prob ? dta : 0;
      el.querySelector('.aw-out').innerHTML = '<div class="w-res"><div><small>Halasztott adókötelezettség (DTL)</small><b>' + nf(dtl, 1) + '</b></div><div><small>Halasztott adókövetelés (DTA), kimutatható</small><b>' + nf(dtaRec, 1) + '</b></div><div><small>Nettó (ha beszámítható)</small><b>' + (dtl >= dtaRec ? 'DTL ' + nf(dtl - dtaRec, 1) : 'DTA ' + nf(dtaRec - dtl, 1)) + '</b></div></div>' +
        (!prob && dta > 0 ? '<div class="w-msg warn" style="margin-top:8px">A ' + nf(dta, 1) + ' DTA nem mutatható ki, mert nem valószínű a felhasználása (DTL-ek visszafordulása vagy jövőbeli adóköteles nyereség kell hozzá).</div>' : '') +
        '<p class="w-help" style="margin-top:8px">Beszámítás csak akkor, ha van jogilag érvényesíthető jog, és ugyanaz az adóhatóság és adóalany. A halasztott adó nem diszkontálható. Ha az alapügylet az OCI-ban jelent meg (pl. átértékelés), a halasztott adó is oda kerül.</p>';
    }
    live(el, calc);
  });

  /* ======================================================================
   * 11. IAS 2 – nettó realizálható érték és állandó általános költség
   * ====================================================================== */
  S.addWidget('ifrs-keszlet', function (el) {
    el.innerHTML = head('Készletértékelés (IAS 2)', 'A készlet a **bekerülési érték** és a **nettó realizálható érték** közül az alacsonyabbon szerepel. NRV = becsült eladási ár − befejezési költség − értékesítési költség. Az állandó termelési általános költséget a **normál kapacitás** alapján kell felosztani.') +
      '<p class="aw-lbl">1. Nettó realizálható érték</p><div class="pw-grid">' + field('q', 'Mennyiség', 500, 'db') + field('c', 'Bekerülési érték', 1000, 'pénzegység/db') + field('s', 'Becsült eladási ár', 1050, 'pénzegység/db') + field('b', 'Befejezés költsége', 60, 'pénzegység/db') + field('e', 'Értékesítési költség', 40, 'pénzegység/db') + '</div><div class="aw-o1"></div>' +
      '<p class="aw-lbl" style="margin-top:12px">2. Állandó termelési általános költség felosztása</p><div class="pw-grid">' + field('fo', 'Állandó termelési általános költség', 1200000, 'pénzegység') + field('nk', 'Normál kapacitás', 10000, 'db') + field('tk', 'Tényleges termelés', 8000, 'db') + '</div><div class="aw-o2"></div>';
    function calc() {
      var q = val(el, 'q'), c = val(el, 'c'), nrv = val(el, 's') - val(el, 'b') - val(el, 'e'), unit = Math.min(c, nrv), wd = Math.max(0, c - nrv) * q;
      el.querySelector('.aw-o1').innerHTML = '<div class="w-res"><div><small>NRV / db</small><b>' + nf(nrv, 1) + '</b></div><div><small>Mérlegérték / db</small><b>' + nf(unit, 1) + '</b></div><div><small>Mérlegérték összesen</small><b>' + nf(unit * q) + '</b></div><div><small>Leértékelés</small><b>' + nf(wd) + '</b></div></div>' +
        '<p class="w-help" style="margin-top:6px">' + (wd > 0 ? 'Az NRV a bekerülési érték alá esik: ' + nf(wd) + ' leértékelés az eredmény terhére. Ha később az ok megszűnik, legfeljebb ennyi írható vissza.' : 'Az NRV nem kisebb a bekerülési értéknél: nincs leértékelés (felértékelés sincs!).') + '</p>';
      var fo = val(el, 'fo'), nk = Math.max(1, val(el, 'nk')), tk = val(el, 'tk'), rate = fo / Math.max(nk, tk), abs = rate * tk, unabs = fo - abs;
      el.querySelector('.aw-o2').innerHTML = '<div class="w-res"><div><small>Felosztási kulcs / db</small><b>' + nf(rate, 1) + '</b></div><div><small>Készletbe kerül</small><b>' + nf(abs) + '</b></div><div><small>Az időszak ráfordítása</small><b>' + nf(Math.max(0, unabs)) + '</b></div></div>' +
        '<p class="w-help" style="margin-top:6px">' + (tk < nk ? 'Alacsony termelés: a kihasználatlan kapacitás költsége (' + nf(unabs) + ') nem növelheti a készlet értékét.' : 'Szokatlanul magas termelésnél a tényleges mennyiséggel osztunk, hogy a készlet ne kerüljön a bekerülési érték fölé.') + '</p>';
    }
    live(el, calc);
  });
})();
