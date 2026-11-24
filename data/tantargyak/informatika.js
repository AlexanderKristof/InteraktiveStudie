/* Tantárgy: Informatika
 * Megjegyzés: a Python-kódban a behúzást a kódsorok elején nem törhető szóközök (\u00a0) adják,
 * mert a szövegjelölés a sorok elején álló sima szóközöket levágja. */
STUDIE.addSubject({
  id: 'informatika',
  stage: 'kozep',
  title: 'Informatika',
  icon: '💻',
  color: '#2f7bf6',
  description: 'Hogyan működik a számítógép, mit jelent a bit, hogyan gondolkodik egy algoritmus, és hogyan maradsz biztonságban a neten.',
  intro: 'A számítógép nem okos, csak **nagyon gyors és nagyon pontos**: pontosan azt csinálja, amit mondunk neki. Ebben a tantárgyban megnézed, mi van a gépházban, hogyan lesz a betűkből és képekből egyes meg nulla, hogyan írj algoritmust és egyszerű Python-programot, hogyan jut el egy weboldal hozzád, és hogyan véded meg az adataidat. A kódpéldákat bátran próbáld ki egy Python-értelmezőben!',
  lessons: [
    {
      id: 'szamitogep',
      title: 'Hogyan működik a számítógép?',
      level: 1, minutes: 12,
      summary: 'Hardver és szoftver, a gép fő részei, a Neumann-elvek és az utasítás-végrehajtás ciklusa.',
      tags: ['hardver', 'szoftver', 'Neumann-elvek', 'Neumann János', 'processzor', 'CPU', 'memória', 'RAM', 'háttértár', 'SSD', 'alaplap', 'operációs rendszer', 'perifériák', 'számítástechnika története'],
      models: ['alaplap', 'processzor'],
      sections: [
        {
          title: 'Bemenet, feldolgozás, kimenet',
          text: 'Minden számítógép, a telefonodtól a szerverig, ugyanazt csinálja: **adatot fogad, feldolgozza, és eredményt ad**.\n\n- **Bemenet (input)**: billentyűzet, egér, érintőképernyő, mikrofon, kamera, szenzorok.\n- **Feldolgozás**: a processzor számol, a memória tárolja az épp használt adatokat.\n- **Kimenet (output)**: kijelző, hangszóró, nyomtató.\n- **Tárolás**: a háttértár (SSD, merevlemez) kikapcsolás után is megőrzi a fájlokat.\n\nA kézzel fogható részek a **hardver**, a rajtuk futó programok a **szoftver**. Az **operációs rendszer** (Windows, macOS, Linux, Android, iOS) a kettő közötti „karmester”: elosztja a processzoridőt és a memóriát a programok között, és kezeli az eszközöket.'
        },
        {
          title: 'Mi van a gépházban?',
          text: 'Az [[alaplap|alaplap]] köti össze az alkatrészeket: rajta futnak a vezetősávok, ebbe dugjuk a többi elemet.\n\n- **Processzor (CPU)**: a gép „agya”, másodpercenként milliárdnyi egyszerű utasítást hajt végre. Nézd meg belülről: [[processzor|processzor]].\n- **Memória (RAM)**: gyors, de **felejtő** tár. Itt vannak a futó programok és az épp használt adatok. Kikapcsoláskor törlődik.\n- **Háttértár (SSD, HDD)**: lassabb, de **nem felejtő**, itt vannak a fájljaid és a telepített programok.\n- **Videokártya (GPU)**: rengeteg egyszerű számolást végez párhuzamosan, ezért jó grafikához és mesterséges intelligenciához.\n- **Tápegység**: a hálózati feszültségből a gép számára kis egyenfeszültségeket állít elő.',
          tip: 'Hasonlat: a processzor a szakács, a RAM a munkapult, a háttértár a kamra. Ha kicsi a munkapult, a szakács folyton a kamrába szaladgál, és lassú lesz a főzés.'
        },
        {
          title: 'A Neumann-elvek',
          text: 'A magyar származású **Neumann János** 1945-ben foglalta össze, hogyan érdemes egy számítógépet felépíteni. Ezek az elvek ma is szinte minden gépben érvényesek:\n\n1. **Kettes számrendszer**: a gép minden adatot és utasítást 0-k és 1-esek sorozataként tárol.\n2. **Teljesen elektronikus működés**: nincsenek mozgó mechanikus számolóelemek.\n3. **Tárolt program elve**: a program és az adatok **ugyanabban a memóriában** vannak, így a program cserélhető, nem kell átkábelezni a gépet.\n4. **Soros utasítás-végrehajtás**: az utasítások egymás után, sorban hajtódnak végre.\n5. **Univerzális gép, öt fő egységgel**: vezérlőegység, aritmetikai-logikai egység (ALU), memória, bemeneti és kimeneti egységek.\n\nA vezérlőegység és az ALU együtt alkotja a mai **processzort**.'
        },
        {
          title: 'Az utasítás-végrehajtás ciklusa',
          text: 'A processzor egy egyszerű körforgást ismétel, másodpercenként több milliárdszor:\n\n1. **Lehívás (fetch)**: kiolvassa a memóriából a következő utasítást.\n2. **Értelmezés (decode)**: megállapítja, mit kell tenni (pl. összeadás, adatmozgatás, ugrás).\n3. **Végrehajtás (execute)**: az ALU elvégzi a műveletet, az eredmény egy regiszterbe vagy a memóriába kerül.\n\nA ciklus ütemét az **órajel** adja. Egy 3 GHz-es processzor órája másodpercenként 3 milliárdot „üt”.',
          tip: 'A gyorsaság nem csak az órajelen múlik: számít a magok száma, a gyorsítótár (cache) mérete, és hogy egy órajel alatt hány utasítással végez a mag.'
        },
        {
          title: 'A számítástechnika rövid története',
          text: 'Az első elektronikus gépek egy egész termet elfoglaltak. Ma a zsebedben többszázezerszer nagyobb számítási teljesítmény van. Kattints az évszámokra!',
          widget: { type: 'idovonal', options: { title: 'A számítógép útja', events: [
            { year: 1945, label: '1945', title: 'ENIAC és a Neumann-elvek', text: 'Elkészül az ENIAC, az egyik első elektronikus, általános célú számítógép (kb. 18 000 elektroncső, 27 tonna). Ugyanebben az évben Neumann János leírja a tárolt programú gép elvét.' },
            { year: 1947, label: '1947', title: 'A tranzisztor', text: 'A Bell Laboratóriumban feltalálják a tranzisztort. Kisebb, gyorsabb és megbízhatóbb, mint az elektroncső.' },
            { year: 1958, label: '1958', title: 'Az integrált áramkör', text: 'Jack Kilby több alkatrészt épít egyetlen félvezető lapkára. Ebből lesz a mai chip.' },
            { year: 1964, label: '1964', title: 'BASIC', text: 'A magyar származású Kemény János és Thomas Kurtz megalkotja a BASIC nyelvet, hogy diákok is programozhassanak.' },
            { year: 1969, label: '1969', title: 'ARPANET', text: 'Összekapcsolják az ARPANET első gépeit. Ebből a hálózatból nő ki később az internet.' },
            { year: 1971, label: '1971', title: 'Az első mikroprocesszor', text: 'Az Intel 4004 az első kereskedelmi mikroprocesszor: egy teljes processzor egyetlen chipen, kb. 2300 tranzisztorral.' },
            { year: 1981, label: '1981', title: 'IBM PC', text: 'Megjelenik az IBM személyi számítógépe. A „PC” szabvánnyá válik az irodákban és az otthonokban.' },
            { year: 1991, label: '1991', title: 'A világháló (WWW)', text: 'Tim Berners-Lee a CERN-ben nyilvánossá teszi a World Wide Webet: weboldalak, linkek, böngésző.' },
            { year: 2007, label: '2007', title: 'Az okostelefon', text: 'Megjelenik az iPhone, majd az első androidos telefonok. A számítógép a zsebünkbe kerül.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi történik a RAM tartalmával, ha kikapcsolod a gépet?', options: ['Elvész, mert a RAM felejtő tár', 'Megmarad, mint az SSD-n', 'Átmásolódik a processzorba', 'Kinyomtatódik'], answer: 0, explain: 'A RAM gyors, de csak áram alatt tárol. A fájlokat ezért a háttértárra kell menteni.' },
        { q: 'Mit mond ki a tárolt program elve?', options: ['A programot nyomtatva kell tárolni', 'A program és az adatok ugyanabban a memóriában vannak', 'A programot csak egyszer lehet futtatni', 'Minden programnak saját gépe van'], answer: 1, explain: 'Ezért lehet a gépet átkábelezés nélkül új feladatra „átprogramozni”: csak egy másik programot kell betölteni.' },
        { q: 'Melyik eszköz kimeneti (output) eszköz?', options: ['Billentyűzet', 'Mikrofon', 'Hangszóró', 'Webkamera'], answer: 2, explain: 'A hangszóró a gépből ad ki információt. A többi bemeneti eszköz.' },
        { q: 'Mi a három lépés, amit a processzor újra és újra ismétel?', options: ['Mentés, nyomtatás, törlés', 'Lehívás, értelmezés, végrehajtás', 'Bekapcsolás, futás, kikapcsolás', 'Letöltés, telepítés, frissítés'], answer: 1, explain: 'Fetch–decode–execute: kiolvassa az utasítást, megfejti, majd végrehajtja.' }
      ]
    },
    {
      id: 'szamrendszerek',
      title: 'Bitek, bájtok, számrendszerek',
      level: 2, minutes: 15,
      summary: 'Hogyan lesz minden adatból 0 és 1: kettes és tizenhatos számrendszer, karakterkódolás, képek pixelei.',
      tags: ['bit', 'bájt', 'byte', 'kettes számrendszer', 'bináris', 'tizenhatos számrendszer', 'hexadecimális', 'átváltás', 'ASCII', 'UTF-8', 'Unicode', 'pixel', 'RGB', 'felbontás', 'kilobájt', 'megabájt'],
      sections: [
        {
          title: 'Bit és bájt',
          text: 'A **bit** a legkisebb információegység: értéke 0 vagy 1 (ki vagy be, nincs áram vagy van áram). Egy bittel 2 dolgot lehet megkülönböztetni, két bittel 4-et, három bittel 8-at: **n bittel 2ⁿ** különböző értéket.\n\n- **1 bájt (B) = 8 bit**, ezzel 2⁸ = **256** különböző érték írható le (0–255).\n- **1 kilobájt (kB) = 1000 bájt**, 1 MB = 1000 kB, 1 GB = 1000 MB, 1 TB = 1000 GB.\n- A kettes alapú egységek: **1 KiB (kibibájt) = 1024 bájt**, 1 MiB = 1024 KiB. Ezért mutat a gép a „500 GB-os” lemezre kevesebbet: a gyártó 1000-rel, az operációs rendszer gyakran 1024-gyel számol.',
          tip: 'Figyelj a kis és nagy b-re! Az internet sebességét **bit**/másodpercben adják meg (Mbit/s), a fájlméretet **bájtban** (MB). Egy 100 Mbit/s-os net kb. 12,5 MB-ot tölt le másodpercenként.'
        },
        {
          title: 'A kettes számrendszer',
          text: 'A tízes számrendszerben a helyiértékek 10 hatványai (egyes, tízes, százas…). A **kettes (bináris)** számrendszerben a helyiértékek **2 hatványai**, és csak két számjegy van: 0 és 1.\n\n`128 | 64 | 32 | 16 | 8 | 4 | 2 | 1`\n\n**Kettesből tízesbe**: összeadjuk azokat a helyiértékeket, ahol 1-es áll.\n`1011₂ = 8 + 0 + 2 + 1 = 11`\n\n**Tízesből kettesbe**: sorban osztunk 2-vel, és a maradékokat **alulról felfelé** olvassuk.\n\n- `13 : 2 = 6`, maradék **1**\n- `6 : 2 = 3`, maradék **0**\n- `3 : 2 = 1`, maradék **1**\n- `1 : 2 = 0`, maradék **1**\n\nAlulról felfelé olvasva: `13 = 1101₂`. Ellenőrzés: 8 + 4 + 1 = 13.'
        },
        {
          title: 'A tizenhatos (hexadecimális) számrendszer',
          text: 'A hosszú bitsorokat nehéz olvasni, ezért a programozók gyakran a **tizenhatos** számrendszert használják. Számjegyei: 0–9, majd **A = 10, B = 11, C = 12, D = 13, E = 14, F = 15**.\n\nA nagy előnye: **egy hexa számjegy pontosan 4 bit**. Így egy bájt mindig két hexa jegy.\n\n- `1111 1111₂ = FF₁₆ = 255`\n- `0010 1010₂ = 2A₁₆ = 2 · 16 + 10 = 42`\n- `200 = 12 · 16 + 8`, tehát `200 = C8₁₆`\n\nPythonban kipróbálhatod: `bin(13)` eredménye `\'0b1101\'`, `hex(200)` eredménye `\'0xc8\'`, `int("1011", 2)` pedig `11`.',
          tip: 'Hexa számokkal találkozol a webes színkódokban (`#FF0000` = piros), a MAC-címekben és a hibaüzenetekben is.'
        },
        {
          title: 'Gyakorlás',
          text: 'Válts át, amíg rá nem jön a kezed! Kettesbe váltásnál a vezető nullákat nem kell beírnod.',
          widget: { type: 'gyakorlas', options: { kind: 'szamrendszer', title: 'Számrendszer-átváltó gyakorló' } }
        },
        {
          title: 'Hogyan lesz a betűből szám?',
          text: 'A gép minden karaktert egy számmal tárol. Hogy melyik betűhöz melyik szám tartozik, azt a **karakterkódolás** mondja meg.\n\n- **ASCII**: 7 bites, 128 karakter: angol betűk, számjegyek, írásjelek. Például `A = 65`, `a = 97`, `0 = 48`, szóköz = 32. Ékezetes betű (ő, ű) nincs benne.\n- **Unicode**: a világ szinte összes írásjelét tartalmazza (magyar ékezetek, cirill, kínai, emoji), több mint 150 000 karaktert.\n- **UTF-8**: a Unicode leggyakoribb tárolási módja. Az ASCII-karakterek 1 bájtot foglalnak, az ékezetes betűk (pl. á, ő) 2 bájtot, sok ázsiai írásjel 3-at, az emojik 4-et.\n\nPythonban: `ord("A")` eredménye `65`, `chr(97)` eredménye `\'a\'`.',
          warn: 'Ha egy szöveget rossz kódolással nyitsz meg, „krix-kraxok” jelennek meg (pl. „ĂˇrvĂ­ztĹ±rĹ‘” az „árvíztűrő” helyett). Ilyenkor a fájl kódolását kell UTF-8-ra állítani.'
        },
        {
          title: 'Képek: pixelek és színek',
          text: 'Egy digitális kép apró képpontokból, **pixelekből** áll. Minden pixel színét három szám adja meg: a **vörös, zöld és kék (RGB)** fény erőssége, mindegyik 0–255 között, azaz 1-1 bájton.\n\n- `(255, 0, 0)` piros, `(0, 0, 0)` fekete, `(255, 255, 255)` fehér, `(255, 255, 0)` sárga.\n- Egy pixel így 3 bájt = 24 bit, ezzel 2²⁴ ≈ **16,7 millió** szín írható le.\n\nEgy **1920 × 1080** pixeles (Full HD) kép tömörítés nélkül: `1920 · 1080 · 3 = 6 220 800 bájt`, kb. 6,2 MB. A JPEG és PNG formátumok ezt **tömörítéssel** jóval kisebbre csökkentik.',
          tip: 'A JPEG **veszteséges** tömörítés (apró részletek elvesznek, fotókhoz jó), a PNG **veszteségmentes** (ábrákhoz, szöveges képekhez jobb).'
        }
      ],
      quiz: [
        { q: 'Hány különböző érték írható le 1 bájttal?', options: ['8', '16', '256', '1000'], answer: 2, explain: '1 bájt = 8 bit, és 2⁸ = 256 (0-tól 255-ig).' },
        { q: 'Mennyi a 1011₂ tízes számrendszerben?', options: ['11', '13', '1011', '9'], answer: 0, explain: '8 + 0 + 2 + 1 = 11.' },
        { q: 'Hány bitet ír le egy hexadecimális számjegy?', options: ['2', '4', '8', '16'], answer: 1, explain: '16 = 2⁴, így egy hexa jegy pontosan 4 bitnek felel meg.' },
        { q: 'Melyik kódolás tartalmazza a magyar ékezetes betűket és az emojikat is?', options: ['Csak az ASCII', 'A 7 bites ASCII', 'Az UTF-8 (Unicode)', 'Egyik sem'], answer: 2, explain: 'Az ASCII csak 128 alapkaraktert ismer, a Unicode (UTF-8) szinte mindent.' },
        { q: 'Milyen színt jelent az RGB (0, 0, 255)?', options: ['Pirosat', 'Kéket', 'Zöldet', 'Fehéret'], answer: 1, explain: 'Csak a harmadik, kék összetevő maximális.' }
      ]
    },
    {
      id: 'algoritmusok',
      title: 'Algoritmusok: lépésről lépésre',
      level: 2, minutes: 15,
      summary: 'Mi az algoritmus, a három alapszerkezet (szekvencia, elágazás, ciklus), folyamatábra, pszeudokód, keresés és rendezés.',
      tags: ['algoritmus', 'szekvencia', 'elágazás', 'ciklus', 'folyamatábra', 'pszeudokód', 'mondatszerű leírás', 'lineáris keresés', 'bináris keresés', 'rendezés', 'buborékrendezés', 'kiválasztásos rendezés', 'hatékonyság'],
      sections: [
        {
          title: 'Mi az algoritmus?',
          text: 'Az **algoritmus** egy feladat megoldásának pontos, lépésenkénti leírása. Egy jó algoritmus:\n\n- **egyértelmű**: minden lépésnél pontosan tudni, mi a teendő,\n- **véges**: véges sok lépés után befejeződik,\n- **általános**: nem csak egyetlen esetre, hanem egy egész feladattípusra működik,\n- **van bemenete és kimenete**: adatokból eredményt állít elő.\n\nA hétköznapokban is tele vagyunk algoritmusokkal: egy recept, egy bútor összeszerelési útmutatója vagy az, ahogyan reggel elkészülsz.',
          tip: 'Próbáld ki: írd le egy barátodnak, hogyan kell egy szendvicset csinálni, és ő **pontosan** azt csinálja, amit írtál. Gyorsan kiderül, mennyi minden „magától értetődő” a fejünkben, ami egy gépnek nem az.'
        },
        {
          title: 'A három alapszerkezet',
          text: 'Bebizonyították, hogy **minden** algoritmus felépíthető három szerkezetből:\n\n- **Szekvencia (sorozat)**: a lépések egymás után következnek. „Vedd ki a kenyeret. Vágj le egy szeletet.”\n- **Elágazás (szelekció)**: egy feltételtől függően más-más történik. „**Ha** esik az eső, **akkor** vigyél esernyőt, **különben** napszemüveget.”\n- **Ciklus (iteráció)**: egy lépéssorozat ismétlődik. „**Amíg** van mosatlan, mosogass el egy tányért.”\n\nA ciklusoknak két gyakori fajtája: az **elöltesztelő** (először ellenőrzi a feltételt, lehet, hogy egyszer sem fut le) és a **számlálós** (előre tudjuk, hányszor kell ismételni).'
        },
        {
          title: 'Folyamatábra és pszeudokód',
          text: 'Az algoritmust lerajzolhatjuk **folyamatábrával**:\n\n- **ovális**: start és stop,\n- **téglalap**: utasítás (pl. `összeg = összeg + x`),\n- **rombusz**: feltétel, igen és nem kimenettel,\n- **paralelogramma**: bemenet vagy kimenet (beolvasás, kiírás),\n- **nyilak**: a végrehajtás iránya.\n\nVagy leírhatjuk **pszeudokóddal** (mondatszerű leírással), ami programnyelv-független. Például a számok átlaga:\n\n1. `összeg := 0`, `db := 0`\n2. `Ciklus amíg van még szám:`\n3. `\u00a0\u00a0\u00a0\u00a0Be: x`\n4. `\u00a0\u00a0\u00a0\u00a0összeg := összeg + x;  db := db + 1`\n5. `Ciklus vége`\n6. `Ha db > 0 akkor Ki: összeg / db, különben Ki: "nincs adat"`'
        },
        {
          title: 'Keresés: lineáris és bináris',
          text: '**Lineáris keresés**: az elejétől sorban megnézzük az elemeket, amíg meg nem találjuk a keresettet (vagy el nem fogynak). Bármilyen listán működik, de 1 millió elemnél akár 1 millió lépés is kellhet.\n\n**Bináris (logaritmikus) keresés**: csak **rendezett** listán működik, mint egy telefonkönyvben vagy szótárban.\n\n1. Nézd meg a lista **középső** elemét.\n2. Ha ez a keresett, kész.\n3. Ha a keresett kisebb, a lista bal felében folytasd, ha nagyobb, a jobb felében.\n4. Ismételd, amíg a vizsgált rész el nem fogy.\n\nMinden lépés megfelezi a lehetőségeket: 1000 elemnél legfeljebb kb. **10**, 1 millió elemnél legfeljebb kb. **20** lépés elég (mert 2¹⁰ = 1024 és 2²⁰ ≈ 1 millió).',
          tip: 'Ez a „gondoltam egy számot 1 és 100 között” játék nyerő stratégiája: mindig a középsőt tippeld, és legfeljebb 7 kérdésből kitalálod.'
        },
        {
          title: 'Rendezés',
          text: 'Rendezni sokféleképpen lehet. Két egyszerű módszer:\n\n**Kiválasztásos rendezés**: megkeressük a legkisebb elemet, és az első helyre tesszük; aztán a maradékból a legkisebbet a második helyre, és így tovább.\n\n**Buborékrendezés**: végigmegyünk a listán, és ha két **szomszédos** elem rossz sorrendben van, megcseréljük őket. Egy kör után a legnagyobb elem a végére „buborékol”. Addig ismételjük, amíg egy teljes körben nincs csere.\n\nPélda buborékrendezésre, első kör: `[5, 1, 4, 2]`\n\n- 5 és 1 csere → `[1, 5, 4, 2]`\n- 5 és 4 csere → `[1, 4, 5, 2]`\n- 5 és 2 csere → `[1, 4, 2, 5]` (az 5 a helyére került)\n\nEzek az egyszerű módszerek n elemre nagyjából **n²** összehasonlítást végeznek. A gyors rendezések (pl. összefésülő, gyorsrendezés) kb. **n · log₂ n** lépéssel dolgoznak, ami nagy listáknál óriási különbség.',
          warn: 'Bináris keresés **rendezetlen** listán hibás eredményt adhat! Előbb rendezni kell.'
        }
      ],
      quiz: [
        { q: 'Melyik NEM a három algoritmikus alapszerkezet egyike?', options: ['Szekvencia', 'Elágazás', 'Ciklus', 'Tömörítés'], answer: 3, explain: 'A három alapszerkezet a szekvencia, az elágazás és a ciklus. A tömörítés egy feladat, nem szerkezet.' },
        { q: 'Mi a feltétele a bináris keresésnek?', options: ['A lista legyen rendezett', 'A lista legyen rövid', 'Csak számokat tartalmazhat', 'Páros számú elem legyen'], answer: 0, explain: 'Csak rendezett listán tudjuk eldönteni, melyik felében kell tovább keresni.' },
        { q: 'Milyen alakzat jelöli a feltételt a folyamatábrán?', options: ['Ovális', 'Téglalap', 'Rombusz', 'Kör'], answer: 2, explain: 'A rombuszból két kimenet indul: igen és nem.' },
        { q: 'Legfeljebb kb. hány lépés kell bináris kereséssel 1000 rendezett elem közt?', options: ['10', '100', '500', '1000'], answer: 0, explain: '2¹⁰ = 1024 ≥ 1000, így kb. 10 felezés elég.' }
      ]
    },
    {
      id: 'programozas',
      title: 'A programozás alapjai Pythonban',
      level: 2, minutes: 18,
      summary: 'Változók, adattípusok, feltételek, ciklusok, listák és függvények rövid Python-példákon.',
      tags: ['programozás', 'Python', 'változó', 'adattípus', 'int', 'float', 'str', 'bool', 'if', 'else', 'for', 'while', 'range', 'lista', 'függvény', 'def', 'return', 'print', 'input'],
      sections: [
        {
          title: 'Az első program',
          text: 'A **Python** egyszerű, jól olvasható programozási nyelv, ezért sok iskolában ezzel kezdenek. Az első programod:\n\n`print("Szia, világ!")`\n\nA `print` kiírja a zárójelben lévő értéket. Adatot a felhasználótól az `input` kér be:\n\n`nev = input("Hogy hívnak? ")`\n`print("Szia,", nev)`\n\nA program sorról sorra, felülről lefelé fut le: ez a **szekvencia**.',
          tip: 'Pythont kipróbálhatsz telepítés nélkül is, például egy online Python-értelmezőben, vagy telepítsd a python.org-ról. A `#` jel után írt szöveg **megjegyzés**, a gép figyelmen kívül hagyja.'
        },
        {
          title: 'Változók és adattípusok',
          text: 'A **változó** egy névvel ellátott „doboz”, amiben értéket tárolunk. Az `=` jel itt **értékadás**, nem egyenlőség!\n\n`kor = 15`\n`kor = kor + 1`  `# most már 16`\n\nA leggyakoribb **adattípusok**:\n\n- **int** (egész szám): `42`, `-7`\n- **float** (valós, tizedes tört): `3.14` (Pythonban **pont** a tizedesjel!)\n- **str** (szöveg, string): `"alma"`\n- **bool** (logikai érték): `True` vagy `False`\n\nAz `input` mindig szöveget ad vissza. Ha számolni akarsz vele, alakítsd át: `kor = int(input("Hány éves vagy? "))`.',
          warn: 'A `"5" + "3"` eredménye `"53"` (két szöveg összefűzése), az `5 + 3` eredménye `8`. Ha összeadásnál furcsa eredményt kapsz, nézd meg a típusokat!'
        },
        {
          title: 'Műveletek',
          text: '- `+`, `-`, `*`, `/`: összeadás, kivonás, szorzás, osztás. A `/` mindig valós számot ad: `7 / 2` → `3.5`.\n- `//`: egészosztás: `7 // 2` → `3`.\n- `%`: maradék: `7 % 2` → `1`. Ezzel lehet páros-páratlant vizsgálni.\n- Hatványozás: `pow(2, 10)` → `1024`.\n- Összehasonlítás: `==` (egyenlő-e), `!=` (nem egyenlő), `<`, `>`, `<=`, `>=`. Eredményük `True` vagy `False`.\n- Logikai műveletek: `and`, `or`, `not`.'
        },
        {
          title: 'Elágazás: if, elif, else',
          text: 'Pythonban a **behúzás** (általában 4 szóköz) jelöli, melyik utasítás tartozik az elágazás vagy a ciklus belsejébe. A feltétel végén kettőspont áll.\n\n`pont = 73`\n`if pont >= 80:`\n`\u00a0\u00a0\u00a0\u00a0print("jeles")`\n`elif pont >= 60:`\n`\u00a0\u00a0\u00a0\u00a0print("jó")`\n`else:`\n`\u00a0\u00a0\u00a0\u00a0print("gyakorolj még")`\n\nEz a program a `jó` szót írja ki: az első feltétel hamis, a második igaz, így a többi ágat már meg sem nézi.'
        },
        {
          title: 'Ciklusok: for és while',
          text: 'A **for** ciklus egy sorozat elemein megy végig. A `range(5)` a 0, 1, 2, 3, 4 számokat adja (az 5-öt már **nem**!):\n\n`for i in range(5):`\n`\u00a0\u00a0\u00a0\u00a0print(i)`\n\nA **while** ciklus addig ismétel, amíg a feltétel igaz:\n\n`n = 1`\n`while n < 100:`\n`\u00a0\u00a0\u00a0\u00a0n = n * 2`\n`print(n)`  `# 128`\n\nÖsszegzés, az egyik leggyakoribb minta:\n\n`osszeg = 0`\n`for x in range(1, 11):`\n`\u00a0\u00a0\u00a0\u00a0osszeg = osszeg + x`\n`print(osszeg)`  `# 55`',
          warn: 'Ha a while ciklus feltétele sosem lesz hamis (pl. elfelejted növelni a változót), **végtelen ciklus** keletkezik. Ilyenkor a programot Ctrl+C-vel lehet leállítani.'
        },
        {
          title: 'Listák',
          text: 'A **lista** több értéket tárol egy változóban. Az elemek sorszáma (indexe) **0-tól** kezdődik!\n\n`jegyek = [5, 3, 4, 5]`\n`print(jegyek[0])`  `# 5, az első elem`\n`print(len(jegyek))`  `# 4, az elemek száma`\n`jegyek.append(2)`  `# új elem a végére`\n`print(sum(jegyek) / len(jegyek))`  `# 3.8, az átlag`\n\nA lista elemein egy for ciklussal is végigmehetsz: `for j in jegyek:`'
        },
        {
          title: 'Függvények',
          text: 'A **függvény** egy elnevezett, újrahasznosítható kódrészlet. A `def` kulcsszóval hozzuk létre, a `return` adja vissza az eredményt.\n\n`def terulet(a, b):`\n`\u00a0\u00a0\u00a0\u00a0return a * b`\n\n`print(terulet(3, 4))`  `# 12`\n`print(terulet(5, 2))`  `# 10`\n\nAz `a` és `b` a függvény **paraméterei**, a hívásnál átadott `3` és `4` az **argumentumok**. A függvények előnye: egyszer írod meg, sokszor használod, és a programod áttekinthetőbb lesz.',
          tip: 'Beépített függvényeket már használtál is: `print`, `input`, `len`, `int`, `pow`, `sum`. Ezeket valaki más írta meg helyetted.'
        }
      ],
      quiz: [
        { q: 'Mit ír ki ez a kód? `print(7 // 2)`', options: ['3.5', '3', '1', '4'], answer: 1, explain: 'A `//` egészosztás: a 3,5 egész része 3.' },
        { q: 'Milyen típusú értéket ad vissza az `input()`?', options: ['Mindig egész számot', 'Mindig szöveget (str)', 'Logikai értéket', 'Azt, amit a felhasználó beír: számot vagy szöveget'], answer: 1, explain: 'Az `input` mindig str-t ad. Számhoz `int()` vagy `float()` kell.' },
        { q: 'Mely számokat adja a `range(3)`?', options: ['1, 2, 3', '0, 1, 2, 3', '0, 1, 2', '3'], answer: 2, explain: 'A range 0-tól indul, és a megadott számot már nem tartalmazza.' },
        { q: 'Mit jelöl Pythonban a behúzás?', options: ['Csak a szép kinézetet szolgálja', 'Hogy mely utasítások tartoznak egy blokkba (pl. ciklusmagba)', 'A megjegyzéseket', 'A változók típusát'], answer: 1, explain: 'Pythonban a behúzás része a nyelvtannak: ez határozza meg a blokkokat.' }
      ]
    },
    {
      id: 'halozatok',
      title: 'Hálózatok és az internet',
      level: 2, minutes: 15,
      summary: 'Hogyan jut el hozzád egy weboldal: IP-cím, router, DNS, csomagkapcsolás, HTTP és HTTPS.',
      tags: ['hálózat', 'internet', 'LAN', 'WAN', 'IP-cím', 'IPv4', 'IPv6', 'router', 'útválasztó', 'DNS', 'domain', 'csomagkapcsolás', 'TCP/IP', 'HTTP', 'HTTPS', 'URL', 'Wi-Fi', 'sávszélesség'],
      sections: [
        {
          title: 'Mi a hálózat?',
          text: 'A **számítógép-hálózat** összekapcsolt eszközök rendszere, amelyek adatot cserélnek egymással.\n\n- **LAN (helyi hálózat)**: egy lakás, iskola vagy iroda gépei, kábellel vagy Wi-Fi-n.\n- **WAN (nagy kiterjedésű hálózat)**: városokat, országokat köt össze.\n- Az **internet** a hálózatok hálózata: milliónyi hálózat, amelyek közös szabályokkal (protokollokkal) beszélnek egymással.\n\nOtthon a **router** (útválasztó) köti össze a lakás hálózatát az internetszolgáltatóval. A legtöbb otthoni router egyben Wi-Fi-hozzáférési pont is.',
          tip: 'Az internet és a **web** (világháló) nem ugyanaz! Az internet a hálózat maga, a web csak az egyik szolgáltatás rajta, mint az e-mail, a videóhívás vagy az online játékok.'
        },
        {
          title: 'IP-cím: a gép „lakcíme”',
          text: 'Minden hálózatra kötött eszköznek van egy **IP-címe**, ami alapján az adatok megtalálják.\n\n- **IPv4**: négy 0–255 közötti szám pontokkal elválasztva, pl. `192.168.1.25`. Ez 32 bit, kb. 4,3 milliárd cím, ami már kevés.\n- **IPv6**: 128 bites, hexadecimális jegyekkel írjuk, pl. `2001:db8::1`. Gyakorlatilag kifogyhatatlan.\n- **Privát címek**: a `192.168.x.x`, `10.x.x.x` tartományok csak a helyi hálózaton belül érvényesek. Kifelé a router a saját **nyilvános** címét használja az egész lakás nevében.\n\nAz IP-címet a router általában automatikusan osztja ki (ez a **DHCP** szolgáltatás).'
        },
        {
          title: 'DNS: az internet telefonkönyve',
          text: 'Az embereknek a nevek könnyebbek, a gépeknek a számok. A **DNS (Domain Name System)** fordítja le a domainnevet IP-címre.\n\nAmikor beírod: `www.pelda.hu`\n\n1. A géped megkérdezi a DNS-kiszolgálót: „mi a `www.pelda.hu` IP-címe?”\n2. A DNS-kiszolgáló (ha kell, más DNS-kiszolgálóktól megkérdezve) visszaadja a címet.\n3. A böngésző ezen az IP-címen keresi meg a webszervert.\n\nA válaszokat a gép egy ideig megjegyzi (gyorsítótárazza), így legközelebb gyorsabb.'
        },
        {
          title: 'Csomagkapcsolás',
          text: 'Az adat nem egy darabban utazik. A fájlt vagy videót kis **csomagokra** bontják, mindegyikre ráírják a feladó és a címzett IP-címét és a sorszámát.\n\n- A csomagok **útválasztóról útválasztóra** haladnak, és akár különböző útvonalon is mehetnek.\n- A célállomáson a **TCP** protokoll sorszám szerint összerakja őket, és újrakéri, ami elveszett.\n- Ha egy útvonal megszakad, a csomagok kerülőúton mennek tovább. Ezért olyan hibatűrő az internet.\n\nAz alapvető szabályrendszer neve **TCP/IP**: az IP gondoskodik a címzésről és útválasztásról, a TCP a megbízható, sorrendhelyes átvitelről.',
          tip: 'A `ping` és a `tracert` (Windows) vagy `traceroute` (Linux, macOS) parancsokkal megnézheted, mennyi idő alatt ér célba egy csomag, és milyen routereken halad át.'
        },
        {
          title: 'HTTP és HTTPS',
          text: 'A böngésző és a webszerver a **HTTP** protokollon beszélget: a böngésző kérést küld (pl. „add ide a kezdőlapot”), a szerver válaszol (HTML-kód, képek, stílusok).\n\nEgy **URL** részei: `https://www.pelda.hu/hirek/cikk.html`\n\n- `https`: a protokoll,\n- `www.pelda.hu`: a domainnév (ebből lesz a DNS-sel IP-cím),\n- `/hirek/cikk.html`: az elérési út a szerveren.\n\nA **HTTPS** a titkosított változat: a forgalmat senki nem tudja útközben elolvasni vagy módosítani, és a tanúsítvány igazolja, hogy tényleg az adott domain szerveréhez kapcsolódsz. A böngésző ezt lakat ikonnal jelzi.',
          warn: 'A lakat csak azt jelenti, hogy a kapcsolat titkosított, azt **nem**, hogy az oldal megbízható! Egy csaló oldalnak is lehet HTTPS-e. Mindig nézd meg a domainnevet is.'
        }
      ],
      quiz: [
        { q: 'Mi a DNS feladata?', options: ['Titkosítja a forgalmat', 'Domainnevet fordít IP-címre', 'Vírusokat szűr', 'Wi-Fi-jelet erősít'], answer: 1, explain: 'A DNS az internet „telefonkönyve”: névből címet csinál.' },
        { q: 'Melyik egy érvényes IPv4-cím?', options: ['192.168.1.300', '10.0.0.7', '256.1.1.1', 'www.pelda.hu'], answer: 1, explain: 'Az IPv4 mind a négy száma 0 és 255 közé esik. A 300 és a 256 túl nagy, a www.pelda.hu pedig domainnév.' },
        { q: 'Mit biztosít a HTTPS?', options: ['Hogy az oldal biztosan nem csaló', 'Titkosított kapcsolatot a böngésző és a szerver között', 'Gyorsabb letöltést', 'Reklámmentességet'], answer: 1, explain: 'A HTTPS titkosít és igazolja a domaint, de a tartalom megbízhatóságát nem garantálja.' },
        { q: 'Mi történik, ha egy csomag elvész útközben?', options: ['Az egész fájl elvész', 'A TCP újrakéri az elveszett csomagot', 'A router kitalálja a tartalmát', 'Semmi, az adat hiányos marad'], answer: 1, explain: 'A TCP figyeli a sorszámokat, és a hiányzó csomagot újraküldeti.' }
      ]
    },
    {
      id: 'adatbiztonsag',
      title: 'Adatbiztonság és digitális állampolgárság',
      level: 1, minutes: 14,
      summary: 'Erős jelszavak, kétlépcsős azonosítás, adathalászat felismerése, biztonsági mentés, GDPR és szerzői jog.',
      tags: ['adatbiztonság', 'jelszó', 'jelszókezelő', 'kétlépcsős azonosítás', '2FA', 'adathalászat', 'phishing', 'kártevő', 'vírus', 'zsarolóvírus', 'biztonsági mentés', 'GDPR', 'adatvédelem', 'szerzői jog', 'Creative Commons', 'digitális lábnyom', 'netikett', 'cyberbullying'],
      sections: [
        {
          title: 'Erős jelszavak',
          text: 'A jelszó a digitális kulcsod. Egy jó jelszó:\n\n- **hosszú**: legalább 12–16 karakter. A hossz többet számít, mint a bonyolultság.\n- **egyedi**: minden oldalon más! Ha egy oldalt feltörnek, a támadók az ott ellopott jelszót más oldalakon is kipróbálják.\n- **nem kitalálható**: nincs benne a neved, születési dátumod, a kutyád neve vagy a `123456`.\n\nJó módszer a **jelmondat**: több véletlen szó egymás után, pl. „lila-zsiráf-kávét-főz-hétfőn”. Könnyű megjegyezni, nehéz feltörni.\n\nA sok egyedi jelszót egy **jelszókezelő** program jegyzi meg helyetted. Neked csak egy erős mesterjelszót kell tudnod.',
          warn: 'A jelszavadat soha senkinek ne add meg: se barátnak, se „rendszergazdának”, se a bank „ügyintézőjének”. Valódi szolgáltató sosem kéri el.'
        },
        {
          title: 'Kétlépcsős azonosítás',
          text: 'A **kétlépcsős (kétfaktoros) azonosítás**, röviden **2FA**, a jelszó mellé még egy bizonyítékot kér. A faktorok:\n\n- valami, amit **tudsz** (jelszó, PIN-kód),\n- valami, ami **nálad van** (telefon hitelesítő alkalmazással, SMS-kód, biztonsági kulcs),\n- valami, ami **te vagy** (ujjlenyomat, arcfelismerés).\n\nHa a jelszavadat el is lopják, a támadó a második faktor nélkül nem tud belépni. Kapcsold be legalább az e-mail-fiókodon, a közösségi oldalaidon és a banki alkalmazásban!',
          tip: 'A hitelesítő alkalmazás (authenticator) biztonságosabb, mint az SMS-kód, mert az SMS-t egy SIM-kártya-csalással el lehet téríteni.'
        },
        {
          title: 'Adathalászat (phishing)',
          text: 'Az **adathalász** üzenet egy megbízható szereplőnek (bank, futárszolgálat, iskola, játékplatform) adja ki magát, hogy kicsalja a jelszavadat, bankkártyaadatodat, vagy rávegyen egy kártevő letöltésére.\n\nGyanús jelek:\n\n- **sürgetés vagy fenyegetés**: „24 órán belül letiltjuk a fiókod!”\n- **túl szép, hogy igaz legyen**: „Nyertél egy telefont!”\n- **furcsa feladó vagy link**: pl. `pelda-bank.biz-login.com` a valódi `peldabank.hu` helyett,\n- **adatot kér**: jelszót, kártyaszámot, SMS-ben kapott kódot,\n- helyesírási hibák, személytelen megszólítás.\n\nMit tegyél? **Ne kattints** a linkre. A szolgáltatót a saját, ismert csatornáján keresd meg (alkalmazás, könyvjelző, hivatalos telefonszám).'
        },
        {
          title: 'Kártevők és biztonsági mentés',
          text: 'A **kártevők** (malware) gyűjtőnév: vírus, féreg, kémprogram, trójai, és a **zsarolóvírus**, ami titkosítja a fájljaidat, majd váltságdíjat követel.\n\nVédekezés:\n\n- **frissítsd** az operációs rendszert és a programokat: a frissítések biztonsági réseket zárnak be,\n- csak **hivatalos** helyről (alkalmazásbolt, gyártó oldala) telepíts,\n- használj vírusvédelmet,\n- készíts **biztonsági mentést**.\n\nA **3-2-1 szabály**: legyen **3** példány az adataidról, **2** különböző eszközön, és ebből **1** máshol (pl. felhőben vagy egy másik helyen tárolt lemezen).',
          tip: 'Egy mentés csak akkor ér valamit, ha vissza is lehet állítani. Néha próbáld ki, hogy tényleg megnyílnak-e a mentett fájlok!'
        },
        {
          title: 'Adatvédelem és a GDPR',
          text: 'A **személyes adat** minden olyan információ, amiből egy ember azonosítható: név, lakcím, telefonszám, fénykép, IP-cím, helyadat.\n\nAz Európai Unió **adatvédelmi rendelete, a GDPR** (2018 óta) szerint:\n\n- az adatkezeléshez **jogalap** kell, például a hozzájárulásod,\n- csak a célhoz **szükséges** adatot szabad gyűjteni,\n- **jogod van** megtudni, milyen adatot tárolnak rólad, kérni a helyesbítését vagy a **törlését** („az elfeledtetéshez való jog”).\n\nMagyarországon 16 éves kor alatt a közösségi és más online szolgáltatásokhoz adott hozzájárulásához általában a **szülő** engedélye is kell.\n\nA **digitális lábnyomod** mindaz, amit rólad a neten meg lehet találni. Amit egyszer feltöltöttél, azt mások lementhették: posztolás előtt gondold végig, vállalnád-e 5 év múlva is.'
        },
        {
          title: 'Szerzői jog és netikett',
          text: 'Egy kép, zene, videó vagy szöveg alkotóját a **szerzői jog** védi, akkor is, ha nincs rajta © jel. Hogy „fent van a neten”, az nem jelenti, hogy szabadon felhasználhatod.\n\n- **Idézni** szabad, a forrás megjelölésével, a szükséges mértékben (pl. egy iskolai beszámolóban).\n- A **Creative Commons (CC)** licencek megmondják, mit szabad egy művel: pl. a **CC BY** szerint felhasználhatod, ha megnevezed a szerzőt; a **NC** jelölés: csak nem kereskedelmi célra.\n- Szoftvert, filmet, játékot illegális forrásból letölteni és megosztani jogsértés, és gyakran kártevőt is rejt.\n\n**Netikett**: a neten is ugyanaz a tisztelet jár mindenkinek, mint szemtől szemben. Ha bántalmazást (**cyberbullying**) tapasztalsz: ne válaszolj indulatból, készíts képernyőképet, tiltsd le és jelentsd a felhasználót, és szólj egy felnőttnek, akiben megbízol.'
        }
      ],
      quiz: [
        { q: 'Melyik a legerősebb jelszó?', options: ['Peti2009', 'qwerty123', 'lila-zsiráf-kávét-főz-hétfőn', 'Jelszo!'], answer: 2, explain: 'A hosszú, véletlen szavakból álló jelmondat a legnehezebben törhető. A többiben név, évszám vagy ismert minta van.' },
        { q: 'Mit jelent a 3-2-1 mentési szabály?', options: ['3 jelszó, 2 fiók, 1 e-mail', '3 példány, 2 különböző eszközön, 1 máshol tárolva', 'Háromnaponta, kétszer, egy órán át', '3 vírusirtó, 2 tűzfal, 1 router'], answer: 1, explain: 'Így egy eszköz meghibásodása, ellopása vagy egy zsarolóvírus sem viszi el minden adatodat.' },
        { q: 'SMS-t kapsz: „Csomagod elakadt, fizesd ki a 299 Ft vámot ezen a linken!” Mit teszel?', options: ['Kifizetem, olcsó', 'Nem kattintok, a futárcég hivatalos oldalán vagy alkalmazásában nézek utána', 'Továbbküldöm a barátaimnak is', 'Megadom a kártyaadatot, de csak a felét'], answer: 1, explain: 'Klasszikus adathalász üzenet: sürget, kis összeget kér, és ismeretlen linkre irányít.' }
      ]
    }
  ]
});
