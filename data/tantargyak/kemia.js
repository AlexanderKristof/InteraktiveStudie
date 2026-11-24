/* Tantárgy: Kémia (középiskola) */
STUDIE.addSubject({
  id: 'kemia',
  stage: 'kozep',
  title: 'Kémia',
  icon: '⚗️',
  color: '#d9a520',
  description: 'Atomok, kötések, mólok, reakciók, savak és bázisok, szerves vegyületek és galvánelemek: a középiskolai kémia magja.',
  intro: 'A kémia arról szól, **miből áll** a világ, és hogyan **alakulnak át** az anyagok egymásba. Az atom felépítésétől indulunk, megnézzük, hogyan kapcsolódnak az atomok, megtanulunk mólokkal számolni, aztán jönnek a reakciók, a savak és bázisok, végül a szerves kémia és az elemek, akkuk működése. Kísérletezni csak tanári felügyelettel, védőfelszerelésben szabad!',
  lessons: [
    {
      id: 'atom-periodusos',
      title: 'Az atom és a periódusos rendszer',
      level: 1, minutes: 14,
      summary: 'Proton, neutron, elektron, elektronhéjak, és hogyan mondja meg a periódusos rendszer helye egy elem viselkedését.',
      tags: ['atom', 'proton', 'neutron', 'elektron', 'rendszám', 'tömegszám', 'izotóp', 'elektronhéj', 'vegyértékelektron', 'periódusos rendszer', 'csoport', 'periódus', 'fém', 'nemfém', 'nemesgáz', 'Mengyelejev'],
      models: ['atom'],
      sections: [
        {
          title: 'Az atom részei',
          text: 'Az **atom** a kémiai elemek legkisebb, kémiai úton tovább nem bontható része. Két fő része van:\n\n- az **atommag**, benne a pozitív **protonokkal** és a semleges **neutronokkal**;\n- az **elektronburok**, ahol a negatív **elektronok** mozognak.\n\nA **rendszám (Z)** a protonok száma, ez határozza meg az elemet. A **tömegszám (A)** a protonok és neutronok együttes száma. Semleges atomban az elektronok száma megegyezik a protonokéval.\n\nPélda: a ²³Na (nátrium-23) atomban Z = 11, tehát 11 proton és 11 elektron van, a neutronok száma pedig 23 − 11 = 12.\n\nAz azonos rendszámú, de eltérő neutronszámú atomok az **izotópok** (pl. ¹H, ²H = deutérium, ³H = trícium). Az atom szerkezetét forgathatod az [[atom|atom felfedezőben]].',
          widget: { type: 'atomepito', options: { p: 8, n: 8, e: 8 } }
        },
        {
          title: 'Elektronhéjak és vegyértékelektronok',
          text: 'Az elektronok energiaszintekbe, **héjakba** rendeződnek. Az első héjon legfeljebb 2, a másodikon legfeljebb 8 elektron lehet. A legkülső héj elektronjai a **vegyértékelektronok**: ezek vesznek részt a kémiai reakciókban.\n\n- Na (11 elektron): 2, 8, **1** → egy külső elektron, könnyen leadja.\n- Cl (17 elektron): 2, 8, **7** → egy hiányzik a 8-hoz, szívesen felvesz egyet.\n- Ne (10 elektron): 2, **8** → telített külső héj, a neon szinte semmivel sem reagál.\n\nA **nemesgáz-szerkezet** (8 külső elektron, a héliumnál 2) különösen stabil. Az atomok reakcióik során gyakran ennek elérésére „törekednek”: leadnak, felvesznek vagy közösbe adnak elektronokat. Ezt nevezzük **oktettszabálynak**.',
          tip: 'Az atomépítőben próbáld ki: 11 proton, 12 neutron és 10 elektron a nátriumion (Na⁺), 17 proton, 18 neutron és 18 elektron a kloridion (Cl⁻).'
        },
        {
          title: 'A periódusos rendszer logikája',
          text: '**Mengyelejev** 1869-ben rakta sorba az elemeket úgy, hogy a hasonló tulajdonságúak egymás alá kerüljenek. Ma rendszám szerint rendezzük őket.\n\n- A **periódus** (vízszintes sor) száma megmutatja, hány elektronhéja van az atomnak.\n- A **csoport** (függőleges oszlop) elemeinek azonos a külső elektronszerkezete, ezért kémiailag hasonlók. A főcsoportokban (1., 2. és 13–18. csoport) a vegyértékelektronok száma a csoportszám utolsó jegye: a 17. csoportban 7.\n\nFontos csoportok: **alkálifémek** (1.: Li, Na, K, nagyon reakcióképesek, vízzel hevesen reagálnak), **alkáliföldfémek** (2.: Mg, Ca), **halogének** (17.: F, Cl, Br), **nemesgázok** (18.: He, Ne, Ar).\n\nA táblázat bal oldalán a **fémek**, jobb felső részén a **nemfémek** vannak; a kettő között a félfémek (B, Si, Ge). Egy csoporton belül lefelé haladva nő az atomsugár, és a fémek egyre könnyebben adják le elektronjukat.',
          widget: { type: 'periodusos', options: { z: 11 } }
        }
      ],
      quiz: [
        { q: 'Hány neutron van a ³⁵Cl (klór-35) atommagjában? (Z = 17)', options: ['17', '35', '18', '52'], answer: 2, explain: 'Neutronok = tömegszám − rendszám = 35 − 17 = 18.' },
        { q: 'Mit mutat meg egy főcsoportbeli elem periódusának száma?', options: ['A vegyértékelektronok számát', 'Az elektronhéjak számát', 'A neutronok számát', 'Az atom töltését'], answer: 1, explain: 'A periódus száma = az elektronhéjak száma. A vegyértékelektronok számát a csoport árulja el.' },
        { q: 'Melyik elem tartozik a halogének közé?', options: ['Nátrium', 'Argon', 'Magnézium', 'Bróm'], answer: 3, explain: 'A halogének a 17. csoport elemei: F, Cl, Br, I. A nátrium alkálifém, a magnézium alkáliföldfém, az argon nemesgáz.' },
        { q: 'Miért reagál nehezen a neon?', options: ['Mert telített (8 elektronos) a külső héja', 'Mert nincs neutronja', 'Mert fém', 'Mert nagyon nagy az atomja'], answer: 0, explain: 'A nemesgázok külső elektronhéja telített, ezért sem leadni, sem felvenni nem „akarnak” elektront.' }
      ]
    },
    {
      id: 'kemiai-kotesek',
      title: 'Kémiai kötések',
      level: 2, minutes: 15,
      summary: 'Ionos, kovalens és fémes kötés, az elektronegativitás szerepe és a molekulák alakja.',
      tags: ['kémiai kötés', 'ionos kötés', 'kovalens kötés', 'fémes kötés', 'elektronegativitás', 'poláris', 'apoláris', 'molekula', 'molekulaalak', 'kötésszög', 'ionrács', 'hidrogénkötés'],
      sections: [
        {
          title: 'Elektronegativitás: ki húzza jobban az elektront?',
          text: 'Az **elektronegativitás (EN)** megmutatja, mennyire vonzza egy atom a kötő elektronpárt. A legnagyobb a **fluoré** (4,0), utána az oxigén (3,5), a nitrogén és a klór (3,0) következik. A fémeké kicsi, pl. a nátriumé 0,9.\n\nA kötés típusát nagyjából a két atom EN-különbsége (ΔEN) dönti el:\n\n- **ΔEN = 0** (pl. H₂, Cl₂): **apoláris kovalens** kötés, az elektronpár középen van.\n- **kis vagy közepes ΔEN** (pl. H–Cl: 3,0 − 2,1 = 0,9): **poláris kovalens** kötés, az elektronpár a klór felé tolódik.\n- **nagy ΔEN, kb. 2 felett** (pl. NaCl: 3,0 − 0,9 = 2,1): **ionos** kötés, az elektron gyakorlatilag átmegy az egyik atomról a másikra.',
          tip: 'Az elektronegativitás a periódusos rendszerben balról jobbra nő, fentről lefelé csökken. Ezért a jobb felső sarokban (F, O, N) a legnagyobb.'
        },
        {
          title: 'Ionos, kovalens és fémes kötés',
          text: '**Ionos kötés**: fém és nemfém között jön létre. A fém elektront ad le (kation, pl. Na⁺), a nemfém felveszi (anion, pl. Cl⁻), és az ellentétes töltésű ionok vonzzák egymást. Az ionok szabályos **ionrácsot** alkotnak: magas olvadáspont, kemény, de rideg anyagok. Olvadékuk és vizes oldatuk vezeti az áramot.\n\n**Kovalens kötés**: nemfémek között, **közös elektronpárokkal**. Lehet egyszeres (H–H), kétszeres (O=O) vagy háromszoros (N≡N). Így épülnek fel a **molekulák** (H₂O, CO₂, CH₄). Egyes anyagokban a kovalens kötések óriási hálózatot alkotnak (gyémánt, kvarc): ezek az **atomrácsos** anyagok, rendkívül kemények.\n\n**Fémes kötés**: a fématomok leadják külső elektronjaikat, és ezek „elektronfelhőként” szabadon mozognak a pozitív fémionok között. Ezért vezetik a fémek jól az áramot és a hőt, és ezért alakíthatók (kovácsolhatók, húzhatók).'
        },
        {
          title: 'A molekulák alakja röviden',
          text: 'A központi atom körüli elektronpárok (kötő és nemkötő párok egyaránt) **taszítják egymást**, és a lehető legtávolabb helyezkednek el. Ebből adódik a molekula alakja:\n\n- **CO₂**: lineáris, 180°.\n- **CH₄** (metán): tetraéderes, 109,5°.\n- **NH₃** (ammónia): háromszög alapú piramis, kb. 107°, mert a nitrogénen van egy nemkötő elektronpár.\n- **H₂O** (víz): V alakú, kb. 104,5°, mert az oxigénen két nemkötő pár van.\n\nAz alak dönti el, hogy a molekula egésze **poláris**-e. A CO₂ kötései polárisak, de a lineáris alak miatt hatásuk kioltja egymást, így a molekula apoláris. A víz V alakja miatt poláris, ezért jó oldószere az ionos anyagoknak, és a vízmolekulák között erős **hidrogénkötés** alakul ki. Emiatt ilyen magas a víz forráspontja (100 °C) egy ilyen kicsi molekulához képest.'
        }
      ],
      quiz: [
        { q: 'Milyen kötés alakul ki a nátrium és a klór között a konyhasóban?', options: ['Apoláris kovalens', 'Fémes', 'Ionos', 'Hidrogénkötés'], answer: 2, explain: 'Fém és nemfém, nagy EN-különbséggel (2,1): a Na elektront ad a Cl-nak, Na⁺ és Cl⁻ ionok jönnek létre.' },
        { q: 'Melyik molekula apoláris, pedig poláris kötései vannak?', options: ['H₂O', 'CO₂', 'NH₃', 'HCl'], answer: 1, explain: 'A CO₂ lineáris, a két C=O kötés polaritása kioltja egymást.' },
        { q: 'Miért vezetik a fémek az elektromos áramot?', options: ['Mert szabadon mozgó elektronjaik vannak', 'Mert ionrácsuk van', 'Mert molekulákból állnak', 'Mert nagy az elektronegativitásuk'], answer: 0, explain: 'A fémes kötésben a külső elektronok delokalizáltak, szabadon elmozdulhatnak.' },
        { q: 'Milyen alakú a vízmolekula?', options: ['Lineáris', 'Tetraéderes', 'Síkháromszög', 'V alakú'], answer: 3, explain: 'Az oxigén két nemkötő elektronpárja „összenyomja” a kötésszöget kb. 104,5°-ra.' }
      ]
    },
    {
      id: 'anyagmennyiseg',
      title: 'Anyagmennyiség, mól és sztöchiometria',
      level: 2, minutes: 16,
      summary: 'Mi az a mól, hogyan számolunk moláris tömeggel, és hogyan mondja meg a reakcióegyenlet, mennyi anyag kell és keletkezik.',
      tags: ['mól', 'anyagmennyiség', 'moláris tömeg', 'Avogadro-szám', 'sztöchiometria', 'moláris térfogat', 'koncentráció', 'számolás', 'reakcióegyenlet'],
      sections: [
        {
          title: 'A mól: a kémikus „tucatja”',
          text: 'Az atomok olyan kicsik, hogy darabonként nem számolhatunk velük. Ezért a kémikusok egy nagy „csomagot” használnak: a **mólt**.\n\n**1 mol** anyagban **6,02 · 10²³** részecske (atom, molekula vagy ion) van. Ez az **Avogadro-állandó**: N_A = 6,02 · 10²³ 1/mol.\n\nAz **anyagmennyiség** jele **n**, mértékegysége a **mol**. Ahogy egy tucat tojás mindig 12 darab, úgy 1 mol víz mindig 6,02 · 10²³ vízmolekula.'
        },
        {
          title: 'Moláris tömeg és az alapképlet',
          text: 'A **moláris tömeg (M)** megmutatja, hány gramm 1 mol anyag. Értéke számszerűen megegyezik a relatív atom- vagy molekulatömeggel, ezt a periódusos rendszerből olvasod le.\n\n- M(H) = 1 g/mol, M(C) = 12 g/mol, M(O) = 16 g/mol, M(Na) = 23 g/mol, M(Cl) = 35,5 g/mol\n- M(H₂O) = 2 · 1 + 16 = **18 g/mol**\n- M(CO₂) = 12 + 2 · 16 = **44 g/mol**\n\nA legfontosabb képlet:\n\n`n = m / M`   →   `m = n · M`\n\nPélda: 90 g víz hány mol? n = 90 g / 18 g/mol = **5 mol**. Ebben 5 · 6,02 · 10²³ ≈ 3,01 · 10²⁴ vízmolekula van.\n\nGázoknál jól jön a **moláris térfogat**: standardállapotban (25 °C, 0,1 MPa) 1 mol bármilyen gáz térfogata **24,5 dm³**.',
          widget: { type: 'gyakorlas', options: { kind: 'mol', title: 'Mól–gramm átváltás gyakorló', help: 'Használd az n = m / M és az m = n · M képletet!' } }
        },
        {
          title: 'Sztöchiometria: számolás az egyenletből',
          text: 'A rendezett reakcióegyenlet együtthatói **anyagmennyiség-arányokat** jelentenek. A lépések mindig ugyanazok:\n\n1. Írd fel és rendezd az egyenletet.\n2. A megadott tömeget váltsd mólra (n = m / M).\n3. Az együtthatók arányával számold ki a keresett anyag mólszámát.\n4. Váltsd vissza grammra (m = n · M).\n\n**Példa**: hány gramm CO₂ keletkezik 8 g metán elégetésekor?\n\n`CH₄ + 2 O₂ → CO₂ + 2 H₂O`\n\n- n(CH₄) = 8 g / 16 g/mol = 0,5 mol\n- Az egyenlet szerint 1 mol CH₄-ból 1 mol CO₂ lesz, tehát n(CO₂) = 0,5 mol\n- m(CO₂) = 0,5 mol · 44 g/mol = **22 g**\n\nOldatoknál a **koncentráció**: c = n / V (mol/dm³). Pl. 0,2 mol NaCl 0,5 dm³ oldatban: c = 0,4 mol/dm³.',
          tip: 'Grammokat soha ne hasonlíts össze közvetlenül az egyenlet alapján! Az együtthatók mólokra vonatkoznak, ezért mindig mólon keresztül számolj.'
        }
      ],
      quiz: [
        { q: 'Mennyi a kénsav (H₂SO₄) moláris tömege? (H = 1, S = 32, O = 16)', options: ['49 g/mol', '98 g/mol', '96 g/mol', '66 g/mol'], answer: 1, explain: '2 · 1 + 32 + 4 · 16 = 2 + 32 + 64 = 98 g/mol.' },
        { q: 'Hány mol 11 g szén-dioxid? (M = 44 g/mol)', options: ['4 mol', '0,25 mol', '484 mol', '0,5 mol'], answer: 1, explain: 'n = m / M = 11 / 44 = 0,25 mol.' },
        { q: 'Hány molekula van 2 mol vízben?', options: ['6,02 · 10²³', '18', '1,204 · 10²⁴', '36'], answer: 2, explain: 'N = n · N_A = 2 · 6,02 · 10²³ = 12,04 · 10²³ = 1,204 · 10²⁴.' },
        { q: 'A 2 H₂ + O₂ → 2 H₂O reakcióban hány mol víz keletkezik 3 mol hidrogénből?', options: ['1,5 mol', '6 mol', '2 mol', '3 mol'], answer: 3, explain: 'A H₂ és a H₂O aránya 2 : 2 = 1 : 1, tehát 3 mol H₂-ből 3 mol víz lesz.' }
      ]
    },
    {
      id: 'reakciok',
      title: 'Kémiai reakciók, egyenletek, sebesség és egyensúly',
      level: 2, minutes: 16,
      summary: 'Hogyan rendezünk egy reakcióegyenletet, mitől gyorsul egy reakció, és mit jelent a dinamikus egyensúly.',
      tags: ['kémiai reakció', 'reakcióegyenlet', 'egyenletrendezés', 'tömegmegmaradás', 'exoterm', 'endoterm', 'reakciósebesség', 'katalizátor', 'aktiválási energia', 'egyensúly', 'Le Chatelier-elv', 'redoxi', 'oxidáció', 'redukció'],
      sections: [
        {
          title: 'Reakcióegyenletek rendezése',
          text: 'Kémiai reakcióban az atomok **átrendeződnek**, de nem keletkeznek és nem tűnnek el. Ez a **tömegmegmaradás törvénye** (Lavoisier). Ezért az egyenlet két oldalán minden atomból ugyanannyinak kell lennie.\n\nRendezni csak az **együtthatókat** szabad változtatni, a képleteket (az alsó indexeket) soha!\n\n**Példa**: a vas rozsdásodása\n\n- Rendezetlen: Fe + O₂ → Fe₂O₃\n- Az oxigén 2 és 3 legkisebb közös többszöröse 6: 3 O₂ → 2 Fe₂O₃\n- Ehhez 4 vas kell: **4 Fe + 3 O₂ → 2 Fe₂O₃**\n\n**Példa**: a propán égése\n\n`C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O`\n\nElőször a szenet (3), aztán a hidrogént (8 H → 4 H₂O), végül az oxigént rendezzük (6 + 4 = 10 O atom → 5 O₂).',
          tip: 'Sorrend tipp: először azokat az elemeket rendezd, amelyek csak egy-egy vegyületben szerepelnek az egyes oldalakon, az elemi állapotú anyagot (pl. O₂) hagyd a végére.'
        },
        {
          title: 'Energia és reakciósebesség',
          text: 'Az **exoterm** reakciók hőt adnak le (égés, közömbösítés), az **endoterm** reakciók hőt vesznek fel (pl. a mészkő hőbontása). A reakció elindulásához a részecskéknek elég nagy energiával kell ütközniük: ez az **aktiválási energia**.\n\nA **reakciósebesség** megmutatja, milyen gyorsan fogynak a kiindulási anyagok. Növeli:\n\n- a **koncentráció** növelése: több részecske, több ütközés;\n- a **hőmérséklet** emelése: gyorsabb részecskék, több sikeres ütközés (10 °C emelés gyakran 2–4-szeres gyorsulást okoz);\n- a **felület** növelése: a porrá őrölt anyag gyorsabban reagál, mint a darabos;\n- a **katalizátor**: csökkenti az aktiválási energiát, és közben maga nem fogy el (pl. az autók katalizátorában a platina, a szervezetben az enzimek).'
        },
        {
          title: 'Kémiai egyensúly',
          text: 'Sok reakció **megfordítható**: a termékek visszaalakulhatnak kiindulási anyagokká. Egy idő után az oda- és a visszaalakulás sebessége egyenlő lesz. Ez a **dinamikus egyensúly**: kívülről nem látszik változás, de a részecskék szintjén folyamatosan zajlanak a reakciók.\n\nPélda az ammóniaszintézis:\n\n`N₂ + 3 H₂ ⇌ 2 NH₃` (exoterm)\n\nA **Le Chatelier-elv**: ha egy egyensúlyi rendszert külső hatás ér, az egyensúly úgy tolódik el, hogy a hatást csökkentse.\n\n- **Nyomásnövelés** → a kevesebb gázmolekula felé tolódik (4 mol gáz → 2 mol gáz): több NH₃.\n- **Hőmérséklet-emelés** → az endoterm irány felé, itt visszafelé: kevesebb NH₃.\n- **Termék elvezetése** → újabb termék képződik.\n\nAz ipari **Haber–Bosch-eljárás** ezért nagy nyomáson, katalizátorral és kompromisszumos (kb. 450 °C) hőmérsékleten dolgozik.'
        },
        {
          title: 'Oxidáció és redukció',
          text: 'A **redoxireakciókban** elektronátadás történik:\n\n- **Oxidáció** = elektronleadás (az oxidációs szám nő).\n- **Redukció** = elektronfelvétel (az oxidációs szám csökken).\n\nA kettő mindig együtt jár: amennyi elektront az egyik anyag lead, annyit a másik felvesz. Példa: `Zn + Cu²⁺ → Zn²⁺ + Cu`. A cink oxidálódik, a rézion redukálódik. Ezen a folyamaton alapul a galvánelem is, lásd a szerves kémia és elektrokémia leckét.'
        }
      ],
      quiz: [
        { q: 'Mi a helyesen rendezett egyenlet? Al + O₂ → Al₂O₃', options: ['2 Al + 3 O₂ → Al₂O₃', '4 Al + 3 O₂ → 2 Al₂O₃', 'Al + O₂ → AlO₂', '2 Al + O₂ → Al₂O₃'], answer: 1, explain: 'Bal oldalon 4 Al és 6 O, jobb oldalon 2 · 2 = 4 Al és 2 · 3 = 6 O. A képletet (Al₂O₃) nem szabad megváltoztatni.' },
        { q: 'Mit csinál a katalizátor?', options: ['Csökkenti az aktiválási energiát', 'Növeli a termék mennyiségét az egyensúlyban', 'Elfogy a reakcióban', 'Hőt termel'], answer: 0, explain: 'A katalizátor gyorsítja a reakciót, de az egyensúlyi összetételt nem változtatja meg, és nem fogy el.' },
        { q: 'Az N₂ + 3 H₂ ⇌ 2 NH₃ egyensúlynál mi történik nyomásnöveléskor?', options: ['Semmi', 'Több N₂ képződik', 'Több NH₃ képződik', 'A reakció leáll'], answer: 2, explain: 'A rendszer a kevesebb gázmolekula (4 → 2) irányába tolódik, ez az ammónia képződése.' },
        { q: 'Mi az oxidáció?', options: ['Elektronfelvétel', 'Protonfelvétel', 'Neutronleadás', 'Elektronleadás'], answer: 3, explain: 'Oxidáció = elektronleadás, redukció = elektronfelvétel.' }
      ]
    },
    {
      id: 'savak-bazisok',
      title: 'Savak, bázisok, pH és közömbösítés',
      level: 2, minutes: 15,
      summary: 'Mitől sav egy sav, mit mér a pH, hogyan működnek az indikátorok, és mi történik közömbösítéskor.',
      tags: ['sav', 'bázis', 'lúg', 'pH', 'indikátor', 'fenolftalein', 'lakmusz', 'közömbösítés', 'só', 'oxóniumion', 'hidroxidion', 'Brønsted', 'protonátadás', 'laborbiztonság'],
      sections: [
        {
          title: 'Savak és bázisok Brønsted szerint',
          text: '**Brønsted** szerint:\n\n- a **sav** **protont (H⁺) ad le**,\n- a **bázis** **protont vesz fel**.\n\nA sósav vízben: `HCl + H₂O → H₃O⁺ + Cl⁻`. A keletkező **oxóniumion (H₃O⁺)** okozza a savas kémhatást.\n\nAz ammónia vízben: `NH₃ + H₂O ⇌ NH₄⁺ + OH⁻`. A **hidroxidion (OH⁻)** okozza a lúgos kémhatást. A vízben oldódó bázisok oldatát **lúgnak** hívjuk (pl. nátronlúg = NaOH-oldat).\n\nAz **erős savak** (HCl, HNO₃, H₂SO₄) vízben szinte teljesen disszociálnak, a **gyenge savak** (ecetsav, szénsav) csak kis részben.'
        },
        {
          title: 'A pH-skála',
          text: 'A **pH** a kémhatás mérőszáma: `pH = −lg [H₃O⁺]`, ahol [H₃O⁺] az oxóniumionok koncentrációja mol/dm³-ben. 25 °C-on:\n\n- **pH < 7**: savas (gyomorsav kb. 1–2, citromlé kb. 2, kóla kb. 2,5)\n- **pH = 7**: semleges (tiszta víz)\n- **pH > 7**: lúgos (szappanos víz kb. 9–10, hypo kb. 12)\n\nA skála **logaritmikus**: egy egységnyi csökkenés **tízszer** több H₃O⁺-iont jelent. A pH = 3-as oldat tízszer savasabb a pH = 4-esnél és százszor savasabb a pH = 5-ösnél.\n\nPélda: 0,01 mol/dm³-es sósavban [H₃O⁺] = 0,01 = 10⁻² mol/dm³, tehát **pH = 2**.\n\nA kémhatást **indikátorokkal** mutatjuk ki: a **lakmusz** savban piros, lúgban kék; a **fenolftalein** savban és semleges közegben színtelen, lúgban lila (rózsaszín); az **univerzális indikátor** színskálája a pH-t is megmutatja.'
        },
        {
          title: 'Közömbösítés',
          text: 'Ha savat és bázist megfelelő arányban összeöntünk, **közömbösítés** történik: só és víz keletkezik, a lényeg pedig ez:\n\n`H₃O⁺ + OH⁻ → 2 H₂O`\n\nPélda: `HCl + NaOH → NaCl + H₂O`. A kétértékű kénsavhoz kétszer annyi lúg kell: `H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O`.\n\n**Számolás**: hány cm³ 0,1 mol/dm³-es sósav közömbösít 25 cm³ 0,2 mol/dm³-es NaOH-oldatot?\n\n- n(NaOH) = 0,2 mol/dm³ · 0,025 dm³ = 0,005 mol\n- Az arány 1 : 1, tehát n(HCl) = 0,005 mol\n- V(HCl) = 0,005 mol / 0,1 mol/dm³ = 0,05 dm³ = **50 cm³**\n\nA hétköznapokban: a gyomorégésre szedett savlekötők bázisos anyagok; a savas talajt mészkővel közömbösítik.',
          warn: 'Laborbiztonság: savakkal és lúgokkal csak **védőszemüvegben**, köpenyben és tanári felügyelettel dolgozz! Tömény savat hígításkor mindig **a savat öntsd lassan a vízbe**, soha a vizet a savba, mert a hirtelen hőfejlődéstől kifröccsenhet. Vegyszert ne kóstolj, ne szagolj közvetlenül, és ha bőrödre vagy szemedbe kerül, azonnal öblítsd bő vízzel, és szólj a tanárnak! A lúgok a szemre még a savaknál is veszélyesebbek.'
        }
      ],
      quiz: [
        { q: 'Brønsted szerint mi a sav?', options: ['Protonfelvevő anyag', 'Protonleadó anyag', 'Elektronleadó anyag', 'Bármely savanyú ízű anyag'], answer: 1, explain: 'A sav protont (H⁺) ad le, a bázis protont vesz fel.' },
        { q: 'Mennyi a pH-ja a 0,001 mol/dm³-es sósavnak?', options: ['3', '1', '0,001', '11'], answer: 0, explain: '[H₃O⁺] = 10⁻³ mol/dm³, tehát pH = −lg 10⁻³ = 3.' },
        { q: 'Milyen színű a fenolftalein lúgos oldatban?', options: ['Színtelen', 'Piros', 'Lila (rózsaszín)', 'Kék'], answer: 2, explain: 'A fenolftalein savas és semleges közegben színtelen, lúgos közegben lila.' },
        { q: 'Hogyan hígítunk tömény kénsavat?', options: ['A vizet öntjük a savba', 'Egyszerre öntjük össze', 'Felforraljuk előtte', 'A savat öntjük lassan a vízbe'], answer: 3, explain: 'Így a felszabaduló hőt a sok víz elnyeli, és nem fröccsen ki a sav.' }
      ]
    },
    {
      id: 'szerves-elektrokemia',
      title: 'Szerves kémia és elektrokémia alapjai',
      level: 3, minutes: 17,
      summary: 'Szénhidrogének, alkoholok, szénhidrátok és fehérjék röviden, majd a galvánelem: hogyan lesz kémiai reakcióból áram.',
      tags: ['szerves kémia', 'szénhidrogén', 'alkán', 'alkén', 'metán', 'etanol', 'alkohol', 'karbonsav', 'szénhidrát', 'glükóz', 'fehérje', 'aminosav', 'elektrokémia', 'galvánelem', 'Daniell-elem', 'anód', 'katód', 'akkumulátor'],
      models: ['akkucella'],
      sections: [
        {
          title: 'Szénhidrogének',
          text: 'A **szerves kémia** a szénvegyületek kémiája. A szénatom **négy** kovalens kötést létesít, és képes hosszú láncokat, elágazásokat és gyűrűket alkotni, ezért van több millió szerves vegyület.\n\nA **szénhidrogének** csak szénből és hidrogénből állnak:\n\n- **Alkánok** (csak egyszeres kötés, általános képlet CₙH₂ₙ₊₂): metán (CH₄, földgáz), etán (C₂H₆), propán (C₃H₈) és bután (C₄H₁₀, PB-gáz), a benzin pedig főleg C₅–C₁₀ alkánok keveréke. Égésükkor CO₂ és H₂O keletkezik, sok hő szabadul fel.\n- **Alkének** (egy C=C kettős kötés, CₙH₂ₙ): az etén (C₂H₄) a polietilén (műanyag zacskók) alapanyaga. A kettős kötés miatt reakcióképesebbek, addícióra hajlamosak.\n- **Aromás** vegyületek: a benzol (C₆H₆) stabil, hattagú gyűrű.'
        },
        {
          title: 'Oxigéntartalmú vegyületek és biomolekulák',
          text: '- **Alkoholok**: –OH (hidroxil) csoportot tartalmaznak. Az **etanol** (C₂H₅OH) az italok alkoholja és üzemanyag-adalék; a **metanol** (CH₃OH) erős méreg, már kis mennyiségben vakságot okozhat.\n- **Karbonsavak**: –COOH csoport. Az **ecetsav** (CH₃COOH) az ecet savanyú anyaga, gyenge sav.\n- **Szénhidrátok**: a **glükóz** (szőlőcukor, C₆H₁₂O₆) a sejtek fő energiaforrása; a **szacharóz** (répacukor) kettős cukor; a **keményítő** és a **cellulóz** sok ezer glükózegységből álló óriásmolekula (polimer).\n- **Fehérjék**: **aminosavakból** épülnek fel, **peptidkötéssel** kapcsolódva. Enzimek, izmok, antitestek, a haj keratinja is fehérje. Melegítésre **denaturálódnak** (a tojásfehérje megfő).\n- **Zsírok**: glicerin és zsírsavak észterei, sok energiát raktároznak.'
        },
        {
          title: 'Elektrokémia: a galvánelem',
          text: 'Ha egy redoxireakcióban az elektronokat nem közvetlenül adják át egymásnak a részecskék, hanem **vezetéken keresztül** vezetjük őket, áramot kapunk. Ez a **galvánelem**.\n\nA klasszikus **Daniell-elem**: cinklemez cink-szulfát-oldatban, rézlemez réz-szulfát-oldatban, a két oldatot **sóhíd** köti össze.\n\n- **Anód** (−, cink): oxidáció, `Zn → Zn²⁺ + 2 e⁻`. A cinklemez lassan oldódik.\n- **Katód** (+, réz): redukció, `Cu²⁺ + 2 e⁻ → Cu`. Réz válik ki.\n- Az elektronok a külső vezetéken a cinktől a réz felé áramlanak.\n\nA feszültség a két fém **standardpotenciáljának** különbsége: +0,34 V − (−0,76 V) = **1,10 V**. Minél távolabb van a két fém egymástól a redoxisorban, annál nagyobb a feszültség.\n\nAz **akkumulátorokban** a folyamat megfordítható: töltéskor külső áramforrással visszafelé hajtjuk a reakciót. A lítiumion-akkuban töltéskor és merítéskor a Li⁺ ionok vándorolnak a két elektród között. Nézd meg belülről az [[akkucella|akkucella felfedezőben]]!',
          tip: 'Memóriatrükk: **anód – oxidáció** (mindkettő magánhangzóval kezdődik), **katód – redukció** (mindkettő mássalhangzóval). Ez elektrolízisnél is igaz, csak ott a pólusok előjele fordított.'
        }
      ],
      quiz: [
        { q: 'Mi az általános képlete az alkánoknak?', options: ['CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₊₂', 'CₙHₙ'], answer: 2, explain: 'Az alkánok telített szénhidrogének: CₙH₂ₙ₊₂, pl. metán CH₄ (n = 1), propán C₃H₈ (n = 3).' },
        { q: 'Milyen csoport jellemzi az alkoholokat?', options: ['–OH (hidroxilcsoport)', '–COOH (karboxilcsoport)', 'C=C kettős kötés', '–NH₂ (aminocsoport)'], answer: 0, explain: 'Pl. az etanol: C₂H₅OH. A –COOH a karbonsavaké, az –NH₂ az aminoké.' },
        { q: 'Mi történik a Daniell-elem cinkelektródján?', options: ['Réz válik ki', 'Redukció', 'Hidrogén fejlődik', 'Oxidáció, a cink oldódik'], answer: 3, explain: 'A cink az anód: Zn → Zn²⁺ + 2 e⁻, elektronokat ad le, ez oxidáció.' },
        { q: 'Miből épülnek fel a fehérjék?', options: ['Glükózból', 'Zsírsavakból', 'Aminosavakból', 'Nukleotidokból'], answer: 2, explain: 'Az aminosavakat peptidkötés kapcsolja össze. A glükózból szénhidrátok, nukleotidokból nukleinsavak (DNS, RNS) épülnek.' }
      ]
    }
  ]
});
