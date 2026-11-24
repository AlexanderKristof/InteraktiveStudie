/* Tudtad? – sport I.: foci, Forma–1, kosárlabda. Fizika, technika, élettan és sportolók inspiráló, ellenőrzött történetei. Formátum: js/tudtad.js */
STUDIE.addFacts([

  /* ───────── FOCI: FIZIKA ÉS TECHNIKA ───────── */
  {
    id: 'sp-magnus-hatas', cat: 'sport', sport: 'foci',
    q: 'a csavart szabadrúgás azért kanyarodik el, mert **a pörgő labda az egyik oldalán gyorsabban „húzza magával” a levegőt, mint a másikon**?',
    why: 'Ha a labdát oldalt, csavarva rúgod meg, akkor repülés közben a saját tengelye körül is forog. Az egyik oldalon a felülete a szembejövő levegővel egy irányba mozog, a másikon vele szemben, ezért a levegő a két oldalon máshogy áramlik és máshol válik le a labdáról.\n\nA labda a levegőt az egyik irányba téríti el, így Newton III. törvénye szerint a levegő a labdát az ellenkező irányba nyomja: ez a **Magnus-hatás**. Minél gyorsabban pörög a labda, annál nagyobb ez az oldalirányú erő, és annál erősebben kanyarodik a lövés.',
    links: ['lecke:sport/foci-fizika', 'lecke:fizika/newton', 'szakszo:fizika-bsc/impulzus']
  },
  {
    id: 'sp-roberto-carlos-spiral', cat: 'sport', sport: 'foci', athletes: ['Roberto Carlos'],
    q: 'Roberto Carlos híres, 1997-es szabadrúgásának titkát **13 évvel később francia fizikusok fejtették meg egy tudományos cikkben**?',
    why: 'Roberto Carlos 1997. június 3-án Franciaország ellen kb. 35 méterről lőtt: a labda először jócskán a sorfal mellett, a kaputól láthatóan kifelé tartott, aztán élesen visszakanyarodott a hálóba.\n\nFrancia kutatók 2010-ben a New Journal of Physics folyóiratban mutatták ki, hogy ez nem véletlen. Mivel a levegő fékezi a labdát, a sebessége csökken, a pörgése viszont alig – így a Magnus-erő egyre jobban „győz”, és a pálya nem körív, hanem egyre szűkülő **spirál**. A hatás csak elég erős és hosszú lövésnél látszik ennyire, ezért olyan ritka.',
    links: ['lecke:sport/foci-fizika', 'lecke:fizika/newton', 'lecke:fizika/mertekegysegek-mozgas']
  },
  {
    id: 'sp-kuglilabda', cat: 'sport', sport: 'foci', athletes: ['Cristiano Ronaldo'],
    q: 'a „lebegő”, szinte nem pörgő lövés azért kiszámíthatatlan, mert **a labda mögött a levegő hol az egyik, hol a másik oldalon válik le**?',
    why: 'Ha a labdát a közepén, nagyon kevés pörgéssel rúgják meg (Cristiano Ronaldo szabadrúgásai erről híresek), akkor nincs Magnus-erő, ami egy irányba vinné. A labda mögötti örvények viszont nem szimmetrikusak, és a leválás helye a varratok, panelek helyzetétől függően ide-oda ugrál.\n\nEz kis, gyorsan változó oldalerőket okoz, ezért a labda **ide-oda imbolyog** – a kapus nem tudja előre kiszámolni a pályáját. Ráadásul a futball-labda pont a lövések sebességtartományában éri el az úgynevezett **közegellenállás-válságot**: itt a légellenállás hirtelen megváltozik, ami tovább növeli a meglepetést.',
    links: ['lecke:sport/foci-fizika', 'szakszo:e-mobilitas/legellenallas', 'lecke:fizika/newton']
  },
  {
    id: 'sp-telstar-tv', cat: 'sport', sport: 'foci',
    q: 'a klasszikus fekete-fehér, 32 foltos labdát **a fekete-fehér tévé miatt** tervezték ilyenre?',
    why: 'Az 1970-es mexikói világbajnokság hivatalos labdája, az Adidas **Telstar** volt az első, amelyet így terveztek: **12 fekete ötszög és 20 fehér hatszög**, összesen 32 panel. A mintázat miatt a labda a korabeli fekete-fehér tévéadásban is jól látszott, és a forgása is követhető volt.\n\nA forma matematikailag egy **csonkolt ikozaéder**, amely nagyon közel áll a gömbhöz. A nevét is a Telstar távközlési műholdról kapta, amely hasonló, foltos kinézetű volt.',
    links: ['lecke:sport/foci-fizika', 'tantargy:matematika']
  },
  {
    id: 'sp-labda-panelek', cat: 'sport', sport: 'foci',
    q: 'a világbajnoki labdák paneljeinek száma **32-ről 8-ra, majd 6-ra csökkent**, és ettől a labda repülése is megváltozott?',
    why: 'A 2010-es vb labdája, a **Jabulani** csak 8 hőkezeléssel összeillesztett panelből állt, és nagyon sima volt. Sok kapus panaszkodott, hogy kiszámíthatatlanul „lebeg”: a kevesebb varrat miatt a levegő máshogy vált le róla, és erősebben jelentkezett a közegellenállás-válság.\n\nA tervezők ezután szándékosan **barázdákat és érdes felületet** tettek a labdákra (2014: Brazuca, 6 panel; 2022: Al Rihla, 20 panel), hogy a repülés stabilabb legyen – hasonlóan ahhoz, ahogy a golflabda gödröcskéi is javítják a repülést.',
    links: ['lecke:sport/foci-fizika', 'szakszo:e-mobilitas/legellenallas']
  },
  {
    id: 'sp-labda-szabvany', cat: 'sport', sport: 'foci',
    q: 'a szabályok **a labda tömegét és belső nyomását is előírják**, mert pár tized bar különbség is érezhetően más pattanást ad?',
    why: 'A futball szabálykönyve szerint a felnőtt (5-ös) labda kerülete **68–70 cm**, tömege **410–450 g**, a nyomása pedig **0,6–1,1 bar** (tengerszinten).\n\nA keményebbre fújt labda rugalmasabban pattan és gyorsabban hagyja el a lábat, mert ütközéskor kevesebb energia vész el a deformálódásban. A puhább labda viszont tovább marad a lábon, könnyebb vele bánni. Ezért a mérkőzés előtt a játékvezetők ellenőrzik a labdákat.',
    links: ['lecke:sport/foci-fizika', 'lecke:fizika/energia-munka', 'szakszo:fizika-bsc/idealis-gaz']
  },
  {
    id: 'sp-golvonal-technika', cat: 'sport', sport: 'foci', athletes: ['Frank Lampard'],
    q: 'a gólvonal-technológia **egy másodpercen belül jelez a játékvezető órájára**, ha a labda teljes terjedelmével átlépte a gólvonalat?',
    why: 'A 2010-es vb-n Frank Lampard lövése Németország ellen jócskán a gólvonal mögött pattant le, a gólt mégsem adták meg. Ez az eset is siettette a technológia bevezetését: az IFAB 2012-ben engedélyezte, a világbajnokságon 2014-ben használták először.\n\nA rendszerek kapunként **7 nagy sebességű kamerával** követik a labdát, és háromszögeléssel számolják ki a helyzetét. Gól csak akkor van, ha a labda **teljes terjedelmével** áthaladt a vonalon – ezt szabad szemmel szinte lehetetlen eldönteni.',
    links: ['lecke:sport/foci-fizika', 'lecke:matematika/pitagorasz', 'lecke:fizika/hullamok-feny']
  },
  {
    id: 'sp-felautomata-les', cat: 'sport', sport: 'foci',
    q: 'a 2022-es vb-n a lest **12 kamera és egy labdába épített érzékelő** segítségével, játékosonként 29 testpont követésével vizsgálták?',
    why: 'A félautomata lestechnológia a stadion teteje alá szerelt **12 kamerával** másodpercenként **50-szer** határozta meg minden játékos akár **29 testpontjának** (végtagjainak) helyzetét.\n\nA hivatalos labda, az Al Rihla közepében egy mozgásérzékelő (IMU) ült, amely másodpercenként **500-szor** küldött adatot, így pontosan látszott, mikor rúgták meg a labdát. A szoftver jelzett a videobíróknak, akik ellenőrizték az eredményt, mielőtt a döntés a pályára került.',
    links: ['lecke:sport/foci-fizika', 'tantargy:informatika', 'lecke:fizika/mertekegysegek-mozgas']
  },
  {
    id: 'sp-palya-csikok', cat: 'sport', sport: 'foci',
    q: 'a focipálya csíkjai **nem festékből vannak**, hanem a fűszálak dőlésirányából?',
    why: 'A pályagondnokok a fűnyíró után egy hengert is húznak, ami a fűszálakat a haladás irányába dönti. Az egyik sávban a szálak felénk, a szomszédosban tőlünk elfelé hajlanak.\n\nA felénk dőlő fűszálaknak inkább a sötétebb, árnyékos oldalát látjuk, a tőlünk elfelé dőlőknek a fényes, napsütötte felületét – ezért látszik az egyik csík világosabbnak. Ha a pálya másik végéről nézed, a világos és a sötét csíkok **helyet cserélnek**.',
    links: ['lecke:fizika/hullamok-feny', 'lecke:sport/foci-fizika']
  },
  {
    id: 'sp-palya-locsolas', cat: 'sport', sport: 'foci',
    q: 'a meccs előtt és a szünetben azért locsolják a pályát, hogy **a labda gyorsabban guruljon** és pontosabbak legyenek a passzok?',
    why: 'A nedves fűszálak felülete síkosabb, ezért a guruló labdát kevésbé fékezi a súrlódás és a fűszálak hajlítása: a labda kevesebb sebességet veszít, és egyenletesebben fut.\n\nA gyors, laposan passzoló csapatok ezért kifejezetten kérik a locsolást. A túl sok víz viszont már tócsákat és kiszámíthatatlan pattanásokat okoz – a pályagondnoknak itt is meg kell találnia az egyensúlyt.',
    links: ['lecke:sport/foci-fizika', 'lecke:fizika/energia-munka']
  },
  {
    id: 'sp-hibrid-fu', cat: 'sport', sport: 'foci',
    q: 'a nagy stadionok „füve” sokszor **hibrid: az élő fűbe néhány százaléknyi műfűszálat varrnak**?',
    why: 'A hibrid gyepnél gépek több millió műanyag szálat varrnak le kb. 20 cm mélyre a talajba, sűrű rácsban. A felszínen így is szinte csak élő fű látszik – a műszálak aránya általában csak **néhány (kb. 3–5) százalék**.\n\nAz élő fű gyökerei körbefonják a műszálakat, ezért a gyep sokkal jobban bírja a hirtelen irányváltásokat és a csúszó szereléseket, kevésbé szakad ki. A pálya így egyenletesebb marad, kevesebb a sérülés és a „rögös” pattanás.',
    links: ['lecke:sport/foci-fizika', 'tantargy:biologia']
  },
  {
    id: 'sp-magaslati-foci', cat: 'sport', sport: 'foci',
    q: 'Bolívia fővárosában, La Pazban **messzebbre száll a labda, de hamarabb elfárad a vendégcsapat**?',
    why: 'La Paz stadionja kb. **3600 m** magasan van, ahol a levegő kb. **30%-kal ritkább**, mint tengerszinten. A ritkább levegő kevésbé fékezi a labdát, és a csavarás is gyengébben hat – a lövések és a hosszú passzok gyorsabbak, nehezebben kiszámíthatók.\n\nKözben viszont minden belégzéssel kevesebb oxigén jut a tüdőbe, ezért a hozzá nem szokott játékosok hamarabb kifulladnak. A FIFA 2007-ben egy időre meg is tiltotta a nagyon magasan fekvő pályákon a válogatott meccseket, de a tiltást hamarosan feloldották.',
    links: ['lecke:biologia/keringes-legzes', 'lecke:sport/test-edzes', 'szakszo:anatomia/gazcsere']
  },

  /* ───────── FOCI: AGY, TEST, STATISZTIKA ───────── */
  {
    id: 'sp-tizenegyes-ido', cat: 'sport', sport: 'foci',
    q: 'egy erős tizenegyes **kb. 0,4 másodperc alatt ér a kapuba** – a kapusnak ezért már a rúgás előtt döntenie kell?',
    why: 'A büntetőpont 11 m-re van a kaputól. Egy 100 km/h-s (kb. 28 m/s) lövés kb. **0,4 s** alatt ér a kapuvonalhoz.\n\nAz ember reakcióideje egy váratlan ingerre kb. **0,2 s**, és a kapusnak ezután még el is kell rugaszkodnia, ami szintén több tized másodperc. Ezért a jó kapusok a rúgó **nekifutásából, csípőjének és támasztólábának helyzetéből** próbálják kitalálni az irányt – ez tanulható, gyakorolható készség.',
    links: ['lecke:fizika/mertekegysegek-mozgas', 'lecke:biologia/ideg-hormon-emesztes', 'szakszo:anatomia/reflexiv']
  },
  {
    id: 'sp-kapus-akcio', cat: 'sport', sport: 'foci',
    q: 'egy kutatás szerint a kapusok a tizenegyeseknél **kb. 94%-ban elvetődnek, pedig középen maradva ritkán többet védenének**?',
    why: 'Izraeli kutatók (Bar-Eli és társai, 2007) 286 élvonalbeli büntetőt elemeztek. A rúgások kb. harmada középre ment, a kapusok viszont csak kb. **6%-ban** maradtak középen – és akkor a lövések kb. harmadát meg is fogták.\n\nA magyarázat pszichológiai: ha a kapus elvetődik és mégis gólt kap, az „rendben van”, de ha mozdulatlan marad, az rosszabb érzés. Ezt **cselekvési torzításnak** hívják: hajlamosak vagyunk akkor is cselekedni, amikor a várakozás jobb lenne.',
    links: ['lecke:sport/sportpszichologia', 'szakszo:valszam/varhato-ertek', 'lecke:matematika/szazalek']
  },
  {
    id: 'sp-scanning', cat: 'sport', sport: 'foci', athletes: ['Xavi', 'Frank Lampard'],
    q: 'a legjobb középpályások a labda átvétele előtt **másodpercenként majdnem egyszer körülnéznek**?',
    why: 'Geir Jordet norvég kutató és csapata videón számolta meg, hányszor fordítják el a fejüket a játékosok a labda átvétele előtti 10 másodpercben. A mért értékek közül **Xavi** volt a csúcstartó: átlagosan kb. **0,83 „szkennelés” másodpercenként**, de Frank Lampard és Steven Gerrard is kb. 0,6 felett járt.\n\nAki gyakrabban néz körül, annak a fejében már kész „térkép” van a társakról és az ellenfelekről, ezért gyorsabban és jobban tud passzolni. A jó hír: a körülnézés **edzhető szokás**, nem velünk született tehetség.',
    links: ['lecke:sport/sportpszichologia', 'modell:agy#nyakszirti', 'modell:szem#retina']
  },
  {
    id: 'sp-futott-tav', cat: 'sport', sport: 'foci',
    q: 'egy profi focista egy meccsen **kb. 10–13 km-t fut, de ennek nagy része kocogás és séta**, a döntő pillanatok pedig rövid sprintek?',
    why: 'A követőrendszerek mérései szerint a mezőnyjátékosok meccsenként általában **10–13 km-t** tesznek meg, a középpályások általában a legtöbbet. Ennek csak kis része nagy sebességű futás, mégis ezekben a pár másodperces sprintekben dőlnek el a helyzetek.\n\nA foci ezért **szakaszos terhelés**: a szervezetnek egyszerre kell bírnia a hosszú állóképességi munkát (aerob energiatermelés) és a sokszor ismételt robbanékony gyorsításokat (anaerob). Az edzésnek mindkettőt fejlesztenie kell.',
    links: ['lecke:sport/test-edzes', 'lecke:sport/edzeselmelet', 'modell:sejt#mito']
  },

  /* ───────── FOCI: MAGYAR LEGENDÁK ───────── */
  {
    id: 'sp-puskas-84-gol', cat: 'sport', sport: 'foci', athletes: ['Puskás Ferenc'],
    q: 'Puskás Ferenc a magyar válogatottban **85 mérkőzésen 84 gólt szerzett**?',
    why: 'Puskás Ferenc 1945 és 1956 között 85-ször lépett pályára a magyar válogatottban, és **84 gólt** lőtt – ez meccsenként majdnem egy gól, ami a világ élvonalában is kivételes arány.\n\nNem volt különösebben magas vagy gyors, de a bal lábas technikája, a helyzetfelismerése és a lövőereje legendás volt. A FIFA 2009 óta az év legszebb góljáért járó díjat róla nevezi el: ez a **Puskás-díj**.',
    links: ['lecke:sport/olimpia', 'lecke:tortenelem/huszadik-szazad']
  },
  {
    id: 'sp-puskas-1960', cat: 'sport', sport: 'foci', athletes: ['Puskás Ferenc'],
    q: 'Puskás Ferenc **33 évesen négy gólt lőtt egy BEK-döntőben**?',
    why: 'Az 1960-as Bajnokcsapatok Európa-kupája (a mai Bajnokok Ligája elődje) döntőjében Glasgow-ban a Real Madrid **7:3**-ra győzte le az Eintracht Frankfurtot. Puskás **négy**, csapattársa, Alfredo Di Stéfano három gólt szerzett.\n\nPuskás ekkor már 33 éves volt, és a pályafutása Spanyolországban szinte újrakezdődött: korábban egy kényszerű szünet miatt sokat hízott, és kemény munkával, fogyással dolgozta vissza magát a csúcsra.',
    links: ['lecke:sport/olimpia', 'lecke:sport/edzeselmelet']
  },
  {
    id: 'sp-wembley-6-3', cat: 'sport', sport: 'foci', athletes: ['Hidegkuti Nándor', 'Puskás Ferenc'],
    q: 'az Aranycsapat 1953-as, Wembleyben aratott **6:3-as győzelme egy taktikai újítás miatt** is bekerült a futballtörténetbe?',
    why: '1953. november 25-én Magyarország 6:3-ra nyert Angliában. Az angol válogatott ekkor kapott ki először hazai pályán a Brit-szigeteken kívüli csapattól.\n\nA siker egyik kulcsa **Hidegkuti Nándor** szerepe volt: a papíron középcsatárként szereplő játékos hátravontan, a középpályáról irányított, így az angol középhátvéd nem tudta, kit fogjon. Hidegkuti mesterhármast szerzett. A visszavágón, 1954 tavaszán Budapesten 7:1 lett – ez máig az angol válogatott legsúlyosabb veresége.',
    links: ['lecke:sport/olimpia', 'lecke:tortenelem/huszadik-szazad']
  },
  {
    id: 'sp-aranycsapat-veretlen', cat: 'sport', sport: 'foci', athletes: ['Puskás Ferenc', 'Kocsis Sándor', 'Hidegkuti Nándor'],
    q: 'az Aranycsapat **több mint négy évig, 31 mérkőzésen át veretlen** maradt?',
    why: 'A FIFA összesítése szerint a magyar válogatott 1950 tavasza és 1954 nyara között **31 mérkőzésen** nem kapott ki (egyes összesítések 32 meccset számolnak). Ezalatt 1952-ben Helsinkiben **olimpiai aranyat** is nyert.\n\nA sorozat az 1954-es vb döntőjében szakadt meg, ahol a csapat 2:0-s vezetés után 3:2-re kikapott az NSZK-tól. A vereség fájdalmas volt, de az Aranycsapat játékstílusa – a mozgékony, helycserés, rövidpasszos foci – egész Európára hatással volt.',
    links: ['lecke:sport/olimpia', 'lecke:tortenelem/huszadik-szazad', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-kocsis-aranyfej', cat: 'sport', sport: 'foci', athletes: ['Kocsis Sándor'],
    q: 'Kocsis Sándort **fejjátéka miatt „Aranyfejűnek”** hívták, és egyetlen világbajnokságon 11 gólt szerzett?',
    why: 'Az 1954-es svájci világbajnokságon Kocsis Sándor **11 gólt** lőtt, ezzel ő lett a gólkirály. A válogatottban összesen **75 gólt** szerzett, és hét mesterhármasa is volt.\n\nA fejeléshez nem csak magasság kell: a jó **időzítés**, az elrugaszkodás pillanata és a nyak izmainak megfeszítése legalább ilyen fontos. Ha a fej és a törzs egy merev egységként mozog, a labda nagyobb tömeggel „ütközik”, ezért erősebb és pontosabb lesz a fejes.',
    links: ['lecke:sport/foci-fizika', 'szakszo:fizika-bsc/impulzus', 'lecke:sport/olimpia']
  },
  {
    id: 'sp-albert-florian', cat: 'sport', sport: 'foci', athletes: ['Albert Flórián'],
    q: 'eddig **egyetlen magyar focista nyerte meg az Aranylabdát**: Albert Flórián, 1967-ben?',
    why: 'A France Football magazin által alapított Aranylabdát (Ballon d’Or) 1956 óta adják át. **Albert Flórián**, a Ferencváros csatára 1967-ben nyerte el, elsősorban a csapatával és a válogatottal nyújtott kiemelkedő teljesítményéért.\n\nAlbert elegáns, technikás játékos volt, akit a „Császár” becenéven emlegettek. A Ferencváros stadionja ma az ő nevét viseli.',
    links: ['lecke:sport/olimpia']
  },
  {
    id: 'sp-kiraly-rekord', cat: 'sport', sport: 'foci', athletes: ['Király Gábor', 'Pepe'],
    q: 'Király Gábor **40 évesen az Európa-bajnokságok legidősebb játékosa lett**, és amikor rekordját megdöntötték, ő gratulált elsőként az utódjának?',
    why: 'A 2016-os Eb-n Király Gábor 40 évesen védte a magyar kaput; a Belgium elleni nyolcaddöntőn **40 év 86 nappal** a torna addigi legidősebb pályára lépő játékosa lett.\n\nA rekordot 2024-ben a portugál **Pepe** döntötte meg 41 évesen. Király nyilvánosan gratulált neki – szép példája a **sportszerűségnek**. A hosszú pályafutás titka a kapusoknál a gondos edzés, a regeneráció és a tapasztalatból fakadó jó helyezkedés.',
    links: ['lecke:sport/edzeselmelet', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-gulacsi-visszateres', cat: 'sport', sport: 'foci', athletes: ['Gulácsi Péter'],
    q: 'Gulácsi Péter egy súlyos térdsérülés, **két műtét és majdnem egy év kihagyás után** tért vissza a Bundesligába, és újra csapatkapitány lett?',
    why: '2022. október 5-én, a Celtic elleni BL-meccsen elszakadt a jobb térdében az **elülső keresztszalag**. A műtét után egy fertőzés miatt egy második beavatkozásra is szükség volt, ami tovább nyújtotta a rehabilitációt.\n\nA keresztszalag a combcsontot és a sípcsontot köti össze, és megakadályozza, hogy a térd előre-hátra „elcsússzon”. Pótlása után hónapokig tart, mire az izmok, az egyensúly és a bizalom visszatér. Gulácsi majdnem egy év után állt újra a lipcsei kapuba, és visszakapta a kapitányi karszalagot is.',
    links: ['lecke:sport/edzeselmelet', 'szakszo:anatomia/izulet', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-szoboszlai-izland', cat: 'sport', sport: 'foci', athletes: ['Szoboszlai Dominik'],
    q: 'Szoboszlai Dominik **a 92. percben, 20 évesen lőtt góllal** juttatta ki Magyarországot az Európa-bajnokságra?',
    why: '2020. november 12-én Budapesten Magyarország Izlanddal játszott az Eb-pótselejtező döntőjében. Az izlandiak vezettek, Nagy Loic a 88. percben egyenlített, majd a **92. percben** Szoboszlai Dominik kb. 25 méterről a kapu sarkába lőtt: 2:1.\n\nA távoli lövés titka a **jó testtartás és a rengeteg gyakorlás**: a támasztóláb a labda mellett, a felsőtest a labda fölött, a rúgóláb pedig egyenesen „átmegy” a labdán – így laposan és erősen száll.',
    links: ['lecke:sport/foci-fizika', 'lecke:sport/sportpszichologia', 'lecke:fizika/newton']
  },
  {
    id: 'sp-szoboszlai-ut', cat: 'sport', sport: 'foci', athletes: ['Szoboszlai Dominik'],
    q: 'Szoboszlai Dominik első edzője **az édesapja** volt, aki gyerekkorától tudatosan fejlesztette a két lábát és a technikáját?',
    why: 'Szoboszlai Dominik Székesfehérváron nőtt fel, és édesapja, Szoboszlai Zsolt volt az első edzője, aki saját utánpótlásműhelyt is alapított. Sok gyakorlással, már gyerekként is mindkét lábbal dolgoztatta.\n\nA kitartó munka meghozta az eredményét: Szoboszlai Salzburg és Lipcse után a Liverpoolhoz került, amellyel **2024–25-ben megnyerte a Premier League-et**, a 2024-es Eb-n pedig ő volt a magyar válogatott csapatkapitánya. A gyerekkorban sokszor ismételt mozdulatok az agyban és a gerincvelőben „bevésődnek” – ezért fontos már fiatalon a helyes technika.',
    links: ['lecke:sport/edzeselmelet', 'modell:agy#kisagy', 'lecke:sport/sportpszichologia']
  },

  /* ───────── FOCI: VILÁGSZTÁROK ───────── */
  {
    id: 'sp-messi-hormon', cat: 'sport', sport: 'foci', athletes: ['Lionel Messi'],
    q: 'Lionel Messinél gyerekként **növekedésihormon-hiányt** állapítottak meg, és évekig kezelést kapott, hogy rendesen nőhessen?',
    why: 'Messi kb. 10–11 évesen sokkal alacsonyabb volt a társainál. Az orvosok kimutatták, hogy a szervezete túl kevés **növekedési hormont** termel – ezt az agyalapi mirigy választja ki, és a csontok, izmok növekedését szabályozza. A kezelés részeként rendszeresen hormoninjekciót kapott.\n\nAz FC Barcelona 13 évesen szerződtette, és vállalta a kezelés költségét is. Messi végül kb. 170 cm magas lett – és minden idők egyik legjobb játékosává vált, aki 2023-ig **nyolc Aranylabdát** nyert.',
    links: ['modell:agy#hipofizis', 'lecke:biologia/ideg-hormon-emesztes', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-messi-91-gol', cat: 'sport', sport: 'foci', athletes: ['Lionel Messi'],
    q: 'Messi 2012-ben **egyetlen naptári év alatt 91 gólt** szerzett?',
    why: 'Messi 2012-ben a Barcelonában és az argentin válogatottban összesen **91 gólt** lőtt, ezzel megdöntötte Gerd Müller 1972-es, 85 gólos rekordját. A Guinness Rekordok Könyve is elismerte.\n\nMessi kis termetének előnye is volt: az alacsonyabb **tömegközéppont** és a rövid, gyors lépések miatt villámgyorsan tud irányt váltani, miközben a labda szinte végig a lábánál marad. A cselezés fizikájában a kisebb tehetetlenség előny.',
    links: ['lecke:fizika/newton', 'szakszo:fizika-bsc/tehetetlensegi-nyomatek', 'lecke:sport/foci-fizika']
  },
  {
    id: 'sp-messi-aranylabda-vb', cat: 'sport', sport: 'foci', athletes: ['Lionel Messi'],
    q: 'Messi az egyetlen játékos, aki **két világbajnokságon is a torna legjobbjának** járó Aranylabdát kapta?',
    why: 'Messi 2014-ben (Argentína ezüstérmes lett) és 2022-ben (Argentína világbajnok lett) is megkapta a vb legjobb játékosának járó Golden Ball díjat – erre előtte senki sem volt képes.\n\n2022-ben 35 évesen nyerte meg első világbajnoki címét, öt vb-szereplés után. A története jól mutatja, hogy a kudarcokból – például több elvesztett döntőből – is lehet erőt meríteni.',
    links: ['lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-ronaldo-ugras', cat: 'sport', sport: 'foci', athletes: ['Cristiano Ronaldo'],
    q: 'Cristiano Ronaldo egy 2019-es fejesgólnál **2,56 méter magasan** érte el a labdát?',
    why: '2019. december 18-án a Sampdoria elleni meccsen Ronaldo a mérések szerint kb. **71 cm-t** ugrott, és a feje kb. **2,56 m** magasan találta el a labdát. Az ellenfél edzője NBA-kosarasok ugrásához hasonlította.\n\nAz ugrás magassága az elrugaszkodás sebességén múlik: `h = v² / 2g`. 71 cm-hez kb. **3,7 m/s** felfelé irányuló sebesség kell, amit a comb- és farizmok robbanékony ereje ad. Ronaldo ezt rendszeres erő- és plyometriás (szökdelő) edzéssel tartotta fenn pályafutása során.',
    links: ['lecke:fizika/energia-munka', 'lecke:fizika/mertekegysegek-mozgas', 'szakszo:anatomia/izomosszehuzodas']
  },
  {
    id: 'sp-ronaldo-vb-gol', cat: 'sport', sport: 'foci', athletes: ['Cristiano Ronaldo'],
    q: 'Cristiano Ronaldo 2022-ben **az első férfi focista lett, aki öt különböző világbajnokságon is gólt lőtt**?',
    why: 'Ronaldo 2006-ban, 2010-ben, 2014-ben, 2018-ban és 2022-ben is betalált a vb-n – az ötödik tornán Ghána ellen, 37 évesen.\n\nA férfi válogatott gólrekordja is az övé: 2026 őszén már **több mint 140 válogatott gólnál** járt. Ilyen hosszú pályafutáshoz nem csak tehetség kell, hanem évtizedeken át tartó fegyelmezett edzés, gondos táplálkozás és sok alvás.',
    links: ['lecke:sport/edzeselmelet', 'lecke:sport/taplalkozas']
  },
  {
    id: 'sp-haaland-36', cat: 'sport', sport: 'foci', athletes: ['Erling Haaland'],
    q: 'Erling Haaland első angliai idényében **36 bajnoki gólt** szerzett, ami Premier League-rekord?',
    why: 'Haaland a 2022–23-as idényben a Manchester City színeiben 35 bajnokin **36 gólt** lőtt. A korábbi rekordot (34 gól) Andy Cole és Alan Shearer tartotta – ráadásul ők még 42 fordulós idényekben értek el annyit. Haaland minden sorozatot összeszámolva **52 gólig** jutott.\n\nHaaland kb. 194 cm magas, mégis nagyon gyors: a hosszú lábak nagy lépéshosszt adnak, az erős izomzat pedig gyors gyorsítást. Sokat foglalkozik a regenerációval és az alvás minőségével is.',
    links: ['lecke:sport/test-edzes', 'lecke:sport/edzeselmelet']
  },
  {
    id: 'sp-haaland-9', cat: 'sport', sport: 'foci', athletes: ['Erling Haaland'],
    q: 'Haaland egy U20-as világbajnoki meccsen **egymaga 9 gólt** szerzett?',
    why: '2019. május 30-án az U20-as vb-n Norvégia **12:0**-ra legyőzte Hondurast, és ebből Haaland **9 gólt** lőtt – ez a FIFA-tornák egyik legkülönlegesebb egyéni teljesítménye.\n\nHaaland ekkor 18 éves volt. A sikerhez a fizikai adottságok mellett a **befejezések rengeteg gyakorlása** kellett: a jó csatár a kapu előtt automatikusan, gondolkodás nélkül választja ki a legjobb megoldást.',
    links: ['lecke:sport/edzeselmelet', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-mbappe-dontok', cat: 'sport', sport: 'foci', athletes: ['Kylian Mbappé'],
    q: 'Kylian Mbappé **két vb-döntőben is gólt lőtt**, és az egyikben mesterhármast?',
    why: '2018-ban, 19 évesen gólt szerzett a vb-döntőben Horvátország ellen – Pelé (1958) után ő lett a második tinédzser, aki vb-döntőben betalált. Franciaország világbajnok lett.\n\n2022-ben Argentína ellen **mesterhármast** lőtt a döntőben; előtte erre csak az angol Geoff Hurst volt képes 1966-ban. Franciaország végül büntetőkkel kikapott – Mbappé mégis felemelt fejjel, a társait vigasztalva hagyta el a pályát.',
    links: ['lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-lamine-yamal', cat: 'sport', sport: 'foci', athletes: ['Lamine Yamal'],
    q: 'Lamine Yamal **16 évesen** lőtt gólt az Európa-bajnokság elődöntőjében, ezzel ő lett az Eb-k legfiatalabb gólszerzője?',
    why: '2024. július 9-én Franciaország ellen Lamine Yamal 16 év 362 naposan csavart a kapu felső sarkába egy gyönyörű lövést. Spanyolország megnyerte a meccset, majd az Eb-t is.\n\nA lövés tipikus „belsővel csavart” lövés volt: a Magnus-hatás miatt a labda a kapu mellől kanyarodott be. Yamal a Barcelona akadémiáján nőtt fel, ahol a technikai képzés már egészen kis korban kezdődik.',
    links: ['lecke:sport/foci-fizika', 'lecke:sport/edzeselmelet']
  },

  /* ───────── FORMA–1: TECHNIKA ───────── */
  {
    id: 'sp-f1-fejjel-lefele', cat: 'sport', sport: 'f1',
    q: 'egy Forma–1-es autó **elméletben nagy sebességnél fejjel lefelé, a mennyezeten is tudna haladni**?',
    why: 'Az F1-es autó szárnyai és padlója úgy terelik a levegőt, hogy az lefelé nyomja az autót: ez a **leszorítóerő**. Ugyanaz a fizika, mint egy repülőgépszárnynál, csak fordítva.\n\nA leszorítóerő a sebesség négyzetével nő, és nagy sebességnél **nagyobb lehet, mint az autó súlya** (2026-ban a minimális tömeg 768 kg, pilótával). Elméletben tehát egy alagút mennyezetén is meg tudna maradni. Kipróbálni persze senki sem fogja – a motor, az olaj- és az üzemanyag-rendszer sem erre készült.',
    links: ['modell:f1-auto#elso-szarny', 'modell:f1-auto#hatso-szarny', 'lecke:sport/forma1', 'lecke:fizika/newton']
  },
  {
    id: 'sp-f1-padlo', cat: 'sport', sport: 'f1',
    q: 'a mai F1-es autók leszorítóerejének nagy részét **nem a szárnyak, hanem az autó alja, a padlólemez** adja?',
    why: '2022 óta a szabályok úgy épülnek fel, hogy az autó alatt két nagy, **Venturi-csatornára** emlékeztető alagút fut. Ahol a csatorna szűkül, a levegő felgyorsul, és a nyomása lecsökken (Bernoulli-elv): az autó alatt kisebb lesz a nyomás, mint felette, és ez „leszívja” az autót.\n\nA padló előnye, hogy kevesebb örvényt kelt maga mögött, mint a szárnyak, ezért a követő autó is jobban tudja tartani a tempót – ez a cél az előzések segítése volt. A hátsó **diffúzor** lassítja vissza a levegőt.',
    links: ['modell:f1-auto#padlolemez', 'modell:f1-auto#diffuzor', 'lecke:sport/forma1']
  },
  {
    id: 'sp-f1-fekek', cat: 'sport', sport: 'f1',
    q: 'egy F1-es autó féktárcsái **akár 1000 °C-ra is felforrósodnak, és izzanak**?',
    why: 'Az F1-ben **szén-szén** (karbon) féktárcsákat használnak, amelyek nagyon magas hőmérsékleten is megtartják a szilárdságukat. Erős fékezéskor az autó mozgási energiájának nagy része a fékekben hővé alakul, a tárcsák pedig több száz fokra, csúcsban akár kb. **1000 °C-ra** is felmelegszenek – sötétben látszik, ahogy izzanak.\n\nA karbonfék csak megfelelő hőmérsékleten fog jól, ezért a pilóták és a mérnökök figyelik, nehogy túlhűljenek vagy túlhevüljenek.',
    links: ['modell:f1-auto#fekek', 'lecke:fizika/energia-munka', 'szakszo:fizika-bsc/belso-energia']
  },
  {
    id: 'sp-f1-g-ero', cat: 'sport', sport: 'f1',
    q: 'erős fékezésnél és gyors kanyarokban az F1-pilótára **saját súlyának akár 5–6-szorosa is hat**?',
    why: 'A leszorítóerő és a nagyon tapadós gumik miatt az F1-es autók fékezéskor és kanyarban akár **5–6 g** gyorsulást is elérnek. Ez azt jelenti, hogy a pilóta feje a sisakkal együtt (kb. 6–7 kg) ilyenkor 30 kg feletti erővel húz oldalra vagy előre.\n\nEzért a pilóták nyakizmai különlegesen erősek: speciális gépekkel, gumikötelekkel, súlyokkal edzik őket. Egy versenyen ezt több száz kanyarban kell kibírni – közben pontosan kormányozni és a rádión beszélni.',
    links: ['modell:f1-auto#gumik', 'lecke:fizika/newton', 'lecke:sport/forma1', 'lecke:sport/test-edzes']
  },
  {
    id: 'sp-f1-hoseg', cat: 'sport', sport: 'f1',
    q: 'egy forró, párás futamon a pilóták **akár 2–3 kg-ot is veszíthetnek a testtömegükből izzadással**?',
    why: 'A pilóta tűzálló, többrétegű ruhában ül a szűk pilótafülkében, a motor és a fékek közelében. Szingapúrban vagy Katarban a pilótafülke hőmérséklete 50 °C fölé is mehet, a pulzus pedig a futam nagy részében **160–180/perc** körül van.\n\nA test az izzadással hűt: a verejték elpárolgása hőt von el. A sok elvesztett víz viszont rontja a koncentrációt, ezért a pilóták itallal és ásványi anyagokkal készülnek. A 2023-as katari futam után az FIA hűtőmellényt fejlesztett, és 2025-ben bevezette a **„hőségveszély”** kihirdetésének lehetőségét.',
    links: ['lecke:sport/taplalkozas', 'szakszo:anatomia/homeosztazis', 'lecke:sport/test-edzes', 'modell:sziv']
  },
  {
    id: 'sp-f1-boxkiallas', cat: 'sport', sport: 'f1', athletes: ['Lando Norris'],
    q: 'a leggyorsabb F1-es kerékcsere **mindössze 1,80 másodpercig** tartott – négy kerékkel?',
    why: 'A McLaren 2023. október 8-án a Katari Nagydíjon Lando Norris autóján **1,80 s** alatt cserélte ki mind a négy kereket (a korábbi rekordot, 1,82 s-ot a Red Bull tartotta 2019-től).\n\nEgy kerékcserénél kb. 20 szerelő dolgozik egyszerre: kerekenként egy ember lazítja és húzza meg a központi anyát, egy leveszi, egy felteszi a kereket, mások emelik az autót. A tankolás 2010 óta tilos, ezért a boxkiállás tisztán **csapatmunka és sokszor gyakorolt mozdulatsor**.',
    links: ['modell:f1-auto#gumik', 'lecke:sport/forma1', 'lecke:sport/edzeselmelet']
  },
  {
    id: 'sp-f1-gumi-hofok', cat: 'sport', sport: 'f1',
    q: 'az F1-es gumik **csak forrón tapadnak igazán jól**, hidegen szinte csúsznak?',
    why: 'A versenygumi keveréke egy szűk hőmérséklet-tartományban (nagyjából 90–110 °C körül) a legtapadósabb: ekkor a gumi elég puha ahhoz, hogy az aszfalt apró egyenetlenségeibe „belesimuljon”, és sok ponton kapaszkodjon.\n\nHa hideg, a gumi kemény és csúszik; ha túlhevül, gyorsan kopik és szétesik a felszíne. Ezért láthatod, hogy a pilóták a felvezető körben cikáznak, és ezért melegítik a gumikat bekészítéskor fűtött takarókkal.',
    links: ['modell:f1-auto#gumik', 'lecke:kemia/kemiai-kotesek', 'szakszo:szerves-kemia/polimer']
  },
  {
    id: 'sp-f1-kormany', cat: 'sport', sport: 'f1',
    q: 'az F1-es kormány **egy kis számítógép**, rajta kijelzővel és több tucat gombbal, kapcsolóval?',
    why: 'A kormányon nemcsak a kormányzás történik: innen vált a pilóta (a kormány mögötti fülekkel), itt állítja a fékerőelosztást, a motor és a hibrid rendszer üzemmódjait, a differenciálmű beállítását, itt nyitja a rádiót és itt látja a köridőket.\n\nEgy futam alatt a pilóták **több száz** beállítást végeznek, sokszor egy egyenes közben, 300 km/h felett. Ehhez az kell, hogy minden gomb helye „a kézben legyen”, mint egy jó zongoristánál a billentyűk.',
    links: ['modell:f1-auto#kormany', 'modell:f1-auto#sebessegvalto', 'lecke:sport/forma1']
  },
  {
    id: 'sp-f1-halo', cat: 'sport', sport: 'f1', athletes: ['Romain Grosjean'],
    q: 'a pilóta feje fölötti titánív, a **halo** kb. 12 tonnának megfelelő terhelést is kibír, pedig csak néhány kilogramm?',
    why: 'A halót 2018-ban vezették be. Kb. 7 kg-os, titánötvözetből készül, és az FIA-teszten **125 kN** erőt kell elviselnie – ez kb. 12 tonna súlyának felel meg.\n\n2020-ban Bahreinben Romain Grosjean autója egy szalagkorlátba fúródott és kettétört; a halo félrenyomta a korlátot a feje elől. Grosjean kb. 27–28 másodpercet töltött a lángok között, mégis kisebb égési sérülésekkel kiszállt – a halo, a túlélőcella és a tűzálló ruha együtt mentették meg.',
    links: ['modell:f1-auto#halo', 'modell:f1-auto#monocoque', 'szakszo:mechanika/feszultseg']
  },
  {
    id: 'sp-f1-hatasfok', cat: 'sport', sport: 'f1',
    q: 'az F1-es hibrid motorok **az üzemanyag energiájának több mint 50%-át** tudják hasznos munkává alakítani – jóval többet, mint egy átlagos autómotor?',
    why: 'Egy hétköznapi benzinmotor az üzemanyag energiájának nagyjából 30–35%-át alakítja mozgássá, a többi hőként távozik. A Mercedes 2017-ben bejelentette, hogy F1-es erőforrása a próbapadon átlépte az **50%-os hatásfokot**.\n\nEhhez kellett a turbó, a nagyon gondosan szabályozott égés, valamint a hibrid rendszer, amely a fékezésnél és (2025-ig) a kipufogógázból is visszanyerte az energiát. Az F1 itt valódi „mérnöki labor”: a fejlesztések egy része a közúti autókba is bekerül.',
    links: ['modell:f1-auto#eroforras', 'modell:benzinmotor', 'szakszo:e-mobilitas/hatasfok', 'szakszo:fizika-bsc/carnot-korfolyamat']
  },
  {
    id: 'sp-f1-turbo', cat: 'sport', sport: 'f1',
    q: 'az F1-es turbófeltöltő **percenként akár 125 000-et is fordulhatott**?',
    why: 'A turbóban a kipufogógáz egy kis turbinát forgat meg, amely egy közös tengelyen egy kompresszort hajt: ez több levegőt sűrít a hengerekbe, így több üzemanyag égethető el ugyanakkora motorban.\n\n2014 és 2025 között a szabályok a turbó fordulatszámát **125 000/perc**-ben korlátozták – ez másodpercenként több mint 2000 fordulat. 2026-tól megszűnt a turbóhoz kapcsolt MGU-H generátor, ezért a mérnököknek új módszerekkel kell csökkenteniük a turbó késlekedését.',
    links: ['modell:f1-auto#turbo', 'modell:hajtomu#nagynyomasu-turbina', 'lecke:fizika/energia-munka']
  },
  {
    id: 'sp-f1-2026-szabalyok', cat: 'sport', sport: 'f1',
    q: '2026-tól az F1-es autók teljesítményének **nagyjából a fele elektromos**, és 100%-ban fenntartható üzemanyaggal mennek?',
    why: 'A 2026-os szabályokkal a hátsó kerekeket hajtó elektromos motor-generátor (**MGU-K**) teljesítménye 120 kW-ról **350 kW**-ra nőtt, a bonyolult MGU-H pedig megszűnt. A belső égésű motor és az elektromos rész így nagyjából fele-fele arányban adja a teljesítményt.\n\nAz autók kisebbek és könnyebbek lettek (minimum **768 kg**), a DRS helyett pedig mozgatható első és hátsó szárnyelemekkel dolgoznak: az egyeneseken kisebb légellenállású állásba váltanak. Az üzemanyag 2026-tól teljesen **fenntartható** forrásból készül.',
    links: ['modell:f1-auto#mgu-k', 'modell:f1-auto#akkumulator', 'modell:f1-auto#eroforras', 'szakszo:e-mobilitas/rekuperacio']
  },
  {
    id: 'sp-f1-drs', cat: 'sport', sport: 'f1',
    q: 'a DRS egy **nyitható hátsószárny-lap** volt, amely 15 éven át segítette az előzéseket?',
    why: 'A DRS-t (légellenállás-csökkentő rendszer) 2011-ben vezették be. Ha egy autó a kijelölt helyen egy másodpercen belül volt az előtte haladóhoz, a pilóta egy gombbal kinyithatta a hátsó szárny felső lapját.\n\nA nyitott lap kevesebb levegőt térít el, így **csökken a légellenállás** (és a leszorítóerő is), az autó pedig az egyenes végére kb. 10–15 km/h-val gyorsabb lehetett. 2026-tól a DRS megszűnt, helyette minden autó egyenesekben állítja a szárnyait, előzéskor pedig extra elektromos teljesítményt kaphat.',
    links: ['modell:f1-auto#drs', 'modell:f1-auto#hatso-szarny', 'szakszo:e-mobilitas/legellenallas']
  },
  {
    id: 'sp-f1-80kg', cat: 'sport', sport: 'f1',
    q: 'az F1-ben 2019 óta **a pilótának és ülésének együtt legalább 80 kg-nak** kell lennie, hogy senkinek ne érje meg éheznie?',
    why: 'Az autók minimális tömegét a pilótával együtt írják elő. Korábban ezért a magasabb, nehezebb pilóták hátrányban voltak, és többen egészségtelenül sokat fogytak.\n\n2019 óta a pilóta és az ülés tömegét külön ellenőrzik: ha kevesebb mint **80 kg**, a különbséget a pilóta ülése körül elhelyezett **ballaszttal** kell kiegészíteni. Így a könnyebb pilóta nem nyer előnyt, a nehezebb pedig egészségesen, megfelelő izomtömeggel versenyezhet.',
    links: ['lecke:sport/taplalkozas', 'modell:f1-auto#monocoque', 'lecke:sport/forma1']
  },
  {
    id: 'sp-f1-szelcsatorna', cat: 'sport', sport: 'f1',
    q: 'az F1-ben 2021 óta **a bajnok csapat kapja a legkevesebb szélcsatorna-időt**, az utolsó pedig a legtöbbet?',
    why: 'A csapatok kicsinyített (60%-os) modellekkel a szélcsatornában, valamint számítógépes áramlástani szimulációval (CFD) fejlesztik az autók aerodinamikáját. 2021 óta egy **csúszó skála** szabja meg, ki mennyit tesztelhet: az előző évben jobb helyen végzett csapat kevesebbet, a hátrébb végzett többet.\n\nA cél az, hogy a lemaradó csapatok gyorsabban fel tudjanak zárkózni, így szorosabb legyen a verseny – a fejlesztés tehát nemcsak pénz, hanem **okos tervezés** kérdése.',
    links: ['modell:f1-auto#elso-szarny', 'modell:f1-auto#padlolemez', 'lecke:sport/forma1']
  },
  {
    id: 'sp-f1-rajt', cat: 'sport', sport: 'f1',
    q: 'az F1-rajtnál a piros lámpák **véletlenszerű idő után** alszanak ki, hogy a pilóták ne tudják előre kiszámolni a pillanatot?',
    why: 'A rajtnál öt piros lámpa gyullad ki egymás után, majd egy változó, előre nem ismert szünet után egyszerre kialszanak – ekkor indul a verseny. Ha a szünet mindig ugyanannyi lenne, a pilóták „időzítenének”, és nem reagálnának.\n\nA jó pilóták reakcióideje kb. **0,2 s**. Az autóba épített érzékelők figyelik, ha valaki a lámpák kialvása előtt elmozdul – ez korai rajtnak számít, és büntetés jár érte.',
    links: ['lecke:biologia/ideg-hormon-emesztes', 'szakszo:anatomia/reflexiv', 'modell:agy#homlok']
  },
  {
    id: 'sp-f1-telemetria', cat: 'sport', sport: 'f1',
    q: 'egy F1-es autó **több száz érzékelővel** méri magát, és az adatok verseny közben élőben jutnak el a mérnökökhöz?',
    why: 'Az érzékelők mérik a gumik hőmérsékletét és nyomását, a fékek hőmérsékletét, a felfüggesztés mozgását, a motor és az akkumulátor állapotát, a pilóta gáz- és fékpedál-használatát és még sok mást.\n\nEzt a **telemetriát** rádiókapcsolat továbbítja a boxba és a gyári központba, ahol mérnökök elemzik. A pilóta így tanácsot kaphat, hol tud gyorsítani, és időben kiderülhet, ha egy alkatrész meghibásodni készül.',
    links: ['modell:f1-auto#felfuggesztes', 'tantargy:informatika', 'lecke:sport/forma1']
  },

  /* ───────── FORMA–1: PILÓTÁK ───────── */
  {
    id: 'sp-hamilton-rekordok', cat: 'sport', sport: 'f1', athletes: ['Lewis Hamilton'],
    q: 'Lewis Hamilton **8 évesen kezdett gokartozni**, és később minden idők legtöbb F1-es futamgyőzelmét és pole pozícióját gyűjtötte össze?',
    why: 'Hamilton gyerekként gokartversenyeken tűnt fel; édesapja több munkát is vállalt, hogy a versenyzést finanszírozni tudják. 13 évesen bekerült a McLaren utánpótlás-programjába.\n\nA 2025-ös idény végén **105 futamgyőzelemmel** és **104 pole pozícióval** tartotta mindkét rekordot, és Michael Schumacherrel együtt neki van a legtöbb, **7 világbajnoki címe**. Az elsők között szólalt fel a sokszínűségért a motorsportban is.',
    links: ['lecke:sport/forma1', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-hamilton-hungaroring', cat: 'sport', sport: 'f1', athletes: ['Lewis Hamilton'],
    q: 'Lewis Hamilton **nyolcszor nyerte meg a Magyar Nagydíjat** – többször, mint bárki más?',
    why: 'Hamilton 2007-ben, 2009-ben, 2012-ben, 2013-ban, 2016-ban, 2018-ban, 2019-ben és 2020-ban győzött a Hungaroringen, és 2023-ban itt szerezte meg a **kilencedik** pole pozícióját is – ennyiszer senki sem indult az élről egyetlen pályán sem.\n\nA Hungaroring kanyargós, lassú pálya, ahol nehéz előzni, ezért itt a jó időmérő és a gumik kímélése különösen fontos.',
    links: ['lecke:sport/forma1', 'modell:f1-auto#gumik']
  },
  {
    id: 'sp-verstappen-legfiatalabb', cat: 'sport', sport: 'f1', athletes: ['Max Verstappen'],
    q: 'Max Verstappen **17 évesen** indult először F1-es futamon, és 18 évesen már futamot is nyert?',
    why: 'Verstappen 2015-ben Ausztráliában **17 év 166 naposan** állt rajthoz – ez máig rekord, és azóta a szabályok legalább 18 éves kort írnak elő. 2016-ban Spanyolországban 18 év 228 naposan nyert, ő a legfiatalabb futamgyőztes.\n\nAz édesapja, Jos Verstappen is F1-pilóta volt, és gyerekkorától gokarton tanította. Max később négy világbajnoki címet nyert sorban (2021–2024).',
    links: ['lecke:sport/forma1', 'lecke:sport/edzeselmelet']
  },
  {
    id: 'sp-verstappen-2023', cat: 'sport', sport: 'f1', athletes: ['Max Verstappen'],
    q: 'Max Verstappen 2023-ban **22 futamból 19-et megnyert**, közte 10-et egymás után?',
    why: 'A 2023-as idény minden idők egyik legfölényesebb szezonja volt: Verstappen 19 győzelmet aratott, és **10 egymást követő** futamon diadalmaskodott, ami rekord.\n\nEhhez kiváló autó kellett – a Red Bull padlója és aerodinamikája különösen jól működött –, de a pilóta hibátlansága is: alig hibázott, és minden körülmények között, esőben is gyors maradt.',
    links: ['lecke:sport/forma1', 'modell:f1-auto#padlolemez']
  },
  {
    id: 'sp-senna-monaco', cat: 'sport', sport: 'f1', athletes: ['Ayrton Senna'],
    q: 'Ayrton Senna 1988-ban Monacóban **másfél másodperccel** gyorsabb kört futott az időmérőn, mint csapattársa, a világbajnok Alain Prost?',
    why: 'Senna a monacói időmérőn kb. **1,4 másodperccel** verte meg Prostot ugyanabban az autóban – ez óriási különbség. Senna később azt mondta, mintha „tudatosan túllépett volna” a szokásos határain, olyan mértékben koncentrált.\n\nSenna összesen **6-szor** nyerte meg a Monacói Nagydíjat, ami rekord. A szűk, falakkal határolt pályán a koncentráció és a pontosság mindennél fontosabb.',
    links: ['lecke:sport/sportpszichologia', 'lecke:sport/forma1']
  },
  {
    id: 'sp-senna-donington', cat: 'sport', sport: 'f1', athletes: ['Ayrton Senna'],
    q: 'Senna 1993-ban esőben **egyetlen kör alatt az ötödik helyről az élre** ért Doningtonban?',
    why: 'Az 1993-as Európa Nagydíjon szakadó esőben rajtoltak. Senna az első körben négy autót előzött meg, és az élre állt, majd a versenyt is megnyerte – ezt a kört sokan minden idők legjobb F1-es körének tartják.\n\nVizes pályán a gumi tapadása sokkal kisebb, ezért a pilótának érzékenyen kell adagolnia a gázt és a féket, és a pálya kevésbé vizes részeit kell keresnie. Senna ebben különlegesen tehetséges volt – és rengeteget gyakorolt nedves pályán is.',
    links: ['modell:f1-auto#gumik', 'lecke:sport/forma1', 'lecke:fizika/newton']
  },
  {
    id: 'sp-imola-biztonsag', cat: 'sport', sport: 'f1', athletes: ['Ayrton Senna'],
    q: 'Senna 1994-es halála után az F1-ben **20 évig nem halt meg pilóta futamhétvégén** szerzett sérülésben, a biztonsági fejlesztéseknek köszönhetően?',
    why: 'Az 1994-es imolai hétvégén Roland Ratzenberger és Ayrton Senna is életét vesztette. Ezután az FIA sorra vezette be a fejlesztéseket: magasabb oldalfalakat a pilóta feje körül, szigorúbb ütközési teszteket, a nyakat védő HANS-rendszert, később a halót.\n\nA következő halálos baleset Jules Bianchié volt, aki a 2014-es Japán Nagydíjon szerzett sérüléseibe 2015-ben halt bele. A tragédiák után a tudomány és a mérnöki munka tette egyre biztonságosabbá a sportot.',
    links: ['modell:f1-auto#monocoque', 'modell:f1-auto#halo', 'lecke:sport/forma1']
  },
  {
    id: 'sp-schumacher-edzes', cat: 'sport', sport: 'f1', athletes: ['Michael Schumacher'],
    q: 'Michael Schumacher az elsők között **tette az F1-pilóták edzését élsportolói szintűvé**?',
    why: 'Schumacher a 90-es években olyan fizikai felkészítéssel dolgozott, ami akkor még nem volt általános a pilóták körében: állóképességi és erőedzés, nyakerősítés, gondos étrend. Így a futam végén is ugyanolyan gyors és koncentrált tudott maradni, mint az elején.\n\nEz a hozzáállás azóta alapkövetelmény lett. Schumacher **7 világbajnoki címet** és **91 futamgyőzelmet** szerzett, 2004-ben egyetlen idényben 13 futamot nyert.',
    links: ['lecke:sport/edzeselmelet', 'lecke:sport/test-edzes', 'lecke:sport/forma1']
  },
  {
    id: 'sp-alonso-400', cat: 'sport', sport: 'f1', athletes: ['Fernando Alonso'],
    q: 'Fernando Alonso az első pilóta, aki **több mint 400 F1-es nagydíjon** indult?',
    why: 'Alonso 2001-ben debütált, 2005-ben és 2006-ban világbajnok lett – az első címekor ő volt az addigi legfiatalabb bajnok. 2024-ben ő lett az első, aki elérte a 400 rajtot, és a 2025-ös idényt is végigversenyezte.\n\nAz idős korban is magas teljesítmény titka a rendszeres edzés: Alonso híres a reflexeit és a látását fejlesztő gyakorlatairól és a kerékpározásról. Az izomzat és a reakcióidő megfelelő edzéssel sokáig megőrizhető.',
    links: ['lecke:sport/edzeselmelet', 'lecke:sport/test-edzes', 'lecke:sport/forma1']
  },
  {
    id: 'sp-leclerc-monaco', cat: 'sport', sport: 'f1', athletes: ['Charles Leclerc'],
    q: 'Charles Leclerc 2024-ben **93 év után az első monacói győztese lett a Monacói Nagydíjnak**?',
    why: 'Leclerc Monacóban született, de a hazai futamán sokáig balszerencsés volt: korábban többször pole pozícióból sem tudott dobogóra állni. 2024-ben a rajttól a célig vezetett, és megnyerte a versenyt.\n\nUtoljára Louis Chiron, egy másik monacói versenyző győzött itt, **1931-ben**, még a világbajnokság megalakulása előtt. Leclerc története jó példa arra, hogy a sorozatos kudarcok után is érdemes kitartani.',
    links: ['lecke:sport/sportpszichologia', 'lecke:sport/forma1']
  },
  {
    id: 'sp-norris-2025', cat: 'sport', sport: 'f1', athletes: ['Lando Norris', 'Max Verstappen', 'Oscar Piastri'],
    q: 'a 2025-ös F1-világbajnokság **mindössze 2 ponton** dőlt el, az utolsó futamon?',
    why: 'Lando Norris 423 ponttal nyerte a bajnokságot a 421 pontos Max Verstappen és a 410 pontos Oscar Piastri előtt. Az abu-dzabi döntőn Verstappen nyert, de Norrisnak a harmadik hely is elég volt.\n\nNorris lett a McLaren első egyéni világbajnoka 2008 óta. A szoros bajnokságban a **következetesség** döntött: minden pontnak, minden jó boxkiállásnak és minden elkerült hibának jelentősége volt.',
    links: ['lecke:sport/forma1', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-piastri-harom-cim', cat: 'sport', sport: 'f1', athletes: ['Oscar Piastri'],
    q: 'Oscar Piastri **három egymást követő évben három különböző sorozatot nyert meg**, mielőtt F1-es lett?',
    why: 'Az ausztrál Piastri 2019-ben a Formula Renault Eurocupot, 2020-ban az FIA Formula–3-at, 2021-ben pedig az FIA Formula–2-t nyerte meg – az F3-ban és az F2-ben is **újoncként**.\n\nEz azért nehéz, mert minden új sorozatban más autót, más gumikat és új pályákat kell megtanulni. Piastrit a nyugodt, elemző stílusa segítette: a hibáiból gyorsan tanult, és ritkán hibázott kétszer ugyanott.',
    links: ['lecke:sport/sportpszichologia', 'lecke:sport/forma1']
  },
  {
    id: 'sp-hungaroring-1986', cat: 'sport', sport: 'f1', athletes: ['Nelson Piquet', 'Ayrton Senna'],
    q: 'a Hungaroringet **mindössze kb. 8 hónap alatt építették meg**, és 1986-ban ez volt az első F1-futam a vasfüggönytől keletre?',
    why: 'A Mogyoródon épült pálya építése 1985 októberében kezdődött, és 1986 nyarára elkészült. Az első Magyar Nagydíjat 1986. augusztus 10-én rendezték, kb. 200 000 néző előtt.\n\nNelson Piquet egy legendás előzéssel, a kanyar **külső ívén** ment el Ayrton Senna mellett, és nyert. Magyarországon egyébként már 1936-ban is volt nagydíj, de az még nem számított világbajnoki futamnak. A Magyar Nagydíj 1986 óta minden évben a naptár része.',
    links: ['lecke:sport/forma1', 'lecke:tortenelem/huszadik-szazad']
  },
  {
    id: 'sp-baumgartner', cat: 'sport', sport: 'f1', athletes: ['Baumgartner Zsolt'],
    q: 'Baumgartner Zsolt az **első magyar Forma–1-es pilóta**, és ő az egyetlen magyar, aki F1-es pontot szerzett?',
    why: 'Baumgartner Zsolt 2003-ban a Magyar Nagydíjon, hazai közönség előtt mutatkozott be a Jordan csapatával. 2004-ben a Minardinál versenyzett, és az Egyesült Államok Nagydíján (Indianapolis) **8. helyen** ért célba, ami akkor egy pontot ért.\n\nEz volt a Minardi első pontja több mint két év után. Összesen 20 nagydíjon indult – a kis csapat lassabb autójával is kitartóan, a végéig küzdött.',
    links: ['lecke:sport/forma1', 'lecke:sport/olimpia']
  },

  /* ───────── KOSÁRLABDA: FIZIKA ÉS TUDOMÁNY ───────── */
  {
    id: 'sp-kosar-gyuru-labda', cat: 'sport', sport: 'kosar',
    q: 'a kosárgyűrű **majdnem kétszer olyan széles, mint a labda**, mégis olyan nehéz betalálni?',
    why: 'A gyűrű belső átmérője kb. **45 cm**, a felnőtt labdáé kb. **24 cm**. Ha a labda függőlegesen esne bele, rengeteg hely lenne – de a dobás mindig ferdén érkezik.\n\nMinél laposabb szögben érkezik a labda, annál kisebbnek „látszik” felülről a gyűrű nyílása (a nyílás látszó mérete a beesési szög szinuszával arányos). Ezért kell **ívesen** dobni: meredekebb beérkezésnél nagyobb a hibahatár.',
    links: ['lecke:sport/kosarlabda', 'lecke:matematika/masodfoku', 'lecke:matematika/pitagorasz']
  },
  {
    id: 'sp-kosar-dobasi-iv', cat: 'sport', sport: 'kosar',
    q: 'a jó dobóknál a labda **nagyjából 45 fokos szögben érkezik a gyűrűbe**?',
    why: 'A dobott labda pályája – ha a légellenállástól eltekintünk – **parabola**, mint egy másodfokú függvény grafikonja. Ha a labda túl laposan érkezik, kicsi a „bejárat”; ha túl meredeken, akkor nagyon magasra kell dobni, és a pontatlanság nő.\n\nKosárlabdás dobásokat mérő rendszerek adatai szerint a jó találati arányhoz a kb. **45°-os beérkezési szög** körüli dobások a legjobbak, és az is számít, hogy a labda a gyűrű közepe mögé érkezzen. Ma már sok csapat szenzorokkal méri és edzi a játékosok dobásívét.',
    links: ['lecke:sport/kosarlabda', 'lecke:matematika/masodfoku', 'lecke:fizika/mertekegysegek-mozgas']
  },
  {
    id: 'sp-kosar-porges', cat: 'sport', sport: 'kosar',
    q: 'a jó kosaras dobásnál a labda **hátrafelé pörög**, és ettől „puhábban” pattan le a gyűrűről?',
    why: 'Amikor a dobó a csuklójával „lecsapja” a labdát, az hátrafelé pörögve repül. Ha a labda eltalálja a gyűrűt vagy a palánkot, a súrlódás miatt a pörgés lefékezi a vízszintes mozgását: a labda veszít a sebességéből, és nagyobb eséllyel a gyűrű közelében marad, sőt beesik.\n\nPörgés nélkül a labda keményebben, kiszámíthatatlanabbul pattan el. Ezért mondják az edzők, hogy a dobás végén a csukló „nézzen be a kosárba”.',
    links: ['lecke:sport/kosarlabda', 'szakszo:fizika-bsc/impulzusmomentum', 'lecke:fizika/newton']
  },
  {
    id: 'sp-kosar-lebeges', cat: 'sport', sport: 'kosar', athletes: ['Michael Jordan'],
    q: 'a zsákoló kosaras azért tűnik úgy, mintha „lebegne”, mert **a repülési idő kb. 70%-át az ugrás felső felében tölti**?',
    why: 'A felfelé ugró test lassul, a csúcson egy pillanatra megáll, majd gyorsulva esik vissza. Fent tehát lassan mozog, ezért ott sok időt tölt. Kiszámolható, hogy az ugrásmagasság felső felében töltött idő a teljes repülési idő `1/√2`-ed része, vagyis kb. **71%**.\n\nEgy 1 m-es függőleges ugrás teljes repülési ideje kb. 0,9 s – ebből kb. 0,64 s jut a felső fél méterre. Ezért tűnt úgy, hogy Michael Jordan „megáll a levegőben”.',
    links: ['lecke:sport/kosarlabda', 'lecke:fizika/mertekegysegek-mozgas', 'lecke:matematika/masodfoku']
  },
  {
    id: 'sp-kosar-24-mp', cat: 'sport', sport: 'kosar',
    q: 'a kosárlabda 24 másodperces támadóidejét **egy egyszerű osztással** számolták ki?',
    why: 'Az 1950-es évek elején az NBA-meccsek sokszor unalmasak voltak: a vezető csapat egyszerűen tartotta a labdát. Danny Biasone, a Syracuse Nationals tulajdonosa megfigyelte, hogy egy jó meccsen a két csapat összesen kb. 120 dobást kísérel meg.\n\nA 48 perc 2880 másodperc, és `2880 / 120 = 24`. Az 1954–55-ös idényben bevezetett **24 másodperces szabály** után a csapatok átlagos pontszáma kb. 79-ről 93-ra ugrott, és a kosárlabda sokkal gyorsabb, látványosabb lett.',
    links: ['lecke:sport/kosarlabda', 'lecke:matematika/tortek']
  },
  {
    id: 'sp-harmas-forradalom', cat: 'sport', sport: 'kosar',
    q: 'az NBA-ben 1980 körül meccsenként **kb. 3 hárompontost** dobott meg egy csapat, ma pedig több mint 35-öt?',
    why: 'Az NBA az 1979–80-as idényben vezette be a hárompontos vonalat. Eleinte kevesen használták, mert a távoli dobást kockázatosnak tartották.\n\nA számok azonban mást mutattak: egy 36%-os hárompontos dobás átlagosan **`3 × 0,36 = 1,08` pontot** ér, egy 45%-os közepes távolságú dobás csak `2 × 0,45 = 0,9`-et. Ezt a **várható érték** szemléletet az adatelemzők terjesztették el, és a 2020-as évekre a csapatok már meccsenként több mint 35 hármast kíséreltek meg.',
    links: ['lecke:sport/kosarlabda', 'szakszo:valszam/varhato-ertek', 'lecke:matematika/szazalek']
  },
  {
    id: 'sp-sarok-harmas', cat: 'sport', sport: 'kosar',
    q: 'az NBA-ben **a sarokból dobott hármas rövidebb**, ezért az elemzők szerint az egyik legértékesebb dobás?',
    why: 'Az NBA-pályán a hárompontos vonal a gyűrűtől legmesszebb **7,24 m**-re van, de a sarkokban – ahol a vonal az oldalvonalhoz közel egyenesen fut – csak **6,71 m**-re. A rövidebb távolság miatt a sarokhármasok találati aránya általában jobb, a jutalom viszont ugyanúgy 3 pont.\n\nEzért a modern csapatok szándékosan állítanak dobókat a sarkokba. A FIBA-szabályok szerint (Európában) a hárompontos vonal 6,75 m-re van, a sarokban 6,60 m-re.',
    links: ['lecke:sport/kosarlabda', 'lecke:matematika/pitagorasz', 'szakszo:valszam/varhato-ertek']
  },
  {
    id: 'sp-forro-kez', cat: 'sport', sport: 'kosar',
    q: 'a „forró kéz” – amikor valaki zsinórban talál – **30 évig tudományos tévhitnek számított, aztán kiderült, hogy a bizonyításban hiba volt**?',
    why: '1985-ben Gilovich, Vallone és Tversky elemezte a kosarasok dobássorozatait, és arra jutott, hogy a találatok nem „sorozatosabbak”, mint a véletlen alapján várható. A „forró kéz” ezért évtizedekig a tévhitek iskolapéldája lett.\n\n2018-ban Joshua Miller és Adam Sanjurjo kimutatta, hogy az eredeti elemzés módszerében egy rejtett **statisztikai torzítás** volt. A javított számítás szerint egy kis „forró kéz” hatás mégis létezhet. Jó példa arra, hogy a tudomány önmagát is ellenőrzi és javítja.',
    links: ['szakszo:valszam/fuggetlenseg', 'szakszo:valszam/felteteles-valoszinuseg', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-alulrol-bunteto', cat: 'sport', sport: 'kosar', athletes: ['Rick Barry', 'Wilt Chamberlain'],
    q: 'Wilt Chamberlain a **100 pontos meccsén alulról, „nagymama-stílusban”** dobta a büntetőket, és 32-ből 28-at bedobott?',
    why: '1962. március 2-án Chamberlain 100 pontot szerzett – ez máig NBA-rekord. Abban az idényben alulról, két kézzel dobta a büntetőket, amit Rick Barry is használt, aki pályafutása alatt kb. **90%-os** büntetődobó volt.\n\nAz alulról dobásnál kevesebb ízület mozog, a labda magasabb ívben érkezik és lágyabban pattan – fizikailag tehát egyszerűbb és stabilabb mozdulat. Mégis kevesen használják, főleg azért, mert sokan „cikinek” érzik – Chamberlain is visszatért a hagyományos dobáshoz, és a büntetői rosszabbak lettek.',
    links: ['lecke:sport/kosarlabda', 'lecke:sport/sportpszichologia', 'szakszo:anatomia/izulet']
  },
  {
    id: 'sp-labda-pattanas', cat: 'sport', sport: 'kosar',
    q: 'a FIBA szabályai szerint a kosárlabdát **úgy kell felfújni, hogy 1,8 m-ről leejtve 1,2–1,4 m magasra pattanjon vissza**?',
    why: 'A labda nyomását a FIBA a pattanással ellenőrzi: 1800 mm magasról (a labda aljától mérve) leejtve a labda tetejének 1200 és 1400 mm közé kell visszapattannia. Ez azt jelenti, hogy egy pattanásnál a labda mozgási energiájának kb. negyede-harmada elvész.\n\nAz elveszett energia a labda és a padló deformálódásakor hővé és hanggá alakul. Ha a labda túl puha, „döglött” lesz, ha túl kemény, pattog és nehéz irányítani.',
    links: ['lecke:sport/kosarlabda', 'lecke:fizika/energia-munka', 'szakszo:fizika-bsc/munkatetel']
  },
  {
    id: 'sp-naismith', cat: 'sport', sport: 'kosar',
    q: 'a kosárlabdát 1891-ben egy tanár találta ki, és **az első „kosarak” barackos kosarak voltak**?',
    why: 'James Naismith, egy kanadai születésű testnevelő tanár, 1891 decemberében az amerikai Springfieldben talált ki egy beltéri játékot, hogy diákjai télen is mozoghassanak. 13 szabályt írt, és két barackos kosarat szögeztek a tornaterem karzatára, **10 láb (3,05 m)** magasan.\n\nA kosarak magassága azóta sem változott. Eleinte minden kosár után létrával szedték ki a labdát – a kosár alját csak később vágták ki.',
    links: ['lecke:sport/kosarlabda', 'lecke:sport/olimpia']
  },
  {
    id: 'sp-kosar-kovetes', cat: 'sport', sport: 'kosar',
    q: 'az NBA-csarnokokban kamerák **minden játékos és a labda helyzetét másodpercenként többször rögzítik**?',
    why: 'Az NBA 2013-tól minden csarnokban bevezette a kamerás játékoskövetést. A tető alá szerelt kamerák képéből a szoftver kiszámolja, hol van minden játékos és a labda, milyen gyorsan fut valaki, ki mennyit védekezik és honnan dob.\n\nAz adatokból az elemzők például azt is mérik, mennyire nehéz egy dobás a védő távolsága alapján. Ma már a játékosok testtartását, ízületeit is követik – ami a sérülések megelőzésében is segíthet.',
    links: ['lecke:sport/kosarlabda', 'tantargy:informatika', 'szakszo:valszam/varhato-ertek']
  },

  /* ───────── KOSÁRLABDA: JÁTÉKOSOK ───────── */
  {
    id: 'sp-curry-402', cat: 'sport', sport: 'kosar', athletes: ['Stephen Curry'],
    q: 'Stephen Curryt az egyetemek alig akarták, **később ő lett az NBA első egyhangúlag megválasztott MVP-je**?',
    why: 'Curry középiskolásként vékony és alacsony volt, ezért a nagy egyetemek nem ajánlottak neki ösztöndíjat; a kis Davidson College-ba került. Ott sokat gyakorolt, és kiemelkedő dobóvá vált.\n\nA 2015–16-os idényben **402 hármast** dobott be, ami máig rekord, és ő lett az NBA első játékosa, aki minden szavazatot megkapva lett az év legértékesebb játékosa (MVP). Curry megmutatta, hogy a gyors, pontos dobás felülírhatja a testi adottságokat.',
    links: ['lecke:sport/kosarlabda', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-curry-4000', cat: 'sport', sport: 'kosar', athletes: ['Stephen Curry'],
    q: 'Stephen Curry az első NBA-játékos, aki **4000 hárompontost** dobott be?',
    why: 'Curry 2021. december 14-én megelőzte Ray Allent (2973 hármas), és minden idők legeredményesebb hárompontos dobója lett. 2025. március 13-án, egy nappal a 37. születésnapja előtt dobta be a **4000.** hármasát.\n\nAkkor rajta kívül csak James Harden érte el a 3000-et. Curry kiemelkedő dobásai mögött rengeteg ismétlés áll: az ilyen „automatikus” mozdulatokat a kisagy és a mozgatókéreg tökéletesíti.',
    links: ['lecke:sport/kosarlabda', 'modell:agy#kisagy', 'lecke:sport/edzeselmelet']
  },
  {
    id: 'sp-curry-agyedzes', cat: 'sport', sport: 'kosar', athletes: ['Stephen Curry'],
    q: 'Stephen Curry az edzésein **nemcsak a dobást, hanem az agyát is edzi** – például villogó fényekre kell reagálnia labdavezetés közben?',
    why: 'Curry edzője, Brandon Payne olyan gyakorlatokat is használ, ahol Curry két labdát vezet, miközben fényjelekre kell reagálnia, vagy olyan szemüveget visel, amely időnként elsötétül. Így a figyelem megosztását és a gyors döntéshozatalt edzi.\n\nEzeket **neurokognitív** gyakorlatoknak hívják. Céljuk, hogy a labdavezetés automatikussá váljon, és az agy figyelme felszabaduljon a pálya „olvasására” – hasonlóan ahhoz, ahogy a focisták körülnéznek a labda átvétele előtt.',
    links: ['lecke:sport/sportpszichologia', 'modell:agy#homlok', 'modell:szem']
  },
  {
    id: 'sp-jordan-jv', cat: 'sport', sport: 'kosar', athletes: ['Michael Jordan'],
    q: 'Michael Jordant másodikos középiskolásként **nem a felnőtt csapatba, hanem az utánpótláscsapatba osztották be** – és ez csak még keményebb munkára sarkallta?',
    why: 'Sokszor hallani, hogy Jordant „kirúgták” a középiskolai csapatból – ez így nem pontos. 1978-ban, másodikosként, kb. 178 cm magasan nem került be az iskola első csapatába, hanem a fiatalabbakból álló **JV-csapatban** játszott.\n\nJordan elmondása szerint ez nagyon bántotta, és még többet edzett. A következő évre sokat nőtt és fejlődött – később hat NBA-bajnoki címet és hat döntős MVP-díjat nyert.',
    links: ['lecke:sport/sportpszichologia', 'lecke:sport/edzeselmelet']
  },
  {
    id: 'sp-jordan-9000', cat: 'sport', sport: 'kosar', athletes: ['Michael Jordan'],
    q: 'Michael Jordan híres mondása szerint **több mint 9000 dobást elhibázott a pályafutása során** – és épp ezért lett sikeres?',
    why: 'Egy 1997-es reklámban Jordan ezt mondta: „Több mint 9000 dobást elhibáztam a pályafutásom során. Majdnem 300 meccset elvesztettem. 26-szor bíztak rám győztes dobást, és elhibáztam. Újra és újra kudarcot vallottam az életemben. És ezért sikerülhetett.”\n\nA sportpszichológia szerint a hibákhoz való viszony kulcsfontosságú: aki a kudarcot **tanulási lehetőségnek** tekinti, az bátrabban próbálkozik, és gyorsabban fejlődik.',
    links: ['lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-bunteto-vonal-zsakolas', cat: 'sport', sport: 'kosar', athletes: ['Michael Jordan', 'Julius Erving'],
    q: 'a büntetővonalról elrugaszkodó zsákolást **nem Michael Jordan találta ki**, hanem Julius Erving mutatta be először egy zsákolóversenyen?',
    why: 'Julius „Dr. J” Erving 1976-ban, az ABA zsákolóversenyén rugaszkodott el a büntetővonal közeléből, és zsákolt. Michael Jordan 1988-ban, az NBA zsákolóversenyén ismételte meg – a róla készült fotók tették világhíressé.\n\nA büntetővonal a palánktól kb. 4,6 m-re van. Az ilyen ugráshoz nagy vízszintes sebesség kell a nekifutásból, és erős elrugaszkodás, ami a vízszintes mozgást felfelé irányuló lendületbe fordítja – a repülés pályája egy parabola.',
    links: ['lecke:sport/kosarlabda', 'lecke:fizika/mertekegysegek-mozgas', 'lecke:matematika/masodfoku']
  },
  {
    id: 'sp-lebron-pontrekord', cat: 'sport', sport: 'kosar', athletes: ['LeBron James'],
    q: 'LeBron James az első kosaras, aki **40 000 pontot** szerzett az NBA alapszakaszában?',
    why: 'LeBron 2023. február 7-én megelőzte Kareem Abdul-Jabbart (38 387 pont), és az NBA minden idők legeredményesebb pontszerzője lett. 2024. március 2-án elsőként érte el a 40 000 pontot, 2025 márciusában pedig az alapszakasz és a rájátszás együttes 50 000 pontját is.\n\nAz egészen kivételes hosszú pályafutás mögött tudatos test-karbantartás áll: LeBron elmondása szerint az alvást (éjszakánként 8–10 órát) a felkészülés egyik legfontosabb részének tartja.',
    links: ['lecke:sport/edzeselmelet', 'lecke:sport/kosarlabda']
  },
  {
    id: 'sp-lebron-23-ideny', cat: 'sport', sport: 'kosar', athletes: ['LeBron James'],
    q: 'LeBron James **23 NBA-idényt** játszott le – többet, mint bárki a liga történetében?',
    why: 'LeBron 2003-ban, 18 évesen került közvetlenül a középiskolából az NBA-be. 2025 novemberében, a 23. idénye első meccsén megelőzte Vince Cartert, aki 22 idényt játszott.\n\nAz életkorral az izmok regenerációja lassul, és nő a sérülésveszély. A hosszú pályafutáshoz ezért a pihenés, a táplálkozás, a mobilitás és a gondos terhelésadagolás ugyanolyan fontos, mint maga az edzés.',
    links: ['lecke:sport/edzeselmelet', 'lecke:sport/taplalkozas', 'lecke:sport/test-edzes']
  },
  {
    id: 'sp-kobe-81', cat: 'sport', sport: 'kosar', athletes: ['Kobe Bryant'],
    q: 'Kobe Bryant **81 pontot** szerzett egyetlen NBA-meccsen, ami a második legjobb teljesítmény a liga történetében?',
    why: '2006. január 22-én a Toronto Raptors ellen Kobe 81 pontot dobott; ennél többet csak Wilt Chamberlain szerzett (100 pont, 1962). Utolsó meccsén, 2016-ban, 37 évesen még 60 pontot dobott.\n\nKobe „Mamba-mentalitásnak” nevezte a hozzáállását: a folyamatos fejlődés iránti megszállottságot, a korai, kemény edzéseket és a részletek gondos elemzését. Pályafutása során 5 NBA-bajnoki címet és 2 olimpiai aranyérmet nyert.',
    links: ['lecke:sport/sportpszichologia', 'lecke:sport/edzeselmelet']
  },
  {
    id: 'sp-jokic-41', cat: 'sport', sport: 'kosar', athletes: ['Nikola Jokić'],
    q: 'Nikola Jokićot **csak a 41. helyen draftolták** – a kiválasztását a tévé egy reklám alatt jelentette be –, később háromszor lett MVP?',
    why: 'A szerb center 2014-ben a második körben került a Denver Nuggetshez; a pillanatot a közvetítő tévé egy reklám miatt nem is mutatta élőben. Akkor kevesen hittek benne, mert nem volt túl gyors, és nem ugrott nagyot.\n\nJokić a játéklátásával és a passzaival lett kiemelkedő: **2021-ben, 2022-ben és 2024-ben** is ő lett az NBA legértékesebb játékosa, 2023-ban pedig bajnoki címet és döntős MVP-díjat nyert. A siker nem mindig a legnagyobb ugráson vagy sebességen múlik.',
    links: ['lecke:sport/kosarlabda', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-jokic-tripla-dupla', cat: 'sport', sport: 'kosar', athletes: ['Nikola Jokić'],
    q: 'Jokić 2024–25-ben **egész idényes átlagban tripla-duplát** ért el, amire előtte csak két játékos volt képes, és centerként senki?',
    why: 'Tripla-duplának nevezik, ha egy játékos egy meccsen három statisztikai kategóriában (pl. pont, lepattanó, gólpassz) is legalább 10-et ér el. Egy egész idény **átlagában** ezt előtte csak Oscar Robertson (1961–62) és Russell Westbrook (négyszer) érte el.\n\nJokić centerként: pontot szerez, leszedi a lepattanókat és közben a csapat fő irányítója. Ehhez kiváló **térlátás** kell – az agy folyamatosan előrejelzi, hol lesznek a társak egy pillanattal később.',
    links: ['lecke:sport/kosarlabda', 'modell:agy#fali']
  },
  {
    id: 'sp-wembanyama', cat: 'sport', sport: 'kosar', athletes: ['Victor Wembanyama'],
    q: 'Victor Wembanyama újoncként **meccsenként 3,6 dobást blokkolt**, többet, mint bárki más a ligában?',
    why: 'A több mint 2,2 m magas francia játékos a 2023–24-es idényben 3,6 blokkos átlaggal az egész NBA-t vezette – újoncként előtte ez csak Manute Bolnak sikerült (1985–86). Az év újonca díjat **egyhangúlag** kapta meg.\n\nA blokkhoz nem csak magasság kell: Wembanyama karfesztávolsága is rendkívüli, és mégis gyorsan, ügyesen mozog, sőt távolról is dob. Az ilyen magas testnél az **ízületek és az izmok összehangolt erősítése** különösen fontos.',
    links: ['lecke:sport/kosarlabda', 'szakszo:anatomia/csont', 'lecke:sport/test-edzes']
  },
  {
    id: 'sp-eurobasket-1955', cat: 'sport', sport: 'kosar',
    q: 'a magyar férfi kosárlabda-válogatott **1955-ben Európa-bajnok lett**, ráadásul hazai közönség előtt, Budapesten?',
    why: 'Az 1955-ös Európa-bajnokságot június 7. és 19. között Budapesten rendezték 18 csapat részvételével. A magyar csapat a döntő csoportban 6 győzelemmel és 1 vereséggel lett első Csehszlovákia és a Szovjetunió előtt – utóbbit le is győzte.\n\nEz máig a magyar férfi kosárlabda legnagyobb sikere. Két évvel korábban, 1953-ban a csapat ezüstérmes volt – a fejlődés tehát egymásra épülő évek kemény munkájának eredménye volt.',
    links: ['lecke:sport/kosarlabda', 'lecke:sport/olimpia', 'lecke:tortenelem/huszadik-szazad']
  },
  {
    id: 'sp-hanga-euroliga', cat: 'sport', sport: 'kosar', athletes: ['Hanga Ádám'],
    q: 'Hanga Ádám az **első magyar kosaras, aki megnyerte az Euroligát**, Európa legrangosabb klubsorozatát?',
    why: 'Hanga Ádám 2023-ban a Real Madriddal nyert Euroligát. Előtte 2021-ben a Barcelonával, 2022-ben a Real Madriddal is döntőt játszott, de mindkettőt elvesztette – harmadszorra sikerült.\n\nHanga a védekezéséről híres: 2016–17-ben az Euroliga **legjobb védőjének** választották. Jó védekezéshez gyors lábmunka, jó előrelátás és rengeteg kitartás kell – ez a játék kevésbé látványos, de sokszor döntő része.',
    links: ['lecke:sport/kosarlabda', 'lecke:sport/sportpszichologia']
  },
  {
    id: 'sp-david-kornel', cat: 'sport', sport: 'kosar', athletes: ['Dávid Kornél'],
    q: 'Dávid Kornél **Michael Jordan korábbi csapatában, a Chicago Bullsban** mutatkozott be az NBA-ben?',
    why: 'A nagykanizsai születésű Dávid Kornél 1999 januárjában szerződött a Chicago Bullshoz, és februárban már pályára is lépett. Ő lett az első magyar férfi kosaras, aki NBA-meccsen játszott.\n\nPályafutása során 109 NBA-mérkőzésen szerepelt, később Európában is sikeres volt. Útja megmutatta a magyar fiataloknak, hogy kitartással a világ legerősebb ligájába is el lehet jutni.',
    links: ['lecke:sport/kosarlabda', 'lecke:sport/sportpszichologia']
  }
]);
