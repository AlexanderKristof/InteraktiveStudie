/* Tantárgy: Logisztika és raktározás */
STUDIE.addSubject({
  id: 'logisztika',
  stage: 'szakma',
  title: 'Logisztika és raktározás',
  icon: '📦',
  color: '#2f7fd6',
  description: 'Ellátási lánc, készletgazdálkodás, raktári folyamatok, targonca-biztonság, vonalkód és RFID, szállítási módok és az Incoterms alapjai.',
  intro: 'Minden, amit a boltban leveszel a polcról, hosszú utat tett meg: gyárból raktárba, raktárból kamionra, onnan a boltba. A **logisztika** gondoskodik róla, hogy a **megfelelő termék** a **megfelelő mennyiségben**, **állapotban**, **helyre** és **időben**, a lehető **legkisebb költséggel** érkezzen meg. Ez a tananyag a logisztikai és raktári munka alapjait tanítja. **A targoncavezetés és az anyagmozgató gépek kezelése képzéshez és jogosítványhoz kötött:** az itt leírtak elméleti ismeretek, nem helyettesítik a képzést, a munkahelyi oktatást és a gép kezelési utasítását.',
  lessons: [
    {
      id: 'ellatasi-lanc',
      title: 'Az ellátási lánc',
      level: 1, minutes: 13,
      summary: 'Szereplők és áramlások, húzó és toló rendszer, just-in-time és kanban, az ostorcsapás-hatás és a visszutas logisztika.',
      tags: ['logisztika', 'ellátási lánc', 'supply chain', 'beszállító', 'gyártó', 'nagykereskedő', 'kiskereskedő', 'anyagáramlás', 'információáramlás', 'push', 'pull', 'just-in-time', 'JIT', 'kanban', 'ostorcsapás-hatás', 'bullwhip', 'visszutas logisztika', '3PL'],
      sections: [
        {
          title: 'Szereplők és áramlások',
          text: 'Az **ellátási lánc** mindazon vállalatok és folyamatok összessége, amelyek egy terméket a nyersanyagtól a vevőig eljuttatnak. Egy egyszerű lánc:\n\n**nyersanyag-beszállító → gyártó → nagykereskedő / elosztóközpont → kiskereskedő → végső vevő**\n\nA láncban három dolog áramlik:\n\n- **anyag (áru)**: többnyire a vevő felé,\n- **információ**: rendelések, előrejelzések, készletadatok, szállítási értesítések, mindkét irányba,\n- **pénz**: a vevőtől a beszállítók felé.\n\nA logisztika „7 jó” (7R) elve szerint a cél: a **jó termék**, a **jó mennyiségben**, a **jó állapotban**, a **jó helyre**, a **jó időben**, a **jó vevőhöz**, a **jó költséggel** jusson el. Ezek gyakran ütköznek: a gyorsabb szállítás drágább, a nagyobb készlet biztonságosabb, de több pénzt köt le.',
          widget: { type: 'idovonal', options: { steps: true, title: 'Egy doboz gabonapehely útja: tedd sorrendbe!', events: [
            { year: 1, label: '1.', title: 'Gazdaság', text: 'A gabonát megtermelik, betakarítják, felvásárolják.' },
            { year: 2, label: '2.', title: 'Gyártó', text: 'Az üzem feldolgozza, csomagolja, raklapra rakja.' },
            { year: 3, label: '3.', title: 'Elosztóközpont', text: 'Az áruház-lánc raktára fogadja, tárolja, és a boltok rendelései szerint komissiózza.' },
            { year: 4, label: '4.', title: 'Bolt', text: 'A boltba érkezik, polcra kerül.' },
            { year: 5, label: '5.', title: 'Vevő', text: 'Valaki megveszi: a pénztári adat (információ) visszajut a lánc elejére, és újrarendelést indít.' }
          ] } }
        },
        {
          title: 'Toló és húzó rendszer, JIT, kanban',
          text: '- **Toló (push) rendszer**: előrejelzés alapján gyártanak és töltik fel a készletet, „rátolják” a piacra. Ha az előrejelzés téved, sok a felesleges készlet vagy a hiány.\n- **Húzó (pull) rendszer**: a tényleges **fogyasztás** indítja az utánpótlást. Ami elfogyott, azt pótolják.\n\nA **just-in-time** (JIT, „éppen időben”) a Toyota gyártási rendszeréből ismert elv: az alkatrész **akkor és annyi** érkezzen, amikor és amennyi kell, így alig van készlet. Ehhez nagyon megbízható beszállítók és szállítás kell, és egy fennakadás (baleset, határzár, járvány) gyorsan leállíthatja a gyártást.\n\nA **kanban** (japánul „kártya, jelzés”) a húzó rendszer egyszerű eszköze: amikor egy tárolóedény kiürül, a rajta lévő kártya (vagy ma már elektronikus jel) jelzi, hogy pótolni kell.'
        },
        {
          title: 'Az ostorcsapás-hatás',
          text: 'Az **ostorcsapás-hatás** (bullwhip-effektus) azt jelenti, hogy a vásárlói kereslet **kis ingadozása** a láncban felfelé haladva egyre **nagyobb ingadozássá** erősödik, mint ahogy az ostor nyele kis mozdulatot tesz, a vége nagyot csap.\n\nPélda: egy bolt a szokásosnál 10%-kal több vizet ad el egy meleg héten. A boltvezető „biztos, ami biztos” alapon 20%-kal többet rendel. A nagykereskedő ezt látva 30%-kal többet rendel a gyártótól, a gyártó pedig növeli a gyártást. Mire a lánc végére ér, a hőség elmúlt, és mindenhol túl sok a készlet.\n\nOkai: a rendelések **halmozása** (nagy tételekben rendelnek), a **késleltetés** (az utánpótlás napokig, hetekig tart), az **akciók**, és főleg az, hogy a szereplők **nem látják** a valós végső keresletet. Ellenszer: az **információ megosztása** (pl. a pénztári eladási adatok átadása a beszállítónak), kisebb és gyakoribb rendelések, rövidebb átfutási idő.'
        },
        {
          title: 'Visszutas logisztika és logisztikai szolgáltatók',
          text: 'A **visszutas (reverz) logisztika** a vevőtől visszafelé áramló anyagokkal foglalkozik: **visszaküldött** áru (a webáruházaknál jelentős!), **göngyöleg** (raklap, ládák, betétdíjas palackok), javításra szoruló termék, **hulladék** és újrahasznosítás.\n\nSok cég nem maga végzi a logisztikát, hanem **logisztikai szolgáltatót** bíz meg:\n\n- **szállítmányozó** (szervezi a fuvart, a vámkezelést, a papírmunkát),\n- **fuvarozó** (ténylegesen elszállítja az árut),\n- **3PL** (third-party logistics, harmadik fél logisztika): raktározást, komissiózást, szállítást is vállal egyben.'
        }
      ],
      quiz: [
        { q: 'Mi áramlik az ellátási láncban a vevő felől a beszállítók felé?', options: ['Csak az áru', 'Pénz és információ (rendelések)', 'Semmi', 'Csak a göngyöleg'], answer: 1, explain: 'Az áru jellemzően a vevő felé, a pénz a beszállítók felé, az információ mindkét irányba áramlik.' },
        { q: 'Mi a just-in-time elv lényege?', options: ['Nagy biztonsági készlet mindenből', 'Az anyag akkor és annyi érkezzen, amikor és amennyi kell', 'Mindig a legolcsóbb fuvar', 'Csak éjszakai szállítás'], answer: 1, explain: 'A JIT minimális készlettel dolgozik, ezért nagyon megbízható utánpótlást igényel.' },
        { q: 'Mi segít leginkább az ostorcsapás-hatás ellen?', options: ['Nagyobb tételekben rendelni', 'A valós keresleti adatok megosztása a láncban', 'Gyakoribb akciók', 'Hosszabb szállítási idő'], answer: 1, explain: 'Ha mindenki a valós végső keresletet látja, nem kell „biztonságból” túlrendelni.' }
      ]
    },
    {
      id: 'keszlet',
      title: 'Készletgazdálkodás',
      level: 2, minutes: 15,
      summary: 'Miért tartunk készletet, mibe kerül, ABC-elemzés, rendelési pont, biztonsági készlet, gazdaságos rendelési tétel, FIFO/FEFO és leltár.',
      tags: ['készlet', 'készletgazdálkodás', 'biztonsági készlet', 'rendelési pont', 'utánpótlási idő', 'EOQ', 'Wilson-képlet', 'tartási költség', 'rendelési költség', 'ABC-elemzés', 'Pareto', 'készletforgás', 'FIFO', 'FEFO', 'LIFO', 'leltár', 'ciklikus leltár'],
      sections: [
        {
          title: 'Miért tartunk készletet, és mibe kerül?',
          text: 'A **készlet** puffer a beszerzés és a felhasználás között: ha a szállító késik vagy a kereslet hirtelen megnő, a vevő mégis megkapja az árut. De a készlet **pénzbe kerül**:\n\n- **tartási költség**: a lekötött pénz (amit máshova is fektethetnél), a raktár helye, energia, biztosítás, kezelés, és az áru **elavulása, megromlása, lopása**,\n- **rendelési (beszerzési) költség**: minden egyes rendelés adminisztrációja, szállítási díja, átvétele,\n- **hiányköltség**: ha nincs készlet, elmarad az eladás, leáll a gyártás, elpártol a vevő.\n\nA jó készletgazdálkodás ezek között egyensúlyoz: **elég** készlet legyen, de **ne több**, mint amennyi indokolt.'
        },
        {
          title: 'ABC-elemzés',
          text: 'Nem minden cikk egyformán fontos. Az **ABC-elemzés** a cikkeket az **éves forgalmi értékük** (fogyás · egységár) szerint csoportosítja, a **Pareto-elv** alapján:\n\n- **A**: a cikkek kis része (kb. 10–20%), de az érték nagy része (kb. 70–80%). Ezeket **szorosan** figyeled: gyakori ellenőrzés, pontos előrejelzés, kis biztonsági készlet.\n- **B**: közepes csoport.\n- **C**: a cikkek nagy része (kb. 50%), de az értéknek csak kis hányada (kb. 5–10%). Egyszerűbb szabályok, ritkább rendelés nagyobb tételben.\n\nA pontos határokat minden cég maga állapítja meg. Gyakran kiegészítik **XYZ-elemzéssel**, amely a fogyás **egyenletessége** szerint csoportosít (X: egyenletes, Z: nagyon ingadozó).'
        },
        {
          title: 'Rendelési pont és biztonsági készlet',
          text: 'Mikor kell rendelni? Amikor a készlet annyira lecsökken, hogy éppen kitart, amíg az új szállítmány megérkezik. Ez a **rendelési pont**:\n\n`rendelési pont = napi felhasználás · utánpótlási idő (nap) + biztonsági készlet`\n\nA **biztonsági készlet** a váratlan helyzetekre szól: késik a szállító, vagy nagyobb a fogyás a vártnál. Minél ingadozóbb a kereslet és minél bizonytalanabb a szállító, annál nagyobb biztonsági készlet kell.\n\nPélda: napi 40 db fogy, a szállító 5 nap alatt hoz, a biztonsági készlet 60 db. Rendelési pont = 40 · 5 + 60 = **260 db**.',
          widget: { type: 'szakma-gyakorlo', options: { kind: 'rendelesipont', title: 'Rendelési pont gyakorló' } }
        },
        {
          title: 'Mennyit rendeljünk? Az EOQ',
          text: 'Ha ritkán rendelünk nagy tételt, kevés a rendelési költség, de nagy az átlagkészlet és a tartási költség. Ha gyakran rendelünk kicsit, fordítva. A kettő összege ott a legkisebb, ahol a két költség **egyenlő**: ez a **gazdaságos rendelési tételnagyság** (EOQ, economic order quantity, Wilson-képlet):\n\n`EOQ = √(2 · D · K / H)`\n\nahol **D** az éves igény (db), **K** egy rendelés költsége (Ft), **H** egy darab egy évi tartási költsége (Ft/db/év).\n\nA modell egyszerűsít (egyenletes fogyás, állandó árak, nincs mennyiségi kedvezmény), de jó kiindulópont.',
          widget: { type: 'szakma-gyakorlo', options: { kind: 'eoq', title: 'EOQ gyakorló' } }
        },
        {
          title: 'Kiadási elvek és leltár',
          text: 'Melyik darabot adjuk ki először?\n\n- **FIFO** (first in, first out): ami **először** jött be, az megy ki először. Az alapértelmezett elv, hogy ne öregedjen az áru.\n- **FEFO** (first expired, first out): ami **leghamarabb lejár**, az megy ki először. Élelmiszernél, gyógyszernél, vegyszernél kötelező gyakorlat.\n- **LIFO** (last in, first out): ami utoljára jött, az megy ki először. Fizikailag pl. a halomban tárolt ömlesztett áru (homok, szén) vagy a behajtós állvány ilyen.\n\n**Leltár**: a tényleges készlet megszámolása és összevetése a nyilvántartással.\n\n- **Fordulónapi leltár**: egy adott napon mindent megszámolnak, közben szünetel a forgalom.\n- **Folyamatos (ciklikus) leltár**: folyamatosan, egy-egy területet vagy cikkcsoportot számolnak, gyakran az A-cikkeket sűrűbben. Nem kell leállni.\n\nAz eltérés oka lehet rossz könyvelés, rossz helyre tett áru, sérülés, lopás. Az eltéréseket ki kell vizsgálni, és a nyilvántartást korrigálni.'
        }
      ],
      quiz: [
        { q: 'Napi 30 db fogy, az utánpótlási idő 4 nap, a biztonsági készlet 50 db. Mennyi a rendelési pont?', options: ['84 db', '120 db', '170 db', '200 db'], answer: 2, explain: '30 · 4 + 50 = 170 db.' },
        { q: 'Mit jelent a FEFO?', options: ['Ami először jött, az megy először', 'Ami leghamarabb lejár, az megy először', 'Ami utoljára jött, az megy először', 'Ami a legdrágább, az megy először'], answer: 1, explain: 'First expired, first out: élelmiszernél, gyógyszernél ez a fontos.' },
        { q: 'Melyik cikkcsoportot figyeljük a legszorosabban az ABC-elemzés szerint?', options: ['A', 'B', 'C', 'Egyiket sem'], answer: 0, explain: 'Az A-cikkek adják az érték nagy részét.' }
      ]
    },
    {
      id: 'raktar',
      title: 'Raktári folyamatok',
      level: 1, minutes: 14,
      summary: 'Áruátvétel, betárolás, tárolási módok, komissiózás, csomagolás és kiszállítás; raklapok, cross-docking és a raktárirányítási rendszer.',
      tags: ['raktár', 'áruátvétel', 'szállítólevél', 'jegyzőkönyv', 'betárolás', 'tárhely', 'kaotikus tárolás', 'állvány', 'raklapos állvány', 'átfolyós állvány', 'komissiózás', 'árukiszedés', 'csomagolás', 'kiszállítás', 'cross-docking', 'WMS', 'EUR-raklap', 'rakodólap'],
      sections: [
        {
          title: 'A raktár alapfolyamatai',
          text: 'A raktár nem csak „hely, ahol az áru áll”, hanem folyamatok sora:',
          widget: { type: 'idovonal', options: { steps: true, title: 'A raktári folyamatok: tedd sorrendbe!', events: [
            { year: 1, label: '1.', title: 'Áruátvétel', text: 'A beérkező szállítmány ellenőrzése a szállítólevél és a rendelés alapján: mennyiség, sérülés, lejárat.' },
            { year: 2, label: '2.', title: 'Betárolás', text: 'Az áru tárhelyre kerül, a rendszer rögzíti, hol van.' },
            { year: 3, label: '3.', title: 'Tárolás', text: 'Az áru a megfelelő körülmények között vár (hőmérséklet, páratartalom, biztonság).' },
            { year: 4, label: '4.', title: 'Komissiózás', text: 'A vevői rendelés szerint kiszedik a tételeket a tárhelyekről.' },
            { year: 5, label: '5.', title: 'Csomagolás, összeállítás', text: 'A tételeket ellenőrzik, csomagolják, raklapra rakják, címkézik.' },
            { year: 6, label: '6.', title: 'Kiszállítás', text: 'Rakodás a járműre, szállítási okmányok, átadás a fuvarozónak.' }
          ] } }
        },
        {
          title: 'Áruátvétel és betárolás',
          text: 'Az **áruátvétel** a raktár „kapuja”: amit itt nem veszel észre, arért később senki sem felel.\n\n- **Mennyiségi átvétel**: darabszám, raklapszám, tömeg egyezik-e a **szállítólevéllel** és a megrendeléssel.\n- **Minőségi átvétel**: sérült csomagolás, beázás, lejárati idő, hűtött áru hőmérséklete.\n- Eltérés vagy sérülés esetén **a fuvarozó jelenlétében** jegyzőkönyvet kell felvenni, és a szállítólevélre is rávezetni. Utólag nehéz bizonyítani, hogy a kár a szállításkor keletkezett.\n\n**Betárolás**: hova kerüljön az áru?\n\n- **Fix tárhely**: minden cikknek saját helye van. Könnyű megtalálni, de rosszul használja ki a helyet.\n- **Szabad (kaotikus) tárhely-kiosztás**: az áru oda kerül, ahol éppen hely van, és a **raktárirányítási rendszer** (WMS) tartja nyilván. Jobb helykihasználás, de rendszer és vonalkód nélkül működésképtelen.\n- A **gyorsan forgó** cikkek a kiszedéshez közel, kényelmes magasságban legyenek, a nehéz áru alul.'
        },
        {
          title: 'Tárolási módok és raklapok',
          text: '- **Polcos állvány**: kisebb, kézzel kezelhető áruknak.\n- **Raklapos (ráklapos) állvány**: a leggyakoribb, targoncával kiszolgált, több szinten raklapokat tárol. Minden raklaphely elérhető.\n- **Behajtós állvány**: a targonca behajt az állványba, nagyon sűrű tárolás, de csak kevés cikkféleségnél jó (LIFO jellegű).\n- **Átfolyós (gravitációs) állvány**: az egyik oldalon betárolnak, a lejtős görgősoron az áru a másik oldalra gurul: természetes FIFO.\n- **Blokktárolás**: a raklapok a padlón egymás mellett és egymáson, állvány nélkül.\n- **Automata raktár**: magasraktár felrakógéppel, shuttle rendszerek, robotok.\n\nA **raklap** (rakodólap) a raktár alapegysége. Európában a legelterjedtebb az **EUR-raklap** (EPAL): **1200 × 800 mm**. Hogy mennyit bír, azt a gyártó jelölése, adatlapja adja meg; sérült (törött deszkás, hiányzó kockás) raklapot nem szabad használni. Az **állványok** teherbírását a **terhelhetőségi tábla** mutatja: ennél nehezebbet nem szabad rá tenni.'
        },
        {
          title: 'Komissiózás és kiszállítás',
          text: 'A **komissiózás** (árukiszedés) a vevői rendelések összeállítása. Ez a raktári munka **legmunkaigényesebb** része, sokszor a költségek felét is adja.\n\n- **Ember az áruhoz**: a dolgozó végigjárja a tárhelyeket a kiszedési listával, kézi vonalkód-olvasóval, **hangvezérléssel** (fülhallgatóban mondja a rendszer, hova menjen) vagy **fényjelzéssel** (a polcon világít, honnan kell venni).\n- **Áru az emberhez**: automata rendszer hozza a tárolóedényt a kiszedő állomáshoz.\n- **Rendelésenkénti** vagy **gyűjtő (batch)** kiszedés: egyszerre több rendelés tételeit szedik, majd szétválogatják.\n\nA kiszállításnál fontos a **rakományrögzítés** és a **helyes rakodási sorrend** (amit elsőként kell lerakni, az kerüljön utoljára a járműre).\n\n**Cross-docking**: az áru be sem kerül tárhelyre, hanem a beérkezés után szinte azonnal átrakják a kimenő járművekre. Gyorsan romló áruknál, áruházláncok elosztóközpontjaiban gyakori.'
        }
      ],
      quiz: [
        { q: 'Mit teszel, ha átvételkor sérült raklapot találsz?', options: ['Szó nélkül átveszed', 'A fuvarozó jelenlétében jegyzőkönyvet veszel fel, és a szállítólevélre is rávezeted', 'Később szólsz a főnöknek', 'Elrejted'], answer: 1, explain: 'A szállítási kárt az átvételkor kell rögzíteni, utólag nehéz bizonyítani.' },
        { q: 'Melyik tárolási mód biztosít természetes FIFO-t?', options: ['Behajtós állvány', 'Átfolyós (gravitációs) állvány', 'Blokktárolás', 'Halomtárolás'], answer: 1, explain: 'Az átfolyós állványban az áru az egyik oldalon kerül be, a másikon jön ki.' },
        { q: 'Mekkora az EUR-raklap?', options: ['1000 × 1000 mm', '1200 × 800 mm', '1200 × 1000 mm', '800 × 600 mm'], answer: 1, explain: 'Az EUR (EPAL) raklap mérete 1200 × 800 mm.' }
      ]
    },
    {
      id: 'targonca',
      title: 'Targonca-biztonság',
      level: 2, minutes: 15,
      summary: 'Jogosultság, napi ellenőrzés, a stabilitás és a teherbírási diagram, biztonságos haladás és rakodás, gyalogosok, akkumulátortöltés.',
      tags: ['targonca', 'villás targonca', 'gépkezelői jogosítvány', 'emelőgép', 'napi ellenőrzés', 'stabilitás', 'stabilitási háromszög', 'súlypont', 'teherközéppont', 'teherbírási diagram', 'borulás', 'biztonsági öv', 'gyalogos', 'akkumulátor', 'töltés', 'hidrogén', 'gázüzemű targonca'],
      sections: [
        {
          title: 'Ki vezethet targoncát?',
          text: 'Targoncát **csak** az vezethet, aki:\n\n- elvégezte az előírt **képzést**, és rendelkezik a géptípusra érvényes **jogosultsággal** (Magyarországon a gépkezelői jogosítványról és az emelőgépek biztonságáról szóló jogszabályok szerint),\n- **munkáltatói** megbízást és **munkahelyi oktatást** kapott az adott gépre és terepre,\n- **egészségügyileg alkalmas**, és nincs alkohol vagy bódító szer hatása alatt.\n\nA szabályok változhatnak: a pontos követelményeket mindig a hatályos jogszabályokban és a munkahelyi előírásokban kell ellenőrizni. „Csak odébb állok vele” alapon, jogosultság nélkül **soha** ne ülj targoncára: a targoncabalesetek gyakran halálosak, a gép több tonnás, és a gyalogos ellen nincs esélye.'
        },
        {
          title: 'Műszak előtti ellenőrzés',
          text: 'Minden műszak előtt (a gép kezelési utasítása és a munkahelyi ellenőrzőlista szerint) ellenőrizni kell, és az eredményt **dokumentálni**:\n\n- **villák**: repedés, deformáció, kopás, a rögzítőcsapok,\n- **emelőlánc, oszlop**: sérülés, kenés, hidraulikaolaj-szivárgás,\n- **kerekek, abroncsok**: sérülés, kopás,\n- **fékek** (üzemi és rögzítőfék), **kormány**,\n- **kürt, világítás, villogó**, tolatójelző,\n- **biztonsági öv**, ülés, vezetővédő tető,\n- akkumulátor töltöttsége, csatlakozók, illetve gázpalack rögzítése, tömítettsége.\n\nHa bármilyen **hibát** találsz, a gépet **ne használd**: jelezd, és jelöld meg, hogy más se használja, amíg meg nem javítják.'
        },
        {
          title: 'Stabilitás és teherbírás',
          text: 'A villás targonca úgy működik, mint egy **mérleghinta**: az első tengely a forgáspont, a teher az egyik oldalon, a targonca saját tömege (és az ellensúly) a másikon. A gép akkor stabil, ha a **közös súlypont** a kerekek alkotta **stabilitási háromszögön** belül marad (a hátsó tengely sok gépnél középen csuklósan van felfüggesztve, ezért háromszög).\n\n- A **teherbírási diagram** (adattábla) megmutatja, mekkora teher emelhető adott **teherközépponti távolságnál** és **emelési magasságnál**. Az adattáblán gyakran **500 mm**-es teherközéppont szerepel: ha a teher súlypontja távolabb van a villa tövétől (hosszú vagy rosszul felvett teher), **kevesebb** emelhető.\n- **Magasra emelt** teherrel a súlypont feljebb kerül, a gép könnyebben borul.\n- **Hirtelen fékezés, éles kanyar, gyors fordulás** (különösen üresen, emelt villával), egyenetlen talaj, lejtőn keresztben haladás: **felborulás** veszélye.',
          warn: 'Ha a targonca **oldalra borul**, **ne ugorj ki**: a gép rád eshet, a vezetővédő tető alatt nagyobb az esélyed. Legyen bekapcsolva a **biztonsági öv**, kapaszkodj erősen a kormányba, támaszd meg a lábad, és dőlj a borulással **ellentétes** irányba.'
        },
        {
          title: 'Haladás, rakodás, gyalogosok',
          text: '- Haladáskor a villa **alacsonyan**, a talajhoz közel legyen, az oszlop **hátradöntve**.\n- Ha a teher **eltakarja a kilátást**, **tolatva** haladj (ha a munkahelyi szabály ezt írja elő), vagy kérj irányítót.\n- **Lejtőn** teherrel úgy haladj, hogy a teher a **lejtő felső oldalán** legyen (felfelé előre, lefelé tolatva); lejtőn ne fordulj meg, és ne haladj keresztben.\n- **Utast** szállítani **tilos**, embert a villán vagy raklapon emelni **tilos** (erre csak külön, engedélyezett munkakosár való).\n- Emelt teher alatt **senki** ne tartózkodjon, és ne haladj át alatta.\n- **Gyalogosok**: a kijelölt útvonalakon közlekedj, kereszteződésben, ajtóknál lassíts, kürtölj, nézz körül. Számíts arra, hogy a gyalogos nem lát vagy nem hall (fülhallgató!).\n- Leparkoláskor: villa a **földön**, kissé előredöntve, rögzítőfék behúzva, kulcs kivéve, és ne torlaszold el a menekülési utat, tűzoltó eszközt.\n\n**Akkumulátoros targonca töltése**: a töltés közben (főleg savas ólomakkumulátornál) **hidrogéngáz** keletkezhet, amely robbanásveszélyes. Csak kijelölt, jól szellőző helyen tölts, nyílt láng és szikra nélkül, és az akkumulátorfedelet a gyártó előírása szerint nyisd. **Gázüzemű** targoncánál a palackcsere is külön oktatást igényel.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a helyzetet a helyes viselkedéssel!', count: 6, pairs: [
            ['Haladás teherrel', 'Villa alacsonyan, oszlop hátradöntve'],
            ['Lejtőn lefelé teherrel', 'Tolatva, a teher a lejtő felső oldalán'],
            ['A teher eltakarja a kilátást', 'Tolatva haladsz, vagy irányítót kérsz'],
            ['Oldalra borul a targonca', 'Nem ugrasz ki, kapaszkodsz, ellentétes irányba dőlsz'],
            ['Napi ellenőrzésnél fékhibát találsz', 'Nem használod, jelzed és megjelölöd'],
            ['Leparkolás', 'Villa a földön, fék behúzva, kulcs kivéve'],
            ['Akkumulátortöltés', 'Kijelölt, jól szellőző helyen, láng nélkül']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi történik a targonca teherbírásával, ha a teher súlypontja messzebb van a villa tövétől, mint az adattáblán?', options: ['Nő', 'Csökken', 'Nem változik', 'Megduplázódik'], answer: 1, explain: 'Hosszabb erőkar → nagyobb billentőnyomaték, ezért kevesebb teher emelhető.' },
        { q: 'Mit teszel, ha a targonca oldalra borul?', options: ['Kiugrasz', 'Bent maradsz bekapcsolt övvel, kapaszkodsz, és a borulással ellentétes irányba dőlsz', 'Elengeded a kormányt', 'Felállsz'], answer: 1, explain: 'A kiugró vezetőt gyakran a gép vagy a vezetővédő tető zúzza össze.' },
        { q: 'Miért kell az akkumulátoros targoncát jól szellőző helyen tölteni?', options: ['Mert meleg lesz', 'Mert töltés közben robbanásveszélyes hidrogéngáz keletkezhet', 'Mert zajos', 'Mert így gyorsabb'], answer: 1, explain: 'A savas ólomakkumulátor töltésekor hidrogén és oxigén fejlődhet.' }
      ]
    },
    {
      id: 'azonositas',
      title: 'Vonalkód, QR-kód és RFID',
      level: 2, minutes: 14,
      summary: 'Az EAN-13/GTIN felépítése és az ellenőrző számjegy, az SSCC raklapazonosító, a 2D kódok és az RFID működése, előnyei és korlátai.',
      tags: ['vonalkód', 'EAN-13', 'GTIN', 'GS1', 'ellenőrző számjegy', 'SSCC', 'GS1-128', 'QR-kód', 'DataMatrix', '2D kód', 'RFID', 'címke', 'transzponder', 'olvasó', 'UHF', 'EPC', 'nyomonkövetés'],
      sections: [
        {
          title: 'Miért kell automatikus azonosítás?',
          text: 'Egy nagy raktárban naponta tízezres nagyságrendben mozognak a tételek. Ha minden cikkszámot kézzel kellene beírni, sok lenne a **hiba**, és lassú lenne a munka. Az **automatikus azonosítás** (vonalkód, 2D kód, RFID) gyors, pontos, és minden mozgást **valós időben** rögzít a rendszerben. Ez a nyomonkövethetőség alapja is: ha egy termékkel gond van (pl. visszahívás), meg lehet mondani, melyik tétel hova került.\n\nA kereskedelemben használt azonosítók többségét a nemzetközi **GS1** szervezet szabványai határozzák meg, így egy kód az egész világon ugyanazt jelenti.'
        },
        {
          title: 'Az EAN-13 (GTIN-13)',
          text: 'A boltban a termékeken leggyakrabban az **EAN-13** vonalkód látható, amely egy 13 jegyű **GTIN** (globális kereskedelmi cikkszám) kódot hordoz:\n\n- az első 2–3 számjegy a **GS1-előtag**: azt mutatja, melyik ország GS1-szervezete adta ki a számot (Magyarország: **599**). Ez **nem** a gyártás helyét jelenti!\n- utána a **cégazonosító** és a **termékazonosító**,\n- az utolsó számjegy az **ellenőrző számjegy**, amely kiszűri az olvasási és gépelési hibák nagy részét.\n\n**Az ellenőrző számjegy kiszámítása:** az első 12 számjegyet balról kezdve felváltva **1-gyel és 3-mal** szorozzuk, összeadjuk, és megnézzük, mennyi hiányzik a következő **10-es többszörösig**. Ez az ellenőrző számjegy (ha az összeg pont 10 többszöröse, akkor 0).\n\nA nagyobb egységeken (karton, raklap) más szabványos kódokat használnak, pl. **GS1-128** vonalkódot, amely több adatot is hordozhat (lejárat, gyártási tétel, tömeg). A raklapot vagy szállítási egységet az **SSCC** (18 jegyű szállítási egységazonosító) azonosítja egyedileg.',
          widget: { type: 'szakma-gyakorlo', options: { kind: 'ean', title: 'EAN-13 ellenőrző számjegy gyakorló', help: 'Számold ki az ellenőrző számjegyet! (A kódok kitaláltak.)' } }
        },
        {
          title: '2D kódok',
          text: 'A **kétdimenziós** kódok (pl. **QR-kód**, **DataMatrix**) sokkal több adatot tárolnak kis helyen, mint a hagyományos vonalkód, és **hibajavításuk** miatt részben sérülten is olvashatók. A logisztikában a DataMatrixot apró alkatrészeken, gyógyszercsomagoláson (sorozatszámos azonosítás), a QR-kódot csomagcímkéken, dokumentumokon használják. Olvasásukhoz **kamerás (képalkotó)** olvasó kell, a lézeres vonalkódolvasó nem elég.'
        },
        {
          title: 'RFID',
          text: 'Az **RFID** (rádiófrekvenciás azonosítás) **rádióhullámmal** olvassa a címkét (transzpondert), amelyben egy apró chip és antenna van.\n\n- **Passzív** címke: nincs saját eleme, az olvasó rádiójeléből nyeri az energiát. Olcsó, vékony, matricába építhető. A logisztikában gyakori az **UHF** sáv (kb. 860–960 MHz), ahol néhány méterről is olvasható.\n- **Aktív** címke: saját elemmel működik, nagyobb a hatótávja, drágább (pl. konténerek, járművek követése).\n\n**Előnyei a vonalkóddal szemben**: nem kell **rálátás**, a címke dobozon belül is olvasható; **egyszerre sok** címkét lehet olvasni (egy teljes raklapot az ajtón áthaladva); a címke **egyedi** azonosítót hordoz (nem csak a terméktípust).\n\n**Korlátai**: drágább, mint a nyomtatott vonalkód; a **fém** és a **folyadék** zavarhatja az olvasást; adatvédelmi kérdéseket is felvet.',
          widget: { type: 'parositas', options: { title: 'Párosítsd az azonosítót a jellemzőjével!', count: 6, pairs: [
            ['EAN-13', '13 jegyű termékazonosító a bolti termékeken'],
            ['599 előtag', 'A magyar GS1-szervezet adta ki a számot'],
            ['SSCC', '18 jegyű egyedi raklap-, szállítási egység azonosító'],
            ['DataMatrix', 'Kis méretű 2D kód, sok adattal'],
            ['Passzív RFID-címke', 'Az olvasó jeléből nyeri az energiát'],
            ['Aktív RFID-címke', 'Saját eleme van, nagy hatótáv'],
            ['Ellenőrző számjegy', 'Kiszűri az olvasási, gépelési hibákat']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mit jelent a 599-cel kezdődő EAN-kód?', options: ['Hogy a termék Magyarországon készült', 'Hogy a kódot a magyar GS1-szervezet adta ki', 'Hogy a termék bio', 'Hogy a termék akciós'], answer: 1, explain: 'Az előtag a kódot kiadó GS1-szervezet országát jelöli, nem a gyártás helyét.' },
        { q: 'Mi az RFID egyik fő előnye a vonalkóddal szemben?', options: ['Mindig olcsóbb', 'Nem kell rálátás, és egyszerre sok címke olvasható', 'Fém mellett jobban működik', 'Nem kell hozzá olvasó'], answer: 1, explain: 'Az RFID rádióhullámmal olvas, így dobozon belüli, tömeges olvasás is lehetséges.' },
        { q: 'Mire szolgál az EAN-kód utolsó számjegye?', options: ['A gyártás évét jelzi', 'Ellenőrző számjegy', 'Az árat jelzi', 'A súlyt jelzi'], answer: 1, explain: 'Az ellenőrző számjegyet az első 12 számjegyből számítják, és kiszűri a hibák nagy részét.' }
      ]
    },
    {
      id: 'szallitas',
      title: 'Szállítási módok',
      level: 1, minutes: 14,
      summary: 'Közúti, vasúti, vízi, légi és csővezetékes szállítás összehasonlítása, konténer és intermodális szállítás, rakományrögzítés, vezetési idők és fuvarokmányok.',
      tags: ['szállítás', 'fuvarozás', 'közúti', 'vasúti', 'vízi', 'tengeri', 'légi', 'csővezeték', 'konténer', 'TEU', 'intermodális', 'kombinált fuvarozás', 'rakományrögzítés', 'vezetési idő', 'tachográf', 'CMR', 'ADR', 'veszélyes áru', 'kibocsátás'],
      sections: [
        {
          title: 'A szállítási módok összehasonlítása',
          text: '- **Közúti**: a legrugalmasabb, **háztól házig** visz, sűrű az úthálózat. Kisebb és közepes távolságra, kis és közepes tételekre ideális. Hátránya: torlódás, viszonylag magas kibocsátás és baleseti kockázat árutonnánként.\n- **Vasúti**: nagy tömegre, nagy távolságra gazdaságos, kevesebb kibocsátással. Kevésbé rugalmas: a vasúthoz el kell juttatni az árut (iparvágány, terminál).\n- **Vízi (tengeri, belvízi)**: hatalmas mennyiségek **legolcsóbban** egységnyi tömegre, de **lassú**. A világkereskedelem árutömegének nagy része tengeren utazik. Belvízen Magyarországon a **Duna** a fő útvonal.\n- **Légi**: a **leggyorsabb** nagy távolságra, de a **legdrágább** és tömegre vetítve a legnagyobb kibocsátású. Értékes, sürgős, romlandó áruknak (gyógyszer, elektronika, friss virág).\n- **Csővezeték**: folyadékok és gázok (kőolaj, földgáz, víz) folyamatos, olcsó szállítására, de csak arra az egy útvonalra és anyagra.\n\nA választásnál mérlegelni kell: **költség, idő, megbízhatóság, rugalmasság, az áru jellege** (tömeg, érték, romlandóság, veszélyesség) és a **környezeti hatás**.'
        },
        {
          title: 'Konténer és intermodális szállítás',
          text: 'A **szabványos konténer** forradalmasította a szállítást: ugyanaz a doboz kerül hajóra, vonatra, kamionra, anélkül hogy az árut átpakolnák. A leggyakoribbak a **20 lábas** (kb. 6,1 m hosszú) és a **40 lábas** konténer. A kapacitást **TEU**-ban (twenty-foot equivalent unit, 20 lábas egyenérték) mérik: egy 40 lábas konténer 2 TEU.\n\nAz **intermodális (kombinált) szállítás** több szállítási módot kapcsol össze egy rakományegységgel: pl. a hosszú távú szakasz vasúton vagy hajón, az első és utolsó néhány tíz kilométer kamionnal. Így egyesíthető a vasút/hajó olcsósága és környezetkímélése a közút rugalmasságával. A **Ro-La** (gördülő országút) rendszerben a teljes kamiont vasúti kocsira állítják.'
        },
        {
          title: 'Rakományrögzítés',
          text: 'A rakomány fékezéskor, kanyarban, kitérésnél elmozdulhat: ez balesetet, borulást, árukárt okozhat. A rögzítés célja, hogy a rakomány a **jármű részeként** viselkedjen.\n\n- **Formazáró** rögzítés: a rakomány hézagmentesen nekitámaszkodik a jármű falának, homlokfalának, vagy kitámasztják (pl. kitámasztó rúd, légpárna).\n- **Erőzáró** rögzítés: **lekötőhevederekkel** a raktérpadlóhoz szorítják, így a súrlódás tartja.\n- **Csúszásgátló alátét**: növeli a súrlódást a rakomány és a padló között.\n- A **súlypont** legyen alacsonyan és középen, a tengelyterhelések maradjanak a megengedett határon belül.\n\nA rakomány elhelyezésének és rögzítésének követelményeit európai szabványok (pl. EN 12195-1) és útmutatók írják le. A rögzítésért a feladó, a rakodó és a járművezető is felelhet.'
        },
        {
          title: 'Vezetési idők és okmányok',
          text: 'A közúti árufuvarozásban a hivatásos járművezetők **vezetési és pihenőidejét** uniós rendelet (561/2006/EK) szabályozza, és **menetíró készülék** (tachográf) rögzíti. A fő szabályok:\n\n- napi vezetési idő legfeljebb **9 óra**, hetente legfeljebb kétszer **10 óra**,\n- legfeljebb **4,5 óra** vezetés után legalább **45 perc** szünet (megosztva is: 15 + 30 perc),\n- heti vezetési idő legfeljebb **56 óra**, két egymást követő héten együtt legfeljebb **90 óra**,\n- napi és heti pihenőidők.\n\nNemzetközi közúti fuvarozásban a fuvarozási szerződést a **CMR fuvarlevél** igazolja. **Veszélyes áru** közúti szállítását az **ADR** egyezmény szabályozza: külön képzés, jelölés (narancssárga tábla, bárcák), felszerelés kell.',
          widget: { type: 'parositas', options: { title: 'Melyik szállítási mód illik az áruhoz? Párosítsd!', count: 6, pairs: [
            ['10 000 tonna vasérc Brazíliából', 'Tengeri hajó'],
            ['Sürgős gyógyszer másik kontinensre', 'Légi'],
            ['Bútor házhoz szállítása a városban', 'Közúti'],
            ['Földgáz folyamatos ellátása', 'Csővezeték'],
            ['Konténerek nagy tömegben a kikötőből a belföldi terminálra', 'Vasúti'],
            ['Gabona a Dunán lefelé', 'Belvízi hajó (uszály)'],
            ['Veszélyes áru közúton', 'ADR szerinti jelölés és képzés']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik szállítási mód a legolcsóbb egységnyi tömegre nagy távolságon?', options: ['Légi', 'Közúti', 'Tengeri', 'Futár'], answer: 2, explain: 'A tengeri hajók óriási mennyiséget visznek, ezért tonnánként a legolcsóbbak, de lassúak.' },
        { q: 'Hány TEU egy 40 lábas konténer?', options: ['1', '2', '4', '40'], answer: 1, explain: 'A TEU a 20 lábas egyenérték; a 40 lábas konténer 2 TEU.' },
        { q: 'Legfeljebb hány óra vezetés után kötelező legalább 45 perc szünet?', options: ['2 óra', '4,5 óra', '6 óra', '9 óra'], answer: 1, explain: 'Az 561/2006/EK rendelet szerint 4,5 óra vezetés után legalább 45 perc szünet jár.' }
      ]
    },
    {
      id: 'incoterms',
      title: 'Az Incoterms alapjai',
      level: 3, minutes: 15,
      summary: 'Mire valók az Incoterms szabályok, mit szabályoznak és mit nem; a 11 szabály két csoportja, az EXW-től a DDP-ig, és a helyes hivatkozás.',
      tags: ['Incoterms', 'Incoterms 2020', 'ICC', 'paritás', 'kockázatátszállás', 'költségviselés', 'EXW', 'FCA', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF', 'vámkezelés', 'biztosítás', 'nemzetközi kereskedelem'],
      sections: [
        {
          title: 'Mire való az Incoterms?',
          text: 'Ha egy magyar cég Németországba vagy Kínába ad el árut, sok kérdés felmerül: **ki fizeti a fuvart**? **Mikor száll át a kockázat** (ha a hajó elsüllyed, kinek a kára)? **Ki intézi a vámot**? **Ki köti a biztosítást**? Hogy ne kelljen mindezt minden szerződésben hosszan leírni, a **Nemzetközi Kereskedelmi Kamara (ICC)** egységes, rövid szabályokat dolgozott ki: ezek az **Incoterms** szabályok (International Commercial Terms). Az első változat **1936**-ban jelent meg, azóta nagyjából tízévente frissítik. A jelenleg használt változat az **Incoterms® 2020**; az ICC a következő átdolgozáson dolgozik.\n\nAz Incoterms azt szabályozza, hogy az eladó és a vevő között:\n\n- hol és mikor történik az **áru átadása**,\n- mikor **száll át a kockázat**,\n- ki viseli a **költségeket** (fuvar, rakodás, biztosítás, vám),\n- ki intézi az **export- és importvámkezelést**.\n\n**Nem** szabályozza: a **tulajdonjog** átszállását, a **fizetési** feltételeket, a szerződésszegés következményeit. Ezeket a szerződésben külön kell rögzíteni.'
        },
        {
          title: 'A 11 szabály',
          text: '**Bármely szállítási módra** (akár többféle egymás után) használható 7 szabály:\n\n- **EXW** (Ex Works, gyárból): az eladó a saját telephelyén a vevő rendelkezésére bocsátja az árut. Az eladónak a **legkevesebb** a kötelezettsége, a vevő intéz mindent, még a rakodást is.\n- **FCA** (Free Carrier, fuvarozónak átadva): az eladó a megnevezett helyen átadja az árut a vevő által megbízott fuvarozónak, az exportvámkezelést ő intézi.\n- **CPT** (Carriage Paid To, fuvardíj fizetve ...-ig): az eladó fizeti a fuvart a rendeltetési helyig, de a **kockázat már az első fuvarozónak való átadáskor** átszáll a vevőre.\n- **CIP** (Carriage and Insurance Paid To): mint a CPT, és az eladó **biztosítást** is köt (az Incoterms 2020-ban magasabb, ún. „A” fedezetű).\n- **DAP** (Delivered at Place, rendeltetési helyen átadva): az eladó elviszi az árut a megnevezett helyre, kirakásra készen.\n- **DPU** (Delivered at Place Unloaded, kirakva átadva): mint a DAP, de az eladó **ki is rakja** az árut.\n- **DDP** (Delivered Duty Paid, vámfizetve leszállítva): az eladó **mindent** intéz, az importvámot is. Az eladónak a **legtöbb** a kötelezettsége.\n\n**Csak tengeri és belvízi** szállításra való 4 szabály:\n\n- **FAS** (Free Alongside Ship): az áru a hajó mellett, a rakparton,\n- **FOB** (Free On Board): az áru **a hajó fedélzetén**, ekkor száll át a kockázat,\n- **CFR** (Cost and Freight): az eladó fizeti a tengeri fuvart, de a kockázat a berakodáskor átszáll,\n- **CIF** (Cost, Insurance and Freight): mint a CFR, plusz az eladó biztosítást köt (minimális, „C” fedezetű).'
        },
        {
          title: 'A helyes használat',
          text: '- Mindig add meg a **szabályt**, a **pontos helyet** és a **változatot**, pl.: „**FCA Budapest, Raktár u. 12., Incoterms® 2020**”. Egy városnév önmagában gyakran nem elég pontos.\n- A „C” szabályoknál (CPT, CIP, CFR, CIF) a **költség** és a **kockázat** **különböző helyen** száll át: az eladó fizeti a fuvart a rendeltetési helyig, de a kockázat már az indulásnál a vevőé. Ez gyakori félreértés!\n- A konténeres áruhoz a **FOB, CFR, CIF** helyett általában az **FCA, CPT, CIP** ajánlott, mert a konténert jellemzően a terminálon adják át, nem a hajó fedélzetén.\n- Az **EXW** és a **DDP** két szélsőség: EXW-nél a vevőnek az eladó országában kell exportvámkezelést intéznie, DDP-nél az eladónak a vevő országában importvámot fizetnie. Mindkettő gyakorlati gondokat okozhat; sokszor az FCA vagy a DAP a jobb választás.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a szabályt a jellemzőjével!', count: 6, pairs: [
            ['EXW', 'Az eladónak a legkevesebb a kötelezettsége'],
            ['DDP', 'Az eladó az importvámot is fizeti'],
            ['FOB', 'A kockázat a hajó fedélzetén száll át'],
            ['CIF', 'Tengeri fuvar és minimális biztosítás az eladó költségén'],
            ['DPU', 'Az eladó a rendeltetési helyen ki is rakja az árut'],
            ['FCA', 'Átadás a vevő fuvarozójának a megnevezett helyen'],
            ['CPT', 'Az eladó fizeti a fuvart, de a kockázat az indulásnál átszáll']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik Incoterms szabály jelenti az eladó számára a legkevesebb kötelezettséget?', options: ['DDP', 'EXW', 'CIF', 'DAP'], answer: 1, explain: 'EXW (gyárból): az eladó csak a telephelyén rendelkezésre bocsátja az árut.' },
        { q: 'Mit NEM szabályoz az Incoterms?', options: ['A kockázat átszállását', 'A költségek megosztását', 'A tulajdonjog átszállását és a fizetést', 'A vámkezelés intézését'], answer: 2, explain: 'A tulajdonjogot és a fizetési feltételeket a szerződésben külön kell rendezni.' },
        { q: 'Melyik szabály használható CSAK tengeri és belvízi szállításra?', options: ['FCA', 'DAP', 'FOB', 'CPT'], answer: 2, explain: 'A FAS, FOB, CFR és CIF csak tengeri és belvízi szállításra való.' }
      ]
    },
    {
      id: 'biztonsag',
      title: 'Raktári munkavédelem és kézi anyagmozgatás',
      level: 1, minutes: 12,
      summary: 'A raktár veszélyei, kézi emelés, állványbiztonság, közlekedési útvonalak, létrák, tűzvédelem és veszélyes anyagok tárolása.',
      tags: ['munkavédelem', 'raktár', 'kézi anyagmozgatás', 'emelés', 'ergonómia', 'állvány', 'terhelhetőség', 'ütközésvédő', 'közlekedési útvonal', 'létra', 'tűzvédelem', 'menekülési út', 'egyéni védőeszköz', 'biztonsági cipő', 'láthatósági mellény', 'veszélyes anyag'],
      sections: [
        {
          title: 'A raktár veszélyei',
          text: 'A raktárban dolgozókat leggyakrabban ezek a balesetek érik:\n\n- **ütközés, elütés** anyagmozgató géppel (targonca, békakocsi),\n- **leeső teher** állványról, raklapról,\n- **elcsúszás, megbotlás** (szétszórt fólia, pántoló szalag, olajfolt),\n- **kézi emelés** okozta hát- és vállsérülések,\n- **vágás** (kartonvágó kés, pántolószalag), becsípődés.\n\nAz alapvető **egyéni védőeszközök**: **biztonsági cipő** (orrmerevítővel), **láthatósági mellény**, munkavédelmi **kesztyű**, a munkától függően **védősisak**. A munkáltató munkavédelmi oktatást tart, és a szabályok betartása mindenkinek kötelező.'
        },
        {
          title: 'Kézi emelés',
          text: 'Mielőtt felemelsz valamit, **gondold végig**: muszáj kézzel? Nincs rá eszköz (kézi raklapemelő, kocsi, emelőasztal)? Mekkora a tömege? Ketten kell?\n\nA helyes emelés:\n\n1. Állj **közel** a teherhez, **terpeszben**, stabilan.\n2. Guggolj le **térdből**, a hátad **egyenes** maradjon.\n3. Fogd meg **biztosan**, két kézzel.\n4. Emelj a **lábaddal**, lassan, rántás nélkül, a terhet **a testedhez közel** tartva.\n5. **Ne csavarodj** el teherrel: a lábaddal fordulj.\n6. Letételkor ugyanígy, fordított sorrendben.\n\nA biztonságosan emelhető tömeg sok tényezőtől függ (hány alkalommal, milyen magasságból, milyen messzire, ki emel). A munkáltatónak kockázatértékeléssel kell meghatároznia, és a nehéz terhek mozgatására eszközt kell biztosítania.'
        },
        {
          title: 'Állványok, útvonalak, létrák',
          text: '- **Állványok**: csak a **terhelhetőségi táblán** feltüntetett tömegig terhelhetők. A **sérült** állványelemet (meghajlott oszlop, hiányzó biztosító csap) **azonnal jelezni** kell, és a sérült részt ki kell üríteni, le kell zárni. Az oszlopok alját **ütközésvédő** óvja a targoncáktól.\n- Raklapot **ne** tegyél a gerendára „ferdén”, kilógva, és ne mássz fel az állványra.\n- **Közlekedési útvonalak**: legyenek **szabadok**, jól megvilágítottak, jelöltek. A gyalogos és a gépi forgalmat lehetőleg **el kell választani**.\n- **Létra**: csak ép, a feladatnak megfelelő létrát használj, három ponton támaszkodj, ne hajolj ki oldalra.'
        },
        {
          title: 'Tűzvédelem és veszélyes anyagok',
          text: 'A raktárban sok az **éghető** anyag (karton, fólia, raklap), ezért a tűzvédelem kiemelten fontos:\n\n- a **menekülési utak** és **vészkijáratok** mindig szabadok legyenek, ne torlaszold el áruval,\n- a **tűzoltó készülékek**, tűzcsapok elé ne tegyél semmit,\n- **dohányozni** csak a kijelölt helyen szabad,\n- tudd, hol a **gyülekezőhely**, és hogyan kell riasztani.\n\n**Veszélyes anyagokat** (pl. festékek, oldószerek, aeroszolok, savak, gázpalackok, lítiumakkumulátorok) csak a **biztonsági adatlapjuk** szerint, kijelölt helyen, egymással **összeférhető** módon szabad tárolni (pl. oxidáló anyagot ne tárolj éghető anyag mellett). A csomagoláson lévő **veszélyjelek** (piktogramok) jelentését minden dolgozónak ismernie kell.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a veszélyt a megelőzéssel!', count: 6, pairs: [
            ['Meghajlott állványoszlop', 'Azonnali jelzés, a hely kiürítése, lezárása'],
            ['Nehéz doboz a földön', 'Térdből emelés, egyenes háttal, közel a testhez'],
            ['Szétszórt pántolószalag az úton', 'Azonnal összeszeded'],
            ['Raklap a vészkijárat előtt', 'Elviszed: a menekülési út mindig szabad'],
            ['Targonca közlekedik a csarnokban', 'Láthatósági mellény, kijelölt gyalogosút'],
            ['Oldószeres festék tárolása', 'Biztonsági adatlap szerint, kijelölt helyen'],
            ['Magasan lévő áru', 'Ép létra, nem mászol az állványra']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mit teszel, ha meghajlott állványoszlopot látsz?', options: ['Semmit, még bírja', 'Azonnal jelzed, és a sérült részt ki kell üríteni, le kell zárni', 'Visszahajlítod kalapáccsal', 'Ráteszel még egy raklapot'], answer: 1, explain: 'A sérült állvány váratlanul összeomolhat.' },
        { q: 'Hogyan emelj fel egy nehéz dobozt?', options: ['Egyenes lábbal, előrehajolva', 'Térdből, egyenes háttal, a testedhez közel', 'Hirtelen rántással', 'Egy kézzel, oldalra fordulva'], answer: 1, explain: 'A lábizmok erősebbek, és így a gerincet kevésbé terheled.' },
        { q: 'Hova nem szabad soha árut tenni?', options: ['A kijelölt tárhelyre', 'A menekülési útra, vészkijárat és tűzoltó készülék elé', 'Raklapra', 'Állványra a terhelhetőség határán belül'], answer: 1, explain: 'Vészhelyzetben a szabad menekülési út életeket ment.' }
      ]
    }
  ]
});

/* Hibakereső döntési fa (formátum: js/hibakereses.js fejléce) */
STUDIE.addTrouble({
  id: 'logisztika-leltar',
  title: 'Nem egyezik a készlet a nyilvántartással',
  lessons: ['logisztika/keszlet', 'logisztika/raktar'],
  intro: 'A rendszer szerint van az áruból, de a polcon nincs (vagy fordítva)? A leltáreltérésnek többnyire nem lopás az oka, hanem folyamathiba. Haladj végig a kérdéseken! Ha lopás vagy szándékos visszaélés gyanúja merül fel, azt ne magad nyomozd ki: jelezd a vezetőnek a cég eljárásrendje szerint.',
  start: 'irany',
  nodes: {
    irany: { q: 'Milyen az eltérés?', answers: [
      { t: 'Hiány: a rendszer szerint több van, mint a polcon', next: 'mashol' },
      { t: 'Többlet: a polcon több van, mint a rendszer szerint', next: 'tobblet' }] },
    mashol: { q: 'Lehet, hogy az áru máshol van?', check: 'Nézd meg a szomszédos tárhelyeket, a felső és alsó szinteket, a beérkezési és kiszállítási zónát, a visszárus, sérült áru területet. Kérdezd meg a műszak dolgozóit.', answers: [
      { t: 'Igen, megtaláltam rossz helyen', next: 'r_rossz_hely' },
      { t: 'Nem találom sehol', next: 'kiadas' }] },
    kiadas: { q: 'Volt az utóbbi időben kiadás, komissiózás ebből a cikkből?', check: 'Nézd meg a mozgásnaplót: az utolsó kiszedéseket, a rendelésekben szereplő mennyiségeket.', answers: [
      { t: 'Igen, és egy rendelésben több ment ki, mint amennyit lekönyveltek', next: 'r_tobb_ki' },
      { t: 'Nincs ilyen, vagy minden egyezik', next: 'serult' }] },
    serult: { q: 'Selejteztek, sérült ki valami ebből a cikkből?', answers: [
      { t: 'Igen, de nem könyvelték le', next: 'r_selejt' },
      { t: 'Nem tudok róla', next: 'r_ismeretlen' }] },
    tobblet: { q: 'Mikor jött be utoljára ebből a cikkből?', check: 'Nézd meg az áruátvételi dokumentumokat és a betárolási naplót.', answers: [
      { t: 'Nemrég jött, és lehet, hogy nem vették be a rendszerbe', next: 'r_nincs_bevetelezve' },
      { t: 'Hasonló cikkszámú termék is van, összekeverhették', next: 'r_osszecserelt' },
      { t: 'Visszáru érkezett', next: 'r_visszaru' }] },
    r_rossz_hely: { result: 'Rossz tárhelyre került az áru', fix: 'Tedd a helyére, vagy könyveld át a valódi helyére a rendszerben. Megelőzés: betároláskor **tárhely-vonalkód** beolvasása is (nem csak a terméké), ellenőrzött betárolás.', level: 'ok' },
    r_tobb_ki: { result: 'Kiszedési hiba', fix: 'A kiszedő több darabot adott ki (vagy rossz cikket). Egyeztess a vevőszolgálattal, a rendelést korrigálni kell. Megelőzés: minden kiszedett darab beolvasása, ellenőrző mérlegelés, kiszedés utáni kontroll.', level: 'ok' },
    r_selejt: { result: 'Lekönyveletlen selejt', fix: 'A sérült, megsemmisített árut jegyzőkönyvvel le kell könyvelni. Megelőzés: egyértelmű selejtezési folyamat, kijelölt selejtterület, napi rögzítés.', level: 'ok' },
    r_ismeretlen: { result: 'Ismeretlen ok: vizsgálat kell', fix: 'Jegyezd fel az eltérést, és jelezd a vezetőnek. Az eltérés okát a mozgásnapló, a kamerafelvételek és a leltárak alapján a cég kijelölt felelőse vizsgálja ki. Addig ne korrigáld önhatalmúlag a készletet.', level: 'warn', pro: true },
    r_nincs_bevetelezve: { result: 'Bevételezetlen áru', fix: 'Az átvétel megtörtént, de a rendszerben nem rögzítették. A szállítólevél alapján utólag be kell vételezni. Megelőzés: az áru csak beolvasott bevételezés után kerülhet tárhelyre.', level: 'ok' },
    r_osszecserelt: { result: 'Összecserélt cikkek', fix: 'Valószínű, hogy egy másik cikknél éppen hiány van. Ellenőrizd a hasonló cikkeket, és könyveld át. Megelőzés: hasonló termékeket ne tárolj közvetlenül egymás mellett, mindig olvasd be a vonalkódot.', level: 'ok' },
    r_visszaru: { result: 'Feldolgozatlan visszáru', fix: 'A visszaküldött árut átvizsgálás után (eladható-e, sérült-e) be kell vételezni vagy selejtezni. Ne kerüljön polcra rögzítés nélkül.', level: 'ok' }
  }
});
