/* Csillagászat és űr – extra gyakorlókérdések a Tesztközponthoz
 * Formátum: lásd js/teszt.js. A leckék azonosítói megegyeznek a data/tantargyak/csillagaszat.js leckéivel. */
STUDIE.addQuestions('csillagaszat', {
  'naprendszer': [
    { q: 'Melyik bolygó van a legközelebb a Naphoz?', options: ['Vénusz', 'Merkúr', 'Mars', 'Föld'], answer: 1, explain: 'A Merkúr kb. 0,39 CSE-re kering a Naptól.' },
    { q: 'Hány bolygója van a Naprendszernek a 2006-os IAU-meghatározás szerint?', options: ['9', '7', '8', '10'], answer: 2, explain: 'A Plútót 2006-ban törpebolygóvá minősítették, azóta 8 bolygót tartunk számon.' },
    { q: 'Mekkora része a Napé a Naprendszer teljes tömegének?', options: ['Kb. 50%', 'Kb. 75%', 'Kb. 90%', 'Kb. 99,86%'], answer: 3, explain: 'A bolygók, holdak és kisbolygók együtt is csak a tömeg kb. 0,14%-át adják.' },
    { q: 'Melyik bolygónak van a legnagyobb átmérője?', options: ['Jupiter', 'Szaturnusz', 'Neptunusz', 'Uránusz'], answer: 0, explain: 'A Jupiter átmérője kb. 143 000 km, kb. 11 földátmérő.' },
    { q: 'Mennyi idő alatt kerüli meg a Napot a Neptunusz?', options: ['Kb. 12 év', 'Kb. 165 év', 'Kb. 84 év', 'Kb. 30 év'], answer: 1, explain: 'A Neptunusz kb. 30 CSE-re van, keringési ideje kb. 165 év. A 84 év az Uránuszé, a 30 év a Szaturnuszé.' },
    { q: 'Hol található a Kuiper-öv?', options: ['A Mars és a Jupiter között', 'A Föld körül', 'A Neptunusz pályáján túl', 'A Nap felszínén'], answer: 2, explain: 'A Kuiper-öv a Neptunuszon túli, jeges égitestekből álló övezet; itt kering a Plútó is.' },
    { q: 'Mi a különbség egy kőzetbolygó és egy óriásbolygó között?', options: ['A kőzetbolygónak szilárd felszíne van, az óriásbolygó főleg gázból és jégből áll', 'Az óriásbolygók közelebb vannak a Naphoz', 'A kőzetbolygók nagyobbak', 'Nincs különbség, csak a színük más'], answer: 0, explain: 'A belső négy bolygó kőzetbolygó, a külső négy óriásbolygó (gáz- és jégóriások).' }
  ],
  'nap-csillagok': [
    { q: 'Milyen idős a Nap?', options: ['Kb. 13,8 milliárd év', 'Kb. 4,6 milliárd év', 'Kb. 6000 év', 'Kb. 100 millió év'], answer: 1, explain: 'A Nap és a Naprendszer kb. 4,6 milliárd éve alakult ki. A 13,8 milliárd év a világegyetem kora.' },
    { q: 'Melyik a Naphoz legközelebbi csillag?', options: ['Szíriusz', 'Sarkcsillag', 'Proxima Centauri', 'Betelgeuze'], answer: 2, explain: 'A Proxima Centauri kb. 4,24 fényévre van.' },
    { q: 'Melyik az éjszakai égbolt legfényesebb csillaga?', options: ['Sarkcsillag', 'Vega', 'Betelgeuze', 'Szíriusz'], answer: 3, explain: 'A Szíriusz a Nagy Kutya csillagképben, kb. 8,6 fényévre van. A Sarkcsillag nem különösebben fényes.' },
    { q: 'Mi lesz egy nagy tömegű (kb. 8 naptömeg fölötti) csillagból élete végén?', options: ['Szupernóva-robbanás után neutroncsillag vagy fekete lyuk', 'Fehér törpe', 'Bolygó', 'Üstökös'], answer: 0, explain: 'A nagy tömegű csillagok szupernóvaként pusztulnak el; a maradvány neutroncsillag vagy fekete lyuk.' },
    { q: 'Milyen színű egy hűvösebb, kb. 3500 K felszínű csillag?', options: ['Kékesfehér', 'Fehér', 'Narancsvörös', 'Zöld'], answer: 2, explain: 'A hűvös csillagok vörösesek, a forrók kékesfehérek.' },
    { q: 'Mik a napfoltok?', options: ['A Nap felszínének hűvösebb, erős mágneses terű, ezért sötétebbnek látszó tartományai', 'Kisbolygók árnyékai', 'Lyukak a Nap felszínén', 'A Hold árnyéka a Napon'], answer: 0, explain: 'A napfoltok kb. 1500 °C-kal hűvösebbek a környezetüknél, ezért látszanak sötétnek.' },
    { q: 'Milyen biztonságos módon lehet a Napot megfigyelni?', options: ['Közönséges napszemüveggel', 'Tanúsított napszűrővel vagy kivetítéssel', 'Kormozott üvegen át', 'Kézi látcsővel, ha hunyorogsz'], answer: 1, explain: 'Csak ISO 12312-2 szabványú napszűrő vagy kivetítés biztonságos; a többi maradandó szemkárosodást okozhat.' }
  ],
  'galaxisok': [
    { q: 'Milyen típusú galaxis a Tejútrendszer?', options: ['Elliptikus', 'Szabálytalan', 'Küllős spirálgalaxis', 'Gömbhalmaz'], answer: 2, explain: 'A Tejútrendszer küllős spirálgalaxis, kb. 100 000 fényév átmérővel.' },
    { q: 'Mi a Tejút az égen?', options: ['A Tejútrendszer korongja, amelyet belülről, élével látunk', 'Egy felhősáv a légkörben', 'A repülőgépek kondenzcsíkja', 'Az Androméda-galaxis'], answer: 0, explain: 'A halvány fénysávban sok milliárd távoli csillag fénye olvad össze.' },
    { q: 'Ki mutatta ki 1929-ben, hogy a galaxisok annál gyorsabban távolodnak, minél messzebb vannak (Lemaître 1927-es munkája után)?', options: ['Albert Einstein', 'Isaac Newton', 'Edwin Hubble', 'Galileo Galilei'], answer: 2, explain: 'A törvényt ma Hubble–Lemaître-törvénynek nevezzük.' },
    { q: 'Mi a kozmikus mikrohullámú háttérsugárzás?', options: ['A mobiltelefonok sugárzása', 'Az ősrobbanás utáni forró korszak „utófénye”, kb. 2,7 K-es sugárzás', 'A Nap ultraibolya sugárzása', 'A Tejút közepének fénye'], answer: 1, explain: '1965-ben fedezték fel; minden irányból szinte egyformán érkezik.' },
    { q: 'Kb. milyen messze van az Androméda-galaxis?', options: ['2,5 millió fényév', '4,24 fényév', '100 000 fényév', '13,8 milliárd fényév'], answer: 0, explain: 'A 4,24 fényév a Proxima Centauri, a 100 000 fényév a Tejútrendszer átmérője.' },
    { q: 'Kb. mekkora része a világegyetemnek a „közönséges” (atomokból álló) anyag?', options: ['95%', '50%', '27%', '5%'], answer: 3, explain: 'Kb. 5% közönséges anyag, kb. 27% sötét anyag és kb. 68% sötét energia.' }
  ],
  'hold': [
    { q: 'Kb. milyen messze van a Hold a Földtől?', options: ['38 400 km', '384 400 km', '3,8 millió km', '150 millió km'], answer: 1, explain: 'Az átlagos Föld–Hold távolság kb. 384 400 km.' },
    { q: 'Mikor lehet holdfogyatkozás?', options: ['Újholdkor', 'Első negyedkor', 'Teleholdkor', 'Bármikor'], answer: 2, explain: 'Holdfogyatkozáskor a Föld a Nap és a Hold közé kerül; ez teleholdkor lehetséges.' },
    { q: 'Melyik oldala világos a növő félholdnak (első negyed) Magyarországról nézve?', options: ['A jobb oldala', 'A bal oldala', 'Az alsó fele', 'A felső fele'], answer: 0, explain: 'Az északi féltekéről a növő Hold jobb oldala világos (a „d” betű hasa).' },
    { q: 'Miért nincs minden hónapban napfogyatkozás?', options: ['Mert a Hold pályasíkja kb. 5°-kal hajlik a Föld pályasíkjához', 'Mert a Hold túl kicsi', 'Mert a Hold nem kering', 'Mert a Nap túl fényes'], answer: 0, explain: 'A Hold újholdkor többnyire a Nap–Föld vonal fölött vagy alatt halad el.' },
    { q: 'Mit okoz a Hold vonzása a Földön?', options: ['Az évszakokat', 'A tengerek árapályát', 'A sarki fényt', 'A földrengéseket'], answer: 1, explain: 'Az árapályt elsősorban a Hold, kisebb részben a Nap vonzása okozza.' },
    { q: 'Mennyivel távolodik évente a Hold a Földtől?', options: ['Kb. 3,8 cm-rel', 'Kb. 3,8 méterrel', 'Kb. 38 km-rel', 'Egyáltalán nem távolodik'], answer: 0, explain: 'Az Apollo-űrhajósok által kihelyezett tükrökről visszavert lézerrel mérik.' },
    { q: 'Mikor volt utoljára teljes napfogyatkozás Magyarországon?', options: ['1999. augusztus 11-én', '2026. augusztus 12-én', '1980. május 26-án', '2015. március 20-án'], answer: 0, explain: 'A 2026-os teljes napfogyatkozás sávja Spanyolország felett haladt, nálunk részleges volt.' }
  ],
  'egbolt': [
    { q: 'Melyik égtájon található a Sarkcsillag?', options: ['Keleten', 'Délen', 'Nyugaton', 'Északon'], answer: 3, explain: 'A Sarkcsillag az égi északi pólus közelében van, ezért mindig északon látszik.' },
    { q: 'Milyen magasan látszik a Sarkcsillag Magyarországról?', options: ['Kb. 23,5°', 'Kb. 47°', 'Kb. 90°', 'A horizonton'], answer: 1, explain: 'A Sarkcsillag horizont feletti magassága nagyjából megegyezik a földrajzi szélességgel (Magyarország kb. 46–48°).' },
    { q: 'Melyik három csillag alkotja a nyári háromszöget?', options: ['Vega, Deneb, Altair', 'Szíriusz, Procyon, Betelgeuze', 'Castor, Pollux, Capella', 'Arcturus, Spica, Regulus'], answer: 0, explain: 'A Lant, a Hattyú és a Sas legfényesebb csillagai nyári estéken magasan látszanak.' },
    { q: 'Hány csillagképre osztják a csillagászok az égboltot?', options: ['12', '48', '88', '110'], answer: 2, explain: 'Az IAU 1922 óta 88 csillagképet tart nyilván, pontos határokkal.' },
    { q: 'Mi a „Göncölszekér”?', options: ['A Nagy Medve csillagkép hét fényes csillaga', 'Egy bolygó', 'A Tejút egy része', 'Egy üstökös'], answer: 0, explain: 'A Göncölszekér nem önálló csillagkép, hanem a Nagy Medve része.' },
    { q: 'Melyik égitest a legfényesebb az éjszakai égen a Hold után?', options: ['Szíriusz', 'Jupiter', 'Vénusz', 'Mars'], answer: 2, explain: 'A Vénusz (Esthajnalcsillag) jóval fényesebb bármely csillagnál; hajnalban vagy alkonyatkor látszik.' },
    { q: 'Miért van az égbolttérképeken a kelet a bal oldalon?', options: ['Mert a térképet a fejünk fölé tartva, felfelé nézve kell használni', 'Mert nyomdahiba', 'Mert a déli féltekére készültek', 'Mert a csillagok nyugatról keletre mozognak'], answer: 0, explain: 'Ha az eget nézzük, és észak felé fordulunk fejjel, a kelet balra esik – ezért fordított a földrajzi térképhez képest.' },
    { q: 'Mi a fényszennyezés?', options: ['A csillagok túl erős fénye', 'A mesterséges fény, amely az eget bevilágítja és a csillagokat elnyomja', 'A Nap ultraibolya sugárzása', 'A légszennyezés okozta színes naplemente'], answer: 1, explain: 'A rosszul tervezett világítás felfelé szórt fénye miatt a városokból alig látszanak csillagok.' }
  ],
  'gravitacio-palyak': [
    { q: 'Kb. mekkora sebesség kell egy alacsony Föld körüli körpályához (légellenállás nélkül, a felszín közelében)?', options: ['Kb. 340 m/s', 'Kb. 1 km/s', 'Kb. 7,9 km/s', 'Kb. 30 km/s'], answer: 2, explain: 'Ez az első kozmikus sebesség. A 30 km/s a Föld keringési sebessége a Nap körül.' },
    { q: 'Mit mond ki Kepler I. törvénye?', options: ['A bolygók ellipszispályán keringenek, a Nap az egyik fókuszpontban van', 'A bolygók körpályán keringenek, középen a Nappal', 'A Föld a világegyetem közepe', 'A bolygók egyenes vonalban mozognak'], answer: 0, explain: 'Kepler Tycho Brahe megfigyeléseiből vezette le 1609-ben.' },
    { q: 'Kepler III. törvénye szerint (T² = a³, években és CSE-ben) mennyi egy 4 CSE-re keringő kisbolygó keringési ideje?', options: ['4 év', '8 év', '16 év', '64 év'], answer: 1, explain: 'T² = 4³ = 64, tehát T = 8 év.' },
    { q: 'Kb. milyen magasan kering a Nemzetközi Űrállomás?', options: ['Kb. 10 km', 'Kb. 400 km', 'Kb. 36 000 km', 'Kb. 384 000 km'], answer: 1, explain: 'Az ISS kb. 400–420 km magasan, kb. 92–93 perc alatt kerüli meg a Földet. A 36 000 km a geostacionárius pálya.' },
    { q: 'Miért áll egy helyben az égen egy geostacionárius műhold?', options: ['Mert pontosan egy nap alatt kerüli meg a Földet, a Föld forgásával együtt', 'Mert nem mozog', 'Mert a Hold tartja', 'Mert nagyon lassan mozog a Föld felé'], answer: 0, explain: 'Kb. 35 786 km-rel az Egyenlítő fölött a keringési idő egy csillagnap.' },
    { q: 'Mi történik, ha egy test a körsebességnél valamivel gyorsabban indul vízszintesen?', options: ['Leesik', 'Ellipszispályára áll', 'Megáll', 'Egyenesen elszáll a világűrbe'], answer: 1, explain: 'A körsebesség és a szökési sebesség között ellipszispálya jön létre.' },
    { q: 'Melyik kifejezés adja a szökési sebességet a körsebesség (v₁) ismeretében?', options: ['2 · v₁', 'v₁ / 2', '√2 · v₁', 'v₁²'], answer: 2, explain: 'v₂ = √(2γM/r) = √2 · v₁; a felszínen 7,9 · 1,414 ≈ 11,2 km/s.' }
  ],
  'raketak': [
    { q: 'Melyik Newton-törvényen alapul a rakéta működése?', options: ['A tehetetlenség törvényén (I.)', 'A hatás-ellenhatás törvényén (III.)', 'A gravitációs törvényen', 'Egyiken sem'], answer: 1, explain: 'A rakéta hátrafelé löki a gázt, a gáz ugyanakkora erővel előre löki a rakétát.' },
    { q: 'Mikor állították pályára az első műholdat, a Szputnyik–1-et?', options: ['1945', '1957', '1961', '1969'], answer: 1, explain: '1957. október 4-én. 1961-ben Gagarin repült, 1969-ben az Apollo–11 szállt le a Holdon.' },
    { q: 'Mi az oxidálószer a legtöbb folyékony hajtóanyagú rakétában?', options: ['Folyékony oxigén', 'Víz', 'Hélium', 'Szén-dioxid'], answer: 0, explain: 'A folyékony oxigén kb. −183 °C-on cseppfolyós; a hélium csak a tartályok nyomás alatt tartására kell.' },
    { q: 'Mi a rácsos kormányfelület (grid fin) feladata a Falcon 9 első lépcsőjén?', options: ['A műhold rögzítése', 'A lépcső kormányzása visszatéréskor a légkörben', 'A hajtómű hűtése', 'Az üzemanyag szűrése'], answer: 1, explain: 'Visszatéréskor kinyílnak, és a leszállóhely felé kormányozzák a lépcsőt.' },
    { q: 'Mikor szállt le először függőlegesen egy orbitális hordozórakéta első lépcsője?', options: ['1969', '1981', '2015', '2024'], answer: 2, explain: '2015. december 21-én a Falcon 9 első lépcsője Floridában szállt le.' },
    { q: 'Miért tesznek több lépcsőt egy hordozórakétára?', options: ['Mert így a kiürült tartályokat ledobva kevesebb tömeget kell gyorsítani', 'Hogy a rakéta stabilabban álljon a földön', 'Mert így olcsóbb a festés', 'Hogy több üzemanyagfajtát lehessen keverni'], answer: 0, explain: 'A lépcsőzés nélkül a Föld körüli pálya kerozin–oxigén hajtással szinte elérhetetlen lenne.' },
    { q: 'Mi a Ciolkovszkij-egyenlet lényege?', options: ['A rakéta sebességváltozása a kiáramlási sebességtől és a tömegarány logaritmusától függ', 'A rakéta sebessége a hajtóművek számával arányos', 'A rakéta a levegőhöz képest gyorsul', 'A rakéta tömege állandó'], answer: 0, explain: 'Δv = v_e · ln(m₀/m₁).' },
    { q: 'Melyik küldetés vitt 2026 áprilisában négy űrhajóst a Hold körül?', options: ['Apollo–13', 'Artemis II', 'Ax-4', 'Szojuz–36'], answer: 1, explain: 'Az Artemis II 2026. április 1-jén indult és április 10-én tért vissza; új távolsági rekordot állított fel (kb. 406 800 km).' }
  ],
  'szondak-tavcsovek': [
    { q: 'Mikor indult a két Voyager-szonda?', options: ['1957-ben', '1969-ben', '1977-ben', '1990-ben'], answer: 2, explain: '1977 augusztusában és szeptemberében indultak; ma a csillagközi térben járnak.' },
    { q: 'Mekkora a James Webb-űrtávcső főtükrének átmérője?', options: ['2,4 m', '6,5 m', '39 m', '1 m'], answer: 1, explain: 'A 2,4 m a Hubble tükre, a 39 m az épülő földi ELT-é.' },
    { q: 'Mikor indult a Hubble-űrtávcső?', options: ['1977-ben', '1990-ben', '2009-ben', '2021-ben'], answer: 1, explain: '1990. április 24-én, a Discovery űrrepülőgéppel.' },
    { q: 'Milyen hullámhossz-tartományban figyel főleg a James Webb-űrtávcső?', options: ['Röntgen', 'Ultraibolya', 'Infravörös', 'Rádió'], answer: 2, explain: 'Az infravörösben a porfelhők mögé és a nagyon távoli, vöröseltolódott galaxisokra is rálát.' },
    { q: 'Melyik égitest mellett repült el a New Horizons 2015-ben?', options: ['Mars', 'Plútó', 'Vénusz', 'Jupiter'], answer: 1, explain: 'A New Horizons készítette az első részletes képeket a Plútóról.' },
    { q: 'Mi az Arany Lemez a Voyager-szondákon?', options: ['Egy hanglemez a Föld hangjaival, zenéjével és képeivel', 'A szonda napeleme', 'Hővédő pajzs', 'Egy aranyból készült antenna'], answer: 0, explain: 'Üzenet esetleges földön kívüli felfedezőknek.' },
    { q: 'Miért pislákolnak a csillagok, és miért visznek távcsöveket a világűrbe?', options: ['Mert a légkör remegése torzítja a fényt, és elnyeli a sugárzás egy részét', 'Mert a csillagok valóban villognak', 'Mert a Föld forog', 'Mert a Hold eltakarja őket'], answer: 0, explain: 'A légkör nyugtalansága és fényelnyelése nélkül az űrtávcsövek élesebb és teljesebb képet kapnak.' }
  ],
  'exobolygok': [
    { q: 'Mi az exobolygó?', options: ['Egy másik csillag körül keringő bolygó', 'Egy kisbolygó a Naprendszerben', 'Egy bolygó holdja', 'Egy kihunyt csillag'], answer: 0, explain: 'Az első Nap-szerű csillag körüli exobolygót 1995-ben fedezték fel.' },
    { q: 'Kb. hány megerősített exobolygót ismertünk 2026-ban?', options: ['Kb. 60', 'Kb. 600', 'Több mint 6000', 'Több mint 6 millió'], answer: 2, explain: 'A NASA archívuma 2025 szeptemberében lépte át a 6000-et, és a szám folyamatosan nő.' },
    { q: 'Melyik űrtávcső talált több ezer exobolygót a fedési módszerrel 2009 és 2018 között?', options: ['Kepler', 'Hubble', 'Voyager', 'Gaia'], answer: 0, explain: 'A Kepler-űrtávcső kb. 150 000 csillag fényességét figyelte folyamatosan.' },
    { q: 'Hány Föld-méretű bolygója van a TRAPPIST-1 csillagnak?', options: ['1', '3', '7', '12'], answer: 2, explain: 'A kb. 40 fényévre lévő vörös törpe hét kőzetbolygója közül több a lakhatósági zónában van.' },
    { q: 'Mit mér a radiálissebesség-módszer?', options: ['A csillag „billegését”, amelyet a bolygó vonzása okoz', 'A bolygó saját fényét', 'A bolygó rádióadásait', 'A csillag hőmérsékletét'], answer: 0, explain: 'A csillag fénye a billegés miatt felváltva a kék és a vörös felé tolódik (Doppler-jelenség).' },
    { q: 'Melyik Naprendszer-beli égitestet tartják ígéretes helynek az élet keresésére, mert a jégpáncélja alatt óceán van?', options: ['Merkúr', 'Vénusz', 'Enceladus (a Szaturnusz holdja)', 'A mi Holdunk'], answer: 2, explain: 'Az Enceladus és a Jupiter holdja, az Európa is óceánt rejt a jég alatt.' }
  ],
  'magyarok-urben': [
    { q: 'Melyik űrállomáson dolgozott Farkas Bertalan 1980-ban?', options: ['Mir', 'Szaljut–6', 'Nemzetközi Űrállomás (ISS)', 'Skylab'], answer: 1, explain: 'A Szojuz–36-tal a Szaljut–6 állomásra repült Valerij Kubaszovval.' },
    { q: 'Hogyan hívják a magyar űrhajósprogramot, amelynek keretében Kapu Tibor repült?', options: ['HUNOR', 'Interkozmosz', 'Artemis', 'Masat'], answer: 0, explain: 'A HUNOR (Hungarian to Orbit) program 2021-ben indult.' },
    { q: 'Hány évvel Farkas Bertalan után repült Kapu Tibor a világűrbe?', options: ['25 évvel', '35 évvel', '45 évvel', '55 évvel'], answer: 2, explain: 'Farkas Bertalan 1980-ban, Kapu Tibor 2025-ben repült: 45 év telt el.' },
    { q: 'Ki volt Kapu Tibor tartalék űrhajósa?', options: ['Farkas Bertalan', 'Cserényi Gyula', 'Simonyi Károly', 'Kármán Tódor'], answer: 1, explain: 'Cserényi Gyula villamosmérnök volt a HUNOR program tartalék űrhajósa.' },
    { q: 'Milyen rakétával indult Kapu Tibor 2025. június 25-én?', options: ['Szojuz', 'Falcon 9', 'Saturn V', 'Ariane 6'], answer: 1, explain: 'Az Ax-4 legénysége Falcon 9 rakétával, Crew Dragon űrhajóval indult a Kennedy Űrközpontból.' },
    { q: 'Mit mért a magyar fejlesztésű Pille műszer?', options: ['A kozmikus sugárzás dózisát', 'A hőmérsékletet', 'Az űrhajósok pulzusát', 'A Föld mágneses terét'], answer: 0, explain: 'A KFKI-ban fejlesztett termolumineszcens dózismérőt Farkas Bertalan vitte először a világűrbe.' },
    { q: 'Mi volt Bay Zoltán csapatának 1946-os eredménye?', options: ['Radarjelet vertek vissza a Holdról', 'Felfedeztek egy bolygót', 'Megépítették az első magyar rakétát', 'Lefényképezték a Hold túloldalát'], answer: 0, explain: 'A Holdradar-kísérlet 1946. február 6-án sikerült.' }
  ]
});
