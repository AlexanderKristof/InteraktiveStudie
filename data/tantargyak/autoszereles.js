/* Tantárgy: Autószerelés */
STUDIE.addSubject({
  id: 'autoszereles',
  title: 'Autószerelés',
  icon: '🔧',
  color: '#d9534f',
  description: 'Motor, kenés, hűtés, erőátvitel, fékek és diagnosztika: így működik és így javítják az autót.',
  intro: 'Ez a tananyag a gépjármű-szerelés **alapjait** tanítja meg: megérted, mi történik a motorháztető alatt, és miért úgy dolgozik a szerelő, ahogy. A gyakorlati munkát (különösen az emelést, a fékek és a kormány javítását) mindig tapasztalt szakember felügyelete mellett, megfelelő eszközökkel végezd, mert ezek az alkatrészek életeket védenek.',
  lessons: [
    {
      id: 'biztonsag',
      title: 'Biztonság a műhelyben és az emelés',
      level: 1, minutes: 9,
      summary: 'A műhely tipikus veszélyei, a védőfelszerelés, és hogyan emeld meg biztonságosan az autót.',
      tags: ['munkavédelem', 'emelő', 'bak', 'tengelytámasz', 'emelési pont', 'kerékék', 'szén-monoxid', 'védőfelszerelés', 'veszélyes hulladék'],
      sections: [
        {
          title: 'Mi veszélyes egy autószerelő-műhelyben?',
          text: 'Egy autó tele van tárolt energiával és veszélyes anyagokkal. A leggyakoribb veszélyek:\n\n- **Forgó alkatrészek**: a járó motor szíjai és a hűtőventilátor elkaphatják a ruhát, a hajat, az ujjat. A villamos ventilátor álló motornál is bekapcsolhat!\n- **Forró felületek**: a kipufogó és a motor több száz fokos is lehet, a hűtőfolyadék nyomás alatt áll.\n- **Kipufogógáz**: a **szén-monoxid (CO)** színtelen, szagtalan és halálos. Zárt térben motort csak elszívással szabad járatni.\n- **Akkumulátor**: töltéskor robbanásveszélyes **hidrogéngáz** fejlődik, a savas akkumulátor elektrolitja maró.\n- **Vegyszerek**: üzemanyag, fékfolyadék, fáradt olaj. Ezek tűzveszélyesek vagy mérgezőek, és **veszélyes hulladékként** kell gyűjteni őket.',
          warn: 'Zárt garázsban soha ne járasd a motort elszívás nélkül! A szén-monoxid percek alatt eszméletvesztést okozhat, és nem érzed a szagát.'
        },
        {
          title: 'Védőfelszerelés',
          text: 'A szerelő alapfelszerelése:\n\n- **Munkaruha**, ami nem lóg és nem akad be (a laza ujj, a nyaklánc és a hosszú, kiengedett haj veszélyes).\n- **Védőszemüveg**: köszörülésnél, fúrásnál, a jármű alatt és folyadékok kezelésekor kötelező.\n- **Védőkesztyű**: nitril kesztyű az olajhoz és vegyszerekhez, munkavédelmi kesztyű a durva munkához.\n- **Acélbetétes munkavédelmi cipő**: egy leeső féktárcsa vagy kerék súlyos sérülést okozhat.\n\nA munkahelyet tartsd rendben: a kiömlött olajat azonnal itasd fel, mert elcsúszhatsz rajta.'
        },
        {
          title: 'Az autó biztonságos megemelése',
          text: 'Az autó alatt végzett munka az egyik legveszélyesebb feladat. A szabályok:\n\n1. Az autó **sík, szilárd talajon** álljon, behúzott kézifékkel, sebességben (automatánál P állásban).\n2. A föld mentén maradó kerekeket **kerékékkel** támaszd ki.\n3. Emelni csak a gyártó által kijelölt **emelési pontokon** szabad (a küszöb alatti megerősített részen). Máshol a karosszéria behorpadhat, és az autó lecsúszhat.\n4. Az emelés után az autót **tengelytámaszra (bakra)** kell leengedni. Az emelő csak emelésre való, tartásra nem!\n5. Mielőtt bebújsz alá, finoman mozgasd meg az autót: biztosan áll-e.\n\nMűhelyben **kétoszlopos emelőt** vagy aknát használnak. Az emelő karjait szintén az emelési pontokhoz kell igazítani, és a kis emelés után ellenőrizni kell, hogy az autó stabilan fekszik-e.',
          warn: 'Soha ne dolgozz olyan autó alatt, amelyet csak egy emelő (krokodilemelő, ollós emelő) tart! Az emelő tömítése bármikor engedhet, és az autó másodpercek alatt leesik.',
          tip: 'A gyári emelési pontokat a kezelési könyv mutatja, a küszöbön gyakran kis bevágás vagy háromszög jelöli őket.'
        }
      ],
      quiz: [
        { q: 'Mire való a tengelytámasz (bak)?', options: ['A megemelt autó biztonságos megtartására', 'Az autó megemelésére', 'A kerékcsavarok meghúzására', 'A motor kiemelésére'], answer: 0, explain: 'Az emelővel emelünk, de az autót bakra kell leengedni, mert az emelő engedhet.' },
        { q: 'Miért veszélyes a járó motor zárt garázsban?', options: ['A kipufogógáz szén-monoxidja színtelen, szagtalan és halálos', 'Mert túl hangos', 'Mert elfogy az üzemanyag', 'Mert lemerül az akkumulátor'], answer: 0, explain: 'A CO a vér oxigénszállítását gátolja; zárt térben csak elszívással szabad motort járatni.' },
        { q: 'Hol szabad emelővel megemelni az autót?', options: ['A gyártó által kijelölt emelési pontokon', 'Bárhol a padlólemezen', 'Az olajteknőnél', 'A kipufogócsőnél'], answer: 0, explain: 'Csak ezek a pontok vannak megerősítve, máshol a karosszéria behorpadhat és az autó lecsúszhat.' },
        { q: 'Mi fejlődhet az akkumulátor töltésekor?', options: ['Robbanásveszélyes hidrogéngáz', 'Szén-monoxid', 'Oxigénhiány a motorban', 'Fékfolyadék'], answer: 0, explain: 'Ezért tilos szikrát okozni vagy dohányozni töltés közben az akkumulátor közelében.' }
      ]
    },
    {
      id: 'negyutemu-motor',
      title: 'A négyütemű motor',
      level: 1, minutes: 14,
      summary: 'Miből áll egy belső égésű motor, mi a négy ütem, és miben más a dízel.',
      tags: ['motor', 'négyütemű', 'Otto-motor', 'dízel', 'dugattyú', 'főtengely', 'szelep', 'vezérműszíj', 'gyújtógyertya', 'lökettérfogat', 'nyomaték', 'kompresszió'],
      models: ['benzinmotor'],
      sections: [
        {
          title: 'A motor fő részei',
          text: 'A belső égésű motor a tüzelőanyag kémiai energiáját alakítja **forgó mozgássá**. Fő részei:\n\n- **Motorblokk**: ebben vannak a **hengerek**.\n- **Dugattyú**: a hengerben fel-le mozog, a **dugattyúgyűrűk** tömítik.\n- **Hajtókar** és **főtengely**: a dugattyú egyenes vonalú mozgását forgássá alakítják, mint a biciklipedál.\n- **Hengerfej**: ebben vannak a **szívó- és kipufogószelepek**, valamint a **gyújtógyertya**.\n- **Vezérműtengely**: bütykei a megfelelő pillanatban nyitják a szelepeket. A főtengely a **vezérműszíjon vagy -láncon** keresztül hajtja.\n\nSzétszedve, alkatrészenként a [[benzinmotor|benzinmotor felfedezőjében]] nézheted meg.'
        },
        {
          title: 'A négy ütem',
          text: 'Egy teljes munkaciklus **négy ütemből** áll, és a főtengely közben **kétszer** fordul körbe (720°):\n\n1. **Szívás**: a dugattyú lefelé megy, a szívószelep nyitva, a henger megtelik levegő–benzin keverékkel.\n2. **Sűrítés**: mindkét szelep zárva, a dugattyú felfelé megy és összenyomja a keveréket.\n3. **Munkaütem**: a gyertya szikrája meggyújtja a keveréket, a táguló forró gáz lenyomja a dugattyút. Csak ez az ütem végez munkát!\n4. **Kipufogás**: a kipufogószelep nyitva, a dugattyú kitolja az égésterméket.\n\nA másik három ütemhez szükséges energiát a **lendkerék** tehetetlensége és a többi henger adja. Ezért van a legtöbb motornak több hengere, egymáshoz képest eltolt munkaütemekkel.',
          widget: { type: 'negyutemu' }
        },
        {
          title: 'Benzin vagy dízel?',
          text: 'A **benzinmotor (Otto-motor)** a keveréket **szikrával** gyújtja. Sűrítési viszonya tipikusan kb. **10:1–13:1**, mert nagyobb sűrítésnél a keverék magától, ütemen kívül begyulladna (ez a kopogás).\n\nA **dízelmotorban** nincs gyújtógyertya. Csak levegőt szív be, és azt kb. **15:1–20:1** arányban sűríti. Ettől a levegő 600 °C fölé melegszik, és a befecskendezett gázolaj **magától meggyullad** (kompressziós gyújtás). Hidegindításhoz **izzítógyertyák** segítenek.\n\nA dízel hatásfoka jobb, nagyobb a nyomatéka alacsony fordulaton, viszont a kipufogógáz-tisztítása bonyolultabb (részecskeszűrő, AdBlue).'
        },
        {
          title: 'Lökettérfogat, teljesítmény, nyomaték',
          text: '- A **lökettérfogat** az a térfogat, amit a dugattyú egy löket alatt „kisöpör”. Az összes henger lökettérfogata adja a motor méretét, pl. **1,6 liter (1598 cm³)**.\n- A **nyomaték (Nm)** azt mutatja, mekkora „csavaró erővel” forgatja a motor a főtengelyt.\n- A **teljesítmény (kW)** a nyomaték és a fordulatszám szorzatából jön: `P = M · 2π · n / 60` (n fordulat/perc).\n\nPélda: 200 Nm nyomaték 3000-es fordulaton: `P = 200 · 2 · 3,14 · 3000 / 60 ≈ 62 800 W ≈ 63 kW`. A régi mértékegység a lóerő: `1 LE ≈ 0,735 kW`, tehát ez kb. 85 LE.',
          tip: 'A vezérműszíjat a gyártó által megadott időközönként (pl. 100–200 ezer km) cserélni kell. Ha elszakad, sok motorban a dugattyú nekiütközik a nyitott szelepeknek, és a motor súlyosan károsodik.'
        }
      ],
      quiz: [
        { q: 'Hányat fordul a főtengely egy teljes négyütemű ciklus alatt?', options: ['Kettőt (720°)', 'Egyet (360°)', 'Négyet', 'Felet'], answer: 0, explain: 'Minden ütem egy fél fordulat, négy ütem tehát két fordulat.' },
        { q: 'Melyik ütem végez munkát?', options: ['A munkaütem (égés)', 'A szívás', 'A sűrítés', 'A kipufogás'], answer: 0, explain: 'Csak az égés tolja le a dugattyút, a többi ütem energiát fogyaszt.' },
        { q: 'Mi gyújtja meg az üzemanyagot a dízelmotorban?', options: ['Az erősen összesűrített, forró levegő', 'A gyújtógyertya szikrája', 'Az izzítógyertya menet közben', 'A kipufogógáz'], answer: 0, explain: 'Kompressziós gyújtás: a sűrítéstől felforrósodott levegőben a befecskendezett gázolaj magától meggyullad.' },
        { q: 'Mi a vezérműtengely feladata?', options: ['A szelepek nyitása a megfelelő pillanatban', 'A kerekek hajtása', 'Az olaj szivattyúzása a kerekekhez', 'A szikra előállítása'], answer: 0, explain: 'A bütykök nyomják le a szelepeket; a vezérműtengelyt a főtengely hajtja szíjjal vagy lánccal.' }
      ]
    },
    {
      id: 'kenes-hutes',
      title: 'Kenés és hűtés',
      level: 2, minutes: 12,
      summary: 'Miért kell olaj a motorba, mit jelent az 5W-30, és hogyan tartja a hűtőrendszer kb. 90 °C-on a motort.',
      tags: ['motorolaj', 'viszkozitás', '5W-30', 'olajcsere', 'olajnyomás', 'hűtőfolyadék', 'fagyálló', 'termosztát', 'vízpumpa', 'hűtő', 'túlmelegedés'],
      models: ['benzinmotor'],
      sections: [
        {
          title: 'Mire jó a motorolaj?',
          text: 'A motorban fém fémen csúszik nagy sebességgel: a dugattyú a hengerfalon, a főtengely a csapágyakban. Olaj nélkül percek alatt besülne. A motorolaj feladatai:\n\n- **Kenés**: vékony olajfilmet képez a felületek között, így azok nem érnek össze.\n- **Hűtés**: elvezeti a hőt a dugattyúkról és a csapágyakból.\n- **Tisztítás**: lebegve tartja a kormot és a kopási részecskéket, ezeket az **olajszűrő** kiszűri.\n- **Tömítés és korrózióvédelem**: segít tömíteni a dugattyúgyűrűket, és védi a fémet a rozsdától.\n\nAz olajat az **olajszivattyú** nyomja körbe az olajteknőből. Ha a műszerfalon kigyullad a piros **olajnyomás-jelző lámpa**, azonnal állj meg és állítsd le a motort!'
        },
        {
          title: 'Mit jelent az 5W-30?',
          text: 'Ez az olaj **viszkozitási osztálya** (SAE szerint), vagyis hogy mennyire „sűrűn” folyik:\n\n- Az **5W** a hideg viselkedést írja le (a W a winter, tél). Minél kisebb ez a szám, annál folyósabb hidegen, és annál gyorsabban eljut indításkor mindenhová.\n- A **30** az üzemi hőmérsékleten (100 °C körül) mért sűrűséget jelzi. Nagyobb szám = melegen sűrűbb olaj.\n\nMindig a gyártó által előírt viszkozitású és minősítésű olajat kell használni. Az olaj idővel elhasználódik, ezért rendszeresen (tipikusan 10–30 ezer km-enként vagy évente) **olajcserét** kell végezni, az olajszűrővel együtt.',
          tip: 'Az olajszintet sík talajon, leállított és néhány percig pihent motornál nézd a nívópálcán: a MIN és MAX jel között legyen.'
        },
        {
          title: 'A hűtőrendszer',
          text: 'Az égés energiájának jelentős része hővé válik, amit el kell vezetni. A legtöbb autó **folyadékhűtéses**:\n\n- A **hűtőfolyadék** víz és **fagyálló** (etilénglikol vagy propilénglikol) keveréke, korrózióvédő adalékkal. Télen nem fagy meg, nyáron magasabb hőmérsékleten forr.\n- A **vízpumpa** keringeti a folyadékot a motorblokk csatornáiban.\n- A **termosztát** hidegindításkor zárva van, így a motor gyorsan felmelegszik. Kb. 85–95 °C-nál kinyit, és a folyadék a **hűtőn** (radiátoron) is átfolyik.\n- A **hűtőventilátor** álló vagy lassú autónál levegőt szív át a hűtőn.\n- A **kiegyenlítő tartály** fogadja a melegen kitáguló folyadékot.\n\nTúlmelegedéskor a hengerfej deformálódhat, és a **hengerfejtömítés** kiéghet. Ez drága javítás.',
          warn: 'Forró motornál soha ne nyisd ki a hűtő vagy a kiegyenlítő tartály kupakját! A rendszer nyomás alatt van, a forró folyadék kicsaphat és súlyos égési sérülést okozhat. Várd meg, amíg a motor kihűl.'
        }
      ],
      quiz: [
        { q: 'Mit jelent az 5W-30 jelölésben az 5W?', options: ['A hideg (téli) folyóképességet', 'Az olaj színét', 'Hogy 5 literes a kiszerelés', 'Hogy 5 évig jó'], answer: 0, explain: 'A W a winter rövidítése; minél kisebb a szám, annál folyósabb az olaj hidegen.' },
        { q: 'Mi a termosztát feladata?', options: ['Hidegen zárva tartja a nagy kört, hogy a motor gyorsan felmelegedjen', 'Ez hajtja a hűtőfolyadékot', 'Ez méri az olajszintet', 'Ez hűti a klímát'], answer: 0, explain: 'Kb. 85–95 °C-nál nyit ki, ekkor a folyadék már a hűtőn keresztül is kering.' },
        { q: 'Mit kell tenni, ha menet közben kigyullad a piros olajnyomás-lámpa?', options: ['Azonnal biztonságosan megállni és leállítani a motort', 'Gyorsítani, hogy jobban pörögjön az olaj', 'Elég a következő szervizben megnézetni', 'Hűtőfolyadékot kell utántölteni'], answer: 0, explain: 'Olajnyomás nélkül a csapágyak percek alatt tönkremehetnek.' },
        { q: 'Miért nem szabad forró motornál kinyitni a hűtősapkát?', options: ['Mert a rendszer nyomás alatt van, és a forró folyadék kicsaphat', 'Mert elpárolog a fagyálló', 'Mert a motor azonnal leáll', 'Mert levegő kerül a fékrendszerbe'], answer: 0, explain: 'A nyomás miatt a folyadék 100 °C felett is folyékony; nyitáskor hirtelen felforr és kispriccel.' }
      ]
    },
    {
      id: 'eroatvitel',
      title: 'Erőátvitel: kuplung, váltó, áttétel',
      level: 2, minutes: 14,
      summary: 'Hogyan jut el a motor forgása a kerekekig, és miért kell hozzá sebességváltó.',
      tags: ['erőátvitel', 'kuplung', 'tengelykapcsoló', 'sebességváltó', 'áttétel', 'fogaskerék', 'nyomaték', 'differenciálmű', 'kettős tömegű lendkerék', 'automata váltó'],
      sections: [
        {
          title: 'Miért kell sebességváltó?',
          text: 'Egy benzinmotor kb. 800 és 6500 közötti fordulaton működik jól, és a nyomatéka is csak egy sávban nagy. A kerekeknek viszont induláskor nagy **nyomaték** és kis fordulat kell, autópályán pedig kisebb nyomaték és nagy fordulat.\n\nA **sebességváltó** fogaskerekekkel alakítja át a forgást. Első fokozatban a motor sokat forog, a kerék keveset, de nagy erővel. Ötödikben vagy hatodikban fordítva. A teljesítményt a váltó (a súrlódási veszteségektől eltekintve) nem változtatja meg, csak „átváltja” fordulatból nyomatékba vagy vissza.'
        },
        {
          title: 'Az áttétel',
          text: 'Az **áttétel (i)** a hajtott és a hajtó fogaskerék fogszámának aránya: `i = z2 / z1`.\n\n- Ha `i = 3`, a kimenő tengely **háromszor lassabban** forog, de **háromszor nagyobb** a nyomatéka.\n- Ha `i < 1`, a kimenő tengely gyorsabban forog (ez a gyorsító, „overdrive” fokozat).\n\nEgy kézi váltó tipikus áttételei: 1. fokozat kb. 3,5 : 1, 5. fokozat kb. 0,8 : 1. Utána még a **differenciálmű** (a „hátsóhíd”, ma inkább a váltóba épített főhajtás) is lassít kb. 3–4-szeresen. Próbáld ki!',
          widget: { type: 'attetel' }
        },
        {
          title: 'A kuplung (tengelykapcsoló)',
          text: 'A motor folyamatosan forog, az autó viszont álló helyzetből indul, és váltáskor meg kell szakítani az erőátvitelt. Erre való a **tengelykapcsoló**:\n\n- A motor **lendkerekére** a **nyomólap** rugóereje szorítja a **kuplungtárcsát**, amely súrlódással viszi át a nyomatékot a váltó felé.\n- Ha lenyomod a kuplungpedált, a **kinyomócsapágy** elhúzza a nyomólapot, a tárcsa felszabadul, megszakad az erőátvitel.\n- Felengedéskor a tárcsa először csúszik, majd fokozatosan összekapcsolódik. Ez a „finom elindulás”.\n\nA tárcsa súrlódóbetéte kopik. Ha a kuplung „csúszik” (a fordulat nő, de az autó alig gyorsul), cserélni kell. Sok mai autóban **kettős tömegű lendkerék** csillapítja a rezgéseket.',
          tip: 'Ne tartsd a lábad a kuplungpedálon menet közben, és ne „kuplungon tartsd” az autót emelkedőn: ettől a tárcsa gyorsan kopik és melegszik.'
        },
        {
          title: 'Differenciálmű és automata váltók',
          text: 'Kanyarban a külső kerék hosszabb utat tesz meg, mint a belső, ezért gyorsabban kell forognia. A **differenciálmű** bolygókerekes szerkezete ezt lehetővé teszi, miközben mindkét kerékre nyomatékot juttat.\n\nAz **automata váltók** maguk váltanak fokozatot:\n\n- **Hagyományos automata**: hidrodinamikus nyomatékváltó és bolygóművek.\n- **Duplakuplungos (DSG)**: két kuplung, az egyik a páros, a másik a páratlan fokozatokat kezeli, így szinte megszakítás nélkül vált.\n- **CVT (fokozatmentes)**: két kúpos tárcsa és egy acélszíj, az áttétel folyamatosan változik.'
        }
      ],
      quiz: [
        { q: 'Mekkora az áttétel, ha a hajtó kerék 12, a hajtott 36 fogú?', options: ['3 : 1', '1 : 3', '24 : 1', '48 : 1'], answer: 0, explain: 'i = z2 / z1 = 36 / 12 = 3. A kimenet háromszor lassabb, a nyomaték háromszoros.' },
        { q: 'Mit változtat meg a sebességváltó?', options: ['A fordulatszám és a nyomaték arányát', 'A motor teljesítményét', 'A motor lökettérfogatát', 'Az üzemanyag fajtáját'], answer: 0, explain: 'A teljesítmény (veszteségektől eltekintve) ugyanaz marad, csak fordulat és nyomaték cserélődik.' },
        { q: 'Mi történik, ha lenyomod a kuplungpedált?', options: ['Megszakad a kapcsolat a motor és a váltó között', 'Az autó fékez', 'A motor nagyobb fordulatra kapcsol', 'Bekapcsol az első fokozat'], answer: 0, explain: 'A kinyomócsapágy elhúzza a nyomólapot, a kuplungtárcsa felszabadul.' },
        { q: 'Miért kell a differenciálmű?', options: ['Mert kanyarban a két hajtott kerék eltérő sebességgel forog', 'Hogy több üzemanyagot spóroljon', 'Hogy hűtse a váltót', 'Hogy a motor gyorsabban induljon'], answer: 0, explain: 'A külső kerék hosszabb ívet fut be, mint a belső, ezt a differenciálmű kiegyenlíti.' }
      ]
    },
    {
      id: 'fekrendszer',
      title: 'A fékrendszer: hidraulika és ABS',
      level: 2, minutes: 13,
      summary: 'Hogyan sokszorozza meg a hidraulika a lábad erejét, és miért nem blokkolnak a kerekek ABS-sel.',
      tags: ['fék', 'hidraulika', 'Pascal-törvény', 'főfékhenger', 'féknyereg', 'tárcsafék', 'dobfék', 'fékbetét', 'fékfolyadék', 'DOT 4', 'ABS', 'fékrásegítő'],
      sections: [
        {
          title: 'A hidraulikus fék elve',
          text: 'A fékpedált nyomva a **főfékhengerben** egy dugattyú nyomást hoz létre a **fékfolyadékban**. A folyadék gyakorlatilag összenyomhatatlan, ezért a nyomás a csöveken keresztül **minden irányban egyformán** terjed (ez **Pascal törvénye**), és eljut a kerekeknél lévő **munkahengerekig**.\n\nA nyomás `p = F / A`. Ha a kerékhenger dugattyújának felülete sokkal nagyobb, mint a főfékhengeré, akkor ugyanakkora nyomás **sokkal nagyobb erőt** hoz létre: `F2 = F1 · A2 / A1`. Ehhez jön még a **fékrásegítő** (benzinesnél a szívócső vákuuma, ma gyakran elektromos szivattyú), ami tovább növeli az erőt.\n\nBiztonsági okból a rendszer **kétkörös**: ha az egyik kör megsérül, a másik még fékez.'
        },
        {
          title: 'Tárcsafék és dobfék',
          text: '- **Tárcsafék**: a kerékkel együtt forgó **féktárcsát** a **féknyereg** dugattyúi két oldalról **fékbetétekkel** szorítják. Jól hűl, ezért ma minden autó első kerekén ez van, gyakran a hátsón is.\n- **Dobfék**: a forgó dob belsejében két **fékpofa** feszül kifelé. Olcsóbb, és könnyű beleépíteni a rögzítőféket, ezért egyes kisautók hátsó kerekén ma is megtalálható.\n\nFékezéskor az autó mozgási energiája **hővé** alakul. Hosszú lejtőn a fék túlmelegedhet és „elfáradhat”, ezért ott kisebb fokozatban, motorfékkel kell haladni.'
        },
        {
          title: 'A fékfolyadék',
          text: 'A fékfolyadék (pl. **DOT 4**) **higroszkópos**: a levegőből lassan vizet szív magába. A víz csökkenti a forráspontját. Erős fékezéskor a folyadék felforrhat, a gőzbuborék pedig összenyomható, így a pedál „a padlóig megy”, és az autó alig fékez.\n\nEzért a fékfolyadékot a gyártói előírás szerint, tipikusan **kétévente** cserélni kell, és csere után a rendszert **légteleníteni** kell.',
          warn: 'A fékrendszer életet véd. Fékbetétet, tárcsát vagy fékcsövet csak szakember (vagy szakember felügyelete mellett tanuló) cserélhet, utána mindig próbafékezéssel kell ellenőrizni. A fékfolyadék mérgező és a fényezést is kimarja.'
        },
        {
          title: 'Az ABS',
          text: 'Ha egy kerék erős fékezéskor **blokkol** (megáll és csúszik), az autó **kormányozhatatlanná** válik, és jeges úton a fékút is hosszabb lehet. Az **ABS (blokkolásgátló)** ezt akadályozza meg:\n\n1. Minden keréknél egy **fordulatszám-érzékelő** figyeli a kerék forgását.\n2. Ha az egyik kerék a többinél sokkal gyorsabban lassul (blokkolni készül), a vezérlőegység szelepekkel **csökkenti** annál a keréknél a féknyomást.\n3. Amint a kerék újra forog, a nyomást visszaengedi. Ez másodpercenként akár többször is megismétlődik: ezt érzed a pedál **lüktetéseként**.\n\nVészhelyzetben ABS-es autóval **teljes erővel** nyomd a féket, és közben kormányozz ki az akadály mellett. Az ABS-re épül a menetstabilizáló (**ESP**) is.'
        }
      ],
      quiz: [
        { q: 'Melyik fizikai törvényen alapul a hidraulikus fék?', options: ['Pascal törvényén', 'Ohm törvényén', 'Newton gravitációs törvényén', 'Archimédész törvényén'], answer: 0, explain: 'A zárt folyadékban a nyomás minden irányban egyformán terjed.' },
        { q: 'Miért kell rendszeresen cserélni a fékfolyadékot?', options: ['Mert vizet szív magába, és csökken a forráspontja', 'Mert elpárolog', 'Mert megváltozik a színe', 'Mert elhasználja a motor'], answer: 0, explain: 'A higroszkópos folyadékban a víz felforrhat, a gőzbuborék miatt a fék hatástalanná válik.' },
        { q: 'Mit csinál az ABS, ha egy kerék blokkolni készül?', options: ['Rövid időre csökkenti annál a keréknél a féknyomást', 'Kikapcsolja a motort', 'Növeli a féknyomást', 'Lekapcsolja a fékrásegítőt'], answer: 0, explain: 'Így a kerék tovább forog, és az autó kormányozható marad.' },
        { q: 'Ha a főfékhenger dugattyúja 1 cm², a munkahengeré 10 cm², és a főhengerre 300 N hat, mekkora erő hat a munkahengeren?', options: ['3000 N', '300 N', '30 N', '3 N'], answer: 0, explain: 'A nyomás ugyanaz, az erő a felülettel arányos: 300 · 10 / 1 = 3000 N.' }
      ]
    },
    {
      id: 'diagnosztika',
      title: 'Diagnosztika: OBD-II és hibakódok',
      level: 3, minutes: 13,
      summary: 'Hogyan beszél a szerelő az autó számítógépével, és mit árul el egy P0301-es hibakód.',
      tags: ['diagnosztika', 'OBD-II', 'EOBD', 'hibakód', 'DTC', 'motorhiba-lámpa', 'MIL', 'P0301', 'élő adatok', 'lambdaszonda', 'CAN-busz', 'vezérlőegység', 'ECU'],
      models: ['processzor'],
      sections: [
        {
          title: 'Az autó számítógépei',
          text: 'Egy mai autóban több tucat **vezérlőegység (ECU)** dolgozik: motorvezérlő, váltóvezérlő, ABS, légzsák, klíma. Ezek apró számítógépek; a bennük lévő mikrovezérlő működéséről a [[processzor|processzor felfedezőjében]] olvashatsz. Az egységek a **CAN-buszon** beszélgetnek egymással.\n\nA motorvezérlő folyamatosan méri az érzékelőket (levegőmennyiség, hőmérséklet, főtengely-helyzet, **lambdaszonda**), és ezek alapján számolja ki a befecskendezést és a gyújtás időpontját. Ha valami nem stimmel, **hibakódot** tárol, és ha a hiba a kipufogógázt is érinti, felgyújtja a sárga **motorhiba-lámpát (MIL)**.'
        },
        {
          title: 'Az OBD-II csatlakozó',
          text: 'Az **OBD-II** (az EU-ban **EOBD**) szabványos fedélzeti diagnosztikai rendszer. Az EU-ban benzineseknél 2001-től, dízeleknél 2004-től kötelező. Ismertetőjele a **16 pólusú csatlakozó**, ami szinte mindig a kormány alatt, a vezető lábánál található.\n\nEgy diagnosztikai műszerrel (vagy olcsó OBD-adapterrel és telefonnal) ki lehet olvasni:\n\n- a tárolt és függő **hibakódokat (DTC)**,\n- az **élő adatokat** (fordulatszám, hűtőfolyadék-hőmérséklet, lambdaszonda-feszültség, üzemanyag-korrekció),\n- a **kimerevített képet (freeze frame)**: milyen állapotban volt a motor, amikor a hiba keletkezett.'
        },
        {
          title: 'Hogyan olvass egy hibakódot?',
          text: 'Egy szabványos hibakód öt karakterből áll, például **P0301**:\n\n- **1. betű**: a rendszer. **P** = hajtáslánc (motor, váltó), **B** = karosszéria, **C** = futómű, **U** = hálózati kommunikáció.\n- **1. számjegy**: **0** = szabványos (minden gyártónál ugyanazt jelenti), **1** = gyártóspecifikus.\n- **2. számjegy**: az alrendszer, pl. **3** = gyújtás és égéskimaradás.\n- **Utolsó két számjegy**: a konkrét hiba. A P030x-nél ez a henger száma.\n\nA **P0301** tehát: égéskimaradás az 1. hengerben. A P0300 véletlenszerű, több hengert érintő égéskimaradást jelent.',
          tip: 'Egy másik gyakori kód: a P0171 („túl szegény keverék, 1. hengersor”). Gyakran nem az érzékelő hibás, hanem fals levegő jut a szívórendszerbe egy repedt csövön át.'
        },
        {
          title: 'A hibakód csak nyom, nem ítélet',
          text: 'A kód azt mondja meg, **mit vett észre** a vezérlő, nem azt, **melyik alkatrész** a hibás. A P0301 oka lehet rossz gyertya, gyújtótekercs, befecskendező, vagy akár alacsony kompresszió is. A jó szerelő módszeresen dolgozik:\n\n1. Kiolvassa a kódot és a freeze frame adatokat.\n2. Megnézi az élő adatokat, és tesztel: pl. **felcseréli** az 1. és 2. henger gyújtótekercsét. Ha a hiba átköltözik P0302-re, a tekercs a hibás.\n3. Javít, **törli** a kódot, majd próbaúttal ellenőrzi, hogy nem jön vissza.\n\nA kód törlése önmagában nem javítás: ha az ok megmaradt, a lámpa hamarosan újra kigyullad.',
          warn: 'Ha a motorhiba-lámpa villog, az súlyos égéskimaradást jelez. Az el nem égett üzemanyag a katalizátorban ég el és tönkreteheti. Ilyenkor kímélve, minél előbb állj meg, és vizsgáltasd meg az autót.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a P0301 hibakód?', options: ['Égéskimaradás az 1. hengerben', 'Hibás ABS-érzékelő', 'Alacsony az olajszint', 'Kommunikációs hiba a CAN-buszon'], answer: 0, explain: 'P = hajtáslánc, 0 = szabványos, 3 = gyújtás/égéskimaradás, 01 = 1. henger.' },
        { q: 'Hány pólusú a szabványos OBD-II csatlakozó?', options: ['16', '4', '9', '32'], answer: 0, explain: 'A 16 pólusú csatlakozó általában a kormány alatt található.' },
        { q: 'Mit jelent a hibakód elején az U betű?', options: ['Hálózati kommunikációs hibát', 'Üzemanyag-rendszer hibát', 'Utastér-hibát', 'Ultrahangos érzékelő hibát'], answer: 0, explain: 'P = hajtáslánc, B = karosszéria, C = futómű, U = hálózat (network).' },
        { q: 'Elég-e kitörölni a hibakódot a javításhoz?', options: ['Nem, a hiba okát meg kell találni és meg kell szüntetni', 'Igen, utána a hiba megszűnik', 'Igen, ha utána újraindítjuk a motort', 'Csak dízelautóknál'], answer: 0, explain: 'A kód csak tünetet jelez; ha az ok megmarad, a vezérlő újra eltárolja.' }
      ]
    }
  ]
});
