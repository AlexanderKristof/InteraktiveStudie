/* Tudtad? – önálló élet és háztartás. Formátum: js/tudtad.js */
STUDIE.addFacts([
  {
    id: 'haztartas-csirke-mosas', cat: 'etel',
    q: 'a nyers csirkét **nem érdemes megmosni** a csap alatt, mert ezzel inkább **szétteríted** a baktériumokat?',
    why: 'A nyers szárnyason gyakran vannak **Campylobacter** és **Salmonella** baktériumok. A csap alatt a víz szétfröccsen, és apró cseppekkel a mosogatóra, a pultra, a közelben lévő ételekre is átviszi őket.\n\nA mosás nem pusztítja el a baktériumokat, az alapos **átsütés** viszont igen. Ezért a biztonságos út: a csirkét egyenesen a serpenyőbe vagy tepsibe tedd, és utána moss kezet.',
    links: ['lecke:haztartas/fozes-alapok', 'lecke:szakacs/higienia']
  },
  {
    id: 'haztartas-minoseget-megorzi', cat: 'etel',
    q: 'a **„minőségét megőrzi”** dátum után az étel többnyire még **biztonságosan fogyasztható**, a **„fogyasztható”** dátum után viszont már nem?',
    why: 'A két dátum mást jelent. A **„minőségét megőrzi”** (best before) a tartós termékeken (tészta, rizs, konzerv) azt garantálja, hogy addig az íz, állag, szín kifogástalan. Utána is ehető lehet, ha a csomagolás ép, és a termék rendben van.\n\nA **„fogyasztható”** (use by) a gyorsan romló termékeken (friss hús, hal) biztonsági határ: utána akkor se edd meg, ha jónak tűnik. Az EU becslése szerint a háztartási élelmiszer-pazarlás jelentős része a dátumok félreértéséből adódik.',
    links: ['lecke:haztartas/fozes-alapok']
  },
  {
    id: 'haztartas-rizs-bacillus', cat: 'etel',
    q: 'a **szobahőn felejtett főtt rizs** akkor is megbetegíthet, ha **újramelegíted**?',
    why: 'A rizsben gyakran ott vannak a **Bacillus cereus** baktérium **spórái**, amelyek túlélik a főzést. Ha a főtt rizs órákig szobahőn áll, a spórákból baktériumok lesznek, és **hőálló méreganyagot** termelnek.\n\nEzt a mérget az újramelegítés nem bontja le, így hányást, hasmenést okozhat. A megoldás: a maradék rizst gyorsan hűtsd le, tedd hűtőbe, és egy napon belül edd meg.',
    links: ['lecke:haztartas/fozes-alapok']
  },
  {
    id: 'haztartas-hipo-ecet', cat: 'kemia',
    q: 'a **hipó** és az **ecet** (vagy a savas vízkőoldó) keveréke **mérgező klórgázt** fejleszt?',
    why: 'A hipó (nátrium-hipoklorit) savas közegben **klórgázt** (Cl₂) szabadít fel. A klór az első világháborúban harci gázként is szerepelt: a nedves nyálkahártyán savvá alakul, és súlyosan **marja a légutakat**.\n\nAmmóniás szerrel keverve a hipó **klóraminokat** termel, amelyek szintén mérgezőek. Ezért a takarításnál egyszerre csak egy szert használj, és szellőztess.',
    links: ['lecke:haztartas/mosas-takaritas', 'lecke:kem-alap/savak-lugok']
  },
  {
    id: 'haztartas-ver-hideg-viz', cat: 'kemia',
    q: 'a **vérfoltot hideg vízzel** kell kimosni, mert a meleg víz **„belesüti”** a ruhába?',
    why: 'A vér, a tojás és a tej **fehérjéket** tartalmaz. Melegben a fehérjék **kicsapódnak** (denaturálódnak), ugyanúgy, ahogy a tojásfehérje megfehéredik a serpenyőben. A kicsapódott fehérje beleragad a textil szálaiba, és sokkal nehezebb eltávolítani.\n\nHideg vízben a fehérje oldható marad, így kiöblíthető. Ezért a fehérjefoltokat mindig hideg vízzel kezdd.',
    links: ['lecke:haztartas/mosas-takaritas']
  },
  {
    id: 'haztartas-fi-rele-30ma', cat: 'technika',
    q: 'a lakás **FI-reléje** már **30 milliamper** szivárgó áramot is érzékel, és a másodperc törtrésze alatt lekapcsol?',
    why: 'Az **áram-védőkapcsoló** (FI-relé) folyamatosan összehasonlítja a fázisvezetőn kimenő és a nullavezetőn visszajövő áramot. Ha a kettő eltér (vagyis valahol áram „szivárog” a föld felé, akár egy emberen keresztül), lekapcsol.\n\nA 30 mA már veszélyes lehet a szívre, de ilyen gyorsan megszakítva általában nem okoz halálos áramütést. A **tesztgomb** megnyomásával ellenőrizheted, hogy működik-e.',
    links: ['modell:elosztoszekreny#fi', 'lecke:haztartas/javitasok', 'lecke:villanyszereles/vedelmek']
  },
  {
    id: 'haztartas-ujraelesztes-utem', cat: 'emberi-test',
    q: 'az újraélesztés **100–120/perces** ütemét a **„Stayin\' Alive”** című dal ritmusa is segít eltalálni?',
    why: 'A Bee Gees dalának tempója kb. **104 ütés/perc**, ami pont a mellkaskompresszió ajánlott tartományába esik. Elsősegély-oktatók világszerte használják ezt a „trükköt”, hogy a tanulók ne nyomják se túl lassan, se túl gyorsan.\n\nA kompresszió a szív helyett pumpálja a vért az agyba. Ha 5–6 cm mélyen, megfelelő ütemben és teljes visszaengedéssel végzed, a mentők érkezéséig életben tarthatod a beteget.',
    links: ['lecke:haztartas/elsosegely', 'modell:sziv']
  },
  {
    id: 'haztartas-aed-laikus', cat: 'emberi-test',
    q: 'az **AED** (defibrillátor) készüléket **laikusoknak** tervezték, és magától dönti el, kell-e áramütés?',
    why: 'Az automata külső defibrillátor az elektródákon át **elemzi a szívritmust**. Csak akkor engedi az áramütést, ha **kamraremegést** (vagy hasonló, sokkolható ritmust) talál, ezért egészséges szívű embert nem lehet vele „véletlenül” megrázni.\n\nBekapcsolás után hangosan elmondja a lépéseket. A szívmegállás után minden perc késés jelentősen csökkenti a túlélés esélyét, ezért fontos, hogy az első segélynyújtó használja, ne a mentőre várjon vele.',
    links: ['lecke:haztartas/elsosegely', 'modell:sziv#inger']
  },
  {
    id: 'haztartas-futes-egy-fok', cat: 'fizika',
    q: 'ha **egy fokkal** lejjebb veszed a fűtést, a fűtési energia kb. **5–6%-a** megtakarítható?',
    why: 'A lakás hővesztesége nagyjából arányos a **belső és külső hőmérséklet különbségével**. Ha kint 0 °C van, bent 21 °C, akkor a különbség 21 fok; 20 °C-nál csak 20 fok, ami kb. **5%-kal** kevesebb. Mivel a fűtési szezon átlagos külső hőmérséklete magasabb 0 °C-nál, az arány még nagyobb lehet.\n\nA magyar energiahivatal (MEKH) számításai szerint egy fokos csökkentés a hazai éves földgázfogyasztást kb. 5%-kal mérsékelné.',
    links: ['lecke:haztartas/energiatakarekossag', 'lecke:epitoipar/szigeteles']
  },
  {
    id: 'haztartas-hosugarzo', cat: 'fizika',
    q: 'egy **2000 W-os hősugárzó** egy óra alatt annyi áramot fogyaszt, mint egy **10 W-os LED-izzó 200 órán át**?',
    why: 'Az energia `E = P · t`. A hősugárzó: `2 kW · 1 h = 2 kWh`. A LED: `0,01 kW · 200 h = 2 kWh`.\n\nA hőt termelő készülékek (hősugárzó, villanybojler, sütő, szárítógép) a háztartás igazi „energiafalói”. A világításon spórolni jó dolog, de a fűtésen és a melegvízen sokkal többet lehet.',
    links: ['lecke:haztartas/energiatakarekossag', 'lecke:fizika/energia-munka']
  },
  {
    id: 'haztartas-alvas-memoria', cat: 'emberi-test',
    q: 'alvás közben az agyad **„visszajátssza”** a napközben tanultakat, és így rögzíti őket?',
    why: 'Állatkísérletekben megfigyelték, hogy a **hippokampusz** idegsejtjei alvás közben ugyanabban a sorrendben tüzelnek, mint napközben, amikor az állat egy útvonalat tanult. Emberi vizsgálatokban is kimutatták, hogy a tanulás utáni alvás **javítja** a felidézést.\n\nEzért a vizsga előtti átvirrasztott éjszaka kétszeresen árt: fáradtan rosszabbul figyelsz, és a frissen tanultak sem rögzülnek rendesen.',
    links: ['modell:agy#limbikus', 'lecke:haztartas/idobeosztas-tanulas']
  },
  {
    id: 'haztartas-teszteles-hatas', cat: 'emberi-test',
    q: 'ha **kikérdezed magad**, többet tanulsz, mintha **újraolvasnád** az anyagot?',
    why: 'Ez a **tesztelési hatás** (retrieval practice). Egy sokat idézett 2006-os kísérletben (Roediger és Karpicke) az a csoport, amely egy szöveget elolvasott, majd **felidézni próbált**, egy hét múlva sokkal többre emlékezett, mint az, amelyik **többször újraolvasta**, pedig az újraolvasók magabiztosabbak voltak.\n\nA felidézés erőfeszítése erősíti meg az emléknyomot. Ezért hasznosak a leckék végi kvízek és a Tesztközpont kérdései.',
    links: ['lecke:haztartas/idobeosztas-tanulas', 'modell:agy#neuron']
  }
]);
