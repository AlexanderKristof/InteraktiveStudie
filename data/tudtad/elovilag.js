/* Tudtad? – élővilág: állatok, növények, emberi test, ételek. Formátum: js/tudtad.js */
STUDIE.addFacts([

  /* ===================== ÁLLATOK ===================== */
  {
    id: 'bika-voros-szin', cat: 'allatok',
    q: 'a bikát **nem a vörös szín** dühíti fel a bikaviadalon, hanem a köpeny **mozgása**?',
    why: 'A szarvasmarhák **kétszínlátók** (dikromáciásak): a retinájukban csak kétféle csap van, a vörös színre érzékeny csaptípus hiányzik. A vörös köpeny számukra nagyjából olyan, mint bármilyen más sötét szín.\n\nKísérletekben a bikák ugyanúgy nekirontottak a kék vagy fehér rongynak, ha azt lóbálták, és a vörösre sem figyeltek, ha mozdulatlan volt. A köpeny azért vörös, mert az embereknek látványos, és jól eltakarja a vérfoltokat.',
    links: ['modell:szem#retina', 'lecke:bio-alap/allatok']
  },
  {
    id: 'aranyhal-memoria', cat: 'allatok',
    q: 'az aranyhal emlékezete **nem 3 másodperces**, hanem akár **hónapokig** megjegyez dolgokat?',
    why: 'A „3 másodperces memória” közkeletű tévhit. Kísérletekben az aranyhalakat meg lehetett tanítani arra, hogy egy hangjelzésre, fényre vagy egy kar megnyomására etetés jár – és ezt **hetek, sőt hónapok** múlva is felidézték.\n\nA halak agya másképp épül fel, mint az emlősöké, de nekik is van a tanulásért és a térbeli emlékezésért felelős agyterületük. A haltartók is tapasztalják: a halak megtanulják, ki és mikor szokta etetni őket.',
    links: ['modell:agy', 'lecke:bio-alap/allatok']
  },
  {
    id: 'polip-harom-sziv', cat: 'allatok',
    q: 'a polipnak **három szíve** és **kék vére** van?',
    why: 'A polipnak két **kopoltyúszíve** van, amelyek a vért a kopoltyúkon pumpálják át (ez hasonlít a mi **jobb kamránk** feladatára, amely a tüdőbe küldi a vért), és egy **testszíve**, amely az oxigéndús vért a testbe juttatja (mint a mi **bal kamránk**).\n\nA vére azért kék, mert az oxigént nem a vastartalmú hemoglobin, hanem a **réztartalmú hemocianin** szállítja – oxigénnel töltve ez kékes színű. Érdekesség: úszás közben a testszív le is állhat, ezért a polip inkább mászik, mint úszik, mert az úszás gyorsan kifárasztja.',
    links: ['modell:sziv#jk', 'modell:sziv#bk', 'lecke:bio-alap/allatok']
  },
  {
    id: 'zsiraf-vernyomas', cat: 'allatok',
    q: 'a zsiráf vérnyomása **nagyjából kétszerese** az emberének, mégsem ájul el, ha lehajol inni?',
    why: 'A zsiráf feje kb. 2 méterrel a szíve fölött van, ezért a vért nagy nyomással kell felpumpálni: a szív szintjén a felső (szisztolés) nyomás gyakran **200 Hgmm fölött** van (embernél kb. 120). Ehhez a **bal kamra fala** rendkívül vastag és izmos.\n\nHogy lehajláskor ne zúduljon túl sok vér a fejbe, a nyaki vénákban **billentyűk** vannak, az agy alatt pedig egy finom érhálózat tompítja a nyomásingadozást. A lábán a **feszes bőr** úgy működik, mint egy kompressziós harisnya: nem engedi, hogy a nagy nyomás miatt folyadék gyűljön össze a lábakban. Érdekesség: a zsiráf nyakában is csak **7 csigolya** van, ugyanannyi, mint a miénkben.',
    links: ['modell:sziv#bk', 'szakszo:anatomia/vernyomas', 'lecke:biologia/keringes-legzes']
  },
  {
    id: 'kekballna-sziv', cat: 'allatok',
    q: 'a kék bálna szíve merüléskor akár **percenként kettőt** is dobbanhat?',
    why: 'A kék bálna szíve kb. **180–200 kg**, akkora, mint egy kisebb bútordarab, a főverőere (aortája) pedig olyan vastag, mint egy vödör. 2019-ben kutatók tapadókorongos szenzort rögzítettek egy kék bálnára, és azt mérték, hogy mély merülés közben a pulzusa **percenként 2–8**-ra is lelassult, a felszínen pedig 25–37-re gyorsult.\n\nA lassú pulzus oxigént spórol: a bálna merülés közben csak a legfontosabb szervekhez (agy, szív) juttat bőven vért. A szívverések között az **aorta rugalmas fala** tartja fenn a véráramlást, mert a dobbanáskor kitágul, majd lassan összehúzódik.',
    links: ['modell:sziv#aorta', 'lecke:bio-alap/allatok']
  },
  {
    id: 'kolibri-sziv', cat: 'allatok',
    q: 'a kolibri szíve repülés közben **percenként akár 1200-at** is ver?',
    why: 'A kolibri a legintenzívebb anyagcseréjű gerincesek közé tartozik: helyben lebegés közben a szárnya másodpercenként több tucatszor csap, ehhez rengeteg energia kell. Szíve ezért percenként **1000–1200** körüli ütemben ver (a miénk nyugalomban kb. 60–80).\n\nA repülőizmaiban kiugróan sok a **mitokondrium**, a sejtek „erőműve”, ezek gyártják az izmok számára az ATP-t. Éjszakára sok kolibri **torporba** (egyfajta mini-hibernációba) kapcsol: a testhőmérséklete és a pulzusa drasztikusan csökken, különben az éjszaka alatt elfogyna az energiatartaléka.',
    links: ['modell:sziv#inger', 'modell:sejt#mito', 'lecke:bio-alap/allatok']
  },
  {
    id: 'macska-edes-iz', cat: 'allatok',
    q: 'a macskák **nem érzik az édes ízt**, mert az ehhez szükséges génjük **elromlott**?',
    why: 'Az édes ízt egy két fehérjéből álló receptor érzékeli a nyelven. 2005-ben kutatók kimutatták, hogy a macskafélékben az egyik fehérje génje (`Tas1r2`) **nem működő génné** (pszeudogénné) vált: egy kis kiesés miatt hibás, használhatatlan fehérje készülne róla.\n\nA macska szigorú húsevő, a táplálékában alig van cukor, ezért ez a hiba nem jelentett hátrányt, így a mutáció megmaradhatott. Ugyanezért fordulhat elő, hogy a macska teljesen közömbös a sütemény iránt – ha mégis rágcsál, azt inkább a zsír vagy az állaga vonzza.',
    links: ['modell:dns#gen', 'lecke:biologia/genetika']
  },
  {
    id: 'macska-szem-vilagit', cat: 'allatok',
    q: 'a macska szeme azért **világít** a sötétben, mert a retinája mögött **tükör** van?',
    why: 'A macska szemében a retina mögött egy fényvisszaverő réteg, a **tapetum lucidum** található (az érhártya része). Ami fény elsőre nem nyelődik el a fényérzékelő sejtekben, az visszaverődik, és **második esélyt** kap. Ezért lát a macska sokkal gyengébb fényben, mint mi – és ezért villan fel a szeme, ha zseblámpával rávilágítunk.\n\nAz embernek nincs ilyen rétege. A fényképeken látható **„vörösszem-effektus”** nálunk azért jön létre, mert a vaku fénye a retinán át az erekkel sűrűn átszőtt **érhártyáról** verődik vissza – a vöröset tehát a vér színe adja.',
    links: ['modell:szem#erhartya', 'modell:szem#retina', 'lecke:fizika/hullamok-feny']
  },
  {
    id: 'sas-latas', cat: 'allatok',
    q: 'a sasnak egy-egy szemében **két éleslátás-pontja** (látógödre) van?',
    why: 'Nekünk szemenként egy **sárgafolt** (látógödör) van, ahol a csapok a legsűrűbben ülnek – csak ott látunk igazán élesen. A ragadozó madarak többségének két ilyen gödre van: az egyik oldalra, a másik előre néz, így egyszerre figyelhetik a tájat és a zsákmányt.\n\nA látógödrükben a fényérzékelő sejtek sokkal sűrűbben helyezkednek el, mint a miénkben, ezért egyes sasfajok látásélessége kb. **kétszer-háromszor** jobb az emberénél. Egy nyulat több kilométer magasból is észrevesznek.',
    links: ['modell:szem#sargafolt', 'modell:szem#retina', 'lecke:bio-alap/allatok']
  },
  {
    id: 'polip-nincs-vakfolt', cat: 'allatok',
    q: 'a polip szemében **nincs vakfolt**, a miénkben viszont van?',
    why: 'Az emberi retina „fordítva” van bekötve: a fény először az idegsejteken és ereken halad át, és csak utána éri el a csapokat és pálcikákat. Az idegrostoknak ezért valahol át kell bújniuk a retinán – ahol a **látóideg** kilép, ott nincs fényérzékelő sejt, ez a **vakfolt**.\n\nA polip szeme egymástól függetlenül, de hasonlóan alakult ki, ám nála az idegrostok a fényérzékelő sejtek **mögött** futnak, így nincs szükség lyukra. Próbáld ki: csukd be a bal szemed, nézz a jobbal egy pontra a papíron, és lassan közelíts egy tőle kb. 8 cm-re jobbra lévő X-hez – egy adott távolságnál az X **eltűnik**. Az agyad a hiányzó részt a környezetével „befoltozza”, ezért a mindennapokban nem veszed észre.',
    links: ['modell:szem#latoideg', 'modell:szem#retina', 'lecke:bio-alap/emberi-test-2']
  },
  {
    id: 'bagoly-szem', cat: 'allatok',
    q: 'a bagoly **nem tudja forgatni a szemét**, ezért a fejét fordítja el – akár kb. **270 fokban**?',
    why: 'A bagoly szeme nem gömb alakú, hanem megnyúlt, **cső alakú**, hogy minél több fényt gyűjtsön. A szemgolyót egy csontos gyűrű (a szemfehérjébe, az **ínhártyába** ágyazott csontlemezek) merevíti, így a szem a koponyában szinte mozdíthatatlan – a **szemmozgató izmai** alig tudják elfordítani.\n\nEzt pótolja a rendkívül hajlékony nyak: a bagolynak **14 nyakcsigolyája** van (nekünk 7), és a nyaki erei úgy futnak, hogy a nagy elfordulás se szorítsa el az agy vérellátását.',
    links: ['modell:szem#inhartya', 'modell:szem#szemizmok', 'lecke:bio-alap/allatok']
  },
  {
    id: 'beka-szemmel-nyel', cat: 'allatok',
    q: 'a béka a **szemével segít lenyelni** a falatot?',
    why: 'A béka szemgolyója alatt nincs csontos padló, csak vékony szövet választja el a szájüregtől. Nyeléskor a béka egy külön izommal **behúzza a szemgolyóit**, ezek lenyomják a falatot a torka felé.\n\nEgy 2004-es kísérletben nagysebességű röntgenfelvételekkel igazolták, hogy ha a béka nem tudja behúzni a szemét, a nyelés lassabb és több próbálkozást igényel. Ezért pislog olyan feltűnően, amikor eszik.',
    links: ['modell:szem#szemizmok', 'lecke:bio-alap/allatok']
  },
  {
    id: 'delfin-felagy-alvas', cat: 'allatok',
    q: 'a delfin alvás közben **csak az egyik agyféltekéjével alszik**, a másikkal ébren marad?',
    why: 'A delfinek tudatosan lélegeznek: fel kell úszniuk a felszínre levegőért, és figyelniük kell a ragadozókra is. Ezért **féltekés alvással** pihennek: az egyik agyfélteke lassú hullámú alvásba merül, a másik ébren van – ilyenkor gyakran az ébren lévő féltekével ellentétes oldali szemük nyitva marad. Néhány óra múlva a két félteke szerepet cserél.\n\nA két félteke között a **kérgestest** szállítja az információt; a delfineknél ez a kapcsolat viszonylag kicsi, ami megkönnyítheti, hogy a féltekék külön „üzemmódban” legyenek. Hasonló alvás egyes madaraknál és fókáknál is előfordul.',
    links: ['modell:agy#kergestest', 'lecke:bio-alap/allatok']
  },
  {
    id: 'hollo-neuronok', cat: 'allatok',
    q: 'a hollók és papagájok apró agyában **annyi idegsejt** lehet, mint egy jóval nagyobb agyú majoméban?',
    why: 'Egy 2016-os vizsgálat megszámolta a madáragyak idegsejtjeit, és kiderült: a madarak idegsejtjei **sokkal kisebbek és sűrűbben** helyezkednek el, mint az emlősökéi. A hollófélék és papagájok előagyában így olyan sok neuron van, mint egyes majmokéban, holott az agyuk csak dió nagyságú.\n\nEz magyarázhatja, miért olyan okosak: a varjak eszközt készítenek, a hollók előre terveznek, és felismerik az emberi arcokat – sőt, évekig „haragszanak” arra, aki rosszat tett velük.',
    links: ['modell:agy#neuron', 'lecke:bio-alap/allatok']
  },
  {
    id: 'elektromos-angolna', cat: 'allatok',
    q: 'az elektromos angolna akár **800 voltnál** is nagyobb feszültséget tud kelteni – pedig minden sejtje csak **kb. 0,15 V**-ot ad?',
    why: 'Minden sejt **sejthártyáján** feszültség van, mert a hártya két oldalán eltérő az ionok (pl. Na+ és K+) koncentrációja. Az angolna testének nagy részét módosult izomsejtek, ún. **elektrociták** teszik ki. Kisüléskor az ioncsatornák egyszerre nyílnak, és egy-egy sejt kb. 0,15 V-ot ad.\n\nA titok a **soros kapcsolás**: több ezer elektrocita sorban egymás után, mint egy elemsor. Így jön ki a több száz volt – a 2019-ben leírt Electrophorus voltai fajnál kb. **860 V**-ot mértek. Az áram rövid ideig tart, de egy nagyobb állatot is megbéníthat.',
    links: ['modell:sejt#hartya', 'szakszo:anatomia/membranpotencial', 'lecke:villanyszereles/kapcsolasok']
  },
  {
    id: 'szentjanosbogar-feny', cat: 'allatok',
    q: 'a szentjánosbogár fénye **szinte hő nélküli**, és ugyanaz az **ATP** hajtja, ami az izmainkat?',
    why: 'A szentjánosbogár potrohában a **luciferin** nevű molekulát a **luciferáz** enzim oxidálja, és ehhez a sejtek energiavalutája, az **ATP** kell. A reakció energiájának nagy része fényként távozik, nem hőként – ellentétben a régi izzólámpával, ami az energia több mint 90%-át hővé alakította.\n\nAz ATP-t a sejtekben főleg a **mitokondriumok** állítják elő. A reakciót a gyakorlatban is használják: a konyhai és kórházi **higiéniai gyorstesztek** luciferázzal mutatják ki a felületen maradt ATP-t (vagyis élő vagy elpusztult sejtek, ételmaradék nyomait) – minél több a fény, annál koszosabb a felület.',
    links: ['modell:sejt#mito', 'lecke:szakacs/higienia', 'lecke:kemia/reakciok']
  },
  {
    id: 'axolotl-genom', cat: 'allatok',
    q: 'az axolotl nevű kétéltű **genomja kb. tízszer hosszabb**, mint az emberé?',
    why: 'Az emberi DNS kb. **3,1 milliárd bázispárból** áll – ha másodpercenként egy betűt olvasnál fel, éjjel-nappal kb. 100 évig tartana. Az axolotl genomja kb. **32 milliárd** bázispár. Ez nem jelenti azt, hogy „bonyolultabb” lenne: a génjeinek száma hasonló a miénkhez (kb. 20 000 fehérjét kódoló gén), csak sok az ismétlődő, nem kódoló szakasz. Nálunk is csak a DNS kb. **1–2%-a** kódol fehérjét.\n\nAz axolotl másról is híres: képes **visszanöveszteni** a levágott lábát, sőt a gerincvelője és a szíve egy részét is. Ezért a regeneráció egyik fő kutatási állata.',
    links: ['modell:dns#bazisok', 'modell:dns#gen', 'lecke:biologia/genetika']
  },
  {
    id: 'medveallatka', cat: 'allatok',
    q: 'a fél milliméteres medveállatka túlélte a **világűr vákuumát** és sugárzását?',
    why: 'A medveállatkák (tardigrádák) kiszáradáskor **„hordóállapotba”** húzódnak: szinte az összes vizüket elveszítik, és az anyagcseréjük szinte leáll. Ilyenkor kibírnak extrém hideget, hőséget és nagy sugárzást. 2007-ben egy műholdon 10 napig voltak kitéve az űrnek, és egy részük utána újraéledt.\n\nAz egyik fajnál egy különleges fehérjét (**Dsup**, „damage suppressor”) is találtak: ez rátapad a **kromoszómák** DNS-ét feltekerő fehérjékre, és mint egy pajzs, csökkenti a sugárzás okozta DNS-töréseket. Emberi sejtekbe ültetve is mérhetően csökkentette a röntgensugárzás okozta károkat.',
    links: ['modell:dns#kromoszoma', 'lecke:bio-alap/allatok']
  },
  {
    id: 'halhatatlan-meduza', cat: 'allatok',
    q: 'létezik egy medúzafaj, amely bajban **visszafiatalodik**, és újrakezdi az életét?',
    why: 'A Turritopsis dohrnii nevű apró medúza, ha megsérül, éhezik vagy öregszik, a fenékre süllyed, és visszaalakul **polippá** – vagyis a fejlődése korábbi szakaszába. A sejtjei ilyenkor **átalakulnak** más sejttípussá (transzdifferenciáció), a polipból pedig később újra medúzák bimbóznak le.\n\nEzért nevezik „biológiailag halhatatlannak” – de csak elvben: a természetben a legtöbbjüket megeszik vagy betegség pusztítja el. A kutatók azért figyelnek rá, mert sokat elárulhat a sejtek specializációjáról és az öregedésről.',
    links: ['lecke:biologia/sejtosztodas', 'lecke:bio-alap/allatok']
  },
  {
    id: 'strucc-szem', cat: 'allatok',
    q: 'a strucc szeme **nagyobb, mint az agya**?',
    why: 'A strucc szemgolyója kb. **5 cm** átmérőjű – ez a legnagyobb szem a szárazföldi állatok között, kb. kétszer akkora átmérőjű, mint az emberi szem. Az agya ezzel szemben nagyjából egy dió méretű.\n\nA nagy szem a nyílt szavannán előny: a nagyobb szemben nagyobb kép vetül a retinára, több fényérzékelő sejt jut rá, így a strucc nagyon messziről észreveszi a ragadozókat. A futásban pedig a lábizmai és nem az agya a fontosak: akár kb. 70 km/h-val is fut.',
    links: ['modell:szem', 'modell:agy', 'lecke:bio-alap/allatok']
  },
  {
    id: 'meh-uv-latas', cat: 'allatok',
    q: 'a méhek **látják az ultraibolya fényt**, a vöröset viszont **nem**?',
    why: 'A méhek szemében három fajta fényérzékelő van: zöldre, kékre és **ultraibolyára** érzékeny. A vörös fény számukra sötétnek tűnik. Sok virág szirmán UV-ben látható mintázat, ún. **„nektárkalauz”** van: csíkok és foltok, amelyek a virág közepére mutatnak – mi ezeket szabad szemmel nem látjuk, a méh viszont igen.\n\nAz UV a látható fénynél rövidebb hullámhosszú elektromágneses sugárzás (kb. 300–400 nm). Hogy mit nevezünk „fénynek”, tehát attól függ, kinek a szeme érzékeli.',
    links: ['lecke:fizika/hullamok-feny', 'lecke:bio-alap/allatok', 'lecke:termeszet/novenyek']
  },
  {
    id: 'vombat-kocka', cat: 'allatok',
    q: 'az ausztrál vombat ürüléke **kocka alakú**?',
    why: 'A vombat ürüléke kb. 2 cm-es, szögletes kockákból áll – ez az egyetlen ismert állat, amelyik ilyet „gyárt”. Kutatók 2018-ban és 2021-ben megvizsgálták a beleit, és kiderült: a bélfal **nem egyformán rugalmas**, egyes sávjai merevebbek, mások lazábbak. Ahogy a bél összehúzódik, a lassan kiszáradó bélsár ezeknél a sávoknál sarkokat kap.\n\nA vombat a kockákat sziklákra, farönkökre rakja, így jelöli a területét – a kocka nem gurul el olyan könnyen, mint egy gömbölyű bogyó.',
    links: ['lecke:bio-alap/allatok']
  },
  {
    id: 'jegesmedve-fekete-bor', cat: 'allatok',
    q: 'a jegesmedve **bőre fekete**, a szőre pedig valójában **átlátszó**?',
    why: 'A jegesmedve szőrszálai nem tartalmaznak fehér festéket: áttetszőek, belül üregesek. A sok szőrszálon és üregen a fény **minden irányban szóródik**, ezért látjuk fehérnek – ugyanezért fehér a hó vagy a felvert tojásfehérje is.\n\nA bőre alatt vastag zsírréteg szigetel, a fekete bőr pedig jól elnyeli a hőt. (Régi tévhit, hogy a szőrszálak „optikai kábelként” vezetnék a napfényt a bőrhöz – ezt méréssel megcáfolták.)',
    links: ['lecke:fizika/hullamok-feny', 'lecke:bio-alap/allatok']
  },
  {
    id: 'vandorsolyom-zuhanas', cat: 'allatok',
    q: 'a vándorsólyom zuhanórepülésben **300 km/h-nál is gyorsabb** – ő a világ leggyorsabb állata?',
    why: 'Vízszintes repülésben a vándorsólyom „csak” kb. 100 km/h-val repül, de amikor zsákmányra csap le, összecsukja a szárnyát, és **csepp alakban** zuhan. Ilyenkor a gravitáció gyorsítja, és a mérések szerint több mint **300 km/h**-t is elér – ennél egyetlen állat sem mozog gyorsabban.\n\nAz orrnyílásában apró kúpok terelik el a légáramlást, hogy ekkora sebességnél is tudjon lélegezni; ezt a megoldást a sugárhajtóművek beömlőnyílásainak tervezésekor is tanulmányozták.',
    links: ['lecke:fizika/mertekegysegek-mozgas', 'lecke:fiz-alap/mozgas', 'lecke:bio-alap/allatok']
  },
  {
    id: 'goda-11-nap', cat: 'allatok',
    q: 'egy kis goda nevű madár **11 nap alatt, megállás nélkül** repült kb. **13 500 km**-t?',
    why: '2022-ben egy jeladóval felszerelt, mindössze 5 hónapos kis goda Alaszkából Tasmaniáig repült, **leszállás, evés és ivás nélkül**, kb. 11 nap alatt. Ez a leghosszabb mért megszakítás nélküli madárvonulás.\n\nIndulás előtt a madár szinte a testtömege felét **zsír** formájában raktározza, a nem szükséges belső szerveit (pl. emésztőszerveit) pedig összezsugorítja, hogy könnyebb legyen. Útközben az agya egyik felével alhat, és a kedvező szelek is segítik.',
    links: ['lecke:bio-alap/allatok', 'lecke:foldrajz/legkor']
  },
  {
    id: 'flamingo-rozsaszin', cat: 'allatok',
    q: 'a flamingó **az ételétől** lesz rózsaszín – nélküle kifehéredne?',
    why: 'A flamingók algákat és apró rákokat szűrnek ki a vízből, ezekben sok **karotinoid** festékanyag van (ugyanaz a vegyületcsalád, amitől a sárgarépa narancssárga). A madár mája ezeket átalakítja, és a festék beépül a tollaiba és a bőrébe.\n\nA fiókák szürkék, és csak évek alatt színeződnek be. Az állatkertekben ezért karotinoidot kevernek a flamingók táplálékába – különben a tollaik vedlés után egyre halványabbak lennének.',
    links: ['lecke:bio-alap/allatok', 'lecke:bio-alap/okologia']
  },

  /* ===================== NÖVÉNYEK ===================== */
  {
    id: 'fa-levegobol', cat: 'novenyek',
    q: 'egy fa tömegének nagy része **a levegőből** származik, nem a talajból?',
    why: 'Jan van Helmont a 17. században egy kis fűzfát ültetett lemért földbe, és 5 évig csak vízzel öntözte. A fa kb. **74 kg**-ot hízott, a föld viszont csak kb. 60 grammot veszített. Ő még azt hitte, a víz épült be a fába – ma tudjuk, hogy a szárazanyag nagy része a levegő **szén-dioxidjából** származik.\n\nA levelek **zöld színtesteiben** a fotoszintézis a fény energiájával a CO2-ből és vízből **szőlőcukrot** készít, ebből lesz a cellulóz és a fa többi anyaga. A fa száraz tömegének kb. fele **szén** – és az mind a levegőből jött.',
    links: ['modell:level#kloroplasztisz', 'lecke:bio-alap/novenyek', 'lecke:termeszet/novenyek']
  },
  {
    id: 'klorofill-hem', cat: 'novenyek',
    q: 'a **klorofill** és a vérünk festéke, a **hem** szerkezete **meglepően hasonló**?',
    why: 'Mindkét molekula közepén egy nagy, gyűrűs váz (porfirin-szerű gyűrű) van, amelynek közepén egy fématom ül: a klorofillban **magnézium**, a hemben **vas**. A kettő ugyanabból az ősi bioszintézis-útvonalból ered, csak más fém és más oldalláncok kerültek rájuk.\n\nA klorofill a **vörös és a kék** fényt nyeli el a legjobban, a **zöldet** pedig nagyrészt visszaveri vagy átengedi – ezért látjuk zöldnek a növényeket. A hem viszont az oxigén megkötésére specializálódott, és vörös színű.',
    links: ['modell:level#klorofill', 'lecke:biologia/keringes-legzes', 'lecke:kemia/szerves-elektrokemia']
  },
  {
    id: 'osz-szinei', cat: 'novenyek',
    q: 'az őszi levelek sárga színe **egész nyáron ott volt** a levélben, csak nem láttuk?',
    why: 'A zöld színtestekben a klorofill mellett **karotinoidok** (sárga, narancs festékek) is vannak, ezek segítik a fénybegyűjtést és védik a klorofillt. Nyáron a sok klorofill zöldje elnyomja őket.\n\nŐsszel a fa lebontja és visszaszívja a klorofillt (értékes nitrogén és magnézium van benne), így előtűnik a sárga. A **piros** szín viszont más: az **antociánokat** sok fa ősszel frissen gyártja – feltehetően fényvédőként, amíg a tápanyagok visszaszívása tart.',
    links: ['modell:level#klorofill', 'modell:level#kloroplasztisz', 'lecke:bio-alap/novenyek']
  },
  {
    id: 'csiga-szintest', cat: 'novenyek',
    q: 'létezik egy tengeri csiga, amely **ellopja az algák zöld színtesteit**, és utána napenergiából is él?',
    why: 'Az Elysia chlorotica nevű tengeri csiga algát eszik, de a **színtesteket** (kloroplasztiszokat) nem emészti meg, hanem beépíti a saját bélsejtjeibe. Ezek **hónapokig** tovább fotoszintetizálnak benne, ezért a csiga zöld, és hosszú ideig kibírja evés nélkül.\n\nA színtestek eredetileg maguk is önálló élőlények voltak: az **endoszimbionta elmélet** szerint egy ősi sejt bekebelezett egy fotoszintetizáló baktériumot, és nem emésztette meg. Ezért van a színtesteknek – és ugyanígy a **mitokondriumoknak** – saját DNS-ük és saját, baktériumszerű riboszómájuk.',
    links: ['modell:level#kloroplasztisz', 'modell:sejt#mito', 'lecke:biologia/evolucio-okologia']
  },
  {
    id: 'lotusz-effektus', cat: 'novenyek',
    q: 'a lótusz levele **öntisztító**: a víz legördül róla, és **magával viszi a port**?',
    why: 'A levelet a **kutikula** nevű viaszos réteg borítja, ami eleve víztaszító. A lótusznál ráadásul a felület mikroszkopikus **dudorokkal** és rajtuk még apróbb viaszkristályokkal van tele. A vízcsepp így csak a dudorok csúcsán ér a levélhez, alatta levegő marad: a csepp szinte gömb alakú, és a legkisebb dőlésnél is legördül.\n\nGördülés közben a porszemcsék jobban tapadnak a vízhez, mint a levélhez, ezért a csepp „felszedi” őket. Ezt a **lótuszeffektust** ma öntisztító homlokzatfestékekben, üvegbevonatokban és textíliákban is utánozzák.',
    links: ['modell:level#kutikula', 'lecke:kemia/kemiai-kotesek', 'lecke:bio-alap/novenyek']
  },
  {
    id: 'sztoma-parologtatas', cat: 'novenyek',
    q: 'a növény a gyökerével felvett víz **több mint 90%-át** egyszerűen elpárologtatja?',
    why: 'A levél **gázcserenyílásain** (sztómáin) jut be a fotoszintézishez szükséges CO2 – de ahol a CO2 bejön, ott a vízgőz kiszökik. A felvett víznek csak kis része épül be a növénybe, a többség a sztómákon párolog el (**párologtatás, transzspiráció**). Egy nagy fa egy nyári napon több száz liter vizet is elpárologtathat.\n\nA sztómák többsége sok növénynél a levél **alsó oldalán** van, ahol árnyékosabb és hűvösebb, így kevesebb víz vész el. A kaktuszok és sok pozsgás pedig **éjjel** nyitják ki a sztómáikat, és elraktározzák a CO2-t, hogy nappal, a hőségben zárva tarthassák őket.',
    links: ['modell:level#sztoma', 'modell:level#also', 'lecke:bio-alap/novenyek']
  },
  {
    id: 'viz-100-meter', cat: 'novenyek',
    q: 'a fák **szivattyú nélkül** juttatják fel a vizet akár **100 méter** magasra?',
    why: 'Egy szívókúttal elméletben legfeljebb kb. **10 m** magasra lehet vizet felszívni, mert addig tolja fel a légnyomás. A fák mégis 100 m fölé is eljuttatják. A titok: a levelekben elpárolgó víz „húzza” maga után a **farész** (xilém) vékony csöveiben álló vízoszlopot, a vízmolekulák pedig a **hidrogénkötések** miatt erősen összetartanak (kohézió), így a vízfonal nem szakad el.\n\nA farész szállítócsövei ráadásul **elhalt sejtekből** állnak: a vízszállítás tehát nem igényel energiát a fától, a hajtóerőt a Nap adja a párologtatáson keresztül. Számítások szerint emiatt a fák nem nőhetnek sokkal 120–130 m-nél magasabbra.',
    links: ['modell:level#faresz', 'lecke:fiz-alap/nyomas', 'lecke:bio-alap/novenyek']
  },
  {
    id: 'levelteru-floem', cat: 'novenyek',
    q: 'a kutatók **levéltetveket** használnak „injekciós tűnek”, hogy növényi nedvet gyűjtsenek?',
    why: 'A növények a cukros nedvet a **háncsrészben** (floémben) szállítják, és ez a nedv **nyomás alatt** áll. A levéltetű vékony szúró szájszervét pontosan egy háncscsőbe szúrja, és a nyomás szinte magától a szájába préseli a nedvet – nem is kell erőlködnie. A felesleges cukrot mézharmatként üríti ki, ezért ragadósak a tetves levelek.\n\nA botanikusok ezt kihasználják: a szívogató tetű szájszervét lézerrel vagy apró ollóval elvágják, és a csonkon kicsöpögő tiszta háncsnedvet összegyűjtik. Ilyen finoman tűvel nem tudnának beszúrni anélkül, hogy a növény elzárná a sérült csövet.',
    links: ['modell:level#hancsresz', 'lecke:bio-alap/novenyek']
  },
  {
    id: 'szintest-menekul', cat: 'novenyek',
    q: 'a levél sejtjeiben a zöld színtestek **elmenekülnek a túl erős fény elől**?',
    why: 'Gyenge fényben a színtestek az **oszlopos alapszövet** sejtjeinek fény felé néző oldalára gyűlnek, hogy minél több fotont fogjanak be. Túl erős fényben viszont a sejtfalak oldalai mentén sorakoznak fel, „élükkel” a fény felé, mert a túl sok fény károsítaná őket. A mozgást kék fényre érzékeny fehérjék (fototropinok) irányítják, és a sejtváz mozgatja a színtesteket.\n\nA levél **felső bőrszövete** ezzel szemben a legtöbb növénynél szinte színtest nélküli, átlátszó réteg – mint egy ablak, amely átengedi a fényt a mélyebben fekvő, fotoszintetizáló sejtekhez.',
    links: ['modell:level#oszlopos', 'modell:level#felso', 'modell:level#kloroplasztisz']
  },
  {
    id: 'level-belso-felulet', cat: 'novenyek',
    q: 'egy levél belsejében a sejtek levegővel érintkező felülete **akár 10–50-szer** nagyobb, mint maga a levél?',
    why: 'A levél nem tömör lap: a sejtjei között **levegővel teli járatok** vannak, főleg a lazább **szivacsos alapszövetben**. A sejtek nedves fala ezeken a járatokon keresztül veszi fel a CO2-t – és minél nagyobb ez a belső felület, annál gyorsabb lehet a fotoszintézis. Mérések szerint ez a belső felület a levél felületének **kb. 10–50-szerese** is lehet (fajtól és megvilágítástól függően).\n\nA szivacsos réteg sok levegő-víz határfelülete a fényt is erősen szórja – részben ezért **világosabb** sok levél alsó oldala, mint a felső.',
    links: ['modell:level#szivacsos', 'modell:level#also', 'lecke:bio-alap/novenyek']
  },
  {
    id: 'turgor-nyomas', cat: 'novenyek',
    q: 'egy feszes növényi sejtben **nagyobb a nyomás**, mint egy autógumiban?',
    why: 'A növényi sejt közepén nagy **vakuólum** van, tele vízzel és oldott anyagokkal. A víz ozmózissal beáramlik, a sejt felfúvódik, de a **cellulóz sejtfal** nem engedi szétpattanni. Az így kialakuló belső nyomás, a **turgor**, gyakran kb. **0,3–1 MPa** (3–10 bar) – egy személyautó gumijában kb. 2–2,5 bar van.\n\nEz a nyomás tartja egyenesen a lágy szárú növényeket. Ha a növény nem kap elég vizet, a turgor csökken, és a növény **lekonyul (hervad)**. A sejtfal anyaga, a **cellulóz** egyébként a Föld leggyakoribb szerves vegyülete.',
    links: ['modell:level#sejtfal', 'lecke:fiz-alap/nyomas', 'lecke:termeszet/eloleny-sejt']
  },
  {
    id: 'venusz-legycsapo-szamol', cat: 'novenyek',
    q: 'a Vénusz-légycsapó **számol**: csak a **második** érintésre csukódik össze?',
    why: 'A csapda belső felén néhány érzékeny **tapintósőr** van. Ha egy sőrt egyszer megérintenek, a növényben elektromos jel fut végig, de a csapda még nem csukódik be – így nem pazarol energiát egy lehulló esőcseppre. Ha kb. **20–30 másodpercen belül** jön egy **második** érintés, a csapda a másodperc töredéke alatt bezárul.\n\nEgy 2016-os kutatás szerint a növény tovább is számol: kb. **öt** érintés után kezd emésztőenzimeket termelni – a vergődő rovar tehát saját magát „emészti meg”.',
    links: ['lecke:bio-alap/novenyek', 'lecke:termeszet/novenyek']
  },
  {
    id: 'banan-bogyo', cat: 'novenyek',
    q: 'a botanika szerint a **banán bogyó**, az **eper viszont nem az**?',
    why: 'A botanikában a **bogyó** olyan termés, amely egyetlen virág egyetlen magházából fejlődik, és a terméshús egészében húsos, benne a magokkal. Ilyen a paradicsom, a szőlő – és a **banán** is (a termesztett banán apró, fekete pöttyei elcsökevényesedett magkezdemények).\n\nAz **eper** húsos része viszont nem a magházból, hanem a megvastagodott **virágvacokból** fejlődik, a „magok” a felszínén pedig valójában apró, önálló termések (aszmagtermések). Az eper tehát ún. áltermés. A konyhai „bogyó” és a botanikai bogyó két külön fogalom.',
    links: ['lecke:bio-alap/novenyek', 'lecke:termeszet/novenyek']
  },

  /* ===================== EMBERI TEST ===================== */
  {
    id: 'bal-kamra-vastag', cat: 'emberi-test',
    q: 'a szív bal kamrájának fala **kb. háromszor vastagabb**, mint a jobbé – pedig **ugyanannyi vért** pumpálnak?',
    why: 'A két kamra percenként ugyanannyi, nyugalomban kb. **5 liter** vért pumpál (naponta kb. 7000 litert, kb. 100 000 dobbanással). A különbség a **nyomásban** van: a jobb kamra csak a közeli tüdőbe küldi a vért, ehhez kb. **25 Hgmm** elég; a bal kamrának az egész testbe kell, ehhez kb. **120 Hgmm** kell.\n\nEzért a bal kamra fala kb. **8–12 mm** vastag, a jobbé csak kb. **3–5 mm**. A kettő közti **kamrai sövény** működésében a bal kamrához tartozik: összehúzódáskor vele együtt mozog, és a bal kamra nyomása kissé a jobb kamra felé domborítja.',
    links: ['modell:sziv#bk', 'modell:sziv#jk', 'modell:sziv#sovey', 'szakszo:anatomia/percterfogat']
  },
  {
    id: 'sziv-sajat-ritmus', cat: 'emberi-test',
    q: 'a szív **az agy nélkül is** ver – egy átültetett szív idegek nélkül is dobog?',
    why: 'A szívverés jele nem az agyból jön, hanem a **jobb pitvar** falában lévő **szinuszcsomóból**, a szív saját „ritmusgenerátorából”. Ennek sejtjei maguktól, újra és újra elektromos impulzust keltenek, ami az **ingervezető rendszeren** keresztül végigfut a szíven.\n\nAz idegrendszer csak gyorsítja vagy lassítja a ritmust. Ezért a szívátültetéskor beültetett szív – amelynek idegei át vannak vágva – is ver, csak nyugalomban **kicsit gyorsabban** (kb. 90–110/perc), mert hiányzik róla a bolygóideg lassító „féke”. Az EKG ezt az elektromos jelet rajzolja fel.',
    links: ['modell:sziv#inger', 'modell:sziv#jp', 'szakszo:anatomia/ekg']
  },
  {
    id: 'szivhang-billentyuk', cat: 'emberi-test',
    q: 'a szív **„dobbanását”** nem az izom összehúzódása adja, hanem a **billentyűk becsapódása**?',
    why: 'A fonendoszkóppal hallható „tu-tamm” két hangból áll. Az első akkor szól, amikor a kamrák összehúzódni kezdenek, és a **vitorlás billentyűk** (a pitvarok és kamrák között) becsukódnak. A második akkor, amikor a kamrák elernyednek, és a **zsebes billentyűk** (az aorta és a tüdőartéria elején) csapódnak be.\n\nHogy a vitorlás billentyűk ne forduljanak ki a pitvar felé, **ínhúrok** rögzítik őket a kamra falához, mint az ejtőernyő zsinórjai. Ha egy billentyű nem zár jól, az orvos sustorgó **zörejt** hall.',
    links: ['modell:sziv#vitorlas', 'modell:sziv#zsebes', 'szakszo:anatomia/sziv-ciklus']
  },
  {
    id: 'koszorus-diasztole', cat: 'emberi-test',
    q: 'a szív **nem a kamráiban lévő vérből** táplálkozik, hanem a saját ereiből – és főleg **két dobbanás között**?',
    why: 'A szívizom vastag fala nem tudja közvetlenül a kamrákban áramló vérből felvenni az oxigént. Saját ellátó erei, a **koszorúerek** rögtön az **aorta** legelején, a zsebes billentyű fölött erednek, és a szívizom kb. a perctérfogat **5%-át** kapja.\n\nÉrdekes, hogy a bal kamra izmát a vér főleg az **elernyedés (diasztolé)** idején tudja átjárni: összehúzódáskor az izom összenyomja a saját ereit. Ezért veszélyes a nagyon gyors szívverés is, és ezért okoz szívinfarktust, ha egy koszorúér elzáródik: a mögötte lévő izomrész oxigén nélkül marad.',
    links: ['modell:sziv#koszorus', 'modell:sziv#aorta', 'lecke:biologia/keringes-legzes']
  },
  {
    id: 'foramen-ovale', cat: 'emberi-test',
    q: 'születés előtt a szívünkben **lyuk volt a két pitvar között** – és kb. **minden negyedik** felnőttnél egy kicsit nyitva is marad?',
    why: 'A magzat nem lélegzik, az oxigént a **méhlepényből** kapja. A tüdejébe ezért alig kell vér: a **jobb pitvarba** érkező vér nagy része egy nyíláson, a **foramen ovale**-n át rögtön a **bal pitvarba** jut, egy másik része pedig egy kis éren át a **tüdőartériából** közvetlenül az aortába. A **tüdővénákon** így csak kevés vér tér vissza.\n\nAz első levegővételnél a tüdő kitágul, a bal pitvarban megnő a nyomás, és egy hártya rácsapódik a nyílásra. Általában összenő, de a felnőttek kb. **25%-ánál** egy kis rés megmarad – ez legtöbbször semmilyen panaszt nem okoz. (Megjegyzés: a tüdőartéria azért **artéria**, mert a szívtől visz el vért – akkor is, ha oxigénszegény.)',
    links: ['modell:sziv#jp', 'modell:sziv#bp', 'modell:sziv#truncus', 'modell:sziv#tudoveak']
  },
  {
    id: 'visszer-izompumpa', cat: 'emberi-test',
    q: 'a vérünk nagyobb része, kb. **kétharmada** a **vénákban** van, és a lábunk izmai pumpálják vissza a szívbe?',
    why: 'A vénák fala vékony és tágulékony, ezért nyugalomban a vér kb. **60–70%-a** bennük „tárolódik”. A szív felé a vért a végtagok vénáiban lévő **zsebszerű billentyűk** és az **izompumpa** segíti: járáskor az izmok összenyomják a mélyvénákat, a billentyűk pedig csak a szív felé engedik a vért. A vér végül a **felső és alsó üres visszéren** át jut a jobb pitvarba.\n\nHa valaki sokáig mozdulatlanul áll (pl. díszőrségben), a vér a lábában gyűlik össze, kevesebb jut vissza a szívhez, és elájulhat. Ezért jó álldogálás közben a lábujjhegyre emelkedni, vagy a vádlit megfeszíteni.',
    links: ['modell:sziv#urestvisszer', 'szakszo:anatomia/vernyomas', 'lecke:bio-alap/emberi-test-1']
  },
  {
    id: 'agy-energia-10-szazalek', cat: 'emberi-test',
    q: 'az agy a testtömeg **kb. 2%-a**, mégis az energia **kb. 20%-át** használja – és **nem igaz**, hogy csak 10%-át használjuk?',
    why: 'Az agyban kb. **86 milliárd idegsejt** van, és ezek folyamatosan dolgoznak: ionokat pumpálnak a sejthártyán át, hogy jelet tudjanak továbbítani. Ez annyi energiát igényel, hogy az agy nyugalomban is a teljes energiafelhasználás kb. **ötödét** viszi el.\n\nA „csak 10%-át használjuk” tévhit. Képalkotó vizsgálatok (pl. fMRI) szerint egy nap alatt **minden agyterület** aktív, csak nem egyszerre és nem egyforma erővel. Az is árulkodó, hogy az agy szinte bármely részének sérülése valamilyen tünetet okoz. Az evolúció sem tartana fenn egy ilyen „drága” szervet 90%-ban feleslegesen.',
    links: ['modell:agy#neuron', 'lecke:biologia/ideg-hormon-emesztes', 'szakszo:anatomia/neuron']
  },
  {
    id: 'kisagy-neuronok', cat: 'emberi-test',
    q: 'a kisagy az agy térfogatának csak **kb. 10%-a**, de az idegsejtek **kb. 80%-a** benne van?',
    why: 'Az agy kb. 86 milliárd idegsejtjéből kb. **69 milliárd** a kisagyban van. Ennek oka, hogy a kisagy tele van apró, sűrűn pakolt **szemcsesejtekkel**, a kérge pedig erősen fodrozott, így kis helyen hatalmas felület fér el.\n\nA kisagy a mozgások **finomhangolója**: összeveti, mit akartunk csinálni és mi történt valójában, és menet közben korrigál. Ezért tudunk biciklizni, gépelni vagy elkapni egy labdát gondolkodás nélkül. Az alkohol a kisagy működését is rontja – ezért dülöngél a részeg ember.',
    links: ['modell:agy#kisagy', 'lecke:bio-alap/emberi-test-2']
  },
  {
    id: 'agy-nem-faj-uszik', cat: 'emberi-test',
    q: 'maga az agyszövet **nem érez fájdalmat**, és a koponyában szinte **lebeg**?',
    why: 'Az agyszövetben nincsenek fájdalomérző receptorok, ezért egyes agyműtéteket **éber betegen** végeznek: a sebész közben kérdezget, hogy ne sértse meg például a beszédközpontot. A fejfájást főleg az **agyhártyák**, az erek és a fej-nyak izmai okozzák, mert ezekben vannak fájdalomérzők.\n\nAz agyat az **agy-gerincvelői folyadék** veszi körül (kb. 150 ml, naponta kb. 500 ml termelődik és szívódik fel újra). A felhajtóerő miatt a kb. **1,4 kg**-os agy a folyadékban csak kb. **25–50 grammot** „nyom”, így nem nyomja szét a saját alsó részeit, és a folyadék ütéscsillapítóként is véd.',
    links: ['modell:agy#agyhartya', 'lecke:fiz-alap/nyomas', 'lecke:biologia/ideg-hormon-emesztes']
  },
  {
    id: 'latas-tarkon', cat: 'emberi-test',
    q: 'a szemünk elöl van, de a látott képet az agy **leghátsó részén**, a tarkónknál dolgozzuk fel?',
    why: 'A látókéreg a **nyakszirti lebenyben** van, a koponya hátsó részén. A **látóidegek** a szemből indulnak, és útközben a **látóidegkereszteződésnél** a rostok kb. fele átkerül a másik oldalra: így a **látótér bal fele** a jobb agyféltekébe, a jobb fele a bal féltekébe jut.\n\nHa a nyakszirti lebeny mindkét oldalon súlyosan károsodik (pl. stroke miatt), az ember **ép szemmel is vak** lehet, mert az agy nem tudja feldolgozni a beérkező jeleket. A látás tehát valójában az agyban történik.',
    links: ['modell:agy#nyakszirti', 'modell:szem#latoideg', 'szakszo:anatomia/latas']
  },
  {
    id: 'homunculus', cat: 'emberi-test',
    q: 'az agyunkban van egy **„térkép” a testünkről**, amelyen az **ajak és a kéz óriási**, a hát pedig apró?',
    why: 'A **fali lebeny** elülső szélén, a tapintás elsődleges kérgében minden testrésznek megvan a saját sávja. Wilder Penfield idegsebész az 1930–50-es években műtét közben enyhe árammal ingerelte ezeket a pontokat, és a betegek elmondták, hol éreznek bizsergést.\n\nA térkép **torz**: egy testrész annál nagyobb helyet kap, minél **finomabb** a tapintása, nem pedig minél nagyobb. Ha ezt egy emberfigurára rajzolják (**homunculus**, „emberke”), hatalmas ajkú, nyelvű és kezű, apró törzsű lényt kapunk. Ezért érezzük az ujjbegyünkkel egy hajszál vastagságát, a hátunkon viszont két tűszúrást sem tudunk megkülönböztetni, ha néhány cm-en belül vannak.',
    links: ['modell:agy#fali', 'lecke:bio-alap/emberi-test-2']
  },
  {
    id: 'homloklebeny-ereses', cat: 'emberi-test',
    q: 'az agyunk **homloklebenye** fejlődik ki a legkésőbb – nagyjából **a húszas éveink közepéig** érik?',
    why: 'A **homloklebeny** elülső része (prefrontális kéreg) felel a tervezésért, az önkontrollért, a következmények mérlegeléséért. Agyi képalkotó vizsgálatok szerint ez a terület érik a leglassabban: a „huzalozása” (a rostok szigetelése, a felesleges kapcsolatok lebontása) kb. a **húszas évek közepéig** tart – ez egyénenként változó.\n\nA jutalomra érzékeny, érzelmi agyterületek viszont kamaszkorban már nagyon aktívak. Ez is magyarázza, miért vonzóbb tinédzserkorban a kockázat és az újdonság – főleg, ha barátok is figyelnek. Ez nem hiba, hanem a felnőtté válás része.',
    links: ['modell:agy#homlok', 'lecke:biologia/ideg-hormon-emesztes']
  },
  {
    id: 'hippokampusz-taxis', cat: 'emberi-test',
    q: 'a londoni taxisofőrök agyában egy emlékezéshez fontos terület, a **hippokampusz** hátsó része **nagyobb** az átlagnál?',
    why: 'A londoni taxisoknak évekig kell tanulniuk a város kb. 25 000 utcáját („The Knowledge”). Egy 2000-es vizsgálat kimutatta, hogy náluk a **hippokampusz** hátsó része nagyobb, és minél több évet vezettek, annál nagyobb volt – az agy tehát **edzéssel változik**.\n\nA hippokampusz a **halántéklebeny** belső részén, a limbikus rendszerben van, és az új emlékek rögzítésében kulcsfontosságú. A híres H. M. nevű betegnél 1953-ban epilepszia miatt mindkét oldalon eltávolították, és utána **nem tudott új emlékeket** megjegyezni – a régi emlékei viszont megmaradtak.',
    links: ['modell:agy#limbikus', 'modell:agy#halantek', 'lecke:biologia/ideg-hormon-emesztes']
  },
  {
    id: 'legzes-co2', cat: 'emberi-test',
    q: 'a „levegő után kapkodás” érzését **nem az oxigénhiány**, hanem a **szén-dioxid** felgyűlése okozza?',
    why: 'A légzést az **agytörzs** (nyúltvelő) légzőközpontja irányítja, és ez elsősorban a vér **CO2-szintjére** (pontosabban a vele járó savasodásra) figyel. Ha visszatartod a lélegzeted, a kényszerítő légszomjat a felgyűlő CO2 okozza.\n\nEzért **életveszélyes** a víz alatti lélegzetvisszatartás előtti erős **túllélegzés (hiperventiláció)**: lecsökkenti a CO2-t, így a légszomj később jelentkezik – közben az oxigén elfogyhat, és az ember figyelmeztetés nélkül **elájulhat a víz alatt**.',
    links: ['modell:agy#agytorzs', 'szakszo:anatomia/gazcsere', 'lecke:biologia/keringes-legzes']
  },
  {
    id: 'lazas-termosztat', cat: 'emberi-test',
    q: 'lázas betegségnél azért **fázunk és vacogunk**, mert az agyunk **feljebb tekerte a termosztátot**?',
    why: 'A testhőmérséklet „termosztátja” a **köztiagy** alsó részén lévő **hipotalamusz**. Fertőzéskor az immunrendszer anyagai (pl. prosztaglandinok) feljebb állítják a beállított értéket, mondjuk 37 °C-ról 39 °C-ra. A test ilyenkor hidegnek érzi magát a saját 37 fokához képest: összehúzódnak a bőr erei, és **vacogunk**, hogy hőt termeljünk. A láz csillapodásakor fordítva: melegünk lesz, és izzadunk.\n\nA hipotalamusz irányítja az alatta lógó, borsónyi **agyalapi mirigyet** (hipofízist) is, amely sok más hormonmirigyet vezérel. A talamusz pedig az érzékszervi jelek „elosztója” – egyedül a **szaglás** jelei jutnak el elsőként a kéregbe a talamusz megkerülésével.',
    links: ['modell:agy#koztiagy', 'modell:agy#hipofizis', 'szakszo:anatomia/homeosztazis']
  },
  {
    id: 'szaruhartya-levego', cat: 'emberi-test',
    q: 'a szaruhártyádban **nincsenek erek**, és az oxigént **közvetlenül a levegőből** veszi fel?',
    why: 'A szaruhártyának tökéletesen **átlátszónak** kell lennie, ezért nincsenek benne vérerek. Az oxigént a könnyfilmben oldott levegőből kapja, a tápanyagokat a mögötte lévő csarnokvízből. Alváskor, csukott szemnél a szemhéj ereiből jut hozzá oxigén. Ezért kell a **kontaktlencsének** oxigénáteresztőnek lennie, és ezért nem ajánlott benne aludni.\n\nA szaruhártya végzi a szem fénytörésének nagyobb részét, kb. **kétharmadát** (kb. 43 dioptria a kb. 60-ból) – a szemlencse csak finomhangol. Ezért lehet lézeres műtéttel, a szaruhártya alakításával korrigálni a rövidlátást.',
    links: ['modell:szem#szaruhartya', 'lecke:fizika/hullamok-feny', 'szakszo:anatomia/latas']
  },
  {
    id: 'kek-szem-nincs-festek', cat: 'emberi-test',
    q: 'a kék szemben **nincs kék festék** – ugyanazért kék, amiért az ég?',
    why: 'A szivárványhártyában csak egyféle festék, a barnás **melanin** van. Barna szemben sok, kék szemben nagyon kevés. A kék szín ún. **szerkezeti szín**: a szivárványhártya elülső rétegében a fény az apró részecskéken szóródik, és a rövid hullámhosszú kék fény szóródik a legjobban – mint a légkörben, ezért kék az ég is. A zöld és a mogyoróbarna szem a kevés melanin és a szórás keveréke.\n\nSok csecsemő szeme születéskor kékes, és az első évben sötétedik, ahogy a melanin felhalmozódik. A szivárványhártya mintázata egyébként olyan egyedi, hogy az **íriszszkenner** személyazonosításra használja.',
    links: ['modell:szem#szivarvany', 'lecke:fizika/hullamok-feny', 'lecke:biologia/genetika']
  },
  {
    id: 'lencse-oregszik', cat: 'emberi-test',
    q: 'a szemlencséd belső sejtjei **még a születésed előtt** keletkeztek, és **sosem cserélődnek**?',
    why: 'A szemlencse rétegesen nő, mint a hagyma: új sejtek csak kívülről rakódnak rá, a belsők elveszítik a sejtmagjukat, és tele vannak átlátszó fehérjékkel (kristallinokkal), amelyek **egész életünkben** megmaradnak. A lencse ezért egyre vastagabb és merevebb lesz.\n\nKözelre nézéskor a **sugártest** izma összehúzódik, a lencsefüggesztő rostok elernyednek, és a rugalmas lencse domborúbbá válik. Kb. **40–45 éves kor** után a lencse már túl merev ehhez: így alakul ki az **időskori távollátás**, ezért kell olvasószemüveg. Távolba nézéskor viszont a sugártest izma elernyed – ezért pihentető tanulás közben időnként kinézni az ablakon.',
    links: ['modell:szem#lencse', 'modell:szem#sugartest', 'szakszo:anatomia/latas']
  },
  {
    id: 'csarnokviz-glaukoma', cat: 'emberi-test',
    q: 'a szemed elülső részében lévő folyadék **kb. másfél-két óránként teljesen kicserélődik**?',
    why: 'A **csarnokvizet** a **sugártest** termeli folyamatosan, percenként kb. 2–3 mikrolitert, és egy szűrőszerű csatornarendszeren át folyik el. Mivel az elülső csarnokban csak kb. 0,25 ml van, ez nagyjából **1,5–2 óra** alatt kicserélődik. A csarnokvíz táplálja az ér nélküli szaruhártyát és lencsét, és nyomásával feszesen tartja a szemgolyót.\n\nHa az elfolyás akadozik, a szemnyomás megemelkedik, és lassan, fájdalom nélkül károsítja a látóideget: ez a **zöldhályog (glaukóma)**, a visszafordíthatatlan vakság egyik leggyakoribb oka. Ezért mérik a szemorvosok a szemnyomást.',
    links: ['modell:szem#csarnokviz', 'modell:szem#sugartest', 'lecke:bio-alap/emberi-test-2']
  },
  {
    id: 'uvegtest-ufok', cat: 'emberi-test',
    q: 'a látóteredben úszkáló **„kis kukacok”** valójában a szemed belsejében lévő rostok **árnyékai**?',
    why: 'A szemgolyó nagy részét az **üvegtest** tölti ki: egy kb. 4 ml-es, kocsonyás anyag, amely kb. 99%-ban víz, kevés kollagénrosttal. Idővel a rostok összecsapzódnak, és világos háttér (ég, fehér fal) előtt a retinára vetett **árnyékukat** látjuk – mozgó pontoknak, fonalaknak. Mivel a szemmel együtt mozognak, „elúsznak”, ha rájuk akarunk nézni.\n\nEz többnyire ártalmatlan. Ha viszont **hirtelen sok** új úszkáló folt jelenik meg, villámlásszerű fényekkel vagy „függönnyel”, azonnal szemorvoshoz kell menni, mert ez **retinaleválás** jele lehet.',
    links: ['modell:szem#uvegtest', 'modell:szem#retina', 'lecke:bio-alap/emberi-test-2']
  },
  {
    id: 'voros-vertest-sejtmag', cat: 'emberi-test',
    q: 'a vörösvérsejtjeidnek **nincs sejtmagjuk**, és másodpercenként **kb. 2–3 millió** új készül belőlük?',
    why: 'Az érett emberi vörösvérsejt kidobja a **sejtmagját** és a mitokondriumait is, hogy több hely jusson a hemoglobinnak. Mitokondrium híján a szállított oxigént **nem is használja fel**, az energiáját oxigén nélkül, erjesztéssel nyeri. Alakja középen behorpadt korong, így nagy a felülete, és összehajolva a hajszálereken is átfér.\n\nCserébe nem tud osztódni és javítani magát: kb. **120 napig** él, utána a lép és a máj lebontja. A pótlásukra a csontvelő másodpercenként kb. 2–3 milliót gyárt. A testünk sejtjeinek darabszámra **nagyobb része** vörösvérsejt.',
    links: ['modell:sejt#mag', 'lecke:biologia/keringes-legzes', 'lecke:biologia/sejt']
  },
  {
    id: 'dns-2-meter', cat: 'emberi-test',
    q: 'egyetlen sejted magjában **kb. 2 méter DNS** van feltekerve – egy kb. 6 mikrométeres gömbben?',
    why: 'A DNS kettős spirál csak kb. **2 nm** vastag, de egy emberi sejt 46 kromoszómájában összesen kb. 2 m hosszú. Ez olyan, mintha kb. **20 km cérnát** gyömöszölnénk egy teniszlabdába. Ehhez a DNS **hisztonfehérjék** köré tekeredik (mint cérna az orsóra), ezek tovább tekerednek és hurkolódnak: így alakul ki a sejtmagban a **kromatin**, osztódáskor pedig a még tömörebb **kromoszóma**.\n\nHa a testünk összes sejtmagos sejtjének DNS-ét egy fonalba kötnénk, az **milliárd kilométeres** nagyságrendű lenne – messzebbre érne, mint a Plútó.',
    links: ['modell:dns#kromoszoma', 'modell:dns#meret', 'modell:sejt#kromatin', 'lecke:biologia/sejtosztodas']
  },
  {
    id: 'riboszoma-antibiotikum', cat: 'emberi-test',
    q: 'sok antibiotikum azért öli meg a baktériumokat, de minket nem, mert a **riboszómájuk más**, mint a miénk?',
    why: 'A **riboszómák** a sejt fehérjegyárai. A baktériumoké kisebb és más felépítésű (70S), mint a mi sejtplazmánkban lévők (80S). Számos antibiotikum (pl. a tetraciklinek, a sztreptomicin) kifejezetten a bakteriális riboszómához kötődik, és leállítja a baktérium fehérjegyártását – a mi riboszómáinkat alig zavarja.\n\nA miénk a **sejtmagvacskában** készül: ez a mag sűrűbb része, ahol a riboszómák RNS-e és alegységei összeállnak. Egy aktív sejtben **akár több millió** riboszóma is lehet. Érdekesség: a mitokondriumaink riboszómái a bakteriálisra hasonlítanak (ősi baktériumok voltak!) – egyes antibiotikumok mellékhatásait részben ezzel magyarázzák.',
    links: ['modell:sejt#riboszoma', 'modell:sejt#magvacska', 'lecke:biologia/sejt']
  },
  {
    id: 'feherje-utja', cat: 'emberi-test',
    q: 'egy hormon, pl. az inzulin **„futószalagon”** halad át a sejten – és a Golgi-készülék létezését **évtizedekig vitatták**?',
    why: 'A sejtből kiválasztott fehérjék (pl. az **inzulin** vagy az emésztőenzimek) a **durva endoplazmatikus retikulum** riboszómáin készülnek, majd kis hólyagokban a **Golgi-készülékbe** kerülnek, ahol „csomagolják és címkézik” őket, végül **vezikulákban** jutnak a sejthártyához, és kiürülnek. George Palade radioaktív jelöléssel követte végig ezt az utat, néhány perctől néhány óráig tartó szakaszokban – ezért 1974-ben Nobel-díjat kapott.\n\nCamillo Golgi 1898-ban ezüstfestéssel fedezte fel a róla elnevezett sejtalkotót, de sok kutató évtizedekig a festés mesterséges „műtermékének” tartotta. Csak az **elektronmikroszkóp** az 1950-es években bizonyította végleg, hogy valóban létezik.',
    links: ['modell:sejt#der', 'modell:sejt#golgi', 'modell:sejt#vezikula', 'lecke:biologia/sejt']
  },
  {
    id: 'sima-er-maj', cat: 'emberi-test',
    q: 'ha valaki rendszeresen iszik alkoholt, a **májsejtjeiben megnő** egy sejtalkotó, és ezért „bírja jobban” az italt?',
    why: 'A **sima endoplazmatikus retikulum** (riboszómák nélküli csatornarendszer) sokféle feladatot lát el: zsírokat és hormonokat állít elő, a májban pedig enzimjei **méregtelenítenek**, vagyis lebontják a gyógyszereket és az alkohol egy részét.\n\nRendszeres alkoholfogyasztás vagy egyes gyógyszerek szedése után a májsejtek sima ER-je jelentősen **megnagyobbodik**, és több lebontó enzim termelődik. Ez a **tolerancia** egyik oka – ugyanez viszont meg is változtathatja más gyógyszerek hatását. Az izomsejtekben a sima ER egy speciális változata a **kalciumot** tárolja, ami az izom összehúzódását indítja el.',
    links: ['modell:sejt#ser', 'lecke:biologia/sejt', 'lecke:biologia/ideg-hormon-emesztes']
  },
  {
    id: 'kinezin-setal', cat: 'emberi-test',
    q: 'a sejtjeidben apró fehérje-„robotok” **lépkednek** a sejtváz sínjein, és csomagokat cipelnek?',
    why: 'A **sejtváz** csőszerű elemei, a mikrotubulusok sínként működnek. Rajtuk motorfehérjék, pl. a **kinezin** szó szerint „lépked”: két „lába” felváltva kapaszkodik meg, egy-egy lépés kb. **8 nm**, és minden lépés egy ATP-molekulát használ el. Így szállítják a **vezikulákat** a sejt egyik végéből a másikba.\n\nEz különösen fontos az idegsejtekben, amelyek nyúlványa akár **1 méter** hosszú is lehet (a gerincvelőtől a lábujjig). A sejtplazma eközben nem híg leves: a térfogatának kb. **20–30%-át** fehérjék és más nagy molekulák töltik ki, olyan zsúfolt, mint egy tömött aluljáró – motorok nélkül a szállítás nagyon lassú lenne.',
    links: ['modell:sejt#sejtvaz', 'modell:sejt#vezikula', 'modell:sejt#plazma', 'lecke:biologia/sejt']
  },
  {
    id: 'bakterium-sejt-arany', cat: 'emberi-test',
    q: 'a testünkben **nem tízszer annyi** baktérium él, mint ahány saját sejtünk van, hanem **nagyjából ugyanannyi**?',
    why: 'Évtizedekig idézték, hogy a baktériumok 10:1 arányban „túlerőben” vannak – ez egy 1970-es évekbeli durva becslésből származott. Egy 2016-os pontosabb számítás szerint egy átlagos felnőttben kb. **30 ezer milliárd** emberi sejt és kb. **38 ezer milliárd** baktérium van, vagyis az arány nagyjából **1:1**.\n\nA baktériumok többsége a vastagbélben él, és mivel jóval kisebbek a mi sejtjeinknél, össztömegük csak kb. **0,2 kg**. Az emberi sejtek darabszámra legnagyobb része egyébként vörösvérsejt.',
    links: ['modell:sejt', 'lecke:biologia/sejt', 'lecke:termeszet/eloleny-sejt']
  },
  {
    id: 'dns-sav-gerinc', cat: 'emberi-test',
    q: 'a DNS azért **sav** (nukleinsav), mert a gerince tele van **negatív töltésű foszfátcsoportokkal** – és ezt a bűnügyi laborok is kihasználják?',
    why: 'A DNS mindkét szálának gerince felváltva **dezoxiribóz cukorból** és **foszfátcsoportból** áll. A foszfátok vizes oldatban leadják a hidrogénionjukat – ezért **sav** a DNS –, és **negatív töltésűek** maradnak.\n\nEzt használja a **gélelektroforézis**: árammal a DNS-darabok a **pozitív** pólus felé vándorolnak a gélben, a kisebbek gyorsabban. A kapott „csíkmintázattal” azonosítanak tetteseket és állapítanak meg rokonságot. A dezoxiribóz nevében a „dezoxi” azt jelenti, hogy **hiányzik egy oxigénatom** a ribózhoz képest – emiatt a DNS sokkal **stabilabb**, mint az RNS. Ennek köszönhető, hogy Grönlandon **kb. 2 millió éves** DNS-darabokat is ki tudtak olvasni.',
    links: ['modell:dns#gerinc', 'modell:dns#foszfat', 'modell:dns#dezoxiriboz', 'lecke:kemia/savak-bazisok']
  },
  {
    id: 'pcr-forro-forras', cat: 'emberi-test',
    q: 'a koronavírus-tesztekben is használt PCR-hez egy **forró vizű forrásban élő baktérium** enzime kell?',
    why: 'A DNS két szálát **hidrogénkötések** tartják össze: az A–T párt kettő, a G–C párt **három**, ezért a G–C-ben gazdag szakaszok nehezebben válnak szét. A **PCR** (polimeráz-láncreakció) során a mintát kb. **95 °C**-ra hevítik, ilyenkor a hidrogénkötések felszakadnak, és a szálak szétválnak; lehűtéskor egy enzim mindkét szálat lemásolja. Ezt 30–40-szer ismételve egy molekulából **milliárdnyi** másolat lesz.\n\nA legtöbb enzim a forralásba belepusztulna, ezért a Yellowstone Nemzeti Park forró forrásaiból izolált **Thermus aquaticus** baktérium hőálló enzimét (Taq-polimeráz) használják. A módszer feltalálója, Kary Mullis 1993-ban Nobel-díjat kapott.',
    links: ['modell:dns#hkotes', 'lecke:biologia/genetika', 'lecke:kemia/kemiai-kotesek']
  },
  {
    id: 'dns-arok-olvasas', cat: 'emberi-test',
    q: 'a génjeinket kapcsolgató fehérjék **ki sem nyitják** a DNS-t, mégis „kitapintják”, milyen betűk vannak benne?',
    why: 'A kettős spirál két szála között egy **széles** (nagy) és egy **keskeny** (kis) **árok** csavarodik körbe. Az árkok alján kilátszanak a bázisok szélei, és mindegyik bázispár (A–T, T–A, G–C, C–G) más mintázatban kínál hidrogénkötésre képes atomokat és kiálló csoportokat.\n\nAz ún. **transzkripciós faktorok** – a géneket ki- és bekapcsoló fehérjék – egy-egy részükkel belenyúlnak a **nagy árokba**, és ezt a mintázatot „olvassák le”, mint a vakírást. Így a hosszú DNS-en meg tudják találni a saját, néhány betűs célszakaszukat, anélkül hogy szétnyitnák a két szálat.',
    links: ['modell:dns#arkok', 'modell:dns#hkotes', 'lecke:biologia/genetika']
  },
  {
    id: 'genetikai-kod-univerzalis', cat: 'emberi-test',
    q: 'a cukorbetegek inzulinját ma **baktériumok** gyártják – mert a genetikai kód **szinte minden élőlényben ugyanaz**?',
    why: 'Minden élőlény DNS-e ugyanabból a négyféle **nukleotidból** épül fel (bázisaik: A, T, G, C), és ugyanabból az öt elemből: **szén, hidrogén, oxigén, nitrogén, foszfor**. A bázishármasok és az aminosavak közti „szótár”, a **genetikai kód** is szinte egyetemes (csak néhány apró kivétel ismert, pl. a mitokondriumokban).\n\nEzért ha az emberi inzulin génjét beültetik egy baktériumba, az ugyanazt a fehérjét készíti el belőle. Az így előállított humán inzulint **1982** óta használják – előtte sertés- és marhahasnyálmirigyből vonták ki.',
    links: ['modell:dns#nukleotid', 'modell:dns#atomok', 'modell:dns#bazisok', 'lecke:biologia/genetika']
  },

  /* ===================== ÉTELEK ===================== */
  {
    id: 'mez-nem-romlik', cat: 'etel',
    q: 'a jól lezárt méz **gyakorlatilag nem romlik meg**?',
    why: 'A mézben kevés a víz (kb. **17–18%**), viszont sok a cukor, ezért erős az **ozmotikus hatása**: a bele kerülő baktériumokból és gombákból kiszívja a vizet. Emellett **savas** (pH kb. 3,5–4,5), és a méhektől származó enzim (glükóz-oxidáz) kis mennyiségű **hidrogén-peroxidot** termel benne.\n\nRégészek beszámolói szerint egyiptomi sírokban több ezer éves, ehető állapotú mézet is találtak. Fontos: ha a méz nedvességet szív (nyitott üvegben), megerjedhet. A kristályosodás (megcukrosodás) viszont nem romlás – langyos vízfürdőben újra folyós lesz.',
    links: ['lecke:szakacs/homerseklet', 'lecke:kem-alap/anyagok']
  },
  {
    id: 'csili-madarak', cat: 'etel',
    q: 'a csilipaprika csípősségét a **madarak nem érzik**?',
    why: 'A csípősségért felelős **kapszaicin** a nyelvünk **hőérzékelő receptorához** (TRPV1) kötődik – ugyanahhoz, amelyik a 43 °C fölötti forróságot jelzi. Ezért érezzük „égetőnek”, holott hőmérséklet-változás nincs. A madarak TRPV1 receptora a kapszaicint nem érzékeli, így nyugodtan eszik a paprikát.\n\nEz a növénynek előny: az emlősök rágófogai összezúznák a magot, a madarak viszont épen kiürítik, messzire szétszórva. Csípős ételre víz helyett inkább **tejet** érdemes inni: a kapszaicin zsírban oldódik, vízben alig, a tej fehérjéi és zsírja pedig lemossák.',
    links: ['lecke:kemia/kemiai-kotesek', 'lecke:bio-alap/allatok']
  },
  {
    id: 'menta-nem-hut', cat: 'etel',
    q: 'a menta **nem hűt le** – csak **becsapja** a hidegérző idegeidet?',
    why: 'A mentában lévő **mentol** a hidegérző receptorhoz (TRPM8) kötődik, amely egyébként kb. 25 °C alatti hőmérsékletre kapcsol be. A mentol hatására ez a receptor szobahőmérsékleten is jelez, és az agy **hűvösnek** érzékeli a szájat – miközben a hőmérséklet nem változik.\n\nEzért érződik „hidegnek” a mentolos rágó után egy pohár víz. A csili kapszaicinje ugyanígy a **hőérzékelőt** csapja be – a kettő tehát egymás tükörképe.',
    links: ['lecke:bio-alap/emberi-test-2', 'lecke:kemia/reakciok']
  },
  {
    id: 'hagyma-konny', cat: 'etel',
    q: 'a hagyma csak **akkor csíp** a szemedbe, ha a sejtjei **összetörnek**, és két, addig külön tárolt anyag találkozik?',
    why: 'Az ép hagymasejtben a kéntartalmú kiindulási anyag a **sejtplazmában** van, a lebontó enzim (alliináz) viszont a **vakuólumban** – a kettő nem találkozik. Vágáskor a sejtek szétroncsolódnak, az enzim és az anyag összekeveredik, és egy újabb enzim közreműködésével illékony gáz (propántiál-S-oxid) keletkezik. Ez a szem nedves felszínén irritálja az idegvégződéseket, és **könnyezésre** késztet.\n\nTippek: **éles késsel** kevesebb sejt roncsolódik; a **hűtött** hagymából lassabban párolog a gáz; a főzés pedig tönkreteszi az enzimet – ezért a sült hagyma már nem csíp.',
    links: ['modell:level#sejtfal', 'lecke:szakacs/technologia', 'lecke:kemia/reakciok']
  },
  {
    id: 'maillard-reakcio', cat: 'etel',
    q: 'a főtt hús **soha nem pirul meg**, mert a víz nem lehet 100 °C-nál forróbb?',
    why: 'A sült hús, a kenyérhéj, a pirítós vagy a kávé barna színe és jellegzetes illata nagyrészt a **Maillard-reakcióból** származik: a cukrok és az aminosavak (fehérjeépítő kövek) több száz különféle íz- és illatanyaggá alakulnak. Ez a reakció igazán csak kb. **140 °C fölött** gyorsul fel.\n\nNormál légnyomáson a víz **100 °C-on forr**, és amíg víz van az étel felszínén, az nem lesz sokkal melegebb. Ezért kell a húst sütés előtt **szárazra törölni**, és ezért pirul meg a serpenyőben, de nem a levesben.',
    links: ['lecke:szakacs/technologia', 'lecke:kemia/reakciok', 'lecke:fiz-alap/hotan']
  },
  {
    id: 'popcorn-nyomas', cat: 'etel',
    q: 'a pattogatott kukorica szemében pattanás előtt **kb. 9-szer akkora nyomás** van, mint a légnyomás?',
    why: 'A kukoricaszem belsejében kb. **14% víz** van, a kemény, vízhatlan héj pedig nem engedi kiszökni. Hevítéskor a víz gőzzé alakul, a nyomás pedig egyre nő, egészen kb. **180 °C** környékéig, amikor a belső nyomás kb. **9–10 bar**. Ekkor a héj megreped, a nyomás hirtelen lecsökken, a gőz kitágul, és a megpuhult keményítőt habbá fújja, ami azonnal megszilárdul.\n\nAz a kukorica, amelyik túl száraz, vagy a héja sérült, nem pattan ki – ezért marad mindig néhány „pattanatlan” szem a tál alján.',
    links: ['lecke:fiz-alap/nyomas', 'lecke:fiz-alap/hotan', 'lecke:szakacs/technologia']
  },
  {
    id: 'ananasz-zsele', cat: 'etel',
    q: 'friss ananásszal **nem lehet zselét** készíteni, konzerv ananásszal viszont igen?',
    why: 'A zselatin **fehérje** (a kollagénből készül), és hosszú láncai alkotják a kocsonya hálószerkezetét. A friss ananászban lévő **bromelain** enzim fehérjebontó: szétvagdossa ezeket a láncokat, így a zselé nem dermed meg. Ugyanez igaz a friss kiwire és papayára is.\n\nA konzerv ananászt gyártáskor hevítik, ez **denaturálja** (tönkreteszi) az enzimet, így már nem bontja a zselatint. A bromelain miatt csíp kicsit a szájunk is, ha sok friss ananászt eszünk – ilyenkor a nyelvünk felszíni fehérjéit kezdi bontani.',
    links: ['lecke:kemia/reakciok', 'lecke:szakacs/technologia']
  },
  {
    id: 'sos-viz-forraspont', cat: 'etel',
    q: 'a tésztafőző víz sózása **gyakorlatilag nem** emeli meg a forráspontot?',
    why: 'Az oldott anyagok valóban emelik a forráspontot, de csak kicsit: egy literben 10 g só (ez már elég sós) a forráspontot csak kb. **0,2 °C**-kal emeli meg. Ennek a főzés idejére nincs érzékelhető hatása.\n\nA sót tehát az **íz** miatt tesszük bele: a tészta a főzővízből veszi fel. Ha a sóra a víz hirtelen erősebben pezseg, azt nem a forráspont változása okozza, hanem az, hogy a sókristályok felületén könnyebben képződnek gőzbuborékok.',
    links: ['lecke:fiz-alap/hotan', 'lecke:kem-alap/anyagok', 'lecke:szakacs/technologia']
  },
  {
    id: 'laktoz-tures', cat: 'etel',
    q: 'a Föld felnőtt lakosságának **nagyobbik része** nem bírja jól a tejcukrot – és a tejivás képessége egy **génváltozás** eredménye?',
    why: 'A tejcukor (laktóz) lebontásához **laktáz** enzim kell. Minden csecsemő termeli, de a legtöbb emlősnél – és az emberek többségénél is – az elválasztás után a gén kikapcsol. A felnőttek kb. **kétharmadánál** csökken a laktáztermelés, ilyenkor a lebontatlan tejcukrot a bélbaktériumok erjesztik, ami puffadást okozhat.\n\nAz elmúlt kb. 10 000 évben, ahol az emberek tejelő állatokat tartottak, elterjedtek olyan **mutációk** a laktázgén szabályozó szakaszában, amelyek bekapcsolva hagyják a gént. Ezért gyakori a tejtűrés pl. Észak-Európában, és ritka Kelet-Ázsiában. A laktózérzékenység egyébként **nem allergia**: a tejallergia a tejfehérje elleni immunreakció.',
    links: ['modell:dns#gen', 'lecke:biologia/genetika', 'lecke:szakacs/allergenek']
  },
  {
    id: 'hus-erlelese', cat: 'etel',
    q: 'a marhahúst azért **érlelik** napokig-hetekig, mert a hús **saját sejtjeinek enzimjei** puhítják meg?',
    why: 'A vágás után az izomsejtekben nem áll le azonnal minden folyamat. A sejt saját fehérjebontó enzimjei – a kalpainok és a **lizoszómákból** kiszabaduló katepszinek – lassan elkezdik lebontani az izomrostokat összetartó fehérjéket. A lizoszómák a sejt „emésztő hólyagjai”, belsejük savas (pH kb. 4,5–5), és enzimeik főleg ilyen savas közegben dolgoznak.\n\nAz ellenőrzött, **hűtött** (0–4 °C körüli) érlelés során a hús puhább és ízesebb lesz. Ez szigorú higiéniai feltételek mellett történik – otthon, szobahőmérsékleten ugyanez romláshoz vezetne.',
    links: ['modell:sejt#lizoszoma', 'lecke:szakacs/homerseklet', 'lecke:szakacs/higienia']
  }
]);
