/* Tantárgy: Önálló élet és háztartás (felnőtt élet) */
STUDIE.addSubject({
  id: 'haztartas',
  stage: 'elet',
  title: 'Önálló élet és háztartás',
  icon: '🏠',
  color: '#c0703a',
  description: 'Főzés és ételbiztonság, mosás és takarítás, apró javítások, elsősegély, energiatakarékosság, tanulás és lelki egészség: amire az első saját lakásban szükséged lesz.',
  intro: 'Amikor először élsz egyedül (kollégiumban, albérletben vagy a saját lakásodban), hirtelen rengeteg dolgot kell tudnod, amit az iskola nem tanít: mit főzz olcsón és biztonságosan, miért lett rózsaszín a fehér pólód, mit csinálj, ha lecsapott a kismegszakító, és mit tegyél, ha valaki összeesik melletted.\n\nEbben a tantárgyban **gyakorlati tudást** kapsz, a „miért”-tel együtt. A pénzügyi oldalt (költségvetés, rezsi, számlák) a [[#/tantargy/penzugy|Pénzügyi ismeretek]] és a [[#/tantargy/penz-mindennap|Pénz a mindennapokban]] tantárgy tárgyalja.\n\nFontos: az elsősegély-lecke **nem helyettesíti a gyakorlati tanfolyamot**, a lelki egészségről szóló lecke pedig **nem orvosi tanács**. Ha baj van, hívd a **112**-t vagy kérj szakembertől segítséget.',
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 'fozes-alapok',
      title: 'Főzés alapjai és ételbiztonság',
      level: 1, minutes: 14,
      summary: 'Bevásárlólista, olcsó és laktató főzés, alapreceptek logikája, hűtés, átsütés, keresztszennyeződés és a lejárati dátumok.',
      tags: ['főzés', 'bevásárlás', 'bevásárlólista', 'ételbiztonság', 'hűtő', 'keresztszennyeződés', 'lejárati idő', 'minőségét megőrzi', 'fogyasztható', 'maradék', 'meal prep', 'élelmiszer-pazarlás'],
      sections: [
        {
          title: 'Tervezés és bevásárlólista',
          text: 'A spórolós főzés **a boltba indulás előtt** kezdődik.\n\n1. Nézd meg, mi van otthon (hűtő, kamra, fagyasztó).\n2. Tervezz meg 3–5 főételt a hétre, és gondold végig, mit tudsz **többször felhasználni** (pl. egy csomag csirkecomb két ételhez).\n3. Írj **listát**, és a boltban tartsd magad hozzá.\n4. Ne menj éhesen vásárolni: az éhes vásárló több és drágább dolgot vesz.\n\nÁrösszehasonlításnál ne a dobozon lévő árat nézd, hanem az **egységárat** (Ft/kg, Ft/l), amit a polccímkén kötelező feltüntetni. A „nagy kiszerelés” nem mindig olcsóbb, és ha a fele megromlik, biztosan nem az.',
          tip: 'Pénzbeosztáshoz lásd: [[#/lecke/penzugy/koltsegvetes|Költségvetés és pénzbeosztás]]. Az élelmiszer sok háztartásban a legnagyobb változó kiadás.'
        },
        {
          title: 'Olcsón, laktatóan, egészségesen',
          text: 'Egy jó, olcsó étel általában három részből áll:\n\n- **Szénhidrát-alap**: rizs, tészta, burgonya, kenyér, zab, köles.\n- **Fehérje**: hüvelyesek (lencse, bab, csicseriborsó), tojás, túró, csirke, darált hús, konzervhal.\n- **Zöldség**: szezonális friss vagy **fagyasztott** zöldség (ez utóbbi tápértékben nem rosszabb, és nem romlik meg).\n\nA **hüvelyesek** a legolcsóbb fehérjeforrások közé tartoznak, és jól bírják a tárolást. Az **egytálételek** (lecsó, rakott krumpli, lencsefőzelék, chili, rizottó) egyszerre olcsók, laktatók, és jól eltehetők.\n\n**Főzz egyszerre többet** (pl. 4 adagot), és porciózd ki dobozokba: ez időt, energiát és pénzt is spórol.'
        },
        {
          title: 'Alapreceptek: a minta, nem a recept számít',
          text: 'Nem kell száz receptet megtanulnod, elég néhány **alapmintát**, és azokat variálhatod:\n\n- **Pirítás + folyadék + főzés**: hagymát pirítasz, hozzáadod a fő alapanyagot, felöntöd vízzel/alaplével, és puhára főzöd (pörkölt, leves, főzelék, chili).\n- **Rizs/tészta**: sós, forrásban lévő víz, a csomagoláson lévő főzési idő; a rizs kb. `1 rész rizs : 1,5–2 rész víz`.\n- **Sütőben sütés**: zöldség + hús/tofu egy tepsiben, olaj, fűszer, 180–200 °C.\n- **Tojás**: rántotta, főtt tojás (kemény: forrástól kb. 9–10 perc), omlett.\n\nAz ízt a **só, sav** (citrom, ecet, paradicsom), **zsiradék** és a **fűszerek** egyensúlya adja. Ha valami „lapos”, sokszor csak egy csipet só vagy pár csepp citrom hiányzik.'
        },
        {
          title: 'Ételbiztonság: hideg, meleg, tiszta',
          text: 'A baktériumok a **„veszélyes zónában”**, kb. **5 °C és 60 °C között** szaporodnak a leggyorsabban. Ebből három szabály következik:\n\n1. **Hűtsd!** A hűtő legyen **5 °C alatt** (ideális kb. 4 °C), a fagyasztó −18 °C-on. A romlandó ételt ne hagyd 2 óránál tovább szobahőn.\n2. **Süsd át!** A darált hús, a szárnyas és a tojásos ételek legyenek **teljesen átsütve** (a maghőmérséklet legalább kb. 75 °C, a csirkehús belül ne legyen rózsaszín, a leve tiszta legyen).\n3. **Ne keverd!** A **keresztszennyeződés** azt jelenti, hogy a nyers húsról a baktérium átkerül a kész ételre: ugyanaz a vágódeszka, kés vagy kéz. Nyers húshoz külön deszka, utána mosogatás forró, mosogatószeres vízzel, és **kézmosás**.\n\nA nyers csirkét **ne mosd meg** a csap alatt: a fröccsenő víz szétteríti a baktériumokat a konyhában, a sütés pedig úgyis elpusztítja őket.',
          warn: 'Fagyasztott húst a **hűtőben** olvassz ki (vagy mikróban, és azonnal főzd meg), ne a konyhapulton egész nap.',
          tip: 'Részletesebben, szakmai szinten: [[#/lecke/szakacs/higienia|Élelmiszer-biztonság és higiénia]] és [[#/lecke/szakacs/homerseklet|Hőmérsékletek és tárolás]].'
        },
        {
          title: '„Fogyasztható” vagy „minőségét megőrzi”?',
          text: 'A csomagoláson kétféle dátum szerepelhet, és **nem ugyanazt jelentik**:\n\n- **„Fogyasztható: …”** (angolul „use by”): **romlandó** termékeken (friss hús, hal, tejtermékek egy része). Ez **biztonsági határ**: utána ne edd meg, akkor sem, ha jónak tűnik.\n- **„Minőségét megőrzi: …”** (angolul „best before”): tartós termékeken (tészta, rizs, konzerv, keksz, csoki). Ez **minőségi** dátum: utána is fogyasztható lehet, ha a csomagolás ép, és a termék kinézete, szaga, íze rendben van.\n\nAz élelmiszer-pazarlás jelentős része abból adódik, hogy a „minőségét megőrzi” dátum után kidobjuk a még jó ételt. A „fogyasztható” dátumot viszont **tartsd be**.',
          warn: 'Felpuffadt, horpadt-varratos vagy szisszenve nyíló **konzervet** soha ne egyél meg, dátumtól függetlenül: ez botulizmus (súlyos mérgezés) jele lehet.'
        },
        {
          title: 'Maradékok okosan',
          text: '- A főtt ételt **gyorsan hűtsd le** (kisebb, lapos dobozokba szedve), és 2 órán belül tedd a hűtőbe.\n- Hűtőben a főtt étel általában **2–3 napig** biztonságos; ha tovább tartanád, **fagyaszd le** (címkézd fel dátummal!).\n- Újramelegítéskor **forrósítsd fel alaposan**, és csak egyszer melegítsd újra.\n- A **főtt rizs** különösen kényes: szobahőn hagyva olyan baktérium (Bacillus cereus) szaporodhat el benne, amelynek a mérge a melegítést is túléli. Gyorsan hűtsd le, és egy napon belül edd meg.\n\nA „**előbb az, ami régebbi**” elv (FIFO) a hűtőben is működik: az újonnan vett dolgok hátra, a régebbiek előre.'
        }
      ],
      quiz: [
        { q: 'Hány fok alatt legyen a hűtőszekrény?', options: ['0 °C', '10 °C', '15 °C', '5 °C'], answer: 3, explain: 'A hűtő 5 °C alatt (ideális kb. 4 °C) lassítja jelentősen a baktériumok szaporodását.' },
        { q: 'Mit jelent a „Minőségét megőrzi: …” felirat?', options: ['A bolt eladási határideje, a vásárlónak nem számít', 'Utána azonnal mérgező', 'A gyártás dátuma', 'Minőségi dátum: utána is fogyasztható lehet, ha a termék rendben van'], answer: 3, explain: 'A „minőségét megőrzi” tartós termékeken szerepel, és a minőséget garantálja; a „fogyasztható” dátum a biztonsági határ.' },
        { q: 'Melyik a keresztszennyeződés példája?', options: ['A kenyeret a hűtőben tárolod', 'A nyers csirkét vágod, majd ugyanazon a deszkán mosatlanul salátát szeletelsz', 'Túl sok sót teszel az ételbe', 'A levest túl sokáig főzöd'], answer: 1, explain: 'A nyers húsról a baktériumok a deszkán át a nyersen fogyasztott salátára kerülnek.' },
        { q: 'Mi az egységár?', options: ['Az ár egy kilogrammra vagy literre vetítve', 'A legkisebb kiszerelés ára', 'A törzsvásárlói kedvezmény', 'A termék ára áfa nélkül'], answer: 0, explain: 'Az egységár (Ft/kg, Ft/l) alapján lehet igazán összehasonlítani a különböző kiszereléseket.' },
        { q: 'Miért nem érdemes a nyers csirkét a csap alatt megmosni?', options: ['Mert a fröccsenő víz szétteríti a baktériumokat a konyhában', 'Mert drága a víz', 'Mert elveszíti az ízét', 'Mert megkeményedik'], answer: 0, explain: 'A mosás nem öli meg a baktériumokat, csak szétszórja őket; az alapos sütés pusztítja el őket.' },
        { q: 'Melyik a legolcsóbb fehérjeforrások egyike?', options: ['Marhabélszín', 'Fehérjeszelet', 'Lazac', 'Lencse és bab'], answer: 3, explain: 'A száraz hüvelyesek olcsók, sokáig eltarthatók, és sok fehérjét tartalmaznak.' },
        { q: 'Mennyi ideig tárolható általában biztonságosan a főtt étel a hűtőben?', options: ['2–3 óráig', 'Korlátlanul', '2–3 hétig', '2–3 napig'], answer: 3, explain: 'Hűtőben kb. 2–3 nap; ha tovább tartanád, fagyaszd le.' },
        { q: 'Hogyan olvassz ki fagyasztott húst?', options: ['Meleg vízben, egy éjszakán át', 'A hűtőszekrényben (vagy mikróban, utána azonnal megfőzve)', 'Napon, az ablakpárkányon', 'Egész nap a konyhapulton'], answer: 1, explain: 'A hűtőben a hús felülete sem kerül a veszélyes 5–60 °C-os zónába.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'mosas-takaritas',
      title: 'Mosás, takarítás és tisztítószerek',
      level: 1, minutes: 13,
      summary: 'Mosási címkék, válogatás, hőfok, folttisztítás, takarítási rutin és a tisztítószerek biztonságos használata: soha ne keverj hipót savval vagy ammóniával!',
      tags: ['mosás', 'mosási címke', 'kezelési jelek', 'szétválogatás', 'folttisztítás', 'takarítás', 'tisztítószer', 'hipó', 'klór', 'ecet', 'GHS piktogram', 'penész', 'szellőztetés'],
      sections: [
        {
          title: 'A mosási címke jelei',
          text: 'Minden ruhadarabban van egy kis **kezelési címke** öt alapjellel:\n\n- **Mosóteknő** = mosás. A benne lévő szám a **legmagasabb hőfok** (30, 40, 60, 95 °C). Alatta egy vonal: kímélő program; két vonal: nagyon kímélő (gyapjú, selyem). **Kéz** a teknőben: csak kézi mosás. Áthúzott teknő: nem mosható.\n- **Háromszög** = fehérítés. Üres háromszög: bármilyen fehérítő; két ferde csíkkal: csak oxigénes (nem klóros); áthúzva: tilos fehéríteni.\n- **Négyzet benne körrel** = szárítógép. A pöttyök száma a hőfok (1 pötty: alacsony, 2: normál); áthúzva: ne tedd szárítógépbe.\n- **Vasaló**: 1 pötty kb. 110 °C (műszál), 2 pötty kb. 150 °C (gyapjú, selyem), 3 pötty kb. 200 °C (pamut, len).\n- **Kör** = vegytisztítás (a betű a szakembernek szól).',
          tip: 'Ha bizonytalan vagy: a **30 °C-os, kímélő** mosás szinte mindennek jó, és energiát is spórol.'
        },
        {
          title: 'Válogatás, adagolás, program',
          text: '1. **Válogasd szét** a ruhát: fehér, világos, sötét, színes. Az új, élénk színű ruha (főleg piros, farmer) az első néhány mosásnál **kifoghat**, ezért mosd külön.\n2. **Ürítsd ki a zsebeket** (papír zsebkendő, toll, pénz), húzd fel a cipzárt, a pulóvert fordítsd ki.\n3. **Ne töltsd túl** a dobot: kb. egy tenyérnyi helynek fent maradnia kell.\n4. A mosószert a **csomagoláson lévő adagolás** szerint mérd: a több nem tisztít jobban, csak nehezebben öblíthető ki, és bőrirritációt okozhat.\n5. Mosás után **azonnal** teregesd ki, különben dohos szagú lesz.\n\nA törölközőt, ágyneműt általában **60 °C**-on érdemes mosni (higiénia), a mindennapi ruhát 30–40 °C-on.'
        },
        {
          title: 'Folttisztítás',
          text: 'Az aranyszabály: **minél hamarabb**, és **ne dörzsöld**, hanem itasd fel, kívülről befelé haladva.\n\n- **Vér, tojás, tej** (fehérjefoltok): **hideg** vízzel! A meleg víz „belesüti” a fehérjét a szálakba.\n- **Zsír, olaj**: mosogatószer vagy epeszappan, bedörzsölve, majd a címke szerinti legmelegebb vízzel.\n- **Kávé, tea, gyümölcs**: hideg vizes öblítés, majd folttisztító vagy oxigénes fehérítő (ha a címke engedi).\n- **Fű, sár**: hagyd megszáradni a sarat, kefézd ki, utána előkezelés.\n\nMindig próbáld ki a szert egy **nem látható helyen**, és nézd meg a címkét. Szárítógépbe csak akkor tedd a ruhát, ha a folt már **eltűnt**: a hő véglegesen rögzíti.'
        },
        {
          title: 'Takarítási rutin',
          text: 'Könnyebb rendszeresen keveset, mint ritkán sokat takarítani.\n\n- **Naponta**: mosogatás (vagy mosogatógép), konyhapult letörlése, szemét kivitele, szellőztetés.\n- **Hetente**: porszívózás/felmosás, fürdőszoba (WC, mosdó, zuhany), ágyneműcsere 1–2 hetente, a hűtő átnézése.\n- **Havonta**: hűtő kitakarítása, mosógép tisztítása (üres, forró program; a gumiharmonika és a szűrő kitisztítása), páraelszívó-szűrő.\n\nA **penész** a nedves, rosszul szellőző helyeken jelenik meg. A legjobb megelőzés a **rendszeres szellőztetés**: naponta többször 5–10 perc **kereszthuzat** (a résnyire nyitott, bukóra állított ablak télen pazarló és kevésbé hatásos), főzés és zuhanyzás után különösen.'
        },
        {
          title: 'Tisztítószerek: ami együtt mérgező',
          text: 'A háztartási vegyszerek önmagukban, a címke szerint használva biztonságosak, de **összekeverve veszélyesek** lehetnek.\n\n- **Hipó (klóros fehérítő, nátrium-hipoklorit) + savas szer** (vízkőoldó, ecet, egyes WC-tisztítók): **mérgező klórgáz** szabadul fel.\n- **Hipó + ammóniás szer** (egyes ablaktisztítók): mérgező **klóramin** gázok keletkeznek.\n- **Hipó + alkohol**, vagy két különböző lefolyótisztító: szintén veszélyes reakciók.\n\nEzért: **egyszerre csak egy szert** használj, közben **szellőztess**, és két szer között öblítsd le a felületet bő vízzel.\n\nA **„természetes” szerek** is vegyszerek: az ecet sav (a vízkövet jól oldja), a szódabikarbóna enyhe lúg. Ezek kevésbé agresszívek, de **márványt** és egyes természetes köveket az ecet is megtámad.',
          warn: '**SOHA ne keverd a hipót savas szerrel vagy ammóniával!** Ha mégis köhögtető, szúrós szagú gáz keletkezik: azonnal hagyd el a helyiséget, nyiss ablakot (ha biztonságosan megteheted), és panasz esetén hívd a **112**-t.'
        },
        {
          title: 'Olvasd el a címkét: a GHS piktogramok',
          text: 'A vegyszerek csomagolásán a nemzetközi **GHS (CLP) piktogramok** mutatják a veszélyt: fehér alapon **piros keretes rombusz**, benne fekete ábra.\n\n- **Maró hatás** (kézre és fémre csepegő folyadék): erős savak és lúgok, pl. lefolyótisztító, vízkőoldó. Kesztyű, védőszemüveg!\n- **Felkiáltójel**: irritáló, ártalmas (bőr, szem, légút).\n- **Lángoló láng**: tűzveszélyes (pl. spray-k, oldószerek).\n- **Halálfej**: akut mérgező.\n- **Halott fa és hal**: környezetre veszélyes, ne öntsd a lefolyóba nagy mennyiségben.\n\nA vegyszert tartsd az **eredeti csomagolásában** (soha ne üdítős palackban!), **gyerekek elől elzárva**. Ha valaki lenyelt egy vegyszert: ne hánytasd, hívd a **112**-t, és vidd magaddal a flakont.',
          tip: 'A savak és lúgok kémiájáról: [[#/lecke/kem-alap/savak-lugok|Savak és lúgok]].'
        }
      ],
      quiz: [
        { q: 'Mit jelent a mosóteknő jelben lévő „40”?', options: ['40%-os töltöttséget', '40 perces programot', 'Pontosan 40 °C-on kell mosni', 'Legfeljebb 40 °C-on mosható'], answer: 3, explain: 'A szám a megengedett legmagasabb mosási hőfok.' },
        { q: 'Milyen vízzel kezeld a vérfoltot?', options: ['Ecettel, majd szárítógéppel', 'Hideg vízzel', 'Hipóval', 'Forró vízzel'], answer: 1, explain: 'A vér fehérjefolt: a meleg víz kicsapja és rögzíti a fehérjét a szálakban.' },
        { q: 'Mi keletkezik, ha hipót savas vízkőoldóval keversz?', options: ['Szén-dioxid', 'Erősebb, biztonságos tisztítószer', 'Mérgező klórgáz', 'Ártalmatlan hab'], answer: 2, explain: 'Savas közegben a hipoklorit klórgázt fejleszt, ami súlyosan károsítja a légutakat.' },
        { q: 'Mit jelent az áthúzott háromszög a ruhacímkén?', options: ['Nem vasalható', 'Nem mosható', 'Tilos fehéríteni', 'Szárítógépbe tehető'], answer: 2, explain: 'A háromszög a fehérítés jele; áthúzva: semmilyen fehérítő nem használható.' },
        { q: 'Hogyan szellőztess télen a leghatékonyabban?', options: ['Naponta többször 5–10 percig, tárt ablakokkal, kereszthuzattal', 'Csak nyáron kell szellőztetni', 'Egész nap bukóra nyitott ablakkal', 'Sehogy, mert drága a fűtés'], answer: 0, explain: 'A rövid, intenzív szellőztetés gyorsan kicseréli a párás levegőt, a falak közben nem hűlnek ki.' },
        { q: 'Mit jelez a maró hatás GHS piktogramja?', options: ['Tűzveszélyt', 'Hogy a szer kimarja a bőrt és a fémet', 'Robbanásveszélyt', 'Környezeti veszélyt'], answer: 1, explain: 'A maró szereknél (lefolyótisztító, vízkőoldó) kesztyű és védőszemüveg kell.' },
        { q: 'Miért ne tedd a foltos ruhát szárítógépbe?', options: ['Mert összemegy', 'Mert eltömődik a szűrő', 'Mert áramot pazarol', 'Mert a hő véglegesen rögzítheti a foltot'], answer: 3, explain: 'A meleg „beégeti” a foltot; csak akkor szárítsd géppel, ha a folt már eltűnt.' },
        { q: 'Valaki lenyelt egy tisztítószert. Mit tegyél?', options: ['Hívd a 112-t, és vidd/mondd be a flakon adatait', 'Hánytasd meg', 'Itass vele tejet és várj', 'Adj neki ecetet, hogy semlegesítse'], answer: 0, explain: 'Maró anyagnál a hánytatás további sérülést okozhat; szakember kell, aki a flakon összetétele alapján dönt.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'javitasok',
      title: 'Apró javítások: mit csinálhatsz meg te, és mit nem',
      level: 2, minutes: 13,
      summary: 'Eldugult lefolyó, kép felakasztása rejtett vezetékekre figyelve, lecsapott kismegszakító, FI-relé tesztgomb, és a határ: hálózati villany és gáz csak szakembernek.',
      tags: ['javítás', 'barkácsolás', 'lefolyó', 'dugulás', 'pumpa', 'szifon', 'fúrás', 'vezetékkereső', 'kismegszakító', 'FI relé', 'áram-védőkapcsoló', 'gázszag', 'szakember', 'szerszámok'],
      models: ['elosztoszekreny'],
      terms: ['villamosmernoki/aram-vedokapcsolo', 'villamosmernoki/erintesvedelem'],
      sections: [
        {
          title: 'Az alap szerszámkészlet',
          text: 'Egy önálló háztartásba érdemes egy kis szerszámosládát összeállítani:\n\n- **Csavarhúzók** (lapos és csillag, több méretben) vagy egy bitkészletes csavarhúzó\n- **Kalapács**, **kombinált fogó**, **állítható csavarkulcs** („franciakulcs”)\n- **Mérőszalag**, **vízmérték**, ceruza\n- **Szigetelőszalag**, ragasztószalag, univerzális ragasztó\n- **Tépőzáras kábelkötegelők**, néhány tipli és csavar\n- **Pumpa** (gumi lefolyótisztító) és egy **fejlámpa** vagy zseblámpa\n- Ha fúrnod kell: **akkus fúró-csavarozó** és **vezetékkereső** (kölcsön is kérhető)\n\nA szerszámot mindig **rendeltetésszerűen** használd: a csavarhúzó nem véső, a kés nem csavarhúzó.'
        },
        {
          title: 'Eldugult lefolyó: mechanikusan',
          text: 'A dugulás leggyakoribb oka a **haj**, a **zsír** és a **szappanmaradék**.\n\n1. **Pumpa**: engedj kevés vizet a mosdóba, hogy a gumi alja ellepje, a túlfolyó nyílást fogd be egy ronggyal, és erősen, többször pumpálj.\n2. **Szifon kitisztítása** (mosdónál): tegyél alá vödröt, csavard le kézzel a szifon alsó részét, tisztítsd ki, majd csavard vissza **kézzel szorosra**, és ellenőrizd, hogy nem csöpög.\n3. **Spirál** (csőtisztító rugó) a mélyebb dugulásra.\n\nMegelőzés: **hajszűrő** a zuhanyba, és **ne önts zsírt, olajat** a lefolyóba (dugulást okoz a csőben és a csatornában is): hagyd megdermedni, és dobd a szemetesbe.',
          warn: 'A vegyi lefolyótisztítók **erősen maró** lúgok vagy savak. Kesztyű és szemüveg kell, és **soha ne keverj** két különböző szert, és ne használj utánuk pumpát (visszafröccsenhet). Ha nem segít, hívj szakembert.',
          tip: 'Hogyan épül fel a szennyvízrendszer: [[#/lecke/vizszereles/szennyviz|Szennyvíz és lefolyók]].'
        },
        {
          title: 'Kép felakasztása: fúrás előtt gondolkodj!',
          text: 'A falban **rejtett villany- és vízvezetékek** futhatnak. Ha belefúrsz egy vezetékbe, áramütést, rövidzárlatot vagy csőtörést okozhatsz.\n\n- A vezetékeket általában **függőlegesen és vízszintesen** vezetik a konnektorok, kapcsolók és lámpák **felett, alatt és mellett**. Ezekben a sávokban ne fúrj.\n- Használj **vezetékkeresőt**, de ne bízz benne 100%-ig.\n- Könnyű képhez sokszor elég egy **szeg** vagy egy **öntapadós akasztó**, fúrás nélkül.\n- Gipszkarton falba **gipszkartontipli** kell, betonba ütvefúró és megfelelő tipli.\n- Albérletben előbb kérdezd meg a tulajdonost, szabad-e fúrni.\n\nFúráskor viselj **védőszemüveget**, és a fúró mindig legyen **egyenesen** a falra merőleges.'
        },
        {
          title: 'Lecsapott a kismegszakító',
          text: 'Ha egy szobában vagy a lakás egy részén hirtelen megszűnik az áram, valószínűleg **lekapcsolt egy kismegszakító** az elosztószekrényben.\n\n**Miért kapcsol le?** A kismegszakító a vezetéket védi **túlterhelés** (túl sok fogyasztó egy körön, pl. vízforraló + mikró + hősugárzó) vagy **zárlat** (hibás készülék, sérült kábel) ellen.\n\n**Mit tehetsz?**\n1. Gondold végig, mi volt bekapcsolva. **Húzd ki** a gyanús vagy újonnan bekapcsolt készüléket.\n2. Az elosztószekrényben keresd meg a **lefelé álló** kart, és kapcsold **vissza fel** (egyszer).\n3. Ha **azonnal újra lekapcsol**, ne erőltesd: hiba van, amit szakembernek kell megnéznie.\n\nA kart **soha ne tartsd** felkapcsolva erővel, és ne ragaszd le.',
          tip: 'Nézd meg a 3D-s elosztószekrényt: [[elosztoszekreny|Lakás elosztószekrénye]]. Szakmai háttér: [[#/lecke/villanyszereles/vedelmek|Kismegszakító és FI relé]].'
        },
        {
          title: 'Az FI-relé és a tesztgomb',
          text: 'Az **FI-relé** (hivatalos nevén **áram-védőkapcsoló**, ÁVK) életet ment: ha áram „szivárog” el a föld felé (például egy emberen keresztül), **a másodperc törtrésze alatt** lekapcsol. Lakásokban jellemzően **30 mA**-es érzékenységű.\n\nA készüléken van egy **„T” (teszt) gomb**. Ezt megnyomva a relének **azonnal le kell kapcsolnia**. A gyártók rendszeres (pl. félévenkénti) tesztelést javasolnak, mert egy beragadt FI-relé nem véd.\n\n- Ha a teszt után **lekapcsolt**: kapcsold vissza, rendben van.\n- Ha **nem kapcsol le**: hívj villanyszerelőt.\n- Ha az FI-relé **magától** lekapcsol, és visszakapcsolás után újra leold: valószínűleg egy készülék vagy a vezeték hibás. Húzd ki a készülékeket, és egyesével dugd vissza őket; ha így sem marad fent, villanyszerelő kell.'
        },
        {
          title: 'Amit NEM csinálhatsz meg magad',
          text: 'Vannak munkák, amelyeket **csak képzett szakember** végezhet, mert az életedbe vagy mások életébe kerülhet:\n\n- **Hálózati villanyszerelés**: konnektor, kapcsoló, lámpa bekötése, vezeték cseréje, az elosztószekrény belseje. A 230 V **halálos** lehet, és egy rossz bekötés évekkel később tüzet okozhat.\n- **Gáz**: gázkészülék, gázcső, gázóra, kémény. A gázszivárgás robbanást, a rossz égés **szén-monoxid-mérgezést** okozhat.\n- **Fő vízvezeték, fűtési rendszer** nagyobb beavatkozásai.\n\n**Gázszag esetén**: ne kapcsolj villanyt (se fel, se le), ne használj nyílt lángot, ne csengess. Nyiss ablakot, zárd el a gázt a főcsapnál, ha könnyen elérhető, **hagyd el a lakást**, és **kint** hívd a gázszolgáltató hibabejelentőjét vagy a **112**-t.',
          warn: 'A **szén-monoxid** színtelen, szagtalan gáz. Ha gázkészüléked (kazán, vízmelegítő) van, legyen **CO-érzékelő** a lakásban, és a készüléket évente nézesse át szakember.',
          tip: 'Hogyan működik a gázrendszer (elméletben): [[#/lecke/vizszereles/gaz-alapok|Gázszerelés alapjai]].'
        }
      ],
      quiz: [
        { q: 'Hol a legnagyobb a veszélye, hogy rejtett vezetékbe fúrsz?', options: ['A mennyezet közepén', 'Sehol, a vezetékek mindig a padlóban futnak', 'A konnektorok és kapcsolók feletti, alatti, melletti függőleges és vízszintes sávokban', 'A fal közepén, minden szerelvénytől távol'], answer: 2, explain: 'A vezetékeket jellemzően egyenes vonalban vezetik a szerelvények felé, ezért ezekben a sávokban ne fúrj.' },
        { q: 'Lekapcsolt egy kismegszakító. Mi az első lépés?', options: ['Ragaszd le a kart', 'Hívd a 112-t', 'Kapcsold vissza tízszer egymás után', 'Húzd ki a gyanús készüléket, majd kapcsold vissza egyszer'], answer: 3, explain: 'Először szüntesd meg a valószínű okot (túlterhelés, hibás készülék), utána egyszer kapcsold vissza.' },
        { q: 'Mit kell tennie az FI-relének, ha megnyomod a „T” gombot?', options: ['Semmit', 'Azonnal le kell kapcsolnia', 'Csipognia kell', 'Fel kell kapcsolnia a kismegszakítókat'], answer: 1, explain: 'A tesztgomb mesterséges szivárgó áramot hoz létre; ha a relé nem old le, hibás, és szakember kell.' },
        { q: 'Gázszagot érzel a lakásban. Mit NE tegyél?', options: ['Nyiss ablakot', 'Kint hívd a hibabejelentőt vagy a 112-t', 'Kapcsold fel a villanyt, hogy jobban láss', 'Hagyd el a lakást'], answer: 2, explain: 'A kapcsoló szikrája berobbanthatja a gáz–levegő keveréket.' },
        { q: 'Melyik munkát végezheted el nyugodtan magad?', options: ['Új lámpa bekötése a hálózatra', 'A mosdó szifonjának kitisztítása', 'Egy konnektor kicserélése', 'A gázkazán szétszerelése'], answer: 1, explain: 'A szifon kitisztítása veszélytelen; a hálózati villany és a gáz szakembernek való.' },
        { q: 'Mi a leggyakoribb oka a fürdőszobai lefolyó dugulásának?', options: ['A rossz csempe', 'Haj és szappanmaradék', 'A túl kevés víz', 'A túl kemény víz'], answer: 1, explain: 'Haj, zsír és szappanmaradék; ezt hajszűrővel lehet megelőzni.' },
        { q: 'Miért ne önts sütőolajat a lefolyóba?', options: ['Nyugodtan beleöntheted', 'Mert szagtalanítja a csövet', 'Mert felrobban', 'Mert lehűlve megdermed, és dugulást okoz'], answer: 3, explain: 'A zsiradék a csőben lehűl, lerakódik, és dugulást okoz a házban és a csatornában is.' },
        { q: 'Mi ellen véd az FI-relé (áram-védőkapcsoló)?', options: ['A túl magas villanyszámla ellen', 'A villámcsapás ellen', 'Az áramütés ellen, ha áram szivárog el a föld felé', 'A túl sok készülék okozta túlterhelés ellen'], answer: 2, explain: 'Az FI-relé a szivárgó áramot érzékeli (pl. ha egy emberen át folyik a föld felé); a túlterhelés ellen a kismegszakító véd.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'elsosegely',
      title: 'Elsősegély: amit mindenkinek tudnia kell',
      level: 2, minutes: 16,
      summary: 'Segélyhívás a 112-n, eszméletlen beteg, stabil oldalfekvés, újraélesztés (30:2, 100–120/perc), AED, félrenyelés, vérzés, égés, súlyos allergia.',
      tags: ['elsősegély', '112', 'mentő', 'újraélesztés', 'CPR', 'AED', 'defibrillátor', 'stabil oldalfekvés', 'félrenyelés', 'Heimlich', 'vérzés', 'égés', 'anafilaxia', 'ERC'],
      models: ['sziv'],
      terms: ['anatomia/sziv-ciklus', 'anatomia/gazcsere'],
      sections: [
        {
          title: 'Először: biztonság és segélyhívás',
          text: 'Minden elsősegély-helyzet így kezdődik:\n\n1. **Biztonság**: ne válj te is sérültté (forgalom, áram, tűz, gáz). Csak akkor menj oda, ha biztonságos.\n2. **Szólítsd meg, rázd meg óvatosan a vállát**: reagál?\n3. **Hívd a 112-t** (ingyenes, mobilról térerő és SIM nélkül is hívható), vagy kérj meg valakit, hogy hívja, és **szóljon vissza**, ha sikerült.\n\nA hívásnál mondd el: **mi történt, hol** (pontos cím, emelet, kapukód vagy útszakasz), **hány sérült** van, és milyen állapotban. **Ne tedd le** a telefont, amíg a diszpécser nem mondja: ő végigvezet a teendőkön, és kihangosítva is beszélhetsz vele.',
          tip: 'Az elsősegélynyújtás Magyarországon **mindenkinek kötelessége** a tőle elvárható módon; aki segítséget hív, az már segít. Ez a lecke nem helyettesíti a gyakorlati tanfolyamot: érdemes elvégezni egyet (pl. a Vöröskereszt vagy a mentők tanfolyamát).'
        },
        {
          title: 'Eszméletlen, de lélegzik: stabil oldalfekvés',
          text: 'Ha a beteg nem reagál, **nyisd meg a légutat**: egyik kezed a homlokán, a másik két ujjad az álla csúcsán, és **óvatosan hajtsd hátra a fejét**.\n\nUtána **legfeljebb 10 másodpercig** figyeld: **normálisan lélegzik-e**? (Nézd a mellkas emelkedését, hallgasd és érezd a levegőt.)\n\nHa **normálisan lélegzik**: fektesd **stabil oldalfekvésbe**, hogy a nyelve ne essen hátra, és a hányadék ki tudjon folyni a szájából. Hívd a 112-t, és **folyamatosan figyeld a légzését**, mert bármikor romolhat.\n\nHa **nem lélegzik**, vagy csak ritkán, hörögve „kapkod levegő után” (ez az ún. **agonális légzés**, ami nem normális légzés!): azonnal kezdd az **újraélesztést**.'
        },
        {
          title: 'Újraélesztés: 30:2',
          text: 'A szívmegállás után minden perc számít: az agy oxigén nélkül néhány perc alatt maradandóan károsodik. A **mellkaskompresszió** a vért keringeti, amíg a mentő vagy egy defibrillátor megérkezik.\n\n- Térdelj a beteg mellé, aki **kemény, egyenes felületen** fekszik a hátán.\n- Kezed a **mellkas közepére**, a szegycsont alsó felére tedd, a másik kezed rá, karod **nyújtva**.\n- Nyomd le a mellkast **5–6 cm** mélyen, **100–120/perc** ütemben (kb. másodpercenként kétszer), és hagyd **teljesen visszaemelkedni**.\n- **30 nyomás után 2 befúvás** (ha tudsz és hajlandó vagy rá), majd újra 30 nyomás.\n- Ha nem tudsz vagy nem akarsz befújni: **csak nyomd folyamatosan**; ez is sokkal jobb, mint a semmi.\n\n**Ne hagyd abba**, amíg a mentő át nem veszi, a beteg nem kezd el normálisan lélegezni, vagy teljesen ki nem merülsz. Ha többen vagytok, **2 percenként váltsátok** egymást.',
          warn: 'A gyerekek és csecsemők újraélesztése néhány ponton eltér (pl. 5 kezdő befúvás). A diszpécser a hívás közben elmondja a teendőket; ezt is gyakorold tanfolyamon.',
          tip: 'A szív működéséről: [[sziv|Az emberi szív (3D)]]. A tananyag az **Európai Újraélesztési Tanács (ERC) 2025-ös irányelvein** alapul; az irányelveket néhány évente frissítik.'
        },
        {
          title: 'AED: a defibrillátor, amit bárki használhat',
          text: 'Az **AED** (automata külső defibrillátor) egy hordozható készülék, amely elemzi a szívritmust, és ha kell, áramütéssel „újraindítja” a kamraremegésben lévő szívet. Bevásárlóközpontokban, pályaudvarokon, sportlétesítményekben, iskolákban találhatsz (zöld táblán szív és villám jel).\n\n- **Laikus is használhatja**: bekapcsolás után a készülék **hangosan elmondja** a lépéseket.\n- Ragaszd fel az elektródákat a rajz szerint a csupasz mellkasra.\n- Elemzés és áramütés közben **senki ne érjen a beteghez**.\n- Áramütés után **azonnal folytasd** a mellkaskompressziót.\n\nHa ketten vagytok: az egyik azonnal kezdje a kompressziót, a másik hívja a 112-t, és hozza az AED-t.'
        },
        {
          title: 'Félrenyelés, vérzés, égés',
          text: '**Félrenyelés (fulladás idegen testtől)**\n- Ha tud **köhögni**: biztasd köhögésre, ne üsd a hátát.\n- Ha **nem tud köhögni, beszélni, levegőt venni**: döntsd előre, és adj **5 erős hátütést** a lapockái közé a tenyereddel.\n- Ha nem segít: **5 hasi lökés** (Heimlich-műfogás): állj mögé, öklöd a köldöke fölé, a másik kezeddel fogd meg, és rántsd **befelé és felfelé**.\n- Váltogasd az 5 hátütést és az 5 hasi lökést; ha eszméletét veszti, hívd a 112-t, és kezdd az újraélesztést. Hasi lökés után **orvosnak meg kell vizsgálnia** a beteget.\n\n**Erős vérzés**\n- Tiszta kötszerrel (vagy bármilyen tiszta textillel) **nyomd erősen és folyamatosan** a sebre. Ha átázik, ne vedd le, tegyél rá még egy réteget. Hívd a 112-t.\n\n**Égés**\n- Hűtsd **azonnal, folyó, hűvös csapvízzel kb. 20 percig** (nem jéggel, nem jeges vízzel). A hűtés csökkenti a sérülés mélységét és a fájdalmat.\n- Távolítsd el a gyűrűt, órát (megdagadhat), de a **bőrhöz ragadt ruhát ne tépd le**. Ne kenj rá zsírt, tejfölt, fogkrémet. Fedd be lazán steril kötszerrel vagy folpackkal.\n- Nagy kiterjedésű, arcot, kezet, nemi szervet érintő vagy vegyi, elektromos égésnél: **112**.'
        },
        {
          title: 'Súlyos allergiás reakció (anafilaxia)',
          text: 'Az anafilaxia percek alatt életveszélyessé váló allergiás reakció (pl. darázscsípés, mogyoró, gyógyszer után).\n\n**Jelei**: nehézlégzés, sípoló légzés, a nyelv és a torok duzzanata, rekedtség, csalánkiütés, sápadtság, szédülés, ájulás.\n\n**Teendők**:\n1. Hívd a **112**-t, mondd ki, hogy **„anafilaxia”**.\n2. Ha a betegnek van **adrenalin autoinjektora** („adrenalin toll”), segíts neki beadni a **comb külső oldalába** (ruhán át is lehet), a használati utasítás szerint.\n3. Ha nehezen lélegzik, ültesd fel; ha szédül, sápadt, fektesd le, a lábát emeld meg.\n4. Ha 5 perc után nem javul, és van második toll, azt is be lehet adni.\n\nHa elveszti az eszméletét és nem lélegzik normálisan: **újraélesztés**.'
        }
      ],
      quiz: [
        { q: 'Milyen ütemben végezd a mellkaskompressziót felnőttnél?', options: ['140–160/perc', '100–120/perc', '60–80/perc', 'Ahogy kényelmes'], answer: 1, explain: 'Az ERC ajánlása szerint 100–120 nyomás percenként, kb. 5–6 cm mélyen.' },
        { q: 'Mi a kompresszió és a befúvás aránya felnőtt újraélesztésénél?', options: ['30:5', '30:2', '5:1', '15:2'], answer: 1, explain: '30 mellkaskompressziót 2 befúvás követ; ha nem tudsz befújni, végezz folyamatos kompressziót.' },
        { q: 'A beteg eszméletlen, de normálisan lélegzik. Mit teszel?', options: ['Elkezded az újraélesztést', 'Megitatod', 'Felülteted és pofozgatod', 'Stabil oldalfekvésbe fekteted, hívod a 112-t, és figyeled a légzését'], answer: 3, explain: 'A stabil oldalfekvés szabadon tartja a légutat; a légzést folyamatosan figyelni kell.' },
        { q: 'Mit jelent az agonális (hörgő, kapkodó) légzés?', options: ['Allergiás reakció', 'Nem normális légzés: újraélesztés kell', 'Hiperventiláció, papírzacskóba kell lélegeztetni', 'A beteg rendben van'], answer: 1, explain: 'A szívmegállás első perceiben gyakori; ne tévesszen meg, kezdd el az újraélesztést.' },
        { q: 'Ki használhat AED-t?', options: ['Csak az, akinek engedélye van', 'Csak orvos', 'Bárki, a készülék hangosan vezeti', 'Csak mentőtiszt'], answer: 2, explain: 'Az AED-t laikusoknak tervezték; magától eldönti, kell-e áramütés.' },
        { q: 'Egy felnőtt félrenyelt, nem tud köhögni és beszélni. Mi az első teendő?', options: ['Itass vele vizet', '5 erős hátütés a lapockák közé, előredöntött helyzetben', 'Nyúlj le a torkába vakon', 'Várd meg, hogy magától elmúljon'], answer: 1, explain: 'Először 5 hátütés, ha nem segít, 5 hasi lökés, és ezek váltogatása.' },
        { q: 'Hogyan hűtsd az égési sérülést?', options: ['Sehogy, hagyni kell levegőzni', 'Jéggel, 1 percig', 'Vajjal bekenve', 'Folyó, hűvös csapvízzel kb. 20 percig'], answer: 3, explain: 'A hűvös (nem jeges) folyó vizes hűtés kb. 20 percig csökkenti a sérülés mélységét; a jég további szövetkárosodást okozhat.' },
        { q: 'Hová kell beadni az adrenalin autoinjektort?', options: ['A nyakba', 'A karba', 'A comb külső oldalába', 'A hasba'], answer: 2, explain: 'A comb külső oldalának izmába, akár ruhán keresztül is.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'energiatakarekossag',
      title: 'Energia- és víztakarékosság',
      level: 2, minutes: 13,
      summary: 'Hogyan olvasd a villanyszámlát, hogyan számolj kWh-t (`P · t`), mennyit fogyaszt a készenlét, miért ér sokat egy fokkal kevesebb fűtés, és hogyan spórolj vízzel.',
      tags: ['energiatakarékosság', 'villanyszámla', 'kWh', 'teljesítmény', 'watt', 'készenléti fogyasztás', 'fűtés', 'termosztát', 'LED', 'energiacímke', 'víztakarékosság', 'rezsi'],
      terms: ['villamosmernoki/hatasos-teljesitmeny'],
      sections: [
        {
          title: 'Watt és kilowattóra: mi a különbség?',
          text: 'A **teljesítmény** (`P`, wattban, W) azt mutatja, **milyen gyorsan** használ energiát egy készülék. Az **energia** (`E`) azt, hogy összesen **mennyit** használt el. A villanyszámlán az energiát fizeted, **kilowattórában** (kWh).\n\n`E = P · t`\n\nahol `P` kilowattban (kW), `t` órában (h). (`1 kW = 1000 W`.)\n\n**Példák:**\n- 2000 W-os vízforraló 3 percig: `2 kW · 0,05 h = 0,1 kWh`\n- 10 W-os LED-izzó 5 órát naponta egy hónapig: `0,01 kW · 5 h · 30 = 1,5 kWh`\n- 2000 W-os hősugárzó napi 4 órát egy hónapig: `2 kW · 4 h · 30 = 240 kWh` (!)\n\nA költség: `kWh · egységár (Ft/kWh)`. Az egységárat a saját számládon nézd meg, mert tarifától és fogyasztástól függ.',
          tip: 'A fizikai háttérről: [[#/lecke/fizika/energia-munka|Energia, munka, teljesítmény]].'
        },
        {
          title: 'A villanyszámla olvasása',
          text: 'A számlán a legfontosabb adatok:\n\n- **Fogyasztási hely** és **felhasználási hely azonosító** (POD): ez azonosítja a mérődet.\n- **Elszámolási időszak**, **mérőállás** (kezdő és záró), és hogy a mérőállás **leolvasott**, **diktált** vagy **becsült**.\n- **Fogyasztás kWh-ban**, az **egységár**, a díjtételek (energiadíj, rendszerhasználati díjak, adók) és a **fizetendő összeg**, **fizetési határidő**.\n\nSok szolgáltató **részszámlát** küld becsült fogyasztással, és évente egyszer **elszámoló számlát**. Ha nem diktálod be rendszeresen az óraállást, a becslés eltérhet, és az év végén nagy különbözet jöhet.\n\nA lakossági rezsiszabályok (kedvezményes ár, átlagfogyasztási határ) **változhatnak**; az aktuális szabályokat a szolgáltatód és a hatóság (MEKH) oldalán nézd meg.',
          tip: 'A rezsiköltség helye a költségvetésben: lásd a [[#/lecke/penz-mindennap/lakhatas-rezsi|Lakhatás és rezsi]] leckét.'
        },
        {
          title: 'Készenlét és „energiafalók”',
          text: 'A **készenléti (standby) fogyasztás** az az áram, amit a kikapcsolt, de bedugott készülékek fogyasztanak (tévé, konzol, töltők, mikró órája). Az EU-ban az új készülékek készenléti fogyasztása jellemzően **1 W alatt** van, de a régebbiek és a sok kis eszköz összeadódik.\n\nPélda: 10 W folyamatos készenlét egy évig: `0,01 kW · 24 h · 365 = 87,6 kWh`.\n\nA legnagyobb fogyasztók a háztartásban általában azok, amelyek **hőt termelnek**: **villanybojler**, **elektromos fűtés**, **sütő**, **szárítógép**, **mosógép magas hőfokon**, valamint a **hűtő** (mert folyamatosan megy).\n\n**Tippek:** kapcsolható elosztó; a vízforralóban csak annyi vizet forralj, amennyi kell; fedővel főzz; mosogatógépet és mosógépet tele töltve indíts; a hűtőt ne tedd a sütő vagy radiátor mellé, és ne rakj bele meleg ételt.'
        },
        {
          title: 'Fűtés: egy fok sokat számít',
          text: 'A fűtés egy átlagos magyar háztartás energiafelhasználásának a **legnagyobb része**. Ökölszabály: a szobahőmérséklet **1 °C-os csökkentése** kb. **5–6%-kal** csökkenti a fűtési energiát (a pontos érték az épülettől és a fűtési módtól függ).\n\n- Nappal a lakótérben általában **20–21 °C** elég, éjjel és a hálóban kevesebb is.\n- **Termosztáttal** (programozhatóval még jobban) a fűtés csak akkor megy, amikor kell.\n- Ne takard el a **radiátort** bútorral, függönnyel.\n- **Szellőztess** röviden, tárt ablakkal; a bukóra nyitott ablak fűtés közben pazarló.\n- Az **ablak- és ajtórések** tömítése olcsó, és sokat segít.\n\nAz energiahatékonyság a szigetelésen is múlik: erről a [[#/lecke/epitoipar/szigeteles|Hő- és vízszigetelés]] lecke szól.'
        },
        {
          title: 'Világítás és energiacímke',
          text: 'A **LED** fényforrás kb. **80–90%-kal** kevesebb áramot használ, mint a hagyományos izzó ugyanannyi fényhez, és sokkal tovább bírja. Vásárláskor ne a wattot, hanem a **lument (lm)** nézd: ez mutatja a fényerőt.\n\nA készülékeken az **EU energiacímke** **A-tól G-ig** jelzi a hatékonyságot (2021 óta új, szigorúbb skálával, ezért ma ritka az „A” osztály). A címkén az **éves fogyasztás kWh-ban** is szerepel: ez alapján kiszámolhatod, mennyit fizetnél érte évente.\n\nEgy olcsóbb, de sokat fogyasztó hűtő **hosszú távon drágább** lehet, mint egy drágább, takarékos.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás', help: 'Mennyit spórolsz, ha 6%-kal csökken a fűtésszámlád? Gyakorold a százalékszámítást!' } }
        },
        {
          title: 'Víztakarékosság',
          text: 'A víz is pénz, és a **melegvíz** kétszer: a víz és a melegítés energiája miatt.\n\n- A **zuhanyzás** jellemzően kevesebb vizet használ, mint egy kád fürdő (egy 5 perces zuhany kb. 40–60 liter, egy kád kb. 120–150 liter).\n- **Víztakarékos zuhanyfej** és **perlátor** (csapszűrő) a csapra: olcsó, és érezhetően csökkenti a fogyasztást.\n- Fogmosás, borotválkozás közben **zárd el** a csapot.\n- A **csöpögő csap** vagy a **folyó WC-tartály** havonta több köbméter vizet is elpazarolhat: jelezd a tulajdonosnak vagy szereltesd meg.\n- A mosogatógép tele töltve általában **kevesebb vizet** használ, mint a kézi mosogatás folyó víz alatt.\n\nA vízórát érdemes időnként leolvasni: ha minden csap el van zárva, és mégis forog, **szivárgás** van.'
        }
      ],
      quiz: [
        { q: 'Mennyi energiát használ egy 2000 W-os hősugárzó 3 óra alatt?', options: ['600 kWh', '6 kWh', '0,6 kWh', '6000 kWh'], answer: 1, explain: '`E = P · t = 2 kW · 3 h = 6 kWh`.' },
        { q: 'Miben méri a villanyszámla az elfogyasztott energiát?', options: ['Voltban', 'Kilowattórában', 'Wattban', 'Amperben'], answer: 1, explain: 'A watt a teljesítmény, a kilowattóra (kWh) az energia egysége.' },
        { q: 'Kb. mennyivel csökken a fűtési energia, ha 1 °C-kal alacsonyabbra állítod a termosztátot?', options: ['Semennyivel', 'Kb. 25%-kal', 'Kb. 5–6%-kal', 'Kb. 0,5%-kal'], answer: 2, explain: 'Ökölszabályként kb. 5–6%, az épülettől és fűtési módtól függően.' },
        { q: 'Mit nézz LED-izzó vásárlásakor, ha a fényerőre vagy kíváncsi?', options: ['A színét', 'A wattot', 'A lument (lm)', 'A voltot'], answer: 2, explain: 'A lumen a fényáram, vagyis a „fényerő”; a watt csak a fogyasztást mutatja.' },
        { q: 'Mennyi energiát fogyaszt egy 10 W-os készenléti fogyasztás egy év alatt?', options: ['Kb. 87,6 kWh', 'Kb. 8,8 kWh', 'Kb. 3,65 kWh', 'Kb. 876 kWh'], answer: 0, explain: '`0,01 kW · 24 h · 365 = 87,6 kWh`.' },
        { q: 'Miért pazarló télen a bukóra nyitott ablak?', options: ['Nem pazarló', 'Mert kevés levegőt cserél, de a falak és az ablak környéke folyamatosan hűl', 'Mert beengedi a port', 'Mert túl gyorsan szellőztet'], answer: 1, explain: 'A rövid, tárt ablakos szellőztetés gyorsabb levegőcserét ad kevesebb hőveszteséggel.' },
        { q: 'Mit jelent, ha minden csap el van zárva, de a vízóra mégis forog?', options: ['A szomszéd vizét méri', 'Ez normális', 'Hibás a vízóra, biztosan', 'Valahol szivárgás van'], answer: 3, explain: 'A forgó vízóra elzárt csapoknál rejtett szivárgásra (WC-tartály, cső) utal.' },
        { q: 'Melyik készülék tartozik általában a legnagyobb fogyasztók közé?', options: ['Villanybojler', 'LED-izzó', 'Wi-Fi router', 'Telefontöltő'], answer: 0, explain: 'A hőt termelő készülékek (bojler, elektromos fűtés, sütő, szárítógép) fogyasztanak a legtöbbet.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'idobeosztas-tanulas',
      title: 'Időbeosztás és a tanulás tanulása',
      level: 1, minutes: 13,
      summary: 'Bizonyítottan hatékony tanulási módszerek (aktív felidézés, elosztott gyakorlás, keverés), Pomodoro, tervezés, alvás és memória, és mit kezdj a halogatással.',
      tags: ['tanulás', 'tanulási módszerek', 'aktív felidézés', 'elosztott gyakorlás', 'ismétlés', 'Pomodoro', 'időbeosztás', 'halogatás', 'prokrasztináció', 'alvás', 'memória', 'fókusz', 'teendőlista'],
      models: ['agy'],
      sections: [
        {
          title: 'Ami nem működik olyan jól, mint hinnéd',
          text: 'A legtöbb diák így tanul: **újraolvassa** a jegyzetet, és **kiemelővel** húzogat. Ez kényelmes, és azt az érzést kelti, hogy „már tudom”, mert a szöveg **ismerős**. A tanulásvizsgálatok szerint azonban ezek a módszerek **viszonylag gyengék**.\n\nAz ismerősség nem ugyanaz, mint az emlékezés. A vizsgán nem az a kérdés, hogy **felismered**-e az anyagot, hanem hogy **elő tudod-e hívni** fejből.\n\nA jó hír: néhány egyszerű módszer **sokkal** hatékonyabb, és nem is tart tovább.'
        },
        {
          title: 'Aktív felidézés: kérdezd ki magad!',
          text: 'Az **aktív felidézés** (angolul „retrieval practice”) azt jelenti, hogy **fejből próbálod előhívni** a tudást, ahelyett, hogy újraolvasnád. Minden sikeres (és még a sikertelen) felidézés is **megerősíti** az emléknyomot. Ez az egyik legjobban alátámasztott tanulási módszer (tesztelési hatás).\n\n**Hogyan?**\n- Olvasás után csukd be a könyvet, és **írd le** vagy **mondd el**, amire emlékszel.\n- Használj **kártyákat** (elöl kérdés, hátul válasz), vagy egy kártyás alkalmazást.\n- Oldj meg **gyakorlókérdéseket**, mint ebben az alkalmazásban a leckék végén és a Tesztközpontban.\n- Magyarázd el valakinek (vagy egy képzeletbeli diáknak), egyszerű szavakkal.\n\nUtána nézd meg, **mit hibáztál**, és azt gyakorold.'
        },
        {
          title: 'Elosztott gyakorlás és keverés',
          text: '**Elosztott gyakorlás** („spaced practice”): ugyanannyi tanulási idő **több napra elosztva** sokkal tartósabb tudást ad, mint egyetlen hosszú „bemagolás” a vizsga előtti éjszakán. A felejtés ugyanis gyors (ezt mutatja az **Ebbinghaus-féle felejtési görbe**), de minden ismétlés lassítja.\n\nEgy egyszerű ütemterv: tanulás után **1 nappal**, **3 nappal**, **1 héttel**, **1 hónappal** ismételj (felidézéssel!).\n\n**Keverés** („interleaving”): gyakorlásnál **keverd** a feladattípusokat (pl. matekból a százalékszámítást, a törteket és az egyenleteket vegyesen). Így azt is megtanulod, **melyik módszert** mikor kell használni, nem csak gépiesen ismétled ugyanazt.'
        },
        {
          title: 'Tervezés, Pomodoro és fókusz',
          text: '**Tervezés**:\n- Írd fel a határidőket (dolgozat, beadandó, vizsga) egy naptárba.\n- A nagy feladatot bontsd **konkrét, kicsi lépésekre** („5 oldal a töriből, 10 kártya kikérdezése”), ne csak annyit írj, hogy „tanulni”.\n- A legnehezebb feladatot akkor csináld, amikor a **legfrissebb** vagy.\n\n**Pomodoro-technika**: **25 perc** megszakítás nélküli munka, utána **5 perc** szünet; négy kör után hosszabb (15–30 perces) pihenő. A rövid, határozott időszak segít belekezdeni, a szünet pedig frissen tart. Az időtartam rugalmas: van, akinek 45/10 jobb.\n\n**Fókusz**: a telefon legyen **másik szobában** vagy némítva, értesítések kikapcsolva. Kutatások szerint már a telefon **jelenléte** is ronthatja a figyelmet. A „multitasking” valójában gyors váltogatás, ami lassít és több hibához vezet.'
        },
        {
          title: 'Alvás és memória',
          text: 'Alvás közben az agy **rendezi és rögzíti** a napközben tanultakat: a **hippokampusz** „visszajátssza” az új emlékeket, és ezek fokozatosan beépülnek az agykéregbe. Ezért a jó alvás a tanulás **része**, nem a tanulás elől elvett idő.\n\n- A kamaszoknak általában **8–10 óra**, a felnőtteknek **7–9 óra** alvás ajánlott.\n- Az átvirrasztott éjszaka **rontja** a másnapi figyelmet, emlékezetet és hangulatot; a vizsga előtti „éjszakai magolás” többet árt, mint használ.\n- A rendszeres lefekvési idő, a délutáni koffein kerülése és a képernyő letétele lefekvés előtt mind segít.\n\nA **mozgás** is támogatja az agyat: a rendszeres testmozgás javítja a hangulatot és a koncentrációt.',
          tip: 'Az agy részei 3D-ben: [[agy|Az emberi agy]]. Az alvás és a regeneráció sportolóknál: [[#/lecke/sport/edzeselmelet|Edzéselmélet, regeneráció, alvás]].'
        },
        {
          title: 'Halogatás: nem lustaság',
          text: 'A **halogatás** (prokrasztináció) legtöbbször nem lustaság, hanem az **érzelmek kezelése**: egy feladat unalmas, nehéz vagy félelmetes (mi lesz, ha nem sikerül?), és az agy azonnali megkönnyebbülést keres (telefon, videó).\n\n**Ami segíthet:**\n- **Kétperces szabály**: kezdd el csak 2 percre. A legnehezebb a belekezdés; utána gyakran megy tovább.\n- **Nagyon konkrét első lépés**: „megnyitom a dokumentumot és leírom a címet”.\n- **Ha–akkor terv**: „Ha hazaértem és ettem, akkor 16:00-kor leülök matekozni.”\n- **Környezet**: tedd nehezen elérhetővé a zavaró dolgot (telefon másik szobában, oldalblokkoló).\n- **Önegyüttérzés**: ha halogattál, ne ostorozd magad. Kutatások szerint az, aki megbocsát magának, **kevésbé** halogat legközelebb.\n\nHa a halogatás tartósan nagyon megnehezíti az életed, vagy mögötte szorongás, levertség áll, érdemes segítséget kérni (lásd a [[#/lecke/haztartas/mentalis-egeszseg|Lelki egészség]] leckét).'
        }
      ],
      quiz: [
        { q: 'Melyik tanulási módszer a leghatékonyabb a kutatások szerint?', options: ['A jegyzet többszöri újraolvasása', 'A jegyzet szépen lemásolása', 'Kiemelés színes filccel', 'Aktív felidézés (önkikérdezés)'], answer: 3, explain: 'A felidézés erősíti az emléknyomot; az újraolvasás csak ismerősségérzetet ad.' },
        { q: 'Mi az elosztott gyakorlás?', options: ['Csak a könnyű részeket tanulni', 'Egy éjszaka alatt mindent megtanulni', 'Többen együtt tanulni', 'A tanulást több napra elosztani, időközönként ismételve'], answer: 3, explain: 'Ugyanannyi idő elosztva tartósabb tudást ad, mint egy tömbben.' },
        { q: 'Mennyi a klasszikus Pomodoro munkaszakasz?', options: ['3 óra', '5 perc', '25 perc', '90 perc'], answer: 2, explain: '25 perc munka, 5 perc szünet; négy kör után hosszabb pihenő.' },
        { q: 'Miért fontos az alvás a tanuláshoz?', options: ['Mert álmunkban újraolvassuk a jegyzetet', 'Alvás közben az agy rögzíti a nap során tanultakat', 'Nem fontos, csak időt vesz el', 'Csak a testnek kell, az agynak nem'], answer: 1, explain: 'Alvás közben zajlik az emlékek konszolidációja; az alváshiány rontja a memóriát és a figyelmet.' },
        { q: 'Mi az „interleaving” (keverés) gyakorlásnál?', options: ['Különböző feladattípusok vegyes gyakorlása', 'Szünet nélküli tanulás', 'Zenehallgatás tanulás közben', 'Két tantárgy egyszerre olvasása'], answer: 0, explain: 'A keverés megtanítja, hogy melyik módszert mikor kell használni.' },
        { q: 'Mi a halogatás leggyakoribb oka a kutatások szerint?', options: ['A túl sok szabadidő', 'A lustaság', 'A kellemetlen érzések (unalom, félelem) elkerülése', 'A rossz memória'], answer: 2, explain: 'A halogatás jellemzően érzelemszabályozási stratégia: az agy azonnali megkönnyebbülést keres.' },
        { q: 'Mit javasolnak a figyelem megőrzéséhez tanulás közben?', options: ['Nézz közben sorozatot', 'A telefon legyen a kezed ügyében, hátha fontos', 'A telefon legyen másik szobában vagy némítva', 'Válaszolj minden üzenetre azonnal'], answer: 2, explain: 'Már a telefon jelenléte is ronthatja a figyelmet; a multitasking lassít.' },
        { q: 'Mi a „kétperces szabály” lényege?', options: ['Kezdd el a feladatot csak két percre, mert a belekezdés a legnehezebb', 'Két percnél tovább ne tanulj', 'Két percenként tarts szünetet', 'Minden feladatot két perc alatt kell megoldani'], answer: 0, explain: 'A belekezdés legyőzése után a folytatás sokkal könnyebb.' }
      ]
    },
    /* ---------------------------------------------------------------- */
    {
      id: 'mentalis-egeszseg',
      title: 'Lelki egészség és segítségkérés',
      level: 1, minutes: 12,
      summary: 'Mi a stressz, hogyan hat az alvás, a mozgás és a képernyőidő a hangulatra, mikor és hol kérj segítséget, és hogyan segíts egy barátodnak.',
      tags: ['mentális egészség', 'lelki egészség', 'stressz', 'szorongás', 'alvás', 'képernyőidő', 'közösségi média', 'segítségkérés', 'Kék Vonal', '116-111', '116-123', 'lelki elsősegély', 'barát segítése'],
      models: ['agy'],
      sections: [
        {
          title: 'A lelki egészség is egészség',
          text: 'Ahogy a testednek, a lelkednek is vannak jobb és rosszabb időszakai. A **lelki egészség** nem azt jelenti, hogy mindig boldog vagy, hanem hogy **meg tudsz birkózni** a hétköznapi nehézségekkel, tudsz kapcsolódni másokhoz, és élvezni a dolgokat.\n\nA szomorúság, a düh, az idegesség **normális érzelmek**, mindenki átéli őket. Akkor érdemes felfigyelni, ha egy rossz állapot **hetekig tart**, és **akadályozza** a mindennapi életet: alvást, evést, tanulást, barátságokat.\n\nEz a lecke **nem orvosi tanács** és nem diagnózis; arról szól, hogyan vigyázhatsz magadra, és hol kaphatsz segítséget.'
        },
        {
          title: 'Mi történik stresszben?',
          text: 'Stresszhelyzetben a szervezet **„üss vagy fuss”** reakcióba kapcsol: a mellékvese **adrenalint** és **kortizolt** termel, gyorsul a szívverés és a légzés, megfeszülnek az izmok. Ez rövid távon **hasznos** (pl. vizsgán élesebb a figyelem).\n\nA baj akkor van, ha a stressz **tartós**, és nincs utána pihenés. Ilyenkor jöhet: alvászavar, fejfájás, gyomorpanaszok, ingerlékenység, koncentrációs nehézség, kimerültség.\n\n**Ami bizonyítottan segít:**\n- **Lassú, mély légzés**: pl. 4 másodperc belégzés, 6 másodperc kilégzés, néhány percig. A hosszú kilégzés nyugtatja az idegrendszert.\n- **Mozgás**: már napi 20–30 perc séta is javítja a hangulatot.\n- **Beszélgetés** valakivel, akiben megbízol.\n- **Kis lépések**: a nagy problémát bontsd fel, és egyszerre egy dologgal foglalkozz.'
        },
        {
          title: 'Alvás, mozgás, képernyő',
          text: 'A lelki egészség „alapjai” meglepően egyszerűek, de hatásosak:\n\n- **Alvás**: a kialvatlanság érzékenyebbé tesz a stresszre, és rontja a hangulatot. Próbálj **rendszeres** időben lefeküdni és kelni, hétvégén is.\n- **Mozgás**: a rendszeres testmozgás az egyik legjobban kutatott hangulatjavító.\n- **Étkezés**: a rendszeres, változatos étkezés stabilabb energiát ad.\n- **Kapcsolatok**: a személyes találkozás barátokkal és családdal védőfaktor.\n\n**Képernyőidő és közösségi média**: nem minden képernyőhasználat káros, de figyelj, **hogyan érzed magad** utána. Az **összehasonlítás** (mások megszűrt, „tökéletes” élete), az éjszakai görgetés és a **lájkok hajhászása** sokaknál rontja a hangulatot és az alvást.\n\nTippek: kapcsold ki a nem fontos **értesítéseket**, lefekvés előtt egy órával tedd le a telefont, és nézd meg a telefonod **képernyőidő-statisztikáját**.',
          tip: 'Az online biztonságról és a médiatudatosságról: [[#/lecke/allampolgari/mediatudatossag|Médiatudatosság]].'
        },
        {
          title: 'Mikor és hol kérj segítséget?',
          text: '**Kérj segítséget**, ha hetek óta levert, reménytelen vagy szorongó vagy, ha nem tudsz aludni vagy enni, ha semmi nem okoz örömet, ha bántanak (otthon, iskolában, online), vagy ha bármikor arra gondolsz, hogy bántanád magad. **A segítségkérés erő, nem gyengeség.**\n\n**Kihez fordulhatsz?**\n- Szülő, rokon, barát, osztályfőnök, **iskolapszichológus**, védőnő.\n- **Háziorvos**: tovább tud küldeni szakemberhez (pszichológus, pszichiáter).\n- **Kék Vonal: 116-111**: ingyenes, névtelen lelkisegély-vonal gyerekeknek és fiataloknak (a honlapjukon chat is van).\n- **Lelki elsősegély telefonszolgálat: 116-123**: ingyenes, névtelen, felnőtteknek is.\n\nA számok és az elérhetőség változhatnak; az aktuális adatokat a szolgálatok honlapján találod.',
          warn: 'Ha közvetlen életveszély van (valaki meg akarja ölni magát, vagy már bántotta magát): azonnal hívd a **112**-t, és ne hagyd egyedül az illetőt.'
        },
        {
          title: 'Hogyan segíts egy barátodnak?',
          text: 'Ha egy barátodon azt látod, hogy nincs jól (visszahúzódik, nem jár el sehova, sokat beszél reménytelenségről), tehetsz érte:\n\n1. **Kérdezz rá** nyugodtan, négyszemközt: „Úgy látom, mostanában nem vagy jól. Mi a helyzet?”\n2. **Hallgasd meg** ítélkezés nélkül. Nem kell megoldást adnod, és nem kell azonnal tanácsot adnod; a meghallgatás már sokat segít.\n3. **Vedd komolyan**. Ha önsértésről vagy halálról beszél, **kérdezz rá egyenesen**; ez nem „adja az ötletet”, hanem megkönnyebbülést hozhat.\n4. **Bátorítsd**, hogy kérjen segítséget szakembertől vagy egy segélyvonalon, és ajánld fel, hogy elkíséred, vagy ott leszel, amíg telefonál.\n5. **Ne tartsd titokban**, ha életveszély van: szólj egy felnőttnek, akiben megbízol, vagy hívd a 112-t. A barátság nem titoktartási szerződés, ha élet a tét.\n\n**Vigyázz magadra is**: nem neked kell egyedül megmentened. Te is beszélhetsz valakivel arról, ami nehéz.'
        }
      ],
      quiz: [
        { q: 'Melyik a Kék Vonal gyermek- és ifjúsági lelkisegély-vonal száma?', options: ['107', '116-111', '104', '112'], answer: 1, explain: 'A 116-111 ingyenes, névtelen lelkisegély-vonal gyerekeknek és fiataloknak.' },
        { q: 'Mit csinál a szervezet akut stresszhelyzetben?', options: ['Azonnal elalszunk', 'Lelassul a szívverés', 'Csökken a vércukorszint és ellazulnak az izmok', 'Adrenalin és kortizol szabadul fel, gyorsul a szívverés és a légzés'], answer: 3, explain: 'Ez az „üss vagy fuss” reakció, amely rövid távon a teljesítményt segíti.' },
        { q: 'Mikor érdemes segítséget kérni?', options: ['Csak akkor, ha már semmi nem működik', 'Ha egy rossz állapot hetekig tart, és akadályozza a mindennapokat', 'Soha, mert az gyengeség', 'Csak ha a szülők engedik'], answer: 1, explain: 'A tartós, a mindennapokat akadályozó panaszok szakmai segítséget érdemelnek; a segítségkérés erő.' },
        { q: 'Egy barátod önsértésről beszél. Mit tegyél?', options: ['Ígérd meg, hogy senkinek nem mondod el', 'Váltsatok témát, hogy ne gondoljon rá', 'Nevesd el, hogy jobb kedvre derüljön', 'Vedd komolyan, hallgasd meg, és vonj be felnőttet vagy szakembert'], answer: 3, explain: 'Életveszélyben a titoktartás nem érvényes; a segítség mozgósítása a legfontosabb.' },
        { q: 'Milyen légzés segít megnyugodni?', options: ['Lassú légzés, hosszabb kilégzéssel', 'Visszatartott légzés, amíg lehet', 'Gyors, kapkodó légzés', 'Papírzacskóba lélegzés percekig'], answer: 0, explain: 'A lassú, hosszú kilégzés aktiválja a nyugtató (paraszimpatikus) idegrendszert.' },
        { q: 'Mi a 116-123?', options: ['Felnőtteknek is szóló, ingyenes lelki elsősegély telefonszolgálat', 'A gázszolgáltató száma', 'A tűzoltóság száma', 'A rendőrség hibabejelentője'], answer: 0, explain: 'A 116-123 a lelki elsősegély telefonszolgálat ingyenes, névtelenül hívható száma.' },
        { q: 'Mi igaz a közösségi médiára?', options: ['Érdemes figyelni, hogyan érzed magad utána; az összehasonlítás és az éjszakai görgetés sokaknál rontja a hangulatot', 'Mindig káros', 'Csak a felnőttekre hat', 'Mindig hasznos'], answer: 0, explain: 'A hatás attól függ, hogyan és mennyit használod.' },
        { q: 'Közvetlen életveszély esetén (pl. valaki meg akarja ölni magát) mit tegyél?', options: ['Írj neki e-mailt', 'Posztold ki a közösségi médiában', 'Várj holnapig', 'Hívd a 112-t, és ne hagyd egyedül'], answer: 3, explain: 'Közvetlen veszélynél azonnal a segélyhívó kell, és az illetőt nem szabad magára hagyni.' }
      ]
    }
  ]
});
