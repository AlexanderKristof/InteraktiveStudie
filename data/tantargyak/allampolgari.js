/* Tantárgy: Állampolgári ismeretek */
STUDIE.addSubject({
  id: 'allampolgari',
  stage: 'kozep',
  title: 'Állampolgári ismeretek',
  icon: '🏛️',
  color: '#7c5cd6',
  description: 'Állam, demokrácia, alkotmányos intézmények, választások, jogok és kötelességek, az Európai Unió és a médiatudatosság.',
  intro: 'Hogyan születik egy törvény? Ki dönt arról, hogy egy szabály alaptörvény-ellenes? Mire figyelj, ha online vásárolsz, és hogyan ismered fel az álhíreket? Ebben a tantárgyban megismered, hogyan működik a demokratikus állam és Magyarország alkotmányos rendszere, milyen jogaid és kötelességeid vannak, és hogyan vehetsz részt a közösséged életében. A tananyag a **szabályokat és az intézmények feladatait** mutatja be, pártoktól és politikusoktól függetlenül.',
  lessons: [
    {
      id: 'allam-demokracia',
      title: 'Az állam és a demokrácia alapjai',
      level: 1, minutes: 12,
      summary: 'Mi az állam, mitől demokratikus egy ország, mi a hatalommegosztás és a jogállam.',
      tags: ['állam', 'demokrácia', 'népszuverenitás', 'hatalommegosztás', 'Montesquieu', 'törvényhozó hatalom', 'végrehajtó hatalom', 'bírói hatalom', 'jogállam', 'alkotmány', 'diktatúra'],
      sections: [
        {
          title: 'Mi az állam?',
          text: 'Az **állam** egy terület lakóinak politikai közössége, amelynek szervezett közhatalma van. Három ismérve:\n\n- **Terület**: meghatározott határok.\n- **Népesség**: az állampolgárok és a területen élők.\n- **Közhatalom**: szervezetek (parlament, kormány, bíróságok, hatóságok), amelyek szabályokat hoznak és betartatnak.\n\nAz állam feladata többek között a közrend és a biztonság fenntartása, az ország védelme, a jogszabályok megalkotása, valamint közszolgáltatások szervezése (oktatás, egészségügy, közlekedés). Ehhez az állampolgárok **adóiból** gazdálkodik.'
        },
        {
          title: 'Mitől demokratikus egy állam?',
          text: 'A **demokrácia** görög szó, jelentése „a nép uralma”. Alapelve a **népszuverenitás**: a hatalom forrása a nép.\n\n- **Közvetlen demokrácia**: a polgárok maguk döntenek, pl. **népszavazáson**.\n- **Képviseleti demokrácia**: a polgárok **választásokon** képviselőket bíznak meg, akik a nevükben döntenek. A mai demokráciák főként így működnek.\n\nEgy demokrácia fontos jellemzői:\n\n- rendszeres, **szabad és titkos választások**, több párt és jelölt közül\n- az **alapvető jogok** védelme (pl. szólás-, sajtó-, gyülekezési szabadság)\n- a **többség dönt**, de tiszteletben tartja a kisebbség jogait\n- a hatalom **korlátozott** és **ellenőrizhető**\n- **szabad sajtó** és civil társadalom\n\nEzzel szemben a **diktatúrában** egy személy vagy csoport korlátlan hatalommal rendelkezik, nincsenek valódi választások, és az alapjogokat elnyomják.',
          tip: 'A demokrácia nem csak a választás napján működik: a sajtó, a civil szervezetek és a polgárok véleménynyilvánítása a választások között is fontos része.'
        },
        {
          title: 'A hatalommegosztás',
          text: 'Ha minden hatalom egy kézben van, könnyű visszaélni vele. Ezért a modern államokban a hatalmat **szétválasztják**. Az elvet John Locke és különösen **Montesquieu** francia gondolkodó fejtette ki (A törvények szelleméről, 1748).\n\n- **Törvényhozó hatalom**: megalkotja a törvényeket. Magyarországon az **Országgyűlés**.\n- **Végrehajtó hatalom**: végrehajtja a törvényeket, irányítja az államigazgatást. Magyarországon a **Kormány**.\n- **Bírói hatalom**: jogvitákban dönt, megállapítja a jogsértést. Ezek a független **bíróságok**.\n\nA hatalmi ágak **kölcsönösen ellenőrzik és fékezik** egymást (angolul: checks and balances). Ezen felül vannak olyan független intézmények is, mint az alkotmánybíróság vagy az állami számvevőszék, amelyek további ellensúlyt jelentenek.'
        },
        {
          title: 'A jogállam',
          text: 'A **jogállamban** az állam is a jog alá van rendelve: a közhatalom csak a jogszabályok keretei között működhet. Fő elemei:\n\n- **Alkotmányosság**: az alkotmány (Magyarországon az **Alaptörvény**) a legmagasabb szintű jogszabály, a többi nem lehet ellentétes vele.\n- **Jogbiztonság**: a szabályok világosak, kiszámíthatók, nyilvánosak. Kötelezettséget **visszamenőleg** nem lehet megállapítani.\n- **Törvény előtti egyenlőség**: mindenkire ugyanazok a szabályok vonatkoznak.\n- **Független bíróságok** és jogorvoslati lehetőség: a hatóság döntését meg lehet támadni.\n- Az **alapvető jogok** tiszteletben tartása.\n\nA jogszabályok **hierarchiában** állnak: legfelül az Alaptörvény, alatta a törvények, majd a kormányrendeletek, a miniszteri rendeletek, és a helyi önkormányzati rendeletek. Alacsonyabb szintű jogszabály nem lehet ellentétes a magasabbal.'
        },
        {
          title: 'Párosítás',
          text: 'Párosítsd a fogalmat a jelentésével!',
          widget: { type: 'parositas', options: { title: 'Alapfogalmak', pairs: [
            ['Népszuverenitás', 'A hatalom forrása a nép'],
            ['Törvényhozó hatalom', 'Megalkotja a törvényeket'],
            ['Végrehajtó hatalom', 'Végrehajtja a törvényeket, irányítja az igazgatást'],
            ['Bírói hatalom', 'Jogvitákban dönt'],
            ['Jogbiztonság', 'Kiszámítható, világos, nyilvános szabályok'],
            ['Közvetlen demokrácia', 'A polgárok maguk döntenek, pl. népszavazáson'],
            ['Montesquieu', 'A hatalommegosztás elvének kidolgozója']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik NEM a három klasszikus hatalmi ág egyike?', options: ['Törvényhozó', 'Végrehajtó', 'Bírói', 'Sajtó'], answer: 3, explain: 'A sajtót néha „negyedik hatalomnak” nevezik, de a klasszikus hatalommegosztásban a törvényhozó, végrehajtó és bírói ág szerepel.' },
        { q: 'Mit jelent a népszuverenitás?', options: ['A hatalom forrása a nép', 'Az uralkodó hatalma isteni eredetű', 'Az állam független a többi államtól', 'Csak a nemesek szavazhatnak'], answer: 0, explain: 'A demokrácia alapelve: a nép választásokon és népszavazáson gyakorolja a hatalmat.' },
        { q: 'Melyik a legmagasabb szintű jogszabály Magyarországon?', options: ['Kormányrendelet', 'Alaptörvény', 'Önkormányzati rendelet', 'Miniszteri rendelet'], answer: 1, explain: 'Az Alaptörvény a jogrendszer alapja: más jogszabály nem lehet ellentétes vele.' }
      ]
    },
    {
      id: 'intezmenyek',
      title: 'Magyarország alaptörvényes intézményei',
      level: 2, minutes: 16,
      summary: 'Az Alaptörvény, az Országgyűlés, a köztársasági elnök, a Kormány, az Alkotmánybíróság, a bíróságok és az önkormányzatok feladatai.',
      tags: ['Alaptörvény', 'Országgyűlés', 'képviselő', 'köztársasági elnök', 'Kormány', 'miniszterelnök', 'Alkotmánybíróság', 'Kúria', 'bíróság', 'ügyészség', 'ombudsman', 'önkormányzat', 'polgármester', 'vármegye', 'sarkalatos törvény'],
      sections: [
        {
          title: 'Az Alaptörvény',
          text: 'Magyarország alkotmánya az **Alaptörvény**. Az Országgyűlés **2011. április 25-én** fogadta el, és **2012. január 1-jén** lépett hatályba. Kimondja, hogy Magyarország államformája **köztársaság**, és független, demokratikus **jogállam**.\n\nFő részei: a Nemzeti hitvallás (bevezető), az Alapvetés (alapelvek, pl. főváros, nemzeti jelképek), a Szabadság és felelősség (jogok és kötelességek), az Állam (az intézmények), végül a záró rendelkezések.\n\nAz Alaptörvény elfogadásához és módosításához **az összes országgyűlési képviselő kétharmadának** szavazata kell. Bizonyos fontos területeket (pl. választási rendszer, önkormányzatok) **sarkalatos törvények** szabályoznak, ezekhez a **jelen lévő** képviselők kétharmada kell.'
        },
        {
          title: 'Az Országgyűlés',
          text: 'Az **Országgyűlés** Magyarország legfőbb népképviseleti szerve, a **törvényhozó hatalom**. **199 képviselőből** áll, akiket **4 évre** választanak.\n\nFő feladatai:\n\n- **törvényeket alkot**, elfogadja és módosítja az Alaptörvényt\n- elfogadja a **központi költségvetést** (az állam éves bevételeit és kiadásait)\n- **megválasztja** a miniszterelnököt, a köztársasági elnököt, az Alkotmánybíróság tagjait, a Kúria elnökét, a legfőbb ügyészt, az alapvető jogok biztosát\n- **ellenőrzi a Kormányt**: a képviselők kérdéseket, interpellációkat intézhetnek a miniszterekhez, a bizottságok vizsgálódhatnak\n- dönt a hadiállapotról, a nemzetközi szerződések egy részéről\n\nA képviselők frakciókba (képviselőcsoportokba) tömörülnek, a munka nagy része a szakbizottságokban folyik. Az ülések főszabályként **nyilvánosak**.',
          tip: 'Egy törvény útja röviden: **benyújtás** (törvényjavaslatot a Kormány, a köztársasági elnök, egy bizottság vagy bármely képviselő tehet), **általános és részletes vita**, **szavazás**, majd a házelnök aláírása után a köztársasági elnök **aláírja és kihirdeti** a Magyar Közlönyben.'
        },
        {
          title: 'A köztársasági elnök',
          text: 'A **köztársasági elnök** Magyarország **államfője**. Kifejezi a nemzet egységét, és őrködik az államszervezet demokratikus működése felett. Az Országgyűlés választja **5 évre**, egyszer újraválasztható. Legalább 35 éves magyar állampolgár lehet.\n\nFeladatai közül néhány:\n\n- **aláírja és kihirdeti** a törvényeket. Ha nem ért egyet egy törvénnyel, egyszer **visszaküldheti** megfontolásra az Országgyűlésnek, vagy ha alaptörvény-ellenesnek tartja, az **Alkotmánybírósághoz** fordulhat\n- kitűzi az országgyűlési választást\n- javaslatot tesz a miniszterelnök személyére, kinevezi a minisztereket\n- a **Magyar Honvédség főparancsnoka**\n- egyéni **kegyelmet** adhat, kitüntetéseket adományoz\n\nSzerepe főként **kiegyensúlyozó, közjogi méltóság** jellegű: a napi kormányzás nem az ő feladata.'
        },
        {
          title: 'A Kormány',
          text: 'A **Kormány** a **végrehajtó hatalom** általános szerve: irányítja az államigazgatást (minisztériumok, kormányhivatalok), végrehajtja a törvényeket, és benyújtja a költségvetés tervezetét. **Rendeleteket** is alkothat.\n\nTagjai: a **miniszterelnök** és a **miniszterek**. A miniszterelnököt az Országgyűlés választja a köztársasági elnök javaslatára, a képviselők **több mint felének** szavazatával. A minisztereket a miniszterelnök javaslatára a köztársasági elnök nevezi ki.\n\nA Kormány az Országgyűlésnek **felelős**. Az Országgyűlés **konstruktív bizalmatlansági indítvánnyal** megvonhatja a bizalmat a miniszterelnöktől: ilyenkor egyszerre meg kell nevezni az új miniszterelnök-jelöltet is. Ez biztosítja, hogy az ország ne maradjon kormány nélkül.'
        },
        {
          title: 'Alkotmánybíróság, bíróságok és más független szervek',
          text: '**Alkotmánybíróság**: az Alaptörvény védelmének legfőbb szerve. **15 tagját** az Országgyűlés választja **12 évre**. Megvizsgálja, hogy a jogszabályok összhangban vannak-e az Alaptörvénnyel, és az alaptörvény-ellenes jogszabályt **megsemmisítheti**. Bárki fordulhat hozzá **alkotmányjogi panasszal**, ha egy bírósági döntés vagy jogszabály az alaptörvényben biztosított jogát sérti (és a jogorvoslati lehetőségeit kimerítette).\n\n**Bíróságok**: igazságszolgáltatás polgári, büntető, közigazgatási és munkaügyi ügyekben. A bírák **függetlenek**, csak a törvénynek vannak alárendelve, és nem utasíthatók. Szintjeik: járásbíróságok, törvényszékek, ítélőtáblák, és a legfőbb bírói szerv, a **Kúria**, amely egységesíti az ítélkezési gyakorlatot.\n\nTovábbi fontos szervek:\n\n- **Ügyészség**: a legfőbb ügyész vezeti, a bűncselekmények miatt **vádat emel** a bíróság előtt.\n- **Alapvető jogok biztosa** (ombudsman): vizsgálja a hatóságok által okozott jogsérelmeket, panaszt bárki tehet nála.\n- **Állami Számvevőszék**: az állami pénzek felhasználását ellenőrzi.\n- **Magyar Nemzeti Bank**: a központi bank, felel az árstabilitásért, kibocsátja a forintot.'
        },
        {
          title: 'Helyi önkormányzatok',
          text: 'A **helyi önkormányzatok** a településeken és a vármegyékben intézik a helyi ügyeket. Választóik **5 évente** választják meg a **polgármestert** és a **képviselő-testületet** (Budapesten a főpolgármestert és a Fővárosi Közgyűlést, valamint a kerületi polgármestereket).\n\nFeladatai lehetnek például: a település fejlesztése, helyi utak és közterületek, közvilágítás, vízellátás, hulladékkezelés, szociális ellátások, kultúra és sport. Az önkormányzat **helyi rendeletet** alkothat, és **helyi adót** vethet ki, a törvények keretei között.\n\nA területi önkormányzat a **vármegyei önkormányzat** (2023-tól hívják a megyéket újra vármegyéknek). Az önkormányzatok törvényes működését a **kormányhivatal** felügyeli.'
        },
        {
          title: 'Párosítás',
          text: 'Melyik intézmény mit csinál?',
          widget: { type: 'parositas', options: { title: 'Intézmények és feladataik', pairs: [
            ['Országgyűlés', 'Törvényeket alkot, elfogadja a költségvetést'],
            ['Köztársasági elnök', 'Államfő, aláírja és kihirdeti a törvényeket'],
            ['Kormány', 'Irányítja az államigazgatást'],
            ['Alkotmánybíróság', 'Megsemmisítheti az alaptörvény-ellenes jogszabályt'],
            ['Kúria', 'A legfőbb bírói szerv'],
            ['Ügyészség', 'Vádat emel a bíróság előtt'],
            ['Alapvető jogok biztosa', 'Vizsgálja a hatóságok okozta jogsérelmeket'],
            ['Képviselő-testület', 'Helyi rendeleteket alkot a településen']
          ] } }
        }
      ],
      quiz: [
        { q: 'Hány képviselőből áll az Országgyűlés?', options: ['100', '199', '386', '150'], answer: 1, explain: 'A 2014-es választás óta 199 képviselő van: 106 egyéni választókerületből és 93 listáról.' },
        { q: 'Kit választ meg az Országgyűlés 5 évre?', options: ['A miniszterelnököt', 'A polgármestereket', 'A köztársasági elnököt', 'Az alkotmánybírákat'], answer: 2, explain: 'A köztársasági elnök megbízatása 5 év. Az alkotmánybírákat 12 évre, a miniszterelnököt az Országgyűlés megbízatásának idejére választják.' },
        { q: 'Mi jellemzi a konstruktív bizalmatlansági indítványt?', options: ['A köztársasági elnök nyújtja be', 'Egyszerre meg kell nevezni az új miniszterelnök-jelöltet', 'Népszavazással dönt róla a nép', 'Csak háború idején lehet'], answer: 1, explain: 'Így a régi miniszterelnök leváltásával egy időben már meg is van az utódja.' }
      ]
    },
    {
      id: 'valasztasok',
      title: 'Választások és részvétel',
      level: 2, minutes: 14,
      summary: 'A választójog alapelvei, az országgyűlési választási rendszer, a népszavazás szabályai és a civil részvétel formái.',
      tags: ['választás', 'választójog', 'szavazás', 'választókerület', 'pártlista', 'bejutási küszöb', 'mandátum', 'népszavazás', 'civil szervezet', 'egyesület', 'alapítvány', 'önkéntesség', 'közösségi szolgálat', 'petíció'],
      sections: [
        {
          title: 'A választójog alapelvei',
          text: 'Magyarországon minden **nagykorú** (főszabályként 18. életévét betöltött) magyar állampolgárnak választójoga van. A választás alapelvei:\n\n- **Általános**: nem függ vagyontól, nemtől, végzettségtől, vallástól.\n- **Egyenlő**: minden szavazat ugyanannyit ér.\n- **Közvetlen**: a választók maguk választják a képviselőket, nem közvetítőkön keresztül.\n- **Titkos**: senki nem láthatja, kire szavaztál, és senki nem kényszeríthet, hogy eláruld.\n\nA szavazás **jog, nem kötelesség**. Választójogot csak bíróság vonhat meg, nagyon súlyos esetekben (pl. egyes bűncselekmények miatt).\n\nA **helyi önkormányzati** választáson a Magyarországon élő **más uniós állampolgárok** is szavazhatnak, az **európai parlamenti** választáson pedig az uniós polgárok a lakóhelyük szerinti tagállamban választhatnak.',
          tip: 'A választópolgárok névjegyzékét a helyi választási iroda vezeti. A szavazáshoz személyazonosításra alkalmas igazolványt (személyi igazolvány, útlevél, jogosítvány) és lakcímkártyát vigyél!'
        },
        {
          title: 'Az országgyűlési választási rendszer',
          text: 'Magyarország **vegyes választási rendszert** használ, 4 évente. A választó két szavazatot ad le:\n\n1. Egy **egyéni jelöltre** a saját választókerületében. **106** egyéni választókerület van, mindegyikben az nyer, aki a **legtöbb** szavazatot kapja (egyfordulós, relatív többségi rendszer).\n2. Egy **pártlistára** (az országos listára). A listákról **93** mandátumot osztanak ki arányosan.\n\nA listás mandátumok elosztásánál a **töredékszavazatokat** is figyelembe veszik: az egyéni kerületekben a vesztes jelöltekre leadott, illetve a győztesnek a győzelemhez nem szükséges szavazatokat.\n\nCsak az a párt kaphat listás mandátumot, amely átlépi a **bejutási küszöböt**: egy pártnak az országos listás szavazatok **5%-a**, két párt közös listájának 10%-a, három vagy több pártnak 15%-a kell.\n\nA nemzetiségi névjegyzékbe vett választópolgárok pártlista helyett **nemzetiségi listára** szavazhatnak, a nemzetiségek kedvezményes feltétellel juthatnak mandátumhoz.'
        },
        {
          title: 'A népszavazás',
          text: 'A **népszavazás** a közvetlen demokrácia eszköze: a választópolgárok maguk döntenek egy kérdésről.\n\n- **Országos népszavazást** az Országgyűlés rendel el. **Köteles** elrendelni, ha legalább **200 000** választópolgár kezdeményezi. Elrendelheti a Kormány, a köztársasági elnök vagy 100 000 választópolgár kezdeményezésére is.\n- **Érvényes** a népszavazás, ha a választópolgárok **több mint fele** érvényesen szavazott.\n- **Eredményes**, ha az érvényes szavazatok **több mint fele** azonos választ adott.\n- Az érvényes és eredményes népszavazás döntése **kötelező** az Országgyűlésre.\n\nVannak témák, amelyekről **nem lehet** országos népszavazást tartani, például az Alaptörvény módosítása, a költségvetés, az adók, vagy a nemzetközi szerződésekből eredő kötelezettségek.\n\n**Helyi népszavazást** a település ügyeiről lehet tartani.'
        },
        {
          title: 'Részvétel a választásokon túl',
          text: 'A közügyekben nem csak szavazással vehetsz részt:\n\n- **Civil szervezetek**: az **egyesület** tagjai közös célért dolgoznak (pl. sportegyesület, környezetvédő egyesület), az **alapítvány** egy alapító által adott vagyonnal szolgál egy célt (pl. beteg gyerekek támogatása). Az adófizetők a személyi jövedelemadójuk **1%-áról** rendelkezhetnek egy civil szervezet javára.\n- **Önkéntesség**: segítség árvízvédelemben, idősotthonban, állatmenhelyen. Az érettségihez **50 óra iskolai közösségi szolgálat** szükséges.\n- **Diákönkormányzat**: az iskolában a diákok érdekeit képviseli.\n- **Petíció, panasz, közérdekű bejelentés**: bárki fordulhat írásban az állami és önkormányzati szervekhez.\n- **Gyülekezés**: békés tüntetés, felvonulás szervezése a gyülekezési jog szabályai szerint.\n- **Közmeghallgatás**: az önkormányzat évente legalább egyszer meghallgatja a lakókat.',
          tip: 'Ha valami zavar a környezetedben (pl. veszélyes kereszteződés az iskola előtt), írj az önkormányzatnak, vagy vidd el a közmeghallgatásra. A konkrét, jól megfogalmazott javaslatnak nagyobb az esélye.'
        }
      ],
      quiz: [
        { q: 'Mit jelent, hogy a választás titkos?', options: ['A választás időpontja titok', 'Senki nem tudhatja meg, kire szavaztál', 'A jelöltek neve titkos', 'Az eredményt nem hozzák nyilvánosságra'], answer: 1, explain: 'A szavazófülke és a lezárt urna biztosítja, hogy a döntésed csak a tiéd legyen.' },
        { q: 'Mekkora a bejutási küszöb egy önállóan induló párt listájának az országgyűlési választáson?', options: ['1%', '3%', '5%', '10%'], answer: 2, explain: 'Egy pártnak 5%, két párt közös listájának 10%, három vagy több pártnak 15% kell.' },
        { q: 'Mikor érvényes egy országos népszavazás?', options: ['Ha legalább 200 000-en szavaztak', 'Ha a választópolgárok több mint fele érvényesen szavazott', 'Ha legalább egy igen szavazat van', 'Mindig érvényes'], answer: 1, explain: 'A 200 000 aláírás a kezdeményezéshez kell. Az érvényességhez a választópolgárok több mint felének érvényes szavazata szükséges.' }
      ]
    },
    {
      id: 'jogok',
      title: 'Jogok és kötelességek',
      level: 2, minutes: 15,
      summary: 'Alapvető jogok és korlátaik, állampolgári kötelességek, gyermekjogok, adatvédelem és fogyasztóvédelem.',
      tags: ['alapjogok', 'emberi jogok', 'emberi méltóság', 'szólásszabadság', 'kötelességek', 'adófizetés', 'tankötelezettség', 'gyermekjogok', 'ENSZ Gyermekjogi Egyezmény', 'adatvédelem', 'GDPR', 'NAIH', 'fogyasztóvédelem', 'elállási jog', 'szavatosság', 'jótállás'],
      sections: [
        {
          title: 'Alapvető jogok',
          text: 'Az **alapvető (emberi) jogok** minden embert megilletnek, pusztán azért, mert ember. Az Alaptörvény „Szabadság és felelősség” része sorolja fel őket. Néhány példa:\n\n- **emberi méltóság** és az **élethez** való jog\n- személyes **szabadság** és biztonság\n- **véleménynyilvánítás** és a **sajtó** szabadsága\n- **gondolat-, lelkiismeret- és vallásszabadság**\n- **gyülekezési** és **egyesülési** jog\n- **magánszféra**, a személyes adatok védelme\n- **tulajdonhoz** való jog\n- **művelődéshez** (oktatáshoz) és **egészséghez** való jog\n- **egyenlő bánásmód**: senkit nem érhet hátrányos megkülönböztetés pl. származása, neme, vallása, fogyatékossága miatt\n\nA jogok többsége **nem korlátlan**: egy alapjog korlátozható, ha egy **másik alapjog** vagy alkotmányos érték védelme miatt **feltétlenül szükséges**, és a korlátozás **arányos**. A szólásszabadság például nem terjed ki más emberek rágalmazására.'
        },
        {
          title: 'Kötelességek',
          text: 'A jogok mellett az Alaptörvény kötelességeket is megállapít:\n\n- a **jogszabályok betartása**\n- a **közteherviselés**: mindenki képességei és a gazdaságban való részvétele szerint hozzájárul a közös szükségletekhez, pl. **adófizetéssel**\n- a **haza védelme**\n- **tankötelezettség**: Magyarországon **16 éves korig** iskolába kell járni\n- a szülők kötelessége gondoskodni kiskorú gyermekükről, a nagykorú gyermeké pedig gondoskodni rászoruló szüleiről\n- a környezet és a természeti értékek védelme\n\nA jogok és kötelességek **összetartoznak**: az iskolát, a kórházat, az utakat a közösen befizetett adókból tartják fenn.'
        },
        {
          title: 'Gyermekjogok',
          text: 'Az **ENSZ Gyermekjogi Egyezményét** 1989-ben fogadták el, Magyarország 1991-ben hirdette ki. A **18 év alattiakat** védi. Négy alapelve:\n\n1. **A hátrányos megkülönböztetés tilalma**: minden gyermeket ugyanazok a jogok illetnek meg.\n2. **A gyermek mindenek felett álló érdeke**: minden őt érintő döntésnél ezt kell elsődlegesen figyelembe venni.\n3. **Élethez és fejlődéshez való jog**.\n4. **A gyermek véleményének figyelembevétele**: joga van kifejteni a véleményét az őt érintő ügyekben, és azt életkorának megfelelően figyelembe kell venni.\n\nA gyermeknek joga van a védelemhez a bántalmazással, elhanyagolással, kizsákmányolással szemben, az oktatáshoz, a pihenéshez és a játékhoz.',
          tip: 'Ha bajban vagy, vagy bántanak, ingyen és névtelenül hívhatod a **116-111** gyermek- és ifjúsági lelki segélyvonalat. Az iskolában fordulhatsz az osztályfőnökhöz, az iskolapszichológushoz vagy a gyermekvédelmi feladatokat ellátó munkatárshoz is.'
        },
        {
          title: 'Adatvédelem',
          text: 'A **személyes adat** minden olyan információ, amelyből egy ember azonosítható: név, lakcím, telefonszám, fénykép, IP-cím, egészségügyi adat. Az Európai Unióban a **GDPR** (általános adatvédelmi rendelet) szabályozza a kezelésüket, **2018** óta. Magyarországon a felügyeleti hatóság a **NAIH** (Nemzeti Adatvédelmi és Információszabadság Hatóság).\n\nA jogaid többek között:\n\n- **tájékoztatás**: megtudhatod, ki, milyen célból és meddig kezeli az adataidat\n- **hozzáférés**: kérhetsz másolatot a rólad tárolt adatokról\n- **helyesbítés** és **törlés** (az „elfeledtetéshez való jog”)\n- **tiltakozás**, pl. a közvetlen reklámcélú adatkezelés ellen\n\nMagyarországon **16 év alatti** gyermek adatainak online szolgáltatásban (pl. közösségi oldalon) történő kezeléséhez főszabályként a **szülő hozzájárulása** szükséges.',
          warn: 'Mások fényképét, videóját az ő **hozzájárulásuk nélkül** ne tedd közzé! A képmás és a hangfelvétel is védett személyes adat.'
        },
        {
          title: 'Fogyasztóvédelem',
          text: 'Vásárlóként, vagyis **fogyasztóként** is vannak jogaid:\n\n- **Elállási jog**: interneten vagy telefonon vásárolt terméknél általában **14 napon belül indoklás nélkül** elállhatsz a vásárlástól, és visszakapod a pénzed (néhány kivétellel, pl. romlandó áru, egyedi termék).\n- **Kellékszavatosság**: ha a termék már a vásárláskor hibás volt, kérhetsz javítást vagy cserét, ha ez nem lehetséges, árleszállítást vagy elállást. Új terméknél fogyasztóként **2 évig** élhetsz vele.\n- **Jótállás** (garancia): bizonyos tartós termékekre kötelező, az ártól függően **1–3 évig**.\n- Őrizd meg a **blokkot** vagy a számlát: ezzel igazolod a vásárlást.\n\nHa a kereskedővel nem tudsz megegyezni, fordulhatsz a **békéltető testülethez** (ingyenes, gyors egyezségkereső eljárás) vagy a fogyasztóvédelmi hatósághoz.',
          tip: 'Online vásárlás előtt nézd meg: van-e a webáruháznak elérhető cégneve, címe, ügyfélszolgálata, és mit írnak róla független vélemények. A gyanúsan olcsó ajánlat gyakran csalás.'
        }
      ],
      quiz: [
        { q: 'Hány napon belül állhatsz el indoklás nélkül egy interneten vásárolt terméktől általában?', options: ['3 nap', '8 nap', '14 nap', '30 nap'], answer: 2, explain: 'A távollévők között kötött szerződéseknél 14 nap az elállási határidő, néhány kivétellel.' },
        { q: 'Melyik a Gyermekjogi Egyezmény egyik alapelve?', options: ['A gyermek mindenek felett álló érdeke', 'A gyermek 14 évesen nagykorú', 'A gyermek nem mondhat véleményt', 'A gyermek nem járhat iskolába'], answer: 0, explain: 'Minden, gyermeket érintő döntésnél a gyermek érdekét kell elsődlegesen figyelembe venni.' },
        { q: 'Korlátozható-e a szólásszabadság?', options: ['Soha, semmilyen esetben', 'Igen, bármikor, a kormány döntése szerint', 'Igen, más alapjog védelmében, szükséges és arányos mértékben', 'Csak hétvégén'], answer: 2, explain: 'Az alapjogok korlátozása csak szükséges és arányos lehet, pl. más jó hírnevének védelmében.' }
      ]
    },
    {
      id: 'europai-unio',
      title: 'Az Európai Unió',
      level: 2, minutes: 15,
      summary: 'Az EU története, intézményei, a négy szabadság, Schengen, az euró és Magyarország tagsága.',
      tags: ['Európai Unió', 'EU', 'Európai Parlament', 'Európai Bizottság', 'Európai Tanács', 'Az Európai Unió Tanácsa', 'Európai Unió Bírósága', 'Európai Központi Bank', 'Schengen', 'euró', 'egységes piac', 'négy szabadság', 'uniós polgárság', '2004', 'Erasmus'],
      sections: [
        {
          title: 'Hogyan jött létre?',
          text: 'A második világháború után az európai országok azt akarták, hogy soha többé ne legyen háború közöttük. Az ötlet: ha a gazdaságuk szorosan összefonódik, a háború gyakorlatilag lehetetlenné válik. Az együttműködés a szén- és acéliparral indult, és lépésről lépésre bővült a mai **Európai Unióvá** (EU), amely ma **27 tagállamból** áll.',
          widget: { type: 'idovonal', options: { title: 'Az európai egység útja', events: [
            { year: 1951, label: '1951', title: 'Európai Szén- és Acélközösség', text: 'Hat ország (Franciaország, NSZK, Olaszország, Belgium, Hollandia, Luxemburg) közös felügyelet alá vonja a szén- és acéltermelést.' },
            { year: 1957, label: '1957', title: 'Római szerződések', text: 'Létrejön az Európai Gazdasági Közösség (közös piac) és az Euratom.' },
            { year: 1985, label: '1985', title: 'Schengeni egyezmény', text: 'Öt ország megállapodik a belső határellenőrzés fokozatos megszüntetéséről.' },
            { year: 1992, label: '1992', title: 'Maastrichti szerződés', text: 'Létrejön az Európai Unió, bevezetik az uniós polgárságot, és megalapozzák a közös valutát.' },
            { year: 2002, label: '2002', title: 'Euró a pénztárcákban', text: 'Az 1999-ben számlapénzként bevezetett euró bankjegyei és érméi forgalomba kerülnek.' },
            { year: 2004, label: '2004', title: 'Magyarország csatlakozása', text: '2004. május 1-jén Magyarország kilenc másik országgal együtt az EU tagja lesz. Az erről szóló népszavazást 2003-ban tartották.' },
            { year: 2007, label: '2007', title: 'Magyarország a schengeni térségben', text: '2007. december 21-én megszűnik a személyek rendszeres ellenőrzése Magyarország schengeni belső határain.' },
            { year: 2009, label: '2009', title: 'Lisszaboni szerződés', text: 'Hatályba lép a ma is érvényes alapszerződés, amely megreformálja az intézmények működését.' },
            { year: 2020, label: '2020', title: 'Brexit', text: 'Az Egyesült Királyság elsőként kilép az unióból, így 27 tagállam marad.' }
          ] } }
        },
        {
          title: 'Az EU intézményei',
          text: '- **Európai Parlament**: az uniós polgárok **közvetlenül választják**, 5 évente. Az Európai Unió Tanácsával együtt fogadja el az uniós jogszabályokat és a költségvetést. Magyarország **21 képviselőt** választ. Székhelye Strasbourg, de Brüsszelben is ülésezik.\n- **Az Európai Unió Tanácsa** (Miniszterek Tanácsa): a tagállamok szakminiszterei. A Parlamenttel együtt **jogszabályt alkot**. Elnökségét a tagállamok félévente váltva látják el (soros elnökség), Magyarország 2011-ben és 2024-ben töltötte be.\n- **Európai Tanács**: a tagállamok **állam- vagy kormányfői**. Kijelöli a fő politikai irányokat, de jogszabályt nem alkot.\n- **Európai Bizottság**: tagállamonként egy biztos. **Jogszabályt javasol**, végrehajtja a döntéseket, kezeli a költségvetést, és ellenőrzi a szerződések betartását („a szerződések őre”). Székhelye Brüsszel.\n- **Az Európai Unió Bírósága** (Luxembourg): biztosítja, hogy az uniós jogot minden tagállamban egységesen alkalmazzák.\n- **Európai Központi Bank** (Frankfurt): az euró árfolyamáért és az euróövezet árstabilitásáért felel.',
          tip: 'Ne keverd össze! Az **Európai Tanács** (csúcsvezetők) és az **Európai Unió Tanácsa** (miniszterek) uniós intézmény, az **Európa Tanács** viszont egy különálló, 1949-ben alapított nemzetközi szervezet Strasbourgban, amelyhez az Emberi Jogok Európai Bírósága tartozik.'
        },
        {
          title: 'Egységes piac, Schengen, euró',
          text: 'Az **egységes piac** alapja a **négy szabadság**: az **áruk**, a **szolgáltatások**, a **tőke** és a **személyek** szabad mozgása. Ezért vámmentesen lehet árut szállítani a tagállamok között, és egy magyar állampolgár bármelyik tagállamban tanulhat, dolgozhat, élhet.\n\nA **schengeni térségben** a belső határokon nincs rendszeres útlevél-ellenőrzés. Magyarország **2007** óta tagja. Nem minden EU-tag schengeni (pl. Írország, Ciprus), és vannak nem EU-s tagjai is (pl. Norvégia, Svájc). Személyazonosító igazolványt utazáskor ott is vinni kell.\n\nAz **euró** az euróövezet közös pénze. Az uniós tagállamok többsége bevezette. **Magyarország még nem** vezette be: a hivatalos pénznem továbbra is a **forint**. A bevezetéshez gazdasági feltételeket (pl. alacsony infláció, fenntartható költségvetési hiány és államadósság) kell teljesíteni.'
        },
        {
          title: 'Mit jelent neked az uniós polgárság?',
          text: 'Magyar állampolgárként egyben **uniós polgár** is vagy. Ez a gyakorlatban:\n\n- szabadon utazhatsz, tanulhatsz, dolgozhatsz bármelyik tagállamban\n- az **Erasmus+** programmal külföldön tanulhatsz vagy gyakorlatot végezhetsz\n- a **barangolás** (roaming) díja nélkül telefonálhatsz és netezhetsz az EU-ban, a hazai díjcsomagod szerint\n- az **Európai Egészségbiztosítási Kártyával** a szükséges orvosi ellátást a helyi biztosítottakkal azonos feltételekkel kaphatod meg\n- ha az EU-n kívül nincs magyar képviselet, **bármelyik tagállam** követségétől kérhetsz segítséget\n- a lakóhelyed szerinti tagállamban szavazhatsz a helyi és az európai parlamenti választáson\n\nAz EU emellett támogatásokat (pl. fejlesztési, mezőgazdasági forrásokat) is nyújt, amelyekhez a tagállamok befizetései adják az alapot.'
        }
      ],
      quiz: [
        { q: 'Mikor lett Magyarország az Európai Unió tagja?', options: ['1990', '1999', '2004', '2007'], answer: 2, explain: '2004. május 1-jén, kilenc másik országgal együtt. 2007-ben a schengeni térséghez csatlakoztunk.' },
        { q: 'Melyik uniós intézmény tagjait választják az uniós polgárok közvetlenül?', options: ['Európai Bizottság', 'Európai Parlament', 'Európai Központi Bank', 'Európai Tanács'], answer: 1, explain: 'Az Európai Parlament képviselőit 5 évente közvetlenül választjuk.' },
        { q: 'Melyik NEM tartozik a négy szabadság közé?', options: ['Az áruk szabad mozgása', 'A személyek szabad mozgása', 'A tőke szabad mozgása', 'Az adók egységes mértéke'], answer: 3, explain: 'A négy szabadság: áruk, szolgáltatások, tőke, személyek. Az adók mértékéről nagyrészt a tagállamok döntenek.' }
      ]
    },
    {
      id: 'mediatudatossag',
      title: 'Médiatudatosság',
      level: 1, minutes: 13,
      summary: 'Álhírek és félretájékoztatás felismerése, forráskritika, a közösségi média algoritmusai és a digitális lábnyom.',
      tags: ['média', 'médiatudatosság', 'álhír', 'dezinformáció', 'félretájékoztatás', 'forráskritika', 'tényellenőrzés', 'kattintásvadász', 'deepfake', 'algoritmus', 'buborék', 'digitális lábnyom', 'süti', 'adatvédelem', 'közösségi média'],
      sections: [
        {
          title: 'Álhír, dezinformáció, félretájékoztatás',
          text: 'Nem minden hamis tartalom egyforma:\n\n- **Dezinformáció**: **szándékosan** hamis vagy megtévesztő tartalom, pl. pénzszerzés vagy befolyásolás céljából.\n- **Félretájékoztatás** (misinformáció): hamis tartalom, amit valaki **jóhiszeműen**, tévedésből terjeszt tovább.\n- **Álhír**: hírnek álcázott, kitalált vagy torzított tartalom.\n- **Kattintásvadász** (clickbait) cím: túlzó, kíváncsiságra játszó cím, ami mögött sokszor sokkal kevesebb van („Nem fogod elhinni, mi történt…”).\n- **Szatíra**: szándékosan túlzó, humoros tartalom. Nem hazugság, de ha valaki komolyan veszi, félretájékoztatássá válhat.\n\nAz álhírek azért terjednek gyorsan, mert erős **érzelmeket** (félelem, harag, felháborodás) keltenek, és ilyenkor kevésbé gondolkodunk el, mielőtt megosztjuk őket.',
          tip: 'Ha egy hír nagyon feldühít vagy megijeszt, az jó jel arra, hogy **állj meg egy percre**, mielőtt továbbküldöd.'
        },
        {
          title: 'Forráskritika: kérdezz rá!',
          text: 'Mielőtt elhiszel vagy megosztasz valamit, tedd fel ezeket a kérdéseket:\n\n1. **Ki írta?** Van-e szerzője, elérhetősége, impresszuma az oldalnak? Ismert, ellenőrizhető szerkesztőség áll mögötte?\n2. **Mikor készült?** Egy régi hírt gyakran újként terjesztenek.\n3. **Mire hivatkozik?** Megnevezi a forrásait (kutatás, hivatalos adat, szakértő), és azok valóban ezt mondják?\n4. **Más is ír róla?** Ha egy nagy horderejű hírt csak egyetlen ismeretlen oldal közöl, gyanakodj.\n5. **Mi a célja?** Tájékoztatni, szórakoztatni, eladni valamit vagy meggyőzni?\n6. **Tény vagy vélemény?** A tény ellenőrizhető, a vélemény valakinek az értékelése. Mindkettő legitim, de nem mindegy, melyiket olvasod.\n\nEllenőrzéshez használhatsz **tényellenőrző** oldalakat, és a képeknél **fordított képkeresést** (megmutatja, hol és mikor jelent meg korábban ugyanaz a kép).',
          warn: 'A mesterséges intelligenciával ma már nagyon valósághű hamis képek, hangok és videók (**deepfake**) készíthetők. Egy kép vagy videó önmagában már nem bizonyíték: nézd meg, megbízható forrás is közli-e.'
        },
        {
          title: 'Algoritmusok és buborékok',
          text: 'A közösségi oldalak és a videómegosztók **algoritmusai** azt mutatják meg neked, amire valószínűleg rákattintasz, mert minél több időt töltesz ott, annál több reklámot látsz. Ennek következménye a **szűrőbuborék**: egyre inkább a saját nézeteidet megerősítő tartalmakat látod, és úgy tűnhet, „mindenki így gondolja”.\n\nMit tehetsz?\n\n- Olvass **többféle** forrásból, eltérő nézőpontokat is.\n- Tudd, hogy a **hírfolyamod nem a valóság teljes képe**.\n- Figyeld a **szponzorált** és a **hirdetés** jelölést: a fizetett tartalmat a szabályok szerint jelölni kell, az influenszereknél is.'
        },
        {
          title: 'A digitális lábnyom',
          text: 'Minden, amit online csinálsz, nyomot hagy. Ez a **digitális lábnyom**:\n\n- **Aktív lábnyom**: amit te teszel közzé tudatosan: posztok, kommentek, fotók, kedvelések.\n- **Passzív lábnyom**: amit rólad gyűjtenek, sokszor észrevétlenül: böngészési előzmények, helyadatok, **sütik** (cookie-k), alkalmazások használati adatai.\n\nAmit egyszer közzétettél, azt mások lementhetik, továbbküldhetik: **az internet nem felejt**. Egy évekkel korábbi meggondolatlan poszt egy továbbtanulásnál vagy állásinterjúnál is előkerülhet.\n\nTippek:\n\n- Állítsd be a közösségi profiljaid **adatvédelmi beállításait** (ki látja a posztjaidat).\n- Ne tedd közzé a lakcímed, a telefonszámod, és azt, hogy mikor nem vagy otthon.\n- Az alkalmazásoknak csak a szükséges **engedélyeket** add meg (pl. egy zseblámpa-alkalmazásnak nem kell a névjegyzéked).\n- Időnként keress rá a saját nevedre, és nézd meg, mit találsz.',
          tip: 'Mielőtt posztolsz, kérdezd meg magadtól: „Rendben lenne, ha ezt a nagymamám, a tanárom és egy leendő munkáltatóm is látná?”'
        },
        {
          title: 'Párosítás',
          text: 'Párosítsd a fogalmat a jelentésével!',
          widget: { type: 'parositas', options: { title: 'Médiafogalmak', pairs: [
            ['Dezinformáció', 'Szándékosan megtévesztő tartalom'],
            ['Félretájékoztatás', 'Tévedésből továbbadott hamis tartalom'],
            ['Kattintásvadász cím', 'Túlzó, kíváncsiságra játszó cím'],
            ['Deepfake', 'MI-vel készített, valósághű hamis videó vagy hang'],
            ['Szűrőbuborék', 'Főleg a saját nézeteidet megerősítő tartalmakat látod'],
            ['Passzív digitális lábnyom', 'Észrevétlenül gyűjtött adatok rólad'],
            ['Fordított képkeresés', 'Megmutatja, hol jelent meg korábban egy kép']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi a különbség a dezinformáció és a félretájékoztatás között?', options: ['Nincs különbség', 'A dezinformáció szándékos, a félretájékoztatás tévedésből terjed', 'A félretájékoztatás mindig igaz', 'A dezinformáció csak nyomtatott újságban fordul elő'], answer: 1, explain: 'A szándék a különbség: aki jóhiszeműen oszt meg egy hamis hírt, félretájékoztatást terjeszt.' },
        { q: 'Mi tartozik a passzív digitális lábnyomhoz?', options: ['A saját posztod', 'Egy általad írt komment', 'A böngészési adataid, amelyeket sütik gyűjtenek', 'A profilképed'], answer: 2, explain: 'A passzív lábnyomot rólad gyűjtik, gyakran anélkül, hogy észrevennéd.' },
        { q: 'Melyik a legjobb első lépés egy megdöbbentő hír ellenőrzésére?', options: ['Azonnal megosztani, hogy mások is tudjanak róla', 'Megnézni, más, megbízható források is közlik-e', 'Megszámolni a kedveléseket', 'Elolvasni csak a címet'], answer: 1, explain: 'A kedvelések száma nem bizonyítja a hitelességet. Több független, megbízható forrás igen.' }
      ]
    }
  ]
});
