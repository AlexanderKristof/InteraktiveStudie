/* Tantárgy: Sport és tudomány – a sport fizikája, élettana, edzéselmélete, pszichológiája és története
 * Tudományos, motiváló, nem bulvár: rekordok, technika, test és fej. */
STUDIE.addSubject({
  id: 'sport',
  stage: 'sport',
  title: 'Sport és tudomány',
  icon: '🏅',
  color: '#e8590c',
  description: 'A foci, a Forma–1, a kosárlabda, az úszás és az atlétika tudománya: fizika, élettan, edzés, táplálkozás, sportpszichológia és az olimpiák története.',
  intro: 'Miért kanyarodik a szabadrúgás? Hogyan bír ki egy F1-pilóta 5 g-t? Mi ad energiát az első 10 másodpercben, és mi a 42. kilométeren? Ebben a tantárgyban a kedvenc sportjaidat **a tudomány szemüvegén át** nézzük: fizika, biológia, kémia és pszichológia egyszerre.\n\nA leckékben **valódi számok és képletek** vannak, és igazi sportolók története – nem pletykák, hanem az, **hogyan** lettek jók: edzés, kitartás, okos módszerek. A végén minden leckéhez kvíz tartozik, a Tesztközpontban pedig még sok gyakorlókérdés vár.\n\nEgy fontos szabály végig: **az egészséged az első**. Bemelegítés, elég alvás, rendes étkezés, és ha valami fáj vagy fejsérülés gyanúja van, **állj ki**!',
  lessons: [
    {
      id: 'foci-fizika',
      title: 'A foci fizikája',
      level: 1, minutes: 16,
      summary: 'Rúgás, ívelés, Magnus-erő, légellenállás és a tizenegyes másodperctörtjei – a labdarúgás mögötti fizika.',
      tags: ['labdarúgás', 'foci', 'Magnus-erő', 'csavart labda', 'légellenállás', 'impulzus', 'ferde hajítás', 'tizenegyes', 'szabadrúgás', 'Puskás Ferenc', 'fejelés', 'agyrázkódás'],
      terms: ['fizika-bsc/impulzus', 'fizika-bsc/impulzusmomentum', 'e-mobilitas/legellenallas'],
      sections: [
        {
          title: 'A labda és a rúgás: erő és impulzus',
          text: 'A szabályos (5-ös méretű) futball-labda kerülete **68–70 cm**, tömege **410–450 g**. Egy erős lövésnél a labda akár **30 m/s** (kb. 108 km/h) sebességgel is elhagyhatja a cipőt – pedig a láb csak kb. **0,01 másodpercig** (10 ms) érintkezik vele!\n\nMekkora erő kell ehhez? Newton II. törvénye impulzus alakban:\n\n`F · Δt = m · Δv`\n\n`F = 0,43 kg · 30 m/s / 0,01 s ≈ 1300 N`\n\nEz kb. egy 130 kg-os test súlya – ennyi átlagerő hat a labdára ebben a rövid pillanatban. Newton III. törvénye szerint ugyanekkora erő hat vissza a lábadra is, ezért fontos a **jó technika** (a lábfej feszes, a boka stabil).\n\nA rúgás sebessége a **lábfej sebességén** múlik: a profik lába a rúgás pillanatában kb. 20 m/s-mal mozog, és a labda ennél gyorsabban, akár 1,2–1,5-szer sebesebben repül el, mert a labda rugalmasan „lepattan” a lábfejről.',
          tip: 'Az erős lövés titka nem a nagy izomtömeg, hanem a **láncszerű mozgás**: csípő → comb → lábszár → lábfej. Minden szegmens gyorsítja a következőt, mint egy ostorcsapás.'
        },
        {
          title: 'Ferde hajítás: hová esik a labda?',
          text: 'Ha a légellenállást elhanyagoljuk, a felívelt labda **parabola** pályán repül. Vízszintesen egyenletesen halad, függőlegesen a gravitáció lassítja, majd gyorsítja:\n\n`x = v₀ · cos α · t`\n`y = v₀ · sin α · t − ½ · g · t²`\n\nA vízszintes repülési távolság (talajról talajra):\n\n`R = v₀² · sin(2α) / g`\n\n**Kidolgozott példa:** egy kapus 25 m/s-mal, 30°-os szögben rúgja ki a labdát. `R = 625 · sin 60° / 9,81 = 625 · 0,866 / 9,81 ≈ 55 m`. A valóságban a légellenállás miatt ennél rövidebb lesz.\n\nLevegő nélkül a **45°** adná a legnagyobb távolságot. A valóságban a labdára jelentős légellenállás hat, ezért a legnagyobb távolságot inkább kisebb (kb. 30–40°-os) szögben lehet elérni.',
          widget: { type: 'hajitas' }
        },
        {
          title: 'Légellenállás: a levegő nem „semmi”',
          text: 'A levegő fékezi a labdát. A **közegellenállási erő**:\n\n`F_d = ½ · ρ · v² · c_w · A`\n\nahol `ρ ≈ 1,2 kg/m³` a levegő sűrűsége, `v` a sebesség, `c_w` az alaktényező, `A` a homlokfelület (a labdánál `A ≈ 0,038 m²`).\n\nSzámoljunk 30 m/s-nál, `c_w ≈ 0,25` értékkel:\n\n`F_d = 0,5 · 1,2 · 900 · 0,25 · 0,038 ≈ 5 N`\n\nA labda súlya `0,43 kg · 9,81 m/s² ≈ 4,2 N` – vagyis egy erős lövésnél **a légellenállás nagyobb, mint a labda súlya**! Ezért lassul olyan látványosan a hosszú átadás vége felé.\n\nÉrdekesség: egy bizonyos sebesség fölött a labda körül a határréteg **turbulenssé** válik, és a `c_w` hirtelen lecsökken (ez a **„drag crisis”**, ellenállás-válság). A labdák varrásai és panelmintázata erősen befolyásolják, mikor következik be – ezért „viselkedik” minden világbajnoki labda kicsit másképp.',
          tip: 'Mivel `F_d` a sebesség **négyzetével** nő, a kétszer gyorsabb labdát négyszer akkora erő fékezi.'
        },
        {
          title: 'A csavart labda és a Magnus-erő',
          text: 'Ha a labdát oldalra csavarva rúgod meg, **pörögni** kezd. A pörgő labda az egyik oldalán együtt mozgatja a levegőt az áramlással, a másikon szemben vele. A levegő emiatt eltérül, és a labdára oldalirányú erő hat – ez a **Magnus-erő**:\n\n`F_M ≈ ½ · ρ · v² · C_L · A`\n\nahol `C_L` a felhajtóerő-tényező, ami a pörgés gyorsaságától függ (tipikusan 0,2–0,3 egy jól csavart lövésnél).\n\n**Becslés:** 30 m/s-nál `C_L ≈ 0,25`-tel `F_M ≈ 5 N`. A labda oldalgyorsulása `a = F/m ≈ 5 / 0,43 ≈ 12 m/s²`. Egy 25 m-es szabadrúgás kb. 0,85 s alatt ér kapura, így az oldalirányú elmozdulás `s = ½ · a · t² ≈ 0,5 · 12 · 0,72 ≈ 4 m`. **Méteres ív** – a sorfal mellett is beférhet!\n\nHíres példa **Roberto Carlos** 1997-es szabadrúgása Franciaország ellen: a labda előbb messze kifelé tartott, majd befordult. Francia fizikusok 2010-ben megmutatták, hogy a pörgő labda pályája a lassulás miatt **spirálszerűen** egyre jobban görbül – ezért tűnt úgy, mintha „késve” fordult volna be.\n\nA majdnem pörgés nélkül eltalált **„kanalazott” / knuckleball** lövés ennek az ellentéte: a szabálytalan örvényleválás miatt a labda kiszámíthatatlanul himbálózhat – a kapusok rémálma.',
          tip: 'Felülpörgetett (topspin) labdánál a Magnus-erő **lefelé** mutat: a labda hirtelen „bebukik” a léc alá. Alulpörgetésnél (backspin) felfelé, ezért száll tovább az ívelt beadás.'
        },
        {
          title: 'A tizenegyes: 0,4 másodperc',
          text: 'A büntetőpont **11 m-re** van a gólvonaltól, a kapu **7,32 m** széles és **2,44 m** magas. Egy 100 km/h-s (≈ 27,8 m/s) lövés kb.\n\n`t = 11 m / 27,8 m/s ≈ 0,4 s`\n\nalatt ér a vonalra. Egy ember egyszerű vizuális reakcióideje kb. 0,2 s, és utána még a kapusnak el is kell vetődnie a sarokig (kb. 3,7 m oldalra). Erre nincs idő! Ezért a kapusok **előre olvasnak**: a rúgó csípőjét, támaszlábát és nekifutását figyelik, és gyakran már a rúgás pillanatában elindulnak.\n\nA kapusok és a rúgók közötti „játék” ma már **adatelemzés** is: a csapatok elemzik, ki merre szokott lőni. A legjobb rúgók viszont pont ezért változtatnak.\n\nA magyar foci legnagyobb alakja, **Puskás Ferenc** az Aranycsapattal 1952-ben olimpiai bajnok lett, 1953-ban pedig 6:3-ra nyertek Angliában a Wembleyben. A válogatottban **85 mérkőzésen 84 gólt** szerzett. Róla nevezték el a FIFA évente kiosztott **Puskás-díját**, amelyet az év legszebb góljáért adnak.'
        },
        {
          title: 'Biztonság: fejelés, agyrázkódás, bemelegítés',
          text: 'A foci kontaktsport, ezért néhány szabályt mindig tarts be:\n\n- **Bemelegítés** minden edzés és meccs előtt (pl. a FIFA 11+ programja: futás, dinamikus nyújtás, erősítés, ugrások). Vizsgálatok szerint a rendszeres alkalmazása jelentősen, akár harmadával-felével csökkentheti a sérülések számát.\n- **Sípcsontvédő** viselése kötelező.\n- A **fejelést** fiatal korban korlátozni kell: több országban (például az Egyesült Államokban és Angliában) a fiatalabb korosztályok edzésein tiltják vagy erősen korlátozzák.\n- **Agyrázkódás** jelei: fejfájás, szédülés, hányinger, zavartság, homályos látás, emlékezetkiesés. Ilyenkor **azonnal le kell jönni a pályáról**, és csak orvosi engedéllyel szabad visszatérni.',
          warn: '„Ha kétséges, állj ki!” Agyrázkódás után a második ütés különösen veszélyes lehet. Soha ne játssz tovább fejsérülés után csak azért, mert „nem akarod cserben hagyni a csapatot”.'
        }
      ],
      quiz: [
        { q: 'Egy 0,43 kg-os labda 0,01 s alatt 0-ról 30 m/s-ra gyorsul. Mekkora az átlagos erő?', options: ['12 900 N', '129 N', '13 N', '1290 N'], answer: 3, explain: 'F = m · Δv / Δt = 0,43 · 30 / 0,01 = 1290 N.' },
        { q: 'Mi okozza a csavart labda oldalirányú elkanyarodását?', options: ['A gravitáció', 'A Magnus-erő', 'A labda rugalmassága', 'A Föld forgása'], answer: 1, explain: 'A pörgő labda eltéríti a körülötte áramló levegőt, és ennek ellenereje, a Magnus-erő oldalra téríti a labdát.' },
        { q: 'Hogyan változik a légellenállás, ha a labda sebessége kétszeresére nő (minden más változatlan)?', options: ['Négyszeresére', 'Felére', 'Nem változik', 'Kétszeresére'], answer: 0, explain: 'F_d = ½ρv²c_wA: a sebesség négyzetével arányos, így 2² = 4-szeres lesz.' },
        { q: 'Légellenállás nélkül melyik kilövési szög adja a legnagyobb vízszintes távolságot?', options: ['45°', '30°', '60°', '90°'], answer: 0, explain: 'R = v²·sin(2α)/g, és sin(2α) 2α = 90°-nál, azaz α = 45°-nál maximális.' },
        { q: 'Kb. mennyi idő alatt ér a gólvonalra egy 100 km/h-s tizenegyes?', options: ['1,1 s', '0,4 s', '0,04 s', '4 s'], answer: 1, explain: '100 km/h ≈ 27,8 m/s; 11 m / 27,8 m/s ≈ 0,4 s.' },
        { q: 'Merre mutat a Magnus-erő egy felülpörgetett (topspin) labdánál?', options: ['Hátrafelé', 'Lefelé', 'Nincs ilyen erő', 'Felfelé'], answer: 1, explain: 'Topspinnél a Magnus-erő lefelé hat, ezért „bebukik” a labda.' },
        { q: 'Mi a teendő, ha egy játékosnál agyrázkódás gyanúja merül fel?', options: ['Azonnal ki kell állnia, és csak orvosi engedéllyel térhet vissza', 'Igyon vizet és játsszon tovább', 'A félidőben döntse el, folytatja-e', 'Fejeljen kevesebbet'], answer: 0, explain: '„Ha kétséges, állj ki!” – agyrázkódás után azonnali kiállás és orvosi vizsgálat kell.' },
        { q: 'Hány gólt szerzett Puskás Ferenc a magyar válogatottban?', options: ['65 gólt 70 meccsen', '48 gólt 52 meccsen', '101 gólt 90 meccsen', '84 gólt 85 meccsen'], answer: 3, explain: 'Puskás 85 válogatott mérkőzésen 84 gólt szerzett – ez elképesztő gólátlag.' }
      ]
    },
    {
      id: 'forma1',
      title: 'Forma–1: technika és fizika',
      level: 2, minutes: 18,
      summary: 'Leszorítóerő, g-erők, fékek, gumik, hibrid erőforrás és a pilóta teste – hogyan működik a világ leggyorsabb versenyautója?',
      tags: ['Forma–1', 'F1', 'leszorítóerő', 'aerodinamika', 'g-erő', 'centripetális gyorsulás', 'DRS', 'aktív aerodinamika', 'halo', 'hibrid', 'MGU-K', 'gumik', 'fékek', 'Hungaroring'],
      models: ['f1-auto'],
      terms: ['e-mobilitas/legellenallas', 'e-mobilitas/rekuperacio', 'e-mobilitas/gordulesi-ellenallas', 'fizika-bsc/munkatetel'],
      sections: [
        {
          title: 'Fordított repülőgép: a leszorítóerő',
          text: 'A repülőgép szárnya **felfelé** emeli a gépet. Az F1-es autó szárnyai fordítva állnak: **lefelé nyomják** az autót a pályára. Ez a **leszorítóerő** (downforce):\n\n`F = ½ · ρ · v² · c_L · A`\n\nahol `ρ ≈ 1,2 kg/m³` a levegő sűrűsége, `v` a sebesség, `c_L · A` pedig a szárnyak és a padló együttes „hatásos felülete”.\n\n**Becslés:** ha `c_L · A ≈ 4 m²` és `v = 70 m/s` (≈ 250 km/h):\n\n`F ≈ 0,5 · 1,2 · 4900 · 4 ≈ 11 800 N`\n\nAz autó (pilótával) kb. 770 kg-os, súlya kb. 7500 N. Nagy sebességen tehát a leszorítóerő **elérheti, sőt meghaladhatja az autó súlyát** – ezért mondják, hogy elméletben egy alagút mennyezetén is tudna menni (a gyakorlatban ezt soha nem próbálták ki).\n\nA leszorítóerő nagy része a **padlóból** jön: 2022 óta az autók alatt Venturi-csatornák vannak. Ahol a levegő a szűkülő csatornában felgyorsul, ott a nyomás lecsökken (Bernoulli-elv), és a nagyobb külső nyomás a pályához szívja az autót. Ez a **talajhatás** (ground effect).',
          tip: 'A leszorítóerő ára a **légellenállás**: minden szárny fékezi is az autót. A mérnökök pályánként döntenek – Monzában lapos szárnyak (nagy végsebesség), Monacóban meredekek (sok tapadás).'
        },
        {
          title: 'Kanyarok és g-erők',
          text: 'Kanyarodáskor az autónak **centripetális gyorsulás** kell:\n\n`a = v² / r`\n\n**Példa:** 216 km/h (60 m/s) egy 80 m sugarú kanyarban: `a = 3600 / 80 = 45 m/s² ≈ 4,6 g`.\n\nEzt az erőt a gumik és a pálya közötti **tapadási súrlódás** adja: `F_s ≤ μ · F_nyomó`. Egy utcai autó kb. 1 g-vel tud kanyarodni. Az F1-es autónál a nyomóerő = súly + leszorítóerő, ezért gyors kanyarokban **4–6 g**, erős fékezésnél kb. **5 g** lassulás is előfordul.\n\nMit jelent ez a pilótának? A sisakos fej tömege kb. 6–7 kg; 5 g-nél oldalirányban kb. **30–35 kg-nyi** erővel húzza a nyakat – kanyarról kanyarra, akár 1,5 órán át. Ezért a pilóták **célzott nyakizom-edzést** végeznek.',
          warn: 'A g-erő nem „játék”: a hirtelen nagy lassulások (ütközések) a test számára veszélyesek. Ezért van a pilótán HANS-nyakvédő, ezért erős a monocoque, és ezért szigorú a biztonsági szabályozás.'
        },
        {
          title: 'Az erőforrás: hibrid hajtás',
          text: 'A mai F1-es autót **1,6 literes V6-os turbómotor** és elektromos rendszer hajtja együtt. A **2026-os szabályokkal** nagyot változott az erőforrás:\n\n- a belső égésű motor kb. **400 kW**-ot ad, a villanymotor-generátor (**MGU-K**) pedig akár **350 kW**-ot (2025-ig csak 120 kW volt) – vagyis a teljesítmény **kb. fele elektromos**;\n- az **MGU-H** (a turbóra szerelt generátor) kikerült, mert drága és bonyolult volt;\n- az üzemanyag **100%-ban fenntartható** (nem kőolajból készül).\n\nAz MGU-K **fékezéskor generátorként** működik: a mozgási energiát elektromos energiává alakítja, és az akkumulátorba tölti (**rekuperáció**). Gyorsításkor visszaadja. Ugyanez az elv működik az elektromos autókban is.\n\nA hatásfok itt rendkívül magas: a legjobb F1-es erőforrások (az energia-visszanyeréssel együtt) az üzemanyag energiájának **kb. 50%-át** mozgássá alakítják, míg egy átlagos utcai benzinmotor csak kb. 30–35%-át.',
          tip: 'Nézd meg az [[f1-auto|F1-es autó 3D modelljét]] a Felfedezőben: kattints a turbóra, az MGU-K-ra és az akkumulátorra!'
        },
        {
          title: 'Előzés: a DRS-től az aktív aerodinamikáig',
          text: 'A szorosan követő autó a „piszkos”, örvényes levegőben veszít leszorítóerőt, ezért nehéz előzni. 2011 és 2025 között ebben a **DRS** (Drag Reduction System) segített: kijelölt egyenesekben, ha az üldöző 1 másodpercen belül volt, kinyithatta a hátsó szárny felső lapját. Kisebb lett a légellenállás, és kb. 10–15 km/h-val gyorsabban ment.\n\n**2026-tól** jött az **aktív aerodinamika**: az első és a hátsó szárny is állítható. Egyenesben „egyenes módban” laposabbra állnak (kisebb ellenállás), kanyarban „kanyar módban” meredekebbre (több leszorítóerő). Az előzést pedig egy külön **elektromos többletteljesítmény** segíti.\n\n**Fizika:** az egyenesben a végsebesség ott áll be, ahol a motor teljesítménye éppen fedezi a légellenállás leküzdését: `P = F_d · v = ½ · ρ · c_w · A · v³`. A teljesítmény a sebesség **köbével** nő – ezért kell olyan sok plusz teljesítmény néhány km/h végsebességhez.'
        },
        {
          title: 'Fékek, gumik, boxkiállás',
          text: '- **Fékek:** szén-szén tárcsák, amelyek erős fékezésnél akár **1000 °C** fölé is melegszenek. 300 km/h-ról kb. másfél–két másodperc alatt lassul le az autó 80 km/h-ra.\n- **Gumik:** a tapadás erősen függ a hőmérséklettől – a gumiknak egy szűk „munkaablakban” (kb. 100 °C körül) a legjobb a tapadásuk. Hidegen csúszósak, túlmelegedve gyorsan kopnak.\n- **Boxkiállás:** egy jól begyakorolt csapat **2–2,5 másodperc** alatt cseréli le mind a négy kereket (a leggyorsabb mért kiállás kb. 1,8 s volt, 2023-ban). Ez kb. 20 ember tökéletes csapatmunkája, amit a csapatok több száz próbán gyakorolnak.\n\nA **Hungaroringen** 1986 óta rendeznek Forma–1-es futamot; ez volt az első F1-es nagydíj a vasfüggöny mögött.'
        },
        {
          title: 'A pilóta teste és a biztonság',
          text: 'Egy F1-es futam élsportteljesítmény:\n\n- a pilóták pulzusa a verseny nagy részében **160–180/perc** körüli;\n- forró futamokon (pl. Szingapúrban) akár **2–3 kg** folyadékot is veszíthetnek izzadással;\n- reakcióidejük, koncentrációjuk és nyakizmaik edzettsége kulcsfontosságú.\n\n**Biztonság:** a pilóta egy rendkívül erős szénszálas cellában, a **monocoque**-ban ül. 2018 óta kötelező a **halo**, a pilóta feje fölötti titán védőkeret, amely terhelési próbán **kb. 125 kN** (kb. 12 tonna súlyának megfelelő) erőt is kibír. 2020-ban Bahreinben **Romain Grosjean** autója kettészakadt és kigyulladt, mégis szinte saját lábán szállt ki – a halo, a monocoque és a tűzálló ruha mentette meg.\n\nA kitartás példája **Niki Lauda**: 1976-ban súlyos égési sérüléseket szenvedett a Nürburgringen, és mindössze kb. hat héttel később már újra versenyzett – a világbajnoki címet végül egyetlen ponttal veszítette el, de később még kétszer világbajnok lett.',
          warn: 'A versenyzést csak zárt pályán, szabályok és felügyelet mellett szabad űzni. A közúton a gyorsulás és a hirtelen manőverek életveszélyesek – a fizika ott is ugyanaz, csak nincs halo és bukótér.'
        }
      ],
      quiz: [
        { q: 'Mi a szárnyak fő feladata egy F1-es autón?', options: ['Felemelni az autót', 'Hűteni a motort', 'Csökkenteni az autó tömegét', 'Lefelé nyomni az autót, hogy jobban tapadjon'], answer: 3, explain: 'A fordított szárnyprofil leszorítóerőt termel, ami nagyobb tapadást és gyorsabb kanyarodást ad.' },
        { q: 'Hogyan függ a leszorítóerő a sebességtől?', options: ['A sebesség négyzetével arányos', 'Független tőle', 'Egyenesen arányos vele', 'A sebesség köbével arányos'], answer: 0, explain: 'F = ½·ρ·v²·c_L·A – a sebesség négyzetével nő.' },
        { q: 'Mekkora a centripetális gyorsulás 50 m/s-nál egy 100 m sugarú kanyarban?', options: ['5 m/s²', '25 m/s²', '0,5 m/s²', '2500 m/s²'], answer: 1, explain: 'a = v²/r = 2500/100 = 25 m/s² ≈ 2,5 g.' },
        { q: 'Mit csinál az MGU-K fékezéskor?', options: ['Befecskendezi az üzemanyagot', 'Kinyitja a hátsó szárnyat', 'Hűti a fékeket', 'Generátorként energiát nyer vissza az akkumulátorba'], answer: 3, explain: 'Rekuperáció: a mozgási energia egy része elektromos energiaként az akkuba kerül.' },
        { q: 'Mi a halo?', options: ['Egy gumikeverék', 'Egy aerodinamikai elem a padlón', 'A pilóta feje fölötti titán védőkeret', 'A kormány kijelzője'], answer: 2, explain: 'A 2018 óta kötelező halo a pilóta fejét védi; Grosjean 2020-as balesetében is életet mentett.' },
        { q: 'A légellenállás leküzdéséhez szükséges teljesítmény hogyan függ a sebességtől?', options: ['Nem függ tőle', 'v³-nel', 'v²-tel', 'v-vel'], answer: 1, explain: 'P = F·v = ½·ρ·c_w·A·v³ – ezért kell nagyon sok plusz teljesítmény kevés végsebesség-növeléshez.' },
        { q: 'Mióta rendeznek F1-es futamot a Hungaroringen?', options: ['1996', '1986', '1966', '2006'], answer: 1, explain: '1986 óta – ez volt az első F1-es nagydíj a vasfüggöny mögött.' },
        { q: 'Mi változott 2026-ban az F1 erőforrásában?', options: ['Kikerült az MGU-H, és a teljesítmény kb. fele elektromos lett', 'Visszatértek a V10-es motorok', 'Teljesen elektromos lett az autó', 'Megszűnt a turbó'], answer: 0, explain: 'Az MGU-H kikerült, az MGU-K 350 kW-os lett, a belső égésű motor kb. 400 kW-ot ad, fenntartható üzemanyaggal.' }
      ]
    },
    {
      id: 'kosarlabda',
      title: 'A kosárlabda tudománya',
      level: 2, minutes: 16,
      summary: 'A dobás íve és szöge, a pörgés, a „lebegő” ugrás és a hárompontos dobás matematikája.',
      tags: ['kosárlabda', 'dobás', 'ferde hajítás', 'tangens', 'beesési szög', 'pörgés', 'ugrás', 'repülési idő', 'várható érték', 'hárompontos', 'Stephen Curry', 'Michael Jordan', 'bokasérülés'],
      terms: ['mechanika/tehetetlensegi-nyomatek', 'mechanika/perdulet', 'valszam/varhato-ertek'],
      sections: [
        {
          title: 'A gyűrű és a labda: mennyi a hely?',
          text: 'A gyűrű **3,05 m** magasan van (10 láb), belső átmérője kb. **45 cm**. A labda (7-es méret) átmérője kb. **24 cm**. A gyűrű tehát majdnem kétszer olyan széles, mint a labda – de csak akkor, ha a labda **felülről, meredeken** érkezik!\n\nHa a labda laposan, `θ` szögben érkezik, a gyűrű nyílása a labda szemszögéből csak `45 cm · sin θ` szélesnek „látszik”. Ahhoz, hogy egyáltalán beférjen:\n\n`45 · sin θ ≥ 24  →  sin θ ≥ 0,53  →  θ ≥ kb. 32°`\n\nEnnél laposabban érkező labda biztosan a gyűrűt éri. Minél meredekebb a beesés, annál nagyobb a „hibahatár”. Ezért tanítják a magas ívű dobást.'
        },
        {
          title: 'A dobás íve: szögek és tangens',
          text: 'A kidobás szöge `α`, a vízszintes távolság `d`, a gyűrű a kidobási pont fölött `h`-val magasabban van. A parabola pálya meredeksége bármely pontban a **tangens**sel írható le, és a beesési szögre egy szép egyszerű összefüggés adódik:\n\n`tan β = tan α − 2h / d`\n\n(itt `β` a vízszinteshez mért beesési szög, lefelé mérve).\n\n**Kidolgozott példa – büntetődobás:** `d ≈ 4,2 m`, a labda 2,1 m magasról indul, így `h = 3,05 − 2,1 = 0,95 m`. Ha `α = 52°`:\n\n1. `tan 52° ≈ 1,28`\n2. `2h / d = 1,9 / 4,2 ≈ 0,45`\n3. `tan β ≈ 1,28 − 0,45 = 0,83  →  β ≈ 40°`\n\nA szükséges kezdősebesség: `v² = g · d² / (2 · cos² α · (d · tan α − h))`, ebből `v ≈ 7,2 m/s`.\n\nAmerikai mérnökök számítógépes szimulációi szerint büntetődobásnál a **kb. 52°-os** kidobási szög, kb. **3 fordulat/s** hátrapörgetés és a gyűrű **hátsó része felé** célzás adja a legnagyobb esélyt. Laposabb dobásnál kisebb sebesség kell, de kisebb a beesési szög; meredekebbnél fordítva – a legjobb a kettő közötti egyensúly.',
          widget: { type: 'hajitas' },
          tip: 'Próbáld ki a szimulátorban: kb. 7 m/s és 50–55° között keresd azt a pályát, amelyik kb. 4 m-re 1 m-rel magasabb pontba ér!'
        },
        {
          title: 'Pörgés és lepattanás',
          text: 'A jó dobók a labdát **hátrapörgetéssel** (backspin) engedik el. Ennek két előnye van:\n\n- ha a labda a gyűrűnek vagy a palánknak ütközik, a pörgés miatti súrlódás **lefékezi** a vízszintes mozgását, így nagyobb eséllyel „beesik” (a „puha” dobás);\n- a pörgés stabilizálja a labda repülését.\n\nA labda pattanását a **restitúciós tényező** jellemzi: `e = √(h₂ / h₁)`. A FIBA szabálya szerint az 1,80 m-ről leejtett labdának kb. 1,2–1,4 m magasra kell visszapattannia; 1,3 m-rel számolva `e = √(1,3 / 1,8) ≈ 0,85`. Ha a labda le van eresztve, rosszabbul pattan – a pontos nyomás is a szabály része.'
        },
        {
          title: 'A „lebegő” ugrás',
          text: 'A nagy zsákolóknál olyan, mintha a levegőben „lógnának”. Mi van emögött?\n\nA függőleges ugrás magasságából (`h`) a levegőben töltött idő:\n\n`t = 2 · √(2h / g)`\n\nEgy 70 cm-es (nagyon jó) felugrásnál `t = 2 · √(1,4 / 9,81) ≈ 0,76 s`.\n\nA trükk: mivel a sebesség a csúcs közelében nagyon kicsi, a játékos **a repülési idő felét** az ugrás **legfelső negyedében** tölti! (A csúcstól lefelé `h/4`-et esni feleannyi idő, mint `h`-t.) A szemünk ezt érzékeli lebegésként.\n\nAz is segít, hogy a játékos a levegőben **mozgatja a karját, lábát**: a súlypontja ugyanazon a parabolán halad (ezt semmi nem változtathatja meg), de a feje és a keze a súlyponthoz képest máshol lehet – ezért tűnik úgy, mintha tovább emelkedne.'
        },
        {
          title: 'A hárompontos dobás matematikája',
          text: 'Miért dobnak ma annyi hárompontost? A **várható érték** a válasz:\n\n`várható pont = pontérték · találati arány`\n\n- 2 pontos dobás 50%-kal: `2 · 0,50 = 1,00 pont/dobás`\n- 3 pontos dobás 36%-kal: `3 · 0,36 = 1,08 pont/dobás`\n\nA hárompontos tehát rosszabb százalékkal is **többet ér**! A csapatok ma ezért a közeli (palánk alatti) dobásokat és a hárompontosokat keresik, a közepes távolságú dobásokat kerülik.\n\nA hárompontos vonal a FIBA-szabályok szerint **6,75 m**, az NBA-ben a legtávolabbi pontján kb. **7,24 m**.\n\n**Stephen Curry** a hárompontos dobás forradalmának arca: 2021 óta övé az NBA-ben valaha legtöbb értékesített hárompontos rekordja. Nem a magassága miatt lett nagy, hanem **elképesztő mennyiségű, tudatos gyakorlással** – edzésein több száz dobást végez, mérve a találati arányt.\n\n**Michael Jordan** történetéhez gyakran hozzáteszik, hogy „kirúgták a középiskolai csapatból” – a valóság az, hogy másodévesként az ifjúsági (junior varsity) csapatba sorolták, nem az elsőbe. Ezt motivációnak használta, és még keményebben edzett.'
        },
        {
          title: 'Biztonság: bokák és térdek',
          text: 'A kosárlabdában a leggyakoribb sérülés a **bokaficam**, súlyosabb esetben a térdszalag (pl. elülső keresztszalag) sérülése. Mit tehetsz?\n\n- **Bemelegítés** és **ugrás-landolás gyakorlatok**: puha, hajlított térdű érkezés, a térd ne bicsakoljon befelé.\n- **Egyensúly- és erősítő gyakorlatok** a bokára (pl. egylábas állás).\n- Jól tartó, nem kopott cipő.\n- Fájdalommal ne játssz tovább: a ficam után fokozatos visszatérés kell.',
          warn: 'Ha egy esés után a boka vagy a térd erősen bedagad, nem bírja a terhelést vagy instabil, azonnal hagyd abba, és orvos nézze meg.'
        }
      ],
      quiz: [
        { q: 'Milyen magasan van a kosárlabda-gyűrű?', options: ['3,50 m', '3,05 m', '2,75 m', '3,35 m'], answer: 1, explain: 'A gyűrű 3,05 m (10 láb) magasan van.' },
        { q: 'Miért jobb a meredekebben érkező labda?', options: ['Mert nem pörög', 'Mert gyorsabb', 'Mert könnyebb', 'Mert a gyűrű nyílása nagyobbnak „látszik” a labda számára'], answer: 3, explain: 'A hatásos nyílás 45 cm·sin θ: minél meredekebb a beesés, annál nagyobb a hibahatár.' },
        { q: 'Ha tan α = 1,2, h = 1 m és d = 5 m, mennyi a beesési szög tangense (tan β = tan α − 2h/d)?', options: ['1,4', '0,2', '1,6', '0,8'], answer: 3, explain: '1,2 − 2·1/5 = 1,2 − 0,4 = 0,8.' },
        { q: 'Mit ad a hátrapörgetés a dobásnál?', options: ['Magasabb ugrást', 'Gyorsabb labdát', 'A gyűrűről, palánkról lefékezve nagyobb eséllyel esik be', 'Semmit, csak látványos'], answer: 2, explain: 'Ütközéskor a pörgés miatti súrlódás fékezi a labdát, ezért „puhább” a dobás.' },
        { q: 'Melyik ér többet átlagosan: 2 pontos 50%-kal vagy 3 pontos 36%-kal?', options: ['Egyformák', 'Nem lehet kiszámolni', 'A 2 pontos (1,00)', 'A 3 pontos (1,08)'], answer: 3, explain: 'Várható érték: 2·0,5 = 1,00, illetve 3·0,36 = 1,08 pont dobásonként.' },
        { q: 'Az ugrás repülési idejének mekkora részét tölti a játékos a legfelső negyedében?', options: ['Kb. harmadát', 'Kb. felét', 'Kb. tizedét', 'Kb. negyedét'], answer: 1, explain: 'Mivel az esési idő a magasság négyzetgyökével arányos, h/4-et feleannyi idő alatt esik, mint h-t – így a repülési idő fele a felső negyedben telik.' },
        { q: 'Mi igaz Michael Jordan középiskolai történetére?', options: ['Soha nem kosarazott a középiskolában', 'Rögtön csapatkapitány lett', 'Kizárták a sportból', 'Másodévesként az ifjúsági (JV) csapatba sorolták, nem az elsőbe'], answer: 3, explain: 'A „kirúgták” mítosz; valójában a junior varsity csapatba került, és ezt motivációként használta.' }
      ]
    },
    {
      id: 'test-edzes',
      title: 'Mi történik a testben sportolás közben?',
      level: 2, minutes: 18,
      summary: 'ATP, kreatin-foszfát, glikolízis és oxidáció; szív, tüdő, VO₂max, laktát, izomrosttípusok és hőszabályozás.',
      tags: ['ATP', 'kreatin-foszfát', 'glikolízis', 'oxidatív rendszer', 'mitokondrium', 'laktát', 'tejsav', 'VO2max', 'pulzus', 'perctérfogat', 'izomrost', 'izzadás', 'hőszabályozás', 'energiarendszerek'],
      models: ['sziv', 'sejt'],
      terms: ['anatomia/izomosszehuzodas', 'anatomia/szarkomer', 'anatomia/percterfogat', 'anatomia/gazcsere', 'anatomia/oxigen-disszociacio'],
      sections: [
        {
          title: 'Az izom „üzemanyaga”: az ATP',
          text: 'Minden izom-összehúzódást egyetlen molekula hajt: az **ATP** (adenozin-trifoszfát). Amikor az izom dolgozik, az ATP lead egy foszfátcsoportot:\n\n`ATP → ADP + Pᵢ + energia` (kb. 30 kJ/mol)\n\nAz energiából az izomrostokban a miozinfejek „húzzák” az aktinszálakat – így rövidül a **szarkomer**, és összehúzódik az izom.\n\nA bökkenő: az izomban tárolt ATP **csak kb. 2–3 másodpercnyi** maximális erőkifejtésre elég! Ezért a testnek folyamatosan **újra kell termelnie** az ATP-t. Ehhez három energiarendszer dolgozik – egymással párhuzamosan, de más-más arányban, attól függően, milyen gyors és hosszú a mozgás.\n\nÉrdekesség: egy nap alatt a szervezeted nagyjából annyi ATP-t alakít át, amennyi a **saját testtömeged** – ugyanazokat a molekulákat újra és újra „feltölti”.',
          tip: 'Nézd meg a [[sejt|sejt 3D modelljében]] a mitokondriumot: ez a sejt „erőműve”, itt termelődik a legtöbb ATP.'
        },
        {
          title: 'A három energiarendszer',
          text: '1. **Kreatin-foszfát (foszfagén) rendszer** – azonnali, nagyon gyors, de kicsi tartály. A kreatin-foszfát a foszfátját az ADP-nek adja: `PCr + ADP → Cr + ATP`. Kb. **6–10 másodpercig** bírja: 100 m-es sprint, súlyemelés, ugrás, egy gyors kontra a fociban. Pihenéskor kb. 30 s alatt félig, 3–5 perc alatt szinte teljesen visszatöltődik.\n2. **Anaerob glikolízis** – a glükóz (vagy a glikogén) oxigén nélkül **piruváttá**, majd **laktáttá** bomlik. Glükózonként csak **2 ATP** keletkezik, de gyorsan. Kb. **10 s és 2 perc** közötti, kemény erőfeszítéseknél uralkodó: 400 m-es futás, 100–200 m-es úszás.\n3. **Oxidatív (aerob) rendszer** – a mitokondriumban oxigénnel égeti el a szénhidrátot és a zsírt. Lassabban indul be, de glükózonként **kb. 30–32 ATP** lesz belőle, egy zsírsavból pedig több mint 100. Ez visz végig egy maratont, egy hosszú edzést – és ez dolgozik most is, amikor olvasol.\n\nEgy focimeccs vagy kosármeccs **mindhárom** rendszert használja: az aerob rendszer adja az alapot, a sprintekhez és ugrásokhoz a gyors rendszerek kapcsolnak be.',
          widget: { type: 'parositas', options: { title: 'Melyik energiarendszer dominál?', count: 6, pairs: [
            ['100 m-es síkfutás', 'kreatin-foszfát rendszer'],
            ['Súlylökés egy kísérlete', 'kreatin-foszfát (azonnali) rendszer'],
            ['400 m-es síkfutás', 'anaerob glikolízis'],
            ['200 m-es gyorsúszás', 'glikolízis (oxigén nélkül, gyorsan)'],
            ['Maratonfutás', 'oxidatív (aerob) rendszer'],
            ['Egy 90 perces focimeccs alapja', 'aerob rendszer, sprintekben a gyors rendszerekkel']
          ] } }
        },
        {
          title: 'A laktát: nem ellenség!',
          text: 'Régen azt mondták, hogy a „tejsav” okozza a fáradtságot és a másnapi izomlázat. A modern élettan szerint ez **mítosz**:\n\n- A testben valójában **laktát** keletkezik (a tejsav sója). A kemény munkánál érzett „égő” érzésért és az izmok savasodásáért főleg a **hidrogénionok** és más anyagcseretermékek felelősek.\n- A laktát **értékes üzemanyag**: a szív és a lassú izomrostok elégetik, a máj pedig visszaalakíthatja glükózzá (**Cori-kör**).\n- A **másnapi izomláz** (szaknyelven DOMS) oka az izomrostok apró sérülése és az azt követő gyulladásos helyreállítás – nem a „bent maradt tejsav”.\n\nA vér laktátszintje nyugalomban kb. **1 mmol/l**, maximális terhelésnél **15 mmol/l** fölé is mehet. A **laktátküszöb** az a terhelési szint, ahol a laktát gyorsabban termelődik, mint ahogy a test eltakarítja – az állóképességi sportolók egyik legfontosabb mutatója.'
        },
        {
          title: 'Szív, tüdő és a VO₂max',
          text: 'Az aerob rendszerhez **oxigén** kell, amit a tüdő vesz fel és a szív szállít. A szív által percenként kipumpált vér a **perctérfogat**:\n\n`perctérfogat = pulzus · verőtérfogat`\n\nNyugalomban kb. `70/perc · 70 ml ≈ 5 l/perc`. Terhelés alatt egy edzetlen fiatalnál kb. 20 l/perc, egy élvonalbeli állóképességi sportolónál **35 l/perc** fölé is mehet! Az edzett szív nagyobb verőtérfogatú, ezért nyugalomban lassabban ver – élsportolóknál a nyugalmi pulzus akár **40/perc** körül is lehet.\n\nA **VO₂max** a maximális oxigénfelvétel, ml/kg/perc egységben. A Fick-elv szerint:\n\n`VO₂max = max. perctérfogat · (artériás − vénás O₂-tartalom)`\n\n- edzetlen fiatal: kb. 35–50 ml/kg/perc,\n- jól edzett amatőr: 50–60,\n- élvonalbeli síelők, kerékpárosok, futók: **70–90**, néhány kivételes sportolónál 90 fölötti értékeket is mértek.\n\nA maximális pulzus durva becslése: `HRmax ≈ 208 − 0,7 · életkor` (egy 15 évesnél kb. 197/perc). Ez csak **átlagos** érték, egyénenként ±10–15 ütés eltérés is lehet.',
          tip: 'Nézd meg a [[sziv|szív 3D modelljét]]: a bal kamra fala a legvastagabb, mert ez pumpálja a vért az egész testbe. Rendszeres állóképességi edzéstől a bal kamra térfogata megnő.'
        },
        {
          title: 'Izomrostok: sprinter vagy maratonista?',
          text: 'Az izmok kétféle fő rosttípusból állnak:\n\n- **I-es típus (lassú, „vörös”) rostok**: sok mitokondrium és hajszálér, sok mioglobin, nehezen fáradnak. Az állóképesség alapjai. Élvonalbeli maratonistáknál a lábizmokban az arányuk akár 70–80% is lehet.\n- **II-es típus (gyors, „fehér”) rostok**: nagy erőt, gyorsan fejtenek ki, de hamar elfáradnak. A IIa altípus edzéssel állóképesebbé tehető, a IIx a leggyorsabb. A sprintereknél több van belőlük.\n\nA rostarány részben **öröklött**, de az edzés sokat változtat a rostok tulajdonságain. Fiatal korban ezért érdemes **sokféle sportot** kipróbálni – nem kell 12 évesen eldönteni, hogy sprinter vagy maratonista leszel.'
        },
        {
          title: 'Hőszabályozás: miért izzadunk?',
          text: 'Az izmok hatásfoka kb. **20–25%**: a felhasznált energia háromnegyede **hővé** alakul. Egy kemény futásnál ez több száz watt hőteljesítmény – mintha egy kis hősugárzó lenne benned!\n\nA test fő hűtési módja az **izzadás**: a bőrről elpárolgó víz minden literje kb. **2400 kJ** hőt visz el (párolgáshő). Edzés közben óránként **0,5–2 liter** izzadság is távozhat, melegben még több.\n\nHa a test nem tud elég hőt leadni (meleg, párás idő, nem iszol eleget), a testhőmérséklet veszélyesen megemelkedhet: **hőkimerülés**, súlyos esetben **hőguta** jöhet létre.',
          warn: 'Hőguta jelei: zavartság, szédülés, hányinger, forró bőr, ájulás. Ez **életveszélyes vészhelyzet**: azonnal hívj segítséget (112), vidd árnyékba, hűtsd a testét. Kánikulában edz korán reggel vagy este, igyál rendszeresen, és tarts szünetet.'
        }
      ],
      quiz: [
        { q: 'Kb. meddig elég az izomban tárolt ATP maximális erőkifejtéshez?', options: ['2–3 másodpercig', '10 percig', '1 óráig', '1 percig'], answer: 0, explain: 'A tárolt ATP csak 2–3 s-ra elég, ezért kell folyamatosan újratermelni.' },
        { q: 'Melyik energiarendszer dominál egy 100 m-es sprintben?', options: ['Zsírégetés', 'Oxidatív rendszer', 'Fehérjebontás', 'Kreatin-foszfát rendszer'], answer: 3, explain: 'A kreatin-foszfát rendszer azonnali, és kb. 6–10 s-ig bírja.' },
        { q: 'Hány ATP keletkezik glükózonként az anaerob glikolízisben?', options: ['2', '106', '12', '30–32'], answer: 0, explain: 'Az anaerob glikolízis gyors, de csak nettó 2 ATP-t ad glükózonként.' },
        { q: 'Mi igaz a laktátra?', options: ['Haszontalan salakanyag', 'Csak betegeknél keletkezik', 'Ez okozza a másnapi izomlázat', 'Üzemanyag: a szív és a máj is felhasználja'], answer: 3, explain: 'A laktát értékes üzemanyag; az izomláz oka a rostok mikrosérülése.' },
        { q: 'Mi a perctérfogat képlete?', options: ['verőtérfogat / pulzus', 'pulzus · verőtérfogat', 'pulzus + verőtérfogat', 'VO₂max · pulzus'], answer: 1, explain: 'Perctérfogat = pulzus · verőtérfogat, nyugalomban kb. 5 l/perc.' },
        { q: 'Melyik izomrosttípus jellemző az állóképességi sportolókra?', options: ['Simaizom', 'II-es (gyors) rostok', 'I-es (lassú) rostok', 'Szívizom'], answer: 2, explain: 'A lassú, sok mitokondriumot tartalmazó I-es rostok nehezen fáradnak.' },
        { q: 'Mit tegyél, ha egy csapattársadon hőguta jeleit látod?', options: ['Várd meg, míg magától elmúlik', 'Folytassa az edzést lassabban', 'Hívj segítséget, vidd árnyékba, hűtsd', 'Adj neki energiaitalt'], answer: 2, explain: 'A hőguta életveszélyes: 112, árnyék, hűtés.' }
      ]
    },
    {
      id: 'edzeselmelet',
      title: 'Edzéselmélet, regeneráció, alvás',
      level: 2, minutes: 16,
      summary: 'Szuperkompenzáció, fokozatosság, periodizáció, bemelegítés, pihenés és alvás – így leszel tényleg jobb.',
      tags: ['edzés', 'szuperkompenzáció', 'terhelés', 'regeneráció', 'túledzés', 'periodizáció', 'bemelegítés', 'levezetés', 'alvás', 'nyújtás', 'pulzuszónák', 'serdülőkor', 'FITT'],
      models: ['sziv', 'agy'],
      terms: ['anatomia/izomosszehuzodas', 'anatomia/homeosztazis', 'szabalyozas/visszacsatolas'],
      sections: [
        {
          title: 'Szuperkompenzáció: a pihenésben leszel erősebb',
          text: 'Az edzés maga **fáraszt** és kis sérüléseket okoz. Az erősödés a **pihenés alatt** történik! A folyamat lépései:\n\n1. **Terhelés:** az edzés kimeríti az energiaraktárakat, apró sérüléseket okoz az izmokban.\n2. **Fáradás:** a teljesítőképesség átmenetileg **csökken**.\n3. **Helyreállás:** pihenés, táplálkozás és alvás alatt a test pótolja a hiányt.\n4. **Szuperkompenzáció:** a test „túlkompenzál”, és egy ideig a kiinduló szintnél **magasabbra** áll be – felkészül a következő hasonló terhelésre.\n\nHa a következő edzés a szuperkompenzáció csúcsán jön, fokozatosan emelkedik a forma. Ha **túl korán** jön (még fáradt vagy), lefelé csúszol – ez vezet a **túledzéshez**. Ha **túl későn**, a hatás elmúlik, és nem fejlődsz.',
          tip: 'Ez egy **visszacsatolásos** rendszer, mint egy szabályozókör: a test a terheléshez igazítja magát. Amit nem használsz, azt lebontja – ezért kell rendszeresség.'
        },
        {
          title: 'Az edzés alapelvei',
          text: '- **Fokozatosság (progresszív terhelés):** a terhelést lassan emeld. Hasznos ökölszabály: a heti összterhelés ne ugorjon hirtelen nagyot (sokan legfeljebb kb. 10%-os heti emelést javasolnak – ez nem törvény, de jó óvatossági irány).\n- **Specifikusság:** azt fejleszted, amit edzel. A maratonhoz hosszú futás kell, a sprinthez rövid, maximális gyorsulások.\n- **Egyéniség:** két ember ugyanarra az edzésre eltérően reagál (genetika, életkor, alvás, stressz).\n- **Visszafordíthatóság:** ha abbahagyod, a forma hetek alatt csökkenni kezd.\n- **Változatosság:** a monotonitás unalmat és túlterheléses sérüléseket okozhat.\n\nAz edzés tervezésének egyszerű képlete a **FITT**: Frequency (gyakoriság), Intensity (intenzitás), Time (időtartam), Type (típus).\n\nA **periodizáció** azt jelenti, hogy az év különböző szakaszokra oszlik: alapozás → felkészülés → versenyidőszak → átmeneti (pihenő) időszak. A fontos verseny előtt a terhelést csökkentik (**csúcsra járatás**, angolul taper), hogy a test frissen érkezzen.\n\nSok élvonalbeli állóképességi sportoló edzésének kb. **80%-a könnyű**, és csak kb. 20%-a kemény. A „mindig maximumon” edzés nem a leggyorsabb út!'
        },
        {
          title: 'Bemelegítés és levezetés',
          text: 'A **bemelegítés** nem formalitás:\n\n- az izmok hőmérséklete 1–2 °C-kal emelkedik, így gyorsabban és erősebben húzódnak össze;\n- nő a szív- és légzésfrekvencia, jobb az izmok vérellátása;\n- gyorsabb az idegi vezetés, élesebb a koordináció;\n- csökken a sérülésveszély.\n\nJó sorrend (**RAMP**-elv): **emeld** a testhőmérsékletet (könnyű futás) → **aktiváld** az izmokat → **mozgasd át** az ízületeket **dinamikus nyújtással** (lendítések, kitörések) → **gyorsíts** fel a sportág mozgásaira (rövid sprintek, ugrások).\n\nA hosszan kitartott **statikus nyújtás** közvetlenül robbanékony sport előtt kissé csökkentheti az erőt, ezért inkább edzés **után** vagy külön alkalommal végezd.\n\n**Levezetés:** néhány perc könnyű mozgás és nyújtás segít, hogy a pulzus és a légzés fokozatosan normalizálódjon.'
        },
        {
          title: 'Alvás: a legjobb (legális) teljesítményfokozó',
          text: 'Alvás közben – főleg a **mélyalvás** szakaszában – termelődik a **növekedési hormon** nagy része, amely segít az izmok és csontok helyreállításában. Az agy ilyenkor rögzíti a tanult mozdulatokat is: a technikai fejlődés egy része **éjjel** történik!\n\nAz amerikai alvásorvosi társaság (AASM) ajánlása szerint a **13–18 éveseknek napi 8–10 óra** alvás kell.\n\nEgy híres stanfordi vizsgálatban (2011) egyetemi kosárlabdázók néhány hétig **naponta kb. 10 órát** töltöttek ágyban. Eredmény: gyorsabb sprintidők, és a büntetődobás és a hárompontos dobás pontossága kb. **9 százalékponttal** javult. Más vizsgálatok szerint a rendszeresen **8 óránál kevesebbet** alvó fiatal sportolók **gyakrabban sérülnek** meg.\n\nTippek:\n\n- rendszeres lefekvési és ébredési idő, hétvégén is;\n- lefekvés előtt 1 órával képernyők le (a kék fény és az izgalom is ébren tart);\n- sötét, hűvös, csendes szoba;\n- délután már ne igyál koffeines italt.'
        },
        {
          title: 'Túledzés és fiatal sportolók',
          text: 'A **túledzés** jelei: tartósan rossz teljesítmény, emelkedett nyugalmi pulzus reggel, rossz alvás, ingerlékenység, gyakori betegségek, elmúló kedv az edzéshez. Ilyenkor **nem több edzés**, hanem **pihenés** kell, és szólj az edződnek.\n\nFiatal korban külön figyelni kell:\n\n- A WHO ajánlása szerint az 5–17 éveseknek naponta átlagosan **legalább 60 perc** közepes vagy nagy intenzitású mozgás kell.\n- A **növekedési porckorongok** (a csontok végén lévő növekedési zónák) sérülékenyebbek. Növekedési „ugrás” idején a gyors csontnövekedés miatt gyakoribbak az ín- és tapadási fájdalmak (pl. térd alatt, sarokban).\n- **Erősítő edzés** szakszerű felügyelettel, jó technikával fiatalon is biztonságos és hasznos – a súly helyett eleinte a mozgás minősége a lényeg.\n- A korai, egyetlen sportra szűkített specializáció növelheti a kiégés és a túlterheléses sérülések kockázatát. A sokoldalú mozgás jobb alap.',
          warn: 'A fájdalom jelzés, nem gyengeség. Ha egy fájdalom edzésről edzésre visszatér vagy erősödik, ne „edz át rajta” – orvos vagy gyógytornász nézze meg.'
        }
      ],
      quiz: [
        { q: 'Mikor történik a tényleges erősödés az edzés során?', options: ['A pihenés, regeneráció alatt', 'Az edzés közben', 'Csak versenyen', 'Soha, csak a technika javul'], answer: 0, explain: 'A szuperkompenzáció a pihenési szakaszban történik.' },
        { q: 'Mi történik, ha a következő edzés mindig túl korán jön?', options: ['Túledzés, lefelé csúszó forma', 'Gyorsabb fejlődés', 'Semmi', 'Nő a VO₂max'], answer: 0, explain: 'A fáradt állapotban jövő újabb terhelés lefelé viszi a formát.' },
        { q: 'Mit jelent a specifikusság elve?', options: ['A pihenés felesleges', 'Mindig maximumon kell edzeni', 'Azt fejleszted, amit edzel', 'Mindenki egyformán fejlődik'], answer: 2, explain: 'A test az adott terheléshez alkalmazkodik.' },
        { q: 'Hány óra alvás ajánlott 13–18 éveseknek?', options: ['5–6', '8–10', '6–7', '11–13'], answer: 1, explain: 'Az AASM ajánlása 8–10 óra.' },
        { q: 'Mit érdemes inkább edzés után végezni, mint közvetlenül robbanékony sport előtt?', options: ['Hosszan kitartott statikus nyújtást', 'Ugrásokat', 'Könnyű futást', 'Dinamikus nyújtást'], answer: 0, explain: 'A hosszú statikus nyújtás közvetlenül előtte kissé csökkentheti az erőt.' },
        { q: 'Mennyi napi mozgást ajánl a WHO az 5–17 éveseknek?', options: ['3 órát kötelezően', '10 percet', 'Heti 60 percet', 'Átlagosan legalább 60 percet'], answer: 3, explain: 'Átlagosan naponta legalább 60 perc közepes vagy nagy intenzitású mozgás.' },
        { q: 'Melyik a túledzés tipikus jele?', options: ['Nagyobb étvágy és jókedv', 'Csökkenő nyugalmi pulzus és jó alvás', 'Gyorsuló fejlődés', 'Tartósan rossz teljesítmény, emelkedett reggeli pulzus, rossz alvás'], answer: 3, explain: 'Ilyenkor pihenés kell, nem több edzés.' },
        { q: 'Mi a FITT betűszó első betűje?', options: ['Fitness – erőnlét', 'Force – erő', 'Frequency – gyakoriság', 'Focus – fókusz'], answer: 2, explain: 'Frequency, Intensity, Time, Type – gyakoriság, intenzitás, időtartam, típus.' }
      ]
    },
    {
      id: 'taplalkozas',
      title: 'Táplálkozás és folyadék sportolóknak',
      level: 2, minutes: 16,
      summary: 'Szénhidrát g/kg-ban, fehérje, zsír, vas és kalcium; folyadékpótlás, izzadás és a 2%-os szabály. Étrend-kiegészítők és a doppingveszély.',
      tags: ['táplálkozás', 'szénhidrát', 'glikogén', 'fehérje', 'zsír', 'energia', 'kcal', 'folyadékpótlás', 'dehidratáció', 'izzadás', 'sportital', 'energiaital', 'étrend-kiegészítő', 'dopping', 'RED-S', 'vas', 'kalcium'],
      terms: ['szerves-kemia/szenhidrat', 'szerves-kemia/aminosav', 'szerves-kemia/lipid', 'anatomia/inzulin-glukagon', 'anatomia/emesztes'],
      sections: [
        {
          title: 'Energia: honnan jön?',
          text: 'Az étel energiáját kilokalóriában (kcal) vagy kilojoule-ban (kJ) mérjük (`1 kcal ≈ 4,19 kJ`). A három fő tápanyag:\n\n- **szénhidrát:** kb. **4 kcal/g** (17 kJ/g) – a gyors, intenzív munka fő üzemanyaga;\n- **fehérje:** kb. **4 kcal/g** – főleg építőanyag (izom, enzimek, hormonok);\n- **zsír:** kb. **9 kcal/g** (37 kJ/g) – nagy energiatartalék, a lassú, hosszú munkához.\n\nA szénhidrát **glikogén** formában raktározódik: az izmokban kb. **400–500 g**, a májban kb. **80–100 g** (edzettségtől és testmérettől függően). Ez összesen kb. 2000 kcal – nagyjából 1,5–2 óra kemény állóképességi munkára elég. A maratonisták ezért „falba ütköznek”, ha kifogy a glikogén, és ezért esznek verseny közben is.\n\nA zsírraktár még egy sovány emberben is több tízezer kcal, de a zsír égetése **lassabb**, és több oxigént igényel ugyanannyi energiához.'
        },
        {
          title: 'Mennyi szénhidrát és fehérje kell?',
          text: 'A sporttáplálkozásban a mennyiséget **testtömeg-kilogrammonként** adják meg (g/kg/nap). A nemzetközi sporttudományi ajánlások irányszámai:\n\n- **Szénhidrát:** könnyű edzésnapon **3–5 g/kg**, napi kb. 1 óra közepes edzésnél **5–7 g/kg**, napi 1–3 óra kemény edzésnél **6–10 g/kg**.\n- **Fehérje:** sportolóknak kb. **1,2–2,0 g/kg**, több étkezésre elosztva (étkezésenként kb. 0,25–0,3 g/kg, edzés után is).\n- **Zsír:** a napi energia kb. 20–35%-a, főleg jó minőségű forrásból (olajos magvak, halak, növényi olajok).\n\n**Kidolgozott példa:** egy 50 kg-os fiatal napi 1,5 óra edzéssel:\n\n1. szénhidrát: `50 · 6 = 300 g` naponta (pl. tészta, rizs, kenyér, burgonya, zab, gyümölcs);\n2. fehérje: `50 · 1,4 = 70 g` naponta (pl. tojás, tejtermék, hús, hal, hüvelyesek).\n\nVerseny előtt 3–4 órával egy könnyen emészthető, **szénhidrátdús** étkezés a jó választás (sok zsír és rost nélkül). 1 óránál hosszabb terhelésnél óránként **30–60 g** szénhidrát (sportital, banán) segíthet.',
          tip: 'A legjobb sporttáplálkozás meglepően „unalmas”: változatos, rendes étkezések, sok zöldség és gyümölcs, elég szénhidrát, fehérje minden étkezésnél – és semmi csodaszer.'
        },
        {
          title: 'Folyadék: a 2%-os szabály',
          text: 'A test kb. **55–65%-a víz**. Edzés közben óránként **0,5–2 liter** izzadság távozhat. Ha a folyadékvesztés eléri a testtömeg **kb. 2%-át**, az állóképességi teljesítmény és a koncentráció érezhetően romlik (egy 50 kg-os sportolónál ez már 1 liter!).\n\nHogyan mérd? **Mérlegelj** edzés előtt és után (törölközz meg, és lehetőleg ugyanabban a ruhában):\n\n`folyadékvesztés (l) ≈ testtömeg-csökkenés (kg) + elfogyasztott ital (l)`\n\nMinden elvesztett kg után kb. **1,25–1,5 liter** folyadékot érdemes visszapótolni a következő órákban (azért több, mert közben vizelettel is távozik).\n\nGyakorlati tanácsok:\n\n- edzés előtt pár órával igyál (kb. 5–7 ml/kg);\n- edzés közben kortyonként, rendszeresen;\n- a **vizelet színe** jó jelző: a halványsárga jó, a sötét sárga kevés folyadékot jelez;\n- 1 óránál rövidebb edzéshez a **víz** általában elég; hosszabb, izzasztó terheléshez a sót (nátriumot) és szénhidrátot tartalmazó **sportital** segíthet.',
          warn: 'Túlzásba se vidd! Ha valaki órákon át sokkal több vizet iszik, mint amennyit izzad, a vér nátriumszintje veszélyesen lecsökkenhet (hiponatrémia). Igazodj a szomjúságodhoz és a vesztéshez.'
        },
        {
          title: 'Vitaminok, ásványi anyagok – és amit kerülj',
          text: '- **Vas:** az oxigénszállító hemoglobin része. A gyorsan növő, sokat edző fiatalok – főleg a lányok a menstruáció miatt – könnyebben vashiányossá válhatnak (fáradékonyság, gyenge teljesítmény). Vörös húsok, hüvelyesek, zöld leveles zöldségek; C-vitaminnal jobban szívódik fel. Vaspótlást csak orvosi vizsgálat után szabad szedni.\n- **Kalcium és D-vitamin:** a csontok építéséhez. A csonttömeg nagy része **serdülőkorban** épül fel – ez egész életre szóló „befektetés”.\n- **Energiaitalok:** sok koffeint és cukrot tartalmaznak. Gyerekeknek és serdülőknek **nem ajánlottak**: szívdobogást, alvászavart, szorongást okozhatnak.\n- **Étrend-kiegészítők:** fiatal korban rendes étrend mellett ritkán van rájuk szükség. Ráadásul egy részük **szennyezett** lehet tiltott anyagokkal: a doppingszabályok szerint a sportoló **akkor is felel**, ha nem tudott a szennyezésről.',
          warn: 'Soha ne használj doppingszert, teljesítményfokozót vagy ismeretlen eredetű „izomépítő” készítményt. Ezek súlyosan károsíthatják a szívet, a májat, a hormonrendszert és a növekedést – és egy életre szóló eltiltást is jelenthetnek.'
        },
        {
          title: 'Nincs extrém diéta!',
          text: 'Ha egy sportoló tartósan **kevesebbet eszik**, mint amennyi energiát az edzés és a növekedés együtt igényel, kialakulhat az **alacsony energia-hozzáférhetőség** állapota (szakszóval RED-S). Következményei:\n\n- lassul a növekedés és a fejlődés,\n- gyengülnek a csontok (fáradásos törések),\n- lányoknál elmaradhat a menstruáció,\n- romlik az immunrendszer, a hangulat és a teljesítmény.\n\nKülönösen veszélyeztetettek a **testsúlyfüggő** sportágak (torna, műugrás, súlycsoportos küzdősportok, hosszútávfutás). Fiatalon a gyors fogyasztás, a „lefogyasztás” verseny előtt vagy a szénhidrátok teljes elhagyása **nem** jó ötlet.',
          tip: 'Ha úgy érzed, az étkezés, a testsúly vagy a külsőd miatti aggódás elveszi az örömödet, beszélj szülővel, edzővel, iskolai pszichológussal vagy orvossal. Ez nem gyengeség – a legjobb sportolók is kérnek segítséget.'
        }
      ],
      quiz: [
        { q: 'Kb. hány kcal energiát ad 1 g zsír?', options: ['9 kcal', '7 kcal', '17 kcal', '4 kcal'], answer: 0, explain: 'A zsír kb. 9 kcal/g, a szénhidrát és a fehérje kb. 4 kcal/g.' },
        { q: 'Egy 60 kg-os sportoló 6 g/kg szénhidrátot szeretne enni. Mennyi ez naponta?', options: ['36 g', '160 g', '360 g', '600 g'], answer: 2, explain: '60 · 6 = 360 g szénhidrát.' },
        { q: 'Mekkora folyadékvesztéstől romlik érezhetően az állóképességi teljesítmény?', options: ['A testtömeg kb. 2%-ától', 'A testtömeg kb. 0,1%-ától', 'Soha', 'A testtömeg kb. 20%-ától'], answer: 0, explain: 'Kb. 2%-os testtömeg-csökkenés már rontja a teljesítményt.' },
        { q: 'Edzés előtt 52 kg voltál, utána 51,4 kg, és közben 0,4 l vizet ittál. Kb. mennyi folyadékot vesztettél?', options: ['1,0 l', '0,6 l', '1,4 l', '0,2 l'], answer: 0, explain: '0,6 kg csökkenés + 0,4 l ital ≈ 1,0 l izzadság.' },
        { q: 'Mennyi fehérjét ajánlanak naponta sportolóknak?', options: ['0,2–0,4 g/kg', '1,2–2,0 g/kg', '10 g/kg', '5–7 g/kg'], answer: 1, explain: 'Sportolóknak kb. 1,2–2,0 g/kg/nap, több étkezésre elosztva.' },
        { q: 'Miért kockázatosak az étrend-kiegészítők versenysportolóknak?', options: ['Mert drágák', 'Mert túl finomak', 'Mert nincs bennük semmi', 'Mert szennyezettek lehetnek tiltott anyaggal, és a sportoló akkor is felel'], answer: 3, explain: 'A doppingszabályok szerint a sportoló felel a szervezetében talált tiltott anyagért.' },
        { q: 'Mi a RED-S?', options: ['Egy vérvizsgálat neve', 'Az alacsony energia-hozzáférhetőség állapota, ha tartósan túl keveset eszik a sportoló', 'Egy sportital', 'Egy edzésmódszer'], answer: 1, explain: 'A tartós energiahiány rontja a növekedést, a csontokat, a hormonrendszert és a teljesítményt.' }
      ]
    },
    {
      id: 'rekordok',
      title: 'Rekordok tudománya: úszás, atlétika és társai',
      level: 2, minutes: 18,
      summary: 'Sprint, távolugrás, magasugrás, rúdugrás, maraton és úszás: milyen fizika és technika áll a világcsúcsok mögött?',
      tags: ['világcsúcs', 'rekord', 'sprint', 'Usain Bolt', 'távolugrás', 'magasugrás', 'Fosbury', 'rúdugrás', 'Duplantis', 'maraton', 'Sawe', 'Kipchoge', 'úszás', 'közegellenállás', 'cápadressz', 'Milák Kristóf', 'energiamegmaradás'],
      terms: ['fizika-bsc/munkatetel', 'mechanika/munka-energia', 'e-mobilitas/legellenallas', 'valszam/normalis-eloszlas'],
      sections: [
        {
          title: 'A 100 m-es sprint: 9,58',
          text: '**Usain Bolt** 2009-ben Berlinben **9,58 s**-os világcsúcsot futott 100 m-en (2026-os állás szerint még mindig ez a világcsúcs). Számoljunk:\n\n- átlagsebesség: `100 m / 9,58 s ≈ 10,4 m/s ≈ 37,6 km/h`;\n- a csúcssebessége (kb. 60–80 m között) **kb. 12,3 m/s ≈ 44 km/h** volt.\n\nA sprint fizikája: a futó minden lépésnél **kb. 0,08–0,1 s**-ig érinti a talajt, és ezalatt a testsúlya **többszörösének** megfelelő erővel nyomja azt. A gyorsaság titka nem a gyors lábmozgás, hanem az, hogy **rövid idő alatt nagy erőt** tud kifejteni a talajra.\n\nA rajtnál a **reakcióidő** is számít: Bolté Berlinben kb. 0,15 s volt. A szabály szerint a 0,100 s-nál korábbi reakció **kiugrásnak** számít, mert ennél gyorsabban az ember nem tud tudatosan reagálni a pisztolylövésre – az már találgatás.',
          tip: 'Hogy a szél ne segítsen túl sokat: a sprintekben és ugrásokban a **2,0 m/s**-nál erősebb hátszélben elért eredmény nem lehet rekord.'
        },
        {
          title: 'Ugrások: miért nem 45°?',
          text: '**Távolugrás:** Mike Powell **8,95 m**-es világcsúcsa 1991 óta él. A ferde hajítás képlete szerint 45° lenne a legjobb – mégis a távolugrók kb. **18–25°**-ban rugaszkodnak el! Miért? Mert a nekifutás után kb. 9,5–10 m/s-os **vízszintes** sebességük van, és az elugrás rövid ideje alatt csak kevés függőleges sebességet tudnak hozzá szerezni. Ha meredekebben akarnának elugrani, sokat veszítenének a vízszintes sebességből.\n\n**Magasugrás:** Dick Fosbury az 1968-as olimpián hanyatt, fejjel előre ugrott át a lécen – ez a **Fosbury-flop**. A trükk: a hajlított, ív alakú testnél a **súlypont a lécen kívül, akár alatta** is lehet, miközben a test részei egymás után átbújnak fölötte. Ugyanakkora emeléssel így magasabb lécet lehet átugrani. Javier Sotomayor **2,45 m**-es világcsúcsa 1993 óta él.\n\n**Rúdugrás:** itt az energia átalakulását látjuk. A nekifutás mozgási energiája a rúdban **rugalmas energiává**, majd **helyzeti energiává** alakul:\n\n`½ · m · v² = m · g · h  →  h = v² / (2g)`\n\n`v = 10 m/s` esetén `h = 100 / 19,62 ≈ 5,1 m`. Ehhez jön a súlypont kiinduló magassága (kb. 1 m) és a karokkal végzett munka – így jön ki a 6 m fölötti magasság. **Armand Duplantis** 2026 márciusában **6,31 m**-rel már **15.** alkalommal javította meg a világcsúcsot, mindig 1-1 centiméterrel.'
        },
        {
          title: 'Maraton: az álomhatár alatt',
          text: 'A maraton **42,195 km**. Sokáig a 2 órás határ elérhetetlennek tűnt. **Eliud Kipchoge** 2019-ben Bécsben egy különleges, szervezett kísérleten **1:59:40**-et futott – ez a rotáló iramfutók és a vezetőautó miatt nem számított hivatalos rekordnak, de megmutatta, hogy lehetséges.\n\n**2026. április 26-án** a londoni maratonon a kenyai **Sabastian Sawe** **1:59:30**-cal az első ember lett, aki **hivatalos versenyen** 2 órán belül futotta le a távot (a korábbi világcsúcs Kelvin Kiptum 2023-as 2:00:35-e volt).\n\nMit jelent ez?\n\n- átlagsebesség: `42 195 m / 7170 s ≈ 5,9 m/s ≈ 21,2 km/h`;\n- ez **kilométerenként kb. 2:50** – egy átlagos iskolás ezt a tempót talán 100–200 m-ig bírja.\n\nA siker mögött: évtizedes tudatos edzés, magaslati edzőtábor, szénhidrátpótlás futás közben (óránként akár 90 g), és a **cipőtechnika**: a szénszálas lemez és az új habanyagok mérések szerint kb. **4%**-kal csökkenthetik a futás energiaigényét. A World Athletics ezért **korlátozza** a talp vastagságát (országúti versenyeken legfeljebb 40 mm).',
          tip: 'Kipchoge mottója: „No human is limited” – „Egyetlen ember sem korlátozott.” Ő is évtizedeken át gyűjtötte az apró fejlődéseket, edzésnaplót vezetett, és rendkívül fegyelmezetten élt.'
        },
        {
          title: 'Úszás: harc a víz ellen',
          text: 'A víz sűrűsége kb. **1000 kg/m³**, a levegőé kb. 1,2 kg/m³: a víz kb. **800-szor sűrűbb**! Ezért egy úszó jóval lassabb, mint egy futó, és a teljesítménye nagy részét a **közegellenállás** leküzdése emészti fel. A közegellenállás három fajtája:\n\n- **súrlódási ellenállás:** a bőr, haj, úszódressz mentén;\n- **alaki ellenállás:** a test homlokfelülete – minél „hosszabb és vékonyabb” (áramvonalasabb) a test, annál kisebb;\n- **hullámellenállás:** a vízfelszínen keltett hullámok energiát visznek el.\n\nEzért olyan fontos a **víz alatti szakasz** rajt és fordulás után: a víz alatt nincs hullámellenállás, és a delfinrúgás nagyon gyors. A szabály szerint legfeljebb **15 m**-t lehet víz alatt úszni.\n\nA **technikai dresszek** története tanulságos: 2008–2009-ben a poliuretán „cápadresszekben” rengeteg világcsúcs dőlt meg (a 2009-es római vb-n több mint 40). 2010-től ezeket **betiltották**, csak textildressz engedélyezett – hogy a sportoló és ne az anyag nyerjen.\n\n**Milák Kristóf** 2022-ben a budapesti világbajnokságon **1:50,34**-es világcsúcsot úszott 200 m pillangón, 2024-ben Párizsban 100 m pillangón lett olimpiai bajnok.'
        },
        {
          title: 'Miért dőlnek meg a rekordok – és van-e határ?',
          text: 'A rekordok javulásának okai:\n\n- **edzéstudomány:** pulzus- és laktátmérés, periodizáció, videóelemzés;\n- **táplálkozás és regeneráció:** szénhidrátpótlás, alvás, sérülésmegelőzés;\n- **technika:** pályaburkolat, cipők, csúcstechnológiás kerékpárok, medencék hullámtörő kötelekkel;\n- **több sportoló, jobb kiválasztás:** a világ minden tájáról versenyeznek.\n\nDe van **fizikai és élettani határ** is: a 100 m-es világcsúcs 1968 óta (9,95 s) „csak” kb. 0,4 s-ot javult. Minél közelebb vagyunk a határhoz, annál kisebbek a lépések – Duplantis is centinként javít.\n\nKülön érdekesség a **magaslat**: az 1968-as mexikóvárosi olimpián (kb. 2240 m) Bob Beamon **8,90 m**-t ugrott távolba – a ritkább levegő kisebb légellenállást jelentett. A hosszútávfutóknak viszont a kevesebb oxigén miatt nehezebb volt.',
          widget: { type: 'parositas', options: { title: 'Rekord és mögötte álló fizika', count: 6, pairs: [
            ['Rúdugrás', 'mozgási energia → rugalmas → helyzeti energia'],
            ['Fosbury-flop', 'a súlypont a léc alatt is maradhat'],
            ['Távolugrás 18–25°-ban', 'a vízszintes sebesség megtartása'],
            ['Víz alatti delfinrúgás', 'nincs hullámellenállás'],
            ['Szénszálas futócipő', 'kisebb energiaigény lépésenként'],
            ['Sprintrajt', 'rövid idő alatt nagy talajerő']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mekkora Usain Bolt átlagsebessége a 9,58 s-os 100 m-en?', options: ['Kb. 10,4 m/s', 'Kb. 15 m/s', 'Kb. 12,4 m/s', 'Kb. 9,6 m/s'], answer: 0, explain: '100 / 9,58 ≈ 10,4 m/s ≈ 37,6 km/h.' },
        { q: 'Miért ugranak el a távolugrók 45°-nál jóval laposabban?', options: ['Mert úgy kényelmesebb', 'Mert a szabály tiltja a 45°-ot', 'Mert a levegő nem engedi', 'Mert nem tudnak elég függőleges sebességet szerezni anélkül, hogy sokat veszítenének a vízszintesből'], answer: 3, explain: 'Az elugrás rövid ideje alatt kevés függőleges sebesség szerezhető; a vízszintes sebesség megtartása fontosabb.' },
        { q: 'Mekkora magasságra elég elméletben 9 m/s sebesség (h = v²/2g, g ≈ 10)?', options: ['81 m', '8,1 m', '0,9 m', '4,05 m'], answer: 3, explain: 'h = 81 / 20 = 4,05 m.' },
        { q: 'Ki futott először hivatalos versenyen 2 órán belül maratont?', options: ['Usain Bolt', 'Sabastian Sawe', 'Kelvin Kiptum', 'Eliud Kipchoge'], answer: 1, explain: 'Sawe 2026. április 26-án Londonban 1:59:30-at futott. Kipchoge 1:59:40-e nem hivatalos kísérlet volt.' },
        { q: 'Miért gyors a víz alatti delfinrúgás rajt és fordulás után?', options: ['Mert ott melegebb a víz', 'Mert ott nem kell levegőt venni', 'Mert a víz alatt nincs hullámellenállás', 'Mert a víz alatt kisebb a gravitáció'], answer: 2, explain: 'A felszíni hullámkeltés energiát visz el; a víz alatt ez elmarad. Legfeljebb 15 m engedélyezett.' },
        { q: 'Mi a Fosbury-flop titka?', options: ['A hajlított test súlypontja a léc alatt is maradhat', 'Rúd használata', 'Ollózó ugrás', 'Nagyobb nekifutási sebesség'], answer: 0, explain: 'A test részei egymás után bújnak át, a súlypont akár a léc alatt marad.' },
        { q: 'Miért tiltották be 2010-től a poliuretán úszódresszeket?', options: ['Mérgezőek voltak', 'Túl nehezek voltak', 'Túl drágák voltak', 'Túl nagy előnyt adott az anyag, rengeteg rekord dőlt meg'], answer: 3, explain: 'Azt akarták, hogy a sportoló teljesítménye és ne a dressz döntsön.' },
        { q: 'Mekkora hátszél fölött nem hitelesíthető a sprintrekord?', options: ['2,0 m/s', '5,0 m/s', '0,5 m/s', '1,0 m/s'], answer: 0, explain: '2,0 m/s fölötti hátszélben elért idő nem lehet rekord.' }
      ]
    },
    {
      id: 'sportpszichologia',
      title: 'Sportpszichológia: motiváció, fókusz, kudarcok',
      level: 2, minutes: 16,
      summary: 'Belső motiváció, célállítás, izgalmi szint, rutinok, vizualizáció, reakcióidő, fejlődési szemlélet – és hogyan kezeld a kudarcot.',
      tags: ['sportpszichológia', 'motiváció', 'belső motiváció', 'célállítás', 'SMART', 'izgalmi szint', 'stressz', 'légzés', 'rutin', 'vizualizáció', 'reakcióidő', 'fejlődési szemlélet', 'kudarc', 'csapatmunka', 'fair play', 'kiégés'],
      models: ['agy'],
      terms: ['anatomia/neuron', 'anatomia/szinapszis', 'anatomia/reflexiv', 'valszam/korrelacio-oksag'],
      sections: [
        {
          title: 'Motiváció: miért sportolsz?',
          text: 'A pszichológusok kétféle motivációt különböztetnek meg:\n\n- **belső motiváció:** azért csinálod, mert **élvezed**, érdekel, jó érzés fejlődni;\n- **külső motiváció:** érem, dicséret, jutalom, mások elvárása miatt.\n\nA kutatások szerint (pl. az **önmeghatározás-elmélet**, Deci és Ryan) a hosszú távú kitartás három dologból táplálkozik:\n\n1. **autonómia** – érzed, hogy te döntesz, a tiéd a sport;\n2. **kompetencia** – látod, hogy fejlődsz, egyre ügyesebb vagy;\n3. **kapcsolódás** – jó csapat, jó edző, barátok.\n\nAki csak az éremért edz, könnyebben **kiég**. Aki szereti a folyamatot, az a rossz időszakokban is kitart.'
        },
        {
          title: 'Célállítás: eredmény-, teljesítmény- és folyamatcélok',
          text: 'Háromféle célt érdemes megkülönböztetni:\n\n- **eredménycél:** „megnyerem a bajnokságot” – motiváló, de nem csak rajtad múlik;\n- **teljesítménycél:** „a 100 m-es időmet 13,2 s-ról 12,9 s-ra javítom” – rajtad múlik, mérhető;\n- **folyamatcél:** „minden rajtnál a karomat aktívan hajtom”, „minden edzés után 10 perc nyújtás” – erre **minden nap** hatással vagy.\n\nA jó célok a **SMART**-szabály szerint: Specifikus (konkrét), Mérhető, Elérhető (de kihívás), Releváns (fontos neked), Időhöz kötött.\n\nA bajnokok fejében versenyen általában **folyamatcél** van („laza váll, erős lábtempó”), nem az, hogy „nyernem kell”.'
        },
        {
          title: 'Izgalmi szint, légzés és rutinok',
          text: 'Egy kis izgalom **jót tesz**: élesebb figyelem, gyorsabb reakció. Túl sok izgalom viszont merevséget, kapkodást okoz. Ezt írja le a **fordított U** összefüggés: a teljesítmény egy **közepes**, sportágtól és embertől függő izgalmi szintnél a legjobb. (Egy íjásznak nyugodtabbnak kell lennie, mint egy súlyemelőnek.)\n\nHa túl izgatott vagy, a legegyszerűbb eszköz a **légzés**: a lassú, hosszú **kilégzés** a paraszimpatikus idegrendszeren keresztül lassítja a szívverést. Próbáld ki: 4 s belégzés – 6 s kilégzés, ötször.\n\n**Rutinok:** a büntetődobás vagy a szerva előtti mindig ugyanolyan mozdulatsor (pattintás, légvétel, célpont) a figyelmet a **jelenre** irányítja, és kiszorítja a zavaró gondolatokat.\n\n**„Bebénulás” (choking):** nagy nyomás alatt az ember hajlamos **tudatosan** figyelni a már automatikus mozdulataira – és ettől romlanak el. Ezért segít egy egyszerű külső fókusz („a gyűrű hátsó része”) a túlgondolás helyett.',
          tip: '**Michael Phelps** a 2008-as pekingi olimpián 200 m pillangón úszás közben vízzel telt úszószemüveggel szinte vakon úszott – a karcsapásait számolta, amit edzésen begyakorolt, és világcsúccsal nyert. A felkészülés része volt, hogy fejben a váratlan helyzeteket is „lejátszotta”.'
        },
        {
          title: 'Vizualizáció és reakcióidő',
          text: '**Vizualizáció (mentális gyakorlás):** ha élénken elképzeled a mozdulatot, az agyadban részben ugyanazok a mozgatóterületek aktiválódnak, mint a valódi mozgásnál. Kutatások szerint a mentális gyakorlás **javítja** a teljesítményt – a fizikai gyakorlást nem helyettesíti, de jól kiegészíti (sérülés idején is!).\n\n**Reakcióidő:** a jel észlelésétől a mozgás kezdetéig eltelt idő.\n\n- egyszerű reakció hangra: kb. **0,15–0,17 s**, fényre kb. **0,2–0,25 s**;\n- ha több lehetőség közül kell választani (merre ugorjon a kapus?), a reakcióidő **hosszabb** – minél több a választási lehetőség, annál lassabb.\n\nEgy 200 km/h-s teniszszerva (≈ 56 m/s) kb. 0,5 s alatt ér át a pályán. A legjobb játékosok ezért **anticipálnak**: a szervázó dobómozdulatából, testtartásából előre „olvassák” az irányt. Ez az előrelátás gyakorlással tanulható – a szakértő agya a fontos jeleket hamarabb észreveszi.',
          tip: 'Nézd meg az [[agy|agy 3D modelljében]] a kisagyat: a mozgások finomhangolásáért és a begyakorolt mozdulatsorok automatizálásáért felel.'
        },
        {
          title: 'Kudarc, fejlődési szemlélet és csapat',
          text: '**Carol Dweck** pszichológus a **fejlődési szemléletet** (growth mindset) írta le: a képességek **fejleszthetők** erőfeszítéssel, jó módszerrel és segítséggel. A rögzült szemlélet szerint „vagy tehetséges vagy, vagy nem”. Az újabb nagy vizsgálatok szerint a rövid „mindset-tréningek” átlagos hatása **szerény**, de bizonyos helyzetekben (pl. nehézségekkel küzdő diákoknál) kimutatható – vagyis nem csodaszer, de **számít, hogyan beszélünk a hibáról**: a hiba információ, nem ítélet.\n\nMichael Jordan híres mondata (egy 1997-es reklámból): **„Több mint 9000 dobást rontottam el pályafutásom során. Közel 300 meccset elvesztettem. 26-szor bízták rám a győztes dobást, és elrontottam. Újra és újra kudarcot vallottam. Ezért vagyok sikeres.”**\n\nHogyan dolgozd fel a vereséget?\n\n1. Hagyd, hogy rossz legyen egy kicsit – ez normális.\n2. Aztán kérdezd meg: **mit tanultam belőle?** Mi múlt rajtam, és mi nem?\n3. Válassz egy konkrét dolgot a következő edzésre.\n\n**Csapat és fair play:** a jó csapatban a tagok bíznak egymásban, segítik a gyengébbet, és tisztelik az ellenfelet és a bírót. A fair play nem gyengeség: a sport értékének alapja.',
          warn: 'Ha tartósan szomorú, szorongó vagy, nem alszol, vagy a sport már csak teher, beszélj erről egy felnőttel (szülő, edző, iskolapszichológus). A lelki egészség ugyanolyan fontos, mint a térd vagy a boka.'
        }
      ],
      quiz: [
        { q: 'Mi a belső motiváció?', options: ['Az érmek gyűjtése', 'A szülők kérése miatt', 'Pénzért sportolni', 'Azért csinálni, mert élvezed és érdekel'], answer: 3, explain: 'Belső motiváció: a tevékenység öröme, érdeklődés, a fejlődés élménye.' },
        { q: 'Melyik egy folyamatcél?', options: ['Minden rajtnál aktívan hajtom a karom', 'Bekerülök a válogatottba', 'Legyőzöm a riválisomat', 'Megnyerem a bajnokságot'], answer: 0, explain: 'A folyamatcél a végrehajtásra vonatkozik, és minden nap rajtad múlik.' },
        { q: 'Mit állít a „fordított U” összefüggés?', options: ['A közepes izgalmi szintnél a legjobb a teljesítmény', 'Minél izgatottabb vagy, annál jobb', 'Az izgalom nem számít', 'Az izgalom mindig árt'], answer: 0, explain: 'Túl kevés és túl sok izgalom is ront; az optimum közepes és egyéni.' },
        { q: 'Mi segít leginkább lenyugodni versenyhelyzetben gyorsan?', options: ['A hibák felsorolása', 'Energiaital', 'Gyors, kapkodó légzés', 'Lassú, hosszú kilégzés'], answer: 3, explain: 'A hosszú kilégzés a paraszimpatikus idegrendszeren keresztül lassítja a szívverést.' },
        { q: 'Kb. mennyi egy ember egyszerű reakcióideje hangjelre?', options: ['1,5 s', '3 s', '0,015 s', '0,15 s'], answer: 3, explain: 'Hangra kb. 0,15–0,17 s, fényre kb. 0,2–0,25 s.' },
        { q: 'Mit jelent a fejlődési szemlélet?', options: ['Edzés nélkül is lehet fejlődni', 'A tehetség születésünkkor eldől', 'Csak a győzelem számít', 'A képességek erőfeszítéssel, jó módszerrel fejleszthetők'], answer: 3, explain: 'Dweck fejlődési szemlélete szerint a képességek fejleszthetők; a hiba tanulási lehetőség.' },
        { q: 'Miért nem helyettesíti a vizualizáció a valódi edzést, mégis hasznos?', options: ['Mert gyorsítja a reakcióidőt 0,1 s alá', 'Mert izmot épít', 'Mert részben ugyanazok az agyi mozgatóterületek aktiválódnak, így kiegészíti a gyakorlást', 'Mert csak álmodozás'], answer: 2, explain: 'A mentális gyakorlás kiegészíti, de nem pótolja a fizikai gyakorlást.' }
      ]
    },
    {
      id: 'olimpia',
      title: 'Az olimpiák és a magyar sport története',
      level: 1, minutes: 18,
      summary: 'Az ókori Olümpiától Párizsig: Coubertin, Hajós Alfréd, a magyar olimpiai sikerek és legendák.',
      tags: ['olimpia', 'ókori olimpia', 'Olümpia', 'Coubertin', 'NOB', 'Kemény Ferenc', 'Hajós Alfréd', 'Papp László', 'Gerevich Aladár', 'Egerszegi Krisztina', 'Kozák Danuta', 'Hosszú Katinka', 'Szilágyi Áron', 'vízilabda', 'vívás', 'paralimpia', 'Párizs 2024', 'éremtáblázat'],
      terms: [],
      sections: [
        {
          title: 'Az ókori olimpiák',
          text: 'Az ókori görögök a hagyomány szerint **i. e. 776**-ban rendezték meg az első feljegyzett játékokat **Olümpiában**, Zeusz szentélyénél. A játékokat **négyévente** tartották; ezt a négyéves időszakot hívták **olümpiásznak**.\n\n- Az első versenyszám a **sztadion**, egy kb. 192 m-es futás volt.\n- Később jött a hosszabb futás, a **pentatlon** (futás, távolugrás, diszkoszvetés, gerelyhajítás, birkózás), az ökölvívás, a **pankrátion** (szinte szabályok nélküli küzdelem) és a kocsiverseny.\n- A győztes **olajfaágból font koszorút** kapott – de otthon hősként ünnepelték.\n- A játékok idejére **fegyvernyugvást** (ekekheiria) hirdettek, hogy a versenyzők és nézők biztonságban utazhassanak.\n- Csak **szabad görög férfiak** indulhattak.\n\nA hagyomány szerint I. Theodosius római császár **i. sz. 393/394 körül** tiltotta be a pogány ünnepeket – ezzel több mint ezer év után véget értek az ókori játékok.'
        },
        {
          title: 'Az újkori olimpia születése',
          text: 'A francia **Pierre de Coubertin** báró úgy gondolta, hogy a sport neveli a fiatalokat, és közelebb hozza egymáshoz a népeket. Az ő kezdeményezésére **1894-ben Párizsban**, a Sorbonne-on megalakult a **Nemzetközi Olimpiai Bizottság (NOB)**. Az alapító tagok egyike a magyar **Kemény Ferenc** tanár volt.\n\nAz első újkori olimpiát **1896-ban Athénban** rendezték. Néhány mérföldkő:\n\n- **1900, Párizs:** először indulhattak nők;\n- **1920, Antwerpen:** először lengett az **ötkarikás zászló** (a karikák az öt kontinenst jelképezik) és hangzott el az olimpiai eskü;\n- **1924, Chamonix:** az első téli olimpia;\n- **1928, Amszterdam:** először égett olimpiai láng;\n- **1960, Róma:** az első paralimpiai játékok.\n\nAz olimpiai mottó: **„Citius, Altius, Fortius”** – gyorsabban, magasabbra, erősebben; 2021 óta kiegészült: **„Communiter”** – együtt.',
          widget: { type: 'idovonal', options: { title: 'Az olimpiai mozgalom mérföldkövei', events: [
            { year: -776, label: 'i. e. 776', title: 'Az első feljegyzett ókori olimpia', text: 'Olümpiában, Zeusz szentélyénél; az első versenyszám a kb. 192 m-es sztadionfutás.' },
            { year: 393, label: 'i. sz. 393/394', title: 'Az ókori játékok vége', text: 'A hagyomány szerint I. Theodosius tilalmával értek véget.' },
            { year: 1894, label: '1894', title: 'Megalakul a NOB', text: 'Coubertin kezdeményezésére Párizsban; alapító tagja a magyar Kemény Ferenc.' },
            { year: 1896, label: '1896', title: 'Athén, az első újkori olimpia', text: 'Hajós Alfréd két úszószámban nyer: ő az első magyar olimpiai bajnok.' },
            { year: 1920, label: '1920', title: 'Ötkarikás zászló', text: 'Antwerpenben lengett először az olimpiai zászló.' },
            { year: 1924, label: '1924', title: 'Az első téli olimpia', text: 'Chamonix-ban rendezték.' },
            { year: 1952, label: '1952', title: 'Helsinki: 16 magyar arany', text: 'Magyarország a harmadik helyen végzett az éremtáblázaton; az Aranycsapat olimpiai bajnok lett.' },
            { year: 1960, label: '1960', title: 'Az első paralimpia', text: 'Rómában rendezték az első paralimpiai játékokat.' },
            { year: 2024, label: '2024', title: 'Párizs', text: 'Magyarország 6 arany-, 7 ezüst- és 6 bronzérmet nyert.' }
          ] } }
        },
        {
          title: 'Hajós Alfréd és a magyar kezdetek',
          text: '**Hajós Alfréd** lett az **első magyar olimpiai bajnok**: 1896-ban Athénban a **100 m-es** és az **1200 m-es** gyorsúszást is megnyerte – a nyílt tengerben, hideg vízben, hullámok között. Később elismert **építész** lett: 1924-ben a párizsi olimpia művészeti versenyén stadiontervével **ezüstérmet** nyert (az aranyat nem adták ki), róla nevezték el a budapesti Hajós Alfréd Nemzeti Sportuszodát.\n\nA magyar sport a 20. század elején gyorsan erősödött. Az **1952-es helsinki** olimpián Magyarország **16 aranyéremmel** a harmadik helyen végzett az éremtáblázaton – ma is ez a legsikeresebb magyar olimpiai szereplés. Itt nyert olimpiai bajnokságot az **Aranycsapat** is Puskás Ferenccel.'
        },
        {
          title: 'Magyar olimpiai legendák',
          text: '- **Gerevich Aladár** (vívás): **7 olimpiai aranyérem**, és hat egymást követő olimpián (1932–1960) nyert aranyat – a második világháború miatt kimaradt két olimpia nélkül még több is lehetett volna.\n- **Papp László** (ökölvívás): **1948, 1952 és 1956** – a világon elsőként nyert három olimpiai aranyat ökölvívásban.\n- **Kárpáti Rudolf** (kard): 6 olimpiai arany.\n- **Egerszegi Krisztina** (úszás): **5 olimpiai arany**; 1988-ban Szöulban 14 évesen lett olimpiai bajnok 200 m háton.\n- **Kozák Danuta** (kajak): **6 olimpiai arany** (2012–2020) – a legsikeresebb magyar női olimpikon.\n- **Hosszú Katinka** (úszás): 2016-ban Rióban 3 arany- és 1 ezüstérem; hosszú, kitartó munkával ért fel a csúcsra.\n- **Szilágyi Áron** (kard): zsinórban **háromszor** nyert egyéni olimpiai bajnokságot (2012, 2016, 2020).\n- A magyar **férfi vízilabda-válogatott** **9** olimpiai aranyérmével a sportág legsikeresebb nemzete.\n\nA legtöbb magyar olimpiai aranyat a **vívás** hozta; mellette a kajak-kenu, az úszás, a vízilabda, a birkózás és az öttusa a hagyományosan erős sportágaink.',
          tip: 'Ezek a sportolók nem „csodagyerekként” lettek nagyok: évtizedes, napi többórás munka, kiváló edzők és a vereségekből való tanulás áll a sikereik mögött.'
        },
        {
          title: 'Számokban: a magyar olimpiai mérleg',
          text: 'A **2024-es párizsi** olimpián Magyarország **19 érmet** nyert: **6 aranyat, 7 ezüstöt és 6 bronzot**. Olimpiai bajnokok lettek:\n\n- **Kós Hubert** – 200 m hátúszás;\n- **Milák Kristóf** – 100 m pillangó;\n- **Rasovszky Kristóf** – 10 km nyíltvízi úszás;\n- a **férfi párbajtőrcsapat** (Andrásfi Tibor, Koch Máté, Nagy Dávid, Siklósi Gergely);\n- **Márton Viviana** – taekwondo, 67 kg;\n- **Gulyás Michelle** – öttusa.\n\nA nyári olimpiák történetében (1896–2024) a magyar sportolók **kb. 530 érmet**, ebből **187 aranyérmet** nyertek (a forrásoktól és a számítási módtól függően ±1 eltérés lehet). Ezzel Magyarország az **örökranglista első tíz helyezettje** között van – egy kb. 10 milliós országtól ez kiemelkedő, lakosságarányosan pedig a világ legsikeresebb nemzetei közé tartozik.\n\nA **téli olimpiákon** eddig 2 magyar aranyérem született: 2018-ban Phjongcshangban a férfi rövidpályás gyorskorcsolya-váltó (Burján Csaba, Knoch Viktor, Liu Shaolin Sándor, Liu Shaoang), 2022-ben Pekingben Liu Shaoang 500 m-en.',
          warn: 'Az olimpiai eszme lényege a **tiszta verseny**. A dopping nemcsak csalás, hanem az egészséget is súlyosan veszélyezteti – és a sportoló bármikor elveszítheti miatta az érmeit, akár évekkel később, újravizsgált minták alapján is.'
        }
      ],
      quiz: [
        { q: 'Mikor rendezték a hagyomány szerint az első feljegyzett ókori olimpiát?', options: ['i. sz. 393', 'i. e. 1200', 'i. e. 490', 'i. e. 776'], answer: 3, explain: 'I. e. 776-ban, Olümpiában.' },
        { q: 'Ki kezdeményezte az újkori olimpiák felélesztését?', options: ['Hajós Alfréd', 'Pierre de Coubertin', 'Kemény Ferenc', 'I. Theodosius'], answer: 1, explain: 'Pierre de Coubertin; a NOB 1894-ben alakult meg Párizsban.' },
        { q: 'Ki volt az első magyar olimpiai bajnok?', options: ['Papp László', 'Gerevich Aladár', 'Puskás Ferenc', 'Hajós Alfréd'], answer: 3, explain: 'Hajós Alfréd 1896-ban két úszószámban nyert.' },
        { q: 'Hány aranyérmet nyert Magyarország az 1952-es helsinki olimpián?', options: ['10', '26', '6', '16'], answer: 3, explain: '16 aranyéremmel a harmadik helyen végzett – ez a legsikeresebb magyar olimpia.' },
        { q: 'Melyik sportágban nyerték a magyarok a legtöbb olimpiai aranyat?', options: ['Vívás', 'Atlétika', 'Labdarúgás', 'Tenisz'], answer: 0, explain: 'A vívás a legeredményesebb magyar olimpiai sportág.' },
        { q: 'Hány érmet nyert Magyarország a 2024-es párizsi olimpián?', options: ['19', '6', '25', '13'], answer: 0, explain: '6 arany, 7 ezüst, 6 bronz = 19 érem.' },
        { q: 'Ki nyert három olimpiai aranyat ökölvívásban elsőként a világon?', options: ['Papp László', 'Kós Hubert', 'Kárpáti Rudolf', 'Szilágyi Áron'], answer: 0, explain: 'Papp László 1948-ban, 1952-ben és 1956-ban nyert.' },
        { q: 'Mit jelent a 2021-ben az olimpiai mottóhoz hozzáadott „Communiter” szó?', options: ['Együtt', 'Gyorsabban', 'Tisztán', 'Erősebben'], answer: 0, explain: 'Citius, Altius, Fortius – Communiter: gyorsabban, magasabbra, erősebben – együtt.' }
      ]
    }
  ]
});
