/* Tantárgy: Fizika */
STUDIE.addSubject({
  id: 'fizika',
  title: 'Fizika',
  icon: '🪐',
  color: '#2f7bf6',
  description: 'Mozgás, erő, energia, elektromosság, atomok és hullámok: a világ működésének szabályai kísérletezve.',
  intro: 'A fizika azt kutatja, **milyen szabályok szerint** működik a természet, a labdától a villanyautóig. Minden leckében van egy kipróbálható kísérlet vagy gyakorló feladat: állítgasd a csúszkákat, és figyeld, mi változik. A képleteket nem bemagolni kell, hanem megérteni, mit mondanak.',
  lessons: [
    {
      id: 'mertekegysegek-mozgas',
      title: 'Mértékegységek és a mozgás',
      level: 1, minutes: 12,
      summary: 'Az SI-mértékegységek, az átváltás, és hogyan írjuk le a sebességet és a gyorsulást.',
      tags: ['SI', 'mértékegység', 'prefixum', 'átváltás', 'sebesség', 'gyorsulás', 'km/h', 'm/s', 'egyenletes mozgás', 'út-idő'],
      sections: [
        {
          title: 'Miért kellenek mértékegységek?',
          text: 'Egy mennyiség **mérőszámból és mértékegységből** áll: `5 m`, `20 s`, `3 kg`. Mértékegység nélkül a szám semmit sem jelent: az „5” lehet 5 méter vagy 5 kilométer is.\n\nA tudomány a **Nemzetközi Mértékegységrendszert (SI)** használja. Hét alapegysége közül a legfontosabbak:\n\n- **méter (m)**: hosszúság\n- **kilogramm (kg)**: tömeg\n- **másodperc (s)**: idő\n- **amper (A)**: áramerősség\n- **kelvin (K)**: hőmérséklet\n\n(A másik kettő a mol és a kandela.) A többi egység ezekből származik, pl. a sebesség egysége a `m/s`, az erőé a newton: `1 N = 1 kg · m/s²`.'
        },
        {
          title: 'Prefixumok és átváltás',
          text: 'A nagyon nagy és nagyon kicsi számokhoz **előtagokat (prefixumokat)** használunk:\n\n- **k (kilo)** = 1000, pl. 1 km = 1000 m\n- **M (mega)** = 1 000 000\n- **c (centi)** = 1/100, pl. 1 cm = 0,01 m\n- **m (milli)** = 1/1000, pl. 1 mm = 0,001 m, 1 mA = 0,001 A\n- **μ (mikro)** = 1/1 000 000\n\nA leggyakoribb átváltás a sebességé: `1 m/s = 3,6 km/h`. Tehát km/h-ból m/s-ba **3,6-tal osztunk**: `72 km/h = 72 / 3,6 = 20 m/s`.',
          tip: 'Fejben így ellenőrizheted: egy óra 3600 másodperc, egy kilométer 1000 méter. 3600 / 1000 = 3,6.'
        },
        {
          title: 'Sebesség és gyorsulás',
          text: 'A **sebesség** megmutatja, mennyi utat teszel meg egységnyi idő alatt: `v = s / t`.\n\nPélda: 100 m-t 12,5 s alatt futsz le: `v = 100 / 12,5 = 8 m/s` (ez 28,8 km/h).\n\nA **gyorsulás** azt mutatja, mennyit változik a sebesség másodpercenként: `a = Δv / Δt`, mértékegysége `m/s²`. Ha egy autó 0-ról 100 km/h-ra (27,8 m/s) 10 s alatt gyorsul, akkor `a ≈ 27,8 / 10 ≈ 2,8 m/s²`.\n\n**Egyenletes mozgásnál** a sebesség állandó, az út egyenletesen nő: `s = v · t`. **Egyenletesen gyorsuló mozgásnál** álló helyzetből indulva `s = a · t² / 2`.'
        },
        {
          title: 'Gyakorlás: egyenletrendezés',
          text: 'A fizikai feladatokban mindig ki kell fejezni az ismeretlent. Ha `s = v · t`, akkor `t = s / v`. Gyakorold az egyenletek rendezését!',
          widget: { type: 'gyakorlas', options: { kind: 'egyenlet', title: 'Egyenlet-gyakorló' } }
        }
      ],
      quiz: [
        { q: 'Hány m/s a 90 km/h?', options: ['25 m/s', '324 m/s', '90 m/s', '9 m/s'], answer: 0, explain: '90 / 3,6 = 25 m/s.' },
        { q: 'Mi a gyorsulás mértékegysége?', options: ['m/s²', 'm/s', 'km/h', 'N'], answer: 0, explain: 'A sebesség (m/s) másodpercenkénti változása: m/s².' },
        { q: 'Mennyi utat tesz meg 30 s alatt egy 20 m/s-mal egyenletesen haladó autó?', options: ['600 m', '50 m', '1,5 m', '10 m'], answer: 0, explain: 's = v · t = 20 · 30 = 600 m.' },
        { q: 'Hány amper 250 mA?', options: ['0,25 A', '2,5 A', '25 A', '250 000 A'], answer: 0, explain: 'A milli ezredrészt jelent: 250 / 1000 = 0,25 A.' }
      ]
    },
    {
      id: 'newton',
      title: 'Erő és Newton törvényei',
      level: 1, minutes: 14,
      summary: 'Mi az erő, mi a különbség tömeg és súly között, és mi a három Newton-törvény.',
      tags: ['erő', 'newton', 'Newton-törvények', 'tehetetlenség', 'F = m·a', 'hatás-ellenhatás', 'gravitáció', 'súly', 'tömeg', 'hajítás', 'ferde hajítás', 'g'],
      sections: [
        {
          title: 'Tömeg és súly',
          text: 'Az **erő** egy test mozgásállapotának megváltoztatására vagy alakváltozásra képes hatás. Mértékegysége a **newton (N)**.\n\nA hétköznapokban összekeverjük, de a fizikában különbözik:\n\n- A **tömeg (m, kg)** a test anyagmennyiségére és tehetetlenségére jellemző. A Holdon is ugyanannyi.\n- A **súly (G, N)** az az erő, amellyel a test nyomja az alátámasztást vagy húzza a felfüggesztést. A Földön `G = m · g`, ahol `g ≈ 9,81 m/s²`.\n\nEgy 50 kg-os ember súlya a Földön kb. `50 · 9,81 ≈ 490 N`, a Holdon (g ≈ 1,62 m/s²) csak kb. 81 N. A tömege mindkét helyen 50 kg.'
        },
        {
          title: 'Newton három törvénye',
          text: '1. **A tehetetlenség törvénye**: egy test megtartja nyugalmi állapotát vagy egyenes vonalú egyenletes mozgását, amíg más test vagy mező erőhatása ezt meg nem változtatja. Ezért dőlsz előre, amikor a busz hirtelen fékez, és ezért kell biztonsági öv.\n2. **A dinamika alaptörvénye**: `F = m · a`. Ugyanakkora erő a kisebb tömegű testet jobban gyorsítja. Egy 1000 kg-os autó 2 m/s²-es gyorsításához `F = 1000 · 2 = 2000 N` eredő erő kell.\n3. **A hatás-ellenhatás törvénye**: ha A test erőt fejt ki B-re, akkor B is ugyanakkora, de ellentétes irányú erőt fejt ki A-ra. A rakéta hátrafelé löki ki a gázt, a gáz pedig előre löki a rakétát.',
          tip: 'A hatás és az ellenhatás mindig **két különböző testre** hat, ezért nem „oltják ki” egymást.'
        },
        {
          title: 'Ferde hajítás: kísérletezz!',
          text: 'Ha eldobsz egy labdát, két mozgás zajlik egyszerre (a légellenállást elhanyagolva):\n\n- **Vízszintesen** nem hat rá erő, ezért egyenletesen halad (Newton I. törvénye).\n- **Függőlegesen** a gravitáció lefelé gyorsítja (Newton II. törvénye, `a = g`).\n\nA kettő együtt **parabola** alakú pályát ad. Vízszintes talajon a legmesszebbre **45°-os** szögben dobhatsz. Próbáld ki, és nézd meg, mi változik a Holdon vagy a Jupiteren!',
          widget: { type: 'hajitas' }
        }
      ],
      quiz: [
        { q: 'Mekkora erő kell egy 2 kg-os test 3 m/s²-es gyorsításához?', options: ['6 N', '1,5 N', '5 N', '0,67 N'], answer: 0, explain: 'F = m · a = 2 · 3 = 6 N.' },
        { q: 'Mi változik meg, ha egy test a Földről a Holdra kerül?', options: ['A súlya', 'A tömege', 'Mindkettő', 'Egyik sem'], answer: 0, explain: 'A tömeg állandó, a súly G = m · g, és a Holdon kisebb a g.' },
        { q: 'Melyik törvény magyarázza, miért dőlsz előre, amikor a busz fékez?', options: ['A tehetetlenség törvénye (Newton I.)', 'A hatás-ellenhatás törvénye', 'Ohm törvénye', 'Pascal törvénye'], answer: 0, explain: 'A tested megtartaná a mozgását, miközben a busz lassul.' },
        { q: 'Vízszintes talajon milyen szögben dobva repül a legmesszebbre a test (légellenállás nélkül)?', options: ['45°', '30°', '60°', '90°'], answer: 0, explain: 'A távolság v²·sin(2α)/g, ami 2α = 90°, azaz α = 45° esetén a legnagyobb.' }
      ]
    },
    {
      id: 'energia-munka',
      title: 'Energia, munka, teljesítmény',
      level: 2, minutes: 13,
      summary: 'A mozgási és helyzeti energia, az energiamegmaradás, a teljesítmény és a hatásfok.',
      tags: ['energia', 'munka', 'joule', 'mozgási energia', 'helyzeti energia', 'energiamegmaradás', 'teljesítmény', 'watt', 'hatásfok', 'kWh'],
      sections: [
        {
          title: 'Munka',
          text: 'A fizikában **munkát** akkor végzel, ha egy testre erőt fejtesz ki, és a test az erő irányában elmozdul: `W = F · s`. Mértékegysége a **joule (J)**: `1 J = 1 N · 1 m`.\n\nPélda: egy 20 kg-os zsákot (súlya kb. 200 N) 1,5 m magasra emelsz: `W = 200 · 1,5 = 300 J`.\n\nHa egy nehéz táskát csak tartasz, és nem mozdul, akkor fizikai értelemben nem végzel munkát, pedig elfáradsz. (Az izmaid ilyenkor is energiát használnak, de az nem a táskán végzett munka.)'
        },
        {
          title: 'Az energia formái',
          text: 'Az **energia** a munkavégző képesség. Néhány formája:\n\n- **Mozgási energia**: `E = ½ · m · v²`. A sebesség a **négyzeten** szerepel: kétszer akkora sebességnél négyszer akkora az energia. Ezért négyszer hosszabb a fékút is!\n- **Helyzeti (magassági) energia**: `E = m · g · h`.\n- Ezen kívül van hőenergia, kémiai energia (benzin, akkumulátor), elektromos energia, nukleáris energia.\n\nAz **energiamegmaradás törvénye**: energia nem keletkezik és nem vész el, csak átalakul egyik formából a másikba. A hullámvasút a tetején helyzeti energiával rendelkezik, ami lefelé mozgási energiává alakul, a súrlódás miatt pedig egy része hővé.',
          tip: 'Az áramszámlán szereplő kWh is energia: `1 kWh = 1000 W · 3600 s = 3 600 000 J`.'
        },
        {
          title: 'Teljesítmény és hatásfok',
          text: 'A **teljesítmény** megmutatja, milyen gyorsan végzünk munkát: `P = W / t`, mértékegysége a **watt (W)**: `1 W = 1 J / s`.\n\nA gépek a befektetett energiának csak egy részét alakítják hasznos formává, a többi többnyire hő lesz. A **hatásfok**:\n\n`η = hasznos energia / befektetett energia · 100%`\n\nPélda: egy LED-izzó 10 W-ot vesz fel, és ebből kb. 4 W lesz fény: hatásfoka 40%. Egy régi izzószálas izzónál ez csak kb. 5%! Egy benzinmotor kb. 30%, egy villanymotor kb. 90% hatásfokú. Gyakorold a százalékszámítást!',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás', help: 'A hatásfok és sok más fizikai mennyiség százalékban adott. Számold ki, mennyi az alap adott százaléka!' } }
        }
      ],
      quiz: [
        { q: 'Hányszorosára nő a mozgási energia, ha a sebesség kétszeresére nő?', options: ['Négyszeresére', 'Kétszeresére', 'Nyolcszorosára', 'Nem változik'], answer: 0, explain: 'E = ½ · m · v², a v² miatt 2² = 4.' },
        { q: 'Mennyi munkát végzel, ha 50 N erővel 4 m-en át tolsz egy dobozt az erő irányában?', options: ['200 J', '12,5 J', '54 J', '0,08 J'], answer: 0, explain: 'W = F · s = 50 · 4 = 200 J.' },
        { q: 'Mekkora a hatásfok, ha 200 J befektetett energiából 50 J hasznos?', options: ['25%', '50%', '75%', '400%'], answer: 0, explain: 'η = 50 / 200 = 0,25 = 25%.' },
        { q: 'Mi a teljesítmény mértékegysége?', options: ['watt (W)', 'joule (J)', 'newton (N)', 'kilowattóra (kWh)'], answer: 0, explain: 'A watt = joule / másodperc. A kWh energiaegység.' }
      ]
    },
    {
      id: 'elektromossag',
      title: 'Az elektromosság alapjai',
      level: 2, minutes: 15,
      summary: 'Töltés, áram, feszültség, ellenállás, Ohm törvénye és a kapcsolások, kísérletekkel.',
      tags: ['elektromosság', 'töltés', 'elektron', 'áram', 'feszültség', 'ellenállás', 'Ohm-törvény', 'soros', 'párhuzamos', 'eredő ellenállás', 'vezető', 'szigetelő'],
      models: ['atom', 'elosztoszekreny'],
      sections: [
        {
          title: 'Töltés és áram',
          text: 'Az anyag atomokból áll, az atomokban pozitív **protonok** és negatív **elektronok** vannak (lásd az [[atom|atom felfedezőt]]). Az azonos töltések taszítják, a különbözők vonzzák egymást.\n\n- A **vezetőkben** (pl. réz, alumínium) a külső elektronok szabadon mozoghatnak az atomok között.\n- A **szigetelőkben** (műanyag, üveg, gumi) az elektronok kötöttek, áram alig folyik.\n\nAz **elektromos áram** a töltések rendezett mozgása. Az **áramerősség** (I, amper) megmutatja, mennyi töltés halad át a vezető keresztmetszetén másodpercenként. A **feszültség** (U, volt) hajtja az áramot, mint a víznyomás a vizet.',
          tip: 'Az áram „hivatalos” (technikai) iránya a pluszból a mínusz felé mutat, holott a fémekben az elektronok éppen fordítva, a mínuszból a plusz felé mozognak. Ez történelmi megállapodás.'
        },
        {
          title: 'Ohm törvénye',
          text: 'Egy vezetőn átfolyó áram egyenesen arányos a feszültséggel, és fordítottan az ellenállással:\n\n`I = U / R`, vagyis `U = R · I`.\n\nAz **ellenállás** (R, ohm, Ω) azt mutatja, mennyire akadályozza a vezető az áramot. Hosszabb és vékonyabb vezetéknek nagyobb az ellenállása. Próbáld ki: duplázd meg a feszültséget, és figyeld az áramot!',
          widget: { type: 'ohm' }
        },
        {
          title: 'Soros és párhuzamos kapcsolás',
          text: '- **Sorosan** kapcsolt ellenállásoknál az áram mindenhol ugyanaz, az ellenállások összeadódnak: `Re = R1 + R2`.\n- **Párhuzamosan** kapcsolt ellenállásoknál a feszültség mindegyiken ugyanaz, és a **reciprokok** adódnak össze: `1/Re = 1/R1 + 1/R2`. Az eredő mindig **kisebb** a legkisebb ellenállásnál is.\n\nPélda: 6 Ω és 3 Ω párhuzamosan: `1/Re = 1/6 + 2/6 = 3/6`, tehát `Re = 2 Ω`. A lakás elosztószekrényéből induló áramkörökben a fogyasztók párhuzamosan kapcsolódnak, ezt az [[elosztoszekreny|elosztószekrény felfedezőjében]] láthatod.',
          widget: { type: 'soros-parhuzamos' }
        },
        {
          title: 'Gyakorlás',
          text: 'Számolj Ohm törvényével, amíg rá nem jön a kezed! Utána, a lecke végén, gyakorold a törtek összeadását is: az `1/R1 + 1/R2` kiszámolásához közös nevező kell.',
          widget: { type: 'gyakorlas', options: { kind: 'ohm', title: 'Ohm-törvény gyakorló' } }
        }
      ],
      widgets: [
        { type: 'gyakorlas', options: { kind: 'tortek', title: 'Törtek összeadása (a párhuzamos eredőhöz)' } }
      ],
      quiz: [
        { q: 'Mekkora az áram, ha U = 9 V és R = 3 Ω?', options: ['3 A', '27 A', '0,33 A', '12 A'], answer: 0, explain: 'I = U / R = 9 / 3 = 3 A.' },
        { q: 'Mekkora két 6 Ω-os ellenállás eredője sorosan?', options: ['12 Ω', '3 Ω', '6 Ω', '36 Ω'], answer: 0, explain: 'Sorosan összeadódnak: 6 + 6 = 12 Ω.' },
        { q: 'Mekkora 6 Ω és 3 Ω párhuzamos eredője?', options: ['2 Ω', '9 Ω', '4,5 Ω', '18 Ω'], answer: 0, explain: '1/Re = 1/6 + 1/3 = 1/2, tehát Re = 2 Ω.' },
        { q: 'Mi viszi az áramot a fémekben?', options: ['A szabadon mozgó elektronok', 'A protonok', 'A neutronok', 'Az atommagok'], answer: 0, explain: 'A fématomok külső elektronjai szabadon mozognak a kristályrácsban.' }
      ]
    },
    {
      id: 'atom',
      title: 'Az atom felépítése',
      level: 2, minutes: 13,
      summary: 'Proton, neutron, elektron: építs atomot, és nézd meg, mitől lesz belőle más elem, izotóp vagy ion.',
      tags: ['atom', 'atommag', 'proton', 'neutron', 'elektron', 'elektronhéj', 'rendszám', 'tömegszám', 'izotóp', 'ion', 'periódusos rendszer', 'Rutherford'],
      models: ['atom', 'tranzisztor'],
      sections: [
        {
          title: 'Mi van egy atomban?',
          text: 'Minden anyag **atomokból** áll. Egy atom közepén van a nagyon kicsi, de nagyon sűrű **atommag**, ebben vannak:\n\n- a pozitív töltésű **protonok**,\n- a semleges **neutronok**.\n\nA mag körül, az **elektronfelhőben** mozognak a negatív töltésű **elektronok**. Egy elektron tömege kb. 1836-szor kisebb egy protonénál, ezért az atom tömege szinte teljesen a magban van.\n\n**Rutherford** 1911-ben aranyfóliára lőtt alfa-részecskékkel fedezte fel, hogy az atom nagyrészt „üres”: ha az atommag egy borsószem lenne egy stadion közepén, az elektronok a lelátókon keringenének. Az atom részeit az [[atom|atom felfedezőjében]] is megnézheted.'
        },
        {
          title: 'Rendszám, tömegszám, izotóp, ion',
          text: '- A **rendszám (Z)** a protonok száma. Ez dönti el, melyik **elemről** van szó: 1 proton = hidrogén, 6 = szén, 8 = oxigén. A periódusos rendszer rendszám szerint sorolja az elemeket.\n- A **tömegszám (A)** a protonok és neutronok együttes száma.\n- Az **izotópok** ugyanannak az elemnek a különböző neutronszámú változatai. Pl. a szén-12 (6 neutron) stabil, a szén-14 (8 neutron) radioaktív; ezt használják a régészeti kormeghatározáshoz.\n- Az **ion** olyan atom, amelynek több vagy kevesebb elektronja van, mint protonja. Ha elektront ad le, **pozitív ion** lesz (pl. Na⁺), ha felvesz, **negatív ion** (pl. Cl⁻).',
          widget: { type: 'atomepito', options: { p: 6, n: 6, e: 6 } }
        },
        {
          title: 'Elektronhéjak és a kémia',
          text: 'Az elektronok **héjakon** helyezkednek el. Az első héjon legfeljebb 2, a másodikon legfeljebb 8 elektron fér el (a harmadik héj az első 20 elem esetén szintén 8 elektronnal „telik meg”).\n\nAz atom kémiai viselkedését a **legkülső héj** elektronjai (vegyértékelektronok) határozzák meg. A nemesgázok (hélium, neon, argon) külső héja telített, ezért szinte semmivel nem lépnek reakcióba. A nátriumnak 1 külső elektronja van, könnyen leadja, a klórnak 7, szívesen felvesz egyet: így jön létre a konyhasó (NaCl).\n\nA **szilícium** 4 külső elektronja miatt különleges: belőle készülnek a félvezetők, a tranzisztorok és a processzorok. Lásd a [[tranzisztor|tranzisztor felfedezőt]].',
          tip: 'Az atomépítőben próbáld ki: 11 proton és 10 elektron = nátriumion (Na⁺), 17 proton és 18 elektron = kloridion (Cl⁻).'
        }
      ],
      quiz: [
        { q: 'Mi határozza meg, melyik elemről van szó?', options: ['A protonok száma (rendszám)', 'A neutronok száma', 'Az elektronok száma', 'Az atom mérete'], answer: 0, explain: 'A rendszám a protonok száma; ha az változik, más elem lesz.' },
        { q: 'Mi a különbség a szén-12 és a szén-14 között?', options: ['A neutronok száma', 'A protonok száma', 'Az elektronhéjak száma', 'Semmi'], answer: 0, explain: 'Mindkettőben 6 proton van; a szén-12-ben 6, a szén-14-ben 8 neutron.' },
        { q: 'Mi lesz egy atomból, ha elektront ad le?', options: ['Pozitív ion', 'Negatív ion', 'Más elem', 'Izotóp'], answer: 0, explain: 'Kevesebb elektron, mint proton: a töltése pozitív lesz.' },
        { q: 'Hol van az atom tömegének szinte teljes része?', options: ['Az atommagban', 'Az elektronokban', 'Egyenletesen elosztva', 'Az elektronhéjak között'], answer: 0, explain: 'A protonok és neutronok kb. 1836-szor nehezebbek az elektronoknál.' },
        { q: 'Mekkora a tömegszáma egy 8 protont és 8 neutront tartalmazó atomnak?', options: ['16', '8', '24', '0'], answer: 0, explain: 'A tömegszám = protonok + neutronok = 8 + 8 = 16 (oxigén-16).' }
      ]
    },
    {
      id: 'hullamok-feny',
      title: 'Hullámok, hang és fény',
      level: 3, minutes: 14,
      summary: 'Hullámhossz, frekvencia és terjedési sebesség, a hang és az elektromágneses spektrum.',
      tags: ['hullám', 'hullámhossz', 'frekvencia', 'hertz', 'periódusidő', 'hang', 'fény', 'fénysebesség', 'elektromágneses spektrum', 'rádió', 'röntgen', 'fénytörés', 'visszaverődés'],
      sections: [
        {
          title: 'Mi a hullám?',
          text: 'A **hullám** egy rezgés terjedése a térben. Közben az anyag nem halad el, csak helyben rezeg: a stadionban a „mexikói hullám” körbefut, de a nézők a helyükön maradnak. A hullám **energiát** szállít, nem anyagot.\n\nJellemzői:\n\n- **Hullámhossz (λ, lambda)**: két szomszédos hullámhegy távolsága, méterben.\n- **Frekvencia (f)**: hány rezgés történik másodpercenként, **hertzben (Hz)**.\n- **Periódusidő (T)**: egy rezgés ideje, `T = 1 / f`.\n- **Amplitúdó**: a kitérés nagysága (hangnál ez a hangerő, fénynél a fényesség).\n\nA legfontosabb összefüggés: `c = λ · f`, vagyis terjedési sebesség = hullámhossz × frekvencia.'
        },
        {
          title: 'A hang',
          text: 'A **hang** a levegő (vagy más közeg) nyomásának rezgése, ún. **longitudinális** hullám: a részecskék a terjedés irányában rezegnek. Levegőben kb. **340 m/s**-mal terjed, vízben kb. 1500 m/s-mal, vákuumban egyáltalán nem, mert nincs mi rezegjen.\n\nAz ember kb. **20 Hz és 20 000 Hz** közötti hangokat hall. Efelett van az **ultrahang** (ezt használják pl. a parkolóradarok és az orvosi ultrahang).\n\nPélda: a zenei „A” hang 440 Hz. Hullámhossza: `λ = c / f = 340 / 440 ≈ 0,77 m`.',
          tip: 'Villámláskor számold a másodperceket a villanás és a dörgés között, és oszd el 3-mal: nagyjából ennyi kilométerre csapott le, mert a hang kb. 3 s alatt tesz meg 1 km-t, a fény szinte azonnal ideér.'
        },
        {
          title: 'A fény és az elektromágneses spektrum',
          text: 'A **fény** elektromágneses hullám: **transzverzális** (a rezgés merőleges a terjedésre), és **vákuumban is terjed**, mégpedig óriási sebességgel: `c ≈ 300 000 km/s`. A Napból kb. 8 perc 20 s alatt ér ide.\n\nA látható fény csak egy kis része az **elektromágneses spektrumnak**, a növekvő frekvencia (csökkenő hullámhossz) sorrendjében:\n\n1. **Rádióhullámok** (rádió, wifi, mobil)\n2. **Mikrohullámok** (mikrohullámú sütő, radar)\n3. **Infravörös** (hősugárzás, távirányító)\n4. **Látható fény**: kb. 380 nm (ibolya) és 750 nm (vörös) között\n5. **Ultraibolya (UV)**: leégést okoz\n6. **Röntgensugárzás**\n7. **Gamma-sugárzás**\n\nMinél nagyobb a frekvencia, annál nagyobb energiát hordoz a sugárzás. Ezért veszélyes az UV, a röntgen és a gamma-sugárzás az élő sejtekre.',
          warn: 'Soha ne nézz közvetlenül a Napba vagy lézerfénybe, még rövid ideig sem! A szemlencse a fényt a retinára fókuszálja, és maradandó látáskárosodást okozhat.'
        },
        {
          title: 'Visszaverődés és fénytörés',
          text: '- **Visszaverődés**: a tükörről a fény ugyanakkora szögben verődik vissza, mint amekkorában beérkezett (beesési szög = visszaverődési szög).\n- **Fénytörés**: amikor a fény egyik közegből a másikba lép (pl. levegőből vízbe), megváltozik a sebessége, és ezért **megtörik** az iránya. Ezért látszik „megtörtnek” a pohárba tett szívószál.\n\nA különböző színű fények kicsit eltérően törnek meg, ezért bontja a **prizma** és az esőcsepp **szivárvánnyá** a fehér fényt. A szemüveg, a fényképezőgép és a mikroszkóp lencséi is a fénytörést használják.'
        }
      ],
      quiz: [
        { q: 'Mekkora egy 2 m hullámhosszú, 170 Hz frekvenciájú hang terjedési sebessége?', options: ['340 m/s', '85 m/s', '172 m/s', '0,012 m/s'], answer: 0, explain: 'c = λ · f = 2 · 170 = 340 m/s.' },
        { q: 'Miért nem terjed a hang a világűrben?', options: ['Mert nincs közeg, ami rezeghetne', 'Mert túl hideg van', 'Mert a fény elnyomja', 'Mert túl gyors lenne'], answer: 0, explain: 'A hang mechanikai hullám, kell hozzá anyag; a fény viszont vákuumban is terjed.' },
        { q: 'Melyiknek a legnagyobb a frekvenciája?', options: ['Gamma-sugárzás', 'Rádióhullám', 'Látható fény', 'Infravörös'], answer: 0, explain: 'A spektrum végén a gamma-sugárzás áll, a legnagyobb frekvenciával és energiával.' },
        { q: 'Kb. mekkora a fény sebessége vákuumban?', options: ['300 000 km/s', '340 m/s', '300 km/h', '1500 m/s'], answer: 0, explain: 'c ≈ 3 · 10⁸ m/s. A 340 m/s a hang sebessége levegőben.' },
        { q: 'Mi a periódusidő, ha a frekvencia 50 Hz?', options: ['0,02 s', '50 s', '0,5 s', '2 s'], answer: 0, explain: 'T = 1 / f = 1 / 50 = 0,02 s. A hálózati váltakozó áram frekvenciája is 50 Hz.' }
      ]
    }
  ]
});
