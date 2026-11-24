/* Modell: Processzor (CPU) – rétegekre bontva, izometrikus nézetben. */
(function () {
  var I = STUDIE.draw.iso(300, 220);

  // Hordozó + apró kondenzátorok
  var substrate = I.box(-100, -100, 0, 200, 200, 8, '#2e7d4f');
  [[-80, -80], [-70, -80], [60, -80], [70, -80], [-80, 60], [-80, 70], [75, 40], [75, 50], [40, 75], [50, 75]].forEach(function (c) {
    substrate += I.box(c[0], c[1], 8, 6, 4, 2.5, '#b08a5a');
  });
  substrate += I.face(-48, -48, 8.1, 96, 96, 'rgba(0,0,0,.12)', ' stroke="none"');

  // Érintkezők (LGA felület) – a hordozó alján lévő aranyozott pontok
  var pads = I.face(-100, -100, 0, 200, 200, 'rgba(46,125,79,.18)', ' stroke="#2e7d4f" stroke-dasharray="4 3" stroke-width="1"');
  for (var x = -92; x <= 88; x += 12) for (var y = -92; y <= 88; y += 12) {
    if (Math.abs(x + 2) < 30 && Math.abs(y + 2) < 30) continue;
    pads += I.face(x, y, 0, 6, 6, '#e3b341', ' stroke="#a77d12" stroke-width="0.5"');
  }

  // Szilícium lapka és a rajta lévő funkcionális egységek
  var die = I.box(-40, -40, 8, 80, 80, 4, '#3b3f6b');
  var Z = 12.05;
  var cores = '';
  [[-38, -38], [-18, -38], [-38, -14], [-18, -14]].forEach(function (c) {
    cores += I.face(c[0], c[1], Z, 18, 22, '#7d6cf0') + I.face(c[0] + 3, c[1] + 3, Z, 8, 7, '#a79bff', ' stroke="none"');
  });
  var cache = I.face(2, -38, Z, 14, 46, '#4fb6c9') + I.face(-38, 10, Z, 38, 8, '#4fb6c9');
  var imc = I.face(18, -38, Z, 20, 46, '#e08a3c');
  var gpu = I.face(2, 10, Z, 36, 28, '#d4537e') + I.face(-38, 20, Z, 38, 18, '#cf6f95');

  var tim = I.face(-40, -40, 14, 80, 80, 'rgba(200,200,210,.85)', ' stroke="#9aa0ac" stroke-width="1"') +
    I.face(-32, -32, 14.2, 64, 64, 'rgba(255,255,255,.35)', ' stroke="none"');

  // Hőelosztó fedél: oldalfalakkal, tetején gravírozott felirattal
  var ihs = I.box(-90, -90, 16, 180, 180, 10, '#c7ccd4');
  var t = I.pt(0, 0, 26);
  ihs += '<text x="' + t[0] + '" y="' + (t[1] + 4) + '" text-anchor="middle" font-size="15" font-family="sans-serif" font-weight="700" fill="#8b929e" transform="rotate(0)">TUDÁS CPU</text>';

  STUDIE.addModel({
    id: 'processzor',
    title: 'Processzor (CPU)',
    icon: '🧠',
    color: '#6f5cf0',
    category: 'Számítástechnika',
    keywords: 'CPU chip mikroprocesszor szilícium lapka die mag core cache gyorsítótár litográfia wafer Intel AMD',
    summary: 'A számítógép „agya”: egy körömnyi szilíciumlapkán több milliárd tranzisztor.',
    scale: 'kb. 4 × 4 cm, a lapka kb. 1–2 cm²',
    viewBox: '0 -150 600 600',
    intro: 'A processzor utasításokat hajt végre: összead, összehasonlít, adatot mozgat, másodpercenként több milliárdszor. Amit kívülről látsz, az csak a **tokozás**. Az igazi munkát egy apró **szilícium lapka** végzi a fém fedél alatt.',
    parts: [
      {
        id: 'ihs', z: 5, name: 'Hőelosztó fedél (IHS)', en: 'integrated heat spreader (IHS)',
        uni: 'A hőelvezetés **termikus ellenállások soros láncaként** modellezhető (lapka → TIM → fedél → hővezető paszta → hűtő → levegő): `ΔT = P · ΣR_th`. Egy 150 W-os processzornál már 0,1 K/W többlet-ellenállás is 15 °C-kal melegebb lapkát jelent. A réz hővezetési tényezője kb. 400 W/(m·K), az alumíniumé kb. 235 W/(m·K): ezért réz a fedél. A hőáram a **Fourier-törvényt** követi: `q = −λ · dT/dx`.', svg: ihs, explode: [0, -240],
        what: 'A processzor tetején látható fémlap. Védi a törékeny szilícium lapkát, és a lapka hőjét nagy felületen elosztja, hogy a hűtő jól el tudja vezetni.',
        madeOf: '**Réz**, mert nagyon jól vezeti a hőt, vékony **nikkel** bevonattal a korrózió ellen. Ettől ezüstös a színe.',
        how: 'Rézlemezből sajtolják, megmunkálják, majd galvanizálással nikkelezik. A gyárban ragasztóval rögzítik a hordozóhoz, és ráírják (lézerrel gravírozzák) a típust és a sorozatszámot.',
        fact: 'A régi processzorokon nem volt fedél: a hűtő közvetlenül a csupasz lapkára feküdt, és könnyű volt letörni a sarkát.'
      },
      {
        id: 'tim', z: 4, name: 'Hővezető réteg (TIM)', en: 'thermal interface material (TIM)',
        uni: 'A TIM teljesítményét a **termikus impedancia** jellemzi (mm²·K/W). Az indium forrasz hővezetése kb. 80 W/(m·K), egy jó paszta csak 5–10 W/(m·K), ezért a forrasztott fedél akár 10–20 °C-kal hűvösebb lapkát ad. A rétegvastagság (BLT, bond line thickness) néhány tíz mikrométer.', svg: tim, explode: [0, -150],
        what: 'Vékony réteg a lapka és a fedél között. A két fémfelület mikroszkopikus egyenetlenségei közé levegő szorulna, ami rossz hővezető. Ez a réteg kitölti a réseket.',
        madeOf: 'Drágább processzoroknál **indium** fémforrasz, olcsóbbaknál szilikon alapú **hővezető paszta**, amelyben fém-oxid vagy kerámia por van.',
        how: 'Az indiumot vékony fóliaként a lapkára helyezik, és kemencében megolvasztják, így összeforrasztja a lapkát a fedéllel. A pasztát adagolóval viszik fel.'
      },
      {
        id: 'die', z: 2, name: 'Szilícium lapka (die)', svg: die, explode: [0, -75], badge: [374, 208], link: 'tranzisztor', en: 'die',
        terms: ['digitalis-technika/cmos', 'digitalis-technika/mosfet', 'digitalis-technika/moore'],
        uni: 'A litográfia felbontását a **Rayleigh-kritérium** adja: `CD = k₁ · λ / NA`, ahol λ a fény hullámhossza (EUV: 13,5 nm), NA a numerikus apertúra (0,33, a High-NA gépeknél 0,55), k₁ pedig folyamatfüggő tényező (~0,3). A „3 nm-es” technológia neve ma már marketingnév: a legkisebb fémvezeték-osztás kb. 20–30 nm. A kihozatal (yield) a **Poisson-modellel** becsülhető: `Y = e^(−D₀·A)`, ahol D₀ a hibasűrűség, A a lapka területe. Ezért drágák a nagy lapkák, és ezért terjedtek el a chipletek.',
        what: 'Ez maga a „chip”: egy kb. 1–2 cm² területű, alig fél milliméter vastag szilíciumdarab. A felszínén **több milliárd tranzisztor** és több tíz kilométernyi mikroszkopikus rézvezeték van, 10–15 rétegben egymás fölött.',
        madeOf: '99,9999999%-os tisztaságú **szilícium** egykristály. Erre jönnek a **réz** összeköttetések, szigetelő **szilícium-dioxid** és más speciális anyagok (pl. hafnium-oxid). Egyes rétegekbe bór, foszfor vagy arzén atomokat juttatnak (ez az adalékolás).',
        how: 'Homokból (kvarcból) tiszta szilíciumot állítanak elő, abból hengert (ingotot) növesztenek, majd vékony szeletekre (waferekre) vágják. Egy waferen több száz lapka készül egyszerre **fotolitográfiával**: fénnyel „rajzolják” rá a mintákat, rétegről rétegre, több száz lépésben. A teljes folyamatot lent, a gyártási lépéseknél nézheted végig.',
        fact: 'Egy mai csúcsprocesszor tranzisztorai olyan kicsik, hogy egy vörösvérsejt területére több millió elférne.'
      },
      {
        id: 'cores', z: 3, name: 'Processzormagok', en: 'CPU cores',
        terms: ['digitalis-technika/alu', 'digitalis-technika/futoszalag', 'digitalis-technika/regiszter', 'digitalis-technika/elagazasbecsles', 'digitalis-technika/isa'],
        uni: 'Egy modern mag **szuperskalár, sorrenden kívüli (out-of-order)** végrehajtású: ciklusonként 4–8 utasítást hív le és dekódol, átnevezi a regisztereket a hamis függőségek kiküszöbölésére, és egy több száz bejegyzéses átrendező puffer (ROB) tartja meg a program szerinti sorrendet. A teljesítményt az IPC (instructions per cycle) és az órajel szorzata adja.', svg: cores, explode: [0, -75], link: 'tranzisztor',
        what: 'A magok (core) végzik a tényleges számolást. Mindegyik önálló „mini processzor” saját számolóegységgel (ALU), vezérlőegységgel és regiszterekkel. Több maggal több feladat fut párhuzamosan.',
        madeOf: 'Ugyanaz a szilícium, csak itt a tranzisztorok logikai kapukká (ÉS, VAGY, NEM) vannak összekötve, ezekből épülnek fel az összeadók és szorzók.',
        how: 'A mérnökök hardverleíró nyelven (pl. Verilog) „programozzák” a mag felépítését. Szoftverek alakítják ezt tranzisztorok elrendezésévé, és több éves tervezés, szimuláció és tesztelés után kerül gyártásba.'
      },
      {
        id: 'cache', z: 3, name: 'Gyorsítótár (cache)', en: 'cache (L1/L2/L3)',
        terms: ['digitalis-technika/cache', 'digitalis-technika/memoriahierarchia'],
        uni: 'Egy SRAM cella 6 tranzisztorból áll (6T): két keresztbe kötött inverter tárolja a bitet, két hozzáférési tranzisztor köti a bitvonalakra. A cache **halmazasszociatív**: a cím középső bitjei választják ki a halmazt, a felső bitek (tag) azonosítják a sort. Tipikus L1: 32–48 KB, 8–12 utas, 64 bájtos sorok.', svg: cache, explode: [0, -75],
        what: 'Nagyon gyors, kis méretű memória közvetlenül a lapkán. Ide kerülnek a legtöbbet használt adatok, hogy a magoknak ne kelljen a sokkal lassabb RAM-ra várniuk.',
        madeOf: 'SRAM cellák: bitenként 6 tranzisztor. Ezért drága és nagy helyet foglal, de nagyon gyors.',
        how: 'Ugyanabban a gyártási folyamatban készül, mint a magok. Szabályos, ismétlődő mintázatáról a lapkafotókon könnyű felismerni.',
        fact: 'Az L1 cache kb. 1 ns alatt válaszol, a RAM kb. 80–100 ns alatt. Ha az L1 egy másodperc lenne, a RAM majdnem két perc.'
      },
      {
        id: 'imc', z: 3, name: 'Memóriavezérlő és I/O', en: 'integrated memory controller (IMC), I/O',
        terms: ['digitalis-technika/dram'],
        uni: 'A DDR5 interfész csatornánként 2 × 32 bites alcsatornával dolgozik, a PCIe 5.0 sávonként 32 GT/s sebességű, 128b/130b kódolású soros kapcsolat. Ilyen sebességnél a vezeték már **tápvonalként** viselkedik: impedanciaillesztés és kiegyenlítés (equalization) kell, különben a jelvisszaverődések lerontják a „szemábrát”.', svg: imc, explode: [0, -75],
        what: 'Ez az egység tartja a kapcsolatot a külvilággal: a RAM-mal, a videokártyával (PCI Express) és az alaplap többi részével.',
        madeOf: 'Tranzisztorok, valamint nagy áramú meghajtó- és vevőáramkörök, amelyek a lapka szélén lévő kivezetésekhez kapcsolódnak.',
        how: 'A lapkával együtt gyártják. A lapka alján apró forrasztógolyók (bumpok) kötik össze a hordozóval: a lapkát fejjel lefelé fordítva forrasztják rá (flip-chip technológia).'
      },
      {
        id: 'gpu', z: 3, name: 'Integrált grafika (iGPU)', en: 'integrated graphics processing unit (iGPU)', svg: gpu, explode: [0, -75],
        what: 'Sok processzorban van beépített grafikus egység, ami a képet állítja elő a monitor számára. Sok kicsi, egyszerű számolóegységből áll, amelyek egyszerre sok képpontot számolnak.',
        madeOf: 'Szilícium tranzisztorok, ugyanúgy, mint a magokban, csak másképp szervezve: sok egyszerű egység dolgozik párhuzamosan.',
        how: 'A lapka része, együtt gyártják a többi egységgel.'
      },
      {
        id: 'substrate', z: 1, name: 'Hordozó (szubsztrát)', en: 'package substrate', svg: substrate, explode: [0, 0],
        what: 'Zöld vagy barna, többrétegű kis nyomtatott áramkör. A lapka apró, sűrű kivezetéseit „széthúzza” az alaplapi foglalathoz illeszkedő, nagyobb érintkezőkre. A rajta ülő apró alkatrészek kondenzátorok, ezek simítják a tápfeszültséget.',
        madeOf: 'Üvegszálas vagy speciális műgyanta rétegek (pl. ABF fólia), köztük vékony **rézvezetékekkel** és furatokkal.',
        how: 'Rétegenként laminálják (préselik), a rézvezetékeket maratással alakítják ki, a rétegeket lézerrel fúrt, rézzel kitöltött furatok kötik össze. Végül ráforrasztják a lapkát és a kondenzátorokat.'
      },
      {
        id: 'pads', z: 0, name: 'Érintkezők (LGA)', en: 'land grid array (LGA)', svg: pads, explode: [0, 90], link: 'alaplap',
        what: 'A processzor alján több mint ezer aranyozott érintkező. Ezek fekszenek rá az alaplapi foglalat rugós tűire, és ezeken keresztül kap a processzor tápot és adatot. (A rajzon külön rétegként látszanak, valójában a hordozó alján vannak.)',
        madeOf: 'Réz érintkezőfelületek vékony **nikkel** és **arany** bevonattal. Az arany nem oxidálódik, így évtizedekig jó marad az érintkezés.',
        how: 'A hordozó gyártásakor alakítják ki, majd galvanizálással aranyozzák. Régebbi processzoroknál (PGA) tűk voltak az alján, ma a tűk inkább az alaplapi foglalatban vannak.'
      }
    ],
    uni: {
      text: 'Egyetemi szemmel a processzor három, egymásba ágyazott rendszer: **félvezető-fizikai** (tranzisztorok), **logikai** (kapuk, tárolók, futószalag) és **termikus–elektromos** (teljesítmény, hő, tápellátás). A lenti szimulációban a teljesítményfelvétel két fő összetevőjét vizsgálhatod: a kapcsolgatásból adódó dinamikus és a szivárgásból adódó statikus teljesítményt.',
      widgets: [{ type: 'cpu-teljesitmeny' }],
      terms: ['digitalis-technika/cmos', 'digitalis-technika/orajel', 'digitalis-technika/futoszalag', 'digitalis-technika/cache', 'digitalis-technika/moore']
    },
    steps: [
      { icon: '🏖️', title: 'Homokból szilícium', text: 'A kiindulási anyag a **kvarchomok** (szilícium-dioxid, SiO₂). Ívkemencében, kb. 2000 °C-on szénnel redukálják: így kb. 98%-os „kohászati” szilícium lesz belőle. Ezt vegyi úton (gázzá alakítva, desztillálva) tovább tisztítják **99,9999999%-ra** (ez a „kilenc kilences” tisztaság).' },
      { icon: '🧪', title: 'Egykristály növesztése', text: 'A tiszta szilíciumot kb. 1420 °C-on megolvasztják. Egy kis „oltókristályt” mártanak bele, majd lassan forgatva kihúzzák (ez a **Czochralski-eljárás**). Így egy 30 cm átmérőjű, akár 2 m hosszú, tökéletes egykristály henger (**ingot**) nő, amelyben minden atom szabályos rácsban áll.' },
      { icon: '🔪', title: 'Szeletelés: a wafer', text: 'A hengert gyémántbevonatú dróttal kb. 0,8 mm vastag korongokra (**waferekre**) vágják. Ezeket tükörsimára polírozzák: a felület egyenetlensége néhány atomnyi.' },
      { icon: '💡', title: 'Fotolitográfia', text: 'A wafert fényérzékeny lakkal (fotoreziszttel) vonják be. Egy maszkon keresztül extrém ultraibolya (**EUV**, 13,5 nm hullámhosszú) fénnyel megvilágítják, mintha fényképet nagyítanának, csak itt kicsinyítenek. Ahol fény érte, a lakk oldhatóvá válik, és lemosható. Így rajzolódik ki a mintázat.', parts: ['die'] },
      { icon: '⚗️', title: 'Maratás és adalékolás', text: 'A lakk nélküli helyeken plazmával kimarják az anyagot, vagy **ionimplantációval** bór, foszfor vagy arzén atomokat lőnek a szilíciumba. Ettől lesz egy terület p- vagy n-típusú: ebből lesznek a **tranzisztorok**. A litográfia, maratás és adalékolás több százszor ismétlődik, rétegről rétegre.', parts: ['die', 'cores'] },
      { icon: '🔗', title: 'Rézvezetékek rétegei', text: 'A tranzisztorok fölé 10–15 rétegben építik fel a **réz összeköttetéseket**, köztük szigetelő réteggel. Az alsó rétegekben a vezetékek csak néhányszor tíz nanométer szélesek, a felsők egyre vastagabbak. Egy wafer feldolgozása összesen **2–3 hónapig** tart, közel 1000 lépésben, porálló tisztatérben.', parts: ['die', 'cache', 'imc'] },
      { icon: '🧪', title: 'Tesztelés a waferen', text: 'Vékony tűkkel minden lapkát megmérnek még a waferen. A hibás lapkákat megjelölik. A jó lapkák arányát **kihozatalnak** (yield) hívják, ez egy új gyártástechnológiánál eleinte alacsony.' },
      { icon: '✂️', title: 'Darabolás és tokozás', text: 'A wafert gyémántfűrésszel vagy lézerrel lapkákra vágják. Minden jó lapkát fejjel lefelé ráforrasztanak a **hordozóra** (flip-chip), felviszik a **hővezető réteget**, majd ráragasztják a **hőelosztó fedelet**.', parts: ['die', 'substrate', 'tim', 'ihs'] },
      { icon: '🏷️', title: 'Végső teszt és osztályozás', text: 'Minden kész processzort tesztelnek különböző órajeleken és hőmérsékleteken. A jobban sikerült példányokból lesznek a drágább, gyorsabb típusok, a gyengébbekből (vagy ahol egy mag hibás, és letiltják) olcsóbb típusok. Ezt **binningnek** hívják. Végül lézerrel rájuk írják a típusjelzést.', parts: ['ihs', 'pads'] }
    ],
    history: [
      { year: '1947', text: 'A Bell Laboratóriumban megépítik az első **tranzisztort** (germániumból). Ez az egész elektronika alapköve.' },
      { year: '1958–59', text: 'Jack Kilby és Robert Noyce egymástól függetlenül feltalálja az **integrált áramkört**: több alkatrész egyetlen lapkán.' },
      { year: '1971', text: 'Megjelenik az **Intel 4004**, az első kereskedelmi mikroprocesszor: 2300 tranzisztor, 740 kHz.' },
      { year: '1978', text: 'Az **Intel 8086** elindítja az x86-családot, amelyre a mai PC-k processzorai is épülnek.' },
      { year: '1985', text: 'Az ARM első processzora. Az ARM-alapú chipek ma szinte minden mobiltelefonban ott vannak.' },
      { year: '2005', text: 'Megjelennek az első asztali **kétmagos** processzorok: az órajel helyett a magok száma kezd nőni.' },
      { year: '2019', text: 'Tömeggyártásba kerül az **EUV litográfia**, amely 13,5 nm-es hullámhosszú fénnyel dolgozik.' },
      { year: 'ma', text: 'A csúcsprocesszorokban **több tízmilliárd** tranzisztor van, és több lapkát (chipletet) is egy tokba építenek.' }
    ],
    quiz: [
      { q: 'Miből készül a processzor lapkája?', options: ['Rendkívül tiszta szilíciumból', 'Rézből', 'Aranyból', 'Műanyagból'], answer: 0, explain: 'A szilícium félvezető: adalékolással szabályozható, mennyire vezet.' },
      { q: 'Mi a hőelosztó fedél fő feladata?', options: ['Elosztja és a hűtőhöz vezeti a lapka hőjét', 'Tárolja az adatokat', 'Áramot termel', 'Számol'], answer: 0, explain: 'A fedél nagy felületen adja át a hőt a hűtőnek, és védi a lapkát.' },
      { q: 'Mi az a wafer?', options: ['Vékony szilíciumszelet, amin egyszerre sok lapka készül', 'Egy fajta hűtőpaszta', 'A processzor foglalata', 'Egy programozási nyelv'], answer: 0, explain: 'Egy 30 cm-es waferen több száz lapka fér el.' },
      { q: 'Miért van gyorsítótár (cache) a processzorban?', options: ['Mert a RAM sokkal lassabb', 'Hogy hűtse a magokat', 'Hogy több áramot fogyasszon', 'Dísznek'], answer: 0, explain: 'A cache a gyakran használt adatokat tartja közel a magokhoz.' }
    ]
  });
})();
