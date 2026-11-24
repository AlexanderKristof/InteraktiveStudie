/* Egyetem: Digitális technika és számítógép-architektúra – szakszótár mintakurzus. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"', LN = 'class="svg-line"';

  // Kapuszimbólumok (ÉS, VAGY, NEM) igazságtáblával
  function gate(x, y, kind, label) {
    var body = kind === 'and' ? '<path d="M' + x + ' ' + y + ' h26 a22 22 0 0 1 0 44 h-26 z"/>'
      : kind === 'or' ? '<path d="M' + x + ' ' + y + ' q40 0 54 22 q-14 22 -54 22 q14 -22 0 -44 z"/>'
        : '<path d="M' + x + ' ' + y + ' l40 22 l-40 22 z"/><circle cx="' + (x + 45) + '" cy="' + (y + 22) + '" r="5"/>';
    var ins = kind === 'not' ? '<line x1="' + (x - 20) + '" y1="' + (y + 22) + '" x2="' + x + '" y2="' + (y + 22) + '"/>'
      : '<line x1="' + (x - 20) + '" y1="' + (y + 12) + '" x2="' + (x + (kind === 'or' ? 8 : 0)) + '" y2="' + (y + 12) + '"/><line x1="' + (x - 20) + '" y1="' + (y + 32) + '" x2="' + (x + (kind === 'or' ? 8 : 0)) + '" y2="' + (y + 32) + '"/>';
    return '<g fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2.5">' + body + ins + '<line x1="' + (x + 50) + '" y1="' + (y + 22) + '" x2="' + (x + 72) + '" y2="' + (y + 22) + '"/></g>' +
      '<text x="' + (x + 26) + '" y="' + (y + 66) + '" text-anchor="middle" font-size="13" font-weight="700" ' + T + '>' + label + '</text>';
  }
  function table(x, y, rows) {
    return rows.map(function (r, i) {
      return '<text x="' + x + '" y="' + (y + i * 17) + '" font-size="12" font-family="monospace" ' + (i ? T : M) + '>' + r + '</text>';
    }).join('');
  }
  var gatesSvg = '<svg viewBox="0 0 560 190">' +
    gate(40, 20, 'and', 'ÉS (AND)') + table(30, 120, ['A B | Y', '0 0 | 0', '0 1 | 0', '1 0 | 0', '1 1 | 1']) +
    gate(230, 20, 'or', 'VAGY (OR)') + table(220, 120, ['A B | Y', '0 0 | 0', '0 1 | 1', '1 0 | 1', '1 1 | 1']) +
    gate(430, 20, 'not', 'NEM (NOT)') + table(430, 120, ['A | Y', '0 | 1', '1 | 0']) + '</svg>';

  // CMOS inverter
  var cmosSvg = '<svg viewBox="0 0 420 250">' +
    '<g stroke="var(--fg-2)" stroke-width="2.5" fill="none"><line x1="200" y1="20" x2="200" y2="60"/><line x1="200" y1="100" x2="200" y2="150"/><line x1="200" y1="190" x2="200" y2="230"/>' +
    '<line x1="200" y1="125" x2="300" y2="125"/><line x1="120" y1="80" x2="120" y2="170"/><line x1="60" y1="125" x2="120" y2="125"/>' +
    '<line x1="120" y1="80" x2="170" y2="80"/><line x1="120" y1="170" x2="170" y2="170"/><line x1="180" y1="60" x2="180" y2="100"/><line x1="180" y1="150" x2="180" y2="190"/>' +
    '<line x1="180" y1="60" x2="200" y2="60"/><line x1="180" y1="100" x2="200" y2="100"/><line x1="180" y1="150" x2="200" y2="150"/><line x1="180" y1="190" x2="200" y2="190"/></g>' +
    '<circle cx="174" cy="80" r="5" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="2"/><line x1="170" y1="62" x2="170" y2="98" stroke="var(--fg-2)" stroke-width="3"/><line x1="170" y1="152" x2="170" y2="188" stroke="var(--fg-2)" stroke-width="3"/>' +
    '<text x="210" y="24" font-size="13" ' + T + '>V_DD (tápfeszültség)</text><text x="210" y="240" font-size="13" ' + T + '>GND (föld)</text>' +
    '<text x="215" y="84" font-size="12" fill="#e5484d">PMOS</text><text x="215" y="174" font-size="12" fill="#2f7bf6">NMOS</text>' +
    '<text x="20" y="120" font-size="13" ' + T + '>be: A</text><text x="308" y="129" font-size="13" ' + T + '>ki: Y = NEM A</text></svg>';

  // Órajel és D flip-flop idődiagram
  var clkSvg = '<svg viewBox="0 0 560 170"><g fill="none" stroke-width="2.5">' +
    '<path d="M70 50 h30 v-30 h30 v30 h30 v-30 h30 v30 h30 v-30 h30 v30 h30 v-30 h30 v30 h30 v-30 h30 v30 h30" stroke="#2f7bf6"/>' +
    '<path d="M70 100 h55 v-30 h120 v30 h70 v-30 h150 v30 h35" stroke="#f08c2e"/>' +
    '<path d="M70 150 h60 v-30 h120 v30 h60 v-30 h180 " stroke="#2f9e6a"/></g>' +
    '<text x="10" y="42" font-size="13" ' + T + '>CLK</text><text x="10" y="92" font-size="13" ' + T + '>D</text><text x="10" y="142" font-size="13" ' + T + '>Q</text>' +
    [100, 160, 220, 280, 340, 400, 460].map(function (x) { return '<line x1="' + x + '" y1="10" x2="' + x + '" y2="160" stroke="var(--muted)" stroke-dasharray="3 4"/>'; }).join('') + '</svg>';

  // Futószalag (pipeline)
  var stages = ['IF', 'ID', 'EX', 'MEM', 'WB'], cols = ['#2f7bf6', '#7c5cd6', '#e5484d', '#f08c2e', '#2f9e6a'];
  var pipeSvg = '<svg viewBox="0 0 560 200">';
  for (var i = 0; i < 4; i++) {
    pipeSvg += '<text x="10" y="' + (44 + i * 38) + '" font-size="12" ' + T + '>' + (i + 1) + '. utasítás</text>';
    stages.forEach(function (s, j) {
      pipeSvg += '<rect x="' + (90 + (i + j) * 62) + '" y="' + (26 + i * 38) + '" width="58" height="28" rx="5" fill="' + cols[j] + '"/><text x="' + (119 + (i + j) * 62) + '" y="' + (45 + i * 38) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">' + s + '</text>';
    });
  }
  for (var c = 0; c < 8; c++) pipeSvg += '<text x="' + (119 + c * 62) + '" y="186" text-anchor="middle" font-size="11" ' + M + '>' + (c + 1) + '. ütem</text>';
  pipeSvg += '</svg>';

  // Memóriahierarchia piramis
  var lv = [['Regiszterek', '< 1 ns', 'néhány száz bájt'], ['L1 cache', '~1 ns', '32–64 KB'], ['L2 / L3 cache', '3–15 ns', 'MB-ok'], ['RAM (DRAM)', '~80 ns', 'GB-ok'], ['SSD', '~50–100 µs', 'TB'], ['HDD', '~5–10 ms', 'TB-ok']];
  var memSvg = '<svg viewBox="0 0 560 250">';
  lv.forEach(function (l, i) {
    var w = 80 + i * 56, x = 170 - w / 2 + 50, y = 14 + i * 38;
    memSvg += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="32" rx="5" fill="' + ['#e5484d', '#f08c2e', '#d9a520', '#2f9e6a', '#2f7bf6', '#7c5cd6'][i] + '" opacity=".9"/>' +
      '<text x="220" y="' + (y + 21) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">' + l[0] + '</text>' +
      '<text x="420" y="' + (y + 21) + '" font-size="12" ' + T + '>' + l[1] + '</text><text x="500" y="' + (y + 21) + '" font-size="11" ' + M + '>' + l[2] + '</text>';
  });
  memSvg += '<text x="420" y="246" font-size="11" ' + M + '>elérési idő</text><text x="20" y="30" font-size="11" ' + M + '>gyors, drága, kicsi</text><text x="20" y="222" font-size="11" ' + M + '>lassú, olcsó, nagy</text></svg>';

  // Kettes komplemens számkör
  var twoSvg = '<svg viewBox="0 0 560 240"><circle cx="160" cy="120" r="90" fill="none" stroke="var(--line)" stroke-width="18"/>';
  for (var k = 0; k < 8; k++) {
    var a = (k / 8) * 2 * Math.PI - Math.PI / 2, val = k < 4 ? k : k - 8, bits = ('00' + k.toString(2)).slice(-3);
    twoSvg += '<text x="' + (160 + 112 * Math.cos(a)) + '" y="' + (124 + 112 * Math.sin(a)) + '" text-anchor="middle" font-size="12" font-family="monospace" ' + M + '>' + bits + '</text>' +
      '<text x="' + (160 + 68 * Math.cos(a)) + '" y="' + (125 + 68 * Math.sin(a)) + '" text-anchor="middle" font-size="15" font-weight="700" fill="' + (val < 0 ? '#e5484d' : '#2f7bf6') + '">' + val + '</text>';
  }
  twoSvg += '<text x="300" y="80" font-size="13" ' + T + '>3 biten: −4 … +3</text><text x="300" y="104" font-size="13" ' + T + '>A legfelső bit az előjel.</text>' +
    '<text x="300" y="138" font-size="13" ' + T + '>−3 előállítása:</text><text x="300" y="160" font-size="13" font-family="monospace" ' + T + '>+3 = 011</text>' +
    '<text x="300" y="180" font-size="13" font-family="monospace" ' + T + '>invertálás → 100</text><text x="300" y="200" font-size="13" font-family="monospace" ' + T + '>+1 → 101 = −3</text></svg>';

  // Moore-törvény (logaritmikus skála)
  var pts = [[1971, 2300], [1978, 29000], [1989, 1.2e6], [1993, 3.1e6], [2000, 4.2e7], [2006, 2.9e8], [2012, 1.4e9], [2017, 1.9e10], [2023, 1e11]];
  function px(y) { return 40 + (y - 1970) / 55 * 490; }
  function py(n) { return 210 - (Math.log10(n) - 3) / 8.5 * 190; }
  var mooreSvg = '<svg viewBox="0 0 560 240"><line x1="40" y1="210" x2="540" y2="210" ' + LN + '/><line x1="40" y1="10" x2="40" y2="210" ' + LN + '/>' +
    [3, 5, 7, 9, 11].map(function (e) { return '<text x="34" y="' + (py(Math.pow(10, e)) + 4) + '" text-anchor="end" font-size="10" ' + M + '>' + { 3: '10³', 5: '10⁵', 7: '10⁷', 9: '10⁹', 11: '10¹¹' }[e] + '</text>'; }).join('') +
    [1970, 1990, 2010].map(function (y) { return '<text x="' + px(y) + '" y="226" text-anchor="middle" font-size="11" ' + M + '>' + y + '</text>'; }).join('') +
    '<line x1="' + px(1971) + '" y1="' + py(2300) + '" x2="' + px(2023) + '" y2="' + py(2300 * Math.pow(2, 26)) + '" stroke="var(--muted)" stroke-dasharray="5 4"/>' +
    pts.map(function (p) { return '<circle cx="' + px(p[0]) + '" cy="' + py(p[1]) + '" r="5" fill="#7c5cd6"/>'; }).join('') +
    '<text x="300" y="40" font-size="12" ' + T + '>szaggatott: duplázódás 2 évente</text><text x="300" y="58" font-size="12" ' + T + '>pontok: valódi processzorok</text></svg>';

  STUDIE.addCourse({
    id: 'digitalis-technika',
    title: 'Digitális technika és architektúra',
    icon: '💾',
    color: '#7c5cd6',
    level: 'BSc 1–3. félév (mérnökinformatikus, villamosmérnök)',
    description: 'A tranzisztortól a processzorig: logikai kapuk, tárolók, futószalag, gyorsítótár.',
    intro: 'Ez a kurzus a digitális rendszerek alapfogalmait gyűjti egy helyre. Ha kézzelfoghatóan is látni szeretnéd, miről szólnak, nézz bele a [[processzor|processzor]] és a [[tranzisztor|tranzisztor]] modellbe.',
    topics: [
      { id: 'logika', title: 'Logika és számábrázolás' },
      { id: 'aramkor', title: 'Áramkörök' },
      { id: 'arch', title: 'Architektúra' },
      { id: 'mem', title: 'Memória' }
    ],
    formulas: [
      {
        id: 'cpu-ido', title: 'A processzor végrehajtási ideje', en: 'CPU time equation',
        parts: [{ t: 'T_{CPU}', d: 'Egy program futási ideje', unit: 's' }, { t: '=' }, { t: 'IC', d: 'Végrehajtott utasítások száma (instruction count)', unit: 'db' }, { t: '·' },
          { t: 'CPI', d: 'Egy utasításra jutó átlagos órajelciklus (cycles per instruction)', unit: 'ciklus/utasítás' }, { t: '/' }, { t: 'f', d: 'Órajel-frekvencia', unit: 'Hz', more: '1 GHz = 10⁹ ciklus másodpercenként' }],
        text: 'Ez a „processzorteljesítmény vasegyenlete”. A gyorsításnak három útja van: kevesebb utasítás (jobb fordító, okosabb utasításkészlet), kisebb CPI (futószalag, párhuzamosság) vagy magasabb órajel.',
        example: '10⁹ utasítás, CPI = 1,5, f = 3 GHz: `T = 10⁹ · 1,5 / (3 · 10⁹) = 0,5 s`.'
      },
      {
        id: 'dinamikus-teljesitmeny', title: 'CMOS dinamikus teljesítményfelvétel', en: 'dynamic power',
        parts: [{ t: 'P_{din}', d: 'Kapcsolgatásból adódó teljesítményfelvétel', unit: 'W' }, { t: '=' }, { t: 'α', d: 'Aktivitási tényező: az órajelek mekkora hányadában kapcsol egy csomópont', unit: '–' }, { t: '·' },
          { t: 'C', d: 'Kapcsolt kapacitás', unit: 'F (farad)' }, { t: '·' }, { t: 'V^2', d: 'Tápfeszültség négyzete', unit: 'V²', more: 'Négyzetesen számít, ezért a legerősebb csavar a feszültség csökkentése.' }, { t: '·' }, { t: 'f', d: 'Órajel-frekvencia', unit: 'Hz' }],
        text: 'Ezért melegszik a processzor, ha emelik az órajelet: a magasabb frekvenciához általában magasabb feszültség is kell, így a teljesítmény nagyjából a frekvencia **harmadik hatványával** nő.',
        example: 'Ha a feszültséget 1,2 V-ról 1,0 V-ra csökkentjük, a dinamikus teljesítmény `(1,0/1,2)² ≈ 0,69`-szeresére esik: kb. 31%-os megtakarítás.'
      },
      {
        id: 'amdahl', title: 'Amdahl-törvény', en: "Amdahl's law",
        parts: [{ t: 'S', d: 'Elérhető gyorsulás (speedup)', unit: '×' }, { t: '=' }, { t: '1 / ( (1 − ' }, { t: 'p', d: 'A program párhuzamosítható hányada', unit: '0…1' }, { t: ') + ' }, { t: 'p' , d: 'A program párhuzamosítható hányada', unit: '0…1' }, { t: ' / ' }, { t: 'n', d: 'Processzormagok száma', unit: 'db' }, { t: ' )' }],
        text: 'A soros (nem párhuzamosítható) rész szab határt a gyorsításnak, akárhány magot is teszünk a gépbe.',
        example: 'Ha a program 90%-a párhuzamosítható (p = 0,9), végtelen sok maggal is legfeljebb `1 / 0,1 = 10×` gyorsulás érhető el. 8 maggal: `1 / (0,1 + 0,9/8) ≈ 4,7×`.'
      },
      {
        id: 'amat', title: 'Átlagos memória-elérési idő', en: 'AMAT – average memory access time',
        parts: [{ t: 'AMAT', d: 'Átlagos elérési idő', unit: 'ns vagy ciklus' }, { t: '=' }, { t: 't_{hit}', d: 'Találati idő: ennyi ideig tart, ha az adat a cache-ben van', unit: 'ns' }, { t: '+' },
          { t: 'm', d: 'Hibaarány (miss rate): az elérések mekkora hányadában nincs ott az adat', unit: '0…1' }, { t: '·' }, { t: 't_{miss}', d: 'Hibabüntetés: ennyi idő a következő szintről behozni az adatot', unit: 'ns' }],
        example: 't_hit = 1 ns, m = 5%, t_miss = 80 ns: `AMAT = 1 + 0,05 · 80 = 5 ns`. Ha a hibaarányt 2%-ra csökkentjük: `2,6 ns`.'
      }
    ],
    terms: [
      { id: 'bit', term: 'Bit', en: 'bit (binary digit)', topic: 'logika', short: 'A legkisebb információegység: értéke 0 vagy 1.',
        prereq: ['lecke:villanyszereles/alapfogalmak'],
        text: 'Az áramkörben a bitet feszültségszint jelenti: például 0 V körül logikai 0, a tápfeszültség közelében logikai 1. 8 bit egy **bájt**. A két érték közé eső tartomány „tiltott”: a digitális áramkörök azért megbízhatók, mert minden kapu visszahúzza a jelet a két szélső szint valamelyikére.',
        related: ['boole', 'kettes-komplemens', 'logikai-kapu'], models: ['processzor'] },
      { id: 'boole', term: 'Boole-algebra', en: 'Boolean algebra', topic: 'logika', short: 'Az igaz/hamis (1/0) értékekkel végzett műveletek matematikája: ÉS, VAGY, NEM.',
        text: 'George Boole 1854-ben írta le. Az alapműveletek: `A·B` (ÉS), `A+B` (VAGY), `Ā` (NEM). Fontos azonosságok: `A + A·B = A` (elnyelés), `A·Ā = 0`, `A + Ā = 1`. Ezekkel a logikai kifejezések egyszerűsíthetők, így kevesebb kapu kell az áramkörbe.',
        related: ['de-morgan', 'karnaugh', 'logikai-kapu'] },
      { id: 'de-morgan', term: 'De Morgan-azonosságok', en: "De Morgan's laws", topic: 'logika', short: 'Egy ÉS tagadása a tagadások VAGY-a, és fordítva.',
        text: '`NEM(A·B) = Ā + B̄` és `NEM(A+B) = Ā · B̄`.\n\nA gyakorlatban ezzel lehet bármilyen áramkört csupa NAND (vagy csupa NOR) kapuból felépíteni. A CMOS-ban a NAND a legolcsóbb kapu.',
        example: '„Nem igaz, hogy esik ÉS fúj” ugyanazt jelenti, mint „nem esik VAGY nem fúj”.',
        related: ['boole', 'logikai-kapu'] },
      { id: 'karnaugh', term: 'Karnaugh-tábla', en: 'Karnaugh map', topic: 'logika', short: 'Grafikus módszer logikai függvények egyszerűsítésére a szomszédos 1-esek csoportosításával.',
        text: 'Az igazságtábla sorait úgy rendezzük táblázatba (Gray-kód sorrendben), hogy a szomszédos cellák csak egy változóban különbözzenek. A szomszédos 1-esekből alkotott 2, 4, 8 elemű téglalapok egy-egy egyszerűsített tagot adnak. 4–5 változóig kézzel is jól használható.',
        pitfall: 'A tábla szélei is szomszédosak (a tábla „tórusz”): a bal és a jobb szélső oszlop is összevonható.',
        related: ['boole'] },
      { id: 'kettes-komplemens', term: 'Kettes komplemens', en: "two's complement", topic: 'logika', short: 'Az előjeles egész számok szokásos bináris ábrázolása: a negatív szám = bitenkénti invertálás + 1.',
        visual: twoSvg, caption: 'A 3 bites kettes komplemens „számkör”: a túlcsordulás körbeér.',
        text: 'Nagy előnye, hogy az összeadó áramkörnek nem kell tudnia, előjeles-e a szám: ugyanaz a hardver ad össze és von ki. n biten a tartomány `−2^(n−1) … 2^(n−1) − 1`, például 8 biten −128…127.',
        pitfall: 'Túlcsordulás: 8 biten 127 + 1 = −128 lesz. Ez nem hibaüzenet, hanem csendes körbefordulás!',
        related: ['bit', 'alu'] },
      { id: 'logikai-kapu', term: 'Logikai kapu', en: 'logic gate', topic: 'aramkor', short: 'Egy logikai műveletet megvalósító áramkör, általában néhány tranzisztorból.',
        prereq: ['digitalis-technika/boole', 'modell:tranzisztor'],
        visual: gatesSvg, caption: 'Az alapkapuk szabványos (ANSI) jelölése és igazságtáblája.',
        text: 'A mai chipekben a kapukat CMOS technológiával építik. Egy NEM kapu 2, egy NAND vagy NOR kapu 4 tranzisztor. Ezekből épül fel minden: összeadó, tároló, processzor.',
        related: ['cmos', 'boole', 'de-morgan', 'osszeado', 'flip-flop'], models: ['tranzisztor'] },
      { id: 'cmos', term: 'CMOS', en: 'complementary metal–oxide–semiconductor', topic: 'aramkor', short: 'Áramköri technológia, amely egymást kiegészítő p- és n-csatornás MOSFET-párokból épít kapukat.',
        prereq: ['lecke:villanyszereles/kapcsolasok', 'digitalis-technika/mosfet'],
        widget: { type: 'cpu-teljesitmeny', options: { title: 'Próbáld ki: CMOS teljesítményfelvétel' } },
        visual: cmosSvg, caption: 'CMOS inverter: ha A = 1, az NMOS vezet (Y = 0); ha A = 0, a PMOS vezet (Y = 1).',
        text: 'Nyugalmi állapotban mindig az egyik tranzisztor zárva van, így a táp és a föld között (szinte) nem folyik áram. A CMOS áramkör csak **kapcsoláskor** fogyaszt jelentősen. Ezért lehetett milliárdnyi tranzisztort egy chipre tenni.',
        formulas: ['dinamikus-teljesitmeny'],
        related: ['logikai-kapu', 'mosfet', 'orajel'], models: ['tranzisztor'] },
      { id: 'mosfet', term: 'MOSFET', en: 'metal–oxide–semiconductor field-effect transistor', topic: 'aramkor', short: 'Térvezérlésű tranzisztor: a gate feszültsége nyitja vagy zárja a source és drain közti csatornát.',
        prereq: ['lecke:fizika/elektromossag', 'lecke:fizika/atom', 'modell:tranzisztor'],
        widget: { type: 'mosfet-iv' },
        text: 'Digitális áramkörben kapcsolóként működik. A gate-et vékony oxidréteg szigeteli el, ezért a vezérléséhez (statikusan) nem kell áram. A mai chipekben háromdimenziós változatai vannak (FinFET, GAA).',
        related: ['cmos', 'moore'], models: ['tranzisztor'] },
      { id: 'osszeado', term: 'Összeadó (teljes összeadó)', en: 'full adder', topic: 'aramkor', short: 'Két bitet és egy bejövő átvitelt összeadó áramkör: kimenete az összegbit és a kimenő átvitel.',
        text: 'Összeg: `S = A ⊕ B ⊕ C_in`, átvitel: `C_out = A·B + C_in·(A ⊕ B)`. n darabot egymás után kötve n bites számok adhatók össze (ez a soros átvitelű összeadó). Ennek késleltetése az n-nel arányos, ezért a valódi processzorok gyorsabb, átvitel-előrejelző összeadót (carry-lookahead) használnak.',
        related: ['logikai-kapu', 'alu'] },
      { id: 'flip-flop', term: 'Flip-flop (D tároló)', en: 'D flip-flop', topic: 'aramkor', short: 'Egy bitet tároló áramkör, amely az órajel élén veszi át a bemenet értékét.',
        visual: clkSvg, caption: 'A Q kimenet csak az órajel felfutó élein követi a D bemenetet.',
        text: 'A flip-flopokkal kezdődik a **sorrendi** logika: az áramkör „emlékszik”. Több flip-flop együtt **regisztert** alkot. A szinkron áramkörben minden tároló ugyanarra az órajelre vált, így a jelek kiszámíthatóan haladnak.',
        pitfall: 'Ha a bemenet túl közel változik az órajel éléhez (setup/hold idő megsértése), a tároló bizonytalan, úgynevezett metastabil állapotba kerülhet.',
        related: ['orajel', 'regiszter', 'logikai-kapu'] },
      { id: 'orajel', term: 'Órajel', en: 'clock signal', topic: 'aramkor', short: 'Szabályos négyszögjel, amely ütemezi a szinkron digitális áramkör működését.',
        prereq: ['lecke:fizika/hullamok-feny'],
        text: 'Az órajel periódusának hosszabbnak kell lennie, mint a leghosszabb kapulánc késleltetése két tároló között (ez a **kritikus út**). Ez határozza meg a maximális frekvenciát. 4 GHz-en egy ciklus 0,25 ns: ennyi idő alatt a fény is csak 7,5 cm-t tesz meg.',
        formulas: ['cpu-ido'],
        related: ['flip-flop', 'futoszalag', 'cmos'] },
      { id: 'regiszter', term: 'Regiszter', en: 'register', topic: 'arch', short: 'A processzoron belüli, néhány bájtos, leggyorsabb tároló, amellyel a műveletek közvetlenül dolgoznak.',
        text: 'Egy 64 bites processzor általános célú regiszterei 64 bitesek. Az utasítások jellemzően regiszterekből olvasnak és regiszterbe írnak. A memóriához külön betöltő (load) és tároló (store) utasítás kell.',
        related: ['flip-flop', 'alu', 'memoriahierarchia', 'isa'] },
      { id: 'alu', term: 'ALU (aritmetikai-logikai egység)', en: 'arithmetic logic unit', topic: 'arch', short: 'A processzor számolóegysége: összead, kivon, logikai műveleteket és összehasonlítást végez.',
        text: 'Bemenete két operandus és egy műveleti kód, kimenete az eredmény és állapotjelzők (flagek): nulla lett-e, negatív-e, volt-e átvitel vagy túlcsordulás. A feltételes ugrások ezekből a flagekből döntenek.',
        related: ['osszeado', 'regiszter', 'kettes-komplemens', 'utasitasciklus'], models: ['processzor'] },
      { id: 'isa', term: 'Utasításkészlet-architektúra (ISA)', en: 'instruction set architecture', topic: 'arch', short: 'A hardver és a szoftver közti „szerződés”: milyen utasításokat, regisztereket és címzési módokat ismer a processzor.',
        text: 'Példák: **x86-64** (PC-k), **ARM** (telefonok, Apple M), **RISC-V** (nyílt, szabadon használható). Ugyanazt az ISA-t sokféle belső felépítés (mikroarchitektúra) valósíthatja meg. Ezért fut ugyanaz a program egy régi és egy új processzoron is.',
        related: ['regiszter', 'utasitasciklus', 'risc-cisc'] },
      { id: 'risc-cisc', term: 'RISC és CISC', en: 'reduced / complex instruction set computer', topic: 'arch', short: 'Két tervezési filozófia: kevés, egyszerű utasítás (RISC) vagy sok, összetett utasítás (CISC).',
        text: 'A RISC (pl. ARM, RISC-V) fix hosszú, egyszerű utasításokkal dolgozik, amelyeket könnyű futószalagosítani. A CISC (x86) utasításai összetettebbek, ezért a mai x86 processzorok belül egyszerű mikroműveletekre bontják őket. A gyakorlatban a különbség ma már elmosódott.',
        related: ['isa', 'futoszalag'] },
      { id: 'utasitasciklus', term: 'Utasításciklus', en: 'fetch–decode–execute cycle', topic: 'arch', short: 'Az utasítás lehívása, dekódolása és végrehajtása, ismétlődve, amíg a gép jár.',
        text: '1. **Lehívás (fetch)**: a programszámláló (PC) által mutatott címről beolvassa az utasítást.\n2. **Dekódolás (decode)**: megállapítja, mit kell tenni, és beolvassa az operandusokat.\n3. **Végrehajtás (execute)**: az ALU elvégzi a műveletet.\n4. **Memória és visszaírás**: szükség esetén olvas vagy ír a memóriába, majd az eredményt regiszterbe írja.',
        related: ['futoszalag', 'alu', 'isa'] },
      { id: 'futoszalag', term: 'Futószalag (pipeline)', en: 'pipelining', topic: 'arch', short: 'Az utasítások végrehajtásának átfedése: amíg az egyiket végrehajtja, a következőt már dekódolja.',
        visual: pipeSvg, caption: 'Klasszikus 5 fokozatú RISC futószalag: IF lehívás, ID dekódolás, EX végrehajtás, MEM memória, WB visszaírás.',
        text: 'Egy utasítás továbbra is 5 ütemig tart (ez a **késleltetés**), de ideális esetben minden ütemben befejeződik egy (ez az **átbocsátóképesség**). Ez olyan, mint a mosoda: amíg az egyik adag szárad, a következő már mosódik.',
        pitfall: 'Hazárdok akaszthatják meg a futószalagot: adatfüggőség (a következő utasításnak kell az előző eredménye), vezérlési hazárd (ugrás), erőforrás-ütközés. Ilyenkor buborék (várakozás) kerül a futószalagba.',
        formulas: ['cpu-ido'],
        related: ['utasitasciklus', 'orajel', 'elagazasbecsles', 'risc-cisc'] },
      { id: 'elagazasbecsles', term: 'Elágazásbecslés', en: 'branch prediction', topic: 'arch', short: 'A processzor megtippeli egy feltételes ugrás kimenetelét, hogy ne kelljen megállítania a futószalagot.',
        text: 'A mai becslők 95–99%-os pontossággal dolgoznak, a múltbeli viselkedésből tanulnak. Ha a tipp rossz, a félig végrehajtott utasításokat el kell dobni, ami 15–20 ciklus veszteség. Ezért lassabb egy véletlenszerűen ugráló kód, mint egy kiszámítható.',
        related: ['futoszalag'] },
      { id: 'cache', term: 'Gyorsítótár (cache)', en: 'cache memory', topic: 'mem', short: 'Kis, gyors SRAM memória a processzorban, amely a gyakran használt adatokat tartja közel a magokhoz.',
        prereq: ['modell:processzor'],
        text: 'Azért működik, mert a programok viselkedése **lokális**: ami most kellett, az hamarosan újra kell (**időbeli lokalitás**), és ami mellette van, az is (**térbeli lokalitás**). Ezért a cache nem bájtonként, hanem 64 bájtos **cache-sorokban** (cache line) tölt be.',
        formulas: ['amat'],
        pitfall: 'Egy kétdimenziós tömb oszloponkénti bejárása sokszor lassabb, mint a soronkénti, mert minden lépés másik cache-sorba esik.',
        related: ['memoriahierarchia', 'regiszter'], models: ['processzor'] },
      { id: 'memoriahierarchia', term: 'Memóriahierarchia', en: 'memory hierarchy', topic: 'mem', short: 'A tárolók rétegzése a gyors, kicsi és drága regiszterektől a lassú, nagy és olcsó háttértárig.',
        visual: memSvg, caption: 'Minden szint nagyjából egy nagyságrenddel lassabb, de nagyobb az előzőnél.',
        text: 'A cél, hogy a rendszer majdnem olyan gyors legyen, mint a legfelső szint, és majdnem olyan nagy és olcsó, mint a legalsó. Ez a lokalitás miatt sikerül: az adatok túlnyomó többsége a felső szinteken van épp kéznél.',
        formulas: ['amat'],
        related: ['cache', 'regiszter', 'dram'] },
      { id: 'dram', term: 'DRAM', en: 'dynamic random-access memory', topic: 'mem', short: 'A számítógép fő memóriája: bitenként egy tranzisztor és egy kondenzátor, amit rendszeresen frissíteni kell.',
        text: 'A kondenzátor töltése lassan elszivárog, ezért kb. 64 ms-onként minden cellát újra kell írni (frissíteni). Olcsó és sűrű, de lassabb, mint az SRAM (6 tranzisztor/bit). A DDR5 egyetlen moduljával 64 GB is lehetséges.',
        related: ['memoriahierarchia', 'cache'], models: ['alaplap'] },
      { id: 'moore', term: 'Moore-törvény', en: "Moore's law", topic: 'aramkor', short: 'Megfigyelés: a chipeken lévő tranzisztorok száma nagyjából kétévente megduplázódik.',
        prereq: ['lecke:matematika/szazalek'],
        visual: mooreSvg, caption: 'Tranzisztorszám logaritmikus skálán: a duplázódás egyenesként látszik.',
        text: 'Gordon Moore 1965-ben fogalmazta meg (1975-ben pontosította kétévesre). Ez nem természeti törvény, hanem iparági ütemterv. Az órajel kb. 2005 óta alig nő (ez a „teljesítményfal”), a tranzisztorokat azóta inkább több magra, cache-re és gyorsítókra fordítják.',
        related: ['mosfet', 'cmos'], models: ['processzor'] }
    ]
  });
})();
