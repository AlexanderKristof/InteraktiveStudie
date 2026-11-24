/* Tudtad? – tudomány és technika: fizika, kémia, technika, informatika, világűr, Föld, szakmák. Formátum: js/tudtad.js */
STUDIE.addFacts([

  /* ───────── FIZIKA ───────── */
  {
    id: 'atom-szinte-ures', cat: 'fizika',
    q: 'az atom **szinte teljesen üres**: ha az atommag egy borsószem lenne, az atom akkora lenne, mint egy egész sportstadion?',
    why: 'Az atom átmérője nagyjából **10⁻¹⁰ m**, az atommagé viszont csak kb. **10⁻¹⁵ m** – vagyis a mag kb. **százezerszer kisebb**, mint maga az atom. Közben az atom tömegének több mint **99,9%-a** a magban van.\n\nA mag és az elektronok között nincs „anyag”: az elektronok egy valószínűségi felhőben tartózkodnak, amelyet az elektromos vonzás tart a mag körül. Hogy a tárgyak mégis tömörnek tűnnek, azt az elektronfelhők közötti erős taszítás okozza.',
    links: ['modell:atom#empty', 'modell:atom#nucleus', 'lecke:fizika/atom']
  },
  {
    id: 'proton-tomege-energia', cat: 'fizika',
    q: 'a proton tömegének **csak kb. 1%-a származik a benne lévő kvarkok tömegéből**, a többi a kvarkokat összetartó energia?',
    why: 'A protonban két **u** és egy **d** kvark van, ezek nyugalmi tömege együtt is csak kb. **9 MeV/c²**, a proton tömege viszont kb. **938 MeV/c²**. A hiányzó rész Einstein `E = mc²` összefüggése szerint a **gluonok** által közvetített erős kölcsönhatás mezőjének és a kvarkok mozgásának **energiájából** adódik.\n\nVagyis a tested tömegének nagy része tulajdonképpen „bezárt energia” a protonok és neutronok belsejében.',
    links: ['modell:atom#quarks', 'modell:atom#gluons', 'modell:atom#proton', 'szakszo:fizika-bsc/tomeg-energia']
  },
  {
    id: 'neutron-magon-kivul', cat: 'fizika',
    q: 'a neutron az atommagon kívül **nem stabil: magára hagyva kb. negyedóra alatt elbomlik**?',
    why: 'Egy szabad neutron átlagos élettartama kb. **880 másodperc** (felezési ideje kb. 10 perc). Ezután **protonná, elektronná és antineutrínóvá** alakul – ez a **béta-bomlás**.\n\nAz atommagban viszont a legtöbb neutron stabil, mert ott a bomlás energetikailag nem éri meg. Ha egy magban túl sok a neutron, akkor ott is béta-bomlás történhet – ez a radioaktivitás egyik fajtája.',
    links: ['modell:atom#neutron', 'lecke:fizika/atom', 'szakszo:fizika-bsc/radioaktiv-bomlas']
  },
  {
    id: 'elektron-csigalassu', cat: 'fizika',
    q: 'a vezetékben az elektronok **lassabban haladnak, mint egy csiga**, a lámpa mégis azonnal felgyullad?',
    why: 'Egy 1 mm²-es rézvezetékben 1 A áramnál az elektronok átlagos **sodródási sebessége** csak kb. **0,07 mm/s**. A rézben ugyanis rengeteg szabad elektron van (kb. 8,5 · 10²⁸ darab köbméterenként), így nagyon lassú mozgásuk is elég a nagy áramhoz.\n\nA lámpa azért gyullad fel azonnal, mert a kapcsoló felkapcsolásakor az **elektromos tér** terjed végig a vezetéken, közel fénysebességgel, és az a vezeték minden pontján egyszerre „meglöki” az ott lévő elektronokat. Olyan ez, mint egy vízzel teli cső: ha az egyik végén benyomod a vizet, a másik végén azonnal kifolyik valami – de nem ugyanaz a csepp.',
    links: ['lecke:fizika/elektromossag', 'lecke:villanyszereles/alapfogalmak']
  },
  {
    id: 'valtakozo-aram-oda-vissza', cat: 'fizika',
    q: 'a konnektorból jövő váltakozó áramnál az elektronok **gyakorlatilag nem jutnak sehova: csak másodpercenként 50-szer előre-hátra rezegnek**?',
    why: 'A magyar hálózat **50 Hz-es**, vagyis az áram iránya másodpercenként 100-szor megfordul. Mivel az elektronok sodródási sebessége amúgy is csak tört milliméter másodpercenként, egy fél periódus (0,01 s) alatt csak **mikrométeres** távolságot tesznek meg, aztán visszafordulnak.\n\nAz energiát tehát nem az erőműből idáig utazó elektronok hozzák, hanem az **elektromágneses tér** szállítja a vezetékek mentén. Az izzószál vagy a fűtőszál azért melegszik, mert a benne ide-oda rángatott elektronok ütköznek az atomokkal.',
    links: ['modell:elosztoszekreny#fazis', 'lecke:villanyszereles/alapfogalmak', 'szakszo:villamosmernoki/effektiv-ertek']
  },
  {
    id: 'madar-a-vezeteken', cat: 'fizika',
    q: 'a madár azért ülhet nyugodtan egy szabadvezetéken, mert **a két lába között szinte nincs feszültség**?',
    why: 'Az áramhoz nem elég a magas feszültség: **feszültségkülönbség** és zárt áramkör kell. A madár mindkét lába ugyanazon a vezetéken van, pár centire egymástól – a vezeték ellenállása olyan kicsi, hogy ezen a szakaszon a feszültségkülönbség elhanyagolható, így rajta gyakorlatilag nem folyik áram.\n\nAz ember helyzete egészen más: ha egy vezetéket megérintünk, miközben a földön állunk, vagy létrával, sárkányzsinórral, horgászbottal közel kerülünk hozzá, a testünk **utat nyit a föld felé**. Nagyfeszültségnél az ív érintés nélkül, méterekről is átugorhat. Ezért a szabadvezetékektől mindig nagy távolságot kell tartani – a nagy madarak (pl. gólyák) is gyakran pusztulnak el, ha a szárnyukkal két vezetéket vagy egy vezetéket és az oszlopot egyszerre érintik.',
    links: ['lecke:villanyszereles/biztonsag', 'lecke:fizika/elektromossag']
  },
  {
    id: 'kalapacs-es-toll', cat: 'fizika',
    q: 'a Holdon egy kalapács és egy madártoll **pontosan egyszerre ért földet**, amikor egy űrhajós egyszerre ejtette le őket?',
    why: 'David Scott, az **Apollo–15** parancsnoka 1971-ben a Holdon élő adásban mutatta be Galilei gondolatát: légellenállás nélkül **minden test ugyanúgy gyorsul**, a tömegétől függetlenül.\n\nA Földön a toll azért esik lassan, mert a levegő nagy felületéhez képest kicsi súlyát erősen fékezi. A Holdon nincs számottevő légkör, így ott a toll és a kalapács egyaránt kb. **1,6 m/s²**-tel gyorsult (a Földön ez kb. 9,81 m/s² lenne).',
    links: ['lecke:fizika/newton', 'lecke:fiz-alap/mozgas']
  },
  {
    id: 'villam-tavolsag-szamolas', cat: 'fizika',
    q: 'a villám távolságát **egy egyszerű osztással** megbecsülheted: a villanás és a dörgés között eltelt másodperceket hárommal osztva nagyjából kilométert kapsz?',
    why: 'A fény kb. **300 000 km/s**-mal terjed, tehát a villanást gyakorlatilag azonnal látod. A hang a levegőben csak kb. **340 m/s**-mal halad, így kb. **3 másodperc alatt tesz meg 1 km-t**.\n\nHa a villanás után 9 másodperccel hallod a dörgést, a villám kb. 3 km-re csapott le. Ha ez az idő 30 másodpercnél rövidebb (kb. 10 km-en belül), már veszélyes közelségben van a zivatar – ideje fedett, biztonságos helyre menni.',
    links: ['lecke:fizika/hullamok-feny', 'lecke:foldrajz/legkor']
  },
  {
    id: 'feny-lassabb-uvegben', cat: 'fizika',
    q: 'a fény az üvegben **kb. egyharmadával lassabban** halad, mint a vákuumban?',
    why: 'Az üveg **törésmutatója** kb. **1,5**, ami azt jelenti, hogy benne a fény sebessége kb. 300 000 / 1,5 ≈ **200 000 km/s**. Vízben (n ≈ 1,33) kb. 225 000 km/s.\n\nEz a lassulás okozza a **fénytörést**: amikor a fény ferdén lép át egyik anyagból a másikba, irányt változtat. Ezen alapul a szemüveg, a nagyító, a kamera objektívje – és az is, hogy a pohár vízbe tett szívószál „megtörtnek” látszik.',
    links: ['lecke:fizika/hullamok-feny', 'lecke:fiz-alap/elektromossag-feny']
  },
  {
    id: 'egy-gramm-energia', cat: 'fizika',
    q: '**egyetlen gramm** tömeg teljes energiává alakítva nagyjából annyi energiát adna, mint **egy kisebb atombomba**?',
    why: 'Einstein képlete szerint `E = mc²`. 1 g = 0,001 kg, a fénysebesség négyzete kb. 9 · 10¹⁶ m²/s², így az energia kb. **9 · 10¹³ J** – ez kb. **25 millió kWh**, ami nagyjából 21 kilotonna TNT robbanásának felel meg (a hirosimai bomba kb. 15 kilotonnás volt).\n\nA valóságban egyetlen folyamat sem alakítja át a tömeget teljesen: egy atomerőmű urán-hasadásakor a tömegnek csak kb. **0,1%-a** válik energiává – de ez is milliószor több, mint amit égetéssel nyerhetünk.',
    links: ['szakszo:fizika-bsc/tomeg-energia', 'modell:atomeromu#futoelemek', 'lecke:fizika/energia-munka']
  },
  {
    id: 'viz-4-fokon', cat: 'fizika',
    q: 'a víz **+4 °C-on a legsűrűbb**, ezért a tavak felülről fagynak be, és alul télen is életben maradnak a halak?',
    why: 'A legtöbb anyag hűléskor egyre sűrűbb lesz. A víz viszont **4 °C alatt tágulni kezd**, mert a molekulák a **hidrogénkötések** miatt egyre lazább, rácsszerű elrendeződést vesznek fel. A jég ezért kb. **9%-kal kisebb sűrűségű**, mint a víz – úszik rajta.\n\nTélen a 4 °C-os, legsűrűbb víz lesüllyed a tó aljára, a hidegebb víz felül marad és ott fagy meg. A jégréteg ráadásul szigetel, így a mélyben folyékony marad a víz.',
    links: ['lecke:fiz-alap/hotan', 'lecke:kemia/kemiai-kotesek']
  },
  {
    id: 'fekut-negyzetes', cat: 'fizika',
    q: 'ha egy autó **kétszer gyorsabban** megy, a fékútja nem kétszer, hanem **kb. négyszer hosszabb**?',
    why: 'A mozgási energia `E = ½ m v²`, tehát a sebesség négyzetével nő. A fékeknek ezt az energiát kell hővé alakítaniuk, és ugyanakkora fékerővel ehhez négyszer hosszabb út kell.\n\nPélda: ha egy autó 50 km/h-ról kb. 13 m-en áll meg (a reakcióidő nélkül), akkor 100 km/h-ról ugyanazokkal a fékekkel kb. **50 m** kell. Ehhez jön még a reakcióidő alatt megtett út, ami a sebességgel egyenesen arányos.',
    links: ['lecke:fizika/energia-munka', 'lecke:autoszereles/fekrendszer']
  },
  {
    id: 'mikrohullam-mitosz', cat: 'fizika',
    q: 'a mikrohullámú sütő **nem „belülről kifelé”** melegíti az ételt, és nem is a víz valamilyen különleges rezonanciafrekvenciáján működik?',
    why: 'A sütő kb. **2,45 GHz**-es mikrohullámai a vízmolekulákat (amelyek elektromos dipólusok) ide-oda forgatják, és ez a rángatás súrlódásszerűen hővé alakul. Ez a frekvencia **nem a víz rezonanciája** – azért választották, mert ezt a sávot szabadon lehet használni, és a hullám nem nyelődik el túl gyorsan.\n\nA mikrohullám az ételbe csak **néhány centiméter** mélyen hatol be, a belseje hővezetéssel melegszik tovább. Ezért marad hideg egy nagy darab fagyasztott étel közepe, és ezért érdemes közben megkeverni vagy pihentetni az ételt.',
    links: ['lecke:fizika/hullamok-feny', 'lecke:szakacs/technologia']
  },
  {
    id: 'gps-relativitas', cat: 'fizika',
    q: 'a GPS **Einstein relativitáselmélete nélkül naponta kb. 10 km-t tévedne**?',
    why: 'A GPS-műholdak atomórái kétféle okból is másképp járnak, mint a földiek:\n\n- a **gyorsabb mozgás** miatt (speciális relativitás) naponta kb. 7 mikroszekundumot késnek,\n- a **gyengébb gravitáció** miatt (általános relativitás) naponta kb. 45 mikroszekundumot sietnek.\n\nAz eredő kb. **+38 mikroszekundum naponta**. Mivel a jel fénysebességgel halad, ez ennyi idő alatt kb. 11 km-es hibát jelent. Ezért a műholdak óráit már a gyártáskor kicsit „lassabbra” hangolják.',
    links: ['lecke:fizika/mertekegysegek-mozgas', 'tantargy:fizika']
  },
  {
    id: 'betz-hatar', cat: 'fizika',
    q: 'még a tökéletes szélturbina sem tudja a szél energiájának **59,3%-ánál többet** hasznosítani?',
    why: 'Ez a **Betz-határ** (Albert Betz, 1919). Ha a turbina a szél teljes energiáját kivenné, a levegő megállna a lapátok mögött, és nem tudna újabb levegő átáramlani. Ha viszont alig lassítja le, alig vesz ki energiát. Az optimum az, ha a szelet kb. harmadára lassítja – ekkor jön ki a 16/27 ≈ **59,3%**.\n\nA mai nagy szélturbinák rotorja a valóságban kb. **45–50%**-ot ér el, ami már elég közel van ehhez az elméleti plafonhoz.',
    links: ['modell:szelturbina#lapatok', 'modell:szelturbina#agy', 'lecke:fizika/energia-munka']
  },

  /* ───────── KÉMIA ───────── */
  {
    id: 'gyemant-eg', cat: 'kemia',
    q: 'a gyémánt **el tud égni**, mert ugyanúgy tiszta szénből áll, mint a ceruza grafitbele?',
    why: 'A gyémánt és a grafit is **szén**, csak az atomok elrendeződése más: a gyémántban minden szénatom négy szomszédjához kötődik erős, térhálós **kovalens kötéssel**, a grafitban pedig síkokban, amelyek könnyen elcsúsznak egymáson (ezért fog a ceruza).\n\nElég magas hőmérsékleten (levegőn kb. 700–900 °C felett) a gyémánt az oxigénnel **szén-dioxiddá** ég el, és nem marad utána semmi. Ezért kell az ékszerész lánggal óvatosnak lennie a gyémántos ékszerek javításakor.',
    links: ['lecke:kemia/kemiai-kotesek', 'lecke:kem-alap/kemiai-valtozasok']
  },
  {
    id: 'rozsda-szetfeszit', cat: 'kemia',
    q: 'a rozsda **nagyobb térfogatú**, mint a vas, amiből keletkezett, és ezzel akár a vasbetont is szét tudja repeszteni?',
    why: 'Rozsdásodáskor a vas oxigénnel és vízzel **vas-oxidokká és -hidroxidokká** alakul. A rozsda laza, réteges anyag, térfogata a fémvas **többszöröse** lehet (a pontos arány a rozsda fajtájától függ).\n\nA betonba ágyazott betonacélt alapesetben a beton erősen lúgos közege (pH kb. 12–13) védi: a vas felületén vékony, védő oxidréteg marad (**passziválás**). Ha víz és só jut be a repedéseken, a vas rozsdásodni kezd, a rozsda belülről **lefeszíti a betont** – ezt láthatod régi hidak, erkélyek alján, ahol rozsdás vas kandikál ki.',
    links: ['lecke:epitoipar/beton', 'lecke:kem-alap/kemiai-valtozasok', 'lecke:kemia/savak-bazisok']
  },
  {
    id: 'osszes-arany-kocka', cat: 'kemia',
    q: 'az emberiség által valaha kibányászott **összes arany** elférne egy kb. **22 méter élű kockában**?',
    why: 'Becslések szerint eddig összesen kb. **210 ezer tonna** aranyat bányásztak ki. Az arany sűrűsége nagyon nagy, kb. **19,3 g/cm³** (a vízének majdnem hússzorosa), így ez a mennyiség csak kb. 11 000 m³ – egy kb. 22 m élű kocka, ami kisebb egy átlagos társasháznál.\n\nAz arany azért ilyen értékes, mert ritka, nem rozsdásodik, nem oxidálódik – a régi aranypénzek ma is ugyanolyan fényesek, mint kétezer éve.',
    links: ['lecke:kemia/atom-periodusos', 'lecke:hegesztes/femek']
  },
  {
    id: 'natrium-klor-so', cat: 'kemia',
    q: 'a konyhasó két olyan elemből áll, amelyek külön-külön veszélyesek: egy **vízzel hevesen reagáló fémből** és egy **mérgező gázból**?',
    why: 'A **nátrium** puha, ezüstös fém, amely vízzel hevesen, hidrogén fejlődése közben reagál. A **klór** sárgászöld, fojtó, mérgező gáz. Együtt mégis az ártalmatlan **nátrium-kloridot** (NaCl) alkotják.\n\nA titok az elektronokban van: a nátrium átadja egyetlen vegyértékelektronját a klórnak, így mindkettő stabil, nemesgáz-szerkezetű **ionná** válik (Na⁺ és Cl⁻), amelyeket **ionkötés** tart össze. Az ionok tulajdonságai teljesen mások, mint az eredeti atomoké. (Ezeket a kísérleteket csak tanár mutathatja be, megfelelő védőfelszereléssel!)',
    links: ['lecke:kemia/kemiai-kotesek', 'modell:atom#valence']
  },
  {
    id: 'liion-hintaszek', cat: 'kemia',
    q: 'egy épen működő lítiumion-akkumulátorban **egyáltalán nincs fémlítium**, csak lítiumionok ingáznak a két elektród között?',
    why: 'Töltéskor a lítiumionok a katódból (fém-oxid) az elektroliton és a szeparátoron át a **grafit anódba** vándorolnak, és a grafit szénrétegei közé ékelődnek be. Kisütéskor visszaúsznak a katódba, az elektronok pedig közben a külső áramkörön – a telefonon vagy a motoron – keresztül teszik meg ugyanezt az utat. Ezt a működést ezért **„hintaszék”-elvnek** is nevezik.\n\nFémlítium csak hiba esetén keletkezik: például ha nagyon hidegben gyorsan töltik az akkut, a lítium tűszerű kristályokként (**dendritek**) kiválhat a grafit felületén, ami öregíti, rosszabb esetben veszélyessé teszi a cellát. Ezért korlátozza a töltőelektronika hidegben a töltési áramot.',
    links: ['modell:akkucella#anode', 'modell:akkucella#cathode', 'modell:akkucella#elec', 'lecke:elektromos-auto/akkumulator-bms']
  },
  {
    id: 'lfp-kobalt-nelkul', cat: 'kemia',
    q: 'sok mai villanyautó akkujában **nincs se kobalt, se nikkel**, hanem vas-foszfát?',
    why: 'Az **LFP** (lítium-vas-foszfát, LiFePO₄) katód olcsó, bőségesen elérhető anyagokból készül, és nagyon stabil: a foszfátcsoport erősen köti az oxigént, ezért túlmelegedéskor sokkal nehezebben indul meg benne a veszélyes **hőfutás**. Emellett jellemzően több ezer töltési ciklust is kibír.\n\nCserébe kisebb az **energiasűrűsége**, mint az **NMC** (nikkel-mangán-kobalt) katódé, így ugyanakkora hatótávhoz nehezebb akku kell. Ezért gyakori, hogy a hosszú hatótávú modellek NMC-, az olcsóbb változatok LFP-cellákat kapnak.',
    links: ['modell:akkucella#cathode', 'modell:elektromos-auto#battery', 'szakszo:e-mobilitas/cellakemia']
  },
  {
    id: 'szeparator-biztositek', cat: 'kemia',
    q: 'egy akkucella két elektródáját **egy hajszálnál vékonyabb műanyag fólia** választja el, amely túlmelegedéskor magától „bezárhat”?',
    why: 'A **szeparátor** jellemzően csak kb. **10–25 mikrométer** vastag (egy hajszál kb. 50–100 µm), tele parányi pórusokkal: az ionokat átengedi, az elektronokat nem. Ha átszakad, a két elektród összeér, és **belső rövidzár** keletkezik.\n\nTöbb szeparátor több rétegből (polietilén és polipropilén) áll. Ha a cella túlmelegszik, a polietilén réteg kb. 130 °C körül megolvad, és eltömíti a pórusokat – ez a **leállító (shutdown) funkció**, amely megállítja az áramot, mielőtt még nagyobb baj lenne.',
    links: ['modell:akkucella#sep', 'lecke:elektromos-auto/akkumulator-bms']
  },
  {
    id: 'chip-homokbol', cat: 'kemia',
    q: 'a számítógépek chipjei lényegében **homokból** készülnek, de a szilíciumnak legalább **99,9999999%-os** tisztaságúnak kell lennie?',
    why: 'A homok nagy része **kvarc**, azaz szilícium-dioxid (SiO₂). Ebből szénnel, elektromos kemencében nyerik ki a nyers szilíciumot, majd többlépcsős vegyi tisztítással jutnak el a „kilenc kilences” (**9N**) vagy még tisztább félvezető-szilíciumig: egymilliárd atomból legfeljebb egy lehet idegen.\n\nEbből olvadékból húznak egyetlen óriási **egykristályt**, amelyet vékony korongokra (waferekre) szeletelnek. A tranzisztorok működését szándékosan, pontosan adagolt szennyezők (pl. bór, foszfor) – **adalékolás** – állítják be, ezért nem lehet ott semmilyen véletlen szennyeződés.',
    links: ['modell:tranzisztor#substrate', 'modell:processzor#die', 'lecke:kemia/atom-periodusos']
  },
  {
    id: 'aluminium-dragabb-aranynal', cat: 'kemia',
    q: 'az alumínium a 19. század közepén **drágább volt az aranynál**, pedig ma ebből készül a napelemek kerete és az üdítősdoboz?',
    why: 'Az alumínium a földkéreg leggyakoribb féme, de mindig vegyületekben, oxigénhez erősen kötve fordul elő, ezért nagyon nehéz volt tiszta fémet előállítani belőle. A legenda szerint III. Napóleon francia császár legelőkelőbb vendégei alumínium evőeszközzel ettek, a többiek csak arannyal.\n\n**1886**-ban Hall és Héroult egymástól függetlenül kidolgozta az olvadékelektrolízist: a timföldet olvadt kriolitban oldják, és árammal választják le belőle az alumíniumot. Ettől az ára zuhanni kezdett – de az előállítás ma is rengeteg áramot igényel, ezért olyan fontos az alumínium **újrahasznosítása** (az újraolvasztás csak töredék energiát igényel).',
    links: ['modell:napelempanel#keret', 'lecke:kemia/szerves-elektrokemia', 'szakszo:kemia-bsc/elektrolizis']
  },
  {
    id: 'viz-forraspont-hidrogenkotes', cat: 'kemia',
    q: 'ha nem lennének **hidrogénkötések**, a víz szobahőmérsékleten gáz lenne, és **mínusz 60–80 °C körül** forrna?',
    why: 'A hasonló felépítésű, de nehezebb molekulák – mint a kén-hidrogén (H₂S, forráspontja kb. −60 °C) – trendjét követve a víznek is jóval 0 °C alatt kellene forrnia. A valóságban 100 °C-on forr.\n\nAz ok a **hidrogénkötés**: a vízmolekula erősen poláris, és a molekulák egymás hidrogén- és oxigénatomjai között viszonylag erős vonzás alakul ki. Ezt a „ragasztást” is le kell győzni a forráshoz. Enélkül nem lennének óceánok és folyók – és mi sem.',
    links: ['lecke:kemia/kemiai-kotesek', 'szakszo:kemia-bsc/intermolekularis']
  },
  {
    id: 'propan-hutokozeg', cat: 'kemia',
    q: 'sok új hőszivattyúban hűtőközegként **propán** kering – ugyanaz a gáz, ami a kerti grillpalackban van?',
    why: 'A régebbi hűtőközegek (pl. az **R410A**) üvegházhatása (**GWP**) kb. **2000-szer** erősebb a szén-dioxidénál, ha kiszivárognak. A propán (**R290**) GWP-je kb. **3**, ezért az EU szabályai az ilyen „természetes” közegek felé terelik a gyártókat.\n\nA propán viszont **gyúlékony**, ezért az ilyen gépekben csak kis töltetet használnak, a kültéri egységben zárt körben tartják, és a telepítésnél szigorú távolsági és szellőzési szabályokat kell betartani – ezt csak képzett szakember végezheti.',
    links: ['modell:hoszivattyu#vezetekek', 'modell:hoszivattyu#kompresszor', 'lecke:hoszivattyu/hutokozegek']
  },
  {
    id: 'foldgaz-szagtalan', cat: 'kemia',
    q: 'a földgáznak **valójában nincs szaga** – a jellegzetes „gázszagot” szándékosan adják hozzá?',
    why: 'A földgáz fő összetevője a **metán** (CH₄), amely színtelen és szagtalan. Hogy egy szivárgást észrevegyünk, mielőtt robbanásveszélyes keverék alakulna ki, a szolgáltatók kis mennyiségű, erős szagú **kéntartalmú szagosító anyagot** kevernek hozzá (pl. tetrahidrotiofént vagy merkaptánokat). Az orrunk ezeket már nagyon kis koncentrációban is érzi.\n\nHa gázszagot érzel: ne kapcsolj villanyt, ne használj nyílt lángot, nyiss ablakot, menj ki, és kintről hívd a gázszolgáltató hibabejelentőjét.',
    links: ['lecke:vizszereles/gaz-alapok', 'lecke:kem-alap/mindennapok']
  },
  {
    id: 'gorilla-uveg-ioncsere', cat: 'kemia',
    q: 'a telefonok fedőüvegét úgy erősítik meg, hogy **olvadt sófürdőben kisebb ionokat nagyobbakra cserélnek** benne?',
    why: 'A kémiailag edzett üveget forró, olvadt **kálium-nitrát** fürdőbe merítik. Az üveg felszínéről a kisebb **nátriumionok** kivándorolnak, helyükre a nagyobb **káliumionok** préselődnek be. Mivel a nagyobb ionok „nem férnek el”, a felszíni réteg erős **nyomófeszültség** alá kerül.\n\nAz üveg repedése mindig egy apró felszíni karcból indul, amely húzófeszültség hatására nyílik szét. A beépített nyomás ezt ellensúlyozza, így az üveg sokkal jobban bírja az ütést és a hajlítást.',
    links: ['modell:okostelefon#uveg', 'lecke:kemia/kemiai-kotesek']
  },

  /* ───────── TECHNIKA ───────── */
  {
    id: 'benzinmotor-hatasfok', cat: 'technika',
    q: 'egy benzinmotor a tankolt energiának **jellemzően csak kb. negyedét–harmadát** alakítja mozgássá, a többi nagyrészt hő lesz?',
    why: 'A benzin elégetésekor felszabaduló energia jelentős része a **kipufogógázzal** távozik, egy másik része a **hűtővízbe** és a motorolajba megy, egy kisebb része pedig súrlódásra fogy. A legjobb mai benzinmotorok a legkedvezőbb pontjukon kb. **40%**-os hatásfokot érnek el, városi forgalomban azonban az átlag ennél jóval rosszabb.\n\nEzért kell a motornak hűtőrendszer, és ezért fűt télen ingyen a belső égésű autó: a fűtés a motor hulladékhőjét használja. Egy villanymotor hatásfoka ezzel szemben jellemzően **90% feletti**.',
    links: ['modell:benzinmotor#block', 'lecke:autoszereles/kenes-hutes', 'szakszo:e-mobilitas/hatasfok']
  },
  {
    id: 'gyujtogyertya-szikra', cat: 'technika',
    q: 'egy gyújtógyertya **kb. 20 000–40 000 voltos** szikrát ad, és autópályán **másodpercenként több tucatszor** szikrázik?',
    why: 'A négyütemű motorban minden henger **minden második főtengely-fordulatnál** gyújt. 3000/perc fordulatnál ez hengerenként 1500 szikra percenként, azaz **25 másodpercenként**.\n\nA nagy feszültség azért kell, mert a sűrített benzin–levegő keverék sokkal nehezebben vezet, mint a szabad levegő: az elektródák kb. 1 mm-es hézagán csak így tud átütni a szikra. A feszültséget a gyújtótekercs állítja elő az autó 12 V-os hálózatából, egy transzformátorhoz hasonló elven. (Működő gyújtórendszerhez ezért soha ne nyúlj!)',
    links: ['modell:benzinmotor#plugs', 'lecke:autoszereles/negyutemu-motor']
  },
  {
    id: 'vezermuszij-szakadas', cat: 'technika',
    q: 'sok motorban, ha elszakad a **vezérműszíj**, a dugattyúk **nekicsapódnak a szelepeknek**, és a motor súlyosan megsérül?',
    why: 'A vezérműszíj gondoskodik arról, hogy a **vezérműtengely** (és vele a szelepek) pontosan együtt mozogjon a főtengellyel. Az úgynevezett „ütköző” (interferenciás) motorokban a nyitott szelep és a felső holtpontban lévő dugattyú **ugyanazt a teret** használja – csak sosem egyszerre.\n\nHa a szíj elszakad, a vezérműtengely megáll, egyes szelepek nyitva maradnak, a dugattyú pedig tovább mozog és beléjük ütközik. Ezért kell a szíjat a gyártó által előírt kilométer vagy idő után **cserélni**, akkor is, ha még jónak látszik.',
    links: ['modell:benzinmotor#belt', 'modell:benzinmotor#valves', 'modell:benzinmotor#cams']
  },
  {
    id: 'villanyauto-motor-generator', cat: 'technika',
    q: 'a villanyautó motorja **fékezéskor generátorként** működik, és áramot tölt vissza az akkuba?',
    why: 'Egy villanymotor elvben megfordítható: ha áramot vezetünk bele, forog; ha kívülről forgatják, **áramot termel**. Amikor elengeded a gázpedált vagy fékezel, az inverter átállítja a motort generátoros üzembe, és az autó mozgási energiájának egy részét **visszatölti** az akkuba. Ez a **rekuperáció**.\n\nVárosi forgalomban így sok energia visszanyerhető, és a mechanikus fékek is sokkal kevésbé kopnak. Sok villanyautó „egypedálos” üzemmódban is vezethető, mert a gázpedál felengedése már erős lassítást ad.',
    links: ['modell:elektromos-auto#motor', 'modell:elektromos-auto#inverter', 'lecke:elektromos-auto/motor-inverter', 'szakszo:e-mobilitas/rekuperacio']
  },
  {
    id: 'inverter-sipolas', cat: 'technika',
    q: 'a villanyautó akkujában **egyenáram** van, a motorja mégis **háromfázisú váltakozó árammal** forog – és az átalakítás másodpercenként több ezerszer kapcsolgat?',
    why: 'Az **inverter** nagy teljesítményű tranzisztorokkal (IGBT vagy SiC MOSFET) az akku egyenfeszültségét másodpercenként jellemzően **több ezer–több tízezer** alkalommal kapcsolja ki-be. A ki-bekapcsolt szakaszok hosszának ügyes változtatásával (**PWM**) a motor tekercseiben szinuszhoz közeli, változtatható frekvenciájú háromfázisú áram jön létre.\n\nA frekvencia szabja meg, milyen gyorsan forog a mágneses mező, és vele a motor. A villanyautók halk, magas „sípolásának” egy része épp ebből a kapcsolgatásból és a motor mágneses zajából ered.',
    links: ['modell:elektromos-auto#inverter', 'modell:villanymotor#kivezetesek', 'szakszo:e-mobilitas/pwm', 'szakszo:e-mobilitas/inverter']
  },
  {
    id: 'villanyauto-ezernyi-cella', cat: 'technika',
    q: 'egy villanyautó akkuja **több száz vagy akár több ezer** különálló cellából áll, és mindegyiket elektronika felügyeli?',
    why: 'Egy cella feszültsége csak kb. **3–4 V**, ezért sok cellát **sorba** kötnek (így jön ki a 400 V vagy 800 V körüli rendszerfeszültség), és párhuzamosan is (a nagyobb kapacitásért). Például egy korai Tesla Model S 85 kWh-s akkujában **több mint 7000** apró, ceruzaelemszerű hengeres cella volt.\n\nA **BMS** (akkumulátor-felügyelet) folyamatosan méri a cellacsoportok feszültségét és hőmérsékletét, kiegyenlíti a töltésüket, és szükség esetén lekapcsolja az akkut. Ha egyetlen cellacsoport is túltöltődne vagy túlmerülne, az az egész akku élettartamát és biztonságát veszélyeztetné.',
    links: ['modell:elektromos-auto#battery', 'modell:elektromos-auto#bms', 'modell:akkucella#tabs', 'szakszo:e-mobilitas/cellakiegyenlites']
  },
  {
    id: 'neodimium-magnes-hoseg', cat: 'technika',
    q: 'a villanymotorok szuper erős mágnesei **túl melegen elveszíthetik a mágnesességük egy részét**, ezért a motort folyadékkal hűtik?',
    why: 'A legtöbb villanyautó motorjában **neodímium–vas–bór (NdFeB)** mágnesek vannak – ezek a legerősebb ismert állandó mágnesek. Hátrányuk, hogy melegen gyengülnek, és egy határ felett (fajtától függően kb. 80–200 °C körül) a mágnesesség egy része **véglegesen elveszhet**.\n\nEzért a motor állórészét hűtőköpeny veszi körül (víz–glikol), egyes motorokat olajjal is hűtenek belülről. A magas hőmérsékletet jobban bíró mágnesekhez **diszprózium**ot ötvöznek, ez azonban ritka és drága elem.',
    links: ['modell:villanymotor#magnesek', 'modell:villanymotor#hutes', 'modell:villanymotor#haz', 'szakszo:e-mobilitas/pmsm']
  },
  {
    id: 'fi-rele-30-ma', cat: 'technika',
    q: 'a lakás FI reléje már **30 milliamper** (0,03 A) elszivárgó áramra lekapcsol – ez a konnektor teljes áramának csak **kb. ötszázad része**?',
    why: 'Az **áram-védőkapcsoló** (FI relé) folyamatosan összehasonlítja, mennyi áram megy ki a fázisvezetőn, és mennyi jön vissza a nullán. Ha a kettő eltér, az áram valahol máshol – például egy emberen át a föld felé – folyik el. Ha a különbség eléri a **30 mA**-t, a szabvány szerint legfeljebb **0,3 másodperc** alatt lekapcsol, nagyobb hibaáramnál (150 mA) már 0,04 s alatt.\n\nA kismegszakító egy 16 A-es áramkörnél ilyen kis különbséget észre sem venne – az a vezetékeket védi, az FI relé pedig **az embert**. Érdemes havonta egyszer megnyomni a „T” tesztgombot, hogy kiderüljön, működik-e.',
    links: ['modell:elosztoszekreny#fi', 'lecke:villanyszereles/vedelmek', 'szakszo:villamosmernoki/aram-vedokapcsolo']
  },
  {
    id: 'kismegszakito-ket-mechanizmus', cat: 'technika',
    q: 'a kismegszakítóban **két különböző kioldó** van: egy lassú, ami melegedésre, és egy villámgyors, ami mágnesesen reagál?',
    why: 'A **hőkioldó** egy ikerfém (bimetál) csík, amely a rajta átfolyó áramtól melegszik és meghajlik. Kis **túlterhelésnél** (pl. túl sok gép egy körön) ez percek alatt old ki – így nem kapcsol le feleslegesen egy rövid áramlökésnél.\n\nA **mágneses kioldó** egy tekercs, amely **zárlatnál** – amikor az áram a névleges sokszorosára ugrik – ezredmásodpercek alatt kirántja a kapcsolót. Így a vezeték nem melegszik fel annyira, hogy a szigetelése megolvadjon és tüzet okozzon.',
    links: ['modell:elosztoszekreny#mcb', 'lecke:villanyszereles/vedelmek', 'szakszo:villamosmernoki/zarlati-aram']
  },
  {
    id: 'szelturbina-lapatcsucs', cat: 'technika',
    q: 'egy nagy szélturbina lapátja lassúnak tűnik, de a hegye **kb. 250–300 km/h**-val száguld?',
    why: 'A mai nagy turbinák rotorátmérője gyakran **150 m feletti**, és percenként csak kb. **6–15 fordulatot** tesznek. A kerület viszont óriási: egy 75 m-es lapát hegye egy fordulat alatt kb. 470 m-t tesz meg, így 10/perc fordulatnál kb. **80 m/s** (kb. 280 km/h) a sebessége.\n\nA lapátcsúcs sebességét a zaj és a lapátél kopása korlátozza. A lassú rotorforgást pedig a hajtóműves turbinákban a **multiplikátor** (fogaskerék-áttétel) gyorsítja fel a generátor számára szükséges fordulatszámra.',
    links: ['modell:szelturbina#lapatok', 'modell:szelturbina#hajtomu', 'modell:szelturbina#generator']
  },
  {
    id: 'turbofan-ventilator-tolo', cat: 'technika',
    q: 'egy modern utasszállító hajtóművének tolóerejét **nagyrészt nem a forró gázsugár**, hanem a nagy **ventilátor** által hátrafújt hideg levegő adja?',
    why: 'A mai **turbofan** hajtóművekben az elöl lévő óriási ventilátor által beszívott levegőnek csak kis része jut be a forró magba (kompresszor, égőtér, turbina). A többi **megkerüli** azt – ez az arány, a **kétáramúsági fok**, a legújabb hajtóműveknél kb. **10–12 : 1**.\n\nA tolóerő **nagy része (kb. 80–90%)** ebből a hideg áramból származik. Nagyobb tömegű levegőt lassabban gyorsítani ugyanis sokkal **üzemanyag-takarékosabb**, mint kevés levegőt nagyon gyorsan – és csendesebb is. A forró magban lévő turbina feladata főleg az, hogy meghajtsa a ventilátort.',
    links: ['modell:hajtomu#ventilator', 'modell:hajtomu#fuvoka', 'modell:hajtomu#kisnyomasu-turbina']
  },
  {
    id: 'turbinalapat-olvadaspont', cat: 'technika',
    q: 'a sugárhajtómű turbinalapátjai **olvadáspontjuknál forróbb gázban** forognak, mégsem olvadnak meg?',
    why: 'A nagynyomású turbinába érkező gáz kb. **1500–1700 °C**-os is lehet, a lapátok nikkelalapú szuperötvözete pedig kb. 1300 °C körül már olvadni kezdene. A trükkök:\n\n- a lapátok belsejében **hűtőcsatornák** futnak, amelyekbe a kompresszorból „hidegebb” (pár száz fokos) levegőt vezetnek,\n- ez a levegő apró furatokon kiáramolva **hűtő levegőfilmet** képez a lapát felszínén,\n- kerámia **hővédő bevonat** szigeteli a fémet,\n- a lapát gyakran **egyetlen kristályból** van öntve, ami melegen is sokkal szilárdabb.\n\nEgyetlen ilyen lapát a világ egyik legbonyolultabban gyártott fémalkatrésze.',
    links: ['modell:hajtomu#nagynyomasu-turbina', 'modell:hajtomu#egoter', 'lecke:hegesztes/femek']
  },
  {
    id: 'paks-nincs-hutotorony', cat: 'technika',
    q: 'a Paksi Atomerőműnek **nincsenek hűtőtornyai**, és az atomerőművek hűtőtornyaiból egyébként is **csak vízpára** száll fel?',
    why: 'Az atomerőművek fölötti fehér felhő **közönséges vízgőz**, amely a hűtővíz párolgásából származik. Ez a víz a **harmadik**, teljesen elkülönített körben kering, nem érintkezik a reaktorral, így nem radioaktív.\n\nPaks a hűtővizet a **Dunából** veszi: a kondenzátorban a turbinából kijövő gőzt a folyóvízzel hűtik le, majd a kicsit felmelegedett vizet visszavezetik a Dunába (a felmelegedésre szigorú határértékek vonatkoznak). Paks négy blokkja a hazai áramtermelés **nagyjából 45–50%-át** adja.',
    links: ['modell:atomeromu#hutotorony', 'modell:atomeromu#kondenzator', 'modell:atomeromu#turbina']
  },
  {
    id: 'urantabletta-szen', cat: 'technika',
    q: 'egy **ujjbegynyi urán-dioxid tabletta** nagyjából annyi energiát ad egy atomerőműben, mint **kb. egy tonna szén**?',
    why: 'A fűtőelem-pasztillák kb. 1 cm-es, néhány grammos kerámiahengerek. Az urán-235 atommagjainak hasadásakor egy-egy atom kb. **200 MeV** energiát szabadít fel – ez **tízmilliószor** több, mint amennyi egy szénatom elégetésekor felszabadul.\n\nA pasztillákat cirkóniumötvözet csövekbe töltik, ezeket kötegelik **fűtőelem-kazettákká**. Egy kazetta több évig marad a reaktorban, mielőtt kicserélik.',
    links: ['modell:atomeromu#futoelemek', 'modell:atomeromu#reaktortartaly', 'lecke:fizika/atom']
  },
  {
    id: 'napelem-hidegben-jobb', cat: 'technika',
    q: 'a napelem **hideg, napos tavaszi napon** jobban teljesíthet, mint a legforróbb nyári délutánon?',
    why: 'A szilícium napelemcellák feszültsége a hőmérséklet emelkedésével csökken: minden fok melegedés kb. **0,3–0,4%** teljesítményt visz el. Nyáron a panel felülete könnyen **60–70 °C**-ra melegszik, ami a szabványos 25 °C-hoz képest kb. 12–16% veszteség.\n\nEzért fontos, hogy a panelek alatt áramolhasson a levegő. A nyári hónapok összesített hozama persze így is a legnagyobb, mert hosszabbak a nappalok és magasabban jár a Nap.',
    links: ['modell:napelempanel#cellak', 'lecke:napelem/tervezes', 'lecke:napelem/mukodes']
  },
  {
    id: 'napelem-arnyek-bypass', cat: 'technika',
    q: 'egy napelem panelen akár **egyetlen cella leárnyékolása** is a panel teljesítményének jelentős részét elviheti – ha nem lennének bypass-diódák?',
    why: 'A cellák egy panelen belül **sorba vannak kötve**, ezért ugyanakkora áramnak kell mindegyiken átfolynia. Ha egy cellát árnyék (falevél, madárpiszok, kémény) takar, az csak kevés áramot tud átengedni, és lefojtja az egész sort – sőt fogyasztóként melegedni kezd (**hot spot**).\n\nA csatlakozódobozban lévő **bypass-diódák** (általában 3 darab) egy-egy cellacsoportot áthidalnak: ha egy csoport árnyékban van, az áram a diódán keresztül megkerüli, így csak az az egy csoport esik ki.',
    links: ['modell:napelempanel#doboz', 'modell:napelempanel#szalag', 'lecke:napelem/karbantartas']
  },
  {
    id: 'hoszivattyu-cop', cat: 'technika',
    q: 'a hőszivattyú **1 kWh áramból 3–5 kWh hőt** is adhat – és ez nem sérti az energiamegmaradás törvényét?',
    why: 'A hőszivattyú nem „gyártja” a hőt, hanem **átszállítja**: a kinti levegőből veszi el, és a lakásba pumpálja. Az áram csak a kompresszort hajtja, ami ezt a szállítást végzi. A leadott hő = a kintről elvett hő + a kompresszor munkája.\n\nA **COP** (jósági fok) azt mutatja, hányszor annyi hőt ad, mint amennyi áramot felvesz. Még **−10 °C**-os levegőben is van bőven hőenergia, hiszen az abszolút nulla fok (−273 °C) messze van – csak hidegebb időben több munka kell a hő „felpumpálásához”, ezért a COP csökken.',
    links: ['modell:hoszivattyu#kompresszor', 'modell:hoszivattyu#elparologtato', 'lecke:hoszivattyu/cop']
  },
  {
    id: 'hoszivattyu-leolvasztas', cat: 'technika',
    q: 'télen a hőszivattyú kültéri egységéből néha **gőzfelhő** száll fel – mert időnként **visszafelé működve** leolvasztja magáról a jeget?',
    why: 'Fagypont körüli, párás időben a hideg **elpárologtató** lamelláira lecsapódik és ráfagy a levegő páratartalma. A jég szigetel, és akadályozza a levegő áramlását, ezért a gépnek időnként meg kell szabadulnia tőle.\n\nA **négyutú váltószelep** ilyenkor néhány percre megfordítja a hűtőkör irányát: a forró hűtőközeg a kinti hőcserélőbe megy, leolvasztja a jeget, ami vízként lecsöpög, illetve gőzként felszáll. Ugyanez a szelep teszi lehetővé, hogy sok hőszivattyú nyáron **hűtsön**.',
    links: ['modell:hoszivattyu#valtoszelep', 'modell:hoszivattyu#elparologtato', 'lecke:hoszivattyu/karbantartas']
  },

  /* ───────── INFORMATIKA ───────── */
  {
    id: 'cpu-tranzisztorok-szama', cat: 'informatika',
    q: 'egy mai csúcsprocesszorban **több tízmilliárd tranzisztor** van – többszörösen annyi, ahány ember él a Földön?',
    why: 'A Föld népessége kb. 8 milliárd, a legnagyobb mai fogyasztói chipekben viszont **több tízmilliárd** (egyes csúcschipekben már százmilliárdnál is több) tranzisztor dolgozik. Mindegyik egy parányi **kapcsoló**, amely be- vagy kikapcsolt állapotával egy bitet képvisel.\n\nAz első mikroprocesszorban, az Intel 4004-ben (1971) még csak kb. **2300** tranzisztor volt. A **Moore-törvény** szerint a chipeken lévő tranzisztorok száma kb. kétévente megduplázódik – ez évtizedeken át meglepően jól teljesült, bár mostanra lassul.',
    links: ['modell:processzor#cores', 'modell:tranzisztor#gate', 'szakszo:digitalis-technika/moore']
  },
  {
    id: 'nanometer-marketing', cat: 'informatika',
    q: 'a „3 nanométeres” chipgyártási eljárásban **egyik alkatrész sem 3 nm méretű** – a szám ma inkább csak egy elnevezés?',
    why: 'Régen a technológia neve (pl. 90 nm) nagyjából a tranzisztor **kapuhosszát** jelentette. Kb. a 2010-es évektől azonban a tranzisztorok felépítése megváltozott (FinFET, majd GAA), és a nevek elszakadtak a valódi méretektől: a „3 nm-es” eljárásban a kapuk közötti távolság (gate pitch) kb. **45–50 nm**.\n\nA szám ma inkább azt jelzi, hogy egy újabb **generációról** van szó, nagyobb tranzisztorsűrűséggel. A különböző gyártók azonos nevű eljárásai ezért nem is feltétlenül összevethetők.',
    links: ['modell:tranzisztor#gate', 'modell:tranzisztor#channel', 'modell:processzor#die']
  },
  {
    id: 'kapuoxid-alagutazas', cat: 'informatika',
    q: 'a tranzisztorok szigetelőrétege olyan vékony lett, hogy az elektronok **kvantumos alagúteffektussal átszivárogtak rajta**?',
    why: 'A MOSFET **kapuszigetelője** választja el a kaput a csatornától. A 2000-es évek elejére a szilícium-dioxid réteg csak **néhány atomnyi** (kb. 1,2 nm) vastag lett. Ilyen vékony gáton az elektronok a kvantummechanika szerint valamekkora valószínűséggel „átalagutaznak”, akkor is, ha a klasszikus fizika szerint nem juthatnának át – ez **szivárgó áramot** és fölösleges melegedést okozott.\n\nA megoldás a **high-k** szigetelő (pl. hafnium-oxid) lett: ez ugyanazt a vezérlőhatást vastagabb réteggel is biztosítja, így a szivárgás jelentősen csökken.',
    links: ['modell:tranzisztor#oxide', 'modell:tranzisztor#gate', 'szakszo:digitalis-technika/mosfet']
  },
  {
    id: 'cache-ram-varakozas', cat: 'informatika',
    q: 'ha a processzornak a **RAM-ból** kell adatot hoznia, közben **több száz órajelciklusnyi** ideig várnia kell?',
    why: 'Egy RAM-hozzáférés kb. **80–100 nanoszekundum**, ami egy 3–4 GHz-es processzornak **több száz** ciklusnyi várakozás. Ha minden adatért a RAM-hoz kellene fordulnia, a processzor ideje nagy részét tétlenül töltené.\n\nEzért van a chipen belül többszintű **gyorsítótár (cache)**: az L1 cache-ből kb. 1 ns alatt (néhány ciklus) jön az adat, az L2, L3 lassabb, de nagyobb. Mivel a programok jellemzően ugyanazokat és egymás melletti adatokat használják újra, az esetek túlnyomó többségében a szükséges adat már ott van a gyorsítótárban.',
    links: ['modell:processzor#cache', 'modell:processzor#imc', 'modell:alaplap#ram', 'szakszo:digitalis-technika/memoriahierarchia']
  },
  {
    id: 'cpu-tobb-mint-fozolap', cat: 'informatika',
    q: 'egy processzor lapkája **négyzetcentiméterenként több hőt** termel, mint egy bekapcsolt elektromos főzőlap?',
    why: 'Egy kb. 2000 W-os, 15 cm átmérőjű főzőlap felülete kb. 180 cm², vagyis kb. **11 W/cm²** jut rá. Egy asztali processzor kb. **100–250 W**-ot fogyaszt, és ez egy mindössze néhány cm²-es szilíciumlapkán alakul hővé – így a hősűrűség akár **50–100 W/cm²** is lehet.\n\nEzért kell a **hőelosztó fedél**, a hővezető paszta és a nagy hűtőborda vagy vízhűtés. Hűtés nélkül egy modern processzor másodpercek alatt túlmelegedne – szerencsére ilyenkor automatikusan lelassít vagy lekapcsol.',
    links: ['modell:processzor#die', 'modell:processzor#ihs', 'modell:processzor#tim']
  },
  {
    id: 'lga-ezernyi-erintkezo', cat: 'informatika',
    q: 'egy asztali processzor alján **több mint ezer** apró érintkező van, és nagy részük csak a tápellátást viszi?',
    why: 'A mai asztali processzorok foglalatai (pl. az Intel LGA1700, az AMD AM5) **1700 körüli** érintkezővel kapcsolódnak az alaplaphoz. LGA-foglalatnál az érintkező „tüskék” rugós lábacskák formájában az alaplapon vannak, a processzoron pedig csak lapos **aranyozott pöttyök**.\n\nAz érintkezők jelentős része **tápfeszültség és föld**: egy kb. 1 V-os feszültségen dolgozó processzor 150 W-nál már több mint 100 A áramot vesz fel, ezt sok párhuzamos érintkezőn kell elosztani. A többi a memória, a PCIe és egyéb jelek útja.',
    links: ['modell:processzor#pads', 'modell:alaplap#socket', 'modell:processzor#substrate']
  },
  {
    id: 'vrm-100-amper', cat: 'informatika',
    q: 'az alaplap a processzornak kb. **1 V** feszültséget ad, de akár **100 A-nél is több** áramot – többet, mint egy elektromos tűzhely?',
    why: 'A teljesítmény `P = U · I`. Ha egy processzor 150 W-ot vesz fel kb. 1,2 V-on, az kb. **125 A**. A tápegység viszont 12 V-ot ad, ezért kell az alaplapra a processzor köré a **VRM** (feszültségszabályzó modul): több párhuzamos fázisban, nagy frekvenciával kapcsolgatott tranzisztorokkal és tekercsekkel alakítja át a 12 V-ot a szükséges kb. 1 V-ra.\n\nA VRM másodpercenként ezerszer is képes igazítani a feszültséget a processzor pillanatnyi terheléséhez. Ezért vannak a foglalat körül azok a kis fekete „kockák” (tekercsek) és hűtőbordák.',
    links: ['modell:alaplap#vrm', 'modell:alaplap#atx24', 'modell:alaplap#socket', 'szakszo:elektronika/kapcsolouzemu-tap']
  },
  {
    id: 'ssd-vs-hdd', cat: 'informatika',
    q: 'egy M.2 NVMe SSD **több tízszer gyorsabban** olvashat, mint egy hagyományos, forgó lemezes merevlemez?',
    why: 'A merevlemezben egy mechanikus fej mozog a percenként jellemzően 5400–7200-at forduló lemez fölött, ezért egy adat megtalálása **milliszekundumokig** tart, folyamatos olvasásnál pedig kb. **150–250 MB/s** a jellemző sebesség.\n\nAz SSD-ben nincs mozgó alkatrész: az adatok **flash-memóriacellákban** vannak, a vezérlő egyszerre sok chipből olvas. Egy PCIe 4.0-s NVMe SSD kb. **7000 MB/s**-ot is elérhet, és egy véletlenszerű adathoz is tizedmilliszekundumok alatt hozzáfér. Ezért indul el egy SSD-s gép néhány másodperc alatt.',
    links: ['modell:alaplap#m2', 'modell:alaplap#pcie', 'modell:alaplap#sata']
  },
  {
    id: 'telefon-apollo', cat: 'informatika',
    q: 'egy mai okostelefon **sok milliószor** nagyobb számítási teljesítményű, mint az a számítógép, amely az Apollo-űrhajókat a Holdra vezette?',
    why: 'Az **Apollo Guidance Computer** kb. **2 MHz**-es órajellel működött, kb. **4 kilobájt** írható memóriája (RAM) és kb. 72 kB fix programmemóriája volt, és másodpercenként néhány tízezer műveletet végzett.\n\nEgy mai telefon **egychipes rendszere (SoC)** több, GHz-es processzormagot, grafikus egységet és gépi tanulásra szolgáló gyorsítót tartalmaz, és gigabájtnyi RAM-mal dolgozik – másodpercenként **milliárdnyi** műveletre képes. Az Apollo-mérnökök persze rendkívül ügyes, takarékos programozással hozták ki a maximumot a gépükből.',
    links: ['modell:okostelefon#alaplap', 'modell:okostelefon#memoria', 'lecke:informatika/szamitogep']
  },
  {
    id: 'erintokepernyo-kesztyu', cat: 'informatika',
    q: 'a telefon érintőképernyője hagyományos kesztyűben **nem működik**, viszont egy **virslivel** igen?',
    why: 'A mai **kapacitív** érintőképernyők az üveg alatt finom, átlátszó vezetőrácsot használnak, amely kis elektromos teret hoz létre. Az ujjad, mivel sós vizet tartalmaz és **vezeti az áramot**, megváltoztatja a rács egy pontjának **kapacitását** – a vezérlő ezt méri, és ebből számolja ki az érintés helyét.\n\nA gyapjú- vagy bőrkesztyű szigetel, ezért a képernyő nem érzékeli az ujjat. Egy virsli viszont nedves és sós, vagyis ugyanúgy vezet – ezért működik. Az érintőképernyős kesztyűk ujjbegyébe vezető fonalat szőnek.',
    links: ['modell:okostelefon#kijelzo', 'modell:okostelefon#uveg']
  },
  {
    id: 'telefon-keret-antenna', cat: 'informatika',
    q: 'sok telefon **fémkeretének egyes részei maguk az antennák**, és a keret műanyag csíkjai ezeket választják el?',
    why: 'A fém leárnyékolja a rádióhullámokat, így egy teljesen fémházas telefon belsejében lévő antennák rosszul működnének. A megoldás: a keretet szigetelő **műanyag csíkokkal** több darabra osztják, és ezeket a darabokat **antennaként** használják.\n\nEgy mai telefonban sok antenna van: a mobilhálózat (4G/5G) különböző frekvenciáihoz, a Wi-Fi-hez, a Bluetooth-hoz, a GPS-hez és az NFC-hez. Ezért romolhat a térerő, ha a telefont bizonyos módon fogod.',
    links: ['modell:okostelefon#keret', 'modell:okostelefon#antenna', 'lecke:informatika/halozatok']
  },
  {
    id: 'telefon-akku-80-szazalek', cat: 'informatika',
    q: 'a telefon akkuja **lassabban öregszik**, ha nem tartod mindig 100%-on – ezért sok telefon szándékosan **80%-nál megáll** a töltéssel?',
    why: 'A lítiumion-cella akkor öregszik a leggyorsabban, ha **magas töltöttségi szinten** (nagy feszültségen) és **melegben** van. Ilyenkor gyorsabban zajlanak azok a mellékreakciók, amelyek fogyasztják a lítiumot és az elektrolitot.\n\nEzért kínálnak a telefonok **optimalizált töltést**: éjszaka 80% körül megállnak, és csak reggelre töltenek fel teljesen, vagy fix 80%-os korlátot lehet beállítani. A lemerülésig való merítés sem jó – a középső tartományban (kb. 20–80%) érzi magát legjobban az akku.',
    links: ['modell:okostelefon#akku', 'modell:akkucella#cathode', 'szakszo:e-mobilitas/soh']
  },
  {
    id: 'internet-tenger-alatti-kabelek', cat: 'informatika',
    q: 'a kontinensek közötti internetforgalom **túlnyomó része nem műholdakon**, hanem a tenger fenekén futó kábeleken halad?',
    why: 'A kontinensek közötti adatforgalom **jóval több mint 95%-a** tenger alatti **optikai kábeleken** megy át. Ezekben üvegszálakban fényimpulzusok viszik az adatot, egyetlen kábel másodpercenként több száz terabitet is szállíthat.\n\nA kábelek alig vastagabbak egy locsolócsőnél a mély óceánban, és több ezer km hosszúak. A műholdas internet ott fontos, ahová nem ér el kábel, de az óriási forgalomhoz a kábel gyorsabb, olcsóbb, és kisebb a késleltetése.',
    links: ['lecke:informatika/halozatok', 'lecke:rendszeruzem/halozati-eszkozok']
  },
  {
    id: 'elso-bug-moly', cat: 'informatika',
    q: 'a híres 1947-es „számítógépes moly” **nem az első „bug”** volt – a szót a mérnökök már jóval korábban használták a hibákra?',
    why: 'A **Harvard Mark II** számítógép egyik reléjében 1947-ben valóban egy molyt találtak, és a csapat (Grace Hopper munkatársai) be is ragasztották a naplóba ezzel a megjegyzéssel: „az első eset, hogy valódi bogarat (bug) találtunk”. A vicc épp az volt benne, hogy a „bug” szót **már akkor is** használták a hibákra.\n\nThomas Edison például már az 1870-es években „bugoknak” nevezte a találmányai apró hibáit. A **debugging** (hibakeresés) szó tehát nem a molytól ered, de a történet jól mutatja, hogy a korai gépek mechanikus alkatrészei is elromolhattak.',
    links: ['lecke:informatika/programozas', 'szakszo:programozas/hibakereses']
  },

  /* ───────── VILÁGŰR ───────── */
  {
    id: 'napfeny-8-perc', cat: 'vilagur',
    q: 'a Napot mindig **kb. 8 perccel ezelőtti** állapotában látod?',
    why: 'A Nap átlagosan kb. **150 millió km**-re van tőlünk. A fény sebessége kb. 300 000 km/s, így 150 000 000 / 300 000 ≈ 500 másodperc, azaz kb. **8 perc 20 másodperc** kell, hogy ideérjen.\n\nMinél messzebbre nézünk, annál régebbi fényt látunk: a Hold fénye kb. 1,3 másodperces, a legközelebbi csillagé több mint 4 éves, a távoli galaxisoké pedig milliárd éves. Az égbolt tehát egy **időgép** is.',
    links: ['lecke:termeszet/fold-naprendszer', 'lecke:fizika/hullamok-feny']
  },
  {
    id: 'foton-napmag-utja', cat: 'vilagur',
    q: 'a Nap magjában keletkező energia **sok ezer, sőt százezer évig** bolyong, mire kijut a Nap felszínére?',
    why: 'A Nap belseje olyan sűrű, hogy a magban keletkező fotonok csak parányi utat tesznek meg, aztán elnyelődnek, majd egy másik, véletlen irányban újra kibocsátódnak. Ez a **véletlen bolyongás** rendkívül lassan halad kifelé: a becslések szerint a magtól a felszínig **tízezer–százezer év** nagyságrendű idő kell (a pontos érték a modelltől függ).\n\nA felszínről (a fotoszférából) viszont a fény már csak 8 perc alatt ér a Földre. A ma érkező napfény energiája tehát a Nap belsejében már a kőkorszakban útnak indult.',
    links: ['lecke:termeszet/fold-naprendszer', 'lecke:fizika/hullamok-feny']
  },
  {
    id: 'venusz-nap-hosszabb', cat: 'vilagur',
    q: 'a Vénuszon **egy nap hosszabb, mint egy év**?',
    why: 'A Vénusz nagyon lassan forog a tengelye körül: egy teljes fordulat (a csillagokhoz képest) kb. **243 földi nap**. A Nap körül viszont kb. **225 földi nap** alatt kerül meg.\n\nRáadásul a Vénusz a legtöbb bolygóval **ellentétes irányban** forog, így ott a Nap nyugaton kel és keleten nyugszik. (A napkeltétől a következő napkeltéig eltelt idő a két mozgás együttes hatása miatt „csak” kb. 117 földi nap.)',
    links: ['lecke:termeszet/fold-naprendszer', 'lecke:fizika/mertekegysegek-mozgas']
  },
  {
    id: 'iss-van-gravitacio', cat: 'vilagur',
    q: 'a Nemzetközi Űrállomáson **a gravitáció majdnem olyan erős, mint a Földön** – az űrhajósok mégis lebegnek?',
    why: 'Az ISS kb. **400 km** magasan kering, ahol a gravitáció még kb. **90%-a** a felszíninek. Az űrhajósok azért lebegnek, mert az állomással együtt **folyamatosan szabadon esnek** a Föld felé – csak közben olyan gyorsan (kb. 28 000 km/h-val) haladnak oldalirányban, hogy mindig „elvétik” a Földet. Ez a keringés.\n\nUgyanezt élnéd át egy szabadon eső liftben is: te és a lift ugyanúgy gyorsulnátok, így nem nyomnád a padlót. Az ISS kb. **90 percenként** kerüli meg a Földet, így a legénység naponta kb. 16 napkeltét lát.',
    links: ['lecke:fizika/newton', 'modell:fold#legkor']
  },
  {
    id: 'neutroncsillag-teaskanal', cat: 'vilagur',
    q: 'egy **teáskanálnyi neutroncsillag-anyag** a Földön **több száz millió tonnát** nyomna?',
    why: 'A neutroncsillag egy felrobbant óriáscsillag összeroskadt magja: nagyjából a **Nap tömegének 1,4–2-szerese** sűrűsödik össze egy kb. **20 km** átmérőjű gömbbe. Az anyag itt olyan sűrű, mint az atommag: a gravitáció a protonokat és elektronokat neutronokká préseli, és eltűnik az atomokra jellemző „üres tér”.\n\nSűrűsége kb. 10¹⁷ kg/m³ nagyságrendű, ami köbcentiméterenként **kb. 100 millió tonna** – egy teáskanálnyi (kb. 5 cm³) tehát több száz millió tonna.',
    links: ['modell:atom#empty', 'modell:atom#nucleus', 'modell:atom#neutron']
  },
  {
    id: 'nap-tomegvesztes', cat: 'vilagur',
    q: 'a Nap **másodpercenként kb. 4 millió tonnát veszít** a tömegéből, mert azt fénnyé és hővé alakítja?',
    why: 'A Nap magjában **hidrogénatommagok héliummá egyesülnek** (magfúzió), másodpercenként kb. 600 millió tonna hidrogén. A keletkező hélium kb. 0,7%-kal könnyebb, mint a kiinduló hidrogén – ez a „hiányzó” tömeg `E = mc²` szerint **energiává** alakul.\n\nEz kb. **4 millió tonna másodpercenként**, ami óriásinak tűnik, de a Nap tömege olyan hatalmas (kb. 2 · 10²⁷ tonna), hogy ezzel a tempóval is még **milliárd évekig** kitart.',
    links: ['modell:atom#nucleus', 'szakszo:fizika-bsc/tomeg-energia', 'lecke:termeszet/fold-naprendszer']
  },
  {
    id: 'hold-tavolodik', cat: 'vilagur',
    q: 'a Hold **évente kb. 3,8 centiméterrel távolodik** a Földtől?',
    why: 'Ezt az Apollo-űrhajósok által a Holdon hagyott **lézertükrök** segítségével mérik: a Földről lézerimpulzust küldenek rájuk, és a visszaverődés idejéből centiméter pontossággal kiszámolják a távolságot.\n\nA távolodás oka az **árapály**: a Hold által a Föld óceánjain keltett dagálypúpot a Föld forgása kicsit „előrébb” viszi, és ennek gravitációja gyorsítja a Holdat, ami így magasabb pályára kerül. Cserébe a Föld forgása lassul – a napok nagyon lassan hosszabbodnak.',
    links: ['lecke:termeszet/fold-naprendszer', 'modell:fold#vizburok']
  },
  {
    id: 'voyager-egy-fenynap', cat: 'vilagur',
    q: 'a Voyager–1 űrszonda 2026 novemberében **egy fénynapnyi távolságra** jutott a Földtől, és **nem napelemmel** működik?',
    why: 'Az 1977-ben indított Voyager–1 **2026. november 18-án** érte el az egy fénynapnyi (kb. **25,9 milliárd km**) távolságot: egy rádióparancs **24 óra** alatt ér el hozzá, és a válasz újabb 24 óra alatt jön vissza. Ez az ember által valaha legmesszebbre küldött tárgy.\n\nIlyen messze a napfény erőssége csak kb. harmincezred része a földinek, ezért napelem nem jöhetne szóba. A szonda **radioizotópos termoelektromos generátorral (RTG)** működik: plutónium bomlásának hőjét alakítja árammá. A teljesítménye évről évre csökken, ezért a mérnökök fokozatosan kapcsolják ki a műszereit.',
    links: ['modell:napelempanel#cellak', 'lecke:fizika/atom']
  },
  {
    id: 'arany-csillagutkozes', cat: 'vilagur',
    q: 'a gyűrűdben lévő arany **nagy része valószínűleg neutroncsillagok ütközésében** keletkezett, jóval a Föld születése előtt?',
    why: 'A csillagok belsejében a magfúzió csak a **vasig** termel energiát. A vasnál nehezebb elemek – mint az arany, a platina vagy az urán – főleg akkor jönnek létre, amikor az atommagok hirtelen rengeteg **neutront** nyelnek el (ez az ún. r-folyamat).\n\nIlyen extrém körülmények szupernóvákban és **neutroncsillagok összeolvadásakor** alakulnak ki. 2017-ben a gravitációs hullámok mellett egy ilyen ütközés fényét is megfigyelték, és a színképében nehéz elemek nyomait találták. A Naprendszer ezt a „csillagport” örökölte a kialakulásakor.',
    links: ['lecke:kemia/atom-periodusos', 'modell:atom#nucleus']
  },
  {
    id: 'mars-kek-naplemente', cat: 'vilagur',
    q: 'a Marson **kékes a naplemente**, nappal pedig vöröses-barnás az ég – éppen fordítva, mint nálunk?',
    why: 'A Földön az ég azért kék, mert a levegő molekulái a kék fényt sokkal jobban szórják, mint a vöröset (**Rayleigh-szórás**). Napnyugtakor a fény hosszú utat tesz meg a légkörben, a kék nagy része „kiszóródik”, és vörösen látjuk a Napot.\n\nA Mars légköre nagyon ritka, de tele van finom, vörös **porral**. A porszemcsék a vöröses fényt szórják szét az egész égbolton, a kék fényt viszont inkább előre, a Nap irányába. Ezért napnyugtakor a Nap körül kékes fényudvar látszik – ezt a marsjárók kamerái többször is lefotózták.',
    links: ['lecke:fizika/hullamok-feny', 'lecke:termeszet/fold-naprendszer']
  },

  /* ───────── FÖLD ───────── */
  {
    id: 'fold-belso-mag-forro', cat: 'fold',
    q: 'a Föld belső magja **nagyjából olyan forró, mint a Nap felszíne**, mégis szilárd?',
    why: 'A belső mag hőmérsékletét kb. **5000–5500 °C**-ra becsülik, a Nap látható felszíne kb. 5500 °C-os. Ilyen hőmérsékleten a vas a felszínen rég megolvadna, de a Föld középpontjában a nyomás több mint **3 milliószorosa** a légköri nyomásnak.\n\nEz a hatalmas nyomás a vas- és nikkelatomokat szilárd kristályrácsba kényszeríti. A külső mag ugyanakkor – ahol kisebb a nyomás – **folyékony**. Ezt a földrengéshullámok mutatják: a nyíróhullámok (S-hullámok) nem haladnak át a külső magon.',
    links: ['modell:fold#belso-mag', 'modell:fold#kulso-mag', 'lecke:foldrajz/fold-szerkezete']
  },
  {
    id: 'magneses-polusok-csereje', cat: 'fold',
    q: 'a Föld mágneses pólusai a történelme során **sokszor helyet cseréltek**, legutóbb kb. 780 ezer éve?',
    why: 'A Föld mágneses terét a **folyékony külső magban** áramló, elektromosan vezető olvadt vas hozza létre, mint egy óriási dinamó. Ez az áramlás nem teljesen szabályos, ezért a mágneses tér idővel gyengül, erősödik, és néha **megfordul**.\n\nA fordulások nyomát a megszilárduló lávakőzetek őrzik meg: bennük a vasásványok a kőzet kihűlésekor az akkori mágneses tér irányába álltak be. Az óceánközépi hátságok két oldalán ezért szimmetrikus, csíkos mágneses mintázat látható – ez lett a **lemeztektonika** egyik fő bizonyítéka.',
    links: ['modell:fold#magneses-ter', 'modell:fold#kulso-mag', 'modell:fold#lemezek']
  },
  {
    id: 'lemezek-koromnoves', cat: 'fold',
    q: 'a kőzetlemezek **nagyjából olyan sebességgel mozognak, ahogy a körmöd nő**?',
    why: 'A kőzetlemezek jellemzően **évi 2–10 cm**-t mozdulnak – a körmök évente kb. 3–4 cm-t nőnek. Az Atlanti-óceán például évente kb. 2,5 cm-rel szélesedik, mert az óceánközépi hátságon folyamatosan új kéreg keletkezik.\n\nEz kevésnek tűnik, de 100 millió év alatt már **több ezer km**. A lemezek szélein felgyülemlő feszültség hirtelen kioldódása okozza a földrengéseket, ezért van a legtöbb földrengés és vulkán épp a lemezhatárok mentén.',
    links: ['modell:fold#lemezek', 'modell:fold#litoszfera', 'lecke:foldrajz/fold-szerkezete']
  },
  {
    id: 'legmelyebb-furas', cat: 'fold',
    q: 'az ember által valaha fúrt **legmélyebb lyuk** (kb. 12,3 km) a Föld középpontjáig vezető útnak **csak kb. 0,2%-a**?',
    why: 'A **Kola-félszigeti** szovjet kutatófúrás 1989-ben érte el a **12 262 m**-es mélységet. A Föld sugara kb. **6371 km**, így ez az út kb. 0,19%-a. A fúrás még a **földkérget** sem tudta átfúrni, mert ott a kontinentális kéreg kb. 35–40 km vastag.\n\nA mélyben kb. **180 °C** volt, a kőzet pedig a hő és nyomás miatt szinte képlékenyen viselkedett, ezért nem tudtak tovább haladni. A Föld belsejéről ezért szinte mindent közvetve, a **földrengéshullámok** terjedéséből tudunk.',
    links: ['modell:fold#kereg', 'modell:fold#moho', 'lecke:foldrajz/fold-szerkezete']
  },
  {
    id: 'kopeny-szilard', cat: 'fold',
    q: 'a Föld köpenye **nem izzó lávatenger**, hanem túlnyomórészt **szilárd kőzet** – amely mégis lassan áramlik?',
    why: 'A köpeny kőzete a magas nyomás miatt szilárd marad, pedig nagyon forró. Hosszú idő alatt azonban – mint a gleccserjég vagy a lassan „folyó” szurok – **képlékenyen** deformálódik: évente néhány centiméteres sebességgel áramlik.\n\nEz a lassú **hőáramlás (konvekció)** mozgatja a kőzetlemezeket. Megolvadt kőzet (magma) csak kisebb tartományokban keletkezik, például ahol csökken a nyomás vagy víz kerül a kőzetbe – ebből táplálkoznak a vulkánok.',
    links: ['modell:fold#felso-kopeny', 'modell:fold#also-kopeny', 'modell:fold#litoszfera']
  },
  {
    id: 'magyarorszag-termalviz', cat: 'fold',
    q: 'Magyarország azért ilyen gazdag **termálvízben**, mert itt a földkéreg **vékonyabb** az átlagnál, és lefelé gyorsabban nő a hőmérséklet?',
    why: 'A Pannon-medence alatt a kéreg kb. **25 km körüli** vastagságú – vékonyabb, mint a kontinentális átlag (kb. 35–40 km) –, mert a medence kialakulásakor a kőzetlemez megnyúlt és elvékonyodott. Így a forró köpeny közelebb van a felszínhez.\n\nA hőmérséklet nálunk lefelé átlagosan kb. **4,5–5 °C-kal nő 100 méterenként**, míg a világátlag kb. 3 °C. Ezért már 1–2 km mélyről is 60–100 °C-os víz hozható fel – ezt használják a gyógyfürdők, és egyre több város távfűtése is.',
    links: ['modell:fold#kereg', 'modell:fold#litoszfera', 'lecke:foldrajz/magyarorszag']
  },
  {
    id: 'villam-otszor-forrobb', cat: 'fold',
    q: 'a villámcsatorna **kb. ötször forróbb lehet, mint a Nap felszíne**?',
    why: 'Egy villámban a csatorna levegője a másodperc töredéke alatt kb. **30 000 °C**-ra hevül – a Nap felszíne „csak” kb. 5500 °C-os. A hirtelen felhevült levegő robbanásszerűen kitágul, és ez a lökéshullám a **mennydörgés**.\n\nA mítosszal ellentétben a villám **igenis lecsaphat kétszer ugyanoda**: a magas épületeket, tornyokat, szélturbinákat évente többször is eltalálhatja. Ezért van rajtuk villámhárító, amely biztonságosan vezeti le az áramot a földbe.',
    links: ['lecke:foldrajz/legkor', 'modell:fold#legkor', 'modell:szelturbina#villam']
  },
  {
    id: 'felho-szaz-tonna', cat: 'fold',
    q: 'egy közepes, bárányfelhőnek látszó gomolyfelhőben **több száz tonna víz** lehet?',
    why: 'Egy kb. 1 km³-es gomolyfelhőben köbméterenként kb. **0,5 g** víz van parányi cseppek formájában. 1 km³ = 1 milliárd m³, így ez összesen kb. **500 tonna** – nagyjából 80–100 elefánt tömege.\n\nA felhő mégsem esik le, mert a cseppek rendkívül kicsik (kb. 0,01 mm-esek), ezért a légellenállás miatt nagyon lassan süllyednek, a felszálló meleg levegő pedig fenntartja őket. Eső akkor lesz, amikor a cseppek összeolvadva elég nagyra nőnek.',
    links: ['lecke:foldrajz/legkor', 'modell:fold#legkor', 'lecke:fiz-alap/ero-tomeg']
  },
  {
    id: 'tengerfenek-felterkepezetlen', cat: 'fold',
    q: 'a tengerfenéknek **kevesebb mint egyharmadát** térképezték fel részletesen – a Hold felszínét jobban ismerjük?',
    why: 'A víz elnyeli a rádióhullámokat és a fényt, ezért a tengerfenéket nem lehet műholdról közvetlenül, nagy felbontással lefényképezni, mint a Holdat vagy a Marsot. Hajókról kell **hanghullámokkal (szonárral)** sávonként végigmérni.\n\nA nemzetközi **Seabed 2030** program adatai szerint 2025-ben kb. **27–29%**-át mérték fel korszerű pontossággal (2017-ben még csak kb. 6%-át). A Hold és a Mars felszínéről viszont már szinte teljes, részletes térképeink vannak.',
    links: ['modell:fold#vizburok', 'lecke:foldrajz/vizburok']
  },
  {
    id: 'co2-800-ezer-ev', cat: 'fold',
    q: 'a légkör szén-dioxid-tartalma ma **magasabb, mint bármikor az elmúlt legalább 800 ezer évben**?',
    why: 'Az **antarktiszi jégfuratok** jégbe zárt levegőbuborékai megőrizték az ősi légkör összetételét. Ezek szerint az elmúlt 800 ezer évben a CO₂-szint kb. **180 és 300 ppm** (milliomodrész) között ingadozott a jégkorszakok és a melegebb időszakok váltakozásával.\n\nAz ipari forradalom előtt kb. **280 ppm** volt, ma már **420 ppm fölött** van – főleg a szén, kőolaj és földgáz elégetése miatt. A CO₂ üvegházhatású gáz: visszatartja a Föld által kisugárzott hő egy részét, ezért melegszik a klíma.',
    links: ['modell:fold#legkor', 'lecke:foldrajz/legkor', 'lecke:foldrajz/nepesseg-gazdasag']
  },
  {
    id: 'kek-eg-ibolya', cat: 'fold',
    q: 'a levegő az **ibolyaszínű fényt még a kéknél is jobban szórja**, az ég mégis kéknek látszik?',
    why: 'A levegő molekulái a rövid hullámhosszú fényt sokkal erősebben szórják, mint a hosszút (a szórás a hullámhossz negyedik hatványával fordítottan arányos – **Rayleigh-szórás**). Ezért a kék és az ibolya fény szóródik szét az egész égbolton.\n\nHogy mégis kéket látunk, annak több oka van: a napfényben eleve **kevesebb az ibolya**, egy részét a magaslégkör elnyeli, és a **szemünk** is sokkal kevésbé érzékeny az ibolyára, mint a kékre. A szórt fény keverékét így az agyunk égkéknek érzékeli.',
    links: ['modell:fold#legkor', 'lecke:fizika/hullamok-feny', 'lecke:foldrajz/legkor']
  },

  /* ───────── SZAKMÁK ───────── */
  {
    id: 'villanyszerelo-5-szabaly', cat: 'szakmak',
    q: 'a villanyszerelő **akkor is megméri**, hogy nincs-e feszültség, ha ő maga kapcsolta le a kismegszakítót?',
    why: 'A villamos munkák **öt biztonsági szabálya** sorrendben:\n\n- **leválasztás** (lekapcsolás),\n- **biztosítás visszakapcsolás ellen** (lakat, tábla),\n- **a feszültségmentesség ellenőrzése** mérőműszerrel,\n- földelés és rövidrezárás (főleg nagyobb feszültségű hálózatoknál),\n- a közeli feszültség alatt álló részek **letakarása**.\n\nA mérés azért kötelező, mert a kismegszakítók feliratozása tévedhet, egy áramkört két helyről is táplálhatnak, vagy a nullavezetőn is lehet feszültség hibás bekötés miatt. A **vezetékszínekben sem szabad vakon bízni** – régi lakásokban gyakran nem a szabványos színeket használták.',
    links: ['lecke:villanyszereles/biztonsag', 'lecke:villanyszereles/vezetekek', 'modell:elosztoszekreny#fokapcsolo']
  },
  {
    id: 'vezetek-keresztmetszet', cat: 'szakmak',
    q: 'a lakásban a **konnektorokhoz vastagabb vezeték** kell, mint a lámpákhoz – és a kismegszakítót **a vezetékhez** kell méretezni, nem a készülékhez?',
    why: 'Minél nagyobb áram folyik egy vezetékben, annál jobban melegszik (`P = I² · R`), a vékonyabb vezetéknek pedig nagyobb az ellenállása. Ezért lakásokban jellemzően a világításhoz **1,5 mm²**, a dugaljkörökhöz **2,5 mm²** keresztmetszetű rézvezetéket használnak, nagy fogyasztókhoz (pl. tűzhely, villanyautó-töltő) még vastagabbat.\n\nA **kismegszakító** feladata, hogy lekapcsoljon, mielőtt a vezeték veszélyesen felmelegedne. Ha egy vékony vezetékhez túl nagy kismegszakítót tesznek, a vezeték a falban túlmelegedhet és tüzet okozhat, mielőtt a védelem működne.',
    links: ['lecke:villanyszereles/vezetekek', 'modell:elosztoszekreny#mcb', 'modell:elosztoszekreny#fazis']
  },
  {
    id: 'obd-hibakod', cat: 'szakmak',
    q: 'az autószerelő egy **szabványos csatlakozón** keresztül, egy olvasóval „kikérdezheti” az autót, mi a baja?',
    why: 'Az EU-ban a benzines személyautókban **2001-től**, a dízelekben **2004-től** kötelező az **OBD** (fedélzeti diagnosztika) csatlakozó, amely általában a kormány alatt található. A motorvezérlő folyamatosan figyeli az érzékelőket, és ha valami eltér, **hibakódot** tárol.\n\nPéldául a `P0300` véletlenszerű égéskimaradást, a `P0301` az 1. henger gyújtáskimaradását jelenti – ennek oka gyakran egy rossz gyújtógyertya vagy gyújtótekercs. A kód azonban csak **tünetet** mutat: a jó szerelő ebből kiindulva méréssel keresi meg a valódi okot.',
    links: ['lecke:autoszereles/diagnosztika', 'modell:benzinmotor#plugs']
  },
  {
    id: 'hegesztoszem', cat: 'szakmak',
    q: 'a hegesztőív **néhány másodperces védelem nélküli nézése** is fájdalmas szemsérülést okozhat, ami **csak órákkal később** jelentkezik?',
    why: 'Az elektromos ív rengeteg **ultraibolya** sugárzást bocsát ki, amely – a napégéshez hasonlóan – megégeti a szaruhártyát. Ez a **„hegesztőszem”** (villanásvakság): jellemzően **néhány órával** később jelentkezik erős fájdalommal, könnyezéssel, homokszemcse-érzéssel.\n\nEzért kötelező a megfelelő fokozatú szűrővel ellátott **hegesztőpajzs**, és ezért kell a műhelyben paravánnal védeni a közelben dolgozókat is. Az UV a bőrt is megégeti, ezért hegesztéskor zárt, nem gyúlékony ruházat kell.',
    links: ['lecke:hegesztes/munkavedelem', 'lecke:hegesztes/eljarasok']
  },
  {
    id: 'fa-mozog-keresztben', cat: 'szakmak',
    q: 'a fa a páratartalom változásával **keresztirányban akár ötvenszer is jobban** zsugorodik-dagad, mint hosszában?',
    why: 'A fa sejtfalai vizet vesznek fel és adnak le, miközben a rostok **szélessége** változik, a hosszuk alig. Hosszirányban a zsugorodás csak kb. **0,1–0,3%**, a rostokra merőlegesen viszont (az évgyűrűk mentén) **5–10%** is lehet.\n\nEzért a jó asztalos sosem rögzíti mereven egy tömörfa asztallap teljes szélességét: hagy neki helyet „mozogni”, különben a lap megreped vagy megvetemedik. A rétegelt lemez azért stabilabb, mert a rétegek rostiránya egymásra merőleges.',
    links: ['lecke:asztalos/fa-anyag', 'lecke:asztalos/faanyagok', 'lecke:asztalos/kotesek']
  },
  {
    id: 'buzelzaro-szifon', cat: 'szakmak',
    q: 'a mosdó alatti kanyargós cső, a **szifon** azért kell, mert a benne álló víz **dugóként zárja el a csatornaszagot**?',
    why: 'A csatornából kellemetlen szagú, sőt egészségre ártalmas gázok jöhetnének fel a lakásba. A szifon (**bűzelzáró**) U alakú hajlatában mindig marad néhány centiméternyi víz, amely elzárja a gázok útját, a lefolyó vizet viszont átengedi.\n\nHa egy ritkán használt lefolyóban (pl. a pince padlóösszefolyójában) a víz elpárolog, megjelenik a csatornaszag – ilyenkor elég vizet önteni bele. A csatornahálózat **szellőzése** pedig azért fontos, hogy a lezúduló víz ne szívja ki a szifonokból a vizet.',
    links: ['lecke:vizszereles/szennyviz', 'lecke:fiz-alap/nyomas']
  },
  {
    id: 'hus-nem-zarja-be-a-levet', cat: 'szakmak',
    q: 'a hús erős lángon való átsütése **nem „zárja be” a szaftot** – a pirítás valójában az ízért fontos?',
    why: 'A régi konyhai hiedelem szerint a hirtelen sütés kérget képez, amely bent tartja a húslevet. Mérések szerint azonban az átsütött hús **ugyanannyi vagy több** levet veszít, mint a nem átsütött – a hússzálak a melegítéstől összehúzódnak és kipréselik a vizet, kéreg ide vagy oda.\n\nA pirításnak mégis nagy értelme van: kb. 140 °C felett a fehérjék és cukrok között lejátszódik a **Maillard-reakció**, amely több száz ízes és illatos vegyületet, valamint barna színt hoz létre. A szaftosságot inkább a **maghőmérséklet** helyes megválasztása és a sütés utáni pihentetés segíti.',
    links: ['lecke:szakacs/technologia', 'lecke:kem-alap/mindennapok']
  },
  {
    id: 'veszelyzona-bakteriumok', cat: 'szakmak',
    q: 'kedvező hőmérsékleten egyes baktériumok **kb. 20 percenként megduplázódnak**, ezért a meleg étel nem állhat sokáig szobahőmérsékleten?',
    why: 'A legtöbb ételmérgező baktérium a **kb. 5 és 60 °C** közötti „veszélyzónában” szaporodik. Ha egy baktérium 20 percenként osztódik, 7 óra alatt (21 osztódás) **egyből kb. 2 millió** lesz.\n\nEzért a vendéglátásban szigorú szabályok vannak: a hideg ételt **5 °C alatt**, a melegen tartott ételt **63 °C felett** kell tartani, a főtt ételt pedig gyorsan kell lehűteni. A HACCP rendszer ezeknek a kritikus pontoknak a folyamatos ellenőrzésére épül.',
    links: ['lecke:szakacs/homerseklet', 'lecke:szakacs/higienia', 'lecke:biologia/sejtosztodas']
  },
  {
    id: 'beton-nem-szarad', cat: 'szakmak',
    q: 'a beton **nem kiszárad**, hanem kémiai reakcióval szilárdul meg – akár **víz alatt** is?',
    why: 'A cement a vízzel **hidratáció** nevű kémiai reakcióba lép: kristályos, egymásba fonódó vegyületek (főleg kalcium-szilikát-hidrátok) keletkeznek, amelyek összeragasztják a homokot és a kavicsot. Ehhez **víz kell**, nem száradás.\n\nEzért a friss betont a kivitelezők az első napokban **nedvesen tartják** (locsolják, fóliával takarják): ha túl hamar kiszárad, a reakció leáll, és a beton gyengébb, repedezettebb lesz. A beton a teljes szabványos szilárdságát jellemzően kb. **28 nap** alatt éri el.',
    links: ['lecke:epitoipar/beton', 'lecke:kem-alap/kemiai-valtozasok']
  }
]);
