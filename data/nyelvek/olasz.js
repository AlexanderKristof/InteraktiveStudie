/* Nyelvtanulás – Olasz (A1–A2) */
STUDIE.addLangCourse({
  id: 'olasz', title: 'Olasz', flag: '🇮🇹', tts: 'it-IT', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'Az olasz a latin legközelebbi élő rokona, és a zene nyelve is: a `piano`, `forte`, `allegro` és a `tempo` mind olasz szavak – sőt, a magyar „spagetti” és „pizza” is!',
  units: [
    {
      id: 'saluti', title: 'Köszönés', icon: '👋',
      tip: '**Kiejtés: c, ci, ch, g, gi, gh**\n\nAz olasz szinte úgy hangzik, ahogy írjuk – csak néhány betűcsoportot kell megjegyezni:\n\n- **c** + a, o, u = k: `casa` (kaza), `come` (kome)\n- **c** + e, i = cs: `ciao` (csao), `cena` (csena)\n- **ch** + e, i = k: `che` (ke), `chi` (ki)\n- **g** + a, o, u = g: `grazie`; **g** + e, i = dzs: `buongiorno` (buondzsorno), `gelato`\n- **gh** + e, i = g: `spaghetti` (szpagetti)\n\nAz `i` a `ci`, `gi` után gyakran csak „lágyít”, nem ejtjük külön: `ciao` két hang, nem csi-ao.\n\nA **h** mindig néma: `ho` = o.\n\nKöszönés: `ciao` (szia – jövet és menet is!), `buongiorno` (délután kb. 4-ig), `buonasera` (onnantól), `buonanotte` (lefekvéskor).',
      words: [['ciao', 'szia'], ['buongiorno', 'jó napot'], ['buonasera', 'jó estét'], ['buonanotte', 'jó éjszakát'], ['arrivederci', 'viszontlátásra'],
        ['a presto', 'viszlát hamarosan'], ['grazie', 'köszönöm'], ['grazie mille', 'nagyon köszönöm'], ['prego', 'szívesen'], ['per favore', 'kérlek'],
        ['scusa', 'bocsánat'], ['sì', 'igen'], ['no', 'nem'], ['bene', 'jól'], ['male', 'rosszul'], ['Come stai?', 'Hogy vagy?'], ['piacere', 'örvendek'], ['salve', 'üdvözöllek']],
      sentences: [
        ['Ciao, come stai?', 'Szia, hogy vagy?'],
        ['Sto bene, grazie.', 'Jól vagyok, köszönöm.', ['Bene, grazie.'], ['Köszönöm, jól vagyok.', 'Jól, köszönöm.']],
        ['Buongiorno, come sta?', 'Jó napot, hogy van?', [], ['Jó napot kívánok, hogy van?']],
        ['Buonasera, signora.', 'Jó estét, asszonyom.', [], ['Jó estét kívánok, asszonyom.']],
        ['Grazie mille!', 'Nagyon köszönöm!', [], ['Köszönöm szépen!', 'Ezer köszönet!']],
        ['Scusa, non capisco.', 'Bocsánat, nem értem.', ['Scusi, non capisco.'], ['Bocsi, nem értem.', 'Elnézést, nem értem.']],
        ['Ciao Marco, a presto!', 'Szia Marco, viszlát hamarosan!', ['Ciao, Marco, a presto!'], ['Szia, Marco, viszlát hamarosan!', 'Szia Marco, hamarosan találkozunk!']],
        ['Sì, per favore.', 'Igen, kérem.', [], ['Igen, kérlek.', 'Igen, kérek.']],
        ['No, grazie.', 'Nem, köszönöm.', [], ['Köszönöm, nem.']],
        ['Buonanotte, mamma!', 'Jó éjszakát, anya!', [], ['Jó éjt, anya!', 'Jó éjszakát, anyu!']],
        ['Sto male, purtroppo.', 'Sajnos rosszul vagyok.', ['Purtroppo sto male.'], ['Rosszul vagyok, sajnos.']],
        ['Piacere, sono Luca.', 'Örvendek, Luca vagyok.', ['Piacere, mi chiamo Luca.'], ['Örülök, Luca vagyok.', 'Örvendek, Lucának hívnak.']],
        ['Grazie! Prego!', 'Köszönöm! Szívesen!']
      ]
    },
    {
      id: 'presentarsi', title: 'Bemutatkozás', icon: '🙋',
      tip: '**Tegeződés vagy magázás? tu és Lei – és az essere ige**\n\n- **tu** = te: barátokkal, családdal, gyerekekkel, fiatalokkal\n- **Lei** = Ön: felnőtt idegenekkel, tanárral, boltban. Nagy L-lel is írhatják, és az igét **3. személyben** használjuk, mint a magyar „Ön”: `Lei è italiana?` (Ön olasz?)\n\nVigyázat: kis betűs `lei` = ő (nőnemű), `lui` = ő (hímnemű). A magyar „ő” nem különbözteti meg a nemeket, az olasz igen.\n\n**essere** (lenni):\n\n- `io sono`, `tu sei`, `lui / lei / Lei è`\n- `noi siamo`, `voi siete`, `loro sono`\n\nAz **alanyt általában elhagyjuk**, mert az igealak elárulja: `Sono ungherese.` (Magyar vagyok.) – pont, mint a magyarban!\n\nA nemzetiség is nemet vált: `italiano` (fiú), `italiana` (lány); az `ungherese` mindkettőre jó.',
      words: [['io', 'én'], ['tu', 'te'], ['lui', 'ő (férfi)'], ['lei', 'ő (nő)'], ['Lei', 'Ön'], ['noi', 'mi'], ['voi', 'ti'], ['loro', 'ők'], ['sono', 'vagyok'],
        ['è', 'van (ő)'], ['mi chiamo', 'a nevem'], ['il nome', 'név'], ['italiano', 'olasz (fiú)'], ['italiana', 'olasz (lány)'], ['ungherese', 'magyar'],
        ['Di dove sei?', 'Honnan származol?'], ['l\'Italia', 'Olaszország'], ['l\'Ungheria', 'Magyarország'], ['lo studente', 'diák']],
      sentences: [
        ['Io sono Marco.', 'Marco vagyok.', ['Sono Marco.', 'Mi chiamo Marco.'], ['Én Marco vagyok.', 'Marcónak hívnak.']],
        ['Come ti chiami?', 'Hogy hívnak?', [], ['Mi a neved?', 'Téged hogy hívnak?']],
        ['Come si chiama?', 'Önt hogy hívják?', [], ['Hogy hívják?', 'Mi a neve?']],
        ['Di dove sei?', 'Honnan származol?', ['Tu di dove sei?'], ['Honnan vagy?', 'Hová valósi vagy?']],
        ['Sono ungherese.', 'Magyar vagyok.', ['Io sono ungherese.'], ['Én magyar vagyok.']],
        ['Lei è italiana?', 'Ön olasz?', ['È italiana?'], ['Ő olasz?', 'Olasz ön?']],
        ['Lui è di Roma.', 'Ő római.', ['È di Roma.'], ['Ő Rómából való.', 'Rómából való.', 'Római.']],
        ['Noi siamo studenti.', 'Mi diákok vagyunk.', ['Siamo studenti.'], ['Diákok vagyunk.']],
        ['Voi siete di Budapest?', 'Ti budapestiek vagytok?', ['Siete di Budapest?'], ['Budapestiek vagytok?', 'Ti Budapestről vagytok?', 'Budapestről vagytok?']],
        ['Loro sono amici.', 'Ők barátok.', ['Sono amici.'], ['Barátok.']],
        ['Tu sei Giulia?', 'Te vagy Giulia?', ['Sei Giulia?'], ['Giulia vagy?', 'Te Giulia vagy?']],
        ['Mi chiamo Anna e sono ungherese.', 'Annának hívnak, és magyar vagyok.', ['Mi chiamo Anna, sono ungherese.'], ['Anna vagyok, és magyar vagyok.', 'A nevem Anna, és magyar vagyok.']]
      ]
    },
    {
      id: 'numeri', title: 'Számok és életkor', icon: '🔢',
      tip: '**Számok és az életkor: avere**\n\n1–10: `uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci`. 11–16 végén `-dici`: `undici, dodici, tredici, quattordici, quindici, sedici`; 17-től elöl: `diciassette, diciotto, diciannove`.\n\nA tízesek után az egyest hozzáírjuk: `venti` → `ventitré`; ha az egyes magánhangzóval kezdődik, a tízes végéről kiesik a betű: `ventuno`, `ventotto`.\n\n**Életkor = avere (birtokolni)!** Az olasz azt mondja: „van 12 évem”:\n\n- `Ho dodici anni.` – Tizenkét éves vagyok.\n- `Quanti anni hai?` – Hány éves vagy?\n\nAz **avere** ragozása (a h néma!): `ho, hai, ha, abbiamo, avete, hanno`.\n\nTagadás: `non` az ige elé: `Non ho undici anni.`\n\nSzámolás: `due più tre fa cinque` (2 + 3 = 5).',
      words: [['uno', 'egy'], ['due', 'kettő'], ['tre', 'három'], ['quattro', 'négy'], ['cinque', 'öt'], ['sei', 'hat'], ['sette', 'hét'], ['otto', 'nyolc'], ['nove', 'kilenc'],
        ['dieci', 'tíz'], ['undici', 'tizenegy'], ['dodici', 'tizenkettő'], ['quindici', 'tizenöt'], ['venti', 'húsz'], ['cento', 'száz'], ['l\'anno', 'év'],
        ['il numero', 'szám'], ['ho', 'nekem van'], ['hai', 'neked van']],
      sentences: [
        ['Ho dodici anni.', 'Tizenkét éves vagyok.', ['Io ho dodici anni.'], ['Tizenkétéves vagyok.', 'Én tizenkét éves vagyok.']],
        ['Quanti anni hai?', 'Hány éves vagy?', ['Tu quanti anni hai?'], ['Te hány éves vagy?']],
        ['Quanti anni ha?', 'Hány éves?', [], ['Ön hány éves?', 'Ő hány éves?']],
        ['Mia sorella ha dieci anni.', 'A húgom tízéves.', [], ['A húgom tíz éves.', 'A lánytestvérem tízéves.', 'A nővérem tízéves.']],
        ['Due più tre fa cinque.', 'Kettő meg három az öt.', ['Due più tre è cinque.'], ['Kettő plusz három az öt.', 'Kettő meg három öt.', 'Kettő plusz három öt.']],
        ['Cinque più cinque fa dieci.', 'Öt meg öt az tíz.', ['Cinque più cinque è dieci.'], ['Öt plusz öt az tíz.', 'Öt meg öt tíz.', 'Öt plusz öt tíz.']],
        ['Abbiamo quattro gatti.', 'Négy macskánk van.', ['Noi abbiamo quattro gatti.'], ['Nekünk négy macskánk van.', 'Van négy macskánk.']],
        ['Lui ha quindici anni.', 'Ő tizenöt éves.', ['Ha quindici anni.'], ['Tizenöt éves.', 'Ő tizenötéves.']],
        ['Ho cento euro.', 'Száz eurom van.', ['Io ho cento euro.'], ['Van száz eurom.', 'Nekem száz eurom van.']],
        ['Non ho undici anni.', 'Nem vagyok tizenegy éves.', ['Io non ho undici anni.'], ['Én nem vagyok tizenegy éves.']],
        ['Avete otto libri?', 'Van nyolc könyvetek?', [], ['Nyolc könyvetek van?']],
        ['Il mio numero è sette.', 'A számom a hetes.', [], ['Az én számom a hetes.', 'A számom a hét.']]
      ]
    },
    {
      id: 'famiglia', title: 'A család', icon: '👨‍👩‍👧',
      tip: '**Névelők: il, lo, la, l\' – i, gli, le**\n\nAz olasz főnév **hímnemű** vagy **nőnemű**. Általában: -o hímnem (`il nonno`), -a nőnem (`la nonna`), az -e végűeknél tanuld meg a névelővel (`il padre`, `la madre`).\n\nHímnem:\n\n- `il` – a legtöbb szó előtt: `il padre`, `il gatto` → többes: `i gatti`\n- `lo` – s+mássalhangzó, z, gn, ps előtt: `lo zio`, `lo studente` → `gli zii`\n- `l\'` – magánhangzó előtt: `l\'amico` → `gli amici`\n\nNőnem:\n\n- `la` → többes `le`: `la zia` → `le zie`\n- `l\'` magánhangzó előtt: `l\'amica` → `le amiche`\n\nTöbbes szám: -o → **-i**, -a → **-e**, -e → **-i**.\n\nBirtokos névmás előtt is kell névelő (`la mia famiglia`), **kivéve** egyes számú rokon előtt: `mia madre`, `mio padre` (de `i miei genitori`).',
      words: [['la famiglia', 'család'], ['la madre', 'anya'], ['il padre', 'apa'], ['la mamma', 'anyu'], ['il papà', 'apu'], ['il fratello', 'fiútestvér'],
        ['la sorella', 'lánytestvér'], ['il nonno', 'nagypapa'], ['la nonna', 'nagymama'], ['lo zio', 'nagybácsi'], ['la zia', 'nagynéni'], ['il cugino', 'unokatestvér'],
        ['i genitori', 'szülők'], ['il cane', 'kutya'], ['il gatto', 'macska'], ['grande', 'nagy'], ['piccolo', 'kicsi'], ['giovane', 'fiatal'], ['anziano', 'idős']],
      sentences: [
        ['Questa è mia madre.', 'Ő az anyám.', [], ['Ez az anyám.', 'Ő az anyukám.', 'Ez az anyukám.']],
        ['Mio padre si chiama Paolo.', 'Az apámat Paolónak hívják.', [], ['Apámat Paolónak hívják.', 'Az apukámat Paolónak hívják.', 'Apukámat Paolónak hívják.']],
        ['Ho un fratello e una sorella.', 'Van egy fiútestvérem és egy lánytestvérem.', ['Io ho un fratello e una sorella.'], ['Van egy fiú- és egy lánytestvérem.']],
        ['La nonna è anziana.', 'A nagymama idős.', [], ['A nagyi idős.']],
        ['Lo zio è giovane.', 'A nagybácsi fiatal.', [], ['Fiatal a nagybácsi.']],
        ['I miei genitori sono a casa.', 'A szüleim otthon vannak.', [], ['Szüleim otthon vannak.']],
        ['Il gatto è piccolo.', 'A macska kicsi.', [], ['Kicsi a macska.']],
        ['Mia zia ha un cane grande.', 'A nagynénémnek nagy kutyája van.', ['Mia zia ha un grande cane.'], ['Nagynénémnek nagy kutyája van.', 'A nagynénémnek van egy nagy kutyája.']],
        ['Hai fratelli?', 'Vannak testvéreid?', ['Hai dei fratelli?'], ['Van testvéred?']],
        ['La mia famiglia è grande.', 'A családom nagy.', [], ['Nagy a családom.', 'Az én családom nagy.']],
        ['Marco è mio cugino.', 'Marco az unokatestvérem.', [], ['Marco az unokabátyám.', 'Marco az unokaöcsém.']],
        ['Lo zio e la zia sono qui.', 'A nagybácsi és a nagynéni itt vannak.', [], ['A nagybácsi és a nagynéni itt van.', 'Itt van a nagybácsi és a nagynéni.']]
      ]
    },
    {
      id: 'scuola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**Kiejtés 2: gli, gn, sc és a dupla mássalhangzók**\n\n- **gn** = ny: `lavagna` (lavanya), `bagno` (bannyo), `ogni`\n- **gli** = lyi, kb. mint a régies magyar ly: `gli occhiali`, `il foglio` (folyo), `la famiglia`\n- **sc** + e, i = s: `la scienza`, `uscire`; **sc** + a, o, u = szk: `la scuola` (szkuola); **sch** = szk: `lo schermo`\n- **z** = c vagy dz: `lo zaino` (dzaino), `la pizza` (picca)\n\n**Dupla mássalhangzó**: tényleg hosszan ejtjük, mint a magyarban – és a jelentést is megváltoztathatja!\n\n- `penna` (toll) – `pena` (fájdalom)\n- `nonno` (nagypapa) – `nono` (kilencedik)\n- `sette` (hét) – `sete` (szomjúság)\n\nA magyar fülnek ez könnyű, mert nálunk is van különbség: `tol` – `toll`, `szál` – `száll`.',
      words: [['la scuola', 'iskola'], ['la classe', 'osztály'], ['il professore', 'tanár'], ['la professoressa', 'tanárnő'], ['il libro', 'könyv'], ['il quaderno', 'füzet'],
        ['la penna', 'toll'], ['la matita', 'ceruza'], ['lo zaino', 'hátizsák'], ['la gomma', 'radír'], ['il banco', 'pad'], ['la sedia', 'szék'], ['la lavagna', 'tábla'],
        ['la finestra', 'ablak'], ['la porta', 'ajtó'], ['gli occhiali', 'szemüveg'], ['il foglio', 'papírlap'], ['la lezione', 'tanóra'], ['i compiti', 'házi feladat']],
      sentences: [
        ['Ho una penna e una matita.', 'Van egy tollam és egy ceruzám.', [], ['Van egy tollam meg egy ceruzám.']],
        ['Il libro è nello zaino.', 'A könyv a hátizsákban van.', [], ['A hátizsákban van a könyv.']],
        ['La professoressa è in classe.', 'A tanárnő az osztályban van.', [], ['A tanárnő a teremben van.', 'A tanárnő bent van az osztályban.']],
        ['Apri la finestra, per favore.', 'Nyisd ki az ablakot, kérlek!', ['Per favore, apri la finestra.'], ['Kérlek, nyisd ki az ablakot!']],
        ['Chiudi la porta, per favore.', 'Csukd be az ajtót, kérlek!', ['Per favore, chiudi la porta.'], ['Kérlek, csukd be az ajtót!']],
        ['Non ho la gomma.', 'Nincs radírom.', [], ['Nincs nálam radír.', 'Nincs meg a radírom.']],
        ['Dov\'è il mio quaderno?', 'Hol van a füzetem?', [], ['Hol a füzetem?']],
        ['Gli studenti sono bravi.', 'A diákok ügyesek.', [], ['A diákok jók.', 'A tanulók ügyesek.']],
        ['Guarda la lavagna!', 'Nézd a táblát!', [], ['Nézz a táblára!', 'Nézd meg a táblát!']],
        ['Oggi abbiamo tanti compiti.', 'Ma sok házi feladatunk van.', [], ['Ma sok leckénk van.', 'Sok házi feladatunk van ma.']],
        ['Il professore porta gli occhiali.', 'A tanár szemüveget hord.', [], ['A tanár úr szemüveget hord.', 'A tanár szemüveges.']],
        ['Ecco un foglio.', 'Tessék, egy papírlap.', [], ['Itt egy papírlap.', 'Tessék, egy lap.']]
      ]
    },
    {
      id: 'cibo', title: 'Étel és ital', icon: '🍕',
      tip: '**Mi piace – tetszik, szeretem**\n\nAz olasz nem azt mondja, hogy „szeretem a pizzát”, hanem azt, hogy „**tetszik nekem** a pizza”: `Mi piace la pizza.`\n\nEzért az ige ahhoz igazodik, **ami tetszik**, nem ahhoz, akinek tetszik:\n\n- egy dolog vagy ige: `mi piace` – `Mi piace la pasta.`, `Mi piace nuotare.`\n- több dolog: `mi piacciono` – `Mi piacciono le mele.`\n\nKinek tetszik?\n\n- `mi` (nekem), `ti` (neked), `gli` (neki – fiú), `le` (neki – lány), `Le` (Önnek)\n- `ci` (nekünk), `vi` (nektek), `gli` (nekik)\n- névvel: `A Marco piace il gelato.`\n\nTagadás: `Non mi piace il latte.`\n\nA magyarban is van ilyen szerkezet: „Ízlik nekem a pizza” – itt is a pizza az alany!',
      words: [['la pizza', 'pizza'], ['la pasta', 'tészta'], ['il pane', 'kenyér'], ['il formaggio', 'sajt'], ['la mela', 'alma'], ['la frutta', 'gyümölcs'],
        ['il gelato', 'fagylalt'], ['l\'acqua', 'víz'], ['il latte', 'tej'], ['il caffè', 'kávé'], ['il tè', 'tea'], ['il succo', 'gyümölcslé'], ['la carne', 'hús'],
        ['il pesce', 'hal'], ['la verdura', 'zöldség'], ['il pomodoro', 'paradicsom'], ['la colazione', 'reggeli'], ['il pranzo', 'ebéd'], ['la cena', 'vacsora'], ['Ho fame', 'éhes vagyok']],
      sentences: [
        ['Mi piace la pizza.', 'Szeretem a pizzát.', [], ['Ízlik a pizza.', 'Én szeretem a pizzát.']],
        ['Mi piacciono le mele.', 'Szeretem az almát.', [], ['Szeretem az almákat.']],
        ['Ti piace il pesce?', 'Szereted a halat?', ['Il pesce ti piace?'], ['Ízlik a hal?']],
        ['Non mi piace il latte.', 'Nem szeretem a tejet.', [], ['Nem ízlik a tej.']],
        ['A Marco piace il gelato.', 'Marco szereti a fagylaltot.', [], ['Marco szereti a fagyit.']],
        ['Un caffè, per favore.', 'Egy kávét kérek.', [], ['Kérek egy kávét.', 'Egy kávét kérek szépen.']],
        ['Ho fame!', 'Éhes vagyok!'],
        ['Mangio pane e formaggio.', 'Kenyeret és sajtot eszem.', ['Io mangio pane e formaggio.'], ['Kenyeret eszem sajttal.', 'Sajtos kenyeret eszem.']],
        ['A pranzo mangiamo la pasta.', 'Ebédre tésztát eszünk.', ['Mangiamo la pasta a pranzo.'], ['Tésztát eszünk ebédre.']],
        ['Le piace la carne?', 'Ön szereti a húst?', [], ['Szereti a húst?', 'Ő szereti a húst?']],
        ['Bevo un succo di frutta.', 'Iszom egy gyümölcslevet.', ['Io bevo un succo di frutta.'], ['Egy gyümölcslevet iszom.']],
        ['La cena è pronta.', 'Kész a vacsora.', [], ['A vacsora kész.']],
        ['Ci piacciono i pomodori.', 'Szeretjük a paradicsomot.', [], ['Mi szeretjük a paradicsomot.', 'Szeretjük a paradicsomokat.']]
      ]
    },
    {
      id: 'giornata', title: 'Napok és napirend', icon: '⏰',
      tip: '**Igeragozás jelen időben: -are, -ere, -ire**\n\nAz olasz igék főnévi igenéve háromféle végződésű. A tő után a magyarhoz hasonlóan **személyragok** jönnek, ezért a névmás elhagyható:\n\n- **parlare** (beszélni): `parlo, parli, parla, parliamo, parlate, parlano`\n- **leggere** (olvasni): `leggo, leggi, legge, leggiamo, leggete, leggono`\n- **dormire** (aludni): `dormo, dormi, dorme, dormiamo, dormite, dormono`\n\nAz egyes szám 1. személy mindig **-o**, a 2. mindig **-i**, a többes 1. mindig **-iamo**.\n\nKiejtés: `leggo` = leggo, de `leggi` = leddzsi (a g + i szabály!).\n\nNapok: kisbetűvel írjuk őket! `lunedì` = hétfőn; `il lunedì` = hétfőnként.\n\nTagadás a `mai` (soha) mellett is `non`: `Non dormo mai.` – pont, mint a magyar „soha **nem** alszom”.',
      words: [['lunedì', 'hétfő'], ['martedì', 'kedd'], ['mercoledì', 'szerda'], ['giovedì', 'csütörtök'], ['venerdì', 'péntek'], ['sabato', 'szombat'], ['domenica', 'vasárnap'],
        ['oggi', 'ma'], ['domani', 'holnap'], ['la mattina', 'reggel'], ['la sera', 'este'], ['parlare', 'beszélni'], ['mangiare', 'enni'], ['leggere', 'olvasni'],
        ['scrivere', 'írni'], ['dormire', 'aludni'], ['partire', 'elutazni'], ['lavorare', 'dolgozni'], ['sempre', 'mindig'], ['mai', 'soha']],
      sentences: [
        ['Parlo italiano.', 'Beszélek olaszul.', ['Io parlo italiano.'], ['Olaszul beszélek.', 'Én beszélek olaszul.']],
        ['Parli inglese?', 'Beszélsz angolul?', ['Tu parli inglese?'], ['Tudsz angolul?', 'Angolul beszélsz?']],
        ['Lei legge un libro.', 'Ő egy könyvet olvas.', ['Legge un libro.'], ['Könyvet olvas.', 'Egy könyvet olvas.', 'Ön egy könyvet olvas.', 'Ő könyvet olvas.']],
        ['Scriviamo una lettera.', 'Levelet írunk.', ['Noi scriviamo una lettera.'], ['Egy levelet írunk.', 'Mi levelet írunk.']],
        ['La domenica dormo molto.', 'Vasárnaponként sokat alszom.', ['Dormo molto la domenica.'], ['Vasárnap sokat alszom.']],
        ['Lunedì vado a scuola.', 'Hétfőn iskolába megyek.', ['Vado a scuola lunedì.'], ['Hétfőn megyek iskolába.']],
        ['Oggi è venerdì.', 'Ma péntek van.'],
        ['Domani è sabato.', 'Holnap szombat lesz.', [], ['Holnap szombat van.']],
        ['La mattina bevo il latte.', 'Reggel tejet iszom.', ['Bevo il latte la mattina.'], ['Reggelente tejet iszom.']],
        ['Partiamo martedì.', 'Kedden elutazunk.', ['Martedì partiamo.'], ['Kedden indulunk.', 'Kedden elindulunk.']],
        ['Mio padre lavora sempre.', 'Apukám mindig dolgozik.', [], ['Az apukám mindig dolgozik.', 'Apám mindig dolgozik.', 'Az apám mindig dolgozik.']],
        ['Non dormo mai il pomeriggio.', 'Délután soha nem alszom.', ['Il pomeriggio non dormo mai.'], ['Soha nem alszom délután.', 'Délután sosem alszom.', 'Sosem alszom délután.']],
        ['La sera leggete?', 'Este olvastok?', ['Leggete la sera?'], ['Olvastok este?']]
      ]
    },
    {
      id: 'casa', title: 'Otthon és a város', icon: '🏠',
      tip: '**Van valahol: c\'è és ci sono**\n\nHa azt mondod, hogy valami **van, található** valahol:\n\n- egyes szám: `C\'è un tavolo in cucina.` (Van egy asztal a konyhában.)\n- többes szám: `Ci sono due camere.` (Két szoba van.)\n- kérdés – csak a hanglejtés változik: `C\'è un giardino?`\n- tagadás: `Non c\'è il bagno.`\n\nHa azt kérdezed, **hol** van egy konkrét dolog, akkor `Dov\'è…?` (`dove` + `è`): `Dov\'è la stazione?`\n\n**a vagy in?**\n\n- városnév előtt `a`: `a Roma`, `a Budapest`\n- ország, szoba, sok hely előtt `in`: `in Italia`, `in cucina`, `in città`\n- `a casa` (otthon / haza), `a scuola`, `a piedi` (gyalog)\n- járművel: `in treno`, `in macchina`, `in autobus`\n\nA névelővel összeolvadnak: `a + il` = `al` (`al cinema`), `su + il` = `sul` (`sul letto`).',
      words: [['la casa', 'ház'], ['l\'appartamento', 'lakás'], ['la camera', 'szoba'], ['la cucina', 'konyha'], ['il bagno', 'fürdőszoba'], ['il letto', 'ágy'],
        ['il tavolo', 'asztal'], ['il divano', 'kanapé'], ['il giardino', 'kert'], ['la città', 'város'], ['la via', 'utca'], ['il negozio', 'bolt'], ['la stazione', 'állomás'],
        ['il cinema', 'mozi'], ['il parco', 'park'], ['l\'autobus', 'busz'], ['la macchina', 'autó'], ['il treno', 'vonat'], ['la bici', 'bicikli'], ['a piedi', 'gyalog']],
      sentences: [
        ['C\'è un tavolo in cucina.', 'Van egy asztal a konyhában.', [], ['A konyhában van egy asztal.']],
        ['Ci sono due camere.', 'Két szoba van.', [], ['Van két szoba.']],
        ['C\'è un giardino?', 'Van kert?', [], ['Van egy kert?', 'Van kertje?']],
        ['Abito in un appartamento.', 'Egy lakásban lakom.', ['Vivo in un appartamento.'], ['Lakásban lakom.']],
        ['Il gatto dorme sul letto.', 'A macska az ágyon alszik.', [], ['Az ágyon alszik a macska.']],
        ['Vado a scuola a piedi.', 'Gyalog megyek iskolába.', [], ['Gyalog járok iskolába.', 'Iskolába gyalog megyek.']],
        ['Prendo l\'autobus.', 'Busszal megyek.', [], ['Felszállok a buszra.', 'Busszal járok.']],
        ['Dov\'è la stazione?', 'Hol van az állomás?', [], ['Hol van a pályaudvar?', 'Hol az állomás?']],
        ['Andiamo al cinema?', 'Elmegyünk moziba?', [], ['Megyünk moziba?', 'Menjünk moziba?']],
        ['Il negozio è in questa via.', 'A bolt ebben az utcában van.', [], ['Az üzlet ebben az utcában van.']],
        ['A Roma ci sono tanti parchi.', 'Rómában sok park van.', ['Ci sono tanti parchi a Roma.'], ['Rómában sok park található.']],
        ['Vado in città in treno.', 'Vonattal megyek a városba.', [], ['A városba vonattal megyek.', 'Vonattal megyek be a városba.']],
        ['Mia madre va in macchina.', 'Az anyukám autóval megy.', [], ['Anyukám autóval megy.', 'Anyám autóval megy.', 'Az anyám autóval megy.']]
      ]
    },
    {
      id: 'tempo-libero', title: 'Szabadidő és sport', icon: '⚽',
      tip: '**Rendhagyó igék: andare és fare – és a játék két igéje**\n\nA leggyakoribb igék rendhagyók, ezeket érdemes kívülről tudni:\n\n- **andare** (menni): `vado, vai, va, andiamo, andate, vanno`\n- **fare** (csinálni): `faccio, fai, fa, facciamo, fate, fanno`\n\nA `fare` sok kifejezésben szerepel: `fare sport` (sportolni), `fare colazione` (reggelizni), `Che cosa fai?` (Mit csinálsz?).\n\n**Játszani** kétféleképpen:\n\n- sport, játék: `giocare a`: `gioco a calcio`, `gioco a tennis`\n- hangszer: `suonare`: `suono la chitarra`, `suoni il piano?`\n\nÉvszakok és hétvége: `d\'estate` (nyáron), `d\'inverno` (télen), `il fine settimana` (hétvégén).\n\nA `mi piace` után főnévi igenév jön: `Mi piace nuotare.` (Szeretek úszni.)',
      words: [['giocare a calcio', 'focizni'], ['suonare la chitarra', 'gitározni'], ['nuotare', 'úszni'], ['ballare', 'táncolni'], ['cantare', 'énekelni'],
        ['disegnare', 'rajzolni'], ['correre', 'futni'], ['la musica', 'zene'], ['lo sport', 'sport'], ['il film', 'film'], ['il videogioco', 'videojáték'],
        ['il fine settimana', 'hétvége'], ['l\'estate', 'nyár'], ['l\'inverno', 'tél'], ['il mare', 'tenger'], ['la montagna', 'hegy'], ['andare', 'menni'], ['fare', 'csinálni']],
      sentences: [
        ['Gioco a calcio con gli amici.', 'A barátaimmal focizom.', ['Io gioco a calcio con gli amici.'], ['Focizom a barátaimmal.']],
        ['Suoni la chitarra?', 'Gitározol?', ['Tu suoni la chitarra?'], ['Játszol gitáron?']],
        ['Mi piace nuotare.', 'Szeretek úszni.', [], ['Én szeretek úszni.']],
        ['Che cosa fai il fine settimana?', 'Mit csinálsz hétvégén?', ['Cosa fai il fine settimana?', 'Che fai il fine settimana?'], ['Mit csinálsz a hétvégén?', 'Hétvégén mit csinálsz?']],
        ['Faccio sport ogni giorno.', 'Minden nap sportolok.', [], ['Mindennap sportolok.']],
        ['D\'estate andiamo al mare.', 'Nyáron a tengerhez megyünk.', ['In estate andiamo al mare.'], ['Nyáron a tengerpartra megyünk.', 'Nyáron tengerhez megyünk.']],
        ['D\'inverno vanno in montagna.', 'Télen a hegyekbe mennek.', ['In inverno vanno in montagna.'], ['Télen hegyekbe mennek.', 'Télen a hegyekbe járnak.']],
        ['Giulia canta molto bene.', 'Giulia nagyon jól énekel.', [], ['Giulia nagyon szépen énekel.']],
        ['Balliamo insieme?', 'Táncolunk együtt?', [], ['Táncoljunk együtt?', 'Együtt táncolunk?']],
        ['Mio fratello gioca ai videogiochi.', 'Az öcsém videojátékozik.', [], ['A bátyám videojátékozik.', 'A fiútestvérem videojátékozik.', 'Az öcsém videojátékokkal játszik.', 'A bátyám videojátékokkal játszik.']],
        ['Stasera guardiamo un film.', 'Ma este filmet nézünk.', ['Guardiamo un film stasera.'], ['Ma este megnézünk egy filmet.', 'Ma este nézünk egy filmet.']],
        ['Ascolto la musica.', 'Zenét hallgatok.', ['Ascolto musica.'], ['Hallgatom a zenét.']],
        ['Disegni bene!', 'Jól rajzolsz!', ['Tu disegni bene!'], ['Ügyesen rajzolsz!']]
      ]
    },
    {
      id: 'passato', title: 'Mit csináltál? Múlt idő', icon: '⏪',
      tip: '**Passato prossimo – az összetett múlt**\n\nA beszélt olaszban a múlt időt két részből rakjuk össze: **avere** vagy **essere** jelen ideje + a **befejezett melléknévi igenév** (participio).\n\nA participio képzése:\n\n- -are → **-ato**: `mangiare` → `mangiato`, `parlare` → `parlato`\n- -ere → **-uto**: `avere` → `avuto`\n- -ire → **-ito**: `dormire` → `dormito`\n- rendhagyók: `fare` → `fatto`, `vedere` → `visto`, `leggere` → `letto`, `essere` → `stato`\n\nA legtöbb ige **avere**-vel: `Ho mangiato.` (Ettem.), `Hai dormito?` (Aludtál?)\n\nA mozgást, változást jelentő igék (`andare`, `partire`, `essere`) **essere**-vel, és ilyenkor a participio **egyezik az alannyal**, mint egy melléknév:\n\n- `Marco è andato` – Marco elment\n- `Giulia è andata` – Giulia elment\n- `Siamo andati` – elmentünk\n\nIdőhatározók: `ieri` (tegnap), `la settimana scorsa` (múlt héten), `due giorni fa` (két napja).',
      words: [['ieri', 'tegnap'], ['la settimana scorsa', 'múlt héten'], ['l\'anno scorso', 'tavaly'], ['fa', 'ezelőtt'], ['ho mangiato', 'ettem'], ['ho visto', 'láttam'],
        ['ho fatto', 'csináltam'], ['ho comprato', 'vettem (vásároltam)'], ['ho dormito', 'aludtam'], ['ho parlato', 'beszéltem'], ['ho letto', 'olvastam'],
        ['sono andato', 'elmentem (fiú mondja)'], ['sono andata', 'elmentem (lány mondja)'], ['il regalo', 'ajándék'], ['le vacanze', 'szünidő'], ['il viaggio', 'utazás'],
        ['il biglietto', 'jegy'], ['caro', 'drága'], ['economico', 'olcsó']],
      sentences: [
        ['Ieri ho mangiato la pizza.', 'Tegnap pizzát ettem.', ['Ho mangiato la pizza ieri.'], ['Pizzát ettem tegnap.', 'Tegnap ettem pizzát.']],
        ['Ho visto un bel film.', 'Láttam egy jó filmet.', [], ['Megnéztem egy jó filmet.', 'Láttam egy szép filmet.']],
        ['Sono andata al mare.', 'Elmentem a tengerhez.', [], ['A tengerhez mentem.', 'A tengerpartra mentem.']],
        ['Marco è andato a Roma.', 'Marco Rómába ment.', [], ['Marco elment Rómába.']],
        ['Che cosa hai fatto ieri?', 'Mit csináltál tegnap?', ['Cosa hai fatto ieri?'], ['Tegnap mit csináltál?']],
        ['Abbiamo comprato un regalo.', 'Vettünk egy ajándékot.', [], ['Egy ajándékot vettünk.']],
        ['L\'anno scorso sono stato in Italia.', 'Tavaly Olaszországban voltam.', ['Sono stato in Italia l\'anno scorso.'], ['Tavaly voltam Olaszországban.']],
        ['Hai dormito bene?', 'Jól aludtál?', [], ['Aludtál jól?']],
        ['Ho letto un libro due giorni fa.', 'Két napja olvastam egy könyvet.', ['Due giorni fa ho letto un libro.'], ['Két nappal ezelőtt olvastam egy könyvet.']],
        ['Il biglietto era caro.', 'A jegy drága volt.', ['Il biglietto è stato caro.'], ['Drága volt a jegy.']],
        ['Ho parlato con la nonna.', 'Beszéltem a nagymamával.', [], ['A nagymamával beszéltem.', 'Beszéltem a nagyival.']],
        ['Non ho fatto i compiti.', 'Nem csináltam meg a házi feladatot.', [], ['Nem írtam meg a házit.', 'Nem írtam meg a leckét.', 'Nem csináltam meg a leckét.']],
        ['Le vacanze sono state belle.', 'Szép volt a szünidő.', [], ['A szünidő szép volt.', 'Szép volt a vakáció.']]
      ]
    }
  ]
});
