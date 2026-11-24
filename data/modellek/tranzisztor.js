/* Modell: MOSFET tranzisztor – síkbeli (planáris) n-csatornás tranzisztor keresztmetszete.
 * A szétszedésnél a rétegek függőlegesen eltávolodnak egymástól. */
(function () {
  var st = ' stroke="rgba(0,0,0,.35)" stroke-width="1.2"';
  function rect(x, y, w, h, fill, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"' + (extra || st) + '/>';
  }
  function txt(x, y, s, fill, size, weight) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="system-ui, sans-serif" font-size="' + (size || 13) +
      '" font-weight="' + (weight || 600) + '" fill="' + fill + '">' + s + '</text>';
  }
  function dots(x0, y0, x1, y1, step, r, fill) {
    var s = '';
    for (var y = y0; y <= y1; y += step) for (var x = x0 + ((y - y0) / step % 2 ? step / 2 : 0); x <= x1; x += step) {
      s += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '"/>';
    }
    return s;
  }

  // 1. Szubsztrát: p-típusú szilícium, finom „kristályrács” mintával
  var sub = rect(50, 260, 500, 150, '#b58b9c') +
    dots(62, 330, 540, 400, 14, 1.6, 'rgba(255,255,255,.35)') +
    dots(62, 330, 540, 400, 42, 3, 'rgba(255,255,255,.5)') +
    txt(300, 360, 'p-típusú szilícium (szubsztrát)', '#2a1620', 14, 700) +
    txt(300, 378, 'kevés bór atom → sok „lyuk” (+)', '#3d2430', 11.5, 500);
  // 2–3. Forrás és nyelő: erősen adalékolt n+ tartományok
  function well(x, name) {
    return '<path d="M' + x + ' 260 H' + (x + 140) + ' V292 Q' + (x + 140) + ' 318 ' + (x + 114) + ' 318 H' + (x + 26) + ' Q' + x + ' 318 ' + x + ' 292 Z" fill="#4a7fd4"' + st + '/>' +
      dots(x + 14, 270, x + 126, 279, 9, 1.5, 'rgba(255,255,255,.6)') +
      txt(x + 70, 292, 'n+', '#ffffff', 16, 800) + txt(x + 70, 308, name, '#e8f0ff', 11, 600);
  }
  var source = well(95, 'Forrás (S)');
  var drain = well(365, 'Nyelő (D)');
  // 4. Csatorna
  var chan = rect(235, 260, 130, 14, '#f0c24f', ' stroke="#a67c12" stroke-width="1" stroke-dasharray="4 2"');
  for (var i = 0; i < 9; i++) chan += '<circle cx="' + (244 + i * 14) + '" cy="267" r="2.6" fill="#1f3f86"/>';
  // 5. Árokszigetelés (STI)
  var sti = rect(50, 260, 45, 64, '#cdd6e4') + rect(505, 260, 45, 64, '#cdd6e4') +
    txt(72.5, 296, 'SiO₂', '#334', 11) + txt(527.5, 296, 'SiO₂', '#334', 11);
  // 6. Kapuszigetelő
  var ox = rect(228, 247, 144, 13, '#6fcbbd') + txt(300, 257.5, 'HfO₂ / SiO₂ – pár atomnyi', '#123a35', 9.5, 700);
  // 7. Kapu (fém), két oldalán szigetelő távtartókkal
  var gate = '<path d="M214 260 L214 196 Q214 182 228 182 L228 260 Z" fill="#d9dee8"' + st + '/>' +
    '<path d="M386 260 L386 196 Q386 182 372 182 L372 260 Z" fill="#d9dee8"' + st + '/>' +
    rect(228, 182, 144, 65, '#8792a6') + rect(228, 182, 144, 14, '#a7b1c2', ' stroke="none"') +
    rect(228, 182, 144, 65, 'none') + txt(300, 222, 'Kapu (G)', '#ffffff', 15, 800) + txt(300, 238, 'fém / poliszilícium', '#eef1f6', 10.5, 500);
  // 8. Kontaktusok és rézvezetékek
  var metal = '';
  [[150, 260], [425, 260], [287, 182]].forEach(function (c) {
    metal += rect(c[0], 150, 26, c[1] - 150, '#7e848f') + rect(c[0] + 5, 150, 6, c[1] - 150, 'rgba(255,255,255,.25)', ' stroke="none"');
  });
  [[100, 'S', '0 V'], [260, 'G', 'U_G'], [385, 'D', '+U']].forEach(function (m) {
    metal += rect(m[0], 126, m[0] === 260 ? 80 : 115, 24, '#cf8546') + rect(m[0], 126, m[0] === 260 ? 80 : 115, 6, 'rgba(255,255,255,.3)', ' stroke="none"');
    var cx = m[0] + (m[0] === 260 ? 40 : 57.5);
    metal += '<text class="lbl" x="' + cx + '" y="116" text-anchor="middle">' + m[1] + ' <tspan class="lbl-muted">(' + m[2] + ')</tspan></text>';
  });

  STUDIE.addModel({
    id: 'tranzisztor',
    title: 'Tranzisztor (MOSFET)',
    icon: '🔀',
    color: '#4a7fd4',
    category: 'Számítástechnika',
    keywords: 'tranzisztor MOSFET FET kapcsoló félvezető szilícium kapu gate forrás source nyelő drain csatorna adalékolás n-típus p-típus CMOS FinFET litográfia ionimplantáció',
    summary: 'Egy elektromos vezérlésű kapcsoló, amiből egy processzorban több milliárd van. Ebből lesz a 0 és az 1.',
    scale: 'a kapu ma kb. 10–20 nm hosszú (egy hajszál kb. 70 000 nm vastag)',
    viewBox: '0 -30 600 505',
    intro: 'A tranzisztor egy **kapcsoló, amelyben nincs mozgó alkatrész**: egy feszültség (a kapun) dönti el, folyhat-e áram két pont (a forrás és a nyelő) között. Folyik áram: **1**. Nem folyik: **0**. Ezekből a kapcsolókból épülnek fel a logikai kapuk, azokból az összeadók, a memória és végül az egész processzor.\n\nA rajz egy **n-csatornás MOSFET keresztmetszete**, mintha kettévágtál volna egyet. A neve a felépítését írja le: **M**etal–**O**xide–**S**emiconductor (fém–oxid–félvezető) **F**ield-**E**ffect **T**ransistor (térvezérlésű tranzisztor).',
    parts: [
      {
        id: 'gate', z: 5, name: 'Kapu (gate)', svg: gate, explode: [0, -80], badge: [244, 196],
        what: 'A tranzisztor „kapcsológombja”. Ha a kapura **pozitív feszültséget** adsz (a küszöbfeszültség fölé, ez ma kb. 0,3 V), az elektromos tere a vékony szigetelőn keresztül magához vonzza az elektronokat a szilícium felszínére. Így létrejön a **csatorna**, és a tranzisztor bekapcsol. Ha a feszültséget elveszed, a csatorna eltűnik: kikapcsol.\n\nA kapuba **nem folyik áram** (hiszen szigetelő van alatta), csak a tere hat. Ezért hívják térvezérlésű tranzisztornak, és ezért fogyaszt nagyon keveset.',
        madeOf: '- Régen **poliszilícium**: sok apró kristályból álló, erősen adalékolt (vezető) szilícium.\n- Ma inkább **fémrétegek**: titán-nitrid, titán-alumínium, volfrám. A fémet úgy választják, hogy a tranzisztor pont a kívánt feszültségnél kapcsoljon.\n- A két oldalán **szilícium-nitrid** távtartók (spacer) szigetelik a kontaktusoktól.',
        how: 'Az anyagot vékony rétegben az egész szeletre leválasztják (gőzből, CVD-vel), majd **litográfiával** és **maratással** csak a keskeny kapucsíkot hagyják meg. Ez a legkritikusabb méret az egész chipen: a kapu hossza ma kb. 10–20 nm.',
        fact: 'A mai chipekben a kapu nem csak felülről fogja a csatornát. A **FinFET**-ben a csatorna egy függőleges szilícium „uszony” (fin), amit a kapu három oldalról ölel körbe, a legújabb **GAA** (gate-all-around) tranzisztoroknál pedig vékony szilíciumlapokat minden oldalról. Így a kapu sokkal jobban tudja „elzárni” az áramot.'
      },
      {
        id: 'oxide', z: 4, name: 'Kapuszigetelő (gate-oxid)', svg: ox, explode: [0, -45], badge: [384, 254],
        what: 'Nagyon vékony **szigetelőréteg** a kapu és a szilícium között. Ez választja el a kapcsológombot az áram útjától: a kapu tere átjut rajta, de az elektronok nem. Minél vékonyabb, annál erősebben hat a kapu, de ha túl vékony, az elektronok kvantummechanikai **alagúthatással** átszivárognak rajta.',
        madeOf: 'Régen tiszta **szilícium-dioxid** (SiO₂, ugyanaz az anyag, mint a kvarc). 2007 óta **hafnium-oxid** (HfO₂) alapú, úgynevezett „high-k” anyag, amely vastagabb lehet, mégis ugyanolyan jól hat. Vastagsága csak **1–2 nanométer**, néhány atomréteg.',
        how: 'A SiO₂ réteget **termikus oxidációval** növesztik: a szeletet kb. 1000 °C-on oxigénben hevítik, és a szilícium felszíne oxiddá alakul. A hafnium-oxidot **atomi rétegleválasztással** (ALD) viszik fel: két gázt felváltva engednek a szeletre, és minden ciklus pontosan egyetlen atomréteget ad.',
        fact: 'Ha a gate-oxid egy futballpálya hosszú lenne, a vastagsága akkor is csak pár milliméter lenne.'
      },
      {
        id: 'channel', z: 3, name: 'Csatorna', svg: chan, explode: [0, -22], badge: [249, 278],
        what: 'A forrás és a nyelő közötti keskeny sáv a szilícium felszínén. Ez maga is p-típusú szilícium, tehát alapból **nincs benne szabad elektron**: a tranzisztor ki van kapcsolva. Ha a kapura feszültséget adsz, a tér elektronokat gyűjt ide: a felszínen egy vékony **n-típusú réteg** (inverziós réteg) alakul ki, és a forrásból a nyelőbe elektronok áramolhatnak. A rajzon a sötét pöttyök ezek az elektronok.',
        madeOf: '**Szilícium**, ugyanaz a kristály, mint a szubsztrát. Ezt a vékony réteget nem külön építik rá, hanem a kapu tere „kapcsolja át” vezetővé. Újabb chipekben néha egy kis **germánium** van benne, vagy mechanikailag megfeszítik a kristályt, mert így gyorsabban mozognak benne a töltéshordozók.',
        how: 'A csatorna alatti területbe ionimplantációval pontosan beállított mennyiségű adalékot juttatnak. Ez határozza meg, mekkora kapufeszültségnél kapcsol be a tranzisztor (ez a **küszöbfeszültség**).',
        fact: 'Egy bekapcsolt csatornán át csak néhány tíz mikroamper folyik, de mivel egy chipben milliárdnyi tranzisztor kapcsol másodpercenként milliárdszor, ebből jön össze a processzor 100 watt körüli fogyasztása.'
      },
      {
        id: 'source', z: 2, name: 'Forrás (source)', svg: source, explode: [0, 0], badge: [118, 278],
        what: 'Az a tartomány, ahonnan az elektronok **elindulnak**. Erősen adalékolt, **n+ típusú** szilícium: rengeteg szabad elektron van benne. Általában a föld (0 V) kapcsolódik ide.',
        madeOf: '**Szilícium**, amelybe **arzén** vagy **foszfor** atomokat juttattak. Ezeknek eggyel több vegyértékelektronjuk van (5), mint a szilíciumnak (4). A „fölösleges” elektron szabadon mozoghat: ettől vezet.',
        how: '**Ionimplantációval** készül: az adalékatomokat ionná alakítják, és nagy feszültséggel felgyorsítva belelövik a szilíciumba. A kapu maga is maszkként szolgál, így a forrás és a nyelő pontosan a kapu két szélénél kezdődik (ez az **önillesztés**). Utána egy villámgyors hőkezeléssel a helyükre rázzák az atomokat a kristályrácsban.'
      },
      {
        id: 'drain', z: 2, name: 'Nyelő (drain)', svg: drain, explode: [0, 0], badge: [482, 278],
        what: 'Az a tartomány, ahová az elektronok **megérkeznek**. Felépítése ugyanolyan, mint a forrásé (n+ szilícium), de pozitív feszültség van rajta, ez „szívja” át az elektronokat a csatornán. Egy egyszerű NEM kapuban (inverterben) a nyelő a kimenet: ha a tranzisztor bekapcsol, a földre húzza, így a kimenet **0** lesz. Ha kikapcsol, a párja (egy p-csatornás tranzisztor) a tápfeszültségre húzza: a kimenet **1**.',
        madeOf: '**Arzénnel** vagy **foszforral** erősen adalékolt szilícium, a felszínén vékony **nikkel-szilicid** réteggel, hogy a fém kontaktus jól érintkezzen vele.',
        how: 'A forrással egy lépésben, ugyanazzal az ionimplantációval készül. A két oldal csak a bekötésben különbözik.',
        fact: 'A számítógépekben **CMOS** áramkörök vannak: egy n-csatornás tranzisztor (mint ez) és egy p-csatornás „párja” mindig ellentétesen kapcsol. Így nyugalmi állapotban szinte egyáltalán nem folyik áram, és csak a kapcsoláskor fogy energia.'
      },
      {
        id: 'substrate', z: 0, name: 'Szilícium szubsztrát (p-típusú)', svg: sub, explode: [0, 60], link: 'atom', badge: [100, 392],
        what: 'Az alap: egy tökéletes **szilícium-egykristály** szelet, a wafer felső része. Ebben és ezen épül fel minden tranzisztor. **p-típusú**, vagyis kevés **bórral** adalékolták. A bórnak csak 3 vegyértékelektronja van, ezért a kristályban hiányzó elektronok, úgynevezett **lyukak** keletkeznek, amelyek pozitív töltésként viselkednek.',
        madeOf: '**Szilícium** atomok szabályos, gyémántszerű kristályrácsban: minden atom 4 szomszédjával köt össze, mindegyikkel egy elektronpárt megosztva. Ezenkívül egy kis **bór**: nagyjából minden milliomodik atom helyén.\n\nHa kíváncsi vagy, mi van egy szilíciumatom belsejében, nézz bele!',
        how: 'Tisztított kvarchomokból kb. 99,9999999%-os szilíciumot állítanak elő, és Czochralski-eljárással egykristályt húznak belőle. Ezt waferekre szeletelik és tükörsimára polírozzák. A bórt már az olvadékba keverik.'
      },
      {
        id: 'sti', z: 1, name: 'Árokszigetelés (STI)', svg: sti, explode: [0, 18], badge: [72, 314],
        what: 'Szigetelő „árkok” a tranzisztor két oldalán. Egy chipben a tranzisztorok néhány tíz nanométerre vannak egymástól, ezek az árkok akadályozzák meg, hogy az áram átszivárogjon a szomszédba.',
        madeOf: '**Szilícium-dioxid** (SiO₂), vagyis üveg, ugyanaz az anyag, mint a kvarchomok.',
        how: 'Ez az egyik legelső lépés: litográfiával kijelölik, majd plazmával kimarják az árkokat a szilíciumba. Ezután gőzből oxiddal töltik fel, és a felesleget **kémiai-mechanikai polírozással** (CMP) tökéletesen síkra csiszolják.'
      },
      {
        id: 'metal', z: 6, name: 'Kontaktusok és rézvezetékek', svg: metal, explode: [0, -115], badge: [113, 138],
        what: 'Ezeken keresztül kapcsolódik a tranzisztor a többi tranzisztorhoz. A szürke függőleges **kontaktusok** (dugók) a forráshoz, a nyelőhöz és a kapuhoz érnek le, a narancs **rézvezetékek** pedig vízszintesen viszik tovább a jelet. A chipen 10–15 ilyen vezetékréteg van egymás fölött, köztük szigetelővel.',
        madeOf: '- Kontaktusok: **volfrám** (vagy újabban kobalt), vékony titán-nitrid bélésben.\n- Vezetékek: **réz**, tantál/tantál-nitrid határréteggel, hogy a réz ne diffundáljon a szilíciumba (az tönkretenné a tranzisztort).\n- Köztük alacsony dielektromos állandójú, porózus **szigetelő** (low-k anyag).',
        how: 'A **damaszcén eljárással** készülnek (a nevét a damaszkuszi berakásos díszítésről kapta): a szigetelőbe árkokat marnak, ezeket fémmel töltik fel, majd a felesleget CMP-vel lecsiszolják. Így marad a fém csak az árkokban.',
        fact: 'Egy mai processzorban a rézvezetékek összhossza több tíz kilométer, pedig az egész chip csak körömnyi.'
      }
    ],
    steps: [
      { icon: '💿', title: 'Kiindulás: a p-típusú wafer', text: 'A gyártás egy tükörsimára polírozott, **bórral enyhén adalékolt** szilíciumszeletből indul. Minden lépés tisztatérben zajlik, ahol a levegő ezerszer tisztább, mint egy kórházi műtőben, hiszen egyetlen porszem is akkora, mint száz tranzisztor.', parts: ['substrate'] },
      { icon: '🕳️', title: 'Árkok a tranzisztorok közé', text: 'Litográfiával kijelölik a tranzisztorok helyét, köréjük árkokat marnak, és **szilícium-dioxiddal** töltik fel őket (STI). Utána CMP-vel síkra csiszolják a szeletet.', parts: ['sti'] },
      { icon: '🔥', title: 'Oxidáció: a kapuszigetelő', text: 'A tiszta szilíciumfelszínen **termikus oxidációval** (kb. 1000 °C, oxigén) vagy **atomi rétegleválasztással** (ALD) létrehozzák a néhány atomnyi vastag kapuszigetelőt. Ennek hibátlannak kell lennie: egyetlen lyuk is rövidzárat jelentene.', parts: ['oxide'] },
      { icon: '💡', title: 'Litográfia: a kapu kirajzolása', text: 'Felviszik a kapu anyagát (poliszilícium vagy fém), majd fotoreziszttel vonják be. Egy maszkon át **EUV-fénnyel** (13,5 nm) megvilágítják. Ahol fény érte, a lakk lemosható, és plazmával kimarják az anyagot. Ami a lakk alatt maradt, az lesz a keskeny kapucsík.', parts: ['gate'] },
      { icon: '🎯', title: 'Ionimplantáció: forrás és nyelő', text: 'Az ionimplanter **arzén**- vagy **foszfor**ionokat gyorsít fel több ezer, akár több tízezer voltos feszültséggel, és belelövi őket a szilíciumba. A kapu árnyékot vet, ezért a forrás és a nyelő pontosan a kapu két oldalán jön létre. Egy másodperc töredékéig tartó, kb. 1000 °C-os **hőkezelés** után az adalékatomok beépülnek a kristályrácsba, és működni kezdenek.', parts: ['source', 'drain', 'channel'] },
      { icon: '🔌', title: 'Kontaktusok', text: 'Mindent beborítanak szigetelővel, majd apró lyukakat marnak bele a forrás, a nyelő és a kapu fölé. A lyukak aljára vékony **szilicid** réteg kerül (a jó érintkezésért), majd **volfrámmal** töltik fel őket.', parts: ['metal'] },
      { icon: '🧱', title: 'Rézhuzalozás rétegről rétegre', text: 'A kontaktusok fölé **damaszcén eljárással** 10–15 réteg rézvezetéket építenek: árok marása, fémmel feltöltés, csiszolás, újra és újra. Az alsó rétegek a szomszédos tranzisztorokat kötik össze, a felsők a chip távoli részeit és a tápellátást.', parts: ['metal'] },
      { icon: '🧪', title: 'Mérés és ellenőrzés', text: 'A szelet szélére tesztszerkezeteket is gyártanak: ezeken elektromosan megmérik, hogy a tranzisztorok jó feszültségnél kapcsolnak-e. A gyártás minden szakaszában elektronmikroszkóppal is ellenőrzik a méreteket. Egy szelet a teljes úton kb. **1000 lépésen** és 2–3 hónapon megy át.' }
    ],
    history: [
      { year: '1925–26', text: 'Julius Edgar Lilienfeld, Lembergben született fizikus szabadalmaztatja a **térvezérlésű tranzisztor** ötletét. Akkor még nem tudták megépíteni, mert nem volt elég tiszta anyag.' },
      { year: '1947', text: 'Bardeen, Brattain és Shockley a Bell Laboratóriumban megépíti az első működő tranzisztort (germánium, pontkontaktusos). 1956-ban Nobel-díjat kapnak érte.' },
      { year: '1959', text: 'Mohamed Atalla és Dawon Kahng (Bell Labs) elkészíti az első **MOSFET**-et szilíciumból és szilícium-dioxidból. Ma ez a világon legtöbbször legyártott eszköz.' },
      { year: '1963', text: 'Frank Wanlass szabadalmaztatja a **CMOS** kapcsolást: n- és p-csatornás tranzisztorok párban, szinte nulla nyugalmi fogyasztással.' },
      { year: '1965', text: 'Gordon Moore megfigyeli, hogy a chipeken lévő tranzisztorok száma rendszeresen megduplázódik (**Moore-törvény**).' },
      { year: '2007', text: 'Megjelenik a **high-k fém kapu**: a szivárgó SiO₂ helyett hafnium-oxid és fém kapu (45 nm-es gyártás).' },
      { year: '2011', text: 'Tömeggyártásba kerül a **FinFET** (háromdimenziós, „uszonyos” tranzisztor) a 22 nm-es gyártásban.' },
      { year: '2022–', text: 'Elkezdődik a **GAA** (gate-all-around, nanolapos) tranzisztorok gyártása, ahol a kapu minden oldalról körbeöleli a csatornát.' }
    ],
    quiz: [
      { q: 'Mi kapcsolja be az n-csatornás MOSFET-et?', options: ['Pozitív feszültség a kapun', 'Fény', 'Ha áram folyik a kapuba', 'A hőmérséklet emelkedése'], answer: 0, explain: 'A kapu tere elektronokat gyűjt a felszínre, így létrejön a vezető csatorna. A kapuba magába nem folyik áram.' },
      { q: 'Mire való a kapuszigetelő (gate-oxid)?', options: ['Elválasztja a kaput a csatornától, de a tér átjut rajta', 'Vezeti az áramot a forrástól a nyelőig', 'Hűti a tranzisztort', 'Tárolja az adatot'], answer: 0, explain: 'A szigetelőn nem jutnak át az elektronok, a kapu elektromos tere viszont igen.' },
      { q: 'Hogyan lesz a szilíciumból n-típusú (forrás, nyelő)?', options: ['Arzén vagy foszfor atomokat juttatnak bele (ionimplantáció)', 'Lefestik kékre', 'Lehűtik', 'Bórt adnak hozzá'], answer: 0, explain: 'Az 5 vegyértékelektronos adalékatom egy szabad elektront ad. A bór (3 elektron) p-típust hoz létre.' },
      { q: 'Mi a FinFET lényege?', options: ['A kapu több oldalról öleli körbe a csatornát', 'Halak segítségével hűtik', 'Nincs benne szilícium', 'Kétszer nagyobb, mint a síkbeli tranzisztor'], answer: 0, explain: 'A függőleges szilícium „uszonyt” a kapu három oldalról fogja, így jobban tudja vezérelni.' }
    ]
  });
})();
