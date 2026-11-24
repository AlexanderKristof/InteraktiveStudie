/* Tantárgy: Fizika (7–8. osztály) */
STUDIE.addSubject({
  id: 'fiz-alap',
  stage: 'altalanos',
  title: 'Fizika (7–8. osztály)',
  icon: '🔭',
  color: '#2f7bf6',
  description: 'Mozgás, erő, nyomás, energia, hő, elektromosság és fény – a felső tagozatos fizika érthetően, hétköznapi példákkal.',
  intro: 'A fizika azt vizsgálja, **hogyan működik a világ** körülötted: miért úszik a hajó, miért melegszik fel a bicikli pumpája, és hogyan világít a zseblámpa. Minden leckében vannak **kidolgozott példák**: ezeket lépésről lépésre érdemes végigkövetni. A képleteket nem bemagolni kell, hanem megérteni, mit mondanak. Ha egy számolásnál elakadsz, mindig írd ki az **adatokat mértékegységgel** együtt – ez a feladat fele!',
  lessons: [
    {
      id: 'mozgas',
      title: 'A testek mozgása',
      level: 1, minutes: 12,
      summary: 'Út, idő, sebesség és átlagsebesség: hogyan írjuk le, milyen gyorsan mozog valami.',
      tags: ['mozgás', 'nyugalom', 'viszonyítási pont', 'pálya', 'út', 'idő', 'sebesség', 'átlagsebesség', 'm/s', 'km/h', 'egyenletes mozgás', 'út-idő grafikon'],
      sections: [
        {
          title: 'Mozgás vagy nyugalom?',
          text: 'Ülsz a vonaton, és olvasol. Mozogsz vagy állsz? A válasz attól függ, **mihez viszonyítasz**! A vonathoz képest nyugalomban vagy, a sínekhez képest viszont 100 km/h-val száguldasz.\n\nEzért a mozgás leírásához mindig kell egy **viszonyítási pont** (vagy viszonyítási test). Ha nem mondjuk külön, általában a Földhöz viszonyítunk.\n\nA mozgás fontos jellemzői:\n\n- **pálya**: az a vonal, amelyen a test végighalad (lehet egyenes vagy görbe);\n- **út (s)**: a pálya hossza, amit a test megtett, mértékegysége a **méter (m)**;\n- **idő (t)**: ameddig a mozgás tartott, mértékegysége a **másodperc (s)**.',
          tip: 'Az út jele kis **s** (a latin spatium = távolság szóból), az idő jele kis **t** (tempus = idő). Ne keverd össze a másodperc „s” jelével!'
        },
        {
          title: 'A sebesség',
          text: 'Ki a gyorsabb: aki 100 m-t fut 20 s alatt, vagy aki 60 m-t 10 s alatt? Ezt a **sebesség** dönti el: megmutatja, **mennyi utat tesz meg a test egységnyi idő alatt**.\n\n`v = s / t`     (sebesség = út / idő)\n\n- Az első futó: `v = 100 m / 20 s = 5 m/s`\n- A második futó: `v = 60 m / 10 s = 6 m/s` – ő a gyorsabb!\n\nA sebesség mértékegysége a **m/s** (méter per szekundum) vagy a **km/h** (kilométer per óra). Átváltás:\n\n`1 m/s = 3,6 km/h`\n\n- m/s → km/h: **szorozz** 3,6-tal: `10 m/s = 36 km/h`\n- km/h → m/s: **ossz** 3,6-tal: `72 km/h = 20 m/s`\n\nA képletből a másik két mennyiség is kifejezhető: `s = v · t` és `t = s / v`.\n\n**Kidolgozott példa:** egy autó 90 km/h-val egyenletesen halad. Mennyi idő alatt ér el a 45 km-re lévő városba?\n\n`t = s / v = 45 km / 90 km/h = 0,5 h = 30 perc`',
          tip: 'Miért éppen 3,6? Egy óra 3600 másodperc, egy kilométer 1000 méter, és 3600 / 1000 = 3,6.'
        },
        {
          title: 'Egyenletes mozgás és az út-idő grafikon',
          text: 'Ha egy test **egyenlő idők alatt egyenlő utakat** tesz meg, akkor **egyenletesen mozog**, a sebessége állandó. Például egy mozgólépcső vagy egy tempomattal haladó autó az autópályán.\n\nAz egyenletes mozgás **út-idő grafikonja** egy origóból induló **ferde egyenes**. Minél **meredekebb** az egyenes, annál **nagyobb a sebesség**. Ha a grafikon vízszintes, a test áll (telik az idő, de nem nő az út).\n\nA valóságban a legtöbb mozgás **nem egyenletes**: a bicikli lassul az emelkedőn, a busz megáll a megállóban. Ilyenkor a **pillanatnyi sebesség** folyton változik – ezt mutatja az autó sebességmérője.'
        },
        {
          title: 'Az átlagsebesség',
          text: 'Ha a mozgás nem egyenletes, az **átlagsebességet** számoljuk ki: azt a sebességet, amellyel egyenletesen haladva a test ugyanannyi idő alatt ugyanakkora utat tenne meg.\n\n`átlagsebesség = teljes út / teljes idő`\n\n**Kidolgozott példa:** biciklivel 6 km-t teszel meg 20 perc alatt, aztán 10 percet pihensz, végül még 4 km-t mész 20 perc alatt.\n\n1. Teljes út: `6 km + 4 km = 10 km`\n2. Teljes idő (a pihenő is számít!): `20 + 10 + 20 = 50 perc`\n3. `50 perc = 50/60 h ≈ 0,83 h`\n4. Átlagsebesség: `10 km / (5/6 h) = 12 km/h`',
          warn: 'Az átlagsebesség **nem** a sebességek átlaga! Ha 120 km-t mész oda 60 km/h-val (2 óra), és vissza 40 km/h-val (3 óra), akkor az átlagsebesség `240 km / 5 h = 48 km/h`, nem 50 km/h. A lassabb szakaszon ugyanis több időt töltesz.',
          widget: { type: 'gyakorlas', options: { kind: 'mertekegyseg', title: 'Mértékegység-váltó gyakorló', help: 'A fizikai számolások előtt gyakran át kell váltani: km-t m-be, órát percbe. Gyakorold!' } }
        }
      ],
      quiz: [
        { q: 'Hány m/s a 54 km/h?', options: ['194,4 m/s', '54 m/s', '15 m/s', '5,4 m/s'], answer: 2, explain: 'km/h-ból m/s-ba 3,6-tal osztunk: 54 / 3,6 = 15 m/s.' },
        { q: 'Egy csiga 12 cm-t mászik 4 perc alatt. Mekkora a sebessége?', options: ['3 cm/perc', '0,33 cm/perc', '48 cm/perc', '16 cm/perc'], answer: 0, explain: 'v = s / t = 12 cm / 4 perc = 3 cm/perc.' },
        { q: 'Mit jelent, ha az út-idő grafikon egy szakaszon vízszintes?', options: ['A test egyre gyorsabban mozog', 'A test visszafelé megy', 'A test egyenletesen mozog', 'A test áll'], answer: 3, explain: 'Telik az idő, de a megtett út nem nő, tehát a test nem mozdul.' },
        { q: 'Egy busz 2 óra alatt 150 km-t tesz meg, közben megállt pihenni is. Mekkora az átlagsebessége?', options: ['300 km/h', '75 km/h', '152 km/h', '50 km/h'], answer: 1, explain: 'Átlagsebesség = teljes út / teljes idő = 150 km / 2 h = 75 km/h. A pihenő is benne van a 2 órában.' }
      ]
    },
    {
      id: 'ero-tomeg',
      title: 'Erő, tömeg és sűrűség',
      level: 1, minutes: 14,
      summary: 'Mi az erő és hogyan mérjük, mi a különbség tömeg és súly között, mi a gravitáció és a súrlódás.',
      tags: ['erő', 'newton', 'tömeg', 'kilogramm', 'sűrűség', 'súly', 'gravitáció', 'rugós erőmérő', 'súrlódás', 'eredő erő', 'tehetetlenség', 'g = 10 N/kg'],
      sections: [
        {
          title: 'Tömeg és sűrűség',
          text: 'A **tömeg (m)** megmutatja, mennyi anyagból áll a test, és mennyire nehéz megváltoztatni a mozgását (ez a **tehetetlenség**). Mértékegysége a **kilogramm (kg)**, mérőeszköze a **mérleg**.\n\nMelyik nehezebb: 1 kg vas vagy 1 kg toll? Egyforma! A vas viszont sokkal **kisebb helyen** elfér. Ezt a **sűrűség (ρ, ejtsd: ró)** fejezi ki: megmutatja, mekkora az anyag **egységnyi térfogatának** tömege.\n\n`ρ = m / V`     (sűrűség = tömeg / térfogat)\n\nMértékegysége `kg/m³` vagy `g/cm³`. Néhány érték:\n\n- víz: `1 g/cm³ = 1000 kg/m³`\n- jég: `0,9 g/cm³`\n- vas: `7,8 g/cm³`\n- alumínium: `2,7 g/cm³`\n- fa (fenyő): kb. `0,5 g/cm³`\n\n**Kidolgozott példa:** egy 20 cm³-es fémkocka tömege 54 g. Miből van? `ρ = 54 g / 20 cm³ = 2,7 g/cm³` – ez alumínium.'
        },
        {
          title: 'Az erő és a rugós erőmérő',
          text: 'Ha meglöksz egy labdát, összenyomsz egy szivacsot vagy megállítasz egy gördülő kocsit, **erőt fejtesz ki**. Az **erő (F)** két test kölcsönhatásának mértéke: megváltoztathatja a test **mozgásállapotát** (elindítja, megállítja, eltéríti) vagy **alakját**.\n\nAz erő mértékegysége a **newton (N)**, Isaac Newton tiszteletére. Kb. 1 N erővel nyom a tenyeredre egy 10 dkg-os tábla csoki.\n\nAz erőnek **nagysága, iránya és támadáspontja** van, ezért rajzban **nyíllal** ábrázoljuk.\n\nAz erőt **rugós erőmérővel** mérjük. Működése azon alapul, hogy a rugó **megnyúlása egyenesen arányos** a rá ható erővel: kétszer akkora erő kétszer akkora megnyúlást okoz (amíg túl nem húzzuk a rugót).',
          tip: 'Ha egy testre több erő hat, ezek együttes hatását az **eredő erő** adja meg. Azonos irányú erők összeadódnak, ellentétes irányúak kivonódnak: kötélhúzásban 300 N és 250 N esetén az eredő 50 N az erősebb csapat felé.'
        },
        {
          title: 'Gravitáció és súly',
          text: 'A Föld minden testet maga felé vonz: ez a **gravitációs erő** (nehézségi erő). Emiatt esik le az elejtett alma, és ezért kering a Hold a Föld körül.\n\nA Földön a gravitációs erő kb. **10 N minden kilogrammra**:\n\n`F = m · g`, ahol `g ≈ 10 N/kg` (pontosabban 9,81 N/kg)\n\nA **súly** az az erő, amellyel a test **nyomja az alátámasztást** vagy **húzza a felfüggesztést**. Nyugalomban lévő testnél ez ugyanakkora, mint a rá ható gravitációs erő.\n\n**Kidolgozott példa:** egy 45 kg-os diák súlya a Földön `45 kg · 10 N/kg = 450 N`. A Holdon a gravitáció hatoda a földinek, ott csak kb. 75 N lenne a súlya – a **tömege viszont ott is 45 kg**.',
          warn: 'A hétköznapi „50 kilót nyomok” mondat fizikailag pontatlan: a **tömeged** 50 kg, a **súlyod** kb. 500 N. A tömeg kilogramm, a súly (erő) newton!'
        },
        {
          title: 'Súrlódás',
          text: 'Ha egy szekrényt tolsz a padlón, valami „visszahúzza”: ez a **súrlódási erő**. Az érintkező felületek apró egyenetlenségei beakadnak egymásba. A súrlódás **mindig a mozgás (vagy a mozgás iránya) ellen hat**.\n\n- **Tapadási súrlódás**: amíg a test még nem mozdul meg (ezért nem csúszik le a könyv a ferde padról).\n- **Csúszási súrlódás**: amikor a test elcsúszik a felületen.\n- **Gördülési ellenállás**: kerekeknél, ez a legkisebb – ezért találták fel a kereket!\n\nA súrlódás nagyobb, ha a felületek **érdesebbek**, és ha a test **erősebben nyomja** a felületet.\n\nA súrlódás lehet **hasznos**: enélkül nem tudnál járni, a fék nem fogna, a csomó kicsúszna. Lehet **káros** is: koptatja a gépalkatrészeket, és energiát pazarol. Csökkentjük kenéssel (olaj, zsír), csapágyakkal, simább felülettel; növeljük érdes felülettel, homokszórással, téli gumival.'
        }
      ],
      quiz: [
        { q: 'Mekkora egy 3 kg-os táska súlya a Földön (g ≈ 10 N/kg)?', options: ['3 N', '0,3 N', '300 N', '30 N'], answer: 3, explain: 'G = m · g = 3 kg · 10 N/kg = 30 N.' },
        { q: 'Egy 40 cm³-es test tömege 312 g. Mekkora a sűrűsége?', options: ['12 480 g/cm³', '7,8 g/cm³', '0,13 g/cm³', '352 g/cm³'], answer: 1, explain: 'ρ = m / V = 312 g / 40 cm³ = 7,8 g/cm³ (ez a vas sűrűsége).' },
        { q: 'Mi változik, ha egy űrhajós a Földről a Holdra utazik?', options: ['A súlya', 'A tömege', 'Mindkettő', 'Egyik sem'], answer: 0, explain: 'A tömeg (anyagmennyiség) ugyanannyi marad, de a Holdon kisebb a gravitáció, ezért a súlya kb. a hatodára csökken.' },
        { q: 'Melyik esetben HASZNOS a súrlódás?', options: ['A motor dugattyújánál', 'A biciklilánc és a fogaskerék között', 'A cipőtalp és a járda között', 'A korcsolyapályán a korcsolya alatt'], answer: 2, explain: 'A talp és a járda közötti tapadási súrlódás nélkül el sem tudnál indulni. A motorban és a láncnál kenéssel csökkentjük a súrlódást.' }
      ]
    },
    {
      id: 'nyomas',
      title: 'Nyomás szilárd testekben, folyadékokban és gázokban',
      level: 2, minutes: 15,
      summary: 'Mitől függ a nyomás, miért nő a mélységgel a víznyomás, mi a légnyomás, és miért úszik a hajó.',
      tags: ['nyomás', 'pascal', 'nyomott felület', 'hidrosztatikai nyomás', 'közlekedőedények', 'légnyomás', 'Torricelli', 'barométer', 'Arkhimédész', 'felhajtóerő', 'úszás', 'lebegés', 'elmerülés'],
      sections: [
        {
          title: 'Nyomás szilárd testeknél',
          text: 'Miért süllyedsz bele a hóba cipőben, sílécen viszont nem? A súlyod ugyanaz, de a léc **nagyobb felületen** osztja el. Ezt a **nyomás** írja le: megmutatja, mekkora erő jut **egységnyi felületre**.\n\n`p = F / A`     (nyomás = nyomóerő / nyomott felület)\n\nMértékegysége a **pascal (Pa)**: `1 Pa = 1 N/m²`. Ez nagyon kicsi, ezért gyakran **kPa** (1000 Pa) vagy **bar** (100 000 Pa) az egység.\n\n**Kidolgozott példa:** egy 600 N súlyú ember két talpa együtt 0,04 m²-en áll.\n\n`p = 600 N / 0,04 m² = 15 000 Pa = 15 kPa`\n\nHa fél lábra áll, a felület a felére csökken, a nyomás kétszeresére nő: 30 kPa.\n\n- **Nagy nyomás** kell, ezért kis felület: kés éle, tű hegye, szög, korcsolya éle.\n- **Kis nyomás** kell, ezért nagy felület: síléc, hótalp, lánctalpas munkagép, széles traktorgumi.'
        },
        {
          title: 'Nyomás folyadékokban',
          text: 'A folyadék saját súlyából is nyomás származik: ez a **hidrosztatikai nyomás**. Ha lemerülsz a medence aljára, érzed a füledben, hogy nő a nyomás.\n\n`p = ρ · g · h`     (sűrűség · g · mélység)\n\nA hidrosztatikai nyomás tehát:\n\n- a **mélységgel** egyenesen arányosan nő,\n- **sűrűbb** folyadékban nagyobb,\n- **nem függ** az edény alakjától és a folyadék mennyiségétől.\n\n**Kidolgozott példa:** mekkora a víz nyomása 10 m mélyen?\n\n`p = 1000 kg/m³ · 10 N/kg · 10 m = 100 000 Pa = 100 kPa`\n\nTehát **10 m víz** nagyjából akkora nyomást okoz, mint a teljes légkör!\n\nA folyadék a nyomást **minden irányba** továbbítja. Ezért ugyanakkora magasságban áll a víz az összekötött edényekben (**közlekedőedények**): így működik a teáskanna kiöntője, a vízszintező cső és a víztorony is.',
          tip: 'A gátakat ezért építik alul sokkal vastagabbra, mint felül: lent sokkal nagyobb a víz nyomása.'
        },
        {
          title: 'A légnyomás',
          text: 'A Földet körülvevő levegőnek is van súlya, ezért nyomást gyakorol mindenre: ez a **légnyomás**. A tengerszinten kb. **100 kPa** (pontosabban átlagosan 101,3 kPa). Ez azt jelenti, hogy minden négyzetméterre kb. 100 000 N, azaz kb. 10 tonnányi súly nyomása jut! Azért nem nyom össze, mert a testedben is ugyanekkora nyomás van, és minden irányból egyformán hat.\n\nA légnyomást **Evangelista Torricelli** mérte meg először 1643-ban egy higannyal töltött csővel: a légnyomás kb. 76 cm magas higanyoszlopot tart meg. Mérőeszköze a **barométer**.\n\n- **Felfelé haladva csökken** a légnyomás, mert egyre kevesebb levegő van felettünk. A Kékestetőn kb. 10%-kal, a Mount Everesten kb. harmadára csökken.\n- A légnyomás **időjárás** szerint is változik: a csökkenő légnyomás gyakran esőt, a növekvő derült időt jelez.\n\nA légnyomás hajtja fel az üdítőt a szívószálban: kiszívod a levegőt a szálból, és a pohárban lévő folyadékot a külső légnyomás tolja fel.'
        },
        {
          title: 'Arkhimédész törvénye és az úszás',
          text: 'A vízben könnyebbnek érzed magad, mert a víz felfelé tol: ez a **felhajtóerő**. Mértékét **Arkhimédész törvénye** adja meg:\n\n**A folyadékba merülő testre akkora felhajtóerő hat, mint a test által kiszorított folyadék súlya.**\n\n`F(fel) = ρ(folyadék) · g · V(bemerülő rész)`\n\n**Kidolgozott példa:** egy 2 dm³ (0,002 m³) térfogatú követ teljesen vízbe merítünk. A felhajtóerő: `1000 · 10 · 0,002 = 20 N`. Ha a kő súlya a levegőben 50 N, a vízben az erőmérő csak `50 − 20 = 30 N`-t mutat.\n\nHogy egy test **úszik, lebeg vagy elmerül**, azt a sűrűségek összehasonlítása dönti el:\n\n- a test sűrűsége **kisebb** a folyadékénál → **úszik** (részben kiáll belőle): fa, jég, jó vízben;\n- **egyenlő** → **lebeg** (bárhol megáll): halak, tengeralattjáró;\n- **nagyobb** → **elmerül**: kő, vasgolyó.\n\nDe hogyan úszhat a több ezer tonnás **acélhajó**? Az acél sűrűbb a víznél, de a hajó belül **üreges**, tele levegővel. A hajó egészének átlagos sűrűsége kisebb a vízénél, így sok vizet szorít ki, és nagy felhajtóerő hat rá.',
          tip: 'A tengeralattjáró tartályaiba vizet enged (nő az átlagos sűrűsége → merül), vagy sűrített levegővel kinyomja a vizet (csökken a sűrűsége → emelkedik). A halak az úszóhólyagjukkal csinálják ugyanezt.'
        }
      ],
      quiz: [
        { q: 'Egy 800 N súlyú láda 0,5 m²-es alappal áll a padlón. Mekkora nyomást fejt ki?', options: ['400 Pa', '800,5 Pa', '1600 Pa', '0,000625 Pa'], answer: 2, explain: 'p = F / A = 800 N / 0,5 m² = 1600 Pa.' },
        { q: 'Miért éles a kés?', options: ['Hogy kis felületen nagy nyomást fejtsen ki', 'Hogy kisebb legyen a súlya', 'Hogy csökkenjen a súrlódás', 'Hogy nagyobb legyen a felület'], answer: 0, explain: 'Ugyanakkora erő kisebb felületen nagyobb nyomást hoz létre, ezért vág jobban az éles kés.' },
        { q: 'Hogyan változik a légnyomás, ha felmászol egy hegyre?', options: ['Nő', 'Nem változik', 'Először nő, aztán csökken', 'Csökken'], answer: 3, explain: 'Feljebb kevesebb levegő van fölötted, ezért kisebb a légnyomás.' },
        { q: 'Mikor úszik egy test a víz felszínén?', options: ['Ha nagyobb a tömege, mint 1 kg', 'Ha a sűrűsége kisebb a víz sűrűségénél', 'Ha nagyobb a sűrűsége a víznél', 'Ha fémből van'], answer: 1, explain: 'Ha a test (átlagos) sűrűsége kisebb a folyadékénál, a felhajtóerő már részleges bemerüléskor eléri a súlyát, így úszik.' }
      ]
    },
    {
      id: 'energia-munka',
      title: 'Munka, energia, teljesítmény és az egyszerű gépek',
      level: 2, minutes: 16,
      summary: 'Mit jelent fizikailag a munka, milyen energiafajták vannak, hogyan alakulnak egymásba, és hogyan segítenek az egyszerű gépek.',
      tags: ['munka', 'joule', 'energia', 'helyzeti energia', 'mozgási energia', 'rugalmas energia', 'belső energia', 'energiamegmaradás', 'energiaátalakulás', 'teljesítmény', 'watt', 'hatásfok', 'egyszerű gép', 'emelő', 'csiga', 'lejtő', 'forgatónyomaték'],
      models: ['benzinmotor', 'napelempanel'],
      sections: [
        {
          title: 'A munka',
          text: 'A hétköznapokban „dolgozol”, ha leckét írsz. A fizikában viszont **munkát** csak akkor végzel, ha egy **erő elmozdít** egy testet az erő irányában.\n\n`W = F · s`     (munka = erő · elmozdulás)\n\nMértékegysége a **joule (J)**: `1 J = 1 N · 1 m`. Ennyi munkát végzel, ha egy 10 dkg-os csokit 1 m magasra emelsz.\n\n**Kidolgozott példa:** egy 20 kg-os zsák cementet 1,5 m magasra emelsz a platóra.\n\n1. Az emeléshez szükséges erő a zsák súlya: `F = 20 kg · 10 N/kg = 200 N`\n2. A munka: `W = 200 N · 1,5 m = 300 J`\n\nHa csak tartod a zsákot egy helyben, elfáradsz, de **fizikai értelemben nem végzel munkát**, mert nincs elmozdulás.'
        },
        {
          title: 'Az energia fajtái és átalakulása',
          text: 'Az **energia** a munkavégző képesség: amelyik testnek energiája van, az munkát tud végezni. Mértékegysége szintén a **joule (J)**. Néhány energiafajta:\n\n- **Mozgási energia**: minden mozgó testnek van. Minél nagyobb a tömege és **főleg a sebessége**, annál több (kétszer akkora sebességnél négyszer akkora!).\n- **Helyzeti energia**: a magasra emelt testnek van: `E = m · g · h`. A gáttal felduzzasztott víz is ezt tárolja.\n- **Rugalmas energia**: a megfeszített rugóban, íjban, felfújt lufiban.\n- **Belső energia (hő)**: a részecskék mozgásából, a melegebb test belső energiája nagyobb.\n- **Kémiai energia**: az élelmiszerben, a benzinben, az elemben tárolt energia.\n- **Elektromos energia** és **sugárzási energia** (pl. a napfény).\n\nAz **energiamegmaradás törvénye**: az energia **nem keletkezik a semmiből és nem vész el**, csak egyik fajtából a másikba alakul. Példák:\n\n- Leejtett labda: helyzeti → mozgási → (a földön) rugalmas → mozgási…\n- Autó motorja: kémiai → belső → mozgási. Nézd meg a [[benzinmotor|benzinmotor felfedezőjében]]!\n- Napelem: sugárzási → elektromos. Lásd a [[napelempanel|napelempanel felfedezőjét]].\n- Vízerőmű: helyzeti → mozgási → elektromos.\n\nAz átalakulás során az energia egy része mindig **hővé** alakul, ami számunkra elvész. A **hatásfok** megmutatja, a befektetett energia hányad része hasznos: egy autómotornál kb. 30%, egy villanymotornál kb. 90%.'
        },
        {
          title: 'A teljesítmény',
          text: 'Ugyanazt a munkát el lehet végezni gyorsan vagy lassan. A **teljesítmény** megmutatja, **mennyi munkát végzünk egységnyi idő alatt**.\n\n`P = W / t`     (teljesítmény = munka / idő)\n\nMértékegysége a **watt (W)**: `1 W = 1 J / 1 s`. Nagyobb egysége a kilowatt: `1 kW = 1000 W`.\n\n**Kidolgozott példa:** Anna és Bence is felmegy a 3 m magas lépcsőn, mindketten 500 N súlyúak. A munka: `W = 500 N · 3 m = 1500 J`. Anna 5 s alatt, Bence 10 s alatt ér fel.\n\n- Anna teljesítménye: `1500 J / 5 s = 300 W`\n- Bence teljesítménye: `1500 J / 10 s = 150 W`\n\nUgyanannyi munkát végeztek, de Anna teljesítménye kétszer akkora.\n\nNéhány teljesítmény: LED-izzó 8–10 W, ember tartósan kb. 100 W, vízforraló 2000 W, személyautó motorja 50–150 kW.'
        },
        {
          title: 'Egyszerű gépek: emelő, csiga, lejtő',
          text: 'Az **egyszerű gépek** segítségével **kisebb erővel** is el tudunk végezni egy munkát. Cserébe **hosszabb úton** kell kifejtenünk az erőt.\n\n**Az emelő (kétkarú emelő)** egy forgástengely körül elforduló rúd. Egyensúlyban:\n\n`F₁ · k₁ = F₂ · k₂`     (erő · erőkar = teher · teherkar)\n\nAz **erőkar** a forgástengely és az erő hatásvonalának távolsága. **Kidolgozott példa:** a libikókán a 300 N súlyú Peti 1 m-re ül a tengelytől. Hol üljön a 200 N súlyú húga? `300 · 1 = 200 · k` → `k = 1,5 m`. A könnyebbnek messzebb kell ülnie!\n\nEmelő az olló, a harapófogó, a sörnyitó, a talicska, de a karod is (a könyököd a forgástengely).\n\n**Csigák:**\n\n- **Állócsiga**: a tengelye rögzített. Erőt **nem** takarít meg, de **megváltoztatja az erő irányát** (lefelé húzva emelhetsz). Pl. zászlórúd.\n- **Mozgócsiga**: a teherrel együtt mozog, a terhet két kötélszár tartja, ezért **feleakkora erő** elég, de **kétszer annyi kötelet** kell húzni.\n- A kettő kombinációja a **csigasor** (pl. daruk).\n\n**A lejtő** ferde sík: a terhet nem egyenesen emeled fel, hanem hosszabb úton feltolod. Minél **hosszabb és laposabb** a lejtő, annál kisebb erő kell. Lejtő a rámpa, a szerpentin, és a csavar menete is (feltekert lejtő), valamint az ék és a fejsze éle.',
          tip: 'Az egyszerű gépek **aranyszabálya**: erőt megtakaríthatsz, de **munkát nem**. Amennyivel kisebb az erő, annyival hosszabb az út, a szorzatuk (a munka) súrlódás nélkül ugyanannyi marad.'
        }
      ],
      quiz: [
        { q: 'Mennyi munkát végzel, ha egy 5 kg-os dobozt 2 m magasra emelsz (g ≈ 10 N/kg)?', options: ['10 J', '25 J', '7 J', '100 J'], answer: 3, explain: 'F = 5 · 10 = 50 N, W = F · s = 50 N · 2 m = 100 J.' },
        { q: 'Milyen energiaátalakulás történik egy vízerőműben?', options: ['Kémiai → elektromos', 'Helyzeti → mozgási → elektromos', 'Sugárzási → elektromos', 'Elektromos → helyzeti'], answer: 1, explain: 'A magasan tárolt víz lezúdul (helyzeti → mozgási), és megforgatja a turbinát, ami a generátorral áramot termel.' },
        { q: 'Egy motor 30 s alatt 6000 J munkát végez. Mekkora a teljesítménye?', options: ['200 W', '180 000 W', '6030 W', '5 W'], answer: 0, explain: 'P = W / t = 6000 J / 30 s = 200 W.' },
        { q: 'Mire jó a mozgócsiga?', options: ['Munkát takarít meg', 'Csak az erő irányát változtatja meg', 'Feleakkora erővel emelhetünk vele', 'Kétszer akkora erő kell hozzá'], answer: 2, explain: 'A terhet két kötélszár tartja, ezért feleakkora erő elég – de kétszer annyi kötelet kell húzni, így a munka ugyanannyi.' }
      ]
    },
    {
      id: 'hotan',
      title: 'Hőtan: hőmérséklet, hőtágulás, halmazállapotok',
      level: 2, minutes: 15,
      summary: 'Mit mér a hőmérő, miért tágulnak a testek melegítéskor, milyen halmazállapot-változások vannak, és hogyan terjed a hő.',
      tags: ['hőmérséklet', 'Celsius', 'kelvin', 'hőmérő', 'hőtágulás', 'halmazállapot', 'olvadás', 'fagyás', 'párolgás', 'forrás', 'lecsapódás', 'szublimáció', 'hővezetés', 'hőáramlás', 'hősugárzás', 'hőszigetelés', 'fajhő'],
      models: ['hoszivattyu'],
      sections: [
        {
          title: 'Hőmérséklet és részecskék',
          text: 'Minden anyag apró, folyamatosan mozgó **részecskékből** (atomokból, molekulákból) áll. Minél **melegebb** egy anyag, annál **gyorsabban mozognak** a részecskéi. A **hőmérséklet** ezt a mozgást jellemzi.\n\nA hőmérsékletet **hőmérővel** mérjük, a hétköznapokban **Celsius-fokban (°C)**:\n\n- 0 °C: a jég olvadáspontja,\n- 100 °C: a víz forráspontja (tengerszinti légnyomáson),\n- kb. 36,5 °C: az egészséges ember testhőmérséklete.\n\nA tudományban a **kelvin (K)** skálát is használják. Ennek a nullpontja az **abszolút nulla fok** (−273 °C), ennél hidegebb nem lehet, ott a részecskék mozgása a lehető legkisebb. Átváltás:\n\n`T (K) = t (°C) + 273`\n\nPéldául a 20 °C-os szoba hőmérséklete 293 K.',
          tip: 'A kelvin után nem írunk fokot: „293 K”, és nem „293 °K”. A hőmérséklet-**változás** ugyanakkora mindkét skálán: ha 10 °C-kal melegszik valami, az 10 K-nel is több.'
        },
        {
          title: 'Hőtágulás',
          text: 'Melegítéskor a részecskék élénkebben mozognak, és **több helyet** foglalnak el: a testek **tágulnak**. Lehűléskor **összehúzódnak**. Ez a **hőtágulás**, és a szilárd testekre, folyadékokra és gázokra is igaz (a gázok tágulnak a legjobban).\n\nPéldák a hétköznapokból:\n\n- A **folyadékos hőmérőben** a melegedő folyadék tágul, és felkúszik a vékony csőben.\n- A **hidakon** dilatációs hézagot hagynak, a **vasúti síneket** pedig úgy építik, hogy a nyári melegben se görbüljenek el.\n- A **távvezetékek** nyáron jobban belógnak, mint télen.\n- A beszorult befőttesüveg-tető meleg víz alatt kitágul, és könnyebben lecsavarható.\n- A **bimetall szalag** két különböző mértékben táguló fémből áll, melegítéskor elhajlik: ez kapcsolja ki a vasalót.',
          warn: 'A **víz kivétel**! 0 °C és 4 °C között melegítve összehúzódik, és **fagyáskor kitágul** (kb. 9%-kal). Ezért a jég úszik a vízen, a tavak felülről fagynak be, és ezért repeszti szét a megfagyó víz a vízcsövet vagy a kőzeteket. Üvegben ne tegyél vizet a mélyhűtőbe!'
        },
        {
          title: 'Halmazállapot-változások',
          text: 'Az anyag három gyakori halmazállapota a **szilárd**, a **folyékony** és a **légnemű** (gáz). A változások neve:\n\n- **olvadás**: szilárd → folyékony (jég → víz), hőt **vesz fel**;\n- **fagyás**: folyékony → szilárd (víz → jég), hőt **ad le** (a viasz megszilárdulását **dermedésnek** is hívják);\n- **párolgás**: folyékony → gáz, a folyadék **felszínén**, minden hőmérsékleten;\n- **forrás**: folyékony → gáz, a folyadék **belsejében** is (buborékok!), csak a forrásponton;\n- **lecsapódás**: gáz → folyékony (pára a hideg ablakon), hőt ad le;\n- **szublimáció**: szilárd → gáz közvetlenül (szárazjég, a fagyott ruha télen is megszárad);\n- **kicsapódás (deszublimáció)**: gáz → szilárd (dér, zúzmara).\n\nFontos: olvadás és forrás **közben a hőmérséklet nem változik**, amíg az egész anyag át nem alakult. A forró vízzel teli lábasban addig 100 °C a víz, amíg el nem forr – hiába melegíted erősebben.\n\nA **párolgás hűt**: a felszínről a leggyorsabb részecskék távoznak. Ezért fázol, amikor vizesen kilépsz a medencéből, és ezért hűt a verejtékezés. A párolgás gyorsabb, ha **melegebb** a folyadék, **nagyobb a felszíne** és **szél** fújja el a párát.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a jelenséget a halmazállapot-változással!', count: 6, pairs: [
            ['Tavasszal elolvad a hóember', 'olvadás'], ['Télen befagy a tó', 'fagyás'], ['Megszárad a kiteregetett ruha', 'párolgás'],
            ['Buborékok a teafőzőben 100 °C-on', 'forrás'], ['Bepárásodik a fürdőszobatükör', 'lecsapódás'], ['Fogy a szárazjég, de nem lesz tócsa', 'szublimáció'],
            ['Dér lepi be reggel a füvet', 'kicsapódás'], ['Megszilárdul a kiöntött gyertyaviasz', 'dermedés']
          ] } }
        },
        {
          title: 'Hőterjedés és hőmennyiség',
          text: 'A hő mindig a **melegebb** helyről a **hidegebb** felé terjed, amíg a hőmérsékletek ki nem egyenlítődnek. Három módon:\n\n- **Hővezetés**: a részecskék egymásnak adják át a mozgást, maga az anyag nem mozdul. A **fémek jó hővezetők** (a fémkanál nyele felforrósodik a teában), a fa, a műanyag, a gyapjú és a **levegő rossz hővezetők**, azaz jó **hőszigetelők**.\n- **Hőáramlás**: folyadékokban és gázokban a meleg, ritkább anyag **felszáll**, a hideg lesüllyed. Így melegíti fel a radiátor az egész szobát.\n- **Hősugárzás**: a hő anyag nélkül, akár légüres téren át is terjed. Így melegít a Nap és a tábortűz. A sötét felületek jobban elnyelik, a világosak és fényesek visszaverik.\n\nA téli kabát, a dupla üvegezés és a házak homlokzati szigetelése a **bezárt levegő** rossz hővezetésére épít. A [[hoszivattyu|hőszivattyú]] pedig ügyesen „átpumpálja” a hőt a hidegebb külső levegőből a meleg lakásba.\n\nMennyi hő kell a melegítéshez? Ez a **hőmennyiség (Q)**, egysége a joule. A szükséges hő függ a tömegtől, a hőmérséklet-változástól és az anyagtól (**fajhő**): `Q = c · m · ΔT`. A víz fajhője nagy, `c = 4200 J/(kg·°C)`, vagyis 1 kg víz 1 °C-os melegítéséhez 4200 J kell. **Kidolgozott példa:** 2 kg víz 20 °C-ról 70 °C-ra melegítéséhez `Q = 4200 · 2 · 50 = 420 000 J = 420 kJ` hő kell.'
        }
      ],
      quiz: [
        { q: 'Hány kelvin a 27 °C?', options: ['246 K', '27 K', '300 K', '273 K'], answer: 2, explain: 'T = t + 273 = 27 + 273 = 300 K.' },
        { q: 'Miért hagynak hézagot a hidak elemei között?', options: ['Hogy a hőtágulás miatt ne görbüljenek meg', 'A szellőzés miatt', 'Hogy könnyebb legyen a híd', 'A víz elvezetése miatt'], answer: 0, explain: 'Nyáron a melegben a szerkezet kitágul. A hézag helyet ad neki, különben a híd elemei egymásnak feszülnének.' },
        { q: 'Melyik halmazállapot-változás a dér képződése?', options: ['Olvadás', 'Lecsapódás', 'Szublimáció', 'Kicsapódás (gáz → szilárd)'], answer: 3, explain: 'A levegő vízgőze a hideg felületen közvetlenül jégkristállyá alakul, folyékony állapot nélkül.' },
        { q: 'Hogyan terjed a Nap hője a Földig?', options: ['Hővezetéssel', 'Hősugárzással', 'Hőáramlással', 'Sehogy, a Föld magától meleg'], answer: 1, explain: 'A világűr szinte üres, ott nincs mi vezesse vagy áramoltassa a hőt. Csak a sugárzás jut át rajta.' }
      ]
    },
    {
      id: 'elektromossag-feny',
      title: 'Az elektromosság, a mágnesség és a fény alapjai',
      level: 2, minutes: 18,
      summary: 'Az egyszerű áramkör részei, vezetők és szigetelők, a mágnes, valamint a fény visszaverődése, törése és a színek.',
      tags: ['áramkör', 'áramforrás', 'fogyasztó', 'kapcsoló', 'vezető', 'szigetelő', 'feszültség', 'áramerősség', 'ellenállás', 'Ohm-törvény', 'soros kapcsolás', 'párhuzamos kapcsolás', 'mágnes', 'iránytű', 'elektromágnes', 'fény', 'fényvisszaverődés', 'tükör', 'fénytörés', 'lencse', 'prizma', 'színek', 'szivárvány'],
      models: ['akkucella', 'elosztoszekreny'],
      sections: [
        {
          title: 'Az egyszerű áramkör',
          text: 'Egy zseblámpa csak akkor világít, ha az áram **körbe tud folyni**. Az **áramkör** részei:\n\n- **áramforrás**: elem, akkumulátor, napelem – ez „hajtja” az áramot (lásd az [[akkucella|akkucella felfedezőjét]]);\n- **fogyasztó**: izzó, motor, csengő – ez alakítja át az elektromos energiát fénnyé, mozgássá, hővé;\n- **vezetékek**: összekötik a részeket;\n- **kapcsoló**: nyitja és zárja az áramkört.\n\nHa az áramkör **zárt**, folyik az áram; ha bárhol **megszakad** (nyitott kapcsoló, kiégett izzó), az áram megszűnik.\n\nA három alapmennyiség:\n\n- **Feszültség (U)**, egysége a **volt (V)**: az áramforrás „hajtóereje”. Ceruzaelem 1,5 V, laposelem 4,5 V, a konnektor 230 V.\n- **Áramerősség (I)**, egysége az **amper (A)**: mennyi töltés folyik át másodpercenként.\n- **Ellenállás (R)**, egysége az **ohm (Ω)**: mennyire akadályozza a fogyasztó az áramot.\n\n**Ohm törvénye**: `I = U / R`. Például egy 6 V-os elemre kapcsolt 12 Ω-os izzón `6 / 12 = 0,5 A` áram folyik. Próbáld ki!',
          warn: 'A konnektor 230 V-os feszültsége **életveszélyes**! Kísérletezni csak elemmel (1,5–9 V) szabad. Sérült vezetékhez, nyitott elosztódobozhoz soha ne nyúlj, és ne nyúlj elektromos készülékhez vizes kézzel.',
          widget: { type: 'ohm', options: { maxU: 12, u: 4.5 } }
        },
        {
          title: 'Vezetők, szigetelők, kapcsolások',
          text: 'Az anyagok egy része jól vezeti az áramot, más része szinte egyáltalán nem:\n\n- **Vezetők**: a **fémek** (réz, alumínium, vas, ezüst), a grafit (ceruzabél), a sós víz és az emberi test is!\n- **Szigetelők**: műanyag, gumi, üveg, porcelán, száraz fa, száraz levegő.\n\nEzért a vezeték belseje rézből, a burkolata műanyagból van.\n\nTöbb fogyasztót kétféleképpen köthetünk össze:\n\n- **Soros kapcsolás**: egymás után, egyetlen „úton”. Ugyanaz az áram folyik át mindegyiken, a feszültség megoszlik. Ha egy izzó kiég, **mind kialszik** (ilyen a régi karácsonyfaizzó-sor).\n- **Párhuzamos kapcsolás**: külön ágakban. Mindegyik ugyanakkora feszültséget kap, és **egymástól függetlenül** működnek. A lakás konnektorai és lámpái így vannak bekötve – az [[elosztoszekreny|elosztószekrényben]] ágaznak szét.',
          widget: { type: 'soros-parhuzamos' }
        },
        {
          title: 'A mágnes',
          text: 'A **mágnes** magához vonzza a vasat, a nikkelt és a kobaltot (de az alumíniumot, a rezet, a fát nem). Minden mágnesnek két **pólusa** van: **északi (É, N)** és **déli (D, S)**. A mágnes a pólusainál a legerősebb.\n\n- **Azonos** pólusok **taszítják**, **különböző** pólusok **vonzzák** egymást.\n- Ha egy mágnest kettétörsz, mindkét darabnak újra lesz északi és déli pólusa.\n\nA mágnes körül **mágneses mező** van, ezt vasreszelékkel láthatóvá tehetjük. A **Föld is egy óriási mágnes**: ezért fordul az **iránytű** mágnestűje mindig észak–déli irányba.\n\nAz elektromosság és a mágnesség összefügg: az áramjárta vezető körül is mágneses mező keletkezik. Ha vasmagra tekercset tekerünk, és áramot vezetünk bele, **elektromágnest** kapunk, amely ki-be kapcsolható. Ilyen van az ócskavastelepi darukban, a csengőben, a hangszóróban és az elektromos motorokban.'
        },
        {
          title: 'A fény: visszaverődés, törés, színek',
          text: 'A fény **egyenes vonalban** terjed – ezért keletkezik **árnyék**, ha egy átlátszatlan test útjába áll. Hihetetlenül gyors: vákuumban kb. **300 000 km/s** sebességgel halad, a Napból kb. 8 perc alatt ér ide.\n\n**Fényvisszaverődés:** a sima felületről (tükör, nyugodt víz) a fény szabályosan verődik vissza:\n\n**A beesési szög egyenlő a visszaverődési szöggel.**\n\nMindkét szöget a felületre merőleges egyeneshez (beesési merőleges) mérjük. Érdes felületről a fény minden irányba szóródik – ezért látjuk a tárgyakat bárhonnan.\n\n**Fénytörés:** ha a fény egyik átlátszó anyagból a másikba lép (pl. levegőből vízbe) ferdén, **megváltozik az iránya**. Ezért látszik a pohárban a szívószál „megtörtnek”, és ezért tűnik a medence sekélyebbnek, mint amilyen. A fénytörésen alapulnak a **lencsék**:\n\n- **gyűjtőlencse** (közepén vastagabb): összegyűjti a fényt, ilyen a nagyító, a fényképezőgép lencséje és a **szemünk lencséje** is;\n- **szórólencse** (közepén vékonyabb): szétszórja a fényt, ilyen a rövidlátók szemüvege.\n\n**Színek:** a fehér fény valójában **sok szín keveréke**. Az üveg **prizma** ezeket különböző mértékben töri meg, és felbontja a fényt: **vörös, narancs, sárga, zöld, kék, ibolya**. A **szivárvány** is így keletkezik: az esőcseppek bontják fel a napfényt. Egy tárgy azért **piros**, mert a fehér fényből főleg a vöröset veri vissza, a többit elnyeli. A fehér test mindent visszaver, a fekete szinte mindent elnyel (ezért melegszik fel nyáron a fekete póló).',
          tip: 'Soha ne nézz közvetlenül a Napba, és nagyítóval vagy távcsővel se! A lencse a fényt a szemedbe gyűjtené, és maradandó károsodást okozhat.'
        }
      ],
      quiz: [
        { q: 'Mekkora áram folyik egy 4,5 V-os laposelemre kapcsolt 9 Ω-os izzón?', options: ['40,5 A', '13,5 A', '2 A', '0,5 A'], answer: 3, explain: 'Ohm törvénye: I = U / R = 4,5 V / 9 Ω = 0,5 A.' },
        { q: 'Melyik anyag szigetelő?', options: ['Réz', 'Porcelán', 'Grafit', 'Sós víz'], answer: 1, explain: 'A porcelán nem vezeti az áramot, ezért készültek belőle régen a villanyoszlopok szigetelői. A réz, a grafit és a sós víz vezető.' },
        { q: 'Mi történik, ha két mágnes északi pólusát közelíted egymáshoz?', options: ['Taszítják egymást', 'Vonzzák egymást', 'Semmi', 'Elveszítik a mágnességüket'], answer: 0, explain: 'Azonos pólusok taszítják, különbözők vonzzák egymást.' },
        { q: 'A tükörre 35°-os beesési szögben érkezik egy fénysugár. Mekkora a visszaverődési szög?', options: ['55°', '70°', '35°', '145°'], answer: 2, explain: 'A visszaverődés törvénye szerint a beesési szög egyenlő a visszaverődési szöggel: 35°.' }
      ]
    }
  ]
});
