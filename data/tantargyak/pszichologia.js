/* Tantárgy: Pszichológia és mentális egészség – kamaszoknak és fiatal felnőtteknek.
 * Tudományosan megalapozott, nem moralizáló, NEM diagnosztizál, és nem helyettesíti a szakembert.
 * Minden lecke első szakaszában ott a „Ha most nehéz” doboz (widget: psz-segitseg, js/pszicho-widgets.js);
 * egyetemi nézetben a js/pszicho-widgets.js a lecke tetejére is beteszi.
 * Segélyvonalak (2026. novemberi ellenőrzés): Kék Vonal 116-111, Lelki Elsősegély 116-123, segélyhívó 112 –
 * mindhárom ingyenes és éjjel-nappal hívható. Gyógyszeres tanácsot a tananyag szándékosan nem ad. */
STUDIE.addSubject({
  id: 'pszichologia',
  stage: 'elet',
  title: 'Pszichológia és mentális egészség',
  icon: '🧠',
  color: '#6d5bd0',
  description: 'Tanulás és emlékezet, figyelem és telefon, stressz, alvás, érzelmek, halogatás, önértékelés, kapcsolatok és határok, gondolkodási csapdák – és hogy mikor, hol kérj segítséget.',
  intro: 'Ez a tantárgy arról szól, **hogyan működik a fejünk** a mindennapokban: miért felejtünk, mitől leszünk feszültek, miért halogatunk, és mit lehet ezekkel kezdeni. Minden állítás mögött kutatás áll – és ahol a tudomány még vitatkozik (például a közösségi média hatásáról), ott ezt is megmondjuk.\n\nNem prédikálunk, és nem mondjuk meg, hogyan kell élned. Eszközöket mutatunk: **légzőgyakorlatot**, **hangulatnaplót**, **gondolatcsapda-felismerőt** és **halogatás-tervezőt** – próbáld ki, ami neked beválik.\n\n**Fontos:** ez a tananyag **nem diagnosztizál**, és **nem helyettesíti** a pszichológust, orvost vagy más szakembert. Ha valami régóta nyomaszt, vagy most nagyon nehéz, beszélj valakivel: minden lecke tetején megtalálod az ingyenes, éjjel-nappal hívható segélyvonalakat (**Kék Vonal 116-111**, **Lelki Elsősegély 116-123**, vészhelyzetben **112**).\n\nA tanulási módszerek gyakorlásához lásd a [[#/tanulas|Tanulássegédet]], a sportolók lelki felkészüléséhez a [[#/lecke/sport/sportpszichologia|Sportpszichológia]] leckét.',
  lessons: [
    /* ------------------------------------------------------------------ 1 */
    {
      id: 'tanulas-emlekezet',
      title: 'Hogyan működik a tanulás és az emlékezet?',
      level: 1, minutes: 15,
      summary: 'Munkamemória és hosszú távú emlékezet, felejtés, felidézés, elosztott ismétlés – és miért tanulsz alvás közben is.',
      tags: ['tanulás', 'emlékezet', 'munkamemória', 'hosszú távú memória', 'felejtési görbe', 'Ebbinghaus', 'felidézés', 'tesztelési hatás', 'elosztott ismétlés', 'alvás', 'konszolidáció', 'hippokampusz', 'újraolvasás', 'kiemelés', 'tanulási stílusok'],
      models: ['agy'],
      terms: ['anatomia/neuron', 'anatomia/szinapszis'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'Az iskola évekig arra kér, hogy tanulj – de ritkán mondja el, **hogyan működik maga a tanulás**. Ebben a leckében megnézzük, mi történik a fejedben, amikor megjegyzel valamit, és mely módszereket támasztják alá a kutatások.',
          widget: { type: 'psz-segitseg' }
        },
        {
          title: 'Két „tár”: munkamemória és hosszú távú emlékezet',
          text: 'Leegyszerűsítve kétféle emlékezetünk van:\n\n- **Munkamemória:** ez a „munkaasztalod”. Itt tartod, amin éppen gondolkodsz – például egy telefonszámot, amíg beírod. **Kicsi**: egyszerre csak kb. 4 dologgal tud jól dolgozni, és amit nem ismételsz, az pár másodperc alatt kiesik.\n- **Hosszú távú emlékezet:** ez a „könyvtár”. Gyakorlatilag nincs betelő kapacitása, de ami itt van, azt **meg is kell találni**.\n\nA tanulás lényege, hogy az információ a munkamemóriából **átkerüljön** a hosszú távúba, és később **elő is tudd hívni**. Ebben fontos szerepe van az agy **hippokampusz** nevű területének (megnézheted a [[agy|szétszedhető agymodellen]]).',
          tip: 'Ha túl sok új dolgot zúdítasz egyszerre a munkamemóriádra (pl. jegyzetelsz, zenét hallgatsz és üzenetet írsz), egyszerűen nem fér el minden. Ezért jobb kisebb adagokban tanulni.'
        },
        {
          title: 'A felejtés természetes',
          text: 'Hermann **Ebbinghaus** német pszichológus már az 1880-as években kimérte magán, milyen gyorsan felejt: az új anyag nagy része **az első napokban** elillan, utána lassul a felejtés. Ez a **felejtési görbe**.\n\nA felejtés nem hiba, hanem a rendszer része: az agy azt tartja meg, amire **újra és újra szükség van**. A jó hír: minden alkalommal, amikor újra előveszed az emléket, lassabban felejted el.'
        },
        {
          title: 'Ami tényleg működik: felidézés és elosztott ismétlés',
          text: 'A tanulási módszereket összehasonlító nagy áttekintés (Dunlosky és munkatársai, 2013) két módszert talált a leghasznosabbnak:\n\n1. **Felidézés (gyakorló tesztelés):** csukd be a könyvet, és **írd le, mondd el fejből**, amire emlékszel; oldj meg kérdéseket. Az előhívás erősíti az emléket – ez a **tesztelési hatás**. Kezdetben nehezebbnek érződik, de pont ettől működik.\n2. **Elosztott ismétlés:** ugyanannyi idő többször, napokra szétosztva sokkal tartósabb, mint egyszerre „bemagolva” az utolsó estén.\n\nKevésbé hatékony a puszta **újraolvasás** és a **kiemelés**: ezektől ismerősnek tűnik a szöveg, és könnyen azt hiszed, hogy már tudod („tudás illúziója”).\n\nGyakorolni a [[#/tanulas/felidezes|„Írd le fejből” eszközzel]] és a [[#/ismetles|Mai ismétléssel]] tudod. Tanároknak részletesebben: [[#/lecke/tanari/tanulas-tudomanya|A tanulás tudománya tanároknak]].',
          warn: 'Mítosz: „vizuális / auditív / mozgásos típus vagyok, ezért csak úgy tudok tanulni”. Kutatások nem igazolták, hogy jobban tanulnál, ha a tananyagot a „stílusodhoz” igazítják. Az viszont igaz, hogy a **szöveg + ábra együtt** szinte mindenkinek segít.'
        },
        {
          title: 'Az alvás: a tanulás „mentés gombja”',
          text: 'Alvás közben az agy **rendezi és megerősíti** a napközben tanultakat – ezt **konszolidációnak** hívják. Kísérletekben azok, akik tanulás után aludtak, többet tudtak felidézni, mint akik ugyanennyi ideig ébren voltak.\n\nEzért a hajnalig tartó magolás rossz üzlet: amit nyersz az órákon, elveszíted azzal, hogy kevesebbet alszol, és másnap fáradtan nehezebb a felidézés is.\n\nAz alvás részletesebben: [[#/lecke/pszichologia/alvas|Alvás: miért nem luxus?]]',
          tip: 'Egy egyszerű heti terv: tanulás után aznap este 5 perc fejből felidézés, másnap 5 perc, egy hét múlva megint 5 perc. Ez kevesebb idő, mint egy esti magolás – és sokkal tartósabb.'
        }
      ],
      quiz: [
        { q: 'Melyik módszer segít a legjobban a tartós tanulásban a kutatások szerint?', options: ['Többszöri újraolvasás', 'Színes kiemelés', 'Felidézés fejből, elosztva több napra', 'Egész éjszakás magolás vizsga előtt'], answer: 2, explain: 'A felidézés (tesztelési hatás) és az elosztott ismétlés a legjobban alátámasztott módszerek.' },
        { q: 'Mi a munkamemória fő korlátja?', options: ['Egyszerre csak kevés dolgot tud kezelni', 'Csak képeket tárol', 'Csak alvás közben működik', 'Nincs korlátja'], answer: 0, explain: 'A munkamemória kis kapacitású: egyszerre kb. 4 egységgel tud jól dolgozni.' },
        { q: 'Miért fontos az alvás a tanuláshoz?', options: ['Alvás közben új anyagot tanulunk hangfelvételről', 'Nem fontos, csak pihentet', 'Mert alvás közben nem felejtünk semmit', 'Alvás közben az agy megerősíti a napközben tanultakat'], answer: 3, explain: 'Alvás közben zajlik a konszolidáció: a friss emlékek stabilabbá válnak.' }
      ]
    },
    /* ------------------------------------------------------------------ 2 */
    {
      id: 'figyelem-telefon',
      title: 'Figyelem, telefon és közösségi média',
      level: 2, minutes: 16,
      summary: 'Hogyan működik a figyelem, mibe kerül a „multitasking”, mit tudunk (és mit nem) a közösségi média hatásáról – és hogyan alakíthatod a saját szokásaidat.',
      tags: ['figyelem', 'multitasking', 'feladatváltás', 'értesítések', 'telefon', 'okostelefon', 'közösségi média', 'képernyőidő', 'korreláció', 'ok-okozat', 'algoritmus', 'végtelen görgetés', 'FOMO', 'digitális jóllét'],
      terms: ['valszam/korrelacio-oksag'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'A telefonról sokan mondanak sokfélét: „tönkreteszi a fiatalokat”, vagy épp „semmi baj vele”. Ebben a leckében megnézzük, **mit mutatnak a kutatások valójában**, hol vannak a korlátaik, és mit tehetsz, ha szeretnéd jobban kézben tartani a figyelmedet. Nem fogjuk megmondani, mennyit telefonozz – ezt te döntöd el.',
          widget: { type: 'psz-segitseg' }
        },
        {
          title: 'A figyelem szűk keresztmetszet',
          text: 'A figyelem olyan, mint egy reflektor: amire rávetül, azt dolgozod fel alaposan, a többi elmosódik. Két összetett, gondolkodást igénylő feladatot **nem tudsz igazán egyszerre** csinálni: amit „multitaskingnak” hívunk, az valójában **gyors váltogatás** a feladatok között.\n\nMinden váltásnak **ára van**: kell egy kis idő, amíg „visszatalálsz” az előző feladatba, és közben több hibát vétesz. Ezt a **feladatváltási költséget** laborkísérletek sokasága mérte ki. Egy-egy váltás csak töredékmásodperc, de egy órányi tanulás alatt sok értesítés komoly időt és figyelmet visz el.',
          tip: 'Egy értesítés akkor is elviheti a figyelmet, ha nem nézel rá: az agy „számon tartja”, hogy vár valami. Ha fókuszálni akarsz, a **némítás** vagy a telefon **másik szobába** tétele egyszerűbb, mint az akaraterő.'
        },
        {
          title: 'Közösségi média: mit tudunk biztosan?',
          text: 'Sok kutatás talált **összefüggést** a sok közösségimédia-használat és a rosszabb hangulat, szorongás vagy alvás között – különösen lányoknál. De vigyázat:\n\n- **Összefüggés ≠ ok.** Lehet, hogy a média rontja a hangulatot, de az is, hogy aki rosszabbul van, többet görget, vagy egy harmadik tényező (pl. magány, kevés alvás) áll mindkettő mögött.\n- **Az átlagos hatás kicsi.** Egy sokat idézett elemzés (Orben és Przybylski, 2019) szerint a képernyőhasználat a kamaszok jóllétének változatosságából csak nagyon kis részt magyaráz. Más kutatók (pl. Jonathan Haidt) szerint ennél nagyobb a szerepe, főleg a sérülékenyebb fiataloknál. **A tudományos vita ma is zajlik.**\n- **Nem mindegy, mire használod.** A barátokkal való valódi kapcsolattartás, alkotás, tanulás más, mint a passzív, órákig tartó görgetés vagy az alvás rovására menő esti használat.\n- **Egyénenként nagyon eltérő.** Van, akinek egy közösség épp támaszt ad, másnak rossz összehasonlításokat hoz.',
          warn: 'Ha olyan címet látsz, hogy „A telefon X százalékkal növeli a depressziót”, kérdezd meg: kísérlet volt vagy csak összefüggés? Hány emberen mérték? Ki finanszírozta? Ez a kritikus gondolkodás a [[#/lecke/pszichologia/gondolkodasi-csapdak|Gondolkodási csapdák]] leckében is előkerül.'
        },
        {
          title: 'Miért nehéz letenni?',
          text: 'Az alkalmazásokat **profi csapatok** tervezik úgy, hogy minél tovább ott tartsanak: **végtelen görgetés**, automatikusan induló következő videó, piros értesítési pöttyök, „sorozatok” (streak), kiszámíthatatlan jutalmak (sosem tudod, mi jön a következő görgetésnél). Ez nem a te „gyengeséged” – a rendszert erre optimalizálták.\n\nA **FOMO** (fear of missing out, a kimaradástól való félelem) is erősíti a késztetést, hogy folyamatosan ránézz.\n\nMagyarországon **2024 szeptemberétől** rendelet korlátozza a diákok okostelefon-használatát az iskolában; a részleteket az iskola házirendje szabályozza.'
        },
        {
          title: 'Kísérletezz – a saját szabályaiddal',
          text: 'Ha változtatni szeretnél, ne tiltásokkal kezdd, hanem **figyeld meg**, aztán **kísérletezz**:\n\n- Nézd meg a telefon képernyőidő-statisztikáját: mire megy el a legtöbb idő? Meglepett?\n- Vedd észre, **mikor** nyúlsz a telefonért: unalom, feszültség, megszokás?\n- Kapcsold ki a nem fontos **értesítéseket** (ez a leghatékonyabb egyszerű lépés).\n- Tanuláskor tedd el a telefont, és használj időzítőt (pl. a [[#/tanulas/pomodoro|Pomodoro-időzítőt]]).\n- Lefekvés előtt fél-egy órával tedd le – az alvásod meghálálja.\n- Egy hét múlva értékeld: mi változott a hangulatodban, alvásodban, figyelmedben?',
          tip: 'Az online biztonságról és az adathalászatról lásd az [[#/lecke/informatika/adatbiztonsag|Adatbiztonság]] leckét, az online zaklatásról a [[#/lecke/pszichologia/kapcsolatok-hatarok|Kapcsolatok és határok]] leckét.'
        }
      ],
      quiz: [
        { q: 'Mit jelent valójában a „multitasking” gondolkodást igénylő feladatoknál?', options: ['Valódi párhuzamos munkát', 'Gyors váltogatást, aminek idő- és hibaköltsége van', 'Azt, hogy a fiatalok agya másképp működik', 'Két agyfélteke külön dolgozik'], answer: 1, explain: 'Két összetett feladat között váltogatunk, és minden váltásnak ára van.' },
        { q: 'Egy kutatás összefüggést talál a sok görgetés és a rosszabb hangulat között. Mit állíthatunk ebből biztosan?', options: ['Hogy a görgetés okozza a rossz hangulatot', 'Hogy a kettő együtt jár, de az ok-okozati irányt ebből nem tudjuk', 'Hogy a rossz hangulat okozza a görgetést', 'Semmit, mert a kutatás hamis'], answer: 1, explain: 'Az összefüggés (korreláció) nem bizonyít ok-okozatot.' },
        { q: 'Melyik a legegyszerűbb, kutatásokkal jól alátámasztható lépés a figyelem védelmére tanuláskor?', options: ['Erősebb akarat', 'Kétszer annyi kávé', 'Gyorsabb zene', 'Az értesítések kikapcsolása és a telefon eltétele'], answer: 3, explain: 'A környezet megváltoztatása egyszerűbb és megbízhatóbb, mint folyamatosan ellenállni a késztetésnek.' }
      ]
    },
    /* ------------------------------------------------------------------ 3 */
    {
      id: 'stressz',
      title: 'Stressz: mi zajlik a testben, és mit kezdhetsz vele?',
      level: 1, minutes: 16,
      summary: 'Az „üss vagy fuss” válasz, az adrenalin és a kortizol, mikor segít a stressz és mikor árt – és három bevált módszer: légzés, mozgás, problémamegoldás.',
      tags: ['stressz', 'üss vagy fuss', 'adrenalin', 'kortizol', 'szimpatikus idegrendszer', 'paraszimpatikus', 'akut stressz', 'krónikus stressz', 'Yerkes–Dodson', 'légzőgyakorlat', 'doboz-légzés', '4-7-8 légzés', 'mozgás', 'problémamegoldás', 'átkeretezés', 'vizsgadrukk'],
      models: ['agy'],
      terms: ['anatomia/mellekvese-stressz', 'anatomia/vegetativ'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'Dolgozat előtt kalapál a szíved, izzad a tenyered, nem tudsz enni – ismerős? Ez a **stresszválasz**. Megnézzük, mi zajlik ilyenkor a testedben, miért nem feltétlenül ellenség, és mit tehetsz, ha túl sok.',
          widget: { type: 'psz-segitseg' }
        },
        {
          title: 'Üss vagy fuss: a test vészüzemmódja',
          text: 'Ha az agy veszélyt vagy kihívást érzékel, másodpercek alatt beindul a **szimpatikus idegrendszer**, és a mellékvese **adrenalint** szór a vérbe:\n\n- gyorsul a szívverés és a légzés,\n- az izmok több vért kapnak, megfeszülnek,\n- a vércukorszint nő (energia!),\n- az emésztés lelassul (ezért „szorul a gyomrod”),\n- éberebb leszel.\n\nKicsit lassabban egy hormonlánc is elindul (hipotalamusz → agyalapi mirigy → mellékvese), ennek a végén a **kortizol** áll, amely órákig fenntartja a készenlétet.\n\nEz a rendszer az őseinknek az életét mentette egy ragadozó elől. Ma a „ragadozó” inkább egy felelés vagy egy veszekedés – de a test ugyanúgy reagál.',
          tip: 'Ha egy pillanatra „lefagysz” vagy kiürül a fejed, az is a stresszválasz része, nem a te hibád. Pár lassú kilégzés segít visszakapcsolni.'
        },
        {
          title: 'Mikor hasznos és mikor nem?',
          text: '**Rövid, kezelhető stressz** sokszor kifejezetten **segít**: élesebb lesz a figyelmed, több energiád van egy versenyen vagy vizsgán. Egy régi megfigyelés (Yerkes–Dodson-szabály) szerint a teljesítmény egy ideig nő az izgalommal, túl sok izgalomnál viszont romlik. (Ez egyszerűsítés, de jól mutatja: nem a nulla stressz a cél.)\n\nKísérletek szerint az is számít, **hogyan értelmezed**: aki a dobogó szívet úgy fogja fel, hogy „a testem felkészül”, gyakran jobban teljesít, mint aki úgy, hogy „baj van”.\n\nA gond akkor kezdődik, ha a stressz **tartós** (hetekig, hónapokig nem enged el), és nincs mód kipihenni. A **krónikus stressz** ronthatja az alvást, a koncentrációt, az immunrendszert, és fejfájással, gyomorpanaszokkal, ingerlékenységgel járhat.',
          warn: 'Ha hetek óta folyamatosan feszült vagy, alig alszol, vagy a stressz miatt már nem tudod a napi dolgaidat elvégezni, az nem „gyengeség”: beszélj valakivel (szülő, iskolapszichológus, háziorvos). Lásd: [[#/lecke/pszichologia/segitsegkeres|Mikor és hol kérj segítséget?]]'
        },
        {
          title: '1. eszköz: lassú légzés',
          text: 'A légzés az egyetlen olyan „vészüzemmód-funkció”, amelyet **akaratlagosan is irányítani** tudsz. A **lassú, hosszú kilégzés** a paraszimpatikus („pihenj és eméssz”) idegrendszert erősíti, és sokaknak percek alatt csökkenti a feszültséget.\n\n- **Doboz-légzés:** 4 mp belégzés – 4 mp benntartás – 4 mp kilégzés – 4 mp szünet.\n- **4-7-8 légzés:** 4 mp belégzés orron – 7 mp benntartás – 8 mp kilégzés szájon. Ha a benntartás kényelmetlen, rövidítsd nyugodtan.\n\nA kutatások a lassú légzés megnyugtató hatását támogatják, de a konkrét számoknak (4-7-8 vagy 4-4-4-4) nincs „varázsereje": az a lényeg, hogy **lassú legyen és hosszú a kilégzés**. Próbáld ki lent!',
          widget: { type: 'psz-legzes' }
        },
        {
          title: '2. és 3. eszköz: mozgás és problémamegoldás',
          text: '**Mozgás.** A rendszeres testmozgás az egyik legjobban alátámasztott módja a stressz és a rossz hangulat enyhítésének. Nem kell sportolónak lenned: egy gyors séta, biciklizés, tánc is számít. Egy feszült nap után a mozgás „elhasználja” azt, amire a test felkészült.\n\n**Problémamegoldás.** Ha a stressz oka megoldható, a leghatékonyabb a **forrással** foglalkozni:\n\n1. Írd le pontosan, mi a gond (nem „minden rossz”, hanem „csütörtökön töriből felelek, és nem értem a 3. fejezetet”).\n2. Gyűjts **legalább 3 lehetőséget** – akár butának tűnőket is.\n3. Válassz egyet, és bontsd **kis lépésekre** (ehhez segít a [[#/lecke/pszichologia/motivacio-halogatas|halogatás-tervező]]).\n4. Csináld meg az elsőt, aztán nézd meg, mi lett.\n\nHa a helyzet **nem változtatható** (pl. egy beteg családtag), akkor a cél inkább az, hogy **kibírhatóbb** legyen: beszélgetés valakivel, pihenés, olyan tevékenység, ami feltölt.\n\nSportolóknak a versenyizgalomról: [[#/lecke/sport/sportpszichologia|Sportpszichológia]].'
        }
      ],
      quiz: [
        { q: 'Melyik hormon szabadul fel másodperceken belül hirtelen ijedtségkor?', options: ['Adrenalin', 'Melatonin', 'Inzulin', 'Növekedési hormon'], answer: 0, explain: 'Az adrenalin gyorsan indítja az „üss vagy fuss” választ; a kortizol lassabban, de tartósabban hat.' },
        { q: 'Melyik állítás igaz a stresszről?', options: ['Minden stressz káros', 'Csak a felnőtteknek van stresszük', 'Rövid, kezelhető stressz javíthatja a teljesítményt, a tartós stressz árthat', 'A stressz csak lelki, a testre nem hat'], answer: 2, explain: 'Az akut, kezelhető stressz hasznos lehet; a krónikus stressz árt.' },
        { q: 'Mi a lassú légzés lényeges eleme?', options: ['Minél gyorsabb belégzés', 'A levegő legalább egy percig benntartása', 'Hosszú, lassú kilégzés', 'Csak szájon át lélegezni'], answer: 2, explain: 'A hosszú kilégzés a megnyugtató paraszimpatikus idegrendszert segíti.' }
      ]
    },
    /* ------------------------------------------------------------------ 4 */
    {
      id: 'alvas',
      title: 'Alvás: miért nem luxus?',
      level: 1, minutes: 13,
      summary: 'Mennyit kell aludnod, miért tolódik el kamaszkorban a belső óra, mi történik alvás közben – és mi segít elaludni.',
      tags: ['alvás', 'cirkadián ritmus', 'belső óra', 'melatonin', 'kamaszkor', 'alvási szükséglet', 'REM', 'mélyalvás', 'kék fény', 'képernyő', 'koffein', 'energiaital', 'hétvégi alvás', 'alváshigiénia', 'álmatlanság'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'Az alvás nem „elvesztegetett idő”: alvás közben az agy és a test fontos karbantartást végez. Megnézzük, mennyi kell belőle, miért nehéz kamaszként korán elaludni, és mit tehetsz érte – szigorú szabályok nélkül.',
          widget: { type: 'psz-segitseg' }
        },
        {
          title: 'Mennyi alvás kell?',
          text: 'Az amerikai alvásorvosi társaság (AASM) ajánlása szerint:\n\n- **13–18 éveseknek: 8–10 óra** éjszakánként,\n- **felnőtteknek (18 év felett): legalább 7 óra.**\n\nA felmérések szerint a kamaszok jelentős része ennél kevesebbet alszik iskolai napokon. Az alváshiány hatásai: rosszabb figyelem és emlékezet, ingerlékenység, rosszabb hangulat, nagyobb balesetveszély (pl. biciklin, autóban), és a sportteljesítmény is romlik.',
          tip: 'Az egyéni igény eltér. Jó jel, ha ébresztő nélkül is nagyjából időben felébredsz, és napközben nem küzdesz álmossággal.'
        },
        {
          title: 'A kamasz belső óra tényleg később jár',
          text: 'Az agy belső órája (**cirkadián ritmus**) szabályozza, mikor leszel álmos. Ennek egyik jelzőanyaga a **melatonin** hormon, amely este, sötétedéskor kezd termelődni.\n\nKamaszkorban a melatonin-termelés esti kezdete **később** jön – vagyis biológiailag természetes, hogy később leszel álmos és reggel nehezebben kelsz. Ez **nem lustaság**. Gond akkor van, ha a korai iskolakezdés és a késői elalvás miatt tartós alváshiány alakul ki.\n\nA késő esti erős fény (képernyő, lámpa) és az izgalmas tartalom tovább tolhatja az álmosodást. A „kék fény” hatását a média gyakran eltúlozza; valószínűleg legalább annyit számít, **mit** csinálsz a telefonon (pörgető videók, üzenetek, izgalom), mint maga a fény.'
        },
        {
          title: 'Mi történik alvás közben?',
          text: 'Egy éjszaka alatt kb. **90 perces ciklusok** ismétlődnek. Ezekben váltakozik a **mélyalvás** (a test regenerálódik, a növekedési hormon termelődik, az emlékek rendeződnek) és a **REM-alvás** (élénk álmok, az érzelmi emlékek feldolgozása).\n\nAz éjszaka elején több a mélyalvás, a hajnali órákban több a REM – ezért a korán reggel megrövidített alvás az álmodós szakaszokból vesz el.\n\nAlvás a tanulásban: lásd [[#/lecke/pszichologia/tanulas-emlekezet|Hogyan működik a tanulás és az emlékezet?]]. Sportolóknak: [[#/lecke/sport/edzeselmelet|Edzéselmélet, regeneráció, alvás]].'
        },
        {
          title: 'Ami segít (válogass belőle)',
          text: '- **Nagyjából állandó kelési idő**, hétvégén is (legfeljebb 1-2 óra eltérés). A hétvégi nagy „bepótlás” jövő héten nehezíti a hétfői kelést.\n- **Reggeli fény:** a reggeli napfény (akár egy rövid séta) segít „beállítani” a belső órát.\n- **Koffein délután már ne:** kávé, kóla, energiaital órákig hat. Az energiaitalok magas koffeintartalma kamaszoknak különösen nem ajánlott.\n- **Levezetés:** lefekvés előtt fél-egy órával valami nyugodtabb tevékenység; a telefon lehetőleg ne az ágyban legyen.\n- **Hűvös, sötét, csendes szoba.**\n- Ha nem tudsz elaludni kb. 20 perc után, kelj fel, csinálj valami unalmasat félhomályban, és csak álmosan feküdj vissza – az ágy ne a forgolódás helye legyen.',
          warn: 'Altatót, melatonint vagy más szert csak orvossal egyeztetve szabad szedni – ez a tananyag nem ad gyógyszeres tanácsot. Ha hetek óta rosszul alszol, horkolsz és nappal folyton álmos vagy, vagy aggódsz az alvásod miatt, beszélj a háziorvosoddal.'
        }
      ],
      quiz: [
        { q: 'Mennyi alvást ajánlanak 13–18 éveseknek az alvásorvosok (AASM)?', options: ['8–10 órát', '5–6 órát', '6–7 órát', '11–13 órát'], answer: 0, explain: 'Az ajánlás 13–18 éveseknek 8–10 óra éjszakánként.' },
        { q: 'Miért nehezebb sok kamasznak korán elaludni?', options: ['Mert lusták', 'Mert nem fáradnak el', 'Mert túl sokat esznek', 'Mert a belső óra (melatonin-termelés) kamaszkorban később indul'], answer: 3, explain: 'Kamaszkorban biológiailag eltolódik a cirkadián ritmus.' },
        { q: 'Melyik segít a legtöbbet a belső óra beállításában?', options: ['Hétvégén délig aludni', 'Nagyjából állandó kelési idő és reggeli fény', 'Késő esti energiaital', 'Lefekvés előtti izgalmas játék'], answer: 1, explain: 'Az állandó ritmus és a reggeli fény a legerősebb jelzés a belső órának.' }
      ]
    },
    /* ------------------------------------------------------------------ 5 */
    {
      id: 'erzelmek',
      title: 'Érzelmek: felismerés és szabályozás',
      level: 1, minutes: 15,
      summary: 'Mire valók az érzelmek, hogyan nevezd meg őket pontosan, miért nem működik az elfojtás – és milyen szabályozási módszereket támasztanak alá a kutatások.',
      tags: ['érzelmek', 'érzelemszabályozás', 'érzelmek megnevezése', 'átkeretezés', 'elfojtás', 'harag', 'szorongás', 'szomorúság', 'düh', 'amigdala', 'hangulatnapló', 'tudatos jelenlét', 'önegyüttérzés', 'kibeszélés'],
      models: ['agy'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'Nincsenek „rossz” érzelmek: a düh, a félelem, a szomorúság ugyanúgy hasznos jelzések, mint az öröm. A kérdés az, **mit kezdesz velük**. Ebben a leckében gyakorlati, kutatásokkal alátámasztott módszereket mutatunk.',
          widget: { type: 'psz-segitseg' }
        },
        {
          title: 'Mire valók az érzelmek?',
          text: 'Az érzelmek **gyors jelzőrendszerek**: a test és az agy egyszerre reagál egy helyzetre, és cselekvésre készít fel.\n\n- **Félelem, szorongás:** veszély lehet – vigyázz!\n- **Düh:** valami igazságtalan, vagy átlépték a határaidat.\n- **Szomorúság:** elvesztettél valamit, ami fontos volt; lassíts, kérj támogatást.\n- **Bűntudat:** megsértettél egy saját értéket; jóvá lehet tenni.\n- **Öröm, büszkeség:** ez jó, ebből többet!\n\nAz agy mélyén lévő **amigdala** nagyon gyorsan, még a tudatos gondolkodás előtt „riaszt”. A homloklebeny (különösen az előtte lévő, prefrontális kéreg) segít átgondolni a választ – ez a terület **a húszas évek közepéig** érik. Ezért kamaszként néha erősebbnek tűnnek az érzelmek: ez a fejlődés normális része.',
          tip: 'Az érzelem nem parancs. Érezhetsz dühöt anélkül, hogy kiabálnál, és félelmet anélkül, hogy elmenekülnél.'
        },
        {
          title: '1. lépés: nevezd meg – minél pontosabban',
          text: 'Kísérletekben már az is csökkentette az érzelmi feszültséget, ha a résztvevők **szavakkal megnevezték**, mit éreznek („ez most düh”). Azok, akik **árnyaltabban** tudják megnevezni az érzelmeiket (nem csak „rossz”, hanem „csalódott”, „megalázott”, „ideges a holnap miatt”), a kutatások szerint jobban is tudják kezelni őket.\n\nEgy egyszerű ellenőrzés:\n\n1. **Test:** hol érzed? (gombóc a torokban, szorító mellkas, forró arc)\n2. **Név:** melyik szó illik rá a legjobban?\n3. **Erősség:** 0-tól 10-ig mennyire erős?\n4. **Üzenet:** mit jelez? Mire lenne most szükségem?\n\nAz alábbi **hangulatnapló** segít észrevenni a mintázatokat (pl. hogy rosszabb napjaid a kevés alvás után jönnek).',
          widget: { type: 'psz-hangulat' }
        },
        {
          title: 'Mi működik, és mi kevésbé?',
          text: '**Kevésbé működik:**\n\n- **Elfojtás:** ha erőszakkal nem veszel tudomást egy érzésről, az gyakran felerősödik. Ismert kísérlet: akit arra kértek, hogy **ne** gondoljon egy fehér medvére, az többször gondolt rá.\n- **„Kiadni a dühöt” ütéssel, ordítással:** a kutatások szerint ez inkább **fenntartja** a dühöt, mint csökkenti. (Más a mozgás: az a feszültséget vezeti le, nem a dühöt gyakorolja.)\n- **Rágódás:** ugyanazt a gondolatot pörgetni órákig – ez nem problémamegoldás, és rontja a hangulatot.\n\n**Jól alátámasztott:**\n\n- **Átkeretezés:** a helyzet újraértelmezése („nem engem utál, hanem rossz napja van” – de csak ha ez tényleg hihető).\n- **Lassú légzés, mozgás** – lásd a [[#/lecke/pszichologia/stressz|Stressz]] leckét.\n- **Beszélgetés** valakivel, akiben megbízol.\n- **Figyelemterelés** rövid távon: egy erős hullám idejére segíthet (zene, séta, hideg víz az arcra).\n- **Önegyüttérzés:** úgy beszélni magaddal, ahogy egy jó barátoddal tennéd.\n- **Megoldás**, ha a helyzet változtatható.',
          warn: 'Ha egy érzés (pl. szomorúság, üresség, szorongás) **hetekig** tart és megnehezíti a mindennapjaidat, vagy olyan gondolataid vannak, hogy bántanád magad, ne maradj egyedül vele: hívd a **Kék Vonalat (116-111)** vagy a **116-123**-at, és szólj egy felnőttnek, akiben megbízol.'
        }
      ],
      quiz: [
        { q: 'Mit mutattak a kísérletek az érzelmek szavakkal való megnevezéséről?', options: ['Felerősíti az érzelmet', 'Csökkentheti az érzelmi feszültséget', 'Semmi hatása nincs', 'Csak felnőtteknél működik'], answer: 1, explain: 'Az érzelem megnevezése (affektuscímkézés) sokszor csökkenti a feszültséget.' },
        { q: 'Mi történik gyakran, ha egy gondolatot erőszakkal el akarsz nyomni?', options: ['Végleg eltűnik', 'Átalakul örömmé', 'Elfelejted az egész napot', 'Gyakran visszatér, sőt felerősödik'], answer: 3, explain: 'A „fehér medve” kísérletek szerint az elfojtott gondolat gyakran visszatér.' },
        { q: 'Mit mutatnak a kutatások a düh „kiadásáról” (pl. párna ütése)?', options: ['Inkább fenntartja a dühöt', 'A legjobb módszer', 'Csak sportolóknál működik', 'Megszünteti a haragot örökre'], answer: 0, explain: 'A düh gyakorlása fenntartja a dühöt; a megnyugtató tevékenységek csökkentik.' }
      ]
    },
    /* ------------------------------------------------------------------ 6 */
    {
      id: 'motivacio-halogatas',
      title: 'Motiváció és halogatás',
      level: 2, minutes: 15,
      summary: 'Miért halogatunk (tipp: nem lustaság), mi táplálja a belső motivációt, és hogyan bonts le egy ijesztő feladatot apró, 10 perces lépésekre.',
      tags: ['motiváció', 'halogatás', 'prokrasztináció', 'belső motiváció', 'külső motiváció', 'önrendelkezés-elmélet', 'autonómia', 'kompetencia', 'kapcsolódás', 'végrehajtási szándék', 'ha–akkor terv', 'szokás', '66 nap', 'perfekcionizmus', 'Pomodoro'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'Mindenki halogat néha. A kutatások szerint a halogatás ritkán szól a lustaságról: sokkal inkább arról, hogy egy feladat **kellemetlen érzést** kelt (unalom, szorongás, „úgysem sikerül”), és ezt az érzést szeretnénk elkerülni. Nézzük, mit lehet tenni.',
          widget: { type: 'psz-segitseg' }
        },
        {
          title: 'Miért halogatunk?',
          text: 'A halogatás lényegében **érzelemszabályozás**: a feladat helyett valami azonnal jobb érzést adó dolgot választasz (telefon, takarítás, „még egy videó”). Rövid távon megkönnyebbülsz – hosszú távon nő a stressz és a bűntudat.\n\nA halogatást gyakran erősíti:\n\n- ha a feladat **túl nagy és homályos** („tanulni a témazáróra”),\n- ha a **jutalom messze** van (a jegy csak hetek múlva),\n- **perfekcionizmus**: „ha nem lesz tökéletes, el se kezdem”,\n- **félelem a kudarctól**: ha nem próbálod igazán, nem derül ki, hogy „nem vagy elég jó”,\n- fáradtság, alváshiány.',
          tip: 'Ha a halogatás nagyon erős és szinte mindenre kiterjed, érdemes megnézni mögötte a hangulatot, az alvást vagy a figyelmet. Ilyenkor egy iskolapszichológus sokat segíthet.'
        },
        {
          title: 'Belső motiváció: mi táplálja?',
          text: 'Az **önrendelkezés-elmélet** (Deci és Ryan) szerint akkor vagyunk tartósan motiváltak, ha három alapszükségletünk teljesül:\n\n- **Autonómia:** érzed, hogy te döntesz, van beleszólásod.\n- **Kompetencia:** érzed, hogy fejlődsz, képes vagy rá.\n- **Kapcsolódás:** fontos emberekkel közösen csinálod, vagy számít nekik.\n\nEzért segít, ha **te választod meg** a módszert, ha **látod a haladást**, és ha **mással együtt** tanulsz. Részletesebben, sportolói szemmel: [[#/lecke/sport/sportpszichologia|Sportpszichológia]]; tanári szemmel: [[#/lecke/tanari/motivacio|Motiváció és osztálytermi légkör]].'
        },
        {
          title: 'Módszerek, amelyek működnek',
          text: '1. **Bontsd apró, konkrét lépésekre.** Nem „tanulok”, hanem „elolvasom a 42. oldalt, és 3 kérdést írok róla”. Az első lépés legyen nevetségesen kicsi.\n2. **Ha–akkor terv** (végrehajtási szándék): „**Ha** hazaértem és ettem, **akkor** leülök az asztalhoz, és megcsinálom az első lépést.” Ezek a tervek a kutatások szerint érezhetően növelik az esélyét, hogy tényleg megcsinálod.\n3. **10 perces szabály:** megígéred magadnak, hogy csak 10 percig csinálod. Ha utána abbahagyod, az is rendben van – de gyakran folytatod, mert a nehéz rész az indulás.\n4. **Környezet:** a telefon másik szobában, a feladat már előkészítve az asztalon.\n5. **Légy kedves magadhoz.** Kutatások szerint akik egy halogatás után **megbocsátottak maguknak**, legközelebb kevésbé halogattak, mint akik ostorozták magukat.\n\nPróbáld ki a tervezőt lent, és használd mellé a [[#/tanulas/pomodoro|Pomodoro-időzítőt]]!',
          widget: { type: 'psz-halogatas' }
        },
        {
          title: 'Szokások: mennyi idő alatt alakulnak ki?',
          text: 'Gyakran hallani, hogy „21 nap alatt kialakul egy szokás”. Ennek nincs tudományos alapja. Egy londoni vizsgálatban (Lally és munkatársai, 2010) egy új, napi szokás automatikussá válása átlagosan (mediánban) **kb. 66 napig** tartott, de nagyon nagy egyéni eltérésekkel (18-tól több mint 200 napig).\n\nA jó hír: ha egy-egy nap kimaradt, az **nem rontotta el** a folyamatot. Nem kell tökéletesnek lenni – csak visszatérni.'
        }
      ],
      quiz: [
        { q: 'Mi a halogatás leggyakoribb oka a kutatások szerint?', options: ['Lustaság', 'Túl sok szabadidő', 'A feladat által keltett kellemetlen érzés elkerülése', 'Alacsony intelligencia'], answer: 2, explain: 'A halogatás jórészt érzelemszabályozási probléma.' },
        { q: 'Melyik egy jó „ha–akkor terv”?', options: ['Majd egyszer tanulok', 'Holnaptól minden nap 5 órát tanulok', 'Ha hazaérek és ettem, akkor leülök és megoldom az első 3 feladatot', 'Akkor tanulok, ha kedvem lesz'], answer: 2, explain: 'Konkrét helyzethez (ha) köt egy konkrét, kicsi cselekvést (akkor).' },
        { q: 'Mennyi ideig tartott átlagosan (mediánban) egy új napi szokás automatikussá válása Lally és munkatársai vizsgálatában?', options: ['Kb. 66 nap', '7 nap', '21 nap', '1 év'], answer: 0, explain: 'Kb. 66 nap, 18 és több mint 200 nap közötti egyéni eltérésekkel.' }
      ]
    },
    /* ------------------------------------------------------------------ 7 */
    {
      id: 'onertekeles-testkep',
      title: 'Önértékelés, összehasonlítás, testkép',
      level: 1, minutes: 14,
      summary: 'Miért hasonlítgatjuk magunkat másokhoz, mit csinálnak a szűrők és a kiválogatott képek, hogyan alakul a testkép – és mi segít egy stabilabb önértékeléshez.',
      tags: ['önértékelés', 'önbecsülés', 'társas összehasonlítás', 'testkép', 'szűrők', 'retusálás', 'influenszer', 'önegyüttérzés', 'perfekcionizmus', 'fejlődési szemlélet', 'étkezési zavar', 'testsúly', 'testtisztelet'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'Kamaszkorban a test gyorsan változik, és közben folyamatosan látunk mások által kiválogatott, szerkesztett képeket. Nem csoda, ha sokszor nem vagyunk elégedettek magunkkal. Ebben a leckében megnézzük, honnan jön ez az érzés, és mi segíthet.',
          widget: { type: 'psz-segitseg' }
        },
        {
          title: 'Miért hasonlítgatunk?',
          text: 'A **társas összehasonlítás** természetes: már az 1950-es években leírták (Festinger), hogy másokhoz mérjük magunkat, főleg ha nincs más viszonyítási pontunk.\n\nA közösségi médiában azonban az összehasonlítás **torz**:\n\n- Mások **legjobb pillanatait** látod, a saját **hétköznapjaidhoz** méred.\n- A képek gyakran **szűrővel, retusálva, profi fényben**, sok próbálkozásból kiválasztva készülnek.\n- Az algoritmus azt mutatja többször, ami **reakciót vált ki** – gyakran a legszélsőségesebb tartalmakat.\n- Nem csak a barátaidhoz, hanem a világ legszebbnek, leggazdagabbnak tartott embereihez is mérheted magad.',
          tip: 'Egy kis kísérlet: egy hétig nézd meg, kik azok a fiókok, amelyek után rosszabbul érzed magad. Elnémíthatod vagy kikövetheted őket – ezt nem kell senkinek megindokolnod.'
        },
        {
          title: 'Testkép: a test nem projekt',
          text: 'A **testkép** az, ahogyan a saját testedet látod és érzed – és ez gyakran eltér attól, ahogyan mások látnak. A kamaszkori változások (növés, súlygyarapodás, pattanások, szőrösödés) **normálisak**, és mindenkinél más ütemben zajlanak.\n\nAmi a kutatások szerint segít:\n\n- **A test funkciójára figyelni**, nem csak a külsejére: mire képes (futni, táncolni, ölelni, alkotni).\n- **Változatos tartalmak** követése, sokféle testtel.\n- Kevesebbet beszélni a súlyról és a „hibákról” – a sajátunkról és másokéról is.\n- **Fogyókúrás tanácsokat** influenszerektől nem követni; a növésben lévő szervezetnek elég energia kell.',
          warn: 'Ha az evés, a testsúly vagy a külsőd körüli gondolatok **nagyon sok időt és szorongást** okoznak (pl. kihagysz étkezéseket, bűntudatod van evés után, túlzottan edzel a „kompenzálásért”), ez nem hiúság kérdése: beszélj róla egy felnőttel, a háziorvossal vagy hívd a **Kék Vonalat (116-111)**. Az ilyen nehézségekből van kiút, és minél korábban kérsz segítséget, annál könnyebb.'
        },
        {
          title: 'Stabilabb önértékelés',
          text: 'Az önértékelés nem attól lesz erős, hogy mindig mindenben jó vagy. Ami segít:\n\n- **Önegyüttérzés:** a kudarc után ugyanazzal a megértéssel beszélni magaddal, mint egy barátoddal. A kutatások szerint ez nem tesz „puhává” – sőt, könnyebben próbálkozol újra.\n- **Értékek a teljesítmény helyett:** mi számít neked (kedvesség, humor, kitartás, kíváncsiság)? Ezek nem függenek a lájkoktól.\n- **Fejlődési szemlélet:** a képességek gyakorlással fejlődnek. (Fontos: a „csak higgy magadban, és minden sikerül” túlzás – a kutatások szerint a szemléletformáló programok hatása kicsi. Nem a hit, hanem a **gyakorlás és a jó stratégia** visz előre.)\n- **Saját magadhoz mérni:** hol tartottál egy éve, és hol tartasz most?'
        }
      ],
      quiz: [
        { q: 'Miért torz az összehasonlítás a közösségi médiában?', options: ['Mert mindenki hazudik', 'Mert túl kevés képet látunk', 'Nem torz, pontos képet ad', 'Mert mások kiválogatott, gyakran szerkesztett pillanatait a saját hétköznapjainkhoz mérjük'], answer: 3, explain: 'A „kirakat” és a hétköznapok összevetése szisztematikusan rossz érzést kelthet.' },
        { q: 'Mi az önegyüttérzés?', options: ['Az, hogy mindig megdicséred magad', 'Kudarc után úgy bánni magaddal, ahogy egy jó baráttal tennéd', 'Önsajnálat', 'Mások hibáztatása'], answer: 1, explain: 'Megértő, nem ostorozó hozzáállás saját magunkkal.' },
        { q: 'Mi segít a pozitívabb testképben a kutatások szerint?', options: ['Napi többszöri mérlegelés', 'A test funkciójára figyelni és változatos tartalmakat követni', 'Influenszerek diétás tanácsai', 'A pattanások folyamatos nézegetése'], answer: 1, explain: 'A funkcióra figyelés és a sokszínű tartalom segít; a súlyra fókuszálás inkább ront.' }
      ]
    },
    /* ------------------------------------------------------------------ 8 */
    {
      id: 'kapcsolatok-hatarok',
      title: 'Kapcsolatok, konfliktusok, határok – bántalmazás és zaklatás felismerése',
      level: 2, minutes: 18,
      summary: 'Mitől jó egy kapcsolat, hogyan vitatkozz úgy, hogy ne romoljon el minden, hogyan húzz határt – és hogyan ismerd fel a bántalmazást, a zaklatást és az online zsarolást.',
      tags: ['kapcsolatok', 'barátság', 'párkapcsolat', 'konfliktus', 'én-üzenet', 'határok', 'nemet mondani', 'beleegyezés', 'bántalmazás', 'kontrolláló viselkedés', 'iskolai zaklatás', 'bullying', 'online zaklatás', 'cyberbullying', 'szextorzió', 'zsarolás', 'bizonyíték', 'bejelentés'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'A kapcsolataink – barátok, család, szerelem, osztálytársak – adják az életünk egyik legnagyobb örömét, és néha a legnagyobb fájdalmát. Ebben a leckében arról lesz szó, hogyan kezeld a konfliktusokat, hogyan húzz határokat, és **miről ismerheted fel**, ha egy kapcsolat már bántó.',
          widget: { type: 'psz-segitseg' }
        },
        {
          title: 'Konfliktus: nem a vita a baj, hanem a módja',
          text: 'Minden kapcsolatban vannak konfliktusok. A kérdés az, hogyan zajlanak. Ami segít:\n\n- **Én-üzenet** a te-vád helyett: „**Rosszul esett**, amikor nélkülem mentetek el” – nem „**Te mindig** kihagysz mindenből”.\n- **Egy dologról** beszélj, ne hozd elő az összes régi sérelmet.\n- **Hallgasd meg** a másikat, és mondd vissza, mit értettél („Úgy érted, hogy…?”).\n- Ha nagyon felforrósodott a helyzet, **tarts szünetet** („Most túl ideges vagyok, beszéljünk fél óra múlva”) – és tényleg térj vissza rá.\n- Nem kell mindig egyetérteni. Lehet úgy is lezárni, hogy „ebben máshogy látjuk”.'
        },
        {
          title: 'Határok: nemet mondani is lehet',
          text: 'A **határ** azt jelzi, mi fér bele neked és mi nem – a testedre, az idődre, a dolgaidra, az adataidra vonatkozóan. Egészséges kapcsolatban a határokat **tiszteletben tartják**, akkor is, ha a másik nem örül neki.\n\n- Nemet mondhatsz **magyarázkodás nélkül** is: „Nem, ezt nem szeretném.”\n- A **beleegyezés** (közös dolgokban, érintésben, szexualitásban) önkéntes, bármikor visszavonható, és csak akkor érvényes, ha tényleg szabadon adják – nyomás, fenyegetés, ittasság mellett nem.\n- Mások határait is tartsd tiszteletben: a „nem” nem „győzködj még”.\n- Ha egy kapcsolatban **folyamatosan** azt érzed, hogy a határaidat átlépik, az figyelmeztető jel.'
        },
        {
          title: 'Mikor bántalmazó egy kapcsolat?',
          text: 'A bántalmazás nemcsak fizikai lehet. Figyelmeztető jelek (barátságban, párkapcsolatban, családban):\n\n- **Kontrollálás:** ellenőrzi a telefonodat, megmondja, kivel találkozhatsz, folyamatosan tudni akarja, hol vagy.\n- **Elszigetelés:** eltávolít a barátaidtól, családodtól.\n- **Megalázás, lekicsinylés**, gúny mások előtt vagy négyszemközt.\n- **Féltékenységi jelenetek**, amelyek miatt „vigyáznod kell”, mit csinálsz.\n- **Fenyegetés** (veled, önmagával, a titkaid kiteregetésével).\n- **Nyomás** szexuális dolgokra, képek küldésére.\n- **Fizikai erőszak** bármilyen formája.\n- Utána gyakran **bocsánatkérés, ajándék, „soha többé”** – majd újrakezdődik.\n\nA bántalmazás **soha nem az áldozat hibája**.',
          warn: 'Ha veszélyben vagy, hívd a **112**-t. Ha otthon, iskolában vagy egy kapcsolatban bántanak, a **Kék Vonal (116-111)** ingyenesen, névtelenül, éjjel-nappal hívható, és segít végiggondolni a következő lépéseket.'
        },
        {
          title: 'Zaklatás – az iskolában és online',
          text: 'Az **iskolai zaklatás** (bullying) **ismétlődő**, **szándékos** bántás, ahol **erőkülönbség** van (pl. többen egy ellen). Lehet testi, verbális (csúfolás), kapcsolati (kiközösítés, pletyka) vagy **online** (megalázó képek, csoportokból kizárás, gyűlöletkommentek, álprofil).\n\nAz online zaklatás különösen nehéz, mert **nincs vége a csengetéssel**, és sokan láthatják. Ha veled történik:\n\n1. **Ne válaszolj** bosszúval – az gyakran csak fokozza.\n2. **Ments bizonyítékot:** képernyőkép, dátum, felhasználónév.\n3. **Blokkold és jelentsd** a felhasználót a platformon.\n4. **Szólj** egy felnőttnek, akiben megbízol (szülő, osztályfőnök, iskolapszichológus). Nem árulkodás: a zaklatás megállításához segítség kell.\n\n**Ha szemtanú vagy:** már az is sokat számít, ha nem nevetsz, nem osztod meg, és privátban odaírsz az áldozatnak, hogy „nem vagy egyedül”. Ha biztonságos, szólj egy felnőttnek.'
        },
        {
          title: 'Intim képek és zsarolás',
          text: 'Egyre gyakoribb csapda: valaki (sokszor álprofillal) bizalmat épít, intim képet kér, aztán **pénzt vagy újabb képeket követel**, különben „mindenkinek elküldi” (**szextorzió**).\n\n- **Ne fizess és ne küldj több képet** – a zsarolás ettől ritkán áll le.\n- **Ments bizonyítékot**, ne töröld a beszélgetést, de szakítsd meg a kapcsolatot.\n- **Szólj** egy felnőttnek, és fordulj a **rendőrséghez (112)**. Te vagy az áldozat – nem kell szégyellned.\n- Kiskorúról készült szexuális kép **továbbküldése bűncselekmény** lehet akkor is, ha „csak poénból” történik. Ha kapsz ilyet, ne küldd tovább.\n\nAz online biztonsági alapokról: [[#/lecke/informatika/adatbiztonsag|Adatbiztonság]].'
        }
      ],
      quiz: [
        { q: 'Melyik egy jó „én-üzenet”?', options: ['Te mindig csak magaddal törődsz!', 'Soha nem lehet rád számítani.', 'Mindenki szerint önző vagy.', 'Rosszul esett, hogy nem szóltál, amikor elmentetek.'], answer: 3, explain: 'Az én-üzenet a saját érzésedről szól, nem vádol.' },
        { q: 'Mi NEM az iskolai zaklatás jellemzője?', options: ['Egyetlen, kölcsönös vita két egyenrangú barát között', 'Ismétlődő', 'Szándékos', 'Erőkülönbség van a felek között'], answer: 0, explain: 'Egy egyszeri, egyenrangú vita konfliktus, nem zaklatás.' },
        { q: 'Mit tegyél, ha intim képpel zsarolnak?', options: ['Fizess, hogy leálljon', 'Küldj még képet, hogy megnyugodjon', 'Ne fizess, ments bizonyítékot, szólj felnőttnek és a rendőrségnek', 'Töröld az összes üzenetet és hallgass'], answer: 2, explain: 'A fizetés ritkán állítja le a zsarolást; a bizonyíték és a segítség igen.' }
      ]
    },
    /* ------------------------------------------------------------------ 9 */
    {
      id: 'gondolkodasi-csapdak',
      title: 'Gondolkodási csapdák és manipuláció',
      level: 2, minutes: 17,
      summary: 'Gondolkodási torzítások, amelyek elrontják a hangulatot („katasztrofizálás”, „gondolatolvasás”), kognitív torzítások, amelyek a döntéseinket befolyásolják – és a manipuláció tipikus trükkjei.',
      tags: ['kognitív torzítás', 'gondolkodási torzítás', 'mindent vagy semmit', 'katasztrofizálás', 'túláltalánosítás', 'gondolatolvasás', 'címkézés', 'érzelmi érvelés', 'megerősítési torzítás', 'elérhetőségi heurisztika', 'horgonyhatás', 'manipuláció', 'gázlángozás', 'szűkösség', 'viszonosság', 'sötét minták', 'álhír'],
      terms: ['valszam/korrelacio-oksag'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'Az agyunk sokszor **gyorsítókat** használ: ezek általában jól működnek, de néha szisztematikusan félrevisznek. Egyes torzítások a **hangulatunkat** rontják, mások a **döntéseinket** befolyásolják – és vannak, akik ezt ki is használják. Ha ismered a csapdákat, könnyebb elkerülni őket.',
          widget: { type: 'psz-segitseg' }
        },
        {
          title: 'Hangulatrontó gondolati csapdák',
          text: 'Aaron **Beck** pszichiáter az 1960-as években vette észre, hogy a nehéz időszakokban az emberek gondolatai jellegzetes mintákba rendeződnek. Ezekre épül a **kognitív viselkedésterápia** (KVT) is. A leggyakoribbak:\n\n- **Mindent vagy semmit:** „Ha nem ötös, akkor kudarc.”\n- **Túláltalánosítás:** „Megint elrontottam, **soha** semmi nem sikerül.”\n- **Katasztrofizálás:** „Ha elrontom a felelést, megbukom, és vége az életemnek.”\n- **Gondolatolvasás:** „Biztos hülyének tartanak.” (Honnan tudod?)\n- **Jóslás:** „Úgyis rossz lesz a buli.”\n- **Mentális szűrő:** tíz dicséretből csak az egy kritikára emlékszel.\n- **Címkézés:** „Lúzer vagyok” – egy hibából az egész személyre következtetni.\n- **„Kell”-állítások:** „Mindig tökéletesnek kell lennem.”\n- **Érzelmi érvelés:** „Úgy érzem, hogy ciki vagyok, tehát az vagyok.”\n- **Személyre vonatkoztatás:** „Azért rossz a hangulata, mert én valamit elrontottam.”\n\nEzek **mindenkinél előfordulnak**. Nem az a cél, hogy soha ne legyenek ilyen gondolataid, hanem hogy **észrevedd** őket, és megkérdezd: „Mi a bizonyíték? Mit mondanék egy barátomnak ugyanebben a helyzetben?”',
          widget: { type: 'psz-csapda' }
        },
        {
          title: 'Döntési torzítások: amikor az agy rövidít',
          text: 'Daniel **Kahneman** és Amos **Tversky** kutatásai megmutatták, hogy az emberi döntések rendszeresen eltérnek a „tökéletesen logikustól”:\n\n- **Megerősítési torzítás:** azokat az információkat keressük és hisszük el, amelyek **igazolják**, amit már gondolunk.\n- **Elérhetőségi torzítás:** ami könnyen eszünkbe jut (pl. egy látványos hír), azt gyakoribbnak hisszük. Ezért félünk jobban a repülőtől, mint az autótól, pedig statisztikailag az autó a kockázatosabb.\n- **Horgonyhatás:** az első szám, amit hallunk, befolyásolja a becslésünket („eredeti ár 20 000 Ft, most csak 9 990!”).\n- **Csordahatás:** ha sokan csinálják, biztos jó.\n- **Túlzott magabiztosság:** a legtöbben átlag felettinek hisszük magunkat sok területen.\n\nA hírek és álhírek kezeléséről: [[#/lecke/allampolgari/mediatudatossag|Médiatudatosság]].'
        },
        {
          title: 'A manipuláció tipikus trükkjei',
          text: 'A **manipuláció** olyan befolyásolás, amely a tudtod nélkül, a te érdekeid ellenére próbál rávenni valamire. Gyakori eszközök:\n\n- **Szűkösség és sürgetés:** „Csak még 2 darab!”, „Az ajánlat 10 perc múlva lejár!” – hogy ne gondold végig.\n- **Viszonosság kihasználása:** kapsz egy apró „ajándékot”, és kötelességednek érzed viszonozni.\n- **Láb az ajtóban:** egy kis kéréssel kezdik, aztán egyre nagyobbat kérnek.\n- **Szeretetbombázás:** egy új ismerős szokatlanul gyorsan, nagyon intenzíven kedves – aztán kér valamit (pénzt, képet, titkot).\n- **Gázlángozás:** valaki rendszeresen kétségbe vonja az emlékeidet, érzéseidet („ezt csak képzeled”, „túl érzékeny vagy”), amíg már a saját ítéletedben sem bízol.\n- **Bűntudatkeltés:** „Ha tényleg a barátom lennél, megtennéd.”\n- **Sötét minták** az appokban: nehezen megtalálható lemondás gomb, előre bepipált előfizetés, hamis visszaszámláló.\n\nKutatások szerint ha előre megismered a trükköket (ezt hívják **„oltásnak”** vagy prebunkingnak), később jobban felismered őket.',
          tip: 'Jó kérdés minden nyomás alatt: „Mi történne, ha most nem döntenék, hanem aludnék rá egyet?” Ha a válasz az, hogy „akkor elveszítem” – ez gyakran éppen a manipuláció jele.'
        }
      ],
      quiz: [
        { q: '„Elrontottam ezt a dolgozatot, úgyis soha semmi nem sikerül.” Melyik gondolati csapda ez?', options: ['Horgonyhatás', 'Viszonosság', 'Túláltalánosítás', 'Csordahatás'], answer: 2, explain: 'Egyetlen esetből általános („soha semmi”) következtetés.' },
        { q: 'Mi a megerősítési torzítás?', options: ['Hajlam arra, hogy a már meglévő véleményünket igazoló információkat keressük és higgyük el', 'Ha valamit sokszor ismételnek, elfelejtjük', 'Az első szám befolyásolja a becslésünket', 'Mindenki átlag felettinek hiszi magát'], answer: 0, explain: 'A meglévő nézetünket megerősítő infókat részesítjük előnyben.' },
        { q: 'Egy webshop „még 3 perc és lejár az ajánlat!” visszaszámlálót mutat. Melyik trükköt használja?', options: ['Viszonosság', 'Gázlángozás', 'Önegyüttérzés', 'Szűkösség és sürgetés'], answer: 3, explain: 'A sürgetés azt akarja elérni, hogy ne gondold végig a döntést.' }
      ]
    },
    /* ------------------------------------------------------------------ 10 */
    {
      id: 'segitsegkeres',
      title: 'Mikor és hol kérj segítséget?',
      level: 1, minutes: 14,
      summary: 'Honnan tudhatod, hogy már nem „csak egy rossz hét”, kihez fordulhatsz (ingyenesen is), mi a különbség pszichológus és pszichiáter között – és hogyan segíts egy barátodnak.',
      tags: ['segítségkérés', 'Kék Vonal', '116-111', '116-123', '112', 'lelki elsősegély', 'iskolapszichológus', 'pedagógiai szakszolgálat', 'háziorvos', 'pszichológus', 'pszichiáter', 'pszichoterápia', 'gyermekjóléti szolgálat', 'barát segítése', 'mentális egészség'],
      sections: [
        {
          title: 'Miről lesz szó?',
          text: 'Segítséget kérni **nem gyengeség**: a legtöbb nehézség jobban kezelhető, ha nem egyedül cipeled. Ebben a leckében összegyűjtöttük, **kihez fordulhatsz**, és mit várhatsz tőlük.',
          widget: { type: 'psz-segitseg', options: { full: true } }
        },
        {
          title: 'Mikor érdemes segítséget kérni?',
          text: 'Rossz napok, szomorú hetek mindenkinek vannak. Érdemes beszélni valakivel – szülővel, tanárral, iskolapszichológussal, orvossal –, ha például:\n\n- **két hétnél tovább** tart a levertség, üresség, szorongás vagy ingerlékenység,\n- **már nem megy** a mindennapi élet: iskola, barátok, alvás, evés jelentősen megváltozott,\n- olyan dolgokat **kerülsz**, amiket korábban szerettél,\n- **alkoholt, drogot** vagy más szert használsz, hogy elviseld a helyzetet,\n- valaki **bánt** otthon, az iskolában vagy online,\n- vagy egyszerűen **úgy érzed, sok** – ez is elég ok.\n\nEz a lista **nem diagnózis**. Csak a szakember tudja megítélni, mi áll a háttérben – és sokszor már egy-két beszélgetés is sokat segít.',
          warn: 'Ha arra gondolsz, hogy bántanád magad, vagy hogy nem akarsz tovább élni, **most** szólj valakinek: hívd a **116-111**-et (Kék Vonal) vagy a **116-123**-at, azonnali veszélyben a **112**-t, vagy szólj egy felnőttnek a közeledben. Ezek az érzések elmúlhatnak, és van, aki segít.'
        },
        {
          title: 'Kihez fordulhatsz?',
          text: '**Azonnal, telefonon (ingyenes, névtelen, éjjel-nappal):**\n\n- **Kék Vonal – 116-111:** gyerekeknek és fiataloknak (24 év alatt). Chates segítség is van a kek-vonal.hu oldalon (az aktuális időpontokat ott találod).\n- **Lelki Elsősegély Telefonszolgálat – 116-123:** bármilyen korú embernek, aki krízisben van vagy beszélgetni szeretne.\n- **112:** ha életveszély vagy közvetlen veszély van.\n\n**Az iskolában és a lakóhelyeden (ingyenes):**\n\n- **Iskolapszichológus**, osztályfőnök, iskolai szociális segítő.\n- **Pedagógiai szakszolgálat** (nevelési tanácsadás): pszichológusok, akikhez szülővel vagy iskolai javaslatra lehet fordulni.\n- **Család- és gyermekjóléti szolgálat:** ha otthon van baj.\n- **Háziorvos:** ő is az első lépés lehet, és szükség esetén továbbküld szakemberhez (pl. gyermek- és ifjúságpszichiátriára).\n\nAz egészségügyi ügyintézésről (háziorvos, ügyelet): [[#/lecke/felnott-elet/egeszsegugy|Egészségügyi ügyintézés]].'
        },
        {
          title: 'Ki kicsoda? Pszichológus, pszichiáter, terapeuta',
          text: '- **Pszichológus:** egyetemen pszichológiát végzett szakember; beszélgetéssel, tesztekkel, tanácsadással segít. **Gyógyszert nem írhat fel.**\n- **Klinikai szakpszichológus:** egészségügyi szakképesítéssel diagnózist is felállíthat és terápiát végezhet.\n- **Pszichiáter:** **orvos**, aki a lelki betegségekre szakosodott; diagnosztizál, és ha szükséges, **gyógyszert is felírhat**.\n- **Pszichoterapeuta:** pszichológus vagy orvos, aki egy terápiás módszerben (pl. kognitív viselkedésterápia) külön képzést végzett.\n\nAz, hogy valaki szakemberhez jár, **nem azt jelenti, hogy „őrült”**: ugyanolyan természetes, mint ha egy fájó térddel gyógytornászhoz mész.',
          tip: 'A gyógyszeres kezelésről mindig orvos dönt, egyénre szabva. Soha ne szedj másnak felírt gyógyszert, és ne hagyd abba orvosi egyeztetés nélkül a sajátodat.'
        },
        {
          title: 'Ha egy barátod van bajban',
          text: '- **Hallgasd meg** ítélkezés nélkül. Nem kell megoldást adnod; az is sokat ér, hogy ott vagy.\n- **Kérdezz** egyenesen, ha aggódsz: „Jól vagy? Láttam, hogy mostanában nagyon le vagy törve.”\n- **Ne ígérj titoktartást**, ha a barátod veszélyben van. Mondd meg neki, hogy azért szólsz egy felnőttnek, mert fontos neked.\n- **Bátorítsd**, hogy kérjen segítséget, és ajánld fel, hogy elkíséred vagy ott leszel, amíg telefonál.\n- **Vigyázz magadra is:** egy barát lelki terhét nem kell egyedül cipelned. Te is felhívhatod a Kék Vonalat, ha aggódsz valakiért.'
        }
      ],
      quiz: [
        { q: 'Melyik számon érik el a fiatalok ingyenesen, éjjel-nappal a Kék Vonalat?', options: ['112', '116-111', '107', '104'], answer: 1, explain: 'A Kék Vonal 116-111 ingyenes, névtelen, és éjjel-nappal hívható.' },
        { q: 'Mi a különbség a pszichológus és a pszichiáter között?', options: ['Nincs különbség', 'A pszichiáter orvos, és gyógyszert is felírhat; a pszichológus nem', 'A pszichológus orvos, a pszichiáter nem', 'Csak a pszichológus beszélget'], answer: 1, explain: 'A pszichiáter orvosi végzettségű; gyógyszert csak orvos írhat fel.' },
        { q: 'A barátod elmondja, hogy bántani akarja magát, és megkér, hogy ne mondd el senkinek. Mit tegyél?', options: ['Tartsd titokban, mert megígérted', 'Ne foglalkozz vele, biztos csak figyelmet akar', 'Írd ki a közösségi médiába', 'Mondd meg neki, hogy szólsz egy felnőttnek, mert fontos neked, és segíts, hogy segítséget kapjon'], answer: 3, explain: 'Veszély esetén a biztonság fontosabb a titoktartásnál; vonj be felnőttet vagy hívd a 116-111-et.' }
      ]
    }
  ]
});
