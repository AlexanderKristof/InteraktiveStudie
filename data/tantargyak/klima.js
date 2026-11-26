/* Tantárgy: Környezet és klíma
 * Adatforrások (a gyorsan változó számok mellett mindig évszám áll): IPCC AR6 (2021–2023), WMO Üvegházgáz-bulletin (2025. okt.),
 * WMO State of the Global Climate 2025, Copernicus C3S (Global Climate Highlights 2025, havi bulletin 2026. okt.),
 * Global Carbon Budget 2025, Indicators of Global Climate Change 2025, HungaroMet, MAVIR, Ember, EEA. */
STUDIE.addSubject({
  id: 'klima',
  stage: 'kozep',
  title: 'Környezet és klíma',
  icon: '🌍',
  color: '#1f9d6b',
  description: 'Üvegházhatás, szén-körforgás, mérések, hatások Magyarországon is, energia, megoldások, alkalmazkodás, biodiverzitás, körforgásos gazdaság és amit te tehetsz – számokkal, szorongás nélkül.',
  intro: 'Ez a tantárgy a klímaváltozás **tudományos alapjait** és a **megoldásokat** mutatja be. A számok a tudományos konszenzust tükrözik (IPCC, WMO, Copernicus, HungaroMet). A gyorsan változó adatok mellé mindig odaírtuk az évszámot, mert ezek évről évre frissülnek.\n\nA cél nem az ijesztgetés, hanem a **nagyságrendek** megértése: mi okozza a melegedést, mekkora a baj, és mely lépések számítanak igazán. Az alapokhoz jól jön a földrajzból a [[#/lecke/foldrajz/legkor|Légkör, időjárás, éghajlat]] lecke. Háromféle interaktív modellel kísérletezhetsz: **üvegházhatás-modell**, **energiamix-szimulátor** és **lábnyom-kalkulátor**.',
  lessons: [
    /* ---------------------------------------------------------------- 1 */
    {
      id: 'uveghazhatas',
      title: 'Az üvegházhatás fizikája',
      level: 1, minutes: 14,
      summary: 'Miért nem −18 °C a Föld? Napfény be, hősugárzás ki, és a gázok, amelyek visszatartják a hőt.',
      tags: ['üvegházhatás', 'sugárzási egyensúly', 'infravörös', 'hősugárzás', 'szén-dioxid', 'metán', 'vízgőz', 'ppm', 'albedó'],
      sections: [
        {
          title: 'Energia be, energia ki',
          text: 'A Föld szinte minden energiáját a **Naptól** kapja, főleg **látható fény** formájában. Ennek kb. **30%-át** azonnal visszaveri a világűrbe (felhők, jég, hó, világos felszínek). Ezt a visszavert hányadot **albedónak** hívjuk.\n\nA maradék elnyelődik, és melegíti a talajt, a vizet és a levegőt. Minden meleg test sugároz: a Föld a hőt **infravörös (hő-) sugárzás** formájában adja le. Ezt nem látjuk, de egy hőkamera igen.\n\nHa a bejövő és a kimenő energia egyenlő, a hőmérséklet állandó: ez a **sugárzási egyensúly**. Ha több jön be, mint amennyi kimegy, a bolygó **melegszik**, amíg új egyensúly nem áll be.',
          tip: 'A fény és a hősugárzás ugyanannak az elektromágneses spektrumnak két része, csak más a hullámhosszuk. Erről a [[#/lecke/fizika/hullamok-feny|Hullámok, hang és fény]] leckében olvashatsz.'
        },
        {
          title: 'Egy takaró a bolygó körül',
          text: 'Ha a Földnek nem lenne légköre, az átlagos felszíni hőmérséklete kb. **−18 °C** lenne. A valóságban kb. **+15 °C**. A **33 °C** különbséget a **természetes üvegházhatás** okozza.\n\nA látható napfény szinte akadály nélkül átjut a levegőn. A felszínről induló **infravörös** sugárzást viszont néhány gáz elnyeli, majd minden irányba, részben **vissza a felszín felé** sugározza. Ezek az **üvegházgázok**:\n\n- **vízgőz** (H₂O) – a legerősebb, de mennyisége a hőmérséklettől függ, nem mi szabályozzuk közvetlenül,\n- **szén-dioxid** (CO₂),\n- **metán** (CH₄),\n- **dinitrogén-oxid** (N₂O, „kéjgáz”),\n- **fluortartalmú gázok** (pl. hűtőközegek).\n\nA levegő nagy részét adó nitrogén és oxigén **nem** üvegházgáz: két egyforma atomból álló molekuláik nem nyelik el az infravörös sugárzást.',
          widget: { type: 'uveghaz-modell' }
        },
        {
          title: 'Kevés, de erős: ppm és ppb',
          text: 'A szén-dioxid a levegőnek csak kb. **0,04%-a**. Ezt **ppm-ben** (milliomodrész) mérjük: 2024-ben a globális átlag **423,9 ppm** volt (WMO, 2025). Az ipari forradalom előtt kb. **280 ppm** volt, tehát kb. **52%-kal nőtt**.\n\nA metánt **ppb-ben** (milliárdodrész) mérjük: 2024-ben **1942 ppb**, ez kb. **2,7-szerese** az ipar előtti szintnek.\n\nMiért számít ilyen kevés gáz? Mert a felszín hősugárzásának bizonyos hullámhosszain a CO₂ szinte teljesen **átlátszatlan**. Több CO₂ esetén a hő a légkör **magasabb, hidegebb** rétegeiből tud csak kijutni, a hideg réteg pedig kevesebbet sugároz. A bolygó így „kevesebbet ad le, mint amennyit kap”, és melegszik.',
          tip: 'A gázok erejét a **GWP** (globális felmelegítő potenciál) hasonlítja össze: 100 évre a metáné kb. **28–30**, a dinitrogén-oxidé kb. **270**. A hűtőközegekről a [[#/lecke/hoszivattyu/hutokozegek|hőszivattyús leckében]] van több.'
        },
        {
          title: 'Visszacsatolások: erősítők a rendszerben',
          text: 'A kezdeti melegedést a rendszer **felerősíti**:\n\n- **Vízgőz:** melegebb levegő több vízgőzt tud tartani, a vízgőz pedig maga is üvegházgáz. Ez a legerősebb erősítő.\n- **Jég–albedó:** ha olvad a fehér jég, sötétebb víz vagy talaj kerül elő, ez több napfényt nyel el, tovább melegszik.\n- **Felhők:** bonyolultak, egyes típusaik hűtenek, mások melegítenek; összességében valószínűleg kissé erősítenek.\n\nVan **gyengítő** visszacsatolás is: a melegebb Föld többet sugároz ki (ez stabilizál). Ezért nem „szalad el” a melegedés, hanem minden CO₂-szinthez tartozik egy új, magasabb egyensúlyi hőmérséklet.'
        }
      ],
      quiz: [
        { q: 'Kb. mennyi lenne a Föld átlaghőmérséklete üvegházhatás nélkül?', options: ['+15 °C', '−18 °C', '0 °C', '−60 °C'], answer: 1, explain: 'A sugárzási egyensúlyból kb. −18 °C adódik. A természetes üvegházhatás emeli kb. +15 °C-ra.' },
        { q: 'Melyik sugárzást nyelik el az üvegházgázok erősen?', options: ['A látható napfényt', 'A rádióhullámokat', 'A felszín infravörös hősugárzását', 'A röntgensugárzást'], answer: 2, explain: 'A napfény nagy része átjut, a felszín infravörös kisugárzását viszont a CO₂, a vízgőz és a metán elnyeli.' },
        { q: 'Miért nem üvegházgáz a nitrogén (N₂)?', options: ['Mert túl kevés van belőle', 'Mert két egyforma atomból álló molekulája nem nyeli el az infravöröst', 'Mert nehezebb a levegőnél', 'Mert színes'], answer: 1, explain: 'A kétatomos, egyforma atomokból álló molekulák (N₂, O₂) rezgése nem kelt elektromos dipólusváltozást, ezért nem nyelik el a hősugárzást.' },
        { q: 'Mit jelent a jég–albedó visszacsatolás?', options: ['A jég hűti a tengert', 'Olvadáskor sötétebb felszín kerül elő, ami több fényt nyel el, és ez tovább melegít', 'A jég elnyeli a CO₂-t', 'A hó növeli a csapadékot'], answer: 1, explain: 'A fehér jég sok fényt ver vissza. Ha elolvad, a sötétebb víz vagy talaj több energiát nyel el, ez erősíti a melegedést.' }
      ]
    },
    /* ---------------------------------------------------------------- 2 */
    {
      id: 'szenkorforgas',
      title: 'A szén körforgása',
      level: 1, minutes: 12,
      summary: 'Honnan jön és hová tűnik a szén? Gyors és lassú körforgás, óceán, erdő, fosszilis tüzelőanyagok.',
      tags: ['szén-körforgás', 'fotoszintézis', 'légzés', 'fosszilis tüzelőanyag', 'óceán', 'savasodás', 'erdő', 'szénnyelő', 'tőzeg', 'permafroszt'],
      sections: [
        {
          title: 'A szén vándorol',
          text: 'A szénatomok folyamatosan cserélnek „lakóhelyet” a **légkör**, a **növények és talaj**, az **óceán** és a **kőzetek** között. Ezeket a tárolókat **szénraktáraknak** hívjuk.\n\n- **Gyors körforgás** (évek–évszázadok): a növények **fotoszintézissel** CO₂-t vesznek fel, az élőlények **légzéssel** és bomlással visszaadják. Az óceán felszíne folyamatosan cserél CO₂-t a levegővel.\n- **Lassú körforgás** (évmilliók): az elhalt élőlények egy része betemetődik, és **szénné, kőolajjá, földgázzá** alakul; a mészkőben is rengeteg szén van. Vulkánok és mállás mozgatja.\n\nA fotoszintézisről a [[#/lecke/termeszet/novenyek|A növények élete]] leckében tanultál.',
          tip: 'A légköri CO₂-görbe minden évben „lélegzik”: északi tavasszal–nyáron a sok levél miatt csökken, ősszel–télen nő. Ez a fűrészfog a mérési görbéken.'
        },
        {
          title: 'Az ember belenyúl: évmilliók szene néhány évtized alatt',
          text: 'A fosszilis tüzelőanyagok égetésével olyan szenet juttatunk a levegőbe, amelyet a lassú körforgás **évmilliók alatt** zárt el. 2025-ben a fosszilis eredetű kibocsátás kb. **38,1 milliárd tonna CO₂** volt, a földhasználattal (főleg erdőirtással) együtt kb. **42 milliárd tonna** (Global Carbon Budget 2025, becslés).\n\nHová kerül? Nagyjából:\n\n- kb. **fele** a **légkörben** marad (évszázadokig),\n- kb. **negyede** az **óceánba** oldódik,\n- kb. **negyede–harmada** a **szárazföldi növényzetbe és talajba** kerül.\n\nA természet tehát „segít”, de nem tudja az egészet elnyelni. A forró, aszályos években (pl. 2024) a szárazföld kevesebbet nyelt el, ezért nőtt rekordot a CO₂-szint: **+3,5 ppm** egy év alatt (WMO).'
        },
        {
          title: 'Az óceán savasodik',
          text: 'Az óceánba oldódó CO₂ **szénsavvá** alakul, ezért a tengervíz **pH-ja** az ipar előtti kb. **8,2-ről kb. 8,1-re** csökkent. Ez kicsinek tűnik, de a pH-skála logaritmikus: kb. **30%-kal több** hidrogénion van a vízben.\n\nA savasabb víz megnehezíti a **mészvázas** élőlények (korallok, kagylók, egyes planktonok) vázépítését. A savakról és a pH-ról a [[#/lecke/kemia/savak-bazisok|kémia leckében]] olvashatsz.'
        },
        {
          title: 'Erdők, talaj, tőzeg, fagyott talaj',
          text: '- Az **erdők** nagy szénraktárak, de csak akkor nyelnek el nettó szenet, ha **nőnek**. Az erdőtűz vagy az irtás felszabadítja a szenet.\n- A **talaj** több szenet tárol, mint a növényzet és a légkör együtt. A szántás, a lecsapolás, a kiszáradás csökkentheti.\n- A **lápok és a tőzeg** kis területen óriási szénmennyiséget őriznek.\n- Az északi **permafroszt** (örökké fagyott talaj) is sok szenet tárol. Ha kiolvad, CO₂ és metán szabadulhat fel: ez egy újabb erősítő visszacsatolás.\n\nA szénraktárak megőrzése ezért ugyanolyan fontos, mint a kibocsátás csökkentése.'
        }
      ],
      quiz: [
        { q: 'Nagyjából mekkora része marad a légkörben az ember által kibocsátott CO₂-nek?', options: ['Kb. 5%', 'Kb. a fele', 'Az egész', 'Semennyi, mert a fák elnyelik'], answer: 1, explain: 'Kb. fele marad a légkörben, a többit az óceán és a szárazföldi növényzet nyeli el.' },
        { q: 'Mi okozza az óceánok savasodását?', options: ['A műanyag', 'A sós víz párolgása', 'A vízben oldódó CO₂ szénsavvá alakul', 'Az olajszennyezés'], answer: 2, explain: 'A CO₂ a vízben szénsavat képez, ez csökkenti a pH-t (kb. 8,2-ről 8,1-re).' },
        { q: 'Miért „lélegzik” a CO₂-görbe évente?', options: ['A nyári turizmus miatt', 'Az északi félteke növényzete nyáron több CO₂-t vesz fel', 'Mert télen kevesebbet fűtünk', 'A Hold járása miatt'], answer: 1, explain: 'Az északi féltekén van a szárazföldek többsége: tavasszal–nyáron a fotoszintézis csökkenti, ősszel–télen a bomlás növeli a CO₂-t.' }
      ]
    },
    /* ---------------------------------------------------------------- 3 */
    {
      id: 'bizonyitekok',
      title: 'Mérések és bizonyítékok',
      level: 2, minutes: 14,
      summary: 'Hőmérsékleti sorok, a Keeling-görbe, jégmagok és műholdak: honnan tudjuk, hogy melegszik, és hogy mi okozzuk?',
      tags: ['hőmérsékleti sor', 'Keeling-görbe', 'Mauna Loa', 'jégmag', 'proxy', 'tengerszint', 'Copernicus', 'WMO', 'IPCC', 'izotóp', 'tudományos konszenzus'],
      sections: [
        {
          title: 'A hőmérő nem hazudik: globális hőmérsékleti sorok',
          text: 'A globális átlaghőmérsékletet több független csoport számolja (pl. NASA, NOAA, a brit Met Office, a japán JMA és az EU **Copernicus** szolgálata) szárazföldi állomások, hajók, bóják és műholdak adataiból. Az eredményeik nagyon közel esnek egymáshoz.\n\nA viszonyítási alap az **1850–1900** közötti átlag („ipar előtti szint”). Az IPCC szerint a 2011–2020-as évtized kb. **1,1 °C**-kal volt melegebb ennél.\n\nFrissebb adatok (Copernicus):\n\n- **2024**: a legmelegebb mért év, kb. **+1,60 °C**,\n- **2025**: a harmadik legmelegebb, kb. **+1,47 °C**; a 2023–2025-ös három év átlaga először haladta meg az 1,5 °C-ot,\n- **2026**: 2026 októbere a legmelegebb mért október volt (kb. **+1,75 °C**), egy erős El Niño mellett; a Copernicus szerint 2026 szinte biztosan 1,5 °C fölött zárul.',
          warn: 'Egyetlen év 1,5 °C fölött még **nem** jelenti a párizsi cél „átlépését": az a **húszéves átlagra** vonatkozik. A hosszú távú, emberi eredetű melegedés 2025-ben kb. **1,37 °C** volt (Indicators of Global Climate Change, 2025).'
        },
        {
          title: 'A Keeling-görbe',
          text: '**Charles David Keeling** 1958-ban kezdte mérni a CO₂-t a hawaii **Mauna Loa** vulkán oldalán, távol a városoktól. Ez a leghosszabb közvetlen CO₂-mérési sor. A görbe:\n\n- minden évben **fűrészfogat** rajzol (a növényzet „lélegzése”),\n- és **folyamatosan emelkedik**: 1958-ban kb. **315 ppm**, ma több mint **420 ppm**.\n\nA növekedés üteme is gyorsult: az 1960-as években évi kb. **0,8 ppm**, 2011–2020 között átlagosan **2,4 ppm**, 2023→2024 között rekord **3,5 ppm** (WMO, 2025).'
        },
        {
          title: 'Jégmagok: 800 000 év levegője',
          text: 'Az Antarktisz jégtakarójában a hó évről évre összepréselődik, és apró **légbuborékokat** zár be. A kifúrt **jégmagokból** megmérhető a régi levegő összetétele, a jég **izotóparányaiból** pedig a korabeli hőmérséklet.\n\nA jégmagok kb. **800 000 évre** visszamenőleg mutatják:\n\n- a CO₂ a jégkorszakokban kb. **180 ppm**, a meleg időszakokban kb. **280–300 ppm** volt,\n- a CO₂ és a hőmérséklet **együtt** változott,\n- a mai **420 ppm fölötti** érték messze kívül esik ezen a tartományon.\n\nA régi éghajlatot más **közvetett jelzők** (proxyk) is mutatják: fák évgyűrűi, cseppkövek, tavi üledékek, korallok.',
          tip: 'A jégkorszakok fő ritmusát a Föld pályájának lassú változásai (Milanković-ciklusok) adták, a CO₂ ezt erősítette. Ma fordítva van: a CO₂ az elsődleges ok.'
        },
        {
          title: 'Honnan tudjuk, hogy az ember az oka?',
          text: 'Több, egymástól független bizonyíték mutat ugyanarra:\n\n- **Ujjlenyomat a szénben:** a fosszilis szénben kevés a nehéz C-13 izotóp, és egyáltalán nincs C-14. A légköri CO₂-ben pont így változik az arány.\n- **Fogy az oxigén** a levegőben, pontosan annyival, amennyit az égés elhasznál.\n- **A Nap nem erősödött:** a napsugárzás 1980 óta nem nőtt, sőt kissé csökkent.\n- **A sztratoszféra hűl, miközben a felszín melegszik.** Ha a Nap melegítene, mindkettő melegedne; az üvegházhatás erősödése pont ezt a mintázatot okozza.\n- **Az éjszakák és a telek gyorsabban melegszenek**, ami szintén az üvegházhatásra jellemző.\n\nAz IPCC 2021-es jelentése szerint **„egyértelmű”**, hogy az emberi tevékenység melegítette fel a légkört, az óceánt és a szárazföldet.'
        },
        {
          title: 'Tenger, jég, óceánhő',
          text: '- **Tengerszint:** 1901 és 2018 között kb. **20 cm**-t emelkedett (IPCC AR6). Az emelkedés gyorsul: 1993–2011 között évi kb. **2,7 mm**, 2012–2025 között évi kb. **4,75 mm** (WMO, 2026).\n- **Óceánhő:** a többlethő több mint **90%-a** az óceánba kerül; az óceán hőtartalma 2025-ben a mérések óta a legmagasabb volt.\n- **Gleccserek:** a referencia-gleccserek a 2024/25-ös évben is nagyon sokat vesztettek, kb. **450 milliárd tonna** jeget (WGMS, WMO).\n\nA tengerszint két okból nő: a melegedő víz **kitágul**, és a szárazföldi **jég olvad**. A tengeri jég (pl. az Északi-sarki jégtakaró) olvadása nem emeli a tengerszintet, mert az már úszik.'
        }
      ],
      quiz: [
        { q: 'Melyik időszakhoz viszonyítjuk az „ipar előtti” hőmérsékletet?', options: ['1850–1900', '1961–1990', '1991–2020', '2000–2010'], answer: 0, explain: 'Az IPCC és a Párizsi Megállapodás az 1850–1900 közötti átlagot használja.' },
        { q: 'Mit mutat a jégmagokba zárt levegő?', options: ['A régi széljárást', 'A régi légkör összetételét, pl. a CO₂-szintet', 'A régi napfoltokat', 'A régi tengerszintet'], answer: 1, explain: 'A buborékok a régi levegő mintái; 800 000 évre visszamenőleg kimutatják a CO₂-t és a metánt.' },
        { q: 'Melyik bizonyítja, hogy nem a Nap okozza a mai melegedést?', options: ['A tengerszint emelkedése', 'Hogy a sztratoszféra hűl, miközben a felszín melegszik', 'Hogy több a felhő', 'Hogy nyáron meleg van'], answer: 1, explain: 'Erősebb Nap mindkét réteget melegítené. Az erősödő üvegházhatás a felszínt melegíti, a felső légkört hűti.' },
        { q: 'Mi történt 2025-ben a Copernicus szerint?', options: ['A legmelegebb év volt', 'A harmadik legmelegebb év volt, kb. +1,47 °C-kal', 'Hidegebb volt az ipar előtti szintnél', 'Pontosan +1,0 °C volt'], answer: 1, explain: '2025 kb. 1,47 °C-kal volt melegebb az 1850–1900-as átlagnál, 2024 és 2023 mögött a harmadik.' }
      ]
    },
    /* ---------------------------------------------------------------- 4 */
    {
      id: 'hatasok',
      title: 'A klímaváltozás hatásai – a világban és itthon',
      level: 2, minutes: 14,
      summary: 'Hőhullámok, aszály, szélsőséges csapadék, tengerszint – és mit jelent ez Magyarországon: mezőgazdaság, Balaton, egészség.',
      tags: ['hőhullám', 'aszály', 'szélsőséges időjárás', 'tengerszint-emelkedés', 'Balaton', 'HungaroMet', 'hőségriasztás', 'mezőgazdaság', 'Duna', 'billenőpont'],
      sections: [
        {
          title: 'Kis átlag, nagy szélsőségek',
          text: 'Másfél fok átlagosan kevésnek tűnik, hiszen egy nap alatt is ennél többet változik a hőmérséklet. Csakhogy az **átlag** eltolódásával a **szélsőségek** sokkal gyakoribbá válnak.\n\nAz IPCC szerint az a **hőség**, amely az ipar előtti éghajlatban **ötvenévente egyszer** fordult elő, mai, kb. 1,1 °C-kal melegebb világunkban már kb. **ötször gyakoribb**, 2 °C-nál kb. **14-szer**.\n\nA melegebb levegő több vizet tud tartani (fokonként kb. **7%-kal** többet), ezért gyakoribbak a **heves esőzések** is, miközben más helyeken és évszakokban erősödik az **aszály**.'
        },
        {
          title: 'Magyarország: melegebb, szárazabb nyarak',
          text: 'Magyarország gyorsabban melegszik, mint a globális átlag, mert a szárazföldek gyorsabban melegszenek az óceánoknál. A **HungaroMet** adatai szerint:\n\n- **2024** volt a legmelegebb év 1901 óta: az országos középhőmérséklet **12,94 °C**, ami **2,16 °C**-kal magasabb az 1991–2020-as átlagnál; 2024 nyara és tele is rekordmeleg volt,\n- **2025** a hetedik legmelegebb (11,78 °C) és a negyedik legszárazabb év volt 1901 óta,\n- a hazai tíz legmelegebb év között **nincs egyetlen 2000 előtti** sem.\n\nAz **aszály** egyre gyakoribb: 2022-ben és 2024-ben is az ország nagy részét sújtotta (2024-ben a terület kb. kétharmadán volt súlyos vagy nagyfokú aszály). A Duna–Tisza közén, a **Homokhátságon** a talajvíz évtizedek óta süllyed. A földrajzi háttérhez lásd: [[#/lecke/foldrajz/magyarorszag|Magyarország földrajza]].'
        },
        {
          title: 'A Balaton',
          text: 'A Balaton **sekély** (átlagosan kb. 3 m mély), ezért gyorsan követi a levegő hőmérsékletét.\n\n- A víz **melegszik**: 2022 nyarán Siófoknál **30,2 °C**-os vízhőmérsékletet mértek.\n- A **párolgás** a forró, aszályos nyarakon nagy; ha kevés a csapadék, a vízszint esik. 2026 júliusában az átlagos vízállás kb. **64 cm** volt (a szabályozási tartomány felső része 110 cm körül van), a történelmi mélypont 2003-ban volt.\n- A meleg víz kedvez az **algásodásnak** és egyes idegenhonos fajoknak, a halak számára pedig csökken az oldott oxigén.\n\nA Balaton nem „szárad ki” egyik napról a másikra, de az alkalmazkodás (vízpótlás, vízgazdálkodás, a part menti élőhelyek védelme) egyre fontosabb.'
        },
        {
          title: 'Egészség, mezőgazdaság, gazdaság',
          text: '- **Hőség és egészség:** a hőhullámok főleg az **időseket**, a **krónikus betegeket** és a **kisgyerekeket** veszélyeztetik. Magyarországon az országos tisztifőorvos **hőségriasztást** rendel el; ilyenkor hűvös helyiségek, ivóvízpontok működnek.\n- **Mezőgazdaság:** az aszály a kukorica és a napraforgó termését erősen csökkentheti; a tavaszi fagyok a korábban kihajtó gyümölcsfákat veszélyeztetik.\n- **Új kártevők és betegségek:** a melegebb telek kedveznek pl. a **kullancsoknak**, a **szúnyogoknak** (köztük az ázsiai tigrisszúnyognak) és a **parlagfűnek** (hosszabb pollenszezon).\n- **Villamosenergia:** a nyári hőség miatt a légkondicionálás új fogyasztási csúcsokat okoz, a melegebb Duna-víz pedig a **paksi atomerőmű hűtését** is korlátozhatja.'
        },
        {
          title: 'Billenőpontok – röviden, pánik nélkül',
          text: 'Egyes rendszerek egy határ átlépése után **nehezen visszafordítható** állapotba kerülhetnek: pl. a **grönlandi** és **nyugat-antarktiszi jégtakaró** olvadása, a **korallzátonyok** pusztulása vagy a **permafroszt** kiolvadása. A pontos küszöböket nem ismerjük, de a kockázat a melegedéssel nő.\n\nA lényeg: **minden tized fok számít**. Nincs olyan pont, ahol „már mindegy” – a 1,7 °C jobb, mint a 1,8 °C, és a 2 °C sokkal jobb, mint a 3 °C.'
        }
      ],
      quiz: [
        { q: 'Melyik volt Magyarország legmelegebb éve 1901 óta (a HungaroMet szerint)?', options: ['2003', '2015', '2024', '1950'], answer: 2, explain: '2024 országos középhőmérséklete 12,94 °C volt, 2,16 °C-kal az 1991–2020-as átlag fölött.' },
        { q: 'Miért gyakoribbak a heves esőzések melegebb éghajlatban?', options: ['Mert több a felhő a sarkokon', 'Mert a melegebb levegő több vízgőzt tud tartani', 'Mert erősebb a gravitáció', 'Mert kevesebb a szél'], answer: 1, explain: 'Fokonként kb. 7%-kal több vízgőz fér a levegőbe, ami heves zivatarokban egyszerre hullhat le.' },
        { q: 'Miért reagál gyorsan a Balaton a melegedésre?', options: ['Mert sós', 'Mert sekély', 'Mert a Duna táplálja', 'Mert hegyek veszik körül'], answer: 1, explain: 'Átlagosan kb. 3 m mély, kevés vízzel, így gyorsan felmelegszik, és sokat párolog.' }
      ]
    },
    /* ---------------------------------------------------------------- 5 */
    {
      id: 'energia',
      title: 'Energiatermelés és kibocsátás',
      level: 2, minutes: 16,
      summary: 'Honnan jön az áram Magyarországon, mennyi CO₂-vel jár egy kilowattóra, és miért nehéz este és télen?',
      tags: ['villamosenergia', 'energiamix', 'Paks', 'naperőmű', 'földgáz', 'import', 'kibocsátási tényező', 'g CO₂/kWh', 'tárolás', 'csúcsterhelés', 'MAVIR'],
      sections: [
        {
          title: 'Honnan jön a világ kibocsátása?',
          text: 'Globálisan az üvegházgáz-kibocsátás kb. **háromnegyede** az **energiából** származik: áramtermelés és hőtermelés, közlekedés, ipar, épületek fűtése. A többi a **mezőgazdaságból és földhasználatból** (pl. szarvasmarha-tartás metánja, műtrágya, erdőirtás), az **ipari folyamatokból** (pl. cementgyártás) és a **hulladékból** jön.\n\nMagyarországon az összes kibocsátás 2023-ban kb. **54 millió tonna CO₂-egyenérték** volt (EEA), ez **43%-kal kevesebb**, mint 1990-ben. Egy főre ez kb. **5,5–6 tonna** (a számítási módtól függően), kevesebb az uniós átlagnál.'
        },
        {
          title: 'Mennyi CO₂ egy kilowattóra?',
          text: 'A teljes életciklusra (építés, üzemanyag, üzem, bontás) vetítve egy kWh áram kibocsátása az IPCC összegzése szerint nagyjából (mediánértékek, g CO₂e/kWh):\n\n- **szén**: kb. **820**,\n- **földgáz** (kombinált ciklus): kb. **490**,\n- **napelem**: kb. **40–50**,\n- **vízerőmű**: kb. **24**,\n- **atomerőmű**: kb. **12**,\n- **szél**: kb. **11**.\n\nA fosszilis erőművek tehát **10–70-szer** többet bocsátanak ki egy kWh-ra, mint az alacsony kibocsátású források. Egy ország áramának „kibocsátási intenzitása” attól függ, milyen keverékből (**energiamixből**) termeli.'
        },
        {
          title: 'A magyar villamosenergia-rendszer',
          text: 'Néhány fontos szám (gyorsan változik, ezért évszámmal):\n\n- **Bruttó felhasználás** 2025-ben kb. **44,6 TWh**; ennek kb. **20%-a import** volt (MAVIR, 2026. jan.).\n- **Paksi atomerőmű:** 4 blokk, kb. **2000 MW**, a hazai termelés kb. **40–45%-a**. Éjjel-nappal egyenletesen termel.\n- **Napenergia:** a beépített teljesítmény (háztartásiakkal együtt) a 2025-ös évben **8 GW körül** volt; a hazai termelés kb. **28%-át** adta 2025-ben – ez az **EU-ban a legmagasabb arány** (Ember, 2026).\n- **Földgáz:** rugalmasan szabályozható erőművek, főleg este és télen.\n- **Szél:** kb. **330 MW**, alig változott 2011 óta. **Víz:** kevés, kb. 60 MW.\n- **Csúcsterhelés:** téli munkanapokon (reggel és késő délután–este); 2025 januárjában **7663 MW**, 2026 januárjában (előzetes adat) kb. **7850 MW**. Egyre nagyobbak a **nyári** csúcsok is (légkondik).\n\nA **gond**: a napelem este és éjjel nem termel, télen pedig keveset. 2025-ben kb. **1800 negyedórában** gyakorlatilag nulla volt a nap- és szélenergia együtt; ilyenkor Paks, a gázerőművek és az import tartja a rendszert.',
          widget: { type: 'energiamix' }
        },
        {
          title: 'Tárolás és rugalmasság',
          text: 'A napos déli órákban sokszor **több áram** van, mint amennyi kell (ilyenkor az ár akár negatív is lehet), este pedig **kevesebb**. A megoldások:\n\n- **akkumulátoros tárolók** (pár órára: délben töltenek, este adnak),\n- **rugalmas fogyasztás** (pl. villanyautó töltése, hőszivattyú, vízmelegítő a déli órákban),\n- **jobb hálózat és összeköttetések** a szomszédos országokkal,\n- szabályozható, alacsony kibocsátású erőművek.\n\nA napelem működéséről és a hálózatra táplálásról a [[#/lecke/napelem/rendszerek|Napelemes rendszerek]] tantárgyban olvashatsz részletesen.',
          tip: 'Ne keverd: a **kW** (teljesítmény) azt mondja meg, **milyen gyorsan** termel vagy fogyaszt valami, a **kWh** (energia) azt, **mennyit** összesen. Lásd: [[#/lecke/haztartas/energiatakarekossag|Watt és kilowattóra]].'
        }
      ],
      quiz: [
        { q: 'Kb. mekkora a földgázerőmű életciklus-kibocsátása kWh-nként?', options: ['Kb. 12 g', 'Kb. 490 g', 'Kb. 2000 g', 'Kb. 50 g'], answer: 1, explain: 'Az IPCC összegzése szerint a kombinált ciklusú gázerőmű mediánja kb. 490 g CO₂e/kWh, a széné kb. 820.' },
        { q: 'Miért nehéz a magyar rendszernek a téli este?', options: ['Mert akkor a legolcsóbb az áram', 'Mert akkor nagy a fogyasztás, a napelem pedig nem termel', 'Mert Paks este leáll', 'Mert ilyenkor tilos az import'], answer: 1, explain: 'A csúcsterhelés téli estéken van, amikor nincs napfény; ilyenkor Paks, a gáz és az import tartja a rendszert.' },
        { q: 'Mekkora volt a napenergia aránya a hazai áramtermelésben 2025-ben (Ember)?', options: ['Kb. 3%', 'Kb. 28%', 'Kb. 75%', 'Kb. 50%'], answer: 1, explain: 'Kb. 28%, ami az EU-ban a legmagasabb arány volt.' }
      ]
    },
    /* ---------------------------------------------------------------- 6 */
    {
      id: 'megoldasok',
      title: 'Megoldások: megújulók, hatékonyság, közlekedés, élelmiszer',
      level: 2, minutes: 15,
      summary: 'Melyik eszköz mennyit ér? Tiszta áram, villamosítás, hatékonyság, közlekedés, élelmiszer és a szénraktárak védelme.',
      tags: ['megújuló energia', 'villamosítás', 'energiahatékonyság', 'hőszivattyú', 'villanyautó', 'tömegközlekedés', 'élelmiszer', 'metán', 'Párizsi Megállapodás', 'klímasemlegesség', 'karbonsemleges'],
      sections: [
        {
          title: 'A célok',
          text: '- **Párizsi Megállapodás (2015):** a melegedést „jóval 2 °C alatt” kell tartani, és törekedni kell az **1,5 °C**-ra.\n- Ehhez a globális CO₂-kibocsátást kb. **2050 körül nettó nullára** kell csökkenteni (1,5 °C-hoz), 2 °C-hoz kb. 2070 körül.\n- **EU:** 2030-ig **−55%** (1990-hez képest), 2040-ig **−90%** (a módosított európai klímatörvény, 2026), 2050-re **klímasemlegesség**.\n- **Magyarország:** a 2020. évi klímavédelmi törvény szerint 2050-re klímasemlegesség.\n\nA **nettó nulla** azt jelenti, hogy amennyit kibocsátunk, annyit el is távolítunk (pl. erdőkkel vagy technológiával).'
        },
        {
          title: 'Tiszta áram, és minél több dolog árammal',
          text: 'A legfontosabb stratégia két lépés:\n\n1. **Tisztítsuk meg az áramot:** nap, szél, víz, atom; a szén és a gáz kiváltása. A **nap- és szélenergia** ára 2010 óta a töredékére (napelemnél kb. tizedére) csökkent, ma sok helyen a legolcsóbb új áramforrás.\n2. **Villamosítsunk:** ami ma olajjal vagy gázzal megy, menjen árammal, mert az **hatékonyabb**:\n\n- a **hőszivattyú** 1 kWh áramból kb. **3–4 kWh** hőt ad (lásd [[#/lecke/hoszivattyu/cop|COP]]),\n- a **villanyautó** az akku energiájának kb. 85–90%-át mozgásra fordítja, a benzinmotor csak kb. 25–30%-át (lásd [[#/lecke/elektromos-auto/mukodes|Hogyan működik egy villanyautó?]]).\n\nMagyarországon egy villanyautó a teljes életciklusában – a hazai áramkeverékkel számolva – jóval kevesebb CO₂-vel jár, mint egy benzines, pedig a gyártása (főleg az akkumulátor) több kibocsátással jár.'
        },
        {
          title: 'Hatékonyság: a legolcsóbb energia, amit nem használunk el',
          text: '- **Épületek:** egy régi, szigeteletlen családi ház akár 2–3-szor annyi energiát fűt el, mint egy jól szigetelt. Hőszigetelés, nyílászárócsere, okos fűtésszabályozás.\n- **Ipar:** hatékonyabb motorok, hulladékhő hasznosítása.\n- **Háztartás:** LED-világítás, jó energiaosztályú gépek, 1 °C-kal alacsonyabb szobahőmérséklet kb. **6%** fűtési energiát takarít meg.\n\nA hatékonyság ráadásul **pénzt** is spórol.'
        },
        {
          title: 'Közlekedés és élelmiszer',
          text: '**Közlekedés:** egy utaskilométer kibocsátása nagyon különböző: a vonat és a kerékpár töredéke az egyedül vezetett benzines autónak. A legnagyobb hatású lépések: **kevesebb és rövidebb autóút**, **tömegközlekedés**, **telekocsi**, **villanyautó**, és **kevesebb repülés**.\n\n**Élelmiszer:** a világ üvegházgáz-kibocsátásának kb. **harmada** az élelmiszerrendszerből jön (termelés, földhasználat, feldolgozás, szállítás, hulladék). A legnagyobb tényező az, **mit** eszünk, nem az, honnan hozzák: egy kg **marhahús** átlagosan több tucat kg CO₂e-vel jár, míg a **hüvelyesek** (bab, lencse, borsó) csak kb. 1 kg-mal. A szállítás az élelmiszerek kibocsátásának általában csak kis része (kivéve a repülővel szállított árut).\n\n**Metán:** gyors hatású eszköz a metánszivárgás megszüntetése (gázvezetékek, bányák), a hulladéklerakók gázának befogása és a rizs- és állattartási gyakorlatok javítása.'
        },
        {
          title: 'Szénraktárak és szén-eltávolítás',
          text: '- **Erdők védelme és telepítése**, lápok helyreállítása, talajkímélő mezőgazdaság.\n- **Szén-dioxid-leválasztás és -tárolás (CCS):** egyes iparágakban (pl. cement) szükség lehet rá.\n- **Közvetlen légköri leválasztás:** ma még drága és nagyon kis léptékű.\n\nAz IPCC szerint az eltávolítás **kiegészítés**, nem helyettesítés: a kibocsátás gyors csökkentése az első.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a „nettó nulla” kibocsátás?', options: ['Senki nem bocsát ki semmit', 'Amennyit kibocsátunk, annyit el is távolítunk a légkörből', 'Csak az ipar nem bocsát ki', 'A kibocsátást áthelyezzük más országba'], answer: 1, explain: 'A maradék kibocsátást erdők, talaj vagy technológia ellensúlyozza, így a légköri mennyiség nem nő tovább.' },
        { q: 'Miért hatékonyabb a hőszivattyú a villanyfűtésnél?', options: ['Mert gázt éget', 'Mert a környezetből hőt szállít, így 1 kWh áramból 3–4 kWh hőt ad', 'Mert nincs benne kompresszor', 'Mert csak nyáron működik'], answer: 1, explain: 'A hőszivattyú nem hőt termel, hanem a levegőből, földből vagy vízből „szivattyúzza” a hőt.' },
        { q: 'Az élelmiszerek kibocsátásában általában mi számít a legtöbbet?', options: ['A szállítás távolsága', 'A csomagolás', 'Hogy mit eszünk (pl. marhahús vagy hüvelyes)', 'A bolt mérete'], answer: 2, explain: 'A termelés (állattartás, földhasználat) a meghatározó; a szállítás általában csak kis rész.' },
        { q: 'Mi az EU 2040-es célja a módosított klímatörvény szerint?', options: ['−20%', '−55%', '−90% (1990-hez képest)', 'Nincs célja'], answer: 2, explain: 'A 2026-ban elfogadott módosítás 90%-os nettó csökkentést ír elő 2040-re (legfeljebb 5% nemzetközi kreditekkel).' }
      ]
    },
    /* ---------------------------------------------------------------- 7 */
    {
      id: 'alkalmazkodas',
      title: 'Alkalmazkodás: felkészülés a változásra',
      level: 2, minutes: 11,
      summary: 'Ami már elkerülhetetlen, arra fel kell készülni: hőség, víz, városok, mezőgazdaság.',
      tags: ['alkalmazkodás', 'mérséklés', 'hősziget', 'városi zöld', 'vízmegtartás', 'öntözés', 'szárazságtűrő', 'korai figyelmeztetés', 'hőségriasztás'],
      sections: [
        {
          title: 'Mérséklés és alkalmazkodás',
          text: 'A klímapolitikának két lába van:\n\n- **Mérséklés (mitigáció):** a kibocsátás csökkentése, hogy a melegedés kisebb legyen.\n- **Alkalmazkodás (adaptáció):** felkészülés azokra a változásokra, amelyek már bekövetkeztek vagy elkerülhetetlenek.\n\nMindkettő kell: alkalmazkodni olcsóbb és könnyebb, ha a melegedés kisebb, de a mai klímára már most fel kell készülni. Az alkalmazkodásnak is vannak **határai**: 3 °C-os világban sok helyen már nem lehet megfelelően alkalmazkodni.'
        },
        {
          title: 'A városi hősziget',
          text: 'A városok nyáron, különösen **éjszaka**, több fokkal melegebbek lehetnek a környéküknél: a beton és az aszfalt napközben elnyeli, este kisugározza a hőt, kevés a növényzet és a párolgás. Ez a **városi hősziget**.\n\nMegoldások:\n\n- **fák**, parkok, zöldtetők és zöldfalak (az árnyék és a párolgás hűt),\n- **világos** színű tetők és burkolatok (nagyobb albedó),\n- vízfelületek, ivókutak, párakapuk,\n- jól szigetelt, árnyékolt épületek (redőny, zsalu – kívül hatékonyabb, mint belül).'
        },
        {
          title: 'Víz: megtartani, nem elvezetni',
          text: 'Magyarország vízgazdálkodása hosszú ideig a víz **gyors elvezetésére** épült (folyószabályozás, belvízcsatornák). Aszályos éghajlatban fordítva kell gondolkodni: a vizet **meg kell tartani a tájban**.\n\n- csapadékvíz-gyűjtés (esővízgyűjtő a háznál is),\n- vizes élőhelyek, holtágak helyreállítása, árterek visszaadása,\n- takarékos **csepegtető öntözés**,\n- a talaj **szervesanyag-tartalmának** növelése (jobban tartja a vizet),\n- **szárazságtűrő** fajták és vetésidők a mezőgazdaságban.'
        },
        {
          title: 'Egészség és figyelmeztetés',
          text: '- **Hőségriasztás** idején: igyál rendszeresen, kerüld a déli napot, figyelj az idősebb szomszédokra, rokonokra.\n- **Korai figyelmeztető rendszerek:** a HungaroMet riasztásai (zivatar, hőség, szél) életeket mentenek.\n- **Hőségtervek** a munkahelyeken és iskolákban (munkaidő-átszervezés, ivóvíz).\n\nA felkészülés gyakorlati részéről a [[#/tantargy/tulelotudas|Túlélőtudás]] tantárgyban is olvashatsz.'
        }
      ],
      quiz: [
        { q: 'Mi a különbség a mérséklés és az alkalmazkodás között?', options: ['Nincs különbség', 'A mérséklés a kibocsátás csökkentése, az alkalmazkodás felkészülés a változásra', 'Az alkalmazkodás csak az állatokra vonatkozik', 'A mérséklés a hőség elviselése'], answer: 1, explain: 'Mitigáció = kevesebb kibocsátás; adaptáció = felkészülés a már elkerülhetetlen hatásokra.' },
        { q: 'Mi csökkenti a legjobban a városi hőszigetet?', options: ['Több aszfalt', 'Fák, zöldfelületek és világos felületek', 'Sötét tetők', 'Több parkoló'], answer: 1, explain: 'Az árnyék és a növények párologtatása hűt, a világos felületek visszaverik a napfényt.' },
        { q: 'Mit jelent aszályos éghajlatban a „vízmegtartás”?', options: ['A víz minél gyorsabb elvezetését', 'A csapadék tájban tartását: vizes élőhelyek, esővízgyűjtés, jó talaj', 'Több mélyfúrású kutat', 'A Balaton lecsapolását'], answer: 1, explain: 'Ahelyett, hogy elvezetnénk, a vizet a tájban és a talajban tartjuk, így az aszály kevésbé súlyos.' }
      ]
    },
    /* ---------------------------------------------------------------- 8 */
    {
      id: 'biodiverzitas',
      title: 'Biodiverzitás: az élővilág sokfélesége',
      level: 2, minutes: 12,
      summary: 'Miért fogynak a fajok, mi köze ehhez a klímának, és miért kell a természet nekünk is?',
      tags: ['biodiverzitás', 'kihalás', 'élőhelyvesztés', 'idegenhonos faj', 'IPBES', 'Élő Bolygó Index', 'beporzók', 'ökoszisztéma-szolgáltatás', 'Natura 2000', 'nemzeti park'],
      sections: [
        {
          title: 'Mi a biodiverzitás?',
          text: 'A **biológiai sokféleség** három szinten értelmezhető:\n\n- **genetikai** sokféleség (egy fajon belül),\n- **fajok** sokfélesége,\n- **élőhelyek és ökoszisztémák** sokfélesége.\n\nA természet **„szolgáltatásokat”** nyújt: beporzás (a termesztett növények jelentős része rovarbeporzástól függ), tiszta víz, termékeny talaj, árvízvédelem, szénmegkötés, gyógyszer-alapanyagok. Az ökológiai alapokról a [[#/lecke/biologia/evolucio-okologia|Evolúció és ökológia]] lecke szól.'
        },
        {
          title: 'Mennyire nagy a baj?',
          text: '- Az **IPBES** (a „biodiverzitás IPCC-je”) 2019-es jelentése szerint kb. **1 millió** állat- és növényfajt fenyeget kihalás, sokat közülük évtizedeken belül.\n- A WWF **Élő Bolygó Indexe** (2024) szerint a megfigyelt gerinces állománycsoportok mérete 1970 óta átlagosan **73%-kal** csökkent. (Ez nem azt jelenti, hogy az állatok 73%-a eltűnt, hanem a követett állományok átlagos változását.)\n\nA fő okok fontossági sorrendben nagyjából:\n\n1. **élőhelyvesztés** (földhasználat, főleg mezőgazdaság),\n2. **túlhasználat** (halászat, vadászat),\n3. **klímaváltozás**,\n4. **szennyezés** (növényvédő szerek, műtrágya, műanyag),\n5. **idegenhonos inváziós fajok**.'
        },
        {
          title: 'Klíma és élővilág',
          text: 'A melegedés miatt a fajok elterjedése **észak felé és felfelé** tolódik, a tavasz korábban kezdődik. Ha a virágzás és a beporzó rovarok vagy a fiókák kelése és a táplálékul szolgáló hernyók megjelenése **elcsúszik egymástól**, az egész tápláléklánc szenved.\n\nA **korallzátonyok** különösen érzékenyek: a túl meleg víz **kifehéredést** okoz. 1,5 °C-on az IPCC szerint a meleg vízi korallok **70–90%-a**, 2 °C-on több mint 99%-a eltűnhet.\n\nFordítva is igaz: a **természet védelme klímavédelem** is, mert az erdők, lápok, gyepek és tengeri élőhelyek szenet kötnek meg.'
        },
        {
          title: 'Itthon',
          text: 'Magyarország természeti kincsei közé tartoznak a **szikes puszták**, a **homoki gyepek**, a **láprétek**, a hegyvidéki erdők és a nagy folyók ártere. Védelmüket a **10 nemzeti park** és a **Natura 2000** hálózat szolgálja.\n\nVeszélyeztető tényezők: az aszály és a talajvízszint süllyedése, az élőhelyek feldarabolódása, és az **inváziós fajok** (pl. selyemkóró, bálványfa, akác terjedése természetes élőhelyeken, a halaknál a kínai razbóra).\n\nAmit te tehetsz: őshonos növények a kertben, „rovarbarát” fűnyírás (nem kell mindent tövig nyírni), madárodú, és ne engedj szabadon kedvtelésből tartott állatot (pl. teknőst) a természetbe.'
        }
      ],
      quiz: [
        { q: 'Mi a biodiverzitás-csökkenés legfőbb oka világszerte?', options: ['A vulkánok', 'Az élőhelyvesztés (földhasználat)', 'A napfoltok', 'A városi galambok'], answer: 1, explain: 'Az IPBES szerint a földhasználat változása (főleg a mezőgazdaság terjeszkedése) a vezető ok.' },
        { q: 'Mit jelent az Élő Bolygó Index 73%-os csökkenése?', options: ['Az állatok 73%-a kihalt', 'A követett gerinces állományok mérete átlagosan 73%-kal csökkent 1970 óta', '73 faj halt ki', 'A növények 73%-a eltűnt'], answer: 1, explain: 'Az index az állományok átlagos változását méri, nem az összes állat számát.' },
        { q: 'Mi történik a korallokkal túl meleg vízben?', options: ['Gyorsabban nőnek', 'Kifehérednek, és elpusztulhatnak', 'Átváltoznak halakká', 'Semmi'], answer: 1, explain: 'Hőstressz esetén kiűzik a velük együtt élő algákat, kifehérednek, és tartós hőségben elpusztulnak.' }
      ]
    },
    /* ---------------------------------------------------------------- 9 */
    {
      id: 'hulladek',
      title: 'Hulladék és körforgásos gazdaság',
      level: 1, minutes: 11,
      summary: 'Csökkentés, újrahasználat, újrahasznosítás – és miért nem a szelektív kuka az első lépés.',
      tags: ['hulladék', 'hulladékhierarchia', 'körforgásos gazdaság', 'újrahasznosítás', 'betétdíj', 'REpont', 'MOHU', 'komposzt', 'élelmiszer-hulladék', 'műanyag', 'javítás'],
      sections: [
        {
          title: 'Egyenes vonal vagy kör?',
          text: 'A hagyományos **lineáris** gazdaság: kitermel → gyárt → használ → kidob. A **körforgásos gazdaság** célja, hogy a termékek és anyagok **minél tovább** használatban maradjanak, és a végén újra nyersanyaggá váljanak.\n\nA **hulladékhierarchia** sorrendje (az EU-ban is így szerepel):\n\n1. **Megelőzés** – ne keletkezzen (ne vedd meg, ha nem kell; tartós termék).\n2. **Újrahasználat** – javítás, második kéz, kölcsönzés.\n3. **Újrahasznosítás** – anyagában (papír, fém, üveg, műanyag) és komposztálás.\n4. **Energetikai hasznosítás** – égetés energiatermeléssel.\n5. **Lerakás** – a legrosszabb megoldás.'
        },
        {
          title: 'Mennyit számít a klímának?',
          text: 'A hulladékszektor (főleg a **lerakók metánja**) a kibocsátás kb. **3–4%-át** adja. A termékek **gyártása** viszont sokkal több energiát és anyagot igényel; ezért egy tárgy **tovább használata** sokkal többet ér, mint a gondos szelektálás.\n\n- Egy okostelefon gyártása kb. **50–80 kg CO₂e**: ha 2 helyett 4 évig használod, majdnem a felét spórolod meg.\n- Egy farmernadrág gyártása több tíz kg CO₂e-vel és sok ezer liter vízzel jár.\n- Az **alumínium** újrahasznosítása kb. **95%-kal** kevesebb energiát igényel, mint az előállítása bauxitból.'
        },
        {
          title: 'A magyar rendszer',
          text: '- **Betétdíj (REpont):** 2024. január 1. óta Magyarországon a műanyag és fém italcsomagolások (0,1–3 literes) és egyes üvegek után **50 Ft** betétdíj jár, amit a visszaváltó automatákban kapsz vissza.\n- **MOHU:** 2023 júliusától a MOHU MOL Hulladékgazdálkodás Zrt. a hulladékgazdálkodás koncessziós szolgáltatója.\n- **Szelektív gyűjtés:** sárga kuka (műanyag, fém, papír – a helyi szabálytól függően), üveg a gyűjtőszigetre, a zöldhulladék komposztálható.\n- **EU-célok:** a települési hulladék **65%-át** újra kell hasznosítani 2035-re, és legfeljebb **10%** kerülhet lerakóba.'
        },
        {
          title: 'Élelmiszer-hulladék',
          text: 'Az előállított élelmiszer jelentős része a szemétben végzi; az ENSZ becslése szerint a fogyasztói szintű pazarlás egyedül több mint **1 milliárd tonna** évente, és az élelmiszer-veszteség és -pazarlás együtt a globális kibocsátás kb. **8–10%-áért** felel.\n\nA legtöbb háztartásban a pazarlás **otthon** keletkezik. Bevásárlólista, a „minőségét megőrzi” dátum helyes értelmezése és a maradékok felhasználása sokat segít – erről a [[#/lecke/haztartas/fozes-alapok|Főzés alapjai]] leckében is olvashatsz.'
        }
      ],
      quiz: [
        { q: 'Melyik áll a hulladékhierarchia csúcsán?', options: ['Újrahasznosítás', 'Égetés', 'Megelőzés', 'Lerakás'], answer: 2, explain: 'A legjobb hulladék az, ami nem keletkezik: megelőzés, aztán újrahasználat, csak utána újrahasznosítás.' },
        { q: 'Mennyi betétdíj jár egy visszaváltható palackért Magyarországon (2024 óta)?', options: ['5 Ft', '20 Ft', '50 Ft', '100 Ft'], answer: 2, explain: 'A REpont rendszerben a betétdíj 50 Ft.' },
        { q: 'Miért kibocsátó a hulladéklerakó?', options: ['Mert világít', 'Mert a lebomló szerves anyagból metán keletkezik', 'Mert sok rajta a madár', 'Nem kibocsátó'], answer: 1, explain: 'Oxigén nélkül bomló szerves hulladékból metán keletkezik, ami erős üvegházgáz.' }
      ]
    },
    /* ---------------------------------------------------------------- 10 */
    {
      id: 'mit-tehetsz',
      title: 'Mit tehetsz te? Nagyságrendek szorongás nélkül',
      level: 1, minutes: 13,
      summary: 'Lábnyomkalkulátor, a lépések valós súlya, és miért számít a közösségi cselekvés is.',
      tags: ['szénlábnyom', 'CO₂-egyenérték', 'életmód', 'repülés', 'étrend', 'fűtés', 'közösség', 'klímaszorongás', 'nagyságrend'],
      sections: [
        {
          title: 'Mi a szénlábnyom?',
          text: 'A **szénlábnyom** megmutatja, mennyi üvegházgázzal jár egy ember (vagy termék, cég, ország) egy év alatt. A különböző gázokat **CO₂-egyenértékbe** (CO₂e) számoljuk át.\n\nNéhány nagyságrend egy főre, évente:\n\n- **világátlag:** kb. **6,5 t CO₂e** (az összes kibocsátás osztva a népességgel, 2024),\n- **magyar átlag:** kb. **5,5–6 t CO₂e** (az országban kibocsátott; ha a behozott termékeket is számoljuk, több),\n- az **1,5 °C-os** pályához 2030-ra kb. **2,5 t** életmódbeli lábnyom illene (Hot or Cool Intézet, 2021).\n\nA különbség nagy, de nem mindent kell egyedül megoldanod: a tiszta áram, a jó tömegközlekedés és a szigetelt épületek **közös** döntések eredménye.',
          widget: { type: 'labnyom' }
        },
        {
          title: 'Ami sokat számít, és ami keveset',
          text: 'A kutatások szerint a **legnagyobb hatású** egyéni lépések (t CO₂e/év nagyságrendben):\n\n- **autó nélkül** élni vagy jóval kevesebbet autózni: kb. **1–2,5 t**,\n- **egy hosszú repülőút elhagyása** (pl. Európából Amerikába oda-vissza): kb. **1,5–3 t** (a magaslégköri hatásokkal együtt),\n- **szigetelés, hőszivattyú**, a gázfűtés kiváltása: családi házban **1–3 t** háztartásonként,\n- **növényi alapú étrend**: kb. **0,5–1,5 t**,\n- **zöld áram** (pl. napelem): néhány tized tonna.\n\nAmi **keveset** számít (de nem rossz!): a műanyag szívószál elhagyása, a töltő kihúzása, a helyi termék a szállítás miatt. Ezek a teljes lábnyom töredékét adják.',
          tip: 'Nem kell mindent egyszerre. Válaszd ki azt az 1–2 lépést, ami **nálad** a legtöbbet hozza – a kalkulátor rangsora ebben segít.'
        },
        {
          title: 'Nem csak vásárló vagy: közösség és hang',
          text: 'Az egyéni lépéseken túl a **közösségi** szint is számít:\n\n- **beszélgetés** a családdal, barátokkal (a klímavédelmi szokások terjednek),\n- **iskolai projektek**: energiafigyelés, komposzt, kerékpártároló, fásítás,\n- részvétel helyi döntésekben (kerékpárút, fásítás, közösségi naperőmű),\n- **választható pálya**: a megújuló energia, az épületfelújítás, a hőszivattyú- és napelemszerelés, a villamosítás a jövő **szakmái** közé tartozik.'
        },
        {
          title: 'Ha szorongsz',
          text: 'A klímaváltozás miatti aggodalom gyakori és érthető érzés. Néhány dolog, ami segít:\n\n- **A tények nem csak rosszak:** a nap- és szélenergia ára zuhant, rekordütemben épül, sok ország kibocsátása csökken (Magyarországé 1990 óta kb. 43%-kal).\n- **Minden tized fok számít** – nincs „már késő”.\n- **A cselekvés oldja a szorongást:** egy konkrét, saját lépés többet ér, mint a hírek görgetése.\n- **Beszélj róla** valakivel; ha az aggodalom tartósan rontja az alvásodat vagy a mindennapjaidat, kérj segítséget (iskolapszichológus, háziorvos).'
        }
      ],
      quiz: [
        { q: 'Kb. mekkora a világátlag egy főre jutó üvegházgáz-kibocsátás?', options: ['Kb. 0,5 t CO₂e/év', 'Kb. 6,5 t CO₂e/év', 'Kb. 50 t CO₂e/év', 'Kb. 200 kg CO₂e/év'], answer: 1, explain: 'A kb. 53 milliárd tonnás globális kibocsátás és a kb. 8 milliárdos népesség hányadosa kb. 6,5 t.' },
        { q: 'Melyik lépésnek a legnagyobb általában a hatása?', options: ['A töltő kihúzása', 'A műanyag szívószál elhagyása', 'Egy hosszú távú repülőút elhagyása', 'A papírzacskó'], answer: 2, explain: 'Egy interkontinentális oda-vissza út 1,5–3 t CO₂e is lehet, ez az éves lábnyom jelentős része.' },
        { q: 'Mit jelent a CO₂-egyenérték?', options: ['Csak a CO₂-t számolja', 'A különböző üvegházgázokat a melegítő hatásuk alapján CO₂-mennyiségre számolja át', 'Az oxigén mennyiségét', 'A szén árát'], answer: 1, explain: 'A metánt, dinitrogén-oxidot stb. a GWP értékükkel szorozva CO₂-re váltjuk, így összeadhatók.' }
      ]
    }
  ]
});
