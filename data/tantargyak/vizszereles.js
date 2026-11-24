/* Tantárgy: Víz-, gáz- és fűtésszerelés */
STUDIE.addSubject({
  id: 'vizszereles',
  stage: 'szakma',
  title: 'Víz-, gáz- és fűtésszerelés',
  icon: '🚰',
  color: '#2f7bf6',
  description: 'Vízóra, csövek, lefolyók, radiátorok és a gáz biztonsága: a ház „ereinek” működése érthetően.',
  intro: 'Ez a tananyag a víz-, gáz- és fűtésszerelés **alapjait** tanítja meg: hogyan jut be a víz a házba, milyen csövekből és kötésekből épül a rendszer, hogyan távozik a szennyvíz, és hogyan működik a központi fűtés. A **gázszerelést csak elméletben** tárgyaljuk: gázvezetéken és gázkészüléken kizárólag jogosultsággal rendelkező gázszerelő dolgozhat.',
  lessons: [
    {
      id: 'viz-a-hazban',
      title: 'Víz a házban',
      level: 1, minutes: 10,
      summary: 'Honnan jön a víz, mit csinál a vízóra és a főelzáró, és mekkora nyomás kell a csapban.',
      tags: ['vízóra', 'vízmérő', 'főelzáró', 'víznyomás', 'bar', 'nyomáscsökkentő', 'hidegvíz', 'melegvíz', 'cirkuláció', 'bojler'],
      sections: [
        {
          title: 'A bekötéstől a csapig',
          text: 'Az ivóvíz a közterületi **vízvezeték-hálózatból** egy bekötővezetéken érkezik a telekre. A telekhatár közelében, egy **vízmérőaknában** (vagy a pincében) található:\n\n1. a **vízmérő előtti elzáró** (ez a szolgáltató szerelvénye),\n2. a **vízmérő (vízóra)**, ami köbméterben (m³) méri az elfogyasztott vizet,\n3. a **vízmérő utáni elzáró**, ez a ház **főelzárója**,\n4. sokszor egy **visszacsapó szelep**, ami megakadályozza, hogy a házi víz visszafolyjon a közhálózatba.\n\nInnen indul a házi hálózat a fogyasztók (csapok, WC, mosógép, bojler) felé.',
          tip: 'Tudd, hol van a főelzáró! Csőtörésnél az első és legfontosabb lépés a víz elzárása. Érdemes évente egyszer megmozgatni, hogy ne rozsdásodjon be.'
        },
        {
          title: 'Mennyi a víznyomás?',
          text: 'A víznyomást **bar**-ban mérjük. `1 bar ≈ 10 méteres vízoszlop` nyomása, vagyis 1 bar nyomás kb. 10 méter magasra képes felnyomni a vizet.\n\n- A közhálózat nyomása helytől függően jellemzően **2–6 bar** között van.\n- Lakásban kényelmes és a szerelvényeknek is jó a **kb. 3 bar** (2,5–4 bar).\n- **Túl kicsi** nyomásnál gyenge a zuhany, nem működik jól a gázos átfolyós vízmelegítő.\n- **Túl nagy** nyomás (kb. 5–6 bar felett) zajos, csapkodó csapokat, csöpögő szerelvényeket és tönkremenő flexibilis bekötőcsöveket okoz.\n\nNagy hálózati nyomásnál a vízóra után **nyomáscsökkentőt** szerelnek be: ez a beállított értékre (pl. 3 bar) csökkenti és állandó szinten tartja a ház nyomását.',
          widget: { type: 'gyakorlas', options: { kind: 'mertekegyseg', title: 'Mértékegység-gyakorló', help: 'A vízszerelő folyton vált: liter, köbméter, deciliter. Gyakorold az átváltásokat!' } }
        },
        {
          title: 'Hideg és meleg ág',
          text: 'A házi hálózat két fő ágra válik:\n\n- **Hidegvíz-ág**: közvetlenül a hálózatról, jelölése általában **kék**.\n- **Melegvíz-ág**: a vízmelegítő (villanybojler, gázkazán, hőszivattyús tároló) után, jelölése általában **piros**.\n\nA csaptelepen a meleg víz **balra**, a hideg **jobbra** van. Nagyobb házakban **cirkulációs vezeték** is van: egy kis szivattyú folyamatosan keringeti a meleg vizet, így a csapból azonnal meleg víz jön, és nem kell kifolyatni a kihűlt vizet.\n\nA tárolós vízmelegítő (bojler) hidegvíz-bekötésébe kötelező a **biztonsági szelep**: ha a felmelegedő víz tágulása miatt a nyomás túl nagy lenne, kis mennyiségű vizet enged le. Ezért csöpöghet melegítés közben, és ez rendben van.',
          warn: 'A bojler biztonsági szelepét soha ne iktasd ki és ne dugaszold el! Nélküle a tartály a nyomástól szétrepedhet.'
        },
        {
          title: 'Higiénia: a meleg víz hőmérséklete',
          text: 'A pangó, langyos vízben (kb. 25–45 °C) elszaporodhat a **Legionella** baktérium, ami súlyos tüdőgyulladást okozhat. Ezért a melegvíz-tárolót érdemes **60 °C** körüli hőmérsékleten tartani, és a ritkán használt csapokat időnként átöblíteni. A forrázás elkerülésére a csapoknál termosztatikus keverő segíthet.'
        }
      ],
      quiz: [
        { q: 'Kb. mekkora vízoszlop nyomásának felel meg 1 bar?', options: ['1 méter', '10 méter', '100 méter', '0,1 méter'], answer: 1, explain: '1 bar ≈ 10 m vízoszlop. Egy 3 bar-os hálózat tehát kb. 30 méter magasra tudná felnyomni a vizet.' },
        { q: 'Mi a nyomáscsökkentő feladata?', options: ['Méri az elfogyasztott vizet', 'Felmelegíti a vizet', 'A túl nagy hálózati nyomást egy beállított, állandó értékre csökkenti', 'Megakadályozza a vízkő lerakódását'], answer: 2, explain: 'A nyomáscsökkentő védi a házi szerelvényeket a túl nagy nyomástól.' },
        { q: 'Miért csöpöghet a bojler biztonsági szelepe felfűtés közben?', options: ['Mert a melegedő víz tágul, és a szelep leengedi a többletnyomást', 'Mert biztosan elromlott', 'Mert túl hideg a víz', 'Mert kevés a hálózati nyomás'], answer: 0, explain: 'A víz melegítéskor tágul. Kis csöpögés felfűtéskor normális, folyamatos folyás viszont hibát jelez.' }
      ]
    },
    {
      id: 'csovek-kotesek',
      title: 'Csövek és kötések',
      level: 1, minutes: 12,
      summary: 'Réz, horganyzott acél, műanyag és ötrétegű cső: mit hol használnak, és hogyan kötik össze őket.',
      tags: ['rézcső', 'horganyzott acél', 'PPR', 'KPE', 'ötrétegű cső', 'préselés', 'polifúziós hegesztés', 'menetes kötés', 'kenderkóc', 'teflonszalag', 'forrasztás'],
      sections: [
        {
          title: 'Csőanyagok',
          text: '- **Horganyzott acélcső**: régi házakban gyakori, menetes kötésekkel. Idővel belülről rozsdásodik, szűkül, és rozsdás vizet adhat. Ma ivóvízre ritkán szerelik új rendszerbe.\n- **Rézcső**: tartós, hőálló, vékony falú. Forrasztással vagy préseléssel kötik. Fűtésre és ivóvízre is jó.\n- **PPR (polipropilén)**: olcsó, korrózióálló műanyag cső, **polifúziós hegesztéssel** kötik. Hidegre és melegre is van belőle (a melegvízes falvastagabb vagy erősített).\n- **KPE (kemény polietilén)**: fekete, kék csíkos cső, főleg **földbe** fektetett vezetékekhez (pl. bekötővezeték, kerti locsoló), gyorskötő idomokkal.\n- **Ötrétegű (alumínium-betétes) cső**: kívül-belül műanyag, közte vékony alumíniumréteg. Hajlítható, de megtartja az alakját, és kevésbé tágul a hőtől. Préseléssel kötik, lakásokban nagyon elterjedt víz- és fűtésszerelésre.'
        },
        {
          title: 'Kötési módok',
          text: '- **Menetes kötés**: a külső és belső menetet egymásba csavarják. A menetet **tömíteni** kell: hagyományosan **kenderkóccal** és tömítőpasztával, vagy **teflonszalaggal**, illetve menettömítő zsinórral.\n- **Préselés**: a csővégre idomot tolnak, majd préslogóval (présszerszámmal) körbenyomják. Gyors, láng nélküli, megbízható. Csak az idomgyártó által előírt pofaprofillal szabad préselni.\n- **Polifúziós hegesztés (PPR)**: a csővéget és az idomot kb. 260 °C-os hegesztőtüskén megolvasztják, majd összetolják, és a két anyag egybeolvad.\n- **Forrasztás (réz)**: lágyforrasztás (ón) vízvezetékhez, keményforrasztás nagyobb igénybevételre. Nyílt lánggal jár, ezért tűzvédelmi figyelmet igényel.\n- **Roppantógyűrűs (kompressziós) kötés**: a csavaranya egy gyűrűt nyom rá a csőre; gyakori sarokszelepeknél.',
          tip: 'Teflonszalagot a menet irányában (a becsavarás irányába) tekerj, különben csavaráskor letekeredik.'
        },
        {
          title: 'Hőtágulás és rögzítés',
          text: 'A csövek melegedéskor hosszabbodnak. A műanyag csövek sokkal jobban tágulnak, mint a fém vagy az ötrétegű cső, ezért a hosszú melegvizes és fűtési szakaszokat **fix pontokkal** és **csúszó bilincsekkel** rögzítik, és teret hagynak a mozgásra (pl. kompenzáló ívek). Ha ez elmarad, a cső kihajlik, pattog, vagy megsérülnek a kötések.',
          warn: 'Különböző fémek (pl. réz és horganyzott acél) közvetlen összekötése korróziót okozhat. Ilyenkor szigetelő idomot vagy megfelelő átmenetet kell használni, és rézcső után ne kövessen a folyásirányban horganyzott acél.'
        }
      ],
      quiz: [
        { q: 'Hogyan kötik a PPR csöveket?', options: ['Forrasztással', 'Polifúziós hegesztéssel', 'Ragasztással', 'Kenderkócos menettel'], answer: 1, explain: 'A PPR csövet és idomot hegesztőtüskén megolvasztják és egybeolvasztják.' },
        { q: 'Mivel tömítenek hagyományosan menetes kötést?', options: ['Szilikonnal', 'Kenderkóccal és tömítőpasztával', 'Ragasztószalaggal', 'Semmivel, a menet magától tömít'], answer: 1, explain: 'A kenderkóc + paszta vagy a teflonszalag tölti ki a menetek közti rést.' },
        { q: 'Melyik cső jellemzően földbe fektetett, kék csíkos fekete cső?', options: ['Rézcső', 'Ötrétegű cső', 'KPE cső', 'PPR cső'], answer: 2, explain: 'A KPE (kemény polietilén) cső jól bírja a földbe fektetést, ezért bekötővezetéknek és kerti vezetéknek használják.' }
      ]
    },
    {
      id: 'szennyviz',
      title: 'Szennyvíz és lefolyók',
      level: 2, minutes: 12,
      summary: 'Lejtés, bűzzár, szellőzés és csőátmérők: miért nem büdös egy jól megépített fürdőszoba.',
      tags: ['szennyvíz', 'lefolyó', 'lejtés', 'bűzzár', 'szifon', 'strang', 'ejtővezeték', 'szellőzés', 'légbeszívó szelep', 'KG cső', 'HT cső', 'dugulás'],
      sections: [
        {
          title: 'A szennyvíz a gravitációval folyik',
          text: 'Az ivóvíz nyomás alatt érkezik, a szennyvíz viszont **nyomás nélkül, a gravitáció hatására** távozik. Ezért a lefolyócsöveknek **lejteniük** kell a strang (függőleges ejtővezeték) felé.\n\n- Lakáson belüli vízszintes lefolyóknál tipikusan **1–2%** lejtés kell, gyakran **2%**, ami méterenként **2 cm** esés.\n- Túl kicsi lejtésnél a szilárd anyag leülepszik és dugulást okoz.\n- Túl nagy lejtésnél a víz „elszalad” a szilárd anyag elől, és szintén lerakódás lehet.\n\nA pontos értéket a szabvány és a gyártó adja meg, a csőátmérőtől függően.',
          tip: 'Egy 3 méteres, 2%-os lejtésű szakasz eleje és vége között `3 m · 0,02 = 0,06 m = 6 cm` a szintkülönbség.'
        },
        {
          title: 'A bűzzár (szifon)',
          text: 'Minden lefolyó után van egy **bűzzár (szifon)**: egy ívelt csőszakasz, amelyben mindig áll egy kevés víz. Ez a **vízzár** elzárja a csatornagázok útját, így a csatorna szaga nem jön fel a lakásba. A WC-csésze bűzzára be van építve a kerámiába.\n\nHa egy lefolyót hónapokig nem használnak, a víz elpárolog a szifonból, és büdös lesz. Megoldás: időnként önts bele vizet.'
        },
        {
          title: 'Szellőzés: miért kell levegő a csatornának?',
          text: 'Amikor a WC-t lehúzzák, a víz dugattyúként zúdul le a strangban. Ha nincs levegő-utánpótlás, a mögötte keletkező szívás **kiszívja a vizet a többi szifonból**: ez a gurgulázó hang, utána pedig jön a szag.\n\nEzért a strangot a **tető fölé kivezetik (strangszellőző)**, vagy ahol ez nem lehetséges, **légbeszívó szelepet** szerelnek rá, ami csak befelé enged levegőt.'
        },
        {
          title: 'Csőátmérők és anyagok',
          text: 'Jellemző lefolyó-átmérők (külső átmérő, mm):\n\n- **mosdó**: 32–40 mm\n- **mosogató, zuhany, kád, mosógép**: 40–50 mm\n- **WC**: 100–110 mm\n- **strang (ejtővezeték)**: legalább 100–110 mm, ha WC is rákötődik\n\nÉpületen belül általában szürke **HT (PP)** lefolyócsövet, a földben narancssárga **KG (PVC)** csatornacsövet használnak. A csövek tokos kötéssel, gumigyűrűs tömítéssel kapcsolódnak, a tok mindig a folyásiránnyal szemben (felfelé) néz.',
          warn: 'A lefolyó nem szemetes! Zsír, nedves törlőkendő, macskaalom és építési törmelék a leggyakoribb dugulásokozó.'
        }
      ],
      quiz: [
        { q: 'Mekkora szintkülönbség 4 méteren a 2%-os lejtés?', options: ['2 cm', '4 cm', '8 cm', '20 cm'], answer: 2, explain: '4 m · 0,02 = 0,08 m = 8 cm.' },
        { q: 'Mi a bűzzár (szifon) feladata?', options: ['Lassítja a víz folyását', 'Az álló vízzárral megakadályozza, hogy a csatornaszag a lakásba jusson', 'Kiszűri a hajszálakat', 'Növeli a víznyomást'], answer: 1, explain: 'A szifonban álló víz elzárja a csatornagázok útját.' },
        { q: 'Mi okozza, hogy WC-lehúzáskor gurgulázik a mosdó lefolyója?', options: ['Túl nagy víznyomás', 'Hiányzó vagy elégtelen strangszellőzés', 'Túl nagy csőátmérő', 'Hideg víz'], answer: 1, explain: 'Szellőzés nélkül a lezúduló víz kiszívja a többi szifon vizét.' },
        { q: 'Jellemzően mekkora a WC lefolyócsövének átmérője?', options: ['32 mm', '50 mm', '100–110 mm', '200 mm'], answer: 2, explain: 'A WC-hez 100–110 mm-es lefolyó kell a szilárd anyag miatt.' }
      ]
    },
    {
      id: 'futes',
      title: 'Központi fűtés',
      level: 2, minutes: 14,
      summary: 'Kazán, radiátor, padlófűtés, tágulási tartály, légtelenítés és beszabályozás.',
      tags: ['fűtés', 'kazán', 'kondenzációs kazán', 'radiátor', 'padlófűtés', 'tágulási tartály', 'légtelenítés', 'rendszernyomás', 'beszabályozás', 'termosztatikus szelep', 'keringető szivattyú', 'hőszivattyú'],
      sections: [
        {
          title: 'A fűtési kör',
          text: 'A központi fűtés egy **zárt körben keringő víz**:\n\n1. A **hőtermelő** (gázkazán, hőszivattyú, vegyestüzelésű kazán) felmelegíti a vizet.\n2. A **keringető szivattyú** az **előremenő** vezetéken eljuttatja a hőleadókhoz.\n3. A **radiátorok** vagy a **padlófűtés** leadják a hőt a helyiségnek.\n4. A lehűlt víz a **visszatérő** vezetéken visszajut a kazánba.\n\nA modern **kondenzációs gázkazán** az égéstermék vízgőzéből is visszanyeri a hőt, ezért akkor a leghatékonyabb, ha a visszatérő víz hideg (kb. 55 °C alatti).'
        },
        {
          title: 'Radiátor vagy padlófűtés?',
          text: '- **Radiátor**: kis felületen ad le hőt, ezért melegebb víz kell (régen 70–90 °C, ma gyakran 45–65 °C). Gyorsan reagál.\n- **Padlófűtés**: a teljes padló fűt, ezért elég az alacsony előremenő hőmérséklet (kb. 30–40 °C). Egyenletes, kellemes meleg, de lassan reagál. Hőszivattyúval és kondenzációs kazánnal ideális párost alkot.\n\nA padlófűtés köreit **osztó-gyűjtő** táplálja, ahol körönként szabályozható az átfolyás.'
        },
        {
          title: 'Rendszernyomás és tágulási tartály',
          text: 'Egy családi ház zárt fűtési rendszerének nyomása **hidegen kb. 1–2 bar** (gyakran 1,2–1,5 bar). Ezt a kazán nyomásmérője mutatja. Felfűtve a nyomás kicsit emelkedik, mert a víz tágul.\n\nA tágulást a **zárt, membrános tágulási tartály** veszi fel: egy gumimembrán választja el a vizet egy gázpárnától. Ha a gázpárna nyomása elfogy (a tartály „elfárad”), a nyomás felfűtéskor nagyon megugrik, lehűléskor nagyon leesik.\n\nHa a nyomás túl nagy lenne, a **biztonsági szelep** (jellemzően **3 bar**-os) kienged vizet.',
          warn: 'Ha a nyomás rendszeresen 1 bar alá esik, valahol víz távozik: szivárgás, csöpögő biztonsági szelep vagy hibás tágulási tartály. Ezt nem elég mindig utántölteni, meg kell keresni az okát.'
        },
        {
          title: 'Légtelenítés',
          text: 'A fűtővízben oldott levegő kiválik, és a rendszer legmagasabb pontjain, főleg a radiátorok tetején gyűlik össze. A levegős radiátor **felül hideg, alul meleg**, és csobogó hangot ad.\n\n1. Kapcsold ki a keringető szivattyút (kazánt), és várj pár percet, hogy a levegő felgyűljön.\n2. A radiátor felső sarkán lévő **légtelenítő szelepet** légtelenítő kulccsal óvatosan nyisd meg, alá tarts rongyot.\n3. Ha sziszegés után folyamatosan víz jön, zárd el.\n4. Ellenőrizd a kazán nyomásmérőjét, és ha kell, töltsd utána a rendszert az előírt értékre.',
          tip: 'Ha az emeleti radiátorok gyakran levegősek, a rendszer legmagasabb pontjára automata légtelenítő szelep való.'
        },
        {
          title: 'Hidraulikai beszabályozás',
          text: 'A víz a legkisebb ellenállás felé folyik. Beszabályozás nélkül a kazánhoz közeli radiátorok túl sok, a távoliak túl kevés meleg vizet kapnak: az egyik szoba túlfűtött, a másik hideg.\n\nA **hidraulikai beszabályozás** során a radiátorszelepek (vagy visszatérő csavarzatok) **előbeállításával** minden hőleadóhoz a szükséges vízmennyiséget állítják be. Ez komfortosabb, csendesebb és takarékosabb fűtést ad. A **termosztatikus radiátorfej** ezután helyiségenként tartja a kívánt hőmérsékletet.'
        }
      ],
      quiz: [
        { q: 'Kb. mekkora egy családi ház zárt fűtési rendszerének nyomása hidegen?', options: ['0,1–0,2 bar', '1–2 bar', '6–8 bar', '10 bar felett'], answer: 1, explain: 'Hidegen jellemzően 1–2 bar, a pontos értéket a kazán leírása és az épület magassága határozza meg.' },
        { q: 'Mit jelez, ha a radiátor felül hideg, alul meleg?', options: ['Levegős, légteleníteni kell', 'Túl nagy a nyomás', 'Eldugult a szifon', 'Kiégett a kazán'], answer: 0, explain: 'A levegő a radiátor tetején gyűlik össze, ott nem tud a meleg víz keringeni.' },
        { q: 'Mi a tágulási tartály feladata?', options: ['Melegvizet tárol', 'Felveszi a fűtővíz hőtágulását, így a nyomás nem ugrik meg', 'Szűri a vizet', 'Gázt tárol a kazánnak'], answer: 1, explain: 'A membrán mögötti gázpárna összenyomódik, és helyet ad a táguló víznek.' },
        { q: 'Miért elég padlófűtéshez alacsony előremenő hőmérséklet?', options: ['Mert nagy felületen adja le a hőt', 'Mert a padló jobban szigetel', 'Mert gyorsabban kering a víz', 'Mert nincs benne levegő'], answer: 0, explain: 'Nagy felület kis hőmérsékletkülönbséggel is sok hőt ad le.' }
      ]
    },
    {
      id: 'gaz-alapok',
      title: 'Gázszerelés alapjai (elmélet)',
      level: 2, minutes: 12,
      summary: 'Ki szerelhet gázt, hogyan ismered fel a szivárgást, mit tegyél gázszagnál, és miért életveszélyes a szén-monoxid.',
      tags: ['gáz', 'földgáz', 'PB-gáz', 'gázszivárgás', 'gázszag', 'szén-monoxid', 'CO', 'CO-érzékelő', 'gázszerelő', 'kémény', 'égéstermék'],
      sections: [
        {
          title: 'Gázhoz csak gázszerelő nyúlhat!',
          text: 'Gázvezetéket és gázkészüléket (kazán, tűzhely, konvektor, vízmelegítő) **kizárólag jogosultsággal rendelkező, nyilvántartott gázszerelő** építhet, cserélhet, javíthat vagy helyezhet át. A munkához sokszor **terv** és a **gázszolgáltató jóváhagyása**, a végén pedig **műszaki biztonsági ellenőrzés** kell.\n\nEz nem bürokrácia: egy rosszul meghúzott kötés robbanást, egy rosszul bekötött kazán szén-monoxid-mérgezést okozhat. Ebben a leckében csak azt tanulod meg, amit **mindenkinek** tudnia kell a biztonsághoz.',
          warn: 'Ne szerelj, ne bonts és ne „javíts” semmit gázvezetéken vagy gázkészüléken, még egy flexibilis bekötőcsövet sem!'
        },
        {
          title: 'A gáz tulajdonságai',
          text: '- A **földgáz** (főleg metán) **könnyebb a levegőnél**, ezért felfelé száll, a mennyezet alatt gyűlik.\n- A **PB-gáz** (propán-bután, palackos gáz) **nehezebb a levegőnél**: a padlón, pincében, aknában gyűlik össze.\n- Mindkettő önmagában szagtalan, ezért **szagosítják**: a jellegzetes „záptojás”, „hagymás” gázszag ettől van.\n- Levegővel keveredve bizonyos arányban **robbanóképes elegyet** alkotnak: ehhez egyetlen szikra (kapcsoló, csengő, telefon) is elég lehet.'
        },
        {
          title: 'Gázszag esetén: azonnal ezt tedd!',
          text: '1. **Ne kapcsolj** semmit: se villanykapcsolót, se csengőt, se elektromos készüléket. Ne húzz ki dugót sem.\n2. **Ne gyújts lángot**, ne dohányozz.\n3. Ha biztonságosan megteheted, **zárd el a gázt** a főcsapnál (gázmérő előtti elzáró).\n4. **Nyiss ablakot, ajtót**, szellőztess.\n5. **Hagyd el az épületet**, figyelmeztesd a többieket (kopogással, ne csengővel).\n6. **Kint, biztonságos távolságból** hívd a **gázszolgáltató hibabejelentő (gázszivárgási) számát** vagy a **112**-t.',
          warn: 'A mobiltelefont is csak az épületen kívül használd! Ne menj vissza, amíg a szakember nem engedi.'
        },
        {
          title: 'A láthatatlan veszély: szén-monoxid (CO)',
          text: 'Ha a gáz (vagy fa, szén) **tökéletlenül ég el**, mert kevés a levegő, vagy nem távozik rendesen az égéstermék, **szén-monoxid (CO)** keletkezik. Ez **színtelen, szagtalan**, és a vérben elfoglalja az oxigén helyét.\n\nTünetei: fejfájás, szédülés, hányinger, álmosság, zavartság, ezért könnyen összetéveszthető influenzával. Ha többen rosszul vannak ugyanabban a helyiségben, és szabad levegőn jobban lesznek, gondolj CO-ra!\n\nVédekezés:\n\n- **Szén-monoxid-érzékelő** minden nyílt égésterű készülék közelébe és a hálószobák közelébe.\n- A kéményt, égéstermék-elvezetőt **kéményseprő** rendszeresen ellenőrzi.\n- A készüléket évente **szakember tartja karban**.\n- Az égési levegő útját (szellőzőrács, ajtó alatti rés) **ne zárd el**.',
          tip: 'CO-riasztásnál: nyiss ablakot, kapcsold ki a készüléket, hagyd el a lakást, és hívd a 112-t. Ha valaki rosszul van, azonnal mentőt!'
        }
      ],
      quiz: [
        { q: 'Mi az első teendő, ha gázszagot érzel a lakásban?', options: ['Felkapcsolod a villanyt, hogy lásd a szivárgást', 'Ne kapcsolj semmit, ne gyújts lángot, szellőztess és hagyd el a lakást', 'Megkeresed öngyújtóval a szivárgást', 'Felhívod a szolgáltatót a lakásból'], answer: 1, explain: 'Bármilyen szikra berobbanthatja a gáz–levegő elegyet. Telefonálni is csak kint, biztonságos helyen szabad.' },
        { q: 'Miért veszélyes különösen a szén-monoxid?', options: ['Mert erős, szúrós szaga van', 'Mert színtelen és szagtalan, nem veszed észre', 'Mert csak nyáron keletkezik', 'Mert könnyen felrobban'], answer: 1, explain: 'Érzékszervekkel nem észlelhető, ezért kell CO-érzékelő.' },
        { q: 'Ki szerelhet gázvezetéket?', options: ['Bárki, aki ügyes', 'A villanyszerelő', 'Kizárólag jogosultsággal rendelkező gázszerelő', 'A kéményseprő'], answer: 2, explain: 'A gázszerelés engedélyhez kötött tevékenység.' },
        { q: 'Hol gyűlik össze a szivárgó PB-gáz?', options: ['A mennyezet alatt', 'A padlón, pincében, mélyedésekben', 'Egyenletesen eloszlik', 'Sehol, azonnal elillan'], answer: 1, explain: 'A propán-bután nehezebb a levegőnél, ezért lefelé áramlik.' }
      ]
    },
    {
      id: 'munkavedelem-hibakereses',
      title: 'Munkavédelem és hibakeresés',
      level: 3, minutes: 12,
      summary: 'Biztonságos munkavégzés és a leggyakoribb hibák: csöpögő csap, folyó WC-tartály, dugulás, szivárgás.',
      tags: ['munkavédelem', 'hibakeresés', 'csöpögő csap', 'WC-tartály', 'dugulás', 'szivárgás', 'perlátor', 'vízkő', 'EPH', 'egyenpotenciál'],
      sections: [
        {
          title: 'Biztonság munka előtt',
          text: '- **Zárd el a vizet** (a szakasz- vagy főelzárót), és **nyomásmentesítsd** a vezetéket egy csap kinyitásával.\n- **Fűtésnél** kapcsold ki a kazánt, és várd meg, míg a víz kihűl: a forró fűtővíz forrázást okoz.\n- **Villamos veszély**: a fürdőszobában víz és áram találkozik. Bojler, mosógép, villanyradiátor közelében dolgozva kapcsold le a kört. A fém csöveket az **egyenpotenciálra hozó (EPH) vezeték** köti össze a földeléssel: ezt nem szabad megszakítani, csőcserénél pótolni kell (villanyszerelő feladata).\n- **Lánggal végzett munka** (forrasztás): legyen kéznél tűzoltó készülék, védd a környezetet hővédő lappal, és munka után még fél óráig figyeld a helyet.\n- **Egyéni védőeszközök**: védőkesztyű, védőszemüveg (vésés, fúrás), térdvédő, szennyvíznél gumikesztyű és alapos kézmosás.',
          warn: 'Falba fúrás előtt keress vezetéket! Egy megfúrt vízcső beázást, egy megfúrt villanyvezeték áramütést okozhat.'
        },
        {
          title: 'Gyakori hibák és okaik',
          text: '- **Csöpög a csap**: régi csapnál kopott **tömítőgumi**, modern egykaros csapnál a **kerámia betét** (patron) hibás. Csere előtt zárd el a sarokszelepet.\n- **Folyamatosan folyik a víz a WC-csészébe**: a tartályban a **töltőszelep** nem zár (rosszul beállított úszó), vagy az **öblítőszelep** tömítése (gumi) kopott, vízköves.\n- **Gyenge a sugár egy csapból**: eltömődött a **perlátor** (a csap végén lévő szűrő) vízkővel. Csavard le, és áztasd ecetes vízben.\n- **Lassan folyik le a víz**: a szifon vagy a lefolyócső részben eldugult. Először a szifont tisztítsd, utána jöhet a pumpa vagy a spirál.\n- **Rejtett szivárgás**: nedves folt a falon, penész, növekvő vízszámla.',
          tip: 'Vízóra-teszt: zárj el minden csapot, és figyeld a vízórát 20–30 percig. Ha a legkisebb számlap (a „csillag” vagy kis mutató) is forog, valahol szivárog a víz.'
        },
        {
          title: 'Mikor hívj szakembert?',
          text: 'Egyszerű cseréket (perlátor, zuhanyfej, csaptelep tömítés) otthon is meg lehet tanulni. Hívj vízszerelőt, ha **falban vagy padló alatt** szivárog, ha **a főelzáró** vagy a **vízóra környéke** hibás, ha a **fűtési rendszer nyomása** rendszeresen esik, és **gázkészüléknél mindig gázszerelőt** hívj.'
        }
      ],
      quiz: [
        { q: 'Mi az első lépés egy csaptelep cseréje előtt?', options: ['Lecsavarni a csapot', 'Elzárni a vizet és nyomásmentesíteni a vezetéket', 'Felhívni a szolgáltatót', 'Kikapcsolni a gázt'], answer: 1, explain: 'Elzárás és nyomásmentesítés nélkül a víz azonnal kifolyna.' },
        { q: 'Mi okozza leggyakrabban, hogy egy csapból gyenge a sugár?', options: ['Kevés a víz a hálózatban', 'Vízköves, eltömődött perlátor', 'Túl nagy a nyomás', 'Levegős a radiátor'], answer: 1, explain: 'A perlátor szűrőjén megáll a vízkő és a szennyeződés. Tisztítás után rendszerint megjavul.' },
        { q: 'Hogyan ellenőrizheted, hogy van-e rejtett szivárgás?', options: ['Mindent elzárva figyeled, hogy forog-e a vízóra', 'Megnézed a gázórát', 'Lehúzod a WC-t', 'Megméred a fűtés nyomását'], answer: 0, explain: 'Ha minden fogyasztó zárva van, a vízórának állnia kell.' }
      ]
    }
  ]
});

/* Hibakereső döntési fák (formátum: js/hibakereses.js fejléce). */
STUDIE.addTrouble({
  id: 'vizszereles-radiator',
  title: 'Nem melegszik a radiátor',
  lessons: ['vizszereles/futes'],
  intro: 'Haladj a legegyszerűbb okoktól a bonyolultabbak felé. **Gázkészülékhez ne nyúlj**, a kazán burkolatát ne szereld le! Itt csak a kezelőszerveket, a nyomásmérőt és a radiátorszelepeket nézed.',
  start: 'gazszag',
  nodes: {
    gazszag: { q: 'Érzel gázszagot a kazán vagy a lakás bármely részén?', answers: [
      { t: 'Igen, gázszagot érzek', next: 'r_gaz' },
      { t: 'Nem', next: 'mind' }] },
    mind: { q: 'Egyetlen radiátor hideg, vagy az összes?', answers: [
      { t: 'Az összes radiátor hideg', next: 'kazan' },
      { t: 'Csak egy (vagy néhány) radiátor hideg', next: 'egy' }] },
    kazan: { q: 'Mit mutat a kazán kijelzője és nyomásmérője?', check: 'Nézd meg a kazán nyomásmérőjét (bar) és a kijelzőn a hibakódot. Hidegen kb. 1–2 bar a szokásos érték.', answers: [
      { t: 'A nyomás 1 bar alatt van', next: 'r_nyomas' },
      { t: 'Hibakódot ír vagy villog a hibajelző', next: 'r_kazanhiba' },
      { t: 'Minden rendben látszik, de nem indul fűteni', next: 'termosztat' }] },
    termosztat: { q: 'A szobatermosztát fűtést kér? (Magasabbra állítva kattan, megjelenik a láng- vagy fűtésjel?)', check: 'Állítsd a szobatermosztátot 2–3 fokkal a szobahőmérséklet fölé. Nézd meg az elemeit, és hogy a kazán nyári (csak melegvíz) üzemmódban van-e.', answers: [
      { t: 'Nem, a termosztát nem reagál, vagy lemerült az elem', next: 'r_termosztat' },
      { t: 'A kazán nyári üzemmódban volt', next: 'r_nyari' },
      { t: 'Kér fűtést, a kazán mégsem melegít', next: 'r_kazanhiba' }] },
    egy: { q: 'Milyen a hideg radiátor?', check: 'Óvatosan tapintsd meg a radiátor tetejét és alját, valamint a bekötő csöveket.', answers: [
      { t: 'Felül hideg, alul meleg, néha csobog', next: 'r_levego' },
      { t: 'Teljesen hideg, a bekötőcső is', next: 'szelep' },
      { t: 'Langyos, a távoli szobákban mindig gyengébb', next: 'r_beszabalyozas' }] },
    szelep: { q: 'Nyitva van a radiátorszelep, és nem ragadt be a termosztatikus fej szeleptüskéje?', check: 'Tekerd a termosztatikus fejet maximumra. Ha leveszed a fejet (általában kézzel lecsavarható), a kis fém tüskének rugózva kell mozognia, ha megnyomod.', answers: [
      { t: 'A tüske beragadt, nem mozdul', next: 'r_tuske' },
      { t: 'Szelep nyitva, a tüske mozog, mégis hideg', next: 'r_dugulas' }] },
    r_gaz: { result: 'Gázszag: azonnali teendő!', fix: '1. **Ne kapcsolj** semmit (villany, csengő, készülékek), ne húzz ki dugót.\n2. **Ne gyújts lángot**, ne dohányozz.\n3. Ha biztonságosan elérhető, **zárd el a gázt** a főcsapnál.\n4. **Nyiss ablakot, ajtót.**\n5. **Hagyd el az épületet**, figyelmeztesd a többieket.\n6. **Kint**, biztonságos távolságból hívd a **gázszolgáltató hibabejelentőjét** vagy a **112**-t.', level: 'bad', pro: true },
    r_nyomas: { result: 'Túl alacsony a rendszernyomás', fix: 'A kazán alacsony nyomásnál védelemből leáll. A kazán kezelési útmutatója szerint a töltőcsapon töltsd fel a rendszert **hidegen** a szokásos értékre (kb. 1,2–1,5 bar), majd légteleníts.\n\nHa a nyomás néhány napon belül újra leesik, valahol szivárog a rendszer: ezt szakembernek kell megkeresnie.', level: 'warn' },
    r_kazanhiba: { result: 'Kazánhiba (gyújtás, érzékelő, szivattyú)', fix: 'Jegyezd fel a hibakódot, és nézd meg a kezelési útmutatóban. A kazánt legfeljebb egyszer próbáld újraindítani a reset gombbal.\n\nHa a hiba megmarad, hívj **gázkészülék-szervizt**. A burkolatot ne szereld le!', level: 'bad', pro: true },
    r_termosztat: { result: 'A szobatermosztát nem kér fűtést', fix: 'Cserélj elemet, ellenőrizd a beállított programot és időt. Vezeték nélküli termosztátnál nézd meg, hogy kapcsolódik-e a vevőegységhez (újrapárosítás az útmutató szerint).', level: 'ok' },
    r_nyari: { result: 'A kazán nyári (csak melegvíz) üzemmódban volt', fix: 'Állítsd a kazánt téli (fűtés + melegvíz) üzemmódba, és állítsd be a fűtési előremenő hőmérsékletet.', level: 'ok' },
    r_levego: { result: 'Levegős a radiátor', fix: 'Kapcsold ki a kazánt, várj pár percet, majd a radiátor felső sarkán lévő légtelenítő szelepen engedd ki a levegőt, amíg víz nem jön. Utána ellenőrizd a nyomásmérőt, és ha kell, töltsd utána a rendszert.', level: 'ok' },
    r_tuske: { result: 'Beragadt a termosztatikus szelep tüskéje', fix: 'Nyári állás után gyakori. Fogóval óvatosan mozgasd meg a tüskét néhányszor ki-be, amíg rugózni nem kezd, majd tedd vissza a fejet. Ha a tüske szivárog vagy nem mozdul, a szelepbetétet szakembernek kell cserélnie.', level: 'ok' },
    r_dugulas: { result: 'Eldugult radiátor vagy szelep, vagy elzárt visszatérő csavarzat', fix: 'Ellenőrizd, nincs-e elzárva a radiátor alsó (visszatérő) csavarzata. Ha nincs, valószínűleg iszap tömíti el a radiátort vagy a szelepet: a rendszert át kell mosni, a radiátort ki kell öblíteni. Ez vízszerelői feladat.', level: 'warn', pro: true },
    r_beszabalyozas: { result: 'Hiányzik vagy elállítódott a hidraulikai beszabályozás', fix: 'A kazánhoz közeli radiátorok elveszik a vizet a távoliak elől. A szelepek előbeállításával (beszabályozással) minden radiátor megkapja a szükséges vízmennyiséget. Ideiglenesen segíthet, ha a túlfűtött szobák termosztatikus fejét lejjebb állítod. A pontos beszabályozást szakember végzi el.', level: 'warn', pro: true }
  }
});

STUDIE.addTrouble({
  id: 'vizszereles-szivargas',
  title: 'Csöpög vagy folyik a víz',
  lessons: ['vizszereles/munkavedelem-hibakereses', 'vizszereles/viz-a-hazban'],
  intro: 'Nagyobb vízfolyásnál az első lépés mindig: **zárd el a vizet** (szakaszelzáró vagy főelzáró). Ha víz folyik elektromos készülék vagy konnektor közelében, előbb a kismegszakítót is kapcsold le!',
  start: 'mennyi',
  nodes: {
    mennyi: { q: 'Mennyi víz folyik?', answers: [
      { t: 'Ömlik a víz (csőtörés)', next: 'r_csotores' },
      { t: 'Csöpög vagy szivárog', next: 'hol' },
      { t: 'Nem látom, de nő a vízszámla, vagy nedves a fal', next: 'ora' }] },
    hol: { q: 'Honnan csöpög a víz?', answers: [
      { t: 'A csap kifolyójából, elzárt állapotban', next: 'r_csap' },
      { t: 'A WC-tartályból folyamatosan csorog a csészébe', next: 'wc' },
      { t: 'Csőkötésnél, sarokszelepnél, flexibilis bekötőcsőnél', next: 'r_kotes' },
      { t: 'A mosdó vagy a mosogató alól, a lefolyónál', next: 'r_szifon' },
      { t: 'A bojler biztonsági szelepéből', next: 'bojler' }] },
    wc: { q: 'Emeld le a tartály fedelét. Hol folyik a víz?', check: 'Nézd meg, hogy a víz a túlfolyócsövön át folyik-e be (túl magas a vízszint), vagy az öblítőszelep alján szivárog el.', answers: [
      { t: 'A túlfolyón át, mert túl magas a vízszint', next: 'r_tolto' },
      { t: 'Az öblítőszelep alján szivárog', next: 'r_oblito' }] },
    bojler: { q: 'Mikor folyik a víz a biztonsági szelepből?', answers: [
      { t: 'Csak felfűtés közben, kis cseppekben', next: 'r_bojler_ok' },
      { t: 'Folyamatosan, akkor is, ha nem fűt', next: 'r_bojler_hiba' }] },
    ora: { q: 'Zárj el minden csapot, és figyeld a vízórát 20–30 percig. Forog a legkisebb számlap?', check: 'A vízóra kis forgó „csillaga” vagy legkisebb mutatója már egészen kis szivárgásnál is mozog.', answers: [
      { t: 'Igen, forog', next: 'r_rejtett' },
      { t: 'Nem forog, mégis nedves a fal', next: 'r_lefolyo' }] },
    r_csotores: { result: 'Csőtörés', fix: '1. Azonnal **zárd el a főelzárót** (vagy a szakaszelzárót).\n2. Ha a víz elektromos szerelvényt, konnektort ér, **kapcsold le a kismegszakítót** (ha nem kell hozzá vízben állnod).\n3. Nyiss ki egy csapot lent, hogy a vezeték kiürüljön.\n4. Mentsd a vizet, értesítsd az alattad lakókat.\n5. Hívj **vízszerelőt**.', level: 'bad', pro: true },
    r_csap: { result: 'Kopott tömítés vagy kerámia betét a csaptelepben', fix: 'Zárd el a sarokszelepeket. Régi, kétfogantyús csapnál a felsőrész **tömítőgumiját**, egykaros csapnál a **kerámia betétet** (patront) kell cserélni. Vidd magaddal a régit a boltba, hogy azonos méretet vegyél.', level: 'ok' },
    r_tolto: { result: 'Nem zár vagy rosszul van beállítva a töltőszelep', fix: 'Állítsd lejjebb az úszót (állítócsavar vagy pattintós rúd), hogy a vízszint a túlfolyó alatt kb. 2 cm-rel álljon meg. Ha így sem zár, a töltőszelep tömítése vízköves vagy kopott: tisztítsd vagy cseréld.', level: 'ok' },
    r_oblito: { result: 'Kopott vagy vízköves öblítőszelep-tömítés', fix: 'Zárd el a tartály sarokszelepét, öblíts le, majd vedd ki az öblítőszelepet (sok típus egy negyed fordulattal kivehető). Tisztítsd meg a tömítőgumit és az ülékét, vagy cseréld a gumit.', level: 'ok' },
    r_kotes: { result: 'Laza vagy elöregedett kötés, flexibilis cső', fix: 'Zárd el a vizet. Roppantógyűrűs kötésnél óvatosan húzd után a csavaranyát (ne túl erősen!). A flexibilis bekötőcső élettartama korlátozott: ha rozsdás, dudoros vagy kötésnél szivárog, cseréld ki. Menetes kötésnél a tömítést újra kell készíteni.', level: 'warn' },
    r_szifon: { result: 'Laza szifoncsavarzat vagy elöregedett tömítés', fix: 'Tegyél alá vödröt, csavard le kézzel a szifont, ellenőrizd és igazítsd meg a tömítőgyűrűket, tisztítsd ki, majd kézzel húzd vissza. Ha a szifon repedt, cseréld ki.', level: 'ok' },
    r_bojler_ok: { result: 'Normális működés: hőtágulás', fix: 'A víz felfűtéskor tágul, a biztonsági szelep ezt a többletet engedi el. Vezesd a csöpögést lefolyóba (tölcsérrel, csővel). Ha zavaró a vízveszteség, szakember beépíthet egy kis tágulási tartályt.', level: 'ok' },
    r_bojler_hiba: { result: 'Hibás biztonsági szelep, vagy túl nagy a hálózati nyomás', fix: 'A szelep vízköves vagy elhasználódott, esetleg a hálózati nyomás a szelep nyitási nyomása fölött van (ilyenkor nyomáscsökkentő kell). A biztonsági szelepet **szakember** cserélje, és soha ne dugaszold el!', level: 'warn', pro: true },
    r_rejtett: { result: 'Rejtett szivárgás a nyomás alatti vezetékben', fix: 'Zárd el egyenként a szakaszelzárókat, és figyeld, mikor áll meg a vízóra: így behatárolható, melyik ágon van a hiba. Nézd meg a WC-tartályokat is (a csészébe csorgó víz is forgatja az órát). Falban, padlóban lévő hibát vízszerelő keres meg (nyomáspróba, akusztikus vagy hőkamerás szivárgáskeresés).', level: 'warn', pro: true },
    r_lefolyo: { result: 'Valószínűleg lefolyó, tömítés vagy kívülről jövő nedvesség', fix: 'A nyomás alatti vezeték rendben van. Gyakori okok:\n- szivárgó lefolyó vagy szifon a fal mögött\n- elöregedett szilikon a kád, zuhanytálca szélén\n- páralecsapódás, beázás kívülről\n\nA kád és a zuhanytálca hézagait újra kell szilikonozni, a falban lévő lefolyót szakember ellenőrzi.', level: 'warn', pro: true }
  }
});
