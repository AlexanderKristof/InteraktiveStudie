/* Tantárgy: Magyar nyelv és irodalom (5–8. osztály) */
STUDIE.addSubject({
  id: 'magyar',
  stage: 'altalanos',
  title: 'Magyar nyelv és irodalom',
  icon: '📚',
  color: '#c2417a',
  description: 'Hangtan, szófajok, mondattan, helyesírás, irodalmi műnemek és költői képek, valamint Petőfi és Arany.',
  intro: 'Anyanyelvünket nap mint nap használjuk, mégis sok meglepetést tartogat. Ebben a tárgyban megismered a **nyelvtan** alapjait (hangok, szófajok, mondatok), a **helyesírás** legfontosabb szabályait, és belekóstolsz az **irodalomba**: a műnemekbe, a költői képekbe, valamint Petőfi Sándor és Arany János két nagy művébe, a **János vitézbe** és a **Toldiba**.',
  lessons: [
    {
      id: 'hangok',
      title: 'Hangok és betűk, hangtörvények',
      level: 1, minutes: 12,
      summary: 'Magánhangzók és mássalhangzók, a magánhangzó-harmónia (illeszkedés) és a mássalhangzók hasonulása.',
      tags: ['hang', 'betű', 'ábécé', 'magánhangzó', 'mássalhangzó', 'hangrend', 'illeszkedés', 'magánhangzó-harmónia', 'hasonulás', 'zöngés', 'zöngétlen', 'összeolvadás'],
      sections: [
        {
          title: 'Hang és betű',
          text: 'A **hang** az, amit kiejtünk és hallunk, a **betű** a hang írásjele. A kettő nem mindig ugyanannyi: a **sz** két betűjelből áll, mégis egy hangot jelöl, és a **dzs** is egyetlen hang.\n\nA magyar **ábécé 44 betűből** áll. Vannak **egyjegyű** (a, b, c…), **kétjegyű** (cs, dz, gy, ly, ny, sz, ty, zs) és egy **háromjegyű** (dzs) betűink. A q, w, x, y csak idegen szavakban és régi családnevekben fordul elő (pl. Kölcsey, Dessewffy).\n\nA beszédhangok két nagy csoportja:\n\n- **Magánhangzók** (14 db): a, á, e, é, i, í, o, ó, ö, ő, u, ú, ü, ű. Kiejtésükkor a levegő akadálytalanul áramlik ki, ezek alkotják a szótagok magját.\n- **Mássalhangzók** (25 db): kiejtésükkor a levegő útjában valamilyen akadály van (ajak, fog, nyelv).\n\nA magánhangzók lehetnek **rövidek** (a, e, i, o, ö, u, ü) vagy **hosszúak** (á, é, í, ó, ő, ú, ű). A hosszúság jelentést is megkülönböztet: **kor – kór**, **tör – tőr**, **kerek – kerék**.',
          tip: 'Hány szótagú egy szó? Számold meg a magánhangzókat! A „ka-ra-csony-fa” szóban 4 magánhangzó van, tehát 4 szótagú.'
        },
        {
          title: 'Hangrend és illeszkedés (magánhangzó-harmónia)',
          text: 'A magánhangzókat aszerint is csoportosítjuk, hogy a nyelv elöl vagy hátul képzi őket:\n\n- **Magas** magánhangzók: e, é, i, í, ö, ő, ü, ű\n- **Mély** magánhangzók: a, á, o, ó, u, ú\n\nA szó **hangrendje** ezért lehet:\n\n- **magas hangrendű**: kert, tükör, erdő\n- **mély hangrendű**: ház, alma, kutya\n- **vegyes hangrendű**: papír, kávé, virág\n\nAz **illeszkedés** (magánhangzó-harmónia) törvénye szerint a toldalék magánhangzója igazodik a szótőhöz: **ház-ban**, de **kert-ben**; **ablak-hoz**, de **kert-hez**, és **tükör-höz** (az ö-s szavakhoz ö-s toldalék jár). A vegyes hangrendű szavak általában mély hangrendű toldalékot kapnak: **papír-ban**, **virág-hoz**.',
          tip: 'Az illeszkedés miatt van sok toldaléknak két vagy három alakja: -ban/-ben, -hoz/-hez/-höz, -nak/-nek.'
        },
        {
          title: 'Mássalhangzó-törvények: a hasonulás',
          text: 'A mássalhangzók egy része párt alkot: a **zöngés** változatnál rezeg a hangszalag, a **zöngétlennél** nem (tedd a kezed a torkodra, és mondd: zzz… sss…).\n\n- zöngés: b, d, g, gy, z, zs, v, dz, dzs\n- zöngétlen: p, t, k, ty, sz, s, f, c, cs\n\nHa két mássalhangzó egymás mellé kerül, gyakran **hasonulnak**: az egyik hasonlóvá vagy egyformává válik a másikkal.\n\n- **Részleges hasonulás zöngésség szerint:** „kalapból” → [kalabból], „vasgyár” → [vazsgyár], „népdal” → [nébdal]. Írásban **nem jelöljük**.\n- **Részleges hasonulás a képzés helye szerint:** „színpad” → [szímpad], „különben” → [külömben]. Írásban **nem jelöljük**.\n- **Teljes hasonulás:** a két hang teljesen egyforma lesz. A **-val/-vel** és a **-vá/-vé** toldalék v-je hasonul, és ezt **jelöljük**: kéz + vel = **kézzel**, víz + vé = **vízzé**. Szavakon belül viszont a **szóelemzés** miatt nem jelöljük: „egészség” → [egésség].\n- **Összeolvadás:** két hang egy harmadik, hosszú hanggá olvad: „látja” → [láttya], „adjon” → [aggyon], „botja” → [bottya]. Írásban **nem jelöljük**.',
          warn: 'A kiejtés és az írás itt eltér! A szóelemzés elve miatt úgy írjuk: **látja**, mert a tő „lát”, a toldalék „-ja”.'
        }
      ],
      quiz: [
        { q: 'Hány betűből áll a magyar ábécé?', options: ['26', '44', '40', '39'], answer: 1, explain: 'A magyar ábécé 44 betűt tartalmaz, a kétjegyű és a háromjegyű (dzs) betűkkel együtt.' },
        { q: 'Melyik szó vegyes hangrendű?', options: ['kerítés', 'bárány', 'papír', 'tükör'], answer: 2, explain: 'A papír szóban mély (a) és magas (í) magánhangzó is van. A kerítés és a tükör magas, a bárány mély hangrendű.' },
        { q: 'Melyik szóban történik összeolvadás kiejtéskor?', options: ['kalapból', 'kézzel', 'színpad', 'látja'], answer: 3, explain: 'A t + j összeolvad: [láttya]. A kalapból zöngésség szerinti, a színpad képzés helye szerinti hasonulás, a kézzel jelölt teljes hasonulás.' },
        { q: 'Melyik toldalékos alak helyes?', options: ['kertban', 'tükörhez', 'ablakhoz', 'virágben'], answer: 2, explain: 'Az ablak mély hangrendű, ezért -hoz. Helyesen: kertben, tükörhöz, virágban.' }
      ]
    },
    {
      id: 'szofajok',
      title: 'Szófajok',
      level: 1, minutes: 14,
      summary: 'Alapszófajok (ige, főnév, melléknév, számnév, névmás, határozószó, igenevek), viszonyszók és mondatszók.',
      tags: ['szófaj', 'ige', 'főnév', 'melléknév', 'számnév', 'névmás', 'határozószó', 'igenév', 'névelő', 'névutó', 'kötőszó', 'igekötő', 'indulatszó', 'tulajdonnév', 'köznév'],
      sections: [
        {
          title: 'Az ige és a névszók',
          text: 'Az **ige** cselekvést, történést, létezést vagy állapotot fejez ki. Kérdése: **mit csinál? mi történik vele?** Pl. fut, olvas, esik, van, alszik.\n\nAz igét ragozzuk:\n\n- **idő** szerint: múlt (olvastam), jelen (olvasok), jövő (olvasni fogok),\n- **mód** szerint: kijelentő (olvasok), feltételes (olvasnék), felszólító (olvass!),\n- **személy és szám** szerint: én olvasok, te olvasol, ő olvas, mi olvasunk…\n\nA **névszók**:\n\n- **Főnév**: élőlények, tárgyak, fogalmak neve. Kérdése: **ki? mi?** A **köznév** egy egész csoport neve (folyó, lány), a **tulajdonnév** egyetlen dologé (Tisza, Anna) – ezt nagy kezdőbetűvel írjuk.\n- **Melléknév**: tulajdonságot jelöl. Kérdése: **milyen? melyik?** (piros, okos, budapesti). Fokozható: **alapfok** (nagy), **középfok** (nagyobb), **felsőfok** (legnagyobb), **túlzófok** (legeslegnagyobb).\n- **Számnév**: mennyiséget vagy sorrendet jelöl. Kérdése: **hány? hányadik? mennyi?** Lehet határozott (öt, ötödik, ötöd) vagy határozatlan (sok, kevés, néhány).',
          tip: 'Egy szó szófaját a mondatbeli szerepe is befolyásolhatja: „A **szép** kép” – melléknév, de „A **szép** mindig vonz” – itt főnévként viselkedik.'
        },
        {
          title: 'Névmás, határozószó, igenevek',
          text: 'A **névmás** más szófajú szavak helyett áll, rájuk utal. Fajtái:\n\n- **személyes**: én, te, ő, mi, ti, ők\n- **mutató**: ez, az, ilyen, olyan, ennyi\n- **kérdő**: ki? mi? milyen? hány?\n- **vonatkozó**: aki, ami, amely, amelyik\n- **határozatlan**: valaki, valami, néhány\n- **általános**: mindenki, senki, semmi, bárki\n- **visszaható**: magam, magad, maga; **kölcsönös**: egymás\n\nA **határozószó** a cselekvés körülményeit fejezi ki: **hol? mikor? hogyan?** (itt, ott, holnap, tegnap, gyorsan, otthon).\n\nAz **igenevek** az ige és a névszó között állnak:\n\n- **főnévi igenév** (-ni): olvasni, futni\n- **melléknévi igenév**: olvasó (folyamatos), olvasott (befejezett), olvasandó (beálló)\n- **határozói igenév** (-va, -ve, -ván, -vén): olvasva, ülve'
        },
        {
          title: 'Viszonyszók és mondatszók',
          text: 'A **viszonyszók** önálló jelentés nélküli „segédszavak”, a mondat többi szava közötti viszonyt fejezik ki:\n\n- **névelő**: a, az (határozott), egy (határozatlan)\n- **névutó**: a főnév után áll, külön írjuk: az asztal **alatt**, a ház **mögött**, a tél **óta**\n- **kötőszó**: szavakat, mondatokat köt össze: és, de, vagy, mert, hogy, ha, tehát\n- **igekötő**: az ige jelentését módosítja: **meg**ír, **el**megy, **ki**nyit, **fel**áll\n- **segédige**: fog, volna, van (pl. olvasni **fog**)\n- **módosítószó**: a beszélő véleményét fejezi ki: talán, bizonyára, persze\n\nA **mondatszók** önmagukban is egész mondatot alkotnak. Ide tartoznak az **indulatszók** (jaj, hű, ejha, brr), a hangutánzó felkiáltások (kukurikú) és az olyan szavak, mint az **igen**, a **nem** vagy a **szia** önálló mondatként.\n\n**Elemzés:** „**A** (névelő) **kis** (melléknév) **macska** (főnév) **gyorsan** (határozószó) **felmászott** (ige, igekötővel) **a** (névelő) **fára** (főnév).”',
          tip: 'Szófajt kérdéssel a legkönnyebb felismerni: ki? mi? → főnév; milyen? → melléknév; hány? → számnév; mit csinál? → ige.'
        }
      ],
      quiz: [
        { q: 'Milyen szófajú a „legszebb” szó?', options: ['határozószó', 'főnév', 'melléknév', 'számnév'], answer: 2, explain: 'A szép melléknév felsőfokú alakja (leg- + -bb).' },
        { q: 'Melyik szó névutó?', options: ['mögött', 'gyorsan', 'mert', 'meg'], answer: 0, explain: 'A mögött a főnév után álló, külön írt viszonyszó (a ház mögött). A gyorsan határozószó, a mert kötőszó, a meg igekötő.' },
        { q: 'Melyik főnévi igenév?', options: ['olvasó', 'olvasva', 'olvasni', 'olvasott'], answer: 2, explain: 'A főnévi igenév képzője a -ni. Az olvasó és olvasott melléknévi, az olvasva határozói igenév.' },
        { q: 'Milyen névmás a „mindenki”?', options: ['általános névmás', 'személyes névmás', 'kérdő névmás', 'vonatkozó névmás'], answer: 0, explain: 'A mindenki, senki, bárki az általános névmások közé tartozik.' }
      ]
    },
    {
      id: 'mondat',
      title: 'Mondatrészek és mondatfajták',
      level: 2, minutes: 14,
      summary: 'Alany, állítmány, tárgy, határozók és jelzők; a mondatok fajtái a beszélő szándéka és a szerkezet szerint.',
      tags: ['mondatrész', 'alany', 'állítmány', 'tárgy', 'határozó', 'jelző', 'birtokos jelző', 'mondatfajta', 'kijelentő', 'kérdő', 'felszólító', 'óhajtó', 'felkiáltó', 'egyszerű mondat', 'összetett mondat'],
      sections: [
        {
          title: 'A fő mondatrészek: alany és állítmány',
          text: 'Az **állítmány** a mondat legfontosabb része: azt mondja meg, mit csinál, milyen vagy mi az alany. Kérdése: **mit csinál? mi történik vele? milyen? mi?** Leggyakrabban ige: „Péter **fut**.” Lehet névszó is: „Péter **okos**.” „Péter **tanuló**.”\n\nAz **alany** az, akiről vagy amiről az állítmány szól. Kérdése: **ki? mi?** (rag nélkül!). „**Péter** fut.” „Esik **az eső**.”\n\nA kettő **egyeztetve** van számban és személyben: „A gyerek fut.” – „A gyerekek futnak.”\n\nNéha az alany nincs kitéve, mert a személyragból kiderül: „Holnap moziba **megyünk**.” (Mi? – rejtett alany: mi.)',
          tip: 'Mondatelemzésnél mindig az állítmánnyal kezdj! Utána kérdezz rá: ki? mi? – így megtalálod az alanyt.'
        },
        {
          title: 'Tárgy, határozók, jelzők',
          text: 'A **tárgy** a cselekvés tárgyát jelöli. Kérdése: **kit? mit?** Ragja általában a **-t**: „Anna **levelet** ír.”\n\nA **határozó** a cselekvés körülményeit adja meg:\n\n- **helyhatározó**: hol? honnan? hová? (a kertben, az iskolába)\n- **időhatározó**: mikor? meddig? (reggel, három óráig)\n- **módhatározó**: hogyan? (gyorsan, csendben)\n- **okhatározó**: miért? mi miatt? (az eső miatt)\n- **célhatározó**: miért? mi célból? (kenyérért ment)\n- **eszközhatározó**: mivel? (ceruzával)\n\nA **jelző** egy másik mondatrészhez tartozik, és azt pontosítja:\n\n- **minőségjelző**: milyen? melyik? (**piros** alma)\n- **mennyiségjelző**: hány? mennyi? (**három** alma)\n- **birtokos jelző**: kinek a…? (**Anna** könyve, **a fiú** kutyája)\n- **értelmező jelző**: megismétli, pontosítja a jelzett szót (Kati, **a barátnőm**, …)\n\n**Teljes elemzés:** „A kis cica a puha párnán alszik.”\n\n- **alszik** – állítmány (mit csinál?)\n- **cica** – alany (ki alszik?)\n- **kis** – minőségjelző (milyen cica?)\n- **párnán** – helyhatározó (hol alszik?)\n- **puha** – minőségjelző (milyen párnán?)'
        },
        {
          title: 'Mondatfajták',
          text: 'A **beszélő szándéka** szerint ötféle mondat van:\n\n- **Kijelentő**: közöl valamit. „Ma szép idő van.” (pont)\n- **Kérdő**: választ vár. „Jössz moziba?” (kérdőjel)\n- **Felszólító**: kér, parancsol, tilt. „Csukd be az ajtót!” (felkiáltójel)\n- **Óhajtó**: kívánságot fejez ki. „Bárcsak nyár lenne!” (felkiáltójel)\n- **Felkiáltó**: erős érzelmet fejez ki. „De gyönyörű ez a táj!” (felkiáltójel)\n\nA **szerkezet** szerint:\n\n- **egyszerű mondat**: egy állítmány van benne. Ha csak alany és állítmány, akkor **tőmondat** („Esik az eső.”), ha más mondatrész is, **bővített mondat**.\n- **összetett mondat**: két vagy több tagmondatból áll. **Mellérendelő**, ha a tagmondatok egyenrangúak („Esik az eső, **de** kimegyünk.”), **alárendelő**, ha az egyik a másiknak egy mondatrészét fejti ki („Tudom, **hogy** igazad van.”).',
          warn: 'Az összetett mondat tagmondatait általában **vesszővel** választjuk el, a „hogy”, „mert”, „de”, „ami” kötőszó előtt is!'
        }
      ],
      quiz: [
        { q: 'Mi az alany a mondatban: „Reggel a szomszéd kutyája hangosan ugatott.”?', options: ['szomszéd', 'kutyája', 'reggel', 'ugatott'], answer: 1, explain: 'Ki ugatott? A kutyája. A szomszéd birtokos jelző (kinek a kutyája?), az ugatott az állítmány, a reggel időhatározó.' },
        { q: 'Milyen mondatrész a „ceruzával” a mondatban: „Ceruzával rajzolok.”?', options: ['tárgy', 'eszközhatározó', 'módhatározó', 'alany'], answer: 1, explain: 'Mivel rajzolok? Ceruzával – eszközhatározó.' },
        { q: 'Milyen mondat: „Bárcsak megnyerném a versenyt!”?', options: ['felkiáltó', 'felszólító', 'óhajtó', 'kérdő'], answer: 2, explain: 'A bárcsak szó kívánságot jelez, ez óhajtó mondat.' },
        { q: 'Melyik összetett mondat?', options: ['Esik az eső.', 'A kis cica a párnán alszik.', 'Holnap moziba megyünk a barátaimmal.', 'Tudom, hogy igazad van.'], answer: 3, explain: 'Két állítmánya van (tudom, van), két tagmondatból áll. A többi egyszerű mondat.' }
      ]
    },
    {
      id: 'helyesiras',
      title: 'Helyesírás: j vagy ly, egybe- és különírás, tulajdonnevek',
      level: 2, minutes: 15,
      summary: 'A helyesírás négy alapelve, a j és ly, az összetett szavak és a tulajdonnevek írásának alapjai (AkH 12).',
      tags: ['helyesírás', 'AkH', 'j', 'ly', 'egybeírás', 'különírás', 'összetett szó', 'kötőjel', 'szótagszám', 'tulajdonnév', 'nagybetű', 'földrajzi név', 'kiejtés elve', 'szóelemzés elve', 'hagyomány elve', 'egyszerűsítés elve'],
      sections: [
        {
          title: 'A helyesírás négy alapelve',
          text: 'A magyar helyesírás szabályait a **Magyar Tudományos Akadémia** adja ki, a mostani a **12. kiadás** (AkH 12, 2015). Négy alapelvre épül:\n\n1. **A kiejtés elve:** a legtöbb szót úgy írjuk, ahogy (gondosan) kiejtjük: asztal, ház, kenyér.\n2. **A szóelemzés elve:** a szótövet és a toldalékot megtartjuk, akkor is, ha kiejtéskor változnak: **látja** (nem „láttya”), **egészség** (nem „egésség”).\n3. **A hagyomány elve:** egyes szavakat és régi családneveket a hagyomány szerint írunk: **ly** a „hely” szóban, **Kossuth**, **Széchenyi**, **Babits**.\n4. **Az egyszerűsítés elve:** a kétjegyű betűk kettőzésekor csak az első jegyet kettőzzük: sz + sz → **ssz** (asszony), ny + ny → **nny** (könnyű), és toldalékoláskor is: busz + szal = **busszal**. Összetett szavak határán azonban nem egyszerűsítünk: **jegygyűrű**, **sakkkör**.',
          tip: 'Bizonytalan vagy? Nézd meg a szótárban vagy a helyesiras.mta.hu oldalon. A legjobb írók is gyakran ellenőrzik magukat!'
        },
        {
          title: 'j vagy ly?',
          text: 'A **j** és **ly** ma ugyanúgy hangzik, a különbség **hagyományon** alapul, ezért az ly-os szavakat jórészt **meg kell tanulni**. Néhány fogódzó:\n\n- **ly**-nal írjuk például: hely, mely, olyan, ilyen, milyen, folyik, folyó, gólya, király, sólyom, pehely, lyuk, golyó, mosoly, fogoly.\n- A **rokon szavak** megőrzik a betűt: folyik – folyó – folyosó – folyam; hely – helyes – helyesírás.\n- Az **-ály, -ely, -oly** végű szavak gyakran ly-osak: király, szabály, homály, akadály, pehely, mosoly. Vigyázz, vannak kivételek: **muszáj**, **papagáj**, **sóhaj** j-vel!\n- Az igék **-j** toldaléka (felszólító mód, tárgyas ragozás) mindig **j**: adj, várj, látja, kérje.\n- A **-val/-vel** rag hasonul az ly-hoz is: gólyával, de **Mihály + val = Mihállyal**, **fogoly + val = fogollyal** (a kétjegyű ly első jegyét kettőzzük).\n\nGyakori **j**-s szavak, amelyeket sokan elírnak: **bója, tolvaj, karaj, muszáj, sajt, papagáj, zsivaj, moraj, kaja, haj, fej, száj**.',
          warn: 'Ha nem vagy biztos benne, ne találgass: a ly-os szavak listáját érdemes kis füzetbe kigyűjteni és gyakran átnézni.'
        },
        {
          title: 'Egybe- és különírás',
          text: 'Ha két szó **új jelentésű egységgé** forr össze, **egybeírjuk**: \n\n- **fekete rigó** = bármilyen fekete színű rigó, de **feketerigó** = egy madárfaj (amelynek a tojója barna!)\n- **nagy ember** = magas termetű, de **nagyember** = fontos, híres személy\n\nAz **összetett szavakat** általában egybeírjuk: almafa, iskolatáska, napsütés, villamosmegálló.\n\n**A 6 : 3-as szabály:** ha egy összetett szó **kettőnél több** tagból áll, és **hatnál több szótagú**, akkor a fő határon **kötőjellel** tagoljuk: **labdarúgó-világbajnokság** (4 tag, 9 szótag). Ha 6 vagy kevesebb szótagú, egybeírjuk: **gépkocsivezető** (6 szótag).\n\n**Igekötők:** ha közvetlenül az ige előtt állnak, egybeírjuk: **elmegy, megír, kinyit**. Ha az ige mögé kerülnek, vagy más szó áll közöttük, külön: **nem megy el**, **el sem megy**. Az ismételt igekötőt kötőjellel írjuk: **le-lenéz, meg-megáll**.\n\n**Számok betűvel:** kétezerig egybeírjuk (**ezerkilencszázötven**), kétezer felett a hármas számcsoportok határán kötőjelet teszünk: **kétezer-huszonhat**, **hárommillió-ötszázezer**.'
        },
        {
          title: 'Tulajdonnevek',
          text: 'A tulajdonneveket **nagy kezdőbetűvel** írjuk.\n\n- **Személynevek:** Kovács Anna, Petőfi Sándor. A becenevek is: Pisti, Zsófi.\n- **Állatnevek:** Bodri, Cirmi.\n- **Földrajzi nevek:** egyelemű: **Duna, Mátra, Debrecen**. Ha földrajzi köznév (tenger, hegység, sziget, tető, óceán) is a név része, gyakran **kötőjellel**: **Fekete-tenger, Csendes-óceán, Gellért-hegy, Magas-Tátra**. Néhány névnél a köznév különírt magyarázó tag: **Mátra hegység, Tisza folyó**.\n- **Intézménynevek:** minden tagjukat nagybetűvel kezdjük (a névelőt és kötőszót kivéve): **Magyar Nemzeti Múzeum, Petőfi Sándor Általános Iskola**.\n- **Csillagászati nevek:** Nap, Hold, Föld, Mars – ha a csillagászati égitestről van szó.\n\n**-i képzővel** kisbetűssé válnak: Debrecen → **debreceni**, Balaton → **balatoni**, Fekete-tenger → **fekete-tengeri**.\n\n**Kisbetűvel** írjuk: a napok és hónapok nevét (**hétfő, január**), az ünnepeket (**karácsony, húsvét**), a népek és nyelvek nevét (**magyar, angol, német**).',
          warn: 'Gyakori hiba: „Hétfőn Angol órám van.” Helyesen: **hétfőn angolórám van** (az „angolóra” egybeírt összetett szó, mindkét eleme kisbetűs).'
        }
      ],
      quiz: [
        { q: 'Melyik szó helyesen írt?', options: ['tolvaly', 'muszály', 'gólya', 'bólya'], answer: 2, explain: 'A gólya ly-nal írandó. A tolvaj, a muszáj és a bója j-vel helyes.' },
        { q: 'Melyik a helyes alak?', options: ['labdarúgóvilágbajnokság', 'labdarúgó világbajnokság', 'labdarúgó-világbajnokság', 'labda-rúgó-világbajnokság'], answer: 2, explain: 'Négy tagú, kilenc szótagú összetétel, ezért a fő határon kötőjel kell (6 : 3-as szabály).' },
        { q: 'Melyik helyes?', options: ['Csendes óceán', 'csendes-óceán', 'Csendes-Óceán', 'Csendes-óceán'], answer: 3, explain: 'Földrajzi név földrajzi köznévvel: az első tag nagybetűs, kötőjellel kapcsoljuk: Csendes-óceán.' },
        { q: 'Melyik a szóelemzés elvének példája?', options: ['Kossuth', 'egészség', 'asszony', 'asztal'], answer: 1, explain: 'Az egészség szót [egésség]-nek ejtjük, de a tő (egész) és a képző (-ség) megmarad írásban.' }
      ]
    },
    {
      id: 'irodalom-alapok',
      title: 'Műnemek, műfajok és költői képek',
      level: 2, minutes: 14,
      summary: 'Líra, epika, dráma; a fontosabb műfajok; hasonlat, metafora, megszemélyesítés és más költői eszközök, rímek.',
      tags: ['műnem', 'líra', 'epika', 'dráma', 'műfaj', 'mese', 'monda', 'ballada', 'óda', 'elbeszélő költemény', 'szókép', 'hasonlat', 'metafora', 'megszemélyesítés', 'alakzat', 'ismétlés', 'fokozás', 'ellentét', 'rím'],
      sections: [
        {
          title: 'A három műnem',
          text: 'Az irodalmi műveket három nagy csoportba, **műnembe** soroljuk:\n\n- **Líra:** a költő érzéseit, gondolatait, hangulatát fejezi ki, többnyire versben. Pl. dal, óda, elégia, epigramma.\n- **Epika:** **történetet mesél el**, van cselekménye, szereplői, helyszíne, és egy **elbeszélő** mondja el. Lehet prózai (mese, monda, legenda, novella, regény) vagy verses (elbeszélő költemény, eposz, verses mese).\n- **Dráma:** színpadra szánt mű, a történet a szereplők **párbeszédein** keresztül bontakozik ki, nincs elbeszélő. Pl. tragédia, komédia (vígjáték), színmű.\n\nA **ballada** különleges: mindhárom műnem jellemzőit hordozza. Történetet mesél (epika), versben, érzelmekkel (líra), párbeszédekkel és tragikus fordulattal (dráma). Greguss Ágost híres meghatározása szerint: **„tragédia dalban elbeszélve”**. Ilyen például Arany János **A walesi bárdok** című balladája.\n\nNéhány epikai műfaj röviden:\n\n- **mese**: csodás elemek, jó és rossz harca, általában jó vége van („Egyszer volt, hol nem volt…”),\n- **monda**: valós helyhez, személyhez kötődő, de kitalált részleteket tartalmazó történet (pl. a csodaszarvas mondája),\n- **legenda**: szentek életéről szóló történet.'
        },
        {
          title: 'Szóképek: hasonlat, metafora, megszemélyesítés',
          text: 'A **szóképek** a költői nyelv eszközei: egy szót nem a megszokott jelentésében használunk, hogy a kép érzékletesebb legyen.\n\n- **Hasonlat:** két dolgot **összehasonlítunk**, és a hasonlítás ki is van mondva (**mint, akár, olyan, -ként**). „Fürge, **mint** a mókus.” „Ragyog a szeme, **akár** két csillag.”\n- **Metafora:** két dolgot hasonlóságuk alapján **azonosítunk**, a „mint” elmarad. „Ez a gyerek egy **mókus**.” Arany János a Toldi elején az alföldi szöcskéket **szöcskenyájnak** nevezi, mintha juhnyájak legelnének: „Tikkadt **szöcskenyájak** legelésznek rajta.”\n- **Megszemélyesítés:** élettelen dolognak vagy állatnak **emberi tulajdonságot**, cselekvést tulajdonítunk. „**Sír** a szél.” „A nap **mosolyog** ránk.” „**Alszik** a város.”\n\nGyakori alakzatok (a szöveg „formáját” alakító eszközök):\n\n- **ismétlés**: egy szó vagy sor visszatér, nyomatékot ad,\n- **fokozás**: egyre erősebb kifejezések követik egymást (jó, nagyon jó, csodálatos),\n- **ellentét**: két szembeállított dolog (fent – lent, gazdag – szegény),\n- **felsorolás**: azonos szerepű szavak sora.',
          tip: 'A hasonlat és a metafora közti különbség: ha ott a „mint” (vagy „akár”, „olyan”), akkor hasonlat. Ha nincs, és mégis azonosítunk, metafora.'
        },
        {
          title: 'Ritmus és rím',
          text: 'A versek zeneiségét a **ritmus** és a **rím** adja.\n\nA **rím** a sorvégek hangzásbeli egyezése. A rímképletet betűkkel jelöljük:\n\n- **páros rím (aabb)**: az egymást követő sorok rímelnek,\n- **keresztrím (abab)**: minden második sor rímel,\n- **ölelkező rím (abba)**: a külső két sor és a belső két sor rímel,\n- **bokorrím (aaaa)**: minden sor ugyanarra rímel.\n\nA magyar népköltészet és sok klasszikus versünk **ütemhangsúlyos**: a sorok egyforma ütemekre oszlanak, az ütemek első szótagja hangsúlyos. A **felező tizenkettes** sor 12 szótagú, és középen 6 + 6 szótagra „feleződik”. Ebben a versformában íródott a **János vitéz** és a **Toldi** is:\n\n„Tűzesen süt le a | nyári nap sugára\nAz ég tetejéről a | juhászbojtárra.”\n\n(Petőfi Sándor: János vitéz – páros rím)'
        }
      ],
      quiz: [
        { q: 'Melyik műnembe tartozik a regény?', options: ['líra', 'dráma', 'epika', 'egyikbe sem'], answer: 2, explain: 'A regény történetet mesél el, van elbeszélője: epikai mű.' },
        { q: 'Milyen költői kép: „Sír a szél az ablak alatt.”?', options: ['hasonlat', 'megszemélyesítés', 'ellentét', 'rím'], answer: 1, explain: 'A szél nem tud sírni, ez emberi cselekvés: megszemélyesítés.' },
        { q: 'Milyen kép: „Szeme olyan kék, mint a tenger.”?', options: ['metafora', 'megszemélyesítés', 'hasonlat', 'fokozás'], answer: 2, explain: 'A „mint” kötőszó jelzi az összehasonlítást: hasonlat.' },
        { q: 'Melyik rímképlet jelöli a keresztrímet?', options: ['aabb', 'abab', 'abba', 'aaaa'], answer: 1, explain: 'Keresztrímben az 1. és 3., valamint a 2. és 4. sor rímel: abab.' }
      ]
    },
    {
      id: 'petofi-arany',
      title: 'Petőfi Sándor és Arany János',
      level: 2, minutes: 16,
      summary: 'Két nagy költőnk élete és barátsága, a János vitéz és a Toldi története, szereplői és jellemzői.',
      tags: ['Petőfi Sándor', 'Arany János', 'János vitéz', 'Toldi', 'Kukorica Jancsi', 'Iluska', 'Toldi Miklós', 'elbeszélő költemény', 'Nemzeti dal', 'felező tizenkettes', 'Kisfaludy Társaság'],
      sections: [
        {
          title: 'Petőfi Sándor',
          text: '**Petőfi Sándor** 1823. január 1-jén született **Kiskőrösön**. Gyerekkora nagy részét a Kiskunságban töltötte, szülőföldjének Kiskunfélegyházát tartotta. Sokat vándorolt, volt színész és katona is, mielőtt költőként híres lett.\n\nVersei egyszerű, **népies** nyelven szólnak a szerelemről, a tájról (az Alföldről), a szabadságról. Fontosabb művei:\n\n- **János vitéz** (1844), elbeszélő költemény\n- szerelmes versek feleségéhez, **Szendrey Júliához** (pl. Szeptember végén)\n- **Nemzeti dal** (1848): ezt szavalta el 1848. március 15-én a forradalom napján („Talpra magyar, hí a haza!”)\n\nA szabadságharcban **Bem apó** segédtisztjeként harcolt. 1849. július 31-én, a **segesvári csatában** tűnt el, valószínűleg ott esett el, mindössze 26 évesen.'
        },
        {
          title: 'A János vitéz',
          text: 'A **János vitéz** 1844-ben készült **elbeszélő költemény** (verses mese), 27 fejezetből („énekből”) áll, felező tizenkettesekben, páros rímekkel.\n\n**A történet röviden:**\n\n1. **Kukorica Jancsi**, az árva juhászbojtár szereti **Iluskát**, akit gonosz **mostohája** dolgoztat.\n2. Míg Jancsi Iluskával van, a nyáj egy része elkóborol. A **gazda** elkergeti, Jancsi búcsút vesz Iluskától, és világgá megy.\n3. **Huszárnak** áll, a franciák segítségére sietnek a törökök ellen. Jancsi megmenti a **francia királylányt**, de a kezét és a trónt nem fogadja el, mert Iluskához akar hazatérni.\n4. Hazaérve megtudja, hogy **Iluska meghalt**. Sírjáról egy **rózsát** szakít, és bánatában újra útnak indul.\n5. Kalandjai során legyőzi az **óriásokat**, akik szolgálatába állnak, elűzi a **boszorkányokat**, majd egy griffmadár hátán átkel az **Óperenciás-tengeren**.\n6. **Tündérországban** az **élet vizébe** dobja a rózsát, amelyből Iluska feltámad. Jancsi a tündérek királya lesz, és boldogan élnek.\n\nA mű a **valóságból** (falusi élet) halad a **mesevilág** felé. Jancsi a hűség, a bátorság és az igaz szerelem hőse.',
          tip: 'A Kukorica Jancsi név onnan ered, hogy csecsemőként egy kukoricásban találtak rá. A „János vitéz” nevet a francia királytól kapta, miután megmentette a királylányt.'
        },
        {
          title: 'Arany János és a Toldi',
          text: '**Arany János** 1817-ben született **Nagyszalontán**, szegény családban. Volt tanító, jegyző, később tanár Nagykőrösön, majd a **Magyar Tudományos Akadémia** titkára Pesten. 1882-ben halt meg.\n\n1846-ban a **Kisfaludy Társaság** pályázatot írt ki egy népies hősről szóló elbeszélő költeményre. Arany a **Toldival** **megnyerte** (1847). Petőfi lelkes levelet írt neki, ebből **barátság** született.\n\nA **Toldi** 12 énekből álló elbeszélő költemény, szintén felező tizenkettesben. Hőse **Toldi Miklós**, a **Nagy Lajos** király korában élt, hatalmas erejű nemesifjú.\n\n**A történet röviden:**\n\n1. Miklós otthon, **Nagyfaluban** parasztként dolgozik, mert bátyja, a ravasz **Toldi György** semmibe veszi.\n2. György katonái gúnyolják Miklóst, az haragjában egy **malomkövet** hajít feléjük, és véletlenül megöl egy vitézt. Bujdosnia kell, a nádasban **farkasokkal** is megküzd.\n3. Édesanyja a hűséges öreg szolgával, **Bencével** küld neki ételt és pénzt. Miklós **Pestre** megy, ahol megfékez egy elszabadult **bikát**.\n4. Egy **cseh vitéz** sorra legyőzi a magyar bajnokokat. Miklós a Duna **szigetén** megvívja vele a párviadalt és **legyőzi**.\n5. **Lajos király** megbocsát neki és vitézzé fogadja, György ármánykodása pedig kudarcot vall.\n\nA Toldi a **testvérviszály**, az **igazságosság** és a tisztességes erő története. Folytatásai: **Toldi estéje** és **Toldi szerelme** (a Toldi-trilógia).',
          widget: { type: 'idovonal', options: { title: 'Petőfi és Arany életútja', events: [
            { year: 1817, label: '1817', title: 'Arany születése', text: 'Arany János március 2-án születik **Nagyszalontán**, szegény földművescsaládban.' },
            { year: 1823, label: '1823', title: 'Petőfi születése', text: 'Petőfi Sándor január 1-jén születik **Kiskőrösön**.' },
            { year: 1844, label: '1844', title: 'János vitéz', text: 'Petőfi néhány hét alatt megírja a **János vitézt**, és Pestre költözik. Megjelenik első verseskötete is.' },
            { year: 1846, label: '1846', title: 'A Toldi megírása', text: 'Arany a **Kisfaludy Társaság** pályázatára megírja a **Toldit**.' },
            { year: 1847.1, label: '1847 eleje', title: 'Győzelem és barátság', text: 'A Toldi megnyeri a pályázatot. Petőfi lelkes levélben üdvözli Aranyt, és életre szóló barátság kezdődik közöttük.' },
            { year: 1847.7, label: '1847. szept.', title: 'Petőfi esküvője', text: 'Petőfi feleségül veszi **Szendrey Júliát** Erdődön.' },
            { year: 1848.2, label: '1848. márc. 15.', title: 'Nemzeti dal', text: 'A pesti forradalom napján Petőfi elszavalja a **Nemzeti dalt**: „Talpra magyar, hí a haza!”' },
            { year: 1849.6, label: '1849. júl. 31.', title: 'Petőfi halála', text: 'Petőfi a **segesvári csatában** tűnik el, valószínűleg ott esik el.' },
            { year: 1877, label: '1877', title: 'Őszikék', text: 'Az idős Arany a **Kapcsos könyvbe** írja utolsó nagy verseit, az **Őszikéket**.' },
            { year: 1879, label: '1879', title: 'Toldi szerelme', text: 'Elkészül a trilógia utolsó része, a **Toldi szerelme**.' },
            { year: 1882, label: '1882', title: 'Arany halála', text: 'Arany János október 22-én hunyt el Budapesten.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Hol született Petőfi Sándor?', options: ['Nagyszalontán', 'Kiskőrösön', 'Segesváron', 'Kiskunfélegyházán'], answer: 1, explain: 'Petőfi Kiskőrösön született 1823-ban. Nagyszalonta Arany szülővárosa, Segesvárnál esett el.' },
        { q: 'Mit dob Jancsi az élet vizébe Tündérországban?', options: ['egy rózsát Iluska sírjáról', 'a kardját', 'egy hajtincset', 'Iluska gyűrűjét'], answer: 0, explain: 'A sírról szakított rózsából támad fel Iluska.' },
        { q: 'Ki a Toldi hűséges öreg szolgája?', options: ['György', 'Laczfi', 'Bence', 'Lajos'], answer: 2, explain: 'Bence viszi Miklósnak az ételt és a pénzt az édesanyától. György a gonosz báty, Lajos a király.' },
        { q: 'Milyen versformában íródott a János vitéz és a Toldi?', options: ['hexameterben', 'felező tizenkettesben', 'szonettformában', 'szabad versben'], answer: 1, explain: 'Mindkettő 12 szótagú, 6 + 6-ra feleződő sorokból áll, páros rímekkel.' }
      ]
    }
  ]
});
