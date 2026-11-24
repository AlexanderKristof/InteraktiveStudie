/* Tantárgy: Elektromosautó-szerelés */
STUDIE.addSubject({
  id: 'elektromos-auto',
  title: 'Elektromosautó-szerelés',
  icon: '🔋',
  color: '#2f9e6a',
  description: 'Akkumulátor, BMS, villanymotor, inverter és töltés: a villanyautó működése és a nagyfeszültség biztonságos kezelése.',
  intro: 'Az elektromos autókban **több száz voltos egyenfeszültség** van, ami azonnal életveszélyes. Ez a tananyag a működés **megértését** szolgálja. A nagyfeszültségű (HV) rendszeren csak erre kiképzett, megfelelő HV-képesítéssel rendelkező szakember dolgozhat, a gyártói előírások szerint. A narancssárga kábelekhez és alkatrészekhez soha ne nyúlj!',
  lessons: [
    {
      id: 'mukodes',
      title: 'Hogyan működik egy villanyautó?',
      level: 1, minutes: 10,
      summary: 'A villanyautó fő részei, és hogy miért jobb a hatásfoka, mint egy benzinesé.',
      tags: ['elektromos autó', 'villanyautó', 'BEV', 'hibrid', 'hatásfok', 'inverter', 'villanymotor', 'fedélzeti töltő', 'DC/DC átalakító', 'reduktor', '12 V akkumulátor'],
      models: ['elektromos-auto', 'benzinmotor'],
      sections: [
        {
          title: 'A fő egységek',
          text: 'Egy tisztán elektromos autó (**BEV**) jóval kevesebb mozgó alkatrészből áll, mint egy benzines. A fő egységek:\n\n- **Nagyfeszültségű (HV) akkumulátor**: a padló alatt, több száz kilogramm, tipikusan **400 V** (egyes modelleknél **800 V**) névleges feszültségű.\n- **Inverter (teljesítményelektronika)**: az akkumulátor egyenáramából a motor számára szabályozott **háromfázisú váltakozó áramot** készít.\n- **Villanymotor**: a kerekeket hajtja, fékezéskor generátorként visszatölt.\n- **Reduktor**: egyetlen fix áttételű fogaskerék-hajtás (kb. 9 : 1), mert a villanymotor nagy fordulattartományban jól működik. Nincs többfokozatú váltó, és nincs kuplung.\n- **Fedélzeti töltő (OBC)**: a hálózat váltakozó áramát egyenárammá alakítja az akkumulátor töltéséhez.\n- **DC/DC átalakító**: a HV akkuból táplálja a **12 V-os** fedélzeti hálózatot (világítás, vezérlők). Ezért van a villanyautóban is kis 12 V-os akkumulátor.\n- **Hőmenedzsment**: hűtőkör és gyakran **hőszivattyú** az akku, a motor és az utastér számára.\n\nAz egész autót szétszedve az [[elektromos-auto|elektromos autó felfedezőjében]] nézheted meg.'
        },
        {
          title: 'Miért ilyen jó a hatásfoka?',
          text: 'Egy benzinmotor a tüzelőanyag energiájának csak kb. **25–35%-át** alakítja mozgássá, a többi hő lesz. Egy villanymotor és inverter együtt kb. **85–95%-os** hatásfokú. Ráadásul a villanyautó fékezéskor energiát is **visszanyer** (rekuperáció).\n\nEzért fogyaszt egy átlagos villanyautó csak kb. **15–20 kWh-t 100 km-en**. Ugyanez az energia kb. 2 liter benzinben van, holott egy hasonló benzines autó 6–7 litert fogyaszt. (A teljes képhez persze hozzátartozik, hogyan termelték az áramot, és mennyi energia kellett az akkumulátor gyártásához.)'
        },
        {
          title: 'Hibrid, plug-in hibrid, villanyautó',
          text: '- **HEV (hagyományos hibrid)**: benzinmotor és kis villanymotor együtt, kis akkuval; kívülről nem tölthető.\n- **PHEV (konnektoros hibrid)**: nagyobb akku, néhány tíz km-t tisztán elektromosan megy, és tölthető.\n- **BEV (akkumulátoros villanyautó)**: csak villanymotor, nincs belső égésű motor.\n\nA nagyfeszültségű rendszer mindhárom típusban jelen van, tehát a hibrideknél is ugyanazok a biztonsági szabályok érvényesek!',
          tip: 'Ha összehasonlítanád a benzines motorral, nézd meg a [[benzinmotor|benzinmotor felfedezőjét]] is: hány alkatrész hiányzik a villanyautóból?'
        }
      ],
      quiz: [
        { q: 'Mi az inverter feladata?', options: ['Az akku egyenáramából háromfázisú váltakozó áramot készít a motornak', 'A 12 V-os akkut tölti a hálózatról', 'A kerekeket fékezi', 'Hűti az akkumulátort'], answer: 0, explain: 'Az inverter szabályozza a motor fordulatát és nyomatékát a kimenő váltakozó áram frekvenciájával és nagyságával.' },
        { q: 'Miért nincs többfokozatú váltó a legtöbb villanyautóban?', options: ['Mert a villanymotor nagyon széles fordulattartományban jól működik', 'Mert túl drága lenne', 'Mert a villanymotor csak egy fordulaton tud forogni', 'Mert tilos'], answer: 0, explain: 'A villanymotor már álló helyzetből nagy nyomatékot ad, és akár 15–20 ezres fordulatig is pöröghet, így elég egy fix áttételű reduktor.' },
        { q: 'Mire való a DC/DC átalakító?', options: ['A HV akkuból táplálja a 12 V-os fedélzeti hálózatot', 'Gyorstöltéskor a hálózati áramot alakítja át', 'A motor fordulatát méri', 'A fékfolyadékot melegíti'], answer: 0, explain: 'A világítás, a vezérlők és a kis 12 V-os akku a DC/DC átalakítón keresztül kap energiát.' },
        { q: 'Kb. mekkora egy villanymotor és inverter együttes hatásfoka?', options: ['85–95%', '25–35%', '50%', '10%'], answer: 0, explain: 'A 25–35% a benzinmotorra jellemző.' }
      ]
    },
    {
      id: 'hv-biztonsag',
      title: 'Nagyfeszültségű biztonság',
      level: 1, minutes: 13,
      summary: 'Mitől veszélyes a HV-rendszer, mit jelentenek a narancssárga kábelek, és hogyan feszültségmentesít a szakember.',
      tags: ['HV', 'nagyfeszültség', 'narancssárga kábel', 'szervizdugó', 'feszültségmentesítés', 'HV-képesítés', 'szigetelő kesztyű', 'CAT III', 'ívzárlat', 'szigetelésfelügyelet', 'munkavédelem'],
      sections: [
        {
          title: 'Mitől nagyfeszültségű?',
          text: 'A járműtechnikában **nagyfeszültségű (HV)** rendszernek a **60 V feletti egyenfeszültséget** (és a 30 V feletti váltakozó feszültséget) nevezik. Egy villanyautó akkumulátorán 400 vagy akár 800 V **egyenfeszültség** van. Ez több, mint a lakás konnektoraiban!\n\nAz egyenáram különösen alattomos: az izmok görcsbe rándulnak, és a sérült gyakran **nem tudja elengedni** a vezetéket. Emellett egy zárlat **villamos ívet** okozhat, amely több ezer fokos, és súlyos égési, szemsérülést okoz.\n\nA veszély felismerését segíti, hogy **minden HV-kábel és -csatlakozó narancssárga**, a HV-alkatrészeken pedig sárga villám-figyelmeztető matrica van.',
          warn: 'Narancssárga kábelhez, csatlakozóhoz, HV-akkuhoz soha ne nyúlj, és ne szedd szét! Ezen a rendszeren csak HV-képesítéssel rendelkező szakember dolgozhat, gyártói javítási utasítás alapján.'
        },
        {
          title: 'Számold ki: mekkora áram folyna át rajtad?',
          text: 'Az emberi test ellenállása (kéz–kéz vagy kéz–láb között) nagyfeszültségen kb. **1000 Ω** körül van, nedves bőrrel még kevesebb. Ohm törvényével: `I = U / R = 400 V / 1000 Ω = 0,4 A = 400 mA`.\n\nEmlékezz: már kb. **30 mA** életveszélyes lehet! Állítsd be a csúszkákkal a feszültséget és a test ellenállását.',
          widget: { type: 'ohm', options: { maxU: 800, u: 400, maxR: 5000, r: 1000, help: 'Feszültség: az akkumulátor feszültsége. Ellenállás: az emberi test ellenállása (kb. 1000 Ω). Nézd meg, hány **mA** folyna át a testen. 30 mA felett életveszély!' } }
        },
        {
          title: 'Ki dolgozhat a HV-rendszeren?',
          text: 'Villanyautón a munkák szintekre oszthatók:\n\n- **Nem villamos munkák** (pl. gumicsere, ablaktörlő, kárpit): a HV-veszélyekről **kioktatott** dolgozó végezheti, ha a HV-részekhez nem nyúl.\n- **Feszültségmentesített HV-rendszeren végzett munka**: csak megfelelő **HV-szakképzést** elvégzett, kijelölt szakember.\n- **Feszültség alatti munka** (pl. az akkumulátor belsejében): csak külön képzéssel, speciális eszközökkel és szigorú szabályok szerint.\n\nA HV-szerelő eszközei: **1000 V-os szigetelő kesztyű** (minden használat előtt légpróbával ellenőrizve a lyukak ellen), arcvédő pajzs, szigetelt szerszámok, és **CAT III 1000 V**-os (vagy jobb) besorolású mérőműszer.'
        },
        {
          title: 'A feszültségmentesítés lépései',
          text: 'Az autót a szakember mindig a **gyártói utasítás** szerint feszültségmentesíti. Az általános lépések:\n\n1. **Gyújtás ki**, a kulcsot (kártyát) a gyártó által előírt távolságra vinni az autótól, hogy az autó ne „ébredhessen fel”.\n2. A **12 V-os akkumulátor** negatív sarujának lekötése: enélkül a HV-kontaktorok nem tudnak bekapcsolni.\n3. A **szervizdugó** (service disconnect) vagy a HV-leválasztó eltávolítása, és elzárása, hogy más ne tehesse vissza.\n4. **Várakozás** (a gyártó adja meg, gyakran 5–10 perc), amíg az inverter kondenzátorai kisülnek.\n5. A **feszültségmentesség mérése** az előírt mérési pontokon. Előtte és utána a műszert ismert feszültségforráson ellenőrizni kell!\n6. Az autó megjelölése táblával: „Feszültségmentesítve, ne kapcsold be!”\n\nA HV-rendszer a karosszériától **szigetelve** van, ezt a **szigetelésfelügyelet** folyamatosan ellenőrzi. Szigetelési hiba esetén az autó figyelmeztet, súlyos esetben lekapcsolja a HV-rendszert.',
          tip: 'Baleset után a sérült villanyautóhoz a mentők és a tűzoltók is speciális mentési lapok (rescue sheet) alapján nyúlnak. Egy sérült akkumulátor napokkal később is kigyulladhat.'
        }
      ],
      quiz: [
        { q: 'Milyen színűek a villanyautó nagyfeszültségű kábelei?', options: ['Narancssárgák', 'Zöld-sárgák', 'Kékek', 'Feketék'], answer: 0, explain: 'A narancssárga szín egyértelműen jelzi a HV-rendszer részeit.' },
        { q: 'Mekkora áram folyna át a testen 400 V-on, ha a test ellenállása 1000 Ω?', options: ['400 mA', '4 mA', '40 mA', '4 A'], answer: 0, explain: 'I = U / R = 400 / 1000 = 0,4 A = 400 mA. Ez sokszorosan életveszélyes.' },
        { q: 'Miért kell várni a szervizdugó kihúzása után?', options: ['Hogy az inverter kondenzátorai kisüljenek', 'Hogy kihűljön a motor', 'Hogy a fékfolyadék leülepedjen', 'Hogy a 12 V-os akku feltöltődjön'], answer: 0, explain: 'A kondenzátorokban a leválasztás után is veszélyes feszültség maradhat egy ideig.' },
        { q: 'Ki dolgozhat feszültségmentesített HV-rendszeren?', options: ['Csak HV-szakképzéssel rendelkező, kijelölt szakember', 'Bárki, aki kihúzta a szervizdugót', 'Bárki, akinek van gumikesztyűje', 'Bármelyik autószerelő tanuló egyedül'], answer: 0, explain: 'A HV-munkákhoz külön képzés és kijelölés kell.' },
        { q: 'Mi a járműtechnikában a nagyfeszültség határa egyenfeszültségnél?', options: ['60 V', '12 V', '230 V', '1000 V'], answer: 0, explain: '60 V DC felett (váltakozó feszültségnél 30 V felett) már HV-rendszerről beszélünk.' }
      ]
    },
    {
      id: 'akkumulator-bms',
      title: 'Az akkumulátor és a BMS',
      level: 2, minutes: 15,
      summary: 'Cellából modul, modulból pakk: hogyan épül fel a HV-akku, és mit csinál az akkumulátor-felügyelet.',
      tags: ['akkumulátor', 'lítiumion', 'cella', 'modul', 'akkupakk', 'NMC', 'LFP', 'BMS', 'SoC', 'SoH', 'cellakiegyenlítés', 'balanszolás', 'kontaktor', 'kWh', 'degradáció'],
      models: ['akkucella', 'elektromos-auto'],
      sections: [
        {
          title: 'Cella, modul, pakk',
          text: 'Az akkumulátor legkisebb egysége a **lítiumion-cella**. Egy cella feszültsége csak kb. **3,2–3,7 V**, ezért sok cellát kell összekötni:\n\n- **Sorosan** kötve a feszültségek összeadódnak: 96 cella × 3,6 V ≈ **346 V**.\n- **Párhuzamosan** kötve a kapacitások (Ah) adódnak össze.\n\nA jelölés pl. **96S46P**: 96 sorba kötött csoport, mindegyikben 46 párhuzamos cella. A cellákat **modulokba**, a modulokat a **pakkba** szerelik, hűtéssel, biztosítékokkal, kontaktorokkal és a felügyelő elektronikával együtt.\n\nCellaformák: **hengeres** (pl. 2170, 4680), **prizmatikus** (lapos, merev fém doboz) és **pouch** (puha fóliatasak). Hogy mi van egy cella belsejében, azt az [[akkucella|akkucella felfedezőjében]] láthatod.'
        },
        {
          title: 'Tervezz akkupakkot!',
          text: 'Az energia: `E (kWh) = U (V) · Q (Ah) / 1000`. Két elterjedt cellakémia:\n\n- **NMC** (nikkel-mangán-kobalt): nagy energiasűrűség, nagyobb hatótáv ugyanakkora tömegből.\n- **LFP** (lítium-vas-foszfát): kisebb energiasűrűség, de olcsóbb, hosszabb élettartamú, termikusan stabilabb, és kobaltot sem tartalmaz.\n\nPróbáld ki, mi történik, ha több cellát kötsz sorba vagy párhuzamosan!',
          widget: { type: 'akkupakk' }
        },
        {
          title: 'A BMS, az akkumulátor őre',
          text: 'A **BMS (Battery Management System, akkumulátor-felügyelet)** nélkül a lítiumion-akku veszélyes lenne. Feladatai:\n\n- **Méri** minden cellacsoport feszültségét, az áramot és sok ponton a hőmérsékletet.\n- **Véd**: nem engedi a cellákat túltölteni (kb. 4,2 V felett NMC-nél) vagy túlmeríteni, és túl nagy áramnál, túlmelegedésnél korlátoz vagy a **kontaktorokkal** lekapcsol.\n- **Kiegyenlít (balanszol)**: a cellák sosem teljesen egyformák. A BMS a magasabb feszültségű cellákból kis ellenálláson energiát „éget el” (passzív balanszolás), hogy minden cella egyformán töltődjön.\n- **Becsül**: kiszámolja a töltöttségi szintet (**SoC**, State of Charge, %) és az akku egészségi állapotát (**SoH**, State of Health: mennyi maradt az eredeti kapacitásból).\n- **Kommunikál** a többi vezérlővel és a töltőállomással.',
          warn: 'A sérült, deformálódott vagy túlmelegedett lítiumion-akku kigyulladhat (hőmegfutás), és a tüze nehezen oltható, mérgező gázokat bocsát ki. Ilyen akkuhoz csak szakember nyúlhat.'
        },
        {
          title: 'Hogyan él tovább sokáig az akku?',
          text: 'Az akkumulátor kapacitása az évek során lassan csökken (**degradáció**). Ezt gyorsítja:\n\n- a tartósan **100%-os** vagy nagyon alacsony töltöttség,\n- a **magas hőmérséklet** (az ideális tartomány nagyjából 20–40 °C),\n- a nagyon gyakori, nagy teljesítményű gyorstöltés.\n\nEzért ajánlják a gyártók, hogy hétköznapokon kb. **80%-ig** töltsd az NMC-akkus autót (az LFP-t a gyártó gyakran 100%-ig javasolja). Hidegben a cellák belső ellenállása nő, ezért télen kisebb a hatótáv és lassabb a töltés. A jó **hőmenedzsment** ezért nagyon fontos.'
        }
      ],
      quiz: [
        { q: 'Mi történik, ha a cellákat sorba kötöd?', options: ['Összeadódik a feszültségük', 'Összeadódik a kapacitásuk (Ah)', 'Csökken a feszültség', 'Semmi nem változik'], answer: 0, explain: 'Sorosan a feszültség, párhuzamosan a kapacitás nő.' },
        { q: 'Mekkora az energiája egy 350 V-os, 200 Ah-s akkupakknak?', options: ['70 kWh', '700 kWh', '7 kWh', '550 kWh'], answer: 0, explain: 'E = 350 · 200 / 1000 = 70 kWh.' },
        { q: 'Mit jelent a SoC?', options: ['Töltöttségi szint (százalékban)', 'Az akku egészségi állapota', 'A cella típusa', 'A töltő teljesítménye'], answer: 0, explain: 'SoC = State of Charge. Az egészségi állapot a SoH.' },
        { q: 'Mi a cellakiegyenlítés (balanszolás) célja?', options: ['Hogy minden cella egyforma töltöttségű legyen', 'Hogy az autó egyenesen menjen', 'Hogy hűtse az akkut', 'Hogy növelje a cellák feszültségét 5 V-ra'], answer: 0, explain: 'A legkevésbé töltött cella korlátozza a merítést, a legjobban töltött a töltést; kiegyenlítés nélkül a pakk egyre kevesebbet tudna tárolni.' },
        { q: 'Melyik cellakémia olcsóbb, hosszabb élettartamú és termikusan stabilabb?', options: ['LFP', 'NMC', 'Ólomsavas', 'NiCd'], answer: 0, explain: 'Az LFP energiasűrűsége kisebb, de biztonságosabb és tartósabb.' }
      ]
    },
    {
      id: 'motor-inverter',
      title: 'Villanymotor, inverter, rekuperáció',
      level: 2, minutes: 13,
      summary: 'Hogyan forgatja a mágneses tér a motort, mit kapcsolgat az inverter, és hogyan tölt vissza a fékezés.',
      tags: ['villanymotor', 'szinkronmotor', 'PMSM', 'aszinkronmotor', 'indukciós motor', 'állandó mágnes', 'inverter', 'IGBT', 'SiC', 'PWM', 'rekuperáció', 'egypedálos vezetés', 'nyomaték'],
      models: ['tranzisztor', 'elektromos-auto'],
      sections: [
        {
          title: 'Forgó mágneses tér',
          text: 'A villanymotor álló részében, az **állórészben (sztátor)** három tekercscsoport van. Ha ezekre időben eltolt, **háromfázisú** áramot vezetünk, a tekercsek mágneses tere **körbeforog**. A **forgórész (rotor)** ezt a forgó teret követi, ahogy egy iránytű tűje követi a körbevitt mágnest.\n\nVillanyautókban két fő motortípus terjedt el:\n\n- **Állandó mágneses szinkronmotor (PMSM)**: a forgórészben erős (neodímium) mágnesek vannak, pontosan együtt forog a mezővel. Nagyon jó hatásfokú, a legtöbb mai autóban ez van.\n- **Aszinkron (indukciós) motor**: a forgórészben nincs mágnes, az áramot a forgó tér **indukálja** benne. Robusztus és olcsóbb, kicsit gyengébb hatásfokú.\n\nA villanymotor már **álló helyzetből** teljes nyomatékot ad, ezért gyorsulnak a villanyautók ilyen fürgén.'
        },
        {
          title: 'Az inverter: villámgyors kapcsolók',
          text: 'Az akkumulátor **egyenáramot** ad, a motornak viszont **háromfázisú váltakozó áram** kell, változtatható frekvenciával. Ezt az **inverter** állítja elő hat nagy teljesítményű félvezető kapcsolóval (**IGBT** vagy újabban **SiC MOSFET**). A tranzisztor működését a [[tranzisztor|tranzisztor felfedezőjében]] ismerheted meg.\n\nA kapcsolók másodpercenként több ezerszer (tipikusan 5–20 kHz-cel) kapcsolnak be és ki. A be- és kikapcsolt idő arányának ügyes változtatásával (**PWM, impulzusszélesség-moduláció**) a tekercsekben szinuszhoz hasonló áram folyik.\n\n- A **frekvencia** határozza meg a motor **fordulatszámát**.\n- Az **áram nagysága** határozza meg a **nyomatékot**.\n\nAz inverterben nagy **kondenzátorok** simítják a feszültséget. Ezek a leválasztás után is töltve maradhatnak, ezért kell a feszültségmentesítés után várni!',
          warn: 'Az inverter kondenzátorai a HV-akku leválasztása után is életveszélyes feszültséget tárolhatnak. Az invertert csak HV-képesített szakember nyithatja fel, a gyártói várakozási idő és mérés után.'
        },
        {
          title: 'Rekuperáció: fékezés, ami tölt',
          text: 'A villanymotor fordítva is működik: ha a kerekek hajtják, **generátorként** áramot termel. Amikor felengeded a gázpedált vagy fékezel, az inverter ezt az áramot az akkumulátorba vezeti, a motor pedig közben **fékezi** az autót. Ez a **rekuperáció** (energia-visszanyerés).\n\n- Városi forgalomban a fékezési energia jelentős része visszanyerhető, ezért a villanyautó városban gyakran takarékosabb, mint autópályán.\n- Sok autóban beállítható erős rekuperáció: ez az **egypedálos vezetés**, amikor a gázpedál felengedése szinte megállásig lassít.\n- Teljesen feltöltött vagy nagyon hideg akkumulátornál a rekuperáció korlátozott, mert a BMS nem enged nagy töltőáramot.\n\nA hagyományos súrlódásos fék is megvan, de jóval kevesebbet dolgozik. Emiatt a féktárcsák hajlamosak rozsdásodni, ezért időnként érdemes erősebben is fékezni.',
          tip: 'A motor teljesítménye is P = U · I: 400 V-on 250 A áram 100 kW teljesítményt jelent. 800 V-on ugyanehhez feleakkora áram is elég, ezért vékonyabb kábel kell, és kisebb a veszteség.'
        }
      ],
      quiz: [
        { q: 'Mi határozza meg a villanymotor fordulatszámát?', options: ['Az inverter kimenő áramának frekvenciája', 'Az akkumulátor színe', 'A reduktor olajszintje', 'A 12 V-os akku feszültsége'], answer: 0, explain: 'A forgó mágneses tér a frekvenciával arányos sebességgel forog.' },
        { q: 'Mi a rekuperáció?', options: ['Fékezéskor a motor generátorként visszatölti az akkut', 'A töltőállomás gyorstöltése', 'Az akkumulátor cseréje', 'A kerekek kiegyensúlyozása'], answer: 0, explain: 'A mozgási energia egy része így nem hővé alakul a fékben, hanem az akkuba kerül vissza.' },
        { q: 'Mi van az állandó mágneses szinkronmotor forgórészében?', options: ['Erős állandó mágnesek', 'Gyújtógyertyák', 'Dugattyúk', 'Semmi, üreges'], answer: 0, explain: 'Az indukciós motorban nincs mágnes, a szinkronmotorban igen (általában neodímium).' },
        { q: 'Miért korlátozott a rekuperáció teli akkunál?', options: ['Mert a BMS nem enged több töltést a teli akkuba', 'Mert a motor ilyenkor nem forog', 'Mert a fék ilyenkor nem működik', 'Mert az inverter kikapcsol'], answer: 0, explain: 'A túltöltés károsítaná a cellákat, ezért a BMS korlátozza a visszatöltést.' }
      ]
    },
    {
      id: 'toltes',
      title: 'Töltés: AC, DC, Type 2, CCS',
      level: 3, minutes: 14,
      summary: 'Mi a különbség a kW és a kWh között, mennyi ideig tart a töltés, és melyik csatlakozó mire való.',
      tags: ['töltés', 'AC töltés', 'DC gyorstöltés', 'Type 2', 'CCS', 'CCS2', 'CHAdeMO', 'wallbox', 'fali töltő', 'kW', 'kWh', 'töltési görbe', 'fedélzeti töltő', 'Mode 2', 'Mode 3'],
      sections: [
        {
          title: 'kW vagy kWh?',
          text: 'Ezt a kettőt sokan összekeverik, pedig egyszerű:\n\n- A **kWh (kilowattóra)** az **energia**: mennyi „fér” az akkumulátorba. Olyan, mint a tank mérete literben.\n- A **kW (kilowatt)** a **teljesítmény**: milyen gyorsan áramlik az energia. Olyan, mint a tankolópisztoly sebessége liter/percben.\n\nA töltési idő durván: `idő (h) = energia (kWh) / teljesítmény (kW)`.\n\nPélda: egy 60 kWh-s akkut 10%-ról 80%-ra töltünk, ez `0,7 · 60 = 42 kWh`. Egy 11 kW-os fali töltővel kb. `42 / 11 ≈ 3,8 óra`, a veszteségek miatt inkább kb. 4–4,5 óra.'
        },
        {
          title: 'AC töltés: lassú, de kíméletes',
          text: '**Váltakozó árammal (AC)** töltéskor a hálózati áramot az autóban lévő **fedélzeti töltő (OBC)** alakítja egyenárammá. A töltési teljesítményt ezért az OBC is korlátozza (tipikusan 7,4 vagy 11 kW).\n\n- **Egyfázisú** 230 V, 16 A: `230 · 16 ≈ 3,7 kW`; 32 A-rel kb. 7,4 kW.\n- **Háromfázisú** 400 V, 16 A: kb. **11 kW**; 32 A-rel kb. **22 kW**.\n\nAz európai szabványos AC csatlakozó a **Type 2** (Mennekes) dugó. Otthon egy villanyszerelő által telepített **fali töltő (wallbox)** a legjobb megoldás (Mode 3). Végszükség esetén a háztartási konnektorról töltő kábel (Mode 2) is használható, de csak kisebb árammal.',
          warn: 'Villanyautót soha ne tölts hosszabbítóról, elosztóról vagy kábeldobról! Órákon át nagy áram folyik, a gyenge érintkezés felmelegszik, és tüzet okozhat. A fali töltő bekötését (saját áramkör, megfelelő kismegszakító és FI relé) csak villanyszerelő végezheti.'
        },
        {
          title: 'DC gyorstöltés',
          text: 'A **DC gyorstöltőben** maga a töltőoszlop alakítja át az áramot egyenárammá, és közvetlenül az akkumulátorba vezeti, megkerülve a fedélzeti töltőt. Így **50–350 kW** teljesítmény is elérhető.\n\n- Európában a szabványos DC csatlakozó a **CCS2** (Combo 2): a Type 2 dugó alá két vastag DC érintkezőt építettek.\n- A régebbi, főleg japán autókon **CHAdeMO** csatlakozó is előfordul.\n\nA töltőoszlop és az autó BMS-e folyamatosan kommunikál: a BMS mondja meg, mekkora áramot fogad el az akku. A töltési **görbe** ezért nem egyenletes: kb. **10–80%** között gyors, efölött a BMS erősen visszaveszi a teljesítményt, hogy kímélje a cellákat. Ezért gyorstöltőn általában 80%-ig érdemes tölteni.',
          tip: 'A 800 V-os autók azonos áramerősség mellett kétszer akkora teljesítménnyel tölthetnek (P = U · I), ezért ők érik el a legrövidebb, kb. 20 perc alatti 10–80%-os töltési időket.'
        },
        {
          title: 'Számolj!',
          text: 'Az akku feszültsége és a töltőáram szorzata adja a töltési teljesítményt. Állítsd be az ellenállást úgy, hogy az áram 100 A körül legyen 400 V-on: hány kW-tal tölt így a rendszer? (Itt az ellenállás csak egy modell, ami az akkumulátor „terhelését” jelképezi.)',
          widget: { type: 'ohm', options: { maxU: 800, u: 400, maxR: 100, r: 4, help: 'Gondolj a fogyasztóra úgy, mint a töltődő akkumulátorra. Figyeld a **teljesítményt** (P = U · I): ezer wattonként 1 kW.' } }
        }
      ],
      quiz: [
        { q: 'Mit mér a kWh?', options: ['Energiát (mennyi fér az akkuba)', 'Teljesítményt (milyen gyors a töltés)', 'Feszültséget', 'Áramerősséget'], answer: 0, explain: 'A kWh energia, a kW teljesítmény.' },
        { q: 'Kb. mennyi ideig tart 44 kWh betöltése egy 11 kW-os fali töltővel (veszteségek nélkül)?', options: ['4 óra', '44 óra', '11 óra', '30 perc'], answer: 0, explain: 'idő = 44 kWh / 11 kW = 4 h.' },
        { q: 'Melyik az európai szabványos DC gyorstöltő csatlakozó?', options: ['CCS2 (Combo 2)', 'Type 1', 'Schuko', 'USB-C'], answer: 0, explain: 'A CCS2 a Type 2 AC dugó kiegészítése két DC érintkezővel.' },
        { q: 'Miért lassul le a gyorstöltés 80% felett?', options: ['A BMS csökkenti a teljesítményt a cellák kímélése érdekében', 'Mert elfogy a töltőoszlop árama', 'Mert a kábel kihűl', 'Mert a fedélzeti töltő túlmelegszik'], answer: 0, explain: 'Majdnem teli akkuba a cellák károsodása nélkül csak kisebb árammal lehet tölteni.' },
        { q: 'Mi korlátozza az AC töltés teljesítményét?', options: ['Az autó fedélzeti töltője (OBC) és a hálózati csatlakozás', 'Csak a kábel színe', 'A DC/DC átalakító', 'A gumik nyomása'], answer: 0, explain: 'AC töltéskor az autó saját OBC-je alakít egyenárammá, ezért az ő teljesítménye a határ.' }
      ]
    }
  ]
});
