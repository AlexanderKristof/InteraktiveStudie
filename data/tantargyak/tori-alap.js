/* Tantárgy: Történelem (5–8. osztály) */
STUDIE.addSubject({
  id: 'tori-alap',
  stage: 'altalanos',
  title: 'Történelem (5–8. osztály)',
  icon: '📜',
  color: '#b7791f',
  description: 'Barlangrajzoktól a rendszerváltásig: piramisok, lovagok, felfedezők és a magyar történelem nagy alakjai, idővonalakkal és párosító játékokkal.',
  intro: 'A történelem a múlt **igaz történeteiről** szól: kik éltek előttünk, hogyan laktak, mit ettek, miért harcoltak, és mit találtak fel. Minden leckében van egy **idővonal**: kattints az évszámokra, aztán próbáld ki az időrendi játékot! A **párosító** játékokkal pedig a nevek és a fogalmak is a helyükre kerülnek. Ha a felső tagozatos anyag már megy, a középiskolai **Történelem** tárgyban folytathatod.',
  lessons: [
    {
      id: 'oskor-civilizaciok',
      title: 'Az őskor és az első civilizációk',
      level: 1, minutes: 14,
      summary: 'Kőeszközök, tűz és barlangrajzok, majd a földművelés, az írás és a piramisok: Mezopotámia és Egyiptom.',
      tags: ['őskor', 'kőkorszak', 'Vértesszőlős', 'barlangrajz', 'földművelés', 'Mezopotámia', 'sumerok', 'ékírás', 'Hammurapi', 'Egyiptom', 'Nílus', 'fáraó', 'piramis', 'hieroglifa', 'múmia', 'Kr. e.'],
      sections: [
        {
          title: 'Hogyan számoljuk az éveket?',
          text: 'Mielőtt időutazásra indulunk, meg kell tanulnunk „olvasni” az évszámokat. Európában az éveket Jézus születésének hagyományos időpontjától számoljuk. Ami előtte történt, az **Kr. e.** (Krisztus előtt), ami utána, az **Kr. u.** (Krisztus után).\n\nKr. e. **visszafelé** számolunk: a Kr. e. 3000 **régebbi**, mint a Kr. e. 1000. Olyan ez, mint egy visszaszámlálás a kezdőpontig. Az **évszázad** (század) 100 évet jelent, az **évezred** 1000 évet.',
          tip: 'Az idővonalakon a Kr. e. évszámokat negatív számként is elképzelheted: Kr. e. 3000 = −3000, és −3000 kisebb, vagyis korábbi, mint −1000.'
        },
        {
          title: 'Az őskor: vadászok, gyűjtögetők, első művészek',
          text: 'Képzeld el, hogy nincs bolt, nincs ház, nincs írás. Az **őskor** emberei kis csoportokban vándoroltak: **vadásztak**, halásztak, és bogyókat, gyökereket **gyűjtögettek**. Szerszámaikat kőből pattintották, ezért ezt az időszakot **kőkorszaknak** hívjuk.\n\nA legnagyobb találmány a **tűz** használata volt: melegített, megvédett a vadállatoktól, és a megsütött hús könnyebben emészthető lett. Magyarországon **Vértesszőlősön** kb. 350 000 éves előember-maradványokat és tűzhelyeket találtak.\n\nAz őskori emberek **művészek** is voltak: a franciaországi Lascaux-barlang falára kb. 17 000 éve bölényeket, lovakat, szarvasokat festettek.\n\nKr. e. 10 000 körül a Közel-Keleten óriási változás kezdődött: az emberek **földet műveltek** és **állatokat tartottak**. Letelepedtek, falvakat építettek, megtanultak agyagedényt készíteni és szőni. Később a fémeket is megismerték: előbb a **rezet** és a **bronzot**, majd a **vasat**.'
        },
        {
          title: 'Mezopotámia: a folyóköz',
          text: 'A **Tigris** és az **Eufrátesz** folyók között terült el **Mezopotámia** (a mai Irak területén). A görög név jelentése: „folyóköz”. A folyók iszapja termékennyé tette a földet, de csatornákat kellett ásni, hogy a víz a szántókra jusson. Ehhez sok embernek kellett **együtt dolgoznia** és valakinek irányítania: így születtek meg az első **városok** és **államok**.\n\nA **sumerok** városaiban (például Úr és Uruk) hatalmas lépcsős templomtornyok, **zikkuratok** magasodtak. Kr. e. 3200 körül itt alakult ki az **írás**: nádszállal nyomtak ék alakú jeleket puha agyagtáblákba, ez az **ékírás**. Eleinte főleg azt jegyezték fel, ki mennyi gabonát és állatot adott le.\n\nA babiloni **Hammurapi** király (Kr. e. 18. század) törvényeit kőoszlopba vésette, hogy mindenki ismerje őket. Az egyik legismertebb elv: „szemet szemért, fogat fogért”.\n\nA mezopotámiaiaknak köszönhetjük a **kereket** is, és azt, hogy egy órában 60 perc, egy percben 60 másodperc van: ők a 60-as számrendszert használták.'
        },
        {
          title: 'Egyiptom: a Nílus ajándéka',
          text: '**Egyiptomban** szinte sosem esik eső, mégis virágzó ország jött létre. A titok a **Nílus**: minden nyáron megáradt, és amikor visszahúzódott, termékeny iszapot hagyott maga után. Az egyiptomiak megfigyelték az áradás idejét, így alakult ki a 365 napos naptáruk.\n\nAz országot a **fáraó** irányította, akit isteni uralkodónak tartottak. A fáraók hatalmas sírokat, **piramisokat** építtettek. A legnagyobb, **Kheopsz piramisa** Gízában Kr. e. 2560 körül készült el, és sok ezer munkás dolgozott rajta évtizedekig.\n\nAz egyiptomiak hittek a túlvilági életben. Ezért az elhunytak testét gondosan bebalzsamozták és vászonba tekerték: így készültek a **múmiák**. Írásuk a képjelekből álló **hieroglifa** volt, amelyet kőbe véstek vagy **papiruszra** írtak. Az ifjú **Tutanhamon** fáraó szinte érintetlen sírját 1922-ben találta meg Howard Carter régész: tele volt arany kincsekkel.',
          widget: { type: 'idovonal', options: { title: 'Az őskortól a fáraókig', events: [
            { year: -350000, label: 'kb. 350 000 éve', title: 'Előember Vértesszőlősön', text: 'A mai Magyarország területén élő előember kőeszközöket használt és tüzet gyújtott.' },
            { year: -15000, label: 'kb. 17 000 éve', title: 'Lascaux-i barlangrajzok', text: 'Őskori művészek állatokat festenek egy franciaországi barlang falára.' },
            { year: -10000, label: 'Kr. e. 10 000 körül', title: 'A földművelés kezdete', text: 'A Közel-Keleten az emberek gabonát termesztenek, állatokat tartanak és letelepednek.' },
            { year: -3500, label: 'Kr. e. 3500 körül', title: 'A kerék', text: 'Mezopotámiában már kerekes kocsikat használnak.' },
            { year: -3200, label: 'Kr. e. 3200 körül', title: 'Az írás születése', text: 'A sumerok agyagtáblákba nyomják az **ékírás** jeleit.' },
            { year: -3100, label: 'Kr. e. 3100 körül', title: 'Egyiptom egyesítése', text: 'Felső- és Alsó-Egyiptom egy fáraó uralma alá kerül.' },
            { year: -2560, label: 'Kr. e. 2560 körül', title: 'Kheopsz piramisa', text: 'Elkészül Gízában a Nagy Piramis, a fáraó sírja.' },
            { year: -1750, label: 'Kr. e. 1750 körül', title: 'Hammurapi törvényei', text: 'Babilon királya kőoszlopra vésett törvényekkel szabályozza az életet.' },
            { year: -1323, label: 'Kr. e. 1323 körül', title: 'Tutanhamon halála', text: 'Az ifjú fáraót kincsekkel teli sírba temetik. A sírt csak 1922-ben fedezik fel.' }
          ] } }
        },
        {
          title: 'Párosító játék',
          text: 'Melyik fogalom melyik ókori civilizációhoz vagy jelentéshez tartozik?',
          widget: { type: 'parositas', options: { title: 'Őskor és ókori Kelet', count: 6, pairs: [
            ['Ékírás', 'Agyagtáblába nyomott sumer írás'],
            ['Hieroglifa', 'Egyiptomi képírás'],
            ['Zikkurat', 'Lépcsős templomtorony Mezopotámiában'],
            ['Fáraó', 'Az egyiptomi uralkodó'],
            ['Múmia', 'Bebalzsamozott, bepólyált holttest'],
            ['Papirusz', 'Nádféléből készült íróanyag'],
            ['Hammurapi', 'Babiloni király, törvényeit kőbe vésette'],
            ['Vértesszőlős', 'Magyarországi őskori lelőhely']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik két folyó között terült el Mezopotámia?', options: ['A Duna és a Tisza', 'A Tigris és az Eufrátesz', 'A Nílus és a Jordán', 'A Rajna és a Rhône'], answer: 1, explain: 'A név jelentése „folyóköz”: a Tigris és az Eufrátesz vize táplálta a földeket.' },
        { q: 'Melyik esemény történt korábban?', options: ['Kheopsz piramisának elkészülte (Kr. e. 2560 körül)', 'Hammurapi törvényei (Kr. e. 1750 körül)', 'Tutanhamon halála (Kr. e. 1323 körül)', 'Mindhárom egyszerre'], answer: 0, explain: 'Kr. e. visszafelé számolunk: a nagyobb szám a régebbi időpont.' },
        { q: 'Miért volt olyan fontos a Nílus Egyiptomnak?', options: ['Mert sós vize volt', 'Mert áradása termékeny iszapot hagyott a földeken', 'Mert elválasztotta az országot Mezopotámiától', 'Mert rajta szállították a jeget'], answer: 1, explain: 'Az esőtlen országban a Nílus áradása tette lehetővé a földművelést.' },
        { q: 'Mit jelent az, hogy az őskori ember gyűjtögető volt?', options: ['Pénzérméket gyűjtött', 'Vadon termő növényeket, bogyókat, gyökereket gyűjtött élelemnek', 'Kincseket gyűjtött a sírokba', 'Agyagtáblákat gyűjtött'], answer: 1, explain: 'A vadászat mellett a vadon termő növények gyűjtése adta az élelem nagy részét.' }
      ]
    },
    {
      id: 'gorogok-romaiak',
      title: 'Az ókori Görögország és Róma',
      level: 1, minutes: 15,
      summary: 'Olimpia, demokrácia és filozófusok Görögországban; légiók, utak és gladiátorok Rómában, és Pannónia, a római Dunántúl.',
      tags: ['görögök', 'polisz', 'Athén', 'Spárta', 'demokrácia', 'olimpia', 'Marathón', 'Nagy Sándor', 'Homérosz', 'Róma', 'Romulus', 'köztársaság', 'szenátus', 'Caesar', 'Augustus', 'Colosseum', 'gladiátor', 'Pannónia', 'Aquincum'],
      sections: [
        {
          title: 'A görög városállamok',
          text: 'Görögország hegyes, tagolt ország sok kis szigettel. A hegyek elválasztották egymástól a völgyeket, ezért nem egy nagy állam, hanem sok kis **városállam** (**polisz**) jött létre. A két leghíresebb **Athén** és **Spárta** volt, és nagyon különböztek egymástól.\n\n- **Spártában** a fiúkat 7 éves koruktól katonának nevelték: kemény edzés, kevés étel, fegyelem. A spártai harcosokat egész Görögország félte.\n- **Athénban** a tudás, a kereskedelem és a művészet virágzott. Itt született meg Kr. e. 508 körül a **demokrácia**, vagyis a „nép uralma”: a polgárok a **népgyűlésen** maguk szavaztak a fontos ügyekről. A nők, a rabszolgák és a máshonnan érkezettek azonban nem szavazhattak.\n\nA görögök közös büszkesége az **olimpia** volt. Kr. e. 776-tól négyévente Olümpiában versenyeztek Zeusz tiszteletére, és a játékok idejére a háborúzó városok is fegyverszünetet kötöttek.'
        },
        {
          title: 'Hősök, harcok és gondolkodók',
          text: '**Homérosz** két nagy eposza, az **Iliász** és az **Odüsszeia** Trója ostromáról és Odüsszeusz hazatéréséről szól. A görög gyerekek ezekből tanultak olvasni.\n\nKr. e. 490-ben a hatalmas Perzsa Birodalom serege partra szállt **Marathónnál**, de az athéniak legyőzték. A legenda szerint egy futár egészen Athénig futott a győzelem hírével: innen kapta nevét a mai **maratoni futás**.\n\nA görögök a világ működésén is sokat gondolkodtak. **Szókratész**, **Platón** és **Arisztotelész** filozófusok, **Püthagorasz** matematikus volt: a nevét viseli a derékszögű háromszögekről szóló tétel. Arisztotelész egyik tanítványa volt **Nagy Sándor** makedón király, aki Kr. e. 334-től hatalmas birodalmat hódított meg Egyiptomtól Indiáig, és sok várost alapított, köztük az egyiptomi **Alexandriát**.'
        },
        {
          title: 'Róma: a farkas városától a birodalomig',
          text: 'A monda szerint **Rómát** Kr. e. 753-ban **Romulus** alapította. Őt és ikertestvérét, Remust kisgyermekként egy anyafarkas táplálta. Rómában eleinte királyok uralkodtak, majd **köztársaság** lett: az államot két, évente választott **konzul** és a tekintélyes férfiakból álló **szenátus** vezette.\n\nA kitűnően szervezett római **légiók** sorra meghódították a Földközi-tenger vidékét. A híres hadvezért, **Julius Caesart** Kr. e. 44-ben összeesküvők megölték, mert attól féltek, hogy király akar lenni. Fogadott fia, **Augustus** lett az első **császár** (Kr. e. 27).\n\nA rómaiak nagyszerű mérnökök voltak: kövezett **utakat**, hidakat, vizet szállító **vízvezetékeket** és fürdőket építettek. A **Colosseumban** (Kr. u. 80) ötvenezer néző nézte a **gladiátorok** életre-halálra menő küzdelmeit. A latin nyelv és a római számok (I, V, X, L, C, D, M) ma is velünk vannak.'
        },
        {
          title: 'Pannónia: Róma a Dunántúlon',
          text: 'A Római Birodalom határa a **Duna** volt. A mai Dunántúl a római **Pannónia** tartomány része lett. A határ mentén katonai táborok és őrtornyok sorakoztak, ezek összefüggő rendszerét **limesnek** hívták.\n\nA tartomány fontos városai voltak **Aquincum** (ma Óbuda), **Savaria** (ma Szombathely), **Sopianae** (ma Pécs) és **Scarbantia** (ma Sopron). Aquincumban ma is sétálhatsz a római utcák, fürdők és az amfiteátrum romjai között.\n\nA birodalomban a keresztényeket sokáig üldözték, de Constantinus császár Kr. u. 313-ban szabad vallásgyakorlást engedélyezett nekik. Kr. u. 395-ben a birodalom kettévált, és a **Nyugatrómai Birodalom** 476-ban megszűnt. Ezzel az évvel szokás az **ókor végét** jelölni.',
          tip: 'Ha Pécsett jársz, nézd meg az ókeresztény sírkamrákat: a világörökség részei, és Sopianae korából valók.',
          widget: { type: 'idovonal', options: { title: 'Görögök és rómaiak', events: [
            { year: -776, label: 'Kr. e. 776', title: 'Az első olimpia', text: 'A hagyomány szerint ekkor rendezik az első olümpiai játékokat Zeusz tiszteletére.' },
            { year: -753, label: 'Kr. e. 753', title: 'Róma alapítása', text: 'A monda szerint Romulus ekkor alapítja Rómát.' },
            { year: -508, label: 'Kr. e. 508', title: 'Athéni demokrácia', text: 'Kleiszthenész reformjaival a polgárok népgyűlése kezébe kerül a hatalom.' },
            { year: -490, label: 'Kr. e. 490', title: 'Marathóni csata', text: 'Az athéniak legyőzik a perzsa sereget. Innen ered a maratoni futás legendája.' },
            { year: -334, label: 'Kr. e. 334', title: 'Nagy Sándor hadjárata', text: 'A makedón király megindul Ázsia felé, és hatalmas birodalmat hódít meg.' },
            { year: -44, label: 'Kr. e. 44', title: 'Caesar meggyilkolása', text: 'Összeesküvők megölik Julius Caesart a szenátus ülésén.' },
            { year: -27, label: 'Kr. e. 27', title: 'Augustus, az első császár', text: 'Kezdetét veszi a császárkor.' },
            { year: 80, label: 'Kr. u. 80', title: 'Megnyílik a Colosseum', text: 'A hatalmas amfiteátrumban gladiátorjátékokat rendeznek.' },
            { year: 313, label: 'Kr. u. 313', title: 'Szabad lesz a kereszténység', text: 'Constantinus császár engedélyezi a keresztény vallás gyakorlását.' },
            { year: 476, label: 'Kr. u. 476', title: 'Nyugatróma bukása', text: 'Az utolsó nyugatrómai császárt megfosztják trónjától: véget ér az ókor.' }
          ] } }
        },
        {
          title: 'Párosító játék',
          text: 'Párosítsd a görög és római fogalmakat a jelentésükkel!',
          widget: { type: 'parositas', options: { title: 'Görögök és rómaiak', count: 6, pairs: [
            ['Polisz', 'Görög városállam'],
            ['Demokrácia', 'A nép uralma: a polgárok szavaznak'],
            ['Spárta', 'Katonai nevelésről híres városállam'],
            ['Szenátus', 'A római vezetők tanácsa'],
            ['Légió', 'Római katonai egység'],
            ['Gladiátor', 'Az arénában küzdő harcos'],
            ['Aquincum', 'Római város a mai Óbudán'],
            ['Limes', 'A római határ őrtornyainak, táborainak láncolata']
          ] } }
        }
      ],
      quiz: [
        { q: 'Miben különbözött Spárta Athéntól?', options: ['Spártában a katonai nevelés volt a legfontosabb', 'Spártában született a demokrácia', 'Spárta római város volt', 'Spártában nem voltak katonák'], answer: 0, explain: 'A spártai fiúkat 7 éves koruktól katonának nevelték. A demokrácia Athénban született.' },
        { q: 'Ki volt az első római császár?', options: ['Romulus', 'Julius Caesar', 'Nagy Sándor', 'Augustus'], answer: 3, explain: 'Augustus Kr. e. 27-ben lett az első császár. Caesart megölték, mielőtt uralma állandósult volna.' },
        { q: 'Mi Szombathely római neve?', options: ['Sopianae', 'Savaria', 'Aquincum', 'Scarbantia'], answer: 1, explain: 'Savaria = Szombathely, Sopianae = Pécs, Aquincum = Óbuda, Scarbantia = Sopron.' },
        { q: 'Milyen esemény emlékét őrzi a maratoni futás?', options: ['Egy görög győzelmet a perzsák felett', 'Róma alapítását', 'Az első olimpiát', 'A Colosseum megnyitását'], answer: 0, explain: 'Kr. e. 490-ben Marathónnál az athéniak legyőzték a perzsákat; a legenda szerint egy futár vitte a hírt Athénba.' }
      ]
    },
    {
      id: 'kozepkor',
      title: 'Élet a középkorban',
      level: 1, minutes: 15,
      summary: 'Hűbérurak és jobbágyok, lovagok és várak, kolostorok és szerzetesek, városok és céhek: így éltek az emberek ezer éve.',
      tags: ['középkor', 'hűbériség', 'földesúr', 'jobbágy', 'lovag', 'apród', 'vár', 'felvonóhíd', 'kolostor', 'szerzetes', 'bencés', 'kódex', 'város', 'polgár', 'céh', 'mester', 'legény', 'inas', 'pestis', 'keresztes hadjárat'],
      sections: [
        {
          title: 'Ki kinek szolgált? A hűbériség',
          text: 'A **középkor** nagyjából ezer évig tartott: a Nyugatrómai Birodalom bukásától (476) Amerika felfedezéséig (1492). Ebben a korban a gazdagság alapja a **föld** volt.\n\nA király földet adományozott a nagyuraknak, ők pedig cserébe hűséget és katonai szolgálatot fogadtak neki. Az ilyen földadomány a **hűbér**, a rendszer neve **hűbériség**. A nagyurak maguk is adtak földet a kisebb uraknak, lovagoknak.\n\nA társadalom legnagyobb része **jobbágy** volt: parasztok, akik a **földesúr** földjén dolgoztak. A megművelt földért terményt, pénzt és munkát (robotot) adtak a földesúrnak, a termés tizedét pedig az egyháznak (**tized**). Egy jobbágycsalád napkeltétől napnyugtáig dolgozott, gyakran egyetlen helyiségből álló házban lakott az állatai közelében.'
        },
        {
          title: 'Lovagok és várak',
          text: 'A **lovag** páncélos, lovon harcoló katona volt. Nem lehetett egyik napról a másikra azzá válni:\n\n1. Kb. 7 évesen a fiú **apródként** egy úr udvarába került: illemet, lovaglást, felszolgálást tanult.\n2. Kb. 14 évesen **fegyverhordozó** lett: gondozta ura lovát, fegyverét, elkísérte a csatákba.\n3. Kb. 21 évesen ünnepélyesen **lovaggá ütötték**: a vállát kardlappal megérintették.\n\nA lovagnak illett bátornak, hűségesnek, bőkezűnek lennie, és védenie a gyengéket. Ezek a **lovagi erények**. Lovagi tornákon mutatták meg ügyességüket.\n\nAz urak **várakban** laktak, és ezek egyben erődök is voltak. A várat sokszor **vizesárok** vette körül, amelyen át **felvonóhíd** vezetett. A vastag falakat **bástyák** és tornyok erősítették, a keskeny **lőréseken** át lőttek ki a védők. A vár legerősebb része az **öregtorony** volt: ide menekültek, ha az ellenség betört.'
        },
        {
          title: 'Kolostorok: ima, munka és könyvek',
          text: 'A **szerzetesek** és **apácák** kolostorokban, Istennek szentelt közösségben éltek. A nyugati szerzetesség atyja **Szent Benedek** volt, aki 529 körül Itáliában, Monte Cassinóban alapított kolostort. Szabályzatának jelmondata: „Imádkozzál és dolgozzál!”\n\nA kolostorok a tudás őrzői voltak. Nyomtatás még nem létezett, ezért a szerzetesek **kézzel másolták** a könyveket, **kódexeket**, gyakran gyönyörű, színes díszítéssel. Egy-egy könyv lemásolása hónapokig tartott. A kolostorokban iskolák, kórházak is működtek, és a szerzetesek új növényeket, gazdálkodási módokat terjesztettek.\n\nMagyarország legrégebbi kolostora a **pannonhalmi bencés apátság**, amelyet 996-ban alapítottak, és ma is működik.'
        },
        {
          title: 'Városok és céhek',
          text: 'A középkor második felében egyre több **város** épült, főleg kereskedelmi utak mentén és folyók partján. A városokat fal vette körül, a központjukban volt a **piactér** és a templom. A városlakókat **polgároknak** hívták. A városok kiváltságokat kaptak a királytól: maguk választhatták vezetőiket és bíráikat.\n\nA kézművesek **céhekbe** tömörültek: egy céhbe tartozott például a város összes pékje vagy kovácsa. A céh szabályozta az árakat, a minőséget, és azt, ki dolgozhat a szakmában. A szakmát három lépésben lehetett kitanulni:\n\n- **Inas**: kisfiúként a mester házában élt és tanult.\n- **Legény**: már értett a szakmához, és **vándorútra** indult, hogy más városokban is tanuljon.\n- **Mester**: elkészítette a **mesterremeket**, és saját műhelyt nyithatott.\n\nA zsúfolt városokban gyorsan terjedtek a betegségek. 1347 és 1351 között a **pestis** (a „fekete halál”) Európa lakosságának nagyjából egyharmadát elpusztította.',
          widget: { type: 'idovonal', options: { title: 'A középkor ezer éve', events: [
            { year: 476, title: 'Kezdődik a középkor', text: 'Megszűnik a Nyugatrómai Birodalom.' },
            { year: 529, label: '529 körül', title: 'Monte Cassino', text: 'Szent Benedek kolostort alapít: kezdetét veszi a bencés szerzetesség.' },
            { year: 800, title: 'Nagy Károly császár', text: 'A frank királyt a pápa Rómában császárrá koronázza.' },
            { year: 996, title: 'Pannonhalma', text: 'Megalapítják Magyarország első bencés apátságát.' },
            { year: 1096, title: 'Az első keresztes hadjárat', text: 'Európai lovagok indulnak a Szentföld, Jeruzsálem elfoglalására.' },
            { year: 1163, title: 'Épülni kezd a párizsi Notre-Dame', text: 'A gótikus katedrálisok magas, csúcsíves ablakaikkal a középkori városok büszkeségei.' },
            { year: 1347, label: '1347–1351', title: 'A pestis', text: 'A „fekete halál” Európa lakosságának kb. egyharmadát elpusztítja.' },
            { year: 1492, title: 'Véget ér a középkor', text: 'Kolumbusz eljut Amerikába: ezt az évet szokás a középkor végének tekinteni.' }
          ] } }
        },
        {
          title: 'Párosító játék',
          text: 'Párosítsd a középkori fogalmakat a jelentésükkel!',
          widget: { type: 'parositas', options: { title: 'Középkori fogalmak', count: 6, pairs: [
            ['Jobbágy', 'A földesúr földjét művelő paraszt'],
            ['Apród', 'Lovagnak tanuló kisfiú'],
            ['Felvonóhíd', 'A vizesárok fölött felhúzható átjáró'],
            ['Kódex', 'Kézzel másolt középkori könyv'],
            ['Céh', 'Egy szakma mestereinek szövetsége'],
            ['Legény', 'Vándorútra induló, kitanult iparos'],
            ['Tized', 'A termés egytizede, amely az egyházat illette'],
            ['Öregtorony', 'A vár legerősebb, utolsó menedéke']
          ] } }
        }
      ],
      quiz: [
        { q: 'Milyen sorrendben lett valaki lovag?', options: ['Fegyverhordozó → apród → lovag', 'Apród → fegyverhordozó → lovag', 'Inas → legény → lovag', 'Lovag → apród → fegyverhordozó'], answer: 1, explain: 'Kb. 7 évesen apród, 14 évesen fegyverhordozó, 21 évesen lovaggá ütötték.' },
        { q: 'Mi volt Szent Benedek szabályzatának jelmondata?', options: ['„Imádkozzál és dolgozzál!”', '„Minden út Rómába vezet.”', '„Isten, haza, szabadság”', '„Szemet szemért”'], answer: 0, explain: 'A bencések az imát és a munkát egyaránt fontosnak tartották.' },
        { q: 'Ki készíthetett mesterremeket?', options: ['A jobbágy', 'Az apród', 'A céhbe tartozó legény, aki mester akart lenni', 'A szerzetes'], answer: 2, explain: 'A legény a mesterremek elkészítésével bizonyította tudását, és utána nyithatott saját műhelyt.' },
        { q: 'Miért másolták kézzel a könyveket a középkori kolostorokban?', options: ['Mert úgy szebb volt', 'Mert a pápa megtiltotta a nyomtatást', 'Mert a gépek túl drágák voltak', 'Mert a könyvnyomtatást még nem találták fel'], answer: 3, explain: 'A könyvnyomtatás Európában csak az 1450-es években terjedt el.' }
      ]
    },
    {
      id: 'felfedezesek',
      title: 'Felfedezések és reformáció',
      level: 2, minutes: 15,
      summary: 'Kolumbusz, Vasco da Gama és Magellán hajóútjai, Gutenberg könyvnyomtatása és Luther Márton fellépése: egy kitáguló világ.',
      tags: ['földrajzi felfedezések', 'Kolumbusz', 'Amerika', 'Vasco da Gama', 'Magellán', 'Föld körüli út', 'karavella', 'iránytű', 'azték', 'inka', 'Gutenberg', 'könyvnyomtatás', 'Hess András', 'reformáció', 'Luther', '95 tétel', 'Kálvin', 'Károli Gáspár', '1492', '1517'],
      sections: [
        {
          title: 'Miért indultak útnak?',
          text: 'A középkor végén az európaiak nagyon vágytak a távoli **Indiából** és Kelet-Ázsiából érkező árukra: a **fűszerekre** (bors, fahéj, szegfűszeg), a selyemre és a drágakövekre. A szárazföldi utak azonban hosszúak és veszélyesek voltak, és sok kézen ment át az áru, ezért nagyon drága lett. Új, **tengeri utat** kerestek.\n\nAz utazáshoz új eszközök is kellettek:\n\n- az **iránytű**, amely felhős időben is mutatta az északi irányt,\n- a **karavella**, egy gyors, kis hajó, amely széllel szemben is tudott cirkálni,\n- pontosabb **térképek** és csillagászati mérőeszközök.\n\nA bátor tengerészek hónapokig hajóztak ismeretlen vizeken. Sokan meghaltak skorbutban (C-vitamin-hiányban), viharokban vagy éhségben.'
        },
        {
          title: 'Új világ és Föld körüli út',
          text: 'A genovai **Kolumbusz Kristóf** úgy gondolta, hogy ha nyugat felé hajózik, a gömbölyű Földet megkerülve Indiába ér. A spanyol királyi pártól kapott három hajót, és **1492. október 12-én** partot ért egy Bahama-szigeten. Haláláig azt hitte, Indiába jutott, ezért nevezte a helyieket „indiánoknak”. Valójában egy Európában addig ismeretlen földrészt, **Amerikát** érte el. A kontinens nevét később **Amerigo Vespucci** utazóról kapta, aki rájött, hogy ez egy új világrész.\n\nA portugál **Vasco da Gama** Afrika megkerülésével 1498-ban valóban elérte Indiát.\n\nA legmerészebb utat **Magellán** szervezte. 1519-ben öt hajóval indult nyugatra, átjutott Dél-Amerika déli csücskénél egy szoroson (ma **Magellán-szoros**), és átkelt a hatalmas **Csendes-óceánon**. Ő maga 1521-ben a Fülöp-szigeteken egy harcban meghalt, de egy hajója, a Victoria, 1522-ben 18 túlélővel visszaért Spanyolországba. Ez volt az **első Föld körüli út**, és bebizonyította, hogy a Föld gömb alakú, és az óceánok összefüggnek.'
        },
        {
          title: 'A felfedezések következményei',
          text: 'Amerikából új növények jutottak Európába: a **burgonya**, a **kukorica**, a **paradicsom**, a **paprika**, a **bab**, a **napraforgó**, a **kakaó** és a dohány. Képzeld el a magyar konyhát paprika és krumpli nélkül!\n\nA felfedezéseknek súlyos árnyoldala is volt. A spanyol hódítók (konkvisztádorok) elfoglalták a gazdag **azték** és **inka** birodalmakat. Az Európából behurcolt betegségek, például a himlő, ellen az amerikai őslakosoknak nem volt védettségük, ezért milliók haltak meg. Később Afrikából emberek millióit hurcolták rabszolgaként Amerikába, hogy ültetvényeken dolgoztassák őket.\n\nA világ kereskedelmének központja a Földközi-tengerről az **Atlanti-óceán** partjára került.'
        },
        {
          title: 'A könyvnyomtatás forradalma',
          text: 'Az 1450-es években a mainzi **Johannes Gutenberg** feltalálta a **mozgatható betűkkel** történő nyomtatást. Fémből öntött apró betűket rakott sorokba, befestékezte, és présgéppel papírra nyomta. A betűket utána szétszedhette, és új oldalt rakhatott ki belőlük. Leghíresebb műve a **Gutenberg-biblia** (1455 körül).\n\nAmi korábban egy szerzetesnek hónapokig tartott, azt most napok alatt, száz példányban is el lehetett készíteni. A könyvek olcsóbbak lettek, egyre többen tanultak meg olvasni, és az új gondolatok gyorsan elterjedtek egész Európában.\n\nMagyarországon **Hess András** nyomdája működött elsőként, Budán: itt jelent meg 1473-ban a **Budai Krónika**.'
        },
        {
          title: 'A reformáció',
          text: 'A 16. század elején sokan elégedetlenek voltak az egyházzal: bírálták a gazdagságát, és azt, hogy pénzért **búcsúcédulákat** árultak, amelyek a bűnök büntetésének elengedését ígérték.\n\n**Luther Márton** német szerzetes és egyetemi tanár **1517. október 31-én** közzétette **95 tételét** Wittenbergben, amelyekben vitatta a búcsúcédulák árusítását. Szerinte az ember üdvösségét nem a pénz, hanem a **hit** dönti el, és a hit alapja a **Biblia**. Lefordította a Bibliát németre, hogy mindenki a saját anyanyelvén olvashassa. A könyvnyomtatásnak köszönhetően gondolatai hetek alatt elterjedtek.\n\nLuther fellépésével kezdődött a **reformáció** (jelentése: megújítás). Követőiből lett az **evangélikus** (lutheránus) egyház. A svájci Genfben **Kálvin János** tanításai alapján jött létre a **református** egyház, amely Magyarországon is sok hívet szerzett. **Károli Gáspár** református lelkész fordításában 1590-ben jelent meg a teljes magyar Biblia, a **Vizsolyi Biblia**.\n\nA katolikus egyház is megújult (**katolikus megújulás**), és Európa vallásilag megosztottá vált. Október 31-e ma a **reformáció emléknapja**.',
          widget: { type: 'idovonal', options: { title: 'Egy kitáguló világ', events: [
            { year: 1455, label: '1455 körül', title: 'Gutenberg-biblia', text: 'Elkészül az első nagy, mozgatható betűkkel nyomtatott könyv.' },
            { year: 1473, title: 'Budai Krónika', text: 'Hess András budai nyomdájában megjelenik az első Magyarországon nyomtatott könyv.' },
            { year: 1492, title: 'Kolumbusz Amerikában', text: 'Október 12-én a hajósok partot érnek egy Bahama-szigeten.' },
            { year: 1498, title: 'Vasco da Gama Indiában', text: 'Afrikát megkerülve megtalálja a tengeri utat Indiába.' },
            { year: 1517, title: 'Luther 95 tétele', text: 'Október 31-én Wittenbergben kezdődik a reformáció.' },
            { year: 1519, title: 'Magellán útnak indul', text: 'Öt hajóval indul nyugat felé.' },
            { year: 1522, title: 'Az első Föld körüli út vége', text: 'A Victoria 18 túlélővel visszaér Spanyolországba.' },
            { year: 1590, title: 'Vizsolyi Biblia', text: 'Megjelenik Károli Gáspár teljes magyar bibliafordítása.' }
          ] } }
        },
        {
          title: 'Párosító játék',
          text: 'Ki mit tett? Párosítsd a neveket!',
          widget: { type: 'parositas', options: { title: 'Felfedezők és újítók', count: 6, pairs: [
            ['Kolumbusz Kristóf', 'Nyugatra hajózva eljutott Amerikába'],
            ['Vasco da Gama', 'Afrikát megkerülve elérte Indiát'],
            ['Magellán', 'Elindította az első Föld körüli utat'],
            ['Amerigo Vespucci', 'Róla nevezték el az új földrészt'],
            ['Gutenberg', 'Mozgatható betűkkel nyomtatott'],
            ['Hess András', 'Az első budai nyomdász'],
            ['Luther Márton', 'Közzétette 95 tételét Wittenbergben'],
            ['Károli Gáspár', 'Lefordította a teljes Bibliát magyarra']
          ] } }
        }
      ],
      quiz: [
        { q: 'Hová akart eljutni Kolumbusz, amikor nyugatra hajózott?', options: ['Amerikába', 'Indiába', 'Ausztráliába', 'Az Északi-sarkra'], answer: 1, explain: 'Kolumbusz Indiát kereste; haláláig nem tudta, hogy egy új földrészre jutott.' },
        { q: 'Mit bizonyított Magellán expedíciója?', options: ['Hogy a Föld lapos', 'Hogy Amerika Ázsia része', 'Hogy a Föld körbehajózható, tehát gömb alakú', 'Hogy Indiába nincs tengeri út'], answer: 2, explain: 'A Victoria nyugat felé indulva keletről érkezett vissza Spanyolországba.' },
        { q: 'Melyik növény NEM Amerikából került Európába?', options: ['Burgonya', 'Paprika', 'Kukorica', 'Búza'], answer: 3, explain: 'A búzát már az ókor óta termesztették Európában; a burgonya, a paprika és a kukorica amerikai eredetű.' },
        { q: 'Mi volt Luther Márton egyik fő tanítása?', options: ['Az üdvösség alapja a hit, és a hit forrása a Biblia', 'A búcsúcédulák vásárlása a legfontosabb', 'A Bibliát csak latinul szabad olvasni', 'A templomokat le kell rombolni'], answer: 0, explain: 'Luther ezért fordította le a Bibliát németre: mindenki maga olvashassa.' }
      ]
    },
    {
      id: 'magyar-alakok',
      title: 'A magyar történelem nagy alakjai',
      level: 1, minutes: 16,
      summary: 'Árpád, Szent István, IV. Béla, Hunyadi Mátyás, II. Rákóczi Ferenc, Széchenyi István, Kossuth Lajos és Petőfi Sándor rövid története.',
      tags: ['Árpád', 'honfoglalás', 'Szent István', 'államalapítás', 'IV. Béla', 'tatárjárás', 'Muhi', 'Hunyadi János', 'Hunyadi Mátyás', 'fekete sereg', 'Corvina', 'Rákóczi', 'kuruc', 'Széchenyi', 'Lánchíd', 'Kossuth', 'Petőfi', '1848', 'március 15.'],
      sections: [
        {
          title: 'Árpád és Szent István: haza és állam',
          text: '**Árpád** fejedelem vezetésével **895 körül** a magyar törzsek átkeltek a Kárpátokon, és új hazát foglaltak a **Kárpát-medencében**. Ezt nevezzük **honfoglalásnak**. Árpád utódai, az **Árpád-ház** uralkodói egészen 1301-ig, több mint négyszáz évig vezették az országot.\n\nÁrpád dédunokája, **Géza** fejedelem fia, **Vajk** a keresztségben az **István** nevet kapta. Belátta, hogy a magyarság csak akkor maradhat fenn Európa közepén, ha keresztény királysággá válik. **1000 karácsonyán** (vagy 1001 első napján) királlyá koronázták: ő lett Magyarország **első királya**.\n\nIstván püspökségeket és templomokat alapított, az országot **vármegyékre** osztotta, és törvényeket hozott. Fiának, Imre hercegnek írt **Intelmeiben** azt tanácsolta, hogy fogadja be az idegeneket, mert az „egy nyelvű és egy szokású ország gyenge és esendő”. Szentté avatták, ünnepe **augusztus 20.**, az **államalapítás** ünnepe.'
        },
        {
          title: 'IV. Béla: a második honalapító',
          text: '**1241** tavaszán a mongolok (tatárok) hatalmas, gyors lovas serege tört be az országba. **IV. Béla** király seregét a **Muhi** melletti csatában súlyos vereség érte. A tatárok egy évig pusztították az országot, a lakosság jelentős része elpusztult. A király a tengerparti Trau (ma Trogir) várába menekült.\n\n1242-ben a tatárok váratlanul kivonultak. Béla hozzáfogott az ország újjáépítéséhez: telepeseket hívott be, és arra bíztatta az urakat, hogy **kővárakat** építsenek, mert a tatárok csak a jól megerősített várakat nem tudták bevenni. Ekkor épült ki **Buda vára** is. Ezért nevezzük IV. Bélát a **második honalapítónak**.\n\nLánya, **Margit** a Nyulak szigetén (ma Margitsziget) lett apáca; később szentté avatták.'
        },
        {
          title: 'Hunyadi Mátyás: az igazságos király',
          text: 'A 15. században az Oszmán (Török) Birodalom fenyegette az országot. **Hunyadi János** hadvezér **1456-ban Nándorfehérvárnál** (ma Belgrád) nagy győzelmet aratott a török felett. A győzelem emlékére szól ma is világszerte a templomokban a **déli harangszó**.\n\nFia, **Hunyadi Mátyás** mindössze 14 évesen, **1458-ban** lett király. Erős, zsoldosokból álló hadsereget szervezett, a **fekete sereget**. Budai és visegrádi udvarában itáliai mesterek dolgoztak: így jutott el hozzánk a **reneszánsz** művészet. Feleségével, Beatrix királynéval pompás udvart tartott.\n\nMátyás könyvtára, a **Bibliotheca Corviniana** Európa egyik leggazdagabb könyvtára volt. Díszes kötetei, a **corvinák** ma kincsnek számítanak. Halála (1490) után a nép emlegette: „Meghalt Mátyás király, oda az igazság.” A népmesékben ő az álruhában járó, igazságos király.'
        },
        {
          title: 'II. Rákóczi Ferenc: harc a szabadságért',
          text: 'Az 1526-os **mohácsi vész** után az ország három részre szakadt, majd a törökök kiűzése (1686, Buda visszafoglalása) után a **Habsburgok** uralma alá került. Sokan elégedetlenek voltak a magas adók és az idegen katonaság miatt.\n\n**1703-ban** az erdélyi fejedelmi családból származó **II. Rákóczi Ferenc** állt a szabadságharc élére. Katonáit **kurucoknak**, a Habsburg-pártiakat **labancoknak** hívták. Zászlaján a felirat: „Istennel a hazáért és a szabadságért” (latinul: „Cum Deo pro Patria et Libertate”).\n\nA harc nyolc évig tartott, és **1711-ben** a szatmári békével ért véget. Rákóczi nem fogadta el a békét: száműzetésbe ment, és a törökországi **Rodostóban** halt meg. Hűséges íródeákja, **Mikes Kelemen** leveleiben örökítette meg a száműzöttek életét.'
        },
        {
          title: 'Széchenyi, Kossuth, Petőfi: a reformkor és 1848',
          text: 'A 19. század elején Magyarország elmaradott volt: kevés volt a gyár, a jó út, a híd, a jobbágyok pedig még a földesúrnak dolgoztak. A változásokért küzdő korszakot **reformkornak** hívjuk.\n\n**Széchenyi István** gróf 1825-ben egyévi jövedelmét ajánlotta fel a **Magyar Tudományos Akadémia** alapítására. Kezdeményezte a **Lánchíd** megépítését, az első állandó hidat Buda és Pest között, a gőzhajózást és a Tisza szabályozását. „Hitel” című könyvében a fejlődés útját mutatta meg. Kossuth nevezte őt „a legnagyobb magyarnak”.\n\n**Kossuth Lajos** ügyvéd és újságíró volt, lapjában lelkes cikkekben követelte a jobbágyok felszabadítását és az ország függetlenségét. Kiváló szónok volt.\n\n**Petőfi Sándor** a magyar irodalom egyik legnagyobb költője. **1848. március 15-én** Pesten ifjú barátaival a Pilvax kávéházból indulva kinyomtatták a **12 pontot** és a **Nemzeti dalt** („Talpra magyar, hí a haza!”), cenzúra nélkül. Ez a nap lett a **forradalom** ünnepe.\n\nTavasszal a király elfogadta az **áprilisi törvényeket**: megszűnt a jobbágyság, és Magyarországnak saját felelős kormánya lett, amelyben Széchenyi és Kossuth is miniszter volt. Ősszel háború tört ki a Habsburgokkal, ekkor Kossuth lett a honvédelem vezetője. Petőfi **1849 júliusában** a segesvári csatában, 26 évesen eltűnt, valószínűleg elesett. A **szabadságharcot** 1849 augusztusában orosz segítséggel leverték, és **október 6-án** Aradon kivégezték a honvédsereg 13 tábornokát, az **aradi vértanúkat**. Kossuth külföldre menekült, és haláláig száműzetésben élt.',
          tip: 'Két nemzeti ünnepünk is ebben a leckében van: **augusztus 20.** (államalapítás) és **március 15.** (az 1848-as forradalom). A harmadik, **október 23.** az 1956-os forradalomé, erről a következő leckében olvashatsz.',
          widget: { type: 'idovonal', options: { title: 'Nagy alakok, nagy pillanatok', events: [
            { year: 895, label: '895 körül', title: 'Honfoglalás', text: 'Árpád vezetésével a magyarok a Kárpát-medencébe érkeznek.' },
            { year: 1000, label: '1000/1001', title: 'István királlyá koronázása', text: 'Megszületik a keresztény Magyar Királyság.' },
            { year: 1241, title: 'Tatárjárás, muhi csata', text: 'IV. Béla serege vereséget szenved; a tatárok egy évig pusztítanak.' },
            { year: 1456, title: 'Nándorfehérvári diadal', text: 'Hunyadi János legyőzi a törököt. Emlékére szól a déli harangszó.' },
            { year: 1458, title: 'Mátyás királlyá választása', text: 'A 14 éves Hunyadi Mátyás lesz a király.' },
            { year: 1703, title: 'Kezdődik a Rákóczi-szabadságharc', text: 'II. Rákóczi Ferenc a kurucok élére áll.' },
            { year: 1825, title: 'Az Akadémia alapítása', text: 'Széchenyi egyévi jövedelmét ajánlja fel a tudomány magyar műhelyére.' },
            { year: 1848, label: '1848. március 15.', title: 'A pesti forradalom', text: 'Petőfi és társai kinyomtatják a 12 pontot és a Nemzeti dalt.' },
            { year: 1849, label: '1849. október 6.', title: 'Az aradi vértanúk', text: 'A szabadságharc leverése után kivégzik a 13 honvédtábornokot.' }
          ] } }
        },
        {
          title: 'Párosító játék',
          text: 'Ki kicsoda? Párosítsd a nagy alakokat a tetteikkel!',
          widget: { type: 'parositas', options: { title: 'Magyar történelmi alakok', count: 6, pairs: [
            ['Árpád', 'Vezetésével zajlott a honfoglalás'],
            ['Szent István', 'Az első magyar király'],
            ['IV. Béla', 'A tatárjárás után újjáépítette az országot'],
            ['Hunyadi János', 'Nándorfehérvári győzelem, déli harangszó'],
            ['Hunyadi Mátyás', 'Fekete sereg és corvinák'],
            ['II. Rákóczi Ferenc', 'A kurucok vezére'],
            ['Széchenyi István', 'Akadémia és Lánchíd'],
            ['Kossuth Lajos', 'Lánglelkű szónok, 1849-ben a honvédelem vezetője'],
            ['Petőfi Sándor', 'Nemzeti dal, 1848. március 15.']
          ] } }
        }
      ],
      quiz: [
        { q: 'Kit nevezünk második honalapítónak?', options: ['Árpádot', 'IV. Bélát', 'Hunyadi Mátyást', 'Kossuth Lajost'], answer: 1, explain: 'IV. Béla a tatárjárás után újjáépítette az országot, kővárakat építtetett és telepeseket hívott be.' },
        { q: 'Minek az emlékére szól a déli harangszó?', options: ['A honfoglalásnak', 'A muhi csatának', 'A nándorfehérvári diadalnak (1456)', 'Mátyás koronázásának'], answer: 2, explain: 'Hunyadi János 1456-ban győzött Nándorfehérvárnál.' },
        { q: 'Kinek a nevéhez fűződik a Magyar Tudományos Akadémia alapítása?', options: ['Petőfi Sándor', 'II. Rákóczi Ferenc', 'Szent István', 'Széchenyi István'], answer: 3, explain: 'Széchenyi 1825-ben egyévi jövedelmét ajánlotta fel az Akadémia alapítására.' },
        { q: 'Mit nyomtattak ki 1848. március 15-én cenzúra nélkül?', options: ['A 12 pontot és a Nemzeti dalt', 'A Hitel című könyvet', 'A Budai Krónikát', 'Szent István Intelmeit'], answer: 0, explain: 'Ezzel a nap jelképévé vált a sajtószabadság és a forradalom.' }
      ]
    },
    {
      id: 'huszadik-szazad',
      title: 'A 20. század röviden',
      level: 2, minutes: 16,
      summary: 'Két világháború, Trianon, a holokauszt, a kommunista diktatúra, az 1956-os forradalom és az 1989-es rendszerváltás.',
      tags: ['20. század', 'első világháború', 'Szarajevó', 'lövészárok', 'Trianon', 'második világháború', 'Hitler', 'holokauszt', 'diktatúra', 'Rákosi', '1956', 'Nagy Imre', 'Kádár', 'rendszerváltás', '1989', 'Berlini fal', 'NATO', 'Európai Unió'],
      sections: [
        {
          title: 'Az első világháború és Trianon',
          text: '**1914. június 28-án** Szarajevóban egy merénylő lelőtte Ferenc Ferdinándot, az Osztrák–Magyar Monarchia trónörökösét. A szövetségi rendszerek miatt néhány hét alatt szinte egész Európa háborúba sodródott: kitört az **első világháború** (1914–1918).\n\nA katonák évekig **lövészárkokban** éltek, sárban, hidegben. Új, félelmetes fegyvereket vetettek be: géppuskát, harci gázt, tankot és repülőgépet. A háborúban kb. 10 millió katona halt meg.\n\nAz Osztrák–Magyar Monarchia a vesztesek között volt, és 1918-ban felbomlott. Az **1920. június 4-én** aláírt **trianoni békeszerződés** szerint Magyarország elvesztette területének kb. kétharmadát, és kb. 3,3 millió magyar anyanyelvű ember a szomszédos országokba került. Ezért él ma is sok magyar a határainkon túl. Június 4-e a **nemzeti összetartozás napja**.'
        },
        {
          title: 'A második világháború és a holokauszt',
          text: 'Németországban **Adolf Hitler** és a **náci** párt 1933-ban jutott hatalomra. Diktatúrát építettek ki, és azt hirdették, hogy bizonyos népek „értéktelenebbek” másoknál. **1939. szeptember 1-jén** Németország megtámadta Lengyelországot: kitört a **második világháború** (1939–1945), a történelem legpusztítóbb háborúja, amelyben kb. 60 millió ember halt meg, köztük rengeteg civil.\n\nA nácik és szövetségeseik kb. **6 millió zsidó** embert gyilkoltak meg, csak azért, mert zsidók voltak. Ezt a népirtást nevezzük **holokausztnak** (héber szóval soának). Áldozatul estek romák, fogyatékossággal élők és politikai ellenfelek is. Magyarország 1941-től Németország oldalán harcolt; az ország **1944-es** német megszállása után a magyar hatóságok közreműködésével több mint 400 ezer magyar zsidót deportáltak, többségüket Auschwitzban megölték. Április 16-a a **holokauszt magyarországi áldozatainak emléknapja**.\n\nA háború Európában **1945 májusában** ért véget. Magyarországon a harcok hatalmas pusztítással jártak: Budapest hídjait felrobbantották, a város nagy része romokban hevert.',
          warn: 'A holokausztról tanulni nehéz, de fontos: azért emlékezünk, hogy soha többé ne történhessen meg. Ha kérdésed van vagy nyugtalanít a téma, beszélgess róla tanároddal vagy szüleiddel.'
        },
        {
          title: 'Diktatúra és az 1956-os forradalom',
          text: 'A háború után Magyarország a **Szovjetunió** befolyása alá került. A **kommunista párt** **Rákosi Mátyás** vezetésével **diktatúrát** épített ki: nem lehetett szabadon választani, véleményt mondani, a parasztoktól elvették a termés nagy részét (**beszolgáltatás**), az ellenfeleket a titkosrendőrség (ÁVH) üldözte, sokakat börtönbe zártak vagy kitelepítettek.\n\n**1956. október 23-án** budapesti egyetemisták békés tüntetést szerveztek szabadságot és függetlenséget követelve. A tömeghez százezrek csatlakoztak, ledöntötték a hatalmas **Sztálin-szobrot**, és a **Rádiónál** fegyveres harc tört ki. Ebből lett a **forradalom és szabadságharc**. **Nagy Imre** miniszterelnök kimondta az ország semlegességét, és kilépést a szovjet katonai szövetségből.\n\n**November 4-én** a szovjet hadsereg hatalmas erővel támadt, és leverte a forradalmat. Kb. 200 ezer ember menekült el külföldre, Nagy Imrét 1958-ban kivégezték. Ezután **Kádár János** vezette az országot több mint 30 évig. Ez a diktatúra enyhébb volt Rákosiénál, de szabad választások és szólásszabadság továbbra sem voltak. Október 23-a ma **nemzeti ünnep**.'
        },
        {
          title: 'A rendszerváltás',
          text: 'Az 1980-as években a Szovjetunió és a hozzá kötött országok gazdasága egyre nehezebb helyzetbe került, és az emberek egyre bátrabban követelték a változást.\n\n**1989** a csodák éve lett Közép-Európában:\n\n- **június 16-án** Budapesten több százezer ember jelenlétében **újratemették Nagy Imrét** és mártírtársait;\n- **nyáron és ősszel** Magyarország megnyitotta határát Ausztria felé, és több ezer keletnémet menekült juthatott át Nyugatra;\n- **október 23-án** kikiáltották a **Magyar Köztársaságot**;\n- **november 9-én** leomlott a **berlini fal**, amely addig kettéosztotta Berlint.\n\n**1990** tavaszán az országban évtizedek óta először tartottak **szabad választásokat**, és **Antall József** lett az első szabadon választott miniszterelnök. 1991-ben az utolsó szovjet katona is elhagyta Magyarországot. Ezt az átalakulást a diktatúrából a **demokráciába** nevezzük **rendszerváltásnak**. Magyarország **1999-ben** a NATO, **2004-ben** az **Európai Unió** tagja lett.',
          widget: { type: 'idovonal', options: { title: 'A 20. század fordulópontjai', events: [
            { year: 1914, title: 'Kitör az első világháború', text: 'Szarajevói merénylet, majd néhány hét alatt európai háború.' },
            { year: 1918, title: 'Véget ér az első világháború', text: 'Felbomlik az Osztrák–Magyar Monarchia.' },
            { year: 1920, title: 'Trianoni békeszerződés', text: 'Magyarország elveszti területének kb. kétharmadát.' },
            { year: 1939, title: 'Kitör a második világháború', text: 'Németország megtámadja Lengyelországot.' },
            { year: 1944, title: 'Német megszállás, deportálások', text: 'A magyar zsidók százezreit hurcolják haláltáborokba.' },
            { year: 1945, title: 'Véget ér a második világháború', text: 'Európában májusban hallgatnak el a fegyverek.' },
            { year: 1956, label: '1956. október 23.', title: 'Forradalom és szabadságharc', text: 'A szabadságért és függetlenségért kitört forradalmat november 4-én leverik.' },
            { year: 1989.45, label: '1989. június 16.', title: 'Nagy Imre újratemetése', text: 'Százezrek emlékeznek a forradalom mártírjaira.' },
            { year: 1989.8, label: '1989. október 23.', title: 'Kikiáltják a köztársaságot', text: 'Magyarország Magyar Köztársaság lesz.' },
            { year: 1989.86, label: '1989. november 9.', title: 'Leomlik a berlini fal', text: 'Véget ér Európa kettéosztottsága.' },
            { year: 1990, title: 'Szabad választások', text: 'Antall József lesz az első szabadon választott miniszterelnök.' },
            { year: 2004, title: 'Az Európai Unió tagjai leszünk', text: 'Május 1-jén Magyarország csatlakozik az EU-hoz.' }
          ] } }
        },
        {
          title: 'Párosító játék',
          text: 'Párosítsd az évszámot a hozzá tartozó eseménnyel!',
          widget: { type: 'parositas', options: { title: 'A 20. század évszámai', count: 6, pairs: [
            ['1914', 'Kitör az első világháború'],
            ['1920', 'Trianoni békeszerződés'],
            ['1939', 'Kitör a második világháború'],
            ['1944', 'Német megszállás, deportálások'],
            ['1956', 'Forradalom és szabadságharc'],
            ['1989', 'Leomlik a berlini fal'],
            ['1990', 'Az első szabad választás'],
            ['2004', 'Belépünk az Európai Unióba']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi indította el az első világháborút?', options: ['A berlini fal leomlása', 'A szarajevói merénylet 1914-ben', 'Lengyelország megtámadása', 'A trianoni békeszerződés'], answer: 1, explain: 'Ferenc Ferdinánd trónörökös meggyilkolása után néhány hét alatt kitört a háború.' },
        { q: 'Mit nevezünk holokausztnak?', options: ['Egy első világháborús csatát', 'A berlini fal építését', 'A zsidók és más csoportok tömeges meggyilkolását a nácik által', 'Az 1956-os forradalmat'], answer: 2, explain: 'A holokausztban kb. 6 millió zsidó embert gyilkoltak meg; áldozatai lettek romák és mások is.' },
        { q: 'Mikor tört ki az 1956-os forradalom?', options: ['Március 15-én', 'Augusztus 20-án', 'November 4-én', 'Október 23-án'], answer: 3, explain: 'Október 23-a nemzeti ünnep. November 4-én a szovjet hadsereg leverte a forradalmat.' },
        { q: 'Mit jelent a rendszerváltás?', options: ['Az átmenetet a diktatúrából a demokráciába', 'A királyság visszaállítását', 'A Szovjetunióhoz való csatlakozást', 'Az első világháború végét'], answer: 0, explain: '1989–1990-ben Magyarországon békésen, szabad választásokkal valósult meg a demokrácia.' }
      ]
    }
  ]
});
