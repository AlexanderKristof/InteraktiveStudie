/* Tantárgy: Történelem */
STUDIE.addSubject({
  id: 'tortenelem',
  stage: 'kozep',
  title: 'Történelem',
  icon: '🏛️',
  color: '#b7791f',
  description: 'Az ókortól a rendszerváltásig: a magyar és az egyetemes történelem fordulópontjai idővonalakkal.',
  intro: 'A történelem nem évszámok magolása, hanem **ok és okozat**: miért történt valami, és mi lett a következménye. Minden leckében találsz egy **idővonalat**: kattints az eseményekre a részletekért, aztán próbáld ki az időrendi játékot. Az évszámok így maguktól is a helyükre kerülnek.',
  lessons: [
    {
      id: 'okor',
      title: 'Őskor és ókor',
      level: 1, minutes: 14,
      summary: 'Az első eszközöktől a Római Birodalom bukásáig: írás, városállamok, demokrácia és Pannónia.',
      tags: ['őskor', 'ókor', 'Vértesszőlős', 'Mezopotámia', 'Egyiptom', 'piramis', 'görögök', 'Athén', 'demokrácia', 'olimpia', 'Róma', 'Caesar', 'Augustus', 'Pannónia', 'Aquincum', 'Kr. e.'],
      sections: [
        {
          title: 'Hogyan számoljuk az időt?',
          text: 'Európában az éveket Jézus születésének hagyományos időpontjától számoljuk. Ami előtte történt, az **Kr. e.** (Krisztus előtt), ami utána, az **Kr. u.** (Krisztus után). Kr. e. visszafelé számolunk: a Kr. e. 776 **korábbi**, mint a Kr. e. 44. Nulladik év nincs: Kr. e. 1 után rögtön Kr. u. 1 következik.\n\nAz **évszázad** (század) 100 évet jelent. A 20. század az 1901 és 2000 közötti évek, tehát az 1956-os forradalom a 20. században történt.',
          tip: 'Az idővonalon a Kr. e. évszámokat negatív számként képzelheted el: Kr. e. 776 = −776, és −776 kisebb, mint −44.'
        },
        {
          title: 'Az őskor: vadászoktól a földművesekig',
          text: 'Az **őskor** az írás feltalálása előtti, nagyon hosszú korszak. Az ember elődei több százezer évig vadászó-gyűjtögető életmódot folytattak, kőeszközöket készítettek és megtanulták használni a tüzet. Magyarország egyik leghíresebb lelőhelye **Vértesszőlős**, ahol kb. 350 000 éves előemberleleteket (a „Samu” néven ismert koponyacsontot) és tűzhelyek nyomait találták.\n\nKr. e. 10 000 körül a Közel-Keleten megkezdődött a **földművelés és állattartás**. Ezt a változást **neolitikus forradalomnak** hívjuk: az emberek letelepedtek, falvakat építettek, és kevesebb munkával több élelmet tudtak termelni.'
        },
        {
          title: 'Az ókori Kelet, Görögország és Róma',
          text: 'Az első államok nagy folyók mentén jöttek létre, ahol az öntözéses földművelés sok embert eltartott: **Mezopotámiában** (a Tigris és az Eufrátesz között) és **Egyiptomban** (a Nílus mentén). Itt alakult ki Kr. e. 3200 körül az **írás** is: a sumer ékírás és az egyiptomi hieroglifák.\n\nA **görögök** városállamokban (poliszokban) éltek. Athénban Kr. e. 508 körül Kleiszthenész reformjai megteremtették a **demokrácia** alapjait: a szabad férfi polgárok a népgyűlésen maguk döntöttek. (A nők, a rabszolgák és az idegenek viszont nem szavazhattak.)\n\n**Róma** egy kis itáliai városból hatalmas birodalommá nőtt. Julius Caesar meggyilkolása után Augustus lett az első császár. A birodalom része volt a mai Dunántúl is: ez volt **Pannónia** tartomány, melynek egyik központja **Aquincum** (a mai Óbuda) volt.',
          widget: { type: 'idovonal', options: { title: 'Az őskortól Róma bukásáig', events: [
            { year: -350000, label: 'kb. 350 000 éve', title: 'Vértesszőlős', text: 'Előember élt a mai Magyarország területén. Kőeszközeit és tűzhelyét is megtalálták.' },
            { year: -10000, label: 'Kr. e. 10 000 körül', title: 'Földművelés kezdete', text: 'A Közel-Keleten az emberek gabonát termesztenek és állatokat tartanak, falvakba települnek.' },
            { year: -3200, label: 'Kr. e. 3200 körül', title: 'Az írás megjelenése', text: 'A sumerok agyagtáblákra írják az **ékírást**, nem sokkal később az egyiptomiak a hieroglifákat.' },
            { year: -2560, label: 'Kr. e. 2560 körül', title: 'Kheopsz piramisa', text: 'Elkészül Gízában a Nagy Piramis, a fáraó sírja. Több mint 3800 évig ez volt a világ legmagasabb építménye.' },
            { year: -776, label: 'Kr. e. 776', title: 'Az első olimpia', text: 'A hagyomány szerint ekkor rendezték az első olümpiai játékokat Zeusz tiszteletére. A görögök ettől számolták az éveket.' },
            { year: -753, label: 'Kr. e. 753', title: 'Róma alapítása', text: 'A monda szerint Romulus ekkor alapította Rómát. A rómaiak ettől az évtől számolták az időt.' },
            { year: -508, label: 'Kr. e. 508', title: 'Athéni demokrácia', text: 'Kleiszthenész reformjai: a hatalom a polgárok népgyűlésének kezébe kerül.' },
            { year: -44, label: 'Kr. e. 44', title: 'Caesar meggyilkolása', text: 'Március 15-én (az „idusán”) összeesküvők megölik Julius Caesart a szenátusban.' },
            { year: -27, label: 'Kr. e. 27', title: 'Augustus császár', text: 'Octavianus megkapja az Augustus címet: kezdetét veszi a császárkor.' },
            { year: 106, label: 'Kr. u. 106 körül', title: 'Aquincum helytartói székhely', text: 'Pannónia kettéosztása után Aquincum Alsó-Pannónia központja lesz. Romjai ma is láthatók Óbudán.' },
            { year: 476, label: 'Kr. u. 476', title: 'Nyugatrómai Birodalom bukása', text: 'Az utolsó nyugatrómai császárt megfosztják trónjától. Ezzel az évvel szokás az ókor végét jelölni.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik esemény történt korábban?', options: ['Az első olimpia (Kr. e. 776)', 'Caesar meggyilkolása (Kr. e. 44)', 'Augustus császárrá válása (Kr. e. 27)', 'Róma bukása (Kr. u. 476)'], answer: 0, explain: 'Kr. e. visszafelé számolunk: minél nagyobb a szám, annál régebbi az esemény.' },
        { q: 'Hol jött létre az első írás?', options: ['Mezopotámiában (sumer ékírás)', 'Rómában', 'Athénban', 'Pannóniában'], answer: 0, explain: 'Kr. e. 3200 körül a sumerok agyagtáblákra írtak ékírással.' },
        { q: 'Mi volt Pannónia?', options: ['Római tartomány, többek között a mai Dunántúl területén', 'Egy görög városállam', 'Egyiptomi fáraó', 'Egy ókori olimpiai sportág'], answer: 0, explain: 'Pannónia római tartomány volt, egyik központja Aquincum, a mai Óbuda.' },
        { q: 'Kik szavazhattak az ókori athéni népgyűlésen?', options: ['A szabad, felnőtt férfi polgárok', 'Mindenki, a rabszolgák is', 'Csak a király', 'A nők és a férfiak egyaránt'], answer: 0, explain: 'Az athéni demokrácia csak a szabad férfi polgárokat vonta be; a nők, a rabszolgák és az idegenek kimaradtak.' }
      ]
    },
    {
      id: 'honfoglalas',
      title: 'Honfoglalás és államalapítás',
      level: 1, minutes: 14,
      summary: 'Hogyan érkeztek a magyarok a Kárpát-medencébe, és hogyan lett Szent István alatt keresztény királyság.',
      tags: ['honfoglalás', 'Árpád', 'kalandozások', 'Géza', 'Szent István', 'államalapítás', 'koronázás', 'Koppány', 'vármegye', 'kereszténység', '895', '1000', 'Árpád-ház'],
      sections: [
        {
          title: 'A honfoglalás',
          text: 'A magyarság **finnugor nyelvű** nép, de a vándorlás évszázadai alatt sok török nyelvű és iráni néppel is együtt élt; ez a nyelvünkben és a kultúránkban is nyomot hagyott. A 9. században a magyar törzsek Etelközben (a mai Ukrajna déli részén) éltek.\n\n**895 körül** a besenyők támadása is siettette, hogy a magyarok **Árpád** vezetésével átkeljenek a Kárpátokon, és megtelepedjenek a **Kárpát-medencében**. A honfoglalás több éven át tartott, nagyjából **900-ra** fejeződött be. A hagyomány szerint a hét törzs vezérei korábban **vérszerződéssel** pecsételték meg szövetségüket.'
        },
        {
          title: 'A kalandozások kora',
          text: 'A 10. század első felében a magyar seregek gyakran indultak hadjáratokra Európa távoli vidékeire: ezeket **kalandozásoknak** nevezzük. Céljuk zsákmány és adó szerzése volt, és gyakran egyik vagy másik helyi uralkodó szövetségeseként harcoltak.\n\n**907-ben Pozsonynál** a magyarok legyőzték a bajor sereget, ez megszilárdította a honfoglalást. **955-ben** azonban I. Ottó német király Augsburgnál (a **Lech-mezőn**) súlyos vereséget mért rájuk. Ezután a nyugati kalandozások véget értek: világossá vált, hogy a fennmaradáshoz be kell illeszkedni a keresztény Európába.',
          tip: 'A „magyar nyilaktól ments meg, Uram, minket!” fohász a népszerű hagyomány szerint ebből a korból származik, de korabeli forrás nem igazolja.'
        },
        {
          title: 'Géza és Szent István',
          text: '**Géza fejedelem** (972 körül került hatalomra) felvette a kapcsolatot a német-római császárral, és hittérítőket hívott az országba. Fia, **Vajk**, a keresztségben az **István** nevet kapta.\n\nGéza halála (997) után a trónt a régi szokás szerint a legidősebb rokon, **Koppány** is követelte. István legyőzte őt, majd **1000 karácsonyán** (vagy 1001 első napján) királlyá koronázták. A koronát a hagyomány szerint II. Szilveszter pápa küldte.\n\nIstván munkájának lényege:\n\n- **egyházszervezés**: püspökségeket és két érsekséget (Esztergom, Kalocsa) alapított, templomokat és kolostorokat építtetett,\n- **vármegyék**: az ország területét királyi várak köré szervezte, élükön az ispánokkal,\n- **törvények**: írott törvényekben védte a magántulajdont és az egyházat,\n- **Intelmek**: fiának, Imre hercegnek írt tanácsaiban arra figyelmeztet, hogy az idegenek befogadása erősíti az országot.\n\nIstván 1038-ban halt meg; 1083-ban szentté avatták. Ünnepe **augusztus 20.**',
          widget: { type: 'idovonal', options: { title: 'A honfoglalástól Szent Istvánig', events: [
            { year: 895, label: '895 körül', title: 'Honfoglalás', text: 'Árpád vezetésével a magyar törzsek átkelnek a Kárpátokon.' },
            { year: 907, label: '907', title: 'Pozsonyi csata', text: 'A magyarok legyőzik a bajor sereget, ezzel megszilárdul a honfoglalás.' },
            { year: 955, label: '955', title: 'Augsburgi vereség', text: 'I. Ottó a Lech-mezőn legyőzi a kalandozó magyar sereget. A nyugati kalandozások véget érnek.' },
            { year: 972, label: '972 körül', title: 'Géza fejedelem', text: 'Géza fejedelem hittérítőket hív, és kapcsolatot keres a német-római császárral.' },
            { year: 997, label: '997', title: 'István és Koppány', text: 'Géza meghal. István legyőzi a trónra igényt tartó Koppányt.' },
            { year: 1000, label: '1000/1001', title: 'István koronázása', text: 'Istvánt királlyá koronázzák: megszületik a keresztény Magyar Királyság.' },
            { year: 1038, label: '1038', title: 'István halála', text: 'Szent István meghal. Az utódlás körül hosszú harcok kezdődnek.' },
            { year: 1083, label: '1083', title: 'Szentté avatás', text: 'Szent László király idején Istvánt és fiát, Imre herceget szentté avatják.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Ki vezette a honfoglaló magyarokat?', options: ['Árpád', 'Szent István', 'Géza', 'IV. Béla'], answer: 0, explain: 'A honfoglalás (895 körül) Árpád nevéhez fűződik; az Árpád-ház az ő leszármazottairól kapta nevét.' },
        { q: 'Mi történt 955-ben?', options: ['Augsburgnál (a Lech-mezőn) vereséget szenvedett a magyar sereg', 'Istvánt királlyá koronázták', 'Megtörtént a honfoglalás', 'Kitört a tatárjárás'], answer: 0, explain: 'Az augsburgi vereség után véget értek a nyugati kalandozások.' },
        { q: 'Kivel harcolt István a trónért Géza halála után?', options: ['Koppánnyal', 'Árpáddal', 'Mátyással', 'Ottóval'], answer: 0, explain: 'Koppány a régi öröklési rend (a legidősebb rokon) alapján követelte a hatalmat.' },
        { q: 'Mi NEM István intézkedése?', options: ['Az Aranybulla kiadása', 'Vármegyék szervezése', 'Püspökségek alapítása', 'Írott törvények'], answer: 0, explain: 'Az Aranybullát II. András adta ki 1222-ben, kétszáz évvel később.' }
      ]
    },
    {
      id: 'kozepkor',
      title: 'A középkori Magyar Királyság',
      level: 2, minutes: 15,
      summary: 'Aranybulla, tatárjárás, Anjouk, Hunyadiak: a középkori magyar állam virágzása és megpróbáltatásai.',
      tags: ['középkor', 'Aranybulla', 'II. András', 'tatárjárás', 'muhi csata', 'IV. Béla', 'Anjou', 'Károly Róbert', 'Nagy Lajos', 'Hunyadi János', 'nándorfehérvári diadal', 'Mátyás', 'fekete sereg', 'Corvina', '1241'],
      sections: [
        {
          title: 'Aranybulla és tatárjárás',
          text: '**II. András** király sok birtokot adományozott el, ami elégedetlenséget szült. **1222-ben** kiadta az **Aranybullát**, amely a királyi szerviensek (a későbbi köznemesség) jogait rögzítette. Ez az egyik legkorábbi ilyen európai oklevél.\n\nFia, **IV. Béla** idején érte az országot a **tatárjárás**. A mongol (tatár) sereg **1241 tavaszán** tört be, és a **Muhi csatában** (április 11.) megsemmisítette a magyar hadat. A király Dalmáciába menekült, az ország nagy része elpusztult, a lakosság jelentős része meghalt vagy elhurcolták. **1242-ben** a mongolok váratlanul kivonultak.\n\nIV. Béla újjáépítette az országot, ezért nevezik **„második honalapítónak”**. Kővárak építését támogatta, telepeseket hívott be, és városokat (például Budát) erősített meg, hogy egy újabb támadás ne érje ilyen védtelenül az országot.'
        },
        {
          title: 'Anjouk és Hunyadiak',
          text: '**1301-ben** III. András halálával kihalt az **Árpád-ház** férfiága. Harcok után az Anjou-házi **Károly Róbert** szerezte meg a trónt. Rendbe hozta a királyi pénzügyeket (aranyforint), és fellendítette a bányászatot: Magyarország abban az időben Európa egyik legnagyobb aranytermelője volt. Fia, **Nagy Lajos** idején az ország tekintélye tovább nőtt.\n\nA 15. században egyre nagyobb fenyegetést jelentett az **Oszmán Birodalom**. **Hunyadi János** hadvezér **1456-ban Nándorfehérvárnál** (a mai Belgrádnál) megállította a szultán seregét. A **déli harangszót** a pápa még a csata előtt rendelte el imádságra hívásként; a győzelem után vált a diadal emlékévé.'
        },
        {
          title: 'Mátyás király',
          text: 'Hunyadi János fiát, **Hunyadi Mátyást 1458-ban** választották királlyá. Uralkodása (1458–1490) a középkori magyar állam fénykora volt:\n\n- **fekete sereg**: állandó, zsoldosokból álló hadsereg, amit a királyi adókból fizetett,\n- **reneszánsz udvar** Budán és Visegrádon, itáliai művészekkel és tudósokkal,\n- **Bibliotheca Corviniana**: az egyik leghíresebb európai könyvtár; a megmaradt kódexeket ma corvinának nevezzük,\n- hódításai során elfoglalta Bécset (1485), és ott is halt meg 1490-ben.\n\nA hagyomány „igazságos Mátyásként” emlékezik rá. A magas adók miatt a kortársak közül azonban sokan elégedetlenek voltak, és halála után a királyi hatalom gyorsan meggyengült.',
          widget: { type: 'idovonal', options: { title: 'A középkori Magyar Királyság', events: [
            { year: 1222, label: '1222', title: 'Aranybulla', text: 'II. András oklevele rögzíti a királyi szerviensek (köznemesek) jogait.' },
            { year: 1241, label: '1241', title: 'Muhi csata', text: 'A mongol sereg megsemmisíti IV. Béla hadát. Kezdődik a tatárjárás pusztítása.' },
            { year: 1242, label: '1242', title: 'A tatárok kivonulása', text: 'A mongolok elhagyják az országot. IV. Béla megkezdi az újjáépítést.' },
            { year: 1301, label: '1301', title: 'Az Árpád-ház kihalása', text: 'III. András halálával kihal az Árpád-ház férfiága.' },
            { year: 1308, label: '1308', title: 'Károly Róbert', text: 'Az Anjou-házi Károly Róbertet a rendek elismerik királynak. Gazdasági reformokat vezet be.' },
            { year: 1456, label: '1456', title: 'Nándorfehérvári diadal', text: 'Hunyadi János és Kapisztrán János megállítja az oszmán sereget.' },
            { year: 1458, label: '1458', title: 'Mátyás királlyá választása', text: 'Hunyadi Mátyást a rendek királlyá választják.' },
            { year: 1485, label: '1485', title: 'Bécs elfoglalása', text: 'Mátyás bevonul Bécsbe, és ott rendezi be udvarát.' },
            { year: 1490, label: '1490', title: 'Mátyás halála', text: 'Mátyás meghal Bécsben. Utódai alatt a királyi hatalom meggyengül.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik csatában verték meg a mongolok IV. Béla seregét 1241-ben?', options: ['Muhi csata', 'Mohácsi csata', 'Nándorfehérvári csata', 'Pozsonyi csata'], answer: 0, explain: 'A Muhi csata 1241. április 11-én volt; utána a mongolok végigpusztították az országot.' },
        { q: 'Miért nevezik IV. Bélát „második honalapítónak”?', options: ['Mert a tatárjárás után újjáépítette az országot', 'Mert ő vezette a honfoglalást', 'Mert ő alapította a fekete sereget', 'Mert legyőzte a törököket Mohácsnál'], answer: 0, explain: 'Várépítéssel, telepítéssel és városfejlesztéssel újjászervezte az elpusztult országot.' },
        { q: 'Mi volt a fekete sereg?', options: ['Mátyás király állandó zsoldoshadserege', 'A tatár sereg neve', 'Egy reneszánsz festőiskola', 'A honfoglaló törzsek szövetsége'], answer: 0, explain: 'Mátyás a királyi adókból fizette ezt a jól képzett, állandó hadsereget.' },
        { q: 'Ki győzött 1456-ban Nándorfehérvárnál?', options: ['Hunyadi János', 'Mátyás király', 'II. András', 'Dobó István'], answer: 0, explain: 'Hunyadi János és Kapisztrán János seregei megállították az oszmán támadást.' }
      ]
    },
    {
      id: 'torok-kor',
      title: 'Mohács és a török kor',
      level: 2, minutes: 15,
      summary: 'A mohácsi vereségtől Buda visszafoglalásáig: a három részre szakadt ország, a végvárak és a Rákóczi-szabadságharc.',
      tags: ['Mohács', 'mohácsi csata', 'II. Lajos', 'Szulejmán', 'török kor', 'hódoltság', 'három részre szakadás', 'Erdélyi Fejedelemség', 'Eger', 'Dobó István', 'Szigetvár', 'Zrínyi Miklós', 'Buda visszafoglalása', 'Rákóczi', '1526', '1541', '1686'],
      sections: [
        {
          title: 'A mohácsi csata',
          text: 'Mátyás halála után a királyi hatalom és a hadsereg meggyengült, miközben az **Oszmán Birodalom** **I. (Nagy) Szulejmán** szultán alatt hatalma csúcsán volt.\n\n**1526. augusztus 29-én** Mohácsnál a szultán sokszoros túlerőben lévő serege megsemmisítő vereséget mért a magyar hadra. A fiatal **II. Lajos** király a menekülés közben a Csele-patakba fulladt. Mivel nem maradt örököse, két királyt is választottak: **Szapolyai Jánost** és **Habsburg Ferdinándot**, akik egymással is harcban álltak.',
          tip: 'A „Több is veszett Mohácsnál” szólás ma is azt jelenti, hogy egy kisebb kudarcot nem kell túldramatizálni, hiszen volt már ennél sokkal nagyobb baj is.'
        },
        {
          title: 'Három részre szakadt ország',
          text: '**1541. augusztus 29-én**, pontosan 15 évvel Mohács után, a török csellel elfoglalta **Budát**. Az ország ezzel tartósan **három részre** szakadt:\n\n- **Királyi Magyarország** (nyugaton és északon), Habsburg uralkodóval, központja Pozsony,\n- **Hódoltság** (az ország közepe), közvetlen oszmán uralom alatt, központja Buda,\n- **Erdélyi Fejedelemség** (keleten), amely a szultán fennhatósága alatt, de saját fejedelemmel élt.\n\nA határ mentén **végvárak** láncolata védte a Királyi Magyarországot. **1552-ben** Eger védői **Dobó István** vezetésével visszaverték a török ostromot (erről szól Gárdonyi Géza „Egri csillagok” című regénye). **1566-ban Szigetvár** elesett: **Zrínyi Miklós** és katonái hősi halált haltak a kitörésben. Ugyanebben a táborban halt meg Szulejmán szultán is.'
        },
        {
          title: 'A felszabadító háború és a Rákóczi-szabadságharc',
          text: 'Az oszmánok 1683-ban sikertelenül ostromolták Bécset. Ezután a **Szent Liga** (a Habsburgok, Lengyelország, Velence és a pápa szövetsége) ellentámadásba lendült. **1686. szeptember 2-án** a nemzetközi sereg visszafoglalta **Budát**. Az **1699-es karlócai béke** szerint szinte az egész ország (a Temesköz kivételével) felszabadult a török uralom alól.\n\nAz ország azonban a Habsburgok uralma alá került, akik keményen bántak a lakossággal és a protestánsokkal. Ez vezetett az **1703–1711-es Rákóczi-szabadságharchoz**, amelyet **II. Rákóczi Ferenc** fejedelem vezetett. Bár katonailag elbukott, az **1711-es szatmári béke** megőrizte a magyar rendi alkotmányt, és amnesztiát adott a harcolóknak.',
          widget: { type: 'idovonal', options: { title: 'Mohácstól a szatmári békéig', events: [
            { year: 1526, label: '1526', title: 'Mohácsi csata', text: 'A szultán serege legyőzi a magyar hadat, II. Lajos király meghal.' },
            { year: 1541, label: '1541', title: 'Buda eleste', text: 'A török elfoglalja Budát. Az ország három részre szakad.' },
            { year: 1552, label: '1552', title: 'Eger ostroma', text: 'Dobó István és a vár védői (köztük asszonyok is) visszaverik a török sereget.' },
            { year: 1566, label: '1566', title: 'Szigetvár ostroma', text: 'Zrínyi Miklós hősi kitörése. Az ostrom alatt Szulejmán szultán is meghal.' },
            { year: 1683, label: '1683', title: 'Bécs ostroma', text: 'A török sikertelenül ostromolja Bécset. Megkezdődik a felszabadító háború.' },
            { year: 1686, label: '1686', title: 'Buda visszafoglalása', text: 'A Szent Liga nemzetközi serege 145 év után visszafoglalja Budát.' },
            { year: 1699, label: '1699', title: 'Karlócai béke', text: 'Az ország szinte teljes területe felszabadul a török uralom alól.' },
            { year: 1703, label: '1703', title: 'A Rákóczi-szabadságharc kezdete', text: 'II. Rákóczi Ferenc a Habsburg-uralom ellen fordul.' },
            { year: 1711, label: '1711', title: 'Szatmári béke', text: 'A szabadságharc véget ér. A rendi jogokat megerősítik, a harcolók amnesztiát kapnak.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Mikor volt a mohácsi csata?', options: ['1526', '1541', '1456', '1686'], answer: 0, explain: '1526. augusztus 29-én. Buda 1541-ben esett el, és 1686-ban foglalták vissza.' },
        { q: 'Melyik NEM volt a három részre szakadt ország egyik része?', options: ['Pannónia tartomány', 'Királyi Magyarország', 'Hódoltság', 'Erdélyi Fejedelemség'], answer: 0, explain: 'Pannónia római tartomány volt az ókorban, ezer évvel korábban.' },
        { q: 'Ki védte Egert 1552-ben?', options: ['Dobó István', 'Zrínyi Miklós', 'Hunyadi János', 'II. Rákóczi Ferenc'], answer: 0, explain: 'Dobó István és a vár maroknyi védőserege verte vissza a török ostromot.' },
        { q: 'Mi zárta le a Rákóczi-szabadságharcot?', options: ['Az 1711-es szatmári béke', 'Az 1699-es karlócai béke', 'A mohácsi csata', 'Az Aranybulla'], answer: 0, explain: 'A szatmári béke megőrizte a rendi alkotmányt és amnesztiát adott.' }
      ]
    },
    {
      id: 'forradalom-1848',
      title: 'Az 1848–49-es forradalom és szabadságharc',
      level: 2, minutes: 15,
      summary: 'A reformkortól március 15-én és a szabadságharcon át az aradi vértanúkig és a kiegyezésig.',
      tags: ['1848', '1849', 'forradalom', 'szabadságharc', 'március 15', 'reformkor', 'Széchenyi', 'Kossuth', 'Petőfi', 'Batthyány', 'áprilisi törvények', 'Pákozd', 'Világos', 'aradi vértanúk', 'október 6', 'kiegyezés', '1867'],
      sections: [
        {
          title: 'A reformkor',
          text: 'A 19. század első felében Magyarország a Habsburg Birodalom része volt, és gazdaságilag elmaradt Nyugat-Európától. Még élt a **jobbágyság**, a nemesek nem fizettek adót. Az **1825-ben** kezdődő **reformkorban** a politikusok a polgári átalakulásért, a magyar nyelv hivatalossá tételéért és a gazdaság fejlesztéséért küzdöttek.\n\n- **Széchenyi István** („a legnagyobb magyar”) a gazdasági fejlődést tartotta elsőnek: ő kezdeményezte a Lánchidat, a Tisza szabályozását, a gőzhajózást, és birtoka egy évi jövedelmét ajánlotta fel a Magyar Tudós Társaság (a mai Akadémia) alapítására.\n- **Kossuth Lajos** a jobbágyfelszabadítást és a közteherviselést sürgette, és a Pesti Hírlap szerkesztőjeként az egész ország közvéleményét formálta.'
        },
        {
          title: 'Március 15. és az áprilisi törvények',
          text: 'Az európai forradalmi hullám (Párizs, Bécs) hírére **1848. március 15-én** Pesten a márciusi ifjak, köztük **Petőfi Sándor**, kinyomtatták a **12 pontot** és a **Nemzeti dalt** – cenzúra nélkül. A forradalom vér nélkül győzött.\n\nV. Ferdinánd király hozzájárult, hogy **Batthyány Lajos** vezetésével megalakuljon az első felelős magyar kormány. **Április 11-én** szentesítette az **áprilisi törvényeket**:\n\n- jobbágyfelszabadítás,\n- közteherviselés (a nemesek is adóznak),\n- népképviseleti országgyűlés,\n- sajtószabadság, törvény előtti egyenlőség.',
          tip: 'A 12 pont első követelése a sajtószabadság volt. Ezért nyomtatták ki „szabad sajtón” a Landerer-nyomdában: ezzel már a gyakorlatban is megvalósították.'
        },
        {
          title: 'A szabadságharc és következményei',
          text: 'Az udvar hamarosan vissza akarta venni az engedményeket. Jelačić horvát bán serege megtámadta az országot, de **1848. szeptember 29-én Pákozdnál** a magyar honvédsereg megállította. Elkezdődött a **szabadságharc**.\n\nA **tavaszi hadjárat** (1849) sikerei után **1849. április 14-én** Debrecenben kimondták a **függetlenségi nyilatkozatot** és a Habsburg-ház trónfosztását; Kossuth lett a kormányzó-elnök. Május 21-én a honvédek visszafoglalták a budai várat. Ferenc József császár azonban az orosz cártól kért segítséget, és a túlerővel szemben a harc reménytelenné vált. **1849. augusztus 13-án Világosnál** Görgei Artúr letette a fegyvert az orosz sereg előtt.\n\nA megtorlás kegyetlen volt: **1849. október 6-án** Aradon kivégezték a szabadságharc **13 tábornokát** (az **aradi vértanúkat**), Pesten pedig Batthyány Lajos miniszterelnököt. Október 6. ma nemzeti gyásznap.\n\nAz önkényuralom évei után **1867-ben** létrejött a **kiegyezés**: megszületett az **Osztrák–Magyar Monarchia**, és Magyarország újra saját kormányt kapott.',
          widget: { type: 'idovonal', options: { title: 'A reformkortól a kiegyezésig', events: [
            { year: 1825, label: '1825', title: 'A reformkor kezdete', text: 'Pozsonyi országgyűlés. Széchenyi felajánlja birtoka egy évi jövedelmét a Tudós Társaság alapítására.' },
            { year: 1848.2, label: '1848. márc. 15.', title: 'A pesti forradalom', text: 'A márciusi ifjak kinyomtatják a 12 pontot és a Nemzeti dalt.' },
            { year: 1848.3, label: '1848. ápr. 11.', title: 'Áprilisi törvények', text: 'V. Ferdinánd szentesíti a törvényeket: jobbágyfelszabadítás, közteherviselés, felelős kormány.' },
            { year: 1848.7, label: '1848. szept. 29.', title: 'Pákozdi csata', text: 'A honvédsereg megállítja Jelačić seregét. Szeptember 29. ma a honvédelem napja.' },
            { year: 1849.3, label: '1849. ápr. 14.', title: 'Függetlenségi nyilatkozat', text: 'Debrecenben kimondják a Habsburg-ház trónfosztását. Kossuth kormányzó-elnök lesz.' },
            { year: 1849.4, label: '1849. máj. 21.', title: 'Buda visszafoglalása', text: 'A honvédsereg ostrommal visszafoglalja a budai várat.' },
            { year: 1849.6, label: '1849. aug. 13.', title: 'Világosi fegyverletétel', text: 'Görgei Artúr az orosz túlerő előtt leteszi a fegyvert.' },
            { year: 1849.8, label: '1849. okt. 6.', title: 'Az aradi vértanúk', text: 'Aradon kivégzik a 13 honvédtábornokot, Pesten Batthyány Lajost.' },
            { year: 1867, label: '1867', title: 'Kiegyezés', text: 'Létrejön az Osztrák–Magyar Monarchia. Ferenc Józsefet magyar királlyá koronázzák.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Ki vezette az első felelős magyar kormányt 1848-ban?', options: ['Batthyány Lajos', 'Kossuth Lajos', 'Széchenyi István', 'Görgei Artúr'], answer: 0, explain: 'Batthyány Lajos volt az első miniszterelnök; Kossuth pénzügyminiszter, Széchenyi közlekedési miniszter lett a kormányában.' },
        { q: 'Mi volt a 12 pont első követelése?', options: ['Sajtószabadság', 'Függetlenség', 'Köztársaság', 'Új király választása'], answer: 0, explain: '„Kívánjuk a sajtó szabadságát, cenzúra eltörlését.” Ezt rögtön meg is valósították.' },
        { q: 'Mi történt 1849. október 6-án?', options: ['Kivégezték az aradi vértanúkat', 'Kitört a forradalom', 'Kimondták a függetlenséget', 'Megkötötték a kiegyezést'], answer: 0, explain: 'Aradon 13 honvédtábornokot, Pesten Batthyány Lajost végezték ki. Ez ma nemzeti gyásznap.' },
        { q: 'Mi jött létre 1867-ben?', options: ['Az Osztrák–Magyar Monarchia', 'A Magyar Köztársaság', 'Az Erdélyi Fejedelemség', 'Az első felelős kormány'], answer: 0, explain: 'A kiegyezéssel Ausztria és Magyarország közös uralkodóval, de saját kormánnyal működött tovább.' }
      ]
    },
    {
      id: 'huszadik-szazad',
      title: 'A 20. század: világháborúktól a rendszerváltásig',
      level: 3, minutes: 18,
      summary: 'Két világháború, Trianon, a holokauszt, 1956 és a rendszerváltás – és a technika, ami közben megváltoztatta a világot.',
      tags: ['20. század', 'első világháború', 'Trianon', 'Horthy', 'második világháború', 'holokauszt', '1956', 'forradalom', 'Nagy Imre', 'Kádár', 'rendszerváltás', '1989', '1990', 'NATO', 'Európai Unió', 'technika', 'tranzisztor', 'mikroprocesszor'],
      sections: [
        {
          title: 'Az első világháború és Trianon',
          text: '**1914. június 28-án** Szarajevóban egy szerb nacionalista merénylő megölte Ferenc Ferdinánd osztrák–magyar trónörököst. Ez indította el az **első világháborút** (1914–1918), amelyben az Osztrák–Magyar Monarchia Németország szövetségeseként harcolt. A háborút a központi hatalmak elvesztették, a Monarchia felbomlott.\n\nA háborút lezáró **trianoni békeszerződést 1920. június 4-én** írták alá. Magyarország elvesztette területének kb. **kétharmadát**, és több mint **3 millió** magyar anyanyelvű ember került a szomszédos államok területére. A döntés hátterében a győztes hatalmak érdekei és a nemzetiségek önálló államiság iránti törekvései álltak. Trianon a magyar társadalom számára máig fájdalmas emlék; június 4. a nemzeti összetartozás napja.\n\nA két világháború között **Horthy Miklós** kormányzó állt az ország élén (1920–1944).'
        },
        {
          title: 'A második világháború és a holokauszt',
          text: 'A **második világháború** (1939–1945) minden idők legpusztítóbb háborúja volt. Magyarország a revízió (az elvesztett területek visszaszerzése) reményében Németország oldalára került, és **1941-ben** lépett be a háborúba. **1943 januárjában** a 2. magyar hadsereg a Donnál katasztrofális vereséget szenvedett.\n\n**1944. március 19-én** Németország megszállta az országot. Ezután, magyar hatóságok közreműködésével, néhány hét alatt több mint 400 000 vidéki zsidó embert deportáltak, többségüket Auschwitzba. A **holokausztnak** Magyarországon mintegy félmillió áldozata volt. Budapest ostroma után 1945 tavaszán ért véget a háború az ország területén.',
          warn: 'A holokauszt az emberiség történetének egyik legsúlyosabb bűne: emberek millióit gyilkolták meg származásuk miatt. Az áldozatok emlékét és a tanulságot – hogy a kirekesztés hová vezethet – meg kell őriznünk.'
        },
        {
          title: '1956 és a rendszerváltás',
          text: 'A háború után a Szovjetunió befolyása alá került ország **kommunista diktatúrává** vált. Rákosi Mátyás idején tömeges letartóztatások, kitelepítések és koncepciós perek voltak.\n\n**1956. október 23-án** Budapesten diáktüntetés kezdődött, amely **forradalommá** szélesedett. **Nagy Imre** miniszterelnök kilépett a Varsói Szerződésből és kimondta az ország semlegességét, de **november 4-én** a szovjet csapatok leverték a forradalmat. Kb. 200 000 ember menekült el nyugatra; Nagy Imrét 1958-ban kivégezték. Október 23. ma nemzeti ünnep.\n\nA **Kádár-korszakban** a diktatúra fokozatosan enyhült, de a többpártrendszer és a szabad választás hiányzott. **1989-ben** a változások felgyorsultak: június 16-án újratemették Nagy Imrét és mártírtársait, szeptemberben Magyarország megnyitotta határát a keletnémet menekültek előtt, **október 23-án** pedig kikiáltották a **Magyar Köztársaságot**. **1990 tavaszán** megtartották az első szabad választásokat, Antall József lett a miniszterelnök. Magyarország **1999-ben a NATO**, **2004-ben az Európai Unió** tagja lett.'
        },
        {
          title: 'A technika százada',
          text: 'Miközben a politikai események zajlottak, a technika is óriásit lépett. Az ipari forradalom gőzgépei után a 19. század végén megjelent a belső égésű motor; hogy hogyan működik, azt a [[benzinmotor|benzinmotor felfedezőjében]] nézheted meg. Magyar mérnökök is sokat hozzátettek: Bánki Donát és Csonka János 1893-ban szabadalmaztatták a porlasztót (karburátort), Kandó Kálmán a villamos vasút fejlesztésében volt úttörő.\n\nAz 1947-ben feltalált **tranzisztor** ([[tranzisztor|nézd meg itt]]) tette lehetővé a modern elektronikát. 1971-ben megjelent az első kereskedelmi **mikroprocesszor**: ma milliárdnyi tranzisztor dolgozik egy [[processzor|processzorban]]. A számítógép felépítésének alapelveit (a Neumann-elvet) a magyar születésű **Neumann János** fogalmazta meg.',
          widget: { type: 'idovonal', options: { title: 'A 20. század Magyarországon', events: [
            { year: 1914, label: '1914', title: 'Az első világháború kitörése', text: 'A szarajevói merénylet után kitör a háború. A Monarchia Németország oldalán harcol.' },
            { year: 1918, label: '1918', title: 'A háború vége', text: 'A központi hatalmak vereséget szenvednek, az Osztrák–Magyar Monarchia felbomlik.' },
            { year: 1920, label: '1920', title: 'Trianoni békeszerződés', text: 'Magyarország elveszíti területének kb. kétharmadát.' },
            { year: 1941, label: '1941', title: 'Belépés a második világháborúba', text: 'Magyarország a Szovjetunió elleni háborúval belép a világháborúba.' },
            { year: 1944, label: '1944', title: 'Német megszállás, deportálások', text: 'Március 19-én a németek megszállják az országot. Tavasszal és nyáron több mint 400 000 zsidó embert deportálnak.' },
            { year: 1945, label: '1945', title: 'A háború vége', text: 'Budapest ostroma után tavasszal véget ér a háború az ország területén.' },
            { year: 1956, label: '1956', title: 'Forradalom és szabadságharc', text: 'Október 23-án kitör a forradalom, november 4-én a szovjet csapatok leverik.' },
            { year: 1989, label: '1989', title: 'A Köztársaság kikiáltása', text: 'Nagy Imre újratemetése, a határnyitás, majd október 23-án a Magyar Köztársaság kikiáltása.' },
            { year: 1990, label: '1990', title: 'Első szabad választások', text: 'Tavasszal szabad, többpárti választásokat tartanak. Antall József lesz a miniszterelnök.' },
            { year: 1999, label: '1999', title: 'NATO-tagság', text: 'Magyarország Csehországgal és Lengyelországgal együtt a NATO tagja lesz.' },
            { year: 2004, label: '2004', title: 'EU-csatlakozás', text: 'Május 1-jén Magyarország 9 másik országgal együtt az Európai Unió tagja lesz.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Mikor írták alá a trianoni békeszerződést?', options: ['1920', '1918', '1945', '1956'], answer: 0, explain: '1920. június 4-én. Ez a nap ma a nemzeti összetartozás napja.' },
        { q: 'Mikor tört ki az 1956-os forradalom?', options: ['Október 23-án', 'Március 15-én', 'Október 6-án', 'Augusztus 20-án'], answer: 0, explain: 'Október 23. ma nemzeti ünnep; 1989-ben ugyanezen a napon kiáltották ki a köztársaságot.' },
        { q: 'Mi történt 1944. március 19-én?', options: ['Németország megszállta Magyarországot', 'Véget ért a háború', 'Aláírták a trianoni békét', 'Kitört a forradalom'], answer: 0, explain: 'A megszállás után kezdődtek a tömeges deportálások.' },
        { q: 'Mikor lett Magyarország az Európai Unió tagja?', options: ['2004', '1990', '1999', '2010'], answer: 0, explain: '2004. május 1-jén. 1999-ben a NATO-hoz csatlakozott.' },
        { q: 'Melyik találmány tette lehetővé a modern elektronikát és a processzorokat?', options: ['A tranzisztor', 'A gőzgép', 'A porlasztó', 'A könyvnyomtatás'], answer: 0, explain: 'Az 1947-ben feltalált tranzisztor az alapja minden mai számítógépnek és telefonnak.' }
      ]
    }
  ]
});
