/* Tantárgy: Szakács és vendéglátás */
STUDIE.addSubject({
  id: 'szakacs',
  stage: 'szakma',
  title: 'Szakács és vendéglátás',
  icon: '👨‍🍳',
  color: '#f08c2e',
  description: 'Élelmiszer-biztonság, hőmérsékletek, allergének, konyhatechnológia, konyhai munkavédelem és a felszolgálás alapjai.',
  intro: 'Ez a tananyag a szakácsmesterség és a vendéglátás **alapjait** tanítja meg: hogyan lesz az étel nemcsak finom, hanem **biztonságos** is. A konyhában a legtöbb baj láthatatlan: a baktériumot nem látod, az allergént nem érzed. Ezért a jó szakács fegyelmezetten, szabályok szerint dolgozik. Az itt leírtak általános, a hazai gyakorlatban (és a NÉBIH ajánlásaiban) használt elvek. Mindig a munkahelyed saját HACCP-rendszere és a vezetőd utasítása az irányadó.',
  lessons: [
    {
      id: 'higienia',
      title: 'Élelmiszer-biztonság és higiénia',
      level: 1, minutes: 14,
      summary: 'A HACCP elvei, a kritikus pontok, a keresztszennyeződés, a helyes kézmosás és a személyi higiénia.',
      tags: ['HACCP', 'élelmiszer-biztonság', 'higiénia', 'kritikus pont', 'CCP', 'keresztszennyeződés', 'kézmosás', 'személyi higiénia', 'egészségügyi alkalmasság', 'NÉBIH', 'ételmérgezés', 'vágódeszka'],
      sections: [
        {
          title: 'Miért kell ennyire vigyázni?',
          text: 'Az ételmérgezést legtöbbször **baktériumok** (pl. szalmonella, Campylobacter, Listeria, Staphylococcus aureus), **vírusok** (pl. norovírus) vagy ezek **mérgei** okozzák. Ezek többségét nem látod, nem szagolod, nem ízleled: a romlott kinézetű étel nem mindig veszélyes, a veszélyes étel viszont gyakran teljesen rendben lévőnek tűnik.\n\nAz ételt háromféle **veszély** fenyegeti:\n\n- **Biológiai**: baktériumok, vírusok, penészgombák, paraziták.\n- **Kémiai**: tisztítószer-maradék, rovarirtó, a csomagolásból kioldódó anyag, és ide soroljuk az **allergéneket** is.\n- **Fizikai**: üvegszilánk, csont, fémforgács, hajszál, műanyagdarab, ékszer.\n\nEgy étteremben egyszerre akár több száz ember eszik ugyanabból az ételből. Egy hiba így sok embert betegíthet meg, a kisgyermekek, idősek, várandósok és betegek számára pedig életveszélyes is lehet.'
        },
        {
          title: 'A HACCP hét alapelve',
          text: 'A **HACCP** (Hazard Analysis and Critical Control Points: veszélyelemzés és kritikus szabályozási pontok) egy megelőző rendszer. Nem a kész ételt vizsgálja utólag, hanem a folyamat minden lépésénél megakadályozza a hibát. Minden élelmiszer-vállalkozásnak (így minden étteremnek, büfének, menzának) működtetnie kell ilyen rendszert.\n\n1. **Veszélyelemzés**: végiggondoljuk a folyamatot az áruátvételtől a tálalásig, és minden lépésnél megnézzük, mi lehet a veszély.\n2. **Kritikus szabályozási pontok (CCP)** kijelölése: azok a lépések, ahol a veszélyt **meg lehet és meg kell** szüntetni vagy elfogadható szintre csökkenteni (pl. hőkezelés, hűtés).\n3. **Kritikus határértékek** megadása: pl. „a hús maghőmérséklete legalább 72 °C”.\n4. **Felügyelet (monitoring)**: rendszeres mérés és ellenőrzés, pl. maghőmérő, hűtő hőmérőjének leolvasása.\n5. **Helyesbítő intézkedés**: mit teszünk, ha eltérés van (tovább sütjük, kidobjuk, megjavíttatjuk a hűtőt).\n6. **Igazolás (verifikáció)**: időnként ellenőrizzük, hogy a rendszer valóban működik-e.\n7. **Dokumentálás**: mindent leírunk (hőmérsékleti napló, áruátvételi lap, takarítási terv).',
          tip: 'Ami nincs leírva, az az ellenőr szemében meg sem történt. A hőmérsékleti naplót mindig pontosan, a valós értékekkel vezesd!',
          widget: { type: 'parositas', options: { title: 'Párosítsd a HACCP-elvet a példájával!', count: 6, pairs: [
            ['Veszélyelemzés', 'Végiggondolod: a nyers csirkén szalmonella lehet'],
            ['Kritikus pont (CCP)', 'A csirke átsütése a sütőben'],
            ['Kritikus határérték', 'Maghőmérséklet legalább 72 °C'],
            ['Felügyelet', 'Maghőmérővel megméred a legvastagabb részt'],
            ['Helyesbítő intézkedés', 'Nem elég meleg: visszateszed sütni'],
            ['Dokumentálás', 'Beírod a mért értéket a naplóba'],
            ['Igazolás', 'A vezető havonta átnézi a naplókat']
          ] } }
        },
        {
          title: 'Keresztszennyeződés',
          text: '**Keresztszennyeződés** az, amikor a kórokozó (vagy allergén) egy szennyezett élelmiszerről, felületről, eszközről vagy kézről átjut egy másik, tiszta ételre. A legveszélyesebb, ha **nyersről a kész, már nem hőkezelt** ételre jut, mert ott már semmi nem pusztítja el.\n\nTipikus hibák:\n\n- ugyanazon a deszkán vágod a nyers csirkét, majd a salátát,\n- a nyers húst a hűtőben a kész étel **fölé** teszed, és a leve rácsöpög,\n- nyers tojás után kézmosás nélkül nyúlsz a kész süteményhez,\n- ugyanazzal a ruhával törölsz mindent.\n\nVédekezés:\n\n- **Térbeli vagy időbeli elválasztás**: nyers és kész munkafolyamat külön helyen, vagy alapos takarítás közte.\n- **Színkódos vágódeszkák és kések**: egy gyakori rendszer: piros a nyers húshoz, kék a halhoz, sárga a baromfihoz vagy főtt húshoz, zöld a zöldséghez és gyümölcshöz, fehér a pékáruhoz és tejtermékhez. A munkahelyed saját rendjét kövesd.\n- A hűtőben **felül** a kész étel, **alul** a nyers hús és hal, lefedve.\n- Takarítás **két lépésben**: előbb tisztítás (zsír, szennyeződés le), utána fertőtlenítés.'
        },
        {
          title: 'Kézmosás és személyi higiénia',
          text: 'A kéz a leggyakoribb „szállítóeszköz” a kórokozók számára. A helyes kézmosás:\n\n1. Nedvesítsd be a kezed **folyó, meleg vízzel**.\n2. Használj **folyékony szappant**.\n3. Dörzsöld legalább **20–30 másodpercig**: tenyér, kézhát, ujjközök, hüvelykujj, köröm alatt (szükség esetén körömkefével), csukló.\n4. Öblítsd le alaposan.\n5. Töröld meg **egyszer használatos papírtörlővel**, és azzal zárd el a csapot (ha nem érintésmentes).\n6. Ha a munkahely előírja, utána kézfertőtlenítés.\n\nMikor kell kezet mosni? Munkakezdéskor, **WC-használat után**, nyers hús, hal, tojás, zöldség kezelése után, hulladék, pénz, telefon megérintése után, orrfújás, köhögés, dohányzás, evés után, és minden munkafolyamat-váltáskor.\n\nA személyi higiénia további szabályai:\n\n- tiszta, csak a konyhában viselt **munkaruha**, a hajat teljesen eltakaró **fejfedő**,\n- **nincs ékszer** (gyűrű, karóra, karkötő, fülbevaló, piercing), mert alatta megtelepednek a baktériumok, és bele is eshet az ételbe,\n- rövid, tiszta, **lakk nélküli köröm**, műköröm nem lehet,\n- a sebet **feltűnő színű (pl. kék), vízálló** sebtapasszal kell lefedni, fölé kesztyű,\n- a konyhában nem eszel, nem dohányzol, nem kóstolsz a fakanálról (kóstolókanál, egyszer használva).',
          tip: 'A kesztyű nem helyettesíti a kézmosást! A koszos kesztyű ugyanúgy szennyez, mint a koszos kéz. Kesztyűt is kell cserélni, ha más munkába kezdesz.'
        },
        {
          title: 'Egészségügyi alkalmasság',
          text: 'Élelmiszerrel csak az dolgozhat, aki egészségügyileg **alkalmas**. Ezt munkába lépés előtt foglalkozás-egészségügyi vizsgálat igazolja, és időszakosan ismételni kell.\n\nAzonnal **jelezned kell a vezetődnek**, és nem dolgozhatsz élelmiszerrel, ha:\n\n- **hasmenésed** vagy **hányásod** van (akár csak egyszer is),\n- lázas vagy, sárgaságod van,\n- **gennyes seb**, kelés, fertőzött bőrbetegség van a kezeden, karodon, arcodon,\n- a családodban fertőző hasmenéses megbetegedés van.\n\nA norovírus például rendkívül fertőző: néhány vírusrészecske is megbetegít valakit, és a tünetek elmúltával még napokig ürülhet. Ilyenkor a vezető és az orvos dönti el, mikor térhetsz vissza.',
          warn: 'Ne „told ki” a betegséget a konyhában! Egy beteg szakács egyetlen műszak alatt több tucat vendéget betegíthet meg. A betegség jelentése nem gyengeség, hanem kötelesség.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a CCP a HACCP-rendszerben?', options: ['Kritikus szabályozási pont', 'Központi konyhai pult', 'Cégvezetői ellenőrzési pont', 'Csomagolt cikkek polca'], answer: 0, explain: 'Olyan lépés, ahol a veszélyt meg lehet és meg kell szüntetni, pl. a hőkezelés.' },
        { q: 'Hol tárold a nyers húst a hűtőben?', options: ['Az alsó polcon, lefedve', 'A legfelső polcon', 'A kész ételek mellett, hogy könnyen elérd', 'Az ajtóban'], answer: 0, explain: 'Így a leve nem csöpöghet a kész ételre.' },
        { q: 'Mit kell tenned, ha reggel hasmenésed van?', options: ['Szólni a vezetőnek, és nem dolgozhatsz élelmiszerrel', 'Gyógyszert beveszel és dolgozol', 'Csak kesztyűben dolgozol', 'Nem szólsz, ha nem lázas'], answer: 0, explain: 'A hasmenés fertőző betegség jele lehet, ezért jelenteni kell.' }
      ]
    },
    {
      id: 'homerseklet',
      title: 'Hőmérsékletek és tárolás',
      level: 1, minutes: 14,
      summary: 'A veszélyes hőmérsékleti zóna, hűtés, fagyasztás, felolvasztás, maghőmérséklet, FIFO és címkézés.',
      tags: ['veszélyes zóna', 'hőmérséklet', 'hűtés', 'fagyasztás', 'felolvasztás', 'maghőmérséklet', 'maghőmérő', 'FIFO', 'FEFO', 'címkézés', 'hűtőlánc', 'ételminta', 'melegen tartás', 'újramelegítés'],
      sections: [
        {
          title: 'A veszélyes hőmérsékleti zóna',
          text: 'A baktériumok kb. **5 °C és 63 °C között** szaporodnak, a leggyorsabban **testhőmérséklet körül (kb. 37 °C)**. Kedvező körülmények között egyes fajok **20 percenként megkettőződnek**: egyetlen baktériumból 7 óra alatt több mint kétmillió lesz!\n\n- **5 °C alatt** (hűtés): a legtöbb baktérium szaporodása nagyon lelassul, de **nem pusztul el**.\n- **−18 °C alatt** (fagyasztás): a szaporodás megáll, de a baktériumok túlnyomó része **életben marad**, és felolvasztás után újra szaporodik.\n- **63 °C felett** (melegen tartás): a szaporodás megáll.\n- **72 °C felett a magban**: a legtöbb vegetatív (nem spórás) kórokozó elpusztul.\n\nA szabály tehát: az ételt **hidegen tartsd hidegen, melegen melegen**, és a köztes zónában a lehető **legrövidebb ideig** legyen.',
          warn: 'A főzés nem old meg mindent! Néhány baktérium (pl. Staphylococcus aureus, Bacillus cereus) olyan **mérget** termel, amelyet a forralás sem bont el. Ha az étel órákig a veszélyes zónában állt, utólag már nem tehető biztonságossá.'
        },
        {
          title: 'Hűtés, fagyasztás, felolvasztás',
          text: '**Hűtőtárolás**: a hűtött áru jellemzően **0–5 °C** között tárolandó (egyes termékeknél a gyártó ennél szigorúbbat ír elő, pl. darált hús, hal). A hűtőt ne tömd túl, mert a hideg levegőnek keringenie kell.\n\n**A főtt étel lehűtése** kritikus pont. A meleg ételt nem szabad sokáig a pulton hagyni, és nagy fazékban sem szabad a hűtőbe tenni (a közepe órákig langyos maradna). Helyette:\n\n- oszd szét **lapos, kisebb edényekbe**,\n- használj **sokkolót (gyorshűtőt)**, vagy hideg vizes, jeges fürdőt,\n- egy gyakran használt irányérték: a főtt étel kb. **90 percen belül 10 °C alá** hűljön, utána mehet a hűtőbe.\n\n**Fagyasztás**: −18 °C-on vagy alatta. A fagyasztásra szánt ételt előbb hűtsd le, csomagold légmentesen, és címkézd fel.\n\n**Felolvasztás**:\n\n- **hűtőben**, az alsó polcon, tálcán (ez a legbiztonságosabb, de időt igényel: tervezz előre),\n- hideg, **folyó** víz alatt, csomagolásban,\n- mikrohullámú sütőben, ha **azonnal** utána főzöd.\n\nSoha ne olvassz fel a pulton szobahőmérsékleten, és a felolvasztott nyersanyagot **ne fagyaszd vissza** (kivéve, ha közben átsütötted, és új ételként kezeled).'
        },
        {
          title: 'Maghőmérséklet és újramelegítés',
          text: 'A **maghőmérséklet** az étel legvastagabb, legbelső részének hőmérséklete. A felülete már barna és sistereg, a közepe még lehet nyers! Ezért **maghőmérővel** mérünk, a darab legvastagabb részébe szúrva (csontot nem érintve).\n\nÁltalános irányérték: a hőkezelés során a magban legalább **72 °C legalább 2 percig** (sok rendszer 75 °C-ot ír elő). A baromfit, a darált húst, a töltött ételeket, a tojásos ételeket mindig így kell átsütni.\n\n- A maghőmérőt minden használat után **tisztítsd és fertőtlenítsd**, különben ő maga viszi át a baktériumokat.\n- Időnként ellenőrizni kell a pontosságát (pl. jeges vízben kb. 0 °C-ot, forrásban lévő vízben kb. 100 °C-ot mutat-e).\n\n**Újramelegítés**: a már lehűtött ételt gyorsan, a magban legalább 72 °C-ra kell felmelegíteni, és **csak egyszer** szabad újramelegíteni. A melegen tartó pultban (pl. bain-marie) legalább **63 °C** legyen. A melegen tartó nem melegít fel: csak a már forró ételt tartja melegen.',
          widget: { type: 'idovonal', options: { steps: true, title: 'Egy csirkemell útja: tedd sorrendbe!', events: [
            { year: 1, label: '1. lépés', title: 'Áruátvétel', text: 'Megméred a hőmérsékletét (hűtött áru: legfeljebb kb. 5 °C), megnézed a csomagolást, a lejáratot, a címkét.' },
            { year: 2, label: '2. lépés', title: 'Hűtőtárolás', text: 'Alsó polc, lefedve, felcímkézve, 0–5 °C.' },
            { year: 3, label: '3. lépés', title: 'Előkészítés', text: 'Piros (vagy baromfis) deszkán, külön késsel, majd azonnal kézmosás és felülettakarítás.' },
            { year: 4, label: '4. lépés', title: 'Hőkezelés', text: 'Átsütés, a magban legalább 72 °C, maghőmérővel ellenőrizve.' },
            { year: 5, label: '5. lépés', title: 'Melegen tartás vagy gyorshűtés', text: 'Melegen tartás 63 °C felett, vagy gyorshűtés lapos edényben, sokkolóban.' },
            { year: 6, label: '6. lépés', title: 'Tálalás', text: 'Tiszta tányérra, tiszta eszközzel, a nyers alapanyagoktól elválasztva.' }
          ] } }
        },
        {
          title: 'FIFO, címkézés, ételminta',
          text: '**FIFO** (First In, First Out): ami először érkezett, azt használod fel először. Az új árut a régi **mögé** vagy **alá** pakolod. Ennek továbbfejlesztése a **FEFO** (First Expired, First Out): ami előbb jár le, az megy előbb.\n\nA csomagolt élelmiszereken kétféle dátum lehet:\n\n- **„Fogyasztható:”** (felhasználhatósági idő): romlandó termékeken. Ezen túl **tilos** felhasználni.\n- **„Minőségét megőrzi:”** (minőségmegőrzési idő): eddig garantálja a gyártó a minőséget. Lejárta után nem feltétlenül veszélyes, de a konyhában a belső szabály szerint kell eljárni vele.\n\nMinden saját készítésű vagy kibontott, tárolt élelmiszert **címkézni** kell: mi az, mikor készült (bontották), meddig használható fel, és ki készítette.\n\nA közétkeztetésben és sok vendéglátóhelyen **ételmintát** is el kell tenni: minden elkészített ételből egy adagot tiszta, zárt, felcímkézett edényben, hűtőben, általában **72 óráig** megőriznek. Ha valaki megbetegszik, ebből derül ki, mi volt a baj.',
          tip: 'A „majd megjegyzem” nem működik. Ha kibontasz egy doboz tejfölt, azonnal írd rá a dátumot. Egy forgalmas héten senki nem fog emlékezni, melyik mikor nyílt ki.'
        }
      ],
      quiz: [
        { q: 'Kb. melyik hőmérséklet-tartomány a veszélyes zóna?', options: ['5–63 °C', '−18–0 °C', '63–100 °C', '0–2 °C'], answer: 0, explain: 'Ebben a tartományban szaporodnak a baktériumok.' },
        { q: 'Mi a legbiztonságosabb módja a fagyasztott hús felolvasztásának?', options: ['Hűtőben, az alsó polcon', 'A pulton, szobahőmérsékleten', 'Meleg vízben áztatva egy éjszakán át', 'A radiátoron'], answer: 0, explain: 'A hűtőben a hús mindvégig 5 °C alatt marad.' },
        { q: 'Mit jelent a FIFO?', options: ['Ami először érkezett, az megy ki először', 'Ami utoljára jött, az megy ki először', 'Fagyasztott termékek külön polcon', 'Fertőtlenítés minden óra után'], answer: 0, explain: 'First In, First Out: a régebbi árut használod fel előbb.' }
      ]
    },
    {
      id: 'allergenek',
      title: 'Allergének',
      level: 1, minutes: 12,
      summary: 'Az EU 14 fő allergénje, a vendég tájékoztatása, a jelölés szabályai és a keresztérintkezés elkerülése.',
      tags: ['allergén', 'allergia', 'ételallergia', 'intolerancia', '14 allergén', 'glutén', 'laktóz', 'földimogyoró', 'diófélék', 'zeller', 'mustár', 'szezám', 'szulfit', 'csillagfürt', 'puhatestű', 'rákfélék', 'jelölés', 'keresztérintkezés', 'anafilaxia'],
      sections: [
        {
          title: 'Allergia vagy intolerancia?',
          text: 'Az **ételallergia** az immunrendszer téves reakciója egy ételfehérjére. Akár **nyomnyi mennyiség** (egy morzsa, egy közös kanál) is kiválthatja. A tünetek a viszketéstől és csalánkiütéstől a torok, nyelv duzzanatán és a nehézlégzésen át az életveszélyes **anafilaxiás sokkig** terjedhetnek, perceken belül.\n\nAz **intolerancia** (pl. laktózérzékenység) nem az immunrendszer reakciója, hanem pl. emésztőenzim hiánya. Kellemetlen (puffadás, hasfájás), de általában nem életveszélyes, és sokszor a mennyiségtől függ.\n\nA **cöliákia** (gluténérzékenység) autoimmun betegség: a glutén a bél nyálkahártyáját károsítja, ezért a cöliákiás vendégnek a nyomnyi glutén is árt.',
          warn: 'Ha a vendég allergiás reakció jeleit mutatja (nehézlégzés, duzzadó ajak vagy nyelv, ájulás), **azonnal hívd a 112-t**! Ha a vendégnél van adrenalin autoinjektor (pl. „toll”), segíts neki használni. Ne hagyd egyedül.'
        },
        {
          title: 'Az EU 14 fő allergénje',
          text: 'Az uniós szabályozás (az 1169/2011/EU rendelet) 14 allergént sorol fel, amelyekről a vendéget **minden esetben** tájékoztatni kell:\n\n1. **Glutént tartalmazó gabonafélék** (búza, rozs, árpa, zab, tönköly, kamut)\n2. **Rákfélék** (garnélarák, homár, rák)\n3. **Tojás**\n4. **Hal**\n5. **Földimogyoró**\n6. **Szójabab**\n7. **Tej** (a laktózt is beleértve)\n8. **Diófélék** (mandula, mogyoró, dió, kesudió, pekándió, brazil dió, pisztácia, makadámia)\n9. **Zeller**\n10. **Mustár**\n11. **Szezámmag**\n12. **Kén-dioxid és szulfitok** (10 mg/kg felett; pl. bor, szárított gyümölcs)\n13. **Csillagfürt** (lupin; egyes lisztekben, pékárukban)\n14. **Puhatestűek** (kagyló, osztriga, csiga, tintahal, polip)\n\nGyakori rejtett források: a **zeller** a levesalapban, ételízesítőben; a **tej és tojás** a panírban, mártásban, pékáruban; a **mustár** a salátaöntetben, majonézben; a **glutén** a habarásban, rántásban, sörben, szójaszószban; a **szója** a húskészítményekben.',
          widget: { type: 'parositas', options: { title: 'Melyik allergén rejtőzik benne?', count: 6, pairs: [
            ['Rántott hús panírja', 'Glutén és tojás'],
            ['Húsleves-alap, ételízesítő', 'Zeller'],
            ['Majonézes salátaöntet', 'Mustár és tojás'],
            ['Aszalt sárgabarack, bor', 'Kén-dioxid, szulfitok'],
            ['Tahini, hamburgerzsemle teteje', 'Szezámmag'],
            ['Pesto', 'Diófélék (és tej a sajtból)'],
            ['Szójaszósz', 'Szója és glutén'],
            ['Paella', 'Puhatestűek és rákfélék']
          ] } }
        },
        {
          title: 'Jelölés és tájékoztatás',
          text: '- **Előre csomagolt** élelmiszernél az allergént az összetevők listájában **kiemelve** (pl. félkövérrel) kell feltüntetni.\n- **Nem előre csomagolt** ételnél (étterem, büfé, cukrászda, menza) is kötelező a tájékoztatás. Ez lehet az étlapon (pl. számokkal vagy ikonokkal), külön allergéntáblázatban, vagy szóban, de az információnak **mindig rendelkezésre kell állnia, és pontosnak kell lennie**.\n- Ha a vendég kérdez, és nem tudod biztosan, **ne találgass**! Kérdezd meg a szakácsot vagy a vezetőt, nézd meg a receptet és a felhasznált termékek címkéjét.\n\nA receptkártyán ezért minden ételnél fel kell tüntetni az allergéneket. Ha egy beszállító más termékre cserél (pl. másik márkájú tejföl vagy fűszerkeverék), az allergénlistát **újra kell ellenőrizni**.',
          tip: 'Az, hogy „szerintem nincs benne”, a vendég életébe kerülhet. Mondd inkább: „Utánanézek, és azonnal visszajövök.”'
        },
        {
          title: 'Keresztérintkezés',
          text: 'Hiába allergénmentes a recept, ha a konyhában az étel érintkezik az allergénnel. Tipikus helyzetek:\n\n- ugyanabban az **olajban** sütöd a rántott (glutént, tojást tartalmazó) húst és a gluténmentes hasábburgonyát,\n- ugyanazzal a **kanállal** kevered a mogyorós és a mogyorómentes desszertet,\n- a deszkán, a késen, a **kezeden** ott marad a liszt vagy a dió,\n- a liszt porzik, és rászáll a környező ételekre.\n\nHa allergiás vendég rendel:\n\n1. Mosd meg a kezed, vegyél tiszta kötényt, tiszta eszközöket.\n2. **Tisztítsd meg** a munkafelületet (a fertőtlenítés nem távolítja el az allergént, csak az alapos tisztítás).\n3. Készítsd az ételt **elsőként vagy külön**, külön edényben, friss olajban.\n4. Jelöld meg a tányért, és a felszolgáló **külön vigye ki**, megnevezve a vendégnek.\n\nHa a keresztérintkezést nem tudod biztosan kizárni, ezt **őszintén mondd meg** a vendégnek.'
        }
      ],
      quiz: [
        { q: 'Hány fő allergénről kell az EU-ban kötelezően tájékoztatni?', options: ['14', '7', '10', '20'], answer: 0, explain: 'Az 1169/2011/EU rendelet 14 allergént sorol fel.' },
        { q: 'Melyik az EU 14 allergénje közül?', options: ['Zeller', 'Paradicsom', 'Burgonya', 'Rizs'], answer: 0, explain: 'A zeller gyakran rejtőzik levesalapban, ételízesítőben.' },
        { q: 'Megszünteti-e a fertőtlenítés az allergént a felületen?', options: ['Nem, alapos tisztítás kell', 'Igen, mindig', 'Csak a glutént', 'Csak forró vízzel igen'], answer: 0, explain: 'Az allergén fehérje, amit fizikailag el kell távolítani.' }
      ]
    },
    {
      id: 'technologia',
      title: 'Konyhatechnológia és receptszámítás',
      level: 2, minutes: 16,
      summary: 'Vágási módok, hőközlő eljárások (főzés, párolás, sütés, grillezés, buggyantás), mértékegységek, anyaghányad és kihozatal.',
      tags: ['konyhatechnológia', 'vágás', 'julienne', 'brunoise', 'főzés', 'párolás', 'gőzölés', 'sütés', 'pirítás', 'grillezés', 'buggyantás', 'blansírozás', 'mértékegység', 'receptszámítás', 'anyaghányad', 'normatíva', 'kihozatal', 'tisztítási veszteség', 'bruttó', 'nettó'],
      sections: [
        {
          title: 'Előkészítés és vágási módok',
          text: 'Az ételkészítés **előkészítő műveletekkel** kezdődik: válogatás, tisztítás, mosás, hámozás, darabolás, pácolás, panírozás. Az egyforma méretre vágott darabok **egyszerre puhulnak** meg, ezért a pontos vágás nem csak szépség, hanem minőség kérdése.\n\nGyakori vágási formák:\n\n- **Julienne**: vékony, gyufaszálszerű csíkok (kb. 2 × 2 × 40–50 mm).\n- **Brunoise**: apró kocka (kb. 2–3 mm), a julienne-ből vágják.\n- **Kocka** (kicsi, közepes, nagy): pl. 1 cm-es a pörkölthöz.\n- **Paysanne**: vékony, lapos, kb. 1 × 1 cm-es lapocskák (levesbe).\n- **Chiffonade**: vékony csíkokra vágott levél (bazsalikom, saláta).\n- **Karika, félhold, cikk, hasáb**.\n\nA kést mindig **karomfogással** vezetd: a másik kezed ujjhegyei behajlítva, a körmök felől érintkeznek a késsel, így a penge az ujjpercek mentén csúszik, nem vágja meg az ujjbegyet.'
        },
        {
          title: 'Hőközlő eljárások',
          text: '**Nedves hővel** (víz vagy gőz, legfeljebb kb. 100 °C):\n\n- **Főzés**: bő folyadékban, forrásponton (pl. tészta, burgonya, húsleves).\n- **Buggyantás**: gyöngyöző, **forráspont alatti** (kb. 70–90 °C-os) folyadékban, kíméletesen (pl. buggyantott tojás, hal, gyümölcs).\n- **Párolás**: kevés folyadékban vagy saját levében, **fedő alatt** (pl. párolt káposzta, rizs, párolt hús).\n- **Gőzölés**: gőzben, a folyadékkal nem érintkezve: jobban megőrzi a vitaminokat.\n- **Blansírozás (forrázás)**: rövid ideig forró vízben, utána azonnal jeges vízben lehűtve (pl. zöldség fagyasztás előtt, paradicsom hámozásához).\n\n**Száraz hővel vagy zsiradékkal** (100 °C felett, itt alakul ki a barna kéreg és a sült íz):\n\n- **Sütés serpenyőben** kevés zsiradékban (pirítás, hirtelensütés).\n- **Bő zsiradékban sütés** kb. 160–180 °C-on (rántott hús, hasábburgonya).\n- **Sütés sütőben** (pecsenye, tészták).\n- **Grillezés, roston sütés**: sugárzó hővel vagy forró rácson.\n\n**Vegyes eljárás**: a **párolás előtti pirítás** vagy a **dinsztelés**, a **pörköltkészítés**, a **barnítás utáni lassú párolás** (pl. marhapofa).',
          warn: 'A bő zsiradékban sütés olaja forróbb, mint a forrásban lévő víz, és könnyen lángra kap. Soha ne tégy bele vizes ételt (fröccsen), és ne melegítsd füstölésig.'
        },
        {
          title: 'Mértékegységek és receptszámítás',
          text: 'A konyhában a pontosság a minőség és a költség alapja. A legfontosabb átváltások:\n\n- `1 kg = 1000 g`, `1 dkg = 10 g`\n- `1 l = 10 dl = 100 cl = 1000 ml`\n- 1 evőkanál ≈ **15 ml**, 1 kávéskanál ≈ **5 ml** (ezek csak közelítések, a mérlegelés pontosabb)\n- vízre és sok folyadékra: `1 l ≈ 1 kg`, de az olaj könnyebb (kb. 0,92 kg/l), a méz nehezebb.\n\n**Receptszámítás (átszámítás más adagszámra)**: kiszámolod a **szorzót**, és minden hozzávalót megszorzol vele.\n\n`szorzó = kívánt adagszám / eredeti adagszám`\n\nPélda: a recept 4 adagra 600 g húst ír. 30 adaghoz a szorzó `30 / 4 = 7,5`, tehát `600 g · 7,5 = 4500 g = 4,5 kg` hús kell.\n\nVigyázz: a fűszereket, a sót és a sütési időt nagy adagnál nem mindig lehet egyszerűen felszorozni: kóstolj, és figyeld a maghőmérsékletet.',
          widget: { type: 'gyakorlas', options: { kind: 'mertekegyseg', title: 'Mértékegység-váltás gyakorló', help: 'A konyhában a kg–g, l–dl–ml váltás mindennapos. Például: 2,5 l = 25 dl = 2500 ml.' } }
        },
        {
          title: 'Anyaghányad, nettó és bruttó tömeg',
          text: 'Az **anyaghányad** (más néven anyagnorma) megadja, hogy egy ételhez, rendszerint **10 adagra**, milyen nyersanyagból mennyi kell. Ebből számolja a konyha a rendelést és az ételek önköltségét.\n\nA nyersanyag egy része a tisztításkor elvész (héj, csont, ín, mag). Ezért megkülönböztetjük:\n\n- **Bruttó tömeg**: amennyit megveszel, tisztítás előtt.\n- **Nettó tömeg**: amennyi tisztítás után felhasználható.\n- **Tisztítási veszteség (%)**: `veszteség % = (bruttó − nettó) / bruttó · 100`\n- **Kihozatal (%)**: a felhasználható rész aránya: `kihozatal % = nettó / bruttó · 100`\n\nPélda: a burgonya tisztítási vesztesége kb. 20%, a kihozatal tehát 80%. Ha **12 kg nettó** (hámozott) burgonya kell, a bruttó mennyiség `12 / 0,8 = 15 kg`.\n\nFigyelj: a 12 kg-hoz **nem** elég 20%-ot hozzáadni (az csak 14,4 kg lenne), mert a veszteség a **bruttó** tömegből számít!\n\nA **sütési veszteség** is hasonló: a hús sütés közben levet és zsírt veszít, súlya akár 20–35%-kal is csökkenhet.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás gyakorló', help: 'A tisztítási veszteség, a kihozatal és az árrés is százalékszámítás. Például: 40 kg burgonya 20%-a = 8 kg veszteség.' } }
        }
      ],
      quiz: [
        { q: 'Milyen hőmérsékletű folyadékban buggyantunk?', options: ['Forráspont alatt, kb. 70–90 °C', 'Erősen forrásban lévő vízben', 'Jeges vízben', '180 °C-os olajban'], answer: 0, explain: 'A buggyantás kíméletes, gyöngyöző folyadékban történik.' },
        { q: 'A recept 4 adagra 200 g lisztet ír. Mennyi kell 10 adaghoz?', options: ['500 g', '800 g', '2000 g', '400 g'], answer: 0, explain: 'Szorzó: 10 / 4 = 2,5, tehát 200 · 2,5 = 500 g.' },
        { q: 'Mi a bruttó tömeg?', options: ['A tisztítás előtti, megvásárolt tömeg', 'A tisztítás utáni tömeg', 'A sütés utáni tömeg', 'A csomagolás tömege'], answer: 0, explain: 'A nettó a tisztítás után felhasználható rész.' }
      ]
    },
    {
      id: 'munkavedelem',
      title: 'Konyhai munkavédelem',
      level: 1, minutes: 13,
      summary: 'Kések, égési sérülések, olajtűz, csúszás, konyhai gépek, tűzoltó takaró és elsősegély égésnél.',
      tags: ['munkavédelem', 'kés', 'vágás', 'égés', 'forrázás', 'olajtűz', 'zsírtűz', 'tűzoltó takaró', 'F osztályú tűzoltó készülék', 'csúszás', 'szeletelőgép', 'húsdaráló', 'elsősegély', 'tisztítószer'],
      sections: [
        {
          title: 'Kések biztonságosan',
          text: '- Az **éles kés biztonságosabb**, mint a tompa: a tompa kés megcsúszik, és nagyobb erővel kell nyomni.\n- A vágódeszka alá tegyél **nedves ruhát vagy csúszásgátló alátétet**, hogy ne mozduljon el.\n- Vágj **karomfogással**, a penge éle mindig a deszka felé, ne a kezed felé nézzen.\n- A kést **hegyével lefelé**, a tested mellett vidd, és szólj: „Kés!”, „Mögötted!”.\n- **Leeső kést soha ne próbálj elkapni**! Lépj hátra.\n- Kést ne hagyj a mosogatóvízben, ahol nem látszik: más belenyúlhat.\n- A kést a helyére tedd (késtartó, mágnescsík), ne a pult szélére, ne kendő alá.',
          warn: 'Mély vágásnál nyomd rá a sebre a tiszta kötszert, emeld fel a sérült végtagot, és kérj segítséget. Erős vérzésnél, mély vagy nagy sebnél hívd a 112-t.'
        },
        {
          title: 'Égés, forrázás, olajtűz',
          text: 'A konyhában minden forró: sütő, platni, edények fogója, gőz, olaj. Alapszabályok:\n\n- az edények **nyelét befelé** fordítsd, ne lógjon ki a tűzhely szélén,\n- forró edényt **száraz** fogókesztyűvel vagy ruhával fogj (a nedves ruhán átmegy a hő, gőzt fejleszt),\n- a fedőt **magadtól elfelé** emeld fel, hogy a gőz ne az arcodba csapjon,\n- forró folyadékot szólj: „Forró, mögötted!”.\n\n**Olajtűz (zsírtűz)**: ha a serpenyőben vagy a fritőzben meggyullad az olaj:\n\n1. **Kapcsold le** a hőforrást (gáz, villany), ha biztonságosan eléred.\n2. Takard le **fedővel**, tepsivel, vagy **tűzoltó takaróval**, így elzárod a levegőt.\n3. Hagyd letakarva, **ne mozdítsd** el az edényt, és ne nézz be, amíg ki nem hűlt.\n4. Ipari fritőznél használd az **F osztályú** (étolaj- és zsírtüzekhez való) tűzoltó készüléket.\n5. Ha a tűz terjed, hagyd el a helyiséget, és hívd a **112**-t.',
          warn: '**Olajtüzet SOHA ne olts vízzel!** A forró olajba kerülő víz egy pillanat alatt gőzzé válik (kb. 1700-szoros térfogatra tágul), és a lángoló olajat robbanásszerűen szétszórja: hatalmas tűzgömb csap fel, súlyos égési sérülést okozva. A lángoló edényt ne vidd ki, és ne tedd a mosogatóba sem!'
        },
        {
          title: 'A tűzoltó takaró használata',
          text: 'A tűzoltó takaró üvegszálas, nem éghető anyag, falra szerelt tartóban, a tűzhely közelében (de nem közvetlenül felette) van.\n\n1. Húzd ki a takarót a két szalagnál fogva.\n2. Csavard a kezed a takaró **felső sarkaiba**, hogy védje a kezed.\n3. Tartsd magad elé **pajzsként**, és **magadtól elfelé** terítsd rá az égő edényre.\n4. Kapcsold le a hőforrást, és hagyd rajta legalább 15–30 percig, amíg teljesen kihűl.\n\nHa valakinek **meggyullad a ruhája**: „Állj meg, feküdj le, gurulj!”, vagy csavard be a takaróba (fej felől lefelé), hogy elfojtsd a lángot.'
        },
        {
          title: 'Elsősegély égésnél',
          text: '1. **Hűtsd** az égett felületet **hűvös (nem jeges), folyó vízzel kb. 20 percig**. Ez csökkenti a fájdalmat és a mélyebb szövetek károsodását.\n2. Vedd le a gyűrűt, órát, karkötőt, mielőtt a terület megdagad. A bőrhöz **odaragadt** ruhát ne tépd le.\n3. Fedd le **steril, nem bolyhos** kötéssel vagy tiszta folpackkal (lazán).\n4. **Ne** kenj rá vajat, olajat, tejfölt, krémet, fogkrémet! Ezek bent tartják a hőt és fertőzhetnek.\n5. A **hólyagot ne szúrd ki**.\n\nAzonnal orvoshoz (vagy **112**), ha: nagy kiterjedésű (nagyobb, mint a sérült tenyere), mély, fehér vagy szenesedett az égés, ha az arcot, kezet, nemi szervet, ízületet érinti, ha gyermek vagy idős ember sérült, illetve vegyszeres vagy áramütéses égésnél.'
        },
        {
          title: 'Csúszás, gépek, vegyszerek',
          text: '**Csúszás, esés**: a konyhai balesetek egyik leggyakoribb oka.\n\n- A kiömlött folyadékot, zsírt, ételmaradékot **azonnal** töröld fel, és tedd ki a „Csúszásveszély” táblát, amíg a padló nedves.\n- Viselj **zárt, csúszásgátló talpú** munkavédelmi cipőt (papucs, klumpa nyitott sarokkal nem jó).\n- Ne szaladj, és ne vigyél akkora terhet, ami mögül nem látsz.\n\n**Gépek** (szeletelőgép, húsdaráló, robotgép, botmixer):\n\n- csak az használja, akit **betanítottak**,\n- a **védőburkolatot** soha ne szereld le, a szeletelőnél használd az anyagtolót,\n- a húsdarálóba **tömőfával**, ne kézzel nyomd az anyagot,\n- tisztítás, szétszerelés előtt **kapcsold ki és húzd ki** a gépet a konnektorból,\n- laza ruha, hosszú haj, ékszer beakadhat.\n\n**Tisztítószerek**: mindig az eredeti, felcímkézett edényben tárold, az élelmiszertől elkülönítve. A biztonsági adatlap szerint használd (kesztyű, szemüveg). **Soha ne keverd** őket: pl. a klóros (hipós) szer savas vízkőoldóval keverve **mérgező klórgázt** fejleszt.'
        }
      ],
      quiz: [
        { q: 'Meggyulladt az olaj a serpenyőben. Mit NEM szabad tenni?', options: ['Vizet önteni rá', 'Lekapcsolni a hőforrást', 'Fedővel letakarni', 'Tűzoltó takarót teríteni rá'], answer: 0, explain: 'A víz gőzzé válik, és a lángoló olajat szétszórja: tűzgömb keletkezik.' },
        { q: 'Mennyi ideig hűtsd folyó vízzel az égett bőrfelületet?', options: ['Kb. 20 percig', 'Kb. 10 másodpercig', 'Egyáltalán nem kell hűteni', 'Jégkockát kell rátenni 1 órára'], answer: 0, explain: 'A hűvös, nem jeges folyóvíz kb. 20 percig hűtsön.' },
        { q: 'Leesik a kés a pultról. Mit teszel?', options: ['Hátralépek, és hagyom leesni', 'Utánakapok', 'A lábammal megpróbálom elkapni', 'Elugrok, és a kezemmel tompítom'], answer: 0, explain: 'A leeső kést soha nem szabad elkapni.' }
      ]
    },
    {
      id: 'felszolgalas',
      title: 'Vendéglátás és felszolgálás alapjai',
      level: 1, minutes: 13,
      summary: 'A teríték, az ételsor, a vendég kiszolgálásának menete, a kommunikáció és az árképzés alapjai.',
      tags: ['vendéglátás', 'felszolgálás', 'pincér', 'teríték', 'ételsor', 'menü', 'vendég', 'kommunikáció', 'panaszkezelés', 'árképzés', 'önköltség', 'anyagköltség', 'árrés', 'food cost', 'áfa'],
      sections: [
        {
          title: 'Az alapteríték',
          text: 'A teríték rendje logikus: **kívülről befelé** haladva használjuk az evőeszközöket, az első fogáshoz valók vannak legkívül.\n\n- **Villa(k)**: a tányértól **balra**.\n- **Kés(ek)**: a tányértól **jobbra**, **éllel a tányér felé**.\n- **Leveseskanál**: a késtől jobbra.\n- **Desszert evőeszköz**: a tányér fölött, vízszintesen (a kanál nyele jobbra, a villa nyele balra mutat).\n- **Poharak**: jobbra fent, a kés hegye fölött (a vizes pohár és a borospohár).\n- **Kenyértányér**: balra fent, a villák fölött, rajta a vajazókés.\n- **Szalvéta**: a tányéron vagy a villák mellett.\n\nAz evőeszközök alja a tányér aljával és egymással egy vonalban, kb. 1–2 cm-re az asztal szélétől legyen. Az evőeszközt mindig a **nyelénél** fogod, a poharat a **talpánál vagy a szárnál**, a tányért a **peremnél**, sosem a vendég elé kerülő felületnél.'
        },
        {
          title: 'Az ételsor (menüsor)',
          text: 'A klasszikus ételsor könnyűtől a nehéz felé, majd ismét a könnyebb felé halad:\n\n1. **Hideg előétel** (pl. sonkatekercs, saláta)\n2. **Leves**\n3. **Meleg előétel** (pl. rántott gomba, rizottó)\n4. **Főétel** (hal, majd hús, köretekkel, salátával)\n5. **Sajt**\n6. **Desszert** (édesség, gyümölcs)\n7. **Kávé**, esetleg digestif\n\nA mindennapi magyar menü egyszerűbb: **leves, főétel, desszert**. Egy jó menüben nem ismétlődik a fő alapanyag (ne legyen gombaleves után gombás hús), változatos a szín, az állag és az elkészítési mód.'
        },
        {
          title: 'A vendég kiszolgálása',
          text: 'A kiszolgálás menete:\n\n1. **Fogadás**: köszönj, mosolyogj, kísérd az asztalhoz.\n2. **Étlap, itallap** átadása, közben **kérdezd meg az ételallergiát, érzékenységet**.\n3. **Rendelésfelvétel**: ismételd vissza a rendelést. Ajánlani is lehet, de ne erőltesd.\n4. **Felszolgálás**: egy gyakori szabály szerint a **tányérra tálalt** ételt és az italt a vendég **jobb oldaláról** szolgálod fel és szeded le, a **tálból** kínálást pedig a **bal oldaláról** végzed. Az adott hely belső rendje ettől eltérhet.\n5. **Érdeklődés**: az első falatok után kérdezd meg, minden rendben van-e.\n6. **Leszedés**: amikor mindenki végzett az asztalnál (az evőeszközök a tányéron párhuzamosan, „négy óra” felé mutatnak).\n7. **Számla**: pontosan, kérésre, átláthatóan. **Búcsúzás**.\n\n**Kommunikáció**: figyelj a vendégre, tartsd a szemkontaktust, beszélj érthetően és udvariasan. Ha panasz van: **hallgasd végig**, ne vágj közbe, **ne vitatkozz**, kérj elnézést a kellemetlenségért, ajánlj megoldást (új étel, csere), és szólj a vezetőnek. A jól kezelt panaszból hűséges vendég lehet.',
          tip: 'A konyha és a terem közti kommunikáció is a csapatmunka része. A rendelést pontosan add le (asztalszám, adagszám, különleges kérés, allergia), és a kész ételt azonnal vidd ki: a langyosodó étel minőséget és biztonságot is veszít.'
        },
        {
          title: 'Költségszámítás és árképzés alapjai',
          text: 'Egy étel ára nem „hasraütésre” születik. Az alapja az **anyagköltség** (nyersanyagköltség): a recept összes hozzávalójának bruttó (tisztítás előtti) mennyisége szorozva a beszerzési árral, egy adagra elosztva.\n\nAz eladási árnak fedeznie kell a **rezsit** is (bérek, energia, bérleti díj, eszközök), és **nyereséget** kell termelnie. A vendéglátásban ezért gyakran az **anyaghányad-százalékkal** (angolul food cost %) számolnak:\n\n`anyaghányad % = anyagköltség / nettó eladási ár · 100`\n\nSok étterem kb. **25–35%**-os anyaghányaddal tervez. Ebből a nettó ár:\n\n`nettó eladási ár = anyagköltség / anyaghányad`\n\nPélda: egy adag anyagköltsége **1200 Ft**, a cél 30%. Nettó ár: `1200 / 0,30 = 4000 Ft`. Ehhez jön még az **áfa**, amelynek kulcsa a termék fajtájától (étel, alkoholos ital stb.) függ: mindig az aktuálisan érvényes szabályt kell alkalmazni.\n\nAz **árrés** az eladási ár és az anyagköltség különbsége: itt `4000 − 1200 = 2800 Ft`. Ebből kell kifizetni minden más költséget.',
          tip: 'A pontos adagolás pénz! Ha egy 150 g-os húsadag helyett rendszeresen 180 g-ot tálalsz, az 20%-kal több nyersanyag, ami egy év alatt komoly összeg.'
        }
      ],
      quiz: [
        { q: 'Hova kerül a kés az alapterítéknél?', options: ['A tányértól jobbra, éllel a tányér felé', 'A tányértól balra', 'A tányér fölé', 'A tányértól jobbra, éllel kifelé'], answer: 0, explain: 'A kés jobbra kerül, éle a tányér felé néz.' },
        { q: 'Az anyagköltség 900 Ft, a cél anyaghányad 30%. Mennyi a nettó eladási ár?', options: ['3000 Ft', '1170 Ft', '2700 Ft', '270 Ft'], answer: 0, explain: '900 / 0,30 = 3000 Ft.' },
        { q: 'Mit tegyél, ha a vendég panaszt tesz?', options: ['Végighallgatod, elnézést kérsz, megoldást ajánlasz', 'Elmagyarázod, hogy nincs igaza', 'Nem reagálsz, majd elmúlik', 'Azonnal felszámolod a számlát'], answer: 0, explain: 'A panaszt nyugodtan, vitatkozás nélkül kell kezelni.' }
      ]
    }
  ]
});

/* Hibakereső döntési fák (formátum: js/hibakereses.js fejléce) */
STUDIE.addTrouble({
  id: 'szakacs-etelmergezes',
  title: 'Ételmérgezés gyanúja: mi ment félre?',
  lessons: ['szakacs/homerseklet', 'szakacs/higienia'],
  intro: 'Több vendég vagy munkatárs rosszul lett egy étkezés után? Az első lépés mindig a **vendégek biztonsága**: súlyos tüneteknél (kiszáradás, véres széklet, magas láz, zavartság, nehézlégzés) **hívd a 112-t**. Ételmérgezés gyanúját **jelenteni kell** a vezetőnek, aki értesíti a hatóságot. A gyanús ételt és az **ételmintát ne dobd ki**! A fa segít végiggondolni, hol sérülhetett a hűtési lánc vagy a higiénia, de a pontos okot a hatósági vizsgálat dönti el.',
  start: 'tunet',
  nodes: {
    tunet: { q: 'Mikor jelentkeztek a tünetek az étkezés után?', check: 'Kérdezd meg (vagy a vezető kérdezze meg) az érintetteket: mikor ettek, mit ettek, mikor lett rosszul. Az ételmintát és a maradékot tedd félre, címkézd fel.', answers: [
      { t: 'Már 1–6 órán belül, erős hányással', next: 'gyors' },
      { t: '12–72 órával később, hasmenéssel, lázzal', next: 'lassu' },
      { t: 'Perceken belül: viszketés, duzzanat, nehézlégzés', next: 'r_allergia' }] },
    gyors: { q: 'Az étel elkészítés után hosszabb ideig (több órán át) langyosan, szobahőmérsékleten állt?', check: 'Nézd meg a hőmérsékleti naplót, és kérdezd meg a kollégákat: mikor készült, mikor tálalták, hol állt közben (pult, melegen tartó, hűtő)?', answers: [
      { t: 'Igen, pl. a rizs vagy a köret órákig a pulton hűlt', next: 'r_toxin' },
      { t: 'Kézzel sokat formázott, nem hőkezelt étel volt (pl. szendvics, krémes)', next: 'r_staph' },
      { t: 'Nem, mindvégig rendesen hűtve vagy melegen tartva volt', next: 'tisztito' }] },
    tisztito: { q: 'Lehetséges, hogy tisztítószer vagy más vegyszer került az ételbe vagy az edénybe?', check: 'Nézd meg: nincs-e átöntött, címkézetlen vegyszer, nem maradt-e öblítetlen edény, nem tároltak-e vegyszert élelmiszer közelében.', answers: [
      { t: 'Igen, ez nem zárható ki', next: 'r_vegyszer' },
      { t: 'Nem, ez kizárható', next: 'lassu' }] },
    lassu: { q: 'Volt az ételek között baromfi, darált hús, tojásos étel vagy töltött étel?', answers: [
      { t: 'Igen', next: 'maghom' },
      { t: 'Nem, de volt nyers saláta, gyümölcs, hidegtál', next: 'kereszt' }] },
    maghom: { q: 'Megmérték és dokumentálták a maghőmérsékletet hőkezeléskor?', check: 'Nézd meg a hőkezelési naplót: van-e beírt érték (legalább 72 °C)? Működik-e, és pontos-e a maghőmérő (jeges vízben kb. 0 °C)?', answers: [
      { t: 'Nem mérték, vagy 72 °C alatti érték szerepel', next: 'r_athevites' },
      { t: 'Igen, a mag legalább 72 °C volt', next: 'hutes' }] },
    hutes: { q: 'Az étel előre elkészült, és lehűtés, majd újramelegítés után tálalták?', answers: [
      { t: 'Igen, nagy fazékban hűlt le a pulton vagy a hűtőben', next: 'r_lassu_hutes' },
      { t: 'Igen, és csak langyosra melegítették, vagy többször is', next: 'r_ujramelegites' },
      { t: 'Nem, frissen készült és azonnal tálalták', next: 'kereszt' }] },
    kereszt: { q: 'Előfordulhatott, hogy nyers húsról, tojásról vagy szennyezett felületről átjutott a kórokozó a kész ételre?', check: 'Gondold végig: ugyanaz a deszka, kés, ruha? Nyers hús a kész étel fölött a hűtőben? Kézmosás nyers tojás után?', answers: [
      { t: 'Igen, ez megtörténhetett', next: 'r_kereszt' },
      { t: 'Nem valószínű', next: 'beteg' }] },
    beteg: { q: 'Volt a konyhán dolgozó, aki a napokban beteg volt (hasmenés, hányás), vagy a családjában van ilyen?', answers: [
      { t: 'Igen, vagy nem tudjuk', next: 'r_beteg_dolgozo' },
      { t: 'Nem', next: 'aru' }] },
    aru: { q: 'Rendben volt az áruátvétel és a hűtőlánc (hőmérséklet, lejárat, hűtők naplója)?', check: 'Nézd meg az áruátvételi lapokat és a hűtők hőmérsékleti naplóját. Volt-e áramszünet, hűtőhiba, túltöltött hűtő?', answers: [
      { t: 'A hűtő a naplóban 5 °C fölött volt, vagy volt áramszünet', next: 'r_huto' },
      { t: 'Lejárt vagy rosszul átvett áru került felhasználásra', next: 'r_aru' },
      { t: 'Minden rendben volt', next: 'r_ismeretlen' }] },
    r_allergia: { result: 'Valószínűleg allergiás reakció, nem ételmérgezés', fix: 'A perceken belül jelentkező viszketés, duzzanat, nehézlégzés allergiára utal. **Azonnal hívd a 112-t**, és ha van, segíts az adrenalin autoinjektor használatában.\n\nUtána nézd végig: tudott-e a konyha az allergiáról, pontos volt-e az allergéninformáció, lehetett-e keresztérintkezés (közös olaj, kanál, deszka)? Lásd az **Allergének** leckét.', level: 'bad' },
    r_toxin: { result: 'Baktériummérgek a veszélyes zónában tartott ételben (pl. Bacillus cereus a rizsben)', fix: 'A főtt rizs, tészta, köret a pulton lassan hűlve ideális táptalaj. Egyes baktériumok spórái túlélik a főzést, a hűlés alatt kicsíráznak, és **hőálló mérget** termelnek, amit az újramelegítés sem bont el.\n\n- A főtt ételt lapos edényben, **sokkolóval** vagy jeges vízfürdővel hűtsd gyorsan (kb. 90 percen belül 10 °C alá).\n- A melegen tartott étel legalább **63 °C** legyen.\n- Ami órákig a veszélyes zónában állt, azt **ki kell dobni**.', level: 'bad' },
    r_staph: { result: 'Kézről származó szennyeződés (pl. Staphylococcus aureus)', fix: 'Ez a baktérium gyakran az ember bőrén, orrában, gennyes sebében él, és az ételben **hőálló mérget** termel. A kézzel sokat érintett, utólag nem hőkezelt étel (szendvics, krémes, hidegtál) különösen veszélyes.\n\n- Alapos **kézmosás**, sebek vízálló kék tapasszal és kesztyűvel fedve.\n- Gennyes seb, kelés esetén nem dolgozhatsz nyitott élelmiszerrel.\n- Az ilyen ételeket **hűtve** készítsd és tárold, és minél rövidebb ideig legyenek szobahőmérsékleten.', level: 'bad' },
    r_vegyszer: { result: 'Vegyszeres szennyeződés gyanúja', fix: 'Kémiai mérgezés gyanújánál **azonnal hívd a 112-t**, és ha tudod, mondd meg, milyen vegyszerről lehet szó (a biztonsági adatlapot add át). A vegyszert mindig az eredeti, felcímkézett edényben, az élelmiszertől elkülönítve tárold, és soha ne önts át üdítős vagy ételes edénybe. Mosogatás után alaposan öblíts.', level: 'bad' },
    r_athevites: { result: 'Nem megfelelő átsütés (alacsony maghőmérséklet)', fix: 'A baromfi, a darált hús és a tojásos étel belsejében túlélhetnek a kórokozók (pl. szalmonella, Campylobacter), ha a mag nem éri el a szükséges hőmérsékletet.\n\n- Minden adagnál, vagy legalább tételenként mérj **maghőmérővel**, a legvastagabb részen: **legalább 72 °C**.\n- **Írd be** a naplóba.\n- Ellenőrizd a maghőmérő pontosságát, és fertőtlenítsd minden használat után.', level: 'bad' },
    r_lassu_hutes: { result: 'Túl lassú lehűtés', fix: 'A nagy fazék közepe órákig a veszélyes zónában marad, még a hűtőben is (közben a hűtő többi ételét is felmelegíti).\n\n- Oszd szét az ételt **lapos, kisebb edényekbe**.\n- Használj **sokkolót**, vagy hűtsd jeges vízfürdőben, kevergetve.\n- Irányérték: kb. **90 percen belül 10 °C alá**, utána hűtőbe, lefedve, felcímkézve.', level: 'bad' },
    r_ujramelegites: { result: 'Nem megfelelő újramelegítés', fix: 'Az újramelegítésnél a magnak is el kell érnie **legalább 72 °C**-ot, és az ételt **csak egyszer** szabad újramelegíteni. A melegen tartó pult nem melegít fel, csak a már forró ételt tartja 63 °C felett.', level: 'bad' },
    r_kereszt: { result: 'Keresztszennyeződés', fix: 'A nyers húsról, tojásról, földes zöldségről a kórokozó a kész ételre jutott.\n\n- **Színkódos** deszkák és kések, nyers és kész munkafolyamat elválasztása.\n- A hűtőben felül a kész, alul a nyers étel, lefedve.\n- **Kézmosás** minden munkafolyamat-váltáskor.\n- Tisztítás, majd fertőtlenítés, rendszeresen cserélt törlőruhák.', level: 'bad' },
    r_beteg_dolgozo: { result: 'Beteg dolgozótól származó fertőzés (pl. norovírus)', fix: 'A norovírus rendkívül fertőző: kis mennyiség is megbetegít, és a tünetek elmúlta után is napokig ürülhet.\n\n- Hasmenéses, hányós dolgozó **nem dolgozhat** élelmiszerrel, amíg az orvos és a vezető nem engedi.\n- A mosdót, kilincseket, csaptelepeket alaposan takarítsd és fertőtlenítsd (a norovírus ellen hatásos szerrel).\n- Szigorú kézmosás mindenkinek.', level: 'bad' },
    r_huto: { result: 'Megszakadt a hűtési lánc', fix: 'Ha a hűtő hőmérséklete tartósan 5 °C fölé emelkedett, a benne lévő romlandó áru biztonsága nem garantálható.\n\n- A hűtőket naponta (műszakonként) olvasd le, és **írd be** a naplóba.\n- Eltérésnél: értesítsd a vezetőt, az árut a helyesbítő intézkedés szerint (áthelyezés, selejtezés) kezeld, a hűtőt **szakemberrel** javíttasd.\n- Ne töltsd túl a hűtőt, ne tegyél bele meleg ételt, és ne hagyd nyitva az ajtaját.', level: 'warn', pro: true },
    r_aru: { result: 'Nem megfelelő nyersanyag vagy áruátvétel', fix: 'Áruátvételnél ellenőrizd: hőmérséklet (hűtött áru kb. 5 °C alatt, fagyasztott −18 °C körül vagy alatta), sérülésmentes csomagolás, lejárati idő, címke, származás. A nem megfelelő árut **ne vedd át**. Tárolásnál tartsd a **FIFO/FEFO** elvet, és a „Fogyasztható:” dátumon túli terméket soha ne használd fel.', level: 'warn' },
    r_ismeretlen: { result: 'Az ok nem állapítható meg egyértelműen', fix: 'Ilyenkor különösen fontos a **hatósági vizsgálat**: az ételminták és a maradékok laborvizsgálata derítheti ki az okot. Működj együtt az ellenőrökkel, add át a naplókat, és a vezetővel közösen nézzétek át a HACCP-rendszer minden pontját.', level: 'warn', pro: true }
  }
});

STUDIE.addTrouble({
  id: 'szakacs-sutes',
  title: 'Odaégett kívül, nyers maradt belül',
  lessons: ['szakacs/technologia'],
  intro: 'A hús, a rántott étel vagy a sütemény kívül túl sötét lett, belül viszont nyers vagy ragacsos? Vagy épp fordítva: sápadt és kiszáradt? Haladj végig a kérdéseken! A maghőmérsékletet mindig **maghőmérővel** ellenőrizd, és a nyers belsejű baromfit, darált húst **soha ne tálald**.',
  start: 'mi',
  nodes: {
    mi: { q: 'Mit sütöttél, és hogyan?', answers: [
      { t: 'Bő olajban (rántott hús, hasábburgonya, fánk)', next: 'olaj' },
      { t: 'Serpenyőben (hússzelet, csirkemell)', next: 'vastag' },
      { t: 'Sütőben (sült hús, egész csirke, sütemény)', next: 'suto' }] },
    olaj: { q: 'Milyen volt az olaj hőmérséklete és állapota?', check: 'Mérd meg hőmérővel (vagy nézd meg a fritőz termosztátját). A szokásos érték kb. 160–180 °C. Nézd meg az olaj színét és szagát is.', answers: [
      { t: 'Füstölt, vagy 190 °C fölött volt', next: 'r_olaj_forro' },
      { t: 'Sötét, sűrű, kesernyés szagú, régi olaj', next: 'r_olaj_regi' },
      { t: 'Rendben volt, de a darabok vastagok', next: 'r_vastag_olaj' },
      { t: 'Túl hideg volt, az étel sápadt és zsíros lett', next: 'r_olaj_hideg' }] },
    vastag: { q: 'Milyen vastag volt a hús, és hogyan sütötted?', check: 'Mérd meg a szelet vastagságát. Egyforma vastag volt? Közvetlenül a hűtőből tetted a serpenyőbe?', answers: [
      { t: 'Vastag (2–3 cm feletti), végig nagy lángon sütöttem', next: 'r_vastag_seprenyo' },
      { t: 'Egyenetlen vastagságú volt (pl. csirkemell vastag vége)', next: 'r_egyenetlen' },
      { t: 'Vékony, mégis odaégett, és a serpenyő füstölt', next: 'r_serpenyo' }] },
    suto: { q: 'Mit tapasztaltál a sütőben?', check: 'Tegyél egy sütőhőmérőt a sütő közepébe, és hasonlítsd össze a beállított értékkel.', answers: [
      { t: 'A sütő melegebb, mint amit beállítottam', next: 'r_suto_termosztat' },
      { t: 'Felül megégett, alul nyers (vagy fordítva)', next: 'r_suto_polc' },
      { t: 'A sütemény teteje megrepedt, sötét, a közepe ragacsos', next: 'r_sutemeny' },
      { t: 'Az egész csirke kívül kész, a combtőnél véres', next: 'r_csirke' }] },
    r_olaj_forro: { result: 'Túl forró az olaj', fix: 'A külseje megég, mielőtt a hő a belsejébe jutna. Állítsd **kb. 160–180 °C**-ra (vastagabb darabnál az alsó értékre). Az olajat soha ne melegítsd füstölésig: ott már bomlik, káros anyagok keletkeznek, és **lángra kaphat**. Ha mégis meggyullad: hőforrás le, fedő vagy tűzoltó takaró, **soha ne víz**!', level: 'warn' },
    r_olaj_regi: { result: 'Elhasznált, régi olaj', fix: 'A sokszor használt olaj sötétebb, alacsonyabb hőmérsékleten füstöl, gyorsabban barnítja az ételt, és rossz ízt ad. **Szűrd** rendszeresen, és cseréld a belső szabály szerint (szín, szag, habzás, füstölés alapján). A fáradt olajat külön gyűjtőbe öntsd, soha ne a lefolyóba.', level: 'ok' },
    r_vastag_olaj: { result: 'Túl vastag darabok', fix: 'A vastag darab belseje nem melegszik át, mire a külseje kész. Vágd vékonyabbra, **klopfold ki egyenletesre** a húst, vagy süsd előbb alacsonyabb hőmérsékleten, majd a végén pirítsd meg (a hasábburgonyát két lépésben: kb. 140–150 °C-on előfőzni, majd kb. 175–180 °C-on pirosra sütni). Mindig mérd a maghőmérsékletet.', level: 'ok' },
    r_olaj_hideg: { result: 'Túl hideg olaj', fix: 'A hideg olajban az étel lassan sül, megszívja magát zsírral, és sápadt marad. Várd meg, amíg az olaj eléri a hőmérsékletet, és **ne tegyél bele egyszerre túl sokat**, mert lehűti. Kis adagokban süss.', level: 'ok' },
    r_vastag_seprenyo: { result: 'Vastag hús, túl nagy lángon', fix: 'A vastag húst előbb **erős lángon** kérgesítsd mindkét oldalán, aztán **mérsékelt hőn** vagy **sütőben** (pl. 160–180 °C) süsd tovább, amíg a mag eléri a kívánt értéket (baromfinál legalább 72 °C). A hús ne közvetlenül a hűtőből kerüljön a serpenyőbe, de ne is álljon órákig a pulton: pár perc elég.', level: 'ok' },
    r_egyenetlen: { result: 'Egyenetlen vastagság', fix: 'A vékony rész kiszárad, a vastag rész nyers marad. **Klopfold** egyenletes vastagságúra (fólia között), vagy **pillangó**-módon vágd fel a vastag részt. Maghőmérővel mindig a **legvastagabb** részt mérd.', level: 'ok' },
    r_serpenyo: { result: 'Túlhevített serpenyő, rossz zsiradék', fix: 'A vaj és a hidegen sajtolt olaj alacsony hőmérsékleten megég. Hirtelensütéshez **magas füstpontú** olajat használj (pl. finomított napraforgó-, repce- vagy földimogyoró-olaj; az utóbbi allergén!), a vajat csak a végén tedd hozzá. A serpenyőt ne hevítsd üresen füstölésig.', level: 'ok' },
    r_suto_termosztat: { result: 'Pontatlan sütőtermosztát', fix: 'Ha a sütő a beállítottnál lényegesen melegebb (vagy hidegebb), a termosztát vagy a hőérzékelő hibás. Addig is sütőhőmérővel dolgozz, és állítsd korrigálva. A javítást **szakember** végezze (villamos vagy gázkészülék!).', level: 'warn', pro: true },
    r_suto_polc: { result: 'Rossz sütőfokozat vagy polcmagasság', fix: 'Felülről égőnél tedd **lejjebb** a tepsit, vagy takard le alufóliával. Alul égőnél tedd **feljebb**, vagy tegyél alá még egy tepsit. Légkeveréses (hőlégbefúvásos) sütőnél általában **10–20 °C-kal alacsonyabb** hőmérséklet kell, mint alsó-felső sütésnél. Ne zsúfold túl a sütőt.', level: 'ok' },
    r_sutemeny: { result: 'Túl magas hőmérséklet (vagy rossz forma) a süteményhez', fix: 'A külseje gyorsan megsül és megszilárdul, a belsejének nincs ideje átsülni, a gőz pedig megrepeszti a tetejét. Süsd **alacsonyabb hőmérsékleten, hosszabb ideig**, és **tűpróbával** ellenőrizd (a közepébe szúrt hústűre ne tapadjon nyers tészta). Nagyobb formánál a sütési idő is hosszabb.', level: 'ok' },
    r_csirke: { result: 'Az egész szárnyas belseje nem sült át', fix: 'A combtő és a mell legvastagabb része melegszik át utoljára. **Maghőmérővel** a combtőnél (csontot nem érintve) mérj: legalább **72 °C** kell (és a kiszúrásnál a lé ne legyen rózsaszín). Ha a külseje kész, takard le fóliával, és süsd tovább alacsonyabb hőmérsékleten. Az ilyen csirkét **soha ne tálald** félig nyersen: szalmonella- és Campylobacter-veszély!', level: 'bad' }
  }
});
