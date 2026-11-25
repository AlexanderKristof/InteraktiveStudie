/* Tantárgy: Edzői ismeretek – az edző szerepe, edzéstervezés, utánpótlás, terhelésmonitorozás,
 * sérülésmegelőzés, képességfejlesztés, kommunikáció, regeneráció, technika- és taktikaoktatás.
 * Gyakorlati, biztonságtudatos alapok edzőknek, segédedzőknek és sportoló szülőknek. */
STUDIE.addSubject({
  id: 'edzo',
  stage: 'szakma',
  title: 'Edzői ismeretek',
  icon: '🏋️',
  color: '#2b8a3e',
  description: 'Edzéstervezés és periodizáció, utánpótlás-nevelés, terhelésmonitorozás, sérülésmegelőzés, kommunikáció és technikaoktatás – így dolgozik a jó edző.',
  intro: 'Ez a tananyag azoknak szól, akik **edzőnek, segédedzőnek** készülnek, vagy már most is foglalkoznak sportolókkal (akár szülőként, csapatkapitányként). Megtanulod, hogyan **tervezz** edzést, hogyan **mérd** a terhelést, hogyan **előzd meg** a sérüléseket, és hogyan **beszélj** úgy a sportolóiddal, hogy fejlődjenek és szeressék a sportot.\n\nAz alapelvek sportágfüggetlenek. A számok (terjedelmek, százalékok, határértékek) **tájékoztató jellegűek**: a konkrét edzésterv mindig a sportoló korától, edzettségétől és egészségi állapotától függ. Sérülés, betegség vagy fejsérülés gyanújánál **orvos** dönt, nem az edző.',
  lessons: [
    {
      id: 'edzo-szerepe',
      title: 'Az edző szerepe, etika és gyermekvédelem',
      level: 1, minutes: 14,
      summary: 'Mi az edző feladata és felelőssége, milyen etikai elvek kötik, és hogyan védi a rábízott gyerekeket a bántalmazástól.',
      tags: ['edző', 'edzői szerep', 'etika', 'gyermekvédelem', 'safeguarding', 'felelősség', 'bántalmazás', 'kétfős szabály', 'felügyelet', 'elsősegély', 'sportolóközpontú', 'erkölcsi bizonyítvány'],
      sections: [
        {
          title: 'Mit csinál egy edző?',
          text: 'Az edző sokkal több, mint aki „levezényli az edzést”. Egyszerre:\n\n- **Tervező**: évre, hónapra, hétre és alkalomra lebontva tervezi a fejlődést.\n- **Tanár**: technikát és taktikát tanít, visszajelzést ad.\n- **Felügyelő**: felel a rábízott sportolók **biztonságáért** az edzés teljes ideje alatt (öltöző, utazás, verseny is).\n- **Példakép**: a viselkedése, a szóhasználata és a sportszerűsége mintát ad.\n- **Csapatépítő és kapcsolattartó**: sportolókkal, szülőkkel, orvossal, gyúróval, egyesülettel kommunikál.\n\nA modern edzői felfogás **sportolóközpontú**: a cél nem az edző dicsősége vagy egy-egy gyerekkorú győzelem, hanem a sportoló **hosszú távú fejlődése, egészsége és jólléte**. Egy utánpótlásedző sikerét az is méri, hány gyerek sportol még 18 évesen is.',
          tip: 'Egy egyszerű önellenőrző kérdés minden döntés előtt: **„Ez a sportolónak jó, vagy nekem?”** Ha a válasz bizonytalan, valószínűleg az edző érdeke került előtérbe.'
        },
        {
          title: 'Felelősség: a biztonság az első',
          text: 'Az edző **gondossági kötelezettséggel** tartozik: előre kell látnia az ésszerűen előrelátható veszélyeket. A gyakorlatban:\n\n1. **Helyszín és eszköz ellenőrzése** edzés előtt: csúszós padló, kiálló csavar, rögzítetlen kapu (a felboruló focikapu halálos baleseteket okozott!), hiányos védőfelszerelés.\n2. **Létszám és felügyelet**: soha ne hagyd felügyelet nélkül a gyerekeket, és ne kezdj olyan gyakorlatba, amit egyedül nem tudsz biztonságosan levezetni.\n3. **Egészségügyi információk**: tudd, ki asztmás, ki allergiás (adrenalin-autoinjektor!), kinek van cukorbetegsége vagy epilepsziája. A **sportorvosi alkalmassági** igazolás érvényességét az egyesület ellenőrzi.\n4. **Vészhelyzeti terv**: hol az elsősegélydoboz és a **defibrillátor (AED)**, ki hívja a mentőt (Magyarországon **112**), hogyan jut be a mentő.\n5. **Dokumentáció**: jelenléti ív, sérülésnapló, baleseti jegyzőkönyv.',
          warn: 'Mozgatható kapukat, kosárpalánkokat mindig rögzíteni kell, és tilos rájuk csimpaszkodni. Egy felboruló kapu súlya egy gyereket halálosan megsebesíthet.'
        },
        {
          title: 'Edzői etika',
          text: 'A legtöbb sportszövetségnek van **etikai kódexe**. A közös elvek:\n\n- **Tisztelet és méltóság**: nincs megalázás, kiabálás a személyre, testsúlyra tett megjegyzés, kiközösítés.\n- **Fair play és tiszta sport**: az edző soha nem bátorít szabálytalanságra, sérülésre játszásra vagy **doppingra**. A doppingellenes szabályok a sportoló környezetére (edző, orvos) is vonatkoznak.\n- **Szakmai határok**: nincs romantikus vagy szexuális kapcsolat a rábízott sportolóval; ajándékok, privát üzenetek, kettesben töltött idő átlátható szabályok szerint.\n- **Kompetencia**: az edző csak azt csinálja, amihez ért. Sérülést diagnosztizálni, gyógyszert vagy étrend-kiegészítőt ajánlani **nem edzői feladat**.\n- **Esélyegyenlőség**: nem tesz különbséget nem, származás, vallás, fogyatékosság vagy anyagi helyzet alapján.\n- **Titoktartás**: a sportoló egészségügyi és személyes adatait bizalmasan kezeli.'
        },
        {
          title: 'Gyermekvédelem (safeguarding)',
          text: 'A **safeguarding** (gyermek- és sportolóvédelem) azt jelenti, hogy a szervezet **előre** megteszi mindazt, ami csökkenti a bántalmazás esélyét, és tudja, mit tegyen, ha mégis gyanú merül fel. A bántalmazás formái:\n\n- **fizikai** (ütés, büntetésből adott kimerítő gyakorlat),\n- **érzelmi/lelki** (megalázás, fenyegetés, folyamatos kritika, szeretetmegvonás),\n- **szexuális** (bármilyen szexuális tartalmú érintés, üzenet, kép),\n- **elhanyagolás** (sérült gyerek játszatása, ivóvíz, pihenő megtagadása).\n\n**Megelőző gyakorlatok** (sok nemzetközi szervezet ajánlja őket):\n\n1. **Kétfős (látható) szabály**: felnőtt ne legyen kettesben, zárt ajtó mögött egy gyerekkel; ha négyszemközti beszélgetés kell, az legyen **látható és hallótávolságon belüli** helyen.\n2. **Átlátható kommunikáció**: kiskorúval üzenetet csoportban vagy a szülő bevonásával.\n3. **Öltöző és utazás**: külön szabályok, a felnőttek nem tartózkodnak a gyerekekkel egy öltözőben.\n4. **Kijelölt gyermekvédelmi felelős** az egyesületben, akihez bárki fordulhat.\n5. **Háttérellenőrzés**: Magyarországon például a **gyermektáborok** szervezőinek és közreműködőinek 2024 óta kifejezetten erkölcsi bizonyítvánnyal kell rendelkezniük; sok szövetség saját gyermekvédelmi szabályzatot is előír.',
          tip: 'A NOB (IOC) 2017-ben átfogó **safeguarding segédletet** adott ki a sportszervezeteknek. Sok hazai szövetség is közzétette saját etikai és gyermekvédelmi szabályzatát – érdemes a saját sportágadét elolvasni.'
        },
        {
          title: 'Mit tegyél, ha egy gyerek megnyílik?',
          text: 'Ha egy sportoló bántalmazásról beszél, vagy gyanús jeleket látsz (hirtelen visszahúzódás, sérülések magyarázat nélkül, félelem egy személytől):\n\n1. **Maradj nyugodt**, hallgasd meg, ne vágj közbe.\n2. **Higgy neki**, és mondd ki: „Jól tetted, hogy elmondtad.”\n3. **Ne ígérj titoktartást** – a védelméhez másokat is be kell vonnod.\n4. **Ne kérdezz rá** részletekre, ne vezesd a kérdéseiddel (nem a te dolgod a nyomozás).\n5. **Írd le szó szerint**, amit mondott, dátummal, időponttal.\n6. **Jelezd azonnal** a gyermekvédelmi felelősnek; közvetlen veszélynél hívd a **112**-t. Magyarországon a gyermekjóléti szolgálat is fogad jelzést.\n\nA gyanúsított felnőttel **ne beszélj** az ügyről, mert ez veszélyeztetheti a gyereket és az eljárást.',
          warn: 'A bántalmazás jelzése nem „árulkodás” és nem „mások lejáratása”. Ha nem teszel semmit, a gyerek védtelen marad. A jóhiszemű jelzés a jelzőt sem sodorja bajba.'
        },
        {
          title: 'Az edző saját fejlődése',
          text: 'Jó edzővé senki nem születik. A fejlődés eszközei:\n\n- **Képzés**: sportági edzői tanfolyam, elsősegély-tanfolyam (újraélesztés és AED), gyermekvédelmi képzés.\n- **Reflektív gyakorlat**: minden edzés után 3 kérdés: Mi működött? Mi nem? Mit csinálok másképp?\n- **Mentor**: egy tapasztalt edző, aki rendszeresen megnézi az edzésedet és visszajelez.\n- **Videó saját magadról**: mennyit beszélsz, kihez szólsz, mennyi ideig áll a gyerek sorban?\n\nEgy jó mérőszám: az edzésidő hány százalékában **mozognak ténylegesen** a sportolók. Gyerekedzésen a cél, hogy ez minél magasabb legyen, a hosszú magyarázat és a sorban állás minimális.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a sportolóközpontú edzői szemlélet?', options: ['Hogy az edző kizárólag a győzelemre koncentrál', 'Hogy a sportoló hosszú távú fejlődése, egészsége és jólléte az elsődleges', 'Hogy a sportoló dönt mindenről az edzésen', 'Hogy csak a legtehetségesebbekkel kell foglalkozni'], answer: 1, explain: 'A modern felfogásban az eredmény fontos, de a sportoló hosszú távú érdeke előbbre való.' },
        { q: 'Mi a kétfős (látható) szabály lényege?', options: ['Minden edzésen két edzőnek kell lennie', 'Két gyereket mindig egy párba kell tenni', 'Felnőtt ne legyen kettesben, zárt ajtó mögött egy gyerekkel', 'Kétszer kell elmondani minden utasítást'], answer: 2, explain: 'A beszélgetés legyen látható és hallótávolságon belüli: ez védi a gyereket és a felnőttet is.' },
        { q: 'Egy gyerek bántalmazásról beszél neked. Mit NE tegyél?', options: ['Hallgasd meg nyugodtan', 'Írd le szó szerint, amit mondott', 'Jelezd a gyermekvédelmi felelősnek', 'Ígérd meg, hogy senkinek nem mondod el'], answer: 3, explain: 'Titoktartást nem ígérhetsz, mert a védelméhez másokat is be kell vonni.' },
        { q: 'Melyik NEM edzői feladat?', options: ['Étrend-kiegészítő vagy gyógyszer ajánlása', 'A helyszín biztonságának ellenőrzése', 'Vészhelyzeti terv ismerete', 'Jelenléti ív vezetése'], answer: 0, explain: 'Ez orvosi, dietetikusi kompetencia; az edző csak a saját szakterületén dolgozhat.' },
        { q: 'Miért veszélyes a rögzítetlen mobil focikapu?', options: ['Mert hamar elkopik a háló', 'Mert felborulhat, és súlyos, akár halálos sérülést okozhat', 'Mert a labda kipattan róla', 'Mert a szabályok tiltják az edzésen'], answer: 1, explain: 'A felboruló kapuk okozta halálos balesetek miatt a kapukat mindig rögzíteni kell.' },
        { q: 'Melyik az érzelmi bántalmazás példája?', options: ['Egy elfelejtett vizes palack', 'Technikai hiba kijavítása', 'Egy gyerek rendszeres megalázása a csapat előtt', 'Egy nehéz, de jól adagolt edzés'], answer: 2, explain: 'A megalázás, fenyegetés és folyamatos lekezelés lelki bántalmazás.' },
        { q: 'Mi a reflektív gyakorlat lényege?', options: ['Tükör előtt edzeni', 'Minden edzés után végiggondolni, mi működött, mi nem, és min változtatsz', 'A sportolók egymást értékelik', 'Csak videóról edzeni'], answer: 1, explain: 'A rendszeres önreflexió az edzői fejlődés egyik legfontosabb eszköze.' },
        { q: 'Mit kell tudnia az edzőnek a vészhelyzeti tervről?', options: ['Elég, ha az egyesületi irodában ismerik', 'Csak versenyen van rá szükség', 'Csak felnőttcsapatnál kell', 'Hol az elsősegélydoboz és az AED, ki hív mentőt és hogyan jut be a mentő'], answer: 3, explain: 'Baj esetén percek számítanak, ezért előre tisztázni kell a szerepeket és helyeket.' }
      ]
    },
    {
      id: 'periodizacio',
      title: 'Edzéstervezés és periodizáció',
      level: 2, minutes: 16,
      summary: 'Makro-, mezo- és mikrociklus, terhelés és pihenés, szuperkompenzáció, progresszió és a verseny előtti tapering.',
      tags: ['periodizáció', 'makrociklus', 'mezociklus', 'mikrociklus', 'szuperkompenzáció', 'terhelés', 'pihenés', 'progresszió', 'tapering', 'csúcsforma', 'deload', 'túledzés', 'FITT', 'blokkperiodizáció'],
      terms: ['anatomia/homeosztazis', 'szabalyozas/visszacsatolas', 'anatomia/izomosszehuzodas'],
      sections: [
        {
          title: 'Terhelés, fáradás, alkalmazkodás',
          text: 'Az edzés lényege egy szabályozott **stresszhatás**: a terhelés kibillenti a szervezetet az egyensúlyából (homeosztázis), a pihenés alatt pedig a szervezet **túlkompenzál**, hogy legközelebb jobban bírja. Ez a **szuperkompenzáció** modellje:\n\n1. **Terhelés** → fáradás, a teljesítőképesség átmenetileg **csökken**.\n2. **Helyreállás** → visszatér a kiinduló szintre.\n3. **Szuperkompenzáció** → rövid ideig a kiinduló szint **fölé** emelkedik.\n4. Ha nem jön újabb inger, lassan visszaesik (**visszafejlődés**).\n\nA következő edzést ideálisan a szuperkompenzációs szakaszban kell adni. Ha túl korán jön (a fáradás még tart), a teljesítmény **lefelé csúszik** – ez hosszan a túledzés felé vezet. Ha túl későn, nincs fejlődés.\n\nA modell **leegyszerűsítés**: a különböző rendszerek (izom, idegrendszer, energiaraktárak, ín) eltérő ütemben regenerálódnak. Részletesen: [[#/lecke/sport/edzeselmelet|Edzéselmélet, regeneráció, alvás]].',
          tip: 'A modernebb **fitnesz–fáradás modell** (Banister) szerint minden edzés egyszerre növeli az edzettséget (lassan múlik) és a fáradtságot (gyorsan múlik). A pillanatnyi forma a kettő különbsége – ezért jön a csúcsforma pihentetés után.'
        },
        {
          title: 'Az edzés alapelvei',
          text: '- **Progresszív túlterhelés**: a terhelést fokozatosan kell emelni, különben a szervezet nem kap új ingert. Gyakorlati ökölszabály: a heti terjedelmet hirtelen ne emeld nagyot (sok edző kb. **10%** körüli heti emelést tekint óvatosnak – ez tapasztalati, nem tudományos törvény).\n- **Specifikusság**: amit edzel, abban fejlődsz. A maratonfutás nem javítja a 30 méteres sprintet.\n- **Egyéniség**: ugyanarra az edzésre két sportoló eltérően reagál.\n- **Változatosság**: ugyanaz az inger idővel kevesebb hatást vált ki, és nő a túlterheléses sérülés esélye.\n- **Visszafordíthatóság**: edzés nélkül a képességek visszafejlődnek (az állóképesség gyorsabban, az erő lassabban).\n- **Pihenés**: a fejlődés a pihenés alatt történik, ezért a pihenő **része a tervnek**.\n\nA terhelés összetevői a **FITT**: **F**requency (gyakoriság), **I**ntensity (intenzitás), **T**ime (időtartam), **T**ype (típus). A terjedelem és az intenzitás általában **ellentétesen** mozog: nagyon intenzív munkából kevesebbet lehet végezni.'
        },
        {
          title: 'Ciklusok: makro, mezo, mikro',
          text: 'A **periodizáció** a felkészülés időbeli felosztása, hogy a sportoló a fontos versenyen legyen csúcsformában:\n\n- **Makrociklus**: a teljes felkészülési egység, jellemzően egy **év vagy szezon** (olimpiai sportágakban négyéves ciklus is).\n- **Mezociklus**: néhány hetes blokk (tipikusan **3–6 hét**) egy fő céllal, pl. alapozás, erőfejlesztés, versenyre hangolás.\n- **Mikrociklus**: rövid ismétlődő egység, általában **egy hét**, napokra bontva.\n- **Edzésegység**: egy konkrét edzés.\n\nA hagyományos (lineáris) modell évszakai:\n\n1. **Felkészítő időszak**: általános, majd speciális alapozás – nagy terjedelem, mérsékelt intenzitás.\n2. **Versenyidőszak**: kisebb terjedelem, magasabb, versenyspecifikus intenzitás.\n3. **Átmeneti időszak**: aktív pihenés, a test és a fej regenerálása.\n\nMás modellek: **hullámzó** (nem lineáris) periodizáció, ahol hétről hétre vagy napról napra változik a hangsúly, és a **blokkperiodizáció**, amely koncentrált, néhány hetes blokkokban fejleszt egy-egy képességet.'
        },
        {
          title: 'Egy mezociklus felépítése: terhelés és tehermentesítés',
          text: 'Elterjedt gyakorlat a **3:1 szerkezet**: három hét fokozódó terhelés, majd egy **könnyebb (deload) hét**. Egy szemléltető példa (az értékek a heti összterhelés relatív szintjei, csak illusztrációk):\n\n- 1. hét: 100%\n- 2. hét: 110%\n- 3. hét: 120%\n- 4. hét: 70–80% (tehermentesítés)\n\nUtána a következő blokk egy kicsit magasabbról indul. Fiatal vagy kezdő sportolóknál gyakoribb a **2:1** ritmus.\n\n**Egy hét (mikrociklus) tervezésekor** figyelj arra, hogy:\n\n- két nagyon kemény nap **ne kövesse egymást** ugyanarra a rendszerre (pl. két nehéz lábas erőedzés);\n- a technikai, gyorsasági munka **kipihent** állapotban legyen (az edzés elején, nem fáradtan);\n- a mérkőzés előtti nap legyen **könnyű**, a mérkőzés utáni nap **regeneráló**.',
          warn: 'A túledzés jelei: tartósan romló teljesítmény a pihenés ellenére, ingerlékenység, alvászavar, gyakori betegség, motiválatlanság, emelkedett nyugalmi pulzus. Ilyenkor terhelést kell csökkenteni, és tartós panasznál sportorvoshoz kell fordulni.'
        },
        {
          title: 'Csúcsra hangolás: a tapering',
          text: 'A **tapering** a fontos verseny előtti célzott terheléscsökkentés: a fáradtság eltűnik, az edzettség megmarad. Bosquet és munkatársai 2007-es metaanalízise szerint a leghatékonyabb minta átlagosan:\n\n- **kb. 2 hét** időtartam,\n- a terjedelem **41–60%-os** csökkentése, fokozatosan,\n- az **intenzitás és a gyakoriság megtartása**.\n\nA tipikus nyereség néhány százalék – az élsportban ez a különbség a dobogó és a 8. hely között. A hiba, amit kerülni kell: a pánikszerű „utolsó heti bepótlás”, amivel fáradtan áll rajthoz a sportoló, vagy a teljes pihenés, amitől „elveszti az élességét”.',
          tip: 'Csapatsportban, ahol hetente van meccs, nincs klasszikus taper: ott a heti mikrociklus végén van egy kisebb terhelésű „mini-taper” a meccs előtt 1–2 nappal.'
        },
        {
          title: 'Gyakorlat: egy edzésegység felépítése',
          text: 'Egy jól felépített edzés szerkezete (60–90 perc):\n\n1. **Bevezetés** (2–3 perc): cél ismertetése, egészségi állapot rákérdezés („Fáj valami?”).\n2. **Bemelegítés** (10–20 perc): általános, majd sportágspecifikus, sérülésmegelőző elemekkel.\n3. **Fő rész**: először a **koordinációt és gyorsaságot** igénylő feladatok, utána erő, végül állóképesség.\n4. **Levezetés** (5–10 perc): könnyű mozgás, nyújtás, légzés.\n5. **Lezárás**: rövid értékelés, mi ment jól, mi lesz a következő edzés célja.\n\nMinden edzésnek legyen **egy fő célja**. Ha mindent egyszerre akarsz fejleszteni, semmit sem fejlesztesz hatékonyan.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a szuperkompenzáció?', options: ['A pihenés után a teljesítőképesség rövid időre a kiinduló szint fölé emelkedik', 'Hogy a terhelés alatt azonnal erősebb leszel', 'A sérülés utáni visszatérés folyamata', 'A versenyidőszak másik neve'], answer: 0, explain: 'Terhelés → fáradás → helyreállás → túlkompenzálás: ez a fejlődés alapja.' },
        { q: 'Mi a mezociklus?', options: ['Egy edzésegység', 'Egy teljes év', 'Néhány hetes edzésblokk egy fő céllal', 'A bemelegítés másik neve'], answer: 2, explain: 'A mezociklus jellemzően 3–6 hét, pl. alapozó vagy erőfejlesztő blokk.' },
        { q: 'Mi a tapering lényege Bosquet és mtsai (2007) szerint?', options: ['Teljes pihenés két hétig', 'Az intenzitás felére csökkentése', 'Edzésszám növelése', 'Kb. 2 hétig a terjedelem 41–60%-os csökkentése az intenzitás megtartásával'], answer: 3, explain: 'A fáradtság eltűnik, az edzettség megmarad: ez a csúcsra hangolás.' },
        { q: 'Mit jelent a FITT-ben az I?', options: ['Intenzitás', 'Ismétlés', 'Izom', 'Időtartam'], answer: 0, explain: 'Frequency, Intensity, Time, Type: gyakoriság, intenzitás, időtartam, típus.' },
        { q: 'Mi a 3:1 mezociklus-szerkezet?', options: ['3 edzés, 1 meccs hetente', 'Három hét fokozódó terhelés, majd egy könnyebb hét', '3 perc munka, 1 perc pihenő', 'Három sportág, egy fő sportág'], answer: 1, explain: 'A tehermentesítő hét lehetővé teszi a felhalmozott fáradtság lecsengését.' },
        { q: 'Hová tegyük a gyorsasági és technikai feladatokat egy edzésen belül?', options: ['A legvégére, amikor már bemelegedett mindenki', 'A levezetés után', 'A bemelegítés utáni kipihent szakaszba', 'Mindegy'], answer: 2, explain: 'Ezekhez friss idegrendszer kell; fáradtan rossz mintát rögzít a sportoló.' },
        { q: 'Melyik a túledzés jele lehet?', options: ['Pihenés után javuló teljesítmény', 'Tartósan romló teljesítmény pihenés ellenére, alvászavar, ingerlékenység', 'Enyhe izomláz egy új gyakorlat után', 'Jó étvágy'], answer: 1, explain: 'A tartós teljesítménycsökkenés és a hangulati, alvási tünetek terheléscsökkentést igényelnek.' },
        { q: 'Mit mond a specifikusság elve?', options: ['Mindenki ugyanazt az edzést kapja', 'Csak egy gyakorlatot szabad végezni', 'Az edzés specifikus napokon legyen', 'Abban fejlődsz, amit edzel'], answer: 3, explain: 'A szervezet az adott terheléshez alkalmazkodik, ezért az edzésnek tükröznie kell a sportág igényeit.' }
      ]
    },
    {
      id: 'gyerekedzes',
      title: 'Gyerek- és utánpótlás-edzés',
      level: 1, minutes: 15,
      summary: 'Hosszú távú sportolófejlesztés (LTAD), biológiai és naptári kor, a korai specializáció kockázatai és a játékosság ereje.',
      tags: ['utánpótlás', 'gyerekedzés', 'LTAD', 'hosszú távú sportolófejlesztés', 'biológiai kor', 'naptári kor', 'relatív életkori hatás', 'növekedési csúcs', 'PHV', 'korai specializáció', 'mintavételezés', 'játékosság', 'kiégés'],
      terms: ['anatomia/csont', 'anatomia/neuron', 'valszam/korrelacio-oksag'],
      models: ['agy'],
      sections: [
        {
          title: 'A gyerek nem kis felnőtt',
          text: 'A gyerekek szervezete **másképp** reagál a terhelésre:\n\n- A **csontok növekedési porckorongjai (epifízis-porc)** még nyitottak, sérülékenyebbek a húzó- és nyíróerőkre.\n- Az **idegrendszer** gyorsan tanul: a 6–12 éves kor kiváló időszak a koordináció, mozgásügyesség fejlesztésére.\n- A hőszabályozásuk kevésbé hatékony, ezért figyelni kell a **folyadékra és a hőségre**.\n- A **figyelmük** rövidebb: a hosszú magyarázat elveszíti őket.\n- A **motivációjuk** elsősorban az élmény, a barátok és a sikerélmény – nem a távoli eredmény.\n\nEzért a gyerekedzés nem a felnőtt edzés „kicsinyített változata”: más célok, más módszerek és más terhelés kell hozzá.'
        },
        {
          title: 'Hosszú távú sportolófejlesztés (LTAD)',
          text: 'Az **LTAD** (Long-Term Athlete Development) modellt Istvan Balyi és munkatársai dolgozták ki, majd a kanadai **Canadian Sport for Life** program tette ismertté. Lényege, hogy minden életszakaszban azt kell fejleszteni, amire a gyerek **fejlődésileg kész**. A szakaszok (a korok tájékoztatóak, nemenként és egyénenként eltérnek):\n\n1. **Aktív kezdet** (kb. 0–6 év): sok szabad játék, alapmozgások.\n2. **Alapok (FUNdamentals)** (kb. 6–9 év): futás, ugrás, dobás, elkapás, egyensúly – sokféle sportban, játékosan.\n3. **Tanulj meg edzeni** (kb. 8–12 év): sportági alaptechnikák, de még **több sportág**.\n4. **Edzeni tanulj (Train to Train)** (serdülőkor, a növekedési csúcs körül): aerob alap, erő fokozatos építése.\n5. **Versenyre edzés**, majd **győzelemre edzés**: specializáció, csúcsteljesítmény.\n6. **Egész életen át aktív**: a sport mint életmód.\n\nA modell egyik üzenete: a gyerekkori **mozgásműveltség** (physical literacy) az egész életen át tartó sportolás alapja.',
          tip: 'Nézd meg az [[agy|agy 3D modelljében]] a kisagyat: a gyerekkori sokoldalú mozgás a kisagy és a motoros kéreg finomhangolásával építi a későbbi technikai tanulás alapját.'
        },
        {
          title: 'Biológiai kor vs. naptári kor',
          text: 'Két azonos **naptári korú** 13 éves között akár **4–5 év** is lehet a **biológiai érettségben**. Az egyik már felnőttes testalkatú, a másik még gyerek. Ez óriási különbség erőben, gyorsaságban – de semmit nem mond arról, ki lesz felnőttként jobb.\n\n**Növekedési csúcs (PHV, peak height velocity)**: a serdülőkori leggyorsabb növekedés időszaka, lányoknál átlagosan **11–12**, fiúknál **13–14** éves kor körül (nagy egyéni szórással). Ilyenkor:\n\n- átmenetileg **romolhat a koordináció** („ügyetlen” kamasz),\n- nő a **húzásos apofízis-sérülések** (pl. Osgood–Schlatter a térdnél, Sever-betegség a saroknál) kockázata,\n- óvatosabb terhelésadagolás és sok technikai „újratanulás” kell.\n\n**Relatív életkori hatás**: a korosztályos válogatásokban az év **elején született** gyerekek erősen felülreprezentáltak. Angol labdarúgó-akadémiák vizsgálataiban a játékosok kb. **37–49%-a** született az első negyedévben, és csak kb. **7–14%-a** az utolsóban – egyszerűen azért, mert idősebbek, nagyobbak voltak a kiválasztáskor.',
          warn: 'Ha egy utánpótlásedző csak a pillanatnyi teljesítmény alapján válogat, rendszeresen kiszórja a később érő, de akár tehetségesebb gyerekeket. A növekedés mérése (testmagasság rendszeres felvétele) és az érési állapot figyelembevétele segít.'
        },
        {
          title: 'A korai specializáció kockázatai',
          text: '**Korai specializáció**: ha egy gyerek kb. 12 éves kora előtt egész évben, intenzíven csak egy sportágat űz, a többit feladva. A kutatások szerint ez a legtöbb sportágban:\n\n- növeli a **túlterheléses sérülések** kockázatát (ugyanaz a mozgásminta, ugyanazok az ízületek),\n- növeli a **kiégés és a lemorzsolódás** esélyét,\n- nem garantál jobb felnőttkori eredményt – sok élsportoló gyerekként **több sportágat** űzött (ezt hívják **mintavételezésnek**, sampling).\n\nKivételek a **korai csúcsú** sportágak (pl. torna, műugrás, műkorcsolya), ahol a specializáció korábban kezdődik – de ott is fontos a terhelés gondos adagolása.\n\nGyakorlati ökölszabályok, amelyeket több sportorvosi szervezet is ajánl (tájékoztató értékek): hetente legalább **1–2 pihenőnap**, évente több hónapnyi szünet az adott sportágból (lehet más mozgással), és a heti szervezett edzésórák száma ne haladja meg nagyon a gyerek **életkorát években**.'
        },
        {
          title: 'Játékosság: ahol a tanulás történik',
          text: 'Gyerekeknél a **játék nem pótcselekvés, hanem módszer**:\n\n- **Kis létszámú játékok** (pl. 3v3, 4v4): mindenki sokszor ér labdához, sok döntést hoz.\n- **Feladatmódosítás**: kisebb pálya, puhább labda, alacsonyabb kosár – hogy a feladat a gyerek méretéhez illő legyen.\n- **Kihívás és siker egyensúlya**: kb. olyan nehézség, ahol a próbálkozások nagyjából fele-kétharmada sikerül.\n- **Kevés sorban állás**: 20 gyereknek egy labda helyett 10 labda.\n- **Választás**: hagyd, hogy a gyerekek néha maguk találjanak ki szabályt, csapatnevet, kihívást.\n\nA gyerek akkor marad a sportban, ha **jól érzi magát, fejlődik és tartozik valahová**. A győzelem fontos élmény, de 10 évesen nem ez a fő cél.',
          tip: 'A „sorban állás teszt”: számold meg egy gyakorlatban, egy gyerek egy perc alatt hányszor ér labdához. Ha egyszer-kétszer, alakítsd át a feladatot.'
        },
        {
          title: 'Biztonság és terhelés utánpótláskorban',
          text: '- **Fokozatosság**: új sportág, új terhelés, szezonkezdet – lassú felépítés.\n- **Fájdalom nem „normális”**: a gyerek ízületi, csont- vagy ínfájdalma kivizsgálást igényel, nem „átedzést”.\n- **Pihenő és alvás**: a növekvő szervezetnek sok alvás kell (**9–12 óra** 6–12 éves korban, **8–10 óra** kamaszkorban, az amerikai alvásgyógyászati akadémia ajánlása szerint).\n- **Versenyrendszer**: a túl sok, túl korai tétmeccs nyomást és sérülést hoz.\n- **Testsúly**: soha ne kommentáld egy gyerek testsúlyát, és ne írj elő fogyókúrát – ez az étkezési zavarok egyik kockázati tényezője.'
        }
      ],
      quiz: [
        { q: 'Mit jelent az LTAD rövidítés?', options: ['Hosszú távú sportolófejlesztés', 'Laktátküszöb-teszt', 'Edzésterhelési napló', 'Nemzetközi edzőszövetség'], answer: 0, explain: 'Long-Term Athlete Development: minden életkorban azt fejleszteni, amire a gyerek fejlődésileg kész.' },
        { q: 'Mi a relatív életkori hatás?', options: ['Az idősebb edzők jobbak', 'A gyerekek az edző korához igazodnak', 'A válogatásokban az év elején születettek felülreprezentáltak', 'A felnőttek lassabban tanulnak'], answer: 2, explain: 'A kiválasztáskor idősebb, fejlettebb gyerekeket gyakrabban választják ki, függetlenül a valódi tehetségtől.' },
        { q: 'Mi történhet a növekedési csúcs (PHV) idején?', options: ['A koordináció mindig javul', 'Megszűnik a sérülésveszély', 'A gyerek azonnal erősebb lesz mindenben', 'Átmenetileg romolhat a koordináció, nő bizonyos húzásos sérülések kockázata'], answer: 3, explain: 'A gyors csontnövekedést az izmok, inak lassabban követik.' },
        { q: 'Mi a mintavételezés (sampling) gyerekkorban?', options: ['Vérvétel a sportolóktól', 'Több sportág kipróbálása, űzése a specializáció előtt', 'Videófelvétel készítése', 'Tehetségek kiválogatása'], answer: 1, explain: 'A sokoldalú gyerekkori sportolás csökkenti a kiégést és a túlterheléses sérüléseket.' },
        { q: 'Mekkora lehet a különbség két azonos naptári korú 13 éves biológiai érettségében?', options: ['Legfeljebb néhány hét', 'Pontosan egy év', 'Akár 4–5 év', 'Nincs különbség'], answer: 2, explain: 'A biológiai érés egyéni üteme nagyon eltérő.' },
        { q: 'Melyik a jó gyerekedzési gyakorlat?', options: ['Kis létszámú játékok, sok labdaérintéssel', 'Hosszú elméleti magyarázat az elején', 'Egy labda 20 gyereknek, sorban állással', 'Büntetésből adott futás'], answer: 0, explain: 'A sok ismétlés, döntés és élmény a gyerekek tanulásának motorja.' },
        { q: 'Mit tegyél, ha egy gyerek rendszeresen térdfájdalomra panaszkodik?', options: ['Ignoráld, ez a növekedéssel jár', 'Adj neki fájdalomcsillapítót', 'Edzen többet, hogy megerősödjön', 'Csökkentsd a terhelést és kérj orvosi vizsgálatot'], answer: 3, explain: 'A gyerekkori ízületi fájdalom kivizsgálást igényel (pl. Osgood–Schlatter).' }
      ]
    },
    {
      id: 'terhelesmonitor',
      title: 'Terhelésmonitorozás: RPE, pulzus, ACWR, közérzet',
      level: 2, minutes: 17,
      summary: 'Hogyan mérd, mennyi terhelést kapnak a sportolóid: szubjektív terhelés (RPE, sRPE), pulzuszónák, akut:krónikus arány a korlátaival, alvás- és közérzetkérdőívek.',
      tags: ['terhelésmonitorozás', 'RPE', 'sRPE', 'Borg-skála', 'CR-10', 'pulzus', 'pulzuszónák', 'maximális pulzus', 'ACWR', 'akut:krónikus arány', 'monotónia', 'közérzetkérdőív', 'alvás', 'HRV', 'külső terhelés', 'belső terhelés'],
      terms: ['anatomia/percterfogat', 'anatomia/sziv-ciklus', 'valszam/korrelacio-oksag', 'valszam/szoras'],
      models: ['sziv'],
      widgets: [{ type: 'terheles' }],
      sections: [
        {
          title: 'Külső és belső terhelés',
          text: 'Miért mérjük a terhelést? Hogy lássuk, **valóban azt kapja-e** a sportoló, amit terveztünk, és időben észrevegyük a túl gyors emelést vagy a felhalmozódó fáradtságot.\n\n- **Külső terhelés**: amit a sportoló **végez** – futott kilométer, sprintek száma, megemelt kilók, ugrások száma, GPS-adatok.\n- **Belső terhelés**: amit ez a szervezetéből **kivált** – pulzus, szubjektív megterhelés, laktát.\n\nUgyanaz a külső terhelés (pl. 5 × 1000 m ugyanabban a tempóban) egy fáradt, beteg vagy rosszul aludt sportolónál sokkal nagyobb belső terhelést okoz. Ezért a jó monitorozás **mindkettőt** figyeli, és a számokat mindig a **sportolóval való beszélgetéssel** együtt értelmezi.'
        },
        {
          title: 'RPE és sRPE: a legegyszerűbb, mégis hasznos mérés',
          text: 'Az **RPE** (rating of perceived exertion) a **szubjektív megterhelés** értékelése. Az eredeti **Borg-skála 6–20** közötti, edzői gyakorlatban elterjedtebb a **CR-10 skála** (0 = pihenés, 10 = maximális).\n\nAz **sRPE** (session-RPE, Foster és mtsai módszere) egy egész edzés terhelését adja meg:\n\n`edzésterhelés (AU) = RPE (0–10) × időtartam (perc)`\n\nAz AU (arbitrary unit) „önkényes egység”. **Példa**: egy 75 perces edzés, amit a sportoló 6-osra értékel: `6 × 75 = 450 AU`. Egy 40 perces, 8-asra értékelt intervallumedzés: `8 × 40 = 320 AU`.\n\n**Gyakorlati szabályok:**\n\n1. Az RPE-t az edzés után kb. **30 perccel** kérdezd meg, hogy ne csak az utolsó gyakorlat élménye számítson.\n2. Egyénileg kérdezd (pl. telefonos űrlapon), ne hangosan a csoport előtt – különben mindenki a másikhoz igazodik.\n3. A számok **egy sportolón belül**, időben összehasonlítva hasznosak; két sportoló sRPE-jét közvetlenül ne hasonlítsd össze.',
          tip: 'A heti összterhelés mellett a **monotónia** is fontos (Foster): a napi terhelések átlaga osztva a szórásukkal. Ha minden nap ugyanannyi a terhelés, a monotónia magas – a könnyű és kemény napok váltakozása egészségesebb.'
        },
        {
          title: 'Pulzus és pulzuszónák',
          text: 'A pulzus a belső terhelés objektív jelzője. A szív **perctérfogata** (pulzus × verőtérfogat) edzés közben többszörösére nő – nézd meg a [[sziv|szív 3D modelljét]]!\n\n**Maximális pulzus (HRmax)**: a legpontosabb, ha **terepen vagy laborban mérik**. A becslő képletek csak durva közelítések:\n\n- `HRmax ≈ 220 − életkor` – egyszerű, de egyéni hibája akár ±10–12 ütés/perc is lehet;\n- `HRmax ≈ 208 − 0,7 × életkor` (Tanaka-képlet) – átlagosan valamivel pontosabb.\n\n**Pulzustartalék-módszer (Karvonen)**: `célpulzus = nyugalmi + intenzitás% × (HRmax − nyugalmi)`.\n\n**Példa**: 30 éves sportoló, nyugalmi pulzus 60, mért HRmax 190. A 70%-os célpulzus: `60 + 0,7 × (190 − 60) = 60 + 91 = 151`.\n\nEgy gyakori ötzónás felosztás (a HRmax %-ában, tájékoztató):\n\n1. **Z1** 50–60% – nagyon könnyű, regeneráló\n2. **Z2** 60–70% – könnyű, aerob alap, még beszélgetni lehet\n3. **Z3** 70–80% – mérsékelt, tempó\n4. **Z4** 80–90% – kemény, küszöb körüli\n5. **Z5** 90–100% – maximális, rövid intervallumok\n\nKorlátok: a pulzus **késve** reagál (rövid sprinteknél használhatatlan), és a hőség, a kiszáradás, a koffein, a stressz is megemeli.',
          warn: 'A pulzusmérő nem orvosi eszköz. Szokatlanul magas vagy szabálytalan pulzus, mellkasi fájdalom, ájulásérzés esetén azonnal le kell állni, és orvoshoz kell fordulni.'
        },
        {
          title: 'Akut:krónikus terhelési arány (ACWR) – és a korlátai',
          text: 'Az **ACWR** a legutóbbi hét terhelését hasonlítja a hosszabb távú átlaghoz:\n\n`ACWR = akut terhelés (utolsó 7 nap) / krónikus terhelés (utolsó 28 nap heti átlaga)`\n\n**Példa**: az elmúlt 4 hét heti sRPE-terhelései 2000, 2200, 2100 és 2900 AU. A krónikus átlag `(2000 + 2200 + 2100 + 2900) / 4 = 2300`, az ACWR `2900 / 2300 ≈ 1,26`.\n\nGabbett 2016-os népszerű összefoglalója szerint a **0,8–1,3** közötti tartomány volt a „biztonságos sáv”, az **1,5 feletti** érték pedig a sérülési kockázat emelkedésével járt együtt. Az alapgondolat ma is hasznos: **a hirtelen terhelésugrás kockázatos**, a fokozatosan felépített terhelést a szervezet jobban bírja.\n\n**A korlátok, amelyeket egy edzőnek ismernie kell:**\n\n- **Matematikai összekapcsolás**: az akut hét a krónikus átlag része is, ami álkorrelációt okozhat (Lolli és mtsai, 2019). Javasolt az „összekapcsolatlan” változat vagy az exponenciálisan súlyozott átlag (EWMA).\n- **Arány, nem abszolút érték**: két nagyon eltérő terhelési szint is adhat azonos arányt.\n- **Ok-okozat**: a vizsgálatok nagy része megfigyeléses; több szerző (pl. Impellizzeri és mtsai, 2020) szerint az ACWR **nem alkalmas** önálló sérülés-előrejelzőnek, a „sweet spot” határok nem általánosíthatók.\n\nA tanulság: az ACWR legyen **figyelmeztető jelzés** a terhelés tervezésekor, ne egy szám, ami alapján valakit automatikusan kiveszünk vagy játszatunk.',
          tip: 'Próbáld ki a lecke végi **terheléskalkulátort**: írj be néhány hét sRPE-értékét, és figyeld, hogyan változik az arány egy hirtelen kemény hét után.'
        },
        {
          title: 'Alvás és közérzet: a kérdőívek',
          text: 'Egy rövid reggeli **közérzetkérdőív** (wellness) gyakran többet elárul, mint a drága műszerek. Tipikus kérdések 1–5 vagy 1–7 skálán:\n\n- **Alvásminőség** és **alvásidő** (óra)\n- **Fáradtság**\n- **Izomfájdalom** (izomláz)\n- **Stressz** (iskola, munka, magánélet)\n- **Hangulat**\n\nA pontszámokat a sportoló **saját átlagához** kell viszonyítani. Ha valakinél több tétel egyszerre, több napon át romlik, az **beszélgetést** és szükség esetén terhelésmódosítást indokol.\n\nEgyéb objektív jelzők: **reggeli nyugalmi pulzus**, **pulzusvariabilitás (HRV)**, ugrásteszt (pl. ellenmozgásos felugrás magassága). Ezek is csak a sportoló saját alapvonalához képest értelmezhetők.',
          warn: 'A kérdőívek személyes, egészségügyi jellegű adatok: csak a célnak megfelelően gyűjtsd, biztonságosan tárold, és ne tedd közzé (pl. csapat-csoportban). Kiskorúaknál a szülők tájékoztatása is szükséges.'
        },
        {
          title: 'A monitorozás gyakorlata: kevesebb, de következetes',
          text: 'A leggyakoribb hiba: túl sok adatot gyűjteni, amit aztán senki nem néz meg. Egy működő rendszer:\n\n1. **Kevés, egyszerű mérőszám**: sRPE minden edzés után + rövid reggeli közérzetkérdőív.\n2. **Rendszeresség**: a mérésnek akkor van értéke, ha minden nap ugyanúgy történik.\n3. **Gyors visszajelzés**: a sportoló lássa, hogy az adatai alapján változik valami – különben abbahagyja a kitöltést.\n4. **Döntési szabályok előre**: pl. ha a közérzet-összpontszám 2 egymást követő napon a szokásosnál jelentősen rosszabb, az edző beszél a sportolóval.\n5. **Az ember fontosabb a számnál**: a mérés a beszélgetést segíti, nem helyettesíti.'
        }
      ],
      quiz: [
        { q: 'Mennyi az sRPE-terhelés egy 60 perces, 7-esre értékelt edzésnél?', options: ['67 AU', '420 AU', '7 AU', '4200 AU'], answer: 1, explain: 'sRPE = RPE × perc = 7 × 60 = 420 AU.' },
        { q: 'Melyik a belső terhelés mutatója?', options: ['Futott kilométer', 'Megemelt összsúly', 'Pulzus és szubjektív megterhelés', 'Sprintek száma'], answer: 2, explain: 'A belső terhelés azt mutatja, mit vált ki a külső munka a szervezetből.' },
        { q: 'Mennyi a célpulzus Karvonen szerint 70%-on, ha a nyugalmi pulzus 60, a HRmax 190?', options: ['133', '190', '170', '151'], answer: 3, explain: '60 + 0,7 × (190 − 60) = 60 + 91 = 151.' },
        { q: 'Mi a 220 − életkor képlet legfőbb gyengesége?', options: ['Egyéni hibája akár ±10–12 ütés/perc is lehet', 'Csak nőkre érvényes', 'Csak gyerekekre érvényes', 'Túl bonyolult'], answer: 0, explain: 'Átlagos becslés; egyénre vetítve jelentős a hibája, mért HRmax pontosabb.' },
        { q: 'Mi az ACWR egyik fő módszertani kritikája?', options: ['Túl drága a mérése', 'Csak pulzussal lehet számolni', 'Nem lehet hetekre számolni', 'Az akut hét a krónikus átlag része is (matematikai összekapcsolás)'], answer: 3, explain: 'Lolli és mtsai rámutattak, hogy ez álkorrelációt okozhat; ezért javasolják az összekapcsolatlan számítást.' },
        { q: 'Hogyan érdemes használni az ACWR-t?', options: ['Automatikus játszatási döntésre', 'Figyelmeztető jelzésként a fokozatos terheléstervezéshez', 'Sérülés diagnosztizálására', 'Egyáltalán nem szabad'], answer: 1, explain: 'A hirtelen terhelésugrás kockázatos – ezt jelzi, de önálló előrejelzőnek nem elég megbízható.' },
        { q: 'Mikor érdemes az RPE-t megkérdezni?', options: ['Az edzés után kb. 30 perccel, egyénileg', 'Az edzés előtt', 'Hangosan, a csoport előtt', 'Csak hetente egyszer'], answer: 0, explain: 'Így az egész edzést értékeli, és nem hat rá a csoport.' },
        { q: 'Mihez kell viszonyítani a közérzetkérdőív pontszámait?', options: ['A csapattársak pontszámához', 'Egy nemzetközi normához', 'A sportoló saját átlagához', 'Az edző pontszámához'], answer: 2, explain: 'Az egyéni alapvonaltól való eltérés az informatív.' }
      ]
    },
    {
      id: 'serulesmegelozes',
      title: 'Sérülésmegelőzés, bemelegítés, agyrázkódás, hőség',
      level: 2, minutes: 17,
      summary: 'Bemelegítő-sérülésmegelőző programok (FIFA 11+ típus), célzott erősítés, az agyrázkódás felismerése – „ha kétséges, állítsd le” – és a hőség veszélyei.',
      tags: ['sérülésmegelőzés', 'bemelegítés', 'FIFA 11+', 'Nordic hamstring', 'excentrikus erősítés', 'ACL', 'keresztszalag', 'agyrázkódás', 'CRT6', 'SCAT6', 'visszatérés a sporthoz', 'második ütközés szindróma', 'hőség', 'hőguta', 'hidegvizes merítés', 'WBGT'],
      terms: ['anatomia/izulet', 'anatomia/kotoszovet', 'anatomia/kozponti-kornyeki', 'anatomia/homeosztazis'],
      models: ['agy'],
      sections: [
        {
          title: 'A sérülések háttere: miért sérül meg a sportoló?',
          text: 'A sérülések két fő csoportja:\n\n- **Akut (hirtelen)**: ütközés, esés, rossz érkezés, irányváltás – pl. bokaszalag-rándulás, elülső keresztszalag-szakadás (ACL).\n- **Túlterheléses**: ismétlődő terhelés, elégtelen pihenés – pl. Achilles-ín-gyulladás, fáradásos csonttörés, „ugrótérd”.\n\nA kockázatot növelő tényezők egy része **befolyásolható** (erő, egyensúly, technika, terhelésadagolás, felszerelés, fáradtság, alvás), más része nem (életkor, nem, korábbi sérülés). A legerősebb előrejelző gyakran a **korábbi sérülés** – ezért a teljes rehabilitáció kulcsfontosságú.\n\nA megelőzés **ötlépéses gondolkodása** (van Mechelen nyomán): 1. mekkora a probléma, 2. mi okozza, 3. beavatkozás, 4. hatásvizsgálat – és a valós életben a legfontosabb: 5. **betartják-e** a programot.'
        },
        {
          title: 'Bemelegítés FIFA 11+ módra',
          text: 'A **FIFA 11+** egy kb. **20 perces** bemelegítő program, amelyet a FIFA orvosi központja (F-MARC) a norvég Oslo Sports Trauma Research Center és az amerikai Santa Monica Sports Medicine kutatóival dolgozott ki. Három része:\n\n1. **Futógyakorlatok** (kb. 8 perc): könnyű futás, irányváltások, partnerrel való érintkezés.\n2. **Erő, plyometria, egyensúly** (kb. 10 perc): plank, oldalplank, **Nordic hamstring**, egylábas állás, guggolás, ugrások – helyes térdtartással (a térd ne essen befelé!). Három nehézségi szinttel.\n3. **Futás** (kb. 2 perc): gyorsabb futás, irányváltás.\n\nThorborg és mtsai 2017-es metaanalízise szerint a FIFA 11+ rendszeres használata kb. **39%-kal** csökkentette a labdarúgó-sérüléseket. A hatás feltétele a **rendszeresség**: hetente **legalább kétszer**, egész szezonban.\n\nHasonló programok más sportágakban is vannak (kézilabda, kosárlabda, röplabda), a lényegük ugyanaz: **neuromuszkuláris bemelegítés** – erő, egyensúly, ugrás-érkezés technika.',
          tip: 'A legjobb program is hatástalan, ha unalmas, és ezért elhagyják. Építsd be természetesen az edzés elejére, váltogasd a gyakorlatokat a nehézségi szintek között, és magyarázd el a sportolóknak, miért csinálják.'
        },
        {
          title: 'Célzott erősítés: hátsó comb, ágyék, boka, térd',
          text: '- **Nordic hamstring** (térdelő helyzetből lassú előredőlés, a partner a bokát fogja): excentrikus hátsócomb-erősítés. Petersen és mtsai 2011-es dán labdarúgó-vizsgálatában az akut hátsócomb-sérülések aránya kb. **70%-kal** alacsonyabb volt a gyakorlatot végző csapatoknál (főleg az újrasérülések csökkentek).\n- **Copenhagen-adduktor gyakorlat**: oldalfekvéses combközelítő-erősítés az ágyéki sérülések ellen.\n- **Egyensúly- és bokaprogramok**: egylábas állás, billenőpárna – különösen korábbi bokasérülés után.\n- **Ugrás-érkezés technika**: puha érkezés, térd a lábujjak irányába, csípő és térd hajlítva. Lányoknál és nőknél az ACL-sérülés kockázata többszörös, náluk ez különösen fontos.\n\nAz erősítés **fokozatos**: excentrikus gyakorlatok után 1–2 napig izomláz várható, ezért a szezon előtt, alacsony ismétlésszámmal kell kezdeni.'
        },
        {
          title: 'Agyrázkódás: „ha kétséges, állítsd le”',
          text: 'Az **agyrázkódás** (sportban elszenvedett traumás agysérülés) a fejet vagy a testet ért ütés miatti **működési** zavar – a képalkotó vizsgálat (CT) gyakran negatív. **Nem kell hozzá eszméletvesztés!** A legtöbb esetben nincs is.\n\n**Gyanújelek** (a nemzetközi **CRT6** felismerő eszköz alapján, rövidítve):\n\n- látható jelek: mozdulatlanul fekszik, lassan kel fel, egyensúlyzavar, üres tekintet, arc- vagy fejsérülés, zavartság;\n- tünetek: fejfájás, szédülés, hányinger, homályos látás, fény- és hangérzékenység, „ködös” érzés, ingerlékenység;\n- emlékezet: nem tudja, hol van, mi az eredmény, mi történt.\n\n**Vészjelek → azonnal 112**: nyakfájdalom, kettős látás, gyengeség vagy zsibbadás a végtagokban, erős vagy fokozódó fejfájás, görcsroham, eszméletvesztés, romló tudatállapot, ismételt hányás, nyugtalanság, agresszió.\n\n**A szabály**: ha agyrázkódás gyanúja merül fel, a sportoló **azonnal kikerül a játékból, és aznap nem térhet vissza** – akkor sem, ha „jól érzi magát”. **Ha kétséges, állítsd le!** Ne hagyd egyedül, ne vezessen, és orvosnak kell megvizsgálnia.',
          warn: 'A második ütközés szindróma (second impact syndrome) ritka, de életveszélyes: ha a még gyógyuló agyat újabb ütés éri, súlyos agyduzzanat alakulhat ki. 2013-ban a 17 éves kanadai rögbijátékos, Rowan Stringer így halt meg; róla nevezték el Ontario 2018-as agyrázkódás-törvényét (Rowan’s Law).'
        },
        {
          title: 'Visszatérés: előbb az iskola, aztán a sport',
          text: 'A 2022-es amszterdami nemzetközi konszenzus (6. agyrázkódás-konferencia, publikálva 2023-ban) szerint:\n\n- az első 24–48 órában **relatív pihenés**, utána a tüneteket nem súlyosan rontó **könnyű aktivitás** (pl. séta) kifejezetten ajánlott;\n- gyerekeknél és diákoknál **előbb a tanulásba** térjenek vissza fokozatosan, csak utána a teljes sportba;\n- a **visszatérés a sporthoz** fokozatos, **lépcsőzetes** program: az első lépések (tünetfüggő könnyű, majd mérsékelt aerob mozgás, egyéni sportágspecifikus gyakorlás) a rehabilitáció része, a későbbi lépések (érintkezés nélküli edzés, teljes edzés **orvosi engedéllyel**, majd verseny) a visszatérésé;\n- a lépések között jellemzően legalább **24 óra** telik el; ha a tünetek visszatérnek, egy lépcsőt vissza kell lépni;\n- a teljes visszatérés a legtöbb esetben **kb. egy hónapon belül** megtörténik, de vannak elhúzódó esetek.\n\nAz edzőnek nem a diagnózis a feladata, hanem a **felismerés, a levétel, a szülő értesítése** és az orvosi engedély nélküli visszatérés **megakadályozása**. Az orvosi felméréshez használt eszközök a **SCAT6** (13 éves kortól) és a **Child SCAT6** (8–12 év).'
        },
        {
          title: 'Hőség: a megelőzhető halálos veszély',
          text: 'Melegben a test hőtermelése és a környezet hőleadást gátló hatása összeadódik. A hőterhelés legjobb mutatója a **WBGT** (nedves hőmérsékletű földgömb-index), ami a hőmérséklet mellett a páratartalmat és a napsugárzást is figyelembe veszi – a magas páratartalom miatt egy 28 °C-os fülledt nap veszélyesebb lehet, mint egy 33 °C-os száraz.\n\n**Megelőzés:**\n\n- **Hőhöz szoktatás**: kb. **10–14 nap** fokozatosan növekvő terhelés melegben.\n- **Edzés a hűvösebb órákban**, gyakori árnyékos ivószünetek, világos, szellős ruha.\n- **Folyadék**: rendszeres ivás, súlymérés edzés előtt és után.\n- Fokozott figyelem: betegség (láz, hasmenés) után, kevés alvás, túlsúly, nehéz felszerelés (pl. védőfelszerelés).\n\n**Hőguta (terheléses hőguta)**: a testhőmérséklet **40 °C fölé** emelkedik, és **idegrendszeri tünetek** jelennek meg (zavartság, furcsa viselkedés, összeesés, görcs). Ez **életveszély**.\n\n**Teendő**: 112 hívása, és **azonnali hűtés a helyszínen** – a legjobb a **hideg vizes merítés** (pl. jeges vizes kád, nyakig). Az elv: **„előbb hűts, aztán szállíts”** (cool first, transport second) – a hűtést addig folytatják, amíg a végbélben mért hőmérséklet kb. 39 °C-ra csökken. Ha nincs kád: folyamatosan cserélt jeges, vizes törölközők az egész testen.',
          warn: 'A zavart, furcsán viselkedő, melegben összeeső sportoló hőgutás lehet: ne hagyd az árnyékban „pihenni”, hanem azonnal hűtsd és hívj mentőt. A hőguta túlélése a hűtés gyorsaságán múlik.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a „ha kétséges, állítsd le” szabály agyrázkódásnál?', options: ['Ha a sportoló jól érzi magát, visszamehet', 'Gyanú esetén a sportoló azonnal kikerül, és aznap nem tér vissza', 'Csak eszméletvesztésnél kell levenni', 'A bíró dönt mindenről'], answer: 1, explain: 'Gyanú esetén is le kell venni; a visszatérésről orvos dönt, fokozatos program után.' },
        { q: 'Szükséges-e az eszméletvesztés az agyrázkódáshoz?', options: ['Igen, mindig', 'Csak felnőtteknél', 'Csak fejelésnél', 'Nem, a legtöbb agyrázkódásban nincs eszméletvesztés'], answer: 3, explain: 'A tünetek (fejfájás, szédülés, zavartság stb.) eszméletvesztés nélkül is jelzik.' },
        { q: 'Mennyivel csökkentette a FIFA 11+ a labdarúgó-sérüléseket Thorborg és mtsai (2017) metaanalízisében?', options: ['Kb. 39%-kal', 'Kb. 5%-kal', 'Kb. 90%-kal', 'Nem volt hatása'], answer: 0, explain: 'A hatás feltétele a rendszeres, legalább heti kétszeri alkalmazás.' },
        { q: 'Mi a terheléses hőguta legfontosabb ellátása?', options: ['Pihentetés árnyékban, majd hazaküldés', 'Csak sok víz itatása', 'Azonnali hűtés a helyszínen, lehetőleg hideg vizes merítéssel, és 112', 'Meleg takaró'], answer: 2, explain: '„Előbb hűts, aztán szállíts”: a túlélés a hűtés gyorsaságán múlik.' },
        { q: 'Melyik vészjel, ami agyrázkódás-gyanúnál azonnali mentőhívást igényel?', options: ['Enyhe fáradtság', 'Nyakfájdalom, kettős látás vagy végtaggyengeség', 'Szomjúság', 'Izomláz'], answer: 1, explain: 'Ezek súlyosabb fej- vagy nyaki sérülésre utalhatnak.' },
        { q: 'Mi a Nordic hamstring gyakorlat?', options: ['Excentrikus hátsócomb-erősítés térdelő helyzetből', 'Nyújtógyakorlat a vádlinak', 'Skandináv síelés', 'Egylábas egyensúlygyakorlat'], answer: 0, explain: 'Petersen és mtsai vizsgálatában jelentősen csökkentette a hátsócomb-sérüléseket.' },
        { q: 'Miért jobb hőterhelési mutató a WBGT a sima hőmérsékletnél?', options: ['Mert olcsóbb mérni', 'Mert csak a szelet méri', 'Mert mindig alacsonyabb', 'Mert a páratartalmat és a sugárzást is figyelembe veszi'], answer: 3, explain: 'Párás melegben az izzadás kevésbé hűt, ezért veszélyesebb.' },
        { q: 'Mit javasol a 2022-es amszterdami konszenzus gyerekeknek agyrázkódás után?', options: ['Teljes ágynyugalom egy hónapig', 'Azonnali visszatérés a sportba', 'Előbb fokozatos visszatérés a tanulásba, csak utána a teljes sportba', 'Semmilyen mozgást egy évig'], answer: 2, explain: 'Rövid relatív pihenés után könnyű aktivitás ajánlott; az iskola megelőzi a teljes sportot.' }
      ]
    },
    {
      id: 'erosites-allokepesseg',
      title: 'Erő, gyorsaság, állóképesség, mozgékonyság',
      level: 2, minutes: 16,
      summary: 'A kondicionális képességek fejlesztésének alapelvei, és hogyan erősítsenek biztonságosan a fiatalok.',
      tags: ['erőfejlesztés', 'maximális erő', 'hipertrófia', 'gyorsasági erő', 'robbanékonyság', '1RM', 'gyorsaság', 'sprint', 'állóképesség', 'aerob', 'anaerob', 'intervallum', 'polarizált edzés', 'mozgékonyság', 'hajlékonyság', 'nyújtás', 'ifjúsági erősítés'],
      terms: ['anatomia/izomosszehuzodas', 'anatomia/szarkomer', 'anatomia/izomszovet', 'anatomia/gazcsere', 'anatomia/percterfogat'],
      models: ['sejt', 'sziv'],
      sections: [
        {
          title: 'A kondicionális és koordinációs képességek',
          text: 'A sportteljesítmény alapját a **kondicionális képességek** adják:\n\n- **Erő**: az izom feszülésével legyőzni vagy megtartani egy ellenállást.\n- **Gyorsaság**: mozgás végrehajtása a lehető legrövidebb idő alatt (reakció, sprint, mozdulatgyorsaság).\n- **Állóképesség**: a terhelés hosszú ideig, a teljesítmény csökkenése nélkül történő elviselése.\n- **Hajlékonyság (mozgékonyság)**: az ízületek mozgásterjedelme.\n\nEzekhez jönnek a **koordinációs képességek** (egyensúly, ritmus, téri tájékozódás, reakció, gyors alkalmazkodás). A gyakorlatban ezek **együtt** jelennek meg: a kosárlabdázó irányváltása egyszerre erő, gyorsaság és koordináció.\n\nAz energiaellátás háttere (ATP, kreatin-foszfát, glikolízis, oxidatív rendszer): [[#/lecke/sport/test-edzes|Mi történik a testben sportolás közben?]]'
        },
        {
          title: 'Erőfejlesztés alapelvei',
          text: 'Az intenzitást gyakran az **1RM** (egy ismétléses maximum) százalékában adják meg. Tipikus irányok (tájékoztató értékek, edzett felnőttre):\n\n- **Maximális erő**: kb. **80–90% felett**, **1–5 ismétlés**, hosszú pihenő (2–5 perc).\n- **Izomtömeg (hipertrófia)**: kb. **65–85%**, **6–12 ismétlés**, közepes pihenő; de a kutatások szerint könnyebb súllyal, közel kifáradásig végzett sorozatok is hatásosak.\n- **Gyorsasági erő (robbanékonyság)**: kis-közepes súly **gyorsan** mozgatva, ugrások, dobások – kevés ismétlés, teljes pihenő, mert itt a minőség számít.\n- **Erő-állóképesség**: könnyebb súly, sok ismétlés, rövid pihenő.\n\nAz első hetekben a gyors erőnövekedés főleg **idegrendszeri alkalmazkodás** (több motoros egység, jobb összehangolás); az izom keresztmetszete később nő. Az izomösszehúzódás molekuláris részletei: a szarkomerben az aktin és a miozin csúszik el egymáson.',
          tip: 'Az erőedzés első szabálya: **előbb a technika, aztán a súly**. Ha a mozdulat (pl. guggolás) megtört hát, befelé eső térd mellett megy, a súly túl nagy.'
        },
        {
          title: 'Biztonságos erősítés fiataloknak',
          text: 'Régi tévhit, hogy a súlyzós edzés „megállítja a növekedést”. A 2014-es nemzetközi konszenzus (Lloyd és mtsai, BJSM) és több sportorvosi, erőnléti szervezet állásfoglalása szerint a **megfelelően felügyelt és tervezett** ellenállásos edzés gyerekeknek és serdülőknek is **biztonságos és hasznos**:\n\n- javítja az erőt, a mozgáskoordinációt és a csontsűrűséget,\n- csökkentheti a sportsérülések kockázatát,\n- növeli a mozgásbeli magabiztosságot.\n\nA sérülések nagy része **felügyelet nélküli**, otthoni, rossz technikájú vagy túl nehéz súlyos edzésből adódik.\n\n**Biztonsági alapszabályok:**\n\n1. Akkor kezdhet, amikor a gyerek **érti és követi az utasításokat** (gyakran 7–8 éves kor körül) – testsúlyos gyakorlatokkal.\n2. **Képzett felügyelet**, kis csoport, megfelelő eszköz.\n3. Először a **mozgásminta** (guggolás, csípőhajlítás, nyomás, húzás, hordás, törzsstabilitás), aztán a fokozatos terhelés.\n4. Kezdetben pl. **1–3 sorozat, 8–15 ismétlés**, könnyű-közepes ellenállás; a súlyt csak akkor emeld, ha a technika stabil.\n5. Maximális egyismétléses próbák csak jól megtanult technikával, tapasztalt szakember mellett.\n6. Bemelegítés, levezetés, és **soha ne versenyezzenek**, ki emel többet.',
          warn: 'Fájdalom esetén (főleg ízületi vagy hátfájdalom) a gyakorlatot abba kell hagyni. Fiatal sportolóknál a gerincet nagy tengelyirányú terheléssel érő, rossz technikájú emelések különösen veszélyesek.'
        },
        {
          title: 'Gyorsaság és mozgékonyság (agility)',
          text: '**Gyorsaságfejlesztés szabályai:**\n\n- **Kipihent állapotban**, az edzés elején, bemelegítés után.\n- **Rövid** ismétlések (kb. 5–6 másodpercnél rövidebb sprintek), **maximális** szándékkal.\n- **Hosszú, teljes pihenő** (gyakori ökölszabály: kb. 1 perc pihenő minden 10 méter sprint után). Ha a sebesség csökken, a sorozatot be kell fejezni – fáradtan már nem gyorsaságot, hanem állóképességet edzel.\n\n**Irányváltás vs. agility**: az előre megtanult pályán végzett irányváltás (pl. bólyák között) az **irányváltó gyorsaság**. A valódi **agility** ennél több: **ingerre reagáló** irányváltás (pl. az ellenfél mozgására), tehát érzékelést és döntést is tartalmaz. Ezt reaktív játékokkal, párharcokkal lehet fejleszteni.\n\n**Hajlékonyság**: a dinamikus nyújtás a bemelegítés része. A hosszú (izomcsoportonként kb. 60 másodpercnél hosszabb) **statikus nyújtás** közvetlenül robbanékony teljesítmény előtt átmenetileg ronthatja az erőt – ezért a hosszú statikus nyújtás inkább külön edzésre vagy levezetésre való. A torna, műkorcsolya, harcművészetek nagyobb mozgásterjedelmet igényelnek – ott ez célzottan fejlesztendő.'
        },
        {
          title: 'Állóképesség: alap és intervallum',
          text: 'Az **aerob állóképesség** (oxigén felhasználásával történő energiatermelés) az alapja szinte minden sportág regenerációs képességének is. Fejlesztésének fő formái:\n\n- **Folyamatos, könnyű-közepes edzés** (Z1–Z2): hosszabb ideig, beszélgetős tempóban – a mitokondriumok száma, a hajszálerek sűrűsége, a szív verőtérfogata nő.\n- **Küszöbedzés** (Z3–Z4): tempófutás, hosszabb intervallumok.\n- **Nagy intenzitású intervallum** (HIIT, Z5): pl. `4 × 4 perc` 90–95% HRmax-on 3 perc aktív pihenővel – a VO₂max fejlesztésére.\n\nÁllóképességi élsportolóknál gyakran megfigyelt az ún. **polarizált** eloszlás (Seiler): az edzésidő nagyjából **80%-a könnyű**, kb. **20%-a kemény**, és kevés a „középút”. A szabadidősportolók gyakori hibája az ellenkezője: minden edzés „közepesen kemény”, ami fáraszt, de kevés specifikus ingert ad.\n\nCsapatsportokban az állóképességet gyakran **kis létszámú játékokkal** fejlesztik, mert így egyszerre edződik a technika és a döntéshozatal is.',
          tip: 'A „beszélgetés-teszt” egyszerű intenzitásjelző: ha teljes mondatokban tudsz beszélni, Z1–Z2-ben vagy; ha csak pár szót, már küszöb fölött.'
        },
        {
          title: 'A képességek sorrendje és kombinálása',
          text: 'Ha egy edzésen több képességet fejlesztesz, a jó sorrend általában:\n\n1. **Koordináció, technika, gyorsaság** – friss idegrendszer kell.\n2. **Gyorsasági erő, maximális erő**.\n3. **Erő-állóképesség, állóképesség** – ez fáraszt a legjobban.\n\nAz ún. **interferenciahatás**: nagy terjedelmű állóképességi edzés ugyanazon a napon, közvetlenül az erőedzés előtt ronthatja az erőfejlődést. Ha lehet, a kemény állóképességi és kemény erőedzést **válaszd szét** (más nap, vagy legalább több óra különbséggel).\n\nA hét megtervezésénél pedig visszatér a [[#/lecke/edzo/periodizacio|periodizáció]] logikája: terhelés, pihenés, változatosság.'
        }
      ],
      quiz: [
        { q: 'Milyen ismétlésszám jellemző a maximális erő fejlesztésére (edzett felnőttnél)?', options: ['20–30', '1–5', '50 fölött', '12–15'], answer: 1, explain: 'Nagy súly (kb. 80–90% 1RM felett), kevés ismétlés, hosszú pihenő.' },
        { q: 'Biztonságos-e a felügyelt erősítés gyerekeknek?', options: ['Nem, megállítja a növekedést', 'Csak 18 év felett', 'Igen, megfelelő felügyelettel, technikával és fokozatossággal', 'Csak lányoknak'], answer: 2, explain: 'A nemzetközi konszenzus szerint biztonságos és hasznos; a sérülések többsége felügyelet nélküli edzésből adódik.' },
        { q: 'Miért kell hosszú pihenő a sprintek között?', options: ['Hogy maximális sebességgel ismételhessenek, ne fáradtan', 'Mert a sprint unalmas', 'Hogy kihűljenek az izmok', 'Hogy több idő maradjon beszélgetni'], answer: 0, explain: 'Fáradtan már nem gyorsaságot, hanem állóképességet edzel.' },
        { q: 'Mi különbözteti meg az agilityt az egyszerű irányváltástól?', options: ['Csak a hossza', 'Hogy labdával végzik', 'Hogy hátrafelé futnak', 'Hogy ingerre reagáló, döntést is tartalmazó irányváltás'], answer: 3, explain: 'Az agility érzékelést, döntést és mozgást kapcsol össze.' },
        { q: 'Mit jelent a polarizált állóképességi edzés?', options: ['Csak kemény edzések', 'Kb. 80% könnyű, kb. 20% kemény edzés, kevés közepes', 'Csak könnyű edzések', 'Felváltva úszás és futás'], answer: 1, explain: 'Seiler megfigyelései szerint sok állóképességi élsportoló így edz.' },
        { q: 'Mi okozza elsősorban az első hetek gyors erőnövekedését?', options: ['Idegrendszeri alkalmazkodás', 'Azonnali izomtömeg-növekedés', 'A csontok megnyúlása', 'A zsírszövet csökkenése'], answer: 0, explain: 'A motoros egységek jobb toborzása és összehangolása gyorsabb, mint a hipertrófia.' },
        { q: 'Milyen sorrend javasolt egy edzésen belül?', options: ['Állóképesség → erő → gyorsaság', 'Mindegy', 'Erő → állóképesség → koordináció', 'Koordináció és gyorsaság → erő → állóképesség'], answer: 3, explain: 'A friss idegrendszert igénylő feladatok előre kerülnek.' },
        { q: 'Mikor ronthatja a teljesítményt a statikus nyújtás?', options: ['Ha hosszan (izomcsoportonként kb. 60 s felett) közvetlenül robbanékony munka előtt végzik', 'Soha', 'Ha levezetésként végzik', 'Ha dinamikus nyújtással kombinálják a bemelegítésben röviden'], answer: 0, explain: 'A hosszú statikus nyújtás átmenetileg csökkentheti az erőkifejtést.' }
      ]
    },
    {
      id: 'kommunikacio-motivacio',
      title: 'Edzői kommunikáció és motiváció',
      level: 1, minutes: 15,
      summary: 'Hogyan adj hatásos visszajelzést, hogyan kérdezz, hogyan építs csapatot, és hogyan dolgozz együtt a szülőkkel.',
      tags: ['kommunikáció', 'visszajelzés', 'dicséret', 'coaching-kérdések', 'GROW-modell', 'motiváció', 'öndeterminációs elmélet', 'autonómia', 'kompetencia', 'kapcsolódás', 'elsajátítási légkör', 'csapatkohézió', 'szülők', 'konfliktuskezelés'],
      terms: ['szabalyozas/visszacsatolas'],
      sections: [
        {
          title: 'Hogyan beszél a jó edző?',
          text: 'Az edzői kommunikáció ereje nem a hangerőben, hanem a **tisztaságban** van:\n\n- **Röviden**: egy instrukcióban egy-két kulcsgondolat. Gyerekeknél 30–60 másodperc magyarázat után már mozogni kell.\n- **Mutasd meg**: a jó bemutatás többet ér a hosszú szövegnél.\n- **Pozíció**: úgy állj, hogy mindenki lásson és halljon, a sportolók ne a napba vagy a zavaró háttérbe nézzenek.\n- **Név szerint**: szólítsd meg a sportolót a nevén – mindenkit, nem csak a legjobbakat.\n- **Ellenőrizd a megértést**: „Mondd el, mire figyelsz a következő körben!”\n\nA **nem verbális jelek** (testtartás, arckifejezés, hangszín) legalább annyit üzennek, mint a szavak. A pálya szélén széttárt karral sóhajtozó edző egyértelmű üzenetet küld – akkor is, ha egy szót sem szól.'
        },
        {
          title: 'Visszajelzés, ami fejleszt',
          text: 'A visszajelzés egy **szabályozási hurok**: a sportoló cselekszik, információt kap az eredményről, korrigál. A hatásos visszajelzés:\n\n1. **Konkrét**: nem „ügyes voltál”, hanem „most végig a labdán maradt a szemed, ezért lett pontos a passz”.\n2. **Viselkedésre és erőfeszítésre** irányul, nem a személyre („lusta vagy” helyett „az utolsó két sprintben lelassítottál a vonal előtt”).\n3. **Előre néz**: mit csináljon legközelebb („legközelebb érkezz puhábban, hajlított térddel”).\n4. **Időzített**: közvetlenül a mozgás után, de nem minden egyes próbálkozásnál – a túl sok visszajelzés függővé tesz (lásd a technikaoktatás leckét).\n5. **Arányos**: több pozitív, mint korrigáló visszajelzés – a korrekció akkor működik, ha a légkör alapvetően támogató.\n\nA népszerű „szendvics” (dicséret – kritika – dicséret) könnyen átláthatóvá és üressé válik. Hatásosabb az **őszinte, konkrét elismerés** és a **világos, előremutató korrekció** külön-külön.',
          tip: 'Dicsérd az **erőfeszítést és a stratégiát**, ne a „tehetséget”. A „milyen tehetséges vagy” dicséret után a gyerekek hajlamosabbak elkerülni a nehéz feladatokat, mert félnek, hogy kiderül, mégsem azok.'
        },
        {
          title: 'Coaching-kérdések: hogy a sportoló gondolkodjon',
          text: 'Ha mindig az edző mondja meg a megoldást, a sportoló nem tanul meg önállóan dönteni. A **kérdező edzés** segít:\n\n- **Nyitott kérdések**: „Mit vettél észre, amikor…?”, „Mi történt volna, ha…?”, „Milyen más megoldást látsz?”\n- **Önértékelés**: „1-től 10-ig mennyire voltál elégedett az érkezéseddel? Mi kellene, hogy eggyel több legyen?”\n\nA **GROW-modell** (Whitmore) egy egyszerű beszélgetési váz:\n\n1. **G**oal – cél: Mit szeretnél elérni?\n2. **R**eality – valóság: Hol tartasz most? Mi történik?\n3. **O**ptions – lehetőségek: Milyen utak vannak?\n4. **W**ill – vállalás: Mit csinálsz, mikor, és honnan tudod, hogy sikerült?\n\nA kérdezés nem helyettesíti az utasítást: biztonsági helyzetben vagy egy kezdőnek új technikánál a **világos instrukció** a helyes. A kettő aránya a sportoló szintjéhez igazodik.'
        },
        {
          title: 'Motiváció: autonómia, kompetencia, kapcsolódás',
          text: 'Az **öndeterminációs elmélet** (Deci és Ryan) szerint a tartós, belső motiváció három alapvető lélektani szükségletre épül:\n\n- **Autonómia**: legyen választása (pl. melyik gyakorlattal kezdjen, ő találja ki a csapatcélt), értse, **miért** csinálja.\n- **Kompetencia**: érezze, hogy fejlődik – reális kihívások, látható haladás.\n- **Kapcsolódás**: tartozzon valahová, érezze, hogy számít.\n\n**Motivációs légkör**: az edző döntéseivel teremti meg.\n\n- **Elsajátítási (feladatorientált) légkör**: a siker = fejlődés, erőfeszítés, tanulás; a hiba a tanulás része.\n- **Teljesítmény (ego) légkör**: a siker = másoknál jobbnak lenni; a hibát büntetik, a gyengébbeket háttérbe szorítják.\n\nA kutatások szerint az elsajátítási légkör több élvezetet, kitartást és kisebb szorongást hoz – miközben a teljesítményt sem rontja.',
          warn: 'A büntetésként adott futás, fekvőtámasz azt tanítja, hogy a mozgás büntetés. Ez hosszú távon a sporttól való elforduláshoz vezethet. A fegyelmet következetes szabályokkal, ne testmozgással tartsd fenn.'
        },
        {
          title: 'Csapatkohézió',
          text: 'A **kohézió** a csapat összetartása. Carron modellje két fajtáját különbözteti meg:\n\n- **Feladatkohézió**: mennyire dolgoznak együtt egy közös célért.\n- **Társas kohézió**: mennyire kedvelik egymást, mennyit vannak együtt.\n\nA teljesítménnyel a **feladatkohézió** függ össze erősebben – nem kell, hogy mindenki legjobb barát legyen, de mindenki értse és vállalja a szerepét.\n\nA csapatok fejlődésének klasszikus szakaszai (Tuckman): **alakulás → viharzás → normaképzés → működés**. A „viharzás” (súrlódások, szerepviták) normális; az edző feladata, hogy közös **normákat és szerepeket** tisztázzon.\n\n**Gyakorlati eszközök**: közösen megfogalmazott csapatszabályok, egyértelmű szerepek (mindenkinek van fontos feladata, a cserejátékosnak is), közös célok, rotáló felelősségek (kapitányi feladatok), csapatos kihívások, és a bántó csoportdinamika (kiközösítés, csúfolás) **azonnali** kezelése.'
        },
        {
          title: 'Együttműködés a szülőkkel',
          text: 'Utánpótláskorban a szülő a csapat része. A jó együttműködés eszközei:\n\n1. **Szezon eleji szülői értekezlet**: célok, játékidő-elvek, kommunikációs csatornák, elvárt viselkedés a pálya szélén.\n2. **Világos csatornák**: kihez, hogyan, mikor fordulhatnak.\n3. **„Hűtési” szabály**: sok egyesület kéri, hogy mérkőzés után kb. 24 óráig ne beszéljenek meg vitás kérdést – így indulatok nélkül lehet beszélni.\n4. **A pálya szélén**: a szülő buzdít, nem instruál. Az egymásnak ellentmondó utasítások (edző vs. szülő) összezavarják a gyereket.\n5. **Nehéz beszélgetés**: hallgasd meg, ismételd vissza, amit hallottál, maradj a tényeknél és a gyerek érdekénél.\n\nA gyerekeknek jó kérdés lehet a meccs utáni autóúton: **„Élvezted?”** – és nem a hibák elemzése.'
        }
      ],
      quiz: [
        { q: 'Melyik a hatásos visszajelzés példája?', options: ['„Ügyes vagy!”', '„Most hajlított térddel érkeztél, ezért volt stabil az ugrás.”', '„Már megint rossz volt.”', '„Te ehhez nem vagy elég tehetséges.”'], answer: 1, explain: 'A konkrét, viselkedésre irányuló visszajelzés megmutatja, mit kell megtartani.' },
        { q: 'Mit jelent a GROW-modellben a W (Will)?', options: ['A győzelmet', 'A súlyt', 'A vállalást: mit csinál, mikor és honnan tudja, hogy sikerült', 'A figyelmeztetést'], answer: 2, explain: 'Goal, Reality, Options, Will – a beszélgetés vállalással zárul.' },
        { q: 'Melyik NEM tartozik az öndeterminációs elmélet három alapszükséglete közé?', options: ['Autonómia', 'Kompetencia', 'Kapcsolódás', 'Hírnév'], answer: 3, explain: 'A belső motiváció alapja az autonómia, a kompetencia és a kapcsolódás.' },
        { q: 'Mi jellemzi az elsajátítási motivációs légkört?', options: ['A siker = fejlődés és erőfeszítés, a hiba a tanulás része', 'Csak a győzelem számít', 'A hibát büntetik', 'A gyengébbek kevesebbet játszanak'], answer: 0, explain: 'Ez a légkör több élvezetet, kitartást és kevesebb szorongást hoz.' },
        { q: 'Melyik kohéziótípus függ össze erősebben a teljesítménnyel?', options: ['A társas kohézió', 'A feladatkohézió', 'Egyik sem', 'A szülői kohézió'], answer: 1, explain: 'A közös célért való együttműködés fontosabb, mint hogy mindenki barát legyen.' },
        { q: 'Miért nem jó büntetésként futást adni?', options: ['Mert túl könnyű', 'Mert drága', 'Mert a szabályok tiltják', 'Mert azt tanítja, hogy a mozgás büntetés'], answer: 3, explain: 'Hosszú távon rombolja a mozgás örömét.' },
        { q: 'Mi a szülő ideális szerepe a pálya szélén?', options: ['Buzdít, de nem instruál', 'Folyamatosan utasítja a gyereket', 'Vitatkozik a bíróval', 'Az edzőt korrigálja hangosan'], answer: 0, explain: 'Az edzővel ellentmondó utasítások összezavarják a gyereket.' },
        { q: 'Mit érdemes dicsérni a „tehetség” helyett?', options: ['A külsőt', 'Semmit', 'Az erőfeszítést és a stratégiát', 'Csak a győzelmet'], answer: 2, explain: 'Az erőfeszítés dicsérete a kihívások vállalására ösztönöz.' }
      ]
    },
    {
      id: 'taplalkozas-regeneracio',
      title: 'Táplálkozás, folyadék, alvás és regeneráció',
      level: 1, minutes: 15,
      summary: 'Az energia, a szénhidrát és a fehérje szerepe, a folyadékpótlás, az alvás és a regeneráció alapjai – és a RED-S veszélye. Étrend-kiegészítőt és doppingot nem ajánlunk!',
      tags: ['táplálkozás', 'energia', 'szénhidrát', 'glikogén', 'fehérje', 'folyadékpótlás', 'dehidratáció', 'testsúlymérés', 'alvás', 'regeneráció', 'RED-S', 'REDs', 'alacsony energiaellátottság', 'étrend-kiegészítő', 'dopping', 'objektív felelősség'],
      terms: ['anatomia/inzulin-glukagon', 'anatomia/emesztes', 'anatomia/homeosztazis', 'szerves-kemia/szenhidrat', 'szerves-kemia/aminosav'],
      models: ['sejt'],
      sections: [
        {
          title: 'Az edző szerepe a táplálkozásban – és a határai',
          text: 'Az edző a sportoló mindennapjainak része, ezért **alapelveket** átadhat: rendszeres étkezés, változatos étrend, elég folyadék, elég alvás. A **személyre szabott étrend, fogyókúra, étrend-kiegészítő** viszont **dietetikus, sporttáplálkozási szakember vagy orvos** feladata.\n\nEz a lecke az **alapokat** foglalja össze; a sportolóknak szóló részletesebb lecke: [[#/lecke/sport/taplalkozas|Táplálkozás és folyadék sportolóknak]].',
          warn: 'Edzőként soha ne ajánlj és ne adj étrend-kiegészítőt, „teljesítményfokozót” vagy gyógyszert. A doppingszabályok szerint a sportoló felel minden szervezetébe kerülő anyagért (objektív felelősség), és a szennyezett étrend-kiegészítők is okozhatnak pozitív doppingtesztet. Az edző, aki tiltott szert ad, maga is doppingvétséget követ el.'
        },
        {
          title: 'Energia, szénhidrát, fehérje',
          text: 'A sportolónak **elég energiára** van szüksége az edzéshez, a növekedéshez (fiataloknál!) és a regenerációhoz.\n\n- **Szénhidrát**: az intenzív munka fő üzemanyaga, az izmokban és a májban **glikogénként** raktározódik. A sporttáplálkozási ajánlások (pl. ACSM 2016) az edzésterheléstől függően nagyjából **3–5 g/ttkg/nap** (könnyű edzés) és **6–10 g/ttkg/nap** (nagy terhelés) közé teszik – ez szakmai irányszám, nem egyéni előírás.\n- **Fehérje**: az izom helyreállításához és alkalmazkodásához; sportolóknak kb. **1,2–2,0 g/ttkg/nap**, a nap folyamán több étkezésre elosztva. Ez a legtöbbször **normál ételekből** (tejtermék, tojás, hús, hal, hüvelyesek) fedezhető.\n- **Zsír**: energia és a zsírban oldódó vitaminok felszívódása; ne legyen túlzottan alacsony.\n- **Mikrotápanyagok**: különösen a **vas** (főleg lányoknál, állóképességi sportolóknál), a **kalcium** és a **D-vitamin**; hiányuk gyanújánál orvosi vizsgálat kell, nem találomra szedett tabletta.\n\n**Időzítés**: edzés előtt 2–4 órával egy főétkezés, közvetlenül előtte könnyű, jól emészthető szénhidrát; edzés után néhány órán belül szénhidrát és fehérje (pl. egy rendes vacsora vagy tejes-gabonás étel).'
        },
        {
          title: 'Folyadékpótlás',
          text: 'Izzadással óránként akár **1–2 liter** folyadék is távozhat melegben, intenzív munkánál. Ha a testtömeg-vesztés kb. **2%** fölé nő (60 kg-os sportolónál 1,2 kg), az állóképességi teljesítmény és a döntéshozatal romolhat.\n\n**Egyszerű módszer – a mérlegelés**:\n\n1. Mérd meg a sportolót edzés előtt és után (vécé után, száraz ruhában).\n2. A különbség nagyjából a folyadékvesztés (1 kg ≈ 1 liter), plusz amit közben ivott.\n3. Visszapótlás: a vesztés kb. **125–150%-a** a következő órákban, mert a vizelettel is távozik egy rész.\n\n**Példa**: edzés előtt 70,0 kg, után 69,2 kg, közben 0,5 l vizet ivott. Vesztés: `0,8 + 0,5 = 1,3 liter`; pótlás: kb. `1,0–1,2 liter` a következő órákban (a 0,8 kg testtömeg-csökkenés 125–150%-a).\n\nA **vizelet színe** (világos szalmasárga = rendben, sötét = inni kell) egyszerű napi jelző. Hosszú (több órás), nagyon izzadós terhelésnél sót (nátriumot) is pótolni kell; a túlzott, kényszeres vízivás (hiponatrémia) is veszélyes.'
        },
        {
          title: 'Alvás: a legfontosabb regenerációs eszköz',
          text: 'Alvás alatt történik a hormonális helyreállítás, a glikogénraktárak feltöltése és a **mozgástanulás rögzítése** is. Ajánlott alvásidő (az amerikai alvásgyógyászati akadémia ajánlása): **9–12 óra** 6–12 éveseknek, **8–10 óra** kamaszoknak, legalább **7 óra** felnőtteknek – sok sportolónak ennél több is jól jön.\n\nEgy ismert stanfordi vizsgálatban (Mah és mtsai, 2011) 11 egyetemi kosárlabdázó több héten át meghosszabbította az alvását (átlagosan közel 2 órával): sprintidejük javult, a büntetődobás- és hárompontos-százalékuk kb. **9 százalékponttal** nőtt. Kis minta, de jól mutatja az irányt.\n\n**Alváshigiénés tanácsok sportolóknak:**\n\n- rendszeres lefekvési és ébredési idő (hétvégén is);\n- sötét, hűvös, csendes hálószoba;\n- képernyő kerülése lefekvés előtt;\n- késő esti koffein kerülése;\n- késő esti edzés/meccs után levezetés, könnyű vacsora.\n\nAz edző is tehet érte: ne legyenek feleslegesen korai reggeli edzések kamaszoknak, és a versenyprogram figyelembe veheti az alvást.'
        },
        {
          title: 'Regeneráció a gyakorlatban',
          text: 'A regeneráció a **terhelés és a pihenés egyensúlyának** másik fele. Bizonyítottan legfontosabb elemei: **alvás, elegendő energia és folyadék, pihenőnapok**. A többi eszköz kiegészítő:\n\n- **Aktív levezetés**: könnyű mozgás – inkább a közérzetet javítja.\n- **Masszázs, habhenger**: javíthatja a közérzetet, csökkentheti az izomláz érzését.\n- **Hideg vizes merülés**: rövid távon csökkentheti az izomláz-érzetet (pl. tornák közötti napokon), de rendszeres használata közvetlenül erőedzés után egyes vizsgálatokban **tompította** az erő- és izomnövekedést. Időzítése tehát cél kérdése.\n- **Lelki regeneráció**: szabadidő, barátok, sporttól független élet.\n\nA drága kütyük nem pótolják az alvást és az ételt. Ha egy sportoló minden eszközt használ, de 6 órát alszik, a fő problémát nem oldotta meg.'
        },
        {
          title: 'RED-S: amikor kevés az energia',
          text: 'A **RED-S** (újabb rövidítéssel **REDs**, Relative Energy Deficiency in Sport) a NOB konszenzusa (2014, frissítve **2023**) szerint az **alacsony energiaellátottság** következményeinek összessége. Az energiaellátottság az étellel bevitt energia mínusz az edzés energiafelhasználása, a zsírmentes testtömegre vetítve – ami ebből megmarad, az jut az alapvető életfolyamatokra. Ha tartósan kevés:\n\n- **hormonális zavarok** (lányoknál a menstruáció kimaradása, fiúknál alacsony tesztoszteron),\n- **csontritkulás**, fáradásos csonttörések,\n- gyakori betegség, romló regeneráció és teljesítmény,\n- hangulatzavar, ingerlékenység, koncentrációs nehézség.\n\nA 2023-as konszenzus szerint az alacsony energiaellátottság egy **spektrum**: rövid, enyhe formája alkalmazkodó lehet, a tartós, súlyos forma okoz bajt. Nem csak a „soványságot hangsúlyozó” sportágakban (torna, hosszútáv, esztétikai sportok, súlycsoportos sportok) fordul elő, és **fiúkat, férfiakat is érint**.\n\n**Edzői teendők:** ne kommentáld a testsúlyt, ne írj elő fogyást, figyelj a jelekre (ismétlődő fáradásos törés, kimaradó menstruáció, drasztikus fogyás, étkezések kerülése), és bizalmasan irányítsd a sportolót **orvoshoz** (sportorvos, dietetikus, szükség esetén pszichológus).'
        }
      ],
      quiz: [
        { q: 'Mekkora testtömeg-vesztés fölött romolhat érezhetően az állóképességi teljesítmény?', options: ['0,1%', 'Kb. 2%', '10%', '20%'], answer: 1, explain: 'Kb. 2% fölötti folyadékvesztésnél a teljesítmény és a döntéshozatal romolhat.' },
        { q: 'Edzés előtt 70,0 kg, után 69,2 kg, közben nem ivott. Mennyi folyadékot érdemes pótolnia?', options: ['Kb. 1,0–1,2 litert', '0,2 litert', '5 litert', 'Semennyit'], answer: 0, explain: 'A 0,8 kg vesztés 125–150%-a, mert a vizelettel is távozik egy rész.' },
        { q: 'Mi a RED-S/REDs alapvető oka?', options: ['Túl sok alvás', 'Túl sok fehérje', 'Tartósan alacsony energiaellátottság', 'Túl sok folyadék'], answer: 2, explain: 'Az edzéshez képest kevés energiabevitel hormonális, csont- és teljesítményproblémákhoz vezet.' },
        { q: 'Kit érinthet a RED-S?', options: ['Csak tornász lányokat', 'Csak felnőtt nőket', 'Csak úszókat', 'Fiúkat és lányokat, férfiakat és nőket is, sokféle sportágban'], answer: 3, explain: 'A 2023-as NOB-konszenzus kiemeli, hogy férfiakat is érint.' },
        { q: 'Mi a helyes edzői hozzáállás az étrend-kiegészítőkhöz?', options: ['Nem ajánl és nem ad; orvoshoz, dietetikushoz irányít', 'Minden sportolónak fehérjeport ad', 'Csak a jobbaknak ad', 'A csomagoláson lévő ajánlást követi'], answer: 0, explain: 'A szennyezett kiegészítők pozitív doppingtesztet is okozhatnak, és ez nem edzői kompetencia.' },
        { q: 'Mennyi alvás ajánlott kamaszoknak?', options: ['5–6 óra', '6–7 óra', '8–10 óra', '14 óra'], answer: 2, explain: 'Az AASM ajánlása 13–18 éveseknek 8–10 óra.' },
        { q: 'Mit mutatott Mah és mtsai stanfordi kosárlabdás vizsgálata?', options: ['Az alvás meghosszabbítása után javult a sprint és a dobószázalék', 'Az alvásnak nincs hatása', 'A kevesebb alvás jobb', 'Csak az étrend számít'], answer: 0, explain: 'A büntetődobás- és hárompontos-százalék kb. 9 százalékponttal nőtt (kis mintán).' },
        { q: 'Mi a regeneráció legfontosabb, bizonyított eleme?', options: ['Drága kompressziós ruha', 'Alvás, elegendő energia és folyadék, pihenőnapok', 'Napi jeges fürdő', 'Szauna minden edzés után'], answer: 1, explain: 'A kiegészítő eszközök nem pótolják az alapokat.' }
      ]
    },
    {
      id: 'technika-taktika',
      title: 'Technikaoktatás és taktika',
      level: 2, minutes: 16,
      summary: 'A mozgástanulás szakaszai, a külső figyelmi fókusz, a változatos gyakorlás, a visszajelzés adagolása, a videóelemzés és a taktikai gondolkodás fejlesztése.',
      tags: ['technika', 'mozgástanulás', 'Fitts és Posner', 'kognitív szakasz', 'asszociatív szakasz', 'autonóm szakasz', 'külső fókusz', 'belső fókusz', 'változatos gyakorlás', 'kontextuális interferencia', 'blokkolt gyakorlás', 'visszajelzés', 'videóelemzés', 'taktika', 'TGfU', 'döntéshozatal'],
      terms: ['anatomia/neuron', 'anatomia/szinapszis', 'anatomia/reflexiv', 'anatomia/latas'],
      models: ['agy', 'szem'],
      sections: [
        {
          title: 'A mozgástanulás szakaszai',
          text: 'Fitts és Posner (1967) klasszikus modellje szerint egy új mozdulat elsajátítása három szakaszon megy át:\n\n1. **Kognitív szakasz**: a tanuló érteni próbálja, **mit** kell csinálni. Sok a hiba, lassú, darabos a mozgás, nagy a figyelemigény. → Kell: egyszerű, világos bemutatás, kevés kulcsszó, sok próbálkozás.\n2. **Asszociatív szakasz**: a mozgás nagyjából megy, a tanuló a **finomításon** dolgozik. Kevesebb és kisebb hiba. → Kell: célzott visszajelzés, változatos gyakorlás.\n3. **Autonóm szakasz**: a mozgás **automatikussá** válik, kevés figyelmet igényel – a sportoló a játékhelyzetre, a taktikára figyelhet. → Kell: nyomás alatti, versenyszerű gyakorlás.\n\nAz automatizálás az idegrendszerben a gyakorlással megerősödő kapcsolatokon (szinapszisokon) és a kisagy finomhangolásán alapul – nézd meg az [[agy|agy 3D modelljét]]!',
          tip: 'Ne siess a következő szakaszba: ha egy kezdő túl korán kap ellenfelet és időnyomást, gyakran rossz, nehezen kijavítható mintát rögzít. De ne is ragadj le a „steril” gyakorlásnál.'
        },
        {
          title: 'Külső figyelmi fókusz',
          text: 'Hová figyeljen a sportoló mozgás közben? Gabriele Wulf és munkatársai sok kísérletben mutatták ki, hogy a **külső fókusz** (a mozgás **hatására**, a környezetre, az eszközre) általában jobb teljesítményt és tanulást eredményez, mint a **belső fókusz** (a saját testrészekre).\n\n**Klasszikus példa**: golf-ívelésnél azok, akik az **ütő** ingaszerű mozgására figyeltek, pontosabbak voltak, mint akik a **karjukra** – kezdőknél (1999) és tapasztalt golfozóknál (2007) is.\n\nPéldák az átfogalmazásra:\n\n- belső: „nyújtsd ki a térded és a csípőd” → külső: „told el magad a talajtól”\n- belső: „hajlítsd a csuklód” → külső: „a labda pörögjön hátra”\n- belső: „húzd a karod a víz alatt” → külső: „told hátra a vizet”\n\nA magyarázat (ún. korlátozott cselekvés hipotézis): a testrészekre irányított tudatos figyelem „beavatkozik” az automatikus mozgásszabályozásba.'
        },
        {
          title: 'Változatos gyakorlás és kontextuális interferencia',
          text: '- **Blokkolt gyakorlás**: ugyanazt a feladatot sokszor egymás után (pl. 30 tempódobás ugyanonnan). Gyors, látványos javulás a gyakorlás alatt.\n- **Véletlenszerű (változatos) gyakorlás**: a feladatok váltakoznak (különböző távolság, szög, technika keverve).\n\nShea és Morgan (1979) óta sok vizsgálat mutatja a **kontextuális interferencia** hatását: a véletlenszerű gyakorlás közben **rosszabbnak** tűnik a teljesítmény, de a **megtartás és az átvitel** (később, új helyzetben) jobb. A „nehezebb” gyakorlás tehát jobb tanulás – ezt **kívánatos nehézségnek** is nevezik.\n\n**Gyakorlati szabály**: kezdeti, kognitív szakaszban több blokkolt ismétlés segít megérteni a mozgást; ahogy a mozgás nagyjából megy, egyre több **változatosságot** és játékszerű helyzetet kell beépíteni.\n\nA **feltételvezérelt (constraints-led) megközelítés** ugyanezt a környezet alakításával éri el: a pálya méretével, a szabályokkal, az eszközökkel úgy formálja a feladatot, hogy a kívánt megoldás „kiderüljön”.'
        },
        {
          title: 'Visszajelzés adagolása',
          text: 'Két fő típus:\n\n- **Eredményről szóló visszajelzés** (KR, knowledge of results): „15 cm-rel jobbra ment”, „11,8 másodperc”.\n- **Kivitelezésről szóló visszajelzés** (KP, knowledge of performance): „a könyököd leesett az elengedéskor”.\n\nA **túl sok** visszajelzés (minden próbálkozás után) rövid távon segít, de **függővé** teszi a tanulót: amikor elmarad (versenyen), romlik a teljesítmény (ez az ún. irányítási hipotézis). Ezért:\n\n1. **Csökkenő gyakoriság**: kezdetben gyakrabban, később ritkábban.\n2. **Összegző visszajelzés**: néhány próbálkozás után egyszerre.\n3. **Sávos visszajelzés**: csak ha a hiba egy elfogadható sávon kívül esik.\n4. **A tanuló kéri**: hagyd, hogy ő döntse el, mikor kér visszajelzést – ez ráadásul növeli az autonómiát.\n\nKérdezz előbb: „Szerinted mi történt?” – így fejlődik a sportoló saját hibaérzékelése.'
        },
        {
          title: 'Videóelemzés',
          text: 'A mobiltelefon ma bárkinek elérhető elemzőeszköz. Hasznos szabályok:\n\n- **Rögzítsd a szempontot**: oldalról vagy szemből, a megfelelő magasságból, állvánnyal; ugyanonnan minden alkalommal, hogy összehasonlítható legyen.\n- **Lassítás**: a sok telefon által tudott 120–240 kép/s-os felvétel jól mutatja a gyors mozdulatok (ugrás, ütés, rúgás) fázisait.\n- **Egyszerre egy szempont**: ne 10 hibát mutass, hanem a legfontosabbat.\n- **Pozitív minta is**: mutasd meg a jól sikerült próbálkozást is – a sikeres saját mozgás megtekintése is tanít.\n- **Taktikai videó**: csapatsportban a mérkőzésfelvételek klipekre vágva (pl. 5–8 rövid jelenet) hatásosabbak, mint egy teljes meccs végignézése.\n\n**Adatvédelem**: kiskorúakról felvételt csak a szülő hozzájárulásával, a szabályzat szerint készíts és tárolj; közösségi médiában ne tedd közzé engedély nélkül.',
          warn: 'A felvételt ne a sportoló megszégyenítésére használd a csapat előtt. A videó a fejlődés eszköze, nem büntetés.'
        },
        {
          title: 'Taktika: döntéshozatal tanítása',
          text: 'A **taktika** a helyzethez illő döntés: **mit, mikor, hol** csinálj. A technika eszköz, a taktika megmondja, mire használd.\n\nA **TGfU** (Teaching Games for Understanding, Bunker és Thorpe, 1982) megközelítés a játékból indul, nem a technikából:\n\n1. **Játék** (módosított, egyszerűsített formában).\n2. **Játékértés**: „Mi a cél? Hol van szabad terület?”\n3. **Taktikai tudatosság**: „Mikor passzolsz, mikor viszed?”\n4. **Döntéshozatal**: mit és hogyan.\n5. **Végrehajtás** (technika) – amikor a játék megmutatja, hogy szükség van rá.\n6. **Teljesítmény** a játékban.\n\n**Gyakorlati eszközök**: kis létszámú játékok, emberelőny (pl. 3v2), feltételek (pl. „csak két érintés”), „freeze” megállítás egy-egy jó vagy rossz döntésnél (röviden!), és kérdések: „Mit láttál? Milyen más lehetőséged volt?”\n\nA **figyelem és az előrelátás** (anticipáció) is tanulható: a szakértő sportoló az ellenfél testtartásából, a labda első röppályájából korábban „olvassa” a helyzetet. Ennek háttere: [[#/lecke/sport/sportpszichologia|Sportpszichológia]].'
        }
      ],
      quiz: [
        { q: 'Melyik Fitts és Posner szakaszában válik a mozgás automatikussá?', options: ['Kognitív', 'Asszociatív', 'Autonóm', 'Bemutató'], answer: 2, explain: 'Az autonóm szakaszban kevés figyelmet igényel a mozgás, így a játékhelyzetre lehet figyelni.' },
        { q: 'Melyik a külső fókuszú instrukció?', options: ['„Nyújtsd ki a térded!”', '„Told el magad a talajtól!”', '„Hajlítsd a csuklód!”', '„Feszítsd meg a hasizmod!”'], answer: 1, explain: 'A külső fókusz a mozgás hatására, a környezetre irányul.' },
        { q: 'Mit mutat a kontextuális interferencia hatása?', options: ['A véletlenszerű gyakorlás közben rosszabbnak tűnik, de a megtartás és az átvitel jobb', 'A blokkolt gyakorlás mindig jobb', 'A gyakorlás sorrendje lényegtelen', 'Csak gyerekeknél érvényes'], answer: 0, explain: 'A „kívánatos nehézség” jobb hosszú távú tanulást hoz.' },
        { q: 'Mi a gond a minden próbálkozás utáni visszajelzéssel?', options: ['Semmi, minél több, annál jobb', 'Túl lassú', 'Unalmas az edzőnek', 'Függővé teszi a tanulót, versenyen romlik a teljesítmény'], answer: 3, explain: 'Az irányítási hipotézis szerint a túl gyakori visszajelzés gátolja a saját hibaérzékelés fejlődését.' },
        { q: 'Mi a KR (knowledge of results)?', options: ['Visszajelzés a mozgás eredményéről, pl. „15 cm-rel jobbra ment”', 'Visszajelzés a kivitelezésről', 'Egy taktikai rendszer', 'Videóvágó program'], answer: 0, explain: 'A KP ezzel szemben a mozgás kivitelezéséről szól.' },
        { q: 'Mivel kezdődik a TGfU megközelítés?', options: ['Technikai drillekkel', 'Elméleti órával', 'Egy módosított játékkal', 'Erőnléti teszttel'], answer: 2, explain: 'A játékból indul, és a technika akkor kerül elő, amikor a játék megmutatja a szükségességét.' },
        { q: 'Melyik a jó videóelemzési gyakorlat?', options: ['Minden hibát egyszerre megmutatni', 'A felvételt a csapat előtt megszégyenítésre használni', 'Engedély nélkül közzétenni a közösségi médiában', 'Egyszerre egy szempontra fókuszálni, és a jól sikerült próbálkozást is megmutatni'], answer: 3, explain: 'Egy kulcspont és pozitív minta – ez segíti a tanulást.' },
        { q: 'Mi jellemző az asszociatív szakaszra?', options: ['A tanuló még azt sem érti, mit kell csinálni', 'A mozgás nagyjából megy, a finomításon van a hangsúly', 'Teljesen automatikus a mozgás', 'Nincs szükség gyakorlásra'], answer: 1, explain: 'Itt hatásos a célzott visszajelzés és a változatos gyakorlás.' }
      ]
    }
  ]
});
