/* Tantárgy: Hétköznapi túlélőtudás – amit az iskola nem tanít meg.
 * Kiegészíti (nem ismétli) a haztartas, felnott-elet és penz-mindennap tantárgyakat: ahol ott már van alap, ide linkelünk.
 * Egyetemi/szakmai réteg: data/szakmai/tulelotudas.js · kérdésbank: data/kerdesek/tulelotudas.js · Tudtad?: data/tudtad/tulelotudas.js */
STUDIE.addSubject({
  id: 'tulelotudas',
  stage: 'elet',
  title: 'Hétköznapi túlélőtudás',
  icon: '🧰',
  color: '#2f7d6b',
  description: 'Rosszullét és sérülés felismerése, otthoni vészhelyzetek, csöpögő csap, fúrás és festés, albérlet és költözés a gyakorlatban, panaszkezelés, csalások, autóbaleset után, ruhaápolás és papírmunka.',
  intro: 'Vannak helyzetek, amelyekre senki nem készít fel: valaki összeesik a buszon, víz folyik a mosogató alól, a „bank” hív telefonon, koccansz a parkolóban, vagy éppen költözöl, és fogalmad sincs, mit hova kell bejelenteni. Ez a tantárgy ezekhez ad **lépésről lépésre** használható tudást, a „miért”-tel együtt.\n\nAz alapokat más tantárgyak már tárgyalják, ezeket itt nem ismételjük, hanem hivatkozunk rájuk:\n\n- újraélesztés, stabil oldalfekvés, félrenyelés, vérzés, égés: [[#/lecke/haztartas/elsosegely|Elsősegély: amit mindenkinek tudnia kell]]\n- szerszámok, lefolyó, kismegszakító, FI-relé: [[#/lecke/haztartas/javitasok|Apró javítások]]\n- mosási címkék, folttisztítás: [[#/lecke/haztartas/mosas-takaritas|Mosás, takarítás]]\n- albérlet költségei, kaució, rezsi: [[#/lecke/penz-mindennap/lakhatas-rezsi|Albérlet, rezsi, első lakás]]\n- jótállás, szavatosság, 14 napos elállás: [[#/lecke/penz-mindennap/fogyasztovedelem|Fogyasztói jogaid]]\n- okmányok, Ügyfélkapu+, szerződések, biztosítás: [[#/tantargy/felnott-elet|Hivatalos ügyek és a munka világa]]\n\nFontos: az elsősegély-leckék **nem helyettesítik a gyakorlati tanfolyamot** (például a Magyar Vöröskereszt vagy az Országos Mentőszolgálat képzéseit), a jogi részek pedig **nem jogi tanácsadás**. A jogszabályi adatok a **2026-os** állapotot tükrözik; a szabályok változhatnak, ezért fontos ügyben mindig nézd meg a hatályos szöveget.',
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 'rosszullet',
      title: 'Rosszullétek felismerése: infarktus, stroke, roham, ájulás',
      level: 2, minutes: 15,
      summary: 'Hogyan ismered fel a szívinfarktust, a stroke-ot, az epilepsziás rohamot, a cukorbeteg leesett vércukrát és az asztmás rohamot, és mit tehetsz, amíg a mentő megérkezik.',
      tags: ['elsősegély', 'rosszullét', 'szívinfarktus', 'mellkasi fájdalom', 'aszpirin', 'stroke', 'FAST', 'agyérkatasztrófa', 'epilepszia', 'roham', 'ájulás', 'hipoglikémia', 'cukorbeteg', 'asztma', '112', '104'],
      sections: [
        {
          title: 'Az alapelv: felismerni és hívni',
          text: 'A legtöbb rosszullétnél **nem neked kell meggyógyítanod** a beteget. A te dolgod három dolog:\n\n1. **Felismerni**, hogy baj van (és nem „majd elmúlik”).\n2. **Hívni a 112-t** (vagy közvetlenül a mentőket a **104**-en), és pontosan elmondani, mit látsz.\n3. Amíg a mentő megérkezik: **biztonságba helyezni** a beteget, **figyelni** a légzését, és ha leáll, elkezdeni az újraélesztést.\n\nA mentésirányító (diszpécser) a telefonban **végigvezet**: kapcsold ki-hangosítóra, és csináld, amit mond. Ha a beteg elveszti az eszméletét, és **nem lélegzik normálisan**, az már szívmegállás: ennek teendőit a [[#/lecke/haztartas/elsosegely|Elsősegély]] lecke tárgyalja.',
          tip: 'A legtöbb súlyos rosszullétnél **az idő a legfontosabb**: infarktusnál a szívizom, stroke-nál az agysejtek percről percre pusztulnak. Inkább hívj „feleslegesen” mentőt, mint későn.'
        },
        {
          title: 'Szívinfarktus: a mellkasi fájdalom',
          text: '**Tipikus jelei:**\n- **nyomó, szorító, égő** fájdalom a mellkas közepén, ami **nem múlik el** néhány perc alatt,\n- kisugározhat a **bal karba**, a **nyakba, állkapocsba, hátba** vagy a gyomortájékra,\n- sápadtság, **hideg verejték**, hányinger, légszomj, halálfélelem.\n\nNőknél, időseknél és cukorbetegeknél gyakoribbak az **„atipikus”** jelek: inkább fáradtság, légszomj, hányinger, gyomorfájás.\n\n**Teendők:**\n1. Hívd a 112-t, mondd ki: „mellkasi fájdalom, infarktus gyanúja”.\n2. Ültesd le kényelmesen (félig ülő helyzet), lazítsd meg a szoros ruhát, ne engedd járkálni.\n3. Az **Európai Újraélesztési Tanács (ERC) 2025-ös** elsősegély-ajánlása szerint felnőttnek adható **300 mg aszpirin** (acetilszalicilsav, lehetőleg **rágótabletta**), ha **nem allergiás** rá, és a mentésirányító nem mond mást.\n4. Ha ismert szívbeteg, és van saját **nitroglicerin** spraye, segíts neki használni.\n5. Figyeld: ha elveszti az eszméletét és nem lélegzik normálisan, **újraélesztés + AED**.',
          warn: 'Ne vidd be autóval a kórházba „gyorsabb lesz” alapon: a mentőben EKG, gyógyszer és defibrillátor van, és a mentők a megfelelő (katéteres) centrumba viszik.'
        },
        {
          title: 'Stroke: gondolj a FAST-ra!',
          text: 'A **stroke** (agyi érkatasztrófa) akkor történik, ha az agy egy részének vérellátása hirtelen megszűnik (elzáródás) vagy vérzés lép fel. A felismeréshez a nemzetközi **FAST** betűszó segít:\n\n- **F – Face (arc)**: kérd meg, hogy mosolyogjon. **Lefelé lóg** az egyik szájzuga?\n- **A – Arm (kar)**: emelje fel mindkét karját, és tartsa 10 másodpercig. Az egyik **lesüllyed**?\n- **S – Speech (beszéd)**: mondjon egy egyszerű mondatot. **Elkent, értelmetlen** a beszéde, vagy nem érti, amit mondasz?\n- **T – Time (idő)**: ha bármelyik igaz, **azonnal hívd a 112-t**, és jegyezd meg, **mikor** kezdődtek a tünetek.\n\nEgyéb jelek: hirtelen **látászavar**, szédülés, egyensúlyzavar, „élete legerősebb” fejfájása.\n\nAz időpont azért fontos, mert az érelzáródás okozta stroke **feloldó kezelése** csak a tünetek kezdetétől számított néhány órán belül adható.',
          warn: 'Stroke-gyanúnál **ne adj** enni-inni és gyógyszert (aszpirint se!): a nyelés zavart lehet, és vérzéses stroke-nál az aszpirin árt.'
        },
        {
          title: 'Epilepsziás roham és ájulás',
          text: '**Nagyrohamnál** a beteg összeesik, megmerevedik, majd **rángatózik**, habzhat a szája, bepisilhet. Ijesztő, de a roham többnyire **magától elmúlik** 1–3 perc alatt.\n\n**Mit tegyél?**\n- **Védd a fejét** (tegyél alá kabátot), és tolj el mellőle mindent, amibe beleütheti magát.\n- **Ne fogd le**, és **ne tegyél semmit a szájába** (a nyelvét nem tudja „lenyelni”, viszont a te ujjad vagy egy kanál fogtörést, sérülést okoz).\n- **Nézd az órát**: mennyi ideig tart?\n- Ha vége, és lélegzik: **stabil oldalfekvés**, maradj mellette, amíg magához tér (zavart, álmos lehet).\n\n**Hívj mentőt**, ha a roham **5 percnél tovább tart**, ha egymás után több roham jön, ha nem tér magához, ha megsérült, vízben történt, várandós, vagy ha **ez az első rohama**.\n\n**Ájulás (rövid eszméletvesztés):** gyakran hosszú állás, meleg, ijedtség, vérvétel után. Ha valaki „előre szól” (elsötétül előtte minden, szédül), **ültesd vagy fektesd le**, mielőtt elesne. Ha elájult, de lélegzik: fektesd hanyatt, és ha nincs sérülése, a **lábát emeld meg**; általában egy percen belül magához tér. Ha nem tér magához, vagy megismétlődik: 112.'
        },
        {
          title: 'Cukorbeteg leesett vércukorral, asztmás roham',
          text: '**Hipoglikémia (alacsony vércukor):** inzulint vagy bizonyos tablettákat szedő cukorbetegeknél fordul elő, ha kihagyta az étkezést, sokat mozgott vagy túl sok gyógyszert kapott. Jelei: **remegés, verejtékezés, sápadtság**, éhségérzet, zavartság, furcsa, akár „részegnek tűnő” viselkedés.\n\n- Ha **ébren van és tud nyelni**: adj neki gyorsan felszívódó cukrot, az ERC ajánlása szerint **15–20 g szőlőcukrot** (szőlőcukortabletta), ennek híján cukros üdítőt, gyümölcslét.\n- Ha 10–15 perc alatt nem javul: ismételd, és hívd a 112-t.\n- Ha **eszméletlen**: ne tegyél semmit a szájába, stabil oldalfekvés és 112.\n\n**Asztmás roham:** a beteg nehezen, **sípolva** fúj ki, beszélni is alig tud. Ültesd fel (kissé előredőlve, kezeit támasztva), segíts neki használni a saját **gyorsan ható** (általában kék) **inhalátorát**, nyugtasd meg. Ha nem javul, vagy kékül az ajka: 112.',
          tip: 'Sok cukorbeteg és allergiás visel **orvosi azonosító karkötőt**, vagy a telefonja zárolt képernyőjén **„Vészhelyzeti adatok”** (Orvosi azonosító) érhetők el. Ezt a mentőknek is érdemes megmutatni.'
        }
      ],
      quiz: [
        { q: 'Mit jelent az „A” a FAST betűszóban?', options: ['Aszpirin', 'Arm, azaz kar: lesüllyed-e az egyik karja', 'Allergia', 'Ájulás'], answer: 1, explain: 'Face (arc), Arm (kar), Speech (beszéd), Time (idő): ha bármelyik tünet megvan, azonnal 112.' },
        { q: 'Mit NE tegyél epilepsziás nagyrohamnál?', options: ['Védd a fejét', 'Nézd, meddig tart', 'Tegyél valamit a szájába, nehogy elharapja a nyelvét', 'Roham után fektesd stabil oldalfekvésbe'], answer: 2, explain: 'A szájba tett tárgy fogtörést, sérülést okoz; a nyelvét a beteg nem tudja lenyelni.' },
        { q: 'Mikor kell biztosan mentőt hívni epilepsziás rohamnál?', options: ['Ha 5 percnél tovább tart', 'Soha', 'Csak ha a beteg kéri', 'Ha 20 másodpercig tart'], answer: 0, explain: 'Az 5 percnél hosszabb roham életveszélyes állapotba mehet át; az első roham, a sérülés vagy az ismétlődő rohamok is mentőhívást igényelnek.' },
        { q: 'Egy ébren lévő cukorbeteg remeg, verejtékezik, zavart. Mi segíthet?', options: ['Inzulin beadása', 'Gyorsan felszívódó cukor, pl. szőlőcukor vagy cukros üdítő', 'Egy pohár víz', 'Hagyni aludni'], answer: 1, explain: 'Valószínűleg leesett a vércukra; az ERC 15–20 g szőlőcukrot javasol, ha tud nyelni.' },
        { q: 'Miért ne adj aszpirint stroke-gyanús betegnek?', options: ['Mert túl drága', 'Mert vérzéses stroke-nál ronthat, és a nyelés is zavart lehet', 'Mert elaltatja', 'Nyugodtan adhatsz'], answer: 1, explain: 'A stroke lehet vérzéses is, ezt csak képalkotó vizsgálat dönti el; addig szájon át semmit.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'serulesek',
      title: 'Hétköznapi sérülések: ficam, törés, orrvérzés, fejsérülés, mérgezés',
      level: 2, minutes: 15,
      summary: 'Rándulás és törés ellátása, orrvérzés helyesen, mikor veszélyes egy fejsérülés, kullancs és darázscsípés, mérgezés és a Mérgezés SOS vonal, hőguta és kihűlés, áramütés.',
      tags: ['elsősegély', 'ficam', 'rándulás', 'törés', 'rögzítés', 'orrvérzés', 'fejsérülés', 'agyrázkódás', 'kullancs', 'darázscsípés', 'mérgezés', 'Mérgezés SOS', 'hőguta', 'napszúrás', 'kihűlés', 'áramütés'],
      sections: [
        {
          title: 'Rándulás, ficam, törés',
          text: 'Bokarándulás, lehorzsolt térd, eltört csukló: a leggyakoribb sérülések.\n\n**Rándulás, zúzódás** (duzzanat, fájdalom, de használható a végtag):\n- **pihentesd**, ne terheld,\n- **hűtsd**: jég vagy fagyasztott zöldség **ruhába csavarva**, kb. 20 percig (soha ne közvetlenül a bőrre),\n- polcold fel (a szív szintje fölé), ez csökkenti a duzzanatot.\n\n**Törés gyanúja** (erős fájdalom, deformitás, a végtag nem mozgatható, rendellenes mozgás, reccsenés):\n- **ne próbáld visszahúzni** a helyére,\n- **rögzítsd abban a helyzetben**, ahogy találtad (pl. a kart a test mellé, felkötve, a lábat párnákkal kitámasztva),\n- **nyílt törésnél** (csont látszik vagy seb van fölötte) a sebet fedd le tisztán, a vérzést csillapítsd, és **112**.\n\nHa nem vagy biztos benne, hogy csak rándulás: **röntgen** kell, azaz sürgősségi ellátás vagy traumatológia.'
        },
        {
          title: 'Orrvérzés és apró sebek',
          text: '**Orrvérzés:** a leggyakoribb hiba a fej hátrahajtása: ilyenkor a vér a torokba folyik, lenyeli, hányingert okoz, és nem látod, áll-e a vérzés.\n\n**Helyesen:**\n1. Ülj le, és **dőlj előre**.\n2. A hüvelyk- és mutatóujjaddal **szorítsd össze az orrod puha részét** (az orrcsont alatt).\n3. Tartsd **folyamatosan 10–15 percig**, közben szájon át lélegezz.\n4. Utána ne fújd ki az orrod órákig.\n\nHa **20–30 perc** után sem áll el, nagyon erős, fejsérülés után kezdődött, vagy vérhígítót szed: orvos.\n\n**Apró seb, horzsolás:** mosd ki **csapvízzel** (a szennyeződést öblítsd ki), fertőtlenítsd, és fedd sebtapasszal. Ha a seb **tátong**, mély, szennyezett (földdel, rozsdás tárggyal) vagy állat harapta: orvos, és ellenőrizni kell a **tetanusz**-védettséget.'
        },
        {
          title: 'Fejsérülés: mikor veszélyes?',
          text: 'Egy koppanás után általában elég a hűtés és a pihenés. **Azonnal orvos (112)**, ha:\n\n- akár rövid ideig is **elvesztette az eszméletét**,\n- **ismételten hány**, egyre **álmosabb**, nehezen ébreszthető,\n- **zavart**, nem emlékszik, mi történt, furcsán viselkedik,\n- **erősödő fejfájás**, látászavar, beszédzavar, görcs,\n- az orrából vagy füléből **vér vagy víztiszta folyadék** szivárog,\n- **vérhígítót** szed, vagy nagy energiájú baleset történt (autó, esés magasról).\n\nAz első 24 órában a sérült **ne maradjon egyedül**, és ne igyon alkoholt. Sportolóknál agyrázkódás gyanújakor a szabály: **aznap már nem játszhat tovább**.',
          warn: 'Ha nyaki gerincsérülés gyanúja van (esés magasból, autóbaleset, fejesugrás sekély vízbe), a sérültet **ne mozgasd**, ha nem muszáj; tartsd a fejét, és hívd a 112-t.'
        },
        {
          title: 'Mérgezés, csípés, kullancs',
          text: '**Mérgezés gyanúja** (gyerek lenyelt egy tablettát, tisztítószert, gombát):\n- **Ne hánytasd!** Maró anyag visszafelé is felmarja a nyelőcsövet.\n- Tedd el a **dobozt, flakont**, és nézd meg, mennyi hiányzik.\n- Ha **tünetei vannak** (eszméletzavar, nehézlégzés, görcs): **112**.\n- Ha nincs tünet, de nem tudod, veszélyes-e: hívd a **Mérgezés SOS** ingyenes, éjjel-nappal hívható vonalát: **06 80 20 11 99** (a népegészségügyi központ Egészségügyi Toxikológiai Tájékoztató Szolgálata működteti).\n\n**Darázs-, méhcsípés:** a méh fullánkját **kaparva** távolítsd el (ne csipesszel nyomd ki), hűtsd a helyét. Ha nehézlégzés, duzzadó nyelv, csalánkiütés jelentkezik: ez **anafilaxia**, lásd az [[#/lecke/haztartas/elsosegely|Elsősegély]] leckét. Szájba vagy torokba csípés esetén is azonnal 112.\n\n**Kullancs:** minél előbb távolítsd el: **csipesszel** a bőrhöz közel fogd meg, és **egyenletes húzással** emeld ki (ne csavard, ne kend be olajjal, krémmel). Fertőtlenítsd. Ha a következő hetekben a csípés körül **terjedő, gyűrű alakú bőrpír** vagy lázas, influenzaszerű tünet jelentkezik, menj orvoshoz (Lyme-kór, agyhártyagyulladás gyanúja).'
        },
        {
          title: 'Hőség, hideg, áram',
          text: '**Hőkimerülés, hőguta:** kánikulában, sport közben. Jelei: fejfájás, szédülés, hányinger, forró vagy éppen nyirkos bőr, zavartság. Vidd **árnyékba, hűvös helyre**, lazítsd meg a ruháját, **hűtsd** (vizes ruha, legyezés, hideg víz a bőrre), és ha ébren van, itass vele kortyonként vizet. **Zavartság, eszméletvesztés** esetén ez **hőguta**: 112, és hűtsd tovább.\n\n**Kihűlés:** vizes ruha, szél, alkohol gyorsítja. Vidd meleg helyre, a vizes ruhát cseréld szárazra, takard be (fejét is), adj **meleg, cukros, alkoholmentes** italt, ha tud nyelni. Erős kihűlésnél ne dörzsöld, ne tedd forró vízbe: 112.\n\n**Áramütés:** először **áramtalaníts** (húzd ki a dugót, kapcsold le a kismegszakítót), csak utána érj a sérülthöz! Áramütés után **mindig** orvosnak kell megvizsgálnia (szívritmuszavar órákkal később is jelentkezhet). Nagyfeszültségnél (felsővezeték, vasút) **ne menj közel**: 112.'
        }
      ],
      quiz: [
        { q: 'Hogyan helyezkedjen el az, akinek vérzik az orra?', options: ['Feküdjön hanyatt', 'Hajtsa hátra a fejét', 'Üljön le, dőljön előre, és szorítsa össze az orra puha részét', 'Álljon fejjel lefelé'], answer: 2, explain: 'Előredőlve a vér nem folyik a torokba; 10–15 perc folyamatos szorítás általában elállítja.' },
        { q: 'Mit tegyél, ha valaki maró tisztítószert nyelt le?', options: ['Hánytasd meg azonnal', 'Ne hánytasd; tedd el a flakont, hívd a 112-t vagy a Mérgezés SOS vonalat', 'Itass vele ecetet', 'Várd meg, hogy elmúljon'], answer: 1, explain: 'A hánytatás miatt a maró anyag még egyszer felmarja a nyelőcsövet.' },
        { q: 'Hogyan távolítsd el a kullancsot?', options: ['Csipesszel, a bőrhöz közel megfogva, egyenletes húzással', 'Kenj rá olajat, és várd meg, hogy kimásszon', 'Égesd le öngyújtóval', 'Hagyd benne, magától kiesik'], answer: 0, explain: 'Az olaj, krém, égetés miatt a kullancs több kórokozót ürít a sebbe; a gyors, egyenletes kihúzás a jó módszer.' },
        { q: 'Melyik jel után kell fejsérültet azonnal orvoshoz vinni?', options: ['Kis púp a homlokán', 'Ismételt hányás és egyre nagyobb álmosság', 'Kicsit fáj a fejbőre', 'Vicces kedvű lett'], answer: 1, explain: 'Az ismételt hányás, aluszékonyság koponyán belüli vérzés jele lehet.' },
        { q: 'Mit tegyél ELŐSZÖR, ha valakit áramütés ért egy konnektornál?', options: ['Rántsd el a kezénél fogva', 'Önts rá vizet', 'Áramtalaníts (dugó kihúzása, kismegszakító), és csak utána érj hozzá', 'Kezdd azonnal az újraélesztést, akár hozzáérve a vezetékhez'], answer: 2, explain: 'Amíg folyik az áram, a sérültön át téged is megrázhat.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'otthoni-veszhelyzet',
      title: 'Otthoni vészhelyzetek: tűz, gáz, szén-monoxid, csőtörés, áramszünet',
      level: 1, minutes: 13,
      summary: 'Hol vannak a főcsapok és elzárók, mit tegyél konyhai olajtűznél, szén-monoxid-riasztásnál, csőtörésnél, beázásnál és hosszabb áramszünetnél.',
      tags: ['vészhelyzet', 'tűz', 'olajtűz', 'tűzoltó készülék', 'füstérzékelő', 'szén-monoxid', 'CO-érzékelő', 'gázszag', 'csőtörés', 'főcsap', 'beázás', 'áramszünet', '112', 'vészhelyzeti csomag'],
      sections: [
        {
          title: 'Beköltözéskor: hol van a főcsap?',
          text: 'Vészhelyzetben nincs idő keresgélni. Egy új lakásban **az első napon** keresd meg és próbáld ki:\n\n- a **vízfőcsapot** (gyakran a vízóra mellett: aknában, a fürdőszoba vagy a WC falában, egy szervizajtó mögött) és a **mosdók, WC alatti sarokszelepeket**,\n- a **gázelzárót** (a gázóra mellett, illetve a gázkészülékek előtt; sárga karos csap: ha a kar **keresztben** áll a csővel, zárva van),\n- az **elosztószekrényt** (kismegszakítók, FI-relé) és a **főkapcsolót**.\n\nÍrd fel a telefonodba a **víz-, gáz- és áramszolgáltató hibabejelentő számát**, a közös képviselő és a tulajdonos számát.',
          tip: 'Az elosztószekrényről és a kismegszakítóról: [[#/lecke/haztartas/javitasok|Apró javítások]]. A 3D-s modell: [[elosztoszekreny|Lakás elosztószekrénye]].'
        },
        {
          title: 'Tűz: konyhai olajtűz és menekülés',
          text: '**Ha ég a serpenyőben az olaj:**\n1. **SOHA ne önts rá vizet!** A víz azonnal gőzzé válik, és a forró olajat lángoló felhőként szétrobbantja.\n2. Kapcsold le a főzőlapot.\n3. **Fojtsd el**: tegyél rá **fedőt** vagy nagy tepsit (vagy tűzoltó takarót), és hagyd rajta, amíg teljesen kihűl.\n\n**Ha a tűz nem oltható gyorsan** (ég a függöny, a bútor):\n- mindenkit **ki a lakásból**, az **ajtót csukd be** magad mögött (ez lassítja a tűz és a füst terjedését),\n- **lifttel ne menj**, a lépcsőházban füst esetén guggolva, a fal mellett haladj,\n- kint hívd a **112-t**.\n\nHa a lépcsőház tele van füsttel, **maradj a lakásban**: az ajtó réseit tömd be vizes törölközővel, menj az ablakhoz, és jelezz.\n\nOtthonra jó befektetés egy **füstérzékelő** (néhány ezer forint) és egy **tűzoltó takaró** vagy kis tűzoltó készülék a konyhában.',
          warn: 'A füst a lakástüzek legnagyobb gyilkosa: alvás közben az ember nem ébred fel a szagára. A füstérzékelő hangja viszont felébreszt.'
        },
        {
          title: 'Gázszag és szén-monoxid',
          text: '**Gázszag** (záptojás- vagy fokhagymaszerű szag; a földgáz szagtalan, ezért szagosítják): ne kapcsolj villanyt, ne csengess, ne gyújts tüzet, nyiss ablakot, zárd el a gázt, hagyd el a lakást, és **kint** telefonálj (gázszolgáltató hibabejelentő vagy 112). Részletesen: [[#/lecke/haztartas/javitasok|Apró javítások]].\n\n**Szén-monoxid (CO):** rossz égés (eltömődött kémény, hibás gázkészülék, rossz szellőzés) terméke. **Színtelen, szagtalan**, ezért csak **CO-érzékelő** jelzi. Tünetei megtévesztők: **fejfájás, szédülés, hányinger, álmosság**, mintha influenza lenne, és **többen egyszerre** rosszul lesznek a lakásban.\n\n**Ha jelez a CO-érzékelő, vagy gyanú van:**\n1. **Nyiss ki minden ablakot**, kapcsold ki a gázkészüléket, ha könnyen elérhető.\n2. **Mindenki ki a friss levegőre**, a rosszul lévőket is.\n3. Hívd a **112-t** (tünetek esetén mindenképp).\n4. A készüléket csak **szakember** ellenőrzése után használd újra.',
          tip: 'A CO-érzékelőt (és a füstérzékelőt) havonta próbáld ki a teszt gombbal, és cseréld a gyártó által megadott élettartam végén.'
        },
        {
          title: 'Csőtörés, beázás, áramszünet',
          text: '**Csőtörés, ömlik a víz:**\n1. **Zárd el a vizet**: először a legközelebbi sarokszelepet, ha az nem elég, a **főcsapot**.\n2. Ha a víz elektromos készülékek, konnektorok közelébe ér, **kapcsold le az áramot** az elosztószekrényben (ha a szekrény száraz helyen van, és nem kell vízben állnod).\n3. Fotózd le a kárt, szólj a **szomszédnak** (alsó lakás!), a tulajdonosnak vagy közös képviselőnek, és jelentsd be a **lakásbiztosítónak**.\n4. Ha felülről ázik be a lakásod: csengess fel, és ha nem nyitnak ajtót, hívd a közös képviselőt, végső esetben a 112-t.\n\n**Hosszabb áramszünet:** nézd meg, csak nálad van-e (lépcsőház, szomszéd); ha csak nálad, nézd az elosztószekrényt. Ha az egész környéken: jelentsd be az áramszolgáltató hibabejelentőjén. A **hűtőt, fagyasztót ne nyitogasd**: egy teli fagyasztó csukva kb. egy napig hidegen tart. Gyertya helyett **elemlámpát** használj.\n\nÉrdemes otthon tartani egy kis **vészhelyzeti csomagot**: elemlámpa, tartalék elem, töltött powerbank, néhány liter ivóvíz, tartós élelmiszer, alap elsősegélydoboz, fontos gyógyszerek.'
        }
      ],
      quiz: [
        { q: 'Mit tegyél, ha meggyullad az olaj a serpenyőben?', options: ['Önts rá egy pohár vizet', 'Kapcsold le a főzőlapot, és fojtsd el fedővel vagy tűzoltó takaróval', 'Vidd ki a serpenyőt az erkélyre', 'Fújd el'], answer: 1, explain: 'A víz az égő olajjal érintkezve robbanásszerűen szétfröccsen; az oxigén elzárása eloltja a tüzet.' },
        { q: 'Mi a szén-monoxid-mérgezés egyik jellegzetessége?', options: ['Erős, szúrós szaga van', 'Kék színű füstöt látni', 'Többen egyszerre lesznek rosszul fejfájással, szédüléssel, hányingerrel', 'Csak nyáron fordul elő'], answer: 2, explain: 'A CO színtelen, szagtalan; a tünetek influenzára emlékeztetnek, és mindenkit érintenek, aki a helyiségben van.' },
        { q: 'Ég a lakásod, és sikerült kijutnod. Mit csinálj az ajtóval?', options: ['Hagyd tárva-nyitva, hogy kimenjen a füst', 'Csukd be magad mögött', 'Vedd le a zsanérjáról', 'Mindegy'], answer: 1, explain: 'A becsukott ajtó lassítja a tűz és a füst terjedését a lépcsőházba és a többi lakásba.' },
        { q: 'Ömlik a víz a mosogató alól. Mi az első lépés?', options: ['Elzárni a vizet a sarokszelepnél vagy a főcsapnál', 'Felhívni a biztosítót', 'Lefotózni a kárt', 'Feltörölni a vizet'], answer: 0, explain: 'Először a további kárt kell megállítani: elzárás, utána jöhet a dokumentálás és a bejelentés.' },
        { q: 'Hogyan áll a sárga karos gázcsap karja, ha ZÁRVA van?', options: ['Párhuzamosan a csővel', 'Keresztben, merőlegesen a csőre', 'Lefelé lóg', 'Nincs különbség'], answer: 1, explain: 'A golyóscsapoknál a kar a nyitott állásban a cső irányába mutat, zárva keresztben áll.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'csap-wc',
      title: 'Csöpögő csap, folyó WC, szilikonozás',
      level: 2, minutes: 14,
      summary: 'A legtöbb vízzel kapcsolatos apró hiba szerszámmal és 30 perccel megoldható: perlátor vízkőtelenítése, csaptelep-betét cseréje, folyó WC-tartály beállítása, penészes szilikon cseréje.',
      tags: ['javítás', 'csap', 'csöpög', 'perlátor', 'vízkő', 'kerámiabetét', 'csaptelep', 'WC-tartály', 'öblítő', 'úszó', 'töltőszelep', 'szilikon', 'penész', 'fuga', 'sarokszelep'],
      sections: [
        {
          title: 'Mielőtt hozzányúlsz: zárd el!',
          text: 'Minden vízszerelési munka előtt:\n\n1. **Zárd el a vizet** a sarokszelepnél (a mosdó, mosogató vagy WC alatt / mögött), ha az nem zár rendesen, a **főcsapnál**.\n2. **Nyisd ki a csapot**, hogy a csőben maradt nyomás kiengedjen.\n3. **Dugd be a lefolyót** (vagy tegyél rá rongyot), hogy egy apró csavar se essen bele.\n4. **Fotózz** minden lépésnél: így tudod, mi hogyan volt összerakva.\n\nAlbérletben a nagyobb javításokat (csaptelep cseréje, WC-tartály cseréje) a tulajdonos dolga: előbb szólj neki. A kis karbantartás (perlátor tisztítása, szilikon cseréje) általában a bérlőre tartozik, de ezt is érdemes egyeztetni.',
          tip: 'Ha a **sarokszelep** régi, és nem mered elzárni, mert fél, hogy beletörik, ez önmagában jelzés: cseréltesd ki szakemberrel. A vízhálózat felépítéséről: [[#/lecke/vizszereles/viz-a-hazban|Víz a házban]].'
        },
        {
          title: 'Gyenge vízsugár, fröcsköl: a perlátor',
          text: 'A csap kifolyóján lévő kis szita a **perlátor** (levegőztető). Kemény vizű területen gyorsan **vízkövesedik**, ilyenkor gyenge, ferde vagy fröcskölő a sugár.\n\n1. Csavard le kézzel (vagy ronggyal körbetekert fogóval, hogy ne karcold meg).\n2. Szedd szét, és áztasd **ecetes vízbe** vagy citromsavas oldatba néhány órára.\n3. Öblítsd ki, kefével tisztítsd meg, és csavard vissza.\n\nHa a perlátor tönkrement, pár száz forintért kapható új; vidd magaddal a régit a boltba, hogy ugyanolyan méretűt vegyél.'
        },
        {
          title: 'Csöpög a csap: betét vagy tömítés',
          text: 'A csöpögő csap **ezer litereket** pazarolhat el egy év alatt. Az ok csaptípusonként más:\n\n- **Egykaros keverőcsap** (felfelé nyitod, oldalra keversz): a belsejében egy **kerámia keverőbetét** (kartus) van. Ha a csap zárt állásban csöpög, vagy nehezen jár, a betétet kell cserélni.\n- **Kétfogantyús (régi típusú) csap**: hagyományos **gumitömítéses** szelepfelsőrész vagy **kerámia felsőrész** van benne; a gumitömítés kicserélhető.\n\n**Betétcsere menete (egykaros csap):**\n1. Vizet elzárni, csapot kinyitni.\n2. A kar díszkupakját (piros-kék jelzés) lepattintani, alatta a csavart kicsavarni, a kart levenni.\n3. A rögzítőanyát (gyűrűt) **villáskulccsal** lecsavarni, a betétet kiemelni.\n4. A **régi betétet vidd a boltba**: méret (pl. 35 vagy 40 mm) és forma szerint kell ugyanolyat venni.\n5. Visszafelé összerakni, a vizet lassan visszaengedni, és ellenőrizni.',
          warn: 'Ha a víz nem a kifolyóból, hanem a **csaptelep alól** vagy a **falból** szivárog, az már nem betétcsere: zárd el a vizet, és hívj vízszerelőt.'
        },
        {
          title: 'Folyik a víz a WC-csészébe',
          text: 'Ha a tartályból folyamatosan szivárog a víz a csészébe (hallod a sziszegést, vagy vékony csík csorog), az havi több köbméter víz is lehet.\n\n**Teszt:** csöppents ételfestéket a tartályba, és ne húzd le. Ha 15–20 perc múlva a csészében is színes a víz, az **öblítőszelep** (lefolyószelep) **tömítése** ereszt.\n\n**Gyakori okok és megoldások** (a fedél leemelése után):\n- **Túl magasan áll a víz**, és a túlfolyón át folyik el: a **töltőszelep úszóját** kell lejjebb állítani (csavar vagy állítóklip).\n- **Vízkő vagy szennyeződés** az öblítőszelep gumitömítésén: zárd el a vizet, húzd le, a tömítést tisztítsd meg ecettel.\n- **Elöregedett, megkeményedett tömítés** vagy töltőszelep: alkatrészcsere (a típust a tartály belsejében találod; a falba épített tartályoknál a nyomólap levétele után érhető el a szerkezet).\n\nA modern tartályoknak gyakran **két gombjuk** van (kis és nagy öblítés): a kis öblítéssel sok vizet takarítasz meg.'
        },
        {
          title: 'Penészes szilikon cseréje',
          text: 'A kád, zuhanytálca és a mosdó körüli **szilikon** idővel bepenészedik vagy elválik, és a víz beszivárog mögé. A penészes szilikont **nem lehet** igazán kitisztítani: cserélni kell.\n\n1. **Vágd ki** a régi szilikont szilikonkaparóval vagy pengével, a maradékot dörzsöld le, a felületet **zsírtalanítsd** (spiritusz), és hagyd **teljesen kiszáradni**.\n2. Ragassz **festőszalagot** a fuga két oldalára egyenes vonalban.\n3. Használj **egészségügyi (szaniter), penészgátló** szilikont. A kinyomópisztoly csőrét ferdén vágd le, és egyenletes tempóban húzd végig.\n4. Mosogatószeres vízzel benedvesített ujjal vagy simítóval simítsd el, és **azonnal** húzd le a szalagot.\n5. Hagyd kikeményedni (a csomagoláson lévő ideig, általában **24 óra**), addig ne zuhanyozz.\n\nTipp: kádnál **töltsd meg vízzel** a kádat szilikonozás előtt; így a kád „leül”, és a fuga később nem szakad el.'
        }
      ],
      quiz: [
        { q: 'Mi az első lépés minden csapjavítás előtt?', options: ['A csap leszerelése', 'A víz elzárása a sarokszelepnél vagy főcsapnál', 'Új csap vásárlása', 'A lefolyó kipumpálása'], answer: 1, explain: 'Elzárt víz nélkül a csap szétszedésekor a nyomás alatti víz kiömlik.' },
        { q: 'Gyenge, fröcskölő a csap sugara. Mi a legvalószínűbb ok?', options: ['Vízkövesedett a perlátor', 'Tönkrement a WC-tartály', 'Túl nagy a víznyomás', 'Elromlott a vízóra'], answer: 0, explain: 'A perlátor szitája kemény víznél gyorsan eltömődik; ecetes áztatás segít.' },
        { q: 'Hogyan teszteled, hogy ereszt-e a WC-tartály öblítőszelepe?', options: ['Megszagolod', 'Ételfestéket cseppentesz a tartályba, és megnézed, színes lesz-e a csésze víz lehúzás nélkül', 'Felhívod a vízművet', 'Lehúzod tízszer'], answer: 1, explain: 'Ha a festék lehúzás nélkül megjelenik a csészében, a víz a szelep mellett szivárog.' },
        { q: 'Miért érdemes megvinni a régi csapbetétet a boltba?', options: ['Mert csere nélkül nem adnak újat', 'Mert méret és forma szerint pontosan ugyanolyat kell venni', 'Mert visszaváltják', 'Felesleges'], answer: 1, explain: 'A kerámiabetétek mérete (pl. 35 vagy 40 mm) és kialakítása eltér; csak a pontosan illeszkedő jó.' },
        { q: 'Mit tegyél a penészes szilikonfugával?', options: ['Fesd le fehérre', 'Kend át új szilikonnal a régire', 'Vágd ki, tisztítsd, szárítsd, és húzz új, penészgátló szilikont', 'Hagyd, nem okoz gondot'], answer: 2, explain: 'A régi, penészes szilikonra nem tapad jól az új; a penész alatta tovább terjed.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'furas-polc',
      title: 'Fúrás, tipli, polcfelrakás, bútorszerelés',
      level: 2, minutes: 14,
      summary: 'Milyen a fal (tégla, beton, gipszkarton, Ytong), melyik tiplit és fúrószárat válaszd, hogyan rakj fel vízszintes polcot vagy tévéállványt, és hogyan szerelj össze egy lapra szerelt bútort.',
      tags: ['fúrás', 'fúrószár', 'tipli', 'dübel', 'gipszkarton', 'beton', 'tégla', 'Ytong', 'pórusbeton', 'polc', 'vízmérték', 'konzol', 'bútorszerelés', 'billenésgátló', 'ütvefúró'],
      sections: [
        {
          title: 'Először a falat ismerd meg',
          text: 'A rejtett vezetékekről és a vezetékkeresőről az [[#/lecke/haztartas/javitasok|Apró javítások]] lecke szól: ezt mindig nézd meg fúrás előtt. A második kérdés: **miből van a fal?**\n\n- **Gipszkarton**: kopogtatva **kongó** hangú, a gombostű könnyen belemegy. Mögötte üreg van.\n- **Tömör tégla** vagy **beton**: kemény, a fúráskor vörös (tégla) vagy szürke, nehezen haladó (beton) por jön.\n- **Üreges tégla** (pl. modern falazóblokk): fúrás közben hirtelen „beesik” a fúró egy-egy üregbe.\n- **Pórusbeton** (Ytong): fehér, puha, könnyen fúrható, de a tipli nehezen tart benne.\n\nA fal anyaga határozza meg, milyen **fúrószár** és **tipli** kell. Panelházban a fal jellemzően **vasbeton**: ahhoz ütvefúró vagy fúrókalapács és **SDS** szár kell, és ha vasba ütközöl, **odébb** fúrj.'
        },
        {
          title: 'Melyik tipli, melyik csavar?',
          text: '- **Univerzális műanyag tipli**: tömör falba (tégla, beton). A tipli átmérője = a fúró átmérője (pl. 6 mm-es tiplihez 6 mm-es fúró), a lyuk legyen pár milliméterrel **mélyebb** a tiplinél.\n- **Üreges falba** (üreges tégla, gipszkarton): olyan tipli kell, amely a fal mögött **szétnyílik** vagy **összecsomósodik** (pl. billenődübel, üregesfal-dübel, „pillangó”).\n- **Gipszkarton**: könnyű dolgokhoz (kép, kis polc) gipszkartontipli; nehéz dologhoz (konyhaszekrény, tévé) a **tartóvázba** (fém profilba vagy fa lécbe) kell csavarozni, vagy a tervezésnél beépített merevítésbe.\n- **Pórusbeton**: kifejezetten pórusbetonhoz gyártott, nagy menetű tipli.\n\nA **csavar** átmérője illeszkedjen a tiplihez (a csomagoláson rajta van), és legyen olyan hosszú, hogy **a tipli teljes hosszán** végigmenjen, plusz a felszerelt tárgy vastagsága.\n\n**Teherbírás:** a csomagoláson lévő érték ideális falra vonatkozik. Nehéz tárgyhoz (könyvespolc, tévé, faliszekrény) használj **több** rögzítési pontot, és ha bizonytalan vagy, kérdezz szakembert.'
        },
        {
          title: 'Vízszintes polc lépésről lépésre',
          text: '1. Tartsd a polcot (vagy a konzolt) a helyére, tegyél rá **vízmértéket**, és **ceruzával** jelöld a furatokat. Két konzolnál a konzolok közti távolságot is mérd le.\n2. Ellenőrizd a vezetékkeresővel, és nézd meg, nincs-e a közelben konnektor, kapcsoló.\n3. A furat helyére ragassz egy darab **festőszalagot**: kevésbé pereg a vakolat, és jobban látod a jelet.\n4. Fúrj **merőlegesen** a falra, kis sebességgel indítva. Betonba, téglába **ütvefúrással**, csempébe ütés nélkül, csempefúróval.\n5. Porszívózd ki a lyukat, tedd be a tiplit (koppintsd be a fal síkjáig), és csavarozd fel a konzolt.\n6. Mielőtt rápakolsz, **húzd meg** óvatosan: nem mozog?\n\nTipp: fúrás alá tarts egy félbehajtott **papírlapot** vagy egy **öntapadós cetlit** „zsebnek”, ami felfogja a port.',
          warn: 'Fúrás közben viselj **védőszemüveget**, a hosszú hajat kösd össze, kesztyűt **ne** viselj forgó fúróval (beakadhat). Albérletben előbb kérdezd meg a tulajdonost: a bérleti szerződés megtilthatja a fúrást, kiköltözéskor pedig a lyukakat be kell glettelni.'
        },
        {
          title: 'Lapra szerelt bútor és billenésgátló',
          text: 'A lapra szerelt bútor összeszerelése türelemjáték:\n\n1. **Bontsd ki** egy nagy, puha felületen (a kartonon), és **számold meg** az alkatrészeket és csavarokat az útmutató alapján, mielőtt bármit elkezdesz.\n2. A csavarokat először csak **lazán** tedd be, és ha minden a helyén van, akkor húzd meg (különben nem illeszkednek a furatok).\n3. A forgácslapba csavart csavart **ne húzd túl**: kiszakad a menete.\n4. A hátlapot (vékony farostlemezt) szögeld vagy csavarozd fel: ez **merevíti** a szekrényt, enélkül billeg.\n\n**Billenésgátló:** a magas, keskeny bútorokhoz (könyvespolc, komód, gardrób) mellékelt **falhoz rögzítő** elemet mindig szereld fel. Egy kihúzott fiókra felmászó kisgyerek alatt a bútor **feldőlhet**, és ez évente súlyos baleseteket okoz.'
        }
      ],
      quiz: [
        { q: 'Kopogtatásra kongó hangú a fal, és egy gombostű könnyen belemegy. Valószínűleg milyen?', options: ['Vasbeton', 'Tömör tégla', 'Gipszkarton', 'Kő'], answer: 2, explain: 'A gipszkarton mögött üreg van, ezért kong, és puha a felülete.' },
        { q: 'Hogyan válassz fúrót egy 6 mm-es univerzális tiplihez?', options: ['4 mm-es fúró', '6 mm-es fúró', '10 mm-es fúró', 'Mindegy'], answer: 1, explain: 'A tipli átmérője és a fúró átmérője megegyezik; a lyuk legyen kicsit mélyebb a tiplinél.' },
        { q: 'Nehéz konyhaszekrényt akarsz gipszkarton falra tenni. Mi a helyes megoldás?', options: ['Egy kis gipszkartontipli elég', 'Ragasztó', 'A tartóvázba (profilba, lécbe) vagy beépített merevítésbe kell rögzíteni', 'Szögekkel'], answer: 2, explain: 'A gipszkarton lap önmagában nem bír el nehéz terhet; a vázszerkezet viszont igen.' },
        { q: 'Miért kell a magas könyvespolcot a falhoz rögzíteni?', options: ['Hogy ne kopjon a padló', 'Hogy ne dőljön fel, például ha egy gyerek felmászik rá', 'Mert így szebb', 'Mert kötelező a lakásbiztosításhoz'], answer: 1, explain: 'A billenésgátló megakadályozza, hogy a bútor előredőljön, ha a kihúzott fiókokat vagy a polcokat terhelik.' },
        { q: 'Miért viselj védőszemüveget fúráskor?', options: ['Mert így pontosabb', 'Mert a por és a lepattanó darabok szemsérülést okozhatnak', 'Mert a fúró világít', 'Felesleges'], answer: 1, explain: 'A fúróból kirepülő törmelék és por a szembe juthat.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'festes',
      title: 'Falfestés és glettelés lépésről lépésre',
      level: 2, minutes: 13,
      summary: 'Mennyi festék kell, hogyan takarj, javíts ki lyukakat, mikor kell alapozó, hogyan fess sávmentesen, és mit kezdj a penészes fallal.',
      tags: ['festés', 'falfestés', 'glett', 'glettelés', 'alapozó', 'mélyalapozó', 'diszperziós festék', 'henger', 'ecset', 'festőszalag', 'takarás', 'penész', 'kiadósság', 'beltéri festék'],
      sections: [
        {
          title: 'Tervezés: mennyi festék kell?',
          text: 'A festék dobozán szerepel a **kiadósság**, például `8–10 m²/liter/réteg`.\n\n**Számolt példa:** egy 4 × 3 m-es szoba, 2,6 m belmagasság.\n- Falfelület: kerület × magasság = `(4 + 3) × 2 × 2,6 = 36,4 m²`\n- Le kell vonni az ajtót és az ablakot, kb. `2 + 2 = 4 m²` → kb. **32 m²**\n- Plafon: `4 × 3 = 12 m²`\n- Összesen kb. **44 m²**, és **két réteg** kell → 88 m².\n- 9 m²/l kiadóssággal: `88 / 9 ≈ 10 liter` festék.\n\nVegyél egy kevés tartalékot, és **egy gyártási tételből** (azonos színkód, azonos keverés), mert a különböző tételek árnyalata eltérhet.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Számolás a festéshez', help: 'A festékvásárlásnál is számolni kell: ha a festék 10%-kal kevesebbre elég a vártnál, mennyi kell még? Gyakorold a százalékszámítást!' } }
        },
        {
          title: 'Előkészítés: a munka fele',
          text: 'A szép festés az **előkészítésen** múlik:\n\n1. **Pakold ki** vagy tolj középre a bútorokat, és takard le fóliával. A padlót **takarópapírral** vagy fóliával védd (a fólia csúszik, a papír biztonságosabb).\n2. **Áramtalanítsd** a konnektorokat, kapcsolókat (kismegszakító), és vedd le a fedőlapjaikat, vagy takard le őket.\n3. Ragassz **festőszalagot** a szegélyekre, ajtókeretre, ablakkeretre.\n4. A falat **portalanítsd**, a zsíros foltokat (konyha) mosd le.\n5. A **lyukakat, repedéseket glettel** töltsd ki: a glettet spaklival hordd fel, húzd le simára, száradás után **csiszold** le finom csiszolópapírral, és portalanítsd.\n6. Ha a fal **porlik** (ujjal végighúzva poros lesz) vagy erősen szív (friss glett, új vakolat), **mélyalapozó** kell, különben a festék nem tapad, és foltos lesz.'
        },
        {
          title: 'Festés sávmentesen',
          text: '- Először a **plafont** fesd, utána a falakat (ami lecsöppen, azt a falfestés eltakarja).\n- A **sarkokat, szegélyeket** ecsettel vagy kis hengerrel húzd elő, utána jöhet a nagy henger.\n- A hengert a **tálca rácsán** töltsd fel egyenletesen (ne csöpögjön).\n- **W vagy M alakban** hordd fel a festéket egy kb. 1 m²-es mezőben, majd **egy irányban** (függőlegesen) simítsd el, átfedéssel.\n- Dolgozz **„nedves a nedvesbe”**: egy falat egyszerre, megszakítás nélkül fess végig, különben a megszáradt és a friss rész határa látszik.\n- A második réteg csak a **száradási idő** után jöhet (a dobozon; általában néhány óra).\n- A festőszalagot akkor húzd le, amikor a festék még **kissé nedves**, így nem tépi fel a szélét.\n\nAz ecsetet, hengert vizes bázisú (diszperziós) festéknél **vízzel** mosd ki, de ne a lefolyóba öntsd a festékes vizet nagy mennyiségben: a festékmaradék **veszélyes hulladék**, a hulladékudvar átveszi.'
        },
        {
          title: 'Penész a falon: nem elég átfesteni',
          text: 'A fekete, foltos penész a **sarkokban, ablak körül, bútorok mögött** a magas páratartalom és a **hideg felületen lecsapódó** pára következménye. Ha csak átfested, néhány hét múlva visszajön.\n\n**Teendők:**\n1. **Okot keress**: kevés szellőztetés, ruhaszárítás a szobában, bútor a hideg külső falhoz tolva, beázás, hőhíd.\n2. A penészt **penészölő szerrel** kezeld a használati utasítás szerint (kesztyű, szemüveg, maszk, szellőztetés), majd hagyd kiszáradni.\n3. Fess **penészgátló** festékkel.\n4. Utána **rendszeresen szellőztess** (napi többször 5–10 perc, tárt ablakkal), a bútort tedd 5–10 cm-re a faltól.\n\nAlbérletben a penészt **jelezd írásban** a tulajdonosnak: ha az ok szerkezeti (beázás, hőhíd), az az ő felelőssége.',
          tip: 'A szellőztetésről és a fűtésről: [[#/lecke/haztartas/energiatakarekossag|Energia- és víztakarékosság]].'
        }
      ],
      quiz: [
        { q: 'Egy szoba falfelülete 40 m², két réteget festesz, a festék kiadóssága 10 m²/l. Mennyi festék kell?', options: ['4 liter', '8 liter', '20 liter', '40 liter'], answer: 1, explain: '40 m² × 2 réteg = 80 m²; 80 / 10 = 8 liter.' },
        { q: 'Mit fess először?', options: ['A falakat', 'A plafont', 'Az ajtókat', 'Mindegy'], answer: 1, explain: 'A plafonról lecsöppenő festéket a később festett fal eltakarja.' },
        { q: 'Mikor kell mélyalapozó?', options: ['Mindig, kétszer', 'Ha a fal porlik vagy erősen szív (friss glett, új vakolat)', 'Soha', 'Csak a plafonra'], answer: 1, explain: 'Az alapozó megköti a port és egyenletessé teszi a szívóképességet, így a festék tapad és nem lesz foltos.' },
        { q: 'Miért ne fesd egyszerűen át a penészes falat?', options: ['Mert a festék nem tapad a fekete színre', 'Mert az ok (pára, beázás) megmarad, és a penész visszajön', 'Mert drága', 'Nyugodtan átfestheted'], answer: 1, explain: 'A penészt kezelni kell, és meg kell szüntetni a páralecsapódás okát.' },
        { q: 'Miért vegyél egy gyártási tételből minden festéket?', options: ['Mert olcsóbb', 'Mert a különböző tételek árnyalata eltérhet', 'Mert kötelező', 'Mert különben nem keverhető'], answer: 1, explain: 'A színkeverés tételenként kicsit eltérhet; egy falon ez látszó határt okozhat.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'ruhaapolas',
      title: 'Ruhaápolás: varrás, vasalás, szárítás, tárolás',
      level: 1, minutes: 12,
      summary: 'Gomb felvarrása, egyszerű öltések, felhajtás gyorsan, a vasaló pöttyei, gőzölés, szárítás összemenés nélkül, tárolás és moly elleni védelem, cipőápolás.',
      tags: ['varrás', 'gomb', 'öltés', 'tű', 'cérna', 'felhajtás', 'vasalás', 'vasaló', 'gőzölés', 'szárítás', 'összemegy', 'moly', 'tárolás', 'cipőápolás', 'ruha', 'mosási címke'],
      sections: [
        {
          title: 'Gomb felvarrása 5 perc alatt',
          text: 'Egy **varrókészlet** (tűk, néhány színű cérna, gombok, biztosítótű, kis olló) a legolcsóbb „túlélőcsomag”.\n\n1. Fűzz be kb. **50 cm cérnát**, a két végét húzd egyformára, és kösd össze (dupla szál, csomóval a végén).\n2. A gomb helyét a régi lyukak vagy a gomblyuk alapján jelöld. Kezdd a **szövet belső oldaláról**, így a csomó nem látszik.\n3. Varrd fel a gombot a lyukakon át **5–6-szor**. Közben tegyél a gomb és a szövet közé egy **gyufaszálat** vagy fogpiszkálót: így marad egy kis „nyak”, és a gomb kényelmesen begombolható lesz.\n4. Vedd ki a gyufaszálat, a cérnát **tekerd körbe** néhányszor a gomb alatt (ez a nyak), majd vidd át a belső oldalra, és ott **2–3 kis öltéssel** csomózd el.\n\nA legtöbb ingen van egy **tartalékgomb** (a belső címke mellett vagy az alsó gomblyuk közelében).'
        },
        {
          title: 'Öltések és gyors javítások',
          text: '- **Előöltés**: egyszerű, ki-be öltés; ideiglenes rögzítéshez.\n- **Visszaöltés** (gépi öltéshez hasonló, erős): egy öltés előre, fél öltés vissza; szétnyílt varrás javítására.\n- **Vakfelhajtás** (szoknya, nadrág alja): kívülről alig látszik, csak egy-egy szálat fogsz meg a külső anyagból.\n\n**Gyors megoldások:**\n- **Vasalható felhajtószalag**: a nadrág alját varrás nélkül, vasalással lehet felhajtani.\n- **Vasalható folt** a kiszakadt térdre (belülről).\n- Elakadt cipzár: a fogakat dörzsöld be **grafitceruzával** vagy szappannal.\n- Kifutott szál a pulóveren: **ne vágd el** közvetlenül, húzd át egy horgolótűvel a belső oldalra.'
        },
        {
          title: 'Vasalás és gőzölés',
          text: 'A mosási címke vasaló jele mutatja a megengedett hőfokot (az ISO 3758 szabvány szerint):\n\n- **1 pötty**: alacsony, kb. **110 °C** (szintetikus anyagok: poliészter, akril, nejlon), általában gőz nélkül,\n- **2 pötty**: közepes, kb. **150 °C** (gyapjú, selyem, kevertszálas),\n- **3 pötty**: magas, kb. **200 °C** (pamut, len),\n- **áthúzott vasaló**: nem vasalható.\n\n**Tippek:**\n- Kezdd a **legalacsonyabb** hőfokot igénylő ruhákkal, és haladj felfelé (a vasaló gyorsabban melegszik, mint hűl).\n- Sötét és kényes anyagot a **visszájáról** vagy egy vékony pamutkendőn keresztül vasalj, különben fényes lesz.\n- Az ingnél a sorrend: **gallér, kézelő, ujjak, hát, elejek**.\n- **Gőzölő** (álló vagy kézi) sok ruhán gyorsabb, és a kényes anyagokat is kíméli; a szekrényben gyűrött ruhát a fürdőszobában, zuhanyzás utáni gőzben is kisimíthatod.'
        },
        {
          title: 'Szárítás és tárolás',
          text: '**Szárítás:**\n- A **kötött** holmit (pulóver) **fektetve**, törölközőn szárítsd: vállfán vagy csipeszen megnyúlik.\n- A pamut és a gyapjú **szárítógépben összemehet**; nézd meg a címkét (négyzet benne körrel = gépi szárítás; áthúzva = tilos).\n- Az ingeket, blúzokat **vállfán** szárítsd, és már nedvesen húzd ki őket: kevesebb lesz a vasalás.\n- Lakásban szárítva **szellőztess**, különben a pára penészedést okozhat.\n\n**Tárolás:**\n- Csak **tiszta** ruhát tegyél el (a moly a szennyeződésre, izzadságra megy).\n- A **gyapjú**, kasmír ruhákat szezon végén zárt dobozban vagy zsákban tárold; moly ellen **cédrusfa** vagy levendula segít, és rendszeresen nézd át őket.\n- A kötött pulóvert **hajtva** tárold, ne vállfán.\n\n**Cipő:** bőrcipőt rendszeresen **krémezz** és impregnálj, a nedves cipőt **újságpapírral** kitömve, szobahőn szárítsd (radiátoron megreped a bőr).',
          tip: 'A mosási címkék jeleiről és a folttisztításról: [[#/lecke/haztartas/mosas-takaritas|Mosás, takarítás és tisztítószerek]].'
        }
      ],
      quiz: [
        { q: 'Miért teszünk gyufaszálat a gomb alá felvarráskor?', options: ['Díszítésnek', 'Hogy legyen egy kis „nyak”, és a gomb kényelmesen begombolható legyen', 'Hogy ne szúrjuk meg az ujjunkat', 'Hogy erősebb legyen a cérna'], answer: 1, explain: 'A gomb és a szövet közti kis távolság helyet ad a gomblyuk anyagának.' },
        { q: 'Mit jelent a vasaló jelben a 3 pötty?', options: ['Nem vasalható', 'Alacsony hőfok, kb. 110 °C', 'Magas hőfok, kb. 200 °C (pl. pamut, len)', 'Csak gőzzel'], answer: 2, explain: '1 pötty kb. 110 °C, 2 pötty kb. 150 °C, 3 pötty kb. 200 °C.' },
        { q: 'Hogyan szárítsd a kötött pulóvert?', options: ['Vállfán', 'Csipesszel a szárítókötélen', 'Fektetve, törölközőn', 'Radiátoron'], answer: 2, explain: 'Fektetve nem nyúlik meg a saját súlya alatt.' },
        { q: 'Milyen sorrendben vasalj, ha több ruhád van?', options: ['A legmagasabb hőfokúakkal kezdd', 'A legalacsonyabb hőfokot igénylő ruhákkal kezdd', 'Mindegy', 'Szín szerint'], answer: 1, explain: 'A vasaló gyorsabban melegszik, mint hűl; így nem kell várnod, és nem égeted meg a kényes anyagot.' },
        { q: 'Mi segít a moly ellen?', options: ['Ha piszkosan teszed el a ruhát', 'Tiszta ruha zárt tárolása, cédrusfa vagy levendula, rendszeres átnézés', 'Ha a szekrény ajtaja mindig nyitva van', 'A ruhák vasalása tárolás előtt minden nap'], answer: 1, explain: 'A moly lárvái a szennyezett, izzadságos gyapjúszálakat kedvelik; a tiszta, zártan tárolt ruha védett.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'alberlet',
      title: 'Albérlet a gyakorlatban: keresés, megtekintés, átadás-átvétel',
      level: 2, minutes: 15,
      summary: 'Hogyan keress albérletet csalók nélkül, mit nézz meg a megtekintésen, mit kérdezz, mi kerüljön a szerződésbe, hogyan készíts átadás-átvételi jegyzőkönyvet, és hogyan kapd vissza a kauciót kiköltözéskor.',
      tags: ['albérlet', 'lakásbérlés', 'bérleti szerződés', 'kaució', 'óvadék', 'átadás-átvételi jegyzőkönyv', 'mérőóra', 'leltár', 'megtekintés', 'albérletcsalás', 'kiköltözés', 'lakcímbejelentés', 'lakástörvény'],
      sections: [
        {
          title: 'Keresés: hirdetés, közvetítő, csalók',
          text: 'Az albérlet **költségeit** (bérleti díj, rezsi, közös költség, kaució) a [[#/lecke/penz-mindennap/lakhatas-rezsi|Albérlet, rezsi, első lakás]] lecke számolja ki. Itt a **gyakorlati** lépések jönnek.\n\n**Hol keress?** Ingatlanhirdetési portálok, egyetemi/kollégiumi csoportok, ismerősök. Ingatlanközvetítőn keresztül gyakran **közvetítői díjat** kell fizetni (ezt előre kérdezd meg, ki fizeti).\n\n**Az albérletcsalás jelei:**\n- az ár **jóval a környékbeli átlag alatt** van, a fotók túl szépek (keress rá a képekre fordított képkereséssel),\n- a „tulajdonos” **külföldön van**, a lakást nem lehet megnézni, de „postán küldi a kulcsot”, ha előre utalod a kauciót,\n- **sürget**, mert „sokan érdeklődnek”, és foglalót kér megtekintés előtt,\n- nem hajlandó személyesen találkozni, vagy nem tudja igazolni, hogy ő a tulajdonos.\n\n**Aranyszabály:** pénzt csak **megtekintés után**, **írásos szerződés** ellenében adj, és nézd meg a tulajdoni lapot (vagy legalább kérd meg, hogy mutassa meg), illetve a tulajdonos személyi igazolványát.'
        },
        {
          title: 'A megtekintés ellenőrzőlistája',
          text: 'Menj **nappal**, ha lehet, kísérővel, és **fotózz**. Nézd meg:\n\n- **Nedvesség, penész**: sarkok, ablakok környéke, bútorok mögött, fürdőszoba. Dohos szag?\n- **Víz**: nyisd meg a csapokat (melegvíz mennyi idő alatt jön?), húzd le a WC-t, nézd meg a mosdó alatti szekrényt.\n- **Fűtés**: milyen (gázkazán, távfűtés, villany)? Mikor volt utoljára a gázkészülék átvizsgálva? Van CO-érzékelő?\n- **Elektromosság**: van FI-relé? Elég konnektor van? Nincsenek lógó vezetékek?\n- **Ablakok**: jól zárnak? Huzatos?\n- **Zaj, környék**: forgalmas út, szórakozóhely, tömegközlekedés, bolt.\n- **Mobiltérerő, internet**: milyen szolgáltató érhető el?\n\n**Kérdezd meg:** mennyi a **rezsi télen**, és mi van benne a bérleti díjban? Ki fizeti a közös költséget? Mennyi a kaució? Lehet-e **bejelentkezni** (lakcím)? Lehet-e fúrni, háziállatot tartani? Ki javítja, ha elromlik a bojler vagy a mosógép?'
        },
        {
          title: 'A szerződés: amit ellenőrizz',
          text: 'Lakás bérbeadásához a szerződést **írásba kell foglalni** (a lakások bérletéről szóló **1993. évi LXXVIII. törvény**, röviden Lakástörvény szerint ez az érvényesség feltétele). A szerződés tartalmáról a [[#/lecke/penz-mindennap/lakhatas-rezsi|Albérlet, rezsi]] lecke alaplistát ad; ezt egészítsd ki ezekkel:\n\n- **Határozott vagy határozatlan idő?** Határozott időre kötött szerződést egyik fél sem mondhat fel „csak úgy” idő előtt, csak a szerződésben vagy a törvényben meghatározott okból. Ha egyetem miatt bérelsz, gondold végig, mi lesz, ha félév közben költöznöd kell.\n- **Felmondási idő** és a felmondás **módja** (írásban).\n- **Bérleti díj emelése**: lehet-e, mikor, milyen mértékben (pl. infláció szerint évente)?\n- **Karbantartás**: ki fizeti a kisebb javításokat (csaptelep, izzó), és ki a nagyobbakat (bojler, mosógép)?\n- **Kaució visszafizetése**: határidő (pl. kiköltözés után 15 napon belül), és mire használható fel.\n- **Bejelentkezés** a lakcímre és a **kapcsolattartás** módja (e-mail, telefon).\n\nKérj **másolatot** az aláírt szerződésről, és a **bérleti díjat** lehetőleg **átutalással** fizesd (így bizonyítható).',
          warn: 'Készpénzes fizetésnél mindig kérj **írásos nyugtát** (dátum, összeg, mire, aláírás). Nyugta nélkül később nem tudod bizonyítani, hogy fizettél.'
        },
        {
          title: 'Átadás-átvételi jegyzőkönyv',
          text: 'Ez a dokumentum dönti el, hogy kiköltözéskor visszakapod-e a kauciót. Beköltözéskor, **mindkét fél jelenlétében**, aláírva készüljön, és tartalmazza:\n\n1. **Dátum**, a lakás címe, a felek adatai.\n2. **Mérőóra-állások**: villany, gáz, víz (hideg/meleg), fűtésmérők. **Fotózd le** az órákat (a fotón látszódjon a gyári szám és az állás).\n3. **Leltár**: bútorok, gépek, eszközök (márka, állapot), kulcsok száma.\n4. **Meglévő hibák**: karcok a parkettán, foltok a falon, repedt csempe, nem működő eszközök, **fotóval**.\n5. Mindkét fél **aláírása**.\n\n**Kiköltözéskor** ugyanezt végig kell járni: mérőállások, leltár, a lakás állapota. A **szokásos használattal járó kopás** (kicsit kopottabb festés, apró karcok) nem vonható le a kaucióból; a **károkozás** (beégett pult, eltört csempe, tönkretett ajtó) igen.',
          tip: 'Tedd a fotókat egy **dátummal ellátott** mappába (felhőbe), és küldd el e-mailben a tulajdonosnak is: így később senki nem vitathatja, mikor készültek.'
        },
        {
          title: 'Bejelentkezés és viták',
          text: '**Lakcímbejelentés:** ha költözöl, a lakcímet a beköltözéstől számított **3 munkanapon** belül be kell jelenteni (a személyiadat- és lakcímnyilvántartásról szóló **1992. évi LXVI. törvény** szerint). Albérletbe a bejelentéshez a **szállásadó (tulajdonos) hozzájárulása** kell. Részletesen: [[#/lecke/tulelotudas/koltozes|Költözés: logisztika és ügyintézés]].\n\n**Ha vita van** (nem adja vissza a kauciót, nem javítja meg a beázást):\n1. **Írásban** (e-mailben) kérd, határidővel, és hivatkozz a szerződésre és a jegyzőkönyvre.\n2. Próbáljatok **megegyezni**: a bíróság drága és lassú.\n3. Ha nem megy: **jogi segítség** (egyetemi jogsegélyszolgálat, ügyvéd), végső esetben **fizetési meghagyás** (közjegyzőnél) vagy per.\n\nA bérlőnek sem szabad önkényesen „visszatartani” a bérleti díjat vagy az utolsó hónapot „lelakni” a kaucióból, hacsak a szerződés ezt nem engedi: ez szerződésszegés.'
        }
      ],
      quiz: [
        { q: 'Melyik az albérletcsalás tipikus jele?', options: ['A tulajdonos megmutatja a lakást', 'A „tulajdonos” külföldön van, és a kulcsot postán küldi, ha előre utalsz', 'A szerződést írásban kötik', 'A kaució 2 havi bérleti díj'], answer: 1, explain: 'Megtekintés és ellenőrzés nélkül soha ne utalj; ez az egyik leggyakoribb trükk.' },
        { q: 'Mi a Lakástörvény szerint a lakásbérleti szerződés érvényességének feltétele?', options: ['Közjegyzői okirat', 'Az írásba foglalás', 'Ügyvédi ellenjegyzés', 'Szóbeli megállapodás tanúk előtt'], answer: 1, explain: 'Lakás bérbeadásához a szerződést írásba kell foglalni.' },
        { q: 'Mit rögzíts az átadás-átvételi jegyzőkönyvben?', options: ['Csak a bérleti díjat', 'A mérőóra-állásokat, a leltárt és a meglévő hibákat fotókkal', 'A szomszédok nevét', 'A kedvenc bútorodat'], answer: 1, explain: 'Ez a bizonyíték kiköltözéskor arra, mi volt már beköltözéskor is hibás.' },
        { q: 'Levonható-e a kaucióból a szokásos használattal járó kopás?', options: ['Igen, mindig', 'Általában nem; a károkozás viszont igen', 'Csak ha a bérlő diák', 'Csak készpénzben'], answer: 1, explain: 'A rendeltetésszerű használat nyoma nem kár; a tönkretett eszköz, beégett pult viszont az.' },
        { q: 'Hány munkanapon belül kell bejelenteni az új lakcímet költözés után?', options: ['1', '3', '30', '90'], answer: 1, explain: 'A beköltözéstől számított 3 munkanapon belül.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'koltozes',
      title: 'Költözés: logisztika és ügyintézés',
      level: 1, minutes: 13,
      summary: 'Költözési menetrend 4 héttől a beköltözés utáni napokig: dobozolás, szállítás, lakcímbejelentés, mérőórák, szolgáltatók, posta, bank, munkáltató, iskola, háziorvos.',
      tags: ['költözés', 'lakcím', 'lakcímkártya', 'lakcímbejelentés', 'kormányablak', 'mérőóra', 'átírás', 'szolgáltató', 'internet', 'hűségidő', 'posta', 'utánküldés', 'háziorvos', 'dobozolás', 'fuvarozó'],
      sections: [
        {
          title: '4–2 héttel előtte: tervezés',
          text: '- **Selejtezz!** Amit egy éve nem használtál, azt ne költöztesd: add el, ajándékozd el, vidd a hulladékudvarba.\n- **Fuvarozás**: kérj több ajánlatot (óradíj vagy fix ár? benne van a hordás, az emelet, a kiszállás?), vagy bérelj kisteherautót, és kérj meg barátokat.\n- **Szerződések**: nézd meg az **internet- és tévészolgáltatás** szerződésedet. Van **hűségidő**? Át lehet-e vinni az új címre? Ha ott nem elérhető, mi a felmondás feltétele?\n- **Régi lakás**: albérletnél a szerződés szerinti **felmondási idő**ben szólj a tulajdonosnak, és beszéljétek meg az átadás időpontját.\n- **Szabadnap** a költözés napjára (munkahelyen sokszor jár, kérdezd meg).'
        },
        {
          title: 'Dobozolás okosan',
          text: '- **Nehéz dolgot kis dobozba** (könyv), könnyűt nagyba (párna, ruha). Egy dobozt egy ember kényelmesen tudjon felemelni.\n- **Feliratozz** minden dobozt: **melyik szoba** és **mi van benne**. A törékenyre: „ÓVATOSAN, FELÜL”.\n- Az edényeket, poharakat **egyenként** csomagold újságba vagy törölközőbe, a tányérokat **élükre** állítva tedd a dobozba.\n- A szétszedett bútorok **csavarjait** tedd zacskóba, és ragaszd a bútorra.\n- Készíts egy **„első nap” dobozt/táskát**: iratok, gyógyszerek, töltők, WC-papír, törölköző, egy váltás ruha, alap edények, szerszámok (csavarhúzó, olló), elemlámpa, ágynemű.\n\nAz **iratokat, értékeket** (személyes okmányok, laptop, ékszer) mindig magadnál vidd, ne a fuvarozó autójában.'
        },
        {
          title: 'A költözés napja: mérőórák',
          text: 'A **régi** és az **új** lakásban is:\n\n1. **Fotózd le az összes mérőórát** (villany, gáz, víz), a gyári számmal együtt.\n2. Albérletnél töltsétek ki az **átadás-átvételi jegyzőkönyvet** (lásd az [[#/lecke/tulelotudas/alberlet|Albérlet a gyakorlatban]] leckét).\n3. Ha a te nevedre szólnak a közüzemi szerződések, jelentsd be a **fogyasztóváltozást** a szolgáltatóknál (áram, gáz, víz, csatorna, hulladékszállítás, távhő): ehhez általában a mérőállás és a régi, illetve új fogyasztó adatai, aláírása kell. Ha ezt elmulasztod, a **régi lakás fogyasztása a te nevedre** számlázódhat tovább.\n\nÚj lakásban nézd meg az első napon, hol a **főcsap, gázelzáró, elosztószekrény** (lásd: [[#/lecke/tulelotudas/otthoni-veszhelyzet|Otthoni vészhelyzetek]]).'
        },
        {
          title: 'Ügyintézés ellenőrzőlista',
          text: '**Kötelező, határidős:**\n- **Lakcímbejelentés** a beköltözéstől számított **3 munkanapon** belül: kormányablakban, okmányirodában vagy online (Ügyfélkapu+ / DÁP). Új **lakcímkártyát** kapsz. Albérletnél a tulajdonos (szállásadó) hozzájárulása kell. Lakóhely (állandó) vagy tartózkodási hely (ideiglenes, például kollégium) is lehet.\n\n**Akiknek szólj** (a lakcímváltozás nem jut el mindenkihez automatikusan):\n- **munkáltató** (bérszámfejtés, adóigazolás), **iskola/egyetem** (Neptun),\n- **bank**, **biztosítók** (lakásbiztosítás új címre!), **mobilszolgáltató**,\n- **webshopok**, előfizetések, csomagküldők alapértelmezett szállítási címe,\n- ha autód van: kérdezd meg a kormányablakban, kell-e a forgalmi engedélyen változást átvezetni.\n\n**Érdemes:**\n- **Postai utánküldés**: a Magyar Postánál díjért kérhető, hogy a régi címre érkező leveleket egy ideig az új címedre küldjék.\n- **Háziorvos**: ha messzebb költözöl, válassz újat az új lakóhelyed szerint (lásd: [[#/lecke/felnott-elet/egeszsegugy|Egészségügyi ügyintézés]]).\n- **Szavazókör**: a választási névjegyzékben a lakcímed szerinti szavazókörbe kerülsz.',
          tip: 'Az okmányokról és az online ügyintézésről: [[#/lecke/felnott-elet/okmanyok|Okmányok]] és [[#/lecke/felnott-elet/ugyintezes-online|Online ügyintézés]].'
        }
      ],
      widgets: [{ type: 'parositas', options: { title: 'Kinek mit jelents be költözéskor?', pairs: [
        ['Kormányablak / online', 'Lakcímbejelentés 3 munkanapon belül'],
        ['Áramszolgáltató', 'Fogyasztóváltozás a mérőállással'],
        ['Munkáltató', 'Új cím a bérszámfejtéshez'],
        ['Lakásbiztosító', 'A biztosított ingatlan címe'],
        ['Magyar Posta', 'Utánküldés a régi címről'],
        ['Internetszolgáltató', 'Áthelyezés vagy felmondás (hűségidő!)']
      ] } }],
      quiz: [
        { q: 'Mit tegyél a költözés napján a mérőórákkal?', options: ['Semmit, a szolgáltató tudja', 'Fotózd le őket a gyári számmal és az állással együtt', 'Kapcsold ki őket', 'Szereld le őket'], answer: 1, explain: 'A fotó bizonyítja az átadáskori állást, ez alapján számolnak el a régi és az új fogyasztóval.' },
        { q: 'Hova tedd a költözéskor a személyes okmányaidat?', options: ['A fuvarozó autójába, egy dobozba', 'Magadnál tartsd', 'A régi lakásban hagyd', 'Postán küldd el'], answer: 1, explain: 'Az iratokat és értékeket mindig magadnál vidd, így nem vesznek el.' },
        { q: 'Mi történhet, ha nem jelented be a fogyasztóváltozást a régi lakásban?', options: ['Semmi', 'A régi lakás fogyasztása továbbra is a te nevedre számlázódhat', 'Megbüntet a rendőrség', 'Lekapcsolják az új lakásban az áramot'], answer: 1, explain: 'A szolgáltatóval kötött szerződés addig él, amíg nem jelented a változást.' },
        { q: 'Mit érdemes megnézni az internetszerződésedben költözés előtt?', options: ['A router színét', 'Van-e hűségidő, és át lehet-e vinni az új címre', 'Hány GB a letöltés', 'Semmit'], answer: 1, explain: 'Hűségidő alatt a felmondás kötbérrel járhat; sok szolgáltató viszont áthelyezi a szolgáltatást.' },
        { q: 'Mit tegyél a nehéz könyvekkel?', options: ['Nagy dobozba, minél többet egybe', 'Kis dobozokba, hogy emelhető legyen', 'Zsákba', 'Szemétbe'], answer: 1, explain: 'A nagy doboz könyvvel túl nehéz, és könnyen kiszakad.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'panasz',
      title: 'Panaszt teszek: bolt, webshop, szolgáltató, repülőjárat',
      level: 2, minutes: 14,
      summary: 'Hogyan írj hatásos panaszt, milyen határidők kötik a vállalkozást, mit tehetsz, ha a szolgáltató (telefon, internet, közmű) nem válaszol, és milyen jogaid vannak késő vagy törölt repülőjáratnál.',
      tags: ['fogyasztóvédelem', 'panasz', 'panaszlevél', 'jegyzőkönyv', '30 nap', '15 nap', 'közszolgáltató', 'békéltető testület', 'kormányhivatal', 'fogyasztóvédelmi hatóság', 'légi utas', 'késés', 'járattörlés', '261/2004', 'Európai Fogyasztói Központ'],
      sections: [
        {
          title: 'Mielőtt panaszt teszel',
          text: 'A jótállás, szavatosság és a 14 napos elállás **szabályait** a [[#/lecke/penz-mindennap/fogyasztovedelem|Fogyasztói jogaid]] lecke írja le. Ez a lecke arról szól, **hogyan** érvényesítsd őket a gyakorlatban.\n\nEgy gyakori tévedés: **boltban** vett, **hibátlan** terméket nem kötelező visszavenni (a 14 napos elállás csak online, telefonos és házaló vásárlásra vonatkozik). Ha a bolt mégis visszaveszi, az **üzletpolitika**, nem jog. **Hibás** terméknél viszont boltban is van jogod.\n\n**Gyűjtsd össze:**\n- a **vásárlás bizonyítékát** (nyugta, számla, bankszámlakivonat, rendelésvisszaigazoló e-mail),\n- **fotót, videót** a hibáról,\n- az addigi **levelezést**, a beszélgetések időpontját, az ügyintéző nevét.'
        },
        {
          title: 'A jó panaszlevél',
          text: 'A panasz legyen **írásos** (e-mail, levél, webes űrlap), **rövid és tárgyszerű**. Egy jó szerkezet:\n\n1. **Kik vagytok**: neved, elérhetőséged, a rendelés/ügyfélszám.\n2. **Mi történt**: dátummal, tényszerűen (mit vettél, mikor, mi a hiba).\n3. **Mit kérsz**: javítás, csere, árleszállítás, pénz visszafizetése, kártérítés. Ha nem írod le, nem tudják teljesíteni.\n4. **Határidő**: „Kérem, hogy panaszomra a jogszabályban előírt határidőn belül írásban válaszoljanak.”\n5. **Mellékletek**: nyugta, fotók.\n\nKerüld a sértegetést és a fenyegetőzést: a tárgyszerű, dátumozott panasz **bizonyíték** lesz, ha később a békéltető testülethez vagy a hatósághoz fordulsz.\n\n**Boltban (szóbeli panasz):** ha a panaszt nem tudják azonnal orvosolni, a vállalkozásnak **jegyzőkönyvet** kell felvennie, és annak **másolatát** neked át kell adnia. Kérd!'
        },
        {
          title: 'Határidők: meddig kell válaszolniuk?',
          text: 'A **fogyasztóvédelemről szóló 1997. évi CLV. törvény** (Fgytv.) szerint:\n\n- Az **írásbeli panaszra** a vállalkozásnak a beérkezéstől számított **30 napon belül** írásban, **érdemben** és **igazolható módon** kell válaszolnia (a 2022 végi módosítás óta). Ha elutasítja, **meg kell indokolnia**, és tájékoztatnia kell, hová fordulhatsz (hatóság, békéltető testület).\n- A **közszolgáltatók** (például áram, gáz, víz, távhő, hulladékszállítás) szigorúbb szabályok szerint, **15 napon belül** kötelesek érdemben válaszolni.\n\nHa nem válaszolnak, vagy a válasz nem megoldás:\n- **Békéltető testület** (a vármegyei kereskedelmi és iparkamarák mellett): ingyenes, peren kívüli egyeztetés.\n- **Fogyasztóvédelmi hatóság** (a vármegyei kormányhivatalok): ha a vállalkozás **szabályt sértett** (pl. nem válaszolt határidőben, nem vett fel jegyzőkönyvet).\n- **Pénzügyi Békéltető Testület** (MNB): bank, biztosító esetén.\n- **Nemzeti Média- és Hírközlési Hatóság (NMHH)**: telefon- és internetszolgáltatással kapcsolatos ügyekben.\n- **Európai Fogyasztói Központ**: ha a vállalkozás másik EU-országban van.'
        },
        {
          title: 'Késett vagy törölték a repülőjáratot',
          text: 'Az EU-ból induló, illetve EU-s légitársasággal az EU-ba érkező járatoknál a **261/2004/EK rendelet** véd. 2026 végén még ez a hatályos szabály:\n\n**Ellátás** (minden késésnél, ami elér egy határt): étel, ital, szükség esetén **szállás**, és két telefonhívás/e-mail. Ez **jár**, a légitársaságnak kell biztosítania.\n\n**Kártalanítás** (fix összeg), ha a járat **legalább 3 órát** késett a célállomásra érkezéskor, vagy rövid határidővel törölték, és ezt **nem rendkívüli körülmény** (pl. rossz idő, légiforgalmi irányítói sztrájk) okozta:\n- **250 euró**: 1500 km-ig,\n- **400 euró**: EU-n belüli 1500 km feletti, és egyéb 1500–3500 km közötti járat,\n- **600 euró**: 3500 km feletti járat.\n\n**Járattörlésnél** választhatsz: a jegyár **visszatérítése** vagy **átfoglalás**.\n\n**Változás készül:** 2026 júniusában az Európai Parlament és a Tanács **politikai megállapodást** kötött a rendelet módosításáról; a végleges elfogadás és kihirdetés után 12 hónappal kezdik alkalmazni. Utazás előtt nézd meg az aktuális szabályt (például az Európai Bizottság „Your Europe” oldalán).',
          tip: 'A kártalanítást először **közvetlenül a légitársaságtól** kérd (űrlapon); a jogot érvényesítő cégek a kártérítés jelentős részét (gyakran negyedét-harmadát) megtartják.'
        }
      ],
      quiz: [
        { q: 'Boltban vettél egy hibátlan pulóvert, de meggondoltad magad. Köteles visszavenni a bolt?', options: ['Igen, 14 napig mindig', 'Nem, ez csak az üzlet saját döntése', 'Igen, 30 napig', 'Igen, ha megvan a címke'], answer: 1, explain: 'A 14 napos indoklás nélküli elállás a távollévők közötti (online, telefonos) és házaló vásárlásra vonatkozik.' },
        { q: 'Mennyi időn belül kell egy vállalkozásnak érdemben válaszolnia az írásbeli fogyasztói panaszra (általános szabály)?', options: ['3 nap', '8 nap', '30 nap', '1 év'], answer: 2, explain: 'Az Fgytv. szerint 30 napon belül, írásban, igazolható módon.' },
        { q: 'Mit kell tennie a boltnak, ha a szóbeli panaszt nem tudja azonnal orvosolni?', options: ['Semmit', 'Jegyzőkönyvet felvenni, és másolatot adni a vásárlónak', 'Kihívni a rendőrséget', 'Kitiltani a vásárlót'], answer: 1, explain: 'A jegyzőkönyv a panasz bizonyítéka; a másolat a vásárlót illeti.' },
        { q: 'Mennyi kártalanítás jár a 261/2004/EK rendelet szerint egy 1200 km-es járat 4 órás késéséért (ha nem rendkívüli körülmény okozta)?', options: ['Semmi', '250 euró', '400 euró', '600 euró'], answer: 1, explain: '1500 km-ig 250 euró jár, ha a késés eléri a 3 órát a célállomásra érkezéskor.' },
        { q: 'Kihez fordulj, ha a mobilszolgáltatód nem orvosolja a panaszodat?', options: ['NMHH vagy békéltető testület', 'Tűzoltóság', 'NAV', 'Önkormányzat'], answer: 0, explain: 'Hírközlési ügyekben az NMHH, emellett a békéltető testület is eljárhat.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'csalasok',
      title: 'Csalások és átverések felismerése',
      level: 1, minutes: 15,
      summary: 'Hogyan működik a csalók pszichológiai trükkje, és hogyan ismered fel az adathalász üzenetet, a hamis banki hívást, az „unokázós” csalást, a befektetési és a romantikus csalást, valamint a piactéri „futáros” trükköt.',
      tags: ['csalás', 'átverés', 'adathalászat', 'phishing', 'SMS', 'hamis banki hívás', 'spoofing', 'unokázós csalás', 'befektetési csalás', 'deepfake', 'romantikus csalás', 'piactér', 'futár', 'QR-kód', 'social engineering', 'kétfaktoros azonosítás'],
      sections: [
        {
          title: 'A csalók receptje: sürgetés, félelem, mohóság',
          text: 'A csalók nem a technikát, hanem **az embert** törik fel (ezt hívják **social engineeringnek**). Szinte minden csalásban ugyanazok az elemek vannak:\n\n- **Sürgetés**: „most azonnal”, „24 órán belül törlik a fiókját”, „perceken belül elveszik a pénzét”.\n- **Félelem vagy pánik**: baleset, rendőrség, letiltott kártya, tartozás, büntetés.\n- **Tekintély**: banki biztonsági osztály, rendőr, NAV, posta, futárszolgálat nevében.\n- **Mohóság vagy remény**: „garantált” hozam, nyeremény, szerelem.\n- **Titoktartás**: „ne szóljon senkinek”, „ne tegye le a telefont”.\n\n**Az ellenszer egyszerű:** ha sürgetnek és pénzt vagy kódot kérnek, **állj meg**. Tedd le, **gondold át**, kérdezz meg valakit, és **te hívd vissza** a hivatalos számot.',
          tip: 'A banki csalások aranyszabályai (PIN, jelszó, SMS-kód soha) a [[#/lecke/penz-mindennap/szamlak-kartyak|Bankszámla, kártyák, fintech]] leckében vannak. A hivatalos szervek nevében érkező üzenetekről: [[#/lecke/felnott-elet/ugyintezes-online|Online ügyintézés]].'
        },
        {
          title: 'Adathalász SMS, e-mail, QR-kód',
          text: 'Az **adathalászat** (phishing) célja, hogy egy hamis oldalon add meg a jelszavad, kártyaadataid vagy az SMS-kódot.\n\n**Árulkodó jelek:**\n- **Váratlan** üzenet: csomag „vámja”, „sikertelen kézbesítés”, „lejárt jelszó”, „visszatérítés jár”, „gyanús belépés”.\n- A link címe **majdnem** jó: `posta-hu.delivery-track.com`, `otpbank.hu-login.net`. A valódi domain a **címsor első perjele előtti utolsó két tag** (pl. `valami.otpbank.hu/…` a bankhoz tartozik, de `otpbank.hu.valami.com/…` NEM).\n- Apró **összeget** kér (pl. 290 Ft), hogy ne gyanakodj, de a teljes kártyaadatot elkéri.\n- Személytelen megszólítás, furcsa fordítás, helyesírási hibák (bár a csalók ma már gyakran hibátlanul írnak).\n\n**Védekezés:** üzenetben kapott linkre **ne kattints**; a szolgáltató **appjában** vagy a böngészőbe **magad beírt** címen nézd meg az ügyet. Kapcsold be mindenhol a **kétfaktoros azonosítást**, és ne használd ugyanazt a jelszót több helyen (jelszókezelő segít).\n\n**QR-kódos csalás (quishing):** parkolóautomatára, plakátra ragasztott hamis QR-kód visz hamis fizetőoldalra. Mielőtt fizetsz, nézd meg, hova visz a link.'
        },
        {
          title: 'Hamis banki hívás és „unokázós” csalás',
          text: '**Hamis banki hívás (vishing):** „a bank biztonsági osztályáról” hívnak, a kijelzőn akár a **bank valódi száma** is megjelenhet (a hívószám **hamisítható**, ezt hívják spoofingnak). Azt mondják, gyanús tranzakció van, és ezért: utald át a pénzed egy „biztonsági számlára”, telepíts egy **távsegítő** appot, vagy olvasd fel az SMS-ben kapott kódot. **Ezek mind csalásra utalnak.** Tedd le, és hívd a bankot a kártyád hátoldalán lévő számon.\n\n**„Unokázós” csalás:** főleg idősekkel szemben. Telefonon egy „unoka” vagy „rendőr” mondja, hogy a hozzátartozó **balesetet** okozott, és ha most fizetnek (készpénzt, ékszert), elkerülhető a börtön. Egy „futár” jön a pénzért. A modern változatban **üzenetben** jön: „Szia anya, elromlott a telefonom, ez az új számom, sürgősen utalnál…?”\n\n**Védekezés a családban:** beszéljétek meg előre egy **családi jelszót**, és tanítsd meg nagyszüleidnek: **rendőrség soha nem kér pénzt** egy ügy elintézéséért, és mindig **vissza kell hívni** a hozzátartozót a régi, ismert számán.'
        },
        {
          title: 'Befektetési, romantikus és piactéri csalás',
          text: '**Befektetési csalás:** közösségi médiában hirdetés ismert emberek arcával (gyakran **deepfake** videóval), „garantált” napi néhány százalékos hozam, kriptovaluta, „mesterséges intelligenciás kereskedőrobot”. Az első kis befizetés után egy „brókered” lesz, aki mutat egy szép, emelkedő egyenleget, és **egyre több** pénzt kér, de kifizetni nem lehet. **Szabály:** a **garantált, magas hozam** nem létezik. Nézd meg, hogy a cég szerepel-e az **MNB** engedélyezett szolgáltatói között, illetve az MNB figyelmeztető listáján.\n\n**Romantikus csalás:** online megismert, sosem látott „partner” (gyakran katonaorvosnak, külföldi mérnöknek mondja magát), aki hetek alatt bizalmat épít, majd **pénzt kér** (vámra, kórházra, repülőjegyre). Ha valaki, akivel még sosem találkoztál, pénzt kér: ez csalás.\n\n**Piactéri „futáros” csalás:** eladsz valamit egy online piactéren, a „vevő” azt írja, hogy a **futárszolgálat** fizet neked, és küld egy linket, ahol „a pénz átvételéhez” meg kell adnod a **kártyaadataidat**. Eladóként **soha nem kell** kártyaadatot megadnod ahhoz, hogy pénzt kapj. Vevőként: **előre utalás** ismeretlennek kockázatos; használd a platform védett fizetési módját vagy az átvételkori fizetést.',
          widget: { type: 'parositas', options: { title: 'Melyik csalás melyik trükkel dolgozik?', pairs: [
            ['Hamis banki hívás', 'Utald át egy „biztonsági számlára”'],
            ['Adathalász SMS', 'Kis összegű „vámdíj” egy hamis linken'],
            ['Unokázós csalás', 'A hozzátartozó bajban van, „futár” jön a pénzért'],
            ['Befektetési csalás', 'Garantált magas hozam, deepfake reklám'],
            ['Piactéri futáros csalás', 'Add meg a kártyaadatod, hogy megkapd a pénzt'],
            ['Romantikus csalás', 'Sosem látott partner pénzt kér']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik a csalók legáltalánosabb pszichológiai fegyvere?', options: ['A türelem', 'A sürgetés és a félelemkeltés', 'A hosszú, részletes levelek', 'A személyes találkozó'], answer: 1, explain: 'A sürgetés miatt nincs időd átgondolni a helyzetet; ezért segít, ha leteszed és visszahívod a hivatalos számot.' },
        { q: 'Melyik link tartozik valóban a bankhoz (bank.hu)?', options: ['bank.hu.biztonsag-login.com', 'netbank.bank.hu', 'bank-hu.net', 'bank.hu-belepes.info'], answer: 1, explain: 'A domain a címsor első perjele előtti utolsó két tag; csak a netbank.bank.hu végződik bank.hu-ra.' },
        { q: 'A „bank” telefonon azt kéri, telepíts egy távsegítő alkalmazást. Mit teszel?', options: ['Telepítem, hiszen a bank kéri', 'Leteszem, és a kártyám hátoldalán lévő számon visszahívom a bankot', 'Megadom a PIN-kódot is', 'Megkérdezem a hívót, hogy tényleg a banktól van-e'], answer: 1, explain: 'A távsegítő app átadja a telefonod irányítását; a bank ilyet nem kér.' },
        { q: 'Eladsz egy kabátot online, a vevő linket küld, ahol a pénz átvételéhez a kártyaadataidat kéri. Mi ez?', options: ['Normális banki eljárás', 'Piactéri csalás', 'A futárcég szabálya', 'Adóbevallás'], answer: 1, explain: 'Pénz fogadásához sosem kell megadni a kártyaszámot, lejáratot és a CVC-kódot.' },
        { q: 'Mi véd az „unokázós” csalás ellen a családban?', options: ['Ha a nagyszülő sok készpénzt tart otthon', 'Egy előre megbeszélt családi jelszó és a visszahívás az ismert számon', 'Ha mindig felveszik az ismeretlen számot', 'Semmi'], answer: 1, explain: 'A jelszó és a visszahívás gyorsan kiszűri a csalót; a rendőrség pedig soha nem kér pénzt egy ügy elintézéséért.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'atvertek',
      title: 'Ha mégis átvertek: az első órák teendői',
      level: 2, minutes: 12,
      summary: 'Mit tegyél azonnal, ha megadtad a kártyaadatod, utaltál egy csalónak, vagy feltörték a fiókodat: letiltás, bank, jelszócsere, feljelentés, és mit vállal a bank.',
      tags: ['csalás', 'kártyaletiltás', 'jóvá nem hagyott fizetési művelet', 'visszaterhelés', 'chargeback', 'feljelentés', 'rendőrség', 'feltört fiók', 'jelszócsere', 'kétfaktoros', 'MNB', 'Pénzügyi Békéltető Testület', 'személyazonosság-lopás'],
      sections: [
        {
          title: 'Az első 15 perc: állítsd meg a kárt',
          text: 'Minden perc számít: a csalók gyorsan továbbutalják a pénzt.\n\n1. **Tiltsd le a kártyát** a bank **appjában** (ez a leggyorsabb), vagy hívd a bank 0–24 órás telefonszámát.\n2. **Hívd fel a bankot**, és mondd el, mi történt: kérd az átutalás **visszahívását** (ha még lehet), a netbank **zárolását**, és rögzítsd az ügyszámot.\n3. Ha **távsegítő appot** telepítettél: töröld, a telefont kapcsold **repülő módba**, és egy másik eszközről intézkedj.\n4. Ha **jelszót** adtál meg egy hamis oldalon: **azonnal** változtasd meg (és mindenhol, ahol ugyanezt használtad), kapcsold be a kétfaktoros azonosítást.\n\nNe szégyelld magad: a csalók profik, és **bárkit** be tudnak csapni. A gyors cselekvés sokkal fontosabb, mint a szégyen.',
          warn: 'Ha a pánikban „segítő” jelentkezik, aki díj ellenében visszaszerzi a pénzed (**visszaszerzési csalás**): ez újabb csalás. Rendőrség és bank nem kér ilyet.'
        },
        {
          title: 'Mit vállal a bank?',
          text: 'A pénzforgalmi szolgáltatásokról szóló **2009. évi LXXXV. törvény** (Pft.) és az MNB ajánlásai szerint:\n\n- **Jóvá nem hagyott** fizetési műveletnél (amit nem te kezdeményeztél, például ellopott kártyaadatokkal fizettek) a bank főszabályként **köteles megtéríteni** az összeget, és neki kell **bizonyítania**, hogy te jóváhagytad.\n- A bejelentés előtti kárból törvényben rögzített, **kis összeget** a kártyabirtokos viselhet; a **bejelentés után** keletkezett kárért a bank felel.\n- Ha azonban a kárt **szándékosan** vagy **súlyos gondatlansággal** okoztad (például **kiadtad** az SMS-kódot vagy a netbank-jelszót, vagy te magad utaltál a csalónak), a bank **mentesülhet** a felelősség alól.\n\nEzért kritikus a különbség: amit **te** hagytál jóvá (még ha átverés miatt is), azt sokkal nehezebb visszakapni. A bankoktól ugyanakkor az MNB (például az 5/2023. számú, a pénzforgalmi visszaélésekről szóló ajánlásában) egyre szigorúbb **csalásmegelőzést** vár el (pl. gyanús tranzakciók szűrése), és vitatható ügyben fordulhatsz a **Pénzügyi Békéltető Testülethez**.\n\n**Bankkártyás vásárlásnál** (pl. nem szállító webshop) a bank **visszaterhelési (chargeback)** eljárást indíthat a kártyatársaságnál: ehhez minél előbb fordulj hozzá, a bizonyítékokkal.'
        },
        {
          title: 'Feljelentés és bizonyítékok',
          text: '**Tegyél feljelentést** a rendőrségen (bármelyik rendőrkapitányságon, személyesen; sürgős esetben a 112-n). A csalás **bűncselekmény** (Btk. 373. §), és a feljelentés a bank és a biztosító felé is fontos bizonyíték.\n\n**Mentsd el:**\n- **képernyőképeket** az üzenetekről, a hamis oldalról (a címsorral együtt), a hívásnaplóról,\n- az utalás adatait (kedvezményezett neve, **számlaszáma**, időpont, összeg),\n- e-maileket a **fejlécekkel** együtt.\n\nJelentsd a hamis profilt/hirdetést a **platformon** is (közösségi média, piactér), hogy mást ne csapjanak be.\n\nHa a **személyes adataidat** (igazolványkép, lakcímkártya) is megadtad: számíts arra, hogy a nevedben próbálhatnak hitelt felvenni vagy előfizetést kötni. Kérdezd meg a bankodat, a kormányablakban kérheted az okmány **cseréjét**, és figyeld a leveleidet.'
        },
        {
          title: 'Feltört közösségi vagy e-mail fiók',
          text: '1. Próbálj **jelszót visszaállítani** a szolgáltató hivatalos „Elfelejtett jelszó” / „Feltörték a fiókomat” folyamatával.\n2. Ha bejutottál: **új, erős jelszó**, **kétfaktoros azonosítás** bekapcsolása, **kijelentkeztetés** minden más eszközről, és nézd át a **visszaállítási** e-mail-címet és telefonszámot (a csaló gyakran a sajátjára cseréli).\n3. Nézd meg, nem küldtek-e a nevedben **üzenetet** az ismerőseidnek (pénzkérés, link): **figyelmeztesd** őket.\n4. Ha az **e-mail-fiókodat** törték fel, az a „mesterkulcs”: azon keresztül a többi fiókod jelszavát is visszaállíthatják. Ezt védd a legerősebben.\n\nA jövőben: **jelszókezelő**, minden fiókhoz más jelszó, és ha lehet, **passkey** vagy hitelesítő alkalmazás SMS helyett.'
        }
      ],
      quiz: [
        { q: 'Mi a leggyorsabb első lépés, ha kiderül, hogy a kártyaadataid egy csalóhoz kerültek?', options: ['Megvárni a havi kivonatot', 'Letiltani a kártyát a bank appjában vagy telefonon', 'Írni egy e-mailt a csalónak', 'Új telefont venni'], answer: 1, explain: 'A letiltás azonnal megakadályozza a további terheléseket.' },
        { q: 'Kinek kell bizonyítania jóvá nem hagyott fizetési műveletnél, hogy az ügyfél jóváhagyta a tranzakciót?', options: ['Az ügyfélnek', 'A banknak', 'A rendőrségnek', 'A kereskedőnek'], answer: 1, explain: 'A Pft. szerint a pénzforgalmi szolgáltatót terheli a bizonyítás.' },
        { q: 'Mikor mentesülhet a bank a megtérítés alól?', options: ['Soha', 'Ha az ügyfél súlyos gondatlansággal, pl. az SMS-kód kiadásával okozta a kárt', 'Ha az összeg kicsi', 'Ha hétvégén történt'], answer: 1, explain: 'Szándékos vagy súlyosan gondatlan ügyfélmagatartásnál a bank felelőssége kizárható.' },
        { q: 'Valaki díj fejében felajánlja, hogy visszaszerzi az elcsalt pénzed. Mi ez valószínűleg?', options: ['Rendőrségi szolgáltatás', 'Újabb csalás (visszaszerzési csalás)', 'Banki ügyintézés', 'Biztosítás'], answer: 1, explain: 'A csalók gyakran másodszor is lecsapnak ugyanarra az áldozatra.' },
        { q: 'Miért a legfontosabb fiókod az e-mail-fiók?', options: ['Mert ott vannak a képeid', 'Mert azon keresztül a többi fiók jelszava is visszaállítható', 'Mert ingyenes', 'Nem fontos'], answer: 1, explain: 'Az e-mail a jelszó-visszaállítás csatornája, ezért „mesterkulcs”.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'autobaleset',
      title: 'Autóbaleset után: helyszín, kárbejelentő, biztosító',
      level: 2, minutes: 14,
      summary: 'Mit tegyél egy koccanás vagy baleset után: helyszín biztosítása, sérültek, mikor kell rendőrt hívni, az Európai baleseti bejelentő kitöltése, és a kárbejelentés a biztosítónál.',
      tags: ['autóbaleset', 'koccanás', 'elakadásjelző háromszög', 'láthatósági mellény', 'rendőrség', 'Európai baleseti bejelentő', 'kárbejelentő', 'KGFB', 'casco', 'kárrendezés', 'kártérítés', 'bonus-malus', 'e-kárbejelentő', 'MABISZ'],
      sections: [
        {
          title: 'Az első percek: biztonság',
          text: '1. **Állj meg** (a balesetben érintett járművezetőnek meg kell állnia; a helyszín elhagyása bűncselekmény is lehet).\n2. Kapcsold be a **vészvillogót**.\n3. Mielőtt kiszállsz, vedd fel a **láthatósági mellényt**: **lakott területen kívül, korlátozott látási viszonyok között** (éjjel, ködben) ez kötelező, de nappal és városban is életet menthet. Az utasok is a **szalagkorlát mögé**, biztonságos helyre menjenek.\n4. Tedd ki az **elakadásjelző háromszöget** a jármű mögé, kellő távolságra, hogy a mögötted érkezők időben észrevegyék (lakott területen kívül ez kötelező; a gyakorlatban legalább kb. 50 m, autópályán ennél messzebb).\n5. Ha van **sérült**: **112**, és elsősegély (lásd [[#/lecke/haztartas/elsosegely|Elsősegély]]). A sérültet csak akkor mozgasd, ha életveszélyben van (tűz, forgalom).',
          warn: 'Autópályán a legveszélyesebb a **leállósávban** vagy az úttesten álldogálni. Ha lehet, a járművet húzd félre, és mindenki menjen a szalagkorlát mögé.'
        },
        {
          title: 'Kell-e rendőr?',
          text: '**Rendőrt kell hívni (112)**, ha:\n- **személyi sérülés** történt (akár csak könnyű sérülés is),\n- valamelyik fél **ittasnak** tűnik, nincs jogosítványa, vagy **elhagyta** a helyszínt (cserbenhagyás),\n- a felek **nem tudnak megegyezni** abban, ki a hibás,\n- **külföldi** rendszámú autó vagy **közúti tárgy** (oszlop, korlát, tábla) sérült, illetve ismeretlen a másik fél.\n\n**Kisebb anyagi káros koccanásnál**, ha nincs sérült, és a felek **egyetértenek** a történtekben, nem kell rendőr: elég kitölteni az **Európai baleseti bejelentőt**.\n\nA helyszínről **készíts fotókat**: a járművek helyzetét (mielőtt elmozdítjátok őket, ha a forgalom engedi), a sérüléseket közelről és távolról, a rendszámokat, a féknyomokat, a közlekedési táblákat. Kérd el a **tanúk** elérhetőségét.'
        },
        {
          title: 'Az Európai baleseti bejelentő',
          text: 'Egységes, **kétoldalas, indigós** nyomtatvány (a kötelező biztosítás mellé ad a biztosító, vagy letölthető; tarts egyet a kesztyűtartóban!). Létezik **elektronikus** változata is (például a biztosítók szövetsége, a MABISZ e-kárbejelentő alkalmazása), amelyet a két fél a telefonján tölt ki.\n\n**Kitöltés:**\n- Felső rész: **dátum, idő, helyszín**, sérült-e valaki, tanúk.\n- „A” és „B” oszlop: a két jármű, a **vezetők**, az **üzembentartók** és a **biztosítók** adatai (biztosító neve, kötvényszám).\n- **Körülmények**: a középső oszlop jelölőnégyzeteivel jelöld, mit csinált az egyes jármű (pl. „hátulról nekiment”, „sávot váltott”), és írd le, **hány** négyzetet jelöltél.\n- **Helyszínrajz**: az utak, a járművek helyzete és iránya, a táblák.\n- **Ütközési pont** a járműrajzon, a látható sérülések.\n- **Aláírás**: mindkét vezető aláírja; mindenki megkap egy példányt.\n\n**Amit ne tegyél:** ne írj alá olyat, amivel **nem értesz egyet**, és utólag ne írj bele a már aláírt példányba. Ha vita van, írd be az észrevételeidet, vagy hívj rendőrt.'
        },
        {
          title: 'Kárbejelentés és kárrendezés',
          text: 'A **kötelező gépjármű-felelősségbiztosítás** (KGFB) a **károkozó** biztosítása, és a **másik félnek** okozott kárt fizeti (a sajátodat nem). A saját autód kárát a **casco** téríti, ha van.\n\n- **Ha te vagy a károkozó**: a gépjármű-felelősségbiztosításról szóló **2009. évi LXII. törvény** szerint a káreseményt **5 munkanapon belül** írásban be kell jelentened a saját KGFB-biztosítódnak.\n- **Ha te vagy a károsult**: a kárt a **károkozó biztosítójánál** jelented be (a bejelentő alapján); érdemes minél előbb. A biztosító **kárszakértőt** küld vagy fotós kárfelvételt kér, és döntés után fizet.\n- A KGFB-kár a károkozó **bonus-malus** besorolását rontja: a következő években drágább lesz a biztosítása.\n\nKülföldi balesetnél: a nemzetközi **zöldkártya** és az Európai baleseti bejelentő ott is használható; a hazai kárrendezési képviselőnél is intézhető az ügy.',
          tip: 'A KGFB és a casco alapjai: [[#/lecke/penz-mindennap/biztositasok|Biztosítások]]. A jogosítvány és a közlekedési alapok: [[#/lecke/felnott-elet/kozlekedes|Közlekedés]].'
        }
      ],
      quiz: [
        { q: 'Mikor kötelező rendőrt hívni egy autóbaleset után?', options: ['Ha valaki megsérült', 'Ha csak a lökhárító karcolódott meg, és egyetértetek', 'Soha', 'Ha esik az eső'], answer: 0, explain: 'Személyi sérülés esetén mindig rendőr kell; kisebb, vitatlan anyagi kárnál elég a baleseti bejelentő.' },
        { q: 'Mit ne tegyél az Európai baleseti bejelentővel?', options: ['Ne rajzolj helyszínrajzot', 'Ne írj alá olyat, amivel nem értesz egyet', 'Ne add meg a biztosítód nevét', 'Ne tarts belőle a kocsiban'], answer: 1, explain: 'Az aláírt bejelentő a kárrendezés alapja; vitatott helyzetben inkább rendőrt hívj.' },
        { q: 'Kinek a biztosítója fizeti a károsult autójának kárát egy KGFB-ügyben?', options: ['A károsult saját KGFB-je', 'A károkozó KGFB-biztosítója', 'Az állam', 'A rendőrség'], answer: 1, explain: 'A KGFB a károkozó felelősségét biztosítja, vagyis a másik félnek okozott kárt téríti.' },
        { q: 'Hány munkanapon belül kell a károkozónak bejelentenie a kárt a saját KGFB-biztosítójának?', options: ['1', '5', '30', '90'], answer: 1, explain: 'A Gfbt. szerint 5 munkanapon belül, írásban.' },
        { q: 'Mikor kötelező a láthatósági mellény kiszálláskor?', options: ['Csak a lakott területen belül nappal', 'Lakott területen kívül, korlátozott látási viszonyok között', 'Soha', 'Csak motorosoknak'], answer: 1, explain: 'Éjjel, ködben lakott területen kívül kötelező, de máskor is ajánlott.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'papirmunka',
      title: 'Papírmunka és határidők: mit meddig őrizz meg, hogyan ne felejts el semmit',
      level: 1, minutes: 12,
      summary: 'Személyes irattár papíron és digitálisan, mit meddig érdemes megőrizni (adó, bér, számla, jótállás), egy éves határidőnaptár, és egyszerű időgazdálkodási módszerek a hétköznapi teendőkre.',
      tags: ['iratok', 'irattár', 'iratmegőrzés', 'elévülés', '5 év', 'számla', 'bérpapír', 'adóbevallás', 'jótállási jegy', 'határidő', 'naptár', 'emlékeztető', 'Eisenhower-mátrix', 'teendőlista', 'két perc szabály', 'időgazdálkodás'],
      sections: [
        {
          title: 'Egy egyszerű irattár',
          text: 'Nem kell bonyolult rendszer, de **egy helyen** legyen minden:\n\n- **Papíron**: egy dobozos irattartó vagy néhány **regiszteres** mappa témánként: „Személyes okmányok” (másolatok), „Munka és bér”, „Adó”, „Bank”, „Lakás és rezsi”, „Egészség”, „Autó”, „Jótállások”, „Iskola”.\n- **Digitálisan**: ugyanez a mappaszerkezet a felhőben (biztonsági mentéssel!). A **papíralapú** fontos iratokról készíts **szkennelt** vagy fotózott másolatot, az elektronikus számlákat (PDF) mentsd ugyanide.\n- **Fájlnevek**: `2026-03-15_villanyszamla_MVM.pdf`: a dátummal kezdődő név magától időrendbe rendeződik.\n\nAz eredeti **személyes okmányokat** (útlevél, születési anyakönyvi kivonat, bizonyítványok) száraz, biztonságos helyen tartsd, és ne hordd magadnál feleslegesen.',
          tip: 'Az okmányok érvényességéről: [[#/lecke/felnott-elet/okmanyok|Okmányok]].'
        },
        {
          title: 'Mit meddig őrizz meg?',
          text: 'Az általános **polgári jogi elévülési idő 5 év** (Ptk.), és az **adó** megállapításához való jog is általában annak a naptári évnek az utolsó napjától számított **5 év** alatt évül el, amelyben a bevallást be kellett nyújtani. Ebből egy praktikus lista:\n\n- **Adóbevallás** és alapbizonylatai (pl. igazolások): legalább **5 év** + az adott év (biztonságból 6 évig).\n- **Közüzemi számlák, befizetések igazolása**: **5 év** (egy vitás tartozásnál ez bizonyít).\n- **Bérpapírok, munkaszerződés, munkáltatói igazolások**: a **nyugdíjig** érdemes megőrizni (a szolgálati idő és a jövedelem igazolására).\n- **Jótállási jegy, számla** a tartós cikkekről: legalább a **jótállás és a szavatosság végéig** (2–3 év).\n- **Bérleti szerződés, átadás-átvételi jegyzőkönyv**: a bérlet végéig + a kaució rendezéséig, utána még néhány évig.\n- **Iskolai bizonyítványok, oklevelek, orvosi zárójelentések**: **örökre**.\n- **Bankszámlakivonat**: legalább 5 évig (az elektronikus kivonatot a netbankból is letöltheted, de számla megszüntetése után már nem!).'
        },
        {
          title: 'Éves határidőnaptár',
          text: 'Vidd fel a telefonod **naptárába**, **ismétlődő** eseményként, **egy-két héttel előtte** emlékeztetővel:\n\n- **Május 20.**: szja-bevallás határideje (az e-SZJA tervezet márciustól elérhető; lásd: [[#/lecke/penz-mindennap/szja-bevallas|Az szja-bevallás]]).\n- **Biztosítási évforduló** (KGFB, lakásbiztosítás): előtte érdemes ajánlatokat összehasonlítani.\n- **Okmányok lejárata**: személyi igazolvány, útlevél, jogosítvány (az utazás előtt hónapokkal nézd meg!).\n- **Előfizetések** megújulása, **ingyenes próbaidőszakok** vége (különben fizetőssé válnak).\n- **Hűségidő** vége (internet, mobil): ilyenkor lehet jobb ajánlatot kérni.\n- **Műszaki vizsga** lejárata, ha van autód.\n- **Gázkészülék** éves átvizsgálása, **kémény**ellenőrzés.\n- **Szűrővizsgálatok**, fogorvos (évente).\n- **Születésnapok**: ezek is határidők!'
        },
        {
          title: 'Teendők kezelése: Eisenhower és a két perc szabály',
          text: 'A tanulás időbeosztását a [[#/lecke/haztartas/idobeosztas-tanulas|Időbeosztás és a tanulás tanulása]] lecke tárgyalja; itt a hétköznapi **teendőkről** van szó.\n\n**Eisenhower-mátrix:** minden feladatot két kérdés alapján négy csoportba sorolsz:\n- **Fontos és sürgős** → csináld meg **most** (lejáró határidő, csöpögő cső).\n- **Fontos, de nem sürgős** → **tervezd be** a naptárba (megtakarítás, egészség, tanulás). Ez a csoport dönti el hosszú távon az életminőséget, mégis ez marad el a legtöbbször.\n- **Sürgős, de nem fontos** → **add át** vagy intézd el gyorsan (sok e-mail, telefon).\n- **Se nem fontos, se nem sürgős** → **hagyd el** (céltalan görgetés).\n\n**Két perc szabály:** ami **két percnél rövidebb** (egy válasz e-mail, egy számla befizetése, egy irat lefűzése), azt **azonnal** csináld meg, ne írd listára.\n\n**Heti áttekintés:** hetente egyszer 15 perc: nézd át a naptárt, a listát, a beérkezett leveleket és a befizetendő számlákat. Ennyi elég ahhoz, hogy ne érjen meglepetés.',
          widget: { type: 'parositas', options: { title: 'Eisenhower-mátrix: hová tartozik?', pairs: [
            ['Holnap lejár a jelentkezési határidő', 'Fontos és sürgős: most'],
            ['Rendszeres megtakarítás elindítása', 'Fontos, nem sürgős: tervezd be'],
            ['Egy kollégád azonnal kér egy apróságot', 'Sürgős, nem fontos: gyorsan vagy add át'],
            ['Céltalan videónézés', 'Se nem fontos, se nem sürgős: hagyd el']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mennyi az általános polgári jogi elévülési idő Magyarországon?', options: ['1 év', '3 év', '5 év', '10 év'], answer: 2, explain: 'A Ptk. szerint a követelések általában 5 év alatt évülnek el.' },
        { q: 'Meddig érdemes megőrizni a bérpapírokat és a munkáltatói igazolásokat?', options: ['1 hónapig', 'A következő adóbevallásig', 'A nyugdíjig', 'Egyáltalán nem kell'], answer: 2, explain: 'A szolgálati idő és a jövedelem igazolásához a nyugdíj megállapításakor is szükség lehet rájuk.' },
        { q: 'Mit mond a két perc szabály?', options: ['Két percig gondolkozz minden döntésen', 'Ami két percnél rövidebb, azt azonnal csináld meg', 'Minden feladatra két percet szánj', 'Két percenként tarts szünetet'], answer: 1, explain: 'A rövid feladatok listára írása és nyilvántartása több időt vesz igénybe, mint elvégezni őket.' },
        { q: 'Az Eisenhower-mátrix melyik csoportja marad el a legtöbbször, pedig hosszú távon ez a legfontosabb?', options: ['Fontos és sürgős', 'Fontos, de nem sürgős', 'Sürgős, de nem fontos', 'Se nem fontos, se nem sürgős'], answer: 1, explain: 'Ezeknek nincs határideje, ezért mindig a sürgős dolgok szorítják ki őket.' },
        { q: 'Miért jó, ha a fájlnév dátummal kezdődik (pl. 2026-03-15_szamla.pdf)?', options: ['Mert így rövidebb', 'Mert betűrendben magától időrendbe rendeződik', 'Mert kötelező', 'Mert így nem lehet törölni'], answer: 1, explain: 'Az év-hónap-nap formátum betűrendben egyben időrend is.' }
      ]
    }
  ]
});

/* Hibakereső döntési fák (js/hibakereses.js formátum) – a felsorolt leckék végén jelennek meg. */
STUDIE.addTrouble({
  id: 'rosszul-lett',
  title: 'Valaki rosszul lett mellettem',
  lessons: ['tulelotudas/rosszullet', 'tulelotudas/serulesek'],
  intro: 'Haladj végig a kérdéseken. Ez gyakorló döntési fa, nem helyettesíti a mentésirányító utasításait: valódi vészhelyzetben **azonnal hívd a 112-t**, és csináld, amit mond.',
  start: 'biztonsag',
  nodes: {
    biztonsag: { q: 'Biztonságos odamenni hozzá? (forgalom, áram, tűz, gáz)', answers: [
      { t: 'Igen, biztonságos', next: 'reagal' },
      { t: 'Nem, veszélyes a helyszín', next: 'r_veszely' }] },
    reagal: { q: 'Megszólítod, óvatosan megrázod a vállát. Reagál?', answers: [
      { t: 'Nem reagál', next: 'legzik' },
      { t: 'Reagál, beszél', next: 'tunet' }] },
    legzik: { q: 'Légutat nyitsz (fej hátrahajtása, áll emelése). Normálisan lélegzik? (max. 10 másodpercig figyeld)', answers: [
      { t: 'Igen, normálisan lélegzik', next: 'r_oldalfekves' },
      { t: 'Nem lélegzik, vagy csak hörögve kapkod', next: 'r_ujraelesztes' }] },
    tunet: { q: 'Mi a legfeltűnőbb tünet?', answers: [
      { t: 'Szorító mellkasi fájdalom, hideg verejték', next: 'r_infarktus' },
      { t: 'Lógó szájzug, lesüllyedő kar, zavaros beszéd', next: 'r_stroke' },
      { t: 'Cukorbeteg, remeg, verejtékezik, zavart', next: 'r_hipo' },
      { t: 'Nehézlégzés, duzzadó nyelv, csalánkiütés (pl. csípés után)', next: 'r_anafilaxia' },
      { t: 'Rángatózott, most álmos, zavart', next: 'r_roham' }] },
    r_veszely: { result: 'Ne menj oda: ne válj te is sérültté!', fix: 'Hívd a **112**-t, mondd el, mit látsz és hol. Ha lehet, szüntesd meg a veszélyt távolról (pl. áramtalanítás a kismegszakítónál), és figyelmeztesd a többieket.', level: 'bad' },
    r_oldalfekves: { result: 'Eszméletlen, de lélegzik: stabil oldalfekvés', fix: 'Fektesd **stabil oldalfekvésbe**, hívd a **112**-t, és **folyamatosan figyeld** a légzését. Ha leáll, kezdd az újraélesztést.', level: 'warn' },
    r_ujraelesztes: { result: 'Valószínű szívmegállás: újraélesztés!', fix: '**112** (kihangosítva), kérj **AED**-t, és kezdd a **mellkaskompressziót**: 100–120/perc, 5–6 cm mélyen, 30:2 arányban vagy folyamatosan. Ne hagyd abba, amíg a mentő át nem veszi.', level: 'bad' },
    r_infarktus: { result: 'Szívinfarktus gyanúja', fix: '**112**. Ültesd le félig ülő helyzetbe, ne járkáljon. Ha nem allergiás, és a mentésirányító nem mond mást: **300 mg aszpirin** rágva (ERC 2025). Figyeld a légzését.', level: 'bad' },
    r_stroke: { result: 'Stroke gyanúja (FAST)', fix: '**112** azonnal, és **jegyezd meg az időpontot**, amikor a tünetek kezdődtek. Ne adj enni, inni, gyógyszert.', level: 'bad' },
    r_hipo: { result: 'Alacsony vércukor (hipoglikémia) gyanúja', fix: 'Ha **ébren van és tud nyelni**: 15–20 g szőlőcukor vagy cukros üdítő. Ha 10–15 perc alatt nem javul, vagy romlik: **112**.', level: 'warn' },
    r_anafilaxia: { result: 'Súlyos allergiás reakció (anafilaxia) gyanúja', fix: '**112**, mondd ki: „anafilaxia”. Ha van **adrenalin autoinjektora**, segíts beadni a comb külső oldalába.', level: 'bad' },
    r_roham: { result: 'Valószínűleg epilepsziás roham után van', fix: 'Stabil oldalfekvés, maradj mellette. **112**, ha a roham 5 percnél tovább tartott, megismétlődött, megsérült, nem tér magához, vagy ez volt az első rohama.', level: 'warn' }
  }
});

STUDIE.addTrouble({
  id: 'gyanus-uzenet',
  title: 'Gyanús hívás vagy üzenet: csalás?',
  lessons: ['tulelotudas/csalasok', 'tulelotudas/atvertek'],
  intro: 'Kaptál egy furcsa SMS-t, e-mailt vagy hívást? Haladj végig a kérdéseken.',
  start: 'mit',
  nodes: {
    mit: { q: 'Mit kérnek tőled?', answers: [
      { t: 'Kattints egy linkre (csomag, vám, jelszó, visszatérítés)', next: 'link' },
      { t: 'Utalj pénzt, vagy adj át készpénzt', next: 'penz' },
      { t: 'Mondj be egy kódot, jelszót, vagy telepíts egy appot', next: 'r_kod' },
      { t: 'Semmit, csak tájékoztatnak', next: 'r_ok' }] },
    link: { q: 'Rákattintottál, és megadtál valamilyen adatot?', answers: [
      { t: 'Nem, még nem', next: 'r_link_nem' },
      { t: 'Igen, a kártyaadataimat', next: 'r_kartya' },
      { t: 'Igen, egy jelszót', next: 'r_jelszo' }] },
    penz: { q: 'Ki kéri a pénzt?', answers: [
      { t: 'Egy „hozzátartozó” új számról, vagy egy „rendőr”', next: 'r_unoka' },
      { t: 'A „bank biztonsági osztálya”', next: 'r_kod' },
      { t: 'Egy befektetési „bróker” vagy egy online megismert partner', next: 'r_befektetes' }] },
    r_ok: { result: 'Valószínűleg nincs teendő, de légy óvatos', fix: 'Ha később linket, kódot vagy pénzt kérnek, gyanakodj. Ha bizonytalan vagy, a szolgáltató **hivatalos appjában** nézd meg az ügyet.', level: 'ok' },
    r_link_nem: { result: 'Valószínűleg adathalászat', fix: 'Ne kattints! Töröld az üzenetet, vagy jelentsd spamként. Ha tényleg vársz csomagot, a futárcég **hivatalos appjában** nézd meg.', level: 'warn' },
    r_kartya: { result: 'A kártyaadataid csalókhoz kerülhettek', fix: '**Azonnal tiltsd le a kártyát** az appban vagy telefonon, hívd a bankot, és nézd át a terheléseket. Utána feljelentés a rendőrségen.', level: 'bad' },
    r_jelszo: { result: 'A fiókod veszélyben van', fix: 'Azonnal **változtasd meg a jelszót** (és mindenhol, ahol ugyanazt használtad), kapcsold be a **kétfaktoros azonosítást**, és jelentkeztess ki minden más eszközt.', level: 'bad' },
    r_kod: { result: 'Szinte biztosan csalás (hamis banki hívás)', fix: 'A bank **soha** nem kér PIN-t, jelszót, SMS-kódot, és nem kér távsegítő appot. **Tedd le**, és hívd vissza a bankot a kártyád hátoldalán lévő számon.', level: 'bad' },
    r_unoka: { result: 'Valószínűleg „unokázós” csalás', fix: 'Ne fizess! Hívd vissza a hozzátartozót a **régi, ismert** számán. A rendőrség soha nem kér pénzt egy ügy elintézéséért. Ha gyanús, hívd a 112-t.', level: 'bad' },
    r_befektetes: { result: 'Valószínűleg befektetési vagy romantikus csalás', fix: 'Ne utalj többet! A garantált magas hozam nem létezik; nézd meg az **MNB** figyelmeztető listáját. Ha már utaltál: bank, feljelentés, és vigyázz a „pénzvisszaszerzőkre”.', level: 'bad' }
  }
});

STUDIE.addTrouble({
  id: 'viz-folyik',
  title: 'Víz folyik valahol a lakásban',
  lessons: ['tulelotudas/csap-wc', 'tulelotudas/otthoni-veszhelyzet'],
  intro: 'Haladj végig a kérdéseken: a cél, hogy gyorsan megállítsd a kárt, és eldöntsd, megoldhatod-e magad.',
  start: 'mennyi',
  nodes: {
    mennyi: { q: 'Mennyi víz folyik?', answers: [
      { t: 'Ömlik, gyorsan terjed', next: 'r_omlik' },
      { t: 'Csöpög vagy szivárog', next: 'honnan' },
      { t: 'Felülről (plafonról) ázik', next: 'r_felulrol' }] },
    honnan: { q: 'Honnan jön a víz?', answers: [
      { t: 'A csap kifolyójából csöpög zárt állásban', next: 'r_betet' },
      { t: 'A WC-csészébe folyik folyamatosan', next: 'r_wc' },
      { t: 'A mosdó/mosogató alatti szifonnál', next: 'r_szifon' },
      { t: 'A falból, a csaptelep tövéből vagy a padló alól', next: 'r_fal' }] },
    r_omlik: { result: 'Csőtörés vagy elszakadt bekötőcső', fix: 'Azonnal **zárd el** a legközelebbi sarokszelepet, ha nem elég, a **főcsapot**. Ha a víz elektromos eszközök közelébe ér, kapcsold le az áramot (ha nem kell vízben állnod). Utána: fotók, szomszéd, tulajdonos, biztosító, vízszerelő.', level: 'bad', pro: true },
    r_felulrol: { result: 'Beázás a felső szomszédtól vagy a tetőről', fix: 'Tegyél alá edényt, védd az elektromos eszközöket, csengess fel a szomszédhoz. Ha nem nyitnak ajtót: közös képviselő, végső esetben 112. Fotózz, és jelentsd a biztosítónak.', level: 'warn' },
    r_betet: { result: 'Elkopott a csapbetét vagy tömítés', fix: 'Vizet elzárni, kart levenni, a **kerámiabetétet** kicserélni (a régit vidd a boltba mintának). Ha nem mered, vízszerelő.', level: 'ok' },
    r_wc: { result: 'Ereszt a WC-tartály öblítő- vagy töltőszelepe', fix: 'Nézd meg a tartályban: túl magas a vízszint (úszó állítása), vagy vízköves a tömítés (tisztítás, csere). Ételfestékkel tesztelheted.', level: 'ok' },
    r_szifon: { result: 'Laza vagy rosszul illeszkedő szifon', fix: 'Tegyél alá vödröt, csavard le kézzel a szifont, nézd meg a tömítőgyűrűt, tisztítsd ki, és csavard vissza kézzel szorosra.', level: 'ok' },
    r_fal: { result: 'Rejtett csőhiba vagy a csaptelep bekötése ereszt', fix: 'Zárd el a vizet, és hívj **vízszerelőt**. Albérletben azonnal értesítsd a tulajdonost írásban is.', level: 'bad', pro: true }
  }
});
