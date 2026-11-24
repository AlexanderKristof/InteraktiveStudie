/* Tantárgy: Pénzügyi ismeretek */
STUDIE.addSubject({
  id: 'penzugy',
  stage: 'kozep',
  title: 'Pénzügyi ismeretek',
  icon: '💰',
  color: '#2f9e6a',
  description: 'Költségvetés, bankolás, kamat, hitel, megtakarítás és fizetés: a pénz, amivel nap mint nap dolgod lesz.',
  intro: 'A pénzügyi tudatosság nem a gazdagokról szól, hanem arról, hogy **te döntsd el, mire megy el a pénzed**, és ne a véletlen vagy egy rossz szerződés. Ebben a tantárgyban megtanulod beosztani a pénzed, biztonságosan bankolni, kiszámolni a kamatot, felismerni a veszélyes hitelt, és megérteni a fizetési papírodat.\n\nFontos: a számok (adókulcsok, kamatok, kedvezmények) időről időre változnak. Itt az elveket tanulod meg, a konkrét döntés előtt mindig nézz utána az aktuális szabályoknak és ajánlatoknak. Ez a tananyag **nem befektetési tanács**.',
  lessons: [
    {
      id: 'koltsegvetes',
      title: 'Költségvetés és pénzbeosztás',
      level: 1, minutes: 10,
      summary: 'Bevétel, kiadás, megtakarítás: hogyan készíts havi költségvetést, és mit jelent az 50/30/20 szabály.',
      tags: ['költségvetés', 'pénzbeosztás', 'bevétel', 'kiadás', 'megtakarítás', '50/30/20', 'vésztartalék', 'fix kiadás', 'változó kiadás'],
      sections: [
        {
          title: 'Bevétel és kiadás',
          text: 'A **költségvetés** egyszerű terv: mennyi pénz jön be, és mire megy el.\n\n- **Bevétel**: fizetés (nettó, vagyis amit ténylegesen megkapsz), zsebpénz, ösztöndíj, diákmunka, támogatások.\n- **Fix kiadás**: minden hónapban nagyjából ugyanannyi (lakbér, rezsi, bérlet, telefon-előfizetés, hiteltörlesztés).\n- **Változó kiadás**: hónapról hónapra más (élelmiszer, szórakozás, ruha, ajándék).\n\nA lényeg: `bevétel − kiadás = ami megmarad`. Ha ez tartósan negatív, abból adósság lesz.',
          tip: 'Egy hónapig írj fel minden kiadást, akár egy kávét is! A legtöbben meglepődnek, mennyi megy el apróságokra.'
        },
        {
          title: 'Az 50/30/20 szabály',
          text: 'Egy egyszerű kiindulópont a nettó jövedelem felosztására:\n\n- **50%: szükségletek** (lakhatás, rezsi, élelmiszer, közlekedés, törlesztés)\n- **30%: vágyak** (szórakozás, étterem, hobbi, utazás)\n- **20%: megtakarítás** (vésztartalék, célok, nyugdíjcélú megtakarítás)\n\nPélda: havi 300 000 Ft nettó jövedelemnél `50% = 150 000 Ft`, `30% = 90 000 Ft`, `20% = 60 000 Ft`.\n\nEz nem kőbe vésett szabály: ha drága a lakhatás, a szükségletek aránya nagyobb lehet. A cél az, hogy **tudatosan** dönts az arányokról.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás', help: 'A költségvetéshez folyton százalékot számolunk. Gyakorold!' } }
        },
        {
          title: 'Először fizesd ki magad!',
          text: 'A legtöbben azt takarítják meg, ami a hónap végén megmarad, vagyis többnyire semmit. Jobb módszer: fizetés után **azonnal** tedd félre a megtakarításra szánt összeget (akár automatikus átutalással egy külön számlára), és a maradékból gazdálkodj.\n\nAz első cél a **vésztartalék**: kb. **3–6 havi kiadásnyi** pénz, könnyen hozzáférhető helyen. Ez segít, ha elromlik a mosógép, vagy elveszted az állásod, és így nem kell drága hitelhez nyúlnod.'
        }
      ],
      quiz: [
        { q: 'Havi 240 000 Ft nettó jövedelemnél mennyi a megtakarításra szánt rész az 50/30/20 szabály szerint?', options: ['24 000 Ft', '48 000 Ft', '72 000 Ft', '120 000 Ft'], answer: 1, explain: '240 000 · 0,20 = 48 000 Ft.' },
        { q: 'Melyik fix kiadás?', options: ['Mozijegy', 'Havi bérlet', 'Ajándék', 'Étterem'], answer: 1, explain: 'A bérlet ára minden hónapban ugyanannyi.' },
        { q: 'Mekkora vésztartalékot javasolnak általában?', options: ['Egy heti költést', 'Kb. 3–6 havi kiadásnyi összeget', 'Egy évi fizetést', 'Nem kell vésztartalék'], answer: 1, explain: '3–6 havi kiadás általában elég egy váratlan helyzet áthidalására.' }
      ]
    },
    {
      id: 'bank',
      title: 'Bankszámla, kártya, utalás, biztonság',
      level: 1, minutes: 12,
      summary: 'Hogyan működik a bankszámla és a kártya, mi az azonnali utalás, és hogyan véded meg magad a csalóktól.',
      tags: ['bankszámla', 'bankkártya', 'betéti kártya', 'hitelkártya', 'átutalás', 'azonnali fizetés', 'IBAN', 'PIN', 'adathalászat', 'csalás', 'kétlépcsős azonosítás', 'számlavezetési díj'],
      sections: [
        {
          title: 'A bankszámla',
          text: 'A **bankszámla (fizetési számla)** a pénzed „otthona” a bankban. Ide érkezhet a fizetés, innen fizetheted a számlákat. Minden számlának van egy **számlaszáma** (Magyarországon 2×8 vagy 3×8 számjegy), nemzetközi formában ez az **IBAN** (HU-val kezdődik).\n\nSzámlanyitásnál hasonlítsd össze a **díjakat**: számlavezetési díj, kártyadíj, utalási díj, készpénzfelvétel díja. Sok bank kínál fiataloknak kedvezményes számlacsomagot.',
          tip: 'A bankszámlákon lévő pénzt bankbetét-biztosítás védi (bankcsőd esetén ügyfelenként és bankonként egy meghatározott összeghatárig). A pontos határt az Országos Betétbiztosítási Alap oldalán nézheted meg.'
        },
        {
          title: 'Kártya és utalás',
          text: '- **Betéti (debit) kártya**: a saját pénzedet költöd vele, ami a számládon van.\n- **Hitelkártya**: a bank pénzét költöd, amit később vissza kell fizetni. Ha a türelmi időn belül nem fizeted vissza, **magas kamatot** kell fizetni.\n- **Átutalás**: pénzküldés egyik számláról a másikra. Magyarországon a forintutalások többsége **azonnali**: néhány másodperc alatt megérkezik, éjjel-nappal.\n- **Másodlagos azonosító**: utalhatsz telefonszámra vagy e-mail-címre is, ha a címzett ezt regisztrálta.',
          warn: 'Az azonnali utalás nem vonható vissza! Utalás előtt mindig ellenőrizd a címzettet és az összeget.'
        },
        {
          title: 'Csalók és adathalászat',
          text: 'A csalók nem a bankot törik fel, hanem **téged próbálnak rávenni**, hogy add meg az adataidat vagy utalj nekik. Gyakori trükkök:\n\n- **Adathalász e-mail vagy SMS**: „A számlád zárolva, kattints ide!” A link egy hamis, a bankéhoz megtévesztésig hasonló oldalra visz.\n- **Hamis banki telefonhívás**: „biztonsági osztály” nevében hívnak, sürgetnek, és kérik a kártyaadatokat vagy a megerősítő kódot. A hívószám is lehet hamisított!\n- **Hamis webshop, apróhirdetéses csalás**: „Futár kifizeti, csak add meg a kártyaadatodat” típusú üzenetek.\n- **Befektetési csalás**: garantált, irreálisan magas hozam, sürgetés, kriptovaluta.\n\nAranyszabályok:\n\n1. A bank **soha nem kéri** telefonon, e-mailben vagy SMS-ben a PIN-kódodat, a jelszavadat vagy az SMS-ben kapott megerősítő kódot.\n2. **Ne kattints** üzenetben kapott linkre, a bank oldalát mindig magad írd be, vagy az appot használd.\n3. Ha gyanús a hívás, **tedd le**, és hívd a bankot a kártyád hátoldalán lévő számon.\n4. Kapcsold be a **kétlépcsős azonosítást** és a tranzakciós értesítéseket.\n5. Ha baj van: **azonnal tiltsd le a kártyát**, és hívd a bankot.',
          tip: 'A sürgetés a csalás legbiztosabb jele. Egy valódi bank időt hagy arra, hogy utánanézz.'
        }
      ],
      quiz: [
        { q: 'Mit tegyél, ha a „bank biztonsági osztálya” felhív, és kéri az SMS-ben kapott kódot?', options: ['Megadod, hiszen a bank hív', 'Leteszed, és a kártyád hátoldalán lévő számon felhívod a bankot', 'Megadod, de csak a felét', 'Megkérdezed a nevét, és utána megadod'], answer: 1, explain: 'A bank soha nem kéri a megerősítő kódot. Ez tipikus csalás.' },
        { q: 'Mi a különbség a betéti és a hitelkártya között?', options: ['Nincs különbség', 'A betéti kártyával a saját pénzedet, a hitelkártyával a bank pénzét költöd', 'A hitelkártya csak külföldön használható', 'A betéti kártyával csak készpénzt lehet felvenni'], answer: 1, explain: 'A hitelkártya hitel: amit elköltesz, azt vissza kell fizetni, késve kamattal.' },
        { q: 'Visszavonható-e egy már elküldött azonnali átutalás?', options: ['Igen, bármikor', 'Igen, 24 órán belül', 'Nem, ezért utalás előtt alaposan ellenőrizd', 'Csak hétvégén'], answer: 2, explain: 'Az azonnali utalás másodpercek alatt megérkezik, és nem lehet egyszerűen visszahívni.' }
      ]
    },
    {
      id: 'kamat-inflacio',
      title: 'Kamat, kamatos kamat és infláció',
      level: 2, minutes: 15,
      summary: 'Hogyan nő a pénz a kamattól, miért erős a kamatos kamat, mit jelent a THM és az EBKM, és mit eszik meg az infláció.',
      tags: ['kamat', 'kamatos kamat', 'egyszerű kamat', 'infláció', 'reálkamat', 'THM', 'EBKM', '72-es szabály', 'vásárlóerő'],
      sections: [
        {
          title: 'Egyszerű és kamatos kamat',
          text: 'A **kamat** a pénz „bérleti díja”: ha te adsz kölcsön (betét), te kapod, ha te veszel fel (hitel), te fizeted. Évi százalékban adják meg.\n\n- **Egyszerű kamat**: mindig csak az eredeti összeg után jár kamat. 100 000 Ft évi 5%-kal 10 év alatt: `100 000 + 10 · 5 000 = 150 000 Ft`.\n- **Kamatos kamat**: a kamat is hozzáadódik a tőkéhez, és a következő évben az is kamatozik. Képlet: `C_n = C_0 · (1 + p/100)^n`\n\nUgyanaz a példa kamatos kamattal: `100 000 · 1,05^10 ≈ 162 889 Ft`. A különbség közel 13 000 Ft, és minél hosszabb az idő, annál nagyobb.',
          tip: 'A **72-es szabály**: oszd el a 72-t az éves kamatlábbal, és megkapod, kb. hány év alatt duplázódik meg a pénz. 6%-nál `72 / 6 = 12` év.'
        },
        {
          title: 'Infláció és reálkamat',
          text: 'Az **infláció** az árak általános emelkedése. Ha az infláció 5%, akkor ami tavaly 1000 Ft volt, az idén átlagosan 1050 Ft. A pénzed tehát **veszít a vásárlóerejéből**: 100 000 Ft egy év múlva csak kb. `100 000 / 1,05 ≈ 95 238` mai forintnyi árut ér.\n\nA **reálkamat** megmutatja, valójában mennyit gyarapszik a pénzed:\n\n`reálkamat ≈ névleges kamat − infláció`\n\nHa a betét 6%-ot fizet, az infláció 4%, a reálkamat kb. 2% (pontosan: `1,06 / 1,04 − 1 ≈ 1,92%`). Ha az infláció nagyobb, mint a kamat, a reálkamat **negatív**: a pénzed hiába kamatozik, mégis kevesebbet ér.',
          warn: 'A „párnacihában” tartott készpénz nem kamatozik, így az infláció évről évre csökkenti az értékét.'
        },
        {
          title: 'THM és EBKM: összehasonlítható mutatók',
          text: '- **THM (teljes hiteldíj mutató)**: a hitel **összes költségét** (kamat, kezelési költség, díjak) egyetlen éves százalékban kifejező mutató. Hiteleket mindig a THM alapján hasonlíts össze, ne csak a kamat alapján!\n- **EBKM (egységesített betéti kamatláb mutató)**: a betét **tényleges éves hozamát** mutatja, a díjakkal és a kamatozás módjával együtt. Betéteket az EBKM alapján hasonlíts össze.\n\nMindkettőt a törvény írja elő, hogy az ajánlatok **összehasonlíthatók** legyenek.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a fogalmakat!', count: 6, pairs: [
            ['THM', 'a hitel összes költsége éves százalékban'],
            ['EBKM', 'a betét tényleges éves hozama'],
            ['Infláció', 'az árak általános emelkedése'],
            ['Reálkamat', 'a kamat az infláció hatásával csökkentve'],
            ['Kamatos kamat', 'a kamat is kamatozik'],
            ['Tőke', 'az eredetileg befektetett vagy kölcsönzött összeg'],
            ['Futamidő', 'meddig tart a hitel vagy a betét'],
            ['72-es szabály', 'a pénz megduplázódási idejének becslése']
          ] } }
        },
        {
          title: 'Gyakorlás',
          text: 'A kamatszámítás alapja a százalékszámítás. Számolj, amíg magabiztos nem leszel!',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalék gyakorló' } }
        }
      ],
      quiz: [
        { q: 'Mennyi lesz 100 000 Ft 2 év múlva évi 5%-os kamatos kamattal?', options: ['105 000 Ft', '110 000 Ft', '110 250 Ft', '125 000 Ft'], answer: 2, explain: '100 000 · 1,05 · 1,05 = 110 250 Ft. Az első év után 105 000, a második évben ennek az 5%-a, 5 250 Ft jön hozzá.' },
        { q: 'Mit mutat a THM?', options: ['Csak a kamatot', 'A hitel összes költségét éves százalékban', 'A betét hozamát', 'Az inflációt'], answer: 1, explain: 'A THM a kamaton kívül a díjakat és költségeket is tartalmazza.' },
        { q: 'A betét kamata 3%, az infláció 5%. Mi történik a pénzed vásárlóerejével?', options: ['Nő kb. 8%-kal', 'Nő kb. 2%-kal', 'Csökken kb. 2%-kal', 'Nem változik'], answer: 2, explain: 'Reálkamat ≈ 3% − 5% = −2%, a pénzed kevesebbet ér.' },
        { q: 'A 72-es szabály szerint kb. hány év alatt duplázódik meg a pénz évi 8%-kal?', options: ['6 év', '9 év', '12 év', '18 év'], answer: 1, explain: '72 / 8 = 9 év. (Pontosan számolva kb. 9,01 év.)' }
      ]
    },
    {
      id: 'hitel',
      title: 'Hitelek és adósság',
      level: 2, minutes: 13,
      summary: 'Hiteltípusok, törlesztőrészlet, és hogyan kerüld el a túlzott eladósodást.',
      tags: ['hitel', 'kölcsön', 'személyi kölcsön', 'lakáshitel', 'jelzálog', 'hitelkártya', 'folyószámlahitel', 'törlesztőrészlet', 'annuitás', 'futamidő', 'önerő', 'KHR', 'eladósodás', 'adósságspirál'],
      sections: [
        {
          title: 'Hiteltípusok',
          text: '- **Személyi kölcsön**: szabad felhasználású, fedezet nélküli hitel. Gyors, de viszonylag drága.\n- **Lakáshitel (jelzáloghitel)**: lakásvásárlásra, a lakás a fedezet. Hosszú futamidő (akár 20–30 év), alacsonyabb kamat, de kell hozzá **önerő**. Ha nem fizetsz, a bank végső esetben értékesítheti az ingatlant.\n- **Hitelkártya és folyószámlahitel (hitelkeret)**: kényelmes, rugalmas, de tartósan használva az egyik **legdrágább** hitelforma.\n- **Áruhitel**: a boltban, egy adott termékre. A „0% THM” ajánlat valóban kedvező lehet, de figyeld a feltételeket (pl. kötelező biztosítás, késedelmi díjak).\n- **Diákhitel**: tanulmányok finanszírozására, kedvezményes feltételekkel, a visszafizetés a munkába állás után kezdődik.'
        },
        {
          title: 'A törlesztőrészlet',
          text: 'A legtöbb hitelt **annuitásos** módon fizeted vissza: minden hónapban ugyanannyit. A részlet eleinte nagyrészt kamat, később egyre inkább tőke.\n\nPélda: 1 000 000 Ft, évi 12% (havi 1%), 12 hónap. A havi részlet kb. **88 849 Ft**, összesen kb. **1 066 185 Ft**-ot fizetsz vissza. A hitel ára tehát kb. 66 000 Ft.\n\nUgyanez 24 hónapra: kb. 47 073 Ft havonta, de összesen kb. 1 129 760 Ft. **Hosszabb futamidő = kisebb részlet, de drágább hitel.**',
          tip: 'Hitelfelvétel előtt kérdezd meg: mennyi a **teljes visszafizetendő összeg**? Ez sokkal beszédesebb, mint a havi részlet.'
        },
        {
          title: 'Túlzott eladósodás',
          text: 'A hitel önmagában nem rossz: lakást vagy tanulást is lehetővé tehet. A veszély akkor kezdődik, ha a törlesztések túl nagy részét viszik el a jövedelemnek.\n\nFigyelmeztető jelek:\n\n- a hónap végére rendszeresen elfogy a pénz, és hitelkártyáról élsz,\n- egy hitelt egy másikból törlesztesz,\n- nem tudod pontosan, mennyi adósságod van összesen,\n- elmaradsz a részletekkel.\n\nA késedelmes adósok adatai bekerülnek a **KHR-be (Központi Hitelinformációs Rendszer)**, ami évekig megnehezítheti, hogy újabb hitelt kapj. Ráadásul késedelmi kamat és behajtási költségek is jönnek: ez az **adósságspirál**.\n\nMit tehetsz? Ha baj van, **minél előbb beszélj a bankkal** (átütemezés, futamidő-hosszabbítás), és kérj segítséget ingyenes adósságkezelési tanácsadótól.',
          warn: 'Kerüld a „gyorskölcsön” jellegű, csak telefonszámmal elérhető, nem bankszerű hitelezőket: a THM-jük gyakran nagyon magas, a feltételek pedig kockázatosak.'
        },
        {
          title: 'Ismerd a szakszavakat!',
          text: 'Párosítsd a hitelezés fogalmait a jelentésükkel.',
          widget: { type: 'parositas', options: { title: 'Hitelfogalmak', count: 6, pairs: [
            ['Önerő', 'a vételár saját pénzből fizetett része'],
            ['Futamidő', 'a hitel visszafizetésének időtartama'],
            ['Annuitás', 'minden hónapban azonos törlesztőrészlet'],
            ['Fedezet', 'amit a bank biztosítékul kér (pl. ingatlan)'],
            ['KHR', 'a hiteladósok adatait nyilvántartó rendszer'],
            ['Előtörlesztés', 'a hitel egy részének határidő előtti visszafizetése'],
            ['Késedelmi kamat', 'a határidőn túl fizetett részlet után járó többletkamat']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi történik, ha ugyanazt a hitelt hosszabb futamidőre veszed fel?', options: ['Nagyobb a részlet és olcsóbb a hitel', 'Kisebb a részlet, de összesen többet fizetsz vissza', 'Semmi nem változik', 'Kisebb a részlet és kevesebbet fizetsz vissza'], answer: 1, explain: 'Hosszabb ideig fizetsz kamatot, így a hitel teljes költsége nő.' },
        { q: 'Mi a KHR?', options: ['Egy hitelkártya-típus', 'A Központi Hitelinformációs Rendszer, ami a hiteladatokat nyilvántartja', 'Egy állampapír', 'A kamat rövidítése'], answer: 1, explain: 'Késedelmes tartozás esetén az adatok a KHR-be kerülnek.' },
        { q: 'Melyik hitelforma a legdrágább tartósan használva?', options: ['Jelzáloghitel', 'Hitelkártya és folyószámlahitel', 'Diákhitel', '0% THM-es áruhitel'], answer: 1, explain: 'A hitelkártya és a hitelkeret kamata jellemzően magas.' }
      ]
    },
    {
      id: 'befektetes',
      title: 'Megtakarítás és befektetés alapjai',
      level: 3, minutes: 14,
      summary: 'Kockázat és hozam, diverzifikáció, állampapír, részvény és befektetési alapok. Nem befektetési tanács!',
      tags: ['megtakarítás', 'befektetés', 'kockázat', 'hozam', 'diverzifikáció', 'állampapír', 'részvény', 'kötvény', 'befektetési alap', 'ETF', 'betét', 'időtáv', 'pilótajáték'],
      sections: [
        {
          title: 'Kockázat és hozam',
          text: 'A befektetések legfontosabb szabálya: **nagyobb várható hozam = nagyobb kockázat**. Aki magas, biztos hozamot ígér, az vagy téved, vagy csal.\n\n- **Bankbetét**: alacsony kockázat, általában alacsony hozam.\n- **Állampapír**: az állam kölcsönt vesz fel tőled. Viszonylag biztonságos, a lakossági állampapírok kamata sokszor kedvezőbb a betétekénél.\n- **Kötvény**: cégek vagy államok hitelpapírja, a kockázat a kibocsátótól függ.\n- **Részvény**: egy cég résztulajdonosa leszel. Hosszú távon magasabb hozamot hozhat, de az árfolyam akár évekig is eshet.\n- **Befektetési alap, ETF**: sok befektető pénzéből egy szakember (vagy egy index szerint) sok különböző papírt vásárol.',
          warn: 'Ez a lecke általános ismereteket ad, **nem befektetési tanács**. Konkrét döntés előtt tájékozódj, olvasd el a termék tájékoztatóját, és ha kell, kérdezz független szakembert.'
        },
        {
          title: 'Diverzifikáció: ne tegyél mindent egy kosárba',
          text: 'A **diverzifikáció** a kockázat megosztása: a pénzedet több különböző befektetésbe teszed (több cég, több ágazat, több ország, több eszközfajta). Ha az egyik rosszul teljesít, a többi ellensúlyozhatja.\n\nEgy befektetési alap vagy indexkövető ETF már önmagában is sok papírt tartalmaz, ezért kis összeggel is lehet diverzifikálni.',
          tip: 'Fontos a **veszteség és a nyereség aszimmetriája**: ha 20%-ot veszítesz, utána nem 20%, hanem 25% emelkedés kell a visszatéréshez. (500 000 Ft → 400 000 Ft, és 400 000 · 1,25 = 500 000 Ft.)'
        },
        {
          title: 'Időtáv és költségek',
          text: '- **Időtáv**: amire 1–2 éven belül szükséged lesz, azt ne tedd ingadozó árfolyamú befektetésbe. A részvények kockázata hosszú (10+ éves) távon jobban kiegyenlítődik.\n- **Költségek**: kezelési díj, vételi-eladási jutalék, számlavezetési díj. Évi 1–2% különbség évtizedek alatt a kamatos kamat miatt hatalmas összeggé nő.\n- **Rendszeresség**: havi kis összegek rendszeres befektetésével nem kell eltalálni a „jó pillanatot”.\n\nPélda: havi 10 000 Ft, évi 5% hozammal (havi kamatozással) 10 év alatt kb. **1 553 000 Ft**-ra nő, miközben te 1 200 000 Ft-ot fizettél be.'
        },
        {
          title: 'Csalások felismerése',
          text: 'Tipikus jelek: **garantált** magas hozam, sürgetés („csak ma!”), az ismerősök beszervezéséért járó jutalék (**pilótajáték**), nem felügyelt külföldi cég, kriptovaluta-„platform”, közösségi médiás hirdetés hírességgel.\n\nMagyarországon a pénzügyi szolgáltatókat a **Magyar Nemzeti Bank (MNB)** felügyeli: az MNB honlapján ellenőrizheted, hogy egy cég jogosult-e a tevékenységre.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a diverzifikáció?', options: ['Minden pénzt egyetlen, legjobbnak tűnő részvénybe teszel', 'A pénzt több különböző befektetés között osztod meg a kockázat csökkentésére', 'Csak készpénzben tartod a megtakarítást', 'Hitelből fektetsz be'], answer: 1, explain: 'Ne tegyél minden tojást egy kosárba.' },
        { q: 'Mi a gond egy „garantált havi 10%-os hozamot” ígérő ajánlattal?', options: ['Semmi, ez jó lehetőség', 'Ilyen magas, biztos hozam nem létezik, valószínűleg csalás', 'Csak az, hogy adózni kell utána', 'Túl alacsony a hozam'], answer: 1, explain: 'A magas hozam mindig magas kockázattal jár. A „garantált” magas hozam tipikus csalás.' },
        { q: 'Ha egy befektetés 20%-ot esik, hány százalékos emelkedés kell, hogy visszaérjen az eredeti értékre?', options: ['20%', '25%', '40%', '15%'], answer: 1, explain: 'Például 100 → 80, és 80 · 1,25 = 100. A visszaemelkedéshez 20 / 80 = 25% kell.' }
      ]
    },
    {
      id: 'ber-ado',
      title: 'Munka, bér és adó',
      level: 2, minutes: 12,
      summary: 'Bruttó és nettó bér, járulékok, személyi jövedelemadó, és mire figyelj az első munkahelyeden.',
      tags: ['bér', 'fizetés', 'bruttó', 'nettó', 'SZJA', 'járulék', 'TB-járulék', 'munkáltatói költség', 'bérjegyzék', 'diákmunka', 'adókedvezmény', 'munkaszerződés'],
      sections: [
        {
          title: 'Bruttó és nettó',
          text: '- **Bruttó bér**: a munkaszerződésben szereplő összeg, ebből vonják le az adót és a járulékokat.\n- **Nettó bér**: amit ténylegesen megkapsz a számládra.\n- **Munkáltatói teljes költség**: a cég a bruttó bér fölött is fizet közterhet (pl. szociális hozzájárulási adó), így téged többe „kerülsz” neki, mint a bruttó béred.\n\nÁllásajánlatnál mindig tisztázd, hogy **bruttó vagy nettó** összegről van szó!'
        },
        {
          title: 'Mit vonnak le a bérből?',
          text: 'Magyarországon a munkavállaló béréből általában ezeket vonják le:\n\n- **Személyi jövedelemadó (SZJA)**: egykulcsos, a bruttó bér **15%-a**.\n- **Társadalombiztosítási járulék**: ebből finanszírozzák többek között a **nyugdíjat** és az **egészségügyi ellátást** (orvos, kórház, táppénz). A 2020-as években ez a bruttó bér **18,5%-a**.\n\nEgyszerűsített példa kedvezmények nélkül: bruttó 400 000 Ft esetén SZJA `60 000 Ft`, TB-járulék `74 000 Ft`, nettó `400 000 − 134 000 = 266 000 Ft`, vagyis a bruttó kb. kétharmada.',
          warn: 'Az adó- és járulékszabályok, kulcsok és kedvezmények **gyakran változnak**. Mindig az aktuális jogszabályt vagy a NAV tájékoztatóját nézd meg!'
        },
        {
          title: 'Kedvezmények fiataloknak és családoknak',
          text: 'Az SZJA-ból különféle **kedvezmények** csökkenthetik a levonást. Jelenleg például a **25 év alatti fiatalok** jövedelme egy bizonyos határig mentes lehet az SZJA alól, és vannak kedvezmények **anyáknak** és **családoknak** (családi adókedvezmény) is. A pontos feltételek, összeghatárok és az érintett korosztályok változhatnak, ezért mindig nézz utána a NAV honlapján.\n\n**Diákmunka**: iskolaszövetkezeten keresztül is dolgozhatsz, ott is jár bérjegyzék és adóigazolás.'
        },
        {
          title: 'Mire figyelj az első munkahelyen?',
          text: '- Legyen **írásos munkaszerződés** (munkakör, bér, munkaidő, munkavégzés helye).\n- Kapj **bérjegyzéket (fizetési papírt)** minden hónapban, és nézd át: bruttó, levonások, nettó.\n- A „zsebbe fizetett” (bejelentés nélküli) munka veszélyes: nem jár utána **nyugdíj**, **táppénz**, sőt baleset esetén sem vagy biztosítva.\n- Évente tavasszal a NAV **adóbevallási tervezetet** készít. Nézd át, és ha kell, javítsd vagy egészítsd ki.'
        }
      ],
      quiz: [
        { q: 'Mi a nettó bér?', options: ['A szerződésben szereplő összeg', 'Amit ténylegesen kézhez kapsz a levonások után', 'Amennyibe a munkáltatónak kerülsz', 'Az éves fizetés'], answer: 1, explain: 'A nettó bér a bruttóból az adó és a járulékok levonása után marad.' },
        { q: 'Mennyi az SZJA bruttó 300 000 Ft után 15%-os kulccsal (kedvezmény nélkül)?', options: ['15 000 Ft', '30 000 Ft', '45 000 Ft', '55 500 Ft'], answer: 2, explain: '300 000 · 0,15 = 45 000 Ft.' },
        { q: 'Miért veszélyes a bejelentés nélküli („feketén” végzett) munka?', options: ['Mert több a nettó', 'Mert nem jár utána nyugdíj, táppénz és biztosítás', 'Mert rövidebb a munkaidő', 'Nem veszélyes'], answer: 1, explain: 'Járulékfizetés nélkül nem szerzel jogosultságot a társadalombiztosítási ellátásokra.' }
      ]
    }
  ]
});
