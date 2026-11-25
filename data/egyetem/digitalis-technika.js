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
      { id: 'mem', title: 'Memória' },
      { id: 'sorrendi', title: 'Sorrendi hálózatok és időzítés' }
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
      },
      {
        id: 'max-orajel', title: 'Szinkron hálózat maximális órajel-frekvenciája', en: 'maximum clock frequency (setup constraint)',
        parts: [{ t: 'f_{max}', d: 'A legnagyobb órajel-frekvencia, amelyen a hálózat még hibátlanul működik', unit: 'Hz' }, { t: '= 1 / (' },
          { t: 't_{co}', d: 'A forrás flip-flop késleltetése az órajel élétől a kimenet megváltozásáig (clock-to-output)', unit: 's' }, { t: '+' },
          { t: 't_{komb}', d: 'A leghosszabb kombinációs út (kritikus út) késleltetése a két tároló között', unit: 's' }, { t: '+' },
          { t: 't_{su}', d: 'A cél flip-flop előkészítési (setup) ideje', unit: 's' }, { t: ')' }],
        text: 'Ha az órajel nem egyszerre érkezik a két tárolóhoz (órajel-elcsúszás, skew), az is a nevezőbe kerül. A tartási (hold) feltétel ettől független: `t_co + t_komb,min ≥ t_h` – ezt az órajel lassításával sem lehet javítani.',
        example: 't_co = 0,5 ns, t_komb = 3 ns, t_su = 0,3 ns: `f_max = 1 / 3,8 ns ≈ 263 MHz`. Ha a kombinációs utat egy futószalag-regiszterrel két 1,5 ns-os részre bontjuk: `1 / 2,3 ns ≈ 435 MHz`.'
      },
      {
        id: 'mtbf-szinkronizalo', title: 'Metastabilitás: átlagos idő két hiba között (MTBF)', en: 'synchronizer MTBF',
        parts: [{ t: 'MTBF', d: 'Átlagos idő két olyan esemény között, amikor a szinkronizáló kimenete még nem dőlt el a mintavételkor', unit: 's' }, { t: '= e^{' },
          { t: 't_r', d: 'A metastabil állapot feloldására hagyott idő (például a második flip-flopig hátralévő idő)', unit: 's' }, { t: '/' },
          { t: 'τ', d: 'A flip-flop feloldási időállandója (technológiafüggő)', unit: 's' }, { t: '} / (' },
          { t: 'T_0', d: 'A flip-flop „sebezhetőségi ablakára” jellemző technológiai paraméter', unit: 's' }, { t: '·' },
          { t: 'f_{clk}', d: 'Az órajel frekvenciája', unit: 'Hz' }, { t: '·' }, { t: 'f_{adat}', d: 'Az aszinkron bemenet változásainak gyakorisága', unit: 'Hz' }, { t: ')' }],
        text: 'Az exponenciális tag miatt a feloldási idő kis növelése is nagyságrendekkel javítja a megbízhatóságot. Ezért elég egy második (harmadik) flip-flop a szinkronizálóban.',
        example: 'Szemléltető értékek: τ = 50 ps, T_0 = 1 ns, f_clk = 100 MHz, f_adat = 1 MHz. t_r = 0,5 ns mellett `MTBF = e^10 / 10⁵ ≈ 0,2 s` – másodpercenként többször hibázik! t_r = 2 ns mellett `e^40 / 10⁵ ≈ 2 · 10¹² s`, ami több tízezer év.'
      },
      {
        id: 'lebegopontos-ertek', title: 'Egyszeres pontosságú lebegőpontos szám értéke (IEEE 754)', en: 'IEEE 754 single precision value',
        parts: [{ t: 'x', d: 'A kódolt (normalizált) szám értéke', unit: '–' }, { t: '= (−1)^' }, { t: 's', d: 'Előjelbit: 0 pozitív, 1 negatív', unit: '1 bit' }, { t: '· 1,' },
          { t: 'm', d: 'Mantissza (törtrész): a kettedes vessző utáni 23 bit; a vezető 1-est nem tároljuk (rejtett bit)', unit: '23 bit' }, { t: '· 2^(' },
          { t: 'e', d: 'Eltolt kitevő (8 bit, 1…254 normalizált számokra)', unit: '8 bit' }, { t: '− 127)', d: 'Eltolás (bias): 2^7 − 1', unit: '–' }],
        text: 'Az e = 0 a nullát és a denormalizált (nagyon kicsi) számokat, az e = 255 a végtelent és a NaN-t (nem szám) kódolja. Dupla pontosságban 1 + 11 + 52 bit és 1023 eltolás. A relatív kerekítési hiba egyszeres pontosságnál legfeljebb `2^(−24) ≈ 6 · 10⁻⁸`.',
        example: '−6,25 = −1,5625 · 2² → s = 1, e = 2 + 127 = 129 = 10000001₂, m = 0,5625 = 0,1001₂ → bitminta `1 10000001 10010000000000000000000` = 0xC0C80000.'
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
        related: ['mosfet', 'cmos'], models: ['processzor'] },
      /* ---------- Bővítés: sorrendi hálózatok, időzítés, architektúra, memória ---------- */
      { id: 'lebegopontos', term: 'Lebegőpontos számábrázolás (IEEE 754)', en: 'floating-point representation', topic: 'logika', prereq: ['digitalis-technika/kettes-komplemens', 'lecke:informatika/szamrendszerek'],
        short: 'Valós számok közelítő ábrázolása előjel, kitevő és mantissza formájában (normálalak kettes számrendszerben), amely nagyon nagy és nagyon kicsi számokat is ugyanannyi relatív pontossággal kezel.',
        text: 'A fixpontos ábrázolás (egész számok, rögzített helyen a kettedes vesszővel) egyszerű, de kis értéktartományú. A lebegőpontos szám a tudományos normálalak bináris megfelelője: `x = (−1)^s · 1,m · 2^(e − bias)`. Az IEEE 754 szabvány (1985, későbbi átdolgozásokkal) ma szinte minden processzorban egységes:\n\n- **egyszeres pontosság** (32 bit): 1 előjel + 8 kitevő + 23 mantissza, eltolás 127, kb. 7 decimális jegy;\n- **dupla pontosság** (64 bit): 1 + 11 + 52 bit, eltolás 1023, kb. 15–16 decimális jegy.\n\nA normalizált mantissza mindig 1-gyel kezdődik, ezért ezt nem tárolják (**rejtett bit**). A kitevő eltolt (biased) alakban szerepel, így két pozitív lebegőpontos szám egészként összehasonlítható. Különleges értékek: ±0, ±végtelen, NaN, denormalizált számok (fokozatos alulcsordulás).\n\nA lényeges következmények:\n\n1. A számok **nem egyenletesen** sűrűek: a szomszédos ábrázolható számok távolsága a nagyságukkal arányos (állandó a **relatív** pontosság).\n2. Sok tizedes tört (például 0,1) kettes számrendszerben végtelen, ezért csak **kerekítve** ábrázolható.\n3. Az összeadás nem asszociatív: `(a + b) + c` és `a + (b + c)` eltérhet.\n4. Közel egyenlő számok kivonásakor az értékes jegyek elvesznek (**kiejtés**, cancellation).\n\nA hardverben a lebegőpontos egység (FPU) végzi a műveleteket: kitevők igazítása, mantisszák összeadása, normalizálás, kerekítés.',
        formulas: ['lebegopontos-ertek'],
        example: 'A 0,1 egyszeres pontosságban valójában 0,100000001490116…; tízszer összeadva nem pontosan 1,0 az eredmény. Ezért pénzügyi számításokban egész (fillér) vagy decimális típusokat használnak.',
        pitfall: 'Lebegőpontos számokat **egyenlőségre** vizsgálni (`a == b`) hibás gyakorlat: tűréssel kell összehasonlítani. A 32 bites float egész számokat is csak 2^24-ig (≈ 16,7 millió) ábrázol pontosan – nagy számlálókra alkalmatlan.',
        related: ['kettes-komplemens', 'alu', 'bit'], tags: ['számábrázolás', 'aritmetika'] },
      { id: 'multiplexer', term: 'Multiplexer, demultiplexer és dekóder', en: 'multiplexer, demultiplexer, decoder', topic: 'aramkor', prereq: ['digitalis-technika/logikai-kapu', 'digitalis-technika/boole'],
        short: 'Kombinációs építőelemek: a multiplexer n kiválasztó bit alapján 2^n bemenet közül egyet kapcsol a kimenetre, a demultiplexer egy bemenetet 2^n kimenet egyikére irányít, a dekóder egy n bites kódot 2^n vonal egyikének aktiválásává alakít.',
        text: '**Multiplexer (MUX, adatválasztó):** a 2:1 MUX logikai függvénye `Y = S̄ · A + S · B`. A 4:1 MUX két kiválasztó bittel, a 2^n:1 MUX n kiválasztó bittel működik; nagyobb multiplexerek kisebbekből fába építhetők. Felhasználás: buszon több forrás közül egy kiválasztása (például az ALU bemenetei), soros-párhuzamos átalakítás, időosztásos átvitel.\n\nFontos elméleti tulajdonság: egy 2^n:1 multiplexer **bármely n változós logikai függvényt** megvalósít, ha az adatbemeneteire az igazságtábla oszlopát (0-kat és 1-eseket) kötjük – a MUX tehát egy univerzális, „programozható” elem. Ez az FPGA-k keresőtáblájának (LUT) alapelve is.\n\n**Dekóder:** n bemenet, 2^n kimenet, amelyek közül pontosan egy aktív (`D_i = 1`, ha a bemeneti kód értéke i). Minden kimenete egy **minterm**, így egy dekóder és VAGY-kapuk bármely függvényt megvalósítanak. Legfontosabb alkalmazása a **címdekódolás**: a processzor címbitjeiből kiválasztja, melyik memória- vagy perifériachip legyen aktív (chip select). Ide tartozik a hétszegmenses kijelzők meghajtója is.\n\n**Demultiplexer:** engedélyező bemenetes dekóder; az adatbemenetet a kiválasztott kimenetre vezeti.\n\n**Kódoló (encoder), prioritáskódoló:** a dekóder fordítottja; a prioritáskódoló a legmagasabb prioritású aktív bemenet sorszámát adja – így választják ki például a kiszolgálandó megszakítást.',
        example: 'Az `F(A, B) = A XOR B` 4:1 multiplexerrel: a kiválasztó bemenetek A és B, az adatbemenetekre rendre 0, 1, 1, 0 kerül. Egy 16 bites címtartományt 4 chipre osztó dekóder a két legfelső címbitből (A15, A14) állít elő 4 chip-select jelet, mindegyik chip 16 KiB-ot kap.',
        pitfall: 'A dekóder kimenetei a bemenetek váltásakor rövid ideig hibás értéket mutathatnak (hazárd, glitch), mert a bemeneti bitek nem pontosan egyszerre változnak. Ha egy ilyen jelből órajelet vagy aszinkron törlést képzünk, hibás működés lesz – a dekódolt jelet szinkron rendszerben csak órajelre mintavételezve szabad használni.',
        related: ['logikai-kapu', 'boole', 'fpga', 'busz', 'alu'], tags: ['kombinációs hálózat', 'építőelem'] },
      { id: 'fpga', term: 'FPGA és programozható logika', en: 'field-programmable gate array', topic: 'aramkor', prereq: ['digitalis-technika/multiplexer', 'digitalis-technika/flip-flop'],
        short: 'Olyan integrált áramkör, amelynek logikai blokkjai és összeköttetései a gyártás után, konfigurációs adatokkal állíthatók be, így ugyanaz a chip tetszőleges digitális hardverré „programozható”.',
        text: 'Az FPGA alapszerkezete:\n\n- **Konfigurálható logikai blokkok:** mindegyikben néhány **keresőtábla** (LUT, look-up table) és flip-flop. Egy k bemenetű LUT egy 2^k bites kis memória, amely egy multiplexeren át bármely k változós logikai függvényt megvalósít – a függvény az igazságtáblája, amelyet a konfiguráció tölt bele. A flip-flopok a sorrendi működést adják.\n- **Programozható összeköttetés-hálózat:** kapcsolók, amelyek a blokkokat összekötik.\n- **I/O blokkok** különféle szabványos jelszintekhez.\n- **Kemény blokkok:** blokk-RAM, szorzó-összeadó (DSP) egységek, órajelkezelők (PLL), gyakran soros nagysebességű adó-vevők, akár teljes processzormagok.\n\nA konfiguráció a legtöbb típusnál SRAM-cellákban van, ezért bekapcsoláskor egy külső memóriából töltődik be (**bitstream**); léteznek flash- és egyszer programozható (antifuse) változatok is.\n\n**Tervezési folyamat:** a hardvert **hardverleíró nyelven** (VHDL, Verilog) írják le – ez nem program, amely utasításokat hajt végre, hanem párhuzamosan működő áramkör leírása. Lépései: szimuláció → szintézis (logikai hálózattá alakítás) → elhelyezés és huzalozás → **időzítéselemzés** (setup/hold teljesülése) → bitstream.\n\n**Hol a helye?** Mikrovezérlő: olcsó, rugalmas, de utasításonként, sorban dolgozik. FPGA: valódi párhuzamosság, determinisztikus időzítés, újrakonfigurálható – jelfeldolgozás, prototípusgyártás, kis sorozat, kommunikációs eszközök. Célhardver (ASIC): nagy sorozatban a leggyorsabb és legtakarékosabb, de a tervezés drága és a kész chip nem módosítható.',
        example: 'Egy 4 bemenetű LUT 16 bitet tárol. Egy 4 bites bináris számláló 4 flip-flopot és 4 LUT-ot foglal: minden bit következő értéke az aktuális 4 bit függvénye. Egy 1000 tárolós FIR-szűrő FPGA-n órajelenként egy teljes kimeneti mintát számolhat, amire egy processzornak ezer utasítás kellene.',
        pitfall: 'A HDL-kód nem szoftver: a `for` ciklus hardvert másol, nem ismétel időben; a kombinációs visszacsatolás vagy a nem teljes feltételek nem szándékolt reteszeket (latch) szintetizálnak. Időzítéselemzés nélkül a szimulációban működő terv a valóságban hibás lehet.',
        related: ['multiplexer', 'flip-flop', 'setup-hold', 'allapotgep', 'sram'], tags: ['programozható logika', 'HDL'] },

      { id: 'kombinacios-sorrendi', term: 'Kombinációs és sorrendi hálózat', en: 'combinational and sequential circuits', topic: 'sorrendi', prereq: ['digitalis-technika/logikai-kapu', 'digitalis-technika/flip-flop'],
        short: 'A kombinációs hálózat kimenete csak a pillanatnyi bemenetektől függ; a sorrendi hálózat kimenete a bemenetek korábbi sorozatától is, vagyis belső állapota (memóriája) van.',
        text: '**Kombinációs hálózat:** `Y = f(X)`. Nincs benne visszacsatolás; leírja egy igazságtábla vagy Boole-függvény. Példák: összeadó, multiplexer, dekóder, komparátor, ALU. A kimenet a bemenet megváltozása után a terjedési késleltetés letelte után áll be; közben átmeneti hibás értékek (**hazárdok**) lehetnek.\n\n**Sorrendi hálózat:** `Y = f(X, Q)`, `Q⁺ = g(X, Q)`, ahol Q a belső állapot, amelyet tárolóelemek (reteszek, flip-flopok) őriznek. A visszacsatolás teszi lehetővé az emlékezést. Az állapotok száma n bit tárolóval legfeljebb 2^n – ezért ezek **véges állapotú gépek**.\n\nKét fajtája:\n\n- **Szinkron:** minden tároló egyetlen közös órajel élére vált. A két él között a kombinációs logika „kiszámolja” a következő állapotot, és a tervezőnek csak azt kell biztosítania, hogy ez egy órajelperiódusnál rövidebb idő alatt megtörténjen. Ez a módszer teszi lehetővé milliárd tranzisztoros chipek megbízható tervezését: a hazárdok nem számítanak, mert az eredményt csak az órajel élén olvassák ki.\n- **Aszinkron:** nincs közös órajel, a változások azonnal továbbterjednek. Gyorsabb és takarékosabb lehet, de a versenyhelyzetek (race) és hazárdok miatt sokkal nehezebb helyesen tervezni.\n\nMinden digitális rendszer ebből a két rétegből áll: tárolók (regiszterek) és köztük kombinációs logika – ezt a nézőpontot hívják **regiszterátviteli szintnek** (RTL), és a processzorok és FPGA-tervek is így készülnek.',
        example: 'Egy 4 bites összeadó kombinációs: ugyanarra a bemenetre mindig ugyanazt adja. Egy kódzár sorrendi: az 1-2-3-4 sorozat utolsó gombnyomására nyit, de ugyanaz a „4”-es gomb önmagában nem nyit – a kimenet a bemenetek **sorozatától** függ.',
        pitfall: 'Kombinációs hálózatban nem szándékos visszacsatolás (kimenet visszakötve a saját bemenetére) reteszt vagy oszcillátort hoz létre. Szinkron tervben a flip-flopok órajel-bemenetére soha ne kerüljön logikai kapu kimenete (gated clock) célzott tervezés nélkül.',
        related: ['flip-flop', 'allapotgep', 'sr-retesz', 'setup-hold', 'osszeado'], tags: ['alapfogalom', 'sorrendi logika'] },
      { id: 'sr-retesz', term: 'SR-retesz és JK-, T-flip-flop', en: 'SR latch, JK and T flip-flops', topic: 'sorrendi', prereq: ['digitalis-technika/kombinacios-sorrendi', 'digitalis-technika/de-morgan'],
        short: 'A legegyszerűbb tárolóelem két keresztbe csatolt NOR- (vagy NAND-) kapuból álló SR-retesz; ebből épülnek az órajelvezérelt D-, JK- és T-flip-flopok, amelyek a következő állapotot a bemenetek és a jelenlegi állapot függvényében adják.',
        text: '**SR-retesz (latch):** két NOR-kapu, mindegyik kimenete a másik bemenetére kötve. Ez a pozitív visszacsatolás **két stabil állapotot** hoz létre (bistabil elem):\n\n- S = 1, R = 0: beírás (Q = 1);\n- S = 0, R = 1: törlés (Q = 0);\n- S = 0, R = 0: tárolás (Q megtartja értékét);\n- S = 1, R = 1: **tiltott** – mindkét kimenet 0, és a bemenetek egyidejű elengedésekor az állapot meghatározatlan.\n\nNAND-kapukkal ugyanez negált (aktív alacsony) bemenetekkel működik. A **kapuzott retesz** egy engedélyező (E) bemenettel kiegészül: amíg E = 1, átlátszó.\n\n**Flip-flop** (élvezérelt tároló): két retesz master–slave elrendezésben, így csak az órajel élén vált – a szinkron tervezés ezt igényli.\n\nKarakterisztikus egyenletek (Q⁺ a következő állapot):\n\n- **D:** `Q⁺ = D` – a legegyszerűbb, a gyakorlatban szinte csak ezt használják;\n- **JK:** `Q⁺ = J · Q̄ + K̄ · Q` – mint az SR, de J = K = 1 esetén **billen** (megfordítja az állapotot), így nincs tiltott kombináció;\n- **T (toggle):** `Q⁺ = T ⊕ Q` – T = 1 esetén minden élen billen: kettes osztó, a számlálók alapeleme.\n\nAz átalakítás egyszerű: egy D flip-flop elé kombinációs logikát téve bármely más típus megvalósítható (például T: `D = T ⊕ Q`). A tervezésben a flip-flopok **vezérlési táblája** (excitation table) adja meg, milyen bemenet kell egy adott állapotátmenethez.',
        example: 'Pergésmentesítés SR-retesszel: egy váltóérintkezős nyomógomb egyik érintkezője S-re, a másik R-re csatlakozik. Az érintkező pattogása közben a retesz már az első érintkezéskor átbillen, és a további pattanások (amelyek csak ugyanazt a bemenetet érintik) nem változtatnak rajta.',
        pitfall: 'A retesz szintvezérelt (átlátszó), a flip-flop élvezérelt – a kettő összekeverése időzítési hibákhoz vezet. HDL-ben a hiányos `if` ágak nem szándékos reteszt szintetizálnak.',
        related: ['flip-flop', 'kombinacios-sorrendi', 'szamlalo', 'de-morgan', 'regiszter'], tags: ['tárolóelem', 'bistabil'] },
      { id: 'szamlalo', term: 'Számlálók (aszinkron és szinkron)', en: 'counters (ripple and synchronous)', topic: 'sorrendi', prereq: ['digitalis-technika/sr-retesz', 'lecke:informatika/szamrendszerek'],
        short: 'Olyan sorrendi hálózatok, amelyek az órajel (vagy egy eseményjel) hatására előre meghatározott állapotsorozaton – jellemzően a bináris számokon – lépnek végig; frekvenciaosztásra, időzítésre, eseményszámlálásra használják.',
        text: '**Aszinkron (hullámzó, ripple) számláló:** T-flip-flopok láncban, minden fokozat a következő **órajele**. Az első fokozat minden órajelnél, a második minden második-nál, a harmadik minden negyediknél billen: n fokozat 2^n-ig számol, és a k-adik kimenet frekvenciája `f / 2^k`. Egyszerű, de a késleltetések összeadódnak: a legfelső bit n · t_pd késéssel vált, közben átmeneti hibás számértékek jelennek meg.\n\n**Szinkron számláló:** minden flip-flop ugyanazt az órajelet kapja; egy bit akkor billen, ha az összes alacsonyabb helyi értékű bit 1 (`T_k = Q_0 · Q_1 · … · Q_(k−1)`). Minden bit egyszerre vált, a kimenet egyetlen késleltetés után érvényes – szinkron rendszerekben ez az alapértelmezés.\n\n**Változatok:**\n\n- **fel/le számláló:** irányválasztó bemenettel;\n- **modulo-N számláló:** N állapot után kezdi elölről (például decimális, modulo-10: 1001 után 0000). A szinkron törlés a helyes megoldás; az aszinkron törlés rövid hibás állapotot okoz;\n- **betölthető számláló:** kezdőérték beírása – időzítők alapja (a mikrovezérlők timer-perifériája);\n- **Johnson- és gyűrűs számláló:** léptetőregiszter visszacsatolva; állapotonként csak egy bit vált, dekódolása hazárdmentes;\n- **Gray-kódú számláló:** szomszédos állapotok egy bitben térnek el – órajeltartományok közötti átadásnál és helyzetadóknál előnyös.\n\nA számláló egy speciális **állapotgép**, amelynek nincs (vagy csak engedélyező) bemenete.',
        example: 'Egy 32 768 Hz-es órakvarc jeléből 15 bites számlálóval pontosan 1 Hz-es másodpercjel kapható, mert `32 768 = 2^15`. Egy 4 bites modulo-10 számláló 10 órajelenként ad egy átvitelt a következő decimális helyiérték felé.',
        pitfall: 'Aszinkron számláló kimeneteit egyszerre dekódolni hibás: az átmeneti állapotok (például 0111 → 1000 közben 0110, 0100, 0000) rövid hamis impulzusokat okoznak. Aszinkron számlálót egy szinkron rendszerben csak a végén, szinkronizálva szabad olvasni.',
        related: ['sr-retesz', 'allapotgep', 'orajel', 'regiszter', 'metastabilitas'], tags: ['sorrendi hálózat', 'időzítés'] },
      { id: 'allapotgep', term: 'Véges állapotú gép (Moore és Mealy)', en: 'finite state machine (Moore and Mealy)', topic: 'sorrendi', prereq: ['digitalis-technika/kombinacios-sorrendi', 'digitalis-technika/karnaugh'],
        short: 'Sorrendi hálózat absztrakt modellje véges sok állapottal, állapotátmeneti és kimeneti függvénnyel; a Moore-gép kimenete csak az állapottól, a Mealy-gépé az állapottól és a bemenettől is függ.',
        text: 'A véges állapotú gép (FSM) megadása: állapothalmaz, kezdőállapot, bemeneti és kimeneti ábécé, **állapotátmeneti függvény** (`Q⁺ = δ(Q, X)`) és **kimeneti függvény**:\n\n- **Moore-gép:** `Y = λ(Q)` – a kimenet csak az állapottól függ, ezért órajelhez kötötten, hazárdmentesen változik, de egy órajellel később reagál.\n- **Mealy-gép:** `Y = λ(Q, X)` – a kimenet a bemenetre azonnal reagálhat, és gyakran kevesebb állapot kell, de a bemenet zavarai közvetlenül a kimenetre jutnak.\n\nA két modell egyenértékű kifejezőerejű: bármelyik átalakítható a másikba.\n\n**Tervezési lépések:**\n\n1. Szöveges specifikációból **állapotdiagram** (körök = állapotok, nyilak = átmenetek a bemenet feltételével).\n2. **Állapottábla**, majd állapotminimalizálás (az egyenértékű állapotok összevonása).\n3. **Állapotkódolás:** bináris (⌈log₂ N⌉ flip-flop), one-hot (N flip-flop, egyszerű logika – FPGA-n gyakori), Gray-kód.\n4. A következőállapot- és kimeneti logika levezetése (Karnaugh-tábla vagy szintézisprogram).\n5. Ellenőrzés: minden állapotból van-e kivezető út minden bemenetre, kiléphet-e a gép nem használt (illegális) kódokból.\n\nAz állapotgép a vezérlési feladatok univerzális leírása: protokollvezérlők (UART, I²C), forgalmi lámpák, liftek, italautomaták, a processzor vezérlőegysége, és szoftverben is (eseménykezelés, szövegelemzők) ugyanaz a modell.',
        example: 'A „101” bitsorozat felismerése (átfedéssel), Moore-géppel 4 állapot: S0 (semmi), S1 (láttunk egy 1-et), S2 (láttuk: 10), S3 (láttuk: 101, kimenet = 1). Átmenetek: S0 −1→ S1; S1 −0→ S2; S2 −1→ S3; S3 −0→ S2 (az utolsó 1 és ez a 0 egy új „10”), S3 −1→ S1. Mealy-géppel 3 állapot is elég.',
        pitfall: 'A nem használt állapotkódok (például 3 bittel 8 kód, de csak 5 állapot) kezelését nem szabad elhagyni: zavar vagy bekapcsolás után a gép oda kerülhet, és ha onnan nincs kivezető átmenet, „beragad”. Mindig legyen definiált reset-állapot.',
        related: ['kombinacios-sorrendi', 'szamlalo', 'karnaugh', 'fpga', 'utasitasciklus'], tags: ['tervezés', 'modell'] },
      { id: 'setup-hold', term: 'Előkészítési és tartási idő, kritikus út', en: 'setup time, hold time and critical path', topic: 'sorrendi', prereq: ['digitalis-technika/flip-flop', 'digitalis-technika/orajel'],
        short: 'Egy flip-flop csak akkor tárol megbízhatóan, ha a bemenete az órajel éle előtt legalább t_su ideig (setup) és utána legalább t_h ideig (hold) stabil; ebből és a kapuk késleltetéséből adódik a legnagyobb órajel-frekvencia.',
        text: 'A szinkron hálózatban egy jel az egyik flip-flop kimenetéről a kombinációs logikán át a következő flip-flop bemenetére jut. Az időzítési feltételek:\n\n**Setup (előkészítési) feltétel** – a jelnek időben oda kell érnie:\n\n`T_clk ≥ t_co + t_komb,max + t_su (+ órajel-elcsúszás)`.\n\nA leghosszabb késleltetésű utat **kritikus útnak** nevezzük; ez szabja meg a maximális órajelet. Ha a feltétel sérül, **lassabb órajellel** a hiba megszüntethető.\n\n**Hold (tartási) feltétel** – az új adat ne érjen oda túl korán, és ne írja felül a még éppen mintavételezett régit:\n\n`t_co + t_komb,min ≥ t_h (+ órajel-elcsúszás)`.\n\nEz a feltétel az órajel periódusától **független**, ezért egy hold-hibás terv semmilyen frekvencián nem működik megbízhatóan; csak késleltetés beiktatásával javítható.\n\n**Statikus időzítéselemzés (STA):** a tervezőeszköz minden tároló–tároló utat végigszámol a legrosszabb (lassú) és legjobb (gyors) gyártási, hőmérsékleti és feszültségi sarokpontokon, és megadja a **tartalékot** (slack). Negatív slack = időzítési hiba.\n\nHa a kritikus út túl hosszú: logikai optimalizálás, gyorsabb technológia, vagy **futószalagosítás** – a hosszú utat regiszterekkel szakaszokra bontjuk. Ez növeli az órajelet és az áteresztőképességet, de egy-egy eredmény több órajel alatt készül el (késleltetés, latency).',
        formulas: ['max-orajel'],
        example: 't_co = 0,4 ns, t_su = 0,2 ns, t_h = 0,1 ns. A kritikus út 4,4 ns → `T_clk ≥ 5 ns`, `f_max = 200 MHz`. Egy közvetlen tároló–tároló összeköttetésnél t_komb,min = 0: `0,4 ns ≥ 0,1 ns`, a hold-feltétel teljesül.',
        pitfall: 'A setup- és hold-feltételt csak az azonos órajelről működő tárolók között garantálja a tervezés. Aszinkron (más órajelről érkező vagy külső) jelre ezek nem teljesíthetők – ott **metastabilitás** léphet fel, amit szinkronizálóval kell kezelni.',
        related: ['flip-flop', 'orajel', 'futoszalag', 'metastabilitas', 'kombinacios-sorrendi'], tags: ['időzítés', 'órajel'] },
      { id: 'metastabilitas', term: 'Metastabilitás és szinkronizálás', en: 'metastability and synchronization', topic: 'sorrendi', prereq: ['digitalis-technika/setup-hold', 'digitalis-technika/sr-retesz'],
        short: 'Ha egy flip-flop bemenete a setup–hold ablakon belül változik, a tároló egy köztes, bizonytalan állapotba kerülhet, amelyből csak véletlen ideig tartó folyamat után dől el 0-ra vagy 1-re; aszinkron jelek beolvasásánál ez elkerülhetetlen, csak valószínűsége csökkenthető.',
        text: 'A bistabil tárolónak a két stabil állapot között van egy **labilis egyensúlyi pontja** – mint egy hegy tetejére tett golyónak. Ha a bemenet éppen az órajel élénél vált, a tároló ide kerülhet, és a kimenet egy ideig a logikai szintek között „lebeg” vagy oszcillál. A feloldódás exponenciális: annak valószínűsége, hogy t idő után még nem dőlt el, `e^(−t/τ)`-val arányos, ahol τ a technológia időállandója.\n\n**Mikor fordul elő?** Mindig, amikor egy jel nem a fogadó áramkör órajeléhez szinkron érkezik: nyomógomb, külső eszköz, másik órajeltartományból (clock domain) érkező adat. Teljesen kizárni elvileg sem lehet; a cél a hiba **átlagos gyakoriságát** (MTBF) elfogadhatóan kicsire szorítani.\n\n**Szinkronizálási technikák:**\n\n- **Kétfokozatú szinkronizáló:** két sorba kötött flip-flop ugyanarról az órajelről. Az első feloldására egy teljes órajelperiódus jut, mielőtt a második mintavételezi; az MTBF ettől nagyságrendekkel nő. Nagyon nagy frekvencián három fokozat.\n- **Többbites adat** esetén nem szabad bitenként szinkronizálni (a bitek eltérő ciklusban érkezhetnek át): Gray-kódolt számláló, kézfogásos (handshake) protokoll vagy **aszinkron FIFO** szükséges.\n- **Impulzusok** átvitelénél billenő jel (toggle) szinkronizálása és élkeresés.\n\nA szinkronizáló kimenete egy órajellel később érvényes – ez a megbízhatóság ára.',
        formulas: ['mtbf-szinkronizalo'],
        example: 'Egy nyomógomb jele közvetlenül egy állapotgép három flip-flopjára jut. Ha az él az órajellel egybeesik, előfordulhat, hogy az egyik tároló már az új, a másik még a régi értéket veszi át – a gép illegális állapotba ugrik. Megoldás: a gomb jelét előbb egy kétfokozatú szinkronizálón visszük át, és csak annak kimenetét használjuk.',
        pitfall: 'A metastabilitás szimulációban általában nem jelenik meg, és a hiba ritka, nem reprodukálható – ezért különösen alattomos. Kombinációs logikát a szinkronizáló két fokozata közé tenni tilos, mert elveszi a feloldásra szánt időt.',
        related: ['setup-hold', 'flip-flop', 'sr-retesz', 'szamlalo', 'megszakitas'], tags: ['megbízhatóság', 'órajeltartomány'] },

      { id: 'neumann-harvard', term: 'Neumann- és Harvard-architektúra', en: 'von Neumann and Harvard architecture', topic: 'arch', prereq: ['digitalis-technika/utasitasciklus', 'digitalis-technika/memoriahierarchia'],
        short: 'A Neumann-architektúrában az utasítások és az adatok közös memóriában, közös buszon érhetők el; a Harvard-architektúrában külön utasítás- és adatmemória, külön busszal.',
        text: 'Neumann János 1945-ös összefoglalója (First Draft of a Report on the EDVAC) írta le a **tárolt programú számítógép** elvét: a program ugyanúgy a memóriában van, mint az adat, ezért a gép programozása egyszerűen a memória átírása. A felépítés: központi egység (vezérlő + aritmetikai egység), memória, be- és kimenet; az utasítások sorban, a programszámláló szerint hajtódnak végre.\n\n**Előnyei:** egyszerű, rugalmas (a program adatként kezelhető: fordítóprogram, betöltő), a memória szabadon osztható meg kód és adat között.\n\n**Neumann-szűk keresztmetszet:** a processzor és a memória közötti egyetlen csatornán kell átjutnia minden utasításnak és adatnak. Mivel a processzorok sokkal gyorsabban fejlődtek, mint a memória-hozzáférés, ez lett a teljesítmény legfőbb korlátja.\n\nA **Harvard-architektúra** (a Harvard Mark I relégépről elnevezve) külön utasítás- és adatmemóriát használ: egy ciklusban egyszerre olvasható a következő utasítás és egy adat. Tipikus a jelfeldolgozó processzorokban és sok mikrovezérlőben (a program flash-ben, az adat RAM-ban, eltérő szóhosszal is).\n\n**Módosított Harvard-architektúra:** a mai általános célú processzorok kívülről Neumann-elvűek (egyetlen közös főmemória), de az első szintű gyorsítótárat **külön utasítás- és adatcache**-re osztják. Így a programozó egységes memóriát lát, a mag mégis párhuzamosan éri el a kettőt.\n\nBiztonsági vonatkozás: a közös memória miatt az adat utasításként is végrehajtható lehet (kódbefecskendezés); ezt ma hardveres jogosultságbitek (nem végrehajtható lapok) korlátozzák.',
        example: 'Egy egyszerű processzor, amely minden utasításhoz egy adatot is olvas: Neumann-elven két memóriaciklus kell utasításonként, Harvard-elven egy – azonos memóriasebességnél akár kétszeres áteresztőképesség.',
        pitfall: 'Tévhit, hogy a mai PC-k „tiszta” Neumann-gépek: a gyorsítótár szintjén Harvard-szerűek. A Harvard-mikrovezérlőkön viszont a programmemóriában tárolt konstansok (például táblázatok) olvasásához sokszor külön utasítás kell.',
        related: ['utasitasciklus', 'memoriahierarchia', 'cache', 'busz', 'isa'], tags: ['architektúra', 'történet'] },
      { id: 'busz', term: 'Busz (sín) és buszrendszerek', en: 'bus', topic: 'arch', prereq: ['digitalis-technika/neumann-harvard', 'digitalis-technika/multiplexer'],
        short: 'Több egység által közösen használt adatátviteli útvonal, amely adat-, cím- és vezérlővonalakból, valamint az átvitel szabályait rögzítő protokollból áll.',
        text: 'Egy klasszikus számítógép-busz három vonalcsoportból áll:\n\n- **címbusz:** melyik memóriarekesz vagy periféria a cél; n címbit `2^n` címet ad;\n- **adatbusz:** maga az adat, a szélessége (8, 16, 32, 64 bit) határozza meg, mennyi adat megy át egy lépésben;\n- **vezérlőbusz:** írás/olvasás, órajel, érvényes-adat jelek, megszakításkérés, buszkérés.\n\n**Közös vezeték, egy adó:** egyszerre csak egy egység hajthatja a buszt. Ezt **háromállapotú** (tri-state: 0, 1, nagyimpedanciás) vagy nyitott kollektoros/drainű kimenetek biztosítják. Ha több egység is kezdeményezhet átvitelt (több processzor, DMA), **arbitráció** dönt arról, ki kapja meg a buszt (prioritás, körforgó sorrend).\n\n**Szinkron** busz: közös órajelhez kötött ciklusok; **aszinkron**: kézfogás (handshake) jelekkel – a lassú eszköz addig tartja, amíg kész.\n\n**Sávszélesség:** `szélesség · átvitelek másodpercenként`. Kétszeres adatsebességnél (DDR) az órajel mindkét élén van átvitel.\n\n**Párhuzamosról sorosra:** nagy sebességnél a párhuzamos vezetékek közötti késésbeli eltérés (skew) és az áthallás korlátot szab, ezért a modern rendszerek kevés, nagyon gyors, **soros**, differenciális vonalat (sávot, lane) használnak, az órajelet az adatfolyamba kódolva, és pont-pont kapcsolatokat kapcsolóval (switch) kötnek össze. A fedélzeti kis sebességű periféria-buszok (I²C, SPI) egyszerű soros megoldások: az I²C két vezetékkel, nyitott drainű kimenetekkel és címzéssel, az SPI külön chip-select vonalakkal dolgozik.',
        example: '32 bites címbusz `2^32` bájtot, azaz 4 GiB-ot címez. Egy 64 bites, 100 MHz-es DDR-busz sávszélessége `8 bájt · 2 · 100 · 10⁶ 1/s = 1,6 GB/s`.',
        pitfall: 'Ha két egység egyszerre hajtja a buszt ellentétes szinttel (buszütközés, bus contention), rövidzárszerű áram folyik és a kimenetek károsodhatnak; ezért az arbitrációnak és az engedélyező jelek időzítésének hibátlannak kell lennie.',
        related: ['neumann-harvard', 'multiplexer', 'megszakitas', 'dram', 'memoriahierarchia'], tags: ['kommunikáció', 'architektúra'] },
      { id: 'megszakitas', term: 'Megszakítás és közvetlen memória-hozzáférés (DMA)', en: 'interrupt and direct memory access', topic: 'arch', prereq: ['digitalis-technika/utasitasciklus', 'digitalis-technika/busz'],
        short: 'A megszakítás egy hardveres jelzés, amelyre a processzor félbehagyja az éppen futó programot, és egy kiszolgáló rutint futtat; a DMA lehetővé teszi, hogy a perifériák a processzor közreműködése nélkül mozgassanak adatot a memóriába.',
        text: 'Egy periféria (billentyű, időzítő, hálózati vezérlő) eseményére kétféleképpen lehet reagálni:\n\n- **lekérdezés (polling):** a program ciklusban ellenőrzi az állapotot – egyszerű, de pazarolja a processzoridőt, és a reakcióidő a ciklus hosszától függ;\n- **megszakítás (interrupt):** a periféria jelez, és a processzor a következő utasításhatáron reagál.\n\nA megszakítás menete:\n\n1. a jelenlegi utasítás befejeződik;\n2. a processzor elmenti a programszámlálót és az állapotregisztert (veremre);\n3. a **megszakításvektor-tábla** alapján a megfelelő **kiszolgáló rutinra** (ISR) ugrik;\n4. az ISR elmenti a használt regisztereket, kiszolgálja az eseményt, törli a kérést;\n5. visszatérő utasítással a megszakított program folytatódik, mintha mi sem történt volna.\n\nFontos fogalmak: **prioritás** és egymásba ágyazott megszakítások, **maszkolás** (letiltás), **megszakítási késleltetés** (latency) – a kérés és az ISR első utasítása közti idő; valós idejű rendszereknél ennek felső korlátja a lényeg. A kivételek (például nullával osztás) és a szoftveres megszakítások (rendszerhívás) ugyanezt a mechanizmust használják.\n\n**DMA:** nagy adatmennyiség (hálózati csomag, ADC-minták, lemezblokk) mozgatására a DMA-vezérlő a buszt átvéve maga végzi a memóriaműveleteket; a processzor csak elindítja az átvitelt, és a végén egyetlen megszakítást kap. Így a processzor közben mással foglalkozhat.',
        example: 'Egy 115 200 bit/s-os soros port kb. 11 520 bájtot ad másodpercenként. Ha minden bájtra megszakítás jön, és a kiszolgálás 2 µs, az a processzoridő `11 520 · 2 µs ≈ 2,3%`-a. DMA-val 256 bájtos blokkokban ez kb. 45 megszakításra csökken másodpercenként.',
        pitfall: 'A fő program és az ISR által közösen használt változók versenyhelyzetet okozhatnak (például egy több bájtos érték olvasása közben jön a megszakítás). Ilyenkor a kritikus szakaszban a megszakítást rövid időre tiltani kell, és a változót a fordító számára „volatile”-ként jelölni. Az ISR legyen rövid: hosszú műveletet ne végezzen.',
        related: ['utasitasciklus', 'busz', 'regiszter', 'metastabilitas', 'cache'], tags: ['architektúra', 'valós idő'] },

      { id: 'sram', term: 'SRAM (statikus RAM)', en: 'static random-access memory', topic: 'mem', prereq: ['digitalis-technika/sr-retesz', 'digitalis-technika/cmos'],
        short: 'Olyan felejtő memória, amelynek minden bitje egy keresztbe csatolt invertpárban tárolódik; amíg tápfeszültség van, frissítés nélkül megtartja tartalmát, és nagyon gyors, de cellánként sok tranzisztort igényel.',
        text: 'A szabványos **hattranzisztoros (6T) SRAM-cella**: két keresztbe kötött CMOS-inverter (4 tranzisztor) alkot egy bistabil tárolót, és két **hozzáférési tranzisztor** kapcsolja a cella két oldalát a komplementer bitvonal-párra (BL, BL̄), amikor a szóvonal (word line) aktív.\n\n**Olvasás:** a bitvonalakat előtöltik, majd a szóvonal megnyitja a hozzáférési tranzisztorokat; a cella az egyik bitvonalat kissé lehúzza. Az **érzékelő erősítő** (sense amplifier) ezt a kis különbséget gyorsan teljes logikai szintté erősíti. Az olvasás nem rombolja a tartalmat.\n\n**Írás:** az írómeghajtók erősebbek a cella invertereinél, és a bitvonalakon keresztül átbillentik a cellát.\n\n**Összevetés a DRAM-mal:**\n\n- SRAM: 6 tranzisztor/bit, nincs frissítés, nagyon gyors (a cache-ek és regisztertömbök technológiája), de nagy terület és viszonylag nagy szivárgási áram;\n- DRAM: 1 tranzisztor + 1 kondenzátor/bit, sokkal sűrűbb és olcsóbb bitenként, de a töltés elszivárog, ezért rendszeresen frissíteni kell, és az olvasás romboló.\n\nEzért a memóriahierarchiában a processzorhoz közeli kis, gyors szinteken SRAM, a nagy főmemóriában DRAM van. Az SRAM a CMOS logikával azonos gyártástechnológiával készül, így a processzorchipre integrálható. Az FPGA-k konfigurációja is jellemzően SRAM-cellákban tárolódik.\n\nAz SRAM is **felejtő** (volatile): a tápfeszültség megszűnésekor a tartalom elvész.',
        example: 'Egy 1 MiB-os gyorsítótár `8 · 2^20 ≈ 8,4 millió` bitet tárol, ehhez 6T cellákkal kb. 50 millió tranzisztor kell – a vezérlő- és címzőlogikán felül. Ezért foglalják el a cache-ek a modern processzorok chipfelületének jelentős részét.',
        pitfall: 'Az SRAM nem „nem felejtő”, csak nem kell frissíteni – a „statikus” erre utal. Kis tápfeszültségen a cella stabilitása (zajtartaléka) csökken, ezért az SRAM-tömbök gyakran magasabb tápot kapnak, mint a logika.',
        related: ['dram', 'cache', 'memoriahierarchia', 'sr-retesz', 'cmos', 'flash-memoria'], tags: ['memória', 'cella'] },
      { id: 'flash-memoria', term: 'Nem felejtő memóriák: ROM, EEPROM, flash', en: 'non-volatile memory: ROM, EEPROM, flash', topic: 'mem', prereq: ['digitalis-technika/mosfet', 'digitalis-technika/sram'],
        short: 'Tápfeszültség nélkül is megőrzik tartalmukat; a flash-memória cellája egy lebegő kapus (vagy töltéscsapdás) MOSFET, amelynek küszöbfeszültségét a bezárt töltés mennyisége kódolja.',
        text: 'Fejlődési sor: **ROM** (gyártáskor maszkkal rögzített), **PROM** (egyszer, átégetéssel programozható), **EPROM** (UV-fénnyel törölhető), **EEPROM** (elektromosan, bájtonként törölhető), **flash** (elektromosan, nagy blokkokban törölhető, ezért sokkal sűrűbb és olcsóbb).\n\n**A flash-cella elve:** a MOSFET vezérlőkapuja és csatornája között egy minden oldalról szigetelővel körülvett **lebegő kapu** (vagy szigetelőbe ágyazott töltéscsapda) van. Programozáskor nagy térerősséggel elektronokat juttatnak rá (alagúteffektus vagy forró elektronok), törléskor eltávolítják őket. A bezárt negatív töltés megemeli a tranzisztor **küszöbfeszültségét**: olvasáskor egy referenciafeszültséget adva a kapura a tranzisztor vagy vezet, vagy nem – ez a tárolt bit. A szigetelés miatt a töltés évekig megmarad.\n\nTöbb szint egy cellában: ha 4, 8, 16 küszöbszintet különböztetnek meg, egy cella 2, 3, 4 bitet tárol (MLC, TLC, QLC) – nagyobb sűrűség, de kisebb zajtartalék és élettartam.\n\n**Szervezés:**\n\n- **NOR-flash:** a cellák párhuzamosan a bitvonalra kötve, véletlen hozzáférésű, bájtonként olvasható – programkód közvetlen futtatására (mikrovezérlők);\n- **NAND-flash:** a cellák sorba kötve, lapokban (page) olvasható és írható, blokkokban törölhető, nagyon sűrű – SSD, memóriakártya.\n\n**Korlátok és kezelésük:** írni csak törölt cellába lehet; a törlés lassú és blokkszintű; minden program/törlés ciklus koptatja a szigetelőt (korlátozott ciklusszám). Ezért a vezérlő **kopáskiegyenlítést** (wear leveling), hibajavító kódot (ECC) és hibás blokk-kezelést végez, és a logikai címeket egy fordítóréteg képezi a fizikai lapokra.',
        example: 'Egy TLC cella 3 bitet tárol, ehhez `2^3 = 8` küszöbfeszültség-szintet kell megkülönböztetni ugyanabban a feszültségtartományban, amelyben az SLC cella csak kettőt – ezért érzékenyebb a töltésvesztésre és a kopásra.',
        pitfall: 'A flash nem írható felül helyben, mint a RAM: egy bájt módosításához a teljes blokkot másolni, törölni és újraírni kellene. Ha egy mikrovezérlő programja ugyanabba a flash-lapra percenként naplóz, a cella néhány hónap–év alatt elkophat.',
        related: ['sram', 'dram', 'mosfet', 'memoriahierarchia'], tags: ['memória', 'tárolás'] }
    ]
  });
})();
