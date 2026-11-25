/* Újdonságok (változásnapló). A legfrissebb legyen legfelül. Formátum:
 * STUDIE.addNews({ id, date: 'ÉÉÉÉ-HH-NN', title, plus: [['+840', 'tesztkérdés'], …], items: [['szöveg', '#/link'], …] }) */
(function () {
  var N = STUDIE.addNews;

  N({ id: '2026-11-25-frissites', date: '2026-11-25', title: '🔄 Mindig a friss változat töltődik be',
    plus: [['+1', 'javítás']],
    items: [['Ha van internet, az oldal mindig a legújabb változatot tölti be (telefonon is); internet nélkül a tárolt változat működik tovább.', '']] });

  N({ id: '2026-11-25-motorsport', date: '2026-11-25', title: '🏁 Motorsport, 👩‍🏫 tanárok, 🏋️ edzők',
    plus: [['+3', 'tantárgy'], ['+27', 'lecke'], ['+840', 'tesztkérdés'], ['+36', '„Tudtad?” tény'], ['+2', 'interaktív eszköz'], ['+3', 'új oldal']],
    items: [
      ['Setup-szimulátor: 25 állítható beállítás egy versenyautón (guminyomás, dőlésszög, szárnyak, rugók…), mindegyiknél előnyök és hátrányok, köridő, egyensúly, gumihő', '#/setup'],
      ['Motorsport-szerelő és versenymérnök tantárgy (9 lecke)', '#/tantargy/motorsport'],
      ['Tanároknak oldal: minden tanári eszköz egy helyen + ötletek az órára', '#/tanaroknak'],
      ['Tanári módszertan és pedagógia tantárgy (9 lecke)', '#/tantargy/tanari'],
      ['Edzőknek oldal edzésterhelés-kalkulátorral (sRPE, ACWR)', '#/edzoknek'],
      ['Edzői ismeretek tantárgy (9 lecke)', '#/tantargy/edzo']
    ] });

  N({ id: '2026-11-25-ujdonsagok', date: '2026-11-25', title: '🆕 Újdonságok oldal',
    plus: [['+1', 'oldal (ez)']],
    items: [['Itt látod mindig, mi került fel legutóbb – közvetlen linkekkel. A menüben és a kezdőlapon jelzés mutatja, ha van még meg nem nézett újdonság.', '#/ujdonsagok']] });

  N({ id: '2026-11-25-kereses', date: '2026-11-25', title: '🔎 Keresés a választólistákban',
    plus: [['+6', 'kereshető lista']],
    items: [
      ['Tesztközpont: keresés tantárgyra, témára és a kérdések szövegében', '#/teszt'],
      ['Vizsgafelkészítő, Kérdés-összeállító, Tanulássegéd: minden választólista fölött kereső', '#/tanulas']
    ] });

  N({ id: '2026-11-25-msc', date: '2026-11-25', title: '🎓 MSc – mesterképzés',
    plus: [['+14', 'MSc-kurzus'], ['+435', 'MSc-szakszó'], ['+302', 'új BSc-szakszó'], ['+1', 'Kérdés-összeállító']],
    items: [
      ['Informatika: Gépi tanulás, Elosztott rendszerek, Kriptográfia és IT-biztonság', '#/egyetem'],
      ['Villamosmérnök: Teljesítményelektronika, Beágyazott rendszerek, Haladó irányítástechnika', '#/egyetem'],
      ['Matematika: Numerikus módszerek, Optimalizálás, Sztochasztikus folyamatok', '#/egyetem'],
      ['Gazdaság: Haladó vállalati pénzügyek, IFRS, Kontrolling', '#/egyetem'],
      ['Élettudomány: Élettan és kórélettan, Molekuláris biológia és farmakológia', '#/egyetem'],
      ['Mind a 21 BSc-kurzus bővült (13–16 új, időtálló fogalom kurzusonként)', '#/egyetem'],
      ['Kérdés-összeállító: keresés az összes kérdés között, kosár, vizsga, nyomtatható dolgozat', '#/osszeallito']
    ] });

  N({ id: '2026-11-25-egyszeru', date: '2026-11-25', title: '🎒 Egyetem egyszerűen + 📚 Tanulássegéd',
    plus: [['+567', 'egyszerű magyarázat'], ['+5', 'tanulási eszköz'], ['+6', 'nyelv'], ['+16', 'B1-egység']],
    items: [
      ['Iskolai nézetben minden egyetemi szakszó elöl egyszerű, szakszó nélküli magyarázatot kap', '#/egyetem'],
      ['Tanulássegéd: írd le fejből, gondolattérkép, Igaz vagy hamis?, fogalomkitaláló, Pomodoro', '#/tanulas'],
      ['Új nyelvek: finn, lengyel, holland, svéd, török, görög; angol és német B1', '#/nyelvek']
    ] });

  N({ id: '2026-11-25-nyelvek2', date: '2026-11-25', title: '🗣️ Kínai, koreai, portugál + Gyengéim gyakorlása',
    plus: [['+3', 'nyelv'], ['+2', 'ismétlő mód'], ['+3', 'kitűző']],
    items: [['Kínai (pinjinnel), koreai (hangullal), portugál; „Gyengéim gyakorlása” és „Vegyes ismétlés”', '#/nyelvek']] });

  N({ id: '2026-11-24-felnott', date: '2026-11-24', title: '🧭 Felnőtt élet + pénzügyi kurzusok',
    plus: [['+3', 'tantárgy'], ['+4', 'egyetemi kurzus'], ['+3', 'kalkulátor'], ['+2', 'tanulási útvonal']],
    items: [
      ['Pénz a mindennapokban (ÁFA, SZJA-bevallás, bérpapír, bank, megtakarítás…)', '#/tantargy/penz-mindennap'],
      ['Hivatalos ügyek és a munka világa', '#/tantargy/felnott-elet'],
      ['Önálló élet és háztartás', '#/tantargy/haztartas'],
      ['Számvitel, Könyvvizsgálat, Vállalati pénzügyek, Adózás', '#/egyetem']
    ] });

  N({ id: '2026-11-24-edzes', date: '2026-11-24', title: '🏋️ Így edzenek a legjobbak',
    plus: [['+111', 'edzéstitok'], ['+1', 'témaszűrő']],
    items: [['Ronaldo, Curry, Phelps, Kipchoge, Verstappen és még sokan – tudományos magyarázattal', '#/sport']] });

  N({ id: '2026-11-24-sport-nyelv', date: '2026-11-24', title: '⚽ Sport és 🗣️ nyelvek',
    plus: [['+1', 'tantárgy (9 lecke)'], ['+193', 'sportos tény'], ['+1', 'F1-modell'], ['+7', 'nyelv']],
    items: [
      ['Sport és tudomány: 17 sportág, kedvenc sportolók keresése', '#/sport'],
      ['Szétszedhető Forma–1-es autó', '#/felfedezo/f1-auto'],
      ['Játékos nyelvtanulás: angol, német, spanyol, francia, olasz, japán, orosz', '#/nyelvek']
    ] });

  N({ id: '2026-11-24-tudtad', date: '2026-11-24', title: '💡 Tudtad? és szakmai réteg',
    plus: [['+321', '„Tudtad?” tény'], ['+100', 'lecke egyetemi/szakmai réteggel']],
    items: [['Meglepő, de igaz tények mindenről, minden leckéhez', '#/tudtad']] });
})();
