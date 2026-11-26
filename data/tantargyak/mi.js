/* Tantárgy: Mesterséges intelligencia
 * Iskolai szint: egyszerűen, szakszavak nélkül. Az egyetemi kiegészítők: data/szakmai/mi.js,
 * a mélyebb matematika: az egyetemi „Gépi tanulás (MSc)” kurzus (data/egyetem/msc-gepi-tanulas.js).
 * Interaktív elemek: js/mi-widgets.js (mi-tanito, mi-halo, mi-kovetkezo-szo, mi-valodi-kviz).
 * Szándékosan nincsenek benne gyorsan elavuló terméknevek és számok: az elveket tanítjuk. */
STUDIE.addSubject({
  id: 'mi',
  stage: 'kozep',
  title: 'Mesterséges intelligencia',
  icon: '🤖',
  color: '#7c4dff',
  description: 'Hogyan tanul egy gép példákból, mi van egy csevegőrobot „fejében”, miért téved néha magabiztosan, és hogyan használd okosan, becsületesen és biztonságosan.',
  intro: 'A mesterséges intelligenciáról (röviden **MI**) mindenki beszél: van, aki csodát vár tőle, van, aki fél tőle. Ebben a tantárgyban kiderül, **mi van a varázslat mögött**: hogyan tanul egy gép példákból, hogyan működik egy képfelismerő vagy egy csevegőrobot, és miért nem szabad vakon elhinni mindent, amit mond.\n\nA leckékben ki is próbálhatod: **tanítasz egy gépet**, építesz egy kis **neurális hálót**, és megnézed, hogyan „jósolja” egy apró nyelvi modell a következő szót. Az utolsó leckékben arról lesz szó, hogyan használd az MI-t **a tanulásban és a munkában** úgy, hogy közben te is okosabb legyél.\n\nAz informatikai alapokhoz (algoritmus, adat, biztonság) lásd az [[#/tantargy/informatika|Informatika]] tantárgyat, a matematikai háttérhez pedig az egyetemi [[#/egyetem/msc-gepi-tanulas|Gépi tanulás (MSc)]] kurzust.',
  lessons: [
    /* ───────── 1. Mi az MI? ───────── */
    {
      id: 'mi-az-mi',
      title: 'Mi az MI, és mi nem?',
      level: 1, minutes: 10,
      summary: 'Mit nevezünk mesterséges intelligenciának, miben más, mint egy hagyományos program, és mi az, amit csak a filmekben tud.',
      tags: ['mesterséges intelligencia', 'MI', 'AI', 'szűk MI', 'általános MI', 'algoritmus', 'gépi tanulás', 'robot', 'tudat', 'sci-fi'],
      terms: ['msc-gepi-tanulas/tanulasi-paradigmak'],
      sections: [
        {
          title: 'Egy egyszerű meghatározás',
          text: '**Mesterséges intelligenciának** azokat a számítógépes rendszereket hívjuk, amelyek olyan feladatot oldanak meg, amihez embernél „észre” lenne szükség: felismernek egy arcot, megértenek egy kérdést, lefordítanak egy mondatot, vagy kitalálják, milyen videó tetszhet neked.\n\nA legtöbb mai MI egyetlen dologban ügyes:\n\n- a **sakkprogram** nem tud receptet írni,\n- a **fordítóprogram** nem tud autót vezetni,\n- a **képfelismerő** nem tudja, mi a vicc.\n\nEz a **szűk** (egy feladatra képes) MI. Az újabb csevegőrobotok sokféle feladatban segítenek, ezért sokan „általánosabbnak” érzik őket, de ők is csak abban jók, amire a tanításuk felkészítette őket, és bőven hibáznak.'
        },
        {
          title: 'Szabályok helyett példák',
          text: 'Egy hagyományos programot a programozó **szabályokkal** ír meg: „ha a hőmérséklet 22 fok alatt van, kapcsold be a fűtést”. Ez akkor működik, ha a szabályt könnyű leírni (lásd az [[#/lecke/informatika/algoritmusok|algoritmusokról]] szóló leckét).\n\nDe próbáld meg szabályokkal leírni, mitől macska egy macska a képen! Fül, bajusz, szőr… csakhogy egy macska lehet fekete, csíkos, alvó, félig takarásban. A szabályok sosem érnének véget.\n\nA mai MI nagy része ezért **példákból tanul**: megmutatunk neki sok ezer képet, amelyekre ráírtuk, hogy „macska” vagy „nem macska”, és a gép maga keresi meg, mi a közös bennük. Ezt hívjuk **gépi tanulásnak**.',
          tip: 'Hasonlat: a hagyományos program olyan, mint egy recept. A tanuló gép olyan, mint egy kezdő szakács, aki sok kóstolás és javítás után rájön, mitől jó a leves.'
        },
        {
          title: 'Mit nem tud az MI? (Tévhitek)',
          text: '- **„Az MI gondolkodik és érez, mint egy ember.”** Nincs bizonyíték arra, hogy a mai MI-rendszereknek érzéseik vagy tudatuk lenne. Az emberi nyelvet nagyon jól utánozzák, ezért könnyű „embernek” érezni őket.\n- **„Az MI mindent tud.”** Csak abból tud, amiből tanult, és gyakran magabiztosan téved.\n- **„Az MI tárgyilagos, mert gép.”** Ha a tanítóadatokban előítélet van, a gép is megtanulja.\n- **„Az MI = robot.”** A robot egy test, ami mozog. Lehet benne MI, de a legtöbb MI csak program a telefonodban vagy egy szerveren.\n- **„Az MI magától akar valamit.”** A mai rendszerek nem tűznek ki saját célokat úgy, mint az ember: azt a feladatot végzik, amire tervezték és amire utasítják őket. Hogy a jövő egyre önállóbb rendszereit hogyan lehet biztonságosan irányítani, azon kutatók dolgoznak.',
          widget: { type: 'parositas', options: { title: 'Párosítsd!', count: 6, pairs: [
            ['Hagyományos program', 'a programozó által leírt szabályokat követi'],
            ['Gépi tanulás', 'a gép példákból keresi meg a szabályt'],
            ['Szűk MI', 'egyetlen feladatban ügyes'],
            ['Robot', 'mozogni képes gép, amiben lehet MI'],
            ['Tanítóadat', 'a példák, amikből a gép tanul'],
            ['Címke', 'a helyes válasz, amit egy példához odaírunk'],
            ['Algoritmus', 'egy feladat lépésenkénti, pontos leírása']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi a gépi tanulás lényege?', options: ['A programozó minden szabályt kézzel leír', 'A gép sok példából maga keresi meg a szabályszerűséget', 'A gép az interneten bármit megnéz', 'A gép véletlenszerűen válaszol'], answer: 1, explain: 'A gép a megcímkézett példákból tanulja meg, mi jellemző az egyes csoportokra.' },
        { q: 'Melyik állítás IGAZ a mai MI-re?', options: ['Bizonyítottan érzései vannak', 'Mindig igazat mond', 'Abból tud, amiből tanult, és tévedhet', 'Minden MI egy robot'], answer: 2, explain: 'A mai MI a tanítóadataiból dolgozik, és gyakran magabiztosan téved.' },
        { q: 'Miért nehéz szabályokkal leírni, mitől macska egy macska a képen?', options: ['Mert a macskák nagyon különbözőek lehetnek, és a szabályok sosem érnének véget', 'Mert a számítógép nem lát színeket', 'Mert a macska túl kicsi', 'Mert ez tilos'], answer: 0, explain: 'Szín, testhelyzet, takarás, fény: túl sok a lehetőség. Ezért tanítjuk példákkal.' }
      ]
    },

    /* ───────── 2. Hogyan tanul egy gép? ───────── */
    {
      id: 'hogyan-tanul',
      title: 'Hogyan tanul egy gép?',
      level: 1, minutes: 14,
      summary: 'Adatok, címkék, tippelés, hiba és javítás: így lesz egy buta programból ügyes felismerő. Tanítsd meg te magad!',
      tags: ['gépi tanulás', 'tanítóadat', 'címke', 'hiba', 'javítás', 'tanítás', 'tesztelés', 'túltanulás', 'döntési határ', 'perceptron'],
      terms: ['msc-gepi-tanulas/erm', 'msc-gepi-tanulas/gradiens-modszer', 'msc-gepi-tanulas/tulilleszkedes', 'msc-gepi-tanulas/logisztikus-regresszio'],
      sections: [
        {
          title: 'A tanulás négy lépése',
          text: 'Képzeld el, hogy egy gépnek meg kell tanulnia szétválogatni az almát és a körtét.\n\n1. **Adatok és címkék**: sok gyümölcsről megmérjük, milyen kerek és milyen színű, és mindegyikhez odaírjuk a helyes választ (a **címkét**): „alma” vagy „körte”.\n2. **Tippelés**: a gép eleinte találomra tippel, hiszen még semmit sem tud.\n3. **Hiba**: összevetjük a tippet a címkével. Ahol tévedett, ott hibát számolunk: minél nagyobb a tévedés, annál nagyobb a hiba.\n4. **Javítás**: a gép egy kicsit átállítja a belső „gombjait” (számait) úgy, hogy legközelebb kisebb legyen a hiba.\n\nEzt a kört a gép **sok ezerszer** megismétli. A végén a beállításai olyanok lesznek, hogy a legtöbb gyümölcsöt jól sorolja be.',
          tip: 'A „belső gombok” egyszerű számok. Egy nagy MI-ben ezekből elképesztően sok van, de a tanulás elve ugyanaz: tipp, hiba, kis javítás, újra.'
        },
        {
          title: 'Próbáld ki: tanítsd a gépet!',
          text: 'Rakj le pontokat két színben (ezek a példák és a címkéik), aztán indítsd a tanítást. A háttér színe mutatja, mit gondol a gép az adott helyről, a vonal pedig a **határ**, ahol „átvált” a véleménye.\n\nKísérletezz:\n\n- Ha a két csoport jól elkülönül, már egy **egyenes vonal** is elég.\n- Válaszd a **Kör** vagy a **Sakktábla** példát! Egyenes vonallal ezt nem lehet megoldani, a **kis háló** viszont meg tudja.\n- Állítsd nagyon nagyra a **lépésközt**: a gép „túllő” a célon, és ide-oda ugrál.',
          widget: { type: 'mi-tanito' }
        },
        {
          title: 'Gyakorlás vagy magolás? A tesztelés',
          text: 'Honnan tudjuk, hogy a gép tényleg megtanult valamit, és nem csak bemagolta a példákat? Ugyanúgy, mint az iskolában: **új feladatot** adunk neki, amit még nem látott.\n\nEzért a példák egy részét félretesszük, és csak a tanítás végén mutatjuk meg a gépnek. Ez a **tesztelés**.\n\n- Ha a tanítópéldákon szinte hibátlan, de az új példákon sokat hibázik, akkor **bemagolt** (a szakemberek ezt túltanulásnak hívják).\n- Ha már a tanítópéldákon is sokat hibázik, akkor túl egyszerű a „feje” a feladathoz.',
          warn: 'A gép csak azt tanulja meg, amit a példák mutatnak. Ha minden almás képen napsütés van, és minden körtés képen felhő, könnyen azt tanulja meg, hogy „napsütés = alma”!'
        },
        {
          title: 'Többféle tanulás',
          text: '- **Tanítóval** (felügyelt tanulás): minden példához ott a helyes válasz, mint a fenti játékban.\n- **Tanító nélkül**: nincs címke, a gép maga keres csoportokat (például hasonló vásárlási szokású embereket).\n- **Jutalommal és büntetéssel**: a gép próbálkozik, és pontot kap, ha jól csinálta. Így tanulnak meg gépek játékokat játszani vagy robotkarok tárgyakat megfogni.'
        }
      ],
      quiz: [
        { q: 'Mi a „címke” a gépi tanulásban?', options: ['A program neve', 'A helyes válasz, amit egy példához odaírunk', 'A számítógép márkája', 'A hiba mértéke'], answer: 1, explain: 'Például egy képhez odaírt „macska” szó a címke.' },
        { q: 'A gép a tanítópéldákon hibátlan, de az új példákon sokat téved. Mi történt?', options: ['Túl kevés ideig tanult', 'Bemagolta a példákat ahelyett, hogy általános szabályt tanult volna', 'Elromlott a processzor', 'Túl sok új példát kapott'], answer: 1, explain: 'Ezt túltanulásnak hívják: a gép a tanítópéldák apró részleteit is megjegyezte.' },
        { q: 'Miért teszünk félre példákat, amiket a gép tanítás közben nem lát?', options: ['Hogy gyorsabb legyen a tanítás', 'Hogy a végén ellenőrizzük, új esetekben is jól dönt-e', 'Mert azok rosszak', 'Hogy kevesebb áramot fogyasszon'], answer: 1, explain: 'Ez a tesztelés: csak új példán derül ki, hogy tényleg tanult-e.' }
      ]
    },

    /* ───────── 3. Neurális hálók ───────── */
    {
      id: 'neuralis-halok',
      title: 'Neurális hálók egyszerűen',
      level: 2, minutes: 14,
      summary: 'Apró számolóegységek, amelyek rétegekbe rendezve bonyolult mintákat ismernek fel. Építs saját hálót!',
      tags: ['neurális háló', 'neuron', 'réteg', 'súly', 'rejtett réteg', 'mély tanulás', 'XOR', 'aktiváció', 'agy'],
      terms: ['msc-gepi-tanulas/perceptron-mlp', 'msc-gepi-tanulas/backprop', 'msc-gepi-tanulas/cnn'],
      sections: [
        {
          title: 'Egy mesterséges neuron',
          text: 'Az agyunkban idegsejtek (neuronok) adják tovább egymásnak a jeleket. A mesterséges neuron ennek egy **nagyon leegyszerűsített** számolós változata:\n\n1. Kap néhány számot (például egy kép pár pontjának világosságát).\n2. Mindegyiket megszorozza egy saját **súllyal**: a fontos bemenet nagy súlyt kap, a lényegtelen kicsit, ami „ellene szól”, az negatívat.\n3. Összeadja az eredményeket.\n4. Ha az összeg elég nagy, „bekapcsol”, és továbbad egy nagy számot; ha kicsi, csendben marad.\n\nPélda: „Menjek-e ki focizni?” Bemenetek: süt-e a nap (+2), van-e házi feladat (−3), jönnek-e a barátaim (+3). Ha az összeg pozitív: irány a pálya!',
          tip: 'A mesterséges neuron csak távolról hasonlít az igazi idegsejtre. A név inkább az ötlet eredetére utal, mint arra, hogy a háló úgy működne, mint az agy.'
        },
        {
          title: 'Rétegek: egyszerűtől a bonyolultig',
          text: 'Egyetlen neuron csak egyszerű döntést tud hozni: a síkon például csak **egyenes vonallal** tud elválasztani. Ha viszont sok neuront **rétegekbe** rendezünk, és az egyik réteg eredménye a következő bemenete lesz, a háló egyre bonyolultabb mintákat ismer fel.\n\nEgy képfelismerő hálóban például:\n\n- az első rétegek **éleket és foltokat** vesznek észre,\n- a középsők ezekből **formákat** (kör, csík, szem alakú folt),\n- a későbbiek **tárgyrészeket** (fül, kerék, ablak),\n- a végén pedig a döntés: „ez egy macska”.\n\nA bemenet és a kimenet közötti rétegeket **rejtett rétegeknek** hívjuk. Ha sok ilyen van, **mély** hálóról és **mély tanulásról** beszélünk.'
        },
        {
          title: 'Játszótér: építs hálót!',
          text: 'Itt te döntöd el, hány rejtett réteg és hány neuron legyen. Kísérletek:\n\n1. Válaszd a **Sakktábla (XOR)** adatot, és vedd el az összes rejtett réteget. Megoldja?\n2. Adj hozzá **egy réteget 2–4 neuronnal**. Most?\n3. A **Kör** adatnál kapcsold be a „távolság” jelölőnégyzetet rejtett réteg nélkül: ha jó **jellemzőt** adunk a gépnek, egyszerűbb fej is elég!\n4. A **Spirál** nehéz: kell hozzá több réteg és türelem.\n\nFigyeld a vonalakat: tanulás közben a súlyok erőssége és színe változik.',
          widget: { type: 'mi-halo' }
        },
        {
          title: 'Hogyan tanul a háló?',
          text: 'Ugyanúgy, mint az előző leckében: tipp, hiba, javítás. A különbség, hogy itt rengeteg súly van, és a gépnek ki kell találnia, **melyik súly mennyire felelős** a hibáért.\n\nEhhez a hibát a kimenettől **visszafelé**, rétegről rétegre „visszaküldi” a hálón, és minden súlyt egy picit abba az irányba igazít, amerre csökken a hiba. A hálót tehát senki nem „programozza be” súlyonként: a súlyok a tanulás során alakulnak ki.\n\nEzért van az is, hogy egy nagy hálóról sokszor **nehéz megmondani, miért** döntött úgy, ahogy: a tudása milliónyi apró számban van szétszórva.',
          warn: 'Egy nagy háló tanításához hatalmas mennyiségű adat és számítás kell. A számítógépek közül a videokártyák (GPU-k) azért népszerűek erre, mert rengeteg egyszerű szorzást tudnak egyszerre elvégezni (lásd: [[#/lecke/informatika/szamitogep|Hogyan működik a számítógép?]]).'
        }
      ],
      quiz: [
        { q: 'Mit csinál egy mesterséges neuron?', options: ['Megszorozza a bemeneteit súlyokkal, összeadja őket, és ez alapján „bekapcsol” vagy sem', 'Elektromos jelet küld az agyba', 'Képeket tárol', 'Szavakat fordít'], answer: 0, explain: 'Súlyozott összeg, majd egy egyszerű „kapcsoló”: ennyi egy mesterséges neuron.' },
        { q: 'Miért kellenek rejtett rétegek?', options: ['Hogy a háló titkos legyen', 'Hogy bonyolultabb, nem egyenes vonallal elválasztható mintákat is felismerjen', 'Hogy kevesebb áramot fogyasszon', 'Csak díszítésnek'], answer: 1, explain: 'Egy neuron csak egyenes határt tud húzni, a rétegek egymásra épülve bonyolult határokat is.' },
        { q: 'Honnan kerülnek a háló súlyai a helyükre?', options: ['A programozó egyenként beírja őket', 'A tanulás során, a hiba csökkentésével alakulnak ki', 'Az internetről töltődnek le', 'Mindig véletlenek maradnak'], answer: 1, explain: 'Véletlen kezdőértékekből indulnak, és a tanulás során lépésről lépésre igazodnak.' }
      ]
    },

    /* ───────── 4. Nagy nyelvi modellek ───────── */
    {
      id: 'nyelvi-modellek',
      title: 'Nagy nyelvi modellek: hogyan „beszél” a gép?',
      level: 2, minutes: 15,
      summary: 'Szóelőrejelzés, tokenek, „hőmérséklet” – és miért mondhat a csevegőrobot magabiztosan valótlant.',
      tags: ['nagy nyelvi modell', 'LLM', 'csevegőrobot', 'chatbot', 'token', 'szóelőrejelzés', 'hallucináció', 'hőmérséklet', 'prompt', 'utasítás'],
      terms: ['msc-gepi-tanulas/figyelem', 'msc-gepi-tanulas/keresztentropia', 'msc-gepi-tanulas/rnn'],
      sections: [
        {
          title: 'A legnagyobb trükk: a következő szó kitalálása',
          text: 'Egészítsd ki: „Süt a nap, kék az …” Ugye azonnal tudtad, hogy „ég”? A **nagy nyelvi modellek** (a csevegőrobotok „agya”) alapjában ugyanezt csinálják: egy szöveg alapján megbecsülik, **mi jöhet következőnek**, aztán a kiválasztott darabot hozzáteszik a szöveghez, és kezdik elölről.\n\nEhhez a tanítás során **hatalmas mennyiségű szöveget** „olvasnak”: könyveket, cikkeket, weboldalakat. Közben rengeteg mintázatot tanulnak meg: nyelvtant, tényeket, stílusokat, érvelési fordulatokat.\n\nUtána általában egy második tanítás következik: emberek által írt és értékelt példákon tanulják meg, hogyan legyenek **segítőkész és biztonságos** beszélgetőtársak.',
          tip: 'Egy válasz tehát nem egy adatbázisból előkeresett kész szöveg, hanem darabról darabra, „élőben” születik.'
        },
        {
          title: 'Próbáld ki: egy apró nyelvi modell',
          text: 'Ez a mini modell csak egy rövid mesét ismer, és csak az **előző egy szót** nézi. Az igazi modellek sokkal hosszabb szövegrészt vesznek figyelembe, és sokkal finomabban számolnak, de az alapötlet ugyanez: **valószínűség, aztán választás**.\n\nFigyeld meg:\n\n- Alacsony **hőmérsékleten** mindig ugyanazt írja, magason „kreatívabb”, de több butaságot is mond.\n- Előbb-utóbb olyan mondatot is írhat, ami **nincs** a szövegben, például hogy a macska tud repülni. Nyelvtanilag hibátlan, csak éppen nem igaz!',
          widget: { type: 'mi-kovetkezo-szo' }
        },
        {
          title: 'Tokenek: a gép szódarabjai',
          text: 'A nyelvi modellek valójában nem egész szavakkal dolgoznak, hanem **tokenekkel**: gyakori szavakkal, szódarabokkal, írásjelekkel. A gyakori rövid szavak gyakran egy tokent jelentenek, a ritka vagy hosszú szavakat a modell több darabra vágja.\n\nA magyar szavak sok toldalékot kapnak (ház – házaimban), ezért egy magyar szöveg gyakran **több tokenre** esik szét, mint ugyanannak az angol fordítása.\n\nEz megmagyaráz néhány furcsaságot is: ha megkérdezed, hány „r” betű van egy hosszú szóban, a modell néha elszámolja, mert ő nem betűket „lát”, hanem szódarabokat.'
        },
        {
          title: 'Miért „hallucinál”?',
          text: 'Ha a modell valótlant állít, de nagyon meggyőzően, azt **hallucinációnak** hívjuk. Miért fordul elő?\n\n- A modell célja tanítás közben az volt, hogy **jól hangzó, valószínű** szöveget írjon. A „valószínű” és az „igaz” általában együtt jár, de **nem mindig**.\n- Ha valamiről kevés vagy ellentmondó szöveget látott (ritka téma, friss esemény, egy kis falu története), akkor is folytatja a mondatot, és kitölti a hézagot valami hihetővel.\n- Kitalálhat **nem létező forrást**, idézetet, évszámot, mert ezek „formája” ismerős neki.\n\nA fejlesztők sokat tesznek ellene (például a modell kereshet a weben, vagy megmondhatja, ha bizonytalan), és a hibák ritkulnak, de teljesen nem tűntek el.',
          warn: 'Fontos tényt, számot, idézetet, forrást mindig ellenőrizz megbízható helyen! Különösen egészségügyi, jogi és pénzügyi kérdésekben.'
        },
        {
          title: 'Hogyan kérdezz jól?',
          text: '- **Adj hátteret**: „8. osztályos vagyok, egyszerűen magyarázd el…”\n- **Légy pontos**: mit kérsz, milyen hosszan, milyen formában.\n- **Kérj magyarázatot és forrást**, és nézd is meg a forrást.\n- **Kérdezz vissza**, ha valami gyanús: „Biztos vagy benne? Honnan tudod?”\n- **Ne adj meg személyes adatot** (lakcím, jelszó, mások adatai). Erről bővebben a felelős használatról szóló leckében.'
        }
      ],
      quiz: [
        { q: 'Mi a nagy nyelvi modellek alapfeladata?', options: ['Egy szöveg alapján megbecsülni, mi jön következőnek', 'Kész válaszokat kikeresni egy adatbázisból', 'Képeket nagyítani', 'Számokat rendezni'], answer: 0, explain: 'Darabról darabra, a következő token valószínűségei alapján építik a választ.' },
        { q: 'Mi a hallucináció egy nyelvi modellnél?', options: ['Amikor a modell lassan válaszol', 'Amikor magabiztosan, meggyőzően állít valótlant', 'Amikor képet rajzol', 'Amikor elfelejti a jelszavát'], answer: 1, explain: 'A modell jól hangzó szöveget ír, ami nem mindig igaz, például nem létező forrást talál ki.' },
        { q: 'Mit csinál a „hőmérséklet” beállítás?', options: ['Hűti a számítógépet', 'Szabályozza, mennyire válasszon a modell a kevésbé valószínű folytatások közül is', 'Megváltoztatja a nyelvet', 'Megmondja a mai időjárást'], answer: 1, explain: 'Alacsony hőmérsékleten óvatosabb és ismétlődőbb, magason változatosabb, de több hibát is ejt.' }
      ]
    },

    /* ───────── 5. Képfelismerés és képgenerálás ───────── */
    {
      id: 'kepek',
      title: 'Képfelismerés és képgenerálás',
      level: 2, minutes: 12,
      summary: 'Hogyan „lát” egy gép, hogyan lesz zajból kép, és hol vannak a korlátok.',
      tags: ['képfelismerés', 'gépi látás', 'pixel', 'arcfelismerés', 'képgenerálás', 'diffúzió', 'zaj', 'deepfake', 'orvosi képalkotás', 'önvezető autó'],
      terms: ['msc-gepi-tanulas/cnn'],
      sections: [
        {
          title: 'A kép a gép számára: számok',
          text: 'Egy digitális kép apró pontokból, **pixelekből** áll, és minden pixel színe néhány szám (lásd: [[#/lecke/informatika/szamrendszerek|hogyan lesz a képből szám]]). Egy telefonos fotó több millió pixel, vagyis a gépnek egy óriási számtáblázatot kell „értelmeznie”.\n\nA képfelismerő hálók kis „ablakokkal” végigpásztázzák a képet, és mindenhol ugyanazokat a mintákat keresik: éleket, foltokat, mintázatokat. Ezekből rakják össze a nagyobb formákat. Így mindegy, hogy a macska a kép bal sarkában vagy a közepén van.',
          tip: 'Hol találkozol vele? Telefonos arcfelismerés, a fotóalbum, ami „megtalálja a kutyás képeket”, rendszámfelismerő kamera, orvosi röntgen- és CT-képek elemzése, gyári minőségellenőrzés, önvezető és vezetéstámogató rendszerek.'
        },
        {
          title: 'Ahol a gépi látás hibázik',
          text: '- **Szokatlan helyzet**: ha a tanítóképeken a tehenek mindig füves legelőn álltak, egy homokos tengerparton álló tehenet a gép nehezebben ismer fel.\n- **Apró, embernek láthatatlan változtatások**: egy képen pár pixelt ügyesen módosítva néha teljesen más eredményt ad a gép, pedig mi semmi különbséget nem látunk.\n- **Torz tanítóadat**: ha egy arcfelismerőt főleg egyfajta arcokon tanítottak, másfajta arcoknál többet hibázhat. Ez komoly igazságtalansághoz vezethet.\n\nEzért fontos döntéseknél (orvosi diagnózis, rendőrségi azonosítás) a gép **csak segít**, és ember ellenőriz.'
        },
        {
          title: 'Képgenerálás: zajból kép',
          text: 'A képgeneráló MI egy szöveges leírásból („egy róka űrhajósruhában, akvarellstílusban”) új képet készít. Egy elterjedt módszer működése egyszerűsítve:\n\n1. **Tanítás**: rengeteg képet fokozatosan „összezajosítanak”, amíg csak tévéhavazás-szerű zaj marad. A gép megtanulja ezt a folyamatot **visszafelé**: egy kicsit zajos képből kicsit kevésbé zajosat csinálni.\n2. **Rajzolás**: tiszta zajból indul, és sok lépésben, a leírás alapján „kitisztítja”, amíg egy új kép elő nem bukkan.\n\nA gép tehát nem egy meglévő képet keres elő, hanem a tanult mintákból **újat rak össze**. Hasonló elven készülhet videó és hang is.',
          warn: 'Valakiről a beleegyezése nélkül megtévesztő vagy megalázó képet, videót készíteni és terjeszteni súlyosan bántó, és bűncselekmény is lehet. Erről a felelős használat leckében lesz szó.'
        },
        {
          title: 'Fogalmak',
          text: 'Párosítsd a fogalmakat!',
          widget: { type: 'parositas', options: { title: 'Gépi látás és képgenerálás', count: 6, pairs: [
            ['Pixel', 'a digitális kép legkisebb pontja'],
            ['Képfelismerés', 'a gép eldönti, mi látható a képen'],
            ['Képgenerálás', 'leírás alapján új kép készítése'],
            ['Zaj', 'véletlenszerű, „havazásszerű” pontok'],
            ['Deepfake', 'MI-vel hamisított, valóságosnak tűnő kép, hang vagy videó'],
            ['Torz tanítóadat', 'egyoldalú példák, amelyek miatt a gép egyes csoportoknál többet hibázik'],
            ['Arcfelismerés', 'egy arc alapján egy személy azonosítása']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi a kép a számítógép számára?', options: ['Egy rajz, amit szemmel néz', 'Pixelek színét leíró számok hatalmas táblázata', 'Egy hangfájl', 'Egy szöveg'], answer: 1, explain: 'Minden pixel néhány szám; a gép ezekkel a számokkal dolgozik.' },
        { q: 'Hogyan működik egyszerűsítve egy elterjedt képgeneráló módszer?', options: ['Kikeres egy kész képet az internetről', 'Zajból indulva lépésenként „kitisztít” egy új képet a leírás alapján', 'Lefényképezi a képernyőt', 'Összevág két fotót'], answer: 1, explain: 'A gép megtanulta, hogyan lehet zajos képből kevésbé zajosat csinálni, és ezt sokszor ismétli.' },
        { q: 'Miért ellenőrzi ember az orvosi képeken a gép javaslatát?', options: ['Mert a gép hibázhat, különösen szokatlan esetekben, és a döntésért ember felel', 'Mert a gép nem lát színeket', 'Mert a törvény tiltja a számítógépet a kórházban', 'Mert a gép lassabb'], answer: 0, explain: 'A gép jó segítség lehet, de tévedhet, és a felelősség az orvosé.' }
      ]
    },

    /* ───────── 6. MI a mindennapokban ───────── */
    {
      id: 'mindennapok',
      title: 'MI a mindennapokban',
      level: 1, minutes: 11,
      summary: 'Ajánlórendszerek, navigáció, fordítás, spamszűrő, hangasszisztens: hol dolgozik csendben az MI, és mit tud rólad.',
      tags: ['ajánlórendszer', 'algoritmus', 'közösségi média', 'navigáció', 'útvonaltervező', 'gépi fordítás', 'spamszűrő', 'hangasszisztens', 'beszédfelismerés', 'buborék', 'figyelem'],
      terms: ['msc-gepi-tanulas/kmeans'],
      sections: [
        {
          title: 'Ajánlórendszerek: „Ez is tetszhet…”',
          text: 'Videómegosztók, zeneszolgáltatók, webshopok és közösségi oldalak mind azt próbálják kitalálni, mi érdekelhet. Ehhez figyelik:\n\n- mit néztél meg, meddig, mit hagytál ki,\n- mit kedveltél, osztottál meg, kerestél,\n- mit szerettek a **hozzád hasonló** felhasználók.\n\nEbből a gép megjósolja, melyik tartalomra fogsz a legnagyobb eséllyel kattintani, és azt teszi előre.\n\nEz kényelmes, de van árnyoldala: sok szolgáltatás célja, hogy **minél tovább** ott tartson. Az ajánlások ezért néha egyre szélsőségesebb vagy egyoldalúbb tartalom felé terelnek, és könnyen kialakul egy **buborék**, amelyben csak azt látod, amit már amúgy is gondoltál.',
          tip: 'Tipp: időnként nézz meg tudatosan mást is, használd a „nem érdekel” gombot, és állíts be időkorlátot. Te irányítsd az ajánlót, ne ő téged!'
        },
        {
          title: 'Navigáció, fordítás, spamszűrő',
          text: '- **Útvonaltervező**: a térkép és a forgalmi adatok (sok telefon névtelenített helyadata, korábbi napok forgalma) alapján megbecsüli, melyik út lesz a leggyorsabb, és mikor érsz oda. A legrövidebb út megkeresése klasszikus algoritmus, a **forgalom előrejelzése** az, ahol a gépi tanulás segít.\n- **Gépi fordítás**: ma már a fordítók is neurális hálók, amelyek sok millió lefordított mondatpáron tanultak. Mindennapi szövegekben meglepően jók, de szólásokban, szakszövegben, finom árnyalatokban tévedhetnek.\n- **Spamszűrő**: sok kéretlen és rendes levél alapján tanulja meg, mi a gyanús. Ez az egyik legrégebbi hétköznapi gépi tanulási alkalmazás.\n- **Hangasszisztens, diktálás, feliratozás**: a beszédfelismerő a hanghullámból szöveget csinál.\n- **Banki csalásfigyelés**: ha a kártyádat szokatlan helyen, szokatlan összegre használják, a gép riaszt.\n- **Telefonkamera**: az esti fotó azért szép, mert a gép több képből rakja össze és zajtalanítja.'
        },
        {
          title: 'Mit tud rólad a gép?',
          text: 'A legtöbb ingyenes szolgáltatás az **adataidból** és a figyelmedből él: ezekből tanul, ezek alapján mutat hirdetést. Néhány jó szokás:\n\n- Nézd át az alkalmazások **engedélyeit** (helyadat, mikrofon, névjegyek): kell ez neki?\n- Az EU-ban jogod van megtudni, milyen adatot tárolnak rólad, és kérheted a törlését (**GDPR**).\n- Gondold át, mit töltesz fel: ami egyszer kikerült, azt nehéz visszaszedni.\n\nAz adatbiztonság alapjairól az [[#/lecke/informatika/adatbiztonsag|Informatika tantárgyban]] is olvashatsz.'
        }
      ],
      quiz: [
        { q: 'Mi alapján dönti el egy ajánlórendszer, mit mutasson neked?', options: ['Véletlenszerűen', 'Abból, mit néztél, kedveltél, és mit szerettek a hozzád hasonló felhasználók', 'A telefonod színe alapján', 'Csak az ábécérend alapján'], answer: 1, explain: 'A korábbi viselkedésedből és a hasonló felhasználókéból jósol.' },
        { q: 'Mit jelent a „buborék” a közösségi médiában?', options: ['Egy szappanos játékot', 'Hogy az ajánlások miatt főleg olyat látsz, ami a már meglévő véleményedet erősíti', 'Egy új telefonfunkciót', 'Hogy lassú az internet'], answer: 1, explain: 'Az ajánló azt mutatja, amire valószínűleg kattintasz, így beszűkülhet, amit a világból látsz.' },
        { q: 'Mire használja a gépi tanulást egy útvonaltervező leginkább?', options: ['A forgalom és a menetidő előrejelzésére', 'Az utak megépítésére', 'A benzin árának beállítására', 'A KRESZ megírására'], answer: 0, explain: 'A forgalmi adatok alapján jósolja, hol lesz dugó és mikor érsz oda.' }
      ]
    },

    /* ───────── 7. Felelős használat ───────── */
    {
      id: 'felelos-hasznalat',
      title: 'Felelős használat: adatok, jogok, hamisítványok',
      level: 2, minutes: 15,
      summary: 'Adatvédelem, szerzői jog, előítéletes gépek, deepfake-ek felismerése és a legfontosabb szokás: az ellenőrzés.',
      tags: ['adatvédelem', 'személyes adat', 'GDPR', 'szerzői jog', 'torzítás', 'előítélet', 'deepfake', 'hamis hír', 'álhír', 'ellenőrzés', 'tényellenőrzés', 'EU MI-rendelet', 'csalás', 'hangklónozás'],
      terms: ['msc-gepi-tanulas/fairness', 'msc-gepi-tanulas/adatszivargas'],
      sections: [
        {
          title: 'Adatvédelem: mit ne írj be?',
          text: 'Amit egy online MI-szolgáltatásba beírsz vagy feltöltesz, az a szolgáltató szerverére kerül. Szolgáltatótól és beállítástól függően a beszélgetéseket tárolhatják, és felhasználhatják a modellek fejlesztésére is.\n\n**Ne írd be:**\n\n- jelszavaidat, bankkártya-adataidat,\n- lakcímedet, telefonszámodat, személyi okmányaid adatait,\n- **más emberek** személyes adatait, fotóit, üzeneteit,\n- egészségügyi vagy más érzékeny adataidat,\n- iskolai vagy munkahelyi bizalmas dokumentumokat engedély nélkül.\n\nNézd meg a beállításokat: sok szolgáltatásnál kikapcsolható, hogy a beszélgetéseidből tanuljanak.'
        },
        {
          title: 'Szerzői jog és tisztesség',
          text: '- Egy MI-vel készített szöveg vagy kép felhasználásakor is figyelni kell mások jogaira: ha valaki más **művét** (rajzát, fotóját, szövegét) töltöd fel és alakítod át, az ő jogai továbbra is érvényesek.\n- Hogy kié egy MI által készített mű, és szabad-e mások műveiből tanítani a gépeket, arról a világban még **viták és perek** folynak, a szabályok országonként eltérnek és változnak.\n- Iskolában és munkában az a tisztességes, ha **jelzed**, mit készítettél MI segítségével.\n\nA szerzői jog és a licencek alapjai: [[#/lecke/informatika/adatbiztonsag|Informatika – adatbiztonság és netikett]].'
        },
        {
          title: 'Torzítás: az előítéletes gép',
          text: 'A gép abból tanul, amit mutatunk neki. Ha a múltbeli adatokban **igazságtalanság** volt, a gép azt is megtanulja, sőt fel is erősítheti.\n\nPéldák arra, mi történhet:\n\n- Egy önéletrajz-szűrő, amit olyan régi felvételi döntéseken tanítottak, ahol egy csoportot hátrányosan kezeltek, maga is hátrányosan kezelheti ezt a csoportot.\n- Egy arcfelismerő, amit főleg egyfajta arcokon tanítottak, másfajta arcokon többet hibázhat.\n- Egy képgenerátor „orvost” kérve főleg egyfajta embert rajzol, mert a tanítóképeken is ez volt túlsúlyban.\n\nEzért kell a fontos döntést hozó rendszereket **ellenőrizni**, és ezért fontos, hogy ilyen döntésnél ember is felelős legyen.'
        },
        {
          title: 'Deepfake: amikor nem hihetsz a szemednek',
          text: 'A **deepfake** MI-vel készült hamis kép, hang vagy videó, amelyen valaki olyat mond vagy tesz, amit a valóságban soha. Néhány másodpercnyi hangfelvételből ma már valószerűen utánozható valakinek a hangja.\n\n**Árulkodó jelek** (de egyre ritkábban láthatók!):\n\n- a száj mozgása nem illik a hanghoz, furcsa a pislogás,\n- torz kéz, fülbevaló, fogak, olvashatatlan feliratok,\n- a haj vagy az arc széle „beleolvad” a háttérbe, furcsa árnyékok,\n- túl sima, „műanyag” bőr, élettelen hang.\n\n**A legfontosabb nem a pixeleket nézni, hanem a forrást:** ki tette közzé? Megjelent máshol is, megbízható helyen? Sürget, ijesztget, pénzt kér? Az Európai Unió MI-rendelete (2024-ben lépett hatályba, és lépcsőzetesen alkalmazandó) előírja, hogy a mesterségesen előállított, valóságosnak tűnő tartalmat jelölni kell, de a csalók nem tartják be a szabályokat.',
          widget: { type: 'mi-valodi-kviz' }
        },
        {
          title: 'Az aranyszabály: ellenőrizd!',
          text: '1. **Forrás**: honnan származik az állítás? Az MI által említett forrást nyisd is meg!\n2. **Második forrás**: találsz-e független, megbízható helyet, ahol ugyanez áll?\n3. **Józan ész**: túl szép, túl ijesztő, túl sürgős? Ez mindig intő jel.\n4. **Kérdezz embert**: tanárt, szülőt, szakembert, ha fontos a döntés.\n\nHa valakiről bántó hamisítvány terjed (rólad vagy egy osztálytársadról): **ne oszd tovább**, mentsd el a bizonyítékot, jelentsd a platformon, és szólj egy megbízható felnőttnek.'
        }
      ],
      quiz: [
        { q: 'Mit NE írj be egy online csevegőrobotba?', options: ['Egy matekfeladat szövegét', 'A jelszavadat vagy egy osztálytársad személyes adatait', 'Egy kérdést a történelemórához', 'Egy receptkérést'], answer: 1, explain: 'A beírt adatok a szolgáltatóhoz kerülnek; jelszó és mások adatai nem valók oda.' },
        { q: 'Miért lehet egy MI-rendszer előítéletes?', options: ['Mert a gépeknek saját véleményük van', 'Mert a tanítóadatokban lévő igazságtalanságot is megtanulhatja', 'Mert túl gyors', 'Mert kevés az áram'], answer: 1, explain: 'A gép a példákból tanul, a példák hibáival együtt.' },
        { q: 'Mi a legmegbízhatóbb módja egy gyanús videó ellenőrzésének?', options: ['Megnézni, hány like-ot kapott', 'Megnézni az eredeti forrást, és keresni független, megbízható forrásokat', 'Minél gyorsabban továbbküldeni', 'Csak a videó minőségét nézni'], answer: 1, explain: 'A képi hibák egyre ritkábbak; a forrás ellenőrzése a legbiztosabb.' }
      ]
    },

    /* ───────── 8. MI a tanulásban ───────── */
    {
      id: 'mi-a-tanulasban',
      title: 'MI a tanulásban: segítség vagy csalás?',
      level: 1, minutes: 12,
      summary: 'Mire jó az MI tanuláskor, mire nem, mit mondanak az iskolai szabályok, és hol a határ a segítség és a csalás között.',
      tags: ['tanulás', 'házi feladat', 'csalás', 'plágium', 'iskolai szabályok', 'házirend', 'magyarázat', 'gyakorlás', 'kikérdezés', 'fogalmazás', 'forrásmegjelölés'],
      sections: [
        {
          title: 'Mire jó?',
          text: 'Jól használva az MI egy türelmes, éjjel is elérhető **gyakorlótárs**:\n\n- **Magyarázat másképp**: „Magyarázd el a törtek osztását egy pizzás példával!”\n- **Kikérdezés**: „Kérdezz ki a fotoszintézisből, és csak a válaszom után mondd meg a jó megoldást!”\n- **Gyakorlófeladat**: „Adj 5 hasonló egyenletet, a megoldásokat a végén!”\n- **Visszajelzés a saját munkádra**: „Itt a fogalmazásom. Hol nem érthető? Ne írd át, csak jelezd!”\n- **Tervezés**: „Segíts beosztani a tanulást a témazáróig!”\n- **Nyelvtanulás**: beszélgetés idegen nyelven, javításokkal.',
          tip: 'Az agyad akkor tanul, amikor **te** erőlködsz: felidézel, megoldasz, megfogalmazol. Ha a gép végzi el helyetted a gondolkodást, a dolgozaton nem lesz ott veled. A [[#/tanulas|Tanulássegéd]] oldalon tanulási módszereket is találsz.'
        },
        {
          title: 'Mire nem jó?',
          text: '- **Tényforrásnak** önmagában: tévedhet, kitalálhat (lásd a nyelvi modellekről szóló leckét).\n- **Számolásban** néha hibázik: a lépéseket mindig nézd át.\n- **Helyetted gondolkodni**: a kész megoldás bemásolása nem tanulás.\n- **Friss, helyi információra**: a saját iskolád órarendjét, a tanárod elvárásait nem tudja.\n- **Érzelmi bajban**: egy csevegőrobot nem helyettesíti a barátot, a szülőt vagy egy szakembert. Ha nagy baj van, kérj segítséget egy felnőttől vagy segélyvonaltól.'
        },
        {
          title: 'Segítség vagy csalás?',
          text: 'Nincs egyetlen szabály mindenhol: **az iskolád, a tanárod és a feladat** dönti el, mi megengedett. Egy fogalmazásnál lehet, hogy semmilyen MI nem használható, egy kutatási projektben pedig kifejezetten kérik, hogy próbáld ki.\n\nAlapelvek, amelyek szinte mindenhol érvényesek:\n\n- Ha **nem tudod**, mi megengedett, **kérdezd meg** előre a tanárt.\n- Ha használtad, **írd oda**, mire és hogyan (például: „ötletgyűjtéshez és helyesírás-ellenőrzéshez használtam MI-t”).\n- A **saját nevedben** beadott munkának a te tudásodat kell mutatnia.\n- Dolgozatnál, vizsgán tilos a nem engedélyezett segítség, akár puska, akár telefon.\n\nAz is a tisztességhez tartozik, hogy az MI-detektorok sem tévedhetetlenek: ha valakit gyanúsítanak, beszélgetéssel, a munkafolyamat (vázlatok, jegyzetek) megmutatásával lehet tisztázni.',
          widget: { type: 'parositas', options: { title: 'Rendben van vagy nem? Párosítsd a helyzetet a minősítéssel!', count: 6, pairs: [
            ['Megkérem, hogy kérdezzen ki a leckéből', 'jó tanulási segítség'],
            ['Bemásolom a házi feladatot, és a kész választ beadom sajátként', 'csalás'],
            ['A saját fogalmazásomban kérek visszajelzést, de én javítok', 'jó, ha a tanár engedi, és jelzem'],
            ['Dolgozat közben a telefonon kérdezem a gépet', 'tiltott segítség'],
            ['Az MI által említett forrást megnyitom és ellenőrzöm', 'felelős használat'],
            ['Nem tudom, szabad-e, ezért megkérdezem a tanárt', 'a helyes első lépés'],
            ['A gép magyarázatát szóról szóra megtanulom ellenőrzés nélkül', 'kockázatos, mert tévedhet']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik a legjobb módja annak, hogy MI-vel tanulj egy témazáróra?', options: ['Megíratom vele a jegyzetet, és elolvasom egyszer', 'Kikérdeztetem magam, és csak a saját válaszom után nézem meg a megoldást', 'Dolgozat közben használom', 'Semmiképp nem használom, mert mindig téved'], answer: 1, explain: 'A felidézés (kikérdezés) az egyik leghatékonyabb tanulási módszer; a gép ebben jó partner.' },
        { q: 'Nem tudod, szabad-e MI-t használni egy beadandóhoz. Mit teszel?', options: ['Használom, és nem szólok', 'Megkérdezem előre a tanárt', 'Megkérdezem a gépet, szabad-e', 'Egy barátom beadandóját másolom'], answer: 1, explain: 'A szabályt a tanár és az iskola határozza meg.' },
        { q: 'Miért nem elég a kész megoldást bemásolni, még ha helyes is?', options: ['Mert a gép mindig hibás megoldást ad', 'Mert a tanulás a saját gondolkodásodban történik, és a dolgozaton nem lesz ott a gép', 'Mert lassú', 'Mert drága'], answer: 1, explain: 'A tudás attól épül, hogy te oldod meg, idézed fel, fogalmazod meg.' }
      ]
    },

    /* ───────── 9. MI és a munka világa ───────── */
    {
      id: 'munka-vilaga',
      title: 'MI és a munka világa',
      level: 2, minutes: 11,
      summary: 'Mely feladatokat vesz át a gép, melyek maradnak emberinek, milyen új munkák jönnek, és mire érdemes készülni.',
      tags: ['munka', 'munkaerőpiac', 'szakmák', 'automatizálás', 'pályaválasztás', 'készségek', 'új szakmák', 'élethosszig tartó tanulás', 'termelékenység'],
      sections: [
        {
          title: 'Feladatokat vesz át, nem egész embereket',
          text: 'A legtöbb munka sokféle **feladatból** áll. Az MI és az automatizálás általában ezek egy részét veszi át vagy gyorsítja fel:\n\n- **ismétlődő, szabályos** irodai feladatok (adatok átvezetése, egyszerű levelek, összefoglalók),\n- **minták keresése** sok adatban (csalásfigyelés, minőségellenőrzés, képek előszűrése),\n- **első vázlatok** (szöveg, kód, terv), amit aztán ember javít.\n\nNehezebben helyettesíthetők:\n\n- az **emberi kapcsolat** és a bizalom (ápolás, tanítás, tanácsadás),\n- a **kézügyesség változatos, kiszámíthatatlan helyzetekben** (villanyszerelő egy régi házban, fodrász, szakács),\n- a **felelősség és a döntés**: valakinek vállalnia kell, ha baj van,\n- az **új helyzetek** megoldása, ahol nincs korábbi példa.',
          tip: 'Sok szakember már most MI-vel dolgozik: a programozó kódot írat és ellenőriz, az orvos képelemző segítséget kap, a könyvelő gyorsabban dolgozza fel a számlákat. Aki tudja használni, az előnyben lesz.'
        },
        {
          title: 'Új munkák, új feladatok',
          text: 'Minden nagy technikai váltás megszüntetett munkákat, és újakat hozott létre: a gépkocsi a lovaskocsisokét, de jöttek az autószerelők. Az MI körül is születnek új feladatok:\n\n- MI-rendszereket fejlesztő, tanító, karbantartó szakemberek,\n- **adatok** gyűjtése, tisztítása, címkézése,\n- MI-rendszerek **ellenőrzése**, biztonsága, jogi és etikai kérdései,\n- szinte minden szakmában: aki a saját területén **okosan beépíti** az MI-t.\n\nHogy összességében mennyi munka szűnik meg és mennyi jön létre, és milyen gyorsan, arról a kutatók sem értenek egyet. Biztosnak az látszik, hogy a munkák **tartalma** sok helyen változik.'
        },
        {
          title: 'Mire készülj?',
          text: '- **Alapok**: olvasás-szövegértés, matek, logikus gondolkodás. Ezek nélkül az MI eredményét sem tudod ellenőrizni.\n- **Szakmai tudás**: a gép csak jó kérdésre ad jó választ, és csak a szakember veszi észre, ha hibázik.\n- **Emberi készségek**: együttműködés, kommunikáció, empátia, kreativitás.\n- **Tanulni tanulás**: a szerszámok változnak, aki gyorsan tanul, az alkalmazkodik.\n- **MI-jártasság**: tudd, mire jó, mire nem, hogyan kérdezz és ellenőrizz.\n\nSzakmaválasztáshoz nézd meg a [[#/palya|Pályaorientáció]] oldalt!'
        }
      ],
      quiz: [
        { q: 'Melyik feladatot veheti át leginkább az MI?', options: ['Egy beteg megnyugtatását egy nehéz diagnózis után', 'Sok számla adatainak átvezetését egy táblázatba', 'Egy régi ház váratlan villanyszerelési hibájának javítását', 'A felelősségvállalást egy fontos döntésért'], answer: 1, explain: 'Az ismétlődő, szabályos adatfeldolgozás jól automatizálható.' },
        { q: 'Miért fontos a szakmai tudás akkor is, ha MI-vel dolgozunk?', options: ['Mert nélküle nem vesszük észre, ha a gép téved', 'Mert az MI csak szakembereknek működik', 'Mert a törvény előírja', 'Nem fontos'], answer: 0, explain: 'Az MI eredményét ellenőrizni kell, ehhez érteni kell a területhez.' },
        { q: 'Mit mondhatunk biztosan az MI munkaerőpiaci hatásáról?', options: ['Minden munka megszűnik öt éven belül', 'Semmi nem fog változni', 'Sok munka tartalma változik; a pontos mértékről a kutatók vitatkoznak', 'Csak az informatikusokat érinti'], answer: 2, explain: 'A pontos előrejelzés bizonytalan, de a feladatok átalakulása sok területen már látszik.' }
      ]
    },

    /* ───────── 10. Történet ───────── */
    {
      id: 'tortenet',
      title: 'Röviden az MI története',
      level: 1, minutes: 10,
      summary: 'Turing kérdésétől a perceptronon és az „MI-teleken” át a mély tanulásig és a nyelvi modellekig.',
      tags: ['Turing', 'Turing-teszt', 'Dartmouth', 'perceptron', 'Rosenblatt', 'MI-tél', 'szakértői rendszer', 'Deep Blue', 'mély tanulás', 'AlexNet', 'AlphaGo', 'transformer', 'Neumann János', 'Kempelen Farkas', 'Nobel-díj'],
      sections: [
        {
          title: 'Gondolkodhat-e egy gép?',
          text: '**Alan Turing** brit matematikus 1950-ben tette fel a kérdést: gondolkodhatnak-e a gépek? Mivel a „gondolkodást” nehéz meghatározni, egy játékot javasolt helyette: ha egy ember írásban beszélget egy géppel és egy másik emberrel, és nem tudja megbízhatóan megmondani, melyik a gép, akkor a gép „átment” (ezt ma **Turing-tesztnek** hívjuk).\n\nA „mesterséges intelligencia” kifejezést **John McCarthy** és társai használták 1955-ben egy nyári kutatótábor tervezetében; a táborra 1956-ban a Dartmouth College-ban került sor. Ezt tartják az MI-kutatás kezdetének.\n\nMagyar szál: **Neumann János**, a modern számítógép egyik atyja, élete végén azon dolgozott, mi a közös és mi a különböző a számítógépben és az agyban.'
        },
        {
          title: 'Hullámhegyek és „MI-telek”',
          text: '- **1958 – perceptron**: Frank Rosenblatt tanulni képes mesterséges neuront épített, amely egyszerű képeket tudott szétválogatni. Nagy lelkesedést keltett.\n- **1969**: Marvin Minsky és Seymour Papert megmutatta, hogy egyetlen ilyen neuron nagyon egyszerű feladatokat (például a „sakktábla”, XOR mintát) sem tud megoldani. A pénz és a lelkesedés elapadt: ezeket az időszakokat **MI-télnek** hívják.\n- **1980-as évek – szakértői rendszerek**: szakemberek tudását sok ezer „ha… akkor…” szabályba írták. Szűk területen működtek, de nehéz volt bővíteni őket.\n- **1986**: ismertté vált, hogyan lehet **több rétegű** hálót tanítani a hiba visszaterjesztésével.\n- **1997**: az IBM Deep Blue sakkszámítógépe legyőzte Garri Kaszparov világbajnokot (főleg hatalmas számítási erővel, nem tanulással).'
        },
        {
          title: 'A mély tanulás kora',
          text: '- **2012**: egy mély neurális háló videokártyákon tanítva **messze** megnyerte a legnagyobb képfelismerő versenyt. Ettől kezdve robbanásszerűen terjedt a **mély tanulás**: több adat + erősebb gépek + jobb módszerek.\n- **2016**: az AlphaGo program legyőzte a világ egyik legjobb gójátékosát, Lee Sedolt (magyaros átírással I Szedolt). A gót sokáig túl bonyolultnak tartották a gépek számára.\n- **2017**: megjelent a **transformer** nevű hálótípus, amely a „figyelem” ötletén alapul: minden szó „megnézheti”, mely más szavak fontosak a megértéséhez. Erre épülnek a mai nagy nyelvi modellek.\n- **2020-as évek**: a csevegőrobotok és képgenerátorok tömegek számára elérhetők lettek. **2024-ben** a fizikai Nobel-díjat a neurális hálók alapjainak lerakásáért (John Hopfield, Geoffrey Hinton), a kémiait részben egy fehérjeszerkezet-jósló MI-ért (Demis Hassabis, John Jumper) ítélték oda.\n\nAz MI története tehát nem egyenes vonal: nagy remények, csalódások, majd váratlan áttörések váltják egymást.',
          widget: { type: 'idovonal', options: { title: 'Az MI útja', events: [
            { year: 1950, title: 'Turing kérdése', text: 'Alan Turing: „Gondolkodhatnak-e a gépek?” – javaslat az utánzási játékra.' },
            { year: 1956, title: 'Dartmouth-i nyári tábor', text: 'Az MI-kutatás „születésnapja”; a kifejezést McCarthy és társai 1955-ös tervezete használta.' },
            { year: 1958, title: 'Perceptron', text: 'Frank Rosenblatt tanulni képes mesterséges neuronja.' },
            { year: 1969, title: 'A perceptron korlátai', text: 'Minsky és Papert: egyetlen neuron nem oldja meg az XOR feladatot – jön az első MI-tél.' },
            { year: 1986, title: 'Hiba-visszaterjesztés', text: 'Rumelhart, Hinton és Williams cikke ismertté teszi a többrétegű hálók tanítását.' },
            { year: 1997, title: 'Deep Blue', text: 'Sakkszámítógép győz a világbajnok ellen.' },
            { year: 2012, title: 'Mély tanulás áttörése', text: 'Mély háló videokártyákon nyeri a nagy képfelismerő versenyt.' },
            { year: 2016, title: 'AlphaGo', text: 'Gép győz a gó egyik legjobb játékosa ellen.' },
            { year: 2017, title: 'Transformer', text: 'A „figyelem” alapú hálótípus, a nagy nyelvi modellek alapja.' },
            { year: 2024, title: 'Nobel-díjak', text: 'Fizikai Nobel-díj a neurális hálók alapjaiért, kémiai részben a fehérjeszerkezet-jóslásért.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Mit javasolt Alan Turing 1950-ben?', options: ['Egy játékot: el tudja-e dönteni egy ember írásos beszélgetés alapján, hogy géppel vagy emberrel beszél', 'Az első okostelefont', 'Az internet megépítését', 'A kettes számrendszer bevezetését'], answer: 0, explain: 'Ezt az „utánzási játékot” hívjuk ma Turing-tesztnek.' },
        { q: 'Mit jelent az „MI-tél”?', options: ['A téli olimpiát', 'Olyan időszakot, amikor a csalódás miatt elapadt a lelkesedés és a pénz az MI-kutatásban', 'Egy hűtőrendszert', 'Egy videójátékot'], answer: 1, explain: 'A túlzott várakozásokat csalódás követte, ez többször is megtörtént.' },
        { q: 'Mire épülnek a mai nagy nyelvi modellek?', options: ['Szakértői rendszerek „ha… akkor…” szabályaira', 'A 2017-ben bemutatott, „figyelem” alapú transformer hálótípusra', 'Egyetlen perceptronra', 'Lyukkártyákra'], answer: 1, explain: 'A transformerben minden szó „figyelhet” a többire.' }
      ]
    }
  ]
});
