/* Tantárgy: Pék és cukrász */
STUDIE.addSubject({
  id: 'pek',
  stage: 'szakma',
  title: 'Pék és cukrász',
  icon: '🥐',
  color: '#c2793b',
  description: 'Liszt és glutén, a sütés kémiája (Maillard), élesztő és kovász, tészták, krémek, cukorfőzés, HACCP és allergének.',
  intro: 'A pék és a cukrász **alkalmazott kémikus**: a liszt, a víz, az élesztő, a cukor és a tojás a kemencében és a lábasban kémiai és fizikai változásokon megy át, és ezeket érteni kell, hogy minden nap ugyanolyan jó legyen a termék. Ez a tananyag a szakma **elméleti alapjait** tanítja meg. Az élelmiszer-biztonsági részek a hazai gyakorlatban használt általános elvek: mindig a munkahelyed saját **HACCP-rendszere**, a hatósági (NÉBIH) előírások és a vezetőd utasítása az irányadó. A forró cukorral, a kemencével és a gépekkel való munka **betanítást** igényel: az itt leírtak nem helyettesítik a gyakorlati képzést.',
  lessons: [
    {
      id: 'alapanyagok',
      title: 'Liszt, glutén és alapanyagok',
      level: 1, minutes: 13,
      summary: 'Búza- és rozsliszt, a lisztek jelölése, a glutén (sikér) kialakulása, és a víz, só, cukor, zsiradék, tojás szerepe.',
      tags: ['liszt', 'búzaliszt', 'rozsliszt', 'BL55', 'BL80', 'BL112', 'teljes kiőrlésű', 'hamutartalom', 'glutén', 'sikér', 'gliadin', 'glutenin', 'keményítő', 'víz', 'só', 'cukor', 'zsiradék', 'tojás', 'lecitin'],
      sections: [
        {
          title: 'A liszt',
          text: 'A búzaszem három fő része: a **héj (korpa)**, a **csíra** és a **magbelső** (endospermium), amely főleg **keményítőből** és **fehérjéből** áll. A fehér liszt nagyrészt a magbelsőből készül, a **teljes kiőrlésű** liszt a teljes szemből.\n\nA hazai lisztek jelölése, pl. **BL 55** (búza finomliszt), **BL 80** (búza kenyérliszt, fehér), **BL 112** (búza kenyérliszt, félbarna), **RL** (rozsliszt). A betűk a gabonát és a típust jelölik, a szám a liszt **hamutartalmára** (ásványianyag-tartalmára) utal: minél **nagyobb** a szám, annál több benne a héjhoz közeli rész, annál **sötétebb**, rostosabb a liszt. A pontos határértékeket a **Magyar Élelmiszerkönyv** írja elő.\n\n- **Finomliszt (BL 55)**: sütemények, kalács, leveles tészta, rétes.\n- **Kenyérliszt (BL 80, BL 112)**: kenyér, péksütemény.\n- **Rozsliszt**: rozskenyér, kovásszal.\n- **Rétesliszt**: különösen jó sikérminőségű búzaliszt.'
        },
        {
          title: 'A glutén (sikér)',
          text: 'A búzalisztben lévő két fehérjecsoport, a **gliadin** és a **glutenin**, **víz** hozzáadásával és **dagasztással** egy rugalmas, nyújtható hálóvá kapcsolódik össze: ez a **glutén**, magyarul **sikér**.\n\n- A **glutenin** adja a **rugalmasságot** (visszaugrik),\n- a **gliadin** a **nyújthatóságot** (nyúlik).\n\nA sikérháló **csapdába ejti az erjedéskor keletkező szén-dioxidot**, ezért tud a tészta megkelni, és ezért lesz a kenyérbél lyukacsos, ruganyos. Minél jobban kidolgozott a sikér, annál jobban tartja a gázt.\n\n**Ablakpróba**: egy darab jól kidolgozott tésztát óvatosan széthúzol: ha vékony, áttetsző hártyává nyúlik szakadás nélkül, a sikér kifejlődött.\n\nA **rozs** fehérjéi nem képeznek jó sikérhálót. A rozstészta szerkezetét főleg a nyálkaanyagok (**pentozánok**) adják, ezért a rozskenyér tömörebb, és **savanyítás** (kovász) kell hozzá.'
        },
        {
          title: 'Víz, só, cukor, zsiradék, tojás',
          text: '- **Víz**: elindítja a sikérképződést és az enzimek működését, feloldja a sót, cukrot. A **tésztahőmérsékletet** is a víz hőmérsékletével állítjuk be.\n- **Só**: ízt ad, **erősíti a sikért**, és **lassítja** az élesztő működését. Kenyérben jellemzően a liszt tömegének kb. **1,5–2%-a**. Túl sok só gátolja a kelést, ezért ne kerüljön közvetlenül az élesztőre.\n- **Cukor**: édesít, az élesztő tápláléka, **barnít** (Maillard-reakció, karamellizáció), és **puhán, frissen** tartja a terméket (vizet köt). Nagy mennyiségben viszont **lassítja** az élesztőt (elvonja tőle a vizet).\n- **Zsiradék** (vaj, margarin, olaj): **puhít**, „rövidíti” a sikérszálakat, omlóssá teszi a tésztát, ízt ad, és lassítja a szikkadást. Leveles tésztában rétegeket képez.\n- **Tojás**: a fehérjék hőre **megalvadnak** és szerkezetet adnak, a felvert tojás levegőt köt (piskóta), a sárgája **emulgeál** (a benne lévő **lecitin** miatt), színez és gazdagít.',
          widget: { type: 'parositas', options: { title: 'Párosítsd az alapanyagot a szerepével!', count: 6, pairs: [
            ['Glutenin', 'Rugalmasság: a tészta visszaugrik'],
            ['Gliadin', 'Nyújthatóság: a tészta nyúlik'],
            ['Só', 'Erősíti a sikért, lassítja az élesztőt'],
            ['Cukor', 'Táplálja az élesztőt, barnít, frissen tart'],
            ['Zsiradék', 'Omlóssá tesz, rövidíti a sikérszálakat'],
            ['Tojássárgája', 'Emulgeál a lecitin miatt'],
            ['Nagyobb szám a lisztjelölésben', 'Több ásványi anyag, sötétebb liszt'],
            ['Rozs', 'Gyenge sikér, kovásszal savanyítják']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik két fehérjéből alakul ki a sikér (glutén)?', options: ['Kazein és albumin', 'Gliadin és glutenin', 'Kollagén és keratin', 'Amiláz és proteáz'], answer: 1, explain: 'A gliadin és a glutenin vízzel és dagasztással rugalmas, nyújtható hálót képez.' },
        { q: 'Miért ne kerüljön a só közvetlenül az élesztőre?', options: ['Mert megfesti', 'Mert a sok só gátolja az élesztő működését', 'Mert felrobban', 'Mert elolvad'], answer: 1, explain: 'A só vizet von el az élesztősejtektől, és lassítja, nagy koncentrációban gátolja az erjedést.' },
        { q: 'Mit mutat az ablakpróba?', options: ['A tészta hőmérsékletét', 'Hogy kellően kifejlődött-e a sikérháló', 'A tészta sótartalmát', 'Hogy megsült-e a kenyér'], answer: 1, explain: 'A jól kidolgozott tészta vékony, áttetsző hártyává nyújtható szakadás nélkül.' }
      ]
    },
    {
      id: 'sutes-kemia',
      title: 'A sütés kémiája',
      level: 2, minutes: 15,
      summary: 'Mi történik a kemencében: kemencerugás, keményítő-csirízesedés, fehérjealvadás, Maillard-reakció, karamellizáció, akrilamid és a szikkadás.',
      tags: ['sütés', 'kemence', 'kemencerugás', 'gőz', 'keményítő', 'csirízesedés', 'fehérjealvadás', 'Maillard-reakció', 'karamellizáció', 'héj', 'bél', 'maghőmérséklet', 'akrilamid', 'szikkadás', 'retrogradáció'],
      sections: [
        {
          title: 'Mi történik a kemencében?',
          text: 'A kemencébe tett tészta a felszínétől befelé melegszik. A belseje (a **bél**) sosem melegszik **100 °C** fölé, amíg víz van benne; a felülete (a **héj**) kiszárad, és sokkal forróbb lesz. A hőmérséklet emelkedésével sorban történnek a változások:',
          widget: { type: 'idovonal', options: { steps: true, title: 'Mi történik a kenyér belsejében? Tedd sorrendbe!', events: [
            { year: 1, label: 'kb. 30–50 °C', title: 'Gyorsuló erjedés', text: 'Az élesztő a melegben még utoljára nagyon aktív, sok szén-dioxidot termel.' },
            { year: 2, label: 'kb. 50–60 °C', title: 'Az élesztő elpusztul', text: 'A gázképzés leáll, de a már meglévő gázok tovább tágulnak.' },
            { year: 3, label: 'kb. 60–80 °C', title: 'Keményítő-csirízesedés', text: 'A keményítőszemcsék vizet vesznek fel, megduzzadnak, a bél szilárdulni kezd.' },
            { year: 4, label: 'kb. 70–80 °C', title: 'Fehérjealvadás', text: 'A sikér megalvad, a szerkezet rögzül, a térfogat már nem nő.' },
            { year: 5, label: 'kb. 95 °C felett', title: 'Átsült bél', text: 'A bél belseje közel 100 °C-os, a víz egy része elpárolog.' }
          ] } }
        },
        {
          title: 'Kemencerugás és gőz',
          text: 'A sütés első perceiben a tészta térfogata hirtelen megnő: ez a **kemencerugás**. Okai: a gázok hő hatására **kitágulnak**, a vízben oldott szén-dioxid és az erjedéskor keletkezett **alkohol** gázzá válik, az élesztő az utolsó percekben még gyorsan dolgozik.\n\nA kenyérsütés elején sok kemencébe **gőzt** engednek (gőzölés). A gőz lecsapódik a hideg tészta felületén, és **nedvesen, rugalmasan** tartja a héjat, így a tészta tovább tud nőni, mielőtt a héj megkeményedne. A gőz miatt lesz a héj **fényes** és **ropogós**, a bevágások szépen kinyílnak. A sütés vége felé a gőzt kiengedik, hogy a héj kiszáradjon.\n\nA kenyér akkor **sült át**, ha a bél **maghőmérséklete** kb. 95 °C feletti, és az alját megkopogtatva üreges hangot ad.'
        },
        {
          title: 'Maillard-reakció és karamellizáció',
          text: 'A héj **barna színét** és **illatát** két folyamat adja:\n\n- **Maillard-reakció**: **aminosavak** (fehérjékből) és **redukáló cukrok** (pl. glükóz, fruktóz, maltóz) reakciója hő hatására. Száraz felületen, kb. **140 °C** fölött gyors, és **több száz** különböző íz- és illatanyag keletkezik belőle. Ugyanez a reakció barnítja a sült húst, a pörkölt kávét, a pirítóst. Nevét **Louis-Camille Maillard** francia vegyészről kapta, aki 1912-ben írta le.\n- **Karamellizáció**: maguknak a **cukroknak** a bomlása magas hőmérsékleten (kristálycukornál kb. 160 °C fölött), fehérje nélkül.\n\nA barnulást **gyorsítja**: a cukor, a tej, a tojásos lekenés, a lúgos közeg (pl. a perec lúgos áztatása). **Lassítja**: a nedves felület (amíg víz párolog, a felület nem melegszik 100 °C fölé) és a savas közeg.'
        },
        {
          title: 'Akrilamid és szikkadás',
          text: '**Akrilamid**: kb. **120 °C** fölött, **alacsony nedvességtartalmú** felületen az **aszparagin** nevű aminosav és a redukáló cukrok reakciójában (a Maillard-reakció egyik mellékágán) keletkező, egészségre ártalmas anyag. Az EU **2017/2158** rendelete kötelezi a sütőipari vállalkozásokat, hogy csökkentsék a termékek akrilamid-tartalmát, és ehhez **iránymutató (benchmark) szinteket** ad. A gyakorlatban: a terméket **aranysárgára**, ne **sötétbarnára** süssük, kerüljük a túlsütést, ahol lehet, alacsonyabb hőmérséklet, hosszabb kelesztés.\n\n**Szikkadás**: a kenyér nem csak „kiszárad”: a sütéskor megduzzadt **keményítő** lehűlés után lassan **visszarendeződik** (kristályosodik, **retrogradáció**), ezért a bél kemény és morzsalékos lesz. Ez a folyamat **hűtőszekrény-hőmérsékleten** a leggyorsabb, ezért a kenyeret **ne** tedd hűtőbe; szobahőmérsékleten, vagy hosszabb tárolásra **fagyasztva** tartsd el. A visszapirított kenyér részben „felfrissül”, mert a melegítés visszafordítja a keményítő kristályosodását.',
          warn: 'A kemence, a sütőlemezek, a gőz és a forró termék súlyos égési sérülést okozhatnak. Mindig száraz, hőálló kesztyűt használj (a nedves kesztyűn át azonnal átjön a hő), és a gőzölés után óvatosan nyisd a kemenceajtót, arcodat elfordítva.'
        }
      ],
      quiz: [
        { q: 'Mely anyagok reagálnak a Maillard-reakcióban?', options: ['Zsírok és víz', 'Aminosavak és redukáló cukrok', 'Só és élesztő', 'Keményítő és oxigén'], answer: 1, explain: 'A Maillard-reakció aminosavak és redukáló cukrok reakciója, ez adja a héj színét és illatát.' },
        { q: 'Miért szikkad gyorsabban a kenyér a hűtőben?', options: ['Mert hideg van', 'Mert a keményítő visszarendeződése (retrogradációja) hűtőhőmérsékleten a leggyorsabb', 'Mert a hűtő penészes', 'Nem szikkad gyorsabban'], answer: 1, explain: 'A keményítő kristályosodása 0–10 °C körül gyors, fagyasztva szinte leáll.' },
        { q: 'Mit ajánlott tenni az akrilamid csökkentésére?', options: ['Sötétbarnára sütni', 'Aranysárgára sütni, kerülni a túlsütést', 'Több cukrot adni', 'Magasabb hőmérsékleten rövidebben'], answer: 1, explain: 'Az akrilamid a sötét, túlsütött felületen keletkezik a legnagyobb mennyiségben.' }
      ]
    },
    {
      id: 'eleszto-kovasz',
      title: 'Élesztő és kovász',
      level: 2, minutes: 15,
      summary: 'Az élesztő erjedése, a tésztahőmérséklet, friss és szárított élesztő; a kovász vadélesztői és tejsavbaktériumai, a rozskovász és a kovász gondozása.',
      tags: ['élesztő', 'Saccharomyces cerevisiae', 'erjedés', 'fermentáció', 'szén-dioxid', 'alkohol', 'tésztahőmérséklet', 'kelesztés', 'friss élesztő', 'szárított élesztő', 'kovász', 'tejsavbaktérium', 'tejsav', 'ecetsav', 'savanyú kovász', 'rozskovász', 'kovászfrissítés', 'előtészta', 'sütőipari százalék'],
      sections: [
        {
          title: 'Az élesztő munkája',
          text: 'A sütőélesztő egy egysejtű gomba, a **Saccharomyces cerevisiae**. A tésztában a lisztből származó cukrokat (a liszt saját enzimei a keményítőből is folyamatosan szabadítanak fel cukrot) **erjeszti**:\n\n`glükóz → 2 etanol + 2 szén-dioxid`\n\n- A **szén-dioxid** buborékokat fúj a sikérhálóba: ettől **kel meg** a tészta.\n- Az **alkohol** és sok más melléktermék **ízt és illatot** ad; sütéskor az alkohol elpárolog.\n\nAz élesztő **hőmérsékletfüggő**: hidegen (hűtőben) nagyon lassan dolgozik (ezt használják a **hosszú, hideg kelesztésnél**, amely jobb ízt ad), kb. **24–30 °C**-os tésztában dolgozik jól, és kb. **50–60 °C** körül elpusztul. Ezért fontos a **tésztahőmérséklet**: a víz hőmérsékletével állítják be, és mérik.'
        },
        {
          title: 'Friss vagy szárított?',
          text: '- **Friss (préselt) élesztő**: kb. 70% víztartalmú, hűtőben (kb. 2–6 °C) néhány hétig tartható. Hagyományos pékségi alapanyag.\n- **Szárított (instant) élesztő**: alacsony víztartalmú, szobahőmérsékleten hónapokig tartható, közvetlenül a lisztbe keverhető. Ugyanolyan hatáshoz kb. **harmadannyi** kell belőle, mint a frissből (pontosan a gyártó leírása szerint).\n\nAz élesztő **mennyisége** a kelesztési időhöz igazodik: kevesebb élesztő, hosszabb kelesztés → jobb íz, jobb eltarthatóság. Kenyérnél a liszt tömegének kb. **1–3%-a** friss élesztő, édes, zsíros tésztáknál több kell, mert a cukor és a zsír lassítja.\n\nA receptek a **sütőipari százalékot** (pék százalékot) használják: **minden összetevőt a liszt tömegéhez** viszonyítanak, a liszt mindig **100%**. Így bármilyen mennyiségre könnyen átszámolható.',
          widget: { type: 'szakma-gyakorlo', options: { kind: 'pekszazalek', title: 'Sütőipari százalék gyakorló', help: 'A liszt mindig 100 %. Számold ki az összetevők tömegét vagy arányát!' } }
        },
        {
          title: 'A kovász',
          text: 'A **kovász** liszt és víz erjedő keveréke, amelyben **vadélesztők** és **tejsavbaktériumok** (laktobacilusok) élnek együtt. Egy érett kovászban a baktériumok vannak többségben.\n\n- A **tejsavbaktériumok** **tejsavat** és **ecetsavat** termelnek: ettől **savanyú** a kovász íze, és ettől **tartósabb** a kenyér (a savas közeg lassítja a penészedést).\n- A **vadélesztők** szén-dioxidot termelnek, ezek kelesztik a tésztát, lassabban, mint a sütőélesztő.\n\nA **rozskenyérhez** a kovász **szinte nélkülözhetetlen**: a rozsliszt erős enzimaktivitása savanyítás nélkül sütéskor „leépítené” a keményítőt, és a bél ragacsos, szalonnás lenne. A savas közeg ezt gátolja.\n\nA kovász **meleg és lágy** vezetése több tejsavat, enyhébb ízt; **hűvös és sűrű** vezetése több ecetsavat, élesebb, savanyúbb ízt ad.'
        },
        {
          title: 'A kovász gondozása',
          text: 'A kovászt rendszeresen **frissíteni** (etetni) kell: a régi kovász egy részéhez friss lisztet és vizet adnak, így a mikroorganizmusok újra táplálékot kapnak.\n\n1. **Indítás**: liszt és víz keveréke, naponta frissítve. Néhány nap alatt megtelepednek a lisztben és a környezetben eleve jelen lévő élesztők és baktériumok.\n2. Az érett kovász **egyenletesen buborékos**, kellemes **savanykás, élesztős** illatú, és frissítés után néhány órán belül megnő.\n3. **Tárolás**: hűtőben lassan dolgozik, felhasználás előtt egy-két frissítéssel újra „felébreszthető”.\n\nHa a kovász felületén **szőrös, színes (rózsaszín, narancs, zöld, fekete) penész** jelenik meg, vagy rothadó szaga van, **ki kell dobni**. A felszínen összegyűlő szürkés folyadék (alkohol) önmagában nem baj, csak éhes a kovász.\n\nAz **előtészta** (pl. poolish, biga) a kovász rokona: kevés sütőélesztővel előre erjesztett tésztarész, amely ízt és jobb szerkezetet ad.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a fogalmat a jelentésével!', count: 6, pairs: [
            ['Saccharomyces cerevisiae', 'A sütőélesztő'],
            ['Tejsavbaktériumok', 'Tejsavat és ecetsavat termelnek a kovászban'],
            ['Kb. 50–60 °C', 'Az élesztő elpusztul'],
            ['Hideg, hosszú kelesztés', 'Lassú erjedés, gazdagabb íz'],
            ['Kovászfrissítés', 'Friss liszt és víz a kovász egy részéhez'],
            ['Szőrös, színes folt a kovászon', 'Penész: ki kell dobni'],
            ['Sütőipari százalék', 'Minden a liszt tömegéhez viszonyítva'],
            ['Rozskenyér', 'Savanyítás nélkül ragacsos lenne a bél']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi keletkezik az élesztő erjedésekor a cukorból?', options: ['Oxigén és víz', 'Szén-dioxid és alkohol', 'Tejsav és só', 'Keményítő'], answer: 1, explain: 'Glükóz → 2 etanol + 2 szén-dioxid. A gáz kelesztik, az alkohol sütéskor elpárolog.' },
        { q: 'Miért tartósabb a kovászos kenyér?', options: ['Mert több benne a só', 'Mert a tejsav és az ecetsav savas közege lassítja a penészedést', 'Mert keményebb', 'Mert nincs benne víz'], answer: 1, explain: 'A kovász savai természetes tartósítóként hatnak.' },
        { q: '1000 g lisztre 2% sót adunk. Hány gramm só?', options: ['2 g', '20 g', '200 g', '0,2 g'], answer: 1, explain: '1000 · 2 / 100 = 20 g. A sütőipari százalék a liszt tömegéhez viszonyít.' }
      ]
    },
    {
      id: 'tesztak',
      title: 'Tészták',
      level: 2, minutes: 15,
      summary: 'Kelt, leveles, omlós, piskóta-, égetett és réteslap tészta; a lazítás három módja, a dagasztás, a hajtogatás logikája.',
      tags: ['tészta', 'kelt tészta', 'leveles tészta', 'vajas leveles', 'hajtogatás', 'omlós tészta', 'linzer', 'piskóta', 'égetett tészta', 'rétes', 'lazítás', 'sütőpor', 'szódabikarbóna', 'dagasztás', 'kelesztés', 'formázás'],
      sections: [
        {
          title: 'A lazítás három módja',
          text: 'Minden tészta azért lesz könnyű, levegős, mert valami gázt vagy gőzt juttat bele. Három fő lazítási mód van:\n\n- **Biológiai**: élesztő vagy kovász termel szén-dioxidot (kenyér, kalács, kifli, fánk, kelt rétes).\n- **Kémiai**: **sütőpor** vagy **szódabikarbóna**. A szódabikarbóna (nátrium-hidrogén-karbonát) **savval** (pl. joghurt, írós tej, citromlé, kakaó) vagy hő hatására szén-dioxidot fejleszt. A sütőpor szódabikarbónát és savas sót is tartalmaz, ezért magában is működik (pl. muffin, kevert sütemények). Az **ammónium-hidrogén-karbonát** (szalakáli) lapos, száraz tésztákhoz (pl. mézes) való.\n- **Fizikai**: **felvert levegő** (piskóta, habcsók, tojásfehérje-hab), **gőz** (égetett tészta, leveles tészta) és a **zsiradékrétegek** közé zárt gőz (leveles tészta).'
        },
        {
          title: 'Kelt tészták',
          text: 'A kelt tészta készítésének fő lépései:\n\n1. **Mérés**: pontos, mérlegen, a sütőipari százalék szerint.\n2. **Dagasztás**: kifejleszti a sikérhálót. Kenyérnél hosszabb, intenzívebb; a gépi dagasztásnál figyelni kell a **tészta felmelegedésére**.\n3. **Első kelesztés (érlelés)**: a tészta tömegében erjed, a sikér ellazul, íz fejlődik.\n4. **Osztás, gömbölyítés, pihentetés**.\n5. **Formázás**: kifli, zsemle, fonott kalács, cipó.\n6. **Végső kelesztés**: kelesztőkamrában, szabályozott hőmérsékleten és páratartalomban.\n7. **Sütés**.\n\n**Túlkelt** tészta: a sikér már nem tartja a gázt, a termék összeesik, lapos, savanyú. **Alulkelt**: kicsi, tömör, a héja felreped.\n\nA **dúsított** kelt tészták (kalács, briós, foszlós) sok cukrot, zsiradékot, tojást tartalmaznak: lassabban kelnek, több élesztőt és meleget igényelnek.'
        },
        {
          title: 'Leveles, omlós és piskótatészta',
          text: '**Leveles tészta**: a tésztába **vajlapot** zárnak, majd többször **kinyújtják és hajtogatják**. Minden hajtogatás megsokszorozza a rétegeket. Sütéskor a vaj vízből keletkező **gőze** emeli szét a rétegeket. Fontos a **hideg**: ha a vaj megolvad, összekeveredik a tésztával, és nem lesznek rétegek. Ezért a hajtogatások között hűtőben **pihentetik**. A **vajas leveles** tészta élesztő nélküli; az **élesztős leveles** (pl. croissant, kakaós csiga egyes változatai) élesztős tésztába zárt vajjal készül.\n\n**Omlós tészta**: kevés folyadék, sok zsiradék, a sikérképződést **el kell kerülni** (rövid gyúrás, hideg alapanyagok). A klasszikus arány a „**1-2-3**”: 1 rész cukor, 2 rész zsiradék, 3 rész liszt (tömeg szerint). Linzer, pitetészta, tortaalap.\n\n**Piskóta**: a tojás (vagy külön a sárgája és a fehérje) cukorral **felverve** levegőt köt, ezt óvatosan, **forgatva** keverik a liszthez, hogy a hab ne törjön össze. Sütés közben a buborékokban lévő levegő tágul, a tojásfehérje megalvad és rögzíti a szerkezetet.'
        },
        {
          title: 'Égetett tészta és réteslap',
          text: '**Égetett tészta** (pl. képviselőfánk, ekler, profiterol): vizet vagy tejet vajjal felforralnak, beleszórják a lisztet, és **addig keverik a tűzön**, amíg a tészta elválik az edény falától (a keményítő csirízesedik). Kissé hűtve egyenként belekeverik a **tojásokat**. Sütéskor a sok víz **gőzzé** válik, és belülről felfújja a tésztát, a tojás és a keményítő pedig üreges héjjá szilárdul. A sütés elején **ne nyisd ki** a sütőt, mert a tészta összeesik.\n\n**Réteslap**: nagyon jó sikérű liszt, víz, kevés olaj, ecet vagy só. A tésztát alaposan kidolgozzák és pihentetik (a sikér ellazul), majd abroszon, kézfejjel **papírvékonyra** nyújtják, olyan vékonyra, hogy át lehessen látni rajta. A magyar rétes a sikér nyújthatóságának mesterdarabja.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a tésztát a lazítás módjával!', count: 6, pairs: [
            ['Kenyér', 'Biológiai: élesztő vagy kovász'],
            ['Muffin', 'Kémiai: sütőpor'],
            ['Piskóta', 'Fizikai: felvert levegő'],
            ['Égetett tészta', 'Fizikai: gőz fújja fel'],
            ['Vajas leveles tészta', 'Fizikai: a vajrétegek közötti gőz'],
            ['Mézes tészta', 'Kémiai: szalakáli (ammónium-hidrogén-karbonát)'],
            ['Omlós tészta', 'Sok zsiradék, kevés sikér, alig lazított']
          ] } }
        }
      ],
      quiz: [
        { q: 'Miért kell a leveles tésztát hidegen dolgozni?', options: ['Hogy gyorsabban keljen', 'Hogy a vaj ne olvadjon bele a tésztába, és megmaradjanak a rétegek', 'Hogy ne ragadjon', 'Mert a sütő hideg'], answer: 1, explain: 'Ha a vaj összekeveredik a tésztával, nem lesz réteg, ami közé a gőz behatolhat.' },
        { q: 'Mit jelent az omlós tészta „1-2-3” aránya?', options: ['1 tojás, 2 bögre tej, 3 bögre liszt', '1 rész cukor, 2 rész zsiradék, 3 rész liszt', '1 perc, 2 óra, 3 nap', '1 rész só, 2 rész víz, 3 rész liszt'], answer: 1, explain: 'Tömeg szerint: 1 rész cukor, 2 rész zsiradék, 3 rész liszt.' },
        { q: 'Mi emeli meg az égetett tésztát sütés közben?', options: ['Az élesztő', 'A sütőpor', 'A belőle képződő gőz', 'A felvert tejszín'], answer: 2, explain: 'A sok víz gőzzé válik és felfújja a tésztát, a tojás és a csirízesedett keményítő üreges héjjá szilárdul.' }
      ]
    },
    {
      id: 'kremek',
      title: 'Krémek és habok',
      level: 2, minutes: 15,
      summary: 'Tejszínhab, főzött vaníliakrém, angolkrém, vajkrémek, tojásfehérje-habok, ganache, zselatin és a csokoládé temperálása.',
      tags: ['krém', 'tejszínhab', 'vaníliakrém', 'cukrászkrém', 'angolkrém', 'vajkrém', 'francia hab', 'svájci hab', 'olasz hab', 'habcsók', 'ganache', 'zselatin', 'csokoládé', 'temperálás', 'kakaóvaj', 'emulzió', 'pasztőrözött tojás'],
      sections: [
        {
          title: 'Tejszínhab és tojásfehérje-hab',
          text: '**Tejszínhab**: a habtejszín (legalább kb. **30%** zsírtartalmú) felverésekor a **zsírgolyócskák** a levegőbuborékok felületére tapadnak, és hálóvá kapcsolódnak, ez tartja a habot. Ezért **hidegen** kell verni (a tejszín, sőt az edény is legyen hűtött). Túlverve a zsír összecsomósodik: **vaj** és író válik ki belőle.\n\n**Tojásfehérje-habok**: a fehérjék a verés hatására kitekerednek, és rugalmas hártyát képeznek a buborékok körül. Az edény legyen **zsírmentes**, és ne kerüljön bele tojássárgája, mert a zsír megakadályozza a habképződést. Kevés sav (citromlé, borkősav) stabilizálja.\n\n- **Francia hab**: nyers fehérje cukorral felverve (habcsók, piskóták lazítása).\n- **Svájci hab**: a fehérjét a cukorral vízgőz fölött melegítve (kb. 60–70 °C-ig) verik, majd hidegre.\n- **Olasz hab**: a felvert fehérjébe vékony sugárban kb. **118–121 °C**-ra főzött cukorszirupot csorgatnak. A legstabilabb, és a forró szirup miatt a hab felmelegszik (de a hőkezelés mértéke nem azonos a pasztőrözéssel).'
        },
        {
          title: 'Főzött krémek',
          text: '**Főzött vaníliakrém** (cukrászkrém, crème pâtissière): tej, cukor, tojássárgája és **keményítő** (vagy liszt, pudingpor). Folyamatos keverés mellett **fel kell forralni**, és 1–2 percig forrni hagyni: a keményítő csak így **köt be teljesen**, és így pusztulnak el a kórokozók is. A keményítő miatt a tojás nem csapódik ki. Gyorsan kell hűteni, a felületét fóliával letakarva (hogy ne bőrösödjön), és hűtőben tárolni. Krémesek, fánkok, torták töltelékének alapja.\n\n**Angolkrém** (crème anglaise, vanília mártás): tej, cukor, tojássárgája, **keményítő nélkül**. Csak kb. **82–85 °C**-ig melegítik, amíg a fakanál hátát bevonja (**rózsára sűrűsödik**), **forralni tilos**: a tojás kicsapódik, a krém „összetörik”, darabos lesz.\n\n**Vajkrémek**: puha vaj habosra keverve főzött krémmel (pl. a hazai „puncs” jellegű, pudingos vajkrémek), olasz habbal (olasz vajkrém) vagy tojássárgás sziruppal (francia vajkrém). A vaj és a krém **azonos hőmérsékletű** legyen, különben a krém összefut, „kicsapódik”.'
        },
        {
          title: 'Ganache, zselatin, csokoládé',
          text: '**Ganache**: csokoládé és forró tejszín **emulziója**. Az aránytól függően lehet bevonó (híg), töltő vagy kenhető, felverhető (sűrű).\n\n**Zselatin**: állati eredetű fehérje, amely hidegben **gélt** képez. Előbb hideg vízben **beáztatják**, majd langyos-meleg folyadékban feloldják. **Forralni nem szabad**, mert gyengül a kötőereje. Bizonyos nyers gyümölcsök (pl. friss ananász, kivi, papaja) enzimei lebontják, ezért ezekkel nem dermed meg. Növényi alternatíva pl. az **agar-agar** (ezt fel kell forralni).\n\n**Csokoládé temperálása**: a kakaóvaj többféle kristályformában dermedhet meg. A **temperálással** a stabil, fényes, roppanó kristályformát érik el. Étcsokoládénál egy gyakori menet: felolvasztás kb. **45–50 °C**-ra, lehűtés kb. **27–28 °C**-ra, majd óvatos visszamelegítés kb. **31–32 °C**-ra. Tej- és fehér csokoládénál alacsonyabbak a hőfokok; mindig a gyártó ajánlását nézd. A rosszul temperált csokoládé fakó, foltos, puha, nem válik el a formától.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a krémet a jellemzőjével!', count: 6, pairs: [
            ['Tejszínhab', 'Hidegen verve, túlverve vaj lesz'],
            ['Főzött vaníliakrém', 'Keményítővel, fel kell forralni'],
            ['Angolkrém', 'Keményítő nélkül, kb. 82–85 °C, forralni tilos'],
            ['Olasz hab', 'Felvert fehérje kb. 118–121 °C-os sziruppal'],
            ['Ganache', 'Csokoládé és tejszín emulziója'],
            ['Zselatin', 'Beáztatva, langyosan oldva, forralni tilos'],
            ['Temperálás', 'A kakaóvaj stabil kristályformájának beállítása']
          ] } }
        },
        {
          title: 'Biztonság: krémes termékek',
          text: 'A krémes sütemények (tejszínhab, vaníliakrém, vajkrém, tojásos krémek) a baktériumok számára **ideális táptalajt** jelentenek: nedvesek, fehérjében gazdagok, sokszor nem kerülnek újra hőkezelésre. Ezért:\n\n- a főzött krémeket **gyorsan hűtsd le**, és hűtőben tárold,\n- a kész krémes termékeket **hűtve** (jellemzően 0–5 °C között, a munkahelyi HACCP szerint) tárold és szállítsd, a pultban is,\n- **nyers tojást** tartalmazó krémhez (pl. hőkezelés nélküli habok, tiramisu-jellegű krémek) a vendéglátásban és a cukrászatban **pasztőrözött tojáslevet** használnak, mert a nyers tojás **Salmonellát** hordozhat,\n- a habzsákot, eszközöket tisztítsd, fertőtlenítsd, ne töltsd újra a régi maradékra.'
        }
      ],
      quiz: [
        { q: 'Miért nem szabad az angolkrémet forralni?', options: ['Mert megég', 'Mert a keményítő nélküli tojássárgája kicsapódik, a krém darabos lesz', 'Mert elpárolog', 'Mert megsavanyodik'], answer: 1, explain: 'Az angolkrémet csak kb. 82–85 °C-ig melegítik, amíg rózsára sűrűsödik.' },
        { q: 'Miért kell a főzött vaníliakrémet felforralni?', options: ['Hogy a keményítő teljesen bekössön, és a kórokozók elpusztuljanak', 'Hogy hideg maradjon', 'Hogy habos legyen', 'Nem kell felforralni'], answer: 0, explain: 'A keményítő csak forralva köt be teljesen; a forralás az élelmiszer-biztonságot is szolgálja.' },
        { q: 'Mi történik a túlvert tejszínnel?', options: ['Még keményebb hab lesz', 'Vaj és író válik ki belőle', 'Folyékony lesz', 'Megsavanyodik'], answer: 1, explain: 'A zsírgolyócskák összecsomósodnak: így készül a vaj.' }
      ]
    },
    {
      id: 'cukorfozes',
      title: 'A cukorfőzés fokai',
      level: 3, minutes: 13,
      summary: 'Miért nő a szirup forráspontja, a szál-, gömb- és törésfokok hőmérsékletei és felhasználásuk, a kristályosodás megelőzése és a forró cukor veszélyei.',
      tags: ['cukorfőzés', 'cukorszirup', 'cukorhőmérő', 'szálpróba', 'lágy gömb', 'kemény gömb', 'törés', 'karamell', 'kristályosodás', 'invertcukor', 'glükózszirup', 'fondant', 'grillázs', 'égési sérülés'],
      sections: [
        {
          title: 'Miért nő a hőmérséklet?',
          text: 'A cukorszirup forrásakor a **víz párolog el**, a cukor marad. Minél kevesebb víz marad a szirupban, annál **töményebb** lesz, és annál **magasabb** a forráspontja. Ezért a szirup **hőmérséklete** pontosan elárulja, mennyi víz van még benne, és milyen állagú lesz kihűlve: a **cukorhőmérő** a cukrász legfontosabb eszköze.\n\nHőmérő nélkül a régi cukrászok **hideg vízbe** csepegtetett kis szirupmintából ítélték meg a fokot (szálat húz, lágy vagy kemény golyóvá gyúrható, törik). Innen a fokok neve.\n\nA hőmérsékleti határok a forrásokban **néhány fokkal eltérhetnek**, és a tengerszint feletti magasság is befolyásolja őket; a receptben megadott értéket kövesd.'
        },
        {
          title: 'A fokok',
          text: 'Tájékoztató hőmérsékletek és felhasználás:\n\n- **Szál** (kb. 106–112 °C): a szirup ujjak között vékony szálat húz. Szirupok, glazúrok, gyümölcs befőzése.\n- **Lágy gömb** (kb. 112–116 °C): hideg vízben puha, lapítható golyó. Fondant, puha karamell, krémek.\n- **Szilárd gömb** (kb. 118–120 °C, egyes források szerint 121 °C-ig): hideg vízben formát tartó, de még gyúrható golyó. **Olasz hab**, olasz vajkrém, marcipán.\n- **Kemény gömb** (kb. 121–130 °C): kemény, ragadós, alakját jól tartó golyó. Nugát, kemény karamell egyes fajtái.\n- **Lágy törés** (kb. 132–143 °C): hajlítható, de szilárd szálak. Tejkaramella, taffy.\n- **Kemény törés** (kb. 146–155 °C): üvegszerű, pattanva törő szálak. Nyalóka, cukorfújás, cukorvirág, karamellizált gyümölcs bevonata.\n- **Karamell** (kb. 160 °C felett): a cukor bomlani kezd, aranysárgától borostyánbarnáig színeződik. Karamellmártás, grillázs. Kb. 180–190 °C felett már keserű, ég.',
          widget: { type: 'idovonal', options: { steps: true, title: 'A cukorfőzés fokai: tedd sorrendbe a hőmérséklet szerint!', events: [
            { year: 109, label: 'kb. 106–112 °C', title: 'Szál', text: 'A szirup vékony szálat húz. Szirupok, glazúrok.' },
            { year: 114, label: 'kb. 112–116 °C', title: 'Lágy gömb', text: 'Hideg vízben puha golyó. Fondant, puha karamell.' },
            { year: 119, label: 'kb. 118–120 °C', title: 'Szilárd gömb', text: 'Formát tartó, gyúrható golyó. Olasz hab, marcipán.' },
            { year: 137, label: 'kb. 132–143 °C', title: 'Lágy törés', text: 'Hajlítható, szilárd szálak. Tejkaramella.' },
            { year: 150, label: 'kb. 146–155 °C', title: 'Kemény törés', text: 'Üvegszerű, pattanva törik. Nyalóka, cukorfújás.' },
            { year: 170, label: 'kb. 160 °C felett', title: 'Karamell', text: 'A cukor bomlik, aranysárgától borostyánig színeződik.' }
          ] } }
        },
        {
          title: 'Kristályosodás megelőzése',
          text: 'A túltelített szirup hajlamos **visszakristályosodni**: egyetlen cukorkristály (pl. az edény faláról) láncreakciót indíthat, és a szirup homokos, szemcsés masszává válik. Megelőzés:\n\n- **tiszta** edény és eszközök,\n- az edény falára tapadt kristályokat **vízbe mártott ecsettel** lemossák,\n- a cukor teljes feloldódása után a szirupot **nem keverik**, csak ha a recept kéri,\n- **glükózszirup** vagy kevés **sav** (citromsav, borkősav) hozzáadása: a sav a répacukor egy részét **invertcukorrá** (glükóz és fruktóz keveréke) bontja, ez és a glükózszirup gátolja a kristályosodást.\n\nA **fondant** viszont szándékos, irányított kristályosítás: a lágy gömb fokra főzött szirupot lehűtik, majd folyamatosan dolgozzák, így **apró** kristályok képződnek, és sima, fehér massza lesz belőle.',
          warn: 'A forrásban lévő cukorszirup **sokkal forróbb**, mint a forró víz (akár 150–180 °C), és **rátapad a bőrre**, ezért nagyon mély égési sérülést okoz. Hosszú nyelű, vastag falú edényt használj, a nyelét fordítsd befelé, gyereket, figyelmetlen kollégát tarts távol, ne kóstold, és ne siess. Ha mégis a bőrre kerül: azonnal **hűtsd hideg folyóvízzel legalább 20 percig**, a rátapadt cukrot ne tépd le, súlyos vagy nagy kiterjedésű égésnél **112**.'
        }
      ],
      quiz: [
        { q: 'Miért nő a szirup forráspontja főzés közben?', options: ['Mert több cukrot adunk hozzá', 'Mert a víz elpárolog, a szirup egyre töményebb lesz', 'Mert az edény melegszik', 'Nem nő'], answer: 1, explain: 'A töményebb oldat forráspontja magasabb, ezért a hőmérséklet jelzi a víztartalmat.' },
        { q: 'Kb. milyen hőmérsékletű szirup kell az olasz habhoz?', options: ['Kb. 100 °C', 'Kb. 118–121 °C', 'Kb. 150 °C', 'Kb. 180 °C'], answer: 1, explain: 'A szilárd gömb fok kb. 118–121 °C körül van.' },
        { q: 'Mi akadályozza meg a szirup visszakristályosodását?', options: ['Erős keverés forrás közben', 'Glükózszirup vagy kevés sav, és az edény falának vizes ecsettel lemosása', 'Sok kristálycukor utólagos hozzáadása', 'Hideg edény'], answer: 1, explain: 'Az invertcukor és a glükózszirup gátolja a kristályosodást, a falon maradt kristály pedig elindítaná.' }
      ]
    },
    {
      id: 'haccp',
      title: 'HACCP a pékségben és a cukrászdában',
      level: 2, minutes: 14,
      summary: 'A HACCP hét alapelve, a veszélyek típusai, kritikus pontok a pék- és cukrászüzemben, kártevők, nyers liszt és tésztafogyasztás, nyomonkövethetőség.',
      tags: ['HACCP', 'élelmiszer-biztonság', 'kritikus szabályozási pont', 'CCP', 'veszélyelemzés', 'kritikus határérték', 'monitorozás', 'helyesbítő tevékenység', 'igazolás', 'dokumentáció', 'biológiai veszély', 'kémiai veszély', 'fizikai veszély', 'allergén', 'kártevő', 'lisztmoly', 'nyers liszt', 'nyomonkövethetőség', 'NÉBIH'],
      sections: [
        {
          title: 'Mi a HACCP?',
          text: 'A **HACCP** (Hazard Analysis and Critical Control Points, veszélyelemzés és kritikus szabályozási pontok) egy **megelőző** élelmiszer-biztonsági rendszer: nem a kész termék vizsgálatára épít, hanem arra, hogy a gyártás **minden lépésében** azonosítsák a veszélyeket, és ott tartsák kézben őket, ahol a legfontosabb. Az EU-ban minden élelmiszer-vállalkozásnak HACCP-elvekre épülő eljárást kell működtetnie.\n\nA **hét alapelv**:',
          widget: { type: 'idovonal', options: { steps: true, title: 'A HACCP hét alapelve: tedd sorrendbe!', events: [
            { year: 1, label: '1.', title: 'Veszélyelemzés', text: 'Minden lépésnél: milyen biológiai, kémiai, fizikai (és allergén) veszély léphet fel?' },
            { year: 2, label: '2.', title: 'Kritikus szabályozási pontok (CCP) meghatározása', text: 'Hol lehet és kell a veszélyt megelőzni, megszüntetni vagy elfogadható szintre csökkenteni?' },
            { year: 3, label: '3.', title: 'Kritikus határértékek', text: 'Pl. hőmérséklet, idő: mi a még elfogadható és a már nem elfogadható határ?' },
            { year: 4, label: '4.', title: 'Felügyelet (monitorozás)', text: 'Hogyan, milyen gyakran, ki ellenőrzi a CCP-t (pl. hűtő hőmérsékletének naponta többszöri leolvasása)?' },
            { year: 5, label: '5.', title: 'Helyesbítő tevékenység', text: 'Mi a teendő, ha a határérték sérül (pl. a termék visszatartása, megsemmisítése, javítás)?' },
            { year: 6, label: '6.', title: 'Igazolás (verifikáció)', text: 'Jól működik-e a rendszer? Belső ellenőrzés, laborvizsgálat, felülvizsgálat.' },
            { year: 7, label: '7.', title: 'Dokumentáció és nyilvántartás', text: 'Minden mérés, eltérés, intézkedés írásban rögzítve.' }
          ] } }
        },
        {
          title: 'Veszélyek a pék- és cukrászüzemben',
          text: '- **Biológiai**: baktériumok (pl. Salmonella a tojásban, Staphylococcus aureus a kézről a krémekbe), penészgombák (a penészes kenyeret egészében ki kell dobni, mert a gombafonalak a látható résznél mélyebbre hatolnak), kártevők.\n- **Kémiai**: tisztítószer-maradék, kenőolaj, túladagolt adalékanyag, akrilamid, penészgomba-toxinok.\n- **Fizikai**: idegen tárgyak: üvegszilánk (lámpa!), fémdarab (dagasztógép, szita), műanyag, ékszer, haj, csomagolóanyag-darab. Sok üzemben **fémdetektor** és **szitálás** véd ellene.\n- **Allergének**: glutén, tojás, tej, diófélék, szezám stb. (külön lecke).\n\nTipikus **kritikus pontok**: a főzött krémek **forralása** és **gyors hűtése**, a krémes termékek **hűtött tárolása** és szállítása, a töltelékek hőkezelése, a fémdetektor működése, az allergének elkülönítése.'
        },
        {
          title: 'Kártevők, tisztaság, nyers liszt',
          text: '**Kártevők**: a liszt, a dió, a mák, a szárított gyümölcs vonzza a **lisztmolyt**, **lisztbogarat**, rágcsálókat. Megelőzés: zárt, tiszta tárolás, a padlótól elemelve, FIFO/FEFO, a beérkező alapanyag ellenőrzése, rovarháló, rendszeres kártevőirtás (szakcéggel, dokumentálva). A kiszóródott lisztet azonnal takarítsd fel.\n\n**Személyi higiénia**: tiszta munkaruha, sapka vagy hajháló, ékszer nélkül, gyakori kézmosás. Hasmenéses, hányásos betegséget, gennyes sebet a kezeden **jelenteni kell**, és ilyenkor élelmiszerrel nem dolgozhatsz.\n\n**Nyers liszt és nyers tészta**: a liszt **nem** hőkezelt alapanyag: a gabonára a földeken kórokozók kerülhetnek, és a nyers lisztből már kimutattak például **E. coli** baktériumot. Ezért a nyers tésztát (a nyers tojás miatt is) **nem szabad megkóstolni**, és a nyers lisztet nem szórunk kész, nem sütendő ételre.\n\n**Nyomonkövethetőség**: minden alapanyagról tudni kell, honnan jött (tételszám, szállító), és minden termékről, kinek ment. Így egy probléma esetén a termék gyorsan visszahívható.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a veszélyt a típusával vagy a megelőzéssel!', count: 6, pairs: [
            ['Salmonella a nyers tojásban', 'Biológiai veszély'],
            ['Tisztítószer-maradék a dagasztócsészében', 'Kémiai veszély'],
            ['Üvegszilánk egy törött lámpából', 'Fizikai veszély'],
            ['Lisztmoly', 'Zárt tárolás, kártevőirtás'],
            ['Főzött vaníliakrém', 'Forralás és gyors hűtés: kritikus pont'],
            ['Fémdarab a tésztában', 'Fémdetektor, szita'],
            ['Nyers tészta kóstolása', 'Tilos: nyers liszt és tojás kockázata']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi a HACCP első alapelve?', options: ['Dokumentáció', 'Veszélyelemzés', 'Helyesbítő tevékenység', 'Igazolás'], answer: 1, explain: 'Először fel kell tárni, milyen veszélyek léphetnek fel az egyes lépésekben.' },
        { q: 'Miért dobjuk ki az egész penészes kenyeret, nem csak a látható foltot?', options: ['Mert csúnya', 'Mert a gombafonalak és a toxinok a látható résznél mélyebbre hatolhatnak', 'Mert drága', 'Nem kell kidobni'], answer: 1, explain: 'A puha, lyukacsos kenyérbélben a penész láthatatlanul is továbbterjed.' },
        { q: 'Miért nem kóstoljuk a nyers tésztát?', options: ['Mert nem finom', 'Mert a nyers liszt és a nyers tojás kórokozókat hordozhat', 'Mert elfogy', 'Mert túl édes'], answer: 1, explain: 'A liszt nem hőkezelt alapanyag, a nyers tojás pedig Salmonellát hordozhat.' }
      ]
    },
    {
      id: 'allergenek',
      title: 'Allergének és különleges étrendek',
      level: 2, minutes: 13,
      summary: 'A 14 kötelezően jelölendő allergén a pék- és cukrásztermékekben, gluténmentesség, laktózintolerancia, keresztszennyeződés és a pékasztma.',
      tags: ['allergén', '14 allergén', '1169/2011', 'glutén', 'cöliákia', 'gluténmentes', 'laktózintolerancia', 'tejfehérje-allergia', 'tojás', 'diófélék', 'földimogyoró', 'szezám', 'szója', 'csillagfürt', 'mustár', 'szulfit', 'keresztszennyeződés', 'nyomokban tartalmazhat', 'pékasztma', 'lisztpor'],
      sections: [
        {
          title: 'A 14 allergén a pékségben',
          text: 'Az uniós élelmiszer-tájékoztatási rendelet (**1169/2011/EU**) **14 allergént** sorol fel, amelyekről a vásárlót tájékoztatni kell, csomagolt és **nem csomagolt** (pl. pultból árult) termékeknél is. A pék- és cukrásztermékekben különösen gyakoriak:\n\n- **glutént tartalmazó gabonák** (búza, rozs, árpa, zab, tönköly stb.),\n- **tojás**, **tej** (és tejtermékek, pl. vaj, tejszín),\n- **diófélék** (dió, mogyoró, mandula, pisztácia, kesudió stb.) és **földimogyoró**,\n- **szezámmag** (kenyér, pogácsa szórása), **szója** (lisztjavító, lecitin), **csillagfürt** (egyes lisztkeverékekben),\n- **mustár**, **zeller** (sós péksüteményekben, töltelékekben),\n- **kén-dioxid és szulfitok** (pl. aszalt gyümölcsökben, 10 mg/kg vagy 10 mg/l felett),\n- ritkábban: **hal**, **rákfélék**, **puhatestűek** (pl. szendvicsekben).\n\nA címkén az allergéneket az összetevők listájában **kiemelve** (pl. félkövér betűvel) kell jelölni.'
        },
        {
          title: 'Cöliákia, laktózintolerancia, tejallergia',
          text: '- **Cöliákia (lisztérzékenység)**: **autoimmun** betegség, amelyben a glutén károsítja a vékonybél nyálkahártyáját. Egyetlen kezelése az **egész életen át tartó szigorú gluténmentes** étrend; már **kis mennyiségű** glutén (morzsa, lisztpor) is árt. Az EU szabályai szerint a „**gluténmentes**” jelölés legfeljebb **20 mg/kg** glutént engedi meg.\n- **Búzaallergia**: a búza fehérjéivel szembeni allergiás reakció, más, mint a cöliákia.\n- **Laktózintolerancia**: a tejcukrot (laktózt) bontó enzim hiánya, emésztési panaszokat okoz. Laktózmentes termékekkel, sokan kis mennyiségű laktózzal is jól vannak.\n- **Tejfehérje-allergia**: a **tej fehérjéire** adott immunválasz, súlyos is lehet. A **laktózmentes tej nem jó** neki, mert a tejfehérje benne van!\n\nA vásárló kérdésére **soha ne találgass**: ha nem vagy biztos benne, mi van a termékben, mondd meg őszintén, és nézd meg a receptúrát, címkét.'
        },
        {
          title: 'Keresztszennyeződés és a lisztpor',
          text: 'A pékségben a **lisztpor** szinte mindenhova eljut: a levegőben száll, a gépekre, a polcokra, a ruhára ül. Ezért egy hagyományos pékségben a „gluténmentes” termék előállítása **nagyon nehéz**: külön helyiség, külön eszközök, külön időszak, alapos takarítás és ellenőrzés kell hozzá.\n\nA keresztszennyeződés csökkentése:\n\n- allergénmentes termékek **előbb**, az allergéntartalmúak után (pl. diós termék a nap végén),\n- **külön** eszközök, tárolóedények, színkódolás,\n- **alapos takarítás** a termékváltások között,\n- zárt tárolás, címkézés,\n- a tálcák, fogók, pultok elkülönítése az árusításnál is.\n\nHa a keresztszennyeződés nem zárható ki, sok gyártó **„nyomokban tartalmazhat …”** figyelmeztetést tesz a termékre. Ez **önkéntes** jelölés, és nem helyettesíti a jó gyártási gyakorlatot.'
        },
        {
          title: 'A pék saját egészsége: a pékasztma',
          text: 'A **lisztpor belégzése** a pékeknél **foglalkozási asztmát** (pékasztmát) és allergiás náthát okozhat: a liszt fehérjéi és a lisztjavítókban lévő enzimek (pl. **alfa-amiláz**) erős allergének. A pékasztma az egyik leggyakoribb foglalkozási asztmaforma.\n\nMegelőzés:\n\n- a lisztet **ne szórd magasról**, ne „porold” a munkapadot, használj kevesebb szórólisztet vagy olajat,\n- a dagasztógépet **lassú fokozaton** indítsd, és fedd le, amíg a liszt be nem dolgozódik,\n- **elszívás**, jó szellőzés,\n- a padlót **ne söpörd** szárazon, porszívó vagy nedves takarítás,\n- poros munkánál **porvédő maszk**,\n- tartós köhögés, nehézlégzés, orrfolyás esetén **foglalkozás-egészségügyi orvos**.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a fogalmat a jelentésével!', count: 6, pairs: [
            ['Cöliákia', 'Autoimmun betegség, szigorú gluténmentes étrend kell'],
            ['„Gluténmentes” jelölés', 'Legfeljebb 20 mg/kg glutén'],
            ['Laktózintolerancia', 'A tejcukrot bontó enzim hiánya'],
            ['Tejfehérje-allergia', 'A laktózmentes tej sem fogyasztható'],
            ['„Nyomokban tartalmazhat”', 'Önkéntes figyelmeztetés keresztszennyeződésre'],
            ['Pékasztma', 'A lisztpor belégzése okozta foglalkozási betegség'],
            ['Szezámmag', 'A 14 kötelezően jelölendő allergén egyike']
          ] } }
        }
      ],
      quiz: [
        { q: 'Hány allergént sorol fel az uniós 1169/2011 rendelet?', options: ['7', '10', '14', '20'], answer: 2, explain: 'A rendelet 14 allergént (illetve allergéncsoportot) sorol fel.' },
        { q: 'Mehet-e laktózmentes tej egy tejfehérje-allergiás vásárlónak?', options: ['Igen', 'Nem, mert a tejfehérje benne van', 'Csak kis mennyiségben', 'Csak forralva'], answer: 1, explain: 'A laktózmentes tejből csak a tejcukrot bontják le, a fehérjék megmaradnak.' },
        { q: 'Hogyan csökkented a lisztpor belégzését?', options: ['Magasról szórod a lisztet', 'Lassan indítod a dagasztógépet, elszívás, nedves takarítás, szükség esetén maszk', 'Szárazon söpörsz', 'Sűrűbben porolsz'], answer: 1, explain: 'A porképződés csökkentése a pékasztma megelőzésének alapja.' }
      ]
    }
  ]
});

/* Hibakereső döntési fa (formátum: js/hibakereses.js fejléce) */
STUDIE.addTrouble({
  id: 'pek-keles',
  title: 'Nem kelt meg rendesen a kenyér',
  lessons: ['pek/eleszto-kovasz', 'pek/tesztak'],
  intro: 'A tészta lapos maradt, tömör lett a bél, vagy épp összeesett a kenyér? Haladj végig a kérdéseken, és nézd meg a gyártási lapot (tésztahőmérséklet, idők)! Kemencéhez, géphez csak betanítás után, a gépet tisztításhoz, javításhoz mindig áramtalanítsd.',
  start: 'mikor',
  nodes: {
    mikor: { q: 'Mikor volt a gond?', answers: [
      { t: 'A tészta a kelesztés alatt alig nőtt', next: 'eleszto' },
      { t: 'Szépen megkelt, de a kemencében összeesett, vagy lapos lett', next: 'tulkelt' },
      { t: 'A kenyér kicsi, tömör, a héja felrepedt', next: 'r_alulkelt' }] },
    eleszto: { q: 'Rendben volt az élesztő?', check: 'Nézd meg a lejáratot és a tárolást. A friss élesztő szép világos, morzsálódó, kellemes illatú; a régi barnás, ragacsos, kellemetlen szagú. Próba: kevés langyos cukros vízben 10–15 perc alatt habzani kezd?', answers: [
      { t: 'Régi, rosszul tárolt, vagy nem habzik', next: 'r_rossz_eleszto' },
      { t: 'Az élesztő jó', next: 'homerseklet' }] },
    homerseklet: { q: 'Mekkora volt a tésztahőmérséklet és a kelesztőkamra hőmérséklete?', check: 'Nézd meg a gyártási lapot vagy mérj: a tésztahőmérő kenyértésztánál jellemzően kb. 24–28 °C körüli értéket mutasson (receptúra szerint).', answers: [
      { t: 'Túl hideg volt', next: 'r_hideg' },
      { t: 'Nagyon forró vízzel készült (élesztő elpusztulhatott)', next: 'r_forro' },
      { t: 'Rendben volt', next: 'recept' }] },
    recept: { q: 'Mi volt a receptben?', answers: [
      { t: 'Elfelejtettem az élesztőt, vagy kevesebbet tettem', next: 'r_keves_eleszto' },
      { t: 'A só közvetlenül az élesztőre került, vagy túl sok volt', next: 'r_so' },
      { t: 'Nagyon sok cukor vagy zsiradék van benne (dúsított tészta)', next: 'r_dusitott' }] },
    tulkelt: { q: 'Mennyi ideig kelt a tészta a sütés előtt?', check: 'Ujjpróba: óvatosan nyomd meg a tésztát. Ha lassan, részben jön vissza, jó; ha azonnal visszaugrik, alulkelt; ha a gödör megmarad, és a tészta lelappad, túlkelt.', answers: [
      { t: 'A szokásosnál sokkal tovább, vagy meleg helyen', next: 'r_tulkelt' },
      { t: 'Normál ideig, de gyenge, ragacsos a tészta', next: 'r_gyenge_siker' }] },
    r_rossz_eleszto: { result: 'Rossz vagy elhalt élesztő', fix: 'Használj friss, megfelelően hűtve tárolt élesztőt (FIFO/FEFO). A lejárt élesztő nem kelt jól, és kellemetlen ízt is adhat.', level: 'ok' },
    r_hideg: { result: 'Túl hideg tészta vagy kelesztés', fix: 'Állítsd be a víz hőmérsékletét a kívánt tésztahőmérséklethez, és a kelesztőkamra hőmérsékletét is ellenőrizd. Hideg tésztánál hosszabb kelesztési idő kell.', level: 'ok' },
    r_forro: { result: 'Az élesztőt túl forró víz érte', fix: 'Kb. 50–60 °C körül az élesztő elpusztul. Soha ne önts forró vizet közvetlenül az élesztőre. Mérd a víz és a tészta hőmérsékletét.', level: 'ok' },
    r_keves_eleszto: { result: 'Hiányzó vagy kevés élesztő', fix: 'Mérlegen, a receptúra szerint mérj, és használj ellenőrzőlistát (pl. kitett, kimért alapanyagok). A tésztát általában nem lehet megmenteni, de dokumentáld, és tanulj belőle.', level: 'ok' },
    r_so: { result: 'Túl sok só vagy közvetlenül az élesztőre került', fix: 'A só lassítja, nagy koncentrációban gátolja az élesztőt. A sót a liszttel keverd el, ne az élesztővel, és ellenőrizd a mért mennyiséget (kenyérnél kb. 1,5–2% a liszt tömegéhez).', level: 'ok' },
    r_dusitott: { result: 'A dúsított tészta lassabban kel', fix: 'A sok cukor és zsiradék lassítja az élesztőt. Több élesztő, melegebb tészta, hosszabb kelesztés vagy cukortűrő (ozmotoleráns) élesztő segíthet.', level: 'ok' },
    r_tulkelt: { result: 'Túlkelt tészta', fix: 'A sikérháló már nem tartja a gázt, ezért a kemencében összeesik. Rövidítsd a kelesztést, csökkentsd a hőmérsékletet vagy az élesztő mennyiségét, és használd az ujjpróbát.', level: 'ok' },
    r_gyenge_siker: { result: 'Gyenge sikérháló', fix: 'Gyenge liszt, túl sok víz, kevés vagy túlzott dagasztás (a tészta felmelegedett, a sikér „elszakadt”). Ellenőrizd a lisztet, a vízmennyiséget, a dagasztási időt, és végezz ablakpróbát.', level: 'ok' },
    r_alulkelt: { result: 'Alulkelt tészta', fix: 'Túl korán került a kemencébe: a tészta a kemencében hirtelen nő, a héj szétreped. Hosszabb végső kelesztés, ujjpróba, és a bevágás is segít a szabályozott nyílásban.', level: 'ok' }
  }
});
