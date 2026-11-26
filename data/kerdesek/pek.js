/* Kérdésbank: Pék és cukrász (a data/tantargyak/pek.js leckéihez) */
STUDIE.addQuestions('pek', {
  alapanyagok: [
    { q: 'Mire utal a lisztjelölésben (pl. BL 55, BL 80) a szám?', options: ['A liszt áraira', 'A liszt hamutartalmára (ásványianyag-tartalmára)', 'A szemcseméretre mikrométerben', 'A lejárati időre'], answer: 1, explain: 'Minél nagyobb a szám, annál több a héjhoz közeli rész, annál sötétebb a liszt.' },
    { q: 'Melyik liszt való leginkább rétestésztához?', options: ['Rozsliszt', 'Jó sikérminőségű búzaliszt (rétesliszt)', 'Kukoricaliszt', 'Rizsliszt'], answer: 1, explain: 'A rétes papírvékonyra nyújtásához erős, nyújtható sikér kell.' },
    { q: 'Mit ad a glutenin a sikérnek?', options: ['Nyújthatóságot', 'Rugalmasságot', 'Édességet', 'Színt'], answer: 1, explain: 'A glutenin rugalmas, a gliadin nyújtható.' },
    { q: 'Miért tömörebb a rozskenyér, mint a búzakenyér?', options: ['Mert több benne a só', 'Mert a rozs fehérjéi nem képeznek jó sikérhálót', 'Mert több élesztő kell bele', 'Mert sötétebb'], answer: 1, explain: 'A rozstészta szerkezetét főleg a pentozánok adják.' },
    { q: 'Kenyérben a liszt tömegéhez képest kb. mennyi só a szokásos?', options: ['0,1%', 'Kb. 1,5–2%', '10%', '25%'], answer: 1, explain: 'A só ízt ad, erősíti a sikért és lassítja az élesztőt.' },
    { q: 'Miért lesz omlós a sok zsiradékot tartalmazó tészta?', options: ['Mert a zsiradék „rövidíti” a sikérszálakat', 'Mert a zsiradék kelesztik', 'Mert a zsiradék megköti a sót', 'Nem lesz omlós'], answer: 0, explain: 'A zsiradék bevonja a lisztszemcséket, és gátolja a hosszú sikérszálak kialakulását.' },
    { q: 'Melyik anyag felel a tojássárgája emulgeáló hatásáért?', options: ['Keményítő', 'Lecitin', 'Kazein', 'Glutén'], answer: 1, explain: 'A lecitin a víz és a zsír között közvetít.' }
  ],
  'sutes-kemia': [
    { q: 'Mi a kemencerugás?', options: ['A kemence ajtajának hibája', 'A tészta hirtelen térfogat-növekedése a sütés első perceiben', 'A kenyér összeesése', 'A héj megrepedése hűléskor'], answer: 1, explain: 'A gázok tágulása, az alkohol és a CO₂ gázzá válása okozza.' },
    { q: 'Miért engednek gőzt a kemencébe a kenyérsütés elején?', options: ['Hogy hamarabb kihűljön', 'Hogy a héj sokáig rugalmas maradjon, a tészta tovább nőhessen, és fényes, ropogós héj legyen', 'Hogy ne barnuljon', 'Hogy elpusztuljon az élesztő'], answer: 1, explain: 'A lecsapódó gőz nedvesen tartja a felületet.' },
    { q: 'Kb. milyen hőmérséklet fölött gyors a Maillard-reakció száraz felületen?', options: ['Kb. 40 °C', 'Kb. 140 °C', 'Kb. 300 °C', 'Kb. 0 °C'], answer: 1, explain: 'Ezért nem barnul a nedves felület: amíg víz párolog, nem melegszik 100 °C fölé.' },
    { q: 'Ki után kapta nevét a Maillard-reakció?', options: ['Egy francia vegyész, Louis-Camille Maillard után', 'Egy pék után', 'Egy kenyérfajta után', 'Egy városról'], answer: 0, explain: 'Maillard 1912-ben írta le a reakciót.' },
    { q: 'Miből keletkezik az akrilamid?', options: ['Sóból és vízből', 'Aszparaginból és redukáló cukrokból, magas hőmérsékleten, száraz felületen', 'Élesztőből', 'Vajból'], answer: 1, explain: 'Kb. 120 °C fölött, a Maillard-reakció egyik mellékágán.' },
    { q: 'Hogyan érdemes eltenni a kenyeret, ha hosszabb ideig szeretnéd frissen tartani?', options: ['Hűtőben', 'Fagyasztva', 'Nyitott tálban a napon', 'Vízben'], answer: 1, explain: 'Fagyasztva a keményítő kristályosodása szinte leáll; a hűtőben gyorsul.' },
    { q: 'Mikor sült át a kenyér?', options: ['Ha a héja barna, a belsejétől függetlenül', 'Ha a bél maghőmérséklete kb. 95 °C feletti, és az alja üreges hangot ad', 'Ha 10 perce a kemencében van', 'Ha az illata érezhető'], answer: 1, explain: 'A barna héj alatt még nyers lehet a bél.' },
    { q: 'Mi a karamellizáció?', options: ['Aminosavak és cukrok reakciója', 'Maguknak a cukroknak a bomlása magas hőmérsékleten, fehérje nélkül', 'A keményítő csirízesedése', 'Az élesztő erjedése'], answer: 1, explain: 'Kristálycukornál kb. 160 °C fölött.' }
  ],
  'eleszto-kovasz': [
    { q: 'Milyen élőlény a sütőélesztő?', options: ['Baktérium', 'Egysejtű gomba (Saccharomyces cerevisiae)', 'Növény', 'Vírus'], answer: 1, explain: 'A sütőélesztő egysejtű gomba.' },
    { q: 'Kb. milyen hőmérsékleten pusztul el az élesztő?', options: ['Kb. 10 °C', 'Kb. 30 °C', 'Kb. 50–60 °C', 'Kb. 200 °C'], answer: 2, explain: 'Ezért nem szabad forró vizet önteni az élesztőre.' },
    { q: 'Miért ad jobb ízt a hosszú, hideg kelesztés?', options: ['Mert több só kell', 'Mert lassabb az erjedés, és több íz- és illatanyag képződik', 'Mert a kenyér nagyobb lesz', 'Nem ad jobb ízt'], answer: 1, explain: 'Hidegben az élesztő lassan dolgozik, az enzimeknek és baktériumoknak több idejük van.' },
    { q: 'Friss élesztő helyett instant (szárított) élesztőből kb. mennyi kell?', options: ['Kétszer annyi', 'Ugyanannyi', 'Kb. harmadannyi (a gyártó leírása szerint)', 'Tízszer annyi'], answer: 2, explain: 'A szárított élesztő víztartalma alacsony, hatóanyaga töményebb.' },
    { q: 'Mi él egy érett kovászban?', options: ['Csak sütőélesztő', 'Vadélesztők és tejsavbaktériumok', 'Penészgombák', 'Semmi'], answer: 1, explain: 'A baktériumok savat, az élesztők gázt termelnek.' },
    { q: 'Mikor kell kidobni a kovászt?', options: ['Ha szürkés folyadék gyűlt a tetején', 'Ha szőrös, színes penész jelenik meg rajta, vagy rothadó szaga van', 'Ha savanyú az illata', 'Ha buborékos'], answer: 1, explain: 'A felül összegyűlő folyadék csak éhséget jelez, a penész viszont veszélyes.' },
    { q: '2000 g lisztre 65% vizet számolunk (sütőipari %). Hány gramm víz?', options: ['650 g', '1300 g', '1650 g', '3250 g'], answer: 1, explain: '2000 · 65 / 100 = 1300 g.' },
    { q: 'Milyen kovászvezetés ad élesebb, savanyúbb (ecetsavasabb) ízt?', options: ['Meleg és lágy', 'Hűvös és sűrű', 'Forró és híg', 'Nem befolyásolja'], answer: 1, explain: 'A meleg, lágy kovász több tejsavat, a hűvös, sűrű több ecetsavat termel.' }
  ],
  tesztak: [
    { q: 'Melyik a kémiai lazítás?', options: ['Élesztő', 'Sütőpor', 'Felvert tojásfehérje', 'Gőz'], answer: 1, explain: 'A sütőpor és a szódabikarbóna kémiai reakcióval fejleszt szén-dioxidot.' },
    { q: 'Mi kell a szódabikarbóna működéséhez?', options: ['Só', 'Sav (pl. joghurt, író, citromlé) vagy hő', 'Élesztő', 'Fagyasztás'], answer: 1, explain: 'A sütőpor ezért savas sót is tartalmaz.' },
    { q: 'Mi történik a túlkelt tésztával a kemencében?', options: ['Még nagyobbra nő', 'Összeesik, mert a sikér már nem tartja a gázt', 'Semmi', 'Megkeményedik'], answer: 1, explain: 'A túlkelt termék lapos, savanyú lesz.' },
    { q: 'Miért pihentetik a leveles tésztát a hajtogatások között hűtőben?', options: ['Hogy megkeljen', 'Hogy a vaj ne olvadjon meg, és a sikér ellazuljon', 'Hogy megszáradjon', 'Hogy megsavanyodjon'], answer: 1, explain: 'A hideg megőrzi a rétegeket, a pihenés megkönnyíti a nyújtást.' },
    { q: 'Hogyan kell a lisztet a felvert piskótahabhoz keverni?', options: ['Gyorsan, mixerrel', 'Óvatosan, forgatva, hogy a hab ne törjön össze', 'Forralva', 'Nem kell liszt'], answer: 1, explain: 'A piskótát a habba zárt levegő lazítja.' },
    { q: 'Miért nem szabad a sütés elején kinyitni a sütőt égetett tésztánál?', options: ['Mert kiég', 'Mert a gőz kiszökik, és a tészta összeesik', 'Mert megsavanyodik', 'Nincs jelentősége'], answer: 1, explain: 'A gőz fújja fel a tésztát, amíg a héja meg nem szilárdul.' },
    { q: 'Milyen lazítóanyagot használnak hagyományosan a mézes tésztához?', options: ['Élesztőt', 'Szalakálit (ammónium-hidrogén-karbonát)', 'Tojásfehérje-habot', 'Semmit'], answer: 1, explain: 'A szalakáli lapos, száraz tésztákhoz való, mert a keletkező ammónia így el tud távozni.' }
  ],
  kremek: [
    { q: 'Legalább kb. mekkora zsírtartalmú tejszín kell a jó tejszínhabhoz?', options: ['Kb. 3,5%', 'Kb. 12%', 'Kb. 30%', 'Kb. 80%'], answer: 2, explain: 'A habot a zsírgolyócskák hálója tartja, ehhez elég zsír kell.' },
    { q: 'Miért nem verődik fel a tojásfehérje, ha sárgája került bele?', options: ['Mert a sárgája zsírja gátolja a habképződést', 'Mert túl hideg', 'Mert túl sok a cukor', 'Felverődik'], answer: 0, explain: 'Zsírmentes edény és tiszta fehérje kell.' },
    { q: 'Melyik hab készül forró cukorsziruppal?', options: ['Francia hab', 'Svájci hab', 'Olasz hab', 'Tejszínhab'], answer: 2, explain: 'Az olasz habnál kb. 118–121 °C-os szirupot csorgatnak a felvert fehérjébe.' },
    { q: 'Mi akadályozza meg, hogy a főzött vaníliakrémben a tojás kicsapódjon forraláskor?', options: ['A cukor', 'A keményítő', 'A vanília', 'A só'], answer: 1, explain: 'A keményítő védi a tojásfehérjéket a túl gyors alvadástól.' },
    { q: 'Miért nem dermed meg a zselatinos krém friss ananásszal?', options: ['Mert az ananász savanyú', 'Mert az ananász enzimei lebontják a zselatint', 'Mert túl édes', 'Megdermed'], answer: 1, explain: 'A friss ananász, kivi, papaja fehérjebontó enzimet tartalmaz.' },
    { q: 'Mi a csokoládé temperálásának célja?', options: ['Hogy olcsóbb legyen', 'Hogy a kakaóvaj a stabil, fényes, roppanó kristályformában dermedjen meg', 'Hogy megolvadjon', 'Hogy cukrot adjunk hozzá'], answer: 1, explain: 'A rosszul temperált csokoládé fakó, foltos és puha.' },
    { q: 'Miért használnak a cukrászatban pasztőrözött tojáslevet a nyers tojásos krémekhez?', options: ['Mert olcsóbb', 'Mert a nyers tojás Salmonellát hordozhat', 'Mert sárgább', 'Mert jobban habzik'], answer: 1, explain: 'A pasztőrözés elpusztítja a kórokozókat.' },
    { q: 'Miért futhat össze a vajkrém?', options: ['Mert a vaj és a hozzáadott krém hőmérséklete nagyon eltér', 'Mert túl kevés a cukor', 'Mert hideg a tál', 'Nem futhat össze'], answer: 0, explain: 'Az emulzióhoz az összetevők azonos hőmérséklete kell.' }
  ],
  cukorfozes: [
    { q: 'Mi a cukrász legfontosabb eszköze a cukorfőzéshez?', options: ['Habverő', 'Cukorhőmérő', 'Sodrófa', 'Szita'], answer: 1, explain: 'A szirup hőmérséklete pontosan jelzi a víztartalmát és a várható állagot.' },
    { q: 'Melyik fok a legalacsonyabb hőmérsékletű?', options: ['Kemény törés', 'Lágy gömb', 'Szál', 'Karamell'], answer: 2, explain: 'Szál (kb. 106–112 °C) → lágy gömb → szilárd gömb → kemény gömb → lágy törés → kemény törés → karamell.' },
    { q: 'Milyen fokra főzött cukorból készül a nyalóka?', options: ['Szál', 'Lágy gömb', 'Kemény törés', 'Kemény gömb'], answer: 2, explain: 'A kemény törés (kb. 146–155 °C) üvegszerű, pattanva törik.' },
    { q: 'Mi a fondant?', options: ['Egy karamellfajta', 'Irányítottan kristályosított, sima, fehér cukormassza', 'Tejszínhab', 'Egy tésztafajta'], answer: 1, explain: 'Lágy gömb fokra főzött szirupból, folyamatos dolgozással, apró kristályokkal.' },
    { q: 'Miért mossák le vizes ecsettel a lábas falát főzés közben?', options: ['Hogy tiszta legyen', 'Hogy a falra tapadt kristályok ne indítsák el a szirup visszakristályosodását', 'Hogy hűljön', 'Hogy hígabb legyen'], answer: 1, explain: 'Egyetlen kristály láncreakciót indíthat.' },
    { q: 'Mi az invertcukor?', options: ['Fordított csomagolású cukor', 'Glükóz és fruktóz keveréke, amely a répacukor bontásából keletkezik', 'Barna cukor', 'Porcukor'], answer: 1, explain: 'Gátolja a kristályosodást, és nedvesen tartja a termékeket.' },
    { q: 'Mi a teendő, ha forró cukorszirup kerül a bőrödre?', options: ['Letéped a megkeményedett cukrot', 'Azonnal hideg folyóvízzel hűtöd legalább 20 percig, a rátapadt cukrot nem tépeted le, súlyos esetben 112', 'Vajat kensz rá', 'Semmit'], answer: 1, explain: 'A forró cukor rátapad és mélyen éget; a hűtés csökkenti a sérülést.' }
  ],
  haccp: [
    { q: 'Mit jelent a HACCP rövidítés?', options: ['Egy élelmiszer-adalék', 'Veszélyelemzés és kritikus szabályozási pontok', 'Egy hatóság neve', 'Egy kenyérfajta'], answer: 1, explain: 'Hazard Analysis and Critical Control Points.' },
    { q: 'Hány alapelve van a HACCP-nek?', options: ['3', '5', '7', '10'], answer: 2, explain: 'Veszélyelemzés, CCP, határérték, felügyelet, helyesbítés, igazolás, dokumentáció.' },
    { q: 'Melyik fizikai veszély?', options: ['Salmonella', 'Tisztítószer-maradék', 'Üvegszilánk', 'Penésztoxin'], answer: 2, explain: 'A fizikai veszélyek idegen tárgyak: üveg, fém, műanyag, haj.' },
    { q: 'Mi a helyesbítő tevékenység?', options: ['A termék díszítése', 'Az a teendő, amikor a kritikus határérték sérül (pl. termék visszatartása, megsemmisítése)', 'A raktár festése', 'A recept javítása ízlés szerint'], answer: 1, explain: 'Előre rögzíteni kell, mi a teendő eltérés esetén.' },
    { q: 'Mit teszel, ha hasmenéses betegséged van?', options: ['Dolgozol tovább, csak kezet mosol', 'Jelented, és élelmiszerrel nem dolgozol', 'Kesztyűt húzol', 'Gyógyszert veszel be és dolgozol'], answer: 1, explain: 'A fertőző betegség az élelmiszeren keresztül másokat is megbetegíthet.' },
    { q: 'Miért fontos a nyomonkövethetőség?', options: ['A reklám miatt', 'Hogy probléma esetén tudni lehessen, honnan jött az alapanyag és kinek ment a termék, és gyorsan vissza lehessen hívni', 'A díszítés miatt', 'Nem fontos'], answer: 1, explain: 'Tételszámok, szállítók, vevők nyilvántartása.' },
    { q: 'Hogyan előzhető meg a lisztmoly megjelenése?', options: ['Nyitott zsákok a padlón', 'Zárt, tiszta, a padlótól elemelt tárolás, FIFO, rendszeres kártevőirtás', 'Meleg, párás raktár', 'Ritka takarítás'], answer: 1, explain: 'A kártevők ellen a megelőzés a leghatékonyabb.' }
  ],
  allergenek: [
    { q: 'Melyik rendelet szabályozza az allergénekről szóló tájékoztatást az EU-ban?', options: ['1169/2011/EU', '561/2006/EK', '1223/2009/EK', '2017/2158/EU'], answer: 0, explain: 'Az élelmiszer-tájékoztatási rendelet sorolja fel a 14 allergént.' },
    { q: 'Melyik a 14 kötelezően jelölendő allergén egyike?', options: ['Paradicsom', 'Szezámmag', 'Burgonya', 'Rizs'], answer: 1, explain: 'A szezám pékárukon (szórás) gyakori allergén.' },
    { q: 'Hogyan kell az allergéneket a címkén jelölni?', options: ['Sehogy', 'Az összetevők listájában kiemelve, pl. félkövér betűvel', 'Csak kérésre szóban', 'A termék hátoldalán apró, olvashatatlan betűvel'], answer: 1, explain: 'A kiemelés segíti az allergiás vásárlót.' },
    { q: 'Legfeljebb mennyi glutént tartalmazhat a „gluténmentes” jelölésű termék az EU-ban?', options: ['0 mg/kg', '20 mg/kg', '200 mg/kg', '2000 mg/kg'], answer: 1, explain: 'A határ 20 mg/kg.' },
    { q: 'Mi a cöliákia?', options: ['Egy kenyérfajta', 'Autoimmun betegség, amelyben a glutén károsítja a vékonybelet', 'Tejcukor-érzékenység', 'Egy liszttípus'], answer: 1, explain: 'Egyetlen kezelése az egész életen át tartó szigorú gluténmentes étrend.' },
    { q: 'Hogyan csökkentheted a keresztszennyeződést a gyártásban?', options: ['Az allergénmentes terméket gyártod előbb, külön eszközökkel, alapos takarítással a váltások között', 'Mindent egyszerre gyártasz', 'Egy eszközt használsz mindenhez', 'Nem takarítasz'], answer: 0, explain: 'A sorrend, az elkülönítés és a takarítás a keresztszennyeződés ellenszere.' },
    { q: 'Mi okozza a pékasztmát?', options: ['A hideg', 'A lisztpor és a lisztjavító enzimek belégzése', 'A sok cukor', 'A kemence fénye'], answer: 1, explain: 'A pékasztma az egyik leggyakoribb foglalkozási asztmaforma.' },
    { q: 'A vásárló megkérdezi, van-e dió a süteményben, de nem tudod biztosan. Mit teszel?', options: ['Azt mondod, nincs', 'Megnézed a receptúrát, címkét, és csak biztos információt adsz', 'Találgatsz', 'Azt mondod, hogy nem számít'], answer: 1, explain: 'Allergiánál egy téves válasz életveszélyes lehet.' }
  ]
});
