/* Tudtad? – kiegészítés: a még tény nélküli leckékhez és a kevés ténnyel bíró modellek alkatrészeihez. Formátum: js/tudtad.js */
STUDIE.addFacts([

  /* ───────── AUTÓSZERELÉS ───────── */
  {
    id: 'emelo-nem-tartobak', cat: 'szakmak',
    q: 'a megemelt autó alá **soha nem szabad csak az emelőre bízva** bemászni, mert a hidraulikus emelő **lassan, észrevétlenül is leereszthet**?',
    why: 'A hidraulikus emelőben olaj tartja a terhet, és a tömítések, szelepek mellett az olaj idővel **elszivároghat** – az autó ilyenkor lassan, hang nélkül süllyed. Egy elcsúszó vagy megbillenő emelő pedig egy pillanat alatt leejtheti a több mint egytonnás járművet.\n\nEzért a szabály: az emelő csak **emelésre** való, a megemelt autót **alátámasztó bakokra** (vagy szabályos szerelőemelőre) kell tenni, a gyártó által megjelölt emelési pontokon. A műhelyekben ezt minden szerelő az első napon megtanulja.',
    links: ['lecke:autoszereles/biztonsag']
  },
  {
    id: 'differencialmu-kanyar', cat: 'technika',
    q: 'kanyarban az autó **külső kereke hosszabb utat tesz meg**, mint a belső – és ha nem lenne **differenciálmű**, a kerekek csúszkálnának és gyorsan kopnának?',
    why: 'Egy kanyarban a két hajtott kerék különböző sugarú köríven halad, ezért a külsőnek **többet kell fordulnia**. Ha mereven össze lennének kötve, az egyiknek folyton csúsznia kellene az úton.\n\nA **differenciálmű** egy ügyes fogaskerék-rendszer (bolygókerekekkel), amely a motor nyomatékát úgy osztja szét a két féltengelyre, hogy közben azok **eltérő fordulatszámmal** foroghassanak. Ennek ára is van: ha az egyik kerék jégre kerül, a hagyományos differenciálmű miatt az kipörög, és a másik kerék sem kap elég nyomatékot – ezt orvosolja a **differenciálzár** vagy az elektronikus kipörgésgátló. Villanyautóban is van differenciálmű: a reduktorral egybeépítve.',
    links: ['lecke:autoszereles/eroatvitel', 'modell:elektromos-auto#gear']
  },
  {
    id: 'dugattyu-gyorsulas', cat: 'technika',
    q: 'egy magas fordulaton járó benzinmotorban a dugattyú **másodpercenként kb. kétszázszor áll meg és fordul vissza**, és közben a gyorsulása a **nehézségi gyorsulás ezerszeresét** is meghaladhatja?',
    why: 'A dugattyú minden főtengely-fordulat alatt egyszer lefelé és egyszer felfelé megy, és a holtpontokon **meg kell állnia**. 6000/perc fordulatnál ez másodpercenként 100 fordulat, vagyis **200 irányváltás**. Egy kb. 86 mm-es löketnél az átlagsebessége kb. 17 m/s (kb. 60 km/h), a holtpont közelében a gyorsulása pedig a kb. **2000 g**-t is elérheti.\n\nEzért a dugattyúkat **könnyű alumíniumötvözetből** készítik, a hajtókarokat pedig úgy tervezik, hogy ezt az óriási, folyton irányt váltó erőt milliószor kibírják. Egy túlpörgetett motorban a hajtókar el is szakadhat – ilyenkor néha szó szerint kilyukasztja a blokkot.',
    links: ['modell:benzinmotor#pistons', 'modell:benzinmotor#rods', 'lecke:autoszereles/negyutemu-motor']
  },
  {
    id: 'fotengely-olajfilmen-lebeg', cat: 'technika',
    q: 'járó motorban a főtengely **nem ér hozzá a csapágyaihoz**: egy **néhány mikrométeres olajfilmen lebeg**?',
    why: 'A siklócsapágyakban a forgó tengely magával húzza az olajat egy szűkülő résbe, ahol így **nagy nyomás** alakul ki, és ez megemeli a tengelyt. Ezt **hidrodinamikus kenésnek** hívják: az olajréteg vékonyabb egy hajszál tizedénél, mégis több tonnás erőket hordoz.\n\nA kopás ezért főleg akkor nagy, amikor ez a film még nem alakult ki vagy megszakad: induláskor, olajhiánykor, túl híg vagy elhasznált olajjal. Az olajteknőből a szivattyú folyamatosan nyomja az olajat a csapágyakhoz – ha kigyullad a piros olajnyomás-lámpa, azonnal meg kell állni.',
    links: ['modell:benzinmotor#crank', 'modell:benzinmotor#pan', 'lecke:autoszereles/kenes-hutes']
  },

  /* ───────── ELEKTROMOS AUTÓ ───────── */
  {
    id: 'villanyauto-egy-sebesseg', cat: 'technika',
    q: 'a legtöbb villanyautóban **nincs sebességváltó**, csak egyetlen fix áttétel – mégis 0-ról is erősen húz, és autópályán is elmegy?',
    why: 'A belső égésű motor csak egy szűk fordulatszám-tartományban erős, és alapjárat alatt egyáltalán nem tud nyomatékot adni, ezért kell neki váltó. A villanymotor viszont **már álló helyzetből a teljes nyomatékát** adja, és kb. **15 000–20 000/perc** fordulatig is felpöröghet.\n\nEzért elég egyetlen **reduktor**, amely kb. 8–10-szeres lassító áttétellel hajtja a kerekeket. Kevesebb alkatrész, nincs kuplung, nincs váltási szünet – ezért gyorsulnak a villanyautók ilyen egyenletesen.',
    links: ['lecke:elektromos-auto/mukodes', 'modell:elektromos-auto#gear', 'modell:villanymotor#tengely']
  },
  {
    id: 'hv-kabel-narancs', cat: 'technika',
    q: 'a villanyautókban a **narancssárga kábelek** jelzik a halálos veszélyt – és járműben már **60 V egyenfeszültség felett** „nagyfeszültségről” beszélünk?',
    why: 'Az autóipari szabályok szerint a **60 V egyenfeszültség** (vagy 30 V váltakozó) feletti rendszerek számítanak nagyfeszültségűnek, a mai villanyautók akkuja pedig kb. **400 vagy 800 V**-os. Ezeket a vezetékeket szabványosan **narancssárga** színnel jelölik, hogy a szerelők és a mentők is azonnal felismerjék.\n\nA rendszert csak erre kiképzett szakember áramtalaníthatja (szervizdugó, feszültségmentesség mérése), és a lekapcsolás után is ki kell várni, hogy az inverter **kondenzátorai kisüljenek**. Laikusnak tilos a narancssárga részekhez nyúlni.',
    links: ['lecke:elektromos-auto/hv-biztonsag', 'modell:elektromos-auto#hv', 'modell:elektromos-auto#inverter']
  },
  {
    id: 'dc-toltes-obc-nelkul', cat: 'technika',
    q: 'gyorstöltőnél az autó **saját töltője ki sem kapcsol be**: a nagy, szekrényszerű töltőoszlop maga az egyenirányító?',
    why: 'Az akku csak **egyenárammal** tölthető. Otthoni (AC) töltésnél a váltakozó áramot az autóba épített **fedélzeti töltő (OBC)** alakítja át, ez viszont kicsi és könnyű, ezért jellemzően csak **kb. 7–22 kW**-ot tud.\n\nDC gyorstöltésnél az átalakítás a **töltőoszlopban** történik, amely sokszor 150–350 kW-os, ezért akkora, mint egy hűtőszekrény. Az autó ilyenkor csak „megmondja” a töltőnek a kommunikációs érintkezőkön (CCS csatlakozó), mekkora feszültséget és áramot fogad el, és az áram egyenesen az akkuba megy.',
    links: ['lecke:elektromos-auto/toltes', 'modell:elektromos-auto#obc', 'modell:elektromos-auto#port']
  },
  {
    id: 'toltes-80-szazalek-felett', cat: 'technika',
    q: 'gyorstöltésnél a villanyautó **10-ről 80%-ra gyakran hamarabb** feltöltődik, mint **80-ról 100%-ra**?',
    why: 'A töltés elején, amikor az akku még üresebb, a cellák nagy áramot is elviselnek. A tele akkuhoz közeledve viszont a cellák feszültsége a megengedett maximum közelébe ér, ezért a töltő **csökkenti az áramot** – különben a grafit anódon fémlítium válhatna ki, ami öregíti és veszélyesebbé teszi a cellát.\n\nEzért hosszú úton általában az a leggyorsabb, ha kb. **10–80%** között töltünk többször, rövidebb ideig. A hideg akku is lassabban töltődik, ezért sok autó a gyorstöltő felé haladva **előmelegíti** az akkuját.',
    links: ['lecke:elektromos-auto/toltes', 'modell:elektromos-auto#cool', 'modell:elektromos-auto#battery']
  },
  {
    id: 'villanyauto-12v-akku', cat: 'technika',
    q: 'a villanyautóban is van egy **hagyományos 12 voltos akku** – és ha az lemerül, az autó a **teli nagyfeszültségű akku mellett sem indul**?',
    why: 'A világítás, az ablakemelők, a kijelzők és a vezérlőegységek a megszokott **12 V-os** hálózatról működnek. Ráadásul a nagyfeszültségű akkut az autó vázától **mágneskapcsolók (kontaktorok)** választják el, és ezeket is a 12 V-os rendszer kapcsolja be.\n\nMenet közben a **DC-DC átalakító** tölti a kis akkut a nagyból, de ha az autó sokáig áll, vagy a kis akku elöregszik, a „lelke” nem ébred fel. Ilyenkor a megoldás ugyanaz, mint egy benzines autónál: bikázás vagy akkucsere.',
    links: ['modell:elektromos-auto#dcdc', 'lecke:elektromos-auto/mukodes']
  },

  /* ───────── VILLANYMOTOR ───────── */
  {
    id: 'lemezelt-vasmag', cat: 'fizika',
    q: 'a villanymotor vasmagja **nem tömör vas**, hanem **több száz, papírvékony, egymástól elszigetelt acéllemezből** áll?',
    why: 'A változó mágneses tér a vasban is feszültséget indukál, és ez a vas belsejében körbe-körbe folyó **örvényáramokat** kelt, amelyek csak fűtik a motort. Ha a vasmag tömör lenne, ez óriási veszteséget okozna.\n\nEzért az állórészt és a forgórészt is kb. **0,2–0,35 mm** vastag, szigetelőréteggel bevont **elektrotechnikai acéllemezekből** rétegezik („lemezköteg”). Az örvényáramok így csak egy-egy vékony lemezen belül folyhatnak, ezért sokkal kisebbek. Ugyanezért lemezelt a transzformátorok vasmagja is.',
    links: ['modell:villanymotor#allores-koteg', 'modell:villanymotor#forgoresz', 'lecke:elektromos-auto/motor-inverter']
  },
  {
    id: 'hajtutekercs', cat: 'technika',
    q: 'a modern villanyautó-motorok tekercseit nem kerek huzalból tekerik, hanem **hajtű alakúra hajlított, lapos rézrudakból** rakják össze?',
    why: 'Kerek huzalok közé sok levegő marad, ezért a horonyban a réz csak kb. a hely felét tölti ki. A **hajtűtekercselésnél** (hairpin) téglalap keresztmetszetű rézrudakat U alakúra hajlítanak, bedugják a hornyokba, majd a végüket **lézerrel összehegesztik**.\n\nA lapos rudak szorosabban illeszkednek, így a horony **nagyobb része réz** – kisebb az ellenállás és a hőtermelés, jobb a hűtés, és a gyártás is jól automatizálható. Ezért egyre több villanyautó motorja ilyen.',
    links: ['modell:villanymotor#tekercseles', 'modell:villanymotor#allores-koteg']
  },
  {
    id: 'rezolver-pozicio', cat: 'technika',
    q: 'a villanyautó inverterének **minden pillanatban tudnia kell, pontosan milyen szögben áll** a motor forgórésze – különben nem tudná hajtani?',
    why: 'Az állandó mágneses szinkronmotorban az állórész forgó mágneses terének mindig egy kicsit **„előre kell húznia”** a forgórész mágneseit. Ehhez az inverternek tudnia kell, hol tartanak éppen a mágnesek – egy fok töredékének pontosságával, akár percenként több ezer fordulatnál is.\n\nErre gyakran egy **rezolvert** használnak: ez egy kis forgó transzformátor a tengely végén, amelyben nincs érzékeny elektronika, ezért bírja a hőséget, a rezgést és az olajat. Kimenő jeleinek arányából a vezérlés kiszámolja a pontos szöget.',
    links: ['modell:villanymotor#rezolver', 'modell:villanymotor#csatlakozo', 'lecke:elektromos-auto/motor-inverter']
  },

  /* ───────── MATEMATIKA ───────── */
  {
    id: 'celsius-fahrenheit-minusz-40', cat: 'matek',
    q: 'van egy hőmérséklet, ahol a Celsius- és a Fahrenheit-skála **ugyanazt a számot** mutatja: **−40 fok**?',
    why: 'A két skála közötti átváltás egy **lineáris függvény**: `F = 1,8 · C + 32`. A meredekség 1,8, mert a víz fagyás- és forráspontja között a Celsius-skálán 100, a Fahrenheiten 180 fok van; a +32 pedig az eltolás (a víz 32 °F-on fagy).\n\nHa megkeressük, hol egyenlő a kettő, a `C = 1,8 · C + 32` egyenletet kell megoldani: `−0,8 · C = 32`, tehát `C = −40`. Grafikusan ez a két egyenes metszéspontja.',
    links: ['lecke:matematika/linearis-fuggveny', 'lecke:mat-alap/egyenletek']
  },
  {
    id: 'parabola-antenna-fokusz', cat: 'matek',
    q: 'a parabolaantenna azért **parabola alakú**, mert ez az egyetlen görbe, amely **minden párhuzamosan érkező sugarat ugyanabba a pontba** gyűjt?',
    why: 'A másodfokú függvény grafikonja, a **parabola** különleges tulajdonsága, hogy a tengelyével párhuzamosan érkező sugarakat a visszaverődés után mind egy pontba, a **fókuszba** küldi. A távoli műholdról érkező jelek gyakorlatilag párhuzamosak, ezért az antenna „feje” a fókuszban van.\n\nFordítva is működik: a fókuszba tett fényforrás fénye párhuzamos nyalábként lép ki – így működnek a régi autóreflektorok és a zseblámpák. A naperőművek parabolavályúi pedig a napfényt egy csőre gyűjtik.',
    links: ['lecke:matematika/masodfoku', 'lecke:fizika/hullamok-feny']
  },
  {
    id: 'emelo-archimedesz', cat: 'fizika',
    q: 'az emelővel **kis erővel nagy terhet** mozdíthatsz meg – de munkát **egy joule-t sem spórolsz** vele?',
    why: 'Archimédesznek tulajdonítják a mondást: „Adj egy szilárd pontot, és kimozdítom a Földet!” Az **emelő** elve: ha az erőkar tízszer hosszabb a teherkarnál, tizedannyi erő is elég – cserébe viszont **tízszer hosszabb úton** kell nyomnod.\n\nA munka erő szorozva úttal, ezért az emelő (a csiga, a lejtő, a csavar és a fogaskerék is) csak **átváltja** az erőt és az utat, a munkát nem csökkenti. Valójában a súrlódás miatt mindig egy kicsit **több** munkát kell végezni, mint emelő nélkül.',
    links: ['lecke:fiz-alap/energia-munka', 'lecke:fizika/energia-munka']
  },

  /* ───────── MAGYAR, ANGOL ───────── */
  {
    id: 'magyar-fokusz-ige-elott', cat: 'nyelv',
    q: 'a magyarban a mondat **legfontosabb, kiemelt része** szinte mindig **közvetlenül az ige elé** kerül?',
    why: 'Hasonlítsd össze: „**Péter** ment tegnap moziba” (nem Anna), „**Tegnap** ment Péter moziba” (nem ma), „**Moziba** ment tegnap Péter” (nem színházba). A szavak ugyanazok, de mindig az ige előtti rész a hangsúlyos, új információ – ezt a nyelvészek **fókusznak** hívják.\n\nEzért mondják, hogy a magyar szórend „szabad”, de valójában **nem tetszőleges**: a sorrend a jelentés árnyalatait hordozza. Az angolban ezt inkább hangsúllyal vagy szerkezettel fejezik ki („It was Peter who…”).',
    links: ['lecke:magyar/mondat']
  },
  {
    id: 'im-lovin-it', cat: 'nyelv',
    q: 'egy világhírű gyorsétterem szlogenje, az **„I\'m lovin\' it”** az iskolai nyelvtan szerint **„hibás”** – és épp ettől feltűnő?',
    why: 'Az angolban az ún. **állapotot kifejező igéket** (love, like, know, want, believe) általában nem tesszük **Present Continuous**-ba: helyesen „I love it”. A folyamatos alak viszont azt sugallja, hogy ez **éppen most, ebben a pillanatban** történik, élményszerű – ezért választotta a 2003-as reklámkampány.\n\nA mai beszélt angolban egyre gyakoribb ez a „szabályszegés”, de a nyelvvizsgán még érdemes a szabálynál maradni.',
    links: ['lecke:angol/jelen-ido']
  },
  {
    id: 'angol-rendhagyo-igek', cat: 'nyelv',
    q: 'a **leggyakoribb angol igék szinte mind rendhagyók** (be, have, do, go, say, make…) – és a ritka rendhagyó igék idővel **szabályossá válnak**?',
    why: 'A rendhagyó alakokat (went, said, made) egyenként kell megjegyezni. A gyakran használt szavakat viszont annyiszor halljuk, hogy rendhagyó alakjuk **nem felejtődik el**, a ritkákat azonban a beszélők hajlamosak a szabályos `-ed` mintára átalakítani.\n\nEgy 2007-es kutatás szerint egy rendhagyó ige annál gyorsabban „szabályosodik”, minél ritkább: például a régi „holp” helyett ma „helped”, a „wrought” helyett „worked” a múlt idő. A „went” ráadásul egy másik ige (wend) múlt ideje volt eredetileg.',
    links: ['lecke:angol/mult-ido']
  },
  {
    id: 'a-an-kiejtes', cat: 'nyelv',
    q: 'angolul **„an hour”** és **„a university”** a helyes – mert az a/an választását **nem a betű, hanem a kiejtés** dönti el?',
    why: 'Az **an** alakot akkor használjuk, ha a következő szó **magánhangzóval kezdődik kiejtve**. Az „hour” szóban a h néma, így kiejtve „aur” – ezért **an hour**. A „university” viszont „jú”-val kezdődik, ami mássalhangzó-hang (mint a j), ezért **a university**.\n\nAz an a régebbi, eredeti alak (az „one” rokona), a mássalhangzók előtt kopott le az n. A rövidítéseknél is a kiejtés számít: **an MP3** („em-pí-thrí”), de **a USB stick**.',
    links: ['lecke:angol/nevelok']
  },
  {
    id: 'shakespeare-do-nelkul', cat: 'nyelv',
    q: 'Shakespeare idejében az angolok még **„do” nélkül** kérdeztek: azt mondták, **„What say you?”** és **„Know you…?”**?',
    why: 'A régebbi angolban a kérdést egyszerűen az **ige előrehozásával** képezték, ahogy ma a németben is („Kommst du?”). A **do-segédige** használata a 16–17. században terjedt el fokozatosan, és csak később vált kötelezővé.\n\nEzért kell ma „What do you say?” és „Do you know…?”. Néhány régies maradvány máig él: „How goes it?”, vagy a tagadásban „I know not” – ez utóbbi ma már ünnepélyesen vagy viccesen hangzik.',
    links: ['lecke:angol/kerdesek']
  },

  /* ───────── TERMÉSZETTUDOMÁNY, KÉMIA ───────── */
  {
    id: 'uveg-nem-folyik', cat: 'kemia',
    q: 'az a közkeletű állítás, hogy az üveg **„lassan folyó folyadék”**, és ezért vastagabbak alul a régi templomablakok, **tévhit**?',
    why: 'Az üveg **amorf szilárd anyag**: részecskéi nem szabályos kristályrácsban, hanem rendezetlenül vannak, mint egy folyadékban – de gyakorlatilag mozdulatlanul. Számítások szerint szobahőmérsékleten az üveg folyása még a **világegyetem koránál is hosszabb** idő alatt sem lenne látható.\n\nA régi ablakok egyenetlenségét a korabeli **gyártási módszer** okozta: az üveget forgatással, hengerítéssel készítették, ezért a táblák vastagsága nem volt egyforma, és az üvegesek általában a vastagabb szélét tették alulra. Van olyan régi ablak is, amelynél a vastagabb rész felül van.',
    links: ['lecke:termeszet/anyagok', 'lecke:kem-alap/anyagok']
  },
  {
    id: 'csontok-fele-kezben-labban', cat: 'emberi-test',
    q: 'a csontjaid **több mint fele a két kezedben és a két lábfejedben** van?',
    why: 'Egy felnőtt csontváza kb. **206 csontból** áll. Ebből egy-egy kézben **27**, egy-egy lábfejben **26** van, vagyis összesen kb. **106** – több mint a fele.\n\nA sok kis csont és ízület teszi lehetővé, hogy a kezünk finom mozdulatokra (írás, hangszeres játék) legyen képes, a lábfejünk pedig rugalmasan alkalmazkodjon az egyenetlen talajhoz. Egy újszülöttnek egyébként **kb. 270–300** csontja van, de ezek egy része a növekedés során összeforr.',
    links: ['lecke:termeszet/emberi-test']
  },
  {
    id: 'mol-viz-korty', cat: 'kemia',
    q: '**egy mól víz** csak kb. **18 gramm**, egy nagyobb korty – mégis kb. **6 · 10²³** molekula van benne, sokkal több, mint ahány homokszem a Föld összes tengerpartján?',
    why: 'A **mól** a kémikusok „darabszáma”: 1 mól anyagban **6,02 · 10²³** részecske van (Avogadro-szám). A vízmolekula moláris tömege 2 · 1 + 16 = **18 g/mol**, így 18 g, azaz kb. 18 ml víz éppen egy mól.\n\nA Föld összes homokszemét egy ismert becslés kb. **10¹⁸–10¹⁹** darabra teszi – ennél egy korty víz molekuláinak száma is **tízezerszer–százezerszer** nagyobb. Ezért nem darabra, hanem tömegre és mólra számolunk a kémiában.',
    links: ['lecke:kemia/anyagmennyiseg', 'lecke:kem-alap/molekulak-kepletek']
  },
  {
    id: 'mengyelejev-joslat', cat: 'kemia',
    q: 'Mengyelejev a periódusos rendszerében **üres helyeket hagyott**, és **megjósolta** még fel sem fedezett elemek tulajdonságait – és igaza lett?',
    why: 'Mengyelejev 1869-ben az elemeket tömegük és tulajdonságaik alapján rendezte sorba, és ahol a minta „hiányos” volt, ott nem erőltette a sorrendet, hanem **lyukat hagyott**. Az ekaalumínium, ekaszilícium és ekabór nevű elemek tömegét, sűrűségét és vegyületeit is előre megbecsülte.\n\nNéhány éven belül felfedezték a **galliumot** (1875), a **szkandiumot** (1879) és a **germániumot** (1886) – a tulajdonságaik meglepő pontossággal egyeztek a jóslattal. Ez győzte meg a tudósokat, hogy a periódusos rendszer nem véletlen, hanem az atomok felépítését tükrözi.',
    links: ['lecke:kem-alap/atom-periodusos', 'modell:atom#valence']
  },
  {
    id: 'co-co2-egy-oxigen', cat: 'kemia',
    q: '**egyetlen oxigénatom** különbség választja el a kilélegzett, ártalmatlan szén-dioxidot (CO₂) a **halálosan mérgező** szén-monoxidtól (CO)?',
    why: 'A **CO₂** a légzés és a tökéletes égés terméke, kis mennyiségben ártalmatlan. A **CO** akkor keletkezik, ha a szén **kevés oxigénnel**, tökéletlenül ég el – például rosszul működő gázkazánban, eldugult kéményben.\n\nA szén-monoxid kb. **200-szor erősebben** kötődik a vér hemoglobinjához, mint az oxigén, így elzárja az oxigénszállítást. Színtelen és szagtalan, ezért a „csendes gyilkos”: a gázkészülékes lakásokba ajánlott **CO-érzékelő**, a kazánt, kéményt pedig szakemberrel rendszeresen ellenőriztetni kell.',
    links: ['lecke:kem-alap/molekulak-kepletek', 'lecke:kem-alap/kemiai-valtozasok']
  },
  {
    id: 'voroskaposzta-indikator', cat: 'kemia',
    q: 'a **vöröskáposzta leve** igazi kémiai indikátor: ecettől **pirosra**, szódabikarbónától **kékes-zöldre** változik a színe?',
    why: 'A vöröskáposzta színét **antocianin** festékanyagok adják, amelyek molekulaszerkezete a **pH-tól** függően változik – és vele az, hogy milyen színű fényt nyelnek el. Savas közegben pirosak, semlegesben lilák, enyhén lúgosban kékek-zöldek, erősen lúgosban sárgák.\n\nEz egy biztonságos konyhai kísérlet: főzd ki a káposztát, a lila levet önts több pohárba, és csepegtess bele citromlevet, ecetet, szódabikarbónás vizet. Ugyanez az anyag színezi a szedret, az áfonyát – és ezért kékül meg néha a vöröskáposzta-saláta, ha lúgos vízben főzik.',
    links: ['lecke:kem-alap/savak-lugok', 'lecke:kemia/savak-bazisok']
  },

  /* ───────── NAPELEM ───────── */
  {
    id: 'napelem-aramszunet-lekapcsol', cat: 'technika',
    q: 'egy hálózatra kapcsolt napelemes ház **áramszünetkor ragyogó napsütésben is sötét marad**?',
    why: 'A hálózatra tápláló (on-grid) inverter folyamatosan figyeli a hálózat feszültségét és frekvenciáját, és ha az eltűnik, **másodperceken belül lekapcsol**. Ezt a szabványok írják elő (**szigetüzem elleni védelem**).\n\nEnnek oka a **szerelők biztonsága**: az áramszolgáltató emberei a lekapcsolt vezetéken dolgoznak, és ha egy napelemes rendszer visszatáplálna, halálos feszültséget kaphatnának. Aki áramszünetben is áramot szeretne, annak **akkumulátoros, szigetüzemre is képes (hibrid) rendszer** kell, amely előbb leválasztja a házat a hálózatról.',
    links: ['lecke:napelem/rendszerek', 'modell:napelempanel#doboz']
  },
  {
    id: 'egyenaramu-iv', cat: 'fizika',
    q: 'az **egyenáramú ív sokkal nehezebben alszik ki**, mint a váltakozó áramú – ezért a napelem kábeleit **terhelés alatt tilos széthúzni**?',
    why: 'A váltakozó áram másodpercenként **100-szor** áthalad a nullán, és ilyenkor egy kialakult ív magától könnyen kialszik. Az **egyenáram** viszont sosem nulla, így egy széthúzott csatlakozó vagy laza kötés között az ív **tartósan éghet**, és több ezer fokos hőmérséklete tüzet okozhat.\n\nA napelemsorok (stringek) feszültsége ráadásul **több száz, akár 1000 V** is lehet, és amíg fény éri a paneleket, nem lehet egyszerűen „lekapcsolni” őket. Ezért kell speciális **DC-szakaszolókat** és jól összepattintott, azonos gyártmányú MC4-csatlakozókat használni – ezt a munkát csak képzett szakember végezheti.',
    links: ['lecke:napelem/bekotes', 'modell:napelempanel#mc4']
  },
  {
    id: 'napelem-mikrorepedes', cat: 'technika',
    q: 'ha valaki **rálép egy napelem panelre**, a cellákban **szabad szemmel láthatatlan mikrorepedések** keletkezhetnek, amelyek évek alatt rontják a teljesítményt?',
    why: 'A napelemcellák kb. **0,15–0,2 mm** vastag szilíciumszeletek – vékonyabbak egy bankkártyánál, és törékenyek, mint az üveg. A panel üvege ugyan sokat kibír, de a pontszerű terhelés (térd, talp, ejtés) meghajlítja a laminátumot, és a cellák megrepedhetnek.\n\nA repedéseket csak **elektrolumineszcens (EL) felvételen** lehet látni, ahol a panelt áram alá helyezve „világítani” kényszerítik. A repedt cellarészek idővel leválhatnak az áramkörről, és melegedő **forró pontok** keletkezhetnek. Ezért szereléskor a paneleket két kézzel, a keretüknél fogva viszik, és nem lépnek rájuk.',
    links: ['lecke:napelem/szereles', 'modell:napelempanel#cellak']
  },
  {
    id: 'napelem-jegeso-teszt', cat: 'technika',
    q: 'a napelem paneleket a minősítéskor **jéggolyókkal lövik meg** – kb. **80 km/h-val** repülő, 2,5 cm-es jégdarabokkal?',
    why: 'A nemzetközi szabvány (IEC 61215) szerint a paneleknek ki kell bírniuk, hogy **25 mm átmérőjű jéggolyók** kb. **23 m/s** sebességgel csapódjanak a felület több pontjára. Ehhez kb. 3–4 mm vastag **edzett üveget** használnak, amely jóval erősebb a közönséges ablaküvegnél.\n\nAz edzett üveg ha mégis eltörik, apró, tompa szélű darabokra esik szét. A napelemüveg ráadásul **vasszegény**, ezért nem zöldes árnyalatú, mint a közönséges üveg, és több fényt enged át.',
    links: ['modell:napelempanel#uveg', 'lecke:napelem/szereles']
  },
  {
    id: 'napelem-eva-barnulas', cat: 'technika',
    q: 'a régi napelemeken látható **barnás elszíneződés** nem kosz, hanem a cellák körüli **„ragasztófólia” öregedése**?',
    why: 'A cellákat felül és alul egy-egy **EVA** (etilén-vinil-acetát) fólia veszi körül. Gyártáskor a rétegeket vákuumban kb. **140–150 °C**-on összepréselik, az EVA megolvad, és légmentesen beágyazza a cellákat az üveg és a hátlap közé.\n\nAz évtizedekig tartó UV-sugárzás és hő hatására a régebbi EVA-fóliák **besárgulhatnak, megbarnulhatnak**, és kevesebb fényt engednek át. A mai fóliákba UV-stabilizátorokat kevernek, így ez sokkal ritkább.',
    links: ['modell:napelempanel#eva1', 'modell:napelempanel#eva2']
  },

  /* ───────── HŐSZIVATTYÚ ───────── */
  {
    id: 'hutokozeg-hidegben-forr', cat: 'fizika',
    q: 'a hőszivattyú hűtőközege **mínusz tíz fokos téli levegőtől „felforr”**, és így szív el hőt a hidegből?',
    why: 'A forráspont a **nyomástól** függ: kis nyomáson sokkal alacsonyabb hőmérsékleten forr egy folyadék. Az **expanziós szelep** után a hűtőközeg nyomása lecsökken, és így a forráspontja jóval a kinti levegő hőmérséklete alá esik, például −25 °C-ra.\n\nAz elpárologtatóban a −10 °C-os levegő tehát „melegebb” a közegnél, és hőt ad át neki, amitől az **elforr**. A kompresszor ezután összenyomja a gőzt, amitől az felforrósodik, és a kondenzátorban a fűtővíznek adja le a hőt, miközben újra folyadékká válik.',
    links: ['lecke:hoszivattyu/hutokor', 'modell:hoszivattyu#expanzios', 'modell:hoszivattyu#elparologtato', 'modell:hoszivattyu#kondenzator']
  },
  {
    id: 'hoszivattyu-padlofutes', cat: 'technika',
    q: 'ugyanaz a hőszivattyú **padlófűtéssel jóval kevesebb áramot** fogyaszt, mint régi, forró radiátorokkal?',
    why: 'A hőszivattyúnak annál több munkát kell végeznie, minél **nagyobb a hőmérséklet-különbség** a kinti levegő és a fűtővíz között. A régi radiátorok gyakran 55–70 °C-os vizet igényelnek, a **padlófűtés** viszont 30–35 °C-kal is elég meleget ad, mert óriási a felülete.\n\nÖkölszabályként a fűtővíz minden fokkal alacsonyabb hőmérséklete **néhány (kb. 2–3) százalékkal** javíthatja a hatékonyságot. Ezért a hőszivattyú tervezésénél a házat és a fűtési rendszert is figyelembe kell venni: jól szigetelt házban, nagy felületű fűtéssel működik a legjobban.',
    links: ['lecke:hoszivattyu/tipusok', 'modell:hoszivattyu#viz', 'modell:hoszivattyu#szivattyu']
  },
  {
    id: 'hutokor-vakuumozas', cat: 'technika',
    q: 'a hőszivattyú hűtőkörébe a töltés előtt **vákuumot húznak** – mert a bennmaradt víz alacsony nyomáson **szobahőmérsékleten is felforr**, és így kiszívható?',
    why: 'A csövek szerelése után a körben levegő és nedvesség marad. A **nedvesség** a hűtőközeggel és az olajjal savakat képezhet, megfagyhat a szelepekben, a levegő pedig rontja a hatékonyságot. Vákuumszivattyúval ezért nagyon alacsony nyomást hoznak létre, amelyen a víz már **szobahőmérsékleten elforr**, és gőzként kiszívható.\n\nUtána ellenőrzik, hogy a vákuum megmarad-e (ha nem, valahol szivárog a rendszer), és csak ezután engedik be a hűtőközeget. A hűtőközeggel dolgozni az EU-ban csak **képesítéssel** (F-gáz vizsga) szabad.',
    links: ['lecke:hoszivattyu/telepites', 'modell:hoszivattyu#vezetekek']
  },
  {
    id: 'inverteres-kompresszor', cat: 'technika',
    q: 'a modern hőszivattyú kompresszora **nem kapcsolgat ki-be**, mint a régi hűtőszekrényeké, hanem **folyamatosan változtatja a fordulatszámát**?',
    why: 'A régi gépek csak „teljes gáz” vagy „kikapcsolva” üzemmódban működtek: túlfűtöttek, leálltak, majd újraindultak. Minden indulás veszteséges és koptató. Az **inverteres** vezérlés a kompresszor motorját változtatható frekvenciájú árammal hajtja, így az épp szükséges teljesítménnyel járhat.\n\nKis terhelésnél lassan, csendesen és **hatékonyabban** dolgozik, mert a hőcserélők ilyenkor kis hőmérséklet-különbséggel is elég hőt adnak át. A vezérlés folyamatosan méri a kinti, a víz- és a hűtőközeg-hőmérsékleteket, és ezek alapján állítja a fordulatot, az expanziós szelepet és a ventilátort.',
    links: ['modell:hoszivattyu#vezerles', 'modell:hoszivattyu#kompresszor', 'modell:hoszivattyu#ventilator']
  },

  /* ───────── VÍZSZERELÉS ───────── */
  {
    id: 'viztorony-nyomas', cat: 'szakmak',
    q: 'a régi **víztornyok** semmi mást nem csinálnak, mint **a magasságukkal adnak nyomást** a vízvezetéknek – minden 10 méter kb. 1 bar?',
    why: 'Egy vízoszlop alján a nyomás a **magasságával** arányos: kb. **10 m** víz kb. **1 bar** (100 kPa) túlnyomást ad. Ha a tartály 30 m magasan van, a csapnál kb. 3 bar a nyomás – szivattyú nélkül, csak a gravitáció miatt.\n\nA szivattyúk éjjel, amikor kevés vizet használnak, feltöltik a tornyot, nappal pedig a torony tartalék és nyomáskiegyenlítő is. Ezért van a víztorony mindig a környék **legmagasabb** pontján. Egy lakásban jellemzően **kb. 2–4 bar** körüli nyomás a megfelelő.',
    links: ['lecke:vizszereles/viz-a-hazban', 'lecke:fiz-alap/nyomas']
  },
  {
    id: 'fagyott-cso-repedes', cat: 'fizika',
    q: 'a fagyott vízcső **gyakran nem ott reped el, ahol a jég van**, hanem egy olyan szakaszon, ahol még folyékony a víz?',
    why: 'Amikor a víz megfagy, a térfogata kb. **9%-kal** nő. A jégdugó azonban a cső belsejéből nő, és a jég kis része tud a még folyékony víz felé terjeszkedni. Ha a cső másik vége (pl. egy elzárt csapnál) zárt, a jégdugó és a csap közé szorult folyékony vízben a **nyomás hatalmasra nő**, és a cső ott reped meg.\n\nEzt kísérletekkel is igazolták. Ezért segít fagyveszélyben, ha a kinti csapokat **elzárják és leürítik**, a fagyveszélyes csöveket szigetelik, és tél előtt a kerti vezetéket leengedik.',
    links: ['lecke:vizszereles/csovek-kotesek', 'modell:fold#vizburok']
  },
  {
    id: 'radiator-nem-sugaroz', cat: 'fizika',
    q: 'a **radiátor** nevével ellentétben a hő nagyobb részét **nem sugárzással**, hanem a mellette felszálló **meleg levegővel** adja le?',
    why: 'A „radiátor” szó a sugárzásra (radiáció) utal, de a megszokott **lapradiátorok** a hő nagyobb részét **konvekcióval** adják le: a fémlap mellett felmelegedő levegő felszáll, helyére alulról hideg levegő áramlik, így a szobában körforgás indul. A lapok közötti hullámos bordák épp ezt segítik.\n\nEzért nem jó a radiátort vastag függönnyel vagy bútorral eltakarni, és ezért helyezik gyakran az **ablak alá**: az onnan lehúzó hideg levegőt rögtön felmelegíti. Ha a radiátor teteje hideg, az alja meleg, valószínűleg **levegő** gyűlt fel benne, és légteleníteni kell.',
    links: ['lecke:vizszereles/futes', 'lecke:fiz-alap/hotan']
  },
  {
    id: 'csopogo-csap', cat: 'szakmak',
    q: 'egy **másodpercenként egyet csöppenő csap** egy év alatt **akár több fürdőkádnyi**, ezer liternél is több vizet pazarol el?',
    why: 'Egy csepp kb. 0,05–0,25 ml. Másodpercenként egy csepp naponta 86 400 csepp, ami a cseppek méretétől függően **kb. 4–20 liter** naponta, vagyis évente **kb. 1500–8000 liter**. Egy fürdőkádba kb. 150 liter fér.\n\nA csöpögést legtöbbször egy elkopott **tömítés** vagy kerámiabetét okozza, amelyet olcsón ki lehet cserélni. A hibakeresésnél a vízóra is segít: ha minden csap zárva van, mégis forog a kis jelzőkerék, valahol szivárgás van – akár a WC-tartályban is.',
    links: ['lecke:vizszereles/munkavedelem-hibakereses']
  },

  /* ───────── PÉNZ, ÁLLAMPOLGÁRI ───────── */
  {
    id: 'kartyaval-tobbet-koltunk', cat: 'penz',
    q: 'kutatások szerint **kártyával fizetve hajlamosak vagyunk többet költeni**, mint készpénzzel?',
    why: 'Készpénznél **látjuk és érezzük**, ahogy fogy a pénz a pénztárcánkból – a lélektan ezt a „fizetés fájdalmának” hívja. Kártyánál, telefonos fizetésnél ez az érzés gyengébb, ezért könnyebben döntünk egy plusz vásárlás mellett.\n\nEgy ismert amerikai kísérletben a résztvevők egy sportjegyért hitelkártyával **akár kétszer annyit** is hajlandók voltak fizetni, mint készpénzzel. A hatás nagysága kutatásonként eltér, de a tanulság egyszerű: a **költségvetéshez** érdemes vezetni a kiadásokat, és a banki értesítőket is rendszeresen átnézni.',
    links: ['lecke:penzugy/koltsegvetes', 'lecke:penzugy/bank']
  },
  {
    id: 'alhir-gyorsabban-terjed', cat: 'penz',
    q: 'egy nagy kutatás szerint a közösségi médiában a **hamis hírek gyorsabban és messzebbre terjednek**, mint az igazak – és főleg **nem a botok**, hanem **mi, emberek** terjesztjük őket?',
    why: 'Az MIT kutatói 2018-ban több mint százezer, ténymentők által ellenőrzött hír terjedését vizsgálták a Twitteren. Az igaz hírek átlagosan **kb. hatszor annyi idő** alatt értek el 1500 embert, mint a hamisak, és a hamis híreket kb. **70%-kal valószínűbben** osztották meg.\n\nA magyarázat: a hamis hír gyakran **újszerűbb, meglepőbb**, és erős érzelmeket (felháborodás, félelem) kelt – ezért szívesebben adjuk tovább. Ezért érdemes megosztás előtt megállni: ki a forrás, máshol is megjelent-e, és miért akarja valaki, hogy ezt érezzem?',
    links: ['lecke:allampolgari/mediatudatossag']
  },

  /* ───────── ASZTALOS, HEGESZTÉS, ÉPÍTŐIPAR ───────── */
  {
    id: 'japan-furesz-huzasra', cat: 'szakmak',
    q: 'a **japán fűrészek húzásra vágnak**, az európaiak többsége pedig tolásra?',
    why: 'Tolásnál a fűrészlapot **nyomóerő** éri, ezért elég vastagnak és merevnek kell lennie, hogy ne hajoljon el. Húzásnál viszont a lap **feszül**, mint egy kifeszített húr, így sokkal **vékonyabb** lehet.\n\nA vékonyabb lap keskenyebb vágást ad, kevesebb faanyag megy forgácsba, és pontosabban, kisebb erővel lehet vele dolgozni. Ezért lettek a japán fűrészek a finom asztalosmunkák (pl. csapolások) kedvelt eszközei Európában is.',
    links: ['lecke:asztalos/keziszerszamok']
  },
  {
    id: 'furesz-ujj-erzekeles', cat: 'szakmak',
    q: 'léteznek olyan asztali körfűrészek, amelyek **kb. 5 ezredmásodperc alatt megállítják** a fűrészlapot, ha az **emberi bőrhöz** ér?',
    why: 'A fűrészlapon kis elektromos jel fut. A fa rossz vezető, az emberi test viszont víztartalma miatt jól vezet, így ha ujj ér a laphoz, a jel hirtelen megváltozik. Ekkor egy fékblokk a fogak közé csapódik, és a lap a gép belsejébe süllyed – a sérülés jó esetben csak egy karcolás.\n\nEz azonban nem helyettesíti a **munkavédelmet**: a védőburkolat, a tolófa, a hasítóék és a szemüveg ugyanúgy kötelező. A körfűrész egyik legnagyobb veszélye a **visszarúgás**, amikor a lap a munkadarabot nagy erővel a dolgozó felé löki.',
    links: ['lecke:asztalos/gepek']
  },
  {
    id: 'lenolajos-rongy-ongyulladas', cat: 'kemia',
    q: 'egy **lenolajos rongy** összegyűrve, kupacba dobva **magától is meggyulladhat**?',
    why: 'A lenolaj (és sok faápoló olaj) úgy „szárad”, hogy a levegő oxigénjével **reagál** és megkeményedik – ez a reakció **hőt termel**. Egy kiterített rongyon a hő eltávozik, egy összegyűrt kupac belsejében viszont felhalmozódik, gyorsítja a reakciót, és órák alatt elérheti a gyulladási hőmérsékletet.\n\nEz valódi, gyakori tűzokozó a műhelyekben. Ezért az olajos rongyokat **kiterítve, nem gyúlékony felületen kell megszárítani**, vagy vízzel teli, zárható fémdobozba tenni.',
    links: ['lecke:asztalos/feluletkezeles', 'lecke:kem-alap/kemiai-valtozasok']
  },
  {
    id: 'szikraproba-acel', cat: 'szakmak',
    q: 'a köszörű **szikráinak alakjából** egy tapasztalt szakember meg tudja becsülni, **milyen acélt** munkál meg?',
    why: 'A köszörűkorong apró, izzó acélszemcséket tép le, amelyek a levegőben **tovább égnek**. Ha az acélban sok a szén, a szemcsében a szén a levegő oxigénjével gázzá alakul, és a részecske szétrobban – ezért a szikrasugár **elágazó, csillagszerű**. A lágyacél szikrái hosszabbak, egyenesebbek, kevésbé ágaznak el.\n\nEz a **szikrapróba**, egy régi, gyors műhelymódszer. A szikra egyébként több száz fokos fémszemcse, ezért köszörüléskor védőszemüveg és tűzbiztos környezet kell – a szikra a fűrészport vagy az olajos rongyot is meggyújthatja.',
    links: ['lecke:hegesztes/megmunkalas']
  },
  {
    id: 'hegesztes-kis-feszultseg-nagy-aram', cat: 'fizika',
    q: 'ívhegesztéskor az ívben **csak kb. 20–30 volt** a feszültség – az olvasztás titka a **több száz amperes** áram?',
    why: 'A hegesztőgép szándékosan **kis feszültséget** ad (üresjárásban is jellemzően 100 V alatt), mert így kisebb az áramütés veszélye. A hőt a nagy, kb. **50–300 A**-es áram termeli az ívben: a teljesítmény `P = U · I`, például 25 V · 150 A ≈ **3,75 kW** egyetlen kis pontban, ahol az ív több ezer fokos.\n\nA hegesztő a fő paramétert, az **áramerősséget** az elektróda vastagsága és az anyag alapján állítja be. Azért a kis feszültség is veszélyes lehet nedves ruhában, izzadtan, fémtartályban – ezért kell szigetelő kesztyű és száraz munkaruha.',
    links: ['lecke:hegesztes/parameterek']
  },
  {
    id: 'vedogaz-szel', cat: 'szakmak',
    q: 'szeles időben a szabadban a védőgázas hegesztés **lyukacsos, gyenge varratot** ad, mert a szél **elfújja a védőgázt**?',
    why: 'A MIG/MAG hegesztésnél a pisztolyból áramló **védőgáz** (pl. argon, CO₂ keveréke) távol tartja az olvadt fémtől a levegő oxigénjét és nitrogénjét. Ha a szél elfújja, ezek beoldódnak az olvadékba, és dermedéskor **gázbuborékok (porozitás)** maradnak a varratban, ami gyengíti.\n\nEzért a szabadban gyakran **bevont elektródás** kézi ívhegesztést használnak: ott az elektróda bevonata égés közben maga állít elő védőgázt és salakot, ami kevésbé érzékeny a szélre. Benti munkánál is figyelni kell a huzatra és a gázáramlás beállítására.',
    links: ['lecke:hegesztes/varratok']
  },
  {
    id: 'romai-beton-ongyogyit', cat: 'szakmak',
    q: 'a 2000 éves római beton egyes építményekben azért maradt ép, mert a benne lévő **mészdarabkák „begyógyítják” a repedéseket**?',
    why: 'A rómaiak betonjában gyakran látni apró fehér **mészrögöket**, amelyeket régen a rossz keverés jelének tartottak. Egy 2023-as MIT-kutatás szerint ezek a forró, **égetett mésszel történő keverés** nyomai, és szerepük van: ha repedés keletkezik és víz jut bele, a mész feloldódik, majd **kalcium-karbonáttá** kristályosodva kitölti a rést.\n\nA római beton tartósságában a **vulkáni hamu** (puccolán) is fontos. A mai beton erősebb, de a vasbetétek rozsdásodása miatt gyakran rövidebb életű – ezért a kutatók a római receptből is tanulnak.',
    links: ['lecke:epitoipar/anyagok', 'lecke:tortenelem/okor']
  },
  {
    id: 'pisa-alapozas', cat: 'szakmak',
    q: 'a pisai ferde torony azért dől meg, mert az alapozása **csak kb. 3 méter mély** volt, és **puha, agyagos talajra** épült?',
    why: 'A torony építése 1173-ban kezdődött, és már a második-harmadik emeletnél **dőlni kezdett**, mert az egyik oldalon a talaj jobban összenyomódott. Az építkezés évtizedekre leállt, ami szerencse volt: közben a talaj tömörödött, különben a torony valószínűleg összedőlt volna.\n\nA mérnökök 1990 és 2001 között a magasabb oldal alól óvatosan **talajt fúrtak ki**, így a torony kb. 40 cm-t „visszaegyenesedett”. Ma is ferde, de stabil. A tanulság: az **alapozást a talajhoz** kell tervezni – ezért kezdődik minden építkezés talajmechanikai vizsgálattal.',
    links: ['lecke:epitoipar/falazas']
  },
  {
    id: 'hoszigeteles-levego', cat: 'fizika',
    q: 'a hungarocell (polisztirolhab) **kb. 98%-ban levegő** – és valójában a **mozdulatlan levegő** szigetel benne?',
    why: 'A **levegő** nagyon rossz hővezető, de ha szabadon áramolhat, a **konvekció** gyorsan elszállítja a hőt. A hab apró, zárt cellái a levegőt **bezárják**, így az nem tud áramlani – ezért szigetel ilyen jól a polisztirol, a kőzetgyapot vagy a madár tolla is.\n\nA szigetelés ellensége a **nedvesség**: a víz kb. 25-ször jobban vezeti a hőt, mint a levegő, ezért a vizes szigetelés sokat veszít a hatásából. Ezért kell a hő- és a vízszigetelést együtt, jól megtervezni.',
    links: ['lecke:epitoipar/szigeteles', 'lecke:fiz-alap/hotan']
  },
  {
    id: 'epitkezes-leeses', cat: 'szakmak',
    q: 'az építőiparban a **halálos balesetek leggyakoribb oka a leesés** – sokszor nem is nagy magasságból?',
    why: 'Európai és amerikai statisztikák szerint az építkezéseken bekövetkező halálos balesetek jelentős része, nagyjából **harmada** magasból való **leeséssel** történik: tetőről, állványról, létráról, födémnyílásba. Már néhány méteres esés is halálos lehet, ha valaki rosszul esik.\n\nEzért kötelező a **korlát**, a nyílások lefedése, az állványok szabályos építése, és ahol ez nem megoldható, a **leesés elleni egyéni védőeszköz** (hám, kötél, kikötési pont). A védősisak a fentről leeső tárgyak ellen is véd.',
    links: ['lecke:epitoipar/munkavedelem']
  },
  {
    id: 'tervrajz-kek', cat: 'szakmak',
    q: 'a tervrajzot azért hívják angolul **„blueprint”**-nek (kék nyomat), mert régen egy **napfénnyel előhívott, kék alapú** fotómásolattal sokszorosították?',
    why: 'Az 1840-es években felfedezett **cianotípia** egy olcsó fotókémiai eljárás: vasvegyületekkel bevont papírt az átlátszó rajz alatt napfénynek tettek ki. Ahol a fény érte, a vegyületek **berlini kék** festékké alakultak, a vonalak alatt viszont fehér maradt a papír.\n\nÍgy keletkezett a jellegzetes **kék alapon fehér vonalas** tervrajz, amelyet az építészek és mérnökök a 20. század közepéig használtak. Ma már nyomtatót és CAD-programot használnak, de a szó megmaradt.',
    links: ['lecke:epitoipar/tervrajz', 'lecke:vizualis/digitalis-kep']
  },

  /* ───────── RENDSZERÜZEMELTETÉS ───────── */
  {
    id: 'esd-nem-erzed', cat: 'informatika',
    q: 'egy **olyan kicsi sztatikus kisülés is tönkretehet** egy számítógép-alkatrészt, amit **meg sem érzel**?',
    why: 'A sztatikus áramütést kb. **3000 V** felett érezzük meg, a pulóverben járkálva pedig a testünk akár több tízezer voltra is feltöltődhet. Az érzékeny chipek egy része viszont már **néhány száz, akár 100 V alatti** kisüléstől is sérülhet – sokszor nem azonnal, hanem úgy, hogy később „rejtélyes” hibákat okoz.\n\nEzért szereléskor **antisztatikus csuklópántot** és alátétet használnak, vagy legalább megérintenek egy földelt fémfelületet, és az alkatrészeket a széleiknél fogva, antisztatikus tasakban tartják.',
    links: ['lecke:rendszeruzem/hardver', 'modell:alaplap#pcb']
  },
  {
    id: 'post-sipkodok', cat: 'informatika',
    q: 'ha a számítógép **monitor nélkül sem tud mit mondani**, akkor **sípolással** üzen: a sípszavak száma és hossza a hiba kódja?',
    why: 'Bekapcsoláskor az alaplap **BIOS/UEFI** firmware-je lefuttat egy önellenőrzést (**POST**): megnézi a processzort, a memóriát, a videokártyát. Ha ez még a kép megjelenése előtt elakad, egy kis hangszóróval vagy jelzőfényekkel (újabban számkijelzővel) jelez.\n\nPéldául sok gépen az ismétlődő hosszú sípolás **memóriahibát** jelent (gyakran csak rosszul ül a RAM a foglalatban). A kódok gyártónként eltérnek, ezért az alaplap kézikönyvében kell megnézni őket.',
    links: ['modell:alaplap#bios', 'modell:alaplap#ram', 'lecke:rendszeruzem/hardver']
  },
  {
    id: 'cmos-elem-ora', cat: 'informatika',
    q: 'az alaplapon lévő **kis gombelem** évekig tartja az **órát** – és ha lemerül, a gép minden indításkor „elfelejti”, milyen nap van?',
    why: 'A kikapcsolt, áramtalanított gépben is jár egy **valós idejű óra** (RTC), amelyet egy kb. **3 V**-os lítium gombelem (jellemzően CR2032) táplál. Régen a BIOS-beállításokat is ez őrizte egy kis „CMOS” memóriában – innen a neve.\n\nAz elem jellemzően **több évig** bírja. Ha lemerül, a gép rossz dátummal indulhat, ami furcsa hibákat okozhat, pl. a weboldalak biztonsági tanúsítványai „lejártnak” tűnnek. Az elem kivétele (áramtalanított gépen) a beállítások gyári alaphelyzetbe állításának egyik módja is.',
    links: ['modell:alaplap#cmos', 'lecke:rendszeruzem/hardver']
  },
  {
    id: 'linux-hobbi', cat: 'informatika',
    q: 'a Linuxot egy **21 éves finn egyetemista** kezdte el hobbiból, azzal, hogy **„nem lesz nagy és profi”** – ma pedig ezen fut a legtöbb szerver és minden Android-telefon?',
    why: 'Linus Torvalds 1991 augusztusában egy internetes fórumon jelentette be, hogy egy ingyenes operációsrendszer-magon dolgozik, „csak hobbiból”. A forráskódot nyilvánossá tette, így bárki javíthatta és bővíthette – a világ minden tájáról programozók ezrei csatlakoztak.\n\nMa a **Linux-kernel** fut a világ szervereinek nagy részén, a felhőszolgáltatásokban, routerekben, okostévékben, és a 2017 óta a világ 500 legerősebb szuperszámítógépének mindegyikén. Az **Android** is Linux-kernelre épül.',
    links: ['lecke:rendszeruzem/operacios-rendszerek', 'lecke:informatika/szamitogep']
  },
  {
    id: 'ipv4-elfogyott', cat: 'informatika',
    q: 'a világ **kifogyott a régi típusú IP-címekből** – a kb. 4,3 milliárd IPv4-cím kevés, mert több eszköz van, mint ahány cím?',
    why: 'Az **IPv4**-cím 32 bites, így legfeljebb `2³² ≈ 4,3 milliárd` különböző cím létezhet – és ennek egy része foglalt különleges célokra. A központi címtartalék **2011-ben** elfogyott, az európai regionális nyilvántartó 2019-ben osztotta ki az utolsó szabad blokkját.\n\nAzóta a hálózatok **NAT**-tal oldják meg, hogy egy otthoni router mögött sok eszköz osztozzon egy nyilvános címen. A végleges megoldás az **IPv6**, amelynek 128 bites címtere kb. `3,4 · 10³⁸` címet tesz lehetővé – a Föld minden homokszemének is jutna belőle bőven.',
    links: ['lecke:rendszeruzem/halozatok']
  },
  {
    id: 'dns-13-gyokerszerver', cat: 'informatika',
    q: 'az internet „telefonkönyvét” **mindössze 13 gyökérszerver-cím** tartja a csúcson – mégis **több mint ezer gép** válaszol ezekre világszerte?',
    why: 'Amikor beírsz egy webcímet, a gép a **DNS**-től kérdezi meg a hozzá tartozó IP-címet. A lekérdezés legfelső szintje a **gyökérzóna**, amelyet 13 névvel (A-tól M-ig) jelölt gyökérszerver-cím szolgál ki – ennyi fért bele a régi protokoll egyetlen válaszcsomagjába.\n\nEgy-egy cím mögött azonban sok, a világon szétszórt szerver áll, és az **anycast** nevű technika miatt mindig a legközelebbi válaszol. Így ma már jóval **több mint ezer** gyökérszerver-példány működik, és egy-egy kiesése szinte észrevétlen marad.',
    links: ['lecke:rendszeruzem/szerverek', 'lecke:rendszeruzem/halozatok']
  },
  {
    id: 'jelszo-hossz', cat: 'informatika',
    q: 'évek óta a világ egyik leggyakoribb jelszava a **„123456”**, és egy **hosszú, több szóból álló jelszót** sokkal nehezebb feltörni, mint egy rövid, de „bonyolultat”?',
    why: 'A jelszófeltörők először a gyakori jelszavak listáit próbálják végig – a „123456” így **egy szempillantás alatt** megvan. A „P@ssw0rd!” típusú cserék sem segítenek sokat, mert ezeket a mintákat a programok is ismerik.\n\nA lehetséges kombinációk száma a **hossztól** hatványozottan nő: minden plusz karakter megsokszorozza a próbálkozások számát. Ezért ajánlott a hosszú jelmondat (pl. négy-öt véletlen szó), minden oldalra **más** jelszó (jelszókezelővel), és ahol lehet, a **kétlépcsős azonosítás**.',
    links: ['lecke:rendszeruzem/biztonsag', 'lecke:informatika/adatbiztonsag']
  },

  /* ───────── SZAKÁCS ───────── */
  {
    id: 'olajtuz-viz-tilos', cat: 'etel',
    q: 'az égő olajra öntött **egy pohár víz robbanásszerű tűzgömböt** okozhat?',
    why: 'Az égő olaj **jóval 100 °C fölött** van, a víz pedig nehezebb nála, ezért lesüllyed az aljára, ahol egy pillanat alatt **gőzzé válik**, és közben a térfogata kb. **1700-szorosára** nő. A kitáguló gőz az égő olajat apró cseppekként szétszórja a levegőben, ami hatalmas lángcsóvaként lobban fel.\n\nHelyesen: a tűzhelyet le kell kapcsolni, és az edényt **fedővel** vagy tűzoltó takaróval letakarni (az oxigén elzárásával kialszik), és nem szabad elmozdítani. Konyhában erre a célra **„F” osztályú** (zsírtűz) oltó a megfelelő. Ha a tűz terjed, azonnal ki kell menni és hívni a 112-t.',
    links: ['lecke:szakacs/munkavedelem']
  },
  {
    id: 'restaurant-eroleves', cat: 'etel',
    q: 'az **étterem** francia neve, a **„restaurant”** eredetileg nem egy helyet, hanem egy **erőt adó húslevest** jelentett?',
    why: 'A francia **restaurer** azt jelenti: helyreállítani, felerősíteni. A 18. századi Párizsban „restaurant”-nak nevezték azokat a sűrű, tápláló **húsleveseket**, amelyeket gyengélkedőknek ajánlottak.\n\nAz 1760–70-es években nyíltak meg az első olyan helyek, ahol ilyen leveseket – majd egyre több ételt – **külön asztaloknál, étlapról választva**, egyénileg lehetett fogyasztani. Ez újdonság volt a közös asztalú fogadókhoz képest, és a név átragadt magára a helyre.',
    links: ['lecke:szakacs/felszolgalas']
  },

  /* ───────── ZENE, VIZUÁLIS KULTÚRA ───────── */
  {
    id: 'oktav-ketszeres-frekvencia', cat: 'muveszet',
    q: 'az **oktáv** egyszerűen a **kétszeres rezgésszám**, a tiszta kvint pedig a másfélszeres – de a zongorán a kvint **egy hajszálnyit hamis**?',
    why: 'Ha egy húr hosszát felezed, kétszer olyan gyorsan rezeg, és **egy oktávval magasabban** szól. A kvint 3 : 2, a kvart 4 : 3 arányú – ezeket az egyszerű arányokat már Püthagorasz is ismerte, és a fülünk ezért hallja őket harmonikusnak.\n\nA zongora viszont **egyenletes temperálású**: az oktávot 12 egyforma félhangra osztják, így minden hangnemben ugyanúgy lehet játszani. Ára: a kvint ebben `2^(7/12) ≈ 1,498`, nem pontosan 1,5. Ez kb. 2 cent (egy félhang 2%-a) eltérés, amit a legtöbb ember nem hall – de egy kórus vagy vonósnégyes ösztönösen tisztábban intonál.',
    links: ['lecke:enek-zene/hangkozok-skalak', 'lecke:fizika/hullamok-feny']
  },
  {
    id: 'aranymetszes-tulzas', cat: 'muveszet',
    q: 'sok híres állítás, hogy a Parthenon vagy a Mona Lisa az **aranymetszés** arányaira épül, **nem bizonyított** – utólag „belemérték”?',
    why: 'Az **aranymetszés** (kb. 1,618 : 1) valóban érdekes matematikai arány, és egyes művészek – főleg a 19–20. században – tudatosan használták. A régebbi művekről szóló állítások viszont többnyire úgy születtek, hogy valaki addig rajzolt téglalapokat a képre, amíg valamelyik „kijött”: elég sok vonalból mindig találni egy közel 1,6-os arányt.\n\nA **kompozíció** valódi alapja az egyensúly, a ritmus, a hangsúlyok elhelyezése. A fotósok egyszerűsített szabálya, a **harmadolási szabály** jó kiindulópont – de csak segítség, nem kötelező törvény.',
    links: ['lecke:vizualis/kompozicio', 'lecke:mat-alap/aranyossag-szazalek']
  },
  {
    id: 'impresszionizmus-gunynev', cat: 'muveszet',
    q: 'az **impresszionizmus** nevét egy **gúnyos újságcikk** adta – a kritikus Monet egyik képének címét figurázta ki?',
    why: 'Claude Monet 1874-ben egy független kiállításon bemutatta az **„Impresszió, a felkelő nap”** című képét, amely a hajnali kikötőt laza, gyors ecsetvonásokkal ábrázolta. Louis Leroy kritikus egy szatirikus cikkben „impresszionistáknak” csúfolta a kiállítókat, mondván: ez csak egy benyomás, nem kész kép.\n\nA festők végül **büszkén vállalták** a nevet. Művészetüket a **tubusos festék** megjelenése is segítette: a festéket könnyű volt kivinni a szabadba, így közvetlenül a természetben festhették a változó fényt.',
    links: ['lecke:vizualis/muveszettortenet-2']
  },
  {
    id: 'rgb-sarga-pirosbol-zoldbol', cat: 'muveszet',
    q: 'a képernyőn látott **sárga szín valójában nem létezik a kijelzőn**: csak **piros és zöld** fénypontok világítanak egymás mellett?',
    why: 'Minden képpont három apró, **piros, zöld és kék** alpixelből áll (**RGB**). A szemünkben háromféle színérzékelő csap van, ezért a különböző erősségű piros, zöld és kék fény keverésével szinte bármilyen színérzetet elő lehet idézni. Piros + zöld fény → **sárgának** látjuk, mindhárom → fehér.\n\nHa csatornánként 256 fényerősség van (8 bit), az összesen `256³ ≈ 16,7 millió` szín. Nagyítóval vagy telefonnal közelről lefotózva a fehér képernyőn is látszanak a színes alpixelek. A nyomtatás viszont **kivonó** keverés (CMYK), ott más szabályok érvényesek.',
    links: ['lecke:vizualis/digitalis-kep', 'modell:okostelefon#kijelzo']
  },

  /* ───────── SUGÁRHAJTÓMŰ ───────── */
  {
    id: 'hajtomu-ket-tengely', cat: 'technika',
    q: 'egy sugárhajtóműben **két (néha három) egymásba dugott tengely** forog, **különböző sebességgel**?',
    why: 'Az óriási ventilátornak **lassan** kell forognia, különben a lapátvégek sebessége messze a hangsebesség fölé szökne; a kis átmérőjű nagynyomású kompresszornak viszont **gyorsan**. Ezért a kisnyomású turbina egy belső tengelyen a ventilátort és a booster kompresszort hajtja, a nagynyomású turbina pedig egy köré húzott **csőtengelyen** a nagynyomású kompresszort.\n\nEgy nagy utasszállító hajtóműben a ventilátor kb. **2000–5000/perc**, a nagynyomású orsó pedig akár **10 000–15 000/perc** fordulattal foroghat. Néhány újabb hajtóműben fogaskerék-hajtómű lassítja a ventilátort.',
    links: ['modell:hajtomu#tengelyek', 'modell:hajtomu#kisnyomasu-kompresszor', 'modell:hajtomu#ventilator']
  },
  {
    id: 'kompresszor-melegit', cat: 'fizika',
    q: 'egy modern sugárhajtómű kompresszora a levegőt **kb. negyven–ötvenszeresére** sűríti, és ettől az **üzemanyag nélkül is több száz fokosra** melegszik?',
    why: 'Ha egy gázt gyorsan összenyomunk, a munka **felmelegíti** – ezt érzed a kerékpárpumpa felforrósodó végén is. A hajtómű kompresszorában kb. 10–15 lapátsor (fokozat) lépésről lépésre sűríti a levegőt, a mai hajtóművekben összesen kb. **40–50-szeres** nyomásra.\n\nA nagynyomású kompresszor végén a levegő ezért felszálláskor már **kb. 600–700 °C**-os lehet. Ide már különleges, hőálló nikkelötvözetek kellenek. A nagy nyomásviszony azért jó, mert minél jobban összenyomott levegőben égetik el az üzemanyagot, annál **jobb a hatásfok**.',
    links: ['modell:hajtomu#nagynyomasu-kompresszor', 'modell:hajtomu#egoter', 'lecke:fizika/energia-munka']
  },
  {
    id: 'madarbecsapodas-teszt', cat: 'technika',
    q: 'a hajtóműveket a gyártók a tanúsításkor **szándékosan madarakkal „lövik meg”** járás közben?',
    why: 'A felszállásnál és leszállásnál a hajtóművek gyakran szívnak be madarakat. A légügyi hatóságok ezért előírják, hogy a hajtóművek bizonyos méretű és számú madár beszívását **kibírják**: közepes madaraknál tovább kell működniük, egy nagy madár után pedig legalább **biztonságosan leállniuk**, darabok kirepülése nélkül.\n\nA teszteken egy sűrített levegős „ágyúval” (élelmiszer-ipari forrásból származó, elpusztult) madártetemeket lőnek a ventilátorba. A **gondola** páncélozott része azt is megakadályozza, hogy egy letört lapát kirepüljön a burkolatból.',
    links: ['modell:hajtomu#gondola', 'modell:hajtomu#ventilator']
  },
  {
    id: 'tolerofordito-nem-fordul', cat: 'technika',
    q: 'a hajtómű tolóerő-fordítója **nem fordítja meg a forró gázsugarat**, hanem főleg a hideg levegőt **téríti előre** – és a repülőgép leszállási úthosszát **nélküle** számolják?',
    why: 'Leszálláskor a gondola egy része hátracsúszik, és lapok zárják el a hideg, megkerülő áram útját, amely így oldalt és **ferdén előre** áramlik ki – ettől lesz a hangos „bőgés” leszállás után. A gép lassításának nagy részét azonban a **kerékfékek** végzik.\n\nA tolóerő-fordító főleg csúszós, nedves vagy havas pályán hasznos, és kíméli a fékeket. A biztonsági előírások szerint a száraz pályára számított leszállási távolság **nem számolhat** vele – hiszen ha meghibásodik, a gépnek akkor is meg kell állnia.',
    links: ['modell:hajtomu#tolerofordito', 'modell:hajtomu#fuvoka']
  },
  {
    id: 'fadec-gazkar', cat: 'informatika',
    q: 'a modern utasszállítókon a pilóta „gázkarja” **nem közvetlenül adagolja az üzemanyagot** – egy **kétcsatornás számítógép** dönt helyette?',
    why: 'A **FADEC** (teljes jogkörű digitális hajtóművezérlés) a gázkar állásából csak azt tudja meg, mekkora tolóerőt kér a pilóta. Ezután a hőmérséklet-, nyomás- és fordulatszám-érzékelők alapján maga számolja ki az üzemanyag-mennyiséget, és megakadályozza a túlpörgést, a túlmelegedést vagy a kompresszor „megbicsaklását”.\n\nMivel a hajtómű ettől teljesen függ, a FADEC-nek **két független csatornája** van: ha az egyik meghibásodik, a másik veszi át. A pilóták így könnyebben, a hajtómű pedig kímélőbben és takarékosabban üzemel.',
    links: ['modell:hajtomu#fadec']
  },

  /* ───────── SZÉLTURBINA ───────── */
  {
    id: 'szelturbina-viharban-all', cat: 'technika',
    q: 'a szélturbinák **erős viharban szándékosan leállnak**, és a lapátjaikat „élükkel” fordítják a szélnek?',
    why: 'A gondola tetején lévő **szélmérő és szélirányjelző** folyamatosan figyeli a szelet. Az irányállító motorok (yaw) a rotort mindig szembefordítják vele. Kb. 3–4 m/s szélnél indul a termelés, és kb. **25 m/s** (90 km/h) körül a legtöbb turbina leáll, mert a terhelés már veszélyes lenne a szerkezetre.\n\nLeállításkor a lapátszög-állító (pitch) a lapátokat kb. 90°-ra, **„vitorlaállásba”** forgatja, így azok alig fognak szelet. A rotor így szinte megáll, és a gondola továbbra is a szélbe fordul, hogy a terhelés a legkisebb legyen.',
    links: ['modell:szelturbina#szelmero', 'modell:szelturbina#gondola', 'modell:szelturbina#agy']
  },
  {
    id: 'szelturbina-fek-parkolofek', cat: 'technika',
    q: 'a szélturbina mechanikus tárcsaféke inkább csak **„kézifék”**: a rotort főleg a **lapátok elforgatásával** lassítják?',
    why: 'Egy forgó, több száz tonnás rotor mozgási energiáját mechanikus fékkel elnyelni hatalmas hőt és kopást okozna. Ezért a fő fékezést **aerodinamikusan** végzik: a lapátokat elforgatják, így a szél már nem hajtja, hanem fékezi a rotort.\n\nA hajtásláncban lévő **tárcsafék** feladata főleg az, hogy a már lelassult rotort **rögzítse** (pl. karbantartáskor), illetve vészhelyzetben besegítsen. A lapátszög-állítók külön tartalék energiatárolóval (akkuval vagy hidraulikus tárolóval) is képesek a lapátokat vitorlaállásba fordítani áramszünetkor.',
    links: ['modell:szelturbina#fek', 'modell:szelturbina#agy']
  },
  {
    id: 'szelturbina-alapozas', cat: 'technika',
    q: 'egy szárazföldi szélturbina alatt egy **több száz köbméter betonból** készült, a földbe süllyesztett „talp” van, amely megakadályozza, hogy felboruljon?',
    why: 'A szél a kb. 100–160 m magas tornyot a tetején, egy hosszú erőkaron nyomja, ami óriási **borítónyomatékot** jelent az alapnál. Ezt egy széles, vasbeton alaptest egyensúlyozza ki a saját súlyával és a rá terített talajjal – egy nagy turbinánál ez jellemzően **több száz köbméter** beton és sok tonna betonacél.\n\nA **torony** acélból vagy betonból készül, darabokban szállítják és csavarozzák össze. Erős szélben a csúcsa érezhetően kileng – ez nem hiba, a szerkezetet erre méretezik.',
    links: ['modell:szelturbina#alapozas', 'modell:szelturbina#torony']
  },
  {
    id: 'szelturbina-frekvenciavalto', cat: 'technika',
    q: 'a szélturbina generátora a széltől függően **változó fordulattal** forog, és egy **teljesítményelektronikai átalakító** „gyúrja” az áramát pontosan 50 Hz-esre?',
    why: 'A lapátok a legtöbb energiát akkor nyerik ki, ha a fordulatuk **a szélsebességgel együtt változik**. A főtengely csak kb. 5–15/perc fordulattal forog, amit a multiplikátor (vagy a lassú, sokpólusú, hajtómű nélküli generátor) alakít villamos energiává – a frekvencia azonban így folyton változik.\n\nAz **átalakító** ezért előbb egyenárammá alakítja, majd **pontosan 50 Hz-es** váltakozó árammá, amelyet a **transzformátor** a hálózat feszültségére emel. Egyes turbinatípusoknál csak a teljesítmény egy része megy át az átalakítón.',
    links: ['modell:szelturbina#atalakito', 'modell:szelturbina#fotengely', 'modell:szelturbina#generator']
  },

  /* ───────── ATOMERŐMŰ ───────── */
  {
    id: 'primer-kor-300-fok-nem-forr', cat: 'fizika',
    q: 'a paksi reaktorban a víz **kb. 300 °C-os, mégsem forr fel** – mert kb. **120-szoros légköri nyomás** alatt áll?',
    why: 'A víz forráspontja a **nyomással** nő: 1 bar nyomáson 100 °C, de kb. 120 bar nyomáson már kb. 325 °C. A nyomottvizes reaktor primer körében a **nyomástartó** edény tartja magasan a nyomást, így a víz a fűtőelemek mellett felmelegszik (Pakson kb. 270-ről kb. 300 °C-ra), de **folyadék marad**.\n\nA vizet a **főkeringtető szivattyúk** hajtják körbe. Ez a víz egyszerre **hűti** a fűtőelemeket és **lassítja a neutronokat**, ami a láncreakcióhoz szükséges – ha a víz eltűnne, a láncreakció lelassulna.',
    links: ['modell:atomeromu#primer', 'modell:atomeromu#reaktortartaly', 'lecke:fizika/atom']
  },
  {
    id: 'bor-elnyeli-neutront', cat: 'kemia',
    q: 'az atomreaktor teljesítményét részben a hűtővízben **feloldott bórsav** szabályozza – a bór ugyanis **„elnyeli” a neutronokat**?',
    why: 'A láncreakcióban minden hasadás neutronokat szabadít fel, amelyek újabb hasadásokat okozhatnak. A **bór-10** atommagja nagyon szívesen befogja a neutronokat, így kivonja őket a láncreakcióból. A primer körben lévő **bórsav** koncentrációjával lassan, a **szabályozórudakkal** gyorsan lehet a teljesítményt állítani.\n\nA szabályozó- és biztonsági rudak neutronelnyelő anyagot (pl. bóracélt) tartalmaznak. Vészhelyzetben **a gravitáció** ejti be őket a reaktorba, így áramkimaradáskor is másodpercek alatt leállítják a láncreakciót.',
    links: ['modell:atomeromu#szabalyozorudak', 'modell:atomeromu#primer', 'lecke:kemia/atom-periodusos']
  },
  {
    id: 'ket-kor-turbina-nem-radioaktiv', cat: 'technika',
    q: 'egy nyomottvizes atomerőmű turbináját hajtó gőz **sosem járt a reaktorban** – a hő egy **csőfalon keresztül** jut át hozzá?',
    why: 'A primer kör forró vize a **gőzfejlesztőben** több ezer vékony csövön áramlik át, és ezek falán keresztül adja át a hőt a **szekunder kör** vizének, amely így felforr. A két víz **sosem keveredik**, ezért a turbinára jutó gőz normál esetben nem radioaktív.\n\nA paksi VVER-440 típusú blokkokban a gőzfejlesztők különlegesek: **fekvő** elrendezésűek, míg a legtöbb nyugati reaktorban állók. A turbinából kilépő gőzt a kondenzátorban Duna-víz hűti vissza vízzé, és a tápszivattyúk újra a gőzfejlesztőbe nyomják.',
    links: ['modell:atomeromu#gozfejleszto', 'modell:atomeromu#szekunder', 'modell:atomeromu#turbina']
  },
  {
    id: 'remanens-ho', cat: 'fizika',
    q: 'egy leállított atomreaktor **napokig is jelentős hőt termel** – ezért a hűtését leállítás után sem szabad abbahagyni?',
    why: 'A láncreakció a szabályozórudak beejtése után másodpercek alatt leáll, de a fűtőelemekben felhalmozódott **radioaktív hasadási termékek** tovább bomlanak, és hőt termelnek. Közvetlenül a leállítás után ez a **remanens hő** a teljes teljesítmény kb. **6–7%-a**, egy óra múlva kb. 1–2%, egy nap után is még kb. fél százalék – egy nagy reaktornál ez megawattokat jelent.\n\nA 2011-es fukusimai balesetet épp ez okozta: a reaktorok leálltak, de a cunami tönkretette a hűtés áramellátását. Ezért van az atomerőművekben több, egymástól független **vészhűtő rendszer** és dízelgenerátor, és a védőépület (konténment) is erre készül.',
    links: ['modell:atomeromu#kontenment', 'modell:atomeromu#futoelemek', 'lecke:fizika/atom']
  },

  /* ───────── TRANZISZTOR ───────── */
  {
    id: 'mosfet-forras-nyelo-szimmetria', cat: 'informatika',
    q: 'egy egyszerű MOSFET tranzisztorban a **forrás és a nyelő gyakran ugyanolyan**, és csak a rájuk adott **feszültség dönti el**, melyik melyik?',
    why: 'A klasszikus felépítésben a kapu két oldalán két egyforma, erősen adalékolt szilíciumterület van. Azt hívjuk **forrásnak** (source), ahonnan a töltéshordozók indulnak, és **nyelőnek** (drain), ahová érkeznek – n-csatornás tranzisztornál a kisebb feszültségű oldal a forrás.\n\nA modern chipekben a két oldalt sokszor finoman **eltérőre** optimalizálják. A szomszédos tranzisztorokat pedig szilícium-dioxiddal – lényegében **üveggel** – kitöltött árkok (**STI**) választják el egymástól, hogy ne folyjon köztük szivárgó áram.',
    links: ['modell:tranzisztor#source', 'modell:tranzisztor#drain', 'modell:tranzisztor#sti']
  },
  {
    id: 'chip-rezvezetek-1997', cat: 'informatika',
    q: 'a chipek belső „vezetékei” **1997-ig alumíniumból** készültek, és a rézre váltás azért volt nehéz, mert a réz **„megmérgezi” a szilíciumot**?',
    why: 'A tranzisztorokat a lapka felett **több mint tíz rétegben** futó, parányi fémvezetékek kötik össze. A réznek kisebb az ellenállása, mint az alumíniumnak, így gyorsabb, kevésbé melegedő chipet ad. Csakhogy a rézatomok bediffundálnak a szilíciumba, és tönkreteszik a tranzisztorokat.\n\nAz IBM 1997-ben jelentett be először réz összeköttetésű gyártást: a rezet vékony **záróréteggel** veszik körül, és nem maratással, hanem a szigetelőbe vájt árkokba töltéssel, majd lecsiszolással alakítják ki (damaszcén eljárás). Ma szinte minden fejlett chip így készül.',
    links: ['modell:tranzisztor#metal', 'modell:processzor#die']
  },
]);
