/* Tantárgy: Építőipar és kőműves */
STUDIE.addSubject({
  id: 'epitoipar',
  stage: 'szakma',
  title: 'Építőipar és kőműves',
  icon: '🧱',
  color: '#8a6d1f',
  description: 'Építőanyagok, alapozás és falazás, beton és vasbeton, hő- és vízszigetelés, munkavédelem és tervrajz-olvasás.',
  intro: 'Ez a tananyag a kőműves szakma és az építőipar **alapjait** tanítja meg: miből és hogyan épül egy ház, miért reped meg a vakolat, és hogyan kell egy tervrajzot olvasni. Az építkezés az egyik legveszélyesebb munkahely: a leesés, a leeső tárgyak, a por és a nehéz terhek évente sok súlyos balesetet okoznak. Itt **elméletet** tanulsz; a gyakorlatot mindig betanítva, védőfelszerelésben, felügyelet mellett végezd. A tartószerkezetekről (alap, teherhordó fal, födém) mindig a **statikus tervező** dönt.',
  lessons: [
    {
      id: 'anyagok',
      title: 'Építőanyagok',
      level: 1, minutes: 14,
      summary: 'Tégla, falazóblokk, beton, vasbeton, habarcs; a kötőanyagok (cement, mész, gipsz) és a szigetelőanyagok.',
      tags: ['építőanyag', 'tégla', 'kisméretű tégla', 'falazóblokk', 'beton', 'vasbeton', 'habarcs', 'kötőanyag', 'cement', 'mész', 'gipsz', 'hidraulikus', 'légköt', 'EPS', 'XPS', 'kőzetgyapot', 'bitumen'],
      sections: [
        {
          title: 'Falazóanyagok',
          text: '- **Kisméretű tömör tégla**: égetett agyag, mérete **25 × 12 × 6,5 cm**. Nehéz, erős, jól tárolja a hőt, de rossz hőszigetelő. Régi házak, kémények, kerítések, lábazatok.\n- **B30-as vázkerámia tégla, üreges tégla**: nagyobb, üregekkel könnyített, régebbi házakban gyakori.\n- **Kerámia falazóblokk** (pl. 30-as, 38-as, 44-es): nagy méretű, **sok kis üreggel** (a levegő szigetel), oldalán **nút-féderes** (csaphornyos) kialakítással, így az álló hézagba nem kell habarcs. A mai családi házak jellemző falazóanyaga.\n- **Pórusbeton** (gázbeton): könnyű, jól vágható, jó hőszigetelő, de nedvességre érzékeny.\n- **Betonblokk, zsaluzóelem**: pince, kerítés, támfal; a zsaluzóelemet vasalják és kiöntik betonnal.\n- **Mészhomoktégla**: nagy sűrűségű, jó hangszigetelő, pontos méretű.'
        },
        {
          title: 'Kötőanyagok: cement, mész, gipsz',
          text: 'A **kötőanyag** vízzel keverve péppé válik, majd megszilárdul, és összeragasztja a homok- és kavicsszemeket.\n\n- **Cement**: **hidraulikus** kötőanyag, vagyis **víz alatt is megköt** (a vízzel kémiai reakcióba lép). Erős, gyorsan szilárdul. Jelölése pl. **CEM I 42,5 N** vagy **CEM II 32,5 R**: a szám a 28 napos szabványos szilárdság (MPa), az R gyors, az N normál kezdeti szilárdulást jelent.\n- **Mész** (oltott mész): **légköt**, vagyis a levegő **szén-dioxidjával** reagálva szilárdul meg (lassan, hetek, hónapok alatt). Rugalmasabb, „lélegző”, páraáteresztő. Régi épületek, belső vakolatok.\n- **Gipsz**: nagyon gyorsan, **percek** alatt köt. Belső vakolatokhoz, gipszkartonhoz, simításhoz. **Nedvességre érzékeny**, kültérre és vizes helyiségbe nem való.',
          warn: 'A cement és a friss beton, habarcs **erősen lúgos** (pH kb. 12–13), és **maró sérülést** okozhat a bőrön, különösen ha a ruha alatt sokáig érintkezik vele. Viselj védőkesztyűt, hosszú ujjú ruhát, keveréskor és porzó anyagnál védőszemüveget. Ha a szemedbe kerül, **azonnal sok tiszta vízzel öblítsd** legalább 15 percig, és fordulj orvoshoz.'
        },
        {
          title: 'Habarcs, beton, vasbeton',
          text: '**Habarcs** = kötőanyag + **homok** + víz. Feladata szerint:\n\n- **falazóhabarcs**: a téglák összeragasztására,\n- **vakolóhabarcs**: a fal bevonására,\n- kötőanyag szerint: **mészhabarcs**, **cementhabarcs**, és a kettő keveréke, a **javított (mész-cement) habarcs**.\n\n**Beton** = cement + **adalékanyag** (homok **és kavics**, vagy zúzottkő) + víz (+ esetleg adalékszerek). Nagyon jól bírja a **nyomást**, de a **húzást rosszul** (kb. tizedannyit): meghajlítva alul elreped.\n\n**Vasbeton** = beton + **betonacél** (bordás acélrúd, háló). A betonacél veszi fel a **húzást**, a beton a **nyomást**. A beton ráadásul lúgos környezetével megvédi az acélt a rozsdától, ezért kell elég vastag **betontakarás** (a vas és a betonfelület közti réteg, jellemzően 2–5 cm). A beton jelölése pl. **C20/25**: a számok a henger-, illetve kockaszilárdság MPa-ban.',
          widget: { type: 'parositas', options: { title: 'Párosítsd az anyagot a jellemzőjével!', count: 6, pairs: [
            ['Cement', 'Hidraulikus: víz alatt is megköt'],
            ['Mész', 'A levegő szén-dioxidjával köt meg'],
            ['Gipsz', 'Percek alatt köt, kültérre nem jó'],
            ['Beton', 'Nyomásra erős, húzásra gyenge'],
            ['Betonacél', 'A vasbetonban a húzást veszi fel'],
            ['Kerámia falazóblokk', 'Üreges, nút-féderes, jól szigetel'],
            ['XPS', 'Zárt cellás, nem szívja a vizet, lábazatra'],
            ['Kőzetgyapot', 'Nem éghető hőszigetelő']
          ] } }
        },
        {
          title: 'Szigetelőanyagok',
          text: '**Hőszigetelők** (sok bezárt levegővel):\n\n- **EPS** (expandált polisztirol, „hungarocell”): fehér vagy grafitos szürke, olcsó, homlokzatra. Éghető, ezért tűzvédelmi szabályok szerint használható.\n- **XPS** (extrudált polisztirol): zárt cellás, **nem szívja magába a vizet**, nagy nyomószilárdságú. **Lábazatra, talajjal érintkező** felületre.\n- **Kőzetgyapot** (ásványgyapot): **nem éghető**, páraáteresztő, jó hangszigetelő. Homlokzat, tetőtér, tűzgátló sávok.\n- **Üveggyapot**: tetőtérbe, könnyűszerkezetbe.\n\n**Víz- és nedvesség elleni szigetelők**:\n\n- **bitumenes lemez** (lánggal vagy hidegen ragasztva),\n- **műanyag lemezek** (PVC, TPO, EPDM),\n- **kenhető szigetelés** (bitumenes vagy polimer-cement, pl. fürdőszobában a burkolat alá).'
        }
      ],
      quiz: [
        { q: 'Mit jelent, hogy a cement hidraulikus kötőanyag?', options: ['Víz alatt is megköt', 'Csak levegőn köt meg', 'Melegítve olvad', 'Folyékony marad'], answer: 0, explain: 'A cement a vízzel kémiai reakcióba lépve szilárdul meg.' },
        { q: 'A vasbetonban mit vesz fel a betonacél?', options: ['A húzást', 'A nyomást', 'A nedvességet', 'A hőt'], answer: 0, explain: 'A beton húzásra gyenge, ezt pótolja az acél.' },
        { q: 'Melyik hőszigetelő való a talajjal érintkező lábazatra?', options: ['XPS', 'Üveggyapot', 'Gipszkarton', 'Fehér EPS'], answer: 0, explain: 'Az XPS zárt cellás, nem szívja a vizet.' }
      ]
    },
    {
      id: 'falazas',
      title: 'Alapozás és falazás',
      level: 1, minutes: 15,
      summary: 'Sávalap, lemezalap, fagyhatár; kötésrend, habarcshézag, vakolás; mérés vízmértékkel, lézerrel, zsinórral.',
      tags: ['alapozás', 'sávalap', 'lemezalap', 'pontalap', 'fagyhatár', 'falazás', 'kötésrend', 'habarcshézag', 'vakolás', 'vízmérték', 'libella', 'lézer', 'szintezés', 'zsinór', 'függőón', '3-4-5', 'derékszög'],
      sections: [
        {
          title: 'Az alap feladata',
          text: 'Az **alap** az épület teljes súlyát (falak, födémek, tető, berendezés, hó) átadja a **teherbíró talajnak** úgy, hogy az épület ne süllyedjen meg egyenlőtlenül. Ha az egyik sarok jobban süllyed, mint a többi, a falak **megrepednek**.\n\nFontos szabály: az alapot a **fagyhatár alá** kell vinni. Magyarországon ez kb. **80 cm** mélyen van a terepszint alatt. Ha a talajban lévő víz megfagy, kitágul, és megemelheti (felfagyaszthatja) a sekély alapot.\n\nAlaptípusok:\n\n- **Sávalap**: a teherhordó falak alatt futó, folyamatos beton- vagy vasbeton sáv. A családi házak leggyakoribb alapja.\n- **Pontalap** (pillér alatti alap): egy-egy oszlop vagy pillér alatt.\n- **Lemezalap**: az egész alaprajz alatt egybefüggő **vasbeton lemez**. **Gyenge** vagy egyenlőtlen talajon, magas talajvíznél, pincés házaknál használják, mert nagy felületen osztja el a terhet.\n- **Cölöpalap**: ha a teherbíró réteg mélyen van, a cölöpök oda vezetik le a terhet.\n\nAz alap típusát és méretét a **talajmechanikai vizsgálat** alapján a **statikus tervező** határozza meg.'
        },
        {
          title: 'Falazás és kötésrend',
          text: 'A fal attól lesz erős, hogy a téglák **egymásba kötnek**: a függőleges (álló) hézagok soha nem kerülhetnek egymás fölé. Ezt a szabályt a **kötésrend** rögzíti.\n\n- Az álló hézagokat soronként **el kell tolni**: kisméretű téglánál legalább **negyed téglányival**, falazóblokknál a **gyártó előírása** szerint (jellemzően legalább kb. 10 cm-rel).\n- A **sarkoknál és falcsatlakozásoknál** is át kell kötni a sorokat (vagy acélpánttal összekötni a falakat).\n- A **fekvő (vízszintes) hézag** hagyományos falazásnál kb. **10–12 mm**, csiszolt falazóblokknál vékonyágyazatú ragasztóhabarccsal csak 1–3 mm.\n- A habarcsot **teljes felületen** kell teríteni, ne maradjanak üregek.\n- A téglát (különösen meleg, száraz időben) **előnedvesíteni** kell, különben kiszívja a habarcsból a vizet, és az nem köt meg rendesen.\n- **Fagyban nem falazunk** (kb. +5 °C alatt külön intézkedés kell), és a friss falat óvni kell az esőtől.\n\nFalazás előtt a **sarkokat** rakják fel pontosan, majd a sarkok közé kifeszített **kőműveszsinór** mentén rakják a sorokat. Így lesz a fal egyenes és vízszintes.',
          tip: 'Az első sor a legfontosabb: ha az pontosan vízszintes, az egész fal az lesz. Ha az első sor ferde, azt később már nem lehet javítani.'
        },
        {
          title: 'Mérés és kitűzés',
          text: '- **Vízmérték (libella)**: a buborék középen van, ha a felület vízszintes (vagy függőleges). Minél hosszabb (pl. 1–2 m), annál pontosabb.\n- **Függőón**: a zsinóron lógó súly a pontos függőlegest mutatja.\n- **Kőművesszinór**: a két sarok közé kifeszítve megadja a sor vonalát és magasságát.\n- **Szintező lézer**: a **forgólézer** körbe vízszintes síkot vetít, a **keresztvonalas lézer** vízszintes és függőleges vonalat. Nagy távolságon is pontos szintet ad. A **lézersugárba ne nézz bele**, és mások szemébe se világíts!\n- **Vízszintező tömlő (slagos szintező)**: a vízzel töltött tömlő két végében a vízszint mindig azonos magasságban áll (közlekedőedények elve).\n- **Mérőszalag, colstok**.\n\n**Derékszög kitűzése a 3-4-5 szabállyal**: az egyik oldalon mérj ki **3 m**-t, a másikon **4 m**-t. Ha a két pont közti távolság pontosan **5 m**, a szög derékszög (Pitagorasz-tétel: `3² + 4² = 9 + 16 = 25 = 5²`). Ellenőrzésnél egy téglalap alakú alaprajz két **átlója** is egyenlő kell legyen.'
        },
        {
          title: 'Vakolás',
          text: 'A **vakolat** védi a falat az időjárástól és a sérülésektől, kiegyenlíti az egyenetlenségeket, és sima felületet ad a festésnek.\n\nA hagyományos vakolás rétegei:\n\n1. **Előkészítés**: a felület legyen tiszta, pormentes, és ha szükséges, **előnedvesítve**. A laza részeket le kell verni.\n2. **Tapadóhíd (gúzolás, cementfröcskölés)**: híg cementes réteg, amely érdes felületet ad, hogy a vakolat jól tapadjon.\n3. **Alapvakolat**: a fő réteg, kb. 1–2 cm vastagon, lehúzólécezve, **vakolóléc** (sarokvédő, élvédő) mentén.\n4. **Simító (fedő) vakolat**: vékony, finom szemcsés réteg.\n\nSzabályok: egy rétegben ne vakolj túl vastagon (lecsúszik, megreped), a rétegek között hagyd az előírt ideig száradni, és tűző napon, erős szélben, fagyban ne vakolj. Ma sok helyen **gépi vakolást** és előre kevert **szárazhabarcsot** használnak: ilyenkor a gyártó előírásait kell követni.',
          warn: 'A „szilárdabb” nem mindig jobb: a túl erős, cementdús vakolat merevebb és kevésbé páraáteresztő, mint az alatta lévő fal, ezért **leválhat és megrepedhet**. A régi, mészhabarcsos falra **ne tegyél** kemény cementvakolatot.'
        }
      ],
      quiz: [
        { q: 'Kb. milyen mély a fagyhatár Magyarországon?', options: ['80 cm', '20 cm', '2 m', '5 m'], answer: 0, explain: 'Az alapot a kb. 80 cm-es fagyhatár alá kell vinni.' },
        { q: 'Mikor használnak lemezalapot?', options: ['Gyenge vagy egyenlőtlen talajon, pincés háznál', 'Csak kerítéshez', 'Ha nagyon jó a talaj', 'Fából készült házaknál soha'], answer: 0, explain: 'A lemezalap nagy felületen osztja el a terhet.' },
        { q: 'Egy derékszög kitűzésekor 3 m-t és 4 m-t mérsz ki. Mekkora legyen az átló?', options: ['5 m', '7 m', '6 m', '4,5 m'], answer: 0, explain: '3² + 4² = 25, √25 = 5 m.' }
      ]
    },
    {
      id: 'beton',
      title: 'Beton és vasbeton',
      level: 2, minutes: 16,
      summary: 'Keverési arány, víz-cement tényező, bedolgozás, utókezelés, kizsaluzás, és az anyagszükséglet kiszámítása m³-ben.',
      tags: ['beton', 'vasbeton', 'keverési arány', 'víz-cement tényező', 'v/c', 'bedolgozás', 'tömörítés', 'vibrálás', 'utókezelés', 'zsaluzat', 'kizsaluzás', 'betonacél', 'betontakarás', 'köbméter', 'm³', 'anyagszükséglet', 'C20/25'],
      sections: [
        {
          title: 'Keverési arány és a víz-cement tényező',
          text: 'Kisebb munkáknál a betont gyakran **térfogatarány** szerint keverik, pl. **1 : 2 : 3** (1 rész cement, 2 rész homok, 3 rész kavics). Felelős szerkezetbe (alap, födém, koszorú) ma általában **mixerkocsis, előírt szilárdsági osztályú** (pl. C20/25, C25/30) **transzportbetont** rendelnek, amelynek összetételét az üzem garantálja.\n\nA beton minőségét leginkább a **víz-cement tényező (v/c)** határozza meg:\n\n`v/c = víz tömege / cement tömege`\n\nPélda: 300 kg cementhez 150 l (kg) víz: `v/c = 150 / 300 = 0,5`.\n\n- A cement megkötéséhez elég kevés víz kell (kb. 0,25–0,4).\n- A többlet víz a bedolgozhatóságot segíti, de **elpárolog**, és **pórusokat** hagy maga után.\n- **Több víz = gyengébb, porózusabb beton**, amely jobban **zsugorodik és repedezik**, és a fagy és a víz is könnyebben tönkreteszi. Szokásos értéke kb. **0,45–0,6**.',
          warn: 'A legsúlyosabb, és sajnos gyakori hiba: „hígítani” a betont vízzel, hogy könnyebb legyen bedolgozni. Ez **jelentősen rontja** a szilárdságot! Ha könnyebben bedolgozható beton kell, azt a megrendeléskor kell kérni (konzisztencia, folyósító adalékszer).'
        },
        {
          title: 'Bedolgozás és tömörítés',
          text: '- A zsaluzatot előtte meg kell **tisztítani**, leválasztó anyaggal (zsaluolajjal) kezelni, és ellenőrizni a stabilitását: a friss beton nagyon nehéz (kb. **2,4 t/m³**), és nagy oldalnyomást fejt ki.\n- A betonacélt **távtartókkal** kell rögzíteni, hogy meglegyen a **betontakarás**.\n- A betont ne ejtsd túl magasról (kb. 1–1,5 m felett), mert **szétosztályozódik**: a kavics leül, a cementpép felül marad. Ilyenkor csúszdát, csövet használnak.\n- **Rétegesen** töltsd be, és minden réteget **tömöríts** tűvibrátorral: ez kirázza a levegőbuborékokat. A vibrátort függőlegesen, sűrűn, rövid ideig tartsd bele, és lassan húzd ki. A túlvibrálás is káros (szétosztályozódás).\n- A betont a gyártástól számítva a megadott időn belül (jellemzően kb. 1,5–2 órán belül) be kell dolgozni.'
        },
        {
          title: 'Utókezelés és kizsaluzás',
          text: 'A beton **nem száradással**, hanem a cement és a víz **kémiai reakciójával** szilárdul. Ehhez **vízre** van szüksége: ha a friss beton túl gyorsan kiszárad, a felülete **megrepedezik**, porlik, és nem éri el a szilárdságát.\n\n**Utókezelés**:\n\n- tartsd **nedvesen** legalább **3–7 napig** (locsolás, nedves takarás, fólia, utókezelő szer),\n- óvd a **tűző naptól, széltől** és a **fagytól** (kb. +5 °C alatt külön intézkedés kell: meleg víz, takarás, fűtés, fagyásgátló adalékszer),\n- az első napokban ne terheld.\n\nA beton szilárdulása idő- és hőmérsékletfüggő. A szabványos szilárdságát (pl. C20/25) **28 napos** korára éri el, hidegben lassabban.\n\n**Kizsaluzás** (tájékoztató értékek normál, kb. 15–20 °C-os időben, a végső döntést a tervező, a kivitelezés felelőse hozza meg):\n\n- az **oldalzsalu** (pl. sávalap, fal oldala) kb. **1–3 nap** után,\n- a **födém, gerenda alsó zsaluzata** és alátámasztása jóval később, a betonszilárdság alapján, gyakran **2–4 hét** után (az alátámasztás egy része akár tovább is maradhat).\n\nHidegben ezek az idők **meghosszabbodnak**.',
          tip: 'A frissen betonozott járda vagy lépcső felületét nyáron érdemes fóliával vagy nedves zsákvászonnal letakarni. A „pókhálószerű” hajszálrepedések szinte mindig a túl gyors kiszáradás jelei.'
        },
        {
          title: 'Anyagszükséglet számítása',
          text: 'A beton mennyiségét **köbméterben (m³)** rendelik. Egy hasáb alakú elem térfogata:\n\n`V = hossz · szélesség · magasság`\n\nMinden méretet előbb **méterre** válts át!\n\nPélda: sávalap, **0,4 m** széles, **0,8 m** mély, összesen **30 m** hosszú:\n\n`V = 30 · 0,4 · 0,8 = 9,6 m³`\n\nA veszteség (kiömlés, egyenetlen földfal, a pumpában maradó anyag) miatt szokás kb. **5–10%-kal több** rendelni: `9,6 · 1,05 ≈ 10,1 m³`.\n\nPélda: aljzatbeton, **5 m × 4 m**, **10 cm** vastag: `5 · 4 · 0,1 = 2 m³`.\n\nHasznos számok:\n\n- `1 m³ = 1000 l` (dm³)\n- a beton sűrűsége kb. **2,4 t/m³** (vasbetoné kb. 2,5 t/m³): 1 m³ friss beton kb. 2,4 tonna!\n- egy átlagos mixerkocsi kb. 6–9 m³-t szállít.',
          widget: { type: 'gyakorlas', options: { kind: 'kerulet', title: 'Terület- és térfogatszámítás gyakorló', help: 'A zsaluzat felülete terület, a beton mennyisége térfogat. Gyakorold a téglalap, a háromszög, a kör területét és a kocka térfogatát!' } }
        }
      ],
      quiz: [
        { q: 'Mi történik, ha több vizet keversz a betonba?', options: ['Gyengébb és jobban repedezik', 'Erősebb lesz', 'Gyorsabban eléri a végső szilárdságát', 'Nem változik semmi'], answer: 0, explain: 'A többletvíz pórusokat hagy, és nő a zsugorodás.' },
        { q: 'Hány m³ beton kell egy 6 m × 5 m-es, 10 cm vastag aljzatba (veszteség nélkül)?', options: ['3 m³', '30 m³', '0,3 m³', '300 m³'], answer: 0, explain: '6 · 5 · 0,1 = 3 m³.' },
        { q: 'Miért kell a friss betont nedvesen tartani?', options: ['Mert a kötéshez víz kell, és a gyors kiszáradás repedést okoz', 'Hogy könnyebb legyen kizsaluzni', 'Hogy szebb színe legyen', 'Nem kell, a beton száradással szilárdul'], answer: 0, explain: 'A cement a vízzel kémiai reakcióban szilárdul.' }
      ]
    },
    {
      id: 'szigeteles',
      title: 'Hő- és vízszigetelés',
      level: 2, minutes: 14,
      summary: 'Hőhíd, U-érték, homlokzati hőszigetelés, talajnedvesség elleni szigetelés, páralecsapódás és penész.',
      tags: ['hőszigetelés', 'vízszigetelés', 'hőhíd', 'U-érték', 'hőátbocsátási tényező', 'homlokzati hőszigetelés', 'ETICS', 'dübel', 'üvegszövet háló', 'talajnedvesség', 'talajvíz', 'vízszintes szigetelés', 'függőleges szigetelés', 'penész', 'páralecsapódás', 'harmatpont'],
      sections: [
        {
          title: 'Hőveszteség és az U-érték',
          text: 'Télen a fűtött házból a hő a falon, a tetőn, a padlón és az ablakokon át kifelé áramlik. A szigetelés ezt az áramlást **lassítja**.\n\nAz **U-érték** (hőátbocsátási tényező) megmutatja, hány **watt** hő megy át **1 m²** szerkezeten, ha a belső és a külső hőmérséklet között **1 °C** a különbség. Mértékegysége **W/(m²·K)**.\n\n- **Minél kisebb az U-érték, annál jobban szigetel a szerkezet.**\n- Egy régi, szigeteletlen 38-as tömör téglafal U-értéke kb. 1,3–1,5 W/(m²·K), egy mai, jól szigetelt falé **0,24 alatt** van (nagyságrendileg ennyi a mai hazai követelmény külső falra).\n\nPélda: 100 m² falon, U = 1,4 W/(m²·K), 20 °C-os különbségnél `100 · 1,4 · 20 = 2800 W` hő távozik. Ugyanez U = 0,24-gyel: `100 · 0,24 · 20 = 480 W`. Ez **közel hatod** annyi!'
        },
        {
          title: 'A hőhíd',
          text: 'A **hőhíd** a szerkezetnek az a része, ahol a hő **könnyebben** áramlik kifelé, mint a környezetében. Tipikus helyei:\n\n- **vasbeton koszorú, áthidaló, pillér** a falban (a beton sokkal jobban vezeti a hőt, mint a falazóblokk),\n- **erkélylemez**, amely a födémből kinyúlik,\n- **sarkok**, falcsatlakozások,\n- **ablak- és ajtókávák**, rossz beépítésű nyílászárók,\n- a **lábazat** és a födém csatlakozása.\n\nA hőhídnál a fal **belső felülete hidegebb**. Ha ez a felület a levegő **harmatpontja** alá hűl, a levegő párája **kicsapódik** rajta, és ott megjelenik a **penész**. Ezért a hőhidakat is gondosan **körbe kell szigetelni**.'
        },
        {
          title: 'Homlokzati hőszigetelés',
          text: 'A **homlokzati hőszigetelő rendszer** (angol rövidítéssel ETICS) rétegei kívülről befelé haladva: vékonyvakolat, alapozó, ragasztóba ágyazott **üvegszövet háló**, **hőszigetelő lap**, ragasztó, fal.\n\nA munka lépései:\n\n1. Az aljzat legyen **szilárd, száraz, tiszta, sík**. A laza vakolatot le kell verni.\n2. **Lábazati indítóprofil** felszerelése, vízszintesen.\n3. A lapok **ragasztása**: a **pont-perem** módszerrel (körben perem, középen pontok), hogy a lap legalább kb. **40%-ban** tapadjon, és ne legyen levegőcsatorna mögötte. A lapok **kötésben** (eltolva) kerüljenek fel, a nyílások sarkainál ne legyen hézag.\n4. **Dübelezés** a tervezett számban és elrendezésben, a ragasztó megkötése után.\n5. **Hálózás**: ragasztóba ágyazott üvegszövet háló, a toldásoknál kb. **10 cm átfedéssel**, a nyílások sarkainál **ferde erősítő hálócsíkkal**.\n6. **Alapozó és vékonyvakolat**.\n\nA **lábazatra** és a talajjal érintkező részre **XPS** vagy lábazati lap kell. Ma a hőszigetelés vastagsága jellemzően **12–20 cm**.',
          tip: 'A hőszigetelő lapok közti hézagot ne töltsd ki ragasztóval (az hőhidat képez), hanem szigetelőcsíkkal vagy erre való purhabbal.'
        },
        {
          title: 'Talajnedvesség és talajvíz elleni szigetelés',
          text: 'A talajban mindig van nedvesség, amelyet a falazat **kapillárisan** (a vékony pórusokban felfelé) **felszív**, akár 1 méter magasra is. Ennek jele a lábazaton a **vizes, salétromos, málló** sáv.\n\n- **Vízszintes szigetelés**: a falazat alatt, az alap és a fal között (a lábazatban, a terepszint fölött), hogy a nedvesség ne szívódjon fel a falba. Ma jellemzően **bitumenes lemez**.\n- **Függőleges szigetelés**: a pincefal, lábazat talajjal érintkező külső oldalán, a talajból oldalról érkező víz ellen. Erre jöhet a **szivárgó réteg** és a **szigetelésvédelem** (pl. dombornyomott lemez, XPS).\n- A szigetelés **folytonos** legyen: a lemezek **átfedése** jellemzően legalább **10 cm**, a vízszintes és a függőleges szigetelés **csatlakozzon** egymáshoz.\n\n**Talajnedvesség** és **talajvíz** nem ugyanaz: a nyomás alatti talajvíz (magas talajvízszint, pince a víz alatt) ellen sokkal komolyabb, **nyomás elleni** szigetelés vagy vízzáró beton szükséges, amit **szakember tervez**.',
          warn: 'A régi, vizes falakat utólag is lehet szigetelni (falátvágás, injektálás), de ehhez előbb meg kell állapítani a nedvesedés **okát**. Ha az ok beázás, csőtörés vagy rossz csapadékvíz-elvezetés, akkor a szigetelés nem segít.'
        }
      ],
      quiz: [
        { q: 'Melyik fal szigetel jobban?', options: ['Amelyiknek kisebb az U-értéke', 'Amelyiknek nagyobb az U-értéke', 'Amelyik vékonyabb', 'Amelyik betonból van'], answer: 0, explain: 'Az U-érték a hőáramot mutatja: minél kisebb, annál kevesebb hő megy át.' },
        { q: 'Mi a hőhíd?', options: ['Olyan rész, ahol a hő könnyebben távozik', 'Fűtőcső a falban', 'Kéményseprő-járda', 'Hőszigetelő lap'], answer: 0, explain: 'Pl. vasbeton koszorú, erkélylemez, sarok.' },
        { q: 'Mire való a vízszintes szigetelés a fal alatt?', options: ['Megakadályozza, hogy a fal felszívja a talajnedvességet', 'A hőt tartja bent', 'A hangot szigeteli', 'A falat díszíti'], answer: 0, explain: 'A kapilláris felszívódást szakítja meg.' }
      ]
    },
    {
      id: 'munkavedelem',
      title: 'Munkavédelem az építkezésen',
      level: 1, minutes: 15,
      summary: 'Magasban végzett munka, állvány, leesés elleni védelem, védősisak, por és szilikózis, emelés, árok és bontás veszélyei.',
      tags: ['munkavédelem', 'leesés', 'magasban végzett munka', 'állvány', 'korlát', 'lábléc', 'zuhanásgátló', 'heveder', 'védősisak', 'munkavédelmi bakancs', 'por', 'kvarcpor', 'szilikózis', 'FFP3', 'emelés', 'bontás', 'azbeszt', 'árok', 'dúcolás', 'létra'],
      sections: [
        {
          title: 'A leesés: az első számú veszély',
          text: 'Az építőipari halálos balesetek legnagyobb része **leesésből** ered: állványról, tetőről, létráról, födémáttörésen, nyitott aknán át. Már **néhány méteres** esés is halálos lehet.\n\nA hazai szabályok szerint általában kb. **2 m** szintkülönbség felett kötelező a **leesés elleni védelem**, de alacsonyabban is kell, ha a lezuhanás különösen veszélyes helyre történhet (pl. vasbetétek kiálló végére, gépre, vízbe, nyitott árokba). A pontos előírást a munkavédelmi szabályok és a munkahely kockázatértékelése adja.\n\nA védelem sorrendje:\n\n1. **Kollektív védelem** (mindenkit véd): **korlát** (kb. 1 m magas felső rúd, középső rúd és **lábléc**), **védőháló**, a födémnyílások szilárd, rögzített **lefedése**.\n2. Ha ez nem lehetséges: **egyéni védőeszköz**: **teljes testhevederzet** zuhanásgátlóval (energiaelnyelővel), **megfelelő kikötési ponthoz** rögzítve.\n\nA **derékövet** nem zuhanásgátlásra tervezték. A heveder csak akkor ér valamit, ha **be is van akasztva**.',
          warn: '**Födémnyílást, aknát soha ne hagyj lefedetlenül**, és a lefedést rögzítsd, jelöld meg! A rá nem rögzített deszka elmozdul, a rálépő ember átzuhan. Tetőn a hullámpala, üvegtető, bevilágító **nem lépésálló**: átszakad.'
        },
        {
          title: 'Állvány és létra',
          text: '**Állvány**:\n\n- csak **szakszerűen felállított**, átadott, **ellenőrzött** állványon dolgozz (az állványt felállító személy és a használat előtti ellenőrzés dokumentált),\n- legyen **teljes a pallózás** (nincs rés, nincs kilógó, billenő palló), legyen **korlát** és **lábléc**,\n- legyen **stabil az alapja** (teherelosztó talp, nem téglára, nem fagyott vagy felázott földre) és **kikötve a falhoz**,\n- **ne terheld túl** (a megengedett terhelés az állványon fel van tüntetve), ne halmozz rá egy helyre sok téglát, habarcsot,\n- **ne mássz** a korláton vagy a keret külső oldalán, a feljárót használd,\n- az állványt önkényesen **ne alakítsd át** (pl. korlátot, kikötést ne szereld le),\n- erős szélben, viharban, jegesen ne dolgozz rajta.\n\n**Létra**: rövid, könnyű munkára és feljutásra való, nem munkaállás. Legyen ép, a talpa csúszásmentes, támasztólétránál a dőlésszög kb. **75°** (kb. 1 egységnyi távolság a faltól 4 egységnyi magasságra), és a felső végénél kb. **1 m-rel nyúljon túl** a kilépési szinten. Mindig **három ponton** érintkezz vele (két kéz és egy láb, vagy két láb és egy kéz).'
        },
        {
          title: 'Egyéni védőeszközök és por',
          text: '- **Védősisak**: az építési területen **mindig** kötelező (leeső tárgy, beütés). Ha sérült vagy nagy ütést kapott, cserélni kell.\n- **Munkavédelmi bakancs** (pl. S3: **acélorr** és **talplemez** a szögbe lépés ellen).\n- **Védőkesztyű** (cement, habarcs, éles anyagok), **védőszemüveg** (vágás, vésés, csiszolás, keverés), **hallásvédő** (vésőgép, sarokcsiszoló), **jól láthatósági mellény**.\n\n**Por és szilikózis**: a beton, tégla, kő, habarcs vágásakor, csiszolásakor, vésésekor **kvarcpor** (kristályos szilícium-dioxid) keletkezik. A nagyon finom por mélyen a tüdőbe jut, és évek alatt **szilikózist** (a tüdő gyógyíthatatlan hegesedését) okozhat, emellett növeli a **tüdőrák** kockázatát is. A por **nem kell, hogy látható legyen** ahhoz, hogy ártson.\n\nVédekezés: **nedves vágás** (vízhűtéses gép), **porelszívós** szerszámok, jó szellőzés, **FFP3** (legalább FFP2) részecskeszűrő maszk, amely **szorosan illeszkedik** (szakáll mellett nem zár). A port ne söpörd szárazon és ne fúvasd le sűrített levegővel: porszívózd vagy nedvesítsd.',
          warn: '**Azbeszt**: a régi (kb. az 1990-es évek előtti) épületekben azbesztcement pala, csövek, szigetelések lehetnek. Az azbesztszálak belélegezve évtizedek múlva **halálos** betegséget (mesothelioma, tüdőrák, azbesztózis) okoznak. Azbeszttartalmú anyagot **ne törj, ne vágj, ne fúrj**! A bontását csak erre **engedéllyel rendelkező** szakcég végezheti.'
        },
        {
          title: 'Emelés, árok, bontás',
          text: '**Emelés**: a kézi anyagmozgatás gerincsérülést okozhat.\n\n- Mérd fel a terhet: **ha túl nehéz, kérj segítséget** vagy használj gépet (talicska, emelő, daru).\n- Állj közel a teherhez, **terpeszben**, guggolj le **térdből**, a **hátad egyenes** maradjon.\n- Lábból emelj, a terhet a testedhez közel tartsd, **ne fordulj el derékból** teherrel a kezedben, inkább lépj.\n- Egy 25 kg-os zsák cement is komoly teher, ha egész nap emeled.\n\n**Munkaárok**: a mély árok fala **beomolhat**, és egy köbméter föld kb. 1,5–2 tonna: aki alá kerül, megfulladhat vagy összeroppanhat. Kb. **1–1,5 m** mélység felett (a talajtól függően) az árok falát **dúcolni** vagy **rézsűsen** kialakítani kell. A kitermelt földet ne az árok szélére halmozd, és gép ne álljon a szélén.\n\n**Bontás**: a bontás az egyik legveszélyesebb munka, mert a szerkezet viselkedése nem mindig látható előre.\n\n- **Teherhordó falat, pillért, födémet** csak **statikus terv** alapján, előzetes **alátámasztással** szabad bontani vagy áttörni.\n- Bontás előtt a **közműveket** (áram, gáz, víz) le kell zárni, és meg kell győződni arról, hogy a vezetékek valóban feszültségmentesek, nyomásmentesek.\n- **Felülről lefelé** bontunk, és senki nem tartózkodhat a bontott rész alatt vagy a lezuhanó anyag útjában. A veszélyes területet el kell keríteni.\n- Ne bonts úgy, hogy a megmaradó rész (pl. egy szabadon álló falrész, kémény) **instabil** maradjon.',
          warn: 'Ha egy fal vagy födém bontás közben recseg, megmozdul, vagy repedések jelennek meg rajta: **azonnal hagyd abba, hagyd el a területet**, és szólj a felelős műszaki vezetőnek. Soha ne „próbáld megmenteni”.'
        }
      ],
      quiz: [
        { q: 'Mi a leesés elleni védelem helyes sorrendje?', options: ['Előbb kollektív (korlát, háló), utána egyéni (heveder)', 'Csak heveder kell, korlát soha', 'Elég a figyelmes munka', 'Előbb heveder, korlát csak ha marad idő'], answer: 0, explain: 'A kollektív védelem mindenkit véd, nem függ attól, hogy valaki beakasztja-e a hevedert.' },
        { q: 'Milyen betegséget okozhat a kvarcpor?', options: ['Szilikózist', 'Ízületi gyulladást', 'Bőrrákot', 'Hallásvesztést'], answer: 0, explain: 'A kvarcpor a tüdő gyógyíthatatlan hegesedését okozza.' },
        { q: 'Régi palatetőt kell bontani. Mi a helyes?', options: ['Engedéllyel rendelkező szakcégre bízni, mert azbesztes lehet', 'Sarokcsiszolóval feldarabolni', 'Kalapáccsal összetörni és konténerbe dobni', 'Benzinnel lemosni és újrafesteni'], answer: 0, explain: 'Az azbeszt belélegezve halálos betegséget okoz.' }
      ]
    },
    {
      id: 'tervrajz',
      title: 'Tervrajz-olvasás és felmérés',
      level: 2, minutes: 15,
      summary: 'Alaprajz, metszet, homlokzat, méretarány, jelölések, szintek, és a mennyiség-kimutatás alapjai.',
      tags: ['tervrajz', 'alaprajz', 'metszet', 'homlokzat', 'helyszínrajz', 'méretarány', 'M 1:100', 'M 1:50', 'méretezés', 'szint', '±0,00', 'nyílászáró', 'parapet', 'jelmagyarázat', 'mennyiség-kimutatás', 'felmérés'],
      sections: [
        {
          title: 'Milyen rajzok vannak?',
          text: '- **Helyszínrajz**: a telek felülről, rajta az épület helye, a telekhatárok, a közművek, az utca. Jellemző méretarány **1:500** vagy 1:200.\n- **Alaprajz**: az épületet kb. **1 m magasan vízszintesen „elvágjuk”**, és felülről nézzük. Látszanak a falak, ajtók, ablakok, helyiségek, a méretek. Minden szintről külön alaprajz van.\n- **Metszet**: az épületet **függőlegesen** vágjuk el. Látszanak a **magasságok**: az alapok, a födémek, a tető rétegei, a szintek. Az alaprajzon a metszet helyét egy vonal és betűk jelzik (pl. **A–A**).\n- **Homlokzat**: az épület kívülről, egy-egy oldalról nézve (pl. utcai, udvari homlokzat).\n- **Részletrajz**: egy kis részlet nagy méretarányban (pl. **1:10, 1:5**), pl. a lábazat szigetelésének rétegei.\n- **Statikai (tartószerkezeti) terv**: az alapok, a vasbeton szerkezetek, a **vasalási** rajzok.'
        },
        {
          title: 'Méretarány',
          text: 'A **méretarány** megmutatja, hányszor kisebb a rajz a valóságnál. **M 1:100** azt jelenti, hogy a rajzon **1 cm** a valóságban **100 cm = 1 m**.\n\n- **1:100**: 1 cm = 1 m (engedélyezési alaprajz)\n- **1:50**: 1 cm = 50 cm, vagyis 2 cm = 1 m (kiviteli terv, részletesebb)\n- **1:20**: 1 cm = 20 cm\n- **1:500**: 1 cm = 5 m (helyszínrajz)\n\nPélda: 1:50-es rajzon egy fal **8,4 cm**. A valóságban `8,4 · 50 = 420 cm = 4,2 m`.\n\nFontos: a rajzon a **méretszámot** olvasd le, ne vonalzóval mérj! A nyomtatás, másolás torzíthat, és a beírt méret a mérvadó. Az építészeti rajzokon a méretek általában **cm**-ben vannak (néha mm-ben: ezt a rajz feltünteti).',
          widget: { type: 'gyakorlas', options: { kind: 'mertekegyseg', title: 'Mértékegység-váltás gyakorló', help: 'A rajzon cm, a rendelésnél m, m² és m³: gyakorold az átváltást! Például: 420 cm = 4,2 m, 1 m³ = 1000 l.' } }
        },
        {
          title: 'Jelölések és szintek',
          text: '- **Falak**: a metszett falat vastag vonallal és **anyagjelöléssel** (sraffozás, színezés) rajzolják. A jelmagyarázat mutatja, melyik minta milyen anyag (tégla, beton, vasbeton, szigetelés).\n- **Méretlánc**: a fal mentén sorban egymás után a nyílások és falszakaszok méretei, kívül pedig a teljes méret.\n- **Nyílászárók**: az ablak és ajtó mellett tört alakban a **szélesség / magasság**, pl. **90/210** egy 90 cm széles, 210 cm magas ajtót jelent. Az ablaknál a **parapetmagasság** (mellvéd) a padlótól az ablak alsó széléig mért magasság, pl. **90 cm**.\n- Az ajtó nyitásirányát egy **negyedkör** mutatja.\n- **Szintek**: a ±0,00 általában a **földszinti kész padló** szintje. A többi szint ehhez képest: pl. **+2,90** az emeleti padló, **−0,45** a terepszint. A metszeten és a homlokzaton háromszöges szintjelek mutatják.\n- **Helyiséglista**: a helyiség neve, alapterülete (m²), a padló burkolata.'
        },
        {
          title: 'Felmérés és mennyiség-kimutatás',
          text: 'A **mennyiség-kimutatás** (felmérés) azt számolja ki a rajzból, **mennyi anyag és munka** kell: m³ beton, m² falazat, m² vakolat, db ablak. Ebből készül az **árajánlat** (költségvetés) és az anyagrendelés.\n\n**Falazat felülete**: `hossz · magasság − nyílások`\n\nPélda: egy fal **10 m** hosszú, **2,7 m** magas, benne egy **0,9 × 2,1 m**-es ajtó és egy **1,5 × 1,2 m**-es ablak.\n\n- teljes felület: `10 · 2,7 = 27 m²`\n- ajtó: `0,9 · 2,1 = 1,89 m²`\n- ablak: `1,5 · 1,2 = 1,8 m²`\n- nettó falfelület: `27 − 1,89 − 1,8 = 23,31 m²`\n\nHa a falazóblokkból **16 db/m²** kell (pl. egy 30-as blokknál, a gyártó adata szerint), a szükséges mennyiség `23,31 · 16 ≈ 373 db`, és ehhez még kb. 3–5% tartalék (törés, vágás) jön.\n\nMindig **egyértelműen** jegyezd fel, mit számoltál (melyik fal, mely méretek), hogy más is ellenőrizhesse. A helyszíni **felmérésnél** pedig mindig mérj kétszer: egy rossz méret drága hibát okozhat.',
          tip: 'Ellenőrzés: egy téglalap alakú helyiség két átlója egyenlő. Ha nem, a helyiség nem derékszögű, és ezt a burkolásnál, szekrénybeépítésnél figyelembe kell venni.'
        }
      ],
      quiz: [
        { q: 'Mit jelent az M 1:100 méretarány?', options: ['1 cm a rajzon 1 m a valóságban', '1 m a rajzon 100 m a valóságban', '1 cm a rajzon 100 m a valóságban', '1 mm a rajzon 1 m a valóságban'], answer: 0, explain: '1 cm · 100 = 100 cm = 1 m.' },
        { q: 'Mit jelent egy ajtó mellett a 90/210 jelölés?', options: ['90 cm széles, 210 cm magas', '90 cm magas, 210 cm széles', '90° nyitási szög, 210 mm tok', '90 kg, 210 cm'], answer: 0, explain: 'A nyílászáró jelölése: szélesség / magasság cm-ben.' },
        { q: 'Mit ábrázol a metszet?', options: ['Az épület függőleges „elvágását”, a magasságokat', 'A telket felülről', 'Csak a homlokzat színét', 'A villanyhálózatot'], answer: 0, explain: 'A metszeten látszanak a szintek, födémek, tetőrétegek.' }
      ]
    }
  ]
});

/* Hibakereső döntési fák (formátum: js/hibakereses.js fejléce) */
STUDIE.addTrouble({
  id: 'epitoipar-reped',
  title: 'Repedezik a vakolat vagy a beton',
  lessons: ['epitoipar/beton', 'epitoipar/falazas'],
  intro: 'Nem minden repedés egyforma: a hajszálrepedés legtöbbször csak esztétikai hiba, a széles, ferde vagy növekvő repedés viszont **szerkezeti probléma** jele lehet. Figyeld meg a repedés **alakját, szélességét és helyét**! Ha a repedés tágul, a nyílászárók beszorulnak, vagy a födém lehajlik, **ne várj**: hívj **statikus szakembert**.',
  start: 'hol',
  nodes: {
    hol: { q: 'Hol és milyen a repedés?', check: 'Nézd meg közelről és mérd meg a szélességét (repedésmérő kártyával vagy egy vékony tárggyal: hajszál, bankkártya, érme élével).', answers: [
      { t: 'Hálós, pókhálószerű hajszálrepedés a felületen', next: 'halos' },
      { t: 'Ferde (kb. 45°-os) repedés, főleg nyílások sarkánál', next: 'ferde' },
      { t: 'Függőleges vagy vízszintes, egyenes repedés', next: 'egyenes' },
      { t: 'A vakolat felpúposodik, kong, leválik', next: 'valas' }] },
    halos: { q: 'Mi a repedezett felület?', answers: [
      { t: 'Friss betonfelület (járda, aljzat, lépcső)', next: 'r_beton_zsugor' },
      { t: 'Friss vakolat', next: 'vakolat_friss' },
      { t: 'Régi, színezett homlokzat', next: 'r_vekonyvakolat' }] },
    vakolat_friss: { q: 'Milyen körülmények között vakoltál?', check: 'Gondold végig: tűző nap, szél, nagy meleg? Előnedvesítetted a falat? Milyen vastag volt egy réteg? Milyen volt a keverék?', answers: [
      { t: 'Tűző napon, szélben, előnedvesítés nélkül', next: 'r_vakolat_szaradas' },
      { t: 'Túl vastag rétegben, vagy túl cementdús, túl finom homokkal', next: 'r_vakolat_keverek' }] },
    ferde: { q: 'Változik a repedés? Beszorulnak az ajtók, ablakok?', check: 'Ragassz át a repedésen **gipszcsíkot** vagy tegyél rá **repedésjelzőt (repedésmérő bélyeget)** dátummal, és hetekig figyeld: elreped-e, elmozdul-e. Fényképezd le mérővel együtt.', answers: [
      { t: 'Igen, tágul, vagy szorulnak a nyílászárók', next: 'r_sullyedes' },
      { t: 'Nem változik, régi, kb. 1 mm alatti', next: 'r_regi_mozgas' }] },
    egyenes: { q: 'Hol fut a repedés?', answers: [
      { t: 'Két különböző anyag találkozásánál (pl. fal és beton koszorú, áthidaló, régi és új fal)', next: 'r_anyagvaltas' },
      { t: 'Hosszú betonfelületen (járda, térkő alatti lemez, kerítéslábazat) szabályos közönként', next: 'r_dilatacio' },
      { t: 'Vasbeton szerkezeten (gerenda, födém, lépcső), rozsdafolttal', next: 'r_korrozio' },
      { t: 'Födém alatt, a födém közepén vagy a mennyezet és fal találkozásánál, és a födém lehajlik', next: 'r_fodem' }] },
    valas: { q: 'Nedves a fal a leváló vakolat mögött?', check: 'Tapintsd meg, nézd meg a fal alsó részét: van-e vizes sáv, sókivirágzás (fehér, morzsalékos lerakódás)? Kopogtasd végig a vakolatot: ahol kong, ott elvált.', answers: [
      { t: 'Igen, főleg a fal alján, sókivirágzással', next: 'r_nedves_fal' },
      { t: 'Nem, száraz', next: 'r_tapadas' }] },
    r_beton_zsugor: { result: 'Korai kiszáradás miatti zsugorodási (plasztikus) repedés', fix: 'A friss beton felülete túl gyorsan kiszáradt (nap, szél, meleg), vagy túl sok víz volt a keverékben. Általában csak felületi hiba.\n\nKövetkező alkalommal:\n- ne adj **többletvizet** a betonhoz (víz-cement tényező!),\n- az **utókezelés**: legalább 3–7 napig **nedvesen** tartani (locsolás, fólia, nedves takarás),\n- tűző napon, szélben árnyékolás, takarás.', level: 'ok' },
    r_vakolat_szaradas: { result: 'A vakolat túl gyorsan kiszáradt', fix: 'Az előnedvesítetlen fal és a nap, szél kiszívta a vizet a habarcsból, mielőtt megköthetett volna. A hajszálrepedéseket a fedőréteg (simítás, glettelés, színezés előtti **hálózás**) eltüntetheti.\n\nKövetkező alkalommal: **nedvesítsd elő** a falat, ne vakolj tűző napon, erős szélben, és a friss vakolatot az első napokban **óvd** és szükség szerint **permetezd**.', level: 'ok' },
    r_vakolat_keverek: { result: 'Rossz keverék vagy túl vastag réteg', fix: 'A túl cementdús, túl finom (iszapos) homokkal kevert vakolat jobban zsugorodik, a túl vastag réteg pedig egyenlőtlenül szárad. Tartsd a **keverési arányt** (vagy a szárazhabarcs gyártói előírását), és vastagabb kiegyenlítést **több rétegben**, a rétegek közti száradási idő betartásával készíts.', level: 'ok' },
    r_vekonyvakolat: { result: 'Elöregedett vagy rosszul tapadó vékonyvakolat', fix: 'A régi, napnak kitett homlokzati vakolat és festék idővel elveszíti rugalmasságát. Ha a vakolat tapad (nem kong), a felület **tisztítás** és **alapozás** után **rugalmas** homlokzatfestékkel vagy hálózás utáni új vékonyvakolattal felújítható.', level: 'ok' },
    r_sullyedes: { result: 'Egyenlőtlen süllyedés vagy szerkezeti mozgás gyanúja', fix: 'A ferde, nyílások sarkából induló, táguló repedés és a beszoruló nyílászárók azt jelzik, hogy az épület egy része **mozog**: pl. egyenlőtlenül süllyed az alap (átázott talaj, csőtörés, közeli fa gyökere, kiszáradó agyag, közelben végzett ásás).\n\n- **Ne javítgasd** csak vakolással: a repedés újra megnyílik.\n- Dokumentáld (fotó, repedésjelző, dátum), és **hívj statikus szakembert**.\n- Ellenőriztesd a **csatornát, csapadékvíz-elvezetést, vízvezetéket**, mert a talaj átázása gyakori ok.', level: 'bad', pro: true },
    r_regi_mozgas: { result: 'Régi, nyugvó repedés', fix: 'Ha a repedés hónapok óta nem változik, valószínűleg egy már lezajlott mozgás (pl. az új épület első éveinek ülepedése) nyoma. A repedést **kitágítva**, kitisztítva, rugalmas anyaggal vagy javítóhabarccsal, és a vakolatba ágyazott **üvegszövet hálóval** átfedve lehet javítani. Figyeld tovább: ha újra megnyílik, hívj szakembert.', level: 'ok' },
    r_anyagvaltas: { result: 'Repedés az anyagváltásnál', fix: 'A beton és a falazóanyag eltérően **mozog** a hő és a nedvesség hatására, és a beton hőhíd is. A határvonalon ezért gyakran repedés jelenik meg.\n\nMegelőzés és javítás: a vakolás előtt az anyagváltás fölé **vakolaterősítő hálót** (üvegszövet vagy rabichálót) kell ágyazni, legalább kb. 10–20 cm-rel túlnyúlva mindkét anyagra. Régi és új fal csatlakozásánál tervezett **mozgási hézag** is szükséges lehet.', level: 'ok' },
    r_dilatacio: { result: 'Hiányzó vagy rossz dilatációs (mozgási) hézag', fix: 'A nagy betonfelület a hőmérséklet-változás és a zsugorodás miatt mozog. Ha nincs **dilatációs hézag**, a beton ott reped meg, ahol akar. Hosszabb betonfelületet (járda, aljzat) ezért szabályos közönként (a vastagságtól függően kb. 2–5 m-enként) hézaggal kell megosztani (bevágás, beépített hézagprofil), és a hézagot **rugalmas** anyaggal kitölteni.', level: 'ok' },
    r_korrozio: { result: 'A betonacél rozsdásodása (korrózió)', fix: 'Ha a **betontakarás** túl vékony, vagy a beton porózus, a nedvesség és a levegő eléri az acélt, amely rozsdásodik. A rozsda nagyobb térfogatú, mint az acél, ezért **lerepeszti** a betont, a vas pedig gyengül.\n\nEz **szerkezeti hiba**: a teherbírást **statikus szakember** vizsgálja meg. A javítás jellemzően: a laza beton eltávolítása, az acél rozsdamentesítése és korrózióvédelme, majd javítóhabarcs, szükség esetén megerősítés.', level: 'bad', pro: true },
    r_fodem: { result: 'Túlterhelt vagy károsodott födém gyanúja', fix: 'A födém közepén futó repedés és a látható **lehajlás** azt jelezheti, hogy a födém túlterhelt (pl. utólag ráépített fal, nehéz burkolat, raktározás), vagy károsodott (pl. korrodált acél, beázott fagerenda).\n\n- **Azonnal** tehermentesítsd a födémet (ne tárolj rajta semmit), ha szükséges, **ne tartózkodj alatta**.\n- **Hívj statikus szakembert**, és csak az ő utasítása szerint támaszd alá.', level: 'bad', pro: true },
    r_nedves_fal: { result: 'Nedvesség és sók miatt leváló vakolat', fix: 'A falba felszívódó talajnedvesség oldott **sókat** hoz magával, amelyek a felületen kikristályosodnak, és lefeszítik a vakolatot. Amíg a nedvesség oka megvan, az új vakolat is leválik.\n\n- Keresd meg az **okot**: hiányzó vagy sérült **vízszintes szigetelés**, rossz csapadékvíz-elvezetés, túl magas terepszint a lábazatnál, beázás, csőtörés.\n- Szüntesd meg az okot (pl. utólagos falszigetelés, ereszcsatorna, lejtés a faltól el).\n- Ezután a sós vakolatot kb. **1 m-rel a nedves zóna fölött** le kell verni, és **szárítóvakolattal** (páraáteresztő, sótűrő rendszer) újravakolni.', level: 'warn', pro: true },
    r_tapadas: { result: 'Tapadási hiba', fix: 'A vakolat nem kapcsolódott az aljzathoz: az aljzat poros, sima (pl. zsalun készült beton), túl száraz vagy túl nedves volt, hiányzott a **tapadóhíd** (gúzolás, tapadóhíd-alapozó), vagy túl erős (cementdús) vakolat került gyengébb aljzatra.\n\nJavítás: a kongó részt **le kell verni**, a felületet portalanítani, sima betonnál **tapadóhíddal** kezelni, és az aljzathoz illő vakolattal újravakolni.', level: 'ok' }
  }
});

STUDIE.addTrouble({
  id: 'epitoipar-penesz',
  title: 'Penészedik a fal: hőhíd vagy beázás?',
  lessons: ['epitoipar/szigeteles'],
  intro: 'A penész mindig **nedvességet** jelez. A kérdés az, honnan jön a víz: a **levegő párájából** (páralecsapódás a hideg felületen, pl. hőhídnál), vagy **kívülről** (beázás, felszívódó talajnedvesség, csőtörés). A penészt **ne söpörd és ne kapard szárazon**: a spórák belélegezve ártanak. Tisztításkor viselj kesztyűt és FFP2-es maszkot, és szellőztess.',
  start: 'hely',
  nodes: {
    hely: { q: 'Hol jelenik meg a penész?', answers: [
      { t: 'Külső fal sarkában, mennyezet és külső fal találkozásánál, ablakkáva körül', next: 'evszak' },
      { t: 'A fal alsó részén, a padló fölött kb. 1 m magasságig', next: 'r_talajnedvesseg' },
      { t: 'A mennyezeten vagy a fal felső részén, foltokban, a tető vagy egy fürdőszoba alatt', next: 'folt' },
      { t: 'Bútor mögött, külső falnál', next: 'r_butor' }] },
    evszak: { q: 'Mikor jelentkezik, és milyen a folt?', check: 'Figyeld meg: télen, fűtési idényben erősödik, és a felület hideg tapintású? Vagy esőzés után jelenik meg, sárgás-barnás széllel?', answers: [
      { t: 'Télen, a felület hideg, a foltnak nincs határozott széle', next: 'para' },
      { t: 'Esőzés után, sárgás-barnás szélű vizesfolt', next: 'r_beazas' }] },
    para: { q: 'Milyen a lakás páratartalma és a szellőztetés?', check: 'Tegyél ki egy **páratartalom-mérőt** (higrométert) néhány napra. A kedvező érték télen kb. **40–60%**. Nézd meg, párásodik-e reggelente az ablak.', answers: [
      { t: '60% fölött van, ritkán szellőztetünk, bent szárítunk ruhát', next: 'r_para' },
      { t: 'Rendben van a páratartalom, mégis penészedik a sarok', next: 'r_hohid' }] },
    folt: { q: 'Van a folt fölött vagy mellett vizes helyiség, vezeték, tető?', check: 'Nézd meg a padlástér, a tetőfedés, az ereszcsatorna, a kémény, a felette lévő fürdőszoba, a vízvezetékek állapotát. Esős időben nagyobb lesz a folt?', answers: [
      { t: 'Tető, eresz, kémény környéke, esőben nagyobb lesz', next: 'r_beazas' },
      { t: 'Felette fürdőszoba vagy vízvezeték van, időjárástól független', next: 'r_csotores' },
      { t: 'Nincs ilyen, a mennyezet sarka télen hideg', next: 'r_hohid' }] },
    r_talajnedvesseg: { result: 'Felszívódó talajnedvesség', fix: 'A fal alsó részén megjelenő penész, sókivirágzás és málló vakolat a **hiányzó vagy sérült vízszintes szigetelés**, illetve a rossz csapadékvíz-elvezetés jele.\n\n- Nézd meg: elvezeti-e az ereszcsatorna a vizet a háztól, **lejt-e** a terep a faltól **el**, nem magasabb-e a járda, a föld a lábazati szigetelésnél?\n- Utólagos falszigetelés (falátvágás, injektálás) és szárítóvakolat szükséges lehet: ezt **szakember** mérje fel.\n- Belső oldalról a szigetelés vagy a lefestés nem oldja meg a bajt.', level: 'warn', pro: true },
    r_beazas: { result: 'Beázás kívülről', fix: 'Az esőhöz köthető, határozott szélű, sárgás-barnás folt beázásra utal.\n\n- Ellenőrizd a **tetőfedést**, a **bádogozást** (kémény, tetőablak, falcsatlakozás), az **ereszcsatornát** és a lefolyókat (eldugult csatornából a víz a falra folyik).\n- Nézd meg az ablakpárkányt, a homlokzat repedéseit, az erkély vízszigetelését.\n- Tetőn csak **biztonságosan** (leesés elleni védelemmel) dolgozz, vagy bízd **szakemberre**.\n- A belső felületet csak a beázás megszüntetése és a fal **kiszáradása** után érdemes javítani.', level: 'warn', pro: true },
    r_csotores: { result: 'Csőszivárgás, vizes helyiség szigetelési hibája', fix: 'Ha a folt az időjárástól független, és fürdőszoba, konyha, vízvezeték van a közelben, valószínűleg **csőszivárgás** vagy a zuhany, kád körüli **vízszigetelés** (kenhető szigetelés, fugák, szilikon) hibája.\n\n- Nézd meg a **vízórát**, amikor senki nem használ vizet: ha forog, szivárgás van.\n- A vízvezeték javítását **vízszerelő** végezze; a zuhanyzó körül a burkolat alá kenhető szigetelés és ép fuga, szilikon kell.', level: 'warn', pro: true },
    r_para: { result: 'Túl magas páratartalom, kevés szellőztetés', fix: 'A levegő párája a leghidegebb felületeken (sarok, ablakkáva) **kicsapódik**, és ott penész nő. Egy család naponta több liter vizet juttat a levegőbe (főzés, fürdés, ruhaszárítás, lélegzés).\n\n- **Szellőztess** naponta többször, rövid ideig, **kereszthuzattal** (5–10 perc), ne bukóra nyitott ablakkal órákig.\n- Főzésnél, fürdésnél használd az **elszívót**, csukd be az ajtót.\n- Ne szárítsd a ruhát a lakótérben, vagy szellőztess mellette.\n- Egyenletesen fűts, a helyiségeket ne hagyd nagyon kihűlni.\n- Új, jól záró ablakoknál különösen fontos a tudatos szellőztetés (vagy hővisszanyerős szellőzés).\n\nA penészt erre való penészölő szerrel távolítsd el, a gyártó előírása szerint.', level: 'ok' },
    r_hohid: { result: 'Hőhíd: a fal belső felülete túl hideg', fix: 'A szerkezet egy része (koszorú, áthidaló, sarok, erkélylemez, ablakbeépítés) jobban vezeti kifelé a hőt, ezért a belső felülete a **harmatpont alá** hűl, és normál páratartalom mellett is kicsapódik rajta a pára.\n\n- A tartós megoldás a **külső oldali hőszigetelés**, amely a hőhidat is körbefogja (koszorú, áthidaló, lábazat, kávák).\n- Belső oldali szigetelés csak szakszerű páratechnikai tervezéssel készülhet, különben a hiba a szigetelés mögé költözik.\n- Addig: a sarkot ne takard el bútorral, szellőztess, és tartsd a páratartalmat 40–60% között.\n\nA megoldást épületfizikai szempontból **szakember** tervezze meg.', level: 'warn', pro: true },
    r_butor: { result: 'Takart, nem szellőző hideg falfelület', fix: 'A külső fal mellé szorosan tolt szekrény mögött a levegő nem kering, a fal felülete hideg marad, és ott kicsapódik a pára.\n\n- A bútort tedd **legalább 5–10 cm-re** a külső faltól, vagy inkább belső falhoz.\n- Szellőztess rendszeresen, és tartsd a páratartalmat 40–60% között.\n- Ha ez sem segít, a falnak hőhídja vagy szigetelési hiányossága lehet: lásd a hőhíd ágat.', level: 'ok' }
  }
});
