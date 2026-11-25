/* Holland nyelvtanfolyam (A1–A2) – a js/nyelvek.js motor adatai. */
STUDIE.addLangCourse({
  id: 'holland', title: 'Holland', flag: '🇳🇱', tts: 'nl-NL', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'A hollandot kb. 24 millióan beszélik anyanyelvként Hollandiában és Belgium északi részén, Flandriában – és félúton van az angol és a német között, ezért sok szót elsőre kitalálsz: water, appel, boek, huis.',
  units: [
    {
      id: 'koszones', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: '**Kiejtés – a holland hangok**\n\n' +
        '- `g` és `ch`: mindkettő erős torokhang, mint a magyar **pech** végén: **goedemorgen**, **acht**.\n' +
        '- `ui`: ilyen a magyarban nincs, kb. kerekített **öj**: **huis** (ház), **uit** (-ból/-ből).\n' +
        '- `ij` és `ei`: ugyanaz a hang, kb. **ej**, mint a **hej** szóban: **mijn** (enyém), **klein** (kicsi).\n' +
        '- `oe` = **u**: **goed** (jó), **moeder** (anya).\n' +
        '- `eu` = hosszú **ö**: **leuk** (klassz).\n' +
        '- `aa`, `ee`, `oo` = hosszú magánhangzók: **naam** (név), **twee** (kettő).\n' +
        '- `w` kb. v, a szó eleji `v` gyakran f-szerű: **vader** (apa).\n\n' +
        '**Flamand**: Belgium északi részén, Flandriában is hollandul beszélnek, ezt flamandnak (Vlaams) hívják. Az írás ugyanaz, de a kiejtés lágyabb (a g is!), és néhány szó eltér, pl. a sült krumpli Hollandiában **patat**, Flandriában **frieten**.',
      words: [
        ['hallo', 'szia'], ['goedemorgen', 'jó reggelt'], ['goedemiddag', 'jó napot (délután)'], ['goedenavond', 'jó estét'],
        ['goedenacht', 'jó éjszakát'], ['dag', 'viszlát'], ['tot ziens', 'viszontlátásra'], ['ja', 'igen'], ['nee', 'nem'],
        ['dank je', 'köszönöm'], ['alsjeblieft', 'kérlek (tessék)'], ['sorry', 'bocsánat'], ['Hoe gaat het?', 'hogy vagy?'],
        ['goed', 'jól'], ['de naam', 'a név'], ['de vriend', 'a barát'], ['de vriendin', 'a barátnő'],
        ['Hongarije', 'Magyarország'], ['Nederland', 'Hollandia'], ['Nederlands', 'holland (nyelv)']
      ],
      sentences: [
        ['Hallo, ik ben Anna.', 'Szia, Anna vagyok.', ['Hallo, ik heet Anna.', 'Hallo, mijn naam is Anna.'], ['Szia, Annának hívnak.', 'Szia, a nevem Anna.']],
        ['Ik heet Tom.', 'Tomnak hívnak.', ['Ik ben Tom.', 'Mijn naam is Tom.'], ['Tom vagyok.', 'A nevem Tom.']],
        ['Hoe heet jij?', 'Hogy hívnak?', ['Hoe heet je?', 'Wat is jouw naam?', 'Hoe heet u?'], ['Mi a neved?', 'Téged hogy hívnak?', 'Önt hogy hívják?']],
        ['Hoe gaat het met je?', 'Hogy vagy?', ['Hoe gaat het?', 'Hoe gaat het met jou?', 'Hoe gaat het met u?'], ['Hogy van?']],
        ['Het gaat goed, dank je.', 'Jól vagyok, köszönöm.', ['Goed, dank je.', 'Het gaat goed, dank u.'], ['Köszönöm, jól vagyok.', 'Jól, köszönöm.']],
        ['Goedemorgen, Tom!', 'Jó reggelt, Tom!'],
        ['Ik kom uit Hongarije.', 'Magyarországról jövök.', [], ['Magyarországról származom.', 'Magyarországról jöttem.']],
        ['Ik woon in Nederland.', 'Hollandiában lakom.', [], ['Hollandiában élek.']],
        ['Dit is mijn vriend Ben.', 'Ő a barátom, Ben.', ['Dit is Ben, mijn vriend.'], ['Ez a barátom, Ben.']],
        ['Spreek jij Nederlands?', 'Beszélsz hollandul?', ['Spreek je Nederlands?', 'Spreekt u Nederlands?'], ['Beszél hollandul?']],
        ['Ja, een beetje.', 'Igen, egy kicsit.', [], ['Igen, kicsit.']],
        ['Tot ziens, Anna!', 'Viszontlátásra, Anna!']
      ]
    },
    {
      id: 'szamok', title: 'Számok', icon: '🔢',
      tip: '**Számok – fordított sorrend, mint a németben**\n\n' +
        '20 fölött a holland előbb az egyest mondja, aztán a tízest, és az egészet egybeírja: **eenentwintig** = egy-és-húsz (21), **tweeëndertig** (32), **vijfenveertig** (45). Az ë két pontja azt jelzi, hogy ott új szótag kezdődik.\n\n' +
        '- 13–19: **dertien**, **veertien**, **vijftien**… (a -tien a magyar „tizen”).\n' +
        '- Tízesek: **twintig, dertig, veertig, vijftig, zestig, zeventig, tachtig, negentig**.\n' +
        '- **honderd** = 100, **duizend** = 1000.\n\n' +
        'Figyelj a **één** (egy, számként) és az **een** (névelő, röviden „ön”-szerűen ejtve) különbségére! Az ékezet itt csak a kiejtést jelzi.\n\n' +
        'Életkor: **Ik ben twaalf jaar.** – szó szerint „tizenkét év vagyok”.',
      words: [
        ['één', 'egy'], ['twee', 'kettő'], ['drie', 'három'], ['vier', 'négy'], ['vijf', 'öt'], ['zes', 'hat'],
        ['zeven', 'hét'], ['acht', 'nyolc'], ['negen', 'kilenc'], ['tien', 'tíz'], ['elf', 'tizenegy'], ['twaalf', 'tizenkettő'],
        ['dertien', 'tizenhárom'], ['twintig', 'húsz'], ['eenentwintig', 'huszonegy'], ['dertig', 'harminc'], ['honderd', 'száz']
      ],
      sentences: [
        ['Ik ben twaalf jaar.', 'Tizenkét éves vagyok.', ['Ik ben twaalf jaar oud.']],
        ['Hoe oud ben jij?', 'Hány éves vagy?', ['Hoe oud ben je?', 'Hoe oud bent u?'], ['Ön hány éves?']],
        ['Twee plus drie is vijf.', 'Kettő meg három az öt.', ['Twee en drie is vijf.'], ['Kettő plusz három az öt.', 'Kettő meg három öt.']],
        ['Tien min vier is zes.', 'Tízből négy az hat.', [], ['Tíz mínusz négy az hat.']],
        ['Het kost twintig euro.', 'Húsz euróba kerül.', [], ['Ez húsz euróba kerül.', 'Húsz euró.']],
        ['Wat kost het?', 'Mennyibe kerül?', ['Hoeveel kost het?'], ['Ez mennyibe kerül?']],
        ['Ik heb vijf euro.', 'Öt eurom van.', [], ['Van öt eurom.']],
        ['Zij is dertien jaar.', 'Ő tizenhárom éves.', ['Ze is dertien jaar.', 'Zij is dertien jaar oud.'], ['Tizenhárom éves.']],
        ['Twintig plus een is eenentwintig.', 'Húsz meg egy az huszonegy.', ['Twintig en een is eenentwintig.'], ['Húsz plusz egy az huszonegy.']],
        ['Ik tel tot tien.', 'Tízig számolok.', [], ['Elszámolok tízig.']]
      ]
    },
    {
      id: 'csalad', title: 'Család', icon: '👨‍👩‍👧',
      tip: '**De vagy het? – két névelő**\n\n' +
        'A hollandban két határozott névelő van:\n\n' +
        '- **de**: a főnevek kb. kétharmada: **de moeder**, **de vader**, **de hond**.\n' +
        '- **het**: a semlegesnemű szavak: **het kind**, **het huis**, **het meisje**.\n\n' +
        'Jó hír: többes számban **mindig de**: **de kinderen**. A -je végű kicsinyítő szavak pedig mindig **het**-esek – ezért **het meisje** (a lány nyelvtanilag semleges!).\n\n' +
        'Rossz hír: biztos szabály nincs, ezért **minden főnevet névelővel tanulj**, ahogy a szólistában látod. A határozatlan névelő mindkettőnél **een**: een moeder, een kind.\n\n' +
        'Birtoklás: **mijn** (az én…m), **jouw/je** (a te…d), **zijn** (az ő…e, fiúé), **haar** (az ő…e, lányé), **ons/onze** (a mi…nk). Magyarul ezt raggal mondjuk: anyá**m** = **mijn** moeder.',
      words: [
        ['de moeder', 'az anya'], ['de vader', 'az apa'], ['de ouders', 'a szülők'], ['de broer', 'a fiútestvér'], ['de zus', 'a lánytestvér'],
        ['het kind', 'a gyerek'], ['de oma', 'a nagymama'], ['de opa', 'a nagypapa'], ['de oom', 'a nagybácsi'], ['de tante', 'a nagynéni'],
        ['de jongen', 'a fiú'], ['het meisje', 'a lány'], ['de familie', 'a család'], ['de hond', 'a kutya'], ['de kat', 'a macska'],
        ['groot', 'nagy'], ['klein', 'kicsi'], ['lief', 'kedves']
      ],
      sentences: [
        ['Dit is mijn moeder.', 'Ő az anyám.', [], ['Ez az anyám.', 'Ő az anyukám.']],
        ['Mijn broer heet Tim.', 'A bátyámat Timnek hívják.', [], ['Az öcsémet Timnek hívják.', 'A fiútestvéremet Timnek hívják.']],
        ['Ik heb een zus.', 'Van egy lánytestvérem.', [], ['Van egy nővérem.', 'Van egy húgom.', 'Egy lánytestvérem van.']],
        ['Wij hebben een hond.', 'Van egy kutyánk.', ['We hebben een hond.'], ['Egy kutyánk van.']],
        ['De kat is klein.', 'A macska kicsi.'],
        ['Het meisje is lief.', 'A lány kedves.'],
        ['Mijn opa en oma wonen in Utrecht.', 'A nagypapám és a nagymamám Utrechtben laknak.', [], ['A nagyapám és a nagyanyám Utrechtben laknak.', 'A nagyszüleim Utrechtben laknak.']],
        ['Hoe heet jouw vader?', 'Hogy hívják az apádat?', ['Hoe heet je vader?'], ['Mi az apád neve?', 'Hogy hívják az apukádat?']],
        ['Mijn ouders zijn lief.', 'A szüleim kedvesek.'],
        ['Heb jij broers of zussen?', 'Vannak testvéreid?', ['Heb je broers of zussen?'], ['Van testvéred?']],
        ['Het kind is tien jaar.', 'A gyerek tízéves.', ['Het kind is tien jaar oud.'], ['A gyerek tíz éves.']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**Többes szám: -en vagy -s**\n\n' +
        'A magyar -k helyett a holland két fő végződést használ:\n\n' +
        '- **-en** (a leggyakoribb): boek → **boeken**, stoel → **stoelen**.\n' +
        '- **-s**: főleg a hangsúlytalan -el, -er, -em, -je végű szavaknál: tafel → **tafels**, computer → **computers**, meisje → **meisjes**.\n' +
        '- magánhangzóra végződő szavaknál **\'s**: auto → **auto\'s**, foto → **foto\'s**.\n\n' +
        'Helyesírás: rövid magánhangzó után a mássalhangzó megduplázódik (pen → **pennen**, klas → **klassen**), a hosszú magánhangzót viszont nyílt szótagban egy betűvel írjuk (potlood → **potloden**, leraar → **leraren**).\n\n' +
        'Kivétel: kind → **kinderen**.\n\n' +
        'Figyelem: számnév után a holland többes számot használ, a magyar nem! **twee boeken** = két könyv.',
      words: [
        ['de school', 'az iskola'], ['de klas', 'az osztály'], ['de leraar', 'a tanár'], ['de lerares', 'a tanárnő'], ['de leerling', 'a diák'],
        ['het boek', 'a könyv'], ['de pen', 'a toll'], ['het potlood', 'a ceruza'], ['het schrift', 'a füzet'], ['de tas', 'a táska'],
        ['de tafel', 'az asztal'], ['de stoel', 'a szék'], ['het schoolbord', 'a tábla'], ['de computer', 'a számítógép'], ['de les', 'a tanóra'],
        ['het huiswerk', 'a házi feladat'], ['leren', 'tanulni'], ['lezen', 'olvasni'], ['schrijven', 'írni']
      ],
      sentences: [
        ['Ik heb twee boeken.', 'Két könyvem van.', [], ['Van két könyvem.']],
        ['De lerares heet Sanne.', 'A tanárnőt Sannének hívják.', [], ['A tanárnő neve Sanne.']],
        ['Waar is mijn pen?', 'Hol van a tollam?'],
        ['Mijn tas is groot.', 'A táskám nagy.'],
        ['De leerlingen lezen een boek.', 'A diákok egy könyvet olvasnak.', [], ['A diákok könyvet olvasnak.']],
        ['Ik schrijf in mijn schrift.', 'A füzetembe írok.', [], ['Írok a füzetembe.']],
        ['Wij hebben veel huiswerk.', 'Sok házi feladatunk van.', ['We hebben veel huiswerk.'], ['Sok a házi feladatunk.', 'Sok leckénk van.']],
        ['Er zijn dertig stoelen in de klas.', 'Harminc szék van az osztályban.', ['In de klas zijn dertig stoelen.'], ['Az osztályban harminc szék van.', 'Harminc szék van a tanteremben.']],
        ['Ik leer Nederlands.', 'Hollandul tanulok.', [], ['Hollandot tanulok.', 'Holland nyelvet tanulok.']],
        ['De computer staat op de tafel.', 'A számítógép az asztalon van.', [], ['A számítógép az asztalon áll.']],
        ['Ik heb drie potloden.', 'Három ceruzám van.', [], ['Van három ceruzám.']],
        ['De les begint om negen uur.', 'Az óra kilenckor kezdődik.', [], ['Az óra kilenc órakor kezdődik.', 'A tanóra kilenckor kezdődik.']]
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🧀',
      tip: '**Kicsinyítés: -je**\n\n' +
        'A hollandok imádják a kicsinyítő képzőt – sokkal gyakrabban használják, mint mi a -ka/-ke, -cska/-cske képzőt. Nem mindig jelent kicsit: barátságosabbá, lazábbá teszi a szót.\n\n' +
        '- alapeset **-je**: brood → **broodje** (zsemle, szendvics), kop → **kopje** (csésze), huis → **huisje** (házikó).\n' +
        '- magánhangzó vagy -l, -n, -r után gyakran **-tje**: stoel → **stoeltje**, tafel → **tafeltje**.\n' +
        '- -m után **-pje**: boom (fa) → **boompje**.\n' +
        '- rövid magánhangzó + l, n, r, m, ng után **-etje**: bal (labda) → **balletje**, ring → **ringetje**.\n\n' +
        'Minden -je végű szó **het**-es: **het broodje**, **het kopje**.\n\n' +
        'Tipikus holland reggeli: vajas kenyér **hagelslag**-gel, vagyis csokiszórással! Ha valami ízlik, a varázsszó: **lekker!**',
      words: [
        ['het brood', 'a kenyér'], ['het broodje', 'a zsemle (szendvics)'], ['de kaas', 'a sajt'], ['de melk', 'a tej'], ['het water', 'a víz'],
        ['de koffie', 'a kávé'], ['de thee', 'a tea'], ['het ei', 'a tojás'], ['de appel', 'az alma'], ['de banaan', 'a banán'],
        ['de soep', 'a leves'], ['de patat', 'a sült krumpli'], ['de boter', 'a vaj'], ['de suiker', 'a cukor'], ['het ontbijt', 'a reggeli'],
        ['het kopje', 'a csésze'], ['eten', 'enni'], ['drinken', 'inni'], ['lekker', 'finom']
      ],
      sentences: [
        ['Ik eet een broodje kaas.', 'Egy sajtos szendvicset eszem.', [], ['Sajtos szendvicset eszem.', 'Egy sajtos zsemlét eszem.']],
        ['Wil jij een kopje thee?', 'Kérsz egy csésze teát?', ['Wil je een kopje thee?', 'Wilt u een kopje thee?'], ['Kér egy csésze teát?']],
        ['Ik drink melk.', 'Tejet iszom.', [], ['Én tejet iszom.']],
        ['De soep is lekker.', 'A leves finom.'],
        ['Ik heb honger.', 'Éhes vagyok.'],
        ['Wij eten patat.', 'Sült krumplit eszünk.', ['We eten patat.'], ['Hasábburgonyát eszünk.']],
        ['Een glas water, alsjeblieft.', 'Egy pohár vizet kérek.', ['Een glas water, alstublieft.'], ['Egy pohár vizet, kérem.', 'Egy pohár vizet kérek szépen.']],
        ['Ik eet een appel.', 'Egy almát eszem.', [], ['Almát eszem.']],
        ['Koffie met melk en suiker.', 'Kávé tejjel és cukorral.'],
        ['Het ontbijt is om acht uur.', 'A reggeli nyolckor van.', [], ['A reggeli nyolc órakor van.', 'Nyolckor van reggeli.']],
        ['Brood met boter is lekker.', 'A vajas kenyér finom.', [], ['Finom a vajas kenyér.']]
      ]
    },
    {
      id: 'szinek', title: 'Színek és ruhák', icon: '👕',
      tip: '**Igeragozás – csak három alak**\n\n' +
        'A magyar ige jelen időben hat alakot vesz fel (viselek, viselsz, visel…), a holland legfeljebb hármat. Vedd le a főnévi igenévről az -en végződést, ez a **tő**:\n\n' +
        '- **ik** draag – csak a tő\n' +
        '- **jij/u** draagt, **hij/zij** draagt – tő + t\n' +
        '- **wij/jullie/zij** dragen – mint a főnévi igenév\n\n' +
        'Ha a **jij** az ige mögé kerül (kérdésben), a -t elmarad: **Jij draagt** → **Draag jij?** Ugyanígy: **Heb jij een trui?**\n\n' +
        'Két fontos rendhagyó ige:\n\n' +
        '- **zijn** (lenni): ik ben, jij bent, hij is, wij zijn\n' +
        '- **hebben** (van valamije): ik heb, jij hebt, hij heeft, wij hebben\n\n' +
        'Melléknév főnév előtt: általában **-e** végződést kap: **een rode jas**, **de witte trui**. Kivétel: **een** + het-szó: **een wit T-shirt**.',
      words: [
        ['rood', 'piros'], ['blauw', 'kék'], ['geel', 'sárga'], ['groen', 'zöld'], ['zwart', 'fekete'], ['wit', 'fehér'], ['grijs', 'szürke'],
        ['bruin', 'barna'], ['oranje', 'narancssárga'], ['roze', 'rózsaszín'], ['de kleur', 'a szín'], ['de broek', 'a nadrág'], ['de jas', 'a kabát'],
        ['de trui', 'a pulóver'], ['het T-shirt', 'a póló'], ['de jurk', 'a ruha (női)'], ['de schoen', 'a cipő'], ['de rok', 'a szoknya'],
        ['de sok', 'a zokni'], ['dragen', 'viselni']
      ],
      sentences: [
        ['Ik draag een blauwe broek.', 'Kék nadrág van rajtam.', [], ['Kék nadrágot viselek.', 'Kék nadrágot hordok.']],
        ['Zij draagt een rode jurk.', 'Piros ruha van rajta.', ['Ze draagt een rode jurk.'], ['Piros ruhát visel.', 'Ő piros ruhát visel.']],
        ['Mijn jas is zwart.', 'A kabátom fekete.'],
        ['Wat is jouw lievelingskleur?', 'Mi a kedvenc színed?', ['Wat is je lievelingskleur?']],
        ['Mijn lievelingskleur is groen.', 'A kedvenc színem a zöld.', [], ['A kedvenc színem zöld.']],
        ['Heb jij een witte trui?', 'Van fehér pulóvered?', ['Heb je een witte trui?'], ['Van egy fehér pulóvered?']],
        ['De schoenen zijn bruin.', 'A cipők barnák.'],
        ['Hij heeft een grijze jas.', 'Szürke kabátja van.', [], ['Neki szürke kabátja van.']],
        ['Jullie dragen witte T-shirts.', 'Fehér pólót viseltek.', [], ['Fehér póló van rajtatok.', 'Fehér pólókat viseltek.']],
        ['Het T-shirt is oranje.', 'A póló narancssárga.'],
        ['Is de rok roze?', 'Rózsaszín a szoknya?', [], ['A szoknya rózsaszín?']]
      ]
    },
    {
      id: 'ido', title: 'Idő, napok, évszakok', icon: '📅',
      tip: '**Szórend: az ige mindig a második**\n\n' +
        'A magyarban elég szabad a szórend, a hollandban nem! Kijelentő mondatban a ragozott ige **mindig a második helyen** áll (V2-szabály):\n\n' +
        '- **Ik ga** morgen naar school.\n' +
        '- **Morgen ga ik** naar school. – ha az időhatározó kerül előre, az alany az ige mögé csúszik!\n' +
        '- **Op zaterdag speel ik** voetbal.\n\n' +
        'A „második hely” nem a második szót jelenti, hanem a második mondatrészt: az **Op zaterdag** egy egység.\n\n' +
        'Eldöntendő kérdésben az ige áll elöl: **Ga jij** naar school?\n\n' +
        'A napok és hónapok nevét kisbetűvel írjuk: **maandag**, **mei**.\n\n' +
        'Óra: **Hoe laat is het?** – Hány óra van? **Het is drie uur.** A **half vier** pedig fél négy (3:30) – pont, mint magyarul!',
      words: [
        ['maandag', 'hétfő'], ['dinsdag', 'kedd'], ['woensdag', 'szerda'], ['donderdag', 'csütörtök'], ['vrijdag', 'péntek'],
        ['zaterdag', 'szombat'], ['zondag', 'vasárnap'], ['vandaag', 'ma'], ['morgen', 'holnap'], ['gisteren', 'tegnap'],
        ['de week', 'a hét (7 nap)'], ['de dag', 'a nap'], ['de maand', 'a hónap'], ['het jaar', 'az év'], ['het weekend', 'a hétvége'],
        ['de zomer', 'a nyár'], ['de winter', 'a tél'], ['het uur', 'az óra (60 perc)']
      ],
      sentences: [
        ['Vandaag is het maandag.', 'Ma hétfő van.', ['Het is vandaag maandag.']],
        ['Morgen ga ik naar school.', 'Holnap iskolába megyek.', ['Ik ga morgen naar school.'], ['Holnap megyek iskolába.']],
        ['Op zaterdag speel ik voetbal.', 'Szombaton focizom.', ['Ik speel op zaterdag voetbal.', 'Zaterdag speel ik voetbal.'], ['Szombaton futballozom.']],
        ['In de zomer is het warm.', 'Nyáron meleg van.', ['Het is warm in de zomer.']],
        ['In de winter is het koud.', 'Télen hideg van.', ['Het is koud in de winter.']],
        ['Een week heeft zeven dagen.', 'Egy héten hét nap van.', [], ['Egy hét hét napból áll.', 'A hét hét napból áll.']],
        ['Het weekend begint op vrijdag.', 'A hétvége pénteken kezdődik.'],
        ['Hoe laat is het?', 'Hány óra van?', [], ['Mennyi az idő?']],
        ['Het is drie uur.', 'Három óra van.'],
        ['Gisteren was het zondag.', 'Tegnap vasárnap volt.', ['Het was gisteren zondag.']],
        ['Mijn verjaardag is in mei.', 'A születésnapom májusban van.'],
        ['Op woensdag heb ik vrij.', 'Szerdán szabad vagyok.', ['Ik heb op woensdag vrij.', 'Woensdag heb ik vrij.'], ['Szerdán szabadnapos vagyok.']]
      ]
    },
    {
      id: 'otthon', title: 'Otthon', icon: '🏠',
      tip: '**Tagadás: niet vagy geen?**\n\n' +
        'A magyar „nem” és „nincs” helyett a holland két szót használ:\n\n' +
        '- **geen** = „nincs / egy sem”: az **een**-es vagy névelő nélküli főnevet tagadja: Ik heb een tuin → Ik heb **geen** tuin (Nincs kertem). Ik drink **geen** koffie.\n' +
        '- **niet** = minden mást: igét, melléknevet, határozott névelős főnevet.\n\n' +
        'Hová kerül a niet?\n\n' +
        '- melléknév elé: Het huis is **niet** groot.\n' +
        '- helyhatározó elé: Ik woon **niet** in Amsterdam.\n' +
        '- egyébként a mondat végére: Ik zie de kat **niet**. (Nem látom a macskát.)\n\n' +
        'A magyarban a „nem” általában az ige elé kerül – a hollandban gyakran a mondat végére vándorol, ezért figyelj!\n\n' +
        '**Er is / er zijn** = van / vannak (valahol): **Er is geen lamp.** – Nincs lámpa.',
      words: [
        ['het huis', 'a ház'], ['de kamer', 'a szoba'], ['de slaapkamer', 'a hálószoba'], ['de keuken', 'a konyha'], ['de badkamer', 'a fürdőszoba'],
        ['de woonkamer', 'a nappali'], ['de tuin', 'a kert'], ['de deur', 'az ajtó'], ['het raam', 'az ablak'], ['het bed', 'az ágy'],
        ['de bank', 'a kanapé'], ['de kast', 'a szekrény'], ['de lamp', 'a lámpa'], ['de trap', 'a lépcső'], ['het dak', 'a tető'],
        ['mooi', 'szép'], ['oud', 'régi'], ['nieuw', 'új'], ['wonen', 'lakni']
      ],
      sentences: [
        ['Wij wonen in een klein huis.', 'Egy kis házban lakunk.', ['We wonen in een klein huis.'], ['Kis házban lakunk.']],
        ['Ik heb geen tuin.', 'Nincs kertem.'],
        ['Het huis is niet groot.', 'A ház nem nagy.'],
        ['Mijn kamer is mooi.', 'A szobám szép.'],
        ['De keuken is niet nieuw.', 'A konyha nem új.'],
        ['Er is geen lamp in de badkamer.', 'A fürdőszobában nincs lámpa.', [], ['Nincs lámpa a fürdőszobában.']],
        ['De kat slaapt op de bank.', 'A macska a kanapén alszik.'],
        ['Het raam is open.', 'Az ablak nyitva van.'],
        ['Mijn bed staat in de slaapkamer.', 'Az ágyam a hálószobában van.', [], ['Az ágyam a hálószobában áll.']],
        ['Wij eten in de keuken.', 'A konyhában eszünk.', ['We eten in de keuken.']],
        ['Ik woon niet in Amsterdam.', 'Nem Amszterdamban lakom.'],
        ['De deur is dicht.', 'Az ajtó zárva van.', [], ['Az ajtó csukva van.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚲',
      tip: '**Tegezés és magázás: jij, je, u**\n\n' +
        '- **jij** (hangsúlyos) és **je** (hangsúlytalan) = te. A hollandok nagyon sokat tegeződnek, sokszor még a boltban is.\n' +
        '- **u** = Ön, maga – egyes és többes számban is. Idősebbekkel, idegen felnőttekkel, hivatalos helyzetben használd. Az ige ilyenkor úgy ragozódik, mint jij után: **u bent**, **u hebt** (vagy **u heeft**), **Kunt u…?**\n' +
        '- **jullie** = ti.\n\n' +
        'Kérés: **alsjeblieft** (tegezve) / **alstublieft** (magázva) – ezt mondod akkor is, amikor odaadsz valamit („tessék”).\n\n' +
        'Útbaigazítás: **links** (balra), **rechts** (jobbra), **rechtdoor** (egyenesen).\n\n' +
        'Érdekesség: Hollandiában több bicikli van, mint ember – kb. 23 millió kerékpár jut a kb. 18 millió lakosra. Nem csoda, hogy a **fiets** az egyik legfontosabb szó!',
      words: [
        ['de stad', 'a város'], ['de straat', 'az utca'], ['de fiets', 'a bicikli'], ['de bus', 'a busz'], ['de trein', 'a vonat'],
        ['de auto', 'az autó'], ['het station', 'a pályaudvar'], ['de winkel', 'a bolt'], ['de markt', 'a piac'], ['het museum', 'a múzeum'],
        ['de bibliotheek', 'a könyvtár'], ['het ziekenhuis', 'a kórház'], ['de brug', 'a híd'], ['links', 'balra'], ['rechts', 'jobbra'],
        ['rechtdoor', 'egyenesen'], ['ver', 'messze'], ['dichtbij', 'közel'], ['het kaartje', 'a jegy']
      ],
      sentences: [
        ['Waar is het station?', 'Hol van a pályaudvar?', [], ['Hol van az állomás?']],
        ['Pardon, waar is het museum?', 'Elnézést, hol van a múzeum?', [], ['Bocsánat, hol van a múzeum?']],
        ['Ga rechtdoor en dan links.', 'Menj egyenesen, aztán balra.', [], ['Menjen egyenesen, aztán balra.', 'Menj egyenesen, majd balra.']],
        ['Is het ver?', 'Messze van?', [], ['Ez messze van?']],
        ['Nee, het is dichtbij.', 'Nem, közel van.'],
        ['Ik ga met de fiets naar school.', 'Biciklivel megyek iskolába.', ['Ik fiets naar school.'], ['Biciklivel járok iskolába.']],
        ['De trein vertrekt om tien uur.', 'A vonat tízkor indul.', [], ['A vonat tíz órakor indul.']],
        ['Een kaartje naar Amsterdam, alstublieft.', 'Egy jegyet kérek Amszterdamba.', ['Een kaartje naar Amsterdam, alsjeblieft.'], ['Egy jegyet Amszterdamba, kérem.']],
        ['Kunt u mij helpen?', 'Tudna segíteni?', ['Kun je me helpen?', 'Kun jij mij helpen?'], ['Tudna nekem segíteni?', 'Tudsz segíteni?']],
        ['Wat kost dit?', 'Ez mennyibe kerül?', [], ['Mennyibe kerül ez?']],
        ['De bus is laat.', 'Késik a busz.', [], ['A busz késik.']],
        ['De markt is op zaterdag.', 'A piac szombaton van.']
      ]
    },
    {
      id: 'hobbi', title: 'Hobbi és múlt idő', icon: '⚽',
      tip: '**Múlt idő: hebben/zijn + ge-s alak**\n\n' +
        'Beszédben a holland múlt időt leggyakrabban így képzik: **hebben** (vagy **zijn**) ragozva + a **ge-** kezdetű alak a mondat **végén**:\n\n' +
        '- Ik **heb** gisteren **gevoetbald**. – Tegnap fociztam.\n' +
        '- Wij **hebben** samen **gezongen**. – Együtt énekeltünk.\n\n' +
        'Szabályos igéknél: **ge + tő + d/t**. Hogy -t vagy -d? Ha a tő utolsó hangja benne van a **\'t kofschip** szóban (t, k, f, s, ch, p), akkor **-t**: dansen → **gedanst**, fietsen → **gefietst**. Különben **-d**: spelen → **gespeeld**.\n\n' +
        'Rendhagyók, ezeket külön kell megtanulni: zwemmen → **gezwommen**, zingen → **gezongen**, zien → **gezien**, lezen → **gelezen**.\n\n' +
        'Ha elmész valahová, **zijn** a segédige: Wij **zijn** naar het strand **gegaan**.\n\n' +
        'Tervek: **gaan** + főnévi igenév: Morgen **ga** ik **fietsen**.',
      words: [
        ['voetballen', 'focizni'], ['zwemmen', 'úszni'], ['fietsen', 'biciklizni'], ['tekenen', 'rajzolni'], ['dansen', 'táncolni'],
        ['zingen', 'énekelni'], ['gamen', 'videojátékozni'], ['spelen', 'játszani'], ['de muziek', 'a zene'], ['de sport', 'a sport'],
        ['het spel', 'a játék'], ['de film', 'a film'], ['de vakantie', 'a szünidő'], ['het strand', 'a strand'], ['de zee', 'a tenger'],
        ['leuk', 'klassz'], ['vorige week', 'múlt héten'], ['de hobby', 'a hobbi']
      ],
      sentences: [
        ['Ik heb gisteren gevoetbald.', 'Tegnap fociztam.', ['Gisteren heb ik gevoetbald.'], ['Tegnap futballoztam.']],
        ['Wij hebben in de zee gezwommen.', 'Úsztunk a tengerben.', ['We hebben in de zee gezwommen.'], ['A tengerben úsztunk.']],
        ['Zij heeft een film gezien.', 'Látott egy filmet.', ['Ze heeft een film gezien.'], ['Megnézett egy filmet.', 'Ő látott egy filmet.']],
        ['Ik vind dansen leuk.', 'Szeretek táncolni.', [], ['Szeretem a táncot.']],
        ['Mijn hobby is tekenen.', 'A hobbim a rajzolás.', [], ['Rajzolás a hobbim.']],
        ['Hou jij van muziek?', 'Szereted a zenét?', ['Hou je van muziek?', 'Houdt u van muziek?'], ['Szereti a zenét?']],
        ['Vorige week zijn we naar het strand gegaan.', 'Múlt héten a strandra mentünk.', ['We zijn vorige week naar het strand gegaan.'], ['Múlt héten elmentünk a strandra.']],
        ['De vakantie was leuk.', 'A szünidő klassz volt.', [], ['Klassz volt a szünidő.', 'Jó volt a vakáció.']],
        ['Wij hebben samen gezongen.', 'Együtt énekeltünk.', ['We hebben samen gezongen.']],
        ['Ik heb een boek gelezen.', 'Olvastam egy könyvet.', [], ['Elolvastam egy könyvet.']],
        ['Morgen ga ik fietsen.', 'Holnap biciklizni megyek.', ['Ik ga morgen fietsen.'], ['Holnap megyek biciklizni.']]
      ]
    }
  ]
});
