/* Tantárgy: Matematika (5–8. osztály) */
STUDIE.addSubject({
  id: 'mat-alap',
  stage: 'altalanos',
  title: 'Matematika (5–8. osztály)',
  icon: '🔢',
  color: '#e5484d',
  description: 'Egész számok, oszthatóság, törtek, százalék, mértékegységek, geometria és egyenletek – a felső tagozat alapjai érthetően.',
  intro: 'Ebben a tárgyban a felső tagozatos matek legfontosabb témáit veheted át lépésről lépésre. Minden leckében vannak **kidolgozott példák**, és a végtelen sok feladatot adó **gyakorlóban** addig számolhatsz, amíg biztos nem leszel a dolgodban. Ha valami nem megy elsőre, semmi baj: olvasd el újra a példát, és próbáld meg még egyszer!',
  lessons: [
    {
      id: 'egesz-szamok',
      title: 'Természetes és egész számok',
      level: 1, minutes: 12,
      summary: 'Helyiérték, kerekítés, negatív számok a számegyenesen és a műveletek előjelszabályai.',
      tags: ['természetes szám', 'egész szám', 'negatív szám', 'számegyenes', 'abszolút érték', 'ellentett', 'előjelszabály', 'műveleti sorrend', 'kerekítés'],
      sections: [
        {
          title: 'Természetes számok és a helyiérték',
          text: 'A **természetes számok** a 0, 1, 2, 3, 4, … számok. Ezekkel számolunk meg dolgokat. Végtelen sok van belőlük: bármelyikhez hozzáadhatsz 1-et.\n\nA mi számírásunk **tízes számrendszer**: egy számjegy értéke attól függ, hol áll. A 3 742 számban:\n\n- a **3** ezrest jelent (3000),\n- a **7** százast (700),\n- a **4** tízest (40),\n- a **2** egyest (2).\n\nEz a **helyiérték**. A 7 **alaki értéke** 7, **valódi értéke** viszont 700.\n\n**Kerekítés:** megnézzük a kerekítendő helyiérték utáni számjegyet. Ha az 0, 1, 2, 3 vagy 4, lefelé kerekítünk, ha 5, 6, 7, 8 vagy 9, felfelé.\n\n- 3 742 tízesekre kerekítve: **3 740** (a 2 miatt lefelé)\n- 3 742 százasokra kerekítve: **3 700** (a 4 miatt lefelé)\n- 3 762 százasokra kerekítve: **3 800** (a 6 miatt felfelé)',
          tip: 'A nagy számokat hátulról hármas csoportokra bontva könnyebb kiolvasni: 12 500 000 = tizenkétmillió-ötszázezer.'
        },
        {
          title: 'Negatív számok a számegyenesen',
          text: 'Télen a hőmérő mutathat **−5 °C**-ot, a bankszámlán lehet **−2000 Ft** (tartozás), a Holt-tenger partja kb. **−430 m**-rel van a tengerszint alatt. Ezek **negatív számok**.\n\nA pozitív és negatív egész számok a 0-val együtt alkotják az **egész számokat**: …, −3, −2, −1, 0, 1, 2, 3, …\n\nA **számegyenesen** a 0-tól jobbra vannak a pozitív, balra a negatív számok. Amelyik szám jobbrább van, az a nagyobb:\n\n- −2 > −7 (a −2 közelebb van a nullához, jobbrább áll)\n- −1 < 0 < 1\n\nKét fontos fogalom:\n\n- Egy szám **ellentettje** a nullára „tükrözött” szám: 5 ellentettje −5, −8 ellentettje 8.\n- Egy szám **abszolút értéke** a nullától mért távolsága, ez sosem negatív: |−6| = 6, |4| = 4, |0| = 0.',
          tip: 'Negatív számoknál fordított az érzésed: a −100 °C sokkal hidegebb, vagyis kisebb, mint a −1 °C.'
        },
        {
          title: 'Műveletek egész számokkal',
          text: '**Összeadás:** azonos előjelűeknél összeadjuk az abszolút értékeket, és megtartjuk az előjelet: (−4) + (−3) = −7. Különböző előjelűeknél a nagyobb abszolút értékűből kivonjuk a kisebbet, és az eredmény a nagyobb abszolút értékű előjelét kapja: (−9) + 4 = −5.\n\n**Kivonás:** negatív szám kivonása ugyanaz, mint az ellentettjének hozzáadása: 3 − (−5) = 3 + 5 = 8.\n\n**Szorzás és osztás – előjelszabály:**\n\n- azonos előjelek → **pozitív** eredmény: (−3) · (−4) = 12\n- különböző előjelek → **negatív** eredmény: (−3) · 4 = −12, 20 : (−5) = −4\n\n**Műveleti sorrend:** először a zárójelek, utána a szorzás és osztás (balról jobbra), végül az összeadás és kivonás (balról jobbra).\n\nPélda: `−2 + 3 · (−4) = −2 + (−12) = −14`.',
          warn: 'Tipikus hiba: (−3) · (−4) = −12. Nem! Két negatív szám szorzata pozitív, tehát 12.'
        },
        {
          title: 'Gyakorlás',
          text: 'Most te jössz! Mindig új feladatot kapsz, a megoldás lépéseit is megnézheted.',
          widget: { type: 'gyakorlas', options: { kind: 'negativ', title: 'Számolás negatív számokkal' } }
        }
      ],
      quiz: [
        { q: 'Melyik a legkisebb szám?', options: ['−2', '0', '−9', '−5'], answer: 2, explain: 'A számegyenesen a −9 áll a legbaloldalabb, ezért ez a legkisebb.' },
        { q: 'Mennyi (−6) · (−7)?', options: ['−42', '42', '−13', '13'], answer: 1, explain: 'Azonos előjelű számok szorzata pozitív: 6 · 7 = 42.' },
        { q: 'Mennyi 4 − (−6)?', options: ['−2', '−10', '2', '10'], answer: 3, explain: 'Negatív szám kivonása = az ellentett hozzáadása: 4 + 6 = 10.' },
        { q: 'Mennyi 58 362 ezresekre kerekítve?', options: ['58 000', '58 400', '59 000', '60 000'], answer: 0, explain: 'Az ezresek utáni számjegy a 3, ezért lefelé kerekítünk: 58 000.' }
      ]
    },
    {
      id: 'oszthatosag',
      title: 'Oszthatóság, prímszámok, LNKO és LKKT',
      level: 1, minutes: 14,
      summary: 'Oszthatósági szabályok, prímtényezős felbontás, legnagyobb közös osztó és legkisebb közös többszörös.',
      tags: ['osztó', 'többszörös', 'oszthatósági szabály', 'prímszám', 'összetett szám', 'prímtényezős felbontás', 'LNKO', 'LKKT'],
      sections: [
        {
          title: 'Osztók, többszörösök és oszthatósági szabályok',
          text: 'Ha egy szám maradék nélkül osztható egy másikkal, akkor a második az első **osztója**, az első pedig a második **többszöröse**. Például 12 osztói: 1, 2, 3, 4, 6, 12. A 3 többszörösei: 3, 6, 9, 12, 15, …\n\nNem kell mindig osztani, a legfontosabb **oszthatósági szabályok**:\n\n- **2-vel**: ha az utolsó számjegy páros (0, 2, 4, 6, 8).\n- **5-tel**: ha az utolsó számjegy 0 vagy 5.\n- **10-zel**: ha az utolsó számjegy 0.\n- **4-gyel**: ha az utolsó két jegyből álló szám osztható 4-gyel (pl. 1 316, mert 16 osztható 4-gyel).\n- **25-tel**: ha az utolsó két jegy 00, 25, 50 vagy 75.\n- **3-mal**: ha a számjegyek összege osztható 3-mal (pl. 471: 4 + 7 + 1 = 12, igen).\n- **9-cel**: ha a számjegyek összege osztható 9-cel (pl. 5 382: 5 + 3 + 8 + 2 = 18, igen).\n- **6-tal**: ha osztható 2-vel **és** 3-mal is.',
          tip: 'Minden 9-cel osztható szám osztható 3-mal is, de fordítva nem igaz: a 12 osztható 3-mal, 9-cel viszont nem.'
        },
        {
          title: 'Prímszámok és prímtényezős felbontás',
          text: 'A **prímszámoknak** pontosan két osztójuk van: az 1 és önmaguk. Az első néhány prím: **2, 3, 5, 7, 11, 13, 17, 19, 23, 29**. A 2 az egyetlen páros prím.\n\nA kettőnél több osztóval rendelkező számok az **összetett számok** (pl. 4, 6, 9, 15). Az **1 se nem prím, se nem összetett**, mert csak egy osztója van.\n\nMinden összetett szám felírható prímszámok szorzataként, ez a **prímtényezős felbontás**. Kis prímekkel osztogatunk, amíg 1-et nem kapunk:\n\n`360 = 2 · 180 = 2 · 2 · 90 = 2 · 2 · 2 · 45 = 2 · 2 · 2 · 3 · 15 = 2 · 2 · 2 · 3 · 3 · 5`\n\nRövidebben, hatványokkal: **360 = 2³ · 3² · 5**.'
        },
        {
          title: 'LNKO és LKKT',
          text: 'A **legnagyobb közös osztó (LNKO)** a legnagyobb szám, amellyel mindkét szám osztható. Jelölése: (24; 36). A **legkisebb közös többszörös (LKKT)** a legkisebb pozitív szám, amely mindkettőnek többszöröse. Jelölése: [24; 36].\n\n**Kidolgozott példa:** 24 = 2³ · 3 és 36 = 2² · 3².\n\n- **LNKO**: a **közös** prímtényezők a **legkisebb** kitevőn: 2² · 3 = **12**.\n- **LKKT**: **minden** előforduló prímtényező a **legnagyobb** kitevőn: 2³ · 3² = **72**.\n\nEllenőrzés: LNKO · LKKT = 12 · 72 = 864 = 24 · 36. Ez mindig így van!\n\n**Szöveges feladat:** az egyik busz 12, a másik 18 percenként indul a végállomásról. 8:00-kor együtt indultak. Mikor indulnak legközelebb együtt? A [12; 18] = **36**, tehát 8:36-kor.\n\n**Másik példa:** 24 alma és 36 körte van. Legfeljebb hány egyforma csomagot készíthetünk úgy, hogy minden gyümölcs elfogyjon? (24; 36) = **12** csomagot, mindegyikben 2 alma és 3 körte lesz.',
          tip: 'Árulkodó szavak: „legközelebb mikor lesz újra együtt” → LKKT. „Legfeljebb hány egyforma részre” → LNKO.',
          widget: { type: 'gyakorlas', options: { kind: 'oszthatosag', title: 'LNKO és LKKT gyakorló' } }
        }
      ],
      quiz: [
        { q: 'Melyik szám osztható 9-cel?', options: ['7 452', '3 334', '5 122', '9 991'], answer: 0, explain: '7 + 4 + 5 + 2 = 18, ami osztható 9-cel. A többinél a számjegyösszeg 13, 10, illetve 28, ezek nem oszthatók 9-cel.' },
        { q: 'Melyik prímszám?', options: ['21', '27', '1', '29'], answer: 3, explain: 'A 29-nek csak az 1 és a 29 az osztója. 21 = 3 · 7, 27 = 3 · 9, az 1 pedig nem prím.' },
        { q: 'Mennyi (18; 30), vagyis a 18 és a 30 legnagyobb közös osztója?', options: ['3', '6', '90', '540'], answer: 1, explain: '18 = 2 · 3², 30 = 2 · 3 · 5. A közös tényezők a legkisebb kitevőn: 2 · 3 = 6.' },
        { q: 'Mennyi [8; 12], vagyis a 8 és a 12 legkisebb közös többszöröse?', options: ['96', '4', '24', '48'], answer: 2, explain: '8 = 2³, 12 = 2² · 3. Minden tényező a legnagyobb kitevőn: 2³ · 3 = 24.' }
      ]
    },
    {
      id: 'tortek-alapok',
      title: 'Törtek és tizedes törtek',
      level: 2, minutes: 15,
      summary: 'Mit jelent egy tört, hogyan bővítünk és egyszerűsítünk, hogyan számolunk törtekkel és tizedes törtekkel.',
      tags: ['tört', 'számláló', 'nevező', 'bővítés', 'egyszerűsítés', 'közös nevező', 'vegyes szám', 'tizedes tört', 'reciprok'],
      sections: [
        {
          title: 'Mit jelent egy tört?',
          text: 'A **3/4** azt jelenti, hogy az egészet **4 egyenlő részre** osztottuk, és ebből **3 részt** vettünk. A vonal alatti szám a **nevező** (hány részre osztottunk), a vonal feletti a **számláló** (hány részt veszünk).\n\n**Bővítés:** a számlálót és a nevezőt ugyanazzal a számmal szorozzuk, az érték nem változik: 3/4 = 6/8 = 9/12.\n\n**Egyszerűsítés:** a számlálót és a nevezőt ugyanazzal a számmal osztjuk: 18/24 = 3/4 (6-tal osztottunk, ami a 18 és 24 LNKO-ja).\n\n**Vegyes szám:** ha a számláló nagyobb a nevezőnél, a törtet egészekre és maradékra bonthatjuk: 7/3 = 2 egész 1/3, mert 7 : 3 = 2, maradék 1.',
          tip: 'Egy pizzát 8 szeletre vágtak, és te megettél 2-t: ez 2/8, egyszerűsítve 1/4 pizza. Ugyanannyi, csak másképp felírva!'
        },
        {
          title: 'Műveletek törtekkel',
          text: '**Összeadás és kivonás:** csak **azonos nevezőjű** törteket adhatunk össze, ezért először **közös nevezőre** hozunk (a nevezők LKKT-jára):\n\n`2/3 + 1/4 = 8/12 + 3/12 = 11/12`\n\n**Szorzás:** számlálót a számlálóval, nevezőt a nevezővel szorzunk, és ha lehet, egyszerűsítünk:\n\n`2/5 · 3/4 = 6/20 = 3/10`\n\n**Tört szorzása egész számmal:** csak a számlálót szorozzuk: 3 · 2/7 = 6/7.\n\n**Osztás:** az osztó **reciprokával** (megfordítottjával) szorzunk:\n\n`3/4 : 2/5 = 3/4 · 5/2 = 15/8 = 1 egész 7/8`\n\n**Egy szám törtrésze:** a 60 kétharmad része: 60 : 3 · 2 = **40**.',
          warn: 'A leggyakoribb hiba: 1/2 + 1/3 = 2/5. Ez rossz! Közös nevezőre kell hozni: 3/6 + 2/6 = 5/6.'
        },
        {
          title: 'Tizedes törtek',
          text: 'A **tizedes törtek** olyan törtek, amelyek nevezője 10, 100, 1000, … Tizedesvesszővel írjuk őket:\n\n- 0,7 = 7/10 (hét tized)\n- 0,25 = 25/100 = 1/4 (huszonöt század)\n- 1,125 = 1125/1000 = 9/8 (egy egész százhuszonöt ezred)\n\n**Közönséges törtből tizedes tört:** osszuk el a számlálót a nevezővel: 3/8 = 3 : 8 = **0,375**. Van, amikor a jegyek ismétlődnek: 1/3 = 0,333… (végtelen szakaszos tizedes tört).\n\n**Számolás:** összeadásnál és kivonásnál a tizedesvesszőket egymás alá írjuk. Szorzásnál előbb vesszők nélkül szorzunk, aztán annyi tizedesjegyet jelölünk, ahány a két tényezőben összesen volt: 1,2 · 0,3 = **0,36** (12 · 3 = 36, összesen két tizedesjegy).\n\n**10-zel, 100-zal szorzás:** a vessző annyit lép jobbra, ahány nulla van: 3,45 · 100 = 345. Osztásnál balra lép: 3,45 : 10 = 0,345.',
          widget: { type: 'gyakorlas', options: { kind: 'tortek', title: 'Törtek összeadása' } }
        }
      ],
      quiz: [
        { q: 'Mennyi 1/2 + 1/3?', options: ['2/5', '5/6', '1/6', '2/6'], answer: 1, explain: 'Közös nevező a 6: 3/6 + 2/6 = 5/6. A 2/5 a tipikus hiba.' },
        { q: 'Melyik a 24/36 legegyszerűbb alakja?', options: ['12/18', '4/6', '2/3', '3/2'], answer: 2, explain: 'A 24 és 36 LNKO-ja 12; ezzel osztva 2/3.' },
        { q: 'Mennyi 0,4 · 0,2?', options: ['0,8', '0,08', '8', '0,6'], answer: 1, explain: '4 · 2 = 8, és összesen két tizedesjegy van, tehát 0,08.' },
        { q: 'Mennyi 2/3 : 4/9?', options: ['8/27', '3/2', '2/3', '6/12'], answer: 1, explain: 'Reciprokkal szorzunk: 2/3 · 9/4 = 18/12 = 3/2.' }
      ]
    },
    {
      id: 'aranyossag-szazalek',
      title: 'Arányosság és százalékszámítás',
      level: 2, minutes: 15,
      summary: 'Egyenes és fordított arányosság, arány szerinti osztás, alap, százalékláb, százalékérték.',
      tags: ['arány', 'egyenes arányosság', 'fordított arányosság', 'százalék', 'alap', 'százalékláb', 'százalékérték', 'akció', 'áremelés'],
      sections: [
        {
          title: 'Egyenes arányosság',
          text: 'Két mennyiség **egyenesen arányos**, ha az egyik **kétszeresére, háromszorosára** nő, akkor a másik is ugyanannyiszorosára nő. Ilyenkor a két mennyiség **hányadosa állandó**.\n\nPélda: 1 kg alma 400 Ft.\n\n- 2 kg → 800 Ft\n- 3 kg → 1200 Ft\n- 0,5 kg → 200 Ft\n\nA fizetendő összeg és a tömeg hányadosa mindig 400 (Ft/kg).\n\n**Következtetés egységre:** 5 füzet 1 200 Ft. Mennyibe kerül 8 füzet? 1 füzet: 1 200 : 5 = 240 Ft, 8 füzet: 8 · 240 = **1 920 Ft**.\n\nAz egyenes arányosság grafikonja egy **origón átmenő egyenes**. Próbáld ki: állítsd a **b** értékét 0-ra, a meredekség (m) pedig legyen az, hogy 1 egységhez mennyi tartozik!',
          widget: { type: 'fuggveny', options: { kind: 'linearis' } }
        },
        {
          title: 'Fordított arányosság és arány szerinti osztás',
          text: 'Két mennyiség **fordítottan arányos**, ha az egyik kétszeresére nő, a másik a felére csökken. Ilyenkor a **szorzatuk állandó**.\n\nPélda: 4 munkás 6 nap alatt fest ki egy iskolát (4 · 6 = 24 „munkásnap”). 8 munkás: 24 : 8 = **3 nap** alatt. 3 munkás: 24 : 3 = **8 nap** alatt.\n\n**Arány szerinti osztás:** Anna és Bence 3 : 2 arányban osztozik 1 500 Ft-on. Összesen 3 + 2 = 5 egyenlő részre osztunk: 1 rész = 1 500 : 5 = 300 Ft. Anna kapja a 3 részt: **900 Ft**, Bence a 2-t: **600 Ft**.',
          tip: 'Nem minden mennyiség arányos! Ha egy ember 10 éves korában 140 cm, abból nem következik, hogy 20 évesen 280 cm lesz.'
        },
        {
          title: 'Százalékszámítás',
          text: 'Az **1%** valaminek a **századrésze**. Három mennyiséget kell megkülönböztetni:\n\n- **alap**: az egész, amiről beszélünk (100%),\n- **százalékláb**: hány százalékról van szó,\n- **százalékérték**: az alap ennyi százaléka.\n\nA legbiztosabb módszer: **számold ki az 1%-ot!**\n\n- **Százalékérték:** mennyi 80 Ft 15%-a? 1% = 0,8 Ft, 15% = 15 · 0,8 = **12 Ft**.\n- **Alap:** egy osztály 25%-a 7 tanuló. Hányan járnak az osztályba? 1% = 7 : 25 = 0,28, 100% = **28 tanuló**.\n- **Százalékláb:** 40 kérdésből 34 jó. 34 : 40 = 0,85 = **85%**.\n\n**Áremelés, akció:** egy 6 000 Ft-os cipő ára 20%-kal csökken. Az új ár az eredeti 80%-a: 6 000 · 0,8 = **4 800 Ft**. Ha egy ár 10%-kal nő, a szorzó 1,1.',
          warn: 'Ha valami 10%-kal drágul, majd 10%-kal olcsóbb lesz, NEM kapod vissza az eredeti árat! 1 000 Ft → 1 100 Ft → 990 Ft. A második 10% már a nagyobb alapból számolódik.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékérték gyakorló' } }
        }
      ],
      quiz: [
        { q: '3 kg krumpli 750 Ft. Mennyibe kerül 5 kg?', options: ['1 250 Ft', '1 000 Ft', '1 500 Ft', '450 Ft'], answer: 0, explain: '1 kg: 750 : 3 = 250 Ft, 5 kg: 5 · 250 = 1 250 Ft.' },
        { q: '6 gép 10 óra alatt végez egy munkával. Hány óra alatt végez vele 4 gép?', options: ['6,7 óra', '15 óra', '8 óra', '24 óra'], answer: 1, explain: 'Fordított arányosság: 6 · 10 = 60 gépóra. 60 : 4 = 15 óra.' },
        { q: 'Mennyi 240 25%-a?', options: ['24', '96', '60', '6'], answer: 2, explain: 'A 25% a negyed rész: 240 : 4 = 60.' },
        { q: 'Egy 2 000 Ft-os könyv ára 15%-kal nő. Mennyi az új ár?', options: ['2 015 Ft', '2 150 Ft', '2 300 Ft', '1 700 Ft'], answer: 2, explain: '1% = 20 Ft, 15% = 300 Ft, az új ár 2 300 Ft. (Vagy: 2 000 · 1,15 = 2 300.)' }
      ]
    },
    {
      id: 'meres-geometria',
      title: 'Mértékegységek, síkidomok és testek',
      level: 2, minutes: 16,
      summary: 'Mértékegységek átváltása, kerület és terület, a testek felszíne és térfogata, valamint Pitagorasz tétele.',
      tags: ['mértékegység', 'átváltás', 'kerület', 'terület', 'téglalap', 'háromszög', 'kör', 'térfogat', 'felszín', 'kocka', 'téglatest', 'Pitagorasz'],
      sections: [
        {
          title: 'Mértékegységek átváltása',
          text: 'Átváltásnál két dolgot kell tudni: a **váltószámot**, és azt, hogy **szorozni vagy osztani** kell. Nagyobb egységről kisebbre szorzunk (több darab lesz belőle), kisebbről nagyobbra osztunk.\n\n- **Hosszúság:** 1 km = 1 000 m, 1 m = 10 dm = 100 cm, 1 cm = 10 mm\n- **Tömeg:** 1 t = 1 000 kg, 1 kg = 100 dkg = 1 000 g\n- **Űrtartalom:** 1 hl = 100 l, 1 l = 10 dl = 100 cl = 1 000 ml\n- **Idő:** 1 nap = 24 óra, 1 óra = 60 perc, 1 perc = 60 másodperc\n- **Terület** (a váltószám a hosszúságé a négyzeten): 1 m² = 100 dm² = 10 000 cm², 1 ha = 10 000 m²\n- **Térfogat** (a köbön): 1 m³ = 1 000 dm³, 1 dm³ = 1 000 cm³\n\nFontos kapcsolat: **1 dm³ = 1 liter**, és **1 cm³ = 1 ml**.\n\nPéldák: 2,5 km = 2 500 m; 350 g = 0,35 kg; 3 m² = 30 000 cm².',
          warn: 'Tipikus hiba: 1 m² = 100 cm². Nem! Egy 1 m × 1 m-es négyzetben 100 · 100 = 10 000 darab 1 cm²-es kis négyzet fér el.',
          widget: { type: 'gyakorlas', options: { kind: 'mertekegyseg', title: 'Mértékegység-átváltó gyakorló' } }
        },
        {
          title: 'Síkidomok kerülete és területe',
          text: 'A **kerület** a síkidom határvonalának hossza (cm, m), a **terület** azt mutatja, mekkora részt fed le a síkból (cm², m²).\n\n- **Téglalap:** K = 2 · (a + b), T = a · b\n- **Négyzet:** K = 4 · a, T = a · a = a²\n- **Háromszög:** K = a + b + c, T = a · m / 2 (alap · hozzá tartozó magasság, osztva 2-vel)\n- **Paralelogramma:** T = a · m\n- **Trapéz:** T = (a + c) · m / 2 (a két párhuzamos oldal átlaga · magasság)\n- **Kör** (r a sugár, π ≈ 3,14): K = 2 · r · π, T = r² · π\n\n**Kidolgozott példa:** egy 8 m × 5 m-es szobát padlószőnyeggel fednek le, körben szegélylécet tesznek. Szőnyeg: T = 8 · 5 = **40 m²**. Léc: K = 2 · (8 + 5) = **26 m**.\n\n**Kör:** egy 10 cm sugarú tányér kerülete 2 · 10 · 3,14 = **62,8 cm**, területe 10² · 3,14 = **314 cm²**.',
          widget: { type: 'gyakorlas', options: { kind: 'kerulet', title: 'Kerület, terület, térfogat gyakorló' } }
        },
        {
          title: 'Testek felszíne és térfogata',
          text: 'A **felszín (A)** a test összes lapjának együttes területe – ennyi papír kell a becsomagolásához. A **térfogat (V)** azt mutatja, mennyi hely van benne – mennyi víz férne bele.\n\n- **Kocka** (élhossza a): A = 6 · a², V = a³\n- **Téglatest** (élei a, b, c): A = 2 · (ab + bc + ac), V = a · b · c\n- **Henger** (alapkör sugara r, magassága m): V = r² · π · m\n\n**Kidolgozott példa:** egy akvárium 50 cm hosszú, 30 cm széles és 40 cm magas. V = 50 · 30 · 40 = 60 000 cm³ = 60 dm³ = **60 liter** víz fér bele.\n\nHány cm² üveg kell hozzá, ha teteje nincs? Alja: 50 · 30 = 1 500, elöl-hátul: 2 · 50 · 40 = 4 000, két oldalt: 2 · 30 · 40 = 2 400. Összesen **7 900 cm²**.'
        },
        {
          title: 'Pitagorasz tétele (8. osztály)',
          text: 'Derékszögű háromszögben a két rövidebb oldal a **befogó** (a, b), a derékszöggel szemközti leghosszabb oldal az **átfogó** (c). **Pitagorasz tétele:**\n\n`a² + b² = c²`\n\nPélda: egy létra alja 3 m-re van a faltól, és a falon 4 m magasan ér fel. Milyen hosszú a létra? c² = 3² + 4² = 9 + 16 = 25, tehát c = **5 m**.\n\nHa az átfogót ismerjük, és egy befogót keresünk, kivonunk: 13 cm átfogó és 5 cm befogó esetén b² = 169 − 25 = 144, b = **12 cm**.',
          widget: { type: 'pitagorasz' }
        }
      ],
      quiz: [
        { q: 'Hány cm³ 2 liter?', options: ['200 cm³', '20 cm³', '2 000 cm³', '20 000 cm³'], answer: 2, explain: '1 l = 1 dm³ = 1 000 cm³, tehát 2 l = 2 000 cm³.' },
        { q: 'Mennyi egy 7 cm és 4 cm oldalú téglalap kerülete?', options: ['28 cm', '11 cm', '22 cm', '56 cm'], answer: 2, explain: 'K = 2 · (7 + 4) = 22 cm. A 28 cm² a terület lenne.' },
        { q: 'Mekkora egy 3 cm élű kocka térfogata?', options: ['9 cm³', '27 cm³', '54 cm³', '18 cm³'], answer: 1, explain: 'V = a³ = 3 · 3 · 3 = 27 cm³. (Az 54 cm² a felszíne: 6 · 9.)' },
        { q: 'Egy derékszögű háromszög befogói 6 cm és 8 cm. Mekkora az átfogó?', options: ['14 cm', '10 cm', '48 cm', '100 cm'], answer: 1, explain: 'c² = 36 + 64 = 100, c = 10 cm.' }
      ]
    },
    {
      id: 'egyenletek',
      title: 'Egyenletek és szöveges feladatok',
      level: 3, minutes: 15,
      summary: 'A mérlegelv, egyenletek lépésről lépésre, ellenőrzés, és hogyan írj fel egyenletet egy szöveges feladatból.',
      tags: ['egyenlet', 'ismeretlen', 'mérlegelv', 'megoldás', 'ellenőrzés', 'szöveges feladat', 'zárójel', 'mérleg'],
      sections: [
        {
          title: 'Mi az egyenlet? A mérlegelv',
          text: 'Az **egyenlet** két kifejezés egyenlősége, amelyben van egy **ismeretlen** (általában x). Például: `3x + 5 = 20`. Az egyenlet **megoldása** az a szám, amelyet x helyére írva igaz állítást kapunk.\n\nKépzelj el egy **kétkarú mérleget** egyensúlyban. Ha mindkét serpenyőbe ugyanannyit teszel, vagy mindkettőből ugyanannyit veszel el, az egyensúly megmarad. Ez a **mérlegelv**: az egyenlet mindkét oldalával **ugyanazt** a műveletet végezzük.\n\n`3x + 5 = 20`   | −5\n`3x = 15`   | : 3\n`x = 5`\n\n**Ellenőrzés:** 3 · 5 + 5 = 15 + 5 = 20. ✔ Igaz, tehát jó a megoldás.',
          tip: 'Mindig ellenőrizz! Egy perc az egész, és rögtön kiderül, ha elszámoltál valamit.'
        },
        {
          title: 'Bonyolultabb egyenletek',
          text: 'Ha az ismeretlen **mindkét oldalon** szerepel, akkor egy oldalra gyűjtjük az x-es tagokat, a másikra a számokat.\n\n`5x − 4 = 2x + 11`   | −2x\n`3x − 4 = 11`   | +4\n`3x = 15`   | : 3\n`x = 5`\n\nEllenőrzés: bal oldal 5 · 5 − 4 = 21, jobb oldal 2 · 5 + 11 = 21. ✔\n\n**Zárójeles egyenlet:** először bontsd fel a zárójelet (a zárójel előtti számmal **minden** tagot szorozz meg!).\n\n`2 · (x + 3) = 16`\n`2x + 6 = 16`   | −6\n`2x = 10`   | : 2\n`x = 5`',
          warn: 'Tipikus hiba: 2 · (x + 3) = 2x + 3. Nem! A 3-at is szorozni kell 2-vel: 2x + 6.',
          widget: { type: 'gyakorlas', options: { kind: 'egyenlet', title: 'Egyenletmegoldó gyakorló' } }
        },
        {
          title: 'Szöveges feladatok lépésről lépésre',
          text: 'A szöveges feladatoknál ez a menetrend segít:\n\n1. Olvasd el figyelmesen, és **gyűjtsd ki az adatokat**.\n2. Döntsd el, **mit jelöl x**.\n3. Fejezd ki a többi mennyiséget x segítségével, és **írd fel az egyenletet**.\n4. **Oldd meg** az egyenletet.\n5. **Ellenőrizd** a szöveg alapján (nem csak az egyenletbe helyettesítve!).\n6. Írj **szöveges választ**.\n\n**1. példa:** Gondoltam egy számot, megszoroztam 4-gyel, hozzáadtam 7-et, így 31-et kaptam. Melyik számra gondoltam?\n\n`4x + 7 = 31` → `4x = 24` → `x = 6`. Válasz: a 6-ra.\n\n**2. példa:** Dani 3 évvel idősebb Zsófinál. Életkoruk összege 25 év. Hány évesek?\n\nLegyen Zsófi x éves, akkor Dani x + 3 éves. `x + (x + 3) = 25` → `2x + 3 = 25` → `2x = 22` → `x = 11`.\n\nEllenőrzés: 11 + 14 = 25 ✔, és 14 − 11 = 3 ✔. Válasz: **Zsófi 11, Dani 14 éves.**\n\n**3. példa:** Egy téglalap kerülete 30 cm, hosszabb oldala 3 cm-rel hosszabb a rövidebbnél. Legyen a rövidebb oldal x: `2 · (x + x + 3) = 30` → `4x + 6 = 30` → `x = 6`. Az oldalak **6 cm és 9 cm**.'
        }
      ],
      quiz: [
        { q: 'Mi a megoldása a 2x + 9 = 25 egyenletnek?', options: ['17', '8', '16', '4'], answer: 1, explain: '2x = 25 − 9 = 16, x = 16 : 2 = 8. Ellenőrzés: 2 · 8 + 9 = 25.' },
        { q: 'Mi a megoldása a 7x − 3 = 4x + 12 egyenletnek?', options: ['5', '3', '9', '15'], answer: 0, explain: '7x − 4x = 12 + 3, vagyis 3x = 15, x = 5.' },
        { q: 'Melyik egyenlet írja le: „egy szám háromszorosánál 5-tel kisebb szám 16”?', options: ['3 · (x − 5) = 16', '3x + 5 = 16', '5 − 3x = 16', '3x − 5 = 16'], answer: 3, explain: 'A szám háromszorosa 3x, ennél 5-tel kisebb: 3x − 5. Ez egyenlő 16-tal (x = 7).' },
        { q: 'Mi a megoldása a 3 · (x − 2) = 12 egyenletnek?', options: ['6', '2', '4,67', '14'], answer: 0, explain: '3x − 6 = 12, 3x = 18, x = 6. (Vagy: x − 2 = 4, x = 6.)' }
      ]
    }
  ]
});
