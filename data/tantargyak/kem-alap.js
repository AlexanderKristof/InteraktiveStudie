/* Tantárgy: Kémia (7–8. osztály) */
STUDIE.addSubject({
  id: 'kem-alap',
  stage: 'altalanos',
  title: 'Kémia (7–8. osztály)',
  icon: '🧪',
  color: '#d9a520',
  description: 'Anyagok és keverékek, kémiai változások, az atom és a periódusos rendszer, képletek, savak és lúgok – a kémia alapjai a konyhától a környezetvédelemig.',
  intro: 'A kémia az **anyagokról** és azok **átalakulásairól** szól: miért ég a gyertya, miért rozsdásodik a bicikli, mitől habzik a szódabikarbóna az ecettől. Ebben a tárgyban sok hétköznapi példán keresztül ismered meg a kémia nyelvét: a **vegyjeleket**, a **képleteket** és az **egyenleteket**. Az interaktív atomépítőben és periódusos rendszerben ki is próbálhatod, amit tanulsz.\n\nEgy fontos szabály előre: **kémiai kísérletet csak felnőtt (tanár) felügyelete mellett, védőfelszerelésben végezz!**',
  lessons: [
    {
      id: 'anyagok',
      title: 'Anyagok és tulajdonságaik, keverékek, oldatok',
      level: 1, minutes: 14,
      summary: 'Tiszta anyagok és keverékek, az oldatok és az oldhatóság, és hogyan választhatók szét a keverékek.',
      tags: ['anyag', 'tulajdonság', 'tiszta anyag', 'elem', 'vegyület', 'keverék', 'homogén', 'heterogén', 'oldat', 'oldószer', 'oldott anyag', 'oldhatóság', 'telített oldat', 'tömegszázalék', 'szűrés', 'ülepítés', 'bepárlás', 'desztilláció', 'kromatográfia'],
      sections: [
        {
          title: 'Az anyagok tulajdonságai',
          text: 'Minden anyagot a **tulajdonságai** alapján ismerhetünk fel – akárcsak egy embert az arcáról. Ilyen tulajdonság:\n\n- **halmazállapot** szobahőmérsékleten (szilárd, folyékony, légnemű),\n- **szín, szag, íz** (ízlelni a laborban **tilos**!),\n- **sűrűség**, **olvadáspont**, **forráspont**,\n- **oldhatóság** vízben,\n- **elektromos és hővezetés**, keménység, éghetőség.\n\nA víz például színtelen, szagtalan folyadék, 0 °C-on fagy, 100 °C-on forr, sűrűsége 1 g/cm³. A konyhasó fehér, kristályos, jól oldódik vízben, 801 °C-on olvad.',
          warn: 'Ismeretlen anyagot soha ne kóstolj meg, és ne szagolj meg közvetlenül! Ha a szagát meg kell vizsgálni, a kezeddel legyezz magad felé egy kevés gőzt.'
        },
        {
          title: 'Tiszta anyagok és keverékek',
          text: 'A **tiszta anyag** csak egyféle anyagból áll, és tulajdonságai mindenhol azonosak, pl. a desztillált víz, a konyhasó, a vas, az oxigén. Két fajtája van:\n\n- **elem**: egyetlen fajta atomból áll (vas, oxigén, szén, arany);\n- **vegyület**: több különböző elem atomjaiból, **kémiai kötéssel** felépülő anyag (víz, konyhasó, szén-dioxid).\n\nA **keverék** több tiszta anyag egyszerű elegyedése, az összetétele változhat. A keverék alkotórészei **megőrzik a tulajdonságaikat**, és fizikai módszerekkel szétválaszthatók.\n\n- **Homogén keverék**: szabad szemmel, sőt mikroszkóppal sem látszanak a részei, pl. sós víz, levegő, szörp, sárgaréz (ötvözet).\n- **Heterogén keverék**: látszanak a részei, pl. homokos víz, müzli, gránit, olaj és víz.'
        },
        {
          title: 'Oldatok és oldhatóság',
          text: 'Az **oldat** homogén keverék: az **oldószerben** (leggyakrabban vízben) eloszlik az **oldott anyag**. A cukros tea esetében a víz az oldószer, a cukor az oldott anyag.\n\nAz **oldhatóság** megmutatja, mennyi anyag oldódik fel legfeljebb **100 g vízben** adott hőmérsékleten. 20 °C-on például 100 g vízben kb. 36 g konyhasó vagy kb. 200 g cukor oldható fel. Ha már nem oldódik több, az oldat **telített**.\n\n- A legtöbb **szilárd anyag** oldhatósága **melegítéssel nő** (a cukor forró teában jobban oldódik).\n- A **gázok** oldhatósága melegítéssel **csökken**: ezért pezseg ki gyorsabban a meleg üdítő, és ezért kevesebb oxigén jut nyáron a halaknak.\n\nAz oldat töménységét **tömegszázalékkal** adjuk meg:\n\n`tömegszázalék = oldott anyag tömege / oldat tömege · 100`\n\n**Kidolgozott példa:** 20 g sót 180 g vízben oldunk.\n\n1. Az oldat tömege: `20 g + 180 g = 200 g`\n2. Tömegszázalék: `20 / 200 · 100 = 10%`',
          warn: 'Gyakori hiba, hogy a vízzel osztanak az oldat helyett! Az oldat tömege = oldott anyag + oldószer.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás gyakorló', help: 'A tömegszázalék is százalékszámítás. Gyakorold az alapokat!' } }
        },
        {
          title: 'Keverékek szétválasztása',
          text: 'A keverékek alkotórészeit **fizikai módszerekkel** választjuk szét, kihasználva, hogy a tulajdonságaik különböznek:\n\n- **Ülepítés és dekantálás**: a nehezebb szilárd anyag leülepszik, a folyadékot óvatosan leöntjük róla (homokos víz).\n- **Szűrés**: a szűrőpapír átengedi a folyadékot, de a szilárd szemcséket nem (kávéfőzés, homok és víz szétválasztása).\n- **Bepárlás**: a vizet elpárologtatjuk, az oldott anyag visszamarad (sólepárlás a tengerből).\n- **Desztilláció (lepárlás)**: a folyadékot felforraljuk, a gőzt lehűtve újra cseppfolyósítjuk. A különböző forráspontú folyadékokat így szétválaszthatjuk (desztillált víz, kőolaj-feldolgozás).\n- **Mágneses szétválasztás**: a vasat mágnessel kiemeljük (vasreszelék és homok).\n- **Kromatográfia**: a különböző festékek eltérő sebességgel vándorolnak a papíron (filctoll tintájának szétválasztása).',
          widget: { type: 'parositas', options: { title: 'Melyik módszerrel választanád szét?', count: 6, pairs: [
            ['homok és víz', 'szűrés'], ['só és víz (a sót kell megkapni)', 'bepárlás'], ['vasreszelék és homok', 'mágnes'],
            ['víz és alkohol', 'desztilláció'], ['filctoll tintájának színei', 'kromatográfia'], ['sár és víz egy vödörben', 'ülepítés, dekantálás'],
            ['tealevél és tea', 'szűrés (teaszűrő)'], ['tengervízből ivóvíz', 'desztilláció (lepárlás)']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik keverék homogén?', options: ['Homokos víz', 'Müzli', 'Sós víz', 'Olaj és víz'], answer: 2, explain: 'A sós vízben a só teljesen feloldódik, a részei nem különböztethetők meg – ez homogén keverék (oldat).' },
        { q: '30 g cukrot 120 g vízben oldunk. Hány tömegszázalékos az oldat?', options: ['20%', '25%', '30%', '4%'], answer: 0, explain: 'Oldat tömege: 30 + 120 = 150 g. Tömegszázalék: 30 / 150 · 100 = 20%. A 25% akkor jön ki, ha tévesen a vízzel osztasz.' },
        { q: 'Hogyan változik általában a gázok oldhatósága vízben, ha melegítjük a vizet?', options: ['Nő', 'Megduplázódik', 'Nem változik', 'Csökken'], answer: 3, explain: 'Melegítéskor a gázok oldhatósága csökken: ezért pezseg ki a meleg üdítőből gyorsan a szén-dioxid.' },
        { q: 'Melyik módszerrel kapunk tiszta vizet a sós vízből?', options: ['Szűréssel', 'Desztillációval', 'Mágnessel', 'Ülepítéssel'], answer: 1, explain: 'A víz elforr, a gőzt lehűtve tiszta vizet kapunk, a só visszamarad. Szűréssel nem megy, mert a só fel van oldva.' }
      ]
    },
    {
      id: 'kemiai-valtozasok',
      title: 'Fizikai és kémiai változások, az égés',
      level: 1, minutes: 14,
      summary: 'Miben különbözik a fizikai és a kémiai változás, mi kell az égéshez, mi az oxidáció, és hogyan oltjuk el a tüzet.',
      tags: ['fizikai változás', 'kémiai változás', 'kémiai reakció', 'tömegmegmaradás', 'exoterm', 'endoterm', 'égés', 'gyulladási hőmérséklet', 'éghető anyag', 'oxigén', 'oxidáció', 'rozsdásodás', 'lassú oxidáció', 'tűzoltás', 'tűzháromszög', 'oxid'],
      sections: [
        {
          title: 'Fizikai vagy kémiai változás?',
          text: '**Fizikai változásnál** az anyag **nem alakul át** másik anyaggá, csak az alakja, halmazállapota, mérete változik meg. Ilyen:\n\n- a jég olvadása, a víz forrása,\n- a só oldása vízben,\n- a papír összetépése, a fa felfűrészelése.\n\n**Kémiai változásnál (kémiai reakciónál)** **új anyag** keletkezik, más tulajdonságokkal. Ilyen:\n\n- a papír elégése (hamu, szén-dioxid, víz lesz belőle),\n- a vas rozsdásodása,\n- a tej megsavanyodása, a kenyér sütése,\n- az ecet és a szódabikarbóna pezsgése.\n\nÁrulkodó jelek kémiai változásra: **színváltozás**, **gázfejlődés** (pezsgés), **csapadék** keletkezése, **fény- és hőjelenség**, új **szag**.\n\nA kémiai reakciókban az atomok csak **átrendeződnek**: nem tűnnek el és nem keletkeznek. Ezért a **tömegmegmaradás törvénye** szerint a kiindulási anyagok össztömege egyenlő a termékek össztömegével.',
          tip: 'A reakciók egy része hőt termel (**exoterm**, pl. égés), más része hőt nyel el (**endoterm**, pl. a sütőpor bomlása sütéskor). A kézmelegítő tasak és a hűtőzacskó is ilyen reakciókon alapul.'
        },
        {
          title: 'Az égés és feltételei',
          text: 'Az **égés** olyan kémiai reakció, amelyben az anyag **oxigénnel** egyesül, miközben **hő és fény** keletkezik. Az égés feltételeit a **tűzháromszög** foglalja össze:\n\n1. **éghető anyag** (fa, papír, gáz, benzin),\n2. **oxigén** (a levegő kb. 21%-a oxigén),\n3. a **gyulladási hőmérséklet** elérése (a gyufa ezért kell!).\n\nHa **bármelyik hiányzik**, nincs égés. Ha egy égő gyertyára poharat borítasz, hamarosan kialszik, mert elfogy az oxigén.\n\nAz égés termékei az **oxidok**: a szén égésekor **szén-dioxid** (CO₂), a hidrogén égésekor **víz** (H₂O), a kén égésekor kén-dioxid (SO₂) keletkezik.',
          warn: 'Ha kevés oxigén jut a tűzhöz (rosszul szellőző kályha, gázkészülék), **szén-monoxid (CO)** is keletkezik. Ez színtelen, szagtalan, nagyon mérgező gáz! Ezért fontos a szén-monoxid-érzékelő és a kémények rendszeres ellenőrzése.'
        },
        {
          title: 'Az oxidáció: lassú égés',
          text: 'Az oxigénnel való egyesülés nem mindig látványos. A **lassú oxidáció** fény nélkül, kevés hő felszabadulásával megy végbe:\n\n- a **vas rozsdásodása**: a vas a levegő oxigénjével és nedvességgel vas-oxiddá (rozsdává) alakul;\n- a felvágott **alma megbarnulása**;\n- a **sejtlégzés**: a testedben a tápanyagok lassan „elégnek” az oxigénnel, és energiát adnak – ezért lélegzel be oxigént, és fújsz ki szén-dioxidot.\n\nA rozsdásodás ellen festéssel, olajozással, horganyzással (cinkréteg) vagy rozsdamentes acél használatával védekezünk.'
        },
        {
          title: 'Tűzoltás és tűzvédelem',
          text: 'A tűzoltás lényege: **megszüntetni a tűzháromszög egyik oldalát**.\n\n- **Az oxigén elzárása**: letakarás tűzoltó takaróval, homokkal, vagy egy fedővel; a habbal oltás is ezt teszi.\n- **A hőmérséklet csökkentése**: vízzel hűtés (a víz párolgása sok hőt elvon).\n- **Az éghető anyag eltávolítása**: erdőtüzeknél tűzfolyosót vágnak, gázszivárgáskor elzárják a gázt.\n\nA **tűzoltó készüléken** betű jelzi, milyen tűzre jó: **A** – szilárd anyagok (fa, papír), **B** – éghető folyadékok, **C** – gázok, **F** – sütőolaj, zsiradék.\n\nTűz esetén: **1.** riaszd a felnőtteket, **2.** hívd a **112**-t, **3.** hagyd el az épületet, ne a liftet használd, füstben guggolva, szádat nedves ruhával védve haladj.',
          warn: '**Égő olajat soha ne olts vízzel!** A víz az forró olaj alá kerül, robbanásszerűen gőzzé válik, és szétfröcsköli az égő olajat. A serpenyőt fedővel takard le, és zárd el a tűzhelyet. **Elektromos tüzet** se olts vízzel, mert a víz vezeti az áramot: előbb áramtalaníts!'
        }
      ],
      quiz: [
        { q: 'Melyik kémiai változás?', options: ['A jég megolvad', 'A cukor feloldódik a teában', 'Az üveg összetörik', 'A gyertyakanóc elég'], answer: 3, explain: 'Égéskor új anyagok (szén-dioxid, víz) keletkeznek. A többi esetben az anyag ugyanaz marad, csak az állapota vagy alakja változik.' },
        { q: 'Miért alszik ki a gyertya, ha üvegpoharat borítunk rá?', options: ['Mert lehűl', 'Mert elfogy a pohár alatt az oxigén', 'Mert elfogy a viasz', 'Mert az üveg elnyeli a hőt'], answer: 1, explain: 'Az égéshez oxigén kell. A pohár alatt lévő kevés oxigén elfogy, és a láng kialszik.' },
        { q: 'Mit tegyél, ha meggyullad az olaj a serpenyőben?', options: ['Takard le fedővel, és zárd el a tűzhelyet', 'Önts rá egy pohár vizet', 'Fújd el', 'Vidd ki gyorsan a serpenyőt'], answer: 0, explain: 'A fedő elzárja az oxigént. Víztől az égő olaj szétfröccsenne, a serpenyő cipelésével pedig megégetheted magad és szétszórhatod a tüzet.' },
        { q: 'Melyik NEM az égés feltétele?', options: ['Éghető anyag', 'Oxigén', 'Napfény', 'A gyulladási hőmérséklet elérése'], answer: 2, explain: 'A tűzháromszög: éghető anyag, oxigén és megfelelő hőmérséklet. Napfény nem kell, sötétben is ég a tűz.' }
      ]
    },
    {
      id: 'atom-periodusos',
      title: 'Az atom felépítése és a periódusos rendszer',
      level: 2, minutes: 16,
      summary: 'Proton, neutron, elektron, rendszám és tömegszám, elektronhéjak, és hogyan olvassuk a periódusos rendszert.',
      tags: ['atom', 'atommag', 'proton', 'neutron', 'elektron', 'elektronburok', 'rendszám', 'tömegszám', 'izotóp', 'elektronhéj', 'vegyértékelektron', 'ion', 'periódusos rendszer', 'periódus', 'csoport', 'fém', 'nemfém', 'nemesgáz', 'alkálifém', 'halogén', 'Mengyelejev', 'vegyjel'],
      models: ['atom'],
      sections: [
        {
          title: 'Miből áll az atom?',
          text: 'Minden anyag parányi **atomokból** épül fel. Egy atom olyan kicsi, hogy egy hajszál vastagságában kb. **egymillió** fér el egymás mellett. Az atom két fő részből áll:\n\n- **atommag** a közepén: benne a **pozitív** töltésű **protonok (p⁺)** és a töltés nélküli **neutronok (n⁰)**;\n- **elektronburok** körülötte: itt mozognak a **negatív** töltésű **elektronok (e⁻)**.\n\nAz atommag nagyon kicsi, de szinte az atom teljes tömege benne van. Az elektron tömege a protonénak csak kb. 1/1840-ed része.\n\nA semleges atomban **ugyanannyi elektron van, mint proton**, ezért a töltések kiegyenlítik egymást.\n\n- **Rendszám (Z)** = a protonok száma. **Ez határozza meg, melyik elemről van szó!** Minden 6 protonos atom szén, minden 8 protonos oxigén.\n- **Tömegszám (A)** = protonok + neutronok száma.\n- Neutronok száma = `A − Z`.\n\n**Kidolgozott példa:** a nátrium rendszáma 11, tömegszáma 23. Benne van 11 proton, 11 elektron és `23 − 11 = 12` neutron.\n\nAz atom belsejét a [[atom|3D atom felfedezőben]] is körbejárhatod. Most építs atomot te magad!',
          widget: { type: 'atomepito', options: { p: 6, n: 6, e: 6 } }
        },
        {
          title: 'Elektronhéjak, izotópok és ionok',
          text: 'Az elektronok **héjakon** (energiaszinteken) helyezkednek el. Az első héjon legfeljebb **2**, a másodikon legfeljebb **8** elektron lehet (a harmadikon az első 20 elemnél szintén 8).\n\n- Oxigén (8 e⁻): 2, **6**\n- Nátrium (11 e⁻): 2, 8, **1**\n- Klór (17 e⁻): 2, 8, **7**\n\nA **legkülső héj** elektronjai a **vegyértékelektronok**: ezek határozzák meg, hogyan viselkedik az elem a kémiai reakciókban. Az atomok a **8 elektronos (nemesgáz-szerű) külső héjra** „törekszenek”.\n\n**Izotópok:** ugyanannak az elemnek lehetnek eltérő neutronszámú atomjai. A szén-12 (6 neutron) és a szén-14 (8 neutron) is szén, mert mindkettőben 6 proton van.\n\n**Ionok:** ha egy atom elektront ad le vagy vesz fel, töltése lesz.\n\n- A nátrium leadja az 1 külső elektronját: **Na⁺** (pozitív ion, kation).\n- A klór felvesz 1 elektront: **Cl⁻** (negatív ion, anion).\n\nA konyhasó (NaCl) éppen ilyen Na⁺ és Cl⁻ ionokból épül fel.',
          tip: 'Próbáld ki az atomépítőben: 11 proton, 12 neutron és 10 elektron a nátriumion (Na⁺). Ha az elektronok számát változtatod, az elem ugyanaz marad, csak a töltése változik. Ha a protonok számát, akkor másik elemet kapsz!'
        },
        {
          title: 'A periódusos rendszer',
          text: '**Dmitrij Mengyelejev** orosz kémikus 1869-ben úgy rendezte táblázatba az akkor ismert elemeket, hogy a **hasonló tulajdonságúak egymás alá** kerüljenek. Még az üres helyeket is meghagyta a később felfedezett elemeknek, és megjósolta a tulajdonságaikat!\n\nMa az elemek **rendszám szerint** követik egymást. Minden elemnek van **vegyjele**: egy nagybetű, esetleg egy kisbetűvel (H, C, O, Na, Cl, Fe, Cu). A vegyjel többnyire a latin névből jön: Fe – ferrum (vas), Cu – cuprum (réz), Na – natrium.\n\n- A **periódusok** (vízszintes sorok) száma megmutatja, **hány elektronhéja** van az atomnak.\n- A **csoportok** (függőleges oszlopok) elemeinek **ugyanannyi vegyértékelektronja** van (a főcsoportokban), ezért hasonlóan viselkednek.\n\nFontos csoportok:\n\n- **1. csoport, alkálifémek** (Li, Na, K): puha, nagyon reakcióképes fémek, vízzel hevesen reagálnak.\n- **17. csoport, halogének** (F, Cl, Br, I): reakcióképes nemfémek.\n- **18. csoport, nemesgázok** (He, Ne, Ar): telített a külső héjuk, szinte semmivel sem reagálnak.\n\nA táblázat **bal oldalán és közepén fémek**, **jobb felső részén nemfémek** vannak. Kattints az elemekre, és próbáld ki a „Találd meg!” játékot!',
          widget: { type: 'periodusos', options: { z: 8 } }
        }
      ],
      quiz: [
        { q: 'Mi határozza meg, hogy egy atom melyik elemhez tartozik?', options: ['A neutronok száma', 'Az elektronok száma', 'A protonok száma', 'A tömegszám'], answer: 2, explain: 'A rendszám, vagyis a protonok száma azonosítja az elemet. A neutronszám az izotópot, az elektronszám a töltést változtatja.' },
        { q: 'Hány neutron van a ²⁷Al (alumínium-27) atommagjában, ha a rendszáma 13?', options: ['14', '27', '40', '13'], answer: 0, explain: 'Neutronok = tömegszám − rendszám = 27 − 13 = 14.' },
        { q: 'Mit mutat meg a periódus száma?', options: ['Az atom tömegét', 'A vegyértékelektronok számát', 'A neutronok számát', 'Az elektronhéjak számát'], answer: 3, explain: 'Pl. a nátrium a 3. periódusban van, és 3 elektronhéja van (2, 8, 1).' },
        { q: 'Melyik elem nemesgáz?', options: ['Klór', 'Argon', 'Nátrium', 'Oxigén'], answer: 1, explain: 'Az argon a 18. csoportban van, a külső héja telített, ezért szinte semmivel sem reagál.' }
      ]
    },
    {
      id: 'molekulak-kepletek',
      title: 'Molekulák, képletek és egyenletek',
      level: 2, minutes: 16,
      summary: 'Hogyan olvassuk a vegyjeleket és képleteket, mi a különbség az index és az együttható között, és hogyan rendezünk egy egyszerű egyenletet.',
      tags: ['molekula', 'képlet', 'vegyjel', 'index', 'együttható', 'kémiai egyenlet', 'egyenletrendezés', 'kovalens kötés', 'ionos kötés', 'mol', 'anyagmennyiség', 'moláris tömeg', 'H₂O', 'CO₂', 'O₂'],
      sections: [
        {
          title: 'Vegyjel és képlet',
          text: 'A **vegyjel** egy elemet jelöl, és egyben **egy atomját** is: `H` = egy hidrogénatom, `O` = egy oxigénatom, `C` = egy szénatom.\n\nAz atomok kapcsolódhatnak egymáshoz, így jönnek létre a **molekulák**. A molekula összetételét a **képlet** mutatja meg. A vegyjel jobb alsó sarkában álló kis szám az **index**: megmondja, **hány atom** van abból az elemből a molekulában.\n\n- **H₂O** (víz): 2 hidrogén- és 1 oxigénatom\n- **CO₂** (szén-dioxid): 1 szén- és 2 oxigénatom\n- **O₂** (oxigéngáz): 2 oxigénatom – a levegő oxigénje molekulákban, párosával van jelen\n- **H₂** (hidrogéngáz), **N₂** (nitrogéngáz)\n- **CH₄** (metán, a földgáz fő része): 1 szén- és 4 hidrogénatom\n- **NH₃** (ammónia): 1 nitrogén- és 3 hidrogénatom\n- **NaCl** (konyhasó): nátrium- és kloridionok 1 : 1 arányban\n\nA molekulákban az atomokat **közös elektronpárok** tartják össze: ez a **kovalens kötés**. A konyhasóban viszont ellentétes töltésű ionok vonzzák egymást: ez az **ionos kötés**.',
          tip: 'Az 1-es indexet nem írjuk ki: CO₂-ban a C után nincs szám, mert 1 szénatom van.'
        },
        {
          title: 'Index és együttható',
          text: 'A képlet **előtt** álló nagy szám az **együttható**: azt mutatja meg, **hány molekula** van.\n\n- `2 H₂O` = **két** vízmolekula, ez összesen `2 · 2 = 4` hidrogénatom és `2 · 1 = 2` oxigénatom.\n- `3 CO₂` = három szén-dioxid-molekula: 3 szénatom és `3 · 2 = 6` oxigénatom.\n- `O₂` és `2 O` nem ugyanaz! Az első **egy oxigénmolekula** (két összekapcsolt atom), a második **két különálló** oxigénatom.\n\nAz index megváltoztatásával **másik anyagot** kapnál: `H₂O` víz, de `H₂O₂` már hidrogén-peroxid (fertőtlenítő, hajszőkítő). Ezért egyenletrendezéskor **az indexekhez nem nyúlunk**, csak az együtthatókat írjuk át!'
        },
        {
          title: 'Kémiai egyenletek rendezése',
          text: 'A **kémiai egyenlet** a reakció „receptje”: bal oldalon a **kiindulási anyagok**, a nyíl után a **termékek**.\n\nA szén égése: `C + O₂ → CO₂`\n\nMindkét oldalon 1 C és 2 O van: az egyenlet **rendezett**, mert az atomok száma nem változhat (tömegmegmaradás!).\n\n**Kidolgozott példa: a hidrogén égése (vízképződés).**\n\n1. Felírjuk a képleteket: `H₂ + O₂ → H₂O`\n2. Megszámoljuk: bal oldalon 2 O, jobb oldalon csak 1 O. Nem jó!\n3. A víz elé 2-t írunk: `H₂ + O₂ → 2 H₂O`. Most az O rendben van (2 = 2), de jobb oldalon 4 H, bal oldalon csak 2 H.\n4. A hidrogén elé is 2-t írunk: `2 H₂ + O₂ → 2 H₂O`\n5. Ellenőrzés: bal oldalon 4 H és 2 O, jobb oldalon 4 H és 2 O. **Kész!**\n\nTovábbi rendezett egyenletek:\n\n- A földgáz égése: `CH₄ + 2 O₂ → CO₂ + 2 H₂O`\n- A magnézium égése: `2 Mg + O₂ → 2 MgO`\n- A vas és a kén reakciója: `Fe + S → FeS`',
          tip: 'Rendezési trükk: kezdd azzal az elemmel, amelyik a legkevesebb képletben szerepel, és a végén **mindig számold meg** az összes atomot mindkét oldalon.'
        },
        {
          title: 'Az anyagmennyiség (mol)',
          text: 'Az atomok és molekulák olyan kicsik, hogy darabonként nem számolhatók. Ezért a kémikusok „csomagokban” számolnak: **1 mol** = kb. **6 · 10²³** darab részecske (ez a 6-os után 23 nulla!). Az anyagmennyiség jele **n**, egysége a **mol**.\n\nA **moláris tömeg (M)** megmutatja, hány gramm 1 mol anyag. A periódusos rendszerből olvasható ki: `H = 1 g/mol`, `C = 12 g/mol`, `O = 16 g/mol`.\n\n- `M(H₂O) = 2 · 1 + 16 = 18 g/mol`\n- `M(CO₂) = 12 + 2 · 16 = 44 g/mol`\n\nÖsszefüggés: `n = m / M`. **Kidolgozott példa:** 36 g víz hány mol? `n = 36 g / 18 g/mol = 2 mol`.',
          widget: { type: 'gyakorlas', options: { kind: 'mol', title: 'Mol-gyakorló', help: 'Használd az n = m / M és az m = n · M összefüggést!' } }
        }
      ],
      quiz: [
        { q: 'Hány oxigénatom van a 3 CO₂ jelölésben?', options: ['2', '3', '5', '6'], answer: 3, explain: 'Három molekula, mindegyikben 2 oxigénatom: 3 · 2 = 6.' },
        { q: 'Mit jelent az O₂?', options: ['Két különálló oxigénatomot', 'Egy oxigénmolekulát, amely 2 atomból áll', 'Két oxigénmolekulát', 'Egy oxigénatomot, kétszeres töltéssel'], answer: 1, explain: 'Az index (kis szám alul) a molekulán belüli atomok számát mutatja. Két különálló atom jele 2 O lenne.' },
        { q: 'Melyik a rendezett egyenlet?', options: ['2 H₂ + O₂ → 2 H₂O', 'H₂ + O₂ → H₂O', 'H₂ + O₂ → H₂O₂ + H', '2 H + O → H₂O₂'], answer: 0, explain: 'Bal oldalon 4 H és 2 O, jobb oldalon 2 · 2 = 4 H és 2 · 1 = 2 O. Az atomok száma mindkét oldalon egyenlő.' },
        { q: 'Mekkora a szén-dioxid (CO₂) moláris tömege? (C = 12, O = 16 g/mol)', options: ['28 g/mol', '40 g/mol', '44 g/mol', '32 g/mol'], answer: 2, explain: 'M = 12 + 2 · 16 = 12 + 32 = 44 g/mol.' }
      ]
    },
    {
      id: 'savak-lugok',
      title: 'Savak, lúgok, indikátorok és a közömbösítés',
      level: 2, minutes: 15,
      summary: 'Mitől savas vagy lúgos egy oldat, mit mutat a pH, hogyan működnek az indikátorok, mi történik közömbösítéskor – és hogyan dolgozz biztonságosan.',
      tags: ['sav', 'lúg', 'bázis', 'kémhatás', 'pH', 'semleges', 'indikátor', 'lakmusz', 'fenolftalein', 'univerzális indikátor', 'vöröskáposzta', 'közömbösítés', 'só', 'sósav', 'nátrium-hidroxid', 'ecet', 'savas eső', 'biztonság'],
      sections: [
        {
          title: 'Savak és lúgok a hétköznapokban',
          text: 'A **savak** savanyú ízűek (de ízleléssel **soha ne** vizsgáld!), sok fémet és a mészkövet is megtámadják. Vizes oldatukban **hidrogénionok (H⁺)** vannak.\n\n- **ecet** (ecetsav) – a salátában,\n- **citromsav** – a citromban és a vízkőoldóban,\n- **szénsav** – a szódavízben,\n- **sósav** (HCl) – a gyomrodban is van híg sósav, ez segíti az emésztést,\n- **kénsav** (H₂SO₄) – az autóakkumulátorban.\n\nA **lúgok** síkos, szappanos tapintásúak, a bőrt és a szemet súlyosan marják. Vizes oldatukban **hidroxidionok (OH⁻)** vannak.\n\n- **nátrium-hidroxid** (NaOH, „lúgkő”) – a lefolyótisztítóban,\n- **szappan**, mosószer oldata – enyhén lúgos,\n- **szódabikarbóna** oldata – gyengén lúgos,\n- **ammónia** oldata – egyes ablaktisztítókban.',
          warn: '**Biztonság mindenekelőtt!** Savakkal és lúgokkal csak **védőszemüvegben** és **gumikesztyűben**, felnőtt felügyelete mellett dolgozz. Ha bőrre vagy szembe kerül, azonnal **bő, folyó vízzel** öblítsd legalább 10–15 percig, és szólj egy felnőttnek! Hígításkor mindig a **savat öntjük a vízbe**, lassan, kevergetve – fordítva soha, mert a hirtelen felforrósodó oldat kifröccsenhet. („Előbb a víz, aztán a sav, különben a sav kifröccsen!”)'
        },
        {
          title: 'A kémhatás és a pH-skála',
          text: 'Az oldatok **kémhatása** lehet **savas**, **semleges** vagy **lúgos**. Ezt a **pH-skálán** fejezzük ki, amely általában **0-tól 14-ig** tart:\n\n- **pH < 7**: savas (minél kisebb, annál erősebben savas),\n- **pH = 7**: semleges (tiszta víz),\n- **pH > 7**: lúgos (minél nagyobb, annál erősebben lúgos).\n\nNéhány tipikus érték:\n\n- gyomorsav: kb. 1–2\n- citromlé: kb. 2\n- ecet: kb. 3\n- kóla: kb. 2,5\n- esővíz: kb. 5,6\n- desztillált víz: 7\n- vér: kb. 7,4\n- szódabikarbóna oldata: kb. 8–9\n- szappanos víz: kb. 9–10\n- lefolyótisztító: 13–14',
          tip: 'A pH-skála minden egysége **tízszeres** különbséget jelent: a pH = 3-as oldat tízszer savasabb, mint a pH = 4-es, és százszor savasabb, mint a pH = 5-ös.'
        },
        {
          title: 'Indikátorok',
          text: 'Az **indikátorok** olyan festékanyagok, amelyek **színük megváltoztatásával** jelzik a kémhatást.\n\n- **Lakmusz**: savban **piros**, lúgban **kék**.\n- **Fenolftalein**: savban és semleges oldatban **színtelen**, lúgban **lila (ciklámen)**.\n- **Univerzális indikátor** (indikátorpapír): a színskála alapján megmutatja a pH-t is: piros (erősen savas) – sárga – zöld (semleges) – kék – ibolya (erősen lúgos).\n- **Vöröskáposztalé**: házi indikátor! Savban piros, semlegesben lila, gyengén lúgos oldatban kékeszöld, erősen lúgosban sárga lesz.',
          tip: 'Otthoni kísérlet (felnőttel!): főzz ki pár levél vöröskáposztát, és a lila levet csepegtesd ecetbe, csapvízbe és szódabikarbónás vízbe. Figyeld a színeket!'
        },
        {
          title: 'Közömbösítés',
          text: 'Ha savat és lúgot megfelelő arányban összeöntünk, **kioltják egymás hatását**: ez a **közömbösítés**. Közben **só és víz** keletkezik:\n\n`sav + lúg → só + víz`\n\n`HCl + NaOH → NaCl + H₂O`\n\n(sósav + nátrium-hidroxid → konyhasó + víz)\n\nA lényeg: a sav **H⁺** ionja és a lúg **OH⁻** ionja **vízzé** egyesül: `H⁺ + OH⁻ → H₂O`.\n\nA közömbösítést **indikátorral** követhetjük: ha a lúgos, fenolftaleintől lila oldathoz savat csepegtetünk, a közömbösítés pillanatában **elszíntelenedik**.\n\nHétköznapi példák:\n\n- **gyomorégés** ellen a savlekötő tabletta közömbösíti a gyomorsav feleslegét;\n- a **savanyú talajt** mészporral javítják;\n- a **fogkrém** enyhén lúgos: segít közömbösíteni a szájban a baktériumok termelte savakat, amelyek a fogzománcot oldják.',
          warn: 'Háztartási vegyszereket **soha ne keverj össze**! A **hipó** (klórtartalmú fehérítő) és a **savas** vízkőoldó vagy WC-tisztító keverékéből mérgező **klórgáz** szabadul fel. Mindig olvasd el a címkén a veszélyjeleket!'
        }
      ],
      quiz: [
        { q: 'Milyen kémhatású az az oldat, amelynek pH-ja 10?', options: ['Erősen savas', 'Semleges', 'Lúgos', 'Gyengén savas'], answer: 2, explain: '7 felett lúgos a kémhatás. A pH = 10 például a szappanos vízre jellemző.' },
        { q: 'Milyen színű a fenolftalein lúgos oldatban?', options: ['Lila (ciklámen)', 'Színtelen', 'Sárga', 'Zöld'], answer: 0, explain: 'A fenolftalein savban és semleges oldatban színtelen, lúgban lila.' },
        { q: 'Mi keletkezik közömbösítéskor?', options: ['Lúg és szén-dioxid', 'Sav és oxigén', 'Csak hidrogéngáz', 'Só és víz'], answer: 3, explain: 'Sav + lúg → só + víz. Például HCl + NaOH → NaCl + H₂O.' },
        { q: 'Hogyan hígítjuk helyesen a tömény savat?', options: ['A vizet öntjük gyorsan a savba', 'A savat öntjük lassan, kevergetve a vízbe', 'Mindegy, csak gyorsan', 'Előbb felforraljuk'], answer: 1, explain: 'A savat öntjük a vízbe, lassan. Fordítva a kevés víz a tömény savban hirtelen felforrhat, és a sav kifröccsenhet.' }
      ]
    },
    {
      id: 'mindennapok',
      title: 'A kémia a mindennapokban és a környezetvédelem',
      level: 1, minutes: 15,
      summary: 'A víz és a levegő összetétele és tisztasága, a fémek és a korrózió, a műanyagok, valamint a szelektív gyűjtés és újrahasznosítás.',
      tags: ['víz', 'ivóvíz', 'víztisztítás', 'levegő', 'nitrogén', 'oxigén', 'szén-dioxid', 'üvegházhatás', 'légszennyezés', 'savas eső', 'fémek', 'ötvözet', 'korrózió', 'műanyag', 'mikroműanyag', 'szelektív gyűjtés', 'újrahasznosítás', 'veszélyes hulladék', 'környezetvédelem'],
      models: ['akkucella', 'napelempanel'],
      sections: [
        {
          title: 'A víz',
          text: 'A Föld felszínének kb. 71%-át víz borítja, de ennek csak kb. **2,5%-a édesvíz**, és abból is a legtöbb jég. Az iható víz tehát **kincs**.\n\nA víz (H₂O) kiváló **oldószer**: ezért a természetes vizek mindig tartalmaznak oldott anyagokat. A csapvízben oldott kalcium- és magnéziumsók okozzák a **vízkövet** (ez a víz **keménysége**).\n\nAz **ivóvíz** előállításának lépései: ülepítés, szűrés (pl. homokszűrőn), fertőtlenítés (klórral, ózonnal vagy UV-fénnyel). A szennyvizet a szennyvíztisztító telepen mechanikai, biológiai (baktériumok) és kémiai lépésekben tisztítják, mielőtt visszaengedik a folyóba.\n\nHogyan spórolhatsz? Zuhanyozz kád helyett, fogmosás közben zárd el a csapot, és javíttasd meg a csöpögő csapot (egy évben akár több ezer liter is elfolyhat!).'
        },
        {
          title: 'A levegő',
          text: 'A levegő **gázok keveréke** (homogén keverék). Száraz levegőben térfogat szerint:\n\n- **nitrogén (N₂)**: kb. 78%\n- **oxigén (O₂)**: kb. 21%\n- **argon (Ar)**: kb. 0,9%\n- **szén-dioxid (CO₂)**: kb. 0,04%\n- valamint változó mennyiségű vízgőz.\n\nA **szén-dioxid** kis mennyiségben is fontos: a növények ebből készítenek tápanyagot (fotoszintézis), és visszatartja a Föld hőjének egy részét (**üvegházhatás**). A fosszilis tüzelőanyagok (szén, kőolaj, földgáz) elégetése miatt mennyisége nő, ez **globális felmelegedéshez** vezet.\n\nTovábbi légszennyezők:\n\n- **kén-dioxid** és **nitrogén-oxidok**: a vízzel **savas esőt** okoznak, ami károsítja az erdőket, a tavakat és a szobrokat;\n- **szálló por** (szmog): a fűtésből és a forgalomból, a légzőszervekre ártalmas;\n- **szén-monoxid**: tökéletlen égésből, mérgező.\n\nA megoldás: kevesebb égetés, **megújuló energiaforrások** (pl. [[napelempanel|napelem]]), tömegközlekedés, kerékpár, és a hulladékot **soha ne égesd el** a kertben!'
        },
        {
          title: 'Fémek és műanyagok',
          text: 'A **fémek** fényesek, jól vezetik az áramot és a hőt, megmunkálhatók (kovácsolhatók, hengerelhetők).\n\n- **Vas**: a legtöbbet használt fém, főleg **acélként** (vas és kevés szén ötvözete). Hidak, autók, szerszámok. Hátránya, hogy rozsdásodik.\n- **Alumínium**: könnyű, nem rozsdásodik (vékony oxidréteg védi). Üdítős doboz, fólia, repülőgép, ablakkeret.\n- **Réz**: kiváló vezető – villanyvezetékek, vízcsövek.\n- **Ötvözetek**: fémek keverékei, jobb tulajdonságokkal: **bronz** (réz + ón), **sárgaréz** (réz + cink), **rozsdamentes acél** (vas + króm + nikkel).\n\nA fémek levegőn, nedvesség hatására tönkremennek: ez a **korrózió**. Védekezés: festés, olajozás, horganyzás, krómozás.\n\nA **műanyagok** többnyire **kőolajból** készülnek, óriási molekulákból (polimerekből) állnak. Könnyűek, olcsók, vízállók, jó szigetelők. A nagy hátrányuk, hogy a természetben **nagyon lassan bomlanak le**: egy műanyag palack akár **450 évig** is megmaradhat. Apró darabjaik, a **mikroműanyagok** már a tengerekben, a halakban és az ivóvízben is megtalálhatók.\n\nA műanyag tárgyakon a háromszögben lévő **szám (1–7)** mutatja a műanyag fajtáját, pl. **1 = PET** (üdítős palack), **2 = HDPE** (flakon), **5 = PP** (joghurtos pohár).'
        },
        {
          title: 'Szelektív gyűjtés és újrahasznosítás',
          text: 'A hulladék csökkentésének sorrendje: **1. kerüld el** (ne vegyél fölöslegesen, válassz tartós termékeket), **2. használd újra** (vászontáska, kulacs), **3. hasznosítsd újra** (szelektív gyűjtés).\n\nMagyarországon a szelektív gyűjtőedények színei általában:\n\n- **sárga**: műanyag és fém (lapítsd a palackot, öblítsd ki a dobozt!), sok helyen az italos karton is;\n- **kék**: papír (újság, karton – a zsíros pizzásdoboz nem);\n- **zöld vagy fehér**: üveg (a színes és a fehér üveg külön is lehet);\n- **barna**: komposztálható, biológiailag lebomló hulladék.\n\nAz italos palackokra és dobozokra Magyarországon **visszaváltási díjat** kell fizetni, amit a visszaváltó automatában visszakapsz.\n\nAz újrahasznosítás sok energiát takarít meg: egy alumíniumdoboz újraolvasztása kb. **95%-kal kevesebb energiát** igényel, mint az alumínium előállítása az ércből.',
          warn: '**Veszélyes hulladék** nem kerülhet a kukába! Az **elemeket és akkumulátorokat** (lásd [[akkucella|akkucella]]), a lejárt **gyógyszereket**, a festékeket, a fénycsöveket és az elektronikai hulladékot a kijelölt gyűjtőhelyekre (bolt, gyógyszertár, hulladékudvar) vidd. Ezek mérgező fémeket és vegyszereket tartalmaznak, amelyek a talajba és a vízbe jutva hosszú ideig szennyeznek.',
          widget: { type: 'parositas', options: { title: 'Melyik gyűjtőbe kerül?', count: 6, pairs: [
            ['kiöblített joghurtos pohár', 'sárga (műanyag)'], ['újságpapír', 'kék (papír)'], ['befőttesüveg', 'üveggyűjtő'],
            ['krumplihéj', 'barna (komposzt)'], ['lemerült ceruzaelem', 'elemgyűjtő'], ['lejárt gyógyszer', 'gyógyszertár'],
            ['kartondoboz', 'kék (papír)'], ['elromlott mobiltelefon', 'elektronikai hulladék']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik gáz van a legnagyobb mennyiségben a levegőben?', options: ['Oxigén', 'Szén-dioxid', 'Argon', 'Nitrogén'], answer: 3, explain: 'A levegő kb. 78%-a nitrogén, 21%-a oxigén. A szén-dioxid csak kb. 0,04%.' },
        { q: 'Mi okozza a savas esőt?', options: ['Az oxigén', 'A kén-dioxid és a nitrogén-oxidok', 'A nitrogéngáz', 'A vízgőz önmagában'], answer: 1, explain: 'A fosszilis tüzelőanyagok égéséből származó kén-dioxid és nitrogén-oxidok a vízzel savakat képeznek.' },
        { q: 'Hová kell vinni a lemerült elemet?', options: ['Elemgyűjtő dobozba (pl. boltban)', 'A kommunális szemétbe', 'A sárga kukába', 'A komposztba'], answer: 0, explain: 'Az elem veszélyes hulladék: nehézfémeket és vegyszereket tartalmaz, ezért külön gyűjtik.' },
        { q: 'Miből áll a bronz?', options: ['Vasból és szénből', 'Rézből és cinkből', 'Rézből és ónból', 'Alumíniumból és vasból'], answer: 2, explain: 'A bronz a réz és az ón ötvözete. A réz és a cink ötvözete a sárgaréz, a vas és a szén az acél.' }
      ]
    }
  ]
});
