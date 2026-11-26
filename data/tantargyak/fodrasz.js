/* Tantárgy: Fodrász és kozmetikus */
STUDIE.addSubject({
  id: 'fodrasz',
  stage: 'szakma',
  title: 'Fodrász és kozmetikus',
  icon: '💇',
  color: '#d6409f',
  description: 'Hajszerkezet, a hajfestés kémiája, vágástechnikák, bőrtípusok, allergiateszt, higiénia, vendégkezelés és a szalon mint vállalkozás.',
  intro: 'Ez a tananyag a fodrász- és kozmetikusszakma **elméleti alapjait** tanítja meg: miből áll a haj és a bőr, mi történik kémiailag festéskor, hogyan dolgozik a jó szakember biztonságosan és tisztán. A szépségipar vegyszerekkel, éles eszközökkel és a vendég bőrével dolgozik, ezért a felelősség nagy. **Ez a tananyag nem helyettesíti a szakmai képzést és a gyakorlati oktatást.** Vegyszert mindig a gyártó használati utasítása és biztonsági adatlapja szerint használj, a higiéniai szabályokban pedig a népegészségügyi hatóság (NNGYK, kormányhivatal) előírásai és a szalon saját rendje az irányadó.',
  lessons: [
    {
      id: 'hajszerkezet',
      title: 'A haj felépítése és növekedése',
      level: 1, minutes: 12,
      summary: 'Kutikula, kéreg és velő; keratin és a hajat összetartó kötések; a növekedési ciklus és a haj pH-ja.',
      tags: ['haj', 'hajszál', 'kutikula', 'kéreg', 'velő', 'keratin', 'diszulfidkötés', 'hidrogénkötés', 'sóhíd', 'hagymás hajgyökér', 'tüsző', 'anagén', 'katagén', 'telogén', 'porozitás', 'pH', 'melanin'],
      sections: [
        {
          title: 'A hajszál három rétege',
          text: 'A hajszál látható része, a **hajszár** már nem él: elszarusodott sejtekből áll. Keresztmetszetben három rétege van:\n\n- **Kutikula** (hámréteg, pikkelyréteg): 6–10 rétegnyi, tetőcserépszerűen egymásra boruló, átlátszó pikkely. Védi a belső részt, és ettől fényes a haj. Ha a pikkelyek simán fekszenek, a haj sima és csillog; ha felállnak (lúg, hő, dörzsölés), a haj fénytelen, gubancos lesz.\n- **Kéreg** (cortex): a hajszál tömegének nagy része. Hosszú **keratinrostokból** áll, itt van a **pigment (melanin)**, és itt zajlik a festés, a szőkítés és a dauer kémiája. A kéreg adja a haj szilárdságát és rugalmasságát.\n- **Velő** (medulla): a hajszál közepén lévő laza, levegős állomány. Vékony hajban gyakran hiányzik.\n\nA haj **élő része** a bőrben, a **hajtüszőben** van: a hajhagyma alján lévő **hajpapilla** erekből kapja a tápanyagot, itt osztódnak a sejtek.'
        },
        {
          title: 'Keratin és kötések',
          text: 'A haj kb. 90%-ban **keratin** nevű fehérjéből áll. A keratin hosszú láncait háromféle kötés tartja össze, és a fodrász mindhármat „használja”:\n\n- **Hidrogénkötések**: gyengék, **víz és hő** bontja és újraköti őket. Ezért tart a **beszárított** vagy hajsütővel formázott frizura, és ezért esik ki párás időben vagy mosás után.\n- **Sóhidak** (ionos kötések): a **pH** változására érzékenyek. Erősen savas vagy lúgos közegben felbomlanak.\n- **Diszulfidkötések** (kéntartalmú hidak): **erősek**, víz nem bontja őket. Csak **vegyszer** változtatja meg: a **tartós hullámosítás (dauer)** és a tartós hajegyenesítés redukálószerrel (pl. tioglikolát) felbontja, majd a fixálás (oxidáló, pl. hidrogén-peroxid) új helyen újraköti őket. Ezért tartós a dauer: a haj új formája a kéreg kémiájába „ég be”.',
          tip: 'A nedves haj sokkal nyújthatóbb és sérülékenyebb, mint a száraz, mert a víz felbontja a hidrogénkötéseket. Nedves hajat ezért széles fogú fésűvel, a végeknél kezdve bonts ki, és ne húzd erősen.'
        },
        {
          title: 'A növekedési ciklus',
          text: 'Egy felnőtt fején nagyjából **100 000 hajszál** van (szőkéknél több, vörös hajúaknál kevesebb). A haj havonta kb. **1 cm**-t nő. Minden hajtüsző saját ciklusban működik:\n\n1. **Anagén** (növekedési szakasz): kb. **2–6 év**. A hajszálak kb. 85–90%-a ebben a szakaszban van. Ennek hossza dönti el, milyen hosszúra nőhet valakinek a haja.\n2. **Katagén** (átmeneti szakasz): néhány hét, a tüsző visszahúzódik.\n3. **Telogén** (nyugalmi szakasz): kb. 2–4 hónap, a végén a hajszál kihullik, és helyén új kezd nőni.\n\nNaponta **50–100 hajszál** kihullása normális. Ha valaki ennél jóval többet veszít, foltokban kopaszodik, vagy a fejbőre gyulladt, hámlik, a fodrász ne „kezelje”, hanem javasolja, hogy **bőrgyógyászhoz** forduljon.'
        },
        {
          title: 'Hajtípus, porozitás és pH',
          text: 'A **hajdiagnózis** a jó munka alapja. Megnézed:\n\n- **vastagság** (vékony, közepes, vastag szálú), **sűrűség** (hány szál van egy területen),\n- **porozitás**: mennyire nyitott a kutikula, mennyi vizet és vegyszert szív fel. A sokszor festett, szőkített, napégette haj **porózus**: gyorsan beszívja a festéket, de gyorsan ki is fakul, és hajlamos a túlfestődésre a végeken,\n- **rugalmasság**: egy nedves hajszál kicsit megnyújtva visszaugrik-e. Ha elszakad vagy „gumiszerűen” megnyúlik, a haj túlkezelt, kémiai kezelés előtt pihentetni, ápolni kell,\n- korábbi **kezelések**: festék, henna, dauer, egyenesítés (a vendég elmondása alapján!).\n\nA haj és a fejbőr természetes **pH**-ja enyhén savas, kb. **4,5–5,5**. A savas közeg zárja a kutikulát, a lúgos nyitja. Ezért a festék és a dauer lúgos, utána pedig savas kémhatású öblítő, balzsam zárja vissza a pikkelyeket.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a fogalmat a jelentésével!', count: 6, pairs: [
            ['Kutikula', 'Pikkelyes külső réteg, a fényességért felel'],
            ['Kéreg (cortex)', 'Keratinrostok és pigment, itt hat a festék'],
            ['Velő (medulla)', 'Laza belső állomány, vékony hajból hiányozhat'],
            ['Hidrogénkötés', 'Víz és hő bontja: ezért tart a beszárított forma'],
            ['Diszulfidkötés', 'Erős kéntartalmú híd, csak vegyszer bontja'],
            ['Anagén', 'Növekedési szakasz, kb. 2–6 év'],
            ['Telogén', 'Nyugalmi szakasz, végén kihullik a szál'],
            ['Porózus haj', 'Nyitott kutikula, gyorsan szív és gyorsan fakul']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik rétegben zajlik a festés és a szőkítés kémiája?', options: ['A kutikulában', 'A kéregben (cortex)', 'A velőben', 'A hajpapillában'], answer: 1, explain: 'A kéregben vannak a keratinrostok és a melanin, ide jut be a festék és itt dolgozik az oxidálószer.' },
        { q: 'Miért esik ki a beszárított frizura párás időben?', options: ['Mert a pára a diszulfidkötéseket bontja', 'Mert a víz felbontja a hidrogénkötéseket, amelyek a formát tartották', 'Mert a pára lúgos', 'Mert kihullik a haj'], answer: 1, explain: 'A beszárítás csak a gyenge hidrogénkötéseket rendezi át, ezeket a nedvesség újra felbontja.' },
        { q: 'Mennyi hajszál elvesztése számít naponta még normálisnak?', options: ['Kb. 5–10', 'Kb. 50–100', 'Kb. 1000', 'Egy sem'], answer: 1, explain: 'A telogén szakasz végén a hajszálak folyamatosan cserélődnek; napi 50–100 kihullása normális.' }
      ]
    },
    {
      id: 'festes',
      title: 'A hajfestés kémiája',
      level: 2, minutes: 15,
      summary: 'Melanin, színmélység és árnyalat; tartós oxidációs festék, oxidálószer-erősségek, szőkítés és a színsemlegesítés.',
      tags: ['hajfestés', 'oxidációs festék', 'hidrogén-peroxid', 'oxidálószer', 'előhívó', 'vol', 'ammónia', 'MEA', 'PPD', 'szőkítés', 'perszulfát', 'melanin', 'eumelanin', 'feomelanin', 'színmélység', 'árnyalat', 'alapfény', 'színkör', 'semlegesítés', 'tónusozás'],
      sections: [
        {
          title: 'A haj természetes színe',
          text: 'A haj színét a kéregben lévő **melanin** pigment adja. Kétféle van:\n\n- **eumelanin**: barnás-fekete,\n- **feomelanin**: vöröses-sárgás.\n\nA kettő aránya és mennyisége adja a természetes hajszínt. Az ősz haj azért fehér, mert a tüsző már nem termel melanint, a pigment nélküli szál pedig a fényt szórja.\n\nA fodrászok a hajszínt két adattal írják le:\n\n- **Színmélység** (alapszín, világosság): egy 1-től 10-ig (néhány márkánál 12-ig) tartó skála, ahol **1 = fekete**, **10 = legvilágosabb szőke**.\n- **Árnyalat** (tónus, reflex): a pont vagy perjel utáni számjegy, pl. 7.3 = középszőke arany árnyalattal. Hogy melyik szám melyik árnyalatot jelenti, az **márkánként eltérhet** (gyakori: 1 hamvas, 3 arany, 4 réz, 5 mahagóni, 6 vörös), ezért mindig a gyártó színkártyáját nézd.'
        },
        {
          title: 'Mi történik a tartós festéskor?',
          text: 'A **tartós (oxidációs) hajfesték** két komponensből áll, amelyeket közvetlenül használat előtt kell összekeverni:\n\n1. **Festékkrém**: lúgosító anyagot (ammónia vagy monoetanolamin, MEA) és **színtelen festékelőanyagokat** (pl. para-fenilén-diamin, PPD; vagy toluol-2,5-diamin) és **kapcsolóanyagokat** tartalmaz.\n2. **Oxidálószer** (előhívó, „oxi”): **hidrogén-peroxid** krém vagy folyadék.\n\nA keverékben:\n\n- a **lúgos közeg** megduzzasztja a hajat, és **felnyitja a kutikulát**, így az apró molekulák bejutnak a kéregbe,\n- a **hidrogén-peroxid** egyrészt **világosítja** a természetes melanint, másrészt **oxidálja** az előanyagokat,\n- az előanyagok a kapcsolókkal a kéregben **nagy, színes molekulákká** állnak össze, amelyek már **nem férnek ki** a kutikulán. Ezért tartós a szín: nem mosódik ki, csak a haj kinövésével „tűnik el”.\n\nA **félig tartós** (demi) festékek gyengébben lúgosak és hígabb oxidálót használnak, a **színezők** (direkt festékek) pedig oxidálás nélkül, csak a kutikulára és a kéreg külső részére tapadnak, ezért néhány mosás után kifakulnak.',
          widget: { type: 'idovonal', options: { steps: true, title: 'Egy tartós festés menete: tedd sorrendbe!', events: [
            { year: 1, label: '1. lépés', title: 'Konzultáció és bőrpróba', text: 'Kikérdezés (korábbi festés, henna, allergia), hajdiagnózis, és a gyártó előírása szerint bőrpróba (allergiateszt) a festés előtt, általában 48 órával.' },
            { year: 2, label: '2. lépés', title: 'Színválasztás', text: 'Megállapítod a jelenlegi színmélységet és a célszínt, kiválasztod a festéket és az oxidálószer erősségét.' },
            { year: 3, label: '3. lépés', title: 'Védelem', text: 'Kesztyű, festőkendő, a hajvonal mentén védőkrém. Nem fém edény, nem fém tál.' },
            { year: 4, label: '4. lépés', title: 'Keverés', text: 'Mérlegen, a gyártó keverési aránya szerint, közvetlenül felhordás előtt.' },
            { year: 5, label: '5. lépés', title: 'Felhordás', text: 'A technika szerinti sorrendben (pl. először a hossz, utána a melegebb tőrész), egyenletesen, választékokban.' },
            { year: 6, label: '6. lépés', title: 'Hatóidő', text: 'A gyártó szerinti hatóidő, órával mérve. A fejbőr állapotát közben is figyeled.' },
            { year: 7, label: '7. lépés', title: 'Emulgeálás és mosás', text: 'Kevés langyos vízzel felemulgeálod, alaposan kiöblíted, színvédő samponnal mosod.' },
            { year: 8, label: '8. lépés', title: 'Savas utókezelés', text: 'Savas balzsam, pakolás: visszazárja a kutikulát, stabilizálja a színt.' }
          ] } }
        },
        {
          title: 'Az oxidálószer erőssége',
          text: 'A hidrogén-peroxid erősségét **százalékban** vagy **„vol”** (volumen) egységben adják meg. A „vol” azt jelenti, hány liter oxigéngáz szabadulhat fel egy liter oldatból:\n\n- **3% = 10 vol**: színezés, tónusozás, sötétítés, ősz haj fedése a gyártó ajánlása szerint,\n- **6% = 20 vol**: a leggyakoribb, ősz haj fedése, kb. 1 árnyalat világosítás,\n- **9% = 30 vol**: kb. 2 árnyalat világosítás,\n- **12% = 40 vol**: kb. 3 árnyalat világosítás (fejbőrre csak ha a gyártó engedi).\n\nMinél erősebb az oxidálószer, annál jobban **roncsolja** a hajat és **irritálja** a fejbőrt. Mindig a lehető **leggyengébbet** válaszd, amivel a cél elérhető.\n\n**Szőkítéskor** a hidrogén-peroxidot **perszulfát**-tartalmú szőkítőporral keverik. Ez sokkal erősebben bontja a melanint. A haj világosodás közben **alapfényeket** mutat: sötét hajnál előbb vörös, aztán narancs, majd sárga, végül halványsárga. Ezeket utána **tónusozással** kell semlegesíteni.',
          warn: 'A szőkítőpor és a perszulfátok **belélegezve** asztmát és allergiát okozhatnak: pormentes (granulált) változatot használj, ne szórd, jól szellőztess. A kevert festéket **ne tárold** és ne zárd le légmentesen: tovább reagál, és a zárt edény akár szét is feszülhet. A maradékot a gyártó és a helyi hulladékszabály szerint kell kezelni.',
          widget: { type: 'szakma-gyakorlo', options: { kind: 'oxidalo', title: 'Keverési arány gyakorló', help: 'A festéket és az oxidálószert **mérlegen** mérjük. Számold ki, hány gramm oxidálószer kell!' } }
        },
        {
          title: 'Színsemlegesítés: a színkör',
          text: 'A nem kívánt árnyalatot a színkörön **vele szemben álló** színnel lehet semlegesíteni (ezek az ellenszínek, kiegészítő színek):\n\n- **narancs** alapfény ellen **kék** (hamvas) tónus,\n- **sárga** ellen **ibolya** (lila) tónus, ezért lila a „hamvasító” sampon,\n- **vörös** ellen **zöld** (matt) tónus.\n\nA festékek pigmentjei kivonó módon keverednek: minél több pigmentet adsz hozzá, annál sötétebb és tompább lesz a szín. Próbáld ki a festékkeverést!',
          widget: { type: 'szinkever', options: { mode: 'festek', title: 'Festékkeverés (kivonó színkeverés)', help: 'A hajfesték pigmentjei is kivonó módon keverednek: két ellenszín együtt szürkés, tompa árnyalatot ad. Ezen alapul a nem kívánt árnyalat semlegesítése.' } }
        }
      ],
      quiz: [
        { q: 'Mi a lúgosító anyag (ammónia, MEA) szerepe a tartós festékben?', options: ['Illatosít', 'Felnyitja a kutikulát, hogy a festékmolekulák bejussanak', 'Színt ad', 'Zárja a kutikulát'], answer: 1, explain: 'A lúgos közeg megduzzasztja a hajat, és felnyitja a pikkelyeket.' },
        { q: 'Hány %-os a 20 vol erősségű oxidálószer?', options: ['3%', '6%', '9%', '12%'], answer: 1, explain: '10 vol = 3%, 20 vol = 6%, 30 vol = 9%, 40 vol = 12%.' },
        { q: 'Szőkítés után sárgás maradt a haj. Milyen tónussal semlegesíted?', options: ['Ibolya (lila)', 'Arany', 'Réz', 'Vörös'], answer: 0, explain: 'A színkörön a sárgával szemben az ibolya áll.' }
      ]
    },
    {
      id: 'allergia',
      title: 'Allergiateszt és bőrérzékenység',
      level: 2, minutes: 12,
      summary: 'Kontakt dermatitisz, a PPD és a fekete henna veszélye, a bőrpróba menete, és mi a teendő reakció esetén.',
      tags: ['allergia', 'allergiateszt', 'bőrpróba', 'PPD', 'para-fenilén-diamin', 'fekete henna', 'kontakt dermatitisz', 'ekcéma', 'irritáció', 'szenzibilizáció', 'anafilaxia', 'kesztyű', 'kozmetikai rendelet'],
      sections: [
        {
          title: 'Irritáció vagy allergia?',
          text: 'A bőr kétféleképpen reagálhat egy vegyszerre:\n\n- **Irritatív (toxikus) bőrgyulladás**: a vegyszer közvetlenül károsítja a bőrt. **Bárkinél** kialakul, ha elég erős vagy elég sokáig hat (pl. erős oxidálószer, gyakori nedves munka, samponok). A hatás a behatás helyén jelentkezik.\n- **Allergiás kontakt dermatitisz**: az **immunrendszer** reagál. Az első érintkezések során a szervezet „megjegyzi” az anyagot (**szenzibilizáció**), és ezután **már kis mennyiség is** reakciót vált ki. Jellemzően **késleltetett**: 1–3 nappal az érintkezés után jelenik meg viszketés, bőrpír, duzzanat, hólyagok. A szenzibilizáció általában **egész életre** megmarad.\n\nA hajfestékek leggyakoribb allergénje a **PPD** (para-fenilén-diamin) és rokon vegyületei. Súlyos esetben az **arc, a szemhéj erősen bedagad**, ritkán általános allergiás reakció is kialakulhat.'
        },
        {
          title: 'A bőrpróba (allergiateszt)',
          text: 'A legtöbb oxidációs hajfesték gyártója előírja, hogy a festés előtt (jellemzően **48 órával**, és **minden festés előtt**, akkor is, ha a vendéget korábban már festetted) **bőrpróbát** kell végezni. Mindig a **konkrét termék használati utasítása** az irányadó. A menet általában:\n\n1. A vendég kitölti vagy elmondja: volt-e már reakciója hajfestékre, **„fekete henna”** tetoválása, ekcémája, sérült-e a fejbőre.\n2. A gyártó utasítása szerint kevés festéket viszel fel egy kis bőrfelületre (pl. a fül mögé vagy a könyökhajlatba), és hagyod megszáradni.\n3. A vendég a megadott ideig nem mossa le, és figyeli a helyet.\n4. Ha **bármilyen** reakció jelentkezik (viszketés, pír, duzzanat, hólyag, égő érzés), a festést **nem szabad** elvégezni.\n5. A próba időpontját és eredményét **dokumentálod** a vendég kartonján.\n\nA negatív bőrpróba **nem garancia**: allergia később is kialakulhat. Ezért festés közben és után is figyeld a vendéget.',
          warn: 'Ha festés közben vagy után a vendég **arca, szeme, ajka bedagad, nehezen lélegzik, szédül**, azonnal mosd le a festéket bő vízzel, és **hívd a 112-t**. Ez életveszélyes allergiás reakció is lehet.'
        },
        {
          title: 'A fekete henna csapdája',
          text: 'A valódi **henna** (a Lawsonia növény levele) narancsos-vörösesbarna színt ad. Az üdülőhelyeken kínált **„fekete henna” tetoválások** fekete színét gyakran **nagy koncentrációjú PPD** okozza, amelyet közvetlenül a bőrre kennek, és órákig rajta hagynak. Ez nagyon gyakran **erős szenzibilizációt** okoz: az illető ezután akár életre szólóan allergiás lehet a PPD-re és a rokon festékanyagokra, sőt bizonyos textilfestékekre, gumiadalékokra is.\n\nAz EU kozmetikai rendelete (1223/2009/EK) a PPD-t csak **oxidációs hajfestékben**, **szakmai felhasználásra** korlátozva és keverés után legfeljebb **2%**-os koncentrációban engedi, és a terméken kötelező figyelmeztetéseket ír elő. Bőrre festeni (tetoválásra) nem engedélyezett.\n\nEzért a konzultáción **mindig kérdezz rá** a fekete henna tetoválásra!'
        },
        {
          title: 'A fodrász saját bőre',
          text: 'A fodrászok körében gyakori a **kézekcéma**: a sok nedves munka, a samponok és a festékek kiszárítják és szenzibilizálják a bőrt. Megelőzés:\n\n- **Kesztyű** minden festésnél, szőkítésnél, dauernál, **mosáskor is** (festés utáni öblítéskor a legtöbb festékmaradék a kezedre kerül). Egyszer használatos nitrilkesztyű ajánlott, mert a latex is allergizálhat.\n- A kesztyűt **ne** használd újra, és ne viseld feleslegesen hosszan (a kesztyű alatt izzad a kéz).\n- Munka után és szünetekben **zsíros kézkrém**.\n- Ha a kezed kipirosodik, hámlik, berepedezik, **ne várd meg**, amíg súlyos lesz: bőrgyógyász, foglalkozás-egészségügyi orvos.',
          widget: { type: 'parositas', options: { title: 'Mi micsoda? Párosítsd!', count: 6, pairs: [
            ['Szenzibilizáció', 'Az immunrendszer „megjegyzi” az allergént'],
            ['Irritatív bőrgyulladás', 'Bárkinél kialakul, ha a vegyszer elég erős'],
            ['Allergiás kontakt dermatitisz', 'Késleltetett, 1–3 nap múlva jelentkező reakció'],
            ['PPD', 'A hajfestékek leggyakoribb allergénje'],
            ['Fekete henna tetoválás', 'Gyakran nagy koncentrációjú PPD a bőrön'],
            ['Nitrilkesztyű', 'Latexmentes védelem festéshez, mosáshoz'],
            ['Bőrpróba', 'A gyártó előírása szerint, minden festés előtt']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mit jelent, hogy az allergiás bőrreakció „késleltetett”?', options: ['Csak évek múlva jelentkezik', 'Jellemzően 1–3 nappal az érintkezés után jelentkezik', 'Csak a második hajmosáskor jelentkezik', 'Azonnal, másodperceken belül jelentkezik'], answer: 1, explain: 'A kontakt allergia T-sejtes, késleltetett típusú reakció, ezért kell a bőrpróbát napokkal a festés előtt végezni.' },
        { q: 'A vendég bőrpróbája pozitív lett (viszket, piros). Mi a teendő?', options: ['Gyengébb oxidálóval megfested', 'Nem végzed el a festést, és dokumentálod', 'Rövidebb hatóidővel megfested', 'Antiallergiás tablettát adsz neki'], answer: 1, explain: 'Pozitív próba esetén a terméket nem szabad használni. Gyógyszert a fodrász nem adhat.' },
        { q: 'Miért kérdezel rá a „fekete henna” tetoválásra?', options: ['Mert a henna kifakítja a festéket', 'Mert gyakran nagy koncentrációjú PPD-t tartalmaz, ami allergiássá tehette a vendéget', 'Mert a tetoválás miatt nem lehet hajat vágni', 'Divatból'], answer: 1, explain: 'A bőrre kent PPD erős szenzibilizációt okozhat, és utána a hajfesték is súlyos reakciót válthat ki.' }
      ]
    },
    {
      id: 'bortipusok',
      title: 'A bőr felépítése és a bőrtípusok',
      level: 1, minutes: 12,
      summary: 'Hám, irha, bőralja; a savköpeny; normál, száraz, zsíros, kombinált és érzékeny bőr; a Fitzpatrick-fototípusok.',
      tags: ['bőr', 'hám', 'epidermisz', 'irha', 'dermisz', 'bőralja', 'faggyúmirigy', 'verejtékmirigy', 'savköpeny', 'hidrolipid film', 'bőrtípus', 'száraz bőr', 'zsíros bőr', 'kombinált bőr', 'érzékeny bőr', 'Fitzpatrick', 'fényvédelem', 'SPF', 'komedó'],
      sections: [
        {
          title: 'A bőr rétegei',
          text: 'A bőr a test legnagyobb szerve. Három fő rétege:\n\n- **Hám (epidermisz)**: a külső, ér nélküli réteg. Alul folyamatosan osztódnak a sejtek, felfelé vándorolnak, elszarusodnak, és a felszínen **szaruréteg**ként lehámlanak. Egy teljes megújulás kb. 4 hét. Itt vannak a pigmentet termelő **melanociták** is.\n- **Irha (dermisz)**: rugalmas kötőszövet **kollagén** és **elasztin** rostokkal, erekkel, idegvégződésekkel, itt vannak a **hajtüszők**, a **faggyú-** és **verejtékmirigyek**. A ráncok itt keletkeznek, amikor a rostok megfogyatkoznak.\n- **Bőralja (szubkutisz)**: zsírszövet, hőszigetel és párnáz.\n\nA bőr felszínét a faggyúból, verejtékből és hámsejtekből álló **hidrolipid film** borítja, enyhén savas kémhatással (**savköpeny**, kb. pH 4,5–5,5). Ez védi a bőrt a kiszáradástól és a kórokozóktól. Az erős, lúgos szappanok megbontják.'
        },
        {
          title: 'Bőrtípusok',
          text: 'A kozmetikus a kezelés előtt **bőrdiagnózist** készít: megtisztított bőrön, jó fényben (gyakran nagyítós lámpával) nézi és tapintja a bőrt.\n\n- **Normál bőr**: kiegyensúlyozott, finom pórusú, rugalmas, nem fénylik és nem feszül.\n- **Száraz bőr**: kevés faggyú, feszül, hámlik, finom ráncokra hajlamos, a pórusok szinte láthatatlanok. Ápolás: zsírosabb, lipidpótló krémek, kíméletes tisztítás.\n- **Zsíros bőr**: sok faggyú, fénylik, tágak a pórusok, gyakoriak a **mitesszerek (komedók)** és a pattanások. Ápolás: alapos, de nem kiszárító tisztítás, könnyű, nem komedogén termékek.\n- **Kombinált bőr**: a homlok, az orr és az áll (a **T-zóna**) zsíros, az arc többi része normál vagy száraz.\n- **Érzékeny bőr**: könnyen kipirosodik, csíp, viszket, reagál a termékekre. Kevés összetevős, illatmentes készítmények, mindig próba kis felületen.\n\nA bőr **állapota** (pl. vízhiányos, napégett, gyulladt) változhat, a **típusa** inkább örökölt. Ha a kozmetikus **gyanús anyajegyet**, nem gyógyuló sebet, erős gyulladást lát, a vendéget bőrgyógyászhoz irányítja: diagnózist csak orvos állíthat fel.'
        },
        {
          title: 'Fototípusok és fényvédelem',
          text: 'A bőr napfényre adott válaszát a **Fitzpatrick-skála** írja le, **I-től VI-ig**:\n\n- **I.** nagyon világos bőr, mindig leég, sosem barnul (gyakran vörös haj, szeplők),\n- **II.** világos, könnyen leég, alig barnul,\n- **III.** közepes, néha leég, fokozatosan barnul,\n- **IV.** olajbarna, ritkán ég le, jól barnul,\n- **V.** barna, nagyon ritkán ég le,\n- **VI.** sötétbarna-fekete, szinte sosem ég le.\n\nA fototípus fontos a **szoláriumnál**, a hámlasztó és világosító kezeléseknél, a lézeres szőrtelenítésnél is. A **fényvédő** (SPF) faktor az UVB elleni védelmet jelzi; az UVA-védelmet külön jelölik. A fényvédőt bőven kell kenni, és 2 óránként, valamint fürdés után ismételni.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a bőrtípust a jellemzőjével!', count: 6, pairs: [
            ['Száraz bőr', 'Feszül, hámlik, alig látható pórusok'],
            ['Zsíros bőr', 'Fénylik, tág pórusok, mitesszerek'],
            ['Kombinált bőr', 'Zsíros T-zóna, normál vagy száraz arc'],
            ['Érzékeny bőr', 'Könnyen kipirosodik, reagál a termékekre'],
            ['Fitzpatrick I.', 'Mindig leég, sosem barnul'],
            ['Fitzpatrick V.', 'Barna bőr, nagyon ritkán ég le'],
            ['Savköpeny', 'Enyhén savas védőréteg a bőrön']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik bőrrétegben vannak a faggyúmirigyek és a hajtüszők?', options: ['A hámban', 'Az irhában', 'A bőraljában', 'A szaruréteg felszínén'], answer: 1, explain: 'Az irha (dermisz) tartalmazza a mirigyeket, a tüszőket, az ereket és a kollagénrostokat.' },
        { q: 'Mi jellemzi a kombinált bőrt?', options: ['Mindenhol zsíros', 'Zsíros T-zóna (homlok, orr, áll), máshol normál vagy száraz', 'Mindig érzékeny', 'Mindig leég a napon'], answer: 1, explain: 'A T-zónában több a faggyúmirigy.' },
        { q: 'Mit tesz a kozmetikus, ha gyanús, változó anyajegyet lát?', options: ['Lefagyasztja', 'Kinyomja', 'Bőrgyógyászhoz irányítja a vendéget', 'Lefesti'], answer: 2, explain: 'Diagnózist csak orvos állíthat fel; az anyajegyhez a kozmetikus nem nyúl.' }
      ]
    },
    {
      id: 'vagas',
      title: 'Vágástechnikák',
      level: 2, minutes: 14,
      summary: 'Választékok, vezetőtincs, emelési szög; tompa, lépcsőzött és réteges vágás, kiritkítás, géppel vágás és a vágás menete.',
      tags: ['hajvágás', 'választék', 'vezetőtincs', 'emelési szög', 'tompa vágás', 'lépcsőzés', 'graduálás', 'réteges vágás', 'kiritkítás', 'texturálás', 'olló', 'efilálóolló', 'borotva', 'hajvágógép', 'fade', 'átmenetes', 'ergonómia'],
      sections: [
        {
          title: 'Alapfogalmak',
          text: 'A vágás nem „szabadkézi” mozdulat, hanem tervezett geometria. A legfontosabb fogalmak:\n\n- **Választék (osztás)**: a hajat tiszta, egyenes vonalakkal részekre osztod (pl. a fej tetején, a fülek mögött), és a részeket csatokkal rögzíted. Csak tiszta választékkal lesz pontos a vágás.\n- **Vezetőtincs (vezetővonal)**: az első levágott tincs, ehhez igazodik a többi. **Álló** vezetőtincsnél minden tincset ugyanoda húzol (pl. hosszt tartó vágás), **mozgó** vezetőtincsnél mindig az előzőleg levágott tincs egy részét viszed tovább (egyenletes rétegek).\n- **Emelési szög**: mennyire emeled el a tincset a fejtől vágás előtt. **0°** (lefésülve, a fejhez simítva) súlyt és tömör vonalat ad, **45°** lépcsőzést, **90°** (a fejre merőlegesen) egyenletes rétegeket, **180°** (a fej tetejére felhúzva) hosszú alsó és rövid felső rétegeket.\n- **Ujjtartás**: a vágóvonal a tincset tartó ujjakkal párhuzamos; a vonal iránya határozza meg, hogyan esik a haj.'
        },
        {
          title: 'A vágások fő típusai',
          text: '- **Tompa vágás** (egyenes, egy hosszra vágás): 0°-on, a haj egy vonalban végződik. Súlyos, telt hatás, pl. egyenes bob, egyenes frufru.\n- **Lépcsőzött (graduált) vágás**: kis és közepes szögben (kb. 45°) emelt tincsek. A haj a tarkónál rövidebb, felfelé hosszabb; a rétegek egymásra rakódnak, ív és súly alakul ki (pl. lépcsőzött bob).\n- **Réteges vágás**: nagyobb szögben (90° vagy több). A haj könnyebb, mozgékonyabb, több a volumen.\n- **Kiritkítás, texturálás**: **efilálóollóval** (fogazott penge), ollócsúsztatással, pontvágással vagy borotvával a tömeget csökkented, a végeket lazítod. Túlzásba víve a haj szálkás, kócos lesz, és a vékony szálú haj „elfogy”.\n- **Géppel vágás**: rövid férfifrizurák, **átmenetes (fade)** vágás. A **toldófésűk** (gépfejek) adják a hosszt: a fade-nél fentről lefelé egyre rövidebb fejekkel, a határvonalakat elmosva dolgozol.'
        },
        {
          title: 'A vágás menete',
          text: 'Egy klasszikus női vágás logikája (a sorrend szalononként, technikánként eltérhet):',
          widget: { type: 'idovonal', options: { steps: true, title: 'A vágás menete: tedd sorrendbe!', events: [
            { year: 1, label: '1. lépés', title: 'Konzultáció', text: 'Mit szeretne a vendég, milyen az arcformája, hajtípusa, forgói, mennyi időt szán a formázásra.' },
            { year: 2, label: '2. lépés', title: 'Hajmosás', text: 'A legtöbb vágás nedves hajon készül, mert így pontosabban osztható.' },
            { year: 3, label: '3. lépés', title: 'Választékok', text: 'Tiszta osztás, a részeket csatokkal rögzíted.' },
            { year: 4, label: '4. lépés', title: 'Vezetőtincs', text: 'Megvágod az első tincset: ez adja a hosszt és a vonalat.' },
            { year: 5, label: '5. lépés', title: 'Vágás a vezetőtincshez igazítva', text: 'Részről részre, végig ugyanazzal az emelési szöggel és ujjtartással.' },
            { year: 6, label: '6. lépés', title: 'Keresztellenőrzés', text: 'Az ellenkező irányban felemelt tincsekkel ellenőrzöd, egyenletes-e a vágás, szimmetrikus-e a két oldal.' },
            { year: 7, label: '7. lépés', title: 'Szárítás és formázás', text: 'Beszárítás, a végleges forma.' },
            { year: 8, label: '8. lépés', title: 'Finomítás', text: 'Száraz hajon kiritkítás, kontúrok, frufru, az utolsó igazítások.' }
          ] } }
        },
        {
          title: 'Eszközök és ergonómia',
          text: '- Az **olló** a fodrász legfontosabb eszköze: rendszeresen **élezni** kell (szakemberrel), és tisztítani, olajozni. Csak hajra használd, papírt, kötszert ne vágj vele.\n- Az **efilálóolló** fogazott pengéje csak a szálak egy részét vágja.\n- A **borotvapenge** egyszer használatos, minden vendéghez új.\n- A **hajvágógép** pengéjét minden vendég után tisztítani és fertőtleníteni kell.\n\n**Ergonómia**: a fodrász egész nap áll, emeli a karját, hajlong. A vendég székét **állítsd magasabbra vagy alacsonyabbra**, ne te görnyedj; dolgozz a tested előtt, váltogasd a testhelyzetet, viselj kényelmes, zárt cipőt. Az ollót lazán fogd: a görcsös fogás ín- és ízületi panaszokat okoz a csuklóban és a hüvelykujjban.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a technikát a hatásával!', count: 6, pairs: [
            ['0° emelési szög', 'Súlyos, tömör, egy vonalban végződő haj'],
            ['Kb. 45° emelési szög', 'Lépcsőzés, egymásra rakódó rétegek'],
            ['90° emelési szög', 'Egyenletes rétegek'],
            ['Álló vezetőtincs', 'Minden tincs ugyanoda húzva'],
            ['Mozgó vezetőtincs', 'Az előző tincs egy részét viszed tovább'],
            ['Efilálóolló', 'Tömegcsökkentés, lazítás'],
            ['Fade', 'Géppel, fokozatosan rövidülő átmenet']
          ] } }
        }
      ],
      quiz: [
        { q: 'Milyen emelési szöggel kapsz súlyos, egy vonalban végződő vágást?', options: ['0°', '90°', '180°', 'Mindegy'], answer: 0, explain: 'A tompa vágást lefésült, 0°-os tincsekkel készítik.' },
        { q: 'Mire szolgál a keresztellenőrzés?', options: ['A haj színének ellenőrzésére', 'Arra, hogy az ellenkező irányú tincsekkel ellenőrizd a vágás egyenletességét', 'A fejbőr ellenőrzésére', 'Az olló élességének ellenőrzésére'], answer: 1, explain: 'Az ellenkező irányból emelt tincsekben kiderülnek a lépcsők, hibák, aszimmetria.' },
        { q: 'Miért a szék magasságát állítod, és nem te hajolsz le?', options: ['Mert így gyorsabb', 'A gerinced és a vállad védelme miatt (ergonómia)', 'Mert a vendég kéri', 'Mert az olló így élesebb'], answer: 1, explain: 'Egész napos munkában a görnyedt testtartás tartós mozgásszervi panaszokat okoz.' }
      ]
    },
    {
      id: 'higienia',
      title: 'Higiénia és fertőtlenítés a szalonban',
      level: 2, minutes: 14,
      summary: 'Tisztítás, fertőtlenítés, sterilizálás; kórokozók a szalonban, behatási idő, eszközök kezelése, vágásos sérülés, fejtetű.',
      tags: ['higiénia', 'tisztítás', 'fertőtlenítés', 'sterilizálás', 'autokláv', 'behatási idő', 'kórokozó', 'baktérium', 'gomba', 'vírus', 'hepatitisz', 'HIV', 'fejtetű', 'egyszer használatos', 'kéztisztítás', 'biztonsági adatlap'],
      sections: [
        {
          title: 'Tisztítás, fertőtlenítés, sterilizálás',
          text: 'Három különböző dolog, és a sorrend sem mindegy:\n\n1. **Tisztítás**: a látható szennyeződés (haj, bőrdarab, krém, vér) eltávolítása vízzel, tisztítószerrel, kefével. Enélkül a fertőtlenítő **nem tud hatni**, mert a szennyeződés megvédi a kórokozókat.\n2. **Fertőtlenítés**: a kórokozók **nagy részének** elpusztítása vegyszerrel (vagy hővel). A fertőtlenítőszer csak akkor hat, ha a **gyártó szerinti koncentrációban** és a megadott **behatási ideig** érintkezik a felülettel. A hígított oldatot a gyártó előírása szerint (gyakran naponta) frissen kell készíteni.\n3. **Sterilizálás**: **minden** mikroorganizmus, a spórák elpusztítása is, pl. gőzsterilizálóban (**autokláv**). A **bőrön áthatoló** eszközöket (pl. a kozmetikában a bőrt átszúró eszközök, tűk) sterilen vagy egyszer használatos kivitelben kell használni.\n\nA szalonban használható szerek, a behatási idők és az eszközök kezelésének pontos szabályait a népegészségügyi hatóság és a szer engedélye, címkéje határozza meg. A felület- és eszközfertőtlenítő **nem kézfertőtlenítő**, és fordítva.'
        },
        {
          title: 'Kórokozók a szalonban',
          text: '- **Baktériumok**: pl. a gennyes bőrfertőzéseket okozó Staphylococcus. Sérült bőrön, borotválás után juthat be.\n- **Gombák**: a fejbőr, a köröm, a lábujjak közötti bőr gombás fertőzései. Fésűvel, törölközővel, körömreszelővel terjedhetnek.\n- **Vírusok**: a **vérrel** terjedő **hepatitisz B és C** vírus és a **HIV** a legveszélyesebb. Egy apró, láthatatlan vérnyom a borotván, a körömollón, a gyantázó eszközön elég lehet. A hepatitisz B vírus a környezetben (beszáradva is) napokig fertőzőképes maradhat. Szemölcsvírus, herpesz is terjedhet.\n- **Élősködők**: **fejtetű**, rüh.\n\nHa a vendég fejbőrén vagy bőrén **fertőzés, gyulladás, élősködő** jelét látod, a kezelést nem kezded el (vagy halasztod), és tapintatosan javaslod az orvosi vizsgálatot. **Fejtetű** esetén a vendég ne kerüljön kezelésre; a használt eszközöket, kendőket a szalon rendje szerint tisztítod és fertőtleníted, a textíliákat magas hőfokon mosod.'
        },
        {
          title: 'Eszközök és textíliák kezelése',
          text: 'Minden vendégnek **tiszta** eszköz és textília jár:\n\n- **Fésű, kefe, csat**: minden vendég után a hajat eltávolítod, lemosod, majd fertőtleníted, és tisztán, fedetten tárolod.\n- **Olló, gép**: a hajat lekefézed, majd a gyártó által ajánlott fertőtlenítővel kezeled.\n- **Borotvapenge, nyakpapír, gyantaspatula**: **egyszer használatos**, minden vendéghez új. A gyantás spatulát **soha nem mártod vissza** a gyantába (dupla mártás tilos).\n- **Törölköző, kendő**: vendégenként tiszta, a használtat külön gyűjtőbe, magas hőfokon mosod.\n- **Munkafelület, szék, mosótál**: rendszeres tisztítás és fertőtlenítés.\n\nA szennyes és a tiszta eszközök **soha ne keveredjenek**: külön tárolóban legyenek.',
          widget: { type: 'idovonal', options: { steps: true, title: 'Egy fésű útja két vendég között: tedd sorrendbe!', events: [
            { year: 1, label: '1. lépés', title: 'Használt eszközök gyűjtése', text: 'A vendég után a használt fésű a „szennyes” tálcára kerül, nem vissza a fiókba.' },
            { year: 2, label: '2. lépés', title: 'Hajszálak eltávolítása', text: 'Kesztyűben, a fogak közül is.' },
            { year: 3, label: '3. lépés', title: 'Mosás', text: 'Meleg vízben, tisztítószerrel, kefével: eltűnik a zsír, a festék, a hajlakk.' },
            { year: 4, label: '4. lépés', title: 'Fertőtlenítés', text: 'Engedélyezett szerben, a gyártó szerinti koncentrációban és behatási ideig.' },
            { year: 5, label: '5. lépés', title: 'Öblítés és szárítás', text: 'Ha a szer előírja, öblítés, majd szárítás tiszta felületen.' },
            { year: 6, label: '6. lépés', title: 'Tiszta tárolás', text: 'Zárt, tiszta tárolóban, a használt eszközöktől elkülönítve.' }
          ] } }
        },
        {
          title: 'Ha megvágod a vendéget vagy magadat',
          text: 'Az éles eszközökkel előfordulhat vágás. Ilyenkor:\n\n1. Hagyd abba a munkát, húzz **kesztyűt**, ha még nincs rajtad.\n2. A sebet tiszta gézzel, **nyomással** állítsd el, és lásd el (sebfertőtlenítő, tapasz). Súlyos, nem csillapodó vérzésnél **112**.\n3. Az eszközt **azonnal** vedd ki a használatból: előbb tisztítás, majd a szalon protokollja szerint fertőtlenítés vagy sterilizálás. Az egyszer használatos pengét szúrásbiztos gyűjtőbe dobd.\n4. A vérrel szennyezett felületet, textíliát is kezeld.\n5. Ha **a te** sérült bőrödre került **más vére**, mosd le bő vízzel és szappannal, és **még aznap** keresd fel az orvost (foglalkozás-egészségügy, sürgősségi ellátás): bizonyos megelőző kezelések csak néhány órán belül hatékonyak.\n6. Az esetet **jegyezd fel**.\n\nA fodrászoknak és kozmetikusoknak érdemes a **hepatitisz B elleni védőoltásról** orvossal beszélni.',
          warn: 'A vegyszereket (fertőtlenítők, oxidálók, szőkítők) mindig az eredeti, felcímkézett csomagolásban, élelmiszertől elkülönítve tárold. Ne keverj össze különböző tisztító- és fertőtlenítőszereket: például a klóros és a savas szerek keverésekor mérgező klórgáz szabadul fel. Minden vegyszerhez van **biztonsági adatlap**: tudd, hol találod.'
        }
      ],
      quiz: [
        { q: 'Miért kell a fertőtlenítés ELŐTT megtisztítani az eszközt?', options: ['Hogy szebb legyen', 'Mert a szennyeződés megvédi a kórokozókat a fertőtlenítőtől', 'Mert a fertőtlenítő drága', 'Nem kell, elég a fertőtlenítés'], answer: 1, explain: 'A haj, zsír, vér réteg alatt a kórokozók túlélhetik a fertőtlenítést.' },
        { q: 'Mi a behatási idő?', options: ['Amennyi ideig a vendég a székben ül', 'Az az idő, ameddig a fertőtlenítőnek érintkeznie kell a felülettel, hogy hasson', 'A festék hatóideje', 'A mosógép programjának hossza'], answer: 1, explain: 'A szer csak a gyártó szerinti koncentrációban és behatási idő alatt éri el a megadott hatást.' },
        { q: 'Melyik kórokozó terjedhet egy apró vérnyommal egy borotván?', options: ['Csak a fejtetű', 'Hepatitisz B és C vírus, HIV', 'Csak a nátha vírusa', 'Egyik sem'], answer: 1, explain: 'A vérrel terjedő vírusok miatt egyszer használatos a borotvapenge.' }
      ]
    },
    {
      id: 'vendeg',
      title: 'Vendégkezelés és konzultáció',
      level: 1, minutes: 11,
      summary: 'A jó konzultáció lépései, kérdezéstechnika, elvárások kezelése, panaszkezelés és a vendégkarton adatvédelme.',
      tags: ['vendég', 'konzultáció', 'kommunikáció', 'nyitott kérdés', 'aktív hallgatás', 'elvárás', 'panaszkezelés', 'vendégkarton', 'adatvédelem', 'GDPR', 'hozzájárulás', 'ajánlás', 'törzsvendég'],
      sections: [
        {
          title: 'A konzultáció',
          text: 'A konzultáció a munka legfontosabb **5–10 perce**: itt dől el, elégedett lesz-e a vendég. Mindig **mielőtt** bármihez hozzányúlnál, és lehetőleg **száraz** hajon, a tükörben szemtől szemben.\n\n1. **Kérdezz**: mit szeretne, mi zavarja a mostani frizurájában, mennyi időt szán reggelente a hajára.\n2. **Nézz és tapints**: hajdiagnózis, bőrdiagnózis, forgók, hajvonal, arcforma.\n3. **Kérdezz rá a kockázatokra**: korábbi festés, henna, dauer, allergia, fejbőr-érzékenység, bőrbetegség, terhesség (egyes kezeléseknél), szedett gyógyszerek (pl. bizonyos aknés gyógyszerek mellett egyes kozmetikai kezelések nem végezhetők).\n4. **Mondd el őszintén**, mi valósítható meg, és mi nem (pl. fekete hajból egy alkalommal nem lesz platinaszőke kár nélkül).\n5. **Egyeztesd az árat és az időt** előre.\n6. **Foglald össze**: „Tehát a hossz marad vállig, a végekből 2 cm-t vágunk, és rétegeket teszünk elöl.”'
        },
        {
          title: 'Kérdezéstechnika és aktív hallgatás',
          text: '- **Nyitott kérdés** (mit, hogyan, miért): „Mit szeretne másképp, mint most?” Sok információt ad.\n- **Zárt kérdés** (igen/nem): „Festette hennával az elmúlt évben?” Pontos tényt rögzít.\n- **Aktív hallgatás**: figyelsz, bólintasz, visszakérdezel, a saját szavaiddal megismétled, amit hallottál. Így kiderül, ha félreértitek egymást.\n- A „kicsit rövidebb”, „egy kicsit világosabb” **mást jelent** mindenkinek. Mutasd meg ujjal a hosszt, a színkártyán a színt, kérj **fényképet**.\n\nA vendég testi határait is tiszteld: mondd el, mit fogsz csinálni, mielőtt hozzányúlsz (pl. arckezelésnél), és kérdezd meg, kényelmes-e a víz hőfoka, a nyomás.'
        },
        {
          title: 'Ha elégedetlen a vendég',
          text: 'A panasz **lehetőség**: ha jól kezeled, a vendég visszajön.\n\n1. **Hallgasd végig** nyugodtan, ne vágj közbe, ne védekezz.\n2. **Ismerd el az érzéseit**: „Értem, hogy nem erre számított.”\n3. **Tisztázd**, mi a pontos gond.\n4. **Ajánlj megoldást**: korrekció, ingyenes igazítás, a vezető bevonása.\n5. **Dokumentáld**, és tanulj belőle.\n\nA vendégnek a fogyasztóvédelmi szabályok szerint is vannak jogai (pl. a panaszát meg kell vizsgálni, kérésre jegyzőkönyvet kell felvenni).'
        },
        {
          title: 'A vendégkarton és az adatvédelem',
          text: 'A **vendégkarton** (papíron vagy szoftverben) a profi szalon memóriája: milyen színt, milyen oxidálóval, mennyi hatóidővel használtál, mikor volt a bőrpróba, mit vágtál.\n\nA karton **személyes adatokat** tartalmaz, sőt az allergia, a bőrbetegség **egészségügyi adat**, ami az adatvédelmi szabályok (GDPR) szerint **különleges** védelmet igényel:\n\n- csak azt rögzítsd, ami a szolgáltatáshoz **szükséges**,\n- a vendéget **tájékoztatni** kell az adatkezelésről, egészségügyi adatnál általában kifejezett hozzájárulás kell,\n- a kartont **zárva** vagy jelszóval védve tárold, illetéktelen ne lássa,\n- a vendég adatairól, magánéletéről, amit a széken elmesélt, **ne beszélj** másnak.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a helyzetet a jó megoldással!', count: 5, pairs: [
            ['A vendég „egy kicsit rövidebbet” kér', 'Ujjal mutasd meg a pontos hosszt'],
            ['Fekete hajból platinaszőkét kér egy alkalommal', 'Őszintén elmondod a kockázatot és a lépéseket'],
            ['A vendég elégedetlen', 'Végighallgatod, és megoldást ajánlasz'],
            ['Allergia a kartonon', 'Különleges adat: védetten tárolod'],
            ['Nem tudod, mit akar pontosan', 'Nyitott kérdés és fénykép'],
            ['Arckezelés kezdete', 'Elmondod, mit fogsz csinálni, mielőtt hozzányúlsz']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik nyitott kérdés?', options: ['Festette hennával?', 'Rövidebbet szeretne?', 'Mit szeretne másképp, mint most?', 'Jó így a víz?'], answer: 2, explain: 'A nyitott kérdésre nem lehet igennel vagy nemmel felelni, ezért több információt ad.' },
        { q: 'Mikor kell egyeztetni az árat?', options: ['A munka után', 'A konzultáción, a munka előtt', 'Csak ha a vendég kérdezi', 'Soha'], answer: 1, explain: 'Az előre egyeztetett ár megelőzi a vitát.' },
        { q: 'Miért különleges adat az allergia a vendégkartonon?', options: ['Mert hosszú', 'Mert egészségügyi adat, ezért fokozott védelem jár neki', 'Mert titkos recept', 'Nem különleges'], answer: 1, explain: 'Az egészségügyi adatok a GDPR szerint különleges kategóriába tartoznak.' }
      ]
    },
    {
      id: 'vallalkozas',
      title: 'A szalon mint vállalkozás',
      level: 2, minutes: 12,
      summary: 'Munkavállaló, székbérlő vagy saját szalon; árképzés, időbeosztás, anyaggazdálkodás, hírnév és a kötelező papírmunka.',
      tags: ['vállalkozás', 'egyéni vállalkozó', 'székbérlés', 'szalon', 'árképzés', 'önköltség', 'rezsi', 'haszonkulcs', 'időpontfoglalás', 'anyagköltség', 'készlet', 'marketing', 'számla', 'könyvelő'],
      sections: [
        {
          title: 'Milyen formában dolgozhatsz?',
          text: '- **Munkavállalóként** egy szalonban: fix bér (és esetleg jutalék), a munkáltató intézi a járulékokat, ő adja a helyet, az anyagot.\n- **Székbérlőként**: vállalkozóként bérelsz egy széket egy szalonban. Te szervezed a vendégeidet, te veszed az anyagot, te számlázol; a szalon a hely és a rezsi használatáért bérleti díjat kér.\n- **Saját szalonnal**: a legnagyobb szabadság és a legnagyobb kockázat: üzlethelyiség, berendezés, engedélyek, alkalmazottak.\n- **Mobil fodrász, kozmetikus**: a vendég otthonában dolgozol; kevesebb rezsi, de több utazás, és a higiéniai szabályoknak ott is meg kell felelni.\n\nVállalkozás indításakor sok a teendő: vállalkozási forma, adózási mód, számlázás, a tevékenység bejelentése, a helyiség előírásai. Az **adó- és járulékszabályok gyakran változnak**: a döntés előtt kérdezz **könyvelőt**, és nézd meg a hatóságok (NAV, kormányhivatal) aktuális tájékoztatóit.'
        },
        {
          title: 'Árképzés',
          text: 'Az ár nem „érzésre” megy. Egy szolgáltatás **önköltsége**:\n\n- **anyagköltség**: festék, oxidálószer, sampon, balzsam, fólia, kesztyű (mérd a felhasznált grammokat!),\n- **munkaköltség**: a munkára fordított idő és az óradíj, amelybe benne van a bér és a **rezsi** (bérleti díj, áram, víz, eszközök kopása, könyvelés, biztosítás) egy órára eső része.\n\nErre jön a **haszon** (haszonkulcs), és ha a vállalkozás áfakörös, az **áfa**. Az árat a piac is befolyásolja: a környék szalonjainak ára, a vendégkör, a hírneved. Az árlistát jól láthatóan ki kell függeszteni, a vendégnek előre tudnia kell, mennyit fizet.',
          widget: { type: 'szakma-gyakorlo', options: { kind: 'arkepzes', title: 'Árképzés gyakorló', help: 'Számold ki egy szolgáltatás nettó árát az anyagköltségből, a munkaidőből és a haszonkulcsból!' } }
        },
        {
          title: 'Idő, anyag, hírnév',
          text: '- **Időbeosztás**: egy üres óra elveszett bevétel. Időpontfoglalás (online is), emlékeztető üzenet, a lemondási szabályok előre közölve. Hagyj tartalékidőt a késésekre és a takarításra.\n- **Anyaggazdálkodás**: a festékek, oxidálók **lejárnak**. Vezesd a készletet, a régebbit használd előbb, ne vásárolj túl sokat egy-egy ritka árnyalatból.\n- **Hírnév**: a szájreklám és az online értékelések a legfontosabbak. Jó fotók a munkáidról (a vendég **hozzájárulásával**!), következetes minőség, pontosság.\n- **Továbbképzés**: a trendek, technikák, termékek gyorsan változnak. A jó szakember évente tanul valami újat.\n- **Saját egészség**: kéz, gerinc, láb. Ha kiesel, nincs bevétel: érdemes biztosításra, tartalékra gondolni.'
        }
      ],
      quiz: [
        { q: 'Mi tartozik a rezsibe?', options: ['Csak a festék ára', 'Bérleti díj, áram, víz, eszközök kopása, könyvelés', 'A vendég borravalója', 'Csak a bér'], answer: 1, explain: 'A rezsi a működés általános költsége, amelyet a munkaórákra kell elosztani.' },
        { q: 'Miért érdemes grammra mérni a felhasznált festéket?', options: ['Mert így pontos az anyagköltség, és kevesebb a pazarlás', 'Mert a vendég kéri', 'Mert a festék így tartósabb', 'Nem érdemes'], answer: 0, explain: 'A mérés pontosabb színt és pontosabb árképzést ad.' },
        { q: 'Mit tegyél, mielőtt egy vendégről készült fotót kiteszel a közösségi oldaladra?', options: ['Semmit', 'Kérd a hozzájárulását', 'Vágd le a fejét', 'Elég, ha nem írod ki a nevét'], answer: 1, explain: 'A fénykép személyes adat; a felhasználásához a vendég hozzájárulása kell.' }
      ]
    }
  ]
});

/* Hibakereső döntési fa (formátum: js/hibakereses.js fejléce) */
STUDIE.addTrouble({
  id: 'fodrasz-szin',
  title: 'Nem olyan lett a hajszín, mint vártuk',
  lessons: ['fodrasz/festes', 'fodrasz/hajszerkezet'],
  intro: 'Festés után a szín túl sötét, túl világos, foltos vagy nem a várt árnyalatú? Haladj végig a kérdéseken! Ha a vendég fejbőre ég, viszket, duzzad, az **nem színhiba**: azonnal mosd ki a festéket, súlyos tünetnél hívd a 112-t. Újrafestés előtt mindig gondold végig, bírja-e még a haj, és tartsd be a gyártó utasításait.',
  start: 'mi',
  nodes: {
    mi: { q: 'Mi a gond a színnel?', answers: [
      { t: 'Foltos, egyenetlen', next: 'foltos' },
      { t: 'Túl sötét lett', next: 'sotet' },
      { t: 'Nem világosodott eléggé, vagy sárgás-narancsos', next: 'vilagos' },
      { t: 'Az ősz haj nem fedett le', next: 'osz' }] },
    foltos: { q: 'Hol egyenetlen a szín?', check: 'Nézd meg nappali fényben: a tőnél, a hosszban vagy a végeken más a szín? Esetleg tincsenként, foltokban?', answers: [
      { t: 'A végek sötétebbek, fakóbbak vagy mások, mint a tő', next: 'r_porozus' },
      { t: 'A tő melegebb, világosabb, mint a hossz („forró tő”)', next: 'r_forro_to' },
      { t: 'Foltokban, tincsenként', next: 'r_felhordas' }] },
    sotet: { q: 'Porózus, sokszor festett a haj, vagy sötétebb célszínt választottatok?', answers: [
      { t: 'Igen, porózus, sokszor festett', next: 'r_porozus' },
      { t: 'A színválasztás eleve sötét volt', next: 'r_szinvalasztas' }] },
    vilagos: { q: 'Milyen oxidálót és hatóidőt használtál?', check: 'Nézd meg a kartonon és a gyártó táblázatában: hány árnyalat világosításra alkalmas az oxidáló? Letelt a teljes hatóidő?', answers: [
      { t: 'Gyenge volt az oxidáló vagy rövid a hatóidő', next: 'r_gyenge_oxi' },
      { t: 'Festett hajat próbáltam festékkel világosítani', next: 'r_festek_nem_vilagosit' },
      { t: 'Minden szabályos volt, mégis meleg alapfény maradt', next: 'r_alapfeny' }] },
    osz: { q: 'Milyen arányban és milyen termékkel dolgoztál?', answers: [
      { t: 'Csak divatárnyalatot használtam, természetes alap nélkül', next: 'r_osz_alap' },
      { t: 'Ellenálló, üveges ősz haj', next: 'r_osz_ellenallo' }] },
    r_porozus: { result: 'A porózus végek több festéket szívtak fel', fix: 'A sérült, porózus hosszak és végek gyorsabban és sötétebbre színeződnek. Legközelebb a végekre **rövidebb hatóidő**, világosabb vagy savas, kíméletes színező, előzetes **pigmentkiegyenlítő** vagy porozitáskiegyenlítő ápoló. Most: ápolás, és csak a gyártó szerinti színeltávolítás vagy korrekció, türelemmel.', level: 'ok' },
    r_forro_to: { result: 'Forró tő (a tő melegebb, világosabb)', fix: 'A fejbőr melege gyorsítja a reakciót. Első festésnél ezért a hosszra hordják fel előbb, a tőre később. Korrekció: a tőre hidegebb, egy árnyalattal sötétebb színt, a gyártó tanácsa szerint.', level: 'ok' },
    r_felhordas: { result: 'Egyenetlen felhordás', fix: 'Vékony, tiszta választékok, elegendő festék, gyors és egyenletes munka. A sűrű hajat kisebb részekre oszd. Korrekció: a világosabb foltok célzott utánfestése.', level: 'ok' },
    r_szinvalasztas: { result: 'Rossz színválasztás', fix: 'A színkártyán a szín **mintatincsen**, fehér hajon látszik; a valódi eredményt az alapszín is befolyásolja. Legközelebb próbatincs. A túl sötét színt nem lehet egyszerűen „ráfesteni” világosabbal: a gyártó színeltávolítója vagy kíméletes korrekció kell, tapasztalt kolléga segítségével.', level: 'warn' },
    r_gyenge_oxi: { result: 'Nem volt elég erős az oxidáló vagy rövid volt a hatóidő', fix: 'Ellenőrizd a gyártó táblázatát: hány árnyalat világosításhoz milyen oxidáló kell. A hatóidőt órával mérd. Az újbóli kezelés előtt mérlegeld a haj állapotát.', level: 'ok' },
    r_festek_nem_vilagosit: { result: 'Festék nem világosít festéket', fix: 'A korábbi mesterséges pigmentet a festék nem bontja le. Előbb színeltávolítás vagy kíméletes szőkítés kell, utána festés. Ez több alkalmat is igényelhet.', level: 'warn' },
    r_alapfeny: { result: 'Látható maradt a meleg alapfény', fix: 'Sötét hajnál a világosításkor vörös, narancs, majd sárga alapfény jön elő. Semlegesítés ellenszínnel: narancsra kék (hamvas), sárgára ibolya tónus.', level: 'ok' },
    r_osz_alap: { result: 'Hiányzott a természetes alapárnyalat', fix: 'Sok ősz hajnál a divatárnyalatot a gyártó ajánlása szerint természetes (.0) árnyalattal keverik, és a megfelelő oxidálót kell használni.', level: 'ok' },
    r_osz_ellenallo: { result: 'Ellenálló ősz haj', fix: 'Az üveges, ellenálló ősz haj nehezebben veszi fel a színt. A gyártó által ajánlott előkezelés, hosszabb hatóidő (a megengedett határon belül) vagy speciális ősz hajra való termék segíthet.', level: 'ok' }
  }
});
