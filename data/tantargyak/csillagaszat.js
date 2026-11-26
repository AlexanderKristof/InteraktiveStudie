/* Tantárgy: Csillagászat és űr
 * Az alapokat (forgás, keringés, évszakok, a bolygók sorrendje) a Természetismeret „A Föld és a Naprendszer”
 * leckéje tanítja, a Newton-törvényeket a Fizika – erre a két leckére hivatkozunk, nem ismételjük meg.
 * Számadatok: NASA Planetary Fact Sheet, NASA/ESA küldetésoldalak, HUNOR (hunor.gov.hu), DarkSky International. Állapot: 2026. november. */
STUDIE.addSubject({
  id: 'csillagaszat',
  stage: 'kozep',
  title: 'Csillagászat és űr',
  icon: '🔭',
  color: '#4b4fc4',
  description: 'A Naprendszer, a csillagok élete, a táguló világegyetem, az égbolt megfigyelése, rakéták, űrszondák, exobolygók és a magyar űrhajósok.',
  intro: 'A csillagászat a legrégebbi természettudomány: az ember mindig is felnézett az égre. Ma már űrszondák járják a Naprendszert, óriás űrtávcsövek fotózzák a legelső galaxisokat, és 2025-ben 45 év után újra magyar űrhajós dolgozott a világűrben. A leckékben **kipróbálható modellek** vannak: forgasd a Naprendszert, lőj ki egy ágyúgolyót a Föld körül, figyeld a Hold fázisait, és nézd meg, milyen csillagok látszanak ma este a magyar égen. Az alapokat (forgás, keringés, évszakok) a [[#/lecke/termeszet/fold-naprendszer|Természetismeret: A Föld és a Naprendszer]] lecke, az erőket a [[#/lecke/fizika/newton|Fizika: Erő és Newton törvényei]] lecke tanítja.',
  lessons: [
    {
      id: 'naprendszer',
      title: 'A Naprendszer',
      level: 1, minutes: 14,
      summary: 'A Nap, a nyolc bolygó, a törpebolygók, kisbolygók és üstökösök – és miért nem fér ki a valódi arányú Naprendszer egy képernyőre.',
      tags: ['Naprendszer', 'bolygó', 'kőzetbolygó', 'óriásbolygó', 'törpebolygó', 'Plútó', 'kisbolygóöv', 'Kuiper-öv', 'üstökös', 'csillagászati egység', 'CSE', 'keringési idő', 'hold'],
      models: ['fold'],
      sections: [
        {
          title: 'Mi tartozik a Naprendszerhez?',
          text: 'A Naprendszer közepén a **Nap** áll: a rendszer teljes tömegének kb. **99,86%-a** benne van. Körülötte kering:\n\n- **8 bolygó**: belül a négy **kőzetbolygó** (Merkúr, Vénusz, Föld, Mars), kívül a négy **óriásbolygó** (Jupiter, Szaturnusz, Uránusz, Neptunusz),\n- **törpebolygók**, például a Plútó és a Ceres,\n- a Mars és a Jupiter között a **kisbolygóöv** (sok millió sziklás test),\n- a Neptunuszon túl a jeges **Kuiper-öv**,\n- **üstökösök**: jégből és porból álló „piszkos hógolyók”, amelyek a Nap közelében csóvát növesztenek,\n- és a bolygók **holdjai**.\n\nA bolygók sorrendjét és a Föld mozgását a [[#/lecke/termeszet/fold-naprendszer|Természetismeret]] leckéje már bemutatta; itt a méretekkel és a távolságokkal foglalkozunk.'
        },
        {
          title: 'Mekkora a Naprendszer?',
          text: 'A Föld–Nap átlagos távolság kb. **149,6 millió km**. Ezt nevezzük **csillagászati egységnek (CSE)**: `1 CSE ≈ 150 millió km`. A fény 1 CSE-t kb. 8 perc 20 másodperc alatt tesz meg.\n\n- Merkúr: 0,39 CSE · Vénusz: 0,72 · Föld: 1 · Mars: 1,52\n- Jupiter: 5,2 · Szaturnusz: 9,5 · Uránusz: 19,2 · Neptunusz: 30,1 CSE\n\nA méretek is óriásiak: a Nap átmérője kb. **109-szerese** a Földének, a Jupiteré kb. 11-szerese. Ha a Napot egy 10 cm-es narancsnak képzeled, a Föld egy 1 mm-es mákszem lenne **10,7 méterre**, a Neptunusz pedig kb. **320 méterre**. Ezért nincs olyan könyv vagy képernyő, amelyen a valódi méretek és a valódi távolságok egyszerre látszanának.',
          tip: 'A keringési idő a Naptól távolodva gyorsan nő: a Merkúr 88 nap alatt kerüli meg a Napot, a Neptunusz kb. 165 év alatt. A Neptunusz 1846-os felfedezése óta csak egyszer, 2011-ben ért vissza ugyanoda.'
        },
        {
          title: 'Kísérletezz: a Naprendszer modellje',
          text: 'A bolygók a **valódi keringési idők arányában** mozognak, a kiinduló helyzet a mai dátumhoz tartozik. Gyorsítsd fel az időt, kapcsolj a valós távolságokra, és kattints egy bolygóra az adataiért!',
          widget: { type: 'naprendszer' }
        },
        {
          title: 'Miért nem bolygó a Plútó?',
          text: 'A Nemzetközi Csillagászati Unió (IAU) **2006-ban** határozta meg, mi a bolygó. Egy égitest akkor bolygó, ha\n\n1. a Nap körül kering,\n2. elég nagy ahhoz, hogy a saját gravitációja **gömb alakúra** húzza,\n3. **„kitakarította”** a pályája környezetét (ott ő a meghatározó test).\n\nA Plútó az első kettőnek megfelel, a harmadiknak nem: a Kuiper-öv sok hasonló égitestje között kering. Ezért **törpebolygó** lett. A New Horizons űrszonda 2015-ben repült el mellette, és szív alakú, nitrogénjeges síkságot fotózott a felszínén.'
        }
      ],
      quiz: [
        { q: 'Mennyi 1 csillagászati egység (CSE)?', options: ['Kb. 150 millió km, a Föld–Nap átlagos távolság', 'Egy fényév', 'Kb. 384 000 km, a Föld–Hold távolság', '1 millió km'], answer: 0, explain: 'A CSE a Föld és a Nap átlagos távolsága: kb. 149,6 millió km.' },
        { q: 'Melyik NEM kőzetbolygó?', options: ['Mars', 'Merkúr', 'Uránusz', 'Vénusz'], answer: 2, explain: 'Az Uránusz a négy óriásbolygó egyike; a kőzetbolygók a Merkúr, Vénusz, Föld és Mars.' },
        { q: 'Miért sorolták át a Plútót törpebolygóvá 2006-ban?', options: ['Mert nem „takarította ki” a pályája környezetét', 'Mert nem gömb alakú', 'Mert nem a Nap körül kering', 'Mert kiderült, hogy üstökös'], answer: 0, explain: 'A Plútó gömb alakú és a Nap körül kering, de a Kuiper-öv sok hasonló égitestje között jár.' },
        { q: 'Hol található a kisbolygóöv?', options: ['A Mars és a Jupiter között', 'A Föld és a Mars között', 'A Neptunuszon túl', 'A Nap és a Merkúr között'], answer: 0, explain: 'A Neptunuszon túli jeges övezet a Kuiper-öv; a sziklás kisbolygóöv a Mars és a Jupiter között van.' }
      ]
    },
    {
      id: 'nap-csillagok',
      title: 'A Nap és a csillagok élete',
      level: 2, minutes: 15,
      summary: 'Hogyan termel energiát a Nap, mitől függ egy csillag színe és élettartama, és mi lesz a csillagokból a végén: fehér törpe, neutroncsillag vagy fekete lyuk.',
      tags: ['Nap', 'csillag', 'magfúzió', 'hidrogén', 'hélium', 'napfolt', 'napkitörés', 'vörös óriás', 'fehér törpe', 'szupernóva', 'neutroncsillag', 'fekete lyuk', 'csillagköd', 'színképosztály'],
      models: ['atom'],
      terms: ['fizika-bsc/kotesi-energia', 'fizika-bsc/tomeg-energia', 'fizika-bsc/feketetest'],
      sections: [
        {
          title: 'A Nap: a legközelebbi csillag',
          text: 'A Nap egy átlagos, középkorú csillag: kb. **4,6 milliárd éves**. Forró, **plazma** állapotú gázgömb, nagyrészt **hidrogénből** (kb. 73%) és **héliumból** (kb. 25%).\n\n- Átmérője kb. **1,39 millió km** (109 földátmérő), tömege kb. **333 000** földtömeg.\n- A felszíne (fotoszféra) kb. **5500 °C** (5772 K), a magja kb. **15 millió °C**.\n- A magban **magfúzió** zajlik: hidrogénatommagok egyesülnek héliummá. Közben egy kevés tömeg energiává alakul (`E = m·c²`): a Nap másodpercenként kb. **4 millió tonnát** „veszít” a tömegéből.\n\nA felszínen **napfoltok** (hűvösebb, sötétebb foltok erős mágneses térrel) és **napkitörések** láthatók. A kitörésekből érkező részecskék okozzák a **sarki fényt** – ez Magyarországról is látszott a 2024-es és 2025-ös erős geomágneses viharok idején.',
          warn: 'Soha ne nézz a Napba szabad szemmel, és főleg ne távcsővel vagy kézi látcsővel! Már egy pillanat is maradandó vakságot okozhat. Csak tanúsított napszűrővel (ISO 12312-2) vagy kivetítéssel szabad megfigyelni.'
        },
        {
          title: 'Milyenek a csillagok?',
          text: 'Éjszaka minden csillag egy pont, de valójában nagyon különbözők.\n\n- **Szín és hőmérséklet**: a forró csillagok **kékesfehérek** (pl. a Rigel, kb. 12 000 K), a hűvösebbek **sárgák** (Nap) vagy **narancsvörösek** (pl. a Betelgeuze, kb. 3500 K). Ugyanaz, mint a vasnál a kovácsműhelyben: előbb vörösen, aztán fehéren izzik.\n- **Fényesség**: a látszó fényesség függ attól, mennyi fényt bocsát ki a csillag, és milyen messze van. A legfényesebb éjszakai csillag a **Szíriusz** (8,6 fényév).\n- **Távolság**: a csillagok távolságát **fényévben** mérjük: ennyi utat tesz meg a fény egy év alatt, kb. **9,46 billió km**. A Naphoz legközelebbi csillag, a Proxima Centauri **4,24 fényévre** van.',
          tip: 'Amikor a Betelgeuzére nézel, kb. 550 évvel ezelőtti fényt látsz: azt a fényt, amely Mátyás király korában indult el.'
        },
        {
          title: 'Egy csillag élete',
          text: 'A csillagok sorsát a **tömegük** dönti el.\n\n1. **Születés**: egy hideg gáz- és porfelhő (csillagköd, pl. az Orion-köd) a saját gravitációja miatt összehúzódik. A közepe felforrósodik, és amikor elég forró, beindul a hidrogén fúziója: megszületett a csillag.\n2. **Fősorozat**: a csillag élete nagy részében hidrogént éget. A Nap kb. 10 milliárd évig marad itt, tehát még kb. **5 milliárd éve** van hátra.\n3. **Öregség**: ha a magban elfogy a hidrogén, a csillag felfúvódik **vörös óriássá**.\n\nA vég a tömegtől függ:\n\n- **Nap-szerű csillag**: ledobja a külső rétegeit (**planetáris köd**), a forró, Föld méretű maradvány a **fehér törpe**.\n- **Nagy tömegű csillag** (kb. 8 naptömeg fölött): **szupernóva**-robbanásban pusztul el. A maradvány **neutroncsillag** (kb. 20 km átmérőjű, elképesztően sűrű golyó) vagy **fekete lyuk**, amelyből még a fény sem tud kiszökni.\n\nA szupernóvák szórják szét a csillagokban keletkezett elemeket. A testedben lévő szén, oxigén és vas is egykori csillagokban jött létre – ezért mondják, hogy **csillagporból vagyunk**.',
          tip: 'Az atommagok szerkezetét az [[atom|atom felfedezőjében]] nézheted meg. A fúzióban a hidrogénből (1 proton) hélium (2 proton, 2 neutron) lesz.'
        }
      ],
      quiz: [
        { q: 'Milyen folyamat termeli a Nap energiáját?', options: ['Hidrogénatommagok egyesülése héliummá (magfúzió)', 'Szén égése oxigénben', 'Urán hasadása', 'Elektromos kisülések'], answer: 0, explain: 'A Nap magjában kb. 15 millió °C-on hidrogén fuzionál héliummá.' },
        { q: 'Melyik csillag a legforróbb a felsoroltak közül a színe alapján?', options: ['Egy kékesfehér csillag', 'Egy narancsvörös csillag', 'Egy sárga csillag', 'Egy vörös csillag'], answer: 0, explain: 'Minél forróbb egy csillag, annál inkább a kék felé tolódik a színe.' },
        { q: 'Mi lesz a Napból élete végén?', options: ['Vörös óriás, majd fehér törpe', 'Fekete lyuk', 'Neutroncsillag', 'Szupernóva, majd semmi'], answer: 0, explain: 'A Nap tömege kicsi a szupernóvához: felfúvódik vörös óriássá, majd fehér törpe marad belőle.' },
        { q: 'Mi a fényév?', options: ['Távolság: amennyit a fény egy év alatt megtesz', 'Időtartam: egy év a csillagokon', 'A csillagok fényességének egysége', 'A Föld egy keringése'], answer: 0, explain: 'A fényév hosszúság, kb. 9,46 billió km.' }
      ]
    },
    {
      id: 'galaxisok',
      title: 'Galaxisok és a táguló világegyetem',
      level: 2, minutes: 14,
      summary: 'A Tejútrendszer, a többi galaxis, a vöröseltolódás, a Hubble–Lemaître-törvény és az ősrobbanás: honnan tudjuk, hogy a világegyetem kb. 13,8 milliárd éves?',
      tags: ['galaxis', 'Tejútrendszer', 'Tejút', 'Androméda-galaxis', 'vöröseltolódás', 'Doppler', 'Hubble', 'Lemaître', 'táguló világegyetem', 'ősrobbanás', 'kozmikus háttérsugárzás', 'sötét anyag', 'sötét energia'],
      terms: ['fizika-bsc/doppler', 'fizika-bsc/em-hullam'],
      sections: [
        {
          title: 'A Tejútrendszer, a mi galaxisunk',
          text: 'A **galaxis** csillagok, gáz, por és sötét anyag hatalmas, gravitáció által összetartott rendszere. A mi galaxisunk a **Tejútrendszer**: egy **küllős spirálgalaxis**, kb. **100 000 fényév** átmérőjű, és nagyjából **100–400 milliárd** csillagot tartalmaz.\n\nA Nap a középponttól kb. **26 000 fényévre**, egy spirálkarban kering, egy kör kb. **230 millió év**. A galaxis közepén egy kb. **4 millió naptömegű fekete lyuk** (`Sagittarius A*`) van; róla 2022-ben készült először kép.\n\nSötét, holdtalan éjszakán az égen átívelő halvány fénysáv, a **Tejút**, a galaxis korongja, amelyet belülről, élével látunk.'
        },
        {
          title: 'Milliárdnyi galaxis',
          text: 'A legközelebbi nagy galaxis az **Androméda-galaxis**, kb. **2,5 millió fényévre**: sötét égen szabad szemmel is látszik egy halvány foltként. Ez a legtávolabbi dolog, amit távcső nélkül láthatsz.\n\nA megfigyelhető világegyetemben **sok százmilliárd** galaxis van. Alakjuk szerint lehetnek **spirálisak**, **elliptikusak** és **szabálytalanok**. A galaxisok csoportokba és halmazokba rendeződnek; a Tejútrendszer és az Androméda a **Lokális Csoport** tagja.'
        },
        {
          title: 'A világegyetem tágul',
          text: 'Ha egy hangforrás távolodik tőled, mélyebbnek hallod a hangját (gondolj az elhaladó mentőautóra) – ez a **Doppler-jelenség**. Ugyanez a fénnyel: a távolodó forrás fénye a **vörös felé tolódik** (**vöröseltolódás**).\n\n**Georges Lemaître** 1927-ben, **Edwin Hubble** 1929-ben mutatta ki, hogy a távoli galaxisok távolodnak tőlünk, és **minél messzebb vannak, annál gyorsabban**: `v = H₀ · d`. Ez a **Hubble–Lemaître-törvény** (az IAU 2018-ban javasolta ezt a nevet). A `H₀` állandó értéke kb. **67–73 km/s megaparszekenként** – a különböző mérési módszerek eltérése („Hubble-feszültség”) ma is nyitott kérdés.\n\nNem a galaxisok száguldanak a térben egy középponttól, hanem **maga a tér tágul**. Képzelj el egy mazsolás kalácsot, amely a sütőben megkel: minden mazsola távolodik minden másiktól, és a távolabbiak gyorsabban.'
        },
        {
          title: 'Az ősrobbanás',
          text: 'Ha a tágulást visszafelé követjük, a világegyetem régen sokkal sűrűbb és forróbb volt. Ez az **ősrobbanás** (Big Bang) elmélete. A mérések szerint a világegyetem kb. **13,8 milliárd éves**.\n\nBizonyítékai:\n\n- a galaxisok távolodása (vöröseltolódás),\n- a **kozmikus mikrohullámú háttérsugárzás**: az ősrobbanás „utófénye”, amely minden irányból érkezik, kb. **2,7 K** hőmérsékletnek felel meg (1965-ben fedezték fel),\n- a könnyű elemek (hidrogén, hélium) mért aránya.\n\nA világegyetemnek csak kb. **5%-a** a mi ismert, „közönséges” anyagunk. Kb. 27% a **sötét anyag** (csak a gravitációján keresztül észleljük), kb. 68% a **sötét energia**, amely a tágulást gyorsítja.',
          tip: 'Az ősrobbanás nem egy pontban, egy már létező térben történt robbanás volt: a tér maga keletkezett és tágul azóta is.'
        }
      ],
      quiz: [
        { q: 'Mit mond ki a Hubble–Lemaître-törvény?', options: ['A galaxisok annál gyorsabban távolodnak, minél messzebb vannak', 'A bolygók ellipszispályán keringenek', 'A csillagok színe a hőmérsékletüktől függ', 'A fény sebessége állandó'], answer: 0, explain: 'v = H₀ · d: a távolodási sebesség arányos a távolsággal.' },
        { q: 'Mi a vöröseltolódás?', options: ['A távolodó fényforrás fénye a hosszabb hullámhosszak felé tolódik', 'A csillagok vörös színe', 'A Mars felszínének színe', 'A naplemente vörös fénye'], answer: 0, explain: 'A távolodás miatt a hullámok „széthúzódnak”, a fény a vörös felé tolódik.' },
        { q: 'Kb. milyen idős a világegyetem?', options: ['13,8 milliárd év', '4,6 milliárd év', '6000 év', '100 milliárd év'], answer: 0, explain: 'A 4,6 milliárd év a Nap és a Föld kora; a világegyetem kb. 13,8 milliárd éves.' },
        { q: 'Mi a legtávolabbi égitest, amelyet szabad szemmel láthatunk?', options: ['Az Androméda-galaxis', 'A Plútó', 'A Proxima Centauri', 'A Neptunusz'], answer: 0, explain: 'A kb. 2,5 millió fényévre lévő Androméda-galaxis sötét égen halvány foltként látszik.' }
      ]
    },
    {
      id: 'hold',
      title: 'A Hold: fázisok és fogyatkozások',
      level: 1, minutes: 13,
      summary: 'Miért változik a Hold alakja, miért mindig ugyanazt az oldalát látjuk, és mikor lehet nap- vagy holdfogyatkozás.',
      tags: ['Hold', 'holdfázis', 'újhold', 'telihold', 'első negyed', 'utolsó negyed', 'kötött tengelyforgás', 'árapály', 'napfogyatkozás', 'holdfogyatkozás', 'kráter', 'Apollo'],
      sections: [
        {
          title: 'A Hold adatai',
          text: 'A **Hold** a Föld egyetlen természetes kísérője.\n\n- Átlagos távolsága kb. **384 400 km** (kb. 30 földátmérő); a fény 1,3 másodperc alatt ér ide.\n- Átmérője kb. **3475 km**, nagyjából a Föld negyede. A felszínén a gravitáció a földinek csak kb. **egyhatoda**.\n- Nincs számottevő légköre, ezért a becsapódások **kráterei** évmilliárdokig megmaradnak.\n- A legelfogadottabb elmélet szerint kb. 4,5 milliárd éve egy Mars méretű égitest ütközött a fiatal Földdel, és a kirepült anyagból állt össze a Hold.\n\nAz alapokat (újhold, telihold, negyedek) a [[#/lecke/termeszet/fold-naprendszer|Természetismeret]] lecke már bemutatta – itt megnézzük, **miért** pont így látjuk.'
        },
        {
          title: 'Miért változik a Hold alakja?',
          text: 'A Holdnak **mindig a fele** van megvilágítva: az a fele, amelyik a Nap felé néz. Ahogy a Hold körbejár a Föld körül, mi ennek a megvilágított félnek hol nagyobb, hol kisebb részét látjuk.\n\n- **Újhold**: a Hold a Nap irányában van, a megvilágított fele elfordul tőlünk.\n- **Telihold**: a Hold a Nappal szemben van, a teljes megvilágított felét látjuk. Napnyugtakor kel, egész éjjel fent van.\n- **Első negyed** (növő félhold): este a déli-nyugati égen. **Utolsó negyed** (fogyó félhold): hajnalban látszik.\n\nA fázisok ciklusa (**szinodikus hónap**) kb. **29,5 nap**. A Hold a csillagokhoz képest már **27,3 nap** alatt megkerüli a Földet, de közben a Föld is továbbhalad a Nap körül, ezért kell még kb. két nap, hogy a Nap–Föld–Hold elrendezés megismétlődjön.',
          widget: { type: 'holdfazis' },
          tip: 'Az északi féltekén egy régi trükk: ha a Hold íve egy kurzív **„d”** betű hasát formázza (jobb oldala világos), **d**agad, ha egy **„C”** betűt, **c**sökken.'
        },
        {
          title: 'Miért mindig ugyanazt az oldalát látjuk?',
          text: 'A Hold pontosan annyi idő alatt fordul meg a tengelye körül, mint amennyi alatt megkerüli a Földet (**kötött tengelyforgás**). A Föld árapály-ereje évmilliárdok alatt „fékezte le” így. A túloldalt először a szovjet **Luna–3** szonda fényképezte le 1959-ben.\n\nFordítva is hat: a Hold vonzása okozza a tengerek **árapályát**, és lassan fékezi a Föld forgását. Ezért a Hold évente kb. **3,8 cm-rel távolodik** tőlünk.'
        },
        {
          title: 'Nap- és holdfogyatkozás',
          text: '- **Napfogyatkozás**: a Hold a Nap és a Föld közé kerül, és az árnyéka a Földre esik. Csak **újholdkor** lehet. A Hold és a Nap az égen majdnem pontosan ugyanakkorának látszik (a Nap kb. 400-szor nagyobb, de kb. 400-szor messzebb van), ezért teljes napfogyatkozáskor a Hold épp eltakarja a Napot, és előbukkan a Nap halvány **koronája**.\n- **Holdfogyatkozás**: a Föld kerül a Nap és a Hold közé, a Hold a Föld árnyékába ér. Csak **teleholdkor** lehet. A Hold ilyenkor vöröses („vérhold”), mert a Föld légköre a vörös fényt behajlítja az árnyékba.\n\nMiért nincs minden hónapban fogyatkozás? Mert a Hold pályája kb. **5°-kal** hajlik a Föld pályasíkjához, így a Hold legtöbbször a Nap–Föld vonal fölött vagy alatt halad el.\n\nMagyarországon utoljára **1999. augusztus 11-én** volt teljes napfogyatkozás. A **2026. augusztus 12-i** teljes napfogyatkozás Grönland, Izland és Spanyolország felett volt teljes; nálunk részlegesként, napnyugta közelében látszott.',
          warn: 'Részleges napfogyatkozáskor is csak tanúsított napszemüveggel nézz a Napba! A közönséges napszemüveg, a kormozott üveg vagy a röntgenfilm NEM véd.'
        }
      ],
      quiz: [
        { q: 'Milyen fázisban lehet napfogyatkozás?', options: ['Újholdkor', 'Teleholdkor', 'Első negyedkor', 'Utolsó negyedkor'], answer: 0, explain: 'A Hold ilyenkor a Nap és a Föld között van.' },
        { q: 'Miért látjuk mindig a Hold ugyanazon oldalát?', options: ['Mert ugyanannyi idő alatt fordul meg a tengelye körül, mint amennyi alatt megkerüli a Földet', 'Mert egyáltalán nem forog', 'Mert a túloldala mindig sötét', 'Mert a Föld eltakarja a túloldalt'], answer: 0, explain: 'Ez a kötött tengelyforgás, amelyet a Föld árapály-ereje alakított ki.' },
        { q: 'Mennyi idő alatt ismétlődnek a holdfázisok?', options: ['Kb. 29,5 nap', 'Kb. 27,3 nap', 'Pontosan 30 nap', 'Kb. 7 nap'], answer: 0, explain: 'A szinodikus hónap kb. 29,5 nap. A 27,3 nap a csillagokhoz viszonyított keringés.' },
        { q: 'Miért vöröses a Hold teljes holdfogyatkozáskor?', options: ['Mert a Föld légköre a vörös fényt az árnyékba hajlítja', 'Mert a Hold felszíne vörös', 'Mert a Hold felforrósodik', 'Mert a Mars fénye világítja meg'], answer: 0, explain: 'A Földről nézve ilyenkor a Föld körül „napkelte és napnyugta gyűrű” világít: ennek vörös fénye jut a Holdra.' }
      ]
    },
    {
      id: 'egbolt',
      title: 'Az égbolt megfigyelése',
      level: 1, minutes: 15,
      summary: 'Csillagképek és tájékozódás az égen, hogyan találjuk meg a bolygókat, milyen távcső jó kezdésnek, és miért fontosak a magyar csillagoségbolt-parkok.',
      tags: ['csillagkép', 'Göncölszekér', 'Sarkcsillag', 'nyári háromszög', 'Orion', 'bolygók megfigyelése', 'ekliptika', 'távcső', 'lencsés távcső', 'tükrös távcső', 'binokulár', 'fényszennyezés', 'csillagoségbolt-park', 'Zselic', 'Hortobágy', 'Bükk'],
      sections: [
        {
          title: 'Csillagképek és tájékozódás',
          text: 'A csillagászok az eget **88 csillagképre** osztják (pontos határokkal, mint az országokat a térkép). A csillagok mozgását a Föld forgása okozza: az égbolt kb. 24 óra alatt körbefordul a **Sarkcsillag** körül.\n\n- **Göncölszekér**: a Nagy Medve csillagkép hét fényes csillaga. A „szekér” hátsó két csillagát összekötő vonalat kb. ötször meghosszabbítva a **Sarkcsillaghoz** jutsz, amely mindig **északon** van. Magyarországon kb. **47° magasan** áll (ez épp a földrajzi szélességünk).\n- **Kassziopeia**: „W” alakú, a Sarkcsillag túloldalán.\n- **Nyári háromszög**: a **Vega** (Lant), a **Deneb** (Hattyú) és az **Altair** (Sas) nyári estéken magasan látszik.\n- **Orion**: télen az egyik legszebb csillagkép, a három övcsillaggal, a vöröses **Betelgeuzével** és a kékes **Rigellel**. Az öv vonalát lefelé meghosszabbítva a **Szíriuszhoz** jutsz.\n\nA Sarkcsillag körüli csillagképek Magyarországról **sosem nyugszanak le** (cirkumpolárisak), a többi évszakonként változik.'
        },
        {
          title: 'Égbolttérkép a magyar égre',
          text: 'Válassz dátumot és órát: a térkép megmutatja, mely fényes csillagok és csillagképek vannak a horizont fölött Magyarországról nézve (Budapest környéke), és hol járnak a szabad szemmel látható bolygók és a Hold. A térképet **a fejed fölé tartva** kell nézni, ezért van a **kelet bal oldalon**.',
          widget: { type: 'egbolt' }
        },
        {
          title: 'Hogyan találod meg a bolygókat?',
          text: 'A bolygók a csillagok között „vándorolnak” (a „planéta” szó görögül vándort jelent). Mindig az **ekliptika** közelében, az **állatövi csillagképekben** (Kos, Bika, Ikrek, Rák, Oroszlán, Szűz, Mérleg, Skorpió, Nyilas, Bak, Vízöntő, Halak) járnak, nagyjából ott, ahol a Nap és a Hold is.\n\nÍgy ismered fel őket:\n\n- **nem pislákolnak** (a csillagok pontszerűek, a légkör remegése „villogtatja” őket; a bolygó kis korong),\n- a **Vénusz** a legfényesebb „csillag”: alkonyatkor nyugaton (Esthajnalcsillag) vagy hajnalban keleten,\n- a **Jupiter** fehér és nagyon fényes, kézi látcsővel a négy nagy holdja is látszik,\n- a **Mars** vöröses-narancs, a **Szaturnusz** sárgás, gyűrűit már egy kis távcső is mutatja.\n\nHogy épp hol járnak, azt csillagászati évkönyvek, mobilalkalmazások vagy a fenti égbolttérkép mutatja meg.'
        },
        {
          title: 'Távcső: mivel kezdjem?',
          text: '- A legjobb első műszer gyakran egy **kézi látcső (binokulár)**, pl. 10×50-es: 10-szeres nagyítás, 50 mm-es lencsék. Látszanak vele a Hold kráterei, a Jupiter holdjai, a Fiastyúk és az Androméda-galaxis.\n- A **lencsés távcső (refraktor)** lencsével gyűjti a fényt: kis karbantartást igényel, jó a Holdra és a bolygókra.\n- A **tükrös távcső (reflektor)** homorú tükörrel gyűjt: ugyanannyi pénzért nagyobb átmérő, több fény, halványabb ködök és galaxisok.\n\nA távcső legfontosabb adata **nem a nagyítás, hanem az átmérő (apertúra)**: minél nagyobb, annál több fényt gyűjt, és annál finomabb részleteket mutat. A fénytörés és a lencsék alapjai a [[#/lecke/fizika/hullamok-feny|Fizika: Hullámok, hang és fény]] leckében vannak.',
          tip: 'Sötétben a szemednek kb. 20–30 perc kell, hogy teljesen alkalmazkodjon. Közben ne nézz telefont, vagy használj vörös fényű lámpát, mert a fehér fény újraindítja az alkalmazkodást.'
        },
        {
          title: 'Fényszennyezés és csillagoségbolt-parkok',
          text: 'A városi világítás felfelé szórt fénye bevilágítja az eget: egy nagyvárosból csak néhány tucat csillag látszik, sötét vidéken több ezer. Ez a **fényszennyezés**. Nemcsak a csillagászokat zavarja: összezavarja a rovarokat, a vonuló madarakat, és az emberi alvás-ébrenlét ritmust is.\n\nMagyarország Európában úttörő a sötét égbolt védelmében. A DarkSky International (korábban IDA) által elismert **csillagoségbolt-parkjaink**:\n\n- **Zselici Csillagoségbolt-park** (Somogy) – **2009**, az első Magyarországon,\n- **Hortobágyi Csillagoségbolt-park** – **2011**,\n- **Bükki Csillagoségbolt-park** – **2017**.\n\nItt jó időben szabad szemmel is jól látszik a Tejút. Otthon is tehetsz a fényszennyezés ellen: a kültéri lámpa **lefelé világítson**, legyen **meleg színű**, és csak akkor égjen, amikor kell.'
        }
      ],
      quiz: [
        { q: 'Hogyan találod meg a Sarkcsillagot?', options: ['A Göncölszekér hátsó két csillagát összekötő vonalat kb. ötször meghosszabbítva', 'Mindig a zenitben, pontosan a fejünk felett van', 'Az Orion övének meghosszabbításában', 'A legfényesebb csillag az égen'], answer: 0, explain: 'A Sarkcsillag Magyarországról kb. 47° magasan, északon látszik, és nem a legfényesebb csillag.' },
        { q: 'Miről ismerhető fel egy bolygó szabad szemmel?', options: ['Nem pislákol, és az állatövi csillagképekben jár', 'Mindig vörös', 'Gyorsan átsuhan az égen', 'Csak nappal látszik'], answer: 0, explain: 'A bolygó kis korong, ezért nyugodtabb a fénye, és mindig az ekliptika közelében található.' },
        { q: 'Melyik a távcső legfontosabb jellemzője?', options: ['Az átmérője (fénygyűjtő felülete)', 'A legnagyobb nagyítása', 'A színe', 'A hossza'], answer: 0, explain: 'A nagyobb átmérő több fényt gyűjt és finomabb részleteket mutat; a túl nagy nagyítás csak elmosódott képet ad.' },
        { q: 'Melyik volt az első magyar csillagoségbolt-park (2009)?', options: ['Zselic', 'Hortobágy', 'Bükk', 'Balaton-felvidék'], answer: 0, explain: 'A Zselic 2009-ben, a Hortobágy 2011-ben, a Bükk 2017-ben kapta meg a nemzetközi elismerést.' }
      ]
    },
    {
      id: 'gravitacio-palyak',
      title: 'Gravitáció és pályák',
      level: 2, minutes: 16,
      summary: 'Newton ágyúgolyója, körpálya és ellipszis, Kepler három törvénye, első és második kozmikus sebesség – és miért lebegnek az űrhajósok.',
      tags: ['gravitáció', 'tömegvonzás', 'Newton', 'Kepler-törvények', 'ellipszis', 'pálya', 'körpálya', 'első kozmikus sebesség', 'szökési sebesség', 'súlytalanság', 'geostacionárius pálya', 'műhold', 'ISS'],
      terms: ['fizika-bsc/gravitacio', 'fizika-bsc/impulzusmomentum', 'fizika-bsc/konzervativ-ero'],
      sections: [
        {
          title: 'A tömegvonzás',
          text: 'Minden test vonzza a többit. Newton gravitációs törvénye szerint a vonzóerő **annál nagyobb, minél nagyobbak a tömegek**, és **a távolság négyzetével csökken**: kétszer akkora távolságban negyedakkora.\n\n`F = γ · m₁ · m₂ / r²`\n\nUgyanaz az erő ejti le az almát, és tartja pályán a Holdat. A Föld felszínén ebből jön a `g ≈ 9,81 m/s²` nehézségi gyorsulás; a Holdon kb. 1,62 m/s². Az erő és a gyorsulás kapcsolatát (Newton II. törvénye) a [[#/lecke/fizika/newton|Fizika]] leckéje magyarázza.'
        },
        {
          title: 'Newton ágyúgolyója',
          text: 'Képzelj el egy nagyon magas hegyet, a tetején egy ágyúval, amely vízszintesen lő. Lassú golyó hamar leesik. Gyorsabb golyó messzebb ér földet. És ha a golyó olyan gyors, hogy miközben leesik, a Föld felszíne is ugyanannyit „görbül el” alatta, akkor **sosem ér földet**: **körpályán** kering.\n\nA műholdak tehát **folyamatosan esnek** a Föld felé, csak közben olyan gyorsan haladnak oldalra, hogy mindig elvétik.\n\n- **Első kozmikus sebesség** (körpálya a felszín közelében, légellenállás nélkül): kb. **7,9 km/s**. 400 km magasan kb. 7,7 km/s.\n- Ennél gyorsabban: **ellipszispálya**.\n- **Szökési (második kozmikus) sebesség**: kb. **11,2 km/s** a Föld felszínén. Ennél gyorsabb test végleg elhagyja a Földet.\n\nPróbáld ki: állítsd a sebességet, és figyeld, mi lesz a golyóval!',
          widget: { type: 'palyaszim' }
        },
        {
          title: 'Kepler három törvénye',
          text: '**Johannes Kepler** Tycho Brahe pontos bolygómegfigyeléseiből (1609-ben és 1619-ben) három szabályt vezetett le:\n\n1. A bolygók **ellipszispályán** keringenek, amelynek egyik **fókuszpontjában** a Nap áll.\n2. A Napot és a bolygót összekötő szakasz **egyenlő idők alatt egyenlő területeket** súrol. Ezért a bolygó napközelben gyorsabb, naptávolban lassabb. (A Föld januárban van napközelben.)\n3. A keringési idő négyzete arányos a pályasugár (fél nagytengely) köbével: `T² ~ a³`. Ha a-t csillagászati egységben, T-t években mérjük: `T² = a³`. Például a Jupiter: `a = 5,2` → `T = √(5,2³) ≈ 11,9 év`.\n\nNewton később megmutatta, hogy mindhárom a gravitációs törvényből következik.',
          tip: 'A legtöbb bolygó pályája nagyon közel van a körhöz: a Föld pályáján a legkisebb és a legnagyobb Nap-távolság csak kb. 3%-kal tér el.'
        },
        {
          title: 'Súlytalanság és nevezetes pályák',
          text: 'A Nemzetközi Űrállomás (ISS) kb. **400–420 km** magasan, kb. **92–93 perc** alatt kerüli meg a Földet. Ott a gravitáció még kb. **90%-a** a földfelszíninek! Az űrhajósok azért lebegnek, mert az állomással együtt **szabadon esnek**: minden ugyanúgy gyorsul, semmi sem nyomja a padlót. Ez a **súlytalanság**.\n\n- **Alacsony Föld körüli pálya** (LEO, kb. 160–2000 km): űrállomás, Starlink-műholdak, földmegfigyelés.\n- **Geostacionárius pálya**: kb. **35 786 km**-rel az Egyenlítő fölött. Itt a keringési idő pontosan egy (csillag)nap, ezért a műhold az égen egy helyben áll: ide kerülnek a tévéműholdak, ezért fordulnak a parabolaantennák mindig ugyanarra.\n- A **GPS/Galileo** navigációs műholdak kb. 20 000–23 000 km magasan keringenek.'
        }
      ],
      quiz: [
        { q: 'Hányszorosára csökken a gravitációs erő, ha a távolság kétszeresére nő?', options: ['Negyedére', 'Felére', 'Nyolcadára', 'Nem változik'], answer: 0, explain: 'Az erő a távolság négyzetével fordítottan arányos: 2² = 4.' },
        { q: 'Mekkora a szökési sebesség a Föld felszínén?', options: ['Kb. 11,2 km/s', 'Kb. 7,9 km/s', 'Kb. 340 m/s', 'Kb. 300 000 km/s'], answer: 0, explain: 'A 7,9 km/s a körpálya sebessége; a végleges távozáshoz kb. 11,2 km/s kell.' },
        { q: 'Miért lebegnek az űrhajósok az ISS-en?', options: ['Mert az állomással együtt szabadon esnek a Föld körül', 'Mert ott nincs gravitáció', 'Mert az űrállomás mágnesesen taszítja őket', 'Mert nincs levegő'], answer: 0, explain: 'A gravitáció ott még kb. 90%-os, de minden együtt esik, ezért nincs súlyérzet.' },
        { q: 'Mit mond Kepler II. törvénye?', options: ['A bolygó napközelben gyorsabban, naptávolban lassabban mozog', 'A bolygók körpályán keringenek', 'Minden bolygó ugyanannyi idő alatt kerüli meg a Napot', 'A Nap a pálya középpontjában van'], answer: 0, explain: 'A vezérsugár egyenlő idők alatt egyenlő területet súrol, ezért közelebb gyorsabb a bolygó.' }
      ]
    },
    {
      id: 'raketak',
      title: 'Rakéták és űrrepülés',
      level: 2, minutes: 15,
      summary: 'Hogyan működik a rakéta, miért van több lépcsője, mi a hajtóanyag, és hogyan száll le függőlegesen egy visszatérő első lépcső.',
      tags: ['rakéta', 'rakétahajtómű', 'hatás-ellenhatás', 'tolóerő', 'lépcső', 'többlépcsős rakéta', 'hajtóanyag', 'kerozin', 'folyékony oxigén', 'hidrogén', 'újrafelhasználható', 'Szputnyik', 'Gagarin', 'Apollo', 'Artemis'],
      models: ['raketa', 'repulogep', 'hajtomu'],
      terms: ['fizika-bsc/impulzus'],
      sections: [
        {
          title: 'Hogyan működik a rakéta?',
          text: 'A rakéta **Newton III. törvényével** (hatás-ellenhatás) halad: nagy sebességgel **hátrafelé löki ki a gázt**, és a gáz **előre löki a rakétát**. Ehhez nem kell levegő, amibe „belekapaszkodna” – ezért működik a világűrben is. Fújj fel egy léggömböt, és engedd el: ugyanez történik.\n\nA rakétahajtómű égésterében a **tüzelőanyag** és az **oxidálószer** elég, a forró gáz a **fúvókában** felgyorsul (akár 3–4,5 km/s-ra), és kiáramlik. A sugárhajtású repülőgép a levegő oxigénjét használja ([[hajtomu|sugárhajtómű felfedező]]), a rakéta viszont **magával viszi az oxidálószert** is, mert a világűrben nincs levegő.\n\nGyakori hajtóanyag-párok:\n\n- **kerozin + folyékony oxigén** (pl. Falcon 9, Szojuz),\n- **folyékony hidrogén + folyékony oxigén** (pl. SLS, Ariane 5): a leghatékonyabb, de a hidrogén −253 °C-on cseppfolyós és nagyon könnyű, óriási tartály kell neki,\n- **metán + folyékony oxigén** (pl. Starship): tisztábban ég, könnyebb újrahasználni,\n- **szilárd hajtóanyag** (gyorsítórakéták): egyszerű, de begyújtás után nem lehet leállítani.'
        },
        {
          title: 'Miért több lépcső?',
          text: 'Egy rakéta induló tömegének kb. **90%-a hajtóanyag**. Ahogy fogy, az üres tartályt is cipelni kellene – ez pazarlás. Ezért a rakéta **lépcsőkből** áll: amikor az első lépcső kiürül, **leválik**, és a könnyebb második lépcső gyorsít tovább.\n\nA Föld körüli pályához kb. **7,8 km/s** sebesség kell, de a légellenállás és a gravitáció leküzdése miatt összesen kb. **9–10 km/s** „sebességváltozásra” van szükség. Egyetlen lépcsővel ez szinte lehetetlen, kettővel vagy hárommal már megy.\n\nNézd meg a [[raketa|többlépcsős hordozórakéta felfedezőjében]], mi van egy mai rakéta belsejében!'
        },
        {
          title: 'Visszatérő első lépcső',
          text: 'Régen minden rakéta egyszer használatos volt: a lépcsők a tengerbe zuhantak. **2015. december 21-én** a SpaceX Falcon 9 első lépcsője először szállt le függőlegesen egy orbitális indítás után. Azóta ez rutin; egyes első lépcsők már **több mint 30-szor** repültek.\n\nA leszállás lépései: a lépcső leválás után megfordul, a **hajtóművek** néhányszor újragyújtanak (visszafordító, visszatérő és leszálló égetés), a **rácsos kormányfelületek** irányítják a légkörben, végül kinyílnak a **leszállólábak**. A Starship óriási első lépcsőjét (Super Heavy) 2024. október 13-án maga az indítótorony kapta el a „karjaival”.'
        },
        {
          title: 'Az űrrepülés mérföldkövei',
          text: '- **1957. október 4.**: Szputnyik–1, az első műhold.\n- **1961. április 12.**: **Jurij Gagarin** az első ember a világűrben (Vosztok–1, 108 perc).\n- **1963**: Valentyina Tyereskova az első nő a világűrben.\n- **1969. július 20.**: az Apollo–11 holdkompja leszáll; Neil Armstrong és Buzz Aldrin az első emberek a Holdon. A Saturn V rakéta kb. 110 m magas volt.\n- **1980. május 26.**: **Farkas Bertalan** az első magyar a világűrben.\n- **1998**: elkezdik építeni a Nemzetközi Űrállomást, amelyen 2000 óta folyamatosan laknak.\n- **2025. június 25.**: **Kapu Tibor** a második magyar űrhajós (Ax-4).\n- **2026. április 1–10.**: az **Artemis II** négy űrhajósa megkerüli a Holdat – 1972 óta először jutnak emberek a Hold közelébe, és kb. **406 800 km**-rel új távolsági rekordot állítanak fel.'
        }
      ],
      quiz: [
        { q: 'Miért tud a rakéta a légüres térben is gyorsítani?', options: ['Mert hátrafelé kilöki a gázt, és a gáz előre löki a rakétát', 'Mert a levegőbe kapaszkodik', 'Mert a Nap vonzza', 'Nem tud, a világűrben csak sodródik'], answer: 0, explain: 'A hatás-ellenhatás törvényéhez nem kell közeg.' },
        { q: 'Miért visz magával a rakéta oxidálószert (pl. folyékony oxigént)?', options: ['Mert a világűrben nincs levegő, amelyben a tüzelőanyag elégne', 'Hogy hűtse a hajtóművet', 'Hogy az űrhajósok lélegezzenek', 'Hogy könnyebb legyen'], answer: 0, explain: 'Égéshez oxidálószer kell; a sugárhajtómű a levegőből veszi, a rakéta magával viszi.' },
        { q: 'Miért több lépcsős a hordozórakéta?', options: ['Hogy a kiürült tartályokat ledobva ne kelljen fölöslegesen cipelni', 'Hogy könnyebb legyen szállítani', 'Mert így szebb', 'Hogy több űrhajós férjen el'], answer: 0, explain: 'A leválasztott üres lépcsővel tömeget takarít meg, a maradék gyorsabban gyorsul.' },
        { q: 'Ki volt az első ember a világűrben?', options: ['Jurij Gagarin', 'Neil Armstrong', 'Farkas Bertalan', 'Valentyina Tyereskova'], answer: 0, explain: 'Gagarin 1961. április 12-én repült a Vosztok–1-gyel.' }
      ]
    },
    {
      id: 'szondak-tavcsovek',
      title: 'Űrszondák és űrtávcsövek',
      level: 2, minutes: 14,
      summary: 'Voyager, New Horizons, marsjárók, Hubble és James Webb: hogyan jutnak el a szondák a bolygókhoz, és miért visszük a távcsöveket a világűrbe.',
      tags: ['űrszonda', 'Voyager', 'hintamanőver', 'New Horizons', 'marsjáró', 'Perseverance', 'Parker', 'űrtávcső', 'Hubble', 'James Webb', 'JWST', 'infravörös', 'L2 pont', 'Euclid', 'Gaia'],
      terms: ['fizika-bsc/em-hullam', 'fizika-bsc/interferencia'],
      sections: [
        {
          title: 'Űrszondák: robotfelfedezők',
          text: 'Az ember eddig csak a Holdig jutott; a többi égitestet **robot űrszondák** vizsgálják.\n\n- **Voyager–1 és –2** (indítás: **1977**): elrepültek a Jupiter és a Szaturnusz, a Voyager–2 az Uránusz és a Neptunusz mellett is. Ma már a **csillagközi térben** járnak; a Voyager–1 2026 novemberében kb. **egy fénynapnyira** (kb. 26 milliárd km-re) jutott, a jelei kb. 24 óra alatt érnek ide. **Radioizotópos generátor** adja az áramot, mert ilyen messze a napelem használhatatlan. Mindkettőn ott van az **Arany Lemez** a Föld hangjaival és képeivel.\n- **New Horizons**: 2015-ben a Plútó mellett repült el.\n- **Marsjárók**: a Curiosity (2012 óta) és a **Perseverance** (2021 óta) a Mars kőzeteit vizsgálja ősi élet nyomai után kutatva; az **Ingenuity** kis helikopter 2021-ben először repült egy másik bolygón.\n- **Parker Solar Probe**: 2024 decemberében kb. 6,1 millió km-re közelítette meg a Nap felszínét, kb. 690 000 km/h sebességgel – minden idők leggyorsabb ember alkotta tárgya.',
          tip: 'A szondák gyakran **hintamanővert** használnak: egy bolygó mellett elhaladva annak gravitációja ingyen gyorsítja (vagy lassítja) őket. A Voyagerek így látogathattak meg több óriásbolygót is.'
        },
        {
          title: 'Miért visszük a távcsövet az űrbe?',
          text: 'A Föld **légköre** remeg (ettől pislákolnak a csillagok), elnyeli az infravörös, az ultraibolya és a röntgensugárzás nagy részét, és éjjel is világít egy kicsit. Az űrben ezek a zavarok eltűnnek.\n\nA különböző távcsövek a fény különböző hullámhosszain „látnak” (az elektromágneses spektrumot a [[#/lecke/fizika/hullamok-feny|Fizika]] lecke mutatja be): a röntgentávcső a forró gázt és a fekete lyukak környezetét, az infravörös távcső a porfelhők mögé és a legtávolabbi galaxisokat.'
        },
        {
          title: 'Hubble és James Webb',
          text: '**Hubble-űrtávcső**\n\n- 1990. április 24-én indult az űrrepülőgéppel, kb. 530 km magasan kering.\n- Tükre **2,4 m** átmérőjű. Az első képek homályosak voltak, mert a tükör széle kb. 2 mikrométerrel rossz alakú volt: **1993-ban** űrhajósok szereltek bele „szemüveget”.\n- Összesen öt szervizküldetés járt nála. Képei alapján pontosították a világegyetem korát és tágulását.\n\n**James Webb-űrtávcső (JWST)**\n\n- **2021. december 25-én** indult egy Ariane 5 rakétával, és a Földtől kb. **1,5 millió km**-re, a Nappal ellentétes oldalon lévő **L2 Lagrange-pont** körül kering.\n- Tükre **6,5 m** átmérőjű, **18 hatszögletű**, arannyal bevont berillium tükörszegmensből áll; az indításhoz össze kellett hajtani.\n- **Infravörösben** lát, ezért nagyon hidegnek kell lennie: egy teniszpálya méretű, ötrétegű **napernyő** védi a Nap, a Föld és a Hold hőjétől.\n- Az első képeket 2022. július 12-én tették közzé. Az ősrobbanás után alig néhány száz millió évvel létező galaxisokat lát, és exobolygók légkörét elemzi.'
        },
        {
          title: 'Távcsövek a Földön',
          text: 'A földi óriástávcsövek is fejlődnek: a tükrök deformálható **adaptív optikával** másodpercenként sokszor kiegyenlítik a légkör remegését. Chilében épül az ESO **Rendkívül Nagy Távcsöve (ELT)** 39 méteres tükörrel.\n\nMagyarországon a HUN-REN Csillagászati és Földtudományi Kutatóközpont Konkoly Thege Miklós Csillagászati Intézete működtet obszervatóriumokat, például a mátrai **Piszkéstetőn** – innen több kisbolygót és szupernóvát is felfedeztek.'
        }
      ],
      quiz: [
        { q: 'Miért nem napelem adja a Voyager-szondák áramát?', options: ['Mert olyan messze vannak a Naptól, hogy a napfény túl gyenge', 'Mert 1977-ben még nem volt napelem', 'Mert a napelem túl nehéz', 'Mert nincs rajtuk elektronika'], answer: 0, explain: 'A Napfény a távolság négyzetével gyengül; a Voyagerek radioizotópos generátort használnak.' },
        { q: 'Hol kering a James Webb-űrtávcső?', options: ['Az L2 Lagrange-pont körül, kb. 1,5 millió km-re a Földtől', 'Kb. 530 km magasan a Föld körül', 'A Hold körül', 'A Mars körül'], answer: 0, explain: 'Az 530 km a Hubble pályamagassága; a Webb az L2 pont körül kering.' },
        { q: 'Miért kell a Webb-űrtávcsőnek nagyon hidegnek lennie?', options: ['Mert infravörösben (hősugárzásban) figyel, és a saját melege elvakítaná', 'Hogy ne olvadjon meg az arany', 'Mert az űrhajósok így tudják megjavítani', 'Hogy kevesebb áramot fogyasszon'], answer: 0, explain: 'Minden meleg test infravörös sugárzást bocsát ki; a meleg távcső „saját magát látná”.' },
        { q: 'Mi a hintamanőver?', options: ['Egy bolygó gravitációjának kihasználása a szonda gyorsítására vagy irányítására', 'A szonda forgatása a napelemek miatt', 'Leszállás ejtőernyővel', 'Két szonda összekapcsolása'], answer: 0, explain: 'A bolygó mellett elhaladva a szonda üzemanyag nélkül kap sebességet.' }
      ]
    },
    {
      id: 'exobolygok',
      title: 'Exobolygók és az élet keresése',
      level: 2, minutes: 13,
      summary: 'Más csillagok bolygói: hogyan találják meg őket, mi a lakhatósági zóna, és hol keresik a földön kívüli élet nyomait.',
      tags: ['exobolygó', 'tranzit', 'fedési módszer', 'radiálissebesség-módszer', 'Doppler', '51 Pegasi b', 'lakhatósági zóna', 'TRAPPIST-1', 'Proxima b', 'Kepler-űrtávcső', 'TESS', 'asztrobiológia', 'Európa', 'Enceladus', 'SETI'],
      sections: [
        {
          title: 'Bolygók más csillagok körül',
          text: 'Az **exobolygó** egy másik csillag körül keringő bolygó. Az első, Nap-szerű csillag körüli exobolygót, az **51 Pegasi b**-t **1995-ben** fedezte fel Michel Mayor és Didier Queloz (2019-ben Nobel-díjat kaptak érte). Ez egy „forró Jupiter”: Jupiter-méretű, de csak 4,2 nap alatt kerüli meg a csillagát.\n\nA NASA exobolygó-archívuma **2025 szeptemberében** lépte át a **6000** megerősített exobolygót, 2026-ban már kb. 6400-nál jár, és több ezer jelölt vár megerősítésre. A mai becslések szerint a Tejútrendszerben **több bolygó van, mint csillag**.'
        },
        {
          title: 'Hogyan lehet egy bolygót észrevenni?',
          text: 'A bolygók túl halványak és túl közel vannak a csillagukhoz, ezért közvetlenül csak ritkán láthatók. Helyette a csillagot figyeljük:\n\n- **Fedési (tranzit-) módszer**: ha a bolygó elhalad a csillag előtt, a csillag fénye egy kicsit, pl. 1%-kal, szabályos időközönként elhalványul. Így talált több ezer bolygót a **Kepler-űrtávcső** (2009–2018) és a **TESS** (2018 óta).\n- **Radiálissebesség- (Doppler-) módszer**: a bolygó vonzása miatt a csillag is egy kicsit „billeg”. Ettől a fénye felváltva a kék és a vörös felé tolódik.\n- **Közvetlen leképezés**: nagy távcsövekkel, a csillag fényét kitakarva.\n\nFedéskor a csillag fénye átszűrődik a bolygó légkörén is: a Webb-űrtávcső így méri, milyen gázok (víz, szén-dioxid, metán) vannak egy exobolygó légkörében.'
        },
        {
          title: 'Lakhatósági zóna és élet',
          text: 'A **lakhatósági zóna** a csillag körüli az a sáv, ahol egy kőzetbolygó felszínén **folyékony víz** lehet: nem túl meleg, nem túl hideg. A Naprendszerben a Föld ebben van.\n\nÉrdekes célpontok:\n\n- **Proxima Centauri b**: a legközelebbi csillag (4,24 fényév) lakhatósági zónájában kering (2016).\n- **TRAPPIST-1**: kb. 40 fényévre lévő vörös törpe **hét** Föld-méretű bolygóval, közülük több a lakhatósági zónában.\n\nA Naprendszerben is keresünk életet: a **Mars** egykor folyókkal és tavakkal borított volt; a Jupiter **Európa** és a Szaturnusz **Enceladus** holdján jégpáncél alatti óceán van. Az ESA **JUICE** és a NASA **Europa Clipper** szondája úton van a Jupiter holdjaihoz.\n\nA **SETI** program rádiójelek után kutat. Eddig egyetlen biztos jele sincs a földön kívüli életnek – de a kérdés nyitott, és a következő évtizedek távcsövei közelebb vihetnek a válaszhoz.'
        }
      ],
      quiz: [
        { q: 'Mi a fedési (tranzit-) módszer lényege?', options: ['A bolygó elhalad a csillag előtt, és a csillag fénye kissé elhalványul', 'A bolygót közvetlenül lefényképezik', 'A bolygó rádiójeleket küld', 'A bolygó fénye a vörös felé tolódik'], answer: 0, explain: 'A rendszeresen ismétlődő kis halványodásból következtetnek a bolygóra és a méretére.' },
        { q: 'Mi a lakhatósági zóna?', options: ['Az a sáv a csillag körül, ahol egy bolygó felszínén folyékony víz lehet', 'Egy űrállomás lakómodulja', 'A Föld legsűrűbben lakott területei', 'A Tejútrendszer közepe'], answer: 0, explain: 'Túl közel a víz elforr, túl messze megfagy.' },
        { q: 'Melyik évben fedezték fel az első Nap-szerű csillag körül keringő exobolygót?', options: ['1995', '1969', '2009', '2021'], answer: 0, explain: 'Az 51 Pegasi b-t 1995-ben fedezte fel Mayor és Queloz.' },
        { q: 'Melyik holdon van a jégpáncél alatt folyékony óceán?', options: ['Európa (Jupiter)', 'A mi Holdunk', 'Phobos (Mars)', 'Egyiken sem'], answer: 0, explain: 'Az Európa és az Enceladus jégkérge alatt is óceán van, ezért az élet keresésének fontos célpontjai.' }
      ]
    },
    {
      id: 'magyarok-urben',
      title: 'Magyarok az űrkutatásban',
      level: 1, minutes: 12,
      summary: 'Farkas Bertalan 1980-as repülésétől Kapu Tibor 2025-ös küldetéséig (HUNOR program), a Holdradartól a Pille dózismérőn át a magyar műholdakig.',
      tags: ['Farkas Bertalan', 'Kapu Tibor', 'Cserényi Gyula', 'HUNOR', 'Ax-4', 'Interkozmosz', 'Szojuz–36', 'Szaljut–6', 'Pille', 'Bay Zoltán', 'Holdradar', 'Masat-1', 'ESA', 'Kármán Tódor', 'Simonyi Károly'],
      sections: [
        {
          title: 'Farkas Bertalan, az első magyar űrhajós',
          text: '**Farkas Bertalan** vadászpilóta az **Interkozmosz** program keretében repült. **1980. május 26-án** indult a **Szojuz–36** űrhajóval, Valerij Kubaszov szovjet parancsnokkal, a **Szaljut–6** űrállomásra. **Június 3-án** a Szojuz–35-tel tértek vissza; a repülés kb. **8 napig** tartott. Ezzel Magyarország a hetedik ország lett, amelynek polgára a világűrben járt.\n\nAz űrállomáson magyar kutatók által tervezett orvosbiológiai, anyagtudományi és sugárzásmérő kísérleteket végzett. Ekkor használták először a KFKI-ban fejlesztett **Pille** termolumineszcens dózismérőt, amelynek továbbfejlesztett változata a Nemzetközi Űrállomáson is dolgozott.'
        },
        {
          title: 'Kapu Tibor és a HUNOR program',
          text: 'A **HUNOR** (Hungarian to Orbit) magyar űrhajósprogramot a kormány **2021-ben** indította. A kiválasztásra kb. **240 érvényes jelentkezés** érkezett. A négy döntőst 2023 márciusában mutatták be, és **2024 májusában** dőlt el: **Kapu Tibor** gépészmérnök lett a kutató űrhajós, **Cserényi Gyula** villamosmérnök a tartaléka.\n\nKapu Tibor az **Axiom Mission 4 (Ax-4)** magánküldetéssel repült:\n\n- **indítás: 2025. június 25.**, Falcon 9 rakéta, a Crew Dragon „Grace” űrhajó első útja, Kennedy Űrközpont,\n- legénység: Peggy Whitson (amerikai parancsnok), Shubhanshu Shukla (India), Sławosz Uznański-Wiśniewski (Lengyelország) és Kapu Tibor,\n- kb. **18 napot** töltött a Nemzetközi Űrállomáson; **2025. július 15-én** szálltak le a Csendes-óceánon, Kalifornia partjainál (a teljes út kb. 20 nap),\n- kb. **25 magyar kísérletet** végzett magyar egyetemek, kutatóintézetek és cégek megbízásából (pl. növények, sugárzás, orvosbiológia).\n\nFarkas Bertalan után **45 évvel** ő lett a **második magyar űrhajós**. A HUNOR program a tervek szerint **2026 végén** zárul; az utolsó félévét Kapu Tibor vezeti, közben egy átfogó magyar űrstratégia készül.'
        },
        {
          title: 'Magyar tudósok és mérnökök',
          text: '- **Kármán Tódor** (1881–1963): a modern aerodinamika és rakétatechnika egyik atyja, a NASA JPL egyik alapítója. Róla nevezték el a **Kármán-vonalat**, a 100 km-es magasságot, amelyet általában a világűr határának tekintenek.\n- **Bay Zoltán** csapata **1946. február 6-án** radarjelet vert vissza a Holdról (**Holdradar**) – ez a rádiócsillagászat egyik korai mérföldköve.\n- **Simonyi Károly** magyar születésű szoftvermérnök űrturistaként kétszer (2007, 2009) járt a Nemzetközi Űrállomáson.\n- **Masat-1**: az első magyar műhold, a BME hallgatói és oktatói építették; **2012. február 13-án** indult, és kb. három évig működött.\n- Magyarország **2015 óta** az **Európai Űrügynökség (ESA)** teljes jogú tagja; magyar kutatók és cégek több ESA-küldetés műszereinek fejlesztésében is részt vesznek.',
          tip: 'Az űrtechnika rengeteg szakmát igényel: mérnököket, informatikusokat, orvosokat, biológusokat, anyagtudósokat. A [[#/palya|pályaorientációs oldalon]] megnézheted, melyik út vezet ezekhez.'
        }
      ],
      quiz: [
        { q: 'Mikor repült Farkas Bertalan a világűrbe?', options: ['1980-ban', '1961-ben', '1969-ben', '2025-ben'], answer: 0, explain: '1980. május 26-án indult a Szojuz–36-tal.' },
        { q: 'Melyik küldetéssel repült Kapu Tibor?', options: ['Axiom Mission 4 (Ax-4)', 'Szojuz–36', 'Artemis II', 'Apollo–11'], answer: 0, explain: 'Kapu Tibor 2025. június 25-én indult az Ax-4 küldetéssel a Nemzetközi Űrállomásra.' },
        { q: 'Mit nevezünk Kármán-vonalnak?', options: ['A 100 km-es magasságot, amelyet a világűr határának tekintenek', 'A Föld egyenlítőjét', 'A Hold pályáját', 'A Tejút fénysávját'], answer: 0, explain: 'A magyar születésű Kármán Tódorról nevezték el.' },
        { q: 'Mi volt a Masat-1?', options: ['Az első magyar műhold (2012)', 'Az első magyar rakéta', 'Egy magyar marsjáró', 'Farkas Bertalan űrhajója'], answer: 0, explain: 'A BME-n épített kis műhold 2012. február 13-án indult.' }
      ]
    }
  ]
});
