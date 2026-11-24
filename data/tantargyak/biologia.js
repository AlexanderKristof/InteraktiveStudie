/* Tantárgy: Biológia (középiskola) */
STUDIE.addSubject({
  id: 'biologia',
  stage: 'kozep',
  title: 'Biológia',
  icon: '🧬',
  color: '#c2417a',
  description: 'A sejttől az ökoszisztémáig: sejtalkotók, sejtosztódás, genetika, az emberi szervezet és az evolúció.',
  intro: 'A biológia az **élet** tudománya. A legkisebb élő egységgel, a **sejttel** kezdünk, megnézzük, hogyan osztódik, és hogyan adja tovább az örökítő anyagát. Utána az emberi test szervrendszerein megyünk végig, végül kitekintünk az evolúcióra és az élőlények közösségeire. A felfedezőben a sejtet és a szívet is körbeforgathatod.',
  lessons: [
    {
      id: 'sejt',
      title: 'A sejt felépítése és működése',
      level: 1, minutes: 15,
      summary: 'Prokarióta és eukarióta sejt, a sejtalkotók feladatai, anyagszállítás a membránon át, fotoszintézis és sejtlégzés.',
      tags: ['sejt', 'sejtalkotó', 'sejtmembrán', 'sejtmag', 'mitokondrium', 'riboszóma', 'endoplazmatikus retikulum', 'Golgi-készülék', 'zöld színtest', 'sejtfal', 'prokarióta', 'eukarióta', 'diffúzió', 'ozmózis', 'fotoszintézis', 'sejtlégzés', 'ATP'],
      models: ['sejt'],
      sections: [
        {
          title: 'Az élet legkisebb egysége',
          text: 'Minden élőlény **sejtekből** áll, és minden sejt egy másik sejt osztódásával jön létre (**sejtelmélet**, Schleiden, Schwann, Virchow, 19. század). Egy felnőtt emberben kb. 30–40 billió sejt van.\n\nKét nagy sejttípus létezik:\n\n- **Prokarióta** sejt (baktériumok): nincs valódi sejtmagja, a DNS szabadon van a sejtplazmában. Kicsi (néhány mikrométer), egyszerű felépítésű.\n- **Eukarióta** sejt (növények, állatok, gombák, egysejtű protiszták): **sejtmagja** van, és membránnal határolt **sejtalkotói**. Jellemzően 10–100 mikrométeres.\n\nA sejtet és alkotóit térben is megnézheted a [[sejt|sejt modellben]].'
        },
        {
          title: 'A sejtalkotók és feladataik',
          text: '- **Sejtmembrán**: foszfolipid kettősréteg fehérjékkel. Elhatárolja a sejtet, és **válogatva** engedi át az anyagokat.\n- **Sejtmag**: a DNS-t (örökítő anyagot) tárolja, irányítja a sejt működését.\n- **Riboszóma**: itt készülnek a **fehérjék** a DNS-ről átírt utasítás (mRNS) alapján.\n- **Endoplazmatikus retikulum (ER)**: membránrendszer; a durva ER-en riboszómák ülnek (fehérjeszintézis), a sima ER lipideket állít elő.\n- **Golgi-készülék**: a fehérjéket „csomagolja” és továbbítja, pl. kiválasztásra.\n- **Mitokondrium**: a sejt „erőműve”, itt zajlik a **sejtlégzés**, amely **ATP**-t, a sejt energiahordozóját termeli.\n- **Lizoszóma**: emésztőenzimekkel bontja le a felesleges anyagokat.\n\nCsak a **növényi** sejtben van: **sejtfal** (cellulózból, szilárdít), **zöld színtest** (kloroplasztisz, fotoszintézis) és nagy **központi vakuólum** (sejtnedv, a sejt feszességét adja).',
          tip: 'A mitokondriumnak és a zöld színtestnek saját DNS-e és riboszómája van. Ez arra utal, hogy egykor önálló baktériumok voltak, amelyeket egy ősi sejt bekebelezett (endoszimbionta elmélet).'
        },
        {
          title: 'Anyagszállítás és energia',
          text: 'Az anyagok többféleképpen jutnak át a membránon:\n\n- **Diffúzió**: a részecskék a nagyobb koncentrációjú hely felől a kisebb felé mozognak, energia nélkül (pl. O₂, CO₂).\n- **Ozmózis**: a **víz** diffúziója féligáteresztő hártyán át a hígabb oldat felől a töményebb felé. Ezért szívják meg magukat vízzel a mazsolák, és ezért pusztul el a vörösvérsejt desztillált vízben.\n- **Aktív transzport**: a koncentrációkülönbséggel szemben, ATP-energia felhasználásával (pl. nátrium-kálium pumpa).\n\nA két legfontosabb energiaátalakító folyamat egymás „tükörképe”:\n\n- **Fotoszintézis** (zöld színtestben, fényenergiával): `6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂`\n- **Sejtlégzés** (mitokondriumban): `C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O` + energia (ATP)'
        }
      ],
      quiz: [
        { q: 'Melyik sejtalkotóban zajlik a sejtlégzés?', options: ['Riboszóma', 'Golgi-készülék', 'Mitokondrium', 'Sejtmag'], answer: 2, explain: 'A mitokondrium a sejt „erőműve”: itt bomlik le a glükóz oxigén segítségével, és ATP keletkezik.' },
        { q: 'Mi hiányzik a prokarióta sejtből?', options: ['Sejtmembrán', 'Riboszóma', 'DNS', 'Valódi sejtmag'], answer: 3, explain: 'A baktériumok DNS-e nincs maghártyával körülvéve. Riboszómájuk és membránjuk viszont van.' },
        { q: 'Melyik sejtalkotó csak a növényi sejtben található meg?', options: ['Zöld színtest', 'Mitokondrium', 'Riboszóma', 'Sejtmembrán'], answer: 0, explain: 'A zöld színtest (és a sejtfal) növényi sajátosság. Mitokondriuma a növényi sejtnek is van!' },
        { q: 'Mit nevezünk ozmózisnak?', options: ['Az oldott anyag aktív szállítását', 'A víz diffúzióját féligáteresztő hártyán át', 'A fehérjék csomagolását', 'A sejt osztódását'], answer: 1, explain: 'Az ozmózis során a víz a hígabb oldat felől a töményebb felé áramlik a hártyán keresztül.' }
      ]
    },
    {
      id: 'sejtosztodas',
      title: 'Sejtosztódás: mitózis és meiózis',
      level: 2, minutes: 14,
      summary: 'A sejtciklus, a DNS megkettőződése, a mitózis szakaszai és a meiózis, amely az ivarsejteket létrehozza.',
      tags: ['sejtosztódás', 'sejtciklus', 'mitózis', 'meiózis', 'kromoszóma', 'kromatida', 'diploid', 'haploid', 'ivarsejt', 'replikáció', 'crossing over', 'interfázis', 'rák'],
      sections: [
        {
          title: 'Kromoszómák és sejtciklus',
          text: 'A DNS a sejtmagban fehérjékre tekeredve, **kromoszómák** formájában található. Az emberi testi sejtekben **46 kromoszóma** van, 23 pár: minden párból egyet az anyától, egyet az apától kaptunk. Az ilyen, a kromoszómákat párban tartalmazó sejt **diploid (2n = 46)**. Az ivarsejtekben csak egy sorozat van: ezek **haploidok (n = 23)**.\n\nA **sejtciklus** két fő része:\n\n- **Interfázis**: a sejt növekszik, működik, és az **S-szakaszban** megkettőzi a DNS-ét (**replikáció**). Ezután minden kromoszóma két azonos **kromatidából** áll, amelyeket a befűződés (centromer) tart össze.\n- **Osztódás** (M-szakasz): a mitózis és a sejtplazma kettéválása.'
        },
        {
          title: 'A mitózis: két egyforma sejt',
          text: 'A **mitózis** célja a növekedés, a sejtpótlás és a sebgyógyulás. Egy diploid sejtből **két**, az anyasejttel genetikailag **azonos** diploid sejt lesz. Szakaszai:\n\n1. **Profázis**: a kromoszómák feltekeredve láthatóvá válnak, a maghártya lebomlik, kialakul a húzófonal-rendszer (magorsó).\n2. **Metafázis**: a kromoszómák a sejt középsíkjába (egyenlítői síkba) rendeződnek.\n3. **Anafázis**: a kromatidák szétválnak, és a sejt két pólusa felé vándorolnak.\n4. **Telofázis**: kialakul a két új sejtmag, majd a sejtplazma is kettéválik.\n\nHa a sejtciklus szabályozása elromlik, a sejtek korlátlanul osztódni kezdenek: így alakulnak ki a **daganatok**.',
          tip: 'Sorrend-emlékeztető: **P-M-A-T** (pro-, meta-, ana-, telofázis).'
        },
        {
          title: 'A meiózis: az ivarsejtek képzése',
          text: 'A **meiózis** a petesejtek és a hímivarsejtek (spermiumok) képzésekor zajlik. Itt **két egymást követő osztódás** van, és egy diploid sejtből **négy haploid**, genetikailag **különböző** sejt keletkezik.\n\n- Az **első** osztódásban a **homológ kromoszómapárok** válnak szét (ez felezi a kromoszómaszámot: 46 → 23).\n- Előtte a párok átfedő szakaszokat cserélhetnek: ez az **átkereszteződés (crossing over)**.\n- A **második** osztódás a mitózishoz hasonló: a kromatidák válnak szét.\n\nMiért fontos? Megtermékenyítéskor két haploid ivarsejt egyesül (23 + 23 = 46), így a kromoszómaszám nemzedékről nemzedékre állandó marad. Az átkereszteződés és a kromoszómák véletlenszerű szétosztódása pedig **genetikai változatosságot** hoz létre: ezért nem egyformák a testvérek.'
        }
      ],
      quiz: [
        { q: 'Hány sejt keletkezik egy sejtből a meiózis végén?', options: ['2 diploid', '4 diploid', '4 haploid', '2 haploid'], answer: 2, explain: 'Két osztódás követi egymást, és közben felére csökken a kromoszómaszám: 4 haploid sejt lesz.' },
        { q: 'Melyik szakaszban rendeződnek a kromoszómák a sejt középsíkjába?', options: ['Profázis', 'Metafázis', 'Anafázis', 'Telofázis'], answer: 1, explain: 'A metafázisban a kromoszómák az egyenlítői síkban sorakoznak fel, ilyenkor a legjobban láthatók.' },
        { q: 'Hány kromoszóma van egy emberi hímivarsejtben?', options: ['23', '46', '92', '22'], answer: 0, explain: 'Az ivarsejtek haploidok: n = 23 kromoszóma (22 testi + 1 ivari kromoszóma).' },
        { q: 'Mikor kettőződik meg a DNS?', options: ['A metafázisban', 'A megtermékenyítéskor', 'A telofázisban', 'Az interfázis S-szakaszában'], answer: 3, explain: 'A replikáció az osztódás előtt, az interfázisban történik, így mindkét utódsejt teljes DNS-készletet kap.' }
      ]
    },
    {
      id: 'genetika',
      title: 'Öröklődés és genetika',
      level: 2, minutes: 16,
      summary: 'DNS, gén, allél, genotípus és fenotípus, Mendel kísérletei, és hogyan jósoljuk meg az utódokat Punnett-táblával.',
      tags: ['genetika', 'öröklődés', 'DNS', 'gén', 'allél', 'domináns', 'recesszív', 'genotípus', 'fenotípus', 'homozigóta', 'heterozigóta', 'Mendel', 'Punnett-tábla', 'kodominancia', 'vércsoport', 'ivari kromoszóma', 'mutáció'],
      sections: [
        {
          title: 'DNS, gén, allél',
          text: 'A **DNS** (dezoxiribonukleinsav) két, egymás köré csavarodó szálból álló **kettős spirál** (Watson és Crick, 1953). A szálakat **nukleotidok** építik fel, négyféle bázissal: **A**denin, **T**imin, **G**uanin, **C**itozin. A két szál bázisai párokat alkotnak: mindig **A–T** és **G–C** (komplementer bázispárok).\n\n- A **gén** a DNS egy szakasza, amely egy fehérje (vagy RNS) felépítésének utasítását tartalmazza. Az emberben kb. 20 000 fehérjekódoló gén van.\n- Az **allél** egy gén egyik változata. Pl. a borsó magszínét meghatározó génnek van „sárga” és „zöld” allélja.\n- Minden testi sejtünkben egy génből **két allél** van: egy az anyától, egy az apától.\n\nA **mutáció** a DNS bázissorrendjének megváltozása. Lehet káros, közömbös, ritkán előnyös; ez az evolúció nyersanyaga.'
        },
        {
          title: 'Mendel és a dominancia',
          text: '**Gregor Mendel** (1860-as évek) borsókkal kísérletezett, és felismerte az öröklődés szabályait.\n\n- **Domináns** allél (nagybetű, pl. **A**): már egy példányban is megnyilvánul.\n- **Recesszív** allél (kisbetű, pl. **a**): csak akkor látszik, ha mindkét allél recesszív (aa).\n- **Genotípus**: az allélok összetétele (AA, Aa, aa). **Fenotípus**: a megjelenő tulajdonság (pl. sárga mag).\n- **Homozigóta**: két egyforma allél (AA vagy aa). **Heterozigóta**: két különböző (Aa).\n\nNem minden öröklődés ilyen egyszerű. **Intermedier** öröklődésnél a heterozigóta köztes (piros × fehér csodatölcsér → rózsaszín). **Kodomináns** öröklődésnél mindkét allél megnyilvánul: az AB vércsoportban az A és a B is.'
        },
        {
          title: 'A Punnett-tábla',
          text: 'A **Punnett-tábla** segít megjósolni az utódok lehetséges genotípusait. Egyik oldalra az egyik szülő ivarsejtjeinek allélját írjuk, a másikra a másikét, a cellákba pedig a kombinációkat.\n\n**Példa**: két heterozigóta, sárga magvú borsó (Aa × Aa) keresztezése. Mindkét szülő ivarsejtje A vagy a allélt kaphat, ½–½ eséllyel. A tábla négy cellája:\n\n- A (anyától) + A (apától) = **AA** → sárga\n- A + a = **Aa** → sárga\n- a + A = **Aa** → sárga\n- a + a = **aa** → zöld\n\nEredmény: genotípusarány **1 AA : 2 Aa : 1 aa**, fenotípusarány **3 sárga : 1 zöld**. Vagyis 25% esély van a zöld (recesszív) utódra.\n\n**Nem öröklődése**: a nőknek XX, a férfiaknak XY ivari kromoszómájuk van. A petesejt mindig X-et, a spermium X-et vagy Y-t visz, ezért a fiú- és lányutód esélye 50–50%.',
          tip: 'Ha egy domináns fenotípusú egyedről nem tudod, AA vagy Aa, keresztezd egy aa egyeddel (tesztelő keresztezés). Ha akár egy recesszív utód is születik, a szülő Aa volt.'
        }
      ],
      quiz: [
        { q: 'Melyik bázissal párosodik az adenin a DNS-ben?', options: ['Guaninnal', 'Citozinnal', 'Uracillal', 'Timinnel'], answer: 3, explain: 'A DNS-ben A–T és G–C párok vannak. Uracil csak az RNS-ben fordul elő.' },
        { q: 'Mi a heterozigóta genotípus?', options: ['AA', 'Aa', 'aa', 'A'], answer: 1, explain: 'Heterozigóta = két különböző allél. Az AA és aa homozigóták.' },
        { q: 'Aa × aa keresztezésnél mekkora a recesszív fenotípusú utód esélye?', options: ['50%', '25%', '0%', '75%'], answer: 0, explain: 'Az utódok: Aa, Aa, aa, aa. Fele aa, tehát 50%.' },
        { q: 'Két barna szemű (Bb) szülőnek milyen eséllyel lesz kék szemű (bb) gyereke, ha a barna domináns?', options: ['0%', '50%', '25%', '100%'], answer: 2, explain: 'Bb × Bb → 1 BB : 2 Bb : 1 bb, tehát 1/4 = 25%. (A szemszín valójában több gén hatása, ez egyszerűsített modell.)' }
      ]
    },
    {
      id: 'keringes-legzes',
      title: 'Szervrendszerek I: keringés és légzés',
      level: 2, minutes: 15,
      summary: 'A szív felépítése és működése, a kis és nagy vérkör, a vér összetétele, valamint a légzőrendszer és a gázcsere.',
      tags: ['keringési rendszer', 'szív', 'pitvar', 'kamra', 'billentyű', 'vérkör', 'artéria', 'véna', 'hajszálér', 'vér', 'vörösvérsejt', 'hemoglobin', 'vérnyomás', 'légzés', 'tüdő', 'léghólyagocska', 'gázcsere', 'rekeszizom'],
      models: ['sziv'],
      sections: [
        {
          title: 'A szív és a két vérkör',
          text: 'A **szív** ökölnyi, izmos pumpa, naponta kb. 100 000-szer húzódik össze. Négy ürege van: két **pitvar** (felül) és két **kamra** (alul). A jobb és a bal szívfél között nincs átjárás. Járd körbe a [[sziv|szív modellben]]!\n\n- **Kis vérkör** (tüdővérkör): jobb kamra → tüdőartéria → **tüdő** (a vér oxigént vesz fel, CO₂-t ad le) → tüdővénák → bal pitvar.\n- **Nagy vérkör** (testvérkör): bal kamra → **aorta** → szervek (oxigént adnak le) → üres vénák → jobb pitvar.\n\nA **billentyűk** szelepként egyirányúsítják az áramlást: a pitvarok és kamrák között a **vitorlás billentyűk**, a kamrák és a nagy erek között a **zsebes billentyűk**. A „szívhangok” ezek záródásának hangja.\n\nA szív saját ingerképző központja a **szinuszcsomó** (a jobb pitvar falában): ez adja a ritmust, nyugalomban percenként kb. 60–80 összehúzódást.',
          tip: 'A bal kamra fala sokkal vastagabb a jobbénál, mert neki az egész testbe kell pumpálnia a vért, nem csak a közeli tüdőbe.'
        },
        {
          title: 'Erek és a vér',
          text: '- **Artériák** (verőerek): a szívből **elvezetik** a vért. Vastag, rugalmas falúak, bennük nagy a nyomás.\n- **Vénák** (gyűjtőerek): a szív **felé** szállítják a vért. Vékonyabb falúak, a végtagokban **zsebes billentyűk** akadályozzák a visszaáramlást.\n- **Hajszálerek** (kapillárisok): egyetlen sejtréteg vastag falukon át történik az anyagcsere a vér és a szövetek között.\n\nFigyelem: az artéria nem feltétlenül oxigéndús! A tüdőartériában oxigénszegény vér folyik, mert az elnevezés az áramlás irányát jelöli.\n\nA **vér** (felnőttben kb. 5 liter) részei: a **vérplazma** (víz, tápanyagok, hormonok), a **vörösvérsejtek** (a **hemoglobin** szállítja az oxigént), a **fehérvérsejtek** (immunvédelem) és a **vérlemezkék** (véralvadás). Egészséges felnőtt nyugalmi vérnyomása kb. **120/80 Hgmm**.'
        },
        {
          title: 'Légzés és gázcsere',
          text: 'A levegő útja: **orrüreg** (szűr, melegít, párásít) → **garat** → **gége** (hangképzés, gégefedő) → **légcső** → **hörgők** → hörgőcskék → **léghólyagocskák** (alveolusok).\n\nA két tüdőben több száz millió léghólyagocska van, összfelületük kb. 70–100 m². Faluk és a körülöttük futó hajszálerek fala együtt is nagyon vékony, így **diffúzióval** zajlik a **gázcsere**: az O₂ a léghólyagból a vérbe, a CO₂ a vérből a léghólyagba jut.\n\nA **belégzés** aktív folyamat: a **rekeszizom** összehúzódik és lesüllyed, a bordaközi izmok megemelik a bordákat, a mellkas térfogata nő, a tüdőben a nyomás csökken, és beáramlik a levegő. Nyugodt **kilégzéskor** az izmok elernyednek, és a tüdő rugalmassága kipréseli a levegőt.\n\nA dohányzás bénítja a légutak csillóit, és károsítja a léghólyagok falát: ez krónikus hörghuruthoz, tüdőtáguláshoz és tüdőrákhoz vezethet.'
        }
      ],
      quiz: [
        { q: 'Melyik szívüregből indul ki az aorta?', options: ['Jobb pitvar', 'Bal kamra', 'Jobb kamra', 'Bal pitvar'], answer: 1, explain: 'A bal kamra pumpálja a vért az aortába, a nagy vérkörbe.' },
        { q: 'Milyen vér folyik a tüdőartériában?', options: ['Oxigénszegény', 'Oxigéndús', 'Nincs benne vér', 'Csak vérplazma'], answer: 0, explain: 'A tüdőartéria a jobb kamrából viszi az oxigénszegény vért a tüdőbe. Az „artéria” az irányt jelöli: a szívtől elfelé.' },
        { q: 'Hol történik a gázcsere a tüdőben?', options: ['A légcsőben', 'A gégében', 'A hörgőkben', 'A léghólyagocskákban'], answer: 3, explain: 'A léghólyagocskák vékony falán és a hajszálereken át diffundál az O₂ és a CO₂.' },
        { q: 'Mi szállítja az oxigént a vérben?', options: ['A fehérvérsejtek', 'A vérlemezkék', 'A vörösvérsejtek hemoglobinja', 'A vérplazma glükóza'], answer: 2, explain: 'A hemoglobin vasat tartalmazó fehérje, ez köti meg az oxigént.' }
      ]
    },
    {
      id: 'ideg-hormon-emesztes',
      title: 'Szervrendszerek II: idegrendszer, hormonok, emésztés',
      level: 2, minutes: 16,
      summary: 'A neuron és a reflexív, a hormonális szabályozás (inzulin, adrenalin) és a táplálék útja az emésztőrendszerben.',
      tags: ['idegrendszer', 'neuron', 'szinapszis', 'reflex', 'reflexív', 'agy', 'gerincvelő', 'vegetatív idegrendszer', 'hormon', 'inzulin', 'glukagon', 'adrenalin', 'cukorbetegség', 'belső elválasztású mirigy', 'emésztés', 'enzim', 'gyomor', 'vékonybél', 'máj', 'epe'],
      sections: [
        {
          title: 'Az idegrendszer',
          text: 'Az idegrendszer alapegysége az **idegsejt (neuron)**: a **dendritek** fogadják az ingerületet, a **sejttest** feldolgozza, az **axon** (idegrost) továbbítja. Az ingerület az idegsejten belül **elektromos** jel, két sejt között a **szinapszisban** **kémiai** úton, ingerületátvivő anyagokkal (pl. acetilkolin, dopamin) terjed.\n\n- **Központi idegrendszer**: agy és gerincvelő.\n- **Környéki idegrendszer**: az idegek, amelyek a központot a test többi részével kötik össze.\n\nA **reflex** egy ingerre adott automatikus, gyors válasz. A **reflexív** útja: receptor → érzőneuron → központ (gerincvelő vagy agy) → mozgatóneuron → végrehajtó szerv (izom, mirigy). Ilyen a térdreflex vagy a forró tárgytól való kézelrántás.\n\nA **vegetatív** idegrendszer akaratunktól függetlenül szabályozza a belső szerveket: a **szimpatikus** rész „harcra vagy menekülésre” készít (szapora szívverés, tágult pupilla), a **paraszimpatikus** a pihenést, emésztést segíti.'
        },
        {
          title: 'Hormonális szabályozás',
          text: 'A **hormonokat** a **belső elválasztású mirigyek** termelik, és a **vérbe** juttatják. Lassabban hatnak, mint az idegrendszer, de tartósabban.\n\n- **Agyalapi mirigy** (hipofízis): a „karmester”, más mirigyeket irányít; növekedési hormont is termel.\n- **Pajzsmirigy**: **tiroxin**, az anyagcsere sebességét szabályozza (jódot igényel).\n- **Hasnyálmirigy** szigetei: az **inzulin** csökkenti, a **glukagon** növeli a vércukorszintet.\n- **Mellékvese**: **adrenalin**, stresszhelyzetben gyorsítja a szívverést, emeli a vércukrot.\n- **Ivarmirigyek**: tesztoszteron, ösztrogén (másodlagos nemi jellegek).\n\nA szabályozás gyakran **negatív visszacsatolással** működik: evés után emelkedik a vércukor → több inzulin → a sejtek felveszik a glükózt → csökken a vércukor → kevesebb inzulin. Ha az inzulintermelés vagy -hatás zavart, **cukorbetegség** (diabétesz) alakul ki.'
        },
        {
          title: 'Az emésztés útja röviden',
          text: 'Az emésztés során az **enzimek** a nagy tápanyagmolekulákat kicsi, felszívható egységekre bontják.\n\n1. **Szájüreg**: rágás, a **nyál** amiláza elkezdi bontani a **keményítőt**.\n2. **Nyelőcső**: perisztaltikus hullámokkal továbbítja a falatot.\n3. **Gyomor**: a **sósav** fertőtlenít és savas közeget biztosít, a **pepszin** a **fehérjéket** kezdi bontani.\n4. **Vékonybél**: itt zajlik az emésztés java. A **hasnyál** enzimei mindhárom fő tápanyagot bontják, a máj termelte **epe** pedig apró cseppekre **emulgeálja a zsírokat**. A **bélbolyhok** óriási felületén szívódnak fel a tápanyagok.\n5. **Vastagbél**: **vizet** szív vissza, a hasznos **bélbaktériumok** vitaminokat (pl. K-vitamin) is termelnek.\n\nA **máj** a felszívott tápanyagokat dolgozza fel, glikogént raktároz, és méregtelenít.',
          tip: 'Fehérje → aminosavak, keményítő → glükóz, zsír → glicerin + zsírsavak. Ezeket a kis molekulákat már fel tudja venni a vér és a nyirok.'
        }
      ],
      quiz: [
        { q: 'Mi a reflexív helyes sorrendje?', options: ['Receptor → mozgatóneuron → központ → érzőneuron → izom', 'Izom → érzőneuron → központ → receptor', 'Receptor → érzőneuron → központ → mozgatóneuron → végrehajtó szerv', 'Központ → receptor → izom'], answer: 2, explain: 'Az inger a receptorból érzőneuronon jut a központba, onnan mozgatóneuronon a végrehajtó szervhez.' },
        { q: 'Melyik hormon csökkenti a vércukorszintet?', options: ['Inzulin', 'Adrenalin', 'Glukagon', 'Tiroxin'], answer: 0, explain: 'Az inzulin segíti a glükóz felvételét a sejtekbe. A glukagon és az adrenalin emeli a vércukrot.' },
        { q: 'Mi az epe szerepe?', options: ['Fehérjét bont', 'Keményítőt bont', 'Vizet szív vissza', 'Emulgeálja a zsírokat'], answer: 3, explain: 'Az epében nincs emésztőenzim; apró cseppekre oszlatja a zsírt, így a hasnyál lipáza könnyebben bontja.' },
        { q: 'Hol szívódik fel a tápanyagok nagy része?', options: ['A gyomorban', 'A vékonybélben', 'A vastagbélben', 'A nyelőcsőben'], answer: 1, explain: 'A vékonybél bolyhai és mikrobolyhai hatalmas felszívó felületet biztosítanak.' }
      ]
    },
    {
      id: 'evolucio-okologia',
      title: 'Evolúció és ökológia',
      level: 3, minutes: 16,
      summary: 'Darwin és a természetes szelekció, az evolúció bizonyítékai, táplálékláncok, ökoszisztémák és az anyag körforgása.',
      tags: ['evolúció', 'Darwin', 'természetes szelekció', 'alkalmazkodás', 'mutáció', 'fajképződés', 'antibiotikum-rezisztencia', 'ökológia', 'ökoszisztéma', 'tápláléklánc', 'táplálékhálózat', 'termelő', 'fogyasztó', 'lebontó', 'populáció', 'életközösség', 'szénkörforgás', 'biodiverzitás'],
      sections: [
        {
          title: 'Darwin és a természetes szelekció',
          text: '**Charles Darwin** 1859-ben „A fajok eredete” című könyvében írta le, hogyan változnak az élőlények nemzedékről nemzedékre. A **természetes szelekció** lényege:\n\n1. **Túlszaporodás**: több utód születik, mint amennyi életben maradhat.\n2. **Változatosság**: az egyedek különböznek egymástól (mutációk, ivaros szaporodás).\n3. **Öröklődés**: a tulajdonságok egy része öröklődik.\n4. **Szelekció**: a környezethez jobban alkalmazkodott egyedek nagyobb eséllyel maradnak életben és szaporodnak, így előnyös tulajdonságaik elterjednek.\n\nPéldák: a **Galápagos-szigeteki pintyek** csőre a táplálékhoz igazodott; az ipari forradalom idején a kormos fákon a sötét **nyírfaaraszolók** maradtak életben; ma az **antibiotikum-rezisztens** baktériumok terjedése zajlik a szemünk előtt.',
          warn: 'Az antibiotikumot mindig az orvos által előírt ideig szedd, akkor is, ha már jobban vagy! A félbehagyott kúra a túlélő, ellenállóbb baktériumokat válogatja ki.'
        },
        {
          title: 'Az evolúció bizonyítékai',
          text: '- **Ősmaradványok** (fosszíliák): a kőzetrétegekben időrendben követhető az élőlények változása; vannak **átmeneti alakok** is (pl. az ősmadár, Archaeopteryx: hüllő- és madárjegyek).\n- **Összehasonlító anatómia**: az ember karja, a denevér szárnya és a bálna úszója azonos csontokból épül fel (**homológ** szervek), mert közös őstől származnak.\n- **Molekuláris biológia**: minél közelebbi rokon két faj, annál hasonlóbb a DNS-ük. Az ember és a csimpánz DNS-e kb. 98–99%-ban egyezik.\n- **Közvetlen megfigyelés**: rezisztens baktériumok, rovarirtó-ellenálló kártevők.\n\nAz ember **nem a mai majmoktól** származik, hanem velük közös ősöktől; a csimpánzzal közös ősünk kb. 6–7 millió éve élt.'
        },
        {
          title: 'Ökoszisztémák és táplálékláncok',
          text: 'Az **ökológia** az élőlények egymással és a környezetükkel való kapcsolatát vizsgálja.\n\n- **Populáció**: egy faj egy területen együtt élő egyedei.\n- **Életközösség** (társulás): egy terület összes populációja.\n- **Ökoszisztéma**: az életközösség és az élettelen környezete (víz, talaj, fény, hőmérséklet) együtt, pl. egy tó vagy egy erdő.\n\nA **tápláléklánc** szintjei:\n\n- **Termelők**: zöld növények, algák. Fotoszintézissel szerves anyagot állítanak elő.\n- **Elsődleges fogyasztók**: növényevők (pl. nyúl, szöcske).\n- **Másodlagos, harmadlagos fogyasztók**: ragadozók (pl. róka, sas).\n- **Lebontók**: baktériumok, gombák. Az elhalt szerves anyagot ásványi anyagokká bontják vissza.\n\nPélda: fű → szöcske → béka → gólya. A valóságban a láncok **táplálékhálózattá** fonódnak össze.\n\nAz **energia** a láncban szintenként nagyjából csak **10%**-ban adódik tovább, a többi a légzés során hővé válik. Ezért ritkák a csúcsragadozók, és ezért kell sokkal több termőföld egy húsalapú étrendhez. Az **anyag** viszont körforog: a szén a fotoszintézissel kerül a szerves anyagba, és a légzéssel, bomlással, égetéssel jut vissza a levegőbe CO₂-ként.',
          tip: 'A **biodiverzitás** (biológiai sokféleség) teszi stabillá az ökoszisztémát: ha egy faj kiesik, mások átvehetik a szerepét. Az élőhelyek pusztítása ezért olyan veszélyes.'
        }
      ],
      quiz: [
        { q: 'Mi a természetes szelekció lényege?', options: ['Az élőlények szándékosan alkalmazkodnak', 'A jobban alkalmazkodott egyedek többet szaporodnak', 'Minden utód életben marad', 'A szerzett tulajdonságok öröklődnek'], answer: 1, explain: 'A szelekció a meglévő változatosságból válogat: a sikeresebb egyedek adják tovább a génjeiket. A szerzett tulajdonságok (pl. edzett izom) nem öröklődnek.' },
        { q: 'Melyik szervezet lebontó?', options: ['Tölgyfa', 'Őz', 'Farkas', 'Penészgomba'], answer: 3, explain: 'A gombák és baktériumok bontják le az elhalt szerves anyagot. A tölgy termelő, az őz növényevő, a farkas ragadozó.' },
        { q: 'Egy táplálékláncban a termelők 10 000 kJ energiát kötnek meg. Nagyjából mennyi jut a másodlagos fogyasztókhoz?', options: ['1000 kJ', '10 000 kJ', '100 kJ', '10 kJ'], answer: 2, explain: 'Szintenként kb. 10% adódik tovább: 10 000 → 1000 (elsődleges) → 100 kJ (másodlagos fogyasztók).' },
        { q: 'Mi az ökoszisztéma?', options: ['Egy faj összes egyede', 'Az életközösség és élettelen környezete együtt', 'Csak a növények egy területen', 'Egy tápláléklánc'], answer: 1, explain: 'Az ökoszisztéma az élő (biotikus) és élettelen (abiotikus) tényezők egységes rendszere.' }
      ]
    }
  ]
});
