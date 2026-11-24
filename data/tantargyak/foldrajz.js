/* Tantárgy: Földrajz */
STUDIE.addSubject({
  id: 'foldrajz',
  stage: 'kozep',
  title: 'Földrajz',
  icon: '🌍',
  color: '#0e9aa7',
  description: 'Térképek, a Föld belseje, légkör és vizek, Magyarország tájai, népesség és fenntartható gazdaság.',
  intro: 'A földrajz a **Föld felszínének** és az ott élő embereknek a tudománya. Megtanulod olvasni a térképet, megérted, miért rengeti meg a földet egy földrengés, honnan jön az időjárás, merre folynak a folyók, milyen tájakból áll Magyarország, és hogyan élhet több mint nyolcmilliárd ember úgy, hogy az unokáinknak is jusson. Vegyél elő egy atlaszt: sokkal érdekesebb lesz!',
  lessons: [
    {
      id: 'terkep',
      title: 'Térképismeret és időzónák',
      level: 1, minutes: 14,
      summary: 'Méretarány, fokhálózat, földrajzi szélesség és hosszúság, időzónák: hogyan olvassunk térképet.',
      tags: ['térkép', 'méretarány', 'aránymérték', 'fokhálózat', 'szélességi kör', 'hosszúsági kör', 'Egyenlítő', 'Greenwich', 'időzóna', 'helyi idő', 'jelkulcs', 'szintvonal'],
      sections: [
        {
          title: 'A méretarány',
          text: 'A térkép a valóság **kicsinyített**, felülnézeti képe. A **méretarány** megmutatja, hányszorosára kicsinyítettünk. Az `1 : 50 000` azt jelenti, hogy a térképen 1 cm a valóságban 50 000 cm, vagyis **500 m**.\n\nÁtszámítás lépésről lépésre:\n\n1. Mérd meg a távolságot a térképen (pl. 6 cm).\n2. Szorozd meg a méretarány nevezőjével: `6 cm · 50 000 = 300 000 cm`.\n3. Váltsd át: `300 000 cm = 3000 m = 3 km`.\n\nVisszafelé osztunk: 12 km a valóságban egy `1 : 200 000`-es térképen `1 200 000 cm / 200 000 = 6 cm`.\n\nMinél **nagyobb** a nevező, annál **kisebb méretarányú** a térkép: kevesebb részletet, de nagyobb területet mutat (a világtérkép kis méretarányú, a turistatérkép nagy).',
          tip: 'Gyors fogás: húzz le két nullát a nevezőből, és megkapod, hány méter 1 cm. 1 : 25 000 → 1 cm = 250 m.'
        },
        {
          title: 'Gyakorlás: hosszúság-átváltás',
          text: 'A méretarányos számolás lényege a cm → m → km átváltás. Gyakorold, amíg gyorsan megy! (1 km = 1000 m, 1 m = 100 cm, tehát 1 km = 100 000 cm.)',
          widget: { type: 'gyakorlas', options: { kind: 'mertekegyseg', title: 'Mértékegység-átváltás' } }
        },
        {
          title: 'A fokhálózat',
          text: 'Hogy bármely pont helyét pontosan megadhassuk, a Földgömbre képzeletbeli vonalhálót rajzolunk:\n\n- **Szélességi körök**: az Egyenlítővel párhuzamos körök. Az **Egyenlítő** 0°, a sarkok 90°. A **földrajzi szélesség** megmutatja, mennyire van egy pont északra (é. sz.) vagy délre (d. sz.) az Egyenlítőtől.\n- **Hosszúsági körök (délkörök)**: a két sarkot összekötő félkörök. A **kezdő hosszúsági kör** a londoni Greenwich-en halad át (0°). A **földrajzi hosszúság** keletre (k. h.) és nyugatra (ny. h.) 180°-ig nő.\n\nPélda: Budapest földrajzi helyzete kb. **é. sz. 47,5°, k. h. 19°**.\n\nA térkép **jelkulcsa** megmagyarázza a jeleket és színeket. A domborzatot **szintvonalak** (azonos tengerszint feletti magasságú pontokat összekötő vonalak) és színek jelzik: zöld az alföld, barna a hegység, kék a víz.'
        },
        {
          title: 'Időzónák',
          text: 'A Föld 24 óra alatt fordul meg 360°-ot, tehát óránként `360° / 24 = 15°`-ot. Ezért a Földet 24 **időzónára** osztották, mindegyik kb. 15° széles. Keletre haladva óránként **egy órával később** van.\n\n- Magyarország a **közép-európai időzónában** van (UTC+1), nyári időszámítás idején UTC+2.\n- Londonban (UTC+0) eggyel kevesebb az óra: ha nálunk 14 óra van, ott 13.\n- New Yorkban (UTC−5) télen hat órával kevesebb: ha nálunk dél van, ott reggel 6 óra.\n\nA 180°-os hosszúsági kör közelében húzódik a **nemzetközi dátumválasztó vonal**: ha nyugatról keletre átléped, a naptárban egy napot visszalépsz.',
          tip: 'Ha két hely földrajzi hosszúsága 45°-kal különbözik, a helyi időjük `45 / 15 = 3` órával tér el.'
        }
      ],
      quiz: [
        { q: 'Egy 1 : 100 000 méretarányú térképen 4 cm a távolság. Mennyi ez a valóságban?', options: ['400 m', '40 km', '4 km', '4000 km'], answer: 2, explain: '4 · 100 000 = 400 000 cm = 4000 m = 4 km.' },
        { q: 'Hány fokos az Egyenlítő földrajzi szélessége?', options: ['0°', '90°', '180°', '23,5°'], answer: 0, explain: 'A földrajzi szélességet az Egyenlítőtől mérjük, ott 0°.' },
        { q: 'Hány fok széles nagyjából egy időzóna?', options: ['24°', '15°', '30°', '1°'], answer: 1, explain: '360° / 24 óra = 15° óránként.' },
        { q: 'Melyik térkép a nagyobb méretarányú?', options: ['1 : 1 000 000', '1 : 250 000', '1 : 10 000', '1 : 50 000 000'], answer: 2, explain: 'A kisebb nevező nagyobb méretarányt jelent: kevésbé kicsinyített, részletesebb térkép.' }
      ]
    },
    {
      id: 'fold-szerkezete',
      title: 'A Föld szerkezete és a lemeztektonika',
      level: 2, minutes: 15,
      summary: 'A Föld gömbhéjai, a kőzetlemezek mozgása, vulkánok és földrengések, valamint a földtörténet nagy eseményei.',
      tags: ['földkéreg', 'köpeny', 'földmag', 'kőzetburok', 'lemeztektonika', 'kőzetlemez', 'vulkán', 'földrengés', 'epicentrum', 'magnitúdó', 'hegységképződés', 'földtörténet', 'kőzet'],
      sections: [
        {
          title: 'A Föld gömbhéjai',
          text: 'A Föld sugara kb. **6370 km**. Belseje, mint egy hagyma, héjakból áll:\n\n- **Földkéreg**: a vékony, szilárd külső réteg. Az óceánok alatt kb. 5–10 km vastag, a kontinensek alatt átlagosan 30–40 km, a magas hegységek alatt akár 70 km.\n- **Földköpeny**: kb. 2900 km mélységig tart. Kőzetanyaga forró, és bár nagyrészt szilárd, rendkívül lassan „folyik”, áramlik.\n- **Külső mag**: folyékony vas és nikkel. Áramlásai hozzák létre a Föld **mágneses terét**.\n- **Belső mag**: a hatalmas nyomás miatt szilárd, hőmérséklete 5000 °C feletti.\n\nA földkéreg és a köpeny legfelső, merev része együtt a **kőzetburok** (litoszféra).'
        },
        {
          title: 'Vándorló kőzetlemezek',
          text: 'A kőzetburok nem egybefüggő: nagy **kőzetlemezekre** töredezett, amelyek a köpeny áramlásain évente néhány centimétert mozognak (kb. olyan gyorsan, ahogy a körmöd nő). Ez a **lemeztektonika**. A lemezhatárok háromfélék:\n\n- **Távolodó (széttartó)**: a lemezek eltávolodnak, közöttük magma tör fel, új óceáni kéreg képződik. Példa: az Atlanti-óceán közepén húzódó hátság, Izland.\n- **Közeledő (összetartó)**: a nehezebb óceáni lemez a másik alá bukik (Andok, Japán), vagy két kontinens ütközik és felgyűrődik (a **Himalája** így keletkezett, és ma is emelkedik).\n- **Elcsúszó**: a lemezek egymás mellett súrlódnak el, gyakran erős földrengésekkel (Szent András-törésvonal, Kalifornia).\n\nKb. 300 millió éve minden kontinens egyetlen őskontinenst, a **Pangeát** alkotta.'
        },
        {
          title: 'Vulkánok és földrengések',
          text: 'A vulkánok és a földrengések főként a **lemezhatárok** mentén fordulnak elő, például a Csendes-óceánt körülvevő **Tűzgyűrűben**.\n\n- **Vulkán**: a felszínre törő magma neve **láva**. A hígan folyó bazaltláva csendesen ömlik (pajzsvulkán, Hawaii), a sűrű, gázdús láva robbanásos kitörést okoz (rétegvulkán, Vezúv, Etna).\n- **Földrengés**: a lemezek feszültsége hirtelen oldódik fel. A kipattanás helye a mélyben a **rengésfészek** (hipocentrum), fölötte a felszínen a **rengésközpont** (epicentrum). Az erősségét **magnitúdóval** mérjük: egy egységnyi növekedés kb. 32-szer több felszabaduló energiát jelent.\n\nA Kárpát-medencében is vannak kisebb földrengések, és egykor vulkánok is működtek: a Balaton-felvidék tanúhegyei (Badacsony, Szent György-hegy) kihűlt vulkánok maradványai.',
          warn: 'Földrengéskor bent maradj: bújj erős asztal alá, védd a fejed, és tarts távol az ablakoktól. Rengés közben ne használj liftet!'
        },
        {
          title: 'A földtörténet órája',
          text: 'A Föld kb. **4,6 milliárd** éves. Ilyen hatalmas időtávot nehéz elképzelni: ha a Föld történetét egyetlen napba sűrítenénk, az ember az utolsó néhány másodpercben jelenne meg. Az idővonalon az évszámok **millió években** értendők.\n\nA kőzetek is mesélnek: a **magmás** kőzetek (gránit, bazalt) megszilárdult magmából, az **üledékes** kőzetek (mészkő, homokkő) lerakódott üledékből, az **átalakult** kőzetek (márvány) nagy nyomáson és hőmérsékleten jöttek létre.',
          widget: { type: 'idovonal', options: { title: 'A Föld története (millió években)', events: [
            { year: -4600, label: 'kb. 4600 millió éve', title: 'A Föld kialakulása', text: 'A fiatal Nap körüli por- és gázfelhőből összeáll a Föld. Felszíne kezdetben izzó.' },
            { year: -3800, label: 'kb. 3800 millió éve', title: 'Az első élőlények', text: 'Az óceánokban megjelennek az első egysejtű élőlények. Ősi nyomaik a legrégebbi kőzetekben maradtak meg.' },
            { year: -2400, label: 'kb. 2400 millió éve', title: 'Oxigén a légkörben', text: 'A fotoszintetizáló kékbaktériumok oxigénje felhalmozódik a légkörben.' },
            { year: -540, label: 'kb. 540 millió éve', title: 'Kambriumi „robbanás”', text: 'Rövid idő alatt rengeteg új, kemény vázas állatcsoport jelenik meg a tengerekben.' },
            { year: -300, label: 'kb. 300 millió éve', title: 'Pangea', text: 'A kontinensek egyetlen őskontinenssé, Pangeává állnak össze. Ekkor keletkeznek a nagy kőszéntelepek is.' },
            { year: -230, label: 'kb. 230 millió éve', title: 'Az első dinoszauruszok', text: 'Megjelennek a dinoszauruszok, és mintegy 165 millió évig uralják a szárazföldeket.' },
            { year: -66, label: 'kb. 66 millió éve', title: 'A dinoszauruszok kihalása', text: 'Egy hatalmas kisbolygó becsapódása (és a vulkáni tevékenység) tömeges kihalást okoz.' },
            { year: -50, label: 'kb. 50 millió éve', title: 'A Himalája gyűrődése', text: 'Az Indiai-lemez nekiütközik az Eurázsiai-lemeznek, és felgyűrődik a Himalája.' },
            { year: -10, label: 'kb. 10 millió éve', title: 'A Pannon-tó', text: 'A Kárpát-medencét beltó tölti ki. Üledékeiből lett később az Alföld talapzata, itt keletkezett a lignit és a földgáz egy része is.' },
            { year: -0.3, label: 'kb. 300 ezer éve', title: 'A mai ember megjelenése', text: 'Afrikában megjelenik a Homo sapiens.' },
            { year: -0.0117, label: 'kb. 11 700 éve', title: 'A jégkorszak vége', text: 'Véget ér az utolsó eljegesedés, kezdődik a mai, enyhébb időszak.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik gömbhéj folyékony halmazállapotú?', options: ['A külső mag', 'A belső mag', 'A földkéreg', 'Egyik sem'], answer: 0, explain: 'A külső mag olvadt vas és nikkel. A belső mag a hatalmas nyomás miatt szilárd.' },
        { q: 'Hogyan keletkezett a Himalája?', options: ['Vulkánkitörésekből', 'Két kontinentális lemez ütközésével', 'Két lemez távolodásával', 'Folyók hordalékából'], answer: 1, explain: 'Az Indiai-lemez az Eurázsiai-lemeznek ütközött, a kőzetek felgyűrődtek.' },
        { q: 'Mi az epicentrum?', options: ['A rengésfészek a mélyben', 'A vulkán krátere', 'A rengésfészek fölötti felszíni pont', 'A lemezhatár'], answer: 2, explain: 'Az epicentrum (rengésközpont) a felszínen, közvetlenül a hipocentrum fölött van.' },
        { q: 'Milyen kőzet a gránit?', options: ['Üledékes', 'Átalakult', 'Szerves eredetű', 'Magmás'], answer: 3, explain: 'A gránit a mélyben lassan megszilárdult magmából keletkezett.' }
      ]
    },
    {
      id: 'legkor',
      title: 'Légkör, időjárás, éghajlat',
      level: 2, minutes: 14,
      summary: 'A légkör összetétele és rétegei, az időjárás elemei, az éghajlati övezetek.',
      tags: ['légkör', 'troposzféra', 'ózonréteg', 'időjárás', 'éghajlat', 'légnyomás', 'szél', 'csapadék', 'éghajlati öv', 'passzát', 'monszun', 'üvegházhatás', 'klímaváltozás'],
      sections: [
        {
          title: 'A légkör összetétele és rétegei',
          text: 'A Földet vékony gázburok, a **légkör** veszi körül. Száraz levegőben:\n\n- **nitrogén**: kb. 78%\n- **oxigén**: kb. 21%\n- **argon**: kb. 0,9%\n- **szén-dioxid**: kb. 0,04% (kevés, de nagyon fontos az üvegházhatás miatt)\n\nEhhez jön még változó mennyiségű **vízgőz**. A légkör rétegei alulról:\n\n1. **Troposzféra** (kb. 10–12 km-ig, az Egyenlítőnél magasabb): itt zajlik az időjárás. Felfelé haladva kb. **6 °C-kal hűl kilométerenként**.\n2. **Sztratoszféra** (kb. 50 km-ig): itt van az **ózonréteg**, amely kiszűri a Nap káros UV-sugárzásának nagy részét.\n3. **Mezoszféra** és **termoszféra**: egyre ritkább levegő; itt égnek el a hullócsillagok, és itt keletkezik a sarki fény.',
          tip: 'Ha a Kékes (1014 m) lábánál 20 °C van, a csúcson nagyjából 20 − 6 = 14 °C várható.'
        },
        {
          title: 'Időjárás vagy éghajlat?',
          text: '- Az **időjárás** a légkör **pillanatnyi** állapota egy adott helyen: hőmérséklet, légnyomás, szél, felhőzet, csapadék. Óráról órára változhat.\n- Az **éghajlat** egy terület **hosszú távú** (legalább 30 év) jellemző időjárása.\n\n„Holnap esni fog” → időjárás. „A Szaharában ritkán esik az eső” → éghajlat.\n\nAz időjárás motorja a **Nap**: egyenetlenül melegíti a felszínt. A meleg levegő felemelkedik (alacsony légnyomás, gyakran felhő és csapadék), a hideg süllyed (magas légnyomás, általában derült idő). A **szél** a magasabb nyomású helyről a kisebb nyomású felé fúj.'
        },
        {
          title: 'Az éghajlati övezetek',
          text: 'A napsugarak beesési szöge a szélességgel változik, ezért a Földön **övezetek** alakultak ki:\n\n- **Forró övezet** (a térítőkörök között): egyenlítői éghajlat (egész évben meleg és csapadékos, esőerdő), átmeneti éghajlat (esős és száraz évszak, szavanna), térítői sivatagi éghajlat (Szahara).\n- **Mérsékelt övezet**: meleg mérsékelt (mediterrán: száraz, forró nyár, enyhe, esős tél), valódi mérsékelt (óceáni, mérsékelten szárazföldi, szárazföldi), és hideg mérsékelt (tajga).\n- **Hideg övezet** (a sarkkörökön túl): sarkköri éghajlat (tundra) és sarkvidéki éghajlat (állandó jég).\n\nA trópusokon a térítők felől az Egyenlítő felé fújó állandó szelek a **passzátszelek**. Dél- és Kelet-Ázsiában az évszakosan irányt váltó **monszun** hozza az esős évszakot.'
        },
        {
          title: 'Üvegházhatás és éghajlatváltozás',
          text: 'Egyes gázok (szén-dioxid, metán, vízgőz) visszatartják a felszínről kisugárzott hő egy részét, mint egy üvegház teteje. E **természetes üvegházhatás** nélkül a Föld átlaghőmérséklete −18 °C körül lenne.\n\nA fosszilis tüzelőanyagok (szén, kőolaj, földgáz) elégetésével és az erdőirtással az ember megnövelte a légkör szén-dioxid-tartalmát. Ez erősíti az üvegházhatást: a Föld átlaghőmérséklete az ipari forradalom óta már több mint 1 °C-kal emelkedett. Következményei: gleccserek olvadása, tengerszint-emelkedés, gyakoribb hőhullámok és aszályok.'
        }
      ],
      quiz: [
        { q: 'Melyik gáz van a legnagyobb arányban a levegőben?', options: ['Oxigén', 'Szén-dioxid', 'Nitrogén', 'Argon'], answer: 2, explain: 'A levegő kb. 78%-a nitrogén, 21%-a oxigén.' },
        { q: 'A légkör melyik rétegében zajlik az időjárás?', options: ['Troposzféra', 'Sztratoszféra', 'Mezoszféra', 'Termoszféra'], answer: 0, explain: 'A legalsó, kb. 10–12 km vastag rétegben van a vízgőz szinte teljes mennyisége, itt képződnek a felhők.' },
        { q: 'Mi jellemző a mediterrán éghajlatra?', options: ['Egész évben csapadékos és meleg', 'Száraz, forró nyár és enyhe, csapadékos tél', 'Hideg, hosszú tél, rövid nyár', 'Állandó jég'], answer: 1, explain: 'A Földközi-tenger vidékén a nyár száraz és forró, a csapadék télen hullik.' },
        { q: 'Mi a különbség az időjárás és az éghajlat között?', options: ['Nincs különbség', 'Az éghajlat csak a hőmérséklettel foglalkozik', 'Az időjárás csak a csapadékkal foglalkozik', 'Az időjárás pillanatnyi állapot, az éghajlat hosszú távú jellemző'], answer: 3, explain: 'Az éghajlatot legalább 30 év adataiból állapítjuk meg.' }
      ]
    },
    {
      id: 'vizburok',
      title: 'A vízburok: óceánok, folyók, tavak',
      level: 2, minutes: 14,
      summary: 'A víz körforgása, az óceánok, a folyók munkája, a Duna és a Tisza, tavaink.',
      tags: ['vízburok', 'óceán', 'tenger', 'víz körforgása', 'folyó', 'vízgyűjtő', 'delta', 'Duna', 'Tisza', 'árvíz', 'belvíz', 'Balaton', 'tó', 'talajvíz', 'karsztvíz'],
      sections: [
        {
          title: 'A víz a Földön',
          text: 'A Föld felszínének kb. **71%-át víz** borítja, ezért nevezik „kék bolygónak”. A víz azonban nagyrészt **sós**:\n\n- kb. **97%** az óceánokban és tengerekben van,\n- csak kb. **3%** édesvíz, és ennek is kb. kétharmada jégbe zárva (Antarktisz, Grönland, gleccserek),\n- a folyók és tavak vize ennek is csak apró töredéke.\n\nA víz **körforgásban** van: a Nap melege elpárologtatja (főleg az óceánokból), a vízgőz felemelkedik, lehűl és felhővé csapódik le, majd **csapadékként** visszahullik. A szárazföldre hullott víz folyókban, illetve a talajba szivárogva (talajvíz, karsztvíz) jut vissza a tengerbe.'
        },
        {
          title: 'Óceánok és tengerek',
          text: 'Az óceánok közül a legnagyobb és legmélyebb a **Csendes-óceán**: itt van a **Mariana-árok**, a Föld legmélyebb pontja (közel 11 000 m). Utána következik az **Atlanti-** és az **Indiai-óceán**, valamint a **Déli-óceán** és a **Jeges-tenger** (régebben ezeket nem mindig tekintették önálló óceánnak).\n\nA tengervíz átlagosan kb. 3,5% sót tartalmaz. Az óceánokban hatalmas **tengeráramlások** keringenek. A meleg **Golf-áramlat** és folytatása, az Észak-atlanti-áramlás teszi Nyugat-Európa éghajlatát enyhébbé, mint ami a földrajzi szélességéből következne.'
        },
        {
          title: 'A folyók munkája',
          text: 'A folyó a **forrásától** a **torkolatáig** halad. Egy folyó és mellékfolyói **vízgyűjtő területről** gyűjtik a vizet.\n\n1. **Felső szakasz** (hegyvidék): nagy esés, gyors folyás, a folyó **bevágódik**, V alakú völgyet és szurdokot váj, köveket görget.\n2. **Középső szakasz**: kisebb esés, a folyó szállítja a hordalékot, kanyarogni kezd.\n3. **Alsó szakasz** (síkság): lassú folyás, a folyó **lerakja** hordalékát, kanyarulatokat (meandereket) és szigeteket épít.\n\nA torkolat lehet **delta** (a hordalék szárazulatot épít, a folyó ágakra szakad, pl. a Duna-delta) vagy **tölcsértorkolat** (az árapály kisöpri a hordalékot, pl. a Temze).'
        },
        {
          title: 'A Duna, a Tisza és tavaink',
          text: '- **Duna**: Európa második leghosszabb folyója (kb. 2850 km). A németországi Fekete-erdőben ered, tíz országon halad át, és deltával ömlik a **Fekete-tengerbe**. Magyarországi szakasza kb. 417 km.\n- **Tisza**: a Kárpátokban (Máramarosban) ered, és Szerbiában ömlik a Dunába. A 19. századi **folyószabályozás** (Széchenyi István kezdeményezésére, Vásárhelyi Pál tervei alapján) során levágták kanyarulatai egy részét, így jelentősen megrövidült. Ma kb. 960 km hosszú.\n- **Árvíz**: a hóolvadás és a sok eső miatt a folyó kilép a medréből; ellene gátakkal védekezünk. **Belvíz**: a síkságon a talaj nem tudja elnyelni a vizet, és az a mélyedésekben megáll.\n- **Balaton**: Közép-Európa legnagyobb tava (kb. 600 km²), átlagosan mindössze kb. 3 m mély, ezért nyáron gyorsan felmelegszik. Egyetlen jelentős befolyója a **Zala**, lefolyása a Sió-csatorna.\n- **Hévízi-tó**: a világ egyik legnagyobb, fürdésre alkalmas, természetes termálvizű tava.',
          tip: 'A Duna Magyarországon a Dunakanyarnál fordul észak–déli irányba: itt töri át a Visegrádi-hegység és a Börzsöny vulkáni hegyei között.'
        }
      ],
      quiz: [
        { q: 'A Föld vizének kb. hány százaléka sós víz?', options: ['50%', '71%', '97%', '3%'], answer: 2, explain: 'A víz kb. 97%-a az óceánokban és tengerekben van. A 71% a vízzel borított felszín aránya.' },
        { q: 'Hová torkollik a Duna?', options: ['Az Adriai-tengerbe', 'A Fekete-tengerbe', 'Az Északi-tengerbe', 'A Tiszába'], answer: 1, explain: 'A Duna Romániánál, deltatorkolattal ömlik a Fekete-tengerbe. Fordítva igaz: a Tisza ömlik a Dunába.' },
        { q: 'Mi jellemző a folyó felső szakaszára?', options: ['Lassú folyás, meanderek', 'Delta építése', 'Hordaléklerakás', 'Gyors folyás, mélyítő munka, V alakú völgy'], answer: 3, explain: 'A nagy esés miatt a folyó gyors, és bevágódik a medrébe.' },
        { q: 'Melyik a Föld legmélyebb pontja?', options: ['A Mariana-árok', 'A Balaton', 'A Holt-tenger partja', 'A Bajkál-tó'], answer: 0, explain: 'A Csendes-óceánban lévő Mariana-árok közel 11 000 m mély.' }
      ]
    },
    {
      id: 'magyarorszag',
      title: 'Magyarország földrajza',
      level: 2, minutes: 16,
      summary: 'Fekvés, nagytájak, éghajlat, vizek és ásványkincsek: a Kárpát-medence szívében.',
      tags: ['Magyarország', 'Kárpát-medence', 'nagytáj', 'Alföld', 'Kisalföld', 'Dunántúl', 'Északi-középhegység', 'Kékes', 'Balaton', 'éghajlat', 'ásványkincs', 'bauxit', 'lignit', 'termálvíz', 'nemzeti park'],
      sections: [
        {
          title: 'Fekvés és alapadatok',
          text: 'Magyarország Közép-Európában, a **Kárpát-medence** közepén fekszik. Tengerpartja nincs. Hét országgal határos: Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország és Szlovénia.\n\n- **Terület**: kb. 93 000 km²\n- **Népesség**: kb. 9,6 millió fő (2022)\n- **Legmagasabb pont**: a **Kékes** (1014 m) a Mátrában\n- **Legalacsonyabb pont**: Gyálarét, Szeged mellett (kb. 76 m)\n- **Főváros**: Budapest\n\nAz ország nagy része **alacsonyan** fekszik: területének nagyobb része 200 m alatti síkság.'
        },
        {
          title: 'A hat nagytáj',
          text: '1. **Alföld** (Nagyalföld): az ország felénél is nagyobb síkság. A folyók hordalékából épült fel; jellemzői a futóhomok (Duna–Tisza köze), a szikesek és a puszták (Hortobágy). Kiváló termőtalaj, mezőgazdaság.\n2. **Kisalföld**: az ország északnyugati síksága, a Duna hordalékkúpján. Termékeny, sűrűn lakott.\n3. **Alpokalja**: az Alpok nyúlványai a nyugati határnál (Kőszegi-hegység, Írott-kő). Csapadékos, erdős.\n4. **Dunántúli-dombság**: a Zalai-dombság, Somogy, Tolna és Baranya dombjai; ide tartozik a Mecsek és a Villányi-hegység is.\n5. **Dunántúli-középhegység**: Keszthelyi-hegység, Bakony, Vértes, Gerecse, Pilis, Budai-hegység. Főként mészkő és dolomit, sok barlang és karsztforrás.\n6. **Északi-középhegység**: Visegrádi-hegység, Börzsöny, Cserhát, Mátra, Bükk, Zempléni-hegység. Nagy része **vulkáni** eredetű (a Bükk nagyrészt mészkő).\n\nA **Dunántúl** a Dunától nyugatra eső országrész: az Alpokalja, a Kisalföld, a Dunántúli-dombság és a Dunántúli-középhegység tartozik ide.',
          tip: 'Térképen keresd meg: a Balaton a Dunántúli-középhegység (Bakony, Balaton-felvidék) és a Dunántúli-dombság (Somogy) között fekszik.'
        },
        {
          title: 'Éghajlat',
          text: 'Magyarország éghajlata **mérsékelten szárazföldi**, amelyet három hatás alakít:\n\n- **óceáni** (nyugat felől): kiegyenlített hőmérséklet, több csapadék (Alpokalja: 800 mm/év felett is),\n- **szárazföldi** (kelet felől): nagy hőingás, hideg tél, forró nyár, kevesebb csapadék (Alföld közepe: kb. 500 mm/év),\n- **mediterrán** (dél felől): őszi csapadékmaximum, enyhébb tél (Mecsek környéke).\n\nAz évi átlagos csapadék kb. 600 mm, a napsütéses órák száma évente kb. 1800–2100. A legnaposabb vidék a **Szeged** környéki Dél-Alföld. A leggyakoribb szélirány az **északnyugati**.'
        },
        {
          title: 'Ásványkincsek és vizek',
          text: 'Ásványkincseink nagy része mára kimerült vagy gazdaságtalanná vált, de néhány ma is fontos:\n\n- **Bauxit** (alumíniumérc): a Bakonyban és a Vértesben (pl. Gánt, Halimba).\n- **Lignit** (gyenge minőségű szén): a Mátraalján (Visonta) és Bükkábránynál, hőerőművi tüzelésre.\n- **Kőolaj és földgáz**: főként az Alföldön (pl. Algyő).\n- **Feketeszén**: a Mecsekben bányászták (ma már nem).\n- **Mangánérc**: Úrkút (Bakony).\n- **Építőanyagok**: mészkő, homok, kavics, andezit.\n\nIgazi kincsünk a **termál- és gyógyvíz**: a Kárpát-medence alatt vékony a földkéreg, ezért a mélyben különösen meleg a víz. Híres fürdőink: Hévíz, Hajdúszoboszló, Bük, Harkány, Zalakaros, Budapest gyógyfürdői.\n\nTermészeti értékeink védelmére **10 nemzeti parkot** hoztunk létre, például a Hortobágyi (az első, 1973), a Kiskunsági, a Bükki és az Aggteleki Nemzeti Parkot (utóbbi barlangjai a világörökség részei).'
        }
      ],
      quiz: [
        { q: 'Melyik Magyarország legmagasabb pontja?', options: ['Írott-kő', 'Kékes', 'Istállós-kő', 'Dobogókő'], answer: 1, explain: 'A Mátrában lévő Kékes 1014 m magas.' },
        { q: 'Melyik ásványkincset bányásszák a Bakonyban?', options: ['Bauxit', 'Kőolaj', 'Lignit', 'Feketeszén'], answer: 0, explain: 'A Bakony és a Vértes bauxitja az alumíniumgyártás nyersanyaga.' },
        { q: 'Milyen az ország éghajlata?', options: ['Mediterrán', 'Óceáni', 'Mérsékelten szárazföldi', 'Sarkköri'], answer: 2, explain: 'Mérsékelten szárazföldi, óceáni, szárazföldi és mediterrán hatásokkal.' },
        { q: 'Melyik nagytáj a legnagyobb kiterjedésű?', options: ['Dunántúli-középhegység', 'Kisalföld', 'Alpokalja', 'Alföld'], answer: 3, explain: 'Az Alföld az ország területének több mint a felét foglalja el.' }
      ]
    },
    {
      id: 'nepesseg-gazdasag',
      title: 'Népesség, városok, gazdaság és fenntarthatóság',
      level: 3, minutes: 15,
      summary: 'Hányan vagyunk és hol élünk, hogyan működik a gazdaság, és mit jelent a fenntartható fejlődés.',
      tags: ['népesség', 'népsűrűség', 'urbanizáció', 'város', 'migráció', 'gazdasági ágazat', 'mezőgazdaság', 'ipar', 'szolgáltatás', 'GDP', 'energia', 'megújuló energia', 'fenntarthatóság', 'ökológiai lábnyom', 'hulladék'],
      sections: [
        {
          title: 'A világ népessége',
          text: 'A Föld népessége 2022-ben lépte át a **8 milliárdot**. Kétezer éve még csak kb. 250–300 millióan voltunk; a gyors növekedés az elmúlt 200 évben következett be, a jobb táplálkozás, a tiszta víz és az orvostudomány fejlődése miatt.\n\nA népesség egyenlőtlenül oszlik el. A **népsűrűség** megmutatja, hányan élnek átlagosan egy négyzetkilométeren:\n\n`népsűrűség = népesség / terület`\n\nPélda: Magyarország: `9 600 000 fő / 93 000 km² ≈ 103 fő/km²`. A legnépesebb országok India és Kína (mindkettő 1,4 milliárd fő felett), a legsűrűbben lakottak a kis városállamok (pl. Monaco, Szingapúr).\n\nSok fejlődő országban fiatal és gyorsan növekvő a népesség, a fejlett országokban (így nálunk is) **öregedő** és csökkenő.'
        },
        {
          title: 'Városok és városiasodás',
          text: 'Ma a világ népességének több mint fele **városokban** él, és ez az arány nő: ez az **urbanizáció** (városiasodás). Az emberek munka, oktatás és szolgáltatások miatt költöznek a városokba.\n\nA városok gondjai: forgalmi dugók, légszennyezés, drága lakások, nyomornegyedek a gyorsan növő nagyvárosok szélén. Előnyeik: munkahelyek, iskolák, kórházak, kultúra egy helyen.\n\nMagyarországon **Budapest** a legnagyobb város (kb. 1,7 millió lakos), az ország lakosságának mintegy hatoda él itt. További nagyvárosaink: Debrecen, Szeged, Miskolc, Pécs, Győr.'
        },
        {
          title: 'A gazdaság ágazatai',
          text: '- **Elsődleges (primer) szektor**: a természetből közvetlenül nyert javak: mezőgazdaság, erdőgazdálkodás, halászat, bányászat.\n- **Másodlagos (szekunder) szektor**: feldolgozás: ipar és építőipar (pl. autógyártás Győrben, Kecskeméten, Debrecenben).\n- **Harmadlagos (tercier) szektor**: szolgáltatások: kereskedelem, közlekedés, oktatás, egészségügy, turizmus, bankok, informatika.\n\nMinél fejlettebb egy ország, annál többen dolgoznak a szolgáltatásokban: Magyarországon a foglalkoztatottak kb. kétharmada. Egy ország gazdasági teljesítményét gyakran a **GDP-vel** (bruttó hazai termék) mérjük: ez az egy év alatt előállított összes termék és szolgáltatás értéke.\n\nSzázalékszámítással sok gazdasági adatot megértesz. Gyakorold!',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás' } }
        },
        {
          title: 'Fenntartható fejlődés',
          text: 'A **fenntartható fejlődés** azt jelenti, hogy úgy elégítjük ki a mai igényeinket, hogy a **jövő nemzedékek** is kielégíthessék a sajátjukat. Az **ökológiai lábnyom** megmutatja, mekkora termőterület kellene egy ember fogyasztásának fenntartásához; ha mindenki úgy élne, mint egy átlagos európai, több Földre lenne szükség.\n\nMegoldások:\n\n- **Megújuló energiaforrások**: nap, szél, víz, geotermikus energia, biomassza. Magyarországon gyorsan nő a napelemek szerepe, a villamos energia közel felét pedig a **paksi atomerőmű** termeli (ez szén-dioxid-kibocsátás nélküli, de nem megújuló).\n- **Hulladékcsökkentés**: a sorrend fontos: kevesebb vásárlás, újrahasználat, és csak utána **szelektív gyűjtés** és újrahasznosítás.\n- **Takarékos víz- és energiahasználat**, tömegközlekedés, kerékpár.\n- **Helyi termékek** választása: kevesebb szállítás, kevesebb kibocsátás.',
          tip: 'Gondold végig egy napodat: hol tudnál energiát, vizet vagy csomagolást megtakarítani? Egy kis változás milliószor ismételve nagy hatású.'
        }
      ],
      quiz: [
        { q: 'Mit mutat meg a népsűrűség?', options: ['Hány ember él egy országban', 'Hány ember él átlagosan 1 km²-en', 'Hány gyerek születik évente', 'Hányan élnek városokban'], answer: 1, explain: 'Népsűrűség = népesség / terület, mértékegysége fő/km².' },
        { q: 'Melyik a tercier (harmadlagos) szektorhoz tartozik?', options: ['Búzatermesztés', 'Autógyártás', 'Turizmus', 'Szénbányászat'], answer: 2, explain: 'A turizmus szolgáltatás. A búza és a bányászat primer, az autógyártás szekunder.' },
        { q: 'Melyik NEM megújuló energiaforrás?', options: ['Napenergia', 'Szélenergia', 'Geotermikus energia', 'Földgáz'], answer: 3, explain: 'A földgáz fosszilis energiahordozó: évmilliók alatt keletkezett, emberi léptékkel nem pótlódik.' },
        { q: 'Mit jelent az urbanizáció?', options: ['Városiasodást: egyre többen élnek városokban', 'Az erdők telepítését', 'A falvak növekedését', 'A népesség csökkenését'], answer: 0, explain: 'Ma a világ népességének több mint fele városlakó.' }
      ]
    }
  ]
});
