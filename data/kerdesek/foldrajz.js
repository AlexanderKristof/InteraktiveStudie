/* Földrajz – extra gyakorlókérdések a Tesztközponthoz
 * Formátum: lásd js/teszt.js. A leckék azonosítói megegyeznek a data/tantargyak/foldrajz.js leckéivel. */
STUDIE.addQuestions('foldrajz', {
  terkep: [
    { q: 'Egy 1 : 25 000 méretarányú térképen hány métert jelent 1 cm?', options: ['25 m', '250 m', '2500 m', '25 km'], answer: 1, explain: '25 000 cm = 250 m. (Két nullát elhagyva megkapod a métert.)' },
    { q: 'A valóságban 10 km a távolság. Hány cm ez egy 1 : 200 000-es térképen?', options: ['2 cm', '20 cm', '5 cm', '0,5 cm'], answer: 2, explain: '10 km = 1 000 000 cm, és 1 000 000 / 200 000 = 5 cm.' },
    { q: 'Hány fokos az Északi-sark földrajzi szélessége?', options: ['é. sz. 90°', 'é. sz. 0°', 'é. sz. 180°', 'é. sz. 66,5°'], answer: 0, explain: 'A szélesség az Egyenlítőtől a sarkokig 0°-tól 90°-ig nő. A 66,5° az északi sarkkör.' },
    { q: 'Hol halad át a kezdő hosszúsági kör (0°)?', options: ['Budapesten', 'Párizsban', 'New Yorkban', 'A londoni Greenwich-en'], answer: 3, explain: 'Nemzetközi megállapodás alapján 1884 óta a greenwichi csillagvizsgálón át húzott délkör a 0°.' },
    { q: 'Budapesten 15 óra van (UTC+1). Hány óra van ugyanekkor Londonban (UTC+0)?', options: ['16 óra', '15 óra', '14 óra', '13 óra'], answer: 2, explain: 'London egy időzónával nyugatabbra van, ott egy órával korábban jár az óra.' },
    { q: 'Két város földrajzi hosszúsága 30°-kal tér el. Hány óra a helyi idők különbsége?', options: ['2 óra', '30 óra', '3 óra', '1 óra'], answer: 0, explain: '15° = 1 óra, tehát 30° / 15° = 2 óra.' },
    { q: 'Mit jelölnek a szintvonalak a térképen?', options: ['Az országhatárokat', 'Az azonos tengerszint feletti magasságú pontokat', 'Az utakat', 'Az azonos hőmérsékletű pontokat'], answer: 1, explain: 'Ahol a szintvonalak sűrűn futnak, ott meredek a lejtő.' },
    { q: 'Milyen színnel jelöli a domborzati térkép az alföldeket?', options: ['Barna', 'Kék', 'Fehér', 'Zöld'], answer: 3, explain: 'A zöld az alacsony síkságot, a sárga–barna árnyalatok a dombokat és hegyeket, a kék a vizeket jelölik.' },
    { q: 'Mi történik, ha nyugatról keletre átlépsz a nemzetközi dátumválasztó vonalon?', options: ['Egy napot visszalépsz a naptárban', 'Egy napot előrelépsz', 'Egy órát visszaállítasz', 'Semmi'], answer: 0, explain: 'Keletre haladva időzónánként előre kell állítani az órát; ezt a dátumválasztó vonalon egy nap visszalépés egyenlíti ki.' }
  ],
  'fold-szerkezete': [
    { q: 'Kb. mekkora a Föld sugara?', options: ['637 km', '6370 km', '63 700 km', '12 000 000 km'], answer: 1, explain: 'A Föld sugara kb. 6370 km, átmérője ennek kétszerese, kb. 12 740 km.' },
    { q: 'Hol a legvékonyabb a földkéreg?', options: ['A magas hegységek alatt', 'A kontinensek belsejében', 'Az óceánok alatt', 'A sarkokon'], answer: 2, explain: 'Az óceáni kéreg csak 5–10 km vastag, a kontinentális átlagosan 30–40 km.' },
    { q: 'Mi hozza létre a Föld mágneses terét?', options: ['A folyékony külső mag áramlásai', 'A földkéreg vasércei', 'A Hold vonzása', 'A légkör'], answer: 0, explain: 'Az olvadt vas és nikkel mozgása a külső magban egy óriási „dinamóként” működik.' },
    { q: 'Milyen lemezhatáron fekszik Izland?', options: ['Elcsúszó', 'Közeledő, ütköző', 'Alábukó', 'Távolodó'], answer: 3, explain: 'Izland az Atlanti-óceán közepén húzódó hátságon fekszik, ahol az Eurázsiai- és az Észak-amerikai-lemez távolodik.' },
    { q: 'Kb. milyen gyorsan mozognak a kőzetlemezek?', options: ['Néhány cm évente', 'Néhány méter naponta', 'Néhány km évente', 'Egyáltalán nem mozognak'], answer: 0, explain: 'Évi néhány centiméter, nagyjából a körömnövés sebessége. Évmilliók alatt ez ezer kilométereket jelent.' },
    { q: 'Mi a láva?', options: ['Megszilárdult kőzet', 'A felszínre ömlő magma', 'Vulkáni hamu', 'Forró gőz'], answer: 1, explain: 'A mélyben magmának, a felszínre kerülve lávának nevezzük az olvadt kőzetanyagot.' },
    { q: 'Melyik átalakult kőzet?', options: ['Bazalt', 'Mészkő', 'Márvány', 'Homokkő'], answer: 2, explain: 'A márvány mészkőből alakult át nagy nyomáson és hőmérsékleten. A bazalt magmás, a mészkő és a homokkő üledékes.' },
    { q: 'Mi a Balaton-felvidéki tanúhegyek (pl. Badacsony) eredete?', options: ['Jégkorszaki gleccserek', 'Folyók hordaléka', 'Korallzátonyok', 'Egykori vulkánok'], answer: 3, explain: 'Ezek a hegyek kihűlt bazaltvulkánok maradványai, a lepusztulásnak ellenálló bazaltsapka védte meg őket.' },
    { q: 'Kb. hány éves a Föld?', options: ['4,6 milliárd év', '4,6 millió év', '6000 év', '13,8 milliárd év'], answer: 0, explain: 'A Föld kb. 4,6 milliárd éves. A 13,8 milliárd év a Világegyetem becsült kora.' },
    { q: 'Hol fordulnak elő leggyakrabban a vulkánok és földrengések?', options: ['A kontinensek közepén', 'A kőzetlemezek határai mentén', 'A sarkvidékeken', 'Egyenletesen mindenhol'], answer: 1, explain: 'A lemezhatárok mentén a legnagyobb a feszültség és a magma feltörésének esélye (pl. Tűzgyűrű).' }
  ],
  legkor: [
    { q: 'Melyik rétegben található az ózonréteg?', options: ['Troposzféra', 'Sztratoszféra', 'Mezoszféra', 'Termoszféra'], answer: 1, explain: 'Az ózonréteg a sztratoszférában van, és elnyeli a káros UV-sugárzás nagy részét.' },
    { q: 'Egy hegy lábánál 18 °C van. Kb. hány fok lehet 2000 m-rel feljebb?', options: ['30 °C', '16 °C', '6 °C', '−2 °C'], answer: 2, explain: 'A troposzférában kb. 6 °C-ot hűl a levegő kilométerenként: 18 − 2 · 6 = 6 °C.' },
    { q: 'Milyen időjárás jellemző általában magas légnyomásnál?', options: ['Derült, száraz idő', 'Zivatar', 'Tartós eső', 'Hóvihar'], answer: 0, explain: 'Magas nyomásnál a levegő süllyed és felmelegszik, ezért feloszlanak a felhők.' },
    { q: 'Merre fúj a szél?', options: ['Mindig északról délre', 'Az alacsony nyomású helyről a magas felé', 'Csak a tengerről a szárazföld felé', 'A magas nyomású helyről az alacsony felé'], answer: 3, explain: 'A levegő a nagyobb nyomású helyről áramlik a kisebb nyomású felé, ez a szél.' },
    { q: 'Melyik éghajlathoz tartozik a tajga?', options: ['Hideg mérsékelt', 'Egyenlítői', 'Mediterrán', 'Sivatagi'], answer: 0, explain: 'A tajga hatalmas fenyőerdői a hideg mérsékelt övben (Szibéria, Kanada) húzódnak.' },
    { q: 'Mi a monszun?', options: ['Egy sivatagi homokvihar', 'Évszakosan irányt váltó szél, amely esős évszakot hoz', 'Az Egyenlítő menti állandó szélcsend', 'A sarkvidéki hideg szél'], answer: 1, explain: 'Dél- és Kelet-Ázsiában nyáron a tenger felől fújó monszun hozza a nagy esőzéseket.' },
    { q: 'Hány év adataiból szokás megállapítani egy hely éghajlatát?', options: ['1 év', '5 év', '30 év', '1000 év'], answer: 2, explain: 'A meteorológusok legalább 30 éves átlagokkal jellemzik az éghajlatot.' },
    { q: 'Mennyi lenne a Föld átlaghőmérséklete természetes üvegházhatás nélkül?', options: ['Kb. +15 °C', 'Kb. +30 °C', 'Kb. 0 °C', 'Kb. −18 °C'], answer: 3, explain: 'A természetes üvegházhatás nélkül fagyos, −18 °C körüli lenne az átlag; vele kb. +15 °C.' },
    { q: 'Mi jellemző az egyenlítői éghajlatra?', options: ['Egész évben meleg és csapadékos', 'Hideg tél, meleg nyár', 'Szinte soha nem esik', 'Állandó jég borítja'], answer: 0, explain: 'Az Egyenlítő mentén egész évben magasan jár a Nap, és szinte naponta van zivatar: itt nőnek az esőerdők.' }
  ],
  vizburok: [
    { q: 'A Föld felszínének kb. hány százalékát borítja víz?', options: ['29%', '50%', '71%', '97%'], answer: 2, explain: 'A felszín kb. 71%-a víz. (A 97% a sós víz aránya az összes vízen belül.)' },
    { q: 'Melyik a legnagyobb óceán?', options: ['Atlanti-óceán', 'Csendes-óceán', 'Indiai-óceán', 'Jeges-tenger'], answer: 1, explain: 'A Csendes-óceán nagyobb, mint az összes szárazföld együttvéve.' },
    { q: 'Hol ered a Duna?', options: ['A Fekete-erdőben (Németország)', 'Az Alpokban (Svájc)', 'A Kárpátokban', 'A Balatonból'], answer: 0, explain: 'A Duna a németországi Fekete-erdőből ered, és a Fekete-tengerbe ömlik.' },
    { q: 'Mi a delta?', options: ['Egy hegyi tó', 'Egy mély szurdokvölgy', 'Egy folyóforrás', 'Hordalékból épült, ágakra szakadó torkolat'], answer: 3, explain: 'A lassan folyó folyó lerakja hordalékát a torkolatnál, és ágakra szakadva szárazulatot épít.' },
    { q: 'Ki készítette a Tisza szabályozásának terveit a 19. században?', options: ['Széchenyi István', 'Vásárhelyi Pál', 'Kossuth Lajos', 'Eötvös Loránd'], answer: 1, explain: 'A munkát Széchenyi István kezdeményezte, a terveket Vásárhelyi Pál mérnök készítette.' },
    { q: 'Mi a belvíz?', options: ['A folyó medréből kilépő áradás', 'A tengerből visszaáramló víz', 'Síkságon a mélyedésekben megálló, el nem szivárgó víz', 'A földalatti barlangok vize'], answer: 2, explain: 'A belvíz nem a folyóból jön: a csapadék vagy a talajvíz nem tud elszivárogni a telített, rossz vízáteresztő talajon.' },
    { q: 'Miért melegszik fel nyáron gyorsan a Balaton?', options: ['Mert termálforrások táplálják', 'Mert sós a vize', 'Mert a Duna meleg vizet hoz bele', 'Mert nagyon sekély (átlagosan kb. 3 m)'], answer: 3, explain: 'A kis vízmennyiség gyorsan átmelegszik, ezért kellemes nyáron a fürdés.' },
    { q: 'Melyik a Balaton legjelentősebb befolyója?', options: ['A Zala', 'A Sió', 'A Rába', 'A Dráva'], answer: 0, explain: 'A Zala a fő befolyó. A Sió-csatorna a tó lefolyása, a Dunába vezeti a vizet.' },
    { q: 'Mi teszi enyhébbé Nyugat-Európa éghajlatát?', options: ['A Szahara meleg szele', 'A Golf-áramlat és folytatása', 'A Földközi-tenger', 'Az Alpok'], answer: 1, explain: 'A Mexikói-öböl felől érkező meleg tengeráramlás fűti Nyugat-Európa partjait.' }
  ],
  magyarorszag: [
    { q: 'Kb. mekkora Magyarország területe?', options: ['9 300 km²', '930 000 km²', '93 000 km²', '39 000 km²'], answer: 2, explain: 'Magyarország területe kb. 93 000 km².' },
    { q: 'Hány országgal határos Magyarország?', options: ['5', '6', '8', '7'], answer: 3, explain: 'Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia: hét ország.' },
    { q: 'Melyik hegység része a Kékes?', options: ['Mátra', 'Bükk', 'Bakony', 'Mecsek'], answer: 0, explain: 'A Kékes a Mátrában található, az Északi-középhegységben.' },
    { q: 'Melyik nagytájhoz tartozik a Bakony?', options: ['Északi-középhegység', 'Dunántúli-középhegység', 'Dunántúli-dombság', 'Alpokalja'], answer: 1, explain: 'A Bakony a Dunántúli-középhegység legnagyobb tagja.' },
    { q: 'Hol bányásznak lignitet a Mátraalján?', options: ['Algyőnél', 'Úrkúton', 'Visontán', 'Gánton'], answer: 2, explain: 'Visonta külszíni lignitbányája a mellette álló hőerőművet látta el. Algyő kőolaj- és gázmező, Úrkút mangán, Gánt bauxit.' },
    { q: 'Melyik a leggyakoribb szélirány Magyarországon?', options: ['Déli', 'Keleti', 'Délkeleti', 'Északnyugati'], answer: 3, explain: 'Hazánkban az északnyugati szél a leggyakoribb.' },
    { q: 'Melyik hatás okozza az ország déli részén az őszi csapadékmaximumot?', options: ['A mediterrán hatás', 'Az óceáni hatás', 'A szárazföldi hatás', 'A sarkvidéki hatás'], answer: 0, explain: 'A mediterrán éghajlati hatás dél felől érvényesül, főleg a Mecsek környékén.' },
    { q: 'Melyik volt Magyarország első nemzeti parkja?', options: ['Kiskunsági', 'Hortobágyi', 'Bükki', 'Aggteleki'], answer: 1, explain: 'A Hortobágyi Nemzeti Parkot 1973-ban alapították.' },
    { q: 'Miért van sok termálvíz a Kárpát-medencében?', options: ['Mert sok a vulkán ma is', 'Mert sok a csapadék', 'Mert a medence alatt vékony a földkéreg, és a mélyben magas a hőmérséklet', 'Mert a Duna meleg vizet hoz'], answer: 2, explain: 'A vékonyabb kéreg miatt a hőmérséklet a mélységgel gyorsabban nő, mint a világ legtöbb részén.' },
    { q: 'Melyik nagytáj fekszik az ország északnyugati részén, a Duna hordalékkúpján?', options: ['Alpokalja', 'Dunántúli-dombság', 'Nagyalföld', 'Kisalföld'], answer: 3, explain: 'A Kisalföld termékeny síkság Győr környékén; a Duna egykori hordalékkúpján épült fel.' }
  ],
  'nepesseg-gazdasag': [
    { q: 'Kb. hány ember él ma a Földön?', options: ['Kb. 800 millió', 'Kb. 2 milliárd', 'Több mint 8 milliárd', 'Kb. 80 milliárd'], answer: 2, explain: 'A világ népessége 2022-ben lépte át a 8 milliárdot.' },
    { q: 'Egy 2000 km²-es megyében 300 000 ember él. Mekkora a népsűrűség?', options: ['150 fő/km²', '600 fő/km²', '15 fő/km²', '1500 fő/km²'], answer: 0, explain: '300 000 / 2000 = 150 fő/km².' },
    { q: 'Melyik a primer (elsődleges) szektor tevékenysége?', options: ['Bankügyintézés', 'Gépjárműgyártás', 'Tanítás', 'Erdőgazdálkodás'], answer: 3, explain: 'Az elsődleges szektor a természetből közvetlenül nyer javakat: mezőgazdaság, erdészet, halászat, bányászat.' },
    { q: 'Mit mér a GDP?', options: ['Az ország lakosainak számát', 'Egy év alatt előállított termékek és szolgáltatások összértékét', 'Az ország területét', 'A kivitt áruk tömegét'], answer: 1, explain: 'A GDP (bruttó hazai termék) a gazdasági teljesítmény legelterjedtebb mutatója.' },
    { q: 'Mit jelent a fenntartható fejlődés?', options: ['A mai igények kielégítését úgy, hogy a jövő nemzedékeké se sérüljön', 'A lehető leggyorsabb gazdasági növekedést', 'A fejlődés teljes leállítását', 'Csak az erdők védelmét'], answer: 0, explain: 'A lényeg, hogy ne éljük fel az unokáink elől az erőforrásokat.' },
    { q: 'Mi a helyes sorrend a hulladék kezelésében?', options: ['Újrahasznosítás → csökkentés → újrahasználat', 'Égetés → lerakás → gyűjtés', 'Csökkentés → újrahasználat → újrahasznosítás', 'Lerakás → újrahasznosítás → csökkentés'], answer: 2, explain: 'A legjobb hulladék az, ami meg sem keletkezik. Csak ezután jön az újrahasználat, majd az újrahasznosítás.' },
    { q: 'Melyik erőmű termeli Magyarországon a villamos energia közel felét?', options: ['A visontai hőerőmű', 'A bősi vízerőmű', 'Egy szélerőműpark', 'A paksi atomerőmű'], answer: 3, explain: 'A paksi atomerőmű adja a hazai áramtermelés közel felét, szén-dioxid-kibocsátás nélkül.' },
    { q: 'Miért öregszik Magyarország népessége?', options: ['Kevés gyermek születik, és nő a várható élettartam', 'Sok fiatal költözik be', 'Nagyon sok gyermek születik', 'Csökken a várható élettartam'], answer: 0, explain: 'Az alacsony születésszám és a hosszabb élet miatt nő az idősek aránya.' },
    { q: 'Az ország 4 millió foglalkoztatottjának 65%-a a szolgáltatásokban dolgozik. Hány fő ez?', options: ['650 000', '2 600 000', '1 400 000', '3 500 000'], answer: 1, explain: '4 000 000 · 0,65 = 2 600 000 fő.' }
  ]
});
