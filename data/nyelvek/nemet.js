/* Német nyelvtanfolyam (A1–A2) – a js/nyelvek.js motor adatai. */
STUDIE.addLangCourse({
  id: 'nemet', title: 'Német', flag: '🇩🇪', tts: 'de-DE', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'A német az Európai Unió legtöbb ember által beszélt anyanyelve – és a magyarban is rengeteg német eredetű szó van: sógor (Schwager), kifli (Kipferl), cetli (Zettel), spájz (Speis).',
  units: [
    {
      id: 'koszones', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: '**Kiejtés – sok minden ismerős a magyarból!**\n\n' +
        '- `ü` és `ö` pontosan úgy hangzik, mint a magyarban: **Tschüss**, **schön** (szép). Az `ä` kb. a magyar e: **Mädchen**.\n' +
        '- `ei` = **áj**: **nein** (nájn), **drei** (dráj).\n' +
        '- `ie` = hosszú **í**: **sieben** (zíben), **die** (dí).\n' +
        '- `eu` és `äu` = **oj**: **neu** (noj), **Freund** (frojnd).\n' +
        '- `sch` = magyar **s**: **Schule** (súle). A sima `s` magánhangzó előtt **z**: **Sie** (zí).\n' +
        '- `ch` a, o, u után erős torokhang (mint a **pech** végén): **acht**, **Buch**; e és i után lágy, a **h** és **j** között: **ich**, **nicht**.\n' +
        '- `z` = **c**: **zehn** (cén); `w` = **v**: **wie** (ví); `v` = általában **f**: **Vater** (fáter); `ß` = **sz**: **heißen**.\n\n' +
        'Trükk az ei/ie párhoz: mindig a **második** betűt mondd ki! e**i** → áj, i**e** → í.',
      words: [
        ['Hallo', 'szia'], ['Guten Morgen', 'jó reggelt'], ['Guten Tag', 'jó napot'], ['Guten Abend', 'jó estét'],
        ['Gute Nacht', 'jó éjszakát'], ['Tschüss', 'viszlát'], ['Auf Wiedersehen', 'viszontlátásra'],
        ['ja', 'igen'], ['nein', 'nem'], ['danke', 'köszönöm'], ['bitte', 'kérem'], ['Entschuldigung', 'elnézést'],
        ['Wie geht\'s?', 'hogy vagy?'], ['gut', 'jó'], ['der Name', 'a név'], ['Ungarn', 'Magyarország'], ['Deutschland', 'Németország']
      ],
      sentences: [
        ['Ich heiße Anna.', 'Annának hívnak.', ['Mein Name ist Anna.', 'Ich bin Anna.'], ['Anna vagyok.', 'Engem Annának hívnak.', 'A nevem Anna.']],
        ['Wie heißt du?', 'Hogy hívnak?', ['Wie ist dein Name?'], ['Téged hogy hívnak?', 'Mi a neved?']],
        ['Mein Name ist Max.', 'A nevem Max.', ['Ich heiße Max.'], ['Az én nevem Max.', 'Max a nevem.', 'Maxnak hívnak.']],
        ['Wie geht es dir?', 'Hogy vagy?', ['Wie geht\'s dir?']],
        ['Mir geht es gut.', 'Jól vagyok.', ['Es geht mir gut.']],
        ['Danke, gut.', 'Köszönöm, jól.', [], ['Köszi, jól.']],
        ['Nein, danke.', 'Nem, köszönöm.', [], ['Köszönöm, nem.']],
        ['Ich komme aus Ungarn.', 'Magyarországról jövök.', [], ['Magyarországról származom.', 'Magyarországi vagyok.']],
        ['Woher kommst du?', 'Honnan jössz?', [], ['Honnan származol?', 'Te honnan jössz?', 'Honnan való vagy?']],
        ['Kommst du aus Deutschland?', 'Németországból jössz?', [], ['Németországból származol?', 'Németországi vagy?']],
        ['Auf Wiedersehen, Herr Schmidt!', 'Viszontlátásra, Schmidt úr!'],
        ['Freut mich!', 'Örvendek!', [], ['Örülök!', 'Örülök, hogy megismertelek!']]
      ]
    },
    {
      id: 'szamok', title: 'Számok', icon: '🔢',
      tip: '**Számok – fordított sorrendben!**\n\n' +
        '13–19: szám + **zehn**: **dreizehn** (13), **vierzehn** (14). Figyelj: **sechzehn** (16) és **siebzehn** (17) – kiesik egy-egy betű.\n\n' +
        '21–99 között a németben az **egyes jön előre**, és **und** köti össze, egy szóba írva:\n\n' +
        '- **einundzwanzig** = „egy-és-húsz” = 21\n' +
        '- **dreiundvierzig** = „három-és-negyven” = 43\n\n' +
        'Tízesek: **zwanzig**, **dreißig** (ß-szel!), **vierzig**, **fünfzig**, **sechzig**, **siebzig**, **achtzig**, **neunzig**; 100 = **hundert**.\n\n' +
        'Életkor: **Ich bin zwölf Jahre alt.** – szó szerint „12 év öreg vagyok”. Kérdés: **Wie alt bist du?**\n\n' +
        'Az **eins** csak számoláskor kell; főnév előtt **ein/eine**: **ein Buch**, **eine Zahl**.',
      words: [
        ['null', 'nulla'], ['eins', 'egy'], ['zwei', 'kettő'], ['drei', 'három'], ['vier', 'négy'], ['fünf', 'öt'],
        ['sechs', 'hat'], ['sieben', 'hét'], ['acht', 'nyolc'], ['neun', 'kilenc'], ['zehn', 'tíz'], ['elf', 'tizenegy'],
        ['zwölf', 'tizenkettő'], ['zwanzig', 'húsz'], ['dreißig', 'harminc'], ['hundert', 'száz'], ['die Zahl', 'a szám'], ['wie viel', 'mennyi']
      ],
      sentences: [
        ['Ich bin zwölf Jahre alt.', 'Tizenkét éves vagyok.', [], ['Tizenkétéves vagyok.', 'Én tizenkét éves vagyok.']],
        ['Wie alt bist du?', 'Hány éves vagy?', [], ['Te hány éves vagy?']],
        ['Er ist dreißig Jahre alt.', 'Ő harminc éves.', [], ['Harminc éves.', 'Ő harmincéves.', 'Harmincéves.']],
        ['Zwei plus drei ist fünf.', 'Kettő plusz három az öt.', ['Zwei und drei ist fünf.', 'Zwei plus drei sind fünf.'], ['Kettő meg három az öt.', 'Kettő plusz három egyenlő öttel.']],
        ['Zehn minus vier ist sechs.', 'Tíz mínusz négy egyenlő hattal.', ['Zehn minus vier sind sechs.'], ['Tíz mínusz négy az hat.', 'Tízből négy az hat.']],
        ['Wie viel kostet das?', 'Mennyibe kerül ez?', ['Was kostet das?'], ['Ez mennyibe kerül?', 'Mennyibe kerül?']],
        ['Das kostet zehn Euro.', 'Ez tíz euróba kerül.', ['Das macht zehn Euro.'], ['Tíz euróba kerül.', 'Ez tíz euró.']],
        ['Ich zähle bis zwanzig.', 'Elszámolok húszig.', [], ['Húszig számolok.']],
        ['Meine Zahl ist acht.', 'Az én számom a nyolc.', [], ['A számom a nyolc.', 'A nyolc az én számom.']],
        ['Elf Kinder spielen Fußball.', 'Tizenegy gyerek focizik.', [], ['Tizenegy gyerek játszik focit.']]
      ]
    },
    {
      id: 'csalad', title: 'Család', icon: '👨‍👩‍👧',
      tip: '**der, die, das – három névelő**\n\n' +
        'A magyarban egy határozott névelő van (a/az), a németben a főnévnek **neme** van, és ez a névelőn látszik:\n\n' +
        '- **der** – hímnem: **der Vater**, **der Hund**\n' +
        '- **die** – nőnem: **die Mutter**, **die Katze**\n' +
        '- **das** – semlegesnem: **das Kind**, **das Mädchen**\n\n' +
        'A nem nem mindig logikus: **das Mädchen** (a lány) semleges, mert a **-chen** kicsinyítő képzős szavak mindig **das**-ok. Ezért a főnevet **mindig a névelőjével együtt** tanuld! Többes számban mindig **die**: **die Eltern**.\n\n' +
        'Határozatlan névelő: **ein** (der/das) és **eine** (die): **ein Hund**, **eine Katze**.\n\n' +
        'Birtoklás: a magyarban rag (apá**m**), a németben külön szó: **mein Vater**, **meine Mutter**, **mein Kind**, **meine Eltern**.\n\n' +
        'A német főneveket **mindig nagy kezdőbetűvel** írjuk!',
      words: [
        ['die Familie', 'a család'], ['die Mutter', 'az anya'], ['der Vater', 'az apa'], ['die Eltern', 'a szülők'],
        ['der Bruder', 'a fiútestvér'], ['die Schwester', 'a lánytestvér'], ['die Oma', 'a nagymama'], ['der Opa', 'a nagypapa'],
        ['das Kind', 'a gyerek'], ['der Junge', 'a fiú'], ['das Mädchen', 'a lány'], ['der Hund', 'a kutya'], ['die Katze', 'a macska'],
        ['der Freund', 'a barát'], ['die Freundin', 'a barátnő'], ['groß', 'nagy (magas)'], ['klein', 'kicsi'], ['nett', 'kedves']
      ],
      sentences: [
        ['Das ist meine Mutter.', 'Ez az anyám.', [], ['Ő az anyám.', 'Ő az anyukám.', 'Ez az anyukám.']],
        ['Mein Vater ist groß.', 'Az apám magas.', [], ['Apám magas.', 'Az apukám magas.', 'Apukám magas.']],
        ['Ich habe einen Bruder.', 'Van egy fiútestvérem.', [], ['Van egy bátyám.', 'Van egy öcsém.', 'Egy fiútestvérem van.']],
        ['Hast du Geschwister?', 'Vannak testvéreid?', [], ['Van testvéred?']],
        ['Meine Schwester ist klein.', 'A lánytestvérem kicsi.', [], ['A húgom kicsi.', 'A nővérem kicsi.']],
        ['Wir haben einen Hund.', 'Van egy kutyánk.', [], ['Nekünk van egy kutyánk.', 'Kutyánk van.']],
        ['Die Katze ist klein.', 'A macska kicsi.'],
        ['Meine Oma ist nett.', 'A nagymamám kedves.', [], ['Nagymamám kedves.']],
        ['Das Kind heißt Lena.', 'A gyereket Lenának hívják.', [], ['A gyerek neve Lena.']],
        ['Mein Freund heißt Tom.', 'A barátomat Tomnak hívják.', [], ['A barátom neve Tom.']],
        ['Meine Eltern sind nett.', 'A szüleim kedvesek.', [], ['Szüleim kedvesek.']],
        ['Der Junge hat eine Katze.', 'A fiúnak van egy macskája.', [], ['A fiúnak macskája van.']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**Igeragozás: sein, haben és a szabályos igék**\n\n' +
        'A német ige is személy szerint változik, de a magyartól eltérően a **személyes névmás nem maradhat el**: **ich lerne** (tanulok).\n\n' +
        'Szabályos ige = tő + végződés. **lernen** → tő: **lern-**\n\n' +
        '- ich lern**e**, du lern**st**, er/sie/es lern**t**\n' +
        '- wir lern**en**, ihr lern**t**, sie/Sie lern**en**\n\n' +
        'Két rendhagyó ige, amely nélkül nincs német mondat:\n\n' +
        '- **sein** (lenni): ich **bin**, du **bist**, er **ist**, wir **sind**, ihr **seid**, sie **sind**\n' +
        '- **haben** (birtokolni): ich **habe**, du **hast**, er **hat**, wir **haben**, ihr **habt**, sie **haben**\n\n' +
        'A magyar „van egy ceruzám” németül: **Ich habe einen Bleistift.** – a birtoklást a **haben** fejezi ki.\n\n' +
        'Néhány ige tőhangot vált: **lesen** → du **liest**, er **liest**.',
      words: [
        ['die Schule', 'az iskola'], ['der Lehrer', 'a tanár'], ['die Lehrerin', 'a tanárnő'], ['das Buch', 'a könyv'],
        ['das Heft', 'a füzet'], ['der Kuli', 'a toll'], ['der Bleistift', 'a ceruza'], ['der Radiergummi', 'a radír'],
        ['die Tasche', 'a táska'], ['der Tisch', 'az asztal'], ['der Stuhl', 'a szék'], ['die Tafel', 'a tábla'],
        ['das Fenster', 'az ablak'], ['die Tür', 'az ajtó'], ['die Hausaufgabe', 'a házi feladat'],
        ['lernen', 'tanulni'], ['lesen', 'olvasni'], ['schreiben', 'írni']
      ],
      sentences: [
        ['Ich habe einen Bleistift.', 'Van egy ceruzám.', [], ['Nekem van egy ceruzám.']],
        ['Ich brauche ein Heft.', 'Kell egy füzet.', [], ['Szükségem van egy füzetre.', 'Egy füzet kell.', 'Kell nekem egy füzet.']],
        ['Der Lehrer ist nett.', 'A tanár kedves.'],
        ['Wir lernen Deutsch.', 'Németet tanulunk.', [], ['Németül tanulunk.', 'Mi németet tanulunk.']],
        ['Ich lese ein Buch.', 'Egy könyvet olvasok.', [], ['Könyvet olvasok.', 'Olvasok egy könyvet.']],
        ['Die Tasche ist auf dem Tisch.', 'A táska az asztalon van.', [], ['Az asztalon van a táska.']],
        ['Wo ist mein Kuli?', 'Hol van a tollam?', [], ['Hol a tollam?']],
        ['Ich mache meine Hausaufgaben.', 'Csinálom a házi feladatomat.', [], ['Megcsinálom a házi feladatomat.', 'Írom a házi feladatomat.', 'Csinálom a leckémet.']],
        ['Öffne bitte das Fenster!', 'Nyisd ki az ablakot, kérlek!', ['Mach bitte das Fenster auf!'], ['Kérlek, nyisd ki az ablakot!']],
        ['Die Tür ist offen.', 'Az ajtó nyitva van.', [], ['Nyitva van az ajtó.']],
        ['Hast du einen Radiergummi?', 'Van radírod?', [], ['Van egy radírod?']],
        ['Die Lehrerin schreibt an die Tafel.', 'A tanárnő a táblára ír.', [], ['A tanárnő ír a táblára.']]
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🍎',
      tip: '**Akkusativ – a német „-t” rag**\n\n' +
        'Magyarul a tárgyat a **-t** rag jelöli: alma**t** eszem. A németben a **névelő** változik – de csak **hímnemben**!\n\n' +
        '- der → **den**: Ich trinke **den** Saft.\n' +
        '- ein → **einen**: Ich esse **einen** Apfel.\n' +
        '- die, das, eine és a semleges ein **nem változik**: Ich esse **eine** Banane und **ein** Ei.\n\n' +
        'Tagadás főnévvel: **kein / keine / keinen** (= egy sem, semmi): Ich esse **kein** Fleisch. (Nem eszem húst.) Hímnemben tárgyesetben: Ich habe **keinen** Hunger.\n\n' +
        '**Hunger haben** = éhesnek lenni (szó szerint „éhséget birtokolni”), **Durst haben** = szomjasnak lenni.\n\n' +
        'Figyelj: **essen** → du **isst**, er **isst**.',
      words: [
        ['das Brot', 'a kenyér'], ['der Käse', 'a sajt'], ['der Apfel', 'az alma'], ['die Banane', 'a banán'],
        ['das Wasser', 'a víz'], ['die Milch', 'a tej'], ['der Saft', 'a gyümölcslé'], ['der Tee', 'a tea'],
        ['das Ei', 'a tojás'], ['die Suppe', 'a leves'], ['das Fleisch', 'a hús'], ['der Kuchen', 'a sütemény'],
        ['das Eis', 'a fagylalt'], ['essen', 'enni'], ['trinken', 'inni'], ['lecker', 'finom'], ['hungrig', 'éhes'], ['durstig', 'szomjas']
      ],
      sentences: [
        ['Ich esse einen Apfel.', 'Eszem egy almát.', [], ['Egy almát eszem.', 'Almát eszem.']],
        ['Ich trinke Wasser.', 'Vizet iszom.', [], ['Iszom vizet.', 'Én vizet iszom.']],
        ['Trinkst du Milch?', 'Iszol tejet?', [], ['Tejet iszol?']],
        ['Die Suppe ist lecker.', 'A leves finom.'],
        ['Ich habe Hunger.', 'Éhes vagyok.', ['Ich bin hungrig.']],
        ['Ich habe keinen Hunger.', 'Nem vagyok éhes.', ['Ich bin nicht hungrig.']],
        ['Ich bin durstig.', 'Szomjas vagyok.', ['Ich habe Durst.']],
        ['Er isst gern Kuchen.', 'Szereti a süteményt.', [], ['Ő szereti a süteményt.', 'Szívesen eszik süteményt.']],
        ['Wir essen Brot mit Käse.', 'Sajtos kenyeret eszünk.', [], ['Kenyeret eszünk sajttal.']],
        ['Ich esse kein Fleisch.', 'Nem eszem húst.', [], ['Én nem eszem húst.']],
        ['Das Eis ist kalt.', 'A fagylalt hideg.', [], ['A fagyi hideg.']],
        ['Isst du ein Ei?', 'Eszel egy tojást?', [], ['Tojást eszel?']]
      ]
    },
    {
      id: 'szinek', title: 'Színek és ruhák', icon: '👕',
      tip: '**Tagadás: nicht vagy kein?**\n\n' +
        '- **kein/keine** – főnév elé, ha állítva **ein/eine** vagy névelő nélküli főnév állna: Ich habe eine Mütze. → Ich habe **keine** Mütze. (Nincs sapkám.)\n' +
        '- **nicht** – minden más esetben (melléknév, ige, határozott névelős főnév): Die Hose ist **nicht** blau. Ich tanze **nicht**.\n\n' +
        'A színek és más melléknevek a **sein** ige után **nem kapnak végződést**: Die Jacke ist **rot**. (Főnév előtt már igen: **eine rote Jacke** – ezt később tanuljuk.)\n\n' +
        'A magyar „rajtam van” helyett a németek ezt mondják: **Ich trage eine Jacke.** (viselek)\n\n' +
        'Összetett szavak: **Lieblings-** = kedvenc: **die Lieblingsfarbe** (kedvenc szín). Az összetett szó neme mindig az **utolsó** tagé: die Farbe → **die** Lieblingsfarbe.',
      words: [
        ['rot', 'piros'], ['blau', 'kék'], ['grün', 'zöld'], ['gelb', 'sárga'], ['schwarz', 'fekete'], ['weiß', 'fehér'],
        ['grau', 'szürke'], ['braun', 'barna'], ['die Farbe', 'a szín'], ['das T-Shirt', 'a póló'], ['die Hose', 'a nadrág'],
        ['das Kleid', 'a ruha'], ['der Pullover', 'a pulóver'], ['die Jacke', 'a dzseki'], ['der Schuh', 'a cipő'],
        ['die Mütze', 'a sapka'], ['schön', 'szép'], ['neu', 'új']
      ],
      sentences: [
        ['Die Hose ist blau.', 'A nadrág kék.'],
        ['Mein T-Shirt ist rot.', 'A pólóm piros.'],
        ['Ich trage eine Jacke.', 'Dzseki van rajtam.', [], ['Egy dzseki van rajtam.', 'Dzsekit viselek.', 'Dzsekit hordok.']],
        ['Das Kleid ist sehr schön.', 'A ruha nagyon szép.'],
        ['Die Schuhe sind nicht neu.', 'A cipők nem újak.', [], ['A cipő nem új.']],
        ['Ich habe keine Mütze.', 'Nincs sapkám.', [], ['Nekem nincs sapkám.']],
        ['Was ist deine Lieblingsfarbe?', 'Mi a kedvenc színed?'],
        ['Meine Lieblingsfarbe ist grün.', 'A kedvenc színem a zöld.', [], ['Kedvenc színem a zöld.', 'A zöld a kedvenc színem.']],
        ['Der Pullover ist nicht grau.', 'A pulóver nem szürke.'],
        ['Die Katze ist schwarz und weiß.', 'A macska fekete-fehér.', [], ['A macska fekete és fehér.']],
        ['Ist die Mütze gelb?', 'Sárga a sapka?', [], ['A sapka sárga?']]
      ]
    },
    {
      id: 'ido', title: 'Idő, napok, évszakok', icon: '📅',
      tip: '**Szórend: az ige mindig a 2. helyen!**\n\n' +
        'A magyarban elég szabad a szórend, a német kijelentő mondatban viszont a ragozott ige **mindig a második mondatrész**:\n\n' +
        '- **Ich spiele** am Samstag Fußball.\n' +
        '- Am Samstag **spiele ich** Fußball.\n' +
        '- Heute **ist** Montag.\n\n' +
        'Ha nem az alany áll elöl (pl. időhatározó), az alany az ige **mögé** kerül. Az „Am Samstag ich spiele” hibás!\n\n' +
        'Eldöntendő kérdésben az ige áll **elöl**: **Spielst** du Fußball? Kiegészítő kérdésben a kérdőszó után: Wann **spielst** du?\n\n' +
        'Időpontok: **am** Montag (hétfőn), **im** Mai (májusban), **im** Winter (télen), **um** drei Uhr (három órakor).\n\n' +
        'Időjárás: **Es ist kalt.** – a német mondatnak kell alany, ezért áll ott az **es**.',
      words: [
        ['der Montag', 'hétfő'], ['der Dienstag', 'kedd'], ['der Mittwoch', 'szerda'], ['der Donnerstag', 'csütörtök'],
        ['der Freitag', 'péntek'], ['der Samstag', 'szombat'], ['der Sonntag', 'vasárnap'], ['heute', 'ma'],
        ['morgen', 'holnap'], ['gestern', 'tegnap'], ['die Woche', 'a hét (7 nap)'], ['der Monat', 'a hónap'],
        ['das Jahr', 'az év'], ['der Winter', 'a tél'], ['der Sommer', 'a nyár'], ['die Uhr', 'az óra'], ['kalt', 'hideg'], ['warm', 'meleg']
      ],
      sentences: [
        ['Heute ist Montag.', 'Ma hétfő van.', ['Montag ist heute.']],
        ['Morgen habe ich Deutsch.', 'Holnap németórám van.', ['Ich habe morgen Deutsch.'], ['Holnap német órám van.', 'Holnap van németórám.']],
        ['Am Samstag spiele ich Fußball.', 'Szombaton focizom.', ['Ich spiele am Samstag Fußball.'], ['Szombaton focizok.']],
        ['Im Winter ist es kalt.', 'Télen hideg van.', ['Es ist im Winter kalt.']],
        ['Im Sommer ist es warm.', 'Nyáron meleg van.', ['Es ist im Sommer warm.']],
        ['Wie spät ist es?', 'Hány óra van?', [], ['Mennyi az idő?']],
        ['Es ist drei Uhr.', 'Három óra van.', [], ['Most három óra van.']],
        ['Gestern war Sonntag.', 'Tegnap vasárnap volt.'],
        ['Das Jahr hat zwölf Monate.', 'Az évnek tizenkét hónapja van.', [], ['Egy évben tizenkét hónap van.', 'Egy év tizenkét hónapból áll.']],
        ['Am Freitag gehe ich ins Kino.', 'Pénteken moziba megyek.', ['Ich gehe am Freitag ins Kino.'], ['Pénteken megyek moziba.']],
        ['Mein Geburtstag ist im Mai.', 'A születésnapom májusban van.', [], ['Májusban van a születésnapom.']]
      ]
    },
    {
      id: 'otthon', title: 'Otthon', icon: '🏠',
      tip: '**Többes szám és az „es gibt”**\n\n' +
        'A magyarban a többes szám egyszerű (**-k**), a németben többféle végződés van – ezért a többes számot is a szóval együtt érdemes megtanulni:\n\n' +
        '- **-e**: der Tisch → die Tisch**e**\n' +
        '- **-er** + umlaut: das Haus → die H**ä**us**er**\n' +
        '- **-n / -en**: die Lampe → die Lampe**n**\n' +
        '- **-s**: das Sofa → die Sofa**s**\n' +
        '- változatlan: das Zimmer → die Zimmer\n\n' +
        'Többes számban a névelő mindig **die**.\n\n' +
        '**Es gibt** = van (létezik valahol), utána tárgyeset jön: **Es gibt einen Garten.** (Van egy kert.)\n\n' +
        'Hol? **in** ≈ -ban/-ben: **in der Küche** (a konyhában), **im Zimmer** (= in dem, a szobában); **auf** ≈ -on/-en/-ön: **auf dem Sofa** (a kanapén).',
      words: [
        ['das Haus', 'a ház'], ['die Wohnung', 'a lakás'], ['das Zimmer', 'a szoba'], ['die Küche', 'a konyha'],
        ['das Bad', 'a fürdőszoba'], ['das Schlafzimmer', 'a hálószoba'], ['das Wohnzimmer', 'a nappali'], ['der Garten', 'a kert'],
        ['das Bett', 'az ágy'], ['das Sofa', 'a kanapé'], ['der Schrank', 'a szekrény'], ['die Lampe', 'a lámpa'],
        ['der Kühlschrank', 'a hűtő'], ['die Treppe', 'a lépcső'], ['wohnen', 'lakni'], ['schlafen', 'aludni'], ['kochen', 'főzni']
      ],
      sentences: [
        ['Ich wohne in Budapest.', 'Budapesten lakom.', [], ['Én Budapesten lakom.']],
        ['Unser Haus hat einen Garten.', 'A házunknak van kertje.', [], ['A házunknak kertje van.', 'A házunkhoz tartozik egy kert.']],
        ['Es gibt drei Zimmer.', 'Három szoba van.', [], ['Van három szoba.']],
        ['Mein Zimmer ist klein.', 'A szobám kicsi.'],
        ['Die Mutter kocht in der Küche.', 'Anya a konyhában főz.', [], ['Az anya a konyhában főz.', 'Anyu a konyhában főz.']],
        ['Das Bett ist sehr groß.', 'Az ágy nagyon nagy.'],
        ['Die Lampe ist neu.', 'A lámpa új.'],
        ['Wo ist das Bad?', 'Hol van a fürdőszoba?', [], ['Hol a fürdőszoba?']],
        ['Der Hund schläft auf dem Sofa.', 'A kutya a kanapén alszik.', [], ['A kutya alszik a kanapén.']],
        ['Wir haben zwei Schlafzimmer.', 'Két hálószobánk van.', [], ['Nekünk két hálószobánk van.']],
        ['Die Milch ist im Kühlschrank.', 'A tej a hűtőben van.', [], ['A hűtőben van a tej.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚌',
      tip: '**du, ihr vagy Sie? – Tegezés és magázás**\n\n' +
        '- **du** – egy embert tegezel: barát, család, osztálytárs. **Wohnst du hier?**\n' +
        '- **ihr** – több embert tegezel: **Wo wohnt ihr?**\n' +
        '- **Sie** – magázás (Ön, Önök): felnőtt idegennek, tanárnak, eladónak. **Mindig nagy S-sel** írjuk, és az ige olyan, mint a többes szám 3. személyben: **Wohnen Sie hier?** (Ön itt lakik?)\n\n' +
        'A magyarban az „Ön” szót gyakran elhagyjuk, a németben a **Sie** viszont sosem maradhat el!\n\n' +
        'Útbaigazítás magázva: **Entschuldigung, wo ist der Bahnhof?** – **Gehen Sie geradeaus, dann links.**\n\n' +
        '**fahren** = járművel megy, **gehen** = gyalog megy. Eszköz: **mit dem Bus / mit dem Zug / mit dem Fahrrad** = busszal, vonattal, biciklivel. A **fahren** tőhangot vált: du **fährst**, er **fährt**.',
      words: [
        ['die Stadt', 'a város'], ['die Straße', 'az utca'], ['der Bahnhof', 'a pályaudvar'], ['der Bus', 'a busz'],
        ['der Zug', 'a vonat'], ['die Straßenbahn', 'a villamos'], ['die U-Bahn', 'a metró'], ['das Auto', 'az autó'],
        ['das Fahrrad', 'a bicikli'], ['das Kino', 'a mozi'], ['der Park', 'a park'], ['die Apotheke', 'a gyógyszertár'],
        ['das Krankenhaus', 'a kórház'], ['links', 'balra'], ['rechts', 'jobbra'], ['geradeaus', 'egyenesen'],
        ['weit', 'messze'], ['gehen', 'menni (gyalog)'], ['fahren', 'menni (járművel)']
      ],
      sentences: [
        ['Entschuldigung, wo ist der Bahnhof?', 'Elnézést, hol van a pályaudvar?', [], ['Elnézést, hol a pályaudvar?', 'Bocsánat, hol van a pályaudvar?']],
        ['Gehen Sie geradeaus!', 'Menjen egyenesen!', [], ['Menjen egyenesen előre!']],
        ['Das Kino ist links.', 'A mozi balra van.', [], ['A mozi bal oldalt van.']],
        ['Die Apotheke ist rechts.', 'A gyógyszertár jobbra van.', [], ['A gyógyszertár jobb oldalt van.', 'A patika jobbra van.']],
        ['Ich fahre mit dem Bus.', 'Busszal megyek.', [], ['Busszal utazom.', 'Busszal járok.']],
        ['Fährst du mit dem Fahrrad?', 'Biciklivel mész?', [], ['Biciklivel jársz?']],
        ['Ist es weit?', 'Messze van?', [], ['Ez messze van?']],
        ['Der Zug kommt um acht Uhr.', 'A vonat nyolc órakor jön.', [], ['A vonat nyolckor jön.', 'A vonat nyolc órakor érkezik.']],
        ['Wohnst du hier?', 'Itt laksz?', [], ['Te itt laksz?']],
        ['Wohnen Sie hier?', 'Ön itt lakik?', [], ['Itt lakik?']],
        ['Wie heißen Sie?', 'Önt hogy hívják?', [], ['Hogy hívják?', 'Mi a neve?']],
        ['Wir gehen in den Park.', 'A parkba megyünk.', [], ['Megyünk a parkba.']]
      ]
    },
    {
      id: 'hobbi', title: 'Hobbi és sport', icon: '⚽',
      tip: '**Módbeli segédige: können (tud, képes)**\n\n' +
        'Ragozása: ich **kann**, du **kannst**, er/sie **kann**, wir **können**, ihr **könnt**, sie/Sie **können**. Az egyes szám 1. és 3. személy egyforma: ich kann, er kann!\n\n' +
        'A lényeg a **mondatkeret**: a ragozott **können** a 2. helyen áll, a főige **főnévi igenévként a mondat végére** kerül:\n\n' +
        '- Ich **kann** gut **schwimmen**.\n' +
        '- **Kannst** du Gitarre **spielen**?\n' +
        '- Ich **kann** nicht **tanzen**.\n\n' +
        'A magyarban is így mondjuk: „Tudok úszni” – csak a németben a főige a legvégére kerül, bármi áll is közöttük.\n\n' +
        '**gern** = szívesen: Ich spiele **gern** Fußball. (Szeretek focizni.) Ellentéte: **nicht gern**. Gyakoriság: **oft** (gyakran), **nie** (soha).',
      words: [
        ['spielen', 'játszani'], ['schwimmen', 'úszni'], ['tanzen', 'táncolni'], ['singen', 'énekelni'], ['malen', 'festeni'],
        ['laufen', 'futni'], ['Rad fahren', 'biciklizni'], ['der Fußball', 'a foci'], ['das Tennis', 'a tenisz'],
        ['die Musik', 'a zene'], ['die Gitarre', 'a gitár'], ['das Klavier', 'a zongora'], ['das Hobby', 'a hobbi'],
        ['das Spiel', 'a játék'], ['können', 'tudni (képes)'], ['gern', 'szívesen'], ['oft', 'gyakran'], ['nie', 'soha']
      ],
      sentences: [
        ['Ich kann schwimmen.', 'Tudok úszni.', [], ['Én tudok úszni.']],
        ['Kannst du Gitarre spielen?', 'Tudsz gitározni?', [], ['Tudsz gitáron játszani?']],
        ['Ich kann nicht tanzen.', 'Nem tudok táncolni.'],
        ['Mein Hobby ist Musik.', 'A hobbim a zene.', ['Mein Hobby ist die Musik.'], ['A zene a hobbim.']],
        ['Wir spielen gern Fußball.', 'Szeretünk focizni.', [], ['Szívesen focizunk.']],
        ['Anna singt sehr gut.', 'Anna nagyon jól énekel.'],
        ['Er spielt oft Tennis.', 'Gyakran teniszezik.', [], ['Ő gyakran teniszezik.', 'Gyakran játszik teniszt.']],
        ['Ich male nie.', 'Soha nem festek.', [], ['Sosem festek.', 'Én soha nem festek.']],
        ['Max spielt Klavier.', 'Max zongorázik.', [], ['Max zongorán játszik.']],
        ['Am Sonntag fahre ich Rad.', 'Vasárnap biciklizem.', ['Ich fahre am Sonntag Rad.'], ['Vasárnap biciklizek.']],
        ['Was machst du gern?', 'Mit csinálsz szívesen?', [], ['Mit szeretsz csinálni?']],
        ['Kannst du schnell laufen?', 'Tudsz gyorsan futni?']
      ]
    },
    {
      id: 'vasarlas', title: 'Vásárlás és utazás', icon: '🛒',
      tip: '**möchten – udvarias kérés**\n\n' +
        'A **möchten** (szeretne) a legfontosabb szó boltban, étteremben és utazáskor:\n\n' +
        '- ich **möchte**, du **möchtest**, er/sie **möchte**\n' +
        '- wir **möchten**, ihr **möchtet**, sie/Sie **möchten**\n\n' +
        'Főnévvel (tárgyeset!): **Ich möchte ein Eis.** – hímnemben **einen**: Ich möchte **einen** Koffer.\n\n' +
        'Igével ugyanaz a keret, mint a **können**-nél – a főige a mondat végére kerül: Ich **möchte** nach Berlin **reisen**.\n\n' +
        'A **möchten** udvariasabb, mint a **wollen** (akar). Az eladó kérdése: **Was möchten Sie?** (Mit szeretne?)\n\n' +
        'Merre? **nach** + város, ország: **nach Wien**; **in** + hegyek: **in die Berge**; **an** + tenger: **ans Meer**.',
      words: [
        ['der Supermarkt', 'a szupermarket'], ['das Geschäft', 'a bolt'], ['die Kasse', 'a pénztár'], ['das Geld', 'a pénz'],
        ['kaufen', 'vásárolni'], ['kosten', 'kerül valamibe'], ['teuer', 'drága'], ['billig', 'olcsó'],
        ['möchten', 'szeretne'], ['reisen', 'utazni'], ['die Fahrkarte', 'a menetjegy'], ['das Hotel', 'a szálloda'],
        ['der Koffer', 'a bőrönd'], ['der Urlaub', 'a szabadság (nyaralás)'], ['das Meer', 'a tenger'], ['der Berg', 'a hegy'],
        ['der Flughafen', 'a repülőtér'], ['das Flugzeug', 'a repülőgép']
      ],
      sentences: [
        ['Ich möchte ein Eis.', 'Kérek egy fagylaltot.', [], ['Egy fagylaltot szeretnék.', 'Szeretnék egy fagylaltot.', 'Kérek egy fagyit.']],
        ['Was möchten Sie?', 'Mit szeretne?', [], ['Ön mit szeretne?', 'Mit kér?']],
        ['Das ist zu teuer.', 'Ez túl drága.'],
        ['Wie viel kostet der Koffer?', 'Mennyibe kerül a bőrönd?', ['Was kostet der Koffer?'], ['A bőrönd mennyibe kerül?']],
        ['Ich möchte nach Berlin reisen.', 'Berlinbe szeretnék utazni.', [], ['Szeretnék Berlinbe utazni.']],
        ['Wir fahren ans Meer.', 'A tengerhez megyünk.', [], ['A tengerre megyünk.', 'Megyünk a tengerhez.']],
        ['Eine Fahrkarte nach Wien, bitte.', 'Egy jegyet kérek Bécsbe.', [], ['Egy menetjegyet kérek Bécsbe.', 'Kérek egy jegyet Bécsbe.']],
        ['Das Hotel ist billig.', 'A szálloda olcsó.', [], ['A hotel olcsó.']],
        ['Ich habe kein Geld.', 'Nincs pénzem.', [], ['Nekem nincs pénzem.']],
        ['Im Sommer machen wir Urlaub.', 'Nyáron nyaralunk.', ['Wir machen im Sommer Urlaub.'], ['Nyáron szabadságra megyünk.']],
        ['Möchtest du in die Berge fahren?', 'Szeretnél a hegyekbe menni?', [], ['A hegyekbe szeretnél menni?']],
        ['Wo ist die Kasse?', 'Hol van a pénztár?', [], ['Hol a pénztár?']]
      ]
    },
    {
      id: 'mult', title: 'Múlt idő és tervek', icon: '⏳',
      tip: '**Múlt idő: a Perfekt**\n\n' +
        'Élőszóban a németek a múltat legtöbbször **Perfekt** alakkal mondják. Két része van: a **haben** vagy **sein** ragozva (2. hely) + a **Partizip II** a mondat **végén**:\n\n' +
        '- Ich **habe** Fußball **gespielt**. (Fociztam.)\n' +
        '- Wir **sind** ans Meer **gefahren**. (A tengerhez utaztunk.)\n\n' +
        'Szabályos igék: **ge- + tő + -t**: spielen → **gespielt**, kaufen → **gekauft**, machen → **gemacht**.\n\n' +
        'Sok gyakori ige rendhagyó, **-en** végű: essen → **gegessen**, trinken → **getrunken**, sehen → **gesehen**, schlafen → **geschlafen**.\n\n' +
        'A helyváltoztatást jelentő igék **sein**-nel állnak: **ist gegangen**, **ist gefahren**. A többi többnyire **haben**-nel.\n\n' +
        'A **sein** múltját röviden mondjuk: ich **war** (voltam). Jövőt jelen idővel + időhatározóval is mondhatunk: **Nächste Woche fahren wir nach Wien.**',
      words: [
        ['das Wochenende', 'a hétvége'], ['die Ferien', 'a szünidő'], ['der Plan', 'a terv'], ['bald', 'hamarosan'],
        ['später', 'később'], ['letzte Woche', 'múlt héten'], ['nächste Woche', 'jövő héten'], ['gemacht', 'csinált'],
        ['gespielt', 'játszott'], ['gekauft', 'vett (vásárolt)'], ['gelernt', 'tanult'], ['gegessen', 'evett'],
        ['getrunken', 'ivott'], ['gesehen', 'látott'], ['geschlafen', 'aludt'], ['gegangen', 'ment (gyalog)'],
        ['gefahren', 'ment (járművel)'], ['müde', 'fáradt']
      ],
      sentences: [
        ['Gestern habe ich Fußball gespielt.', 'Tegnap fociztam.', ['Ich habe gestern Fußball gespielt.']],
        ['Was hast du am Wochenende gemacht?', 'Mit csináltál a hétvégén?', [], ['Mit csináltál hétvégén?']],
        ['Ich habe einen Film gesehen.', 'Láttam egy filmet.', [], ['Megnéztem egy filmet.', 'Néztem egy filmet.']],
        ['Wir sind ans Meer gefahren.', 'A tengerhez utaztunk.', [], ['Elutaztunk a tengerhez.', 'A tengerre mentünk.']],
        ['Er ist ins Kino gegangen.', 'Moziba ment.', [], ['Ő moziba ment.', 'Elment moziba.']],
        ['Ich habe Pizza gegessen.', 'Pizzát ettem.', [], ['Ettem pizzát.']],
        ['Hast du Deutsch gelernt?', 'Tanultál németet?', [], ['Németet tanultál?', 'Tanultál németül?']],
        ['Ich habe lange geschlafen.', 'Sokáig aludtam.', [], ['Sokat aludtam.']],
        ['Gestern war ich müde.', 'Tegnap fáradt voltam.', ['Ich war gestern müde.']],
        ['Anna hat ein Buch gekauft.', 'Anna vett egy könyvet.', [], ['Anna könyvet vett.']],
        ['Nächste Woche fahren wir nach Wien.', 'Jövő héten Bécsbe utazunk.', ['Wir fahren nächste Woche nach Wien.'], ['Jövő héten Bécsbe megyünk.']],
        ['In den Ferien möchte ich reisen.', 'A szünidőben utazni szeretnék.', ['Ich möchte in den Ferien reisen.'], ['A szünidőben szeretnék utazni.']]
      ]
    }
  ]
});
