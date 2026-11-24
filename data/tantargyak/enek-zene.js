/* Tantárgy: Ének-zene (5–8. osztály) */
STUDIE.addSubject({
  id: 'enek-zene',
  stage: 'altalanos',
  title: 'Ének-zene',
  icon: '🎵',
  color: '#7c5cd6',
  description: 'Hang, ritmus, kotta és szolmizáció, hangközök és skálák, hangszerek és a zenetörténet nagy alakjai, kipróbálható zongorával.',
  intro: 'A zene a hangok **rendezett játéka**: magasság, hosszúság, erősség és szín. Ebben a tárgyban megtanulod, hogyan születik a hang, hogyan olvasd a kottát, mi a **szolmizáció**, és hogyan épülnek fel a skálák meg az akkordok. Több leckében találsz egy **zongorát**: kattints a billentyűire, hallgass meg skálákat, és próbáld ki a hangköz-felismerő játékot! (Ha nem szól, nézd meg, hogy a géped hangja be van-e kapcsolva.) A zenetörténeti idővonalon pedig Bachtól Bartókig bejárhatod a zene történetét.',
  lessons: [
    {
      id: 'hang-alapjai',
      title: 'A hang és a zene alapjai',
      level: 1, minutes: 12,
      summary: 'Mi a hang fizikailag? Hangmagasság, hangerő, hangszín, ritmus és tempó, valamint a 440 Hz-es zenei a¹.',
      tags: ['hang', 'rezgés', 'frekvencia', 'hertz', 'hangmagasság', 'hangerő', 'decibel', 'hangszín', 'felhang', 'ritmus', 'tempó', 'egyenletes lüktetés', 'dinamika', 'a¹', '440 Hz', 'hangvilla'],
      sections: [
        {
          title: 'Honnan jön a hang?',
          text: 'Minden hang **rezgésből** születik. Ha megpendítesz egy gumiszalagot, látod, ahogy ide-oda remeg. A rezgő tárgy meglöki a körülötte lévő levegőt, és a levegőben egy nyomáshullám indul el: ez a **hanghullám**. Amikor a hullám eléri a fülünket, megrezegteti a **dobhártyát**, az agyunk pedig hangként értelmezi.\n\nA hang levegőben kb. **340 méter/másodperc** sebességgel terjed. Ezért látod előbb a villámot, és csak utána hallod a mennydörgést. Légüres térben (például a világűrben) nincs, ami továbbvigye a rezgést, ezért ott **nincs hang**.'
        },
        {
          title: 'Magasság, erősség, szín',
          text: 'Egy zenei hangnak négy fő tulajdonsága van:\n\n- **Hangmagasság**: attól függ, hányszor rezeg a hangforrás másodpercenként. Ez a **frekvencia**, mértékegysége a **hertz (Hz)**. Gyors rezgés = magas hang, lassú rezgés = mély hang.\n- **Hangerő**: attól függ, mekkora a rezgés kitérése. Erős pengetés = hangos hang. A hangosságot **decibelben (dB)** mérjük.\n- **Hangszín**: ettől ismered fel, hogy ugyanazt a hangot hegedű vagy fuvola szólaltatja meg. A hangszerek az alaphang mellett halkabb **felhangokat** is megszólaltatnak, és ezek keveréke adja a jellegzetes színt.\n- **Hangidő**: meddig szól a hang. Ebből épül fel a ritmus.\n\nAz emberi fül nagyjából **20 Hz és 20 000 Hz** között hall. Ami ennél mélyebb, az infrahang, ami magasabb, az ultrahang: a denevérek és a delfinek ezt is hallják.',
          tip: 'Ha egy hang frekvenciáját megkétszerezed, pontosan egy **oktávval** magasabb hangot kapsz. Az a¹ 440 Hz, az eggyel fölötte lévő a² 880 Hz, az alatta lévő a 220 Hz.'
        },
        {
          title: 'A zenei a¹: 440 Hz',
          text: 'Ha egy zenekar minden tagja máshogy hangolna, borzasztó hamis lenne a zene. Ezért megegyeztek egy közös viszonyítási hangban: ez a **zenei a¹** (egyvonalas a), amelynek frekvenciája **440 Hz**. A hangszereket egy **hangvillához** vagy elektronikus hangolóhoz igazítják. A szimfonikus zenekar koncert előtt az **oboa** „á” hangjára hangol.\n\nA zongorán a középső C (c¹) fölötti A billentyű ez a hang. Az alábbi zongorán ki van emelve az a¹ és az egy oktávval magasabb a² is: hallgasd meg mindkettőt, és figyeld meg, mennyire „rokon” a két hang!',
          widget: { type: 'zongora', options: { title: 'Az a¹ (440 Hz) és az a² (880 Hz)', help: 'A kiemelt billentyűk az a¹ és az a². Kattints rájuk, és hasonlítsd össze a hangjukat! A többi billentyűt is kipróbálhatod: balra mélyebb, jobbra magasabb hangokat találsz.', highlight: [69, 81] } }
        },
        {
          title: 'Ritmus, tempó, dinamika',
          text: 'A zene időben zajlik, ezért az idő megszervezése nagyon fontos.\n\n- Az **egyenletes lüktetés** (alapütés) olyan, mint a szívverés: a zene alatt végig ugyanolyan közönként „ketyeg”.\n- A **ritmus** a hosszabb és rövidebb hangok váltakozása ezen a lüktetésen. Ha egy dalt csak tapsolsz, a ritmusát hallod.\n- A **tempó** a zene sebessége, vagyis hogy milyen gyors az alapütés. Pontosan a **metronóm** mutatja meg, hány ütés van egy perc alatt.\n- A **dinamika** a hangerő változása: halk (piano), erős (forte), erősödő (crescendo), halkuló (decrescendo).\n\nA tempót és a dinamikát a kottában hagyományosan **olasz szavakkal** jelölik, mert a 17–18. században Itália volt a zene központja.'
        },
        {
          title: 'Párosító játék: olasz zenei szavak',
          text: 'Párosítsd az olasz tempó- és dinamikai jelzéseket a jelentésükkel!',
          widget: { type: 'parositas', options: { title: 'Tempó- és dinamikai jelzések', count: 6, pairs: [
            ['allegro', 'gyorsan, élénken'],
            ['adagio', 'lassan, nyugodtan'],
            ['andante', 'lépésben, mérsékelten lassan'],
            ['presto', 'nagyon gyorsan'],
            ['largo', 'szélesen, nagyon lassan'],
            ['moderato', 'mérsékelt tempóban'],
            ['piano (p)', 'halkan'],
            ['forte (f)', 'erősen, hangosan'],
            ['crescendo', 'fokozatosan erősödve'],
            ['decrescendo', 'fokozatosan halkulva']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mitől függ a hang magassága?', options: ['A rezgés kitérésétől', 'A rezgés frekvenciájától', 'A hangszer anyagától', 'A terem méretétől'], answer: 1, explain: 'Minél többször rezeg a hangforrás másodpercenként, annál magasabb a hang.' },
        { q: 'Mekkora a zenei a¹ frekvenciája?', options: ['220 Hz', '1000 Hz', '440 Hz', '20 Hz'], answer: 2, explain: 'A nemzetközi hangolási alaphang az a¹ = 440 Hz. A 220 Hz egy oktávval mélyebb.' },
        { q: 'Mit jelent az „allegro”?', options: ['gyorsan, élénken', 'halkan', 'nagyon lassan', 'erősödve'], answer: 0, explain: 'Az allegro gyors tempót jelöl. A halkan a piano, a nagyon lassan a largo.' },
        { q: 'Miért nincs hang a világűrben?', options: ['Mert túl hideg van', 'Mert nincs gravitáció', 'Mert nincs levegő, ami továbbvinné a rezgést', 'Mert túl sötét van'], answer: 2, explain: 'A hang rugalmas közegben (levegő, víz, szilárd anyag) terjed. Légüres térben nincs ilyen közeg.' }
      ]
    },
    {
      id: 'kottaolvasas',
      title: 'Kottaolvasás',
      level: 1, minutes: 14,
      summary: 'Vonalrendszer, violin- és basszuskulcs, hangjegyértékek és szünetjelek, ütemmutató, a hangok magyar nevei és a módosítójelek.',
      tags: ['kotta', 'vonalrendszer', 'pótvonal', 'violinkulcs', 'G-kulcs', 'basszuskulcs', 'F-kulcs', 'hangjegy', 'egész hang', 'félhang', 'negyed', 'nyolcad', 'szünetjel', 'ütem', 'ütemvonal', 'ütemmutató', 'hangnevek', 'C D E F G A H', 'kereszt', 'bé', 'feloldójel', 'Cisz', 'B'],
      sections: [
        {
          title: 'Az öt vonal',
          text: 'A kotta a zene írása. A hangjegyeket egy **ötvonalas vonalrendszerre** írjuk. A vonalakat és a köztük lévő **közöket** alulról felfelé számoljuk: 5 vonal és 4 köz van. Minél **feljebb** áll egy hangjegy, annál **magasabb** a hang.\n\nHa egy hang túl magas vagy túl mély a vonalrendszerhez, rövid segédvonalat, **pótvonalat** húzunk neki. A középső C (c¹) például violinkulcsban az első alsó pótvonalon ül.'
        },
        {
          title: 'Kulcsok: melyik vonal melyik hang?',
          text: 'A vonalrendszer elején álló **kulcs** mondja meg, melyik vonalon melyik hang van.\n\n- A **violinkulcs** (G-kulcs) a második vonalon kezdődő csigájával jelzi, hogy ott a **g¹** hang áll. Ebben írják a magasabb hangokat: a dallamot, a hegedű, a fuvola vagy a szoprán szólamát.\n- A **basszuskulcs** (F-kulcs) két pöttye a negyedik vonalat fogja közre: ott az **f** (kis f) hang van. Ebben írják a mélyebb hangokat: a cselló, a nagybőgő vagy a zongora bal kezének szólamát.\n\nViolinkulcsban a vonalakon alulról felfelé ezek a hangok állnak: **E, G, H, D, F**, a közökben pedig: **F, A, C, E**.',
          tip: 'Egy kis segítség a vonalakhoz violinkulcsban: „**E**gy **G**örög **H**ajós **D**alolva **F**ürdött”. Kitalálhatsz saját mondatot is, csak a szavak kezdőbetűje stimmeljen!'
        },
        {
          title: 'A hangok magyar nevei',
          text: 'A hét törzshang neve magyarul: **C, D, E, F, G, A, H**. Figyelj, ez nem pontosan az ábécé! Ami angolul „B”, az nálunk **H**. A magyar **B** pedig egy másik hang: a H-nál egy félhanggal mélyebb (angolul „B flat”).\n\nA hangokat **módosítójelek** emelhetik vagy szállíthatják le egy félhanggal:\n\n- **Kereszt (♯)**: fél hanggal emel, a hang neve **-isz** végződést kap. C → **Cisz**, D → **Disz**, F → **Fisz**, G → **Gisz**, A → **Aisz**.\n- **Bé (♭)**: fél hanggal leszállít, a hang neve **-esz** vagy **-sz** végződést kap. D → **Desz**, E → **Esz**, G → **Gesz**, A → **Asz**. Kivétel: a leszállított H neve egyszerűen **B**.\n- **Feloldójel (♮)**: visszavonja a módosítást, újra a törzshang szól.\n\nA zongorán a fehér billentyűk a törzshangok, a fekete billentyűk a módosított hangok. A Cisz és a Desz ugyanazon a fekete billentyűn szól: ugyanaz a hang, csak más néven írjuk.',
          widget: { type: 'zongora', options: { title: 'Törzshangok: C D E F G A H', help: 'A kiemelt fehér billentyűk a c¹-től h¹-ig tartó hét törzshang. Kattints rájuk sorban! A fekete billentyűkön a keresztes vagy bés hangokat hallod: a kijelzőn a nevüket is látod.', highlight: [60, 62, 64, 65, 67, 69, 71] } }
        },
        {
          title: 'Hangjegyértékek és szünetjelek',
          text: 'A hangjegy **alakja** azt mutatja meg, mennyi ideig tart a hang. Az alapegység 4/4-es ütemben a **negyed** (egy ütés).\n\n- **Egész hang**: üres, szár nélküli ovális, 4 negyednyi ideig tart.\n- **Fél hang**: üres fej szárral, 2 negyed.\n- **Negyed hang**: telt fej szárral, 1 negyed (ritmusneve: **tá**).\n- **Nyolcad hang**: telt fej szárral és zászlóval, fél negyed. Kettőt gerendával kötünk össze (ritmusneve: **ti-ti**).\n- **Tizenhatod hang**: két zászló vagy két gerenda, negyed negyed.\n\nA csendnek is van jele: minden hangjegyértéknek megvan a **szünetjele** (egész szünet, fél szünet, negyed szünet, nyolcad szünet). A hangjegy utáni **pont** a hang hosszát a felével megnyújtja: a pontozott fél hang 3 negyednyi.'
        },
        {
          title: 'Ütem és ütemmutató',
          text: 'A zenét egyenlő részekre, **ütemekre** osztjuk. Az ütemeket függőleges **ütemvonal** választja el, a darab végén pedig **záróvonal** (egy vékony és egy vastag vonal) áll.\n\nA kulcs után álló **ütemmutató** két számból áll. A felső azt mondja meg, **hány** egység fér egy ütembe, az alsó azt, hogy **mekkora** ez az egység.\n\n- **2/4**: két negyed egy ütemben, például indulók, sok gyermekdal.\n- **3/4**: három negyed, ez a **keringő** (valcer) lüktetése: EGY-két-há.\n- **4/4**: négy negyed, a leggyakoribb ütem, sokszor C betűszerű jellel írják.\n\nAz ütem első ütése általában **hangsúlyos**. A magyar népdalok és a magyar beszéd is az első szótagot hangsúlyozza, ezért szépen illeszkednek az ütemekhez.'
        },
        {
          title: 'Párosító játék',
          text: 'Párosítsd a kottajelet a jelentésével!',
          widget: { type: 'parositas', options: { title: 'Kottajelek', count: 6, pairs: [
            ['Violinkulcs', 'A második vonalon a g¹ hang áll'],
            ['Basszuskulcs', 'A negyedik vonalon a kis f hang áll'],
            ['Kereszt (♯)', 'Fél hanggal emel'],
            ['Bé (♭)', 'Fél hanggal leszállít'],
            ['Feloldójel (♮)', 'Visszavonja a módosítást'],
            ['Pótvonal', 'Segédvonal a vonalrendszer fölött vagy alatt'],
            ['Ütemvonal', 'Elválasztja az ütemeket'],
            ['Pont a hangjegy után', 'A hang hosszát a felével megnyújtja']
          ] } }
        }
      ],
      quiz: [
        { q: 'Hogyan hívjuk magyarul azt a hangot, amely angolul „B”?', options: ['B', 'H', 'Hesz', 'Bisz'], answer: 1, explain: 'A magyar hangsor C D E F G A H. A magyar B a H-nál fél hanggal mélyebb hang (angolul B flat).' },
        { q: 'Mi lesz a Cisz hang neve, ha a C-t kereszttel emeljük?', options: ['Cesz', 'Desz', 'Cisz', 'Ciz'], answer: 2, explain: 'A kereszt -isz végződést ad: C → Cisz. (Ugyanaz a billentyű a Desz is, de ezt a D leszállításával kapjuk.)' },
        { q: 'Hány negyed fér egy 3/4-es ütembe?', options: ['3', '4', '2', '6'], answer: 0, explain: 'A felső szám az egységek száma, az alsó (4) azt jelenti, hogy az egység a negyed.' },
        { q: 'Hány negyednyi ideig tart egy egész hang?', options: ['1', '2', '3', '4'], answer: 3, explain: 'Egész = 2 fél = 4 negyed = 8 nyolcad.' }
      ]
    },
    {
      id: 'szolmizacio',
      title: 'Szolmizáció és a Kodály-módszer',
      level: 1, minutes: 12,
      summary: 'Dó-ré-mi és a kézjelek: a relatív szolmizáció, a ritmusnevek, a pentatónia a magyar népzenében, és mit tanult a világ Kodálytól.',
      tags: ['szolmizáció', 'dó', 'ré', 'mi', 'fá', 'szó', 'lá', 'ti', 'kézjel', 'relatív szolmizáció', 'Kodály-módszer', 'Kodály Zoltán', 'ritmusnevek', 'tá', 'ti-ti', 'pentatónia', 'ötfokú hangsor', 'népdal', 'UNESCO'],
      sections: [
        {
          title: 'Dó, ré, mi, fá, szó, lá, ti',
          text: 'A **szolmizáció** a hangok éneklésére szolgáló szótagrendszer: **dó, ré, mi, fá, szó, lá, ti**, majd ismét **dó’** (felső dó). Az ötlet egy 11. századi itáliai szerzetestől, **Guido d’Arezzótól** származik, aki egy himnusz sorainak kezdőszótagjaival tanította énekelni a szerzeteseket.\n\nAz egymás utáni hangok távolsága nem egyforma. A **mi–fá** és a **ti–dó’** között csak **félhang** van, a többi szomszédos hang között **egészhang**. Ezért szól úgy a dúr skála, ahogy szól.',
          tip: 'Írásban a szolmizációs hangokat gyakran a kezdőbetűjükkel jelöljük: d, r, m, f, s, l, t. A felső hangokat vesszővel (d’), az alsókat alsó vesszővel jelölik (l,).'
        },
        {
          title: 'Relatív szolmizáció: a dó vándorol',
          text: 'A magyar zeneoktatás **relatív szolmizációt** használ. Ez azt jelenti, hogy a **dó nincs egy hanghoz kötve**: bármelyik hang lehet dó. Ha a C a dó, akkor a D a ré, az E a mi. Ha viszont a G a dó, akkor az A a ré, a H a mi.\n\nMiért jó ez? Mert a szolmizációs nevek a hangok **egymáshoz való viszonyát** mutatják. A „szó–mi” lépés mindig ugyanúgy szól, akármilyen magasról kezdjük. Így könnyebb kottából énekelni, és könnyebb egy dallamot más magasságban is elénekelni (ezt **transzponálásnak** hívjuk).\n\nA kotta elején álló **dó-kulcs** vagy az előjegyzés mutatja meg, hol van a dó.',
          widget: { type: 'zongora', options: { title: 'Szolmizáció a zongorán (dó = C)', help: 'Itt a dó a C. Kattints a billentyűkre: a kijelzőn a hang neve mellett a szolmizációs nevét is látod. Próbáld ki a „C-dúr skála” gombot, és énekeld vele: dó, ré, mi, fá, szó, lá, ti, dó!', highlight: [60, 62, 64, 65, 67, 69, 71, 72] } }
        },
        {
          title: 'A kézjelek',
          text: 'Minden szolmizációs hangnak van egy **kézjele**. A tanár a kezével „mutatja” a dallamot, a gyerekek pedig éneklik. A kéz magassága is számít: a magasabb hangot magasabban mutatjuk.\n\n- **dó**: ökölbe zárt kéz, mint egy szilárd alap\n- **ré**: ferdén felfelé mutató, nyitott tenyér\n- **mi**: vízszintes, lefelé néző tenyér\n- **fá**: lefelé mutató hüvelykujj\n- **szó**: oldalra fordított, nyitott tenyér (mintha kezet fognál)\n- **lá**: lazán lefelé lógó kézfej\n- **ti**: felfelé mutató mutatóujj\n\nA kézjeleket az angol John Curwen dolgozta ki a 19. században, Kodály Zoltán és munkatársai vették át és tették a magyar zeneoktatás részévé.'
        },
        {
          title: 'Ritmusnevek',
          text: 'A ritmusnak is vannak „beszélő” nevei. Ha kimondod őket, könnyebb pontosan tapsolni.\n\n- **tá**: negyed hang\n- **ti-ti**: két nyolcad\n- **tá-á**: fél hang\n- **tá-á-á-á**: egész hang\n- **szün**: negyed szünet\n- **tiri-tiri**: négy tizenhatod\n\nPélda: az „Ec, pec, kimehetsz” ritmusa: tá tá ti-ti tá.'
        },
        {
          title: 'Pentatónia: az ötfokú hangsor',
          text: 'A régi magyar népdalok jelentős része **pentaton**, vagyis csak **öt** különböző hangot használ. Kimarad belőle a fá és a ti, így nincs benne félhanglépés. A leggyakoribb a **lá-pentaton**: lá, dó, ré, mi, szó. Ilyen például a „Fölszállott a páva” dallama. Sok gyermekdal pedig csak két-három hangot használ (szó, mi, lá): ezek is a pentaton hangkészletből valók.\n\nA pentatónia nemcsak a magyaroknál, hanem a velünk rokon vagy a velünk egykor kapcsolatban álló népeknél (például a Volga vidékén élő mariknál és csuvasoknál), sőt Kínában és a skót népzenében is megtalálható. Bartók Béla és Kodály Zoltán gyűjtései mutatták meg, hogy ez a **legrégebbi magyar népzenei réteg**.',
          tip: 'A zongorán a fekete billentyűk éppen egy pentaton hangsort adnak! Ha csak feketéken játszol, nem tudsz „hamisan” szólni.'
        },
        {
          title: 'A Kodály-módszer',
          text: '**Kodály Zoltán** (1882–1967) zeneszerző és zenepedagógus azt vallotta: „Legyen a zene mindenkié!” Szerinte a zenei nevelést nagyon korán kell kezdeni, az alapja pedig az **éneklés** és az anyanyelvi **népdal**. A gyerekek előbb énekelnek, mozognak, játszanak, és csak utána tanulják a kottát.\n\nA Kodály-módszer fő eszközei: a **relatív szolmizáció**, a **kézjelek**, a **ritmusnevek**, a népdalok és a kóruséneklés. Magyarországon az 1950-es évektől működtek **ének-zenei általános iskolák** napi énekórával.\n\nA módszert ma az egész világon tanítják, Japántól az Egyesült Államokig. 2016-ban az **UNESCO** a szellemi kulturális örökség megőrzésének jó gyakorlatai közé vette fel.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a relatív szolmizáció?', options: ['A dó mindig a C hang', 'Bármelyik hang lehet dó, a nevek a hangok egymáshoz való viszonyát mutatják', 'Csak kézjelekkel énekelünk', 'A hangokat számokkal jelöljük'], answer: 1, explain: 'Relatív szolmizációnál a dó „vándorol”. Ettől lesz könnyű bármilyen magasságban énekelni.' },
        { q: 'Mely hangok maradnak ki a pentaton hangsorból?', options: ['dó és ré', 'szó és lá', 'mi és lá', 'fá és ti'], answer: 3, explain: 'A pentatónia öt hangja: dó, ré, mi, szó, lá. A fá és a ti hiányzik, így nincs benne félhanglépés.' },
        { q: 'Melyik két szolmizációs hang között van félhang?', options: ['mi–fá', 'dó–ré', 'szó–lá', 'ré–mi'], answer: 0, explain: 'A dúr hangsorban a mi–fá és a ti–dó’ között van félhang.' },
        { q: 'Mi a negyed hang ritmusneve?', options: ['ti-ti', 'tá', 'szün', 'tá-á'], answer: 1, explain: 'A negyed: tá, két nyolcad: ti-ti, a fél: tá-á, a negyed szünet: szün.' }
      ]
    },
    {
      id: 'hangkozok-skalak',
      title: 'Hangközök, skálák, hangzatok',
      level: 2, minutes: 15,
      summary: 'Prímtől oktávig: a hangközök nevei és mérete, a dúr és a moll skála felépítése egész- és félhangokból, a hármashangzat.',
      tags: ['hangköz', 'prím', 'szekund', 'terc', 'kvart', 'kvint', 'szext', 'szeptim', 'oktáv', 'félhang', 'egészhang', 'dúr', 'moll', 'skála', 'hangsor', 'hangnem', 'hármashangzat', 'akkord', 'C-dúr', 'a-moll', 'párhuzamos hangnem'],
      sections: [
        {
          title: 'Félhang és egészhang',
          text: 'A zongorán a legkisebb lépés két szomszédos billentyű között van (fehérről feketére, vagy ahol nincs közte fekete: fehérről fehérre). Ez a **félhang**. Két félhang együtt egy **egészhang**.\n\n- C → Cisz: félhang\n- C → D: egészhang (közte van a Cisz)\n- E → F és H → C: **félhang**, mert itt nincs fekete billentyű közöttük\n\nEgy oktávban **12 félhang** van. Ezt a felosztást **kiegyenlített hangolásnak** hívják, és a 18–19. században vált általánossá.'
        },
        {
          title: 'A hangközök',
          text: 'Két hang távolsága a **hangköz**. A nevét latin sorszámnevekből kapja, és **mindkét hangot beleszámoljuk**: C-től E-ig C, D, E, vagyis 3 hang, tehát **terc**.\n\n- **prím** (1): ugyanaz a hang\n- **szekund** (2): C–D\n- **terc** (3): C–E\n- **kvart** (4): C–F\n- **kvint** (5): C–G\n- **szext** (6): C–A\n- **szeptim** (7): C–H\n- **oktáv** (8): C–C’\n\nA szekund, terc, szext és szeptim lehet **kis** vagy **nagy**: a kis terc 3, a nagy terc 4 félhang. A prím, kvart, kvint és oktáv **tiszta** hangköz: a tiszta kvart 5, a tiszta kvint 7, a tiszta oktáv 12 félhang.',
          tip: 'Dallamokkal könnyebb megjegyezni! A tiszta kvart Wagner **Nászindulójának** első két hangja, a nagy szext a „My Bonnie” eleje, az oktáv pedig a „Somewhere over the rainbow” első két hangja.'
        },
        {
          title: 'A dúr és a moll skála',
          text: 'A **skála** (hangsor) a hangnem hangjai sorba rendezve. A két legfontosabb a **dúr** és a **moll**.\n\nA **dúr skála** lépései: **egész – egész – fél – egész – egész – egész – fél**. A **C-dúr** skála pont a fehér billentyűkből áll: C D E F G A H C. Szolmizálva: dó ré mi fá szó lá ti dó. A dúr általában **vidám, fényes** hangulatú.\n\nA (természetes) **moll skála** lépései: **egész – fél – egész – egész – fél – egész – egész**. Az **a-moll** is csak fehér billentyűkből áll: A H C D E F G A. Szolmizálva lá-tól lá-ig énekeljük. A moll gyakran **szomorkásabb, borongósabb**.\n\nA C-dúr és az a-moll ugyanazokból a hangokból áll, csak máshonnan indul: ezek **párhuzamos hangnemek**.',
          widget: { type: 'zongora', options: { title: 'Dúr, moll, hármashangzat', help: 'Nyomd meg a „C-dúr skála”, majd az „a-moll skála” gombot, és hasonlítsd össze a hangulatukat! A kiemelt billentyűk a C-dúr hármashangzat hangjai (C, E, G). Lent a hangköz-felismerő játékban tesztelheted a füledet.', highlight: [60, 64, 67] } }
        },
        {
          title: 'A hármashangzat',
          text: 'Ha egyszerre több hangot szólaltatunk meg, **hangzat** (akkord) szól. A legalapvetőbb a **hármashangzat**: három hang, amelyek **tercekre** épülnek egymásra.\n\n- **Dúr hármashangzat**: alul **nagy terc**, felül **kis terc**. Például C–E–G (dó–mi–szó).\n- **Moll hármashangzat**: alul **kis terc**, felül **nagy terc**. Például A–C–E (lá–dó–mi).\n\nA két szélső hang mindkét esetben **tiszta kvint** távolságra van. A legtöbb popdal és népdalkíséret néhány hármashangzatra épül: ha megtanulsz gitáron 3–4 akkordot, már sok dalt el tudsz kísérni.'
        },
        {
          title: 'Párosító játék',
          text: 'Hány félhangból áll a hangköz?',
          widget: { type: 'parositas', options: { title: 'Hangközök mérete', count: 6, pairs: [
            ['kis szekund', '1 félhang'],
            ['nagy szekund', '2 félhang'],
            ['kis terc', '3 félhang'],
            ['nagy terc', '4 félhang'],
            ['tiszta kvart', '5 félhang'],
            ['tiszta kvint', '7 félhang'],
            ['nagy szext', '9 félhang'],
            ['tiszta oktáv', '12 félhang']
          ] } }
        }
      ],
      quiz: [
        { q: 'Milyen hangköz a C–G?', options: ['terc', 'kvart', 'tiszta kvint', 'szext'], answer: 2, explain: 'C, D, E, F, G: öt hang, tehát kvint. 7 félhangból áll, ez a tiszta kvint.' },
        { q: 'Melyik a dúr skála lépéssora?', options: ['egész–egész–fél–egész–egész–egész–fél', 'egész–fél–egész–egész–fél–egész–egész', 'fél–fél–egész–fél–fél–egész–egész', 'mindegyik lépés egészhang'], answer: 0, explain: 'A dúrban a 3–4. és a 7–8. fok között van félhang (mi–fá, ti–dó).' },
        { q: 'Milyen hármashangzat a C–E–G?', options: ['moll', 'dúr', 'szűkített', 'bővített'], answer: 1, explain: 'Alul nagy terc (C–E), felül kis terc (E–G): ez dúr hármashangzat.' },
        { q: 'Melyik a C-dúr párhuzamos mollja?', options: ['c-moll', 'e-moll', 'd-moll', 'a-moll'], answer: 3, explain: 'Az a-moll ugyanazokból a hangokból áll (a fehér billentyűkből), csak az A-tól indul.' }
      ]
    },
    {
      id: 'hangszerek',
      title: 'Hangszerek és együttesek',
      level: 1, minutes: 12,
      summary: 'Hogyan szól a húr, a légoszlop és a dobbőr? Hangszercsoportok, a szimfonikus zenekar, a kórus szólamai és a magyar népi hangszerek.',
      tags: ['hangszer', 'húros', 'vonós', 'pengetős', 'fúvós', 'fafúvós', 'rézfúvós', 'ütős', 'billentyűs', 'elektronikus', 'húr', 'légoszlop', 'membrán', 'szimfonikus zenekar', 'karmester', 'vonósnégyes', 'kórus', 'szoprán', 'alt', 'tenor', 'basszus', 'citera', 'cimbalom', 'duda', 'tárogató'],
      sections: [
        {
          title: 'Mi rezeg a hangszerben?',
          text: 'Minden hangszerben valaminek **rezegnie** kell. Aszerint, hogy mi rezeg, a hangszereket csoportokba soroljuk:\n\n- **Húr**: a megfeszített húrt vonóval, pengetéssel vagy kalapáccsal rezegtetjük meg. Minél **rövidebb, vékonyabb és feszesebb** a húr, annál **magasabb** a hang. Ezért szól magasabban a hegedű, mint a nagybőgő, és ezért kell a gitáron a húrt lefogni.\n- **Légoszlop**: a fúvós hangszerek csövében a levegő rezeg. **Rövidebb cső = magasabb hang.** A fuvolán a lyukak befogásával, a trombitán szelepekkel, a harsonán a tolócső kihúzásával változtatjuk a cső hosszát.\n- **Membrán** (hártya): a dob kifeszített bőre vagy műanyag hártyája rezeg ütéskor.\n- **Maga a test**: a xilofon lapjai, a cintányér, a triangulum vagy a harang teljes egészében rezeg.\n\nA hangszer **teste** (például a hegedű vagy a gitár fa doboza) felerősíti a rezgést: ez a **rezonátor**. Nélküle a húr alig hallatszana.'
        },
        {
          title: 'Hangszercsoportok',
          text: '- **Vonós hangszerek**: hegedű, brácsa (mélyhegedű), cselló (gordonka), nagybőgő.\n- **Pengetős hangszerek**: gitár, hárfa, lant, citera, mandolin.\n- **Fafúvós hangszerek**: fuvola, furulya, oboa, klarinét, fagott, szaxofon. (A fuvola és a szaxofon ma fémből készül, de a hangképzés módja miatt mégis fafúvós!)\n- **Rézfúvós hangszerek**: trombita, kürt, harsona, tuba. Itt az ajak rezgése indítja el a légoszlopot.\n- **Ütős hangszerek**: nagydob, kisdob, üstdob, cintányér, xilofon, triangulum.\n- **Billentyűs hangszerek**: zongora (kalapácsok ütik meg a húrokat), orgona (sípokban rezeg a levegő), csembaló (pengetett húrok).\n- **Elektronikus hangszerek**: szintetizátor, elektromos gitár erősítővel. A hangot elektromos jel hozza létre vagy erősíti fel.',
          tip: 'A **zongora** egyszerre billentyűs, húros és ütős hangszer: a billentyű lenyomásakor egy filcborítású kalapács üti meg a húrt.'
        },
        {
          title: 'Zenekar és kórus',
          text: 'A **szimfonikus zenekar** 60–100 zenészből áll, négy nagy csoportban: elöl a **vonósok**, mögöttük a **fafúvósok**, majd a **rézfúvósok**, leghátul az **ütősök**. A zenekart a **karmester** vezeti: a pálcájával mutatja a tempót, a belépéseket és a hangerőt.\n\nKisebb együttesek is vannak: a **vonósnégyes** két hegedűből, egy brácsából és egy csellóból áll. A **kamarazene** néhány hangszeres közös játéka. A **big band** jazzt játszik szaxofonokkal, trombitákkal, harsonákkal és ritmusszekcióval.\n\nA **kórus** énekesekből áll. A vegyeskar négy szólama magasságtól mélyig:\n\n- **szoprán**: magas női hang\n- **alt**: mély női hang\n- **tenor**: magas férfihang\n- **basszus**: mély férfihang\n\nA gyerekkarok általában szoprán és alt szólamokban énekelnek. Magyarországon nagy hagyománya van a kórusmozgalomnak, ebben is Kodály Zoltánnak volt nagy szerepe.'
        },
        {
          title: 'Magyar népi hangszerek',
          text: 'A magyar népzene leggyakoribb hangszere maga az **emberi hang**: a népdalokat sokáig kíséret nélkül énekelték. Emellett:\n\n- **citera**: asztalra fektetett, pengetett húros hangszer\n- **cimbalom**: trapéz alakú, húros hangszer, amelyet két kis ütővel szólaltatnak meg\n- **duda**: bőrtömlős fúvós hangszer, a tömlőben tárolt levegő folyamatosan szól\n- **furulya**: a pásztorok egyszerű fafúvós hangszere\n- **tárogató**: kúpos furatú fafúvós, a kuruc kor hangszereként ismert\n- **tekerőlant** (nyenyere): forgatható kerék dörzsöli a húrokat\n\nA falusi **vonósbanda** (prímás, kontrás, bőgős) a táncházak kedvelt együttese ma is.'
        },
        {
          title: 'Párosító játék',
          text: 'Melyik hangszer melyik csoportba tartozik, és mi rezeg benne?',
          widget: { type: 'parositas', options: { title: 'Hangszerek', count: 6, pairs: [
            ['Cselló', 'Vonós hangszer'],
            ['Klarinét', 'Fafúvós hangszer'],
            ['Kürt', 'Rézfúvós hangszer'],
            ['Üstdob', 'Ütős hangszer: kifeszített hártya rezeg'],
            ['Orgona', 'Billentyűs hangszer, sípokban rezeg a levegő'],
            ['Hárfa', 'Pengetős húros hangszer'],
            ['Cimbalom', 'Ütővel megszólaltatott húros népi hangszer'],
            ['Duda', 'Bőrtömlős népi fúvós hangszer']
          ] } }
        }
      ],
      quiz: [
        { q: 'Hogyan lesz magasabb a húr hangja?', options: ['Ha hosszabb és lazább', 'Ha rövidebb és feszesebb', 'Ha vastagabb', 'Ha erősebben pengetjük'], answer: 1, explain: 'A rövidebb, vékonyabb, feszesebb húr gyorsabban rezeg, ezért magasabb a hangja. Az erősebb pengetés csak hangosabb lesz.' },
        { q: 'Melyik hangszer NEM vonós?', options: ['brácsa', 'cselló', 'nagybőgő', 'harsona'], answer: 3, explain: 'A harsona rézfúvós hangszer, a hangmagasságot a tolócsővel változtatják.' },
        { q: 'Milyen hangszerekből áll a vonósnégyes?', options: ['2 hegedű, brácsa, cselló', '4 hegedű', 'hegedű, gitár, cselló, nagybőgő', 'zongora és 3 hegedű'], answer: 0, explain: 'A klasszikus vonósnégyes két hegedű, egy brácsa és egy cselló. Haydn tette népszerűvé.' },
        { q: 'Melyik a mély női hang a kórusban?', options: ['szoprán', 'tenor', 'alt', 'basszus'], answer: 2, explain: 'Női szólamok: szoprán (magas), alt (mély). Férfi szólamok: tenor (magas), basszus (mély).' }
      ]
    },
    {
      id: 'zenetortenet',
      title: 'Zenetörténet Bachtól Bartókig',
      level: 2, minutes: 18,
      summary: 'Barokk, klasszika, romantika és a 20. század: Bach, Haydn, Mozart, Beethoven, Liszt, Erkel, Bartók és Kodály, röviden a könnyűzenéről is.',
      tags: ['zenetörténet', 'barokk', 'Bach', 'Händel', 'Vivaldi', 'klasszika', 'bécsi klasszikusok', 'Haydn', 'Mozart', 'Beethoven', 'romantika', 'Liszt Ferenc', 'Chopin', 'Erkel Ferenc', 'Himnusz', 'Bánk bán', 'Bartók Béla', 'Kodály Zoltán', 'népdalgyűjtés', 'fonográf', 'jazz', 'rock', 'könnyűzene'],
      sections: [
        {
          title: 'A barokk (kb. 1600–1750)',
          text: 'A barokk zene díszes, mozgalmas és pompás, mint a kor templomai és palotái. Ekkor született meg az **opera** és a **versenymű** (concerto), amelyben egy szólóhangszer „versenyez” a zenekarral. A kíséret alapja a folyamatosan szóló basszus és a **csembaló**.\n\n- **Johann Sebastian Bach** (1685–1750) német zeneszerző és orgonista, a barokk legnagyobb mestere. Templomi kantátákat, passiókat, orgonaműveket, **fúgákat** írt. A fúgában ugyanaz a téma szólamról szólamra újra belép, és a szólamok bonyolultan, mégis tökéletes rendben fonódnak össze.\n- **Georg Friedrich Händel** (1685–1759): a **Messiás** című oratórium „Halleluja” kórusát ma is az egész világon éneklik.\n- **Antonio Vivaldi** (1678–1741) velencei zeneszerző: **A négy évszak** című hegedűversenyeiben hallani lehet a madárcsicsergést, a nyári vihart és a téli dideregést.'
        },
        {
          title: 'A bécsi klasszika (kb. 1750–1820)',
          text: 'A klasszikus zene **világos, arányos, könnyen követhető**: a dallam a főszereplő, a kíséret alárendelődik neki. Ekkor alakult ki a **szimfónia** (több tételes zenekari mű), a **szonáta** és a **vonósnégyes**. A három nagy mester mind Bécsben alkotott, ezért **bécsi klasszikusoknak** hívjuk őket.\n\n- **Joseph Haydn** (1732–1809) közel harminc évig az **Esterházy hercegek** udvari karmestere volt, sokáig a fertődi (eszterházi) kastélyban. 104 szimfóniát írt, ezért a „szimfónia atyjának” is nevezik.\n- **Wolfgang Amadeus Mozart** (1756–1791) csodagyerek volt: ötévesen komponált, hatévesen már Európa uralkodói előtt zongorázott. Rövid élete alatt több mint 600 művet írt, például **A varázsfuvola** és a **Figaro házassága** című operát és a **Kis éji zenét**.\n- **Ludwig van Beethoven** (1770–1827) a klasszikából a romantikába vezető híd. Fiatalon elkezdett megsüketülni, mégis tovább komponált: a **IX. szimfóniát** (1824), amelynek „Örömódája” ma az **Európai Unió himnusza**, már teljesen süketen írta.'
        },
        {
          title: 'A romantika (19. század)',
          text: 'A romantikus zeneszerzők az **érzelmeket, a természetet, a szabadságot** és a nemzeti múltat akarták hangokban kifejezni. A zenekar nagyobb lett, a darabok szenvedélyesebbek. Megjelentek a **virtuózok**, akik bámulatos ügyességgel játszottak.\n\n- **Liszt Ferenc** (1811–1886) Doborjánban született, a kor leghíresebb zongoraművésze volt: koncertjein az emberek szinte rajongtak érte. Ő vezette be, hogy a zongorista **oldalt ül** a közönségnek, és hogy egy egész estét egyedül ad. Művei közül híresek a **Magyar rapszódiák**. Az ő kezdeményezésére jött létre Budapesten 1875-ben a **Zeneakadémia**, amely ma is a nevét viseli.\n- **Erkel Ferenc** (1810–1893) zenésítette meg 1844-ben Kölcsey Ferenc **Himnuszát**. Ő a magyar nemzeti opera megteremtője: **Hunyadi László** és **Bánk bán** című operáit ma is játsszák. Az Operaház előtt szobra áll.\n- További romantikusok: Frédéric **Chopin** (lengyel zongoraköltő), Pjotr **Csajkovszkij** (A diótörő, A hattyúk tava), Giuseppe **Verdi** és Richard **Wagner** operái.'
        },
        {
          title: 'A 20. század: Bartók és Kodály',
          text: 'A 20. század elején **Bartók Béla** (1881–1945) és **Kodály Zoltán** (1882–1967) felfedezte, hogy a falvakban még él egy **ősi, sokszor pentaton magyar népzene**, amely egészen más, mint a városokban akkor „magyar nótaként” ismert dalok. 1906-ban közösen adták ki az első gyűjteményüket.\n\nÉvekig járták a falvakat. A dalokat lekottázták, és **fonográffal** (viaszhengerre rögzítő hangfelvevővel) fel is vették. Bartók a szomszéd népek (szlovák, román, sőt arab és török) népzenéjét is gyűjtötte. Együtt több tízezer dallamot mentettek meg az utókornak.\n\nA népdalok saját zeneszerzői munkájukra is hatottak:\n\n- **Bartók**: A kékszakállú herceg vára (opera), Allegro barbaro, Concerto (zenekarra), a gyerekeknek írt **Mikrokozmosz** és **Gyermekeknek** zongorasorozat.\n- **Kodály**: Psalmus Hungaricus, **Háry János** (daljáték), Galántai táncok, Fölszállott a páva (variációk), és rengeteg kórusmű, például az „Esti dal”.'
        },
        {
          title: 'Könnyűzene röviden',
          text: 'A 20. században a hangfelvétel, a rádió és később a televízió révén a **könnyűzene** is mindenkihez eljutott.\n\n- A **jazz** a 20. század elején született az amerikai **New Orleansban**, afroamerikai zenészek között. Jellemzője a rögtönzés (**improvizáció**) és a ringató, „swingelő” ritmus.\n- Az 1950-es években jött a **rock and roll** (Elvis Presley), az 1960-as években a **Beatles** és a Rolling Stones.\n- Magyarországon az 1960–70-es években az **Illés**, az **Omega** és a **Locomotiv GT** lett népszerű, az 1970-es évektől pedig a **táncházmozgalom** a fiatalokat is visszavezette a népzenéhez.\n\nMa elektronikus zenét, hiphopot, popot és sok más műfajt hallgatunk. A zene alapjai (ritmus, dallam, harmónia) azonban ugyanazok, mint Bach korában.'
        },
        {
          title: 'Zenetörténeti idővonal',
          text: 'Kattints az évszámokra, aztán tedd időrendbe az eseményeket!',
          widget: { type: 'idovonal', options: { title: 'A zene története', events: [
            { year: 1685, title: 'Megszületik Bach és Händel', text: '**Johann Sebastian Bach** és Georg Friedrich Händel ugyanabban az évben, egymástól nem messze születik Németországban.' },
            { year: 1725, title: 'Vivaldi: A négy évszak', text: 'Megjelenik nyomtatásban Vivaldi négy hegedűversenye.' },
            { year: 1750, title: 'Bach halála', text: 'Bach halálával szokás a **barokk** korszak végét jelölni.' },
            { year: 1756, title: 'Megszületik Mozart', text: 'Salzburgban születik a csodagyerek, Wolfgang Amadeus Mozart.' },
            { year: 1761, title: 'Haydn az Esterházyaknál', text: 'Haydn az Esterházy hercegek szolgálatába lép, ahol közel 30 évig dolgozik.' },
            { year: 1791, title: 'A varázsfuvola', text: 'Bemutatják Mozart operáját. Mozart ugyanebben az évben, 35 évesen meghal.' },
            { year: 1824, title: 'Beethoven IX. szimfóniája', text: 'Az „Örömóda” zárókórusú szimfónia bemutatója. A süket Beethoven nem hallja a tapsot.' },
            { year: 1844, title: 'Erkel megzenésíti a Himnuszt', text: 'Erkel Ferenc pályázaton nyer Kölcsey versének megzenésítésével.' },
            { year: 1861, title: 'Bánk bán', text: 'Bemutatják Erkel Ferenc nemzeti operáját.' },
            { year: 1875, title: 'Megnyílik a Zeneakadémia', text: 'Liszt Ferenc kezdeményezésére Budapesten zenei főiskola nyílik.' },
            { year: 1877, title: 'A fonográf feltalálása', text: 'Edison hangrögzítő gépe később a népdalgyűjtők legfontosabb eszköze lesz.' },
            { year: 1906, title: 'Bartók és Kodály első népdalkiadása', text: 'Megjelenik közös gyűjteményük. Kezdetét veszi a tudományos népdalgyűjtés.' },
            { year: 1926, title: 'Háry János', text: 'Bemutatják Kodály daljátékát a nagyotmondó huszárról.' },
            { year: 1943, title: 'Bartók: Concerto', text: 'Az Amerikába emigrált Bartók megírja egyik legismertebb zenekari művét.' },
            { year: 1962, title: 'A Beatles első lemeze', text: 'Megjelenik a Beatles első kislemeze, kezdődik a „beatkorszak”.' },
            { year: 2016, title: 'A Kodály-módszer az UNESCO listáján', text: 'A Kodály-koncepció a szellemi kulturális örökség megőrzésének jó gyakorlatai közé kerül.' }
          ] } }
        },
        {
          title: 'Párosító játék: ki mit írt?',
          text: 'Párosítsd a zeneművet a szerzőjével!',
          widget: { type: 'parositas', options: { title: 'Művek és szerzők', count: 6, pairs: [
            ['A négy évszak', 'Antonio Vivaldi'],
            ['Messiás', 'Georg Friedrich Händel'],
            ['A varázsfuvola', 'Wolfgang Amadeus Mozart'],
            ['IX. szimfónia („Örömóda”)', 'Ludwig van Beethoven'],
            ['Magyar rapszódiák', 'Liszt Ferenc'],
            ['Bánk bán', 'Erkel Ferenc'],
            ['Mikrokozmosz', 'Bartók Béla'],
            ['Háry János', 'Kodály Zoltán']
          ] } }
        }
      ],
      quiz: [
        { q: 'Ki zenésítette meg a magyar Himnuszt?', options: ['Liszt Ferenc', 'Kodály Zoltán', 'Erkel Ferenc', 'Bartók Béla'], answer: 2, explain: 'Erkel Ferenc 1844-ben pályázaton nyert Kölcsey Ferenc versének megzenésítésével.' },
        { q: 'Melyik zeneszerző a bécsi klasszika képviselője?', options: ['Bach', 'Mozart', 'Liszt', 'Bartók'], answer: 1, explain: 'A bécsi klasszikusok: Haydn, Mozart és Beethoven. Bach barokk, Liszt romantikus, Bartók 20. századi.' },
        { q: 'Mivel rögzítették Bartók és Kodály a népdalokat?', options: ['Magnókazettával', 'Okostelefonnal', 'Hanglemezvágóval a stúdióban', 'Fonográffal, viaszhengerre'], answer: 3, explain: 'A fonográf viaszhengerre rögzítette a hangot, így a falvakban is lehetett felvételt készíteni.' },
        { q: 'Melyik Beethoven-mű dallama az Európai Unió himnusza?', options: ['A IX. szimfónia „Örömódája”', 'Az Egmont-nyitány', 'A Holdfény-szonáta', 'Az V. szimfónia'], answer: 0, explain: 'A IX. szimfónia zárótételében Schiller „Örömódája” szól, ennek dallama az EU himnusza.' }
      ]
    }
  ]
});
