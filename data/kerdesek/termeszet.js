/* Természettudomány – extra gyakorlókérdések a Tesztközponthoz
 * Formátum: lásd js/teszt.js. A leckék azonosítói megegyeznek a data/tantargyak/termeszet.js leckéivel. */
STUDIE.addQuestions('termeszet', {
  anyagok: [
    { q: 'Hogy hívjuk, amikor a hideg pohár falán vízcseppek jelennek meg?', options: ['Párolgás', 'Lecsapódás', 'Olvadás', 'Forrás'], answer: 1, explain: 'A levegő vízgőze a hideg felületen lehűl, és folyadékká csapódik le.' },
    { q: 'Hány °C-on forr a víz normál légnyomáson?', options: ['0 °C', '50 °C', '100 °C', '212 °C'], answer: 2, explain: 'Normál légnyomáson a víz 100 °C-on forr. Magas hegyen, kisebb légnyomáson alacsonyabb hőmérsékleten.' },
    { q: 'Melyik módszerrel választanád szét a homokot és a vasreszeléket?', options: ['Bepárlással', 'Desztillációval', 'Szűréssel', 'Mágnessel'], answer: 3, explain: 'A vasat a mágnes vonzza, a homokot nem.' },
    { q: 'Melyik keverék oldat?', options: ['Cukros tea', 'Homokos víz', 'Olajos víz', 'Kavics és homok'], answer: 0, explain: 'A cukor egyenletesen eloszlik a vízben, és nem látszik. A többi keverékben az összetevők szabad szemmel megkülönböztethetők.' },
    { q: 'Milyen halmazállapot-változás a szárazjég „füstölgése”?', options: ['Olvadás', 'Forrás', 'Szublimáció', 'Fagyás'], answer: 2, explain: 'A szárazjég (szilárd szén-dioxid) folyékony állapot nélkül, közvetlenül gázzá alakul.' },
    { q: 'Mi jellemző a szilárd anyag részecskéire?', options: ['Szorosan, rendezetten vannak, és a helyükön rezegnek', 'Távol vannak egymástól és szabadon mozognak', 'Elgördülnek egymáson', 'Egyáltalán nem mozognak'], answer: 0, explain: 'A szilárd anyag részecskéi kötött helyükön rezegnek. Teljes mozdulatlanság a természetben nincs.' },
    { q: 'Miért tágulnak melegítéskor az anyagok?', options: ['Mert több részecske lesz bennük', 'Mert a részecskék gyorsabban mozognak, és több helyet igényelnek', 'Mert a részecskék nagyobbak lesznek', 'Mert levegő jut beléjük'], answer: 1, explain: 'A részecskék száma és mérete nem változik, csak a mozgásuk élénkül, ezért távolabb kerülnek egymástól.' },
    { q: 'Hány ml 2,5 liter?', options: ['25 ml', '250 ml', '2500 ml', '25 000 ml'], answer: 2, explain: '1 l = 1000 ml, tehát 2,5 · 1000 = 2500 ml.' },
    { q: 'Melyik eljárással lehet két különböző forráspontú folyadékot szétválasztani?', options: ['Szűrés', 'Ülepítés', 'Mágneses szétválasztás', 'Desztilláció'], answer: 3, explain: 'Forraláskor először az alacsonyabb forráspontú folyadék párolog el, a gőzt lehűtve külön felfogható.' }
  ],
  'eloleny-sejt': [
    { q: 'Melyik eszközzel figyelhetők meg a sejtek?', options: ['Távcsővel', 'Mikroszkóppal', 'Hőmérővel', 'Iránytűvel'], answer: 1, explain: 'A legtöbb sejt túl kicsi ahhoz, hogy szabad szemmel lássuk, ezért mikroszkóp kell.' },
    { q: 'Melyik élőlény egysejtű?', options: ['Papucsállatka', 'Földigiliszta', 'Gomba kalapja', 'Moha'], answer: 0, explain: 'A papucsállatka teste egyetlen sejtből áll, mégis minden életjelenséget mutat.' },
    { q: 'Melyik sejtalkotó szabályozza, mi juthat be a sejtbe és mi távozhat?', options: ['Sejtmag', 'Zöld színtest', 'Sejthártya', 'Sejtnedvűr'], answer: 2, explain: 'A sejthártya a sejt „kapuja”: válogatva enged át anyagokat.' },
    { q: 'Mi adja a levél zöld színét?', options: ['A sejtfal', 'A sejtmag', 'A sejthártya', 'A zöld színtestekben lévő klorofill'], answer: 3, explain: 'A zöld színtestek klorofillt tartalmaznak, ez a zöld színanyag.' },
    { q: 'Melyik életjelenség az, amikor a macska elhúzódik a forró kályhától?', options: ['Ingerlékenység', 'Szaporodás', 'Növekedés', 'Anyagcsere'], answer: 0, explain: 'Az élőlény érzékeli a környezet változását (ingert) és válaszol rá.' },
    { q: 'Miért nem élőlény a tűz, bár „nő” és „táplálkozik”?', options: ['Mert túl meleg', 'Mert nem sejtekből áll, és nem mutat minden életjelenséget', 'Mert nem mozog', 'Mert nem fogyaszt oxigént'], answer: 1, explain: 'Élőlénynek csak az tekinthető, amire minden életjelenség jellemző, és sejtes felépítésű.' },
    { q: 'Mi a sejtfal fő anyaga a növényekben?', options: ['Fehérje', 'Zsír', 'Cellulóz', 'Mész'], answer: 2, explain: 'A növényi sejtfalat a szilárd, rostos cellulóz építi fel. Ebből készül a papír is.' },
    { q: 'Mi történik a sejtplazmában?', options: ['Itt tárolódik a sejt összes vize egy hólyagban', 'Itt zajlik az anyagcsere-folyamatok nagy része', 'Ez választja el a sejtet a környezettől', 'Itt van az örökítőanyag'], answer: 1, explain: 'A kocsonyás sejtplazma a sejt „gyárcsarnoka”, benne találhatók a sejtalkotók.' },
    { q: 'Melyik növény sejtjeit szokták az iskolában mikroszkóppal vizsgálni, mert könnyű előkészíteni?', options: ['Hagymahártya', 'Fakéreg', 'Kaktusztüske', 'Dióhéj'], answer: 0, explain: 'A vöröshagyma belső hártyája egyetlen sejtréteg vastag, így jól átvilágítható.' }
  ],
  novenyek: [
    { q: 'Hol jut be a szén-dioxid a levélbe?', options: ['A gyökéren', 'A virágon', 'A gázcserenyílásokon', 'A száron lévő tüskéken'], answer: 2, explain: 'A levél fonákján lévő apró gázcserenyílásokon át cserél gázt a növény a levegővel.' },
    { q: 'Melyik virágrész termeli a virágport?', options: ['A porzó', 'A termő', 'A csészelevél', 'A szirom'], answer: 0, explain: 'A porzó portokjában képződik a virágpor. A termőben fejlődik a mag.' },
    { q: 'Milyen formában raktározza a növény a fotoszintézissel előállított cukrot?', options: ['Fehérjeként', 'Oxigénként', 'Vízként', 'Keményítőként'], answer: 3, explain: 'A szőlőcukorból keményítő lesz, amelyet pl. a burgonya gumója vagy a gabona magja raktároz.' },
    { q: 'Mi a szár szerepe?', options: ['Csak a virágot tartja', 'Tartja a leveleket és a virágot, és szállítja a vizet és a tápanyagokat', 'Fotoszintézist végez a virág helyett', 'Elnyeli a talaj vizét'], answer: 1, explain: 'A szárban szállítóedények futnak: felfelé a víz, a levelekből pedig a cukrok haladnak.' },
    { q: 'Melyik növény gyökere raktároz tápanyagot?', options: ['Sárgarépa', 'Tulipán szirma', 'Paradicsom', 'Fenyő tűlevele'], answer: 0, explain: 'A sárgarépa és a cékla megvastagodott gyökere tápanyagraktár.' },
    { q: 'Mi a fotoszintézis energiaforrása?', options: ['A talaj melege', 'A szél', 'A napfény', 'A víz mozgása'], answer: 2, explain: 'A növény a fényenergiát alakítja a cukor kémiai energiájává.' },
    { q: 'Mi a termés feladata?', options: ['A fotoszintézis', 'A víz felszívása', 'A virágpor termelése', 'A mag védelme és terjesztése'], answer: 3, explain: 'A termés (pl. alma, bogyó, tüskés kaszat) óvja a magot, és segít eljuttatni messzebbre.' },
    { q: 'Miért szoktak a vízinövények napfényben buborékokat ereszteni?', options: ['Mert forr körülöttük a víz', 'Mert a fotoszintézis során oxigén keletkezik', 'Mert szén-dioxidot termelnek', 'Mert levegőt nyelnek'], answer: 1, explain: 'A buborékok oxigénből állnak. Sötétben, ahol nincs fotoszintézis, szinte megszűnnek.' },
    { q: 'Melyik élőlény NEM végez fotoszintézist?', options: ['Csiperkegomba', 'Moha', 'Tölgyfa', 'Zöldmoszat'], answer: 0, explain: 'A gombáknak nincs klorofilljuk, ezért kész szerves anyagokból táplálkoznak.' }
  ],
  allatok: [
    { q: 'Melyik állat ízeltlábú?', options: ['Földigiliszta', 'Éti csiga', 'Folyami rák', 'Medúza'], answer: 2, explain: 'A rákok kitinvázas, ízelt lábú állatok. A giliszta féreg, a csiga puhatestű, a medúza csalánozó.' },
    { q: 'Melyik állat hüllő?', options: ['Gőte', 'Vízisikló', 'Ponty', 'Denevér'], answer: 1, explain: 'A sikló kígyó, tehát hüllő. A gőte kétéltű, a ponty hal, a denevér emlős.' },
    { q: 'Mi jellemző a madarakra?', options: ['Szőrzet és tejjel táplálás', 'Kopoltyú és pikkely', 'Csupasz, nyálkás bőr', 'Toll, csőr, és mellső végtagjuk szárny'], answer: 3, explain: 'A madarakat a tolltakaró, a csőr és a szárnnyá alakult mellső végtag jellemzi.' },
    { q: 'Melyik emlős él vízben?', options: ['Delfin', 'Cápa', 'Tintahal', 'Teknős'], answer: 0, explain: 'A delfin tüdővel lélegzik, elevenen szül és tejjel táplál: emlős. A cápa hal, a tintahal puhatestű, a teknős hüllő.' },
    { q: 'Mit jelent, hogy egy állat változó testhőmérsékletű?', options: ['Mindig melegebb, mint a környezete', 'Testhőmérséklete a környezet hőmérsékletéhez igazodik', 'Évente egyszer változik a testhőmérséklete', 'Csak éjszaka hűl le'], answer: 1, explain: 'A halak, kétéltűek és hüllők hidegben lehűlnek és lelassulnak, ezért sokan téli álmot alszanak.' },
    { q: 'Mi az első tag egy táplálékláncban?', options: ['Ragadozó', 'Lebontó', 'Zöld növény (termelő)', 'Mindenevő'], answer: 2, explain: 'Csak a zöld növény tudja a napfény energiáját megkötni, ezért minden lánc vele kezdődik.' },
    { q: 'Melyik a rovar testének helyes felosztása?', options: ['Fej, tor, potroh', 'Fejtor és potroh', 'Fej és törzs', 'Fej, nyak, törzs, farok'], answer: 0, explain: 'A rovarok teste háromtagú. A pókoknál a fej és a tor összenőtt (fejtor).' },
    { q: 'Az állatfajok kb. hány százaléka gerinctelen?', options: ['5%', '25%', '50%', '95%'], answer: 3, explain: 'A gerinctelenek, főleg a rovarok, teszik ki a fajok döntő többségét.' },
    { q: 'Melyik állat mindenevő?', options: ['Őz', 'Vaddisznó', 'Sas', 'Nyúl'], answer: 1, explain: 'A vaddisznó növényi részeket (makk, gyökér) és állatokat (lárvák, giliszták) is eszik.' }
  ],
  'emberi-test': [
    { q: 'Mi köti össze a csontokat mozgathatóan?', options: ['Ízület', 'Ín', 'Bőr', 'Ér'], answer: 0, explain: 'Az ízületek (pl. térd, könyök) teszik lehetővé a csontok elmozdulását egymáshoz képest.' },
    { q: 'Hogyan mozgatják az izmok a csontokat?', options: ['Megnyúlással', 'Összehúzódással', 'Forgással', 'Elektromos árammal'], answer: 1, explain: 'Az izom csak húzni tud: összehúzódik. Ezért dolgoznak párban (pl. hajlító és feszítő izom).' },
    { q: 'Melyik szerv tisztítja meg a vért, és termeli a vizeletet?', options: ['A máj', 'A tüdő', 'A vese', 'A gyomor'], answer: 2, explain: 'A vese a kiválasztó szervrendszer része: kiszűri a vérből a salakanyagokat.' },
    { q: 'Melyik tápanyag elsősorban építőanyag a szervezetnek?', options: ['Szénhidrát', 'Zsír', 'Víz', 'Fehérje'], answer: 3, explain: 'A fehérjék építik az izmokat és sok más szövetet. A szénhidrát főleg gyors energiaforrás.' },
    { q: 'Pulzusmérés: 15 másodperc alatt 20 dobbanást számoltál. Mennyi a pulzusod percenként?', options: ['80', '35', '20', '60'], answer: 0, explain: '15 s a perc negyede, ezért 20 · 4 = 80 dobbanás percenként.' },
    { q: 'Melyik szervrendszer hangolja össze a többi működését?', options: ['Emésztőrendszer', 'Idegrendszer', 'Mozgásszervrendszer', 'Légzőrendszer'], answer: 1, explain: 'Az agy és az idegek irányítják és összehangolják a szervezet működését.' },
    { q: 'Milyen sorrendben halad a táplálék?', options: ['Gyomor → szájüreg → nyelőcső → vékonybél', 'Szájüreg → gyomor → nyelőcső → vastagbél', 'Szájüreg → nyelőcső → gyomor → vékonybél → vastagbél', 'Szájüreg → vékonybél → gyomor → vastagbél'], answer: 2, explain: 'Rágás után a nyelőcső a gyomorba juttatja a falatot, onnan a vékony-, majd a vastagbélbe kerül.' },
    { q: 'Mit szállít a vér a sejtekhez?', options: ['Csak vizet', 'Szén-dioxidot és salakanyagot', 'Csak hőt', 'Oxigént és tápanyagot'], answer: 3, explain: 'A vér oxigént és tápanyagot visz a sejtekhez, és elszállítja onnan a szén-dioxidot és a salakanyagokat.' },
    { q: 'Melyik szokás segít a legjobban megelőzni a fertőzések terjedését?', options: ['A rendszeres kézmosás', 'A sok cukros üdítő', 'A kevés alvás', 'A hosszú tévézés'], answer: 0, explain: 'A kezünkön keresztül sok kórokozó jut a szájunkba, orrunkba. Szappanos kézmosással ezek nagy része eltávolítható.' }
  ],
  'fold-naprendszer': [
    { q: 'Melyik égitest csillag?', options: ['A Hold', 'A Nap', 'A Mars', 'A Jupiter'], answer: 1, explain: 'A Nap saját fényt és hőt termel, ezért csillag. A bolygók és a Hold csak visszaverik a fényét.' },
    { q: 'Melyik bolygó van a legközelebb a Naphoz?', options: ['Vénusz', 'Föld', 'Merkúr', 'Mars'], answer: 2, explain: 'A sorrend: Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz.' },
    { q: 'Melyik irányba forog a Föld?', options: ['Nyugatról keletre', 'Keletről nyugatra', 'Északról délre', 'Délről északra'], answer: 0, explain: 'Ezért látjuk a Napot keleten felkelni és nyugaton lenyugodni.' },
    { q: 'Mikor van az északi féltekén a leghosszabb nappal?', options: ['December 21–22. körül', 'Március 20–21. körül', 'Szeptember 22–23. körül', 'Június 21. körül'], answer: 3, explain: 'A nyári napfordulón hajlik legjobban a Nap felé az északi félteke.' },
    { q: 'Miért van négyévente szökőév?', options: ['Mert a Hold lassabban kering', 'Mert a Föld kb. 365 és negyed nap alatt kerüli meg a Napot', 'Mert a Föld forgása lassul', 'Mert így szép kerek a naptár'], answer: 1, explain: 'A négy negyed nap négy év alatt egy egész napot tesz ki, ezt adjuk hozzá február 29-ként.' },
    { q: 'Mi történik holdfogyatkozáskor?', options: ['A Hold eltakarja a Napot', 'A Hold eltávolodik a Földtől', 'A Hold a Föld árnyékába kerül', 'A Nap kialszik'], answer: 2, explain: 'Holdfogyatkozás teleholdkor lehet, amikor a Föld a Nap és a Hold közé kerül.' },
    { q: 'Melyik bolygó a „vörös bolygó”?', options: ['Mars', 'Vénusz', 'Szaturnusz', 'Neptunusz'], answer: 0, explain: 'A Mars felszínét vas-oxidban (rozsdában) gazdag por borítja, ettől vöröses.' },
    { q: 'Mennyi idő alatt ér a Nap fénye a Földre?', options: ['Azonnal', 'Kb. 1 másodperc alatt', 'Kb. 1 nap alatt', 'Kb. 8 és fél perc alatt'], answer: 3, explain: 'A fény kb. 300 000 km/s sebességgel halad, a Nap kb. 150 millió km-re van: ez kb. 500 s.' },
    { q: 'Melyik bolygó kőzetbolygó?', options: ['Jupiter', 'Vénusz', 'Uránusz', 'Szaturnusz'], answer: 1, explain: 'A négy belső bolygó (Merkúr, Vénusz, Föld, Mars) kőzetbolygó, a külső négy óriásbolygó.' },
    { q: 'Ha nálunk, az északi féltekén tél van, milyen évszak van Ausztráliában?', options: ['Szintén tél', 'Tavasz', 'Nyár', 'Ősz'], answer: 2, explain: 'Ilyenkor a déli félteke hajlik a Nap felé, ott nyár van.' }
  ]
});
