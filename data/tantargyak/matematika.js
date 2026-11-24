/* Tantárgy: Matematika */
STUDIE.addSubject({
  id: 'matematika',
  stage: 'kozep',
  title: 'Matematika',
  icon: '➗',
  color: '#7c5cd6',
  description: 'Törtek, százalék, egyenletek, függvények, Pitagorasz: a hétköznapokban is használható matek, lépésről lépésre.',
  intro: 'A matek nem varázslat, hanem **gyakorlás**. Minden leckében kidolgozott példákat találsz, utána pedig kipróbálhatod magad: a gyakorló feladatokból végtelen sok van, a függvényeket pedig csúszkákkal alakíthatod. Ha elakadsz, nézd meg a megoldás lépéseit, és próbáld újra!',
  lessons: [
    {
      id: 'tortek',
      title: 'Törtek: számláló és nevező',
      level: 1, minutes: 12,
      summary: 'Mit jelent egy tört, hogyan bővítünk, egyszerűsítünk, és hogyan adunk össze, szorzunk és osztunk törtekkel.',
      tags: ['tört', 'törtek', 'számláló', 'nevező', 'közös nevező', 'egyszerűsítés', 'bővítés', 'tizedes tört', 'reciprok', 'törtek összeadása'],
      sections: [
        {
          title: 'Mit jelent egy tört?',
          text: 'Egy tört azt mutatja meg, hogy egy egészet hány egyenlő részre osztottunk, és ebből hány részt veszünk. A `3/4` (háromnegyed) például:\n\n- **nevező (4)**: négy egyenlő részre vágtuk a pizzát,\n- **számláló (3)**: ebből három szeletet veszünk el.\n\nA tört valójában egy **osztás**: `3/4 = 3 : 4 = 0,75`. Így lesz a törtből **tizedes tört**.',
          tip: 'Ha a számláló nagyobb a nevezőnél (pl. `7/4`), a tört nagyobb 1-nél. Felírhatod vegyes számként is: `7/4 = 1 egész 3/4`.'
        },
        {
          title: 'Bővítés és egyszerűsítés',
          text: 'Ha a számlálót és a nevezőt **ugyanazzal** a számmal szorzod vagy osztod, a tört értéke nem változik.\n\n- **Bővítés**: `3/4 = 6/8 = 9/12` (2-vel, majd 3-mal szoroztunk)\n- **Egyszerűsítés**: `12/18 = 2/3` (mindkettőt 6-tal osztottuk)\n\nEgyszerűsítéskor a **legnagyobb közös osztóval** érdemes osztani: a 12 és a 18 legnagyobb közös osztója a 6. Ha nem találod meg elsőre, semmi baj: oszthatsz lépésenként is (`12/18 = 6/9 = 2/3`).'
        },
        {
          title: 'Összeadás és kivonás',
          text: 'Csak **azonos nevezőjű** törteket tudunk közvetlenül összeadni: ilyenkor a számlálókat adjuk össze, a nevező marad. `2/7 + 3/7 = 5/7`.\n\nHa a nevezők különböznek, előbb **közös nevezőre** hozzuk őket bővítéssel.\n\n**Kidolgozott példa:** `1/2 + 1/3 = ?`\n\n1. Közös nevező: a 2 és a 3 is megvan a 6-ban.\n2. Bővítünk: `1/2 = 3/6` és `1/3 = 2/6`.\n3. Összeadjuk a számlálókat: `3/6 + 2/6 = 5/6`.\n\nKivonásnál ugyanígy járunk el: `3/4 − 1/6 = 9/12 − 2/12 = 7/12`.',
          warn: 'Gyakori hiba: `1/2 + 1/3 = 2/5`. Ez rossz! A nevezőket soha nem adjuk össze. Gondolj a pizzára: fél pizza meg egy harmad több, mint fél, a 2/5 viszont kevesebb.'
        },
        {
          title: 'Szorzás és osztás',
          text: '**Szorzásnál** egyszerű a dolgod: számlálót a számlálóval, nevezőt a nevezővel szorzod.\n\n`2/3 · 3/5 = 6/15 = 2/5`\n\n**Osztásnál** az osztó **reciprokával** (megfordítottjával) szorzunk:\n\n`3/4 : 1/2 = 3/4 · 2/1 = 6/4 = 3/2 = 1,5`\n\nEz logikus is: hány fél pizza fér bele háromnegyed pizzába? Másfél.',
          widget: { type: 'gyakorlas', options: { kind: 'tortek', title: 'Törtek összeadása – gyakorló' } }
        }
      ],
      quiz: [
        { q: 'Mennyi 1/2 + 1/4?', options: ['3/4', '2/6', '1/6', '2/4'], answer: 0, explain: 'Közös nevező a 4: 2/4 + 1/4 = 3/4.' },
        { q: 'Mivel egyenlő a 12/18 egyszerűsítve?', options: ['2/3', '3/4', '6/8', '4/9'], answer: 0, explain: 'Mindkét számot 6-tal osztjuk: 12 : 6 = 2, 18 : 6 = 3.' },
        { q: 'Mennyi 3/4 : 1/2?', options: ['3/2', '3/8', '1/2', '4/3'], answer: 0, explain: 'Osztás helyett a reciprokkal szorzunk: 3/4 · 2/1 = 6/4 = 3/2.' },
        { q: 'Mennyi a 3/4 tizedes tört alakban?', options: ['0,75', '0,34', '1,33', '0,43'], answer: 0, explain: 'A tört osztás: 3 : 4 = 0,75.' }
      ]
    },
    {
      id: 'szazalek',
      title: 'Százalékszámítás a hétköznapokban',
      level: 1, minutes: 12,
      summary: 'Alap, százalékláb, százalékérték: akciók, ÁFA és kamat kiszámolása fejben és papíron.',
      tags: ['százalék', '%', 'alap', 'százalékláb', 'százalékérték', 'akció', 'kedvezmény', 'ÁFA', 'kamat', 'szorzó'],
      sections: [
        {
          title: 'Mi az a százalék?',
          text: 'A **százalék** (%) századrészt jelent: `1% = 1/100 = 0,01`. Ha azt mondjuk, hogy „egy osztály 25%-a szemüveges”, az azt jelenti, hogy minden 100 diákból 25 (vagyis minden negyedik) hord szemüveget.\n\nHárom fogalmat érdemes megjegyezni:\n\n- **alap**: az egész, amiből számolunk (pl. 8000 Ft),\n- **százalékláb**: hány százalékról van szó (pl. 25%),\n- **százalékérték**: az alap ennyi százaléka (pl. 2000 Ft).\n\nAz összefüggés: `százalékérték = alap · százalékláb / 100`.'
        },
        {
          title: 'Három alapfeladat',
          text: '**1. Mennyi a 8000 Ft 25%-a?** (keressük a százalékértéket)\n\n`1% = 8000 / 100 = 80 Ft`, tehát `25% = 80 · 25 = 2000 Ft`.\n\n**2. Hány százalék 18 a 24-ből?** (keressük a százaléklábat)\n\n`18 / 24 = 0,75`, ez `75%`. (A tizedes törtet 100-zal szorozzuk.)\n\n**3. Minek a 20%-a 300?** (keressük az alapot)\n\nHa `20% = 300`, akkor `1% = 300 / 20 = 15`, tehát az alap `100% = 1500`.',
          tip: 'Fejszámoláshoz: a 10% mindig az egész tizede (csak egy helyiértékkel arrébb tolod a tizedesvesszőt), az 50% a fele, a 25% a negyede, az 5% pedig a 10% fele.'
        },
        {
          title: 'Akció, ÁFA: a szorzós módszer',
          text: 'Ha valami **x%-kal csökken**, az új érték az eredeti `(100 − x)%`-a. Ha **x%-kal nő**, az új érték `(100 + x)%`-a. Ezt egyetlen szorzással kiszámolhatod:\n\n- 20% kedvezmény egy 12 000 Ft-os cipőre: `12 000 · 0,8 = 9600 Ft`\n- 27% ÁFA egy 10 000 Ft-os nettó árra: `10 000 · 1,27 = 12 700 Ft` bruttó ár\n- Visszafelé, a bruttóból a nettó: `12 700 / 1,27 = 10 000 Ft`',
          warn: 'Csapda! Ha egy ár 10%-kal nő, aztán 10%-kal csökken, **nem** kapod vissza az eredetit: `1000 · 1,1 · 0,9 = 990 Ft`. A második 10%-ot már egy nagyobb alapból számoljuk.'
        },
        {
          title: 'Gyakorlás',
          text: 'Számold ki a százalékértéket! Először keresd meg az 1%-ot, utána szorozz.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás – gyakorló' } }
        }
      ],
      quiz: [
        { q: 'Mennyi a 600 Ft 15%-a?', options: ['90 Ft', '60 Ft', '150 Ft', '40 Ft'], answer: 0, explain: '1% = 6 Ft, tehát 15% = 6 · 15 = 90 Ft. (Vagy: 10% = 60, 5% = 30, összesen 90.)' },
        { q: 'Egy 5000 Ft-os pólót 30%-kal leáraznak. Mennyi lesz az új ár?', options: ['3500 Ft', '1500 Ft', '4700 Ft', '3000 Ft'], answer: 0, explain: 'Az új ár az eredeti 70%-a: 5000 · 0,7 = 3500 Ft.' },
        { q: 'Hány százalék 12 a 48-ból?', options: ['25%', '12%', '36%', '40%'], answer: 0, explain: '12 / 48 = 0,25, ez 25%.' },
        { q: 'Egy 1000 Ft-os árat 10%-kal emelnek, majd 10%-kal csökkentenek. Mennyi lesz?', options: ['990 Ft', '1000 Ft', '1010 Ft', '900 Ft'], answer: 0, explain: '1000 · 1,1 = 1100, majd 1100 · 0,9 = 990 Ft. A csökkentés alapja már nagyobb volt.' }
      ]
    },
    {
      id: 'egyenletek',
      title: 'Egyenletek rendezése',
      level: 2, minutes: 14,
      summary: 'A mérlegelv: hogyan találjuk meg az ismeretlent, és hogyan rendezünk át egy képletet.',
      tags: ['egyenlet', 'elsőfokú egyenlet', 'ismeretlen', 'mérlegelv', 'rendezés', 'képlet átrendezése', 'zárójel', 'ellenőrzés', 'x'],
      sections: [
        {
          title: 'A mérlegelv',
          text: 'Egy egyenlet olyan, mint egy **kétkarú mérleg**, ami egyensúlyban van. A bal és a jobb oldal ugyanannyit „nyom”. Ha mindkét oldallal **ugyanazt** csinálod (hozzáadsz, elveszel, szorzol, osztasz nullától különböző számmal), az egyensúly megmarad.\n\nA cél: az `x` maradjon egyedül az egyik oldalon. Ehhez lépésről lépésre „lebontjuk” körülötte a műveleteket, mindig a fordított művelettel.\n\n**Kidolgozott példa:** `3x + 5 = 20`\n\n1. Vonj ki mindkét oldalból 5-öt: `3x = 15`\n2. Ossz el mindkét oldalt 3-mal: `x = 5`\n3. **Ellenőrzés**: `3 · 5 + 5 = 20`. Stimmel!'
        },
        {
          title: 'Ha mindkét oldalon van x',
          text: 'Először gyűjtsd az `x`-es tagokat az egyik oldalra, a számokat a másikra.\n\n**Példa:** `5x − 7 = 2x + 8`\n\n1. Vonj ki mindkét oldalból `2x`-et: `3x − 7 = 8`\n2. Adj hozzá mindkét oldalhoz 7-et: `3x = 15`\n3. Ossz 3-mal: `x = 5`\n\n**Zárójeles példa:** `2(x + 3) = 14`\n\n1. Bontsd fel a zárójelet: `2x + 6 = 14`\n2. Vonj ki 6-ot: `2x = 8`\n3. Ossz 2-vel: `x = 4`\n\n**Törtes példa:** `x/4 + 1 = 3`\n\n1. Vonj ki 1-et: `x/4 = 2`\n2. Szorozz 4-gyel: `x = 8`',
          tip: 'Mindig ellenőrizz! Helyettesítsd vissza a kapott számot az **eredeti** egyenletbe. Ha a két oldal egyenlő, biztosan jó a megoldás.'
        },
        {
          title: 'Képletek átrendezése',
          text: 'Ugyanez a módszer működik a fizikai és szakmai képletekkel is. Az [[#/lecke/villanyszereles/alapfogalmak|Ohm-törvény]] `U = R · I` alakjából például:\n\n- Ha `I` kell: ossz mindkét oldalon `R`-rel → `I = U / R`\n- Ha `R` kell: ossz `I`-vel → `R = U / I`\n\nVagy a sebességnél: `v = s / t`. Ha az út kell, szorozz `t`-vel: `s = v · t`. Ha 90 km/h-val 2 órát mész, `s = 90 · 2 = 180 km`.',
          widget: { type: 'gyakorlas', options: { kind: 'egyenlet', title: 'Egyenletmegoldó gyakorló' } }
        },
        {
          title: 'Képlet-gyakorlás: Ohm-törvény',
          text: 'Itt mindig a megfelelő alakra kell átrendezned az `U = R · I` képletet.',
          widget: { type: 'gyakorlas', options: { kind: 'ohm', title: 'Képletrendezés: U = R · I' } }
        }
      ],
      quiz: [
        { q: 'Mennyi x, ha 4x − 3 = 17?', options: ['5', '3,5', '20', '14'], answer: 0, explain: 'Adj hozzá 3-at: 4x = 20, majd ossz 4-gyel: x = 5.' },
        { q: 'Mennyi x, ha 2(x − 1) = 10?', options: ['6', '5', '4', '11'], answer: 0, explain: 'Zárójelbontás: 2x − 2 = 10, így 2x = 12, x = 6.' },
        { q: 'Hogyan fejezhető ki t a v = s / t képletből?', options: ['t = s / v', 't = v · s', 't = v / s', 't = s − v'], answer: 0, explain: 'Szorozz t-vel: v · t = s, majd ossz v-vel: t = s / v.' },
        { q: 'Mit szabad csinálni egy egyenlet két oldalával?', options: ['Ugyanazt a műveletet mindkét oldalon', 'Csak a bal oldalt változtatni', 'Mindkettőt nullával szorozni', 'Az egyik oldalhoz hozzáadni, a másikból kivonni'], answer: 0, explain: 'A mérlegelv: ha mindkét oldallal ugyanazt teszed (nullával való osztás és szorzás nélkül), az egyenlőség megmarad.' }
      ]
    },
    {
      id: 'linearis-fuggveny',
      title: 'A lineáris függvény',
      level: 2, minutes: 13,
      summary: 'Az y = m·x + b egyenes: meredekség, tengelymetszet, zérushely, és hogyan írja le a hétköznapi helyzeteket.',
      tags: ['függvény', 'lineáris függvény', 'egyenes', 'meredekség', 'tengelymetszet', 'zérushely', 'koordináta-rendszer', 'grafikon', 'y = mx + b'],
      sections: [
        {
          title: 'Mi az a függvény?',
          text: 'Egy **függvény** olyan szabály, ami minden bemenethez (`x`) pontosan egy kimenetet (`y`) rendel. Például: „vedd a számot kétszer, és adj hozzá egyet”. Ezt így írjuk: `y = 2x + 1`.\n\nKészíthetsz **értéktáblázatot**:\n\n- `x = 0` → `y = 1`\n- `x = 1` → `y = 3`\n- `x = 2` → `y = 5`\n\nHa ezeket a pontokat berajzolod egy **koordináta-rendszerbe**, egy egyenesen lesznek. Ezért hívjuk ezt **lineáris** (egyenes) függvénynek.'
        },
        {
          title: 'Meredekség és eltolás',
          text: 'Az `y = m · x + b` alakban két szám dönt el mindent:\n\n- **m (meredekség)**: ennyit lép felfelé az egyenes, ha egyet lépsz jobbra. Ha `m > 0`, az egyenes emelkedik, ha `m < 0`, süllyed, ha `m = 0`, vízszintes.\n- **b (tengelymetszet)**: itt metszi az egyenes az y-tengelyt, a `(0; b)` pontban.\n\nKét pontból kiszámolhatod a meredekséget: `m = (y₂ − y₁) / (x₂ − x₁)`. Az `(1; 3)` és `(4; 9)` pontokon átmenő egyenesre `m = (9 − 3) / (4 − 1) = 6 / 3 = 2`.\n\nA **zérushely** az, ahol az egyenes metszi az x-tengelyt, vagyis ahol `y = 0`. Az `y = 2x + 1` esetén: `2x + 1 = 0`, tehát `x = −0,5`.',
          widget: { type: 'fuggveny', options: { kind: 'linearis' } }
        },
        {
          title: 'Hol találkozol vele?',
          text: 'Mindenhol, ahol van egy **fix rész** és egy **egyenletesen növekvő rész**.\n\n**Példa:** egy képzeletbeli taxi alapdíja 1000 Ft, és kilométerenként 400 Ft-ot számol. A fizetendő összeg: `y = 400x + 1000`, ahol `x` a megtett kilométer.\n\n- 5 km: `400 · 5 + 1000 = 3000 Ft`\n- 12 km: `400 · 12 + 1000 = 5800 Ft`\n\nItt a meredekség (400) a kilométerdíj, a tengelymetszet (1000) az alapdíj. Hasonlóan működik a mobilszámla havidíjjal, vagy egy fogyasztó villanyszámlája az alapdíjjal és a kWh-díjjal.',
          tip: 'A csúszkával állítsd az m-et negatívra: az egyenes ekkor „lejt”. Így írható le például, hogyan fogy a benzin a tankból, ahogy egyre több kilométert mész.'
        }
      ],
      quiz: [
        { q: 'Hol metszi az y-tengelyt az y = 3x − 4 egyenes?', options: ['(0; −4)', '(0; 3)', '(−4; 0)', '(3; 0)'], answer: 0, explain: 'Az y-tengelyen x = 0, ekkor y = −4. Ez épp a b értéke.' },
        { q: 'Mi a zérushelye az y = 2x − 6 függvénynek?', options: ['x = 3', 'x = −6', 'x = 6', 'x = −3'], answer: 0, explain: '2x − 6 = 0, tehát 2x = 6, x = 3.' },
        { q: 'Mekkora a meredeksége a (0; 1) és (2; 7) pontokon átmenő egyenesnek?', options: ['3', '2', '6', '4'], answer: 0, explain: 'm = (7 − 1) / (2 − 0) = 6 / 2 = 3.' },
        { q: 'Milyen az y = −2x + 5 egyenes?', options: ['Csökkenő', 'Növekvő', 'Vízszintes', 'Függőleges'], answer: 0, explain: 'A meredekség negatív (−2), ezért jobbra haladva az egyenes süllyed.' }
      ]
    },
    {
      id: 'pitagorasz',
      title: 'Pitagorasz-tétel',
      level: 2, minutes: 12,
      summary: 'A derékszögű háromszög oldalai közti kapcsolat, és hogyan használja a kőműves, az asztalos vagy a térképész.',
      tags: ['Pitagorasz', 'Pitagorasz-tétel', 'derékszögű háromszög', 'befogó', 'átfogó', 'négyzetgyök', 'számhármas', 'távolság', 'átló'],
      sections: [
        {
          title: 'A tétel',
          text: 'Egy **derékszögű háromszögben** a derékszöget bezáró két oldal a két **befogó** (`a` és `b`), a derékszöggel szemközti, leghosszabb oldal az **átfogó** (`c`).\n\nPitagorasz tétele szerint:\n\n`a² + b² = c²`\n\nVagyis a két befogóra rajzolt négyzet területe együtt ugyanannyi, mint az átfogóra rajzolt négyzeté. A tétel az ókori görög Püthagoraszról kapta a nevét, de a babiloniak már jóval előtte ismerték és használták.',
          widget: { type: 'pitagorasz' }
        },
        {
          title: 'Kidolgozott példák',
          text: '**Létra:** egy 5 m-es létra alja 3 m-re van a faltól. Milyen magasan éri a falat?\n\n`3² + b² = 5²` → `9 + b² = 25` → `b² = 16` → `b = 4 m`\n\n**Képernyőátló:** egy tévé kijelzője 80 cm széles és 45 cm magas. Mekkora az átlója?\n\n`c² = 80² + 45² = 6400 + 2025 = 8425` → `c = √8425 ≈ 91,8 cm`\n\nEz kb. 36 hüvelyk (1 hüvelyk = 2,54 cm), ezért ez egy „36 colos” tévé.\n\n**Távolság a koordináta-rendszerben:** az `(1; 2)` és `(4; 6)` pont között vízszintesen 3, függőlegesen 4 egység a különbség, így a távolság `√(3² + 4²) = √25 = 5`.',
          tip: 'Az átfogó mindig a **leghosszabb** oldal. Ha a számolásod szerint a befogó hosszabb lett, valahol elcserélted az a-t és a c-t.'
        },
        {
          title: 'A 3–4–5 szabály a gyakorlatban',
          text: 'A tétel **megfordítva** is igaz: ha egy háromszög oldalaira `a² + b² = c²`, akkor a háromszög derékszögű. A kőművesek és ácsok ezt régóta használják: kimérnek 60 cm-t az egyik irányba, 80 cm-t a másikba, és ha a két pont távolsága pontosan 100 cm, a sarok derékszögű (`60² + 80² = 3600 + 6400 = 10 000 = 100²`).\n\nAz olyan egész számokat, amelyekre teljesül a tétel, **pitagoraszi számhármasoknak** hívjuk:\n\n- 3, 4, 5\n- 5, 12, 13\n- 8, 15, 17\n- 6, 8, 10 (ez a 3, 4, 5 kétszerese)'
        }
      ],
      quiz: [
        { q: 'Mekkora az átfogó, ha a befogók 6 és 8 egység hosszúak?', options: ['10', '14', '12', '48'], answer: 0, explain: '6² + 8² = 36 + 64 = 100, és √100 = 10.' },
        { q: 'Melyik oldal az átfogó?', options: ['A derékszöggel szemközti oldal', 'A legrövidebb oldal', 'Bármelyik oldal', 'A derékszög melletti oldalak egyike'], answer: 0, explain: 'Az átfogó a derékszöggel szemközt van, és mindig a leghosszabb.' },
        { q: 'Egy 13 m-es kötél egyik vége a földön, 5 m-re van egy oszlop aljától, a másik az oszlop tetején. Milyen magas az oszlop?', options: ['12 m', '8 m', '18 m', '√194 m'], answer: 0, explain: '5² + b² = 13², 25 + b² = 169, b² = 144, b = 12 m.' },
        { q: 'Derékszögű-e az a háromszög, amelynek oldalai 7, 8 és 11?', options: ['Nem', 'Igen', 'Csak ha egyenlő szárú', 'Nem lehet eldönteni'], answer: 0, explain: '7² + 8² = 49 + 64 = 113, de 11² = 121. Mivel nem egyenlők, a háromszög nem derékszögű.' }
      ]
    },
    {
      id: 'masodfoku',
      title: 'Másodfokú függvény és egyenlet',
      level: 3, minutes: 18,
      summary: 'A parabola, a diszkrimináns és a megoldóképlet: így oldasz meg bármilyen másodfokú egyenletet.',
      tags: ['másodfokú', 'másodfokú egyenlet', 'parabola', 'megoldóképlet', 'diszkrimináns', 'csúcspont', 'zérushely', 'gyöktényezős alak', 'Viète-formulák', 'x²'],
      sections: [
        {
          title: 'A parabola',
          text: 'A **másodfokú függvény** általános alakja `y = a·x² + b·x + c`, ahol `a ≠ 0`. A grafikonja egy **parabola**.\n\n- Ha `a > 0`, a parabola felfelé nyílik (mint egy mosolygó száj), a csúcspontja a legalacsonyabb pont.\n- Ha `a < 0`, lefelé nyílik, a csúcspont a legmagasabb pont.\n- Minél nagyobb `a` abszolút értéke, annál keskenyebb a parabola.\n\nA **csúcspont** x-koordinátája: `x = −b / (2a)`. Ezt visszahelyettesítve kapod az y-koordinátát.\n\nParabola alakú pályán repül egy eldobott labda, és ilyen alakú a műholdvevő antenna metszete is.',
          widget: { type: 'fuggveny', options: { kind: 'masodfoku' } }
        },
        {
          title: 'A megoldóképlet',
          text: 'Az `a·x² + b·x + c = 0` egyenlet megoldásai (gyökei) ott vannak, ahol a parabola metszi az x-tengelyt. Ezeket a **megoldóképlet** adja meg:\n\n`x₁,₂ = (−b ± √(b² − 4ac)) / (2a)`\n\nA gyökjel alatti kifejezés a **diszkrimináns**: `D = b² − 4ac`. Ez előre megmondja, hány megoldás van:\n\n- `D > 0`: **két** különböző valós megoldás,\n- `D = 0`: **egy** megoldás (a parabola csúcsa épp az x-tengelyen van),\n- `D < 0`: **nincs** valós megoldás (a parabola nem éri el az x-tengelyt).',
          warn: 'A leggyakoribb hiba az előjel. Ha `b = −5`, akkor `−b = 5`, és `b² = 25` (nem −25!). Mindig írd ki zárójelben: `(−5)² = 25`.'
        },
        {
          title: 'Kidolgozott példák',
          text: '**1. példa:** `x² − 5x + 6 = 0`\n\nItt `a = 1`, `b = −5`, `c = 6`.\n\n1. Diszkrimináns: `D = (−5)² − 4 · 1 · 6 = 25 − 24 = 1`\n2. Megoldóképlet: `x = (5 ± √1) / 2 = (5 ± 1) / 2`\n3. Gyökök: `x₁ = 6 / 2 = 3` és `x₂ = 4 / 2 = 2`\n4. Ellenőrzés: `3² − 5 · 3 + 6 = 9 − 15 + 6 = 0`. Stimmel!\n\n**2. példa:** `x² + 2x + 1 = 0`. Itt `D = 4 − 4 = 0`, így egyetlen gyök van: `x = −2 / 2 = −1`.\n\n**3. példa:** `x² + x + 1 = 0`. Itt `D = 1 − 4 = −3 < 0`, tehát nincs valós megoldás.\n\n**Hiányos egyenlet:** a `2x² − 8 = 0` megoldásához nem kell a képlet: `x² = 4`, tehát `x = 2` vagy `x = −2`.'
        },
        {
          title: 'Gyöktényezős alak és egy fizikai példa',
          text: 'Ha ismered a gyököket, az egyenlet szorzatként is felírható: `x² − 5x + 6 = (x − 2)(x − 3)`. Ez a **gyöktényezős alak**. Egy szorzat akkor nulla, ha valamelyik tényezője nulla, innen is látszik, hogy a gyökök 2 és 3.\n\nA **Viète-formulák** gyors ellenőrzést adnak: `x₁ + x₂ = −b / a` és `x₁ · x₂ = c / a`. Az első példában `2 + 3 = 5` és `2 · 3 = 6`. Stimmel!\n\n**Fizikai példa:** egy függőlegesen feldobott labda magassága (méterben) közelítőleg `h = 20t − 5t²`, ahol `t` az idő másodpercben. Mikor ér vissza a földre? `20t − 5t² = 0` → `5t(4 − t) = 0` → `t = 0` (elindul) vagy `t = 4 s` (leér). A legmagasabb pont a kettő között félúton van: `t = 2 s`-nál `h = 40 − 20 = 20 m`.',
          tip: 'A csúszkákkal fent kipróbálhatod: állítsd be `a = 1`, `b = −5`, `c = 6` értékekre, és nézd meg, hogy a zérushelyek tényleg 2 és 3!'
        }
      ],
      quiz: [
        { q: 'Mennyi a diszkrimináns az x² − 4x + 4 = 0 egyenletben?', options: ['0', '32', '−16', '8'], answer: 0, explain: 'D = (−4)² − 4 · 1 · 4 = 16 − 16 = 0, tehát egy megoldás van: x = 2.' },
        { q: 'Melyek az x² − 7x + 10 = 0 egyenlet megoldásai?', options: ['2 és 5', '−2 és −5', '1 és 10', '3 és 4'], answer: 0, explain: 'D = 49 − 40 = 9, x = (7 ± 3) / 2, tehát 5 és 2. Ellenőrzés: 2 + 5 = 7, 2 · 5 = 10.' },
        { q: 'Hány valós megoldása van egy másodfokú egyenletnek, ha D < 0?', options: ['Nincs', 'Egy', 'Kettő', 'Végtelen sok'], answer: 0, explain: 'Negatív számból nem vonhatunk valós négyzetgyököt: a parabola nem metszi az x-tengelyt.' },
        { q: 'Merre nyílik az y = −2x² + 3 parabola?', options: ['Lefelé', 'Felfelé', 'Jobbra', 'Ez nem parabola'], answer: 0, explain: 'Az x² együtthatója (a = −2) negatív, ezért a parabola lefelé nyílik, és a csúcspontja (0; 3) a legmagasabb pontja.' }
      ]
    }
  ]
});
