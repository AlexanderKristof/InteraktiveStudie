/* Német nyelvtanfolyam (A1–B1) – a js/nyelvek.js motor adatai. */
STUDIE.addLangCourse({
  id: 'nemet', title: 'Német', flag: '🇩🇪', tts: 'de-DE', badge: 'A1–B1',
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
    },
    {
      id: 'dativ', title: 'Hol van? Hová teszed? (Dativ)', icon: '📍',
      tip: '**Dativ és a kétirányú elöljárók**\n\nA magyar ragokkal jelzi, hogy valami **hol** van (asztal**on**), vagy **hová** kerül (asztal**ra**). A német ugyanezt egy elöljáróval és a névelő esetével oldja meg.\n\nKilenc elöljáró **kétirányú**: `in, an, auf, unter, über, neben, vor, hinter, zwischen`.\n\n- **Wo?** (hol?) → **Dativ**: Das Buch liegt auf **dem** Tisch. (az asztal**on**)\n- **Wohin?** (hová?) → **Akkusativ**: Ich lege das Buch auf **den** Tisch. (az asztal**ra**)\n\nA Dativ névelői: **dem** (hímnem és semlegesnem), **der** (nőnem), többes számban **den**, és a főnév is `-n` végződést kap. Gyakori összevonások: in dem = **im**, an dem = **am**, zu dem = **zum**, zu der = **zur**.\n\nAz igék is párban járnak: `liegen` és `legen`, `stehen` és `stellen`. Az előbbiek állapotot jelentenek (Dativ), az utóbbiak mozgást, áthelyezést (Akkusativ). A `hängen` mindkettő lehet.\n\nVannak elöljárók, amelyek **mindig** Dativot kérnek: `mit, bei, von, zu, aus, nach, seit`. Például: mit **dem** Bus (busszal), bei **seinen** Großeltern (a nagyszüleinél). A magyar „-val, -vel” ragnak így a **mit** + Dativ felel meg.',
      words: [
        ['in', '-ban, -ben (benne)'], ['auf', '-on, -en, -ön (rajta)'], ['unter', 'alatt'], ['neben', 'mellett'],
        ['vor', 'előtt'], ['hinter', 'mögött'], ['zwischen', 'között'], ['an', '-nál, -nél (érintkezve)'],
        ['liegen', 'feküdni (valahol)'], ['stehen', 'állni'], ['hängen', 'lógni'], ['legen', 'letenni (fektetve)'],
        ['stellen', 'odaállítani'], ['das Regal', 'a polc'], ['der Teppich', 'a szőnyeg'], ['die Wand', 'a fal'],
        ['der Spiegel', 'a tükör'], ['das Bild', 'a kép']
      ],
      sentences: [
        ['Das Buch liegt auf dem Tisch.', 'A könyv az asztalon fekszik.', [], ['A könyv az asztalon van.', 'Az asztalon van a könyv.', 'Az asztalon fekszik a könyv.']],
        ['Ich lege das Buch auf den Tisch.', 'Leteszem a könyvet az asztalra.', [], ['A könyvet az asztalra teszem.', 'Az asztalra teszem a könyvet.', 'Az asztalra fektetem a könyvet.']],
        ['Das Bild hängt an der Wand.', 'A kép a falon lóg.', [], ['A kép a falon függ.', 'A falon lóg a kép.', 'A falon van a kép.']],
        ['Die Katze schläft unter dem Bett.', 'A macska az ágy alatt alszik.', [], ['Az ágy alatt alszik a macska.']],
        ['Stell die Lampe neben das Sofa!', 'Tedd a lámpát a kanapé mellé!', ['Stelle die Lampe neben das Sofa!'], ['Állítsd a lámpát a kanapé mellé!', 'A kanapé mellé tedd a lámpát!']],
        ['Der Spiegel hängt im Bad.', 'A tükör a fürdőszobában lóg.', [], ['A tükör a fürdőszobában van.', 'A fürdőszobában lóg a tükör.', 'A fürdőszobában van a tükör.']],
        ['Der Hund liegt auf dem Teppich.', 'A kutya a szőnyegen fekszik.', [], ['A szőnyegen fekszik a kutya.']],
        ['Das Regal steht zwischen dem Fenster und der Tür.', 'A polc az ablak és az ajtó között áll.', [], ['A polc az ablak és az ajtó között van.', 'Az ablak és az ajtó között áll a polc.', 'Az ablak és az ajtó között van a polc.']],
        ['Wir treffen uns vor dem Kino.', 'A mozi előtt találkozunk.', [], ['Találkozunk a mozi előtt.']],
        ['Hinter dem Haus ist ein Garten.', 'A ház mögött van egy kert.', ['Hinter dem Haus gibt es einen Garten.'], ['A ház mögött kert van.', 'A ház mögött van kert.']],
        ['Ich fahre mit dem Bus zur Schule.', 'Busszal megyek iskolába.', [], ['Busszal megyek az iskolába.', 'Busszal járok iskolába.', 'Busszal járok az iskolába.']],
        ['Er wohnt bei seinen Großeltern.', 'A nagyszüleinél lakik.', [], ['Ő a nagyszüleinél lakik.', 'A nagyszüleinél él.']]
      ]
    },
    {
      id: 'prateritum', title: 'Gyerekkorom: Präteritum', icon: '📜',
      tip: '**Präteritum: az egyszavas múlt**\n\nA Perfektet már ismered (ich habe gespielt). A **Präteritum** egyszavas múlt idő – a mesék, regények, újságcikkek ideje. Élőszóban főleg néhány nagyon gyakori igénél használják, ezeket viszont szinte mindenki így mondja:\n\n- **sein** → ich **war**, du warst, er war, wir waren\n- **haben** → ich **hatte**, du hattest, er hatte, wir hatten\n- **módbeli igék**: können → **konnte**, müssen → **musste**, wollen → **wollte**, dürfen → **durfte**\n\nFigyeld meg: a módbeli igék múltjában **eltűnik az umlaut** (können → konnte, müssen → musste).\n\nSzabályos igéknél a tőhöz `-te` járul: wohnen → ich **wohnte**, erzählen → er **erzählte**. Egyes szám 1. és 3. személyben az alak megegyezik: ich war, er war.\n\nA magyar „amikor” két németre fordítható: múltbeli egyszeri eseménynél **als** (Als ich klein war…), ismétlődőnél és jövőben **wenn**. Az **als** ráadásul „-ként” is lehet: **Als Kind** wohnte ich in einem Dorf. (Gyerekként…)\n\nTipp: „Volt egy lovam” → Ich **hatte** ein Pferd. A magyar „van neki” szerkezetet a német mindig a `haben` igével fejezi ki – múltban is.',
      words: [
        ['war', 'volt'], ['hatte', 'volt neki (birtokolt)'], ['konnte', 'tudott (képes volt)'], ['musste', 'kellett (neki)'],
        ['wollte', 'akart'], ['durfte', 'szabad volt (neki)'], ['die Kindheit', 'a gyerekkor'], ['damals', 'akkoriban'],
        ['früher', 'régen'], ['als', 'amikor (a múltban)'], ['das Dorf', 'a falu'], ['der Bauernhof', 'a tanya'],
        ['das Pferd', 'a ló'], ['das Spielzeug', 'a játékszer'], ['streng', 'szigorú'], ['die Erinnerung', 'az emlék'],
        ['der Nachbar', 'a szomszéd'], ['erzählen', 'mesélni']
      ],
      sentences: [
        ['Als Kind wohnte ich in einem Dorf.', 'Gyerekként egy faluban laktam.', [], ['Gyerekkoromban egy faluban laktam.', 'Gyerekként faluban laktam.', 'Gyerekként egy faluban éltem.', 'Gyerekkoromban faluban éltem.']],
        ['Mein Großvater hatte einen Bauernhof.', 'A nagyapámnak volt egy tanyája.', [], ['A nagypapámnak volt egy tanyája.', 'Nagyapámnak tanyája volt.', 'A nagyapámnak tanyája volt.']],
        ['Wir hatten zwei Pferde und einen Hund.', 'Volt két lovunk és egy kutyánk.', [], ['Két lovunk és egy kutyánk volt.']],
        ['Früher war alles anders.', 'Régen minden más volt.', ['Alles war früher anders.'], ['Régen minden másmilyen volt.']],
        ['Meine Lehrerin war sehr streng.', 'A tanárnőm nagyon szigorú volt.', [], ['Nagyon szigorú volt a tanárnőm.']],
        ['Ich konnte nicht schwimmen.', 'Nem tudtam úszni.'],
        ['Wir mussten früh aufstehen.', 'Korán kellett felkelnünk.', [], ['Korán fel kellett kelnünk.']],
        ['Ich wollte Tierarzt werden.', 'Állatorvos akartam lenni.', [], ['Állatorvos szerettem volna lenni.']],
        ['Durftest du abends fernsehen?', 'Nézhettél esténként tévét?', [], ['Szabad volt esténként tévét nézned?', 'Szabad volt este tévét nézned?', 'Este nézhettél tévét?', 'Nézhettél este tévét?']],
        ['Damals hatten wir keinen Computer.', 'Akkoriban nem volt számítógépünk.', ['Wir hatten damals keinen Computer.'], ['Akkor még nem volt számítógépünk.']],
        ['Mein Opa erzählte mir oft Geschichten.', 'A nagypapám gyakran mesélt nekem történeteket.', [], ['Nagypapám gyakran mesélt nekem történeteket.', 'A nagyapám gyakran mesélt nekem történeteket.']],
        ['Unser Nachbar hatte viel Spielzeug.', 'A szomszédunknak sok játéka volt.', [], ['A szomszédunknak sok játékszere volt.']]
      ]
    },
    {
      id: 'mellekmondat', title: 'Média: weil, dass, wenn', icon: '📰',
      tip: '**Mellékmondatok: az ige a végére kerül!**\n\nA magyarban a „mert”, „hogy”, „ha” után ugyanúgy folytatjuk a mondatot, mint egy főmondatban. A németben viszont ezek a kötőszavak a ragozott igét **a mellékmondat legvégére** küldik:\n\n- Ich bleibe zu Hause, **weil** ich krank **bin**. (mert)\n- Ich glaube, **dass** das Video lustig **ist**. (hogy)\n- **Wenn** ich Zeit **habe**, … (ha, amikor)\n- **obwohl** (bár) és **ob** (vajon, -e): Ich weiß nicht, **ob** er recht **hat**.\n\nHa a mellékmondat áll elöl, a főmondat **igével kezdődik**: Wenn ich Zeit habe, **lese** ich die Zeitung. A két ige vesszővel elválasztva egymás mellé kerül.\n\nA magyar „-e” kérdőszócskát a németben az **ob** fejezi ki: „Tudod, hogy jön-e?” = Weißt du, **ob** er kommt?\n\nA vessző a németben is kötelező a mellékmondat előtt, akárcsak a magyarban.\n\nVigyázz: a **denn** (mert) és a **deshalb** (ezért) **nem** küldi a végére az igét: Ich bleibe zu Hause, denn ich **bin** krank. A **weil** a hétköznapi beszédben sokkal gyakoribb, ezért ezt gyakorold!',
      words: [
        ['weil', 'mert'], ['dass', 'hogy (kötőszó)'], ['wenn', 'ha, amikor'], ['obwohl', 'bár'],
        ['ob', 'vajon (-e)'], ['glauben', 'hinni, gondolni'], ['wissen', 'tudni (ismerni a tényt)'], ['hoffen', 'remélni'],
        ['die Zeitung', 'az újság'], ['die Nachrichten', 'a hírek'], ['die Sendung', 'a műsor'], ['das Handy', 'a mobiltelefon'],
        ['der Fernseher', 'a tévékészülék'], ['die Meinung', 'a vélemény'], ['wichtig', 'fontos'], ['die Werbung', 'a reklám'],
        ['das Video', 'a videó'], ['nutzen', 'használni']
      ],
      sentences: [
        ['Ich bleibe zu Hause, weil ich krank bin.', 'Otthon maradok, mert beteg vagyok.', [], ['Itthon maradok, mert beteg vagyok.']],
        ['Ich glaube, dass das Video lustig ist.', 'Azt hiszem, hogy a videó vicces.', [], ['Azt hiszem, a videó vicces.', 'Szerintem a videó vicces.', 'Úgy gondolom, hogy a videó vicces.', 'Azt hiszem, vicces a videó.']],
        ['Wenn ich Zeit habe, lese ich die Zeitung.', 'Ha van időm, elolvasom az újságot.', ['Ich lese die Zeitung, wenn ich Zeit habe.'], ['Ha van időm, újságot olvasok.', 'Ha van időm, olvasom az újságot.']],
        ['Weißt du, ob die Sendung heute kommt?', 'Tudod, hogy ma lesz-e a műsor?', [], ['Tudod, hogy a műsor ma lesz-e?', 'Tudod, hogy ma megy-e a műsor?', 'Tudja, hogy ma lesz-e a műsor?']],
        ['Ich hoffe, dass du bald kommst.', 'Remélem, hogy hamarosan jössz.', [], ['Remélem, hamarosan jössz.', 'Remélem, hogy hamar jössz.', 'Remélem, hogy hamarosan eljössz.']],
        ['Obwohl es regnet, gehen wir spazieren.', 'Bár esik, sétálni megyünk.', ['Wir gehen spazieren, obwohl es regnet.'], ['Bár esik az eső, sétálni megyünk.', 'Annak ellenére, hogy esik, sétálni megyünk.']],
        ['Ich sehe die Nachrichten, weil sie wichtig sind.', 'Megnézem a híreket, mert fontosak.', [], ['Nézem a híreket, mert fontosak.', 'A híreket nézem, mert fontosak.']],
        ['Er nutzt sein Handy, wenn er Bus fährt.', 'Használja a mobilját, amikor buszozik.', [], ['A mobilját használja, amikor buszon utazik.', 'Amikor buszozik, a mobilját használja.', 'Használja a telefonját, amikor buszozik.', 'Használja a mobilját, amikor buszon ül.']],
        ['Meiner Meinung nach ist die Werbung zu laut.', 'Véleményem szerint a reklám túl hangos.', [], ['Szerintem a reklám túl hangos.', 'Szerintem túl hangos a reklám.', 'Véleményem szerint túl hangos a reklám.']],
        ['Ich weiß nicht, ob er recht hat.', 'Nem tudom, hogy igaza van-e.', [], ['Nem tudom, igaza van-e.']],
        ['Wir sehen nicht fern, weil der Fernseher kaputt ist.', 'Nem tévézünk, mert elromlott a tévé.', [], ['Nem nézünk tévét, mert elromlott a tévé.', 'Nem tévézünk, mert a tévé elromlott.', 'Nem tévézünk, mert rossz a tévé.', 'Nem nézünk tévét, mert rossz a tévé.']],
        ['Es ist wichtig, dass wir Deutsch lernen.', 'Fontos, hogy németül tanuljunk.', [], ['Fontos, hogy németet tanuljunk.', 'Fontos, hogy megtanuljunk németül.']]
      ]
    },
    {
      id: 'reflexiv', title: 'Érzések: visszaható igék', icon: '🪞',
      tip: '**Visszaható igék: sich**\n\nSok németül visszaható ige a magyarban is az: sich waschen – mosakodik, sich anziehen – felöltözik. A magyar ezt **toldalékkal** jelzi (-kodik, -kedik, -ozik), a német külön szóval, a **visszaható névmással**:\n\n- ich **mich**, du **dich**, er/sie/es **sich**\n- wir **uns**, ihr **euch**, sie/Sie **sich**\n\nPéldául: Ich fühle **mich** gut. Wie fühlst du **dich**? Wir treffen **uns** um acht.\n\nSok igénél azonban a magyarban **nincs** visszaható alak, ezeket külön kell megjegyezni:\n\n- sich freuen – örülni, sich erinnern **an** – emlékezni valamire\n- sich interessieren **für** – érdeklődni valami iránt\n- sich ärgern **über** – bosszankodni valami miatt\n\nAz elöljáró is az igéhez tartozik, együtt tanuld meg: sich freuen **auf** (előre örül, vár valamit) – sich freuen **über** (örül valaminek, ami már megvan).\n\nFelszólításban is megmarad a névmás: **Beeil dich!** (Siess!), **Entschuldige dich!** (Kérj bocsánatot!)\n\nMellékmondatban a sich az alany után áll, az ige pedig a végére megy: …, weil ich **mich** nicht gut **fühle**.',
      words: [
        ['sich freuen', 'örülni'], ['sich ärgern', 'bosszankodni'], ['sich fühlen', 'érezni magát'], ['sich interessieren', 'érdeklődni'],
        ['sich erinnern', 'emlékezni'], ['sich beeilen', 'sietni'], ['sich waschen', 'mosakodni'], ['sich anziehen', 'felöltözni'],
        ['sich ausruhen', 'kipihenni magát'], ['sich entschuldigen', 'bocsánatot kérni'], ['sich treffen', 'találkozni'], ['sich langweilen', 'unatkozni'],
        ['sich verlieben', 'beleszeretni'], ['glücklich', 'boldog'], ['traurig', 'szomorú'], ['wütend', 'dühös'],
        ['nervös', 'ideges'], ['das Gefühl', 'az érzés']
      ],
      sentences: [
        ['Ich freue mich auf die Ferien.', 'Várom a szünidőt.', [], ['Előre örülök a szünidőnek.', 'Már várom a szünidőt.', 'Nagyon várom a szünidőt.']],
        ['Wie fühlst du dich heute?', 'Hogy érzed magad ma?', [], ['Ma hogy érzed magad?', 'Hogy érzi magát ma?', 'Hogy érzitek magatokat ma?']],
        ['Ich fühle mich nicht gut.', 'Nem érzem jól magam.', [], ['Nem érzem jól magamat.', 'Rosszul érzem magam.']],
        ['Er ärgert sich über das Wetter.', 'Bosszankodik az időjárás miatt.', [], ['Ő bosszankodik az időjárás miatt.', 'Bosszantja az időjárás.', 'Mérges az időjárás miatt.']],
        ['Interessierst du dich für Musik?', 'Érdekel a zene?', [], ['Érdeklődsz a zene iránt?', 'Érdekel téged a zene?', 'Érdekli a zene?']],
        ['Ich erinnere mich an meinen ersten Schultag.', 'Emlékszem az első iskolai napomra.', [], ['Emlékszem az első napomra az iskolában.', 'Emlékszem az első iskolanapomra.']],
        ['Beeil dich, der Bus kommt!', 'Siess, jön a busz!', ['Beeile dich, der Bus kommt!'], ['Siess, jön már a busz!', 'Siess, itt a busz!']],
        ['Ich wasche mich und ziehe mich an.', 'Megmosakszom és felöltözöm.', [], ['Megmosakszom, és felöltözöm.', 'Megmosakszom és felöltözök.']],
        ['Wir treffen uns um acht Uhr.', 'Nyolc órakor találkozunk.', ['Um acht Uhr treffen wir uns.'], ['Nyolckor találkozunk.']],
        ['Entschuldige dich bei deiner Schwester!', 'Kérj bocsánatot a testvéredtől!', [], ['Kérj bocsánatot a nővéredtől!', 'Kérj bocsánatot a húgodtól!', 'Kérj bocsánatot a lánytestvéredtől!']],
        ['Am Sonntag langweile ich mich oft.', 'Vasárnap gyakran unatkozom.', ['Ich langweile mich am Sonntag oft.', 'Sonntags langweile ich mich oft.'], ['Vasárnaponként gyakran unatkozom.', 'Vasárnap sokszor unatkozom.']],
        ['Warum bist du so traurig?', 'Miért vagy olyan szomorú?', [], ['Miért vagy ilyen szomorú?']]
      ]
    },
    {
      id: 'komparativ', title: 'Utazás: Komparativ, Superlativ', icon: '🏆',
      tip: '**Összehasonlítás: -er és am -sten**\n\nA német fokozás nagyon hasonlít a magyarra, csak a toldalék más:\n\n- **középfok**: alapszó + `-er`: schnell → **schneller** (gyorsabb)\n- **felsőfok**: **am** + alapszó + `-sten`: am **schnellsten** (a leggyorsabban), vagy névelővel, melléknévként: der **schnellste** Zug\n\nA magyar „-nál, -nél” és a „mint” németül egyaránt **als**: schneller **als** der Bus (gyorsabb a busznál). Egyenlőség: **so … wie** – so schön wie im Film (olyan szép, mint a filmben).\n\nA rövid, egyszótagú melléknevek többsége **umlautot** kap: alt → **älter**, jung → **jünger**, lang → **länger**, groß → **größer**, kalt → **kälter**.\n\nRendhagyók, ezeket fejből kell tudni:\n\n- gut → **besser** → am **besten**\n- viel → **mehr** → am **meisten**\n- gern → **lieber** → am **liebsten**\n- hoch → **höher** → am **höchsten**\n\nA **gern – lieber – am liebsten** a magyar „szívesen – inkább – legszívesebben” megfelelője: Ich trinke **lieber** Tee. Am **liebsten** spiele ich Fußball.\n\nFigyelj: a **mehr** (több) sosem kap végződést: **mehr** Zeit, **mehr** Geld.',
      words: [
        ['schnell', 'gyors'], ['langsam', 'lassú'], ['hoch', 'magas (hegy, épület)'], ['lang', 'hosszú'],
        ['kurz', 'rövid'], ['alt', 'öreg, régi'], ['jung', 'fiatal'], ['leicht', 'könnyű'],
        ['schwer', 'nehéz'], ['besser', 'jobb'], ['am besten', 'a legjobban'], ['mehr', 'több'],
        ['lieber', 'inkább'], ['der Fluss', 'a folyó'], ['der See', 'a tó'], ['die Insel', 'a sziget'],
        ['die Welt', 'a világ'], ['das Land', 'az ország']
      ],
      sentences: [
        ['Der Zug ist schneller als der Bus.', 'A vonat gyorsabb, mint a busz.', [], ['A vonat gyorsabb a busznál.']],
        ['Die Donau ist länger als der Rhein.', 'A Duna hosszabb, mint a Rajna.', [], ['A Duna hosszabb a Rajnánál.']],
        ['Der Balaton ist der größte See in Mitteleuropa.', 'A Balaton Közép-Európa legnagyobb tava.', [], ['A Balaton a legnagyobb tó Közép-Európában.']],
        ['Mein Bruder ist zwei Jahre älter als ich.', 'A bátyám két évvel idősebb nálam.', [], ['A bátyám két évvel idősebb, mint én.', 'A testvérem két évvel idősebb nálam.', 'A fiútestvérem két évvel idősebb nálam.']],
        ['Deutsch ist schwerer als Englisch.', 'A német nehezebb, mint az angol.', [], ['A német nehezebb az angolnál.', 'A német nyelv nehezebb, mint az angol.']],
        ['Ich trinke lieber Tee als Kaffee.', 'Inkább teát iszom, mint kávét.', [], ['Szívesebben iszom teát, mint kávét.', 'Jobban szeretem a teát, mint a kávét.']],
        ['Am liebsten spiele ich Fußball.', 'Legszívesebben focizom.', ['Ich spiele am liebsten Fußball.'], ['Legszívesebben focit játszom.', 'Legjobban focizni szeretek.']],
        ['Welches ist das schönste Land der Welt?', 'Melyik a világ legszebb országa?', [], ['Melyik a legszebb ország a világon?', 'Melyik ország a legszebb a világon?']],
        ['Die Zugspitze ist höher als der Kékes.', 'A Zugspitze magasabb, mint a Kékes.', [], ['A Zugspitze magasabb a Kékesnél.']],
        ['Ich möchte mehr reisen.', 'Többet szeretnék utazni.', [], ['Szeretnék többet utazni.']],
        ['Wer kann am besten singen?', 'Ki tud a legjobban énekelni?', [], ['Ki énekel a legjobban?']],
        ['Die Insel ist so schön wie im Film.', 'A sziget olyan szép, mint a filmben.']
      ]
    },
    {
      id: 'futur', title: 'Munka és jövő: werden', icon: '🔭',
      tip: '**Jövő idő és a werden**\n\nA magyarhoz hasonlóan a német is gyakran **jelen idővel** beszél a jövőről, ha egy időhatározó mutatja az időt: Morgen **fahre** ich nach Wien. (Holnap Bécsbe utazom.)\n\nA valódi jövő idő, a **Futur I**, a `werden` ragozott alakjából és a főnévi igenévből áll, amely a mondat **végére** kerül – mint a magyar „fog” + -ni:\n\n- Wir **werden** dir **helfen**. (Segíteni fogunk.)\n- Morgen **wird** es **regnen**. (Holnap esni fog.)\n\nA `werden` ragozása rendhagyó: ich **werde**, du **wirst**, er/sie/es **wird**, wir **werden**, ihr **werdet**, sie **werden**.\n\nA Futurt főleg **jóslásra, ígéretre, feltételezésre** használják, gyakran ilyen szavakkal: **vielleicht** (talán), **wahrscheinlich** (valószínűleg), **sicher** (biztosan).\n\nA `werden` önállóan is állhat, ekkor jelentése: **válik valamivé, lesz valami**: Vielleicht werde ich Ingenieur. (Talán mérnök leszek.) Foglalkozás előtt a magyarhoz hasonlóan **nincs névelő**: Ich bin Koch.\n\nVigyázz, a `wird` és a `will` nem ugyanaz: a **will** a wollen (akar) igéből jön! Er **will** Koch werden. = Szakács akar lenni.',
      words: [
        ['werden', 'válni valamivé'], ['der Beruf', 'a szakma'], ['die Arbeit', 'a munka'], ['arbeiten', 'dolgozni'],
        ['verdienen', 'keresni (pénzt)'], ['die Firma', 'a cég'], ['der Chef', 'a főnök'], ['der Arzt', 'az orvos'],
        ['der Ingenieur', 'a mérnök'], ['der Koch', 'a szakács'], ['der Polizist', 'a rendőr'], ['die Zukunft', 'a jövő'],
        ['die Universität', 'az egyetem'], ['studieren', 'egyetemen tanulni'], ['die Ausbildung', 'a szakképzés'], ['vielleicht', 'talán'],
        ['sicher', 'biztosan'], ['wahrscheinlich', 'valószínűleg']
      ],
      sentences: [
        ['Ich werde in Berlin studieren.', 'Berlinben fogok egyetemre járni.', [], ['Berlinben fogok egyetemen tanulni.', 'Berlinben fogok továbbtanulni.', 'Berlinben fogok tanulni.']],
        ['Was willst du später werden?', 'Mi akarsz lenni, ha felnősz?', [], ['Mi szeretnél lenni, ha felnősz?', 'Mi szeretnél lenni, ha nagy leszel?', 'Mi akarsz lenni, ha nagy leszel?', 'Mi akarsz lenni később?']],
        ['Ich möchte Koch werden.', 'Szakács szeretnék lenni.', [], ['Szakácsnak szeretnék menni.']],
        ['Morgen wird es regnen.', 'Holnap esni fog.', ['Es wird morgen regnen.'], ['Holnap esni fog az eső.', 'Holnap esik.', 'Holnap eső lesz.']],
        ['Wir werden dir helfen.', 'Segíteni fogunk neked.', [], ['Segítünk neked.', 'Segíteni fogunk.', 'Segítünk.']],
        ['Er wird wahrscheinlich viel Geld verdienen.', 'Valószínűleg sok pénzt fog keresni.', [], ['Valószínűleg sok pénzt keres majd.', 'Ő valószínűleg sok pénzt fog keresni.']],
        ['In der Zukunft werden Roboter arbeiten.', 'A jövőben robotok fognak dolgozni.', [], ['A jövőben robotok dolgoznak majd.', 'A jövőben a robotok fognak dolgozni.']],
        ['Meine Schwester macht eine Ausbildung.', 'A nővérem szakképzésre jár.', [], ['A húgom szakképzésre jár.', 'A testvérem szakképzésre jár.', 'A nővérem szakmát tanul.', 'A húgom szakmát tanul.']],
        ['Der Chef ist heute nicht in der Firma.', 'A főnök ma nincs a cégnél.', [], ['A főnök ma nincs bent a cégnél.', 'Ma nincs a főnök a cégnél.']],
        ['Vielleicht werde ich Ingenieur.', 'Talán mérnök leszek.', [], ['Lehet, hogy mérnök leszek.']],
        ['Ich arbeite gern mit Menschen.', 'Szeretek emberekkel dolgozni.', [], ['Szívesen dolgozom emberekkel.', 'Emberekkel szeretek dolgozni.']],
        ['Du wirst sicher einen guten Beruf finden.', 'Biztosan jó szakmát fogsz találni.', ['Sicher wirst du einen guten Beruf finden.'], ['Biztosan találsz egy jó szakmát.', 'Biztosan jó szakmát találsz.', 'Biztosan találni fogsz egy jó szakmát.', 'Biztosan találsz majd egy jó szakmát.']]
      ]
    },
    {
      id: 'konjunktiv', title: 'Udvariasan: Konjunktiv II', icon: '🙏',
      tip: '**Konjunktiv II: udvariasan és vágyakozva**\n\nA magyar feltételes mód (-na, -ne, -nék) a németben a **Konjunktiv II**. Két nagy feladata van: az **udvarias kérés** és az **elképzelt, nem valós helyzet**.\n\nA leggyakoribb alakok:\n\n- sein → **wäre** (lenne): Das **wäre** super!\n- haben → **hätte** (lenne neki): Ich **hätte** gern ein Einzelzimmer. (Szeretnék…)\n- können → **könnte** (tudna): **Könnten** Sie mir helfen?\n- sollen → **sollte** (kellene): Du **solltest** mehr schlafen.\n\nA többi igénél a **würde** + főnévi igenév a szokásos: Was **würden** Sie **empfehlen**? (Mit ajánlana?) Az igenév itt is a mondat **végére** kerül.\n\nFigyeld meg az umlautot: war → **wäre**, hatte → **hätte**, konnte → **könnte**. Ez a két pont teszi „feltételessé” az igét!\n\nÉttermi, szállodai helyzetekben az **Ich hätte gern…** és a **Könnten Sie…?** sokkal udvariasabb, mint a puszta „Ich will…” (akarom).\n\nFeltételes mondat: Wenn ich reich **wäre**, **würde** ich eine Weltreise machen. – Ha gazdag lennék, beutaznám a világot. Mindkét tagmondatban feltételes mód áll, akárcsak a magyarban.',
      words: [
        ['würde', 'feltételes segédige (-na, -ne)'], ['hätte', 'lenne neki'], ['wäre', 'lenne'], ['könnte', 'tudna (képes lenne)'],
        ['sollte', 'kellene'], ['die Reservierung', 'a foglalás'], ['die Rechnung', 'a számla'], ['die Speisekarte', 'az étlap'],
        ['der Kellner', 'a pincér'], ['der Wunsch', 'a kívánság'], ['reich', 'gazdag'], ['empfehlen', 'ajánlani'],
        ['buchen', 'lefoglalni'], ['das Einzelzimmer', 'az egyágyas szoba'], ['das Frühstück', 'a reggeli'], ['die Aussicht', 'a kilátás'],
        ['die Weltreise', 'a világ körüli utazás'], ['helfen', 'segíteni']
      ],
      sentences: [
        ['Könnten Sie mir bitte helfen?', 'Tudna nekem segíteni?', ['Könnten Sie mir helfen?'], ['Segítene nekem?', 'Tudna segíteni?', 'Kérem, tudna nekem segíteni?', 'Tudna nekem segíteni, kérem?']],
        ['Ich hätte gern ein Einzelzimmer.', 'Egy egyágyas szobát szeretnék.', ['Ich hätte gerne ein Einzelzimmer.'], ['Szeretnék egy egyágyas szobát.', 'Egyágyas szobát szeretnék.', 'Egy egyágyas szobát kérnék.']],
        ['Würden Sie mir die Speisekarte bringen?', 'Hozná nekem az étlapot?', ['Würden Sie mir bitte die Speisekarte bringen?'], ['Elhozná nekem az étlapot?', 'Hozná az étlapot?', 'Ideadná az étlapot?']],
        ['Die Rechnung, bitte!', 'A számlát, kérem!', [], ['Kérem a számlát!']],
        ['Was würden Sie empfehlen?', 'Mit ajánlana?', ['Was würdest du empfehlen?'], ['Ön mit ajánlana?', 'Mit ajánlanál?']],
        ['Wenn ich reich wäre, würde ich eine Weltreise machen.', 'Ha gazdag lennék, beutaznám a világot.', ['Wäre ich reich, würde ich eine Weltreise machen.'], ['Ha gazdag lennék, körbeutaznám a világot.', 'Ha gazdag lennék, világ körüli útra mennék.', 'Ha gazdag lennék, beutaznám az egész világot.']],
        ['Ich hätte gern mehr Zeit.', 'Szeretném, ha több időm lenne.', ['Ich hätte gerne mehr Zeit.'], ['Bárcsak több időm lenne!', 'Jó lenne, ha több időm lenne.', 'Szeretnék több időt.']],
        ['Du solltest mehr schlafen.', 'Többet kellene aludnod.', [], ['Többet kéne aludnod.', 'Aludnod kellene többet.']],
        ['Wir möchten ein Zimmer mit Aussicht buchen.', 'Egy kilátásos szobát szeretnénk foglalni.', [], ['Szeretnénk lefoglalni egy kilátásos szobát.', 'Kilátásos szobát szeretnénk foglalni.', 'Szeretnénk foglalni egy kilátásos szobát.']],
        ['Das wäre super!', 'Az szuper lenne!', [], ['Ez szuper lenne!', 'Az nagyszerű lenne!', 'Ez nagyszerű lenne!']],
        ['Ist das Frühstück inklusive?', 'Benne van az árban a reggeli?', [], ['A reggeli benne van az árban?', 'Az ár tartalmazza a reggelit?']],
        ['Der Kellner bringt die Rechnung.', 'A pincér hozza a számlát.', [], ['A pincér meghozza a számlát.']]
      ]
    },
    {
      id: 'melleknev', title: 'Környezet: melléknévragozás', icon: '🌳',
      tip: '**Melléknévragozás: miért változik a vége?**\n\nA magyarban a jelző **sosem** ragozódik: „szép ház”, „szép házban”, „szép házak”. A németben a főnév **előtt** álló melléknév végződést kap, és ez a névelőtől függ. Ha a melléknév az ige után áll, nincs végződés: Die Luft ist **sauber**.\n\n**1. Határozott névelő után** (der, die, das) Nominativban egyszerűen **-e**:\n\n- **der** alt**e** Baum, **die** neu**e** Flasche, **das** schmutzig**e** Wasser\n- többes számban és Dativban: **-en** (die alt**en** Bäume, im groß**en** Wald)\n\n**2. Határozatlan névelő után** (ein, eine) a melléknév mutatja meg a nemet, mert az `ein` nem árulja el:\n\n- **ein** groß**er** Wald (hímnem)\n- **eine** neu**e** Flasche (nőnem)\n- **ein** umweltfreundlich**es** Auto (semlegesnem)\n\n**3. Névelő nélkül** a melléknév veszi fel a névelő végződését: saubere Luft (die Luft), kalt**es** Wasser (das Wasser).\n\nTipp: Akkusativban csak a hímnem változik: Ich sehe **einen** groß**en** Wald. Ha bizonytalan vagy, az **-en** a leggyakoribb végződés.',
      words: [
        ['die Umwelt', 'a környezet'], ['der Müll', 'a szemét'], ['die Luft', 'a levegő'], ['der Wald', 'az erdő'],
        ['der Baum', 'a fa (növény)'], ['die Natur', 'a természet'], ['das Klima', 'az éghajlat'], ['die Energie', 'az energia'],
        ['der Strom', 'az áram'], ['die Flasche', 'a palack'], ['das Plastik', 'a műanyag'], ['sauber', 'tiszta'],
        ['schmutzig', 'piszkos'], ['sparen', 'spórolni'], ['schützen', 'védeni'], ['trennen', 'szétválogatni'],
        ['umweltfreundlich', 'környezetbarát'], ['das Tier', 'az állat']
      ],
      sentences: [
        ['Wir brauchen saubere Luft.', 'Tiszta levegőre van szükségünk.', [], ['Szükségünk van tiszta levegőre.']],
        ['Der alte Baum steht im Park.', 'Az öreg fa a parkban áll.', [], ['A parkban áll az öreg fa.', 'Az öreg fa a parkban van.']],
        ['Das ist ein großer Wald.', 'Ez egy nagy erdő.', [], ['Ez nagy erdő.']],
        ['Ich habe eine neue Flasche.', 'Van egy új palackom.', [], ['Új palackom van.', 'Van egy új kulacsom.', 'Van egy új üvegem.']],
        ['Wir trennen den Müll.', 'Szétválogatjuk a szemetet.', [], ['Szelektíven gyűjtjük a szemetet.', 'Szelektáljuk a szemetet.']],
        ['Das schmutzige Wasser ist gefährlich für Tiere.', 'A piszkos víz veszélyes az állatokra.', [], ['A szennyezett víz veszélyes az állatokra.', 'A piszkos víz veszélyes az állatoknak.', 'A piszkos víz az állatokra veszélyes.']],
        ['Wir müssen die Natur schützen.', 'Védenünk kell a természetet.', [], ['Meg kell védenünk a természetet.', 'A természetet védenünk kell.']],
        ['Ein umweltfreundliches Auto ist teuer.', 'Egy környezetbarát autó drága.', [], ['A környezetbarát autó drága.', 'Drága egy környezetbarát autó.', 'Drága a környezetbarát autó.']],
        ['Wir sparen Strom.', 'Spórolunk az árammal.', [], ['Takarékoskodunk az árammal.', 'Áramot spórolunk.']],
        ['Plastik ist schlecht für die Umwelt.', 'A műanyag rossz a környezetnek.', [], ['A műanyag árt a környezetnek.', 'A műanyag káros a környezetre.']],
        ['Ich trinke gern kaltes Wasser.', 'Szívesen iszom hideg vizet.', [], ['Szeretek hideg vizet inni.', 'Szeretem a hideg vizet.']],
        ['Das Klima wird immer wärmer.', 'Az éghajlat egyre melegebb lesz.', [], ['Egyre melegebb lesz az éghajlat.', 'Az éghajlat egyre melegszik.', 'Az éghajlat egyre melegebb.']]
      ]
    }
  ]
});
