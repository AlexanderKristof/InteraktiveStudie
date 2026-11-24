/* Tantárgy: Asztalos és faipar */
STUDIE.addSubject({
  id: 'asztalos',
  stage: 'szakma',
  title: 'Asztalos és faipar',
  icon: '🪚',
  color: '#b7791f',
  description: 'A fa mint anyag, lapok, szerszámok, gépek, kötések és felületkezelés: a bútorkészítés alapjai.',
  intro: 'Ez a tananyag az asztalosmesterség **elméletét** tanítja meg: hogyan „viselkedik” a fa, mire jók a különféle lapok, hogyan dolgozik egy asztalos kézzel és géppel, és hogyan lesz a deszkából tartós, szép bútor. A gépeken csak **betanítás után, felügyelet mellett** dolgozz: a famegmunkáló gépek a legveszélyesebb műhelygépek közé tartoznak.',
  lessons: [
    {
      id: 'fa-anyag',
      title: 'A fa mint anyag',
      level: 1, minutes: 13,
      summary: 'Szerkezet, évgyűrű, rostirány, keményfa és puhafa, nedvességtartalom, vetemedés és faanyaghibák.',
      tags: ['fa', 'évgyűrű', 'rostirány', 'geszt', 'szijács', 'keményfa', 'puhafa', 'nedvességtartalom', 'vetemedés', 'göcs', 'zsugorodás', 'bütü'],
      sections: [
        {
          title: 'A törzs felépítése',
          text: 'Ha egy fatörzset keresztben elfűrészelsz, kívülről befelé ezeket látod:\n\n- **Kéreg** és **háncs**: védi a fát, a háncs szállítja lefelé a tápanyagot.\n- **Kambium**: vékony osztódó réteg, ez növeszti a fát vastagságban.\n- **Szijács**: a fiatalabb, élő, világosabb rész. Ez szállítja a vizet, ezért nedvesebb, és könnyebben megtámadják a gombák, rovarok.\n- **Geszt**: a belső, idősebb, elhalt rész. Sok fafajnál sötétebb (tölgy, akác, dió), és tartósabb, mert a sejtjeit gesztanyagok töltik ki.\n- **Bél**: a törzs közepe, laza, gyenge rész.\n\nA fa nagyrészt hosszú, cső alakú **rostokból** (sejtekből) áll, amelyek a törzzsel párhuzamosan futnak. Ezért mondjuk, hogy a fának **rostiránya** van.'
        },
        {
          title: 'Évgyűrű és metszetek',
          text: 'A mérsékelt égövön a fa évente egy **évgyűrűt** növeszt. Tavasszal laza, világos **korai pászta** nő, nyáron tömörebb, sötétebb **késői pászta**. Az évgyűrűk megszámolásával a fa kora is megállapítható.\n\nA rönköt háromféleképpen lehet „megnézni”:\n\n- **Bütümetszet** (keresztmetszet): a rostokra merőleges, itt látszanak a körök. A bütü issza a legtöbb vizet és a legtöbb pácot.\n- **Sugármetszet** (radiális): a bélen át vágva, az évgyűrűk „állnak”, csíkosnak látszanak. Az ilyen deszka **kevésbé vetemedik**.\n- **Húrmetszet** (tangenciális): a béltől távolabb, az évgyűrűt érintve vágva, lángoló, „fladeres” mintájú. Szép, de jobban mozog.',
          tip: 'A fa **rostirányban** a legerősebb, és erre a legkönnyebb hasítani. Ezért fut a széklábak és asztallábak rostja mindig hosszában.'
        },
        {
          title: 'Keményfa és puhafa',
          text: 'Az asztalosok a fákat gyakorlati szempontból csoportosítják:\n\n- **Kemény lombos fák**: tölgy, bükk, akác, kőris, gyertyán, dió, juhar. Tömörek, kopásállók: bútor, parketta, lépcső, szerszámnyél.\n- **Lágy lombos fák**: nyár, hárs, fűz, éger. Könnyűek, könnyen megmunkálhatók: faragás, rakodólap, rétegelt lemez belseje.\n- **Fenyők** (tűlevelűek): lucfenyő, jegenyefenyő, erdeifenyő, vörösfenyő. Egyenes növésűek, olcsók: tetőszerkezet, nyílászáró, lambéria.\n\nA keménységet jól jelzi a **sűrűség** (légszáraz állapotban): a lucfenyő kb. **450 kg/m³**, a bükk kb. **700 kg/m³**, az akác kb. **750 kg/m³**. Vigyázz: a botanikai „keményfa” (lombos) és a tényleges keménység nem mindig esik egybe. A balsa lombos fa, mégis nagyon puha, a vörösfenyő tűlevelű, mégis elég kemény.'
        },
        {
          title: 'Nedvességtartalom',
          text: 'A frissen kivágott fa akár a saját száraz tömegének a felét vagy egészét is kiteheti vízben. A **nedvességtartalmat** a **teljesen száraz** fa tömegéhez viszonyítjuk:\n\n`u = (m nedves − m száraz) / m száraz · 100%`\n\nPélda: egy próbadarab 560 g, kiszárítva 500 g. `u = (560 − 500) / 500 · 100% = 12%`.\n\nTájékoztató értékek:\n\n- **friss (élő) fa**: 60–150%\n- **rosttelítettségi pont**: kb. 30%. Efölött csak a sejtüregekben van víz, ez alatt a sejtfalakból távozik, és **ekkor kezd zsugorodni** a fa.\n- **légszáraz fa** (fedett helyen, szabadban): 12–18%\n- **beltéri bútorfa** (fűtött lakás): **8–10%**\n\nMérni elektromos (ellenállásmérős) **fanedvességmérővel**, pontosan pedig szárítószekrényes módszerrel (103 °C-on tömegállandóságig szárítva) lehet.',
          warn: 'Nedves fából ne készíts beltéri bútort! A fűtött lakásban kiszárad, zsugorodik, és a kötések meglazulnak, a lapok megrepednek, elvetemednek.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás gyakorló', help: 'A nedvességtartalom, a szabászati ráhagyás és a zsugorodás is százalékszámítás. Gyakorold!' } }
        },
        {
          title: 'Zsugorodás és vetemedés',
          text: 'A fa a környezet páratartalmát követi: száraz levegőben **zsugorodik**, nedvesben **dagad**. Ezt a mozgást hívják a fa „munkájának”. A zsugorodás iránytól függ (rosttelített állapotból teljesen szárazra):\n\n- **hosszirányban**: alig, kb. 0,1–0,3%\n- **sugárirányban**: kb. 3–6%\n- **húrirányban**: kb. 6–12%, a legtöbb\n\nMivel húrirányban kb. kétszer annyit zsugorodik, mint sugárirányban, a deszka **vetemedik**:\n\n- **Teknősödés** (keresztirányú vetemedés): a húrmetszésű deszka a kéreg felőli oldalán homorúvá válik, mert az évgyűrűk „ki akarnak egyenesedni”.\n- **Íveltség** (hosszirányú görbülés): a deszka a lapja mentén meghajlik.\n- **Kardosodás**: az éle mentén görbül, mint egy kard.\n- **Csavarodás**: a deszka sarkai kifordulnak, főleg sodrott rostú fánál.',
          tip: 'Ezért készül a táblás ajtó **keretből és szabadon mozgó betéttáblából**, és ezért nem szabad egy széles tömörfa asztallapot mereven, körbe lecsavarozni: hagyni kell mozogni.'
        },
        {
          title: 'Faanyaghibák',
          text: 'A fa természetes anyag, ezért vannak „hibái”. Ezek egy része csak a szépséget rontja, más része a szilárdságot is.\n\n- **Göcs** (ágcsonk): az **ép, benőtt** göcs szoros és erős, a **kieső, fekete** vagy **korhadt** göcs gyenge pont és lyukat hagy.\n- **Repedések**: **bütürepedés** (túl gyors száradáskor a bütü repedezik), **fagyrepedés**, **bélrepedés**.\n- **Sodrott (csavart) rostúság**: a rost csavarvonalban fut, a fa csavarodik és nehezen gyalulható.\n- **Gyantatáska**: gyantával teli üreg a fenyőben.\n- **Álgeszt**: a bükk vöröses-barnás belseje, nem valódi geszt.\n- **Kékülés**: gombák okozta elszíneződés (főleg erdeifenyőn), a szilárdságot alig rontja.\n- **Korhadás**: gombák bontják a fát, puha, morzsalékos lesz. Szerkezeti célra alkalmatlan.\n- **Rovarkár**: szú, cincér, kis kerek lyukak és furatpor.',
          tip: 'A bütüket frissen fűrészelt, értékes fánál **bütüzáró** viasszal vagy festékkel szokták lekenni, hogy lassabban száradjon, és ne repedjen.'
        }
      ],
      quiz: [
        { q: 'Melyik irányban zsugorodik a legtöbbet a fa?', options: ['Hosszirányban', 'Húrirányban', 'Sugárirányban', 'Mindhárom irányban egyformán'], answer: 1, explain: 'Húrirányban kb. kétszer annyit zsugorodik, mint sugárirányban, hosszirányban pedig alig.' },
        { q: 'Mekkora legyen kb. a beltéri bútorfa nedvességtartalma?', options: ['30–40%', '18–25%', '8–10%', '0%'], answer: 2, explain: 'A fűtött lakás levegőjéhez a 8–10% körüli nedvességtartalom illik, így a fa már alig mozog.' },
        { q: 'Mi a geszt?', options: ['A fa belső, idősebb, elhalt része', 'A kéreg alatti osztódó réteg', 'A tavaszi évgyűrű-rész', 'A göcs körüli rész'], answer: 0, explain: 'A geszt a törzs belseje: sok fafajnál sötétebb és tartósabb, mint a szijács.' }
      ]
    },
    {
      id: 'faanyagok',
      title: 'Faanyagok és lapok',
      level: 1, minutes: 12,
      summary: 'Fűrészáru, rétegelt lemez, forgácslap, MDF, OSB és bútorlap, valamint az anyagszükséglet kiszámítása m²-ben és m³-ben.',
      tags: ['fűrészáru', 'deszka', 'palló', 'léc', 'gerenda', 'rétegelt lemez', 'forgácslap', 'MDF', 'OSB', 'bútorlap', 'laminált', 'furnér', 'anyagszükséglet', 'köbméter'],
      sections: [
        {
          title: 'Fűrészáru',
          text: 'A rönkből fűrészeléssel készül a **fűrészáru**. A fő fajták keresztmetszet szerint (tájékoztató méretek):\n\n- **Deszka**: lapos, kb. 8–40 mm vastag.\n- **Palló**: vastagabb deszka, kb. 40–100 mm.\n- **Léc**: kis keresztmetszetű, keskeny.\n- **Gerenda**: nagy, közel négyzetes keresztmetszetű, kb. 100 mm fölött.\n\nA **szélezetlen** (szélezés nélküli) áru oldalán még ott a kéreg íve, a **szélezett** áru szélei párhuzamosra vannak vágva. A fűrészáru lehet **nyers (fűrészelt)** vagy **gyalult**. A gyalult lécnél a névleges méret a gyalulás után kisebb lesz: egy 50 × 30 mm-es fűrészelt lécből gyalulva kb. 45 × 25 mm marad.'
        },
        {
          title: 'Rétegelt lemez és furnér',
          text: 'A **furnér** vékony (kb. 0,5–3 mm) falap, amelyet a rönkből **hámozással** vagy **késeléssel** vágnak. A szép mintájú késelt furnért bútorlapok borítására használják.\n\nA **rétegelt lemez** furnérrétegekből készül, amelyeket úgy ragasztanak össze, hogy a szomszédos rétegek rostiránya **merőleges** legyen egymásra. A rétegek száma általában **páratlan** (3, 5, 7…), így a lemez kiegyensúlyozott, nem vetemedik.\n\n- **Előnyei**: minden irányban erős, alig mozog, jól tartja a csavart.\n- **Fajták**: beltéri, vízálló ragasztású (pl. nyírfa), **filmbevonatos zsalulemez** (betonozáshoz), hajlítható rétegelt lemez.'
        },
        {
          title: 'Forgácslap, MDF, OSB',
          text: '**Forgácslap**: faforgácsból és műgyantából préselt lap. Általában háromrétegű: kívül finom, belül durvább forgács. Olcsó és méretstabil, de **vízre megdagad**, az élén gyengén tartja a csavart. A zöldes színű változat **nedvességálló** (pl. konyhapulthoz, fürdőszobába).\n\n**MDF** (közepes sűrűségű farostlemez): nagyon finom farostból préselt, homogén lap. Kb. 700–800 kg/m³ sűrűségű, a szélén is tömör, ezért **jól marható és festhető**: profilos ajtófrontok, festett bútorok. Nehéz, és a pora nagyon finom.\n\n**OSB** (irányított szálelrendezésű lap): hosszú, lapos forgácsokból, rétegenként irányítva préselik. Erős és viszonylag olcsó: **építőipar**, padló, tetődeszkázat, falburkolat. Az **OSB/3** nedves környezetben is teherhordó.',
          tip: 'A lapok ragasztójából **formaldehid** párologhat. Beltérbe csak alacsony kibocsátású (legalább **E1** osztályú) lapot használj.'
        },
        {
          title: 'Bútorlap',
          text: 'A „bútorlap” két dolgot is jelenthet:\n\n- **Laminált bútorlap** (laminált forgácslap): forgácslap, amelyet **melamingyantás dekorpapír** borít (fa-, egyszínű vagy kőmintás). A leggyakoribb vastagság **18 mm**. Szabás után az éleit **élzáróval** (ABS, PVC vagy melamin élfólia) kell lezárni, különben a nedvesség beszívódik.\n- **Tömörfa bútorlap** (ragasztott lap): keskeny tömörfa lécekből (lamellákból) ragasztott tábla. Úgy viselkedik, mint a tömörfa, de kevésbé vetemedik, és nagy méretben is kapható.\n\nA lapok szabványos táblamérete gyakran **2800 × 2070 mm** (laminált forgácslap) vagy **2440 × 1220 mm** (rétegelt lemez, OSB).',
          widget: { type: 'parositas', options: { title: 'Párosítsd az anyagot a jellemzőjével!', count: 6, pairs: [
            ['Rétegelt lemez', 'Furnérrétegek keresztirányú rostiránnyal'],
            ['Forgácslap', 'Faforgács és műgyanta, vízre megdagad'],
            ['MDF', 'Homogén farostlemez, jól marható, festhető'],
            ['OSB', 'Irányított, hosszú lapos forgácsok, építőipar'],
            ['Laminált bútorlap', 'Melamingyantás dekorpapír borítás'],
            ['Furnér', 'Hámozott vagy késelt vékony falap'],
            ['Palló', 'Kb. 40–100 mm vastag fűrészáru'],
            ['Tömörfa bútorlap', 'Lamellákból ragasztott tömörfa tábla']
          ] } }
        },
        {
          title: 'Anyagszükséglet: m² és m³',
          text: 'Az asztalos a **lapokat négyzetméterben (m²)**, a **fűrészárut köbméterben (m³)** veszi és számolja. Mindig váltsd át a mm-t **méterre**, mielőtt szorzol!\n\n**Lapanyag:** egy 2800 × 2070 mm-es tábla területe `2,8 m · 2,07 m = 5,796 m²`. Egy szekrény oldallapja 2,0 × 0,6 m, kettő kell belőle: `2 · 2,0 · 0,6 = 2,4 m²`.\n\n**Fűrészáru:** egy 4 m hosszú, 200 mm széles, 25 mm vastag deszka térfogata `4 · 0,2 · 0,025 = 0,02 m³`. Tehát **50 db** ilyen deszka tesz ki 1 m³-t.\n\n**Ráhagyás:** a szabásnál hulladék (forgács, levágás, hibás rész) keletkezik. Tömörfánál **15–30%**, lapanyagnál **10–15%** ráhagyással szokás számolni. Ha a számított szükséglet 0,4 m³, és 25% a ráhagyás: `0,4 · 1,25 = 0,5 m³`-t rendelj.',
          widget: { type: 'gyakorlas', options: { kind: 'kerulet', title: 'Terület- és térfogatgyakorló', help: 'A szabáshoz és az anyagrendeléshez terület- és térfogatszámítás kell. Gyakorold!' } }
        },
        {
          title: 'Mértékegység-váltás',
          text: 'A műhelyben a rajz **mm-ben**, az árlista **m²-ben** vagy **m³-ben** van. Jegyezd meg:\n\n- `1 m = 1000 mm`, `1 m² = 1 000 000 mm²`\n- `1 m³ = 1000 dm³ = 1000 liter`\n- `1 dm³ = 1000 cm³`\n\nPélda: 1 m³ bükk kb. 700 kg, tehát egy `0,02 m³`-es bükkdeszka kb. `0,02 · 700 = 14 kg`.',
          widget: { type: 'gyakorlas', options: { kind: 'mertekegyseg', title: 'Mértékegység-váltó gyakorló' } }
        }
      ],
      quiz: [
        { q: 'Miért páratlan a rétegek száma a rétegelt lemezben?', options: ['Mert így olcsóbb', 'Hogy a két külső réteg rostiránya azonos legyen, és ne vetemedjen', 'Mert a gép csak így tudja préselni', 'Hogy könnyebb legyen'], answer: 1, explain: 'Páratlan rétegszámnál a lemez a középső rétegre szimmetrikus, ezért kiegyensúlyozott.' },
        { q: 'Mekkora egy 2 m × 0,5 m × 0,04 m-es palló térfogata?', options: ['0,4 m³', '0,004 m³', '0,04 m³', '4 m³'], answer: 2, explain: '2 · 0,5 · 0,04 = 0,04 m³.' },
        { q: 'Melyik lapot választanád profilmarású, festett ajtófronthoz?', options: ['MDF', 'OSB', 'Forgácslap', 'Szélezetlen deszka'], answer: 0, explain: 'Az MDF homogén, a belseje is tömör, ezért szépen marható és festhető.' }
      ]
    },
    {
      id: 'keziszerszamok',
      title: 'Kéziszerszámok és mérés',
      level: 1, minutes: 13,
      summary: 'Fűrészek, gyaluk, vésők, a pontos mérés és jelölés eszközei, és hogyan élezz.',
      tags: ['fűrész', 'hátas fűrész', 'japán fűrész', 'gyalu', 'véső', 'derékszög', 'tolómérő', 'colstok', 'karcoló', 'élezés', 'fenőkő', 'rostirány'],
      sections: [
        {
          title: 'Fűrészek',
          text: 'A fűrész fogazata a vágás irányához igazodik:\n\n- **Hasító fogazat** (rostirányú vágáshoz): a fogak kis vésőként forgácsolnak.\n- **Daraboló fogazat** (rostra merőleges vágáshoz): a fogak késként vágják át a rostokat.\n\nA fogakat felváltva kissé oldalra hajlítják (**terpesztés**), így a vágat szélesebb a fűrészlapnál, és a lap nem szorul be.\n\nGyakori kézifűrészek:\n\n- **Rókafarkú fűrész**: széles lap, nagyobb darabolásokhoz.\n- **Hátas (gerinces) fűrész**: a lap tetején merevítő gerinc van, egyenes, pontos vágás kötésekhez.\n- **Japán fűrész**: **húzásra** vág, ezért a lapja nagyon vékony lehet, finom vágatot ad.\n- **Keretes fűrész**: kerettel feszített keskeny lap, hagyományos asztalosfűrész.\n- **Lombfűrész**: ívek, áttörések kivágására vékony anyagban.',
          tip: 'Mindig a jelölővonal **hulladék felőli** oldalán vágj, hogy a vágat szélessége ne a kész darabból menjen el.'
        },
        {
          title: 'Gyaluk',
          text: 'A gyalu részei: **gyalutest** és **talp**, a **gyaluvas** (penge), a **fedővas** (csapóvas), amely letöri a forgácsot, és a **szájnyílás**.\n\n- **Simítógyalu**: rövid, finom felülethez.\n- **Nagyoló gyalu**: enyhén ívelt élű vassal sok anyagot vesz le gyorsan.\n- **Hosszgyalu** (eresztőgyalu): hosszú talpa átível a mélyedéseken, ezért **egyenesít**, élek illesztéséhez.\n- **Párkánygyalu**, **horonygyalu**: lépcsők, hornyok kialakítására.\n\nA legfontosabb szabály: gyalulj **a rostiránnyal**, „a szálak mentén”. Ha a rost felfelé fut ki a felületből, szemben gyalulva a vas **kiszakítja** a fát. Ilyenkor fordítsd meg a darabot, állítsd vékonyabbra a forgácsot, szűkítsd a szájnyílást, és élezd meg a vasat.'
        },
        {
          title: 'Vésők',
          text: '- **Laposvéső** (síkvéső): általános vésés, illesztés, faragás.\n- **Lyukvéső** (hornyolóvéső): vastag, erős, csaplyukak kivéséséhez.\n- **Vájóvéső**: homorú élű, ívek faragásához.\n- **Ferde élű véső**: szűk sarkok tisztításához.\n\nA vésőt **fakalapáccsal** (nem acélkalapáccsal) ütjük. Mindig magadtól **elfelé** vezesd az élt, és a másik kezed soha ne legyen az él előtt.',
          warn: 'A tompa véső veszélyesebb, mint az éles: nagyobb erő kell hozzá, és könnyen megcsúszik. A legtöbb kézsérülés megcsúszott vésőtől vagy késtől származik.'
        },
        {
          title: 'Mérés és jelölés',
          text: '- **Mérőszalag**, **colstok** (összecsukható mérővessző): hosszméretek.\n- **Asztalos derékszög**: 90°-os szögek jelölése, ellenőrzése.\n- **Állítható szögmérő** (szögvető): tetszőleges szög átvitele, pl. 45° gérhez.\n- **Karcoló** (párhuzamvonalzó): az éllel párhuzamos vonal karcolása, pl. csapvastagság jelöléséhez.\n- **Tolómérő** (subler): vastagság, furatátmérő, mélység mérése **0,1 mm** (vagy 0,05 mm) pontossággal.\n- **Jelölőkés** vagy kemény ceruza: a kés vonala pontosabb, és a fűrész jól beleül.\n\n**A tolómérő leolvasása:** a fő skálán a **nóniusz 0-s vonala előtti** egész mm-t olvasd le, majd keresd meg, a nóniusz hányadik vonala esik egybe a fő skála egy vonalával. Ha a 0 a 23 és 24 mm közé esik, és a nóniusz 7. vonala egyezik: `23 + 7 · 0,1 = 23,7 mm`.\n\n**Derékszög ellenőrzése átlóval:** egy keret vagy korpusz akkor derékszögű, ha a két **átlója egyenlő**. Nagyobb méretben a **3-4-5 szabály** is működik: ha az egyik oldalon 3, a másikon 4 egységet mérsz, a kettő közti távolság pontosan 5 legyen.',
          tip: '„Kétszer mérj, egyszer vágj!” A vágott darabot már nem lehet visszatoldani.'
        },
        {
          title: 'Élezés',
          text: 'Az éles szerszám pontos, biztonságos és könnyebben dolgozik. A gyaluvas és a véső élét két szöggel készítik:\n\n- **Köszörülési szög**: kb. **25°**, ezt köszörűvel vagy durva kővel alakítják ki.\n- **Élezési (fenési) szög**: kb. **30°**, egy keskeny mikroél a legvégén, finom kövön.\n\nMenete vizes köszörűkövön:\n\n1. Durva kövön (kb. 1000-es szemcse) kialakítod a szöget, amíg a túloldalon egy vékony **sorja** (drótél) nem képződik.\n2. Finom kövön (kb. 4000–8000) simítod az élt.\n3. A hátoldalt (tükröt) laposan a kövön lehúzod, ezzel letöröd a sorját.\n4. Végül bőrszíjon fenheted.\n\nA kő legyen **sík**: a kivájt követ időnként síkra kell csiszolni.'
        }
      ],
      quiz: [
        { q: 'Milyen irányban gyalulj, hogy ne szakadjon ki a fa?', options: ['Mindig a rostiránnyal (a szálak mentén)', 'Mindig rostiránnyal szemben', 'Keresztben a rostokra', 'Mindegy'], answer: 0, explain: 'Szemben gyalulva a vas befeszül a rostok alá és kiszakítja őket.' },
        { q: 'Hogyan ellenőrzöd egy keret derékszögét a legegyszerűbben?', options: ['Ránézéssel', 'Megmérem a két átlót: egyenlők legyenek', 'Megmérem a súlyát', 'Vízmértékkel'], answer: 1, explain: 'Ha egy négyszög két átlója egyenlő, és a szemközti oldalai is, akkor téglalap, tehát minden sarka derékszögű.' },
        { q: 'Mit mutat a tolómérő, ha a nóniusz 0-ja 12 és 13 mm között van, és a 4. vonala egyezik?', options: ['12,04 mm', '16 mm', '12,4 mm', '13,4 mm'], answer: 2, explain: '12 mm + 4 · 0,1 mm = 12,4 mm.' }
      ]
    },
    {
      id: 'gepek',
      title: 'Gépek és munkavédelem',
      level: 2, minutes: 14,
      summary: 'Körfűrész, gyalugépek, marógép: hogyan működnek, mi a visszarúgás, és hogyan véd a burkolat, a tolófa, az elszívás és a hallásvédő.',
      tags: ['körfűrész', 'asztali körfűrész', 'gyalugép', 'egyengető gyalugép', 'vastagsági gyalugép', 'marógép', 'felsőmaró', 'visszarúgás', 'hasítóék', 'védőburkolat', 'tolófa', 'porelszívás', 'fapor', 'hallásvédelem', 'munkavédelem'],
      sections: [
        {
          title: 'Az alapszabályok minden gépnél',
          text: 'A famegmunkáló gépek kések vagy fűrészlapok percenként több ezer fordulattal forognak. Egy pillanatnyi figyelmetlenség maradandó sérülést okoz. Ezért **minden** gépnél:\n\n- Csak olyan gépen dolgozz, amelynek a kezelését **megtanultad**, és amire engedélyt kaptál.\n- **Védőszemüveg**, **hallásvédő**, szükség esetén **pormaszk** kötelező.\n- **Szűk, zárt munkaruha**, laza ruha, sál, nyaklánc, karóra, gyűrű nélkül; a hosszú hajat kösd fel.\n- Forgó szerszámú gépnél **kesztyűt ne viselj**: a kés elkaphatja és behúzza a kezed.\n- Szerszámcsere, beállítás, tisztítás előtt **áramtalaníts** (húzd ki a csatlakozót, vagy kapcsold le és biztosítsd a főkapcsolót).\n- Soha ne nyúlj a még **kifutó** (lassuló) késhez, fűrészlaphoz, és ne söpörd el kézzel a forgácsot a lap mellől.\n- Fáradtan, sietve, alkohol vagy gyógyszer hatása alatt **tilos** gépen dolgozni.',
          warn: 'A gépek védőberendezéseit (burkolat, hasítóék, hídvédő) **tilos leszerelni vagy kiiktatni**. A legtöbb súlyos ujjsérülés úgy történik, hogy valaki „csak egy vágás erejéig” levette a védőburkolatot.'
        },
        {
          title: 'Asztali körfűrész és a visszarúgás',
          text: 'Az asztali körfűrész részei: **fűrészlap**, **hasítóék** (résnyitó ék) a lap mögött, **fűrészlapvédő burkolat** felül, **párhuzamvezető** (hasításhoz), **szögvezető** vagy **tolóasztal** (daraboláshoz).\n\n**Visszarúgás (visszacsapódás):** a fűrészlap hátsó fogai **felfelé és a kezelő felé** mozognak. Ha a munkadarab beszorul a lap hátsó része és a vezető közé, vagy a vágat összezáródik, a fogak megragadják, és a darabot **óriási sebességgel visszalövik**, a kezelő kezét pedig a lap felé ránthatja.\n\nA visszarúgás okai:\n\n- hiányzó vagy rosszul beállított **hasítóék** (ez tartja nyitva a vágatot),\n- belső feszültségű fa, amely vágás közben „összecsukódik”,\n- a párhuzamvezető nem párhuzamos a lappal,\n- rövid darab darabolása a párhuzamvezető mentén (a levágott darab beszorul),\n- tompa, gyantás fűrészlap, szabadkézi (vezető nélküli) vágás.',
          warn: '- **Soha ne állj a fűrészlap síkjában**, mindig kissé oldalt.\n- A hasítóék **mindig** legyen fent, a fűrészlaphoz igazítva.\n- Ha a lap és a vezető közti távolság **12 cm-nél kisebb**, kötelező a **tolófa** (tolófa nélkül a kezed túl közel kerül a laphoz).\n- Rövid darabot ne a párhuzamvezető mentén darabolj: arra a szögvezető vagy a tolóasztal való.\n- A fűrészlap csak kb. **1 fognyira (10–15 mm)** álljon ki a munkadarab fölé.'
        },
        {
          title: 'Gyalugépek',
          text: '**Egyengető gyalugép** (abrichter): a vetemedett darab egyik **lapját** és egyik **élét** egyenesre, egymásra merőlegesre gyalulja. A késtengely az asztal két fele között forog; a nem használt részt a **hídvédő** takarja. A darabot **tolótuskóval** (tolófával) told át, sosem puszta kézzel a kés fölött.\n\n**Vastagsági gyalugép**: a már egyengetett lappal lefelé tolod be, és a gép a felső oldalt **párhuzamosra és méretre** gyalulja. A gép maga húzza be a darabot, a **visszacsapódás-gátló karmok** megakadályozzák, hogy kilökje.\n\nA két gép sorrendje: **előbb egyengetni, utána vastagolni**. A vastagsági gyalu ugyanis a vetemedést csak lemásolja, nem egyenesíti ki.',
          warn: 'Nagyon rövid (kb. 30 cm alatti) vagy vékony darabot ne gyalulj gépen. A kés elkaphatja, a kezed pedig a késtengely fölé kerülhet. Göcsös, szöges, homokos fát se: a kés kitörhet, a szilánk kirepül.'
        },
        {
          title: 'Marógépek',
          text: '- **Kézi felsőmaró**: a forgó marószerszámot a munkadarabon vezeted. Élprofilozás, horony, sablon szerinti marás.\n- **Alsómarógép** (asztali marógép): a maró az asztalból áll ki, a darabot vezeted el mellette. Ez az egyik legveszélyesebb famegmunkáló gép, csak megfelelő burkolattal, nyomófésűvel és képzett kezelő használhatja.\n\nA marónál a darabot **ellenirányban** (a szerszám forgásával szemben) kell vezetni. Ha egyirányban (sodró marással) haladsz, a maró „felmászik” a fára, és kirántja a gépet vagy a darabot a kezedből. A fordulatszámot a maró átmérőjéhez kell igazítani: **nagy átmérőjű maróhoz kisebb fordulatszám** kell.'
        },
        {
          title: 'Por és zaj: a láthatatlan veszélyek',
          text: '**Fapor:** a keményfák (tölgy, bükk) pora **rákkeltő** (az orr és az orrmelléküregek daganatait okozhatja), minden fapor allergiát, asztmát okozhat. Az MDF pora különösen finom. Ráadásul a sűrű porfelhő **porrobbanást** okozhat.\n\n- Minden porképző gépet (fűrész, gyalu, maró, csiszoló) **porelszívóra** kell kötni.\n- Csiszoláskor, söpréskor viselj **FFP2** vagy **FFP3** pormaszkot.\n- A port ne fújd le sűrített levegővel, hanem **porszívózd**.\n\n**Zaj:** a gyalugép és a körfűrész zaja gyakran **90–100 dB(A)** fölötti. **80 dB(A)** felett hallásvédőt kell biztosítani, **85 dB(A)** felett a viselése **kötelező**. A halláskárosodás fájdalommal nem jár, lassan alakul ki, és **nem gyógyul**.',
          tip: 'Fülvédő vagy füldugó? Mindkettő jó, ha végig viseled. Már néhány perc védelem nélküli gépzaj is ront az összhatáson.'
        }
      ],
      quiz: [
        { q: 'Mi akadályozza meg a körfűrésznél, hogy a vágat összezáródjon a fűrészlap mögött?', options: ['A tolófa', 'A hasítóék (résnyitó ék)', 'A szögvezető', 'A porelszívó'], answer: 1, explain: 'A hasítóék a lap mögött nyitva tartja a vágatot, így a hátsó fogak nem kapják el a fát.' },
        { q: 'Mikor kötelező a hallásvédő viselése?', options: ['70 dB(A) felett', '85 dB(A) felett', 'Csak 120 dB(A) felett', 'Soha, csak ajánlott'], answer: 1, explain: '80 dB(A) felett biztosítani kell a hallásvédőt, 85 dB(A) felett viselni is kötelező.' },
        { q: 'Miért ne viselj kesztyűt forgó szerszámú gépnél?', options: ['Mert csúszik', 'Mert a forgó szerszám elkaphatja és behúzhatja a kezed', 'Mert a kesztyű drága', 'Mert a gép nem indul el'], answer: 1, explain: 'A kesztyű anyagát megragadja a kés vagy a fűrészlap, és a kezed a szerszámba rántja.' }
      ]
    },
    {
      id: 'kotesek',
      title: 'Kötések és ragasztás',
      level: 2, minutes: 13,
      summary: 'Csapos, fecskefarkas, lamellós, dűbeles és csavaros kötések, valamint a faragasztók és a jó ragasztás szabályai.',
      tags: ['kötés', 'csapos kötés', 'csaplyuk', 'fecskefarkas', 'lamella', 'dűbel', 'tipli', 'csavar', 'konfirmát', 'excenteres összehúzó', 'ragasztó', 'PVA', 'faenyv', 'D3', 'szorító'],
      sections: [
        {
          title: 'Miért kell kötés?',
          text: 'A ragasztó akkor tart igazán, ha **hosszfelület hosszfelülettel** találkozik (pl. két deszka élét ragasztod össze). A **bütü** viszont szívja a ragasztót, és alig tart. Ezért a sarkokon, lábaknál olyan kötéseket készítünk, amelyek **növelik a ragasztott hosszfelületet**, vagy mechanikusan is összefogják a darabokat.\n\nA kötések feladat szerint:\n\n- **Szélesítő kötés**: deszkák élben, egymás mellé (tompán ragasztva, nútféderrel).\n- **Hosszabbító kötés**: rövid darabok toldása (pl. ékcsapos, „fogazott” toldás).\n- **Sarokkötés, keretkötés**: két darab szögben (csapos, fecskefarkas, dűbeles stb.).'
        },
        {
          title: 'Csapos és fecskefarkas kötés',
          text: '**Csapos kötés** (csap és csaplyuk): az egyik darab végére **csapot** fűrészelnek, a másikba **csaplyukat** vésnek vagy marnak. A klasszikus keretkötés: székek, asztalok, ajtókeretek. A csap vastagsága általában a darab vastagságának kb. **harmada**. Lehet **zárt** (vakcsap), **átmenő**, vagy **nyitott (villás) csap**.\n\n**Fecskefarkas kötés**: a fecskefarok alakú fogak csak egy irányban húzhatók ki, ezért húzásra is erős, ragasztó nélkül sem csúszik szét. Fiókok, ládák sarkán használják, és a minőségi kézműves munka jele.\n\n- **Nyitott (átmenő)** fecskefarkas: mindkét oldalon látszik.\n- **Félig takart**: elölről nem látszik, pl. fiókelőlapon.\n\nAz **ujjas (egyenes fogas) kötés** hasonló, csak egyenes fogakkal: géppel könnyebb elkészíteni.'
        },
        {
          title: 'Dűbeles és lamellós kötés',
          text: '**Dűbeles (tiplis) kötés**: mindkét darabba pontosan egymással szemben furatot fúrnak, és bordázott **bükkfa dűbelt** ragasztanak bele (gyakori méret: 8 × 40 mm). A furat legyen 1–2 mm-rel **mélyebb**, mint a dűbel fele, hogy a ragasztónak legyen helye. A pontossághoz **dűbelező sablon** vagy **jelölőcsap** kell. Gyors, olcsó, korpuszbútoroknál gyakori.\n\n**Lamellós kötés**: a **lamellózó géppel** félhold alakú hornyot marnak mindkét darabba, és préselt bükkfa **lamellát** ragasztanak bele. A lamella a ragasztótól **megduzzad**, és szorosan beül. Előnye, hogy a horony hosszabb a lamellánál, ezért a darabok oldalirányban **még igazíthatók**.'
        },
        {
          title: 'Csavaros kötés és bútorvasalatok',
          text: '- **Facsavar**, **forgácslapcsavar**: keményfába és a lap élébe **előfúrni** kell (a csavar magátmérőjével), különben a fa reped. A fejet **süllyesztve** a felület alá húzzuk.\n- **Konfirmát (bútorcsavar)**: vastag, durva menetű csavar laminált bútorlaphoz, lépcsős fúróval előfúrt furatba.\n- **Excenteres összehúzó** (pl. minifix): rejtett, **szétszedhető** kötés lapbútorokhoz. Elfordítva összehúzza a lapokat.\n\nA csavaros kötés előnye, hogy **szétszedhető**, a ragasztott kötésé, hogy **merev és tartós**. Gyakran kombinálják őket: dűbel a pozicionáláshoz, csavar vagy összehúzó a szorításhoz.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a kötést a felhasználásával!', count: 6, pairs: [
            ['Csapos kötés', 'Szék- és asztalkeret, ajtókeret'],
            ['Fecskefarkas kötés', 'Fiók sarka, húzásra is erős'],
            ['Lamellós kötés', 'Gyors, oldalirányban igazítható lapkötés'],
            ['Dűbeles kötés', 'Bükkfa csap fúrt furatban'],
            ['Excenteres összehúzó', 'Szétszedhető lapbútor'],
            ['Konfirmát csavar', 'Laminált bútorlap korpusza'],
            ['Nútféderes kötés', 'Deszkák szélesítése élben']
          ] } }
        },
        {
          title: 'Faragasztók',
          text: '- **PVAc diszperziós ragasztó** („fehér enyv”, faenyv): a leggyakoribb. Vízzel hígítható, átlátszóra szárad. Vízállósága szerint: **D2** (beltér, száraz), **D3** (beltér, időnként nedves, pl. konyha; fedett kültér), **D4** (erős nedvesség, kültér).\n- **Poliuretán (PUR) ragasztó**: a nedvességtől köt, közben **habzik**, vízálló. Kesztyűben dolgozz vele!\n- **Epoxi**: kétkomponensű, hézagot is kitölt, nagyon erős, vízálló.\n- **Csontenyv (bőrenyv)**: hagyományos, melegen felvitt, visszaoldható. **Restauráláshoz** ideális.\n- **Kontaktragasztó**: mindkét felületre felkenik, kis száradás után összenyomják. Laminát, furnér felragasztásához.\n- **Ömledékragasztó** (hot-melt): élzárógépekben az élfólia felragasztásához.'
        },
        {
          title: 'A jó ragasztás szabályai',
          text: '1. A felületek legyenek **tiszták, zsírmentesek, frissen megmunkáltak**, és **pontosan illeszkedjenek**. A ragasztó nem hézagkitöltő (kivéve az epoxit).\n2. A fa legyen **száraz** (8–12%), a műhely ne legyen hideg: a PVAc ragasztó kb. **+5–10 °C** alatt nem köt rendesen.\n3. Vékonyan, egyenletesen kend fel, és tartsd be a **nyitott időt** (ennyi idő alatt össze kell állítani).\n4. **Szoríts**: pillanatszorítóval, csavarszorítóval, a **présidőt** a ragasztó dobozáról olvasd le. Ne szoríts túl erősen, mert kinyomod a ragasztót a kötésből („éhes kötés”).\n5. Ellenőrizd a **derékszöget** (átlómérés), amíg a ragasztó még nem kötött meg.\n6. A kifolyó ragasztót **töröld le nedves ronggyal**, vagy hagyd gélesedni és kapard le. A beszáradt ragasztós folton a **pác és az olaj nem fog**, világos folt marad.',
          tip: 'Bütüfelület ragasztásánál előbb egy vékony, hígított ragasztóréteggel „itasd át” a bütüt, és csak utána ragassz.'
        }
      ],
      quiz: [
        { q: 'Miért erős húzásra is a fecskefarkas kötés?', options: ['Mert csavarral rögzítik', 'Mert a ferde fogak csak egy irányban húzhatók ki', 'Mert különleges ragasztó kell hozzá', 'Mert mindig keményfából készül'], answer: 1, explain: 'A fecskefarok alak miatt a kötés a húzás irányában mechanikusan is reteszel.' },
        { q: 'Melyik ragasztót választanád konyhai, időnként nedves helyre kerülő bútorhoz?', options: ['D1-es papírragasztó', 'D3-as PVAc faragasztó', 'Ragasztószalag', 'Csontenyv'], answer: 1, explain: 'A D3-as faenyv időnként nedves beltéri környezetet is kibír.' },
        { q: 'Miért nem fog a pác azon a helyen, ahol a ragasztó kifolyt és beszáradt?', options: ['Mert a ragasztó lezárja a fa pórusait', 'Mert a ragasztó kifehéríti a fát', 'Mert a pác reagál a ragasztóval és elpárolog', 'Fog, ez csak tévhit'], answer: 0, explain: 'A beszáradt ragasztóréteg nem szívja be a pácot, ezért ott világos folt marad. Ezért kell a kifolyó ragasztót gondosan eltávolítani.' }
      ]
    },
    {
      id: 'feluletkezeles',
      title: 'Felületkezelés és szerelés',
      level: 2, minutes: 14,
      summary: 'Csiszolás, pácolás, lakkozás, olajozás, és a bútor összeszerelése vasalatokkal.',
      tags: ['csiszolás', 'csiszolópapír', 'szemcseméret', 'pác', 'lakk', 'olaj', 'viasz', 'lenolaj', 'öngyulladás', 'pánt', 'fazékpánt', 'fiókvasalat', 'vasalat', 'bútorszerelés', 'felborulásgátló'],
      sections: [
        {
          title: 'Csiszolás',
          text: 'A felületkezelés minősége a **csiszolásnál** dől el: a lakk minden karcot kiemel.\n\n- A csiszolópapír **szemcsemérete (P-szám)**: minél nagyobb a szám, annál finomabb. **P80** durva (nagyolás), **P120** közepes, **P180** finom (pác és lakk alá), **P240–P320** a lakkrétegek közti köztes csiszoláshoz.\n- **Fokozatosan** haladj, legfeljebb egy-egy fokozatot ugorj át, különben a durva papír karcait a finom már nem tünteti el.\n- Kézzel mindig **rostirányban** csiszolj, csiszolótuskóval. A rostra keresztbe húzott karc pác után csúnyán kiemelkedik.\n- Gépi csiszoláshoz **excentercsiszolót** használj porelszívással.\n\n**Szálfelállítás:** a vizes pác és a vizes lakk „felborzolja” a fa felületét. Ezért pácolás előtt a felületet **nedves szivaccsal áttörlik**, megszárítják, és finom papírral (P180–P240) a felállt szálakat lecsiszolják.'
        },
        {
          title: 'Pácolás',
          text: 'A **pác** a fát **színezi**, de nem véd: utána mindig lakk, olaj vagy viasz kell rá.\n\n- **Vizes pác**: mélyen beszívódik, szép, egyenletes, de felállítja a szálakat.\n- **Oldószeres (spirituszos) pác**: gyorsan szárad, kevésbé emeli a szálat, de foltosodhat.\n\nA bütü sokkal több pácot szív be, ezért **sötétebb** lesz. A puhafák (fenyő) gyakran **foltosan** pácolódnak. Mindkét esetben segít egy előzetes, híg **alapozó** (pácelőkészítő) réteg.',
          tip: 'Mindig próbálj ki a pácot egy **hulladékdarabon** ugyanabból a fából, ugyanúgy csiszolva. A dobozon látott szín csak tájékoztató.'
        },
        {
          title: 'Lakkozás és olajozás',
          text: '**Lakk**: kemény, zárt filmréteget képez a felületen.\n\n- **Vizes bázisú (akril) lakk**: szagtalanabb, környezetkímélőbb, nem sárgul.\n- **Oldószeres poliuretán (PUR) lakk**: nagyon kopásálló, asztallapra, padlóra.\n- **Nitrocellulóz lakk**: gyorsan szárad, könnyen javítható, kevésbé ellenálló.\n\nA lakkozás menete: alapozó vagy töltő réteg → száradás → **köztes csiszolás** (P240–P320) → portalanítás → fedőréteg(ek). Több vékony réteg mindig jobb, mint egy vastag. Ideális körülmény: **18–25 °C**, mérsékelt páratartalom, por- és huzatmentes hely.\n\n**Olaj** (lenolaj, tungolaj, keményviaszolaj): beszívódik a fába, kiemeli a rajzolatát, a felület természetes tapintású marad. Kevésbé kopásálló, de **helyben javítható**: nem kell az egész lapot lecsiszolni, csak újraolajozni.',
          warn: '**Az olajos rongy öngyulladhat!** A lenolaj és a keményviaszolaj száradás közben hőt termel, és a gyűrött, összegyűjtött rongy órák alatt **magától lángra kaphat**. Az olajos rongyot, csiszolóport **kiterítve, kültéren** szárítsd meg, vagy **vízzel teli, fedeles fémdobozban** tárold. Soha ne dobd a műhelyi szemetesbe!'
        },
        {
          title: 'Bútorvasalatok',
          text: '- **Fazékpánt** (kivetőpánt): a pántfészek 35 mm-es furatba kerül az ajtóban. Három irányban **állítható** (oldalt, magasságban, mélységben), így az ajtó pontosan beállítható. Az ajtó helyzete szerint lehet **ráütődő**, **félig ráütődő** vagy **beütődő**.\n- **Fiókvasalat**: görgős sín (olcsó), **golyós teleszkópos sín** (teljesen kihúzható, nagy terhelés), **rejtett fiókcsúszó** (alul, láthatatlanul). A **csillapított záródás** (soft-close) halkan húzza be a fiókot.\n- **Polctartó**: a korpusz oldalában 5 mm-es furatsor, gyakran **32 mm-es** osztással (a lapbútorgyártás szabványos raszter).\n- Fogantyúk, gombok, bútorlábak, szintezőlábak, bútorzárak.'
        },
        {
          title: 'Összeszerelés lépésről lépésre',
          text: '1. Nézd át a **szerelési útmutatót** és az **alkatrészlistát**, válogasd szét a vasalatokat.\n2. Szereld elő a vasalatokat (pántfészkek, sínek, összehúzók) a még különálló lapokra: így kényelmesebb.\n3. Állítsd össze a **korpuszt** puha alátéten (karton, takaró), hogy ne karcolódjon.\n4. Rögzítsd a **hátfalat**: ez merevíti a szekrényt. Előtte **átlóméréssel** állítsd derékszögbe!\n5. Állítsd a helyére, szintezd ki.\n6. Akaszd fel az ajtókat, szereld be a fiókokat, és **állítsd be a réseket** (egyenletes, kb. 2–3 mm).',
          warn: 'A magas szekrényeket, polcokat, komódokat **falhoz kell rögzíteni** felborulás ellen! Ha egy gyerek felmászik a kihúzott fiókokra, a bútor rá dőlhet. Ez évente halálos baleseteket okoz.'
        }
      ],
      quiz: [
        { q: 'Melyik a legfinomabb csiszolópapír a felsoroltak közül?', options: ['P80', 'P120', 'P180', 'P320'], answer: 3, explain: 'Minél nagyobb a P-szám, annál finomabb a szemcse.' },
        { q: 'Hogyan tárold a lenolajos rongyot munka után?', options: ['Összegyűrve a szemetesben', 'Kiterítve kültéren szárítva, vagy vízzel teli, zárt fémdobozban', 'Műanyag zacskóban a polcon', 'A radiátoron'], answer: 1, explain: 'Az olajos rongy száradás közben melegszik, és összegyűrve magától meggyulladhat.' },
        { q: 'Miért kell a magas szekrényt a falhoz rögzíteni?', options: ['Hogy ne kopjon a padló', 'Felborulás ellen', 'Hogy jobban záródjanak az ajtók', 'Csak esztétikai okból'], answer: 1, explain: 'A kihúzott fiókok vagy egy felmászó gyerek súlya alatt a szabadon álló magas bútor felborulhat.' }
      ]
    }
  ]
});

/* Hibakereső döntési fák (formátum: js/hibakereses.js fejléce) */
STUDIE.addTrouble({
  id: 'asztalos-kiszakad',
  title: 'Kiszakad, szálkásodik a fa vágáskor vagy gyaluláskor',
  lessons: ['asztalos/keziszerszamok', 'asztalos/gepek'],
  intro: 'Haladj végig a kérdéseken, ahogy egy tapasztalt asztalos tenné. **Beállítás, szerszámcsere és vizsgálat előtt mindig áramtalanítsd a gépet**, és soha ne nyúlj a kifutó fűrészlaphoz vagy késhez!',
  start: 'mivel',
  nodes: {
    mivel: { q: 'Mivel dolgozol, amikor a fa kiszakad?', answers: [
      { t: 'Körfűrésszel vagy dekopírfűrésszel vágok', next: 'hol' },
      { t: 'Kézi gyaluval vagy gyalugéppel gyalulok', next: 'gyalu_irany' },
      { t: 'Felsőmaróval marok', next: 'maro' }] },
    hol: { q: 'Hol szakad ki a fa?', check: 'Nézd meg a vágott darabot: a vágat melyik oldalán, és a vágás elején vagy végén szálkás?', answers: [
      { t: 'A vágás végén, a „kilépő” sarokban, letörik egy darab', next: 'r_kilepes' },
      { t: 'A felső vagy az alsó felület szélén, a vágat mentén végig szálkás', next: 'lap_oldal' },
      { t: 'A laminált bútorlap bevonata pattog le a vágat mentén', next: 'r_laminalt' }] },
    lap_oldal: { q: 'Milyen állapotú a fűrészlap, és milyen fogazatú?', check: 'Áramtalaníts, és nézd meg a lapot: tompák, letöredezettek a fogak, gyantás a lap? Hasító (kevés, nagy fogú) vagy finom daraboló lap van fent?', answers: [
      { t: 'Gyantás, tompa vagy letört fogú', next: 'r_tompa_lap' },
      { t: 'Ép, de hasító lappal vágok keresztben (darabolok)', next: 'r_rossz_lap' },
      { t: 'Ép, finom lap, mégis szálkás', next: 'kiallas' }] },
    kiallas: { q: 'Mennyire áll ki a fűrészlap a munkadarab fölé, és mennyire gyorsan tolod?', answers: [
      { t: 'Alig áll ki, vagy nagyon gyorsan, erőből tolom', next: 'r_kiallas' },
      { t: 'Kb. egy fognyira áll ki, egyenletesen tolom', next: 'r_alatet' }] },
    gyalu_irany: { q: 'A darab egyik irányában gyalulva szép, a másikban szakad?', check: 'Fordítsd meg a darabot, és próbálj egy rövid szakaszt ellenkező irányban gyalulni.', answers: [
      { t: 'Igen, megfordítva rendben van', next: 'r_rostirany' },
      { t: 'Mindkét irányban szakad', next: 'gyalu_vas' }] },
    gyalu_vas: { q: 'Éles a gyaluvas (vagy a gépi gyalukések)?', check: 'Kézi gyalunál nézd meg az élt fény felé tartva: a tompa él fényesen csillog. Gépnél áramtalaníts, és nézd meg a késeket: csorbák, lekerekedett él?', answers: [
      { t: 'Tompa vagy csorba', next: 'r_tompa_gyalu' },
      { t: 'Éles, mégis szakad', next: 'gocs' }] },
    gocs: { q: 'Göcsös, sodrott rostú vagy hullámos rostú (pl. „lángolt”) a fa a szakadás helyén?', answers: [
      { t: 'Igen, a rost össze-vissza fut', next: 'r_sodrott' },
      { t: 'Nem, egyenes rostú', next: 'r_forgacs' }] },
    maro: { q: 'Milyen irányban vezeted a marót a darabon?', check: 'Felülről nézve a felsőmaró szerszáma az óramutató járásával megegyezően forog. A gépet úgy kell vezetni, hogy a szerszám **szemben** forogjon a haladással (ellenirányú marás).', answers: [
      { t: 'Nem tudom, vagy a forgással egy irányban haladok', next: 'r_maro_irany' },
      { t: 'Ellenirányban, mégis kiszakad, főleg a sarkoknál', next: 'r_maro_sarok' }] },
    r_kilepes: { result: 'Kitörés a vágás végén (a fogak kilépésénél)', fix: 'A vágás végén a rostokat már semmi nem támasztja, ezért letörnek.\n- Tegyél a darab mögé egy **hulladék támasztólécet** (a szögvezetőre vagy a tolóasztalra), és azzal együtt vágd át.\n- A vágás végén lassíts.\n- Bütüt keresztben gyalulva előbb a túlsó sarkot **törd le (fazettázd)**, vagy gyalulj a két szélről befelé.', level: 'ok' },
    r_laminalt: { result: 'Lepattan a laminált bevonat a vágat szélén', fix: 'A laminált lap kemény bevonata ott pattog le, ahol a fogak **kilépnek** az anyagból.\n- Asztali körfűrésznél a **szép oldal felfelé**, kézi körfűrésznél és merülőfűrésznél **lefelé** nézzen.\n- Használj sok fogú, laminált lapra való (trapéz-lapos fogazatú) fűrészlapot.\n- Ragassz krepp-szalagot a vágat helyére, vagy vágj **sínes merülőfűrésszel**, amelynek a sínje leszorítja a bevonatot.\n- Profi megoldás: **elővágó (előkarcoló) fűrészlapos** formatizáló körfűrész.', level: 'ok' },
    r_tompa_lap: { result: 'Tompa vagy gyantás fűrészlap', fix: 'A tompa lap tépi a rostokat, melegszik, és növeli a **visszarúgás** veszélyét is.\n- A gyantás lapot (áramtalanítás után, levéve) gyantaoldóval tisztítsd meg.\n- A tompa keményfém lapot élesítő szakműhelyben élezteted.\n- A letört fogú lapot cseréld ki.', level: 'warn' },
    r_rossz_lap: { result: 'Nem a vágáshoz illő fogazat', fix: 'A kevés, nagy fogú **hasító** lap rostirányú vágásra való. Keresztvágáshoz (daraboláshoz) és lapanyaghoz **több, finomabb fogú daraboló** vagy univerzális lapot használj. A lapcserét csak áramtalanított gépen végezd, és utána állítsd be újra a hasítóéket.', level: 'ok' },
    r_kiallas: { result: 'Rossz lapkiállás vagy túl gyors előtolás', fix: 'Ha a lap alig áll ki, a fogak laposan, „sodorva” lépnek ki a felső felületen, és szakítanak. Állítsd a lapot kb. **egy fognyira (10–15 mm)** a darab fölé. Told egyenletesen, erőltetés nélkül, a vágás vége felé **tolófával**.', level: 'ok' },
    r_alatet: { result: 'Az alsó oldalon nincs alátámasztás', fix: 'A lap körüli **asztalbetét** rése túl széles lehet, így az alsó rostokat semmi sem támasztja. Használj **nullrés-betétet** (szorosan a laphoz illeszkedő betétet), vagy vágj egy alá tett hulladéklappal együtt. A betétcserét áramtalanított gépen végezd.', level: 'ok' },
    r_rostirany: { result: 'Rostiránnyal szemben gyalultál', fix: 'Nézd meg a darab élén, merre futnak ki a rostok, és mindig úgy gyalulj, hogy a rostok **„lefelé” fussanak ki** a haladási iránnyal (mint amikor egy kutya szőrét simogatod). Gyalugépen is fordítsd meg a darabot.', level: 'ok' },
    r_tompa_gyalu: { result: 'Tompa gyaluvas vagy gyalukés', fix: 'Kézi gyalunál élezd meg a vasat: kb. **25°** köszörülési és **30°** élezési szög, finom kő, a sorja lehúzása.\n\nGépnél a késcserét vagy -élezést áramtalanított, biztosított gépen, a gyártó utasítása szerint végezd, a késeket pontosan egy magasságba állítva. Ha bizonytalan vagy, kérj segítséget, mert a rosszul rögzített kés kirepülhet.', level: 'warn' },
    r_sodrott: { result: 'Sodrott, göcsös vagy hullámos rostú fa', fix: 'Ennél a fánál nincs „jó” irány, ezért:\n- vegyél **nagyon vékony forgácsot**,\n- szűkítsd a gyalu **szájnyílását**, állítsd a **fedővasat** közel az élhez,\n- élezd meg a vasat a lehető legjobbra,\n- a végső simítást **kaparóval (ciklinggel)** vagy csiszolással végezd.', level: 'ok' },
    r_forgacs: { result: 'Túl vastag forgács vagy túl tág szájnyílás', fix: 'Állítsd vékonyabbra a forgácsot, és szűkítsd a szájnyílást, hogy a fedővas előbb törje le a forgácsot, mint hogy az előre hasadjon. Gyalugépen csökkentsd a fogásmélységet, és lassabban told a darabot.', level: 'ok' },
    r_maro_irany: { result: 'Sodró (egyirányú) marás', fix: 'Ha a forgásiránnyal megegyezően haladsz, a maró „felmászik” a fára, szakít, és **kirántja** a gépet a kezedből. Mindig **ellenirányban** vezesd: külső élen haladj az óramutató járásával **ellentétesen**, belső kivágásban azzal megegyezően. Nagy fogásmélységet több menetben vegyél le.', level: 'warn' },
    r_maro_sarok: { result: 'Kitörés a bütü sarkainál', fix: '- Előbb a **bütü** éleket mard körbe, utána a hosszéleket: a hosszél marása elviszi a bütü végén kitört részt.\n- Fogj be a darab végéhez egy **támasztólécet**.\n- Használj éles marót, és állítsd a fordulatszámot a maró átmérőjéhez.', level: 'ok' }
  }
});

STUDIE.addTrouble({
  id: 'asztalos-lakkhiba',
  title: 'Repedezik, leválik vagy hibás lesz a lakk',
  lessons: ['asztalos/feluletkezeles'],
  intro: 'Keresd meg a hibát a tünet alapján! Lakk lecsiszolásakor viselj **pormaszkot**, oldószeres anyaggal csak jól szellőző helyen dolgozz, és az **olajos, lakkos rongyot** kiterítve szárítsd vagy vízzel teli fémdobozban tárold, mert öngyulladhat!',
  start: 'tunet',
  nodes: {
    tunet: { q: 'Mit látsz a lakkozott felületen?', answers: [
      { t: 'A lakk lepattog, lehámlik, „lefejthető” a fáról', next: 'tapadas' },
      { t: 'Finom repedések hálózata jelent meg rajta', next: 'repedes' },
      { t: 'Hólyagos vagy apró kráteres lett', next: 'holyag' },
      { t: 'Tejesen fehér, homályos foltok vannak rajta', next: 'r_feheredes' },
      { t: 'Függőleges felületen megfolyt, „függönyös”', next: 'r_megfolyas' }] },
    tapadas: { q: 'Hogyan készült a felület a lakkozás előtt?', check: 'Gondold végig: csiszoltad-e a rétegek között, portalanítottad-e, és milyen anyag volt alatta (olaj, viasz, régi lakk, szilikonos tisztítószer)?', answers: [
      { t: 'Olajos, viaszos vagy szilikonos volt a felület', next: 'r_zsiros' },
      { t: 'A rétegek közt nem csiszoltam, vagy túl sokat vártam a rétegek között', next: 'r_koztes' },
      { t: 'Más típusú lakk volt alatta (pl. vizes lakk oldószeresen vagy fordítva)', next: 'r_kompatibilis' },
      { t: 'Tisztán, csiszolva készítettem elő', next: 'nedves_fa' }] },
    nedves_fa: { q: 'Milyen nedves volt a fa, és hol van a bútor?', check: 'Mérd meg fanedvességmérővel, és nézd meg, nem éri-e víz, pára, közvetlen napfény.', answers: [
      { t: 'A fa nedves volt (12–15% felett), vagy a bútor kültéren, vizes helyen van', next: 'r_nedves' },
      { t: 'Száraz fa, beltérben van', next: 'r_kompatibilis' }] },
    repedes: { q: 'Milyen vastag a lakkréteg, és mozog-e alatta a fa?', check: 'Nézd meg, hogy a repedések a fa rostjával párhuzamosak-e (a fa mozgása), vagy szabálytalan hálót alkotnak (a lakk maga).', answers: [
      { t: 'Vastagon, egy-két rétegben vittem fel', next: 'r_vastag' },
      { t: 'A repedések a rosttal párhuzamosak, a bútor kültéren vagy napos ablakban áll', next: 'r_kulter' },
      { t: 'Régi bútor, sok éve lakkozva', next: 'r_oregedes' }] },
    holyag: { q: 'Milyen körülmények között lakkoztál?', answers: [
      { t: 'Melegben, napon, vagy fűtőtest közelében', next: 'r_holyag_hoseg' },
      { t: 'Hengerrel vagy erősen rázott lakkal, gyorsan', next: 'r_buborek' },
      { t: 'Apró kráterek (halszemek), mintha a lakk nem akarna ott megmaradni', next: 'r_zsiros' }] },
    r_zsiros: { result: 'Szennyezett (zsíros, szilikonos, viaszos) felület', fix: 'A lakk nem tud tapadni, vagy apró „halszem” kráterek képződnek.\n- Csiszold le a hibás lakkot a fáig.\n- Az olajos, viaszos felületet a gyártó szerint zsírtalanítsd (pl. hígítóval), és csak utána csiszold, mert a csiszolópapír beledörzsöli a szennyeződést.\n- A műhelyben ne használj **szilikonos** sprayt, bútorápolót a lakkozás közelében.', level: 'warn' },
    r_koztes: { result: 'Hiányzó köztes csiszolás', fix: 'A már megszáradt lakkréteghez a következő réteg csak akkor tapad jól, ha a felületét **P240–P320** papírral mattra csiszolod, majd portalanítod. Ha a gyártó ad „átfesthetőségi időt” (pl. 2–24 óra között csiszolás nélkül is lehet), azt tartsd be.', level: 'ok' },
    r_kompatibilis: { result: 'Egymással nem összeférő anyagok', fix: 'Egy rendszeren belül maradj: **ugyanannak a gyártónak** az alapozóját, pácát és lakkját használd, és olvasd el, mi mire vihető fel. Oldószeres lakk feloldhatja az alatta lévő réteget, vizes lakk pedig nem tapad zsíros, olajos alapon. Ha nem biztos, készíts próbát egy rejtett helyen.', level: 'warn' },
    r_nedves: { result: 'Nedves fa vagy nedvességnek kitett bútor', fix: 'A nedves fa száradáskor zsugorodik, a víz pedig a lakk alá jutva felválasztja azt.\n- Lakkozás előtt a fa legyen **8–12%**-os.\n- Kültérre **kültéri**, rugalmas, UV-álló bevonatot (vékonylazúr, kültéri olaj) válassz, ne merev bútorlakkot.\n- A bütüket és a vízszintes felületeket gondosan zárd le.', level: 'warn' },
    r_vastag: { result: 'Túl vastag lakkréteg', fix: 'A vastag lakk száradás közben feszül, és megrepedezik (különösen a nitrolakk). Csiszold le a hibás részt, és **több vékony rétegben** vidd fel újra, a rétegek közt kiszárítva és köztesen csiszolva.', level: 'ok' },
    r_kulter: { result: 'A fa mozgása és a napfény (UV) repesztette meg', fix: 'A merev beltéri lakk nem bírja követni a fa dagadását, zsugorodását, az UV pedig rideggé teszi. Kültérre és napos helyre **rugalmas, UV-szűrős** bevonatot (kültéri lazúr, olaj) használj, és tervezd be a rendszeres felújítást.', level: 'warn' },
    r_oregedes: { result: 'Elöregedett lakkréteg', fix: 'A régi lakk idővel rideggé válik és megrepedezik. Értékes, régi bútornál ezt nem feltétlenül kell eltüntetni (patina). Felújításnál a régi réteget óvatosan el kell távolítani: értékes bútort **restaurátorra** bízz, mert a régi bevonat lehet sellak vagy olyan lakk, amit szakszerűen kell kezelni.', level: 'ok', pro: true },
    r_feheredes: { result: 'Nedvesség okozta fehéredés', fix: 'Ha párás, hideg időben lakkoztál, a nedvesség bezáródott a lakkba. Ha forró bögre vagy víz okozta, a lakk felső rétege vett fel nedvességet.\n- Enyhe esetben magától eltűnhet, vagy finom polírozással javítható.\n- Súlyosabb esetben csiszold le és lakkozd újra, **18–25 °C-on**, mérsékelt páratartalom mellett.', level: 'ok' },
    r_megfolyas: { result: 'Megfolyás (túl sok lakk függőleges felületen)', fix: 'Vékonyabb rétegeket vigyél fel, és ha lehet, a darabot **vízszintesen** lakkozd. A megszáradt folyást éles kaparóval vagy csiszolótuskóval síkba csiszolhatod, majd egy vékony fedőréteggel javíthatod.', level: 'ok' },
    r_holyag_hoseg: { result: 'Túl gyors felületi száradás melegben', fix: 'Napon vagy melegben a lakk teteje bőrösödik, alatta az oldószer gőze buborékot fúj. Árnyékban, **18–25 °C-on** lakkozz, és a frissen lakkozott darabot ne tedd fűtőtest mellé.', level: 'ok' },
    r_buborek: { result: 'A felvitel közben bekevert légbuborékok', fix: 'A lakkot ne rázd, csak **keverd**. Jó minőségű ecsetet vagy lakkhengert használj, ne húzogasd túl, és az utolsó húzás rostirányban, egy irányban legyen. Szükség esetén hígíts a gyártó előírása szerint.', level: 'ok' }
  }
});
