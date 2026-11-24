/* Spanyol nyelvtanfolyam (A1–A2, spanyolországi spanyol) */
STUDIE.addLangCourse({
  id: 'spanyol', title: 'Spanyol', flag: '🇪🇸', tts: 'es-ES', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'A spanyol közel félmilliárd ember anyanyelve – a kínai után ezt beszélik anyanyelvként a legtöbben a világon, ráadásul szinte úgy kell kiejteni, ahogy le van írva.',
  units: [
    {
      id: 'koszones', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: 'A spanyol kiejtés könnyű: majdnem minden betűt mindig ugyanúgy ejtünk.\n\n' +
        '- **ñ** = magyar **ny**: `España` (Eszpánya), `mañana` (manyána)\n' +
        '- **j** és **ge, gi** = erős, torokhangú **h** (mint a német „Bach”): `jamón`, `gente`\n' +
        '- **ll** = kb. **j**: `me llamo` (me jámo), `calle`\n' +
        '- **h** néma: `hola` = ola, `hasta` = aszta\n' +
        '- **c** (e, i előtt) és **z** = selypítő hang, mint az angol „think”: `gracias`, `cinco`, `azul`\n' +
        '- **s** = magyar **sz**: `sí` (szí); **qu** = **k**: `qué`\n' +
        '- **v** és **b** ugyanaz: `vale` ≈ bále\n\n' +
        '**Latin-Amerikában** néhány dolog másképp van: a c/z-t is sz-nek ejtik (`gracias` = grászjasz), a „ti” helyett mindig `ustedes`-t mondanak (a `vosotros` nincs használatban), és sok szó is más: autó = `carro` (nálunk `coche`), gyümölcslé = `jugo` (nálunk `zumo`). Mindkét változatot mindenhol megértik!',
      words: [
        ['hola', 'szia'], ['buenos días', 'jó reggelt'], ['buenas tardes', 'jó napot (délután)'], ['buenas noches', 'jó éjszakát'],
        ['adiós', 'viszlát'], ['hasta luego', 'majd találkozunk'], ['hasta mañana', 'viszlát holnap'], ['gracias', 'köszönöm'],
        ['por favor', 'kérem'], ['de nada', 'szívesen'], ['sí', 'igen'], ['no', 'nem'], ['perdón', 'bocsánat'],
        ['me llamo', 'a nevem'], ['el señor', 'az úr'], ['la señora', 'a hölgy'], ['mucho gusto', 'örvendek'], ['bien', 'jól']
      ],
      sentences: [
        ['Hola, me llamo Ana.', 'Szia, Anának hívnak.', ['Hola, soy Ana.'], ['Szia, a nevem Ana.', 'Szia, Ana vagyok.']],
        ['¿Cómo te llamas?', 'Hogy hívnak?', [], ['Mi a neved?']],
        ['Hola, ¿qué tal?', 'Szia, hogy vagy?', [], ['Szia, mi újság?']],
        ['Estoy bien, gracias.', 'Jól vagyok, köszönöm.', ['Bien, gracias.'], ['Köszönöm, jól vagyok.']],
        ['Buenos días, señora García.', 'Jó reggelt, García asszony.', [], ['Jó napot, García asszony.']],
        ['Mucho gusto, me llamo Pablo.', 'Örvendek, Pablónak hívnak.', [], ['Örvendek, a nevem Pablo.']],
        ['Y tú, ¿qué tal?', 'És te hogy vagy?', [], ['És te, hogy vagy?']],
        ['Adiós, hasta mañana.', 'Viszlát, holnap találkozunk.', [], ['Viszlát, majd holnap.']],
        ['¿Cómo está usted?', 'Hogy van?', [], ['Ön hogy van?', 'Hogy van ön?']],
        ['Muchas gracias, señor.', 'Nagyon köszönöm, uram.', [], []],
        ['Muchas gracias. ¡De nada!', 'Nagyon köszönöm. Szívesen!', [], []],
        ['Perdón, no me llamo Ana.', 'Bocsánat, nem Anának hívnak.', [], ['Bocsánat, nem Ana a nevem.']]
      ]
    },
    {
      id: 'szamok', title: 'Számok és életkor', icon: '🔢',
      tip: 'A számok:\n\n' +
        '- 1–10: `uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez`\n' +
        '- 11–15: `once, doce, trece, catorce, quince`\n' +
        '- 16–19 egy szóban: `dieciséis, diecisiete, dieciocho, diecinueve`\n' +
        '- 20-as évek is egy szóban: `veinte, veintiuno, veintidós`… 30-tól külön, **y**-nal („és”): `treinta y uno`\n' +
        '- `cien` = 100\n\n' +
        'A **uno** főnév előtt megrövidül: `un libro` (egy könyv), nőnemben `una casa`.\n\n' +
        '**Életkor:** a spanyol nem „van” valahány éves, hanem **valahány éve van** – a `tener` (birtokolni) igével: `Tengo doce años.` = Tizenkét éves vagyok (szó szerint: tizenkét évem van). Kérdés: `¿Cuántos años tienes?` = Hány éves vagy?\n\n' +
        'Figyeld meg: a `cuántos` alakja igazodik a főnévhez (`años` hímnemű többes szám).',
      words: [
        ['cero', 'nulla'], ['uno', 'egy'], ['dos', 'kettő'], ['tres', 'három'], ['cuatro', 'négy'], ['cinco', 'öt'],
        ['seis', 'hat'], ['siete', 'hét'], ['ocho', 'nyolc'], ['nueve', 'kilenc'], ['diez', 'tíz'], ['once', 'tizenegy'],
        ['doce', 'tizenkettő'], ['quince', 'tizenöt'], ['veinte', 'húsz'], ['cien', 'száz'], ['el número', 'a szám'], ['el año', 'az év']
      ],
      sentences: [
        ['Tengo doce años.', 'Tizenkét éves vagyok.', [], ['12 éves vagyok.', 'Tizenkétéves vagyok.']],
        ['¿Cuántos años tienes?', 'Hány éves vagy?', [], []],
        ['Tengo quince años.', 'Tizenöt éves vagyok.', [], ['15 éves vagyok.', 'Tizenötéves vagyok.']],
        ['¿Cuántos años tiene usted?', 'Ön hány éves?', [], ['Hány éves ön?', 'Hány éves?']],
        ['Ana tiene once años.', 'Ana tizenegy éves.', [], ['Ana 11 éves.', 'Ana tizenegyéves.']],
        ['¿Tienes diez años?', 'Tízéves vagy?', [], ['Tíz éves vagy?', '10 éves vagy?']],
        ['Dos más tres son cinco.', 'Kettő meg három az öt.', [], ['Kettő plusz három az öt.', 'Kettő meg három egyenlő öttel.']],
        ['Diez menos cuatro son seis.', 'Tíz mínusz négy az hat.', [], ['Tízből négy az hat.', 'Tíz mínusz négy egyenlő hattal.']],
        ['Mi número favorito es el siete.', 'A kedvenc számom a hét.', [], ['A kedvenc számom a hetes.']],
        ['Un año tiene doce meses.', 'Egy évben tizenkét hónap van.', [], ['Egy év tizenkét hónapból áll.']],
        ['Tengo veinte euros.', 'Húsz eurom van.', [], ['Van húsz eurom.', '20 eurom van.']]
      ]
    },
    {
      id: 'csalad', title: 'Család és háziállatok', icon: '👨‍👩‍👧',
      tip: 'A spanyolban minden főnévnek **neme** van: hímnemű vagy nőnemű. A névelő mutatja:\n\n' +
        '- hímnem: `el` (a), `un` (egy) – `el padre`, `un perro`\n' +
        '- nőnem: `la` (a), `una` (egy) – `la madre`, `una casa`\n' +
        '- többes szám: `los` / `las` – `los perros`, `las hermanas`\n\n' +
        'Ökölszabály: **-o** végű szó általában hímnemű, **-a** végű általában nőnemű. De vannak kivételek (`el día`, `la mano`), ezért a szavakat **mindig névelővel** tanuld meg!\n\n' +
        'A hímnemű többes szám vegyes csoportot is jelent: `los padres` = a szülők (apa + anya), `los hermanos` = a testvérek, `los abuelos` = a nagyszülők.\n\n' +
        'Birtokos névmás a főnév előtt: `mi` (enyém), `tu` (tiéd), `su` (övé) – többes számban `mis, tus, sus`: `mi madre`, `mis padres`. A magyar ezt raggal oldja meg (anyá**m**).',
      words: [
        ['la familia', 'a család'], ['el padre', 'az apa'], ['la madre', 'az anya'], ['los padres', 'a szülők'],
        ['el hermano', 'a fiútestvér'], ['la hermana', 'a lánytestvér'], ['el hijo', 'a fiúgyermek'], ['la hija', 'a lánygyermek'],
        ['el abuelo', 'a nagyapa'], ['la abuela', 'a nagymama'], ['el tío', 'a nagybácsi'], ['la tía', 'a nagynéni'],
        ['el primo', 'az unokatestvér'], ['el perro', 'a kutya'], ['el gato', 'a macska'], ['grande', 'nagy'], ['pequeño', 'kicsi']
      ],
      sentences: [
        ['Mi familia es grande.', 'A családom nagy.', [], ['Nagy a családom.']],
        ['Tengo un hermano y una hermana.', 'Van egy fiútestvérem és egy lánytestvérem.', [], ['Egy fiútestvérem és egy lánytestvérem van.']],
        ['Mi madre se llama Laura.', 'Az anyámat Laurának hívják.', [], ['Anyámat Laurának hívják.', 'Az anyám neve Laura.']],
        ['Mi hermana tiene diez años.', 'A lánytestvérem tízéves.', [], ['A lánytestvérem tíz éves.', 'A lánytestvérem 10 éves.', 'A húgom tízéves.', 'A nővérem tízéves.']],
        ['El perro es pequeño.', 'A kutya kicsi.', [], ['Kicsi a kutya.']],
        ['Tengo un gato y un perro.', 'Van egy macskám és egy kutyám.', [], ['Egy macskám és egy kutyám van.']],
        ['¿Tienes hermanos?', 'Van testvéred?', [], ['Vannak testvéreid?']],
        ['Mi abuela se llama Carmen.', 'A nagymamámat Carmennek hívják.', [], ['A nagymamám neve Carmen.']],
        ['Esta es mi familia.', 'Ez a családom.', [], ['Ez az én családom.']],
        ['Mi tío tiene dos hijos.', 'A nagybátyámnak két gyereke van.', [], ['A nagybátyámnak két fia van.', 'A nagybácsimnak két gyereke van.']],
        ['Mi primo tiene un gato pequeño.', 'Az unokatestvéremnek van egy kis macskája.', [], ['Az unokatestvéremnek egy kis macskája van.']],
        ['Mis padres tienen un perro grande.', 'A szüleimnek van egy nagy kutyája.', [], ['A szüleimnek egy nagy kutyájuk van.', 'A szüleimnek van egy nagy kutyájuk.']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**Fordított kérdő- és felkiáltójel:** a spanyol a mondat elejére is kitesz egy fejjel lefelé álló jelet, így már olvasás előtt tudod, milyen hanglejtéssel mondd: `¿Hablas español?` – `¡Hola!` A jel ott kezdődik, ahol a kérdés: `Y tú, ¿qué tal?`\n\n' +
        '**Tú vagy usted?** Ugyanúgy, mint a magyarban, van tegező és magázó forma:\n\n' +
        '- `tú` = te (barátok, család, gyerekek, osztálytársak): `¿Hablas español?`\n' +
        '- `usted` = ön (idegen felnőttek, néha a tanár): `¿Habla usted español?`\n\n' +
        'Az `usted` – akárcsak a magyar „ön” – **harmadik személyű** igét kap: `usted habla` = ön beszél, mint `él habla` = ő beszél.\n\n' +
        'Többes számban: `vosotros` = ti (tegező), `ustedes` = önök. Spanyolországban a fiatalok egymás közt szinte mindig tegeződnek, sokszor még a tanárral is.',
      words: [
        ['la escuela', 'az iskola'], ['el profesor', 'a tanár'], ['la profesora', 'a tanárnő'], ['el alumno', 'a diák'],
        ['el libro', 'a könyv'], ['el cuaderno', 'a füzet'], ['el lápiz', 'a ceruza'], ['el bolígrafo', 'a toll'],
        ['la goma', 'a radír'], ['la mochila', 'az iskolatáska'], ['la mesa', 'az asztal'], ['la silla', 'a szék'],
        ['la pizarra', 'a tábla'], ['el ordenador', 'a számítógép'], ['el examen', 'a dolgozat'], ['el español', 'a spanyol (nyelv)'],
        ['hablar', 'beszélni'], ['estudiar', 'tanulni'], ['escribir', 'írni'], ['leer', 'olvasni']
      ],
      sentences: [
        ['El profesor habla español.', 'A tanár spanyolul beszél.', [], ['A tanár beszél spanyolul.']],
        ['¿Tienes un lápiz?', 'Van egy ceruzád?', [], ['Van ceruzád?']],
        ['Mi mochila es grande.', 'Az iskolatáskám nagy.', [], ['Nagy az iskolatáskám.']],
        ['Estudio español en la escuela.', 'Spanyolul tanulok az iskolában.', [], ['Az iskolában spanyolul tanulok.', 'Spanyolt tanulok az iskolában.', 'Az iskolában spanyolt tanulok.']],
        ['¿Habla usted español?', 'Beszél ön spanyolul?', ['¿Usted habla español?'], ['Ön beszél spanyolul?', 'Beszél spanyolul?']],
        ['¿Hablas español?', 'Beszélsz spanyolul?', ['¿Tú hablas español?'], ['Te beszélsz spanyolul?']],
        ['El libro está en la mesa.', 'A könyv az asztalon van.', [], ['Az asztalon van a könyv.']],
        ['Leo un libro.', 'Olvasok egy könyvet.', ['Yo leo un libro.'], ['Egy könyvet olvasok.']],
        ['Escribo en el cuaderno.', 'A füzetbe írok.', [], ['Írok a füzetbe.']],
        ['Mañana tenemos un examen.', 'Holnap dolgozatot írunk.', ['Tenemos un examen mañana.'], ['Holnap dolgozatunk van.', 'Holnap van egy dolgozatunk.']],
        ['La profesora escribe en la pizarra.', 'A tanárnő a táblára ír.', [], ['A tanárnő ír a táblára.']],
        ['El ordenador es nuevo.', 'A számítógép új.', [], ['Új a számítógép.']]
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🥘',
      tip: 'A spanyol igék főnévi igenév-végződése **-ar**, **-er** vagy **-ir**. Ragozásnál a végződést leveszed, és személyragot teszel a tő után – pont mint a magyarban!\n\n' +
        '- `hablar` (beszélni): `hablo, hablas, habla, hablamos, habláis, hablan`\n' +
        '- `comer` (enni): `como, comes, come, comemos, coméis, comen`\n' +
        '- `vivir` (élni, lakni): `vivo, vives, vive, vivimos, vivís, viven`\n\n' +
        'A sorrend: yo (én), tú (te), él/ella/usted (ő/ön), nosotros (mi), vosotros (ti), ellos/ustedes (ők/önök).\n\n' +
        'Mivel a végződés megmutatja a személyt, a személyes névmás általában **elmarad**: `Como pan.` = Kenyeret eszem. A magyarban is ugyanígy: „eszem” – nem kell az „én”.\n\n' +
        'Apróság: az `agua` (víz) nőnemű, mégis `el agua` – hangsúlyos a- előtt a `la` helyett `el` áll, a kiejtés kedvéért.',
      words: [
        ['el agua', 'a víz'], ['la leche', 'a tej'], ['el pan', 'a kenyér'], ['el queso', 'a sajt'], ['la manzana', 'az alma'],
        ['la naranja', 'a narancs'], ['el zumo', 'a gyümölcslé'], ['el café', 'a kávé'], ['el té', 'a tea'], ['el pollo', 'a csirke'],
        ['el pescado', 'a hal (étel)'], ['la carne', 'a hús'], ['el arroz', 'a rizs'], ['la sopa', 'a leves'], ['el desayuno', 'a reggeli'],
        ['la comida', 'az ebéd'], ['la cena', 'a vacsora'], ['comer', 'enni'], ['beber', 'inni'], ['tener hambre', 'éhesnek lenni']
      ],
      sentences: [
        ['Como pan con queso.', 'Sajtos kenyeret eszem.', [], ['Kenyeret eszem sajttal.']],
        ['Mi hermano bebe leche.', 'A fiútestvérem tejet iszik.', [], ['A bátyám tejet iszik.', 'Az öcsém tejet iszik.']],
        ['Un café, por favor.', 'Egy kávét kérek.', [], ['Kérek egy kávét.', 'Egy kávét, kérem.']],
        ['¿Comes carne?', 'Eszel húst?', ['¿Tú comes carne?'], ['Húst eszel?']],
        ['No como pescado.', 'Nem eszem halat.', [], ['Halat nem eszem.']],
        ['Tengo mucha hambre.', 'Nagyon éhes vagyok.', [], []],
        ['Bebo té en el desayuno.', 'Reggelire teát iszom.', ['En el desayuno bebo té.'], ['Teát iszom reggelire.']],
        ['Comemos arroz con pollo.', 'Csirkés rizst eszünk.', [], ['Rizst eszünk csirkével.']],
        ['Mi madre come una manzana.', 'Az anyám egy almát eszik.', [], ['Anyám egy almát eszik.', 'Az anyám almát eszik.', 'Anyám almát eszik.']],
        ['¿Qué bebéis vosotros?', 'Ti mit isztok?', ['¿Qué bebéis?'], ['Mit isztok?']],
        ['La cena es a las nueve.', 'A vacsora kilenckor van.', [], ['Kilenckor van a vacsora.']],
        ['La sopa está muy buena.', 'A leves nagyon finom.', [], ['Nagyon finom a leves.']]
      ]
    },
    {
      id: 'szinek-ruhak', title: 'Színek és ruhák', icon: '👕',
      tip: '**Melléknevek:** a spanyolban általában a főnév **után** állnak, és nemben, számban **egyeznek** vele: `la camiseta roja`, `los zapatos negros`, `las faldas blancas`. Az -e vagy mássalhangzó végűek csak számban változnak: `verde → verdes`, `azul → azules`.\n\n' +
        '**Hangsúly és ékezet:** a spanyol ékezet (´) nem hosszú hangot jelöl, mint a magyarban, hanem a **hangsúlyos szótagot**.\n\n' +
        '- magánhangzóra, **-n**-re vagy **-s**-re végződő szó: az utolsó előtti szótag hangsúlyos: `ca-MI-sa`, `ZA-pa-tos`\n' +
        '- más mássalhangzóra végződő szó: az utolsó szótag hangsúlyos: `co-LOR`, `es-pa-ÑOL`\n' +
        '- ha ettől eltér, ékezet jelzi: `ca-FÉ`, `LÁ-piz`, `ma-RRÓN`\n\n' +
        'Ezért tűnhet el vagy jelenhet meg az ékezet többes számban: `marrón → marrones`, `examen → exámenes`. Az ékezet néha jelentést is megkülönböztet: `tú` (te) – `tu` (tiéd), `sí` (igen) – `si` (ha).',
      words: [
        ['rojo', 'piros'], ['azul', 'kék'], ['verde', 'zöld'], ['amarillo', 'sárga'], ['negro', 'fekete'], ['blanco', 'fehér'],
        ['gris', 'szürke'], ['rosa', 'rózsaszín'], ['marrón', 'barna'], ['la camiseta', 'a póló'], ['la camisa', 'az ing'],
        ['los pantalones', 'a nadrág'], ['la falda', 'a szoknya'], ['el vestido', 'a (női) ruha'], ['los zapatos', 'a cipő'],
        ['la chaqueta', 'a dzseki'], ['el color', 'a szín'], ['bonito', 'szép']
      ],
      sentences: [
        ['Mi camiseta es roja.', 'A pólóm piros.', [], ['Piros a pólóm.']],
        ['Los zapatos son negros.', 'A cipő fekete.', [], ['A cipők feketék.']],
        ['Tengo una falda azul.', 'Van egy kék szoknyám.', [], ['Egy kék szoknyám van.']],
        ['¿De qué color es tu chaqueta?', 'Milyen színű a dzsekid?', [], []],
        ['Mi color favorito es el verde.', 'A kedvenc színem a zöld.', [], []],
        ['La camisa blanca es bonita.', 'A fehér ing szép.', [], ['Szép a fehér ing.']],
        ['Llevo unos pantalones grises.', 'Szürke nadrágot viselek.', [], ['Szürke nadrág van rajtam.']],
        ['El vestido rosa es pequeño.', 'A rózsaszín ruha kicsi.', [], ['Kicsi a rózsaszín ruha.']],
        ['Mi gato es blanco y negro.', 'A macskám fekete-fehér.', [], ['A macskám fehér és fekete.']],
        ['Las manzanas son verdes.', 'Az almák zöldek.', [], []],
        ['La chaqueta marrón es muy bonita.', 'A barna dzseki nagyon szép.', [], []]
      ]
    },
    {
      id: 'ido', title: 'Napok, hónapok, idő', icon: '📅',
      tip: 'A hét napjait és a hónapokat **kisbetűvel** írjuk: `lunes`, `enero` – mint a magyarban.\n\n' +
        '**Melyik napon?** A spanyol névelőt használ rag helyett:\n\n' +
        '- `el lunes` = hétfőn\n' +
        '- `los lunes` = hétfőnként\n' +
        '- `en julio` = júliusban\n\n' +
        '**Hány óra van?** `¿Qué hora es?`\n\n' +
        '- 1 óra: `Es la una.` (egyes szám!)\n' +
        '- a többi: `Son las dos`, `Son las tres`…\n' +
        '- `y cuarto` = negyed (3:15 = `las tres y cuarto`)\n' +
        '- `y media` = fél (3:30 = `las tres y media` – a magyar ezt „fél négy”-nek mondja, a spanyol „három és fél”-nek!)\n' +
        '- `menos cuarto` = háromnegyed (3:45 = `las cuatro menos cuarto`)\n\n' +
        'Hánykor? `a las nueve` = kilenckor. Vigyázz: `mañana` = holnap, de `la mañana` = a reggel, délelőtt.',
      words: [
        ['el lunes', 'hétfő'], ['el martes', 'kedd'], ['el miércoles', 'szerda'], ['el jueves', 'csütörtök'], ['el viernes', 'péntek'],
        ['el sábado', 'szombat'], ['el domingo', 'vasárnap'], ['hoy', 'ma'], ['mañana', 'holnap'], ['ayer', 'tegnap'],
        ['la semana', 'a hét (7 nap)'], ['el fin de semana', 'a hétvége'], ['el mes', 'a hónap'], ['enero', 'január'],
        ['julio', 'július'], ['la hora', 'az óra (idő)'], ['la mañana', 'a délelőtt'], ['la noche', 'az este, éjszaka']
      ],
      sentences: [
        ['Hoy es lunes.', 'Ma hétfő van.', [], ['Ma hétfő.']],
        ['Mañana es sábado.', 'Holnap szombat van.', [], ['Holnap szombat lesz.', 'Holnap szombat.']],
        ['¿Qué hora es?', 'Hány óra van?', [], ['Mennyi az idő?']],
        ['Son las tres.', 'Három óra van.', [], ['Három óra.']],
        ['Es la una y media.', 'Fél kettő van.', [], []],
        ['El viernes como pizza.', 'Pénteken pizzát eszem.', [], ['Pizzát eszem pénteken.']],
        ['Mi cumpleaños es en julio.', 'A születésnapom júliusban van.', [], ['Júliusban van a születésnapom.']],
        ['El domingo no tengo clase.', 'Vasárnap nincs órám.', ['No tengo clase el domingo.'], []],
        ['Estudio por la mañana.', 'Délelőtt tanulok.', [], ['Reggel tanulok.']],
        ['Ayer fue miércoles.', 'Tegnap szerda volt.', [], []],
        ['Una semana tiene siete días.', 'Egy hét hét napból áll.', [], ['Egy héten hét nap van.', 'Egy hétben hét nap van.']],
        ['¿Qué haces el fin de semana?', 'Mit csinálsz hétvégén?', [], ['Mit csinálsz a hétvégén?']]
      ]
    },
    {
      id: 'otthon', title: 'Otthon', icon: '🏠',
      tip: 'A spanyolnak **két „lenni” igéje** van!\n\n' +
        '**ser** – tartós tulajdonság, ki/mi valami: `soy, eres, es, somos, sois, son`\n\n' +
        '- `La casa es grande.` (a ház nagy – ilyen)\n' +
        '- `Es mi madre.` · `Soy húngaro.`\n\n' +
        '**estar** – hol van valami, és milyen állapotban van éppen: `estoy, estás, está, estamos, estáis, están`\n\n' +
        '- `Mamá está en la cocina.` (hely)\n' +
        '- `Mi habitación está sucia.` (most éppen piszkos)\n' +
        '- `Estoy bien.` (hogylét)\n\n' +
        'Egy mondatban mindkettő: `La cocina es grande y está limpia.` – nagy (mindig), és tiszta (most).\n\n' +
        '**hay** = van (valahol valami, létezik): `Hay un sofá en el salón.` – A nappaliban van egy kanapé. Ez a magyar „van” létige megfelelője, mindig ugyanaz az alak, egyes és többes számban is.',
      words: [
        ['la casa', 'a ház'], ['el piso', 'a lakás'], ['la habitación', 'a szoba'], ['la cocina', 'a konyha'], ['el baño', 'a fürdőszoba'],
        ['el salón', 'a nappali'], ['el dormitorio', 'a hálószoba'], ['la cama', 'az ágy'], ['la ventana', 'az ablak'],
        ['la puerta', 'az ajtó'], ['el sofá', 'a kanapé'], ['la lámpara', 'a lámpa'], ['el jardín', 'a kert'], ['nuevo', 'új'],
        ['viejo', 'régi'], ['limpio', 'tiszta'], ['sucio', 'piszkos'], ['vivir', 'lakni']
      ],
      sentences: [
        ['Vivo en un piso pequeño.', 'Egy kis lakásban lakom.', [], ['Kis lakásban lakom.']],
        ['Nuestra casa es nueva.', 'A házunk új.', [], ['Új a házunk.']],
        ['Mamá está en la cocina.', 'Anya a konyhában van.', [], ['Anya konyhában van.']],
        ['El gato está en la cama.', 'A macska az ágyon van.', [], ['A macska az ágyban van.']],
        ['Mi habitación está sucia.', 'A szobám piszkos.', [], ['Piszkos a szobám.', 'A szobám koszos.']],
        ['La cocina es grande y está limpia.', 'A konyha nagy és tiszta.', [], []],
        ['Hay un sofá en el salón.', 'A nappaliban van egy kanapé.', ['En el salón hay un sofá.'], ['Van egy kanapé a nappaliban.']],
        ['El baño está al lado del dormitorio.', 'A fürdőszoba a hálószoba mellett van.', [], []],
        ['¿Dónde está la lámpara?', 'Hol van a lámpa?', [], []],
        ['La puerta es azul.', 'Az ajtó kék.', [], ['Kék az ajtó.']],
        ['Vivimos en una casa vieja.', 'Egy régi házban lakunk.', [], ['Régi házban lakunk.']],
        ['Mi abuela tiene un jardín bonito.', 'A nagymamámnak szép kertje van.', [], ['A nagymamámnak van egy szép kertje.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚌',
      tip: 'Az **ir** (menni) ige rendhagyó: `voy, vas, va, vamos, vais, van`.\n\n' +
        '**Hová?** Az `a` elöljárószóval: `Voy a la escuela.` – Iskolába megyek. A magyar ezt raggal mondja (-ba, -be, -ra, -re, -hoz).\n\n' +
        'Összevonások (kötelezőek!):\n\n' +
        '- `a + el = al`: `Vamos al cine.` – Moziba megyünk.\n' +
        '- `de + el = del`: `cerca del parque` – a park közelében\n\n' +
        '**Mivel?** Járművel: `en` – `en autobús`, `en tren`, `en coche` (= busszal, vonattal, autóval). De: gyalog = `a pie`.\n\n' +
        '**Merre?** `a la derecha` (jobbra), `a la izquierda` (balra), `todo recto` (egyenesen). Hol van? `¿Dónde está…?` – helyre mindig `estar`!',
      words: [
        ['la ciudad', 'a város'], ['la calle', 'az utca'], ['la plaza', 'a tér'], ['el parque', 'a park'], ['el museo', 'a múzeum'],
        ['el cine', 'a mozi'], ['el hospital', 'a kórház'], ['la estación', 'az állomás'], ['el autobús', 'a busz'], ['el tren', 'a vonat'],
        ['el metro', 'a metró'], ['el coche', 'az autó'], ['la bici', 'a bicikli'], ['a pie', 'gyalog'], ['a la derecha', 'jobbra'],
        ['a la izquierda', 'balra'], ['todo recto', 'egyenesen'], ['cerca', 'közel'], ['ir', 'menni']
      ],
      sentences: [
        ['Voy a la escuela en autobús.', 'Busszal megyek iskolába.', ['Voy en autobús a la escuela.'], ['Busszal megyek az iskolába.', 'Az iskolába busszal megyek.', 'Iskolába busszal megyek.']],
        ['¿Dónde está la estación?', 'Hol van az állomás?', [], ['Hol van a pályaudvar?']],
        ['El museo está a la derecha.', 'A múzeum jobbra van.', [], ['A múzeum jobb oldalon van.']],
        ['Vamos al cine.', 'Moziba megyünk.', [], ['Megyünk moziba.', 'Elmegyünk moziba.']],
        ['Mi casa está cerca del parque.', 'A házam a park közelében van.', [], ['A házam közel van a parkhoz.']],
        ['Voy a pie.', 'Gyalog megyek.', [], []],
        ['Mi padre va en coche.', 'Apám autóval megy.', [], ['Az apám autóval megy.']],
        ['El hospital está a la izquierda.', 'A kórház balra van.', [], ['A kórház bal oldalon van.']],
        ['¿Vas en metro o en tren?', 'Metróval vagy vonattal mész?', [], []],
        ['La plaza es muy bonita.', 'A tér nagyon szép.', [], ['Nagyon szép a tér.']],
        ['Hay un parque en mi calle.', 'Az utcámban van egy park.', [], ['Van egy park az utcámban.']],
        ['Voy al parque en bici.', 'Biciklivel megyek a parkba.', [], ['A parkba biciklivel megyek.']]
      ]
    },
    {
      id: 'hobbi', title: 'Hobbi és sport', icon: '⚽',
      tip: '„Szeretem a focit” spanyolul fordítva működik: **a foci tetszik nekem**. A `gustar` ige alanya az, ami tetszik!\n\n' +
        '- `Me gusta el fútbol.` – egy dolog → `gusta`\n' +
        '- `Me gustan los videojuegos.` – több dolog → `gustan`\n' +
        '- `Me gusta bailar.` – igével is `gusta`\n\n' +
        'Kinek tetszik? Ezt a névmás mutatja:\n\n' +
        '- `me` (nekem), `te` (neked), `le` (neki/önnek), `nos` (nekünk), `os` (nektek), `les` (nekik)\n\n' +
        'Tagadás: `No me gusta correr.` Ha megnevezed a személyt, `a` kerül elé, és a `le` is ott marad: `A mi hermana le gusta cantar.`\n\n' +
        'Erősebben: `Me encanta la música.` – Imádom a zenét (ugyanígy működik).\n\n' +
        'Két „játszani”: `jugar al fútbol` (sportot, játékot), de `tocar la guitarra` (hangszeren).',
      words: [
        ['el fútbol', 'a foci'], ['el baloncesto', 'a kosárlabda'], ['el tenis', 'a tenisz'], ['el deporte', 'a sport'],
        ['el equipo', 'a csapat'], ['el partido', 'a meccs'], ['nadar', 'úszni'], ['bailar', 'táncolni'], ['cantar', 'énekelni'],
        ['correr', 'futni'], ['dibujar', 'rajzolni'], ['jugar', 'játszani (sportot, játékot)'], ['tocar', 'játszani (hangszeren)'],
        ['la música', 'a zene'], ['la guitarra', 'a gitár'], ['la película', 'a film'], ['los videojuegos', 'a videojátékok'],
        ['me gusta', 'tetszik nekem'], ['me encanta', 'imádom']
      ],
      sentences: [
        ['Me gusta el fútbol.', 'Szeretem a focit.', [], ['Tetszik a foci.']],
        ['Me gustan los videojuegos.', 'Szeretem a videojátékokat.', [], []],
        ['¿Te gusta bailar?', 'Szeretsz táncolni?', [], []],
        ['No me gusta correr.', 'Nem szeretek futni.', [], []],
        ['A mi hermana le gusta cantar.', 'A lánytestvérem szeret énekelni.', [], ['A húgom szeret énekelni.', 'A nővérem szeret énekelni.']],
        ['Juego al tenis los sábados.', 'Szombatonként teniszezem.', ['Los sábados juego al tenis.'], ['Szombatonként teniszezek.', 'Szombatonként teniszt játszom.', 'Szombatonként teniszezem.']],
        ['Mi padre toca la guitarra.', 'Apám gitározik.', [], ['Az apám gitározik.', 'Apám gitáron játszik.']],
        ['Me encanta la música.', 'Imádom a zenét.', [], []],
        ['Nos gusta nadar.', 'Szeretünk úszni.', [], []],
        ['¿Cuál es tu deporte favorito?', 'Mi a kedvenc sportod?', [], []],
        ['Hoy hay un partido de baloncesto.', 'Ma kosárlabdameccs van.', [], ['Ma van egy kosárlabdameccs.']],
        ['Mi equipo juega el domingo.', 'A csapatom vasárnap játszik.', [], ['Vasárnap játszik a csapatom.']]
      ]
    },
    {
      id: 'vasarlas-utazas', title: 'Vásárlás és utazás', icon: '🧳',
      tip: '**Mit fogsz csinálni?** A közeli jövőt a spanyol nagyon egyszerűen fejezi ki:\n\n' +
        '**ir a + főnévi igenév** (= „megyek csinálni” → fogok csinálni)\n\n' +
        '- `Voy a comprar una maleta.` – Venni fogok egy bőröndöt.\n' +
        '- `¿Vas a viajar?` – Utazni fogsz?\n' +
        '- `Vamos a ir a la playa.` – A tengerpartra fogunk menni.\n\n' +
        'Csak az `ir` igét ragozod (`voy, vas, va, vamos, vais, van`), utána mindig `a` és az ige alapalakja jön. Az angol „going to” szerkezet pontos megfelelője.\n\n' +
        '**Vásárlás:**\n\n' +
        '- `¿Cuánto cuesta?` – Mennyibe kerül? (egy dologra)\n' +
        '- `¿Cuánto cuestan?` – (több dologra)\n' +
        '- `Es caro / barato.` – Drága / olcsó.\n\n' +
        'Spanyolországban euróval fizetnek: `un euro, dos euros`.',
      words: [
        ['la tienda', 'a bolt'], ['el mercado', 'a piac'], ['el dinero', 'a pénz'], ['el euro', 'az euró'], ['caro', 'drága'],
        ['barato', 'olcsó'], ['comprar', 'vásárolni'], ['pagar', 'fizetni'], ['¿cuánto cuesta?', 'mennyibe kerül?'],
        ['el billete', 'a jegy'], ['el avión', 'a repülő'], ['el hotel', 'a szálloda'], ['la playa', 'a tengerpart'],
        ['la maleta', 'a bőrönd'], ['las vacaciones', 'a vakáció'], ['viajar', 'utazni'], ['el mar', 'a tenger'],
        ['la montaña', 'a hegy'], ['el pasaporte', 'az útlevél']
      ],
      sentences: [
        ['¿Cuánto cuesta la camiseta?', 'Mennyibe kerül a póló?', [], []],
        ['Cuesta diez euros.', 'Tíz euróba kerül.', [], ['10 euróba kerül.']],
        ['Es muy caro.', 'Ez nagyon drága.', [], ['Nagyon drága.']],
        ['Voy a comprar una maleta.', 'Venni fogok egy bőröndöt.', [], ['Egy bőröndöt fogok venni.', 'Veszek egy bőröndöt.']],
        ['Vamos a viajar en avión.', 'Repülővel fogunk utazni.', [], ['Repülővel utazunk.']],
        ['En verano voy a ir a la playa.', 'Nyáron a tengerpartra fogok menni.', ['Voy a ir a la playa en verano.'], ['Nyáron a tengerpartra megyek.', 'Nyáron tengerpartra fogok menni.']],
        ['Mis padres van a comprar los billetes.', 'A szüleim fogják megvenni a jegyeket.', [], ['A szüleim megveszik a jegyeket.']],
        ['¿Qué vas a hacer en las vacaciones?', 'Mit fogsz csinálni a vakáció alatt?', [], ['Mit csinálsz a vakáció alatt?', 'Mit fogsz csinálni a vakációban?']],
        ['No tengo dinero.', 'Nincs pénzem.', [], []],
        ['El hotel está cerca del mar.', 'A szálloda a tenger közelében van.', [], ['A szálloda közel van a tengerhez.']],
        ['Vamos a ir a la montaña.', 'A hegyekbe fogunk menni.', [], ['A hegyekbe megyünk.', 'Hegyekbe fogunk menni.']],
        ['En el mercado todo es barato.', 'A piacon minden olcsó.', [], []]
      ]
    },
    {
      id: 'mult', title: 'Mi történt? – múlt idő', icon: '🕰️',
      tip: 'A befejezett múltbeli eseményekre (tegnap, tavaly, múlt héten) a **pretérito indefinido** való. Szabályos végződések:\n\n' +
        '- **-ar** (`hablar`): `hablé, hablaste, habló, hablamos, hablasteis, hablaron`\n' +
        '- **-er/-ir** (`comer`): `comí, comiste, comió, comimos, comisteis, comieron`\n\n' +
        'Figyelj az ékezetre: `hablo` = beszélek, de `habló` = beszélt! A `hablamos` jelen és múlt is lehet – a szövegkörnyezet dönt.\n\n' +
        'Néhány gyakori rendhagyó alak:\n\n' +
        '- `fui` = mentem **és** voltam (az `ir` és a `ser` múltja ugyanaz!)\n' +
        '- `hice` = csináltam, `hiciste` = csináltál\n' +
        '- `vi` = láttam (ékezet nélkül)\n\n' +
        'Helyesírás: `jugar → jugué` (az u megtartja a g kemény hangját).\n\n' +
        'Jó időhatározók: `ayer` (tegnap), `anoche` (tegnap este), `el año pasado` (tavaly), `la semana pasada` (múlt héten).',
      words: [
        ['anoche', 'tegnap este'], ['el año pasado', 'tavaly'], ['la semana pasada', 'múlt héten'], ['el verano', 'a nyár'],
        ['después', 'utána'], ['hablé', 'beszéltem'], ['comí', 'ettem'], ['bebí', 'ittam'], ['fui', 'mentem, voltam'],
        ['vi', 'láttam'], ['hice', 'csináltam'], ['compré', 'vettem (vásároltam)'], ['visité', 'meglátogattam'],
        ['jugué', 'játszottam'], ['escribí', 'írtam'], ['estudié', 'tanultam'], ['llegué', 'megérkeztem'], ['viajamos', 'utaztunk']
      ],
      sentences: [
        ['Ayer comí paella.', 'Tegnap paellát ettem.', [], []],
        ['Anoche vi una película.', 'Tegnap este megnéztem egy filmet.', [], ['Tegnap este láttam egy filmet.', 'Tegnap este néztem egy filmet.']],
        ['El año pasado fui a España.', 'Tavaly Spanyolországban voltam.', [], ['Tavaly Spanyolországba mentem.', 'Tavaly elmentem Spanyolországba.']],
        ['Estudié mucho para el examen.', 'Sokat tanultam a dolgozatra.', [], []],
        ['Compré una camiseta roja.', 'Vettem egy piros pólót.', [], ['Egy piros pólót vettem.']],
        ['La semana pasada jugué al fútbol.', 'Múlt héten fociztam.', ['Jugué al fútbol la semana pasada.'], ['A múlt héten fociztam.']],
        ['¿Qué hiciste ayer?', 'Mit csináltál tegnap?', [], ['Tegnap mit csináltál?']],
        ['Visité a mi abuela.', 'Meglátogattam a nagymamámat.', [], []],
        ['Hablé con mi profesora.', 'Beszéltem a tanárnőmmel.', [], []],
        ['El verano pasado viajamos en tren.', 'Tavaly nyáron vonattal utaztunk.', [], []],
        ['Llegué a casa a las ocho.', 'Nyolckor értem haza.', [], ['Nyolckor érkeztem haza.']],
        ['Después voy a estudiar.', 'Utána tanulni fogok.', [], ['Utána tanulok.']]
      ]
    }
  ]
});
