/* Újdonságok (változásnapló). A legfrissebb legyen legfelül. Formátum:
 * STUDIE.addNews({ id, date: 'ÉÉÉÉ-HH-NN', title, plus: [['+840', 'tesztkérdés'], …], items: [['szöveg', '#/link'], …] }) */
(function () {
  var N = STUDIE.addNews;

  N({ id: '2026-11-28-igazhamis', date: '2026-11-28', title: '⚡ Igaz vagy hamis?: sorozat-pontozás, nagy visszajelzés',
    plus: [['+1', 'játékszabály-javítás']],
    items: [['Egy hibás válasz lenullázza a pontot (a pont a jelenlegi sorozat); minden válasz után nagy ✓ / ✗ jelzés, hibánál a helyes válasszal; a rekord a leghosszabb sorozat.', '#/tanulas/igazhamis']] });

  N({ id: '2026-11-28-atlathatosag', date: '2026-11-28', title: '🤖 Átláthatóság és ✉️ hibajelzés',
    plus: [['+1', 'hibajelentő gomb minden oldalon'], ['+1', 'nyílt licenc']],
    items: [
      ['Minden oldal alján: a tartalom MI segítségével készült, ezért érdemes kritikusan kezelni. A „✉️ Hibát jelzek” gomb előre kitöltött e-mailt nyit az oldal címével – kijavítjuk!', ''],
      ['Nyílt licenc: a programkód MIT, a tananyag CC BY 4.0 – szabadon felhasználható a forrás megjelölésével', '']
    ] });

  N({ id: '2026-11-27-isa', date: '2026-11-27', title: '📊 Könyvvizsgálat: ISA-standardok, állítások, IFRS-kalkulátorok',
    plus: [['+1', 'egyetemi kurzus (ISA)'], ['+57', 'szakszó'], ['+105', 'tesztkérdés'], ['+11', 'interaktív gyakorló'], ['+7', 'kalkulátor']],
    items: [
      ['Nemzetközi könyvvizsgálati standardok (ISA): 36 standardkártya (ISA 200–720, ISQM 1–2) céllal, követelményekkel, vizsgakérdéssel, gyakori hibával', '#/egyetem/isa'],
      ['Vezetői állítások (assertionök) az ISA 315 szerint, eljárás ↔ állítás tábla 8 mérlegtételre; „Melyik állítás?” (46 helyzet), „Vouching vagy tracing?”', '#/egyetem/isa'],
      ['Lényegesség-kalkulátor (ISA 320), könyvvizsgálói jelentés döntőfa (ISA 700/705/706)', '#/egyetem/isa'],
      ['IFRS-kalkulátorok: IFRS 16 lízing, IFRS 9 ECL, IFRS 15 ügyletiár-felosztás, IAS 36 értékvesztés, IAS 12 halasztott adó, IAS 2; új: IFRS 18', '#/egyetem/msc-ifrs']
    ] });

  N({ id: '2026-11-26-tudomany', date: '2026-11-26', title: '🤖 MI, 🌍 klíma, 🧠 pszichológia, 🔭 csillagászat + képletek, játéktér, molekulák, hangos tanulás',
    plus: [['+4', 'tantárgy'], ['+40', 'lecke'], ['+133', 'leckekvíz-kérdés'], ['+276', 'tesztkérdés'], ['+45', '„Tudtad?” tény'], ['+238', 'képlet kalkulátorral'], ['+16', 'interaktív eszköz'], ['+1', 'szétszedhető modell (rakéta)'], ['+4', 'új oldal']],
    items: [
      ['Mesterséges intelligencia (10 lecke): „Tanítsd a gépet!”, neurálisháló-játszótér, „Következő szó”, „Valódi vagy MI?”', '#/tantargy/mi'],
      ['Környezet és klíma (10 lecke): energiamix-szimulátor, ökológiai lábnyom-kalkulátor, üvegházhatás-modell', '#/tantargy/klima'],
      ['Pszichológia és mentális egészség (10 lecke): segélyvonalak, légzőgyakorlat, hangulatnapló, gondolatcsapda-kvíz, halogatás-tervező', '#/tantargy/pszichologia'],
      ['Csillagászat és űr (10 lecke): mozgó Naprendszer, pályaszimulátor, Hold-fázisok, égbolttérkép, hordozórakéta-modell', '#/tantargy/csillagaszat'],
      ['Képletgyűjtemény: 238 képlet, bármelyik betűt kiszámolja, mértékegység-váltással és lépésekkel', '#/kepletek'],
      ['Fizikai játéktér: homokozó, ferde hajítás célba, ütközések, hídépítő, Newton-bölcső, holdraszállás', '#/jatekter'],
      ['Molekulaépítő: 119 felismert molekula 3D-ben, 32 kihívás, izomerkereső, 41 reakcióegyenlet', '#/molekula'],
      ['Hangos tanulás: minden lecke podcastként, felolvasott kvízzel, lejátszási listákkal', '#/hangos']
    ] });

  N({ id: '2026-11-26-statisztika', date: '2026-11-26', title: '📊 Névtelen látogatásszámlálás',
    plus: [['+1', 'kikapcsolható beállítás']],
    items: [['A weboldal névtelenül, süti nélkül számolja, melyik oldalt hányan nézik meg (a haladásod soha nem kerül bele). Kikapcsolható a Letöltés és használat oldalon.', '#/nevjegy']] });

  N({ id: '2026-11-26-erettsegi', date: '2026-11-26', title: '🎓 Érettségi, 💻 programozás, 🔐 szabadulószoba, 🕰️ idővonal',
    plus: [['+211', 'érettségi-szerű feladat (13 próbasor)'], ['+29', 'programozási feladat'], ['+4', 'szabadulószoba (24 rejtvény)'], ['+221', 'történelmi esemény'], ['+8', 'történelmi térkép'], ['+9', 'új oldal']],
    items: [
      ['Érettségi próbavizsgák: matek, fizika, kémia, biológia, történelem, informatika – időre, pontozással, érdemjeggyel, javítókulccsal, nyomtatható', '#/erettsegi'],
      ['Programozás játszva: 14 robotos pálya + 15 algoritmus-feladat, lépésenkénti futtatás változókkal', '#/kodolas'],
      ['Szabadulószoba: 4 szoba (labor, tengeralattjáró, időgép, könyvtár), a lakatokat tananyaggal nyitod', '#/szabadulo'],
      ['Történelmi idővonal (221 esemény, 4 sáv) és 8 vázlatos térkép (honfoglalás, felfedezések, világháborúk…), „Rakd sorba!” játék', '#/idovonal'],
      ['Gyengepont-térkép és hibanapló: hol hibázol a legtöbbet, és mit gyakorolj', '#/gyengepontok'],
      ['Magyarázd el! – a saját magyarázatodra visszajelzést kapsz (Feynman-technika)', '#/magyarazd'],
      ['Nyomtatható jegyzetfüzet bármely tantárgyból', '#/fuzet'],
      ['Haladás átvitele másik eszközre fiók nélkül: link vagy QR-kód, összefésüléssel', '#/szinkron'],
      ['Új színtémák, magas kontraszt, csökkentett mozgás a Beállításokban', '#/beallitasok']
    ] });

  N({ id: '2026-11-26-szakmak', date: '2026-11-26', title: '🧰 Új szakmák, hétköznapi túlélőtudás, új modellek',
    plus: [['+5', 'tantárgy'], ['+46', 'lecke'], ['+166', 'leckekvíz-kérdés'], ['+326', 'tesztkérdés'], ['+3', 'szétszedhető modell (37 alkatrész)'], ['+30', '„Tudtad?” tény'], ['+20', 'tényjavítás']],
    items: [
      ['Hétköznapi túlélőtudás (14 lecke): elsősegély, háztartási javítások, albérlet, fogyasztóvédelem, csalások…', '#/tantargy/tulelotudas'],
      ['Fodrász és kozmetikus (8 lecke)', '#/tantargy/fodrasz'],
      ['Ápolás és egészségügyi alapok (8 lecke)', '#/tantargy/apolas'],
      ['Logisztika és raktározás (8 lecke)', '#/tantargy/logisztika'],
      ['Pék és cukrász (8 lecke)', '#/tantargy/pek'],
      ['Új modellek: mosógép, drón, 3D nyomtató', '#/felfedezo'],
      ['Tényellenőrzés: 2026-os adó- és támogatási adatok frissítve (pl. Wekerle Plusz, 0%-os gyógyszer-áfa), sportadatok', '']
    ] });

  N({ id: '2026-11-26-muhely', date: '2026-11-26', title: '🛠 Interaktív műhely: feladatmegoldó, labor, párbaj, szimulátorok',
    plus: [['+21', 'lépésenkénti feladattípus'], ['+10', 'labor-kísérlet'], ['+6', 'szétszedhető modell (76 alkatrész)'], ['+3', 'gazdasági szimulátor'], ['+46', 'szakma-profil'], ['+1', 'áramkör-labor'], ['+9', 'új oldal']],
    items: [
      ['Lépésenkénti feladatmegoldó: 21 feladattípus matekból, fizikából, kémiából és pénzügyből, 3 szinten – tippek, lépésenként kibontható megoldás, végtelen új feladat', '#/feladatok'],
      ['Virtuális labor: inga, rugó, fénytörés, lencse, interferencia, titrálás, pH-skála, gáztörvények, úszás, olvadás–forrás', '#/labor'],
      ['Áramkör-labor: építs áramkört telepből, izzóból, LED-ből, kapcsolóból, és mérj', '#/aramkor'],
      ['Új modellek: repülőgép, emberi csontváz, vulkán, hűtőszekrény, robotporszívó, otthoni hálózat és internet', '#/felfedezo'],
      ['Gazdasági szimulátorok: tőzsdejáték, saját vállalkozás, családi költségvetés', '#/szimulatorok'],
      ['Pályaorientáció: érdeklődés-teszt és 46 szakma bemutatása', '#/palya'],
      ['Okos ismétlés: a rosszul megválaszolt kérdések a megfelelő napon visszajönnek', '#/ismetles'],
      ['Párbaj: kvízcsata két játékosnak egy telefonon, vagy kihívó link a barátodnak', '#/parbaj'],
      ['Saját kérdések és kártyák: írd meg, tanuld, nyomtasd, oszd meg linkként', '#/sajat']
    ] });

  N({ id: '2026-11-26-kenyelem', date: '2026-11-26', title: '📱 Telefonos menü, akadálymentesség, gyorsabb betöltés',
    plus: [['+1', 'alsó menüsor telefonon'], ['+5', 'akadálymentességi beállítás'], ['~2,5×', 'gyorsabb első betöltés']],
    items: [
      ['Telefonon alul menüsor (Kezdőlap, Keresés, Teszt, Tanulás, Menü) – mint egy appban', '#/'],
      ['Diszlexiabarát betű, nagyobb sorköz, olvasóvonalzó, egész oldal felolvasása, aláhúzott linkek', '#/beallitasok'],
      ['A kezdőlap azonnal megjelenik, a nagy adatcsomagok a háttérben töltődnek (mobilnet-szimulációban 9,3 s → 3,6 s)', '']
    ] });

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
