/* Magyar nyelv és irodalom – extra gyakorlókérdések a Tesztközponthoz
 * Formátum: lásd js/teszt.js. A leckék azonosítói megegyeznek a data/tantargyak/magyar.js leckéivel. */
STUDIE.addQuestions('magyar', {
  hangok: [
    { q: 'Hány magánhangzó van a magyar nyelvben?', options: ['14', '7', '25', '44'], answer: 0, explain: 'A 14 magánhangzó: a, á, e, é, i, í, o, ó, ö, ő, u, ú, ü, ű. A 25 a mássalhangzók, a 44 az ábécé betűinek száma.' },
    { q: 'Melyik kétjegyű betű?', options: ['dzs', 'ly', 'x', 'é'], answer: 1, explain: 'Az ly két jegyből (l + y) áll. A dzs háromjegyű, az x és az é egyjegyű.' },
    { q: 'Melyik hang a „d” zöngétlen párja?', options: ['b', 'g', 't', 'ty'], answer: 2, explain: 'A d és a t ugyanott képződik, csak a d-nél rezeg a hangszalag. A gy párja a ty.' },
    { q: 'Melyik szó magas hangrendű?', options: ['autó', 'kávé', 'ablak', 'cipő'], answer: 3, explain: 'A cipő szóban csak magas magánhangzók (i, ő) vannak. Az autó és az ablak mély, a kávé vegyes hangrendű.' },
    { q: 'Hány szótagú a „szivárvány” szó?', options: ['3', '4', '2', '9'], answer: 0, explain: 'Szi-vár-vány: három magánhangzó (i, á, á), tehát három szótag.' },
    { q: 'Milyen hangtörvény érvényesül a „népdal” [nébdal] kiejtésében?', options: ['összeolvadás', 'zöngésség szerinti részleges hasonulás', 'teljes hasonulás', 'képzés helye szerinti hasonulás'], answer: 1, explain: 'A zöngétlen p a zöngés d előtt zöngéssé (b) válik. Írásban ezt nem jelöljük.' },
    { q: 'Milyen hangtörvény érvényesül a „színpad” [szímpad] kiejtésében?', options: ['összeolvadás', 'zöngésség szerinti hasonulás', 'mássalhangzó-kiesés', 'képzés helye szerinti részleges hasonulás'], answer: 3, explain: 'Az n a p előtt ajakkal képzett m-mé válik, mert a p is ajakhang. Írásban nem jelöljük.' },
    { q: 'Melyik szóban jelöljük írásban is a hasonulást?', options: ['kézzel', 'látja', 'népdal', 'egészség'], answer: 0, explain: 'A -val/-vel rag v-je teljesen hasonul, és ezt jelöljük: kéz + vel = kézzel. A többi esetben a szóelemzés elve miatt nem jelöljük.' },
    { q: 'Melyik szópár mutatja, hogy a magánhangzó hossza jelentést különböztet meg?', options: ['ház – házak', 'kert – kertben', 'kor – kór', 'fut – futott'], answer: 2, explain: 'A kor (életkor) és a kór (betegség) csak a magánhangzó hosszában különbözik, mégis más a jelentésük.' },
    { q: 'Hogyan írjuk helyesen: gyümölcs + -val/-vel?', options: ['gyümölcsval', 'gyümölccsel', 'gyümölcsvel', 'gyümölcsel'], answer: 1, explain: 'A v teljesen hasonul a cs-hez, és a hosszú cs-t az egyszerűsítés elve szerint ccs-vel írjuk: gyümölccsel.' }
  ],
  szofajok: [
    { q: 'Milyen szófajú a „futni” szó?', options: ['ige', 'főnévi igenév', 'határozószó', 'főnév'], answer: 1, explain: 'A -ni képzős alak a főnévi igenév.' },
    { q: 'Melyik szó tulajdonnév?', options: ['folyó', 'város', 'Szeged', 'kutya'], answer: 2, explain: 'A Szeged egyetlen konkrét város neve, ezért tulajdonnév, és nagybetűvel írjuk. A többi köznév.' },
    { q: 'Milyen szófajú a „harmadik” szó?', options: ['számnév (sorszámnév)', 'melléknév', 'határozószó', 'névmás'], answer: 0, explain: 'Hányadik? – harmadik. Ez határozott számnév, azon belül sorszámnév.' },
    { q: 'Melyik szó kötőszó?', options: ['alatt', 'de', 'fel', 'hű'], answer: 1, explain: 'A de mondatokat, mondatrészeket kapcsol össze. Az alatt névutó, a fel igekötő, a hű indulatszó.' },
    { q: 'Milyen szófajú a „holnap” szó a mondatban: „Holnap kirándulunk.”?', options: ['főnév', 'ige', 'határozószó', 'névmás'], answer: 2, explain: 'Mikor? – holnap. Időt kifejező határozószó.' },
    { q: 'Melyik melléknév áll középfokban?', options: ['legjobb', 'jó', 'legeslegjobb', 'jobb'], answer: 3, explain: 'A középfok jele a -bb: jobb. A legjobb felsőfok, a legeslegjobb túlzófok, a jó alapfok.' },
    { q: 'Milyen névmás az „aki”?', options: ['kérdő', 'vonatkozó', 'személyes', 'mutató'], answer: 1, explain: 'Az aki, ami, amely vonatkozó névmás: visszautal egy korábbi szóra („A lány, aki ott áll…”). A kérdő névmás a ki?' },
    { q: 'Milyen módban áll az ige: „olvasnék”?', options: ['kijelentő mód', 'felszólító mód', 'feltételes mód', 'múlt idő'], answer: 2, explain: 'A -na, -ne, -ná, -né jel a feltételes mód jele: olvasnék, olvasnál, olvasna.' },
    { q: 'Melyik szó indulatszó?', options: ['jaj', 'talán', 'hogy', 'az'], answer: 0, explain: 'A jaj érzelmet fejez ki, és önmagában mondatértékű. A talán módosítószó, a hogy kötőszó, az az névelő vagy mutató névmás.' },
    { q: 'Milyen szófajú a „meg” a „megírta” szóban?', options: ['névelő', 'névutó', 'kötőszó', 'igekötő'], answer: 3, explain: 'Az ige elé járuló meg igekötő: módosítja az ige jelentését (befejezettséget fejez ki).' }
  ],
  mondat: [
    { q: 'Mi az állítmány a mondatban: „A gyerekek vidáman játszanak az udvaron.”?', options: ['gyerekek', 'vidáman', 'játszanak', 'udvaron'], answer: 2, explain: 'Mit csinálnak a gyerekek? Játszanak – ez az állítmány.' },
    { q: 'Milyen mondatrész az „udvaron” a mondatban: „A gyerekek vidáman játszanak az udvaron.”?', options: ['helyhatározó', 'időhatározó', 'tárgy', 'alany'], answer: 0, explain: 'Hol játszanak? Az udvaron – helyhatározó.' },
    { q: 'Mi a tárgy a mondatban: „Anna almát eszik.”?', options: ['Anna', 'almát', 'eszik', 'nincs tárgy'], answer: 1, explain: 'Mit eszik Anna? Almát – a -t rag jelzi a tárgyat. Az Anna az alany, az eszik az állítmány.' },
    { q: 'Milyen mondatrész a „piros” a mondatban: „A piros labda elgurult.”?', options: ['birtokos jelző', 'mennyiségjelző', 'alany', 'minőségjelző'], answer: 3, explain: 'Milyen labda? Piros – minőségjelző, a labda (alany) tulajdonságát adja meg.' },
    { q: 'Milyen mondat a beszélő szándéka szerint: „Csukd be az ablakot!”?', options: ['kijelentő', 'felszólító', 'óhajtó', 'kérdő'], answer: 1, explain: 'Kérést, utasítást fejez ki, az ige felszólító módban áll: felszólító mondat.' },
    { q: 'Milyen mondatrész a „Péter” ebben a szerkezetben: „Péter barátja”?', options: ['alany', 'tárgy', 'birtokos jelző', 'értelmező jelző'], answer: 2, explain: 'Kinek a barátja? Péteré – birtokos jelző.' },
    { q: 'Melyik tőmondat?', options: ['Délután esett a hó.', 'Esik a hó.', 'A fehér hó esik.', 'Esik a hó, ezért szánkózunk.'], answer: 1, explain: 'A tőmondatban csak alany és állítmány van. A többi bővített egyszerű mondat (időhatározó, jelző), az utolsó összetett.' },
    { q: 'Melyik mellérendelő összetett mondat?', options: ['Tudom, hogy jössz.', 'Elmentem hozzád, de nem voltál otthon.', 'Az a fiú, aki ott áll, a bátyám.', 'Azért jöttem, mert hívtál.'], answer: 1, explain: 'A de kötőszóval összekapcsolt két tagmondat egyenrangú. A többi mondatban az egyik tagmondat a másik egy részét fejti ki (alárendelés).' },
    { q: 'Milyen határozó: „Az eső miatt elmaradt a kirándulás.”?', options: ['okhatározó', 'célhatározó', 'módhatározó', 'időhatározó'], answer: 0, explain: 'Miért maradt el? Az eső miatt – ez az oka, tehát okhatározó.' },
    { q: 'Milyen mondatrész „a barátnőm” a mondatban: „Kati, a barátnőm, ma érkezik.”?', options: ['alany', 'birtokos jelző', 'állítmány', 'értelmező jelző'], answer: 3, explain: 'Megismétli és pontosítja a Kati szót: értelmező jelző. Vesszők közé tesszük.' }
  ],
  helyesiras: [
    { q: 'Melyik szó helyesen írt?', options: ['hejesírás', 'helyesírás', 'helyessírás', 'hejjesírás'], answer: 1, explain: 'A hely szó ly-os, és a rokon szavak (helyes, helyesírás) is megtartják. Az s nem kettőződik.' },
    { q: 'Hogyan írjuk helyesen: Mihály + -val?', options: ['Mihálylyal', 'Mihályal', 'Mihállyal', 'Mihájjal'], answer: 2, explain: 'A v hasonul az ly-hoz, a kétjegyű betűnek csak az első jegyét kettőzzük: Mihállyal.' },
    { q: 'Melyik szó helyesen írt?', options: ['papagály', 'tolvaly', 'sólyom', 'muszály'], answer: 2, explain: 'A sólyom ly-os. A papagáj, a tolvaj és a muszáj j-vel helyes.' },
    { q: 'Hogyan írjuk betűvel a 2026-ot?', options: ['kétezerhuszonhat', 'kétezer-huszonhat', 'két ezer huszonhat', 'kétezer huszonhat'], answer: 1, explain: 'Kétezer felett a hármas számcsoportok határán kötőjelet teszünk: kétezer-huszonhat.' },
    { q: 'Melyik mondat helyes?', options: ['Holnap elmegyek.', 'Holnap el megyek.', 'Holnap el-megyek.', 'Holnap nem elmegyek.'], answer: 0, explain: 'Ha az igekötő közvetlenül az ige előtt áll, egybeírjuk. Tagadásnál az ige mögé kerül: nem megyek el.' },
    { q: 'Melyik a helyes alak?', options: ['Budapesti', 'Budapest-i', 'budapest-i', 'budapesti'], answer: 3, explain: 'Az -i képzős származék kisbetűs, és a képzőt egybeírjuk: budapesti.' },
    { q: 'Melyik mondat helyes?', options: ['A Karácsony decemberben van.', 'A karácsony Decemberben van.', 'A karácsony decemberben van.', 'A Karácsony Decemberben van.'], answer: 2, explain: 'Az ünnepek és a hónapok nevét kisbetűvel írjuk.' },
    { q: 'Melyik intézménynév helyes?', options: ['Magyar Nemzeti Múzeum', 'Magyar nemzeti múzeum', 'magyar Nemzeti Múzeum', 'Magyar Nemzeti múzeum'], answer: 0, explain: 'Az intézménynevek minden tagját nagy kezdőbetűvel írjuk.' },
    { q: 'Melyik a helyes alak?', options: ['gépkocsi-vezető', 'gépkocsivezető', 'gép kocsivezető', 'gépkocsi vezető'], answer: 1, explain: 'Háromtagú összetétel, de csak 6 szótagú (gép-ko-csi-ve-ze-tő), ezért egybeírjuk. Kötőjel csak 6 szótag felett kellene.' },
    { q: 'Melyik a hagyomány elvének példája?', options: ['kézzel', 'látja', 'Széchenyi', 'asszony'], answer: 2, explain: 'A régi családneveket (Széchenyi, Kossuth) hagyományos írásmódjuk szerint írjuk. A látja a szóelemzés, az asszony az egyszerűsítés, a kézzel a kiejtés elvét mutatja.' }
  ],
  'irodalom-alapok': [
    { q: 'Melyik lírai műfaj?', options: ['novella', 'óda', 'tragédia', 'monda'], answer: 1, explain: 'Az óda emelkedett hangú lírai költemény. A novella és a monda epikai, a tragédia drámai műfaj.' },
    { q: 'Melyik drámai műfaj?', options: ['vígjáték', 'legenda', 'elégia', 'mese'], answer: 0, explain: 'A vígjáték (komédia) színpadra szánt, párbeszédes mű. A legenda és a mese epikai, az elégia lírai.' },
    { q: 'Melyik mondat tartalmaz metaforát?', options: ['Olyan erős, mint a medve.', 'Ez a fiú egy igazi medve.', 'A medve a barlangban alszik.', 'A medve mézet eszik.'], answer: 1, explain: 'A fiút „mint” nélkül azonosítjuk a medvével – ez metafora. Az első hasonlat, a másik kettő szó szerinti állítás.' },
    { q: 'Melyik műnemre jellemző, hogy nincs elbeszélő, és a cselekményt a szereplők párbeszéde viszi előre?', options: ['epika', 'líra', 'dráma', 'mese'], answer: 2, explain: 'A drámát színpadra szánják, a szereplők beszélnek és cselekszenek, elbeszélő nincs.' },
    { q: 'Mi a monda?', options: ['szentek életéről szóló történet', 'színpadra szánt mű', 'rövid, csattanós vers', 'valós helyhez, személyhez kötődő, részben kitalált történet'], answer: 3, explain: 'A monda valóságos alapokra épül, de sok benne a képzelet szülte elem (pl. a csodaszarvas mondája). A szentek életéről a legenda szól.' },
    { q: 'Hogy hívjuk az abba rímképletet?', options: ['páros rím', 'keresztrím', 'ölelkező rím', 'bokorrím'], answer: 2, explain: 'Az 1. és 4. sor „öleli” a 2. és 3. sort: ölelkező rím.' },
    { q: 'Milyen a felező tizenkettes verssor?', options: ['12 szótagú, a 6. szótag után kettéoszlik', '10 szótagú, az 5. szótag után oszlik', '12 szótagú, három egyenlő ütemből áll', '8 szótagú, a 4. szótag után oszlik'], answer: 0, explain: 'A felező tizenkettes 12 szótagú sor, középen 6 + 6 szótagra feleződik. Ebben íródott a János vitéz és a Toldi.' },
    { q: 'Milyen költői kép: „A fák levelei suttognak.”?', options: ['hasonlat', 'megszemélyesítés', 'ellentét', 'fokozás'], answer: 1, explain: 'A suttogás emberi cselekvés, a leveleknek tulajdonítjuk: megszemélyesítés.' },
    { q: 'Melyik példa ellentét?', options: ['Fut, rohan, száguld.', 'Mint a villám.', 'Sír a hegedű.', 'Fent a magasban, lent a mélyben.'], answer: 3, explain: 'A fent – lent szembeállítás ellentét. Az első fokozás, a második hasonlat (részlete), a harmadik megszemélyesítés.' },
    { q: 'Miért mondják a balladára, hogy „tragédia dalban elbeszélve”?', options: ['mert mindhárom műnem jellemzőit hordozza', 'mert mindig vidám a vége', 'mert mindig prózában írják', 'mert csak egyetlen szereplője van'], answer: 0, explain: 'A ballada történetet mesél (epika), versben, érzelmesen (líra), párbeszédekkel és tragikus véggel (dráma).' }
  ],
  'petofi-arany': [
    { q: 'Melyik évben írta Petőfi a János vitézt?', options: ['1844', '1848', '1823', '1849'], answer: 0, explain: '1844-ben, néhány hét alatt. 1823-ban született, 1848-ban írta a Nemzeti dalt, 1849-ben esett el.' },
    { q: 'Ki dolgoztatja és bántja Iluskát a János vitézben?', options: ['a gazda', 'a mostohája', 'a boszorkányok', 'a francia király'], answer: 1, explain: 'Iluska árva, gonosz mostohája dolgoztatja. A gazda Jancsit kergeti el.' },
    { q: 'Kiknek a segítségére sietnek a huszárok a János vitézben?', options: ['a törököknek', 'a cseheknek', 'a franciáknak', 'az olaszoknak'], answer: 2, explain: 'A huszárok a franciák segítségére mennek a törökök ellen, így menti meg Jancsi a francia királylányt.' },
    { q: 'Miért nem fogadja el Jancsi a francia királylány kezét?', options: ['mert nem szereti a franciákat', 'mert a király megtiltja', 'mert már Tündérország királya', 'mert Iluskához akar hazatérni'], answer: 3, explain: 'Jancsi hűséges Iluskához, ezért a trónt és a királylányt is visszautasítja.' },
    { q: 'Milyen pályázatra írta Arany János a Toldit?', options: ['a Kisfaludy Társaság pályázatára', 'az Akadémia nagydíjára', 'a Nemzeti Színház drámapályázatára', 'egy újság versenyére'], answer: 0, explain: 'A Kisfaludy Társaság 1846-ban népies hősről szóló elbeszélő költeményt kért, és a Toldi nyert.' },
    { q: 'Mit hajít Toldi Miklós György katonái felé?', options: ['egy rudat', 'egy malomkövet', 'a kardját', 'egy farönköt'], answer: 1, explain: 'Haragjában egy malomkövet hajít, amely megöl egy vitézt. A rudat korábban, az útbaigazításnál emeli fel.' },
    { q: 'Melyik magyar király idején játszódik a Toldi?', options: ['Mátyás', 'Szent István', 'Nagy Lajos', 'IV. Béla'], answer: 2, explain: 'Toldi Miklós a 14. században, Nagy (I.) Lajos király idején élt.' },
    { q: 'Kivel vív párviadalt Toldi a Duna szigetén?', options: ['egy török basával', 'a bátyjával', 'egy farkassal', 'egy cseh vitézzel'], answer: 3, explain: 'A cseh vitéz sorra legyőzte a magyar bajnokokat. Toldi legyőzi, ezért a király megbocsát neki.' },
    { q: 'Melyik mű a Toldi-trilógia része?', options: ['A walesi bárdok', 'Toldi estéje', 'Szeptember végén', 'Nemzeti dal'], answer: 1, explain: 'A trilógia: Toldi, Toldi estéje, Toldi szerelme. A walesi bárdok Arany balladája, a másik kettő Petőfi verse.' },
    { q: 'Ki volt Petőfi Sándor felesége?', options: ['Szendrey Júlia', 'Ercsey Julianna', 'Iluska', 'Csapó Etelka'], answer: 0, explain: 'Petőfi 1847-ben vette feleségül Szendrey Júliát. Ercsey Julianna Arany János felesége volt.' }
  ]
});
