/* Tantárgy: Napelemes rendszerek */
STUDIE.addSubject({
  id: 'napelem',
  stage: 'szakma',
  title: 'Napelemes rendszerek',
  icon: '☀️',
  color: '#f5a524',
  description: 'Fotovillamos hatás, inverter, tervezés, DC-oldali védelem és biztonságos szerelés: a háztartási napelemes rendszer a gyakorlatban.',
  intro: 'Ez a tananyag a napelemes rendszerek **működését, tervezését és biztonságos szerelését** tanítja meg. A napelem minden fényben feszültséget termel, egy string akár **600–1000 V egyenfeszültségű** is lehet, ez életveszélyes. A villamos bekötést, a hálózatra kapcsolást és a 230/400 V-os munkát csak képzett, jogosultsággal rendelkező villanyszerelő végezheti, a tetőn pedig csak leesés elleni védelemmel szabad dolgozni.',
  lessons: [
    {
      id: 'mukodes',
      title: 'Hogyan működik a napelem?',
      level: 1, minutes: 10,
      summary: 'A fotovillamos hatás, a cella–modul–string felépítés és a Wp jelentése.',
      tags: ['fotovillamos hatás', 'napelem', 'cella', 'modul', 'string', 'Wp', 'STC', 'hatásfok', 'hőmérsékleti együttható'],
      models: ['napelempanel'],
      sections: [
        {
          title: 'Fényből áram: a fotovillamos hatás',
          text: 'A napelem cellája **szilíciumból** készül, két, eltérően szennyezett (adalékolt) rétegből: egy **n-típusú** és egy **p-típusú** rétegből. A kettő határán, a **p–n átmenetben** beépített elektromos tér alakul ki.\n\nHa egy foton (fényrészecske) elnyelődik a szilíciumban, kiszakít egy elektront a helyéről. A beépített tér az elektronokat az egyik, a hátrahagyott „lyukakat” a másik oldal felé tereli. Így a cella két oldala között **egyenfeszültség** jön létre, és ha zárt áramkört kötünk rá, **egyenáram (DC)** folyik.\n\nEz a **fotovillamos (fotovoltaikus, PV) hatás**. Nincs benne mozgó alkatrész, nem melegít, nem éget: a fény energiáját közvetlenül alakítja villamos energiává.',
          tip: 'A napelem és a napkollektor nem ugyanaz! A **napelem** áramot termel, a **napkollektor** vizet melegít.'
        },
        {
          title: 'Cella, modul, string',
          text: 'Egy szilíciumcella feszültsége csak kb. **0,5–0,7 V**, akárhogy is süt a nap. Ezért sok cellát kötnek össze:\n\n- **Cella**: egy szilíciumlapka, kb. 0,6 V. Az árama a megvilágítással és a cella méretével arányos.\n- **Modul (panel)**: sok sorba kötött cella egy keretben, üveg alatt. Egy mai, 108 félcellás modul kb. **400–430 Wp**-os, üresjárati feszültsége kb. **37–38 V**, rövidzárási árama kb. **13–14 A**.\n- **String (füzér)**: sorba kötött modulok sora. Sorba kötve a **feszültségek összeadódnak**, az áram ugyanannyi marad. Tíz modul kb. 375 V-ot ad.\n- **Napelemmező**: egy vagy több, párhuzamosan kötött string. Párhuzamos kötésnél az **áramok** adódnak össze.\n\nA modulban **bypass (megkerülő) diódák** is vannak: ha egy cellasort árnyék ér, a dióda áthidalja, így nem húzza le az egész modult, és a cella sem melegszik túl.',
          widget: { type: 'soros-parhuzamos' }
        },
        {
          title: 'Mit jelent a Wp?',
          text: 'A modulok teljesítményét **Wp-ben (watt peak, csúcswatt)** adják meg. Ez a **szabványos vizsgálati feltételek (STC)** mellett mért teljesítmény:\n\n- **1000 W/m²** besugárzás,\n- **25 °C** cellahőmérséklet,\n- AM 1,5 fényspektrum.\n\nA valóságban ritkán vannak pont ezek a feltételek, ezért egy 410 Wp-os modul a tetőn legtöbbször kevesebbet ad. A rendszer méretét **kWp-ben** adjuk meg: 10 db 410 Wp-os modul = `10 · 410 = 4100 Wp = 4,1 kWp`.\n\n**Hatásfok:** egy 410 Wp-os, kb. 1,94 m²-es modul hatásfoka `410 / (1000 · 1,94) ≈ 0,21`, azaz kb. **21%**. A beeső napfény ötödéből lesz áram.',
          tip: 'Ökölszabály: 1 kWp-hez kb. **5 m²** tetőfelület kell.'
        },
        {
          title: 'A hőség a napelem ellensége',
          text: 'A napelem a **hidegben és erős fényben** termel a legjobban. Melegben csökken a feszültsége, így a teljesítménye is. A modul adatlapján ezt a **hőmérsékleti együttható** mutatja, pl. `−0,35 %/°C` (a teljesítményre).\n\nPélda: nyári délben a cella akár **65 °C**-os. Ez 40 °C-kal több az STC 25 °C-jánál, így a veszteség `40 · 0,35 = 14%`. A 410 Wp-os modul így kb. `410 · 0,86 ≈ 353 W`-ot ad.\n\nEzért fontos, hogy a modulok alatt **szellőzzön a levegő**. Fordítva is igaz: hideg, napos téli reggelen a feszültség az STC-értéknél **magasabb**. Ez a [[#/lecke/napelem/bekotes|bekötésnél]] lesz nagyon fontos.',
          warn: 'A napelem minden fényben feszültséget termel, borús időben is, és **nem lehet kikapcsolni**. Egy modul csatlakozóját soha ne bontsd terhelés alatt, egy string feszültsége pedig életveszélyes.'
        }
      ],
      quiz: [
        { q: 'Kb. mekkora egy szilícium napelemcella feszültsége?', options: ['0,5–0,7 V', '12 V', '230 V', '37 V'], answer: 0, explain: 'Egy cella csak kb. 0,6 V-ot ad, ezért kötnek sok cellát sorba egy modulban.' },
        { q: 'Mi történik a feszültséggel, ha 10 db 37,5 V-os modult sorba kötsz?', options: ['375 V lesz', '37,5 V marad', '3,75 V lesz', '750 V lesz'], answer: 0, explain: 'Soros kötésnél a feszültségek összeadódnak: 10 · 37,5 = 375 V.' },
        { q: 'Mit jelent a Wp?', options: ['A szabványos vizsgálati feltételek (STC) melletti csúcsteljesítményt', 'Az éves termelést wattórában', 'A modul tömegét', 'A modul feszültségét'], answer: 0, explain: '1000 W/m² besugárzás, 25 °C cellahőmérséklet mellett mért teljesítmény.' },
        { q: 'Mikor termel jobban ugyanaz a napelem, azonos besugárzásnál?', options: ['Hidegben', 'Kánikulában', 'Nincs különbség', 'Éjszaka'], answer: 0, explain: 'A hőmérséklet emelkedésével csökken a cella feszültsége és teljesítménye.' }
      ]
    },
    {
      id: 'rendszerek',
      title: 'Rendszertípusok és az inverter',
      level: 1, minutes: 11,
      summary: 'Hálózatra tápláló, szigetüzemű és hibrid rendszer; az inverter, az MPPT és az akkumulátoros tárolás.',
      tags: ['hálózatra tápláló', 'on-grid', 'szigetüzem', 'off-grid', 'hibrid inverter', 'MPPT', 'akkumulátor', 'HMKE', 'mikroinverter', 'optimalizáló'],
      models: ['napelempanel', 'akkucella'],
      sections: [
        {
          title: 'Mit csinál az inverter?',
          text: 'A napelem **egyenáramot (DC)** termel, a háztartás viszont **230/400 V-os, 50 Hz-es váltakozó áramot (AC)** használ. Az **inverter (váltóirányító)** alakítja át az egyenáramot a hálózattal szinkronban lévő váltakozó árammá.\n\nEzen felül az inverter:\n\n- **MPPT-vel** (maximális munkapont-követés) mindig kikeresi azt a feszültséget, amelyen a string a legtöbb teljesítményt adja,\n- figyeli a hálózat feszültségét és frekvenciáját, és **hiba esetén lekapcsol**,\n- méri a DC oldal szigetelési ellenállását,\n- rögzíti és (WiFi-n, applikáción) mutatja a termelést.',
          tip: 'Egy inverterben lehet több MPPT bemenet is. Ha a tető két oldalára (pl. keletre és nyugatra) kerülnek modulok, azokat **külön MPPT-re** kell kötni, mert eltérő a munkapontjuk.'
        },
        {
          title: 'Az MPPT: a legjobb munkapont',
          text: 'A napelem árama és feszültsége nem független egymástól. Rövidzárban nagy az áram, de nulla a feszültség; üresjárásban nagy a feszültség, de nincs áram. A kettő között van egy pont, ahol `P = U · I` a **legnagyobb**: ez a **maximális teljesítményű munkapont (MPP)**.\n\nPélda egy modulra: üresjárásban 37,5 V, rövidzárban 13,9 A, de a munkapontban kb. **31 V és 13,2 A**, ami `31 · 13,2 ≈ 409 W`.\n\nA munkapont a fénnyel és a hőmérséklettel folyamatosan vándorol, ezért az MPPT másodpercenként újra „tapogatja”, merre nagyobb a teljesítmény.'
        },
        {
          title: 'Hálózatra tápláló (on-grid) rendszer',
          text: 'A legelterjedtebb háztartási megoldás. Magyarországon ez a **háztartási méretű kiserőmű (HMKE)**, legfeljebb 50 kVA teljesítményig.\n\n- Ami áramot a ház éppen használ, azt közvetlenül a napelem adja.\n- A **többletet** a hálózatba táplálja; amikor nem süt a nap, a hálózatból vételez.\n- Kell hozzá az **elosztói engedély** (az áramszolgáltatóval egyeztetett terv) és **kétirányú (ad-vesz) mérő**.\n\n**Fontos:** áramszünetkor a hálózatra tápláló inverter **azonnal lekapcsol** (szigetüzem elleni védelem). Így nem kerül feszültség a hálózatra, amin éppen szerelők dolgozhatnak. Emiatt egy sima on-grid rendszer áramszünetben **nem** adja az áramot a háznak, akkor sem, ha süt a nap.',
          warn: 'Inverter vagy aggregát nem köthető „ügyesen” a ház hálózatára engedély és jogosultság nélkül. A visszatáplálás a hálózaton dolgozó szerelőt is megölheti.'
        },
        {
          title: 'Szigetüzemű (off-grid) és hibrid rendszer',
          text: '**Szigetüzemű rendszer**: nincs hálózati csatlakozás (pl. tanya, hétvégi ház, kerti lak). A megtermelt energiát **akkumulátor** tárolja, a fogyasztást pontosan a termeléshez és a tároláshoz kell méretezni. Télen, borús napokon kevés lehet az energia.\n\n**Hibrid rendszer**: hálózatra kapcsolt, de **akkumulátora is van**, és hibrid invertere. Napközben tölti az akkut, este abból fogyaszt, a maradékot a hálózat adja. Megfelelő kiépítéssel (backup, tartalék kimenet) áramszünetben is ellátja a fontos fogyasztókat.\n\n**Akkumulátorok:** ma jellemzően **LiFePO₄ (LFP)** cellás, hosszú élettartamú (több ezer ciklus) akkuk. Egy 10 kWh-s akku, 90%-os kisütési mélységgel (DoD) `10 · 0,9 = 9 kWh` hasznos energiát ad. A cellákról többet az [[akkucella|akkucella felfedezőben]] találsz.',
          tip: 'Akkut ott érdemes venni, ahol sok áramot használsz este, éjjel, vagy ahol a betáplált áramért kevés pénzt kapsz. A sajátfogyasztás növelése sokszor jobban megéri, mint a betáplálás.'
        },
        {
          title: 'String inverter, mikroinverter, optimalizáló',
          text: '- **String inverter**: egy központi inverter, amire a stringek csatlakoznak. Olcsó, jól bevált, de egy árnyékos modul az egész string munkapontját ronthatja.\n- **Optimalizáló**: minden modul mögé kerülő kis DC/DC átalakító; modulonként követi a munkapontot, és modulszintű felügyeletet ad.\n- **Mikroinverter**: minden modul (vagy modulpár) mögött saját inverter, a tetőn már csak AC vezeték fut. Árnyékos, tagolt tetőn előnyös, de drágább.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a fogalmakat!', count: 6, pairs: [
            ['Inverter', 'DC-ből hálózati AC-t készít'],
            ['MPPT', 'A legnagyobb teljesítményű munkapontot követi'],
            ['On-grid rendszer', 'A többletet a hálózatba táplálja'],
            ['Off-grid rendszer', 'Nincs hálózati csatlakozás, akkuról üzemel'],
            ['Hibrid inverter', 'Napelemet, akkut és hálózatot kezel egyszerre'],
            ['Mikroinverter', 'Minden modul mögött saját inverter'],
            ['Kétirányú mérő', 'Külön méri a vételezést és a betáplálást'],
            ['Bypass dióda', 'Áthidalja az árnyékolt cellasort']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mit csinál a hálózatra tápláló inverter áramszünetkor?', options: ['Azonnal lekapcsol', 'Tovább táplálja a hálózatot', 'Akkuról üzemel tovább', 'Megnöveli a feszültséget'], answer: 0, explain: 'A szigetüzem elleni védelem miatt lekapcsol, hogy ne kerüljön feszültség a hálózatra.' },
        { q: 'Mire szolgál az MPPT?', options: ['A maximális teljesítményű munkapont követésére', 'A villámvédelemre', 'Az akkumulátor hűtésére', 'A modulok tisztítására'], answer: 0, explain: 'Folyamatosan megkeresi azt a feszültséget, ahol U · I a legnagyobb.' },
        { q: 'Hány kWh hasznos energiát ad egy 10 kWh-s akku 90%-os kisütési mélységnél?', options: ['9 kWh', '10 kWh', '1 kWh', '11 kWh'], answer: 0, explain: '10 · 0,9 = 9 kWh.' }
      ]
    },
    {
      id: 'tervezes',
      title: 'Tervezés: tájolás, hozam, megtérülés',
      level: 2, minutes: 13,
      summary: 'Merre és milyen szögben álljon a modul, mennyit termel Magyarországon, és mikor térül meg.',
      tags: ['tájolás', 'dőlésszög', 'árnyékolás', 'éves hozam', 'kWh/kWp', 'megtérülés', 'sajátfogyasztás', 'méretezés'],
      sections: [
        {
          title: 'Tájolás és dőlésszög',
          text: 'Magyarországon (északi szélesség kb. 46–48°) az éves termelés szempontjából a legjobb:\n\n- **tájolás: dél** (azimut 0°, vagy a délre tájolt tetőn 180°, a jelölési szokástól függően),\n- **dőlésszög: kb. 30–35°**.\n\nAz eltérés nem végzetes. Tájékoztató értékek a legjobb elhelyezéshez képest:\n\n- délkelet vagy délnyugat, 30°: kb. **95%**\n- kelet vagy nyugat, 30°: kb. **80–85%**\n- vízszintes (0°): kb. **85–90%**, de a modulokon jobban megül a kosz\n- függőleges, déli homlokzat: kb. **70%**\n\nA **kelet–nyugati** elrendezés évente kicsit kevesebbet termel, de egyenletesebben, reggel és délután is. Ez a sajátfogyasztásnak kedvez.',
          tip: 'Lapostetőn a modulokat sorokba állítják. A sorok közt hagyni kell annyi helyet, hogy télen, alacsony napállásnál se árnyékolják egymást.'
        },
        {
          title: 'Az árnyék: kis folt, nagy veszteség',
          text: 'Egy sorba kötött stringben az áramot a **leggyengébb** modul (cellasor) szabja meg. Egy kémény, antenna, fa, vagy akár egy szellőzőcső árnyéka is aránytalanul nagy veszteséget okozhat.\n\nAmit tehetsz:\n\n- tervezés előtt nézd végig az árnyékokat **reggeltől estig, télen és nyáron** (a téli nap alacsonyan jár, hosszú az árnyék),\n- az árnyékos modulokat tedd **külön stringre vagy MPPT-re**,\n- tagolt tetőn használj **optimalizálót vagy mikroinvertert**,\n- figyelj a fák növekedésére is: ami ma alacsony, 10 év múlva árnyékolhat.'
        },
        {
          title: 'Mennyit termel? Az éves hozam',
          text: 'Magyarországon egy jól tájolt, árnyékmentes rendszer évente kb. **1100–1300 kWh-t termel minden kWp után**. Ezt nevezzük **fajlagos hozamnak** (kWh/kWp).\n\n`Éves termelés ≈ teljesítmény (kWp) · fajlagos hozam (kWh/kWp)`\n\nPélda: egy 4 kWp-os rendszer, 1200 kWh/kWp-vel számolva: `4 · 1200 = 4800 kWh/év`.\n\nA termelés évszakosan nagyon eltér: júniusban akár ötször-hatszor annyi, mint decemberben. Méretezéskor ezért **éves** fogyasztással számolunk, nem havival.\n\n**Méretezés fordítva:** ha egy család évente 3600 kWh-t fogyaszt, akkor `3600 / 1200 = 3 kWp` rendszer termeli meg nagyjából az éves igényét.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás (veszteségek, sajátfogyasztás)', help: 'A napelemes számításoknál sokszor kell százalékot számolni: pl. 4800 kWh 40%-a a sajátfogyasztás. Gyakorold!' } }
        },
        {
          title: 'Megtérülés',
          text: 'A legegyszerűbb számítás az **egyszerű megtérülési idő**:\n\n`Megtérülés (év) = beruházási költség / éves megtakarítás`\n\nPélda (kitalált, kerek számokkal, a valós árak változnak):\n\n1. A 4 kWp-os rendszer ára: **2 000 000 Ft**.\n2. Éves termelés: `4 · 1200 = 4800 kWh`.\n3. Tegyük fel, hogy egy megtermelt kWh átlagosan **50 Ft**-ot ér (ennyivel kevesebbet fizetsz, vagy ennyit kapsz érte).\n4. Éves megtakarítás: `4800 · 50 = 240 000 Ft`.\n5. Megtérülés: `2 000 000 / 240 000 ≈ 8,3 év`.\n\nA valóságban figyelembe kell venni:\n\n- az **elszámolás módját**: az új rendszereknél ma jellemzően a **bruttó elszámolás**, ahol a betáplált áramért kevesebbet kapsz, mint amennyit a vásárolt áramért fizetsz; ezért a **sajátfogyasztás aránya** nagyon számít,\n- a modulok **öregedését** (kb. 0,4–0,5% teljesítménycsökkenés évente),\n- az inverter cseréjét (élettartama jellemzően 10–15 év),\n- a támogatásokat és az áramárak változását.',
          tip: 'A modulok gyártói teljesítménygaranciája jellemzően 25–30 év, a végén még kb. 85–88%-os teljesítménnyel. Egy jól megtervezett rendszer így a megtérülés után még sok évig termel.'
        }
      ],
      quiz: [
        { q: 'Kb. mennyit termel évente Magyarországon 1 kWp jól tájolt napelem?', options: ['1100–1300 kWh', '100–130 kWh', '11 000–13 000 kWh', '500 kWh'], answer: 0, explain: 'A fajlagos hozam hazánkban kb. 1100–1300 kWh/kWp évente.' },
        { q: 'Mennyi egy 5 kWp-os rendszer éves termelése 1200 kWh/kWp hozammal?', options: ['6000 kWh', '1200 kWh', '600 kWh', '240 kWh'], answer: 0, explain: '5 · 1200 = 6000 kWh/év.' },
        { q: 'Mi a legjobb tájolás és dőlésszög Magyarországon az éves hozamhoz?', options: ['Dél, kb. 30–35°', 'Észak, 60°', 'Kelet, 0°', 'Nyugat, 90°'], answer: 0, explain: 'Déli tájolás, 30–35° körüli dőlésszög adja a legtöbb éves energiát.' },
        { q: 'Hány év a megtérülés, ha a rendszer 3 000 000 Ft, és évente 300 000 Ft-ot spórol?', options: ['10 év', '3 év', '30 év', '1 év'], answer: 0, explain: '3 000 000 / 300 000 = 10 év.' }
      ]
    },
    {
      id: 'bekotes',
      title: 'Villamos bekötés és védelem',
      level: 3, minutes: 14,
      summary: 'Miért veszélyes a DC oldal, mire való a DC kapcsoló és a túlfeszültség-védelem, és miért kell a stringfeszültséget hidegre méretezni.',
      tags: ['DC oldal', 'ív', 'DC szakaszoló', 'túlfeszültség-védelem', 'SPD', 'MC4', 'szolárkábel', 'stringfeszültség', 'hidegfeszültség', 'potenciálkiegyenlítés'],
      models: ['napelempanel', 'elosztoszekreny'],
      sections: [
        {
          title: 'Miért veszélyesebb a DC oldal?',
          text: 'A napelemes rendszernek két oldala van: a **DC oldal** (modulok, stringek, az inverter bemenete) és az **AC oldal** (az inverter kimenete, a ház hálózata).\n\nA DC oldal különösen alattomos:\n\n- **Nem lehet lekapcsolni.** Amíg fény éri a modulokat, feszültség van rajtuk. A kismegszakító vagy a főkapcsoló lekapcsolása ezen nem segít.\n- **Magas a feszültség.** Egy string 400–1000 V egyenfeszültségű is lehet.\n- **Az egyenáramú ív nem alszik ki magától.** A váltakozó áram 50 Hz-en másodpercenként 100-szor átmegy nullán, így a kialakuló ív gyakran magától kialszik. Az egyenáram nem megy át nullán: egy laza csatlakozónál vagy terhelés alatt bontott dugónál kialakuló **ív tartósan éghet**, több ezer fokos, és tüzet okozhat.',
          warn: 'MC4 (napelemes) csatlakozót **soha ne bonts terhelés alatt**! Előbb az inverter AC oldalát, majd a DC szakaszolót kell lekapcsolni. A DC oldalon csak erre kiképzett, jogosult szakember dolgozhat.'
        },
        {
          title: 'A DC oldal elemei',
          text: '- **Szolárkábel**: kettős szigetelésű, UV- és időjárásálló, finomerű rézkábel, jellemzően **4 vagy 6 mm²** (pl. H1Z2Z2-K jelű). Közönséges épületvezeték erre nem jó.\n- **MC4 (és kompatibilis) csatlakozók**: csak **azonos gyártmányú**, összeillő párokat szabad összedugni, gyári krimpelő szerszámmal szerelve. A „majdnem passzoló” idegen csatlakozó a tetőtüzek gyakori oka.\n- **DC szakaszoló (DC kapcsoló)**: **egyenáramra** és a string feszültségére méretezett kapcsoló, amely terhelés alatt is biztonságosan bontja az ívet. Sok inverterbe be van építve.\n- **Stringbiztosíték**: akkor kell, ha **három vagy több** string kapcsolódik párhuzamosan, mert hiba esetén a többi string árama visszafolyhatna egy zárlatos stringbe.\n- **Túlfeszültség-védelem (SPD)** a DC és az AC oldalon is.',
          tip: 'Kábelezéskor a plusz és mínusz vezetéket egymás mellett vezesd, ne nagy hurokban. A nagy, nyitott hurokban egy közeli villám nagy feszültséget indukálhat.'
        },
        {
          title: 'Stringfeszültség hidegben',
          text: 'Hidegben a modulok feszültsége **nő**. Az adatlap üresjárati feszültségre vonatkozó hőmérsékleti együtthatója pl. `−0,28 %/°C`. Ez azt jelenti, hogy minden fokkal, amennyivel 25 °C alá hűl a cella, a feszültség 0,28%-kal nő.\n\n**Példa:** a modul STC üresjárati feszültsége 37,5 V. Hány modul köthető sorba egy **1000 V** maximális bemeneti feszültségű inverterre, ha a tervezési minimum **−20 °C**?\n\n1. Hőmérséklet-különbség: `25 − (−20) = 45 °C`\n2. Feszültségnövekedés: `45 · 0,28% = 12,6%`\n3. Egy modul hidegben: `37,5 · 1,126 ≈ 42,2 V`\n4. Legfeljebb: `1000 / 42,2 ≈ 23,7`, tehát **23 modul** (mindig lefelé kerekítünk!).\n\nHa ezt elszámolod, egy fagyos, napos téli reggelen a string feszültsége meghaladja az inverter határát, és **tönkreteheti** azt.',
          warn: 'A stringfeszültséget mindig a **leghidegebb** várható hőmérsékletre, az **üresjárati** feszültséggel kell ellenőrizni, nem a nyári munkaponti feszültséggel.'
        },
        {
          title: 'Védelmek, földelés, AC oldal',
          text: '- **Túlfeszültség-védelem:** a DC oldalra DC-re méretezett, jellemzően 2. típusú levezetők kellenek. Ha az épületnek van **külső villámvédelme**, akkor 1. típusú (villámáram-levezető) is szükséges lehet.\n- **Potenciálkiegyenlítés:** a modulkereteket és a tartószerkezetet összekötik a fő potenciálkiegyenlítő sínnel, hogy ne lehessen köztük veszélyes feszültség.\n- **AC oldal:** az inverter saját áramkörre, **saját kismegszakítóval** csatlakozik az [[elosztoszekreny|elosztószekrényhez]], a gyártó által előírt áram-védőkapcsolóval (FI relé). Háromfázisú inverternél mindhárom fázist védeni kell.\n- **Feszültségesés:** a DC kábeleken célszerű 1% alatt tartani. Például 25 m-es nyomvonalon, 13,2 A-rel és 4 mm²-rel: `ΔU = 2 · 25 · 13,2 · 0,0175 / 4 ≈ 2,9 V`, ami egy 375 V-os stringnél kb. **0,8%**.',
          widget: { type: 'feszultsegeses' }
        }
      ],
      quiz: [
        { q: 'Miért veszélyesebb az egyenáramú ív, mint a váltakozó áramú?', options: ['Mert nincs nullátmenet, ezért nem alszik ki magától', 'Mert kisebb a feszültsége', 'Mert csak éjjel keletkezik', 'Mert az egyenáram hideg'], answer: 0, explain: 'A váltakozó áram 50 Hz-en 100-szor megy át nullán másodpercenként, az egyenáram soha.' },
        { q: 'Hogyan változik a modul feszültsége hidegben?', options: ['Nő', 'Csökken', 'Nem változik', 'Nullára esik'], answer: 0, explain: 'Hidegben nő a cellák feszültsége, ezért a stringet a leghidegebb napra kell méretezni.' },
        { q: 'Mikor kell stringbiztosíték?', options: ['Ha három vagy több string kapcsolódik párhuzamosan', 'Mindig, minden modulhoz', 'Soha', 'Csak szigetüzemben'], answer: 0, explain: 'Három vagy több párhuzamos stringnél egy zárlatos stringbe a többi árama visszafolyhatna.' }
      ]
    },
    {
      id: 'szereles',
      title: 'Szerelés és munkavédelem',
      level: 2, minutes: 11,
      summary: 'Tetőn végzett munka, leesés elleni védelem, rögzítés, villám- és tűzvédelem.',
      tags: ['munkavédelem', 'tetőmunka', 'leesés elleni védelem', 'tartószerkezet', 'villámvédelem', 'tűzvédelem', 'tűzeseti lekapcsolás', 'szélteher'],
      sections: [
        {
          title: 'A legnagyobb veszély: a leesés',
          text: 'A napelemszerelésnél nem az áram, hanem a **leesés** okozza a legtöbb súlyos balesetet. A tető csúszós, a cserép eltörhet, a modul nagy és nehéz (kb. 20–25 kg, 2 m²), és szélben vitorlaként viselkedik.\n\nA védelem sorrendje:\n\n1. **Kollektív védelem**: állvány, korlát, védőháló a tető szélén. Ez az elsődleges.\n2. Ha ez nem oldható meg: **egyéni leesés elleni védőeszköz**: teljes testhevederzet, energiaelnyelős kötél, megbízható **kikötési pont** (pl. tetőbiztonsági horog, kötélpálya).\n3. **Biztonságos feljutás**: rögzített létra, ami a tetőszél fölé legalább 1 m-rel kinyúlik; a modulokat emelővel, csigával juttatják fel, nem kézben a létrán.\n\nKötelező a **védősisak**, a csúszásmentes cipő és a munkakesztyű. Egyedül soha nem dolgozunk a tetőn.',
          warn: 'Szélben, esőben, jeges vagy deres tetőn, zivatar közeledtekor **tilos** a tetőn dolgozni. Magasban csak egészségileg alkalmas, kioktatott dolgozó, előírásos védőfelszereléssel dolgozhat.'
        },
        {
          title: 'Tartószerkezet és rögzítés',
          text: '- **Cserepes tetőn** tetőkampók kerülnek a szarufákra (a cserép alá), erre jönnek az alumínium sínek, és erre a modulok. A cserepet a kampónál ki kell faragni, hogy ne terhelje a kampó.\n- **Trapézlemez tetőn** speciális rögzítők, tömítéssel.\n- **Lapostetőn** ballasztos (lesúlyozott) vagy rögzített állványzat; a vízszigetelést nem szabad megsérteni.\n\nA tervezésnél ellenőrizni kell a tető **teherbírását**, valamint a **szél- és hóterhelést**. A modulokat a gyártó által előírt **befogási zónákban** kell rögzíteni, mert máshol a keret meghajolhat, a cellák megrepedhetnek.',
          tip: 'Rálépni a modulra tilos! A szemmel láthatatlan **mikrorepedések** később forró pontokat (hot spot) és teljesítményvesztést okoznak.'
        },
        {
          title: 'Villámvédelem',
          text: 'Ha az épületnek **van külső villámvédelme** (felfogó, levezető), a napelemmezőnek a villámvédelmi zónán belül kell lennie, és a felfogóktól meg kell tartani az előírt **elválasztási (szigetelési) távolságot**. Ha ez nem tartható, a rendszert be kell vonni a villámvédelembe, ekkor villámáram-levezetők kellenek.\n\nHa **nincs** villámvédelem, a napelem felszerelése általában nem teszi kötelezővé, de a túlfeszültség-védelem és a potenciálkiegyenlítés ilyenkor is kell. Ezt a tervező dönti el, a szabványok és az előírások alapján.'
        },
        {
          title: 'Tűzvédelmi szempontok',
          text: 'Egy épülettűznél a tűzoltó nem kapcsolhatja le a modulokat, és a DC kábelekben a feszültség megmarad. Ezért a tűzvédelmi előírások (Magyarországon az OTSZ és a hozzá kapcsolódó irányelvek) szerint:\n\n- a DC kábeleket az épületen belül **a lehető legrövidebb úton**, védett nyomvonalon kell vezetni,\n- gyakran **tűzeseti lekapcsolás** kell, amely a DC kábeleket a modulok közelében feszültségmentesíti,\n- a rendszert **jelölni kell** (figyelmeztető táblák az elosztónál, a mérőnél, a bejáratnál), és a tűzoltóság számára **helyszínrajzot** kell készíteni,\n- a modulok közt és a tetőn **utat** kell hagyni a tűzoltók számára (tűzszakaszhatárnál, tűzfalnál előírt távolsággal).\n\nA tetőtüzek legtöbbször **rosszul szerelt csatlakozókból** vagy sérült kábelekből indulnak. A gondos, szakszerű szerelés a legjobb tűzvédelem.'
        }
      ],
      quiz: [
        { q: 'Mi okozza a legtöbb súlyos balesetet napelemszerelés közben?', options: ['A leesés', 'A napégés', 'Az inverter zaja', 'A modulok súlya a földön'], answer: 0, explain: 'A tetőn végzett munkánál a leesés a legnagyobb veszély.' },
        { q: 'Mi az elsődleges leesés elleni védelem?', options: ['Kollektív védelem (állvány, korlát, háló)', 'Csak a jó egyensúlyérzék', 'A gyors munka', 'Egy segítő a földön'], answer: 0, explain: 'A kollektív védelem mindenkit véd; egyéni hevederzet akkor kell, ha ez nem oldható meg.' },
        { q: 'Miért nem szabad a modulra lépni?', options: ['Mert mikrorepedéseket okozhat a cellákban', 'Mert áramütést okoz', 'Mert az üveg mindig betörik', 'Mert a garancia csak ezt nem fedezi'], answer: 0, explain: 'A láthatatlan mikrorepedések később forró pontokat és teljesítményvesztést okoznak.' }
      ]
    },
    {
      id: 'karbantartas',
      title: 'Karbantartás és hibakeresés',
      level: 2, minutes: 11,
      summary: 'Felügyelet, tisztítás, mérések, és a leggyakoribb hibák az inverter hibaüzenetétől a forró pontig.',
      tags: ['karbantartás', 'monitoring', 'tisztítás', 'hot spot', 'hőkamera', 'szigetelési ellenállás', 'hálózati túlfeszültség', 'degradáció', 'hibakód'],
      models: ['napelempanel'],
      sections: [
        {
          title: 'A legjobb karbantartás: figyeld a számokat',
          text: 'A napelemnek nincs mozgó alkatrésze, ezért kevés karbantartást igényel. A hibák viszont **csendben** jelentkeznek: a rendszer működik, csak kevesebbet termel. Ezért a legfontosabb a **felügyelet (monitoring)**:\n\n- nézd meg rendszeresen az inverter applikációjában a **napi és havi termelést**,\n- hasonlítsd össze az **előző év ugyanazon hónapjával**, és ha van, a **szomszéd rendszerével**,\n- több string esetén hasonlítsd össze a stringek **áramát**: azonos tájolásnál nagyjából egyformának kell lenniük.\n\nPélda: egy 4 kWp-os rendszer júliusban kb. 600 kWh-t szokott termelni, idén csak 450-et. Ez `150 / 600 = 25%` kiesés, amit érdemes kivizsgálni.'
        },
        {
          title: 'Tisztítás és szemrevételezés',
          text: 'A 15° feletti dőlésszögű modulokat az eső általában elég tisztán tartja. Tisztítani akkor érdemes, ha látható a szennyeződés (por, pollen, madárürülék, mezőgazdasági por).\n\n- **Puha kefével, lágy (vízkőmentes) vízzel**, vegyszer nélkül.\n- **Hűvösben**, reggel vagy este: a forró üvegre öntött hideg víz hősokkot okozhat.\n- **Ne** használj magasnyomású mosót, súrolószert, kemény kefét.\n- A tisztítás **tetőmunka**: csak leesés elleni védelemmel, vagy földről, hosszú nyelű eszközzel.\n\nSzemrevételezéskor keress: törött üveget, elszíneződött cellákat, „csigavonalas” mintát, lazán lógó kábeleket, sérült szigetelést, megolvadt csatlakozót, madárfészket a modulok alatt.'
        },
        {
          title: 'Mérések (szakembernek)',
          text: 'A szakember évente-kétévente, vagy hiba esetén méréssel ellenőrzi a rendszert:\n\n- **Üresjárati feszültség (U_{oc}) és rövidzárási áram (I_{sc})** stringenként, a várt értékhez és egymáshoz viszonyítva. Ha egy string feszültsége egy modulnyival kevesebb, valószínűleg egy modul vagy bypass dióda hibás.\n- **Szigetelési ellenállás** a DC oldalon, szigetelésvizsgálóval. A túl kicsi érték nedvességre, sérült kábelre, hibás csatlakozóra utal (az inverter ilyenkor „szigetelési hibát” jelez).\n- **I–U jelleggörbe-mérés** speciális műszerrel.\n- **Hőkamerás vizsgálat** napsütésben: a **forró pontok (hot spot)** megmutatják a hibás cellákat, csatlakozókat, bypass diódákat.',
          warn: 'DC méréseket csak DC-re és a string feszültségére minősített műszerrel (CAT III, 1000 V DC), erre kiképzett szakember végezhet. Rövidzárási áramot csak erre alkalmas műszerrel szabad mérni, soha nem egy dróttal „összeérintve”.'
        },
        {
          title: 'Gyakori hibák',
          text: '- **„Hálózati túlfeszültség” hibaüzenet, napközben leáll**: vidéken, nyári délben, amikor sok napelem táplál be, a hálózat feszültsége a megengedett 253 V (230 V + 10%) fölé emelkedhet. Az inverter ilyenkor előírásszerűen lekapcsol. Megoldás: az áramszolgáltató hálózatvizsgálata, és a ház bekötésének ellenőrzése (vékony, hosszú csatlakozóvezeték).\n- **Szigetelési hiba** (főleg reggel, párás időben): nedves vagy sérült DC kábel, csatlakozó.\n- **Egy string nem termel**: kioldott stringbiztosíték, kihúzódott csatlakozó, szakadt kábel.\n- **Lassan csökkenő termelés**: szennyeződés, új árnyék (megnőtt fa), modulöregedés, PID-jelenség.\n- **Az inverter nem kommunikál**: a WiFi-jelszó megváltozott, a router messze van. Ez nem termelési hiba!',
          tip: 'Mindig az inverter **hibakódjával** kezdd! A kézikönyv megmondja, mit jelent, és sokszor azt is, mit kell ellenőrizni.'
        }
      ],
      quiz: [
        { q: 'Mivel tisztítsd a napelemet?', options: ['Puha kefével és lágy vízzel, hűvösben', 'Magasnyomású mosóval', 'Súrolószerrel', 'Drótkefével'], answer: 0, explain: 'A magasnyomású mosó és a súrolás károsíthatja az üveg bevonatát és a tömítéseket.' },
        { q: 'Mit mutat meg a hőkamerás vizsgálat?', options: ['A forró pontokat (hibás cellák, csatlakozók)', 'A modulok tömegét', 'A tető dőlésszögét', 'Az áramárakat'], answer: 0, explain: 'A hibás cellák és rossz csatlakozások melegebbek a környezetüknél.' },
        { q: 'Miért kapcsolhat le az inverter nyári délben „hálózati túlfeszültség” hibával?', options: ['Mert a hálózat feszültsége a megengedett határ fölé emelkedett', 'Mert túl hideg van', 'Mert kevés a fény', 'Mert lemerült az akku'], answer: 0, explain: 'Sok betápláló inverter megemeli a helyi hálózat feszültségét; 253 V fölött az inverter lekapcsol.' }
      ]
    }
  ]
});

/* Hibakereső döntési fák (formátum: js/hibakereses.js fejléce) */
STUDIE.addTrouble({
  id: 'napelem-keves-termeles',
  title: 'Kevesebbet termel a napelem',
  lessons: ['napelem/karbantartas', 'napelem/tervezes'],
  intro: 'Haladj végig a kérdéseken: az egyszerű, otthon is ellenőrizhető okoktól a szakembert igénylő hibák felé. **A DC kábelekhez, csatlakozókhoz ne nyúlj**, és a tetőre ne mássz fel védőfelszerelés nélkül!',
  start: 'mihez',
  nodes: {
    mihez: { q: 'Mihez képest kevesebb a termelés?', check: 'Nézd meg az inverter applikációjában a havi termelést, és hasonlítsd össze az előző év ugyanazon hónapjával.', answers: [
      { t: 'Az előző év ugyanazon hónapjához képest jóval kevesebb', next: 'mennyi' },
      { t: 'Télen sokkal kevesebb, mint nyáron', next: 'r_evszak' },
      { t: 'A tervezett éves értékhez képest kevesebb (már az első évben)', next: 'r_tervezes' },
      { t: 'Hirtelen nullára esett', next: 'inverter' }] },
    mennyi: { q: 'Az időjárás (napos órák száma) hasonló volt, mint tavaly?', check: 'Hasonlítsd össze a szomszédok vagy ismerősök közeli rendszereinek termelésével, vagy nézd meg az időjárási archívumot.', answers: [
      { t: 'Nem, idén sokkal borúsabb volt', next: 'r_idojaras' },
      { t: 'Igen, hasonló volt', next: 'string' }] },
    string: { q: 'Több stringed van? Ha igen, egyformán termelnek?', check: 'Az inverter applikációjában vagy kijelzőjén nézd meg a stringek (PV1, PV2…) áramát és feszültségét délben, napos időben.', answers: [
      { t: 'Egy string jóval kevesebbet ad (vagy nullát)', next: 'stringhiba' },
      { t: 'Mindegyik egyformán kevesebbet ad, vagy csak egy stringem van', next: 'arnyek' }] },
    stringhiba: { q: 'Annak a stringnek a feszültsége is kisebb, vagy csak az árama?', answers: [
      { t: 'A feszültség nulla vagy nagyon kicsi', next: 'r_szakadas' },
      { t: 'A feszültség kb. egy modulnyival (30–40 V-tal) kisebb', next: 'r_modul' },
      { t: 'A feszültség rendben, csak az áram kisebb', next: 'arnyek' }] },
    arnyek: { q: 'Van új árnyék a modulokon (megnőtt fa, új épület, antenna), vagy látható szennyeződés?', check: 'Napos napon, reggeltől délutánig figyeld meg a földről, ér-e árnyék a modulokra. Nézd meg távcsővel a modulokat.', answers: [
      { t: 'Igen, árnyék esik rájuk', next: 'r_arnyek' },
      { t: 'Igen, poros, madárürülékes, mohás', next: 'r_kosz' },
      { t: 'Nincs se árnyék, se látható kosz', next: 'hibakod' }] },
    hibakod: { q: 'Mutat az inverter hibaüzenetet, vagy napközben időnként leáll?', check: 'Nézd meg az inverter eseménynaplóját (applikáció vagy kijelző).', answers: [
      { t: 'Igen, „hálózati túlfeszültség” (grid overvoltage) jellegű üzenet, főleg napos délben', next: 'r_halozat' },
      { t: 'Igen, szigetelési hiba (isolation fault, Riso)', next: 'r_szigeteles' },
      { t: 'Nincs hibaüzenet', next: 'r_modulok' }] },
    inverter: { q: 'Világít, működik az inverter kijelzője vagy jelzőfénye?', answers: [
      { t: 'Nem, teljesen sötét', next: 'r_ac' },
      { t: 'Igen, de hibát jelez', next: 'hibakod' },
      { t: 'Igen, működik, csak az applikáció nem mutat adatot', next: 'r_wifi' }] },
    r_evszak: { result: 'Ez normális: évszakos ingadozás', fix: 'Decemberben a napelem akár ötöd-hatodannyit termel, mint júniusban: rövidebbek a nappalok, alacsonyabban jár a nap, gyakoribb a köd és a hó. Az éves összeget érdemes figyelni, nem a téli hónapokat.', level: 'ok' },
    r_idojaras: { result: 'Valószínűleg az időjárás az oka', fix: 'Egy borús év akár 10–15%-kal kevesebb termelést is hozhat. Ha a szomszéd rendszerek is hasonlóan visszaestek, nincs hiba. Figyeld tovább a termelést.', level: 'ok' },
    r_tervezes: { result: 'Tervezési vagy méretezési eltérés', fix: 'Lehetséges okok:\n- a tervezett hozam túl optimista volt (rossz tájolás, dőlésszög)\n- nem vették figyelembe az árnyékot\n- az inverter túl kicsi, és délben levágja a csúcsot\n- az árnyékos modulok egy stringben vannak a jókkal\n\nKérd a telepítőtől a tervezési számítást, és hasonlítsd össze a valós adatokkal.', level: 'warn', pro: true },
    r_szakadas: { result: 'Szakadás a stringben: kihúzódott csatlakozó, szakadt kábel vagy kioldott stringbiztosíték', fix: 'Ez a DC oldal hibája, ahol akár több száz volt egyenfeszültség lehet, és a csatlakozó bontásakor ív keletkezhet. **Ne nyúlj hozzá!** Hívj napelemes szakembert, aki biztonságosan leválasztja és beméri a stringet.', level: 'bad', pro: true },
    r_modul: { result: 'Egy modul vagy bypass dióda hibás', fix: 'A string feszültségéből hiányzik egy modulnyi rész: egy modul nem működik, vagy zárlatos a bypass diódája. Szakember hőkamerával és stringmérésekkel megkeresi, majd garanciában cserélteti a modult.', level: 'warn', pro: true },
    r_arnyek: { result: 'Árnyékolás', fix: 'Egy sorba kötött stringben egy árnyékos modul a többit is lerontja. Megoldások:\n- a fa visszavágása (ha a tiéd)\n- az árnyékos modulok külön MPPT-re kötése\n- optimalizálók beépítése az érintett modulokra\n\nAz átkötést szakember végezze.', level: 'warn' },
    r_kosz: { result: 'Szennyeződés a modulokon', fix: 'Tisztítsd meg puha kefével és lágy vízzel, hűvösben, vegyszer és magasnyomású mosó nélkül. A tetőre csak leesés elleni védelemmel menj fel, vagy bízd tisztító cégre.', level: 'ok' },
    r_halozat: { result: 'A hálózat feszültsége túl magas, az inverter lekapcsol', fix: 'Az inverter előírásszerűen lekapcsol, ha a hálózati feszültség tartósan 253 V fölé emelkedik.\n- Jelezd az áramszolgáltatónak (elosztónak), kérj feszültségvizsgálatot.\n- Villanyszerelővel ellenőriztesd a ház csatlakozóvezetékét és a kötéseket (a vékony vagy laza bekötés is megemeli a feszültséget).\n\nAz inverter védelmi beállításait önhatalmúlag átállítani tilos.', level: 'warn', pro: true },
    r_szigeteles: { result: 'Szigetelési hiba a DC oldalon', fix: 'Valahol nedvesség jut a kábelezésbe, vagy sérült egy kábel, csatlakozó. Ez áramütés- és tűzveszélyes lehet. Szakember szigetelésvizsgálóval stringenként megkeresi a hibás részt.', level: 'bad', pro: true },
    r_modulok: { result: 'Lassú teljesítménycsökkenés (öregedés, PID, rejtett modulhiba)', fix: 'A modulok évente kb. 0,5%-ot öregszenek, ez normális. Ha a csökkenés ennél jóval nagyobb, szakember hőkamerás vizsgálattal és I–U görbe méréssel keresse meg a hibás modulokat (forró pontok, PID, mikrorepedések).', level: 'warn', pro: true },
    r_ac: { result: 'Az inverter nem kap hálózati feszültséget (AC oldal)', fix: 'Nézd meg az elosztószekrényben az inverter kismegszakítóját és áram-védőkapcsolóját (FI relé). Ha le van kapcsolva, egyszer visszakapcsolhatod. Ha újra lekapcsol, **ne próbálkozz tovább**: villanyszerelőt kell hívni.', level: 'warn' },
    r_wifi: { result: 'Csak a kommunikáció szakadt meg', fix: 'Az inverter valószínűleg rendesen termel, csak nem küld adatot. Nézd meg, nem változott-e a WiFi-jelszó, elég erős-e a jel az inverternél, és indítsd újra a routert. Az inverter kijelzőjén vagy a mérőn ellenőrizheted, hogy termel-e.', level: 'ok' }
  }
});

STUDIE.addTrouble({
  id: 'napelem-aramszunet',
  title: 'Áramszünetben nincs áram a házban, pedig süt a nap',
  lessons: ['napelem/rendszerek'],
  intro: 'Sokan meglepődnek, hogy a napelem áramszünetben nem adja az áramot. Nézzük meg, mi a helyzet nálad! **Az elosztószekrényben csak kapcsolókat kapcsolj, burkolatot ne szerelj le.**',
  start: 'tipus',
  nodes: {
    tipus: { q: 'Milyen rendszered van?', check: 'Nézd meg az inverter adattábláját vagy a telepítési dokumentációt: van-e akkumulátor, és „hybrid”, „backup”, „EPS” feliratú kimenet.', answers: [
      { t: 'Hálózatra tápláló (on-grid), akkumulátor nélkül', next: 'r_ongrid' },
      { t: 'Hibrid, akkumulátorral', next: 'backup' },
      { t: 'Nem tudom', next: 'r_dokumentacio' }] },
    backup: { q: 'Ki van építve a tartalék (backup/EPS) kimenet, és a fontos körök arra vannak kötve?', check: 'A telepítési dokumentációban, vagy az elosztószekrényben külön „tartalék” vagy „backup” feliratú kismegszakítók jelzik.', answers: [
      { t: 'Nincs ilyen kiépítés', next: 'r_nincsbackup' },
      { t: 'Van, mégsem kap áramot semmi', next: 'akku' }] },
    akku: { q: 'Mekkora az akkumulátor töltöttsége az applikáció szerint?', answers: [
      { t: 'Nagyon alacsony (a beállított tartalékszint alatt)', next: 'r_akku' },
      { t: 'Van benne bőven energia', next: 'r_eps' }] },
    r_ongrid: { result: 'Ez a helyes működés: a szigetüzem elleni védelem lekapcsolta az invertert', fix: 'A hálózatra tápláló inverter áramszünetkor előírásszerűen lekapcsol, hogy ne kerüljön feszültség a hálózatra, ahol szerelők dolgozhatnak. Ha áramszünetben is áramot szeretnél, **hibrid inverter, akkumulátor és tartalékkimenet** kell, amit szakember tervez meg és köt be.', level: 'ok' },
    r_dokumentacio: { result: 'Előbb derítsd ki a rendszer típusát', fix: 'Keresd elő a telepítési dokumentációt, vagy kérdezd meg a telepítőt. Ha nincs akkumulátor, a rendszer valószínűleg hálózatra tápláló, és áramszünetben előírásszerűen leáll.', level: 'ok' },
    r_nincsbackup: { result: 'Az akkumulátor van, de a tartalékkimenet nincs kiépítve', fix: 'Sok hibrid rendszert csak a sajátfogyasztás növelésére telepítenek, tartalékkimenet nélkül. Ilyenkor áramszünetben ez is leáll. A tartalékkör kiépítése villanyszerelői munka (átkapcsolás, a fontos körök szétválasztása).', level: 'warn', pro: true },
    r_akku: { result: 'Lemerült az akkumulátor a tartalékszintig', fix: 'Az inverter védi az akkut a mélykisüléstől. Ha süt a nap, a rendszer a napelemről újratöltheti, és újraindíthatja a tartalékkimenetet (a gyártótól függően). Állítsd be az applikációban magasabbra a tartalékszintet, ha gyakori az áramszünet.', level: 'ok' },
    r_eps: { result: 'A tartalékkimenet nem kapcsolt át vagy túlterhelődött', fix: 'Nézd meg az applikációban, be van-e kapcsolva a tartalék (EPS/backup) üzem, és nem jelez-e túlterhelést. Kapcsold le a nagy fogyasztókat (sütő, vízmelegítő), és indítsd újra a tartalékkimenetet a kézikönyv szerint. Ha így sem működik, hívd a telepítőt.', level: 'warn', pro: true }
  }
});
