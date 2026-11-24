/* Tantárgy: Hőszivattyú és klímatechnika */
STUDIE.addSubject({
  id: 'hoszivattyu',
  stage: 'szakma',
  title: 'Hőszivattyú és klímatechnika',
  icon: '❄️',
  color: '#0e9aa7',
  description: 'A hűtőkör, a COP, a hőszivattyú-típusok, a hűtőközegek és a szakszerű telepítés: a klíma és a hőszivattyú működése érthetően.',
  intro: 'A klíma és a hőszivattyú ugyanazon az elven működik: **hőt szállít** egy hidegebb helyről egy melegebbre. Ez a tananyag a működés **megértését** és a szakma alapjait tanítja. A hűtőkörön (a hűtőközeget tartalmazó csöveken) munkát az EU F-gáz szabályozása szerint **csak F-gáz képesítéssel** rendelkező szakember végezhet, a 230/400 V-os villamos bekötést pedig csak jogosult villanyszerelő.',
  lessons: [
    {
      id: 'hutokor',
      title: 'A hűtőkör: így szállítja a hőt',
      level: 1, minutes: 12,
      summary: 'Kompresszor, kondenzátor, expanziós szelep, elpárologtató: a halmazállapot-változás, ami hőt visz.',
      tags: ['hűtőkör', 'kompresszor', 'kondenzátor', 'expanziós szelep', 'elpárologtató', 'párolgás', 'lecsapódás', 'négyutú szelep', 'túlhevítés', 'utóhűtés'],
      models: ['hoszivattyu'],
      sections: [
        {
          title: 'Hőt szivattyúzni? Hogyan?',
          text: 'A hő magától mindig a melegebb helyről a hidegebb felé áramlik. A **hőszivattyú** ezt fordítja meg: munkát (villamos energiát) befektetve a **hidegebb helyről** (pl. a 0 °C-os külső levegőből) a **melegebb helyre** (a 21 °C-os szobába) szállít hőt.\n\nA hűtőszekrény is ezt csinálja: a belsejéből kiveszi a hőt, és a hátulján leadja. A **klíma** nyáron a szobából viszi ki a hőt, télen fordítva, a kinti levegőből hozza be. Ezért a mai split klíma valójában **levegő–levegő hőszivattyú**.\n\nA trükk egy különleges folyadék, a **hűtőközeg**, és a **halmazállapot-változás**:\n\n- **Párolgáskor** a folyadék hőt **vesz fel** a környezetéből (ezért fázol, ha vizes a bőröd).\n- **Lecsapódáskor (kondenzációkor)** a gőz ugyanezt a hőt **leadja**.\n- A forráspont a **nyomástól** függ: kis nyomáson a hűtőközeg már −20 °C-on is forr, nagy nyomáson +50 °C-on is lecsapódik.'
        },
        {
          title: 'A négy fő elem',
          text: 'A hűtőközeg egy zárt csőkörben kering, és négy fő elemen halad át:\n\n1. **Kompresszor**: összenyomja a kis nyomású, hideg hűtőközeg-gőzt. Ettől a gőz nyomása és hőmérséklete is megnő (akár 70–90 °C-ra). Ez az egyetlen elem, ami villamos energiát fogyaszt.\n2. **Kondenzátor (cseppfolyósító)**: a forró, nagy nyomású gőz itt **leadja a hőt** (fűtéskor a fűtővíznek vagy a szoba levegőjének), és közben **lecsapódik**, folyadék lesz.\n3. **Expanziós szelep (adagoló)**: a nagy nyomású folyadékot egy szűk keresztmetszeten átengedve **lecsökkenti a nyomását**. Ettől a hőmérséklete is lezuhan, pl. −5 °C-ra. Lehet elektronikus (EEV), termosztatikus (TXV) vagy egyszerű kapilláriscső.\n4. **Elpárologtató**: a hideg, kis nyomású közeg itt **hőt vesz fel** a környezetből (a kinti levegőből, a talajból), és közben **elpárolog**. A gőz visszajut a kompresszorba, és kezdődik elölről.\n\nA hűtőkört az [[hoszivattyu|hőszivattyú felfedezőben]] alkatrészenként is megnézheted.',
          tip: 'Jegyezd meg: a **kondenzátorban hőt ad le**, az **elpárologtatóban hőt vesz fel** a hűtőközeg. Hogy melyik melyik, az attól függ, fűtünk vagy hűtünk.'
        },
        {
          title: 'Fűtés és hűtés: a négyutú szelep',
          text: 'A klímában és a legtöbb hőszivattyúban egy **négyutú váltószelep** megfordítja a hűtőközeg áramlási irányát:\n\n- **Hűtéskor** a beltéri egység az elpárologtató (hőt vesz fel a szobából), a kültéri a kondenzátor (leadja kint).\n- **Fűtéskor** a beltéri egység a kondenzátor (hőt ad le a szobában), a kültéri az elpárologtató (hőt vesz fel a kinti levegőből, még fagyban is).\n\nUgyanez a szelep végzi a **leolvasztást** is: télen, ha a kültéri egység hőcserélője bejegesedik, a gép rövid időre „hűtésbe” vált, és a forró gázzal leolvasztja a jeget. Ilyenkor a kültéri egységből **gőz** szállhat fel, ez normális.'
        },
        {
          title: 'Túlhevítés és utóhűtés (haladóknak)',
          text: 'A szerelő a hűtőkör állapotát két számmal jellemzi:\n\n- **Túlhevítés**: mennyivel melegebb a gőz az elpárologtató kimenetén, mint a hozzá tartozó forrásponti hőmérséklet. Ha nagy, **kevés** lehet a hűtőközeg (vagy eldugult az adagoló). Biztosítja, hogy a kompresszorba ne jusson folyadék.\n- **Utóhűtés**: mennyivel hidegebb a folyadék a kondenzátor kimenetén, mint a lecsapódási hőmérséklet. Ha nagy, **túltöltés** lehet.\n\nEzeket nyomásmérő órákkal (szerelőcsonkra kötött mérőcsonkkal vagy digitális mérőműszerrel) és hőmérővel mérik, de csak F-gáz képesítéssel rendelkező szakember.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a hűtőkör elemeit!', count: 6, pairs: [
            ['Kompresszor', 'Összenyomja a gőzt, nő a nyomás és a hőmérséklet'],
            ['Kondenzátor', 'Hőt ad le, a gőz lecsapódik'],
            ['Expanziós szelep', 'Lecsökkenti a nyomást, lehűl a közeg'],
            ['Elpárologtató', 'Hőt vesz fel, a folyadék elpárolog'],
            ['Négyutú szelep', 'Megfordítja a kört: fűtés vagy hűtés'],
            ['Hűtőközeg', 'Halmazállapot-változással szállítja a hőt'],
            ['Leolvasztás', 'A kültéri hőcserélőről eltávolítja a jeget']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik elem fogyasztja a hűtőkörben a villamos energia nagy részét?', options: ['A kompresszor', 'Az expanziós szelep', 'A kondenzátor', 'Az elpárologtató'], answer: 0, explain: 'A kompresszor végzi a munkát: összenyomja a hűtőközeg gőzét.' },
        { q: 'Mit csinál a hűtőközeg az elpárologtatóban?', options: ['Hőt vesz fel és elpárolog', 'Hőt ad le és lecsapódik', 'Összenyomódik', 'Megfagy'], answer: 0, explain: 'A párolgáshoz hő kell, ezt a környezetből veszi fel.' },
        { q: 'Mire való a négyutú váltószelep?', options: ['A fűtés és a hűtés közti átváltásra', 'A víz szűrésére', 'A zaj csökkentésére', 'A villamos védelemre'], answer: 0, explain: 'Megfordítja a hűtőközeg áramlását, így a beltéri és kültéri egység szerepet cserél.' }
      ]
    },
    {
      id: 'cop',
      title: 'COP, SCOP és hatékonyság',
      level: 2, minutes: 12,
      summary: 'Mit jelent, hogy 1 kWh áramból 4 kWh hő lesz, és mitől függ a hőszivattyú hatékonysága.',
      tags: ['COP', 'SCOP', 'EER', 'SEER', 'hatékonyság', 'Carnot', 'előremenő hőmérséklet', 'energiacímke', 'éves fogyasztás'],
      sections: [
        {
          title: 'A COP: mennyi hőt kapsz egységnyi áramért?',
          text: 'A hőszivattyú nem „termeli” a hőt, hanem **szállítja**. Ezért több hőt ad le, mint amennyi áramot felvesz. Ezt a **COP (jósági fok, teljesítménytényező)** mutatja:\n\n`COP = leadott hőteljesítmény / felvett villamos teljesítmény`\n\nPélda: a hőszivattyú **3 kW** áramot vesz fel, és **12 kW** hőt ad le: `COP = 12 / 3 = 4`.\n\nHonnan jön a többi 9 kW? A **környezetből**: `12 − 3 = 9 kW`-ot a kinti levegőből (talajból, vízből) szállított. Ez a megújuló rész.\n\nÖsszehasonlításképp: egy villanyradiátor vagy fűtőpatron COP-ja **1**, mert 1 kWh áramból pontosan 1 kWh hő lesz.',
          tip: 'Hűtésnél ugyanezt **EER**-nek hívják: `EER = hűtőteljesítmény / villamos teljesítmény`. Egy 3,5 kW-os klíma, amely 1 kW-ot vesz fel: `EER = 3,5`.'
        },
        {
          title: 'Mitől függ a COP?',
          text: 'A COP annál nagyobb, minél **kisebb hőmérséklet-különbséget** kell „átemelni”. Ezt az elméleti felső határ, a **Carnot-féle COP** mutatja (a hőmérsékletek kelvinben):\n\n`COP_{max} = T_{meleg} / (T_{meleg} − T_{hideg})`\n\n- 0 °C kint (273 K), **35 °C** fűtővíz (308 K): `308 / 35 ≈ 8,8`\n- 0 °C kint (273 K), **55 °C** fűtővíz (328 K): `328 / 55 ≈ 6,0`\n\nA valós gépek ennek kb. a felét tudják, de az arány ugyanaz: **alacsonyabb előremenő hőmérsékletnél jóval hatékonyabb** a hőszivattyú. Ökölszabály: minden 1 °C-kal alacsonyabb előremenő hőmérséklet kb. **2–3%**-kal javítja a COP-t.\n\nA külső hőmérséklet is számít: −10 °C-ban egy levegős hőszivattyú COP-ja akár 2–2,5-re is eshet, +7 °C-ban 4–5 is lehet.',
          warn: 'Ne hasonlíts össze két gépet úgy, hogy az egyiknél A7/W35 (7 °C levegő, 35 °C víz), a másiknál A2/W55 feltétellel adták meg a COP-t. Mindig nézd meg, milyen feltételekhez tartozik a szám!'
        },
        {
          title: 'SCOP: az egész évre',
          text: 'A COP egy pillanatnyi érték egy adott hőmérsékleten. Egy egész fűtési szezonra az **SCOP (szezonális COP)** a mérvadó, ami az év különböző hőmérsékleteit is figyelembe veszi. Az energiacímkén ezt találod (hűtésnél **SEER**).\n\n**Éves áramfogyasztás becslése:**\n\n`villamos energia = éves hőigény / SCOP`\n\nPélda: egy jól szigetelt családi ház éves hőigénye **12 000 kWh**, a hőszivattyú SCOP-ja **4**: `12 000 / 4 = 3000 kWh` áram egy évre. Villanyradiátorral ugyanez **12 000 kWh** áram lenne.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás', help: 'Gyakorold a százalékszámítást: pl. mennyi a megtakarítás, ha a fogyasztás 25%-kal csökken?' } }
        },
        {
          title: 'Méretezés röviden',
          text: 'A hőszivattyút az épület **hőveszteségére** kell méretezni a leghidegebb tervezési napon (Magyarországon jellemzően −13…−15 °C).\n\n- Egy mai, jól szigetelt ház hővesztesége kb. 40–60 W/m², egy régi, szigeteletlené akár 150 W/m² is lehet.\n- Példa: 120 m², 50 W/m²: `120 · 50 = 6000 W = 6 kW`.\n\nA **túlméretezett** gép sokat ki-be kapcsol (ciklizál), ami rontja a hatékonyságot és a kompresszor élettartamát. Az **alulméretezett** a legnagyobb hidegben nem bírja, ilyenkor a beépített **elektromos fűtőpatron** segít be, COP = 1-gyel.',
          tip: 'Hőszivattyú előtt érdemes az épületet szigetelni és a nyílászárókat rendbe tenni: így kisebb (olcsóbb) gép is elég, és alacsonyabb előremenő hőmérséklettel is meleg lesz.'
        }
      ],
      quiz: [
        { q: 'Mekkora a COP, ha 2 kW áramból 8 kW hő lesz?', options: ['4', '16', '0,25', '6'], answer: 0, explain: 'COP = 8 / 2 = 4.' },
        { q: 'Mekkora egy villanyradiátor COP-ja?', options: ['1', '4', '0', '10'], answer: 0, explain: '1 kWh áramból pontosan 1 kWh hő lesz.' },
        { q: 'Mikor hatékonyabb a hőszivattyú?', options: ['Alacsonyabb előremenő hőmérsékletnél', 'Magasabb előremenő hőmérsékletnél', 'Nagyobb hidegben', 'Ha gyakran ki-be kapcsol'], answer: 0, explain: 'Minél kisebb a hőmérséklet-különbség, annál nagyobb a COP.' },
        { q: 'Mennyi áramot fogyaszt évente a hőszivattyú, ha a hőigény 9000 kWh, az SCOP 3?', options: ['3000 kWh', '27 000 kWh', '9000 kWh', '300 kWh'], answer: 0, explain: '9000 / 3 = 3000 kWh.' }
      ]
    },
    {
      id: 'tipusok',
      title: 'Típusok és fűtési rendszerek',
      level: 2, minutes: 12,
      summary: 'Levegő–levegő, levegő–víz, föld–víz és víz–víz hőszivattyúk; padlófűtés és alacsony hőmérsékletű rendszerek.',
      tags: ['levegő–levegő', 'split klíma', 'levegő–víz', 'monoblokk', 'föld–víz', 'talajszonda', 'víz–víz', 'padlófűtés', 'előremenő hőmérséklet', 'puffertároló', 'HMV'],
      models: ['hoszivattyu'],
      sections: [
        {
          title: 'A név: honnan hová?',
          text: 'A hőszivattyú nevében az első szó a **hőforrás** (honnan veszi a hőt), a második a **hőleadó közeg** (mit melegít):\n\n- **Levegő–levegő**: a kinti levegőből a szoba levegőjébe. Ez a **split klíma**. Olcsó, gyorsan felfűt, nyáron hűt, de meleg vizet nem készít, és a meleg a mennyezet közelében gyűlik.\n- **Levegő–víz**: a kinti levegőből a fűtővízbe (padlófűtés, radiátor) és a használati melegvízbe. Ma ez a legelterjedtebb hőszivattyús fűtés.\n- **Föld–víz (talajhő)**: a talajból, **talajszondán** (függőleges fúrás, jellemzően 80–120 m) vagy **talajkollektoron** (vízszintes csőhálózat kb. 1,5 m mélyen) keresztül. A talaj egész évben 10–12 °C körüli, ezért télen is magas a COP, de drága a kiépítés.\n- **Víz–víz**: a talajvízből, egy **termelő** és egy **visszanyelő kúton** keresztül. Nagyon hatékony, de kell elég, jó minőségű talajvíz és **vízjogi engedély**.',
          tip: 'A talajszondában és a kollektorban fagyálló (glikolos) folyadék kering, ez adja át a talaj hőjét a hőszivattyúnak.'
        },
        {
          title: 'Monoblokk és split levegő–víz hőszivattyú',
          text: '- **Monoblokk**: a teljes hűtőkör a kültéri egységben van, a házba csak **fűtővíz** csövek mennek. Nem kell a helyszínen hűtőköri munka, de a vezetékeket fagy ellen védeni kell (fagyvédelem, glikol vagy fagyvédő szelep).\n- **Split**: a kültéri egységben a kompresszor, a beltériben a víz–hűtőközeg hőcserélő. A kettőt **hűtőközeg-vezeték** köti össze, ezért a szereléshez **F-gáz képesítés** kell.'
        },
        {
          title: 'Hőleadók: minél nagyobb felület, annál jobb',
          text: 'Mivel a hőszivattyú **alacsony előremenő hőmérsékleten** a leghatékonyabb, olyan hőleadó kell, amely nagy felületen, kis hőmérséklettel is elég hőt ad le:\n\n- **Padlófűtés**: 28–35 °C előremenő víz elég. A legjobb társ.\n- **Falfűtés, mennyezetfűtés**: hasonlóan alacsony hőmérséklet, hűtésre is alkalmas (harmatpontra figyelve).\n- **Fan-coil (ventilátoros konvektor)**: kis méretű, ventilátorral, fűt és hűt.\n- **Radiátor**: hagyományos méretezésnél 60–70 °C kellene. Ha az épületet szigetelték, a meglévő radiátorok sokszor **45–55 °C**-kal is elég meleget adnak; ilyenkor működhet a hőszivattyú, csak kisebb COP-vel.',
          warn: 'Hűtésnél a padló- vagy mennyezetfűtés felülete nem hűlhet a **harmatpont** alá, különben lecsapódik rajta a pára (vizes padló, penész). Ezt harmatpont-érzékelő és szabályozás figyeli.'
        },
        {
          title: 'A rendszer többi része',
          text: '- **Puffertároló**: vízzel töltött tartály, amely kiegyenlíti a hőigényt, és elég vizet biztosít a leolvasztáshoz; csökkenti a ki-be kapcsolgatást.\n- **HMV (használati melegvíz) tároló**: a hőszivattyú ebbe is fűt. Hetente egyszer **legionella elleni** program 60 °C fölé melegíti (ehhez sokszor a fűtőpatron is besegít).\n- **Elektromos fűtőpatron**: a leghidegebb napokra és a legionella-programhoz.\n- **Időjárás-követő szabályozás**: minél hidegebb van kint, annál melegebb fűtővizet készít, de nem többet, mint amennyi kell. Ez a **fűtési görbe**.',
          widget: { type: 'parositas', options: { title: 'Mi mivel jár?', count: 6, pairs: [
            ['Levegő–levegő', 'Split klíma: fűt és hűt, melegvizet nem készít'],
            ['Levegő–víz', 'A kinti levegőből a fűtővízbe'],
            ['Föld–víz', 'Talajszonda vagy talajkollektor'],
            ['Víz–víz', 'Termelő és visszanyelő kút'],
            ['Padlófűtés', 'Elég a 28–35 °C-os előremenő víz'],
            ['Puffertároló', 'Kiegyenlíti a hőigényt, kevesebb a ki-be kapcsolás'],
            ['HMV tároló', 'Használati melegvíz, legionella elleni programmal']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi a hőforrása a föld–víz hőszivattyúnak?', options: ['A talaj', 'A kinti levegő', 'A szoba levegője', 'A napfény közvetlenül'], answer: 0, explain: 'Talajszondán vagy talajkollektoron keresztül a talaj hőjét hasznosítja.' },
        { q: 'Melyik hőleadó illik legjobban a hőszivattyúhoz?', options: ['Padlófűtés', 'Kis felületű, régi radiátor', 'Kandalló', 'Gázkonvektor'], answer: 0, explain: 'A padlófűtésnek 28–35 °C-os víz is elég, így nagy a COP.' },
        { q: 'Miért kell víz–víz hőszivattyúhoz vízjogi engedély?', options: ['Mert talajvizet termel ki és nyel vissza', 'Mert hangos', 'Mert gázzal működik', 'Nem kell semmilyen engedély'], answer: 0, explain: 'A kutak létesítése és a talajvíz használata engedélyköteles.' }
      ]
    },
    {
      id: 'hutokozegek',
      title: 'Hűtőközegek és környezetvédelem',
      level: 2, minutes: 11,
      summary: 'R32, R290, GWP, CO₂-egyenérték, és miért csak F-gáz képesítéssel szabad a hűtőkörhöz nyúlni.',
      tags: ['hűtőközeg', 'R32', 'R290', 'propán', 'R410A', 'GWP', 'CO2-egyenérték', 'F-gáz', 'F-gáz képesítés', 'szivárgásvizsgálat', 'gyúlékonyság'],
      sections: [
        {
          title: 'A GWP: mennyire melegíti a Földet?',
          text: 'A hűtőközegek egy része, ha kiszivárog, erős **üvegházhatású gáz**. Ezt a **GWP (globális felmelegedési potenciál)** mutatja: hányszor erősebben melegít, mint ugyanannyi CO₂ 100 év alatt.\n\nA **CO₂-egyenérték** megmutatja, mennyi CO₂-nek felel meg a töltet:\n\n`CO₂-egyenérték (t) = töltet (kg) · GWP / 1000`\n\nPélda: egy split klímában **1,2 kg R32** van, GWP = 675: `1,2 · 675 / 1000 = 0,81 t CO₂-egyenérték`. Ha ez kiszivárog, olyan, mintha egy autó kb. 5000–6000 km-t ment volna.'
        },
        {
          title: 'A gyakori hűtőközegek',
          text: '- **R410A** (GWP kb. 2088): régebbi klímákban, hőszivattyúkban. Nagy GWP-je miatt kivezetik.\n- **R32** (GWP 675): ma a split klímák nagy részében. Kevesebb kell belőle, és jobb a hatásfoka, de **enyhén gyúlékony (A2L)**.\n- **R290 (propán)** (GWP kb. 3): természetes közeg, nagyon kicsi a klímahatása, kiváló a hatásfoka, magas előremenő hőmérsékletet (akár 70 °C) is elér. **Fokozottan gyúlékony (A3)**, ezért főleg monoblokk gépekben, kis töltettel használják, és szigorú telepítési távolságokat kell betartani.\n- **R744 (CO₂)** (GWP 1): természetes közeg, főleg melegvíz-készítő hőszivattyúkban, nagyon nagy nyomáson működik.',
          warn: 'R32-es és R290-es rendszer közelében **tilos** a nyílt láng és a szikraképző szerszám, ha a kör nyitva van vagy szivárgás gyanúja áll fenn. A gyúlékony közeghez külön szerszám, szivárgáskereső és képzés kell.'
        },
        {
          title: 'Az F-gáz szabályozás',
          text: 'A fluortartalmú üvegházhatású gázokat (**F-gázok**, pl. R32, R410A) az EU **F-gáz rendelete** szabályozza. A legfontosabb pontok:\n\n- A hűtőkörön végzett munkát (szerelés, töltés, lefejtés, szivárgásvizsgálat, javítás, bontás) **csak F-gáz képesítéssel** rendelkező szakember, **tanúsított vállalkozás** keretében végezheti. Magyarországon a képesítést és a munkákat a **Klímagáz Adatbázisban** (Nemzeti Klímavédelmi Hatóság) kell nyilvántartani.\n- A hűtőközeget **tilos a levegőbe engedni**. Bontásnál, javításnál **lefejtő géppel** vissza kell nyerni.\n- **Rendszeres szivárgásvizsgálat** kell, ha a töltet eléri az **5 t CO₂-egyenértéket**. R410A-nál ez már kb. 2,4 kg (`2,4 · 2088 / 1000 ≈ 5,0 t`), R32-nél kb. 7,4 kg töltet.\n- A magas GWP-jű közegeket a rendelet **fokozatosan kivezeti** a forgalomból, a cél az alacsony GWP-jű és természetes közegek (R290, CO₂) elterjedése.',
          tip: 'Laikusként is megteheted: rendelj klímát **tanúsított vállalkozástól**, kérj munkalapot, és ne vegyél „feltöltött, csak össze kell dugni” rendszert házi szereléshez.'
        },
        {
          title: 'Biztonság a hűtőközeggel',
          text: '- A folyékony hűtőközeg a bőrön **fagyási sérülést** okoz (−40 °C körül forr). Védőszemüveg és -kesztyű kötelező.\n- Zárt térben a kiszivárgó hűtőközeg **kiszorítja az oxigént**, fulladást okozhat.\n- Ha forró felületre vagy lángra kerül, **mérgező bomlástermékek** keletkezhetnek.\n- A hűtőkör **nagy nyomás** alatt van (R32-nél üzem közben a nagynyomású oldalon akár 30 bar fölött), egy hibásan bontott cső vagy szelep balesetet okozhat.'
        }
      ],
      quiz: [
        { q: 'Mit mutat a GWP?', options: ['Hányszor erősebb üvegházhatású gáz, mint a CO₂', 'A hűtőközeg nyomását', 'A gép zajszintjét', 'A COP-t'], answer: 0, explain: 'Globális felmelegedési potenciál: a CO₂-höz viszonyított klímahatás.' },
        { q: 'Ki végezhet munkát a klíma hűtőkörén?', options: ['Csak F-gáz képesítéssel rendelkező szakember', 'Bárki, ha van szerszáma', 'Bármelyik villanyszerelő', 'A lakás tulajdonosa'], answer: 0, explain: 'Az F-gáz szabályozás szerint ehhez képesítés és tanúsított vállalkozás kell.' },
        { q: 'Melyik hűtőközeg a propán?', options: ['R290', 'R32', 'R410A', 'R744'], answer: 0, explain: 'Az R290 a propán: GWP-je kb. 3, de fokozottan gyúlékony.' }
      ]
    },
    {
      id: 'telepites',
      title: 'Telepítés lépésről lépésre',
      level: 3, minutes: 13,
      summary: 'Beltéri és kültéri egység elhelyezése, csőszerelés, nyomáspróba, vákuumozás, kondenzvíz és villamos bekötés.',
      tags: ['telepítés', 'beltéri egység', 'kültéri egység', 'peremezés', 'nyomáspróba', 'nitrogén', 'vákuumozás', 'kondenzvíz', 'villamos bekötés', 'zaj'],
      sections: [
        {
          title: 'Hová kerüljenek az egységek?',
          text: '**Beltéri egység** (split klíma):\n\n- a fal felső részén, a gyártó által előírt szabad távolsággal a mennyezettől és az oldalfalaktól,\n- úgy, hogy a légáram ne közvetlenül az ágyra, íróasztalra fújjon,\n- a kondenzvíz **lejtéssel** elvezethető legyen.\n\n**Kültéri egység**:\n\n- szilárd falikonzolon vagy talajon, **rezgéscsillapító** gumibakokon,\n- a hőcserélő előtt és mögött **szabad légáramlással** (ne legyen bezárva sarokba, burkolat mögé),\n- hőszivattyúnál **a talajtól megemelve** (hó és a leolvasztáskor keletkező jég miatt),\n- a **szomszédokra** is gondolva: a zaj éjszaka is zavarhat, és a helyi előírásokat (zajhatár, homlokzati szabályok) be kell tartani.',
          tip: 'A kültéri egység ne a hálószobaablak alá, ne napsütötte, zárt sarokba kerüljön. A visszaforgó meleg vagy hideg levegő rontja a hatékonyságot.'
        },
        {
          title: 'A hűtőközeg-vezeték szerelése',
          text: 'Ezt a munkát **F-gáz képesítéssel** rendelkező szerelő végzi:\n\n1. **Csövek**: hűtéstechnikai, tiszta, szárazon zárt **rézcső**, gyári hőszigeteléssel. A csövet csővágóval vágják (fűrészelni tilos, a forgács bejut a körbe), a végét sorjázzák.\n2. **Peremezés (hollandi kötés)**: peremező szerszámmal, majd **nyomatékkulccsal**, a gyártó által megadott nyomatékra húzzák meg. A túlhúzott perem megreped, a laza szivárog.\n3. **Hajlítás**: csőhajlítóval, nem kézzel, hogy ne törjön meg.\n4. A csőpárt, a kommunikációs kábelt és a kondenzvízcsövet egy kötegben, szigetelve vezetik ki a falon át, **kifelé lejtő** fúráson.'
        },
        {
          title: 'Nyomáspróba és vákuumozás',
          text: '**Nyomáspróba:** a kész csőkört **száraz nitrogénnel** a gyártó által előírt nyomásra töltik (R32-es rendszereknél jellemzően 30–40 bar), és figyelik, hogy a nyomás nem esik-e. A kötéseket habzó szivárgáskereső folyadékkal is ellenőrzik.\n\n**Vákuumozás:** a nitrogén kiengedése után **vákuumszivattyúval** kiszívják a levegőt és a nedvességet a csőkörből. A nedvesség a hűtőközeggel és az olajjal savat képez, és tönkreteszi a kompresszort; a levegő rontja a hatásfokot.\n\n- A cél jellemzően **500 mikron (kb. 0,67 mbar) alatti** vákuum, **elektronikus vákuummérővel** mérve.\n- Elérése után a szivattyút leválasztják, és várnak: ha a vákuum **tartja magát**, a kör tömör és száraz.\n\nCsak ezután nyitják ki a kültéri egység szelepeit, és engedik a gyári hűtőközeg-töltetet a körbe. Hosszabb csőnél **pótlólagos töltés** kell, mérlegre téve, grammra pontosan, a gyártó táblázata szerint.',
          warn: 'Nyomáspróbához **soha** ne használj oxigént vagy sűrített levegőt! Az oxigén az olajjal robbanásveszélyes elegyet alkot, a sűrített levegő pedig nedvességet visz a körbe.'
        },
        {
          title: 'Kondenzvíz és villamos bekötés',
          text: '**Kondenzvíz:** hűtéskor a beltéri egységen a levegő párája lecsapódik, egy nyári napon akár több liter víz is keletkezik.\n\n- A kondenzvízcső folyamatosan **lejtsen** (legalább kb. 1%, azaz 1 cm méterenként), ne legyen benne „zsák” vagy felfelé ívelő szakasz.\n- Ha nem lehet gravitációsan elvezetni, **kondenzvízszivattyú** kell.\n- Csatornába kötve **bűzzár (szifon)** kell, hogy ne jöjjön vissza a szag.\n\n**Villamos bekötés:** a klímának és a hőszivattyúnak a gyártó előírása szerinti **saját áramkör** kell, megfelelő keresztmetszetű vezetékkel, kismegszakítóval és áram-védőkapcsolóval (FI relé). Nagyobb hőszivattyúk és fűtőpatronok **háromfázisúak** (400 V).',
          warn: 'A 230/400 V-os bekötést, az elosztószekrényben végzett munkát **csak jogosult villanyszerelő** végezheti. Az inverteres kültéri egység kondenzátorai kikapcsolás után is **percekig feszültség alatt** maradhatnak.'
        }
      ],
      quiz: [
        { q: 'Mivel végzik a hűtőkör nyomáspróbáját?', options: ['Száraz nitrogénnel', 'Oxigénnel', 'Sűrített levegővel', 'Vízzel'], answer: 0, explain: 'A nitrogén száraz és nem ég; az oxigén robbanásveszélyes, a levegő nedves.' },
        { q: 'Miért kell vákuumozni a csőkört?', options: ['Hogy eltávolítsuk a levegőt és a nedvességet', 'Hogy több hűtőközeg férjen bele', 'Hogy halkabb legyen', 'Hogy kipróbáljuk a ventilátort'], answer: 0, explain: 'A nedvesség savat képez, a levegő rontja a hatásfokot.' },
        { q: 'Mekkora lejtés kell legalább a kondenzvízcsőnek?', options: ['Kb. 1% (1 cm méterenként)', 'Semmi, lehet vízszintes', 'Felfelé kell vezetni', 'Pontosan 45°'], answer: 0, explain: 'Folyamatos lejtés kell, különben a víz megáll, és visszafolyik vagy kicsöpög.' }
      ]
    },
    {
      id: 'karbantartas',
      title: 'Karbantartás és hibakeresés',
      level: 2, minutes: 11,
      summary: 'Szűrőtisztítás, fertőtlenítés, a kültéri egység ápolása, a leolvasztás és a leggyakoribb hibák.',
      tags: ['karbantartás', 'szűrő', 'fertőtlenítés', 'leolvasztás', 'jegesedés', 'hibakód', 'szivárgás', 'hibakeresés', 'kondenzvíz'],
      models: ['hoszivattyu'],
      sections: [
        {
          title: 'Amit te is megtehetsz',
          text: '- **Szűrők tisztítása:** a beltéri egység porszűrőit szezonban **2–4 hetente** vedd ki, porszívózd vagy langyos vízzel mosd ki, és szárazon tedd vissza. A koszos szűrő a hatékonyság és a levegőminőség első számú ellensége.\n- **Kültéri egység:** tartsd szabadon a környékét (falevél, hó, növényzet), a hőcserélő lamelláit ne nyomd össze.\n- **Hőszivattyús fűtésnél:** figyeld a fűtési rendszer **víznyomását** (jellemzően 1–2 bar), és tisztítsd a gyártó szerint a fűtőköri **iszapleválasztót, szűrőt**.\n- **Beállítások:** a túl alacsony hűtési hőmérséklet (pl. 18 °C kánikulában) feleslegesen sokat fogyaszt, és megfázást okozhat. A kinti és benti hőmérséklet közti 6–8 °C különbség általában elég.',
          warn: 'Tisztítás előtt **kapcsold ki** a klímát, és ha lehet, a kismegszakítóval is áramtalanítsd. A burkolat mögé, a villamos részekhez ne nyúlj.'
        },
        {
          title: 'Amit a szakember végez (évente)',
          text: '- a beltéri hőcserélő és a ventilátor **tisztítása, fertőtlenítése** (penész, baktériumok, a „dohos szag” ellen),\n- a **kondenzvíz-elvezetés** átmosása,\n- a kültéri hőcserélő tisztítása,\n- **szivárgásvizsgálat** (ha a töltet miatt kötelező, a Klímagáz Adatbázisban rögzítve), a nyomások, hőmérsékletek, a túlhevítés mérése,\n- a villamos kötések, a kompresszor áramfelvételének ellenőrzése.\n\nHa a hűtőközeg fogy, az **mindig szivárgást** jelent: a klíma nem „fogyaszt” gázt. Ilyenkor a szivárgást meg kell keresni és javítani, nem csak „utántölteni”.'
        },
        {
          title: 'A leolvasztás: mikor normális a jég?',
          text: 'Fűtéskor a kültéri egység hőcserélője **hidegebb a kinti levegőnél**. Ha kint **0 és +5 °C** között van, és párás az idő, a levegő nedvessége ráfagy a lamellákra. Ez **normális**.\n\nA gép ezt érzékeli, és néhány percre **leolvasztást** végez: a ventilátor megáll, a beltéri egység nem fúj meleget (vagy alig), kint **gőz** száll fel, és víz csöpög. Utána visszaáll fűtésre.\n\n**Nem normális**, ha:\n\n- a jég **órák óta** nem olvad le, vastag páncél lesz,\n- az egység **alja** fagy be, mert a leolvadt víz nem tud elfolyni,\n- csak a hőcserélő **egy része** jegesedik (kevés hűtőközegre utalhat).'
        },
        {
          title: 'Gyakori hibák röviden',
          text: '- **Nem fűt/hűt rendesen:** koszos szűrő, rossz üzemmód, eltakart kültéri egység, túl nagy helyiség, kevés hűtőközeg (szivárgás).\n- **Csöpög a beltéri egység:** eldugult vagy rossz lejtésű kondenzvízcső, koszos tálca.\n- **Dohos szag:** penész a hőcserélőn, ventilátoron: fertőtlenítés kell.\n- **Hibakód a kijelzőn:** a kézikönyv vagy a gyártó oldala megmondja, mit jelent (pl. érzékelő-, kommunikációs, nyomás- vagy kompresszorhiba).\n- **Zajos kültéri egység:** laza burkolat, kopott rezgéscsillapító, ventilátorba került tárgy, csapágyhiba.',
          tip: 'Mielőtt szerelőt hívsz, nézd meg: jó üzemmódban van-e (a „Dry” vagy „Fan” nem hűt rendesen), tiszta-e a szűrő, és nincs-e letakarva a kültéri egység. Sok „hiba” ennyiből megoldódik.'
        }
      ],
      quiz: [
        { q: 'Milyen gyakran tisztítsd szezonban a klíma szűrőit?', options: ['2–4 hetente', '10 évente', 'Soha', 'Naponta háromszor'], answer: 0, explain: 'A koszos szűrő rontja a hatékonyságot és a levegőminőséget.' },
        { q: 'Mit jelent, ha fogy a hűtőközeg?', options: ['Szivárgást, amit meg kell keresni', 'Normális fogyást', 'Hogy túl sokat használtad', 'Hogy hideg van kint'], answer: 0, explain: 'A zárt hűtőkörből közeg csak szivárgással távozhat.' },
        { q: 'Normális-e, hogy télen fűtéskor időnként gőz száll fel a kültéri egységből?', options: ['Igen, ez a leolvasztás', 'Nem, ez tűz', 'Nem, ez szivárgás', 'Csak nyáron normális'], answer: 0, explain: 'Leolvasztáskor a jég elolvad, és a meleg lamellákról gőz száll fel.' }
      ]
    }
  ]
});

/* Hibakereső döntési fák (formátum: js/hibakereses.js fejléce) */
STUDIE.addTrouble({
  id: 'hoszivattyu-nem-fut-hut',
  title: 'Nem fűt vagy nem hűt rendesen a klíma',
  lessons: ['hoszivattyu/karbantartas', 'hoszivattyu/hutokor'],
  intro: 'A legegyszerűbb okokkal kezdünk, ezeket te is ellenőrizheted. **A burkolatot ne szereld le**, a hűtőkörhöz és a villamos részekhez ne nyúlj: azok szakemberre tartoznak.',
  start: 'fuj',
  nodes: {
    fuj: { q: 'Fúj levegőt a beltéri egység?', answers: [
      { t: 'Nem, semmi nem történik, a kijelző is sötét', next: 'r_aram' },
      { t: 'Nem, de a kijelzőn hibakód villog', next: 'r_hibakod' },
      { t: 'Igen, fúj, de nem elég hideg vagy meleg a levegő', next: 'mod' }] },
    mod: { q: 'Jó üzemmódban és jó hőmérsékletre van állítva?', check: 'Nézd meg a távirányítón: hűtéshez „Cool” (❄), fűtéshez „Heat” (☀) kell. Az „Auto”, „Dry” és „Fan” üzemmód nem ad teljes teljesítményt. Hűtésnél a beállított érték legyen a szobahőmérséklet alatt, fűtésnél fölötte.', answers: [
      { t: 'Nem, rossz volt az üzemmód vagy a beállítás', next: 'r_beallitas' },
      { t: 'Igen, jól van beállítva', next: 'szuro' }] },
    szuro: { q: 'Tiszták a beltéri egység szűrői?', check: 'Kapcsold ki a klímát, nyisd fel az előlapot, és húzd ki a szűrőket. Ha szürke porréteg van rajtuk, koszosak.', answers: [
      { t: 'Koszosak voltak', next: 'r_szuro' },
      { t: 'Tiszták', next: 'kulteri' }] },
    kulteri: { q: 'Működik a kültéri egység (forog a ventilátor, hallani a kompresszort)?', check: 'Nézd meg kint, néhány perccel a bekapcsolás után. Közben ellenőrizd, nincs-e letakarva, eltorlaszolva (ponyva, hó, falevél, bezárt burkolat).', answers: [
      { t: 'Nem indul el egyáltalán', next: 'r_kulteri' },
      { t: 'Működik, de le van takarva vagy erősen koszos a hőcserélője', next: 'r_takaras' },
      { t: 'Működik, szabadon áll', next: 'jeg' }] },
    jeg: { q: 'Látsz jeget vagy deret a csöveken, csatlakozóknál, vagy (hűtéskor) a beltéri egységen?', answers: [
      { t: 'Igen, hűtéskor a beltéri egység vagy a vékony cső jegesedik', next: 'r_keves_gaz' },
      { t: 'Igen, fűtéskor a kültéri egység teljesen bejegesedett', next: 'r_jeg_fa' },
      { t: 'Nincs jég', next: 'meret' }] },
    meret: { q: 'Mióta van a gond?', answers: [
      { t: 'Mindig is ilyen volt, csak a legnagyobb melegben vagy hidegben nem bírja', next: 'r_meret' },
      { t: 'Régebben jól működött, fokozatosan romlott', next: 'r_keves_gaz' }] },
    r_aram: { result: 'Nem kap áramot a klíma', fix: '- Nézd meg az elosztószekrényben a klíma kismegszakítóját és az áram-védőkapcsolót (FI relé). Ha le van kapcsolva, egyszer visszakapcsolhatod.\n- Cseréld ki a távirányító elemeit.\n\nHa a kismegszakító újra lekapcsol, **ne próbálkozz tovább**: villanyszerelőt vagy klímaszerelőt kell hívni.', level: 'warn' },
    r_hibakod: { result: 'A gép hibát jelez', fix: 'Írd fel a hibakódot, és nézd meg a kézikönyvben vagy a gyártó oldalán, mit jelent. Áramtalanítsd a klímát néhány percre, majd indítsd újra. Ha a hibakód visszatér, hívd a szervizt, és mondd meg nekik a kódot: így a megfelelő alkatrésszel jöhetnek.', level: 'warn', pro: true },
    r_beallitas: { result: 'Beállítási hiba', fix: 'Állítsd a megfelelő üzemmódra (Cool vagy Heat), és a ventilátort „Auto” vagy magasabb fokozatra. Hűtésnél kb. 24–26 °C elég, fűtésnél 20–22 °C. Csukd be az ablakokat, ajtókat.', level: 'ok' },
    r_szuro: { result: 'Eltömődött szűrő', fix: 'Porszívózd vagy langyos vízzel mosd ki a szűrőket, és szárazon tedd vissza őket. Szezonban 2–4 hetente ismételd. Ha a hőcserélő lamellái is koszosak, kérj szakszerű tisztítást, fertőtlenítést.', level: 'ok' },
    r_kulteri: { result: 'A kültéri egység nem indul (villamos, vezérlési vagy kompresszorhiba)', fix: 'Lehet kommunikációs hiba, kioldott védelem, hibás kondenzátor, ventilátor vagy kompresszor. Ez szerviz feladata: az inverteres kültéri egységben kikapcsolás után is percekig veszélyes feszültség lehet.', level: 'bad', pro: true },
    r_takaras: { result: 'A kültéri egység nem tud szabadon „lélegezni”', fix: 'Vedd le a takarást, távolítsd el a havat, falevelet, növényzetet a környékéről. A koszos hőcserélőt szakember tisztítsa (vagy óvatosan, kis nyomású vízzel, kikapcsolt állapotban, a lamellák sérülése nélkül).', level: 'ok' },
    r_keves_gaz: { result: 'Valószínűleg kevés a hűtőközeg (szivárgás)', fix: 'A zárt körből a hűtőközeg csak szivárgással fogyhat. **F-gáz képesítéssel** rendelkező szerelő megkeresi és megjavítja a szivárgást, vákuumoz, és mérlegen pontosan újratölti a kört. A puszta „utántöltés” csak pénzkidobás, és a hűtőközeg a légkörbe kerül.', level: 'bad', pro: true },
    r_jeg_fa: { result: 'Tartós jegesedés a kültéri egységen', fix: 'Erre külön hibakereső van ennél a leckénél: **„Jegesedik a kültéri egység”**. Indítsd el azt!', level: 'warn' },
    r_meret: { result: 'Alulméretezett gép, vagy a helyiség igénye túl nagy', fix: 'A klíma teljesítménye nem elég a helyiséghez (nagy üvegfelület, napsütötte tetőtér, rossz szigetelés). Segíthet: árnyékolás (redőny, külső árnyékoló), a hőterhelés csökkentése, és a gép folyamatos, egyenletes járatása. Végső soron nagyobb vagy kiegészítő gép kell, ezt szakember méretezze.', level: 'warn', pro: true }
  }
});

STUDIE.addTrouble({
  id: 'hoszivattyu-jegesedik',
  title: 'Jegesedik a kültéri egység',
  lessons: ['hoszivattyu/karbantartas'],
  intro: 'Télen, fűtéskor a kültéri egység jegesedése sokszor teljesen normális. Nézzük meg, mikor nem az! **Jeget soha ne verj le** kalapáccsal, csavarhúzóval, és ne öntsd le forró vízzel: megsérülnek a lamellák és a csövek.',
  start: 'ido',
  nodes: {
    ido: { q: 'Milyen az idő kint?', answers: [
      { t: '0 és +5 °C között, párás, ködös vagy szitáló', next: 'leolvaszt' },
      { t: 'Erős fagy (−5 °C alatt), száraz idő', next: 'leolvaszt' },
      { t: 'Havazik, ónos eső esik', next: 'ho' }] },
    leolvaszt: { q: 'Végez időnként leolvasztást a gép, és utána tiszta lesz a hőcserélő?', check: 'Figyeld meg 1–2 órán át: leolvasztáskor a ventilátor megáll, gőz száll fel, víz csöpög, majd a lamellák szabaddá válnak.', answers: [
      { t: 'Igen, ciklikusan leolvaszt, és utána tiszta', next: 'r_normalis' },
      { t: 'Leolvaszt, de az egység alja, a tálca befagy, a jég egyre nő', next: 'r_talca' },
      { t: 'Nem olvad le, vastag jégpáncél van rajta órák óta', next: 'resz' }] },
    resz: { q: 'Az egész hőcserélő egyenletesen jeges, vagy csak egy része (pl. az alsó sarok, a vékony cső)?', answers: [
      { t: 'Csak egy része, főleg a csövek bemeneténél', next: 'r_gaz' },
      { t: 'Egyenletesen az egész', next: 'venti' }] },
    venti: { q: 'Forog a kültéri egység ventilátora fűtés közben?', answers: [
      { t: 'Nem forog, vagy nagyon lassan', next: 'r_ventilator' },
      { t: 'Rendesen forog', next: 'r_erzekelo' }] },
    ho: { q: 'Be van temetve vagy elzárva a kültéri egység hóval, jéggel (alul, hátul)?', answers: [
      { t: 'Igen, körbe van havazva vagy rá csöpög az ereszről', next: 'r_ho' },
      { t: 'Nem, szabadon áll', next: 'leolvaszt' }] },
    r_normalis: { result: 'Ez normális működés', fix: 'Párás, 0 °C körüli időben a kültéri hőcserélőre ráfagy a levegő nedvessége, és a gép rendszeresen leolvasztja. Ilyenkor néhány percig nem fúj meleget a beltéri egység, ez nem hiba. Ügyelj rá, hogy a leolvadó víz el tudjon folyni.', level: 'ok' },
    r_talca: { result: 'A leolvadó víz nem tud elfolyni, és visszafagy', fix: '- Az egység legyen a talajtól megemelve (konzol, láb), hogy a víz alá folyhasson.\n- Az elvezetés ne fagyjon be: a lefolyócső, ha van, legyen fagyvédett (fűtőkábellel), vagy a víz csepegjen szabadon kavicságyra.\n- Sok gépbe gyárilag vagy utólag **tálcafűtés** szerelhető.\n\nA befagyott tálca a ventilátort és a lamellákat is károsíthatja, ezért ha nem tudod megszüntetni, hívj szakembert.', level: 'warn', pro: true },
    r_gaz: { result: 'Kevés hűtőközeg (szivárgás) vagy adagolóhiba', fix: 'Ha csak a hőcserélő egy része jegesedik, és a gép gyengén fűt, valószínűleg kevés a közeg, vagy az expanziós szelep hibás. Ez a hűtőkör hibája: csak **F-gáz képesítéssel** rendelkező szerelő vizsgálhatja és javíthatja.', level: 'bad', pro: true },
    r_ventilator: { result: 'Ventilátormotor- vagy vezérlési hiba', fix: 'Ha a ventilátor nem forog, a hőcserélő nem kap elég levegőt, és gyorsan bejegesedik. Ellenőrizd, nem akadályozza-e jég vagy tárgy (kikapcsolt állapotban!). Ha szabad, és mégsem forog, motor- vagy vezérlőpanel-hiba: szerviz.', level: 'bad', pro: true },
    r_erzekelo: { result: 'Nem indul el a leolvasztás (érzékelő vagy vezérlési hiba)', fix: 'A leolvasztást a hőcserélő hőmérséklet-érzékelője indítja. Ha az hibás, vagy elmozdult, a gép „nem veszi észre” a jeget. Szerviz ellenőrzi az érzékelőt és a négyutú szelepet. Addig a gépet kapcsold ki, hogy a jég ne tegyen kárt benne.', level: 'warn', pro: true },
    r_ho: { result: 'A hó vagy az ereszről csöpögő víz zárja el az egységet', fix: 'Óvatosan, kézzel vagy seprűvel takarítsd el a havat az egység körül (kikapcsolt állapotban). Az egység legyen megemelve, és ha az ereszről csöpög rá a víz, kapjon tetőt vagy védőelemet, amely a légáramlást nem akadályozza.', level: 'ok' }
  }
});
