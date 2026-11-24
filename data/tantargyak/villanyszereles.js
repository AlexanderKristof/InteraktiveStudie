/* Tantárgy: Villanyszerelés */
STUDIE.addSubject({
  id: 'villanyszereles',
  stage: 'szakma',
  title: 'Villanyszerelés',
  icon: '⚡',
  color: '#f5a524',
  description: 'Áram, feszültség, vezetékek, védelmek: az épületvillamosság alapjai biztonságosan.',
  intro: 'Ez a tananyag a villanyszerelés **elméletét** tanítja meg. Hálózati (230 V-os) szerelést csak képzett, jogosultsággal rendelkező szakember végezhet. Amit itt tanulsz, azzal megérted, mit és miért csinál a villanyszerelő, és felkészülsz a szakmára.',
  lessons: [
    {
      id: 'biztonsag',
      title: 'Az első szabály: a biztonság',
      level: 1, minutes: 8,
      summary: 'Miért veszélyes az áram, és mi az öt biztonsági szabály, amit minden villanyszerelő betart.',
      tags: ['érintésvédelem', 'áramütés', 'feszültségmentesítés', '5 szabály', 'munkavédelem'],
      sections: [
        {
          title: 'Miért veszélyes az áram?',
          text: 'Az emberi testen átfolyó áram megzavarja az idegek és a szív működését. Nem a feszültség „öl”, hanem az **áram**, ami a testen átfolyik, de ezt a feszültség hajtja át.\n\n- **kb. 1 mA**: épp érezhető bizsergés\n- **kb. 10 mA**: görcsös izomösszehúzódás, a vezetéket esetleg nem tudod elengedni\n- **kb. 30 mA felett**: légzésbénulás, szívkamra-remegés veszélye\n- **100 mA felett**: nagyon nagy az életveszély\n\nA 230 V-os hálózat ezért életveszélyes. Az áram hőhatása égési sérülést és tüzet is okozhat.',
          warn: 'Feszültség alatt álló hálózati vezetékhez soha ne nyúlj! Gyakorolni törpefeszültséggel (pl. 4,5–12 V-os elemmel) szabad.'
        },
        {
          title: 'Az öt biztonsági szabály',
          text: 'Mielőtt egy villanyszerelő bármihez hozzányúl, mindig ebben a sorrendben dolgozik:\n\n1. **Leválasztás**: a kismegszakítóval vagy főkapcsolóval lekapcsolja az áramkört.\n2. **Visszakapcsolás elleni biztosítás**: lezárja vagy felcímkézi a kapcsolót, hogy más ne kapcsolja vissza.\n3. **Feszültségmentesség ellenőrzése**: kétpólusú feszültségvizsgálóval megméri, hogy tényleg nincs feszültség.\n4. **Földelés és rövidrezárás**: nagyobb hálózatokon ezzel védekeznek a véletlen visszakapcsolás ellen.\n5. **A közeli, feszültség alatt maradó részek letakarása** vagy elkerítése.',
          tip: 'A „fázisceruza” (ködfénylámpás csavarhúzó) **nem** alkalmas a feszültségmentesség biztos ellenőrzésére. Erre kétpólusú feszültségvizsgáló való.'
        },
        {
          title: 'Védőeszközök',
          text: 'A szerelő szigetelt szerszámokat (1000 V-ig minősített csavarhúzók, fogók), szükség esetén szigetelő kesztyűt, védőszemüveget és munkaruhát használ. A szerszámokon a **kettős háromszög** jel és az **1000 V** felirat mutatja a minősítést.'
        }
      ],
      quiz: [
        { q: 'Mi az első lépés az öt biztonsági szabály közül?', options: ['Leválasztás (lekapcsolás)', 'Feszültségmentesség ellenőrzése', 'Letakarás', 'Földelés'], answer: 0, explain: 'Először le kell kapcsolni az áramkört, utána jön a biztosítás, majd a mérés.' },
        { q: 'Kb. mekkora testáram felett áll fenn a szívkamra-remegés veszélye?', options: ['30 mA', '1 mA', '0,1 mA', '5 A'], answer: 0, explain: 'Ezért 30 mA-es az áram-védőkapcsoló (FI relé) érzékenysége lakásokban.' },
        { q: 'Mivel ellenőrizzük biztosan a feszültségmentességet?', options: ['Kétpólusú feszültségvizsgálóval', 'Fázisceruzával', 'Megérintéssel', 'A lámpa nem világít, ez elég'], answer: 0, explain: 'A fázisceruza megbízhatatlan, a lámpa pedig lehet egyszerűen kiégve.' }
      ]
    },
    {
      id: 'alapfogalmak',
      title: 'Feszültség, áram, ellenállás',
      level: 1, minutes: 12,
      summary: 'A három alapmennyiség és Ohm törvénye, kipróbálható áramkörrel.',
      tags: ['Ohm', 'Ohm-törvény', 'volt', 'amper', 'ohm', 'watt', 'teljesítmény'],
      models: ['atom'],
      sections: [
        {
          title: 'Hasonlat: a vízvezeték',
          text: 'Képzeld el az áramkört vízcsőként:\n\n- A **feszültség (U, volt, V)** a víznyomás: ez hajtja a töltéseket.\n- Az **áramerősség (I, amper, A)** az, hogy másodpercenként mennyi víz folyik át a csövön.\n- Az **ellenállás (R, ohm, Ω)** a cső szűkülete: minél szűkebb, annál kevesebb víz jut át ugyanakkora nyomáson.\n\nA fémekben az áramot az atomok közt szabadon mozgó **elektronok** viszik. Hogy ezek honnan jönnek, azt az [[atom|atom felfedezőjében]] nézheted meg.'
        },
        {
          title: 'Ohm törvénye',
          text: 'A három mennyiség között egyszerű kapcsolat van:\n\n`U = R · I`   →   `I = U / R`   →   `R = U / I`\n\nPélda: egy 230 V-ra kapcsolt, 46 Ω-os vízforraló fűtőszálán `I = 230 / 46 = 5 A` áram folyik.',
          widget: { type: 'ohm' }
        },
        {
          title: 'Teljesítmény',
          text: 'A **teljesítmény (P, watt, W)** megmutatja, mennyi energiát alakít át a fogyasztó másodpercenként: `P = U · I`.\n\nAz előző vízforraló: `P = 230 V · 5 A = 1150 W`. Egy óra alatt `1,15 kWh` energiát fogyaszt; a villanyszámlán ezt a **kilowattórát (kWh)** fizetjük.',
          tip: 'Gyors fejszámolás: 230 V-on minden 1 A nagyjából 230 W. Egy 16 A-es kismegszakító így kb. 3,6 kW-ot bír el.'
        },
        {
          title: 'Gyakorlás',
          text: 'Számolj Ohm törvényével, amíg rá nem jön a kezed!',
          widget: { type: 'gyakorlas', options: { kind: 'ohm', title: 'Ohm-törvény gyakorló' } }
        }
      ],
      quiz: [
        { q: 'Mekkora az áram, ha U = 12 V és R = 4 Ω?', options: ['3 A', '48 A', '0,33 A', '16 A'], answer: 0, explain: 'I = U / R = 12 / 4 = 3 A.' },
        { q: 'Mi a teljesítmény mértékegysége?', options: ['watt (W)', 'volt (V)', 'amper (A)', 'ohm (Ω)'], answer: 0, explain: 'P = U · I, mértékegysége a watt.' },
        { q: 'Mit fizetünk a villanyszámlán?', options: ['Elfogyasztott energiát (kWh)', 'A feszültséget (V)', 'Az áramerősséget (A)', 'Az ellenállást (Ω)'], answer: 0, explain: 'Az energia = teljesítmény × idő, kilowattórában mérve.' }
      ]
    },
    {
      id: 'kapcsolasok',
      title: 'Soros és párhuzamos kapcsolás',
      level: 1, minutes: 10,
      summary: 'Miért párhuzamosan kötjük a lakás fogyasztóit, és mi történik soros kötésnél.',
      tags: ['soros', 'párhuzamos', 'eredő ellenállás', 'karácsonyfa izzó'],
      sections: [
        {
          title: 'Soros kapcsolás',
          text: 'A fogyasztók egymás után, „egy sorban” vannak. **Ugyanaz az áram** folyik mindegyiken, a feszültség pedig megoszlik közöttük. Ha egy elem kiesik, az egész kör megszakad. Így működtek a régi karácsonyfaizzó-füzérek: ha egy égő kiégett, mind elaludt.'
        },
        {
          title: 'Párhuzamos kapcsolás',
          text: 'A fogyasztók egymás mellett, mindegyik közvetlenül a tápra kapcsolódik. **Mindegyiken ugyanaz a feszültség** (otthon 230 V), az áramok összeadódnak. A lakásban minden fogyasztó párhuzamosan kapcsolódik: ezért működik a hűtő akkor is, ha a lámpát lekapcsolod.',
          widget: { type: 'soros-parhuzamos' }
        }
      ],
      quiz: [
        { q: 'Hogyan kapcsolódnak a lakás fogyasztói?', options: ['Párhuzamosan', 'Sorosan', 'Vegyesen, véletlenszerűen', 'Sehogy, külön áramkörben mindegyik'], answer: 0, explain: 'Így mindegyik megkapja a teljes 230 V-ot, és egymástól függetlenül kapcsolhatók.' },
        { q: 'Mekkora két 10 Ω-os ellenállás eredője párhuzamosan?', options: ['5 Ω', '20 Ω', '10 Ω', '100 Ω'], answer: 0, explain: '1/Re = 1/10 + 1/10 = 2/10, tehát Re = 5 Ω.' }
      ]
    },
    {
      id: 'vezetekek',
      title: 'Vezetékek, színek, keresztmetszet',
      level: 2, minutes: 12,
      summary: 'Melyik ér mit jelent, és hogyan válasszunk megfelelő vastagságú vezetéket.',
      tags: ['vezeték', 'kábel', 'fázis', 'nulla', 'védőföld', 'PE', 'N', 'L', 'mm²', 'feszültségesés', 'MBCu', 'NYM'],
      sections: [
        {
          title: 'Az erek színei',
          text: 'Magyarországon (és az EU-ban) a hálózati vezetékek színe szabványos:\n\n- **Barna, fekete vagy szürke**: fázisvezető (L), ezen van a feszültség.\n- **Kék**: nullavezető (N), a munkaáram ezen tér vissza.\n- **Zöld-sárga**: védővezető (PE), ez a földelés. Normál esetben nem folyik rajta áram, hiba esetén elvezeti a zárlati áramot.',
          warn: 'Régi épületekben más színek is előfordulhatnak, és bárki köthetett rosszul. A szín csak tájékoztat, a mérés dönt!'
        },
        {
          title: 'Vezetéktípusok',
          text: '- **MCu (H07V-U)**: tömör rézerű, egyeres vezeték, védőcsőbe húzva.\n- **MKh (H07V-K)**: sodrott, hajlékony ér, elosztószekrényekbe.\n- **NYM-J (MBCu)**: köpenyes, többeres falikábel, vakolat alá vagy falon kívül.\n- **H05VV-F (MT)**: hajlékony, gumi- vagy PVC-köpenyes kábel, készülékekhez és hosszabbítókhoz.'
        },
        {
          title: 'Mekkora keresztmetszet kell?',
          text: 'Minél nagyobb áram folyik, annál vastagabb vezeték kell, különben a vezeték melegszik és túl sok feszültség esik rajta. Lakásban tipikusan:\n\n- **1,5 mm²**: világítás (10–13 A-es kismegszakítóval)\n- **2,5 mm²**: dugaljkörök (16 A)\n- **4–6 mm²**: villanytűzhely, nagyobb fogyasztók\n\nA pontos érték a szerelési módtól, a hossztól és a környezettől függ. Ezt a tervező az MSZ HD 60364 szabványsorozat szerint számolja ki.',
          widget: { type: 'feszultsegeses' }
        }
      ],
      quiz: [
        { q: 'Milyen színű a védővezető (PE)?', options: ['Zöld-sárga', 'Kék', 'Barna', 'Fekete'], answer: 0, explain: 'A zöld-sárga kizárólag védővezetőként használható.' },
        { q: 'Milyen színű a nullavezető (N)?', options: ['Kék', 'Zöld-sárga', 'Barna', 'Piros'], answer: 0, explain: 'A kék a nullavezető színe.' },
        { q: 'Mi történik, ha túl vékony a vezeték a terheléshez képest?', options: ['Melegszik, és túl sok feszültség esik rajta', 'Semmi, csak drágább lesz', 'Nagyobb lesz a feszültség a fogyasztón', 'Gyorsabban folyik az áram'], answer: 0, explain: 'A vékony vezeték ellenállása nagyobb, ezért több hő termelődik benne (P = I²·R).' }
      ]
    },
    {
      id: 'vedelmek',
      title: 'Kismegszakító és FI relé',
      level: 2, minutes: 12,
      summary: 'Mi véd a tűztől és mi az áramütéstől: a lakás elosztószekrényének lelke.',
      tags: ['kismegszakító', 'FI relé', 'ÁVK', 'áram-védőkapcsoló', 'zárlat', 'túlterhelés', 'elosztószekrény', 'biztosíték'],
      models: ['elosztoszekreny'],
      sections: [
        {
          title: 'Kismegszakító: a vezetéket védi',
          text: 'A kismegszakító (régen „biztosíték”) két hibát érzékel:\n\n- **Túlterhelés**: tartósan túl nagy áram (pl. túl sok fogyasztó egy dugaljon). Egy **bimetall** szalag felmelegszik, elhajlik, és néhány másodperc vagy perc után kiold.\n- **Zárlat**: a fázis közvetlenül a nullával vagy a földdel érintkezik, és óriási áram indul meg. Egy **elektromágnes** ezredmásodpercek alatt kiold.\n\nA jelölés, például **B16**: a „B” a kioldási jelleggörbe (lakásban szokásos), a 16 a névleges áram amperben.'
        },
        {
          title: 'FI relé: az embert védi',
          text: 'Az **áram-védőkapcsoló** (ÁVK, köznapi nevén FI relé) folyamatosan összehasonlítja a fázison kimenő és a nullán visszajövő áramot. Ha a kettő eltér, akkor az áram valahol „elszökik”, például egy emberen keresztül a földbe. **30 mA** eltérésnél kb. 30 ms alatt lekapcsol, mielőtt a szív veszélybe kerülne.\n\nA FI relén van egy **T (teszt)** gomb. Ezt félévente érdemes megnyomni: ha a relé lekapcsol, működik.',
          tip: 'A kismegszakító nem véd az áramütéstől! Egy emberen átfolyó 50 mA meg sem kottyan egy 16 A-es kismegszakítónak. Erre van a FI relé.'
        },
        {
          title: 'Nézd meg belülről!',
          text: 'A lakás elosztószekrényét alkatrészeire szedve az [[elosztoszekreny|elosztószekrény felfedezőjében]] nézheted meg.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a „B16” felirat egy kismegszakítón?', options: ['B jelleggörbe, 16 A névleges áram', '16 darab B típusú vezeték', '16 V feszültség', 'Bekapcsolva 16 másodpercig'], answer: 0, explain: 'A betű a jelleggörbe, a szám a névleges áram.' },
        { q: 'Mit figyel a FI relé?', options: ['A kimenő és visszatérő áram különbségét', 'A feszültség nagyságát', 'A vezeték hőmérsékletét', 'Az elfogyasztott kWh-t'], answer: 0, explain: 'Ha a különbség eléri a 30 mA-t, lekapcsol.' },
        { q: 'Melyik véd az áramütéstől?', options: ['FI relé (ÁVK)', 'Kismegszakító', 'Villanyóra', 'Csillárkapocs'], answer: 0, explain: 'A kismegszakító a vezetéket védi a túlmelegedéstől, a FI relé az embert.' }
      ]
    }
  ]
});
