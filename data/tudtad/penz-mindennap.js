/* Tudtad? – Pénz a mindennapokban (ÁFA, szja, bér, bank, megtakarítás, fogyasztóvédelem). Formátum: js/tudtad.js
 * A számok 2026-os magyar szabályokat tükröznek; a szabályok évente változhatnak. */
STUDIE.addFacts([
  {
    id: 'pm-afa-eu-legmagasabb', cat: 'penz',
    q: 'a magyar **27%-os általános ÁFA-kulcs az Európai Unió legmagasabb** általános forgalmi adója?',
    why: 'Az EU-s szabályok szerint az általános ÁFA-kulcs legalább 15% kell legyen, felső határt viszont nem írnak elő. A legtöbb tagállamban 19–25% közötti az általános kulcs (Németországban például 19%), Magyarországon **2012 óta 27%**.\n\nEzért egy bruttó 12 700 Ft-os termék árából **2 700 Ft** az ÁFA – vagyis minden boltban fizetett forint kb. **21%-a** adó. Az ÁFA a magyar költségvetés egyik legnagyobb bevétele.',
    links: ['lecke:penz-mindennap/afa-szamla', 'szakszo:kozgazdasagtan/fiskalis-politika']
  },
  {
    id: 'pm-brutto-27-nem-27', cat: 'penz',
    q: 'ha egy bruttó árból 27%-ot levonsz, **nem** a nettó árat kapod meg?',
    why: 'A 27% a **nettó** árra vonatkozik: `bruttó = nettó × 1,27`. Visszafelé tehát osztani kell: `nettó = bruttó / 1,27`.\n\nPélda: 12 700 Ft bruttó → `12 700 / 1,27 = 10 000 Ft` nettó. Ha 27%-ot vonnál le, `12 700 × 0,73 = 9 271 Ft` jönne ki, ami 729 Ft-tal kevesebb a valódinál. Ugyanez a csapda a kedvezményeknél: egy 20%-kal felemelt, majd 20%-kal leárazott termék **olcsóbb** lesz az eredeti árnál.',
    links: ['lecke:penz-mindennap/afa-szamla', 'lecke:penzugy/koltsegvetes']
  },
  {
    id: 'pm-ado-tervezet-automatikus', cat: 'penz',
    q: 'a legtöbb munkavállalónak és diáknak **egyetlen kattintás nélkül is** érvényes szja-bevallása lesz május 20. után?',
    why: 'A NAV a munkáltatóktól, bankoktól, kifizetőktől kapott adatokból elkészíti a **bevallási tervezetet**. Aki nem egyéni vállalkozó, őstermelő vagy ÁFA-fizetésre kötelezett magánszemély, annak a tervezete a határidő után **automatikusan bevallássá válik**.\n\nCsakhogy a tervezet nem mindig teljes: a külföldi jövedelem, a lakáskiadás vagy egy elfelejtett kedvezmény kimaradhat belőle – és a hibás bevallásért **te felelsz**. Ezért érdemes minden tavasszal 10 percet szánni az átnézésére az e-SZJA felületen.',
    links: ['lecke:penz-mindennap/szja-bevallas']
  },
  {
    id: 'pm-munkaltatoi-koltseg', cat: 'penz',
    q: 'egy bruttó 400 000 Ft-os fizetés a munkáltatónak **452 000 Ft-jába** kerül, de a munkavállaló (25 év felett, kedvezmény nélkül) csak **266 000 Ft-ot** kap kézhez 2026-ban?',
    why: 'A bruttó bérből levonják a **15% szja-t** és a **18,5% TB-járulékot** (összesen 33,5%), a munkáltató pedig a bruttó felett **13% szociális hozzájárulási adót** fizet.\n\n- munkáltatói költség: `400 000 × 1,13 = 452 000 Ft`\n- nettó: `400 000 × 0,665 = 266 000 Ft`\n\nA különbség, a 186 000 Ft, az **adóék**: a bérköltség kb. 41%-a adóként és járulékként az államhoz kerül. Ebből finanszírozzák többek közt a nyugdíjakat és az egészségügyet.',
    links: ['lecke:penz-mindennap/berpapir', 'lecke:penzugy/ber-ado']
  },
  {
    id: 'pm-25-ev-alatt', cat: 'penz',
    q: 'egy 25 év alatti pályakezdő **ugyanakkora bruttó bérből akár havi 60 000 Ft-tal többet** visz haza, mint 26 éves kollégája?',
    why: 'A **25 év alatti fiatalok kedvezménye** (2022 óta) miatt a fiatalok **nem fizetnek szja-t** egy plafonig, ami **2026-ban havi 715 765 Ft** (az előző év júliusi bruttó átlagkereset). A 18,5%-os TB-járulékot ők is fizetik.\n\nBruttó 400 000 Ft-nál a különbség pontosan az elengedett 15%: **60 000 Ft havonta**. A kedvezmény addig a hónapig jár, amelyben valaki betölti a 25. életévét – a következő hónapban a nettó bér „hirtelen” csökken.',
    links: ['lecke:penz-mindennap/berpapir', 'lecke:penz-mindennap/diakmunka']
  },
  {
    id: 'pm-iskolaszovetkezet-netto', cat: 'penz',
    q: 'egy 25 év alatti, nappali tagozatos diák iskolaszövetkezeti munkájánál a **bruttó és a nettó bér szinte ugyanannyi**?',
    why: 'Iskolaszövetkezeti tagként a nappali tagozatos diák **nem válik biztosítottá**, ezért nem vonnak le tőle **18,5%-os TB-járulékot**. A **25 év alatti kedvezmény** miatt pedig szja sem terheli a plafonig. Így egy bruttó 352 000 Ft-os nyári kereset nettóban is **kb. 352 000 Ft** (2026-os szabályok).\n\nAz éremnek másik oldala: járulék nélkül ez az idő **nem számít bele a nyugdíjba**, és táppénz sem jár utána.',
    links: ['lecke:penz-mindennap/diakmunka']
  },
  {
    id: 'pm-kamatos-kamat-10-ev', cat: 'penz',
    q: 'ha 25 helyett csak 35 évesen kezdesz el havi 10 000 Ft-ot félretenni, **65 éves korodra kb. 6,5 millió forinttal kevesebbed** lehet?',
    why: 'Évi 5%-os hozammal számolva (közelítés évenkénti befizetéssel):\n\n- 40 év alatt: `120 000 × (1,05^40 − 1) / 0,05 ≈ 14,5 millió Ft` (befizetés: 4,8 millió)\n- 30 év alatt: `120 000 × (1,05^30 − 1) / 0,05 ≈ 8,0 millió Ft` (befizetés: 3,6 millió)\n\nA 10 év késés miatt csak 1,2 millióval fizetsz be kevesebbet, a végösszeg viszont kb. 6,5 millióval kisebb. A kamatos kamat a pénz utolsó éveiben „dolgozik” a legtöbbet – ezért számít annyira, mikor kezded.',
    links: ['lecke:penz-mindennap/megtakaritas-ongondoskodas', 'lecke:penzugy/kamat-inflacio', 'szakszo:kozgazdasagtan/jelenertek']
  },
  {
    id: 'pm-nyugdijpenztar-20', cat: 'penz',
    q: 'az önkéntes nyugdíjpénztárba befizetett pénz után az állam **20%-ot rátesz** – évente akár 150 000 Ft-ot?',
    why: 'Az **adójóváírás** (2026-os szabályok) a befizetett szja-ból jár: a pénztári befizetés **20%-át**, legfeljebb **évi 150 000 Ft-ot** a NAV a pénztári számládra utalja, ahol tovább kamatozik. A maximumhoz évi 750 000 Ft befizetés kell.\n\nHasonló, de alacsonyabb plafonú jóváírás jár a **nyugdíjbiztosításra** (130 000 Ft) és a **NYESZ**-re (100 000 Ft). A jóváírást az **szja-bevallásban** kell kérni.',
    links: ['lecke:penz-mindennap/megtakaritas-ongondoskodas', 'lecke:penz-mindennap/szja-bevallas']
  },
  {
    id: 'pm-kamatado-28', cat: 'penz',
    q: 'a bankbetét kamatából **28%** adót vonnak le, a lakossági állampapírok kamata viszont **adómentes**?',
    why: '2023 közepe óta a kamatjövedelmet a **15%-os szja** mellett **13%-os szociális hozzájárulási adó** is terheli, így egy 100 000 Ft-os betéti kamatból csak **72 000 Ft** marad.\n\nA **lakossági állampapírok** kamata a 2026-os szabályok szerint mentes ezek alól, és a lejáratig megtartott **TBSZ** hozama is adómentes. Egy betét és egy állampapír összehasonlításánál ezért mindig az **adózás utáni** hozamot nézd – és vond le belőle az inflációt is!',
    links: ['lecke:penz-mindennap/megtakaritas-ongondoskodas', 'szakszo:kozgazdasagtan/inflacio']
  },
  {
    id: 'pm-bolti-visszavitel', cat: 'penz',
    q: 'egy boltban vett, **hibátlan** pólót a törvény szerint **nem** kötelesek visszavenni – a 14 napos elállási jog csak az **online és telefonos** vásárlásra vonatkozik?',
    why: 'A **14 napos indoklás nélküli elállás** a **távollévők közötti** (webshop, telefon) és az üzlethelyiségen kívül kötött szerződésekre vonatkozik, mert ott a vásárló nem láthatta, nem próbálhatta fel a terméket.\n\nHa egy bolt mégis visszaveszi a hibátlan terméket, az az ő **üzletpolitikája** (kedvesség, versenyelőny). **Hibás** termék esetén viszont a bolti vásárlásnál is érvényesítheted a **szavatosságot** és a **jótállást**.',
    links: ['lecke:penz-mindennap/fogyasztovedelem']
  },
  {
    id: 'pm-jotallas-bizonyitas', cat: 'penz',
    q: 'a jótállási idő alatt **nem neked**, hanem a **boltnak kell bizonyítania**, hogy a hibát te okoztad?',
    why: 'Ez a **jótállás** (köznyelven garancia) legnagyobb előnye a szavatossággal szemben. A kötelező jótállás **2026-ban** 10 000 és 250 000 Ft között **2 év**, 250 000 Ft felett **3 év**.\n\nA kellékszavatosságnál csak az **első 1 évben** vélelmezik, hogy a hiba már a vásárláskor megvolt; utána a vásárlónak kell bizonyítania. Ezért nagy értékű terméknél a jótállás alatt mindig érdemes a boltnál reklamálni, és nem elfogadni, hogy „forduljon a gyártóhoz”.',
    links: ['lecke:penz-mindennap/fogyasztovedelem', 'lecke:penz-mindennap/afa-szamla']
  },
  {
    id: 'pm-oba-100000', cat: 'penz',
    q: 'ha egy magyar bank csődbe megy, az OBA betétesenként és bankonként legfeljebb **100 000 eurónak megfelelő** összeget fizet vissza?',
    why: 'Az **Országos Betétbiztosítási Alap** a magyarországi bankokban tartott betéteket védi, a határ az EU-ban egységes. A védelem a betétesnek **ingyenes**, nem kell külön kérni.\n\nAz egy banknál lévő számlák **összeadódnak**: két 60 000 eurós számla együtt is csak 100 000 euróig védett. Nagyobb összegnél érdemes több bankot használni. A **fintech-appok** (például a külföldi engedéllyel működők) pénzét más ország betétbiztosítása vagy e-pénz-szabályok védhetik – ezt mindig nézd meg!',
    links: ['lecke:penz-mindennap/szamlak-kartyak', 'lecke:penzugy/bank']
  }
]);
