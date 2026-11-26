/* Tudtad? – fodrász és kozmetikus, ápolás, logisztika, pék és cukrász. Formátum: js/tudtad.js */
STUDIE.addFacts([
  /* ---- Fodrász és kozmetikus ---- */
  {
    id: 'haj-vol-oxigen', cat: 'szakmak',
    q: 'a fodrászok oxidálószerén olvasható „20 vol” azt jelenti, hogy **egy liter oldatból kb. 20 liter oxigéngáz** szabadulhat fel?',
    why: 'A hidrogén-peroxid (H₂O₂) erősségét régi szokás szerint „volumenben” is megadják: azt jelzi, hány liter oxigéngáz keletkezhet egy liter oldat teljes bomlásakor. A **20 vol** kb. **6%**-os, a 10 vol kb. 3%-os, a 40 vol kb. 12%-os oldatnak felel meg.\n\nEz az oxigén nem „buborékként” dolgozik a hajban: a peroxid lúgos közegben **oxidálja** a festék előanyagait és **bontja a haj saját pigmentjét**, a melanint. Ezért világosít az erősebb oxidáló jobban, és ezért roncsolja jobban a hajat is.',
    links: ['lecke:fodrasz/festes', 'tantargy:fodrasz']
  },
  {
    id: 'haj-beszaritas-hidrogenkotes', cat: 'szakmak',
    q: 'a beszárított frizura azért **esik ki párás időben**, mert a víz felbontja a hajat formában tartó gyenge kémiai kötéseket?',
    why: 'A haj keratinláncait többféle kötés tartja össze. A **hidrogénkötéseket** a víz és a hő könnyen felbontja és újrarendezi: amikor nedves hajat feszítve, kefével szárítasz, a kötések az új formában „fagynak be”. Párás levegőben a haj vizet vesz fel, a hidrogénkötések újra felbomlanak, és a haj visszatér a természetes formájához.\n\nA **dauer** ezzel szemben az erős **diszulfidhidakat** bontja fel vegyszerrel, majd új helyen köti újra, ezért az a forma hónapokig megmarad: csak a haj kinövésével tűnik el.',
    links: ['lecke:fodrasz/hajszerkezet']
  },
  {
    id: 'haj-szamok', cat: 'emberi-test',
    q: 'egy felnőtt fején nagyjából **100 000 hajszál** van, és ebből napi **50–100** kihullása teljesen normális?',
    why: 'Minden hajtüsző saját ciklusban működik: a **növekedési szakasz** (anagén) évekig, jellemzően **2–6 évig** tart, ezt egy rövid átmeneti, majd egy **2–4 hónapos nyugalmi szakasz** (telogén) követi, amelynek végén a szál kihullik, és helyén új kezd nőni. Mivel a tüszők nem egyszerre váltanak, a hajunk folyamatosan, észrevétlenül cserélődik.\n\nA haj havonta átlagosan kb. **1 cm**-t nő. Hogy kinek milyen hosszúra nőhet a haja, azt főleg a növekedési szakasz hossza dönti el. A hajszálak száma a hajszíntől is függ: a szőkéknek általában több, a vörös hajúaknak kevesebb, de vastagabb szálú hajuk van.',
    links: ['lecke:fodrasz/hajszerkezet', 'lecke:fodrasz/bortipusok']
  },
  {
    id: 'fekete-henna', cat: 'szakmak',
    q: 'egy nyaraláson készült „**fekete henna**” tetoválás akár **egész életre** szóló hajfestékallergiát okozhat?',
    why: 'A valódi henna narancsos-vörösesbarna. A strandokon kínált fekete változat színét gyakran nagy koncentrációjú **para-fenilén-diamin (PPD)** adja, amelyet közvetlenül a bőrre kennek és órákig rajta hagynak. Az EU-ban a PPD csak oxidációs hajfestékben, korlátozott koncentrációban, szakmai használatra engedélyezett.\n\nA bőrre kent PPD gyakran **szenzibilizálja** az immunrendszert: utána egy hajfestés már súlyos, az arcot is bedagasztó reakciót válthat ki, és a szervezet rokon vegyületekre is reagálhat. Ezért kérdez rá a jó fodrász a konzultáción a fekete henna tetoválásra, és ezért írják elő a gyártók a bőrpróbát.',
    links: ['lecke:fodrasz/allergia']
  },
  {
    id: 'lila-sampon', cat: 'szakmak',
    q: 'a szőkék „hamvasító” samponja azért **lila**, mert a színkörön a lila a sárga ellenszíne?',
    why: 'Szőkítéskor a haj saját pigmentjéből meleg árnyalatok maradnak vissza: sötétebb hajnál narancsos, világosabbnál sárgás „alapfény”. A **kiegészítő (ellen-) színek** kioltják egymást: a festékpigmentek elnyelik egymás fényét, és együtt semleges, szürkés árnyalatot adnak.\n\nEzért semlegesíti az **ibolya** a sárgát, a **kék** a narancsot és a **zöld** a vöröset. A lila samponban lévő kevés ibolya pigment a sárgás tónust tompítja, így a szőke hidegebbnek, „hamvasabbnak” látszik. Ugyanez az elv működik a sminkben is: a zöldes korrektor a piros foltokat takarja.',
    links: ['lecke:fodrasz/festes', 'lecke:vizualis/szinek']
  },
  /* ---- Ápolás ---- */
  {
    id: 'semmelweis-kezmosas', cat: 'emberi-test',
    q: '**Semmelweis Ignác** már **1847**-ben a klóros kézmosással töredékére csökkentette a gyermekágyi láz okozta halálozást a bécsi klinikán?',
    why: 'Semmelweis észrevette, hogy azon a szülészeti osztályon, ahol orvostanhallgatók dolgoztak (akik gyakran boncolásból jöttek), sokkal több anya halt meg gyermekágyi lázban, mint a bábák osztályán. Arra következtetett, hogy az orvosok kezén „hullarészecskék” jutnak át a szülő nőkbe, és bevezette a **klórmeszes kézmosást**. A halálozás drámaian csökkent.\n\nKortársai nagy része nem fogadta el az elméletét, mert a baktériumokat még nem ismerték; csak Pasteur és Lister munkássága után igazolódott. Ma az „anyák megmentőjeként” ismerjük, születésnapja, **július 1.**, Magyarországon a **Semmelweis-nap**, az egészségügyben dolgozók ünnepe. A kézhigiénia ma is a fertőzések megelőzésének legolcsóbb és leghatásosabb eszköze.',
    links: ['lecke:apolas/higienia', 'tantargy:apolas']
  },
  {
    id: 'nightingale-diagram', cat: 'tortenelem',
    q: '**Florence Nightingale**, a modern ápolás megalapítója, egyben a **statisztikai diagramok** egyik úttörője volt?',
    why: 'A krími háború idején (1854–1856) Nightingale a katonakórházakban azt tapasztalta, hogy a katonák közül sokkal többen haltak meg **megelőzhető fertőzésekben** (rossz higiénia, szellőzés, ellátás miatt), mint a harctéri sebesülésekben. Ezt a brit kormány számára egy saját fejlesztésű, színes **„kakastaréj” (polárterület-) diagrammal** mutatta be, amely egy pillantással érthetővé tette az adatokat.\n\nMunkája nyomán megreformálták a katonai egészségügyet, ő pedig iskolát alapított az ápolók képzésére. Születésnapja, **május 12.** ma az **ápolók nemzetközi napja**. A Királyi Statisztikai Társaság első női tagja lett.',
    links: ['lecke:apolas/etika', 'tantargy:apolas']
  },
  {
    id: 'alkohol-spora', cat: 'emberi-test',
    q: 'a kórházi **alkoholos kézfertőtlenítő** bizonyos kórokozók ellen hatástalan, ezért ilyenkor **szappanos kézmosás** kell?',
    why: 'Az alkoholos kézfertőtlenítők a legtöbb baktériumot és sok vírust gyorsan elpusztítják, ezért ezek a kórházi kézhigiénia alapjai: a WHO-módszer szerint a bedörzsölés kb. **20–30 másodperc**.\n\nA súlyos hasmenést okozó **Clostridioides difficile** baktérium azonban **spórákat** képez, amelyek ellenállnak az alkoholnak. Ilyenkor a spórákat mechanikusan kell lemosni: kesztyű és **szappanos kézmosás** (kb. 40–60 másodperc) kell. Egyes burok nélküli vírusok (pl. norovírus) ellen is gyengébb az alkohol hatása.',
    links: ['lecke:apolas/higienia']
  },
  {
    id: 'hgmm-higany', cat: 'emberi-test',
    q: 'a vérnyomást azért mérjük **higanymilliméterben (Hgmm)**, mert régen egy **higanyoszlop** magasságát olvasták le?',
    why: 'A mandzsettás vérnyomásmérőt **Scipione Riva-Rocci** olasz orvos fejlesztette ki **1896**-ban: a felkarra tett mandzsettát felfújták, és egy higanyoszlopos nyomásmérőn olvasták le, mekkora nyomásnál szűnik meg a csuklón a pulzus. **Nyikolaj Korotkov** orosz orvos **1905**-ben írta le az artérián sztetoszkóppal hallható hangokat, amelyekkel a szisztolés és a diasztolés érték is meghatározható.\n\nA higany mérgező, ezért ma már higanymentes, főleg automata (oszcillometriás) készülékeket használnak, de a mértékegység megmaradt: a 120 Hgmm azt jelenti, hogy a nyomás 120 mm magas higanyoszlopot tartana meg.',
    links: ['lecke:apolas/vitalis']
  },
  {
    id: 'idosek-szomjusag', cat: 'emberi-test',
    q: 'időskorban **csökken a szomjúságérzet**, ezért az idős emberek könnyen kiszáradnak, és ez akár **zavartságot** is okozhat?',
    why: 'Az öregedéssel gyengül a szomjúságot jelző agyi rendszer, és a **vese** is kevésbé képes visszatartani a vizet. Sokan ráadásul tudatosan keveset isznak, hogy ne kelljen gyakran WC-re menniük, vagy mert vízhajtót szednek.\n\nA kiszáradás időseknél nem mindig feltűnő: a jelei lehetnek a száraz száj, a kevés, sötét vizelet, a szédülés, a székrekedés, de akár egy hirtelen **zavartság (delírium)** vagy **elesés** is. Ezért a gondozásban nem várják meg, hogy az idős ember kérjen inni: rendszeresen, kis adagokban kínálják, és a pohár mindig kéz közelben van.',
    links: ['lecke:apolas/idosgondozas']
  },
  /* ---- Logisztika ---- */
  {
    id: 'elso-vonalkod-rago', cat: 'technika',
    q: 'a világon az **első bolti vonalkódos leolvasás** egy csomag **rágógumi** volt, **1974**-ben?',
    why: '**1974. június 26-án** egy ohiói (USA) szupermarketben olvastak be először pénztárnál UPC-vonalkódot: egy csomag Wrigley-féle gyümölcsös rágógumit. A csomagot ma múzeumban őrzik.\n\nA vonalkód forradalmasította a kereskedelmet: gyorsabb lett a fizetés, kevesebb a hiba, és a boltok pontosan látták, mi fogy. Ebből fejlődött ki az európai **EAN-13** kód, amelyet ma szinte minden terméken látsz. A pénztári adatok azóta a teljes ellátási lánc „idegrendszerét” adják: ezekből indul az újrarendelés.',
    links: ['lecke:logisztika/azonositas', 'tantargy:logisztika']
  },
  {
    id: 'ean-599', cat: 'technika',
    q: 'a **599**-cel kezdődő vonalkód **nem** azt jelenti, hogy a termék Magyarországon készült?',
    why: 'Az EAN-13 kód első 2–3 számjegye a **GS1-előtag**: azt mutatja, melyik ország GS1-szervezete adta ki a cégazonosítót. A **599** a magyar GS1-szervezet előtagja. Egy magyar cég azonban gyárthatja a termékét külföldön is, és egy külföldi cég is kérhet kódot itthon.\n\nA kód utolsó számjegye az **ellenőrző számjegy**: az első 12 számjegyet felváltva 1-gyel és 3-mal szorozzák, összeadják, és a következő tízes többszörösig hiányzó szám lesz az utolsó jegy. Ha a pénztárgép rosszul olvas egy számjegyet, az ellenőrzés nem stimmel, és a gép újraolvas.',
    links: ['lecke:logisztika/azonositas']
  },
  {
    id: 'kontener-1956', cat: 'technika',
    q: 'a mai világkereskedelmet egy **1956**-ban útnak indult, **konténereket szállító tartályhajó** alapozta meg?',
    why: '**Malcom McLean** amerikai fuvarozási vállalkozó 1956. április 26-án az átalakított **Ideal X** tartályhajóval 58 konténert szállított Newarkból Houstonba. Ötlete egyszerű volt: ne az árut pakolják át zsákonként, ládánként, hanem az egész **dobozt** emeljék a teherautóról a hajóra.\n\nA szabványos konténerrel a be- és kirakodás ideje és költsége a **töredékére** csökkent, a lopások és sérülések száma is visszaesett. Ma a konténerkapacitást **TEU**-ban (20 lábas egyenérték) mérik, és a legnagyobb konténerhajók már több mint 20 000 TEU-t visznek.',
    links: ['lecke:logisztika/szallitas', 'tantargy:logisztika']
  },
  {
    id: 'ostorcsapas-pelenka', cat: 'penz',
    q: 'az ellátási lánc „**ostorcsapás-hatását**” egy **pelenkagyártó** vette észre: a babák pelenkafogyasztása egyenletes, a rendelések mégis hullámzottak?',
    why: 'A Procter & Gamble a kilencvenes évek elején vizsgálta, miért ingadoznak olyan erősen a nagykereskedők rendelései a Pampers pelenkákra, miközben a babák egyenletes ütemben használják el őket. Kiderült: minden szint (bolt, nagykereskedő, elosztó) a maga óvatosságból, akciók miatt és nagy tételekben rendelt, így a kis ingadozások a lánc felsőbb szintjein egyre nagyobbra nőttek, mint az ostor csapása.\n\nA jelenséget a közgazdászok (Lee, Padmanabhan és Whang 1997-es cikke nyomán) **bullwhip-effektusnak** nevezik. Az ellenszer az **információmegosztás**: ha a gyártó is látja a valódi bolti eladásokat, nem kell „biztonságból” túltermelnie.',
    links: ['lecke:logisztika/ellatasi-lanc']
  },
  {
    id: 'eur-raklap-33', cat: 'technika',
    q: 'egy szabványos nyerges pótkocsiba **pontosan 33 EUR-raklap** fér?',
    why: 'Az **EUR-raklap** mérete **1200 × 800 mm**. A szabványos európai nyerges pótkocsi rakfelülete kb. **13,6 m** hosszú és kb. **2,45 m** széles (belül). Ha a raklapokat keresztben, a 80 cm-es oldalukkal egymás mellé teszik, háromnyi fér el (3 · 0,8 = 2,4 m), hosszában pedig 13,6 / 1,2 ≈ 11 sor: 3 · 11 = **33** raklap.\n\nA méretek nem véletlenül illenek össze: az EUR-raklapot 1961-ben az európai vasutak szabványosították, és a járművek, rakodóajtók, állványok, sőt a termékek csomagolása is ehhez igazodik. A logisztikában a centiméterek pénzt jelentenek: egy rossz dobozméret miatt fél raklapnyi hely is kárba veszhet.',
    links: ['lecke:logisztika/raktar', 'lecke:logisztika/szallitas']
  },
  /* ---- Pék és cukrász ---- */
  {
    id: 'maillard-1912', cat: 'etel',
    q: 'a kenyérhéj, a sült hús és a pörkölt kávé barna színét és illatát **ugyanaz a kémiai reakció** adja, amelyet egy francia vegyész **1912**-ben írt le?',
    why: 'A **Maillard-reakciót** Louis-Camille Maillard francia orvos-vegyész írta le: **aminosavak** és **redukáló cukrok** reakciója magas hőmérsékleten, száraz felületen (gyorsan kb. 140 °C fölött). Több száz illat- és ízanyag keletkezik belőle, és barna színanyagok (melanoidinek).\n\nEzért nem barnul meg a főtt hús (a vízben nem melegszik 100 °C fölé), és ezért kell a steaket szárazra törölni sütés előtt. A pék a tojásos-tejes lekenéssel, a perec lúgos áztatással gyorsítja a barnulást. A túlzott barnítás viszont kerülendő: a sötétre sült felületen több **akrilamid** keletkezik.',
    links: ['lecke:pek/sutes-kemia', 'tantargy:pek']
  },
  {
    id: 'kenyer-hutoben', cat: 'etel',
    q: 'a kenyér a **hűtőszekrényben gyorsabban szikkad**, mint szobahőmérsékleten?',
    why: 'A kenyér szikkadása nem egyszerű kiszáradás. Sütéskor a keményítőszemcsék vizet vesznek fel és megduzzadnak (**csirízesednek**). Lehűlés után a keményítőmolekulák lassan újra rendezett, kristályos szerkezetbe állnak (**retrogradáció**): a bél kemény, morzsalékos lesz, még ha a víz nagy része benne is maradt.\n\nEz a visszarendeződés a **hűtőszekrény hőmérsékletén** a leggyorsabb, fagyasztva viszont szinte leáll. Ezért a kenyeret szobahőmérsékleten, rövid távra vászonzacskóban, hosszabb távra **fagyasztva** érdemes tárolni. A visszapirítás részben „felfrissíti”, mert a hő újra feloldja a keményítőkristályokat.',
    links: ['lecke:pek/sutes-kemia']
  },
  {
    id: 'kovasz-sanfrancisco', cat: 'etel',
    q: 'a kovász egyik legfontosabb baktériumát egy amerikai városról nevezték el, mégis **a világ szinte minden kovászában** megtalálható?',
    why: 'A savanyú kenyér híres hazájában, San Franciscóban vizsgált kovászokból írták le az 1970-es években a **Lactobacillus sanfranciscensis** nevű tejsavbaktériumot (ma Fructilactobacillus sanfranciscensis a neve). Később kiderült, hogy ez a baktérium a világ legkülönbözőbb pontjain, így Európában is az egyik leggyakoribb kovászlakó.\n\nA kovászban élesztők és tejsavbaktériumok élnek együtt: az élesztő kelesztik, a baktériumok **tejsavat és ecetsavat** termelnek. Ettől savanykás a kovászos kenyér íze, és ettől marad tovább friss és penészmentes.',
    links: ['lecke:pek/eleszto-kovasz']
  },
  {
    id: 'croissant-27-reteg', cat: 'etel',
    q: 'egy vajas leveles tészta **három egyszeres hajtogatás** után már **27 vajréteget** tartalmaz?',
    why: 'A leveles tésztánál egy vajlapot tésztába zárnak, majd kinyújtják és „levélszerűen” harmadára hajtják. Minden ilyen egyszeres (hármas) hajtás **megháromszorozza** a rétegeket: 1 → 3 → 9 → 27. Ha négyrét hajtják (kettős hajtás), a rétegszám négyszereződik.\n\nSütéskor a vaj víztartalmából **gőz** keletkezik, amely szétemeli a vékony tésztalapokat, ezért lesz a croissant és a vajas pogácsa leveles. A titok a **hideg**: ha a vaj megolvad, összekeveredik a tésztával, és a rétegek eltűnnek. Túl sok hajtással pedig a rétegek olyan vékonyak lesznek, hogy összeolvadnak.',
    links: ['lecke:pek/tesztak']
  },
  {
    id: 'pekasztma', cat: 'szakmak',
    q: 'a pékek egyik leggyakoribb foglalkozási betegsége a **lisztpor** belégzése okozta **asztma**?',
    why: 'A lisztben lévő fehérjék és a lisztjavítókban használt enzimek (pl. gombaeredetű **alfa-amiláz**) belélegezve erős **allergének**. Az évekig tartó porexpozíció allergiás náthát, majd **pékasztmát** okozhat, amely az egyik leggyakoribb foglalkozási asztmaforma.\n\nA megelőzés egyszerű szokásokon múlik: a lisztet nem szórjuk magasról, a dagasztógépet lassan indítjuk és lefedjük, porszívózunk vagy nedvesen takarítunk söprés helyett, elszívást és szükség esetén porvédő maszkot használunk. Tartós köhögésnél, nehézlégzésnél a foglalkozás-egészségügyi orvos segít.',
    links: ['lecke:pek/allergenek', 'tantargy:pek']
  }
]);
