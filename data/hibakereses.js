/* Hibakereső döntési fák a szakmákhoz. Formátum: js/hibakereses.js fejléce. */
(function () {
  var A = STUDIE.addTrouble;

  A({
    id: 'auto-nem-indul',
    title: 'Nem indul az autó',
    lessons: ['autoszereles/diagnosztika'],
    intro: 'Haladj végig a kérdéseken úgy, ahogy egy autószerelő tenné: a legegyszerűbb, leggyakoribb okoktól a ritkábbak felé.',
    start: 'tunet',
    nodes: {
      tunet: { q: 'Mi történik, amikor elfordítod a kulcsot (vagy megnyomod az indítógombot)?', answers: [
        { t: 'Semmi, a műszerfal sem világít', next: 'sotet' },
        { t: 'Kattan egyet vagy gyorsan kattog', next: 'kattog' },
        { t: 'Az önindító lassan, nehezen forgat', next: 'lassu' },
        { t: 'Az önindító rendesen forgat, de nem indul be', next: 'forgat' },
        { t: 'Beindul, de pár másodperc múlva leáll', next: 'leall' }] },
      sotet: { q: 'Mekkora az akkumulátor feszültsége a két saru között?', check: 'Multiméterrel, egyenfeszültség (V⎓) állásban mérd meg az akku két pólusa között, motor áll, minden fogyasztó kikapcsolva.', answers: [
        { t: '11 V alatt', next: 'r_lemerult' },
        { t: '12,4 V vagy több', next: 'saru' }] },
      saru: { q: 'Szorosak és tiszták az akkusaruk és a testkábel?', check: 'Nézd meg, nincs-e fehér-zöldes oxidréteg, és kézzel nem mozdul-e el a saru. Mérd a feszültséget a saruk fémes része között is (nem csak az akku pólusain).', answers: [
        { t: 'Laza vagy oxidált', next: 'r_saru' },
        { t: 'Rendben vannak', next: 'r_fobiztositek' }] },
      kattog: { q: 'Mennyire esik le az akku feszültsége indítózás közben?', check: 'Egy segítő indítson, közben mérd az akku feszültségét. Egy jó akku 9,6 V fölött marad.', answers: [
        { t: '9,6 V alá esik', next: 'r_gyenge' },
        { t: '9,6 V felett marad, mégsem forog az önindító', next: 'r_onindito' }] },
      lassu: { q: 'Hideg van (fagypont alatt), vagy régi (4–6 évesnél idősebb) az akku?', answers: [
        { t: 'Igen', next: 'r_gyenge' },
        { t: 'Nem, és az akku is rendben van', next: 'r_onindito_kopott' }] },
      forgat: { q: 'Van üzemanyag a tankban? (Ne csak a mutatóra hagyatkozz!)', answers: [
        { t: 'Lehet, hogy kifogyott', next: 'r_uzemanyag' },
        { t: 'Biztosan van', next: 'pumpa' }] },
      pumpa: { q: 'Hallod a benzinpumpa rövid zümmögését, amikor ráadod a gyújtást (indítás előtt, 1–2 másodpercig)?', check: 'Csendes környezetben, a hátsó ülés vagy a tank felől figyeld.', answers: [
        { t: 'Nem hallom', next: 'r_pumpa' },
        { t: 'Igen, hallom', next: 'lampa' }] },
      lampa: { q: 'Világít a motorhiba-jelző (sárga motor) lámpa, és van tárolt hibakód?', check: 'OBD-II olvasóval kérdezd le a hibakódokat (lásd a Diagnosztika leckét).', answers: [
        { t: 'Igen, pl. P0335 (főtengely-jeladó)', next: 'r_jelado' },
        { t: 'Igen, gyújtással kapcsolatos kód (P030x)', next: 'r_gyujtas' },
        { t: 'Nincs hibakód', next: 'r_szerviz' }] },
      leall: { q: 'Villog a műszerfalon az indításgátló (kulcs vagy autó lakattal) jelzőfény?', answers: [
        { t: 'Igen', next: 'r_immo' },
        { t: 'Nem', next: 'r_alapjarat' }] },
      r_lemerult: { result: 'Teljesen lemerült az akkumulátor', fix: 'Indítsd be bikázással vagy indítórásegítővel, utána töltsd fel rendesen.\n\nKeresd meg az okát:\n- égve maradt lámpa vagy belső világítás\n- nyugalmi áramfelvétel (szivárgó áram)\n- elöregedett akku\n- nem tölt a generátor (járó motornál 13,8–14,7 V-nak kell lennie)', level: 'ok' },
      r_saru: { result: 'Rossz érintkezés az akkusarunál vagy a testkábelnél', fix: 'Szereld le a sarukat (előbb a negatívat!), tisztítsd meg drótkefével, húzd meg őket, és vond be pólusvédő zsírral.', level: 'ok' },
      r_fobiztositek: { result: 'Kiégett főbiztosíték vagy szakadt tápvezeték', fix: 'Ellenőrizd az akku melletti főbiztosíték-dobozt. Ha a biztosíték újra kiég, zárlat van a rendszerben. Ezt szerviz keresse meg.', level: 'warn', pro: true },
      r_gyenge: { result: 'Gyenge, elöregedett akkumulátor', fix: 'Töltsd fel, és mérd meg terhelés alatt (akkuteszterrel). Ha a töltés után is gyorsan esik a feszültsége, cseréld ki. Hidegben az akku kapacitása akár a felére is csökkenhet.', level: 'ok' },
      r_onindito: { result: 'Önindító, mágneskapcsoló vagy indítórelé hiba', fix: 'Az akku rendben van, az áram mégsem jut az önindítóba. Ellenőrizni kell az indítóreléket, a mágneskapcsoló vezetékét és magát az önindítót.', level: 'warn', pro: true },
      r_onindito_kopott: { result: 'Kopott önindító (szénkefék, csapágy)', fix: 'Az önindító túl nagy áramot vesz fel és lassan forog. Felújítás vagy csere szükséges.', level: 'warn', pro: true },
      r_uzemanyag: { result: 'Kifogyott az üzemanyag', fix: 'Tankolj. Dízelnél a teljes kifogyás után a rendszert légteleníteni is kell!', level: 'ok' },
      r_pumpa: { result: 'Nem kap üzemanyagot a motor (pumpa, biztosíték vagy relé)', fix: 'Nézd meg a kezelési könyv szerint a benzinpumpa biztosítékát és reléjét. Ha azok jók, a pumpa vagy a vezetéke a hibás.', level: 'warn', pro: true },
      r_jelado: { result: 'Főtengely-jeladó hiba', fix: 'A motorvezérlő nem tudja, hol áll a főtengely, ezért nem ad szikrát és befecskendezést. A jeladót és a csatlakozóját kell ellenőrizni, cserélni.', level: 'warn', pro: true },
      r_gyujtas: { result: 'Gyújtási hiba (gyertya, gyújtótekercs)', fix: 'Ellenőrizd a gyújtógyertyákat és a tekercseket. A hibakód száma megmutatja, melyik hengernél van gond.', level: 'warn', pro: true },
      r_szerviz: { result: 'Mélyebb diagnosztika kell', fix: 'Valószínű okok: üzemanyagnyomás, kompresszióhiba vagy vezérlés (szíj, lánc). Szervizben mérik az üzemanyagnyomást és a kompressziót.', level: 'warn', pro: true },
      r_immo: { result: 'Az indításgátló nem ismeri fel a kulcsot', fix: 'Próbáld a pótkulccsal. Cseréld ki a kulcs elemét. Ha egyik kulcs sem működik, a kulcsot vagy az antennát újra kell tanítani (márkaszerviz).', level: 'ok' },
      r_alapjarat: { result: 'Alapjárat-szabályozási vagy üzemanyagnyomás-hiba', fix: 'Gyakori okok:\n- szennyezett fojtószelep\n- hamis levegő (repedt szívócső)\n- gyenge benzinpumpa\n\nOBD-vel nézd meg az élő adatokat.', level: 'warn', pro: true }
    }
  });

  A({
    id: 'fi-old-le',
    title: 'Leold a FI relé (áram-védőkapcsoló)',
    lessons: ['villanyszereles/vedelmek'],
    intro: 'A FI relé akkor kapcsol le, ha az áram egy része „elszökik”, például a földbe. **Elektromos szerelvényhez ne nyúlj!** Itt csak kapcsolókat kapcsolsz, és készülékeket húzol ki.',
    start: 'mikor',
    nodes: {
      mikor: { q: 'Visszakapcsolva azonnal újra leold?', answers: [
        { t: 'Igen, azonnal', next: 'kor' },
        { t: 'Nem, csak időnként old le', next: 'idonkent' }] },
      kor: { q: 'Kapcsold le az összes kismegszakítót, majd a FI-t fel. Ezután egyenként kapcsold fel a kismegszakítókat. Mi történik?', answers: [
        { t: 'Egy bizonyos kismegszakítónál old le', next: 'keszulekek' },
        { t: 'Már akkor leold, amikor minden kismegszakító lent van', next: 'r_szekreny' }] },
      keszulekek: { q: 'Húzd ki az összes készüléket ennek a körnek a dugaljaiból, és próbáld újra. Leold még?', answers: [
        { t: 'Igen, készülékek nélkül is', next: 'r_vezetek' },
        { t: 'Nem, így már nem', next: 'r_keszulek' }] },
      idonkent: { q: 'Mikor szokott leoldani?', answers: [
        { t: 'Esős, nedves időben', next: 'r_nedves' },
        { t: 'Egy bizonyos készülék bekapcsolásakor', next: 'r_keszulek' },
        { t: 'Zivatar, villámlás idején', next: 'r_tulfesz' },
        { t: 'Látszólag véletlenszerűen', next: 'r_szivargas' }] },
      r_szekreny: { result: 'Hiba az elosztószekrényben, vagy N–PE zárlat', fix: 'Valószínű okok:\n- a nulla- és védővezeték összeér valahol\n- a FI relé maga hibásodott meg\n\nEzt csak villanyszerelő vizsgálhatja meg.', level: 'bad', pro: true },
      r_vezetek: { result: 'Szigetelési hiba a vezetékben vagy egy dobozban', fix: 'Gyakori ok a nedvesség (fürdőszoba, kültér) vagy egy megsérült vezeték (pl. fúrás közben). A villanyszerelő szigetelésvizsgálóval megkeresi a hibás szakaszt. Addig az a kör maradjon lekapcsolva.', level: 'bad', pro: true },
      r_keszulek: { result: 'Hibás készülék', fix: 'Dugd vissza a készülékeket egyenként, és figyeld, melyiknél old le. Gyakori bűnösök: vízforraló, mosógép, bojler, hűtő (elöregedett fűtőszál vagy szigetelés). A hibás készüléket ne használd, javíttasd meg vagy cseréld le.', level: 'ok' },
      r_nedves: { result: 'Nedvesség egy kültéri szerelvényben', fix: 'Kültéri dugalj, lámpa vagy kerti szerelvény ázhatott be. Ellenőriztesd, megfelelő-e az IP-védettsége (kültérre legalább IP44).', level: 'warn', pro: true },
      r_tulfesz: { result: 'Túlfeszültség (villám) miatti leoldás', fix: 'A FI ilyenkor jogosan reagálhat. Túlfeszültség-levezető (SPD) beépítése csökkenti az esélyét és védi a készülékeket.', level: 'warn', pro: true },
      r_szivargas: { result: 'Összeadódó szivárgó áramok', fix: 'Sok elektronikus eszköz (számítógép, LED-tápok, töltők) mind egy kicsit „szivárog”, és ezek összeadódnak. Megoldás lehet a körök szétosztása több FI relé között. Ezt szakember tervezze meg.', level: 'warn', pro: true }
    }
  });

  A({
    id: 'kismegszakito-old-le',
    title: 'Leold a kismegszakító',
    lessons: ['villanyszereles/vedelmek', 'villanyszereles/vezetekek'],
    intro: 'A kismegszakító a vezetéket védi a túlmelegedéstől. A leoldás módja elárulja, mi a baj.',
    start: 'mikor',
    nodes: {
      mikor: { q: 'Mikor old le?', answers: [
        { t: 'Azonnal, ahogy bekapcsolok egy készüléket (vagy visszakapcsolom)', next: 'azonnal' },
        { t: 'Csak percek múlva, amikor sok minden megy egyszerre', next: 'tulterheles' }] },
      azonnal: { q: 'Leold akkor is, ha a körből minden készüléket kihúztál?', answers: [
        { t: 'Igen', next: 'r_zarlat_vezetek' },
        { t: 'Nem', next: 'r_zarlat_keszulek' }] },
      tulterheles: { q: 'Add össze a körön egyszerre működő készülékek teljesítményét! (A teljesítmény a típustáblán van, wattban.) Több jön ki, mint kb. 3600 W (B16 esetén)?', check: '16 A × 230 V ≈ 3680 W. Például vízforraló 2000 W + hősugárzó 2000 W = 4000 W, ez már sok.', answers: [
        { t: 'Igen, több', next: 'r_tulterheles' },
        { t: 'Nem, jóval kevesebb', next: 'r_meleg' }] },
      r_zarlat_vezetek: { result: 'Zárlat a vezetékben vagy egy szerelvényben', fix: 'A kör maradjon lekapcsolva! Villanyszerelő mérje ki, hol ér össze a fázis és a nulla vagy a védővezeték.', level: 'bad', pro: true },
      r_zarlat_keszulek: { result: 'Zárlatos készülék', fix: 'Az a készülék hibás, amelynek bekapcsolásakor azonnal leold. Ne használd, javíttasd vagy cseréld le.', level: 'ok' },
      r_tulterheles: { result: 'Túlterhelés: túl sok fogyasztó egy körön', fix: 'Oszd szét a nagy fogyasztókat különböző körökre (más kismegszakítóhoz tartozó dugaljakra). Nagyobb kismegszakítót **soha ne** tegyél be ugyanarra a vezetékre, mert a vezeték túlmelegedhet és tüzet okozhat!', level: 'ok' },
      r_meleg: { result: 'Melegedő csatlakozás vagy elöregedett kismegszakító', fix: 'Egy laza kötés felmelegítheti a kismegszakítót, ami így hamarabb lekapcsol. Ha meleg a dugalj vagy a kismegszakító, vagy égett szagot érzel, azonnal hívj villanyszerelőt.', level: 'bad', pro: true }
    }
  });

  A({
    id: 'lampa-nem-eg',
    title: 'Nem ég a lámpa',
    lessons: ['villanyszereles/kapcsolasok'],
    intro: 'Lépésről lépésre a legegyszerűbb okoktól. Izzócsere előtt mindig kapcsold le a lámpát, és várd meg, amíg kihűl.',
    start: 'mas',
    nodes: {
      mas: { q: 'A lakás többi lámpája és dugalja működik?', answers: [
        { t: 'Nem, a környéken semmi sem megy', next: 'szekreny' },
        { t: 'Igen, csak ez az egy lámpa nem ég', next: 'izzo' }] },
      szekreny: { q: 'Az elosztószekrényben áll lent kismegszakító vagy FI relé?', answers: [
        { t: 'Igen', next: 'r_visszakapcsol' },
        { t: 'Nem, minden fent van', next: 'r_szolgaltato' }] },
      izzo: { q: 'Kicserélted az izzót (fényforrást) egy biztosan jóra?', answers: [
        { t: 'Igen, a csere után ég', next: 'r_izzo' },
        { t: 'Igen, de úgy sem ég', next: 'tobb' }] },
      tobb: { q: 'Több helyről (pl. folyosón két kapcsolóval) kapcsolható a lámpa?', answers: [
        { t: 'Igen', next: 'r_valto' },
        { t: 'Nem, egy kapcsolója van', next: 'r_kapcsolo' }] },
      r_visszakapcsol: { result: 'Leoldott a védelem', fix: 'Kapcsold vissza. Ha újra leold, nézd végig a „Leold a kismegszakító” vagy a „Leold a FI relé” hibakeresőt.', level: 'ok' },
      r_szolgaltato: { result: 'Áramszünet vagy a főbiztosíték hibája', fix: 'Nézd meg, van-e áram a szomszédoknál. Ha nincs, a szolgáltató hibabejelentőjét kell hívni. Ha csak nálatok nincs, a mérőhely előtti biztosíték is lehet a gond: ehhez csak a szolgáltató vagy villanyszerelő nyúlhat.', level: 'warn', pro: true },
      r_izzo: { result: 'Kiégett a fényforrás', fix: 'Készen vagy. Tipp: a LED fényforrás töredék fogyasztású, és sokkal tovább bírja.', level: 'ok' },
      r_valto: { result: 'Hibás váltókapcsoló vagy rossz bekötés (alternatív kapcsolás)', fix: 'Ha a lámpa csak bizonyos kapcsolóállásokban nem ég, valamelyik váltókapcsoló vagy a köztük futó vezeték hibás. A Kapcsolás-építő játékban megnézheted, hogyan működik ez a kapcsolás.', level: 'warn', pro: true },
      r_kapcsolo: { result: 'Hibás kapcsoló, foglalat vagy laza kötés', fix: 'A hiba helyét feszültség alatti méréssel lehet megtalálni, ezért ez **villanyszerelő** feladata.', level: 'warn', pro: true }
    }
  });

  A({
    id: 'ev-nem-tolt',
    title: 'Nem tölt az elektromos autó',
    lessons: ['elektromos-auto/toltes'],
    intro: 'A töltés három szereplő együttműködése: a töltő, a kábel és az autó. A nagyfeszültségű rendszerhez soha ne nyúlj!',
    start: 'hol',
    nodes: {
      hol: { q: 'Hol próbálsz tölteni?', answers: [
        { t: 'Otthon, fali töltővel (wallbox) vagy AC töltőn', next: 'ac_aram' },
        { t: 'Nyilvános DC gyorstöltőn', next: 'dc' }] },
      ac_aram: { q: 'Világít a töltő kijelzője vagy LED-je?', answers: [
        { t: 'Nem, a töltő teljesen sötét', next: 'r_ac_vedelem' },
        { t: 'Igen, de hibát jelez vagy nem indul a töltés', next: 'ac_kabel' }] },
      ac_kabel: { q: 'Rendesen beakadt és reteszelődött a csatlakozó az autóban?', check: 'Húzd ki, nézd meg, nincs-e szennyeződés vagy sérülés a csatlakozóban, majd dugd vissza határozottan. Az autó általában jelzi a reteszelést.', answers: [
        { t: 'Nem reteszelt, vagy szennyezett volt', next: 'r_csatlakozo' },
        { t: 'Rendben van', next: 'ac_ido' }] },
      ac_ido: { q: 'Be van állítva az autóban vagy az appban töltési időzítés, vagy elérte a töltési limitet (pl. 80%)?', answers: [
        { t: 'Igen', next: 'r_idozites' },
        { t: 'Nem', next: 'ac_hideg' }] },
      ac_hideg: { q: 'Nagyon hideg van (−10 °C alatt), vagy az autó jelzi, hogy az akku túl hideg vagy meleg?', answers: [
        { t: 'Igen', next: 'r_ho' },
        { t: 'Nem', next: 'r_obc' }] },
      dc: { q: 'Mi a tünet?', answers: [
        { t: 'El sem indul a töltés', next: 'r_dc_auth' },
        { t: 'Elindul, de nagyon lassú', next: 'r_dc_lassu' },
        { t: 'Elindul, majd hamar megszakad', next: 'r_dc_megszakad' }] },
      r_ac_vedelem: { result: 'Leoldott a töltő védelme (kismegszakító vagy FI relé)', fix: 'Nézd meg a töltő saját kismegszakítóját és FI relé­jét. A wallboxhoz A-típusú FI és 6 mA-es egyenáramú hibaáram-figyelés, vagy B-típusú FI kell. Ha visszakapcsolás után újra leold, villanyszerelőt kell hívni.', level: 'warn', pro: true },
      r_csatlakozo: { result: 'Csatlakozó- vagy reteszelési hiba', fix: 'Tisztítsd meg a csatlakozót (száraz ronggyal, áramtalanítva), és dugd be határozottan. Ha a retesz motorja hibás, az autó szervize javítja.', level: 'ok' },
      r_idozites: { result: 'Időzítés vagy töltési limit akadályozza', fix: 'Az autó a beállított olcsóbb (éjszakai) időszakra vár, vagy már elérte a limitet. Az appban vagy az autó menüjében kapcsold ki, vagy indítsd el azonnal.', level: 'ok' },
      r_ho: { result: 'Az akku hőmérséklete korlátozza a töltést', fix: 'Hidegben a lítiumion akku csak lassan tölthető (lítiumkiválás veszélye). Hagyd, hogy az autó előmelegítse az akkut, vagy indulás előtt kapcsold be az előkondicionálást.', level: 'ok' },
      r_obc: { result: 'Fedélzeti töltő (OBC) vagy kommunikációs hiba', fix: 'Próbálj ki másik AC töltőt. Ha ott sem tölt, a fedélzeti töltő vagy a töltésvezérlés hibás: ez márkaszervizi feladat, mert a nagyfeszültségű rendszert érinti.', level: 'bad', pro: true },
      r_dc_auth: { result: 'Azonosítás vagy kommunikációs hiba', fix: 'Ellenőrizd a kártyát vagy az appot (fizetési mód, egyenleg). Próbálj másik töltőpontot. Az autó és a töltő digitálisan „egyeztet” egymással, és ez néha megakad: húzd ki, majd dugd vissza a kábelt.', level: 'ok' },
      r_dc_lassu: { result: 'Ez a normális töltési görbe vagy hideg akku', fix: 'Magas töltöttségnél (kb. 80% felett) a töltés szándékosan lelassul. A hideg akku is lassabban tölt: ha az autó tudja, navigálj a töltőhöz, akkor előmelegíti az akkut. Egyes töltők a teljesítményt több autó között megosztják.', level: 'ok' },
      r_dc_megszakad: { result: 'Túlmelegedés vagy kommunikációs hiba', fix: 'Próbáld másik töltőoszlopon. Ha többször előfordul különböző töltőkön, olvastasd ki az autó hibatárát szervizben.', level: 'warn', pro: true }
    }
  });
})();
