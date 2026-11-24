/* Tantárgy: Természettudomány (5–6. osztály) */
STUDIE.addSubject({
  id: 'termeszet',
  stage: 'altalanos',
  title: 'Természettudomány (5–6. osztály)',
  icon: '🌱',
  color: '#2f9e6a',
  description: 'Anyagok, élőlények, növények, állatok, az emberi test és a Föld helye a Naprendszerben.',
  intro: 'A természettudomány arról szól, hogyan **figyeljük meg** és **értjük meg** a körülöttünk lévő világot. Ebben a tantárgyban megnézzük, miből állnak az anyagok, mitől élő egy élőlény, hogyan táplálkozik a növény, hogyan rendszerezzük az állatokat, hogyan működik a testünk, és miért van nappal, éjszaka és évszakváltás. Közben kísérletezz, figyelj és kérdezz: ez a tudós gondolkodás alapja!',
  lessons: [
    {
      id: 'anyagok',
      title: 'Anyagok és halmazállapotok',
      level: 1, minutes: 12,
      summary: 'Szilárd, folyékony, légnemű: hogyan alakulnak át egymásba az anyagok, és hogyan választjuk szét a keverékeket.',
      tags: ['halmazállapot', 'olvadás', 'fagyás', 'forrás', 'párolgás', 'lecsapódás', 'keverék', 'oldat', 'szűrés', 'bepárlás', 'desztilláció', 'részecske'],
      models: ['atom'],
      sections: [
        {
          title: 'A három halmazállapot',
          text: 'Minden anyag apró **részecskékből** (atomokból, molekulákból) áll. Hogy egy anyag milyen halmazállapotú, azt a részecskék elrendeződése és mozgása határozza meg:\n\n- **Szilárd** (pl. jég, vas, kő): a részecskék szorosan, rendezetten helyezkednek el, csak a helyükön rezegnek. Saját alakja és térfogata van.\n- **Folyékony** (pl. víz, olaj): a részecskék közel vannak, de elgördülnek egymáson. Térfogata állandó, de felveszi az edény alakját.\n- **Légnemű** (gáz, pl. vízgőz, levegő): a részecskék távol vannak egymástól és szabadon száguldoznak. Kitölti a rendelkezésre álló teret, könnyen összenyomható.\n\nHogy mi van egy részecske belsejében, azt az [[atom|atom felfedezőjében]] nézheted meg.',
          tip: 'Melegítéskor a részecskék gyorsabban mozognak. Ezért tágulnak az anyagok, ha melegszenek.'
        },
        {
          title: 'Halmazállapot-változások',
          text: 'Ha egy anyagot melegítünk vagy hűtünk, halmazállapota megváltozhat:\n\n- **Olvadás**: szilárd → folyékony (a jég 0 °C-on olvad). Ellentéte a **fagyás**.\n- **Párolgás**: folyékony → légnemű, a folyadék **felszínén**, bármilyen hőmérsékleten (a kiteregetett ruha is megszárad).\n- **Forrás**: folyékony → légnemű a folyadék **belsejében** is, buborékokkal, egy adott hőmérsékleten (a víz normál légnyomáson 100 °C-on forr).\n- **Lecsapódás**: légnemű → folyékony (a hideg pohár fala „bepárásodik”).\n- **Szublimáció**: szilárd → légnemű közvetlenül (pl. a szárazjég vagy a fagyos napon száradó ruha).\n\nFontos: olvadás és forrás közben a hőmérséklet **nem változik**, amíg az átalakulás tart. A jeges víz addig 0 °C-os marad, amíg el nem olvad benne az összes jég.',
          warn: 'Forró vízzel, gőzzel és tűzzel csak felnőtt jelenlétében kísérletezz! A gőz égési sérülése súlyosabb, mint a forró vízé.'
        },
        {
          title: 'Keverékek és szétválasztásuk',
          text: 'A **keverék** több anyagból áll, amelyek megtartják saját tulajdonságaikat. Az **oldat** olyan keverék, amelyben az egyik anyag (pl. só, cukor) egyenletesen eloszlik a másikban (pl. vízben), és szabad szemmel nem látszik.\n\nA keverékeket az alkotórészek eltérő tulajdonságai alapján választjuk szét:\n\n- **Ülepítés és dekantálás**: a nehezebb szilárd anyag leülepszik, a folyadékot óvatosan leöntjük (homokos víz).\n- **Szűrés**: a szűrőpapír átengedi a folyadékot, de visszatartja a szilárd szemcséket (kávéfőzés).\n- **Bepárlás**: az oldószert elpárologtatjuk, az oldott anyag visszamarad (sólepárlás tengervízből).\n- **Desztilláció (lepárlás)**: a folyadékot forraljuk, a gőzt lehűtve újra folyadékká alakítjuk. Így választhatók szét a különböző forráspontú folyadékok.\n- **Mágneses szétválasztás**: a vasreszelék kihúzható mágnessel a homokból.\n\nPélda: a sós homokos vízből először **szűréssel** eltávolítjuk a homokot, majd **bepárlással** visszanyerjük a sót.'
        },
        {
          title: 'Gyakorlás: mértékegységek',
          text: 'A kísérleteknél mérünk: tömeget (g, kg), térfogatot (ml, l, cm³) és időt. Gyakorold az átváltásokat! Jó tudni: **1 l = 1 dm³ = 1000 cm³ = 1000 ml**.',
          widget: { type: 'gyakorlas', options: { kind: 'mertekegyseg', title: 'Mértékegység-átváltás' } }
        }
      ],
      quiz: [
        { q: 'Mi a különbség a párolgás és a forrás között?', options: ['A párolgás csak a felszínen, bármilyen hőmérsékleten történik, a forrás a folyadék belsejében is, adott hőmérsékleten', 'Semmi, a kettő ugyanaz', 'A párolgás csak 100 °C-on történik', 'A forrás szilárd anyagból gázt csinál'], answer: 0, explain: 'A ruha szobahőmérsékleten is megszárad (párolgás), a víz viszont csak 100 °C-on forr, buborékokkal.' },
        { q: 'Hogyan nyernéd vissza a sót a sós vízből?', options: ['Szűréssel', 'Mágnessel', 'Bepárlással', 'Ülepítéssel'], answer: 2, explain: 'A só oldott állapotban átmegy a szűrőn. Ha a vizet elpárologtatjuk, a só visszamarad.' },
        { q: 'Mi történik a jeges víz hőmérsékletével, amíg a jég olvad?', options: ['Folyamatosan nő', '0 °C-on marad', 'Csökken', 'Hirtelen 100 °C lesz'], answer: 1, explain: 'Olvadás közben a felvett hő az átalakulásra fordítódik, a hőmérséklet nem változik.' },
        { q: 'Melyik halmazállapotú anyag tölti ki a teljes rendelkezésre álló teret?', options: ['A szilárd', 'A folyékony', 'Mindegyik', 'A légnemű'], answer: 3, explain: 'A gázok részecskéi szabadon mozognak, ezért kitöltik az egész edényt.' }
      ]
    },
    {
      id: 'eloleny-sejt',
      title: 'Az élőlények és a sejt',
      level: 1, minutes: 12,
      summary: 'Mitől élő az élőlény? Az életjelenségek, és a sejt, minden élőlény építőköve.',
      tags: ['élőlény', 'életjelenség', 'anyagcsere', 'sejt', 'sejtmag', 'sejthártya', 'sejtfal', 'zöld színtest', 'mikroszkóp', 'egysejtű'],
      models: ['sejt'],
      sections: [
        {
          title: 'Az életjelenségek',
          text: 'Egy kavics és egy csiga között az a különbség, hogy a csiga **él**. Az élőlényeket az **életjelenségek** jellemzik:\n\n- **Anyagcsere**: anyagokat vesz fel a környezetéből (táplálék, víz, oxigén), átalakítja, és a fölösleget leadja.\n- **Növekedés és fejlődés**: mérete nő, és közben megváltozik (a béka ebihalból fejlődik).\n- **Szaporodás**: utódokat hoz létre.\n- **Mozgás**: helyét vagy testrészeit változtatja (a napraforgó is a fény felé fordul).\n- **Ingerlékenység**: érzékeli a környezet változásait, és válaszol rájuk.\n- **Alkalmazkodás**: a környezethez illeszkedő tulajdonságai vannak.\n\nEgy dolog akkor élőlény, ha **mindegyik** életjelenség jellemző rá. A tűz is „nő” és „fogyaszt”, mégsem élőlény, mert nem sejtekből áll és nem szaporodik.'
        },
        {
          title: 'A sejt, az élet alapegysége',
          text: 'Minden élőlény **sejtekből** áll. Vannak **egysejtűek** (pl. papucsállatka, baktériumok), és vannak **többsejtűek**, mint a növények, az állatok és mi magunk (az emberi test több tízezer milliárd sejtből áll).\n\nA legtöbb sejt csak **mikroszkóppal** látható. Minden sejtnek vannak közös részei:\n\n- **Sejthártya**: vékony határoló réteg, szabályozza, mi jut be és ki.\n- **Sejtplazma** (citoplazma): kocsonyás belső anyag, itt zajlik az anyagcsere nagy része.\n- **Sejtmag**: az örökítőanyagot tárolja, irányítja a sejt működését (a baktériumoknak nincs valódi sejtmagjuk).\n\nNézd meg a részeket a [[sejt|sejtmodellben]]!',
          tip: 'A sejtet egy kis gyárhoz hasonlíthatod: a sejthártya a kapu, a sejtmag az igazgatóság, a sejtplazma a gyárcsarnok.'
        },
        {
          title: 'Növényi és állati sejt',
          text: 'A növényi sejtnek az állati sejthez képest többlet részei is vannak:\n\n1. **Sejtfal**: a sejthártyán kívüli szilárd, merev burok (cellulózból). Ettől szilárd a növény.\n2. **Zöld színtestek**: ezekben zajlik a fotoszintézis, ezek adják a levél zöld színét.\n3. **Nagy sejtnedvűr** (zárvány): vízzel és oldott anyagokkal telt hólyag, feszesen tartja a sejtet.\n\nAz állati sejt alakja ezért változatosabb, a növényi sejt gyakran szögletes, „téglaszerű”. A hagymahártya sejtjei iskolai mikroszkóppal is jól láthatók.'
        }
      ],
      quiz: [
        { q: 'Melyik NEM életjelenség?', options: ['Anyagcsere', 'Szaporodás', 'Ingerlékenység', 'Olvadás'], answer: 3, explain: 'Az olvadás halmazállapot-változás, élettelen anyagokkal is megtörténik.' },
        { q: 'Melyik sejtalkotó van meg a növényi sejtben, de hiányzik az állati sejtből?', options: ['Sejthártya', 'Sejtfal', 'Sejtmag', 'Sejtplazma'], answer: 1, explain: 'A merev sejtfal csak a növényi (és a gomba-, baktérium-) sejteket veszi körül.' },
        { q: 'Mi a sejtmag feladata?', options: ['Az örökítőanyag tárolása és a sejt irányítása', 'A fotoszintézis', 'A sejt merevítése', 'Az oxigén szállítása'], answer: 0, explain: 'A sejtmagban van az örökítőanyag (DNS), amely a sejt működését irányítja.' }
      ]
    },
    {
      id: 'novenyek',
      title: 'A növények élete',
      level: 1, minutes: 12,
      summary: 'A növény részei és feladatuk, a fotoszintézis és a légzés alapjai.',
      tags: ['növény', 'gyökér', 'szár', 'levél', 'virág', 'termés', 'mag', 'fotoszintézis', 'klorofill', 'oxigén', 'szén-dioxid', 'beporzás'],
      models: ['sejt'],
      sections: [
        {
          title: 'A virágos növény részei',
          text: 'A virágos növény testét **szervek** alkotják. Mindegyiknek megvan a maga feladata:\n\n- **Gyökér**: rögzíti a növényt a talajban, felszívja a vizet és az oldott ásványi anyagokat. Néha tápanyagot is raktároz (sárgarépa, cékla).\n- **Szár**: tartja a leveleket és a virágot, és **szállít**: a víz a gyökértől felfelé, a cukrok a levelektől minden irányba haladnak benne.\n- **Levél**: itt készül a növény tápláléka (fotoszintézis), és itt párologtatja el a vizet a **gázcserenyílásokon**.\n- **Virág**: a szaporodás szerve. Benne van a **porzó** (virágport termel) és a **termő** (benne fejlődik a mag).\n- **Termés és mag**: a termés védi és terjeszti a magot, a magból új növény fejlődik.'
        },
        {
          title: 'A fotoszintézis',
          text: 'A növények **maguk állítják elő** táplálékukat. A levél zöld színtestjeiben lévő **klorofill** (zöld színanyag) elnyeli a napfényt, és energiáját felhasználva a növény:\n\n`szén-dioxid + víz → (fény, klorofill) → szőlőcukor + oxigén`\n\n- A **szén-dioxidot** a levegőből veszi fel a gázcserenyílásokon át.\n- A **vizet** a gyökér szívja fel.\n- A **szőlőcukor** a növény tápláléka és építőanyaga (keményítőként raktározza is).\n- Az **oxigén** melléktermék: kiengedi a levegőbe. Ezt lélegezzük be mi is!\n\nA zöld színtesteket a [[sejt|sejtmodellben]] is megtalálod.',
          tip: 'Kísérlet: egy vízinövény (pl. átokhínár) napfényben apró buborékokat ereget. Ezek oxigénbuborékok, sötétben szinte megszűnnek.'
        },
        {
          title: 'A növény is lélegzik',
          text: 'A növények is **légzést** végeznek éjjel-nappal: oxigént vesznek fel, és a cukor lebontásával energiát nyernek, közben szén-dioxidot adnak le. Nappal azonban a fotoszintézis sokkal több oxigént termel, mint amennyit a légzés elhasznál.\n\nAz erdők és az óceánok apró algái ezért a Föld „tüdejei”: oxigént termelnek, és megkötik a szén-dioxidot.'
        }
      ],
      quiz: [
        { q: 'Mi keletkezik a fotoszintézis során?', options: ['Szén-dioxid és víz', 'Szőlőcukor és oxigén', 'Csak víz', 'Ásványi sók'], answer: 1, explain: 'A növény szén-dioxidból és vízből fényenergia segítségével szőlőcukrot és oxigént állít elő.' },
        { q: 'Melyik növényi szerv szívja fel a vizet a talajból?', options: ['A levél', 'A virág', 'A gyökér', 'A termés'], answer: 2, explain: 'A gyökér szívja fel a vizet és az oldott ásványi anyagokat.' },
        { q: 'Mi nyeli el a napfényt a fotoszintézishez?', options: ['A sejtfal', 'A klorofill a zöld színtestekben', 'A gyökérszőr', 'A virágpor'], answer: 1, explain: 'A zöld színanyag, a klorofill köti meg a fény energiáját.' },
        { q: 'Mikor lélegzik a növény?', options: ['Éjjel-nappal', 'Csak éjjel', 'Csak nappal', 'Soha, a növény nem lélegzik'], answer: 0, explain: 'A légzés folyamatos. Nappal ezt elfedi a fotoszintézis, amely több oxigént termel.' }
      ]
    },
    {
      id: 'allatok',
      title: 'Az állatok csoportosítása',
      level: 2, minutes: 12,
      summary: 'Gerinctelenek és gerincesek: hogyan rendszerezzük az állatvilágot, és miről ismerjük fel a csoportokat.',
      tags: ['állatok', 'rendszerezés', 'gerinces', 'gerinctelen', 'hal', 'kétéltű', 'hüllő', 'madár', 'emlős', 'rovar', 'ízeltlábú', 'puhatestű', 'tápláléklánc'],
      sections: [
        {
          title: 'Miért rendszerezünk?',
          text: 'A Földön több mint egymillió állatfajt írtak már le. Hogy eligazodjunk köztük, a hasonló testfelépítésű, rokon fajokat **csoportokba** soroljuk. A legelső nagy kérdés: van-e az állatnak **gerincoszlopa** (belső csontváza)?\n\n- **Gerinctelenek**: nincs gerincük. Az állatfajok túlnyomó többsége (kb. 95%-a) ilyen!\n- **Gerincesek**: belső csontvázuk és gerincoszlopuk van.'
        },
        {
          title: 'A gerinctelenek',
          text: 'Néhány fontos gerinctelen csoport:\n\n- **Csalánozók**: medúzák, korallok, hidra. Csalánsejtekkel bénítják zsákmányukat.\n- **Férgek**: pl. a földigiliszta, amely lazítja és termékenyíti a talajt.\n- **Puhatestűek**: csigák, kagylók, polipok. Testük puha, sokuknak meszes héja van.\n- **Ízeltlábúak**: a legnagyobb csoport. Kitinből álló külső vázuk és ízelt lábaik vannak.\n- **Rovarok**: 6 láb, a test három részből áll (fej, tor, potroh), gyakran szárnyuk is van (méh, katicabogár, lepke).\n- **Pókszabásúak**: 8 láb (pókok, kullancsok, skorpiók).\n- **Rákok**: két pár csáp, sokuk vízben él (folyami rák, ászka).',
          tip: 'Gyors ellenőrzés: számold meg a lábakat! A pók nem rovar, mert 8 lába van.'
        },
        {
          title: 'A gerincesek öt osztálya',
          text: '1. **Halak**: vízben élnek, kopoltyúval lélegeznek, testüket pikkely fedi, úszóikkal mozognak (ponty, csuka).\n2. **Kétéltűek**: lárvájuk vízben él és kopoltyúval lélegzik (ebihal), a kifejlett állat tüdővel és bőrén át lélegzik. Bőrük csupasz, nyálkás (béka, gőte).\n3. **Hüllők**: szárazföldre alkalmazkodtak, szaruképletek (pikkelyek) borítják testüket, tüdővel lélegeznek, tojásaikat a szárazföldön rakják le (gyík, kígyó, teknős).\n4. **Madarak**: testüket toll fedi, mellső végtagjuk szárny, csőrük van, meszes héjú tojást költenek ki (veréb, gólya).\n5. **Emlősök**: szőrzetük van, utódaikat általában elevenen szülik, és **tejjel táplálják** (kutya, delfin, ember).\n\nA halak, kétéltűek és hüllők **változó testhőmérsékletűek**: testük felveszi a környezet hőmérsékletét, ezért hidegben lelassulnak. A madarak és emlősök **állandó testhőmérsékletűek**.'
        },
        {
          title: 'Ki kit eszik? A táplálékláncok',
          text: 'Az állatokat táplálkozásuk szerint is csoportosíthatjuk: **növényevők** (őz, nyúl), **ragadozók** (róka, sas) és **mindenevők** (vaddisznó, ember).\n\nEgy egyszerű tápláléklánc: `fű → nyúl → róka`. Az első tag mindig a **termelő** (zöld növény), hiszen csak ő tudja a napfény energiáját megkötni. A láncok összefonódva **táplálékhálózatot** alkotnak.'
        }
      ],
      quiz: [
        { q: 'Melyik állat gerinctelen?', options: ['Béka', 'Csiga', 'Veréb', 'Ponty'], answer: 1, explain: 'A csiga puhatestű, nincs gerincoszlopa. A másik három gerinces.' },
        { q: 'Hány lába van egy rovarnak?', options: ['8', '4', '6', '10'], answer: 2, explain: 'A rovarok 6 lábúak. A 8 láb a pókszabásúakra jellemző.' },
        { q: 'Melyik gerinces osztály tagjai táplálják tejjel az utódaikat?', options: ['Emlősök', 'Madarak', 'Hüllők', 'Kétéltűek'], answer: 0, explain: 'Nevük is innen ered: az emlő (tejmirigy) teje táplálja a kölyköket.' },
        { q: 'Melyik állat lárvája lélegzik kopoltyúval, a kifejlett állat pedig tüdővel?', options: ['Gyík', 'Béka', 'Delfin', 'Ponty'], answer: 1, explain: 'A béka kétéltű: az ebihal vízben, kopoltyúval él, a kifejlett béka tüdővel és bőrén át lélegzik.' }
      ]
    },
    {
      id: 'emberi-test',
      title: 'Az emberi test és az egészség',
      level: 2, minutes: 14,
      summary: 'Szervrendszereink működése dióhéjban: mozgás, keringés, légzés, emésztés, és mit tehetsz az egészségedért.',
      tags: ['emberi test', 'szervrendszer', 'csontváz', 'izom', 'szív', 'vérkeringés', 'pulzus', 'tüdő', 'légzés', 'emésztés', 'egészség', 'táplálkozás', 'alvás'],
      models: ['sziv'],
      sections: [
        {
          title: 'Sejttől a szervezetig',
          text: 'A testünk felépítése lépcsőzetes:\n\n`sejt → szövet → szerv → szervrendszer → szervezet`\n\nAz azonos feladatú sejtek **szövetet** alkotnak (pl. izomszövet), a szövetekből **szervek** épülnek (pl. a szív), az együttműködő szervek pedig **szervrendszert** alkotnak (pl. a keringési rendszer).\n\nFontos szervrendszereink: a **mozgásszervrendszer** (csontok, izmok), a **keringési**, a **légzési**, az **emésztési**, a **kiválasztó** (vese) és az **idegrendszer**, amely mindezt összehangolja.'
        },
        {
          title: 'Mozgás, keringés, légzés',
          text: '- **Csontváz és izmok**: egy felnőtt csontváza kb. 206 csontból áll. A csontokat ízületek kapcsolják össze, az izmok pedig **összehúzódással** mozgatják őket.\n- **Szív és vérkeringés**: a szív ökölnyi izmos szerv, négy üreggel. Pumpálja a vért, amely oxigént és tápanyagot szállít minden sejthez. Egy felnőtt nyugalmi pulzusa általában percenként 60–100. A szív felépítését a [[sziv|szívmodellben]] szedheted szét.\n- **Légzés**: belégzéskor a levegő az orron, gégén, légcsövön át a **tüdőbe** jut. A tüdő apró léghólyagocskáiban az oxigén a vérbe kerül, a szén-dioxid pedig a vérből a kilélegzett levegőbe.',
          tip: 'Mérd meg a pulzusodat a csuklódon 15 másodpercig, és szorozd meg 4-gyel! Futás után ismételd meg, és hasonlítsd össze.'
        },
        {
          title: 'Emésztés és táplálkozás',
          text: 'A táplálék útja: **szájüreg** (rágás, nyál) → **nyelőcső** → **gyomor** (gyomorsav) → **vékonybél** (itt szívódnak fel a tápanyagok a vérbe) → **vastagbél** (víz visszaszívása) → végbél.\n\nA kiegyensúlyozott étrendben megvan minden fontos tápanyag:\n\n- **Szénhidrátok** (kenyér, rizs, gyümölcs): gyors energia.\n- **Fehérjék** (hús, tojás, tej, hüvelyesek): építőanyag.\n- **Zsírok** (olaj, magvak): energiaraktár.\n- **Vitaminok és ásványi anyagok** (zöldség, gyümölcs): a szervezet zavartalan működéséhez.\n- **Víz**: naponta kb. 1,5–2 liter folyadék szükséges.'
        },
        {
          title: 'Mit tehetsz az egészségedért?',
          text: '- **Mozogj** naponta legalább egy órát (játék, sport, séta is számít).\n- **Aludj eleget**: a te korodban kb. 9–11 órát. Alvás közben nősz és rendeződnek az emlékeid.\n- **Igyál vizet** cukros üdítők helyett.\n- **Mosd meg a kezed** étkezés előtt és mosdóhasználat után: így sok betegség terjedését megakadályozod.\n- Figyelj a **lelki egészségedre** is: beszélgess, pihenj, és kérj segítséget, ha valami nyomaszt.',
          warn: 'A dohányzás, az alkohol és a drogok károsítják a fejlődő szervezetet, és függőséget okoznak.'
        }
      ],
      quiz: [
        { q: 'Mi a helyes sorrend az egyszerűtől az összetett felé?', options: ['Szerv → sejt → szövet → szervrendszer', 'Sejt → szövet → szerv → szervrendszer', 'Szövet → sejt → szervrendszer → szerv', 'Sejt → szerv → szövet → szervrendszer'], answer: 1, explain: 'A sejtek szövetet, a szövetek szervet, a szervek szervrendszert alkotnak.' },
        { q: 'Hol szívódik fel a tápanyagok nagy része a vérbe?', options: ['A gyomorban', 'A nyelőcsőben', 'A vékonybélben', 'A szájüregben'], answer: 2, explain: 'A vékonybél hosszú, redőzött belső felszínén jutnak a tápanyagok a vérbe.' },
        { q: 'Hány ürege van az emberi szívnek?', options: ['Kettő', 'Három', 'Négy', 'Egy'], answer: 2, explain: 'Két pitvar és két kamra: a jobb oldal a tüdőbe, a bal a test többi részébe pumpálja a vért.' },
        { q: 'Mi történik a tüdőben?', options: ['Az oxigén a vérbe, a szén-dioxid a levegőbe jut', 'A táplálék emésztése', 'A vér megtisztítása a salakanyagoktól', 'Az izmok mozgatása'], answer: 0, explain: 'A léghólyagocskákban zajlik a gázcsere.' }
      ]
    },
    {
      id: 'fold-naprendszer',
      title: 'A Föld és a Naprendszer',
      level: 2, minutes: 14,
      summary: 'Forgás és keringés, napszakok és évszakok, a Hold fázisai és a Naprendszer bolygói.',
      tags: ['Föld', 'Nap', 'Naprendszer', 'bolygó', 'forgás', 'keringés', 'évszakok', 'tengelyferdeség', 'Hold', 'holdfázis', 'fogyatkozás', 'csillag'],
      sections: [
        {
          title: 'A Naprendszer',
          text: 'A **Nap** egy csillag: hatalmas, izzó gázgömb, amely saját fényt és hőt bocsát ki. Körülötte keringenek a **bolygók**, amelyek csak visszaverik a Nap fényét. A Naptól távolodva a nyolc bolygó:\n\n1. **Merkúr** – a legkisebb és a Naphoz legközelebbi\n2. **Vénusz** – a legforróbb, sűrű légköre miatt\n3. **Föld** – az egyetlen ismert bolygó, ahol élet van\n4. **Mars** – a „vörös bolygó”\n5. **Jupiter** – a legnagyobb, óriás gázbolygó\n6. **Szaturnusz** – feltűnő gyűrűrendszerrel\n7. **Uránusz**\n8. **Neptunusz** – a legtávolabbi\n\nAz első négy **kőzetbolygó**, a külső négy **óriásbolygó**. A Nap fénye kb. 8 és fél perc alatt ér el a Földre.',
          tip: 'Egy segítség a sorrendhez: „**M**ost **V**alaki **F**öldön **M**arad, **J**ön **Sz**ánkón **U**tazni **N**ekünk.”'
        },
        {
          title: 'Forgás: nappal és éjszaka',
          text: 'A Föld **saját tengelye körül forog**, nyugatról keletre, egy fordulat kb. **24 óra** (egy nap). Mindig csak a Nap felé eső félteke van megvilágítva: ott **nappal** van, a másik oldalon **éjszaka**.\n\nMivel a Föld nyugatról keletre forog, a Nap látszólag **keleten kel** és **nyugaton nyugszik**. Valójában nem a Nap mozog az égen, hanem mi fordulunk el alatta.'
        },
        {
          title: 'Keringés: az évszakok',
          text: 'A Föld kb. **365 és negyed nap** alatt kerüli meg a Napot: ez egy év. A negyed napok miatt négyévente **szökőév** van, február 29-ével.\n\nAz évszakokat **nem** a Naptól mért távolság okozza (a Föld épp januárban van a legközelebb a Naphoz!), hanem az, hogy a Föld tengelye kb. **23,5°-kal ferde**, és ez a ferdeség keringés közben megmarad:\n\n- Amikor az **északi félteke** hajlik a Nap felé, nálunk a napsugarak meredekebben érkeznek, hosszabbak a nappalok: **nyár** van.\n- Fél évvel később az északi félteke hajlik el a Naptól: a sugarak laposabban érkeznek, rövidek a nappalok: **tél** van.\n- Ugyanekkor a déli féltekén éppen fordítva: amikor nálunk tél van, Ausztráliában nyár.\n\nNevezetes napok: tavaszi napéjegyenlőség (március 20–21.), nyári napforduló (június 21. körül, a leghosszabb nappal), őszi napéjegyenlőség (szeptember 22–23.), téli napforduló (december 21–22., a legrövidebb nappal).'
        },
        {
          title: 'A Hold és fázisai',
          text: 'A **Hold** a Föld egyetlen természetes kísérője. Nincs saját fénye, a Nap fényét veri vissza. Kb. **29,5 nap** alatt megy végig az összes fázison:\n\n1. **Újhold**: a Hold a Föld és a Nap között van, megvilágított oldala felénk nem látszik.\n2. **Növő sarló**, majd **első negyed** (jobb oldala világos).\n3. **Telihold**: a Föld a Nap és a Hold között van, a teljes megvilágított oldalt látjuk.\n4. **Utolsó negyed** (bal oldala világos), majd **fogyó sarló**.\n\nA Hold mindig ugyanazt az oldalát mutatja felénk, mert ugyanannyi idő alatt fordul meg a tengelye körül, mint amennyi alatt megkerüli a Földet.\n\n**Napfogyatkozás** újholdkor lehet (a Hold eltakarja a Napot), **holdfogyatkozás** teleholdkor (a Hold a Föld árnyékába kerül).',
          warn: 'Soha ne nézz közvetlenül a Napba, napfogyatkozáskor sem! Csak tanúsított napszemüveggel vagy kivetítéssel figyeld meg.'
        }
      ],
      quiz: [
        { q: 'Mi okozza az évszakok váltakozását?', options: ['A Föld és a Nap távolságának változása', 'A Föld tengelyének ferdesége', 'A Hold fázisai', 'A Föld forgása'], answer: 1, explain: 'A ferde tengely miatt változik a napsugarak beesési szöge és a nappalok hossza. A távolság hatása elhanyagolható.' },
        { q: 'Melyik a Naprendszer legnagyobb bolygója?', options: ['Szaturnusz', 'Föld', 'Neptunusz', 'Jupiter'], answer: 3, explain: 'A Jupiter a legnagyobb, tömege több mint kétszerese az összes többi bolygóénak együttvéve.' },
        { q: 'Milyen holdfázisnál lehet napfogyatkozás?', options: ['Újholdkor', 'Teleholdkor', 'Első negyedkor', 'Bármikor'], answer: 0, explain: 'Napfogyatkozáskor a Hold a Nap és a Föld közé kerül, ez újholdkor lehetséges.' },
        { q: 'Mennyi idő alatt fordul meg a Föld a tengelye körül?', options: ['Kb. 365 nap', 'Kb. 29,5 nap', 'Kb. 24 óra', 'Kb. 1 óra'], answer: 2, explain: 'A tengely körüli forgás adja a napot (kb. 24 óra), a Nap körüli keringés az évet.' }
      ]
    }
  ]
});
