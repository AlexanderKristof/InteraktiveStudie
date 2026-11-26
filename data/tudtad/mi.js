/* Tudtad? – mesterséges intelligencia. Formátum: js/tudtad.js. Időtálló, ellenőrzött történeti tények. */
STUDIE.addFacts([
  {
    id: 'mi-kempelen-torok', cat: 'informatika',
    q: 'a 18. század leghíresebb „sakkautomatáját” egy **magyar feltaláló, Kempelen Farkas** építette – és valójában egy **ember** ült benne?',
    why: 'Kempelen Farkas 1769-ben készítette el a „Törököt”, egy gépies, török ruhás bábut, amely sakkasztal mögött ülve legyőzte az embereket, és Mária Terézia udvarában mutatták be először. Évtizedekig járta Európát és Amerikát. Ma tudjuk, hogy a szekrényben egy **ügyes sakkozó rejtőzött**, aki mágnesek és karok segítségével irányította a bábut.\n\nA „gépnek álcázott ember” története ma is tanulságos: egy rendszer attól, hogy okosnak **tűnik**, még nem biztos, hogy úgy működik, ahogy gondoljuk.',
    links: ['lecke:mi/tortenet', 'lecke:mi/mi-az-mi']
  },
  {
    id: 'mi-turing-jatek', cat: 'informatika',
    q: 'Alan Turing 1950-ben azt javasolta: ne azt kérdezzük, **„gondolkodik-e” a gép**, hanem hogy meg tudjuk-e **különböztetni egy embertől** írásos beszélgetésben?',
    why: 'Turing „Számítógépek és intelligencia” című cikkében az **utánzási játékot** javasolta: egy kérdező írásban beszélget egy emberrel és egy géppel, és ki kell találnia, melyik melyik. Ez lett a híres **Turing-teszt**.\n\nA mai csevegőrobotok rövid beszélgetésben gyakran megtévesztően emberinek tűnnek – ezért sok kutató úgy gondolja, hogy a teszt inkább a **nyelvi utánzás** mércéje, mint a valódi értelemé.',
    links: ['lecke:mi/tortenet']
  },
  {
    id: 'mi-dartmouth', cat: 'informatika',
    q: 'a „mesterséges intelligencia” kifejezés egy **nyári kutatótábor pályázatából** származik?',
    why: 'John McCarthy és társai 1955-ben pályázatot írtak egy 1956 nyarán, a Dartmouth College-ban tartandó kutatótáborra. Ebben szerepelt először az „artificial intelligence” kifejezés. A szervezők meglehetősen optimisták voltak: azt remélték, hogy egy nyár alatt jelentős előrelépést érnek el abban, hogy a gépek nyelvet használjanak és fogalmakat alkossanak.\n\nAz azóta eltelt évtizedek megmutatták, hogy ez sokkal nehezebb – de a tábort ma is az MI-kutatás születésének tartják.',
    links: ['lecke:mi/tortenet']
  },
  {
    id: 'mi-perceptron-xor', cat: 'informatika',
    q: 'egyetlen mesterséges neuron még azt sem tudja megtanulni, hogy **„pontosan az egyik igaz a kettő közül”** (XOR)?',
    why: 'Frank Rosenblatt **perceptronja** (1958) nagy lelkesedést keltett: tanulni tudott! Marvin Minsky és Seymour Papert azonban 1969-ben megmutatta, hogy egyetlen ilyen neuron csak **egyenes vonallal** tud elválasztani, az XOR mintát pedig így nem lehet. A csalódás hozzájárult az első **„MI-télhez”**, amikor elapadt a kutatási pénz.\n\nA megoldás: **több réteg**. Ezt a lecke hálójátszóterén ki is próbálhatod.',
    links: ['lecke:mi/neuralis-halok', 'lecke:mi/tortenet']
  },
  {
    id: 'mi-eliza-hatas', cat: 'informatika',
    q: 'már az 1960-as években volt csevegőprogram, amelynek az emberek **a magánéletüket is elmesélték** – pedig csak visszakérdezett?',
    why: 'Joseph Weizenbaum ELIZA nevű programja (1966) egy pszichoterapeutát utánzott egyszerű szabályokkal: kulcsszavakat keresett, és a mondatot kérdéssé alakította („Azt mondod, szomorú vagy. Miért vagy szomorú?”). Semmit sem „értett”, mégis sokan érzelmileg kötődtek hozzá.\n\nEzt ma **ELIZA-hatásnak** hívják: hajlamosak vagyunk megértést és érzéseket tulajdonítani egy gépnek, ha emberi nyelven beszél. A mai, sokkal ügyesebb csevegőrobotoknál ez még erősebb lehet.',
    links: ['lecke:mi/mi-az-mi', 'lecke:mi/nyelvi-modellek']
  },
  {
    id: 'mi-neumann-agy', cat: 'informatika',
    q: '**Neumann János** utolsó, befejezetlen munkája arról szólt, miben hasonlít és miben különbözik **a számítógép és az emberi agy**?',
    why: 'Neumann János, a modern számítógép felépítésének egyik kidolgozója, 1956-ban egy előadássorozatra készült a Yale Egyetemen, de betegsége miatt nem tarthatta meg. A kéziratot halála után, 1958-ban adták ki „A számítógép és az agy” címmel.\n\nBenne többek között azt vizsgálta, hogy az agy lassú, de **hatalmasan párhuzamos** és hibatűrő, a számítógép pedig gyors, de soros és pontos. Ez a gondolat a mai neurális hálóknál és a videokártyás párhuzamos számításnál is visszaköszön.',
    links: ['lecke:mi/tortenet', 'lecke:informatika/szamitogep']
  },
  {
    id: 'mi-alexnet-gpu', cat: 'informatika',
    q: 'a mély tanulás nagy áttörését 2012-ben **játékokhoz készült videokártyák** tették lehetővé?',
    why: 'Egy torontói kutatócsoport mély neurális hálója 2012-ben **nagy fölénnyel** nyerte a legnagyobb nemzetközi képfelismerő versenyt (ImageNet), jóval kevesebbet hibázva, mint a második helyezett. A hálót két, eredetileg számítógépes játékokhoz készült **videokártyán** tanították.\n\nA videokártya ezer meg ezer egyszerű számolást végez egyszerre – épp amire egy neurális hálónak szüksége van. Ettől kezdve terjedt el robbanásszerűen a mély tanulás.',
    links: ['lecke:mi/neuralis-halok', 'lecke:mi/kepek', 'lecke:mi/tortenet']
  },
  {
    id: 'mi-alphago-37', cat: 'informatika',
    q: 'a gó világ egyik legjobb játékosa elleni 2016-os mérkőzésen a gép egy olyan lépést tett, amelyet a szakértők először **hibának hittek**?',
    why: 'Az AlphaGo program 2016 márciusában 4:1-re győzte le Lee Sedolt (magyaros átírással I Szedol). A második játszma **37. lépése** annyira szokatlan volt, hogy a kommentátorok először tévedésnek gondolták – később kiderült, hogy kulcsfontosságú, zseniális húzás volt.\n\nAz AlphaGo emberi partikból, majd **önmaga ellen játszva**, jutalom alapján tanult. A gó lehetséges állásainak száma jóval nagyobb, mint a sakké, ezért sokáig úgy tartották, hogy ebben a gépek még évtizedekig nem érik utol az embert.',
    links: ['lecke:mi/hogyan-tanul', 'lecke:mi/tortenet']
  },
  {
    id: 'mi-nobel-2024', cat: 'informatika',
    q: '2024-ben **két Nobel-díjat** is MI-hez kapcsolódó kutatásért adtak?',
    why: 'A **fizikai** Nobel-díjat John Hopfield és Geoffrey Hinton kapta azokért a felfedezésekért, amelyek a mesterséges neurális hálókkal történő gépi tanulást megalapozták. A **kémiai** díj egyik felét Demis Hassabis és John Jumper kapta egy MI-rendszerért, amely a fehérjék térbeli szerkezetét jósolja meg az aminosav-sorrendjükből; a másik felét David Baker a fehérjék tervezéséért.\n\nA fehérjék alakjának ismerete a gyógyszerkutatásban és a biológiában alapvető – korábban egy-egy szerkezet meghatározása akár évekig tartó laborkísérlet volt.',
    links: ['lecke:mi/tortenet', 'lecke:mi/neuralis-halok']
  },
  {
    id: 'mi-token-magyar', cat: 'informatika',
    q: 'a nyelvi modellek nem betűket és nem is egész szavakat „látnak”, hanem **szódarabokat** – ezért néha még a betűszámlálásban is hibáznak?',
    why: 'A nyelvi modellek a szöveget **tokenekre** bontják: gyakori szavakra, szódarabokra, írásjelekre. Egy hosszú vagy ritka szó több darabra esik, és a modell ezeket a darabokat kezeli egységként – a bennük lévő egyes betűket nem „látja” külön. Ezért fordulhat elő, hogy elszámolja, hány „r” van egy szóban.\n\nA sokat toldalékoló **magyar** nyelvben egy szó gyakran több tokenre esik, mint az angolban – ugyanaz a szöveg magyarul jellemzően több tokent jelent a gépnek.',
    links: ['lecke:mi/nyelvi-modellek']
  }
]);
