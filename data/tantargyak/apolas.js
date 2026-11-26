/* Tantárgy: Ápolás és egészségügyi alapok */
STUDIE.addSubject({
  id: 'apolas',
  stage: 'szakma',
  title: 'Ápolás és egészségügyi alapok',
  icon: '🩺',
  color: '#0e9f9a',
  description: 'Vitális paraméterek, kézhigiénia és fertőzésmegelőzés, betegmozgatás, gyógyszerelés, sebkezelés, kommunikáció, etika és idősgondozás.',
  intro: 'Ez a tananyag az ápolás és a gondozás **elméleti alapjaiba** vezet be: mit mér az ápoló, hogyan előzi meg a fertőzéseket, hogyan mozgatja biztonságosan a beteget, és hogyan beszél vele. **Fontos: ez a tananyag nem helyettesíti a szakmai képzést, a gyakorlati oktatást és a munkahelyi protokollokat.** Betegellátási beavatkozást (pl. gyógyszer beadása, injekció, sebkötözés) csak megfelelő képesítéssel, orvosi rendelés és a helyi eljárásrend szerint szabad végezni. Az itt közölt értékek **tájékoztató** jellegű felnőtt irányértékek; a beteg állapotáról mindig orvos dönt. Vészhelyzetben hívd a **112**-t.',
  lessons: [
    {
      id: 'vitalis',
      title: 'Vitális paraméterek mérése',
      level: 1, minutes: 15,
      summary: 'Pulzus, légzésszám, vérnyomás, testhőmérséklet, oxigénszaturáció és tudatállapot: hogyan mérjük, mi a felnőtt irányérték, és mikor kell jelezni.',
      tags: ['vitális paraméter', 'életjel', 'pulzus', 'szívfrekvencia', 'légzésszám', 'vérnyomás', 'Hgmm', 'szisztolés', 'diasztolés', 'hipertónia', 'testhőmérséklet', 'láz', 'szaturáció', 'SpO2', 'pulzoximéter', 'tudatállapot', 'AVPU', 'NEWS2', 'dokumentálás'],
      sections: [
        {
          title: 'Miért mérünk?',
          text: 'A **vitális paraméterek** (életjelek) a szervezet alapvető működését mutatják: a keringést, a légzést, a hőszabályozást és az idegrendszert. Az ápoló rendszeresen méri és **dokumentálja** őket, mert a beteg állapotának romlása gyakran **órákkal korábban** látszik a számokon, mint a beteg panaszaiban.\n\nA mért érték önmagában keveset mond: a **változás** és az **összkép** a fontos. Egy kissé magasabb pulzus egy lázas betegnél várható, egy hirtelen leesett vérnyomás viszont azonnali jelzést igényel. Sok kórházban **korai figyelmeztető pontrendszert** használnak (pl. a brit eredetű **NEWS2**), amely több paraméterből pontszámot ad, és megmondja, mikor kell orvost hívni.\n\nAz itt szereplő értékek **egészséges, nyugalomban lévő felnőttre** vonatkozó tájékoztató tartományok. Gyermekeknél, időseknél, terhességben, sportolóknál és betegségekben mások lehetnek. A **határértékeket és a teendőket mindig a munkahelyi protokoll** határozza meg.'
        },
        {
          title: 'Pulzus és légzésszám',
          text: '**Pulzus** (szívfrekvencia): nyugalomban felnőttnél általában **60–100/perc**. Jól edzett sportolónál ennél alacsonyabb is lehet.\n\n- Leggyakrabban a **csuklón** (orsóartéria, a hüvelykujj felőli oldalon) tapintjuk, **mutató- és középső ujjal** (a hüvelykujjadban a saját pulzusodat éreznéd).\n- Figyeled a **szaporaságot**, a **ritmust** (szabályos-e) és a **telítettséget** (erős vagy gyenge).\n- Szabálytalan ritmusnál **egy teljes percig** számolj.\n\n**Légzésszám**: felnőttnél nyugalomban kb. **12–20/perc**. Egy belégzés + egy kilégzés = egy légvétel.\n\n- Lehetőleg **úgy számold, hogy a beteg ne vegye észre** (pl. a pulzusmérés után az ujjadat a csuklón hagyva figyeled a mellkast), mert ha tudja, akaratlanul is másképp lélegzik.\n- Figyeld a légzés **mélységét, ritmusát**, a nehézlégzés jeleit (segédizmok használata, orrszárny-legyezés, beszéd közben elfogyó levegő), és a bőr színét (kékes ajak).'
        },
        {
          title: 'Vérnyomás',
          text: 'A vérnyomást **Hgmm**-ben adjuk meg két számmal: a **szisztolés** (a szív összehúzódásakor) és a **diasztolés** (elernyedéskor) érték, pl. 118/76 Hgmm.\n\nA **2024-es európai kardiológiai (ESC) ajánlás** felnőttekre, rendelőben mért értékekre:\n\n- **nem emelkedett**: 120/70 Hgmm alatt,\n- **emelkedett**: szisztolés 120–139 vagy diasztolés 70–89 Hgmm,\n- **magas vérnyomás (hipertónia)**: 140/90 Hgmm vagy afölött.\n\nA diagnózist orvos állítja fel, ismételt, sokszor otthoni vagy 24 órás méréssel.\n\n**A jó mérés szabályai** (automata vagy kézi készülékkel):\n\n1. A beteg **kb. 5 percig** nyugodtan üljön, háttal támaszkodva, lábát ne tegye keresztbe.\n2. A **mandzsetta mérete** illeszkedjen a felkar kerületéhez: a túl kicsi mandzsetta **hamisan magas**, a túl nagy hamisan alacsony értéket ad.\n3. A mandzsetta **szívmagasságban** legyen, a kar alátámasztva.\n4. Mérés közben **ne beszéljen**.\n5. Első alkalommal mindkét karon mérnek; ismételt mérés 1–2 perc múlva.',
          tip: 'A mértékegység a higanyos vérnyomásmérő emléke: a Hgmm (higanymilliméter) azt mutatja, hány milliméter magas higanyoszlopot tartana meg a nyomás. Ma már higanymentes készülékeket használnak.'
        },
        {
          title: 'Testhőmérséklet, szaturáció, tudat',
          text: '**Testhőmérséklet**: a normál érték a mérés helyétől függ (a hónaljban mért érték alacsonyabb, mint a végbélben mért). Felnőttnél tájékoztatóul kb. **36–37,5 °C** tekinthető normálisnak; **38 °C felett** lázról beszélünk. Mérés: digitális hőmérő, fülhőmérő, homlokhőmérő a gyártó utasítása szerint. Idős betegnél fertőzés mellett is elmaradhat a láz, sőt a **kihűlés** (35 °C alatt) is veszélyjel.\n\n**Oxigénszaturáció (SpO2)**: a **pulzoximéter** az ujjbegyen fénnyel méri, a vér hemoglobinjának hány százaléka szállít oxigént. Egészséges felnőttnél általában **95–100%**. Bizonyos krónikus tüdőbetegeknél az orvos alacsonyabb célértéket határozhat meg. Hamis értéket adhat a **hideg ujj**, a **körömlakk, műköröm**, a mozgás és a rossz keringés.\n\n**Tudatállapot**: a legegyszerűbb skála az **AVPU**:\n\n- **A** (alert): éber, beszél, tájékozott,\n- **V** (voice): csak megszólításra reagál,\n- **P** (pain): csak fájdalomingerre reagál,\n- **U** (unresponsive): semmire sem reagál.\n\nAz **újonnan kialakult zavartság** mindig sürgős jelzés az orvos felé!',
          widget: { type: 'parositas', options: { title: 'Párosítsd a paramétert a felnőtt irányértékkel!', count: 6, pairs: [
            ['Nyugalmi pulzus', 'Kb. 60–100/perc'],
            ['Légzésszám', 'Kb. 12–20/perc'],
            ['Magas vérnyomás (ESC 2024)', '140/90 Hgmm vagy afölött'],
            ['Nem emelkedett vérnyomás (ESC 2024)', '120/70 Hgmm alatt'],
            ['Láz', '38 °C felett'],
            ['Oxigénszaturáció (egészséges)', 'Kb. 95–100%'],
            ['AVPU „P”', 'Csak fájdalomingerre reagál']
          ] } }
        },
        {
          title: 'Dokumentálás és jelzés',
          text: 'Amit nem dokumentáltál, az a jog szemében **meg sem történt**. Minden mérésnél rögzítsd:\n\n- az **időpontot**,\n- az **értéket** és a **mérés módját** (pl. bal kar, hónalj),\n- a beteg **állapotát** a mérés idején (pl. „sétából visszaérve”, „lázcsillapító után 1 órával”),\n- ha eltérést találtál, **kinek és mikor** jelezted.\n\nHa egy érték **váratlan**, először **mérd meg újra** (jó a mandzsetta? ül a pulzoximéter?). Ha megerősítést nyer, vagy a beteg rosszul van, **ne várj** a következő mérési időpontig: szólj az ápolásvezetőnek, orvosnak. Azonnali életveszélyben (nem reagál, nem lélegzik normálisan) **112**, illetve kórházban az újraélesztő csapat riasztása.'
        }
      ],
      quiz: [
        { q: 'Miért ne a hüvelykujjaddal tapintsd a beteg pulzusát?', options: ['Mert túl erős', 'Mert a saját hüvelykujjadban is van pulzus, és azt éreznéd', 'Mert ügyetlen', 'Mert hideg'], answer: 1, explain: 'A hüvelykujjban erős a saját pulzusod, ezért mutató- és középső ujjal tapintunk.' },
        { q: 'Mi a hatása a túl kicsi vérnyomásmérő mandzsettának?', options: ['Hamisan alacsony érték', 'Hamisan magas érték', 'Nincs hatása', 'Nem lehet vele mérni'], answer: 1, explain: 'A keskeny mandzsetta nagyobb nyomással szorítja el az artériát, ezért magasabb értéket mutat.' },
        { q: 'A beteg csak akkor nyitja ki a szemét és válaszol, ha megszólítod. Melyik AVPU-kategória?', options: ['A', 'V', 'P', 'U'], answer: 1, explain: 'V (voice): csak hangra, megszólításra reagál. Ez újonnan kialakulva sürgős jelzést igényel.' }
      ]
    },
    {
      id: 'higienia',
      title: 'Kézhigiénia és fertőzésmegelőzés',
      level: 1, minutes: 15,
      summary: 'A WHO öt pillanata, kézfertőtlenítés és kézmosás, egyéni védőeszközök fel- és levétele, izoláció, éles eszközök és a tűszúrásos sérülés.',
      tags: ['kézhigiénia', 'kézfertőtlenítés', 'kézmosás', 'WHO', 'öt pillanat', 'egyéni védőeszköz', 'kesztyű', 'maszk', 'köpeny', 'izoláció', 'kontakt', 'cseppfertőzés', 'aerogén', 'nozokomiális fertőzés', 'Clostridioides difficile', 'éles eszköz', 'tűszúrás', 'hepatitisz B'],
      sections: [
        {
          title: 'A kéz a legfőbb terjesztő',
          text: 'Az egészségügyi ellátással összefüggő (régi nevén kórházi, **nozokomiális**) fertőzések jelentős része a **személyzet kezén** keresztül terjed: egyik betegtől, felületről a másikhoz. Ezek ellen a legolcsóbb és leghatásosabb védekezés a **kézhigiénia**.\n\nA WHO szerinti **öt pillanat**, amikor kezet kell fertőtleníteni:\n\n1. **a beteg érintése előtt**,\n2. **tiszta vagy aszeptikus beavatkozás előtt** (pl. kötéscsere, katéter kezelése),\n3. **testnedvekkel való érintkezés kockázata után** (és kesztyűlevétel után),\n4. **a beteg érintése után**,\n5. **a beteg környezetének érintése után** (ágy, éjjeliszekrény, monitor), akkor is, ha magát a beteget nem érintetted.\n\nKézhigiéniai alapszabályok: **rövid, lakkozatlan köröm**, **műköröm nélkül**, **gyűrű, karóra, karkötő nélkül** (alattuk megmaradnak a kórokozók), rövid ujjú munkaruha.'
        },
        {
          title: 'Kézfertőtlenítés vagy kézmosás?',
          text: '- **Alkoholos kézfertőtlenítő** (bedörzsölés): ez az **alapeset**, ha a kéz láthatóan nem szennyezett. A WHO-módszer szerint a teljes folyamat kb. **20–30 másodperc**: a szert a kéz minden felületére (tenyér, kézhát, ujjközök, hüvelykujj, ujjbegyek, csukló) bedörzsölöd, amíg meg nem szárad.\n- **Szappanos kézmosás**: ha a kéz **láthatóan szennyezett** vagy testnedvvel érintkezett, és bizonyos kórokozóknál. A teljes folyamat kb. **40–60 másodperc**, utána alapos szárítás eldobható papírtörlővel, a csapot a papírtörlővel zárd el.\n\nFontos kivétel: a **Clostridioides difficile** (súlyos hasmenést okozó baktérium) **spóráit az alkohol nem pusztítja el**. Ilyen betegnél kesztyű és **szappanos kézmosás** kell, a helyi protokoll szerint.\n\nA **kesztyű nem helyettesíti** a kézhigiéniát: felvétel előtt és levétel után is fertőtleníts kezet, és két beteg között, illetve ugyanannál a betegnél szennyezett területről tiszta területre váltva kesztyűt kell cserélni.'
        },
        {
          title: 'Egyéni védőeszközök és izoláció',
          text: 'Az **általános (standard) óvintézkedések** szerint **minden** beteg vérét és testnedveit potenciálisan fertőzőnek tekintjük. Ezért, ha várható az érintkezés, **kesztyű**, ha fröccsenés várható, **arcvédelem** (maszk, szemüveg, arcvédő) és **köpeny/kötény** kell.\n\nFertőző betegnél a terjedési mód szerint további **izolációs** óvintézkedések:\n\n- **kontakt**: érintéssel terjedő kórokozók (pl. egyes multirezisztens baktériumok): kesztyű, köpeny, saját eszközök a betegnek,\n- **cseppfertőzés**: köhögéssel, tüsszentéssel, nagyobb cseppekkel terjedő kórokozók: sebészi maszk közeli ellátáskor,\n- **aerogén (légúti, levegővel terjedő)**: apró részecskékkel, nagy távolságra is (pl. tuberkulózis, kanyaró): légzésvédő (FFP2/FFP3), külön kórterem.\n\nA **levétel** a legkockázatosabb: ilyenkor szennyeződhet be a kezed, az arcod. A sorrend a helyi protokoll szerint változhat, egy gyakori változat:',
          widget: { type: 'idovonal', options: { steps: true, title: 'Védőeszközök levétele: tedd sorrendbe!', events: [
            { year: 1, label: '1. lépés', title: 'Kesztyű', text: 'A legszennyezettebb eszköz: úgy húzod le, hogy a külső oldala ne érjen a bőrödhöz.' },
            { year: 2, label: '2. lépés', title: 'Kézfertőtlenítés', text: 'A kesztyű levétele után azonnal.' },
            { year: 3, label: '3. lépés', title: 'Szemvédő vagy arcvédő', text: 'A pántjánál fogva, hátulról veszed le, az elejéhez nem nyúlsz.' },
            { year: 4, label: '4. lépés', title: 'Köpeny', text: 'Kioldod, és kifordítva, magadtól eltartva göngyölöd össze.' },
            { year: 5, label: '5. lépés', title: 'Maszk vagy légzésvédő', text: 'A pántjainál fogva, az elejét nem érintve.' },
            { year: 6, label: '6. lépés', title: 'Ismét kézhigiénia', text: 'Az egész folyamat végén újra fertőtlenítesz vagy kezet mosol.' }
          ] } }
        },
        {
          title: 'Éles eszközök és tűszúrásos sérülés',
          text: '- Használt tűt **soha ne kupakolj vissza** két kézzel: ez a tűszúrásos sérülések egyik fő oka.\n- Az éles eszközt **közvetlenül a használat helyén** dobd a **szúrásbiztos gyűjtőbe**, amelyet legfeljebb a jelölt szintig szabad megtölteni.\n- Ahol van, használj **biztonsági (tűvédős) eszközöket**.\n\nHa mégis megszúrod vagy megvágod magad egy használt eszközzel, vagy a nyálkahártyádra (szem, száj) vér fröccsen:\n\n1. a sebet hagyd **szabadon vérezni**, ne nyomkodd, ne szívd,\n2. mosd le bő **folyóvízzel és szappannal** (nyálkahártyát, szemet bő vízzel öblíts),\n3. **azonnal jelentsd** a felettesednek, és a munkahelyi protokoll szerint menj orvoshoz: bizonyos megelőző kezelések (pl. HIV-expozíció utáni profilaxis) **órákon belül** a leghatásosabbak,\n4. az esetet **dokumentálni** kell (munkabaleset).\n\nAz egészségügyi dolgozók számára javasolt a **hepatitisz B elleni védőoltás**.'
        }
      ],
      quiz: [
        { q: 'Mennyi ideig tart a WHO szerinti alkoholos kézfertőtlenítés teljes folyamata?', options: ['3–5 másodperc', 'Kb. 20–30 másodperc', 'Kb. 5 perc', 'Amíg nedves'], answer: 1, explain: 'A WHO szerint a bedörzsölés kb. 20–30 másodperc, a szappanos kézmosás kb. 40–60 másodperc.' },
        { q: 'Melyik kórokozónál nem elég az alkoholos kézfertőtlenítő?', options: ['Clostridioides difficile (spórái miatt)', 'Influenzavírus', 'Staphylococcus aureus', 'Nátha vírusa'], answer: 0, explain: 'A C. difficile spóráit az alkohol nem pusztítja el, szappanos kézmosás kell.' },
        { q: 'Mit NE tegyél a használt injekciós tűvel?', options: ['Ne dobd szúrásbiztos gyűjtőbe', 'Ne kupakold vissza két kézzel', 'Ne a használat helyén dobd el', 'Ne nézd meg'], answer: 1, explain: 'A visszakupakolás a tűszúrásos sérülések egyik fő oka.' }
      ]
    },
    {
      id: 'betegmozgatas',
      title: 'Betegmozgatás és ergonómia',
      level: 1, minutes: 13,
      summary: 'Gerinckímélő munka, segédeszközök, a beteg bevonása, testhelyzetek, felfekvés- és elesésmegelőzés.',
      tags: ['betegmozgatás', 'ergonómia', 'gerinc', 'emelés', 'csúszólepedő', 'betegemelő', 'forgókorong', 'testhelyzet', 'oldalfekvés', 'félig ülő helyzet', 'felfekvés', 'decubitus', 'nyomási sérülés', 'elesés', 'mobilizálás'],
      sections: [
        {
          title: 'Miért fáj az ápolók dereka?',
          text: 'Az ápolás az egyik legnagyobb **fizikai megterheléssel** járó munka: a dolgozók körében nagyon gyakori a derék- és vállfájdalom. A felnőtt beteg teljes testsúlyát **egy embernek kézzel felemelni nem biztonságos**: ilyenkor **segédeszköz** és/vagy **több ember** kell.\n\nAz ergonómiai alapelvek:\n\n- **Tervezz előre**: mit akarsz elérni, hány ember és milyen eszköz kell, szabad-e az út (fékezett ágy, eltolt szék, nincs csúszós padló).\n- Az **ágy magassága** legyen kb. a **csípőd** magasságában, ne görnyedj.\n- **Széles terpesz**, a súly a lábadon; a terhet **közel** tartsd a testedhez.\n- **Térdből** dolgozz, a hát egyenes, és **ne csavarodj**: a lábaddal fordulj, ne a derekaddal.\n- **Húzás és tolás** jobb, mint emelés; **csúsztatás** jobb, mint húzás.\n- **Kommunikálj**: mondd el a betegnek, mi fog történni, és több segítő esetén **közösen számoljatok** („egy, kettő, és…”).'
        },
        {
          title: 'Segédeszközök és a beteg bevonása',
          text: '- **Csúszólepedő, csúszócső**: az ágyban feljebb húzás, oldalra fordítás súrlódás nélkül, kevés erővel. A bőr nyíróerő okozta sérülését is csökkenti.\n- **Mobil vagy mennyezeti betegemelő** (lift): az ágyból székbe, kerekesszékbe emeléshez, a hevederrel. Használatát gyakorolni kell, és mindig a beteg súlyának és méretének megfelelő heveder kell.\n- **Forgókorong, átültető deszka**: ülő helyzetből áthelyezéshez.\n- **Kapaszkodó, járókeret, bot**: önálló mozgás támogatása.\n\nA legfontosabb „segédeszköz” maga a **beteg**: amit képes megtenni, azt **tegye meg ő** (fordulás, kapaszkodás, felülés), te csak segítesz. Ez kíméli a gerincedet, és a betegnek is jobb, mert megőrzi az erejét, az önállóságát (**mobilizálás**). A tartósan fekvő beteg napok alatt veszít az izomerejéből.'
        },
        {
          title: 'Testhelyzetek és felfekvés-megelőzés',
          text: 'A mozogni nem tudó betegnél a **testhelyzet rendszeres változtatása** életfontosságú. Ha egy bőrterület hosszan nyomás alatt van (főleg csont fölött: **keresztcsont, sarok, csípő, könyök, lapocka, tarkó**), a szövetek nem kapnak vért, és **nyomási sérülés (felfekvés, decubitus)** alakul ki, akár néhány óra alatt.\n\n- A testhelyzet-változtatás gyakoriságát az **egyéni kockázat** (pl. Braden- vagy Norton-skála) és a bőr állapota szerint határozzák meg; a klasszikus gyakorlat gyakran **2–4 óránként** forgat.\n- **30°-os oldalfekvés**: párnával alátámasztva, így a csípőcsont nincs közvetlen nyomás alatt.\n- A **sarkakat** tehermentesítsd (lábszár alá párna, a sarok „lebegjen”).\n- A **félig ülő** helyzet ne legyen 30°-nál meredekebb huzamosan, ha nem szükséges, mert a beteg lecsúszik, és a nyíróerő sérti a bőrt.\n- **Nyomáscsökkentő matrac**, rendszeres **bőrmegfigyelés**, száraz, tiszta bőr, megfelelő **táplálás és folyadék**.\n\nAz ujjal megnyomott, **nem elhalványuló bőrpír** már az első stádium jele: azonnal jelezd, és tehermentesítsd a területet.'
        },
        {
          title: 'Elesés megelőzése',
          text: 'Idős, beteg embereknél az **elesés** súlyos következményekkel járhat (combnyaktörés, fejsérülés), és a félelem az újabb eséstől is visszaveti a mozgást. A kockázatot növeli: gyengeség, szédülés, látászavar, zavartság, vizelési sürgetés éjszaka, nyugtatók és vérnyomáscsökkentők, rossz lábbeli, akadályok.\n\nMegelőzés:\n\n- **csúszásmentes, zárt** papucs vagy cipő, nem zokni,\n- **jó világítás**, éjszakai fény, szabad útvonal, nincs kábel, szőnyegszél,\n- a **csengő, szemüveg, bot** kéz közelben legyen,\n- az ágy **alacsony**, a kerekek **fékezve**,\n- fekvésből **lassan** felülni, ülve várni egy kicsit (vérnyomásesés miatti szédülés),\n- rendszeres WC-re kísérés.\n\nHa a beteg elesett, **ne kapd fel azonnal**: nézd meg, eszméleténél van-e, fáj-e valamije, nem deformált-e a végtagja (pl. kifordult, megrövidült láb csípőtörésre utal). Hívj segítséget, és a protokoll szerint jelezz az orvosnak.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a helyzetet a helyes megoldással!', count: 6, pairs: [
            ['A beteget feljebb kell húzni az ágyban', 'Csúszólepedő, két segítő'],
            ['Ágyból kerekesszékbe emelés, a beteg nem tud állni', 'Betegemelő (lift) hevederrel'],
            ['Az ágy túl alacsony', 'Felemeled kb. csípőmagasságba'],
            ['Nem elhalványuló bőrpír a keresztcsonton', 'Tehermentesítés és azonnali jelzés'],
            ['A sarok tartósan nyomás alatt van', 'Párna a lábszár alá, a sarok „lebeg”'],
            ['A beteg fekvésből gyorsan felállna', 'Előbb üljön egy kicsit az ágy szélén'],
            ['A beteg zokniban indulna a mosdóba', 'Csúszásmentes, zárt lábbeli']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mit tegyél, ha meg kell fordulnod egy teherrel?', options: ['A derekadat csavard el', 'A lábaddal lépj, és az egész testeddel fordulj', 'Gyorsan rántsd meg', 'Hajolj előre'], answer: 1, explain: 'A csavarodó emelés a porckorong-sérülések egyik fő oka.' },
        { q: 'Miért vonjuk be a beteget a mozgatásba, amennyire tudja?', options: ['Hogy kevesebb munkánk legyen, más oka nincs', 'Mert kíméli a gerincünket, és megőrzi a beteg erejét, önállóságát', 'Mert így gyorsabb', 'Nem kell bevonni'], answer: 1, explain: 'A mobilizálás az ápolás része: a tartós fekvés gyorsan gyengít.' },
        { q: 'Mely területeken a legnagyobb a felfekvés veszélye?', options: ['Ahol vastag az izom', 'Csontok fölött: keresztcsont, sarok, csípő, könyök', 'A hason', 'A combon'], answer: 1, explain: 'A csontkiemelkedések felett a bőr és a csont közé szorult szövetek gyorsan vérellátás nélkül maradnak.' }
      ]
    },
    {
      id: 'gyogyszereles',
      title: 'A gyógyszerelés alapjai',
      level: 2, minutes: 15,
      summary: 'Ki rendel, ki ad be; az „öt helyes” szabály, betegazonosítás, beadási módok, tárolás, gyakori hibák és az adagszámítás alapja.',
      tags: ['gyógyszer', 'gyógyszerelés', 'rendelés', 'öt helyes', 'betegazonosítás', 'karszalag', 'adag', 'dózis', 'beadási mód', 'per os', 'szublingvális', 'transzdermális', 'injekció', 'tárolás', 'hűtőlánc', 'lejárat', 'mellékhatás', 'polifarmácia', 'LASA'],
      sections: [
        {
          title: 'Ki dönt és ki ad be?',
          text: 'Gyógyszert **orvos rendel** (írásban, a dokumentációban). Az **ápoló** a rendelés alapján **előkészíti, beadja** és **dokumentálja** a gyógyszert, és **megfigyeli** a hatását és a mellékhatásait. A beadás módjától függ, milyen képesítés kell hozzá: **injekciót, infúziót csak arra képzett, jogosult** szakember adhat.\n\nA gyógyszerelés a betegbiztonság egyik legkritikusabb pontja: egy elírt tizedesvessző, egy összecserélt beteg vagy egy hasonló nevű készítmény **súlyos, akár halálos** hibához vezethet. Ezért szigorú, lépésről lépésre haladó szabályok vannak, és ezektől **soha nem térünk el** sietségből sem.\n\n**Ha bizonytalan vagy** (olvashatatlan rendelés, szokatlanul nagy adag, a beteg azt mondja, „ezt eddig nem kaptam”), **ne add be**, hanem kérdezz rá az orvosnál.'
        },
        {
          title: 'Az „öt helyes” szabály',
          text: 'Minden gyógyszerbeadás előtt ellenőrizd:\n\n1. **Helyes beteg**: legalább **két azonosítóval** (pl. név és születési dátum, karszalag), nem csak a kórteremszám vagy az ágy alapján. Ha a beteg tud beszélni, **ő mondja** a nevét, ne te kérdezd úgy, hogy csak igent kelljen mondania.\n2. **Helyes gyógyszer**: a készítmény neve és hatóanyaga egyezik a rendeléssel. Vigyázat a **hasonló nevű vagy hasonló csomagolású** készítményekkel!\n3. **Helyes adag** (dózis): a mértékegység is (mg, µg, ml, NE)!\n4. **Helyes beadási mód**: szájon át, nyelv alá, bőrre, injekcióban stb.\n5. **Helyes időpont**: időben és a megfelelő gyakorisággal (pl. étkezés előtt vagy után).\n\nSok helyen kiegészítik: **helyes dokumentálás**, a beteg **tájékoztatása**, a beteg **joga a visszautasításra**, és az **allergia** ellenőrzése. A beadást **azonnal** dokumentáld, hogy más ne adja be még egyszer.',
          widget: { type: 'szakma-gyakorlo', options: { kind: 'adag', title: 'Adagszámítás gyakorló (csak tanuláshoz)', help: 'A gyakorlatban a kiszerelést, a rendelést és a számítást **mindig kettős ellenőrzéssel** nézzük. Itt az alapképletet gyakorolhatod: térfogat = előírt dózis / koncentráció.' } }
        },
        {
          title: 'Beadási módok',
          text: '- **Szájon át (per os)**: tabletta, kapszula, oldat. Egyenesen ülve, elegendő vízzel. **Retard (elnyújtott hatású)** és **bélben oldódó** tablettát **nem szabad összetörni**, szétrágni; felezni csak akkor, ha bemetszett és a leírás engedi. Nyelési nehézségnél a gyógyszerésszel, orvossal kell egyeztetni a formáról.\n- **Nyelv alá (szublingvális)**: gyorsan felszívódik (pl. bizonyos szívgyógyszerek).\n- **Bőrön át (transzdermális) tapasz**: a régit mindig vedd le, az újat más helyre ragaszd, és dokumentáld a helyét.\n- **Belégzéssel (inhalációs)**: pumpás vagy poros inhalátor, porlasztó. A technikát a betegnek is meg kell tanítani.\n- **Végbélbe (rektális)**: kúp.\n- **Injekció**: bőr alá (**szubkután**), izomba (**intramuszkuláris**), vénába (**intravénás**). Csak képzett, jogosult szakember, aszeptikus technikával.\n\nA beadás módja befolyásolja a **hatás gyorsaságát** is: az intravénás azonnal hat, a szájon át adott gyógyszer felszívódása időbe telik.'
        },
        {
          title: 'Tárolás, megfigyelés, idős betegek',
          text: '- **Tárolás**: a gyógyszer a gyártó előírása szerint, szobahőmérsékleten vagy **hűtőben (2–8 °C)**, fénytől védve. A **lejárati időt** ellenőrizd, a felbontott cseppek, oldatok felbontás utáni felhasználhatósága rövidebb: írd rá a **bontás dátumát**. A kábítószer-tartalmú gyógyszereket zárva, nyilvántartással kezelik.\n- **Megfigyelés**: hatott-e (pl. csökkent-e a fájdalom), és van-e **mellékhatás**: bőrkiütés, viszketés, hányinger, szédülés, zavartság, vérnyomásesés. **Allergiás reakció** (csalánkiütés, ajak- és nyelvduzzanat, nehézlégzés) azonnali orvosi beavatkozást igényel, súlyosnál **112** vagy a kórházi riasztás.\n- **Idős betegek**: gyakran 5–10 féle gyógyszert szednek (**polifarmácia**). Nő a kölcsönhatások, a szédülés, az elesés, a zavartság kockázata, a vese és a máj lassabban üríti a szereket. Minden új tünetnél gondolni kell a gyógyszerekre is, és jelezni az orvosnak.',
          warn: 'Gyógyszert a beteg **saját** rendelése alapján, a saját dobozából adunk. Más beteg gyógyszerét „kölcsönadni”, a rendelést „fejből” vagy szóban, ellenőrzés nélkül teljesíteni, illetve a beadást előre dokumentálni **tilos**.'
        }
      ],
      quiz: [
        { q: 'Hogyan azonosítod a beteget gyógyszerbeadás előtt?', options: ['A kórteremszám alapján', 'Legalább két azonosítóval, pl. név és születési dátum, karszalag', 'Megkérdezed: „Ön Kovács úr, ugye?”', 'Az ágy alapján'], answer: 1, explain: 'A kórterem és az ágy nem azonosít; a beteg mondja a nevét, és két azonosítót ellenőrzünk.' },
        { q: 'Melyik tablettát nem szabad összetörni?', options: ['Bármelyiket szabad', 'A retard (elnyújtott hatású) és a bélben oldódó tablettát', 'A bemetszett tablettát soha', 'Csak a vitaminokat'], answer: 1, explain: 'Összetörve a retard tabletta egyszerre szabadítaná fel a hatóanyagot, a bélben oldódó pedig elveszítené védelmét.' },
        { q: 'Rendelés: 100 mg, az oldat 50 mg/ml. Hány ml?', options: ['0,5 ml', '2 ml', '5 ml', '50 ml'], answer: 1, explain: '100 mg / 50 mg/ml = 2 ml. A valóságban mindig kettős ellenőrzéssel.' }
      ]
    },
    {
      id: 'sebkezeles',
      title: 'Sebek és sebkezelés',
      level: 2, minutes: 14,
      summary: 'Sebtípusok, a sebgyógyulás szakaszai, a fertőzés jelei, aszepszis, a nyomási sérülés stádiumai és a kisebb sebek elsősegélye.',
      tags: ['seb', 'sebkezelés', 'sebgyógyulás', 'vérzéscsillapítás', 'gyulladás', 'sarjadzás', 'hegesedés', 'fertőzés', 'aszepszis', 'kötszer', 'nedves sebkezelés', 'krónikus seb', 'felfekvés', 'nyomási sérülés', 'decubitus', 'lábszárfekély', 'diabéteszes láb'],
      sections: [
        {
          title: 'Akut és krónikus sebek',
          text: '- **Akut sebek**: hirtelen keletkeznek, és normál esetben a várt időn belül meggyógyulnak. Pl. **vágott, szúrt, horzsolt, zúzott, harapott** seb, **égés**, **műtéti seb**.\n- **Krónikus sebek**: a gyógyulás elakad, hetek, hónapok alatt sem zárulnak. Pl. **nyomási sérülés (felfekvés)**, **lábszárfekély** (vénás vagy artériás keringési zavar miatt), **diabéteszes láb**.\n\nA krónikus seb mögött mindig van egy **ok** (nyomás, rossz keringés, cukorbetegség, alultápláltság, fertőzés), amelyet kezelni kell, különben a legjobb kötszer sem segít. Ezért a krónikus sebek ellátását **orvos és sebkezelésben képzett szakember** irányítja.'
        },
        {
          title: 'A sebgyógyulás szakaszai',
          text: 'A seb gyógyulása egymásba átfolyó szakaszokban zajlik:',
          widget: { type: 'idovonal', options: { steps: true, title: 'A sebgyógyulás szakaszai: tedd sorrendbe!', events: [
            { year: 1, label: '1. szakasz', title: 'Vérzéscsillapítás', text: 'Percek alatt: az erek összehúzódnak, a vérlemezkék és a fibrin vérrögöt képeznek, amely lezárja a sebet.' },
            { year: 2, label: '2. szakasz', title: 'Gyulladásos szakasz', text: 'Kb. az első napokban: fehérvérsejtek takarítják el a baktériumokat és az elhalt szövetet. Enyhe pír, duzzanat, melegség ilyenkor normális.' },
            { year: 3, label: '3. szakasz', title: 'Sarjadzás (proliferáció)', text: 'Napoktól hetekig: új erek és kötőszövet (élénkpiros, szemcsés sarjszövet) tölti ki a sebet, a széleiről a hám benövi.' },
            { year: 4, label: '4. szakasz', title: 'Érés, átépülés (hegesedés)', text: 'Hetektől akár egy-két évig: a kollagénrostok átrendeződnek, a heg erősödik és halványodik, de az eredeti bőr szilárdságát nem éri el.' }
          ] } }
        },
        {
          title: 'A fertőzés jelei és az aszepszis',
          text: 'A seb **fertőzésére** utalhat, ha a gyulladásos jelek **fokozódnak** a várt javulás helyett:\n\n- egyre nagyobb **pír**, **duzzanat**, **melegség**, **fájdalom**,\n- **gennyes**, zavaros vagy **bűzös váladék**,\n- a seb szélétől kiinduló **vörös csík** (nyirokér-gyulladás),\n- **láz**, rossz közérzet.\n\nEzeket **azonnal jelezni** kell az orvosnak.\n\n**Aszepszis**: a sebellátás során arra törekszünk, hogy **ne vigyünk be** kórokozót. Kézhigiénia, steril eszközök és kötszerek, „nem érintéses” technika (a kötszer sebre kerülő részéhez nem nyúlunk), tiszta munkafelület. A **kötéscserét** a rendelés és a protokoll szerint végezzük, és dokumentáljuk a seb **méretét, alapját, váladékát, szélét**, sok helyen fényképpel.\n\nA modern sebkezelés egyik alapelve a **nedves sebkezelés**: a kiszáradt, varas seb lassabban gyógyul, mint a megfelelően nedvesen tartott. A kötszer kiválasztása (hab, hidrokolloid, alginát stb.) a seb állapotától függ, ezt **szakember** dönti el.'
        },
        {
          title: 'A nyomási sérülés stádiumai',
          text: 'A felfekvést (nyomási sérülést) a nemzetközi osztályozás (NPIAP/EPUAP) szerint stádiumokba sorolják:\n\n- **1. stádium**: ép bőr, ujjnyomásra **nem elhalványuló** bőrpír. Sötét bőrön nehezebb észrevenni: melegség, keménység, színeltérés utalhat rá.\n- **2. stádium**: **részleges vastagságú** bőrhiány, rózsaszín-piros sebalap, vagy ép, illetve felszakadt savós hólyag.\n- **3. stádium**: **teljes vastagságú** bőrhiány, a zsírszövet látszhat, de izom, ín, csont nem.\n- **4. stádium**: teljes vastagságú szövethiány, **izom, ín, csont** látszik vagy tapintható.\n- **Nem besorolható**: a sebalapot elhalt szövet (pörk, lepedék) takarja, ezért a mélysége nem ítélhető meg.\n- **Mély szöveti sérülés**: ép vagy sérült bőrön tartósan sötétvörös, bordó, lilás elszíneződés, amely gyorsan mélyebb sebbé alakulhat.\n\nA legfontosabb a **megelőzés** (lásd a betegmozgatás leckét): egy 4. stádiumú seb hónapokig gyógyulhat, és életveszélyes fertőzés forrása lehet.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a stádiumot a leírással!', count: 6, pairs: [
            ['1. stádium', 'Ép bőr, nem elhalványuló bőrpír'],
            ['2. stádium', 'Részleges bőrhiány vagy savós hólyag'],
            ['3. stádium', 'Teljes bőrhiány, zsírszövet látszhat'],
            ['4. stádium', 'Izom, ín vagy csont látszik'],
            ['Nem besorolható', 'Elhalt szövet takarja a sebalapot'],
            ['Mély szöveti sérülés', 'Tartós bordó-lilás elszíneződés'],
            ['Sarjszövet', 'Élénkpiros, szemcsés, egészséges sebalap']
          ] } }
        },
        {
          title: 'Kisebb sebek elsősegélye',
          text: 'Hétköznapi, kisebb vágás, horzsolás esetén:\n\n1. **Kézmosás**, ha lehet, kesztyű.\n2. A **vérzést** tiszta gézzel, **közvetlen nyomással** állítsd el.\n3. A sebet **tiszta, folyó vízzel** öblítsd ki, a szennyeződést óvatosan távolítsd el.\n4. Fedd le **steril** kötszerrel vagy tapasszal.\n\n**Orvoshoz kell**, ha: a seb **mély, tátong**, a széle nem fekszik össze (varrás kellhet, ezt lehetőleg **6–8 órán belül** szokták elvégezni), nem csillapodik a vérzés, az arcon vagy ízület fölött van, **állat vagy ember harapta**, szennyezett (föld, rozsda), idegentest van benne, vagy a beteg **tetanusz elleni oltása** nem naprakész. Erős, nem csillapodó vérzésnél **112**.'
        }
      ],
      quiz: [
        { q: 'Melyik a sebgyógyulás első szakasza?', options: ['Hegesedés', 'Sarjadzás', 'Vérzéscsillapítás', 'Gyulladás'], answer: 2, explain: 'Sorrend: vérzéscsillapítás → gyulladás → sarjadzás → érés, átépülés.' },
        { q: 'Mi utal a seb fertőzésére?', options: ['Élénkpiros, szemcsés sebalap', 'Fokozódó pír, duzzanat, fájdalom, gennyes, bűzös váladék, láz', 'Halványodó heg', 'Enyhe viszketés gyógyulás közben'], answer: 1, explain: 'A gyulladás jeleinek fokozódása, a genny, a bűz és a láz fertőzésre utal.' },
        { q: 'Ép bőr, ujjnyomásra nem elhalványuló bőrpír a sarkon. Melyik stádium?', options: ['1. stádium', '2. stádium', '3. stádium', '4. stádium'], answer: 0, explain: 'Ez a nyomási sérülés első stádiuma: azonnali tehermentesítés és jelzés kell.' }
      ]
    },
    {
      id: 'kommunikacio',
      title: 'Kommunikáció a beteggel és a csapatban',
      level: 1, minutes: 12,
      summary: 'Aktív hallgatás, kérdezéstechnika, nonverbális jelek, fájdalom felmérése, nehezített kommunikáció és a strukturált átadás (SBAR).',
      tags: ['kommunikáció', 'aktív hallgatás', 'empátia', 'nonverbális', 'nyitott kérdés', 'zárt kérdés', 'fájdalomskála', 'NRS', 'hallássérült', 'demencia', 'tolmács', 'átadás', 'SBAR', 'ISBAR', 'csapatmunka'],
      sections: [
        {
          title: 'A beteg nem csak egy diagnózis',
          text: 'A beteg gyakran **fél**, **fáj** valamije, **kiszolgáltatottnak** érzi magát, és nem érti a szakszavakat. A jó kommunikáció csökkenti a szorongást, javítja az együttműködést, és sok hibát megelőz.\n\n- **Mutatkozz be** névvel és szereppel: „Jó napot, Kiss Anna vagyok, ápoló.”\n- Szólítsd a beteget a **nevén**, magázva, ne „mamának”, „papának”.\n- **Mondd el**, mit fogsz csinálni, mielőtt hozzányúlsz, és kérd az **egyetértését**.\n- Óvd a **méltóságát**: függöny, paraván, takaró, csukott ajtó.\n- **Aktív hallgatás**: figyelj, ne vágj közbe, foglald össze a saját szavaiddal, amit mondott.\n- **Empátia**: ismerd el az érzéseit („Látom, hogy aggódik a műtét miatt”), még ha nem is tudod megoldani a gondját.\n\nA **nonverbális** jelek (arckifejezés, testtartás, hangszín, szemkontaktus) sokszor többet mondanak a szavaknál, a tieid és a betegéi is.'
        },
        {
          title: 'A fájdalom felmérése',
          text: 'A fájdalom **szubjektív**: annyira fáj, amennyire a beteg mondja. Ezért **kérdezzük és mérjük**:\n\n- **Numerikus skála (NRS)**: „0-tól 10-ig, ahol 0 = nincs fájdalom, 10 = az elképzelhető legerősebb, mennyire fáj most?”\n- **Arcskála**: gyerekeknél, vagy ha a beteg számokkal nem tud válaszolni.\n- Kérdezz rá a **helyére, jellegére** (szúró, tompa, görcsös), **kezdetére**, mi rontja és mi javítja.\n\nAzoknál, akik nem tudják elmondani (pl. előrehaladott demencia), a viselkedés jelzi: nyöszörgés, grimasz, nyugtalanság, védekező testtartás, étvágytalanság. Erre külön megfigyelő skálák vannak. A fájdalom mértékét és a fájdalomcsillapítás hatását **dokumentálni** kell.'
        },
        {
          title: 'Nehezített kommunikáció',
          text: '- **Nagyothalló beteg**: állj vele **szemben**, jó fényben, hogy lássa a szádat; beszélj **lassabban és tagoltabban**, de ne kiabálj. Ellenőrizd, be van-e kapcsolva a hallókészüléke.\n- **Látássérült beteg**: szólítsd meg, mielőtt hozzáérsz, mondd el, hol vannak a tárgyai, ne rendezd át a környezetét.\n- **Demenciával élő beteg**: rövid, egyszerű mondatok, **egyszerre egy kérdés**, adj időt a válaszra. Ne vitatkozz, ne „javítsd ki” állandóan; inkább tereld a figyelmét. A nyugodt hangszín és az érintés (ha elfogadja) sokat segít.\n- **Más nyelvet beszélő beteg**: fontos információknál (beleegyezés, diagnózis) **szakképzett tolmács** kell; a családtag, főleg a gyermek tolmácsolása kerülendő.\n- **Dühös, agresszív beteg**: maradj nyugodt, tarts távolságot, hagyd szabadon a kijáratot, ne fenyegess, és kérj segítséget. A saját biztonságod is fontos.'
        },
        {
          title: 'Átadás a csapatban: SBAR',
          text: 'A betegbiztonsági hibák jelentős része az **információátadásnál** (műszakváltás, áthelyezés, telefonhívás az orvosnak) keletkezik. Ezért terjedt el a strukturált **SBAR** módszer (néha bemutatkozással kiegészítve ISBAR):\n\n- **S – Situation (helyzet)**: ki vagy, melyik betegről, mi most a gond.\n- **B – Background (háttér)**: miért van bent, fontos előzmények, gyógyszerek, allergia.\n- **A – Assessment (értékelés)**: mért értékek, mit látsz, mit gondolsz.\n- **R – Recommendation (javaslat/kérés)**: mit kérsz (pl. „Kérem, nézze meg 15 percen belül”), és ismételd vissza a kapott utasítást.',
          widget: { type: 'idovonal', options: { steps: true, title: 'Telefonhívás az orvosnak SBAR szerint: tedd sorrendbe!', events: [
            { year: 1, label: 'S', title: 'Helyzet', text: '„Kiss Anna ápoló vagyok a belgyógyászatról. A 12-es ágyon fekvő Nagy Péter nehezen lélegzik.”' },
            { year: 2, label: 'B', title: 'Háttér', text: '„Tegnap vettük fel tüdőgyulladással, antibiotikumot kap, penicillinallergiája nincs.”' },
            { year: 3, label: 'A', title: 'Értékelés', text: '„A légzésszám 28/perc, a szaturáció 89%, a pulzus 118/perc, új keletű zavartság. Szerintem romlik az állapota.”' },
            { year: 4, label: 'R', title: 'Kérés', text: '„Kérem, jöjjön most megnézni. Addig mit tegyek?” – és visszaismétli a kapott utasítást.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Hogyan beszélsz egy nagyothalló beteggel?', options: ['Kiabálsz', 'Szemben állsz vele, jó fényben, lassabban és tagoltan beszélsz', 'Hátulról szólítod meg', 'Csak írásban'], answer: 1, explain: 'A szájról olvasás sokat segít; a kiabálás torzítja a hangot.' },
        { q: 'Mit jelent az SBAR „R” betűje?', options: ['Rendelés', 'Recommendation: javaslat, kérés', 'Riasztás', 'Ritmus'], answer: 1, explain: 'Helyzet, háttér, értékelés, javaslat/kérés.' },
        { q: 'Ki mondja meg, mennyire fáj valami?', options: ['Az ápoló a sebből látja', 'A beteg, mert a fájdalom szubjektív', 'Az orvos', 'A laboreredmény'], answer: 1, explain: 'A fájdalom szubjektív; ha a beteg nem tud beszélni, a viselkedéséből következtetünk.' }
      ]
    },
    {
      id: 'etika',
      title: 'Etika, betegjogok és titoktartás',
      level: 2, minutes: 13,
      summary: 'Az egészségügyi etika alapelvei, a betegjogok a hazai egészségügyi törvényben, a tájékozott beleegyezés és az egészségügyi adatok védelme.',
      tags: ['etika', 'betegjogok', 'egészségügyi törvény', 'Eütv.', 'titoktartás', 'orvosi titok', 'tájékoztatás', 'önrendelkezés', 'tájékozott beleegyezés', 'visszautasítás', 'méltóság', 'betegjogi képviselő', 'adatvédelem', 'egészségügyi adat', 'GDPR', 'autonómia', 'jótékonyság', 'ártalmatlanság', 'igazságosság'],
      sections: [
        {
          title: 'Az egészségügyi etika négy alapelve',
          text: 'A nemzetközileg legelterjedtebb megközelítés négy alapelvre épül:\n\n- **Autonómia (önrendelkezés tisztelete)**: a cselekvőképes beteg maga dönt a saját testéről, a kezeléséről, akkor is, ha mi másképp döntenénk.\n- **Jótékonyság (a beteg javát szolgálni)**: a cél a beteg egészsége, jólléte.\n- **Ártalmatlanság (nem ártani)**: kerülni a szükségtelen ártalmat, kockázatot.\n- **Igazságosság**: az ellátás méltányos elosztása, egyenlő bánásmód, megkülönböztetés nélkül.\n\nA gyakorlatban ezek **ütközhetnek** (pl. a beteg visszautasít egy kezelést, ami javára válna). Ilyenkor nincs egyszerű képlet: a csapat, az orvos, szükség esetén etikai bizottság segít dönteni. Az ápoló **nem dönthet a beteg helyett**, de felelőssége jelezni, ha aggódik.'
        },
        {
          title: 'Betegjogok Magyarországon',
          text: 'A betegjogokat Magyarországon az **egészségügyről szóló 1997. évi CLIV. törvény** (Eütv.) sorolja fel. A legfontosabbak:\n\n- az **egészségügyi ellátáshoz** való jog,\n- az **emberi méltósághoz** való jog,\n- a **kapcsolattartás** joga (hozzátartozók, látogatás a szabályok szerint),\n- az intézmény **elhagyásának** joga,\n- a **tájékoztatáshoz** való jog (állapotáról, a beavatkozásokról, a kockázatokról, a lehetőségekről, érthető módon),\n- az **önrendelkezéshez** való jog,\n- az **ellátás visszautasításának** joga (a törvényben meghatározott feltételekkel),\n- az **egészségügyi dokumentáció megismerésének** joga,\n- az **orvosi titoktartáshoz** való jog.\n\nA betegnek **kötelezettségei** is vannak (pl. együttműködés, a házirend betartása, a többi beteg jogainak tiszteletben tartása). A betegek segítésére **betegjogi képviselők** működnek.'
        },
        {
          title: 'Tájékozott beleegyezés',
          text: 'Egy beavatkozáshoz általában a beteg **tájékozott beleegyezése** kell. Ez azt jelenti, hogy a beteg:\n\n- **érthető** tájékoztatást kapott (mi a beavatkozás, miért kell, mik a kockázatai, mi történik, ha nem végzik el, milyen alternatívák vannak),\n- **feltehette a kérdéseit**,\n- **kényszer nélkül**, szabadon döntött.\n\nA tájékoztatás az orvos feladata a nagyobb beavatkozásoknál, de az ápoló a **saját tevékenységéről** (pl. vérvétel, mosdatás) is tájékoztat, és megkérdezi a beteget. Ha a beteg **nem cselekvőképes** (pl. eszméletlen, kiskorú, gondnokság alatt áll), a törvény határozza meg, ki nyilatkozhat helyette, és vészhelyzetben ki dönthet. Ezeket a szabályokat a munkahely és a jogszabály részletesen leírja.'
        },
        {
          title: 'Titoktartás és adatvédelem',
          text: 'Az egészségügyi dolgozót **titoktartási kötelezettség** köti mindenről, amit a beteg állapotáról, személyes körülményeiről munkája során megtud. Ez a munkaidő után, sőt a munkaviszony megszűnése után is érvényes. Az egészségügyi adatok kezeléséről külön törvény (az **1997. évi XLVII. törvény**) és az uniós adatvédelmi rendelet (**GDPR**) is rendelkezik: az egészségügyi adat **különleges** adat.\n\nA gyakorlatban:\n\n- **telefonon** ne adj ki információt ismeretlennek („Ön a lánya? Nem láthatom, ki van a vonal túlsó végén”): a beteg által megnevezett személyek és a protokoll szerint lehet tájékoztatni,\n- **ne beszélj** betegekről a folyosón, liftben, buszon, otthon,\n- **közösségi média**: semmilyen fénykép, történet, utalás, akkor sem, ha „nem írtad ki a nevét”,\n- a dokumentációba csak az nézzen bele, akinek a **munkájához szükséges**, és ne hagyd nyitva a képernyőt,\n- ha a beteg ismerősöd, szomszédod, sem kérdezhetsz rá az adataira, ha nem te látod el.',
          widget: { type: 'parositas', options: { title: 'Melyik elv vagy jog sérül? Párosítsd!', count: 6, pairs: [
            ['A beteget az ő tudta nélkül oltják be', 'Önrendelkezés (autonómia)'],
            ['Az ápoló a kórteremben, paraván nélkül mosdatja a beteget', 'Emberi méltóság'],
            ['Az ápoló a buszon a barátjának mesél egy betegről', 'Titoktartás'],
            ['A beteg nem kap érthető választ a kérdéseire', 'Tájékoztatáshoz való jog'],
            ['A beteget származása miatt hátrébb sorolják', 'Igazságosság, egyenlő bánásmód'],
            ['Szükségtelen, kockázatos vizsgálatot végeznek', 'Ártalmatlanság'],
            ['A beteg nem tekintheti meg a saját leleteit', 'A dokumentáció megismerésének joga']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik törvény sorolja fel a betegjogokat Magyarországon?', options: ['A Munka Törvénykönyve', 'Az egészségügyről szóló 1997. évi CLIV. törvény', 'A Polgári Törvénykönyv', 'A KRESZ'], answer: 1, explain: 'Az Eütv. tartalmazza a betegjogok katalógusát.' },
        { q: 'Egy ismeretlen telefonáló a beteg állapotáról kérdez, és azt mondja, a fia. Mit teszel?', options: ['Mindent elmondasz', 'Nem adsz ki információt ellenőrzés nélkül; a protokoll és a beteg által megnevezett személyek szerint jársz el', 'Leteszed a telefont szó nélkül', 'Megadod a beteg mobilszámát'], answer: 1, explain: 'A titoktartás a telefonra is vonatkozik; a hívó személyazonossága telefonon nem ellenőrizhető.' },
        { q: 'Mit jelent a tájékozott beleegyezés?', options: ['A beteg aláír egy papírt, amit nem olvasott el', 'A beteg érthető tájékoztatás után, kérdezhetve, kényszer nélkül dönt', 'Az orvos dönt a beteg helyett', 'A család dönt'], answer: 1, explain: 'A beleegyezés csak akkor érvényes, ha a beteg valóban érti, mibe egyezik bele.' }
      ]
    },
    {
      id: 'idosgondozas',
      title: 'Idősgondozás',
      level: 1, minutes: 14,
      summary: 'Az öregedés változásai, folyadék és táplálkozás, demencia és delírium, inkontinencia és bőrápolás, méltóság, a bántalmazás jelei és a gondozó saját terhei.',
      tags: ['idősgondozás', 'öregedés', 'geriátria', 'kiszáradás', 'folyadékpótlás', 'alultápláltság', 'demencia', 'Alzheimer-kór', 'delírium', 'zavartság', 'inkontinencia', 'bőrápolás', 'elesés', 'méltóság', 'bántalmazás', 'kiégés', 'házi segítségnyújtás'],
      sections: [
        {
          title: 'Mi változik időskorban?',
          text: 'Az öregedés nem betegség, de a szervezet **tartalékai csökkennek**:\n\n- csökken az **izomerő** és a **csonttömeg** (esés, törés),\n- romlik a **látás, hallás**, lassul a reakcióidő,\n- csökken a **szomjúságérzet**, és a vese kevésbé tudja visszatartani a vizet: könnyen **kiszáradnak**,\n- vékonyabb, sérülékenyebb a **bőr**,\n- lassabban ürülnek a **gyógyszerek**,\n- a betegségek **szokatlanul** jelentkezhetnek: egy húgyúti fertőzés vagy tüdőgyulladás láz helyett csak **zavartsággal, eleséssel, étvágytalansággal** jelezhet.\n\nAz idős ember **egyéniség** élettörténettel, szokásokkal, értékekkel. A jó gondozás ezekre épít, és **megőrzi az önállóságát**, amennyire csak lehet: inkább segíts neki megcsinálni, mint hogy helyette csináld.'
        },
        {
          title: 'Folyadék és táplálkozás',
          text: '**Kiszáradás** jelei időseknél: száraz száj és nyelv, kevés, sötét vizelet, szédülés, gyengeség, székrekedés, **zavartság**. A bőr „redője” időseknél kevésbé megbízható jel.\n\n- Kínálj **rendszeresen**, kis adagokban italt (ne csak akkor, ha kéri), és tartsd a pohár **kéz közelben**.\n- Figyelj a **folyadékmérlegre**, ha az orvos elrendeli (bevitel és ürítés). Egyes betegeknél (pl. súlyos szív- vagy vesebetegség) az orvos **korlátozza** a folyadékot: ilyenkor a rendelés az irányadó.\n\n**Alultápláltság**: gyakori és alattomos. Okai: rossz fogazat, nyelési nehézség, magány, depresszió, betegség, gyógyszerek. Jelei: fogyás, lötyögő ruha, gyengeség, rosszul gyógyuló sebek. Segít a kedvelt ételek kínálása, kisebb és gyakoribb étkezés, társaság az étkezésnél, a fogsor rendbetétele. **Nyelési zavar** gyanújánál (köhögés evés közben, „félrenyelés”) jelezd: félrenyelés miatti tüdőgyulladás alakulhat ki.'
        },
        {
          title: 'Demencia és delírium',
          text: 'Két különböző állapot, amelyet nagyon fontos megkülönböztetni:\n\n- **Demencia**: a szellemi képességek (emlékezet, tájékozódás, ítélőképesség, beszéd) **lassan, hónapok-évek alatt** romlanak. Leggyakoribb oka az **Alzheimer-kór**. Nem gyógyítható, de a megfelelő gondozással a beteg életminősége sokat javítható.\n- **Delírium**: **hirtelen** (órák, napok alatt) kialakuló zavartság, ingadozó figyelem, gyakran hallucinációk, nyugtalanság vagy épp aluszékonyság. Kiváltója lehet **fertőzés, kiszáradás, gyógyszer, fájdalom, vizeletretenció, székrekedés, műtét, környezetváltozás**. **Orvosi sürgősség**, mert mögötte kezelhető ok lehet, és kezelés nélkül veszélyes.\n\nDemens betegnél is kialakulhat delírium! Ha egy addig ismert állapotú idős ember **hirtelen** zavartabb lesz, mint máskor, az **mindig jelzendő**.\n\nDemenciával élők gondozásában segít: **állandó napirend**, ismerős tárgyak, jól olvasható óra és naptár, jó világítás, nyugodt környezet, rövid mondatok, a múltjára épülő beszélgetés, és a **viselkedés mögötti ok** keresése (fájdalom, éhség, WC-szükséglet, unalom).',
          widget: { type: 'parositas', options: { title: 'Demencia vagy delírium? Párosítsd!', count: 6, pairs: [
            ['Hónapok-évek alatt kialakuló feledékenység', 'Demencia'],
            ['Órák alatt kialakult zavartság egy fertőzés mellett', 'Delírium'],
            ['Leggyakoribb oka az Alzheimer-kór', 'Demencia jellemzője'],
            ['Ingadozó figyelem napon belül, hirtelen kezdet', 'Delírium jellemzője'],
            ['Kezelhető kiváltó okot kell keresni, sürgősen', 'Delíriumban a teendő'],
            ['Állandó napirend, ismerős tárgyak', 'Demenciával élők gondozása'],
            ['Kiszáradás, gyógyszer, vizeletretenció', 'A delírium gyakori kiváltói']
          ] } }
        },
        {
          title: 'Bőrápolás, inkontinencia, méltóság',
          text: 'Az **inkontinencia** (akaratlan vizelet- vagy székletvesztés) gyakori, de **nem az öregedés természetes része**: gyakran kezelhető, ezért jelezni kell az orvosnak. A gondozásban:\n\n- rendszeres **WC-re kísérés** (pl. étkezések után),\n- megfelelő méretű **inkontinenciabetét**, időben cserélve,\n- **kíméletes bőrtisztítás** (pH-semleges tisztító, nem dörzsölés), alapos szárítás a bőrredőkben, **bőrvédő krém**: a nedves bőr könnyen kisebesedik, és a felfekvés kockázata is nő,\n- **diszkréció**: ajtó, paraván, csendes beszéd, sose „pelenkázásként” említsd.\n\n**Méltóság**: kopogj, mielőtt belépsz; magázd, a nevén szólítsd; öltözhessen a saját ruhájába; dönthessen apró dolgokban (mit egyen, mit vegyen fel, mikor fürödjön).'
        },
        {
          title: 'Bántalmazás és a gondozó terhei',
          text: 'Az idős emberek **bántalmazása** lehet fizikai, lelki, anyagi (pénzének, vagyonának elvétele), szexuális, és lehet **elhanyagolás** is. Jelei: megmagyarázatlan zúzódások, félénkség bizonyos személyek jelenlétében, elhanyagolt külső, kiszáradás, hirtelen pénzügyi problémák. Ha ilyet tapasztalsz, **jelezd** a felettesednek a munkahelyi eljárás szerint; közvetlen veszélyben a **112**.\n\nA gondozás **érzelmileg és fizikailag** is megterhelő. A **kiégés** jelei: kimerültség, ingerlékenység, közöny a betegek iránt, alvászavar. Védekezés: pihenés, szabadság, a csapat támogatása, **szupervízió**, a saját határok ismerete, segítségkérés. Aki magára nem vigyáz, hosszú távon másokra sem tud.'
        }
      ],
      quiz: [
        { q: 'Miért száradnak ki könnyebben az idősek?', options: ['Mert többet izzadnak', 'Mert csökken a szomjúságérzetük, és a vesék kevésbé tartják vissza a vizet', 'Mert sok vizet isznak', 'Nem száradnak ki könnyebben'], answer: 1, explain: 'A csökkent szomjúságérzet miatt rendszeresen kínálni kell őket itallal.' },
        { q: 'Egy ismert demens lakó egyik napról a másikra sokkal zavartabb lett. Mit teszel?', options: ['Semmit, a demencia ilyen', 'Jelzem az orvosnak, mert delírium lehet kezelhető okkal', 'Nyugtatót adok neki', 'Megkötöm az ágyhoz'], answer: 1, explain: 'A hirtelen romlás delíriumra utalhat (fertőzés, kiszáradás, gyógyszer stb.), ami sürgős orvosi kivizsgálást igényel.' },
        { q: 'Mi az inkontinenciás beteg bőrápolásának alapja?', options: ['Erős szappanos dörzsölés', 'Kíméletes tisztítás, alapos szárítás, bőrvédő krém, időben cserélt betét', 'Ritka csere, hogy kíméljük', 'Hintőpor sok rétegben'], answer: 1, explain: 'A tartósan nedves, irritált bőr kisebesedik, és nő a felfekvés kockázata.' }
      ]
    }
  ]
});
