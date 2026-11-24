/* Ének-zene – extra gyakorlókérdések a Tesztközponthoz
 * Formátum: lásd js/teszt.js. A leckék azonosítói megegyeznek a data/tantargyak/enek-zene.js leckéivel. */
STUDIE.addQuestions('enek-zene', {
  'hang-alapjai': [
    { q: 'Mi a hang forrása?', options: ['A fény', 'Valaminek a rezgése', 'Az elektromos áram', 'A hőmérséklet változása'], answer: 1, explain: 'Minden hang rezgésből születik: a rezgő test meglöki a levegőt, és hanghullám indul el.' },
    { q: 'Mi a frekvencia mértékegysége?', options: ['decibel (dB)', 'méter (m)', 'hertz (Hz)', 'watt (W)'], answer: 2, explain: 'A hertz azt adja meg, hányszor rezeg valami másodpercenként. A decibel a hangerősség egysége.' },
    { q: 'Mekkora frekvenciájú hang szól egy oktávval a 440 Hz-es a¹ fölött?', options: ['880 Hz', '450 Hz', '660 Hz', '220 Hz'], answer: 0, explain: 'Egy oktávval feljebb a frekvencia megduplázódik: 2 · 440 = 880 Hz. A 220 Hz egy oktávval lejjebb van.' },
    { q: 'Mitől tudjuk megkülönböztetni ugyanazt a hangot hegedűn és fuvolán?', options: ['A hangmagasságtól', 'A tempótól', 'A hangerőtől', 'A hangszíntől'], answer: 3, explain: 'A hangszínt a felhangok keveréke adja, és ez minden hangszernél más.' },
    { q: 'Mit mutat meg a metronóm?', options: ['A hangerőt', 'A tempót (ütés per perc)', 'A hangmagasságot', 'A hangnemet'], answer: 1, explain: 'A metronóm egyenletesen kattog a beállított tempóban, például percenként 60 vagy 120-at.' },
    { q: 'Körülbelül milyen frekvenciatartományban hall az emberi fül?', options: ['20 Hz – 20 000 Hz', '1 Hz – 100 Hz', '1000 Hz – 1 000 000 Hz', '440 Hz – 880 Hz'], answer: 0, explain: 'Az emberi hallás kb. 20 Hz-től 20 kHz-ig terjed. Ami efölött van, az az ultrahang.' },
    { q: 'Mit jelent a „crescendo” jelzés?', options: ['hirtelen csend', 'gyorsulva', 'fokozatosan erősödve', 'lassulva'], answer: 2, explain: 'A crescendo a hangerő fokozatos növelése. Az ellentéte a decrescendo (halkulva).' },
    { q: 'Melyik a leglassabb tempójelzés?', options: ['allegro', 'presto', 'moderato', 'largo'], answer: 3, explain: 'A largo szélesen, nagyon lassan. Az allegro gyors, a presto nagyon gyors, a moderato mérsékelt.' },
    { q: 'Miért látjuk előbb a villámot, mint ahogy a mennydörgést halljuk?', options: ['Mert a fény sokkal gyorsabb a hangnál', 'Mert a hang előbb indul el', 'Mert a fülünk lassabban működik', 'Mert a mennydörgés később keletkezik'], answer: 0, explain: 'A fény kb. 300 000 km/s, a hang csak kb. 340 m/s sebességgel terjed a levegőben.' },
    { q: 'Melyik hangszer „á” hangjára hangol a szimfonikus zenekar?', options: ['a trombitáéra', 'az oboáéra', 'a nagydobéra', 'a hárfáéra'], answer: 1, explain: 'Hagyományosan az oboa adja meg a hangolási „á”-t (a¹), mert hangja tiszta és jól hallható.' }
  ],
  kottaolvasas: [
    { q: 'Hány vonalból áll a hangjegyírás vonalrendszere?', options: ['4', '6', '5', '3'], answer: 2, explain: 'Öt vonal és négy köz van. A vonalakat alulról felfelé számoljuk.' },
    { q: 'Melyik hangot jelöli a violinkulcs a második vonalon?', options: ['c¹', 'f', 'a¹', 'g¹'], answer: 3, explain: 'A violinkulcs G-kulcs: a csigája a második vonalat öleli, ott áll a g¹.' },
    { q: 'Mi a helyes magyar hangsor?', options: ['C D E F G A H', 'C D E F G A B', 'A B C D E F G', 'C D E F G H A'], answer: 0, explain: 'Magyarul a hetedik törzshang a H. A B a H-nál fél hanggal mélyebb hang.' },
    { q: 'Hogyan hívjuk a fél hanggal leszállított E hangot?', options: ['Eisz', 'Esz', 'Desz', 'B'], answer: 1, explain: 'A bé -esz vagy -sz végződést ad: E → Esz, A → Asz. A leszállított H neve B.' },
    { q: 'Mit jelent a kereszt (♯) módosítójel?', options: ['Fél hanggal leszállít', 'Visszavonja a módosítást', 'A hangot egy oktávval feljebb viszi', 'Fél hanggal emel'], answer: 3, explain: 'A kereszt fél hanggal emel, a hang neve -isz végződést kap: F → Fisz.' },
    { q: 'Hány nyolcad hang tesz ki egy fél hangot?', options: ['4', '2', '8', '1'], answer: 0, explain: '1 fél = 2 negyed = 4 nyolcad.' },
    { q: 'Mit jelent a 2/4-es ütemmutató?', options: ['Két fél hang egy ütemben', 'Négy negyed egy ütemben', 'Két negyed egy ütemben', 'Két ütem összesen'], answer: 2, explain: 'A felső szám (2) a darabszám, az alsó (4) a negyedet mint egységet jelöli.' },
    { q: 'Milyen hosszú egy pontozott negyed hang?', options: ['egy negyed', 'másfél negyed (három nyolcad)', 'két negyed', 'fél negyed'], answer: 1, explain: 'A pont a hang hosszát a felével megnyújtja: 1 negyed + fél negyed = 3 nyolcad.' },
    { q: 'Mire való a pótvonal?', options: ['Az ütemek elválasztására', 'A darab végének jelölésére', 'A hangerő jelölésére', 'A vonalrendszeren kívül eső magas vagy mély hangok lejegyzésére'], answer: 3, explain: 'A pótvonal rövid segédvonal a vonalrendszer fölött vagy alatt. A c¹ violinkulcsban az első alsó pótvonalon van.' },
    { q: 'Melyik kulcsban írják általában a cselló és a nagybőgő szólamát?', options: ['basszuskulcsban', 'violinkulcsban', 'dókulcsban', 'nem használnak kulcsot'], answer: 0, explain: 'A mély hangszerek szólamát basszuskulcsban (F-kulcsban) írják.' }
  ],
  szolmizacio: [
    { q: 'Melyik a szolmizációs hangok helyes sorrendje?', options: ['dó, ré, mi, szó, fá, lá, ti', 'dó, mi, ré, fá, szó, ti, lá', 'dó, ré, mi, fá, szó, lá, ti', 'ré, dó, mi, fá, lá, szó, ti'], answer: 2, explain: 'Dó, ré, mi, fá, szó, lá, ti, majd újra dó’.' },
    { q: 'Ki tette a relatív szolmizációt a magyar zeneoktatás alapjává?', options: ['Liszt Ferenc', 'Kodály Zoltán', 'Erkel Ferenc', 'Joseph Haydn'], answer: 1, explain: 'Kodály Zoltán és munkatársai dolgozták ki a róla elnevezett zenepedagógiai módszert.' },
    { q: 'Ha a G a dó, melyik hang a mi?', options: ['E', 'A', 'C', 'H'], answer: 3, explain: 'G = dó, A = ré, H = mi. Relatív szolmizációnál a dó bármelyik hang lehet.' },
    { q: 'Melyik kézjel tartozik a dó-hoz?', options: ['ökölbe zárt kéz', 'felfelé mutató mutatóujj', 'lefelé mutató hüvelykujj', 'lazán lógó kézfej'], answer: 0, explain: 'A dó ökölbe zárt kéz, a ti felfelé mutató mutatóujj, a fá lefelé mutató hüvelykujj, a lá lógó kézfej.' },
    { q: 'Hány különböző hangból áll a pentaton hangsor?', options: ['7', '3', '12', '5'], answer: 3, explain: 'A „penta” görögül ötöt jelent: dó, ré, mi, szó, lá.' },
    { q: 'Melyik a lá-pentaton hangsor?', options: ['lá, ti, dó, ré, mi', 'lá, dó, ré, mi, szó', 'dó, ré, mi, fá, szó', 'lá, szó, fá, mi, ré'], answer: 1, explain: 'A lá-pentaton: lá, dó, ré, mi, szó. Nincs benne fá és ti, ezért félhanglépés sem.' },
    { q: 'Mi a két nyolcad ritmusneve?', options: ['tá', 'szün', 'ti-ti', 'tá-á'], answer: 2, explain: 'Két nyolcad: ti-ti. A negyed tá, a fél tá-á, a negyed szünet szün.' },
    { q: 'Mi a relatív szolmizáció legnagyobb előnye?', options: ['Bármilyen magasságban ugyanúgy énekelhető vele egy dallam', 'Nem kell hozzá hallás', 'Csak zongorán használható', 'Mindig a C a dó'], answer: 0, explain: 'A szolmizációs nevek a hangok egymáshoz való viszonyát jelölik, ezért könnyű vele transzponálni és lapról énekelni.' },
    { q: 'Melyik nemzetközi szervezet ismerte el a Kodály-koncepciót 2016-ban?', options: ['NATO', 'Vöröskereszt', 'FIFA', 'UNESCO'], answer: 3, explain: 'Az UNESCO a szellemi kulturális örökség megőrzésének jó gyakorlatai közé vette fel.' },
    { q: 'Mit jelent Kodály jelmondata: „Legyen a zene mindenkié!”?', options: ['A koncertjegyek legyenek ingyenesek', 'Mindenkinek joga van a zenei műveltséghez, ezért mindenkit tanítani kell', 'Mindenki írjon zenét', 'Csak népzenét hallgassunk'], answer: 1, explain: 'Kodály azt akarta, hogy minden gyerek tanuljon énekelni és kottát olvasni, ne csak a kiválasztottak.' }
  ],
  'hangkozok-skalak': [
    { q: 'Hány félhangból áll egy oktáv?', options: ['8', '7', '12', '10'], answer: 2, explain: 'Egy oktávban 12 félhang van: 7 fehér és 5 fekete billentyű.' },
    { q: 'Milyen hangköz a C–E?', options: ['nagy terc', 'kis terc', 'kvart', 'szekund'], answer: 0, explain: 'C, D, E: három hang, tehát terc. 4 félhangból áll, ezért nagy terc.' },
    { q: 'Melyik két szomszédos fehér billentyű között van félhang?', options: ['C–D', 'G–A', 'F–G', 'E–F'], answer: 3, explain: 'Az E–F és a H–C között nincs fekete billentyű, ezért ezek félhangok.' },
    { q: 'Hány félhangos a tiszta kvint?', options: ['5', '7', '6', '9'], answer: 1, explain: 'A tiszta kvint 7 félhang (például C–G). A tiszta kvart 5 félhang.' },
    { q: 'Milyen hangköz a C–F?', options: ['tiszta kvart', 'tiszta kvint', 'nagy terc', 'nagy szext'], answer: 0, explain: 'C, D, E, F: négy hang, ez kvart. 5 félhangból áll, tehát tiszta kvart.' },
    { q: 'Melyik a természetes moll skála lépéssora?', options: ['egész–egész–fél–egész–egész–egész–fél', 'fél–egész–egész–fél–egész–egész–egész', 'egész–fél–egész–egész–fél–egész–egész', 'egész–egész–egész–fél–egész–egész–fél'], answer: 2, explain: 'A moll skálában a 2–3. és az 5–6. fok között van félhang (például a-moll: H–C és E–F).' },
    { q: 'Milyen hármashangzat az A–C–E?', options: ['dúr', 'szűkített', 'bővített', 'moll'], answer: 3, explain: 'Alul kis terc (A–C, 3 félhang), felül nagy terc (C–E, 4 félhang): moll hármashangzat.' },
    { q: 'Milyen hangokból áll a G-dúr hármashangzat?', options: ['G–H–D', 'G–B–D', 'G–A–H', 'G–C–E'], answer: 0, explain: 'G-től nagy terc a H, onnan kis terc a D. (A G–B–D a g-moll hármashangzat.)' },
    { q: 'Mit nevezünk párhuzamos hangnemeknek?', options: ['Két azonos nevű dúr és moll hangnemet, például C-dúr és c-moll', 'Azonos hangokból álló dúr és moll hangnemet, például C-dúr és a-moll', 'Két egymás utáni dúr hangnemet', 'Két dúr hangnemet egy oktáv távolságra'], answer: 1, explain: 'A C-dúr és az a-moll ugyanazokból a hangokból áll, csak más hangról indul: ezek párhuzamosak.' },
    { q: 'Hogyan számoljuk ki a hangköz nevét (például terc, kvint)?', options: ['A fekete billentyűket számoljuk', 'Csak a köztes hangokat számoljuk', 'A billentyűk közti centimétereket mérjük', 'A kezdő- és a záróhangot is beleszámoljuk'], answer: 3, explain: 'C–G: C, D, E, F, G = 5 hang, tehát kvint. Mindkét szélső hangot beleszámoljuk.' }
  ],
  hangszerek: [
    { q: 'Mi rezeg a fúvós hangszerekben?', options: ['A húr', 'A cső belsejében lévő légoszlop', 'A hangszer fém teste', 'A billentyűk'], answer: 1, explain: 'A fúvós hangszerekben a csőben lévő levegő rezeg. Rövidebb légoszlop = magasabb hang.' },
    { q: 'Melyik fafúvós hangszer, pedig fémből készül?', options: ['trombita', 'kürt', 'fuvola', 'tuba'], answer: 2, explain: 'A fuvola ma fémből készül, de a hangképzés módja miatt fafúvósnak számít. A többi rézfúvós.' },
    { q: 'Miért van a gitárnak és a hegedűnek üreges fa teste?', options: ['Mert felerősíti a húr rezgését (rezonátor)', 'Hogy könnyebb legyen', 'Mert így olcsóbb', 'Hogy ne legyen hamis'], answer: 0, explain: 'A rezonátortest együtt rezeg a húrral, és felerősíti a hangot. Nélküle a húr alig hallatszana.' },
    { q: 'Melyik hangszercsoport ül leghátul a szimfonikus zenekarban?', options: ['vonósok', 'fafúvósok', 'rézfúvósok', 'ütősök'], answer: 3, explain: 'Elöl a vonósok, mögöttük a fafúvósok, majd a rézfúvósok, leghátul az ütősök.' },
    { q: 'Hogyan változtatja a hangmagasságot a harsonás?', options: ['A tolócső ki- és betolásával', 'Lyukak befogásával', 'Húrok lefogásával', 'Billentyűk lenyomásával'], answer: 0, explain: 'A tolócső kihúzásával hosszabb lesz a légoszlop, így mélyebb a hang.' },
    { q: 'Melyik a legmélyebb hangú vonós hangszer?', options: ['brácsa', 'hegedű', 'cselló', 'nagybőgő'], answer: 3, explain: 'A vonósok magasságtól mélyig: hegedű, brácsa, cselló, nagybőgő.' },
    { q: 'Hogyan szól meg a zongora húrja?', options: ['Pengetik', 'Filcborítású kalapács üti meg', 'Vonóval húzzák', 'Levegőt fújnak rá'], answer: 1, explain: 'A billentyű lenyomásakor egy kalapács üti meg a húrt, ezért a zongora ütős-húros hangszer is.' },
    { q: 'Melyik a magas férfihang a kórusban?', options: ['basszus', 'alt', 'tenor', 'szoprán'], answer: 2, explain: 'Férfihangok: tenor (magas), basszus (mély). Női hangok: szoprán (magas), alt (mély).' },
    { q: 'Melyik NEM magyar népi hangszer?', options: ['citera', 'duda', 'tárogató', 'szintetizátor'], answer: 3, explain: 'A szintetizátor elektronikus hangszer. A citera, a duda és a tárogató a magyar népzene hangszerei.' },
    { q: 'Mi a karmester feladata?', options: ['A zenekar vezetése: tempó, belépések, hangerő mutatása', 'A hangszerek hangolása', 'A kották kinyomtatása', 'A jegyek eladása'], answer: 0, explain: 'A karmester pálcájával és mozdulataival irányítja a zenekart, és ő formálja a mű értelmezését.' }
  ],
  zenetortenet: [
    { q: 'Melyik korszakhoz tartozik Johann Sebastian Bach?', options: ['klasszika', 'barokk', 'romantika', '20. század'], answer: 1, explain: 'Bach (1685–1750) a barokk legnagyobb mestere. Halálával szokás a barokk végét jelölni.' },
    { q: 'Kik a bécsi klasszikusok?', options: ['Bach, Händel, Vivaldi', 'Liszt, Chopin, Wagner', 'Haydn, Mozart, Beethoven', 'Bartók, Kodály, Erkel'], answer: 2, explain: 'A három nagy mester mind Bécsben alkotott a 18. század második felében és a 19. század elején.' },
    { q: 'Melyik magyar főúri család udvari karmestere volt Haydn közel 30 évig?', options: ['az Esterházyak', 'a Rákócziak', 'a Hunyadiak', 'a Széchenyiek'], answer: 0, explain: 'Haydn 1761-től az Esterházy hercegeket szolgálta, sokáig a fertődi kastélyban.' },
    { q: 'Melyik zeneszerző kezdett fiatalon megsüketülni, mégis tovább komponált?', options: ['Mozart', 'Liszt', 'Bach', 'Beethoven'], answer: 3, explain: 'Beethoven a IX. szimfóniát már teljesen süketen írta.' },
    { q: 'Melyik város zenei főiskoláját alapították Liszt Ferenc kezdeményezésére 1875-ben?', options: ['Bécs', 'Budapest', 'Párizs', 'Weimar'], answer: 1, explain: 'A budapesti Zeneakadémia ma is Liszt Ferenc nevét viseli.' },
    { q: 'Melyik opera szerzője Erkel Ferenc?', options: ['A varázsfuvola', 'A kékszakállú herceg vára', 'Bánk bán', 'Háry János'], answer: 2, explain: 'Erkel operái a Hunyadi László és a Bánk bán. A Varázsfuvola Mozarté, a Kékszakállú Bartóké, a Háry János Kodályé.' },
    { q: 'Mikor adták ki Bartók és Kodály első közös népdalgyűjteményét?', options: ['1956-ban', '1848-ban', '1906-ban', '1875-ben'], answer: 2, explain: '1906-ban jelent meg közös kiadványuk, ezzel kezdődött a tudományos népdalgyűjtés.' },
    { q: 'Melyik Bartók-mű készült kifejezetten zongorázni tanuló gyerekeknek?', options: ['Mikrokozmosz', 'Concerto', 'A fából faragott királyfi', 'Allegro barbaro'], answer: 0, explain: 'A Mikrokozmosz hat füzete a legkönnyebb daraboktól a nehezekig vezeti a tanulót.' },
    { q: 'Hol született a jazz?', options: ['Bécsben', 'Londonban', 'Budapesten', 'New Orleansban'], answer: 3, explain: 'A jazz a 20. század elején New Orleansban, afroamerikai zenészek között alakult ki.' },
    { q: 'Melyik Vivaldi leghíresebb műve?', options: ['Messiás', 'A négy évszak', 'Kis éji zene', 'Magyar rapszódiák'], answer: 1, explain: 'A négy évszak négy hegedűverseny. A Messiás Händel, a Kis éji zene Mozart, a Magyar rapszódiák Liszt műve.' }
  ]
});
