/* Tantárgy: Vizuális kultúra (5–8. osztály) */
STUDIE.addSubject({
  id: 'vizualis',
  stage: 'altalanos',
  title: 'Vizuális kultúra',
  icon: '🎨',
  color: '#e5484d',
  description: 'Színek és színkeverés, kompozíció, perspektíva, a művészet története a barlangrajzoktól Vasarelyig, és a digitális kép világa.',
  intro: 'A vizuális kultúra arról szól, hogyan **látunk**, és hogyan tudunk képekkel gondolatokat, érzéseket közvetíteni. Megtanulod, hogyan keverednek a színek (a képernyőn másképp, mint a festékes dobozban!), hogyan építs fel egy jó képet, és hogyan rajzolj térhatásúan. A művészettörténeti leckékben **idővonalak** és **párosító játékok** segítenek eligazodni a korszakok és a mesterek között. Végül a digitális képek, a betűk és a logók világába is bepillantasz.',
  lessons: [
    {
      id: 'szinek',
      title: 'Színek és színkeverés',
      level: 1, minutes: 14,
      summary: 'Alapszínek és kevert színek, a fény és a festék keverése, a színkör, a kiegészítő színek, meleg és hideg színek.',
      tags: ['szín', 'alapszín', 'másodlagos szín', 'színkör', 'színkeverés', 'additív', 'szubtraktív', 'RGB', 'CMYK', 'kiegészítő szín', 'komplementer', 'meleg színek', 'hideg színek', 'telítettség', 'világosság', 'szivárvány', 'prizma'],
      sections: [
        {
          title: 'Mi a szín?',
          text: 'A szín valójában **fény**. A Nap fehér fénye sok különböző színű fény keveréke: ha egy **prizmán** átengeded, szivárványszínekre bomlik (vörös, narancs, sárga, zöld, kék, ibolya). Ezt először **Isaac Newton** mutatta ki a 17. században.\n\nEgy tárgy azért látszik pirosnak, mert a ráeső fehér fényből a pirosat **visszaveri**, a többit elnyeli. A fehér papír szinte minden fényt visszaver, a fekete szinte mindent elnyel. Sötétben ezért nincsenek színek: ahol nincs fény, ott nincs mit visszaverni.'
        },
        {
          title: 'Keverés fénnyel: összeadás',
          text: 'A képernyők, a színpadi lámpák és a kivetítők **fényt** bocsátanak ki. Itt a három alapszín a **piros (R), a zöld (G) és a kék (B)**, angol kezdőbetűikből: **RGB**. Ha a fényeket egymásra vetítjük, **összeadódnak**, és a keverék **világosabb** lesz. Ez az **additív** (összeadó) színkeverés.\n\n- piros + zöld = **sárga**\n- zöld + kék = **cián** (zöldeskék)\n- kék + piros = **bíbor** (magenta)\n- piros + zöld + kék = **fehér**\n\nNézd meg nagyítóval a telefonod vagy a monitorod képét: apró piros, zöld és kék pontokat látsz, amelyekből a szemed keveri ki a színeket.',
          widget: { type: 'szinkever', options: { mode: 'feny' } }
        },
        {
          title: 'Keverés festékkel: kivonás',
          text: 'A festék, a tinta és a filctoll **nem ad** fényt, hanem **elnyel** belőle. Ha két festéket keverünk, mindkettő elnyeli a maga részét, így a keverék **sötétebb** lesz. Ez a **szubtraktív** (kivonó) színkeverés.\n\nA nyomdák és a színes nyomtatók alapszínei: **cián (C), bíbor (M) és sárga (Y)**. Ezek keverékéből szinte minden szín kikeverhető:\n\n- cián + sárga = **zöld**\n- bíbor + sárga = **piros**\n- cián + bíbor = **kék**\n- mindhárom = majdnem **fekete** (ezért tesznek a nyomtatóba külön fekete patront is: ez a **K**, így lesz **CMYK**)\n\nAz iskolai festésben hagyományosan a **piros, sárga, kék** hármast hívjuk alapszínnek. Keverékeik a **másodlagos színek**: piros + sárga = **narancs**, sárga + kék = **zöld**, kék + piros = **lila**.',
          widget: { type: 'szinkever', options: { mode: 'festek', title: 'Festékkeverés (CMY)' } }
        },
        {
          title: 'A színkör és a kiegészítő színek',
          text: 'Ha a színeket körbe rendezzük úgy, hogy a rokon színek egymás mellé kerüljenek, **színkört** kapunk. A svájci festő és tanár, **Johannes Itten** 12 részes színköre a legismertebb: középen a három alapszín, körülöttük a kevert színek.\n\nA színkörön egymással **szemben** álló színek a **kiegészítő** (komplementer) színpárok. A festők színkörén:\n\n- **piros ↔ zöld**\n- **kék ↔ narancs**\n- **sárga ↔ lila**\n\nEgymás mellett a kiegészítő színek **felerősítik** egymást: a piros alma még pirosabbnak látszik zöld levelek között. Ha viszont összekevered őket, tompa barnát vagy szürkét kapsz. (Fénynél a kiegészítő párok: piros ↔ cián, zöld ↔ bíbor, kék ↔ sárga. A fenti színkeverő mindig ezt mutatja.)',
          tip: 'Próbáld ki: nézz 30 másodpercig egy élénkpiros foltot, aztán egy fehér papírt! Halványzöld „utóképet” látsz, a piros kiegészítő színét.'
        },
        {
          title: 'Meleg és hideg színek',
          text: 'A színek érzéseket is keltenek. A **meleg színek** (piros, narancs, sárga) a tűzre, a napra emlékeztetnek: élénkek, közelinek tűnnek, „előrejönnek” a képen. A **hideg színek** (kék, zöldeskék, ibolya) a vízre, a jégre, az égre: nyugodtak, távolinak tűnnek, „hátrahúzódnak”.\n\nA színnek három fő jellemzője van:\n\n- **színezet**: maga a szín neve (piros, kék…)\n- **világosság**: mennyire világos vagy sötét (fehérrel világosítunk, feketével sötétítünk)\n- **telítettség**: mennyire élénk, tiszta, vagy mennyire tompa, szürkés'
        }
      ],
      quiz: [
        { q: 'Mi lesz a piros és a zöld FÉNY keveréke?', options: ['barna', 'sárga', 'fekete', 'lila'], answer: 1, explain: 'Fénynél a színek összeadódnak: piros + zöld = sárga. Festéknél ugyanez barnás színt adna.' },
        { q: 'Melyik a festékkeverés (nyomtatás) három alapszíne?', options: ['piros, zöld, kék', 'fekete, fehér, szürke', 'cián, bíbor, sárga', 'narancs, zöld, lila'], answer: 2, explain: 'A nyomtatás CMY(K) színekkel dolgozik. Az RGB a képernyők fényalapszínei.' },
        { q: 'Mi a kék kiegészítő színe a festők színkörén?', options: ['narancs', 'zöld', 'lila', 'piros'], answer: 0, explain: 'A színkörön szemben álló párok: piros–zöld, kék–narancs, sárga–lila.' },
        { q: 'Melyik meleg szín?', options: ['türkiz', 'ibolya', 'jégkék', 'narancs'], answer: 3, explain: 'A meleg színek a piros, a narancs és a sárga: a tűzre és a napra emlékeztetnek.' }
      ]
    },
    {
      id: 'kompozicio',
      title: 'A kompozíció',
      level: 1, minutes: 12,
      summary: 'Hogyan rendezzük el a kép elemeit? Egyensúly, aranymetszés, harmadolás, ritmus és kiemelés.',
      tags: ['kompozíció', 'képszerkesztés', 'egyensúly', 'szimmetria', 'aszimmetria', 'aranymetszés', '1,618', 'harmadolás szabálya', 'ritmus', 'kiemelés', 'kontraszt', 'fókuszpont', 'irányok', 'fotózás'],
      sections: [
        {
          title: 'Mi a kompozíció?',
          text: 'A **kompozíció** (latinul: összeállítás) azt jelenti, hogyan **rendezzük el** a kép elemeit a felületen: hova kerül a főszereplő, mekkora, merre néz, mi van körülötte. Ugyanabból a témából egy jól megkomponált kép izgalmas, egy rosszul megkomponált unalmas vagy zavaros lesz.\n\nA kompozíció szabályai nemcsak a festészetben érvényesek: a **fotózásban**, a filmben, a plakáttervezésben és egy weboldal elrendezésében is ugyanezeket használjuk.'
        },
        {
          title: 'Egyensúly',
          text: 'A kép elemeinek „súlya” van: a nagy, sötét, élénk színű foltok nehezebbnek tűnnek, mint a kicsi, világos, halvány foltok.\n\n- **Szimmetrikus egyensúly**: a kép két fele tükörképe egymásnak. Nyugodt, ünnepélyes, de kissé merev hatású. Gyakori a templomok homlokzatán és a hivatalos portrékon.\n- **Aszimmetrikus egyensúly**: a két fél nem egyforma, mégis egyensúlyban van. Például egy nagy fa a kép egyik oldalán, és egy kicsi, de élénkpiros ház a másikon. Ez mozgalmasabb, érdekesebb.\n\nHa a kép **nincs** egyensúlyban, „billegni” látszik, és nyugtalanságot kelt. Néha a művészek szándékosan használják ezt.'
        },
        {
          title: 'Aranymetszés és harmadolás',
          text: 'Az **aranymetszés** egy szakasz különleges kettéosztása: a nagyobbik rész úgy aránylik a kisebbikhez, mint az egész a nagyobbikhoz. Ez az arány kb. **1,618 : 1** (az egész kb. 62%-ánál kell elvágni). Az ókori görögök és a reneszánsz mesterek is harmonikusnak tartották. Megtalálható a természetben is, például a napraforgó magjainak és a csigaház spiráljának elrendeződésében.\n\nA **harmadolás szabálya** az aranymetszés egyszerűbb, gyakorlati változata. Oszd fel képzeletben a képet két vízszintes és két függőleges vonallal **3 × 3** egyforma részre!\n\n- A fontos tárgyat ne a kép közepére, hanem a vonalak **metszéspontjaiba** helyezd.\n- A **horizontot** (látóhatárt) tedd az alsó vagy a felső harmadvonalra, ne pont középre.\n- Ha egy alak vagy jármű egy irányba néz vagy halad, hagyj előtte több **helyet**.',
          tip: 'A legtöbb telefon kamerájában bekapcsolható a „rács”: ez pont a harmadoló vonalakat mutatja.'
        },
        {
          title: 'Ritmus és kiemelés',
          text: 'A **ritmus** a képen az elemek **ismétlődése**: oszlopsor, kerítés, fák sora, csempe minta. A szabályos ritmus nyugodt, a változó (például egyre kisebb vagy sűrűbb) ritmus mozgást, mélységet sugall.\n\nA **kiemelés** azt jelenti, hogy a néző szeme először a legfontosabb elemre essen. Ezt a **fókuszpontot** így emelheted ki:\n\n- **kontraszttal**: világos a sötétben, élénk szín a szürke környezetben\n- **mérettel**: a legnagyobb elem a legfeltűnőbb\n- **elszigeteléssel**: ami egyedül áll, arra figyelünk\n- **irányokkal**: utak, kezek, tekintetek, fénysugarak „rámutatnak”\n\nA vonalak iránya is hat: a **vízszintes** nyugalmat, a **függőleges** méltóságot, emelkedettséget, az **átlós** mozgást, feszültséget sugall.'
        },
        {
          title: 'Párosító játék',
          text: 'Párosítsd a kompozíciós fogalmat a jelentésével!',
          widget: { type: 'parositas', options: { title: 'Kompozíciós fogalmak', count: 6, pairs: [
            ['Szimmetria', 'A kép két fele tükörképe egymásnak'],
            ['Aszimmetrikus egyensúly', 'Különböző súlyú elemek mégis kiegyenlítik egymást'],
            ['Aranymetszés', 'Kb. 1,618 : 1 arányú harmonikus felosztás'],
            ['Harmadolás', 'A képet 3 × 3 részre osztó segédvonalak'],
            ['Ritmus', 'Elemek ismétlődése a képen'],
            ['Fókuszpont', 'Ahová a néző szeme először néz'],
            ['Kontraszt', 'Erős ellentét: világos–sötét, meleg–hideg'],
            ['Átlós irány', 'Mozgást, feszültséget sugall']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mit javasol a harmadolás szabálya?', options: ['A fő tárgy mindig a kép pontos közepére kerüljön', 'A fontos elemek a 3 × 3-as rács metszéspontjaiba kerüljenek', 'A kép három színből álljon', 'Három tárgynál több ne legyen a képen'], answer: 1, explain: 'A metszéspontokba helyezett téma érdekesebb, dinamikusabb, mint a középre tett.' },
        { q: 'Körülbelül mekkora az aranymetszés aránya?', options: ['1 : 1', '2 : 1', '3,14 : 1', '1,618 : 1'], answer: 3, explain: 'Az aranymetszés aránya kb. 1,618. A 3,14 a π.' },
        { q: 'Milyen hatást kelt általában az átlós vonal?', options: ['mozgást, feszültséget', 'teljes nyugalmat', 'ünnepélyességet', 'semmilyet'], answer: 0, explain: 'A vízszintes nyugodt, a függőleges emelkedett, az átlós dinamikus hatású.' }
      ]
    },
    {
      id: 'perspektiva',
      title: 'Perspektíva és térábrázolás',
      level: 2, minutes: 14,
      summary: 'Hogyan lesz a sík papíron tér? Takarás, méretcsökkenés, horizont, egy- és kétiránypontos perspektíva, légperspektíva.',
      tags: ['perspektíva', 'térábrázolás', 'horizont', 'szemmagasság', 'iránypont', 'enyészpont', 'egyiránypontos', 'kétiránypontos', 'takarás', 'légperspektíva', 'Brunelleschi', 'reneszánsz', 'rövidülés'],
      sections: [
        {
          title: 'Térhatás egyszerű eszközökkel',
          text: 'A papír sík, mégis el tudjuk hitetni a nézővel, hogy mélység van benne. A legegyszerűbb trükkök:\n\n- **Takarás**: ami elöl van, eltakarja a mögötte lévőt. Ezt már a gyerekrajzok is használják.\n- **Méretcsökkenés**: a távolabbi tárgyak kisebbnek látszanak. Két egyforma fa közül a távolabbi kisebb.\n- **Elhelyezés a képen**: a távolabbi tárgyak általában magasabbra, a horizonthoz közelebb kerülnek.\n- **Részletesség**: közelről minden levelet látunk, távolról csak foltokat.\n\nAz egyiptomi és a középkori képeken még nem a valóságos látvány, hanem a **fontosság** határozta meg a méretet: a fáraó vagy a szent nagyobb, mint a szolgák. Ezt **jelentésbeli nagyításnak** hívják.'
        },
        {
          title: 'Horizont és iránypont',
          text: 'Ha egy hosszú, egyenes vasúti síneken vagy egy úton nézel végig, látod, hogy a két párhuzamos vonal a távolban **egy pontba fut össze**. Ez a pont az **iránypont** (más néven enyészpont).\n\nAz iránypont mindig a **horizonton** (látóhatáron) van. A horizont a **szemmagasságodban** húzódik: ha leguggolsz, lejjebb kerül, ha létrára állsz, feljebb.\n\nA **lineáris (vonal-) perspektívát** a reneszánsz idején, a 15. század elején Firenzében dolgozta ki **Filippo Brunelleschi** építész, és **Leon Battista Alberti** írta le 1435-ben. Ettől kezdve a festők pontos, matematikai szabályokkal tudtak térhatású képet szerkeszteni.'
        },
        {
          title: 'Egyiránypontos perspektíva',
          text: 'Akkor használjuk, ha egy tárgy vagy tér egyik oldalát **szemből** látjuk: például egy hosszú folyosót, egy utcát, egy szoba hátsó falát vagy egy szemből látott dobozt.\n\n1. Húzd meg a **horizontot**, és jelöld ki rajta az **iránypontot**.\n2. Rajzold meg a tárgy szemből látszó lapját: ez egy **igazi téglalap**, torzítás nélkül.\n3. A téglalap sarkaitól húzz vékony segédvonalakat az iránypont felé.\n4. Döntsd el, milyen mélyre nyúljon a tárgy, és húzd meg a hátsó éleket az elülsőkkel **párhuzamosan**.\n5. Radírozd ki a felesleges segédvonalakat.\n\nA szemből látott vízszintes vonalak vízszintesek, a függőlegesek függőlegesek maradnak. Csak a **mélységbe** futó vonalak tartanak az iránypont felé.'
        },
        {
          title: 'Kétiránypontos perspektíva',
          text: 'Ha egy épületet vagy dobozt a **sarkáról** nézel, két oldalát is látod, és mindkét oldal elfut a távolba. Ilyenkor **két iránypontra** van szükség, mindkettő a horizonton, egymástól messze (sokszor a papír két szélén vagy még azon is túl).\n\n- Kezdd a hozzád **legközelebbi függőleges éllel**.\n- Ennek tetejétől és aljától húzz vonalakat a **bal** és a **jobb** iránypont felé.\n- A doboz két hátsó függőleges élét húzd meg ezeken a vonalakon belül.\n\nA függőleges élek itt is függőlegesek maradnak. Ha a doboz a horizont **alatt** van, a tetejét is látod; ha **fölötte**, akkor az alját.',
          tip: 'Rajzolj egy horizontot, rá két iránypontot, és próbálj meg egy egész utcasarkot felépíteni dobozokból! Utána ablakokat, ajtókat is rajzolhatsz: mindegyik vízszintes vonaluk a megfelelő iránypont felé fut.'
        },
        {
          title: 'Légperspektíva',
          text: 'A levegőben lévő pára és por miatt a távoli tárgyak másképp látszanak, mint a közeliek:\n\n- **halványabbak**, kisebb a kontrasztjuk\n- **kékesebbek**, szürkésebbek\n- **elmosódottabbak**, kevesebb a részlet\n\nNézz ki egy dombtetőről: a közeli fák élénkzöldek, a távoli hegyek kékesszürkék. Ezt a jelenséget **légperspektívának** hívjuk, és **Leonardo da Vinci** írta le és alkalmazta tudatosan. A Mona Lisa hátterében is így ködlik a kék tájkép. A festők ezért a háttérbe hideg, tompa, az előtérbe meleg, élénk színeket tesznek.'
        }
      ],
      quiz: [
        { q: 'Hol helyezkedik el az iránypont?', options: ['Mindig a kép alsó szélén', 'A horizonton (szemmagasságban)', 'A kép bal felső sarkában', 'Bárhol, ahol szeretnénk'], answer: 1, explain: 'A párhuzamos, mélységbe futó vonalak a horizonton lévő iránypontban találkoznak.' },
        { q: 'Mikor használunk kétiránypontos perspektívát?', options: ['Ha a tárgyat a sarkáról nézzük', 'Ha a tárgyat szemből nézzük', 'Ha két tárgy van a képen', 'Ha éjszakai képet rajzolunk'], answer: 0, explain: 'Sarokról nézve a tárgy két oldala két különböző irányba fut el, ezért két iránypont kell.' },
        { q: 'Milyennek látszanak a távoli hegyek a légperspektíva miatt?', options: ['élénkebbnek és pirosabbnak', 'élesebbnek', 'halványabbnak és kékesebbnek', 'nagyobbnak'], answer: 2, explain: 'A levegő párája miatt a távoli tárgyak halványak, kékesek és elmosódottak.' },
        { q: 'Ki dolgozta ki a lineáris perspektívát a reneszánsz Firenzében?', options: ['Michelangelo', 'Rembrandt', 'Claude Monet', 'Filippo Brunelleschi'], answer: 3, explain: 'Brunelleschi építész kísérletei után Alberti írta le a szabályokat 1435-ben.' }
      ]
    },
    {
      id: 'muveszettortenet-1',
      title: 'Művészettörténet I.: a barlangoktól a reneszánszig',
      level: 1, minutes: 16,
      summary: 'Barlangrajzok, egyiptomi, görög és római művészet, román és gótikus templomok, a reneszánsz nagy mesterei: Leonardo és Michelangelo.',
      tags: ['művészettörténet', 'őskor', 'barlangrajz', 'Lascaux', 'Willendorfi Vénusz', 'Egyiptom', 'piramis', 'Nofretete', 'görög', 'Parthenón', 'oszloprend', 'dór', 'ión', 'korinthoszi', 'Mürón', 'Róma', 'Pantheon', 'mozaik', 'román stílus', 'Ják', 'gótika', 'csúcsív', 'katedrális', 'ólomüveg', 'reneszánsz', 'Leonardo da Vinci', 'Mona Lisa', 'Michelangelo', 'Dávid', 'Sixtus-kápolna', 'Raffaello', 'Botticelli'],
      sections: [
        {
          title: 'Az őskor művészete',
          text: 'Az emberek már több tízezer éve alkotnak. A franciaországi **Chauvet-barlang** falfestményei több mint 30 000 évesek, a híres **Lascaux-i barlang** bölényei, lovai és szarvasai kb. 17 000 évesek. A festékeket földfestékekből (okker, szén) keverték, és ujjal, mohával vagy fújással vitték fel. A barlangrajzok talán **vadászvarázslatot** szolgáltak: azt remélték, hogy ha lerajzolják az állatot, el is ejtik.\n\nAz őskori szobrok közül a leghíresebb a kb. 30 000 éves **Willendorfi Vénusz**, egy kis mészkő nőszobor, valószínűleg a **termékenység** jelképe.'
        },
        {
          title: 'Egyiptom: az örökkévalóság művészete',
          text: 'Az egyiptomi művészet a **túlvilágnak** szólt: a sírokba szánt képeknek és szobroknak „örökké” kellett tartaniuk. Ezért szigorú szabályok szerint, évezredeken át szinte változatlan stílusban dolgoztak.\n\nAz emberábrázolás szabálya: a **fej és a láb oldalnézetből**, a **szem és a váll szemből** látszik. Így minden testrész a legjellemzőbb nézetéből jelenik meg. A fontosabb személy nagyobb.\n\nHíres alkotások: a **gízai piramisok** és a **Szfinx**, **Tutanhamon aranymaszkja** és **Nofretete királyné** festett mészkő mellszobra.'
        },
        {
          title: 'Görögök és rómaiak',
          text: 'A görögök a **harmóniát** és a tökéletes emberi testet keresték. Szobraik egyre élethűbbek lettek: **Mürón Diszkoszvetője** a mozdulat pillanatát örökíti meg, a **Milói Vénusz** a szépség eszménye.\n\nA görög templomokat **oszlopsorok** vették körül. Az oszlopok fején, a **fejezeten** ismerhető fel a három **oszloprend**:\n\n- **dór**: egyszerű, párnaszerű fejezet, erőteljes oszlop (például az athéni **Parthenón**)\n- **ión**: két csigavonalas fejezet, karcsúbb oszlop\n- **korinthoszi**: dús, akantuszlevelekkel díszített fejezet\n\nA **rómaiak** sokat átvettek a görögöktől, de nagyszerű mérnökök is voltak. Ők használták széles körben a **boltívet**, a **kupolát** és a betont. A római **Pantheon** kupolája közel 2000 éve áll, és ma is az egyik legnagyobb vasalatlan betonkupola. A rómaiak kedvelték a **mozaikot** (apró színes kövekből kirakott kép) és az élethű **portrészobrokat**.'
        },
        {
          title: 'Román stílus és gótika',
          text: 'A középkorban a művészet legfontosabb feladata a **vallás** szolgálata volt.\n\nA **román stílus** (kb. 1000–1250) templomai vastag falú, kis ablakú, zömök, várszerű épületek **félköríves** boltívekkel és kapukkal. Magyarország legszebb román kori temploma a **jáki templom** a gazdagon faragott kapujával.\n\nA **gótika** (kb. 1150–1500) Franciaországban született. Új találmánya a **csúcsív** és a kívül álló **támpillér**, amely átvette a falak terhét. Így a falak vékonyabbak, az ablakok óriásiak lehettek. A templomok az ég felé törtek, belsejüket a színes **ólomüveg ablakok** varázslatos fénnyel töltötték meg. A homlokzat közepén gyakran kerek **rózsaablak** áll. Híres gótikus templom a párizsi **Notre-Dame**, Magyarországon a budai **Mátyás-templom** és a kassai **Szent Erzsébet-dóm**.'
        },
        {
          title: 'A reneszánsz: újjászületés',
          text: 'A **reneszánsz** (francia szó, jelentése „újjászületés”) a 15. században **Itáliában**, főleg **Firenzében** kezdődött. A művészek újra felfedezték az ókori görög és római művészetet, és a középpontba az **embert** és a valóság pontos megfigyelését állították. Ekkor alakult ki a **perspektíva** és az anatómiailag pontos emberábrázolás.\n\n- **Leonardo da Vinci** (1452–1519) festő, szobrász, mérnök, feltaláló és tudós egy személyben: igazi „polihisztor”. Leghíresebb festménye a titokzatosan mosolygó **Mona Lisa** és a milánói **Utolsó vacsora** falkép. Jegyzetfüzeteiben repülő szerkezeteket, tankot, anatómiai rajzokat tervezett.\n- **Michelangelo Buonarroti** (1475–1564) elsősorban szobrásznak tartotta magát. Egyetlen márványtömbből faragta ki a több mint 4 méter magas **Dávid** szobrot. Négy évig festette magas állványon, hátrahajtott fejjel a vatikáni **Sixtus-kápolna** mennyezetét, rajta a híres **Ádám teremtésével**.\n- **Raffaello** (Athéni iskola) és **Sandro Botticelli** (Vénusz születése) szintén a kor nagy mesterei.\n\nMagyarországon **Mátyás király** udvarában (Buda, Visegrád) Itálián kívül az elsők között jelent meg a reneszánsz.'
        },
        {
          title: 'Idővonal',
          text: 'Kattints az évszámokra, aztán tedd időrendbe a műveket!',
          widget: { type: 'idovonal', options: { title: 'A barlangoktól a reneszánszig', events: [
            { year: -30000, label: 'kb. 30 000 éve', title: 'Willendorfi Vénusz', text: 'Kis mészkőszobor, a termékenység jelképe.' },
            { year: -15000, label: 'kb. 17 000 éve', title: 'Lascaux-i barlangrajzok', text: 'Bölények, lovak, szarvasok egy franciaországi barlang falán.' },
            { year: -2560, label: 'Kr. e. 2560 körül', title: 'Kheopsz piramisa', text: 'Elkészül Gízában a Nagy Piramis.' },
            { year: -1345, label: 'Kr. e. 1345 körül', title: 'Nofretete mellszobra', text: 'Az egyiptomi királyné festett mészkőszobra.' },
            { year: -447, label: 'Kr. e. 447', title: 'Elkezdik építeni a Parthenónt', text: 'Athén Akropoliszán Athéné istennő dór templomát kezdik építeni.' },
            { year: 125, label: 'Kr. u. 125 körül', title: 'A római Pantheon', text: 'Elkészül a hatalmas kupolás templom Hadrianus császár idején.' },
            { year: 1163, title: 'A párizsi Notre-Dame alapkőletétele', text: 'Elkezdődik a gótikus katedrális építése, amely közel 200 évig tart.' },
            { year: 1256, title: 'A jáki templom felszentelése', text: 'Magyarország legszebb román kori temploma.' },
            { year: 1485, label: '1485 körül', title: 'Botticelli: Vénusz születése', text: 'A firenzei reneszánsz egyik legismertebb festménye.' },
            { year: 1498, title: 'Leonardo: Utolsó vacsora', text: 'Elkészül a milánói kolostor falképe.' },
            { year: 1504, title: 'Michelangelo: Dávid', text: 'Firenzében felállítják a márványszobrot.' },
            { year: 1512, title: 'A Sixtus-kápolna mennyezete', text: 'Michelangelo négy év munka után befejezi a mennyezetfreskót.' }
          ] } }
        },
        {
          title: 'Párosító játék',
          text: 'Párosítsd a művet a korszakával vagy az alkotójával!',
          widget: { type: 'parositas', options: { title: 'Művek és korszakok', count: 6, pairs: [
            ['Lascaux-i bölények', 'Őskor'],
            ['Nofretete mellszobra', 'Ókori Egyiptom'],
            ['Parthenón', 'Ókori Görögország'],
            ['Pantheon', 'Ókori Róma'],
            ['Jáki templom', 'Román stílus'],
            ['Notre-Dame, Párizs', 'Gótika'],
            ['Mona Lisa', 'Leonardo da Vinci'],
            ['Dávid-szobor', 'Michelangelo']
          ] } }
        }
      ],
      quiz: [
        { q: 'Hogyan ábrázolták az egyiptomiak az emberi alakot?', options: ['Teljesen oldalnézetből', 'Fej és láb oldalról, szem és váll szemből', 'Felülnézetből', 'Teljesen szemből, perspektívával'], answer: 1, explain: 'Minden testrészt a legjellemzőbb nézetéből mutattak, ezért kevert nézetű alakokat festettek.' },
        { q: 'Mi a gótikus templomok jellegzetessége?', options: ['Vastag fal, kis ablak', 'Félköríves kapu', 'Csúcsív, támpillér, nagy ólomüveg ablakok', 'Lapos tető, oszlopcsarnok'], answer: 2, explain: 'A támpillérek átvették a terhet, így óriási, színes ablakok kerülhettek a vékony falakba.' },
        { q: 'Ki festette a Sixtus-kápolna mennyezetét?', options: ['Michelangelo', 'Leonardo da Vinci', 'Raffaello', 'Botticelli'], answer: 0, explain: 'Michelangelo 1508 és 1512 között festette, rajta az Ádám teremtése jelenettel.' },
        { q: 'Mit jelent a „reneszánsz” szó?', options: ['sötétség', 'hit', 'csúcsív', 'újjászületés'], answer: 3, explain: 'Az ókori művészet és tudás „újjászületésére” utal.' }
      ]
    },
    {
      id: 'muveszettortenet-2',
      title: 'Művészettörténet II.: a barokktól a modern művészetig',
      level: 2, minutes: 18,
      summary: 'Barokk pompa, impresszionista fények, az avantgárd forradalma és a nagy magyar festők: Munkácsy, Szinyei, Csontváry, Rippl-Rónai és Vasarely.',
      tags: ['barokk', 'Caravaggio', 'Rembrandt', 'Rubens', 'Bernini', 'impresszionizmus', 'Monet', 'Renoir', 'Van Gogh', 'posztimpresszionizmus', 'avantgárd', 'expresszionizmus', 'Munch', 'kubizmus', 'Picasso', 'szürrealizmus', 'Dalí', 'absztrakt', 'Kandinszkij', 'pop-art', 'Warhol', 'op-art', 'Munkácsy Mihály', 'Szinyei Merse Pál', 'Majális', 'Csontváry Kosztka Tivadar', 'Rippl-Rónai József', 'Vasarely Viktor'],
      sections: [
        {
          title: 'A barokk (kb. 1600–1750)',
          text: 'A barokk művészet **mozgalmas, pompás, drámai**. Erős fény-árnyék ellentétek, csavarodó mozdulatok, aranyozott, túldíszített templombelsők jellemzik. A cél az volt, hogy a néző **megrendüljön**, elámuljon.\n\n- **Caravaggio** (Itália) sötét háttérből élesen kivilágított alakokat festett.\n- **Rembrandt** (Hollandia) a fény és az árnyék mestere: leghíresebb képe az **Éjjeli őrjárat**.\n- **Rubens** (Flandria) dús, mozgalmas, színes képeket festett.\n- **Bernini** szobrai és római kútjai szinte mozognak a márványban.\n\nMagyarországon a török kiűzése után épült sok barokk templom és kastély, például az egri **minorita templom** és a fertődi **Esterházy-kastély**, amelyet „magyar Versailles-nak” is neveznek.'
        },
        {
          title: 'Az impresszionizmus: festeni a fényt',
          text: 'A 19. század második felében néhány fiatal francia festő kivitte a festőállványt a **szabadba**. Nem a műteremben, hanem a természetben, gyorsan dolgoztak, hogy elkapják a **pillanatnyi fényt** és benyomást. A nevük is innen jön: az impresszió **benyomást** jelent.\n\nJellemzőik: **apró, látható ecsetvonások**, világos, tiszta színek, az árnyék sem fekete, hanem színes (kékes, lilás). Témájuk a hétköznapi élet: tájak, kertek, kávéházak, folyópartok.\n\n- **Claude Monet** „Impresszió, a felkelő nap” című képéről kapta a csoport a nevét (1874-ben állították ki). Később a vízililiomos kertjét festette sokszor.\n- **Auguste Renoir** vidám, napfényes társasági jeleneteket festett.\n- Utánuk jöttek a **posztimpresszionisták**: **Vincent van Gogh** örvénylő ecsetvonásokkal (Csillagos éj, Napraforgók), **Paul Cézanne** és **Paul Gauguin**.'
        },
        {
          title: 'Az avantgárd: új utak a 20. században',
          text: 'A fénykép feltalálása után a festészetnek már nem kellett pontosan lemásolnia a valóságot. Az **avantgárd** („élcsapat”) művészek új utakat kerestek.\n\n- **Expresszionizmus**: az érzelmek erős, torzított kifejezése. Például **Edvard Munch: A sikoly**.\n- **Kubizmus**: a tárgyakat geometrikus formákra bontják, és egyszerre több nézőpontból mutatják. Vezéralakja **Pablo Picasso** (Avignoni kisasszonyok, Guernica).\n- **Szürrealizmus**: álomszerű, lehetetlen jelenetek. **Salvador Dalí** olvadó órái (Az emlékezet állandósága) a leghíresebbek.\n- **Absztrakt művészet**: nem ábrázol felismerhető tárgyat, csak színek, foltok, vonalak hatnak. Úttörője **Vaszilij Kandinszkij**.\n- **Pop-art**: a reklámok, képregények, tömegtermékek világa. **Andy Warhol** leveskonzervjei és Marilyn Monroe-portréi.\n- **Op-art** (optikai művészet): a szemet megtévesztő, vibráló, térhatású geometrikus minták. „Atyja” a magyar születésű **Vasarely Viktor**.'
        },
        {
          title: 'Nagy magyar festők',
          text: '- **Munkácsy Mihály** (1844–1900) asztalosinasból lett világhírű festő. A **Siralomház** című képével lett híres Párizsban, ahol évtizedekig élt. Monumentális képei a Krisztus-trilógia (Krisztus Pilátus előtt, Golgota, Ecce homo) és a Parlament számára festett **Honfoglalás**. Sötét tónusú, drámai, realista képeket festett.\n- **Szinyei Merse Pál** (1845–1920) **Majális** (1873) című képe napfényes, szabadban festett piknikjelenet. A francia impresszionistákkal egy időben, tőlük függetlenül jutott hasonló eredményre, de itthon akkor nem értették meg. Másik híres képe a **Pacsirta** és a **Lilaruhás nő**.\n- **Csontváry Kosztka Tivadar** (1853–1919) patikusként dolgozott, amikor egy látomás hatására festő lett. Hatalmas, ragyogó színű, különleges képeket festett: **A magányos cédrus**, **Római híd Mostarban**, **Baalbek**. Életében alig ismerték el, ma Pécsett külön múzeum őrzi műveit.\n- **Rippl-Rónai József** (1861–1927) Párizsban a Nabis nevű csoporthoz csatlakozott. Hazatérve Kaposváron élénk, mozaikszerű foltokból álló, ún. **kukoricás** stílusban festett, például az **Apám és Piacsek bácsi vörösbor mellett** című képet.\n- **Vasarely Viktor** (1906–1997) Pécsen született, Párizsban lett világhírű. Az **op-art** megteremtője: korai **Zebrák** című képén csak fekete-fehér csíkokból áll össze a két zebra. Pécsen és Budapesten is van múzeuma.',
          tip: 'Sok itt említett magyar kép eredetijét Budapesten, a **Magyar Nemzeti Galériában** (Budavári Palota) láthatod.'
        },
        {
          title: 'Idővonal',
          text: 'Kattints az évszámokra, aztán tedd időrendbe a műveket!',
          widget: { type: 'idovonal', options: { title: 'A barokktól a modern művészetig', events: [
            { year: 1642, title: 'Rembrandt: Éjjeli őrjárat', text: 'A holland barokk egyik leghíresebb csoportképe.' },
            { year: 1870, title: 'Munkácsy: Siralomház', text: 'A párizsi Szalonban kiállított kép meghozza Munkácsy hírnevét.' },
            { year: 1873, title: 'Szinyei Merse Pál: Majális', text: 'Szabadban festett, napfényes piknikjelenet.' },
            { year: 1874, title: 'Az első impresszionista kiállítás', text: 'Monet „Impresszió, a felkelő nap” című képe adja a csoport nevét.' },
            { year: 1889, title: 'Van Gogh: Csillagos éj', text: 'Örvénylő égbolt egy kis falu fölött.' },
            { year: 1893, title: 'Munch: A sikoly', text: 'Az expresszionizmus előfutára.' },
            { year: 1907, title: 'Csontváry: A magányos cédrus', text: 'Csontváry egyik legismertebb, jelképes képe.' },
            { year: 1907.5, label: '1907', title: 'Picasso: Avignoni kisasszonyok', text: 'Ebből a képből indul a kubizmus.' },
            { year: 1931, title: 'Dalí: Az emlékezet állandósága', text: 'Az olvadó órák, a szürrealizmus jelképe.' },
            { year: 1937, title: 'Vasarely: Zebrák', text: 'Fekete-fehér csíkokból kibontakozó zebrák, az op-art előfutára.' },
            { year: 1962, title: 'Warhol: Campbell-leveskonzervek', text: 'A pop-art egyik leghíresebb műve.' }
          ] } }
        },
        {
          title: 'Párosító játék: ki festette?',
          text: 'Párosítsd a művet az alkotójával!',
          widget: { type: 'parositas', options: { title: 'Művek és alkotók', count: 6, pairs: [
            ['Éjjeli őrjárat', 'Rembrandt'],
            ['Impresszió, a felkelő nap', 'Claude Monet'],
            ['Csillagos éj', 'Vincent van Gogh'],
            ['Guernica', 'Pablo Picasso'],
            ['Siralomház', 'Munkácsy Mihály'],
            ['Majális', 'Szinyei Merse Pál'],
            ['A magányos cédrus', 'Csontváry Kosztka Tivadar'],
            ['Apám és Piacsek bácsi vörösbor mellett', 'Rippl-Rónai József'],
            ['Zebrák', 'Vasarely Viktor']
          ] } }
        }
      ],
      quiz: [
        { q: 'Miről kapta nevét az impresszionizmus?', options: ['Egy párizsi utcáról', 'Monet „Impresszió, a felkelő nap” című képéről', 'Egy festékmárkáról', 'Egy magyar festőről'], answer: 1, explain: 'Egy kritikus gúnyosan nevezte el őket Monet képe alapján, de a név megmaradt.' },
        { q: 'Ki festette a Majálist?', options: ['Munkácsy Mihály', 'Csontváry Kosztka Tivadar', 'Szinyei Merse Pál', 'Rippl-Rónai József'], answer: 2, explain: 'Szinyei Merse Pál 1873-ban festette, a francia impresszionistáktól függetlenül.' },
        { q: 'Melyik irányzat megteremtője Vasarely Viktor?', options: ['kubizmus', 'barokk', 'impresszionizmus', 'op-art'], answer: 3, explain: 'Az op-art (optikai művészet) szemet megtévesztő geometrikus mintákkal dolgozik.' },
        { q: 'Mi jellemző a kubizmusra?', options: ['A tárgyak geometrikus formákra bontása, több nézőpont egyszerre', 'Pontos, fényképszerű ábrázolás', 'Olvadó órák és álomképek', 'Csak egyetlen szín használata'], answer: 0, explain: 'Picasso és Braque a tárgyakat síkokra, kockaszerű formákra bontották.' }
      ]
    },
    {
      id: 'digitalis-kep',
      title: 'Digitális kép és design',
      level: 2, minutes: 15,
      summary: 'Pixel és felbontás, raszter- és vektorgrafika, a tipográfia alapjai, plakát- és logótervezés, és a szerzői jog röviden.',
      tags: ['digitális kép', 'pixel', 'felbontás', 'megapixel', 'dpi', 'ppi', 'raszter', 'vektor', 'JPG', 'PNG', 'SVG', 'tipográfia', 'betűtípus', 'talpas', 'talpatlan', 'betűméret', 'plakát', 'logó', 'arculat', 'design', 'szerzői jog', 'Creative Commons', 'forrásmegjelölés'],
      sections: [
        {
          title: 'Pixelekből álló képek',
          text: 'A telefonod kijelzőjén és a digitális fényképeken a kép apró, egyszínű négyzetekből, **pixelekből** (képpontokból) áll. Ha nagyon belenagyítasz egy fotóba, láthatod a „kockákat”.\n\nA **felbontás** azt mutatja meg, hány pixelből áll a kép. Egy Full HD kép **1920 × 1080** pixeles, ez kb. 2 millió képpont. A fényképezőgépek felbontását **megapixelben** adják meg (1 megapixel = 1 millió pixel).\n\nNyomtatásnál az is számít, hogy egy hüvelykre (2,54 cm-re) hány képpont jut: ez a **dpi** vagy **ppi**. Jó minőségű nyomtatáshoz kb. **300 dpi** kell; képernyőre ennél jóval kevesebb is elég.'
        },
        {
          title: 'Raszter és vektor',
          text: 'Kétféle digitális kép van:\n\n- **Rasztergrafika** (bittérkép): a kép pixelekből áll. Fényképekhez, festményszerű képekhez ideális. Ha nagyon felnagyítod, **„kockás”, homályos** lesz. Gyakori formátumai: **JPG** (fotókhoz), **PNG** (átlátszó háttér is lehet), **GIF**.\n- **Vektorgrafika**: a kép nem pixelekből, hanem **matematikailag leírt alakzatokból** áll: pontokból, vonalakból, görbékből, kitöltésekből. Bármekkorára nagyíthatod, **mindig éles** marad. Logókhoz, ikonokhoz, betűkhöz, ábrákhoz használjuk. Formátuma például az **SVG** és a PDF.\n\nA képernyő **RGB** fényszínekkel dolgozik, a nyomda **CMYK** festékekkel (lásd a színkeverés leckét). Ezért egy nyomtatott kép színei kicsit eltérhetnek a monitoron látottól.',
          tip: 'Egy logót mindig vektorosan érdemes elkészíteni: ugyanaz a fájl jó lesz egy kis névjegykártyára és egy óriásplakátra is.'
        },
        {
          title: 'Tipográfia: a betűk művészete',
          text: 'A **tipográfia** a betűk kiválasztásának és elrendezésének tudománya. A betűtípusok két nagy csoportja:\n\n- **Talpas** (serif) betűk: a szárak végén kis „talpak” vannak, például a Times New Roman. Klasszikus, komoly hatásúak, hosszú nyomtatott szövegekben, könyvekben gyakoriak.\n- **Talpatlan** (sans serif) betűk: egyszerű, egyenletes vonalúak, például az Arial vagy a Helvetica. Modern, tiszta hatásúak, képernyőn és feliratokon jól olvashatók.\n\nA betűméretet **pontban** (pt) adjuk meg. Néhány jó tanács:\n\n- Egy munkában legfeljebb **2–3 betűtípust** használj.\n- A fontos dolgokat **mérettel, vastagsággal** emeld ki, ne csupa nagybetűvel.\n- Ügyelj a **kontrasztra**: sötét betű világos háttéren vagy fordítva. Sárga betű fehér alapon olvashatatlan!\n- Hagyj elég **sorközt** és **margót**: a „levegős” szöveg könnyebben olvasható.'
        },
        {
          title: 'Plakát és logó',
          text: 'A **plakátot** az emberek csak néhány másodpercig nézik, gyakran messziről vagy elhaladva. Ezért:\n\n- legyen egy **erős, figyelemfelkeltő kép** vagy forma\n- **kevés szöveg**, nagy, jól olvasható betűkkel\n- egyértelmű **sorrend**: először a cím, aztán a legfontosabb adatok (mi, hol, mikor)\n- erős **kontraszt** és kevés, összeillő szín\n\nA **logó** egy cég, egyesület vagy rendezvény jelképe. Egy jó logó:\n\n- **egyszerű**, és gyorsan felismerhető\n- **kicsiben** is működik (például egy telefonos ikonon)\n- **fekete-fehérben** is érthető\n- **egyedi**, nem hasonlít más logókra\n- utal arra, amit képvisel\n\nA logó, a színek és a betűtípusok együtt alkotják az **arculatot**: ettől ismerjük fel egy cég minden termékét és hirdetését.'
        },
        {
          title: 'Szerzői jog röviden',
          text: 'Minden kép, fotó, rajz, zene és szöveg alkotóját **szerzői jog** védi. Ez a védelem **automatikusan** létrejön, amint a mű elkészül: nem kell bejegyeztetni, és a © jel sem kötelező. Magyarországon a jog a szerző halála után még **70 évig** él.\n\nMit jelent ez neked?\n\n- Egy interneten talált képet **nem használhatsz szabadon** egy plakáton, weboldalon vagy videóban csak azért, mert le tudtad tölteni.\n- Iskolai feladatban idézhetsz, de mindig írd oda a **forrást** és a szerzőt.\n- Keress **szabadon felhasználható** képeket: sok alkotó **Creative Commons** licenccel osztja meg a műveit, ami megmondja, mire és milyen feltételekkel használhatod őket.\n- A saját rajzaid, fotóid a te műveid: neked is jogod van eldönteni, ki használhatja őket.',
          warn: 'Más ember fotóját (különösen arcképét) csak az engedélyével tedd közzé az interneten!'
        },
        {
          title: 'Párosító játék',
          text: 'Párosítsd a fogalmat a jelentésével!',
          widget: { type: 'parositas', options: { title: 'Digitális kép és design', count: 6, pairs: [
            ['Pixel', 'A raszteres kép legkisebb, egyszínű pontja'],
            ['Felbontás', 'Hány pixelből áll a kép'],
            ['Vektorgrafika', 'Alakzatokból álló, bármekkorára nagyítható kép'],
            ['JPG', 'Fényképekhez használt rasztergrafikus formátum'],
            ['SVG', 'Vektorgrafikus fájlformátum'],
            ['Talpatlan betű', 'Egyszerű, talpak nélküli betűtípus, pl. Arial'],
            ['Arculat', 'A logó, színek és betűk egységes rendszere'],
            ['Creative Commons', 'Licenc, amely megmondja, hogyan használhatod a művet']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi történik egy rasztergrafikus képpel, ha nagyon felnagyítod?', options: ['Élesebb lesz', 'Kockás, homályos lesz', 'Átlátszó lesz', 'Vektorgrafika lesz belőle'], answer: 1, explain: 'A raszteres kép pixelekből áll, nagyításkor a pixelek is nagyok lesznek.' },
        { q: 'Milyen grafikában érdemes logót készíteni?', options: ['vektorgrafikában', 'kis felbontású JPG-ben', 'GIF animációban', 'kézzel, papíron, beszkennelés nélkül'], answer: 0, explain: 'A vektoros logó bármilyen méretben éles marad.' },
        { q: 'Meddig védi a szerzői jog a művet Magyarországon?', options: ['A mű elkészülte után 5 évig', 'Csak a szerző életében', 'A szerző halála után 70 évig', 'Örökké'], answer: 2, explain: 'A védelem a szerző életében és halála után 70 évig tart. Ezután a mű közkinccsé válik.' },
        { q: 'Melyik jó tanács plakáttervezéshez?', options: ['Minél több szöveg, kis betűvel', 'Minél több különböző betűtípus', 'Sárga betű fehér háttéren', 'Kevés szöveg, nagy betű, erős kontraszt'], answer: 3, explain: 'A plakátot pár másodperc alatt, messziről kell megérteni.' }
      ]
    }
  ]
});
